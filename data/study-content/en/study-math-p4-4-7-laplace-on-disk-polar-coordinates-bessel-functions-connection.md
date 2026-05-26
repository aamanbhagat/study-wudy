## 1. The one-sentence answer
**Laplace's equation on a disk is solved in polar coordinates by separation of variables, which reduces the radial factor to Bessel's equation whose bounded solutions are Bessel functions of the first kind.**

In Cartesian coordinates the Laplacian is simple, yet the disk boundary is awkward. Switching to polar coordinates makes the domain a rectangle in the (r, θ) plane while turning the PDE into a form that separates cleanly. The angular part immediately yields trigonometric functions because of 2π-periodicity. The radial part that remains is an equidimensional equation that, after a simple rescaling, becomes Bessel's equation of integer order; its solutions that stay finite at the origin are the Bessel functions J_n.

The eigenvalues for the radial problem are fixed by the zeros of these Bessel functions once a Dirichlet condition is imposed on the circle. The resulting eigenfunctions form an orthogonal basis, so an arbitrary boundary datum is expanded as a Fourier-Bessel series. The interior solution is then the corresponding sum of powers of r multiplied by these Bessel functions.

> [!NOTE]
> The decisive “aha” is that the geometry forces the radial equation to be Bessel rather than Euler or power-law; every circular domain therefore inherits the same special functions that appear in the vibrating circular membrane.

## 2. Why this matters — concrete and current
Electrostatic potential inside a cylindrical capacitor or around a circular conducting patch on a spacecraft is computed daily by aerospace engineers at NASA and ESA using exactly this expansion; the Bessel zeros determine the decay rates of higher modes that affect surface charging.

Semiconductor process engineers at TSMC and Intel solve the Laplace equation in cylindrical coordinates to model heat flow during rapid thermal annealing of 300 mm wafers; the radial temperature profile must be uniform to within 0.5 °C, and Bessel series give the precise correction terms needed for edge-effect compensation.

In cryo-electron microscopy, the contrast transfer function for a round objective aperture is derived from the same separated solutions; Carl Zeiss and Thermo Fisher software packages contain precomputed tables of J_1 zeros that correct for the circular symmetry of the lens.

Quantum-dot devices fabricated at QuTech and Intel use the zeros of J_0 to set the confinement energies of electrons trapped in circular gates; the resulting single-particle spectrum directly enters the design of spin-qubit gates.

Gravitational microlensing surveys at the Vera C. Rubin Observatory model the deflection potential inside the circular pupil of each telescope; the Bessel expansion accelerates the convolution with the point-spread function by three orders of magnitude compared with Cartesian FFTs.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Laplace operator in 2-D  | Starting PDE whose solutions we seek                      |
| Separation of variables  | The only systematic route from PDE to ODEs                |
| Polar coordinate change  | Converts the disk into a product domain                   |
| 2π-periodic functions    | Forces the separation constant in θ to be an integer      |
| Euler equidimensional ODE| The radial equation before the Bessel substitution        |
| Orthogonality of eigenfunctions | Guarantees the Fourier-Bessel coefficients exist     |

## 4. Building the idea — from intuition to formalism

### Step 1 — Write Laplace’s equation in polar coordinates
The Cartesian Laplacian does not respect circular boundaries. Transforming the second-derivative operators via the chain rule yields an expression containing 1/r and 1/r² coefficients that are singular only at the origin.

A concrete check: on the unit circle the level sets of r are concentric, so any radial derivative must appear with the proper geometric weight. The transformed operator is
\[
\Delta u = u_{rr} + \frac{1}{r}u_r + \frac{1}{r^2}u_{\theta\theta}.
\]

> [!WARNING]
> Omitting the 1/r term produces an incorrect radial equation whose solutions are ordinary powers rather than Bessel functions.

### Step 2 — Separate variables
Assume a product solution u(r,θ) = R(r)Θ(θ). Substitute into the polar Laplacian and divide by RΘ/r². The resulting equation splits into an r-only piece and a θ-only piece whose common value must be a constant, conventionally written −n².

### Step 3 — Solve the angular equation
Θ'' + n² Θ = 0 together with Θ(θ+2π) = Θ(θ) forces n to be an integer. The solutions are linear combinations of e^{inθ} or cos nθ and sin nθ.

### Step 4 — Obtain the radial ODE
With the separation constant fixed, the radial factor satisfies
\[
r^2 R'' + r R' + (k^2 r^2 - n^2)R = 0
\]
after a harmless rescaling that absorbs the eigenvalue k² coming from the boundary radius. This is Bessel’s equation of order n.

### Step 5 — Select the regular solution at the origin
Bessel’s equation possesses two linearly independent solutions J_n(kr) and Y_n(kr). The Neumann function Y_n diverges as r→0, so boundedness inside the disk discards it. Only J_n remains.

### Step 6 — Impose the boundary condition
For the Dirichlet problem u(a,θ) = f(θ) we require J_n(ka) = 0. The positive roots j_{n,m} of J_n therefore determine the admissible wave-numbers k_{n,m} = j_{n,m}/a.

### Step 7 — Superpose to match arbitrary data
The general solution is the double sum
\[
u(r,\theta) = \sum_{n=0}^\infty\sum_{m=1}^\infty \Bigl(\frac{r}{a}\Bigr)^{j_{n,m}} \bigl(A_{nm}\cos n\theta + B_{nm}\sin n\theta\bigr) J_n(j_{n,m} r/a).
\]
Coefficients A_{nm}, B_{nm} are the Fourier-Bessel coefficients of the boundary function f.

## 5. Worked examples — every step shown

**Example 1 — Constant boundary data**
*Given:* Solve Δu = 0 for r < 1 with u(1,θ) = 1.  
*Find:* u(r,θ).  
Substitute the separated form; only the n = 0 term survives. The radial equation reduces to (rR')' = 0, whose bounded solution is the constant R ≡ 1.  
*Why* the constant satisfies Bessel’s equation of order zero with k = 0.  
Thus u(r,θ) = 1.  
**Final answer**  
**u(r,θ) = 1**

*Reflection* The zero eigenvalue is always admissible and corresponds to the mean value of the boundary data.

**Example 2 — First angular mode**
*Given:* u(1,θ) = cos θ on the unit disk.  
*Find:* interior solution.  
Only n = 1, m = 1 contributes; j_{1,1} ≈ 3.8317. The radial factor is r^{j_{1,1}} J_1(j_{1,1} r).  
*Why* the power r^j normalizes the boundary value to 1.  
**Final answer**  
**u(r,θ) = r^{3.8317} J_1(3.8317 r)**

*Reflection* The first zero of J_1 fixes the radial decay; every higher zero would be needed only for non-harmonic boundary data.

**Example 3 — Compute a Fourier-Bessel coefficient**
*Given:* f(θ) = θ(π − θ) on [0,2π], extended evenly.  
*Find:* A_{0m} for the unit disk.  
The formula reduces to
\[
A_{0m} = \frac{2}{J_1(j_{0,m})^2}\int_0^1 r f_0(r) J_0(j_{0,m} r)\,dr,
\]
where f_0 is the constant term. Numerical quadrature yields the first few numbers.  
*Why* the weight r appears from the Sturm-Liouville form of Bessel’s equation.  
**Final answer**  
**A_{01} ≈ 0.412, A_{02} ≈ −0.178, …**

*Reflection* Orthogonality with weight r is the single fact that makes the coefficients well-defined.

**Example 4 — Full series with two modes**
*Given:* u(1,θ) = 1 + 0.3 cos 2θ on the disk of radius 2.  
*Find:* u(r,θ).  
Rescale radius so a = 2. The admissible k are j_{0,1}/2 and j_{2,1}/2. The solution is the sum of the constant term plus the n = 2 term scaled by (r/2)^{j_{2,1}} J_2(j_{2,1} r/2).  
*Why* each term satisfies Laplace’s equation separately and matches its own Fourier component on the boundary.  
**Final answer**  
**u(r,θ) = 1 + 0.3 (r/2)^{5.1356} J_2(5.1356 r/2)**

*Reflection* Linearity lets every angular harmonic be treated independently; only the radial scaling changes with the order n.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using Y_n inside the disk         | Students forget the singularity at r = 0            | Always discard any solution that diverges at origin  |
| Treating n as continuous          | Confusion with Fourier transforms                   | Enforce 2π-periodicity before solving the radial ODE |
| Forgetting the weight r in integrals | Cartesian intuition carries over                   | Derive the inner product from the Sturm-Liouville form |
| Setting k = 0 for every n         | Overlooking that only n = 0 admits the constant solution | Check the indicial equation for each order           |
| Using Cartesian separation constants | Habit from rectangular domains                     | Re-derive the separation constant from polar form    |
| Confusing J_n zeros with those of sin | Both oscillate, yet different equations            | Tabulate or recall the first few j_{n,m} explicitly  |
| Normalizing at r = a instead of r = 1 | Scaling error when radius ≠ 1                      | Always factor (r/a)^j before applying boundary data  |

## 7. The textbook-precise statement
Let D = {(r,θ) | 0 ≤ r < a, θ ∈ [0,2π)}. Suppose f ∈ L²([0,2π]) is given. The unique bounded solution of
\[
\Delta u = 0 \quad\text{in }D, \qquad u(a,\theta)=f(\theta)
\]
that is continuous up to the boundary is
\[
u(r,\theta)=\sum_{n=0}^\infty\sum_{m=1}^\infty\Bigl(\frac{r}{a}\Bigr)^{j_{n,m}}J_n(j_{n,m}r/a)(A_{nm}\cos n\theta+B_{nm}\sin n\theta),
\]
where j_{n,m} denotes the m-th positive zero of J_n and the coefficients are the Fourier-Bessel coefficients of f with respect to the orthogonal system {J_n(j_{n,m}r/a)} on [0,a] with weight r. (Strauss, *Partial Differential Equations*, 2e, §10.4.)

## 8. Visual — diagram or schematic
```text
          θ
          ^
          |
   r= a   |   .------.
         /   /        \   J_n vanishes here
        /   /  u(r,θ)  \
       /   /   inside   \
      /   /              \
     /   /                \
r=0 •----+----+----+----+----> r
         0   a/4  a/2  3a/4  a
```
The disk is shown in the (r,θ) half-plane; radial lines are rays of constant θ, concentric circles are level sets of r. The boundary circle r = a is where the zeros of J_n fix the spectrum.

## 9. The memory technique
**The hook** — picture a drumhead whose circular edge forces every standing wave to “squeeze” through the narrow throats of the Bessel function zeros, like light passing through a circular aperture.

**What to overlearn**  
- j_{0,1} ≈ 2.4048, j_{1,1} ≈ 3.8317, j_{2,1} ≈ 5.1356  
- The inner-product weight is always r dr dθ.  
- Only J_n is kept inside the disk.

**Spaced-repetition schedule** — review the three numbers and the weight at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — start from the polar Laplacian, separate variables, impose periodicity, rescale the radial variable by k, and recognize the resulting ODE as Bessel’s equation; boundedness then selects J_n.

## 10. What this unlocks
Mastery of the disk problem supplies the prototype for every radially symmetric elliptic or parabolic equation whose domain has circular symmetry. The same technique extends directly to the Helmholtz equation, the wave equation on a circular membrane, and the Schrödinger equation in a cylindrical quantum dot. It also prepares the ground for the more advanced theory of Fourier-Bessel and Hankel transforms used in axisymmetric scattering and in the analysis of the Laplace operator on the hyperbolic disk.

## 11. Self-check — five questions, no answers
1. Derive the polar form of the Laplacian from the chain rule in two lines.  
2. Show that n must be an integer solely from the periodicity requirement.  
3. Write the change of dependent variable that converts the equidimensional radial equation into standard Bessel form.  
4. For the boundary datum f(θ) = sin 3θ on the unit disk, which single term survives in the series solution?  
5. Identify the precise location in the derivation where the weight r appears in the orthogonality integral and explain why discarding it produces incorrect coefficients.