## 1. The one-sentence answer
**Scheduling on multiprocessors with load balancing and affinity means distributing runnable threads across multiple CPUs while preferring to keep each thread on the same CPU it ran before.**

Load balancing ensures no CPU sits idle while another is overloaded. Without it, overall throughput drops because some cores finish work early and wait. Affinity, on the other hand, keeps a thread on its previous core so that the thread’s data stays in that core’s cache. Moving a thread often flushes useful cache lines and forces expensive memory fetches on the new core.

Aap soch sakte ho ki load balancing ek global fairness ka kaam karta hai aur affinity local speed ka. Dono ko saath mein balance karna padta hai warna system ya toh cache misses se bhara rahega ya kuch cores waste hote rahenge.

> [!NOTE]
> The core insight is that cache warmth usually beats perfect balance; modern schedulers therefore migrate only when imbalance crosses a threshold that justifies the cache cost.

## 2. Why this matters — concrete and current
Linux’s Completely Fair Scheduler (CFS) on x86-64 servers uses load balancing every 4 ms via the `load_balance()` function; Google’s Borg and Kubernetes both inherit the same principle when placing containers on multi-socket machines.

AWS Graviton3 and Intel Xeon Sapphire Rapids chips contain 64–128 cores; without affinity-aware scheduling, cache-coherent traffic across the mesh interconnect rises sharply and memory latency for ML training jobs increases by 30–40 %.

In aerospace flight-control software certified under DO-178C, ARINC 653 partitioning on multicore processors requires explicit core affinity so that a safety-critical thread never migrates and invalidates its WCET analysis.

NVIDIA’s CUDA MPS server on A100 GPUs schedules multiple CUDA contexts; its internal load balancer uses affinity hints to keep a context’s working set inside one SM cluster, directly affecting achieved TFLOPS on large language-model inference.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Single-CPU process scheduling (ready queue, context switch) | Baseline to understand what changes when multiple CPUs exist |
| CPU cache hierarchy (L1/L2/L3, cache lines) | Explains why moving a thread is expensive                 |
| Notion of thread and process state (running, runnable, blocked) | Needed to decide which entities the scheduler can migrate |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from one CPU
Aap already jaante ho ki ek CPU par ek ready queue hoti hai aur scheduler usme se next thread chunta hai. Ab do CPUs ho jaayein toh dono apni apni queues dekh sakte hain.

Example: CPU 0 par 3 threads, CPU 1 par 0 threads. Load balancing yeh detect karega ki imbalance hai.

Formal statement: Let \(C = \{c_1, \dots, c_n\}\) be CPUs and \(Q_i\) the runnable set on \(c_i\). Imbalance exists when \(\max |Q_i| - \min |Q_i| > \delta\) for some threshold \(\delta\).

> [!WARNING]
> Agar aap yeh step galat samajh lein aur turant migration kar dein bina threshold ke, toh thrashing shuru ho jaayega.

### Step 2 — Introduce processor affinity
Har thread ek `last_cpu` field rakhta hai. Jab scheduler decide karta hai, woh pehle usi CPU par try karta hai taaki L1/L2 cache warm rahe.

Example: Thread T ne 10 ms CPU 3 par kaam kiya; agar T ko CPU 3 par hi mila toh cache hit rate 85 % rehta hai, warna 40 % ho jaata hai.

Formal: Affinity bonus = \(w \cdot t_{\text{last}}\) where \(t_{\text{last}}\) is time since last execution on same core; migration cost = \(c_{\text{cache}}\).

### Step 3 — Pull vs push migration
Load balancer do tarah se kaam karta hai: pull (idle CPU dusre se maangta hai) aur push (busy CPU extra kaam bhejta hai).

Example: Jab ek core idle ho jaaye, woh `pull_migrate` karta hai nearest overloaded core se.

Formal: Pull condition: \(|Q_{\text{idle}}| = 0 \land |Q_j| > \delta\).

### Step 4 — NUMA and cache domains
Modern chips mein cores groups mein hote hain (NUMA nodes). Migration cost node ke andar kam, node ke bahar zyada hota hai.

Formal: Define topology distance \(d(i,j)\); migration cost proportional to \(d(i,j)\).

### Step 5 — Final scheduler policy
Combined objective: minimise \(\sum \text{load imbalance} + \lambda \cdot \text{cache misses}\). Linux uses periodic `rebalance_domains()` with exactly this trade-off.

## 5. Worked examples

**Example 1 — Trivial two-core case**  
*Given:* CPU 0 has 4 runnable threads, CPU 1 has 0.  
*Find:* Should migration occur?  
Step 1: Compute difference = 4.  
Step 2: Compare with \(\delta = 2\).  
Step 3: Because 4 > 2, one thread moves.  
*Why*: Simple numeric check prevents unnecessary moves.  
**One thread migrates.**

**Example 2 — Affinity with cache cost**  
*Given:* Thread T last ran on CPU 0 for 8 ms; CPU 1 is idle. Load difference = 3.  
*Find:* Migrate or not?  
Step 1: Affinity bonus = 8.  
Step 2: Migration cost ≈ 12.  
Step 3: 8 < 12 so keep T on CPU 0.  
*Why*: Explicit comparison encodes cache economics.  
**No migration.**

**Example 3 — NUMA boundary**  
*Given:* CPU 0 (node 0) overloaded, CPU 8 (node 1) idle, \(d(0,8)=3\).  
*Find:* Migrate?  
Step 1: Local pull cost = 1, remote = 3.  
Step 2: Load difference justifies move only if remote cost < threshold.  
*Why*: Distance factor stops expensive cross-node moves.  
**No migration across nodes.**

**Example 4 — Periodic rebalance**  
*Given:* Four CPUs with loads [5,3,1,1], \(\delta=2\), period 4 ms.  
*Find:* Final loads after one rebalance pass.  
Step 1: Identify max and min.  
Step 2: Move one from CPU 0 to CPU 2.  
Step 3: New loads [4,3,2,1].  
*Why*: One pass reduces variance without oscillation.  
**Loads become [4,3,2,1].**

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Always migrating on any imbalance | Students forget cache cost                  | Compare migration cost with affinity bonus before moving |
| Ignoring NUMA distance      | Treating all cores equal                    | Use topology distance in cost function       |
| Over-frequent balancing     | Setting \(\delta\) too low                  | Tune \(\delta\) from measured cache-miss penalty |
| Forgetting blocked threads  | Only counting runnable threads              | Recompute load after wake-ups                |
| Assuming static affinity    | Threads never change behaviour              | Re-evaluate affinity every few scheduling quanta |

## 7. The textbook-precise statement
In a symmetric multiprocessor, the scheduler maintains per-CPU run queues \(Q_1, \dots, Q_n\). At each rebalance epoch the kernel computes the load of each queue and, when \(\max_i |Q_i| - \min_j |Q_j| > \delta\), selects a thread from the heaviest queue whose migration cost (cache and interconnect) is less than the benefit of reduced imbalance. Processor affinity is expressed by a per-thread preferred CPU and a decay function on the time since last execution on that CPU. (Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §6.5.)

## 8. Visual — diagram or schematic
```
CPU0 [Q: T1,T2,T3]  --pull-->  CPU1 [Q: empty]
          ^                           |
          | affinity                  | push
          |                           v
CPU2 [Q: T4]  <---NUMA link--->  CPU3 [Q: T5,T6]
```
Labelled arrows show pull migration (left) and push migration (right); dashed line indicates higher-cost NUMA hop.

## 9. The memory technique
1. **The hook** — Picture a family of threads sitting around the same kitchen table (their CPU); moving them to another table costs the time to unpack their “groceries” (cache lines).
2. **What to overlearn** — Threshold \(\delta\) and the inequality “affinity bonus > migration cost”.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by writing the cache-miss penalty equation and comparing it with the idle-CPU waiting time.

## 10. What this unlocks
Once you understand multiprocessor load balancing and affinity you can reason about container placement, real-time partitioning, and NUMA-aware data structures.

- Next topics: gang scheduling, work-stealing queues, and cache-aware memory allocators.
- Papers on Linux `SCHED_DEADLINE` and CFS load balancing become readable.
- You can tune `taskset`, `numactl`, and kernel `sched_domain` parameters with understanding.

## 11. Self-check — five questions, no answers
1. Two CPUs show loads 7 and 1; \(\delta=3\). Is migration mandatory?
2. A thread’s last CPU is 2, current loads are balanced, but cache-miss cost of moving is 50 cycles while idle wait is 10 cycles. What should the scheduler do?
3. On a two-node NUMA machine, a thread on node 0 wakes up and node 1 has an idle core. Write the cost comparison.
4. Why does lowering \(\delta\) too much hurt performance even though balance improves?
5. A real-time thread has explicit affinity set; how does the periodic load balancer treat it?