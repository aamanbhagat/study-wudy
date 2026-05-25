## What it is
In single-variable calculus, a limit exists if the function approaches the same value from the left and the right. In two dimensions, for a limit to exist at a point $(a, b)$, the function $f(x, y)$ must approach the same value $L$ as $(x, y)$ approaches $(a, b)$ along *every possible path* in the $xy$-plane. The "path-dependence issue" arises when the value of the limit depends on the path of approach, which implies the overall limit does not exist.

## Why it matters
This concept is the bedrock of differentiability for multivariable functions, which is essential for optimization. In machine learning, gradient descent algorithms rely on well-behaved derivatives to find minima of loss functions; a path-dependent limit signals a problematic point (a "ridge" or "crevasse") where the gradient is undefined. In physics and aerospace, this appears in fields (e.g., electric, fluid flow); a point where the limit is path-dependent can represent a singularity like a point charge, a vortex, or a shock wave, where the physical laws behave unexpectedly.

## When to study it
You must have a solid grasp of single-variable limits, including L'Hôpital's rule and the formal $\epsilon$-$\delta$ definition. You should also be comfortable with functions of two variables, $z = f(x, y)$, and visualizing them as surfaces in 3D space. Familiarity with basic curves in the $xy$-plane (lines, parabolas) is also required.

## How to study it (step by step)
1.  **Review 1D Limits:** Re-read the definition of a limit in 1D. Remind yourself that $\lim_{x \to c} g(x)$ exists only if $\lim_{x \to c^-} g(x) = \lim_{x \to c^+} g(x)$. Internalize that this is a "two-path test" for 1D.
2.  **Visualize the 2D Problem:** Draw the $xy$-plane. Mark the origin $(0,0)$. Now draw at least three different curves that all terminate at the origin: a straight line ($y=x$), a parabola ($y=x^2$), and the x-axis ($y=0$). Realize that you are no longer limited to just two directions.
3.  **Learn the Two-Path Test:** Understand the core strategy for disproving a 2D limit. If you can find two distinct paths of approach to a point $(a, b)$ that result in two different limit values, you have proven the limit does not exist. This is the primary tool for tackling these problems.
4.  **Practice with Linear Paths:** Take a function like $f(x, y) = \frac{xy}{x^2+y^2}$. Calculate the limit as $(x, y) \to (0, 0)$ along the general path $y=mx$. The result will depend on $m$, proving the limit DNE.
5.  **Practice with Non-Linear Paths:** Find a function where all linear paths give the same limit, but a parabolic path gives a different one. A classic example is $f(x, y) = \frac{x^2y}{x^4+y^2}$. Test $y=mx$ and then test $y=x^2$.
6.  **Understand the Limitation:** Crucially, internalize that the two-path test can *only* be used to prove a limit *does not* exist. If you test ten paths and they all give the same answer, you have proven nothing about the limit's existence. Proving existence requires a more robust method (like converting to polar coordinates or using the Squeeze Theorem), which is the next topic.

## Key ideas, with intuition
1.  **The Infinite Road Network:** Imagine a city center that you want to drive to. In 1D, there's only one highway with two directions (from the east or west). In 2D, the city center is at the intersection of infinitely many roads—straight ones, curved ones, spiral ones. For the "location value" (the limit) to be well-defined, you must get the same value no matter which road you take to get there.

2.  **The Two-Path Test for Non-Existence:** This is your primary tool for destruction. To prove a building is unstable, you don't need to check every brick. You just need to find one critical crack. Similarly, to prove a limit does not exist, you don't need to check all infinite paths; you just need to find *two* paths that disagree.

    $$
    \text{If } \lim_{(x,y) \to (a,b) \text{ along } C_1} f(x,y) = L_1 \quad \text{and} \quad \lim_{(x,y) \to (a,b) \text{ along } C_2} f(x,y) = L_2
    $$
    
    And if $L_1 \neq L_2$, then $\lim_{(x,y) \to (a,b)} f(x,y)$ Does Not Exist.

3.  **Path Choice is a Strategic Guess:** The skill is in choosing paths that simplify the function and expose its underlying structure.
    *   Start with the axes: Path 1: $x \to 0$ first, then $y \to 0$. Path 2: $y \to 0$ first, then $x \to 0$. (This is equivalent to approaching along the y-axis and x-axis).
    *   Try general lines: Use the path $y=mx$ for approaching the origin. If the resulting limit depends on the slope $m$, the limit DNE.
    *   Match powers: Look at the powers of $x$ and $y$ in the denominator. If you have a term like $x^4 + y^2$, a path like $y=kx^2$ is a strategic choice because it makes the terms have the same power: $x^4 + (kx^2)^2 = x^4 + k^2x^4 = (1+k^2)x^4$. This often simplifies the expression dramatically.

## Worked example
Show that $\lim_{(x,y) \to (0,0)} \frac{2x^2y}{x^4 + y^2}$ does not exist.

**Step 1: Choose the first path.**
Let's choose the simplest paths first. Approach the origin along a straight line, represented by the equation $y=mx$. We substitute this into the function.

$$
f(x, mx) = \frac{2x^2(mx)}{x^4 + (mx)^2} = \frac{2mx^3}{x^4 + m^2x^2}
$$

**Step 2: Calculate the limit along the first path.**
Now we take the limit as $x \to 0$.

$$
\lim_{x \to 0} \frac{2mx^3}{x^4 + m^2x^2} = \lim_{x \to 0} \frac{x^2(2mx)}{x^2(x^2 + m^2)} = \lim_{x \to 0} \frac{2mx}{x^2 + m^2}
$$

As $x \to 0$, the numerator becomes $0$ and the denominator becomes $m^2$.
$$
\frac{0}{m^2} = 0 \quad (\text{for } m \neq 0)
$$
If $m=0$ (the path is the x-axis, $y=0$), the original function is $f(x,0) = 0$, so the limit is also $0$. It seems that along any straight line, the limit is $0$.

**Step 3: Suspect a trick. Choose a second, non-linear path.**
The denominator has terms $x^4$ and $y^2$. Let's try a path that makes these terms have the same degree. Let's choose the parabolic path $y=x^2$.

Substitute this into the function:
$$
f(x, x^2) = \frac{2x^2(x^2)}{x^4 + (x^2)^2} = \frac{2x^4}{x^4 + x^4} = \frac{2x^4}{2x^4}
$$

**Step 4: Calculate the limit along the second path.**
Now take the limit as $x \to 0$.
$$
\lim_{x \to 0} \frac{2x^4}{2x^4} = \lim_{x \to 0} 1 = 1
$$

**Step 5: Conclude.**
We found two different paths of approach to $(0,0)$ that yielded different limits:
*   Along the path $y=mx$, the limit is $0$.
*   Along the path $y=x^2$, the limit is $1$.

Since $0 \neq 1$, the limit $\lim_{(x,y) \to (0,0)} \frac{2x^2y}{x^4 + y^2}$ Does Not Exist.

*Reflection:* The first step with linear paths was misleading; it suggested the limit might be 0. The key was noticing the structure of the denominator ($x^4+y^2$) and choosing a path ($y=x^2$) that balanced the powers of the terms, revealing the function's true behavior.

## Diagrams
This diagram shows the core issue: multiple paths converging on a single point $(a,b)$ in the $xy$-plane. For the limit to exist, the value of $f(x,y)$ must approach the same height on the z-axis regardless of which path is taken.

```text
      y
      ^
      |
      |   Path 2 (parabola y=k(x-a)^2+b)
      |  ./
      | /
      |/          Path 1 (line y=m(x-a)+b)
<-----+-----------(a,b)----------------> x
      |         /
      |        /
      | Path 3 / (spiral)
      |     __/
      |
```

## Memory technique — remember this forever
1.  **Mnemonic:** The **"Mountain Pass" Analogy**.
    Imagine you are trying to determine the exact altitude of a mountain pass. You send two hikers, Alice and Bob, to measure it. Alice approaches from the north ridge (Path 1), and Bob approaches from the east valley (Path 2). Alice radios back "The altitude is 3000m". Bob radios back "The altitude is 2500m". Since they disagree, there is no single, well-defined altitude for the pass itself. The limit Does Not Exist. The function has a cliff or a sharp ridge at that point.

2.  **Must Overlearn:** This is a strategy, not a formula.
    **The Two-Path Test for Non-Existence:**
    To prove $\lim_{(x,y) \to (a,b)} f(x,y)$ DNE:
    1.  Find a path $C_1$ and compute $L_1 = \lim_{(x,y) \to (a,b) \text{ along } C_1} f(x,y)$.
    2.  Find a different path $C_2$ and compute $L_2 = \lim_{(x,y) \to (a,b) \text{ along } C_2} f(x,y)$.
    3.  If $L_1 \neq L_2$, the limit DNE.

3.  **Spaced Repetition Schedule:**
    *   Day 1: Re-do the worked example from memory.
    *   Day 3: Do self-check questions 1 and 2.
    *   Day 7: Find two new DNE limit problems online and solve them.
    *   Day 16: Explain the "Mountain Pass" analogy to a friend.
    *   Day 35: Re-derive the result from the worked example without looking at your notes.

4.  **First Principles Pathway:**
    The formal definition of a limit is: $\lim_{(x,y) \to (a,b)} f(x,y) = L$ if for every $\epsilon > 0$, there exists a $\delta > 0$ such that if $0 < \sqrt{(x-a)^2 + (y-b)^2} < \delta$, then $|f(x,y) - L| < \epsilon$.
    The term $\sqrt{(x-a)^2 + (y-b)^2} < \delta$ defines an open disk (a circle) of radius $\delta$ around $(a,b)$. The definition demands that for *any* point $(x,y)$ in this disk, $f(x,y)$ is close to $L$. The two-path test is a way of showing this fails. If you can find points arbitrarily close to $(a,b)$ on one path where $f(x,y)$ is near $L_1$, and other points also arbitrarily close on another path where $f(x,y)$ is near $L_2 \neq L_1$, then no single $L$ can satisfy the definition.

## Common mistakes
1.  **False Proof of Existence:** Testing two or three paths (e.g., $y=0$, $x=0$, $y=x$), seeing they all give the same result, and concluding the limit exists. This is incorrect. You may have missed the one "weird" path (like $y=x^2$) that gives a different result. The path test can only prove non-existence.
2.  **Algebraic Errors:** When substituting $y=mx$ or $y=x^2$, be meticulous. A simple mistake in distributing a power or factoring an $x$ will lead to the wrong conclusion.
3.  **Stopping at Linear Paths:** Always consider non-linear paths if linear paths all agree. If the expression involves different powers of $x$ and $y$ (e.g., $x^3$ and $y^5$), consider a path that relates those powers, like $y=kx^{3/5}$.
4.  **Misinterpreting a Path-Dependent Result:** If you test the path $y=mx$ and get a limit of, say, $2m/(1+m^2)$, do not try to "solve for m". The goal is to show dependence on the path. The fact that the result contains $m$ is the proof that the limit depends on the path (the slope), so the limit DNE.

## Self-check
1.  Investigate $\lim_{(x,y) \to (0,0)} \frac{x^2 - y^2}{x^2 + y^2}$. Does it exist? Prove your conclusion.
2.  Investigate $\lim_{(x,y) \to (0,0)} \frac{xy^2}{x^2 + y^4}$. Hint: Test linear paths first, then consider the powers in the denominator to choose a second path.
3.  Consider the limit $\lim_{(x,y) \to (0,0)} \frac{x^2y}{x^2 + y^2}$. Test the paths $y=mx$ and $x=y^2$. What do you observe, and what can you conclude (or not conclude) from your results?