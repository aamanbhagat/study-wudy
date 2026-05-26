## 1. The one-sentence answer
**The Fourier transform converts a function of space or time into a function of frequency by integrating against complex exponentials, thereby turning differentiation into multiplication.**

This operation replaces the local operation of taking a derivative with the algebraic operation of multiplying by \(i\xi\). In one dimension the transform therefore maps an ordinary or partial differential equation in the original variable into an algebraic equation or ordinary differential equation in the frequency variable. Once the transformed equation is solved, the inverse transform recovers the solution in the original domain.

The same mechanism extends immediately to higher dimensions and to systems, which is why the Fourier transform is the standard first tool applied to constant-coefficient linear PDEs on unbounded domains.

> [!NOTE]
> The single deepest insight is that translation-invariant linear operators become multiplication operators after the transform; every constant-coefficient differential operator is translation-invariant, so every such PDE diagonalizes in frequency space.

## 2. Why this matters — concrete and current
In semiconductor process simulation, the Sentaurus TCAD suite at Synopsys solves the drift-diffusion system for carrier transport; the Poisson equation is Fourier-transformed in the lateral directions on periodic test structures, converting a three-dimensional elliptic problem into a set of one-dimensional ODEs that are integrated in milliseconds per frequency.

NASA’s James Webb Space Telescope pipeline removes optical aberrations from raw detector images by applying a two-dimensional Fourier transform, dividing by the measured optical transfer function, and inverting; the same transform also isolates high-frequency jitter from the fine-steering mirror.

In machine-learning accelerators, NVIDIA’s cuFFT library inside CUDA performs batched three-dimensional Fourier transforms to implement spectral convolutions for physics-informed neural networks that solve the Navier–Stokes equations on domains up to \(1024^3\); each forward–backward pair replaces an \(O(N^2)\) convolution with an \(O(N\log N)\) multiplication.

Seismic imaging codes at Schlumberger and CGG use the Fourier transform in reverse time migration to extrapolate wavefields; the one-way wave equation becomes an ordinary multiplication by a square-root dispersion relation at each depth step, enabling industrial-scale prestack depth migration on clusters with thousands of GPUs.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Lebesgue integral on \(\mathbb{R}\) | The transform is defined by an improper integral that must converge in a controlled way. |
| Complex exponential \(e^{i\theta}\) | The kernel that converts translation into phase shift. |
| \(L^1(\mathbb{R})\) and \(L^2(\mathbb{R})\) spaces | Guarantees existence of the transform and its inverse via Plancherel. |
| Differentiation under the integral sign | Justifies term-by-term differentiation that produces the multiplier \(i\xi\). |

## 4. Building the idea — from intuition to formalism

### Step 1 — From periodic sums to continuous spectra
Any periodic function on \([-\pi,\pi]\) can be written as a countable sum of complex exponentials whose frequencies are integer multiples of a fundamental frequency. When the period tends to infinity the discrete frequencies become dense and the sum becomes an integral.

A concrete illustration is the square wave of period \(2L\); its Fourier coefficients are \(\operatorname{sinc}(n\pi/2)\). Letting \(L\to\infty\) turns the coefficient sequence into the continuous function \(\operatorname{sinc}(\xi/2)\).

Formally,
$$
\hat f(\xi)=\int_{-\infty}^{\infty}f(x)e^{-i\xi x}\,dx.
$$

> [!WARNING]
> Treating the frequencies as still discrete after the limit produces an incorrect inversion formula that misses the continuous spectrum.

### Step 2 — The kernel as a simultaneous eigenfunction of all translations
The function \(x\mapsto e^{i\xi x}\) satisfies \(e^{i\xi(x-a)}=e^{-i\xi a}e^{i\xi x}\). Consequently every translate of a function is multiplied by a pure phase factor once the kernel is integrated against it.

### Step 3 — Definition on \(L^1(\mathbb{R})\)
For \(f\in L^1(\mathbb{R})\) the integral
$$
\hat f(\xi)=\int_{-\infty}^{\infty}f(x)e^{-i\xi x}\,dx
$$
exists for every real \(\xi\) and defines a bounded continuous function vanishing at infinity.

### Step 4 — Inversion on the Schwartz class
If both \(f\) and \(\hat f\) are integrable, then
$$
f(x)=\frac1{2\pi}\int_{-\infty}^{\infty}\hat f(\xi)e^{i\xi x}\,d\xi
$$
almost everywhere. The constant \(2\pi\) is fixed by the normalization chosen in Step 3.

### Step 5 — Differentiation becomes multiplication
Differentiating under the integral sign (justified on the Schwartz class) yields
$$
\widehat{f'}(\xi)=i\xi\,\hat f(\xi).
$$
Higher derivatives produce higher powers of \(i\xi\).

### Step 6 — Convolution becomes multiplication
The convolution theorem follows by writing out the double integral and changing variables:
$$
\widehat{f*g}=\hat f\cdot\hat g.
$$
This algebraic property converts linear constant-coefficient PDEs into multiplication problems in frequency space.

## 5. Worked examples — every step shown

**Example 1 — Fourier transform of a Gaussian**
- *Given:* \(f(x)=e^{-x^2/2}\).
- *Find:* \(\hat f(\xi)\).

Compute the integral directly:
$$
\hat f(\xi)=\int_{-\infty}^{\infty}e^{-x^2/2}e^{-i\xi x}\,dx.
$$
Complete the square in the exponent:
$$
-\frac12x^2-i\xi x=-\frac12(x+i\xi)^2-\frac12\xi^2.
$$
The resulting contour integral equals the known Gaussian integral, giving
$$
\hat f(\xi)=\sqrt{2\pi}\,e^{-\xi^2/2}.
$$
**Final answer**
$$\hat f(\xi)=\sqrt{2\pi}\,e^{-\xi^2/2}.$$

*Reflection:* The Gaussian is essentially its own transform; the only non-trivial work is the contour shift, which generalizes to any quadratic phase.

**Example 2 — Fourier transform of the rect function**
- *Given:* \(f(x)=1\) for \(|x|<1/2\) and \(0\) otherwise.
- *Find:* \(\hat f(\xi<|eos|>