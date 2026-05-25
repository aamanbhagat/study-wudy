## What it is
A power series is an infinite polynomial of the form $\sum_{n=0}^{\infty} c_n (x-c)^n$, where $c_n$ are coefficients, $c$ is a constant called the center, and $x$ is a variable. The core task is to determine the set of all $x$ values for which this infinite sum converges to a finite value; this set is called the interval of convergence.

## Why it matters
Power series are the backbone of numerical methods and approximation theory. In physics, they are used to solve differential equations that model phenomena like heat flow, wave propagation, and quantum mechanical systems. In aerospace engineering, they are used to approximate complex functions for guidance and control systems, allowing for fast, real-time calculations that would otherwise be intractable.

## When to study it
You must have a firm grasp of sequences, series, and convergence tests. Specifically, you need to be proficient with the **Ratio Test** and the **Root Test**, as they are the primary tools for finding the radius of convergence. You should also be comfortable with the Alternating Series Test and the p-Series Test for checking the endpoints of the interval.

## How to study it (step by step)
1.  **Internalize the general form:** Write down the form $\sum_{n=0}^{\infty} c_n (x-c)^n$ ten times. Identify $c_n$, $x$, and $c$ for several examples until you can parse any power series instantly.
2.  **Derive the Radius of Convergence:** Take the general form and apply the Ratio Test. Set the limit of the ratio of absolute values of consecutive terms to be less than 1. Solve the resulting inequality for $|x-c|$. This process is more important than memorizing the final formula.
3.  **Master the procedure:** For a given series, first identify the center $c$. Then, use the Ratio Test to find the radius of convergence, $R$. This gives you an open interval $(c-R, c+R)$ where the series converges absolutely.
4.  **Isolate and test the endpoints:** The Ratio Test is inconclusive when the limit is exactly 1, which occurs at the endpoints $x = c-R$ and $x = c+R$. You must substitute these two values back into the original series and use other tests (e.g., Alternating Series Test, p-Series Test) to determine convergence at each endpoint individually.
5.  **State the final answer:** Combine the results. Write down the radius of convergence $R$ and the full interval of convergence, using brackets `[` `]` for included endpoints and parentheses `(` `)` for excluded ones.

## Key ideas, with intuition
1.  **An Infinite Polynomial:** Think of a power series as a polynomial with infinitely many terms. For a regular polynomial, like $1+x+x^2$, you can plug in any $x$ and get a finite number. For a power series, like $1+x+x^2+x^3+...$, this is not guaranteed. If $x=2$, the sum explodes to infinity. If $x=1/2$, it converges to a finite value. The goal is to find the "safe zone" for $x$.

2.  **The Center is the Anchor:** Every power series $\sum c_n (x-c)^n$ is anchored at its center, $c$. If you plug in $x=c$, the series becomes $c_0 + 0 + 0 + \dots = c_0$. It always converges at its center. The question is how far away from $c$ you can move $x$ before the series diverges.

3.  **Symmetric Convergence:** The convergence is symmetric around the center. If the series converges at some distance $d$ from $c$, it will converge for all points closer to $c$ than $d$. This "safe distance" is the radius of convergence, $R$.
    $$
    \text{The series converges for all } x \text{ such that } |x-c| < R
    $$
    This inequality defines an open interval $(c-R, c+R)$.

4.  **The Endpoints are Ambiguous:** The Ratio Test tells us what happens inside the interval ($|x-c|<R$) and outside ($|x-c|>R$), but it fails right on the boundary where $|x-c|=R$. These two points, $x=c-R$ and $x=c+R$, must be checked manually. They are the edge cases where the series might converge, might diverge, or might converge conditionally.

## Worked example
Find the center, radius of convergence, and interval of convergence for the power series $\sum_{n=1}^{\infty} \frac{(x-3)^n}{n \cdot 5^n}$.

**Step 1: Identify the center and the terms.**
The series is in the form $\sum c_n (x-c)^n$.
By inspection, the center is $c=3$.
The terms of the series are $a_n = \frac{(x-3)^n}{n \cdot 5^n}$.

**Step 2: Apply the Ratio Test.**
We need to find the limit $L = \lim_{n \to \infty} \left| \frac{a_{n+1}}{a_n} \right| < 1$ for convergence.
$$
a_{n+1} = \frac{(x-3)^{n+1}}{(n+1) \cdot 5^{n+1}}
$$
$$
L = \lim_{n \to \infty} \left| \frac{(x-3)^{n+1}}{(n+1) \cdot 5^{n+1}} \cdot \frac{n \cdot 5^n}{(x-3)^n} \right|
$$
Simplify by canceling terms:
$$
L = \lim_{n \to \infty} \left| \frac{(x-3) \cdot n}{(n+1) \cdot 5} \right|
$$
The variable $x$ is not affected by the limit in $n$, so we can pull it out.
$$
L = \frac{|x-3|}{5} \lim_{n \to \infty} \left( \frac{n}{n+1} \right)
$$
The limit evaluates to 1: $\lim_{n \to \infty} \frac{n}{n+1} = \lim_{n \to \infty} \frac{1}{1+1/n} = 1$.
So, $L = \frac{|x-3|}{5}$.

**Step 3: Find the radius of convergence.**
For convergence, we require $L < 1$.
$$
\frac{|x-3|}{5} < 1 \implies |x-3| < 5
$$
This is in the form $|x-c| < R$. Thus, the radius of convergence is $R=5$.
The series converges absolutely on the open interval $(3-5, 3+5)$, which is $(-2, 8)$.

**Step 4: Test the endpoints.**
The endpoints are $x = -2$ and $x = 8$.
*   **Case 1: $x = -2$**
    Substitute $x=-2$ into the original series:
    $$
    \sum_{n=1}^{\infty} \frac{(-2-3)^n}{n \cdot 5^n} = \sum_{n=1}^{\infty} \frac{(-5)^n}{n \cdot 5^n} = \sum_{n=1}^{\infty} \frac{(-1)^n 5^n}{n \cdot 5^n} = \sum_{n=1}^{\infty} \frac{(-1)^n}{n}
    $$
    This is the alternating harmonic series. By the Alternating Series Test, it converges.

*   **Case 2: $x = 8$**
    Substitute $x=8$ into the original series:
    $$
    \sum_{n=1}^{\infty} \frac{(8-3)^n}{n \cdot 5^n} = \sum_{n=1}^{\infty} \frac{5^n}{n \cdot 5^n} = \sum_{n=1}^{\infty} \frac{1}{n}
    $$
    This is the harmonic series, a p-series with $p=1$. It diverges.

**Step 5: State the final answer.**
The center is $c=3$.
The radius of convergence is $R=5$.
The interval of convergence includes the left endpoint but not the right: $[-2, 8)$.

*Reflection:* Each step had a clear purpose. Identifying the center gave us our anchor point. The Ratio Test gave us the symmetric radius of convergence. Testing the endpoints resolved the ambiguity at the boundary, revealing the series' complete behavior.

## Diagrams
Here is the interval of convergence on a number line. The series converges absolutely inside the parentheses, converges conditionally at $x=-2$, and diverges everywhere else.

```text
Diverges         Converges          Diverges
<------------|====================|------------>
             [--------------------)
... -4  -3  -2  -1   0   1   2   3   4   5   6   7   8   9  10 ...
             ^                   ^
             Endpoint (converges)  Endpoint (diverges)
                         ^
                         Center c=3
             <-------- R=5 -------->
```

## Memory technique — remember this forever
1.  **The Story: The Campfire.**
    -   Your power series is a campfire at position $c$.
    -   The radius of convergence $R$ is how far the warmth reaches.
    -   Anyone standing inside the circle of radius $R$ (where $|x-c|<R$) is warm (the series **converges**).
    -   Anyone far outside the circle ($|x-c|>R$) is cold (the series **diverges**).
    -   The people standing exactly on the edge of the circle ($x=c\pm R$) might be warm or cold. You have to walk over and **check them individually** (test the endpoints).

2.  **Must-know formulas:**
    -   General form: $\sum_{n=0}^{\infty} c_n (x-c)^n$
    -   Radius of convergence from Ratio Test: $R = \lim_{n \to \infty} \left| \frac{c_n}{c_{n+1}} \right|$ (assuming the limit exists).

3.  **Spaced Repetition Schedule:**
    -   Review this entire lesson in: 1 day, 3 days, 7 days, 16 days, 35 days. Each time, re-work the example from scratch without looking at the solution.

4.  **First Principles Pathway:**
    If you forget the formula for $R$, re-derive it. Always start with the Ratio Test applied to the absolute value of the series terms:
    $$
    \lim_{n \to \infty} \left| \frac{c_{n+1}(x-c)^{n+1}}{c_n(x-c)^n} \right| < 1
    $$
    $$
    \lim_{n \to \infty} \left| \frac{c_{n+1}}{c_n} \right| \cdot |x-c| < 1
    $$
    $$
    |x-c| < \lim_{n \to \infty} \left| \frac{c_n}{c_{n+1}} \right|
    $$
    This inequality is $|x-c|<R$, so you have just re-derived the formula for $R$. This is foolproof.

## Common mistakes
1.  **Forgetting to test the endpoints.** This is the most common point deduction. The Ratio Test *always* fails at the endpoints; they are a separate problem to be solved.
2.  **Incorrectly calculating the radius.** A common algebra error is inverting the ratio $\frac{c_n}{c_{n+1}}$. Using the First Principles pathway above prevents this.
3.  **Mixing up $R=0$ and $R=\infty$.** If the limit for the Ratio Test results in $|x-c| \cdot \infty < 1$, this is impossible unless $x=c$, so $R=0$. If it results in $|x-c| \cdot 0 < 1$, this is true for all $x$, so $R=\infty$.

## Self-check
Find the center, radius, and interval of convergence for each series. Do not look up the answers until you have committed to your own.

1.  $\sum_{n=1}^{\infty} \frac{x^n}{n^2}$
2.  $\sum_{n=0}^{\infty} \frac{(-1)^n (x+1)^n}{3^n}$
3.  $\sum_{n=0}^{\infty} n!(x-4)^n$