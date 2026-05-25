## What it is
The average value of a function $f(x)$ over an interval $[a, b]$ is the height $f_{avg}$ of a rectangle with width $(b-a)$ whose area is exactly equal to the area under the curve of $f(x)$ from $a$ to $b$. It represents the single value that, if constant across the interval, would produce the same net accumulation as the original function.

## Why it matters
In physics, this concept is used to find the average velocity of an object when its velocity function is non-linear, or the average force exerted by a variable-thrust rocket engine during a burn. In signal processing and machine learning, it helps determine the DC offset (average level) of a time-varying signal or the average loss over a continuous parameter space. It is a fundamental tool for summarizing the behavior of a function over an interval.

## When to study it
You must have a firm grasp of two concepts before proceeding.
1.  **The Definite Integral**: You must understand that $\int_a^b f(x) \, dx$ represents the signed area under the curve of $f(x)$ from $x=a$ to $x=b$.
2.  **The Fundamental Theorem of Calculus (Part 2)**: You must be able to compute definite integrals using antiderivatives, i.e., $\int_a^b f(x) \, dx = F(b) - F(a)$, where $F'(x) = f(x)$.

If you are not fluent in calculating definite integrals for polynomial, trigonometric, and exponential functions, review that material first.

## How to study it (step by step)
1.  **Start with the discrete case.** Recall how to find the average of $n$ numbers: $y_{avg} = \frac{y_1 + y_2 + \dots + y_n}{n}$. Spend 10 minutes thinking about what this would mean for a function if you only sampled its value at a few points.
2.  **Derive the continuous formula from the discrete.** Follow the derivation in the "Key ideas" section below. Write it out yourself, explaining each step. The goal is to see how the sum $\sum$ becomes the integral $\int$ and how the division by $n$ becomes division by $(b-a)$. This should take 20 minutes.
3.  **Calculate the average value for simple functions.** Find the average value of $f(x) = x^2$ on $[0, 3]$. Then find the average value of $g(x) = c$ (a constant) on $[a, b]$. Does the result for $g(x)$ match your intuition? (It should be $c$). This is a 15-minute sanity check.
4.  **Connect to the geometric meaning.** For the $f(x)=x^2$ example, sketch the curve and the rectangle whose height is the average value you calculated. Visually confirm that the area of the rectangle looks plausible as the area under the curve.
5.  **Read and understand the Mean Value Theorem for Integrals.** This theorem guarantees that for a continuous function, the average value is not just a mathematical abstraction; it is a value that the function *actually takes on* at some point $c$ within the interval $[a, b]$.

## Key ideas, with intuition
1.  **The Bridge from Discrete to Continuous Average.**
    The average of $n$ discrete numbers is their sum divided by the count:
    $$y_{avg} = \frac{1}{n} \sum_{i=1}^n y_i$$
    To find the average of a continuous function $f(x)$ on $[a, b]$, we can approximate it by sampling the function at $n$ points, $x_i^*$, and taking the average:
    $$f_{avg} \approx \frac{1}{n} \sum_{i=1}^n f(x_i^*)$$
    This is the starting point. How do we turn this into an integral? We recognize the sum as part of a Riemann Sum. The width of each sampling rectangle is $\Delta x = \frac{b-a}{n}$, which means $n = \frac{b-a}{\Delta x}$. Substituting this into our approximation:
    $$f_{avg} \approx \frac{1}{(b-a)/\Delta x} \sum_{i=1}^n f(x_i^*) = \frac{1}{b-a} \sum_{i=1}^n f(x_i^*) \Delta x$$
    Taking the limit as $n \to \infty$ (and thus $\Delta x \to 0$), the Riemann sum becomes a definite integral. This gives us the formal definition.

2.  **The Definition: Area divided by Width.**
    The average value of a function $f$ on the interval $[a, b]$ is defined as:
    $$f_{avg} = \frac{1}{b-a} \int_a^b f(x) \, dx$$
    Intuition: The integral $\int_a^b f(x) \, dx$ is the total "accumulation" or "area". The term $(b-a)$ is the "width" of the interval. So the formula is simply `Total Area / Width`, which gives the average height.

3.  **The Geometric Interpretation: Leveling the Water.**
    Imagine the area under the curve is filled with water. The average value of the function is the height the water would settle to if it were allowed to level out over the same interval. The area of the resulting rectangle $(f_{avg} \times (b-a))$ is identical to the original area under the curve $(\int_a^b f(x) \, dx)$.
    $$f_{avg} \cdot (b-a) = \int_a^b f(x) \, dx$$

## Worked example
**Problem:** Find the average value of $f(x) = \cos(x)$ on the interval $[-\frac{\pi}{2}, \frac{\pi}{2}]$.

**Step 1: Identify the formula and the components.**
The formula is $f_{avg} = \frac{1}{b-a} \int_a^b f(x) \, dx$.
Here, $f(x) = \cos(x)$, $a = -\frac{\pi}{2}$, and $b = \frac{\pi}{2}$.

**Step 2: Set up the integral.**
The length of the interval is $b-a = \frac{\pi}{2} - (-\frac{\pi}{2}) = \pi$.
Plugging into the formula:
$$f_{avg} = \frac{1}{\pi} \int_{-\pi/2}^{\pi/2} \cos(x) \, dx$$

**Step 3: Evaluate the integral.**
The antiderivative of $\cos(x)$ is $\sin(x)$. Using the Fundamental Theorem of Calculus:
$$\int_{-\pi/2}^{\pi/2} \cos(x) \, dx = [\sin(x)]_{-\pi/2}^{\pi/2}$$
$$= \sin(\frac{\pi}{2}) - \sin(-\frac{\pi}{2})$$
$$= 1 - (-1) = 2$$

**Step 4: Calculate the final average value.**
Substitute the value of the integral back into the expression from Step 2:
$$f_{avg} = \frac{1}{\pi} \cdot (2) = \frac{2}{\pi}$$

**Reflection:**
- Step 1 ensured we used the correct definition and correctly identified the interval bounds.
- Step 2 correctly constructed the specific expression we needed to solve. The factor $\frac{1}{\pi}$ comes from the width of the interval, not the function itself.
- Step 3 was a direct computation of a definite integral, a prerequisite skill. We found the total area under one arch of the cosine curve is 2.
- Step 4 combined the area and the width to find the average height. The result, $\frac{2}{\pi} \approx 0.637$, is a plausible average height for a function that peaks at 1 and drops to 0 at the edges of the interval.

## Diagrams
Here is the geometric interpretation for the worked example, $f(x) = \cos(x)$ on $[-\frac{\pi}{2}, \frac{\pi}{2}]$. The area under the cosine curve is equal to the area of the shaded rectangle.

```text
      y
      ^
  1.0 +         ,---.
      |        /     \
      |       /       \
f_avg +------|---------|---- y = 2/pi ~= 0.637
(2/pi)|      | ####### |
      |     /| ####### |\
      |    / | ####### | \
--+---/----+--|---------|--\---+--> x
 -pi/2     |  0         |   pi/2
           |            |
```
The area of the shaded rectangle is its height ($2/\pi$) times its width ($\pi$), which is $2$. This is exactly the value of the integral $\int_{-\pi/2}^{\pi/2} \cos(x) \, dx$.

## Memory technique — remember this forever
1.  **Mnemonic Story:** Imagine you're a civil engineer leveling a road cut through a hill. The integral $\int_a^b f(x) \, dx$ is the total volume of earth you need to move (assuming a 1-meter deep cut). You want to spread it out evenly over the length of the road, $(b-a)$. The final, level height of the roadbed will be the total volume divided by the length: $f_{avg} = \frac{\text{Volume}}{\text{Length}}$. **Average Height is Area over Width.**

2.  **Must-Know Formula:**
    $$f_{avg} = \frac{1}{b-a} \int_a^b f(x) \, dx$$

3.  **Spaced Repetition Schedule:** Review this concept and re-derive the formula from the discrete case on this schedule:
    - 1 day from now.
    - 3 days from now.
    - 7 days from now.
    - 16 days from now.
    - 35 days from now.

4.  **First Principles Pathway:** If you forget the formula, rebuild it.
    - Start with the discrete average: $\frac{1}{n}\sum f(x_i)$.
    - Remember this is an approximation of a Riemann sum.
    - Substitute $n = \frac{b-a}{\Delta x}$.
    - Rearrange: $\frac{\Delta x}{b-a}\sum f(x_i) = \frac{1}{b-a} \sum f(x_i) \Delta x$.
    - Take the limit as $n \to \infty$ ($\Delta x \to 0$). The sum becomes the integral: $\frac{1}{b-a} \int_a^b f(x) \, dx$.

## Common mistakes
1.  **Forgetting the $\frac{1}{b-a}$ factor.** Students often just compute the integral $\int_a^b f(x) \, dx$, which gives the total area, not the average value. Always remember to divide by the length of the interval.
2.  **Incorrectly calculating $(b-a)$.** This is especially common when $a$ or $b$ are negative. Remember that length is always positive. For an interval like $[-2, 1]$, the length is $1 - (-2) = 3$.
3.  **Confusing Average Value with Average Rate of Change.** The average value of a function is $\frac{1}{b-a}\int_a^b f(x) \, dx$. The average *rate of change* of a function is the slope of the secant line: $\frac{f(b)-f(a)}{b-a}$. They are completely different concepts.

## Self-check
Solve these without looking up the answers.
1.  Find the average value of $f(x) = 3x^2 + 1$ on the interval $[0, 2]$.
2.  Find the average value of $g(t) = t e^{t^2}$ on the interval $[0, \sqrt{\ln 5}]$.
3.  Consider the functions $f(x) = x$ and $g(x) = x^2$ on the interval $[0, 1]$. Without calculating, which function do you expect to have a higher average value? Justify your reasoning with a sketch. Then, calculate both to verify.