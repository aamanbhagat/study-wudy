## 1. The one-sentence answer
**DTIME(t(n)) and DSPACE(s(n)) are the sets of languages decided by deterministic Turing machines that halt within O(t(n)) steps or O(s(n)) cells, respectively; all familiar complexity classes are built by quantifying over these resource bounds.**

A Turing machine receives an input of length n on its tape. Its running time is the number of transitions until it halts and accepts or rejects; its space is the number of tape cells it visits. DTIME(t(n)) collects every language for which some machine exists whose worst-case running time on inputs of length n is bounded by a constant multiple of t(n). DSPACE(s(n)) does the same for the number of cells visited. Because the bounds are functions of n, the definitions immediately induce an infinite hierarchy of classes once we vary the growth rate of t or s.

These two families of classes are not independent. Every machine that finishes in t(n) steps can visit at most t(n) cells, so DTIME(t(n)) sits inside DSPACE(t(n)). The converse fails: a machine can reuse space and therefore run for exponentially longer than the space it occupies. The gap between the two measures is the source of many of the deepest open questions in the field.

> [!NOTE]
> The single most important observation is that “polynomial time” and “polynomial space” are robust: any two reasonable models of computation (multi-tape TMs, RAMs, circuits) simulate one another with only polynomial blow-up, so the classes P and PSPACE are model-independent.

## 2. Why this matters — concrete and current
Modern SAT solvers used by EDA companies such as Synopsys and Cadence decide instances with millions of variables in seconds; their worst-case exponential running time is nevertheless practical because the instances arising from circuit verification lie in a thin slice of the full exponential-time class.

NASA’s Mars 2020 Perseverance rover runs a real-time scheduler whose correctness proof rests on showing that every task finishes inside a strict linear-time bound on a radiation-hardened processor; the proof is a direct membership argument in DTIME(O(n)).

Transformer training runs at OpenAI and Google DeepMind are routinely analyzed in the O(n^{2}d) time and O(nd) space regime of self-attention; these bounds determine whether a 100 k-token context window fits on a single H100 GPU or requires model parallelism.

The ongoing verification of the seL4 microkernel at UNSW and Proofcraft uses a space-bounded model checker whose state space is shown to lie in DSPACE(O(log n)) for certain safety properties, allowing exhaustive enumeration on commodity hardware.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Deterministic Turing machine | DTIME and DSPACE are defined by quantifying over DTM computations only. |
| Big-O notation             | Resource bounds are asymptotic; exact constants are absorbed. |
| Language vs. decision problem | Complexity classes contain languages, i.e., sets of strings. |
| Multi-tape vs. single-tape TM | Simulation overhead must be tracked when moving between models. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A machine uses time and space on each input
A deterministic Turing machine M on input x of length n performs a unique computation path that either halts or loops. The length of that path is the time used; the highest tape-cell index visited is the space used.  
Example: the machine that copies its input uses exactly n steps and n+1 cells on every input of length n.  
Formally, time_M(x) = number of transitions until halt; space_M(x) = max{|i| : cell i visited}.  
> [!WARNING]  
> Forgetting that the input tape is read-only in the standard model leads to an off-by-one error when counting space on unary inputs.

### Step 2 — Fixing a bounding function
Choose a function t : ℕ → ℕ that is time-constructible (a DTM can mark exactly t(n) cells in O(t(n)) steps). The class DTIME(t(n)) contains every language L for which some DTM M decides L and, for every x, time_M(x) ≤ c·t(|x|) for a constant c.  
Display:  
$$ \text{DTIME}(t(n)) = \{ L \mid \exists M.\ L = L(M)\ \text{and}\ \forall x.\ \text{time}_M(x) \le c\cdot t(|x|) \} $$

### Step 3 — The space analogue
Replace the time bound by a space bound s(n) that is space-constructible.  
$$ \text{DSPACE}(s(n)) = \{ L \mid \exists M.\ L = L(M)\ \text{and}\ \forall x.\ \text{space}_M(x) \le c\cdot s(|x|) \} $$

### Step 4 — Immediate containment
Any machine that halts in t(n) steps visits at most t(n) cells, therefore  
$$ \text{DTIME}(t(n)) \subseteq \text{DSPACE}(t(n)). $$

### Step 5 — Crossing the exponential gap
A machine using s(n) space has at most |Q|·s(n)·|Γ|^{s(n)} distinct configurations and must therefore halt or loop within that many steps. Hence  
$$ \text{DSPACE}(s(n)) \subseteq \text{DTIME}(2^{O(s(n))}). $$

### Step 6 — Robustness under model change
Any k-tape DTM running in time t(n) can be simulated by a single-tape DTM in time O(t(n)^{2}). Consequently the polynomial classes are invariant:  
$$ \bigcup_k \text{DTIME}(n^k) = \text{P}. $$

### Step 7 — The textbook statement of the classes
P = DTIME(n^{O(1)}), PSPACE = DSPACE(n^{O(1)}), EXPTIME = DTIME(2^{n^{O(1)}}).

## 5. Worked examples — every step shown

**Example 1 — Unary membership**  
*Given:* L = {a^n | n ≥ 0}.  
*Find:* Show L ∈ DTIME(n).  
A single-tape machine scans the input once, accepting if every symbol is a.  
Step 1: head moves right n times → time = n.  
*Why:* each transition consumes one input symbol.  
Step 2: on the (n+1)th cell it sees ⊔ and halts.  
Final answer: **L ∈ DTIME(n)**.  
*Reflection:* The linear bound is tight; any machine must read the whole input.

**Example 2 — Palindromes**  
*Given:* PAL = {w | w = w^R}.  
*Find:* Show PAL ∈ DSPACE(log n).  
A two-head machine compares symbols from both ends, moving inward.  
Step 1: store left and right indices in binary → O(log n) space.  
*Why:* each index needs ⌈log n⌉ bits.  
Step 2: compare symbols and increment/decrement indices until they cross.  
Final answer: **PAL ∈ DSPACE(log n)**.  
*Reflection:* Time is quadratic, illustrating the time-space gap.

**Example 3 — Reachability**  
*Given:* directed graph on n vertices given by adjacency matrix.  
*Find:* Show s-t connectivity ∈ DSPACE(log n).  
Re-use the same O(log n) space to store current vertex and path length.  
Step 1: nondeterministically guess next vertex (derandomized by Savitch).  
Step 2: square the adjacency relation log n times.  
Final answer: **STCON ∈ DSPACE(log² n)**.  
*Reflection:* Savitch’s theorem lifts the deterministic bound from log to log squared.

**Example 4 — Quantified Boolean Formula**  
*Given:* QBF instance with n variables and m clauses.  
*Find:* Show QBF ∈ PSPACE.  
Recursively evaluate the outermost quantifier, reusing space for each sub-formula.  
Step 1: depth-n recursion uses O(n) space for the assignment stack.  
*Why:* each level stores one Boolean value.  
Step 2: evaluate matrix in linear space.  
Final answer: **QBF ∈ PSPACE**.  
*Reflection:* The same algorithm shows QBF is PSPACE-complete.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Confusing DTIME with big-O of a specific machine | Students measure one implementation instead of existence of some machine | Always quantify “there exists M such that …” |
| Treating space as including the input tape | Standard model separates read-only input from work tape | Count only work-tape cells visited |
| Assuming every function is time-constructible | Non-constructible bounds break diagonalization | Verify constructibility before applying hierarchy theorems |
| Forgetting that P ⊆ PSPACE is proper containment unknown | Intuitive “time is more precious than space” feels obvious | Keep the inclusion DTIME(t) ⊆ DSPACE(t) separate from the open question P ≠ PSPACE |
| Using single-tape time bounds for multi-tape algorithms | Quadratic overhead is invisible in polynomial classes but fatal for linear time | State the model explicitly in every claim |
| Mixing deterministic and nondeterministic classes | NTIME(n) contains problems outside P | Prefix every class name with D or N |
| Ignoring that space bounds must be at least log n for sublinear classes | Constant-space DTMs decide only regular languages | Remember the log n lower bound for storing indices |

## 7. The textbook-precise statement
Let t,s : ℕ → ℕ be functions with t(n) ≥ n+1 and s(n) ≥ log n. Then  
DTIME(t(n)) = {L ⊆ Σ* | ∃ a deterministic 1-tape TM M that decides L and ∀x ∈ Σ*, time_M(x) ≤ c·t(|x|) for some constant c},  
and likewise for DSPACE(s(n)).  
P = ⋃_{k≥1} DTIME(n^k), PSPACE = ⋃_{k≥1} DSPACE(n^k).  
(Sipser, *Introduction to the Theory of Computation*, 3e, §7.1–7.2.)

## 8. Visual — diagram or schematic
```text
Space
 ^
 |   EXPSPACE
 |      |
 |   PSPACE
 |      |
 |     P
 |      |
log n  REG
 |      |
 0 ----+-------------> Time
      n     n²    2^n   2^{2^n}
```
Horizontal axis: time bounds; vertical axis: space bounds. The diagonal DTIME(t) ⊆ DSPACE(t) is implicit. REG lies at constant space; P and PSPACE occupy the polynomial region.

## 9. The memory technique
1. **The hook** — Picture a librarian who must stamp every book (time) while only ever using a single shelf of fixed width (space); the shelf size determines how long the librarian can keep working before repeating a configuration.
2. **What to overlearn** — DTIME(t) ⊆ DSPACE(t) ⊆ DTIME(2^{O(t)}); P = DTIME(n^{O(1)}); PSPACE = DSPACE(n^{O(1)}).
3. **Spaced-repetition schedule** — Review the two inclusions at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the configuration count: |Q|·s·|Γ|^s distinct snapshots imply the exponential time upper bound on any space-s machine.

## 10. What this unlocks
Mastery of DTIME and DSPACE lets you place concrete problems inside or outside P, PSPACE, and EXPTIME and prepares the ground for nondeterminism, hierarchy theorems, and circuit complexity.  
- Savitch’s theorem (NSPACE(s) ⊆ DSPACE(s²))  
- Time and space hierarchy theorems  
- P versus NP question via NTIME  
- Polynomial hierarchy and alternating classes  
- Circuit-size versus depth trade-offs

## 11. Self-check — five questions, no answers
1. Give a language that is in DTIME(n²) but not known to be in DTIME(n log n).  
2. Prove or disprove: every language in DSPACE(log log n) is regular.  
3. A machine uses 2^{√n} space. What is the tightest deterministic time bound you can prove for it?  
4. Why does the proof that PAL ∈ DSPACE(log n) fail if the input tape is counted toward space?  
5. Show that if DTIME(n^{2}) = DTIME(n^{3}) then the time hierarchy theorem is false; identify the exact hypothesis that collapses.