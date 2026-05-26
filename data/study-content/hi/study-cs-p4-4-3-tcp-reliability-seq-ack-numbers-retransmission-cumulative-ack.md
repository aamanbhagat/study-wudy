## 1. The one-sentence answer
**TCP reliability works by assigning a sequence number to every byte, using acknowledgments to confirm delivery, and retransmitting lost segments while cumulative ACKs let the receiver acknowledge all bytes up to a certain point in one message.**

Sequence numbers turn an unreliable channel into an ordered, duplicate-free byte stream. When a segment arrives, the receiver checks the sequence number to place bytes correctly and detect gaps. Acknowledgments carry the next expected sequence number; a missing ACK or a timeout forces the sender to retransmit. Cumulative ACKs collapse multiple individual confirmations into one value, reducing header overhead and improving efficiency on high-latency links.

The mechanism also handles reordering and duplicates naturally because the receiver only advances its ACK when bytes arrive in order. This single set of rules therefore solves loss, duplication, and reordering without requiring any extra protocol.

> [!NOTE]
> The deepest insight is that sequence numbers and cumulative ACKs together create a sliding window of “known good” data; everything before the ACK is safe to discard, and everything after must still be tracked.

## 2. Why this matters — concrete and current
Google’s QUIC transport still re-uses the same sequence-number-plus-ACK logic inside its UDP-based design, proving the idea remains fundamental even when TCP itself is replaced.  
SpaceX Starlink terminals run TCP over highly variable satellite links; the retransmission timers and cumulative ACK behavior directly determine how much bandwidth is wasted on each packet loss event.  
AWS and Azure load balancers rely on TCP sequence number tracking to implement connection migration and zero-downtime failover; any miscalculation here breaks long-lived sessions.  
Modern 5G core networks use TCP proxies that must correctly interpret cumulative ACKs to avoid head-of-line blocking when splitting traffic across multiple paths.  
The Linux kernel’s tcp_cubic and tcp_bbr congestion-control modules read the same ACK sequence numbers to decide sending rates, showing that reliability and performance are inseparable.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Byte-stream abstraction | TCP treats data as a continuous sequence of bytes, not messages |
| Unreliable underlying network | Packets can be lost, duplicated, or reordered             |
| Timeout and RTT estimation | Retransmission decisions rest on accurate round-trip time |
| Finite sequence-number space | 32-bit numbers wrap around; you must detect old duplicates |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Every byte receives a sequence number
TCP numbers each byte of the stream consecutively. The sequence number field in the header contains the number of the first byte carried in that segment.  
Example: sending “HELLO” assigns bytes 100, 101, 102, 103, 104. The segment therefore carries sequence number 100 and length 5.  
Formal statement: let \(S\) be the sequence number of the first byte in a segment; the last byte occupies \(S + L - 1\) where \(L\) is the payload length.  
> [!WARNING] Treating sequence numbers as segment IDs instead of byte IDs breaks reassembly when segments have different sizes.

### Step 2 — ACK carries the next expected byte
An acknowledgment number \(A\) tells the sender “I have received everything up to byte \(A-1\)”.  
Example: after receiving bytes 100-104 the receiver sends ACK = 105.  
Formal statement: \(\text{ACK} = \max\{x \mid \forall y < x, \text{byte } y \text{ has arrived in order}\}\).

### Step 3 — Cumulative ACK collapses multiple confirmations
A single ACK value can cover many segments. Receiving segments 100-104 and 105-109 produces only one ACK = 110.  
This reduces reverse-channel traffic and simplifies the sender’s bookkeeping.

### Step 4 — Retransmission timer detects loss
The sender maintains a retransmission timeout (RTO) based on measured RTT. When the timer expires without an ACK that covers the segment, the segment is retransmitted.  
Formal rule: if \(\text{current time} > \text{send time} + \text{RTO}\), retransmit.

### Step 5 — Duplicate ACKs trigger fast retransmit
Three identical ACKs for the same sequence number signal that a later segment arrived while an earlier one is missing. The sender retransmits immediately without waiting for the timer.  
Formal threshold: after the third duplicate ACK, retransmit the missing segment.

### Step 6 — Sequence number wrap-around and protection
Because the space is finite (\(2^{32}\)), TCP uses the PAWS algorithm with timestamps to discard old duplicates whose sequence numbers have wrapped.

### Step 7 — Textbook-grade statement
A TCP connection is reliable if and only if every byte is eventually delivered exactly once, in order, or the connection is explicitly reset. This guarantee rests on the monotonic growth of sequence and acknowledgment numbers together with the retransmission rules above.

## 5. Worked examples — har step show karo

**Example 1 — Simple cumulative ACK**  
*Given:* Sender transmits two segments: bytes 1000-1049 (seq=1000, len=50) and 1050-1099 (seq=1050, len=50).  
*Find:* ACK returned by receiver after both arrive.  
Receiver collects both segments. Highest contiguous byte received is 1099, so next expected byte is 1100.  
ACK = 1100.  
*Why:* Cumulative ACK reports the first missing byte, covering both segments in one value.  
**Final answer**  
1100

*Reflection:* The example shows how two segments collapse into one ACK; the same logic scales to hundreds of segments.

**Example 2 — Single loss and timeout retransmission**  
*Given:* Segment seq=2000, len=100 is lost; RTO = 200 ms.  
*Find:* Timeline of events.  
t=0: segment sent.  
t=200 ms: timer expires, segment retransmitted with same seq=2000.  
Receiver sends ACK=2100 once the retransmission arrives.  
*Why:* Timeout is the last-resort loss detector when duplicate ACKs cannot be generated.

**Example 3 — Fast retransmit via duplicate ACKs**  
*Given:* Segments 3000, 3100, 3200; middle segment lost.  
Receiver sends ACK=3100 three times.  
Sender retransmits seq=3100 after the third duplicate ACK.  
*Why:* Duplicate ACKs give earlier notification than the timer.

**Example 4 — Out-of-order arrival**  
*Given:* Segment seq=4000 arrives before seq=3900.  
Receiver buffers 4000 and sends ACK=3900 repeatedly.  
When 3900 arrives, receiver delivers both and sends ACK=4100.  
*Why:* Cumulative ACK stays at the first missing byte until the gap is filled.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Treating seq as segment count     | Confusing byte numbering with packet count  | Always multiply length by bytes when advancing ACK   |
| Ignoring sequence wrap-around     | Assuming 32-bit numbers never repeat        | Enable PAWS timestamps on long-lived connections     |
| Setting RTO too low               | RTT variance underestimated                 | Use Jacobson/Karels formula with \(\beta = 4\)       |
| Counting duplicate ACKs incorrectly | Including ACKs that advance the window    | Only count identical ACK numbers that do not advance |
| Forgetting FIN consumes one seq   | FIN flag also occupies a sequence number    | Remember ACK after FIN must be one higher than last data byte |

## 7. The textbook-precise statement
TCP provides a reliable, ordered, byte-stream service over an unreliable network. Let \(S\) be the sequence number of the first byte in a segment and \(A\) the acknowledgment number. The receiver must deliver bytes in increasing order of sequence numbers and may advance \(A\) only after all bytes up to \(A-1\) have been received contiguously. Retransmission occurs either on expiration of a retransmission timer or after three duplicate acknowledgments for the same sequence number (fast retransmit). Sequence numbers are 32-bit unsigned integers that wrap modulo \(2^{32}\); protection against old duplicates is provided by the PAWS algorithm when timestamps are present. (Kurose & Ross, Computer Networking: A Top-Down Approach, 8e, §3.5.2–3.5.4)

## 8. Visual — diagram or schematic
```
Sender timeline                  Receiver timeline
t0: [seq=1000,len=100] -------->
t1: [seq=1100,len=100] -------->
                                   t2: ACK=1200 <--------
t3: [seq=1200,len=100] -------->   (lost)
                                   t4: ACK=1200 <-------- (dup)
                                   t5: ACK=1200 <-------- (dup)
t6: retransmit [seq=1200] ------>  t7: ACK=1300 <--------
```
Labels: each arrow carries the seq/ACK value; the gap at t3 triggers duplicate ACKs and fast retransmit.

## 9. The memory technique
1. **The hook** — Picture a long freight train where each wagon is numbered; the stationmaster’s radio message “next wagon 47” tells the sender that wagons 1-46 have arrived and can be scrapped.
2. **What to overlearn** — ACK value equals the first missing byte; three identical ACKs cause immediate retransmission; RTO uses \(\text{SRTT} + 4 \times \text{RTTVAR}\).
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If you forget the formula, redraw the byte stream, mark every missing byte, and set ACK to the lowest unmarked position; the retransmission rule follows directly from “no ACK covering that byte arrived before RTO”.

## 10. What this unlocks
Mastering seq/ACK and cumulative ACK lets you understand higher-layer mechanisms that depend on the same reliability contract.

- TCP congestion control (cwnd growth driven by ACK arrivals)
- SACK and duplicate SACK extensions
- QUIC’s stream offsets and ACK frames
- TLS record-layer reassembly over TCP
- HTTP/3 fallback behavior when QUIC is unavailable

## 11. Self-check — five questions, no answers
1. A sender transmits bytes 5000-5099 and receives ACK=5100. What is the smallest sequence number the sender may safely discard from its retransmission buffer?
2. Three duplicate ACKs for byte 7000 arrive. Which segment is retransmitted and why is the timer not used?
3. Sequence number 2^32-10 is sent in a 20-byte segment. What sequence number follows it after wrap-around?
4. A receiver has bytes 100-199 and 300-399 but not 200-299. Which ACK value does it advertise?
5. Explain why a cumulative ACK of 5000 covers more data than five separate ACKs of 4000, 4200, 4400, 4600, 4800 when segments are 200 bytes each.