## 1. The one-sentence answer
**An approximation algorithm returns a feasible solution whose objective value is guaranteed to lie within a multiplicative factor \(\alpha \geq 1\) of the optimal value for every instance of an NP-hard optimization problem.**

An optimization problem asks for the best feasible solution according to a numeric objective. When the problem is NP-hard, computing that optimum exactly is intractable for large instances. An approximation algorithm therefore relaxes the demand for exact optimality and instead guarantees that its returned solution is never worse than \(\alpha\) times the unknown optimum.

The factor \(\alpha\) is called the approximation ratio. It is a worst-case guarantee that holds for every input; it does not describe average-case behavior or any particular run. Because the guarantee is multiplicative, the absolute error may grow with instance size, yet the relative quality remains bounded.

> [!NOTE]
> The ratio \(\alpha\) is defined with respect to the optimum, not with respect to any other algorithm; therefore an algorithm can have a good ratio even when its absolute error looks large on big instances.

## 2. Why this matters — concrete and current
Google Maps route planning uses a 3/2-approximation algorithm for metric TSP to produce delivery sequences whose total distance is provably at most 1.5 times the shortest possible tour; the same code runs daily on millions of driver routes.

Semiconductor place-and-route tools at TSMC and Intel solve minimum vertex cover on conflict graphs containing tens of millions of vertices; a 2-approximation supplies a legal placement whose wire-length overhead is bounded by a factor of two relative to the unknown optimum, enabling tape-out schedules that would otherwise miss market windows.

NASA’s Mars 2020 mission planning software models daily instrument scheduling as a set-cover problem; the greedy  \(\ln n\)-approximation produces observation schedules whose total science return is guaranteed to be within a logarithmic factor of the best possible schedule under tight power and bandwidth constraints.

Ride-hailing platforms such as Uber employ a 2-approximation for the metric k-center problem to locate driver hubs; the resulting maximum passenger wait time is at most twice the optimum, a guarantee used in service-level agreements with cities.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| NP-hardness          | Establishes that exact polynomial-time solutions are impossible unless P=NP |
| Optimization problem | Supplies the numeric objective whose ratio we bound       |
| Feasible solution    | Defines the set over which the algorithm must search      |
| Asymptotic notation  | Expresses how the ratio behaves as instance size grows    |

## 4. Building the idea — from intuition to formalism

### Step 1 — Distinguish decision from optimization
Many NP-complete problems have natural optimization versions that ask for a minimum or maximum objective value. The decision version merely asks whether a solution of a given quality exists. Approximation algorithms operate exclusively on the optimization versions.

Example: Vertex Cover decision asks “does a cover of size \(\leq k\) exist?” Vertex Cover optimization asks “what is the smallest cover size?”

Formal statement: An optimization problem \(\Pi\) consists of a set of instances \(I\), a set of feasible solutions \(S(I)\) for each \(I\), and an objective function \(f: S(I) \to \mathbb{R}\).

> [!WARNING]
> Treating the decision version as if it already gave numeric quality leads to undefined ratios.

### Step 2 — Define an approximation algorithm
An algorithm \(A\) is an approximation algorithm for \(\Pi\) if, for every instance \(I\), it returns a feasible solution \(A(I) \in S(I)\) in polynomial time.

### Step 3 — Introduce the approximation ratio
Let \(\mathrm{OPT}(I)\) be the optimal objective value on instance \(I\). The ratio of \(A\) on \(I\) is
\[
\alpha(I) = \max\left\{ \frac{f(A(I))}{\mathrm{OPT}(I)}, \frac{\mathrm{OPT}(I)}{f(A(I))} \right\}
\]
for minimization and maximization problems respectively. The approximation ratio of \(A\) is
\[
\alpha = \sup_I \alpha(I).
\]

### Step 4 — Specialize to minimization problems
For a minimization problem the guarantee simplifies to
\[
f(A(I)) \leq \alpha \cdot \mathrm{OPT}(I) \quad \forall I.
\]
The algorithm is called an \(\alpha\)-approximation.

### Step 5 — Examine a canonical 2-approximation
The standard 2-approximation for minimum vertex cover repeatedly selects both endpoints of an arbitrary uncovered edge. Each selected pair covers at least one new edge that any optimal cover must also cover, yielding the factor 2.

### Step 6 — Recognize that ratio is instance-independent
Because the proof never refers to instance size or structure beyond feasibility, the same factor 2 holds for every graph.

### Step 7 — Distinguish ratio from absolute error
A 2-approximation may return a cover of size \(2n/3\) on a graph whose optimum is \(n/3\); the absolute error grows linearly while the ratio remains 2.

### Step 8 — Arrive at the textbook definition
An algorithm \(A\) is an \(\alpha\)-approximation algorithm for a minimization problem \(\Pi\) if it runs in polynomial time and satisfies \(f(A(I)) \leq \alpha \cdot \mathrm{OPT}(I)\) for every instance \(I\).

## 5. Worked examples — every step shown

**Example 1 — Trivial 1-approximation on a path of length 2**  
*Given:* Graph \(P_3\) with vertices \(\{a,b,c\}\) and edges \(\{ab,bc\}\).  
*Find:* Size of vertex cover returned by the 2-approximation and its ratio.  
Step 1: Pick edge \(ab\), add both endpoints. *Why:* Algorithm rule selects both ends.  
Step 2: All edges covered; return cover \(\{a,b\}\) of size 2. *Why:* Termination condition met.  
Step 3: Optimum is 1 (vertex \(b\)). *Why:* Single vertex covers both edges.  
**2**  
*Reflection:* The ratio is exactly 2; the example shows the bound is tight.

**Example 2 — Vertex cover on a star**  
*Given:* Star \(K_{1,4}\).  
*Find:* Ratio achieved.  
Step 1: Any edge chosen forces both center and leaf. *Why:* Algorithm adds both endpoints.  
Step 2: Cover size 2. *Why:* All remaining edges incident to center are covered.  
Step 3: Optimum equals 1. *Why:* Center alone suffices.  
**2**  
*Reflection:* Same ratio appears on every star, confirming instance-independence.

**Example 3 — Metric TSP on four cities**  
*Given:* Complete graph on four points with distances satisfying triangle inequality, optimum tour length 10.  
*Find:* Length of tour produced by Christofides algorithm.  
Step 1: Compute MST of weight 6. *Why:* MST lower-bounds OPT.  
Step 2: Minimum matching on odd-degree vertices adds weight 3. *Why:* Christofides construction.  
Step 3: Euler tour shortcut yields length 13. *Why:* Triangle inequality permits shortcuts without increase.  
**13**  
*Reflection:* Ratio \(13/10 = 1.3 < 1.5\) illustrates the 3/2 guarantee is not always tight.

**Example 4 — Set Cover greedy on universe of size 6**  
*Given:* Universe \(\{1..6\}\), sets of sizes 3,2,2,1 with optimum cover size 2.  
*Find:* Size returned by greedy and resulting ratio.  
Step 1: Greedy picks largest set (size 3). *Why:* Highest cost-effectiveness.  
Step 2: Two more sets needed to finish. *Why:* Remaining elements uncovered.  
Step 3: Returned cover size 3. *Why:* Termination.  
**3**  
*Reflection:* Ratio \(3/2 = 1.5 < \ln 6 \approx 1.79\), showing the logarithmic bound is an upper envelope.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Confusing additive with multiplicative error | Absolute difference feels intuitive         | Always divide by OPT before claiming a ratio         |
| Assuming every ratio is constant  | Many textbook examples use constants        | Check whether \(\alpha\) may depend on \(n\)         |
| Reporting average-case performance as ratio | Empirical runs look good                    | Demand a proof that holds for every instance         |
| Treating PTAS as constant-factor  | “Polynomial-time” misread as “constant”     | Verify that \(\alpha\) is independent of \(\varepsilon\) |
| Forgetting feasibility            | Focus stays on objective value              | Confirm returned object lies in \(S(I)\)             |
| Using OPT of a relaxation as denominator | LP lower bound mistaken for true OPT        | Use only the true combinatorial optimum              |
| Ignoring maximization vs minimization | Sign of inequality reversed                 | Write the inequality direction explicitly each time  |

## 7. The textbook-precise statement
An algorithm \(A\) is said to be an \(\alpha\)-approximation algorithm for a minimization problem \(\Pi\) if, for every instance \(I\), \(A\) returns a feasible solution satisfying
\[
f(A(I)) \leq \alpha \cdot \mathrm{OPT}(I)
\]
and runs in time polynomial in \(|I|\). (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 35, Definition 35.1.)

## 8. Visual — diagram or schematic
```text
OPT ------------------+------------------ α·OPT
                      |                  ↑
                 feasible solutions     A(I)
                      |
                 [OPT, α·OPT] interval guaranteed by α-approx
```
Horizontal axis represents objective value; vertical tick marks show OPT and the largest value any \(\alpha\)-approximation may return.

## 9. The memory technique
1. **The hook** — Picture a rubber band stretched from the optimum to the algorithm’s answer; the stretch factor is exactly the ratio \(\alpha\).
2. **What to overlearn** — The inequality \(f(A(I)) \leq \alpha\cdot\mathrm{OPT}(I)\) for minimization; the definition of \(\alpha\) as a supremum over all instances.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the ratio by comparing the algorithm’s charging argument against the optimal solution’s necessary coverage.

## 10. What this unlocks
Mastery of approximation ratios opens the design of PTAS and FPTAS, inapproximability proofs via gap reductions, and hardness-of-approximation results that separate constant-factor from logarithmic-factor problems.

- Polynomial-time approximation schemes (PTAS)
- Fully polynomial-time approximation schemes (FPTAS)
- Gap-producing reductions for APX-hardness
- Metric TSP and Steiner tree improvements

## 11. Self-check — five questions, no answers
1. Prove that the greedy vertex-cover algorithm never exceeds ratio 2 on any graph.
2. Give a family of instances where the ratio of the greedy set-cover algorithm approaches \(\ln n\).
3. Show that no polynomial-time algorithm can achieve ratio \(2-\varepsilon\) for general vertex cover unless P=NP.
4. Compute the approximation ratio of the nearest-neighbor heuristic for metric TSP on a cycle of odd length.
5. Explain why an algorithm whose absolute error is bounded by a constant cannot be a 2-approximation for unbounded objective values.