## 1. The one-sentence answer
**Link-state routing protocols such as OSPF flood every link cost to every router so that each router independently runs Dijkstra’s algorithm on the identical topology graph to obtain shortest-path forwarding tables.**

A router using link-state routing does not exchange distance vectors with neighbors. Instead it originates a link-state advertisement describing only its own directly attached links and their costs, then reliably floods that advertisement throughout the routing domain. Every router therefore ends up with an identical map of the network expressed as a weighted undirected graph.

Once the map is complete, each router executes Dijkstra’s algorithm from itself as source. The algorithm repeatedly extracts the minimum-distance vertex from a priority queue and relaxes its outgoing edges, exactly as it would on any abstract graph. The resulting parent pointers define the shortest-path tree used for packet forwarding.

> [!NOTE]
> The decisive property is that every router computes routes from the *same* global view; this eliminates the count-to-infinity loops that plague distance-vector protocols.

## 2. Why this matters — concrete and current
Google’s Jupiter data-center fabric runs a custom link-state protocol derived from OSPF; every ToR and spine switch maintains an identical topology database and recomputes Dijkstra paths in milliseconds after any link failure, sustaining >99.99 % availability across hundreds of thousands of servers.

NASA’s Deep Space Network uses OSPF-TE extensions on the ground segment to route telemetry between antenna complexes; the protocol’s fast reconvergence after a microwave-link outage guarantees that Mars orbiter data reach the control center within the required latency bounds.

Modern 5G core networks standardized by 3GPP rely on segment routing over OSPF or IS-IS link-state databases; each user-plane function installs MPLS or SRv6 labels computed by Dijkstra, enabling per-flow traffic engineering at the scale of millions of simultaneous sessions.

Cloud-provider backbone routers (AWS, Azure, Meta) deploy OSPFv2/v3 in the control plane; the explicit topology map allows the operator to run centralized traffic-engineering optimizations that feed link weights back into the distributed Dijkstra instances.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Weighted undirected graph | The network is modeled as G = (V, E) with positive edge weights representing link costs |
| Reliable flooding        | Guarantees every router receives an identical set of LSAs |
| Priority queue           | Dijkstra’s O((V + E) log V) implementation depends on extract-min |
| Shortest-path tree       | The parent array produced by Dijkstra becomes the forwarding table |

## 4. Building the idea — from intuition to formalism

### Step 1 — Each router only describes its own links
A router originates a single link-state advertisement (LSA) listing each adjacent neighbor and the cost of the connecting link. No distance or path information is included.

Concrete example: router A attached to B (cost 4) and C (cost 2) emits one LSA: “A–B:4, A–C:2”.

Formal statement:  
$$ \text{LSA}_u = \{(v, c(u,v)) \mid (u,v) \in E\} $$

> [!WARNING]
> If a router omits a link, the global graph becomes disconnected for every node and Dijkstra will report unreachable destinations that are actually present.

### Step 2 — Flooding produces a synchronized topology database
Each LSA is reliably flooded: a router forwards a newly received LSA to all neighbors except the one from which it arrived, and acknowledgments ensure delivery. After convergence every router holds the identical set of LSAs.

Formal statement:  
$$ \forall u,v \in V,\; \text{LSDB}_u = \text{LSDB}_v = \bigcup_{w \in V} \text{LSA}_w $$

### Step 3 — The LSDB is interpreted as a weighted graph
From the collected LSAs the router constructs the adjacency matrix (or adjacency list) of G = (V, E) where edge weight w(u, v) equals the cost announced by both endpoints (bidirectional check).

### Step 4 — Dijkstra extracts the shortest-path tree
Initialize distance array d(s) = 0, d(v) = ∞ for v ≠ s and a priority queue containing all vertices keyed by d. Repeatedly extract the minimum-distance vertex u and relax every neighbor v: if d(v) > d(u) + w(u, v) then update d(v) and parent(v).

Formal statement (relaxation):  
$$ d(v) \leftarrow \min\bigl(d(v),\; d(u) + w(u,v)\bigr) $$

### Step 5 — Forwarding table is read off the parent pointers
The parent array defines the next hop for every destination; the router installs these next hops in its forwarding information base.

## 5. Worked examples — every step shown

**Example 1 — Three-router line**
- *Given:* Topology A—4—B—1—C; source A.
- *Find:* Shortest distances and next hops from A.
- Step 1: LSDB = {A:{B:4}, B:{A:4,C:1}, C:{B:1}}.
- Step 2: Initialize d(A)=0, d(B)=∞, d(C)=∞; PQ = {A:0}.
- Step 3: Extract A; relax B → d(B)=4, parent(B)=A.
- Step 4: Extract B; relax C → d(C)=5, parent(C)=B.
- Step 5: Forwarding table: B via B, C via B.

**Final answer**  
d = {A:0, B:4, C:5}, next hops = {B:B, C:B}

*Reflection:* The single relaxation through B is the only path; any missing LSA would have left C unreachable.

**Example 2 — Triangle with unequal costs**
- *Given:* A—1—B—3—C—1—A; source A.
- *Find:* Shortest path to C.
- Dijkstra extracts A, relaxes B (1) and C (1). Extract B; path B–C costs 1+3=4 > current d(C)=1, no update. Path chosen: direct A–C.

**Final answer**  
Next hop to C is C (cost 1).

*Reflection:* The algorithm never selects a longer detour once a shorter direct edge has been discovered.

**Example 3 — Four-node diamond**
- *Given:* A–2–B–3–D, A–5–C–1–D; source A.
- *Find:* Distance to D.
- After processing A, B and C are 2 and 5. Extract B, relax D to 5. Extract C, relax D to 6 (no improvement). Final d(D)=5 via B.

**Final answer**  
d(D)=5, next hop B.

*Reflection:* The priority queue guarantees the first time a node is extracted its distance is optimal.

**Example 4 — Adding a link failure**
- *Given:* Prior LSDB plus new LSA from B: “B–D: ∞”. Re-run Dijkstra from A.
- Distances recomputed: now d(D)=6 via C.

**Final answer**  
Forwarding table updated to next hop C for D.

*Reflection:* Only changed LSAs trigger reflooding and recomputation; unchanged portions of the tree remain valid.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using different link costs at each end | Manual misconfiguration                     | Enforce bidirectional cost check in LSDB     |
| Forgetting sequence numbers in LSAs | Old information circulates forever          | Always increment sequence number on refresh  |
| Running Dijkstra on incomplete LSDB | Router starts too early after reboot        | Wait for “LSDB sync” or “SPF hold timer”     |
| Treating OSPF areas as a single graph | Inter-area routes are summarized            | Maintain separate LSDBs per area             |
| Ignoring link-type specifics (point-to-point vs. broadcast) | Wrong adjacency formation                   | Match OSPF network type to underlying medium |
| Priority queue with Fibonacci heap in theory but binary heap in code | Asymptotic claims mismatch implementation   | State the concrete heap used for complexity  |
| Assuming all costs are positive     | Dijkstra fails with negative weights        | Verify administrative costs > 0              |

## 7. The textbook-precise statement
A link-state routing protocol maintains at each router u a synchronized link-state database LSDB that represents a weighted undirected graph G = (V, E, w) with w : E → ℝ⁺. After LSDB convergence, router u executes Dijkstra’s algorithm (Cormen et al., *Introduction to Algorithms*, 4e, Ch. 22) with source u to compute  
$$ d(u,v) = \min_{p \in \mathcal{P}(u,v)} \sum_{e \in p} w(e) $$  
for every v ∈ V, where \(\mathcal{P}(u,v)\) is the set of all paths from u to v. The resulting shortest-path tree is installed in the forwarding plane. OSPF (RFC 2328) realizes this architecture inside an autonomous system by flooding LSAs of type 1 (router-LSAs) and type 2 (network-LSAs).

## 8. Visual — diagram or schematic
```text
          4
   (A) ------- (B)
    | \         |
    |  \5       |1
   2|   \       |
    |    \      |
   (C)---(D)---(E)
      1     3
```
Nodes = routers; edge labels = link costs. Every router stores this identical graph after flooding and runs Dijkstra from its own node.

## 9. The memory technique
1. **The hook** — Picture every router holding a perfect paper map of the entire country; Dijkstra is the ruler you slide across the map to find the shortest route.
2. **What to overlearn** — (i) LSDB synchronization precedes any SPF run; (ii) Dijkstra extracts each vertex exactly once when costs are positive; (iii) next-hop = parent of destination in the SPT.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive Dijkstra from the “greedy choice” property: the first time a vertex is dequeued, its distance cannot be improved later because all remaining edges are non-negative.

## 10. What this unlocks
Mastery of link-state routing lets you understand how production networks achieve sub-second convergence and traffic engineering. It directly precedes study of OSPF areas and LSA types, IS-IS, segment routing, and centralized SDN controllers that also solve shortest-path problems on the same topology.

- Multi-area OSPF and ABR summarization
- Traffic-engineering extensions (OSPF-TE, RSVP-TE)
- Segment Routing over link-state IGP
- Fast reroute and loop-free alternates (LFA, rLFA)

## 11. Self-check — five questions, no answers
1. In a four-router ring with equal costs, how many LSAs does a single link failure generate before the network reconverges?
2. Why does OSPF require a designated router on a broadcast network but not on a point-to-point link?
3. A link cost is changed from 10 to 1; which routers must rerun Dijkstra?
4. Suppose an LSA with an older sequence number arrives after a newer one; what action does the receiving router take?
5. Prove that after the first extraction of destination t in Dijkstra, d(t) equals the true shortest-path distance even if the priority queue still contains other nodes.