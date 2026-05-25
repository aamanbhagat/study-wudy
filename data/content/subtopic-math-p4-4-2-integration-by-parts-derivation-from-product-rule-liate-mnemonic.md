## What it is
Integration by parts is a technique for integrating a product of two functions. It transforms one difficult integral into another, hopefully simpler, integral. It is the inverse of the product rule for differentiation.

## Why it matters
This technique is fundamental for solving many ordinary and partial differential equations that model physical systems, from orbital mechanics to heat transfer. It is essential for deriving Fourier series, which are used in signal processing and solving wave equations in physics. In machine learning and statistics, it is used to find expectation values and moments of probability distributions.

## When to study it
You must have mastered basic differentiation, especially the **product rule**, and basic integration, including **u-substitution** and the standard integrals of polynomial, exponential, and trigonometric functions. If you cannot differentiate $f(x)g(x)$ or integrate $\int \sin(x) dx$ and $\int e^x dx$ instantly, review those topics first.

## How to study it (step by step)
1.  **Derive the Formula (15 min):** Start with the product rule for differentiation, $\frac{d}{dx}(uv) = u\frac{dv}{dx} + v\frac{du}{dx}$. Integrate both sides with respect to $x$ and rearrange the terms to isolate $\int u \frac{dv}{dx} dx$. This will give you the integration by parts formula. Do not just memorize it; build it.
2.  **Understand the Strategy (10 min):** The goal is to choose the parts, $u$ and $dv$, such that the new integral, $\int v \, du$, is simpler than the original, $\int u \, dv$. This usually means choosing a $u$ that simplifies upon differentiation (like $x^n$) and a $dv$ that is easy to integrate.
3.  **Learn the Mnemonic (5 min):** Memorize the **LIATE** rule for choosing $u$: **L**ogarithmic, **I**nverse trigonometric, **A**lgebraic, **T**rigonometric, **E**xponential. The function type that appears first in this list should be your choice for $u$.
4.  **Solve Standard Problems (30 min):** Apply the formula and LIATE to solve these canonical examples: $\int x e^x dx$, $\int x \cos(x) dx$, and $\int \ln(x) dx$. For $\int \ln(x) dx$, you'll need the insight that $dv = dx$.
5.  **Practice Repeated Application (20 min):** Solve an integral that requires applying the technique twice, such as $\int x^2 e^x dx$. Observe how the power of $x$ decreases with each step.
6.  **Explore the "Loop" (20 min):** Solve an integral like $\int e^x \sin(x) dx$. Applying integration by parts twice will lead you back to the original integral. This is not a failure; you can solve for the integral algebraically.

## Key ideas, with intuition
1.  **It is the Product Rule in Reverse:**
    The product rule states:
    $$ \frac{d}{dx}[u(x)v(x)] = u'(x)v(x) + u(x)v'(x) $$
    Integrating both sides with respect to $x$ gives:
    $$ \int \frac{d}{dx}[u(x)v(x)] dx = \int u'(x)v(x) dx + \int u(x)v'(x) dx $$
    The left side simplifies by the Fundamental Theorem of Calculus:
    $$ u(x)v(x) = \int v \, du + \int u \, dv $$
    Rearranging gives the familiar formula. The core intuition is that we are "undoing" a product differentiation.

2.  **The Goal is Simplification via a Trade:**
    You are trading the problem of computing $\int u \, dv$ for the problem of computing $\int v \, du$.
    $$ \int u \, dv = uv - \int v \, du $$
    A successful trade means $\int v \, du$ is easier to solve. This happens if differentiating $u$ makes it simpler (e.g., $u=x^2 \implies du=2x \, dx$) while integrating $dv$ does not make it significantly more complex (e.g., $dv = e^x dx \implies v=e^x$).

3.  **The Choice of `u` is Critical (LIATE):**
    The LIATE mnemonic provides a hierarchy for choosing $u$.
    -   **L**ogarithmic ($ \ln(x), \log_b(x) $)
    -   **I**nverse Trig ($ \arcsin(x), \arctan(x) $)
    -   **A**lgebraic ($ x^2, 3x+5 $)
    -   **T**rigonometric ($ \sin(x), \cos(x) $)
    -   **E**xponential ($ e^x, 2^x $)
    Why this order? Functions at the top of the list (L, I) become much simpler when differentiated (e.g., $\frac{d}{dx}\ln(x) = \frac{1}{x}$). Functions at the bottom (T, E) do not become more complex when integrated; they often cycle or stay the same. LIATE optimizes the trade.

## Worked example
Evaluate $\int x \sin(x) dx$.

1.  **Choose `u` and `dv`:**
    The integrand is a product of an algebraic function ($x$) and a trigonometric function ($\sin(x)$). Following LIATE, 'A' comes before 'T', so we choose:
    -   $u = x$
    -   $dv = \sin(x) dx$

2.  **Compute `du` and `v`:**
    -   Differentiate $u$: $du = \frac{d}{dx}(x) dx = 1 \cdot dx = dx$.
    -   Integrate $dv$: $v = \int \sin(x) dx = -\cos(x)$. (We omit the constant of integration here; it will be handled at the end).

3.  **Apply the formula $\int u \, dv = uv - \int v \, du$:**
    $$ \int x \sin(x) dx = (x)(-\cos(x)) - \int (-\cos(x)) dx $$

4.  **Simplify and solve the new integral:**
    $$ = -x \cos(x) - (-\int \cos(x) dx) $$
    $$ = -x \cos(x) + \int \cos(x) dx $$
    The new integral, $\int \cos(x) dx$, is a standard one.
    $$ = -x \cos(x) + \sin(x) + C $$

**Reflection:** The choice worked perfectly. Differentiating $u=x$ turned it into $du=dx$, effectively removing the polynomial term inside the new integral. Integrating $dv=\sin(x)dx$ was straightforward. The trade resulted in a much simpler problem.

## Diagrams
The formula $\int u \, dv = uv - \int v \, du$ has a clean geometric interpretation. Consider a curve in the $u,v$ plane. The area of the large rectangle defined by points $(0,0)$ and $(u_2, v_2)$ is $u_2 v_2$. This area can be decomposed.

```text
    v
    ^
    |
v_2 +-------+------+
    |       |      |
    |   B   |  A   |
    |       |      |
v_1 +-------+------+
    |   C   |      |
    +----------------> u
          u_1    u_2

Let the curve be defined by v(u).
Area A = Integral of v with respect to u, from u_1 to u_2.
Area A = ∫ v du

Area B = Integral of u with respect to v, from v_1 to v_2.
Area B = ∫ u dv

The total area of the large rectangle is u_2 * v_2.
The area of the small rectangle C is u_1 * v_1.
The sum of the two integral areas is the difference of the rectangles:
Area A + Area B = u_2*v_2 - u_1*v_1
∫ v du + ∫ u dv = [uv]

Rearranging gives the formula for integration by parts for definite integrals:
∫ u dv = [uv] - ∫ v du
```

## Memory technique — remember this forever
1.  **Mnemonic:** "UltraViolet Voodoo" for the formula's structure: $\int \mathbf{u} \, \mathbf{dv} = \mathbf{u}\mathbf{v} - \int \mathbf{v} \, \mathbf{du}$.
2.  **Overlearn this formula:**
    $$ \int u \, dv = uv - \int v \, du $$
3.  **Spaced Repetition Schedule:**
    -   Review this entire lesson and re-derive the formula from the product rule in **1 day**.
    -   Solve 3 new problems in **3 days**.
    -   Solve a "looping" problem in **7 days**.
    -   Review the geometric interpretation in **16 days**.
    -   Teach the concept to a friend or write it out from scratch in **35 days**.
4.  **First Principles Pathway:** If you forget the formula, never guess. Re-derive it in 30 seconds.
    -   Start with the product rule: $(uv)' = u'v + uv'$.
    -   Integrate both sides: $\int (uv)' dx = \int u'v dx + \int uv' dx$.
    -   Simplify: $uv = \int v \, du + \int u \, dv$.
    -   Isolate the term you want: $\int u \, dv = uv - \int v \, du$.

## Common mistakes
1.  **Incorrect choice of `u` and `dv`:** In $\int x e^x dx$, if you choose $u=e^x$ and $dv=x dx$, you get $du=e^x dx$ and $v=x^2/2$. The new integral becomes $\int \frac{x^2}{2} e^x dx$, which is more complex. Always follow LIATE.
2.  **Sign errors:** Forgetting the minus sign in the formula, or making a mistake when integrating $dv$ (e.g., $\int \cos(x) dx = -\sin(x)$ is a common error).
3.  **Forgetting `dx`:** The differentials $du$ and $dv$ are critical. Writing $dv = \sin(x)$ instead of $dv = \sin(x) dx$ is sloppy and leads to conceptual errors.
4.  **Mistakes with definite integrals:** When evaluating a definite integral $\int_a^b u \, dv$, the $uv$ term must also be evaluated at the bounds: $[uv]_a^b - \int_a^b v \, du$. Forgetting to do this is a frequent error.

## Self-check
1.  Evaluate $\int x \ln(x) dx$.
2.  Evaluate $\int x^2 \cos(x) dx$. (This will require two applications of the method).
3.  Evaluate $\int \arctan(x) dx$. (Hint: what is the simplest possible choice for $dv$?)