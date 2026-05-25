## What it is
The Fundamental Theorem of Calculus (FTC) is a theorem with two parts that formally connects the concepts of differentiation and integration. Part 1 states that the derivative of an "area-so-far" function is the original function itself, establishing differentiation as the inverse of integration. Part 2 provides a method for calculating a definite integral using any antiderivative of the function being integrated.

## Why it matters
This theorem is the bedrock of continuous mathematics and its applications. In physics, it allows you to find an object's position by integrating its velocity, or its velocity by integrating its acceleration—the core of kinematics and orbital mechanics. In machine learning, it's used to calculate cumulative distribution functions from probability density functions, which is fundamental to probabilistic modeling.

## When to study it
Before tackling these proofs, you must have a solid grasp of the following prerequisites. If any are weak, review them first.
- **Limits:** The formal $\epsilon-\delta$ definition is not required, but you must have strong intuition and computational skill.
- **Derivatives:** Specifically, the limit definition of the derivative, $f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$.
- **Definite Integrals:** The definition of the definite integral as the limit of a Riemann sum, $\int_a^b f(x) dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \Delta x$.
- **Continuity and the Extreme Value Theorem:** A continuous function on a closed interval $[a, b]$ attains a maximum and minimum value.
- **Mean Value Theorem for Integrals:** If $f$ is continuous on $[a, b]$, then there exists a number $c$ in $[a, b]$ such that $\int_a^b f(x) dx = f(c)(b-a)$. This is helpful but we can also prove the FTC without it, using a bounding argument.

## How to study it (step by step)
1.  **Define the Area Function:** Spend 15 minutes internalizing the concept of the "area accumulator" function, $G(x) = \int_a^x f(t) dt$. Draw a function $f(t)$ and shade the area represented by $G(2)$, then $G(3)$. See how $G(x)$ changes as $x$ increases.
2.  **Prove FTC Part 1:** Take 30 minutes to write out the proof of FTC1 from first principles. Start with the limit definition of the derivative for $G(x)$, $G'(x) = \lim_{h \to 0} \frac{G(x+h) - G(x)}{h}$. Do not proceed until every step of this proof is clear.
3.  **Connect the Parts:** Spend 15 minutes understanding how FTC1 logically implies FTC2. The key is realizing that any two antiderivatives of the same function must differ by a constant.
4.  **Prove FTC Part 2:** Take 20 minutes to write out the proof of FTC2. This proof is shorter but relies entirely on the result from FTC1.
5.  **Solve Problems:** Spend 30 minutes solving problems. Find the derivative of integrals like $\frac{d}{dx} \int_2^x \cos(t) dt$. Then, compute definite integrals like $\int_0^\pi \sin(x) dx$ using an antiderivative.

## Key ideas, with intuition
1.  **The Area Accumulator Function:** Imagine you are filling a container whose width varies according to some function $f(t)$. The integral $G(x) = \int_a^x f(t) dt$ represents the total *volume* accumulated up to time $x$. It is a function of the endpoint, $x$. The dummy variable $t$ is used for integration because $x$ is already taken as the upper bound.

2.  **FTC Part 1: The rate of accumulation is the function value.**
    - *Statement:* If $f$ is continuous on $[a, b]$, then the function $G(x) = \int_a^x f(t) dt$ is continuous on $[a, b]$ and differentiable on $(a, b)$, and its derivative is $G'(x) = f(x)$.
    - *Intuition:* Think about the area accumulator. What is the rate of change of the accumulated area at point $x$? It's the rate at which you are adding new area. This rate is determined by the height of the function, $f(x)$, at that exact point. If $f(x)$ is large, the area accumulates quickly. If $f(x)$ is small, it accumulates slowly.
    - *Proof of FTC1:*
        Let $G(x) = \int_a^x f(t) dt$. We use the limit definition for $G'(x)$:
        $$ G'(x) = \lim_{h \to 0} \frac{G(x+h) - G(x)}{h} $$
        Substitute the definition of $G(x)$:
        $$ G'(x) = \lim_{h \to 0} \frac{1}{h} \left( \int_a^{x+h} f(t) dt - \int_a^x f(t) dt \right) $$
        Using the integral property $\int_a^c f = \int_a^b f + \int_b^c f$, we can simplify the numerator:
        $$ \int_a^{x+h} f(t) dt - \int_a^x f(t) dt = \int_x^{x+h} f(t) dt $$
        So, we have:
        $$ G'(x) = \lim_{h \to 0} \frac{1}{h} \int_x^{x+h} f(t) dt $$
        This integral represents the area of a thin sliver of width $h$. By the Mean Value Theorem for Integrals, there exists some $c$ in $[x, x+h]$ such that $\int_x^{x+h} f(t) dt = f(c) \cdot ((x+h) - x) = f(c) \cdot h$.
        Substituting this back in:
        $$ G'(x) = \lim_{h \to 0} \frac{1}{h} [f(c) \cdot h] = \lim_{h \to 0} f(c) $$
        As $h \to 0$, the interval $[x, x+h]$ shrinks, forcing $c \to x$. Since $f$ is continuous, $\lim_{c \to x} f(c) = f(x)$.
        Therefore, $G'(x) = f(x)$.

3.  **FTC Part 2: Net change in the antiderivative gives total accumulation.**
    - *Statement:* If $f$ is continuous on $[a, b]$ and $F$ is any antiderivative of $f$ (meaning $F'(x) = f(x)$), then $\int_a^b f(x) dx = F(b) - F(a)$.
    - *Intuition:* If you know the rate of change of a quantity ($f(x)$), the total change in that quantity from $a$ to $b$ is simply its value at $b$ minus its value at $a$. The integral sums up all the infinitesimal changes (the rate $f(x)$ times the tiny interval $dx$) to give the total net change.
    - *Proof of FTC2:*
        Let $G(x) = \int_a^x f(t) dt$. From FTC1, we know $G'(x) = f(x)$.
        We are given that $F$ is also an antiderivative of $f$, so $F'(x) = f(x)$.
        Since $G$ and $F$ have the same derivative, they must differ by a constant. So, $G(x) = F(x) + C$ for some constant $C$.
        To find $C$, we can evaluate at a convenient point, $x=a$:
        $$ G(a) = \int_a^a f(t) dt = 0 $$
        So, $G(a) = F(a) + C \implies 0 = F(a) + C \implies C = -F(a)$.
        Thus, our relationship is $G(x) = F(x) - F(a)$.
        To find the value of the definite integral from $a$ to $b$, we just need to evaluate $G(b)$:
        $$ G(b) = \int_a^b f(t) dt = F(b) - F(a) $$
        This completes the proof.

## Worked example
Calculate $\int_1^3 x^2 dx$.

1.  **Identify the function:** The integrand is $f(x) = x^2$.
2.  **Find an antiderivative:** We need a function $F(x)$ such that $F'(x) = x^2$. Using the power rule for integration, we find an antiderivative is $F(x) = \frac{x^3}{3}$. We do not need the constant of integration, $+C$, for definite integrals because it will cancel out.
3.  **Apply FTC Part 2:** The theorem states $\int_a^b f(x) dx = F(b) - F(a)$.
    Here, $a=1$ and $b=3$.
    $$ \int_1^3 x^2 dx = F(3) - F(1) $$
4.  **Evaluate:**
    $$ F(3) = \frac{3^3}{3} = \frac{27}{3} = 9 $$
    $$ F(1) = \frac{1^3}{3} = \frac{1}{3} $$
5.  **Calculate the final result:**
    $$ \int_1^3 x^2 dx = 9 - \frac{1}{3} = \frac{27}{3} - \frac{1}{3} = \frac{26}{3} $$

*Reflection:* Step 1 identified our target function. Step 2 reversed the process of differentiation to find the family of functions whose rate of change is $x^2$. Step 3 applied the main computational tool of the FTC. Steps 4 and 5 were arithmetic execution of the formula. The theorem allowed us to find the exact area under the curve $y=x^2$ from $x=1$ to $x=3$ without resorting to the limit of a Riemann sum.

## Diagrams
**FTC Part 1:** Visualizing the derivative of the area function. The change in area, $G(x+h) - G(x)$, is the area of the shaded sliver. This sliver can be approximated by a rectangle of height $f(x)$ and width $h$.

```text
      y
      |
      |        f(t)
      |       /
      |      /|
      |     / |
      |    /..|
      |   /:::|
      |  /::::|
      | /:::::|
      +----------------------> t
      0  a    x  x+h   b

      Shaded Area (:::) = G(x+h) - G(x) = integral from x to x+h
```

**FTC Part 2:** Visualizing the total area under the curve from $a$ to $b$. FTC2 gives us a way to calculate this entire shaded area by only evaluating an antiderivative at the endpoints.

```text
      y
      |
      |        f(x)
      |       /
      |      /
      |     /
      |    /
      |   /
      |  /
      | /
      +----------------------> x
      0  a:::::::::::::::b

      Shaded Area (:::) = integral from a to b = F(b) - F(a)
```

## Memory technique — remember this forever
1.  **The Story:** Think of integration as "Accumulation" and differentiation as measuring the "Rate of Change."
    - **FTC1:** The rate at which your total accumulation is changing *right now* ($G'(x)$) is equal to how fast you are adding to it *right now* ($f(x)$). If you are pouring water into a tank at 3 gallons/second, the volume is increasing at a rate of 3 gallons/second. Simple.
    - **FTC2:** The total amount of water you added between time $a$ and time $b$ ($\int_a^b f(t) dt$) is just the final volume ($F(b)$) minus the initial volume ($F(a)$).

2.  **Formulas to Overlearn:**
    - **FTC1:** $\frac{d}{dx} \int_a^x f(t) dt = f(x)$
    - **FTC2:** $\int_a^b f(x) dx = F(b) - F(a)$, where $F'(x) = f(x)$.

3.  **Spaced Repetition Schedule:**
    - Review these proofs and formulas tomorrow (1 day).
    - Then in 3 days.
    - Then in 7 days.
    - Then in 16 days.
    - Then in 35 days.
    During each review, rewrite the proofs from scratch without looking.

4.  **First Principles Pathway:**
    - If you forget **FTC1**, rebuild it from the limit definition of the derivative applied to the area function $G(x) = \int_a^x f(t) dt$. The key insight is that $\int_x^{x+h} f(t) dt \approx f(x) \cdot h$.
    - If you forget **FTC2**, remember that if you have one antiderivative ($G(x) = \int_a^x f(t) dt$ from FTC1) and another one ($F(x)$), they must differ by a constant ($G(x) = F(x) + C$). Solve for $C$ by evaluating at $x=a$.

## Common mistakes
1.  **Variable Confusion:** Confusing the integration variable (the "dummy" variable, often $t$) with the variable in the limit of integration (e.g., $x$). Remember $\frac{d}{dx} \int_a^x f(t) dt = f(x)$, not $f(t)$.
2.  **Forgetting the Chain Rule:** When applying FTC1 to a more complex bound, students forget the chain rule. For example, $\frac{d}{dx} \int_a^{g(x)} f(t) dt = f(g(x)) \cdot g'(x)$. The $g'(x)$ term is often missed.
3.  **Incorrect Antiderivative:** Simple algebraic errors when finding the antiderivative $F(x)$ are a frequent source of error in FTC2 problems. Always mentally differentiate your $F(x)$ to double-check that you get back to $f(x)$.

## Self-check
1.  Find the derivative $G'(x)$ for the function $G(x) = \int_3^x e^{t^2} dt$.
2.  Calculate the exact value of the definite integral $\int_0^{\pi/2} \cos(x) dx$.
3.  Find the derivative $H'(x)$ for the function $H(x) = \int_1^{\sin(x)} \sqrt{1+t^2} dt$.