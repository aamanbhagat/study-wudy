## What it is
An infinite geometric progression (GP) is a sequence of numbers where each term is found by multiplying the previous one by a fixed, non-zero number called the common ratio. The "sum" of an infinite GP is the finite value that the running total approaches as you add more and more terms forever. This convergence only happens if the terms are shrinking toward zero at a specific rate.

## Why it matters
Infinite geometric series are the foundation of Taylor series, which allow computers to calculate trigonometric functions and exponentials in machine learning algorithms and orbital mechanics simulations. They also appear in physics when calculating the total distance traveled by a bouncing ball or evaluating infinite resistor networks. Understanding convergence here is your first rigorous encounter with limits, which form the absolute bedrock of calculus.

## When to study it
You must already thoroughly understand finite geometric progressions, specifically how to find the common ratio and the formula for the sum of the first $n$ terms ($S_n$). You also need an intuitive grasp of limits—specifically, what happens to the expression $r^n$ as $n$ grows infinitely large. If you cannot derive the finite GP sum formula on a blank sheet of paper, go back and master that first.

## How to study it (step by step)
1. Write down the formula for the sum of a finite GP: $S_n = \frac{a(1-r^n)}{1-r}$.
2. Analyze the behavior of $r^n$ as $n \to \infty$ for different values of $r$ (e.g., $r=2$, $r=0.5$, $r=-0.5$, $r=-2$). Observe when it explodes and when it vanishes.
3. Substitute the limit of $r^n$ (when $|r| < 1$) into the finite sum formula to derive the infinite sum formula.
4. Solve 5 basic problems where you identify $a$ and $r$, verify the convergence condition, and apply the formula.
5. Solve a physical word problem, such as calculating the total vertical distance traveled by a bouncing ball that retains a fraction of its height on each bounce.
6. Attempt to apply the formula to a divergent series (like $1 + 2 + 4 + \dots$). Observe the logical absurdity it produces to reinforce why the convergence condition is non-negotiable.

## Key ideas, with intuition
**The Finite Sum**
The sum of the first $n$ terms of a GP with first term $a$ and common ratio $r$ is:
$$S_n = \frac{a - ar^n}{1 - r}$$

**The Power of Shrinking**
If the common ratio $r$ is strictly between $-1$ and $1$ (i.e., $|r| < 1$), multiplying a number by $r$ makes its magnitude smaller. As you raise $r$ to higher and higher powers ($n \to \infty$), $r^n$ gets infinitely close to zero.
$$\lim_{n \to \infty} r^n = 0 \quad \text{if} \quad |r| < 1$$

**The Infinite Sum**
By substituting $r^n \to 0$ into the finite sum formula, the $ar^n$ term completely vanishes. The formula simplifies beautifully to the infinite sum $S_\infty$:
$$S_\infty = \frac{a}{1 - r}$$

**Divergence**
If $|r| \ge 1$, the terms do not shrink to zero. The running total either explodes to infinity (if $r \ge 1$) or oscillates wildly without settling (if $r \le -1$). In these cases, the infinite sum does not exist. We say the series *diverges*.

## Worked example
Evaluate the sum of the infinite series: $9 - 3 + 1 - \frac{1}{3} + \frac{1}{9} - \dots$

*Step 1: Identify the first term, $a$.*
$$a = 9$$

*Step 2: Find the common ratio, $r$, by dividing the second term by the first.*
$$r = \frac{-3}{9} = -\frac{1}{3}$$

*Step 3: Check the condition for convergence.*
Since $|-\frac{1}{3}| < 1$, the series converges. We can proceed.

*Step 4: Apply the infinite GP sum formula.*
$$S_\infty = \frac{a}{1 - r}$$
$$S_\infty = \frac{9}{1 - (-\frac{1}{3})}$$
$$S_\infty = \frac{9}{1 + \frac{1}{3}}$$
$$S_\infty = \frac{9}{\frac{4}{3}}$$
$$S_\infty = 9 \times \frac{3}{4} = \frac{27}{4} = 6.75$$

*Reflection:* The alternating signs meant $r$ was negative, causing the running total to oscillate above and below the final value as it converged. Checking $|r| < 1$ first proved the convergence and prevented us from applying the formula blindly.

## Diagrams
Visualizing the classic series: $\frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \dots = 1$

Imagine a $1 \times 1$ square. The first term takes half the area. The next term takes half of the remaining area, and so on forever.

```text
+-----------------------+-----------------------+
|                       |           |     | | | |
|                       |    1/4    | 1/8 +-+-+ |
|                       |           |     | | | |
|          1/2          +-----------+-----+-+-+ |
|                       |                       |
|                       |                       |
|                       |                       |
+-----------------------+-----------------------+
```
As $n \to \infty$, the boxes perfectly fill the $1 \times 1$ space. The sum converges exactly to 1.

## Memory technique — remember this forever
1. **Visual Hook:** Imagine a frog jumping toward a wall. The first jump is distance $a$. Every subsequent jump is a fraction $r$ of the previous jump. The total distance to the wall is $\frac{a}{1-r}$. If $r \ge 1$, the frog jumps past the wall, escapes gravity, and diverges into orbit.
2. **Must Overlearn:**
   $$S_\infty = \frac{a}{1-r}$$
   **Condition:** Converges if and only if $|r| < 1$.
3. **Spaced-repetition schedule:** Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First Principles Pathway:** If you forget the formula, you don't need the finite sum formula to find it. Use the "shift and subtract" trick:
   Write out the sum: $S = a + ar + ar^2 + ar^3 + \dots$
   Multiply everything by $r$: $rS = ar + ar^2 + ar^3 + \dots$
   Subtract the second equation from the first. All terms on the right cancel out except $a$:
   $$S - rS = a$$
   Factor out $S$:
   $$S(1 - r) = a$$
   Divide by $(1 - r)$:
   $$S = \frac{a}{1 - r}$$

## Common mistakes
* **Ignoring the convergence condition:** Blindly applying $S_\infty = \frac{a}{1-r}$ to a series like $1 + 2 + 4 + \dots$. The formula yields $\frac{1}{1-2} = -1$, which is mathematically absurd for a sum of positive numbers. Always check $|r| < 1$.
* **Misidentifying the first term $a$:** In sigma notation like $\sum_{n=2}^{\infty} 3(0.5)^n$, the first term $a$ is *not* 3. It is the value of the expression evaluated at the starting index $n=2$, which is $3(0.5)^2 = 0.75$.
* **Losing the negative sign in $r$:** When a series alternates signs (e.g., $5 - 2.5 + 1.25 \dots$), students often mistakenly use $r = 0.5$ instead of $r = -0.5$.

## Self-check
1. Find the sum of the infinite geometric series: $10 + 2 + 0.4 + 0.08 + \dots$
2. A ball is dropped from a height of 10 meters. Each time it bounces, it rebounds to 60% of its previous height. What is the *total* vertical distance the ball travels before coming to rest?
3. For what values of $x$ does the infinite geometric series $1 + (x-2) + (x-2)^2 + (x-2)^3 + \dots$ converge, and what is its sum expressed in terms of $x$?