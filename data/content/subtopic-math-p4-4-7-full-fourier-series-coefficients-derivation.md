## What it is
A full Fourier series represents a periodic function $f(x)$ with period $2L$ as an infinite sum of sine and cosine functions. The derivation of the coefficients provides the explicit formulas to calculate how much of each sine and cosine term is needed to reconstruct the original function. These coefficients are determined by exploiting the orthogonality of the trigonometric functions.

## Why it matters
This is the fundamental tool for solving linear partial differential equations (PDEs), such as the heat equation, wave equation, and Laplace's equation, on finite domains. In aerospace, it's used to analyze vibrations in structures and fluid flow instabilities. In machine learning, the related Fourier transform is central to signal processing, feature engineering, and understanding the frequency components of data.

## When to study it
You must have a solid command of integral calculus, specifically definite integrals and integration by parts. You also need to understand the concept of orthogonality of functions, which is a generalization of orthogonal vectors from linear algebra. If the statement "the set of functions $\{\sin(n\pi x/L), \cos(m\pi x/L)\}$ is orthogonal on the interval $[-L, L]$" is unfamiliar, review function spaces and inner products first.

## How to study it (step by step)
1.  **Write the Goal:** Start with the general form of a Fourier series for a function $f(x)$ on the interval $[-L, L]$:
    $$f(x) = \frac{a_0}{2} + \sum_{n=1}^{\infty} \left( a_n \cos\left(\frac{n\pi x}{L}\right) + b_n \sin\left(\frac{n\pi x}{L}\right) \right)$$
    The goal is to find the formulas for $a_0$, $a_n$, and $b_n$.

2.  **Master the Tools (Orthogonality):** Prove or review these three key orthogonality relations for integers $n, m \ge 1$:
    $$ \int_{-L}^{L} \cos\left(\frac{n\pi x}{L}\right) \cos\left(\frac{m\pi x}{L}\right) dx = \begin{cases} L & n=m \\ 0 & n \neq m \end{cases} $$
    $$ \int_{-L}^{L} \sin\left(\frac{n\pi x}{L}\right) \sin\left(\frac{m\pi x}{L}\right) dx = \begin{cases} L & n=m \\ 0 & n \neq m \end{cases} $$
    $$ \int_{-L}^{L} \cos\left(\frac{n\pi x}{L}\right) \sin\left(\frac{m\pi x}{L}\right) dx = 0 \quad \forall n, m $$
    These integrals are the engine of the derivation. Do not proceed until you understand why they are true (hint: use product-to-sum trigonometric identities).

3.  **Derive $a_0$:** Integrate the entire Fourier series expression from $-L$ to $L$. Observe how the orthogonality relations cause every sine and cosine term to integrate to zero, leaving only the constant term. Solve for $a_0$.

4.  **Derive $a_n$:** Multiply the entire Fourier series expression by $\cos(m\pi x/L)$ for some fixed integer $m \ge 1$. Integrate the result from $-L$ to $L$. Apply the orthogonality relations again; notice how only one term in the infinite sum survives. Solve for $a_m$.

5.  **Derive $b_n$:** Repeat the process from step 4, but this time multiply the series by $\sin(m\pi x/L)$. Integrate and apply orthogonality to isolate and solve for $b_m$.

6.  **Synthesize:** Collect the three formulas you derived for $a_0$, $a_n$, and $b_n$. You now have the complete recipe for finding the Fourier series of any suitable function on $[-L, L]$.

## Key ideas, with intuition
1.  **Functions as Vectors:** Think of functions as vectors in an infinite-dimensional space. The integral of their product, $\int f(x)g(x)dx$, is the equivalent of a dot product. If this integral is zero, the functions are "orthogonal" or "perpendicular".

2.  **Sines and Cosines as an Orthogonal Basis:** The set of functions $\{1, \cos(\frac{\pi x}{L}), \sin(\frac{\pi x}{L}), \cos(\frac{2\pi x}{L}), \sin(\frac{2\pi x}{L}), \dots\}$ forms an orthogonal basis for the space of functions on $[-L, L]$. A Fourier series is just a way of writing a function "vector" $f(x)$ as a linear combination of these basis "vectors".

3.  **Projection to Find Coefficients:** How do you find the $x$-component of a vector $\vec{v}$ in 3D? You compute its dot product with the basis vector $\hat{i}$: $v_x = \vec{v} \cdot \hat{i}$. The derivation of the Fourier coefficients is the exact same idea. To find the coefficient $a_n$ (the "component" of $f(x)$ in the "direction" of $\cos(n\pi x/L)$), you take the "dot product" of $f(x)$ with that basis function:
    $$ a_n = \frac{\int_{-L}^{L} f(x) \cos\left(\frac{n\pi x}{L}\right) dx}{\int_{-L}^{L} \cos^2\left(\frac{n\pi x}{L}\right) dx} = \frac{1}{L} \int_{-L}^{L} f(x) \cos\left(\frac{n\pi x}{L}\right) dx $$
    This is not an analogy; it is the same mathematical principle of projection onto an orthogonal basis. The derivation is simply the formal application of this principle.

## Worked example
Find the full Fourier series for the square wave defined on $[-\pi, \pi]$ (so $L=\pi$) by:
$$ f(x) = \begin{cases} -1 & -\pi < x < 0 \\ 1 & 0 < x < \pi \end{cases} $$

**Step 1: Find $a_0$**
$a_0$ represents the average value of the function.
$$ a_0 = \frac{1}{\pi} \int_{-\pi}^{\pi} f(x) dx = \frac{1}{\pi} \left( \int_{-\pi}^{0} (-1) dx + \int_{0}^{\pi} (1) dx \right) $$
$$ a_0 = \frac{1}{\pi} \left( [-x]_{-\pi}^{0} + [x]_{0}^{\pi} \right) = \frac{1}{\pi} \left( (0 - (-\pi)) + (\pi - 0) \right) = \frac{1}{\pi} (-\pi + \pi) = 0 $$
*Reflection:* This makes sense. The function has equal area above and below the x-axis, so its average value is zero.

**Step 2: Find $a_n$**
$$ a_n = \frac{1}{\pi} \int_{-\pi}^{\pi} f(x) \cos(nx) dx = \frac{1}{\pi} \left( \int_{-\pi}^{0} (-1)\cos(nx) dx + \int_{0}^{\pi} (1)\cos(nx) dx \right) $$
$$ a_n = \frac{1}{\pi} \left( \left[-\frac{\sin(nx)}{n}\right]_{-\pi}^{0} + \left[\frac{\sin(nx)}{n}\right]_{0}^{\pi} \right) $$
$$ a_n = \frac{1}{\pi} \left( (0 - 0) + (0 - 0) \right) = 0 $$
*Reflection:* $f(x)$ is an odd function and $\cos(nx)$ is an even function. The product $f(x)\cos(nx)$ is odd, and the integral of an odd function over a symmetric interval $[-\pi, \pi]$ is always zero. This confirms our calculation.

**Step 3: Find $b_n$**
$$ b_n = \frac{1}{\pi} \int_{-\pi}^{\pi} f(x) \sin(nx) dx = \frac{1}{\pi} \left( \int_{-\pi}^{0} (-1)\sin(nx) dx + \int_{0}^{\pi} (1)\sin(nx) dx \right) $$
$$ b_n = \frac{1}{\pi} \left( \left[\frac{\cos(nx)}{n}\right]_{-\pi}^{0} + \left[-\frac{\cos(nx)}{n}\right]_{0}^{\pi} \right) $$
$$ b_n = \frac{1}{\pi} \left( \left(\frac{\cos(0)}{n} - \frac{\cos(-n\pi)}{n}\right) + \left(-\frac{\cos(n\pi)}{n} - (-\frac{\cos(0)}{n})\right) \right) $$
Using $\cos(0)=1$ and $\cos(-n\pi) = \cos(n\pi) = (-1)^n$:
$$ b_n = \frac{1}{n\pi} \left( (1 - (-1)^n) + (-(-1)^n + 1) \right) = \frac{2}{n\pi} (1 - (-1)^n) $$
*Reflection:* Now we evaluate this for different $n$.
If $n$ is even, $n=2k$, then $(-1)^n = 1$, so $b_n = 0$.
If $n$ is odd, $n=2k-1$, then $(-1)^n = -1$, so $b_n = \frac{2}{n\pi}(1 - (-1)) = \frac{4}{n\pi}$.

**Step 4: Assemble the series**
Putting it all together, with $a_0=0$, $a_n=0$, and $b_n$ non-zero only for odd $n$:
$$ f(x) = \sum_{n=1, \text{odd}}^{\infty} \frac{4}{n\pi} \sin(nx) = \frac{4}{\pi} \left( \sin(x) + \frac{1}{3}\sin(3x) + \frac{1}{5}\sin(5x) + \dots \right) $$

## Diagrams

This diagram shows the square wave $f(x)$ from the worked example and its approximation by the first few terms of its Fourier series. As more terms are added, the approximation gets closer to the square wave, exhibiting the Gibbs phenomenon (overshoot) at the discontinuities.

```text
      ^ y
      |
 +1.0 + . . . . . . . . . . . . . . . . . . .
      |           .           .           .
      |         .   .       .   .       .   .
      |       .       .   .       .   .
 f(x) |-----.           .-----------.           .----
      |     .         . .         . .         .
      |     .       .   .       .   .       .
      |     .     .     .     .     .     .
 -1.0 + . . . . . . . . . . . . . . . . . . .
      |
 -----+---------------------------------------------> x
     -2pi        -pi           0           pi         2pi

     Key:
     -----------   Original function f(x)
     ...........   Fourier series approximation (e.g., N=3 terms)
```

## Memory technique — remember this forever
1.  **The Mnemonic:** "Project The Function". The coefficients are just projections of your function $f(x)$ onto the sine and cosine basis functions. The formula is always:
    $$ \text{Coefficient} = \frac{\langle f(x), \text{basis}(x) \rangle}{\langle \text{basis}(x), \text{basis}(x) \rangle} $$
    where $\langle g, h \rangle$ is the inner product $\int_{-L}^{L} g(x)h(x)dx$. This single idea reconstructs all three formulas.

2.  **Formulas to Overlearn:** For a function on $[-L, L]$:
    $$ a_0 = \frac{1}{L} \int_{-L}^{L} f(x) dx $$
    $$ a_n = \frac{1}{L} \int_{-L}^{L} f(x) \cos\left(\frac{n\pi x}{L}\right) dx \quad (n \ge 1) $$
    $$ b_n = \frac{1}{L} \int_{-L}^{L} f(x) \sin\left(\frac{n\pi x}{L}\right) dx \quad (n \ge 1) $$

3.  **Spaced Repetition Schedule:** Review the derivation and these formulas from scratch at: 1 day, 3 days, 7 days, 16 days, 35 days. Do not just read them; re-derive them.

4.  **First Principles Pathway:** If you forget the formulas, remember this:
    *   Start with the general series: $f(x) = \frac{a_0}{2} + \sum (\dots)$.
    *   To find a coefficient (e.g., $a_m$), multiply the entire equation by its corresponding basis function ($\cos(m\pi x/L)$).
    *   Integrate both sides from $-L$ to $L$.
    *   On the right side, every integral but one will be zero due to orthogonality.
    *   Solve for the coefficient.

## Common mistakes
1.  **The Normalization Factor:** Forgetting the $1/L$ in front of the integrals. This comes from the denominator $\langle \text{basis}, \text{basis} \rangle$, which is $L$ (or $2L$ for the constant term, which is why $a_0$ is special).
2.  **Incorrect Argument in Trig Functions:** Using $\cos(nx)$ when the interval is $[-L, L]$ instead of $[-\pi, \pi]$. The correct argument is always $\frac{n\pi x}{L}$ to ensure the functions have the correct period $2L/n$.
3.  **Sign Errors in Integration by Parts:** This is the most common calculation error. Be meticulous. Always write out the $u, v, du, dv$ and double-check the minus sign in $\int v du$.
4.  **Mis-evaluating $\cos(n\pi)$:** Forgetting that $\cos(n\pi) = (-1)^n$ and $\sin(n\pi)=0$ for integer $n$. This is essential for simplifying the results after integration.

## Self-check
1.  Let $f(x) = |x|$ on $[-\pi, \pi]$. What are its Fourier coefficients? Before you calculate, what can you say about the $b_n$ coefficients based on the symmetry of the function?
2.  Find the full Fourier series for $f(x) = x^2$ on the interval $[-1, 1]$. This will require two applications of integration by parts for one of the coefficient types.
3.  Consider a function $f(x)$ on $[-L, L]$. If you shift it vertically by a constant $C$, creating a new function $g(x) = f(x) + C$, how are the Fourier coefficients of $g(x)$ related to the coefficients of $f(x)$? Derive this without re-calculating all the integrals.