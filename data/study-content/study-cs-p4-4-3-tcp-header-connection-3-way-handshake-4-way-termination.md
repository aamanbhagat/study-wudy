## 1. What it is — in plain English

Imagine you want to send a very important letter to a friend across the country. You could just put it in an envelope and drop it in any mailbox. This is fast and simple, but what if the letter gets lost? What if it arrives out of order with other letters you sent? What if parts of it are torn or unreadable? You wouldn't know, and your friend wouldn't know if they received the whole message.

TCP, which stands for Transmission Control Protocol, is like a super-reliable, meticulous postal service for your computer's data. Instead of just dropping your data into the internet's "mailbox" (which is what IP, or Internet Protocol, does), TCP first makes sure there's a clear line of communication established with the recipient. It's like calling your friend and saying, "Hey, I'm about to send you some important letters, are you ready to receive them?"

Once the connection is set up, TCP breaks your data into smaller, numbered chunks, like pages in a book. It sends these pages one by one, and for each page, it waits for an acknowledgment from your friend saying, "Got page 1! Send page 2!" If a page gets lost or damaged, TCP notices and resends it. When you're done, TCP even makes sure to politely say "goodbye" and confirm that both sides are finished, ensuring no messages are cut off mid-sentence.

In essence, TCP takes the chaotic, unreliable nature of the internet and transforms it into a dependable, ordered, and error-checked stream of data for your applications. It ensures that what you send is exactly what the other side receives, in the correct order, and that both parties know when the conversation has truly begun and ended.

## 2. Why it matters — real-world applications

TCP is the backbone of the modern internet, providing the reliability necessary for almost all interactive and critical online services. Without it, the internet as we know it would simply not function.

1.  **Web Browsing (HTTP/S):** Every time you load a webpage, stream a video on YouTube, or buy something online, your web browser (client) uses TCP to establish a connection with the web server. TCP ensures that all the HTML, CSS, JavaScript, and images that make up the page are delivered completely, in the correct order, and without corruption. This reliability is paramount for e-commerce transactions, where missing data could lead to incorrect billing or failed orders.
2.  **Email (SMTP, IMAP, POP3):** When you send or receive an email, TCP is the underlying protocol that guarantees your message reaches its destination intact. Email protocols like SMTP (Simple Mail Transfer Protocol) for sending and IMAP (Internet Message Access Protocol) or POP3 (Post Office Protocol version 3) for receiving rely on TCP to ensure that no part of your email—text, attachments, or formatting—is lost or altered during transit. Imagine sending a critical business report only for half of it to disappear; TCP prevents such disasters.
3.  **Secure Shell (SSH) and File Transfer Protocol (FTP/SFTP):** These protocols are used for securely logging into remote computers and transferring files. SSH provides a secure, encrypted connection, which itself is built on top of TCP. When you use SSH to manage a server or SFTP to upload files, TCP guarantees the integrity and order of every command you type and every byte of data you transfer. In fields like aerospace, secure and reliable file transfer is critical for deploying software updates to ground stations or transferring telemetry data from spacecraft.
4.  **Distributed Machine Learning Training:** In large-scale machine learning, models are often trained across many interconnected computers (nodes). These nodes frequently exchange large amounts of data, such as model weights, gradients, and training datasets. TCP is used to ensure that these exchanges are reliable and ordered. For example, if a parameter server sends updated model weights to a worker node, TCP guarantees that the worker receives the complete and correct set of weights, preventing training errors or model divergence due due to corrupted data.
5.  **Critical Command and Control Systems (e.g., in Physics Research):** In sensitive environments like particle accelerators (CERN) or fusion reactors (ITER), control systems send precise commands and receive vast amounts of experimental data. While real-time aspects might use UDP for speed, the setup, configuration, and transmission of critical, non-time-sensitive data often rely on TCP. For instance, configuring experimental parameters or transferring large datasets of sensor readings for post-analysis requires TCP's guarantee of data integrity and delivery, ensuring that commands are executed correctly and scientific data is preserved accurately.

## 3. Prerequisites — what you must know first

Before diving deep into TCP, ensure you have a solid grasp of these fundamental networking concepts:

*   **OSI Model / TCP/IP Model**: Understanding the layered architecture of network communication, specifically knowing that TCP operates at the Transport Layer.
*   **IP (Internet Protocol)**: How data is addressed and routed across different networks, providing a "best-effort" but unreliable delivery service.
*   **Packets / Datagrams**: The basic units of data that travel across a network; TCP segments are encapsulated within IP datagrams.
*   **Ports**: Numerical identifiers that allow specific applications on a host to send and receive network traffic.
*   **Client-Server Model**: The fundamental interaction pattern where a client requests a service from a server.
*   **Reliability vs. Unreliability**: The distinction between protocols that guarantee delivery (like TCP) and those that do not (like UDP or IP).
*   **Flow Control**: Mechanisms to prevent a fast sender from overwhelming a slow receiver with too much data.
*   **Congestion Control**: Mechanisms to prevent a sender from overwhelming the network itself, leading to degraded performance for all users.

## 4. The core idea — step by step

TCP's core idea is to provide a reliable, ordered, and error-checked byte stream service over an unreliable network. It does this through a sophisticated mechanism involving connection establishment, data transfer, and connection termination.

### Step 1: The Need for Reliability

*   **Plain English Statement:** The internet, at its most basic level (the IP layer), is like sending postcards: you put an address on it, drop it in the mail, and hope it gets there. There's no guarantee it won't get lost, arrive out of order, or even be damaged. TCP's first job is to fix this inherent unreliability.
*   **Concrete Example:** If you're downloading a software update, imagine if half the bytes went missing or arrived in the wrong order. The software would be corrupted and unusable. TCP steps in to ensure every single byte arrives exactly as sent.
*   **Formal/Mathematical Version:** IP provides a "best-effort" datagram delivery service. TCP transforms this into a reliable, connection-oriented, byte-stream service. This means TCP ensures:
    1.  **Ordered Delivery:** Bytes are delivered to the application in the same order they were sent.
    2.  **Error-Free Delivery:** Data corruption is detected and corrected (via retransmission).
    3.  **No Loss:** Lost segments are detected and retransmitted.
    4.  **No Duplication:** Duplicate segments are discarded.
*   **What Could Go Wrong:** Without TCP, applications would constantly have to deal with missing data, garbled messages, and data arriving out of sequence, making complex communication nearly impossible.

### Step 2: Connection-Oriented Communication

*   **Plain English Statement:** Before you start a serious conversation with someone, you usually make eye contact, perhaps say "hello," and make sure they're ready to talk. TCP does the same for data: it establishes a formal connection between two applications before any meaningful data is exchanged.
*   **Concrete Example:** When you open your web browser and navigate to a website, your browser doesn't just start asking for web pages. First, it "shakes hands" with the web server to set up a dedicated communication channel.
*   **Formal/Mathematical Version:** TCP is a **connection-oriented** protocol. This means that a logical connection must be established between two endpoints (a client and a server) before data can be exchanged. This connection is identified by a **5-tuple**: (Source IP, Source Port, Destination IP, Destination Port, Protocol). This is distinct from connectionless protocols like UDP, which simply send datagrams without prior setup.
*   **What Could Go Wrong:** If a connection cannot be established (e.g., the server is down, a firewall blocks the connection), the client application will receive an error and won't be able to send data.

### Step 3: The TCP Header — The Control Panel of Reliability

*   **Plain English Statement:** Every chunk of data TCP sends (called a segment) isn't just raw data. It has a "label" or "envelope" attached to it—the TCP header. This header contains crucial information that allows TCP to manage the connection, ensure reliability, and put data back in order. It's like the control panel for the reliable postal service.
*   **Concrete Example:** Imagine each page of your important letter has a small note at the top saying: "From: Me, To: Friend, Page Number: 5, I'm expecting you to confirm page 4, My window for receiving is 10 pages." This is what the TCP header does.
*   **Formal/Mathematical Version:** The TCP header is typically 20 bytes long (without options) and contains several critical fields:
    *   **Source Port (16 bits):** Identifies the sending application.
    *   **Destination Port (16 bits):** Identifies the receiving application.
    *   **Sequence Number (32 bits):** The byte stream number of the first data byte in this segment. If SYN is present, this is the initial sequence number (ISN) and the first data byte is ISN+1.
    *   **Acknowledgment Number (32 bits):** If the ACK flag is set, this field contains the next sequence number the sender of the ACK is expecting to receive. It's a cumulative acknowledgment.
    *   **Data Offset (4 bits):** Specifies the length of the TCP header in 32-bit words (needed because of the variable-length Options field).
    *   **Reserved (6 bits):** Reserved for future use, typically set to zero.
    *   **Flags (6 bits):** Control bits that signal the purpose of the segment:
        *   **URG (Urgent Pointer valid):** Indicates that the Urgent Pointer field is significant.
        *   **ACK (Acknowledgment valid):** Indicates that the Acknowledgment Number field is significant.
        *   **PSH (Push function):** Asks the receiving application to "push" the data to the application immediately.
        *   **RST (Reset the connection):** Resets the connection due to an error or to reject an invalid segment.
        *   **SYN (Synchronize sequence numbers):** Used to initiate a connection.
        *   **FIN (No more data from sender):** Used to terminate a connection.
    *   **Window Size (16 bits):** The number of bytes the receiver is currently willing to accept, starting from the byte indicated by the Acknowledgment Number. Used for flow control.
    *   **Checksum (16 bits):** Used for error-checking of the header and data.
    *   **Urgent Pointer (16 bits):** Points to the sequence number of the byte following the urgent data.
    *   **Options (variable):** Optional fields for additional functionality (e.g., Maximum Segment Size, Window Scale, Timestamps).
*   **What Could Go Wrong:** A corrupted header could lead to misinterpretation of the segment's purpose, incorrect sequence numbers, or failed checksums, resulting in dropped segments or connection resets.

### Step 4: Sequence Numbers and Acknowledgments — The Core of Reliability

*   **Plain English Statement:** To ensure data arrives in order and nothing is lost, TCP numbers every byte it sends. The receiver then acknowledges receipt of these bytes, essentially saying, "I got everything up to this point, send me the next batch!"
*   **Concrete Example:** If you send a 1000-byte file, TCP might break it into two 500-byte segments. The first segment starts with sequence number 0 (bytes 0-499). The receiver gets it and sends back an acknowledgment for sequence number 500, meaning "I've received bytes up to 499, and I'm waiting for byte 500 next."
*   **Formal/Mathematical Version:**
    *   **Sequence Number (SEQ):** Each byte in the TCP stream is assigned a sequence number. The `Sequence Number` field in the TCP header indicates the sequence number of the *first byte of data* in that particular segment.
    *   **Acknowledgment Number (ACK_num):** When a host receives data, it sends an acknowledgment. The `Acknowledgment Number` field contains the sequence number of the *next byte it expects to receive*. This is a **cumulative acknowledgment**, meaning it acknowledges all bytes up to `ACK_num - 1`.
    *   For a segment with `SYN=1` or `FIN=1` (control segments without data), the segment itself consumes one sequence number. So, if `SEQ=x` and `SYN=1`, the next expected sequence number for the peer's ACK would be $x+1$.
    *   If a segment carries $L$ bytes of data, and its `Sequence Number` is $S$, then the bytes $S, S+1, \dots, S+L-1$ are contained in this segment. The receiver would acknowledge this by sending an `Acknowledgment Number` of $S+L$.
*   **What Could Go Wrong:** Lost acknowledgments can cause the sender to retransmit data unnecessarily (though TCP has mechanisms to handle this). Incorrect sequence numbers can lead to data being reassembled incorrectly.

### Step 5: The 3-Way Handshake — Establishing a Connection

*   **Plain English Statement:** This is how two computers politely introduce themselves and agree to start talking. It's a three-step "knock-knock" joke to make sure both sides are ready and know where to begin counting their messages.
*   **Concrete Example:**
    1.  **Client (SYN):** "Hello, I'd like to talk. My starting 'page number' is 100." (Sends a segment with SYN flag set, Sequence Number = 100).
    2.  **Server (SYN-ACK):** "Okay, I'm ready to talk! I got your page 100, so I'm expecting page 101 next from you. My own starting 'page number' is 500." (Sends a segment with SYN and ACK flags set, Sequence Number = 500, Acknowledgment Number = 101).
    3.  **Client (ACK):** "Great! I got your page 500, so I'm expecting page 501 next from you. Let's start sending data." (Sends a segment with ACK flag set, Acknowledgment Number = 501).
*   **Formal/Mathematical Version:** The 3-way handshake establishes an initial sequence number (ISN) for both sides, which is crucial for reliable ordering and detection of duplicates.
    1.  **SYN:** The client sends a TCP segment with the `SYN` flag set to 1, and an Initial Sequence Number (ISN) of $x$. The state transitions from `CLOSED` to `SYN_SENT`.
        *   `Client -> Server: SYN, Sequence Number = x`
    2.  **SYN-ACK:** The server receives the `SYN` segment. It acknowledges the client's `SYN` by sending a `SYN-ACK` segment. This segment has both `SYN` and `ACK` flags set to 1. Its own ISN is $y$, and its Acknowledgment Number is $x+1$ (acknowledging the client's `SYN`). The state transitions from `LISTEN` to `SYN_RCVD`.
        *   `Server -> Client: SYN, ACK, Sequence Number = y, Acknowledgment Number = x+1`
    3.  **ACK:** The client receives the `SYN-ACK` segment. It acknowledges the server's `SYN` by sending an `ACK` segment. This segment has the `ACK` flag set to 1, and its Acknowledgment Number is $y+1$. The state transitions from `SYN_SENT` to `ESTABLISHED`. Upon receiving this `ACK`, the server also transitions from `SYN_RCVD` to `ESTABLISHED`.
        *   `Client -> Server: ACK, Acknowledgment Number = y+1`
    Now, both client and server are in the `ESTABLISHED` state and can exchange data.
*   **What Could Go Wrong:**
    *   **SYN Flood Attack:** A malicious client sends many `SYN` segments but never completes the handshake, leaving the server in `SYN_RCVD` state, consuming resources and potentially preventing legitimate connections.
    *   **Dropped Segments:** If any of the SYN or SYN-ACK segments are lost, the handshake will time out and fail, preventing the connection from being established.

### Step 6: The 4-Way Termination — Ending a Connection

*   **Plain English Statement:** When two computers are done talking, they don't just hang up abruptly. They politely say "goodbye" to each other, making sure both sides have finished sending all their data and agree to close the connection. It's a four-step process because either side might still have data to send even after the other side says it's done.
*   **Concrete Example:**
    1.  **Client (FIN):** "I'm done sending data." (Sends a segment with FIN flag set, Sequence Number = 1000).
    2.  **Server (ACK):** "Okay, I got your 'I'm done' message. I'm still sending you some data, though." (Sends a segment with ACK flag set, Acknowledgment Number = 1001).
    3.  **Server (FIN):** (After sending its remaining data) "Now *I'm* done sending data too." (Sends a segment with FIN flag set, Sequence Number = 2000).
    4.  **Client (ACK):** "Okay, I got your 'I'm done' message. Goodbye!" (Sends a segment with ACK flag set, Acknowledgment Number = 2001).
*   **Formal/Mathematical Version:** TCP termination is a graceful process that allows for a "half-close," where one side can stop sending data while still receiving data from the other.
    1.  **FIN:** The client (or active closer) sends a TCP segment with the `FIN` flag set to 1. Let its current sequence number be $u$. The client transitions from `ESTABLISHED` to `FIN_WAIT_1`.
        *   `Client -> Server: FIN, Sequence Number = u`
    2.  **ACK:** The server receives the client's `FIN`. It acknowledges the `FIN` by sending an `ACK` segment with `Acknowledgment Number = u+1`. The server transitions from `ESTABLISHED` to `CLOSE_WAIT`. At this point, the server can still send data to the client.
        *   `Server -> Client: ACK, Acknowledgment Number = u+1`
        The client receives this ACK and transitions from `FIN_WAIT_1` to `FIN_WAIT_2`. It is now waiting for the server's `FIN`.
    3.  **FIN:** Once the server has finished sending all its data, it sends its own `FIN` segment. Let its current sequence number be $w$. The server transitions from `CLOSE_WAIT` to `LAST_ACK`.
        *   `Server -> Client: FIN, Sequence Number = w`
    4.  **ACK:** The client receives the server's `FIN`. It acknowledges this `FIN` by sending an `ACK` segment with `Acknowledgment Number = w+1`. The client transitions from `FIN_WAIT_2` to `TIME_WAIT`. The `TIME_WAIT` state ensures that any delayed segments from the server are received and acknowledged before the client fully closes the connection. After a timeout (typically 2 * Maximum Segment Lifetime, MSL), the client transitions to `CLOSED`. Upon receiving this final `ACK`, the server transitions from `LAST_ACK` to `CLOSED`.
        *   `Client -> Server: ACK, Acknowledgment Number = w+1`
*   **What Could Go Wrong:**
    *   **Half-Open Connections:** If one side crashes without sending a `FIN`, the other side might remain in an `ESTABLISHED` state, thinking the connection is still active, leading to resource exhaustion.
    *   **TIME_WAIT State:** If the client immediately closes after sending the final ACK, a delayed segment from the server might arrive, but the client won't be there to acknowledge it, potentially leaving the server's port in an `LAST_ACK` state for longer than necessary. The `TIME_WAIT` state prevents this, ensuring all segments are cleared from the network.

## 5. Worked examples — multiple, with every step shown

We will use arbitrary Initial Sequence Numbers (ISNs) for simplicity. In reality, ISNs are chosen to be random to prevent certain types of attacks.

### Example 1: Simple 3-Way Handshake

**Problem:** A client wants to establish a TCP connection with a server. The client chooses an ISN of 100. The server chooses an ISN of 200. Show the sequence and acknowledgment numbers for each step of the handshake.

**Given:**
*   Client's ISN = 100
*   Server's ISN = 200

**Wanted:** Sequence and Acknowledgment numbers for each of the three segments.

**Solution:**

**Step 1: Client initiates connection (SYN)**

*   **Action:** Client sends a SYN segment to the server.
*   **Segment Details:**
    *   `SYN` flag is set to 1.
    *   `Sequence Number` is the client's ISN.
    *   `Acknowledgment Number` is 0 (as client is not acknowledging anything yet).
*   **Formal Representation:**
    $$ \text{Client} \rightarrow \text{Server: SYN, SEQ=100, ACK_num=0} $$
*   **Explanation:** The client is saying, "I want to synchronize my sequence numbers, and I'm starting my count at 100."

**Step 2: Server acknowledges and initiates its own connection (SYN-ACK)**

*   **Action:** Server receives the client's SYN. It acknowledges the client's SYN and sends its own SYN.
*   **Segment Details:**
    *   `SYN` flag is set to 1.
    *   `ACK` flag is set to 1.
    *   `Sequence Number` is the server's ISN.
    *   `Acknowledgment Number` is the client's sequence number + 1 (acknowledging the client's SYN, which consumed one sequence number).
*   **Formal Representation:**
    $$ \text{Server} \rightarrow \text{Client: SYN, ACK, SEQ=200, ACK_num=101} $$
*   **Explanation:** The server is saying, "I acknowledge your SYN (meaning I received your starting count of 100, so I expect 101 next from you), and I also want to synchronize my sequence numbers, starting my count at 200."

**Step 3: Client acknowledges server's initiation (ACK)**

*   **Action:** Client receives the server's SYN-ACK. It acknowledges the server's SYN.
*   **Segment Details:**
    *   `ACK` flag is set to 1.
    *   `Sequence Number` is not explicitly used for data in this segment, but it would be the next sequence number the client would use for data (which is 101, but often omitted in handshake diagrams for the third ACK).
    *   `Acknowledgment Number` is the server's sequence number + 1 (acknowledging the server's SYN).
*   **Formal Representation:**
    $$ \text{Client} \rightarrow \text{Server: ACK, ACK_num=201} $$
*   **Explanation:** The client is saying, "I acknowledge your SYN (meaning I received your starting count of 200, so I expect 201 next from you). We are now both synchronized and can start exchanging data."

**Final Answer:**
*   **Client -> Server (SYN): SEQ=100, ACK_num=0**
*   **Server -> Client (SYN-ACK): SEQ=200, ACK_num=101**
*   **Client -> Server (ACK): ACK_num=201**

**Reflection:** This example highlights how the sequence numbers are established and how each side acknowledges the other's synchronization request by incrementing the received sequence number by one. The `+1` is crucial because the SYN flag itself consumes one sequence number.

---

### Example 2: Simple 4-Way Termination (Client closes first, no data in transit)

**Problem:** A client and server have an established TCP connection. The client decides to close the connection. Assume the client's last sent data byte had sequence number 500, and the server's last sent data byte had sequence number 800. Show the sequence and acknowledgment numbers for the 4-way termination.

**Given:**
*   Client's next expected sequence number for its own data (after previous data) = 501
*   Server's next expected sequence number for its own data (after previous data) = 801

**Wanted:** Sequence and Acknowledgment numbers for each of the four segments.

**Solution:**

**Step 1: Client initiates close (FIN)**

*   **Action:** Client sends a FIN segment to the server.
*   **Segment Details:**
    *   `FIN` flag is set to 1.
    *   `Sequence Number` is the client's current sequence number (501).
    *   `Acknowledgment Number` is the next sequence number the client expects from the server (801).
*   **Formal Representation:**
    $$ \text{Client} \rightarrow \text{Server: FIN, SEQ=501, ACK_num=801} $$
*   **Explanation:** The client is saying, "I'm done sending data. My last byte was 500, so this FIN is at sequence 501. I'm still expecting data up to 800 from you, so please send me byte 801 next."

**Step 2: Server acknowledges client's FIN (ACK)**

*   **Action:** Server receives the client's FIN. It acknowledges the FIN.
*   **Segment Details:**
    *   `ACK` flag is set to 1.
    *   `Sequence Number` is the server's current sequence number (801).
    *   `Acknowledgment Number` is the client's FIN sequence number + 1 (acknowledging the client's FIN, which consumed one sequence number).
*   **Formal Representation:**
    $$ \text{Server} \rightarrow \text{Client: ACK, SEQ=801, ACK_num=502} $$
*   **Explanation:** The server is saying, "I received your FIN (at sequence 501), so I expect 502 next from you. I still have my own data to send, and my next sequence number is 801." (At this point, the connection is "half-closed" from the client's perspective).

**Step 3: Server initiates its own close (FIN)**

*   **Action:** Server has finished sending all its data and now sends its own FIN segment.
*   **Segment Details:**
    *   `FIN` flag is set to 1.
    *   `Sequence Number` is the server's current sequence number (801, as it didn't send any data after the ACK in Step 2).
    *   `Acknowledgment Number` is the next sequence number the server expects from the client (502).
*   **Formal Representation:**
    $$ \text{Server} \rightarrow \text{Client: FIN, SEQ=801, ACK_num=502} $$
*   **Explanation:** The server is saying, "I'm now also done sending data. My last byte was 800, so this FIN is at sequence 801. I'm still expecting byte 502 from you."

**Step 4: Client acknowledges server's FIN (ACK)**

*   **Action:** Client receives the server's FIN. It acknowledges the FIN.
*   **Segment Details:**
    *   `ACK` flag is set to 1.
    *   `Sequence Number` is the client's current sequence number (502, as it didn't send any data after the ACK in Step 2).
    *   `Acknowledgment Number` is the server's FIN sequence number + 1 (acknowledging the server's FIN).
*   **Formal Representation:**
    $$ \text{Client} \rightarrow \text{Server: ACK, SEQ=502, ACK_num=802} $$
*   **Explanation:** The client is saying, "I received your FIN (at sequence 801), so I expect 802 next from you. We are now both done." The client then enters the `TIME_WAIT` state.

**Final Answer:**
*   **Client -> Server (FIN): SEQ=501, ACK_num=801**
*   **Server -> Client (ACK): SEQ=801, ACK_num=502**
*   **Server -> Client (FIN): SEQ=801, ACK_num=502**
*   **Client -> Server (ACK): SEQ=502, ACK_num=802**

**Reflection:** This example demonstrates the "half-close" nature of TCP termination. The client expresses its desire to close, but the server can still send data before closing its own side. The sequence numbers correctly reflect that the FIN flag consumes one sequence number, just like SYN. Notice that the server's SEQ in step 2 and 3 is the same (801) because it didn't send any data between those steps.

---

### Example 3: 3-Way Handshake with Data Transfer

**Problem:** A client establishes a connection with a server, then sends 100 bytes of data. The server then sends 50 bytes of data back. Show the sequence and acknowledgment numbers for the handshake and the data transfer.
Assume:
*   Client ISN = 1000
*   Server ISN = 2000

**Given:**
*   Client ISN = 1000
*   Server ISN = 2000
*   Client sends 100 bytes of data.
*   Server sends 50 bytes of data.

**Wanted:** Sequence and Acknowledgment numbers for all segments.

**Solution:**

**Part 1: 3-Way Handshake**

**Step 1.1: Client SYN**
*   **Action:** Client initiates connection.
*   **Formal:**
    $$ \text{Client} \rightarrow \text{Server: SYN, SEQ=1000, ACK_num=0} $$
*   **Explanation:** Client proposes starting sequence 1000.

**Step 1.2: Server SYN-ACK**
*   **Action:** Server acknowledges client's SYN and proposes its own.
*   **Formal:**
    $$ \text{Server} \rightarrow \text{Client: SYN, ACK, SEQ=2000, ACK_num=1001} $$
*   **Explanation:** Server acknowledges client's SYN (expects 1001 next), proposes its starting sequence 2000.

**Step 1.3: Client ACK**
*   **Action:** Client acknowledges server's SYN.
*   **Formal:**
    $$ \text{Client} \rightarrow \text{Server: ACK, SEQ=1001, ACK_num=2001} $$
*   **Explanation:** Client acknowledges server's SYN (expects 2001 next). Client's own next sequence number for data is 1001.

**Part 2: Data Transfer**

**Step 2.1: Client sends 100 bytes of data**
*   **Action:** Client sends its data.
*   **Segment Details:**
    *   `ACK` flag is set to 1 (piggybacking the acknowledgment).
    *   `Sequence Number` is the client's current sequence number (1001).
    *   `Acknowledgment Number` is the next sequence number the client expects from the server (2001).
    *   `Data Length` = 100 bytes.
*   **Formal Representation:**
    $$ \text{Client} \rightarrow \text{Server: DATA (100 bytes), SEQ=1001, ACK_num=2001} $$
*   **Explanation:** Client sends 100 bytes, starting from sequence 1001. It also confirms it's still waiting for sequence 2001 from the server.

**Step 2.2: Server acknowledges client's data and sends 50 bytes of its own data**
*   **Action:** Server acknowledges the 100 bytes from the client and sends its own 50 bytes.
*   **Segment Details:**
    *   `ACK` flag is set to 1.
    *   `Sequence Number` is the server's current sequence number (2001).
    *   `Acknowledgment Number` is the client's sequence number + data length (1001 + 100 = 1101).
    *   `Data Length` = 50 bytes.
*   **Formal Representation:**
    $$ \text{Server} \rightarrow \text{Client: DATA (50 bytes), ACK, SEQ=2001, ACK_num=1101} $$
*   **Explanation:** Server acknowledges all 100 bytes from the client (expects 1101 next). It sends its own 50 bytes, starting from sequence 2001.

**Step 2.3: Client acknowledges server's data**
*   **Action:** Client acknowledges the 50 bytes from the server.
*   **Segment Details:**
    *   `ACK` flag is set to 1.
    *   `Sequence Number` is the client's current sequence number (1101, as it hasn't sent more data since Step 2.1).
    *   `Acknowledgment Number` is the server's sequence number + data length (2001 + 50 = 2051).
    *   `Data Length` = 0 (this is a pure ACK).
*   **Formal Representation:**
    $$ \text{Client} \rightarrow \text{Server: ACK, SEQ=1101, ACK_num=2051} $$
*   **Explanation:** Client acknowledges all 50 bytes from the server (expects 2051 next). Its own next sequence number for data would be 1101.

**Final Answer:**
*   **Client -> Server (SYN): SEQ=1000, ACK_num=0**
*   **Server -> Client (SYN-ACK): SEQ=2000, ACK_num=1001**
*   **Client -> Server (ACK): SEQ=1001, ACK_num=2001**
*   **Client -> Server (DATA 100 bytes): SEQ=1001, ACK_num=2001**
*   **Server -> Client (DATA 50 bytes, ACK): SEQ=2001, ACK_num=1101**
*   **Client -> Server (ACK): SEQ=1101, ACK_num=2051**

**Reflection:** This example shows how acknowledgments are cumulative and how data transfer segments also carry sequence and acknowledgment numbers. The `ACK_num` increments by `data_length` for data segments, and by `1` for control segments (SYN/FIN). Note that the client's SEQ in its final ACK is 1101, the next byte it would send, even though no data is sent in that ACK segment.

---

### Example 4: 4-Way Termination with a Half-Close and Delayed Data

**Problem:** A client and server are in an ESTABLISHED state.
*   Client's next expected sequence number for its own data = 5000.
*   Server's next expected sequence number for its own data = 8000.
The client decides to close the connection.
The server acknowledges the client's FIN, but still has 200 bytes of data to send to the client. After sending this data, the server then closes its side of the connection.
Show all sequence and acknowledgment numbers.

**Given:**
*   Client's current SEQ for data = 5000
*   Server's current SEQ for data = 8000
*   Client closes.
*   Server sends 200 bytes of data after receiving client's FIN, then closes.

**Wanted:** Sequence and Acknowledgment numbers for all segments from client FIN to final ACK.

**Solution:**

**Step 1: Client initiates close (FIN)**

*   **Action:** Client sends a FIN segment.
*   **Formal:**
    $$ \text{Client} \rightarrow \text{Server: FIN, SEQ=5000, ACK_num=8000} $$
*   **Explanation:** Client says it's done sending data, its FIN is at sequence 5000. It's expecting byte 8000 from the server. Client enters `FIN_WAIT_1`.

**Step 2: Server acknowledges client's FIN (ACK)**

*   **Action:** Server receives client's FIN and acknowledges it.
*   **Formal:**
    $$ \text{Server} \rightarrow \text{Client: ACK, SEQ=8000, ACK_num=5001} $$
*   **Explanation:** Server acknowledges client's FIN (expects 5001 next). Server's own next sequence number is 8000. Server enters `CLOSE_WAIT`. Client receives this ACK and enters `FIN_WAIT_2`.

**Step 3: Server sends remaining data (DATA)**

*   **Action:** Server, still in `CLOSE_WAIT`, sends its 200 bytes of data to the client.
*   **Formal:**
    $$ \text{Server} \rightarrow \text{Client: DATA (200 bytes), SEQ=8000, ACK_num=5001} $$
*   **Explanation:** Server sends 200 bytes starting from sequence 8000. It's still expecting byte 5001 from the client. Server remains in `CLOSE_WAIT`.

**Step 4: Client acknowledges server's data (ACK)**

*   **Action:** Client receives the 200 bytes of data and acknowledges it.
*   **Formal:**
    $$ \text{Client} \rightarrow \text{Server: ACK, SEQ=5001, ACK_num=8000+200=8200} $$
*   **Explanation:** Client acknowledges the 200 bytes of data (expects 8200 next from server). Client's own next sequence number is 5001. Client remains in `FIN_WAIT_2`.

**Step 5: Server initiates its own close (FIN)**

*   **Action:** Server has now sent all its data and sends its own FIN segment.
*   **Formal:**
    $$ \text{Server} \rightarrow \text{Client: FIN, SEQ=8200, ACK_num=5001} $$
*   **Explanation:** Server is now done sending data. Its FIN is at sequence 8200 (since it sent 200 bytes after its previous SEQ of 8000). It's still expecting byte 5001 from the client. Server enters `LAST_ACK`.

**Step 6: Client acknowledges server's FIN (ACK)**

*   **Action:** Client receives server's FIN and acknowledges it.
*   **Formal:**
    $$ \text{Client} \rightarrow \text{Server: ACK, SEQ=5001, ACK_num=8200+1=8201} $$
*   **Explanation:** Client acknowledges server's FIN (expects 8201 next). Client's own next sequence number is 5001. Client enters `TIME_WAIT`. Server receives this ACK and enters `CLOSED`.

**Final Answer:**
*   **Client -> Server (FIN): SEQ=5000, ACK_num=8000**
*   **Server -> Client (ACK): SEQ=8000, ACK_num=5001**
*   **Server -> Client (DATA 200 bytes): SEQ=8000, ACK_num=5001**
*   **Client -> Server (ACK): SEQ=5001, ACK_num=8200**
*   **Server -> Client (FIN): SEQ=8200, ACK_num=5001**
*   **Client -> Server (ACK): SEQ=5001, ACK_num=8201**

**Reflection:** This example demonstrates the full flexibility of TCP's 4-way termination, including the "half-close" state where one side can continue sending data after the other has initiated a close. It reinforces how sequence numbers advance with data length and how control flags (SYN/FIN) consume one sequence number. It also shows how acknowledgments are always cumulative, confirming receipt of all bytes up to the `ACK_num - 1`. This scenario is common in applications where one side might finish its task (e.g., uploading a file) but still needs to receive a final confirmation or report from the other side before fully closing.

## 6. Common mistakes and traps

1.  **Confusing Sequence Numbers with Acknowledgment Numbers:** Students often mix these up. The Sequence Number is *what I am sending*, the Acknowledgment Number is *what I am expecting from you next*.
2.  **Forgetting the `+1` for SYN/FIN:** Both SYN and FIN flags consume one sequence number. So, if a SYN segment has `SEQ=x`, the acknowledgment for that SYN will be `ACK_num=x+1`. Forgetting this leads to incorrect sequence number calculations in the handshake and termination.
3.  **Misunderstanding the Purpose of FIN vs. RST:** `FIN` is a graceful close, indicating no more data will be sent but allowing the other side to finish. `RST` (Reset) is an abrupt, immediate termination, often due to an error, and discards buffered data without acknowledgment.
4.  **Not Grasping the Half-Close Concept:** Many assume a `FIN` from one side immediately closes the entire connection. TCP allows for a "half-close," where one side stops sending but can still receive data. This is why 4 segments are typically needed for termination.
5.  **Thinking TCP Guarantees Delivery *Regardless*:** TCP guarantees reliable delivery *over an established connection*. If the destination host crashes or becomes unreachable *before* the connection is established or while it's active, TCP will eventually time out and report a connection failure, not magically deliver the data.
6.  **Believing TCP is Message-Oriented:** TCP is a **byte-stream** oriented protocol. It doesn't preserve message boundaries. If you send 100 bytes, then 50 bytes, the receiver might get a single 150-byte read, or two 75-byte reads, or any other combination, as long as the total bytes are correct and in order. The application layer (e.g., HTTP) is responsible for defining message boundaries.

## 7. Textbook-precise explanation

TCP (Transmission Control Protocol) is a connection-oriented, reliable, byte-stream transport layer protocol defined in RFC 793. It provides end-to-end reliability, flow control, and congestion control over an unreliable, connectionless network layer service (IP).

A TCP connection is a logical full-duplex communication channel established between two endpoints, each identified by an IP address and a port number. The state of a TCP connection is maintained at both endpoints.

**TCP Segment Header:**
The minimum TCP header size is 20 bytes, with an optional variable-length "Options" field. Key fields include:
*   **Source Port (16 bits):** The port number of the sending application.
*   **Destination Port (16 bits):** The port number of the receiving application.
*   **Sequence Number (32 bits):** The sequence number of the first data byte in the segment. If the SYN flag is set, it carries the Initial Sequence Number (ISN) for the connection, and the first data byte would be ISN+1.
*   **Acknowledgment Number (32 bits):** Valid only if the ACK flag is set. It contains the next sequence number the sender of the segment is expecting to receive, effectively acknowledging all bytes up to `Acknowledgment Number - 1`. This is a cumulative acknowledgment.
*   **Data Offset (4 bits):** Specifies the length of the TCP header in 32-bit words, indicating where the data begins.
*   **Flags (6 bits):** Control bits:
    *   `URG` (Urgent): Indicates the Urgent Pointer field is significant.
    *   `ACK` (Acknowledgment): Indicates the Acknowledgment Number field is significant.
    *   `PSH` (Push): Requests the receiver to push buffered data to the application.
    *   `RST` (Reset): Abruptly terminates the connection.
    *   `SYN` (Synchronize): Used to initiate a connection.
    *   `FIN` (Finish): Used to gracefully terminate a connection, indicating no more data from the sender.
*   **Window Size (16 bits):** The number of bytes, starting from the byte in the Acknowledgment Number field, that the sender of this segment is willing to receive. Used for flow control.
*   **Checksum (16 bits):** A 16-bit one's complement sum of all 16-bit words in the header and data, plus a pseudo-header, used for error detection.
*   **Urgent Pointer (16 bits):** Valid only if the URG flag is set. An offset from the Sequence Number indicating the last byte of urgent data.
*   **Options (variable):** Optional fields for capabilities like Maximum Segment Size (MSS), Window Scaling, Timestamps, etc.

**Connection Establishment: The 3-Way Handshake**
The 3-way handshake ensures both hosts are ready to communicate and agree on initial sequence numbers (ISNs) to prevent old, duplicate segments from interfering with new connections.
1.  **SYN (Synchronize):** The client sends a segment with `SYN=1` and `Sequence Number = Client_ISN`. (State: `SYN_SENT`)
2.  **SYN-ACK (Synchronize-Acknowledge):** The server receives the SYN. It responds with a segment having `SYN=1`, `ACK=1`, `Sequence Number = Server_ISN`, and `Acknowledgment Number = Client_ISN + 1`. (State: `SYN_RCVD`)
3.  **ACK (Acknowledge):** The client receives the SYN-ACK. It responds with a segment having `ACK=1`, `Sequence Number = Client_ISN + 1`, and `Acknowledgment Number = Server_ISN + 1`. (State: `ESTABLISHED`)
Upon receiving the final ACK, the server also transitions to `ESTABLISHED`.

**Connection Termination: The 4-Way Handshake**
TCP termination allows for a "half-close," where one side can stop sending data while still receiving data from the other.
1.  **FIN (Finish):** The active closer (e.g., client) sends a segment with `FIN=1` and `Sequence Number = u` (where `u` is the next sequence number after the last byte of data sent by the client). (Client State: `FIN_WAIT_1`)
2.  **ACK (Acknowledge):** The passive closer (e.g., server) receives the FIN and acknowledges it with a segment having `ACK=1` and `Acknowledgment Number = u+1`. (Server State: `CLOSE_WAIT`)
    The client receives this ACK and transitions to `FIN_WAIT_2`.
3.  **FIN (Finish):** After the passive closer has sent all its remaining data, it sends its own `FIN=1` segment with `Sequence Number = w`. (Server State: `LAST_ACK`)
4.  **ACK (Acknowledge):** The active closer receives the server's FIN and acknowledges it with a segment having `ACK=1` and `Acknowledgment Number = w+1`. (Client State: `TIME_WAIT`)
    The client remains in `TIME_WAIT` for a period (typically 2 * Maximum Segment Lifetime, 2MSL) to ensure all delayed segments from the server are processed and to allow the port to become truly free. After 2MSL, the client transitions to `CLOSED`. The server receives this final ACK and transitions to `CLOSED`.

**State Transitions:** The TCP state machine is critical for understanding connection management. Key states include `CLOSED`, `LISTEN`, `SYN_SENT`, `SYN_RCVD`, `ESTABLISHED`, `FIN_WAIT_1`, `FIN_WAIT_2`, `CLOSE_WAIT`, `LAST_ACK`, `TIME_WAIT`.

*References:*
*   Kurose, J. F., & Ross, K. W. (2021). *Computer Networking: A Top-Down Approach* (8th ed.). Pearson. (Chapter 3: The Transport Layer)
*   Stevens, W. R., & Wright, G. R. (1994). *TCP/IP Illustrated, Volume 1: The Protocols*. Addison-Wesley. (Chapters 17, 18: TCP Connection Management)

## 8. ASCII diagrams

```text
+--------------------+--------------------+
|     Source Port    |   Destination Port |
+--------------------+--------------------+
|         Sequence Number (32 bits)      |
+----------------------------------------+
|      Acknowledgment Number (32 bits)   |
+----+--------+--------------------------+
|Data|Reserved|U|A|P|R|S|F| Window Size  |
|Offs| (6 bits)|R|C|S|S|Y|I|  (16 bits)   |
| (4)|        |G|K|H|T|N|N|              |
+----+--------+--------------------------+
|         Checksum (16 bits)             |
+----------------------------------------+
|         Urgent Pointer (16 bits)       |
+----------------------------------------+
|             Options (variable)         |
+----------------------------------------+
|                 Data                   |
|               (Payload)                |
+----------------------------------------+
```
**Figure 1: Simplified TCP Segment Header Format**
This diagram shows the main fields of a TCP header. Each row represents 32 bits (4 bytes).
- **Source Port** and **Destination Port** identify the applications.
- **Sequence Number** and **Acknowledgment Number** are 32-bit fields for reliability.
- **Data Offset** indicates header length.
- **Reserved** bits are unused.
- The 6 **Flags** (URG, ACK, PSH, RST, SYN, FIN) are individual control bits.
- **Window Size** is for flow control.
- **Checksum** for error detection.
- **Urgent Pointer** for urgent data.
- **Options** for extended functionality.
- **Data** is the actual application payload.

```text
                     Client                               Server
                     CLOSED                               LISTEN
                       |                                    |
                       |---------- SYN (SEQ=X) ----------->|
                       |      (Client_ISN)                  |
                       |                                    |
                       |                                    | SYN_RCVD (State)
                       |<------- SYN (SEQ=Y), ACK (ACK_num=X+1) --------|
                       |      (Server_ISN)                  |
                       |                                    |
                       |                                    |
                       |---------- ACK (ACK_num=Y+1) -------->|
                       |                                    |
                     ESTABLISHED                          ESTABLISHED
                       |                                    |
                       |<------------ Data Flow ---------->|
                       |                                    |
```
**Figure 2: TCP 3-Way Handshake (Connection Establishment)**
This sequence diagram illustrates the three steps to establish a TCP connection.
1.  Client sends a SYN segment with its Initial Sequence Number (X).
2.  Server replies with a SYN-ACK segment, acknowledging X+1 and sending its own ISN (Y).
3.  Client replies with an ACK segment, acknowledging Y+1.
Both sides then transition to the ESTABLISHED state.

```text
                     Client                               Server
                     ESTABLISHED                          ESTABLISHED
                       |                                    |
                       |<------------ Data Flow ---------->|
                       |                                    |
                       |---------- FIN (SEQ=U) ----------->| (Client wants to close)
                       |                                    |
                     FIN_WAIT_1                           CLOSE_WAIT
                       |                                    |
                       |<--------- ACK (ACK_num=U+1) --------| (Server acknowledges client's FIN)
                       |                                    |
                     FIN_WAIT_2                           CLOSE_WAIT
                       |                                    |
                       |<----- (Optional) Remaining Data ---->| (Server can still send data)
                       |                                    |
                       |<--------- FIN (SEQ=W) --------| (Server wants to close)
                       |                                    |
                     FIN_WAIT_2                           LAST_ACK
                       |                                    |
                       |---------- ACK (ACK_num=W+1) -------->| (Client acknowledges server's FIN)
                       |                                    |
                     TIME_WAIT                            CLOSED
                       |                                    |
                       |--- (2*MSL Timeout) --------------->|
                     CLOSED                                 |
```
**Figure 3: TCP 4-Way Termination (Connection Teardown)**
This sequence diagram shows the four-step process for gracefully terminating a TCP connection.
1.  Client sends a FIN segment (SEQ=U). Client enters `FIN_WAIT_1`.
2.  Server acknowledges client's FIN (ACK_num=U+1). Server enters `CLOSE_WAIT`. Client receives ACK and enters `FIN_WAIT_2`.
3.  Server, after sending any remaining data, sends its own FIN segment (SEQ=W). Server enters `LAST_ACK`.
4.  Client acknowledges server's FIN (ACK_num=W+1). Client enters `TIME_WAIT` for 2*MSL, then `CLOSED`. Server receives ACK and enters `CLOSED`.

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    *   **3-Way Handshake:** Think of it as a polite "Hello!" followed by a "Hello back, I heard you!" and finally an "Okay, let's talk!" It's a three-step agreement to start. Imagine two people meeting: "Hi!" (SYN), "Hi, I heard you!" (SYN-ACK), "Great, let's chat!" (ACK).
    *   **4-Way Termination:** This is a "polite goodbye." One person says "I'm leaving now" (FIN), the other says "Okay, goodbye" (ACK), then the second person says "I'm leaving now too" (FIN), and the first person says "Okay, goodbye" (ACK). It's two separate "I'm done" messages, each acknowledged.
    *   **TCP Flags:** For the six main flags (URG, ACK, PSH, RST, SYN, FIN), remember the phrase: " **U**rgent **A**ckers **P**ush **R**andom **S**ync **F**ins". (A bit silly, but effective for remembering the order and presence).

2.  **Formulas/Facts to Overlearn:**
    *   **Handshake:**
        1.  `Client -> Server: SYN, SEQ=X`
        2.  `Server -> Client: SYN, ACK, SEQ=Y, ACK_num=X+1`
        3.  `Client -> Server: ACK, ACK_num=Y+1`
    *   **Termination:**
        1.  `Closer -> Other: FIN, SEQ=U`
        2.  `Other -> Closer: ACK, ACK_num=U+1`
        3.  `Other -> Closer: FIN, SEQ=W`
        4.  `Closer -> Other: ACK, ACK_num=W+1`
    *   **Crucial Rule:** Any segment with `SYN=1` or `FIN=1` consumes one sequence number. For data segments, `ACK_num = received_SEQ + received_DATA_LENGTH`. For control segments, `ACK_num = received_SEQ + 1`.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Immediately after this lesson, review the diagrams and the "Formulas/Facts to Overlearn." Try to explain the handshake and termination steps out loud without looking.
    *   **Day 3:** Review again. Focus on the `+1` rule for sequence numbers and the state transitions.
    *   **Day 7:** Review the full TCP header fields and their purpose. Draw the diagrams from memory.
    *   **Day 16:** Solve a few more complex examples involving data transfer during termination.
    *   **Day 35:** Explain the entire process (header, handshake, termination) to an imaginary peer, using the formal terminology and state changes.

4.  **First-Principles Re-derivation Pathway:**
    *   **Why 3-way handshake, not 2-way?**
        1.  Client sends SYN. Server replies SYN-ACK. (2-way done)
        2.  If the client's initial SYN was delayed and arrived after a previous connection closed, the server might think it's a new, valid SYN for a new connection. Without the client's final ACK, the server doesn't know if the client *actually received* its SYN-ACK and is ready. The 3rd ACK confirms the client *received* the server's ISN, preventing "half-open" connections due to delayed SYNs. It ensures both sides know each other's ISN and are ready.
    *   **Why 4-way termination, not 3-way?**
        1.  Client sends FIN. Server replies FIN-ACK. (3-way done)
        2.  The `FIN` flag means "I have no more data to send." It does *not* mean "I will not accept any more data." The server might still have data to send to the client. The 4-way process allows for this "half-close" state, where one side can finish sending its data before sending its own `FIN`. If the server immediately sent FIN-ACK (combining steps 2 and 3), it couldn't send any more data, which might not be desired.

## 10. Connections — what this leads to

Understanding TCP's header and connection management is foundational for many advanced topics in computer science and networking:

*   **Higher-Level Protocols (HTTP/S, FTP, SSH, SMTP):** All these application-layer protocols rely on TCP to provide their underlying reliable communication channel. A deep understanding of TCP helps in debugging issues or optimizing performance for these services.
*   **Socket Programming:** When you write network applications using APIs like `socket()` in C/Python/Java, you're directly interacting with the operating system's implementation of TCP (and UDP). Knowing how TCP manages connections helps you correctly use `connect()`, `listen()`, `accept()`, `send()`, `recv()`, and `close()` functions.
*   **Network Security:**
    *   **DDoS Attacks (SYN Floods):** Understanding the 3-way handshake is crucial to comprehending how SYN flood attacks work and how to mitigate them (e.g., SYN cookies).
    *   **Port Scanning:** Knowing about TCP ports and the handshake helps understand how tools like Nmap detect open ports.
    *   **Firewalls:** Firewalls inspect TCP headers and state to permit or deny connections, making TCP knowledge essential for network security specialists.
*   **Load Balancing and Proxies:** Load balancers often operate by managing TCP connections, distributing incoming requests across multiple backend servers. Understanding TCP states like `SYN_RCVD` and `ESTABLISHED` is key to configuring and troubleshooting these systems.
*   **Congestion Control Algorithms:** TCP's reliability mechanisms (retransmissions, acknowledgments) are tightly coupled with its congestion control algorithms (e.g., TCP Reno, TCP Vegas, CUBIC, BBR). These algorithms dynamically adjust the sending rate based on network feedback to prevent congestion collapse.
*   **Network Performance Tuning:** Understanding TCP's window size, retransmission timers, and other header options is vital for optimizing network performance, especially in high-latency or high-bandwidth environments.
*   **QUIC (Quick UDP Internet Connections):** While QUIC runs over UDP, it aims to provide many of TCP's reliable, connection-oriented features (like stream multiplexing, flow control, and congestion control) but with improvements like faster connection establishment (0-RTT or 1-RTT handshakes) and better handling of packet loss. Understanding TCP helps appreciate the innovations in QUIC.
*   **Distributed Systems:** Reliable communication between nodes in a distributed system (e.g., microservices, cloud computing) almost always relies on TCP. Knowledge of TCP's guarantees and limitations is fundamental for designing robust distributed applications.

## 11. Self-check questions

1.  A client initiates a TCP connection with an ISN of 5000. The server responds with an ISN of 8000. What will be the sequence and acknowledgment numbers of the final ACK segment sent by the client to establish the connection?
2.  Explain the primary difference in purpose between the `SYN` flag and the `FIN` flag in the TCP header, and how each affects the sequence number space.
3.  During a TCP 4-way termination, after the client sends its `FIN` and the server acknowledges it, what state is the server in? Can the server still send data to the client at this point? Justify your answer.
4.  Consider a scenario where a client sends a 1000-byte data segment with `SEQ=100`. The server acknowledges this data but then sends a `RST` segment. What would be the `ACK_num` in the server's acknowledgment of the 1000-byte data segment? What is the implication of the `RST` segment compared to a `FIN` segment in this context?
5