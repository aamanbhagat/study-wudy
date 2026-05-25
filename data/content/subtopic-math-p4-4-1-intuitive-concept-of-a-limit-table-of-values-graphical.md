## What it is
A limit is a mathematical framework for predicting the value a function *approaches* as its input gets arbitrarily close to a specific target. Crucially, it describes the journey toward the target, not the destination itself, allowing us to evaluate the behavior of a function at points where it might otherwise be broken, undefined, or dividing by zero.

## Why it matters
Limits are the foundational DNA of all calculus. Without them, we cannot define the derivative (instantaneous rate of change) or the integral (continuous accumulation). In physics and rocket science, limits allow you to calculate the exact velocity of a launch vehicle at $T+3.000$ seconds, rather than an average velocity over a time window. They are also the mechanism we use to mathematically survive "singularities," such as calculating gravitational force $F = G\frac{m_1 m_2}{r^2}$ as the distance $r$ approaches zero.

## When to study it
You must study this only after you have a rock-solid grasp of Precalculus and Algebra. Specifically, you need to know:
1. How to evaluate functions for decimal inputs.
2. How to factor polynomials and simplify rational expressions.
3. How to graph functions, including identifying vertical asymptotes and "holes" (removable discontinuities).
If you do not know the difference between a graph going to infinity and a graph having a single missing point, review rational functions in Precalculus immediately.

## How to study it (step by step)
1. **Pick a broken function:** Start with a rational function that divides by zero at a specific point, such as $f(x) = \frac{x^2 - 9}{x - 3}$ at $x = 3$.
2. **Build a left-approach table:** Calculate $f(x)$ for inputs getting closer to 3 from the negative direction: $x = 2.9, 2.99, 2.999$. Note the output trend.
3. **Build a right-approach table:** Calculate $f(x)$ for inputs getting closer to 3 from the positive direction: $x = 3.1, 3.01, 3.001$. Note the output trend.
4. **Graph the function:** Plot the points from your tables. Draw a curve through them, leaving an open circle exactly at $x = 3$. 
5. **Trace with your fingers:** Physically place two fingers on the graph on opposite sides of $x = 3$. Slide them toward $x = 3$. The $y$-value your fingers crash into is the limit.

## Key ideas, with intuition

**1. The Notation**
We write the limit of $f(x)$ as $x$ approaches $a$ equals $L$ as:
$$ \lim_{x \to a} f(x) = L $$
Read this as: "As the input $x$ gets infinitely close to $a$ (but never equals $a$), the output $f(x)$ gets infinitely close to $L$."

**2. The irrelevance of $f(a)$**
The most important intuition in limits is that $\lim_{x \to a} f(x)$ does not care what $f(a)$ actually is. $f(a)$ could be $L$, it could be $1000$, or it could be completely undefined (like $0/0$). The limit only cares about the *neighborhood* around $a$.

**3. Left and Right Hand Limits**
For a standard limit to exist, the function must approach the exact same value from both the left (values less than $a$) and the right (values greater than $a$).
*   Left-hand limit: $\lim_{x \to a^-} f(x)$
*   Right-hand limit: $\lim_{x \to a^+} f(x)$
If the left and right approaches do not point to the same $y$-value, the overall limit Does Not Exist (DNE).

## Worked example
Evaluate the limit intuitively using a table of values:
$$ \lim_{x \to 2} \frac{x^2 - 4}{x - 2} $$

**Step 1: Attempt direct evaluation.**
Plug in $x = 2$:
$$ f(2) = \frac{2^2 - 4}{2 - 2} = \frac{0}{0} $$
This is undefined. The function has a hole at $x = 2$.

**Step 2: Construct a table approaching from the left ($x \to 2^-$).**
*   $x = 1.9 \implies f(1.9) = \frac{1.9^2 - 4}{1.9 - 2} = \frac{-0.39}{-0.1} = 3.9$
*   $x = 1.99 \implies f(1.99) = \frac{1.99^2 - 4}{1.99 - 2} = \frac{-0.0399}{-0.01} = 3.99$
*   $x = 1.999 \implies f(1.999) = 3.999$
*Trend: The outputs are approaching 4.*

**Step 3: Construct a table approaching from the right ($x \to 2^+$).**
*   $x = 2.1 \implies f(2.1) = \frac{2.1^2 - 4}{2.1 - 2} = \frac{0.41}{0.1} = 4.1$
*   $x = 2.01 \implies f(2.01) = \frac{2.01^2 - 4}{2.01 - 2} = \frac{0.0401}{0.01} = 4.01$
*   $x = 2.001 \implies f(2.001) = 4.001$
*Trend: The outputs are approaching 4.*

**Step 4: Conclude.**
Since both the left and right sides approach a $y$-value of 4, we write:
$$ \lim_{x \to 2} \frac{x^2 - 4}{x - 2} = 4 $$

*Reflection:* Why did this work? Algebraically, $\frac{x^2 - 4}{x - 2} = \frac{(x-2)(x+2)}{x-2}$. As long as $x \neq 2$, we can cancel the $(x-2)$ terms, leaving just $x + 2$. As $x$ approaches 2, $x + 2$ approaches 4. The table reveals the underlying continuous geometry of a line with a single missing point.

## Diagrams

```text
Graph of f(x) = (x^2 - 4)/(x - 2)

  y
  ^
5 |                     /
  |                   /
4 | . . . . . . . . O  <-- Hole at (2, 4). The limit is 4.
  |               / .
3 |             /   .
  |           /     .
2 |         /       .
  |       /         .
1 |     /           .
  |   /             .
--+--|----|----|----|----|--> x
  0  0.5  1   1.5   2   2.5

Approaching x=2 from left (x->2^-): y climbs up the line toward 4.
Approaching x=2 from right (x->2^+): y slides down the line toward 4.
```

## Memory technique — remember this forever
**1. The Visual Hook:** Think of a limit as two bridge-building crews constructing a bridge from opposite sides of a canyon. The limit exists if and only if the two crews meet at the exact same coordinates in the middle. It does not matter if the final connecting rivet is missing (a hole in the function); what matters is that their trajectories aligned perfectly.

**2. Must Overlearn:**
$$ \text{If } \lim_{x \to a^-} f(x) = L \text{ and } \lim_{x \to a^+} f(x) = L \text{, then } \lim_{x \to a} f(x) = L $$
If they do not equal the same $L$, the limit DNE.

**3. Spaced-Repetition Schedule:**
Review this concept at 1 day, 3 days, 7 days, 16 days, and 35 days. On each review, draw a graph of a function with a hole, a jump, and a vertical asymptote, and evaluate the limit at those points.

**4. First Principles Pathway:**
If you ever forget the algebraic rules for limits later in the course, you can *always* retreat to first principles: build a table. Plug in $a - 0.001$ and $a + 0.001$. If those two outputs are nearly identical, you have found your limit. 

## Common mistakes
1. **Assuming $f(a)$ is the limit:** Students plug in $x=a$, get an undefined result (like $0/0$), and falsely claim the limit Does Not Exist. $0/0$ usually means the limit *does* exist, you just have to look closer using a table or algebra.
2. **Checking only one side:** Students will plug in $2.001$, see it approaches 4, and stop. If the function is a piecewise function or involves absolute values, the left side might approach -4. You must check both.
3. **Confusing limits with asymptotes:** If your table yields $10, 100, 1000$, the limit does not exist (it approaches infinity). A limit must be a specific, finite real number $L$.

## Self-check
1. Construct a table of values to estimate $\lim_{x \to 0} \frac{\sin(x)}{x}$. Use $x = \pm 0.1, \pm 0.01$. Make sure your calculator is in radians. What is the limit?
2. Sketch the graph of $f(x) = \frac{|x|}{x}$. What is $\lim_{x \to 0^-} f(x)$? What is $\lim_{x \to 0^+} f(x)$? Does the overall limit as $x \to 0$ exist?
3. Imagine a function where $f(5) = 10$, but $\lim_{x \to 5} f(x) = 2$. Draw exactly what this graph looks like.