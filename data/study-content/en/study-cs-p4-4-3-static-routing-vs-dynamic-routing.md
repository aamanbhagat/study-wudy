## 1. The one-sentence answer
**Static routing stores fixed, administrator-written entries in a router’s forwarding table while dynamic routing lets routers exchange topology information and recompute those entries automatically when links change.**

A forwarding table simply maps destination prefixes to outgoing interfaces and next-hop addresses. In the static case every such mapping is typed by hand and remains unchanged until another human edits it. Consequently a link failure leaves the table pointing at a black hole until someone intervenes.

Dynamic routing replaces the manual table with a distributed algorithm. Routers periodically advertise reachability or link costs; each router then runs a shortest-path or policy computation locally. The resulting entries can therefore change within seconds of a topology event.

> [!NOTE]
> The decisive difference is not speed or elegance but *who bears responsibility for correctness*: a human operator in the static world, a protocol and its convergence properties in the dynamic world.

## 2. Why this matters — concrete and current
In Google’s Jupiter data-center fabric, static routes are used only for the tiny set of “management VLANs” that must survive even when the dynamic control plane is partitioned; every production prefix is carried by BGP and ECMP.

NASA’s Deep Space Network schedules contact windows weeks ahead; static routes are pre-loaded into the ground-station routers so that no routing-protocol packets need to traverse the 20-minute light-time delay to Mars orbiters.

Cloudflare’s anycast edge relies on BGP dynamic routing to withdraw poisoned prefixes within 30 seconds of a DDoS detection; a static configuration would require manual intervention at hundreds of sites simultaneously.

Semiconductor fabs such as TSMC run real-time equipment telemetry over an OT network whose topology changes only during planned maintenance windows; static routes are deliberately chosen there to eliminate protocol-induced jitter on sub-millisecond control loops.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| IP prefix and CIDR notation | Both static and dynamic mechanisms operate on prefixes, not individual addresses |
| Forwarding vs. routing table | Distinguishes the data-plane lookup from the control-plane computation |
| Graph representation of a network | Dynamic protocols compute shortest paths or policy trees on this graph |
| Administrative distance    | Provides the tie-breaking rule when static and dynamic sources supply conflicting information |

## 4. Building the idea — from intuition to formalism

### Step 1 — The forwarding table as a map
A router’s only job at line rate is to answer “which interface should carry this packet?” The answer lives in a table that pairs destination prefixes with next hops.  
Example: the prefix 10.0.0.0/8 points out interface GigabitEthernet0/1 toward 192.168.1.2.  
Formally, a forwarding table is a partial function  
$$F: \mathcal{P} \to I \times \mathcal{N}$$  
where \(\mathcal{P}\) is the set of prefixes, \(I\) the set of local interfaces, and \(\mathcal{N}\) the set of next-hop addresses.  
> [!WARNING]  
> Treating the forwarding table as “the same thing” as a routing table hides the fact that multiple routing sources may compete to install an entry in \(F\).

### Step 2 — Static installation by hand
An administrator directly writes each triple (prefix, interface, next-hop) into the router’s configuration file; the router copies those triples into \(F\) at boot and never alters them.  
Concrete example: the command `ip route 10.0.0.0 255.0.0.0 192.168.1.2` creates one static entry.  
Formal statement: the static route set \(S\) is supplied entirely by an external oracle (the human) and \(F \leftarrow S\) at initialization.

### Step 3 — Fragility under topology change
If the link to 192.168.1.2 fails, \(F\) still contains the original mapping; packets are dropped until \(S\) is edited again. No autonomous recovery exists.

### Step 4 — Dynamic information exchange
Routers now speak a protocol \(P\) that advertises reachability or link metrics to neighbors. Each router therefore obtains a partial view \(V_i\) of the global topology graph \(G = (V,E)\).  
Example: OSPF floods link-state advertisements; every router ends up with an identical copy of \(G\).

### Step 5 — Distributed recomputation
Router \(i\) runs a deterministic algorithm \(A\) on \(V_i\) to produce a new set of routes \(R_i = A(V_i)\).  
For distance-vector protocols, \(A\) is the Bellman–Ford relaxation; for link-state it is Dijkstra’s algorithm.  
The new routes are installed into \(F\) atomically, replacing stale static or older dynamic entries.

### Step 6 — Convergence and loop freedom
After a change, the system is *converged* when every router’s \(F\) again reflects a loop-free path to each reachable prefix. Dynamic protocols must prove or at least engineer for eventual loop freedom (e.g., via feasible successors in EIGRP or sequence numbers in Babel).

### Step 7 — The textbook distinction
Static routing is an open-loop, human-oracle mechanism; dynamic routing is a closed-loop, distributed-graph-algorithm mechanism whose correctness hinges on the safety and liveness properties of protocol \(P\).

## 5. Worked examples — every step shown

**Example 1 — Single static route**  
*Given:* Router R1 has interface Gi0/0 (10.1.1.1/24) connected to R2 (10.1.1.2/24).  
*Find:* Install a static route for 172.16.0.0/16 via R2.  
Step 1: Choose the command syntax that writes the prefix, mask, and next-hop.  
*Why:* The router needs an exact (prefix, next-hop) tuple.  
Step 2: Execute `ip route 172.16.0.0 255.255.0.0 10.1.1.2`.  
*Why:* The mask length is encoded in dotted-decimal form for the IOS parser.  
Step 3: Verify with `show ip route static`; the entry appears with code “S”.  
**Final answer**  
`S 172.16.0.0/16 [1/0] via 10.1.1.2`

*Reflection:* The administrative distance 1 makes this entry preferred over any dynamic source unless overridden.

**Example 2 — Failure of static route**  
*Given:* The same topology; the cable between R1 and R2 is cut.  
*Find:* Effect on traffic to 172.16.0.0/16.  
Step 1: The interface Gi0/0 goes down; the connected route disappears.  
*Why:* Static routes do not track interface state unless “track” objects are configured.  
Step 2: The static entry remains in the configuration but is no longer installed.  
*Why:* The next-hop 10.1.1.2 is now unreachable.  
Step 3: Packets for 172.16.0.0/16 are dropped.  
**Final answer**  
Black-hole until manual removal or replacement route is added.

*Reflection:* Static routing trades simplicity for zero automatic repair.

**Example 3 — OSPF replaces static**  
*Given:* Add OSPF process 1 on both routers advertising the 172.16.0.0/16 network.  
*Find:* Which route is installed after convergence.  
Step 1: OSPF adjacency forms; LSAs are exchanged.  
*Why:* Dynamic protocol now supplies a candidate route with AD 110.  
Step 2: The static route (AD 1) is still preferred.  
*Why:* Lower administrative distance wins regardless of metric.  
Step 3: Remove the static route; OSPF entry appears with code “O”.  
**Final answer**  
`O 172.16.0.0/16 [110/20] via 10.1.1.2`

*Reflection:* Administrative distance, not protocol sophistication, decides precedence.

**Example 4 — Convergence after link failure**  
*Given:* OSPF network with three routers in a triangle; link cost 10 each.  
*Find:* Time for all routers to remove the failed link from their forwarding tables.  
Step 1: Hello timers detect the failure (default 10 s).  
*Why:* Dead interval = 4 × hello.  
Step 2: Router floods new LSA; SPF runs (sub-second on modern hardware).  
*Why:* Link-state allows immediate global recomputation.  
Step 3: New next-hop is installed; traffic shifts.  
**Final answer**  
Typical convergence 10–40 s with default timers; sub-second with fast-hello or BFD.

*Reflection:* Dynamic routing speed is governed by detection and flooding timers, not by the routing algorithm itself.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming static routes disappear when the next-hop interface goes down | Many implementations keep the entry until the next-hop is explicitly unreachable | Use “ip route … track” or floating statics with higher AD |
| Believing dynamic routing always converges faster than static failover | Static failover can be near-instant if scripted or driven by orchestration | Compare scripted static recovery time against protocol convergence time |
| Ignoring administrative distance when mixing static and dynamic | Default AD values make statics win silently | Document every static route’s AD and prefer floating statics (AD 10–200) |
| Using default timers in OSPF/EIGRP on WANs | 40-second dead interval feels like an outage | Enable BFD or sub-second hello timers |
| Forgetting that BGP is a path-vector policy protocol, not shortest-path | Students expect OSPF-like metrics | Study LOCAL_PREF, AS_PATH length, and MED separately |
| Overlapping prefixes between static and dynamic sources | Longest-prefix match hides the conflict | Audit with “show ip cef” or equivalent |
| Static default route 0.0.0.0/0 pointing to an ISP that also runs BGP | ISP withdrawal never affects the static | Prefer learned default via BGP or use conditional statics |

## 7. The textbook-precise statement
A routing system is *static* when the forwarding function \(F\) is populated exclusively by an external configuration oracle and remains invariant under changes to the underlying graph \(G\). It is *dynamic* when each router \(i\) maintains a local view \(V_i\) updated by protocol messages and installs \(F_i = A(V_i)\) where \(A\) is a deterministic routing algorithm (Bellman–Ford, Dijkstra, or policy-based decision process). Convergence occurs when the fixed point \(F_i = A(G)\) is reached at every router. See Kurose & Ross, *Computer Networking: A Top-Down Approach*, 8e, §4.5–4.6.

## 8. Visual — diagram or schematic
```text
          10.1.1.0/24          10.2.2.0/24
   R1 ───────────────── R2 ───────────────── R3
        static route          OSPF area 0
   172.16.0.0/16 ──via──► (dynamic recomputes on failure)
```
Label key: solid line = physical link; dashed arrow = static entry; dotted arrows = OSPF LSAs flooding both directions.

## 9. The memory technique

1. **The hook** — Picture a librarian who either keeps a handwritten card catalog (static) or lets visitors continuously update an electronic board (dynamic). The board changes itself; the cards do not.

2. **What to overlearn**  
   - Static routes have administrative distance 1.  
   - OSPF external routes have AD 110; EIGRP summary routes have AD 5.  
   - Convergence time is dominated by failure detection, not the shortest-path algorithm.

3. **Spaced-repetition schedule** — Review the AD table after 1 day, the convergence comparison after 3 days, a mixed static/dynamic topology after 7 days, and a full failure-injection lab after 16 and 35 days.

4. **First-principles fallback** — Re-derive by asking: “Who writes the next-hop?” If the answer is “a human at configuration time,” the route is static; if the answer is “a distributed algorithm reading neighbor messages,” the route is dynamic.

## 10. What this unlocks
Mastery of the static/dynamic distinction is the prerequisite for understanding route redistribution, policy-based routing, and software-defined networking overlays. It directly precedes study of:

- BGP route reflection and confederations  
- OSPF stub areas and not-so-stubby areas  
- Segment Routing traffic-engineering tunnels  
- Failover design using IP SLA and tracking objects  
- Intent-based networking controllers that synthesize either static or dynamic underlay configurations

## 11. Self-check — five questions, no answers
1. A router receives the same prefix via a static route (AD 1) and via OSPF (AD 110). Which entry is installed and why?

2. In a three-router triangle running OSPF with all link costs equal, one link fails. Give the sequence of events from failure detection to new forwarding tables at all three routers.

3. Write the minimal set of static routes needed to make two routers, connected by a single serial link, forward traffic for every possible IPv4 destination.

4. An engineer adds `ip route 0.0.0.0 0.0.0.0 192.168.1.1` while the same router is already learning a default route via BGP. What happens to traffic until the static route is removed?

5. Why might a network designer deliberately choose static routes inside a data-center fabric even though the same vendor’s gear supports OSPF and BGP?