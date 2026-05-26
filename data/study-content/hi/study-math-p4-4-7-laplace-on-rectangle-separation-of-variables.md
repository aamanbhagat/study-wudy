## 1. The one-sentence answer
**Separation of variables on a rectangle solves Laplace’s equation by writing the unknown function as a product of single-variable functions, turning the PDE into two ordinary eigenvalue problems whose solutions combine into a Fourier series.**

Laplace equation \(\nabla^2 u = 0\) describes steady-state temperature, electrostatic potential, or incompressible flow. On a rectangle the boundary conditions are given on four straight sides. Because the domain and the operator separate in Cartesian coordinates, you can assume \(u(x,y) = X(x)Y(y)\). Substituting produces two constant-coefficient ODEs linked by a separation constant that must be an eigenvalue to satisfy the homogeneous boundary conditions.

The non-homogeneous side then supplies the Fourier coefficients. The final solution is an infinite series of products of sines (or sinh functions) whose coefficients are fixed by the boundary data. This works only when at least three sides are homogeneous; otherwise a different splitting or superposition is required.

> [!NOTE]
> The single deepest insight is that the geometry forces the separation constant to be negative on the homogeneous directions, automatically producing the oscillatory eigenfunctions that become the Fourier basis.

## 2. Why this matters — concrete and current
Electrostatic design of MEMS capacitors at STMicroelectronics uses the same rectangular Laplace solver to compute fringing fields before lithography masks are cut.  

NASA’s Marshall Space Flight Center models thermal equilibrium inside satellite avionics boxes whose cross-sections are rectangles; the series solution gives the exact temperature at every solder joint without meshing.  

In semiconductor process simulation, Synopsys TCAD solves Laplace’s equation on rectangular interconnect cross-sections to extract parasitic capacitance; the analytic series serves as the benchmark against which finite-element codes are validated.  

Fluid-dynamicists studying low-Reynolds-number flow past a rectangular obstacle in a Hele-Shaw cell reduce the pressure to a Laplace problem whose Fourier solution yields the lift and drag coefficients used in microfluidic pump design.  

Climate physicists at GFDL still employ separation-of-variables benchmarks on rectangular atmospheric slices to verify that their global spectral models conserve energy when orography is absent.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Second-order linear ODE eigenvalue problems | The separated equations are Sturm–Liouville problems whose eigenvalues label the Fourier modes. |
| Fourier sine series on an interval | The non-homogeneous boundary datum is expanded in the eigenfunctions obtained from the homogeneous directions. |
| Superposition for linear homogeneous PDEs | Each term \(X_n(x)Y_n(y)\) satisfies the PDE and three homogeneous BCs; the infinite sum satisfies the fourth. |
| sinh and sin identities | The hyperbolic functions arise naturally once the separation constant is fixed by homogeneous boundaries. |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Write the boundary-value problem exactly
State the rectangle \(0 < x < a\), \(0 < y < b\) together with the four boundary conditions. Three must be homogeneous for the method to close.  
Example: \(u(0,y)=0\), \(u(a,y)=0\), \(u(x,0)=0\), \(u(x,b)=f(x)\).  
Formal statement:  
\[
u_{xx}+u_{yy}=0,\qquad u(0,y)=u(a,y)=u(x,0)=0,\quad u(x,b)=f(x).
\]
> [!WARNING]
> If you place the non-homogeneous condition on a side that forces the separation constant positive, you obtain exponential growth instead of bounded trigonometric functions and the series diverges.

### Step 2 — Assume product solution and separate
Set \(u(x,y)=X(x)Y(y)\). Substitute, divide by \(XY\), and obtain  
\[
\frac{X''}{X}=-\frac{Y''}{Y}=\lambda.
\]
The sign of \(\lambda\) is chosen so that the homogeneous directions produce eigenvalues.  
Formal: \(\lambda>0\) yields \(X''+\lambda X=0\) with \(X(0)=X(a)=0\).

### Step 3 — Solve the Sturm–Liouville problem
The spatial eigenvalue problem on the homogeneous interval gives  
\[
\lambda_n=\Bigl(\frac{n\pi}{a}\Bigr)^2,\qquad X_n(x)=\sin\Bigl(\frac{n\pi x}{a}\Bigr),\quad n=1,2,\dots
\]
> [!WARNING]
> Forgetting the zero eigenvalue or allowing \(n=0\) produces the trivial solution and loses the constant term that may be required by compatibility.

### Step 4 — Solve the remaining ODE with the correct sign
Now \(Y''-\lambda_n Y=0\), so  
\[
Y_n(y)=A_n\cosh(k_ny)+B_n\sinh(k_ny),\quad k_n=n\pi/a.
\]
Apply the remaining homogeneous condition \(Y(0)=0\) to kill the cosh term.

### Step 5 — Superpose and match the last boundary
Write  
\[
u(x,y)=\sum_{n=1}^\infty c_n\sin(k_n x)\sinh(k_n y).
\]
At \(y=b\) the Fourier sine coefficients of \(f(x)\) fix  
\[
c_n=\frac{2}{a\sinh(k_n b)}\int_0^a f(x)\sin(k_n x)\,dx.
\]

### Step 6 — Verify uniform convergence on compact subsets
Because \(\sinh(k_ny)/\sinh(k_nb)\) decays exponentially for \(y<b\), the series converges uniformly on any \([0,a]\times[0,b-\delta]\), justifying term-by-term differentiation.

## 5. Worked examples — har step show karo

**Example 1 — Zero on three sides, sine on top**  
*Given:* \(a=\pi\), \(b=1\), \(f(x)=\sin x\).  
*Find:* \(u(x,y)\).  
Assume \(u=X(x)Y(y)\). Separation yields \(\lambda=1\), \(X=\sin x\).  
Then \(Y''-Y=0\), \(Y(0)=0\) forces \(Y=A\sinh y\).  
Coefficient matching at \(y=1\) gives \(A=1\).  
**Final answer**  
\[u(x,y)=\sin x\cdot\sinh y.\]  
*Reflection:* The single-term datum produced a closed form; the same procedure scales to any \(f\) whose sine series is known.

**Example 2 — Square plate, linear boundary data**  
*Given:* \(a=b=\pi\), \(f(x)=x(\pi-x)\).  
*Find:* series solution.  
Eigenvalues \(\lambda_n=n^2\), \(X_n=\sin(nx)\).  
Fourier coefficients of \(f\) are \(b_n=2(1-(-1)^n)/n^3\).  
Thus  
\[u(x,y)=\sum_{n=1}^\infty\frac{2(1-(-1)^n)}{n^3}\frac{\sinh(ny)}{\sinh(n\pi)}\sin(nx).\]  
*Reflection:* Odd extension of the quadratic produces only odd \(n\); symmetry halves the work.

**Example 3 — Non-homogeneous side at \(x=a\)**  
*Given:* homogeneous conditions on \(x=0\), \(y=0\), \(y=b\).  
*Find:* correct separation direction.  
Separate as \(u=X(x)Y(y)\) with \(\lambda\) negative in \(y\) so that \(Y\) oscillates.  
Resulting series uses \(\sinh(k_m x)\) with \(k_m=m\pi/b\).

**Example 4 — Two adjacent non-homogeneous sides**  
*Given:* \(u(x,0)=f(x)\), \(u(0,y)=g(y)\), other sides zero.  
*Find:* split \(u=v+w\). Solve two separate problems, each with one non-homogeneous side, then add.  
*Reflection:* Linearity rescues the method when more than one side is excited.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Choosing the wrong sign for \(\lambda\) | Student forgets which directions are homogeneous | Always assign negative sign to homogeneous directions first |
| Including \(n=0\) term            | Zero eigenvalue satisfies BCs but gives trivial solution | Check that \(\int f\sin(0\cdot x)dx=0\) forces coefficient zero |
| Forgetting to normalise sinh at the far boundary | Series does not recover \(f(x)\) at \(y=b\) | Always divide by \(\sinh(k_nb)\) |
| Applying separation when two adjacent sides are non-homogeneous | Product solution cannot satisfy two independent data | Superpose two single-boundary solutions |
| Term-by-term differentiation at the boundary | Series converges slowly near corners | Differentiate only inside the open rectangle |
| Using cosine series on Dirichlet ends | Wrong eigenfunctions for zero boundary values | Match the BC type: sine for Dirichlet, cosine for Neumann |

## 7. The textbook-precise statement
Let \(\Omega=(0,a)\times(0,b)\). Consider  
\[
\Delta u=0\text{ in }\Omega,\qquad u=0\text{ on }\partial\Omega\setminus\{y=b\},\qquad u(x,b)=f(x),
\]  
where \(f\in L^2(0,a)\). The unique bounded solution is given by the series in Step 5 above. (Strauss, *Partial Differential Equations: An Introduction*, 2e, §5.3, Theorem 2.)

## 8. Visual — diagram or schematic
```text
y=b  +------------------+  u(x,b)=f(x)
     |                  |
     |                  |
     |                  |
y=0  +------------------+  u(x,0)=0
     0        x=a
```
Left side: \(u(0,y)=0\); right side: \(u(a,y)=0\).

## 9. The memory technique
1. **The hook** — Picture a rectangular metal plate clamped at three edges and heated along the fourth; the temperature “fingers” that reach inward are exactly the separated sinh-sine products.  
2. **What to overlearn** — The eigenvalue formula \(k_n=n\pi/a\) and the normalisation factor \(1/\sinh(k_nb)\).  
3. **Spaced-repetition schedule** — Review the six-step derivation at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — If the coefficient formula is forgotten, re-derive it by evaluating the series at \(y=b\) and invoking orthogonality of \(\{\sin(n\pi x/a)\}\) on \([0,a]\).

## 10. What this unlocks
Mastery here lets you attack Poisson equation with eigenfunction expansion, move to disks via polar separation, and understand the finite Fourier transform used in spectral methods for CFD.  

- Heat equation on rectangle with time-dependent boundaries  
- Eigenfunction expansion for non-homogeneous PDEs  
- Numerical validation of finite-difference Laplace solvers  
- Conformal-mapping techniques that preserve rectangular geometry

## 11. Self-check — five questions, no answers
1. On a rectangle with Neumann conditions on all four sides, what compatibility condition must the boundary data satisfy for a solution to exist?  
2. Write the explicit series when the non-homogeneous datum is placed on the vertical side instead of the horizontal side.  
3. Show that the formal series satisfies \(\Delta u=0\) term by term inside the open rectangle.  
4. Why does uniform convergence fail at the two corners where the non-homogeneous side meets the homogeneous sides?  
5. Derive the decay rate of the coefficients \(c_n\) when \(f\) is merely continuous but not differentiable.