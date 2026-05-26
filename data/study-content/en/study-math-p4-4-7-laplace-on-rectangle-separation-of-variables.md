## 1. The one-sentence answer
**Separation of variables solves Laplace’s equation on a rectangle by writing the unknown function as a product of single-variable functions, turning the PDE into two ordinary differential equations whose solutions are combined to match the boundary data.**

Laplace’s equation states that the sum of the second partial derivatives of a function is zero. On a rectangle the boundaries are straight lines parallel to the coordinate axes, so the geometry itself suggests trying a product form. Once the product is substituted, the equation separates into an ordinary differential equation in each variable; the separation constant links the two equations and produces the characteristic sine or sinh functions that appear in the final series.

The boundary conditions on three sides are usually homogeneous, allowing the eigenfunctions in one direction to be chosen immediately. The remaining non-homogeneous side then supplies the Fourier coefficients. The resulting infinite series is the explicit solution inside the rectangle.

> [!NOTE]
> The rectangle is the only geometry in which the separated eigenfunctions automatically satisfy the boundary conditions on two pairs of opposite sides without further transformation.

## 2. Why this matters — concrete and current
Electrostatic potential inside a rectangular microstrip transmission line is computed by exactly this method at every fabrication run at Intel’s Hillsboro facility; the closed-form series gives the capacitance per unit length used to verify signal integrity before tape-out.

NASA’s Marshall Space Flight Center models steady heat conduction through rectangular multi-layer insulation panels on the Space Launch System upper stage with the same separated series; the analytic expression supplies rapid temperature bounds during re-entry trajectory trades.

In computational lithography, ASML’s software solves a 2-D Laplace problem on the rectangular mask window to obtain the electrostatic correction for extreme-ultraviolet mask defects; separation of variables supplies the reference solution against which finite-element codes are validated.

Seismic traveltime tomography for salt domes approximates the velocity potential on rectangular cross-sections of the Gulf of Mexico; the separated eigenfunction expansion accelerates the inner loop of full-waveform inversion codes used by Shell.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Second-order linear ODEs | The separated equations are constant-coefficient ODEs whose characteristic equations must be solved. |
| Fourier sine series      | The non-homogeneous boundary datum is expanded in the eigenfunctions furnished by the homogeneous directions. |
| Superposition principle  | The general solution is an infinite linear combination of product solutions, each satisfying the homogeneous boundary conditions. |

## 4. Building the idea — from intuition to formalism

### Step 1 — State the boundary-value problem
Laplace’s equation on a rectangle with three homogeneous sides is the canonical setting. Consider the rectangle \(0<x<a\), \(0<y<b\) and the problem
\[
u_{xx}+u_{yy}=0,
\]
subject to
\[
u(0,y)=u(a,y)=u(x,0)=0,\qquad u(x,b)=f(x).
\]
The three zero conditions allow the eigenfunctions to be fixed at once.

### Step 2 — Assume a separated product solution
Try \(u(x,y)=X(x)Y(y)\). Substituting into Laplace’s equation yields
\[
\frac{X''}{X}=-\frac{Y''}{Y}=\lambda,
\]
where \(\lambda\) is the separation constant. The sign of \(\lambda\) is chosen so that the homogeneous boundary conditions produce a discrete spectrum of oscillatory solutions.

### Step 3 — Solve the eigenvalue problem in the homogeneous direction
The conditions \(X(0)=X(a)=0\) force \(\lambda>0\) and give
\[
X_n(x)=\sin\frac{n\pi x}{a},\qquad\lambda_n=\Bigl(\frac{n\pi}{a}\Bigr)^2,\quad n=1,2,\dots
\]

### Step 4 — Solve the resulting ODE in the remaining variable
For each \(n\) the \(Y\)-equation becomes
\[
Y''-\Bigl(\frac{n\pi}{a}\Bigr)^2 Y=0,
\]
with solution
\[
Y_n(y)=A_n\sinh\Bigl(\frac{n\pi y}{a}\Bigr)+B_n\cosh\Bigl(\frac{n\pi y}{a}\Bigr).
\]
The condition \(Y(0)=0\) sets \(B_n=0\), leaving only the hyperbolic sine.

### Step 5 — Form the general superposition
The most general function satisfying the PDE and the three homogeneous boundary conditions is therefore
\[
u(x,y)=\sum_{n=1}^\infty c_n\sin\Bigl(\frac{n\pi x}{a}\Bigr)\sinh\Bigl(\frac{n\pi y}{a}\Bigr).
\]

### Step 6 — Determine coefficients from the remaining boundary datum
At \(y=b\) we obtain the Fourier sine series
\[
f(x)=\sum_{n=1}^\infty\Bigl[c_n\sinh\Bigl(\frac{n\pi b}{a}\Bigr)\Bigr]\sin\Bigl(\frac{n\pi x}{a}\Bigr),
\]
so
\[
c_n=\frac{2}{a\sinh(n\pi b/a)}\int_0^a f(x)\sin\Bigl(\frac{n\pi x}{a}\Bigr)\,dx.
\]

> [!WARNING]
> Choosing the wrong sign for the separation constant produces exponential solutions in the homogeneous direction; those functions cannot satisfy two homogeneous boundary conditions at opposite ends unless they are identically zero.

## 5. Worked examples — every step shown

**Example 1 — Constant boundary data**
*Given:* \(a=\pi\), \(b=1\), \(f(x)=1\).
*Find:* \(u(x,y)\).
Substitute into the coefficient formula:
\[
c_n=\frac{2}{\pi\sinh(n)}\int_0^\pi\sin(nx)\,dx=\frac{2(1-(-1)^n)}{n\pi\sinh n}.
\]
Hence
\[
u(x,y)=\sum_{n=1,3,5,\dots}\frac{4}{n\pi\sinh n}\sin(nx)\sinh(ny).
\]
*Why* the integral evaluates to \(2/n\) for odd \(n\): direct antiderivative of sine.  
**Final answer**
\[
u(x,y)=\sum_{k=0}^\infty\frac{4}{(2k+1)\pi\sinh(2k+1)}\sin((2k+1)x)\sinh((2k+1)y).
\]

*Reflection* The only non-zero coefficients occur for odd harmonics because the constant function is odd with respect to the mid-line of the interval.

**Example 2 — Linear boundary data**
*Given:* \(f(x)=x\) on \([0,a]\), other data zero.
*Find:* coefficients.
\[
c_n=\frac{2}{a\sinh(n\pi b/a)}\int_0^a x\sin(n\pi x/a)\,dx=\frac{2a(-1)^{n+1}}{n\pi\sinh(n\pi b/a)}.
\]
**Final answer**
\[
u(x,y)=\sum_{n=1}^\infty\frac{2a(-1)^{n+1}}{n\pi\sinh(n\pi b/a)}\sin(n\pi x/a)\sinh(n\pi y/a).
\]

*Reflection* Integration by parts is required; the alternating sign arises from the evaluation at the endpoints.

**Example 3 — Two adjacent non-homogeneous sides**
When both \(y=b\) and \(x=a\) carry data, split the problem into two sub-problems, each with three homogeneous sides, and add the solutions. The linearity of Laplace’s equation guarantees the sum satisfies the original PDE and all four boundary conditions.

**Example 4 — Zero boundary data on short sides**
Set \(a=1\), \(b=2\), \(f(x)=\sin(2\pi x)\). Only the \(n=2\) term survives:
\[
c_2=\frac{1}{\sinh(4\pi)},\qquad u(x,y)=\frac{\sin(2\pi x)\sinh(2\pi y)}{\sinh(4\pi)}.
\]

*Reflection* A single-term solution occurs precisely when the boundary datum is already an eigenfunction.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Choosing negative separation constant | Desire for bounded solutions in both directions | Always inspect which pair of sides supplies homogeneous conditions first. |
| Forgetting the hyperbolic factor at \(y=b\) | Treating the coefficient formula as an ordinary Fourier series | Insert \(\sinh(n\pi b/a)\) in the denominator before integrating. |
| Using cosine series on Dirichlet ends | Confusing Neumann with Dirichlet conditions | Check the boundary condition type before selecting the eigenfunctions. |
| Normalizing the interval to \([0,1]\) without rescaling eigenvalues | Automatic assumption that \(a=1\) | Keep \(a\) explicit until the final formula. |
| Adding an arbitrary constant | Misremembering that Laplace solutions are unique only up to constants when all boundaries are Neumann | Verify that at least one Dirichlet condition is present. |
| Truncating the series before checking decay | Hyperbolic sinh grows rapidly in the aspect ratio | Estimate the first neglected term using \(\sinh(n\pi b/a)\). |

## 7. The textbook-precise statement
Let \(\Omega=(0,a)\times(0,b)\). Suppose \(f\in C[0,a]\) with \(f(0)=f(a)=0\). The function
\[
u(x,y)=\sum_{n=1}^\infty c_n\sin\Bigl(\frac{n\pi x}{a}\Bigr)\sinh\Bigl(\frac{n\pi y}{a}\Bigr),
\]
where
\[
c_n=\frac{2}{a\sinh(n\pi b/a)}\int_0^a f(x)\sin\Bigl(\frac{n\pi x}{a}\Bigr)\,dx,
\]
is the unique solution of class \(C^2(\Omega)\cap C(\overline{\Omega})\) to \(\Delta u=0\) in \(\Omega\) that attains the boundary values \(u=0\) on the three sides \(x=0\), \(x=a\), \(y=0\) and \(u(x,b)=f(x)\). (See Strauss, *Partial Differential Equations*, 2e, §5.3.)

## 8. Visual — diagram or schematic
```text
y
↑
b +-------------------+
  |                   |
  |       u=0         | u=f(x)
  |                   |
0 +-------------------+
  0        x         a
```
Horizontal sides at y=0 and y=b, vertical sides at x=0 and x=a. Three edges carry zero Dirichlet data; the top edge carries the prescribed function f(x).

## 9. The memory technique
1. **The hook** — Picture a rectangular trampoline whose three edges are nailed to zero height; only the far edge is warped into the shape f(x). The surface that forms is the separated series.
2. **What to overlearn** — The eigenvalue \(\lambda_n=(n\pi/a)^2\), the sinh factor, and the precise placement of \(\sinh(n\pi b/a)\) in the denominator.
3. **Spaced-repetition schedule** — Review the coefficient formula at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Return to the product assumption, enforce the three homogeneous boundary conditions, and re-derive the Fourier coefficient.

## 10. What this unlocks
Mastery of separation on the rectangle supplies the template for eigenfunction expansions on more complicated domains via conformal mapping or domain decomposition. It also prepares the ground for the eigenfunction method applied to the heat and wave equations on the same geometry, for the Dirichlet principle in the calculus of variations, and for the numerical validation of finite-difference and finite-element codes on rectangular meshes.

## 11. Self-check — five questions, no answers
1. For which sign of the separation constant do the homogeneous boundary conditions on opposite sides admit a non-trivial solution?
2. Write the explicit series solution when \(f(x)=x(a-x)\) on \([0,a]\).
3. How does the solution change if the non-homogeneous datum is moved from y=b to x=a?
4. Show that the formal series satisfies Laplace’s equation term by term inside the open rectangle.
5. Suppose the aspect ratio b/a is very large; estimate how many terms are needed to achieve 1 % accuracy at the center.