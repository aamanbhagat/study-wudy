## 1. The one-sentence answer
**Stability of equilibria classifies how solution trajectories of an autonomous ODE behave near a constant solution as time goes to infinity.**

Equilibrium points are solutions that stay fixed forever. Their stability tells you whether nearby solutions stay close, drift away, or oscillate around them. In two-dimensional linear systems the classification reduces to the eigenvalues of the coefficient matrix: the sign of the real part decides attraction or repulsion while the imaginary part decides rotation.

The same idea extends to nonlinear systems by linearizing at each equilibrium via the Jacobian matrix. Once you know the eigenvalues you immediately draw the local phase portrait—nodes, spirals, saddles, or centres—without solving the full system.

> [!NOTE]
> The single most important insight is that the long-term fate of every nearby orbit is completely determined by the two eigenvalues of the linearization; no further integration is required for local classification.

## 2. Why this matters — concrete and current
In reusable rocket landing, SpaceX’s Falcon 9 guidance algorithms linearize the six-degree-of-freedom dynamics at the vertical equilibrium and check that all eigenvalues have negative real parts before committing to a landing burn.

Power-grid operators at PJM Interconnection run small-signal stability studies on the swing equations of synchronous generators; centres and spirals in the eigenvalue plane flag oscillatory modes that can cascade into blackouts.

In reinforcement-learning policy optimization, the continuous-time limit of gradient flow on a loss landscape is an ODE whose equilibria are critical points; saddle detection via eigenvalue signatures lets algorithms escape flat regions faster than discrete gradient descent.

Semiconductor laser designers at Intel use rate equations whose equilibria correspond to lasing thresholds; spiral eigenvalues produce relaxation oscillations that must be damped to keep optical output stable.

Climate models at GFDL linearize the primitive equations around the radiative-convective equilibrium; unstable nodes in the temperature–humidity plane indicate tipping points such as ice-sheet collapse.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Autonomous system \(\dot{\mathbf{x}}=f(\mathbf{x})\) | Equilibria are constant solutions, so time does not appear explicitly |
| Jacobian matrix          | Supplies the linear approximation at each equilibrium     |
| Eigenvalues and eigenvectors | Determine the exponential growth or decay rates along eigendirections |
| Phase plane              | Visual language for trajectories in \(\mathbb{R}^2\)      |

If any row is unfamiliar, pause and review the corresponding section on linear algebra and autonomous systems before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Locate the equilibria
An equilibrium satisfies \(f(\mathbf{x}^*)=0\). Solve the algebraic system obtained by setting both components of the vector field to zero.  
Concrete example: \(\dot{x}=x-y\), \(\dot{y}=x+y-2\) gives the single point \((1,1)\).  
Formal statement: \(\mathbf{x}^*\) is an equilibrium of \(\dot{\mathbf{x}}=f(\mathbf{x})\) if and only if \(f(\mathbf{x}^*)=\mathbf{0}\).

> [!WARNING]
> Missing an equilibrium (especially at infinity or on a coordinate axis) will produce an incomplete phase portrait and wrong stability conclusions.

### Step 2 — Linearize via the Jacobian
Compute the matrix \(Df(\mathbf{x}^*)\) whose entries are the partial derivatives evaluated at the equilibrium.  
For the example above the Jacobian is constant:  
\[
J=\begin{pmatrix}1&-1\\1&1\end{pmatrix}.
\]
Formal statement: the linearization is \(\dot{\mathbf{u}}=J\mathbf{u}\) where \(\mathbf{u}=\mathbf{x}-\mathbf{x}^*\).

### Step 3 — Compute the eigenvalues
Solve the characteristic equation \(\det(J-\lambda I)=0\).  
In the running example the eigenvalues satisfy \(\lambda^2-2\lambda+2=0\), so \(\lambda=1\pm i\).

### Step 4 — Read stability from the real parts
If both real parts are negative the equilibrium is asymptotically stable; if any real part is positive it is unstable. Purely imaginary eigenvalues give a centre (marginal stability in the linear system).

### Step 5 — Incorporate the imaginary parts for spiral or node
Non-zero imaginary part produces rotation, hence a spiral (stable or unstable) or a centre. Zero imaginary part produces a node or saddle.

### Step 6 — Assemble the local phase portrait
Eigenvectors give the directions of approach or departure. The full nonlinear portrait is topologically equivalent to the linear one when no eigenvalue has zero real part (Hartman–Grobman).

## 5. Worked examples — har step show karo

**Example 1 — Stable spiral**  
*Given:* \(\dot{x}=-x-2y\), \(\dot{y}=2x-y\).  
*Find:* stability type of the origin.  
Jacobian at origin is \(J=\begin{pmatrix}-1&-2\\2&-1\end{pmatrix}\).  
Characteristic polynomial: \(\lambda^2+2\lambda+5=0\), eigenvalues \(-1\pm 2i\).  
Both real parts negative and imaginary parts nonzero → stable spiral.  
*Why:* negative real part guarantees attraction, imaginary part guarantees rotation.  
**Final answer: asymptotically stable spiral (focus).**  
*Reflection:* the calculation is short because the system is already linear; the same eigenvalues appear after linearization of any nonlinear system with this Jacobian.

**Example 2 — Saddle**  
*Given:* \(\dot{x}=x+y\), \(\dot{y}=4x-2y\).  
Jacobian \(J=\begin{pmatrix}1&1\\4&-2\end{pmatrix}\).  
\(\lambda^2+\lambda-6=0\) yields \(\lambda=2,-3\).  
Opposite signs → saddle. One stable and one unstable manifold.  
**Final answer: unstable saddle point.**  
*Reflection:* opposite eigenvalue signs are the quickest visual cue for a saddle; students often forget to check the sign of the product of eigenvalues.

**Example 3 — Centre**  
*Given:* \(\dot{x}=-y\), \(\dot{y}=x\).  
\(J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}\), eigenvalues \(\pm i\).  
Purely imaginary → linear centre.  
**Final answer: centre (neutrally stable).**  
*Reflection:* nonlinear perturbations can turn a centre into a weak focus; the linear test is inconclusive for marginal cases.

**Example 4 — Unstable node**  
*Given:* \(\dot{x}=3x+2y\), \(\dot{y}=x+2y\).  
Eigenvalues from \(\lambda^2-5\lambda+4=0\) are \(\lambda=1,4\).  
Both positive → unstable node.  
**Final answer: unstable node.**  
*Reflection:* repeated positive eigenvalues would require checking for a defective matrix, but distinct signs already classify the point.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to evaluate the Jacobian at the equilibrium | Students compute partial derivatives but leave variables symbolic | Substitute the coordinates of \(\mathbf{x}^*\) immediately after forming \(J\) |
| Misreading eigenvalue signs when they are complex | Real part is hidden inside the quadratic formula | Always write \(\lambda=\alpha\pm\beta i\) and inspect only \(\alpha\) |
| Calling a centre “stable” | Linear centres are bounded but not asymptotically stable | Use the precise phrase “neutrally stable” or “Lyapunov stable but not attractive” |
| Ignoring zero eigenvalues | Zero real part makes Hartman–Grobman inapplicable | Check the real parts first; if any is zero, higher-order terms decide stability |
| Confusing spiral with node when trace is zero | Trace-zero systems have purely imaginary eigenvalues | Compute discriminant before naming the type |
| Assuming global stability from local linearization | Nonlinear terms can create distant attractors | Linearization only gives local behaviour; verify with Lyapunov function or numerics for global claims |

## 7. The textbook-precise statement
Let \(f:\mathbb{R}^2\to\mathbb{R}^2\) be \(C^1\). Suppose \(\mathbf{x}^*\) is an isolated equilibrium, i.e., \(f(\mathbf{x}^*)=0\) and \(Df(\mathbf{x}^*)\) is invertible. Let \(J=Df(\mathbf{x}^*)\). The local phase portrait of the nonlinear system near \(\mathbf{x}^*\) is topologically equivalent to that of the linear system \(\dot{\mathbf{u}}=J\mathbf{u}\) provided no eigenvalue of \(J\) has zero real part (Hartman–Grobman theorem). The equilibrium is asymptotically stable if both eigenvalues satisfy \(\operatorname{Re}\lambda<0\), unstable if any \(\operatorname{Re}\lambda>0\), and a centre if \(\lambda=\pm i\beta\) with \(\beta\neq0\). (Perko, *Differential Equations and Dynamical Systems*, 3rd ed., §2.2–2.4.)

## 8. Visual — diagram or schematic
```
          unstable manifold
                 ^
                 |
          saddle o--------> stable manifold (horizontal)
                 |
                 v
```
Vertical arrow leaves along eigenvector of positive eigenvalue; horizontal arrow approaches along eigenvector of negative eigenvalue. Spiral would show curved arrows winding inward or outward; centre would show closed elliptical orbits.

## 9. The memory technique

1. **The hook**  
   Picture a marble on a saddle-shaped surface: it rolls away along the unstable direction (positive eigenvalue) while staying balanced along the stable direction.

2. **What to overlearn**  
   - Trace \(\tau=\operatorname{tr}(J)\), determinant \(\Delta=\det(J)\).  
   - Discriminant \(D=\tau^2-4\Delta\).  
   - Sign chart: both eigenvalues negative iff \(\tau<0\) and \(\Delta>0\).

3. **Spaced-repetition schedule**  
   Review the sign chart after 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback**  
   If you forget the chart, recompute the quadratic formula \(\lambda=(\tau\pm\sqrt{D})/2\) and test the sign of each real part directly.

## 10. What this unlocks
You can now read local phase portraits of any planar autonomous system and decide controller gains that move eigenvalues into the left half-plane.  
- Next: Lyapunov functions for global stability.  
- Centre-manifold reduction when an eigenvalue is zero.  
- Hopf bifurcation when a complex pair crosses the imaginary axis.  
- Numerical continuation packages (AUTO, MATCONT) that track these bifurcations in parameter space.

## 11. Self-check — five questions, no answers
1. For the system \(\dot{x}=x^3-y\), \(\dot{y}=x+y^3\), linearize at the origin and classify the equilibrium.  
2. A matrix has eigenvalues \(2\pm3i\). Is the origin asymptotically stable, unstable, or a centre?  
3. Why does a zero eigenvalue invalidate the Hartman–Grobman conclusion?  
4. Sketch the phase portrait near a saddle whose stable eigenvector is \((1,1)\) and unstable eigenvector is \((1,-1)\).  
5. In the trace-determinant plane, shade the region corresponding to stable spirals and state the two inequalities that define it.