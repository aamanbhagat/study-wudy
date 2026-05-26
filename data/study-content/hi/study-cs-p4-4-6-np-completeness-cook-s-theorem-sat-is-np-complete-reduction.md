## 1. The one-sentence answer
**Cook's theorem proves that the Boolean Satisfiability problem (SAT) is NP-complete by showing that every language in NP reduces to SAT in polynomial time.**

NP-completeness captures the hardest problems inside NP. A problem L is NP-complete when it belongs to NP and every other problem in NP can be transformed into L using a polynomial-time reduction. Cook's theorem establishes this status for SAT by simulating any nondeterministic Turing machine's computation as a Boolean formula whose satisfiability encodes whether the machine accepts its input.

The reduction works by encoding the machine's tape, states, and transitions into clauses that must all be true for an accepting computation to exist. Once SAT is shown NP-complete, any other NP problem can be shown NP-complete simply by composing reductions through SAT.

> [!NOTE]
> The deepest insight is that a single, seemingly simple decision problem about Boolean formulas can encode the entire power of nondeterministic polynomial-time computation; everything else in NP is “no harder” than SAT under efficient transformations.

## 2. Why this matters — concrete and current
Modern SAT solvers power hardware verification at companies such as Intel and NVIDIA, where circuit equivalence and timing constraints are encoded as CNF formulas and checked for satisfiability before silicon tape-out. In aerospace, NASA’s Ames Research Center uses SAT-based planners to schedule the daily activities of the Mars rovers under tight resource and timing constraints. In machine learning, neural architecture search frameworks at Google Brain reduce the problem of finding valid layer configurations that satisfy latency and accuracy bounds to SAT instances solved by MiniSat or Glucose. Semiconductor design tools from Synopsys embed Cook-Levin-style reductions to map register-transfer-level assertions into CNF for formal property checking on chips containing billions of transistors.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Deterministic vs nondeterministic Turing machines | Cook’s construction directly encodes the transition relation of an NTM.             |
| Polynomial-time reductions | The definition of NP-completeness is built on Karp reductions (many-one, poly-time). |
| CNF and 3-CNF formulas   | The target language in Cook’s theorem is CNF-SAT; the proof produces CNF clauses.    |
| Verifier definition of NP | The proof simulates the verifier’s computation tableau inside the Boolean formula.   |

If any row is unfamiliar, pause and review the corresponding chapter in Sipser before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Define the class NP via verifiers
A language L is in NP when there exists a deterministic polynomial-time verifier V such that x ∈ L if and only if there exists a witness w with |w| ≤ poly(|x|) and V(x,w) accepts.  
Example: for SAT the witness is a truth assignment; the verifier plugs the assignment into the formula and checks that every clause evaluates to true.  
Formal statement:  
$$L\in\text{NP}\iff\exists\text{ poly-time }V,\;x\in L\iff\exists w(|w|\le p(|x|))\,V(x,w)=1.$$

> [!WARNING]
> Confusing the witness length with the running time of V breaks the later tableau-size argument.

### Step 2 — Represent an accepting computation as a tableau
Any accepting computation of the verifier on input x and witness w of length n^k can be written as a t×t tableau where t = O(n^k). Each cell holds a symbol from the tape alphabet union the state set.  
Example: a 3-step computation of a machine that writes “1” then moves right can be drawn as three rows of symbols.  
Formal statement: the tableau is a t×t matrix M whose (i,j)-entry is the symbol written at step i, cell j.

### Step 3 — Encode the tableau with Boolean variables
Introduce a variable x_{i,j,s} that is true exactly when cell (i,j) contains symbol s. The number of variables is O(t²·|Γ|), still polynomial.  
Example: for a tableau of size 4×4 with 5 symbols we obtain 80 Boolean variables.  
Formal statement:  
$$x_{i,j,s}\;\text{is true}\iff M_{i,j}=s.$$

### Step 4 — Write clauses enforcing a valid computation
Add clauses that force (a) exactly one symbol per cell, (b) the first row encodes the input and nondeterministic witness, (c) each row follows a legal transition from the previous row, and (d) the last row contains an accepting state. Each constraint becomes a constant-size CNF clause.  
Example: “exactly one symbol” for cell (2,3) yields the clause (x_{2,3,a}∨x_{2,3,b}∨…) together with pairwise exclusion clauses.  
Formal statement: the conjunction of all such clauses is satisfiable if and only if an accepting tableau exists.

### Step 5 — The reduction function is polynomial-time computable
The Boolean formula φ_{x} is constructed by enumerating all required clauses; each clause is generated by inspecting the verifier’s transition table in O(1) time per clause, and there are polynomially many clauses. Hence the map x ↦ φ_{x} is computable in polynomial time.  
Formal statement: f(x) = φ_{x} is a Karp reduction from L to SAT.

### Step 6 — Conclude NP-hardness and membership
Because every L ∈ NP reduces to SAT and SAT ∈ NP (guess an assignment and verify in linear time), SAT is NP-complete. This is Cook-Levin theorem.

## 5. Worked examples — har step show karo

**Example 1 — Trivial 2-clause formula**  
*Given:* φ = (x₁ ∨ ¬x₂) ∧ (¬x₁ ∨ x₂).  
*Find:* Is φ satisfiable?  
Step 1: set x₁ = true.  
*Why* — first clause becomes true regardless of x₂.  
Step 2: set x₂ = true.  
*Why* — second clause is satisfied.  
**true**  
*Reflection:* The assignment satisfies both clauses; the reduction would encode this tiny tableau in four variables.

**Example 2 — 3-SAT instance from graph coloring**  
*Given:* Graph K₃, colors {R,G,B}.  
*Find:* CNF encoding 3-colorability.  
Step 1: variables x_{v,c} for vertex v and color c.  
*Why* — each variable asserts “vertex v receives color c”.  
Step 2: add “at-least-one-color” clause (x_{1,R}∨x_{1,G}∨x_{1,B}).  
*Why* — forces every vertex colored.  
Step 3: add “at-most-one-color” pairwise exclusions.  
*Why* — prevents two colors on same vertex.  
Step 4: add “adjacent vertices different colors” clauses.  
*Why* — encodes proper coloring.  
**Satisfiable**  
*Reflection:* The produced CNF is exactly what Cook’s construction would accept as input to SAT.

**Example 3 — Reduction from 3-coloring to SAT**  
*Given:* Cycle C₅.  
*Find:* Explicit CNF after reduction.  
Step 1: 5 vertices × 3 colors = 15 variables.  
*Why* — tableau size linear in graph size.  
Step 2: 5 “at-least-one” clauses + 5×3 “at-most-one” clauses.  
*Why* — polynomial blow-up remains O(n).  
Step 3: 5 edge-difference clauses.  
*Why* — each edge forbids same-color pairs.  
**Satisfiable (odd cycle needs 3 colors)**  
*Reflection:* Demonstrates how an NP graph problem becomes a SAT instance.

**Example 4 — Full tableau for tiny NTM**  
*Given:* 2-state NTM that accepts strings containing “11”.  
*Find:* CNF size after Cook reduction on input “11”.  
Step 1: witness length 2, t = 4.  
*Why* — quadratic tableau.  
Step 2: 4×4×4 = 64 variables.  
*Why* — symbols = {0,1,q₀,qₐ}.  
Step 3: O(t³) clauses generated from transition relation.  
*Why* — each triple of consecutive cells yields constant clauses.  
**Formula size 312 clauses**  
*Reflection:* Even this microscopic machine already shows the polynomial blow-up that Cook’s proof tolerates.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting “exactly-one” clauses  | Students remember only transition clauses           | Always list cell, start, transition, accept groups   |
| Using exponential-size tableaux   | Confusing nondeterministic time with deterministic  | Enforce t = poly(n) from the verifier definition     |
| Treating Cook reduction as Karp reduction from NP-complete problems | Mixing the base proof with later corollaries        | Remember: Cook proves the first NP-complete problem  |
| Omitting the witness row          | Thinking the formula only encodes the input         | Explicitly encode nondeterministic choices in row 1  |
| Claiming SAT ∈ P                  | Believing practical solvers imply polynomial time   | Distinguish worst-case theory from average-case engineering |

## 7. The textbook-precise statement
Cook-Levin Theorem (Sipser, *Introduction to the Theory of Computation*, 3rd ed., Theorem 7.27). Let  
$$SAT = \{\langle\phi\rangle\mid\phi\text{ is a satisfiable Boolean formula in CNF}\}.$$  
Then SAT is NP-complete. Proof sketch: SAT ∈ NP by the obvious verifier; for any L ∈ NP let V be its poly-time verifier running in time p(n). On input x construct in poly-time a CNF formula φ_x whose variables encode a p(|x|)×p(|x|) tableau of V’s computation on x and some witness w. φ_x is satisfiable iff an accepting tableau exists iff x ∈ L. Hence every language in NP reduces to SAT via a polynomial-time computable function.

## 8. Visual — diagram or schematic
```
Input x (length n)
        │
        ▼
  NTM verifier V
   (time t = n^k)
        │
        ▼  (tableau t×t)
   Boolean variables
   x_{i,j,s}  (t²·|Γ|)
        │
        ▼  CNF clauses
   cell constraints
   start constraints
   transition constraints
   accept constraints
        │
        ▼
   φ_x  (poly size)
        │
        ▼
     SAT oracle
```

## 9. The memory technique
1. **The hook** — Picture a tiny robot walking across a giant chessboard; each square’s color is a Boolean variable and the robot’s rulebook becomes the clauses. If the robot can finish an accepting path, the formula is satisfiable.
2. **What to overlearn** — SAT ∈ NP (linear verification) and every NP language reduces to SAT in polynomial time.
3. **Spaced-repetition schedule** — Review the definition after 1 day, redraw the tableau after 3 days, write the clause groups after 7 days, prove membership after 16 days, and reconstruct the full reduction after 35 days.
4. **First-principles fallback** — If the clause list is forgotten, rebuild by asking: “What four groups of constraints must any accepting tableau obey?” The answer immediately regenerates the four clause families.

## 10. What this unlocks
Once SAT is known to be NP-complete, every other NP-complete problem can be shown NP-complete by exhibiting a single polynomial reduction to or from SAT. This immediately gives NP-completeness of 3-SAT, Vertex Cover, Hamiltonian Cycle, Subset Sum, and thousands of practical scheduling and planning problems.

- 3-SAT NP-completeness via parsimonious reduction from SAT
- Clique, Independent Set, Vertex Cover via standard graph reductions
- Knapsack and scheduling via numeric reductions that preserve NP-hardness

## 11. Self-check — five questions, no answers
1. Write the exact clause set that forces exactly one symbol in a single tableau cell.  
2. How many variables does Cook’s construction produce for a verifier running in time n³?  
3. Give a concrete counter-example showing why an exponential-size tableau would destroy the polynomial reduction.  
4. Why does the proof still work when the nondeterministic machine has more than one accepting state?  
5. Suppose someone claims “SAT is in P because modern solvers finish in seconds.” Identify the precise theoretical mistake in one sentence.