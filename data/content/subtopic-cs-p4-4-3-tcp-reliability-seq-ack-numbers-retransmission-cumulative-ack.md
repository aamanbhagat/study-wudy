## What it is
TCP reliability is the protocol's guarantee that data sent from a source arrives at its destination completely, without errors, and in the correct order. It achieves this by treating data as a stream of bytes, assigning a sequence number to each byte, and using corresponding acknowledgement numbers and retransmission timers to handle data that is lost or arrives out of order over an unreliable network.

## Why it matters
This mechanism is the foundation of the modern web and most distributed systems. In aerospace, commanding a deep-space probe requires absolute certainty that the command sequence (e.g., "fire thruster for 1.2 seconds") is received exactly as sent; TCP's reliability ensures this. When analyzing petabytes of data from physics experiments like the Large Hadron Collider, this data must be transferred from detectors to global computing grids without corruption, a task for which TCP is essential.

## When to study it
You must understand the TCP/IP model, specifically the roles of the Network Layer (Layer 3) and Transport Layer (Layer 4). You should be comfortable with the idea that the Internet Protocol (IP) offers only a "best-effort" datagram service, meaning it doesn't guarantee delivery, order, or integrity. Finally, you should have seen the basic structure of a TCP header and know that it contains fields for Sequence and Acknowledgement numbers.

## How to study it (step by step)
1.  **Review the TCP Header:** Isolate the 32-bit Sequence Number and 32-bit Acknowledgement Number fields. Understand that these numbers refer to *byte counts*, not packet counts.
2.  **Diagram a Perfect Transfer:** On paper, draw a timeline with a Sender (A) and Receiver (B). A sends one segment with `SEQ=100` and 100 bytes of data. Calculate the `ACK` number B must send back. Why is it `200` and not `101`?
3.  **Diagram Packet Loss:** Draw the same timeline, but this time the segment from A to B is lost. Show A's retransmission timer (RTO) expiring. What does A do? How does the exchange proceed from there?
4.  **Introduce Cumulative ACKs:** Now, A sends three 100-byte segments back-to-back: `SEQ=100`, `SEQ=200`, `SEQ=300`. Assume they all arrive. B only needs to send back one ACK. What is its value? Draw this to see the efficiency.
5.  **Diagram ACK Loss:** Consider the three-segment transfer from the previous step. What if B's final ACK (`ACK=400`) is lost on its way back to A? Does A retransmit all three segments? Why or why not? (Hint: A's timer for the first segment will expire. What happens then?)
6.  **Use Wireshark:** Capture a simple HTTP file download (e.g., `curl http://example.com`). In Wireshark, filter for `tcp`. Follow a TCP stream and observe how the sequence and acknowledgement numbers increment with each data segment.

## Key ideas, with intuition
1.  **TCP is a Byte-Stream Protocol:** Forget about packets for a moment. Imagine you are sending the content of a file as one long, continuous stream of bytes. TCP's job is to make sure that exact stream is recreated on the other end. The sequence number (`SEQ`) in a TCP segment is simply the position in this stream of the *first byte of data* in that segment.
    $$
    \text{Next SEQ} = \text{Previous SEQ} + \text{length of data in Previous Segment}
    $$

2.  **Acknowledgements are Cumulative and Forward-Looking:** The acknowledgement number (`ACK`) is the single most elegant part of the system. An `ACK` number sent by the receiver does not confirm receipt of a specific packet. Instead, it declares: "I have successfully received every single byte up to `ACK - 1`, and I am now waiting for the byte numbered `ACK`." This is powerfully efficient; a single `ACK` can confirm the receipt of many prior segments.
    $$
    \text{ACK number} = \text{SEQ of next byte expected}
    $$

3.  **The Sender Trusts Only ACKs, Not Time:** A sender starts a timer, the Retransmission Timeout (RTO), every time it sends data. If that timer expires before an ACK arrives confirming receipt of that data, the sender assumes the data was lost and sends it again. It doesn't know if the original data packet was lost or if the receiver's ACK was lost; the result is the same—retransmit. This simple, robust rule is the core of TCP's ability to function over unreliable networks.

## Worked example
**Scenario:** Sender A wants to send the 10-byte string "ROCKETFUEL" to Receiver B. A's Initial Sequence Number (ISN) is 400. The data is sent in two segments. The first segment is lost.

**Steps:**

1.  **A sends Segment 1:** A splits the data. The first segment contains "ROCKET".
    *   Payload: "ROCKET" (6 bytes)
    *   `SEQ = 400` (A's initial sequence number)
    *   A starts a retransmission timer for this segment.
    *   This segment is **lost** in the network.

2.  **A sends Segment 2:** A immediately sends the next segment containing "FUEL".
    *   Payload: "FUEL" (4 bytes)
    *   `SEQ = 400 + 6 = 406`
    *   A starts a retransmission timer for this segment.

3.  **B receives Segment 2:** B receives the segment with `SEQ=406`.
    *   **Problem:** B was expecting `SEQ=400`. This segment is out of order.
    *   **Action:** B buffers the data ("FUEL") and sends an ACK for the last in-order byte it received. Since it hasn't received *any* data in this stream yet, it re-sends the ACK from the connection setup, which would be `ACK=400`. (If it had received data up to byte 399, it would send `ACK=400` here). This ACK tells A: "I am still waiting for byte 400."

4.  **A's Timer Expires:** A's retransmission timer for Segment 1 (`SEQ=400`) expires.
    *   **Assumption:** A assumes Segment 1 was lost.
    *   **Action:** A retransmits Segment 1.
    *   New Segment 1: Payload="ROCKET", `SEQ=400`.

5.  **B receives the Retransmitted Segment 1:**
    *   **Success:** B receives the segment with `SEQ=400`. This is the data it was waiting for.
    *   **Action:** B processes "ROCKET". It then checks its buffer and finds "FUEL" (`SEQ=406`). It can now assemble the full string "ROCKETFUEL".
    *   B has now received all bytes from 400 to 409. The next byte it expects is 410.
    *   B sends a single, cumulative ACK: `ACK = 410`.

6.  **A receives the Cumulative ACK:** A receives `ACK=410`.
    *   **Interpretation:** This single ACK confirms that B has received everything up to byte 409. This covers both the original "ROCKET" segment and the "FUEL" segment.
    *   **Action:** A cancels the retransmission timer for Segment 2 (`SEQ=406`) and considers the entire 10-byte transfer successful.

**Reflection:** This example shows the entire system at work. The receiver uses duplicate ACKs to signal a gap (`ACK=400`), the sender uses a timeout to detect loss, and the final cumulative ACK (`ACK=410`) efficiently resolves the entire transaction.

## Diagrams
A successful transfer with a cumulative ACK:
```text
Sender A                                      Receiver B
   |                                                |
   | --- SEQ=100, len=100 ("data packet 1") --->    |
   |                                                |
   | --- SEQ=200, len=100 ("data packet 2") --->    |
   |                                                |
   |                                      <-- ACK=300 --- |
   |                                                |
(A knows all bytes up to 299 were received)        |
```

A transfer with a lost data segment and retransmission:
```text
Sender A                                      Receiver B
   |                                                |
   | --- SEQ=100, len=100 ---> X (lost)             |
   |                                                |
   | --- SEQ=200, len=100 --->                      |
   |                                                |
   |                        <--- ACK=100 ---         | (B signals it's still waiting for 100)
   |                                                |
(Timer for SEQ=100 expires)                       |
   |                                                |
   | --- SEQ=100, len=100 (retransmit) --->         |
   |                                                |
   |                        <--- ACK=300 ---         | (B now has 100-299, ACKs all at once)
   |                                                |
```

## Memory technique — remember this forever
1.  **The Story:** Think of TCP as a meticulous librarian (the receiver) talking to an eager but slightly paranoid author (the sender) over a faulty phone line.
    *   **Author (Sender):** "Here is page 101." (Sends `SEQ=101`).
    *   **Librarian (Receiver):** "Got it. Send me page 102." (Sends `ACK=102`).
    *   The `ACK` number is always the *page number the librarian is requesting*, not the one they just received. This confirms all previous pages are safely on the shelf. If the line crackles and the author doesn't hear back, they assume the page was lost in transit and just say it again.

2.  **Must-Know Facts:** Overlearn these two relationships. Do not paraphrase.
    *   `Sequence Number`: The byte-stream position of the first byte of data in a segment.
    *   `Acknowledgement Number`: The sequence number of the *next* byte the receiver expects to receive. It is cumulative.

3.  **Spaced Repetition Schedule:** Review this mini-lesson and redraw the diagrams from memory at these intervals:
    *   24 hours
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget everything, rebuild it from this truth: "I need to send a stream of bytes reliably over a network that loses and reorders things."
    *   How do I know the order? I must *number* the bytes. -> **Sequence Numbers**.
    *   How does the sender know the bytes arrived? The receiver must *confirm* receipt. -> **Acknowledgements**.
    *   How should it confirm? Confirming every byte is inefficient. Let's confirm the *total contiguous block* received. -> **Cumulative ACKs**.
    *   What if a message or its confirmation gets lost? The sender must have a *timeout* and *retransmit*. -> **Retransmission Timeout (RTO)**.

## Common mistakes
*   **Off-by-one on ACKs:** Thinking `ACK=N` acknowledges receipt of byte `N`. It acknowledges everything up to `N-1`.
*   **Confusing Byte and Segment Counting:** Sending a 1000-byte segment with `SEQ=500` means the next segment will start with `SEQ=1500`, not `SEQ=501`. Sequence numbers count bytes, not segments.
*   **Assuming ACKs are never lost:** Students often diagram scenarios where only data packets are lost. A lost ACK will cause the sender's RTO to expire, leading to an unnecessary retransmission. The receiver will see the duplicate data, discard it, and simply re-send the same cumulative ACK.
*   **Misunderstanding Duplicate ACKs:** When a receiver gets an out-of-order segment, it immediately sends an ACK for the last in-order byte it received. This is called a "duplicate ACK" and is a critical signal to the sender that something is wrong, often triggering a faster retransmission mechanism than waiting for a full timeout.

## Self-check
1.  A TCP connection is established and the client's Initial Sequence Number is 1500. The client sends an HTTP GET request that is 200 bytes long. What is the Sequence Number in the header of this TCP segment? If the server receives it correctly, what Acknowledgement Number will it send back?
2.  A sender transmits four 500-byte segments with sequence numbers 1000, 1500, 2000, and 2500. The segment with `SEQ=1500` is delayed and arrives after the segment with `SEQ=2500`. All other segments and all ACKs arrive in order and without loss. Write down the sequence of `ACK` numbers the receiver sends.
3.  Consider a scenario where the network has a very high bandwidth but also a very long delay (e.g., a satellite link to Mars). Explain why a simple stop-and-wait approach (send one packet, wait for ACK, send next packet) would be incredibly inefficient. How does TCP's use of a "sliding window" (a related concept) in conjunction with cumulative ACKs solve this problem?