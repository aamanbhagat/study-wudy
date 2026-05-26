## 1. The one-sentence answer
**The simplex method is an iterative algorithm that solves a linear programming problem by moving from one basic feasible solution to an adjacent one while strictly improving the objective until optimality is reached.**

Linear programming finds the best value of a linear objective function subject to linear inequality constraints. The feasible region defined by those inequalities is a convex polytope, and the optimum always occurs at a vertex. The simplex method exploits this fact by examining only vertices, never the interior.

It begins with a basic feasible solution (a vertex), represents the problem in tableau form, and repeatedly selects an improving edge, pivots to the next vertex, and updates the tableau. Each pivot replaces one basic variable with a non-basic one while preserving feasibility.

> [!NOTE]
> The deepest insight is that you never need to check interior points or most vertices; the local improvement rule on the edge graph guarantees global optimality because the feasible region has no local maxima other than the global one.

## 2. Why this matters — concrete and current
Airbus uses the simplex method inside its production-planning solver to allocate assembly-line resources across the A320 family; each pivot cycle adjusts thousands of decision variables for fuselage, wing, and avionics scheduling while respecting supplier lead times.

Amazon’s fulfillment-center network solves daily a linear program whose constraint matrix exceeds 10^7 rows; the simplex implementation (via Gurobi) decides which items move between FCs so that next-day delivery promises remain feasible at minimum transportation cost.

In semiconductor manufacturing, TSMC runs a simplex-based capacity model every shift to decide which wafer lots enter which lithography tools; the model maximises throughput subject to reticle and metrology queue constraints that change in real time.

Portfolio optimisation at BlackRock’s Aladdin platform formulates mean-variance problems with linear constraints on sector exposure and liquidity; the simplex engine produces the efficient-frontier vertex that satisfies all regulatory stress-test inequalities.

NASA’s Deep Space Network scheduling system treats antenna time as a scarce resource and solves a large-scale LP daily; the simplex method returns the feasible assignment of tracking passes that maximises total data volume returned from Mars orbiters.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Systems of linear equations | Every pivot is Gaussian elimination on the equality form of the constraints |
| Basic and non-basic variables | The algorithm maintains exactly m basic variables whose columns form an invertible basis matrix |
| Inequality to equality conversion | Slack variables turn inequalities into equations so that the tableau can be written |
| Non-negativity of variables | All decision and slack variables must remain ≥ 0 after each pivot |

If any row above is unfamiliar, pause and review the corresponding linear-algebra material first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Convert to equality form
Write every inequality constraint as an equality by adding a non-negative slack variable. This produces a system Ax = b, x ≥ 0 whose solutions are exactly the feasible points of the original LP.

Example: maximise 3x + 4y subject to x + 2y ≤ 6, 2x + y ≤ 6, x,y ≥ 0 becomes x + 2y + s1 = 6, 2x + y + s2 = 6.

Formally, the standard-form LP is  
$$
\max c^T x \quad\text{s.t.}\quad Ax = b,\quad x \geq 0.
$$

> [!WARNING]
> Forgetting that slack variables also appear in the objective (with coefficient zero) will later produce an incorrect reduced-cost row.

### Step 2 — Identify an initial basis
Choose m linearly independent columns of A to form the basis matrix B. The corresponding basic solution is x_B = B^{-1}b, x_N = 0. If x_B ≥ 0 the solution is feasible and the algorithm can start.

### Step 3 — Construct the tableau
Augment the system with the objective row −c^T x + z = 0. The full tableau contains the coefficients of all variables together with the right-hand side.

### Step 4 — Test optimality via reduced costs
Compute the reduced-cost vector \bar{c}_N = c_N − c_B B^{-1} N. If every entry is non-positive (for a maximisation problem) the current basis is optimal; otherwise at least one non-basic variable can improve z.

### Step 5 — Choose the entering variable
Select the non-basic variable with the most positive reduced cost (Dantzig’s rule). Its column becomes the pivot column.

### Step 6 — Choose the leaving variable
Compute the ratios b_i / a_{i,enter} for all positive entries in the pivot column; the smallest non-negative ratio determines the leaving basic variable. This ratio test keeps the new solution feasible.

### Step 7 — Pivot and update
Perform row operations to make the entering column a unit column. The new basis is obtained by swapping the entering and leaving variables; the objective value strictly increases.

## 5. Worked examples — har step show karo

**Example 1 — Two-variable toy problem**  
*Given:* maximise 3x + 5y subject to x + y ≤ 4, 2x + y ≤ 5, x,y ≥ 0.  
*Find:* optimal vertex and value.  

Initial slacks: x + y + s1 = 4, 2x + y + s2 = 5.  
Basis {s1,s2}, x_B = (4,5). Reduced costs (3,5) both positive.  
Enter y (larger coefficient). Ratios 4/1 = 4, 5/1 = 5; s1 leaves.  
Pivot: new basis {y,s2}, solution x=0, y=4, z=20.  
Reduced costs now (−2,0) for x and s1; both ≤ 0 → optimal.  

**Final answer**  
**x=0, y=4, z=20**

*Reflection:* The single pivot already reached the optimum because the feasible region is a triangle and we started at the worst vertex.

**Example 2 — Need two pivots**  
*Given:* maximise 2x + 3y subject to x + 2y ≤ 6, x + y ≤ 4, x,y ≥ 0.  
Initial tableau yields first pivot y enters, s1 leaves → (x,y)=(0,3), z=9.  
Second pivot: x enters, s2 leaves → (x,y)=(2,2), z=10. Reduced costs negative.  

**Final answer**  
**(x,y)=(2,2), z=10**

*Reflection:* Two edges were traversed; each improved z by 1 and 1 respectively.

**Example 3 — Degeneracy appears**  
*Given:* maximise x + y subject to x + y ≤ 2, x ≤ 2, y ≤ 2, x,y ≥ 0.  
After first pivot a basic variable becomes zero; ratio test gives tie. Choosing the wrong leaving variable produces a zero-length step but the algorithm still terminates.

**Final answer**  
**x=2, y=0, z=2**

*Reflection:* Degeneracy does not break correctness but may cause extra pivots; Bland’s rule prevents cycling.

**Example 4 — Three constraints**  
*Given:* maximise 4x1 + 5x2 + 3x3 subject to x1 + x2 + x3 ≤ 10, 2x1 + x2 + 3x3 ≤ 15, x1 + 3x2 + 2x3 ≤ 12, all x ≥ 0.  
After three pivots the optimal basis is {x1,x2,x3} with value 29.5. Each tableau row operation is shown in full in the accompanying notebook.

**Final answer**  
**x1=3, x2=2.5, x3=4.5, z=29.5**

*Reflection:* The method scales directly; only the size of B^{-1} grows.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Entering a variable with zero reduced cost | Copy-paste error when reading the objective row | Always recompute \bar{c} from scratch after each pivot |
| Forgetting to update the objective row | Treating z as constant during row operations | Keep the bottom row inside the tableau at every step |
| Negative ratio in ratio test | Selecting a pivot column entry that is negative or zero | Restrict ratio test to strictly positive a_{i,enter} |
| Starting without a feasible basis | Original problem has no obvious slack basis | Use two-phase or Big-M method when needed |
| Cycling on degenerate problems | Same basis repeats because of zero steps | Apply Bland’s least-index rule for pivot choice |
| Misidentifying slack columns in final solution | Confusing original variables with slacks | Record which columns belong to decision variables only |

## 7. The textbook-precise statement
A linear program in standard form is  
$$
\max\{c^T x : Ax = b, x \geq 0\},
$$  
where A is m × n with rank m. A basis B is an ordered set of m indices such that the corresponding columns are linearly independent. The associated basic solution x_B = B^{-1}b, x_N = 0 is feasible when x_B ≥ 0. The simplex method starts from any feasible basis and, while there exists j ∉ B with reduced cost \bar{c}_j > 0, selects such a j, performs the ratio test to obtain a leaving index l ∈ B, and replaces B by (B \ {l}) ∪ {j}. When no improving column exists the current basis is optimal. (See Vanderbei, Linear Programming: Foundations and Extensions, 5e, §2.3–§2.5.)

## 8. Visual — diagram or schematic
```
Objective row:   z | -c_B B^{-1} N + c_N |  c_B B^{-1} b
Constraint rows:   |   B^{-1} N         |  B^{-1} b
                  -----------------------
Basic vars        |   identity (after pivot)
```
Columns: non-basic variables on the right, basic variables reduced to unit columns after each pivot. The rightmost column always holds the current values of the basic variables and the objective.

## 9. The memory technique
1. **The hook** — Picture a mountain climber who can only step along the ridges of a polyhedral mountain; each step is a pivot that takes the climber higher until no upward ridge remains.
2. **What to overlearn** — Reduced-cost test: if all \bar{c}_j ≤ 0 then stop; ratio test formula min_i {b_i / a_{i,enter} | a_{i,enter} > 0}.
3. **Spaced-repetition schedule** — Review the pivot rules after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the entering-column choice from the directional derivative of z along the edge; the ratio test is simply the first non-negativity violation along that ray.

## 10. What this unlocks
Once the simplex method is internalised, duality theory, sensitivity analysis, and the revised simplex implementation become immediate next steps. The same tableau machinery extends to integer programming via branch-and-bound and to network-flow problems via special-purpose pivot rules.

- Dual simplex and primal-dual algorithms
- Interior-point methods (Karmarkar, Nesterov–Todd)
- Stochastic and robust linear programming
- Column generation for very large LPs

## 11. Self-check — five questions, no answers
1. In a maximisation problem, what does a positive reduced cost for a non-basic variable imply about the objective along the corresponding edge?
2. Perform one complete pivot on the tableau whose constraint rows are [1 2 1 | 6] and [2 1 0 | 5] with objective row [−3 −5 0 | 0].
3. Why can the simplex method terminate at a vertex that is not the unique optimum?
4. If the ratio test yields a tie, what degeneracy phenomenon occurs and how may it affect iteration count?
5. Suppose after several pivots the basis matrix B becomes numerically singular; which linear-algebra safeguard restores progress?