## 1. The one-sentence answer
**A convex set is any collection of points closed under all line segments joining its members; a convex function is any real-valued map whose value on such a segment never exceeds the corresponding segment of its graph.**

A convex set looks like a solid blob with no dents: pick any two points inside it and the straight line between them stays inside. This geometric property survives arbitrary scaling and addition, which later lets us combine constraints without losing tractability.  

A convex function bends upward everywhere. Its graph lies above every chord, so the lowest point of the function over a convex set is attained at an extreme point and can be reached by reliable numerical methods that never get trapped in local minima.  

The two notions fit together: the set of points where a convex function lies below a given level is always convex, and the epigraph of a convex function is itself a convex set in one higher dimension.

> [!NOTE]
> The single deepest fact is that every local minimum of a convex function over a convex set is automatically global; no other class of functions guarantees this without extra assumptions.

## 2. Why this matters — concrete and current
SpaceX uses convex optimization to compute real-time fuel-optimal trajectories for Falcon 9 booster landings; the thrust and attitude constraints define a convex feasible set while the objective (fuel or time) is convexified via successive approximation, allowing the onboard computer to solve each problem in under 200 ms.

In semiconductor design, TSMC and Intel formulate transistor sizing and clock-tree synthesis as convex programs; the delay and power models are convex in the widths and voltages, so the resulting geometric programs are solved to global optimality by interior-point solvers before tape-out.

Modern machine-learning frameworks such as TensorFlow and PyTorch rely on convex relaxations of ReLU networks for verification and robustness certification; the convex outer bounds on activation patterns turn the otherwise non-convex adversarial-training problem into a tractable semidefinite or linear program solved at scale by Gurobi or MOSEK.

Radio astronomers at the Event Horizon Telescope collaboration solve convex phase-retrieval problems to reconstruct images from sparse interferometric measurements; the nuclear-norm objective and the linear measurement constraints are both convex, enabling reliable recovery of black-hole images that would otherwise be ill-posed.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector space over \(\mathbb{R}\) | Convex combinations are linear combinations with nonnegative weights summing to 1 |
| Basic topology of \(\mathbb{R}^n\) | Closedness and compactness arguments appear in existence theorems |
| Affine functions         | They are simultaneously convex and concave; they form the building blocks of linear constraints |
| Epigraph                 | The set \(\{(x,t): t \ge f(x)\}\) converts functional convexity into set convexity |

## 4. Building the idea — from intuition to formalism

### Step 1 — Line segments inside a set
A set feels “convex” when it contains every point on every line segment between its members.  
Take the closed unit disk in \(\mathbb{R}^2\); any two points inside it determine a chord that remains inside the disk.  
Formally, a set \(C\subseteq\mathbb{R}^n\) is **convex** when  
\[
\forall x,y\in C,\;\forall\lambda\in[0,1],\qquad\lambda x+(1-\lambda)y\in C.
\]

> [!WARNING]
> Replacing the interval \([0,1]\) by \((0,1)\) yields a strictly weaker notion that excludes some closed half-spaces.

### Step 2 — Convex combinations of many points
Any finite collection of points can be averaged with nonnegative weights that sum to one; the result must still lie in the set.  
For three points forming a triangle, every interior point is a convex combination and must belong to the set.  
The same definition extends immediately to  
\[
\sum_{i=1}^k\lambda_i x_i,\qquad\lambda_i\ge0,\quad\sum\lambda_i=1.
\]

### Step 3 — Convex functions via chords
A function bends upward when its graph lies above every chord.  
On \([0,1]\) the function \(f(x)=x^2\) satisfies \(f(\lambda x+(1-\lambda)y)\le\lambda f(x)+(1-\lambda)f(y)\).  
A function \(f:\mathbb{R}^n\to\mathbb{R}\) is **convex** when its domain is convex and  
\[
f(\lambda x+(1-\lambda)y)\le\lambda f(x)+(1-\lambda)f(y)
\]
holds for all admissible \(\lambda\).

> [!WARNING]
> Strict inequality produces strict convexity, which is stronger and excludes linear functions.

### Step 4 — Epigraph converts functions into sets
The epigraph of \(f\) is the set of points lying above its graph; this set is convex precisely when \(f\) is convex.  
For \(f(x)=x^2\) the epigraph \(\{(x,t):t\ge x^2\}\) is a parabolic solid that contains all its chords.  
Thus functional convexity is equivalent to set convexity of the epigraph.

### Step 5 — Sublevel sets inherit convexity
Every sublevel set \(\{x:f(x)\le\alpha\}\) of a convex function is convex.  
If \(f(x)\le\alpha\) and \(f(y)\le\alpha\), the chord inequality forces \(f(\lambda x+(1-\lambda)y)\le\alpha\).  
This fact lets inequality constraints defined by convex functions generate convex feasible regions.

### Step 6 — Textbook statement
A set \(C\) is convex if it contains all convex combinations of its points. A function \(f\) is convex if its epigraph is convex (equivalently, if it satisfies the chord inequality on a convex domain). These two definitions are the foundation of convex optimization.

## 5. Worked examples — every step shown

**Example 1 — Disk is convex**  
*Given:* \(C=\{x\in\mathbb{R}^2:\|x\|_2\le1\}\).  
*Find:* Verify convexity.  

Take \(x,y\in C\) and \(\lambda\in[0,1]\).  
\[
\|\lambda x+(1-\lambda)y\|_2\le\lambda\|x\|_2+(1-\lambda)\|y\|_2\le\lambda\cdot1+(1-\lambda)\cdot1=1
\]  
*Why:* Triangle inequality followed by the defining property of the unit ball.  

**Final answer**  
\(C\) is convex.

*Reflection:* The triangle inequality is the only nontrivial step; the same argument works for any norm ball.

**Example 2 — Quadratic is convex**  
*Given:* \(f(x)=x^\top Ax\) with \(A\) symmetric positive semidefinite.  
*Find:* Show convexity.  

For any \(x,y\) and \(\lambda\in[0,1]\),  
\[
f(\lambda x+(1-\lambda)y)=(\lambda x+(1-\lambda)y)^\top A(\lambda x+(1-\lambda)y).
\]  
Expand and use \(A\succeq0\) to obtain the quadratic form inequality  
\[
\le\lambda x^\top Ax+(1-\lambda)y^\top Ay.
\]  
*Why:* Cross terms vanish or become non-positive precisely because of positive-semidefiniteness.  

**Final answer**  
\(f\) is convex.

*Reflection:* The algebraic expansion is mechanical once the matrix property is invoked.

**Example 3 — Intersection preserves convexity**  
*Given:* Convex sets \(C_i\), \(i\in I\).  
*Find:* Show \(\bigcap C_i\) is convex.  

Any two points in the intersection lie in every \(C_i\); the segment between them lies in every \(C_i\) by individual convexity, hence in the intersection.  

**Final answer**  
The intersection is convex.

*Reflection:* Arbitrary intersections (even infinite) remain convex; unions generally do not.

**Example 4 — Composition with affine map**  
*Given:* Convex \(f\) and affine \(g(x)=Ax+b\).  
*Find:* Show \(f\circ g\) is convex.  

\[
(f\circ g)(\lambda x+(1-\lambda)y)=f(A(\lambda x+(1-\lambda)y)+b)=f(\lambda(Ax+b)+(1-\lambda)(Ay+b)).
\]  
Convexity of \(f\) yields the desired inequality.  

**Final answer**  
\(f\circ g\) is convex.

*Reflection:* Affine pre-composition is the most common way constraints remain convex after change of variables.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Confusing convex with “round” | Visual intuition from disks misleads | Check the definition on line segments, not curvature |
| Forgetting domain convexity | The chord inequality is meaningless if the segment leaves the domain | Always verify that \(\operatorname{dom}f\) is convex first |
| Assuming every local minimum is global without convexity | Non-convex functions can have spurious local minima | Test the chord inequality or check the Hessian before claiming globality |
| Treating quasiconvexity as convexity | Level sets convex does not imply chords lie below graph | Verify the numerical inequality, not merely sublevel sets |
| Dropping the \(\lambda\in[0,1]\) restriction | Extending to all real \(\lambda\) yields affinity | Restrict weights explicitly in every proof |
| Neglecting closedness | Open half-spaces are convex yet may cause attainment failures | Add closedness when existence of minimizers is required |
| Misidentifying convexity of sums | Sum of convex functions is convex, but product is not | Use the definition on each term separately |

## 7. The textbook-precise statement
A set \(C\subseteq\mathbb{R}^n\) is convex if for every \(x,y\in C\) and every \(\lambda\in[0,1]\) the point \(\lambda x+(1-\lambda)y\) belongs to \(C\). A function \(f:\mathbb{R}^n\to\mathbb{R}\) with convex domain is convex if  
\[
f(\lambda x+(1-\lambda)y)\le\lambda f(x)+(1-\lambda)f(y)
\]  
holds for all \(x,y\in\operatorname{dom}f\) and \(\lambda\in[0,1]\). Equivalently, the epigraph \(\operatorname{epi}f=\{(x,t):x\in\operatorname{dom}f,\,t\ge f(x)\}\) is a convex set in \(\mathbb{R}^{n+1}\). (Boyd & Vandenberghe, *Convex Optimization*, 2004, §2.2–2.3.)

## 8. Visual — diagram or schematic
```text
          t
          ↑
          │     epi f
          │   ╱───────╲
          │  ╱         ╲   ← graph of convex f
          │ ╱           ╲
          │╱             ╲
          └────────────────→ x
               chord lies above graph
```
The shaded region above the curve is the epigraph; any line segment connecting two points inside it remains inside.

## 9. The memory technique
1. **The hook** — Picture a bowl made of rubber; any marble dropped inside rolls to the single lowest point and cannot get stuck on a bump because the bowl has no dents (convexity).  
2. **What to overlearn** — The two-line definition of convex set and the chord inequality for convex functions; also that the Hessian of a twice-differentiable function is positive semidefinite everywhere if and only if the function is convex.  
3. **Spaced-repetition schedule** — Review definitions after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the chord inequality from the definition of the epigraph being convex by intersecting it with any vertical plane.

## 10. What this unlocks
Mastery of convex sets and functions lets you recognize entire families of tractable optimization problems and apply powerful duality theory.  

- Convex optimization algorithms (interior-point methods, proximal gradient)  
- Lagrange duality and KKT conditions  
- Semidefinite programming and sum-of-squares relaxations  
- Disciplined convex programming modeling languages  

## 11. Self-check — five questions, no answers
1. Prove that the intersection of any collection of convex sets is convex.  
2. Show that \(f(x)=\|Ax-b\|_2^2\) is convex for any matrix \(A\).  
3. Give a concrete example of a set that is not convex and exhibit two points whose connecting segment leaves the set.  
4. If \(f\) and \(g\) are convex, is \(\max(f,g)\) convex? Prove or disprove.  
5. Suppose \(f\) is convex and differentiable. Show that \(f(y)\ge f(x)+\nabla f(x)^\top(y-x)\) for all \(x,y\).