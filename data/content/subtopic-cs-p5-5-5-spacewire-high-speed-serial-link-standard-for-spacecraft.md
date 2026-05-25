## What it is
SpaceWire is a standard for a high-speed, full-duplex, point-to-point serial data link used onboard spacecraft. It defines the physical (cabling, connectors, signaling), data link (character and packet formats), and network (routing) layers for creating a reliable, high-performance data-handling network. It acts as the nervous system connecting sensors, processors, and memory units within a satellite or rover.

## Why it matters
SpaceWire is the de facto standard for high-data-rate onboard networking in modern space missions, from the James Webb Space Telescope's instrument suite to the European Space Agency's BepiColombo mission to Mercury. Understanding it is essential for designing the data acquisition and processing pipelines for scientific instruments that generate enormous amounts of data. As onboard processing and machine learning become more common in space, efficient and robust networks like SpaceWire are critical for moving data between GPUs, FPGAs, and CPUs in real-time.

## When to study it
Before tackling SpaceWire, you must have a firm grasp of the following. If not, study them first.
*   **Digital Logic:** Bits, bytes, binary and hexadecimal representations, parity bits for error detection.
*   **Basic Serial Communication:** The concepts of clocking, data lines, and encoding schemes (e.g., NRZ). You don't need to be an expert in UART or SPI, but you must understand why a receiver needs to be synchronized with a transmitter.
*   **Networking Fundamentals:** The concepts of packets, headers, payloads (cargo), routing, and the difference between a point-to-point link and a shared bus architecture.
*   **OSI Model (Layers 1-3):** A conceptual understanding of the Physical, Data Link, and Network layers.

## How to study it (step by step)
1.  **Grasp the Physical Layer:** Read the abstract and introduction of the official standard, ECSS-E-ST-50-12C, to understand the goals. Then, draw the timing diagram for Data-Strobe Encoding (DSE) for the bit sequence `1010`. This is the fundamental signaling method.
2.  **Deconstruct the N-Char:** An N-Char is the smallest unit of transmission above bits. Understand its 10-bit structure: 1 parity bit, 1 data/control flag, and 8 data bits. Calculate the parity bit for the data byte `0xB4`.
3.  **Build a Packet:** Sketch the structure of a simple SpaceWire packet. It must contain at least a destination address and an End-of-Packet (EOP) marker. Place a 3-byte cargo payload inside your sketch.
4.  **Trace a Packet's Path:** Draw a simple network with one source node, one router, and two destination nodes. Trace the path of a packet from the source to one of the destinations. Show how the router consumes the destination address byte to make its forwarding decision.
5.  **Simulate Flow Control:** Imagine a sender and a receiver. The receiver sends 8 Flow Control Tokens (FCTs) to the sender. The sender transmits a packet with 6 data characters. What is the sender's remaining "credit"? What happens if it tries to send another packet with 3 data characters?

## Key ideas, with intuition
*   **Data-Strobe Encoding (DSE):** Instead of a separate clock wire, which can be noisy and skewed over long distances, SpaceWire embeds the clock into the data stream itself using two signal pairs (Data and Strobe). A transition on the Data line signals a `0`, and a transition on the Strobe line signals a `1`. The receiver just has to detect *a* transition to know when a bit arrived, and then check *which* line it happened on to know the bit's value. This makes the link self-clocking and robust.

*   **Packets and Routers:** Data isn't just broadcast; it's put into discrete packets with a destination address. Think of it like the postal service. You put data (the letter) into a packet (the envelope) with an address. Routers are the sorting offices that read the address and forward the packet down the correct physical link towards its destination. This allows for complex, switchable network topologies, not just a single party line.

*   **Guaranteed Delivery via Flow Control:** In space, lost data can mean lost science. SpaceWire prevents data loss from buffer overruns using a credit-based system. A receiver periodically sends special control characters called Flow Control Tokens (FCTs) back to the transmitter. Each FCT is a promise: "I have space in my input buffer for one more character." The transmitter maintains a counter of these credits and will not send data unless it has credit available. This is a simple, hardware-level mechanism that guarantees the receiver is ready before data is ever sent.

*   **Characters as Building Blocks:** The entire protocol is built upon the transmission of 10-bit sequences called N-Chars. These can represent data bytes, control codes (like EOP or FCT), or special time-codes. This uniform structure simplifies the design of the hardware (typically an FPGA or ASIC) that implements the protocol.

## Worked example
Let's trace the creation and DSE encoding of a single data character, ASCII 'C', which is `0x43` in hexadecimal or `01000011` in binary.

1.  **Identify the Data:** The data payload is the 8-bit value `01000011`.

2.  **Form the N-Char:** An N-Char consists of a Data/Control flag, the 8 data bits, and a parity bit.
    *   **Data/Control Flag:** For data characters, this flag is `0`.
    *   **Parity Calculation:** We need to calculate even parity over the 9 bits (D/C flag + 8 data bits). The bits are `0` (D/C) and `01000011` (Data). The total number of `1`s is 3. To make the total number of `1`s even, the parity bit must be `1`.
    *   **Assemble:** The 10-bit sequence to be transmitted is Parity bit followed by D/C flag followed by the 8 data bits. So, we have: `1` (Parity) `0` (D/C) `01000011` (Data). The full sequence is `1001000011`.

3.  **Encode using Data-Strobe Encoding (DSE):** We transmit this 10-bit sequence bit-by-bit. A `1` causes a transition on the Strobe line; a `0` causes a transition on the Data line. Let's assume both lines start `LOW`.

| Bit to Send | Action                 | Data Line State | Strobe Line State |
| :---------- | :--------------------- | :-------------- | :---------------- |
| (Start)     | (Initial state)        | LOW             | LOW               |
| `1`         | Transition on Strobe   | LOW             | HIGH              |
| `0`         | Transition on Data     | HIGH            | HIGH              |
| `0`         | Transition on Data     | LOW             | HIGH              |
| `1`         | Transition on Strobe   | LOW             | LOW               |
| `0`         | Transition on Data     | HIGH            | LOW               |
| `0`         | Transition on Data     | LOW             | LOW               |
| `0`         | Transition on Data     | HIGH            | LOW               |
| `0`         | Transition on Data     | LOW             | LOW               |
| `1`         | Transition on Strobe   | LOW             | HIGH              |
| `1`         | Transition on Strobe   | LOW             | LOW               |

**Reflection:**
*   Step 1 was about defining the payload.
*   Step 2 wrapped that payload in the protocol's data link layer format (the N-Char), adding metadata for error detection (parity) and type identification (D/C flag).
*   Step 3 translated that logical sequence of bits into physical electrical signals according to the DSE rules, which is the physical layer's job. This shows the clear separation of concerns between layers of the protocol.

## Diagrams
A diagram of Data-Strobe Encoding (DSE) for the bitstream `101`.

```text
       ___     ___     ___
Clock  |   |___|   |___|   |___
       --> Time

       BIT 1       BIT 0       BIT 1
       (Strobe)    (Data)      (Strobe)
       _______________________
Data               _______
       ___________|

Strobe   _______         _______
       __|       |_______|
```

A simple SpaceWire network topology.

```text
+----------+      Point-to-Point      +----------+      Point-to-Point      +-------------+
|  Node 1  |------Link A--------------| Router 1 |------Link C--------------| Destination |
| (Source) |                          +----------+                          |   Node 2    |
+----------+                                |                               +-------------+
                                              | Link B
                                              |
                                        +-------------+
                                        | Destination |
                                        |   Node 3    |
                                        +-------------+
```

## Memory technique — remember this forever
1.  **The Story:** Think of SpaceWire as a **Cosmic Railway**.
    *   **Packets** are the trains carrying precious cargo (science data).
    *   **Routers** are the railway switches/junctions. They read the **Destination Address** (the ticket on the front of the train) and throw the switch to send the train down the correct track.
    *   **Data-Strobe Encoding (DSE)** is the special electric third rail system. Instead of one rail for power (clock) and one for signals (data), it has two signal rails: the **D**ata rail and the **S**trobe rail. A spark on the **D**-rail means `0`, a spark on the **S**-rail means `1`. The train's engine just needs to see a spark to move forward one "tick".
    *   **Flow Control Tokens (FCTs)** are the signals from the destination station master back to the origin. The station master radios: "I have 8 empty platforms." The origin station master notes this down ("8 credits") and will only dispatch up to 8 trains.

2.  **Must Overlearn:**
    *   DSE: **Data transition = 0, Strobe transition = 1.**
    *   Packet Structure: `[Destination Address(es)] [Cargo] [EOP]`
    *   Flow Control: **Sender must receive FCTs (credits) from receiver before transmitting data.**

3.  **Spaced Repetition Schedule:**
    *   Review these key ideas and the Cosmic Railway story in: 1 day, 3 days, 7 days, 16 days, 35 days. Spend no more than 5 minutes on each review.

4.  **First Principles Pathway:** If you forget the details, rebuild from the core problem: reliable, high-speed data transfer in a noisy environment (space) between many modules.
    *   *Problem:* How to avoid clock skew over long cables? -> *Solution:* Get rid of the separate clock line. Embed clocking in the data. -> *Implementation:* Data-Strobe Encoding.
    *   *Problem:* How to connect many modules without a slow, shared bus? -> *Solution:* Use point-to-point links and switches. -> *Implementation:* Packet-based routing with routers.
    *   *Problem:* How to avoid losing data if a processor is temporarily busy? -> *Solution:* The receiver must tell the sender when it's ready. -> *Implementation:* Credit-based flow control (FCTs).

## Common mistakes
*   **Confusing SpaceWire with a Bus:** Students accustomed to I2C or CAN might visualize SpaceWire as multiple devices on a single shared wire. This is incorrect. SpaceWire is strictly point-to-point; every link connects exactly two components (e.g., a node to a router, or two routers).
*   **Forgetting Routers Consume Addresses:** When a packet with destination path `[Addr1, Addr2]` arrives at a router, the router reads `Addr1`, forwards the packet based on that address, and *removes* `Addr1` from the packet. The packet that leaves the router now has the destination path `[Addr2]`. The address is part of the routing instruction, not the final payload.
*   **Ignoring the NULL Character:** When a link is idle, it doesn't go silent. The transmitter continuously sends `NULL` characters (`0x00`). This keeps the link active, allows the receiver to maintain bit-lock, and is used to send FCTs back to the transmitter.
*   **Mixing up DSE and Manchester Coding:** Both are self-clocking, but Manchester encoding has a transition in the *middle* of every bit period, defining the clock edge, while the direction of the transition defines the bit value. DSE has only *one* transition per bit period, and the line it occurs on defines the bit value.

## Self-check
1.  A SpaceWire link is transmitting the 10-bit N-Char `0011010101`. Write down the sequence of transitions on the Data and Strobe lines.
2.  A packet needs to be sent from Node A to Node D. The path is A -> Router 1 -> Router 2 -> D. The port on Router 1 leading to Router 2 is port `5`. The port on Router 2 leading to Node D is port `2`. What is the sequence of destination address bytes that must be at the front of the packet when it leaves Node A?
3.  A receiver has a buffer size of 16 characters. Its link partner (the sender) has just been powered on. Describe the initial handshake of FCTs that must occur and explain why. What is the sender's credit count just before it sends its first data packet?