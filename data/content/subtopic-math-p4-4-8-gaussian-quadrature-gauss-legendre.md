## What it is
Gaussian quadrature is a method for numerical integration that approximates a definite integral with a weighted sum of function values. Unlike methods like the Trapezoidal or Simpson's rule which use equally spaced points, Gaussian quadrature strategically chooses the evaluation points (nodes) and weights to achieve the highest possible accuracy for a given number of function evaluations.

## Why it matters
This method is fundamental to the Finite Element Method (FEM), a cornerstone of modern engineering for simulating stress, heat transfer, and fluid dynamics in structures like rocket nozzles and aircraft wings. In physics, it's used to solve integral equations describing phenomena like radiative transfer in stellar atmospheres. Its efficiency and accuracy make it the default choice for numerical integration inside complex computational models.

## When to study it
Before tackling this, you must have a solid grasp of:
1.  **Basic Numerical Integration:** Understand the formulation of Newton-Cotes rules like the Trapezoidal Rule and Simpson's Rule. You should know what "degree of precision" means.
2.  **Polynomial Interpolation:** Familiarity with Lagrange basis polynomials is helpful for understanding the derivation of the weights.
3.  **Orthogonal Polynomials:** You must understand the concept of orthogonality of functions with respect to a weight function. Specifically, you need to know what Legendre Polynomials are and that they are orthogonal on the interval $[-1, 1]$ with a weight function of $w(x)=1$.

If you are missing any of these, pause and review them. Hand-waving the prerequisites will make the "why" of this method opaque.

## How to study it (step by step)
1.  **Revisit the Goal:** Write down the general form of a numerical quadrature rule: $\int_a^b f(x) dx \approx \sum_{i=1}^n w_i f(x_i)$. Contrast the fixed, evenly-spaced $x_i$ of Newton-Cotes with the variable $x_i$ and $w_i$ we will find here.
2.  **Derive the 2-Point Rule:** We have 4 unknowns for $n=2$: $w_1, w_2, x_1, x_2$. This means we can satisfy 4 constraints. Force the rule $\int_{-1}^1 f(x) dx \approx w_1 f(x_1) + w_2 f(x_2)$ to be exact for $f(x) = 1, x, x^2, x^3$. Solve the resulting system of four nonlinear equations. This from-scratch derivation is crucial.
3.  **Connect to Legendre Polynomials:** Observe that the nodes $x_1, x_2$ you found in the previous step are the roots of the second-degree Legendre polynomial, $P_2(x) = \frac{1}{2}(3x^2 - 1)$. This is not a coincidence. State the general principle: for an $n$-point Gauss-Legendre rule, the nodes $x_i$ are the roots of the $n$-th degree Legendre polynomial $P_n(x)$.
4.  **Master the Change of Variables:** Gauss-Legendre is defined on $[-1, 1]$. To integrate over a general interval $[a, b]$, derive and practice using the linear mapping:
    $$t = \frac{2x - (a+b)}{b-a} \implies x = \frac{b-a}{2}t + \frac{a+b}{2}$$
    and do not forget the differential element: $dx = \frac{b-a}{2}dt$.
5.  **Solve Problems:** Use a table of Gauss-Legendre nodes and weights (for n=2, 3, 4) to approximate 3-4 different integrals. Start with polynomials where you know it should be exact, then move to transcendental functions like $\sin(x)$ or $e^x$ and compare with the true result.

## Key ideas, with intuition
1.  **Doubling the Degrees of Freedom:** Newton-Cotes rules (like Simpson's) fix the $n$ nodes $x_i$ and only let you choose the $n$ weights $w_i$. This gives you $n$ degrees of freedom, which you can use to make the rule exact for polynomials up to degree $n-1$ (or $n$ for odd rules). Gaussian quadrature lets you choose *both* the $n$ nodes and the $n$ weights. With $2n$ degrees of freedom, you can satisfy $2n$ constraints, making the rule exact for polynomials up to degree $2n-1$. This is a massive leap in accuracy.

2.  **Optimal Placement via Orthogonality:** The "magic" of Gaussian quadrature comes from the choice of nodes. Placing the nodes at the roots of the $n$-th Legendre polynomial $P_n(x)$ is the optimal strategy. Why? Any polynomial $p(x)$ of degree $\leq 2n-1$ can be written as $p(x) = q(x)P_n(x) + r(x)$, where $q(x)$ and $r(x)$ are polynomials of degree $\leq n-1$. The integral is:
    $$ \int_{-1}^1 p(x) dx = \int_{-1}^1 q(x)P_n(x) dx + \int_{-1}^1 r(x) dx $$
    The first term is zero due to the orthogonality property of Legendre polynomials ($\int_{-1}^1 P_m(x) P_n(x) dx = 0$ for $m \neq n$). The quadrature rule, evaluated at the roots of $P_n(x)$, also gives:
    $$ \sum w_i p(x_i) = \sum w_i (q(x_i)P_n(x_i) + r(x_i)) = \sum w_i r(x_i) $$
    since $P_n(x_i)=0$. The problem reduces to making the rule exact for $r(x)$, which it is by construction.

3.  **The Canonical Interval:** All the "magic numbers" (the nodes $x_i$ and weights $w_i$) are defined for the canonical interval $[-1, 1]$. Any other interval $[a, b]$ must be linearly mapped to $[-1, 1]$ before the rule can be applied. This transformation is a simple, but mandatory, pre-processing step.

## Worked example
**Problem:** Calculate $\int_1^5 x^3 dx$ using the 2-point Gauss-Legendre quadrature rule and verify that it is exact.

**Step 1: State the 2-point rule for $[-1, 1]$**
For $n=2$, the nodes are the roots of $P_2(x) = \frac{1}{2}(3x^2-1)=0$, which are $x_{1,2} = \pm \frac{1}{\sqrt{3}}$. The corresponding weights are $w_1 = w_2 = 1$.
The formula is:
$$ \int_{-1}^1 f(t) dt \approx (1) \cdot f\left(-\frac{1}{\sqrt{3}}\right) + (1) \cdot f\left(\frac{1}{\sqrt{3}}\right) $$

**Step 2: Map the interval $[1, 5]$ to $[-1, 1]$**
Our integral is over $[a, b] = [1, 5]$. We need to express our variable $x$ in terms of the canonical variable $t$.
The mapping is $x = \frac{b-a}{2}t + \frac{a+b}{2}$.
$$ x = \frac{5-1}{2}t + \frac{5+1}{2} = 2t + 3 $$
The differential element becomes $dx = 2 dt$.

**Step 3: Transform the integral**
Substitute $x$ and $dx$ into the integral. The function is $g(x) = x^3$. The transformed function is $f(t) = g(2t+3) = (2t+3)^3$.
$$ \int_1^5 x^3 dx = \int_{-1}^1 (2t+3)^3 (2 dt) = 2 \int_{-1}^1 (2t+3)^3 dt $$

**Step 4: Apply the quadrature rule**
We apply the rule to the integral $\int_{-1}^1 (2t+3)^3 dt$.
Let $f(t) = (2t+3)^3$.
The integral is approximated by:
$$ \int_{-1}^1 f(t) dt \approx f\left(-\frac{1}{\sqrt{3}}\right) + f\left(\frac{1}{\sqrt{3}}\right) $$
$$ f\left(-\frac{1}{\sqrt{3}}\right) = \left(2\left(-\frac{1}{\sqrt{3}}\right)+3\right)^3 = \left(3 - \frac{2}{\sqrt{3}}\right)^3 $$
$$ f\left(\frac{1}{\sqrt{3}}\right) = \left(2\left(\frac{1}{\sqrt{3}}\right)+3\right)^3 = \left(3 + \frac{2}{\sqrt{3}}\right)^3 $$
The sum is:
$$ \left(3 - \frac{2}{\sqrt{3}}\right)^3 + \left(3 + \frac{2}{\sqrt{3}}\right)^3 $$
Using $(A-B)^3 + (A+B)^3 = 2A^3 + 6AB^2$, with $A=3, B=2/\sqrt{3}$:
$$ 2(3^3) + 6(3)\left(\frac{2}{\sqrt{3}}\right)^2 = 2(27) + 18\left(\frac{4}{3}\right) = 54 + 24 = 78 $$

**Step 5: Final calculation and verification**
The original integral is $2 \int_{-1}^1 (2t+3)^3 dt$.
Our approximation is $2 \times 78 = 156$.

Let's find the exact analytical solution:
$$ \int_1^5 x^3 dx = \left[ \frac{x^4}{4} \right]_1^5 = \frac{5^4}{4} - \frac{1^4}{4} = \frac{625 - 1}{4} = \frac{624}{4} = 156 $$
The result is exact.

**Reflection:** Each step was necessary. Step 1 provided the core formula. Step 2 was the mandatory transformation to the canonical interval. Step 3 rewrote the entire integral in terms of the new variable. Step 4 was the mechanical application of the rule. Step 5 scaled the result and verified it, demonstrating the power of the method's degree of precision ($2n-1 = 3$), which matched the degree of our polynomial integrand.

## Diagrams

Comparing a 3-point Newton-Cotes (Simpson's) rule with a 3-point Gauss-Legendre rule on $[-1, 1]$.

**Newton-Cotes (Simpson's Rule): Evenly Spaced Nodes**
```text
      f(x)
       ^
       |
       |        o........o........o
       |       / \      / \      / \
       |      /   \    /   \    /   \
       |     /     \  /     \  /     \
       +-----|-------|--------|-------|------> x
           -1.0     0.0      1.0

Nodes are fixed at -1, 0, 1.
```

**Gauss-Legendre Quadrature: Optimally Placed Nodes**
```text
      f(x)
       ^
       |
       |          o.....o.....o
       |         / \   / \   / \
       |        /   \ /   \ /   \
       |       /     o     o     \
       +-------|-----|-----|-----|----------> x
             -1.0   -sqrt(3/5)  0  sqrt(3/5)   1.0

Nodes are the roots of P_3(x), at 0 and +/- sqrt(3/5).
They are not at the boundaries and are clustered more centrally.
```

## Memory technique — remember this forever
1.  **The Story:** Think of "Gauss the Legend" as a master archer. A normal archer (Newton-Cotes) is forced to shoot from fixed, evenly-spaced positions. Gauss is a legend because he can *choose* where to stand (the nodes $x_i$) and how powerful each shot is (the weights $w_i$) to guarantee he hits the bullseye for a much harder target (a polynomial of degree $2n-1$). The secret to his stance is written in the "Book of Legends" (Legendre Polynomials).

2.  **Must Overlearn:**
    *   The form: $\int_{-1}^{1} f(x) dx \approx \sum_{i=1}^{n} w_i f(x_i)$
    *   The change of variables: $x = \frac{b-a}{2}t + \frac{a+b}{2}$ and $dx = \frac{b-a}{2}dt$.
    *   The 2-point rule: $x_i = \pm \frac{1}{\sqrt{3}}$, $w_i = 1$.

3.  **Spaced Repetition Schedule:** Review this material and re-do the worked example from a blank sheet at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget the 2-point rule values, re-derive them. Assume symmetry ($x_1 = -x_2$, $w_1 = w_2$). The formula is $\int_{-1}^1 f(x) dx \approx w_1 f(-x_1) + w_1 f(x_1)$.
    *   Exact for $f(x)=1$: $\int_{-1}^1 1 dx = 2$. Rule gives $w_1(1) + w_1(1) = 2w_1$. So $w_1=1$.
    *   Exact for $f(x)=x^2$: $\int_{-1}^1 x^2 dx = \frac{2}{3}$. Rule gives $(1)(-x_1)^2 + (1)(x_1)^2 = 2x_1^2$. So $2x_1^2 = 2/3 \implies x_1 = 1/\sqrt{3}$.
    This reconstructs the rule in two minutes.

## Common mistakes
1.  **Forgetting the Jacobian:** When changing variables from $[a,b]$ to $[-1,1]$, students often forget to transform the differential $dx$ to $\frac{b-a}{2}dt$. This scales the entire result incorrectly.
2.  **Integrating on the Wrong Interval:** Applying the standard nodes $x_i$ and weights $w_i$ directly to an integral on $[0, \pi]$ without first mapping it to $[-1, 1]$. The special values are only valid on the canonical interval.
3.  **Miscalculating the Transformed Function:** If you are integrating $\int_0^{\pi/2} \cos(x) dx$, the new function is not $\cos(t)$. You must substitute the full expression for $x(t)$ into the cosine, i.e., $f(t) = \cos\left(\frac{\pi}{4}t + \frac{\pi}{4}\right)$.

## Self-check
1.  Use the 2-point Gauss-Legendre rule to approximate $\int_{-1}^1 (5x^3 - x + 2) dx$. What do you expect the answer to be, and why?
2.  Use the 3-point Gauss-Legendre rule to approximate $\int_0^2 e^{-x^2} dx$. The nodes are $x_i = 0, \pm\sqrt{3/5}$ and the weights are $w_i = 8/9, 5/9, 5/9$.
3.  What is the highest degree of polynomial for which a 5-point Gauss-Legendre quadrature rule is guaranteed to be exact? How does this compare to a 5-point Newton-Cotes formula (like Boole's rule)?