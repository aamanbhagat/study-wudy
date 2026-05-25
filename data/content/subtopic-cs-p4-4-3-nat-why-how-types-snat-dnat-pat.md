## What it is
Network Address Translation (NAT) is a method used by routers to rewrite the source and/or destination IP addresses of packets as they pass through. This allows multiple devices in a private network (using private, non-routable IP addresses) to share a single public IP address to communicate with the internet. Essentially, it acts as a proxy or an intermediary between a private network and a public one.

## Why it matters
NAT is the primary reason the internet did not run out of IPv4 addresses years ago. In practice, it provides a crucial layer of security by hiding the internal network topology from the outside world. For a rocket ground control station or a high-performance computing cluster for physics simulations, all internal machines can be on a private, secure network, while NAT provides a single, controlled gateway for necessary outbound connections (e.g., fetching satellite ephemeris data) and strictly firewalled inbound access.

## When to study it
Before tackling NAT, you must have a firm grasp of the following. If not, study them first.
1.  **IP Addressing:** Specifically, the difference between public and private IP address ranges (as defined in RFC 1918, e.g., `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`).
2.  **IP Packet Structure:** You must know that an IP header contains a source IP address and a destination IP address.
3.  **TCP/UDP:** You must understand the concept of ports and that TCP/UDP headers contain source and destination ports.

## How to study it (step by step)
1.  **Review the Problem:** Read RFC 1918 and internalize the private IP address ranges. Ask yourself: "If these addresses are not routable on the public internet, how can a device with IP `192.168.1.10` browse a website?" This frames the problem that NAT solves.
2.  **Trace an Outbound Packet (SNAT/PAT):** On paper, draw a client (`192.168.1.10`), a router (Private IP: `192.168.1.1`, Public IP: `203.0.113.5`), and a server (`8.8.8.8`). Create a packet from the client to the server. Write down its `(src_ip, src_port, dst_ip, dst_port)`. Now, "pass" it through the router. Manually rewrite the `src_ip` to the router's public IP and the `src_port` to a new, unused port. This is SNAT with PAT.
3.  **Build the NAT Table:** As you perform the translation in step 2, create a "NAT Table". It should have columns for the original `(src_ip, src_port)` and the translated `(new_src_ip, new_src_port)`. This table is the router's memory.
4.  **Trace the Return Packet:** Now, trace the reply from the server. Its destination will be the router's public IP and the new port. When it arrives at the router, use your NAT table to look up the entry and reverse the translation, rewriting the `dst_ip` and `dst_port` back to the original client's values.
5.  **Trace an Inbound Packet (DNAT):** Imagine you have a web server at `192.168.1.50`. An external user sends a packet to your public IP `203.0.113.5` on port `80`. Draw a pre-configured "port forwarding" rule that tells the router: "Any packet arriving at my public IP on port 80 should have its destination IP rewritten to `192.168.1.50` and destination port to `80`." This is DNAT.

## Key ideas, with intuition
1.  **The Core Problem: Address Exhaustion.** There are $\approx 4.3 \times 10^9$ IPv4 addresses, but far more devices. NAT allows a whole organization with thousands of devices to use just one (or a few) public IP addresses. It multiplexes a private address space onto a public one.
2.  **The Translation Table is the Brain.** A NAT device is stateful. It doesn't just blindly forward packets; it remembers the connections passing through it. For an outgoing connection, it creates an entry in its translation table.
    $$
    \text{NAT Table Entry: } (\text{Private IP}_{\text{src}}, \text{Private Port}_{\text{src}}) \leftrightarrow (\text{Public IP}_{\text{src}}, \text{Public Port}_{\text{src}})
    $$
    When a reply packet comes back, the router looks at the destination `(Public IP, Public Port)`, finds the matching entry in the table, and knows which internal private device to forward it to.
3.  **SNAT: Source NAT for Outbound Traffic.** When a client *inside* the private network initiates a connection to a server *outside*, the router changes the **source** information. Think "S" for "Source" or "Sending out". The router substitutes its own public IP for the client's private IP.
4.  **DNAT: Destination NAT for Inbound Traffic.** When a client *outside* wants to connect to a server *inside* (e.g., a web server you host), the router changes the **destination** information. This is commonly called "port forwarding." You create a static rule that maps `(Public IP, Public Port)` to `(Private Server IP, Private Server Port)`. Think "D" for "Destination" or "Delivering in".
5.  **PAT: The Overachiever.** Port Address Translation (PAT), or NAPT, is the most common form of NAT. It not only translates the IP address but also the source port. This is the key to allowing *many* internal devices to share *one* public IP. If two internal clients `192.168.1.10` and `192.168.1.11` both connect to google.com, the router maps them to its public IP but gives them different source ports (e.g., `203.0.113.5:61001` and `203.0.113.5:61002`). This is how it tells the replies apart.

## Worked example
A client at `192.168.1.77` wants to browse a website at `151.101.193.69` (example.com). The client's router has a private IP of `192.168.1.1` and a public IP of `203.0.113.42`.

**Step 1: Client Creates Outgoing Packet**
The client's machine creates an IP packet. The operating system picks an ephemeral source port, say `51000`.
*   Source IP: `192.168.1.77`
*   Source Port: `51000`
*   Destination IP: `151.101.193.69`
*   Destination Port: `80` (HTTP)

**Step 2: Router Performs SNAT/PAT**
The packet arrives at the NAT router. The router sees it's from the private network and destined for the public internet.
1.  It rewrites the source IP to its own public IP: `192.168.1.77` $\rightarrow$ `203.0.113.42`.
2.  It rewrites the source port to a unique, available port on its public interface, say `62001`: `51000` $\rightarrow$ `62001`.
3.  It creates an entry in its NAT table to remember this mapping.
    `NAT Table: { (192.168.1.77:51000) <--> (203.0.113.42:62001) }`

**Step 3: Packet Travels the Internet**
The modified packet is sent to the web server.
*   Source IP: `203.0.113.42`
*   Source Port: `62001`
*   Destination IP: `151.101.193.69`
*   Destination Port: `80`

**Step 4: Server Sends Reply**
The web server processes the request and sends a reply. It swaps the source and destination from the packet it received.
*   Source IP: `151.101.193.69`
*   Source Port: `80`
*   Destination IP: `203.0.113.42`
*   Destination Port: `62001`

**Step 5: Router Performs Reverse Translation**
The reply packet arrives at the router's public interface.
1.  The router inspects the destination IP and port: `203.0.113.42:62001`.
2.  It looks this up in its NAT table and finds the matching entry: `(203.0.113.42:62001) --> (192.168.1.77:51000)`.
3.  It rewrites the destination IP and port back to the original client's values.
4.  The final packet delivered to the client is:
    *   Source IP: `151.101.193.69`
    *   Source Port: `80`
    *   Destination IP: `192.168.1.77`
    *   Destination Port: `51000`

The client receives the packet, and the connection is established, completely unaware that any translation occurred. Each step was necessary: the initial translation was required to make the packet publicly routable, the table entry was needed to remember the connection, and the reverse translation was required to deliver the reply to the correct internal machine.

## Diagrams
```text
        Private Network (LAN)              |          Public Internet
                                           |
  +----------------+                       |
  | Client         |                       |        +----------------+
  | 192.168.1.77   |                       |        | Web Server     |
  +----------------+                       |        | 151.101.193.69 |
          |                                |        +----------------+
          | 1. Packet (src=192.168.1.77)   |                ^
          |                                |                |
          v                                |                | 3. Packet (src=203.0.113.42)
  +----------------+                       |                |
  | NAT Router     |  2. SNAT/PAT          |                |
  | Private:       |  (table entry created)|                |
  | 192.168.1.1    |---------------------->|                |
  | Public:        |                       |                |
  | 203.0.113.42   |                       |                |
  +----------------+                       |                |
          ^                                |                | 4. Reply (dst=203.0.113.42)
          |                                |                |
          | 6. Packet (dst=192.168.1.77)   |                |
          |                                |                v
          +-------------------------------------------------+
            5. Reverse Translation via NAT table
```

## Memory technique — remember this forever
1.  **The Mnemonic Story: The Office Receptionist.**
    *   Your private network is an office building with hundreds of employees (devices), each with their own internal extension number (private IP). The outside world only knows the building's single public street address (public IP).
    *   **SNAT/PAT (Outgoing Mail):** An employee sends a letter. The receptionist (NAT router) takes the letter, replaces the employee's extension number with the company's main address, and adds a unique tracking number to the envelope (the new source port). She notes in her logbook (NAT table) which employee sent it. When a reply comes back with that tracking number, she looks in her logbook and delivers it to the correct employee.
    *   **DNAT (Incoming Package):** A package arrives addressed to the company's main address, "Attn: Web Server Dept." (e.g., port 80). The receptionist has a standing order (port forwarding rule) to deliver all such packages directly to the server room on the 3rd floor (the private server IP).

2.  **Must Overlearn:**
    *   **SNAT** (Source NAT): For outbound connections. Changes `src_ip` and `src_port`.
    *   **DNAT** (Destination NAT): For inbound connections. Changes `dst_ip` and `dst_port`.
    *   **PAT** (Port Address Translation): The mechanism that uses ports to allow many-to-one mapping. It's almost always used with SNAT.

3.  **Spaced Repetition Schedule:**
    *   Review this material tomorrow (1 day).
    *   Then in 3 days.
    *   Then in 1 week (7 days).
    *   Then in 2 weeks (16 days).
    *   Then in 1 month (35 days).

4.  **First Principles Pathway:** If you forget, reason from the problem. "I have 100 devices on a `192.168.1.0/24` network. They need to access the internet through one public IP. What must the router do?"
    *   An outgoing packet has a private source IP. The internet won't know how to reply to `192.168.1.x`. So, the router *must* change the source IP to its own public IP. (This derives SNAT).
    *   What if two devices send packets at the same time? The replies will come back to the same public IP. How does the router know which reply goes to which device? It needs more information. The only other field it can use is the port number. So, it *must* also change the source port to be unique for each connection. (This derives PAT).

## Common mistakes
1.  **Confusing SNAT and DNAT.** Remember the initiator of the connection. If the initiator is *inside* the private network, it's SNAT. If the initiator is *outside*, it's DNAT.
2.  **Thinking NAT is a Firewall.** NAT provides security by obscurity—it hides your internal IP layout. But its primary job is address translation. A stateful firewall actively inspects traffic against a ruleset; NAT just translates and forwards based on its table. Don't rely on NAT for security.
3.  **Forgetting about Ports.** Students often focus only on the IP address translation. The real power of modern NAT comes from PAT, the translation of port numbers, which enables the many-to-one mapping. Static 1-to-1 NAT without PAT is rare.
4.  **Application Layer Issues.** Some protocols embed IP addresses inside their own data payloads (e.g., FTP). Basic NAT only looks at the IP/TCP headers and doesn't modify this data, breaking these applications. This requires more advanced Application-Layer Gateways (ALGs) on the NAT device.

## Self-check
1.  A computer at `10.10.20.30` initiates a TCP connection from its port `49152` to a server at `203.0.113.10` on port `443`. The request passes through a NAT router with a public IP of `198.51.100.5`. Describe the source and destination IP addresses and ports on the packet *before* it reaches the router and *after* it leaves the router for the public internet.
2.  You are running a game server on your machine at `192.168.0.123` which listens for connections on UDP port `27015`. Your friend on the internet wants to connect to it. What information do you need to give them, and what specific configuration (including the type of NAT) must you set up on your router?
3.  Two clients, `192.168.1.10` and `192.168.1.20`, both open a web browser and simultaneously connect to `https://example.com` (port 443). By coincidence, both of their operating systems assign the same source port: `50000`. Your router's public IP is `203.0.113.99`. How does the NAT router handle this situation to ensure replies are not mixed up? Detail the two entries that would be created in the NAT table.