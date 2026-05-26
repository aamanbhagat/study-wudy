## 1. The one-sentence answer
**The Fourier transform converts the heat equation on the infinite line into an elementary ODE in the frequency variable whose solution, after inversion, yields the temperature distribution as a convolution against the Gaussian heat kernel.**

The heat equation \(u_t = k u_{xx}\) on \(x\in\mathbb{R}\) describes diffusion without boundaries. Its second spatial derivative becomes multiplication by \(-\xi^2\) once the Fourier transform in \(x\) is taken, turning the PDE into the ODE \(\partial_t\hat{u} = -k\xi^2\hat{u}\). Solving that ODE produces an exponential decay factor whose inverse Fourier transform is exactly the Gaussian kernel; convolution with the initial data then gives the solution at any later time.

This procedure works because the Fourier transform diagonalizes constant-coefficient linear differential operators. On an infinite domain there are no boundary terms to complicate integration by parts, so the transform is an exact isomorphism between the original PDE and a family of independent scalar ODEs indexed by frequency.

> [!NOTE]
> The Gaussian never becomes negative and integrates to one for every \(t>0\); this single fact simultaneously encodes conservation of heat, infinite propagation speed, and instantaneous smoothing of any integrable initial datum.

## 2. Why this matters — concrete and current
In semiconductor process modeling, Synopsys TCAD and Ansys employ the same Fourier-derived Gaussian kernel (or its numerical analogues) to predict rapid thermal annealing of dopant profiles across 300 mm wafers; the infinite-domain idealization supplies the leading-order analytic check before finite-element correction for wafer edges.

NASA’s Mars Climate Sounder and terrestrial re-entry vehicle heat-shield design codes solve the one-dimensional heat equation on semi-infinite domains with Fourier methods to obtain closed-form surface-temperature histories under time-varying aerothermal loads, thereby calibrating material ablation rates without meshing the entire vehicle.

In quantitative finance the Black–Scholes PDE for a European call reduces, after the usual log-price change of variables, to the heat equation on \(\mathbb{R}\). The Fourier-transform solution supplies the characteristic function used by every major bank’s volatility-surface calibration engine (e.g., Bloomberg’s OVML) to price vanillas in milliseconds.

Seismic migration codes at CGG and Schlumberger apply the identical transform technique to the acoustic wave equation in laterally infinite layers; the resulting phase-shift operators are the direct descendants of the Gaussian multiplier derived below and remain the workhorse for pre-stack depth imaging of subsalt reservoirs.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Fourier transform on \(\mathbb{R}\) and its inversion formula | Converts \(u_{xx}\) into multiplication by \(-\xi^2\) and recovers \(u\) from \(\hat{u}\) |
| \(L^1\) and \(L^2\) integrability plus dominated convergence | Justifies differentiation under the integral sign and passage to the limit \(t\to0^+\) |
| Convolution theorem            | Expresses the inverse transform of a product as the desired convolution with the heat kernel |
| Elementary ODE theory for linear first-order equations | Solves the transformed equation \(\partial_t\hat{u}=-k\xi^2\hat{u}\) explicitly |

## 4. Building the idea — from intuition to formalism

### Step 1 — Replace the spatial derivative by multiplication
Differentiation in \(x\) becomes multiplication by \(i\xi\) (or \(-i\xi\)) after Fourier transformation; a second derivative therefore becomes multiplication by \(-\xi^2\).  
Concrete example: the function \(e^{-x^2}\) has transform \(\sqrt{\pi}e^{-\xi^2/4}\); its second derivative \(-2+4x^2\) times the same Gaussian transforms to \(-\xi^2\) times the same transform.  
Formally,
\[
\mathcal{F}(u_{xx})(\xi,t)=-\xi^2\hat{u}(\xi,t).
\]
> [!WARNING]
> Using the opposite sign convention for the Fourier transform flips the sign of \(\xi^2\) and produces an exploding rather than decaying solution.

### Step 2 — Transform the entire PDE
Apply the Fourier transform in \(x\) to every term of \(u_t=k u_{xx}\). Because the transform is linear and differentiation under the integral is justified by integrability, the PDE becomes the family of ODEs indexed by \(\xi\):
\[
\partial_t\hat{u}(\xi,t)=-k\xi^2\hat{u}(\xi,t).
\]

### Step 3 — Solve the ODE explicitly
Each frequency evolves independently. The solution of the ODE with initial value \(\hat{f}(\xi)\) is
\[
\hat{u}(\xi,t)=\hat{f}(\xi)e^{-k\xi^2 t}.
\]

### Step 4 — Recognize the multiplier as a Gaussian transform
The factor \(e^{-k\xi^2 t}\) is (up to a constant) the Fourier transform of the Gaussian
\[
G(x,t)=\frac{1}{\sqrt{4\pi k t}}e^{-x^2/(4kt)}.
\]
Hence the product in frequency space corresponds to convolution in physical space.

### Step 5 — Invert the transform
Applying the inverse Fourier transform yields the classical solution formula
\[
u(x,t)=\int_{-\infty}^{\infty}G(x-y,t)f(y)\,dy.
\]
This is the textbook statement of the result.

## 5. Worked examples — every step shown

**Example 1 — Dirac initial datum**  
*Given:* \(f(x)=\delta(x)\).  
*Find:* \(u(x,t)\).  
Step 1: \(\hat{f}(\xi)=1\).  
*Why:* Fourier transform of the Dirac measure is identically one.  
Step 2: \(\hat{u}(\xi,t)=e^{-k\xi^2 t}\).  
*Why:* Direct multiplication by the exponential factor.  
Step 3: Inverse transform recovers the normalized Gaussian.  
**\(u(x,t)=\frac{1}{\sqrt{4\pi k t}}e^{-x^2/(4kt)}\)**  

*Reflection:* The example isolates the kernel itself; every other solution is obtained by superposition.

**Example 2 — Constant initial temperature**  
*Given:* \(f(x)=1\).  
*Find:* \(u(x,t)\).  
Step 1: \(\hat{f}(\xi)=2\pi\delta(\xi)\).  
*Why:* Fourier transform of a constant is a Dirac at zero frequency.  
Step 2: Only the zero-frequency mode survives, giving \(\hat{u}=2\pi\delta(\xi)\).  
Step 3: Inverse transform returns the constant 1.  
**\(u(x,t)=1\)**  

*Reflection:* Heat conservation appears as preservation of the zero-frequency component.

**Example 3 — Gaussian initial datum**  
*Given:* \(f(x)=e^{-x^2}\).  
*Find:* \(u(x,t)\).  
Step 1: \(\hat{f}(\xi)=\sqrt{\pi}e^{-\xi^2/4}\).  
Step 2: \(\hat{u}(\xi,t)=\sqrt{\pi}e^{-\xi^2/4-k t\xi^2}\).  
Step 3: Complete the square in the exponent and invert.  
**\(u(x,t)=\frac{1}{\sqrt{1+4kt}}e^{-x^2/(1+4kt)}\)**  

*Reflection:* The width grows exactly as \(\sqrt{1+4kt}\), illustrating diffusive spreading.

**Example 4 — Odd initial datum (sign function)**  
*Given:* \(f(x)=\operatorname{sgn}(x)\).  
*Find:* \(u(x,t)\).  
Step 1: \(\hat{f}(\xi)=\sqrt{2/\pi}\,(-i/\xi)\) (principal value).  
Step 2: Multiply by \(e^{-k t\xi^2}\).  
Step 3: The inverse transform is expressed with the error function after contour integration.  
**\(u(x,t)=\operatorname{erf}\Bigl(\frac{x}{\sqrt{4kt}}\Bigr)\)**  

*Reflection:* Demonstrates that the method extends to distributions provided the Fourier transform exists in the sense of tempered distributions.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Wrong sign in the exponent \(e^{+k\xi^2 t}\) | Confusing the Fourier convention for the second derivative | Fix the convention \(\mathcal{F}(u_{xx})=-\xi^2\hat{u}\) once and for all and verify on a Gaussian |
| Omitting the factor \(1/\sqrt{4\pi k t}\) when writing the kernel | Treating the Fourier transform of \(e^{-k t\xi^2}\) as already normalized | Always compute the \(L^1\) norm of the inverse transform or invoke the known Gaussian integral |
| Interchanging limit \(t\to0^+\) and integral without domination | The kernel becomes a nascent delta sequence | Use the dominated-convergence theorem with the integrable majorant \(\|f\|_1 G(x,t)\) |
| Applying the formula on a finite interval | Forgetting that integration by parts produces boundary terms | Restrict the method to truly infinite domains or impose periodic conditions |
| Treating \(\xi\) as a continuous variable yet summing over discrete frequencies | Mixing Fourier series with Fourier transform | Keep the domain geometry explicit: \(\mathbb{R}\) gives integrals, \(\mathbb{T}\) gives sums |
| Dropping the \(k\) inside the square root of the variance | Dimensional inconsistency | Track the diffusion constant through every exponent |
| Assuming the solution remains bounded for \(t<0\) | The heat equation is irreversible | Never apply the forward formula backward in time without adding regularization |

## 7. The textbook-precise statement
Let \(k>0\) and let \(f\in L^1(\mathbb{R})\). Define
\[
G(x,t)=\frac{1}{\sqrt{4\pi k t}}e^{-x^2/(4kt)}\qquad(t>0).
\]
Then the function
\[
u(x,t)=\int_{\mathbb{R}}G(x-y,t)f(y)\,dy
\]
belongs to \(C^\infty(\mathbb{R}\times(0,\infty))\), satisfies \(u_t=ku_{xx}\) pointwise, and
\[
\lim_{t\to0^+}u(\cdot,t)=f
\]
in the \(L^1\) norm and at every Lebesgue point of \(f\). (See Strauss, *Partial Differential Equations*, 2e, §4.3, Theorem 2.)

## 8. Visual — diagram or schematic
```text
x-axis (space)          Fourier ξ-axis
   |                         |
   |  u(x,t)   --FT-->   ˆu(ξ,t)
   |  ∂t          |       ∂t
   |  = k ∂xx     |       = -k ξ²
   |                         |
   v                         v
Gaussian kernel         multiplier e^{-k ξ² t}
   |                         |
   <-- inverse FT -- convolution
```

The diagram shows the PDE becoming an ODE at each frequency; the multiplier is then recognized as the transform of the spreading Gaussian.

## 9. The memory technique

1. **The hook** — Picture a drop of ink instantly turning into an ever-widening bell curve whose width is exactly \(\sqrt{4kt}\); the Fourier transform simply reads off the width in frequency space as an exponential decay.
2. **What to overlearn** — The kernel \(G(x,t)=\frac{1}{\sqrt{4\pi kt}}e^{-x^2/(4kt)}\) together with the multiplier identity \(\mathcal{F}(G)=\,e^{-k t\xi^2}\).
3. **Spaced-repetition schedule** — Review the kernel formula at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.
4. **First-principles fallback** — Re-derive the ODE for \(\hat{u}\), solve it, then evaluate the Gaussian integral \(\int e^{-k t\xi^2+i x\xi}\,d\xi\) by completing the square.

## 10. What this unlocks
The identical technique solves any constant-coefficient linear evolution equation on \(\mathbb{R}^n\) once the symbol of the spatial operator is known; it therefore supplies the fundamental solution for the free Schrödinger equation, the wave equation in odd dimensions, and the Black–Scholes equation. The same multiplier philosophy reappears in the theory of semigroups, in microlocal analysis, and in the design of spectral methods for periodic domains.

## 11. Self-check — five questions, no answers
1. Compute explicitly the \(L^1\) norm of \(G(\cdot,t)\) for each fixed \(t>0\) and prove it equals one.
2. Show that if \(f\) is bounded and continuous then \(u(x,t)\to f(x)\) pointwise as \(t\to0^+\).
3. Differentiate under the integral sign three times and justify each differentiation to prove that \(u\) satisfies the heat equation classically.
4. Suppose the initial datum is the characteristic function of \([0,1]\). Write the resulting solution as an integral of error functions and determine its large-\(t\) asymptotics.
5. Identify the precise point in the derivation where the argument fails if the spatial domain is changed from \(\mathbb{R}\) to \([0,\infty)\) with Dirichlet boundary conditions.