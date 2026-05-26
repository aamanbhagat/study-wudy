## 1. The one-sentence answer
**Stability of an equilibrium classifies whether nearby solutions remain close, approach it, or depart as time advances, with the precise type (node, saddle, spiral, centre) fixed by the eigenvalues of the linearised vector field.**

An equilibrium of an autonomous ODE \(\dot{x}=f(x)\) is a constant solution \(x^*\) where \(f(x^*)=0\). Its stability is decided by examining the flow in a small neighbourhood: trajectories may converge to \(x^*\), diverge from it, or exhibit mixed behaviour. For two-dimensional linear systems the geometry is completely determined by the trace and determinant of the coefficient matrix, which in turn fix the eigenvalues and therefore the phase portrait.

The same classification carries over to nonlinear systems near a hyperbolic equilibrium by the Hartman–Grobman theorem: the local picture is topologically equivalent to that of the linearised system. Non-hyperbolic cases (pure imaginary eigenvalues) require centre-manifold or Lyapunov-function analysis and lie outside the elementary classification.

> [!NOTE]
> The sign of the real parts of the eigenvalues alone decides attraction or repulsion; their imaginary parts decide whether trajectories spiral or approach monotonically.

## 2. Why this matters — concrete and current
Spacecraft attitude control at SpaceX relies on determining whether the zero-error state of the quaternion kinematics is asymptotically stable under the onboard PD controller; an unstable spiral would produce growing nutation that must be detected before launch.

In power-grid engineering, the swing equations for synchronous generators are linearised about the operating point; eigenvalue analysis performed by Siemens PTI software certifies that the equilibrium remains a stable node after a line fault, preventing cascading blackouts.

Machine-learning papers on neural ordinary differential equations (e.g., NeurIPS 2021) treat the hidden state as a dynamical system and enforce that the zero vector is a globally asymptotically stable spiral sink, guaranteeing that the continuous-depth model converges rather than oscillates.

In population genetics, the replicator equation for two-strategy evolutionary games possesses a saddle at the mixed equilibrium; stability classification tells biologists whether one pure strategy will fixate or whether protected polymorphism persists.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Eigenvalues of 2×2 matrices | They determine the local geometry of every hyperbolic equilibrium |
| Phase-plane representation | Converts the autonomous system into a geometric picture of trajectories |
| Linearisation (Jacobian) | Reduces the nonlinear problem to the linear case near the equilibrium |
| Trace–determinant plane  | Gives an immediate visual map from matrix entries to stability type |

## 4. Building the idea — from intuition to formalism

### Step 1 — Equilibrium as a fixed point
A point \(x^*\) is an equilibrium when the vector field vanishes there, so the constant function \(x(t)=x^*\) solves the ODE.  
**Example.** For \(\dot{x}=x(1-x)\), the equilibria are \(x=0\) and \(x=1\).  
Formally,
\[
f(x^*)=0.
\]
> [!WARNING]
> Confusing an equilibrium with a point where the derivative of a solution vanishes leads to treating transient extrema as equilibria.

### Step 2 — Linearisation via the Jacobian
Shift coordinates so the candidate equilibrium sits at the origin and replace \(f\) by its first-order Taylor expansion. The resulting linear system \(\dot{y}=Ay\) with \(A=Df(x^*)\) governs the local behaviour when the equilibrium is hyperbolic.  
**Example.** For \(\dot{x}=-x+x^2\), \(A=-1\) at the origin.  
Formally,
\[
A = \left.\frac{\partial f_i}{\partial x_j}\right|_{x^*}.
\]
> [!WARNING]
> Omitting the linearisation step and inspecting only the nonlinear terms produces incorrect stability conclusions for saddles and spirals.

### Step 3 — Eigenvalue computation
Solve \(\det(A-\lambda I)=0\). The two eigenvalues \(\lambda_{1,2}\) are either both real or complex conjugates.  
**Example.** Matrix \(\begin{pmatrix}0&1\\-1&0\end{pmatrix}\) yields \(\lambda=\pm i\).  
Formally,
\[
\lambda = \frac{\operatorname{tr}A \pm\sqrt{(\operatorname{tr}A)^2-4\det A}}{2}.
\]
> [!WARNING]
> Arithmetic errors in the characteristic polynomial flip a centre into a spiral and reverse the stability verdict.

### Step 4 — Sign of real parts
If both \(\operatorname{Re}\lambda<0\), the origin is asymptotically stable; if any \(\operatorname{Re}\lambda>0\), it is unstable.  
Formally, the origin of \(\dot{y}=Ay\) is asymptotically stable if and only if \(\operatorname{Re}\lambda_j<0\) for every eigenvalue.

### Step 5 — Geometric classification
- Real eigenvalues of same sign → node (stable or unstable).  
- Real eigenvalues of opposite sign → saddle.  
- Complex eigenvalues with nonzero real part → spiral (stable or unstable).  
- Pure imaginary eigenvalues → centre (stable but not asymptotically stable).  
Formally, the five open regions of the trace–determinant plane label these portraits.

### Step 6 — Hartman–Grobman transfer to nonlinear systems
When no eigenvalue has zero real part, a homeomorphism conjugates the nonlinear flow to the linear flow in a neighbourhood of the equilibrium. Thus the stability type read from the Jacobian persists.

## 5. Worked examples — every step shown

**Example 1 — Stable node**  
*Given:* \(\dot{x}=-3x+2y\), \(\dot{y}=-2x+2y\).  
*Find:* Type and stability of the origin.  
The matrix is \(A=\begin{pmatrix}-3&2\\-2&2\end{pmatrix}\).  
*Why:* Direct transcription of coefficients.  
Characteristic equation: \(\lambda^2+\lambda-2=0\), roots \(\lambda=-2,1\).  
*Why:* Quadratic formula applied to trace \(-1\) and determinant \(-2\).  
Eigenvalues real and opposite in sign → saddle (unstable).  
**Final answer:** saddle, unstable.  
*Reflection:* The opposite-sign eigenvalues are the sole source of instability; the calculation is otherwise mechanical.

**Example 2 — Spiral sink**  
*Given:* \(\dot{x}=-x-4y\), \(\dot{y}=4x-y\).  
Matrix \(A=\begin{pmatrix}-1&-4\\4&-1\end{pmatrix}\).  
Trace \(-2\), determinant \(17\), discriminant negative → complex eigenvalues with negative real part.  
**Final answer:** asymptotically stable spiral.  
*Reflection:* The sign of the trace alone decides attraction once complex eigenvalues are confirmed.

**Example 3 — Centre**  
*Given:* \(\dot{x}=y\), \(\dot{y}=-x\).  
Matrix yields \(\lambda=\pm i\).  
Pure imaginary eigenvalues → closed orbits, Lyapunov stable but not attractive.  
**Final answer:** centre (neutrally stable).  
*Reflection:* Zero real part prevents both attraction and repulsion.

**Example 4 — Nonlinear saddle via linearisation**  
*Given:* \(\dot{x}=x^3-x+ y\), \(\dot{y}=-y\).  
Jacobian at \((0,0)\): \(A=\begin{pmatrix}-1&1\\0&-1\end{pmatrix}\).  
Eigenvalues \(-1,-1\) (repeated, negative) → stable node for the linearisation; the equilibrium is asymptotically stable for the nonlinear system as well.  
**Final answer:** asymptotically stable node.  
*Reflection:* Hyperbolicity guarantees the nonlinear portrait matches the linear one.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Treating a centre as asymptotically stable | Closed orbits look “steady” on a plot       | Check that real parts are strictly negative          |
| Forgetting to shift the equilibrium to the origin | Coordinates hide the linear term            | Always translate \(x\leftarrow x-x^*\) first         |
| Using the nonlinear terms to decide stability | Intuition from one dimension carries over   | Linearise; higher-order terms are irrelevant for hyperbolic cases |
| Sign error in the characteristic polynomial | Trace–determinant formula misremembered     | Compute \(\det(A-\lambda I)\) explicitly each time   |
| Confusing saddle with unstable node | Both have positive eigenvalues              | Count the number of eigenvalues with positive real part |
| Applying Hartman–Grobman when \(\operatorname{Re}\lambda=0\) | Theorem hypothesis violated                 | Verify hyperbolicity before invoking the theorem     |
| Reading stability from a single trajectory | Global behaviour misread as local           | Examine a full neighbourhood or the eigenvalue signs |

## 7. The textbook-precise statement
Let \(\dot{x}=f(x)\) be a \(C^1\) autonomous system on \(\mathbb{R}^2\) with hyperbolic equilibrium \(x^*\) (i.e., \(Df(x^*)\) has no eigenvalue with zero real part). Then there exists a neighbourhood \(U\) of \(x^*\) and a homeomorphism \(h:U\to V\) mapping orbits of the nonlinear system to orbits of the linear system \(\dot{y}=Ay\), \(A=Df(x^*)\), preserving time orientation. Consequently the stability type—node, saddle, spiral, or centre—is completely determined by the eigenvalues of \(A\). (Hirsch, Smale & Devaney, *Differential Equations, Dynamical Systems, and an Introduction to Chaos*, 3rd ed., Theorem 1.3.1 and §4.3.)

## 8. Visual — diagram or schematic
```text
Stable node          Saddle               Spiral sink          Centre
   \   |   /          \   |   /            ↘   ↘   ↘            ↻   ↻   ↻
    \  |  /            \  |  /              \   \   \           |   |   |
     \ | /              \ | /                \   \   \          |   |   |
------+------          ---+---               --+---+--         --+---+--
     / | \              / | \                /   /   /          |   |   |
    /  |  \            /  |  \              /   /   /           |   |   |
   /   |   \          /   |   \            ↗   ↗   ↗            ↺   ↺   ↺
```
Horizontal axis: \(x_1\); vertical axis: \(x_2\). Arrows indicate direction of increasing time. The saddle has two incoming and two outgoing separatrices; the centre consists of nested closed curves.

## 9. The memory technique
1. **The hook** — Picture a marble at the bottom of a bowl (stable spiral), balanced on a saddle (unstable in one direction), or rolling around a roulette wheel (centre).  
2. **What to overlearn** — Trace < 0 and det > 0 ⇒ asymptotically stable; opposite signs of eigenvalues ⇒ saddle; pure imaginary ⇒ centre.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the characteristic polynomial from \(\det(A-\lambda I)=0\) and read stability from the signs of the real parts.

## 10. What this unlocks
Linear stability supplies the local building block for global phase-portrait analysis, Lyapunov functions, and bifurcation theory.  
- Centre-manifold reduction for non-hyperbolic equilibria  
- Hopf bifurcation detection when a complex conjugate pair crosses the imaginary axis  
- Construction of Lyapunov functions via linearisation when the linear part is asymptotically stable  
- Numerical continuation packages (AUTO, MATCONT) that track stability changes along branches of equilibria

## 11. Self-check — five questions, no answers
1. For the matrix \(\begin{pmatrix}1&-3\\0&-2\end{pmatrix}\), classify the origin and state whether it is hyperbolic.  
2. Construct a 2×2 matrix whose linear system has an unstable spiral at the origin; give its trace and determinant.  
3. A nonlinear system has Jacobian eigenvalues \(0\) and \(-1\) at an equilibrium. Which parts of the elementary classification still apply?  
4. Sketch the phase portrait near a saddle whose stable manifold lies along the line \(y=x\).  
5. Explain why the equilibrium \((0,0)\) of \(\dot{x}=x^3\), \(\dot{y}=-y\) cannot be decided by linearisation alone.