## 1. What it is — in plain English

Imagine you have a musical instrument playing a complex sound. This sound isn't just one pure note; it's a mix of many different notes, each with its own loudness. Parseval's theorem is like a magical accountant for sound energy.

It tells us that if you measure the total "oomph" or energy of the original complex sound, that total energy will be exactly the same as if you added up the "oomph" or energy from each individual pure note that makes up the sound. Nothing gets lost, and nothing gets added when you break the sound down into its basic components or put it back together.

Think of it as a conservation law. If you have a pie, and you cut it into slices, the total amount of pie doesn't change just because you've changed its form from a whole pie to several slices. Parseval's theorem says the "energy" of a signal or function is conserved whether you look at it as a whole in its original form (like the whole pie) or as a collection of its frequency components (like the slices).

In the world of mathematics, "energy" often refers to the integral of the square of a function (or its magnitude if it's complex). This theorem is a fundamental bridge between how a function behaves in its original domain (like time or space) and how its components behave in the frequency domain. It assures us that these two perspectives are energetically equivalent.

## 2. Why it matters — real-world applications

Parseval's theorem is not just an abstract mathematical curiosity; it underpins many practical applications across science and engineering.

1.  **Audio and Image Compression (e.g., MP3, JPEG):** When you compress an audio file into an MP3 or an image into a JPEG, the process often involves transforming the signal into the frequency domain (using a discrete cosine transform, which is related to Fourier transforms). Parseval's theorem helps engineers understand the "energy" distribution across different frequencies. Low-energy frequency components often contribute little to the perceived quality and can be discarded without significant loss. This theorem guarantees that the total energy of the original signal is conserved in the frequency domain representation, allowing for intelligent data reduction while preserving the "most important" parts of the signal.
2.  **Quantum Mechanics:** In quantum mechanics, the square of the magnitude of a wave function, $|\Psi(x,t)|^2$, represents the probability density of finding a particle at a certain position $x$ at time $t$. The integral of this over all space must be 1 (total probability). When the wave function is transformed into momentum space (its Fourier transform), Parseval's theorem ensures that the integral of the probability density in momentum space is also 1. This means that the total probability of finding the particle *somewhere* (either in position or momentum space) is conserved, which is a fundamental requirement for a consistent quantum theory.
3.  **Power Spectrum Analysis in Engineering:** In electrical engineering, communications, and seismology, Parseval's theorem is crucial for analyzing the power of signals. For instance, in radio communication, engineers use spectrum analyzers to view the frequency content of a signal. Parseval's theorem allows them to relate the total power of a signal measured in the time domain to the sum or integral of the power contributions from each frequency component in the frequency domain. This is vital for designing filters, allocating bandwidth, and understanding noise characteristics in systems like Wi-Fi, 5G, or satellite communication. It's used by companies like Qualcomm, Intel, and NASA for robust signal design.
4.  **Solving Partial Differential Equations (PDEs):** When solving PDEs using Fourier methods (e.g., the heat equation or wave equation), Parseval's theorem can be used to derive "energy estimates" for the solutions. These estimates are crucial for proving the uniqueness and stability of solutions. For example, for the heat equation, an energy estimate derived from Parseval's theorem can show that the "total heat energy" in a system decreases over time, providing physical intuition and mathematical rigor to the solution's behavior.

## 3. Prerequisites — what you must know first

To fully grasp Parseval's theorem, you should have a solid understanding of the following concepts:

*   **Integration:** The ability to compute definite and indefinite integrals, including improper integrals, and understanding their geometric and physical interpretations (e.g., area under a curve, accumulation).
*   **Complex Numbers:** Familiarity with complex numbers ($a+bi$), their modulus ($|z| = \sqrt{a^2+b^2}$), complex conjugate ($\bar{z} = a-bi$), and especially Euler's formula ($e^{ix} = \cos x + i \sin x$) and complex exponentials.
*   **Fourier Series:** The concept of representing a periodic function as a sum of sines and cosines (or complex exponentials), how to calculate Fourier coefficients, and understanding convergence properties.
*   **Fourier Transform:** The generalization of Fourier series to non-periodic functions, its definition, inverse transform, and basic properties (linearity, time/frequency shifting).
*   **Inner Product / $L^2$ Space:** The idea of an inner product between functions ($\langle f, g \rangle = \int f(x)\overline{g(x)} dx$), which generalizes the dot product of vectors. The $L^2$ space is the space of square-integrable functions, for which the "energy" (norm squared) is finite.
*   **Orthogonality:** Understanding that functions like $\sin(nx)$, $\cos(nx)$, and $e^{inx}$ form an orthogonal basis over certain intervals, meaning their inner product is zero unless they are the same function.
*   **Partial Differential Equations (PDEs):** A basic understanding of what PDEs are and how Fourier analysis is often employed as a tool to solve them, particularly through techniques like separation of variables.

## 4. The core idea — step by step

Let's break down Parseval's theorem by first understanding its building blocks.

### Step 1: The "Energy" of a Function

*   **Plain English:** When we talk about the "energy" of a function in this context, we're not necessarily referring to physical energy like joules. Instead, it's a mathematical measure of the function's "size" or "magnitude" over a given domain. Think of it as the total "oomph" or "intensity" contained within the function. For real-valued functions, it's like measuring the total brightness of a light pattern; for complex functions, it's about the magnitude squared.
*   **Small Concrete Example:** Consider two simple functions over the interval $[0, 2\pi]$: $f(x) = \sin(x)$ and $g(x) = 2\sin(x)$.
    *   The "energy" of $f(x)$ would be $\int_0^{2\pi} (\sin(x))^2 dx = \int_0^{2\pi} \frac{1-\cos(2x)}{2} dx = [\frac{x}{2} - \frac{\sin(2x)}{4}]_0^{2\pi} = \pi$.
    *   The "energy" of $g(x)$ would be $\int_0^{2\pi} (2\sin(x))^2 dx = \int_0^{2\pi} 4\sin^2(x) dx = 4 \int_0^{2\pi} \sin^2(x) dx = 4\pi$.
    Notice that $g(x)$ has four times the "energy" of $f(x)$, even though its amplitude is only twice as large. This is because energy is proportional to the square of the amplitude.
*   **Formal/Mathematical Version:** For a real-valued function $f(x)$ defined on an interval $[a, b]$, its "energy" is defined as $\int_a^b (f(x))^2 dx$. For a complex-valued function $f(x)$, it's $\int_a^b |f(x)|^2 dx$. The absolute value squared, $|f(x)|^2$, is equivalent to $f(x)\overline{f(x)}$, where $\overline{f(x)}$ is the complex conjugate.
    $$ \text{Energy} = \int_{a}^{b} |f(x)|^2 dx $$
*   **What could go wrong:** Confusing "energy" with the simple amplitude or average value of a function. Energy is always related to the square of the function's magnitude, making it a non-negative quantity.

### Step 2: Decomposing a Function (Fourier Series)

*   **Plain English:** Many complex, periodic signals can be broken down into a sum of simpler, pure sine and cosine waves (or complex exponentials) of different frequencies and amplitudes. This is like analyzing a musical chord to find out which individual notes are being played and how loud each one is.
*   **Small Concrete Example:** A square wave, which is a very sharp, abrupt signal, can be represented as an infinite sum of smooth sine waves. The first few terms might look like $\sin(x) + \frac{1}{3}\sin(3x) + \frac{1}{5}\sin(5x) + \dots$. Each term is a "component" of the original square wave.
*   **Formal/Mathematical Version:** For a periodic function $f(x)$ with period $2L$ (i.e., defined on $[-L, L]$), its complex Fourier series representation is:
    $$ f(x) = \sum_{n=-\infty}^{\infty} c_n e^{i \frac{n\pi}{L} x} $$
    where the Fourier coefficients $c_n$ are given by:
    $$ c_n = \frac{1}{2L} \int_{-L}^{L} f(x) e^{-i \frac{n\pi}{L} x} dx $$
*   **What could go wrong:** Forgetting the correct formula for the Fourier coefficients, especially the normalization factor ($1/2L$), or confusing the complex exponential form with the real sine/cosine form.

### Step 3: Energy in the Frequency Domain (Fourier Series)

*   **Plain English:** Once a function is decomposed into its frequency components (the $c_n$ coefficients), we can ask: how much "energy" does each individual component contribute? The "energy" of a specific frequency component is proportional to the square of its magnitude.
*   **Small Concrete Example:** If a sound wave is represented by $f(x) = 3\sin(x) + 4\cos(2x)$, the component $3\sin(x)$ has an "energy" contribution related to $3^2=9$, and $4\cos(2x)$ has an "energy" contribution related to $4^2=16$.
*   **Formal/Mathematical Version:** For each Fourier coefficient $c_n$, its contribution to the total energy in the frequency domain is given by $|c_n|^2$. If we use the real Fourier series ($a_0, a_n, b_n$), the contributions are related to $a_0^2$, $a_n^2$, and $b_n^2$.
    $$ \text{Energy contribution of } n^{th} \text{ component} \propto |c_n|^2 $$
*   **What could go wrong:** Forgetting to take the absolute value squared. If $c_n$ is a complex number, its "energy" contribution is $|c_n|^2$, not just $c_n$ or $c_n^2$.

### Step 4: Parseval's Theorem for Fourier Series

*   **Plain English:** This is the core statement for periodic functions. It says that the average "energy" of the original periodic function over one period is exactly equal to the sum of the "energies" of all its individual frequency components. It's a statement of energy conservation across domains.
*   **Small Concrete Example:** Imagine a musical instrument playing a note for 1 second. The total sound energy over that second is, say, 10 units. If you then analyze all the pure tones (harmonics) that make up that note, and you sum up the energy of each of those pure tones, the total sum will still be 10 units. No energy is created or destroyed by the act of decomposition.
*   **Formal/Mathematical Version:** For a periodic function $f(x)$ with period $2L$ (i.e., defined on $[-L, L]$) that is square-integrable, Parseval's theorem states:
    $$ \frac{1}{2L} \int_{-L}^{L} |f(x)|^2 dx = \sum_{n=-\infty}^{\infty} |c_n|^2 $$
    where $c_n$ are the complex Fourier coefficients.
    For the real Fourier series coefficients ($a_0, a_n, b_n$):
    $$ \frac{1}{2L} \int_{-L}^{L} |f(x)|^2 dx = \frac{a_0^2}{4} + \frac{1}{2} \sum_{n=1}^{\infty} (a_n^2 + b_n^2) $$
*   **What could go wrong:** Forgetting the normalization factor $1/(2L)$ on the left side. Also, ensure you use the correct coefficients for the sum on the right side (complex $c_n$ versus real $a_n, b_n$).

### Step 5: Parseval's Theorem for Fourier Transform (Plancherel's Theorem)

*   **Plain English:** This is the equivalent concept for non-periodic functions. Just as with periodic functions, the total "energy" of a non-periodic signal in its original domain (e.g., time) is conserved when you transform it into the frequency domain. Instead of summing discrete energy contributions, you integrate a continuous "energy density" in the frequency domain.
*   **Small Concrete Example:** A single, non-repeating pulse of light (like a laser pulse). It has a certain total energy. If you analyze its spectrum (the range of colors/frequencies it contains), Parseval's theorem guarantees that the total energy calculated from the spectrum will be identical to the total energy of the pulse itself.
*   **Formal/Mathematical Version:** Let $f(x)$ be a square-integrable function defined on $(-\infty, \infty)$, and let $\hat{f}(\xi)$ be its Fourier transform, defined as $\hat{f}(\xi) = \int_{-\infty}^{\infty} f(x) e^{-i\xi x} dx$. Then Parseval's theorem (often called Plancherel's theorem in this context) states:
    $$ \int_{-\infty}^{\infty} |f(x)|^2 dx = \frac{1}{2\pi} \int_{-\infty}^{\infty} |\hat{f}(\xi)|^2 d\xi $$
    Note: The constant factor ($1/2\pi$) on the right-hand side depends on the specific definition of the Fourier transform used. If the Fourier transform is defined with a $1/\sqrt{2\pi}$ factor in both the forward and inverse transforms, then the factor on the right side of Parseval's identity becomes 1.
*   **What could go wrong:** Forgetting the normalization factor (like $1/(2\pi)$) on the right-hand side, which is crucial and depends on your chosen Fourier transform definition. Also, ensure the function $f(x)$ is square-integrable for the theorem to apply.

## 5. Worked examples — multiple, with every step shown

We will use the complex Fourier series definition for periodic functions with period $2L$:
$f(x) = \sum_{n=-\infty}^{\infty} c_n e^{i \frac{n\pi}{L} x}$ where $c_n = \frac{1}{2L} \int_{-L}^{L} f(x) e^{-i \frac{n\pi}{L} x} dx$.
Parseval's theorem states: $\frac{1}{2L} \int_{-L}^{L} |f(x)|^2 dx = \sum_{n=-\infty}^{\infty} |c_n|^2$.

For the Fourier Transform, we will use the definition:
$\hat{f}(\xi) = \int_{-\infty}^{\infty} f(x) e^{-i\xi x} dx$.
Parseval's theorem (Plancherel's) states: $\int_{-\infty}^{\infty} |f(x)|^2 dx = \frac{1}{2\pi} \int_{-\infty}^{\infty} |\hat{f}(\xi)|^2 d\xi$.

---

### Example 1 (Easy - Fourier Series): Verifying Parseval for a simple sine wave

**Problem:** Let $f(x) = \sin(x)$ on the interval $[-\pi, \pi]$. Verify Parseval's theorem. Here, $2L = 2\pi$, so $L=\pi$.

**Given:** $f(x) = \sin(x)$ for $x \in [-\pi, \pi]$.
**Want:** To show that $\frac{1}{2\pi} \int_{-\pi}^{\pi} |\sin(x)|^2 dx = \sum_{n=-\infty}^{\infty} |c_n|^2$.

**Step 1: Calculate the left-hand side (LHS) of Parseval's theorem.**
$$ \text{LHS} = \frac{1}{2\pi} \int_{-\pi}^{\pi} |\sin(x)|^2 dx $$
$$ \text{LHS} = \frac{1}{2\pi} \int_{-\pi}^{\pi} \sin^2(x) dx $$
*This is the definition of the average energy of the function over one period.*
We use the identity $\sin^2(x) = \frac{1 - \cos(2x)}{2}$.
$$ \text{LHS} = \frac{1}{2\pi} \int_{-\pi}^{\pi} \left(\frac{1 - \cos(2x)}{2}\right) dx $$
*Substitute the trigonometric identity to simplify the integral.*
$$ \text{LHS} = \frac{1}{4\pi} \int_{-\pi}^{\pi} (1 - \cos(2x)) dx $$
*Factor out the constant.*
$$ \text{LHS} = \frac{1}{4\pi} \left[ x - \frac{\sin(2x)}{2} \right]_{-\pi}^{\pi} $$
*Perform the integration. The integral of 1 is $x$, and the integral of $\cos(2x)$ is $\frac{\sin(2x)}{2}$.*
$$ \text{LHS} = \frac{1}{4\pi} \left( \left( \pi - \frac{\sin(2\pi)}{2} \right) - \left( -\pi - \frac{\sin(-2\pi)}{2} \right) \right) $$
*Evaluate the definite integral at the limits. Note that $\sin(2\pi) = 0$ and $\sin(-2\pi) = 0$.*
$$ \text{LHS} = \frac{1}{4\pi} \left( (\pi - 0) - (-\pi - 0) \right) $$
*Simplify the expression.*
$$ \text{LHS} = \frac{1}{4\pi} (2\pi) $$
*Further simplification.*
$$ \text{LHS} = \frac{1}{2} $$
*This is the average energy of $\sin(x)$ over $[-\pi, \pi]$.*

**Step 2: Calculate the Fourier coefficients $c_n$.**
$f(x) = \sin(x) = \frac{e^{ix} - e^{-ix}}{2i}$.
*We express $\sin(x)$ in terms of complex exponentials using Euler's formula, which simplifies finding coefficients for pure exponentials.*
The Fourier series for $f(x)$ is $f(x) = \sum_{n=-\infty}^{\infty} c_n e^{inx}$ (since $L=\pi$, $\frac{n\pi}{L}x = nx$).
By inspection, comparing $f(x) = \frac{1}{2i} e^{i(1)x} + \frac{-1}{2i} e^{i(-1)x}$ with the general form, we can see:
$c_1 = \frac{1}{2i} = -\frac{i}{2}$
$c_{-1} = -\frac{1}{2i} = \frac{i}{2}$
All other $c_n = 0$.
*This is a shortcut. Alternatively, one would calculate $c_n = \frac{1}{2\pi} \int_{-\pi}^{\pi} \sin(x) e^{-inx} dx$. This integral will be non-zero only for $n=1$ and $n=-1$.*

**Step 3: Calculate the right-hand side (RHS) of Parseval's theorem.**
$$ \text{RHS} = \sum_{n=-\infty}^{\infty} |c_n|^2 $$
*This is the sum of the squared magnitudes of the Fourier coefficients.*
$$ \text{RHS} = |c_1|^2 + |c_{-1}|^2 $$
*Since only $c_1$ and $c_{-1}$ are non-zero, we only sum their contributions.*
$$ \text{RHS} = \left|-\frac{i}{2}\right|^2 + \left|\frac{i}{2}\right|^2 $$
*Calculate the magnitude squared of the complex coefficients. Recall $|a+bi|^2 = a^2+b^2$. For pure imaginary numbers, $|bi|^2 = b^2$.*
$$ \text{RHS} = \left(\frac{1}{2}\right)^2 + \left(\frac{1}{2}\right)^2 $$
*Simplify the squares.*
$$ \text{RHS} = \frac{1}{4} + \frac{1}{4} $$
*Sum the terms.*
$$ \text{RHS} = \frac{1}{2} $$

**Step 4: Compare LHS and RHS.**
We found $\text{LHS} = \frac{1}{2}$ and $\text{RHS} = \frac{1}{2}$.
Since $\text{LHS} = \text{RHS}$, Parseval's theorem is verified for $f(x)=\sin(x)$.

**Final Answer:**
$$ \boxed{\frac{1}{2\pi} \int_{-\pi}^{\pi} |\sin(x)|^2 dx = \frac{1}{2} \quad \text{and} \quad \sum_{n=-\infty}^{\infty} |c_n|^2 = \frac{1}{2}} $$
**Reflection:** This example was relatively easy because $\sin(x)$ is already a simple exponential (or sum of exponentials), making its Fourier coefficients very sparse. This allowed for quick calculation of the RHS. The main work was in the integral for the LHS.

---

### Example 2 (Medium - Fourier Series): Applying Parseval to a sawtooth wave

**Problem:** Let $f(x) = x$ on the interval $[-\pi, \pi]$. Verify Parseval's theorem. Here, $2L = 2\pi$, so $L=\pi$.

**Given:** $f(x) = x$ for $x \in [-\pi, \pi]$.
**Want:** To show that $\frac{1}{2\pi} \int_{-\pi}^{\pi} |x|^2 dx = \sum_{n=-\infty}^{\infty} |c_n|^2$.

**Step 1: Calculate the left-hand side (LHS) of Parseval's theorem.**
$$ \text{LHS} = \frac{1}{2\pi} \int_{-\pi}^{\pi} |x|^2 dx $$
*This is the definition of the average energy of the function over one period.*
Since $x$ is real, $|x|^2 = x^2$.
$$ \text{LHS} = \frac{1}{2\pi} \int_{-\pi}^{\pi} x^2 dx $$
*Simplify the integrand.*
$$ \text{LHS} = \frac{1}{2\pi} \left[ \frac{x^3}{3} \right]_{-\pi}^{\pi} $$
*Perform the integration. The integral of $x^2$ is $x^3/3$.*
$$ \text{LHS} = \frac{1}{2\pi} \left( \frac{\pi^3}{3} - \frac{(-\pi)^3}{3} \right) $$
*Evaluate the definite integral at the limits.*
$$ \text{LHS} = \frac{1}{2\pi} \left( \frac{\pi^3}{3} - \left(-\frac{\pi^3}{3}\right) \right) $$
*Simplify the expression.*
$$ \text{LHS} = \frac{1}{2\pi} \left( \frac{2\pi^3}{3} \right) $$
*Further simplification.*
$$ \text{LHS} = \frac{\pi^2}{3} $$
*This is the average energy of $f(x)=x$ over $[-\pi, \pi]$.*

**Step 2: Calculate the Fourier coefficients $c_n$.**
The formula for $c_n$ is $c_n = \frac{1}{2L} \int_{-L}^{L} f(x) e^{-i \frac{n\pi}{L} x} dx$.
Here $L=\pi$, so $c_n = \frac{1}{2\pi} \int_{-\pi}^{\pi} x e^{-inx} dx$.
*This is the general formula for Fourier coefficients for $f(x)=x$ on $[-\pi, \pi]$.*

For $n=0$:
$$ c_0 = \frac{1}{2\pi} \int_{-\pi}^{\pi} x dx = \frac{1}{2\pi} \left[ \frac{x^2}{2} \right]_{-\pi}^{\pi} = \frac{1}{2\pi} \left( \frac{\pi^2}{2} - \frac{(-\pi)^2}{2} \right) = \frac{1}{2\pi} (0) = 0 $$
*The $n=0$ coefficient represents the average value of the function. Since $f(x)=x$ is an odd function, its average over a symmetric interval is 0.*

For $n \neq 0$: We use integration by parts, $\int u dv = uv - \int v du$.
Let $u=x$, $dv=e^{-inx}dx$. Then $du=dx$, $v=\frac{e^{-inx}}{-in}$.
$$ c_n = \frac{1}{2\pi} \left[ x \frac{e^{-inx}}{-in} \right]_{-\pi}^{\pi} - \int_{-\pi}^{\pi} \frac{e^{-inx}}{-in} dx $$
*Apply the integration by parts formula.*
$$ c_n = \frac{1}{2\pi} \left( \left[ \frac{xe^{-inx}}{-in} \right]_{-\pi}^{\pi} - \left[ \frac{e^{-inx}}{(-in)^2} \right]_{-\pi}^{\pi} \right) $$
*Evaluate the definite integrals.*
$$ c_n = \frac{1}{2\pi} \left( \left( \frac{\pi e^{-in\pi}}{-in} - \frac{-\pi e^{in\pi}}{-in} \right) - \left( \frac{e^{-in\pi}}{-n^2} - \frac{e^{in\pi}}{-n^2} \right) \right) $$
*Substitute the limits of integration. Recall that $e^{in\pi} = (-1)^n$ and $e^{-in\pi} = (-1)^n$ for integer $n$.*
$$ c_n = \frac{1}{2\pi} \left( \left( \frac{\pi (-1)^n}{-in} - \frac{-\pi (-1)^n}{-in} \right) - \left( \frac{(-1)^n}{-n^2} - \frac{(-1)^n}{-n^2} \right) \right) $$
*Simplify the terms.*
$$ c_n = \frac{1}{2\pi} \left( \frac{\pi (-1)^n}{-in} + \frac{\pi (-1)^n}{-in} - \left( \frac{(-1)^n}{-n^2} - \frac{(-1)^n}{-n^2} \right) \right) $$
$$ c_n = \frac{1}{2\pi} \left( \frac{2\pi (-1)^n}{-in} - 0 \right) $$
*The second term cancels out.*
$$ c_n = \frac{1}{2\pi} \left( \frac{2\pi (-1)^n}{-in} \right) $$
*Cancel $2\pi$.*
$$ c_n = \frac{(-1)^n}{-in} = \frac{i(-1)^n}{n} $$
*Multiply by $i/i$ to remove $i$ from the denominator. So $c_n = i \frac{(-1)^n}{n}$.*

**Step 3: Calculate the right-hand side (RHS) of Parseval's theorem.**
$$ \text{RHS} = \sum_{n=-\infty}^{\infty} |c_n|^2 $$
*This is the sum of the squared magnitudes of the Fourier coefficients.*
Since $c_0 = 0$, we only sum for $n \neq 0$.
$$ \text{RHS} = \sum_{n \neq 0} \left| \frac{i(-1)^n}{n} \right|^2 $$
*Substitute the expression for $c_n$.*
$$ \text{RHS} = \sum_{n \neq 0} \frac{|i|^2 |(-1)^n|^2}{|n|^2} $$
*Recall $|i|=1$ and $|(-1)^n|=1$.*
$$ \text{RHS} = \sum_{n \neq 0} \frac{1 \cdot 1}{n^2} $$
$$ \text{RHS} = \sum_{n \neq 0} \frac{1}{n^2} $$
*The sum runs over all non-zero integers. We can split it into positive and negative $n$.*
$$ \text{RHS} = \sum_{n=1}^{\infty} \frac{1}{n^2} + \sum_{n=-\infty}^{-1} \frac{1}{n^2} $$
*For negative $n$, let $m = -n$. Then $n^2 = (-m)^2 = m^2$. So the second sum is also $\sum_{m=1}^{\infty} \frac{1}{m^2}$.*
$$ \text{RHS} = 2 \sum_{n=1}^{\infty} \frac{1}{n^2} $$
*This is a famous result from the Basel problem, Euler showed that $\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}$.*
$$ \text{RHS} = 2 \left( \frac{\pi^2}{6} \right) $$
*Substitute the known value of the sum.*
$$ \text{RHS} = \frac{\pi^2}{3} $$

**Step 4: Compare LHS and RHS.**
We found $\text{LHS} = \frac{\pi^2}{3}$ and $\text{RHS} = \frac{\pi^2}{3}$.
Since $\text{LHS} = \text{RHS}$, Parseval's theorem is verified for $f(x)=x$.

**Final Answer:**
$$ \boxed{\frac{1}{2\pi} \int_{-\pi}^{\pi} |x|^2 dx = \frac{\pi^2}{3} \quad \text{and} \quad \sum_{n=-\infty}^{\infty} |c_n|^2 = \frac{\pi^2}{3}} $$
**Reflection:** This example was more involved due to the integration by parts for the Fourier coefficients and the need to recognize the Basel problem sum. It highlights how Parseval's theorem can sometimes be used to evaluate infinite series sums if the LHS integral is easier to compute.

---

### Example 3 (Harder - Fourier Series): Parseval for an exponential function

**Problem:** Let $f(x) = e^x$ on the interval $[-\pi, \pi]$. Verify Parseval's theorem. Here, $2L = 2\pi$, so $L=\pi$.

**Given:** $f(x) = e^x$ for $x \in [-\pi, \pi]$.
**Want:** To show that $\frac{1}{2\pi} \int_{-\pi}^{\pi} |e^x|^2 dx = \sum_{n=-\infty}^{\infty} |c_n|^2$.

**Step 1: Calculate the left-hand side (LHS) of Parseval's theorem.**
$$ \text{LHS} = \frac{1}{2\pi} \int_{-\pi}^{\pi} |e^x|^2 dx $$
*This is the definition of the average energy of the function over one period.*
Since $e^x$ is real and positive, $|e^x|^2 = (e^x)^2 = e^{2x}$.
$$ \text{LHS} = \frac{1}{2\pi} \int_{-\pi}^{\pi} e^{2x} dx $$
*Simplify the integrand.*
$$ \text{LHS} = \frac{1}{2\pi} \left[ \frac{e^{2x}}{2} \right]_{-\pi}^{\pi} $$
*Perform the integration. The integral of $e^{2x}$ is $e^{2x}/2$.*
$$ \text{LHS} = \frac{1}{2\pi} \left( \frac{e^{2\pi}}{2} - \frac{e^{-2\pi}}{2} \right) $$
*Evaluate the definite integral at the limits.*
$$ \text{LHS} = \frac{1}{4\pi} (e^{2\pi} - e^{-2\pi}) $$
*This can also be written using the hyperbolic sine function: $\sinh(x) = \frac{e^x - e^{-x}}{2}$.*
$$ \text{LHS} = \frac{1}{2\pi} \sinh(2\pi) $$
*This is the average energy of $f(x)=e^x$ over $[-\pi, \pi]$.*

**Step 2: Calculate the Fourier coefficients $c_n$.**
The formula for $c_n$ is $c_n = \frac{1}{2L} \int_{-L}^{L} f(x) e^{-i \frac{n\pi}{L} x} dx$.
Here $L=\pi$, so $c_n = \frac{1}{2\pi} \int_{-\pi}^{\pi} e^x e^{-inx} dx$.
*This is the general formula for Fourier coefficients for $f(x)=e^x$ on $[-\pi, \pi]$.*
$$ c_n = \frac{1}{2\pi} \int_{-\pi}^{\pi} e^{(1-in)x} dx $$
*Combine the exponential terms.*
$$ c_n = \frac{1}{2\pi} \left[ \frac{e^{(1-in)x}}{1-in} \right]_{-\pi}^{\pi} $$
*Perform the integration.*
$$ c_n = \frac{1}{2\pi(1-in)} \left( e^{(1-in)\pi} - e^{(1-in)(-\pi)} \right) $$
*Evaluate at the limits.*
$$ c_n = \frac{1}{2\pi(1-in)} \left( e^{\pi} e^{-in\pi} - e^{-\pi} e^{in\pi} \right) $$
*Separate the exponential terms. Recall $e^{in\pi} = (-1)^n$ and $e^{-in\pi} = (-1)^n$.*
$$ c_n = \frac{1}{2\pi(1-in)} \left( e^{\pi} (-1)^n - e^{-\pi} (-1)^n \right) $$
*Factor out $(-1)^n$.*
$$ c_n = \frac{(-1)^n}{2\pi(1-in)} (e^{\pi} - e^{-\pi}) $$
*Rewrite $e^{\pi} - e^{-\pi}$ as $2\sinh(\pi)$.*
$$ c_n = \frac{(-1)^n \cdot 2\sinh(\pi)}{2\pi(1-in)} $$
*Simplify by canceling 2.*
$$ c_n = \frac{(-1)^n \sinh(\pi)}{\pi(1-in)} $$
*This is the expression for the Fourier coefficients.*

**Step 3: Calculate the right-hand side (RHS) of Parseval's theorem.**
$$ \text{RHS} = \sum_{n=-\infty}^{\infty} |c_n|^2 $$
*This is the sum of the squared magnitudes of the Fourier coefficients.*
$$ \text{RHS} = \sum_{n=-\infty}^{\infty} \left| \frac{(-1)^n \sinh(\pi)}{\pi(1-in)} \right|^2 $$
*Substitute the expression for $c_n$.*
$$ \text{RHS} = \sum_{n=-\infty}^{\infty} \frac{|(-1)^n|^2 |\sinh(\pi)|^2}{|\pi(1-in)|^2} $$
*Recall $|(-1)^n|=1$, $\sinh(\pi)$ is real, so $|\sinh(\pi)|^2 = (\sinh(\pi))^2$. And $|\pi(1-in)|^2 = \pi^2 |1-in|^2 = \pi^2 (1^2 + (-n)^2) = \pi^2 (1+n^2)$.*
$$ \text{RHS} = \sum_{n=-\infty}^{\infty} \frac{(\sinh(\pi))^2}{\pi^2 (1+n^2)} $$
*Factor out the constant terms from the sum.*
$$ \text{RHS} = \frac{(\sinh(\pi))^2}{\pi^2} \sum_{n=-\infty}^{\infty} \frac{1}{1+n^2} $$
*We know that $\sum_{n=-\infty}^{\infty} \frac{1}{1+n^2} = \frac{1}{1+0^2} + \sum_{n \neq 0} \frac{1}{1+n^2} = 1 + 2 \sum_{n=1}^{\infty} \frac{1}{1+n^2}$.*
*There is a known identity for this sum: $\sum_{n=-\infty}^{\infty} \frac{1}{a^2+n^2} = \frac{\pi}{a} \coth(\pi a)$. For $a=1$:*
$$ \sum_{n=-\infty}^{\infty} \frac{1}{1+n^2} = \pi \coth(\pi) $$
*Substitute this identity.*
$$ \text{RHS} = \frac{(\sinh(\pi))^2}{\pi^2} \left( \pi \coth(\pi) \right) $$
*Simplify the expression. Recall $\coth(\pi) = \frac{\cosh(\pi)}{\sinh(\pi)}$.*
$$ \text{RHS} = \frac{(\sinh(\pi))^2}{\pi^2} \frac{\pi \cosh(\pi)}{\sinh(\pi)} $$
$$ \text{RHS} = \frac{\sinh(\pi) \cosh(\pi)}{\pi} $$
*Use the identity $2\sinh(x)\cosh(x) = \sinh(2x)$. So $\sinh(\pi)\cosh(\pi) = \frac{1}{2}\sinh(2\pi)$.*
$$ \text{RHS} = \frac{1}{2\pi} \sinh(2\pi) $$

**Step 4: Compare LHS and RHS.**
We found $\text{LHS} = \frac{1}{2\pi} \sinh(2\pi)$ and $\text{RHS} = \frac{1}{2\pi} \sinh(2\pi)$.
Since $\text{LHS} = \text{RHS}$, Parseval's theorem is verified for $f(x)=e^x$.

**Final Answer:**
$$ \boxed{\frac{1}{2\pi} \int_{-\pi}^{\pi} |e^x|^2 dx = \frac{1}{2\pi} \sinh(2\pi) \quad \text{and} \quad \sum_{n=-\infty}^{\infty} |c_n|^2 = \frac{1}{2\pi} \sinh(2\pi)} $$
**Reflection:** This example was harder because the Fourier coefficients involved complex numbers, and the sum on the RHS required a specific known series identity. It demonstrates the power of Parseval's theorem in connecting seemingly unrelated integrals and infinite sums.

---

### Example 4 (Fourier Transform): Parseval for an exponential decay function

**Problem:** Let $f(t) = e^{-a|t|}$ for $a > 0$. Verify Parseval's theorem for the Fourier Transform.

**Given:** $f(t) = e^{-a|t|}$ for $a > 0$.
**Want:** To show that $\int_{-\infty}^{\infty} |f(t)|^2 dt = \frac{1}{2\pi} \int_{-\infty}^{\infty} |\hat{f}(\omega)|^2 d\omega$.
We'll use $\hat{f}(\omega) = \int_{-\infty}^{\infty} f(t) e^{-i\omega t} dt$.

**Step 1: Calculate the left-hand side (LHS) of Parseval's theorem.**
$$ \text{LHS} = \int_{-\infty}^{\infty} |e^{-a|t|}|^2 dt $$
*This is the total energy of the function in the time domain.*
Since $e^{-a|t|}$ is real, $|e^{-a|t|}|^2 = (e^{-a|t|})^2 = e^{-2a|t|}$.
$$ \text{LHS} = \int_{-\infty}^{\infty} e^{-2a|t|} dt $$
*Simplify the integrand. Since $e^{-2a|t|}$ is an even function, we can integrate from $0$ to $\infty$ and multiply by 2.*
$$ \text{LHS} = 2 \int_{0}^{\infty} e^{-2at} dt $$
*For $t \geq 0$, $|t|=t$.*
$$ \text{LHS} = 2 \left[ \frac{e^{-2at}}{-2a} \right]_{0}^{\infty} $$
*Perform the integration.*
$$ \text{LHS} = 2 \left( \lim_{T \to \infty} \frac{e^{-2aT}}{-2a} - \frac{e^{0}}{-2a} \right) $$
*Evaluate at the limits. Since $a>0$, $e^{-2aT} \to 0$ as $T \to \infty$.*
$$ \text{LHS} = 2 \left( 0 - \frac{1}{-2a} \right) $$
$$ \text{LHS} = 2 \left( \frac{1}{2a} \right) $$
$$ \text{LHS} = \frac{1}{a} $$
*This is the total energy of $f(t)=e^{-a|t|}$ in the time domain.*

**Step 2: Calculate the Fourier Transform $\hat{f}(\omega)$.**
$$ \hat{f}(\omega) = \int_{-\infty}^{\infty} e^{-a|t|} e^{-i\omega t} dt $$
*This is the definition of the Fourier transform.*
We split the integral into two parts because of $|t|$.
$$ \hat{f}(\omega) = \int_{-\infty}^{0} e^{at} e^{-i\omega t} dt + \int_{0}^{\infty} e^{-at} e^{-i\omega t} dt $$
*For $t<0$, $|t|=-t$. For $t \geq 0$, $|t|=t$.*
$$ \hat{f}(\omega) = \int_{-\infty}^{0} e^{(a-i\omega)t} dt + \int_{0}^{\infty} e^{(-a-i\omega)t} dt $$
*Combine exponential terms.*
$$ \hat{f}(\omega) = \left[ \frac{e^{(a-i\omega)t}}{a-i\omega} \right]_{-\infty}^{0} + \left[ \frac{e^{(-a-i\omega)t}}{-a-i\omega} \right]_{0}^{\infty} $$
*Perform the integration. Note that for the first integral, as $t \to -\infty$, $e^{(a-i\omega)t} = e^{at}e^{-i\omega t} \to 0$ because $a>0$. For the second integral, as $t \to \infty$, $e^{(-a-i\omega)t} = e^{-at}e^{-i\omega t} \to 0$ because $a>0$.*
$$ \hat{f}(\omega) = \left( \frac{e^0}{a-i\omega} - 0 \right) + \left( 0 - \frac{e^0}{-a-i\omega} \right) $$
*Evaluate at the limits.*
$$ \hat{f}(\omega) = \frac{1}{a-i\omega} - \frac{1}{-a-i\omega} $$
$$ \hat{f}(\omega) = \frac{1}{a-i\omega} + \frac{1}{a+i\omega} $$
*Combine the fractions.*
$$ \hat{f}(\omega) = \frac{(a+i\omega) + (a-i\omega)}{(a-i\omega)(a+i\omega)} $$
$$ \hat{f}(\omega) = \frac{2a}{a^2 + \omega^2} $$
*This is the Fourier transform of $f(t)=e^{-a|t|}$.*

**Step 3: Calculate the right-hand side (RHS) of Parseval's theorem.**
$$ \text{RHS} = \frac{1}{2\pi} \int_{-\infty}^{\infty} |\hat{f}(\omega)|^2 d\omega $$
*This is the total energy of the function in the frequency domain, scaled by $1/(2\pi)$.*
$$ \text{RHS} = \frac{1}{2\pi} \int_{-\infty}^{\infty} \left| \frac{2a}{a^2 + \omega^2} \right|^2 d\omega $$
*Substitute the expression for $\hat{f}(\omega)$. Since $\hat{f}(\omega)$ is real, $|\hat{f}(\omega)|^2 = (\hat{f}(\omega))^2$.*
$$ \text{RHS} = \frac{1}{2\pi} \int_{-\infty}^{\infty} \frac{(2a)^2}{(a^2 + \omega^2)^2} d\omega $$
$$ \text{RHS} = \frac{4a^2}{2\pi} \int_{-\infty}^{\infty} \frac{1}{(a^2 + \omega^2)^2} d\omega $$
*Factor out constants. The integrand is an even function, so we can integrate from $0$ to $\infty$ and multiply by 2.*
$$ \text{RHS} = \frac{2a^2}{\pi} \cdot 2 \int_{0}^{\infty} \frac{1}{(a^2 + \omega^2)^2} d\omega $$
$$ \text{RHS} = \frac{4a^2}{\pi} \int_{0}^{\infty} \frac{1}{(a^2 + \omega^2)^2} d\omega $$
*This integral is a standard integral. You can solve it using trigonometric substitution ($\omega = a \tan\theta$) or a table of integrals. The result is $\int_{0}^{\infty} \frac{1}{(a^2 + \omega^2)^2} d\omega = \frac{\pi}{4a^3}$.*
$$ \text{RHS} = \frac{4a^2}{\pi} \left( \frac{\pi}{4a^3} \right) $$
*Substitute the value of the integral.*
$$ \text{RHS} = \frac{1}{a} $$

**Step 4: Compare LHS and RHS.**
We found $\text{LHS} = \frac{1}{a}$ and $\text{RHS} = \frac{1}{a}$.
Since $\text{LHS} = \text{RHS}$, Parseval's theorem is verified for $f(t)=e^{-a|t|}$.

**Final Answer:**
$$ \boxed{\int_{-\infty}^{\infty} |e^{-a|t|}|^2 dt = \frac{1}{a} \quad \text{and} \quad \frac{1}{2\pi} \int_{-\infty}^{\infty} \left|\frac{2a}{a^2 + \omega^2}\right|^2 d\omega = \frac{1}{a}} $$
**Reflection:** This example involved both the Fourier transform calculation and a more complex definite integral in the frequency domain. It demonstrates the utility of Parseval's theorem for non-periodic signals and the importance of knowing standard integral forms or techniques. The normalization factor $1/(2\pi)$ for the Fourier transform is critical here.

## 6. Common mistakes and traps

1.  **Incorrect Normalization Constants:** This is perhaps the most frequent error. The factors like $1/(2L)$ for Fourier series or $1/(2\pi)$ (or $1/\sqrt{2\pi}$ depending on definition) for Fourier transform are crucial. Missing them or using the wrong one will lead to incorrect results.
2.  **Forgetting the Modulus Squared:** Parseval's theorem deals with "energy," which is proportional to the square of the magnitude. Students often forget to take the absolute value squared ($|c_n|^2$ or $|\hat{f}(\xi)|^2$) for complex coefficients or transforms, or even for real functions where it's $(f(x))^2$.
3.  **Applying to Functions Not in $L^2$:** Parseval's theorem (and Plancherel's theorem) applies to functions that are "square-integrable," i.e., functions for which $\int |f(x)|^2 dx < \infty$. If a function is not in $L^2$, the integrals or sums on one or both sides might diverge, rendering the theorem inapplicable.
4.  **Confusing Fourier Series and Fourier Transform:** While conceptually similar, the formulas, domain of application (periodic vs. non-periodic), and normalization constants differ between Fourier series and Fourier transform. Using a series formula for a transform problem, or vice-versa, is a common trap.
5.  **Algebraic and Integration Errors:** Calculating Fourier coefficients or transforms often involves complex exponentials and integration by parts. Simple algebraic mistakes, sign errors, or incorrect integration limits can propagate and invalidate the final verification.
6.  **Misinterpreting "Energy":** While the term "energy" is used, it's a mathematical definition related to the $L^2$ norm. It doesn't always directly correspond to physical energy in joules unless the function itself represents a physical quantity whose square is energy (e.g., current squared in a resistor, or probability amplitude in QM).

## 7. Textbook-precise explanation

Parseval's theorem is a fundamental result in harmonic analysis, particularly within the theory of Fourier series and Fourier transforms. It asserts the conservation of the $L^2$-norm (often interpreted as "energy" or "power") of a function under a Fourier transformation.

**For Fourier Series (Periodic Functions):**

Let $f(x)$ be a square-integrable, $2L$-periodic complex-valued function, i.e., $f \in L^2([-L, L])$. Its complex Fourier series is given by:
$$ f(x) = \sum_{n=-\infty}^{\infty} c_n e^{i \frac{n\pi}{L} x} $$
where the Fourier coefficients $c_n$ are defined as:
$$ c_n = \frac{1}{2L} \int_{-L}^{L} f(x) e^{-i \frac{n\pi}{L} x} dx $$
Parseval's theorem states that the average power (or energy per unit length) of $f(x)$ over one period is equal to the sum of the powers of its individual harmonic components:
$$ \frac{1}{2L} \int_{-L}^{L} |f(x)|^2 dx = \sum_{n=-\infty}^{\infty} |c_n|^2 $$
This identity is a direct consequence of the orthogonality of the complex exponential basis functions $\{e^{i \frac{n\pi}{L} x}\}_{n \in \mathbb{Z}}$ in $L^2([-L, L])$.

If $f(x)$ is a real-valued $2L$-periodic function, its real Fourier series is:
$$ f(x) = \frac{a_0}{2} + \sum_{n=1}^{\infty} \left( a_n \cos\left(\frac{n\pi}{L} x\right) + b_n \sin\left(\frac{n\pi}{L} x\right) \right) $$
where $a_n$ and $b_n$ are the real Fourier coefficients. The corresponding form of Parseval's theorem is:
$$ \frac{1}{2L} \int_{-L}^{L} |f(x)|^2 dx = \frac{a_0^2}{4} + \frac{1}{2} \sum_{n=1}^{\infty} (a_n^2 + b_n^2) $$
(See, for example, *Kreyszig, Advanced Engineering Mathematics, 10th Ed., Chapter 11.4* or *Stewart, Calculus, 9th Ed., Chapter 16.5* for Fourier series and associated identities.)

**For Fourier Transform (Non-Periodic Functions) — Plancherel's Theorem:**

Parseval's theorem extends to non-periodic functions via the Fourier transform, where it is often referred to as Plancherel's theorem or sometimes the Rayleigh-Parseval theorem.

Let $f(x)$ be a complex-valued function in $L^2(\mathbb{R})$, meaning $\int_{-\infty}^{\infty} |f(x)|^2 dx < \infty$. Let its Fourier transform $\hat{f}(\xi)$ be defined as:
$$ \hat{f}(\xi) = \int_{-\infty}^{\infty} f(x) e^{-i\xi x} dx $$
Then Plancherel's theorem states that the total energy of $f(x)$ in the spatial (or time) domain is proportional to the total energy of its Fourier transform in the frequency domain:
$$ \int_{-\infty}^{\infty} |f(x)|^2 dx = \frac{1}{2\pi} \int_{-\infty}^{\infty} |\hat{f}(\xi)|^2 d\xi $$
It's critical to note that the constant factor ($1/(2\pi)$ in this formulation) depends on the specific definition of the Fourier transform used. Other common definitions distribute the $1/(2\pi)$ factor, for instance, by defining $\hat{f}(\xi) = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{\infty} f(x) e^{-i\xi x} dx$, in which case Plancherel's theorem becomes:
$$ \int_{-\infty}^{\infty} |f(x)|^2 dx = \int_{-\infty}^{\infty} |\hat{f}(\xi)|^2 d\xi $$
This theorem establishes an isometry between $L^2(\mathbb{R})$ and itself (or a scaled version of itself) under the Fourier transform, highlighting its role in Hilbert space theory.
(See, for example, *Folland, Real Analysis: Modern Techniques and Their Applications, 2nd Ed., Chapter 8.3* or *Stein & Shakarchi, Fourier Analysis: An Introduction, Chapter 2.4* for a rigorous treatment of Plancherel's theorem.)

## 8. ASCII diagrams

Here's an ASCII diagram illustrating the concept of energy conservation between the time (or spatial) domain and the frequency domain for a signal.

```text
                  +--------------------------------------------------+
                  |                 Parseval's Theorem               |
                  |     (Energy Conservation across Fourier Domains) |
                  +--------------------------------------------------+
                                        |
                                        |
      +-----------------------------------------------------------------------+
      |                                                                       |
      V                                                                       V
  Time/Spatial Domain (f(t) or f(x))             Frequency Domain (F(ω) or F(ξ))
                                                                                
  Represents the signal as it exists in           Represents the signal as a sum/integral
  its original form (e.g., sound wave             of its constituent frequencies.
  over time, light intensity over space).         (e.g., a sound's pitch components).
                                                                                
  Example: A single pulse in time.                Example: Its spectrum showing which
                                                  frequencies are present and how strong.
       ^ Amplitude                                  ^ Magnitude Squared of Fourier Transform
       |                                            | (Power Spectral Density)
       |      /\                                    |      
       |     /  \                                   |      /\
       |    /____\                                  |     /  \
       +-------------------> Time (t)               +----/----\---------> Frequency (ω)
                                                                                
  Total Energy = ∫ |f(t)|^2 dt                    Total Energy = (1/2π) ∫ |F(ω)|^2 dω
                                                                                
  (Area under the squared magnitude of            (Area under the squared magnitude of
   the signal in the time domain)                 the Fourier transform in the frequency
                                                  domain, possibly scaled)
                                                                                
                                  The theorem states:
                                  ∫ |f(t)|^2 dt   =   (1/2π) ∫ |F(ω)|^2 dω
                                  
                                  (The total energy is conserved)
```

**Description for Redrawing:**

Imagine two graphs side-by-side.
The first graph, labeled "Time/Spatial Domain (f(t) or f(x))", has a horizontal axis labeled "Time (t)" and a vertical axis labeled "Amplitude". On this graph, draw a single, symmetrical pulse shape, perhaps resembling a triangle or a Gaussian bell curve centered at $t=0$. The area under the curve of $|f(t)|^2$ (which would be the square of the amplitude at each point) represents the total energy in this domain.

The second graph, labeled "Frequency Domain (F(ω) or F(ξ))", has a horizontal axis labeled "Frequency (ω)" and a vertical axis labeled "Magnitude Squared of Fourier Transform (Power Spectral Density)". On this graph, draw another pulse shape, also symmetrical and centered at $\omega=0$, but typically wider and lower than the time-domain pulse (due to the uncertainty principle, a narrow pulse in time corresponds to a broad pulse in frequency, and vice-versa). The area under this curve, $|\hat{f}(\omega)|^2$, represents the total energy in the frequency domain.

Parseval's theorem states that these two calculated "total energies" (the area under the squared magnitude in the time domain and the area under the squared magnitude in the frequency domain, with a potential scaling factor) are equal. The diagram visually represents this equivalence of total "area under the squared curve" across the two domains.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **"Parseval Preserves Power (or Energy)."** The two 'P's (Parseval, Power) are a great way to remember the core idea. Think of a power meter that reads the same value whether it's measuring the whole signal or summing up the power of its individual frequency components.
    *   **Visual:** Imagine a pie. The whole pie is the function $f(x)$. The slices are the Fourier coefficients $c_n$. Parseval says: (size of whole pie) = (sum of sizes of all slices). No pie is lost or gained in the slicing!

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **Core Idea:** Energy in one domain = Energy in the other domain.
    *   **Fourier Series (Periodic $f(x)$ on $[-L, L]$):**
        $$ \frac{1}{2L} \int_{-L}^{L} |f(x)|^2 dx = \sum_{n=-\infty}^{\infty} |c_n|^2 $$
    *   **Fourier Transform (Non-periodic $f(x)$ on $\mathbb{R}$):**
        $$ \int_{-\infty}^{\infty} |f(x)|^2 dx = \frac{1}{2\pi} \int_{-\infty}^{\infty} |\hat{f}(\xi)|^2 d\xi $$
        (Remember the $1/(2\pi)$ factor is crucial and depends on your FT definition.)

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Immediately after this lesson,