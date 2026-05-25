## What it is

An increasing function goes up as you move along the graph from left to right, meaning larger inputs always produce larger outputs. Conversely, a decreasing function goes down as you move from left to right, meaning larger inputs produce smaller outputs. This is the formal mathematical method for describing whether a relationship is growing or shrinking.

## Why it matters

Understanding whether a function is increasing or decreasing is the foundation of optimization. In calculus, you will use derivatives to find exact intervals of increase and decrease to determine the maximum altitude of a rocket trajectory or to minimize a cost function in a machine learning algorithm. In physics, identifying where a potential energy function decreases tells you the direction a system will naturally evolve to achieve equilibrium.

## When to study it

You must already understand the basic concept of a function $f(x)$, how to plot coordinates on a Cartesian plane, and the rules of algebraic inequalities ($<$, $>$, $\le$, $\ge$). If you cannot confidently read a graph from left to right, or if you do not know that multiplying an inequality by a negative number flips the sign, review basic graphing and inequality algebra first.

## How to study it (step by step)

1. **Trace the geometry:** Draw a random, smooth, wavy curve on a piece of paper. Trace it with your pen from left to right. Mark the exact points where your pen stops moving up and starts moving down. 
2. **Translate geometry to algebra:** Pick two points on an "uphill" section of your curve. Label the left $x$-coordinate $x_1$ and the right $x$-coordinate $x_2$. Since $x_1$ is to the left, $x_1 < x_2$. Look at the $y$-values: verify visually that $f(x_1) < f(x_2)$.
3. **Master the strict vs. non-strict distinction:** Draw a function that goes up, flattens out perfectly horizontally for a while, and then goes up again. This is "non-decreasing" but *not* "strictly increasing." Write down the algebraic difference: strict uses $<$, non-strict uses $\le$.
4. **Prove a linear relationship:** Take $f(x) = 3x - 2$. Assume $x_1 < x_2$. Multiply both sides by 3 and subtract 2 to prove algebraically that $f(x_1) < f(x_2)$. 
5. **Analyze intervals:** Graph the parabola $f(x) = x^2$. Identify that it is not universally increasing or decreasing. Write down the two distinct intervals: decreasing on $(-\infty, 0)$ and increasing on $(0, \infty)$.

## Key ideas, with intuition

**The Left-to-Right Rule**
Mathematics dictates that we read the independent variable ($x$) from negative to positive. You are always moving to the right. The classification of the function depends entirely on how the dependent variable ($y$ or $f(x)$) responds to this rightward march.

**Strict vs. Non-Strict Definitions**
A function is **strictly increasing** if it constantly rises. It never stalls. 
$$ x_1 < x_2 \implies f(x_1) < f(x_2) $$
A function is simply **increasing** (often called *non-decreasing* in higher math) if it goes up *or* stays flat, but never goes down. 
$$ x_1 < x_2 \implies f(x_1) \le f(x_2) $$
The same logic applies to decreasing functions. **Strictly decreasing** means:
$$ x_1 < x_2 \implies f(x_1) > f(x_2) $$

**Functions Change Behavior**
Most real-world functions are not strictly increasing or decreasing everywhere. A rocket's altitude increases during engine burn and coasting, reaches an apogee (turning point), and decreases as it falls back to Earth. We evaluate increasing/decreasing behavior over specific *intervals* of the domain.

## Worked example

**Problem:** Prove algebraically that $f(x) = -2x + 4$ is a strictly decreasing function for all real numbers.

**Step 1: State the target definition.** 
To prove a function is strictly decreasing, we must show that for any two inputs where $x_1 < x_2$, the outputs satisfy $f(x_1) > f(x_2)$.

**Step 2: Set up the initial assumption.**
Assume we have two arbitrary real numbers such that:
$$ x_1 < x_2 $$

**Step 3: Build the function algebraically.**
Multiply both sides of the inequality by $-2$. *Crucial rule:* Multiplying an inequality by a negative number flips the inequality sign.
$$ -2x_1 > -2x_2 $$

**Step 4: Complete the function expression.**
Add 4 to both sides. Adding a constant does not change the direction of the inequality.
$$ -2x_1 + 4 > -2x_2 + 4 $$

**Step 5: Substitute the function notation.**
Recognize that the left side is exactly $f(x_1)$ and the right side is $f(x_2)$.
$$ f(x_1) > f(x_2) $$

**Reflection:** By starting with $x_1 < x_2$ and applying valid algebraic operations, we proved the output must get smaller. The sign flip in Step 3 is the mathematical engine that makes a line with a negative slope a decreasing function.

## Diagrams

```text
      y                                      y
      ^                                      ^
      |           STRICTLY                   |      STRICTLY
      |          INCREASING                  |     DECREASING
      |                                      |
      |                 * (x2, f(x2))        |   * (x1, f(x1))
      |                /                     |    \
      |               /                      |     \
      |              /                       |      \
      |             /                        |       \
      |            /                         |        \
      |           /                          |         \
      |          /                           |          \
      |         * (x1, f(x1))                |           * (x2, f(x2))
      |                                      |
      +-------------------------> x          +-------------------------> x
           x1   <   x2                            x1   <   x2
         f(x1)  <  f(x2)                        f(x1)  >  f(x2)
```

## Memory technique — remember this forever

1. **Visual hook:** Imagine hiking a mountain profile from left to right. If you are burning calories hiking uphill, the function is increasing. If you are sliding downhill, it is decreasing. 
2. **Must overlearn:**
   * Strictly increasing: $x_1 < x_2 \implies f(x_1) < f(x_2)$
   * Strictly decreasing: $x_1 < x_2 \implies f(x_1) > f(x_2)$
3. **Spaced-repetition schedule:** Review these definitions at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the inequality directions, draw a line going up. Pick a point on the left ($x_1$) and a point on the right ($x_2$). Because $x_1$ is on the left, you know $x_1 < x_2$. Look at the $y$-axis: the right point is higher up, so $f(x_1) < f(x_2)$. The geometry will always regenerate the algebra for you.

## Common mistakes

* **Reading right-to-left:** A decreasing line looks like it is going "up" if your eyes track backwards. Always force yourself to read the $x$-axis from negative to positive.
* **Confusing function sign with function behavior:** A function can be negative (below the $x$-axis) but *increasing* (moving up toward zero). Do not confuse $f(x) < 0$ with a decreasing function.
* **Ignoring the domain:** Stating "$f(x) = x^2$ is an increasing function" is false. It is decreasing for $x < 0$ and increasing for $x > 0$. You must specify the interval.

## Self-check

1. Is the constant function $f(x) = 5$ increasing, decreasing, neither, or both? (Hint: rely strictly on the non-strict definitions $\le$ and $\ge$).
2. For what exact interval of $x$ is the absolute value function $f(x) = |x - 2|$ strictly decreasing?
3. If $f(x)$ is a strictly increasing function, and $g(x)$ is a strictly decreasing function, is the composite function $f(g(x))$ increasing or decreasing? Prove it using the inequality definitions.