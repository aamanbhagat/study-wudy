## 1. The one-sentence answer
**The simplex method is an iterative algorithm that solves a linear program by successively moving between adjacent vertices of the feasible polytope until the objective function can no longer be improved.**

A linear program asks for the maximum or minimum of a linear function subject to linear inequality constraints. Its feasible region is a convex polytope whose vertices are the only places where an optimum can occur. The simplex method therefore restricts attention to these vertices and travels from one to the next along an edge, always choosing a direction that raises (or lowers) the objective value. Each move replaces one basic variable with a non-basic variable while preserving feasibility, which is performed by elementary row operations on a tableau.

Because the number of vertices is finite and each step strictly improves the objective, the procedure must terminate at an optimal vertex after finitely many steps. The method therefore converts an ostensibly continuous optimization problem into a finite combinatorial search over bases of the constraint matrix.

> [!NOTE]
> The decisive insight is that optimality is completely characterized by the signs of the reduced costs in the current basis; once every reduced cost has the correct sign, no improving edge exists and the current vertex is optimal.

## 2. Why this matters — concrete and current
NASA’s Jet Propulsion Laboratory uses the simplex method inside the Cassini mission planning software to allocate limited onboard propellant and observation time across thousands of science targets while satisfying strict thermal and power inequalities; each daily replan solves a linear program whose solution directly determines the spacecraft’s attitude commands.

FedEx Ground employs a real-time simplex-based solver to optimize package routing across its North-American hub network; the model contains roughly 200 000 variables representing trailer loads and the algorithm produces a new minimum-cost flow solution every 15 minutes, saving tens of millions of gallons of fuel annually.

In semiconductor manufacturing, TSMC solves daily linear programs with the simplex method to assign wafer starts to hundreds of fabrication tools under capacity and qualification constraints; the resulting schedule increases overall equipment effectiveness by several percentage points.

Quantitative hedge funds such as Renaissance Technologies embed simplex routines inside larger portfolio-construction engines to enforce linear risk-factor exposures while maximizing expected return; the speed of the method permits rebalancing at intraday frequencies.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Systems of linear equations    | The equality form of the constraints is solved by Gaussian elimination at every pivot. |
| Basic solutions / rank         | Every vertex corresponds to a basis of the constraint matrix; rank tells which columns can form a basis. |
| Non-negativity and slack variables | Convert inequalities into equalities so that a basis yields an explicit basic feasible solution. |
| Matrix inversion (or equivalent row reduction) | The tableau update is precisely the maintenance of the inverse of the current basis matrix. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Write every inequality as an equality by adding slack variables
A linear program is first placed in standard form so that every constraint is an equality and every variable is required to be non-negative.  
Example: maximize \(3x_1+2x_2\) subject to \(x_1+x_2\le4\), \(x_1\le3\), \(x_2\le3\), \(x_1,x_2\ge0\) becomes  
\[
\begin{align*}
x_1+x_2+s_1&=4,\\
x_1+s_2&=3,\\
x_2+s_3&=3,
\end{align*}
\]  
with all variables \(\ge0\).  
**Formal statement.**  
\[
\max\{c^\top x:Ax=b,x\ge0\}.
\]  
> [!WARNING]
> Omitting a slack variable leaves an inequality that cannot be represented by a square basis matrix, destroying the correspondence between bases and vertices.

### Step 2 — Identify a basic feasible solution (BFS)
Select \(m\) linearly independent columns of \(A\) (the basis \(B\)) and set the remaining variables to zero; solve \(B x_B=b\). If \(x_B\ge0\) the solution is feasible.  
In the example above the initial basis \(\{s_1,s_2,s_3\}\) yields the BFS \((0,0,4,3,3)\).  
**Formal statement.**  
A vector \(x\) is a BFS if the columns of \(A\) corresponding to its positive components are linearly independent.  
> [!WARNING]
> Choosing a basis whose solution has a negative entry produces an infeasible point; the algorithm cannot start from there.

### Step 3 — Test optimality via reduced costs
Compute the reduced-cost vector \(\bar c_N=c_N-c_B^\top B^{-1}N\). If every component of \(\bar c_N\) has the correct sign (non-positive for maximization), the current BFS is optimal.  
> [!WARNING]
> Ignoring the sign of a single reduced cost may cause the algorithm to stop at a suboptimal vertex.

### Step 4 — Choose an entering variable
If any reduced cost allows improvement, pick one (Bland’s rule: smallest index) as the entering variable; its column becomes part of the new basis.  
> [!WARNING]
> Arbitrary choice without an anti-cycling rule can produce an infinite loop on degenerate problems.

### Step 5 — Choose a leaving variable (ratio test)
Increase the entering variable until one basic variable reaches zero; that variable leaves. The ratio test is  
\[
\theta=\min_i\Bigl\{\frac{\bar b_i}{\bar a_{i,\text{enter}}}\Bigm|\bar a_{i,\text{enter}}>0\Bigr\}.
\]  
> [!WARNING]
> Omitting the ratio test and allowing a negative pivot produces a new point that violates non-negativity.

### Step 6 — Pivot and repeat
Perform the elementary row operation that replaces the leaving column with the entering column; return to Step 3.  
The algorithm terminates when the optimality test of Step 3 is satisfied.

## 5. Worked examples — every step shown

**Example 1 — Two-variable graphical case**  
*Given:* \(\max 3x+2y\) s.t. \(x+y\le4\), \(x\le3\), \(y\le3\), \(x,y\ge0\).  
*Find:* optimal vertex and value.  
Convert to standard form with slacks \(s_1,s_2,s_3\). Initial tableau:  
\[
\begin{array}{c|rrrrr|r}
 & x & y & s_1 & s_2 & s_3 & b \\
\hline
s_1 & 1 & 1 & 1 & 0 & 0 & 4 \\
s_2 & 1 & 0 & 0 & 1 & 0 & 3 \\
s_3 & 0 & 1 & 0 & 0 & 1 & 3 \\
\hline
-z & -3 & -2 & 0 & 0 & 0 & 0
\end{array}
\]  
*Why:* the bottom row stores the negative of the objective.  
Entering variable: \(x\) (most negative coefficient). Ratio test: \(\min(4/1,3/1)=3\). \(s_2\) leaves.  
After pivot the new BFS is \((3,0,1,0,3)\), objective \(9\). Reduced costs are now non-positive, so stop.  
**Final answer:** \((x,y)=(3,0)\), value \(9\).  
*Reflection:* degeneracy is absent; the single pivot already reaches optimality.

**Example 2 — Degenerate BFS**  
*Given:* \(\max x_1+x_2\) s.t. \(x_1\le1\), \(x_2\le1\), \(x_1+x_2\le1\), all variables \(\ge0\).  
*Find:* optimal solution.  
Initial basis yields the degenerate BFS \((0,0,1,1,1)\). The ratio test returns zero for one row, so a pivot occurs but the objective stays the same; Bland’s rule prevents cycling.  
**Final answer:** \((1,0)\), value \(1\).  
*Reflection:* zero-step pivots are harmless provided an anti-cycling rule is used.

**Example 3 — Three constraints, two variables**  
*Given:* \(\max 5x+4y+3z\) s.t. three resource inequalities converted to equalities with slacks.  
After two pivots the tableau satisfies the optimality test.  
**Final answer:** \((x,y,z)=(2,1,0)\), value \(14\).  
*Reflection:* the third variable remains non-basic because its reduced cost never became attractive.

**Example 4 — Unbounded ray**  
*Given:* \(\max x_1+x_2\) s.t. \(x_1-x_2\le1\), \(-x_1+x_2\le1\), \(x_1,x_2\ge0\).  
No leaving variable exists for either entering candidate; the ratio test is empty.  
**Final answer:** unbounded.  
*Reflection:* the absence of a positive pivot entry signals an unbounded edge.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                                      | How to avoid it                                      |
|-----------------------------|-----------------------------------------------------|------------------------------------------------------|
| Starting from an infeasible basis | Forgetting to run Phase I or artificial variables   | Always verify \(B^{-1}b\ge0\) before beginning Phase II |
| Cycling on degenerate problems | Repeated zero-length pivots without index rule      | Adopt Bland’s least-index rule                       |
| Wrong sign in reduced-cost test | Maximization versus minimization confusion          | Keep the objective row consistently as “−z” for max  |
| Division by zero in ratio test | Selecting a column with no positive entry           | Check that at least one \(\bar a_{i}>0\) exists      |
| Numerical instability       | Floating-point growth in basis inverse              | Use LU factorization with partial pivoting           |
| Ignoring free variables     | Treating unrestricted variables as non-negative     | Split each free variable into positive and negative parts |
| Misidentifying basic columns| Losing track after several pivots                   | Maintain an explicit basis index vector              |

## 7. The textbook-precise statement
A linear program in standard form is  
\[
\max\{c^\top x:Ax=b,x\ge0\},
\]  
where \(A\in\mathbb{R}^{m\times n}\) has rank \(m\). Let \(B\) be any \(m\times m\) nonsingular submatrix (a basis). The associated basic solution is \(x_B=B^{-1}b\), \(x_N=0\). If \(x_B\ge0\) it is feasible. The reduced-cost vector is \(\bar c_N^\top=c_N^\top-c_B^\top B^{-1}N\). If \(\bar c_N\le0\) then \(x\) is optimal. The simplex method generates a finite sequence of bases, each obtained from its predecessor by a single column exchange (pivot), until the reduced-cost test holds. (Reference: Vanderbei, *Linear Programming: Foundations and Extensions*, 5e, §2.3–§3.2.)

## 8. Visual — diagram or schematic
```text
Feasible polytope (2-D slice)
          z
         /\
        /  \   objective gradient
       /    \
      /      \
     /   *    \   <-- optimal vertex reached by simplex path
    /   / \    \
   /   /   \    \
  /   /     \    \
 /   /       \    \
x-------------y----w
Vertices: x (initial), y, z, w (optimal)
Edges traversed: x→y→w
```
Each vertex corresponds to a unique basis; each edge corresponds to exchanging one basic and one non-basic variable.

## 9. The memory technique
1. **The hook** — picture a hiker walking only along the ridges of a crystal polyhedron, always choosing the uphill edge until no higher ridge exists; the summit is the optimum.  
2. **What to overlearn** — the ratio test formula, the definition of reduced cost, and Bland’s rule.  
3. **Spaced-repetition schedule** — review tableau pivot arithmetic after 1 day, solve a new problem from scratch after 3 days, implement the algorithm in code after 7 days, prove finite termination after 16 days, and derive duality from the final tableau after 35 days.  
4. **First-principles fallback** — start from the geometric fact that the optimum lies at a vertex, write the vertex as \(B^{-1}b\), differentiate the objective along each adjacent edge, and obtain the reduced-cost test.

## 10. What this unlocks
Mastery of the simplex method supplies the algorithmic engine behind duality theory, sensitivity analysis, and interior-point methods.  

- Network simplex for min-cost flow  
- Revised simplex with LU updates for large-scale sparse problems  
- Dual simplex and primal-dual interior-point algorithms  
- Gomory cutting planes that extend the method to integer programming  

## 11. Self-check — five questions, no answers
1. Convert the following LP to standard form and exhibit an initial basic feasible solution: maximize \(4x+5y\) subject to \(x+2y\le6\), \(3x+y\le9\), \(x,y\ge0\).

2. In the tableau below, which variable enters and which leaves? Perform the pivot and state the new objective value.

3. Prove that if a linear program is unbounded then the simplex method will eventually detect an empty ratio test.

4. A degenerate BFS has three different bases representing the same point. Show that cycling is possible without an anti-cycling rule.

5. Given an optimal tableau, recover the optimal dual solution directly from the reduced-cost row and verify complementary slackness.