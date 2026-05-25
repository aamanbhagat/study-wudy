## What it is
TCP congestion control is a set of algorithms the sender uses to regulate its sending rate to avoid overwhelming the network. It's a dynamic feedback system where the sender interprets signals like received acknowledgments (ACKs) and packet loss as indicators of network capacity. The goal is to maximize throughput while maintaining fairness and preventing a catastrophic network-wide traffic jam known as congestion collapse.

## Why it matters
This is not just an academic topic; it's the invisible engine that makes the modern internet usable.
-   **Aerospace:** When controlling a rover on Mars or downloading telemetry from a satellite, the communication link is long-latency and potentially lossy. Sophisticated congestion control (like BBR, a modern successor to CUBIC) is critical to fully utilize the precious link capacity without causing packet drops that could delay critical commands or scientific data.
-   **Machine Learning:** Training large models like GPT requires synchronizing massive datasets and model parameters across hundreds of GPUs. The efficiency of this data transfer, governed by TCP congestion control, directly impacts the time and cost of training, which can be in the millions of dollars.
-   **Physics:** High-energy physics experiments at facilities like CERN generate petabytes of data that must be distributed to research institutions globally. High-performance data transfer protocols, which are heavily modified versions of TCP, use advanced congestion control to saturate intercontinental fiber optic links, moving massive datasets in hours instead of weeks.

## When to study it
You must have a solid grasp of these prerequisites first. If not, master them and return.
1.  **TCP Fundamentals:** You must understand the purpose of sequence numbers, acknowledgments (ACKs), the three-way handshake, and the sliding window protocol for *flow control* (the receiver's window, `rwnd`).
2.  **Network Layers:** Be able to clearly distinguish the roles of the Transport Layer (TCP, end-to-end reliability) and the Network Layer (IP, best-effort packet delivery). Congestion happens in the routers (Network Layer), but it is managed at the endpoints (Transport Layer).
3.  **Queuing Basics:** Understand that routers have finite buffers (queues). When packets arrive faster than they can be forwarded, these queues fill up. When a queue is full, newly arriving packets are dropped. This packet drop is the primary signal of congestion.

## How to study it (step by step)
1.  **Draw the State Machine:** On paper, draw the three main states: Slow Start, Congestion Avoidance, and Fast Recovery. Draw the transitions between them based on events: successful ACKs, 3 duplicate ACKs, and timeout. For each state, write the rule for how the congestion window (`cwnd`) is updated.
2.  **Plot the Sawtooth:** Use a spreadsheet or a simple script. Plot `cwnd` vs. time (in units of RTT). Start with `cwnd=1`, `ssthresh=64`. Model the exponential growth of Slow Start, the switch to linear growth in Congestion Avoidance, and the halving of `cwnd` on a simulated packet loss. This visual "sawtooth" is the classic signature of TCP congestion control.
3.  **Contrast Timeout vs. Fast Retransmit:** Modify your plot from step 2. First, show a timeout event: `cwnd` drops all the way to 1. Then, on a separate graph, show a "fast retransmit" event (3 duplicate ACKs): `cwnd` only drops to half its previous value. This demonstrates why Fast Retransmit is a crucial optimization.
4.  **Read a CUBIC Summary:** You don't need to read the original paper yet. Find a good university lecture summary or blog post that explains the *intuition* behind CUBIC. Focus on why a cubic function is used instead of Reno's linear increase, especially for high-bandwidth, high-latency networks.
5.  **Observe it Live:** Find a large file to download (e.g., a Linux ISO). On Linux/macOS, run the command `ss -ti` (on Linux) or a similar tool while the download is active. Watch the values for `cwnd` and `ssthresh` change in real-time. Try to identify the different phases.

## Key ideas, with intuition
1.  **Congestion Window (`cwnd`):** The sender maintains a variable called the congestion window (`cwnd`), which represents its current estimate of the network's capacity. It is a limit on the number of unacknowledged bytes it can have "in flight." The actual amount of data a sender can transmit is the minimum of the receiver's advertised window (`rwnd`, for flow control) and its own `cwnd` (for congestion control).
    $$ \text{BytesInFlight} \le \min(cwnd, rwnd) $$
    *Intuition:* `rwnd` is the receiver telling you "I have this much buffer space." `cwnd` is you telling yourself "The network path can probably only handle this much traffic." You must respect both limits.

2.  **Probing for Bandwidth (AIMD):** TCP's core strategy is Additive Increase, Multiplicative Decrease (AIMD). When things are going well, you increase your sending rate slowly (additively) to gently probe for more available bandwidth. When you detect congestion (packet loss), you decrease your rate aggressively (multiplicatively) to quickly alleviate the problem.
    -   **Slow Start:** This initial phase is misnamed; it's an aggressive exponential growth phase. For each ACK received, `cwnd` is increased by 1 Maximum Segment Size (MSS). The effect is that `cwnd` doubles approximately every Round Trip Time (RTT). The goal is to quickly find the network's approximate capacity.
    -   **Congestion Avoidance:** Once `cwnd` reaches a threshold (`ssthresh`), the algorithm switches to a less aggressive, linear increase. Here, `cwnd` increases by only 1 MSS per RTT. This is the "Additive Increase" part of AIMD.

3.  **Detecting Congestion:** There are two main signals of congestion:
    -   **Timeout:** A packet and its retransmissions were all lost, and a timer expired. This is a severe event, implying heavy congestion. The reaction is drastic: `cwnd` is reset to 1 MSS, and the process restarts from Slow Start.
    -   **3 Duplicate ACKs (Fast Retransmit):** The sender receives three ACKs for the same sequence number. This implies that a single packet was lost, but subsequent packets got through, triggering the receiver to re-ACK the last in-order packet it saw. This is a milder congestion signal. The reaction is less severe: `cwnd` is halved ("Multiplicative Decrease"), and we avoid the expensive Slow Start phase.

4.  **CUBIC's Innovation:** AIMD's linear probe is too slow for modern "long fat networks" (high bandwidth and high latency). CUBIC replaces the linear increase with a cubic function of the time elapsed since the last congestion event. This function is concave at first (grows very fast, aggressively seeking the old peak) and then convex as it approaches the previous maximum (slowing down to probe gently). This allows CUBIC to utilize high-speed links much more effectively than older algorithms like TCP Reno.

## Worked example
Let's trace the `cwnd` and `ssthresh` for a TCP Reno connection.
-   Initial state: `cwnd = 1` MSS, `ssthresh = 16` MSS.
-   Assume 1 RTT passes between each step.

| RTT | Event                      | `cwnd` (start) | `ssthresh` (start) | Action                                                                | `cwnd` (end) | `ssthresh` (end) | State              |
|-----|----------------------------|----------------|--------------------|-----------------------------------------------------------------------|--------------|------------------|--------------------|
| 1   | Connection starts          | 1              | 16                 | Send 1 packet, get 1 ACK. `cwnd` doubles.                             | 2            | 16               | Slow Start         |
| 2   | Successful ACKs            | 2              | 16                 | Send 2 packets, get 2 ACKs. `cwnd` doubles.                           | 4            | 16               | Slow Start         |
| 3   | Successful ACKs            | 4              | 16                 | Send 4 packets, get 4 ACKs. `cwnd` doubles.                           | 8            | 16               | Slow Start         |
| 4   | Successful ACKs            | 8              | 16                 | Send 8 packets, get 8 ACKs. `cwnd` doubles.                           | 16           | 16               | Slow Start         |
| 5   | `cwnd` reaches `ssthresh`    | 16             | 16                 | Send 16 packets, get 16 ACKs. Switch to Congestion Avoidance. `cwnd` += 1. | 17           | 16               | Congestion Avoidance |
| 6   | Successful ACKs            | 17             | 16                 | Send 17 packets, get 17 ACKs. `cwnd` += 1.                            | 18           | 16               | Congestion Avoidance |
| 7   | **3 Duplicate ACKs arrive**  | 18             | 16                 | Packet loss detected. `ssthresh = cwnd/2 = 9`. `cwnd = ssthresh = 9`.   | 9            | 9                | Congestion Avoidance |
| 8   | Successful ACKs            | 9              | 9                  | Send 9 packets, get 9 ACKs. `cwnd` += 1.                              | 10           | 9                | Congestion Avoidance |
| 9   | **Timeout occurs**         | 10             | 9                  | Severe congestion. `ssthresh = cwnd/2 = 5`. `cwnd` resets to 1.         | 1            | 5                | Slow Start         |
| 10  | Successful ACKs            | 1              | 5                  | Send 1 packet, get 1 ACK. `cwnd` doubles.                             | 2            | 5                | Slow Start         |

**Reflection:**
-   Step 4 -> 5 shows the transition from exponential to linear growth when `cwnd` hits `ssthresh`.
-   Step 7 shows the "multiplicative decrease" from Fast Retransmit: `cwnd` is halved, not reset, allowing for a faster recovery.
-   Step 9 shows the drastic reaction to a timeout: `cwnd` is reset to 1, forcing a slow restart to ensure the network has recovered.

## Diagrams
This diagram shows the evolution of `cwnd` over time, illustrating the key phases. This is the classic "TCP Sawtooth" pattern.

```text
      ^ cwnd (congestion window in MSS)
      |
      |
   18 + . . . . . . . . . . * <-- 3 Duplicate ACKs (Packet Loss)
      |                    /| \
      |                   / |  \
   16 +------------------/--+   \
      |                 /   |    .
 ssthresh -> 9 + . . . . . . . . . \*---------/
      |                /    |      .       /
      |               /     |       .     /
      |              /      |        .   /
      |             /       |         . /
      |            /        |          * <-- Timeout
      |           /         |           \
      |          /          |            .
    1 +---------/-----------+------------- \
      +---------------------------------------------------> Time (in RTTs)
        |         |         |             |
     Slow Start   |      Fast Recovery    |
              Congestion               New Slow Start
               Avoidance
```

## Memory technique — remember this forever
1.  **The Story: Driving in Traffic**
    -   **Slow Start:** You're on an empty on-ramp. You accelerate hard (exponentially) to get up to speed.
    -   **Congestion Avoidance:** You see brake lights ahead (you've reached `ssthresh`). You ease up and start tapping the gas gently (linear increase) to match the flow of traffic.
    -   **Fast Retransmit (3 Dup ACKs):** A car cuts you off. You tap your brakes (multiplicative decrease: `cwnd /= 2`), but you don't stop completely. You've lost some space, but you're still moving.
    -   **Timeout:** You hit a complete standstill. A pileup. You slam the brakes, and you're back to a dead stop (`cwnd = 1`). You must start accelerating from scratch.
    -   **CUBIC:** You're a Formula 1 driver. After a slowdown, you don't just accelerate linearly. You follow a precisely calculated curve (a cubic function) to get back to race speed as quickly and safely as possible.

2.  **Must-Memorize Rules (for TCP Reno):**
    -   **On successful ACK in Slow Start:** `cwnd += 1`
    -   **On successful RTT in Congestion Avoidance:** `cwnd += 1`
    -   **On 3 Duplicate ACKs:** `ssthresh = cwnd / 2`, `cwnd = ssthresh`
    -   **On Timeout:** `ssthresh = cwnd / 2`, `cwnd = 1`

3.  **Spaced Repetition Schedule:**
    -   Review these rules and the driving story at: **1 day, 3 days, 7 days, 16 days, 35 days.**
    -   Each time, redraw the sawtooth diagram from memory and label the events that cause the state changes.

4.  **First Principles Pathway:**
    If you forget everything, rebuild it from this question: "How would I design a system to find the unknown capacity of a network and react to congestion?"
    -   **Probe:** You must send data to learn. Start small (`cwnd=1`) and increase.
    -   **Probe Aggressively, then Cautiously:** It's efficient to increase exponentially at first (Slow Start), then switch to a slower, linear probe (Congestion Avoidance) once you get a signal you're getting close. This implies a threshold (`ssthresh`).
    -   **React Proportionally:** A mild sign of trouble (duplicate ACKs) should cause a mild reaction (halve the rate). A severe sign (timeout) must cause a severe reaction (reset to minimum). This is the logic of AIMD.

## Common mistakes
1.  **Confusing `cwnd` and `rwnd`:** The sender is constrained by BOTH windows. The amount of data in flight is $\min(cwnd, rwnd)$. A common mistake is to only consider `cwnd` and forget that the receiver's buffer can also be a bottleneck.
2.  **Incrementing `cwnd` Incorrectly:** In Congestion Avoidance, `cwnd` increases by 1 MSS *per RTT*, not per ACK. A naive implementation of `cwnd++` for every ACK would wrongly cause exponential growth again. The correct per-ACK formula is `cwnd += MSS * MSS / cwnd`.
3.  **Forgetting to Update `ssthresh`:** After any congestion event (timeout or 3 duplicate ACKs), `ssthresh` is updated to half of the `cwnd` value at the time of the event. Forgetting this means the next Slow Start phase will grow far too aggressively.
4.  **Thinking "Slow Start" is Slow:** The name is historical. It is an aggressive, exponential growth phase. It is only "slow" compared to the impossible alternative of starting with an infinitely large window.

## Self-check
1.  A TCP connection is in Congestion Avoidance with `cwnd = 40` MSS and `ssthresh = 32` MSS. Over one RTT, it sends 40 packets and receives 40 corresponding ACKs. What will the new values of `cwnd` and `ssthresh` be?
2.  A connection has `cwnd = 10` MSS and `ssthresh = 12` MSS. It sends 10 packets. The 4th packet is lost. Assuming the receiver has a large enough buffer, describe the sequence of ACKs the sender receives and the precise changes to `cwnd` and `ssthresh` that result.
3.  A satellite link has a bandwidth of 1 Gbps and an RTT of 500 ms. If a TCP Reno connection using this link experiences a single packet loss, roughly how long will it take for it to recover to its full sending rate using its linear increase mechanism? Why is a cubic growth function (like in CUBIC) fundamentally better suited for this scenario?