## What it is
A half-range Fourier series is a representation of a function $f(x)$ defined only on a finite interval, say $[0, L]$, as an infinite sum of either only sine functions (a sine series) or only cosine functions (a cosine series). This is achieved by creating a "fictitious" extension of the original function to the interval $[-L, 0]$ in a way that makes the new, larger function either odd (for a sine series) or even (for a cosine series).

## Why it matters
This technique is fundamental for solving partial differential equations (PDEs) on finite domains with specific boundary conditions. For instance, modeling heat transfer in a rod or vibrations in a rocket fuselage often involves conditions like fixed temperature (Dirichlet conditions) or insulated ends (Neumann conditions). These physical constraints directly correspond to the mathematical properties of sine (zero at endpoints) and cosine (zero derivative at endpoints) series, making half-range expansions the natural tool for finding solutions.

## When to study it
You must be proficient with full Fourier series on an interval $[-L, L]$. Specifically, you should have mastered:
1.  **Orthogonality of Functions:** The concept that $\int_{-L}^{L} \sin(\frac{n\pi x}{L})\cos(\frac{m\pi x}{L}) dx = 0$ for all integers $n, m$, and similar integrals for sine-sine and cosine-cosine products.
2.  **Even and Odd Functions:** How to identify them and, crucially, the rules for their integrals over symmetric intervals (e.g., $\int_{-L}^{L} (\text{odd function}) dx = 0$).
3.  **Fourier Coefficient Formulas:** The standard formulas for $a_0, a_n,$ and $b_n$ for a function on $[-L, L]$.

If any of these are weak, review them before proceeding. This subtopic is a direct application of those foundational ideas.

## How to study it (step by step)
1.  **Start with the Goal:** Take a function $f(x)$ defined only on $[0, L]$. State the objective: represent $f(x)$ on this interval using *only* sines or *only* cosines.
2.  **Derive the Cosine Series:** Create an *even extension* of $f(x)$, let's call it $f_{even}(x)$, defined on $[-L, L]$. Write its definition explicitly: $f_{even}(x) = f(x)$ for $x \in [0, L]$ and $f_{even}(x) = f(-x)$ for $x \in [-L, 0)$.
3.  **Apply Full Fourier Formulas:** Write down the standard formulas for the Fourier coefficients $a_n$ and $b_n$ for $f_{even}(x)$ on $[-L, L]$. Use the property of even/odd functions to show that all $b_n$ must be zero, and simplify the integral for $a_n$ from $\int_{-L}^{L}$ to $2 \int_{0}^{L}$. This yields the half-range cosine coefficient formulas.
4.  **Derive the Sine Series:** Repeat steps 2 and 3, but this time create an *odd extension*, $f_{odd}(x)$. Show that this forces all $a_n$ (including $a_0$) to be zero and simplifies the formula for $b_n$. This yields the half-range sine coefficient formulas.
5.  **Solve a Problem Twice:** Take a simple function like $f(x) = 1$ on $[0, \pi]$. Compute both its half-range sine series and its half-range cosine series. Sketch the original function, its even extension, and its odd extension to solidify the concept.

## Key ideas, with intuition
1.  **You are in control of the "other half".** A function defined on $[0, L]$ carries no information about what it does on $[-L, 0)$. We are free to define it there in any way we choose. The most useful choices are those that create symmetry.

2.  **Even extensions kill the sine terms.** An even function has reflectional symmetry across the y-axis. Sine functions are odd (rotational symmetry). To build an even function, you can only use other even functions—the cosines. The math confirms this: for an even function $f_{even}(x)$, the product $f_{even}(x)\sin(\frac{n\pi x}{L})$ is odd, so its integral over $[-L, L]$ is zero, forcing all $b_n=0$.
    $$b_n = \frac{1}{L} \int_{-L}^{L} \underbrace{f_{even}(x)}_{\text{even}} \underbrace{\sin\left(\frac{n\pi x}{L}\right)}_{\text{odd}} dx = \frac{1}{L} \int_{-L}^{L} (\text{odd function}) dx = 0$$

3.  **Odd extensions kill the cosine terms.** An odd function has rotational symmetry about the origin. To build it, you can only use other odd functions—the sines. The math confirms this: for an odd function $f_{odd}(x)$, the product $f_{odd}(x)\cos(\frac{n\pi x}{L})$ is odd, so its integral over $[-L, L]$ is zero, forcing all $a_n=0$.
    $$a_n = \frac{1}{L} \int_{-L}^{L} \underbrace{f_{odd}(x)}_{\text{odd}} \underbrace{\cos\left(\frac{n\pi x}{L}\right)}_{\text{even}} dx = \frac{1}{L} \int_{-L}^{L} (\text{odd function}) dx = 0$$

4.  **The resulting series are different, but agree on [0, L].** The half-range sine series and cosine series for the same $f(x)$ are completely different functions. However, they are constructed to be identical to $f(x)$ on the interval where it was originally defined, $[0, L]$. Outside this interval, they represent the corresponding odd or even periodic extension.

## Worked example
Find the half-range **sine** series for the function $f(x) = x$ on the interval $[0, \pi]$.

**1. Identify the Goal and Method**
We need a sine series, which requires an odd extension. The function is defined on $[0, L]$ with $L=\pi$. The period of the extended function will be $2L = 2\pi$. A sine series has the form $f(x) = \sum_{n=1}^{\infty} b_n \sin(\frac{n\pi x}{L})$. Since $L=\pi$, this simplifies to $f(x) = \sum_{n=1}^{\infty} b_n \sin(nx)$.

**2. Formulate the Coefficient Integral**
For a half-range sine series, the coefficients are given by:
$$b_n = \frac{2}{L} \int_0^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx$$
Substituting $f(x) = x$ and $L=\pi$:
$$b_n = \frac{2}{\pi} \int_0^\pi x \sin(nx) dx$$

**3. Compute the Integral**
We use integration by parts: $\int u dv = uv - \int v du$.
Let $u = x \implies du = dx$.
Let $dv = \sin(nx) dx \implies v = -\frac{1}{n}\cos(nx)$.

$$b_n = \frac{2}{\pi} \left[ \left. -\frac{x}{n}\cos(nx) \right|_0^\pi - \int_0^\pi \left(-\frac{1}{n}\cos(nx)\right) dx \right]$$
$$b_n = \frac{2}{\pi} \left[ \left( -\frac{\pi}{n}\cos(n\pi) - 0 \right) + \frac{1}{n} \int_0^\pi \cos(nx) dx \right]$$
$$b_n = \frac{2}{\pi} \left[ -\frac{\pi}{n}\cos(n\pi) + \frac{1}{n} \left[ \frac{1}{n}\sin(nx) \right]_0^\pi \right]$$
The sine term evaluates to zero at both $\pi$ and $0$: $\sin(n\pi) = 0$ and $\sin(0)=0$.
$$b_n = \frac{2}{\pi} \left[ -\frac{\pi}{n}\cos(n\pi) \right] = -\frac{2}{n}\cos(n\pi)$$

**4. Simplify the Coefficient**
Recall that $\cos(n\pi) = (-1)^n$ for integer $n$.
$$b_n = -\frac{2}{n}(-1)^n = \frac{2}{n}(-1)(-1)^n = \frac{2}{n}(-1)^{n+1}$$

**5. Write the Final Series**
Substitute the coefficient back into the series form:
$$f(x) = \sum_{n=1}^{\infty} \frac{2(-1)^{n+1}}{n} \sin(nx)$$
$$f(x) = 2 \left( \sin(x) - \frac{1}{2}\sin(2x) + \frac{1}{3}\sin(3x) - \dots \right)$$

*Reflection:* We needed a sine series, so we implicitly created an odd extension of $f(x)=x$. This new function on $[-\pi, \pi]$ is simply $g(x)=x$, which is odd. The standard Fourier series for $g(x)=x$ has no cosine terms, which is exactly what we found. The half-range formula is a shortcut that avoids explicitly defining the extension by baking the symmetry properties into the integral limits.

## Diagrams
Here is the function $f(x)=x$ on $[0, \pi]$ and its two possible extensions.

**Even Extension (for Cosine Series):**
```text
      ^ y
      |
  \   |   /
   \  |  /
    \ | /
     \|/
<-----+-----> x
 -pi  |   pi
      |
```
This is the graph of $f(x)=|x|$ on $[-\pi, \pi]$. It is symmetric across the y-axis.

**Odd Extension (for Sine Series):**
```text
      ^ y
      |   /
      |  /
      | /
<-----+-----> x
 -pi  |/  pi
     /|
    / |
   /  |
```
This is the graph of $f(x)=x$ on $[-\pi, \pi]$. It has 180-degree rotational symmetry about the origin.

## Memory technique — remember this forever
1.  **Mnemonic:**
    - **COsEvEn**: To get a **CO**sine series, you need an **EvEn** extension.
    - **SINODD**: To get a **SIN**e series, you need an **ODD** extension.

2.  **Must-know formulas:** For a function $f(x)$ on $[0, L]$:
    - **Cosine Series:** $f(x) = \frac{a_0}{2} + \sum_{n=1}^{\infty} a_n \cos(\frac{n\pi x}{L})$
      $$a_0 = \frac{2}{L} \int_0^L f(x) dx \quad , \quad a_n = \frac{2}{L} \int_0^L f(x) \cos\left(\frac{n\pi x}{L}\right) dx$$
    - **Sine Series:** $f(x) = \sum_{n=1}^{\infty} b_n \sin(\frac{n\pi x}{L})$
      $$b_n = \frac{2}{L} \int_0^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx$$
    Notice the factor of $2/L$ in *all* of them.

3.  **Spaced Repetition Schedule:** Review these formulas and the COsEvEn/SINODD mnemonic now. Then again in **1 day**, **3 days**, **7 days**, **16 days**, and **35 days**.

4.  **First Principles Pathway:** If you forget the half-range formulas, re-derive them.
    - Start with the full Fourier series formulas on $[-L, L]$.
    - For a cosine series, assume $f(x)$ is even. Write $a_n = \frac{1}{L}\int_{-L}^L f(x)\cos(\dots)dx$. The integrand is (even)x(even)=(even). Therefore, $\int_{-L}^L = 2\int_0^L$. You have re-derived the formula.
    - For a sine series, assume $f(x)$ is odd. Write $b_n = \frac{1}{L}\int_{-L}^L f(x)\sin(\dots)dx$. The integrand is (odd)x(odd)=(even). Therefore, $\int_{-L}^L = 2\int_0^L$. Done.

## Common mistakes
1.  **Forgetting the Factor of 2:** The half-range coefficient formulas have a $\frac{2}{L}$ factor, whereas the full-range formulas have $\frac{1}{L}$. This is a direct result of changing the integration interval from $[-L, L]$ to $[0, L]$.
2.  **Incorrect Period:** The function is defined on $[0, L]$, but the periodic extension you create has a fundamental period of $2L$. This means the arguments of the trig functions are $\frac{n\pi x}{L}$, not $\frac{2n\pi x}{L}$.
3.  **Mixing Series Types:** Using the cosine coefficient formula ($a_n$) but putting it in front of a $\sin$ term in the final series. Remember COsEvEn and SINODD.
4.  **Boundary Condition Mismatch:** Forgetting *why* you'd choose one series over another. A sine series is naturally zero at $x=0$ and $x=L$. A cosine series has a zero derivative at $x=0$ and $x=L$. Choosing the wrong one for a PDE problem means you cannot satisfy the boundary conditions.

## Self-check
1.  Find the half-range **cosine** series for $f(x) = C$ (a constant) on the interval $[0, L]$. What do you notice about the result for $n \ge 1$?
2.  Find the half-range **sine** series for $f(x) = \sin(x)$ on the interval $[0, \pi]$.
3.  Consider a 1D heat equation problem on a rod of length $L$. The end at $x=0$ is held at a fixed temperature, and the end at $x=L$ is perfectly insulated (meaning the temperature gradient, $\partial u / \partial x$, is zero). To satisfy the boundary condition at $x=L$, would a standard sine or cosine series be more appropriate? Why?