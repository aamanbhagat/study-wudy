## What it is
Routing is the process of selecting a path for traffic in a network. **Static routing** involves manually configuring these paths in a router's routing table; these paths are fixed and do not change unless a network administrator intervenes. **Dynamic routing** uses protocols that allow routers to automatically discover network paths and update their routing tables in response to network changes, like link failures or new connections.

## Why it matters
In large-scale, mission-critical networks, failures are inevitable. The internet, satellite communication networks (like NASA's Deep Space Network), and control systems for autonomous vehicles rely on dynamic routing to automatically re-route traffic around failures, ensuring continuous connectivity. Static routing, while less flexible, is crucial for security and predictability in smaller, isolated networks, such as the internal network of a spacecraft module or a secure lab environment, where you need absolute control over the data path.

## When to study it
Before tackling this, you must have a solid grasp of the following. If not, review them first.
*   **IP Addressing and Subnetting:** You must understand how IP addresses identify hosts and how subnets group them into networks.
*   **OSI or TCP/IP Model:** Specifically, you need to know that routing occurs at the Network Layer (Layer 3).
*   **Basic Network Components:** Understand the roles of a router, switch, and host.
*   **Network Topologies:** Be able to read and understand simple network diagrams (e.g., bus, star, mesh).

## How to study it (step by step)
1.  **Draw a three-router network.** Label them R1, R2, and R3, connected in a line: R1-R2-R3. Attach a unique subnet to R1 (e.g., `192.168.1.0/24`) and R3 (e.g., `192.168.3.0/24`).
2.  **Manually build the routing table for R1.** To send a packet from the network on R1 to the network on R3, what does R1 need to know? It only knows about its direct connection to R2. You must manually add a static route: "To reach `192.168.3.0/24`, send the packet to R2's interface." Write down the command or logic for this.
3.  **Simulate a failure.** Now, imagine the link between R2 and R3 fails. R1's static route is still in its table. It will continue sending packets for R3's network to R2, where they will be dropped. Observe that the network requires manual intervention to fix this.
4.  **Conceptualize the dynamic solution.** Imagine R2 and R3 are running a dynamic routing protocol. When the link between them fails, R2 would detect it. It would then send an update message to R1, effectively saying, "My path to `192.168.3.0/24` is gone." R1 would then automatically remove the route from its table. This automation is the core of dynamic routing.
5.  **Compare two dynamic protocols.** Research the high-level differences between a distance-vector protocol (like RIP) and a link-state protocol (like OSPF). Note how they differ in the information they exchange (rumors vs. a full map) and the metric they use to calculate the "best" path (hop count vs. cost/bandwidth).

## Key ideas, with intuition
1.  **The Routing Table is the Router's Brain:** A router's sole purpose for a given packet is to look at the destination IP address and decide which exit interface to send it out of. This decision is made by consulting a lookup table called the routing table. The core difference between static and dynamic routing is *how this table is populated*.

2.  **Static Routing = A Pre-printed Map:** A static route is a hard-coded instruction: `To get to Destination_Network, send traffic to Next_Hop_IP`.
    $$ \text{Route} : (\text{Destination Network/Mask}) \rightarrow (\text{Next Hop Address}, \text{Exit Interface}) $$
    This is efficient and predictable. The router wastes no CPU cycles calculating paths. But if a road on the map is closed (a link fails), the map is wrong, and traffic gets lost until a human draws a new map (reconfigures the route).

3.  **Dynamic Routing = A GPS Navigation App:** Dynamic routing protocols are algorithms run by routers to build their own maps. They talk to their neighbors to learn about the network's topology.
    *   **Distance-Vector (e.g., RIP):** Routers tell their neighbors about the networks they can reach and how far away they are (the "distance vector"). It's like getting directions from a friend who only tells you their own travel time to various places, not the full map. This is "routing by rumor."
    *   **Link-State (e.g., OSPF):** Each router discovers its immediate neighbors and the status ("link state") of those connections. It then floods this information to *all other routers* in the area. Every router independently builds an identical, complete map of the network and then calculates the shortest path from its own position. This is more complex but converges faster and is more robust.

4.  **The Trade-off: Control vs. Automation:**
    *   **Static:** Maximum control, simple, no network overhead from routing protocol traffic, more secure (no routing updates to intercept). Best for small, stable networks or for specific routes you want to force (a "stub network").
    *   **Dynamic:** Automatic adaptation to changes, scalable to large networks, less administrative burden in the long run. Requires CPU/memory on the router and generates network traffic.

## Worked example
**Scenario:** Configure a path from a PC on R1's network to a server on R3's network.

**Topology:**
*   PC1 (`10.0.1.10`) is connected to Router R1.
*   R1's `eth0` is `10.0.1.1`, R1's `eth1` is `172.16.0.1`.
*   R1 is connected via `eth1` to R2's `eth0` (`172.16.0.2`).
*   R2's `eth1` is `172.16.1.1`.
*   R2 is connected via `eth1` to R3's `eth0` (`172.16.1.2`).
*   Server1 (`10.0.2.20`) is connected to Router R3. R3's `eth1` is `10.0.2.1`.

**Goal:** Allow PC1 to ping Server1. This requires a path *to* the server and a path *back*.

**Step 1: Configure the forward path on R1.**
R1 knows about its directly connected networks (`10.0.1.0/24` and `172.16.0.0/24`), but it has no idea how to reach `10.0.2.0/24`. We must tell it.
*   **Logic:** To reach the `10.0.2.0/24` network, send all packets to the next router in the line, which is R2 at IP address `172.16.0.2`.
*   **Configuration (pseudo-command):** `ip route add 10.0.2.0/24 via 172.16.0.2`

**Step 2: Configure the return path on R3.**
A ping requires a reply. When Server1 replies to PC1, the packet goes to its gateway, R3. R3 knows about `10.0.2.0/24` and `172.16.1.0/24`, but it has no idea how to reach PC1 at `10.0.1.10`. We must tell it how to get to the `10.0.1.0/24` network.
*   **Logic:** To reach the `10.0.1.0/24` network, send all packets to the next router in the line, which is R2 at IP address `172.16.1.1`.
*   **Configuration (pseudo-command):** `ip route add 10.0.1.0/24 via 172.16.1.1`

**Step 3: Verify R2's routes.**
R2 is directly connected to both intermediate networks (`172.16.0.0/24` and `172.16.1.0/24`), so it already knows how to forward packets between R1 and R3. No static routes are needed on R2 for this specific path.

**Reflection:** Each step was necessary because a router only knows about its directly connected interfaces by default. We had to manually provide the "map" for any remote networks. Forgetting the return path on R3 (Step 2) is a classic mistake; the ping would go out but the reply would never make it back. If the R2-R3 link failed, both static routes would become invalid and require an administrator to manually delete them and add new ones if an alternate path existed.

## Diagrams
A simple linear topology where static routing is straightforward:
```text
(Network A)         (Link Net 1)          (Link Net 2)         (Network B)
10.0.1.0/24         172.16.0.0/24         172.16.1.0/24        10.0.2.0/24
      |                   |                     |                    |
    [ R1 ]--------------[ R2 ]----------------[ R3 ]
      ^                                                            |
      |                                                            v
To get to B, R1's                                             To get to A, R3's
static route must                                             static route must
point to R2.                                                  point to R2.
```

A topology with redundancy, where dynamic routing excels:
```text
           [ R1 ]
          /      \
(Cost: 10)/        \(Cost: 10)
        /          \
      [ R2 ]------[ R3 ]
          (Cost: 100)
            |
         [Network X]

Imagine Network X is attached to R3.
- Static Route: An admin might configure R1 to always go via R2 to reach X.
- Dynamic Route: A protocol like OSPF would see two paths: R1->R2->R3 (total cost 110) and R1->R3 (cost 10). It would automatically choose the direct R1->R3 path. If that link fails, it would instantly recalculate and start using the R1->R2->R3 path.
```

## Memory technique — remember this forever
1.  **The Story:** **Static Routing is giving a driver printed MapQuest directions.** They are perfect for the planned trip. They are fast to read and require no GPS device. But if there's an unexpected road closure, the driver is lost. **Dynamic Routing is giving the driver Waze or Google Maps.** The app constantly gets updates from other cars (routers) and automatically reroutes the driver around traffic jams or accidents (link failures). It uses more battery (CPU/bandwidth) but is far more resilient.

2.  **Must Overlearn:**
    *   **Static Route:** A fixed, manually configured entry mapping a destination network to a next-hop gateway.
    *   **Dynamic Route:** A route learned and maintained automatically via a routing protocol (e.g., OSPF, BGP, RIP) that adapts to topology changes.
    *   **The Core Trade-off:** Static = Control & Simplicity. Dynamic = Scalability & Adaptability.

3.  **Spaced Repetition Schedule:** Review this material at:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget everything, start here: A router gets a packet. It needs to forward it. How does it choose the exit port? It looks up the destination address in a *routing table*. The only question is: who writes the entries in that table? A human (static) or an algorithm shared between routers (dynamic)? All details flow from this fundamental distinction.

## Common mistakes
1.  **Asymmetric Routing:** Configuring the static route to a destination but forgetting to configure a return route from the destination. Packets get there, but replies can't get back.
2.  **Believing "Dynamic is Always Better":** For a simple network with one exit point (a "stub network"), a single static default route (`0.0.0.0/0`) is far more efficient and secure than running a dynamic protocol.
3.  **Confusing Administrative Distance with Metric:** A dynamic protocol's *metric* is used to choose the best path among multiple paths learned by the *same protocol* (e.g., OSPF cost). *Administrative Distance* is used by the router to break ties when it learns about the same destination from *different sources* (e.g., a static route vs. an OSPF route). A static route typically has an AD of 1, making it more trustworthy than most dynamic routes.

## Self-check
1.  You are setting up a small home office network with one router connected to your ISP. Should you use a static or dynamic routing protocol to direct traffic to the internet? Why?
2.  Consider the second (redundant) diagram above. A new, very high-speed link (Cost: 1) is added between R2 and R3. The existing R2-R3 link (Cost: 100) remains as a backup. If the R1-R3 link fails, describe the path a packet would take from R1 to Network X, and explain how a link-state protocol like OSPF would determine this new path.
3.  A network administrator has configured a static route on R1 pointing to a destination. Simultaneously, the network's dynamic routing protocol (OSPF) has also found a path to the same destination. By default, which route will the router install in its routing table and use to forward traffic? What underlying router mechanism explains this choice?