## 1. The one-sentence answer
**Convolution with the Fourier transform converts the convolution of two functions into pointwise multiplication of their Fourier transforms, turning linear constant-coefficient PDEs into algebraic equations in frequency space.**

This property arises because differentiation becomes multiplication by \(i\xi\) under the Fourier transform, while convolution encodes the superposition that solves inhomogeneous equations. In practice, one transforms the PDE, solves the resulting algebraic relation, and returns to physical space via an inverse transform whose kernel is often a convolution. The operation therefore replaces integration against a Green’s function with multiplication followed by inversion.

The same mechanism appears when a linear filter is applied to data: convolution with the impulse response equals multiplication by the transfer function. Because the Fourier transform diagonalizes translation-invariant operators, any PDE whose coefficients are constant inherits this diagonalization.

> [!NOTE]
> The single algebraic step that replaces an integral equation with multiplication is the reason Fourier methods solve the heat, wave, and Poisson equations in unbounded domains in closed form.

## 2. Why this matters — concrete and current
In semiconductor process simulation, Synopsys TCAD tools solve the drift-diffusion equations on wafers by Fourier-transforming the doping profile, multiplying by the screened Coulomb kernel, and inverting; the resulting potential feeds directly into device-characteristic extraction for 3 nm nodes.

NASA’s Landsat and ESA’s Sentinel-2 pipelines remove atmospheric blur from multispectral imagery by estimating the point-spread function, multiplying its Fourier transform by the image spectrum, and inverting—producing the corrected reflectance maps used in climate and agricultural models.

In cryo-electron microscopy, RELION and cryoSPARC reconstruct 3-D molecular densities from thousands of 2-D projections by performing convolution in Fourier space to enforce the common-lines constraint, reducing the computational cost from \(O(N^3)\) real-space operations to \(O(N^2\log N)\) per iteration.

Medical ultrasound manufacturers (Philips, GE) implement beam-forming as a frequency-domain multiplication after the Fourier transform of the received RF signals, allowing real-time aberration correction on portable scanners whose power budget precludes spatial-domain convolution.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Definition of the Fourier transform on \(\mathbb{R}^n\) | Supplies the frequency variable \(\xi\) in which multiplication occurs. |
| Definition of convolution \((f*g)(x)=\int f(y)g(x-y)\,dy\) | The object that becomes a product under the transform. |
| Schwartz space \(\mathcal{S}\) or \(L^1\cap L^2\) | Guarantees that both the transform and its inverse exist as ordinary functions. |
| Plancherel theorem       | Justifies returning to physical space after algebraic manipulation without loss of information. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Convolution as weighted superposition
A linear, translation-invariant operator applied to a source \(f\) produces an output that is the integral of the source values weighted by a fixed kernel \(K\).  
Concrete example: the moving average \( (Kf)(x) = \int_{-1}^{1} \frac12 f(x-y)\,dy \).  
Formal statement:  
\[
(Kf)(x) = (K*f)(x).
\]
> [!WARNING]
> Replacing the kernel by a non-integrable function (e.g., a delta sequence that is not yet a measure) destroys the existence of the integral for merely continuous \(f\).

### Step 2 — Fourier transform of a translated function
Shifting the argument of a function multiplies its transform by a phase factor.  
Formal statement:  
\[
\widehat{f(\cdot - a)}(\xi) = e^{-2\pi i a\cdot\xi}\hat f(\xi).
\]

### Step 3 — Convolution theorem for Schwartz functions
Insert the definition of convolution inside the Fourier integral and interchange the order of integration (justified by Fubini on \(\mathcal{S}\)). The inner integral becomes the phase factor of Step 2.  
Formal statement:  
\[
\widehat{f*g}(\xi) = \hat f(\xi)\,\hat g(\xi).
\]

### Step 4 — Inversion and the Green’s function representation
If the PDE symbol \(P(i\xi)\) never vanishes, the solution is recovered by  
\[
u = \mathcal{F}^{-1}\Bigl(\frac{\hat f(\xi)}{P(i\xi)}\Bigr) = G*f,
\]  
where \(G=\mathcal{F}^{-1}(1/P(i\xi))\) is the fundamental solution. This is the precise link between Fourier multiplication and spatial convolution.

### Step 5 — Extension to tempered distributions
Both sides of the identity extend continuously from \(\mathcal{S}\) to \(\mathcal{S}'\) by duality, allowing the same algebraic manipulation for the Dirac delta, derivatives of the heat kernel, etc.

## 5. Worked examples — every step shown

**Example 1 — Direct verification on Gaussians**  
*Given:* \(f(x)=e^{-\pi x^2}\), \(g(x)=e^{-\pi x^2}\).  
*Find:* \(\widehat{f*g}\).  
Compute \(\hat f(\xi)=e^{-\pi\xi^2}\) by the known Gaussian integral.  
*Why:* The Fourier transform of a Gaussian is itself.  
Then \(f*g = \int e^{-\pi y^2}e^{-\pi(x-y)^2}\,dy = e^{-\pi x^2/2}\sqrt2\) after completing the square.  
*Why:* Quadratic exponent combines linearly.  
Its transform is \(\sqrt2\,e^{-2\pi\xi^2}\).  
On the other side, \(\hat f(\xi)\hat g(\xi)=e^{-2\pi\xi^2}\).  
Multiplying by the constant factor matches after rescaling.  
**Final answer**  
\[
\widehat{f*g}(\xi)=\hat f(\xi)\hat g(\xi).
\]

*Reflection:* The calculation succeeds only because the Gaussian is an eigenfunction of the Fourier transform; the same identity fails for merely integrable functions whose transforms are not functions.

**Example 2 — Heat equation on the line**  
*Given:* \(u_t=u_{xx}\), \(u(x,0)=f(x)\in\mathcal{S}\).  
*Find:* \(u(x,t)\).  
Take Fourier transform in \(x\): \(\partial_t\hat u=-4\pi^2\xi^2\hat u\).  
*Why:* \(\partial_{xx}\) becomes multiplication by \(-4\pi^2\xi^2\).  
Solve the ODE: \(\hat u(\xi,t)=\hat f(\xi)e^{-4\pi^2\xi^2 t}\).  
*Why:* Separation of variables in frequency space.  
Invert: \(u(x,t)=(4\pi t)^{-1/2}e^{-x^2/4t}*f(x)\).  
**Final answer**  
\[
u(x,t)=G_t*f,\qquad G_t(x)=(4\pi t)^{-1/2}\exp(-x^2/4t).
\]

*Reflection:* The exponential decay factor is exactly the Fourier transform of the Gaussian kernel, illustrating Step 4.

**Example 3 — Poisson equation**  
*Given:* \(-\Delta u=\delta\) in \(\mathbb{R}^3\).  
*Find:* fundamental solution.  
Symbol: \(4\pi^2|\xi|^2\hat G=1\), hence \(\hat G=1/(4\pi^2|\xi|^2)\).  
*Why:* Laplacian symbol is \(-4\pi^2|\xi|^2\).  
Inverse Fourier transform yields \(G(x)=-1/(4\pi|x|)\).  
**Final answer**  
\[
G(x)=-\frac1{4\pi|x|}.
\]

*Reflection:* The division is valid only for \(\xi\neq0\); the constant mode is fixed by decay at infinity.

**Example 4 — Product of two box functions**  
*Given:* \(\chi_{[-1,1]}*\chi_{[-1,1]}\).  
*Find:* its Fourier transform.  
Convolution is the trapezoidal function \(\max(2-|x|,0)\).  
Its transform is \(\operatorname{sinc}^2(\xi)\).  
Direct multiplication \(\operatorname{sinc}(\xi)\cdot\operatorname{sinc}(\xi)\) reproduces the same result.  
**Final answer**  
\[
\widehat{\chi*\chi}(\xi)=\operatorname{sinc}^2(\xi).
\]

*Reflection:* The example shows that the theorem survives piecewise-smooth compactly supported functions once they lie in \(L^1\cap L^2\).

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting the \(2\pi\) factors in the definition of \(\mathcal{F}\) | Different conventions place \(2\pi\) in the exponent or in the measure | Fix one convention (e.g., \(\hat f(\xi)=\int f(x)e^{-2\pi ix\cdot\xi}\,dx\)) and keep it throughout the calculation. |
| Dividing by the symbol without checking zeros | The symbol \(P(i\xi)\) may vanish on a set of positive measure | Verify ellipticity or hypoellipticity before inversion; add a small imaginary part and take limits. |
| Applying the theorem to functions outside \(L^1\) | Convolution may exist while the product of transforms does not | Regularize by mollification, pass to the limit in \(\mathcal{S}'\). |
| Interchanging \(\int\int\) without domination | Fubini requires absolute integrability | Use the Schwartz seminorms or dominated convergence on a dense subclass. |
| Ignoring that the inverse transform of a multiplier may be a distribution | Rational symbols produce polynomial growth | Interpret the result in \(\mathcal{S}'\) and test against test functions. |
| Confusing circular convolution (FFT) with linear convolution | Periodic extension introduces wrap-around | Zero-pad to length at least \(2N-1\) before using discrete Fourier transform. |
| Neglecting the constant term when the symbol vanishes at \(\xi=0\) | Compatibility condition \(\int f=0\) is required for solvability | Project \(f\) onto the orthogonal complement of constants before division. |

## 7. The textbook-precise statement
Let \(f,g\in\mathcal{S}(\mathbb{R}^n)\). Then  
\[
\mathcal{F}(f*g)=\mathcal{F}f\cdot\mathcal{F}g
\]  
in the pointwise sense, and the identity extends by continuity to tempered distributions. (See L. C. Evans, *Partial Differential Equations*, 2nd ed., AMS 2010, §4.3, Theorem 3.)

## 8. Visual — diagram or schematic
```text
Physical space                  Frequency space
     f ──┐                        F(f)
         │
         ├──► *  ──convolution───►  ×  ──multiplication──► F(f)·F(g)
         │
     g ──┘                        F(g)

Inverse FT
     G*f  ◄─────────────────────── F^{-1} ◄───────────────────
```
Horizontal arrows labelled “Fourier transform” and “inverse Fourier transform” connect the two columns; the middle row shows the algebraic simplification.

## 9. The memory technique
1. **The hook** — Picture a pair of trumpets: when two notes are played together their Fourier spectra simply multiply, exactly as the air pressure waves convolve in space.
2. **What to overlearn** — The three-line identity \(\widehat{f*g}=\hat f\cdot\hat g\), the heat-kernel multiplier \(e^{-4\pi^2|\xi|^2 t}\), and the fact that \(\mathcal{F}(\partial_j f)=2\pi i\xi_j\hat f\).
3. **Spaced-repetition schedule** — Review the convolution theorem at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.
4. **First-principles fallback** — Re-derive the theorem by writing the double integral for \(\widehat{f*g}\), changing variables \(z=x-y\), and recognizing the separated product of two Fourier integrals.

## 10. What this unlocks
Mastery of the convolution–Fourier link opens every constant-coefficient linear PDE on Euclidean space, the theory of fundamental solutions, and the Fourier analysis of pseudodifferential operators.  
- Next: Green’s functions for the wave and Schrödinger equations.  
- Next: Mikhlin multiplier theorem and \(L^p\) boundedness.  
- Next: Numerical spectral methods (FFT-based Poisson solvers).  
- Next: Microlocal analysis and propagation of singularities.

## 11. Self-check — five questions, no answers
1. Compute \(\widehat{\chi_{[-1,1]}*\chi_{[-1,1]}}\) directly from the definition and verify it equals \(\operatorname{sinc}^2\xi\).

2. Solve \(u_t-u_{xx}=0\) on \(\mathbb{R}\) with initial datum \(u(x,0)=\operatorname{sech}(\pi x)\) by the Fourier method; express the answer as a convolution.

3. Show that if \(P(i\xi)\) vanishes at some \(\xi_0\neq0\), then the constant-coefficient operator \(P(D)\) cannot be invertible on \(\mathcal{S}'\).

4. Let \(f\in L^1(\mathbb{R}^n)\) with \(\hat f\in L^1\). Prove that \(f*g\) is continuous and vanishes at infinity whenever \(g\in L^1\).

5. Identify the precise point in the proof of the convolution theorem where the Schwartz assumption is used and exhibit a pair of \(L^1\) functions for which the identity fails pointwise.