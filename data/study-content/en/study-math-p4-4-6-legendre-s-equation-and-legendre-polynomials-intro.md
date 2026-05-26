## 1. The one-sentence answer
**Legendre's equation is the second-order linear ODE \((1-x^2)y''-2xy'+n(n+1)y=0\) whose polynomial solutions on \([-1,1]\) are the Legendre polynomials \(P_n(x)\).**

The equation arises whenever a linear PDE with spherical symmetry is reduced by separation of variables. Its regular singular points lie at \(x=\pm1\), the endpoints of the physical interval, so power-series solutions centered at the origin converge inside \((-1,1)\) and must be forced to terminate if they are to remain bounded at the endpoints.

Termination occurs precisely when the separation constant equals \(n(n+1)\) for nonnegative integer \(n\); the resulting finite series are polynomials of exact degree \(n\). These polynomials are orthogonal on \([-1,1]\) with weight 1 and form a complete basis for square-integrable functions on that interval.

> [!NOTE]
> The factor \(n(n+1)\) is not arbitrary: it is the unique value that cancels the highest term in the recurrence, converting an infinite series into a polynomial that stays finite at \(x=\pm1\).

## 2. Why this matters — concrete and current
NASA’s GRACE-FO mission recovers Earth’s gravity field by expanding the potential in Legendre polynomials up to degree 120; each coefficient is fitted to satellite ranging data, yielding monthly mass-change maps at 300 km resolution.

In quantum mechanics the radial Schrödinger equation for the hydrogen atom separates in spherical coordinates and produces Legendre’s equation for the polar factor; the quantum number \(l\) is exactly the degree \(n\) of \(P_n(\cos\theta)\), fixing the allowed angular momenta.

Semiconductor device simulators solve Poisson’s equation inside spherical quantum dots by expanding the electrostatic potential in Legendre series; the resulting matrix elements determine exciton binding energies used by companies such as Intel for nanowire transistor modeling.

Global weather models at ECMWF represent the Coriolis parameter and orographic forcing with spherical-harmonic expansions whose meridional factors are associated Legendre functions; truncation at triangular wavenumber 1279 requires stable evaluation of \(P_n^m(x)\) up to degree 1279.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Power-series method      | The only practical way to solve the equation at an ordinary point |
| Classification of singular points | \(x=\pm1\) are regular singular points; Frobenius theory guarantees at most one bad solution |
| Orthogonality of eigenfunctions | Legendre polynomials are eigenfunctions of a Sturm–Liouville problem on \([-1,1]\) |
| Rodrigues formula (optional preview) | Supplies an explicit closed form once the differential equation is solved |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with Laplace’s equation in spherical coordinates
Plain-English claim: When the electrostatic potential satisfies \(\nabla^2\Phi=0\) and the geometry is a sphere, the angular part of the solution separates into an equation in \(\mu=\cos\theta\).

Example: Assume \(\Phi(r,\theta)=R(r)\Theta(\theta)\). After separation the \(\Theta\) equation reads
\[
\frac{1}{\sin\theta}\frac{d}{d\theta}\Bigl(\sin\theta\frac{d\Theta}{d\theta}\Bigr)+k\Theta=0.
\]
Substitute \(\mu=\cos\theta\), \(y(\mu)=\Theta(\theta)\). The equation becomes
\[
\frac{d}{d\mu}\Bigl((1-\mu^2)\frac{dy}{d\mu}\Bigr)+ky=0,
\]
which expands at once to Legendre’s equation with \(\lambda=k\).

> [!WARNING]
> Forgetting the chain-rule factor when changing from \(\theta\) to \(\mu\) produces an incorrect coefficient \(-2\mu\) instead of the proper \(-2x\).

### Step 2 — Assume a power series centered at the ordinary point \(x=0\)
The point \(x=0\) is ordinary, so a solution of the form \(y=\sum_{m=0}^\infty a_m x^m\) is guaranteed to converge at least for \(|x|<1\).

Inserting the series and its derivatives into
\[
(1-x^2)y''-2xy'+\lambda y=0
\]
and shifting indices yields the recurrence
\[
a_{m+2}=\frac{m(m+1)-\lambda}{(m+1)(m+2)}a_m.
\]

### Step 3 — Identify the termination condition
If \(\lambda=n(n+1)\) for integer \(n\), then for \(m=n\) the numerator vanishes, so \(a_{n+2}=0\) and all higher coefficients vanish. One series therefore terminates, producing a polynomial of degree \(n\).

### Step 4 — Normalize the polynomial
The conventional choice sets \(P_n(1)=1\). This fixes the leading coefficient
\[
a_n=\frac{(2n)!}{2^n(n!)^2}.
\]

### Step 5 — Write the explicit Rodrigues formula
Differentiating \((x^2-1)^n\) exactly \(n\) times and scaling yields the same polynomial:
\[
P_n(x)=\frac{1}{2^n n!}\frac{d^n}{dx^n}(x^2-1)^n.
\]

### Step 6 — Verify orthogonality
Integration by parts on the Sturm–Liouville form shows
\[
\int_{-1}^1 P_m(x)P_n(x)\,dx=\frac{2}{2n+1}\delta_{mn}.
\]

## 5. Worked examples — every step shown

**Example 1 — Recover \(P_2(x)\)**  
*Given:* \(\lambda=6\), series starting with \(a_0=1\).  
*Find:* the polynomial solution normalized so \(P_2(1)=1\).

Assume \(y=\sum a_m x^m\). Recurrence gives
\[
a_2=\frac{0-6}{2\cdot3}a_0=-a_0,\qquad a_4=0.
\]
Thus \(y=a_0(1-3x^2)\).  
*Why* the recurrence is applied directly to the coefficient of \(x^m\).  
Set \(a_0=-1/2\) so that \(y(1)=1\):
\[
P_2(x)=\frac12(3x^2-1).
\]
**Final answer**  
\[ \mathbf{P_2(x)=\frac12(3x^2-1)} \]  
*Reflection:* The only algebraic step that can fail is miscalculating the numerator \(m(m+1)-\lambda\); here \(m=0\) forces termination at degree 2.

**Example 2 — Rodrigues formula for \(n=1\)**  
*Given:* \(n=1\).  
*Find:* \(P_1(x)\).  
Differentiate once:
\[
\frac{d}{dx}(x^2-1)=2x,\qquad P_1(x)=\frac{1}{2\cdot1!}\cdot2x=x.
\]
**Final answer**  
\[ \mathbf{P_1(x)=x} \]  
*Reflection:* The factorial and power of 2 are fixed by the normalization \(P_n(1)=1\).

**Example 3 — Check orthogonality of \(P_0\) and \(P_2\)**  
*Given:* \(P_0=1\), \(P_2=\frac12(3x^2-1)\).  
*Find:* \(\int_{-1}^1 P_0 P_2\,dx\).  
\[
\int_{-1}^1\frac12(3x^2-1)\,dx=\Bigl[\frac12(x^3-x)\Bigr]_{-1}^1=0.
\]
**Final answer**  
\[ \mathbf{0} \]  
*Reflection:* Odd integrand symmetry guarantees the integral vanishes when degrees differ.

**Example 4 — First non-polynomial solution for \(\lambda=2\)**  
*Given:* \(\lambda=2\), second independent solution via reduction of order.  
*Find:* the logarithmic solution.  
Knowing one solution \(y_1=1-x^2\), set \(y_2=v(x)y_1\). The resulting first-order equation for \(v'\) integrates to
\[
v'=\frac{1}{(1-x^2)^2}\implies v=\frac12\Bigl(\frac{x}{1-x^2}+\frac12\ln\Bigl|\frac{1+x}{1-x}\Bigr|\Bigr).
\]
**Final answer**  
\[ \mathbf{y_2(x)=\frac x2(1-x^2)^{-1}+\frac14(1-x^2)^{-1}\ln\Bigl|\frac{1+x}{1-x}\Bigr|} \]  
*Reflection:* The logarithm appears because \(x=\pm1\) are regular singular points; the series solution diverges there.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using \(\lambda=n^2\) instead of \(n(n+1)\) | Confusing the eigenvalue with the separation constant from Laplace in 2-D polar coordinates | Always substitute the separated angular equation into the 3-D Laplacian |
| Forgetting the chain-rule Jacobian when changing \(\theta\to\mu\) | Missing the factor \(\sin\theta\,d\theta=-d\mu\) | Write the Sturm–Liouville form before expanding |
| Normalizing at \(x=0\) instead of \(x=1\) | The constant term is arbitrary until boundary condition is imposed | Enforce \(P_n(1)=1\) after termination |
| Treating both solutions as polynomials | Only one series terminates | Identify the second solution by reduction of order or Frobenius with the larger indicial root |
| Integrating orthogonality weight from 0 to 1 | Symmetry hides the factor of 2 | Always integrate over the full interval \([-1,1]\) |
| Confusing \(P_n\) with associated Legendre functions | Later chapters introduce \(m\neq0\) | Keep \(m=0\) until the associated equation is derived |
| Truncating the recurrence too early | Arithmetic slip in numerator | Compute three consecutive coefficients to verify termination |

## 7. The textbook-precise statement
Legendre’s equation on the interval \((-1,1)\) is the eigenvalue problem
\[
\frac{d}{dx}\Bigl((1-x^2)\frac{dy}{dx}\Bigr)+\lambda y=0,
\]
where the values \(\lambda_n=n(n+1)\) for \(n=0,1,2,\dots\) are the only ones for which a solution remains bounded at both endpoints. The corresponding eigenfunctions, normalized so that \(P_n(1)=1\), are the Legendre polynomials of degree \(n\). (See Boyce & DiPrima, *Elementary Differential Equations*, 11th ed., §5.3.)

## 8. Visual — diagram or schematic
```text
x-axis:  -1 ---------------- 0 ---------------- +1
         |                  |                  |
       reg. sing.       ordinary pt.       reg. sing.
         P_n bounded     series converges   P_n bounded
         only for λ=n(n+1)   for |x|<1       only for λ=n(n+1)
```
The diagram shows the two regular singular points at the endpoints and the ordinary point at the origin where the power series is constructed.

## 9. The memory technique

1. **The hook** — Picture a sphere whose surface is painted with stripes of height exactly \(P_n(\cos\theta)\); the number of nodal circles is exactly \(n\).
2. **What to overlearn** — The eigenvalue \(n(n+1)\), the Rodrigues formula, and the normalization \(P_n(1)=1\).
3. **Spaced-repetition schedule** — Review the recurrence and Rodrigues formula at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the recurrence from the series substitution; termination forces \(\lambda=n(n+1)\).

## 10. What this unlocks
Legendre polynomials supply the angular building blocks for any spherically symmetric linear PDE. They open the door to associated Legendre functions, spherical harmonics, the addition theorem for spherical harmonics, multipole expansions in gravitation and electromagnetism, and the spectral methods used in global climate and ocean models.

- Next concept: associated Legendre equation and functions \(P_n^m(x)\)
- Next theorem: completeness of \(\{P_n\}\) in \(L^2[-1,1]\)
- Next technique: spherical-harmonic transform

## 11. Self-check — five questions, no answers
1. Derive the recurrence relation for the coefficients of Legendre’s equation with general \(\lambda\).
2. Show that \(P_3(x)\) obtained from Rodrigues satisfies \(P_3(1)=1\) and is orthogonal to both \(P_0\) and \(P_1\).
3. For which values of \(\lambda\) does the second linearly independent solution remain bounded on \([-1,1]\)?
4. A numerical quadrature rule uses nodes at the roots of \(P_n(x)\). Why are these nodes guaranteed to lie inside \((-1,1)\)?
5. Suppose you mistakenly used \(\lambda=n^2\). At which step of the recurrence would termination fail, and what singular behavior would appear at \(x=1\)?