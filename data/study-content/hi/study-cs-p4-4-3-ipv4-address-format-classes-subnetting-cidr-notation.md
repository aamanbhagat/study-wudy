## 1. The one-sentence answer
**IPv4 addresses are 32-bit numbers that uniquely identify devices on a network, written in dotted-decimal notation and divided into network and host portions through classful schemes or CIDR notation.**

An IPv4 address packs exactly 32 bits. These bits split into two logical parts: the network portion that routers use to forward packets toward the correct destination network, and the host portion that identifies a specific machine inside that network. When you write 192.168.1.10 you are simply grouping those 32 bits into four 8-bit decimal numbers separated by dots.

Subnetting further carves the host portion into a subnet identifier and a smaller host identifier. CIDR notation (for example /24) replaces the older class-based rules by explicitly stating how many leading bits belong to the network, giving administrators precise control over address allocation and route aggregation.

> [!NOTE]
> The single most important insight is that the “network/host” boundary is not fixed by hardware; it is a configurable administrative decision expressed either by class rules or by the CIDR prefix length, and every router on the Internet must agree on that boundary for correct forwarding.

## 2. Why this matters — concrete and current
AWS uses IPv4 subnetting inside every VPC so that EC2 instances in different availability zones receive non-overlapping address ranges while still sharing a common VPC CIDR block; route tables then enforce isolation without consuming extra public IPv4 space.

Google’s B4 software-defined WAN relies on hierarchical IPv4 subnetting and CIDR aggregation to shrink BGP tables from millions of entries to a few thousand; this keeps control-plane memory and convergence time manageable across inter-continental links.

Mobile operators such as Jio and Verizon assign IPv4 addresses to 4G/5G user equipment through CGNAT; the carrier-grade NAT boxes perform dynamic subnetting of a /10 or /11 block so that millions of phones share a few thousand public addresses while still allowing lawful intercept and billing.

In semiconductor test labs, engineers connect wafer-probe stations and ATE equipment over private IPv4 subnets so that test vectors and results move at line rate without traversing the corporate firewall; the /28 or /29 subnets guarantee deterministic latency below 100 µs.

SpaceX Starlink user terminals receive IPv4 addresses via DHCP from a /20 pool at each point-of-presence; the same prefix is advertised through BGP to the upstream transit provider, allowing rapid failover when a satellite beam hands off.

## 3. Mental prerequisites

| Concept              | Why you need it here                                                                 |
|----------------------|--------------------------------------------------------------------------------------|
| Binary representation | Every IPv4 address is a 32-bit binary string; subnet masks and CIDR prefixes are bit masks applied directly to that string. |
| Bitwise AND operation | Routers compute the network address by AND-ing the IP address with the subnet mask; this is the only arithmetic required for routing decisions. |
| Powers of two        | Subnet sizes must be powers of two; understanding 2^n immediately tells you how many hosts fit in a /28 or a /22. |

If any of these three concepts feel shaky, pause and review binary arithmetic and bitwise operations before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Representing the 32-bit address
An IPv4 address is simply a 32-bit unsigned integer. In practice we write it as four decimal octets separated by dots because 8 bits fit comfortably into the range 0–255.  
Example: the binary string 11000000.10101000.00000001.00001010 equals the dotted-decimal 192.168.1.10.  
Formal statement:  
$$IP = \sum_{i=0}^{31} b_i \cdot 2^i \quad (b_i \in \{0,1\})$$  
> [!WARNING]
> Treating the address as four independent numbers instead of one contiguous 32-bit field will break every subsequent calculation of network boundaries.

### Step 2 — Classful division (historical baseline)
Early designers fixed the network/host split by examining the first few bits. Class A uses an 8-bit network field, Class B a 16-bit field, Class C a 24-bit field.  
Example: 9.0.0.0 belongs to Class A because the leading bit is 0; its network portion is therefore the first octet.  
Formal mask values:  
Class A mask = 255.0.0.0 = 0xFF000000  
Class B mask = 255.255.0.0 = 0xFFFF0000  
Class C mask = 255.255.255.0 = 0xFFFFFF00

### Step 3 — Introducing the subnet mask
A subnet mask is another 32-bit value whose leading 1-bits mark the network portion. The mask may end on any bit position, not only at octet boundaries.  
Example: mask 255.255.255.192 = /26 means the first 26 bits identify the network.  
Formal network address:  
$$Network = IP \land Mask$$

### Step 4 — Variable-length subnetting
Once the mask length is allowed to vary, an organization can carve a large block into smaller blocks of different sizes. Each new mask length consumes a power-of-two slice of the original host space.  
Example: from 10.0.0.0/8 you can allocate 10.1.0.0/16 to one department and 10.2.1.0/24 to another; the only rule is that the prefixes must not overlap.

### Step 5 — CIDR notation and route aggregation
CIDR replaces class letters with an explicit prefix length written after a slash. Consecutive networks that share the same prefix can be advertised as a single aggregated route, shrinking global routing tables.  
Formal route advertisement: 203.0.113.0/24 tells every router “all 256 addresses whose first 24 bits match 203.0.113”.

## 5. Worked examples — har step show karo

**Example 1 — Convert dotted decimal to binary and apply a mask**  
*Given:* IP = 172.16.5.10, mask = 255.255.255.0  
*Find:* network address  
Step 1: write IP in binary → 10101100.00010000.00000101.00001010  
Step 2: write mask in binary → 11111111.11111111.11111111.00000000  
Step 3: bitwise AND → 10101100.00010000.00000101.00000000  
Step 4: convert back → 172.16.5.0  
*Why* each move: the AND operation forces every host bit (where mask = 0) to zero, leaving only the network bits.  
**172.16.5.0**

*Reflection:* the example is simple because the mask aligns on an octet boundary; the same logic works when the boundary falls inside an octet.

**Example 2 — Calculate usable hosts in a /27**  
*Given:* 192.168.10.0/27  
*Find:* number of usable host addresses  
Step 1: host bits = 32 – 27 = 5  
Step 2: total addresses = 2^5 = 32  
Step 3: subtract network and broadcast → 32 – 2 = 30  
**30 usable hosts**

*Reflection:* remembering to subtract the two reserved addresses prevents over-allocation in real networks.

**Example 3 — Subnet a /24 into four equal parts**  
*Given:* 10.0.0.0/24  
*Find:* four /26 subnets  
Step 1: increment = 2^(26-24) = 4 in the last octet  
Step 2: subnets = 10.0.0.0/26, 10.0.0.64/26, 10.0.0.128/26, 10.0.0.192/26  
**10.0.0.0/26 … 10.0.0.192/26**

*Reflection:* the block size is always a power of two; any other increment produces overlapping or wasted space.

**Example 4 — Find the broadcast address**  
*Given:* 203.0.113.64/26  
*Find:* broadcast address  
Step 1: host bits = 6 → all host bits set to 1 gives 63 decimal  
Step 2: 203.0.113.64 + 63 = 203.0.113.127  
**203.0.113.127**

*Reflection:* broadcast is the logical OR of the network address with the inverted mask; this pattern appears in DHCP and ARP.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting to subtract 2 for usable hosts | Students count 2^n instead of 2^n – 2               | Always label the all-zero and all-one addresses as reserved before stating host count |
| Treating CIDR prefix as decimal number | /24 is read as “24 hosts” instead of “24 network bits” | Read the number after the slash as “network bits”, never as a host count |
| Overlapping subnets               | Choosing block sizes that are not powers of two     | Draw the binary boundary line before allocating any subnet |
| Using classful mask on a non-classful address | Old habit of assuming /8, /16, /24 only             | Always write the explicit prefix length even when it matches a class boundary |
| Calculating broadcast without the mask | Adding 255 to the last octet regardless of prefix   | Compute host bits first, then set exactly those bits to 1 |
| Ignoring that 0.0.0.0/0 is a valid prefix | Thinking /0 is “illegal”                            | Remember that the default route is exactly 0.0.0.0/0 |

## 7. The textbook-precise statement
An IPv4 address is a 32-bit identifier assigned to a network interface. A subnet is defined by a prefix P of length L (0 ≤ L ≤ 32) together with the requirement that every address A in the subnet satisfies A ∧ ((2^32 – 1) ≪ (32 – L)) = P. The network address of the subnet is P itself; the directed broadcast address is P ∨ ((2^L – 1) ≪ (32 – L)). (Kurose & Ross, *Computer Networking: A Top-Down Approach*, 8e, §4.3.2)

## 8. Visual — diagram or schematic
```
32 bits
[ network bits (L) | host bits (32-L) ]
dotted decimal: 192 . 168 . 1 . 10
binary:         11000000.10101000.00000001.00001010
mask /24:       11111111.11111111.11111111.00000000
network addr:   11000000.10101000.00000001.00000000 → 192.168.1.0
```

## 9. The memory technique
**The hook** — picture a 32-lane highway; the first L lanes are painted with the network colour and every car must stay in those lanes until the exit ramp (the router).  
**What to overlearn** — 2^(32-L) – 2 gives usable hosts; /24 = 254 hosts; bitwise AND produces the network address.  
**Spaced-repetition schedule** — review the binary mask table after 1 day, solve two subnetting problems after 3 days, configure a /26 on a router after 7 days, explain CIDR aggregation to someone else after 16 days, and design a three-site addressing plan after 35 days.  
**First-principles fallback** — if you forget the formula, write the 32-bit address and mask in binary, perform the AND, count the trailing zeros, and recompute 2^n – 2.

## 10. What this unlocks
Mastery of IPv4 addressing lets you configure router interfaces, design OSPF areas, set up NAT rules, and plan IPv6 transition mechanisms without address conflicts.  
- Variable-length subnet masks (VLSM)  
- Route summarization in BGP and OSPF  
- Access-control lists that match on prefix ranges  
- IPv6 prefix delegation and dual-stack planning

## 11. Self-check — five questions, no answers
1. Convert 203.0.113.45/28 to binary and compute its network address.  
2. How many usable hosts exist in 172.16.0.0/19?  
3. Can 10.1.2.0/23 and 10.1.3.0/24 be used together without overlap? Show the binary boundaries.  
4. A router receives a packet destined to 198.51.100.255; the interface mask is 255.255.255.128. Will the packet be treated as a directed broadcast?  
5. Given the requirement “allocate at least 500 hosts to each of four departments from 172.20.0.0/16”, choose the smallest possible CIDR blocks and list their prefixes.