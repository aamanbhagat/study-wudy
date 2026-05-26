## 1. The one-sentence answer
**Scheduling goals define quantitative metrics that an operating system uses to judge how well its CPU scheduler balances efficiency, fairness and responsiveness for processes.**

Yeh metrics aapko batate hain ki scheduler ne CPU ko kitna busy rakha, kitne processes jaldi complete hue, aur har process ne kitna time wait kiya. CPU utilization aur throughput system ke overall throughput ko maximise karte hain jabki turnaround, waiting aur response time individual processes ke experience ko measure karte hain. Ek accha scheduler in teeno ko simultaneously optimise karne ki koshish karta hai lekin trade-offs hamesha rehte hain.

> [!NOTE]
> Sabse badi aha yeh hai ki waiting time aur response time alag-alag cheezein hain — ek process ka total wait time zero bhi ho sakta hai lekin uska first response late aa sakta hai agar burst bahut lamba ho.

## 2. Why this matters — concrete and current
Linux CFS scheduler (Completely Fair Scheduler) continuously tracks per-task waiting time aur response time taaki interactive desktop workloads smooth rahein; Google ke Borg cluster scheduler production jobs ke liye CPU utilization aur throughput ko primary objective banata hai taaki thousands of containers ek hi machine par efficiently chal sakein.

Android ke latest kernel (EAPF patches) response time ko aggressively optimise karta hai foreground apps ke liye kyunki user touch latency directly is metric par depend karti hai.

Semiconductor fabs mein real-time scheduling (VxWorks ya QNX) turnaround time ko minimise karta hai taaki wafer processing steps ke beech idle time zero ke kareeb rahe.

ML training clusters (PyTorch DistributedDataParallel + Kubernetes) throughput ko maximise karte hain kyunki har GPU-second ka cost direct model convergence speed ko affect karta hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Process state diagram (ready, running, blocked) | Metrics sirf ready queue aur CPU burst ke beech calculate hote hain |
| Burst time / service time | Har metric ka calculation is value par directly depend karta hai |
| Arrival time         | Turnaround aur waiting dono arrival se shuru hote hain    |
| Gantt chart          | Visual representation ke bina overlapping bursts samajhna mushkil hai |

## 4. Building the idea — from intuition to formalism

### Step 1 — CPU utilization as fraction of busy time
Aapko pehle yeh samajhna hai ki CPU kitna time actually kaam kar raha tha. Agar ek second mein CPU sirf 800 ms busy tha to utilization 80 % hai. Iska matlab hai scheduler ne idle time ko minimise kiya.

Example: 10 ms ke liye process chal raha hai, 2 ms idle — utilization = 10/12.

Formal statement:  
$$U = \frac{\sum \text{CPU busy time}}{\text{total elapsed time}}$$

> [!WARNING]
> Agar aap idle time ko sirf context-switch overhead ke saath count karte ho to U galat ho jaayega kyunki I/O wait ko bhi idle mana jaata hai.

### Step 2 — Throughput as completion rate
Throughput count karta hai kitne processes ek unit time mein finish hue. Iska intuition seedha hai — jitna zyada complete hua utna accha scheduler.

Example: 5 processes 100 ms mein khatam hue to throughput = 50 processes/second.

Formal statement:  
$$\text{Throughput} = \frac{\text{number of processes completed}}{T}$$

### Step 3 — Turnaround time as total lifetime
Turnaround time arrival se lekar completion tak ka poora interval hai. Iska matlab process ne system mein kitna time spend kiya including wait aur execution.

Formal statement:  
$$T_i = C_i - A_i$$  
jahan \(C_i\) completion time aur \(A_i\) arrival time hai.

### Step 4 — Waiting time as pure queue delay
Waiting time sirf ready queue mein bitaya gaya time hai. Execution time aur I/O time isme count nahi hote.

Formal statement:  
$$W_i = T_i - \text{burst}_i$$

### Step 5 — Response time as first-output latency
Response time arrival se lekar pehli output (ya first CPU allocation) tak ka time hai. Yeh interactive systems ke liye sabse critical metric hai.

Formal statement:  
$$R_i = F_i - A_i$$  
jahan \(F_i\) first response time hai.

### Step 6 — Normalised metrics for comparison
Different length ke processes ko compare karne ke liye har metric ko burst time se divide kar dete hain. Iska result ek dimensionless ratio deta hai.

Formal statement:  
$$\text{Normalised turnaround} = \frac{T_i}{\text{burst}_i}$$

## 5. Worked examples — har step show karo

**Example 1 — Single process CPU utilization**  
*Given:* Process arrives at t=0, runs for 40 ms, then I/O for 10 ms. Total observation window = 50 ms.  
*Find:* CPU utilization.  
Step 1: Identify busy interval = 40 ms.  
Step 2: Divide by total time: 40/50.  
*Why:* I/O interval ko idle mana jaata hai isliye numerator mein nahi aayega.  
**0.8**

*Reflection:* Simple case hai lekin I/O ko galti se busy count karna common mistake hai.

**Example 2 — Throughput with two processes**  
*Given:* P1 (burst 20 ms) aur P2 (burst 30 ms) dono t=0 par aate hain, non-preemptive FCFS.  
*Find:* Throughput in processes per second.  
Step 1: P1 finishes at 20 ms, P2 at 50 ms.  
Step 2: 2 processes / 0.05 s = 40 processes/s.  
*Why:* Total elapsed time last completion par end hota hai.  
**40**

*Reflection:* Short bursts throughput ko artificially high dikha sakte hain.

**Example 3 — Turnaround and waiting together**  
*Given:* P1 arrives 0, burst 10; P2 arrives 2, burst 5. FCFS.  
*Find:* Average turnaround and average waiting.  
Step 1: P1 turnaround = 10-0 = 10, waiting = 0.  
Step 2: P2 turnaround = 15-2 = 13, waiting = 13-5 = 8.  
Step 3: Average turnaround = (10+13)/2 = 11.5.  
*Why:* Waiting = turnaround − burst is standard identity.  
**11.5, 4**

*Reflection:* Arrival difference ko ignore karna calculation ko galat kar deta hai.

**Example 4 — Response time under preemption**  
*Given:* P1 burst 20 arrives 0; P2 burst 5 arrives 3. RR with q=4.  
*Find:* Response time of P2.  
Step 1: P1 runs 0-4, P2 gets first slice 4-8.  
Step 2: Response time = 4-3 = 1.  
*Why:* First allocation hi response time define karti hai.  
**1**

*Reflection:* Round-robin response time ko dramatically improve karta hai lekin throughput thoda gir sakta hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Counting I/O time in waiting time | Students confuse blocked state with ready queue | Waiting time definition ko strictly “ready queue only” yaad rakho |
| Using completion time instead of first response | Response time ko turnaround se confuse karte hain | Response time ke liye explicitly “first CPU allocation” likho |
| Forgetting to normalise when comparing processes | Different burst lengths ko direct compare karte hain | Normalised turnaround formula hamesha apply karo |
| Taking total time as sum of bursts only | Context-switch overhead aur idle time bhool jaate hain | Observation window ko clearly define karo |
| Assuming FCFS gives minimum average waiting | SJF ya SRTF ke comparison mein galat conclusion | Har algorithm ke liye metrics alag-alag calculate karo |
| Ignoring arrival time in throughput | Sochte hain sab processes t=0 par aaye | Throughput calculation mein last completion time use karo |

## 7. The textbook-precise statement
In Silberschatz, Galvin and Gagne, *Operating System Concepts*, 10e, §5.1, the five classic scheduling criteria are defined as follows. Let \(A_i\), \(C_i\), \(F_i\) and \(B_i\) be the arrival, completion, first-response and CPU-burst times of process \(i\). Then:

CPU utilization = fraction of time the CPU is busy;  
Throughput = number of processes completed per unit time;  
Turnaround time of process \(i\) = \(C_i - A_i\);  
Waiting time of process \(i\) = turnaround time − \(B_i\);  
Response time of process \(i\) = \(F_i - A_i\).

All five quantities are evaluated over a finite observation interval that begins at the earliest arrival and ends at the latest completion.

## 8. Visual — diagram or schematic
```
t=0     5      10     15     20
|-------|-------|-------|-------|
P1[====]P2[==]P1[===]P2[=] idle
```
Label:  
- [====] = CPU burst segment  
- Vertical lines mark arrival (P2 at t=5) and completion events  
- Idle gap at end shows utilisation < 1

## 9. The memory technique
1. **The hook** — Imagine a car dashboard: speedometer = CPU utilization, odometer = throughput, trip timer = turnaround, traffic-light wait = waiting time, steering response = response time.
2. **What to overlearn** — Waiting time = turnaround − burst; response time uses first allocation only; normalised turnaround is always ≥ 1.
3. **Spaced-repetition schedule** — Review formulas after 1 day, 3 days, 7 days, 16 days, 35 days with one new Gantt chart each time.
4. **First-principles fallback** — Agar formula bhool jaaye to Gantt chart banao, har process ke liye arrival se lekar har event tak timeline draw karo, phir direct subtraction se metrics nikaal lo.

## 10. What this unlocks
Yeh metrics aapko next topics jaise FCFS, SJF, Round-Robin, Priority aur Multilevel Feedback Queue schedulers ke comparison ke liye ready karte hain. Inke basis par aap preemption decisions, quantum size tuning aur fairness proofs samajh paoge.

- CPU burst prediction (exponential averaging)
- Priority inversion handling
- Real-time deadline scheduling (EDF, Rate Monotonic)

## 11. Self-check — five questions, no answers
1. Ek process ka waiting time zero hai lekin response time 12 ms hai — yeh kaise possible hai?
2. Do identical bursts wale processes mein se ek ka turnaround 2× burst hai — dusre ka normalised turnaround kya hoga?
3. Agar context switch time ko zero maan lein to throughput kis cheez par depend karega?
4. Round-robin quantum ko bahut chhota karne se kaunsa metric sabse zyada kharab hota hai?
5. Ek workload mein average turnaround gir gaya lekin CPU utilization bhi gir gayi — yeh kis algorithm ka sign ho sakta hai?