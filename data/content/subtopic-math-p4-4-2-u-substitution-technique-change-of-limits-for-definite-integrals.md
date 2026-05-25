## What it is
U-substitution is a method for finding integrals by reversing the chain rule of differentiation. It simplifies a complicated integral by changing the original variable of integration (e.g., $x$) to a new, more manageable variable (e.g., $u$). For definite integrals, this change of variable also requires changing the limits of integration to match the new variable.

## Why it matters
This is the single most important integration technique you will learn, forming the basis for more advanced methods. In physics, it's essential for solving differential equations that model everything from rocket trajectories under variable thrust to the decay of radioactive elements. In machine learning, it's used to normalize probability distributions, such as the Gaussian (normal) distribution, which is fundamental to statistical modeling.

## When to study it
You must be fluent with the following prerequisites. If you are not, master them first.
1.  **Differentiation:** Specifically, the chain rule, e.g., $\frac{d}{dx} f(g(x)) = f'(g(x))g'(x)$.
2.  **Basic Antiderivatives:** You must instantly know the antiderivatives of elementary functions like $x^n$, $\sin(x)$, $\cos(x)$, $e^x$, and $\frac{1}{x}$.
3.  **The Fundamental Theorem of Calculus (Part 2):** You must understand and be able to apply $\int_{a}^{b} f(x) dx = F(b) - F(a)$, where $F'(x) = f(x)$.

## How to study it (step by step)
1.  **Derive it from the chain rule.** Write down the chain rule: $\frac{d}{dx} [F(g(x))] = F'(g(x))g'(x)$. Integrate both sides with respect to $x$. By the Fundamental Theorem of Calculus, the integral of the derivative is the original function, so you get $F(g(x)) = \int F'(g(x))g'(x) dx$. This is the formal basis for the technique. Stare at this until it makes sense.
2.  **Practice indefinite integrals first.** Solve 5-10 problems of the form $\int f(g(x))g'(x) dx$. Your only goal is to identify $u=g(x)$, find $du=g'(x)dx$, substitute, integrate with respect to $u$, and then substitute back to $x$. This builds the core mechanical skill without the complication of limits.
3.  **Understand why limits must change.** Consider $\int_{x=a}^{x=b} f(x) dx$. The limits $a$ and $b$ are $x$-values. If you change the variable to $u=g(x)$, the entire integral must be expressed in terms of $u$. The new limits will be the corresponding $u$-values: $u_{lower} = g(a)$ and $u_{upper} = g(b)$. It is incoherent to use $x$-limits for a $u$-integral.
4.  **Solve a definite integral in two ways.** Take a simple problem like $\int_{0}^{1} (2x+1)^3 dx$. First, solve it by finding the indefinite integral, substituting back to $x$, and then using the original limits $x=0$ and $x=1$. Second, solve it by changing the limits to $u(0)=1$ and $u(1)=3$, integrating, and evaluating directly with the new $u$-limits. See that you get the same answer. The second method is superior.
5.  **Drill definite integrals.** Solve 10-15 problems from a standard textbook that explicitly require changing the limits. Focus on identifying the "inner function" $g(x)$ that will become your $u$.

## Key ideas, with intuition
1.  **It's the Chain Rule in reverse.** The chain rule produces a derivative with an "inner function" and the derivative of that inner function multiplied on the outside. U-substitution looks for this exact pattern: an "inner part" ($u$) and its derivative ($du$) sitting nearby in the integrand.
    $$ \underbrace{\frac{d}{dx} \sin(x^2)}_{\text{Chain Rule}} = \cos(x^2) \cdot 2x \quad \iff \quad \underbrace{\int \cos(x^2) \cdot 2x \, dx}_{\text{U-Substitution}} = \sin(x^2) + C $$
2.  **It's a change of coordinates.** Think of the integral as calculating an area. When you perform a substitution $u=g(x)$, you are stretching or compressing the horizontal axis. The term $du = g'(x)dx$ is the "stretching factor" that tells you how a tiny interval $dx$ in the $x$-world relates to a tiny interval $du$ in the $u$-world. To preserve the total area, you must account for this distortion factor.
3.  **You must fully commit to the new world.** When you change the variable from $x$ to $u$, everything must change. You cannot have an integral with a mix of $x$ and $u$ variables. This applies to the function, the differential ($dx \to du$), and crucially, the limits of integration ($a, b \to g(a), g(b)$).
    $$ \int_{x=a}^{x=b} f(\underbrace{g(x)}_{u}) \underbrace{g'(x)dx}_{du} \quad \longrightarrow \quad \int_{u=g(a)}^{u=g(b)} f(u) du $$
    Once you've made the change, you never have to go back to $x$. The problem is now completely self-contained in the $u$-world.

## Worked example
Calculate $\int_{1}^{e} \frac{\ln(x)}{x} dx$.

1.  **Identify the pattern.** We see a function, $\ln(x)$, and its derivative, $\frac{1}{x}$, present in the integrand. This is a strong signal for u-substitution.
2.  **Choose $u$.** Let $u = \ln(x)$. This is our "inner function".
3.  **Find $du$.** Differentiate $u$ with respect to $x$: $\frac{du}{dx} = \frac{1}{x}$. Rearrange to find the differential: $du = \frac{1}{x} dx$.
4.  **Change the limits of integration.** These must be converted from $x$-values to $u$-values.
    *   Lower limit: $x=1 \implies u = \ln(1) = 0$.
    *   Upper limit: $x=e \implies u = \ln(e) = 1$.
5.  **Substitute everything into the integral.** We replace $\ln(x)$ with $u$, and we replace the group $\frac{1}{x} dx$ with $du$. We use our new limits.
    $$ \int_{x=1}^{x=e} \underbrace{\ln(x)}_{u} \underbrace{\frac{1}{x} dx}_{du} = \int_{u=0}^{u=1} u \, du $$
6.  **Integrate and evaluate.** The new integral is much simpler.
    $$ \int_{0}^{1} u \, du = \left[ \frac{1}{2}u^2 \right]_{0}^{1} = \frac{1}{2}(1)^2 - \frac{1}{2}(0)^2 = \frac{1}{2} $$

**Reflection:** The choice of $u = \ln(x)$ was effective because its derivative, $\frac{1}{x} dx$, was available to be absorbed into $du$. Changing the limits from $[1, e]$ to $[0, 1]$ allowed us to solve the problem completely in the simpler "$u$-world" without ever needing to substitute back to $x$.

## Diagrams
This diagram shows the mapping of the interval of integration from the $x$-axis to the $u$-axis. The calculation of the area is performed in the simpler "$u$-space".

```text
      x-world                               u-world
        |                                      |
        |                                      |
  Area under y=ln(x)/x                  Area under y=u
        |                                      |
        |                                      |
<-------|----------------|-------> x   <---|----|-----------> u
        1                e                 0    1
        ^                ^                 ^    ^
        |                |                 |    |
       x_a              x_b               u_a  u_b
        |                |                 |    |
        +---- u=ln(x) --->                 |
        |      maps      +---- u=ln(x) --->
        |     points           maps
        +--------------------> points

The integral on the left is transformed into the simpler integral on the right.
The interval [1, e] on the x-axis is mapped to the interval [0, 1] on the u-axis.
```

## Memory technique — remember this forever
1.  **Mnemonic: "The Full Conversion."** When you travel to a new country (the "u-world"), you must change everything: your currency (the function and differential) AND your itinerary (the limits). You can't spend dollars on a European trip; you must convert them to Euros. Likewise, you can't use $x$-limits in a $u$-integral; you must convert them.
2.  **Formulas to overlearn:**
    *   Indefinite: If $u=g(x)$, then $\int f(g(x))g'(x)dx = \int f(u)du$.
    *   Definite: $\int_{a}^{b} f(g(x))g'(x)dx = \int_{g(a)}^{g(b)} f(u)du$.
3.  **Spaced Repetition Schedule:** Review this material and solve one problem at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. This will lock it into long-term memory.
4.  **First Principles Pathway:** If you forget the definite integral formula, re-derive it.
    *   Start with the chain rule: $\frac{d}{dx} F(g(x)) = F'(g(x))g'(x)$.
    *   Integrate both sides from $x=a$ to $x=b$: $\int_a^b \frac{d}{dx} F(g(x)) dx = \int_a^b F'(g(x))g'(x) dx$.
    *   The left side, by the Fundamental Theorem of Calculus, is $[F(g(x))]_a^b = F(g(b)) - F(g(a))$.
    *   Let $f = F'$ and $u=g(x)$. The right side of the FTOC evaluation, $F(g(b)) - F(g(a))$, is exactly what you would get by evaluating $[F(u)]_{g(a)}^{g(b)}$. This is the definition of the definite integral $\int_{g(a)}^{g(b)} f(u)du$.
    *   Therefore, $\int_{a}^{b} f(g(x))g'(x)dx = \int_{g(a)}^{g(b)} f(u)du$.

## Common mistakes
1.  **Forgetting to change the limits.** This is the most common error. Students substitute $u$ and $du$, integrate, and then plug in the original $x$-limits $a$ and $b$ into the final $u$-expression. This is dimensionally and logically incorrect.
2.  **Incorrectly calculating $du$.** Students often forget constants. If $u = 3x^2$, then $du = 6x \, dx$. Forgetting the '6' will give an incorrect answer. The differential $du$ must be calculated precisely.
3.  **Mixing variables.** After substitution, the integral must contain *only* the variable $u$ and the differential $du$. An expression like $\int_{0}^{1} u \cdot x \, du$ is meaningless and cannot be integrated. You must find a way to express any leftover $x$'s in terms of $u$.

## Self-check
Do not look up the answers. Work them from first principles. If you cannot solve them, you have not mastered the material.

1.  (Easy) Evaluate $\int_{0}^{2} x(x^2+1)^2 dx$.
2.  (Medium) Evaluate $\int_{0}^{\pi/2} \cos^3(x)\sin(x) dx$.
3.  (Hard) Evaluate $\int_{1}^{2} \frac{e^{1/x}}{x^2} dx$.