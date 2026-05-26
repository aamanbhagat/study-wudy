## 1. The one-sentence answer
**Switching is the mechanism that forwards data units from an input link to an output link inside a network node, realized in three canonical forms—circuit switching (dedicated end-to-end path), packet switching (store-and-forward independent units), and virtual-circuit switching (connection-oriented packet forwarding with pre-established state).**

Circuit switching reserves a fixed physical path for the entire duration of a communication session, exactly as an old telephone exchange connects two callers by closing a set of relays. Packet switching dispenses with the reservation; every message is chopped into self-contained packets that each carry enough addressing information to be routed independently, allowing statistical sharing of every link. Virtual-circuit switching restores the notion of a connection by installing forwarding state at each switch in advance, yet still moves packets rather than holding wires.

The three schemes differ in the moment when resources are allocated and in the granularity at which multiplexing occurs. Circuit switching allocates at setup time and at the granularity of an entire circuit; packet switching allocates on demand and at the granularity of a single packet; virtual-circuit switching allocates at setup time yet still forwards packet by packet.

> [!NOTE]
> The decisive engineering trade-off is between *guaranteed performance* (circuit and virtual-circuit) and *efficient statistical multiplexing* (packet switching); every modern network is a deliberate compromise between these two poles.

## 2. Why this matters — concrete and current
NASA’s Deep Space Network still employs a form of circuit switching for critical telemetry links to Mars rovers; once a scheduled window opens, the ground station and spacecraft lock a fixed bit-rate channel for the entire pass, guaranteeing that no packet loss can occur during the brief visibility period.

Google’s Jupiter data-center fabric uses pure packet switching at the scale of hundreds of thousands of servers; every flow is broken into 1500-byte packets that are sprayed across thousands of parallel paths, achieving >95 % link utilization while still meeting the tail-latency targets required by distributed machine-learning training jobs.

AT&T’s legacy backbone carried voice on TDM circuits until the early 2000s; the same physical fiber plant now carries MPLS virtual circuits that emulate the old dedicated paths yet allow the operator to oversubscribe capacity for Internet traffic during off-peak hours.

High-frequency trading firms lease “virtual wires” inside financial exchanges that are realized as virtual circuits inside the exchange’s Ethernet switches; the fixed forwarding state guarantees sub-microsecond jitter between co-located matching engines.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Link and node            | Every switching decision occurs at a node that interconnects multiple point-to-point links. |
| Store-and-forward delay  | Packet and virtual-circuit switches must buffer an entire frame before forwarding; circuit switches do not. |
| Multiplexing             | The economic motivation for packet switching is the ability to share a link among many bursty flows. |
| Connection state         | Virtual-circuit switching installs per-flow forwarding entries; circuit switching installs physical cross-connections. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A switch merely chooses an output port
A switch receives a data unit on one of its input ports and must decide which output port should carry it onward.  
Concrete example: a 4-port Ethernet switch receives a frame on port 2 whose destination MAC address maps to port 3.  
Formally, the switch computes a forwarding function  
\[ f : \text{input-port} \times \text{header} \mapsto \text{output-port}. \]  
> [!WARNING]  
> Treating the switch as a simple wire instead of a port-mapping device hides the possibility of contention when two inputs simultaneously request the same output.

### Step 2 — Circuit switching pre-allocates the port mapping for the session lifetime
Before any data flow, a signaling protocol sets up a chain of fixed port mappings from source to destination; the mapping remains unchanged until teardown.  
Example: a telephone call from New York to London reserves one 64 kbps slot on every TDM trunk along the route.  
The resource reservation is expressed as a set of held circuits  
\[ C = \{(s_i, d_i, b_i)\}_{i=1}^k \]  
where \(b_i\) is the reserved bandwidth on link \(i\).

### Step 3 — Packet switching removes the reservation and forwards each packet independently
No state is installed before data arrival; each packet carries its own destination address and is forwarded as soon as the output port is free.  
Example: an IP datagram from 10.0.0.1 to 192.168.1.1 may traverse different paths on successive transmissions.  
The forwarding decision is made anew for every packet:  
\[ f(p_j) \text{ depends only on header of } p_j. \]

### Step 4 — Virtual-circuit switching installs temporary state that mimics a circuit
A signaling phase installs a short identifier (label) and an output-port mapping at each switch; subsequent packets carry only the label.  
Example: an ATM virtual circuit with VPI/VCI 0/32 follows the same sequence of ports for every cell of the flow.  
State table entry:  
\[ (\text{in-port}, \text{in-label}) \mapsto (\text{out-port}, \text{out-label}). \]

### Step 5 — The three schemes differ in the timing of resource allocation
Circuit: allocation at setup, held for duration.  
Packet: allocation at each packet arrival.  
Virtual-circuit: allocation at setup, but only logical state is held; bandwidth remains statistically shared.

### Step 6 — End-to-end behavior follows from the per-switch choice
A path composed entirely of circuit switches yields constant latency and zero loss from contention. A path of packet switches yields variable latency and possible loss. A virtual-circuit path yields constant forwarding behavior after setup yet still permits statistical multiplexing.

## 5. Worked examples — every step shown

**Example 1 — Circuit setup delay**  
*Given:* A 4-hop path; each hop requires a 50 ms signaling exchange.  
*Find:* Total time before first bit of user data can be sent.  
Step 1: Send setup message hop-by-hop.  
*Why:* Each switch must reserve its cross-connect before acknowledging.  
Step 2: Four sequential 50 ms exchanges complete.  
*Why:* No pipelining of setup across hops in basic circuit signaling.  
Step 3: User data transmission may begin.  
**50 ms × 4 = 200 ms**  
*Reflection:* The fixed cost is paid once; any subsequent data travels with zero additional setup latency.

**Example 2 — Packet transmission delay**  
*Given:* A 1500-byte packet, 100 Mbps link, store-and-forward switch.  
*Find:* Time from arrival of first bit until first bit departs the switch.  
Step 1: Receive all 1500 × 8 = 12 000 bits.  
*Why:* Store-and-forward requires the entire frame.  
Step 2: 12 000 / 100 × 10^6 = 120 µs.  
*Why:* Transmission time equals size divided by rate.  
Step 3: First bit can leave immediately after the last bit arrives.  
**120 µs**  
*Reflection:* The delay grows linearly with packet size; circuit switching has no such per-packet cost.

**Example 3 — Virtual-circuit label swap**  
*Given:* Packet arrives with label 47 on port 1; table maps (1,47) → (3,19).  
*Find:* Outgoing label and port.  
Step 1: Lookup key = (input-port, incoming-label).  
*Why:* Virtual-circuit state is indexed by the pair.  
Step 2: Replace label 47 with 19 and send on port 3.  
*Why:* Label swapping keeps the identifier local to each link.  
**Output: port 3, label 19**  
*Reflection:* The forwarding decision is O(1) table lookup after state installation.

**Example 4 — Statistical multiplexing gain**  
*Given:* 10 flows, each active 20 % of the time, each needing 1 Mbps when active; link capacity 6 Mbps.  
*Find:* Probability that instantaneous demand exceeds capacity.  
Step 1: Model each flow as Bernoulli trial with p = 0.2.  
*Why:* On/off behavior approximates independent bursts.  
Step 2: Demand = Binomial(10,0.2).  
Step 3: P(D ≥ 7) = 0.000864.  
**< 0.1 % overload probability**  
*Reflection:* Packet and virtual-circuit switching exploit the same statistical gain; circuit switching cannot.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming circuit switching is always faster | Setup latency is ignored when only steady-state delay is considered | Calculate both setup and transmission components before comparing |
| Believing packet switching never loses data | Buffer overflow under bursty load is overlooked | Remember that statistical multiplexing implies possible contention |
| Treating virtual circuits as “circuits with packets” | The word “virtual” suggests identical behavior | Keep separate the notions of *state installation time* and *per-packet forwarding* |
| Forgetting that labels are link-local | Global label assumption leads to incorrect scaling arguments | Draw the label-swap table on each hop explicitly |
| Confusing virtual-circuit signaling with routing | Both install state, yet routing computes paths while signaling only reserves them | Distinguish control-plane path computation from data-plane label installation |
| Ignoring that pure IP is connectionless packet switching | MPLS or ATM overlays are mistakenly taken as the only packet technologies | Recall that the Internet itself is the canonical packet-switched network |
| Expecting zero jitter from virtual circuits | Queuing still occurs when multiple virtual circuits share an output port | Virtual circuits guarantee *ordering and path*, not *zero queuing delay* |

## 7. The textbook-precise statement
A network node performs *switching* when it maps an incoming data unit on port \(i\) to an outgoing port \(j\) according to a forwarding function \(f\). In circuit switching, \(f\) is realized by a space-division or TDM cross-connect installed before data transfer and held for the session duration. In packet switching, \(f\) is a per-packet lookup performed independently for each datagram. In virtual-circuit switching, a signaling protocol first installs a label-to-port mapping at each node; subsequent packets are forwarded by exact label match. (Kurose & Ross, *Computer Networking: A Top-Down Approach*, 8e, §1.3 and §4.2.)

## 8. Visual — diagram or schematic
```text
Source S ----[Link1]---- Switch A ----[Link2]---- Switch B ----[Link3]---- Destination D

Circuit:     S =A=> B =D   (fixed cross-connects at A and B for whole session)
Packet:      Each packet independently chooses A→B or A→C→B (C not shown)
Virtual:     Label 47 at A maps to Link2; label 19 at B maps to Link3
             (state tables exist, packets still queued at each hop)
```

## 9. The memory technique
1. **The hook** — Picture a dedicated highway lane (circuit), a post-office that sorts every envelope separately (packet), and a reserved seat on a train whose ticket is only checked at boarding (virtual circuit).
2. **What to overlearn** — Circuit allocates at setup and holds bandwidth; packet allocates per packet; virtual circuit allocates state at setup but forwards packets.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from the single question “When is the output port chosen relative to data arrival?”

## 10. What this unlocks
Mastery of switching lets you reason about latency, loss, and utilization in any network architecture and directly informs the design of routers, SDN controllers, and congestion-control algorithms.

- Next: Routing algorithms that compute the port mappings used by switches  
- Queueing disciplines that decide how packets are scheduled once the switch has chosen the output port  
- Quality-of-service mechanisms built on top of virtual-circuit state  
- Software-defined networking, which separates the installation of forwarding state from the forwarding itself

## 11. Self-check — five questions, no answers
1. A 3-hop circuit-switched path has a 30 ms setup time per hop. How long must a 10-second file transfer last before circuit switching yields lower total delay than a single 1500-byte packet sent over packet switching on the same path?  
2. In a virtual-circuit network, two flows share an output link of capacity C. Flow A is allocated rate 0.6C at setup. If flow B suddenly sends at 0.7C, what happens to flow A’s packets?  
3. Why can packet switching achieve higher average link utilization than circuit switching when traffic is bursty?  
4. A label-swapping table entry is accidentally deleted at one switch along a virtual circuit. Describe the observable end-to-end symptom for packets that were already in flight.  
5. Give one concrete scenario in which circuit switching is still deployed today and explain why packet or virtual-circuit switching would be inferior for that use case.