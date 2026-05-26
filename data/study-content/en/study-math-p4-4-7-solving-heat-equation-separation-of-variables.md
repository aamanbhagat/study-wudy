## 1. The one-sentence answer
**Separation of variables solves the heat equation by writing the unknown temperature function as a product of a purely spatial function and a purely temporal function, converting the PDE into two ordinary eigenvalue problems whose solutions are then superposed to match initial data.**

The heat equation \(u_t = k u_{xx}\) is linear and homogeneous. Any linear combination of solutions is again a solution. The product assumption therefore reduces the problem to finding spatial modes that satisfy the boundary conditions; each mode then decays exponentially in time at a rate fixed by its eigenvalue. The initial temperature distribution is recovered by expressing it as a sum of these modes, exactly as one expands a function in a Fourier series.

This works only when the boundary conditions are homogeneous and linear. The resulting series solution converges to the unique classical solution under standard regularity assumptions on the initial data.

> [!NOTE]
> The decisive insight is that the spatial operator (second derivative with fixed-end conditions) possesses a complete set of eigenfunctions; once those are known, time evolution on each mode is immediate.

## 2. Why this matters — concrete and current
Intel’s thermal simulators for 3-D stacked chips solve the heat equation on rectangular domains with separation of variables in the early design stage; the eigenfunction expansion supplies rapid estimates of hot-spot temperatures before full finite-element runs are launched.

NASA’s Mars rover thermal models treat the electronics enclosure as a conducting rod with prescribed end temperatures; separation of variables yields the exact transient response used to size phase-change heat sinks for the 2020 Perseverance mission.

Black–Scholes option pricing reduces to the heat equation after a logarithmic change of variables; traders at Jane Street and Citadel routinely evaluate the resulting Fourier series for barrier options whose payoffs admit eigenfunction expansions.

Climate models at the Geophysical Fluid Dynamics Laboratory employ separation of variables on latitude–longitude slices to compute vertical diffusion of heat in the ocean mixed layer, providing benchmark solutions against which their full GCM codes are validated.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Second-order linear ODEs | The separated spatial equation is a Sturm–Liouville problem whose solutions determine admissible modes. |
| Eigenvalues and eigenfunctions | Each separation constant \(\lambda_n\) fixes both the spatial shape and the temporal decay rate. |
| Fourier sine/cosine series | The initial condition is expanded in the eigenfunctions to determine the coefficients of the time-dependent solution. |
| Uniform convergence of series | Justifies term-by-term differentiation needed to verify that the series satisfies the PDE. |

## 4. Building the idea — from intuition to formalism

### Step 1 — State the initial-boundary-value problem
The classical one-dimensional heat equation on a finite interval with zero Dirichlet ends reads
\[
u_t = k u_{xx},\qquad 0<x<L,\ t>0,
\]
subject to
\[
u(0,t)=u(L,t)=0,\qquad u(x,0)=f(x).
\]
The PDE alone does not determine a unique temperature; the three auxiliary conditions close the problem.

### Step 2 — Assume a separated solution
Seek solutions of the product form \(u(x,t)=X(x)T(t)\). Substituting into the PDE produces
\[
X T' = k X'' T.
\]
Division by \(kXT\) (assuming \(X T\neq 0\)) separates the variables:
\[
\frac{T'}{kT}=\frac{X''}{X}=-\lambda.
\]
The separation constant \(-\lambda\) must be the same for both sides because one side depends only on \(t\) and the other only on \(x\).

> [!WARNING]
> Choosing the wrong sign for \(\lambda\) yields exponentially growing solutions that violate the maximum principle; the negative sign is forced by the physics of diffusion.

### Step 3 — Solve the spatial eigenvalue problem
The boundary conditions \(X(0)=X(L)=0\) turn the spatial equation into the Sturm–Liouville problem
\[
X''+\lambda X=0,\qquad X(0)=X(L)=0.
\]
The eigenvalues are \(\lambda_n=(n\pi/L)^2\) with eigenfunctions \(X_n(x)=\sin(n\pi x/L)\), \(n=1,2,\dots\).

### Step 4 — Solve the temporal ODE for each eigenvalue
For each \(\lambda_n\) the time equation is \(T'= -k\lambda_n T\), hence
\[
T_n(t)=A_n\exp(-k\lambda_n t).
\]
Every product \(u_n(x,t)=X_n(x)T_n(t)\) satisfies the PDE and the homogeneous boundary conditions.

### Step 5 — Superpose and match initial data
The general solution is the infinite linear combination
\[
u(x,t)=\sum_{n=1}^\infty b_n\sin(n\pi x/L)\exp(-k(n\pi/L)^2 t).
\]
The initial condition forces
\[
f(x)=\sum_{n=1}^\infty b_n\sin(n\pi x/L),
\]
so the coefficients \(b_n\) are the Fourier sine coefficients of \(f\).

## 5. Worked examples — every step shown

**Example 1 — Uniform initial temperature on unit interval**  
*Given:* \(k=1\), \(L=1\), \(f(x)=1\).  
*Find:* \(u(x,t)\).  
Assume \(u=X(x)T(t)\). Separation yields \(X''+\lambda X=0\), \(X(0)=X(1)=0\).  
Eigenvalues: \(\lambda_n=n^2\pi^2\), \(X_n=\sin(n\pi x)\).  
Time factors: \(T_n(t)=b_n e^{-n^2\pi^2 t}\).  
Initial condition: \(1=\sum b_n\sin(n\pi x)\).  
Hence \(b_n=2(1-(-1)^n)/(n\pi)\).  
Final series:
\[
u(x,t)=\sum_{n=1}^\infty\frac{2(1-(-1)^n)}{n\pi}\sin(n\pi x)e^{-n^2\pi^2 t}.
\]
**Reflection.** The only non-routine step is recognizing that even \(n\) vanish; the pattern generalises to any piecewise-smooth \(f\).

**Example 2 — Sinusoidal initial data**  
*Given:* Same PDE, \(f(x)=\sin(\pi x)\).  
*Find:* \(u(x,t)\).  
Only the \(n=1\) term is present, so \(b_1=1\) and all other \(b_n=0\).  
Thus \(u(x,t)=e^{-\pi^2 t}\sin(\pi x)\).  
**Reflection.** The solution collapses to a single term; this is the eigenfunction evolution itself.

**Example 3 — Two-term initial data**  
*Given:* \(f(x)=\sin(\pi x)+3\sin(3\pi x)\).  
*Find:* \(u(x,t)\).  
Coefficients are read off directly: \(b_1=1\), \(b_3=3\).  
Solution:
\[
u(x,t)=e^{-\pi^2 t}\sin(\pi x)+3e^{-9\pi^2 t}\sin(3\pi x).
\]
**Reflection.** Superposition is immediate once the eigenfunctions are known; no integration is required.

**Example 4 — Arbitrary smooth initial data**  
*Given:* \(f(x)=x(1-x)\) on \([0,1]\).  
*Find:* full series solution.  
Compute
\[
b_n=2\int_0^1 x(1-x)\sin(n\pi x)\,dx= \frac{2(1-(-1)^n)}{n^3\pi^3}.
\]
Insert into the general series of Step 5.  
**Reflection.** The decay rates now differ for each mode; high-frequency components disappear fastest.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting the negative sign on \(\lambda\) | Students treat separation constant as free | Always impose boundedness or the maximum principle to fix the sign. |
| Using cosine series for Dirichlet ends | Confusing boundary conditions with Neumann | Check that \(X(0)=X(L)=0\) forces sine functions. |
| Normalising eigenfunctions incorrectly | Missing factor of \(\sqrt{2/L}\) | Compute the \(L^2\) norm once and reuse the formula. |
| Term-by-term differentiation without justification | Series may converge only pointwise | Verify uniform convergence on compact time intervals away from \(t=0\). |
| Applying separation when boundaries are non-homogeneous | Source term appears after shifting | First subtract a steady-state solution to homogenise. |
| Truncating the series too early for small \(t\) | High modes decay slowly at first | Keep at least \(N\sim L/\sqrt{kt}\) terms for accuracy at time \(t\). |
| Confusing \(k\) with thermal diffusivity units | Dimensional inconsistency | Track units: \(k\) has dimension length²/time. |

## 7. The textbook-precise statement
Let \(k>0\), \(L>0\), and let \(f\in C^2[0,L]\) satisfy \(f(0)=f(L)=0\). The function
\[
u(x,t)=\sum_{n=1}^\infty b_n\sin(n\pi x/L)\exp(-k(n\pi/L)^2 t),\qquad b_n=\frac{2}{L}\int_0^L f(x)\sin(n\pi x/L)\,dx
\]
belongs to \(C^{2,1}((0,L)\times(0,\infty))\), satisfies the heat equation pointwise, the boundary conditions for all \(t>0\), and
\[
\lim_{t\to 0^+}u(x,t)=f(x)
\]
uniformly on \([0,L]\). (Strauss, *Partial Differential Equations*, 2e, §5.3, Theorem 1.)

## 8. Visual — diagram or schematic
```text
x=0                     x=L
 |-----------------------|
 |   sin(πx/L) mode      |   T(t) = exp(−k π² t / L²)
 |   sin(2πx/L) mode     |   T(t) = exp(−k 4π
² t / L
²)
 |   sin(3πx/L) mode     |   ...
 |-----------------------|
t=0   initial f(x)   →   superposition of modes
```
Each horizontal line represents an eigenfunction; vertical arrows indicate exponential decay whose rate increases with mode number.

## 9. The memory technique
1. **The hook** — Picture a guitar string whose fundamental and overtones each cool at their own speed; the separation constant is the musical pitch squared.  
2. **What to overlearn** — The eigenvalues \(\lambda_n=(n\pi/L)^2\), the time factor \(e^{-k\lambda_n t}\), and the sine series formula for \(b_n\).  
3. **Spaced-repetition schedule** — Review the eigenvalue list after 1 day, the full series solution after 3 days, a worked example with non-trivial \(f\) after 7 days, and the convergence justification after 16 and 35 days.  
4. **First-principles fallback** — Re-derive the separated ODEs from \(u=X T\), impose the boundary conditions, and recompute the Fourier coefficients from the inner-product definition.

## 10. What this unlocks
Separation of variables supplies the eigenfunction basis that later appears in the wave equation, Laplace’s equation on rectangles, and the Schrödinger equation on bounded domains. It also furnishes the spectral decomposition needed for Duhamel’s principle when a source term is added.

- Non-homogeneous heat equation via eigenfunction expansion  
- Energy methods and uniqueness proofs  
- Numerical spectral methods (Fourier–Galerkin)  
- Black–Scholes barrier-option formulas  
- Control theory of the heat equation

## 11. Self-check — five questions, no answers
1. For which sign of the separation constant do the spatial solutions remain bounded for all \(t>0\)?  
2. Write the explicit formula for the coefficients \(b_n\) when \(f(x)=x\) on \([0,1]\) and \(L=1\).  
3. Does the series solution remain valid if the initial datum \(f\) is merely continuous but not differentiable?  
4. Identify the step that fails if the boundary conditions are changed to \(u_x(0,t)=u_x(L,t)=0\).  
5. Suppose two different initial functions \(f\) and \(g\) produce identical temperatures at time \(t=1\); must \(f=g\)?