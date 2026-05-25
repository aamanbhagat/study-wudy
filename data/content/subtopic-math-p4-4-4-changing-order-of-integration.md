## What it is
Changing the order of integration is the process of rewriting an iterated double integral from the form $\int \int f(x,y) \, dy \, dx$ to $\int \int f(x,y) \, dx \, dy$, or vice versa. This is not a simple swap of the bounds; it requires re-describing the two-dimensional region of integration from a different geometric perspective.

## Why it matters
This technique is a fundamental tool for problem-solving, not just a classroom exercise. Some integrals are difficult or impossible to compute in one order but become trivial in the other. In physics, calculating properties like the center of mass or moment of inertia of a non-rectangular plate often simplifies dramatically with the correct integration order. In machine learning and statistics, computing marginal probabilities from joint probability distributions is an act of integration, and changing the order can be a necessary step for finding a solution.

## When to study it
You must be proficient with single-variable definite integrals (Fundamental Theorem of Calculus) and comfortable setting up double integrals over both rectangular and non-rectangular regions (so-called Type I and Type II regions). You should also be able to sketch graphs of simple functions (lines, parabolas, circles) in the Cartesian plane. If you cannot reliably sketch the region described by a set of inequalities like $\{ (x,y) \mid 0 \le x \le 1, x^2 \le y \le \sqrt{x} \}$, you should review that first.

## How to study it (step by step)
1.  **Master the region types.** A Type I region is defined by $a \le x \le b$ and $g_1(x) \le y \le g_2(x)$. Think "vertical slices." A Type II region is defined by $c \le y \le d$ and $h_1(y) \le x \le h_2(y)$. Think "horizontal slices." Draw one of each.
2.  **Deconstruct an integral.** Take an existing iterated integral, for example, $\int_0^4 \int_{\sqrt{y}}^2 f(x,y) \, dx \, dy$. Write down the inequalities that define the bounds explicitly: $\sqrt{y} \le x \le 2$ and $0 \le y \le 4$.
3.  **Sketch the region.** This is the most critical step. Use the inequalities from step 2 to draw the region of integration, $R$. For the example above, you would plot the curve $x = \sqrt{y}$ (or $y=x^2$), the vertical line $x=2$, and the horizontal line $y=0$. The region is bounded by these curves.
4.  **Reverse the perspective.** Look at your sketch of $R$. Now, describe it as a Type I region (vertical slices). For any given $x$ in the region, what is the lower bound on $y$ and what is the upper bound? Then, what are the absolute minimum and maximum constant values that $x$ takes over the entire region?
5.  **Write the new bounds.** For the region in our example, a vertical line enters at $y=0$ and exits at the parabola $y=x^2$. So the new inner bounds are $0 \le y \le x^2$. The leftmost point of the region is $x=0$ and the rightmost is $x=2$. So the new outer bounds are $0 \le x \le 2$.
6.  **Construct the new integral.** Assemble the pieces: new bounds, the original function, and the reversed differential order. The integral $\int_0^4 \int_{\sqrt{y}}^2 f(x,y) \, dx \, dy$ becomes $\int_0^2 \int_0^{x^2} f(x,y) \, dy \, dx$.
7.  **Solve a killer problem.** Evaluate $\int_0^1 \int_x^1 e^{y^2} \, dy \, dx$. You cannot find an elementary antiderivative for $e^{y^2}$. Change the order of integration and watch the problem dissolve into a simple u-substitution.

## Key ideas, with intuition
1.  **The Region is Invariant.** The double integral $\iint_R f(x,y) \, dA$ is defined over a geometric region $R$. The iterated integrals $\int \int \dots dy \, dx$ and $\int \int \dots dx \, dy$ are just two different ways to compute that value by slicing up $R$. The region $R$ itself does not change; only your method of scanning across it does.
2.  **From Slices to Boundaries.** An integral like $\int_a^b \int_{g_1(x)}^{g_2(x)} f(x,y) \, dy \, dx$ describes a process. The outer integral $\int_a^b \dots dx$ says "sweep $x$ from $a$ to $b$." For each such $x$, the inner integral $\int_{g_1(x)}^{g_2(x)} \dots dy$ says "integrate along a vertical line from the lower curve $y=g_1(x)$ to the upper curve $y=g_2(x)$." Changing the order means you first decide to sweep $y$ between two constants and then integrate along horizontal lines bounded by curves $x=h_1(y)$ and $x=h_2(y)$.
3.  **Bounds Depend Outwards.** The bounds of the inner integral can be functions of the variable of the outer integral. The bounds of the outer integral *must* be constants. This ensures the final result is a number, representing the total signed volume under the surface $z=f(x,y)$ over the region $R$.
    $$ \underbrace{\int_{c}^{d}}_{\text{Constant bounds}} \underbrace{\int_{h_1(y)}^{h_2(y)}}_{\text{Bounds can depend on } y} f(x,y) \, dx \, dy $$

## Worked example
Evaluate the integral $I = \int_0^1 \int_{\sqrt{x}}^1 \frac{\sin(y^3)}{y^2} \, dy \, dx$.

**Step 1: Analyze the initial integral and its region.**
The integral is given in $dy \, dx$ order. The antiderivative of $\frac{\sin(y^3)}{y^2}$ with respect to $y$ is not elementary. This suggests we must change the order.
The bounds define a region $R$ by the inequalities:
- $\sqrt{x} \le y \le 1$
- $0 \le x \le 1$

**Step 2: Sketch the region $R$.**
The region is bounded below by the curve $y=\sqrt{x}$ (or $x=y^2$) and above by the horizontal line $y=1$. The region spans from the y-axis ($x=0$) to the intersection of $y=\sqrt{x}$ and $y=1$, which is at the point $(1,1)$. This forms a curvilinear triangle.

**Step 3: Re-describe the region with the other slicing order.**
We want to set up an integral in $dx \, dy$ order. This corresponds to horizontal slices.
- **Inner bounds (for $x$):** For a fixed value of $y$ between 0 and 1, a horizontal line enters the region at the y-axis ($x=0$) and exits at the parabola, which we must write as $x=y^2$. So, the bounds for $x$ are $0 \le x \le y^2$.
- **Outer bounds (for $y$):** The region $R$ occupies the vertical space from $y=0$ to $y=1$. These are our constant outer bounds.

**Step 4: Write and evaluate the new integral.**
The new integral is:
$$ I = \int_0^1 \int_0^{y^2} \frac{\sin(y^3)}{y^2} \, dx \, dy $$
First, evaluate the inner integral with respect to $x$:
$$ \int_0^{y^2} \frac{\sin(y^3)}{y^2} \, dx = \frac{\sin(y^3)}{y^2} \int_0^{y^2} 1 \, dx = \frac{\sin(y^3)}{y^2} [x]_{x=0}^{x=y^2} = \frac{\sin(y^3)}{y^2} (y^2 - 0) = \sin(y^3) $$
Now, substitute this result into the outer integral:
$$ I = \int_0^1 \sin(y^3) \, dy $$
This is still not trivial. Let's re-check the problem setup. Ah, a slight modification to the integrand makes it a classic example. Let's assume the integrand was intended to be solvable, e.g., $\int_0^1 \int_{\sqrt{x}}^1 y \cos(y^4) \, dy \, dx$. Let's solve a more canonical example to demonstrate the power.

**Corrected Worked Example:** Evaluate $I = \int_0^1 \int_x^1 e^{y^2} \, dy \, dx$.

**Step 1:** The integral $\int e^{y^2} \, dy$ has no elementary solution. We must switch the order. The region $R$ is defined by $x \le y \le 1$ and $0 \le x \le 1$.

**Step 2:** Sketch the region. It is a triangle with vertices at $(0,0)$, $(1,1)$, and $(0,1)$.

**Step 3:** Re-describe with horizontal slices ($dx \, dy$).
- **Inner bounds (for $x$):** A horizontal line enters at $x=0$ and exits at the line $y=x$, which is $x=y$. So, $0 \le x \le y$.
- **Outer bounds (for $y$):** The region spans from $y=0$ to $y=1$.

**Step 4:** Write and evaluate the new integral.
$$ I = \int_0^1 \int_0^y e^{y^2} \, dx \, dy $$
Inner integral (w.r.t. $x$):
$$ \int_0^y e^{y^2} \, dx = e^{y^2} [x]_0^y = y e^{y^2} $$
Outer integral (w.r.t. $y$):
$$ I = \int_0^1 y e^{y^2} \, dy $$
Use u-substitution: let $u = y^2$, so $du = 2y \, dy$, or $\frac{1}{2}du = y \, dy$.
When $y=0$, $u=0$. When $y=1$, $u=1$.
$$ I = \int_0^1 \frac{1}{2} e^u \, du = \frac{1}{2} [e^u]_0^1 = \frac{1}{2}(e^1 - e^0) = \frac{1}{2}(e-1) $$

**Reflection:** The original order was impossible. By identifying the region, reversing the slicing perspective, and setting up the new integral, the inner integration became trivial, which in turn produced an integrand for the outer integral that was perfectly solvable with a standard u-substitution. The key was the geometric interpretation.

## Diagrams
Here is the region for the worked example, $R = \{ (x,y) \mid 0 \le x \le 1, x \le y \le 1 \}$.

**Original Order: Type I (vertical slices)**
The arrow shows the direction of inner integration ($dy$) for a representative $x$.

```text
      y
      ^
      |
    1 +---------+
      |        /|
      | R     / |
      |      /  |
      |     /   |
      |    /  ^ |
      |   /   | |
      |  /   dy |
      | /     | |
    0 +---------+-----> x
      0         1
        y=x
```

**Reversed Order: Type II (horizontal slices)**
The arrow shows the direction of inner integration ($dx$) for a representative $y$.

```text
      y
      ^
      |
    1 +---------+
      |  <--dx--/
      | R     /
      |      /
      |     /
      |    /
      |   /
      |  /
      | /
    0 +---------+-----> x
      0         1
        x=y
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Draw, Turn, Re-scan."
    - **Draw** the region defined by the integral's bounds. This is non-negotiable.
    - **Turn** your head 90 degrees (or just your mental perspective). If you were scanning with vertical lines, now imagine scanning with horizontal lines.
    - **Re-scan** the region with this new perspective to write the new bounds. Ask yourself: "For a slice in the new direction, where does it *enter* the region and where does it *exit*?" Those are your new inner bounds. "What is the full range of these slices?" Those are your new outer bounds.

2.  **Formulas to overlearn:** This is a process, not a formula. The one "equation" to burn into your memory is the equivalence itself:
    $$ \int_{a}^{b} \int_{g_1(x)}^{g_2(x)} f(x,y) \, dy \, dx = \iint_R f(x,y) \, dA = \int_{c}^{d} \int_{h_1(y)}^{h_2(y)} f(x,y) \, dx \, dy $$
    Your job is to find the functions $h_1, h_2$ and constants $c, d$ that describe the *same region* $R$ as $g_1, g_2, a, b$.

3.  **Spaced repetition:** Do one problem of this type on day 1, day 3, day 7, day 16, and day 35. It will become automatic.

4.  **First principles pathway:** If you are ever stuck, forget everything except this:
    - Step 1: Write the inequalities from the integral bounds.
    - Step 2: Draw the region.
    - Step 3: Write new inequalities describing that same region, but starting with the other variable.
    - Step 4: Build the new integral from the new inequalities. This process cannot fail you.

## Common mistakes
-   **"Blind Swapping":** Assuming $\int_a^b \int_c^d f(x,y) \, dy \, dx$ is the same as $\int_c^d \int_a^b f(x,y) \, dx \, dy$. This is only true if all four bounds are constants (a rectangular region). For any non-rectangular region, this is false and will give the wrong answer.
-   **Variable Outer Bounds:** Writing a new integral with a variable in the outer bounds, like $\int_0^y \int_0^1 \dots dx \, dy$. The outer limits must be constants for the result to be a scalar value.
-   **Incorrectly Inverting Functions:** When changing from $y=f(x)$ to $x=g(y)$, students make algebraic errors. If $y=x^2$, then $x=\sqrt{y}$ (assuming $x \ge 0$). If $y=2-x$, then $x=2-y$. Be careful with this algebra as it defines your new integration limits.
-   **Forgetting to Split Regions:** Sometimes, changing the order requires splitting a single integral into two. For example, a triangle might be a single Type I region but require two separate Type II regions. If the "exit" or "entry" curve changes partway through your scan, you need another integral.

## Self-check
1.  Sketch the region of integration and write an equivalent integral with the order of integration reversed for $I = \int_0^1 \int_{y^2}^1 f(x,y) \, dx \, dy$.
2.  Evaluate $\int_0^1 \int_{2y}^2 \cos(x^2) \, dx \, dy$.
3.  Reverse the order of integration for $\int_0^1 \int_{1-\sqrt{1-y^2}}^{1+\sqrt{1-y^2}} f(x,y) \, dx \, dy$. What do you notice about the region? How does this simplify the description?