## 1. What it is — in plain English

Imagine you have a really complicated sound, like a symphony orchestra playing a grand piece. It sounds like one big, rich sound, right? But deep down, it's just a combination of many simpler, pure sounds: the clear note of a flute, the deep rumble of a cello, the bright clang of a cymbal. Each instrument plays its own simple wave of sound, and when you add them all up, you get the complex symphony.

Fourier series does something similar, but for any repeating pattern, not just sound. Think of a repeating wiggle, like a wave on a pond, or the pattern of a heart monitor, or even the up-and-down temperature changes over a year. If this pattern repeats perfectly, Fourier series says we can break it down into a sum of very simple, smooth, pure waves.

These "pure waves" are just sine and cosine waves – the basic, smooth, endlessly repeating curves you might remember from trigonometry. Each of these sine and cosine waves has a different "speed" (frequency) and a different "strength" (amplitude). The amazing thing is that by adding up enough of these simple sine and cosine waves, with the right speeds and strengths, we can perfectly recreate *any* repeating pattern, no matter how jagged or complex it looks.

So, in a nutshell, a Fourier series is a way to represent any periodic (repeating) function as an infinite sum of sines and cosines. It's like finding the "recipe" for a complex repeating pattern, telling you exactly which simple waves to combine and how much of each to use.

## 2. Why it matters — real-world applications

Fourier series, and its more general cousin the Fourier Transform, are fundamental tools across almost all scientific and engineering disciplines. They allow us to move from analyzing signals in terms of time or space (the "time domain" or "spatial domain") to analyzing them in terms of their constituent frequencies (the "frequency domain"), which often reveals hidden structures and simplifies problems.

1.  **Signal Processing (Audio & Image Compression):** This is one of the most direct applications. When you listen to an MP3 file on Spotify or look at a JPEG image from your digital camera, you're benefiting from Fourier analysis. Complex audio waveforms or image data (which are just 2D signals) are broken down into their frequency components. Humans are less sensitive to certain high-frequency components, so these can be discarded without a noticeable loss in quality, leading to massive file size reductions. Companies like **Dolify** (audio processing) or **Adobe** (image editing software) use these principles extensively.

2.  **Physics (Heat Conduction & Wave Phenomena):** Fourier series were originally developed by Joseph Fourier in the early 19th century to solve the heat equation. If you have a metal rod with a complex initial temperature distribution and you want to know how the heat spreads over time, you can represent that initial distribution as a Fourier series. Each sine/cosine term in the series corresponds to a particular "mode" of heat diffusion, which simplifies solving the differential equation. This is crucial for understanding thermal management in everything from microchips (e.g., by **Intel** or **NVIDIA**) to spacecraft (e.g., by **NASA** or **SpaceX**). Similarly, understanding wave propagation (sound waves, light waves, quantum mechanical wave functions) often involves decomposing complex waves into simpler harmonic components using Fourier series.

3.  **Engineering (Vibration Analysis & Control Systems):** In mechanical engineering, Fourier series are used to analyze vibrations in structures like bridges, buildings, or aircraft wings. If a bridge is subjected to a periodic force (like wind gusts or traffic), its response can be understood by decomposing the force into its harmonic components. Engineers at companies like **Boeing** or **Siemens** use this to design structures that avoid resonant frequencies that could lead to catastrophic failure. In control systems, understanding the frequency response of a system (how it reacts to different input frequencies) is vital for designing stable and efficient controllers, for example, in robotics or automated manufacturing.

4.  **Medical Imaging (MRI):** Magnetic Resonance Imaging (MRI) is a powerful diagnostic tool that heavily relies on Fourier transforms (a continuous version of Fourier series). The signals emitted by the body's tissues in response to radio frequency pulses are complex time-domain signals. Fourier transforms are used to convert these signals into spatial frequency data, which is then reconstructed to create detailed images of organs and soft tissues. Companies like **GE Healthcare** and **Philips Healthcare** are at the forefront of developing MRI technology.

## 3. Prerequisites — what you must know first

Before diving deep into Fourier series, ensure you have a solid grasp of these foundational concepts. If any of these feel unfamiliar, pause and review them first.

*   **Functions:**
    *   **Definition:** What a function is, its domain, range, and how to evaluate it.
    *   **Graphing:** How to sketch common functions.
*   **Trigonometric Functions:**
    *   **Sine and Cosine:** Their definitions, graphs, basic properties (amplitude, period, phase shift).
    *   **Periodicity:** Understanding that $\sin(x)$ and $\cos(x)$ repeat every $2\pi$.
    *   **Trigonometric Identities:** Especially $\sin^2(x) + \cos^2(x) = 1$, double angle formulas, and product-to-sum identities (these are crucial for derivations).
*   **Integrals:**
    *   **Definite Integrals:** How to calculate them and what they represent (area under a curve).
    *   **Properties of Integrals:** Linearity, additivity over intervals.
    *   **Integration Techniques:** Substitution, and critically, **Integration by Parts** (often needed multiple times in Fourier series calculations).
    *   **Improper Integrals:** (Less critical for basic Fourier series, but good to know for convergence discussions).
*   **Series:**
    *   **Infinite Series:** The concept of an infinite sum, sigma notation ($\sum$).
    *   **Convergence:** What it means for a series to converge to a finite value (though detailed convergence tests are not strictly required for the basic calculation of coefficients).
*   **Orthogonality:**
    *   **Vector Orthogonality:** The geometric idea of perpendicular vectors (dot product is zero).
    *   **Function Orthogonality (Inner Product):** Extending this idea to functions, where the "dot product" is an integral. This is the mathematical backbone of why Fourier series works.
*   **Periodicity of Functions:**
    *   **Definition:** A function $f(x)$ is periodic with period $T$ if $f(x+T) = f(x)$ for all $x$ in its domain. The smallest such positive $T$ is the fundamental period.

## 4. The core idea — step by step

Let's build up the concept of Fourier series, starting from the very basics of periodic functions and gradually introducing the mathematical machinery.

### Step 1: What is a periodic function?

**Plain English:** Imagine a pattern that repeats itself perfectly, over and over again. A periodic function is simply a mathematical way to describe such a repeating pattern. The "period" is the length of one complete cycle of the pattern.

**Small concrete example:**
*   The function $f(x) = \sin(x)$ is periodic. Its graph goes up and down, completing one full wave and returning to its starting point every $2\pi$ units along the x-axis. So, its period is $2\pi$.
*   The function $f(x) = \cos(2x)$ is also periodic. Because of the $2x$ inside, it completes a full cycle faster. Its period is $\pi$.
*   A square wave (like an on/off switch repeating) is also a periodic function, even though it's not smooth.

**Formal/Mathematical version:**
A function $f(x)$ is said to be **periodic** with period $T > 0$ if for all $x$ in the domain of $f$,
$$f(x+T) = f(x)$$
The smallest positive value of $T$ for which this holds is called the **fundamental period**.

**What could go wrong:**
Confusing the period $T$ with the frequency. Frequency is $1/T$. Also, sometimes a function might satisfy $f(x+T)=f(x)$ for a $T$ that isn't the *fundamental* period (e.g., $\sin(x)$ has period $2\pi$, but also satisfies $\sin(x+4\pi)=\sin(x)$). We usually care about the fundamental period.

### Step 2: The building blocks — sines and cosines

**Plain English:** If we want to build any repeating pattern, what are the simplest repeating patterns we can use? The answer is sine and cosine waves. These are the "pure notes" in our mathematical orchestra. They are smooth, perfectly periodic, and come in different "speeds" or frequencies.

**Small concrete example:**
*   $\cos(x)$ has a period of $2\pi$.
*   $\cos(2x)$ has a period of $\pi$. It completes two cycles in the same time $\cos(x)$ completes one.
*   $\cos(nx)$ has a period of $2\pi/n$. It completes $n$ cycles in the same time $\cos(x)$ completes one.
*   Similarly for $\sin(nx)$.
These functions are our basic harmonic components.

**Formal/Mathematical version:**
For any integer $n \ge 1$, the functions $\sin(nx)$ and $\cos(nx)$ are periodic with period $2\pi/n$. They form a set of fundamental harmonic functions.
If our function $f(x)$ has a period of $2\pi$, then these $\sin(nx)$ and $\cos(nx)$ functions are perfectly suited as building blocks because they all share a common period of $2\pi$ (or an integer multiple of $2\pi$).
For example, $\cos(2x)$ has period $\pi$, but it also repeats every $2\pi$. $\cos(3x)$ has period $2\pi/3$, but it also repeats every $2\pi$.

**What could go wrong:**
Forgetting that $n$ must be an integer. If $n$ were not an integer (e.g., $\sin(0.5x)$), then $\sin(nx)$ might not share a common period with $\sin(mx)$ for integer $m$, or with the original function $f(x)$ if $f(x)$ has period $2\pi$. The integer $n$ ensures that all these building blocks "fit" within the overall period of $2\pi$.

### Step 3: Combining the building blocks

**Plain English:** The core idea of a Fourier series is that we can take our simple sine and cosine waves, give each one a certain "strength" or "volume" (called a coefficient), and then add them all up. If we use enough of these (an infinite number, theoretically), we can perfectly reconstruct *any* periodic function. We also need a constant term ($a_0$) to account for the average value or vertical shift of the function.

**Small concrete example:**
Suppose we want to approximate a square wave. We might start with:
$f(x) \approx a_0 + a_1\cos(x) + b_1\sin(x) + a_2\cos(2x) + b_2\sin(2x)$
The coefficients $a_0, a_1, b_1, a_2, b_2$ tell us how much of each pure wave to include. For a square wave, it turns out only sine terms are needed, and specifically, odd-numbered ones. So, it might look like:
$f(x) \approx \frac{4}{\pi} \sin(x) + \frac{4}{3\pi} \sin(3x) + \frac{4}{5\pi} \sin(5x) + \dots$
As we add more terms, the approximation gets closer and closer to the sharp edges of the square wave.

**Formal/Mathematical version:**
For a function $f(x)$ with period $2\pi$, its Fourier series representation is given by:
$$f(x) = a_0 + \sum_{n=1}^\infty (a_n \cos(nx) + b_n \sin(nx))$$
Here:
*   $a_0$ is the constant term, representing the average value of the function.
*   $a_n$ are the **Fourier cosine coefficients**, representing the "strength" of the $\cos(nx)$ component.
*   $b_n$ are the **Fourier sine coefficients**, representing the "strength" of the $\sin(nx)$ component.
The sum goes to infinity, meaning we theoretically use an infinite number of these simple waves. In practice, we often use a finite number of terms for approximation.

**What could go wrong:**
Thinking that *any* sum of sines and cosines will work. The key is that the coefficients $a_n$ and $b_n$ must be *precisely* calculated to match the specific function $f(x)$. If you pick arbitrary coefficients, you'll get *some* periodic function, but not necessarily the one you want.

### Step 4: The magic of orthogonality

**Plain English:** How do we find the exact "strength" (coefficient) for each individual sine and cosine wave in our complex sum? This is where a beautiful property called "orthogonality" comes in. Think of it like this: if you have a sound recording of an orchestra, and you want to know how loud *just the flute* was, how would you do it? It's hard if all instruments are playing. But mathematically, our sine and cosine waves are "orthogonal," meaning they are independent of each other in a special way. This independence allows us to isolate each component.

In vector algebra, two vectors are orthogonal if their dot product is zero. For functions, the "dot product" is replaced by an integral over a period. If the integral of the product of two different basis functions is zero, they are orthogonal.

**Small concrete example:**
Consider the functions $\sin(x)$ and $\cos(x)$ over the interval $[-\pi, \pi]$ (which is a period of $2\pi$).
If we integrate their product:
$\int_{-\pi}^{\pi} \sin(x)\cos(x) dx = \left[ \frac{1}{2}\sin^2(x) \right]_{-\pi}^{\pi} = \frac{1}{2}\sin^2(\pi) - \frac{1}{2}\sin^2(-\pi) = 0 - 0 = 0$.
This means $\sin(x)$ and $\cos(x)$ are orthogonal over this interval.

More generally, for integers $n, m \ge 1$ and $n \ne m$, over any interval of length $2\pi$ (e.g., $[-\pi, \pi]$ or $[0, 2\pi]$):
*   $\int \sin(nx)\sin(mx) dx = 0$
*   $\int \cos(nx)\cos(mx) dx = 0$
*   $\int \sin(nx)\cos(mx) dx = 0$
*   Also, $\int 1 \cdot \sin(nx) dx = 0$ and $\int 1 \cdot \cos(nx) dx = 0$.
*   However, if $n=m$:
    *   $\int_{-\pi}^{\pi} \sin^2(nx) dx = \pi$
    *   $\int_{-\pi}^{\pi} \cos^2(nx) dx = \pi$
    *   $\int_{-\pi}^{\pi} 1^2 dx = 2\pi$

**Formal/Mathematical version:**
The set of functions $\{1, \cos(x), \sin(x), \cos(2x), \sin(2x), \dots, \cos(nx), \sin(nx), \dots \}$ forms an **orthogonal system** over any interval of length $2\pi$ (e.g., $[-\pi, \pi]$ or $[0, 2\pi]$). This means that for any two distinct functions $\phi_1(x)$ and $\phi_2(x)$ from this set, their "inner product" (the integral of their product over a period) is zero:
$$\int_{-\pi}^{\pi} \phi_1(x) \phi_2(x) dx = 0 \quad \text{if } \phi_1 \ne \phi_2$$
And for a function $\phi(x)$ from the set, the integral of its square is non-zero:
$$\int_{-\pi}^{\pi} \phi(x)^2 dx \ne 0$$
Specifically, for $n, m \in \mathbb{Z}^+$:
$$\int_{-\pi}^{\pi} \cos(nx) \cos(mx) dx = \begin{cases} 0 & \text{if } n \ne m \\ \pi & \text{if } n = m \end{cases}$$
$$\int_{-\pi}^{\pi} \sin(nx) \sin(mx) dx = \begin{cases} 0 & \text{if } n \ne m \\ \pi & \text{if } n = m \end{cases}$$
$$\int_{-\pi}^{\pi} \cos(nx) \sin(mx) dx = 0 \quad \text{for all } n, m$$
And for the constant term:
$$\int_{-\pi}^{\pi} 1 \cdot \cos(nx) dx = 0 \quad \text{for all } n \ge 1$$
$$\int_{-\pi}^{\pi} 1 \cdot \sin(nx) dx = 0 \quad \text{for all } n \ge 1$$
$$\int_{-\pi}^{\pi} 1 \cdot 1 dx = 2\pi$$

**What could go wrong:**
Not understanding *why* these integrals are zero or non-zero. It's not just a trick; it's a fundamental property of these functions that allows us to decompose any function into its components. If you're rusty on trigonometric product-to-sum identities, this is where they shine. For example, $\cos(A)\cos(B) = \frac{1}{2}[\cos(A-B) + \cos(A+B)]$. When you integrate these over a full period, they often average to zero.

### Step 5: Finding the coefficients (Euler-Fourier Formulas)

**Plain English:** Now for the payoff! Because of orthogonality, we can derive simple formulas to find each coefficient ($a_0, a_n, b_n$) for any given periodic function $f(x)$. It's like having a special filter for each instrument in our orchestra that only lets that instrument's sound through.

**Small concrete example:**
Let's assume $f(x) = a_0 + \sum_{n=1}^\infty (a_n \cos(nx) + b_n \sin(nx))$ and we want to find $a_k$ for some integer $k \ge 1$.
1.  Multiply both sides by $\cos(kx)$:
    $f(x)\cos(kx) = a_0\cos(kx) + \sum_{n=1}^\infty (a_n \cos(nx)\cos(kx) + b_n \sin(nx)\cos(kx))$
2.  Integrate both sides over a period, say $[-\pi, \pi]$:
    $\int_{-\pi}^{\pi} f(x)\cos(kx) dx = \int_{-\pi}^{\pi} a_0\cos(kx) dx + \sum_{n=1}^\infty \left( \int_{-\pi}^{\pi} a_n \cos(nx)\cos(kx) dx + \int_{-\pi}^{\pi} b_n \sin(nx)\cos(kx) dx \right)$
3.  Now, apply orthogonality:
    *   $\int_{-\pi}^{\pi} a_0\cos(kx) dx = 0$ (for $k \ge 1$)
    *   $\int_{-\pi}^{\pi} b_n \sin(nx)\cos(kx) dx = 0$ (for all $n, k$)
    *   $\int_{-\pi}^{\pi} a_n \cos(nx)\cos(kx) dx$ is $0$ if $n \ne k$, and $a_k \pi$ if $n=k$.
So, all terms on the right-hand side vanish except for the one where $n=k$. This leaves us with:
$\int_{-\pi}^{\pi} f(x)\cos(kx) dx = a_k \pi$
Therefore, $a_k = \frac{1}{\pi} \int_{-\pi}^{\pi} f(x)\cos(kx) dx$.

**Formal/Mathematical version (Euler-Fourier Formulas for period $2\pi$):**
For a function $f(x)$ defined on an interval of length $2\pi$ (e.g., $[-\pi, \pi]$ or $[0, 2\pi]$) and having period $2\pi$, the coefficients of its Fourier series $f(x) = a_0 + \sum_{n=1}^\infty (a_n \cos(nx) + b_n \sin(nx))$ are given by:
$$a_0 = \frac{1}{2\pi} \int_{-\pi}^{\pi} f(x) dx$$
$$a_n = \frac{1}{\pi} \int_{-\pi}^{\pi} f(x) \cos(nx) dx \quad \text{for } n = 1, 2, 3, \dots$$
$$b_n = \frac{1}{\pi} \int_{-\pi}^{\pi} f(x) \sin(nx) dx \quad \text{for } n = 1, 2, 3, \dots$$
*Note: The interval of integration can be any interval of length $2\pi$, e.g., $[0, 2\pi]$ or $[c, c+2\pi]$. The result will be the same.*

**What could go wrong:**
Calculation errors in the integrals are the most common pitfall. Forgetting the $1/(2\pi)$ for $a_0$ or $1/\pi$ for $a_n, b_n$ is another frequent mistake. Also, not correctly handling the limits of integration, especially for piecewise functions.

### Step 6: Generalizing to any period $2L$

**Plain English:** Not all periodic functions have a period of $2\pi$. What if a function repeats every 4 units, or every 10 units? We need to adjust our building blocks to match the function's actual period. We do this by scaling the $x$ variable inside the sine and cosine functions.

**Small concrete example:**
If a function $f(x)$ has a period of $T=4$, then its half-period is $L=2$. We need the arguments of sine and cosine to complete $n$ cycles over an interval of length $2L=4$.
The standard argument $nx$ completes $n$ cycles over $2\pi$. We need it to complete $n$ cycles over $2L$.
So, we use $\frac{\pi x}{L}$ instead of $x$. If $x$ goes from $-L$ to $L$, then $\frac{\pi x}{L}$ goes from $-\pi$ to $\pi$.
Thus, our new building blocks become $\cos(\frac{n\pi x}{L})$ and $\sin(\frac{n\pi x}{L})$.
For $L=2$, these are $\cos(\frac{n\pi x}{2})$ and $\sin(\frac{n\pi x}{2})$.

**Formal/Mathematical version (Euler-Fourier Formulas for period $2L$):**
For a function $f(x)$ defined on an interval of length $2L$ (e.g., $[-L, L]$ or $[0, 2L]$) and having period $2L$, its Fourier series representation is:
$$f(x) = a_0 + \sum_{n=1}^\infty \left(a_n \cos\left(\frac{n\pi x}{L}\right) + b_n \sin\left(\frac{n\pi x}{L}\right)\right)$$
The coefficients are given by:
$$a_0 = \frac{1}{2L} \int_{-L}^{L} f(x) dx$$
$$a_n = \frac{1}{L} \int_{-L}^{L} f(x) \cos\left(\frac{n\pi x}{L}\right) dx \quad \text{for } n = 1, 2, 3, \dots$$
$$b_n = \frac{1}{L} \int_{-L}^{L} f(x) \sin\left(\frac{n\pi x}{L}\right) dx \quad \text{for } n = 1, 2, 3, \dots$$
*Note: Again, the interval of integration can be any interval of length $2L$, e.g., $[0, 2L]$ or $[c, c+2L]$.*
This is the most general form you'll typically use. Notice that if $L=\pi$, these formulas reduce exactly to the period $2\pi$ formulas from Step 5.

**What could go wrong:**
The most common error here is incorrectly identifying $L$. Remember, $L$ is *half* the period. If the period is $T$, then $L = T/2$. Another common error is mixing up $L$ in the denominator of the integral factors ($1/L, 1/(2L)$) with $L$ in the argument of the trigonometric functions ($\frac{n\pi x}{L}$). Be consistent!

## 5. Worked examples — multiple, with every step shown

Let's put these formulas into practice with a few examples. We'll use the general formulas for period $2L$, and for simplicity, we'll often integrate over $[-L, L]$.

### Example 1: Easy — $f(x) = \sin(x)$ on $[-\pi, \pi]$

**Problem:** Find the Fourier series for $f(x) = \sin(x)$ on the interval $[-\pi, \pi]$.

**Given:** $f(x) = \sin(x)$.
**Wanted:** The coefficients $a_0, a_n, b_n$ and the Fourier series.
**Period:** The interval is $[-\pi, \pi]$, so the length of the interval is $2\pi$. This means $2L = 2\pi$, so $L = \pi$.

**Step 1: Calculate $a_0$.**
The formula for $a_0$ is $a_0 = \frac{1}{2L} \int_{-L}^{L} f(x) dx$.
Substitute $L=\pi$ and $f(x)=\sin(x)$:
$$a_0 = \frac{1}{2\pi} \int_{-\pi}^{\pi} \sin(x) dx$$
The integral of $\sin(x)$ is $-\cos(x)$:
$$a_0 = \frac{1}{2\pi} [-\cos(x)]_{-\pi}^{\pi}$$
Evaluate at the limits:
$$a_0 = \frac{1}{2\pi} (-\cos(\pi) - (-\cos(-\pi)))$$
We know $\cos(\pi) = -1$ and $\cos(-\pi) = -1$:
$$a_0 = \frac{1}{2\pi} (-(-1) - (-(-1))) = \frac{1}{2\pi} (1 - 1) = \frac{1}{2\pi} (0) = 0$$
**Why this works:** $\sin(x)$ is an odd function, and the integral of an odd function over a symmetric interval $[-L, L]$ is always zero. This makes sense as $a_0$ represents the average value, and $\sin(x)$ averages to zero over a period.

**Step 2: Calculate $a_n$.**
The formula for $a_n$ is $a_n = \frac{1}{L} \int_{-L}^{L} f(x) \cos\left(\frac{n\pi x}{L}\right) dx$.
Substitute $L=\pi$ and $f(x)=\sin(x)$:
$$a_n = \frac{1}{\pi} \int_{-\pi}^{\pi} \sin(x) \cos\left(\frac{n\pi x}{\pi}\right) dx$$
$$a_n = \frac{1}{\pi} \int_{-\pi}^{\pi} \sin(x) \cos(nx) dx$$
We know that $\sin(x)\cos(nx)$ is an odd function (since $\sin(x)$ is odd and $\cos(nx)$ is even, and odd $\times$ even = odd). The integral of an odd function over a symmetric interval $[-\pi, \pi]$ is zero.
$$a_n = 0 \quad \text{for all } n \ge 1$$
**Why this works:** This is due to the orthogonality property. Sine and cosine functions are orthogonal over a symmetric interval.

**Step 3: Calculate $b_n$.**
The formula for $b_n$ is $b_n = \frac{1}{L} \int_{-L}^{L} f(x) \sin\left(\frac{n\pi x}{L}\right) dx$.
Substitute $L=\pi$ and $f(x)=\sin(x)$:
$$b_n = \frac{1}{\pi} \int_{-\pi}^{\pi} \sin(x) \sin\left(\frac{n\pi x}{\pi}\right) dx$$
$$b_n = \frac{1}{\pi} \int_{-\pi}^{\pi} \sin(x) \sin(nx) dx$$
We use the trigonometric product-to-sum identity: $\sin A \sin B = \frac{1}{2}[\cos(A-B) - \cos(A+B)]$.
Let $A=x$ and $B=nx$:
$$b_n = \frac{1}{\pi} \int_{-\pi}^{\pi} \frac{1}{2}[\cos(x-nx) - \cos(x+nx)] dx$$
$$b_n = \frac{1}{2\pi} \int_{-\pi}^{\pi} [\cos((1-n)x) - \cos((1+n)x)] dx$$

We need to consider two cases for $n$:

**Case A: $n=1$**
If $n=1$, the first term $\cos((1-n)x) = \cos(0x) = \cos(0) = 1$.
$$b_1 = \frac{1}{2\pi} \int_{-\pi}^{\pi} [\cos(0) - \cos(2x)] dx$$
$$b_1 = \frac{1}{2\pi} \int_{-\pi}^{\pi} [1 - \cos(2x)] dx$$
Integrate term by term:
$$b_1 = \frac{1}{2\pi} \left[ x - \frac{1}{2}\sin(2x) \right]_{-\pi}^{\pi}$$
Evaluate at the limits:
$$b_1 = \frac{1}{2\pi} \left( (\pi - \frac{1}{2}\sin(2\pi)) - (-\pi - \frac{1}{2}\sin(-2\pi)) \right)$$
Since $\sin(2\pi)=0$ and $\sin(-2\pi)=0$:
$$b_1 = \frac{1}{2\pi} (\pi - 0 - (-\pi - 0)) = \frac{1}{2\pi} (\pi + \pi) = \frac{1}{2\pi} (2\pi) = 1$$

**Case B: $n \ne 1$**
If $n \ne 1$, then $1-n \ne 0$.
$$b_n = \frac{1}{2\pi} \left[ \frac{\sin((1-n)x)}{1-n} - \frac{\sin((1+n)x)}{1+n} \right]_{-\pi}^{\pi}$$
Evaluate at the limits:
$$b_n = \frac{1}{2\pi} \left( \left( \frac{\sin((1-n)\pi)}{1-n} - \frac{\sin((1+n)\pi)}{1+n} \right) - \left( \frac{\sin(-(1-n)\pi)}{1-n} - \frac{\sin(-(1+n)\pi)}{1+n} \right) \right)$$
Since $n$ is an integer, $(1-n)\pi$ and $(1+n)\pi$ are integer multiples of $\pi$. Therefore, $\sin((1-n)\pi) = 0$ and $\sin((1+n)\pi) = 0$.
Also, $\sin(-A) = -\sin(A)$, so $\sin(-(1-n)\pi) = 0$ and $\sin(-(1+n)\pi) = 0$.
Thus, for $n \ne 1$:
$$b_n = \frac{1}{2\pi} (0 - 0) = 0$$
**Why this works:** This confirms the orthogonality property: $\int \sin(x)\sin(nx) dx = 0$ if $n \ne 1$, and non-zero if $n=1$.

**Step 4: Write the Fourier series.**
We found $a_0 = 0$, $a_n = 0$ for all $n \ge 1$, and $b_1 = 1$ while $b_n = 0$ for $n \ne 1$.
So, the Fourier series is:
$f(x) = a_0 + \sum_{n=1}^\infty (a_n \cos(nx) + b_n \sin(nx))$
$f(x) = 0 + (0 \cdot \cos(x) + 1 \cdot \sin(x)) + (0 \cdot \cos(2x) + 0 \cdot \sin(2x)) + \dots$
$$ \boxed{f(x) = \sin(x)} $$
**Reflection:** This example was "easy" because the function itself is one of the basis functions. The Fourier series simply reproduced the original function, as expected. It's a good sanity check that the formulas work. The trickiest part was handling the $n=1$ case separately for $b_n$ and remembering the product-to-sum identity.

### Example 2: Medium — $f(x) = x$ on $[-\pi, \pi]$

**Problem:** Find the Fourier series for $f(x) = x$ on the interval $[-\pi, \pi]$.

**Given:** $f(x) = x$.
**Wanted:** The coefficients $a_0, a_n, b_n$ and the Fourier series.
**Period:** $2L = 2\pi$, so $L = \pi$.

**Step 1: Calculate $a_0$.**
$$a_0 = \frac{1}{2\pi} \int_{-\pi}^{\pi} x \, dx$$
The function $f(x)=x$ is an odd function. The integral of an odd function over a symmetric interval $[-\pi, \pi]$ is zero.
$$a_0 = \frac{1}{2\pi} \left[ \frac{x^2}{2} \right]_{-\pi}^{\pi} = \frac{1}{2\pi} \left( \frac{\pi^2}{2} - \frac{(-\pi)^2}{2} \right) = \frac{1}{2\pi} \left( \frac{\pi^2}{2} - \frac{\pi^2}{2} \right) = 0$$
**Why this works:** The average value of $x$ over $[-\pi, \pi]$ is zero.

**Step 2: Calculate $a_n$.**
$$a_n = \frac{1}{\pi} \int_{-\pi}^{\pi} x \cos(nx) dx$$
The integrand $f(x)\cos(nx) = x \cos(nx)$. Since $x$ is odd and $\cos(nx)$ is even, their product is an odd function.
The integral of an odd function over a symmetric interval $[-\pi, \pi]$ is zero.
$$a_n = 0 \quad \text{for all } n \ge 1$$
**Why this works:** Since $f(x)=x$ is an odd function, its Fourier series will only contain sine terms (and $a_0=0$). This is a useful shortcut.

**Step 3: Calculate $b_n$.**
$$b_n = \frac{1}{\pi} \int_{-\pi}^{\pi} x \sin(nx) dx$$
The integrand $f(x)\sin(nx) = x \sin(nx)$. Since $x$ is odd and $\sin(nx)$ is odd, their product is an even function (odd $\times$ odd = even).
For an even function $g(x)$, $\int_{-L}^{L} g(x) dx = 2 \int_{0}^{L} g(x) dx$. This simplifies the integration.
$$b_n = \frac{1}{\pi} \cdot 2 \int_{0}^{\pi} x \sin(nx) dx = \frac{2}{\pi} \int_{0}^{\pi} x \sin(nx) dx$$
Now we use integration by parts: $\int u \, dv = uv - \int v \, du$.
Let $u = x \implies du = dx$
Let $dv = \sin(nx) dx \implies v = -\frac{1}{n}\cos(nx)$
$$b_n = \frac{2}{\pi} \left[ -\frac{x}{n}\cos(nx) \right]_{0}^{\pi} - \frac{2}{\pi} \int_{0}^{\pi} \left( -\frac{1}{n}\cos(nx) \right) dx$$
$$b_n = \frac{2}{\pi} \left[ \left( -\frac{\pi}{n}\cos(n\pi) \right) - \left( -\frac{0}{n}\cos(0) \right) \right] + \frac{2}{\pi n} \int_{0}^{\pi} \cos(nx) dx$$
We know $\cos(n\pi) = (-1)^n$.
$$b_n = \frac{2}{\pi} \left[ -\frac{\pi}{n}(-1)^n - 0 \right] + \frac{2}{\pi n} \left[ \frac{1}{n}\sin(nx) \right]_{0}^{\pi}$$
$$b_n = -\frac{2}{n}(-1)^n + \frac{2}{\pi n^2} [\sin(n\pi) - \sin(0)]$$
Since $n$ is an integer, $\sin(n\pi) = 0$ and $\sin(0) = 0$. So the second term is zero.
$$b_n = -\frac{2}{n}(-1)^n = \frac{2}{n}(-1)^{n+1}$$
**Why this works:** Integration by parts is the standard technique for integrals of products of polynomials and trig functions. The even function shortcut saves some calculation.

**Step 4: Write the Fourier series.**
We found $a_0 = 0$, $a_n = 0$ for all $n \ge 1$, and $b_n = \frac{2}{n}(-1)^{n+1}$.
$$f(x) = \sum_{n=1}^\infty \frac{2}{n}(-1)^{n+1} \sin(nx)$$
Let's write out the first few terms:
For $n=1: b_1 = \frac{2}{1}(-1)^2 = 2 \implies 2\sin(x)$
For $n=2: b_2 = \frac{2}{2}(-1)^3 = -1 \implies -\sin(2x)$
For $n=3: b_3 = \frac{2}{3}(-1)^4 = \frac{2}{3} \implies \frac{2}{3}\sin(3x)$
For $n=4: b_4 = \frac{2}{4}(-1)^5 = -\frac{1}{2} \implies -\frac{1}{2}\sin(4x)$
$$ \boxed{f(x) = 2\sin(x) - \sin(2x) + \frac{2}{3}\sin(3x) - \frac{1}{2}\sin(4x) + \dots} $$
**Reflection:** This example highlights the use of odd/even function properties to simplify calculations (making $a_0$ and $a_n$ zero). The main challenge was correctly applying integration by parts and evaluating the terms at the limits, especially $\cos(n\pi) = (-1)^n$.

### Example 3: Medium-Hard — $f(x) = x^2$ on $[-\pi, \pi]$

**Problem:** Find the Fourier series for $f(x) = x^2$ on the interval $[-\pi, \pi]$.

**Given:** $f(x) = x^2$.
**Wanted:** The coefficients $a_0, a_n, b_n$ and the Fourier series.
**Period:** $2L = 2\pi$, so $L = \pi$.

**Step 1: Calculate $a_0$.**
$$a_0 = \frac{1}{2\pi} \int_{-\pi}^{\pi} x^2 \, dx$$
The function $f(x)=x^2$ is an even function.
$$a_0 = \frac{1}{2\pi} \left[ \frac{x^3}{3} \right]_{-\pi}^{\pi} = \frac{1}{2\pi} \left( \frac{\pi^3}{3} - \frac{(-\pi)^3}{3} \right) = \frac{1}{2\pi} \left( \frac{\pi^3}{3} - \left(-\frac{\pi^3}{3}\right) \right) = \frac{1}{2\pi} \left( \frac{2\pi^3}{3} \right)$$
$$a_0 = \frac{\pi^2}{3}$$
**Why this works:** The average value of $x^2$ over $[-\pi, \pi]$ is $\pi^2/3$.

**Step 2: Calculate $b_n$.**
$$b_n = \frac{1}{\pi} \int_{-\pi}^{\pi} x^2 \sin(nx) dx$$
The integrand $f(x)\sin(nx) = x^2 \sin(nx)$. Since $x^2$ is even and $\sin(nx)$ is odd, their product is an odd function.
The integral of an odd function over a symmetric interval $[-\pi, \pi]$ is zero.
$$b_n = 0 \quad \text{for all } n \ge 1$$
**Why this works:** Since $f(x)=x^2$ is an even function, its Fourier series will only contain cosine terms (and $a_0$). This is another useful shortcut.

**Step 3: Calculate $a_n$.**
$$a_n = \frac{1}{\pi} \int_{-\pi}^{\pi} x^2 \cos(nx) dx$$
The integrand $f(x)\cos(nx) = x^2 \cos(nx)$. Since $x^2$ is even and $\cos(nx)$ is even, their product is an even function.
We can use the even function shortcut: $\int_{-L}^{L} g(x) dx = 2 \int_{0}^{L} g(x) dx$.
$$a_n = \frac{2}{\pi} \int_{0}^{\pi} x^2 \cos(nx) dx$$
This requires **integration by parts twice**.
First application: Let $u = x^2 \implies du = 2x \, dx$. Let $dv = \cos(nx) dx \implies v = \frac{1}{n}\sin(nx)$.
$$a_n = \frac{2}{\pi} \left( \left[ \frac{x^2}{n}\sin(nx) \right]_{0}^{\pi} - \int_{0}^{\pi} \frac{2x}{n}\sin(nx) dx \right)$$
Evaluate the first term: $[\frac{x^2}{n}\sin(nx)]_{0}^{\pi} = \frac{\pi^2}{n}\sin(n\pi) - \frac{0^2}{n}\sin(0) = 0 - 0 = 0$ (since $\sin(n\pi)=0$).
So,
$$a_n = -\frac{4}{\pi n} \int_{0}^{\pi} x \sin(nx) dx$$
Now, apply integration by parts again to $\int_{0}^{\pi} x \sin(nx) dx$.
Let $u = x \implies du = dx$. Let $dv = \sin(nx) dx \implies v = -\frac{1}{n}\cos(nx)$.
$$a_n = -\frac{4}{\pi n} \left( \left[ -\frac{x}{n}\cos(nx) \right]_{0}^{\pi} - \int_{0}^{\pi} \left(-\frac{1}{n}\cos(nx)\right) dx \right)$$
Evaluate the first term: $[-\frac{x}{n}\cos(nx)]_{0}^{\pi} = -\frac{\pi}{n}\cos(n\pi) - (-\frac{0}{n}\cos(0)) = -\frac{\pi}{n}(-1)^n - 0 = -\frac{\pi}{n}(-1)^n$.
$$a_n = -\frac{4}{\pi n} \left( -\frac{\pi}{n}(-1)^n + \frac{1}{n} \int_{0}^{\pi} \cos(nx) dx \right)$$
Integrate $\cos(nx)$: $[\frac{1}{n}\sin(nx)]_{0}^{\pi} = \frac{1}{n}\sin(n\pi) - \frac{1}{n}\sin(0) = 0 - 0 = 0$.
So the integral term is zero.
$$a_n = -\frac{4}{\pi n} \left( -\frac{\pi}{n}(-1)^n \right)$$
$$a_n = \frac{4\pi}{\pi n^2}(-1)^n = \frac{4}{n^2}(-1)^n$$
**Why this works:** This is the most computationally intensive part. Careful application of integration by parts, twice, is crucial. Remembering $\cos(n\pi)=(-1)^n$ and $\sin(n\pi)=0$ is key.

**Step 4: Write the Fourier series.**
We found $a_0 = \frac{\pi^2}{3}$, $b_n = 0$ for all $n \ge 1$, and $a_n = \frac{4}{n^2}(-1)^n$.
$$f(x) = \frac{\pi^2}{3} + \sum_{n=1}^\infty \frac{4}{n^2}(-1)^n \cos(nx)$$
Let's write out the first few terms:
For $n=1: a_1 = \frac{4}{1^2}(-1)^1 = -4 \implies -4\cos(x)$
For $n=2: a_2 = \frac{4}{2^2}(-1)^2 = \frac{4}{4}(1) = 1 \implies \cos(2x)$
For $n=3: a_3 = \frac{4}{3^2}(-1)^3 = -\frac{4}{9} \implies -\frac{4}{9}\cos(3x)$
For $n=4: a_4 = \frac{4}{4^2}(-1)^4 = \frac{4}{16}(1) = \frac{1}{4} \implies \frac{1}{4}\cos(4x)$
$$ \boxed{f(x) = \frac{\pi^2}{3} - 4\cos(x) + \cos(2x) - \frac{4}{9}\cos(3x) + \frac{1}{4}\cos(4x) - \dots} $$
**Reflection:** This example demonstrates the need for repeated integration by parts, which is a common occurrence in Fourier series calculations. The even function shortcut was very helpful. The resulting series converges quite rapidly because the coefficients decrease as $1/n^2$.

### Example 4: Hard — Piecewise function $f(x)$ on $[0, 2\pi]$

**Problem:** Find the Fourier series for the function $f(x)$ defined as:
$$f(x) = \begin{cases} 0 & \text{for } 0 \le x < \pi \\ x & \text{for } \pi \le x < 2\pi \end{cases}$$
Assume $f(x)$ is periodic with period $2\pi$.

**Given:** A piecewise function $f(x)$.
**Wanted:** The coefficients $a_0, a_n, b_n$ and the Fourier series.
**Period:** The interval is $[0, 2\pi]$, so $2L = 2\pi$, which means $L = \pi$.

**Step 1: Calculate $a_0$.**
$$a_0 = \frac{1}{2L} \int_{0}^{2L} f(x) dx = \frac{1}{2\pi} \int_{0}^{2\pi} f(x) dx$$
We split the integral according to the definition of $f(x)$:
$$a_0 = \frac{1}{2\pi} \left( \int_{0}^{\pi} 0 \, dx + \int_{\pi}^{2\pi} x \, dx \right)$$
The first integral is 0.
$$a_0 = \frac{1}{2\pi} \left[ \frac{x^2}{2} \right]_{\pi}^{2\pi}$$
$$a_0 = \frac{1}{2\pi} \left( \frac{(2\pi)^2}{2} - \frac{\pi^2}{2} \right) = \frac{1}{2\pi} \left( \frac{4\pi^2}{2} - \frac{\pi^2}{2} \right) = \frac{1}{2\pi} \left( \frac{3\pi^2}{2} \right)$$
$$a_0 = \frac{3\pi}{4}$$
**Why this works:** For piecewise functions, the integral must be split into sub-intervals where the function's definition changes.

**Step 2: Calculate $a_n$.**
$$a_n = \frac{1}{L} \int_{0}^{2L} f(x) \cos\left(\frac{n\pi x}{L}\right) dx = \frac{1}{\pi} \int_{0}^{2\pi} f(x) \cos(nx) dx$$
Split the integral:
$$a_n = \frac{1}{\pi} \left( \int_{0}^{\pi} 0 \cdot \cos(nx) dx + \int_{\pi}^{2\pi} x \cos(nx) dx \right)$$
The first integral is 0.
$$a_n = \frac{1}{\pi} \int_{\pi}^{2\pi} x \cos(nx) dx$$
Use integration by parts: Let $u=x \implies du=dx$. Let $dv=\cos(nx)dx \implies v=\frac{1}{n}\sin(nx)$.
$$a_n = \frac{1}{\pi} \left( \left[ \frac{x}{n}\sin(nx) \right]_{\pi}^{2\pi} - \int_{\pi}^{2\pi} \frac{1}{n}\sin(nx) dx \right)$$
Evaluate the first term:
$$ \left[ \frac{x}{n}\sin(nx) \right]_{\pi}^{2\pi} = \frac{2\pi}{n}\sin(2n\pi) - \frac{\pi}{n}\sin(n\pi) $$
Since $n$ is an integer, $\sin(2n\pi)=0$ and $\sin(n\pi)=0$. So this term is $0$.
$$a_n = \frac{1}{\pi} \left( 0 - \frac{1}{n} \int_{\pi}^{2\pi} \sin(nx) dx \right)$$
$$a_n = -\frac{1}{\pi n} \left[ -\frac{1}{n}\cos(nx) \right]_{\pi}^{2\pi}$$
$$a_n = \frac{1}{\pi n^2} [\cos(nx)]_{\pi}^{2\pi} = \frac{1}{\pi n^2} (\cos(2n\pi) - \cos(n\pi))$$
We know $\cos(2n\pi) = 1$ and $\cos(n\pi) = (-1)^n$.
$$a_n = \frac{1}{\pi n^2} (1 - (-1)^n)$$
This means:
*   If $n$ is even, $(-1)^n = 1$, so $a_n = \frac{1}{\pi n^2} (1-1) = 0$.
*   If $n$ is odd, $(-1)^n = -1$, so $a_n = \frac{1}{\pi n^2} (1-(-1)) = \frac{2}{\pi n^2}$.
**Why this works:** Careful handling of the piecewise definition and integration limits. Integration by parts is again essential.

**Step 3: Calculate $b_n$.**
$$b_n = \frac{1}{L} \int_{0}^{2L} f(x) \sin\left(\frac{n\pi x}{L}\right) dx = \frac{1}{\pi} \int_{0}^{2\pi} f(x) \sin(nx) dx$$
Split the integral:
$$b_n = \frac{1}{\pi} \left( \int_{0}^{\pi} 0 \cdot \sin(nx) dx + \int_{\pi}^{2\pi} x \sin(nx) dx \right)$$
The first integral is 0.
$$b_n = \frac{1}{\pi} \int_{\pi}^{2\pi} x \sin(nx) dx$$
Use integration by parts: Let $u=x \implies du=dx$. Let $dv=\sin(nx)dx \implies v=-\frac{1}{n}\cos(nx)$.
$$b_n = \frac{1}{\pi} \left( \left[ -\frac{x}{n}\cos(nx) \right]_{\pi}^{2\pi} - \int_{\pi}^{2\pi} \left(-\frac{1}{n}\cos(nx)\right) dx \right)$$
Evaluate the first term:
$$ \left[ -\frac{x}{n}\cos(nx) \right]_{\pi}^{2\pi} = -\frac{2\pi}{n}\cos(2n\pi) - \left(-\frac{\pi}{n}\cos(n\pi)\right) $$
$$ = -\frac{2\pi}{n}(1) + \frac{\pi}{n}(-1)^n = -\frac{2\pi}{n} + \frac{\pi}{n}(-1)^n $$
$$b_n = \frac{1}{\pi} \left( -\frac{2\pi}{n} + \frac{\pi}{n}(-1)^n + \frac{1}{n} \int_{\pi}^{2\pi} \cos(nx) dx \right)$$
$$b_n = \frac{1}{\pi} \left( -\frac{2\pi}{n} + \frac{\pi}{n}(-1)^n + \frac{1}{n} \left[ \frac{1}{n}\sin(nx) \right]_{\pi}^{2\pi} \right)$$
Evaluate the integral term:
$$ \frac{1}{n^2} [\sin(2n\pi) - \sin(n\pi)] = \frac{1}{n^2} (0 - 0) = 0 $$
So, the integral term is zero.
$$b_n = \frac{1}{\pi} \left( -\frac{2\pi}{n} + \frac{\pi}{n}(-1)^n \right)$$
$$b_n = -\frac{2}{n} + \frac{1}{n}(-1)^n = \frac{(-1)^n - 2}{n}$$
This means:
*   If $n$ is even, $(-1)^n = 1$, so $b_n = \frac{1-2}{n} = -\frac{1}{n}$.
*   If $n$ is odd, $(-1)^n = -1$, so $b_n = \frac{-1-2}{n} = -\frac{3}{n}$.
**Why this works:** Again, careful integration by parts and evaluation of limits with $\cos(n\pi)$ and $\sin(n\pi)$.

**Step 4: Write the Fourier series.**
We found $a_0 = \frac{3\pi}{4}$.
For $a_n$: $a_n = 0$ if $n$ is even, $a_n = \frac{2}{\pi n^2}$ if $n$ is odd.
For $b_n$: $b_n = -\frac{1}{n}$ if $n$ is even, $b_n = -\frac{3}{n}$ if $n$ is odd.
$$f(x) = \frac{3\pi}{4} + \sum_{n=1}^\infty \left( a_n \cos(nx) + b_n \sin(nx) \right)$$
Let's write out the first few terms:
$n=1$ (odd): $a_1 = \frac{2}{\pi (1)^2} = \frac{2}{\pi}$, $b_1 = -\frac{3}{1} = -3$.
$n=2$ (even): $a_2 = 0$, $b_2 = -\frac{1}{2}$.
$n=3$ (odd): $a_3 = \frac{2}{\pi (3)^2} = \frac{2}{9\pi}$, $b_3 = -\frac{3}{3} = -1$.
$n=4$ (even): $a_4 = 0$, $b_4 = -\frac{1}{4}$.
$$ \boxed{f(x) = \frac{3\pi}{4} + \frac{2}{\pi}\cos(x) - 3\sin(x) - \frac{1}{2}\sin(2x) + \frac{2}{9\pi}\cos(3x) - \sin(3x) - \frac{1}{4}\sin(4x) + \dots} $$
**Reflection:** This example is hard due to the piecewise definition, which requires splitting integrals, and the need to consider odd/even $n$ for the coefficients. It's a good test of careful computation and understanding of the integral limits. The series will converge to the average of the left and right limits at jump discontinuities (e.g., at $x=\pi$).

## 6. Common mistakes and traps

1.  **Incorrect Period $L$:** Students often confuse the full period $T$ with $L$ (which is $T/2$). If the problem states the interval is $[0, T]$ or $[-T/2, T/2]$, then the period is $T$, and $L=T/2$. Using $L=T$ or $L=2T$ will lead to incorrect arguments in the sines/cosines and incorrect scaling factors for the integrals.
2.  **Missing or Incorrect Scaling Factors:** Forgetting the $1/(2L)$ for $a_0$ or $1/L$ for $a_n, b_n$ in the coefficient formulas is very common. These factors are crucial for the orthogonality to work out correctly.
3.  **Integration Errors:** Fourier series heavily rely on definite integration, often involving integration by parts (sometimes multiple times). Algebraic errors, sign errors, or incorrect evaluation of limits (especially involving $\cos(n\pi) = (-1)^n$ and $\sin(n\pi) = 0$) are frequent.
4.  **Incorrectly Using Odd/Even Function Shortcuts:** While very helpful, students sometimes misidentify a function as odd/even, or apply the shortcut when the integration interval is not symmetric (e.g., $[0, L]$ instead of $[-L, L]$). Remember: $f(x)$ is even if $f(-x)=f(x)$, odd if $f(-x)=-f(x)$. Product rules: even $\times$ even = even; odd $\times$ odd = even; odd $\times$ even = odd.
5.  **Handling Piecewise Functions:** When $f(x)$ is defined piecewise,