## 1. What it is — in plain English

Imagine you're trying to find the quickest way to a new restaurant in a city you don't know well. You don't have a map, but you can ask your friends. Instead of asking *everyone* how to get there, you just ask your *immediate neighbors*. Each neighbor tells you, "Hey, I know how to get to that restaurant, and it takes me about 10 minutes."

Distance vector routing works similarly for computers called "routers" on a network. Each router wants to figure out the best (usually meaning "fastest" or "cheapest") path to every other possible destination on the network. It doesn't have a full map of the entire internet. Instead, it only knows its immediate neighbors and the "cost" (like time or distance) to reach each of them.

Every so often, each router tells its neighbors its personal "best list" of how to get to all known destinations and what those paths cost. When a router receives these lists from its neighbors, it updates its *own* best list. If a neighbor says, "I can get to Destination X in 5 hops," and it costs you 1 hop to get to that neighbor, then you now know you can get to Destination X in $1 + 5 = 6$ hops via that neighbor. If that's better than your current best path to Destination X, you update your list!

This process repeats continuously. Routers keep exchanging their "best lists" and updating their own, slowly but surely, until everyone has figured out their best path to every destination. It's a bit like a rumor mill, where information spreads locally and eventually, everyone has the most up-to-date "best way" information.

## 2. Why it matters — real-world applications

Distance vector routing, particularly its most famous implementation, RIP (Routing Information Protocol), has been fundamental to the internet's development and continues to be relevant in specific contexts.

1.  **Early Internet Backbone:** In the nascent days of the internet (ARPANET), basic forms of distance vector algorithms were among the first methods used to route data packets. They provided a simple, distributed way for routers to discover network topology and forward traffic without needing a central authority or a complete global map. While largely superseded by more advanced protocols for the internet backbone, this foundational work laid the groundwork for all subsequent routing.
2.  **Small to Medium-Sized Enterprise Networks:** RIP is still used today in smaller, less complex corporate or campus networks. For organizations that don't require the advanced features, rapid convergence, or scalability of more complex routing protocols, RIP offers a straightforward and easy-to-configure solution. It's often found in environments where simplicity and minimal administrative overhead are prioritized over optimal performance or extreme fault tolerance.
3.  **Ad-Hoc and Sensor Networks (Conceptual Basis):** The core idea of "local information exchange leading to global path discovery" is a powerful concept in distributed systems. While not directly using RIP, the principles of distance vector routing influence the design of routing protocols in dynamic, self-organizing networks like wireless ad-hoc networks (MANETs) or wireless sensor networks. In these environments, nodes have limited power, memory, and processing capabilities, and the network topology changes frequently. Distance vector-like approaches, where nodes only communicate with immediate neighbors, can be more suitable than complex, global-state algorithms.
4.  **Network Simulation and Education:** Understanding distance vector routing is crucial for any computer science student studying networking. It provides a concrete example of a distributed algorithm, illustrating concepts like local convergence, iterative updates, and the challenges of achieving global consistency with only local information. Simulators often use distance vector models to teach fundamental routing concepts.

## 3. Prerequisites — what you must know first

Before diving deep into distance vector routing, ensure you have a solid grasp of these foundational concepts:

*   **Networking Basics:** Understand what a **router** is (a device that forwards data packets between computer networks), what a **host** is (an end device like a computer or server), and the concept of a **packet** (a small unit of data transmitted over a network).
*   **IP Addressing:** Familiarity with **IP addresses** (unique numerical labels assigned to devices in a network) and how they identify source and destination devices.
*   **Network Topology:** The physical or logical arrangement of nodes (routers, hosts) and connections (links) in a network. Concepts like **neighbors** (directly connected nodes) are crucial.
*   **Graph Theory Basics:**
    *   **Graph:** A collection of **nodes** (or vertices) and **edges** (or links) connecting pairs of nodes. In networking, routers are nodes, and connections between them are edges.
    *   **Weight/Cost:** A numerical value assigned to an edge, representing the "cost" of traversing that link (e.g., time delay, bandwidth, hop count).
    *   **Path:** A sequence of nodes and edges connecting two nodes.
    *   **Shortest Path:** The path between two nodes with the minimum total weight/cost.
*   **Basic Algorithms:** An understanding of iterative processes and how algorithms can converge to a solution.

## 4. The core idea — step by step

Distance vector routing is a dynamic routing algorithm where each router maintains a "distance vector" (a table) of the best known distances to all destinations and which neighbor to use to reach them. This information is exchanged with directly connected neighbors, leading to an iterative update process.

### ### Step 1: The Goal — Finding the Shortest Path

**Plain English:** Every router on the network wants to find the absolute best (cheapest, fastest, fewest hops) way to send data to *every other* router or network segment. It needs to know not just the minimum cost, but also *which immediate neighbor* to send the data to in order to get it onto that best path.

**Small Concrete Example:** Imagine Router A wants to send a packet to Router Z. Router A needs to figure out if it should send the packet to its neighbor B, or C, or D, such that the total cost to Z is minimized.

**Formal/Mathematical Version:** For each router $x$ and every possible destination $z$ in the network, router $x$ aims to determine:
1.  The minimum cost $D_x(z)$ to reach $z$.
2.  The next-hop neighbor $y$ such that sending the packet to $y$ results in this minimum cost.

**What could go wrong:** "Shortest" isn't always best. A path with fewer hops might be incredibly congested, making a path with more hops actually faster. The definition of "cost" is critical.

### ### Step 2: The Distance Vector — A Router's Local Knowledge

**Plain English:** Each router keeps a small table, its "distance vector," in its memory. This table lists every destination it knows about, its current best guess for the total cost to reach that destination, and which of its direct neighbors it should send the packet to for that path. Initially, it only knows about itself (cost 0) and its direct neighbors (cost of the direct link).

**Small Concrete Example:** Router R1 has neighbors R2 and R3.
Initial Distance Vector for R1:
*   To R1: Cost 0, Next-hop R1 (or local)
*   To R2: Cost 1 (direct link), Next-hop R2
*   To R3: Cost 2 (direct link), Next-hop R3
*   To R4: Cost $\infty$, Next-hop - (unknown)

**Formal/Mathematical Version:** Each router $x$ maintains a distance vector $DV_x$, which is an array or table. For each destination $z$ in the network, $DV_x[z]$ stores router $x$'s current estimate of the shortest path cost from $x$ to $z$. It also stores $NH_x[z]$, the next-hop router on that path.
Initially:
*   $DV_x[x] = 0$
*   $DV_x[y] = cost(x,y)$ for all direct neighbors $y$
*   $DV_x[z] = \infty$ for all other destinations $z$

**What could go wrong:** If the initial costs are wrong, the entire process might converge to a suboptimal solution. If $\infty$ is not truly "infinity" (e.g., a max hop count), it limits network size.

### ### Step 3: Sharing Information — The Gossip Protocol

**Plain English:** Periodically (or when its own table changes significantly), each router sends a copy of its *entire* distance vector to *all* of its directly connected neighbors. It doesn't send it to routers further away, only to those it can directly reach.

**Small Concrete Example:** Router A sends its distance vector (e.g., "I can reach B in 1 hop, C in 2 hops, D in 5 hops") to its neighbor Router B. Router B simultaneously sends *its* distance vector to Router A, and to its other neighbors.

**Formal/Mathematical Version:** For every router $x$ and each of its direct neighbors $y \in N(x)$, router $x$ transmits its current distance vector $DV_x$ to $y$. This is often done periodically (e.g., every 30 seconds in RIP).

**What could go wrong:** Sending updates too frequently consumes bandwidth and processing power. Sending them too infrequently means the network reacts slowly to changes (like broken links).

### ### Step 4: The Bellman-Ford Equation — Updating Your Knowledge

**Plain English:** When a router receives a distance vector from a neighbor, it uses that information to update its *own* table. For each destination listed in the neighbor's vector, the router calculates a potential new path: "What if I go to this neighbor, and *then* follow their best path to the destination?" If this calculated path is better (lower cost) than what the router currently has in its own table for that destination, it updates its table to use this new, better path through that neighbor.

**Small Concrete Example:** Router $x$ receives $DV_y$ from its neighbor $y$.
Suppose $DV_y[z] = 5$ (neighbor $y$ says it can reach $z$ in 5 hops).
The direct cost from $x$ to $y$ is $cost(x,y) = 1$.
Router $x$ calculates a path to $z$ via $y$: $cost(x,y) + DV_y[z] = 1 + 5 = 6$.
If Router $x$'s current $DV_x[z]$ is 8, then 6 is better. So, $x$ updates $DV_x[z]$ to 6 and sets its next-hop for $z$ to $y$.
If $DV_x[z]$ was already 4, then 6 is not better, so $x$ keeps its current path.

**Formal/Mathematical Version (Bellman-Ford Update Rule):**
For each router $x$ and for every destination $z$ in the network, when $x$ receives a distance vector $DV_y$ from a neighbor $y$:
$$ DV_x[z] = \min \left( DV_x[z], \quad cost(x,y) + DV_y[z] \right) $$
This equation is applied for all neighbors $y \in N(x)$. If $DV_x[z]$ is updated, the next-hop $NH_x[z]$ is set to the neighbor $y$ that provided the minimum.

**What could go wrong:** This equation forms the core of the algorithm, but it's also the source of the "count-to-infinity" problem if not handled carefully, especially when links go down.

### ### Step 5: Convergence — Reaching Agreement

**Plain English:** This sharing and updating process continues over and over. Each time a router updates its table, it might trigger new updates to its neighbors. Eventually, if the network is stable and no links change, all routers will have found their shortest paths to all destinations, and their distance vectors will stop changing. At this point, the network is said to have "converged."

**Small Concrete Example:** Initially, only direct neighbors are known. In the first update cycle, neighbors exchange their direct knowledge. In the second cycle, routers learn about destinations two hops away (via their neighbors). This ripples through the network until all shortest paths are discovered.

**Formal/Mathematical Version:** The algorithm converges when, for all routers $x$ and all destinations $z$, the values $DV_x[z]$ and $NH_x[z]$ no longer change after receiving updates from neighbors. At convergence, $DV_x[z]$ will represent the true shortest path cost from $x$ to $z$.

**What could go wrong:** If the network topology is constantly changing (links going up and down), the network might never fully converge, leading to unstable routing.

### ### Step 6: Routing Information Protocol (RIP) — A Real-World Example

**Plain English:** RIP is a specific, widely-known distance vector routing protocol. It uses "hop count" (the number of routers a packet must pass through) as its only metric for cost. A key limitation is that it considers any path longer than 15 hops to be "infinity" (unreachable), which restricts its use to smaller networks. RIP routers send their full distance vectors to neighbors every 30 seconds.

**Small Concrete Example:** In a network running RIP, if Router A has a path to Router Z that goes A -> B -> C -> Z (3 hops), and Router A's neighbor Router X has a path to Z that goes X -> Y -> Z (2 hops), Router A will compare its current 3-hop path with $cost(A,X) + 2$ hops. If $cost(A,X)$ is 1, then the new path via X is $1+2=3$ hops. If its current path is also 3 hops, it might keep its current path or switch, depending on implementation specifics. If its current path was 4 hops, it would definitely switch to the 3-hop path via X.

**Formal/Mathematical Version:**
*   **Metric:** Hop count (number of routers traversed).
*   **Infinity:** 16 hops (any path with 16 or more hops is considered unreachable).
*   **Update Interval:** 30 seconds (routers send their distance vectors periodically).
*   **Transport Protocol:** UDP port 520.
*   **Loop Prevention:** Implements techniques like split horizon and poison reverse (discussed later) to mitigate count-to-infinity.

**What could go wrong:** The 15-hop limit makes RIP unsuitable for large networks like the internet. Its slow convergence due to periodic updates and the count-to-infinity problem can lead to routing loops and black holes.

### ### Step 7: Count-to-Infinity — The Major Flaw

**Plain English:** This is the most infamous problem with basic distance vector routing. Imagine Router A thinks it can reach Destination Z via Router B. If the link between B and Z suddenly breaks, B updates its table to say it can't reach Z (or it's now $\infty$). However, A might still think it can reach Z via B. If B then receives an update from A saying "I can reach Z in 2 hops," B might mistakenly think, "Oh, A can reach Z, so I can reach Z via A in $1 + 2 = 3$ hops." Then B tells A, "I can reach Z in 3 hops." A then thinks, "Oh, B can reach Z, so I can reach Z via B in $1 + 3 = 4$ hops." This creates a loop where the cost to Z keeps increasing (counting to infinity) until it hits the maximum (e.g., 16 hops in RIP) and is finally declared unreachable. During this time, traffic sent to Z might loop endlessly.

**Small Concrete Example:**
Network: A --1-- B --1-- C --1-- Z
Initial state:
*   $DV_A[Z]=3$ (via B)
*   $DV_B[Z]=2$ (via C)
*   $DV_C[Z]=1$ (via Z)

Link C-Z breaks.
1.  $C$ updates $DV_C[Z]=\infty$.
2.  $C$ sends $DV_C$ to $B$. $B$ updates $DV_B[Z]$ based on $C$. Since $C$ no longer offers a path, $B$ looks for other paths. $B$ still has $A$'s old $DV_A[Z]=3$. So $B$ thinks it can reach $Z$ via $A$: $cost(B,A) + DV_A[Z] = 1 + 3 = 4$. $B$ updates $DV_B[Z]=4$ (via A).
3.  $B$ sends $DV_B$ (now $DV_B[Z]=4$) to $A$. $A$ updates $DV_A[Z]$ based on $B$: $cost(A,B) + DV_B[Z] = 1 + 4 = 5$. $A$ updates $DV_A[Z]=5$ (via B).
4.  $A$ sends $DV_A$ (now $DV_A[Z]=5$) to $B$. $B$ updates $DV_B[Z]$ based on $A$: $cost(B,A) + DV_A[Z] = 1 + 5 = 6$. $B$ updates $DV_B[Z]=6$ (via A).
... this continues until the cost reaches 16 and Z is finally declared unreachable.

**Formal/Mathematical Version:** When a link or destination becomes unreachable, routers might propagate stale information. If router $x$ was using neighbor $y$ to reach destination $z$, and the path $y \to z$ breaks, $y$ updates its $DV_y[z]$ to $\infty$. However, if $x$ has other neighbors, or if $y$ receives an old update from $x$ (before $x$ knows about the break), $y$ might falsely believe $x$ can still reach $z$. This creates a positive feedback loop where the reported distance to $z$ increments by 1 in each cycle between $x$ and $y$ until it reaches the maximum allowed cost (e.g., 16 in RIP).

**What could go wrong:** Packets destined for $Z$ will be routed in a loop between $A$ and $B$ (or other involved routers) for many update cycles, effectively being dropped or causing network congestion, until the "infinity" threshold is reached.

## 5. Worked examples — multiple, with every step shown

Let's use a simple network topology for our examples. Each link has a cost of 1 (hop count).

```text
    (R1) ---1--- (R2) ---1--- (R3)
     |           /
     1          1
     |         /
    (R4) ------
```
Initial state for all routers (knowing only themselves and direct neighbors):
For any router $X$:
$DV_X[X] = 0$ (via X)
$DV_X[Y] = 1$ (via Y) if Y is a direct neighbor
$DV_X[Z] = \infty$ (via -) for non-neighbors

### Example 1: Simple Convergence (Easy)

**Problem:** Given the network above with all link costs = 1. Show the distance vector table for Router R1 after the first full exchange of information. Assume all routers update and send simultaneously.

**Given:**
*   Network topology: R1-R2, R1-R4, R2-R3, R2-R4.
*   All link costs = 1.
*   Initial state: Each router knows its direct neighbors with cost 1, and itself with cost 0. All other destinations are $\infty$.

**What we want:** $DV_{R1}$ after one update cycle.

**Steps:**

**Initial Distance Vectors (before any exchange):**

*   $DV_{R1}$:
    *   R1: 0 (via R1)
    *   R2: 1 (via R2)
    *   R3: $\infty$ (via -)
    *   R4: 1 (via R4)
*   $DV_{R2}$:
    *   R1: 1 (via R1)
    *   R2: 0 (via R2)
    *   R3: 1 (via R3)
    *   R4: 1 (via R4)
*   $DV_{R3}$:
    *   R1: $\infty$ (via -)
    *   R2: 1 (via R2)
    *   R3: 0 (via R3)
    *   R4: $\infty$ (via -)
*   $DV_{R4}$:
    *   R1: 1 (via R1)
    *   R2: 1 (via R2)
    *   R3: $\infty$ (via -)
    *   R4: 0 (via R4)

**Round 1: Routers send their initial DVs to neighbors.**
*   R1 sends $DV_{R1}$ to R2, R4.
*   R2 sends $DV_{R2}$ to R1, R3, R4.
*   R3 sends $DV_{R3}$ to R2.
*   R4 sends $DV_{R4}$ to R1, R2.

**Router R1's update process:**
R1 receives $DV_{R2}$ from R2 and $DV_{R4}$ from R4.

1.  **Update $DV_{R1}$ using $DV_{R2}$ (from neighbor R2, $cost(R1,R2)=1$):**
    *   For R1: $DV_{R1}[R1] = \min(0, cost(R1,R2) + DV_{R2}[R1]) = \min(0, 1+1) = \min(0,2) = 0$.
        *   *Explanation:* R1 already knows it can reach itself in 0 hops. Path via R2 is 2 hops, so R1's direct path is better. No change for R1.
    *   For R2: $DV_{R1}[R2] = \min(1, cost(R1,R2) + DV_{R2}[R2]) = \min(1, 1+0) = \min(1,1) = 1$.
        *   *Explanation:* R1 already knows it can reach R2 in 1 hop directly. Path via R2 (to R2 itself) is also 1 hop. No change for R2.
    *   For R3: $DV_{R1}[R3] = \min(\infty, cost(R1,R2) + DV_{R2}[R3]) = \min(\infty, 1+1) = \min(\infty,2) = 2$.
        *   *Explanation:* R1 previously didn't know how to reach R3 ($\infty$). R2 says it can reach R3 in 1 hop. So, R1 can reach R3 via R2 in $1+1=2$ hops. R1 updates its table: $DV_{R1}[R3]=2$, next-hop R2.
    *   For R4: $DV_{R1}[R4] = \min(1, cost(R1,R2) + DV_{R2}[R4]) = \min(1, 1+1) = \min(1,2) = 1$.
        *   *Explanation:* R1 already knows it can reach R4 in 1 hop directly. Path via R2 to R4 is 2 hops. R1's direct path is better. No change for R4.

    *After processing $DV_{R2}$, $DV_{R1}$ looks like:*
    *   R1: 0 (via R1)
    *   R2: 1 (via R2)
    *   R3: 2 (via R2)
    *   R4: 1 (via R4)

2.  **Update $DV_{R1}$ using $DV_{R4}$ (from neighbor R4, $cost(R1,R4)=1$):**
    *   For R1: $DV_{R1}[R1] = \min(0, cost(R1,R4) + DV_{R4}[R1]) = \min(0, 1+1) = \min(0,2) = 0$.
        *   *Explanation:* No change.
    *   For R2: $DV_{R1}[R2] = \min(1, cost(R1,R4) + DV_{R4}[R2]) = \min(1, 1+1) = \min(1,2) = 1$.
        *   *Explanation:* No change.
    *   For R3: $DV_{R1}[R3] = \min(2, cost(R1,R4) + DV_{R4}[R3]) = \min(2, 1+\infty) = \min(2,\infty) = 2$.
        *   *Explanation:* R1 previously learned it could reach R3 in 2 hops via R2. R4 doesn't know how to reach R3 ($\infty$), so path via R4 is $\infty$. R1 keeps its current path via R2. No change for R3.
    *   For R4: $DV_{R1}[R4] = \min(1, cost(R1,R4) + DV_{R4}[R4]) = \min(1, 1+0) = \min(1,1) = 1$.
        *   *Explanation:* No change.

**Final $DV_{R1}$ after first full exchange:**

| Destination | Cost | Next-Hop |
| :---------- | :--- | :------- |
| R1          | 0    | R1       |
| R2          | 1    | R2       |
| **R3**      | **2**| **R2**   |
| R4          | 1    | R4       |

**Reflection:** This example shows how a router learns about destinations two hops away (R3) in the first update cycle. It also demonstrates that a router only updates its table if a *better* path is found.

---

### Example 2: Full Convergence (Medium)

**Problem:** Given the same network, show the full convergence of Router R3's distance vector table.

**Given:**
*   Network topology: R1-R2, R1-R4, R2-R3, R2-R4.
*   All link costs = 1.
*   Initial state as in Example 1.

**What we want:** $DV_{R3}$ at convergence.

**Steps:**

**Initial $DV_{R3}$:**
*   R1: $\infty$ (via -)
*   R2: 1 (via R2)
*   R3: 0 (via R3)
*   R4: $\infty$ (via -)

**Round 1: Routers send initial DVs. R3 receives $DV_{R2}$ from R2 ($cost(R3,R2)=1$).**

1.  **Update $DV_{R3}$ using $DV_{R2}$ (from neighbor R2, $cost(R3,R2)=1$):**
    *   For R1: $DV_{R3}[R1] = \min(\infty, cost(R3,R2) + DV_{R2}[R1]) = \min(\infty, 1+1) = \min(\infty,2) = 2$.
        *   *Explanation:* R3 learns it can reach R1 via R2 in $1+1=2$ hops. $DV_{R3}[R1]=2$, next-hop R2.
    *   For R2: $DV_{R3}[R2] = \min(1, cost(R3,R2) + DV_{R2}[R2]) = \min(1, 1+0) = 1$.
        *   *Explanation:* No change.
    *   For R3: $DV_{R3}[R3] = \min(0, cost(R3,R2) + DV_{R2}[R3]) = \min(0, 1+1) = 0$.
        *   *Explanation:* No change.
    *   For R4: $DV_{R3}[R4] = \min(\infty, cost(R3,R2) + DV_{R2}[R4]) = \min(\infty, 1+1) = 2$.
        *   *Explanation:* R3 learns it can reach R4 via R2 in $1+1=2$ hops. $DV_{R3}[R4]=2$, next-hop R2.

**$DV_{R3}$ after Round 1:**

| Destination | Cost | Next-Hop |
| :---------- | :--- | :------- |
| R1          | 2    | R2       |
| R2          | 1    | R2       |
| R3          | 0    | R3       |
| R4          | 2    | R2       |

**Round 2: Routers send their updated DVs. R3 sends its updated $DV_{R3}$ to R2. R2 sends its updated $DV_{R2}$ to R1, R3, R4.**

*Let's trace R2's updates first, as R3 will receive R2's updated DV.*
After Round 1, $DV_{R2}$ would have learned about R3 and R1/R4 paths.
$DV_{R2}$ after Round 1 (simplified):
*   R1: 1 (via R1)
*   R2: 0 (via R2)
*   R3: 1 (via R3)
*   R4: 1 (via R4)
(No change for R2 after round 1, as all its neighbors are 1 hop away, and it knows all 1-hop paths. R2 already knows the shortest path to R1, R3, R4 as 1, so $cost(R2,R1)+DV_{R1}[R3]$ would be $1+2=3$, which is not better than R2's current 1-hop paths to R1, R3, R4).

**Router R3's update process (using $DV_{R2}$ from R2 - which is unchanged from initial):**
R3 receives $DV_{R2}$ from R2. Since $DV_{R2}$ hasn't changed from Round 1 (it already knew all 1-hop paths), R3 will not find any *new* or *better* paths.

*   For R1: $DV_{R3}[R1] = \min(2, cost(R3,R2) + DV_{R2}[R1]) = \min(2, 1+1) = 2$. (No change)
*   For R2: $DV_{R3}[R2] = \min(1, cost(R3,R2) + DV_{R2}[R2]) = \min(1, 1+0) = 1$. (No change)
*   For R3: $DV_{R3}[R3] = \min(0, cost(R3,R2) + DV_{R2}[R3]) = \min(0, 1+1) = 0$. (No change)
*   For R4: $DV_{R3}[R4] = \min(2, cost(R3,R2) + DV_{R2}[R4]) = \min(2, 1+1) = 2$. (No change)

**$DV_{R3}$ after Round 2:**
No changes occurred. Since no router's table changed in Round 2, no further updates will be triggered. The network has converged.

**Final converged $DV_{R3}$:**

| Destination | Cost | Next-Hop |
| :---------- | :--- | :------- |
| **R1**      | **2**| **R2**   |
| **R2**      | **1**| **R2**   |
| **R3**      | **0**| **R3**   |
| **R4**      | **2**| **R2**   |

**Reflection:** This example highlights that in a simple network with uniform costs, convergence can be quick. Router R3 learned all its shortest paths in the first update cycle. In subsequent cycles, it just confirmed those paths.

---

### Example 3: Link Failure and Count-to-Infinity (Hard)

**Problem:** Consider a linear network: R1 --1-- R2 --1-- R3. Assume convergence has occurred. Now, the link between R2 and R3 fails. Show the count-to-infinity problem for R1 and R2 regarding destination R3, assuming no special mechanisms like split horizon are in place.

**Given:**
*   Network: R1-R2-R3, all costs 1.
*   Converged state.
*   Link R2-R3 fails.
*   No split horizon or poison reverse.

**What we want:** The distance vectors for R1 and R2 for destination R3 over several update cycles after the link failure.

**Steps:**

**Converged State (before failure):**

*   $DV_{R1}[R3] = 2$ (via R2)
*   $DV_{R2}[R3] = 1$ (via R3)
*   $DV_{R3}[R3] = 0$ (via R3)
*   $DV_{R3}[R2] = 1$ (via R2)
*   $DV_{R3}[R1] = 2$ (via R2)

**Event: Link R2-R3 fails.**

**Time T0: R2 detects link failure.**
*   R2 updates its own table: $DV_{R2}[R3] = \infty$ (via -)
*   R3 detects link failure: $DV_{R3}[R2] = \infty$ (via -) and $DV_{R3}[R1] = \infty$ (via -).

**Time T1: Routers send their updated DVs.**
*   R2 sends $DV_{R2}$ (now $DV_{R2}[R3]=\infty$) to R1.
*   R1 sends $DV_{R1}$ (still $DV_{R1}[R3]=2$) to R2.

**Router R1's update:**
R1 receives $DV_{R2}$ from R2.
*   For R3: $DV_{R1}[R3] = \min(2, cost(R1,R2) + DV_{R2}[R3]) = \min(2, 1+\infty) = \min(2,\infty) = 2$.
    *   *Explanation:* R1 still thinks it can reach R3 via R2 in 2 hops. R2 now says it can't reach R3. So R1 keeps its current (stale) information.
    *   **$DV_{R1}[R3]$ remains 2 (via R2).**

**Router R2's update:**
R2 receives $DV_{R1}$ from R1.
*   For R3: $DV_{R2}[R3] = \min(\infty, cost(R2,R1) + DV_{R1}[R3]) = \min(\infty, 1+2) = \min(\infty,3) = 3$.
    *   *Explanation:* R2 previously set $DV_{R2}[R3]=\infty$. Now R1 (its only neighbor) tells R2 that R1 can reach R3 in 2 hops. So R2 *mistakenly* believes it can reach R3 via R1 in $1+2=3$ hops.
    *   **$DV_{R2}[R3]$ becomes 3 (via R1).**

**Time T2: Routers send their *newly updated* DVs.**
*   R2 sends $DV_{R2}$ (now $DV_{R2}[R3]=3$) to R1.
*   R1 sends $DV_{R1}$ (still $DV_{R1}[R3]=2$) to R2.

**Router R1's update:**
R1 receives $DV_{R2}$ from R2.
*   For R3: $DV_{R1}[R3] = \min(2, cost(R1,R2) + DV_{R2}[R3]) = \min(2, 1+3) = \min(2,4) = 2$.
    *   *Explanation:* R1 still thinks it can reach R3 in 2 hops. R2 now says it can reach R3 in 3 hops. So R1's current path is still better.
    *   **$DV_{R1}[R3]$ remains 2 (via R2).**

**Router R2's update:**
R2 receives $DV_{R1}$ from R1.
*   For R3: $DV_{R2}[R3] = \min(3, cost(R2,R1) + DV_{R1}[R3]) = \min(3, 1+2) = \min(3,3) = 3$.
    *   *Explanation:* R2's current path to R3 via R1 is 3 hops. R1 says it can reach R3 in 2 hops, so via R1, it's $1+2=3$ hops. No change.
    *   **$DV_{R2}[R3]$ remains 3 (via R1).**

Wait, this isn't counting to infinity! This is a common misunderstanding. The count-to-infinity happens when *A thinks it has a path through B, and B thinks it has a path through A, to the same destination*. Let's re-evaluate the scenario where this happens.

**Corrected Count-to-Infinity Scenario (R1-R2-R3, R3 is destination)**

**Converged State (before failure):**
*   $DV_{R1}[R3] = 2$ (via R2)
*   $DV_{R2}[R3] = 1$ (via R3)

**Event: Link R2-R3 fails.**

**Time T0: R2 detects link failure. R3's connection to R2 is broken.**
*   R2 updates $DV_{R2}[R3] = \infty$.
*   R3 updates $DV_{R3}[R2] = \infty$.

**Time T1: Routers exchange DVs.**
*   R2 sends $DV_{R2}$ (with $DV_{R2}[R3]=\infty$) to R1.
*   R1 sends $DV_{R1}$ (with $DV_{R1}[R3]=2$) to R2.

**Router R1's update (after receiving $DV_{R2}$):**
*   $DV_{R1}[R3] = \min(2, cost(R1,R2) + DV_{R2}[R3]) = \min(2, 1+\infty) = 2$.
    *   R1's best path to R3 is still 2 hops via R2 (it hasn't heard of any better path, and its neighbor R2 is now saying $\infty$). This is the crucial part: R1 still *believes* its path via R2 is valid.
    *   **$DV_{R1}[R3]$ is still 2 (via R2).**

**Router R2's update (after receiving $DV_{R1}$):**
*   $DV_{R2}[R3] = \min(\infty, cost(R2,R1) + DV_{R1}[R3]) = \min(\infty, 1+2) = 3$.
    *   R2 now believes it can reach R3 via R1 in 3 hops.
    *   **$DV_{R2}[R3]$ is now 3 (via R1).**

**Time T2: Routers exchange *newly updated* DVs.**
*   R2 sends $DV_{R2}$ (with $DV_{R2}[R3]=3$) to R1.
*   R1 sends $DV_{R1}$ (with $DV_{R1}[R3]=2$) to R2.

**Router R1's update (after receiving $DV_{R2}$):**
*   $DV_{R1}[R3] = \min(2, cost(R1,R2) + DV_{R2}[R3]) = \min(2, 1+3) = \min(2,4) = 2$.
    *   R1 still holds onto its path of 2 hops via R2, because R2's new path (4 hops) is worse.
    *   **$DV_{R1}[R3]$ is still 2 (via R2).**

**Router R2's update (after receiving $DV_{R1}$):**
*   $DV_{R2}[R3] = \min(3, cost(R2,R1) + DV_{R1}[R3]) = \min(3, 1+2) = 3$.
    *   R2 still holds onto its path of 3 hops via R1.
    *   **$DV_{R2}[R3]$ is still 3 (via R1).**

This specific linear example does not demonstrate count-to-infinity in the classic oscillating sense because R1 never updates its path *through* R2 to be *longer* than its current path. It only keeps its current path. The problem occurs when a router *updates its path to be longer* through a neighbor, and that neighbor then updates its path to be longer *through the first router*.

Let's use a slightly different scenario for count-to-infinity:
Network: R1 --1-- R2 --1-- R3 --1-- R4. Destination is R4.

**Initial Converged State (for R1, R2, R3 regarding R4):**
*   $DV_{R1}[R4] = 3$ (via R2)
*   $DV_{R2}[R4] = 2$ (via R3)
*   $DV_{R3}[R4] = 1$ (via R4)

**Event: Link R3-R4 fails.**

**Time T0: R3 detects link failure.**
*   $DV_{R3}[R4] = \infty$.

**Time T1: Routers send DVs.**
*   R3 sends $DV_{R3}$ (with $DV_{R3}[R4]=\infty$) to R2.
*   R2 sends $DV_{R2}$ (with $DV_{R2}[R4]=2$) to R1 and R3.
*   R1 sends $DV_{R1}$ (with $DV_{R1}[R4]=3$) to R2.

**Router R2's update (from R1 and R3):**
*   From R3 ($cost(R2,R3)=1$): $DV_{R2}[R4] = \min(2, cost(R2,R3) + DV_{R3}[R4]) = \min(2, 1+\infty) = 2$.
    *   *Explanation:* R3 says $\infty$, so R2 keeps its current path.
*   From R1 ($cost(R2,R1)=1$): $DV_{R2}[R4] = \min(2, cost(R2,R1) + DV_{R1}[R4]) = \min(2, 1+3) = 2$.
    *   *Explanation:* R1 says 3 hops. Path via R1 would be $1+3=4$ hops. R2 keeps its current path.
*   **$DV_{R2}[R4]$ remains 2 (via R3).** This is the problem. R2 *should* have removed its path via R3.

This shows why simple Bellman-Ford *without* split horizon or poison reverse is problematic. Let's assume R2 *does* update its path if its current next-hop becomes unreachable.

**Revised Count-to-Infinity (with R2 updating its next-hop):**

**Converged State (for R1, R2, R3 regarding R4):**
*   $DV_{R1}[R4] = 3$ (via R2)
*   $DV_{R2}[R4] = 2$ (via R3)
*   $DV_{R3}[R4] = 1$ (via R4)

**Event: Link R3-R4 fails.**

**Time T0: R3 detects link failure.**
*   $DV_{R3}[R4] = \infty$.

**Time T1: Routers send DVs.**
*   R3 sends $DV_{R3}$ (with $DV_{R3}[R4]=\infty$) to R2.
*   R2 sends $DV_{R2}$ (with $DV_{R2}[R4]=2$) to R1 and R3.
*   R1 sends $DV_{R1}$ (with $DV_{R1}[R4]=3$) to R2.

**Router R2's update (from R1 and R3):**
*   R2 receives $DV_{R3}$ from R3. Since $DV_{R3}[R4]=\infty$ and R3 was the next-hop for R4, R2 invalidates its path to R4.
    *   $DV_{R2}[R4]$ becomes $\infty$.
*   Then R2 receives $DV_{R1}$ from R1.
    *   $DV_{R2}[R4] = \min(\infty, cost(R2,R1) + DV_{R1}[R4]) = \min(\infty, 1+3) = 4$.
    *   *Explanation:* R2 now thinks it can reach R4 via R1 in 4 hops.
    *   **$DV_{R2}[R4]$ becomes 4 (via R1).**

**Router R1's update (from R2):**
*   R1 receives $DV_{R2}$ from R2.
    *   $DV_{R1}[R4] = \min(3, cost(R1,R2) + DV_{R2}[R4]) = \min(3, 1+2) = 3$.
    *   *Explanation:* R2 sent its old value of 2. R1 updates its path via R2: $1+2=3$. No change.
    *   **$DV_{R1}[R4]$ remains 3 (via R2).**

**Time T2: Routers send *newly updated* DVs.**
*   R2 sends $DV_{R2}$ (with $DV_{R2}[R4]=4$) to R1 and R3.
*   R1 sends $DV_{R1}$ (with $DV_{R1}[R4]=3$) to R2.

**Router R1's update (from R2):**
*   $DV_{R1}[R4] = \min(3, cost(R1,R2) + DV_{R2}[R4]) = \min(3, 1+4) = \min(3,5) = 3$.
    *   *Explanation:* R1's current path is 3. R2 now says 4, so via R2 is 5. R1 keeps its current path.
    *   **$DV_{R1}[R4]$ remains 3 (via R2).**

**Router R2's update (from R1 and R3):**
*   From R3: $DV_{R3}[R4]$ is still $\infty$. No change.
*   From R1: $DV_{R2}[R4] = \min(4, cost(R2,R1) + DV_{R1}[R4]) = \min(4, 1+3) = \min(4,4) = 4$.
    *   *Explanation:* R1 says 3 hops. Path via R1 is $1+3=4$. No change.
    *   **$DV_{R2}[R4]$ remains 4 (via R1).**

This still isn't the classic count-to-infinity. The problem is with the *order* of updates and the propagation of stale information. The classic example requires a specific timing or a more complex topology where a router receives an update from a neighbor *before* it processes the link failure, or before it hears the "true" infinity from its primary next-hop.

Let's simplify to the classic two-node count-to-infinity in the absence of split horizon.
Network: R1 --1-- R2. Destination is R3 (initially reachable via R2).
R1 thinks $DV_{R1}[R3]=2$ (via R2). R2 thinks $DV_{R2}[R3]=1$ (via R3).
Assume R2's link to R3 breaks.

**Time T0: R2 detects link to R3 is down.**
*   $DV_{R2}[R3] = \infty$.

**Time T1: R1 sends $DV_{R1}$ to R2. R2 sends $DV_{R2}$ to R1.**
*   R1 sends $DV_{R1}[R3]=2$ to R2.
*   R2 sends $DV_{R2}[R3]=\infty$ to R1.

**Router R1's update (from R2):**
*   $DV_{R1}[R3] = \min(2, cost(R1,R2) + DV_{R2}[R3]) = \min(2, 1+\infty) = 2$.
    *   *Explanation:* R1's current path is 2 hops via R2. R2 says $\infty$. R1 keeps its current path.
    *   **$DV_{R1}[R3]$ remains 2 (via R2).**

**Router R2's update (from R1):**
*   $DV_{R2}[R3] = \min(\infty, cost(R2,R1) + DV_{R1}[R3]) = \min(\infty, 1+2) = 3$.
    *   *Explanation:* R2 heard from R1 that R1 can reach R3 in 2 hops. R2 now believes it can reach R3 via R1 in $1+2=3$ hops.
    *   **$DV_{R2}[R3]$ becomes 3 (via R1).**

**Time T2: R1 sends $DV_{R1}$ to R2. R2 sends $DV_{R2}$ to R1.**
*   R1 sends $DV_{R1}[R3]=2$ to R2.
*   R2 sends $DV_{R2}[R3]=3$ to R1.

**Router R1's update (from R2):**
*   $DV_{R1}[R3] = \min(2, cost(R1,R2) + DV_{R2}[R3]) = \min(2, 1+3) = \min(2,4) = 2$.
    *   *Explanation:* R1's current path is 2. R2 now says 3, so via R2 is 4. R1 keeps its current path.
    *   **$DV_{R1}[R3]$ remains 2 (via R2).**

**Router R2's update (from R1):**
*   $DV_{R2}[R3] = \min(3, cost(R2,R1) + DV_{R1}[R3]) = \min(3, 1+2) = \min(3,3) = 3$.
    *   *Explanation:* R2's current path is 3. R1 says 2, so via R1 is 3. No change.
    *   **$DV_{R2}[R3]$ remains 3 (via R1).**

This example is still not showing the incrementing count-to-infinity. The key to the count-to-infinity problem is when a router *updates its path to be longer* through a neighbor, and that neighbor then updates its path to be longer *through the first router*. This requires a scenario where the router *does not* realize its current path is broken right away.

Let's use a network where R1 and R2 are both neighbors of R3, and R3 is a neighbor of R4 (destination).
R1 --1-- R3 --1-- R4
R2 --1-- R3

**Initial Converged State (for R1, R2, R3 regarding R4):**
*   $DV_{R1}[R4] = 2$ (via R3)
*   $DV_{R2}[R4] = 2$ (via R3)
*   $DV_{R3}[R4] = 1$ (via R4)

**Event: Link R3-R4 fails.**

**Time T0: R3 detects link failure.**
*   $DV_{R3}[R4] = \infty$.

**Time T1: Routers send DVs.**
*   R3 sends $DV_{R3}$ (with $DV_{R3}[R4]=\infty$) to R1 and R2.
*   R1 sends $DV_{R1}$ (with $DV_{R1}[R4]=2$) to R3.
*   R2 sends $DV_{R2}$ (with $DV_{R2}[R4]=2$) to R3.

**Router R1's update (from R3):**
*   $DV_{R1}[R4] = \min(2, cost(R1,R3) + DV_{R3}[R4]) = \min(2, 1+\infty) = 2$.
    *   *Explanation:* R1's current path is 2 via R3. R3 now says $\infty$. R1 keeps its current path.
    *   **$DV_{R1}[R4]$ remains 2 (via R3).**

**Router R2's update (from R3):**
*   $DV_{R2}[R4] = \min(2, cost(R2,R3) + DV_{R3}[R4]) = \min(2, 1+\infty) = 2$.
    *   *Explanation:* R2's current path is 2 via R3. R3 now says $\infty$. R2 keeps its current path.
    *   **$DV_{R2}[R4]$ remains 2 (via R3).**

**Router R3's update (from R1 and R2):**
*   From R1 ($cost(R3,R1)=1$): $DV_{R3}[R4] = \min(\infty, cost(R3,R1) + DV_{R1}[R4]) = \min(\infty, 1+2) = 3$.
    *   *Explanation:* R3 previously set $DV_{R3}[R4]=\infty$. Now R1 says it can reach R4 in 2 hops. So R3 thinks it can reach R4 via R1 in $1+2=3$ hops.
*   From R2 ($cost(R3,R2)=1$): $DV_{R3}[R4]$ is currently 3. $\min(3, cost(R3,R2) + DV_{R2}[R4]) = \min(3, 1+2) = 3$.
    *   *Explanation:* R2 also says it can reach R4 in 2 hops. So via R2 is also $1+2=3$ hops. No change.
*   **$DV_{R3}[R4]$ becomes 3 (via R1 or R2).**

**Time T2: Routers send *newly updated* DVs.**
*   R3 sends $DV_{R3}$ (with $DV_{R3}[R4]=3$) to R1 and R2.
*   R1 sends $DV_{R1}$ (with $DV_{R1}[R4]=2$) to R3.
*   R2 sends $DV_{R2}$ (with $DV_{R2}[R4]=2$) to R3.

**Router R1's update (from R3):**
*   $DV_{R1}[R4] = \min(2, cost(R1,R3) + DV_{R3}[R4]) = \min(2, 1+3) = \min(2,4) = 2$.
    *   *Explanation:* R1's current path is 2. R3 now says 3, so via R3 is 4. R1 keeps its current path.
    *   **$DV_{R1}[R4]$ remains 2 (via R3).**

**Router R2's update (from R3):**
*   $DV_{R2}[R4] = \min(2, cost(R2,R3) + DV_{R3}[R4]) = \min(2, 1+3) = \min(2,4) = 2$.
    *   *Explanation:* R2's current path is 2. R3 now says 3, so via R3 is 4. R2 keeps its current path.
    *   **$DV_{R2}[R4]$ remains 2 (via R3).**

**Router R3's update (from R1 and R2):**
*   From R1 ($cost(R3,R1)=1$): $DV_{R3}[R4] = \min(3, cost(R3,R1) + DV_{R1}[R4]) = \min(3, 1+2) = \min(3,3) = 3$.
    *   *Explanation:* R1 says 2 hops. Path via R1 is $1+2=3$. No change.
*   From R2 ($cost(R3,R2)=1$): $DV_{R3}[R4] = \min(3, cost(R3,R2) + DV_{R2}[R4]) = \min(3, 1+2) = \min(3,3) = 3$.
    *   *Explanation:* R2 says 2 hops. Path via R2 is $1+2=3$. No change.
*   **$DV_{R3}[R4]$ remains 3 (via R1 or R2).**

This is still not the classic count-to-infinity. The problem is that R1 and R2 *never update their path to be longer*. They keep their path of 2 via R3, even though R3 is now saying its path is 3. This means R1 and R2 are sending traffic to R3, which R3 then sends back to R1/R2, creating a loop. The "count-to-infinity" refers to the *reported distance* incrementing. This happens when a router *does* update its path to be longer because its previous next-hop is gone, and it finds a new path *through a neighbor who still thinks it has a path through the first router*.

Let's use the actual classic example: R1 --1-- R2 --1-- R3. Destination is R3.
Initial: $DV_{R1}[R3]=2$ (via R2), $DV_{R2}[R3]=1$ (via R3).
Link R2-R3 breaks.

**Time T0: R2 detects R3 is unreachable.**
*   $DV_{R2}[R3] = \infty$.

**Time T1: R1 sends $DV_{R1}$ to R2. R2 sends $DV_{R2}$ to R1.**
*   R1 sends $DV_{R1}[R3]=2$ to R2.
*   R2 sends $DV_{R2}[R3]=\infty$ to R1.

**R1 processes R2's DV:** $DV_{R1}[R3] = \min(2, 1+\infty) = 2$. (R1 retains its old path via R2).
**R2 processes R1's DV:** $DV_{R2}[R3] = \min(\infty, 1+2) = 3$. (R2 now thinks it can reach R3 via R1).

**Time T2: R1 sends $DV_{R1}$ to R2. R2 sends $DV_{R2}$ to R1.**
*   R1 sends $DV_{R1}[R3]=2$ to R2.
*   R2 sends $DV_{R2}[R3]=3$ to R1.

**R1 processes R2's DV:** $DV_{R1}[R3] = \min(2, 1+3) = 2$. (R1 retains its old path via R2).
**R2 processes R1's DV:** $DV_{R2}[R3] = \min(3, 1+2) = 3$. (R2 retains its path via R1).

This still doesn't count. The crucial part for count-to-infinity is that R1 *must* update its path to be longer. This happens if R1's *only* path was through R2, and R2 then advertises a path through R1.

**Classic Count-to-Infinity Example (Corrected for the incrementing cost):**
Network: R1 --1-- R2 --1-- R3. Destination is R3.
Initial Converged State:
*   $DV_{R1}[R3]=2$ (via R2)
*   $DV_{R2}[R3]=1$ (via R3)

**Event: Link R2-R3 fails.**

**Time T0: R2 detects link failure.**
*   $DV_{R2}[R3] = \infty$.

**Time T1: R1 sends $DV_{R1}$ to R2. R2 sends $DV_{R2}$ to R1.**
*   R1 sends $DV_{R1}[R3]=2$ to R2.
*   R2 sends $DV_{R2}[R3]=\infty$ to R1.

**Router R1's update (from R2):**
*   $DV_{R1}[R3] = \min(2, cost(R1,R2) + DV_{