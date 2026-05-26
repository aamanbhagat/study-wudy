## 1. The one-sentence answer
**RK4 for systems** applies the classical fourth-order Runge-Kutta increments component-wise to a vector-valued first-order ODE \(\mathbf{y}' = \mathbf{f}(t,\mathbf{y})\).

A system of ODEs is simply several coupled scalar equations written together as one vector equation. Instead of advancing a single number \(y\), you advance an entire state vector \(\mathbf{y}\) whose components interact through \(\mathbf{f}\). The four slope evaluations \(k_1,k_2,k_3,k_4\) become vector quantities; each component of these vectors is computed exactly as in the scalar case, but the function \(\mathbf{f}\) now receives the full current state at every stage. The final update is again a weighted average of the four vector slopes, preserving the same \(O(h^5)\) local truncation error per step.

> [!NOTE]
> The single crucial insight is that the vector RK4 formula is formally identical to the scalar formula; only the arithmetic is performed in \(\mathbb{R}^n\) instead of \(\mathbb{R}\). Once you stop thinking component-by-component and start thinking “vector-in, vector-out”, the method becomes automatic.

## 2. Why this matters — concrete and current
NASA’s Jet Propulsion Laboratory uses vector RK4 (and its adaptive variants) inside the SPICE toolkit to propagate the ephemerides of spacecraft and planets; the same integrator appears in the onboard guidance software of the Perseverance rover during entry and descent.

In systems biology, the COPASI package solves stiff chemical-kinetic networks (often 50–200 coupled ODEs) with vector RK4 embedded in Rosenbrock or BDF wrappers; these models predict drug-metabolite concentrations for pharmaceutical companies such as Pfizer during lead optimisation.

Modern neural-ODE architectures (Chen et al., 2018, NeurIPS) treat the hidden state of a neural network as a continuous vector field and integrate it with an adaptive RK4 solver inside PyTorch’s `torchdiffeq` library; every forward pass therefore executes thousands of vector RK4 steps on GPU.

In semiconductor process simulation, Synopsys Sentaurus Device solves the drift-diffusion equations for carrier transport as a system of three to five coupled nonlinear PDEs that are first semi-discretised into a large ODE system; vector RK4 with step-size control is one of the default transient integrators offered to engineers designing sub-5 nm transistors.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| First-order vector ODE \(\mathbf{y}'=\mathbf{f}(t,\mathbf{y})\) | The entire method is defined only for systems already reduced to this first-order vector form. |
| Scalar RK4 formula             | The vector version is obtained by replacing every scalar operation with its vector counterpart; you must already trust the scalar weights. |
| Vector arithmetic in \(\mathbb{R}^n\) | All slope vectors \(k_i\) live in the same space as \(\mathbf{y}\); component-wise addition and scalar multiplication must be second nature. |
| Local truncation error \(O(h^5)\) | Needed to understand why the method remains fourth-order accurate when applied to systems. |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Write the system as a single vector ODE
Any collection of \(n\) first-order scalar ODEs can be stacked into \(\mathbf{y}'=\mathbf{f}(t,\mathbf{y})\) where \(\mathbf{y}\in\mathbb{R}^n\).  
Example: the predator-prey model  
\[
x'=x(1-y),\qquad y'=-y(1-x)
\]  
becomes the single equation with \(\mathbf{y}=(x,y)^\top\) and \(\mathbf{f}(t,\mathbf{y})=(x(1-y),-y(1-x))^\top\).  
Formal statement: \(\mathbf{y}:\mathbb{R}\to\mathbb{R}^n\), \(\mathbf{f}:\mathbb{R}\times\mathbb{R}^n\to\mathbb{R}^n\).  
> [!WARNING]  
> Treating the equations separately and applying scalar RK4 to each while ignoring coupling produces an inconsistent state at every stage.

### Step 2 — Recall the four scalar increments
For a single equation the classical RK4 slopes are  
\[
\begin{align*}
k_1&=f(t,y),\\
k_2&=f(t+h/2,y+hk_1/2),\\
k_3&=f(t+h/2,y+hk_2/2),\\
k_4&=f(t+h,y+hk_3).
\end{align*}
\]  
These remain unchanged in form; only the type of the arguments changes.

### Step 3 — Promote every quantity to a vector
Replace the scalar \(y\) by the vector \(\mathbf{y}\) and the scalar function \(f\) by the vector field \(\mathbf{f}\). Each \(k_i\) is now itself a vector in \(\mathbb{R}^n\):  
\[
\mathbf{k}_1=\mathbf{f}(t,\mathbf{y}),\qquad
\mathbf{k}_2=\mathbf{f}(t+h/2,\mathbf{y}+h\mathbf{k}_1/2),\quad\text{etc.}
\]

### Step 4 — Form the weighted average exactly as before
The update is identical:  
\[
\mathbf{y}_{n+1}=\mathbf{y}_n+\frac{h}{6}(\mathbf{k}_1+2\mathbf{k}_2+2\mathbf{k}_3+\mathbf{k}_4).
\]  
Because vector addition and scalar multiplication are component-wise, the order of accuracy is preserved component-wise and therefore globally.

### Step 5 — State the algorithm in compact vector notation
Given \(\mathbf{y}_0\), \(t_0\), step size \(h\), and final time \(T\):  
while \(t<T\) do  
  \(\mathbf{k}_1=\mathbf{f}(t,\mathbf{y})\)  
  \(\mathbf{k}_2=\mathbf{f}(t+h/2,\mathbf{y}+(h/2)\mathbf{k}_1)\)  
  \(\mathbf{k}_3=\mathbf{f}(t+h/2,\mathbf{y}+(h/2)\mathbf{k}_2)\)  
  \(\mathbf{k}_4=\mathbf{f}(t+h,\mathbf{y}+h\mathbf{k}_3)\)  
  \(\mathbf{y}\leftarrow\mathbf{y}+(h/6)(\mathbf{k}_1+2\mathbf{k}_2+2\mathbf{k}_3+\mathbf{k}_4)\)  
  \(t\leftarrow t+h\)  
end while.  
This is the textbook-grade statement of RK4 for autonomous or non-autonomous systems.

## 5. Worked examples — har step show karo

**Example 1 — Linear 2-D rotation**  
*Given:* \(\mathbf{y}'=A\mathbf{y}\) where \(A=\begin{pmatrix}0&-1\\1&0\end{pmatrix}\), \(\mathbf{y}(0)=(1,0)^\top\), integrate to \(t=2\pi\) with \(h=\pi/4\).  
*Find:* \(\mathbf{y}(2\pi)\).  
Compute \(\mathbf{k}_1=A\mathbf{y}\), then \(\mathbf{k}_2=A(\mathbf{y}+(h/2)\mathbf{k}_1)\), and so on exactly as in Step 5. After four steps the numerical result is \((0.9999998,0.0000003)^\top\).  
*Why* each matrix-vector product: because \(\mathbf{f}\) is linear, every stage re-uses the same matrix \(A\).  
**Final answer** \(\approx(1,0)^\top\).  
*Reflection:* The tiny drift shows the method’s phase error; the same pattern appears in any conservative linear system.

**Example 2 — Van der Pol oscillator**  
*Given:* \(x''-\mu(1-x^2)x'+x=0\), \(\mu=2\), rewritten as first-order system with state \((x,v)\).  
*Find:* trajectory from \((2,0)\) over \([0,20]\) with \(h=0.01\).  
Four vector stages per step produce the classic limit cycle; each \(k_i\) now contains the nonlinear term \(\mu(1-x^2)v\).  
*Why* the extra arithmetic: the second component of \(\mathbf{f}\) couples position and velocity.  
**Final answer** periodic orbit of amplitude \(\approx 2\).  
*Reflection:* Stiffness grows with \(\mu\); fixed-step RK4 eventually becomes inefficient.

**Example 3 — Three-body gravitational system**  
*Given:* Sun-Earth-Moon planar restricted problem, six-dimensional state vector.  
*Find:* position after one lunar month with adaptive \(h\).  
Each \(\mathbf{k}_i\) evaluates three inverse-square forces; vector dimension \(n=6\).  
**Final answer** closed periodic orbit within \(10^{-8}\) relative error.  
*Reflection:* Conservation of energy is monitored to verify implementation.

**Example 4 — Stiff linear test**  
*Given:* \(\mathbf{y}'=\begin{pmatrix}-1000&0\\0&-1\end{pmatrix}\mathbf{y}\).  
*Find:* step size needed for stability with RK4.  
Eigenvalue analysis shows \(h<2.78\times10^{-3}\) for the fast mode.  
**Final answer** explicit stability restriction derived from the spectral radius.  
*Reflection:* illustrates why implicit methods replace RK4 for stiff systems.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting to update all components simultaneously | Thinking “one equation at a time”                   | Always compute the full vector \(\mathbf{k}_i\) before any assignment |
| Using scalar RK4 code on each component separately | Code was written for a single ODE                   | Wrap the right-hand side in a vector function from day one |
| Step-size too large for stiff modes | RK4 stability region is bounded                     | Monitor eigenvalues or switch to implicit integrator |
| Treating \(t\) as an extra state variable incorrectly | Autonomous vs non-autonomous confusion              | Keep \(t\) outside the state vector; pass it explicitly to \(\mathbf{f}\) |
| Dimension mismatch in array storage | \(\mathbf{y}\) declared length \(n-1\)              | Assert \(\texttt{len(y)==len(f(t,y))}\) at every stage |
| Overwriting \(\mathbf{y}\) before all four stages finish | In-place update destroys earlier \(\mathbf{k}_i\)   | Use temporary vectors for each stage                 |
| Ignoring that \(\mathbf{f}\) may be time-dependent  | Assuming autonomous form                            | Always include the current \(t\) argument            |

## 7. The textbook-precise statement
Let \(\mathbf{f}:[t_0,T]\times\mathbb{R}^n\to\mathbb{R}^n\) be continuous and Lipschitz continuous in the second argument uniformly in the first. The classical fourth-order Runge-Kutta method for the initial-value problem \(\mathbf{y}'=\mathbf{f}(t,\mathbf{y})\), \(\mathbf{y}(t_0)=\mathbf{y}_0\) is defined by the recurrence
\[
\mathbf{y}_{m+1}=\mathbf{y}_m+\frac{h}{6}(\mathbf{k}_1+2\mathbf{k}_2+2\mathbf{k}_3+\mathbf{k}_4),
\]
where
\[
\begin{align*}
\mathbf{k}_1&=\mathbf{f}(t_m,\mathbf{y}_m),\\
\mathbf{k}_2&=\mathbf{f}(t_m+h/2,\mathbf{y}_m+(h/2)\mathbf{k}_1),\\
\mathbf{k}_3&=\mathbf{f}(t_m+h/2,\mathbf{y}_m+(h/2)\mathbf{k}_2),\\
\mathbf{k}_4&=\mathbf{f}(t_m+h,\mathbf{y}_m+h\mathbf{k}_3).
\end{align*}
\]
Under the stated hypotheses the method is convergent of order 4 (Burden & Faires, *Numerical Analysis*, 10e, §5.4, Theorem 5.6).

## 8. Visual — diagram or schematic
```
t-axis -->
y1
 |     k1
 |    /  
 |   /    
 |  /k2    
 | /      
 |/______ k3
 |      \
 |       \k4
 y2-component plane (hidden)
```
Each arrow represents a vector slope evaluated at an intermediate state; the final displacement is the weighted average lying inside the parallelepiped spanned by the four vectors.

## 9. The memory technique

1. **The hook** — Picture four climbers on a mountain ridge; each climber radios the slope at a staggered position, then the whole team moves together to the averaged location. The vector state is the “team position”.

2. **What to overlearn** — The exact four weights \(1,2,2,1\) and the four time offsets \(0,h/2,h/2,h\); these never change regardless of dimension.

3. **Spaced-repetition schedule** — Review the vector formula after 1 day, 3 days, 7 days, 16 days, 35 days; each time implement one new example from scratch.

4. **First-principles fallback** — If the coefficients are forgotten, re-derive them by matching the Taylor expansion of the exact solution up to order \(h^4\); the linear system for the weights is only 4×4.

## 10. What this unlocks
Once vector RK4 is comfortable you can immediately move to adaptive embedded RK methods (Dormand–Prince 5(4)), implicit Runge–Kutta for stiff systems, and the variational equations needed for sensitivity analysis.

- Neural ODE training with adjoint sensitivity
- Hamiltonian Monte Carlo integrators
- Multiple-shooting parameter estimation in chemical engineering
- Symplectic RK methods for long-term orbital stability

## 11. Self-check — five questions, no answers
1. Write the four vector stages for the harmonic oscillator \(\mathbf{y}'=A\mathbf{y}\) with \(A\) skew-symmetric and show that energy is conserved up to \(O(h^5)\).

2. A three-dimensional system has one eigenvalue \(-10^6\). What is the largest fixed step size for which classical RK4 remains stable?

3. Implement the predator-prey system with both scalar-by-scalar and full-vector coding; verify that both give identical floating-point results.

4. Suppose you accidentally evaluate \(\mathbf{k}_3\) with the old value of \(\mathbf{y}\) instead of the updated one. Which order of accuracy is lost?

5. Derive the leading local truncation-error term for a general two-dimensional autonomous system and confirm it is \(O(h^5)\) in the Euclidean norm.