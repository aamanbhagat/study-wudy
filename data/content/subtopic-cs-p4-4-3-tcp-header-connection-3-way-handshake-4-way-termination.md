## What it is
The Transmission Control Protocol (TCP) is a core protocol of the Internet Protocol suite that provides reliable, ordered, and error-checked delivery of a stream of bytes between applications running on hosts. It achieves this by establishing a connection using a "three-way handshake," managing data flow with sequence and acknowledgment numbers encapsulated in a TCP header, and terminating the connection with a "four-way handshake."

## Why it matters
TCP is the backbone of most internet traffic you use daily, including web browsing (HTTP/S), email (SMTP), and secure remote access (SSH). In aerospace, TCP is crucial for reliable ground-to-spacecraft communication for command uplinks and telemetry downlinks where data integrity is non-negotiable. Large-scale physics simulations and machine learning models rely on TCP to transfer massive datasets between compute clusters and storage systems without corruption.

## When to study it
Before tackling TCP, you must have a solid understanding of the network layers below it. Specifically, you need to know:
1.  **The IP Protocol**: What an IP address is and how IP packets are routed across networks.
2.  **Ports**: The concept of a port number as an endpoint for communication on a specific host.
3.  **The Client-Server Model**: The basic architecture of one machine (client) requesting services from another (server).
If you are unclear on these, review the Network and Transport layers of the OSI or TCP/IP model first.

## How to study it (step by step)
1.  **Dissect the Header**: Draw the TCP header by hand. Label each of the key fields: Source Port, Destination Port, Sequence Number, Acknowledgment Number, Header Length, Flags (URG, ACK, PSH, RST, SYN, FIN), and Window Size. For each field, write one sentence explaining its purpose.
2.  **Trace the Handshake**: On paper, draw a client and a server. Diagram the three packets of the 3-way handshake. For each packet, write down the SYN and ACK flags being set, and invent plausible initial sequence numbers (ISNs) to see how the sequence and acknowledgment numbers increment.
3.  **Trace the Termination**: Using the same diagram, trace the four packets of the 4-way termination. Pay close attention to which side initiates the termination and how the FIN and ACK flags are used. Note the "half-closed" state.
4.  **Capture It Live**: Install Wireshark (a packet analyzer). Start a capture on your network interface, then open a web browser and navigate to a simple `http://` website (not `https` for now, as encryption obscures the details). Stop the capture and filter for `tcp`. Find the 3-way handshake (packets with `[SYN]`, `[SYN, ACK]`, `[ACK]`) that established the connection to the web server. Compare the real packets to your drawing.
5.  **Reason About Failure**: Articulate why a 2-way handshake is insufficient. Consider a scenario where an old, delayed SYN packet from a previous connection attempt arrives at the server. How would a 2-way handshake fail, and how does the third step of the 3-way handshake prevent this?

## Key ideas, with intuition
1.  **State Machines Governed by Flags**: The TCP connection is a state machine. The 6 control flags in the header (URG, ACK, PSH, RST, SYN, FIN) are the levers that move the connection from one state to another (e.g., from `CLOSED` to `SYN-SENT` to `ESTABLISHED`). The most important for connection management are SYN (Synchronize), ACK (Acknowledge), and FIN (Finish).
2.  **Sequence Numbers Track Bytes, Not Packets**: The Sequence Number is not a packet counter. It is a byte counter. If you send a SYN packet with an Initial Sequence Number (ISN) of $S$, and then send a packet with 1000 bytes of data, the next packet you send will have a sequence number of $S+1000$. The SYN and FIN flags themselves also consume one sequence number each, as they are considered part of the byte stream for state-tracking purposes.
3.  **Acknowledgments are Cumulative and Forward-Looking**: The Acknowledgment Number is the value of the *next* sequence number the sender of the acknowledgment expects to receive. If Host B sends an ACK with number $A$, it is confirming it has received all bytes up to $A-1$ and is now waiting for the byte numbered $A$. This is a clever, cumulative ACK system.
    $$
    \text{AckNum} = \text{LastSeqNumReceived} + \text{LengthOfDataReceived}
    $$
4.  **The Handshake Solves the Two Generals' Problem**: How can two parties be certain they have established a communication channel over an unreliable medium? Party A sends a message. B receives it and sends an acknowledgment. But now A needs to acknowledge B's acknowledgment, otherwise B doesn't know if its ACK was received. This could go on forever. The 3-way handshake is the practical engineering solution: A sends SYN, B sends SYN-ACK, and A sends ACK. At this point, B knows A is ready, and A knows B is ready. The connection is established.

## Worked example
Let's trace a 3-way handshake. A client (IP `10.0.0.5`, ephemeral port `49152`) wants to connect to a web server (IP `203.0.113.80`, port `80`).

**Step 1: Client sends SYN**
The client initiates the connection by sending a TCP segment to the server.
- **Source Port**: `49152`
- **Destination Port**: `80`
- **Flags**: `SYN` bit is set to 1.
- **Sequence Number**: A random Initial Sequence Number (ISN) is chosen. Let's say `Seq = 1000`.
- **Acknowledgment Number**: This field is unused, `Ack = 0`.

The client is saying: "I want to connect. My starting sequence number is 1000." It now enters the `SYN-SENT` state.

**Step 2: Server responds with SYN-ACK**
The server, listening on port 80, receives the SYN packet. It allocates resources for the connection and sends back a segment.
- **Source Port**: `80`
- **Destination Port**: `49152`
- **Flags**: Both `SYN` and `ACK` bits are set to 1.
- **Sequence Number**: The server chooses its own random ISN. Let's say `Seq = 5000`.
- **Acknowledgment Number**: The server acknowledges the client's SYN. Since the client's SYN consumed one sequence number, the server expects the next byte to be `1001`. So, `Ack = 1001`.

The server is saying: "I acknowledge your request starting at 1001. I'm also ready to connect, and my starting sequence number is 5000." The server now enters the `SYN-RCVD` state.

**Step 3: Client responds with ACK**
The client receives the server's SYN-ACK. It is now confident the server is ready. It sends one final segment to complete the handshake.
- **Source Port**: `49152`
- **Destination Port**: `80`
- **Flags**: `ACK` bit is set to 1.
- **Sequence Number**: This is the next sequence number the client will use for data. It's the same as its ISN plus one: `Seq = 1001`.
- **Acknowledgment Number**: The client acknowledges the server's SYN. The server's SYN consumed sequence number 5000, so the client expects the next byte to be 5001. `Ack = 5001`.

The client is saying: "I acknowledge your connection starting at 5001." Both client and server now enter the `ESTABLISHED` state. The connection is open and data transfer can begin.

**Reflection**: Each step logically builds on the last. Step 1 proposes a connection. Step 2 accepts the proposal and makes its own. Step 3 confirms the acceptance. This symmetrical agreement ensures both parties are ready and synchronized before any data is sent.

## Diagrams
**3-Way Handshake**
```text
      Client                                     Server
(State: CLOSED)                             (State: LISTEN)
       |                                            |
       | ------------ SYN (Seq=x) ----------------> |
       |                                            |
(State: SYN-SENT)                               (State: SYN-RCVD)
       |                                            |
       | <---- SYN (Seq=y), ACK (Ack=x+1) ---------- |
       |                                            |
(State: ESTABLISHED)                                |
       |                                            |
       | ------------ ACK (Ack=y+1) ---------------> |
       |                                            |
                                              (State: ESTABLISHED)
```

**4-Way Termination (Client Initiates)**
```text
      Client                                     Server
(State: ESTABLISHED)                        (State: ESTABLISHED)
       |                                            |
       | ------------ FIN (Seq=u) ----------------> |
       |                                            |
(State: FIN-WAIT-1)                                 |
       |                                            |
       | <------------ ACK (Ack=u+1) --------------- |
       |                                            |
(State: FIN-WAIT-2)                         (State: CLOSE-WAIT)
       |                                            |
       . . . . . . (Server may still send data) . . . . . .
       |                                            |
       | <------------ FIN (Seq=v) --------------- |
       |                                            |
(State: TIME-WAIT)                               (State: LAST-ACK)
       |                                            |
       | ------------ ACK (Ack=v+1) ---------------> |
       |                                            |
(State: CLOSED)                                 (State: CLOSED)
```

## Memory technique — remember this forever
1.  **The Story**: Think of it as a formal phone call to set up a meeting.
    - **Handshake**:
        - **You (Client)**: "Hi, this is Client, can you hear me?" (SYN)
        - **Them (Server)**: "Yes, I can hear you, this is Server. Can you hear me?" (SYN-ACK)
        - **You (Client)**: "Yes, I can hear you too. Let's talk." (ACK)
    - **Termination**:
        - **You**: "Okay, I'm done talking." (FIN)
        - **Them**: "Okay, I hear you're done talking." (ACK)
        - *(They finish their last sentence)*
        - **Them**: "Okay, I'm also done talking now." (FIN)
        - **You**: "Got it. Goodbye." (ACK)
2.  **Must-learn Facts**: Overlearn the flag sequences.
    - **Connection**: `SYN` -> `SYN, ACK` -> `ACK`
    - **Termination**: `FIN` -> `ACK` -> `FIN` -> `ACK`
3.  **Spaced Repetition Schedule**: Review this material and try to redraw the diagrams from memory at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway**: If you forget the details, remember the goal: **mutual, unambiguous agreement.** For connection, both sides must know the other is alive, ready, and has received their initial parameters (the ISN). A 2-way handshake (SYN -> ACK) is not enough, because the initiator of the ACK doesn't know if it was received. The third ACK solves this, confirming for the server that the client is *also* ready. For termination, each side must independently close its sending stream (`FIN`) and have that closure acknowledged (`ACK`).

## Common mistakes
1.  **Mixing up Seq and Ack numbers**: Remember, the Acknowledgment number you send is always the Sequence number you *expect to receive next* from the other party.
2.  **Forgetting SYN/FIN consume a sequence number**: The SYN and FIN control flags are treated as if they are one byte of data in the sequence space. This is why the ACK for a SYN with `Seq=x` is `Ack=x+1`.
3.  **Confusing the 4-way termination with a 2-way**: A common error is to think one FIN/ACK pair closes the whole connection. It doesn't. It closes only one direction of data flow (e.g., client-to-server). The server can still send data until it sends its own FIN, creating a "half-closed" state.
4.  **Assuming Sequence Numbers start at 0 or 1**: They don't. They start at a random 32-bit value (the ISN) to prevent a specific type of network attack called TCP sequence prediction.

## Self-check
1.  A client sends a TCP segment with the SYN flag set and a sequence number of 4200. What are the values of the SYN flag, ACK flag, sequence number, and acknowledgment number in the server's response, assuming the server chooses an ISN of 9500?
2.  In the 4-way termination diagram, what is the purpose of the `TIME-WAIT` state? Why doesn't the client go directly from `FIN-WAIT-2` to `CLOSED` after sending its final ACK?
3.  Describe a scenario where a malicious actor could disrupt a TCP connection if the Initial Sequence Numbers were predictable (e.g., always starting at 0). How does a random ISN prevent this?