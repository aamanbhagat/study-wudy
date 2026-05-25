## What it is
Code coverage is a metric that measures the degree to which the source code of a program is executed by a particular test suite. It quantifies "how much" of your code your tests actually run. The primary types—line, branch, and path coverage—provide increasingly rigorous ways of measuring this execution.

## Why it matters
In safety-critical systems like flight control software for rockets or aircraft, untested code can lead to catastrophic failure. For example, the Ariane 5 rocket failure was partly due to an untested code path for a specific data conversion. In physics simulations and machine learning models, coverage analysis ensures that your tests exercise the code handling various boundary conditions and physical regimes, preventing subtle, hard-to-find bugs in your scientific or inference code.

## When to study it
You should understand basic programming control structures: functions, conditionals (`if`/`else`), and loops (`for`/`while`). You must also have a foundational understanding of software testing, specifically the concept of a unit test—a piece of code that verifies a small, isolated part of the program. If you have not written a simple unit test before, do that first.

## How to study it (step by step)
1.  **Write a target function.** Create a simple Python function with at least one `if/else` statement and a nested conditional. This will be our specimen.
2.  **Manually trace for line coverage.** Write a single test case. Trace its execution path line by line through the function. Calculate line coverage: (lines executed) / (total executable lines).
3.  **Achieve 100% line coverage.** If your first test didn't cover all lines, write a second one that does. Observe how a single test can sometimes achieve 100% line coverage without testing all logic.
4.  **Manually trace for branch coverage.** Using your test cases, identify every decision point (`if`, `while`). A decision point has two branches: true and false. Count how many of these branches your tests execute. Calculate branch coverage: (branches taken) / (total branches).
5.  **Achieve 100% branch coverage.** Write the minimum number of test cases required to execute every possible branch (both `true` and `false` for every conditional). Note that this is a stricter requirement than 100% line coverage.
6.  **Map out the paths.** Draw a control flow graph (see Diagrams section) for your function. A path is a unique route from the function's entry to its exit. Count the total number of unique paths.
7.  **Calculate path coverage.** Determine how many unique paths your test suite executes. Realize that for even simple functions with loops, the number of paths can become astronomically large or infinite, making 100% path coverage impractical.

## Key ideas, with intuition
1.  **Line Coverage: Have I been on this street?**
    This is the most basic form of coverage. It asks: "For each executable line of code, was it run at least once by my tests?" It's a weak metric because it doesn't care *how* the line was reached.
    $$ C_{line} = \frac{\text{Number of lines executed}}{\text{Total number of executable lines}} $$

2.  **Branch Coverage: Have I taken every turn at the intersection?**
    This is a stronger metric. It focuses on decision points (like `if` statements). For every decision, it asks: "Have my tests evaluated this condition to both `true` and `false`?" This ensures you've tested both outcomes of a branch.
    $$ C_{branch} = \frac{\text{Number of branches executed}}{\text{Total number of branches}} $$

3.  **Path Coverage: Have I driven every possible route?**
    This is the strongest and most comprehensive metric. It asks: "Have my tests executed every possible sequence of branches from the start of the function to the end?" The number of paths can grow exponentially with the number of branches, making 100% path coverage often impossible in practice, especially with loops.
    $$ C_{path} = \frac{\text{Number of paths executed}}{\text{Total number of possible paths}} $$

4.  **The Coverage Hierarchy.** These forms of coverage are related. Achieving 100% path coverage guarantees 100% branch coverage. Achieving 100% branch coverage guarantees 100% line coverage. The reverse is not true.
    $$ C_{path} \implies C_{branch} \implies C_{line} $$
    Think of it as a set of nested dolls. Testing all paths requires you to test all turns, which requires you to run on all streets.

## Worked example
Consider this function for classifying a rocket's flight regime.

```python
# Executable lines are numbered L1-L7
def classify_regime(velocity_ms, altitude_m):
    L1: if altitude_m > 80000:              # Decision A
    L2:     if velocity_ms > 7800:          # Decision B
    L3:         return "Orbital"
    L4:     else:
    L5:         return "Mesospheric"
    L6: else:
    L7:     return "Atmospheric"
```

There are 7 executable lines.
There are 2 decision points (A and B), so there are $2 \times 2 = 4$ total branches (A-True, A-False, B-True, B-False).
There are 3 unique paths from entry to exit.

**Test Suite:**
1.  `test_1`: `classify_regime(velocity_ms=2000, altitude_m=10000)`
2.  `test_2`: `classify_regime(velocity_ms=8000, altitude_m=90000)`
3.  `test_3`: `classify_regime(velocity_ms=5000, altitude_m=90000)`

**Analysis Step-by-Step:**

1.  **Trace `test_1`:**
    - `altitude_m` (10000) is not > 80000. Decision A is `false`.
    - Path taken: L1 -> L6 -> L7.
    - Lines executed: L1, L6, L7. Branches taken: A-False.

2.  **Trace `test_2`:**
    - `altitude_m` (90000) is > 80000. Decision A is `true`.
    - `velocity_ms` (8000) is > 7800. Decision B is `true`.
    - Path taken: L1 -> L2 -> L3.
    - Lines executed: L1, L2, L3. Branches taken: A-True, B-True.

3.  **Trace `test_3`:**
    - `altitude_m` (90000) is > 80000. Decision A is `true`.
    - `velocity_ms` (5000) is not > 7800. Decision B is `false`.
    - Path taken: L1 -> L2 -> L4 -> L5.
    - Lines executed: L1, L2, L4, L5. Branches taken: A-True, B-False.

**Calculate Coverage:**

-   **Line Coverage:**
    -   Total executable lines: {L1, L2, L3, L4, L5, L6, L7}. Count = 7.
    -   Lines executed by suite: {L1, L6, L7} $\cup$ {L1, L2, L3} $\cup$ {L1, L2, L4, L5} = {L1, L2, L3, L4, L5, L6, L7}. Count = 7.
    -   $C_{line} = 7 / 7 = 100\%$.

-   **Branch Coverage:**
    -   Total branches: {A-True, A-False, B-True, B-False}. Count = 4.
    -   Branches executed by suite: {A-False} $\cup$ {A-True, B-True} $\cup$ {A-True, B-False} = {A-True, A-False, B-True, B-False}. Count = 4.
    -   $C_{branch} = 4 / 4 = 100\%$.

-   **Path Coverage:**
    -   Total paths:
        1.  L1(F) -> L6 -> L7
        2.  L1(T) -> L2(T) -> L3
        3.  L1(T) -> L2(F) -> L4 -> L5
    -   Paths executed by suite: `test_1` covers Path 1. `test_2` covers Path 2. `test_3` covers Path 3.
    -   $C_{path} = 3 / 3 = 100\%$.

**Reflection:** We needed three distinct test cases to exercise every line, every branch, and every path. Notice that if `test_3` were omitted, we would still have 100% line coverage (since L2 is executed by `test_2`), but our branch coverage would drop to $3/4 = 75\%$ (B-False is missed) and path coverage would drop to $2/3 \approx 67\%$. This shows how line coverage can hide untested logic.

## Diagrams
A Control Flow Graph (CFG) for the `classify_regime` function. Nodes are blocks of code, and edges are the flow of control.

```text
      [ Entry ]
         |
         v
    (L1: alt > 80k?) --(False)--> (L6, L7: return "Atmospheric") --> [ Exit ]
         |
      (True)
         |
         v
    (L2: vel > 7.8k?) --(False)--> (L4, L5: return "Mesospheric") --> [ Exit ]
         |
      (True)
         |
         v
 (L3: return "Orbital") --> [ Exit ]
```

## Memory technique — remember this forever
1.  **The GPS Navigation Analogy:**
    -   **Line Coverage:** Your GPS confirms you have driven on *every street segment* in the city at least once.
    -   **Branch Coverage:** Your GPS confirms that at *every intersection*, you have made *every possible turn* (left, right, straight).
    -   **Path Coverage:** Your GPS confirms you have driven *every possible unique route* from the city entrance to every possible exit. This is clearly the most difficult and often absurd goal.

2.  **Must-know formulas:**
    $$ C_{line} = \frac{\text{Lines executed}}{\text{Total executable lines}} $$
    $$ C_{branch} = \frac{\text{Branches taken}}{\text{Total branches}} $$
    $$ C_{path} = \frac{\text{Paths executed}}{\text{Total paths}} $$

3.  **Spaced Repetition Schedule:** Review this material and re-derive the worked example at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget, always come back to the **Control Flow Graph (CFG)**. Draw the function as a graph of nodes (code blocks) and directed edges (decisions).
    -   Line coverage is about visiting all nodes.
    -   Branch coverage is about traversing all edges.
    -   Path coverage is about traversing all unique start-to-end routes.

## Common mistakes
1.  **Equating 100% Coverage with Correctness:** A test can execute a line of code containing a bug (e.g., `x = y + 2` instead of `x = y * 2`) and still "cover" it. Coverage proves your tests *ran* the code, not that the code is *correct*.
2.  **Ignoring Logical Operators:** Branch coverage on `if (a && b)` only requires two tests: one where the expression is true, one where it's false. For example, `(a=true, b=true)` and `(a=false, b=true)`. This misses the case where `b` is false. Stricter criteria like Modified Condition/Decision Coverage (MC/DC), used in avionics, exist to fix this.
3.  **Obsessing over 100% Path Coverage:** Except for trivial functions, this is impossible. A simple loop that can run 0 to 20 times introduces over a million paths. Focus on achieving high branch coverage and strategically testing important paths.

## Self-check
1.  A function has a single `if` statement with no `else` block. What is the minimum number of test cases required to achieve 100% branch coverage?
2.  Consider the function `def f(n): for i in range(n): print(i)`. How many unique execution paths exist? Explain why 100% path coverage is not a feasible goal for this function.
3.  Write a simple function where a single test case achieves 100% line coverage but only 50% branch coverage. Explain your code and the test case that demonstrates this.