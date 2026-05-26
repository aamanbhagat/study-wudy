## 1. The one-sentence answer
**TCP congestion control** dynamically adjusts the congestion window (cwnd) using slow start, congestion avoidance, fast retransmit and CUBIC so that a sender never overwhelms the network while still utilising available bandwidth.

TCP sender har RTT mein cwnd badhata ya ghatata hai. Slow start phase mein cwnd exponentially badhta hai jab tak koi loss na ho; loss ke baad congestion avoidance linear growth par switch karta hai. Fast retransmit three duplicate ACKs par turant packet retransmit karta hai bina timeout ka intezaar kiye. CUBIC modern default algorithm hai jo cubic function use karta hai taaki high-bandwidth, long-delay links par bhi fair aur efficient throughput mile.

> [!NOTE]
> Sabse badi “aha” yeh hai ki loss sirf congestion ka signal nahi hota; modern networks mein loss random bhi ho sakta hai, isliye CUBIC jaise algorithms loss ko differently interpret karte hain aur throughput ko aggressively badhate hain jab network stable lage.

## 2. Why this matters — concrete and current
Google QUIC aur HTTP/3 stack CUBIC (ya BBR) use karta hai taaki mobile aur inter-continental traffic mein packet loss ke bawajood bhi low latency mile.  
Linux kernel 5.x+ default TCP_CUBIC chalata hai; almost saare cloud VMs, containers aur data-centre traffic iske through jaate hain.  
AWS aur Azure ke global backbone links par CUBIC ka cubic window growth high-BDP (bandwidth-delay product) paths par line-rate achieve karne mein madad karta hai.  
SpaceX Starlink jaise LEO satellite networks congestion control ke fast reaction par depend karte hain kyunki RTT 20–40 ms ke beech jump karta rehta hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| RTT, sequence number, ACK | Sender ko pata chalna chahiye ki packet reach hua ya nahi |
| Sliding window & cwnd    | cwnd hi woh variable hai jo algorithms control karte hain |
| Duplicate ACK            | Fast retransmit ka trigger yahi hota hai                  |
| Timeout (RTO)            | Slow start threshold reset karne ka classical signal      |

Agar upar ke concepts clear nahi hain to pehle basic TCP reliable transfer padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Sender starts conservatively
TCP sender shuru mein cwnd = 1 MSS rakhta hai taaki network ko suddenly overload na kare.  
Example: 1 KB MSS wala connection pehla packet bhejta hai aur ACK aane ka intezaar karta hai.  
Formal: \( cwnd \leftarrow MSS \).  
> [!WARNING] Agar aap yahan cwnd ko arbitrarily bada set kar do to network turant congestion collapse mein chala jaayega.

### Step 2 — Slow start: exponential probing
Har successful ACK par cwnd double ho jaata hai. Growth exponential hai.  
Example: cwnd = 1 → 2 → 4 → 8 MSS.  
Formal: \( cwnd \leftarrow \min(cwnd + MSS, ssthresh) \) jab tak \( cwnd < ssthresh \).  
> [!WARNING] Exponential growth ko ssthresh se pehle rokna bhool jaao to packet burst network ko maar degi.

### Step 3 — Congestion avoidance: linear growth
Jab cwnd ≥ ssthresh ho jaaye, har RTT mein cwnd sirf ek MSS badhta hai.  
Formal: \( cwnd \leftarrow cwnd + \frac{MSS}{cwnd} \) per ACK.  
> [!WARNING] Linear growth ko bhi galat samajh kar exponential hi samajh lena common mistake hai.

### Step 4 — Fast retransmit on three duplicate ACKs
Teen duplicate ACKs milne par sender maanta hai ki packet kho gaya aur turant retransmit karta hai bina RTO ka wait kiye.  
Formal: agar dupACK count = 3 to retransmit earliest unacknowledged segment.  
> [!WARNING] Sirf ek duplicate ACK par retransmit karna galat hai kyunki out-of-order delivery bhi duplicate ACK generate karti hai.

### Step 5 — CUBIC window update (modern default)
CUBIC cwnd ko cubic function se badhata hai:  
\[ W(t) = C(t-K)^3 + W_{\max} \]  
jahan \( K = \sqrt[3]{\frac{W_{\max}\beta}{C}} \).  
Yeh high-BDP links par bhi fair aur stable throughput deta hai.

## 5. Worked examples

**Example 1 — Pure slow start**  
*Given:* MSS = 1000 B, ssthresh = 8 KB, initial cwnd = 1 KB.  
*Find:* cwnd after 3 successful RTTs.  
Step 1: RTT 1 → cwnd = 2 KB (Why: every ACK doubles).  
Step 2: RTT 2 → cwnd = 4 KB.  
Step 3: RTT 3 → cwnd = 8 KB.  
**Final answer: 8 KB**  
*Reflection:* Slow start threshold tak pahunchne tak exponential growth hoti hai.

**Example 2 — Transition to congestion avoidance**  
*Given:* cwnd reaches 8 KB, ssthresh = 8 KB. Next RTT mein koi loss nahi.  
*Find:* cwnd after next RTT.  
Step: cwnd ≥ ssthresh, isliye linear: cwnd += 1 KB → 9 KB.  
**Final answer: 9 KB**  
*Reflection:* Linear growth bandwidth ko gently probe karta hai.

**Example 3 — Fast retransmit trigger**  
*Given:* Segments 1,2,3,4 bheje; ACK 1 aaya, phir teen duplicate ACK 1 aaye.  
*Find:* Action.  
Step: dupACK count = 3 → retransmit segment 2 immediately.  
**Final answer: retransmit segment 2**  
*Reflection:* Timeout avoid kiya gaya.

**Example 4 — CUBIC window after loss**  
*Given:* W_max = 100, β = 0.2, C = 0.4, t = K.  
*Find:* W(t) at t = K.  
Step: W(K) = W_max = 100.  
**Final answer: 100 segments**  
*Reflection:* Cubic curve W_max ke aas-paas flat rehti hai, isliye stable rehta hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| cwnd ko hamesha double karna | Slow start aur CA ko mix karna              | ssthresh check karo har RTT                  |
| Ek duplicate ACK par retransmit | Out-of-order packets ko ignore karna       | Strictly 3 dupACKs ka rule yaad rakho        |
| CUBIC ko Reno samajhna      | Cubic function ignore kar dena              | CUBIC equation alag se derive karo           |
| ssthresh ko reset na karna  | Fast recovery ke baad galti                | Loss ke baad ssthresh = cwnd/2 karo          |
| Timeout aur fast retransmit ko same samajhna | RTO aur 3-dupACK difference bhoolna     | Timeline draw karke compare karo             |

## 7. The textbook-precise statement
Kurose & Ross, *Computer Networking: A Top-Down Approach*, 8e, §3.7 states:  
“TCP Tahoe and Reno employ slow-start and congestion-avoidance phases. Upon three duplicate ACKs, Reno performs fast retransmit and fast recovery. Modern TCP CUBIC replaces Reno’s linear increase with a cubic function of time since last loss:  
\[ W(t) = C(t-K)^3 + W_{\max} \]  
where \( K = \sqrt[3]{\frac{W_{\max}\beta}{C}} \), \(\beta=0.2\), \(C=0.4\). All phases assume that packet loss indicates congestion unless otherwise detected by ECN.”

## 8. Visual — diagram or schematic
```
Time (RTT)
  ^
  |          CUBIC curve
  |        /‾‾‾‾‾‾‾‾‾\
  |       /           \
  |      /  slow start \  congestion avoidance
  |     /   (expon)     \   (linear)
  |    /                 \
  |   *                   *---*---*
  +-----------------------------------> cwnd
       1   2   4   8  9  10  11 ...
```

## 9. The memory technique
1. **The hook** — Socho ek race-car driver jo pehle accelerator floor karta hai (slow start), phir dheere gas deta hai (CA), aur crash ke baad speedometer ko cubic curve se badhata hai (CUBIC).  
2. **What to overlearn** — ssthresh reset rule, 3 dupACK trigger, CUBIC equation constants (C = 0.4, β = 0.2).  
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.  
4. **First-principles fallback** — “Agar formula bhool jaaye to RTT count karke cwnd ka growth pattern yaad karo: exponential → linear → cubic.”

## 10. What this unlocks
Yeh topic aapko advanced congestion control (BBR, Copa), QUIC, data-centre TCP (DCTCP) aur satellite networks samajhne ke liye ready karta hai.  
- Next: Explicit Congestion Notification (ECN)  
- Bufferbloat mitigation techniques  
- Rate-based congestion control (BBR)

## 11. Self-check — five questions, no answers
1. Ek connection slow-start mein 4 RTT baad kis cwnd par pahunchegi agar ssthresh 16 MSS ho?  
2. Fast retransmit aur timeout mein fundamental difference kya hai?  
3. CUBIC ka cubic term kis problem ko solve karta hai jo Reno nahi kar paata?  
4. Agar ssthresh galti se bahut chhota set ho jaaye to throughput par kya asar padega?  
5. Teen duplicate ACKs aane ke baad bhi agar packet successfully retransmit ho jaaye, to next phase kaunsi hogi?