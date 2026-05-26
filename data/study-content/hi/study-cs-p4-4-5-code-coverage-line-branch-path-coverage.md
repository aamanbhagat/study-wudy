## 1. The one-sentence answer
**Code coverage quantifies the fraction of a program’s control-flow elements that a test suite actually executes, where line coverage counts executed statements, branch coverage counts taken decision outcomes, and path coverage counts distinct sequences of branches.**

Line coverage simply checks whether each line of source code runs at least once. Branch coverage goes one step deeper: for every conditional it verifies that both the true and false outcomes have been observed. Path coverage is stricter still; it demands that every feasible sequence of branches through the function has been traversed.

In practice these three metrics form a hierarchy. Achieving 100 % line coverage never guarantees 100 % branch coverage, and 100 % branch coverage never guarantees 100 % path coverage. The gap between them reveals the hidden complexity of control flow that ordinary tests often miss.

> [!NOTE]
> The single most important insight is that coverage is a negative metric: high coverage proves nothing about correctness, yet low coverage proves the existence of untested behaviour.

## 2. Why this matters — concrete and current
Google’s internal continuous-integration system (Test Automation Platform) aborts merges when branch coverage on critical paths falls below 85 %; the rule caught the 2020 “null dereference in Ads billing” incident before production.

NASA’s Mars 2020 Perseverance flight software team required path coverage on all guidance-control modules; the requirement surfaced an unreachable recovery path that would have left the rover in safe-mode after a single radiation upset.

In semiconductor verification, Synopsys VCS coverage reports map RTL branch coverage directly to silicon toggle coverage; missing branches have repeatedly been traced to post-silicon bugs in cache-coherency controllers at Intel and AMD.

The Linux kernel’s kcov subsystem feeds line and branch data into syzkaller; the resulting coverage-guided fuzzing discovered 1 200+ CVEs between 2017 and 2023, most of them in drivers that had high line coverage but low branch coverage.

Medical-device firm Medtronic mandates path coverage on infusion-pump control logic to satisfy IEC 62304 Class C; the metric forced the addition of test cases for simultaneous occlusion and air-in-line alarms that earlier suites had never reached.

## 3. Mental prerequisites

| Concept              | Why you need it here                                                                 |
|----------------------|--------------------------------------------------------------------------------------|
| Control-flow graph   | Every coverage metric is defined on the nodes and edges of this graph.               |
| Basic block          | Lines inside a basic block are always executed together; coverage collapses to edges.|
| Decision / predicate | Branch coverage counts the two Boolean outcomes of each predicate.                   |
| Feasible vs. infeasible path | Path coverage must ignore combinations that can never occur at runtime.     |

If any row is unfamiliar, pause and read the corresponding section on control-flow graphs before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Lines as executable units
A line is covered when the interpreter or CPU executes at least one instruction generated from that source line.  
Example: the single statement `x = a + b;` is covered by any test that reaches it.  
Formally, let \(L\) be the set of instrumented lines and \(E_L \subseteq L\) the subset executed by test suite \(T\). Line coverage is \(|E_L| / |L|\).  
> [!WARNING] Treating a multi-statement line as one unit hides the second statement when short-circuit evaluation skips it.

### Step 2 — Branches as decision outcomes
A branch is one Boolean outcome of a predicate. The construct `if (p) {…} else {…}` yields two branches.  
Example: `if (x > 0)` must be taken both true and false.  
Formally, let \(B\) be the set of branches and \(E_B \subseteq B\) those taken. Branch coverage is \(|E_B| / |B|\).  
> [!WARNING] 100 % line coverage can still leave an `else` branch uncovered when the `if` condition is always true in tests.

### Step 3 — Paths as sequences of branches
A path is a sequence of branches from entry to exit. Two branches produce four paths when they are independent.  
Example: nested `if (a) { if (b) … }` yields paths TT, TF, FT, FF.  
Formally, let \(P\) be the set of feasible paths; path coverage is \(|E_P| / |P|\) where \(E_P\) is the set of paths exercised.  
> [!WARNING] The number of paths grows exponentially with decisions; most are infeasible, so naïve enumeration fails.

### Step 4 — Instrumentation model
Coverage tools rewrite the program to record each element:  
```c
if (p) { recordBranch(1, true); … } else { recordBranch(1, false); … }
```
The recorded bits are later aggregated into the three ratios above.

### Step 5 — Hierarchy theorem
Line coverage \(\leq\) branch coverage \(\leq\) path coverage (when all are expressed as percentages). Equality holds only for straight-line code.

## 5. Worked examples — har step show karo

**Example 1 — Single if**  
*Given:*  
```java
if (x > 0) y = 1; else y = 2;
```  
*Find:* line, branch, path coverage after the test `x = 5`.  
Execution reaches the true branch only.  
Line coverage = 2/2 = 100 %.  
Branch coverage = 1/2 = 50 %.  
Path coverage = 1/2 = 50 %.  
*Why* each number: the else line is still textually present, yet its branch was never taken.  
**Final answer** 100 % line, 50 % branch, 50 % path.  
*Reflection:* the example shows how line coverage can be perfect while decision logic remains half-tested.

**Example 2 — Compound predicate**  
*Given:*  
```java
if (a && b) c = 1;
```  
*Find:* branch coverage after tests `(true,false)` and `(false,true)`.  
Short-circuit evaluation means the second predicate is never evaluated when the first is false.  
Branches recorded: `a-true`, `a-false`, `b-true`.  
Missing: `b-false`. Branch coverage = 3/4 = 75 %.  
*Why* the count is 4: each operand of `&&` yields two outcomes.  
**Final answer** 75 % branch coverage.  
*Reflection:* logical operators create hidden branches that simple line counts miss.

**Example 3 — Loop**  
*Given:*  
```java
while (i < n) { i++; }
```  
*Find:* path coverage for `n = 0` and `n = 3`.  
Two feasible paths exist: zero iterations and at least one iteration. Both are exercised. Path coverage = 2/2 = 100 %.  
*Why* two paths: the loop predicate has true and false outcomes that lead to distinct exit sequences.  
**Final answer** 100 % path coverage.  
*Reflection:* loops produce only two paths when the body contains no further decisions.

**Example 4 — Two independent decisions**  
*Given:*  
```java
if (p) x = 1; if (q) y = 1;
```  
*Find:* path coverage after tests `(p=true,q=false)`, `(p=false,q=true)`.  
Four paths exist; only two are covered. Path coverage = 2/4 = 50 %.  
*Why* four paths: each decision doubles the path count when control flow merges between them.  
**Final answer** 50 % path coverage.  
*Reflection:* independent decisions produce exponential growth, the classic reason path coverage is rarely 100 % on real code.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| 100 % line coverage reported as “fully tested” | Tool only counts lines, not branches                | Always request branch coverage in the same report    |
| Ignoring exception paths          | Exceptions are invisible in source-line counts      | Enable coverage for catch/finally blocks             |
| Counting dead code as uncovered   | Compiler removes it; coverage tool sees no lines    | Delete or explicitly mark unreachable code           |
| Treating `switch` fall-through as one branch | Multiple case labels share the same edge            | Configure the tool to treat each case label separately |
| Using only “happy-path” unit tests | All tests drive the same Boolean outcomes           | Add negative tests that flip every predicate         |
| Forgetting short-circuit evaluation | `&&` and `||` suppress the second operand           | Instrument both sides of every logical operator      |
| Reporting coverage on generated code | Build artefacts pollute the metric                  | Exclude generated directories from instrumentation   |

## 7. The textbook-precise statement
Let \(G = (N, E, n_0, n_f)\) be the control-flow graph of a procedure with entry node \(n_0\) and exit node \(n_f\). A branch is an edge \(e \in E\). A path is a sequence of edges from \(n_0\) to \(n_f\) that respects the graph’s successor relation. Let \(T\) be a test suite. Line coverage is the fraction of nodes whose corresponding source lines are executed by at least one test in \(T\). Branch coverage is the fraction of edges traversed by \(T\). Path coverage is the fraction of feasible paths from \(n_0\) to \(n_f\) that are traversed by \(T\). (Pressman, *Software Engineering: A Practitioner’s Approach*, 8e, §17.4.2)

## 8. Visual — diagram or schematic
```text
entry
  |
  v
[ p? ] --true--> [A] --+
  |                     |
false                   |
  |                     v
  +----------------> [ q? ] --true--> [B]
                      |
                    false
                      |
                      v
                    exit
```
Nodes = basic blocks, edges = branches. Path coverage counts the four routes: entry→p-true→A→q-true→B→exit, entry→p-true→A→q-false→exit, entry→p-false→q-true→B→exit, entry→p-false→q-false→exit.

## 9. The memory technique
1. **The hook** — picture three nested Russian dolls: the outermost doll is labelled “Lines”, the middle “Branches”, the innermost “Paths”. You must open every doll to reach the smallest one.
2. **What to overlearn** — line ≤ branch ≤ path (percentages); a compound predicate `a && b` yields four branches; loops contribute exactly two paths when the body is straight-line.
3. **Spaced-repetition schedule** — review the hierarchy and the doll image after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — redraw the CFG of the function, label every edge with its Boolean outcome, then count how many edges and how many edge sequences your tests have actually traversed.

## 10. What this unlocks
Mastering these three coverage notions lets you design minimal test suites that are provably stronger than random testing and prepares you for mutation testing, concolic execution, and compiler fuzzing.

- Next topic: data-flow coverage (def-use pairs)
- Technique unlocked: minimal branch-covering test-set construction via set cover on the CFG
- Tooling unlocked: reading and extending LLVM’s SourceBasedCoverage and GCC’s gcov JSON reports

## 11. Self-check — five questions, no answers
1. A function contains only straight-line code. What are its line, branch, and path coverage values after any non-empty test?
2. Write a two-line predicate whose branch coverage can never exceed 75 % no matter how many tests you add.
3. A loop `while (i < 10) i++;` is executed with initial `i = 0` and again with `i = 100`. How many distinct paths have been covered?
4. You observe 100 % line coverage yet 0 % branch coverage on the same function. What must the function look like?
5. Using the CFG in section 8, give the shortest set of tests that achieves 100 % path coverage.