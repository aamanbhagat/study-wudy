## 1. The one-sentence answer
**RK4 for systems is the classical fourth-order Runge-Kutta integrator applied verbatim to a first-order vector ODE \(\mathbf{y}' = \mathbf{f}(t,\mathbf{y})\), with every arithmetic operation performed componentwise on vectors.**

A single scalar ODE is advanced by computing four slope evaluations that are combined with carefully chosen weights to cancel error terms through order four. When the unknown is instead a vector whose components are coupled, the same four evaluations are performed, but each slope is now itself a vector whose dimension matches the system. The update rule therefore remains algebraically identical; only the interpretation of addition and scalar multiplication changes to vector operations. This preserves both the local truncation error \(O(h^5)\) and the global error \(O(h^4)\) without any additional derivation.

The method therefore inherits every stability and accuracy property of scalar RK4 while automatically respecting the coupling among equations.

> [!NOTE]
> The decisive insight is that the Butcher tableau never changes; only the data type of the state is promoted from scalar to vector.

## 2. Why this matters — concrete and current
NASA’s Artemis program integrates the six-degree-of-freedom rigid-body equations of the Orion spacecraft with an RK4-based propagator inside the Copernicus trajectory tool; the vector state contains position, velocity, and quaternion attitude, all advanced simultaneously at each guidance cycle.

In semiconductor process simulation, Synopsys Sentaurus couples dozens of drift-diffusion-reaction equations for carrier and defect concentrations; the resulting stiff system is marched with vector RK4 inside the transient solver to predict dopant activation after rapid thermal anneals.

Modern physics-informed neural networks for turbulent flow, such as those developed at NVIDIA for computational fluid dynamics, embed an RK4 stepper on the velocity-vorticity state vector so that the network residual respects the Navier–Stokes dynamics over finite time intervals.

Epidemiological dashboards maintained by the UK Health Security Agency integrate the SEIR-vector model for multiple age-stratified compartments; the RK4 update on the 20-dimensional state supplies the forward simulation that drives weekly policy parameter fitting.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| First-order scalar ODE   | RK4 is defined only for equations already reduced to \(\mathbf{y}'=\mathbf{f}(t,\mathbf{y})\) |
| Vector arithmetic        | Every stage produces a vector that must be scaled and added componentwise |
| Local truncation error   | The \(O(h^5)\) term per step remains the same once the vector norm replaces the absolute value |
| Autonomous vs. non-autonomous form | The explicit \(t\) argument must be carried through the four stages exactly as in the scalar case |

## 4. Building the idea — from intuition to formalism

### Step 1 — Scalar RK4 as a vector of slope probes
The scalar formula evaluates the right-hand side at four staggered locations and returns a weighted average.  
Example: \(y'=y\), \(y(0)=1\), \(h=0.1\) yields the familiar four numbers \(k_1,k_2,k_3,k_4\).  
$$
k_1=f(t_n,y_n),\quad
k_2=f(t_n+\tfrac h2,y_n+\tfrac h2k_1),\quad
k_3=f(t_n+\tfrac h2,y_n+\tfrac h2k_2),\quad
k_4=f(t_n+h,y_n+hk_3).
$$
> [!WARNING]
> Treating the four evaluations as independent rather than sequentially dependent produces an inconsistent method of order at most two.

### Step 2 — Promote the state to a vector
Replace the scalar unknown \(y\) by an \(m\)-dimensional column vector \(\mathbf{y}\). The right-hand side \(\mathbf{f}\) now returns an \(m\)-vector whose \(i\)-th entry may depend on any component of \(\mathbf{y}\).  
The same algebraic pattern is retained; every occurrence of multiplication by a scalar \(h\) becomes scalar-times-vector multiplication.

### Step 3 — Vectorise each stage
Define four vector stages exactly parallel to the scalar case:
$$
\mathbf{k}_1=\mathbf{f}(t_n,\mathbf{y}_n),\qquad
\mathbf{k}_2=\mathbf{f}(t_n+\tfrac h2,\mathbf{y}_n+\tfrac h2\mathbf{k}_1),
$$
and likewise for \(\mathbf{k}_3,\mathbf{k}_4\). Each \(\mathbf{k}_i\) is an \(m\)-vector.

### Step 4 — Form the increment vector
Combine the stages with the classical weights:
$$
\boldsymbol{\Delta}=\frac h6(\mathbf{k}_1+2\mathbf{k}_2+2\mathbf{k}_3+\mathbf{k}_4).
$$
The new state is simply \(\mathbf{y}_{n+1}=\mathbf{y}_n+\boldsymbol{\Delta}\).

### Step 5 — Recover the textbook statement
The complete algorithm is therefore the direct transcription of scalar RK4 into vector notation, with the understanding that all operations are performed in \(\mathbb{R}^m\).

## 5. Worked examples — every step shown

**Example 1 — Two-dimensional linear system**  
*Given:* \(\mathbf{y}'=A\mathbf{y}\), \(A=\begin{pmatrix}0&1\\-1&0\end{pmatrix}\), \(\mathbf{y}(0)=(1,0)^T\), \(h=0.2\).  
*Find:* \(\mathbf{y}_1\).  
Compute \(\mathbf{k}_1=A\mathbf{y}_0=(0,-1)^T\).  
*Why:* matrix-vector product realises the right-hand side.  
\(\mathbf{k}_2=A(\mathbf{y}_0+0.1\mathbf{k}_1)=( -0.1,-1)^T\).  
*Why:* midpoint argument uses half-step.  
Continuing yields \(\mathbf{k}_3=(-0.1,-0.99)^T\), \(\mathbf{k}_4=(-0.198,-0.98)^T\).  
Increment: \(\boldsymbol{\Delta}=0.2/6(\mathbf{k}_1+2\mathbf{k}_2+2\mathbf{k}_3+\mathbf{k}_4)\).  
**Final answer** \(\mathbf{y}_1\approx(0.9800667,-0.1986693)^T\).

*Reflection:* The rotation matrix \(A\) forces every component to feel the other; omitting any cross term instantly destroys second-order accuracy.

**Example 2 — Van der Pol oscillator**  
*Given:* \(y_1'=y_2\), \(y_2'=\mu(1-y_1^2)y_2-y_1\), \(\mu=5\), \(\mathbf{y}(0)=(2,0)^T\), \(h=0.01\).  
*Find:* first step.  
All four stages are two-vectors; the nonlinear factor \(\mu(1-y_1^2)\) multiplies only the second component of each \(\mathbf{k}_i\). The arithmetic is otherwise identical to Example 1.

**Example 3 — Three-species Lotka–Volterra**  
*Given:* the classic 3-D food-chain model with parameters \(a=1,b=0.5,c=0.5,d=2\). Advance from \(\mathbf{y}(0)=(1,1,1)^T\) with \(h=0.05\).  
Each \(\mathbf{k}_i\) now contains three coupled quadratic terms; the same weighted sum is formed componentwise.

**Example 4 — Non-autonomous linear system with forcing**  
*Given:* \(\mathbf{y}'=A(t)\mathbf{y}+\mathbf{g}(t)\).  
The explicit time argument is simply inserted into each stage evaluation; no structural change occurs.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                              |
|-------------------------------------|---------------------------------------------|----------------------------------------------|
| Using different step sizes per component | Habit from scalar adaptive codes            | Enforce a single shared \(h\) for the whole vector |
| Forgetting to update \(t\) inside stages | Treating the system as autonomous           | Always pass \(t_n + c_i h\) to \(\mathbf{f}\) |
| Componentwise norm instead of vector norm for error control | Confusion between scalar and vector tolerances | Use a single norm (e.g., Euclidean) on the entire increment |
| Re-using a scalar RK4 routine without vectorising \(\mathbf{f}\) | Interface mismatch                          | Wrap the system right-hand side to accept and return vectors |
| Ignoring that \(\mathbf{k}_2\) depends on \(\mathbf{k}_1\) | Copy-paste error from independent evaluations | Implement stages sequentially in code        |
| Applying RK4 to an unreduced second-order equation | Missing the conversion to first-order form  | Always introduce velocity variables first    |
| Over-large \(h\) on stiff spectra   | RK4 stability region is bounded             | Estimate spectral radius or switch to implicit methods |

## 7. The textbook-precise statement
Let \(\mathbf{f}:[t_0,T]\times\mathbb{R}^m\to\mathbb{R}^m\) be continuous and Lipschitz continuous in its second argument uniformly in \(t\). The classical RK4 method on the IVP \(\mathbf{y}'=\mathbf{f}(t,\mathbf{y})\), \(\mathbf{y}(t_0)=\mathbf{y}_0\) is given by the four-stage update
$$
\mathbf{y}_{n+1}=\mathbf{y}_n+\frac h6(\mathbf{k}_1+2\mathbf{k}_2+2\mathbf{k}_3+\mathbf{k}_4)
$$
with stages defined exactly as in Step 3 above. Under the stated hypotheses the method is convergent of order 4 (Hairer, Nørsett & Wanner, *Solving Ordinary Differential Equations I*, 3rd ed., Springer 2008, Theorem II.1.1, extended componentwise to systems).

## 8. Visual — diagram or schematic
```text
t_n                  t_n + h/2               t_n + h
  ●───────────●───────────●───────────●
  y_n         y_n+(h/2)k1  y_n+(h/2)k2   y_n+h k3
     k1           k2            k3           k4
      \            \             \            /
       \            \             \          /
        \            \             \        /
         \            \             \      /
          \            \             \    /
           \            \             \  /
            \            \             \/
             \            \            /
              \            \          /
               \            \        /
                \            \      /
                 \            \    /
                  \            \  /
                   \            \/
                    \           /
                     \         /
                      \       /
                       \     /
                        \   /
                         \ /
                       (k1+2k2+2k3+k4)/6
                             │
                             ▼
                          y_{n+1}
```
Each dot is a vector in \(\mathbb{R}^m\); arrows indicate the four successive evaluations of \(\mathbf{f}\).

## 9. The memory technique
1. **The hook** — Picture four surveyors standing at staggered times along a single road; each hands a vector displacement to the next, and the final position is their weighted average.
2. **What to overlearn** — The four Butcher coefficients \(1,2,2,1\) and the half-step offsets; the update formula written once with bold vectors.
3. **Spaced-repetition schedule** — Re-derive the stages from scratch at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from Taylor expansion of the exact solution to order 5 and match coefficients; the vector case follows identically once every derivative is interpreted componentwise.

## 10. What this unlocks
Mastery of vector RK4 immediately permits integration of any autonomous or non-autonomous first-order system that can be written in explicit form.  
- Implicit RK methods and Rosenbrock methods for stiff systems  
- Embedded RK pairs (RK45, Dormand–Prince) for adaptive step-size control on vectors  
- Geometric integrators that preserve symplectic structure or Lie-group properties  
- Method-of-lines discretisations of parabolic PDEs, where the spatial operator yields a large ODE system advanced by vector RK4.

## 11. Self-check — five questions, no answers
1. Write the four stages for the 2-D system \(\mathbf{y}'=(y_2,-y_1-y_2)^T\) with step \(h\).  
2. Show that applying scalar RK4 componentwise to an uncoupled system yields exactly the same result as the vector formulation.  
3. For the harmonic oscillator \(\mathbf{y}'=A\mathbf{y}\) with \(A\) skew-symmetric, compute the Euclidean norm of the numerical solution after one step and compare with the exact norm.  
4. Identify the precise line in a code listing that would silently degrade the method to order 1 if the time argument were omitted from the second stage.  
5. Given a 100-dimensional chemical kinetics model known to be moderately stiff, list two observable symptoms that would indicate RK4 is no longer reliable and state the mathematical reason.