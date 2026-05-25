## 1. What it is — in plain English

Imagine you want to talk to a friend across town using a network of communication lines. "Switching" is simply the method your network uses to connect you to your friend, allowing your messages to travel from your device to theirs. It's like deciding how a letter gets from your mailbox to your friend's, through a complex postal system with many sorting offices and delivery routes.

There are three main ways this connection can be managed. The first, **circuit switching**, is like getting a dedicated, private telephone line just for your call. Once you dial, that line is exclusively yours for the duration of the conversation, even if you're silent for a bit.

The second, **packet switching**, is more like sending a bunch of postcards. You break your message into many small pieces, write each piece on a separate postcard, and send them all off. Each postcard travels independently, finding its own best path through the postal system, and they might even arrive out of order. Your friend then reassembles them.

Finally, **virtual circuit switching** is a clever hybrid. It's still like sending postcards, but before you start, you agree on a specific "preferred route" with the postal service for all your postcards. They still travel independently and share postal resources with others, but they all try to stick to that agreed-upon path, making delivery more organized.

## 2. Why it matters — real-world applications

Understanding switching is fundamental because it dictates how efficiently, reliably, and quickly information travels across any network, from your home Wi-Fi to global internet infrastructure.

1.  **Traditional Telephony (PSTN):** The classic example of **circuit switching** is the Public Switched Telephone Network (PSTN). When you make an old-fashioned landline phone call, a dedicated physical circuit is established from your phone, through various switches, to the recipient's phone. This ensures a constant, guaranteed quality of service (no dropped words or delays) but ties up resources even during silences. This reliability is crucial for emergency services or critical command-and-control systems where communication must be instantaneous and uninterrupted.

2.  **The Internet and World Wide Web:** The entire internet operates on **packet switching**. When you browse a website, send an email, stream a video on Netflix, or participate in a video conference, your data is broken into packets. These packets travel independently across routers and switches, sharing network resources with countless other users. This flexibility allows for incredible scalability and resilience – if one path fails, packets can be rerouted. For machine learning, especially distributed training or large dataset transfer, packet switching is essential for moving vast amounts of data efficiently and cost-effectively between data centers or to cloud-based GPUs.

3.  **Enterprise Networks and Carrier Backbones (MPLS, ATM, Frame Relay):** **Virtual circuit switching** technologies like Multi-Protocol Label Switching (MPLS) are widely used in modern enterprise networks and by internet service providers (ISPs) for their backbone infrastructure. MPLS allows carriers to create "virtual private networks" (VPNs) for businesses, ensuring that their traffic follows a predetermined, optimized path even though the underlying network is packet-switched and shared. This provides a balance between the guaranteed path benefits of circuit switching and the efficiency of packet switching, which is vital for delivering predictable performance for critical business applications, cloud services, and even real-time financial transactions. In aerospace, where predictable communication is paramount for flight control or telemetry, virtual circuits (or similar connection-oriented packet services) can be employed to prioritize and route critical data streams with higher reliability than pure datagram packet switching.

## 3. Prerequisites — what you must know first

Before diving deep into switching, ensure you have a solid grasp of these foundational concepts:

*   **Network Nodes and Links:** Understand that a network consists of devices (nodes) like computers, routers, and switches, interconnected by physical or wireless connections (links).
*   **Data Transmission Basics:** Familiarity with how data is represented as bits, grouped into bytes, and transmitted over a medium, including concepts like bandwidth (data rate) and latency (delay).
*   **Basic Network Topologies:** Knowledge of common network layouts such as star, bus, ring, and mesh, as these influence how switches connect devices.
*   **Multiplexing:** Understanding how multiple communication streams can share a single physical link, specifically Time Division Multiplexing (TDM) and Frequency Division Multiplexing (FDM), which are crucial for circuit switching.
*   **OSI Model Fundamentals:** A basic grasp of the Open Systems Interconnection (OSI) model, particularly the roles of Layer 1 (Physical), Layer 2 (Data Link), and Layer 3 (Network), as switching often operates at these layers.

## 4. The core idea — step by step

### Step 1: Introduction to Switching — The Fundamental Problem

**Plain English:** Imagine a central post office that needs to connect many different towns. If every town had a direct road to every other town, it would be a chaotic mess with too many roads. Instead, the post office acts as a hub. "Switching" is simply the mechanism this hub uses to direct mail from one town to the correct destination town, efficiently connecting many senders to many receivers using a limited set of internal routes.

**Concrete Example:** You have 10 computers in a room, and any computer needs to be able to talk to any other computer. Instead of connecting every computer directly to every other (which would require $10 \times 9 / 2 = 45$ cables!), you connect all 10 computers to a central device called a switch. The switch's job is to figure out which cable leads to the destination computer for any incoming message and forward it appropriately.

**Formal/Mathematical Version:** Given a set of $N$ input ports and $M$ output ports, a switching fabric's primary function is to establish a connection between an arbitrary input port $i$ and an arbitrary output port $j$, where $1 \le i \le N$ and $1 \le j \le M$. This connection allows data to flow from $i$ to $j$. The efficiency and method of establishing and maintaining this connection define the switching paradigm.

**What could go wrong:** If the switch is too slow or doesn't know where to send messages, data can get lost, delayed, or sent to the wrong place.

### Step 2: Circuit Switching

**Plain English:** Circuit switching is like making a reservation for a private road directly from your house to your friend's house for a specific time. Once the road is reserved, no one else can use it until you're done. You have a guaranteed, exclusive path for your entire conversation.

**Concrete Example:** When you make a traditional landline phone call, the telephone network establishes a dedicated physical connection (a "circuit") between your phone and the recipient's phone. This circuit remains exclusively yours for the duration of the call, even if you both go silent for a minute. The network reserves bandwidth and switching capacity specifically for your call.

**Formal/Mathematical Version:** In circuit switching, a dedicated path is established and resources (e.g., bandwidth, switch capacity) are reserved for the entire duration of the communication. This process typically involves three phases:
1.  **Circuit Establishment:** A setup message traverses the network, reserving resources along a path.
2.  **Data Transfer:** Data flows over the dedicated, reserved circuit.
3.  **Circuit Teardown:** Resources are released.

If a link has a total bandwidth $B_{link}$ and each call requires $b_{call}$ bandwidth, then the maximum number of simultaneous calls ($N_{max}$) that can be supported by that link is:
$$ N_{max} = \left\lfloor \frac{B_{link}}{b_{call}} \right\rfloor $$
The end-to-end delay ($D_{total}$) for a message of length $L$ over $H$ hops, with propagation delay $d_p$ per hop and transmission rate $R$ on each link, after an initial setup time $T_{setup}$, is:
$$ D_{total} = T_{setup} + \frac{L}{R} + H \times d_p $$
Crucially, once the circuit is established, the data transfer delay is fixed and predictable.

**What could go wrong:**
*   **Inefficient resource utilization:** Resources are reserved even when no data is being sent (e.g., during silences in a phone call).
*   **Call blocking:** If all available circuits are in use, new connection requests are denied (the "busy signal").
*   **Setup delay:** There's an initial delay to establish the circuit before any data can be sent.

### Step 3: Packet Switching

**Plain English:** Packet switching is like sending a long letter by breaking it into many small, numbered postcards. Each postcard is addressed individually and sent into the postal system. They might take different routes, arrive at different times, and even out of order. The receiver collects all the postcards and reassembles the original letter based on the numbers.

**Concrete Example:** When you send an email or browse a webpage, your computer breaks the data into small chunks called "packets." Each packet includes a destination address. These packets are then sent into the internet, where routers forward them independently, often taking different paths to the destination. At the destination, the packets are reassembled into the original email or webpage.

**Formal/Mathematical Version:** In packet switching, data is divided into fixed-size or variable-size packets. Each packet contains a header with control information (source/destination addresses, sequence numbers, etc.) and a payload (the actual data). Packets are forwarded independently through the network using a "store-and-forward" mechanism: a router receives an entire packet, stores it briefly, looks up its destination address in a forwarding table, and then forwards it to the next hop.

The total end-to-end delay ($D_{total}$) for a packet over $H$ hops can be expressed as:
$$ D_{total} = \sum_{i=1}^{H} (d_{proc,i} + d_{queue,i} + d_{trans,i} + d_{prop,i}) $$
where:
*   $d_{proc,i}$ is processing delay at router $i$.
*   $d_{queue,i}$ is queuing delay at router $i$ (variable, depends on traffic).
*   $d_{trans,i} = L/R_i$ is transmission delay on link $i$ (packet length $L$, link rate $R_i$).
*   $d_{prop,i}$ is propagation delay on link $i$ (distance/speed).

Packet switching relies on **statistical multiplexing**, where multiple users share network resources dynamically. The aggregate demand for bandwidth is typically less than the sum of peak individual demands, leading to higher utilization.

**What could go wrong:**
*   **Variable delay (jitter):** Queuing delays can vary significantly, leading to inconsistent delivery times, which is problematic for real-time applications like voice or video.
*   **Packet loss:** If queues overflow at a router, packets can be dropped.
*   **Out-of-order delivery:** Packets might take different paths and arrive at the destination in the wrong sequence, requiring reordering.
*   **Overhead:** Each packet carries a header, which is overhead that doesn't contain actual data.

### Step 4: Virtual Circuit Switching

**Plain English:** Virtual circuit switching is a hybrid. It's like sending postcards, but before you start, you tell the postal service, "I'm going to send a lot of postcards to my friend. Can you please set up a 'VIP lane' for them through your sorting offices?" The postal service agrees on a logical path, marking your postcards with a special ID. Your postcards still share the physical roads with others, but they all follow this pre-arranged logical path, making them arrive in order and generally faster.

**Concrete Example:** Technologies like MPLS (Multi-Protocol Label Switching) or older technologies like Frame Relay and ATM use virtual circuits. When two devices want to communicate, they first establish a "virtual circuit" (VC). This isn't a dedicated physical path, but rather a logical path identified by a "VC identifier" (VCI) at each switch along the route. Subsequent packets belonging to that communication then carry this VCI, and switches simply look up the VCI in their forwarding tables to know which outgoing link to send the packet on, without needing to re-evaluate the full destination address for every packet.

**Formal/Mathematical Version:** Virtual circuit switching combines aspects of both circuit and packet switching. It is **connection-oriented** at the network layer, meaning a setup phase establishes a logical connection (the virtual circuit) before data transfer. However, it is **packet-switched** in that resources are not exclusively reserved end-to-end; packets from different VCs share link bandwidth.

Each packet carries a **Virtual Circuit Identifier (VCI)** in its header. At each switch, the VCI is used as an index into a **forwarding table** (also called a VC table). This table maps an incoming VCI on a specific input port to an outgoing VCI on a specific output port.
$$ \text{Forwarding Table Entry: } (\text{Input Port}, \text{Incoming VCI}) \rightarrow (\text{Output Port}, \text{Outgoing VCI}) $$
The VCI often changes from one link to the next.

The delay characteristics are similar to packet switching (variable queuing delays), but the connection setup phase adds an initial delay. However, because packets follow a defined path, they generally arrive in order, and forwarding decisions are faster than full IP address lookups.

**What could go wrong:**
*   **Setup delay:** Like circuit switching, there's an initial delay to establish the virtual circuit.
*   **Single point of failure (for the VC):** If a switch or link along the established virtual circuit path fails, the entire VC might break, requiring re-establishment.
*   **Complexity:** Managing and maintaining virtual circuits adds complexity to network devices and protocols.

### Step 5: Comparison and Trade-offs

**Plain English:** Each switching method has its strengths and weaknesses, making it suitable for different situations. Circuit switching is great for guaranteed quality but wastes resources. Packet switching is efficient and flexible but can be unpredictable. Virtual circuit switching tries to get the best of both worlds: some predictability without fully dedicated resources.

**Concrete Example:**
*   **Circuit Switching:** Best for traditional voice calls where consistent quality is paramount and resource utilization is secondary (e.g., emergency lines).
*   **Packet Switching:** Ideal for bursty data traffic like web browsing, email, and file transfers, where occasional delays or retransmissions are acceptable in exchange for high efficiency and flexibility.
*   **Virtual Circuit Switching:** Good for applications requiring some level of guaranteed service (like VoIP or video conferencing over an enterprise network) while still benefiting from resource sharing.

**Formal/Mathematical Version:**
| Feature           | Circuit Switching                               | Packet Switching                                     | Virtual Circuit Switching                                |
| :---------------- | :---------------------------------------------- | :--------------------------------------------------- | :------------------------------------------------------- |
| **Resource Alloc.** | Dedicated, reserved end-to-end                  | Shared dynamically (statistical multiplexing)         | Shared dynamically, but logical path reserved          |
| **Connection**    | Connection-oriented (physical circuit)          | Connectionless (datagram)                            | Connection-oriented (logical circuit)                    |
| **Setup Phase**   | Required (significant overhead)                 | Not required per packet                              | Required (less overhead than circuit, per-call)          |
| **Addressing**    | Only during setup                               | Each packet carries full destination address         | Each packet carries VCI (local identifier)               |
| **Delay**         | Fixed, predictable (setup + transmission + prop)| Variable (transmission + prop + proc + queuing)     | Variable (setup + transmission + prop + proc + queuing)  |
| **Jitter**        | Minimal                                         | High (due to variable queuing delays)                | Low to moderate (packets follow same path)               |
| **Packet Loss**   | None (if circuit established)                   | Possible (due to buffer overflow)                    | Possible (due to buffer overflow)                        |
| **Order**         | Guaranteed                                      | Not guaranteed (requires reordering at receiver)     | Guaranteed (packets follow same path)                    |
| **Efficiency**    | Low for bursty traffic (resources idle)         | High for bursty traffic (resources shared)           | Moderate to High (combines aspects)                      |
| **Complexity**    | Simpler forwarding, complex setup               | Complex routing, simpler per-packet forwarding       | Complex setup, simpler per-packet forwarding (VC lookup) |

## 5. Worked examples — multiple, with every step shown

### Example 1: Circuit Switching Capacity Calculation

**Problem:** A telecommunications link has a total bandwidth of 1.536 Mbps (Megabits per second). Each voice call requires 64 kbps (kilobits per second) of bandwidth. How many simultaneous voice calls can this link support using circuit switching?

**Given:**
*   Total link bandwidth ($B_{link}$) = 1.536 Mbps
*   Bandwidth required per call ($b_{call}$) = 64 kbps

**Want:**
*   Maximum number of simultaneous calls ($N_{max}$)

**Solution:**

**Step 1: Ensure consistent units.**
The total bandwidth is in Mbps, and the per-call bandwidth is in kbps. We need to convert one to match the other. Let's convert Mbps to kbps.
$1 \text{ Mbps} = 1000 \text{ kbps}$
So, $B_{link} = 1.536 \text{ Mbps} \times 1000 \text{ kbps/Mbps}$
$B_{link} = 1536 \text{ kbps}$
*This step is crucial because calculations must be performed with consistent units to avoid errors.*

**Step 2: Divide total bandwidth by per-call bandwidth.**
Since each call reserves a fixed amount of bandwidth, we simply divide the total available bandwidth by the bandwidth required for a single call to find out how many such calls can fit.
$N_{max} = \frac{B_{link}}{b_{call}}$
*This is the core logic of circuit switching capacity: dividing the pie into equal slices.*

**Step 3: Perform the calculation.**
$N_{max} = \frac{1536 \text{ kbps}}{64 \text{ kbps/call}}$
$N_{max} = 24 \text{ calls}$
*The units of kbps cancel out, leaving us with the number of calls, which is what we want.*

**Final Answer:** The link can support **24 simultaneous voice calls**.

**Reflection:** This example highlights the rigid allocation of resources in circuit switching. The calculation is straightforward because bandwidth is exclusively reserved. If even one call is active, its 64 kbps is unavailable to others, even if no one is speaking. The trickiest part is unit conversion.

### Example 2: Packet Switching End-to-End Delay (Simple)

**Problem:** A packet of 1500 bytes needs to be transmitted from Host A to Host B across a network with 3 routers (meaning 4 links/hops). Each link has a transmission rate of 10 Mbps. The propagation delay on each link is 5 microseconds ($\mu s$). Processing delay at each router is 10 $\mu s$. Assume no queuing delay for simplicity. Calculate the total end-to-end delay.

**Given:**
*   Packet length ($L$) = 1500 bytes
*   Number of links ($H$) = 4 (Host A -> R1 -> R2 -> R3 -> Host B)
*   Transmission rate ($R$) = 10 Mbps (for all links)
*   Propagation delay per link ($d_{prop}$) = 5 $\mu s$
*   Processing delay per router ($d_{proc}$) = 10 $\mu s$ (3 routers, so 3 processing delays)
*   Queuing delay ($d_{queue}$) = 0 (for simplicity)

**Want:**
*   Total end-to-end delay ($D_{total}$)

**Solution:**

**Step 1: Convert units to be consistent.**
Packet length is in bytes, transmission rate is in Mbps. Convert bytes to bits and Mbps to bits per second.
$L = 1500 \text{ bytes} \times 8 \text{ bits/byte} = 12000 \text{ bits}$
$R = 10 \text{ Mbps} = 10 \times 10^6 \text{ bits/second}$
Delays are in microseconds, so we can keep them as is for now, but ensure the final answer is in a clear unit.
*Consistent units are vital for correct calculations, especially with different orders of magnitude.*

**Step 2: Calculate transmission delay for one link.**
Transmission delay ($d_{trans}$) is the time it takes to push all bits of the packet onto the link.
$d_{trans} = \frac{L}{R}$
$d_{trans} = \frac{12000 \text{ bits}}{10 \times 10^6 \text{ bits/second}}$
$d_{trans} = 0.0012 \text{ seconds}$
$d_{trans} = 0.0012 \times 10^6 \text{ } \mu s = 1200 \text{ } \mu s$
*This is the time it takes for the sender (or a router) to transmit the entire packet onto a single link. Note that this delay occurs at each hop.*

**Step 3: Calculate total propagation delay.**
The packet travels across 4 links.
Total propagation delay ($D_{prop\_total}$) = $H \times d_{prop}$
$D_{prop\_total} = 4 \times 5 \text{ } \mu s = 20 \text{ } \mu s$
*Propagation delay is the time for the first bit to travel across the physical medium. It occurs for each link traversed.*

**Step 4: Calculate total processing delay.**
There are 3 routers between Host A and Host B. Each router adds a processing delay.
Total processing delay ($D_{proc\_total}$) = (Number of routers) $\times d_{proc}$
$D_{proc\_total} = 3 \times 10 \text{ } \mu s = 30 \text{ } \mu s$
*Processing delay occurs at each intermediate node (router) as it examines the packet header and determines the next hop.*

**Step 5: Calculate total end-to-end delay.**
In packet switching, the transmission delay for the first link starts, then the first bit arrives at the first router, gets processed, and then its transmission starts on the second link. This pipelining effect means that the total transmission delay is effectively applied once per hop *plus* the processing and propagation delays for each segment. A common way to think about it for a single packet is:
$D_{total} = (H \times d_{trans}) + D_{prop\_total} + D_{proc\_total}$
This formula is slightly simplified for a single packet, assuming the packet is fully transmitted at each hop before it starts transmitting on the next. More precisely, for $H$ links, the total delay for the *last bit* of the packet to arrive at the destination is:
$D_{total} = d_{trans} \text{ (first link)} + (H-1) \times (d_{trans} + d_{prop} + d_{proc}) \text{ (for intermediate hops)} + d_{prop} \text{ (last link)}$
Let's use the more common simplified version for this level, which is the sum of delays for each component over the path for a single packet.
$D_{total} = (H \times d_{trans}) + (H \times d_{prop}) + ((H-1) \times d_{proc})$
No, this is not quite right. The packet is transmitted $H$ times (once by sender, once by each of the $H-1$ routers). It propagates $H$ times. It is processed $H-1$ times (at each router).

Let's break it down more explicitly:
Delay from Host A to R1: $d_{trans} + d_{prop}$
Delay from R1 to R2: $d_{proc} + d_{trans} + d_{prop}$
Delay from R2 to R3: $d_{proc} + d_{trans} + d_{prop}$
Delay from R3 to Host B: $d_{proc} + d_{trans} + d_{prop}$

Summing these up:
$D_{total} = (d_{trans} + d_{prop}) + (d_{proc} + d_{trans} + d_{prop}) + (d_{proc} + d_{trans} + d_{prop}) + (d_{proc} + d_{trans} + d_{prop})$
$D_{total} = 4 \times d_{trans} + 4 \times d_{prop} + 3 \times d_{proc}$
*This formula correctly accounts for transmission delay occurring at the start of each link, propagation delay across each link, and processing delay at each intermediate router.*

$D_{total} = (4 \times 1200 \text{ } \mu s) + (4 \times 5 \text{ } \mu s) + (3 \times 10 \text{ } \mu s)$
$D_{total} = 4800 \text{ } \mu s + 20 \text{ } \mu s + 30 \text{ } \mu s$
$D_{total} = 4850 \text{ } \mu s$

**Final Answer:** The total end-to-end delay is **4850 $\mu s$** (or **4.85 ms**).

**Reflection:** This example highlights the cumulative nature of delays in packet switching. The "trick" is correctly accounting for where each type of delay occurs (transmission at the start of each link, propagation across each link, processing at intermediate routers). Ignoring queuing delay simplifies it, but in reality, queuing delay is often the dominant and most variable factor.

### Example 3: Packet Switching Efficiency vs. Circuit Switching for Bursty Traffic

**Problem:** Consider a scenario where 10 users share a 100 Mbps link. Each user, when active, generates data at 20 Mbps, but is only active 10% of the time (bursty traffic).
a) How many users can be supported if circuit switching is used?
b) What is the probability that more than 5 users are simultaneously active if packet switching is used (assuming users' activity is independent)?
c) Why is packet switching more efficient for this scenario?

**Given:**
*   Total link bandwidth ($B_{link}$) = 100 Mbps
*   User peak rate ($R_{user}$) = 20 Mbps
*   User activity probability ($p$) = 0.1 (10%)
*   Number of users ($N$) = 10

**Want:**
*   a) Max users for circuit switching.
*   b) Probability of >5 active users for packet switching.
*   c) Explanation of efficiency.

**Solution:**

**Part a) Circuit Switching:**

**Step 1: Calculate max users for circuit switching.**
In circuit switching, each active user reserves their full peak rate, regardless of actual data transmission.
$N_{max\_circuit} = \left\lfloor \frac{B_{link}}{R_{user}} \right\rfloor$
$N_{max\_circuit} = \left\lfloor \frac{100 \text{ Mbps}}{20 \text{ Mbps/user}} \right\rfloor$
$N_{max\_circuit} = 5 \text{ users}$
*Circuit switching requires dedicated bandwidth, so only a fixed number of users can be supported at their peak rate.*

**Final Answer (a):** Circuit switching can support **5 users**.

**Part b) Packet Switching - Probability of >5 active users:**

**Step 1: Identify the probability distribution.**
Since each user's activity is independent and has two outcomes (active or inactive), this is a binomial distribution problem.
Let $X$ be the number of active users.
$X \sim B(N, p)$, where $N=10$ (total users) and $p=0.1$ (probability of being active).
The probability mass function for a binomial distribution is:
$$ P(X=k) = \binom{N}{k} p^k (1-p)^{N-k} $$
*Recognizing the correct probability distribution is key for this type of problem.*

**Step 2: Calculate the probability of $k$ users being active.**
We need $P(X > 5)$, which is $P(X=6) + P(X=7) + P(X=8) + P(X=9) + P(X=10)$.

Let's calculate each term:
$P(X=6) = \binom{10}{6} (0.1)^6 (0.9)^{10-6} = \frac{10!}{6!4!} (0.1)^6 (0.9)^4 = 210 \times 0.000001 \times 0.6561 = 0.000137781$
$P(X=7) = \binom{10}{7} (0.1)^7 (0.9)^{10-7} = \frac{10!}{7!3!} (0.1)^7 (0.9)^3 = 120 \times 0.0000001 \times 0.729 = 0.000008748$
$P(X=8) = \binom{10}{8} (0.1)^8 (0.9)^{10-8} = \frac{10!}{8!2!} (0.1)^8 (0.9)^2 = 45 \times 0.00000001 \times 0.81 = 0.0000003645$
$P(X=9) = \binom{10}{9} (0.1)^9 (0.9)^{10-9} = \frac{10!}{9!1!} (0.1)^9 (0.9)^1 = 10 \times 0.000000001 \times 0.9 = 0.000000009$
$P(X=10) = \binom{10}{10} (0.1)^{10} (0.9)^{10-10} = 1 \times 0.0000000001 \times 1 = 0.0000000001$
*Calculating each probability term is necessary. Binomial coefficients can be large, but the powers of $p$ and $(1-p)$ quickly make terms small.*

**Step 3: Sum the probabilities.**
$P(X > 5) = P(X=6) + P(X=7) + P(X=8) + P(X=9) + P(X=10)$
$P(X > 5) = 0.000137781 + 0.000008748 + 0.0000003645 + 0.000000009 + 0.0000000001$
$P(X > 5) \approx 0.0001469$
*This sum represents the probability of congestion if the link can only handle 5 users at peak rate.*

**Final Answer (b):** The probability that more than 5 users are simultaneously active is approximately **0.0001469** (or about 0.0147%).

**Part c) Explanation of Efficiency:**

**Explanation:** Packet switching is significantly more efficient for this scenario due to **statistical multiplexing**.
*   **Circuit Switching:** The link can only support 5 users because it reserves 20 Mbps for each user *continuously*, even when the user is idle. This means 50 Mbps (5 users * 10 Mbps average) of actual data is transmitted when 5 users are active, but 100 Mbps of capacity is reserved.
*   **Packet Switching:** With packet switching, all 10 users share the 100 Mbps link. While each user *can* generate 20 Mbps when active, they are only active 10% of the time. This means, on average, each user requires $20 \text{ Mbps} \times 0.1 = 2 \text{ Mbps}$. For 10 users, the average aggregate demand is $10 \text{ users} \times 2 \text{ Mbps/user} = 20 \text{ Mbps}$. This is well within the 100 Mbps capacity.
    The probability calculated in part (b) shows that it's extremely unlikely (less than 0.015%) that more than 5 users will be active simultaneously and exceed the link's capacity. Therefore, packet switching allows the network to support more users (10 in this case, versus 5 for circuit switching) with a very low risk of congestion, by exploiting the fact that users are typically not all active at their peak rate simultaneously. Resources are only used when data is actually being sent.

**Reflection:** This example highlights the core advantage of packet switching for bursty traffic: statistical multiplexing. The "trick" is understanding that circuit switching over-provisions for peak rates, while packet switching can leverage the unlikelihood of all users being simultaneously active at peak. The math involves basic probability (binomial distribution).

### Example 4: Virtual Circuit Forwarding Table Lookup

**Problem:** A packet arrives at switch S1 on input port 1 with a Virtual Circuit Identifier (VCI) of 20. Using the provided forwarding tables for S1 and S2, determine the output port and outgoing VCI at S1, and then the output port and outgoing VCI at S2, assuming S1 forwards the packet to S2.

**Switch S1 Forwarding Table:**
| Input Port | Incoming VCI | Output Port | Outgoing VCI |
| :--------- | :----------- | :---------- | :----------- |
| 1          | 10           | 2           | 30           |
| 1          | 20           | 3           | 45           |
| 2          | 30           | 1           | 10           |

**Switch S2 Forwarding Table:**
| Input Port | Incoming VCI | Output Port | Outgoing VCI |
| :--------- | :----------- | :---------- | :----------- |
| 1          | 40           | 3           | 60           |
| 2          | 45           | 1           | 70           |
| 3          | 60           | 2           | 40           |

**Given:**
*   Packet arrives at S1 on Input Port 1 with Incoming VCI = 20.
*   S1 forwards to S2 (this implies that S1's output port connects to S2's input port).

**Want:**
*   Output Port and Outgoing VCI at S1.
*   Input Port, Outgoing VCI, and Output Port at S2.

**Solution:**

**Part 1: Processing at Switch S1**

**Step 1: Locate the matching entry in S1's table.**
The packet arrives on Input Port 1 with Incoming VCI = 20. We look for the row in S1's table that matches both these criteria.
Matching row:
| Input Port | Incoming VCI | Output Port | Outgoing VCI |
| :--------- | :----------- | :---------- | :----------- |
| 1          | 20           | 3           | 45           |
*This is a direct lookup based on the two identifying pieces of information from the incoming packet.*

**Step 2: Extract the forwarding information from S1's table.**
From the matching row, we find:
Output Port at S1 = 3
Outgoing VCI from S1 = 45
*These values tell us where S1 sends the packet and what VCI it should carry on the next link.*

**Final Answer (S1):** At Switch S1, the packet is forwarded on **Output Port 3** with an **Outgoing VCI of 45**.

**Part 2: Processing at Switch S2**

**Step 1: Determine the incoming information for S2.**
The packet leaves S1 on Output Port 3. We are told S1 forwards to S2. This implies that S1's Output Port 3 is connected to one of S2's Input Ports. Let's assume for this problem that S1's Output Port 3 connects to S2's Input Port 2. (If not specified, this would be an ambiguity, but in a real network, the topology is known).
So, the packet arrives at S2 on Input Port 2.
The Incoming VCI for S2 is the Outgoing VCI from S1, which is 45.
*Understanding the physical connection between switches is critical to correctly identify the input port for the next switch.*

**Step 2: Locate the matching entry in S2's table.**
The packet arrives at S2 on Input Port 2 with Incoming VCI = 45. We look for the row in S2's table that matches both these criteria.
Matching row:
| Input Port | Incoming VCI | Output Port | Outgoing VCI |
| :--------- | :----------- | :---------- | :----------- |
| 2          | 45           | 1           | 70           |
*Again, a direct lookup using the packet's current VCI and the port it arrived on.*

**Step 3: Extract the forwarding information from S2's table.**
From the matching row, we find:
Output Port at S2 = 1
Outgoing VCI from S2 = 70
*These values dictate how S2 forwards the packet.*

**Final Answer (S2):** At Switch S2, the packet arrived on **Input Port 2** with VCI 45, and is forwarded on **Output Port 1** with an **Outgoing VCI of 70**.

**Reflection:** This example demonstrates the core mechanism of virtual circuit switching: local VCI lookup. The "trick" is remembering that the VCI is often locally significant and changes from link to link. The forwarding table is essentially a mapping. The problem implicitly assumes a physical connection between S1's output port 3 and S2's input port 2; in a real scenario, this would be part of the network topology definition.

## 6. Common mistakes and traps

1.  **Confusing Virtual Circuit Switching with Circuit Switching:** The biggest trap. Students often think "virtual circuit" means a dedicated physical path like circuit switching. Remember: Virtual circuits are *logical* connections over a *shared* packet-switched network, not dedicated physical resources.
2.  **Ignoring Setup/Teardown Overhead:** Forgetting that circuit-switched and virtual circuit-switched networks have an initial connection setup phase (and a teardown phase) that adds delay before data transfer can begin. Packet switching (datagram) does not have this per-flow overhead.
3.  **Forgetting Queuing Delay in Packet Switching:** Often, students calculate transmission and propagation delays but overlook the highly variable and often dominant queuing delay, especially under heavy load. This is a critical component of packet-switched network performance.
4.  **Assuming In-Order Delivery in Packet Switching:** In pure datagram packet switching, packets can and often do arrive out of order if they take different paths or experience varying delays. This requires reordering at the receiver, which adds complexity. Virtual circuits, by contrast, generally guarantee in-order delivery.
5.  **Misunderstanding VCI Scope:** Thinking that a Virtual Circuit Identifier (VCI) is globally unique like an IP address. VCIs are typically *locally significant* on a given link and are often changed by each switch along the path.
6.  **Ignoring the "Store-and-Forward" Principle:** Not fully grasping that a router in a packet-switched network must receive the *entire* packet before it can begin transmitting the first bit of that packet on the outgoing link. This has implications for end-to-end delay calculations.

## 7. Textbook-precise explanation

**Switching** refers to the process by which a network element directs data from an input port to an appropriate output port, enabling communication between multiple devices connected to the network. This fundamental operation facilitates the sharing of network resources and the establishment of communication paths.

**Circuit Switching:**
Circuit switching is a connection-oriented switching technique that establishes a dedicated, end-to-end communication path (a "circuit") between two communicating entities for the entire duration of their interaction. Resources, including bandwidth and switch capacity, are exclusively reserved along this path, ensuring a guaranteed quality of service (QoS) and predictable performance. The process involves three distinct phases:
1.  **Circuit Establishment:** A signaling protocol is used to set up the dedicated path and reserve resources. If resources are unavailable, the connection request is blocked.
2.  **Data Transfer:** Once established, data flows continuously over the reserved circuit.
3.  **Circuit Teardown:** Upon completion of communication, the circuit is released, and reserved resources are freed.
This method employs either Frequency Division Multiplexing (FDM) or Time Division Multiplexing (TDM) to share a single physical link among multiple circuits. It is characterized by fixed, non-variable delays once the circuit is established.
*Reference: Kurose & Ross, Computer Networking: A Top-Down Approach, 8e, §1.4.1*

**Packet Switching:**
Packet switching is a connectionless (datagram) or connection-oriented (virtual circuit) switching technique where data is segmented into discrete units called "packets." Each packet contains a header with control information, including source and destination addresses. Packets are transmitted independently across the network, typically employing a "store-and-forward" mechanism at intermediate nodes (routers). Resources are shared dynamically among multiple concurrent communications through **statistical multiplexing**, where bandwidth is allocated on demand. This approach offers high efficiency for bursty traffic but can lead to variable delays (jitter), packet loss, and out-of-order delivery due to congestion and dynamic routing.
*Reference: Tanenbaum & Wetherall, Computer Networks, 6e, §5.1*

**Virtual Circuit Switching (VCS):**
Virtual circuit switching is a hybrid approach that combines aspects of both circuit and packet switching. It is **connection-oriented** at the network layer, meaning a logical end-to-end path, known as a **virtual circuit (VC)**, is established prior to data transfer. During the VC setup phase, switches along the path create entries in their forwarding tables, mapping incoming **Virtual Circuit Identifiers (VCIs)** on specific input ports to outgoing VCIs on specific output ports. Subsequent packets belonging to that VC carry a VCI, which is then used by intermediate switches for forwarding decisions. Unlike circuit switching, resources are *not* exclusively reserved; VCs share underlying link bandwidth using packet-switching principles. However, because all packets for a given VC follow the same predetermined path, in-order delivery is generally guaranteed, and per-packet forwarding decisions are simplified (VCI lookup rather than full address lookup). This method provides a balance between the guaranteed delivery order and reduced per-packet overhead of circuit switching, and the resource efficiency of packet switching. Examples include Frame Relay, ATM, and MPLS.
*Reference: Peterson & Davie, Computer Networks: A Systems Approach, 6e, §3.3.4*

## 8. ASCII diagrams

```text
                                  +-----+
                                  |     |
                                  | Host|
                                  |  A  |
                                  +-----+
                                     |
                                     | Link 1 (e.g., 10 Mbps)
                                     |
                                 +-------+
                                 |       |
                                 |Switch |
                                 |   S1  |
                                 |       |
                                 +-------+
                                 /   |   \
                                /    |    \ Link 2 (e.g., 10 Mbps)
                               /     |     \
                              /      |      \
                         +-------+ +-------+ +-------+
                         |       | |       | |       |
                         |Switch | |Switch | |Switch |
                         |   S2  | |   S3  | |   S4  |
                         |       | |       | |       |
                         +-------+ +-------+ +-------+
                               \     |     /
                                \    |    / Link 3 (e.g., 10 Mbps)
                                 \   |   /
                                 +-------+
                                 |       |
                                 |Switch |
                                 |   S5  |
                                 |       |
                                 +-------+
                                     |
                                     | Link 4 (e.g., 10 Mbps)
                                     |
                                  +-----+
                                  |     |
                                  | Host|
                                  |  B  |
                                  +-----+

--- Diagram 1: Basic Network Topology with Switches ---
This diagram shows a simple network with two hosts (A and B) connected through a series of switches.
Switches S1, S2, S3, S4, S5 represent intermediate nodes that forward data.
Links represent the physical connections between hosts and switches, or between switches themselves.


--- Diagram 2: Circuit Switching Example ---
Imagine Host A wants to communicate with Host B.

+-----+      Link 1      +-------+      Link A      +-------+      Link B      +-----+
| Host|------------------|Switch |------------------|Switch |------------------| Host|
|  A  |                  |   S1  |                  |   S5  |                  |  B  |
+-----+                  +-------+                  +-------+                  +-----+
                           |     |                    |     |
                           |     |                    |     |
                           |     |                    |     |
                           +-------+                  +-------+
                           |Switch |                  |Switch |
                           |   S2  |                  |   S4  |
                           +-------+                  +-------+
                               |                        |
                               | Link C                 | Link D
                               |                        |
                               +-------+
                               |Switch |
                               |   S3  |
                               +-------+

In circuit switching, a dedicated path is reserved, e.g., Host A -> S1 -> S5 -> Host B.
No other traffic can use the specific bandwidth on Link 1, Link A, and Link B that is allocated to this circuit, even if Host A and Host B are silent.
The path is fixed and exclusive for the duration of the call.


--- Diagram 3: Packet Switching Example ---
Assume Host A sends two packets (P1, P2) to Host B.

+-----+      Link 1      +-------+
| Host|------------------|Switch |
|  A  |       P1,P2      |   S1  |
+-----+                  +-------+
                           /   |   \
                          /    |    \
                         /     |     \
              Path 1    /      |      \ Path 2
                       /       |       \
              +-------+        |       +-------+
              |Switch |        |       |Switch |
              |   S2  |        |       |   S4  |
              +-------+        |       +-------+
                  |            |           |
                  |            |           |
                  |            |           |
                  |            |           |
              +-------+        |       +-------+
              |Switch |        |       |Switch |
              |   S3  |        |       |   S5  |
              +-------+        |       +-------+
                  \            |           /
                   \           |          /
                    \          |         /
                     \         |        /
                      \        |       /
                       \       |      /
                        \      |     /
                         \     |    /
                          \    |   /
                           \   |  /
                            \  | /
                             \ |/
                              +-----+
                              | Host|
                              |  B  |
                              +-----+

In packet switching, packets P1 and P2 are sent independently.
P1 might take Path 1 (e.g., A -> S1 -> S2 -> S3 -> S5 -> B).
P2 might take Path 2 (e.g., A -> S1 -> S4 -> S5 -> B).
They share the links with other traffic. P1 and P2 might arrive out of order, or P1 might be lost.


--- Diagram 4: Virtual Circuit Switching Example ---
Assume Host A wants to communicate with Host B using a Virtual Circuit.

VC Setup Phase:
Host A requests a VC to Host B. A path is established, e.g., A -> S1 -> S2 -> S5 -> B.
Each switch (S1, S2, S5) along this path creates an entry in its forwarding table.
Let's say S1 assigns VCI=20 for this connection on its input port from A.
S1's table: (Port A, VCI=20) -> (Port to S2, VCI=30)
S2's table: (Port from S1, VCI=30) -> (Port to S5, VCI=40)
S5's table: (Port from S2, VCI=40) -> (Port to B, VCI=50)

Data Transfer Phase:
+-----+      (VCI=20)      +-------+      (VCI=30)      +-------+      (VCI=40)      +-------+      (VCI=50)      +-----+
| Host|--------------------|Switch |--------------------|Switch |--------------------|Switch |--------------------| Host|
|  A  |                    |   S1  |                    |   S2  |                    |   S5  |                    |  B  |
+-----+                    +-------+                    +-------+                    +-------+                    +-----+
                               |                            |                            |
                               | (Other VCs)                | (Other VCs)                | (Other VCs)
                               |                            |                            |
                               +-------+                    +-------+                    +-------+
                               |Switch |                    |Switch |                    |Switch |
                               |   S3  |                    |   S4  |                    |   S6  |
                               +-------+                    +-------+                    +-------+

All packets from Host A to Host B for this communication will carry the VC identifier.
At each switch, the VCI is looked up in the local forwarding table to determine the next hop and the new VCI for that link.
E.g., Packet from A with VCI=20 arrives at S1. S1 looks up (Input Port A, VCI=20), forwards it to S2 with VCI=30.
Packet arrives at S2 with VCI=30. S2 looks up (Input Port from S1, VCI=30), forwards it to S5 with VCI=40.
Packet arrives at S5 with VCI=40. S5 looks up (Input Port from S2, VCI=40), forwards it to B with VCI=50.
This ensures packets follow the same path and arrive in order, while still sharing the physical link bandwidth with other VCs.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    *   **Circuit Switching (C for Call):** Imagine making an old-fashioned phone **call**. You get a **C**ompletely **C**onnected, **C**ompletely **C**lear, **C**ompletely **C**ommitted line. It's like a private, dedicated road from your house to your friend's, reserved just for your conversation, even if you stop talking for a bit. (Think of it as "Circuit = Call = Clear, Committed Connection").
    *   **Packet Switching (P for Postcard):** Think of sending a bunch of **p**ostcards. Each one is a small **p**acket, and they all travel independently through the postal system. They might take different paths, arrive at different times, and need to be reassembled at the end. (Think of it as "Packet = Postcard = Piece by Piece, Paths Vary").
    *   **Virtual Circuit Switching (V for VIP Lane):** This is a hybrid. It's still sending postcards (packets), but you've pre-arranged a "VIP lane" or a specific "preferred route" through the postal system for all your postcards to your friend. They still share the main roads, but they mostly stick to this pre-defined, logical path, ensuring they arrive in order. (Think of it as "Virtual Circuit = VIP Lane = Verified Path, but Variable Capacity").

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **Circuit Switching:** Dedicated resources, fixed path, setup/teardown phases, guaranteed QoS, inefficient for bursty traffic.
    *   **Packet Switching:** Shared resources (statistical multiplexing), dynamic path, no setup phase per packet, variable delay/loss, efficient for bursty traffic.
    *   **Virtual Circuit Switching:** Connection-oriented (logical path) over a packet-switched network, VCI-based forwarding, setup/teardown phases, generally in-order delivery, balance of efficiency and predictability.

3.  **Spaced-Repetition Schedule:**
    *   Review this lesson:
        *   **1 day** after initially learning it.
        *   **3 days** after the first review.
        *   **7 days** after the second review.
        *   **16 days** after the third review.
        *   **35 days** after the fourth review.
    *   During each review, actively recall the definitions, compare the three types, and mentally walk through the examples.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the specifics, always go back to the fundamental problem: "How do I connect two points in a network?"
    *   **Start with the extreme of "guaranteed, dedicated connection":** This immediately leads to the idea of reserving a path and resources, like a private pipe. What are the pros (predictability) and cons (wastefulness, blocking) of this? -> **Circuit Switching.**
    *   **Now consider the other extreme of "no guarantees, just send it":** This leads to breaking data into independent pieces, letting them find their own way. What are the pros (efficiency, resilience) and cons (unpredictability, reordering)? -> **Packet Switching.**
    *   **Finally, think about combining the best of both:** How can I get some predictability (like a path) but still be efficient (like sharing resources)? This means a *logical* path, not a physical one, using identifiers. What are the trade-offs here? -> **Virtual Circuit Switching.**
    By thinking about resource allocation (dedicated vs. shared) and connection setup (pre-arranged vs. on-the-fly), you can reconstruct the core characteristics and trade-offs of each switching method.

## 10. Connections — what this leads to

Understanding switching is foundational to almost all subsequent topics in computer networking. It directly sets the stage for:

1.  **Routing Algorithms (Network Layer - Layer 3):** Packet switching relies heavily on routers making intelligent forwarding decisions. This leads directly into the study of routing algorithms (e.g., OSPF, BGP, RIP) which determine the best paths for packets to travel across complex networks.
2.  **Congestion Control and Flow Control:** The dynamic sharing of resources in packet-switched networks inevitably leads to congestion. This requires mechanisms (like TCP's congestion control) to manage traffic flow, prevent network collapse, and ensure fair resource allocation.
3.  **Quality of Service (QoS):** While circuit switching inherently offers QoS, achieving predictable performance (low delay, low jitter, high bandwidth) over packet-switched networks is a significant challenge. This leads to the study of QoS mechanisms (e.g., DiffServ, IntServ, traffic shaping) that attempt to prioritize certain types of traffic.
4.  **Network Protocols (IP, TCP, UDP):** The Internet Protocol (IP) is the quintessential example of a connectionless, packet-switched protocol. TCP builds a reliable, connection-oriented service *on top* of IP's unreliable packet switching. UDP, on the other hand, embraces the connectionless nature for speed.
5.  **Data Link Layer (Layer 2) Switching:** While this lesson focuses on network-wide switching, the principles of forwarding frames based on MAC addresses within a local area network (LAN) are also a form of switching, albeit at Layer 2. Understanding higher-level switching helps contextualize LAN switches.
6.  **Software-Defined Networking (SDN):** SDN separates the control plane (which makes forwarding decisions) from the data plane (which actually forwards packets). Understanding how switches operate is critical to understanding how an SDN controller can programmatically define forwarding rules and manage network traffic.
7.  **Network Security:** Different switching paradigms have different security implications. For instance, a dedicated circuit is inherently more secure against eavesdropping than a shared packet-switched path, though both have vulnerabilities.

## 11. Self-check questions

1.  Describe a scenario where circuit switching would be a more appropriate choice than packet switching, and explain why, considering both efficiency and performance.
2.  A network link has a bandwidth of 1 Gbps. If 20 users each require 50 Mbps when active, but are only active 20% of the time, calculate the maximum number of users that can be supported by this link using:
    a) Circuit switching.
    b) Packet switching, if the acceptable probability of exceeding the link capacity (i.e., more users active than the link can handle at peak rate) is 0.01 (1%). (Hint: This will require using a binomial probability table or calculator for $P(X > k)$ where $k$ is the max users for circuit switching).
3.  Explain how a Virtual Circuit Identifier (VCI) is used by a switch to forward a packet, contrasting it with how a router might forward a packet in a pure datagram packet-switched network.
4.  Consider a packet of 2000 bytes traversing 5 links, each with a transmission rate of 50 Mbps, a propagation delay of 10 $\mu s$, and a processing delay of 15 $\mu s$ at each intermediate router. Calculate the total end-to-end delay, assuming no queuing delay. How would the introduction of significant, variable queuing delays impact the suitability of this network for real-time video conferencing, and why?
5.  A new communication technology is proposed that reserves a fixed bandwidth "slice" for each user, but only when the user is actively transmitting data. During idle periods, the slice is released for other users to temporarily borrow. Is this closer to circuit switching, packet switching, or virtual circuit switching? Justify your answer by comparing it to the core characteristics of each.