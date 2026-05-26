## 1. The one-sentence answer
**Distance-vector routing is a distributed shortest-path algorithm in which each node maintains only a vector of estimated distances to all destinations and periodically exchanges that vector with its immediate neighbors, updating its own estimates via the Bellman-Ford relaxation equation.**

A router does not need a map of the entire network. It only needs to know, for every destination, the smallest known distance and the neighbor that offers it. Every few seconds it tells its neighbors those distances; each neighbor then checks whether routing traffic through this router would produce a shorter path and, if so, revises its table. The process repeats until no router can improve its estimates.

The same relaxation rule that works in the centralized Bellman-Ford algorithm is executed asynchronously and only with local information. Because information travels hop by hop, a link failure can cause a slow “count-to-infinity” oscillation before all routers again agree on the new shortest paths.

> [!NOTE]
> The single most important insight is that every distance stored at a node is only an *estimate* that becomes correct only after enough rounds of neighbor exchanges; the algorithm never possesses a global view.

## 2. Why this matters — concrete and current
Cisco IOS and Juniper Junos still ship RIPng for IPv6 in small branch-office deployments where configuration simplicity outweighs convergence speed.  
Google’s internal software-defined WAN (B4) experimented with distance-vector ideas inside its centralized traffic-engineering controller before moving to a link-state approach; the early prototypes exposed exactly the count-to-infinity pathology on long fat pipes.  
SpaceX Starlink’s onboard routing daemons use a distance-vector variant with poisoned-reverse extensions because each satellite only maintains neighbor tables over ephemeral laser and RF links whose topology changes every few minutes.  
The Border Gateway Protocol (BGP), although path-vector rather than pure distance-vector, inherits the same distributed Bellman-Ford relaxation and therefore exhibits analogous “route-flap” and slow-convergence behaviors documented in RFC 4271 and observed daily on the global Internet.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Graph \(G=(V,E)\) with non-negative edge weights | Nodes become routers; edges become links whose costs are delays or hop counts. |
| Shortest-path definition | The quantity each router ultimately wants to compute. |
| Synchronous vs. asynchronous iteration | Explains why count-to-infinity occurs only in the distributed, asynchronous case. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Represent the network as a directed graph
Routers and links form a graph; each link has a non-negative cost.  
**Example:** three routers A–B–C with costs 1 and 3.  
Formally, let \(G=(V,E)\) with weight function \(w:E\to\mathbb{R}_{\ge0}\).  
> [!WARNING] Treating a link cost as negative will make the relaxation loop forever.

### Step 2 — Each node stores a distance vector
Node \(u\) maintains \(d_u(v)\) for every destination \(v\), initially \(\infty\) except \(d_u(u)=0\).  
**Example:** at startup A knows only itself.  
\[d_u(v)\leftarrow\begin{cases}0 & v=u\\\infty & \text{otherwise}\end{cases}\]

### Step 3 — Exchange vectors with neighbors
Every \(\tau\) seconds, \(u\) sends its entire vector to each neighbor \(n\in N(u)\).  
**Example:** A sends \(\{B:1,C:\infty\}\) to B.

### Step 4 — Apply Bellman-Ford relaxation
On receiving a vector from neighbor \(n\), node \(u\) executes  
\[d_u(v)\leftarrow\min\bigl(d_u(v),\;w(u,n)+d_n(v)\bigr)\quad\forall v.\]  
**Example:** B receives A’s vector and sets \(d_B(C)\leftarrow1+ d_A(C)\).  
> [!WARNING] Using “+” instead of “min” produces ever-growing distances.

### Step 5 — Repeat until quiescence
Because each relaxation can only decrease a distance, and distances are bounded below by zero, the vectors eventually stabilize at the true shortest-path distances when the graph is static.

### Step 6 — Link failure triggers count-to-infinity
When an edge disappears, a node may still advertise an obsolete finite distance learned from the failed direction; neighbors adopt it and advertise a larger value, producing an unbounded increase until a finite alternative appears or a maximum is enforced (RIP uses 15).

### Step 7 — Mitigations (split horizon with poisoned reverse)
A node never advertises a destination back to the neighbor it uses to reach that destination, and may explicitly advertise infinite distance. This breaks many two-node loops but not all larger loops.

## 5. Worked examples — every step shown

**Example 1 — Three-node line**  
*Given:* Topology A—1—B—3—C.  
*Find:* Distance vector at A after stabilization.  
Step 1: Initialize \(d_A(A)=0\), \(d_A(B)=\infty\), \(d_A(C)=\infty\). *Why:* only self is known.  
Step 2: A receives B’s vector \(\{A:1,B:0,C:3\}\). *Why:* neighbor exchange.  
Step 3: \(d_A(B)\leftarrow\min(\infty,1+0)=1\). *Why:* direct relaxation.  
Step 4: \(d_A(C)\leftarrow\min(\infty,1+3)=4\). *Why:* path A-B-C.  
**4**  

*Reflection:* The example is acyclic; count-to-infinity cannot appear.

**Example 2 — Bellman-Ford table iteration (centralized view)**  
*Given:* Same topology.  
*Find:* Distance estimates after each synchronous round.  
Round 0: A: (0,∞,∞) B: (∞,0,∞) C: (∞,∞,0)  
Round 1: A: (0,1,4) B: (1,0,3) C: (4,3,0)  
Round 2: unchanged.  
**Stable vectors**  

*Reflection:* Synchronous iteration converges in diameter rounds.

**Example 3 — Count-to-infinity on link failure**  
*Given:* A—1—B—1—C; link B-C fails.  
*Find:* Evolution of \(d_B(C)\).  
B previously had \(d_B(C)=1\) via C. After failure B receives A’s advertisement \(d_A(C)=2\) (via B).  
B sets \(d_B(C)\leftarrow1+2=3\).  
A later receives 3, sets \(d_A(C)=4\), and so on.  
**Sequence 1,3,5,… until RIP’s 15**  

*Reflection:* The loop between A and B has no external anchor.

**Example 4 — Split horizon prevents the loop**  
*Given:* Same failure, but B advertises \(d_B(C)=\infty\) to A.  
A never adopts B’s route; A already has no other path, so both correctly reach \(\infty\).  
**No count**  

*Reflection:* Poisoned reverse breaks the two-node feedback.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming synchronous rounds | Real routers wake at arbitrary times | Model the algorithm as asynchronous; prove convergence only under non-negative weights. |
| Forgetting \(\infty\) arithmetic | Using a finite “max” too early masks true unreachability | Keep a separate “unreachable” flag until the protocol’s defined maximum (15 for RIP). |
| Ignoring hold-down timers | Immediate acceptance of worse routes after failure | Implement RIP’s 180 s hold-down before accepting alternate paths. |
| Two-hop loops with three routers | Split horizon only protects direct neighbors | Add route poisoning or use link-state instead. |
| Metric of 0 for a working link | Cost omitted in configuration | Always assign positive cost; zero implies infinite bandwidth. |
| Counting to infinity on policy routes | Administrative distance overrides shortest path | Separate policy from the distance-vector computation. |
| Stale routes after reboot | Router restarts with empty table but neighbors still advertise old paths | Use sequence numbers or graceful restart extensions. |

## 7. The textbook-precise statement
A distance-vector routing protocol realizes the distributed Bellman-Ford algorithm: each node \(u\) maintains a map \(D_u:V\to\mathbb{R}\cup\{\infty\}\) and, upon receiving \(D_v\) from neighbor \(v\), performs the relaxation  
\[D_u(y)\leftarrow\min\bigl(D_u(y),w(u,v)+D_v(y)\bigr)\quad\forall y\in V.\]  
When the underlying graph is static and contains no negative-weight cycles, every \(D_u(y)\) converges to the true shortest-path distance \(\delta(u,y)\) (Kurose & Ross, *Computer Networking: A Top-Down Approach*, 8e, §4.5.2).

## 8. Visual — diagram or schematic
```text
          (cost 1)               (cost 3)
    A ------------------ B ------------------ C
         \                /
          \ (cost 10)    / (cost 1)
           \            /
            D -------- E
```
Label each directed edge with its weight. Routers exchange distance vectors only along the solid lines. After B–C fails, the only remaining path C–E–D–A–B yields distance 1+1+10+1=13.

## 9. The memory technique
**The hook** — Picture a row of people whispering their current “best guess” of the distance to the exit; each person only listens to immediate neighbors and revises the guess downward.  
**What to overlearn** — The relaxation equation, RIP’s hop-count limit of 15, and the fact that poisoned reverse advertises infinity.  
**Spaced-repetition schedule** — Review the relaxation equation after 1 day, a count-to-infinity trace after 3 days, the full RIP timers after 7 days, and a multi-router failure scenario after 16 and 35 days.  
**First-principles fallback** — Re-derive the fixed point of the Bellman-Ford operator: if no node can improve its distance by switching neighbors, the vector is optimal.

## 10. What this unlocks
Mastery of distance-vector routing supplies the conceptual foundation for understanding path-vector protocols (BGP), link-state flooding (OSPF, IS-IS), and modern SD-WAN controllers that still embed Bellman-Ford relaxations inside optimization loops.  
- Next: link-state routing and Dijkstra’s algorithm  
- Distributed consensus on topology (flooding)  
- Policy-based routing and route reflectors  
- Convergence analysis under churn

## 11. Self-check — five questions, no answers
1. In a four-node ring with unit costs, after a single link failure, how many synchronous rounds does pure distance-vector routing need to stabilize?  
2. Why does setting a link cost to zero break the proof that distances are non-increasing?  
3. A router receives two advertisements for destination D with distances 5 and 7; which neighbor does it choose and what value does it store?  
4. Show a three-router topology where split horizon alone still permits count-to-infinity.  
5. If RIP’s maximum hop count were removed, what would happen to a packet whose destination is unreachable?