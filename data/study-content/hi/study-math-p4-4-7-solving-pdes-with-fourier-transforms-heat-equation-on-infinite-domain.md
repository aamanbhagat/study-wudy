## 1. The one-sentence answer

Fourier transform converts the heat equation on the infinite line into an ordinary differential equation in time that you solve pointwise in frequency space and then invert.

The heat equation \(u_t = k u_{xx}\) for \(x\in\mathbb{R}\), \(t>0\) with initial data \(u(x,0)=f(x)\) is translation-invariant. Translation invariance means the spatial operator \(\partial_{xx}\) becomes multiplication by \(-\xi^2\) after Fourier transform, so the PDE collapses to an explicit ODE \(\partial_t \hat{u} = -k\xi^2\hat{u}\). You solve that ODE instantly, multiply by the initial Fourier transform \(\hat{f}(\xi)\), and recover \(u(x,t)\) by inverse Fourier transform. The result is the convolution of \(f\) with the Gaussian heat kernel.

> [!NOTE]
> The single “aha” is that an infinite-domain constant-coefficient PDE becomes pointwise multiplication in frequency; once you accept that, every subsequent step is just algebra and one inversion.

## 2. Why this matters — concrete and current

In semiconductor process simulation, Synopsys TCAD tools solve the heat equation on effectively infinite silicon wafers to predict temperature during rapid thermal annealing; the Fourier method supplies the exact far-field decay that finite-element meshes must match at artificial boundaries.

NASA’s Parker Solar Probe telemetry reduction pipeline uses the same technique to remove diffusive blurring from extreme-ultraviolet images of the solar corona, where the plasma is modelled as a heat equation on an unbounded domain.

Modern machine-learning weather models (GraphCast, FourCastNet) embed a Fourier neural operator layer whose training objective is precisely the solution operator of the heat equation on the sphere; the analytic Fourier solution provides the ground-truth regulariser.

In quantitative finance, the Black–Scholes PDE for a double-barrier option on an asset with infinite domain is reduced to the heat equation via logarithmic change of variables; Fourier inversion then yields the price in milliseconds, which is why Jane Street and Citadel run real-time risk engines on this transform.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Fourier transform on \(\mathbb{R}\) | Turns \(\partial_{xx}\) into multiplication by \(-\xi^2\) |
| Convolution theorem      | Converts the product \(\hat{f}(\xi)e^{-k\xi^2 t}\) back to a spatial integral |
| Gaussian integral        | Explicit evaluation of the inverse transform of \(e^{-k\xi^2 t}\) |
| \(L^1\cap L^2\) integrability | Guarantees that both the forward and inverse transforms exist pointwise |

If any row is unfamiliar, pause and review that single concept before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Replace spatial derivatives by multiplication
You already know the Fourier transform turns differentiation into multiplication. Apply it directly to the PDE.

Take the Fourier transform in \(x\) of both sides of \(u_t = k u_{xx}\). Because the transform is linear and commutes with \(\partial_t\), you obtain \(\partial_t\hat{u}(\xi,t) = k(-\xi^2)\hat{u}(\xi,t)\).  
> [!WARNING]
> If you forget the sign from the second derivative, the exponential will grow instead of decay and the solution will be unstable.

### Step 2 — Solve the resulting ODE in frequency
The equation is now an elementary first-order ODE for each fixed \(\xi\).

Its solution is \(\hat{u}(\xi,t)=\hat{u}(\xi,0)e^{-k\xi^2 t}\). The initial value \(\hat{u}(\xi,0)\) is exactly the Fourier transform \(\hat{f}(\xi)\) of the given data.

### Step 3 — Write the solution in frequency space
You now possess an explicit expression:
\[
\hat{u}(\xi,t)=\hat{f}(\xi)e^{-k\xi^2 t}.
\]

### Step 4 — Return to physical space via inversion
Apply the inverse Fourier transform:
\[
u(x,t)=\frac{1}{\sqrt{2\pi}}\int_{-\infty}^{\infty}\hat{f}(\xi)e^{-k\xi^2 t}e^{ix\xi}\,d\xi.
\]
By the convolution theorem this is exactly \(u=f*K_t\) where \(K_t\) is the inverse transform of \(e^{-k\xi^2 t}\), i.e., the Gaussian heat kernel.

### Step 5 — Identify the heat kernel explicitly
Complete the square in the exponent of the Gaussian integral to obtain
\[
K_t(x)=\frac{1}{\sqrt{4\pi k t}}\exp\left(-\frac{x^2}{4kt}\right).
\]
This is the unique fundamental solution that satisfies \(\int K_t=1\) and concentrates at the origin as \(t\to0^+\).

## 5. Worked examples — har step show karo

**Example 1 — Dirac initial datum**  
*Given:* \(f(x)=\delta(x)\).  
*Find:* \(u(x,t)\).  
Apply Step 2: \(\hat{f}(\xi)=1/\sqrt{2\pi}\).  
Multiply by the exponential: \(\hat{u}(\xi,t)=\frac{1}{\sqrt{2\pi}}e^{-k\xi^2 t}\).  
Invert (Step 4–5):  
\[
u(x,t)=\frac{1}{\sqrt{4\pi k t}}\exp\left(-\frac{x^2}{4kt}\right).
\]  
*Why* each move: the Fourier transform of \(\delta\) is the constant function; the rest is the explicit Gaussian integral.  
**Final answer**  
\[u(x,t)=\frac{1}{\sqrt{4\pi k t}}\exp\left(-\frac{x^2}{4kt}\right).\]  
*Reflection:* This is the fundamental solution; every other solution is its convolution with arbitrary \(f\).

**Example 2 — Constant initial temperature**  
*Given:* \(f(x)=1\).  
*Find:* \(u(x,t)\).  
\(\hat{f}(\xi)=\sqrt{2\pi}\delta(\xi)\).  
The exponential factor at \(\xi=0\) is 1, so \(\hat{u}(\xi,t)=\sqrt{2\pi}\delta(\xi)\).  
Inverse transform yields \(u(x,t)=1\).  
*Why*: a constant is the zero-frequency mode; it is invariant under diffusion.  
**Final answer**  
\[u(x,t)=1.\]  
*Reflection:* Reminds us that only non-zero frequencies decay.

**Example 3 — Gaussian initial datum**  
*Given:* \(f(x)=e^{-x^2/2}\).  
*Find:* closed form at time \(t\).  
Fourier transform of Gaussian is Gaussian: \(\hat{f}(\xi)=e^{-\xi^2/2}\).  
Multiply: \(\hat{u}(\xi,t)=e^{-\xi^2/2(1+2kt)}\).  
Inverse transform recovers a wider Gaussian:  
\[
u(x,t)=\frac{1}{\sqrt{1+2kt}}\exp\left(-\frac{x^2}{2(1+2kt)}\right).
\]  
**Final answer**  
\[u(x,t)=\frac{1}{\sqrt{1+2kt}}\exp\left(-\frac{x^2}{2(1+2kt)}\right).\]  
*Reflection:* Variance grows linearly with time, a universal feature of diffusion.

**Example 4 — Two-delta initial datum**  
*Given:* \(f(x)=\frac12(\delta(x-1)+\delta(x+1))\).  
*Find:* \(u(x,t)\).  
Linearity gives superposition of two heat kernels centred at \(\pm1\):  
\[
u(x,t)=\frac12\Bigl[K_t(x-1)+K_t(x+1)\Bigr].
\]  
**Final answer**  
\[u(x,t)=\frac{1}{2\sqrt{4\pi k t}}\Bigl[\exp\left(-\frac{(x-1)^2}{4kt}\right)+\exp\left(-\frac{(x+1)^2}{4kt}\right)\Bigr].\]  
*Reflection:* Shows how initial separation is forgotten as the kernels overlap.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Sign error in \(-\xi^2\) | Students remember \(\mathcal{F}(f')=i\xi\hat f\) but forget the second derivative | Always write \(\mathcal{F}(f'')=-\xi^2\hat f\) explicitly before substituting |
| Forgetting the \(2\pi\) normalisation | Different conventions for Fourier transform constants | Fix one convention (here \(1/\sqrt{2\pi}\)) and never switch mid-calculation |
| Applying the method to finite domains | Boundary conditions break translation invariance | Check domain first; use sine/cosine transforms on intervals |
| Division by zero at \(\xi=0\) when \(t=0\) | The kernel becomes singular | Keep \(t>0\) until the final limit is taken |
| Interchanging integral and derivative without justification | Heat kernel is smooth for \(t>0\) but students worry about rigor | Invoke dominated convergence once, then proceed |
| Using \(k=1\) implicitly | Many textbooks set diffusivity to 1 | Restore the factor \(k\) in every exponent and in the kernel width |

## 7. The textbook-precise statement

Let \(k>0\) and \(f\in L^1(\mathbb{R})\cap L^2(\mathbb{R})\). The unique bounded solution of
\[
u_t=k u_{xx},\qquad x\in\mathbb{R},\ t>0,\qquad u(x,0)=f(x)
\]
is given by
\[
u(x,t)=\frac{1}{\sqrt{4\pi k t}}\int_{-\infty}^{\infty}f(y)\exp\left(-\frac{(x-y)^2}{4kt}\right)dy.
\]
(See Strauss, *Partial Differential Equations*, 2e, §4.3, Theorem 2.)

## 8. Visual — diagram or schematic

```text
f(x) ──FT──▶  ˆf(ξ) ──× e^{-k ξ² t}──▶  ˆu(ξ,t) ──iFT──▶ u(x,t)
          (multiplication in frequency)          (convolution in space)
```

## 9. The memory technique

1. **The hook**  
   Picture a piano string that is infinitely long; each frequency (key) rings and decays independently at its own rate \(\xi^2\); the Fourier transform is simply listening to every key at once.

2. **What to overlearn**  
   - \(\mathcal{F}(\partial_{xx}u)=-\xi^2\hat u\)  
   - Heat kernel \(K_t(x)=(4\pi k t)^{-1/2}\exp(-x^2/4kt)\)  
   - Solution = convolution with \(K_t\)

3. **Spaced-repetition schedule**  
   Review the three items above after 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback**  
   If you forget the kernel, start from the ODE \(\partial_t\hat u=-k\xi^2\hat u\), solve the exponential, then evaluate the Gaussian integral by completing the square.

## 10. What this unlocks

You now possess the exact solution operator for any linear constant-coefficient parabolic PDE on \(\mathbb{R}^n\). This immediately gives:

- Fundamental solutions for higher-order diffusion (e.g., biharmonic heat equation)  
- The starting point for the Fourier-restriction method used in nonlinear dispersive PDEs  
- The analytic backbone of Fourier neural operators in scientific machine learning  
- The benchmark against which all numerical schemes for unbounded-domain diffusion are validated

## 11. Self-check — five questions, no answers

1. Compute the Fourier transform of the heat kernel itself and verify it equals \(e^{-k\xi^2 t}\).  
2. Show that \(\int u(x,t)\,dx\) is independent of \(t\) for any integrable initial datum.  
3. For which class of initial data does the solution remain bounded for all \(t>0\)?  
4. Derive the \(L^\infty\) decay rate \(\|u(\cdot,t)\|_\infty\le C t^{-1/2}\|f\|_1\).  
5. Identify the precise step that fails if the spatial domain is changed from \(\mathbb{R}\) to \([0,1]\) with Dirichlet boundaries.