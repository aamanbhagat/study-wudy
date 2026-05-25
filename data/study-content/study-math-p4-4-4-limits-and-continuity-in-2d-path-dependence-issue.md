## 1. What it is — in plain English

Imagine you're standing on a flat, 2D map, and you want to know the "height" of a specific spot, let's call it Point P. In everyday life, a spot has one height. But in mathematics, especially when dealing with complex surfaces, it's not always so simple.

The "limit" of a function at Point P is like asking: "If I walk closer and closer to Point P, what height do I *seem* to be approaching?" If you're walking on a normal, smooth hill, no matter which direction you approach Point P from—north, south, east, west, or any curvy path—you'll always seem to be heading towards the same height. If this happens, we say the limit *exists* at Point P.

However, sometimes the "surface" we're exploring is a bit weird. Maybe it's like two separate ramps that meet at Point P, but one ramp ends at a height of 10 feet and the other ends at 20 feet. If you approach Point P from the first ramp, you'd think the height is 10. If you approach from the second ramp, you'd think it's 20. Since you get different answers depending on your approach path, there isn't a single, clear "approaching height" for Point P. In this case, we say the limit *does not exist* (DNE) at Point P.

The "path-dependence issue" is precisely this problem: for a limit to exist in 2D (or higher dimensions), the function must approach the *exact same value* regardless of the path taken to reach the point. If even two different paths lead to different approaching values, then the limit is undefined.

## 2. Why it matters — real-world applications

The concept of path-dependent limits is crucial in fields where smooth, predictable transitions are necessary, or where understanding abrupt changes is vital.

1.  **Aerospace Engineering (Aircraft Control Systems):** Imagine a control surface on an aircraft, like an aileron, whose effectiveness (how much it changes the roll of the plane) is a function of multiple variables like airspeed and angle of attack. If the function describing this effectiveness had a path-dependent limit at certain operating conditions (e.g., near a stall speed or high angle of attack), it would mean that approaching those conditions in slightly different ways (e.g., increasing speed then angle, versus increasing angle then speed) would lead to drastically different and unpredictable control responses. This could lead to loss of control, making it critical for engineers to design systems with continuous and well-defined limits.

2.  **Machine Learning (Optimization and Gradient Descent):** Many machine learning algorithms, such as those used in training neural networks, rely on optimizing a "cost function" that measures how well a model performs. This optimization often involves finding the minimum of the cost function using techniques like gradient descent, which essentially "walks down" the steepest slope. If the cost function has path-dependent limits or discontinuities, the gradient might not be well-defined at certain points, or the algorithm could get stuck in local minima or oscillate wildly, preventing it from finding an optimal solution. Data scientists need to ensure their loss functions are "well-behaved" (continuous and differentiable) for these algorithms to work reliably.

3.  **Physics (Field Theory and Singularities):** In physics, many phenomena are described by fields (e.g., gravitational fields, electric fields) that are functions of 2D or 3D space. For instance, consider the gravitational potential around a massive object. If the potential function had path-dependent limits near a point (like a singularity in a theoretical black hole model), it would imply that the physics behaves fundamentally differently depending on how one approaches that point. While singularities themselves are often points where our current theories break down, the *approach* to them needs to be understood. Similarly, understanding the behavior of fluid flow near an obstacle, or stress distribution in materials near a crack, often involves analyzing limits of multivariable functions.

4.  **Computer Graphics and Image Processing:** When rendering 3D scenes or processing images, functions are used to describe color, texture, or light intensity across a 2D surface (the screen or image). If these functions exhibit path-dependent limits, it could lead to visual artifacts like "tearing" or "aliasing" where colors or textures abruptly change depending on how a pixel's coordinates are approached during rendering, resulting in unrealistic or jagged images. Algorithms must ensure continuity to produce smooth, realistic visuals.

## 3. Prerequisites — what you must know first

Before diving deep into 2D limits and path dependence, ensure you have a solid grasp of these foundational concepts:

*   **Single-variable limits:** The concept of a limit $\lim_{x \to a} f(x) = L$, where $f(x)$ approaches $L$ as $x$ approaches $a$ from both the left and the right.
*   **Continuity in 1D:** A function $f(x)$ is continuous at $x=a$ if $\lim_{x \to a} f(x) = f(a)$.
*   **Algebraic manipulation:** Proficiency in simplifying expressions, factoring, and working with fractions.
*   **Basic functions:** Understanding polynomials, rational functions, trigonometric functions, and their properties.
*   **Coordinate systems:** Familiarity with the Cartesian coordinate system in 2D (x-y plane).
*   **Distance formula (in 2D):** How to calculate the distance between two points $(x_1, y_1)$ and $(x_2, y_2)$, which is $\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$. This is implicitly used in the $\epsilon-\delta$ definition.
*   **Inequalities:** Working with absolute values and various types of inequalities.
*   **Polar coordinates:** How to convert between Cartesian $(x,y)$ and polar $(r,\theta)$ coordinates ($x=r\cos\theta$, $y=r\sin\theta$, $r^2=x^2+y^2$). This is often a powerful tool for evaluating 2D limits.

## 4. The core idea — step by step

Let's break down the concept of limits in 2D and the path-dependence issue.

### Step 1: Recalling 1D Limits — The Two-Sided Approach

*   **Plain English:** In one dimension, like walking along a straight line, if you want to know what value a function approaches as you get closer to a point (say, $x=5$), you only have two ways to approach it: from the left (values less than 5) or from the right (values greater than 5).
*   **Small concrete example:** Consider the function $f(x) = \frac{|x|}{x}$. As $x$ approaches $0$ from the left, $f(x)$ is $-1$. As $x$ approaches $0$ from the right, $f(x)$ is $1$. Since these are different, $\lim_{x \to 0} f(x)$ does not exist.
*   **Formal/Mathematical version:**
    $$ \lim_{x \to a} f(x) = L \quad \text{if and only if} \quad \lim_{x \to a^-} f(x) = L \quad \text{and} \quad \lim_{x \to a^+} f(x) = L $$
*   **What could go wrong:** Students often forget that *both* sides must agree. It's not enough for one side to approach a value.

### Step 2: Extending to 2D Limits — The "All Paths" Approach

*   **Plain English:** Now imagine you're on a flat plane (2D), and you want to know what value a function $f(x,y)$ approaches as you get closer to a specific point $(a,b)$. Instead of just two directions (left/right), you can approach $(a,b)$ from infinitely many directions and along infinitely many paths—straight lines, parabolas, spirals, etc. For the limit to exist, the function must approach the *exact same value* no matter which path you take.
*   **Small concrete example:** Consider a simple function like $f(x,y) = x+y$. If you approach $(0,0)$ along the line $y=x$, then $f(x,x) = x+x = 2x$. As $x \to 0$, $2x \to 0$. If you approach along the line $y=0$, then $f(x,0) = x+0 = x$. As $x \to 0$, $x \to 0$. It seems to be approaching $0$. (For this simple function, it *does* approach $0$ from all paths).
*   **Formal/Mathematical version:**
    $$ \lim_{(x,y) \to (a,b)} f(x,y) = L $$
    This means that for every $\epsilon > 0$, there exists a $\delta > 0$ such that if $0 < \sqrt{(x-a)^2 + (y-b)^2} < \delta$, then $|f(x,y) - L| < \epsilon$. The crucial part here is that $\sqrt{(x-a)^2 + (y-b)^2}$ represents the distance from $(x,y)$ to $(a,b)$, and it doesn't specify *how* you get closer, only that you *are* closer.
*   **What could go wrong:** It's easy to assume that if a few common paths (like $y=0$ or $x=0$) give the same result, the limit exists. This is a common trap!

### Step 3: The Path-Dependence Issue — When the Limit DNE

*   **Plain English:** The "path-dependence issue" is the problem that arises when different paths approaching a point $(a,b)$ lead to different limit values for $f(x,y)$. If you can find *at least two* distinct paths that yield different limits, then the overall limit of the function at that point *does not exist*. It's like our two ramps analogy: if one path leads to height 10 and another to height 20, there's no single "height" for that spot.
*   **Small concrete example:** Consider $f(x,y) = \frac{xy}{x^2+y^2}$ as $(x,y) \to (0,0)$.
    *   Path 1 (along the x-axis, $y=0$): $f(x,0) = \frac{x \cdot 0}{x^2+0^2} = \frac{0}{x^2} = 0$ (for $x \ne 0$). So, $\lim_{x \to 0} 0 = 0$.
    *   Path 2 (along the line $y=x$): $f(x,x) = \frac{x \cdot x}{x^2+x^2} = \frac{x^2}{2x^2} = \frac{1}{2}$ (for $x \ne 0$). So, $\lim_{x \to 0} \frac{1}{2} = \frac{1}{2}$.
    Since $0 \ne \frac{1}{2}$, the limit $\lim_{(x,y) \to (0,0)} \frac{xy}{x^2+y^2}$ does not exist.
*   **Formal/Mathematical version:** If there exist two distinct paths $C_1$ and $C_2$ approaching $(a,b)$ such that $\lim_{(x,y) \to (a,b) \text{ along } C_1} f(x,y) = L_1$ and $\lim_{(x,y) \to (a,b) \text{ along } C_2} f(x,y) = L_2$, and $L_1 \ne L_2$, then $\lim_{(x,y) \to (a,b)} f(x,y)$ DNE.
*   **What could go wrong:** Students often stop after finding one path. You need *at least two* different results to prove the limit DNE. If you find two paths that give the *same* result, that doesn't prove the limit *exists*; it just means you need to try more paths or a different method.

### Step 4: Proving a Limit DNE (The Strategy)

*   **Plain English:** To show a limit doesn't exist, your goal is to be a "limit detective." You need to find two different ways to approach the point in question, and show that the function gives you two different "answers" (limit values) for those two ways.
*   **Small concrete example:** (Revisiting $f(x,y) = \frac{xy}{x^2+y^2}$ at $(0,0)$)
    1.  Choose Path 1: $y=0$ (x-axis). Substitute $y=0$ into $f(x,y)$ to get $f(x,0) = 0$. The limit as $x \to 0$ is $0$.
    2.  Choose Path 2: $y=x$ (line $y=x$). Substitute $y=x$ into $f(x,y)$ to get $f(x,x) = \frac{x^2}{2x^2} = \frac{1}{2}$. The limit as $x \to 0$ is $\frac{1}{2}$.
    Since $0 \ne \frac{1}{2}$, the limit DNE.
*   **Formal/Mathematical version:** The process involves:
    1.  Select a path $C_1$ approaching $(a,b)$, typically defined by a relationship between $x$ and $y$ (e.g., $y=mx$, $y=x^2$, $x=0$, $y=0$).
    2.  Substitute this relationship into $f(x,y)$ to get a single-variable function (e.g., $g(x) = f(x, mx)$).
    3.  Evaluate the limit of this single-variable function as $x \to a$ (or $y \to b$). Let this be $L_1$.
    4.  Repeat steps 1-3 for a different path $C_2$, yielding $L_2$.
    5.  If $L_1 \ne L_2$, then the multivariable limit DNE.
*   **What could go wrong:** Students often only test linear paths like $y=mx$. Sometimes, linear paths will all yield the same result, but a non-linear path (like $y=x^2$ or $x=y^2$) will reveal the discontinuity. You need to be creative in choosing paths.

### Step 5: Proving a Limit EXISTS (The Hard Part)

*   **Plain English:** To prove a limit *does* exist, you can't just check a few paths, because there are infinitely many. You need a more powerful tool. The main ways are:
    1.  **Direct substitution:** If the function is "nice" (like a polynomial or a rational function where the denominator isn't zero at the point), you can just plug in the values.
    2.  **Algebraic simplification:** Sometimes you can simplify the expression to remove the problematic part (like dividing out common factors in rational functions).
    3.  **Squeeze Theorem (or Sandwich Theorem):** If you can "trap" your function between two other functions, both of which approach the same limit, then your function must also approach that limit. This is often done by converting to polar coordinates to simplify the expression and bound it.
    4.  **The Epsilon-Delta Definition:** This is the most rigorous proof, directly showing that you can make the function's output arbitrarily close to $L$ by making the input sufficiently close to $(a,b)$.
*   **Small concrete example (Squeeze Theorem):** Consider $f(x,y) = \frac{x^2y}{x^2+y^2}$ as $(x,y) \to (0,0)$.
    *   Try paths: $y=0 \implies 0$. $x=0 \implies 0$. $y=mx \implies \frac{x^2(mx)}{x^2+(mx)^2} = \frac{mx^3}{x^2(1+m^2)} = \frac{mx}{1+m^2} \to 0$ as $x \to 0$. All linear paths give $0$. This *suggests* the limit might be $0$.
    *   Use Squeeze Theorem: We want to show $|f(x,y) - 0| < \epsilon$.
        $|f(x,y)| = \left|\frac{x^2y}{x^2+y^2}\right| = \frac{x^2|y|}{x^2+y^2}$.
        Since $x^2 \le x^2+y^2$ (because $y^2 \ge 0$), we have $\frac{x^2}{x^2+y^2} \le 1$.
        So, $\frac{x^2|y|}{x^2+y^2} \le 1 \cdot |y| = |y|$.
        As $(x,y) \to (0,0)$, we know $|y| \to 0$.
        Thus, $0 \le \left|\frac{x^2y}{x^2+y^2}\right| \le |y|$.
        Since $\lim_{(x,y) \to (0,0)} 0 = 0$ and $\lim_{(x,y) \to (0,0)} |y| = 0$, by the Squeeze Theorem, $\lim_{(x,y) \to (0,0)} \frac{x^2y}{x^2+y^2} = 0$.
*   **Formal/Mathematical version:** (See Section 7 for the full $\epsilon-\delta$ definition). The Squeeze Theorem for multivariable functions states: If $g(x,y) \le f(x,y) \le h(x,y)$ for all $(x,y)$ in an open disk around $(a,b)$ (except possibly at $(a,b)$ itself), and $\lim_{(x,y) \to (a,b)} g(x,y) = L$ and $\lim_{(x,y) \to (a,b)} h(x,y) = L$, then $\lim_{(x,y) \to (a,b)} f(x,y) = L$.
*   **What could go wrong:** This is often the most challenging part. Finding the right bounding functions for the Squeeze Theorem or constructing an $\epsilon-\delta$ proof requires practice and ingenuity.

### Step 6: Connection to Continuity in 2D

*   **Plain English:** Just like in 1D, a function $f(x,y)$ is "continuous" at a point $(a,b)$ if there are no sudden jumps, holes, or breaks there. Mathematically, it means three things:
    1.  The function must actually *exist* at that point (you can plug in $(a,b)$ and get a value).
    2.  The limit must *exist* at that point (all paths lead to the same value).
    3.  The limit value must be *equal* to the function's actual value at that point.
*   **Small concrete example:**
    *   $f(x,y) = x^2+y^2$ is continuous everywhere because it's a polynomial.
    *   $g(x,y) = \frac{xy}{x^2+y^2}$ is *not* continuous at $(0,0)$ because its limit DNE there.
    *   Consider $h(x,y) = \begin{cases} \frac{x^2y}{x^2+y^2} & (x,y) \ne (0,0) \\ 0 & (x,y) = (0,0) \end{cases}$. We showed in Step 5 that $\lim_{(x,y) \to (0,0)} h(x,y) = 0$. Since $h(0,0)=0$, the limit equals the function value, so $h(x,y)$ *is* continuous at $(0,0)$.
*   **Formal/Mathematical version:** A function $f(x,y)$ is continuous at a point $(a,b)$ if:
    1.  $f(a,b)$ is defined.
    2.  $\lim_{(x,y) \to (a,b)} f(x,y)$ exists.
    3.  $\lim_{(x,y) \to (a,b)} f(x,y) = f(a,b)$.
*   **What could go wrong:** Students often forget one of the three conditions for continuity. The existence of the limit is the most challenging condition to verify for multivariable functions due to the path-dependence issue.

## 5. Worked examples — multiple, with every step shown

Here are several examples, from straightforward to more challenging, demonstrating how to handle limits and the path-dependence issue.

### Example 1: A straightforward polynomial function (Limit exists)

**Problem:** Evaluate $\lim_{(x,y) \to (1,2)} (x^2y + 3x - y^3)$.

**Given:** The function $f(x,y) = x^2y + 3x - y^3$ and the point $(a,b) = (1,2)$.
**Want:** The limit of $f(x,y)$ as $(x,y)$ approaches $(1,2)$.

**Solution:**
Since $f(x,y)$ is a polynomial function, it is continuous everywhere in its domain (which is all of $\mathbb{R}^2$). For continuous functions, the limit at a point is simply the function's value at that point.

1.  **Identify function type:** The given function $f(x,y) = x^2y + 3x - y^3$ is a polynomial in two variables.
    *   *Explanation:* Polynomials are sums of terms where each term is a constant times powers of the variables. This function fits that description.

2.  **Apply continuity property:** For any polynomial function $P(x,y)$, we know that $\lim_{(x,y) \to (a,b)} P(x,y) = P(a,b)$.
    *   *Explanation:* This is a fundamental property of continuous functions. Since polynomials are continuous, we can directly substitute the coordinates of the point.

3.  **Substitute the point's coordinates:** Substitute $x=1$ and $y=2$ into the function.
    $$ f(1,2) = (1)^2(2) + 3(1) - (2)^3 $$
    *   *Explanation:* We are evaluating the function at the target point $(1,2)$.

4.  **Calculate the value:** Perform the arithmetic.
    $$ f(1,2) = (1)(2) + 3 - 8 $$
    $$ f(1,2) = 2 + 3 - 8 $$
    $$ f(1,2) = 5 - 8 $$
    $$ f(1,2) = -3 $$
    *   *Explanation:* Simple arithmetic to get the final function value.

**Final Answer:**
$$ \lim_{(x,y) \to (1,2)} (x^2y + 3x - y^3) = \boxed{-3} $$

**Reflection:** This example was straightforward because polynomial functions are continuous everywhere. The limit exists and is simply the function's value at the point. This type of problem doesn't involve the path-dependence issue directly, as all paths would lead to the same value.

---

### Example 2: A rational function with path-dependent limit (Limit DNE)

**Problem:** Evaluate $\lim_{(x,y) \to (0,0)} \frac{x^2 - y^2}{x^2 + y^2}$.

**Given:** The function $f(x,y) = \frac{x^2 - y^2}{x^2 + y^2}$ and the point $(a,b) = (0,0)$.
**Want:** The limit of $f(x,y)$ as $(x,y)$ approaches $(0,0)$.

**Solution:**
Direct substitution of $(0,0)$ gives $\frac{0^2 - 0^2}{0^2 + 0^2} = \frac{0}{0}$, which is an indeterminate form. This means we need to investigate further, particularly by checking different paths.

1.  **Test Path 1: Along the x-axis (where $y=0$).**
    *   *Explanation:* We choose a simple linear path to approach $(0,0)$. The x-axis is defined by $y=0$.
    *   Substitute $y=0$ into the function:
        $$ f(x,0) = \frac{x^2 - (0)^2}{x^2 + (0)^2} = \frac{x^2}{x^2} $$
    *   *Explanation:* Replace all instances of $y$ with $0$.
    *   Simplify the expression (for $x \ne 0$):
        $$ f(x,0) = 1 $$
    *   *Explanation:* Any non-zero number divided by itself is $1$. Note that we are considering $x \ne 0$ because we are approaching $(0,0)$, not evaluating at $(0,0)$.
    *   Take the limit as $x \to 0$:
        $$ \lim_{x \to 0} 1 = 1 $$
    *   *Explanation:* The limit of a constant is the constant itself. So, along the x-axis, the function approaches $1$.

2.  **Test Path 2: Along the y-axis (where $x=0$).**
    *   *Explanation:* We choose another simple linear path, the y-axis, defined by $x=0$.
    *   Substitute $x=0$ into the function:
        $$ f(0,y) = \frac{(0)^2 - y^2}{(0)^2 + y^2} = \frac{-y^2}{y^2} $$
    *   *Explanation:* Replace all instances of $x$ with $0$.
    *   Simplify the expression (for $y \ne 0$):
        $$ f(0,y) = -1 $$
    *   *Explanation:* Any non-zero number divided by its negative is $-1$.
    *   Take the limit as $y \to 0$:
        $$ \lim_{y \to 0} (-1) = -1 $$
    *   *Explanation:* The limit of a constant is the constant itself. So, along the y-axis, the function approaches $-1$.

3.  **Compare the limits from different paths.**
    *   From Path 1 (x-axis), the limit is $1$.
    *   From Path 2 (y-axis), the limit is $-1$.
    *   Since $1 \ne -1$, the limits along these two paths are different.
    *   *Explanation:* If different paths lead to different limit values, the overall limit does not exist.

**Final Answer:**
$$ \lim_{(x,y) \to (0,0)} \frac{x^2 - y^2}{x^2 + y^2} = \boxed{\text{Does Not Exist (DNE)}} $$

**Reflection:** This example clearly demonstrates the path-dependence issue. By finding two different paths that yield different limit values, we can definitively conclude that the overall limit does not exist. This is a common strategy for proving DNE.

---

### Example 3: A rational function requiring non-linear paths (Limit DNE)

**Problem:** Evaluate $\lim_{(x,y) \to (0,0)} \frac{xy^2}{x^2 + y^4}$.

**Given:** The function $f(x,y) = \frac{xy^2}{x^2 + y^4}$ and the point $(a,b) = (0,0)$.
**Want:** The limit of $f(x,y)$ as $(x,y)$ approaches $(0,0)$.

**Solution:**
Direct substitution of $(0,0)$ gives $\frac{0}{0}$, an indeterminate form. We need to check paths.

1.  **Test Path 1: Along the x-axis (where $y=0$).**
    *   Substitute $y=0$ into the function:
        $$ f(x,0) = \frac{x(0)^2}{x^2 + (0)^4} = \frac{0}{x^2} $$
    *   Simplify (for $x \ne 0$):
        $$ f(x,0) = 0 $$
    *   Take the limit as $x \to 0$:
        $$ \lim_{x \to 0} 0 = 0 $$
    *   *Explanation:* Along the x-axis, the limit is $0$.

2.  **Test Path 2: Along the y-axis (where $x=0$).**
    *   Substitute $x=0$ into the function:
        $$ f(0,y) = \frac{(0)y^2}{(0)^2 + y^4} = \frac{0}{y^4} $$
    *   Simplify (for $y \ne 0$):
        $$ f(0,y) = 0 $$
    *   Take the limit as $y \to 0$:
        $$ \lim_{y \to 0} 0 = 0 $$
    *   *Explanation:* Along the y-axis, the limit is $0$.

3.  **Test Path 3: Along any line $y=mx$.**
    *   *Explanation:* Since the first two linear paths gave the same result, let's try a general linear path $y=mx$ (where $m$ is any real number).
    *   Substitute $y=mx$ into the function:
        $$ f(x,mx) = \frac{x(mx)^2}{x^2 + (mx)^4} = \frac{x(m^2x^2)}{x^2 + m^4x^4} = \frac{m^2x^3}{x^2(1 + m^4x^2)} $$
    *   *Explanation:* Replace $y$ with $mx$ and simplify.
    *   Factor out $x^2$ from the denominator and simplify (for $x \ne 0$):
        $$ f(x,mx) = \frac{m^2x}{1 + m^4x^2} $$
    *   *Explanation:* We can cancel $x^2$ from numerator and denominator.
    *   Take the limit as $x \to 0$:
        $$ \lim_{x \to 0} \frac{m^2x}{1 + m^4x^2} = \frac{m^2(0)}{1 + m^4(0)^2} = \frac{0}{1} = 0 $$
    *   *Explanation:* As $x \to 0$, the numerator goes to $0$ and the denominator goes to $1$.
    *   *Conclusion for linear paths:* All linear paths $y=mx$ (including $y=0$ when $m=0$ and the y-axis when considering $x=0$) yield a limit of $0$. This suggests the limit *might* be $0$, but doesn't prove it. We need to try a non-linear path.

4.  **Test Path 4: Along a parabolic path (e.g., $x=y^2$).**
    *   *Explanation:* The denominator has $x^2 + y^4$. Notice that if $x=y^2$, then $x^2 = (y^2)^2 = y^4$. This choice of path often simplifies the denominator significantly.
    *   Substitute $x=y^2$ into the function:
        $$ f(y^2,y) = \frac{(y^2)y^2}{(y^2)^2 + y^4} = \frac{y^4}{y^4 + y^4} $$
    *   *Explanation:* Replace $x$ with $y^2$.
    *   Simplify the expression (for $y \ne 0$):
        $$ f(y^2,y) = \frac{y^4}{2y^4} = \frac{1}{2} $$
    *   *Explanation:* Combine terms in the denominator and simplify.
    *   Take the limit as $y \to 0$:
        $$ \lim_{y \to 0} \frac{1}{2} = \frac{1}{2} $$
    *   *Explanation:* The limit of a constant is the constant itself.

5.  **Compare the limits from different paths.**
    *   From linear paths ($y=mx$), the limit is $0$.
    *   From the parabolic path ($x=y^2$), the limit is $\frac{1}{2}$.
    *   Since $0 \ne \frac{1}{2}$, the limits along these two types of paths are different.

**Final Answer:**
$$ \lim_{(x,y) \to (0,0)} \frac{xy^2}{x^2 + y^4} = \boxed{\text{Does Not Exist (DNE)}} $$

**Reflection:** This example highlights a crucial point: checking only linear paths is *not sufficient* to conclude that a limit exists. You must be prepared to try non-linear paths, especially when the powers of $x$ and $y$ in the denominator suggest a particular relationship (e.g., $x^2$ and $y^4$ suggest $x=y^2$ because $(y^2)^2=y^4$).

---

### Example 4: A rational function where the limit *does* exist (using Squeeze Theorem)

**Problem:** Evaluate $\lim_{(x,y) \to (0,0)} \frac{x^2y}{x^2 + y^2}$.

**Given:** The function $f(x,y) = \frac{x^2y}{x^2 + y^2}$ and the point $(a,b) = (0,0)$.
**Want:** The limit of $f(x,y)$ as $(x,y)$ approaches $(0,0)$.

**Solution:**
Direct substitution gives $\frac{0}{0}$. Let's test paths first to get a candidate limit value.

1.  **Test Path 1: Along the x-axis (where $y=0$).**
    $$ f(x,0) = \frac{x^2(0)}{x^2 + 0^2} = \frac{0}{x^2} = 0 \quad \text{for } x \ne 0 $$
    $$ \lim_{x \to 0} 0 = 0 $$

2.  **Test Path 2: Along the y-axis (where $x=0$).**
    $$ f(0,y) = \frac{0^2y}{0^2 + y^2} = \frac{0}{y^2} = 0 \quad \text{for } y \ne 0 $$
    $$ \lim_{y \to 0} 0 = 0 $$

3.  **Test Path 3: Along any line $y=mx$.**
    $$ f(x,mx) = \frac{x^2(mx)}{x^2 + (mx)^2} = \frac{mx^3}{x^2 + m^2x^2} = \frac{mx^3}{x^2(1+m^2)} $$
    $$ f(x,mx) = \frac{mx}{1+m^2} \quad \text{for } x \ne 0 $$
    $$ \lim_{x \to 0} \frac{mx}{1+m^2} = \frac{m(0)}{1+m^2} = 0 $$
    *   *Explanation:* All linear paths yield a limit of $0$. This strongly suggests the limit is $0$. Now we must *prove* it using a more general method, like the Squeeze Theorem.

4.  **Apply the Squeeze Theorem.**
    We want to show that $\lim_{(x,y) \to (0,0)} \frac{x^2y}{x^2 + y^2} = 0$. This means we need to show that for any $\epsilon > 0$, we can find a $\delta > 0$ such that if $0 < \sqrt{x^2+y^2} < \delta$, then $\left|\frac{x^2y}{x^2 + y^2} - 0\right| < \epsilon$.
    Let's analyze the expression $\left|\frac{x^2y}{x^2 + y^2}\right|$.
    *   *Explanation:* We are looking at the absolute value of the function, which needs to be bounded by something that goes to zero.
    We know that $x^2 \le x^2 + y^2$ (since $y^2 \ge 0$).
    *   *Explanation:* This is a key inequality. The square of any real number is non-negative.
    Therefore, we can write:
    $$ \frac{x^2}{x^2 + y^2} \le 1 $$
    *   *Explanation:* If the numerator is less than or equal to the denominator (and both are positive), the fraction is less than or equal to 1.
    Now, multiply this inequality by $|y|$ (which is non-negative, so the inequality direction doesn't change):
    $$ \left|\frac{x^2y}{x^2 + y^2}\right| = \frac{x^2|y|}{x^2 + y^2} = \left(\frac{x^2}{x^2 + y^2}\right) |y| \le 1 \cdot |y| = |y| $$
    *   *Explanation:* We've successfully bounded the absolute value of our function from above by $|y|$.
    So, we have the inequality:
    $$ 0 \le \left|\frac{x^2y}{x^2 + y^2}\right| \le |y| $$
    *   *Explanation:* The absolute value of any expression is always non-negative.
    Now, let's consider the limits of the bounding functions as $(x,y) \to (0,0)$:
    $$ \lim_{(x,y) \to (0,0)} 0 = 0 $$
    $$ \lim_{(x,y) \to (0,0)} |y| = 0 $$
    *   *Explanation:* As $(x,y)$ approaches $(0,0)$, $y$ approaches $0$, so $|y|$ approaches $0$.
    By the Squeeze Theorem, since $f(x,y)$ is "squeezed" between $0$ and $|y|$, and both approach $0$, $f(x,y)$ must also approach $0$.

**Final Answer:**
$$ \lim_{(x,y) \to (0,0)} \frac{x^2y}{x^2 + y^2} = \boxed{0} $$

**Reflection:** This example shows how to prove a limit *exists* when direct substitution doesn't work. After confirming that different paths yield the same candidate limit, the Squeeze Theorem (or polar coordinates, as an alternative approach) is often the most effective method. The trick lies in finding appropriate inequalities to bound the function.

## 6. Common mistakes and traps

1.  **Assuming linear paths are sufficient:** The most common mistake is to test only paths like $y=0$, $x=0$, and $y=mx$. While these are good starting points, they are often not enough. As seen in Example 3, a non-linear path (like $y=x^2$ or $x=y^2$) might reveal a path-dependence that linear paths miss.
2.  **Incorrectly concluding a limit exists:** If you test several paths and they all yield the same limit value, you *cannot* conclude that the limit exists. You have only shown that the limit *might* be that value. To prove existence, you need methods like the Squeeze Theorem or the $\epsilon-\delta$ definition.
3.  **Applying L'Hopital's Rule:** L'Hopital's Rule is strictly for single-variable limits of indeterminate forms like $\frac{0}{0}$ or $\frac{\infty}{\infty}$. It *cannot* be applied directly to multivariable limits.
4.  **Algebraic errors when substituting paths:** Careless algebra when substituting $y=mx$ or $x=y^2$ can lead to incorrect single-variable limits, thus misidentifying path dependence.
5.  **Confusing limit existence with function definition:** A limit can exist even if the function is not defined at the point (e.g., a hole in the surface). Conversely, a function can be defined at a point, but the limit might not exist (e.g., a jump discontinuity).
6.  **Not considering the domain:** Always be mindful of the domain of the function. For rational functions, the denominator cannot be zero. When approaching $(a,b)$, we consider points $(x,y)$ *near* $(a,b)$ but not equal to $(a,b)$.

## 7. Textbook-precise explanation

The concept of limits for functions of multiple variables is a direct generalization of the single-variable case, but with the added complexity of approaching a point from any direction in a higher-dimensional space.

**Definition of a Limit for a Function of Two Variables:**

Let $f$ be a function defined on a domain $D$ that includes points arbitrarily close to $(a,b)$, but not necessarily at $(a,b)$ itself. We say that the limit of $f(x,y)$ as $(x,y)$ approaches $(a,b)$ is $L$, written as:
$$ \lim_{(x,y) \to (a,b)} f(x,y) = L $$
if for every number $\epsilon > 0$, there exists a corresponding number $\delta > 0$ such that if $(x,y) \in D$ and $0 < \sqrt{(x-a)^2 + (y-b)^2} < \delta$, then $|f(x,y) - L| < \epsilon$.

*   **Explanation:** The term $\sqrt{(x-a)^2 + (y-b)^2}$ represents the distance between the point $(x,y)$ and the point $(a,b)$. The condition $0 < \sqrt{(x-a)^2 + (y-b)^2} < \delta$ means that $(x,y)$ is within a disk of radius $\delta$ centered at $(a,b)$, but not equal to $(a,b)$. The condition $|f(x,y) - L| < \epsilon$ means that the function values $f(x,y)$ are within an interval of length $2\epsilon$ centered at $L$.
*   **Significance of "Path-Dependence":** This definition implicitly requires that $f(x,y)$ approaches $L$ regardless of the path taken by $(x,y)$ as it approaches $(a,b)$. If we can find two different paths $C_1$ and $C_2$ approaching $(a,b)$ such that $\lim_{(x,y) \to (a,b) \text{ along } C_1} f(x,y) = L_1$ and $\lim_{(x,y) \to (a,b) \text{ along } C_2} f(x,y) = L_2$, and $L_1 \ne L_2$, then the limit $\lim_{(x,y) \to (a,b)} f(x,y)$ does not exist.

**Definition of Continuity for a Function of Two Variables:**

A function $f(x,y)$ is said to be continuous at a point $(a,b)$ if:
1.  $f(a,b)$ is defined.
2.  $\lim_{(x,y) \to (a,b)} f(x,y)$ exists.
3.  $\lim_{(x,y) \to (a,b)} f(x,y) = f(a,b)$.

*   **Explanation:** These three conditions ensure that the function has no "holes," "jumps," or "breaks" at the point $(a,b)$. The value the function approaches must be the same as its actual value at the point.

**Reference:** These definitions are standard in multivariable calculus textbooks. For example, you can find them in:
*   Stewart, James. *Calculus: Early Transcendentals*. 9th ed., Cengage Learning, 2021. (Refer to Chapter 14, Section 14.2 for Limits and Continuity).
*   Thomas, George B., et al. *Thomas' Calculus*. 14th ed., Pearson, 2018. (Refer to Chapter 14, Section 14.2 for Limits and Continuity in Higher Dimensions).

## 8. ASCII diagrams

```text
       ^ y
       |
       |  Path 3 (e.g., y = x^2)
       |   .
       |    .
       |     .
       |      .
       |       .
       +----------------> x
       |        . (0,0)
       |       .
       |      .
       |     .
       |    .
       |   .
       |  Path 2 (e.g., y = -x)
       |
       |
       V

       Figure 1: Different Paths Approaching the Origin (0,0) in 2D

Description: This diagram illustrates a 2D Cartesian coordinate system with the origin at (0,0). Several different paths are shown approaching the origin.
- Path 1 (not explicitly drawn, implied as x-axis): y=0, approaching along the horizontal axis.
- Path 2: A straight line y=-x, approaching the origin from the bottom-left.
- Path 3: A parabolic curve y=x^2, approaching the origin from the top-right.
The point of this diagram is to visually represent that in 2D, a point can be approached from an infinite number of directions and curves, not just two sides as in 1D. If a limit is path-dependent, then approaching (0,0) along Path 2 might yield a different limit value than approaching along Path 3.

      Z (function value)
      ^
      |      /
      |     /  (Surface A)
      |    /
      |   /
      |  /
      | /
      |/------- (Limit A = 10)
      +----------(0,0) in XY plane
      |\
      | \
      |  \
      |   \ (Surface B)
      |    \
      |     \------- (Limit B = 20)
      |      \
      +----------------> Y
     /
    /
   V X

       Figure 2: A Path-Dependent Discontinuity (Conceptual 3D Surface)

Description: This conceptual 3D diagram shows a point (0,0) in the XY-plane. Above this point, the function's "surface" is split into two parts, Surface A and Surface B.
- Surface A approaches a height of 10 as (x,y) approaches (0,0) from one set of paths (e.g., from the "front-left" or positive X, positive Y directions).
- Surface B approaches a height of 20 as (x,y) approaches (0,0) from another set of paths (e.g., from the "back-right" or negative X, negative Y directions).
Because the function approaches two different Z-values (10 and 20) depending on the path taken to (0,0), the limit at (0,0) does not exist. This illustrates a "tear" or "cliff" in the surface.
```

## 9. Memory technique — never forget this

1.  **Specific mnemonic or visual hook:**
    **"All Roads Lead to Rome... or they don't, for a limit."**
    *   Visualize a city called "Limit-ville" at point $(a,b)$. For the limit to exist, *every single road* (path) leading into Limit-ville must bring you to the exact same "welcome sign" (limit value). If even one road leads to a different welcome sign, then there's no single, consistent limit for Limit-ville. This emphasizes that *all* paths must agree.

2.  **The 1-3 formulas/facts they MUST overlearn:**
    1.  **To prove DNE:** Find two paths $C_1, C_2$ to $(a,b)$ such that $\lim_{C_1} f(x,y) \ne \lim_{C_2} f(x,y)$.
    2.  **To prove EXISTS:** Use the Squeeze Theorem (often with polar coordinates $x=r\cos\theta, y=r\sin\theta$) or the $\epsilon-\delta$ definition.
    3.  **Continuity Conditions:** $f(a,b)$ defined, $\lim_{(x,y) \to (a,b)} f(x,y)$ exists, and $\lim_{(x,y) \to (a,b)} f(x,y) = f(a,b)$.

3.  **A spaced-repetition schedule:**
    *   **Day 1:** Immediately after learning, review notes and attempt a few practice problems.
    *   **Day 3:** Review the core definitions, the "All Roads Lead to Rome" mnemonic, and re-do one DNE and one Squeeze Theorem problem.
    *   **Day 7:** Review the common pitfalls (especially the "linear paths not enough" trap). Try a harder problem involving a parabolic path.
    *   **Day 16:** Re-derive the $\epsilon-\delta$ definition from memory. Attempt a problem that might require polar coordinates for the Squeeze Theorem.
    *   **Day 35:** Explain the concept of path dependence and continuity in 2D to an imaginary friend, without looking at notes. Solve a mixed set of limit problems (some DNE, some exist).

4.  **The first-principles re-derivation pathway:**
    If you forget everything about 2D limits, start from 1D:
    1.  **Recall 1D limit:** For $\lim_{x \to a} f(x)$ to exist, the approach from the left must equal the approach from the right. This is a "two-path" check.
    2.  **Generalize to 2D:** In 2D, a point $(a,b)$ isn't just approached from left/right. It's approached from *all directions* on a plane.
    3.  **The "all paths" requirement:** For a 2D limit to exist, the function value must approach the same number *no matter which path* is taken to $(a,b)$.
    4.  **Consequence: Path-Dependence:** If even two paths give different limits, then the "all paths" requirement is violated, and the limit DNE. This is the core of the path-dependence issue.
    5.  **Proving DNE strategy:** To prove DNE, you just need to find two paths that yield different limits.
    6.  **Proving EXISTS strategy:** To prove existence, you can't check all infinite paths. You need a more powerful argument like the Squeeze Theorem (which works by bounding the function) or the formal $\epsilon-\delta$ definition (which directly states that any point sufficiently close to $(a,b)$ will have its function value sufficiently close to $L$, regardless of path).

## 10. Connections — what this leads to

Understanding limits and continuity in 2D (and higher dimensions) is a foundational stepping stone for much of advanced multivariable calculus and beyond:

1.  **Partial Derivatives:** The definition of a partial derivative (e.g., $\frac{\partial f}{\partial x}$) itself is a limit of a difference quotient, holding other variables constant. The existence of these limits is crucial for defining derivatives.
2.  **Differentiability in Multivariable Calculus:** A function is differentiable at a point if it can be well-approximated by a linear function (its tangent plane) near that point. This definition relies heavily on the concept of limits and requires the existence of partial derivatives, which in turn rely on limits. A function can have partial derivatives that exist, but still not be differentiable if the limits involved are path-dependent.
3.  **Gradient Vector:** The gradient vector, composed of partial derivatives, points in the direction of the greatest rate of increase of a function. Its existence and behavior depend on the limits of difference quotients.
4.  **Optimization (Finding Extrema):** Finding local maxima and minima of multivariable functions involves setting partial derivatives to zero. Understanding where these derivatives exist (and thus where limits are well-behaved) is critical.
5.  **Vector Fields and Line Integrals:** In physics and engineering, vector fields describe forces, fluid flow, or electromagnetic fields. Line integrals evaluate the work done by a force field along a path. The continuity of the vector field (which relies on limits) is often a prerequisite for these calculations.
6.  **Surface Integrals and Flux:** Generalizing integration to surfaces requires understanding continuity over 2D domains.
7.  **Topology:** The $\epsilon-\delta$ definition of a limit is essentially a topological definition, using "open disks" or "neighborhoods." This concept is fundamental to the study of topology, which generalizes ideas of closeness and continuity to abstract spaces.
8.  **Numerical Methods:** Many numerical algorithms for solving differential equations or optimizing functions rely on the assumption of continuity and differentiability. Understanding when these assumptions break down due to path-dependent limits helps in designing robust algorithms.

## 11. Self-check questions

1.  Explain in your own words why the concept of a limit in 2D is more complex than in 1D, specifically addressing the "path-dependence" issue.
2.  Evaluate $\lim_{(x,y) \to (0,0)} \frac{3x^2y}{x^2+y^2}$. If the limit exists, prove it. If it doesn't exist, show why.
3.  Evaluate $\lim_{(x,y) \to (0,0)} \frac{x^3y}{x^6+y^2}$.
4.  Consider the function $f(x,y) = \begin{cases} \frac{x^2-y^2}{x-y} & x \ne y \\ 2x & x = y \end{cases}$. Is $f(x,y)$ continuous at $(1,1)$? Justify your answer using the definition of continuity.
5.  Formulate a problem involving a multivariable limit at $(0,0)$ where:
    a) All linear paths ($y=mx$) yield a limit of $0$.
    b) A non-linear path (e.g., $y=x^k$ for some integer $k > 1$, or $x=y^k$) yields a limit of $1/2$.
    Then, solve your own problem to show the limit DNE.