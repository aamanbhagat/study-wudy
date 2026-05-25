## What it is
IPv4 (Internet Protocol version 4) is the fundamental addressing system used to identify devices on a network. It provides a unique 32-bit numerical address for each device, typically written in a "dotted-decimal" format like `192.168.1.1`. This address allows data packets to be routed from a source to a destination across the internet or a local network.

## Why it matters
Every networked device, from a supercomputer running a physics simulation to a sensor on a rocket, needs an IP address to communicate. In distributed machine learning, each node in a training cluster has an IP address to exchange gradients and data. When controlling a deep-space probe, commands are sent to a specific IP address, making this a non-negotiable concept for any work involving networked systems.

## When to study it
You should be completely comfortable with the binary number system, including converting between binary and decimal. You must also understand the bitwise `AND` operation. A conceptual understanding of what a "data packet" is and that networks are composed of "nodes" and "links" is sufficient.

## How to study it (step by step)
1.  **Master Dotted-Decimal Notation:** Take an address like `172.16.254.1`. Write each of the four numbers (octets) as an 8-bit binary number. Concatenate them to see the full 32-bit address. Do this for five different addresses until it's second nature.
2.  **Learn Address Classes (The Old Way):** Research the historical IPv4 address classes (A, B, C, D, E). For classes A, B, and C, identify the fixed number of bits for the network portion and host portion. Understand why this system was inflexible and led to wasted addresses.
3.  **Introduce the Subnet Mask:** Understand the subnet mask as a 32-bit number that separates the address into a network prefix and a host identifier. Apply the bitwise `AND` operation between an IP address and a subnet mask (`255.255.255.0`) to derive the network address.
4.  **Practice Subnetting:** Take a Class C network (e.g., `192.168.10.0/24`). "Borrow" 3 bits from the host portion to create smaller sub-networks (subnets). Calculate the new subnet mask and determine how many subnets you created and how many hosts are in each.
5.  **Generalize with CIDR:** Realize that "borrowing bits" is just a way of making the network/host dividing line flexible. Learn CIDR (Classless Inter-Domain Routing) notation, like `/26`, as a simple way to state exactly how many bits (from the left) make up the network prefix. This makes the old "Class" system obsolete.
6.  **Calculate Network Ranges:** For a given IP/CIDR pair (e.g., `10.50.116.37/28`), practice calculating the four critical values: the network address, the broadcast address, the number of usable hosts, and the range of valid host IPs.

## Key ideas, with intuition
1.  **Address is a Hierarchy (Street & House):** An IP address is not a single flat number. It has two parts: a **Network Prefix** and a **Host Identifier**. Think of it like a mailing address: `[Street Name], [House Number]`. The network prefix is the street name (all houses on that street share it), and the host identifier is the unique house number.
2.  **The Subnet Mask is a Stencil:** The subnet mask is a 32-bit filter that reveals the network part of an address. It consists of a block of 1s followed by a block of 0s. When you perform a bitwise `AND` between an IP address and its subnet mask, the 1s in the mask preserve the network bits of the address, while the 0s zero out the host bits. This operation isolates the "Street Name".
    $$
    \text{Network Address} = \text{IP Address} \land \text{Subnet Mask}
    $$
3.  **CIDR is Just Counting the 1s:** Classless Inter-Domain Routing (CIDR) notation is a more efficient way to write the subnet mask. An address like `198.51.100.14/24` simply means the subnet mask has 24 leading 1s, followed by 8 0s. The `/24` tells you the length of the network prefix. This is far more flexible than the old Class A/B/C system.
4.  **Two Addresses are Reserved:** In any given network or subnet, two addresses are special and cannot be assigned to a device.
    *   **Network Address:** The address where all host bits are 0. It identifies the network itself (the "Street Name").
    *   **Broadcast Address:** The address where all host bits are 1. Sending a packet here sends it to *every* host on that network.
    *   This is why the number of available hosts is $2^h - 2$, where $h$ is the number of host bits.

## Worked example
**Problem:** For the device with IP address `192.168.50.132` and CIDR notation `/27`, find:
a) The Subnet Mask in dotted-decimal.
b) The Network Address.
c) The Broadcast Address.
d) The range of usable host IP addresses.

**Solution:**

1.  **Analyze the CIDR notation:** `/27` means the first 27 bits are for the network and the remaining $32 - 27 = 5$ bits are for the hosts.

2.  **Find the Subnet Mask (a):** A `/27` mask is 27 ones followed by 5 zeros.
    *   Binary: `11111111.11111111.11111111.11100000`
    *   Convert each octet to decimal: `255.255.255.224`. This is the subnet mask.

3.  **Find the Network Address (b):** Perform a bitwise `AND` between the IP address and the subnet mask.
    *   IP Address `192.168.50.132`: `11000000.10101000.00110010.10000100`
    *   Subnet Mask `255.255.255.224`: `11111111.11111111.11111111.11100000`
    *   `AND` Result: `11000000.10101000.00110010.10000000`
    *   Convert back to decimal: `192.168.50.128`. This is the network address.

4.  **Find the Broadcast Address (c):** Take the network address and flip all the host bits (the last 5 bits) to 1.
    *   Network Address (binary): `... .10000000`
    *   Flip last 5 bits to 1: `... .10011111`
    *   Full binary: `11000000.10101000.00110010.10011111`
    *   Convert back to decimal: `192.168.50.159`. This is the broadcast address.

5.  **Find the Usable Range (d):** The usable hosts are all addresses between the network address and the broadcast address.
    *   First usable host: `192.168.50.129` (Network Address + 1)
    *   Last usable host: `192.168.50.158` (Broadcast Address - 1)
    *   Range: `192.168.50.129` to `192.168.50.158`.
    *   The total number of hosts is $2^5 - 2 = 32 - 2 = 30$.

**Reflection:** Each step builds logically on the last. The CIDR notation `/27` was the key; it defined the boundary between network and host, which dictated the mask. The mask, in turn, allowed us to isolate the network address. The host bits then defined the size of the "container" for hosts, with the first and last values being reserved.

## Diagrams
A 32-bit IPv4 address, split by a subnet mask.

```text
An IP Address (32 bits)
|----------------------------------------------------------------|
|         Network Prefix         |        Host Identifier        |
|----------------------------------------------------------------|
▲                                ▲
|                                |
Start of Address                 Boundary defined by Subnet Mask

Example: Class C Address 192.168.1.100 with /24 mask
|11000000.10101000.00000001.|01100100|
|         Network (/24)      | Host   |

Subnetting: Borrowing bits to create sub-networks
Original Host Portion:
| H H H H H H H H |
Subnetted Host Portion (borrowing 3 bits):
| S S S | H H H H H |
▲       ▲
|       |
New Subnet Bits   New, smaller Host ID
```

## Memory technique — remember this forever
1.  **The Story:** Think of an IP network as an apartment building.
    *   The **Network Address** (`192.168.50.128`) is the building's street address. It refers to the whole building, not one apartment.
    *   The **CIDR notation** (`/27`) tells you the building's design: how many floors and apartments there are. It defines the *size* and *boundaries*.
    *   A **Host IP** (`192.168.50.132`) is a specific apartment number.
    *   The **Broadcast Address** (`192.168.50.159`) is the building's intercom system—it contacts everyone at once.
2.  **Must-know formulas:** Overlearn these. Do not paraphrase.
    *   `Network Address = IP Address AND Subnet Mask`
    *   Number of usable hosts = $2^h - 2$, where $h$ is the number of host bits (0s in the mask).
3.  **Spaced Repetition Schedule:** Do a new CIDR calculation problem on this schedule: **1 day, 3 days, 7 days, 16 days, 35 days**.
4.  **First Principles Pathway:** If you forget everything, remember this: An IP address and a subnet mask are just 32-bit numbers. The mask's job is to separate the address into two parts. Convert everything to binary. The 1s in the mask show you the network part. The 0s show you the host part. From there, you can derive everything: the network address has all host bits as 0, the broadcast has all host bits as 1, and the hosts are everything in between.

## Common mistakes
1.  **Forgetting the "minus two":** Calculating the number of hosts as $2^h$ instead of $2^h - 2$. You cannot assign the network or broadcast addresses to a device.
2.  **Incorrect "Block Size":** When subnetting, students struggle to find the starting address of each subnet. For a `/27` network (mask `...224`), the block size is $256 - 224 = 32$. The networks will start at `.0`, `.32`, `.64`, `.96`, `.128`, etc. Calculating this block size is a reliable shortcut.
3.  **Confusing the Mask with the Network Address:** The subnet mask (e.g., `255.255.255.0`) defines the *size* of the network. The network address (e.g., `192.168.1.0`) defines its *starting point*. They are not the same thing.
4.  **Binary Conversion Errors:** A simple mistake in converting one of the four decimal octets to its 8-bit binary representation will invalidate all subsequent calculations. Double-check your binary math.

## Self-check
1.  What is the network address and broadcast address for the IP `192.168.100.200` with a subnet mask of `255.255.255.0`?
2.  You are given the network block `172.20.0.0/22`. How many usable host IP addresses does this network contain?
3.  An organization needs to create 8 separate subnets for its departments. They have been assigned the network block `203.0.113.0/24`. What single CIDR notation (e.g., `/2x`) should they use for all 8 subnets to satisfy this requirement with minimum waste of addresses? What is the network address of the 5th subnet?