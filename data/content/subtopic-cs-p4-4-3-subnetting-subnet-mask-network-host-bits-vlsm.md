## What it is
Subnetting is the process of dividing a single, large computer network into smaller, logical sub-networks. This is achieved by "borrowing" bits from the host portion of an IP address to create a new sub-network identifier. The subnet mask is a 32-bit number that specifies which part of an IP address is the network portion and which is the host portion.

## Why it matters
Subnetting is fundamental to network design for performance, security, and manageability. In aerospace, a spacecraft's network is segmented: the critical flight control systems are on a different subnet from the scientific payload data network to prevent interference and enhance security. In large-scale physics, like at CERN, subnets are used to isolate the data streams from thousands of different detectors, preventing a failure in one system from flooding the entire network.

## When to study it
Before tackling subnetting, you must have a solid grasp of two concepts:
1.  **Binary Arithmetic:** You must be able to convert between decimal and binary effortlessly, and understand bitwise operations, specifically the AND operation.
2.  **IPv4 Addressing:** You must understand the structure of an IPv4 address (32 bits, dotted-decimal notation) and the distinction between the network and host portions in classful addressing (Classes A, B, C).

If you are not comfortable with these, pause and review them. Hand-waving binary will make this impossible.

## How to study it (step by step)
1.  **Master the "Stencil":** Take an IP address like `192.168.1.100` and a subnet mask like `255.255.255.0`. Convert both to binary. Perform a bitwise AND operation between them. The result is the Network Address. Do this on paper for five different examples until it is automatic.
2.  **Learn CIDR Notation:** Understand that the subnet mask `255.255.255.0` is equivalent to `/24`. This notation, called Classless Inter-Domain Routing (CIDR), simply counts the number of `1`s in the subnet mask. Practice converting between dotted-decimal masks and CIDR notation.
3.  **"Borrow" Bits:** Start with a simple network, e.g., `10.0.0.0/8`. Your goal is to create two subnets. To do this, you must "borrow" one bit from the host portion. See how this changes the subnet mask to `/9` (`255.128.0.0`) and creates two distinct network ranges. Calculate the network address, first usable host, last usable host, and broadcast address for each new subnet.
4.  **Solve for Subnets:** Tackle this problem: "Given `172.16.0.0/16`, create at least 5 subnets." Determine how many bits you must borrow ($2^s \ge 5$). Calculate the new subnet mask. List the first five subnets you've created.
5.  **Solve for Hosts:** Tackle this problem: "Given `192.168.50.0/24`, create subnets that can each support at least 25 hosts." Determine how many host bits you must leave ($2^h - 2 \ge 25$). Calculate the new subnet mask and the number of subnets you can create.
6.  **Introduce VLSM:** Variable Length Subnet Masking (VLSM) is just applying the same logic recursively. Take a `/24` network. Give half of it (`/25`) to one department. Then take the other half and subnet it *again* into smaller pieces (e.g., two `/26`s). Work through a problem where you are given a block of addresses and must satisfy requests for subnets of different sizes (e.g., one for 100 hosts, one for 50 hosts, two for 10 hosts).

## Key ideas, with intuition
1.  **The Mask is a Stencil:** An IP address has two parts: Network and Host. The subnet mask is a stencil you lay over the IP address. The bits in the mask that are `1` correspond to the network part; the bits that are `0` correspond to the host part. To find the "street name" (network address) of any given "house address" (IP address), you perform a bitwise AND between the IP and the mask.
    $$
    \text{Network Address} = \text{IP Address} \quad \& \quad \text{Subnet Mask}
    $$

2.  **Borrowing Bits Creates Sub-Streets:** Imagine a long street (the original network). Subnetting is like building smaller cul-de-sacs off that main street. You do this by taking some of the space previously used for house numbers (host bits) and using it to number the new cul-de-sacs (subnet bits). The more bits you borrow for the subnet part, the more subnets you can create, but the fewer hosts can be on each one.

3.  **The Two Unusable Addresses:** In any network or subnet, two addresses are reserved. The address where all host bits are `0` is the network address itself (the "street name"). The address where all host bits are `1` is the broadcast address (like a loudspeaker announcement to every house on that street). This is why the number of usable hosts is always $2^h - 2$, where $h$ is the number of host bits.

4.  **VLSM is Efficient Slicing:** Imagine you have a large block of clay (your address space). Standard subnetting is like slicing it into many equally sized pieces. VLSM is like being a sculptor: you take a large chunk for the torso, a smaller piece for the head, and even smaller pieces for the fingers. It allows you to create subnets of different sizes from a single parent block, which minimizes wasted IP addresses.

## Worked example
**Problem:** You are given the network `172.20.0.0/16`. You need to create subnets to meet the following requirements:
*   Subnet A: 1000 hosts
*   Subnet B: 250 hosts
*   Subnet C: 50 hosts

**Solution:**

1.  **Analyze Requirements & Prioritize:** We are using VLSM. Always start with the largest requirement first to ensure you have a contiguous block large enough.
    *   Subnet A (1000 hosts): We need $h$ host bits such that $2^h - 2 \ge 1000$.
        *   $2^9 = 512$ (too small).
        *   $2^{10} = 1024$. This works. So, we need $h=10$ host bits.
        *   An IPv4 address is 32 bits. The subnet mask will have $32 - 10 = 22$ network bits. This is a `/22` mask.
    *   Subnet B (250 hosts): We need $h$ bits such that $2^h - 2 \ge 250$.
        *   $2^7 = 128$ (too small).
        *   $2^8 = 256$. This works. So, we need $h=8$ host bits.
        *   The mask will have $32 - 8 = 24$ network bits. This is a `/24` mask.
    *   Subnet C (50 hosts): We need $h$ bits such that $2^h - 2 \ge 50$.
        *   $2^5 = 32$ (too small).
        *   $2^6 = 64$. This works. So, we need $h=6$ host bits.
        *   The mask will have $32 - 6 = 26$ network bits. This is a `/26` mask.

2.  **Allocate Subnet A (Largest):**
    *   We start with `172.20.0.0/16`.
    *   We allocate the first available block that is a `/22`.
    *   **Network A:** `172.20.0.0/22`.
    *   Let's find the range. A `/22` mask leaves $32-22=10$ host bits. The interesting bits are in the third octet.
    *   Mask: `11111111.11111111.11111100.00000000` (`255.255.252.0`).
    *   The network address is `172.20.0.0`.
    *   The broadcast address is where all host bits are `1`: `172.20.00000011.11111111` which is `172.20.3.255`.
    *   So, Subnet A uses the range `172.20.0.0` - `172.20.3.255`.

3.  **Allocate Subnet B (Next Largest):**
    *   The next available address after `172.20.3.255` is `172.20.4.0`.
    *   We need a `/24` block. `172.20.4.0` is a valid start for a `/24`.
    *   **Network B:** `172.20.4.0/24`.
    *   Range: Network address is `172.20.4.0`. Broadcast is `172.20.4.255`.

4.  **Allocate Subnet C (Smallest):**
    *   The next available address after `172.20.4.255` is `172.20.5.0`.
    *   We need a `/26` block. `172.20.5.0` is a valid start for a `/26`.
    *   **Network C:** `172.20.5.0/26`.
    *   Range: A `/26` has $2^6 = 64$ addresses. Network is `172.20.5.0`. Broadcast is `172.20.5.63`.

**Reflection:** Each step was a logical allocation. We found the number of bits needed for each request ($h$), which defined the required mask ($32-h$). By sorting the requests from largest to smallest, we ensured that we could place the large, contiguous blocks first without fragmenting our address space. The "next available address" is always the address immediately following the previous allocation's broadcast address.

## Diagrams
Here is a visualization of the subnet mask acting as a stencil to find the network address.

```text
IP Address:      192.168.1.130   ->   11000000.10101000.00000001.10000010
Subnet Mask (/24): 255.255.255.0     ->   11111111.11111111.11111111.00000000
                                        ------------------------------------ AND
Network Address:   192.168.1.0     <-   11000000.10101000.00000001.00000000

<-- Network Portion (24 bits) -->|<-- Host Portion (8 bits) -->
```

Here is a diagram showing how bits are "borrowed" to create subnets.

```text
Original /24 Network:
NNNNNNNN.NNNNNNNN.NNNNNNNN.HHHHHHHH   (N=Network, H=Host)

Subnetted to /26 (borrowing 2 bits):
NNNNNNNN.NNNNNNNN.NNNNNNNN.SSHHHHHH   (S=Subnet)

The two 'S' bits can take on 4 values (00, 01, 10, 11), creating 4 subnets.
The six 'H' bits can take on 2^6 = 64 values for addresses within each subnet.
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of the subnet mask as a **"light switch"**. The `1`s are switches that are "stuck on," fixing that part of the address as the network name. The `0`s are switches you can "flick on and off" to create different host addresses. Subnetting is just deciding to glue a few more of those host switches into the "on" position to create sub-network names.

2.  **Must-know formulas:**
    *   Number of subnets created: $N_{subnets} = 2^s$ (where $s$ is the number of borrowed bits).
    *   Number of usable hosts per subnet: $N_{hosts} = 2^h - 2$ (where $h$ is the number of remaining host bits).

3.  **Spaced Repetition Schedule:**
    *   Day 1: Reread this lesson. Do two simple subnetting problems.
    *   Day 3: Do one VLSM problem from scratch on a whiteboard.
    *   Day 7: Explain the concept of borrowing bits and the `-2` rule to a friend (or a rubber duck).
    *   Day 16: Do a mixed problem set without looking at your notes.
    *   Day 35: Find a subnetting practice website and do 10 rapid-fire questions.

4.  **First Principles Pathway:** If you forget everything, remember this: **The network address is the bitwise AND of the IP and the mask.** From this, you can derive everything. To find the number of hosts, just count the number of zeros in the mask ($h$) and calculate $2^h$. You then remember the two special cases (all 0s, all 1s) are reserved, giving you $2^h-2$. To find the number of subnets, you just count how many more `1`s your new mask has compared to the original mask ($s$) and calculate $2^s$.

## Common mistakes
1.  **Forgetting the `-2`:** Students calculate $2^h$ hosts are available, but forget that the network and broadcast addresses are unusable for devices. This is the most common error.
2.  **"Off-by-one" on borrowed bits:** To get 5 subnets, you need $2^s \ge 5$. Students often pick $s=2$ ($2^2=4$, too small) instead of the correct $s=3$ ($2^3=8$). Always round up the number of bits.
3.  **Miscalculating Broadcast Addresses:** The broadcast address is NOT the last IP in the block. It's the address where *all host bits* are set to `1`. For a network like `192.168.0.0/28`, the host bits are the last 4 bits. The broadcast address is `192.168.0.00001111`, which is `192.168.0.15`, not `192.168.0.255`.
4.  **Starting VLSM with the smallest block:** If you allocate small subnets first, you can fragment your address space, making it impossible to fit a larger contiguous block later on. Always allocate from largest to smallest requirement.

## Self-check
1.  Given the IP address `10.150.77.34` and subnet mask `255.255.240.0`, what is the network address and the broadcast address for this subnet?
2.  You are given the network `198.51.100.0/24`. You must create 6 subnets. What is the new subnet mask in CIDR and dotted-decimal notation? How many usable hosts are in each subnet?
3.  You manage the network `203.0.113.0/24`. The engineering department needs a subnet for 50 computers. The sales department needs a subnet for 20 computers. The executive team needs a subnet for 5 computers. Design a VLSM scheme to satisfy these requirements, listing the network address, mask, and usable IP range for each department.