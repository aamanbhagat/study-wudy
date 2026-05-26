## 1. The one-sentence answer
**TCP congestion control is the sender-side mechanism that grows and shrinks the congestion window (cwnd) to transmit at the highest rate the network can sustain without collapse.**

In its simplest form the algorithm treats packet loss as a congestion signal. The sender maintains a congestion window that limits how many unacknowledged bytes may be in flight. When an ACK arrives the window grows; when loss is detected the window shrinks. This feedback loop keeps aggregate traffic below link capacity while still utilizing available bandwidth.

The four named phases implement that loop at different operating points. Slow start probes for capacity with exponential growth. Congestion avoidance then increases the window linearly to avoid overshoot. Fast retransmit recovers from isolated losses without waiting for a full timeout. CUBIC replaces the linear growth of Reno with a cubic function centered on the last known safe rate, giving better performance on high-bandwidth-delay paths.

> [!NOTE]
> The single most important insight is that packet loss is used as a *proxy* for queue overflow; the algorithm never measures queue length directly yet still converges to a stable operating point.

## 2. Why this matters — concrete and current
Google’s BBR and QUIC deployments on YouTube and Google Cloud rely on CUBIC as the default fallback; any regression in CUBIC immediately affects video start-up latency for billions of sessions.

AWS, Azure, and Cloudflare tune CUBIC parameters on their edge servers because the cubic curve determines how quickly a new flow can claim spare capacity after a competing flow departs, directly affecting tail latency of API calls.

SpaceX Starlink uses a modified CUBIC variant on its satellite links; the high bandwidth-delay product and frequent packet reordering make the fast-retransmit threshold and cubic backoff critical for maintaining TCP throughput above 100 Mbps per terminal.

The Linux kernel’s tcp_cubic module is shipped on >90 % of cloud VMs; every major machine-learning training run that reads datasets over the network therefore inherits the exact growth and reduction rules described here.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Sliding-window flow control | cwnd is superimposed on the receiver’s advertised window  |
| Cumulative ACKs      | Duplicate ACKs are the only loss signal used by fast retransmit |
| RTT estimation       | CUBIC’s cubic function is evaluated against elapsed time since last loss |
| Bandwidth-delay product | Sets the scale at which slow start must finish before congestion avoidance begins |

## 4. Building the idea — from intuition to formalism

### Step 1 — The congestion window as the only rate limiter
The sender may have at most cwnd bytes outstanding. Each ACK that advances the window permits one more segment to be sent.  
Example: cwnd = 3000 bytes, MSS = 1000 bytes → three segments may be sent before any ACK returns.  
Formal statement:  
$$ \text{flight} = \text{last_sent} - \text{last_acked} \le \text{cwnd}. $$  
> [!WARNING] Treating the receiver window rwnd as the only limit will cause buffer overflow at the bottleneck when rwnd is large.

### Step 2 — Slow start: exponential probe
While cwnd < ssthresh, each ACK increases cwnd by one MSS.  
Example: cwnd = 1 MSS, four ACKs arrive → cwnd becomes 2, 4, 8, 16 MSS.  
Formal statement:  
$$ \text{cwnd} \leftarrow \text{cwnd} + \text{MSS} \quad \text{per ACK}. $$  
> [!WARNING] Forgetting to double on every ACK (instead of every RTT) produces linear rather than exponential growth and starves long fat pipes.

### Step 3 — Congestion avoidance: linear growth
After ssthresh is reached, cwnd grows by one MSS per RTT.  
Formal statement:  
$$ \text{cwnd} \leftarrow \text{cwnd} + \frac{\text{MSS}^2}{\text{cwnd}} \quad \text{per ACK}. $$  
> [!WARNING] Using the slow-start increment after ssthresh produces overshoot and repeated loss.

### Step 4 — Fast retransmit on three duplicate ACKs
Three duplicate ACKs imply that a segment was lost while later segments arrived. Retransmit immediately and set ssthresh = cwnd/2.  
Formal statement: on receiving the third duplicate ACK,  
$$ \text{retransmit the missing segment}; \quad \text{ssthresh} \leftarrow \max(\text{FlightSize}/2, 2\cdot\text{MSS}). $$  
> [!WARNING] Waiting for the retransmission timer instead of three duplicate ACKs adds a full RTT of idle time.

### Step 5 — CUBIC window update
CUBIC records the window at the last loss (W_max) and computes the next window from a cubic function of elapsed time since that loss:  
$$ W(t) = C(t-K)^3 + W_{\max}, \quad K = \sqrt[3]{\frac{W_{\max}\beta}{C}}. $$  
C = 0.4, β = 0.2 in RFC 8312.  
> [!WARNING] Using Reno’s linear term instead of the cubic term after a loss on a 100 ms RTT, 10 Gbps path yields <30 % utilization.

## 5. Worked examples — every step shown

**Example 1 — Slow-start growth for one RTT**  
*Given:* cwnd = 2 MSS, ssthresh = 16 MSS, every ACK acknowledges one MSS.  
*Find:* cwnd after one RTT (four ACKs).  
cwnd = 2 → send 2 segments.  
Four ACKs arrive → each adds 1 MSS.  
cwnd = 2 + 4 = 6 MSS.  
*Why* each ACK adds one MSS: the slow-start rule increments per ACK, not per RTT.  
**Final answer: 6 MSS**

*Reflection:* The exponential doubling occurs only because the number of ACKs doubles each RTT.

**Example 2 — Crossing ssthresh**  
*Given:* cwnd = 8 MSS, ssthresh = 10 MSS.  
*Find:* cwnd after next RTT with eight ACKs.  
First four ACKs keep sender in slow start: cwnd = 8 + 4 = 12 MSS.  
Because 12 > 10, the remaining four ACKs use congestion avoidance.  
Each adds MSS²/cwnd ≈ 1/12 MSS.  
cwnd ≈ 12 + 4/12 = 12.33 MSS.  
**Final answer: ≈12.33 MSS**

*Reflection:* The transition is abrupt; many implementations test the inequality after every ACK.

**Example 3 — Fast retransmit**  
*Given:* segments 1–10 sent, cwnd = 10 MSS, segment 4 is lost, segments 5–7 arrive.  
*Find:* action on third duplicate ACK for segment 3.  
Duplicate ACK count reaches three → retransmit segment 4.  
ssthresh = 10/2 = 5 MSS.  
Enter fast recovery.  
**Final answer: retransmit segment 4, ssthresh = 5 MSS**

*Reflection:* The three-duplicate-ACK threshold filters reordering of depth two.

**Example 4 — CUBIC window after 200 ms**  
*Given:* W_max = 100 MSS, loss occurred at t = 0, C = 0.4, β = 0.2, RTT = 100 ms.  
*Find:* W(200 ms).  
K = ∛(100·0.2/0.4) = ∛50 ≈ 3.68 RTTs ≈ 368 ms.  
W(200 ms) = 0.4(200-368)³ + 100 ≈ 0.4(-168)³ + 100 ≈ 21.4 MSS.  
**Final answer: ≈21.4 MSS**

*Reflection:* The cubic term is still below W_max because 200 ms < K.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using timeout instead of three duplicate ACKs | Belief that only timer expiry signals loss | Count duplicate ACKs explicitly in code |
| Incrementing cwnd by 1 per RTT in slow start | Confusing “per ACK” with “per RTT” | Increment once for every ACK received |
| Leaving ssthresh at its initial value of 64 KB on a 10 Gbps path | Never updating ssthresh after first loss | Set ssthresh = FlightSize/2 on every loss |
| Ignoring RTT in CUBIC’s t variable | Treating t as segment count | Measure t in milliseconds since last loss |
| Applying β = 0.5 (Reno) to CUBIC | Copying old constant | Use RFC 8312 β = 0.2 |
| Forgetting to halve cwnd on spurious retransmission | No detection of false fast retransmit | Implement F-RTO or DSACK checks |
| Starting CUBIC with W_max = 0 | First loss never recorded | Initialize W_max to initial cwnd or 10 MSS |

## 7. The textbook-precise statement
TCP congestion control comprises four algorithms—slow start, congestion avoidance, fast retransmit, and fast recovery—defined in RFC 5681, together with the CUBIC replacement for the congestion-avoidance and fast-recovery phases specified in RFC 8312. Let cwnd be the congestion window in bytes, ssthresh the slow-start threshold, and W_max the window size at the most recent loss event. While cwnd < ssthresh, cwnd is increased by one maximum segment size per ACK. When cwnd ≥ ssthresh, cwnd is increased by MSS²/cwnd per ACK. On three duplicate ACKs the missing segment is retransmitted, ssthresh is set to max(FlightSize/2, 2·MSS), and CUBIC governs subsequent growth via  
$$ W(t)=C(t-K)^3+W_{\max},\qquad K=\sqrt[3]{\frac{W_{\max}\beta}{C}} $$  
with C = 0.4, β = 0.2. (Kurose & Ross, *Computer Networking: A Top-Down Approach*, 8e, §3.7; RFC 8312, §4.)

## 8. Visual — diagram or schematic
```text
cwnd (MSS)
   ^
100 |                  *CUBIC curve
   |               *
 50 |            *
   |         *
 10 |      *   slow start (exponential)
   |   *
  2 |*
   +-----------------------------------> time (RTTs)
     0   1   2   3   4   5   6   7   8
          ^ssthresh   ^loss   ^K
```
The diagram shows exponential rise until ssthresh, linear Reno growth (omitted for CUBIC), a loss event that records W_max, then the cubic curve approaching W_max at time K.

## 9. The memory technique

1. **The hook** — Picture a driver who presses the accelerator exponentially until the car fishtails (slow start), then eases off to a gentle linear throttle (congestion avoidance), slams the brakes on three warning lights (fast retransmit), and later follows a smooth cubic acceleration curve back to the previous safe speed (CUBIC).
2. **What to overlearn** — cwnd += MSS per ACK while in slow start; cwnd += MSS²/cwnd per ACK in congestion avoidance; three duplicate ACKs trigger fast retransmit; CUBIC parameters C = 0.4, β = 0.2.
3. **Spaced-repetition schedule** — Review the four phase rules at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the growth rules from the single invariant that the sender must keep flight ≤ cwnd and must reduce cwnd on loss.

## 10. What this unlocks
Mastery of these algorithms is required before studying modern replacements (BBR, Copa), before implementing or tuning transport in QUIC, and before reasoning about fairness in shared bottlenecks.

- TCP BBR rate-based control
- QUIC loss detection and pacing
- Datacenter transport (DCTCP, DCQCN)
- Satellite and 5G TCP variants

## 11. Self-check — five questions, no answers
1. A flow begins with cwnd = 1 MSS and ssthresh = 32 MSS. After exactly four RTTs with no loss, what is cwnd?  
2. In congestion avoidance, an ACK arrives that covers 2000 bytes when MSS = 1000 bytes and cwnd = 8000 bytes. By how much does cwnd increase?  
3. Three duplicate ACKs arrive when cwnd = 20 MSS. State the new ssthresh and the next action.  
4. CUBIC records W_max = 200 MSS. Compute K (in RTT units) using RFC 8312 constants.  
5. Why does CUBIC with β = 0.2 converge to a higher fairness point than Reno on a high-BDP link?