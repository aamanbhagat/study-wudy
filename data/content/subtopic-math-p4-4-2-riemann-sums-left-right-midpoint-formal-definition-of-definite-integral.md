## What it is
A Riemann sum approximates the area under a curve by dividing it into a series of vertical rectangles and summing their areas. The definite integral is the exact area, found by taking the limit of the Riemann sum as the width of the rectangles approaches zero, and their number approaches infinity. This process formalizes the intuitive idea of "area" for complex shapes.

## Why it matters
This concept is fundamental to accumulation problems. In rocket science, you integrate a time-varying thrust function to find the total impulse delivered to a vehicle. In physics, you integrate force over distance to find the total work done. In machine learning, you integrate a probability density function to find the probability of a random variable falling within a certain range.

## When to study it
You must have a firm grasp of function notation, limits, and summation (sigma) notation, specifically $\sum_{i=1}^n$. If the expression $\lim_{n \to \infty} \sum_{i=1}^n (a+i\frac{b-a}{n})^2 (\frac{b-a}{n})$ is intimidating, you should review limits and summations before proceeding. This is not the place to learn those prerequisite topics.

## How to study it (step by step)
1.  **Draw it first.** Take a simple function like $f(x) = x^2$ on the interval $[0, 2]$. Physically draw four rectangles under the curve, first using the left endpoint of each subinterval for the height, then the right endpoint. Calculate the approximate area in both cases. Notice the error.
2.  **Generalize to $n$ rectangles.** For the same function $f(x)=x^2$ on $[0, 2]$, write down the expressions for the width ($\Delta x$) and the sample points ($x_i$) for a right-hand sum with $n$ rectangles. Write out the full sum in sigma notation.
3.  **Introduce the midpoint rule.** Redraw the approximation from step 1, but this time use the midpoint of each subinterval to determine the rectangle's height. Intuitively, why might this often be a better approximation than the left or right sum?
4.  **Formalize the definition.** Write down the general definition of the definite integral as the limit of a Riemann sum: $\int_a^b f(x) dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \Delta x$. Identify what each part ($\int_a^b$, $dx$, $\lim_{n \to \infty}$, $\sum_{i=1}^n$, $f(x_i^*)$, $\Delta x$) represents.
5.  **Compute an integral from the definition.** Use the formal definition to calculate the exact value of $\int_0^2 x^2 dx$. This will require simplifying the sigma notation sum (using the identity for $\sum i^2$) and then evaluating the limit. This is a crucial "rite of passage" problem.

## Key ideas, with intuition
1.  **Discretize to Approximate:** The core strategy is to transform a difficult continuous problem (finding the area under a curve) into a simple discrete problem (summing areas of rectangles). We chop the domain $[a, b]$ into $n$ equal subintervals.
    $$
    \text{Width of each rectangle: } \Delta x = \frac{b-a}{n}
    $$
2.  **Sample to Find Height:** Within each small subinterval, we must pick a single point, $x_i^*$, to determine the height of our approximating rectangle, $f(x_i^*)$. The choice of this sample point defines the type of sum:
    *   **Left sum:** $x_i^*$ is the left endpoint, $x_{i-1} = a + (i-1)\Delta x$.
    *   **Right sum:** $x_i^*$ is the right endpoint, $x_i = a + i\Delta x$.
    *   **Midpoint sum:** $x_i^*$ is the midpoint, $\bar{x}_i = a + (i - \frac{1}{2})\Delta x$.
3.  **Sum to Accumulate:** The total approximate area is the sum of the areas of these $n$ rectangles. Area of one rectangle is height $\times$ width, or $f(x_i^*) \Delta x$.
    $$
    \text{Approximate Area} \approx \sum_{i=1}^n f(x_i^*) \Delta x
    $$
4.  **Limit to Find the Exact Value:** The approximation becomes perfect as the rectangles become infinitely thin. This is the definition of the definite integral. It is the limit of the sum as the number of rectangles $n$ goes to infinity.
    $$
    \int_a^b f(x) dx \equiv \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \Delta x
    $$
    The integral symbol $\int$ is an elongated 'S' for "sum". The $dx$ represents the infinitesimal width of the rectangles, the limit of $\Delta x$.

## Worked example
Calculate $\int_0^3 (2x) dx$ using the formal definition with right-hand endpoints.

**Step 1: Identify components and set up the Riemann sum.**
The interval is $[a, b] = [0, 3]$. The function is $f(x) = 2x$. We will use $n$ subintervals.
The width of each subinterval is $\Delta x = \frac{b-a}{n} = \frac{3-0}{n} = \frac{3}{n}$.
For a right-hand sum, the sample points are $x_i = a + i\Delta x = 0 + i(\frac{3}{n}) = \frac{3i}{n}$.
The height of the $i$-th rectangle is $f(x_i) = 2(x_i) = 2(\frac{3i}{n}) = \frac{6i}{n}$.
The Riemann sum is $\sum_{i=1}^n f(x_i) \Delta x = \sum_{i=1}^n (\frac{6i}{n}) (\frac{3}{n})$.

**Step 2: Simplify the sum.**
We can pull terms that do not depend on the summation index $i$ out of the sum.
$$
\sum_{i=1}^n (\frac{6i}{n}) (\frac{3}{n}) = \sum_{i=1}^n \frac{18i}{n^2} = \frac{18}{n^2} \sum_{i=1}^n i
$$
This step isolates the core summation we need to evaluate.

**Step 3: Apply the summation formula.**
We use the known identity for the sum of the first $n$ integers: $\sum_{i=1}^n i = \frac{n(n+1)}{2}$.
$$
\frac{18}{n^2} \sum_{i=1}^n i = \frac{18}{n^2} \left( \frac{n(n+1)}{2} \right)
$$
This step converts the summation into an algebraic expression in terms of $n$.

**Step 4: Take the limit as $n \to \infty$.**
The definite integral is the limit of this expression.
$$
\int_0^3 (2x) dx = \lim_{n \to \infty} \frac{18}{n^2} \left( \frac{n(n+1)}{2} \right)
$$
Simplify the algebra before taking the limit.
$$
= \lim_{n \to \infty} \frac{9(n^2+n)}{n^2} = \lim_{n \to \infty} 9 \left( \frac{n^2}{n^2} + \frac{n}{n^2} \right) = \lim_{n \to \infty} 9 \left( 1 + \frac{1}{n} \right)
$$
Now, evaluate the limit. As $n \to \infty$, the term $\frac{1}{n} \to 0$.
$$
= 9(1+0) = 9
$$
**Reflection:** We started with an abstract definition of area and applied it systematically. Step 1 translated the geometric problem into algebraic symbols. Step 2 simplified the algebra by separating constants. Step 3 used a known summation formula to eliminate the $\sum$. Step 4 took the limit to transition from an approximation with $n$ rectangles to the exact value. The area under the line $y=2x$ from $x=0$ to $x=3$ is a triangle with base 3 and height 6, so its area is $\frac{1}{2}(3)(6)=9$, confirming our result.

## Diagrams
A left-hand sum for an increasing function (underestimate):
```text
      y
      |
      |        / f(x)
      |      .
      |     /.
      |----|./
      |----|/|
      |  |/| |
      |--|/| |
      | /| | |
      |/ | | |
  ----+--+--+--+--+-----> x
      a x1 x2 x3 b
```
A right-hand sum for an increasing function (overestimate):
```text
      y
      |
      |        / f(x)
      |   .---/
      |  /|--'
      | / |.-'
      |/--|'
      | / |
      |/  |
  ----+--+--+--+--+-----> x
      a x1 x2 x3 b
```

## Memory technique — remember this forever
1.  **Visual Hook:** The integral symbol $\int$ is a stretched 'S'. 'S' stands for "Sum". Imagine the rectangles under a curve getting squeezed thinner and thinner, stretching the $\Sigma$ symbol for "sum" into the $\int$ symbol for "integral". $dx$ is the ghost of $\Delta x$.
2.  **Must-know formulas:**
    *   Rectangle width: $\Delta x = \frac{b-a}{n}$
    *   Right-hand sample point: $x_i = a + i \Delta x$
    *   The Definition: $\int_a^b f(x) dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \Delta x$
3.  **Spaced Repetition Schedule:** Review this material and re-derive the worked example at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Set calendar reminders.
4.  **First Principles Pathway:** If you forget everything, draw a curve from $x=a$ to $x=b$.
    *   "How do I approximate its area?" Chop it into $n$ vertical strips.
    *   "How wide is each strip?" The total width is $b-a$, so each of the $n$ strips is $\Delta x = \frac{b-a}{n}$ wide.
    *   "How tall is a strip?" Approximate it with a rectangle. Pick a point $x_i^*$ in the strip's base, and use the function value $f(x_i^*)$ as the height.
    *   "What's the area of one rectangle?" Height $\times$ Width is $f(x_i^*) \Delta x$.
    *   "What's the total approximate area?" Sum them up: $\sum_{i=1}^n f(x_i^*) \Delta x$.
    *   "How do I make it exact?" Make the strips infinitely thin: $\lim_{n \to \infty}$. This rebuilds the entire definition from scratch.

## Common mistakes
1.  **Forgetting $\Delta x$:** Students often write the sum as $\sum f(x_i^*)$ and forget to multiply by the width $\Delta x$. Remember, you are summing *areas* (height $\times$ width), not just heights.
2.  **Incorrect indexing for $x_i$:** A right-hand sum uses $x_i = a + i\Delta x$. A left-hand sum uses $x_{i-1} = a + (i-1)\Delta x$. A common mistake is to use the wrong index or to have the sum run from $i=0$ to $n-1$ without adjusting the formula for $x_i$.
3.  **Algebraic errors with summation formulas:** When evaluating the limit, you will use formulas like $\sum i = \frac{n(n+1)}{2}$ and $\sum i^2 = \frac{n(n+1)(2n+1)}{6}$. Errors in applying these formulas or simplifying the resulting polynomial in $n$ are very common. Be methodical.

## Self-check
1.  Set up, but do not evaluate, the right-hand Riemann sum for $\int_2^5 (x^3 - 2x) dx$ with $n=6$ rectangles. Write out the full sum with numbers.
2.  Use the formal definition of the definite integral to evaluate $\int_0^1 (4x+1) dx$. You will need the formula $\sum_{i=1}^n i = \frac{n(n+1)}{2}$.
3.  Consider the function $f(x) = \cos(x)$ on the interval $[0, \frac{\pi}{2}]$. Without calculating, determine whether a right-hand Riemann sum $R_n$ will be an overestimate or an underestimate of the true integral. Justify your answer with a brief geometric argument.