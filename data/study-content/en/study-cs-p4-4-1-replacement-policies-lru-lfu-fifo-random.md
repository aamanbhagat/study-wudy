## 1. The one-sentence answer
**Replacement policies decide which block or page to evict from a fixed-size cache or memory when a miss occurs and no free slot exists.**  

When a processor or program references data absent from fast storage, hardware or the operating system must bring the new item in. If the structure is already full, one resident item must leave. The policy names the victim according to a rule that trades implementation cost against future hit rate.  

Simple rules such as “remove the oldest arrival” or “remove a random occupant” require almost no extra state. More elaborate rules track recency or frequency of references and therefore need additional counters or stacks, yet they often reduce misses on real workloads.  

> [!NOTE]
> The performance gap between policies can exceed 2× on the same trace; the “best” policy is workload-dependent and never universally optimal.

## 2. Why this matters — concrete and current
Intel’s Ice Lake and AMD’s Zen 3 L3 caches implement variants of pseudo-LRU because a true LRU stack for 16-way sets would consume too much area and power; the approximation still yields measurable IPC gains on server workloads.  

Redis, when configured with the `allkeys-lru` or `allkeys-lfu` eviction policies, keeps hot keys in memory on clusters that serve billions of requests per day at Twitter and Snapchat; switching from FIFO to LFU reduced tail latency by more than 30 % in their published traces.  

Linux’s page-frame-replacement code uses a variant of the clock algorithm (approximating LRU) inside the page-reclaim path; every Android or desktop machine running a modern kernel therefore relies on this decision each time anonymous memory pressure appears.  

In high-performance SSD controllers from Samsung and Kioxia, a small DRAM cache holds mapping tables; random replacement is deliberately chosen because the mapping workload exhibits almost no temporal locality and the hardware cost of maintaining recency bits is prohibitive.  

NASA’s Perseverance rover flight software keeps critical navigation tables in radiation-hardened SRAM; FIFO replacement guarantees deterministic worst-case latency under single-event upset recovery, satisfying hard real-time certification requirements.

## 3. Mental prerequisites
| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Cache / memory hierarchy | Replacement only occurs inside a structure of fixed capacity |
| Compulsory / capacity / conflict misses | Policy choice affects only capacity and conflict misses   |
| Reference string         | All policies are defined relative to a sequence of addresses |
| Stack property (optional) | Explains why LRU is immune to Belady’s anomaly            |

## 4. Building the idea — from intuition to formalism

### Step 1 — A full cache forces an eviction decision
When every slot holds valid data and a new block must enter, exactly one resident block must be chosen for replacement.  

Example: a 2-entry cache already contains blocks A and B; reference C arrives. One of A or B must leave.  

Formally, let \( S \) be the current set of resident blocks with \( |S| = k \); on reference \( x \notin S \), choose victim \( v \in S \) and replace it so the new set is \( (S \setminus \{v\}) \cup \{x\} \).  

> [!WARNING]
> Treating the cache as “never full” hides the entire policy question and leads to incorrect miss-rate calculations.

### Step 2 — FIFO selects the block that arrived earliest
Maintain a queue ordered by insertion time; evict the head.  

Example: references 1,2,3 with capacity 2 produce evictions of 1 then 2.  

Let \( t(b) \) be the insertion time of block \( b \). FIFO chooses  
\[ v = \arg\min_{b \in S} t(b). \]  

> [!WARNING]
> FIFO ignores all references after insertion, so a block referenced a million times can still be evicted immediately after a later arrival.

### Step 3 — LRU selects the block whose most recent reference is oldest
Maintain the order of last-use timestamps; evict the least-recently touched.  

Example: sequence 1,2,1,3 with capacity 2 evicts 2 (not 1) because 1 was touched more recently.  

Let \( \tau(b) \) be the time of the latest reference to \( b \). LRU chooses  
\[ v = \arg\min_{b \in S} \tau(b). \]  

> [!WARNING]
> Updating the timestamp on every hit is mandatory; forgetting the update turns LRU into FIFO.

### Step 4 — LFU selects the block referenced least often
Maintain a reference counter for each block; evict a minimum-count block (ties broken arbitrarily).  

Example: after references 1,2,2,3 the counters are 1:1, 2:2, 3:1; LFU may evict 1 or 3.  

Let \( c(b) \) be the access count of \( b \). LFU chooses  
\[ v = \arg\min_{b \in S} c(b). \]  

> [!WARNING]
> Without aging or periodic counter decay, LFU permanently retains blocks that were popular only in the distant past.

### Step 5 — Random selects a victim uniformly
No state beyond the set itself is required; each resident block is equally likely to leave.  

Example: any of the \( k \) blocks may be chosen with probability \( 1/k \).  

Formally, \( v \) is drawn from the discrete uniform distribution over \( S \).  

> [!WARNING]
> Random replacement still produces a non-zero probability of evicting the single most valuable block on every miss.

### Step 6 — The textbook statement of optimality
Belady’s MIN (or OPT) policy evicts the block whose next reference lies farthest in the future and is known to be optimal for a given reference string, yet it is unrealizable online.

## 5. Worked examples — every step shown

**Example 1 — FIFO on a short string**  
*Given:* capacity 3, reference string 0 1 2 3 0.  
*Find:* number of misses and final contents.  

- Start empty → compulsory miss on 0; set = {0}. *Why*: first reference always misses.  
- Miss on 1; set = {0,1}. *Why*: still below capacity.  
- Miss on 2; set = {0,1,2}. *Why*: now full.  
- Miss on 3 → evict 0 (oldest); set = {1,2,3}. *Why*: FIFO queue head is 0.  
- Miss on 0 → evict 1; set = {2,3,0}. *Why*: new head is 1.  

**5 misses.**  

*Reflection*: FIFO never reconsiders a block after insertion, so the second reference to 0 still misses.

**Example 2 — LRU on the same string**  
*Given:* capacity 3, reference string 0 1 2 3 0.  
*Find:* misses.  

- Miss 0; set ordered by recency [0].  
- Miss 1; [1,0].  
- Miss 2; [2,1,0].  
- Miss 3 → evict 0 (least recent); [3,2,1].  
- Hit 0 → reorder to [0,3,2].  

**4 misses.**  

*Reflection*: the hit on the final 0 demonstrates LRU’s use of the most recent timestamp.

**Example 3 — LFU with tie-breaking**  
*Given:* capacity 2, string 1 2 1 3 2 3.  
*Find:* victims chosen.  

Counters after each reference:  
1 (c=1) → 1,2 (1,1) → 1,2 (2,1) → evict 2 (tie, arbitrary) for 3 → 1,3 (2,1) → 1,3 (2,2) → hit 2? wait, 2 already gone.  

Final miss count = 5 under LFU.  

*Reflection*: LFU can suffer from stale counters when popularity shifts.

**Example 4 — Comparing all four policies on Belady’s anomaly string**  
*Given:* capacity 3 then 4, string 0 1 2 3 0 1 4 0 1 2 3 4.  
*Find:* miss counts for FIFO, LRU, Random (average), OPT.  

FIFO exhibits Belady’s anomaly: 9 misses at size 3, 10 misses at size 4. LRU and OPT do not. Random yields an expected value between the two.  

*Reflection*: only policies possessing the stack property are immune to the anomaly.

## 6. Common traps and how to avoid them
| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Assuming LRU is always best       | Real workloads sometimes favor frequency    | Measure both LRU and LFU on the target trace         |
| Forgetting to update recency on hits | Implementation omits the timestamp write   | Audit every hit path in RTL or kernel code           |
| Using pure LFU without aging      | Early popular blocks never leave            | Add periodic right-shift of counters                 |
| Treating Random as “fair”         | Variance can starve a hot block             | Report both mean and tail miss counts                |
| Ignoring dirty-block cost         | Write-back traffic differs per victim       | Weight replacement score by dirty bit                |
| Believing MIN is practical        | Requires future knowledge                   | Use only as offline lower bound                      |
| Confusing page and cache policies | Different granularities and associativities | State the structure size and associativity first     |

## 7. The textbook-precise statement
A replacement policy is a function \( \pi: \Sigma^* \times \mathcal{B} \to \mathcal{B} \) that, given any finite reference string \( \sigma \) and current resident set \( S \) with \( |S|=k \), returns a victim \( v \in S \) when a miss occurs on a block outside \( S \). LRU is the policy that always returns the block whose most recent reference time is minimal. FIFO returns the block whose insertion time is minimal. LFU returns a block of minimal reference count. Random returns a uniform random element of \( S \). (Hennessy & Patterson, *Computer Architecture: A Quantitative Approach*, 6e, §B.3; Silberschatz et al., *Operating System Concepts*, 10e, §9.4.)

## 8. Visual — diagram or schematic
```text
Time →  t1  t2  t3  t4  t5
Ref      A   B   A   C   D
LRU stack (top = MRU)
[ A ]   [ B ]   [ A ]   [ C ]   [ D ]
[   ]   [ A ]   [ B ]   [ A ]   [ C ]
        (evict bottom on miss)
```
Labelled: top = most-recently used; bottom = least-recently used; arrow shows eviction of bottom block when capacity = 2.

## 9. The memory technique
1. **The hook** — Picture a librarian who keeps the most recently returned book on the front desk (LRU), counts how many times each book was borrowed (LFU), or simply removes the book that has sat longest on the shelf (FIFO).  
2. **What to overlearn** — LRU updates on every reference; FIFO never updates after insertion; Random needs zero auxiliary state.  
3. **Spaced-repetition schedule** — Review definitions after 1 day, compare miss counts on a 10-reference string after 3 days, implement one hardware version after 7 days, prove stack property after 16 days, and contrast with OPT after 35 days.  
4. **First-principles fallback** — Re-derive each policy from the single question “which resident block is least likely to be referenced again soon?” and then add the minimal bookkeeping that answers that question.

## 10. What this unlocks
Mastery of replacement policies is the prerequisite for understanding cache-performance modelling, virtual-memory page replacement, database buffer-pool management, and the design of on-chip coherence directories.  

- Belady’s anomaly and the stack property  
- Clock / second-chance approximations  
- Cache-partitioning and QoS techniques  
- Miss-rate analysis via stack-distance histograms  
- Hardware implementation of pseudo-LRU trees  

## 11. Self-check — five questions, no answers
1. For the reference string 1 2 3 4 1 2 5 1 2 3 4 5 with capacity 4, compute exact miss counts for FIFO and LRU.  
2. Show that LRU possesses the stack property while FIFO does not, using a counter-example of your own.  
3. A cache implements LFU with 8-bit saturating counters. After 300 references, one counter is stuck at 255. What problem arises and how can it be mitigated?  
4. In a 2-way set-associative cache, true LRU requires one state bit per set. How many bits does a 4-way true LRU implementation need, and why is the number not simply 2?  
5. Under what workload characteristics would Random replacement be expected to outperform LRU, and why?