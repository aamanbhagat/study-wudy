## What it is
Network security attacks are methods used to compromise the confidentiality, integrity, or availability of data transmitted over a network. A Distributed Denial-of-Service (DDoS) attack overwhelms a target with traffic to make it unavailable. A Man-in-the-Middle (MitM) attack secretly intercepts and potentially alters communications between two parties, while a replay attack involves capturing and re-transmitting a valid data transmission to deceive a recipient.

## Why it matters
These concepts are not theoretical; they are the basis of modern secure communication. In aerospace, an MitM or replay attack on the command link to a satellite or UAV could lead to catastrophic failure or hijacking. In machine learning, an attacker could perform a MitM attack on a data pipeline to poison your training set, subtly corrupting your model. In physics, a DDoS attack could cripple the data acquisition systems for a particle accelerator or telescope array during a critical event, resulting in irrecoverable data loss.

## When to study it
Before tackling this, you must have a solid grasp of the TCP/IP model, particularly the roles of the Network (IP) and Transport (TCP, UDP) layers. You should understand the mechanics of a TCP three-way handshake ($SYN, SYN-ACK, ACK$) and have a foundational knowledge of cryptography, specifically the difference between symmetric and asymmetric encryption, and the purpose of cryptographic hashing. Without this, the attack vectors and countermeasures will seem arbitrary.

## How to study it (step by step)
1.  **Baseline Normalcy:** Draw the packet flow for a simple, legitimate HTTP request from a client to a server. Use Wireshark to capture this traffic on your own machine to see the real packets.
2.  **Model the DDoS:** Now, draw the same diagram but add 1000 clients sending the *first* packet of a TCP handshake ($SYN$) to the server, but never responding to the server's $SYN-ACK$. This is a SYN flood. Reason from first principles: what resource on the server does this exhaust?
3.  **Model the MitM:** Redraw the original diagram, but insert an attacker between the client and server. The client establishes a connection with the attacker, and the attacker establishes a separate connection with the server, relaying messages. Think about what is required for the client and server to *not notice* this interception.
4.  **Model the Replay:** Take the legitimate diagram from step 1. Imagine the attacker captures the packet containing the user's login credentials. Draw a sequence diagram showing the attacker sending that *exact same packet* to the server one hour later. Why might this work? What assumption is being violated?
5.  **Map Countermeasures:** For each attack model, research and map the primary countermeasure. DDoS -> Rate Limiting/Filtering. MitM -> TLS/PKI. Replay -> Nonces/Timestamps. Articulate *why* each countermeasure breaks the corresponding attack model.

## Key ideas, with intuition
1.  **The CIA Triad:** All attacks are attempts to violate one or more of three principles: Confidentiality (can others read the message?), Integrity (was the message changed in transit?), and Availability (can I access the service?).
    *   DDoS attacks **Availability**.
    *   MitM attacks **Confidentiality** and **Integrity**.
    *   Replay attacks **Integrity** (specifically, the integrity of a sequence of operations).

2.  **Authentication is the Root Problem:** MitM and replay attacks are possible because one or both parties cannot definitively verify the identity of the other, or the freshness of the message. The core of the defense is proving two things: "I am who I say I am" (authentication) and "This message is new and sent by me for this specific transaction" (freshness/uniqueness).

3.  **Exploiting State and Asymmetry:** DDoS attacks often exploit an asymmetry of work. For example, in a SYN flood, it is computationally cheap for an attacker to send a $SYN$ packet, but it forces the server to allocate memory and state, which is more expensive. The attacker leverages this asymmetry at a massive scale.

4.  **Nonces Prevent Replay:** A "nonce" is a "number used once." If the server sends the client a random, unpredictable number (a nonce) at the start of a session, and requires the client to include that nonce in its signed login request, the attacker cannot simply replay an old request. The old request will have a stale nonce and will be rejected.
    $$ \text{Server} \rightarrow \text{Client}: \text{nonce}_S $$
    $$ \text{Client} \rightarrow \text{Server}: \{\text{credentials}, \text{nonce}_S\}_{K_{priv,C}} $$
    An attacker replaying the second message will fail if the server has already invalidated $\text{nonce}_S$.

## Worked example
Let's analyze a Man-in-the-Middle attack on a user logging into a website over unencrypted HTTP, and how HTTPS (TLS) prevents it.

**Scenario: Unencrypted HTTP Login**

1.  **Client (Alice) wants to log in to Server (Bob).** Alice sends a POST request containing `username=alice&password=password123`. This packet travels over the network in plaintext.
2.  **Attacker (Eve) is on the same network (e.g., public Wi-Fi).** Eve uses a packet sniffer to read all traffic. She sees the packet from Alice to Bob and simply reads the username and password directly from the packet's data payload.
3.  **Eve can also be an *active* attacker.** She can position herself as Alice's gateway to the internet. Alice sends the login packet to Eve, thinking she's sending it to the router. Eve reads it, saves the credentials, and then forwards the packet to Bob. Bob responds to Eve, and Eve forwards the response to Alice. Neither Alice nor Bob knows Eve is in the middle.

**Countermeasure: HTTPS (TLS)**

1.  **Handshake & Authentication:** When Alice connects to Bob's HTTPS site, her browser initiates a TLS handshake. Bob's server responds with its public key certificate. This certificate is digitally signed by a trusted Certificate Authority (CA), like Let's Encrypt.
2.  **Verification:** Alice's browser checks the CA's signature on the certificate. Since her browser trusts the CA (its public key is pre-installed), she can verify that the public key she received *truly belongs to Bob*. If Eve tried to intercept and substitute her own public key, the certificate would be invalid because it wouldn't be signed by a trusted CA for Bob's domain.
3.  **Key Exchange:** Alice's browser now uses Bob's verified public key to encrypt a new, randomly generated symmetric session key. She sends this encrypted session key to Bob. Only Bob, with his corresponding private key, can decrypt it.
    $$ \text{Alice} \rightarrow \text{Bob}: \{K_{session}\}_{K_{pub,B}} $$
4.  **Secure Communication:** Both Alice and Bob now share the same secret session key, $K_{session}$. All subsequent communication, including the login credentials, is encrypted using this key.
    $$ \text{Alice} \rightarrow \text{Bob}: E_{K_{session}}(\text{username=alice\&password=password123}) $$

**Reflection:** The MitM attack worked because there was no way for Alice to *authenticate* that the entity she was speaking to was actually Bob. The TLS handshake, specifically the certificate verification step, solves this authentication problem. The subsequent encryption solves the confidentiality problem.

## Diagrams
A Man-in-the-Middle (MitM) Attack:
```text
      (1) TCP Handshake Req.
   Alice ---------------------> Eve ---------------------> Bob
   (Client)     (Attacker)     (Server)
         <--------------------- <---------------------
      (2) TCP Handshake Resp.

      (3) Encrypted Comm. #1   (4) Encrypted Comm. #2
   Alice <====================> Eve <====================> Bob
         (Eve decrypts, reads,  (Eve re-encrypts with
          re-encrypts with       Bob's key and forwards)
          Alice's key)

   Alice thinks she has a secure channel to Bob.
   Bob thinks he has a secure channel to Alice.
   Both actually have a secure channel to Eve.
```

A Distributed Denial-of-Service (DDoS) Attack:
```text
                    +---------------+
                    |   Attacker    |
                    +---------------+
                           |
            +--------------+--------------+
            |              |              |
      +-----------+  +-----------+  +-----------+
      | Bot / Zombie |  | Bot / Zombie |  | Bot / Zombie | ...
      +-----------+  +-----------+  +-----------+
            |              |              |
            |     SYN      |      SYN     |
            +------------->+<-------------+
                           |
                           | SYN
                           V
                    +---------------+
                    |    Victim     |
                    |    Server     |
                    +---------------+
```

## Memory technique — remember this forever
1.  **The Malicious Post Office Story:**
    *   **DDoS:** An attacker sends 1 million letters with no return address to the post office. The post office must hold space for each one, waiting for a reply that never comes, and eventually runs out of room, shutting down for legitimate mail.
    *   **Man-in-the-Middle:** A malicious postal worker intercepts your letter, opens it, reads it, possibly changes it ("I'll pay $10" becomes "I'll pay $1000"), reseals it, and sends it on.
    *   **Replay:** The postal worker photocopies your sealed letter containing a check. A month later, they send the copy through the system again, hoping the bank cashes it twice.

2.  **Must Overlearn:**
    *   **DDoS (Availability):** Attack via resource exhaustion (bandwidth, connections, CPU). Counter: Filtering, rate limiting, scaling.
    *   **MitM (Confidentiality/Integrity):** Intercept and modify. Counter: Authentication via Public Key Infrastructure (PKI/TLS) and end-to-end encryption.
    *   **Replay (Integrity):** Capture and resend valid messages. Counter: Nonces (numbers used once) or challenge-response protocols.

3.  **Spaced Repetition Schedule:** Review these concepts and the story in **1 day, 3 days, 7 days, 16 days, and 35 days**. Quiz yourself by drawing the attack diagrams from memory.

4.  **First Principles Pathway:** If you forget, start with the **CIA Triad (Confidentiality, Integrity, Availability)**. Ask:
    *   "How can I stop someone from using the service?" -> Attack **Availability** -> Leads to DDoS.
    *   "How can I read or change a message without being detected?" -> Attack **Confidentiality/Integrity** -> Leads to MitM.
    *   "How do I prove the person I'm talking to is really them?" -> This question leads to the solution for MitM: **Authentication**.
    *   "How do I know this valid message wasn't just copied from yesterday?" -> This question leads to the solution for Replay: **Nonces/Freshness**.

## Common mistakes
1.  **Confusing Encryption with Authentication:** Many think "if it's encrypted, it's secure." You can have a perfectly encrypted channel to an attacker in an MitM attack. The crucial step is *authenticating who* you are encrypting for, which is what certificates solve.
2.  **Believing DDoS is Just a Bandwidth Problem:** While volumetric attacks exist, many sophisticated DDoS attacks target other resources. A SYN flood targets the server's connection state table (memory). A Slowloris attack targets the number of concurrent connections a web server can handle.
3.  **Using Timestamps Alone for Replay Protection:** Relying on timestamps assumes all parties have perfectly synchronized clocks. This is a very difficult problem in distributed systems (see: Network Time Protocol). A server-generated nonce that the client must sign and return is a much more robust mechanism.

## Self-check
1.  A SYN flood is a type of DDoS attack. Describe the sequence of packets sent by the attacker(s) and the server. What specific, finite resource on the server is being exhausted?
2.  You are designing a command protocol for a deep-space probe where messages have a 1-hour light-time delay. A simple replay attack could be disastrous. Why is a nonce-based system, where the probe waits for a nonce from Earth before executing a command, impractical? Propose an alternative replay-resistant mechanism that doesn't require a round-trip for every command.
3.  TLS certificates prevent MitM attacks by having a trusted third party (a Certificate Authority) vouch for a server's public key. What happens if a CA itself is compromised, and an attacker uses it to issue a fraudulent certificate for `google.com`? How would browsers or the security community detect and respond to this?