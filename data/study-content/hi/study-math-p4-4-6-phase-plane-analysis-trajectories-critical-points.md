## 1. The one-sentence answer
**Phase plane analysis** visualises autonomous 2D systems \(\dot{x}=f(x,y)\), \(\dot{y}=g(x,y)\) by plotting trajectories as curves in the \(xy\)-plane whose tangent vectors equal the vector field \((f,g)\), while **critical points** are the equilibria where \(f=g=0\).

A trajectory is the unique solution curve passing through any initial point; it never crosses itself because uniqueness of solutions forbids two different velocities at the same location. Critical points act as fixed locations where motion stops, and their local behaviour (node, saddle, spiral, centre) is completely determined by the linearisation matrix at that point. The global picture of all trajectories together is called the phase portrait.

> [!NOTE]
> The single deepest insight is that time itself disappears from the picture: instead of solving for \(x(t)\) and \(y(t)\), you read qualitative behaviour directly from the geometry of the vector field.

## 2. Why this matters — concrete and current
NASA’s Artemis trajectory design teams use phase-plane portraits of the circular restricted three-body problem to locate stable and unstable manifolds around Lagrange points; these manifolds become the low-energy transfer “highways” that save hundreds of metres per second of \(\Delta v\).

In power-system engineering, the swing equation for two generators is reduced to a 2-D autonomous system whose phase portrait reveals whether a fault will cause loss of synchronism; utilities such as PJM and National Grid run real-time phase-plane monitors on their SCADA systems.

Modern reinforcement-learning papers on under-actuated robotics (e.g., the 2022 CoRL work on cart-pole swing-up) linearise the closed-loop dynamics around the upright equilibrium and inspect the resulting phase portrait to certify regions of attraction before deploying the policy on hardware.

Semiconductor laser rate equations are a classic two-dimensional autonomous system; phase-plane analysis predicts the onset of relaxation oscillations and bistability that limit modulation bandwidth in 400 Gbps optical transceivers manufactured by companies such as Intel and Coherent.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Autonomous first-order system \(\dot{\mathbf{x}}=F(\mathbf{x})\) | Phase-plane portraits exist only when the right-hand side does not depend explicitly on \(t\). |
| Jacobian matrix and eigenvalues | Linearisation at a critical point reduces the nonlinear flow to a linear system whose eigenvalues classify the point. |
| Existence-uniqueness theorem for ODEs | Guarantees that trajectories cannot cross, giving the phase plane its clean foliation. |
| Basic linear algebra (eigenvectors) | Direction of approach or departure from a critical point is given by the eigenvectors. |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — From a single solution curve to a vector field
Think of the plane as every possible state \((x,y)\). At each point the pair \((f(x,y),g(x,y))\) tells you the instantaneous velocity. Drawing a short arrow at many points produces the vector field; any solution curve must be tangent to these arrows.

Example: \(\dot{x}=x(1-x-y)\), \(\dot{y}=y(1-x-y)\). At \((0.3,0.4)\) the vector is \((0.3\cdot0.3,0.4\cdot0.3)=(0.09,0.12)\), so the trajectory through that point moves northeast.

Formal statement: a trajectory is an integral curve \(\gamma(t)=(x(t),y(t))\) satisfying \(\gamma'(t)=F(\gamma(t))\) for all \(t\) in its maximal interval.

> [!WARNING]
> If you forget that arrows have both magnitude and direction, you will misjudge speed along the trajectory and confuse slow manifolds with equilibria.

### Step 2 — Locating critical points
Set both components to zero simultaneously: solve the algebraic system \(f(x,y)=0\), \(g(x,y)=0\). Each solution is an equilibrium; trajectories can only stop or start there.

### Step 3 — Linearisation at a critical point
Shift coordinates so the critical point is at the origin. The Jacobian
\[
J=\begin{pmatrix}f_x & f_y\\g_x & g_y\end{pmatrix}
\]
evaluated at the point yields the linear system \(\dot{\mathbf{u}}=J\mathbf{u}\). The eigenvalues of \(J\) classify the point.

### Step 4 — Eigenvalue classification
- Real eigenvalues, same sign → node (proper or improper)
- Real eigenvalues, opposite signs → saddle
- Complex eigenvalues with nonzero real part → spiral (stable or unstable)
- Pure imaginary eigenvalues → centre (linear case)

Higher-order terms decide the nonlinear fate of centres and degenerate nodes.

### Step 5 — Global trajectories and nullclines
Nullclines \(f=0\) and \(g=0\) divide the plane into regions of constant sign pattern. Inside each region the vector field points in one quadrant; trajectories therefore cross the nullclines only horizontally or vertically.

### Step 6 — Poincaré–Bendixson theorem (qualitative closure)
In a compact positively invariant set containing finitely many critical points, every trajectory approaches either a critical point or a periodic orbit. This is the rigorous guarantee that the phase portrait is “complete”.

## 5. Worked examples — har step show karo

**Example 1 — Simple saddle**
*Given:* \(\dot{x}=x\), \(\dot{y}=-y\).
*Find:* critical point and its type.
The only critical point is \((0,0)\). Jacobian is already \(\operatorname{diag}(1,-1)\), eigenvalues \(+1,-1\). Opposite signs → saddle. Eigenvectors are the coordinate axes.
*Why:* direct substitution shows \(f=g=0\) only at origin; eigenvalue test follows immediately from definition of linearisation.
**Final answer:** saddle at origin, stable manifold is \(y\)-axis, unstable manifold is \(x\)-axis.

*Reflection:* the example is the prototype for every hyperbolic saddle you will meet after coordinate change.

**Example 2 — Stable spiral**
*Given:* \(\dot{x}=-y-0.1x\), \(\dot{y}=x-0.1y\).
Jacobian \(J=\begin{pmatrix}-0.1 & -1\\1 & -0.1\end{pmatrix}\). Characteristic equation \(\lambda^2+0.2\lambda+1.01=0\), roots \(-0.1\pm i\). Negative real part → stable spiral.
*Why:* trace and determinant give the classification without solving the quadratic explicitly.
**Final answer:** asymptotically stable spiral at origin.

*Reflection:* damping term \(-0.1x\) turns a centre into a sink; the same linear algebra decides both cases.

**Example 3 — Competing-species model**
*Given:* \(\dot{x}=x(1-x-y)\), \(\dot{y}=y(0.75-y-0.5x)\).
Critical points: \((0,0)\), \((1,0)\), \((0,0.75)\), \((0.5,0.5)\). Jacobian at \((0.5,0.5)\) has eigenvalues with negative real parts; it is a stable node. All interior trajectories approach it.
*Why:* nullcline intersections locate equilibria; Routh–Hurwitz or direct eigenvalue computation classifies the coexistence point.
**Final answer:** coexistence equilibrium is globally attracting in the positive quadrant.

*Reflection:* biology reduces to geometry once the phase portrait is drawn.

**Example 4 — Nonlinear centre that survives**
*Given:* \(\dot{x}=-y+x(x^2+y^2)\), \(\dot{y}=x+y(x^2+y^2)\). (Polar form \(\dot{r}=r^3\), \(\dot{\theta}=1\).)
Linear part at origin is a centre, yet \(\dot{r}=r^3>0\) shows trajectories spiral outward. Hence nonlinear terms destroy the centre.
*Why:* polar coordinates convert the radial component into an autonomous 1-D equation whose sign decides stability.
**Final answer:** origin is an unstable focus.

*Reflection:* always check the first nonlinear term when eigenvalues lie on the imaginary axis.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating a centre as stable | Linear eigenvalues are pure imaginary; nonlinear terms ignored | Compute polar \(\dot{r}\) or use Lyapunov function before declaring stability |
| Drawing trajectories that cross | Forgetting uniqueness theorem | Never let two arrows point in different directions at the same point |
| Misclassifying a degenerate node | Repeated zero eigenvalue or Jordan block | Compute full Jordan form, not just eigenvalues |
| Forgetting behaviour at infinity | Portrait appears complete inside a box | Compactify with Poincaré sphere or check large-radius circles |
| Confusing nullcline with trajectory | Nullcline only gives horizontal/vertical crossings | Remember trajectories are tangent to the vector field everywhere |
| Linearising at a non-hyperbolic point | Eigenvalues on imaginary axis | Switch to centre-manifold or normal-form reduction |

## 7. The textbook-precise statement
Let \(F:\mathbb{R}^2\to\mathbb{R}^2\) be \(C^1\). A point \(p\) is a critical point if \(F(p)=0\). The linearisation at \(p\) is the Jacobian matrix \(DF(p)\). If no eigenvalue of \(DF(p)\) has zero real part, \(p\) is hyperbolic and its topological type is completely determined by the eigenvalues (Hirsch–Smale–Devaney, *Differential Equations, Dynamical Systems, and an Introduction to Chaos*, 3rd ed., Theorem 1.3.1 and §1.4). Global phase portraits are constrained by the Poincaré–Bendixson theorem: any nonempty compact limit set containing only finitely many equilibria is either an equilibrium or a periodic orbit (ibid., Theorem 2.3.1).

## 8. Visual — diagram or schematic
```
y
↑
|     \   ↗   /
|      \     /
|  ←--  o----→   saddle at (0,0)
|      /     \
|     /   ↙   \
+--------------------→ x
     stable manifold (vertical)
     unstable manifold (horizontal)
```
Arrows indicate vector-field direction; the two separatrices divide the plane into four sectors of monotonic behaviour.

## 9. The memory technique
1. **The hook** — imagine the plane as a crowded dance floor; each person moves exactly according to the local “music” vector; equilibria are the only places where people stand still.
2. **What to overlearn** — trace-determinant plane for 2×2 classification; nullcline crossing rules; statement of Poincaré–Bendixson.
3. **Spaced-repetition schedule** — redraw one portrait from memory after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — start from the definition \(\gamma'=F(\gamma)\), linearise by Taylor expansion, read eigenvalues.

## 10. What this unlocks
Phase-plane mastery lets you pass immediately to:
- centre-manifold reduction for bifurcations,
- Lyapunov functions and LaSalle invariance,
- index theory and Dulac criterion for limit-cycle exclusion,
- numerical continuation packages (AUTO, MATCONT) that trace branches of periodic orbits from Hopf points detected in the phase portrait.

## 11. Self-check — five questions, no answers
1. For \(\dot{x}=x-y^2\), \(\dot{y}=-y+x^2\), locate all critical points and classify the origin.
2. Sketch the phase portrait of the van der Pol oscillator in Liénard form and mark the limit cycle.
3. A trajectory starts at \((1,1)\) in the competing-species model of Example 3; does it cross the line \(x=y\)? Justify without solving.
4. Give a concrete 2-D system whose linearisation at the origin is a centre yet the nonlinear system has no closed orbits.
5. Explain why two trajectories of an autonomous planar system cannot intersect transversely.