## 1. The one-sentence answer
**An IPv4 address is a 32-bit identifier that uniquely locates a network interface, expressed in dotted-decimal notation and partitioned by a prefix length that defines the network portion versus the host portion.**

An IPv4 address occupies exactly four bytes. Each byte is written as a decimal number from 0 to 255 and the four numbers are separated by dots, producing the familiar form 203.0.113.45. The 32 bits are also divided into a network prefix and a host suffix; the length of the prefix determines how many devices can exist inside that network.

The original design grouped addresses into five fixed classes (A–E) that used rigid prefix lengths. Classless Inter-Domain Routing (CIDR) replaced those rigid boundaries with an explicit prefix length written after a slash, for example /24. Subnetting then became the process of borrowing bits from the host portion to create multiple smaller networks inside one larger allocation.

> [!NOTE]
> The single most important insight is that the prefix length—not the first octet—now decides where the network ends and the hosts begin; once you internalise this, both classful arithmetic and modern CIDR calculations become the same simple bit-mask operation.

## 2. Why this matters — concrete and current
AWS and Google Cloud allocate every virtual machine an IPv4 address whose prefix length directly controls routing-table size inside their data-centre fabrics; a mis-sized /16 instead of a /20 can waste tens of thousands of addresses and inflate BGP tables that every transit provider must carry.

SpaceX Starlink ground terminals receive a dynamic IPv4 address whose /32 or /29 prefix is announced via BGP from the nearest point-of-presence; engineers must calculate the correct subnet mask so that thousands of terminals per cell do not collide on the same Layer-2 segment.

Kubernetes assigns each pod an IPv4 address from a CIDR block declared in the cluster configuration; the kube-proxy and CNI plugins rely on the exact prefix length to install iptables or eBPF rules that isolate traffic between namespaces.

Semiconductor test labs at TSMC and Intel use isolated IPv4 test networks whose subnet masks are deliberately chosen so that proprietary EDA tools never leak packets onto the corporate backbone, illustrating how prefix arithmetic directly affects physical security boundaries.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Binary place values      | Every IPv4 decision ultimately reduces to setting or clearing individual bits. |
| Bitwise AND operation    | The subnet mask is applied with AND to extract the network prefix. |
| Powers of two            | Host counts, subnet sizes, and CIDR block arithmetic are all powers of two. |

## 4. Building the idea — from intuition to formalism

### Step 1 — 32 bits in four octets
An IPv4 address is simply a 32-bit string. To make it readable, the bits are grouped into four 8-bit octets and each octet is converted to decimal.  
Example: the bit string 11001011 00000000 00000001 00000001 becomes 203.0.1.1.  
Formal statement: address \( A = \sum_{i=0}^{31} b_i \cdot 2^i \) where \( b_i \in \{0,1\} \).  
> [!WARNING]
> Treating the four decimal numbers as independent decimal quantities instead of concatenated 8-bit fields will produce off-by-one errors when you later manipulate the address arithmetically.

### Step 2 — Network and host portions
The leftmost bits identify the network; the remaining bits identify a host inside that network. The division point is not fixed.  
Example: in 192.168.10.0 the first 24 bits might be network and the last 8 bits host.  
Formal statement: given prefix length \( p \), the network portion occupies bits \( 31 \) down to \( 31-p+1 \).

### Step 3 — Classful boundaries (historical)
Early routers examined only the first few bits to decide the prefix length automatically.  
Class A: first bit 0 → /8; Class B: first two bits 10 → /16; Class C: first three bits 110 → /24.  
Formal ranges appear in the textbook statement below.

### Step 4 — Explicit masks replace classes
A 32-bit mask with the first \( p \) bits set to 1 and the rest 0 indicates the prefix.  
Example: /24 mask = 11111111 11111111 11111111 00000000 = 255.255.255.0.  
Formal statement: mask \( M = 2^{32}-2^{32-p} \).

### Step 5 — CIDR notation
The address and its prefix length are written together as A/p.  
Example: 203.0.113.0/24 denotes the 256 addresses whose first 24 bits match 203.0.113.

### Step 6 — Subnetting by extending the prefix
Borrowing k additional bits from the host field creates \( 2^k \) subnets, each with \( 2^{32-p-k}-2 \) usable hosts.  
Formal statement: new prefix length = \( p+k \).

## 5. Worked examples — every step shown

**Example 1 — Convert binary to dotted decimal**  
*Given:* 11000000 10101000 00000001 00000001  
*Find:* dotted-decimal form.  
11000000₂ = 192 (128+64).  
10101000₂ = 168 (128+32+8).  
00000001₂ = 1.  
00000001₂ = 1.  
**192.168.1.1**  
*Reflection:* The conversion is mechanical once you treat each octet independently; the only trap is forgetting that each octet is exactly eight bits.

**Example 2 — Apply a classful mask**  
*Given:* 172.16.5.10, Class B network.  
*Find:* network address.  
Class B prefix length = 16 → mask 255.255.0.0.  
172.16.5.10 AND 255.255.0.0 = 172.16.0.0.  
**172.16.0.0**  
*Reflection:* The host bits are simply zeroed; the operation is identical whether the mask came from a class or from CIDR.

**Example 3 — Calculate usable hosts in a /27**  
*Given:* 10.0.0.0/27.  
*Find:* number of usable host addresses.  
Total addresses = \( 2^{32-27} = 32 \).  
Network and broadcast addresses reserved → 32−2 = 30.  
**30 usable hosts**  
*Reflection:* The −2 rule is universal; forgetting it is the most common arithmetic error on certification exams.

**Example 4 — Subnet a /24 into four equal subnets**  
*Given:* 192.168.10.0/24.  
*Find:* the four /26 subnets.  
Borrow 2 bits → new prefix /26.  
Block size = \( 2^{8-2} = 64 \).  
Subnets:  
192.168.10.0/26 (0–63)  
192.168.10.64/26 (64–127)  
192.168.10.128/26 (128–191)  
192.168.10.192/26 (192–255)  
**192.168.10.0/26, 192.168.10.64/26, 192.168.10.128/26, 192.168.10.192/26**  
*Reflection:* The block size is always a power of two; listing the ranges in ascending order prevents overlap mistakes.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using the first-octet class rule after CIDR was introduced | Old textbooks and some certification questions still mention classes | Always read the explicit prefix length; ignore the first octet for modern calculations |
| Forgetting to subtract 2 for network and broadcast | Students count total addresses instead of usable hosts | Write “−2” as a permanent annotation next to every host-count formula |
| Treating 192.168.1.0/24 and 192.168.1.0/32 as the same network | Confusing network address with host address | Remember /32 is a single host; the network address itself is never assigned to an interface |
| Miscalculating block size when borrowing bits | Using decimal arithmetic instead of powers of two | Convert the borrowed count k into \( 2^k \) before any addition |
| Overlapping subnets after VLSM | Choosing non-aligned boundaries | Always start each new subnet at a multiple of its own block size |
| Confusing wildcard masks with subnet masks | Cisco ACL syntax uses inverse masks | Keep two separate mental columns: subnet mask (1 = network) versus wildcard (0 = network) |
| Assuming private addresses are non-routable on the public Internet | RFC 1918 only defines non-globally-unique blocks | Private addresses can still be routed inside a VPN or data-centre fabric |

## 7. The textbook-precise statement
An IPv4 address is a 32-bit string \( a = a_{31}a_{30}\dots a_0 \). Given a prefix length \( p \) (0 ≤ p ≤ 32), the network prefix is the integer \( \lfloor a / 2^{32-p} \rfloor \times 2^{32-p} \). The corresponding subnet mask is the integer \( 2^{32}-2^{32-p} \). Classful addressing (historical) assigned fixed prefix lengths: Class A (0.0.0.0–127.255.255.255) p=8, Class B (128.0.0.0–191.255.255.255) p=16, Class C (192.0.0.0–223.255.255.255) p=24 (Kurose & Ross, *Computer Networking: A Top-Down Approach*, 8e, §4.1).

## 8. Visual — diagram or schematic
```text
32-bit IPv4 address
+------------------+------------------+------------------+------------------+
|   Octet 3 (MSB)  |   Octet 2        |   Octet 1        |   Octet 0 (LSB)  |
|  8 bits (p bits) |                  |                  |  host bits       |
+------------------+------------------+------------------+------------------+
          ↑                               ↑
     network prefix                  host portion
Example: 192.168.10.5/26
192     .168     .10      .5
11000000.10101000.00001010.00000101
          |<-- p=26 -->|<-6 bits->|
```
The vertical bar after the 26th bit shows where the prefix ends.

## 9. The memory technique

1. **The hook** — Picture a 32-lane highway; the first p lanes are painted solid yellow (network) and the remaining lanes are open for cars (hosts). The slash number tells you exactly where the yellow paint stops.
2. **What to overlearn** — 2^10 = 1024, 2^8 = 256, 2^5 = 32; usable hosts = 2^h − 2; CIDR block sizes are always powers of two.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive any prefix length by writing the 32-bit mask with p leading 1s, convert to decimal, then apply bitwise AND to the address.

## 10. What this unlocks
Mastery of IPv4 addressing is the prerequisite for route aggregation, VLSM, IPv6 transition mechanisms, and any discussion of BGP prefix advertisement. The next concepts that directly depend on it are: longest-prefix-match forwarding, route summarisation, NAT44, DHCP address pools, and the IPv6 128-bit address format.

## 11. Self-check — five questions, no answers
1. Convert 0b11000000101010000000000100000001 to dotted decimal and state its /24 network address.  
2. A router receives 10.47.99.200/21; how many usable host addresses exist in that subnet?  
3. You are given 172.16.0.0/16 and must create at least 30 subnets each containing at least 1000 hosts. What is the smallest prefix length that satisfies both constraints?  
4. Explain why 192.168.1.0/24 and 192.168.1.0/25 cannot be used simultaneously on the same physical link without additional configuration.  
5. A packet arrives with destination 203.0.113.99 and the routing table contains 203.0.113.0/26 and 203.0.113.64/26. Which entry is chosen and why?