## 1. The one-sentence answer
**Subnetting divides a single IP network into multiple smaller logical networks by borrowing host bits to create additional network bits, identified through a subnet mask.**

An IP address is 32 bits long. The subnet mask uses contiguous 1s to mark which bits belong to the network portion and 0s for the host portion. By extending the mask beyond the default class boundary, you create subnets that reduce broadcast domains and improve routing efficiency.

VLSM removes the restriction that every subnet inside an organisation must use the same mask length, letting you allocate address blocks that exactly match the number of hosts required.

> [!NOTE]
> The core insight is that every extra bit you borrow from the host portion doubles the number of subnets while halving the hosts available in each subnet; VLSM simply lets you choose different borrow amounts for different subnets.

## 2. Why this matters — concrete and current
Google’s internal Jupiter network uses VLSM to carve thousands of differently sized subnets from the same supernet so that small control-plane meshes and large data-plane clusters receive exactly the address space they need, eliminating waste that would otherwise require a second /8 block.

AWS VPCs rely on subnet masks to isolate availability-zone resources; when you create a /28 subnet for a NAT gateway and a /24 for an EKS node group inside the same VPC CIDR, you are performing VLSM on the fly.

In semiconductor fabs, ASML’s EUV lithography machines stream telemetry to on-premise collectors that must stay inside a single broadcast domain; subnetting keeps these 200-host segments separate from the 10 000-host factory floor network, guaranteeing sub-millisecond latency.

SpaceX’s Starlink ground stations allocate /26 blocks via VLSM for each phased-array antenna cluster; the same parent /19 can therefore serve both a remote Antarctic terminal needing only 50 addresses and a high-density urban gateway needing 500 addresses without renumbering.

BGP route reflectors at major IXPs such as DE-CIX use subnet masks to aggregate customer prefixes; without VLSM the global routing table would contain millions of extra entries.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Binary numbering     | Subnet masks and CIDR notation are bit-mask operations    |
| IP address classes   | Explains why default masks exist and why we must override them |
| AND / OR bitwise ops | Network address = IP AND mask; required for every calculation |

If any row above is unclear, pause and review binary arithmetic and basic IP addressing first.

## 4. Building the idea — from intuition to formalism

### Step 1 — IP address as 32-bit string
An IPv4 address is simply a 32-bit number written in dotted decimal.  
Example: 192.168.10.45 = 11000000.10101000.00001010.00101101.  
No subnet mask yet; all 32 bits are treated as one flat address space.

### Step 2 — Default classful masks
Before subnetting, the first three bits decide the default mask: Class A uses /8, B uses /16, C uses /24.  
These masks never change inside an organisation, so every network of Class C size always wastes 254–2 addresses even when only 10 hosts exist.

### Step 3 — Borrowing bits to create a mask
You extend the mask by borrowing k bits from the host portion. The new prefix length becomes original + k.  
Mathematically the mask value is  
$$M = 2^{32} - 2^{32 - (n+k)}$$  
where n is the original network bits. Each borrowed bit adds one more 1 to the left of the mask.

> [!WARNING]
> If the borrowed bits are not contiguous from the left, routers following CIDR rules will misinterpret the prefix and forwarding will break.

### Step 4 — Network and host bits after borrowing
After borrowing k bits, network bits = original + k and host bits = 32 − (original + k).  
Number of subnets possible = 2^k.  
Usable hosts per subnet = 2^{host bits} − 2 (subtract network and broadcast addresses).

### Step 5 — Finding the network address
Network address of any host = IP address bitwise AND with the subnet mask.  
$$Network = IP \land M$$  
All hosts sharing the same network address belong to the same subnet.

### Step 6 — Variable Length Subnet Masking (VLSM)
Instead of applying the same k to every subnet, you choose a different k for each subnet according to its host requirement. The only rule is that the resulting address blocks must not overlap and must be aligned on their own mask boundaries.

### Step 7 — Formal allocation constraint
Any subnet with prefix length p must start at an address that is a multiple of 2^{32-p}. This alignment guarantees that the block does not partially overlap another block of different length.

## 5. Worked examples — har step show karo

**Example 1 — Basic fixed-length subnetting**  
*Given:* 192.168.10.0/24, create at least 6 subnets.  
*Find:* New mask, number of hosts per subnet, first usable address of subnet 3.  

Borrow k = 3 bits → new mask = /27.  
2^3 = 8 subnets possible. Host bits = 5 → usable hosts = 2^5 − 2 = 30.  
Subnet 3 starts at 192.168.10.0 + 3×32 = 192.168.10.96.  
First usable = 192.168.10.97.  
**192.168.10.96/27**  
*Why:* 32 is the block size for /27; multiplying gives the correct offset.

**Example 2 — Calculating network address**  
*Given:* Host 10.5.67.131 with mask 255.255.192.0 (/18).  
*Find:* Network address.  

Convert mask to binary: 11111111.11111111.11000000.00000000.  
IP AND mask: 00001010.00000101.01000000.00000000 = 10.5.64.0.  
**10.5.64.0/18**  
*Why:* The third-octet bits 67 (01000011) are masked to 01000000 because the last two bits of the third octet belong to hosts.

**Example 3 — VLSM allocation**  
*Given:* 172.16.0.0/16. Need one subnet for 4000 hosts, one for 1000 hosts, one for 200 hosts.  
*Find:* Three non-overlapping prefixes.  

4000 hosts → /20 (2^12 − 2 = 4094). Block starts at 172.16.0.0/20.  
1000 hosts → /22 (2^10 − 2 = 1022). Next aligned block 172.16.16.0/22.  
200 hosts → /24 (2^8 − 2 = 254). Next aligned block 172.16.20.0/24.  
**172.16.0.0/20, 172.16.16.0/22, 172.16.20.0/24**  
*Why:* Each block size is the smallest power of two that satisfies the host count and maintains alignment.

**Example 4 — Overlapping-block detection**  
*Given:* Proposed subnets 192.168.1.0/25 and 192.168.1.128/26.  
*Find:* Whether they overlap.  

/25 covers 192.168.1.0–192.168.1.127.  
/26 covers 192.168.1.128–192.168.1.191.  
No overlap.  
**Valid allocation**  
*Why:* 128 is exactly the next multiple after 127, satisfying the alignment rule for both masks.

## 6. Common traps and how to avoid them

| Trap                          | Why it happens                              | How to avoid it                              |
|-------------------------------|---------------------------------------------|----------------------------------------------|
| Using non-contiguous masks    | Copying random bits instead of left-aligned 1s | Always write the mask in binary first        |
| Forgetting to subtract 2 hosts| Treating 2^h as usable count                | Always subtract network + broadcast          |
| Overlapping VLSM blocks       | Choosing start addresses arbitrarily        | Sort requirements descending and allocate from lowest available aligned address |
| Calculating block size wrong  | Using 2^k instead of 2^{32-p}               | Remember block size = 2^{host bits}          |
| Ignoring classful boundary    | Assuming default mask still applies         | Write the explicit prefix length every time  |
| Broadcast address as host     | Assigning .255 or .0 to a device            | Mark first and last address of each block as reserved |

## 7. The textbook-precise statement
A subnet is a contiguous range of IP addresses whose common prefix is defined by a subnet mask M, a 32-bit value containing a left-contiguous sequence of 1-bits of length p. The network address of an interface with address A is exactly A ∧ M. VLSM permits different values of p inside the same parent prefix provided the resulting address blocks are disjoint and each block begins at an address congruent to 0 modulo 2^{32-p}. (Kurose & Ross, *Computer Networking: A Top-Down Approach*, 8e, §4.4.2)

## 8. Visual — diagram or schematic
```
IP address:   11000000.10101000.00001010.00101101   (192.168.10.45)
Mask /27:     11111111.11111111.11111111.11100000   (255.255.255.224)
              | network (27 bits)     | host (5) |
Network addr: 11000000.10101000.00001010.00100000   (192.168.10.32)
```

## 9. The memory technique
1. **The hook** — Picture a pizza (the original network) sliced with knives of different widths; each knife width is a different subnet mask.  
2. **What to overlearn** — 2^{host bits} − 2 gives usable hosts; block size = 2^{host bits}; masks are always left-aligned.  
3. **Spaced-repetition schedule** — Review the three formulas on day 1, day 3, day 7, day 16, day 35.  
4. **First-principles fallback** — Convert both IP and mask to binary, perform the AND operation bit by bit, then count the leading 1s to recover the prefix length.

## 10. What this unlocks
Mastery of subnetting lets you design address plans for OSPF areas, configure correct wildcard masks for ACLs, and understand route summarisation.  
- Hierarchical addressing in OSPF and IS-IS  
- Route aggregation / summarisation in BGP  
- IPv6 prefix delegation and subnet planning  
- ACL and firewall rule optimisation using wildcard masks  

## 11. Self-check — five questions, no answers
1. How many usable hosts exist in 10.0.0.0/19?  
2. A /24 network is subnetted with mask 255.255.255.240; how many subnets result?  
3. Given 172.16.0.0/16, allocate via VLSM the smallest possible prefixes for 1200, 500 and 60 hosts without overlap.  
4. Why must the starting address of a /23 block be even in the third octet?  
5. Detect the mistake: an engineer proposes 192.168.5.64/26 and 192.168.5.96/27 inside the same parent /24.