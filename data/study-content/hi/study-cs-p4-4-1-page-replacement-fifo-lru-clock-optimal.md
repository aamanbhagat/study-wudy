## 1. The one-sentence answer
**Page replacement algorithms decide which memory page to evict from a fixed-size frame set when a page fault occurs and no free frame remains.**

Page replacement becomes necessary once virtual memory frames are full. The operating system must select a victim page using a defined policy so that the new page can be loaded from disk. Different policies trade off between implementation cost, hit ratio, and hardware support.

The four policies you will study—FIFO, LRU, Clock, and Optimal—represent points on a spectrum from simplest hardware to theoretically best performance. Their behaviour is completely determined by the reference string and the number of frames.

> [!NOTE]
> The single most important insight is that no online algorithm can guarantee the minimum number of faults for an arbitrary reference string; Optimal is the lower bound but requires future knowledge that real systems never possess.

## 2. Why this matters — concrete and current
Modern database engines such as PostgreSQL use a variant of Clock (called “clock-sweep”) inside their buffer manager to decide which 8 KB pages to evict under memory pressure; the algorithm directly affects transaction throughput on servers with 128 GB RAM.

Android’s Low Memory Killer and the Linux page allocator both employ an LRU-based active/inactive list pair; when an app is backgrounded, its pages move down the LRU list, and the kernel reclaims them only after scanning the Clock hand, directly impacting app resume latency on phones.

In aerospace flight software running on radiation-hardened PowerPC processors, NASA’s Core Flight System uses a strict FIFO page replacement inside its memory-management unit because the hardware provides no reference bits; deterministic worst-case fault counts are required for certification under DO-178C.

Google’s TPU v4 pods implement a hardware Clock algorithm inside each TensorCore’s 32 MB scratchpad; the reference bit is set on every matrix-multiply load, and the replacement decision occurs every few microseconds, directly affecting training step time for models with hundreds of billions of parameters.

Semiconductor cache-coherence controllers in AMD EPYC chips use a pseudo-LRU tree (a hardware approximation of LRU) for the L3 cache slices; each replacement decision influences the effective memory bandwidth seen by HPC workloads running on 64-core sockets.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Virtual memory & page table | Explains why pages move between RAM frames and disk      |
| Page fault handling      | Defines the exact moment when replacement is invoked     |
| Reference string         | The input sequence that all algorithms consume           |
| Frame count              | Determines how many pages can stay resident simultaneously |

If any row above is unfamiliar, pause and review the corresponding section on virtual memory before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Demand paging forces replacement
When a process references a page not present in memory, a page fault occurs. If all frames are occupied, the OS must evict one resident page before the new page can be loaded.  
Example: reference string 1,2,3,4 with only three frames; the fourth reference forces eviction.  
Formally, at fault time \( t \), if \( |F| = m \) and \( |R(t)| = m \), choose victim \( v \in R(t) \) to minimise future faults.  
> [!WARNING]  
> Treating the fault handler as “just another interrupt” hides the fact that replacement policy now controls observable runtime.

### Step 2 — FIFO selects the oldest arrival
The first page brought into a frame is the first candidate for eviction. A simple queue records insertion order.  
Example: frames = 3, string = 1 2 3 4 → evict 1 on the fourth fault.  
Formal rule: victim = head of FIFO queue; enqueue new page at tail.  
> [!WARNING]  
> FIFO can suffer Belady’s anomaly: increasing frames may increase faults.

### Step 3 — LRU evicts the page unused for longest
Replace the page whose most recent reference lies furthest in the past.  
Example: string 1 2 3 1 4 with 3 frames → on reference 4, evict 2 because it was referenced least recently.  
Formal definition: victim = \( \arg\min_{p \in R} \text{last}(p) \), where last(p) is the timestamp of p’s most recent reference.

### Step 4 — Clock approximates LRU with one reference bit
A circular list and a “clock hand” scan pages; any page whose reference bit is set is given a second chance and the bit is cleared.  
Example: same string as above, hand movement evicts page 2 after one full rotation.  
Formal rule: advance hand until a page with reference bit = 0 is found; set bit = 0 for every examined page that had bit = 1.

### Step 5 — Optimal replaces the page used furthest in future
At replacement time, choose the page whose next reference occurs latest (or never).  
Example: string 1 2 3 4 1 2 5 with 3 frames → on reference 5, evict 3 because it is referenced furthest ahead.  
Formal statement: victim = \( \arg\max_{p \in R} \text{next}(p) \), where next(p) is the smallest index > t at which p appears again.

### Step 6 — Stack distance unifies comparison
For any reference string the number of faults under LRU equals the number of distinct pages whose stack distance exceeds the frame count. Optimal produces the minimal possible stack-distance fault curve.  
This single metric lets you compare all four policies on the same reference string without re-simulation.

## 5. Worked examples — har step show karo

**Example 1 — FIFO on short string**  
*Given:* reference string = 1 2 3 4, frames = 3  
*Find:* total page faults  
Step 1: load 1 → fault 1, frames [1]  
Step 2: load 2 → fault 2, frames [1 2]  
Step 3: load 3 → fault 3, frames [1 2 3]  
Step 4: load 4 → fault 4, evict 1 (oldest), frames [2 3 4]  
**4 faults**  
*Reflection:* FIFO never looks at usage, only arrival time; Belady’s anomaly appears on longer strings.

**Example 2 — LRU on same string**  
*Given:* same string and frames  
Step 1–3 identical → frames [1 2 3]  
Step 4: 4 arrives, evict 1 (least recently used), frames [2 3 4]  
**4 faults** (identical to FIFO here)  
*Reflection:* LRU needs timestamp or stack; cost is higher but avoids Belady’s anomaly.

**Example 3 — Clock simulation**  
*Given:* string 0 1 2 3 0 1 4, frames = 3, reference bits start 0  
Hand starts at frame 0.  
After 0,1,2 loaded: frames [(0,1) (1,1) (2,1)]  
Reference 3: hand finds bit 1 at 0, clears it, continues; evicts 1 after full cycle.  
**6 faults**  
*Reflection:* second-chance pass reduces but does not eliminate LRU error.

**Example 4 — Optimal versus LRU**  
*Given:* string 1 2 3 4 1 2 5 1 2 3 4 5, frames = 4  
Optimal produces 6 faults.  
LRU produces 8 faults.  
Difference arises exactly when page 5 arrives: Optimal correctly discards 3, LRU discards 4.  
*Reflection:* gap between Optimal and LRU quantifies value of future knowledge.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Assuming FIFO is always worst | Students see Belady’s anomaly once and generalise | Run both FIFO and LRU on the same string     |
| Forgetting to clear reference bit in Clock | Hand keeps giving second chances forever   | Explicitly zero the bit on every examination |
| Treating Optimal as implementable | Future references are known only in theory | Use Optimal solely as theoretical lower bound|
| Ignoring stack-distance cost | LRU appears free until you implement the stack | Count actual memory references for timestamps|
| Belady’s anomaly on exam questions | Increasing frames from 3 to 4 suddenly raises faults | Always recompute fault count after frame change |
| Confusing “recently” with “frequently” | LRU only cares about last use, not count   | Draw the last-use timeline before choosing victim |
| Skipping the circular list wrap-around | Hand stops at first zero bit without full scan | Simulate at least one complete rotation on paper |

## 7. The textbook-precise statement
A page-replacement algorithm is a function that, given a reference string \( \omega = r_1 r_2 \dots r_n \) and a frame allocation of size \( m \), produces a sequence of eviction decisions so that the number of page faults is minimised subject to the information available at each decision point. FIFO evicts the page that has resided longest; LRU evicts the page whose last reference time is minimal; the Clock algorithm maintains a circular list and a hand pointer that clears the reference bit on each page until a page with a cleared bit is found; Optimal evicts the page whose next reference lies furthest in the future. (Silberschatz, Galvin, Gagne, Operating System Concepts, 10e, §9.4–9.5)

## 8. Visual — diagram or schematic
```
Frames: 3          Time →
Page loaded: 1  2  3  4  1  2  5
FIFO queue head→ 1  2  3  4(evict) …
LRU stack top→   1  2  3  1  4  2  5
Clock hand:      ^  ^  ^  ^  ^  ^  ^
Ref bits:        1  1  1  0  1  1  0
```
Hand advances clockwise; any bit = 1 is cleared and the page is given another chance.

## 9. The memory technique
**The hook** — Picture a circular train platform (Clock) where passengers (pages) hold a ticket (reference bit). The conductor (hand) punches the ticket; if the ticket is already punched, the passenger is thrown off.

**What to overlearn** — (1) FIFO uses only arrival order, (2) LRU needs last-use time, (3) Optimal needs future references, (4) Clock needs one reference bit per frame.

**Spaced-repetition schedule** — Review the four algorithm definitions after 1 day, redraw the Clock diagram after 3 days, solve one new reference string after 7 days, compare all four policies on a 20-reference string after 16 days, and re-derive Belady’s anomaly after 35 days.

**First-principles fallback** — If you forget the policy, rebuild from the single question “which page’s removal produces the fewest future faults given only the information this algorithm is allowed to keep?”

## 10. What this unlocks
Mastery of these four policies lets you understand buffer-pool managers in databases, cache-replacement policies in CPUs, and memory managers in hypervisors. It directly precedes the study of working-set models, thrashing detection, and memory-mapped file eviction.

- Demand paging + page replacement → working-set model
- Clock algorithm → hardware reference-bit design
- Optimal lower bound → competitive analysis of online algorithms

## 11. Self-check — five questions, no answers
1. For reference string 7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1 with 3 frames, how many faults does FIFO produce?
2. Does LRU ever exhibit Belady’s anomaly? Prove or disprove with a counter-example of length ≤ 8.
3. In a Clock implementation, what is the maximum number of pages examined before an eviction when every reference bit is initially 1?
4. Construct a reference string where Optimal produces strictly fewer faults than LRU for frame count 4.
5. A system implements FIFO yet still suffers Belady’s anomaly on a particular workload; which single change to the reference string removes the anomaly while keeping the same number of distinct pages?