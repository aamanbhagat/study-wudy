## What it is
The **routing table** is a database in a router's control plane, containing a map of the network. It lists all known network destinations and the possible next-hop routers to reach them, along with metrics like cost or path length. The **forwarding table** is a streamlined, optimized version of the routing table, used by the router's data plane to make microsecond-fast decisions about where to send an incoming packet.

## Why it matters
This separation between a "thinking" component (routing table) and a "doing" component (forwarding table) is a fundamental design pattern in high-performance systems. In aerospace, the flight control computer for a launch vehicle has a strategic mission plan (the routing table equivalent) and a tactical, real-time control loop for engine gimbaling (the forwarding table equivalent). In distributed machine learning, a parameter server uses a high-level strategy to manage model updates, but individual nodes execute simple, fast forwarding rules to pass gradients to the correct destination.

## When to study it
Before tackling this, you must have a solid grasp of:
1.  **IP Addressing and Subnetting:** Specifically, CIDR (Classless Inter-Domain Routing) notation (e.g., `192.168.1.0/24`). Without this, the tables will be unreadable.
2.  **The Network Layer (Layer 3):** Understand that routers operate at this layer to move packets between different networks.
3.  **Packet Structure:** Know that an IP packet has a header containing a source and destination IP address.

If you are not comfortable with CIDR notation, stop and master that first.

## How to study it (step by step)
1.  **Draw a Network:** On paper, draw three routers (R1, R2, R3) in a triangle. Connect a unique LAN to each one (e.g., R1 is connected to `10.1.1.0/24`, R2 to `10.2.2.0/24`, R3 to `10.3.3.0/24`). Label the interfaces connecting the routers with IP addresses (e.g., the link between R1 and R2 could be `192.168.12.0/30`).
2.  **Build a Routing Table:** Focus on R1. Manually write out its routing table. It needs to know how to reach every network. For `10.1.1.0/24`, the next hop is "directly connected". To reach `10.2.2.0/24`, the next hop is R2's IP address (`192.168.12.2`). To reach `10.3.3.0/24`, the next hop is R3's IP address.
3.  **Derive the Forwarding Table:** Now, convert R1's routing table into a forwarding table. The goal is speed. Instead of the next hop's IP address, list the router's physical *output interface* (e.g., `eth0`, `eth1`). The forwarding table is a simple mapping: `Destination Prefix -> Output Interface`.
4.  **Practice Longest Prefix Match:** Add a new, more specific route to your routing table. For example, add a route for `10.2.2.128/25` via R3. Now, consider a packet destined for `10.2.2.130`. R1's table has two matching routes: `10.2.2.0/24` via R2 and `10.2.2.128/25` via R3. The `/25` mask is longer than `/24`, so it is more specific. The packet will be forwarded to R3. This is the **Longest Prefix Match** rule.
5.  **Internalize the Planes:** Label the process of building the routing table (e.g., with a routing protocol like OSPF) as the **Control Plane**. Label the process of a packet arriving, being looked up in the forwarding table, and sent out an interface as the **Data Plane**. This conceptual separation is critical.

## Key ideas, with intuition
1.  **Control Plane vs. Data Plane (Brain vs. Reflexes):**
    *   The **Control Plane** is the router's "brain." It runs routing protocols (like OSPF or BGP), communicates with other routers, and slowly, deliberately builds the comprehensive routing table. This is where policy is applied and the best paths are calculated.
    *   The **Data Plane** is the router's "spinal cord" or reflexes. Its only job is to get packets from an input port to an output port as fast as possible. It uses the forwarding table, which is pre-computed by the control plane, to do this. The data plane doesn't think; it just acts.

2.  **Routing Table (The Atlas):**
    *   This is a detailed map of the entire known network. It can contain multiple routes to the same destination, learned from different sources (static configuration, different routing protocols). It includes extra information like administrative distance (a trustworthiness score) and metrics (the "cost" of a path).
    $$
    \text{Routing Table Entry} \approx (\text{Destination Network, Subnet Mask, Next Hop IP, Metric, Source Protocol})
    $$

3.  **Forwarding Table (The Signpost):**
    *   This is a stripped-down, optimized data structure, often stored in special high-speed memory (TCAM). It contains only the *best* route to each destination, and its job is to provide one simple answer: "which way?" It maps a destination prefix directly to an outgoing interface. It is the direct input for the hardware switching fabric.
    $$
    \text{Forwarding Table Entry} \approx (\text{Destination Prefix, Output Interface})
    $$

4.  **Longest Prefix Match:**
    *   This is the single most important rule for packet forwarding. When a destination IP address matches multiple entries in the forwarding table, the router uses the entry with the longest subnet mask (the most specific route). This allows for hierarchical routing: you can have a general default route (`0.0.0.0/0`) that catches all traffic, and then carve out more specific exceptions for networks you care about.

## Worked example
A router, R1, has the following routing table, built by its control plane.

| Destination Network | Next Hop IP | Metric | Protocol |
| :--- | :--- | :--- | :--- |
| `198.51.100.0/24` | `203.0.113.2` | 10 | OSPF |
| `198.51.0.0/16` | `203.0.113.6` | 100 | BGP |
| `0.0.0.0/0` | `192.0.2.1` | 5 | Static |

The router's interfaces are:
- `eth0` is connected to the network where `192.0.2.1` lives.
- `eth1` is connected to the network where `203.0.113.2` lives.
- `eth2` is connected to the network where `203.0.113.6` lives.

**Step 1: Derive the Forwarding Table.**
The control plane processes the routing table to create the forwarding table. It selects the best route for each prefix and maps the next-hop IP to an output interface. In this simple case, all routes are for different prefixes, so they all go in.

**R1's Forwarding Table:**

| Destination Prefix | Output Interface |
| :--- | :--- |
| `198.51.100.0/24` | `eth1` |
| `198.51.0.0/16` | `eth2` |
| `0.0.0.0/0` | `eth0` |

**Step 2: Forward a Packet.**
A packet arrives at R1 with the destination IP address `198.51.100.55`.

**Step 3: Perform Lookup using Longest Prefix Match.**
The router's data plane checks this destination against the forwarding table.
- Does `198.51.100.55` match `198.51.100.0/24`? Yes. The prefix length is 24.
- Does `198.51.100.55` match `198.51.0.0/16`? Yes. The prefix length is 16.
- Does `198.51.100.55` match `0.0.0.0/0`? Yes. The prefix length is 0.

**Step 4: Select the Winning Route.**
The matching prefixes have lengths 24, 16, and 0. The longest prefix is `/24`. Therefore, the router chooses the first entry.

**Step 5: Action.**
The packet is sent out of interface `eth1`.

**Reflection:** This worked because the forwarding table is optimized for a single task: find the most specific matching prefix for a given destination IP. The separation of concerns (building the table vs. using the table) allows the router to handle traffic at line rate, even with a very complex global routing table.

## Diagrams
A conceptual diagram of a router's internal architecture:

```text
                  +-----------------------------------------+
                  |                 ROUTER                  |
                  |                                         |
                  |  +-----------------+   +--------------+ |
CONTROL PLANE ----> | Routing Processor |-->| Routing Table| |  (Slow, "Thinking")
(e.g., OSPF, BGP) |      (CPU)      |   | (in RAM)     | |
                  |  +-----------------+   +--------------+ |
                  |          |                              |
                  |          | Derives & Installs           |
                  |          V                              |
                  |  +----------------------+               |
DATA PLANE  ------> | Forwarding Engine/ASIC | <-------------> INGRESS/EGRESS PORTS
(Packets In/Out)  | +--------------------+ | (Fast, "Doing")
                  | | Forwarding Table   | |
                  | | (in TCAM/SRAM)     | |
                  | +--------------------+ |
                  +-----------------------------------------+
```

## Memory technique — remember this forever
1.  **Analogy: The Librarian and the Index Card**
    *   The **Routing Table** is the entire library's master catalog (the *control plane*). It's huge, detailed, and contains information on every book, its author, publication date, and possible locations. A librarian (the routing protocol) carefully curates it.
    *   The **Forwarding Table** is a single, small index card taped to the end of each shelf (the *data plane*). It doesn't say who the author is. It just says: "Books 500-599 -> AISLE 5". It's brutally efficient for the single task of finding the right aisle *right now*.

2.  **Must-Know Facts:**
    *   **Routing Table:** `Destination Network -> Next Hop IP`. Built by the **Control Plane**.
    *   **Forwarding Table:** `Destination Prefix -> Output Interface`. Used by the **Data Plane**.
    *   **Lookup Rule:** **Longest Prefix Match.**

3.  **Spaced Repetition Schedule:**
    *   Review this material in **1 day**. Draw the diagram from memory.
    *   Review again in **3 days**. Do the worked example with different IP addresses.
    *   Review again in **7 days**. Explain the Librarian analogy to a friend (or a rubber duck).
    *   Review again in **16 days**.
    *   Final review in **35 days**.

4.  **First Principles Pathway:**
    If you forget, reason it out. A device needs to send data. It has multiple exits. It needs a rulebook.
    *   *What must the rulebook contain?* `Destination -> Exit`.
    *   *How does it get the rules?* Someone programs them (static) or it learns them from neighbors (dynamic). This is complex and slow. This is the "brain" -> **Control Plane** and its **Routing Table**.
    *   *How does it use the rules for the billions of packets flying by?* It needs a super-fast, simple version of the rulebook. This is the "reflex" -> **Data Plane** and its **Forwarding Table**. The most logical way to handle overlapping rules (e.g., a rule for "USA" and a rule for "California") is to use the most specific one -> **Longest Prefix Match**.

## Common mistakes
1.  **Interchanging the Terms:** Calling the forwarding table a routing table. They are distinct. The forwarding table is *derived from* the routing table.
2.  **Forgetting Longest Prefix Match:** Assuming the first entry that matches in a table is the one that's used. The most *specific* entry (longest mask) always wins, regardless of its order in the table.
3.  **Confusing Next Hop with Output Interface:** The routing table points to the *next router's IP address*. The forwarding table points to the *local router's physical port*. The control plane does the work of resolving the former into the latter.
4.  **Ignoring the Control/Data Plane Split:** Not understanding *why* two tables exist. The reason is performance: separate the slow, complex decision-making (routing) from the fast, simple action (forwarding).

## Self-check
1.  A router's forwarding table is typically stored in what kind of specialized, high-speed memory? Why is this memory necessary?
2.  A forwarding table contains two entries: `172.16.0.0/12` pointing to `eth0`, and `172.20.208.0/20` pointing to `eth1`. A packet arrives with destination IP `172.20.215.10`. Which interface will it be forwarded to, and why? Show the binary arithmetic if necessary.
3.  Imagine a router learns about the network `10.0.0.0/8` from two different routing protocols: OSPF gives it a cost of 50, and EIGRP gives it a cost of 150. By default, most routers trust EIGRP more than OSPF (they assign it a better "administrative distance"). Describe the process and the tables involved as the router decides which protocol's route to use to populate its forwarding table.