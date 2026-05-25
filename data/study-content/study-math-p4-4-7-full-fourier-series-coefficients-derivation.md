## 1. What it is — in plain English

Imagine you have a really complicated sound – like a symphony orchestra playing a complex piece of music. It sounds like one big, rich sound, but it's actually made up of many simpler, pure musical notes, each played at a certain volume.

A Full Fourier series does something very similar for functions (which you can think of as mathematical "signals" or "shapes"). It's a way to break down *any* periodic, wiggly, or even jagged function into a sum of simple, smooth, pure sine and cosine waves. Think of sines and cosines as the "pure musical notes" of mathematics.

The "coefficients derivation" part is like finding out the "volume" or "intensity" of each of these pure sine and cosine waves. If a certain sine wave is very prominent in the original function, its coefficient will be large. If a certain cosine wave isn't present at all, its coefficient will be zero. By finding all these "volumes" (coefficients), we can perfectly reconstruct the original complex function by adding up all these simple waves.

## 2. Why it matters — real-world applications

Understanding Fourier series and how to derive its coefficients is absolutely fundamental across many scientific and engineering disciplines. It's not just an abstract mathematical tool; it's a workhorse for analyzing and manipulating real-world signals and systems.

1.  **Audio and Signal Processing (e.g., MP3 compression, Telecommunications):** When you listen to music on your phone, it's often stored in a compressed format like MP3. Fourier analysis is at the heart of this. The complex sound wave of music is decomposed into its constituent frequencies (sines and cosines). Human ears are less sensitive to certain high frequencies, so these components can be discarded or reduced in fidelity without a noticeable loss in perceived quality, leading to smaller file sizes. Similarly, in telecommunications, signals are broken down into frequency components to efficiently transmit data over radio waves or fiber optics. Companies like **Qualcomm** (mobile chipsets) and **Dolby Laboratories** (audio processing) rely heavily on these principles.

2.  **Image and Video Compression (e.g., JPEG, MPEG):** Just as with sound, images and video can be thought of as signals. A JPEG image, for instance, uses a 2D Discrete Cosine Transform (a close cousin of the Fourier series) to decompose image blocks into frequency components. Areas with slow changes in color (low frequencies) are represented efficiently, while fine details (high frequencies) can be compressed. This allows for significant file size reduction without drastic visual degradation. This technology is used by virtually every digital camera, smartphone, and web browser.

3.  **Solving Partial Differential Equations (PDEs) in Physics and Engineering (e.g., Heat Transfer, Wave Propagation):** Many fundamental laws of physics are expressed as PDEs, describing how quantities like temperature, pressure, or displacement change over space and time. Fourier series provide a powerful method, often called "separation of variables," to find solutions to these equations, especially for problems with specific boundary conditions (e.g., a metal rod with fixed temperatures at its ends). For example, **NASA engineers** might use Fourier series to model heat distribution on a spacecraft's surface or analyze vibrations in a rocket engine, while **structural engineers** use it to understand how waves propagate through materials in buildings or bridges.

4.  **Vibration Analysis and Mechanical Engineering:** Fourier series are critical for analyzing the vibrations of mechanical systems, from car engines to large structures like bridges or aircraft wings. By decomposing complex vibration patterns into their fundamental frequency components, engineers can identify resonant frequencies (frequencies at which a system tends to oscillate with greater amplitude) and design systems to avoid catastrophic failures. This is vital in the design processes at companies like **Boeing** or **General Motors**.

## 3. Prerequisites — what you must know first

Before diving into the derivation of Fourier series coefficients, ensure you have a solid grasp of these foundational mathematical concepts. If any of these feel unfamiliar, pause and review them.

*   **Trigonometry:**
    *   **Basic trigonometric functions:** Sine ($\sin x$), Cosine ($\cos x$). Understanding their graphs, periodicity, and fundamental properties.
    *   **Trigonometric identities:** Especially product-to-sum identities (e.g., $\sin A \cos B$, $\cos A \cos B$, $\sin A \sin B$). These are crucial for the orthogonality derivations.
    *   **Periodicity:** Understanding that $\sin(x+2\pi) = \sin x$ and $\cos(x+2\pi) = \cos x$. Generalizing to period $2L$.
*   **Calculus I (Single Variable Calculus):**
    *   **Integration:** Performing definite integrals. Understanding the Fundamental Theorem of Calculus.
    *   **Properties of integrals:** Linearity of integration ($\int (f(x) + g(x)) dx = \int f(x) dx + \int g(x) dx$, $\int c f(x) dx = c \int f(x) dx$).
    *   **Even and Odd Functions:** Recognizing and utilizing the properties of even and odd functions in integration (e.g., $\int_{-a}^a f(x) dx = 0$ if $f$ is odd, $\int_{-a}^a f(x) dx = 2 \int_0^a f(x) dx$ if $f$ is even).
*   **Calculus II (Advanced Single Variable Calculus):**
    *   **Integration by Parts:** The formula $\int u \, dv = uv - \int v \, du$. This will be used repeatedly in examples.
*   **Series:**
    *   **Infinite Sums:** Understanding the notation $\sum_{n=1}^\infty$ and the concept of an infinite series.
    *   **Convergence (conceptual):** While a deep understanding of series convergence tests isn't required for *deriving* coefficients, you should know that Fourier series are infinite sums and that their convergence properties are important for the *function itself*.
*   **Orthogonality of Functions:**
    *   **Vector Orthogonality (conceptual):** Recall that two vectors are orthogonal (perpendicular) if their dot product is zero.
    *   **Function Orthogonality:** This is the generalization. Two functions $f(x)$ and $g(x)$ are orthogonal over an interval $[a, b]$ if $\int_a^b f(x) g(x) dx = 0$. This concept is *the* cornerstone of Fourier series derivation.

## 4. The core idea — step by step

The core idea behind deriving Fourier series coefficients is to leverage a powerful property called **orthogonality**. Just like perpendicular vectors have a dot product of zero, certain functions (sines and cosines of different frequencies) have an "integral product" of zero over a specific interval. This allows us to "pick out" individual components of a complex function.

We will derive the coefficients for a function $f(x)$ defined on the interval $[-L, L]$ and assumed to be periodic with period $2L$. The general form of the Fourier series for such a function is:

$$ f(x) = a_0 + \sum_{n=1}^\infty \left( a_n \cos\left(\frac{n\pi x}{L}\right) + b_n \sin\left(\frac{n\pi x}{L}\right) \right) $$

Our goal is to find formulas for $a_0$, $a_n$, and $b_n$.

### Step 1: The Goal – Representing a Function as a Sum of Waves

*   **Plain-English Statement:** We want to express any reasonably well-behaved periodic function as an infinite sum of simple sine and cosine waves, plus a constant term. This constant term represents the average value of the function.
*   **Small Concrete Example:** Imagine a square wave. It's very sharp and angular. We want to show that by adding up enough smooth sine waves (and possibly a constant), we can get something that looks more and more like that square wave. The first few terms might look like a bumpy approximation, but as we add more terms (higher $n$), the approximation gets better.
*   **Formal/Mathematical Version:**
    Given a function $f(x)$ defined on $[-L, L]$ and periodic with period $2L$, we assume it can be represented by the Fourier series:
    $$ f(x) = a_0 + \sum_{n=1}^\infty \left( a_n \cos\left(\frac{n\pi x}{L}\right) + b_n \sin\left(\frac{n\pi x}{L}\right) \right) $$
    Here, $a_0$ is the constant term, $a_n$ are the coefficients for the cosine terms, and $b_n$ are the coefficients for the sine terms. The argument $\frac{n\pi x}{L}$ ensures that the functions $\cos\left(\frac{n\pi x}{L}\right)$ and $\sin\left(\frac{n\pi x}{L}\right)$ have a period of $2L/n$, meaning they complete $n$ full cycles over the interval $[-L, L]$.
*   **What Could Go Wrong:** Not all functions can be represented by a Fourier series, or at least not in a way that converges everywhere. For instance, functions with infinite discontinuities might cause problems. However, for most functions encountered in physics and engineering (those satisfying Dirichlet conditions), this representation holds.

### Step 2: The Orthogonality Principle – The Key to Isolation

*   **Plain-English Statement:** This is the most crucial idea. Imagine you have a collection of special "detectors," each tuned to a specific frequency of sine or cosine. When you pass a complex signal through these detectors, each detector only "lights up" for its specific frequency and ignores all others. Mathematically, this means that if you multiply two *different* sine or cosine waves (or a sine and a cosine wave) and integrate over a full period, the result is zero. If you multiply a sine/cosine wave by *itself* and integrate, you get a non-zero value related to its "energy."
*   **Small Concrete Example:**
    Consider the functions $\sin(x)$ and $\cos(2x)$. If we integrate their product over $[-\pi, \pi]$ (where $L=\pi$):
    $$ \int_{-\pi}^\pi \sin(x) \cos(2x) dx = 0 $$
    This is because they are "orthogonal." However, if we integrate $\sin(x)$ by itself:
    $$ \int_{-\pi}^\pi \sin^2(x) dx = \pi $$
    This non-zero result is what allows us to "extract" the coefficient for $\sin(x)$.
*   **Formal/Mathematical Version:**
    The orthogonality relations for sine and cosine functions over the interval $[-L, L]$ are:

    1.  $$ \int_{-L}^L \cos\left(\frac{m\pi x}{L}\right) \cos\left(\frac{n\pi x}{L}\right) dx = \begin{cases} L & \text{if } m=n \neq 0 \\ 2L & \text{if } m=n=0 \\ 0 & \text{if } m \neq n \end{cases} $$
    2.  $$ \int_{-L}^L \sin\left(\frac{m\pi x}{L}\right) \sin\left(\frac{n\pi x}{L}\right) dx = \begin{cases} L & \text{if } m=n \neq 0 \\ 0 & \text{if } m \neq n \end{cases} $$
    3.  $$ \int_{-L}^L \sin\left(\frac{m\pi x}{L}\right) \cos\left(\frac{n\pi x}{L}\right) dx = 0 \quad \text{for all integers } m, n \ge 0 $$
    These identities are derived using product-to-sum trigonometric formulas and basic integration. For example, $\cos A \cos B = \frac{1}{2}[\cos(A-B) + \cos(A+B)]$.
*   **What Could Go Wrong:** Misremembering the integration limits, forgetting the special case for $m=n=0$ in the cosine integral (which corresponds to the $a_0$ term), or mixing up the conditions for $m=n \neq 0$ versus $m \neq n$. Also, extending these relations to intervals other than a full period $2L$ without careful adjustment.

### Step 3: Finding $a_0$ – The Average Value

*   **Plain-English Statement:** The constant term $a_0$ represents the average value of the function over one period. To find it, we simply integrate the entire Fourier series over a full period. Because of orthogonality, all the sine and cosine terms will integrate to zero, leaving only the constant term.
*   **Small Concrete Example:** If a function oscillates symmetrically around zero (like $\sin x$), its average value is zero. If it's always positive (like $x^2$ on $(-\pi, \pi)$), its average value will be positive.
*   **Formal/Mathematical Version:**
    Start with the Fourier series expansion:
    $$ f(x) = a_0 + \sum_{n=1}^\infty \left( a_n \cos\left(\frac{n\pi x}{L}\right) + b_n \sin\left(\frac{n\pi x}{L}\right) \right) $$
    Integrate both sides from $-L$ to $L$:
    $$ \int_{-L}^L f(x) dx = \int_{-L}^L a_0 dx + \sum_{n=1}^\infty \left( \int_{-L}^L a_n \cos\left(\frac{n\pi x}{L}\right) dx + \int_{-L}^L b_n \sin\left(\frac{n\pi x}{L}\right) dx \right) $$
    Now, let's evaluate each integral on the right-hand side:
    *   $\int_{-L}^L a_0 dx = a_0 [x]_{-L}^L = a_0 (L - (-L)) = 2L a_0$
    *   For $n \ge 1$: $\int_{-L}^L \cos\left(\frac{n\pi x}{L}\right) dx = \left[ \frac{L}{n\pi} \sin\left(\frac{n\pi x}{L}\right) \right]_{-L}^L = \frac{L}{n\pi} (\sin(n\pi) - \sin(-n\pi)) = \frac{L}{n\pi} (0 - 0) = 0$
    *   For $n \ge 1$: $\int_{-L}^L \sin\left(\frac{n\pi x}{L}\right) dx = \left[ -\frac{L}{n\pi} \cos\left(\frac{n\pi x}{L}\right) \right]_{-L}^L = -\frac{L}{n\pi} (\cos(n\pi) - \cos(-n\pi)) = -\frac{L}{n\pi} (\cos(n\pi) - \cos(n\pi)) = 0$
    So, all the sine and cosine terms integrate to zero over the period. The equation simplifies to:
    $$ \int_{-L}^L f(x) dx = 2L a_0 $$
    Solving for $a_0$:
    $$ a_0 = \frac{1}{2L} \int_{-L}^L f(x) dx $$
*   **What Could Go Wrong:** Forgetting the $1/(2L)$ factor. This is a common mistake that leads to $a_0$ being off by a factor of $2L$.

### Step 4: Finding $a_n$ – The Cosine Coefficients

*   **Plain-English Statement:** To find the "volume" of a specific cosine wave (e.g., $\cos(3x)$), we multiply the entire function $f(x)$ by that specific cosine wave and then integrate over a full period. Because of the orthogonality principle, all other sine and cosine terms will vanish (integrate to zero), leaving only the term containing the desired cosine coefficient.
*   **Small Concrete Example:** If $f(x)$ contains a strong $\cos(2x)$ component, multiplying $f(x)$ by $\cos(2x)$ and integrating will "amplify" that component and cancel out all others.
*   **Formal/Mathematical Version:**
    Multiply both sides of the Fourier series by $\cos\left(\frac{m\pi x}{L}\right)$ (where $m$ is a positive integer) and integrate from $-L$ to $L$:
    $$ \int_{-L}^L f(x) \cos\left(\frac{m\pi x}{L}\right) dx = \int_{-L}^L a_0 \cos\left(\frac{m\pi x}{L}\right) dx + \sum_{n=1}^\infty \left( \int_{-L}^L a_n \cos\left(\frac{n\pi x}{L}\right) \cos\left(\frac{m\pi x}{L}\right) dx + \int_{-L}^L b_n \sin\left(\frac{n\pi x}{L}\right) \cos\left(\frac{m\pi x}{L}\right) dx \right) $$
    Let's analyze each term on the right-hand side using the orthogonality relations from Step 2:
    *   $\int_{-L}^L a_0 \cos\left(\frac{m\pi x}{L}\right) dx = a_0 \int_{-L}^L \cos\left(\frac{m\pi x}{L}\right) dx = 0$ (since $m \ge 1$, this integral is zero, as shown in Step 3).
    *   $\int_{-L}^L b_n \sin\left(\frac{n\pi x}{L}\right) \cos\left(\frac{m\pi x}{L}\right) dx = b_n \cdot 0 = 0$ (by orthogonality relation 3).
    *   The only non-zero term comes from the cosine-cosine product, specifically when $n=m$:
        $$ \int_{-L}^L a_n \cos\left(\frac{n\pi x}{L}\right) \cos\left(\frac{m\pi x}{L}\right) dx = a_m \int_{-L}^L \cos^2\left(\frac{m\pi x}{L}\right) dx $$
        By orthogonality relation 1 (for $m=n \neq 0$), this integral is $L$.
    So, the entire equation simplifies to:
    $$ \int_{-L}^L f(x) \cos\left(\frac{m\pi x}{L}\right) dx = a_m L $$
    Replacing $m$ with $n$ to get the general formula for $a_n$:
    $$ a_n = \frac{1}{L} \int_{-L}^L f(x) \cos\left(\frac{n\pi x}{L}\right) dx \quad \text{for } n=1, 2, 3, \dots $$
*   **What Could Go Wrong:** Forgetting the $1/L$ factor. This is a very common error. Also, accidentally including $n=0$ in this formula; the $a_0$ term is handled separately (though this formula *would* give $a_0$ if you used $2L$ in the denominator and defined $\cos(0)=1$). It's safer to keep $a_0$ separate.

### Step 5: Finding $b_n$ – The Sine Coefficients

*   **Plain-English Statement:** Similar to finding $a_n$, to find the "volume" of a specific sine wave (e.g., $\sin(5x)$), we multiply $f(x)$ by that specific sine wave and integrate over a full period. Again, orthogonality ensures that only the term containing the desired sine coefficient survives.
*   **Small Concrete Example:** If $f(x)$ is an odd function (like $x^3$), it will only have sine terms in its Fourier series, and all cosine coefficients ($a_n$) will be zero.
*   **Formal/Mathematical Version:**
    Multiply both sides of the Fourier series by $\sin\left(\frac{m\pi x}{L}\right)$ (where $m$ is a positive integer) and integrate from $-L$ to $L$:
    $$ \int_{-L}^L f(x) \sin\left(\frac{m\pi x}{L}\right) dx = \int_{-L}^L a_0 \sin\left(\frac{m\pi x}{L}\right) dx + \sum_{n=1}^\infty \left( \int_{-L}^L a_n \cos\left(\frac{n\pi x}{L}\right) \sin\left(\frac{m\pi x}{L}\right) dx + \int_{-L}^L b_n \sin\left(\frac{n\pi x}{L}\right) \sin\left(\frac{m\pi x}{L}\right) dx \right) $$
    Let's analyze each term on the right-hand side using the orthogonality relations from Step 2:
    *   $\int_{-L}^L a_0 \sin\left(\frac{m\pi x}{L}\right) dx = a_0 \int_{-L}^L \sin\left(\frac{m\pi x}{L}\right) dx = 0$ (since $m \ge 1$, this integral is zero, as shown in Step 3).
    *   $\int_{-L}^L a_n \cos\left(\frac{n\pi x}{L}\right) \sin\left(\frac{m\pi x}{L}\right) dx = a_n \cdot 0 = 0$ (by orthogonality relation 3).
    *   The only non-zero term comes from the sine-sine product, specifically when $n=m$:
        $$ \int_{-L}^L b_n \sin\left(\frac{n\pi x}{L}\right) \sin\left(\frac{m\pi x}{L}\right) dx = b_m \int_{-L}^L \sin^2\left(\frac{m\pi x}{L}\right) dx $$
        By orthogonality relation 2 (for $m=n \neq 0$), this integral is $L$.
    So, the entire equation simplifies to:
    $$ \int_{-L}^L f(x) \sin\left(\frac{m\pi x}{L}\right) dx = b_m L $$
    Replacing $m$ with $n$ to get the general formula for $b_n$:
    $$ b_n = \frac{1}{L} \int_{-L}^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx \quad \text{for } n=1, 2, 3, \dots $$
*   **What Could Go Wrong:** Forgetting the $1/L$ factor. Also, mixing up the sine and cosine functions in the integral.

**Summary of Fourier Coefficients for a function $f(x)$ on $[-L, L]$:**

$$ a_0 = \frac{1}{2L} \int_{-L}^L f(x) dx $$
$$ a_n = \frac{1}{L} \int_{-L}^L f(x) \cos\left(\frac{n\pi x}{L}\right) dx \quad \text{for } n=1, 2, 3, \dots $$
$$ b_n = \frac{1}{L} \int_{-L}^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx \quad \text{for } n=1, 2, 3, \dots $$

## 5. Worked examples — multiple, with every step shown

Here we will work through several examples to solidify the derivation process. We will use the interval $[-\pi, \pi]$, which means $L=\pi$. In this case, the formulas simplify to:

$$ a_0 = \frac{1}{2\pi} \int_{-\pi}^\pi f(x) dx $$
$$ a_n = \frac{1}{\pi} \int_{-\pi}^\pi f(x) \cos(nx) dx \quad \text{for } n=1, 2, 3, \dots $$
$$ b_n = \frac{1}{\pi} \int_{-\pi}^\pi f(x) \sin(nx) dx \quad \text{for } n=1, 2, 3, \dots $$

Remember the following useful values:
*   $\sin(n\pi) = 0$ for any integer $n$.
*   $\cos(n\pi) = (-1)^n$ for any integer $n$.

---

### Example 1 (Easy): Find the Fourier series coefficients for $f(x) = x$ on $(-\pi, \pi)$.

**Problem Statement:** Find the Fourier series coefficients $a_0, a_n, b_n$ for the function $f(x) = x$ defined on the interval $(-\pi, \pi)$.

**Given:** $f(x) = x$, interval is $(-\pi, \pi)$, so $L=\pi$.
**We want:** $a_0, a_n, b_n$.

**Step 1: Calculate $a_0$**
$$ a_0 = \frac{1}{2\pi} \int_{-\pi}^\pi f(x) dx $$
Substitute $f(x) = x$:
$$ a_0 = \frac{1}{2\pi} \int_{-\pi}^\pi x \, dx $$
The function $f(x) = x$ is an odd function. The integral of an odd function over a symmetric interval $[-a, a]$ is always zero.
$$ a_0 = \frac{1}{2\pi} \left[ \frac{x^2}{2} \right]_{-\pi}^\pi $$
$$ a_0 = \frac{1}{2\pi} \left( \frac{\pi^2}{2} - \frac{(-\pi)^2}{2} \right) $$
$$ a_0 = \frac{1}{2\pi} \left( \frac{\pi^2}{2} - \frac{\pi^2}{2} \right) $$
$$ a_0 = \frac{1}{2\pi} (0) $$
$$ \boxed{a_0 = 0} $$
*Explanation:* The average value of $x$ over $(-\pi, \pi)$ is indeed zero, as it's symmetric around the origin.

**Step 2: Calculate $a_n$**
$$ a_n = \frac{1}{\pi} \int_{-\pi}^\pi f(x) \cos(nx) dx $$
Substitute $f(x) = x$:
$$ a_n = \frac{1}{\pi} \int_{-\pi}^\pi x \cos(nx) dx $$
The function $g(x) = x \cos(nx)$ is an odd function times an even function, which results in an odd function.
Therefore, the integral of $x \cos(nx)$ over the symmetric interval $(-\pi, \pi)$ is zero.
$$ \boxed{a_n = 0 \quad \text{for } n=1, 2, 3, \dots} $$
*Explanation:* Since $f(x)=x$ is an odd function, its Fourier series should only contain sine terms. This means all cosine coefficients ($a_n$) must be zero. This aligns with our calculation.

**Step 3: Calculate $b_n$**
$$ b_n = \frac{1}{\pi} \int_{-\pi}^\pi f(x) \sin(nx) dx $$
Substitute $f(x) = x$:
$$ b_n = \frac{1}{\pi} \int_{-\pi}^\pi x \sin(nx) dx $$
The function $g(x) = x \sin(nx)$ is an odd function times an odd function, which results in an even function.
Therefore, we can simplify the integral:
$$ b_n = \frac{1}{\pi} \cdot 2 \int_0^\pi x \sin(nx) dx $$
$$ b_n = \frac{2}{\pi} \int_0^\pi x \sin(nx) dx $$
We need to use integration by parts: $\int u \, dv = uv - \int v \, du$.
Let $u=x$ and $dv=\sin(nx) dx$.
Then $du=dx$ and $v = \int \sin(nx) dx = -\frac{1}{n} \cos(nx)$.
$$ b_n = \frac{2}{\pi} \left( \left[ x \left(-\frac{1}{n} \cos(nx)\right) \right]_0^\pi - \int_0^\pi \left(-\frac{1}{n} \cos(nx)\right) dx \right) $$
$$ b_n = \frac{2}{\pi} \left( \left[ -\frac{x}{n} \cos(nx) \right]_0^\pi + \frac{1}{n} \int_0^\pi \cos(nx) dx \right) $$
Evaluate the first term:
$$ \left[ -\frac{x}{n} \cos(nx) \right]_0^\pi = \left( -\frac{\pi}{n} \cos(n\pi) \right) - \left( -\frac{0}{n} \cos(0) \right) $$
$$ = -\frac{\pi}{n} (-1)^n - 0 = -\frac{\pi}{n} (-1)^n $$
Evaluate the integral term:
$$ \frac{1}{n} \int_0^\pi \cos(nx) dx = \frac{1}{n} \left[ \frac{1}{n} \sin(nx) \right]_0^\pi $$
$$ = \frac{1}{n^2} (\sin(n\pi) - \sin(0)) = \frac{1}{n^2} (0 - 0) = 0 $$
Substitute these back into the expression for $b_n$:
$$ b_n = \frac{2}{\pi} \left( -\frac{\pi}{n} (-1)^n + 0 \right) $$
$$ b_n = \frac{2}{\pi} \left( -\frac{\pi}{n} (-1)^n \right) $$
$$ b_n = -\frac{2}{n} (-1)^n $$
This can also be written as:
$$ b_n = \frac{2}{n} (-1)^{n+1} $$
$$ \boxed{b_n = \frac{2(-1)^{n+1}}{n} \quad \text{for } n=1, 2, 3, \dots} $$

**Final Answer Summary:**
$$ \boxed{a_0 = 0, \quad a_n = 0, \quad b_n = \frac{2(-1)^{n+1}}{n}} $$

**Reflection:** This example was relatively easy because $f(x)=x$ is an odd function, which immediately tells us $a_0=0$ and $a_n=0$. The main challenge was correctly applying integration by parts and evaluating the terms at the limits.

---

### Example 2 (Medium): Find the Fourier series coefficients for $f(x) = x^2$ on $(-\pi, \pi)$.

**Problem Statement:** Find the Fourier series coefficients $a_0, a_n, b_n$ for the function $f(x) = x^2$ defined on the interval $(-\pi, \pi)$.

**Given:** $f(x) = x^2$, interval is $(-\pi, \pi)$, so $L=\pi$.
**We want:** $a_0, a_n, b_n$.

**Step 1: Calculate $a_0$**
$$ a_0 = \frac{1}{2\pi} \int_{-\pi}^\pi f(x) dx $$
Substitute $f(x) = x^2$:
$$ a_0 = \frac{1}{2\pi} \int_{-\pi}^\pi x^2 \, dx $$
The function $f(x) = x^2$ is an even function. So, $\int_{-\pi}^\pi x^2 dx = 2 \int_0^\pi x^2 dx$.
$$ a_0 = \frac{1}{2\pi} \cdot 2 \int_0^\pi x^2 \, dx $$
$$ a_0 = \frac{1}{\pi} \int_0^\pi x^2 \, dx $$
$$ a_0 = \frac{1}{\pi} \left[ \frac{x^3}{3} \right]_0^\pi $$
$$ a_0 = \frac{1}{\pi} \left( \frac{\pi^3}{3} - \frac{0^3}{3} \right) $$
$$ a_0 = \frac{1}{\pi} \left( \frac{\pi^3}{3} \right) $$
$$ \boxed{a_0 = \frac{\pi^2}{3}} $$
*Explanation:* The average value of $x^2$ over $(-\pi, \pi)$ is positive, as expected, since $x^2 \ge 0$.

**Step 2: Calculate $a_n$**
$$ a_n = \frac{1}{\pi} \int_{-\pi}^\pi f(x) \cos(nx) dx $$
Substitute $f(x) = x^2$:
$$ a_n = \frac{1}{\pi} \int_{-\pi}^\pi x^2 \cos(nx) dx $$
The function $g(x) = x^2 \cos(nx)$ is an even function times an even function, which results in an even function.
Therefore, we can simplify the integral:
$$ a_n = \frac{1}{\pi} \cdot 2 \int_0^\pi x^2 \cos(nx) dx $$
$$ a_n = \frac{2}{\pi} \int_0^\pi x^2 \cos(nx) dx $$
We need to use integration by parts twice.
First application: Let $u=x^2$ and $dv=\cos(nx) dx$.
Then $du=2x \, dx$ and $v = \int \cos(nx) dx = \frac{1}{n} \sin(nx)$.
$$ a_n = \frac{2}{\pi} \left( \left[ x^2 \left(\frac{1}{n} \sin(nx)\right) \right]_0^\pi - \int_0^\pi \frac{1}{n} \sin(nx) (2x) dx \right) $$
$$ a_n = \frac{2}{\pi} \left( \left[ \frac{x^2}{n} \sin(nx) \right]_0^\pi - \frac{2}{n} \int_0^\pi x \sin(nx) dx \right) $$
Evaluate the first term:
$$ \left[ \frac{x^2}{n} \sin(nx) \right]_0^\pi = \left( \frac{\pi^2}{n} \sin(n\pi) \right) - \left( \frac{0^2}{n} \sin(0) \right) $$
Since $\sin(n\pi) = 0$ for integer $n$, this term is $0 - 0 = 0$.
So, $a_n$ simplifies to:
$$ a_n = \frac{2}{\pi} \left( - \frac{2}{n} \int_0^\pi x \sin(nx) dx \right) $$
$$ a_n = - \frac{4}{n\pi} \int_0^\pi x \sin(nx) dx $$
Now, we need to apply integration by parts again for $\int_0^\pi x \sin(nx) dx$.
Let $u=x$ and $dv=\sin(nx) dx$.
Then $du=dx$ and $v = -\frac{1}{n} \cos(nx)$.
$$ \int_0^\pi x \sin(nx) dx = \left[ x \left(-\frac{1}{n} \cos(nx)\right) \right]_0^\pi - \int_0^\pi \left(-\frac{1}{n} \cos(nx)\right) dx $$
$$ = \left[ -\frac{x}{n} \cos(nx) \right]_0^\pi + \frac{1}{n} \int_0^\pi \cos(nx) dx $$
Evaluate the first term:
$$ \left[ -\frac{x}{n} \cos(nx) \right]_0^\pi = \left( -\frac{\pi}{n} \cos(n\pi) \right) - \left( -\frac{0}{n} \cos(0) \right) = -\frac{\pi}{n} (-1)^n $$
Evaluate the integral term:
$$ \frac{1}{n} \int_0^\pi \cos(nx) dx = \frac{1}{n} \left[ \frac{1}{n} \sin(nx) \right]_0^\pi = \frac{1}{n^2} (\sin(n\pi) - \sin(0)) = 0 $$
So, $\int_0^\pi x \sin(nx) dx = -\frac{\pi}{n} (-1)^n$.
Substitute this back into the expression for $a_n$:
$$ a_n = - \frac{4}{n\pi} \left( -\frac{\pi}{n} (-1)^n \right) $$
$$ a_n = \frac{4}{n^2} (-1)^n $$
$$ \boxed{a_n = \frac{4(-1)^n}{n^2} \quad \text{for } n=1, 2, 3, \dots} $$

**Step 3: Calculate $b_n$**
$$ b_n = \frac{1}{\pi} \int_{-\pi}^\pi f(x) \sin(nx) dx $$
Substitute $f(x) = x^2$:
$$ b_n = \frac{1}{\pi} \int_{-\pi}^\pi x^2 \sin(nx) dx $$
The function $g(x) = x^2 \sin(nx)$ is an even function times an odd function, which results in an odd function.
Therefore, the integral of $x^2 \sin(nx)$ over the symmetric interval $(-\pi, \pi)$ is zero.
$$ \boxed{b_n = 0 \quad \text{for } n=1, 2, 3, \dots} $$
*Explanation:* Since $f(x)=x^2$ is an even function, its Fourier series should only contain cosine terms (and the constant $a_0$). This means all sine coefficients ($b_n$) must be zero.

**Final Answer Summary:**
$$ \boxed{a_0 = \frac{\pi^2}{3}, \quad a_n = \frac{4(-1)^n}{n^2}, \quad b_n = 0} $$

**Reflection:** This example was medium difficulty due to the need for two applications of integration by parts for $a_n$. Recognizing that $f(x)=x^2$ is an even function simplified the calculation by immediately setting $b_n=0$ and allowing us to integrate over $[0, \pi]$ for $a_0$ and $a_n$.

---

### Example 3 (Harder): Find the Fourier series coefficients for $f(x) = \begin{cases} 0 & -\pi < x < 0 \\ x & 0 < x < \pi \end{cases}$ on $(-\pi, \pi)$.

**Problem Statement:** Find the Fourier series coefficients $a_0, a_n, b_n$ for the function $f(x) = \begin{cases} 0 & -\pi < x < 0 \\ x & 0 < x < \pi \end{cases}$ defined on the interval $(-\pi, \pi)$.

**Given:** $f(x)$ is a piecewise function, interval is $(-\pi, \pi)$, so $L=\pi$.
**We want:** $a_0, a_n, b_n$.

This function is neither even nor odd, so we expect all three types of coefficients ($a_0, a_n, b_n$) to be non-zero. The integrals will be split into two parts: from $-\pi$ to $0$ (where $f(x)=0$) and from $0$ to $\pi$ (where $f(x)=x$).

**Step 1: Calculate $a_0$**
$$ a_0 = \frac{1}{2\pi} \int_{-\pi}^\pi f(x) dx $$
Split the integral:
$$ a_0 = \frac{1}{2\pi} \left( \int_{-\pi}^0 0 \, dx + \int_0^\pi x \, dx \right) $$
The first integral is $0$.
$$ a_0 = \frac{1}{2\pi} \left( 0 + \left[ \frac{x^2}{2} \right]_0^\pi \right) $$
$$ a_0 = \frac{1}{2\pi} \left( \frac{\pi^2}{2} - \frac{0^2}{2} \right) $$
$$ a_0 = \frac{1}{2\pi} \left( \frac{\pi^2}{2} \right) $$
$$ \boxed{a_0 = \frac{\pi}{4}} $$

**Step 2: Calculate $a_n$**
$$ a_n = \frac{1}{\pi} \int_{-\pi}^\pi f(x) \cos(nx) dx $$
Split the integral:
$$ a_n = \frac{1}{\pi} \left( \int_{-\pi}^0 0 \cdot \cos(nx) \, dx + \int_0^\pi x \cos(nx) \, dx \right) $$
The first integral is $0$.
$$ a_n = \frac{1}{\pi} \int_0^\pi x \cos(nx) \, dx $$
Use integration by parts: $\int u \, dv = uv - \int v \, du$.
Let $u=x$ and $dv=\cos(nx) dx$.
Then $du=dx$ and $v = \frac{1}{n} \sin(nx)$.
$$ a_n = \frac{1}{\pi} \left( \left[ x \left(\frac{1}{n} \sin(nx)\right) \right]_0^\pi - \int_0^\pi \frac{1}{n} \sin(nx) dx \right) $$
$$ a_n = \frac{1}{\pi} \left( \left[ \frac{x}{n} \sin(nx) \right]_0^\pi - \frac{1}{n} \int_0^\pi \sin(nx) dx \right) $$
Evaluate the first term:
$$ \left[ \frac{x}{n} \sin(nx) \right]_0^\pi = \left( \frac{\pi}{n} \sin(n\pi) \right) - \left( \frac{0}{n} \sin(0) \right) = 0 - 0 = 0 $$
Evaluate the integral term:
$$ - \frac{1}{n} \int_0^\pi \sin(nx) dx = - \frac{1}{n} \left[ -\frac{1}{n} \cos(nx) \right]_0^\pi $$
$$ = \frac{1}{n^2} \left[ \cos(nx) \right]_0^\pi $$
$$ = \frac{1}{n^2} (\cos(n\pi) - \cos(0)) $$
$$ = \frac{1}{n^2} ((-1)^n - 1) $$
Substitute these back into the expression for $a_n$:
$$ a_n = \frac{1}{\pi} \left( 0 + \frac{1}{n^2} ((-1)^n - 1) \right) $$
$$ \boxed{a_n = \frac{(-1)^n - 1}{\pi n^2} \quad \text{for } n=1, 2, 3, \dots} $$
Note: This means $a_n = 0$ if $n$ is even, and $a_n = \frac{-2}{\pi n^2}$ if $n$ is odd.

**Step 3: Calculate $b_n$**
$$ b_n = \frac{1}{\pi} \int_{-\pi}^\pi f(x) \sin(nx) dx $$
Split the integral:
$$ b_n = \frac{1}{\pi} \left( \int_{-\pi}^0 0 \cdot \sin(nx) \, dx + \int_0^\pi x \sin(nx) \, dx \right) $$
The first integral is $0$.
$$ b_n = \frac{1}{\pi} \int_0^\pi x \sin(nx) \, dx $$
Use integration by parts: $\int u \, dv = uv - \int v \, du$.
Let $u=x$ and $dv=\sin(nx) dx$.
Then $du=dx$ and $v = -\frac{1}{n} \cos(nx)$.
$$ b_n = \frac{1}{\pi} \left( \left[ x \left(-\frac{1}{n} \cos(nx)\right) \right]_0^\pi - \int_0^\pi \left(-\frac{1}{n} \cos(nx)\right) dx \right) $$
$$ b_n = \frac{1}{\pi} \left( \left[ -\frac{x}{n} \cos(nx) \right]_0^\pi + \frac{1}{n} \int_0^\pi \cos(nx) dx \right) $$
Evaluate the first term:
$$ \left[ -\frac{x}{n} \cos(nx) \right]_0^\pi = \left( -\frac{\pi}{n} \cos(n\pi) \right) - \left( -\frac{0}{n} \cos(0) \right) = -\frac{\pi}{n} (-1)^n $$
Evaluate the integral term:
$$ \frac{1}{n} \int_0^\pi \cos(nx) dx = \frac{1}{n} \left[ \frac{1}{n} \sin(nx) \right]_0^\pi $$
$$ = \frac{1}{n^2} (\sin(n\pi) - \sin(0)) = \frac{1}{n^2} (0 - 0) = 0 $$
Substitute these back into the expression for $b_n$:
$$ b_n = \frac{1}{\pi} \left( -\frac{\pi}{n} (-1)^n + 0 \right) $$
$$ b_n = -\frac{1}{n} (-1)^n $$
This can also be written as:
$$ b_n = \frac{(-1)^{n+1}}{n} $$
$$ \boxed{b_n = \frac{(-1)^{n+1}}{n} \quad \text{for } n=1, 2, 3, \dots} $$

**Final Answer Summary:**
$$ \boxed{a_0 = \frac{\pi}{4}, \quad a_n = \frac{(-1)^n - 1}{\pi n^2}, \quad b_n = \frac{(-1)^{n+1}}{n}} $$

**Reflection:** This example was harder because the function was piecewise defined, meaning we had to split the integrals. Also, the function was neither even nor odd, so all three types of coefficients had to be calculated, each requiring integration by parts. Careful evaluation of the limits and trigonometric values was crucial.

---

### Example 4 (Hardest): Find the Fourier series coefficients for $f(x) = e^x$ on $(-L, L)$.

**Problem Statement:** Find the Fourier series coefficients $a_0, a_n, b_n$ for the function $f(x) = e^x$ defined on the interval $(-L, L)$.

**Given:** $f(x) = e^x$, interval is $(-L, L)$.
**We want:** $a_0, a_n, b_n$.

This function is neither even nor odd, so we expect all three coefficients to be non-zero. This example is harder because the integrals involving $e^x$ and trigonometric functions require integration by parts twice, and careful algebraic manipulation.

**Step 1: Calculate $a_0$**
$$ a_0 = \frac{1}{2L} \int_{-L}^L f(x) dx $$
Substitute $f(x) = e^x$:
$$ a_0 = \frac{1}{2L} \int_{-L}^L e^x \, dx $$
$$ a_0 = \frac{1}{2L} \left[ e^x \right]_{-L}^L $$
$$ a_0 = \frac{1}{2L} (e^L - e^{-L}) $$
This can be expressed using the hyperbolic sine function: $\sinh(L) = \frac{e^L - e^{-L}}{2}$.
$$ \boxed{a_0 = \frac{\sinh(L)}{L}} $$

**Step 2: Calculate $a_n$**
$$ a_n = \frac{1}{L} \int_{-L}^L f(x) \cos\left(\frac{n\pi x}{L}\right) dx $$
Substitute $f(x) = e^x$:
$$ a_n = \frac{1}{L} \int_{-L}^L e^x \cos\left(\frac{n\pi x}{L}\right) dx $$
This integral requires integration by parts twice. Let $I = \int e^x \cos(kx) dx$ where $k = \frac{n\pi}{L}$.
Let $u = \cos(kx)$ and $dv = e^x dx$. Then $du = -k \sin(kx) dx$ and $v = e^x$.
$$ I = e^x \cos(kx) - \int e^x (-k \sin(kx)) dx $$
$$ I = e^x \cos(kx) + k \int e^x \sin(kx) dx $$
Now, for the second integral, let $u = \sin(kx)$ and $dv = e^x dx$. Then $du = k \cos(kx) dx$ and $v = e^x$.
$$ \int e^x \sin(kx) dx = e^x \sin(kx) - \int e^x (k \cos(kx)) dx $$
$$ = e^x \sin(kx) - k \int e^x \cos(kx) dx $$
Substitute this back into the expression for $I$:
$$ I = e^x \cos(kx) + k (e^x \sin(kx) - k I) $$
$$ I = e^x \cos(kx) + k e^x \sin(kx) - k^2 I $$
Rearrange to solve for $I$:
$$ I + k^2 I = e^x \cos(kx) + k e^x \sin(kx) $$
$$ I (1 + k^2) = e^x (\cos(kx) + k \sin(kx)) $$
$$ I = \frac{e^x}{1+k^2} (\cos(kx) + k \sin(kx)) $$
Now, substitute $k = \frac{n\pi}{L}$ back in and evaluate the definite integral from $-L$ to $L$:
$$ a_n = \frac{1}{L} \left[ \frac{e^x}{1 + \left(\frac{n\pi}{L}\right)^2} \left( \cos\left(\frac{n\pi x}{L}\right) + \frac{n\pi}{L} \sin\left(\frac{n\pi x}{L}\right) \right) \right]_{-L}^L $$
Let's evaluate the terms at the limits.
Recall $\cos(n\pi) = (-1)^n$ and $\sin(n\pi) = 0$.
At $x=L$:
$$ \frac{e^L}{1 + \left(\frac{n\pi}{L}\right)^2} \left( \cos(n\pi) + \frac{n\pi}{L} \sin(n\pi) \right) = \frac{e^L}{1 + \left(\frac{n\pi}{L}\right)^2} ((-1)^n + 0) = \frac{e^L (-1)^n}{1 + \left(\frac{n\pi}{L}\right)^2} $$
At $x=-L$:
$$ \frac{e^{-L}}{1 + \left(\frac{n\pi}{L}\right)^2} \left( \cos(-n\pi) + \frac{n\pi}{L} \sin(-n\pi) \right) = \frac{e^{-L}}{1 + \left(\frac{n\pi}{L}\right)^2} ((-1)^n + 0) = \frac{e^{-L} (-1)^n}{1 + \left(\frac{n\pi}{L}\right)^2} $$
Subtracting the lower limit from the upper limit:
$$ a_n = \frac{1}{L} \left( \frac{e^L (-1)^n}{1 + \left(\frac{n\pi}{L}\right)^2} - \frac{e^{-L} (-1)^n}{1 + \left(\frac{n\pi}{L}\right)^2} \right) $$
$$ a_n = \frac{1}{L} \frac{(-1)^n (e^L - e^{-L})}{1 + \left(\frac{n\pi}{L}\right)^2} $$
Simplify the denominator: $1 + \left(\frac{n\pi}{L}\right)^2 = \frac{L^2 + (n\pi)^2}{L^2}$.
$$ a_n = \frac{1}{L} \frac{(-1)^n (e^L - e^{-L})}{\frac{L^2 + (n\pi)^2}{L^2}} $$
$$ a_n = \frac{1}{L} \frac{L^2 (-1)^n (e^L - e^{-L})}{L^2 + (n\pi)^2} $$
$$ a_n = \frac{L (-1)^n (e^L - e^{-L})}{L^2 + (n\pi)^2} $$
Using $\sinh(L) = \frac{e^L - e^{-L}}{2}$:
$$ \boxed{a_n = \frac{2L (-1)^n \sinh(L)}{L^2 + (n\pi)^2} \quad \text{for } n=1, 2, 3, \dots} $$

**Step 3: Calculate $b_n$**
$$ b_n = \frac{1}{L} \int_{-L}^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx $$
Substitute $f(x) = e^x$:
$$ b_n = \frac{1}{L} \int_{-L}^L e^x \sin\left(\frac{n\pi x}{L}\right) dx $$
Again, this integral requires integration by parts twice. We already found $\int e^x \sin(kx) dx = e^x \sin(kx) - k \int e^x \cos(kx) dx$.
From the $a_n$ calculation, we know $I = \int e^x \cos(kx) dx = \frac{e^x}{1+k^2} (\cos(kx) + k \sin(kx))$.
So, let $J = \int e^x \sin(kx) dx$.
$$ J = e^x \sin(kx) - k \left[ \frac{e^x}{1+k^2} (\cos(kx) + k \sin(kx)) \right] $$
This is not the most efficient way. Let's start the integration by parts for $J$ from scratch, similar to how we did $I$.
Let $J = \int e^x \sin(kx) dx$.
Let $u = \sin(kx)$ and $dv = e^x dx$. Then $du = k \cos(kx) dx$ and $v = e^x$.
$$ J = e^x \sin(kx) - \int e^x (k \cos(kx)) dx $$
$$ J = e^x \sin(kx) - k \int e^x \cos(kx) dx $$
Now, for the second integral, let $u = \cos(kx)$ and $dv = e^x dx$. Then $du = -k \sin(kx) dx$ and $v = e^x$.
$$ \int e^x \cos(kx) dx = e^x \cos(kx) - \int e^x (-k \sin(kx)) dx $$
$$ = e^x \cos(kx) + k \int e^x \sin(kx) dx $$
Substitute this back into the expression for $J$:
$$ J = e^x \sin(kx) - k (e^x \cos(kx) + k J) $$
$$ J = e^x \sin(kx) - k e^x \cos(kx) - k^2 J $$
Rearrange to solve for $J$:
$$ J + k^2 J = e^x \sin(kx) - k e^x \cos(kx) $$
$$ J (1 + k^2) = e^x (\sin(kx) - k \cos(kx)) $$
$$ J = \frac{e^x}{1+k^2} (\sin(kx) - k \cos(kx)) $$
Now, substitute $k = \frac{n\pi}{L}$ back in and evaluate the definite integral from $-L$ to $L$:
$$ b_n = \frac{1}{L} \left[ \frac{e^x}{1 + \left(\frac{n\pi}{L}\right)^2} \left( \sin\left(\frac{n\pi x}{L}\right) - \frac{n\pi}{L} \cos\left(\frac{n\pi x}{L}\right) \right) \right]_{-L}^L $$
Let's evaluate the terms at the limits.
Recall $\cos(n\pi) = (-1)^n$ and $\sin(n\pi) = 0$.
At $x=L$:
$$ \frac{e^L}{1 + \left(\frac{n\pi}{L}\right)^2} \left( \sin(n\pi) - \frac{n\pi}{L} \cos(n\pi) \right) = \frac{e^L}{1 + \left(\frac{n\pi}{L}\right)^2} (0 - \frac{n\pi}{L} (-1)^n) = \frac{-e^L \frac{n\pi}{L} (-1)^n}{1 + \left(\frac{n\pi}{L}\right)^2} $$
At $x=-L$:
$$ \frac{e^{-L}}{1 + \left(\frac{n\pi}{L}\right)^2} \left( \sin(-n\pi) - \frac{n\pi}{L} \cos(-n\pi) \right) = \frac{e^{-L}}{1 + \left(\frac{n\pi}{L}\right)^2} (0 - \frac{n\pi}{L} (-1)^n) = \frac{-e^{-L} \frac{n\pi}{L} (-1)^n}{1 + \left(\frac{n\pi}{L}\right)^2} $$
Subtracting the lower limit from the upper limit:
$$ b_n = \frac{1}{L} \left( \frac{-e^L \frac{n\pi}{L} (-1)^n}{1 + \left(\frac{n\pi}{L}\right)^2} - \frac{-e^{-L} \frac{n\pi}{L} (-1)^n}{1 + \left(\frac{n\pi}{L}\right)^2} \right) $$
$$ b_n = \frac{1}{L} \frac{-\frac{n\pi}{L} (-1)^n (e^L - e^{-L})}{1 + \left(\frac{n\pi}{L}\right)^2} $$
Simplify the denominator as before: $1 + \left(\frac{n\pi}{L}\right)^2 = \frac{L^2 + (n\pi)^2}{L^2}$.
$$ b_n = \frac{1}{L} \frac{-\frac{n\pi}{L} (-1)^n (e^L - e^{-L})}{\frac{L^2 + (n\pi)^2}{L^2}} $$
$$ b_n = \frac{1}{L} \frac{-n\pi (-1)^n (e^L - e^{-L})}{L^2 + (n\pi)^2} $$
$$ b_n = \frac{-n\pi (-1)^n (e^L - e^{-L})}{L(L^2 + (n\pi)^2)} $$
Using $\sinh(L) = \frac{e^L - e^{-L}}{2}$:
$$ \boxed{b_n = \frac{-2n\pi (-1)^n \sinh(L)}{L(L^2 + (n\pi)^2)} \quad \text{for } n=1, 2, 3, \dots} $$
This can also be written as $b_n = \frac{2n\pi (-1)^{n+1} \sinh(L)}{L(L^2 + (n\pi)^2)}$.

**Final Answer Summary:**
$$ \boxed{a_0 = \frac{\sinh(L)}{L}, \quad a_n = \frac{2L (-1)^n \sinh(L)}{L^2 + (n\pi)^2}, \quad b_n = \frac{2n\pi (-1)^{n+1} \sinh(L)}{L(L^2 + (n\pi)^2)}} $$

**Reflection:** This was the hardest example due to the exponential function requiring integration by parts twice for both $a_n$ and $b_n$. The algebraic manipulation to simplify the expressions and evaluate them at the limits was also more involved. It's crucial to be meticulous with