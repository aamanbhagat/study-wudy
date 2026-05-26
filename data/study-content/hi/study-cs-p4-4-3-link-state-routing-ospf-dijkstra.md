## 1. The one-sentence answer
**Link-state routing** is a distributed algorithm family in which every router floods the state of its directly connected links to the entire autonomous system, enabling each router to independently reconstruct an identical topology graph and compute shortest paths using Dijkstra’s algorithm.

Aapko samajhna hoga ki har router apne neighbours ke saath link cost (bandwidth ya delay) share karta hai. Yeh information pure network mein flood hoti hai, isliye har router ke paas ek consistent map ban jaata hai. Us map par Dijkstra chalakar har router apne liye best paths nikaal leta hai bina kisi central authority ke.

OSPF (Open Shortest Path First) is approach ka practical implementation hai jo exactly isi principle par kaam karta hai. Router ek Link-State Advertisement (LSA) bhejte hain, database build karte hain, aur phir shortest-path tree calculate karte hain.

> [!NOTE]
> The single “aha” moment is this: instead of telling neighbours “send traffic this way,” routers simply publish raw facts about their links; the shortest-path computation is then performed locally and identically by everyone.

## 2. Why this matters — concrete and current
Google’s production backbone uses a custom link-state protocol derived from OSPF/IS-IS to recompute paths in <50 ms when an optical link fails inside a data-centre fabric.  
SpaceX Starlink ground stations run a variant of OSPF over satellite links so that user traffic can be rerouted around atmospheric fades without dropping TCP sessions.  
Juniper and Cisco’s latest silicon (PTX and NCS series) implement Dijkstra in hardware pipelines so that a 400 GbE link failure triggers sub-second convergence for millions of prefixes.  
Facebook’s Express Backbone (now Meta) published a 2021 NSDI paper showing how they extended OSPF’s link-state database with optical-layer metrics, reducing tail latency by 30 % for ML training traffic.  
Modern 5G core networks (Ericsson and Nokia) rely on OSPFv3 link-state flooding inside each slice so that user-plane functions can instantly discover low-latency paths between edge clouds.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Graph \(G=(V,E)\) with non-negative weights | OSPF topology is modelled exactly as a weighted graph     |
| Shortest-path tree       | Dijkstra produces the tree that OSPF installs in the FIB  |
| Flooding and sequence numbers | Prevents stale LSAs from circulating forever              |
| Priority queue (binary heap) | Efficient implementation of Dijkstra’s relaxation step    |

If any row above is unfamiliar, pause and revise that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Each router only knows its own links
Aap sirf apne directly connected interfaces ke bandwidth aur status ko jaante ho. Koi bhi router pura network nahi jaanta jab tak information share na ho.

Example: Router R1 ke paas interfaces fa0/0 (cost 10) aur fa0/1 (cost 20) hain. R1 sirf itna hi jaanta hai.

Formal statement: Router \(v\) maintains a set of tuples \((v,u,c_{vu})\) for each neighbour \(u\).

> [!WARNING]
> Agar yeh local view galat ho (interface down nahi detect hua) to pura network ka shortest-path tree galat banega.

### Step 2 — Reliable flooding of LSAs
Har router apni link-state advertisement (LSA) ko neighbours ko bhejta hai; neighbours copy karke aage bhejte hain. Sequence number aur age field duplicate ya old information ko reject karte hain.

Example: R1 ka LSA sequence number 0x80000005 hai. Jab R2 ko wohi LSA sequence 0x80000004 ke saath milta hai to R2 usko discard kar deta hai.

Formal statement: Flooding guarantees that after finite time every router \(v\) possesses the identical set \(L\) of all LSAs.

> [!WARNING]
> Sequence number wrap-around ya age expiry galat ho to routing loops ban sakte hain.

### Step 3 — Building the identical topology graph
Har router apne paas maujood saare LSAs ko combine karke ek weighted graph \(G=(V,E,w)\) construct karta hai.

Example: LSAs se pata chalta hai edges (R1,R2,10), (R2,R3,5), (R1,R3,30) hain; graph ready.

Formal statement: \(G\) is identical at every router because flooding is reliable and LSAs contain the same data.

### Step 4 — Running Dijkstra from self as source
Router apne aap ko source मानकर Dijkstra chalaata hai. Har node ka shortest-path distance aur predecessor record kiya jaata hai.

Formal statement: Let \(d(v)\) be the shortest-path cost from source \(s\) to \(v\). Dijkstra maintains a set \(S\) of permanently labelled nodes and relaxes edges leaving \(S\).

### Step 5 — Installing the shortest-path tree into the FIB
Dijkstra ke baad router har destination ke liye next-hop install karta hai. OSPF metric directly OSPF cost ban jaata hai.

Formal statement: The forwarding table contains the pair \((dest, next-hop)\) for every reachable prefix derived from the SPT.

## 5. Worked examples — har step show karo

**Example 1 — Tiny three-router network**  
*Given:* Links R1–R2 cost 4, R2–R3 cost 1, R1–R3 cost 10.  
*Find:* R1’s shortest-path distances.  
Step 1: Initialise \(d(R1)=0\), others \(\infty\).  
Step 2: Relax R1’s edges → \(d(R2)=4\).  
Step 3: Extract R2; relax R2–R3 → \(d(R3)=5\).  
*Why* each relaxation updates only when a strictly smaller distance is found.  
**Final answer**  
R1: 0, R2: 4, R3: 5  

*Reflection*: Even the direct 10-cost link is ignored once a cheaper path appears; this is the core of optimality.

**Example 2 — Adding a new link**  
*Given:* Same topology plus new link R1–R4 cost 2, R4–R3 cost 2.  
*Find:* New distances from R1.  
Run Dijkstra again; R4 becomes 2, R3 becomes min(5,4)=4.  
*Why* the algorithm must be restarted from scratch after topology change in classic OSPF.  
**Final answer**  
R3 distance drops to 4 via R4.  

*Reflection*: Shows why incremental SPF (iSPF) extensions exist in modern OSPF implementations.

**Example 3 — Negative weight rejection**  
*Given:* Link R2–R5 cost –3 appears because of misconfiguration.  
*Find:* Behaviour of Dijkstra.  
Dijkstra aborts or ignores because invariant “non-negative weights” is violated.  
*Why* OSPF explicitly forbids negative costs in interface configuration.  
**Final answer**  
Router logs “negative cost detected; adjacency not formed”.  

*Reflection*: Demonstrates why Bellman-Ford is never used inside OSPF.

**Example 4 — Equal-cost multipath**  
*Given:* Two paths of cost 10 from R1 to R6.  
*Find:* OSPF installs both next-hops.  
Dijkstra records multiple predecessors when distances are equal.  
*Why* load-balancing works without extra protocol machinery.  
**Final answer**  
FIB contains two entries for R6, each with distinct next-hop.  

*Reflection*: ECMP is a natural side-effect of the shortest-path tree construction.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to increase LSA sequence number after config change | Manual editing without “clear ip ospf process” | Always use “ospf refresh” or restart process |
| Running Dijkstra on every LSA arrival | Naïve implementation without hold timers    | Enable SPF throttle timers (e.g., 100 ms)    |
| Ignoring link cost of 0     | Thinking “free link” is harmless            | OSPF mandates cost ≥ 1; set reference bandwidth correctly |
| Mixing IPv4 and IPv6 costs in OSPFv3 | Separate address families share same process | Configure separate costs per address family  |
| Not flushing MaxAge LSAs    | Old router dead but LSA lingers             | Rely on age field and premature aging        |
| Assuming Dijkstra gives actual latency | OSPF cost is static, not dynamic            | Use Traffic-Engineering extensions when needed |

## 7. The textbook-precise statement
In link-state routing each node \(v\) obtains an identical map of the network topology by reliable flooding of LSAs. The map is an undirected weighted graph \(G=(V,E,w)\) where \(w(e)>0\) for every edge \(e\). Every node then executes Dijkstra’s algorithm with itself as source to compute the shortest-path tree. OSPF (RFC 2328) formalises this procedure for IPv4; OSPFv3 (RFC 5340) extends it to IPv6 while preserving the same graph-theoretic core. (Kurose & Ross, *Computer Networking: A Top-Down Approach*, 8e, §5.2.3–5.2.5)

## 8. Visual — diagram or schematic
```text
R1 (src)
├── (cost 4) ── R2
│                └── (cost 1) ── R3
└── (cost 10) ── R3
```
R1 runs Dijkstra; the tree uses the 4+1 path (total 5) and discards the direct 10-cost edge.

## 9. The memory technique
1. **The hook** — Imagine every router shouting its own street addresses and tolls into a stadium; once everyone has heard every shout, each person draws the identical city map and finds their own shortest route home.
2. **What to overlearn** — Dijkstra’s relaxation step: if \(d(v) + w(v,u) < d(u)\) then \(d(u) \leftarrow d(v) + w(v,u)\); OSPF cost is inversely proportional to bandwidth (reference 100 Mbps).
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the shortest-path tree by starting with source distance 0 and repeatedly selecting the unsettled node with smallest tentative distance.

## 10. What this unlocks
Mastering link-state routing lets you understand MPLS-TE, IS-IS extensions, Segment Routing, and modern SDN controllers that all rely on the same global topology view.

- OSPF areas and LSA types (stub, NSSA, Type-5)
- IS-IS vs OSPF design trade-offs
- Traffic-engineering databases and RSVP-TE
- Fast reroute (LFA, remote-LFA, TI-LFA)
- Hierarchical routing and summarisation

## 11. Self-check — five questions, no answers
1. In a four-router ring with equal costs, how many LSAs are generated when one link fails?
2. Why does OSPF never install a route whose cost exceeds 2^24–1?
3. A router receives two LSAs for the same link with identical sequence numbers but different checksums; what does it do?
4. Show that Dijkstra’s algorithm produces a tree (no cycles) when all weights are positive.
5. In a network where one link cost is deliberately set to 10 000 while others are 1, which failure scenario will cause the largest convergence delay and why?