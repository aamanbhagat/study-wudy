## 1. The one-sentence answer
**NAT traversal, VPNs, and tunneling together solve the problem of establishing private, direct communication across address-translating middleboxes and untrusted public networks by encapsulating packets, authenticating endpoints, and dynamically discovering reachable paths.**

NAT devices rewrite IP addresses and ports, breaking the assumption that every host has a globally unique, directly reachable address. Tunneling restores an end-to-end path by wrapping an inner packet inside an outer packet whose headers the intermediate network understands. VPNs add encryption, integrity protection, and access control to that tunnel so the resulting virtual link behaves like a private network. NAT traversal techniques then discover, or synthesize, the mapping rules that the NATs have created so that two peers behind separate NATs can send packets directly to each other without a relay.

The result is that applications such as remote office access, peer-to-peer voice, and site-to-site connectivity continue to work even though the public Internet no longer provides globally routable addresses to every device.

> [!NOTE]
> The decisive insight is that a NAT mapping is not a firewall rule; it is a temporary, address-dependent state that can be created from the inside and later exploited from the outside if the mapping is known.

## 2. Why this matters — concrete and current
Tailscale and Headscale use WireGuard tunnels combined with STUN-based NAT traversal so that laptops behind carrier-grade NAT can form a full-mesh overlay without any central relay after the initial handshake; this design powers remote work at companies such as Linear and Coda.

AWS Client VPN and Azure Virtual WAN rely on IPsec tunnels terminated at virtual gateways; the gateways must implement NAT traversal (UDP encapsulation of ESP) because the customer’s on-premises device is almost always behind a NAT.

WebRTC, used by Zoom, Google Meet, and Discord, runs the ICE algorithm (which orchestrates STUN and TURN) so that two browsers can exchange media directly; without it, every call would traverse a TURN server and incur both latency and cost.

SpaceX Starlink terminals sit behind CGNAT operated by the satellite constellation; Starlink’s own VPN offering therefore performs NAT traversal on the user terminal so that the customer can reach services running on the local LAN from the public Internet.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| IPv4 address exhaustion and CIDR | Explains why NAT was introduced and why most endpoints today lack globally routable addresses. |
| UDP and TCP port semantics | NAT devices create mappings keyed on transport ports; traversal algorithms must predict or observe those ports. |
| Packet encapsulation     | The mechanical basis of every tunnel; you must be able to trace which header is examined at each hop. |
| Cryptographic primitives (symmetric encryption, HMAC, Diffie–Hellman) | Required to understand how VPNs turn an untrusted tunnel into a confidential channel. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A NAT mapping is a 5-tuple state entry
A NAT device rewrites the source IP and port of an outbound packet and records the mapping so that the reply can be demultiplexed.  
Concrete example: host 192.168.1.10:54321 sends UDP to 8.8.8.8:53; the NAT records (192.168.1.10,54321,8.8.8.8,53,publicIP,60000).  
Formally, the mapping is a function  
$$M: (srcIP,srcPort,dstIP,dstPort,proto) \mapsto (publicIP,publicPort).$$  
> [!WARNING]
> Treating the mapping as permanent or protocol-independent will cause subsequent inbound packets to be dropped.

### Step 2 — Tunneling adds an outer header that the network can route
An inner packet is placed inside the payload of an outer packet whose source and destination addresses belong to the tunnel endpoints.  
Example: an IP packet destined for 10.0.0.5 is wrapped inside a UDP packet whose outer destination is the public address of the remote VPN gateway.  
The encapsulation relation is  
$$P_{outer} = \text{UDP}(src=GW_1,dst=GW_2) \Vert P_{inner}.$$  
> [!WARNING]
> Forgetting to update the inner packet’s TTL or checksums produces black holes or corrupted data.

### Step 3 — A VPN adds cryptographic protection to the tunnel
After encapsulation, the payload (or the entire inner packet) is encrypted and authenticated.  
Typical construction (ESP in tunnel mode):  
$$ESP = E_K(P_{inner} \Vert ICV) \Vert ICV,$$  
where \(K\) is derived from IKE or WireGuard handshake.  
> [!WARNING]
> Using the same key for both directions or omitting replay protection allows trivial injection attacks.

### Step 4 — STUN discovers the public mapping created by a NAT
A host sends a STUN Binding Request to a public STUN server; the server echoes the observed source address and port.  
The returned value is exactly \(M(srcIP,srcPort,\dots)\).  
> [!WARNING]
> Assuming the mapping is independent of the destination address fails for symmetric NATs.

### Step 5 — TURN provides a relay when direct connectivity is impossible
When both endpoints are behind symmetric NATs, a TURN server allocates a public relay address and forwards packets.  
The allocation request returns a relayed transport address \(R\).  
> [!WARNING]
> Over-reliance on TURN creates a single point of failure and dramatically increases latency.

### Step 6 — ICE orders candidate pairs and selects the best path
ICE gathers host, server-reflexive, and relayed candidates, then performs connectivity checks in priority order.  
A candidate pair \((C_i,C_j)\) succeeds when a STUN Binding Request sent from one reaches the other.  
The final textbook statement is: two ICE agents conclude that a direct path exists once a check succeeds and both agents have consistent nominated pairs.

## 5. Worked examples — every step shown

**Example 1 — Simple UDP hole punch**  
*Given:* A and B behind independent cone NATs; both know each other’s public STUN addresses.  
*Find:* Can A send a UDP datagram that reaches B?  
Step 1: A sends UDP to B’s public address → NAT_A creates mapping \(M_A\).  
*Why:* Outbound packet triggers state creation.  
Step 2: B simultaneously sends UDP to A’s public address → NAT_B creates \(M_B\).  
*Why:* Simultaneous outbound packets open both mappings before replies arrive.  
Step 3: The first inbound packet from the other side now matches an existing mapping.  
**Final answer:** Direct communication succeeds.

**Example 2 — IPsec NAT-T encapsulation**  
*Given:* ESP packet must cross a NAT.  
*Find:* How is it transported?  
Step 1: Detect NAT via NAT-D payloads in IKE.  
*Why:* Hash of IP and port differs from expected.  
Step 2: Switch to UDP-encapsulated ESP (port 4500).  
*Why:* UDP header provides port for NAT mapping.  
**Final answer:** Packet format becomes UDP(4500) ∥ ESP.

**Example 3 — WireGuard handshake under NAT**  
*Given:* Two peers, each behind a NAT, no fixed public IP.  
*Find:* How do they exchange packets after the initial handshake?  
Step 1: Each peer sends a handshake initiation to a rendezvous server.  
*Why:* Creates the necessary NAT mappings.  
Step 2: Server relays the handshake response containing the observed public endpoint.  
*Why:* Endpoint is exactly the STUN-like mapping.  
Step 3: Subsequent data packets are sent directly to the learned endpoint; keepalives refresh the mapping.  
**Final answer:** After one relayed handshake, traffic flows directly.

**Example 4 — ICE candidate pair nomination**  
*Given:* Four candidate pairs with priorities 1.0, 0.9, 0.8, 0.7.  
*Find:* Which pair is ultimately used?  
Step 1: Perform connectivity checks in decreasing priority order.  
*Why:* Highest priority that succeeds is preferred.  
Step 2: First successful check (priority 0.8) is marked valid.  
*Why:* Lower checks are still attempted only for redundancy.  
Step 3: Both agents agree on the same valid pair and nominate it.  
**Final answer:** Pair of priority 0.8 carries the media stream.

*Reflection:* Each example hinges on creating or learning a NAT mapping before any inbound packet arrives; the algebraic structure is identical across UDP hole punching, IPsec NAT-T, and ICE.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming all NATs are cone NATs   | Most home routers are, but carrier-grade NATs are symmetric | Always run STUN against multiple destinations        |
| Forgetting keep-alive timers      | NAT mappings expire after 30–120 s of silence       | Send UDP keep-alives at least every 15 s             |
| Re-using the same UDP port for every peer | NAT may allocate different ports per destination | Use a fresh socket or rely on ICE’s candidate collection |
| Ignoring ESP checksum requirements after NAT-T | UDP checksum covers only the outer header           | Enable UDP checksums or use zero-checksum mode correctly |
| Hard-coding the VPN server’s public IP | Dynamic NAT or anycast breaks the assumption      | Resolve the hostname at connection time              |
| Treating TURN as a fallback only after ICE fails | ICE already includes relayed candidates           | Include TURN candidates from the first gathering phase |
| Omitting replay protection in custom tunnels | Sequence numbers are the only defense against replay | Always implement a sliding-window anti-replay window |

## 7. The textbook-precise statement
A VPN tunnel is a pair of encapsulation and decapsulation functions together with a security association that provides confidentiality, integrity, and replay protection. NAT traversal succeeds when an ICE agent nominates a candidate pair \((C_i,C_j)\) for which a STUN Binding Request elicits a Binding Response, confirming that the mapping \(M\) created by each intervening NAT permits inbound packets from the remote candidate. (Kurose & Ross, *Computer Networking: A Top-Down Approach*, 8e, §8.7–8.8.)

## 8. Visual — diagram or schematic
```text
[Private A] 192.168.1.10 ── NAT_A ── 203.0.113.5
                                   │
                              Public Internet
                                   │
[Private B] 192.168.2.20 ── NAT_B ── 198.51.100.7

Tunnel: UDP(203.0.113.5:51820) ↔ UDP(198.51.100.7:51820)
Inner packet: 10.0.0.1 → 10.0.0.2 (WireGuard)
```

## 9. The memory technique
1. **The hook** — Picture two castles behind high walls (NATs); each shoots a grappling hook (STUN packet) over the wall to the other castle; once the rope is anchored, they can walk across (direct tunnel).
2. **What to overlearn** — UDP port 4500 for IPsec NAT-T; the three ICE candidate types (host, server-reflexive, relayed); WireGuard handshake occurs on UDP port 51820 by convention.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by asking: “What state must exist inside the NAT for an inbound packet to be forwarded?” then list the packets needed to create that state.

## 10. What this unlocks
Mastery of NAT traversal and tunneling is the foundation for every modern overlay network, from SD-WAN to peer-to-peer gaming and decentralized identity systems.

- Next: QUIC connection migration and multipath TCP, both of which must also survive NAT rebinding.
- BGP over WireGuard meshes used in large-scale anycast deployments.
- Container networking (CNI plugins) that rely on VXLAN or Geneve tunnels across NATed Kubernetes nodes.

## 11. Self-check — five questions, no answers
1. Why does a symmetric NAT defeat simple UDP hole punching but not TURN?
2. In the ESP-in-UDP encapsulation used by NAT-T, which header’s checksum covers the inner IP packet?
3. An ICE agent has gathered three server-reflexive candidates. Which one is most likely to succeed against a symmetric NAT on the remote side?
4. A WireGuard peer stops receiving keep-alives. Thirty seconds later its NAT mapping expires. What observable symptom appears first at the other peer?
5. Construct the exact byte layout (including outer UDP header) of the first packet a host behind NAT sends during a STUN binding request to a server at 8.8.8.8:3478.