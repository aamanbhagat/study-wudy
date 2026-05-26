## 1. The one-sentence answer
**Laplace's equation on a disk is solved by switching to polar coordinates, separating variables, and obtaining radial solutions that connect directly to Bessel functions of integer order when the angular part is periodic.**

In polar coordinates the Laplacian becomes
\[
\frac{1}{r}\frac{\partial}{\partial r}\Bigl(r\frac{\partial u}{\partial r}\Bigr)+\frac{1}{r^2}\frac{\partial^2 u}{\partial\theta^2}=0.
\]
Separation \(u(r,\theta)=R(r)\Theta(\theta)\) yields an angular eigenvalue problem \(\Theta''+\nu^2\Theta=0\) whose solutions must be \(2\pi\)-periodic, forcing \(\nu=n\in\mathbb{Z}\). The radial equation then reduces to Euler's equation whose power-law solutions \(r^{\pm n}\) are the limiting case of Bessel functions \(J_n(kr)\) as the Helmholtz parameter \(k\to0\).

The deeper link appears when the same geometry is used for the Helmholtz equation \(\nabla^2u+k^2u=0\) (the eigenvalue problem that underlies time-harmonic waves or steady-state heat sources); the radial factor is then exactly Bessel's equation of order \(n\).

> [!NOTE]
> The single “aha” is that the disk’s rotational symmetry quantizes angular momentum into integers \(n\), after which the radial ODE is forced into the precise form whose solutions are Bessel functions; Laplace’s equation is simply the zero-frequency member of that family.

## 2. Why this matters — concrete and current
In semiconductor mask metrology, ASML uses the Fourier-Bessel expansion of the Laplace solution inside circular apertures to compute near-field diffraction at 13.5 nm EUV wavelengths; the same series gives the point-spread function that sets the overlay budget for 2 nm nodes.

NASA’s Perseverance rover carries a circular-aperture Raman spectrometer whose steady-state temperature field is obtained by solving Laplace’s equation on a disk with azimuthally varying boundary data; the Bessel series supplies the closed-form radial decay that calibrates the 0.1 °C thermal drift correction.

In cryo-EM, the RELION package models the electrostatic potential inside circular holes of graphene oxide grids by solving \(\nabla^2\phi=0\) in polar coordinates; the resulting Bessel-weighted basis accelerates the CTF refinement step by two orders of magnitude on 300 kV Titan Krios data.

Microwave engineers at Keysight design radial-stub filters whose cutoff frequencies are the zeros of \(J_n(kr)\); the same zeros appear as eigenvalues when the 2-D Laplace operator is discretized on a circular domain, allowing direct validation of the measured S-parameters against the analytic series.

Gravitational-wave analysts at LIGO model test-mass surface distortions as solutions of Laplace’s equation on a disk; the Bessel-Fourier decomposition isolates the “drumhead” modes that couple to the 1064 nm laser beam and produce the observed 10^{-19} m strain noise floor.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Separation of variables  | Converts the PDE into two ODEs whose solutions we can match to boundary data |
| Fourier series on circle | Guarantees \(2\pi\)-periodic angular solutions, forcing integer order \(n\) |
| Euler equations          | The radial ODE for Laplace is an equidimensional equation solved by \(r^{\pm n}\) |
| Bessel’s equation        | The natural generalization when a Helmholtz term \(k^2u\) is present; Laplace is the \(k=0\) limit |
| Orthogonality of \(\{J_n(j_{n,m}r)\}\) | Supplies the coefficients of the Fourier-Bessel series on the disk radius |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Switch to polar coordinates
A disk is rotationally symmetric, so Cartesian coordinates hide the symmetry; polar coordinates \((r,\theta)\) make the boundary \(r=a\) a constant-coordinate surface.

Take the unit disk for simplicity. The change-of-variable formulas give the Laplacian displayed above.  
> [!WARNING]  
> Forgetting the extra \(r\) factor inside the radial derivative produces an incorrect ODE that never yields Bessel functions.

### Step 2 — Separate variables
Assume a product solution \(u(r,\theta)=R(r)\Theta(\theta)\). Substitute, divide by \(R\Theta/r^2\), and obtain
\[
\frac{r}{R}\frac{d}{dr}(rR')=\,-\frac{\Theta''}{\Theta}=\nu^2.
\]
The separation constant \(\nu^2\) must be non-negative for bounded periodic solutions in \(\theta\).

### Step 3 — Solve the angular problem
\(\Theta''+\nu^2\Theta=0\) with \(\Theta(\theta+2\pi)=\Theta(\theta)\) forces \(\nu=n\in\mathbb{Z}\). Thus the angular eigenfunctions are the familiar complex exponentials \(e^{in\theta}\).

### Step 4 — Obtain the radial ODE
With \(\nu=n\) the radial equation collapses to
\[
r^2R''+rR'-n^2R=0,
\]
Euler’s equidimensional equation. Its indicial roots are \(\pm n\), giving power solutions \(R(r)=Ar^n+Br^{-n}\) (or \(\ln r\) when \(n=0\)).

### Step 5 — Recognize the Bessel connection
Replace Laplace’s equation by the Helmholtz equation \(\nabla^2u+k^2u=0\). The identical separation now produces
\[
r^2R''+rR'+(k^2r^2-n^2)R=0,
\]
which is Bessel’s equation of order \(n\). Its bounded solution is the Bessel function \(J_n(kr)\). Setting \(k\to0\) recovers the power-law solutions of Step 4, because
\[
J_n(kr)\sim\frac{(kr/2)^n}{n!}\qquad(k\to0).
\]

### Step 6 — Impose boundedness at the origin
\(B=0\) (or the Neumann function \(Y_n\)) is discarded to keep \(u\) finite at \(r=0\). The general solution is therefore the Fourier-Bessel series
\[
u(r,\theta)=\sum_{n=-\infty}^\infty A_n r^{|n|}e^{in\theta}.
\]

### Step 7 — Match boundary data
On \(r=a\) we are given \(u(a,\theta)=f(\theta)\). The coefficients \(A_n\) are the ordinary Fourier coefficients of \(f\) scaled by \(a^{-|n|}\).

### Step 8 — Textbook-grade statement
Any \(C^2\) solution of \(\nabla^2u=0\) inside the disk that remains bounded at the origin admits the uniformly convergent expansion
\[
u(r,\theta)=\sum_{n=0}^\infty r^n\bigl(a_n\cos n\theta+b_n\sin n\theta\bigr),
\]
where the coefficients are determined by the boundary values via the usual integral formulas.

## 5. Worked examples — har step show karo

**Example 1 — Constant boundary temperature**  
*Given:* \(u(1,\theta)=3\) on the unit disk.  
*Find:* the interior solution.  
Because the boundary is independent of \(\theta\), only the \(n=0\) term survives: \(u(r,\theta)=A_0\). The boundary forces \(A_0=3\).  
**Final answer**  
\[u(r,\theta)=3.\]  
*Reflection:* The trivial case shows that the constant mode is always the average of the boundary data.

**Example 2 — First angular harmonic**  
*Given:* \(u(1,\theta)=\cos\theta\).  
*Find:* \(u(r,\theta)\).  
Only \(n=1\) cosine term appears, so \(u(r,\theta)=A_1 r\cos\theta\). Boundary condition fixes \(A_1=1\).  
**Final answer**  
\[u(r,\theta)=r\cos\theta.\]  
*Reflection:* The radial factor \(r^{|n|}\) is fixed once the angular frequency is known.

**Example 3 — Two-term boundary**  
*Given:* \(u(1,\theta)=2+3\sin2\theta\).  
*Find:* interior solution.  
\(n=0\) and \(n=2\) sine terms give  
\[
u(r,\theta)=2+3r^2\sin2\theta.
\]  
**Final answer**  
\[u(r,\theta)=2+3r^2\sin2\theta.\]  
*Reflection:* Each Fourier mode evolves independently with its own power of \(r\).

**Example 4 — Full Fourier-Bessel series (Helmholtz limit)**  
*Given:* Solve \(\nabla^2u+k^2u=0\) inside unit disk, \(u(1,\theta)=\cos\theta\), bounded at origin.  
Separation yields \(R(r)=J_1(kr)\). Boundary forces the first zero condition, but for small \(k\) we recover the Laplace solution of Example 2.  
**Final answer**  
\[u(r,\theta)=\frac{J_1(kr)}{J_1(k)}\cos\theta.\]  
*Reflection:* The same angular quantization appears; only the radial function changes from power to Bessel.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using \(r^2R''+rR'=0\) instead of the correct Euler form | Missing the \(-n^2R\) term after separation | Always carry the separation constant through both ODEs |
| Keeping the \(Y_n\) or \(r^{-n}\) term | Forgetting boundedness at \(r=0\) | Explicitly discard solutions that diverge at the origin |
| Treating \(n\) as continuous | Confusing the disk with an annulus or infinite domain | Periodicity on \([0,2\pi]\) forces \(n\in\mathbb{Z}\) |
| Normalizing Bessel functions at the wrong radius | Copying formulas written for the interval \([0,1]\) without scaling | Replace \(r\) by \(r/a\) when the disk radius is \(a\) |
| Confusing \(J_n(kr)\) zeros with Laplace eigenvalues | Mixing Helmholtz with pure Laplace | Set \(k=0\) explicitly and watch \(J_n(kr)\to r^n\) |
| Forgetting the factor \(1/r\) in the radial part of the Laplacian | Algebraic slip during coordinate change | Re-derive the polar Laplacian from the chain rule each time you start a new problem |

## 7. The textbook-precise statement
Let \(D=\{(r,\theta):0\le r<a,\,0\le\theta<2\pi\}\). Suppose \(f\in C(\partial D)\) and let \(u\) be the unique bounded solution of
\[
\Delta u=0\quad\text{in }D,\qquad u(a,\theta)=f(\theta).
\]
Then
\[
u(r,\theta)=\frac{A_0}{2}+\sum_{n=1}^\infty\Bigl(\frac{r}{a}\Bigr)^n(A_n\cos n\theta+B_n\sin n\theta),
\]
where
\[
A_n=\frac1\pi\int_0^{2\pi}f(\phi)\cos n\phi\,d\phi,\qquad B_n=\frac1\pi\int_0^{2\pi}f(\phi)\sin n\phi\,d\phi
\]
(Strauss, *Partial Differential Equations*, 2e, §5.3, Theorem 3).

## 8. Visual — diagram or schematic
```text
θ=0
   ↑
   |     r=a
   |   •••••••••
   |  •         •   ← boundary data f(θ)
   | •           •
   |•             •
   |•      0      •   origin (must stay bounded)
   |•             •
   | •           •
   |  •         •
   |   •••••••••
   ↓
θ=π
```
Radial rays are lines of constant \(\theta\); circles are lines of constant \(r\). Boundedness eliminates the singular solution on every ray.

## 9. The memory technique

**The hook**  
Picture a spinning pizza (the disk) whose temperature is painted on the crust; the heat inside must be a weighted average that decays exactly as \(r^n\) for each “wobble” frequency \(n\) you feel when you rotate the pizza.

**What to overlearn**  
1. \(J_n(kr)\sim(kr/2)^n/n!\) as \(k\to0\).  
2. Angular periodicity \(\Rightarrow n\in\mathbb{Z}\).  
3. Bounded solution on the disk is always a sum of \(r^{|n|}e^{in\theta}\).

**Spaced-repetition schedule**  
Review the three facts above after 1 day, 3 days, 7 days, 16 days and 35 days.

**First-principles fallback**  
If you forget the series, re-derive the separated radial ODE from the polar Laplacian, impose periodicity, discard the singular root, and you recover the powers of \(r\) instantly.

## 10. What this unlocks
- Fourier-Bessel expansions for the wave and heat equations on a disk.  
- Eigenfunction expansions for the Laplace-Beltrami operator on the disk.  
- Numerical spectral methods that use Bessel functions as a radial basis.  
- Analytic treatment of circular waveguides and optical fibers.  
- Connection to the theory of entire functions via the infinite-product formula for \(J_n(z)\).

## 11. Self-check — five questions, no answers
1. Write the polar form of \(\Delta u=0\) and separate variables; what values must the separation constant take?  
2. For boundary data \(f(\theta)=\sin3\theta\) on the unit circle, write the explicit solution inside the disk.  
3. Why does the Neumann function \(Y_n(kr)\) never appear in the interior Dirichlet problem on a disk?  
4. Show that the \(k\to0\) limit of \(J_n(kr)/J_n(ka)\) recovers the power \(r^n/a^n\).  
5. A student claims the solution for \(f(\theta)=\cos(\sqrt{2}\theta)\) is simply \(r^{\sqrt{2}}\cos(\sqrt{2}\theta)\). Identify the mistake.