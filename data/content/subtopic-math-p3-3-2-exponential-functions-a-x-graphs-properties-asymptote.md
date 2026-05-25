## What it is
An exponential function is a mathematical function of the form $f(x) = a^x$, where the base $a$ is a positive constant ($a > 0$) and $a \neq 1$, and the variable $x$ is the exponent. Unlike polynomials where the base varies and the exponent is fixed (like $x^2$), exponential functions have a fixed base and a varying exponent, meaning their rate of change is directly proportional to their current value.

## Why it matters
Exponentials are the language of multiplicative growth and decay. In physics, they describe radioactive decay and the charging of capacitors. In rocket science, the Tsiolkovsky rocket equation relies on the inverse of the exponential (the logarithm) because the mass of a rocket decreases exponentially as it burns fuel to accelerate. In computer science, an $O(2^n)$ time complexity represents an algorithm that scales so poorly it becomes useless for large inputs. You cannot solve differential equations later in calculus without mastering $a^x$.

## When to study it
Do not attempt this until you have completely mastered:
1. **Exponent rules:** $a^m \cdot a^n = a^{m+n}$, $(a^m)^n = a^{mn}$, $a^{-n} = 1/a^n$, and $a^{1/n} = \sqrt[n]{a}$.
2. **Basic functions:** Function notation $f(x)$, domain, range, and the Cartesian coordinate system.
3. **Graph transformations:** How $f(x-h) + k$ shifts a graph horizontally and vertically.

If you cannot instantly evaluate $8^{-2/3}$, go back and review exponent rules.

## How to study it (step by step)
1. **Plot by hand:** Create a table of values for $x \in \{-3, -2, -1, 0, 1, 2, 3\}$ for the functions $y = 2^x$ and $y = (1/2)^x$. Plot them on the same set of axes.
2. **Identify the asymptote:** Observe what happens to $2^x$ as $x$ becomes a large negative number. Notice it approaches zero but never touches it. This is your horizontal asymptote.
3. **Analyze domain and range:** Look at your graph. Can $x$ be anything? (Yes). Can $y$ be anything? (No, $y > 0$). Write this down formally.
4. **Apply transformations:** Sketch $y = 2^x + 3$. Notice how the horizontal asymptote moves from $y = 0$ to $y = 3$. The asymptote is tied to the vertical shift.
5. **Compare bases:** Sketch $y = 2^x$, $y = 3^x$, and $y = 10^x$ on the same axes. Note how they all pivot around the point $(0,1)$ but grow at different rates for $x > 0$.

## Key ideas, with intuition

**1. The Base determines the shape (Growth vs. Decay)**
If $a > 1$, multiplying by $a$ increases the value. The graph curves upward as $x$ increases. This is **exponential growth**.
If $0 < a < 1$, multiplying by $a$ decreases the value. The graph curves downward toward the x-axis as $x$ increases. This is **exponential decay**. (Note: $(1/2)^x$ is the exact same thing as $2^{-x}$).

**2. The Horizontal Asymptote**
An asymptote is a line a graph approaches but never reaches as $x \to \pm \infty$. For $f(x) = a^x$, the horizontal asymptote is always $y = 0$. 
*Intuition:* If you have a pizza and repeatedly cut it in half ($x \to -\infty$ for $2^x$), the slices get infinitely small, but you never have *zero* pizza. 

**3. The Universal Pivot Point**
Because any non-zero number to the power of 0 is 1 ($a^0 = 1$), the basic graph of $f(x) = a^x$ will *always* cross the y-axis at $(0,1)$, regardless of the base.

**4. Domain and Range**
*   **Domain:** $x \in \mathbb{R}$ (You can put any real number into an exponent).
*   **Range:** $y \in (0, \infty)$ (A positive base raised to any power is always positive).

## Worked example
**Problem:** Find the domain, range, y-intercept, and horizontal asymptote of the function $f(x) = -2 \cdot 3^{x-1} + 6$. Sketch its general shape.

**Step 1: Identify the base function and transformations.**
The parent function is $3^x$. 
Transformations applied:
- Shift right by 1 (due to $x-1$).
- Vertical stretch by 2, and reflect across the x-axis (due to $-2$).
- Shift up by 6 (due to $+6$).

**Step 2: Find the horizontal asymptote.**
The parent function $3^x$ has an asymptote at $y = 0$. The only transformation that moves a horizontal line is a vertical shift.
Asymptote: $y = 6$.

**Step 3: Find the y-intercept.**
Set $x = 0$:
$$f(0) = -2 \cdot 3^{0-1} + 6$$
$$f(0) = -2 \cdot (1/3) + 6 = -2/3 + 18/3 = 16/3$$
y-intercept: $(0, 16/3)$ or $(0, 5.33)$.

**Step 4: Find Domain and Range.**
Domain is always all real numbers: $x \in \mathbb{R}$.
Because of the reflection ($-2$), the graph opens *downward* from the asymptote.
Range: $y \in (-\infty, 6)$.

*Reflection:* By tracking the asymptote first, the rest of the graph falls into place. The reflection flipped our standard range from $(> \text{asymptote})$ to $(< \text{asymptote})$.

## Diagrams

```text
      y
      |
  8 - |                /  y = 2^x (Growth, a > 1)
      |               /
      |              /
  4 - |             /
      |            /
      |           /
  1 - |----------*----------
      |         / (0,1)
------|--------/------------- x
      |       /  <-- Asymptote at y = 0
```

```text
      y
      |
  8 - |  \             y = (1/2)^x (Decay, 0 < a < 1)
      |   \
      |    \
  4 - |     \
      |      \
      |       \
  1 - |--------*------------
      |         \ (0,1)
------|----------\---------- x
      |           \  <-- Asymptote at y = 0
```

## Memory technique — remember this forever
**1. Visual Hook:**
Think of an airplane. 
- **Growth ($a>1$):** The plane takes off. It starts flying level just above the runway (asymptote), hits the 1 km mark (y-intercept), and shoots into the stratosphere.
- **Decay ($0<a<1$):** The plane lands. It comes down from the sky, crosses the 1 km mark, and glides infinitely just above the runway, never quite touching the dirt.

**2. Must Overlearn:**
- Standard Asymptote: $y = 0$.
- Standard y-intercept: $(0,1)$.
- Range is strictly positive: $a^x > 0$.

**3. Spaced-Repetition Schedule:**
Review these facts and sketch $2^x$ and $(1/2)^x$ from memory at: 1 day, 3 days, 7 days, 16 days, and 35 days.

**4. First Principles Pathway:**
If you forget the shape, build a table for $y = 2^x$. 
$x = -2 \implies y = 1/4$
$x = -1 \implies y = 1/2$
$x = 0 \implies y = 1$
$x = 1 \implies y = 2$
$x = 2 \implies y = 4$
Plotting these 5 points instantly reconstructs the asymptote, the intercept, and the explosive growth.

## Common mistakes
1. **Confusing $x^2$ and $2^x$:** $x^2$ is a parabola; its growth slows down relative to an exponential. $2^x$ is an exponential; it will eventually outgrow *any* polynomial, no matter how large the polynomial's degree.
2. **Thinking $a^x$ can equal 0:** Students often solve $2^x = 0$ by writing $x = 0$. This is false. $2^0 = 1$. The equation $2^x = 0$ has *no solution*.
3. **Forgetting the asymptote shifts:** When graphing $f(x) = 3^x - 5$, students will often still draw the asymptote at $y=0$. The $-5$ shifts the entire graph, *including the asymptote*, down to $y = -5$.

## Self-check
1. Find the y-intercept and the equation of the horizontal asymptote for $g(x) = 4 \cdot (0.5)^{x+2} - 3$.
2. Does the function $h(x) = (5/4)^{-x}$ represent exponential growth or exponential decay? (Hint: simplify the negative exponent first).
3. Prove algebraically that translating the graph of $y = 3^x$ to the left by 2 units is mathematically identical to stretching it vertically by a factor of 9.