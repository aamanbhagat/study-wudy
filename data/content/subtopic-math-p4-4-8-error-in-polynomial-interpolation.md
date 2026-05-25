## What it is
The error in polynomial interpolation is the difference between the true function value, $f(x)$, and the value given by its approximating polynomial, $P_n(x)$, at a point $x$ that lies between the interpolation nodes. This error is not zero at points other than the nodes themselves. The goal is to find a formula that expresses or bounds this error, $E(x) = f(x) - P_n(x)$.

## Why it matters
This concept is critical for understanding the trade-offs in numerical approximation. In aerospace, when calculating a trajectory from discrete radar measurements, the interpolation error gives a "cone of uncertainty" around the predicted path. In computer graphics and machine learning, it informs how many control points (or training data points) are needed to model a curve or function to a desired accuracy without excessive computational cost.

## When to study it
You must have a firm grasp of these prerequisites. If not, master them first.
1.  **Polynomial Interpolation:** You should be able to construct a Lagrange or Newton interpolating polynomial for a given set of data points $(x_i, y_i)$.
2.  **Differential Calculus:** You need to be fluent with derivatives and, most importantly, **Rolle's Theorem** and the **Mean Value Theorem**. The derivation of the error formula depends entirely on Rolle's Theorem.
3.  **Taylor's Theorem:** Understanding the structure of the remainder term in a Taylor expansion provides a powerful analogy for the interpolation error formula.

## How to study it (step by step)
1.  **Re-derive Rolle's Theorem.** Start with the statement: If $g$ is continuous on $[a,b]$, differentiable on $(a,b)$, and $g(a)=g(b)=0$, then there exists some $c \in (a,b)$ such that $g'(c)=0$. Convince yourself why this must be true by sketching a function that meets these conditions.
2.  **Master the derivation of the error formula.** This is not optional. The key is to define an auxiliary function for a fixed point $x$ (not one of the nodes $x_i$):
    $$ g(t) = f(t) - P_n(t) - C \prod_{i=0}^{n} (t-x_i) $$
    Choose the constant $C$ such that $g(x)=0$. Then, show that $g(t)$ has $n+2$ roots (the nodes $x_0, \dots, x_n$ and the point $x$) and apply Rolle's Theorem $n+1$ times.
3.  **Analyze the components of the final formula.** The formula is:
    $$ E(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \prod_{i=0}^{n} (x-x_i) $$
    Isolate each piece and explain its role: the function's smoothness ($f^{(n+1)}$), the polynomial degree ($n+1$), and the geometry of the nodes ($\prod (x-x_i)$).
4.  **Solve an error-bounding problem.** Take $f(x) = \ln(x)$ on the interval $[1, 2]$ with nodes $x_0=1, x_1=1.5, x_2=2$. Find an upper bound for the maximum possible error $|E(x)|$ on this interval. This forces you to find the maximum of two separate functions: $|f^{(3)}(\xi)|$ and $|\prod(x-x_i)|$.
5.  **Investigate the node-placement term.** For interpolation on $[-1, 1]$, plot the function $W(x) = \prod_{i=0}^{n} (x-x_i)$ for $n=4$ with equally spaced nodes. Then, look up the formula for Chebyshev nodes and plot $W(x)$ for those. The visual difference in the magnitude of the "wiggles" explains why Chebyshev nodes are superior for minimizing the maximum error.

## Key ideas, with intuition
1.  **Error is a "bubble" between nodes.** By definition, the polynomial $P_n(x)$ perfectly matches the function $f(x)$ at the nodes $x_0, x_1, \dots, x_n$. The error only exists in the spaces between these points. The error must start at zero at one node, grow to some maximum, and return to zero at the next node.
2.  **Smooth functions are easier to interpolate.** The error depends on the $(n+1)$-th derivative, $f^{(n+1)}(\xi)$. If a function is very "smooth" (its higher-order derivatives are small), it behaves like a low-degree polynomial, and the interpolation error will be small. If the function wiggles violently, its higher derivatives are large, and the error will be large.
3.  **The error formula is the next term of a Taylor series, but generalized.**
    - Taylor Remainder: $R_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} (x-a)^{n+1}$
    - Interpolation Error: $E(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} (x-x_0)(x-x_1)\dots(x-x_n)$
    A Taylor series is an interpolation where all nodes are collapsed onto a single point $a$. The interpolation formula replaces the term $(x-a)^{n+1}$ with a product of distances to each of the distinct nodes. This is a profound connection.
4.  **Extrapolation is dangerous.** The term $\prod_{i=0}^{n} (x-x_i)$ grows very rapidly as $x$ moves outside the interval containing the nodes. This means that using an interpolating polynomial to predict values outside the range of your data (extrapolation) is extremely unreliable, and the error formula shows you precisely why.

## Worked example
Let's find an upper bound for the error of linearly interpolating $f(x) = \sin(x)$ on the interval $[0, \pi/2]$, using nodes $x_0=0$ and $x_1=\pi/2$.

**Step 1: Identify the parameters and the error formula.**
We have $n=1$ (linear interpolation). The nodes are $x_0=0, x_1=\pi/2$. The function is $f(x)=\sin(x)$.
The error formula for $n=1$ is:
$$ E(x) = f(x) - P_1(x) = \frac{f^{(2)}(\xi)}{2!} (x-x_0)(x-x_1) $$
for some $\xi \in (0, \pi/2)$.

**Step 2: Calculate the derivative term.**
We need the second derivative of $f(x)$.
$f'(x) = \cos(x)$
$f''(x) = -\sin(x)$
The formula requires $f''(\xi) = -\sin(\xi)$.

**Step 3: Bound the derivative term.**
We need to find the maximum absolute value of the derivative on the interval.
$$ \max_{\xi \in [0, \pi/2]} |f''(\xi)| = \max_{\xi \in [0, \pi/2]} |-\sin(\xi)| $$
On $[0, \pi/2]$, $\sin(\xi)$ is non-negative and increasing. Its maximum value is $\sin(\pi/2) = 1$.
So, $|f''(\xi)| \le 1$.

**Step 4: Bound the node-placement term.**
We need to find the maximum absolute value of the polynomial part, $W(x) = (x-0)(x-\pi/2) = x^2 - (\pi/2)x$, on the interval $[0, \pi/2]$.
This is a downward-opening parabola with roots at $0$ and $\pi/2$. Its vertex (the maximum absolute value) is exactly halfway between the roots, at $x = \pi/4$.
The value at this point is:
$$ W(\pi/4) = (\pi/4)(\pi/4 - \pi/2) = (\pi/4)(-\pi/4) = -\frac{\pi^2}{16} $$
So, $|W(x)| \le \frac{\pi^2}{16}$.

**Step 5: Combine the bounds to find the maximum error.**
We can now write an upper bound for the magnitude of the error:
$$ |E(x)| = \left| \frac{f^{(2)}(\xi)}{2!} W(x) \right| = \frac{|f^{(2)}(\xi)|}{2} |W(x)| $$
$$ |E(x)| \le \frac{1}{2} \cdot \frac{\pi^2}{16} = \frac{\pi^2}{32} $$
Using $\pi \approx 3.14$, this is approximately $\frac{9.86}{32} \approx 0.308$.

**Reflection:** Each step isolated one component of the error formula. We bounded the function's "wiggliness" ($|f''(\xi)|$) and the geometric contribution from the nodes ($|W(x)|$) *independently*. Combining these worst-case scenarios gives a guaranteed upper bound on the error anywhere in the interval.

## Diagrams

**Error between two nodes**

```text
      ^ y
      |
      |   f(x) (true function)
      |     ..-''
      |   .''
      | .'
 y1---*
      | |\
      | | \ E(x) = f(x)-P_1(x)
      | |  \
      | |   \
 y0---*------\----------------> x
      |      `\ P_1(x)
      x0       x1
```
This diagram shows a true function $f(x)$ and a simple linear interpolant $P_1(x)$ between two nodes $(x_0, y_0)$ and $(x_1, y_1)$. The error $E(x)$ is the vertical distance between the two curves.

**Node Placement Polynomial $W(x)=\prod(x-x_i)$ for $n=4$ on $[-1, 1]$**

```text
Equally Spaced Nodes:              Chebyshev Nodes (roots of T_5(x)):
      ^ W(x)                             ^ W(x)
      |                                  |
      |     _                            |
  _   |   /   \      _                   |   _   _   _   _
 / \  |  /     \    / \                  |  / \ / \ / \ / \
----*-*-*-------*-*-----> x            --*-*-*-*-*-----------> x
   -1 |           | 1                    -1|             |1
      |  \     /   /                       |  \_/ \_/ \_/ \_/
      |   \_/                              |
      |                                  |
(Large peaks near ends)              (Wiggles have equal height)
```
This illustrates why Chebyshev nodes (more clustered near the endpoints) are better. They make the maximum value of $|W(x)|$ as small as possible across the interval, which in turn minimizes the upper bound on the interpolation error.

## Memory technique — remember this forever
1.  **The Mnemonic Story:** The interpolation error is the **"Next Taylor Term, but Punished by the Product of Poles."**
    - **"Next Taylor Term"** reminds you of the $\frac{f^{(n+1)}(\xi)}{(n+1)!}$ part, which looks just like the next term after the ones you used.
    - **"Punished by the Product of Poles"** reminds you of the $\prod_{i=0}^{n} (x-x_i)$ part. Think of the interpolation nodes ($x_i$) as "poles" or tent stakes, and the error is a function of the product of your distances to all of them.

2.  **The Must-Know Formula:** Overlearn this exact form.
    $$ E(x) = f(x) - P_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \prod_{i=0}^{n} (x-x_i) $$
    where $\xi$ is in the interval containing the nodes $\{x_i\}$ and the point $x$.

3.  **Spaced Repetition Schedule:** Write this formula and its derivation from first principles on a flashcard. Review it on this schedule:
    - Day 1 (today)
    - Day 3
    - Day 7
    - Day 16
    - Day 35

4.  **First Principles Pathway:** If you forget the formula, rebuild it.
    - Define the error at a point $x$: $E(x) = f(x) - P_n(x)$.
    - Define an auxiliary function: $g(t) = f(t) - P_n(t) - C \prod_{i=0}^{n}(t-x_i)$.
    - Set $C = \frac{E(x)}{\prod(x-x_i)}$ so that $g(x)=0$.
    - Count the roots of $g(t)$: it's zero at $x_0, x_1, \dots, x_n$ and at $x$. That's $n+2$ roots.
    - Apply Rolle's Theorem $n+1$ times. This proves that $g^{(n+1)}(t)$ must have at least one root, $\xi$.
    - Calculate $g^{(n+1)}(t) = f^{(n+1)}(t) - 0 - C \cdot (n+1)!$.
    - Set $g^{(n+1)}(\xi) = 0$ and solve for $C$. Substitute back into the definition of $C$ to get the formula for $E(x)$.

## Common mistakes
1.  **Forgetting the $(n+1)!$.** Many students remember the derivative and the product term but omit the factorial in the denominator. Always connect it back to the Taylor series remainder to remember the factorial.
2.  **Mishandling the Error Bound Calculation.** When bounding $|E(x)| \le \frac{M_{n+1}}{(n+1)!} \cdot W_{max}$, you must find $M_{n+1} = \max|f^{(n+1)}(\xi)|$ and $W_{max} = \max|\prod(x-x_i)|$ as two *separate* optimization problems over the interval. Do not try to find a single $x$ that maximizes both at once.
3.  **Using $n$ instead of $n+1$.** The error for a degree-$n$ polynomial depends on the $(n+1)$-th derivative and the $(n+1)!$ term. It's always one degree higher than the polynomial you constructed.

## Self-check
1.  You construct a quadratic interpolating polynomial $P_2(x)$ for a function $f(x)$ using three nodes. Write out the specific formula for the error, $E(x) = f(x) - P_2(x)$. What is the highest order derivative of $f(x)$ that appears in this formula?
2.  You are interpolating $f(x) = e^{2x}$ on $[0, 1]$ using nodes at $x_0=0, x_1=0.5, x_2=1$. Find a tight numerical upper bound for the maximum possible error on this interval.
3.  Consider interpolating the function $f(x) = \frac{1}{1+25x^2}$ on $[-1, 1]$ (Runge's function). Using the error formula, explain intuitively why using a high-degree polynomial with equally spaced nodes is a bad idea for this specific function. Where does the formula predict the error will be largest?