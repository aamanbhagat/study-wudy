## What it is
Distance vector routing is a class of routing algorithms where each router maintains a table (a "vector") of the minimum known "distance" (a metric like hop count) to every other destination. Routers don't know the full network topology; they only know the cost to their immediate neighbors and the distance vectors they receive from those neighbors. They periodically share their tables, updating their own based on this "routing by rumor."

## Why it matters
This is one of the two fundamental approaches to routing within an autonomous system (the other being link-state). The Routing Information Protocol (RIP), a classic early internet protocol, uses it. Understanding its core mechanism (the Bellman-Ford algorithm) and its critical failure mode (the count-to-infinity problem) is essential for grasping why more modern protocols like OSPF and BGP were designed the way they were. Its principles also appear in dynamic programming problems, which are common across computer science, physics simulations, and optimization tasks.

## When to study it
You should understand basic graph theory: what nodes (routers), edges (links), and weighted edges (link costs) are. You should also be familiar with the basic layers of the network stack, specifically that routing occurs at the Network Layer (Layer 3). A grasp of dynamic programming is helpful but not strictly necessary, as we will derive the core idea from first principles.

## How to study it (step by step)
1.  **Internalize the core logic:** Read the "Key ideas" section below. Before looking at the formalism, be able to explain in plain English how a router decides to update its path to a destination based on a neighbor's advertisement.
2.  **Trace the Bellman-Ford update:** Take the worked example below and a piece of paper. Manually recreate the routing tables for each node at each time step ($t=0, 1, 2, ...$). Do not move on until your tables match the example.
3.  **Trace the failure mode:** Using the same network from the worked example, simulate a link breaking. Manually trace how the "bad news" propagates slowly, causing the count-to-infinity problem. See how the routers create a temporary loop.
4.  **Read the spec:** Skim RFC 1058, which defines RIPv1. Focus on the format of the update messages and the value chosen for "infinity" (it's 16). This connects the theory to a real-world protocol.
5.  **Implement a toy version:** In a language of your choice, create a simple simulation. Define 3-4 nodes as objects or structs, each with a distance vector. Write a loop that simulates rounds of updates where nodes exchange vectors and re-compute their own tables using the Bellman-Ford equation.

## Key ideas, with intuition
1.  **Routing by Rumor:** A router running a distance vector protocol knows very little for certain. It only knows the cost to its directly connected neighbors. For all other destinations, it relies on secondhand information—the "rumors" advertised by its neighbors. It trusts its neighbors to tell the truth about their own shortest paths.
2.  **The Update Rule (Bellman-Ford):** The entire algorithm is based on one simple, repeated calculation. For a router $u$ to find its shortest path to a destination $x$, it considers each of its neighbors $v$. The cost of going through neighbor $v$ is the cost to get to $v$, $c(u,v)$, plus the cost that $v$ claims it takes to get to $x$, $D_v(x)$. Router $u$ does this for all its neighbors and takes the minimum.

    $$D_u(x) = \min_{v \in \text{neighbors}(u)} \{ c(u,v) + D_v(x) \}$$

    This is the Bellman-Ford equation applied to routing. Each router continuously re-evaluates this equation for all destinations based on the latest distance vectors received from its neighbors.

3.  **Good News Travels Fast:** When a new, shorter path becomes available (e.g., a new link comes up), the "good news" propagates quickly. In the next update cycle, the neighbor closest to the change will advertise the new low cost. In the cycle after that, its neighbors will update, and so on. The good news spreads one hop per update cycle.
4.  **Bad News Travels Slow (Count-to-Infinity):** When a link fails, the "bad news" propagates very slowly and can cause routing loops. If router A's best path to C was through B, and the link B-C fails, B will lose its path. However, A doesn't know this yet and is still advertising its path to C (via B). B might see A's advertisement and think, "A has a path to C! I'll route through A." This creates a loop (B routes to A, A routes to B). The path costs will increment upwards in each update cycle as they feed each other bad information, counting towards "infinity."

## Worked example
Consider this simple network. The link costs are all 1.

**Initial State:** The network has just been turned on. Routers only know about their direct neighbors. Let's track the distance vectors (routing tables) for each router. We are interested in the path to destination C.

**Time t=0 (Initialization)**
*   A's table: {$D_A(B)=1$, $D_A(C)=\infty$}
*   B's table: {$D_B(A)=1$, $D_B(C)=1$}
*   C's table: {$D_C(B)=1$, $D_C(C)=0$}

**Time t=1 (First Exchange)**
Routers exchange their vectors from t=0.
*   **A calculates its path to C:** A can only talk to B.
    *   Cost via B: $c(A,B) + D_B(C) = 1 + 1 = 2$.
    *   A's new table: {$D_A(B)=1$, $D_A(C)=2$ (via B)}.
*   **B calculates its path to C:** B already has a direct link, cost 1. It hears from A, who says $D_A(C)=\infty$. It hears from C, who says $D_C(C)=0$.
    *   Cost via A: $c(B,A) + D_A(C) = 1 + \infty = \infty$.
    *   Cost via C (direct link): $c(B,C) = 1$.
    *   B's table remains unchanged: {$D_B(A)=1$, $D_B(C)=1$ (via C)}.
*   The network is now stable (converged). A knows it can reach C in 2 hops via B. B knows it can reach C in 1 hop directly.

**Now, the link between B and C fails.**

**Time t=2 (Link B-C Fails)**
*   B detects the link failure. It sets its direct cost to C to infinity.
    *   B's table: {$D_B(A)=1$, $D_B(C)=\infty$}.
*   However, in this same update cycle, A sends its table from t=1 to B. A's table still says, "I can get to C in 2 hops."
*   **B calculates its path to C:**
    *   B sees A's advertisement: $D_A(C)=2$.
    *   B calculates a new path via A: $c(B,A) + D_A(C) = 1 + 2 = 3$.
    *   B thinks it has found a new path! B's new table: {$D_B(A)=1$, $D_B(C)=3$ (via A)}.
    *   **A routing loop has formed:** B points to A for destination C, and A points to B.

**Time t=3 (Next Exchange)**
*   B sends its new table to A. B now advertises $D_B(C)=3$.
*   **A calculates its path to C:**
    *   A's only neighbor is B. It must use B's new value.
    *   New cost via B: $c(A,B) + D_B(C) = 1 + 3 = 4$.
    *   A's new table: {$D_A(B)=1$, $D_A(C)=4$ (via B)}.

This process continues. At each step, A and B will increment their distance to C, passing the bad information back and forth ($D_A(C)=2, D_B(C)=3, D_A(C)=4, D_B(C)=5, \dots$) until the cost reaches the protocol's definition of "infinity" (e.g., 16 for RIP), at which point the route is finally declared invalid. This slow incrementing is the **count-to-infinity problem**.

*Reflection:* The algorithm works by each router making the locally optimal choice based on the information it has. In the stable state, this leads to a globally optimal solution. However, when a link fails, the local information is misleading, causing a global problem (a loop) that only resolves after many slow updates.

## Diagrams
A simple three-node network topology:

```text
      Cost=1        Cost=1
(A) <---------> (B) <---------> (C)
```

After the link between B and C fails, the network looks like this to B and C, but A doesn't know it yet:

```text
      Cost=1        Cost=inf
(A) <---------> (B) X--//---X (C)
```

The count-to-infinity problem creates a logical loop, even though the physical one is gone:

```text
      Path to C       Path to C
(A) ------------> (B) ------------> (A) ...
      <------------       <------------
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of it as **"Good news travels fast, bad news travels slow."**
    *   *Good News:* A new, fast highway opens (a link is added). Everyone hears about it and starts using it almost immediately, one town over at a time.
    *   *Bad News:* A bridge collapses (a link fails). The town next to the bridge knows immediately. But the town two-over just knows that the first town is no longer using the bridge. It doesn't know why. It might hear a rumor from another direction about a long, winding back-road that eventually leads back to the first town, and mistakenly think that's a valid new path. This confusion propagates, with everyone thinking someone else has a secret path, until they've all tried every ridiculous detour and concluded the destination is unreachable.

2.  **Must-know formula:** The Bellman-Ford update equation.
    $$D_u(x) = \min_{v \in \text{neighbors}(u)} \{ c(u,v) + D_v(x) \}$$
    You must be able to write this down from memory and explain what each term means:
    *   $D_u(x)$: My (router $u$) current best distance to destination $x$.
    *   $v$: One of my neighbors.
    *   $c(u,v)$: The cost of the direct link from me to neighbor $v$.
    *   $D_v(x)$: What neighbor $v$ is *telling me* its best distance to $x$ is.

3.  **Spaced Repetition Schedule:**
    *   Review this material in **1 day**. (Trace the worked example again from scratch).
    *   Review in **3 days**. (Explain the count-to-infinity problem to a rubber duck).
    *   Review in **7 days**. (Write down the Bellman-Ford equation and define its terms).
    *   Review in **16 days**. (Try self-check question 3).
    *   Review in **35 days**. (Re-implement the toy simulation).

4.  **First Principles Pathway:** If you forget everything, rebuild it from this question: "If I am a router, and I want to find the cheapest way to get to some destination, what information do I need?"
    *   I can only send packets to my immediate neighbors.
    *   So, my path must start by going to one of them, say neighbor $V$.
    *   The total cost will be (cost to get to $V$) + (V's cost to get to the destination).
    *   I don't know which neighbor is best, so I'll calculate this for *all* my neighbors and pick the minimum.
    *   This line of reasoning directly reconstructs the Bellman-Ford equation.

## Common mistakes
1.  **Assuming Global Knowledge:** When tracing the algorithm, students often mentally assume a router knows something it doesn't. Remember, a router only knows its direct link costs and the distance vectors its neighbors sent in the *previous* round. It has no other information.
2.  **Confusing "Infinity":** In RIP, "infinity" is not a mathematical concept. It's a specific, small integer (16). This is called a "bounded infinity" and is chosen to be larger than any possible valid path length in the network (RIP networks are limited to 15 hops). The counting doesn't go on forever, it just goes up to 16.
3.  **Synchronous Updates:** Assuming all routers update their tables at the exact same instant. In reality, updates are asynchronous. This can make loops and other problems even more complex than the simplified, round-by-round examples suggest.
4.  **Ignoring Split Horizon:** Forgetting that simple fixes exist. A common mitigation for count-to-infinity is "split horizon," a rule that says: "Don't advertise a route back to the neighbor you learned it from." In our example, once A learns the path to C from B, it would not advertise that path back to B, which would have prevented the loop from forming in the first place.

## Self-check
1.  Consider a four-node network in a line: A-B-C-D. All link costs are 1. Write down the initial distance vectors for all nodes at $t=0$. Then, calculate the distance vectors for all nodes at $t=1$ and $t=2$. At what time $t$ does the network converge?
2.  Take the stable A-B-C-D network from the previous question. The cost of the link B-C changes from 1 to 10. Trace the updates for $D_A(D)$ and $D_B(D)$ until the tables stabilize again. Does this "bad news" travel fast or slow? Why?
3.  Explain precisely why the "split horizon with poison reverse" rule (advertising a route back to its source with an infinite metric) is more robust at breaking loops quickly than simple split horizon (not advertising it at all).