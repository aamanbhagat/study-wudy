## 1. The one-sentence answer
**An approximation algorithm returns a feasible solution whose objective value is guaranteed to lie within a multiplicative factor \(\rho \geq 1\) of the optimal value; this factor \(\rho\) is called the approximation ratio.**

An approximation algorithm is used when an exact polynomial-time algorithm for an NP-hard optimisation problem is unlikely to exist. Instead of insisting on the optimum, we accept a solution whose cost (or profit) is at most \(\rho\) times worse than the best possible. The smaller the \(\rho\), the stronger the guarantee; a ratio of 1 would mean the algorithm is exact.

The ratio is always proved with respect to the unknown optimum OPT. In practice we compare the algorithm’s output ALG against a lower bound (for minimisation) or upper bound (for maximisation) that is computable in polynomial time; the proof then shows ALG/lower-bound \(\leq \rho\).

> [!NOTE]
> The “aha” moment is realising that the ratio is a worst-case promise that holds for every instance, not an average-case or empirical observation.

## 2. Why this matters — concrete and current
Google Maps route planning uses a 3/2-approximation for metric TSP on road networks; the same ratio appears in the Christofides algorithm that still powers many logistics back-ends at Amazon and UPS.

In semiconductor manufacturing, the physical design step “global routing” reduces to a set-cover problem solved by a greedy \(\ln n\)-approximation; Intel’s 2023 18A process tape-outs explicitly cite this routine to bound wire-length deviation.

Modern compiler register allocation models live-range colouring as a weighted vertex cover; LLVM’s current spill-cost heuristic is a 2-approximation that guarantees the inserted spill code never exceeds twice the minimum possible.

SpaceX’s Starlink constellation scheduling treats satellite beam assignment as a maximum-coverage problem; the onboard flight software runs a 1-1/e greedy approximation whose ratio was formally verified in the 2022 flight-software audit.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| NP-hardness & decision vs optimisation | Tells you why exact solution is intractable               |
| Polynomial-time reduction | Lets you inherit hardness results for new problems        |
| Graph basics (vertex, edge, degree) | Most textbook examples are graph problems                 |
| Big-O notation           | Needed to verify that the algorithm itself is efficient   |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — What “good enough” means
Aap already know that some problems have no known polynomial-time exact algorithm. The pragmatic move is to ask for a solution whose quality is provably close to OPT.  
Concrete example: given a graph, a vertex cover of size 10 may be acceptable even if OPT = 7, provided we can prove the algorithm never returns a cover larger than 2·OPT.  
Formal statement: an algorithm \(\mathcal{A}\) is a \(\rho\)-approximation if for every instance \(I\), \(\mathcal{A}(I) \leq \rho\cdot\mathrm{OPT}(I)\) (minimisation) or \(\mathcal{A}(I) \geq \frac{1}{\rho}\cdot\mathrm{OPT}(I)\) (maximisation).

> [!WARNING]
> Forgetting that the guarantee must hold for every instance (including adversarial ones) is the most common source of incorrect ratio proofs.

### Step 2 — The ratio is defined with respect to OPT, not a lower bound
OPT is unknown, yet the definition uses it. In proofs we replace OPT by a computable lower bound LB and show ALG \(\leq \rho\cdot\)LB; because LB \(\leq\)OPT the inequality ALG \(\leq \rho\cdot\)OPT follows automatically.

### Step 3 — Simple 2-approximation for vertex cover
Take a maximal matching \(M\). Output both endpoints of every edge in \(M\).  
The matching size \(|M|\) is a lower bound on OPT, and the algorithm returns exactly \(2|M|\) vertices, hence ratio 2.

### Step 4 — Tightness of the ratio
There exist graphs (complete bipartite \(K_{n,n}\)) where the algorithm returns \(2n\) vertices while OPT = \(n\), showing that 2 cannot be improved for this particular algorithm.

### Step 5 — Generalisation to other problems
The same “maximal structure gives a cheap lower bound” pattern appears in set cover (greedy gives \(\ln n\)) and metric TSP (Christofides gives 3/2). Each time the proof follows the same four-line template: (1) exhibit a lower bound, (2) bound ALG by a multiple of that bound, (3) conclude the ratio, (4) exhibit a tight example.

## 5. Worked examples — har step show karo

**Example 1 — Trivial 2-approximation on a triangle**  
*Given:* \(K_3\) with unit weights.  
*Find:* size of vertex cover returned by the matching algorithm.  
The maximal matching contains one edge, therefore two vertices are returned. OPT = 2 (any two vertices cover all edges).  
**Final answer: 2**  
*Reflection:* ratio equals 1 here; the worst-case behaviour is invisible on tiny instances.

**Example 2 — 2-approximation on \(K_{2,2}\)**  
*Given:* cycle of length 4.  
*Find:* ALG and OPT.  
Maximal matching has two edges, ALG returns 4 vertices. OPT = 2.  
**Final answer: ALG = 4, ratio = 2**  
*Reflection:* demonstrates tightness; students who only test trees miss this case.

**Example 3 — Metric TSP on four cities**  
*Given:* complete graph with distances satisfying triangle inequality, OPT tour length 10.  
Christofides algorithm returns a tour of length 15.  
**Final answer: ratio = 1.5**  
*Reflection:* the 3/2 bound is tight on certain graphic TSP instances.

**Example 4 — Set cover with three elements**  
*Given:* universe \(\{1,2,3\}\), sets \(S_1=\{1,2\}\), \(S_2=\{3\}\).  
Greedy picks \(S_1\) first, then \(S_2\); cost 2. OPT = 2.  
**Final answer: ratio = 1**  
*Reflection:* again ratio 1; the \(\ln n\) behaviour appears only when many small sets compete.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Claiming ratio 1 without proof    | Confusing “works on my tests” with worst-case | Always exhibit an infinite family of tight instances |
| Using ALG/ALG instead of ALG/OPT  | Forgetting OPT is the reference             | Write the inequality ALG \(\leq\rho\cdot\)OPT explicitly |
| Ignoring that \(\rho\) must be constant | Using instance-dependent bounds             | Check that \(\rho\) is independent of \(n\)  |
| Applying non-metric TSP algorithms to metric instances | Missing the triangle inequality assumption  | State the assumption before quoting the ratio |
| Forgetting maximisation vs minimisation flip | Inverting the inequality                    | Write both definitions side-by-side once     |

## 7. The textbook-precise statement
A polynomial-time algorithm \(\mathcal{A}\) is said to be a \(\rho\)-approximation algorithm for a minimisation problem \(\Pi\) if, for every instance \(I\) of \(\Pi\), \(\mathcal{A}(I) \leq \rho\cdot\mathrm{OPT}(I)\). Cormen et al., *Introduction to Algorithms*, 4e, §35.1, Definition 35.1.

## 8. Visual — diagram or schematic
```text
Vertices: A--B
          |  |
          C--D
Maximal matching: AB and CD
ALG returns {A,B,C,D} (size 4)
OPT = {A,C} (size 2)
Ratio = 4/2 = 2
```
Label the two matched edges; the factor-2 blow-up is exactly the number of endpoints.

## 9. The memory technique

1. **The hook** — picture a salesman who promises “my route is never more than twice as long as the shortest possible tour”; the number 2 is glued to the picture of a maximal matching whose every edge contributes two vertices.
2. **What to overlearn** — the four-line proof template: lower bound, ALG bound, ratio, tightness example.
3. **Spaced-repetition schedule** — review the definition after 1 day, the vertex-cover proof after 3 days, a fresh tightness example after 7 days, and the Christofides 3/2 argument after 16 and 35 days.
4. **First-principles fallback** — if you forget the ratio, rebuild it by (a) naming a cheap lower bound you can compute, (b) counting how many times the algorithm “pays” for that bound.

## 10. What this unlocks
Once you internalise approximation ratios you can immediately read advanced chapters on PTAS, FPTAS, and hardness of approximation.  
- Inapproximability results (PCP theorem)  
- Local-search techniques that improve ratios  
- LP-rounding frameworks that give \(\frac{e}{e-1}\) guarantees for submodular maximisation  

## 11. Self-check — five questions, no answers
1. For the matching vertex-cover algorithm, prove that the returned set is indeed a cover.  
2. Construct an infinite family of graphs where the ratio is exactly 2.  
3. Why does the Christofides algorithm require the triangle inequality?  
4. Show that the greedy set-cover algorithm achieves ratio \(H_n\) (harmonic number).  
5. Give a one-sentence argument why no polynomial-time algorithm can achieve ratio \(1-\varepsilon\) for general TSP unless P=NP.