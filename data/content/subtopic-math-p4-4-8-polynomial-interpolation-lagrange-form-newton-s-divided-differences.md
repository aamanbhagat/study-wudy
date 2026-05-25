## What it is
Polynomial interpolation is the process of finding the unique polynomial of the lowest possible degree that passes exactly through a given set of data points. The Lagrange and Newton forms are two different, but algebraically equivalent, ways to write this same polynomial. They provide systematic methods for constructing the polynomial without solving a large system of linear equations.

## Why it matters
This isn't just for connecting dots. In aerospace, it's used to define smooth trajectories for spacecraft or missiles between specified waypoints. In numerical analysis, it's the foundation for high-order methods to approximate integrals (Newton-Cotes formulas) and derivatives, which are essential for solving the differential equations governing everything from orbital mechanics to fluid dynamics.

## When to study it
Before tackling this, you must be fluent with:
1.  **Polynomials:** Definition, degree, roots, and standard form ($a_n x^n + \dots + a_1 x + a_0$).
2.  **Function Notation:** Comfort with expressions like $f(x_i) = y_i$.
3.  **Summation ($\sum$) and Product ($\prod$) Notation:** You must be able to read and manipulate these.
4.  **Basic Linear Algebra:** Understand what it means for a system of linear equations to have a unique solution. This justifies why the interpolating polynomial is unique.

If any of these are weak, review them first. We build on them directly.

## How to study it (step by step)
1.  **The Naive Approach:** Take three points, e.g., $(1, 2), (2, 3), (3, 6)$. Assume a quadratic polynomial $P(x) = ax^2 + bx + c$. Plug in the points to get a $3 \times 3$ system of linear equations for $a, b, c$. Solve it. Experience how tedious this is and appreciate the need for a better method.
2.  **Derive Lagrange Basis Polynomials:** For the same three points, focus on finding a polynomial $L_0(x)$ that is $1$ at $x_0=1$ and $0$ at $x_1=2$ and $x_2=3$. Build it from its roots: it must have factors $(x-2)$ and $(x-3)$. Now, to make it $1$ at $x=1$, normalize it by dividing by $(1-2)(1-3)$. Repeat this logic to build $L_1(x)$ and $L_2(x)$.
3.  **Construct the Full Lagrange Polynomial:** Realize that the full interpolating polynomial is just a weighted sum: $P(x) = y_0 L_0(x) + y_1 L_1(x) + y_2 L_2(x)$. Verify that this construction correctly passes through all three points.
4.  **Introduce Newton's Form:** Write the general form: $P_n(x) = c_0 + c_1(x-x_0) + c_2(x-x_0)(x-x_1) + \dots$. See that this is "nested." If you have a polynomial for $n$ points, you can find the polynomial for $n+1$ points by just finding the next coefficient, $c_n$. This is its key advantage over Lagrange.
5.  **Derive Divided Differences:** Using the points from step 1, find the coefficients. $c_0 = y_0$. Then plug in $(x_1, y_1)$ to solve for $c_1$. You will find $c_1 = \frac{y_1-y_0}{x_1-x_0}$. This is the first divided difference. Repeat for $c_2$. Generalize this process to define the divided differences $f[x_0, \dots, x_k]$ and build the calculation table.
6.  **Compare and Verify:** Solve the same problem from step 1 using both the full Lagrange and Newton methods. Expand the resulting polynomials into the standard form $ax^2 + bx + c$. Confirm they are identical.

## Key ideas, with intuition
1.  **Uniqueness is Guaranteed:** For any set of $n+1$ points $(x_i, y_i)$ with distinct $x_i$, there exists *exactly one* polynomial of degree at most $n$ that passes through them. Lagrange and Newton's methods are just two different roads to the same destination. The "naive" method of solving a linear system also leads to the same place, but it's computationally inefficient.

2.  **Lagrange's "On/Off Switches":** The genius of the Lagrange form is in its basis polynomials, $L_j(x)$. Think of each $L_j(x)$ as a switch that is "on" (equal to 1) only at its designated point $x_j$, and "off" (equal to 0) at all other data points $x_i$ where $i \neq j$.
    $$L_j(x) = \prod_{i=0, i \neq j}^{n} \frac{x-x_i}{x_j-x_i}$$
    The numerator provides the zeros; the denominator normalizes the value to 1 at $x_j$. The full polynomial is then a simple weighted sum, where each $y_j$ value is multiplied by its corresponding "switch":
    $$P(x) = \sum_{j=0}^{n} y_j L_j(x)$$

3.  **Newton's "Incremental Corrections":** Newton's form builds the polynomial step-by-step. It starts with a constant ($P_0(x) = y_0$), then adds a linear term to correct the error at the second point, then a quadratic term to correct the error at the third, and so on. Each new term is constructed to be zero at all previous data points, so it doesn't mess up the work already done.
    $$P_n(x) = f[x_0] + f[x_0, x_1](x-x_0) + f[x_0, x_1, x_2](x-x_0)(x-x_1) + \dots$$
    The coefficients, $f[\dots]$, are the "divided differences." They represent the leading coefficient of the polynomial interpolating a specific subset of points, which is why this method is so efficient for adding new data points.

## Worked example
Find the interpolating polynomial passing through the points $(0, 1)$, $(1, 2)$, and $(3, 10)$.

**Method 1: Lagrange Form**

We have $(x_0, y_0) = (0, 1)$, $(x_1, y_1) = (1, 2)$, $(x_2, y_2) = (3, 10)$. We need to find $L_0(x), L_1(x), L_2(x)$.

1.  **Find $L_0(x)$:** This must be 1 at $x_0=0$ and 0 at $x_1=1, x_2=3$.
    $$L_0(x) = \frac{(x-x_1)(x-x_2)}{(x_0-x_1)(x_0-x_2)} = \frac{(x-1)(x-3)}{(0-1)(0-3)} = \frac{x^2-4x+3}{3}$$
2.  **Find $L_1(x)$:** This must be 1 at $x_1=1$ and 0 at $x_0=0, x_2=3$.
    $$L_1(x) = \frac{(x-x_0)(x-x_2)}{(x_1-x_0)(x_1-x_2)} = \frac{(x-0)(x-3)}{(1-0)(1-3)} = \frac{x^2-3x}{-2}$$
3.  **Find $L_2(x)$:** This must be 1 at $x_2=3$ and 0 at $x_0=0, x_1=1$.
    $$L_2(x) = \frac{(x-x_0)(x-x_1)}{(x_2-x_0)(x_2-x_1)} = \frac{(x-0)(x-1)}{(3-0)(3-1)} = \frac{x^2-x}{6}$$
4.  **Combine them:** $P(x) = y_0 L_0(x) + y_1 L_1(x) + y_2 L_2(x)$
    $$P(x) = 1 \cdot \left(\frac{x^2-4x+3}{3}\right) + 2 \cdot \left(\frac{x^2-3x}{-2}\right) + 10 \cdot \left(\frac{x^2-x}{6}\right)$$
    $$P(x) = \frac{x^2-4x+3}{3} - (x^2-3x) + \frac{5}{3}(x^2-x)$$
    $$P(x) = \left(\frac{1}{3} - 1 + \frac{5}{3}\right)x^2 + \left(-\frac{4}{3} + 3 - \frac{5}{3}\right)x + \left(\frac{3}{3}\right)$$
    $$P(x) = \left(\frac{1-3+5}{3}\right)x^2 + \left(\frac{-4+9-5}{3}\right)x + 1 = x^2 + 1$$

**Method 2: Newton's Divided Differences**

1.  **Set up the table:**
    $x_0=0, y_0=1$
    $x_1=1, y_1=2$
    $x_2=3, y_2=10$

2.  **Calculate first differences:**
    $f[x_0, x_1] = \frac{y_1-y_0}{x_1-x_0} = \frac{2-1}{1-0} = 1$
    $f[x_1, x_2] = \frac{y_2-y_1}{x_2-x_1} = \frac{10-2}{3-1} = \frac{8}{2} = 4$

3.  **Calculate second differences:**
    $f[x_0, x_1, x_2] = \frac{f[x_1, x_2] - f[x_0, x_1]}{x_2-x_0} = \frac{4-1}{3-0} = \frac{3}{3} = 1$

4.  **Construct the polynomial:** The coefficients are the top diagonal of the table: $f[x_0]=1$, $f[x_0,x_1]=1$, $f[x_0,x_1,x_2]=1$.
    $$P(x) = f[x_0] + f[x_0, x_1](x-x_0) + f[x_0, x_1, x_2](x-x_0)(x-x_1)$$
    $$P(x) = 1 + 1(x-0) + 1(x-0)(x-1)$$
    $$P(x) = 1 + x + x(x-1) = 1 + x + x^2 - x = x^2 + 1$$

**Reflection:** Both methods yielded the exact same polynomial, $P(x) = x^2+1$, as predicted by the uniqueness theorem. Lagrange's method was conceptually direct but involved more cumbersome algebraic fractions. Newton's method required the setup of the divided differences table, but the final polynomial construction was simpler and is far more efficient if a new data point were added later.

## Diagrams
An interpolating polynomial passing through three points $(x_0, y_0), (x_1, y_1), (x_2, y_2)$.

```text
      y
      ^
      |
      |
  y2  +       * (x2, y2)
      |      /
      |     /
      |    /
      |   /
  y1  +--* (x1, y1)
      | /
  y0  +* (x0, y0)
      |
      +------------> x
         x0  x1   x2
```

Newton's Divided Difference Table for the worked example:

```text
i | xi | f[]   | f[,]    | f[,,]
--|----|-------|---------|---------
0 | 0  |  1    |         |
  |    |       |  1      |
1 | 1  |  2    |         |  1
  |    |       |  4      |
2 | 3  |  10   |         |
```
The coefficients for the Newton polynomial are the top entries in each column: 1, 1, 1.

## Memory technique — remember this forever
1.  **Mnemonic/Story:**
    *   **Lagrange:** Think of **"Lagrange's Light Switches."** Each basis polynomial $L_j(x)$ is a special light switch that turns on *only* for its point $y_j$, and is off everywhere else. The total brightness (the polynomial) is the sum of each light bulb's value ($y_j$) times its personal on/off switch ($L_j(x)$).
    *   **Newton:** Think of **"Newton's Nested Corrections."** You start with a guess (a constant), then you fix it for the second point (add a line), then you fix that for the third point (add a parabola), and so on. Each fix is a *nested* term $(x-x_0)(x-x_1)...$ so it doesn't disturb the previous points you already got right.

2.  **Formulas to Overlearn:**
    *   Lagrange Form: $$P(x) = \sum_{j=0}^{n} y_j L_j(x)$$
    *   Lagrange Basis Polynomial: $$L_j(x) = \prod_{i=0, i \neq j}^{n} \frac{x-x_i}{x_j-x_i}$$
    *   Newton Divided Difference (recursive definition): $$f[x_0, \dots, x_k] = \frac{f[x_1, \dots, x_k] - f[x_0, \dots, x_{k-1}]}{x_k - x_0}$$

3.  **Spaced Repetition Schedule:** Review this material and re-derive the main formulas from first principles at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:**
    *   **If you forget Lagrange:** Don't memorize the formula, memorize the *properties* of $L_j(x)$. It must be 0 at $x_i$ for $i \neq j$. How do you make a polynomial zero? Give it roots. So, the numerator must be $(x-x_0)(x-x_1)\dots$ (excluding $(x-x_j)$). It must be 1 at $x_j$. How do you make a function equal 1 at a point? Divide by its current value at that point. So, the denominator is $(x_j-x_0)(x_j-x_1)\dots$. Rebuild it from these two requirements.
    *   **If you forget Newton:** Start with the nested form $P(x) = c_0 + c_1(x-x_0) + \dots$. Use the data points one by one to find the coefficients. $P(x_0)=y_0 \implies c_0 = y_0$. $P(x_1)=y_1 \implies y_0 + c_1(x_1-x_0) = y_1$. Solve for $c_1$. You will re-derive the divided differences.

## Common mistakes
1.  **Index Confusion:** Forgetting that $n+1$ points define a polynomial of degree $n$. Sums and products often go from $0$ to $n$, which can lead to off-by-one errors. Double-check your loop bounds.
2.  **Flipping Lagrange Denominator:** A very common error is to write $\frac{x-x_i}{x_i-x_j}$ instead of the correct $\frac{x-x_i}{x_j-x_i}$. The subscript in the denominator, $j$, is fixed; it's the index of the basis polynomial you are constructing.
3.  **High-Degree != Better:** Do not assume that using more data points to create a very high-degree polynomial will always give a better fit for the underlying function. High-degree polynomials can oscillate wildly between data points. This is called **Runge's phenomenon**.
4.  **Forgetting Newton's Nested Factors:** Writing the Newton form as $c_0 + c_1 x + c_2 x^2 + \dots$. This is wrong. The correct form is $c_0 + c_1(x-x_0) + c_2(x-x_0)(x-x_1) + \dots$. The factors are essential.

## Self-check
1.  Find the quadratic interpolating polynomial for the points $(-1, 6), (0, 1), (2, 3)$ using the Lagrange method.
2.  Given the data $(0, 0), (1, 1), (2, 6), (3, 21)$, construct the complete divided differences table and write down the interpolating polynomial in Newton's form. Do not simplify it.
3.  Consider the two points $(x_0, y_0)$ and $(x_1, y_1)$. Write down the Lagrange polynomial $P_L(x)$ and the Newton polynomial $P_N(x)$ for these points. Show, through algebraic manipulation, that they simplify to the same linear function: the familiar "point-slope" form of a line.