## 1. The one-sentence answer
**Linearization replaces a nonlinear autonomous system \(\dot{x}=f(x)\) near an equilibrium by its first-order Taylor expansion, yielding an explicit linear system whose solutions approximate the local behavior of the original flow.**

A nonlinear vector field \(f\) may curve trajectories in complicated ways, yet any sufficiently smooth \(f\) is locally indistinguishable from a linear map once you zoom in on a point where \(f\) itself vanishes. That local linear map is obtained simply by differentiating every component of \(f\) with respect to every coordinate and evaluating the resulting matrix at the chosen equilibrium. The resulting constant-coefficient linear system can then be solved by eigenvalues, revealing whether nearby solutions spiral in, drift away, or oscillate.

The approximation is valid only inside a sufficiently small neighborhood and only when the linear part is hyperbolic; otherwise higher-order terms may dominate. The technique therefore converts an intractable local question about a nonlinear equation into a routine linear-algebra exercise.

> [!NOTE]
> The single matrix of first partial derivatives—the Jacobian—encodes the entire infinitesimal geometry of the flow at that point; every stability conclusion that survives small perturbations follows from its eigenvalues alone.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 guidance algorithms linearize the six-degree-of-freedom rigid-body equations about the instantaneous velocity vector during boost-back burns, converting the nonlinear aerodynamic torque map into a time-varying linear plant that the onboard MPC controller can solve in real time.

In semiconductor process control, ASML’s EUV lithography scanners linearize the nonlinear plasma-chamber chemistry and thermo-mechanical deformation models about nominal wafer temperatures; the resulting Jacobian supplies the sensitivity matrix used by the real-time overlay correction loop that maintains sub-nanometer registration.

Modern reinforcement-learning locomotion policies for Boston Dynamics’ Atlas robot are trained on trajectories that remain inside the linearization basin of the zero-moment-point equilibrium; the policy network therefore inherits local exponential stability guarantees from the explicitly computed Jacobian of the centroidal dynamics.

Climate-model intercomparison studies (CMIP6) routinely linearize the primitive-equation atmospheric cores about the zonal-mean jet; the leading eigenmodes of that Jacobian are precisely the structures identified as “zonal-wave vacillation,” allowing quantitative attribution of circulation shifts to anthropogenic forcing.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Autonomous first-order systems \(\dot{x}=f(x)\) | Linearization applies only when the right-hand side does not depend explicitly on time. |
| Equilibrium (fixed point) \(f(x^*)=0\) | The expansion point must itself be stationary; otherwise the constant term survives. |
| Partial derivatives and the total derivative | The linear map is assembled from first partials of each component of \(f\). |
| Eigenvalues of a matrix  | Local stability and oscillation are read off the spectrum of the Jacobian. |
| Taylor expansion in several variables | Supplies the rigorous justification that the remainder is \(o(\|x-x^*\|)\). |

## 4. Building the idea — from intuition to formalism

### Step 1 — Locate the point where motion stops
A nonlinear system can wander, oscillate, or explode, but every local analysis begins by finding a place where velocity is exactly zero.  
Concrete example: \(\dot{x}=x-x^3\) has equilibria at \(x=0,\pm1\).  
Formally, solve the algebraic equation  
\[
f(x^*)=0.
\]
> [!WARNING]
> If you pick a point where \(f(x^*)\ne0\), the constant term in the expansion never vanishes and the subsequent linear system is meaningless.

### Step 2 — Shift coordinates to place the equilibrium at the origin
Translate the state so the chosen point becomes the new zero; this removes the constant term and centers the neighborhood.  
For the example above, set \(y=x-1\) near \(x^*=1\).  
The transformed equation is  
\[
\dot{y}=f(y+x^*).
\]
> [!WARNING]
> Forgetting the shift leaves a nonzero constant that masquerades as an external forcing and destroys linearity.

### Step 3 — Write the first-order Taylor polynomial of each component
Because \(f\) is differentiable, each component admits the expansion  
\[
f_i(y+x^*)=f_i(x^*)+\sum_j\frac{\partial f_i}{\partial x_j}(x^*)y_j+o(\|y\|).
\]
The constant term is zero by Step 1, leaving only the linear part plus higher-order remainder.

### Step 4 — Assemble the Jacobian matrix
Collect all first partial derivatives into the matrix  
\[
Df(x^*)=\Bigl(\frac{\partial f_i}{\partial x_j}(x^*)\Bigr)_{i,j}.
\]
For the cubic example at \(x^*=1\),  
\[
Df(1)=1-3(1)^2=-2.
\]

### Step 5 — Drop the remainder to obtain the linear system
The linearized dynamics are therefore the constant-coefficient ODE  
\[
\dot{y}=Df(x^*)y.
\]
Solutions are linear combinations of terms \(e^{\lambda t}v\) where \(\lambda\) are eigenvalues of \(Df(x^*)\).

### Step 6 — Recover the original variables
Shift back: \(x(t)=y(t)+x^*\). The local phase portrait of the nonlinear system is then approximated by the explicitly solvable linear portrait.

## 5. Worked examples — every step shown

**Example 1 — One-dimensional cubic**  
*Given:* \(\dot{x}=x-x^3\).  
*Find:* Linearization at \(x^*=1\).  
Shift: \(y=x-1\).  
Taylor: \(f(1+y)=(1+y)-(1+y)^3= -2y +O(y^2)\).  
Jacobian: scalar \(-2\).  
Linearized equation: \(\dot{y}=-2y\).  
**Final answer:** \(\dot{y}=-2y\) (hence \(y(t)=Ce^{-2t}\)).  
*Reflection:* The negative eigenvalue correctly predicts attraction; the cubic term only affects the size of the basin.

**Example 2 — Simple pendulum**  
*Given:* \(\ddot{\theta}+\sin\theta=0\), written as  
\[
\dot{\theta}=v,\qquad\dot{v}=-\sin\theta.
\]
*Find:* Linearization at \((\theta,v)=(0,0)\).  
Equilibrium check: \(\sin0=0\).  
Jacobian matrix:  
\[
Df(0,0)=\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
\]
Linear system: \(\dot{y}=Ay\) with \(A\) above.  
**Final answer:** \(\ddot{y}+y=0\) (harmonic oscillator).  
*Reflection:* The linear frequency \(\omega=1\) matches the small-angle approximation taught in freshman physics.

**Example 3 — Competing species**  
*Given:* Lotka–Volterra competition model  
\[
\dot{x}=x(1-x-y),\qquad\dot{y}=y(1-x-y).
\]
*Find:* Linearization at \((1/2,1/2)\).  
Jacobian evaluation yields  
\[
Df(1/2,1/2)=\begin{pmatrix}-1/2&-1/2\\-1/2&-1/2\end{pmatrix}.
\]
Eigenvalues: \(0\) and \(-1\).  
**Final answer:** Linearized system has a line of equilibria (center manifold) plus exponential decay transverse to it.  
*Reflection:* Zero eigenvalue signals the need for center-manifold reduction; linearization alone is inconclusive.

**Example 4 — Spiral source**  
*Given:* \(\dot{x}=-y+x^3,\quad\dot{y}=x+y^3\).  
*Find:* Linearization at origin.  
Jacobian:  
\[
Df(0)=\begin{pmatrix}0&-1\\1&0\end{pmatrix}.
\]
Eigenvalues \(\pm i\).  
**Final answer:** Linearized system is pure rotation; nonlinear terms decide stability.  
*Reflection:* Purely imaginary eigenvalues violate hyperbolicity; linearization gives no stability verdict.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Linearizing at a non-equilibrium  | Habit of expanding about any convenient point       | Always verify \(f(x^*)=0\) algebraically first       |
| Forgetting the coordinate shift   | Treating the constant term as harmless              | Substitute \(y=x-x^*\) before differentiating        |
| Using the full nonlinear Jacobian everywhere | Confusing state-dependent linearization with the constant one | Evaluate partials only at the fixed point            |
| Ignoring non-hyperbolic eigenvalues | Over-generalizing the Grobman–Hartman theorem       | Check \(\operatorname{Re}\lambda\neq0\) before claiming topological equivalence |
| Sign error in the Jacobian        | Mixed-up rows versus columns or chain-rule slips    | Write each row as the gradient of one component      |
| Applying linear stability to time-varying systems | Forgetting autonomy requirement                     | Confirm right-hand side has no explicit \(t\)        |
| Overclaiming global behavior      | Extrapolating local linear portrait to the whole plane | Restrict conclusions to a neighborhood whose size is not quantified |

## 7. The textbook-precise statement
Let \(f:\mathbb{R}^n\to\mathbb{R}^n\) be \(C^1\) and let \(x^*\) satisfy \(f(x^*)=0\). The **linearization** of the autonomous system \(\dot{x}=f(x)\) at \(x^*\) is the linear system
\[
\dot{y}=Df(x^*)y,
\]
where \(Df(x^*)\) denotes the Jacobian matrix of partial derivatives evaluated at \(x^*\). If all eigenvalues of \(Df(x^*)\) have nonzero real part, the Hartman–Grobman theorem asserts that the nonlinear flow is topologically conjugate to the linear flow in some neighborhood of \(x^*\). (Perko, *Differential Equations and Dynamical Systems*, 3rd ed., Springer 2001, Theorem 2.7.1.)

## 8. Visual — diagram or schematic
```text
Phase plane near (0,0)
          v ↑
            |     ↗   (unstable spiral)
            |   ↗
     ----+--0--+----→ θ
            |   ↘
            |     ↘   (stable direction if Re λ <0)
```
Horizontal axis: \(\theta\); vertical axis: \(v\). Arrows show the linearized flow given by the matrix \(A=Df(0)\). Curvature of true nonlinear orbits appears only farther from the origin.

## 9. The memory technique
1. **The hook** — Picture the Jacobian as a tiny “linear microscope” glued exactly at the equilibrium; everything outside its tiny field of view is discarded.
2. **What to overlearn** — The definition \(Df(x^*)\) and the fact that only hyperbolic equilibria inherit linear stability.
3. **Spaced-repetition schedule** — Re-derive the Jacobian for the pendulum at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Re-expand each component in multivariable Taylor series about \(x^*\) and discard every term of degree two or higher.

## 10. What this unlocks
Linearization supplies the local stability classification that underpins almost all subsequent global analysis of nonlinear flows. It is the prerequisite for center-manifold reduction, normal-form computations, Lyapunov-function construction near equilibria, and numerical continuation of periodic orbits. The same Jacobian appears in extended Kalman filters, feedback linearization controllers, and numerical bifurcation packages such as AUTO and MATCONT.

## 11. Self-check — five questions, no answers
1. Compute the linearization of \(\dot{x}=x^2-1\) at both equilibria and state the stability type predicted by each.
2. For the system \(\dot{x}=-y+x(x^2+y^2),\dot{y}=x+y(x^2+y^2)\), the origin is an equilibrium; is it hyperbolic? What does the linearization say?
3. A student obtains eigenvalues \(0\) and \(-3\) for a planar Jacobian. Which conclusion is safe and which is unsafe?
4. Show that the linearization of any gradient system \(\dot{x}=-\nabla V(x)\) at a critical point is always symmetric; what does this imply for the eigenvalues?
5. Construct a concrete cubic planar system whose linearization at the origin is a center yet whose nonlinear orbits spiral outward.