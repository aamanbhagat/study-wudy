## 1. The one-sentence answer
**NAT is the mechanism that rewrites source or destination IP addresses (and often ports) in packet headers so that many private addresses can share one or more public addresses.**

A router sits between an internal network using non-routable private addresses and the public Internet. When an internal host sends a packet, the router replaces the private source address with its own public address before forwarding; on the return path it reverses the mapping using a translation table. This single change solves the IPv4 address shortage while keeping internal topology hidden.

The same rewriting principle extends in two directions: source NAT changes the originator’s address, destination NAT changes the target’s address, and port address translation further multiplexes many internal hosts onto a single public address by also rewriting transport-layer ports.

> [!NOTE]
> The decisive insight is that the Internet never sees the original private addresses; only the NAT device maintains the state that makes round-trip communication possible.

## 2. Why this matters — concrete and current
AWS and Google Cloud use SNAT and DNAT inside every VPC to let thousands of EC2 instances share a handful of elastic IPs while still exposing selected services via DNAT load balancers.  
Home and enterprise routers from Cisco, Ubiquiti, and pfSense implement PAT so that dozens of devices behind a single ISP-provided IPv4 address can all reach the Internet simultaneously.  
Kubernetes clusters rely on kube-proxy’s DNAT rules to steer traffic from a Service’s cluster IP to the current Pod IP, enabling zero-downtime rolling updates.  
Mobile carriers apply carrier-grade NAT (a large-scale form of PAT) to stretch the remaining IPv4 space for billions of phones; the same technique appears in Starlink’s user terminals.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| IPv4 addressing          | Distinguishes private ranges (RFC 1918) from public ones  |
| IP header fields         | Source and destination addresses are the fields rewritten |
| TCP/UDP port numbers     | Required for PAT to multiplex many flows on one address   |
| Routing tables           | Determine whether a packet needs translation              |
| Connection state         | NAT devices must remember mappings for return traffic     |

## 4. Building the idea — from intuition to formalism

### Step 1 — Private addresses are not globally reachable
Private address blocks defined by RFC 1918 (10/8, 172.16/12, 192.168/16) are reserved for internal use and are filtered by every ISP router.  
Example: a host at 192.168.1.10 cannot send a packet directly to 8.8.8.8 because intermediate routers discard the source address.  
Formal statement: any packet whose source address belongs to a private block is dropped by a router whose routing table contains only public prefixes.  
> [!WARNING]
> Treating private addresses as globally unique leads to black-holing or address collisions when two organizations later merge networks.

### Step 2 — A border router owns at least one public address
The NAT device is placed at the edge and possesses one or more globally routable addresses.  
Example: the router’s WAN interface holds 203.0.113.5 while its LAN interface sits on 192.168.1.1.  
Formal statement: let \( R \) be the set of public addresses assigned to the NAT router; internal hosts \( H_i \) use addresses from the private set \( P \).

### Step 3 — Source NAT rewrites the originator
On egress, the router replaces the packet’s source IP with an address from \( R \) and records the original address and port in a translation table.  
Example: packet (src=192.168.1.10:54321, dst=8.8.8.8:53) becomes (src=203.0.113.5:54321, dst=8.8.8.8:53).  
Formal statement: \( \text{SNAT}(p) = p' \) where \( p'.srcIP \in R \) and a mapping \( m: (p'.srcIP, p'.srcPort) \mapsto (p.srcIP, p.srcPort) \) is stored.

### Step 4 — Destination NAT rewrites the target
On ingress or for port-forwarding rules, the router replaces the destination IP (and optionally port) so that traffic reaches an internal server.  
Example: an external packet (src=8.8.8.8:12345, dst=203.0.113.5:80) is rewritten to (src=8.8.8.8:12345, dst=192.168.1.20:8080).  
Formal statement: \( \text{DNAT}(p) = p'' \) where \( p''.dstIP \in P \) and a reverse mapping is maintained.

### Step 5 — PAT adds port multiplexing
When only one public address is available, the router also rewrites the source port, allowing many internal hosts to share the same public IP.  
Example: two hosts using source ports 54321 and 54322 both appear as 203.0.113.5:40000 and 203.0.113.5:40001.  
Formal statement: the mapping becomes \( m: (pubIP, pubPort) \mapsto (privIP, privPort) \), with pubPort chosen from the ephemeral range.

### Step 6 — Return traffic uses the stored mapping
On the inbound path the router consults the translation table, restores the original addresses and ports, and forwards the packet.  
Example: reply (src=8.8.8.8:53, dst=203.0.113.5:40000) is rewritten back to (src=8.8.8.8:53, dst=192.168.1.10:54321).  
Formal statement: the inverse function \( m^{-1} \) must exist for every active flow; otherwise the packet is dropped.

## 5. Worked examples — every step shown

**Example 1 — Simple SNAT on egress**  
*Given:* Internal host 10.0.0.5 sends a UDP packet to 1.1.1.1:53; router public IP is 192.0.2.10.  
*Find:* Translated packet and table entry.  
Step 1: Inspect source address → 10.0.0.5 is private.  
*Why* — triggers NAT rule.  
Step 2: Allocate public source → 192.0.2.10, same port 54321.  
*Why* — conserves ports when possible.  
Step 3: Store mapping (192.0.2.10:54321) → (10.0.0.5:54321).  
*Why* — required for return path.  
**Final answer**  
Translated packet: src=192.0.2.10:54321, dst=1.1.1.1:53.  
*Reflection* — The mapping is 1-to-1 until the flow ends; no port change occurred.

**Example 2 — PAT with port collision**  
*Given:* Two hosts 10.0.0.5:54321 and 10.0.0.6:54321 both target 1.1.1.1:80; single public IP 192.0.2.10.  
*Find:* Translated packets.  
Step 1: First flow uses public port 40000.  
*Why* — first available ephemeral port.  
Step 2: Second flow uses public port 40001.  
*Why* — collision on original port forces new allocation.  
Step 3: Store two distinct entries.  
*Why* — port distinguishes the flows.  
**Final answer**  
Flow A: 192.0.2.10:40000 ↔ 10.0.0.5:54321  
Flow B: 192.0.2.10:40001 ↔ 10.0.0.6:54321  
*Reflection* — PAT scales by treating the (IP, port) tuple as the identifier.

**Example 3 — DNAT for a web server**  
*Given:* External client 203.0.113.50:54321 connects to public IP 192.0.2.10:80; internal server at 10.0.0.20:80.  
*Find:* Translated packet.  
Step 1: Match destination port 80 → apply DNAT rule.  
*Why* — static port-forward rule.  
Step 2: Rewrite destination to 10.0.0.20:80.  
*Why* — reaches the actual server.  
Step 3: Record reverse mapping for replies.  
*Why* — server’s reply must be un-translated.  
**Final answer**  
Inbound: dst=10.0.0.20:80; outbound reply: src=192.0.2.10:80.  
*Reflection* — DNAT hides the internal server’s real address from the client.

**Example 4 — Overlapping SNAT and DNAT (port forwarding plus PAT)**  
*Given:* Internal host 10.0.0.5:5000 initiates to external 1.1.1.1:80 while external clients reach the same public IP on port 8080 forwarded to 10.0.0.5:80.  
*Find:* Both directions.  
Step 1: Egress uses PAT, source port rewritten to 40000.  
*Why* — normal PAT.  
Step 2: Ingress on 8080 triggers DNAT to 10.0.0.5:80.  
*Why* — separate rule evaluated on destination tuple.  
Step 3: Table now contains two independent mappings.  
*Why* — source and destination translations are orthogonal.  
**Final answer**  
Egress: 192.0.2.10:40000 ↔ 10.0.0.5:5000  
Ingress: 192.0.2.10:8080 ↔ 10.0.0.5:80  
*Reflection* — The router evaluates SNAT on source fields and DNAT on destination fields independently.

## 6. Common traps and how to avoid them

| Trap                          | Why it happens                              | How to avoid it                              |
|-------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to allow return traffic in firewall | NAT creates state but firewall still filters | Explicitly permit established/related flows  |
| Assuming NAT provides security | Hiding addresses is a side effect, not authentication | Treat NAT as address sharing only            |
| Static port forwarding collides with dynamic PAT | Same public port used by both rules         | Reserve static ports outside the ephemeral range |
| Symmetric NAT breaking P2P    | Port changes on every destination           | Use STUN/TURN or IPv6                        |
| Tracking only IP, not ports   | Multiple flows from one host are indistinguishable | Always key the table on (IP, port)           |
| NAT table exhaustion          | Too many concurrent flows on limited ports  | Monitor table size; implement timeouts       |
| Hairpin NAT not configured    | Internal client cannot reach internal server via public IP | Enable hairpinning on the NAT device         |

## 7. The textbook-precise statement
Network Address Translation (NAT) is a method by which IP datagrams are modified in transit by a network device so that the source or destination address (and optionally transport-layer port) is rewritten. Formally, a NAT function \( N \) maps a 5-tuple \( (srcIP, srcPort, dstIP, dstPort, proto) \) to a new 5-tuple while preserving the payload checksums via appropriate adjustment. The inverse mapping must be maintained for the lifetime of the flow. See Kurose & Ross, *Computer Networking: A Top-Down Approach*, 8e, §4.4.

## 8. Visual — diagram or schematic
```text
Internal network               NAT Router                  Internet
10.0.0.5:54321 ───┐
                  │  src=10.0.0.5:54321        src=192.0.2.10:40000
                  ├──► 192.0.2.10:40000 ───────► 1.1.1.1:80
10.0.0.6:54321 ───┘       (PAT table entry)       (public server)

Return path:
1.1.1.1:80 ────────► 192.0.2.10:40000 ───► 10.0.0.5:54321
                    (lookup & rewrite)
```
The diagram shows two internal hosts sharing one public IP via distinct translated ports; the router’s table is the only place the original addresses are remembered.

## 9. The memory technique
1. **The hook** — Picture a hotel receptionist who gives every guest the same phone number but a different extension; the receptionist’s log is the NAT table.  
2. **What to overlearn** — Private ranges (10/8, 172.16/12, 192.168/16); the fact that PAT keys on (public IP, public port).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the single public address constraint: if only one routable address exists, both address and port must be rewritten and recorded.

## 10. What this unlocks
NAT is the foundation for understanding modern edge security, cloud networking, and IPv6 transition mechanisms.  
- Stateful firewalls and connection tracking  
- VPN NAT traversal (IPsec, WireGuard)  
- Kubernetes Service and Ingress controllers  
- Carrier-grade NAT and IPv6 prefix translation (NPTv6)  
- Load-balancer health-check and direct-server-return designs

## 11. Self-check — five questions, no answers
1. Why can two hosts behind the same PAT router use the identical source port number when talking to different external servers?  
2. A packet arrives with destination port 80 on the public interface; no DNAT rule exists. What happens?  
3. Explain the difference in table size between pure SNAT and PAT for 500 internal hosts each opening 10 connections.  
4. An internal client tries to reach an internal server using the server’s public IP. The connection fails. Name the missing NAT feature.  
5. Given a symmetric NAT, construct a scenario in which two peers behind separate NATs cannot establish direct UDP communication without a relay.