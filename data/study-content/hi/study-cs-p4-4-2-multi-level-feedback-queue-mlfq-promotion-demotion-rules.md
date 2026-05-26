## 1. The one-sentence answer
**MLFQ promotion and demotion rules move a process between priority queues based on whether it exhausts its time quantum or yields early for I/O.**

In MLFQ, the scheduler maintains several queues ordered by priority. A newly arrived process starts at the highest queue. If the process consumes its entire time slice without blocking, the scheduler demotes it to the next lower queue on the next scheduling decision. Conversely, if the process voluntarily yields the CPU before the quantum expires, it typically remains in the same queue or receives a promotion boost on some implementations.

These movement rules prevent CPU-bound jobs from starving interactive jobs while still allowing long-running tasks to make forward progress at lower priorities. The exact thresholds for demotion (quantum length) and promotion (aging or I/O frequency) are policy parameters that the operating-system designer tunes.

> [!NOTE]
> The core insight is that CPU usage history becomes the priority signal itself; no separate “interactive” flag is required because the scheduler observes actual behaviour at runtime.

## 2. Why this matters — concrete and current
Linux’s Completely Fair Scheduler (CFS) still contains legacy nice-level adjustments that echo MLFQ demotion logic; when a thread consumes more than its fair share, its effective priority is lowered exactly as an MLFQ demotion would do.  
Windows 11’s scheduler uses a multi-level feedback mechanism for foreground versus background app classification; an app that repeatedly exhausts its quantum is moved to a lower “background” queue, improving battery life on laptops.  
Google’s Borg and Kubernetes kube-scheduler apply similar feedback queues when placing long-running batch jobs versus latency-sensitive micro-services; a pod that uses its full CPU allocation is demoted to a best-effort QoS class.  
Modern chiplet-based server SoCs (AMD EPYC, Intel Xeon) expose hardware performance counters that the OS reads to decide promotion back to high-priority queues after a thread has been throttled, directly implementing the MLFQ aging rule in silicon-assisted form.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Priority queue       | MLFQ is literally a set of priority queues                |
| Time quantum         | Demotion decision is triggered exactly when a quantum expires |
| Process state (ready/blocked) | Promotion often depends on whether a process blocked for I/O |
| Aging / starvation avoidance | Without promotion rules, low-priority jobs never run      |

If any row above is unfamiliar, pause and review the corresponding section on basic process scheduling before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Multiple queues with fixed priorities
The system maintains \(N\) queues \(Q_0, Q_1, \dots, Q_{N-1}\) where a lower index denotes higher priority.  
Example: three queues \(Q_0\) (quantum 4 ms), \(Q_1\) (quantum 8 ms), \(Q_2\) (quantum 16 ms).  
Formal rule: at any scheduling point the dispatcher always selects the head of the lowest-index non-empty queue.  
> [!WARNING]  
> Treating all queues as equal priority collapses the entire scheme to round-robin.

### Step 2 — Initial placement and first demotion
Every new or woken process is inserted at the tail of \(Q_0\).  
If the process runs for its full quantum without yielding, it is moved to the tail of \(Q_1\) after the timer interrupt.  
Formal statement: after consuming \(q_i\) ms in queue \(Q_i\), the process priority becomes \(i+1\) (modulo \(N\)).

### Step 3 — I/O yield keeps priority
When a process blocks before its quantum expires, it is placed back into the same queue upon becoming ready again.  
This rule encodes the heuristic “short CPU bursts imply interactive work”.

### Step 4 — Promotion via periodic boost
To prevent starvation, every \(T\) ms the scheduler may promote every ready process one level (or directly to \(Q_0\)).  
Typical value in classic BSD: \(T = 1\) s.

### Step 5 — Quantum lengthening at lower queues
Lower queues receive longer quanta so that CPU-bound work still makes progress; the lengthening factor is usually a power of two.

### Step 6 — Formal transition function
Let \(P\) be a process, \(Q(P)\) its current queue index, \(R(P)\) remaining quantum.  
\[
Q'(P) = 
\begin{cases}
Q(P) & \text{if } R(P) > 0 \text{ at yield} \\
\min(Q(P)+1, N-1) & \text{if } R(P) = 0 \text{ at timer expiry} \\
\max(Q(P)-1, 0) & \text{if boost period expires}
\end{cases}
\]

## 5. Worked examples — har step show karo

**Example 1 — Simple demotion after full quantum**  
*Given:* Process A arrives, placed in \(Q_0\) (4 ms quantum).  
*Find:* Queue after first 4 ms of continuous execution.  
Step 1: A runs, timer expires after exactly 4 ms.  
Step 2: Because remaining quantum = 0, apply demotion rule.  
Step 3: Move A to tail of \(Q_1\).  
**Final answer**  
A is now at the tail of \(Q_1\).  
*Reflection:* The move happened solely because the quantum was exhausted; no other metric was consulted.

**Example 2 — I/O yield preserves priority**  
*Given:* Process B in \(Q_0\) runs 2 ms then issues disk read.  
*Find:* Queue when B becomes ready again.  
Step 1: B blocks with 2 ms left.  
Step 2: On I/O completion, B is inserted at tail of same queue \(Q_0\).  
**Final answer**  
B remains in \(Q_0\).  
*Reflection:* Early yield is treated as evidence of interactive behaviour.

**Example 3 — Promotion after boost interval**  
*Given:* Process C has been in \(Q_2\) for 1 s; boost period = 1 s.  
*Find:* Queue immediately after boost.  
Step 1: Scheduler scans all ready processes.  
Step 2: C’s index is decremented by 1.  
**Final answer**  
C moves to \(Q_1\).  
*Reflection:* The boost is independent of recent CPU usage and only prevents starvation.

**Example 4 — Mixed sequence with lengthening quanta**  
*Given:* Process D starts in \(Q_0\) (4 ms). It runs 4 ms → demoted to \(Q_1\) (8 ms). In \(Q_1\) it runs 3 ms then blocks.  
*Find:* Queue and remaining quantum when D wakes.  
Step 1: First demotion places D in \(Q_1\) with fresh 8 ms quantum.  
Step 2: D blocks after 3 ms, so 5 ms remain.  
Step 3: On wake-up D returns to \(Q_1\) with the remaining 5 ms.  
**Final answer**  
D is in \(Q_1\) with 5 ms left.  
*Reflection:* Partial consumption does not trigger further demotion; only full-quantum exhaustion does.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting that I/O yield keeps the same queue | Students assume every context switch causes demotion | Check the yield-versus-expiry condition before moving the PCB |
| Applying boost to blocked processes | Boost code walks only the ready queues | Verify the data structure being scanned during the boost timer |
| Using identical quanta for all levels | Designer copies the top-level quantum everywhere | Make lower-level quanta at least double the level above |
| Ignoring modulo-N wrap-around on demotion | Last queue has nowhere lower to go | Add an explicit “stay in \(Q_{N-1}\)” clause |
| Promoting a process that just arrived | Boost timer fires immediately after creation | Reset a per-process “boost credit” flag on creation |
| Starvation of \(Q_{N-1}\) when boost interval is too long | 1-second boost is insufficient under heavy load | Measure worst-case wait time and tune \(T\) accordingly |

## 7. The textbook-precise statement
In Operating System Concepts, 10th edition (Silberschatz, Galvin, Gagne), §5.3.5 the multi-level feedback queue is defined by the following transition relation on the tuple \((queueIndex, remainingQuantum)\):

Let \(Q_i\) be the \(i\)-th queue with time slice \(q_i\). A process \(p\) transitions from \((i, r)\) to \((i+1, q_{i+1})\) exactly when a timer interrupt occurs and \(r = 0\). It remains at \((i, r - \Delta t)\) when it voluntarily blocks with \(r > 0\). A separate periodic aging rule moves every ready process from \((i, r)\) to \((\max(i-1,0), q_{i-1})\) every \(T\) time units.

## 8. Visual — diagram or schematic
```
Priority
  0  [Q0: 4 ms] → head ... tail
  1  [Q1: 8 ms] → head ... tail
  2  [Q2:16 ms] → head ... tail
      ↑ demote          ↑ promote (boost)
   full quantum      aging timer
```

## 9. The memory technique
1. **The hook** — Picture three airport security lanes: lane 0 is “first class” (short quantum), lane 2 is “economy” (long quantum). A passenger who stays too long in any lane is sent to the back of the next slower lane; a passenger who leaves early stays in the fast lane.  
2. **What to overlearn** — Demotion occurs only on quantum expiry; I/O yield never demotes; boost period is the only promotion mechanism.  
3. **Spaced-repetition schedule** — Review the transition function after 1 day, 3 days, 7 days, 16 days, and 35 days.  
4. **First-principles fallback** — Re-derive the next queue index by asking “Did the process finish its allotted slice or did it block early?”

## 10. What this unlocks
Once promotion and demotion rules are solid, you can analyse or implement fair-share extensions, lottery scheduling hybrids, and container-aware QoS classes.  

- Linux nice-level decay  
- cgroup cpu.max throttling  
- Real-time priority inheritance protocols  
- Feedback-directed optimisation in JIT compilers  

## 11. Self-check — five questions, no answers
1. A process in \(Q_1\) blocks after 1 ms of an 8 ms quantum. Which queue will it occupy on the next dispatch?  
2. If the boost interval is set to infinity, which class of jobs will starve?  
3. Draw the queue state after three full-quantum demotions starting from \(Q_0\).  
4. Why does lengthening the quantum at lower levels not violate the “interactive first” goal?  
5. A newly created process receives a boost credit at the same instant it is inserted. Does it start in \(Q_0\) or \(Q_1\)?