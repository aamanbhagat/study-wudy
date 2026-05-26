## 1. The one-sentence answer
**TCP reliability is achieved by assigning each byte a sequence number, sending cumulative acknowledgments that report the next expected byte, and retransmitting any data whose acknowledgment has not arrived within a timeout.**

Sequence numbers turn an unreliable byte stream into an ordered, duplicate-free delivery service. The sender numbers every byte it transmits; the receiver reflects the highest contiguous byte received plus one in each ACK. When a timer expires without that ACK, the sender retransmits exactly the unacknowledged segment. This combination removes the need for the network layer to guarantee delivery.

The mechanism is deliberately byte-granular rather than packet-granular so that lost or reordered segments can be reassembled correctly even when IP fragments the data. Cumulative ACKs further reduce reverse traffic: one ACK can confirm an entire window of bytes.

> [!NOTE]
> The single most important insight is that the ACK number is *always* the sequence number of the byte the receiver is still waiting for, never the last byte it has already received.

## 2. Why this matters — concrete and current
Google’s BBR congestion-control algorithm still relies on TCP’s cumulative ACK clock to measure delivery rate; without accurate sequence tracking, BBR’s bandwidth and RTT estimates collapse on even modest loss.

In aerospace, NASA’s Deep Space Network uses TCP extensions (DTN bundle protocol over LTP) whose reliability layer is modeled directly on TCP sequence numbers; a single lost segment on a 20-minute light-time link triggers retransmission whose timer must be computed from the same cumulative-ACK logic.

Modern RDMA over Converged Ethernet (RoCEv2) implements its own sequence-numbered retransmission because it cannot tolerate TCP’s cumulative ACK head-of-line blocking; the design decision is possible only because engineers first mastered TCP’s byte-numbering model.

Semiconductor test equipment from Keysight and Teradyne streams gigabytes of waveform data over TCP; a single missed sequence number would corrupt hours of silicon validation, so the firmware implements fast retransmit exactly as described in RFC 5681.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Unreliable packet delivery (best-effort IP) | Explains why sequence numbers and retransmission are required at all |
| Byte vs. packet distinction | TCP numbers bytes, not segments; understanding this prevents off-by-one errors |
| Round-trip time and timeout | Retransmission decisions rest on estimating when an ACK should have arrived |
| Sliding-window flow control | Sequence and ACK numbers are the same fields used to implement windows |

## 4. Building the idea — from intuition to formalism

### Step 1 — Every byte must be uniquely identified
A lost or reordered packet destroys the original order of data. Numbering each byte consecutively gives the receiver an unambiguous way to place every arriving byte in its correct position.

Concrete example: the four-byte string “ABCD” is sent as two segments “AB” and “CD”. If the segments arrive out of order, the receiver still knows byte 0 belongs first because its sequence number is 0.

Formal statement: Let the data be a sequence of bytes \(b_0, b_1, \dots, b_{L-1}\). The initial sequence number ISN is chosen randomly; the sequence number carried by the segment that begins at byte \(k\) is \(\text{ISN} + k\).

> [!WARNING]
> Using packet numbers instead of byte numbers breaks reassembly when segments contain different amounts of data.

### Step 2 — Acknowledgments report the next expected byte
An ACK carries the sequence number of the byte the receiver still needs, not the last byte it possesses. This single number therefore acknowledges every byte before it.

Concrete example: after receiving bytes 0–999 and 1000–1999, the receiver sends ACK = ISN + 2000. The sender knows the entire 2000-byte prefix has arrived.

Formal statement: \(\text{ACK} = \text{ISN} + \text{next_expected_byte}\).

> [!WARNING]
> Treating ACK as “last byte received” produces an off-by-one error that silently drops the final byte of a transfer.

### Step 3 — Cumulative ACKs compress feedback
Because ACK numbers are monotonically increasing, a single ACK can confirm an arbitrary run of contiguous bytes. Out-of-order segments are held but not acknowledged until the gap is filled.

Formal statement: if bytes \([0..N-1]\) have been received contiguously, every ACK generated while that prefix remains unchanged carries the value \(\text{ISN}+N\).

### Step 4 — Loss detection by timeout
The sender maintains, for each segment, a retransmission timer initialized to an estimate of RTT plus variance. Expiration implies the segment or its ACK was lost; the segment is retransmitted with the original sequence numbers.

Formal statement: \(\text{timeout} = \text{SRTT} + 4 \cdot \text{RTTVAR}\).

### Step 5 — Retransmission preserves sequence integrity
A retransmitted segment carries the identical sequence number range as the original. The receiver therefore discards any duplicate data whose sequence numbers have already been acknowledged.

Formal statement: on receipt of a segment whose sequence interval \([\text{seq}, \text{seq}+\text{len})\) lies entirely before the current ACK, the receiver sends a duplicate ACK but does not advance its next-expected pointer.

### Step 6 — The complete reliability invariant
At all times the receiver’s ACK equals the length of the longest prefix of the original byte stream that has been received contiguously and in order.

## 5. Worked examples — every step shown

**Example 1 — Simple successful transfer**  
*Given:* Sender transmits bytes 0–999 (seq = 1000, ISN = 1000).  
*Find:* ACK returned by receiver.  
Step 1: Receiver obtains all bytes 0–999 contiguously.  
*Why* — no gaps exist.  
Step 2: Next expected byte is 1000.  
*Why* — cumulative ACK reports the first missing byte.  
**ACK = 2000**

*Reflection:* The example shows that ACK equals ISN plus total contiguous bytes, not the highest sequence number seen.

**Example 2 — Single segment loss**  
*Given:* Segments [0–999] (seq=1000) and [1000–1999] (seq=2000). Second segment lost.  
*Find:* ACK after first segment arrives and after timeout.  
Step 1: First segment arrives → ACK = 2000.  
*Why* — prefix of length 1000 received.  
Step 2: Timer expires → retransmit [1000–1999].  
*Why* — cumulative ACK has not advanced.  
Step 3: Retransmission arrives → ACK = 3000.  
**ACK advances to 3000 after retransmission**

*Reflection:* Cumulative ACK forces the sender to retransmit only the missing suffix.

**Example 3 — Out-of-order arrival**  
*Given:* Segments arrive as [1000–1999] then [0–999].  
*Find:* ACK values after each arrival.  
Step 1: [1000–1999] arrives first → ACK remains 1000 (initial).  
*Why* — byte 0 still missing.  
Step 2: [0–999] arrives → ACK = 3000.  
**Final ACK = 3000**

*Reflection:* The receiver buffers the later segment but never acknowledges beyond the contiguous prefix.

**Example 4 — Duplicate ACK and fast retransmit trigger**  
*Given:* Three duplicate ACKs for 2000 arrive while segment [1000–1999] is missing.  
*Find:* Sender action.  
Step 1: Each duplicate ACK carries the same value 2000.  
*Why* — receiver still waits for byte 1000.  
Step 2: After third duplicate ACK, sender retransmits without waiting for timeout.  
**Segment [1000–1999] retransmitted on triple duplicate ACK**

*Reflection:* The example illustrates how cumulative ACKs also serve as loss signals.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Believing ACK numbers the last byte received | Off-by-one confusion between “next expected” and “last seen” | Always add one to the highest contiguous byte index |
| Numbering packets instead of bytes | Habit from simpler protocols | Remember TCP sequence space is 32-bit byte counts |
| Forgetting that retransmitted segments reuse original sequence numbers | Intuitive desire to give “new” numbers | Treat retransmissions as exact copies of the original byte range |
| Assuming every ACK advances the window | Ignoring duplicate ACKs | Count duplicate ACKs separately for fast retransmit |
| Ignoring sequence-number wrap-around | 32-bit field eventually overflows | Use modular 32-bit arithmetic and Protection Against Wrapped Sequence numbers (PAWS) |
| Treating cumulative ACK as selective | Expecting fine-grained feedback | Recall that SACK is an optional extension; base TCP is strictly cumulative |
| Starting ISN at zero in every connection | Simplification in toy code | Choose random ISN to prevent old duplicates from prior incarnations |

## 7. The textbook-precise statement
TCP reliability is defined by the following invariant (Kurose & Ross, *Computer Networking: A Top-Down Approach*, 8e, §3.5.2):  

Let \( \text{rcv_nxt} \) be the sequence number of the next byte the receiver expects. Every ACK segment carries acknowledgment number \( \text{rcv_nxt} \). The sender retransmits any segment whose bytes lie entirely before \( \text{rcv_nxt} \) once a retransmission timer expires or three duplicate ACKs are observed. Sequence numbers are 32-bit unsigned integers incremented per byte; arithmetic is performed modulo \( 2^{32} \).

## 8. Visual — diagram or schematic
```text
Sender timeline                  Receiver timeline
t0:  [seq=1000, len=1000]  ---->
t1:                          <----  [ACK=2000]
t2:  [seq=2000, len=1000]  ---->     (lost)
t3:                          <----  [ACK=2000]  (dup)
t4:                          <----  [ACK=2000]  (dup)
t5:  retransmit [seq=2000] ---->
t6:                          <----  [ACK=3000]
```
Horizontal arrows show segments; vertical spacing indicates time. Duplicate ACKs all carry the identical value 2000 until the gap is filled.

## 9. The memory technique
1. **The hook** — Picture a conveyor belt of numbered bricks; the foreman (receiver) shouts the number of the next brick slot that is still empty.  
2. **What to overlearn** — ACK = ISN + next expected byte; retransmit on timeout or triple duplicate ACK; sequence space is bytes, not segments.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the requirement that the receiver must be able to place every byte in its original position after arbitrary loss and reordering.

## 10. What this unlocks
Mastery of sequence and cumulative ACK mechanics is the foundation for TCP congestion control, fast retransmit, selective acknowledgments (SACK), and modern transport protocols such as QUIC.  

- TCP Tahoe / Reno congestion avoidance  
- Fast retransmit and fast recovery (RFC 5681)  
- QUIC’s byte-stream reliability over UDP  
- RDMA reliability extensions  

## 11. Self-check — five questions, no answers
1. A sender transmits bytes 0–1499 in one segment. The receiver has already ACKed up to byte 800. What ACK does it return after this segment arrives?  
2. Two segments of 500 bytes each are sent with ISN = 0. The second arrives first. List every ACK value the receiver emits.  
3. A retransmitted segment arrives after its original has already been acknowledged. What must the receiver do?  
4. Why does TCP choose a random initial sequence number rather than always starting at zero?  
5. Three duplicate ACKs arrive for byte 5000 while the sender has unacknowledged data at 5000–5999. What action follows, and why is the cumulative nature of ACK essential to the decision?