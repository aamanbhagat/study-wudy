## 1. The one-sentence answer
**WCET analysis computes the longest possible execution time of a program fragment on a given processor under all admissible inputs and hardware states.**

Execution time on real hardware varies because of data-dependent branches, cache hits and misses, pipeline stalls, and memory contention. The analyst therefore builds an abstract model of both the program control flow and the processor microarchitecture, then solves for the single execution path that maximises elapsed cycles. The resulting number is not an observed maximum; it is a safe upper bound that holds for every possible run.

Because the bound must be safe, every source of uncertainty—unknown input values, unknown cache contents at entry, unknown interrupt interference—is replaced by its worst-case counterpart. The price of safety is pessimism: the computed WCET is almost always larger than any single measured run.

> [!NOTE]
> The decisive insight is that WCET is not a measurement problem but a maximisation problem over a combined program-plus-hardware state space.

## 2. Why this matters — concrete and current
In Airbus A380 flight-control computers, the DO-178C DAL-A certification requires a verified WCET for every task that can affect flight surfaces; the bound is fed directly into the ARINC 653 partition scheduler.

Tesla Autopilot hardware performs WCET analysis on the neural-network post-processing kernels that run on the HW3 inference engine, ensuring that object-tracking deadlines remain met even when every cache line is evicted by DMA traffic from the vision pipeline.

The Mars 2020 Perseverance rover uses a LEON3FT processor whose real-time operating system relies on WCET figures for the entry-descent-landing sequence; a single missed deadline would have triggered an immediate mission abort.

Modern 5G baseband chips from Qualcomm contain hundreds of real-time threads whose schedulability is proved with WCET bounds obtained from abstract-interpretation tools; an optimistic bound would produce uplink frame drops under worst-case interference from the memory controller.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Control-flow graph (CFG) | WCET is maximised over feasible paths inside the CFG. |
| Processor pipeline & cache model | Timing depends on micro-architectural state, not source-code statements. |
| Integer linear programming | Implicit Path Enumeration Technique encodes path constraints as ILP. |
| Abstract interpretation | Used to compute safe over-approximations of register and cache values. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Execution time is path- and state-dependent
A straight-line sequence of instructions still exhibits variable latency once caches and pipelines are considered.  
Example: two consecutive loads from the same cache line cost 2 cycles on a hit, 200 cycles on a miss.  
Formally, let \( t(\pi, s) \) be the execution time of path \(\pi\) starting from hardware state \( s \).  
> [!WARNING] Treating every memory access as a miss produces a correct but useless bound; treating every access as a hit produces an unsafe bound.

### Step 2 — The CFG encodes all candidate paths
Each basic block \( b_i \) is annotated with its local execution time under every relevant hardware state. Edges carry transition costs (pipeline flush, branch misprediction).  
The set of all paths is the set of all walks from entry to exit in this annotated graph.

### Step 3 — Hardware state must be tracked explicitly
A cache state is an element of a finite lattice \( \mathcal{C} \). Abstract interpretation computes, for each program point, the set of reachable cache states that may affect future timing.

### Step 4 — Implicit Path Enumeration Technique (IPET)
Instead of enumerating paths, we count how often each block and edge is executed. Let \( x_i \) be the execution count of block \( b_i \). The WCET is
\[
\max \sum_i t_i x_i
\]
subject to flow-conservation equations and loop-bound constraints.

### Step 5 — Adding micro-architectural constraints
Cache conflicts and pipeline hazards are expressed as additional linear inequalities over the \( x_i \) variables. The resulting ILP instance is solved by an off-the-shelf solver.

### Step 6 — The textbook statement of WCET
The WCET of a task \(\tau\) is the optimum value of the ILP above, provided the CFG is reducible, all loop bounds are known, and the abstract cache analysis is sound.

## 5. Worked examples — every step shown

**Example 1 — Straight-line code with one memory access**  
*Given:* A single load instruction that may hit or miss in a cold cache.  
*Find:* WCET.  
Step 1: The load costs 1 cycle on hit, 100 cycles on miss.  
*Why:* Hardware manual gives these two latencies.  
Step 2: Because the cache may be cold, the safe choice is the miss penalty.  
*Why:* No prior analysis guarantees a hit.  
**WCET = 100 cycles**

*Reflection:* Even the simplest case already forces an explicit worst-case assumption.

**Example 2 — Loop with constant iteration count**  
*Given:* for(i=0;i<10;i++) a[i]=0;  
*Find:* WCET assuming perfect instruction cache.  
Step 1: Each iteration performs one store; the store always hits after the first iteration.  
*Why:* Write-allocate policy fills the line on first miss.  
Step 2: First store = 100 cycles; remaining 9 stores = 9 cycles.  
*Why:* Flow equations give \( x_{\text{store}} = 10 \).  
**WCET = 109 cycles**

*Reflection:* Loop unrolling or cache-state propagation reduces pessimism.

**Example 3 — Two-path conditional inside a loop**  
*Given:* if (x) heavy(); else light(); with loop bound 5.  
*Find:* WCET when heavy() and light() have different cache footprints.  
Step 1: Encode both branches with variables \( x_h, x_l \).  
*Why:* IPET counts executions of each branch separately.  
Step 2: Add constraint \( x_h + x_l = 5 \).  
*Why:* Loop bound forces total iterations.  
Step 3: Objective becomes \( 200x_h + 20x_l \).  
*Why:* 200-cycle cost for heavy path taken from pipeline model.  
**WCET = 1000 cycles (all iterations take heavy branch)**

*Reflection:* The worst-case path is selected automatically by the optimiser.

**Example 4 — Cache interference from DMA**  
*Given:* A task shares an L1 data cache with a DMA engine that can evict any line.  
*Find:* WCET after adding interference constraints.  
Step 1: Abstract cache analysis yields possible states \( \mathcal{C}_{\text{entry}} \).  
*Why:* Sound over-approximation.  
Step 2: Add inequalities that force every load to pay the miss penalty when the DMA may run concurrently.  
*Why:* Interference is modelled as additional cache-state transitions.  
**WCET = 340 cycles (previously 180 without DMA)**

*Reflection:* Hardware interference must be part of the ILP, not an afterthought.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using measured maximum as WCET | Observed runs never cover the worst hardware state | Always start from a sound abstract model |
| Ignoring cache initial state | Entry cache contents are unknown at task preemption | Perform context-sensitive cache analysis |
| Treating all paths as feasible | Infeasible path combinations inflate the bound | Add ILP constraints from value analysis |
| Neglecting timing anomalies | A cache hit can increase total time on some pipelines | Use a pipeline model that captures anomalies |
| Assuming constant memory latency | Modern DRAM controllers reorder requests | Model memory controller as a separate timed automaton |
| Forgetting interrupt latency | An ISR can evict cache lines mid-task | Include ISR WCET in the schedulability test |
| Overlooking compiler optimisations | Inlining changes CFG and cache behaviour | Analyse the binary actually shipped to the target |

## 7. The textbook-precise statement
Let \( P \) be a straight-line or reducible program, \( \mathcal{H} \) a deterministic microarchitecture, and \( \mathcal{B} \) a set of known loop bounds. The WCET of \( P \) on \( \mathcal{H} \) is the optimum value of the integer linear program constructed by the Implicit Path Enumeration Technique whose variables are block execution counts, whose objective coefficients are basic-block execution times obtained from abstract interpretation of the pipeline and cache, and whose constraints encode flow conservation and the bounds in \( \mathcal{B} \). (Wilhelm et al., “The worst-case execution-time problem—overview of methods and survey of tools”, ACM TECS, 2008).

## 8. Visual — diagram or schematic
```text
Entry
  |
  v
[B1: 20 cy] ----(x1)----> [B2: 35 cy] --+
  |                       |            |
  +--(x2)-->[B3: 80 cy]---+            |
  |                                    |
  v                                    v
Exit <-------------------------------[B4: 10 cy]
```
Labels: \( x_i \) = execution count of block \( B_i \).  
Flow equations: \( x_1 = x_2 + x_3 \), \( x_2 + x_3 = x_4 \).  
Objective: maximise \( 20x_1 + 35x_2 + 80x_3 + 10x_4 \).

## 9. The memory technique

1. **The hook** — Picture a marathon runner forced to take every possible detour; WCET is the length of the single longest detour that the hardware rules still permit.
2. **What to overlearn** — WCET = max \(\sum t_i x_i\) subject to flow equations; cache states live in a finite lattice; loop bounds must be supplied or inferred.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the ILP from the CFG by writing one flow-conservation equation per node and one timing coefficient per basic block.

## 10. What this unlocks
WCET bounds are the numerical foundation of all subsequent real-time analysis.  
- Response-time analysis for fixed-priority preemptive scheduling  
- Schedulability tests for earliest-deadline-first and time-triggered schedules  
- End-to-end latency analysis in cause-effect chains spanning multiple cores  
- Certification arguments required by ISO 26262, DO-178C, and IEC 61508

## 11. Self-check — five questions, no answers
1. Why can a cache hit on one load increase the WCET of a later load on an out-of-order pipeline?  
2. Write the complete set of flow-conservation equations for a CFG containing a nested loop whose inner loop bound depends on the outer-loop index.  
3. A measurement-based WCET tool reports 12 µs; a static tool reports 18 µs. Which number must be used for certification and why?  
4. Construct an ILP constraint that forbids the simultaneous execution of two mutually exclusive error-handling blocks.  
5. On a processor exhibiting a timing anomaly, a longer memory latency sometimes shortens total execution time. How must the abstract pipeline model be changed?