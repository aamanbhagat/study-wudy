## 1. The one-sentence answer
**Code coverage quantifies how much of a program’s control structure is exercised by a test suite, distinguishing line coverage (statements executed), branch coverage (decision outcomes taken), and path coverage (complete sequences of branches).**

Line coverage simply counts whether each source line ran at least once. Branch coverage additionally checks that every true/false outcome of each predicate is observed. Path coverage demands every feasible sequence of branches, which grows exponentially with the number of decisions.

These three metrics form a strict hierarchy: 100 % path coverage implies 100 % branch coverage, which in turn implies 100 % line coverage. The converse never holds.

> [!NOTE]
> The decisive insight is that line coverage alone can certify that dead code exists while still reporting 100 %; only branch or path coverage reveals whether both sides of a decision were ever exercised.

## 2. Why this matters — concrete and current
NASA’s Core Flight Software team enforces 100 % branch coverage on all modules that control attitude thrusters; a single missed branch in the 2018 OSIRIS-REx proximity operations update would have produced an untestable trajectory-correction command.

Google’s internal “Test Coverage” service, described in their 2021 SRE book, gates every merge to the monolithic repository on line-coverage deltas; the policy reduced post-submit crash reports by 37 % over two years.

In the semiconductor industry, Intel’s formal verification group augments RTL simulation with path-coverage metrics derived from control-flow graphs; missing paths in the 2022 Sapphire Rapids memory controller were traced to an unexercised error-recovery sequence that would have corrupted cache lines under specific ECC faults.

The Linux kernel’s KCOV subsystem, merged in 2016, exports path-coverage data to syzkaller; this combination discovered 2 400+ distinct bugs in drivers by systematically enumerating previously unvisited execution paths.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Control-flow graph (CFG) | Every coverage metric is defined on nodes, edges, or paths of the CFG. |
| Basic blocks             | Statements inside a basic block are always executed together; line coverage therefore reduces to node coverage on the CFG. |
| Predicate / decision     | Branch coverage counts the two outgoing edges of each predicate node. |
| Feasible vs. infeasible path | Path coverage is only required over paths that can actually occur; infeasible paths must be excluded by reachability analysis. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A program is a directed graph of basic blocks
A straight-line sequence of statements with no internal branches forms a single node.  
Example: the three assignments `a=1; b=2; c=a+b;` constitute one node.  
Formally, the CFG is \( G = (B, E, b_0, b_f) \) where \( B \) is the set of basic blocks, \( E \subseteq B \times B \) the control-flow edges, \( b_0 \) the entry, and \( b_f \) the exit.  
> [!WARNING] Treating an `if` statement as one node instead of splitting at the predicate silently merges two branches and undercounts coverage.

### Step 2 — Line coverage counts executed nodes
A test suite \( T \) achieves line coverage \( C_L \) when every node in \( B \) appears in at least one execution trace produced by \( T \).  
\[ C_L = \frac{| \{ b \in B \mid \exists t \in T.\ b \text{ is visited by } t \} |}{|B|} \]  
> [!WARNING] 100 % line coverage can be obtained while an entire `else` clause remains unexecuted if the `else` block is empty or the compiler elides it.

### Step 3 — Branch coverage counts executed edges
Branch coverage \( C_B \) requires every edge in \( E \) to be traversed.  
\[ C_B = \frac{| \{ e \in E \mid \exists t \in T.\ e \text{ is traversed by } t \} |}{|E|} \]  
> [!WARNING] A compound predicate `if (a && b)` compiles to multiple edges; counting only the textual `if` statement yields a false sense of coverage.

### Step 4 — Path coverage counts executed paths
A path is a sequence \( p = b_0, b_{i_1}, \dots, b_f \). Path coverage \( C_P \) is the fraction of feasible paths exercised.  
\[ C_P = \frac{| \{ p \text{ feasible} \mid \exists t \in T.\ p \text{ is realized by } t \} |}{|\{ p \text{ feasible}\}|} \]  
> [!WARNING] The denominator is often infinite; any loop with a data-dependent exit produces an unbounded set of paths, rendering exhaustive path coverage undecidable.

### Step 5 — The subsumption lattice
Path coverage \(\implies\) branch coverage \(\implies\) line coverage. The converse implications are false. This ordering is the only sound way to interpret reported percentages across tools.

## 5. Worked examples — every step shown

**Example 1 — Single conditional**  
*Given:*  
```python
if x > 0:
    y = 1
else:
    y = -1
```
*Find:* minimum tests for 100 % branch coverage.  
Trace 1 (`x=1`): true edge taken.  
Trace 2 (`x=-1`): false edge taken.  
**Two tests achieve 100 % branch coverage.**  
*Reflection:* The example is minimal; any single test leaves one edge uncovered.

**Example 2 — Consecutive conditionals**  
*Given:* two independent `if` statements.  
*Find:* number of paths versus branches.  
Four feasible paths exist; six edges must be covered for branch coverage.  
**Four tests needed for path coverage, two for branch coverage.**  
*Reflection:* Path count is exponential; branch count is linear in the number of predicates.

**Example 3 — Loop with early exit**  
*Given:*  
```python
while i < n:
    if a[i] == 0: break
    i += 1
```
*Find:* feasible paths.  
Three distinct paths: never enter, enter and break on first iteration, enter and exit normally.  
**Path coverage requires three tests; branch coverage requires two.**  
*Reflection:* The `break` edge is easy to miss when counting only textual lines.

**Example 4 — Nested condition with short-circuit**  
*Given:* `if (a && b || c)`.  
*Find:* edges after compilation to three-address form.  
Seven edges appear in the CFG.  
**Seven tests achieve 100 % branch coverage; path coverage may require up to 2^3 = 8 feasible combinations.**  
*Reflection:* Short-circuit operators multiply the number of implicit branches; source-level line coverage hides them.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Reporting 100 % line coverage while an exception handler is dead | Exception edges are invisible in source-line counts | Enable branch coverage on exception edges or use bytecode coverage |
| Treating `switch` fall-through as one branch | Compiler may emit multiple edges for the same textual case | Inspect the generated CFG, not the source text |
| Ignoring infeasible paths when claiming “path coverage” | Tools report syntactic paths; many are statically unreachable | Combine coverage with a reachability oracle or symbolic execution |
| Counting coverage only on the happy path | Most developers write tests for success cases first | Mandate negative tests in code-review checklists |
| Using statement coverage on macros or generated code | Preprocessor expansion duplicates statements | Run coverage on the post-processed translation unit |
| Believing 80 % coverage is “good enough” for safety-critical code | Subsumption guarantees nothing below 100 % branch coverage | Enforce 100 % branch coverage for any module that can affect control flow |
| Forgetting that `finally` blocks create additional edges | Language semantics insert implicit control transfers | Instrument the finally block explicitly |

## 7. The textbook-precise statement
A test suite \( T \) for program \( P \) with CFG \( G = (B, E, b_0, b_f) \) achieves *k*-path coverage when every feasible path of length at most \( k \) is realized by some test in \( T \). When \( k \) equals the longest feasible path, the suite achieves full path coverage. (Ammann & Offutt, *Introduction to Software Testing*, 2e, Definition 4.31.)

## 8. Visual — diagram or schematic
```text
          b0 (entry)
           |
           v
        b1: if x>0 ----false----> b3: y=-1
           | true                    |
           v                         v
        b2: y=1                   b4: return
           |                         ^
           +----------merge----------+
```
Nodes = basic blocks (lines). Solid edges = branches. All paths from b0 to b4 must be enumerated for path coverage.

## 9. The memory technique
1. **The hook** — Picture a city map: lines are streets you drove down, branches are left/right turns you actually took, paths are complete routes from home to work.  
2. **What to overlearn** — The three coverage equations and the strict implication “path \(\implies\) branch \(\implies\) line”.  
3. **Spaced-repetition schedule** — Review the subsumption lattice at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-draw the CFG of a three-line `if-else` fragment and label every edge; the missing labels immediately reveal which metric is unsatisfied.

## 10. What this unlocks
Mastery of line/branch/path coverage is the prerequisite for mutation testing, concolic execution, and any sound static-analysis claim about absence of defects.  
- Next: data-flow coverage (def-use pairs)  
- Next: MC/DC coverage required by DO-178C avionics  
- Next: automated test generation via symbolic execution

## 11. Self-check — five questions, no answers
1. A function contains a single `if` with an empty `else`. Does 100 % line coverage guarantee that the `else` branch was taken?  
2. How many edges exist in the CFG of `if (a || b) { … } else { … }` after short-circuit compilation?  
3. Give a concrete program where 100 % branch coverage is achieved yet a feasible path remains untested.  
4. Why does the presence of a `while(true)` loop with a `break` make exhaustive path coverage impossible?  
5. In a safety-critical review, an auditor rejects a 97 % line-coverage report. Which stronger metric would satisfy the auditor and why?