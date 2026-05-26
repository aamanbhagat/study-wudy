## 1. The one-sentence answer
**TCP ek connection-oriented transport-layer protocol hai jo reliable data delivery ke liye 20-byte header, sequence numbers, acknowledgements aur precisely defined 3-way handshake plus 4-way termination sequences use karta hai.**

TCP header mein source/destination ports, sequence number, acknowledgement number aur control flags jaise SYN, ACK, FIN hote hain. Ye fields packets ko order mein rakhne, lost packets ko detect karne aur connection ko safely kholne-band karne mein madad karte hain. 3-way handshake do machines ke beech ek virtual pipe banata hai jisme dono taraf se sequence numbers agree hote hain; 4-way termination us pipe ko bina data loss ke band karta hai.

> [!NOTE]
> Sabse badi aha yeh hai ki handshake mein sirf teen packets (SYN, SYN-ACK, ACK) sequence numbers ko synchronise kar dete hain, isliye baad ke data packets ko koi extra negotiation nahi chahiye — connection state already dono ends par same hoti hai.

## 2. Why this matters — concrete and current
Google’s QUIC protocol ab bhi TCP fallback use karta hai jab UDP blocked hota hai; isliye har Chrome connection TCP handshake timing par depend karta hai.  
SpaceX Starlink terminals TCP 3-way handshake ko optimise karke high-latency satellite links par 200 ms RTT ko handle karte hain.  
AWS Load Balancers SYN cookies implement karte hain jo exactly isi handshake sequence par based hain taaki DDoS attacks se bacha ja sake.  
5G core network ka N3 interface GTP tunnels ke andar TCP connections carry karta hai, jisme 4-way termination fast release ke liye zaroori hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| IP datagram          | TCP segment is payload of IP packet                       |
| Port numbers         | Demultiplexing at transport layer                         |
| Sequence numbers     | Ordering and duplicate detection                          |
| Finite state machine | Connection states (LISTEN, SYN-SENT, ESTABLISHED, etc.)   |

Agar sequence numbers ya state machines pehle nahi padhe to unhe pehle samajh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Why a header is required
TCP ko har segment ke saath metadata bhejna padta hai taaki receiver us segment ko sahi jagah laga sake. Header fixed fields + variable options se banta hai.  
Example: 80-byte file transfer karte waqt pehla segment header ke saath jaata hai jisme sequence number 1000 likha hota hai.  
Formal: Header length = 5 × 32-bit words (minimum) + options.

> [!WARNING]
> Agar header length galat padha jaaye to receiver pura segment discard kar deta hai aur timeout ka intezaar karna padta hai.

### Step 2 — Key header fields
Sequence number (32-bit), Acknowledgement number (32-bit), Flags (9-bit: URG, ACK, PSH, RST, SYN, FIN), Window size.  
Example: SYN packet mein sequence number 5000, ACK flag 0 hota hai.  
Formal: Seq ∈ {0 … 2³²−1}, ACK number = next expected sequence number.

### Step 3 — 3-way handshake initiation (SYN)
Client SYN flag set karke apna initial sequence number (ISN) bhejta hai. Server us ISN ko note karta hai.  
Example: Client → Server: SYN, seq=1000.  
Formal: Client state: SYN-SENT; Server state: SYN-RECEIVED.

### Step 4 — Server response (SYN-ACK)
Server apna ISN bhejta hai aur client ke ISN+1 ko acknowledge karta hai.  
Example: Server → Client: SYN, ACK, seq=4000, ack=1001.  
Formal: ACK number = client ISN + 1.

### Step 5 — Client final ACK
Client server ke ISN+1 ko acknowledge karta hai. Connection ESTABLISHED ho jaati hai.  
Example: Client → Server: ACK, seq=1001, ack=4001.

### Step 6 — Data transfer using agreed numbers
Ab dono taraf sequence numbers already synchronised hain. Har byte ka apna sequence number hota hai.  
Formal: Next segment seq = last seq + data length.

### Step 7 — 4-way termination (FIN exchange)
Client FIN bhejta hai, server ACK karta hai; phir server apna FIN bhejta hai, client ACK karta hai.  
Example: Client FIN → Server ACK → Server FIN → Client ACK.

### Step 8 — Textbook-grade statement
TCP connection establishment aur termination RFC 793 §3.4 aur §3.5 mein defined finite-state machines ke through hoti hai jisme har transition header flags aur sequence numbers par depend karti hai.

## 5. Worked examples — har step show karo

**Example 1 — Basic 3-way handshake**  
*Given:* Client ISN = 1000, Server ISN = 5000.  
*Find:* Teeno packets.  
1. Client → Server: SYN, seq=1000 (Why: ISN choose kiya)  
2. Server → Client: SYN-ACK, seq=5000, ack=1001 (Why: client ISN+1 acknowledge kiya)  
3. Client → Server: ACK, seq=1001, ack=5001  
**Final answer**  
Connection ESTABLISHED with client seq base 1000, server seq base 5000.  
*Reflection:* Sequence numbers dono taraf alag hote hain isliye dono ISN exchange zaroori hai.

**Example 2 — Simultaneous open**  
*Given:* Dono taraf SYN ek saath bhejte hain.  
*Find:* Resulting state.  
Packets cross karte hain; dono SYN-RECEIVED state mein jaate hain phir ACK exchange ke baad ESTABLISHED.  
**Final answer**  
Connection successfully established without extra round-trip.  
*Reflection:* TCP simultaneous open ko handle karta hai lekin aajkal rare hai.

**Example 3 — 4-way termination with pending data**  
*Given:* Client data bhej raha hai, phir close karta hai.  
*Find:* FIN timing.  
Client data segment ke baad FIN bhejta hai; server saare data acknowledge karke apna FIN bhejta hai.  
**Final answer**  
Four segments: FIN, ACK, FIN, ACK.  
*Reflection:* FIN sirf tab bhejna chahiye jab saara data already send ho chuka ho.

**Example 4 — RST instead of FIN**  
*Given:* Server application crash ho jaati hai.  
*Find:* Packet.  
Server RST flag set karke bhejta hai; client turant connection discard karta hai.  
**Final answer**  
Abrupt termination, no 4-way exchange.  
*Reflection:* RST data loss create kar sakta hai isliye normal close ke liye FIN use karo.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| ACK number = last seq       | Students forget +1 rule                 | Always ACK = received seq + 1                |
| Forgetting window scaling   | Header window field 16-bit dikhta hai   | Check TCP options for shift count            |
| SYN flood confusion         | SYN packets count karna bhool jaate hain| SYN cookies ya backlog queue samjho          |
| FIN after RST               | Order galat samajhte hain               | RST connection ko turant tod deta hai        |
| Sequence wrap-around        | 32-bit number 4 GB ke baad repeat hota  | PAWS (Protect Against Wrapped Sequences)     |
| Half-open connection        | Ek taraf crash ho jaaye                 | Keep-alive timers ya application-level checks|

## 7. The textbook-precise statement
A TCP connection is established using a three-way handshake in which the client sends a segment with the SYN bit set and an initial sequence number x; the server responds with a segment having both SYN and ACK bits set, its own initial sequence number y, and acknowledgement number x+1; finally the client sends a segment with ACK bit set and acknowledgement number y+1 (Kurose & Ross, *Computer Networking: A Top-Down Approach*, 8e, §3.5.2). Termination follows a four-way exchange of FIN and ACK segments as specified in RFC 793 Section 3.5.

## 8. Visual — diagram or schematic
```
Client                          Server
  |                                |
  |--- SYN, seq=1000 ------------->|
  |<-- SYN-ACK, seq=5000, ack=1001-|
  |--- ACK, seq=1001, ack=5001 --->|
  |                                |  ESTABLISHED
  |--- FIN, seq=2000 ------------->|
  |<-- ACK, ack=2001 --------------|
  |<-- FIN, seq=6000, ack=2001 ----|
  |--- ACK, ack=6001 ------------->|
  |                                |  CLOSED
```

## 9. The memory technique
1. **The hook** — Imagine three knocks on a door (SYN, SYN-ACK, ACK) aur phir do “goodbye” waves (FIN, ACK) followed by two more waves from the other side.
2. **What to overlearn** — ACK number hamesha received sequence + 1 hota hai; SYN aur FIN dono consume ek sequence number.
3. **Spaced-repetition schedule** — 1 din baad handshake draw karo, 3 din baad flags yaad karo, 7 din baad ek full trace likho, 16 aur 35 din baad exam-style questions solve karo.
4. **First-principles fallback** — Agar flags bhool jaayein to socho: connection kholne ke liye SYN chahiye, band karne ke liye FIN chahiye, acknowledgement ke liye ACK chahiye.

## 10. What this unlocks
TCP header aur handshake samajhne ke baad aap congestion control (slow-start, AIMD), flow control aur modern protocols jaise QUIC ke design ko samajh sakte ho.  
- Next topics: TCP Tahoe/Reno/NewReno, SACK, TLS record layer, QUIC 0-RTT.

## 11. Self-check — five questions, no answers
1. Ek SYN packet mein kaunse flags set hote hain aur kyun?
2. Agar client ka ISN 2147483647 ho aur 1000-byte data bhejta ho to agla sequence number kya hoga?
3. 4-way termination mein ACK aur FIN ek hi packet mein combine ho sakte hain? Kab nahi?
4. Agar server SYN-ACK ke baad crash ho jaaye to client kya karega?
5. Sequence number wrap-around hone par kaunsi problem create hoti hai aur TCP usse kaise bachata hai?