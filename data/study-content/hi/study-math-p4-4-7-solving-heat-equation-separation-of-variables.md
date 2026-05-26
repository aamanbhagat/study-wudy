## 1. The one-sentence answer
**Separation of variables** solves the heat equation by assuming the solution factors into a product of a purely spatial function and a purely temporal function, converting the PDE into two ordinary eigenvalue problems whose solutions combine into a series.

Aap heat equation \(u_t = \alpha u_{xx}\) ko boundary conditions ke saath solve karna chahte hain. Jab aap \(u(x,t) = X(x)T(t)\) maan lete hain, to derivatives alag ho jaate hain aur equation do independent ODEs mein split ho jaati hai. Ek ODE space mein sine ya cosine modes deta hai, dusra time mein exponential decay. In modes ko linear combination karke initial condition match karte hain.

Yeh approach tab kaam karti hai jab domain rectangular ho aur boundary conditions homogeneous hon. Nonlinear ya time-dependent coefficients wale cases mein yeh seedha apply nahi hota.

> [!NOTE]
> The single deepest insight is that separation converts an infinite-dimensional evolution into a countable set of independent exponential decays, each labelled by its own eigenvalue; the full solution is just the superposition of these decaying modes.

## 2. Why this matters — concrete and current
In semiconductor manufacturing, ASML uses finite-difference and spectral solvers based on separation of variables to predict temperature profiles inside EUV lithography lenses; even a 0.1 K drift ruins overlay accuracy at 3 nm nodes.

NASA’s Parker Solar Probe mission models heat transport through the spacecraft’s carbon-composite heat shield with exactly this technique; the radial heat equation is solved in spherical coordinates to size the shield thickness before each close solar approach.

In machine-learning hardware, Google’s TPU v4 pods simulate on-chip thermal transients during training workloads; separation of variables supplies the eigenmode library that accelerates the online thermal controller running at 10 kHz.

Biological tissue engineering companies such as Organovo employ the same method to design perfusion bioreactors; oxygen diffusion and heat removal inside printed cell scaffolds are optimised by matching the first three eigenmodes to cell-viability thresholds.

Seismology groups at Caltech routinely separate the heat equation on fault gouge layers to estimate frictional heating after an earthquake; the resulting temperature histories constrain constitutive laws used in rupture simulations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Second-order linear ODE eigenvalue problems | The spatial part \(X'' + \lambda X = 0\) is exactly this; you must already know how to obtain eigenfunctions and eigenvalues under homogeneous BCs. |
| Fourier sine/cosine series | The separated spatial modes form an orthogonal basis; you expand the initial data in that basis. |
| Superposition principle for linear homogeneous PDEs | Once you have individual solutions \(X_n(x)T_n(t)\), any linear combination is also a solution. |
| Uniform convergence of series of exponentials | You need to justify term-by-term differentiation when you verify that the series solves the PDE. |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Assume a product solution
Aap maan lete hain ki temperature field space aur time ka product ban sakta hai. Yeh assumption tab valid hoti hai jab equation aur boundary conditions dono separable hon.

Concrete example: rod ke dono ends zero temperature par rakhe hain. Agar \(u(x,t) = X(x)T(t)\) try karte hain to boundary conditions \(X(0)T(t) = 0\) aur \(X(L)T(t) = 0\) turant \(X(0) = X(L) = 0\) par reduce ho jaate hain.

Formal statement: Let \(u(x,t) = X(x)T(t)\). Substitute into \(u_t = \alpha u_{xx}\) to obtain
\[
\frac{T'}{\alpha T} = \frac{X''}{X} = -\lambda.
\]

> [!WARNING]
> Agar boundary conditions non-homogeneous hon (jaise ek end fixed temperature), to yeh product form directly nahi chalega; pehle steady-state subtract karna padega.

### Step 2 — Obtain the spatial eigenvalue problem
Space part ek Sturm–Liouville problem ban jaata hai. Isse eigenvalues \(\lambda_n\) aur eigenfunctions \(X_n(x)\) milte hain jo orthogonality satisfy karte hain.

Example: \(X'' + \lambda X = 0\), \(X(0) = X(L) = 0\) gives
\[
\lambda_n = \left(\frac{n\pi}{L}\right)^2, \quad X_n(x) = \sin\left(\frac{n\pi x}{L}\right), \quad n = 1,2,3,\dots
\]

> [!WARNING]
> Zero eigenvalue ya negative eigenvalues discard karna bhool jaane se trivial ya exponentially growing solutions aa sakte hain jo physics ke against hain.

### Step 3 — Solve the temporal ODE for each eigenvalue
Har \(\lambda_n\) ke liye time equation \(T' + \alpha\lambda_n T = 0\) hota hai. Solution exponential decay hai.

Formal: \(T_n(t) = c_n\exp(-\alpha\lambda_n t)\).

### Step 4 — Form the separated solutions and superpose
Har pair \((X_n,T_n)\) ek valid solution deta hai. Linear superposition se general solution
\[
u(x,t) = \sum_{n=1}^\infty b_n\sin\left(\frac{n\pi x}{L}\right)\exp\left(-\alpha\left(\frac{n\pi}{L}\right)^2 t\right)
\]
milta hai.

### Step 5 — Match the initial condition via Fourier coefficients
\(t=0\) par series \(f(x)\) ke Fourier sine coefficients ban jaati hai:
\[
b_n = \frac{2}{L}\int_0^L f(x)\sin\left(\frac{n\pi x}{L}\right)\,dx.
\]

### Step 6 — Verify the series solution satisfies the PDE and BCs
Term-by-term differentiation justify karne ke liye uniform convergence aur Weierstrass M-test use karte hain. Yeh step textbook rigour ke liye zaroori hai.

## 5. Worked examples — har step show karo

**Example 1 — Zero initial temperature except a single sine mode**
- *Given:* \(u_t = u_{xx}\), \(0<x<\pi\), \(u(0,t)=u(\pi,t)=0\), \(u(x,0)=\sin x\).
- *Find:* \(u(x,t)\).

Pehle separation: \(X'' + \lambda X = 0\), \(X(0)=X(\pi)=0\) \(\Rightarrow\) \(\lambda=1\), \(X=\sin x\).

Time: \(T' + \lambda T = 0\) \(\Rightarrow\) \(T(t) = c e^{-t}\).

Initial condition already matches mode, isliye \(b_1=1\).

**Final answer**
\[u(x,t)=\sin x\,e^{-t}\]

*Reflection:* Single-mode case trivial lagta hai lekin yeh verify karta hai ki exponential decay rate exactly eigenvalue ke barabar hoti hai.

**Example 2 — Uniform initial temperature**
- *Given:* Same PDE and BCs, \(u(x,0)=1\).
- *Find:* \(u(x,t)\).

Fourier coefficients:
\[
b_n = \frac{2}{\pi}\int_0^\pi 1\cdot\sin(nx)\,dx = \frac{2}{n\pi}(1-(-1)^n).
\]
Sirf odd \(n\) survive karte hain.

**Final answer**
\[u(x,t)=\sum_{k=0}^\infty\frac{4}{(2k+1)\pi}\sin((2k+1)x)\exp(-(2k+1)^2 t)\]

*Reflection:* Even modes zero kyunki initial data odd function hai; yeh symmetry check ka classic example hai.

**Example 3 — Two-term initial data with different diffusivities**
- *Given:* \(u_t = 4u_{xx}\), \(0<x<1\), \(u(0,t)=u(1,t)=0\), \(u(x,0)=3\sin(\pi x)+5\sin(3\pi x)\).

Pehle \(\alpha=4\) note karo. Eigenvalues \(\lambda_n=(n\pi)^2\).

Decay rates: \(4\pi^2\) aur \(36\pi^2\).

**Final answer**
\[u(x,t)=3\sin(\pi x)e^{-4\pi^2 t}+5\sin(3\pi x)e^{-36\pi^2 t}\]

*Reflection:* Diffusivity \(\alpha\) har term ke exponent mein multiply hoti hai; isliye higher modes aur bhi tez decay karte hain.

**Example 4 — Non-integer length with numerical coefficients**
- *Given:* \(u_t = u_{xx}\), \(0<x=1.5\), \(u(0,t)=u(1.5,t)=0\), \(u(x,0)=x(1.5-x)\).

L=1.5, \(\lambda_n=(n\pi/1.5)^2\).

Compute integrals for \(b_n\).

**Final answer**
\[u(x,t)=\sum_{n=1}^\infty b_n\sin\left(\frac{n\pi x}{1.5}\right)\exp\left(-\left(\frac{n\pi}{1.5}\right)^2 t\right),\quad b_n=\frac{2}{1.5}\int_0^{1.5}x(1.5-x)\sin\left(\frac{n\pi x}{1.5}\right)dx\]

*Reflection:* Length change sirf scaling factor daalta hai; numerical quadrature ya closed-form integration dono chalte hain.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to subtract steady-state when BCs are non-homogeneous | Student directly applies separation on inhomogeneous data | Always reduce to homogeneous BCs by subtracting the steady solution first |
| Using cosine series for Dirichlet conditions | Confusion between sine and cosine eigenfunctions | Check boundary conditions: Dirichlet zero \(\Rightarrow\) sine series |
| Keeping the \(\lambda=0\) term | Zero eigenvalue satisfies ODE but usually violates BCs | Explicitly test \(\lambda=0\) against both BCs and discard if needed |
| Term-by-term differentiation without justification | Series of derivatives may not converge uniformly | Invoke Weierstrass M-test or cite theorem before differentiating |
| Sign error in exponent | Writing \(e^{+\alpha\lambda t}\) instead of decay | Remember heat equation dissipates energy, so exponent must be negative |

## 7. The textbook-precise statement
Let \(\Omega=(0,L)\). Consider the initial-boundary-value problem
\[
u_t=\alpha u_{xx},\quad x\in\Omega,\ t>0,
\]
\[
u(0,t)=u(L,t)=0,\quad t>0,
\]
\[
u(x,0)=f(x),\quad x\in\Omega,
\]
where \(f\in L^2(\Omega)\). The functions
\[
u_n(x,t)=\sin\left(\frac{n\pi x}{L}\right)\exp\left(-\alpha\left(\frac{n\pi}{L}\right)^2 t\right)
\]
each satisfy the PDE and homogeneous boundary conditions. The series
\[
u(x,t)=\sum_{n=1}^\infty b_n u_n(x,t),\qquad b_n=\frac{2}{L}\int_0^L f(x)\sin\left(\frac{n\pi x}{L}\right)dx
\]
converges uniformly on \([\delta,L-\delta]\times[0,\infty)\) for any \(\delta>0\) and solves the IBVP in the classical sense provided \(f\) is continuous and compatible with the boundary data (Strauss, *Partial Differential Equations*, 2e, §5.3).

## 8. Visual — diagram or schematic
```text
x=0 (T=0) ---------------- x=L (T=0)
          |   sin(πx/L) mode   |
          |   sin(2πx/L) mode  |
          |   sin(3πx/L) mode  |
          v   time → decaying exponentials
```
Each horizontal line represents one spatial eigenfunction; vertical arrows indicate exponential decay whose rate grows with \(n^2\).

## 9. The memory technique
1. **The hook** — Picture a guitar string fixed at both ends; each harmonic decays at its own speed exactly like the heat modes.
2. **What to overlearn** — The eigenvalue formula \(\lambda_n=(n\pi/L)^2\) and the fact that time dependence is always \(e^{-\alpha\lambda_n t}\).
3. **Spaced-repetition schedule** — Review the five-step derivation at 1 day, 3 days, 7 days, 16 days and 35 days after first study.
4. **First-principles fallback** — Agar formula bhool jaayein to \(u=X(x)T(t)\) se shuru karo, \(\frac{T'}{\alpha T}=\frac{X''}{X}\) likho aur boundary conditions se \(\lambda\) nikaalo.

## 10. What this unlocks
Separation of variables the foundation hai for eigenfunction expansions in every linear evolution PDE. Next aap wave equation, Schrödinger equation, Laplace equation in cylinders, aur numerical spectral methods padh sakte hain.

- Non-homogeneous heat equation via Duhamel’s principle
- Sturm–Liouville theory for variable coefficients
- Fourier–Bessel series for radial heat flow
- Stability analysis of explicit finite-difference schemes

## 11. Self-check — five questions, no answers
1. For the heat equation on \([0,\pi]\) with zero Dirichlet ends, what is the decay rate of the \(n=5\) mode when \(\alpha=2\)?

2. Why does the solution instantly become infinitely smooth for any \(t>0\) even if \(f(x)\) is only continuous?

3. A student writes \(u(x,t)=\sum b_n\cos(n\pi x/L)e^{-\alpha\lambda_n t}\). Which boundary condition is violated?

4. Derive the \(L^2\) energy decay law \(\frac{d}{dt}\|u(\cdot,t)\|^2=-2\alpha\|u_x\|^2\) directly from the separated series.

5. Suppose the initial datum is an eigenfunction plus a small perturbation; how does the long-time behaviour compare with the pure eigenfunction case?