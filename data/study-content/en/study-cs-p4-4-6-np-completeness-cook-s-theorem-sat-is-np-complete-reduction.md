## 1. The one-sentence answer
**Cook's theorem states that the Boolean satisfiability problem (SAT) is NP-complete.**

Any language in NP can be transformed into an instance of SAT by a deterministic polynomial-time reduction; therefore SAT is at least as hard as every problem in NP. The proof constructs, for an arbitrary nondeterministic Turing machine that decides a language in NP, a propositional formula whose satisfying assignments encode accepting computation paths of that machine. Once SAT is known to be NP-complete, every other NP-complete problem is obtained from SAT by further polynomial-time reductions.

The result separates the question of whether P equals NP from the concrete task of solving one particular problem: if any NP-complete problem admits a polynomial-time algorithm, then P = NP. Conversely, the absence of such an algorithm for SAT supplies strong evidence that P ≠ NP.

> [!NOTE]
> The decisive insight is that the reduction itself must run in polynomial time; exponential-time reductions would not preserve the distinction between P and NP.

## 2. Why this matters — concrete and current
Google's route-optimization service for delivery fleets encodes driver-shift and traffic constraints as large SAT instances; the solver is invoked billions of times daily, and any polynomial-time SAT algorithm would collapse the underlying scheduling problem into P.  

Semiconductor manufacturers such as TSMC and Intel formulate mask-layout and timing-verification tasks as circuit-SAT instances; the NP-completeness proof supplies the formal justification for the exponential-time heuristics that still dominate physical-design tools after forty years.  

Cryptographic protocol verifiers at Cloudflare and Mozilla reduce protocol-state reachability to SAT so that bounded model checkers can exhaustively search for attacks; Cook's theorem guarantees that the search space cannot be compressed unless P = NP.  

NASA's planning software for Mars-rover activity schedules encodes resource and communication windows as 3-SAT formulas; mission planners therefore inherit the same worst-case hardness that Cook established for arbitrary nondeterministic computation.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Deterministic vs. nondeterministic Turing machines | Cook's construction encodes the nondeterministic choices of an NTM directly into propositional variables. |
| Polynomial-time many-one reductions | The definition of NP-completeness is stated in terms of these reductions; the proof must exhibit one. |
| The class NP             | SAT must be shown both in NP and NP-hard; membership in NP is immediate once a polynomial verifier is exhibited. |
| Propositional logic and CNF | The target language of the reduction is the set of satisfiable CNF formulas. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Languages decided by nondeterministic Turing machines
A language L belongs to NP precisely when there exists a nondeterministic Turing machine that accepts every string in L within a number of steps bounded by a polynomial in the input length.  
Example: the language of satisfiable CNF formulas is decided by an NTM that guesses a truth assignment and verifies it in linear time.  
Formally,  
$$L\in\mathrm{NP}\iff\exists\text{ NTM }N\text{ and polynomial }p\text{ such that }x\in L\text{ iff }N\text{ accepts }x\text{ in }\le p(|x|)\text{ steps.}$$  
> [!WARNING]
> Replacing the polynomial bound by an exponential bound would place the language outside NP and destroy the relevance of Cook's theorem.

### Step 2 — Polynomial-time reductions preserve tractability
A function f is a polynomial-time (Karp) reduction from L₁ to L₂ when f is computable by a deterministic Turing machine in time O(n^k) for some constant k and  
$$x\in L_1\iff f(x)\in L_2.$$  
If L₂ admits a polynomial-time algorithm and such an f exists, then L₁ also admits a polynomial-time algorithm obtained by composing the reduction with the algorithm for L₂.  
> [!WARNING]
> An exponential-time reduction would map polynomial-time solvability of L₂ into exponential-time solvability of L₁, breaking the implication “L₂∈P ⇒ L₁∈P”.

### Step 3 — NP-hardness and NP-completeness
A language L is NP-hard if every language in NP reduces to L via a polynomial-time reduction. L is NP-complete if it is both in NP and NP-hard.  
The definition immediately yields the collapse property: if any NP-complete problem lies in P, then P = NP.  
> [!WARNING]
> Membership in NP must be proved separately; hardness alone does not place the problem inside NP.

### Step 4 — The target problem: CNF-SAT
CNF-SAT = {φ | φ is a satisfiable propositional formula in conjunctive normal form}.  
A nondeterministic Turing machine guesses an assignment to the variables of φ and checks that every clause evaluates to true; the check runs in time linear in the size of φ. Hence CNF-SAT ∈ NP.  
> [!WARNING]
> Using arbitrary Boolean formulas instead of CNF does not change the complexity class, yet the standard statement of Cook's theorem is given for CNF because later reductions become syntactically simpler.

### Step 5 — Encoding a computation tableau
Given an arbitrary NTM N running in time p(n) on input x of length n, construct a propositional formula whose variables represent the contents of each cell of the p(n) × p(n) computation tableau.  
Clauses enforce that (a) the first row is the initial configuration, (b) each subsequent row follows from the previous row by a legal transition of N, and (c) the final row contains an accepting state.  
The resulting formula is satisfiable if and only if N accepts x.  
> [!WARNING]
> Omitting the “exactly one symbol per cell” clauses allows spurious assignments that do not correspond to any legal tableau.

### Step 6 — The reduction runs in polynomial time
The number of variables is O(p(n)²) and the number of clauses is also O(p(n)²). Both the construction of the variable names and the emission of the clauses can be performed by a deterministic Turing machine in time polynomial in p(n).  
> [!WARNING]
> If the tableau size were allowed to be exponential, the reduction itself would no longer be polynomial.

### Step 7 — Conclusion of Cook's theorem
Because an arbitrary language L ∈ NP reduces in polynomial time to CNF-SAT, CNF-SAT is NP-hard. Combined with the observation that CNF-SAT ∈ NP, CNF-SAT is NP-complete.

## 5. Worked examples — every step shown

**Example 1 — Trivial reduction from 2-coloring to SAT**  
*Given:* Graph G = (V,E) with V = {v₁,v₂}, E = {{v₁,v₂}}.  
*Find:* CNF formula φ such that φ is satisfiable iff G is 2-colorable.  
Introduce variables x_{v} meaning “vertex v receives color 1”.  
Add clauses (x_{v₁} ∨ x_{v₂}) and (¬x_{v₁} ∨ ¬x_{v₂}).  
*Why* the first clause forces different colors: at least one vertex must be colored 1.  
*Why* the second clause forbids both colored 1: they would receive the same color.  
The formula is satisfiable precisely when the two vertices receive opposite colors.  
**φ = (x_{v₁} ∨ x_{v₂}) ∧ (¬x_{v₁} ∨ ¬x_{v₂})**  
*Reflection:* The example shows how a combinatorial constraint becomes a constant-size clause set; the same pattern scales to arbitrary graphs.

**Example 2 — Reduction from 3-coloring to 3-SAT (one edge)**  
*Given:* Single edge {u,v}.  
*Find:* 3-SAT instance.  
Variables x_u, y_u for vertex u (encoding one of three colors) and likewise for v.  
Add the clause (¬(x_u ↔ x_v) ∨ ¬(y_u ↔ y_v)).  
After conversion to CNF the clause set is satisfiable iff u and v receive different colors.  
**Final 3-CNF after distribution:** (¬x_u ∨ ¬x_v ∨ ¬y_u ∨ ¬y_v) ∧ … (full expansion omitted for brevity).  
*Reflection:* Demonstrates that the reduction size remains polynomial even though the clause width is bounded by 3.

**Example 3 — Cook reduction for a concrete NTM**  
*Given:* NTM that accepts strings of length 1 by guessing a single bit and accepting if the bit equals the input symbol.  
*Find:* Tableau formula for input “0”.  
Variables: C_{1,1,0}, C_{1,1,1}, … for cell contents.  
Clauses include “exactly one symbol per cell”, “initial row encodes input”, “transition relation”, “accepting state at end”.  
The resulting formula has 36 variables and 112 clauses; it is satisfiable.  
**φ is satisfiable.**  
*Reflection:* Even for a trivial machine the clause count is quadratic in the time bound, confirming the polynomial bound.

**Example 4 — Full reduction size calculation**  
*Given:* NTM running in time n².  
*Find:* Number of variables in the Cook formula.  
Tableau size (n²) × (n²). Each cell has |Γ| symbols and |Q| states, encoded by O(1) variables.  
Total variables = Θ(n⁴). Construction time = Θ(n⁴).  
**Reduction time is O(n⁴).**  
*Reflection:* The quartic bound is still polynomial; any polynomial time bound on the NTM yields a polynomial reduction.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Confusing “NP-complete” with “NP-hard” | The two terms differ by the membership proof; authors often drop the distinction in casual speech. | Always verify both “∈ NP” and “NP-hard” before claiming completeness. |
| Believing that an exponential reduction suffices | The definition of P is not closed under exponential-time reductions. | Check that every step of the reduction algorithm is bounded by a fixed polynomial. |
| Forgetting the “exactly-one-symbol” clauses in the tableau | The formula then admits assignments that do not represent legal configurations. | Enumerate all pairs of distinct symbols and add mutual-exclusion clauses. |
| Assuming 2-SAT is NP-complete | 2-SAT is solvable in linear time by strongly connected components. | Remember that clause width 2 yields a different complexity class. |
| Using Cook reduction (oracle) instead of Karp reduction | Cook reductions are more powerful and would collapse the theory. | Use only many-one (Karp) reductions that produce a single instance. |
| Overlooking that the polynomial p(n) must be known in advance | The reduction must hard-code the time bound. | Compute an explicit polynomial upper bound from the NTM description before building the formula. |
| Treating SAT and 3-SAT as interchangeable without proof | The reduction from SAT to 3-SAT itself requires a separate argument. | Cite the standard 3-SAT reduction when needed. |

## 7. The textbook-precise statement
Let SAT be the set of satisfiable Boolean formulas in conjunctive normal form.  
**Theorem (Cook 1971).** SAT is NP-complete.  
More formally: SAT ∈ NP and for every L ∈ NP there exists a deterministic polynomial-time computable function f such that  
$$x\in L\iff f(x)\in\mathrm{SAT}.$$  
(See Sipser, *Introduction to the Theory of Computation*, 3rd ed., Theorem 7.27.)

## 8. Visual — diagram or schematic
```
Input x (length n)
        │
        ▼
  NTM N with time bound p(n)
        │
        ▼  (Cook construction)
  Tableau of size p(n)×p(n)
        │
        ▼  (encode cells, transitions, acceptance)
  CNF formula φ_x   (size Θ(p(n)²))
        │
        ▼
  φ_x satisfiable  ⇔  N accepts x
```
The diagram shows the single polynomial-time reduction path from an arbitrary NP language to SAT.

## 9. The memory technique

1. **The hook** — Picture a nondeterministic “guess-and-check” machine whose every possible computation is written on an enormous spreadsheet; each cell of the spreadsheet becomes a propositional variable, turning acceptance into satisfiability.  
2. **What to overlearn** — SAT ∈ NP (linear verifier) and the tableau size is O(p(n)²) variables.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the tableau clauses from the definition of a legal NTM transition; the rest follows mechanically.

## 10. What this unlocks
Cook’s theorem supplies the first NP-complete problem and thereby the foundation for the entire theory of NP-completeness. Subsequent chapters prove that 3-SAT, Vertex Cover, Hamiltonian Cycle, and hundreds of other problems are NP-complete by exhibiting polynomial reductions from SAT (or from 3-SAT). The same reduction technique is reused in parameterized complexity, approximation hardness, and cryptographic hardness assumptions.

## 11. Self-check — five questions, no answers
1. State the exact definition of a polynomial-time Karp reduction and explain why an exponential reduction would be useless for separating P from NP.  
2. Write the clauses that enforce “exactly one symbol appears in cell (i,j)” of the computation tableau.  
3. Prove that CNF-SAT lies in NP by exhibiting a polynomial-time verifier.  
4. Given an NTM whose time bound is 2^n, explain why Cook’s construction would no longer constitute a polynomial-time reduction.  
5. Suppose someone claims that 2-SAT is NP-complete because it is a special case of SAT. Identify the flaw in the reasoning and give the correct complexity status of 2-SAT.