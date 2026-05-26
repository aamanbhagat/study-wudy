## 1. The one-sentence answer
**Separation of variables solves the wave equation by assuming a product solution \(u(x,t)=X(x)T(t)\) that reduces the PDE to two ordinary differential equations whose eigenvalues determine the normal modes.**

The wave equation \(\partial^2u/\partial t^2=c^2\partial^2u/\partial x^2\) describes transverse displacement on a taut string fixed at both ends. The assumption \(u=X(x)T(t)\) is inserted directly into the PDE. After dividing through by the product \(XT\), the left side depends only on \(t\) while the right side depends only on \(x\). Each side must therefore equal the same constant, producing a spatial Sturm–Liouville problem whose eigenfunctions are sines and a temporal oscillator equation whose frequencies are fixed by those eigenvalues.

Superposition of the resulting product solutions then matches arbitrary initial displacement and velocity through Fourier sine series. The method works because the boundary conditions are homogeneous and linear, so the eigenfunctions form a complete orthogonal basis.

> [!NOTE]
> The separation constant must be chosen negative; a positive constant yields exponential growth in time that cannot satisfy fixed-end boundary conditions for all \(t>0\).

## 2. Why this matters — concrete and current
NASA’s Parker Solar Probe records transverse waves on coronal loops whose frequencies are extracted by exactly this separation procedure; the resulting eigenfrequencies constrain models of coronal heating.

In semiconductor manufacturing, ASML’s extreme-ultraviolet lithography scanners model acoustic waves inside the projection optics housing with separated solutions to suppress vibration-induced overlay errors below 1 nm.

Seismologists at the Incorporated Research Institutions for Seismology invert teleseismic waveforms by expanding the displacement field in spherical Bessel and Legendre products obtained from separation in spherical coordinates, yielding three-dimensional Earth velocity models at 1 Hz resolution.

Stringed-instrument makers use modal analysis derived from separation of variables to predict the first twelve partials of a guitar top plate; finite-element codes are calibrated against these analytic frequencies before carbon-fiber layups are cut.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Second-order linear ODEs | The spatial and temporal factors each satisfy constant-coefficient ODEs after separation. |
| Eigenvalue problems      | The fixed-end conditions turn the spatial ODE into a Sturm–Liouville eigenvalue problem whose eigenvalues set the frequencies. |
| Fourier sine series      | Superposition coefficients are the Fourier coefficients of the initial data on the eigenfunctions. |
| Homogeneous linear PDEs  | Only then does a linear combination of product solutions remain a solution. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Write the initial-boundary-value problem
A vibrating string of length \(L\) fixed at both ends obeys the wave equation together with zero Dirichlet conditions and prescribed initial shape and speed.  
Concrete example: \(L= \pi\), \(c=1\), \(u(0,t)=u(\pi,t)=0\), \(u(x,0)=\sin x\), \(\partial u/\partial t(x,0)=0\).  
The formal statement is
$$
\begin{cases}
u_{tt}=c^2u_{xx}, & 0<x<L,\ t>0,\\
u(0,t)=u(L,t)=0,\\
u(x,0)=f(x),\quad u_t(x,0)=g(x).
\end{cases}
$$

> [!WARNING]
> Omitting the boundary conditions leaves the separation constant undetermined; infinitely many solutions exist without them.

### Step 2 — Assume a separated product
Any solution that is a pure tone must factor as a function of \(x\) alone times a function of \(t\) alone. Substituting \(u=X(x)T(t)\) into the PDE produces
$$
\frac{T''}{c^2T}=\frac{X''}{X}=-\lambda.
$$

### Step 3 — Obtain the spatial eigenvalue problem
The boundary conditions force \(X(0)=X(L)=0\), yielding
$$
X''+\lambda X=0,\qquad X(0)=X(L)=0.
$$
Eigenvalues are \(\lambda_n=(n\pi/L)^2\) with eigenfunctions \(X_n=\sin(n\pi x/L)\).

### Step 4 — Solve the temporal oscillator
For each \(\lambda_n\) the time equation is \(T''+c^2\lambda_n T=0\), with solutions \(T_n(t)=A_n\cos(c\sqrt{\lambda_n}t)+B_n\sin(c\sqrt{\lambda_n}t)\).

### Step 5 — Form normal modes
Each pair gives a standing wave
$$
u_n(x,t)=\sin\Bigl(\frac{n\pi x}{L}\Bigr)\bigl(A_n\cos\omega_nt+B_n\sin\omega_nt\bigr),\qquad\omega_n=\frac{n\pi c}{L}.
$$

### Step 6 — Superpose and match data
The general solution is the infinite sum
$$
u(x,t)=\sum_{n=1}^\infty\sin\Bigl(\frac{n\pi x}{L}\Bigr)\bigl(A_n\cos\omega_nt+B_n\sin\omega_nt\bigr).
$$
Coefficients \(A_n\) and \(B_n\) are the Fourier sine coefficients of \(f\) and \(g\).

### Step 7 — Recover the classical d’Alembert solution (optional verification)
When initial velocity vanishes, the series sums to the odd periodic extension of \(f\) evaluated at \(x\pm ct\), confirming consistency.

## 5. Worked examples — every step shown

**Example 1 — Zero initial velocity, single mode**  
*Given:* \(L=\pi\), \(c=1\), \(f(x)=\sin x\), \(g(x)=0\).  
*Find:* \(u(x,t)\).  
Assume \(u=X(x)T(t)\).  
Substitute: \(T''/T=X''/X=-\lambda\).  
Boundary conditions give \(\lambda=1\), \(X=\sin x\).  
Time equation: \(T''+T=0\), so \(T=A\cos t+B\sin t\).  
Initial velocity forces \(B=0\).  
Initial displacement forces \(A=1\).  
**\(u(x,t)=\sin x\cos t\)**  
*Reflection:* The data already matched an eigenfunction, so only one term survives.

**Example 2 — Plucked string, two-term initial shape**  
*Given:* \(L=\pi\), \(c=1\), \(f(x)=x(\pi-x)\), \(g=0\).  
*Find:* \(u(x,t)\).  
Fourier coefficients: \(A_n=2\int_0^\pi x(\pi-x)\sin(nx)\,dx=8/(n^3\pi)\) for \(n\) odd.  
Frequencies \(\omega_n=n\).  
**\(u(x,t)=\sum_{k=0}^\infty\frac{8}{(2k+1)^3\pi}\sin((2k+1)x)\cos((2k+1)t)\)**  
*Reflection:* Even modes vanish by symmetry; decay of coefficients controls smoothness.

**Example 3 — Nonzero initial velocity**  
*Given:* \(f=0\), \(g(x)=\sin(2x)\).  
Only the \(n=2\) sine term appears; \(A_2=0\), \(B_2=1/2\).  
**\(u(x,t)=\frac12\sin(2x)\sin(2t)\)**  
*Reflection:* Velocity projects directly onto the sine coefficients of the \(B_n\) terms.

**Example 4 — General data, numerical truncation**  
*Given:* \(f(x)=x\) on \([0,1]\), \(g(x)=1\), \(L=1\), \(c=1\).  
Compute first five \(A_n=2(-1)^{n+1}/n\), \(B_n=2(1-(-1)^n)/(n^2\pi)\).  
Truncate at \(N=20\) for plotting.  
*Reflection:* Gibbs ringing appears near discontinuities of the odd extension.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Choosing positive separation constant | Forgetting that \(\lambda>0\) produces hyperbolic time solutions incompatible with bounded energy | Always set \(X''/X=-\lambda\) with \(\lambda>0\) to obtain oscillation |
| Forgetting initial velocity       | Assuming rest initial conditions by default | Project both \(f\) and \(g\) onto the sine basis     |
| Normalizing eigenfunctions wrong  | Missing factor of \(\sqrt{2/L}\)            | Keep un-normalized sines and absorb constants into coefficients |
| Sign error in time ODE            | Confusing \(\omega^2=c^2\lambda\)           | Write \(T''+\omega^2 T=0\) immediately after finding \(\lambda\) |
| Applying separation to non-homogeneous BCs | Overlooking that BCs must be homogeneous    | Shift by steady-state solution first                 |
| Truncating series before checking Parseval | Underestimating slow decay of coefficients  | Verify energy convergence before plotting            |
| Treating \(c\) as frequency       | Confusing wave speed with angular frequency | Keep \(\omega_n=n\pi c/L\) explicit                  |

## 7. The textbook-precise statement
Let \(c>0\), \(L>0\), \(f\in C^2[0,L]\) with \(f(0)=f(L)=0\), and \(g\in C^1[0,L]\). The unique \(C^2\) solution of the wave initial-boundary-value problem is given by the uniformly convergent series
$$
u(x,t)=\sum_{n=1}^\infty\Bigl(A_n\cos\frac{n\pi ct}{L}+B_n\sin\frac{n\pi ct}{L}\Bigr)\sin\frac{n\pi x}{L},
$$
where
$$
A_n=\frac{2}{L}\int_0^L f(x)\sin\frac{n\pi x}{L}\,dx,\qquad B_n=\frac{2}{n\pi c}\int_0^L g(x)\sin\frac{n\pi x}{L}\,dx.
$$
(See Strauss, *Partial Differential Equations*, 2e, §5.3, Theorem 1.)

## 8. Visual — diagram or schematic
```text
x=0                     x=L
 |                       |
 |   node   antinode     |
 |    .       .          |   eigenfunction sin(3πx/L)
 |   / \     / \     / \ |
 |__/   \___/   \___/   \|
 t=0          t increasing downward
```
Fixed ends at \(x=0\) and \(x=L\); three half-wavelengths shown; time runs vertically, each horizontal slice is a snapshot of the string.

## 9. The memory technique
1. **The hook** — Picture a guitar string frozen at its first three sine shapes; each shape “rings” at its own frequency like a tuning fork whose pitch is nailed by the number of nodes.  
2. **What to overlearn** — \(\lambda_n=(n\pi/L)^2\), \(\omega_n=n\pi c/L\), and the formulas for \(A_n\), \(B_n\).  
3. **Spaced-repetition schedule** — Review the eigenvalue list at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the two ODEs from \(u=XT\) and re-apply the boundary conditions to recover the sine eigenfunctions.

## 10. What this unlocks
Separation of variables supplies the modal basis required for every linear homogeneous PDE on a rectangle or interval.  
- Heat equation on a rod (exponential decay replaces oscillation)  
- Laplace equation in a rectangle (hyperbolic functions in one direction)  
- Sturm–Liouville theory and orthogonal expansions  
- Finite-element convergence analysis via eigenfunction expansions  
- Control theory of distributed-parameter systems

## 11. Self-check — five questions, no answers
1. For the wave equation on \([0,\pi]\) with \(c=2\), write the frequencies of the first four normal modes.  
2. If the initial displacement is an eigenfunction but the initial velocity is not, which coefficients vanish?  
3. Show that the energy \(\int_0^L(u_t^2+c^2u_x^2)\,dx\) is conserved for any finite sum of separated solutions.  
4. Why does separation fail if the boundary condition at \(x=L\) is \(u_x(L,t)+hu(L,t)=0\) with \(h\neq0\)?  
5. Construct initial data whose solution remains identically zero for \(t< L/(2c)\) yet becomes nonzero afterward.