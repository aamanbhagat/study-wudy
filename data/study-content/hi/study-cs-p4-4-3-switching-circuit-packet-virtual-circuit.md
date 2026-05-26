## 1. The one-sentence answer
**Switching decides how data moves across a network: circuit switching reserves a dedicated end-to-end path before transmission, packet switching breaks data into independent packets that share links dynamically, and virtual-circuit switching creates a logical path in advance while still moving packets.**

Circuit switching works like a dedicated railway track that stays reserved for your entire journey. Once the path is set, bandwidth is guaranteed but unused capacity cannot be shared. Packet switching removes the reservation step; every packet carries its own destination address and routers forward it hop by hop, allowing statistical multiplexing. Virtual-circuit switching sits between the two: a signalling phase first installs a fixed route and short labels at every switch, after which packets travel along that route in order, yet the physical links remain shared.

The key engineering trade-off is therefore between guaranteed performance and efficient link utilisation. Modern networks almost always choose packet switching, but they layer virtual-circuit mechanisms (MPLS, ATM, QUIC connection IDs) when they need traffic engineering or quality-of-service guarantees.

> [!NOTE]
> The single deepest insight is that virtual-circuit switching gives you the ordering and resource-reservation semantics of circuits while still enjoying the statistical multiplexing gains of packets; the only extra cost is the signalling phase that installs state at every switch along the path.

## 2. Why this matters — concrete and current
In 5G core networks, the User Plane Function (UPF) implements a virtual-circuit-like GTP tunnel so that each UE session receives ordered delivery and QoS treatment while the underlying Ethernet/IP fabric remains packet switched.  
SpaceX Starlink uses a hybrid model: user terminals send IP packets, yet each satellite beam forms a short-lived circuit-like forwarding entry that lasts only for the duration of a satellite pass, allowing dynamic bandwidth reservation without wasting spectrum.  
Google’s B4 wide-area network and Microsoft’s SWAN both run MPLS-based virtual circuits over a packet-switched underlay; traffic-engineering controllers install label-switched paths so that large inter-data-centre flows receive guaranteed bandwidth during peak hours.  
High-frequency trading firms lease dedicated optical circuits between exchanges when latency variance must stay below a few microseconds; any jitter introduced by packet queuing would lose them money.  
Modern data-centre fabrics (Clos topologies) rely on pure packet switching with ECMP, yet they add virtual-circuit overlays such as VXLAN or SRv6 when tenants demand isolated, ordered delivery across the same physical switches.

## 3. Mental prerequisites

| Concept              | Why you need it here                                                                 |
|----------------------|--------------------------------------------------------------------------------------|
| Store-and-forward delay | Every switching technique incurs this delay at each hop; comparing techniques requires calculating it. |
| Statistical multiplexing | The main reason packet and virtual-circuit switching outperform circuit switching on utilisation. |
| Signalling vs data plane | Virtual circuits need an explicit signalling phase before data transfer; understanding the separation is essential. |
| End-to-end vs hop-by-hop state | Circuit and virtual-circuit schemes install per-flow state; pure datagram packet switching does not. |

If any row above is unfamiliar, pause and review the corresponding section in Kurose & Ross before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Dedicated path versus shared medium
A network must move bits from source to destination across shared links. Circuit switching first reserves every link on a path so that only one flow may use each link at a time. Packet switching lets many flows interleave their bits on the same link.

Example: a 1 Mbps link between two cities. A circuit-switched voice call occupies the entire 1 Mbps for its duration. Ten packet-switched users can each send 100 kbps bursts; the link simply queues and forwards whichever packet arrives next.

Formally, if link capacity is \(C\) and a flow demands rate \(r\), circuit switching accepts the flow only when \(r \le C\) and marks the link busy; packet switching accepts the flow whenever the long-term average load stays below \(C\).

> [!WARNING]
> Treating circuit switching as “always better for voice” is wrong once silence suppression and statistical multiplexing are introduced; the reserved bandwidth is wasted during silent periods.

### Step 2 — Packetisation and store-and-forward
Data is segmented into packets of maximum size \(L\) bits. Each switch must receive the entire packet before it can begin forwarding (store-and-forward). The per-hop delay is therefore \(L/C\) plus any queuing delay.

### Step 3 — Connectionless (datagram) packet switching
No signalling occurs. Every packet carries a full destination address and is routed independently. Packets of the same flow may arrive out of order or take different paths.

### Step 4 — Virtual-circuit signalling phase
A setup message travels from source to destination, installing a forwarding entry (label, outgoing port) at every switch. The entry contains a short label instead of a full address, reducing lookup cost and guaranteeing that subsequent packets follow the identical route.

### Step 5 — Data transfer on virtual circuit
Packets now carry only the label. Each switch performs an O(1) label swap and forwards the packet on the pre-recorded port. Because the route is fixed, packets arrive in order; because the link is still shared, statistical multiplexing remains possible.

### Step 6 — Teardown and resource release
A teardown message removes the label entries. Bandwidth that was logically reserved becomes available for new circuits.

### Step 7 — Formal comparison of delay
End-to-end delay for a message of \(M\) bits using \(N\) hops of capacity \(C\):

- Circuit switching (setup cost ignored): \(M/C + N \cdot (propagation)\)
- Packet switching (datagram): \(N \cdot (L/C) + queuing + propagation\)
- Virtual circuit: same as packet switching once the circuit exists, plus one-time signalling delay.

## 5. Worked examples — har step show karo

**Example 1 — Simple circuit setup delay**  
*Given:* A path of 4 links, each 1 Mbps. Signalling message is 1000 bits.  
*Find:* Time until the circuit is ready.  
Step 1: signalling packet travels hop by hop → \(4 \times 1000/10^6 = 4\) ms.  
Step 2: no data yet; circuit is now reserved.  
**Final answer** 4 ms.  
*Reflection:* The calculation ignores propagation; adding 10 ms per link would dominate in long-haul networks.

**Example 2 — Packet switching store-and-forward**  
*Given:* 3 hops, packet size 1500 bytes = 12000 bits, each link 100 Mbps.  
*Find:* Total transmission delay before last bit reaches destination.  
Step 1: first hop \(12000/10^8 = 0.12\) ms.  
Step 2: second hop another 0.12 ms (first switch forwards only after full reception).  
Step 3: third hop 0.12 ms.  
**Final answer** 0.36 ms.  
*Reflection:* The factor of \(N\) appears because each switch waits for the entire packet; cut-through switching removes this factor but requires careful header validation.

**Example 3 — Virtual-circuit label lookup versus IP lookup**  
*Given:* 1 million flows, IPv4 table needs 20 comparisons on average, MPLS label table uses direct indexing.  
*Find:* Relative lookup cost.  
MPLS lookup cost is 1 memory access; IP lookup is ~20.  
**Final answer** MPLS is ~20× faster for forwarding-plane decisions once the circuit exists.  
*Reflection:* The speed-up is possible only because signalling already installed the label-to-port mapping.

**Example 4 — Delay comparison under load**  
*Given:* 10 flows, each generating 0.2 Mbps on a 1 Mbps link, message size 10 MB.  
Circuit switching accepts only 5 flows (each gets 0.2 Mbps dedicated). Packet/virtual-circuit switching accepts all 10; average delay per message is higher but utilisation reaches 100 %.  
**Final answer** Packet/virtual-circuit switching doubles the number of accepted flows at the cost of variable queuing delay.  
*Reflection:* The example shows why the Internet chose packet switching: admission control is not required.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming circuit switching always gives lower delay | Students forget the signalling setup time and the fact that reserved bandwidth may be idle. | Always include setup delay when the flow duration is short. |
| Treating virtual circuit as “just another name for circuit switching” | The shared physical link is overlooked. | Draw the label table; verify that two virtual circuits can share one physical port. |
| Forgetting that datagram packets can arrive out of order | Mental model stays at the transport layer (TCP). | Remember that IP itself offers no ordering guarantee; only virtual circuits or transport protocols do. |
| Confusing “packet switching” with “connectionless only” | Many students never learn that virtual circuits are also packet switched. | Use the three-way taxonomy: circuit, datagram packet, virtual-circuit packet. |
| Ignoring label-space exhaustion in virtual circuits | Label is only 20 bits in MPLS. | Check that the number of simultaneous circuits does not exceed \(2^{20}\) per link. |
| Calculating only transmission delay and omitting propagation | Propagation dominates on inter-continental paths. | Add \(distance/speed\) term for every link in every numerical example. |

## 7. The textbook-precise statement
Kurose, J. F., & Ross, K. W. (2021). *Computer Networking: A Top-Down Approach*, 8th ed., §1.3.2–1.3.3.  
A network may employ circuit switching, in which a dedicated end-to-end path is reserved for the entire duration of a session, or packet switching. Packet switching may be connectionless (datagram), where each packet is routed independently, or connection-oriented (virtual circuit), where a signalling phase first establishes a fixed route and installs per-flow state at intermediate switches. Formally, let \(P\) be the set of packets belonging to a flow. In a virtual circuit, there exists a function \(f: P \to Path\) that is constant for all packets of the flow; in a datagram network, \(f\) may map different packets to different paths.

## 8. Visual — diagram or schematic
```
Source S ----[Link1]---- Switch A ----[Link2]---- Switch B ----[Link3]---- Dest D

Circuit:   S reserves Link1+Link2+Link3 for whole call
Virtual:   Signalling installs label 17 at A (out port 2) and label 42 at B (out port 3)
Packet:    Each packet carries full IP; A and B route independently
```

## 9. The memory technique
1. **The hook** — Imagine a train station: circuit switching is a private locomotive reserved for you; packet switching is individual passengers boarding any train; virtual circuit is passengers all given the same reserved carriage number so they stay together.  
2. **What to overlearn** — (a) Circuit = dedicated path + guaranteed bandwidth; (b) Packet = statistical multiplexing + possible reordering; (c) Virtual circuit = signalling + label swapping + in-order delivery.  
3. **Spaced-repetition schedule** — Review the three definitions after 1 day, 3 days, 7 days, 16 days, and 35 days.  
4. **First-principles fallback** — If you forget the differences, redraw the signalling phase and the forwarding table; the presence or absence of the table immediately tells you which switching mode is in use.

## 10. What this unlocks
Understanding these three modes lets you reason about MPLS, ATM, optical circuit switching, 5G GTP tunnels, and software-defined traffic engineering.  
- Next topics: routing algorithms (link-state, distance-vector) that populate the forwarding tables used by all three modes.  
- Quality-of-service mechanisms (token bucket, weighted fair queuing) that become meaningful only after you know whether the network offers circuits or virtual circuits.  
- Congestion control (TCP, QUIC) that must react to queuing that exists only in packet-switched networks.

## 11. Self-check — five questions, no answers
1. A 1000 km path has four switches. Propagation speed is \(2 \times 10^8\) m/s. Calculate the one-time signalling delay for a 500-bit setup packet before a virtual circuit can carry data.  
2. Ten 100 kbps flows share a 1 Mbps link. Which switching technique can admit all ten flows without admission control?  
3. Why can packets of the same TCP connection arrive out of order in a datagram network but not on a virtual circuit?  
4. In an MPLS virtual circuit, what happens to an arriving packet whose label has no entry in the forwarding table?  
5. A student claims “circuit switching is always faster because there is no queuing.” Identify the two hidden assumptions that make the claim false for short flows.