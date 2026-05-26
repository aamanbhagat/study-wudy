## 1. The one-sentence answer
**UDP is a minimal, connectionless transport protocol that sends independent datagrams without reliability guarantees, using an 8-byte header whose checksum field provides optional error detection over the datagram and selected IP fields.**

UDP exists because many applications value speed and simplicity over ordered, guaranteed delivery. A sender writes data, the UDP layer adds the four 16-bit fields, and the resulting datagram is handed to IP; nothing is remembered about the exchange. The receiver extracts the fields, verifies the checksum when present, and delivers the payload to the indicated port. Because no handshake or state is kept, a lost datagram simply disappears; the application must decide whether to retransmit or tolerate the loss.

The checksum is the only integrity mechanism. It is computed as the ones-complement sum of the UDP header, the payload, and a pseudo-header containing the IP source and destination addresses. In IPv4 the field may be zero (meaning “no checksum”); in IPv6 it is mandatory.

> [!NOTE]
> The decisive insight is that UDP deliberately omits TCP’s sequencing, acknowledgments, and congestion control so that latency-sensitive traffic can trade correctness for immediacy.

## 2. Why this matters — concrete and current
DNS resolvers at every major public resolver (Google 8.8.8.8, Cloudflare 1.1.1.1) use UDP for the vast majority of queries; the 512-byte limit and single-round-trip semantics keep lookup latency under 20 ms for most users.

Real-time multiplayer games such as Fortnite and Valorant transmit player state in UDP datagrams at 60–120 Hz; any retransmission would produce visible lag, so the engine accepts occasional dropped packets and extrapolates position.

Live video contribution links at sports broadcasts (e.g., SMPTE ST 2110 over IP) carry uncompressed or lightly compressed streams in UDP; the protocol’s lack of head-of-line blocking preserves frame timing that TCP would destroy.

QUIC, the transport now used by HTTP/3 inside Chrome and Cloudflare’s edge, runs its own reliability layer over UDP; the choice lets QUIC avoid kernel TCP stacks while still benefiting from UDP’s universal forwarding.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| IPv4 and IPv6 addressing | UDP checksum incorporates source and destination IP addresses via a pseudo-header.   |
| Ones-complement arithmetic | The UDP checksum is defined as the ones-complement sum of 16-bit words.              |
| Port abstraction         | The first two header fields are 16-bit port numbers that demultiplex traffic to processes. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Datagrams are independent
A UDP sender treats each write as a complete message that travels alone. No prior setup occurs and no memory of previous messages is kept at the transport layer.

Example: an application calls sendto() with 100 bytes; the kernel emits one datagram containing exactly those 100 bytes plus an 8-byte header.

Formal statement: a UDP transmission is a mapping \( m \mapsto d \) where \( d \) is a self-contained datagram.

> [!WARNING]
> Treating successive datagrams as ordered will produce silent data corruption when reordering occurs in the network.

### Step 2 — Four 16-bit fields constitute the header
The header occupies the first eight bytes of the datagram and contains, in order: source port, destination port, length, checksum.

Each field is transmitted in network byte order (big-endian).

> [!WARNING]
> Reading the fields in host byte order without conversion yields swapped port numbers on little-endian machines.

### Step 3 — Ports identify processes, not connections
A port is an unsigned 16-bit integer. The pair (IP address, port) together names a transport endpoint. UDP does not track connection state, so the same port may receive datagrams from many remote endpoints.

### Step 4 — Length field gives total size
The 16-bit length field records the number of bytes in the UDP header plus payload; its minimum legal value is 8.

### Step 5 — Checksum covers header, data, and IP pseudo-header
The checksum is the ones-complement of the ones-complement sum of the UDP header, payload padded to a multiple of 16 bits, and a 12-byte (IPv4) or 40-byte (IPv6) pseudo-header.

Formal statement:  
\[
\text{checksum} = \neg \Bigl( \sum_{i} w_i \Bigr) \pmod{2^{16}-1}
\]
where \( w_i \) are 16-bit words and \( \neg \) denotes ones-complement.

> [!WARNING]
> Setting the checksum field to zero in IPv6 is illegal and will cause the datagram to be discarded by receivers that follow RFC 8200.

### Step 6 — Delivery is best-effort
IP may drop, duplicate, or reorder datagrams; UDP performs no recovery. The receiving socket simply returns whatever datagram arrives, or nothing.

## 5. Worked examples — every step shown

**Example 1 — Minimal header construction**  
*Given:* Source port 54321, destination port 53, payload length 30 bytes, checksum computation deferred.  
*Find:* The eight-byte UDP header in hex.  

- Write ports in network order: 0xD431, 0x0035.  
  *Why:* 54321 = 0xD431; 53 = 0x0035.  
- Length = 8 + 30 = 38 = 0x0026.  
  *Why:* Header plus payload.  
- Checksum field left as 0x0000 for now.  
  *Why:* Placeholder until checksum is calculated.  

**Result:** `D4 31 00 35 00 26 00 00`

**Example 2 — Checksum of a 4-byte payload**  
*Given:* UDP header with ports 0, length 12, payload 0x0001 0x0002, pseudo-header sum 0x1234.  
*Find:* Correct checksum value.  

- Form 16-bit words: 0000, 0000, 000C, 0000, 0001, 0002, plus pseudo 1234.  
  *Why:* All fields including padding.  
- Sum = 0x1234 + 0x000C + 0x0003 = 0x1243.  
  *Why:* 0001+0002 = 0003.  
- Ones-complement: 0xEDBC.  
  *Why:* 0xFFFF − 0x1243 = 0xEDBC.  

**Result:** checksum = 0xEDBC

**Example 3 — Reassembly at receiver**  
*Given:* Datagram arrives with length field 20, 12 bytes of payload.  
*Find:* Payload size.  

- Subtract header: 20 − 8 = 12.  
  *Why:* Length includes header.  

**Result:** 12-byte payload delivered to application.

**Example 4 — IPv6 mandatory checksum**  
*Given:* UDP datagram over IPv6 with checksum field zero.  
*Find:* Receiver action per RFC 8200.  

- IPv6 requires non-zero checksum.  
  *Why:* RFC 8200 §8.1.  

**Result:** datagram discarded before reaching socket.

*Reflection:* The checksum calculation is the only arithmetic step; every other field is a direct copy or simple subtraction.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming UDP is reliable          | Application works on LAN where loss is rare         | Always design for loss; add sequence numbers if needed |
| Forgetting pseudo-header in checksum | Only header and data are visible in packet capture | Include the three IP fields when computing checksum  |
| Using zero checksum on IPv6       | IPv4 habit carried over                             | Check IP version before deciding checksum value      |
| Port 0 as source                  | Some APIs default to 0                              | Bind explicitly or let OS choose ephemeral port      |
| Length field off-by-one           | Counting only payload                               | Always add 8 for the header                          |
| Endianness mistakes on ports      | Direct memory copy without htons/ntohs              | Use conversion functions for every 16-bit field      |
| Ignoring checksum errors          | “It’s optional” mindset                             | Log and drop corrupted datagrams; never trust payload |

## 7. The textbook-precise statement
UDP is defined in RFC 768 (Postel, 1980). A UDP datagram consists of a 8-octet header followed by a payload. The header fields are:

- Source Port (16 bits)  
- Destination Port (16 bits)  
- Length (16 bits)  
- Checksum (16 bits)  

The checksum algorithm is the same 16-bit ones-complement sum used by IP, computed over the concatenation of a pseudo-header, the UDP header, and the padded payload. In IPv4 the checksum field may be zero; in IPv6 it must be non-zero (RFC 8200). Delivery is best-effort; no ordering or retransmission is provided.

## 8. Visual — diagram or schematic

```text
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |        Destination Port       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|            Length             |            Checksum           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Payload (variable)                     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```
Each row is 32 bits; the four header fields occupy the first two rows exactly.

## 9. The memory technique

**The hook** — Picture four mailboxes in a row: two labeled “From” and “To”, one marked “Size”, and one stamped “Check”. The mail carrier (IP) only needs these four labels to deliver the envelope.

**What to overlearn** — Header is exactly 8 bytes; checksum uses ones-complement; IPv6 forbids zero checksum.

**Spaced-repetition schedule** — Review header layout at 1 day, recompute a checksum example at 3 days, explain a use-case tradeoff at 7 days, compare UDP/TCP at 16 days, and implement a minimal sender at 35 days.

**First-principles fallback** — Re-derive the checksum by summing 16-bit words, folding carry bits, then taking ones-complement; every other field is a direct copy of application or socket data.

## 10. What this unlocks
UDP is the substrate for DNS, QUIC, RTP, DHCP, and most tunneling protocols. Mastery of its header and checksum enables direct implementation of application-level reliability layers and correct diagnosis of packet-loss symptoms in production systems.

- QUIC congestion control  
- RTP/RTCP media timing  
- Custom reliable multicast protocols  
- Socket API programming (sendto/recvfrom)

## 11. Self-check — five questions, no answers
1. A UDP datagram carries 40 bytes of payload. What value must appear in the Length field?  
2. Why does the UDP checksum incorporate the IP source and destination addresses even though they are already present in the IP header?  
3. An IPv6 UDP datagram arrives with checksum 0x0000. Is it accepted?  
4. Show the 16-bit words that participate in the checksum calculation for a UDP datagram whose payload is the single byte 0xFF.  
5. A receiver obtains two datagrams with identical source and destination ports but different payloads within 10 ms. Which UDP property explains this behavior?