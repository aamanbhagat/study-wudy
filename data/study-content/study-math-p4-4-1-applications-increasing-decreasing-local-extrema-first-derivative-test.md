## 1. What it is — in plain English

Imagine you're walking along a path drawn on a graph. When the path is going uphill, you're experiencing an "increasing" part of the journey. When it's going downhill, that's a "decreasing" part. Simple as that!

Now, think about the very top of a hill or the very bottom of a valley on that path. These special points are called "local extrema." A peak is a "local maximum" because, in its immediate neighborhood, it's the highest point. A valley is a "local minimum" because, in its immediate neighborhood, it's the lowest point.

Calculus gives us a powerful tool to figure out exactly where these uphill, downhill, peak, and valley points are: the derivative. The derivative of a function at any point tells us the slope of the path at that exact spot. If the slope is positive, you're going uphill (increasing). If it's negative, you're going downhill (decreasing). If the slope is zero, you're momentarily flat – usually right at the top of a hill or the bottom of a valley.

So, this lesson is all about using that slope information (the derivative) to precisely map out where a function is increasing or decreasing, and where its local peaks and valleys are. It's like having a detailed topographic map of your path just by knowing its mathematical formula.

## 2. Why it matters — real-world applications

Understanding increasing/decreasing behavior and local extrema is fundamental across countless fields, providing the mathematical backbone for optimization.

1.  **Aerospace Engineering & Flight Optimization:**
    *   **Application:** Designing flight paths for aircraft or spacecraft.
    *   **Detail:** Engineers need to determine the optimal climb rate (increasing altitude) and descent rate (decreasing altitude) to minimize fuel consumption, flight time, or stress on the airframe. Finding the maximum altitude a rocket reaches (a local maximum) is crucial for trajectory planning and payload deployment. Similarly, minimizing drag or maximizing lift often involves finding specific local extrema of complex aerodynamic functions. For example, a flight control system might continuously adjust engine thrust to keep the rate of climb positive but within safe limits, or to find the most fuel-efficient cruising altitude, which often corresponds to a minimum in a fuel consumption rate function.

2.  **Machine Learning & Artificial Intelligence:**
    *   **Application:** Training neural networks and other machine learning models.
    *   **Detail:** Many machine learning algorithms, such as gradient descent, work by trying to find the "best" set of parameters for a model. This "best" usually means minimizing a "cost function" (or "loss function") that measures how poorly the model performs. The process involves iteratively adjusting parameters in the direction where the cost function is decreasing most rapidly (i.e., in the direction opposite to the gradient, which is a multi-variable derivative). The goal is to reach a local minimum of this cost function, where the model's error is minimized. If the model were to go "uphill" on the cost function, it would be getting worse.

3.  **Physics & Engineering Design:**
    *   **Application:** Analyzing projectile motion, designing structures, or optimizing energy systems.
    *   **Detail:** When a ball is thrown, its height over time can be modeled by a quadratic function. Finding the maximum height it reaches (a local maximum) is a classic application. In structural engineering, designers might want to find the point of maximum stress on a beam (a local maximum) to ensure it doesn't break, or design a system to minimize energy loss (a local minimum). For instance, optimizing the shape of a boat hull to minimize drag in water involves finding the dimensions that correspond to a local minimum in the drag force function.

4.  **Economics & Business Management:**
    *   **Application:** Maximizing profit, minimizing cost, or optimizing inventory.
    *   **Detail:** Businesses frequently use calculus to model their revenue, cost, and profit functions. They want to find the production level that maximizes profit (a local maximum of the profit function) or minimizes production cost (a local minimum of the cost function). For example, a company might analyze how pricing changes affect demand, and use this to find the price point that yields maximum revenue. Similarly, determining the optimal number of items to keep in stock to minimize storage costs and avoid stockouts often involves finding a local minimum.

## 3. Prerequisites — what you must know first

Before diving into this topic, ensure you have a solid grasp of the following concepts:

*   **Functions and their Graphs:** Understanding what a function is, how to evaluate it, and how to interpret its graph in the Cartesian coordinate system.
*   **Limits:** The conceptual understanding of how a function behaves as its input approaches a certain value, crucial for understanding continuity and the definition of the derivative.
*   **Continuity:** Knowing when a function is continuous over an interval, as the First Derivative Test typically applies to continuous functions.
*   **Derivatives (Definition and Rules):**
    *   The conceptual definition of the derivative as the instantaneous rate of change or the slope of the tangent line.
    *   Mastery of differentiation rules: power rule, product rule, quotient rule, chain rule, and derivatives of basic functions (polynomials, exponentials, logarithms, trigonometric functions).
*   **Critical Numbers:** How to find values of $x$ where $f'(x) = 0$ or where $f'(x)$ is undefined. These are the potential turning points.
*   **Interval Notation:** How to express sets of numbers using intervals (e.g., $(a, b)$, $[a, \infty)$).
*   **Solving Inequalities:** The ability to solve algebraic inequalities, especially polynomial and rational inequalities, to determine where an expression is positive or negative. This is vital for analyzing the sign of the derivative.

## 4. The core idea — step by step

The core idea is that the sign of the first derivative ($f'(x)$) tells us whether the original function ($f(x)$) is increasing or decreasing. By finding where the derivative changes sign, we can pinpoint the local peaks and valleys.

### Step 1: The Intuition of Slope and Direction

*   **Plain-English Statement:** Imagine walking on the graph of a function. If you're going uphill, your elevation is increasing. If you're going downhill, your elevation is decreasing. The steepness and direction of your path at any point are given by the slope of the tangent line at that point.
*   **Small Concrete Example:** If you're climbing a mountain, your altitude is increasing. If you're descending into a valley, your altitude is decreasing. At the very top of the mountain or bottom of the valley, you're momentarily neither climbing nor descending – the path is flat.
*   **The Formal/Mathematical Version:**
    *   If $f'(x) > 0$ on an interval, then $f(x)$ is **increasing** on that interval. This means that as $x$ increases, $f(x)$ also increases.
    *   If $f'(x) < 0$ on an interval, then $f(x)$ is **decreasing** on that interval. This means that as $x$ increases, $f(x)$ decreases.
    *   If $f'(x) = 0$ on an interval, then $f(x)$ is **constant** on that interval.
*   **What Could Go Wrong:** A common mistake is to confuse the sign of $f(x)$ with the sign of $f'(x)$. A function can be increasing even if its values are negative (e.g., $f(x) = x$ for $x \in (-5, -2)$). It's the *change* in $f(x)$ that matters, not the value of $f(x)$ itself.

### Step 2: Critical Numbers — The Turning Points

*   **Plain-English Statement:** Critical numbers are the "suspects" for where a function might change direction (from increasing to decreasing, or vice-versa). These are the points where the path either flattens out or becomes incredibly steep/jagged (like a sharp corner) such that a smooth tangent line can't be drawn.
*   **Small Concrete Example:** On a roller coaster, the critical points are the very tops of the hills and the very bottoms of the valleys. These are the places where the car momentarily stops going up and starts going down, or vice-versa.
*   **The Formal/Mathematical Version:** A **critical number** (or critical point) of a function $f$ is a number $c$ in the domain of $f$ such that either $f'(c) = 0$ or $f'(c)$ is undefined.
    *   $f'(c) = 0$ implies the tangent line is horizontal.
    *   $f'(c)$ is undefined implies a vertical tangent, a cusp, or a discontinuity.
*   **What Could Go Wrong:** Students often forget to consider points where $f'(x)$ is *undefined*. These points can also be locations of local extrema (e.g., $f(x) = |x|$ at $x=0$) or where the function changes direction. Always check the domain of $f'(x)$.

### Step 3: Intervals of Increase/Decrease

*   **Plain-English Statement:** Once we find all the critical numbers, they act like dividers, splitting the function's domain into several separate regions. Within each region, the function will consistently be either increasing or decreasing. We just need to pick a test point in each region and check the slope there.
*   **Small Concrete Example:** If you have critical points at $x=1$ and $x=5$, these divide the number line into $(-\infty, 1)$, $(1, 5)$, and $(5, \infty)$. You'd pick a number like $x=0$ in the first interval, $x=3$ in the second, and $x=6$ in the third, and plug them into $f'(x)$ to see if the result is positive or negative.
*   **The Formal/Mathematical Version:**
    1.  Find all critical numbers of $f(x)$.
    2.  Use these critical numbers to divide the domain of $f(x)$ into open intervals.
    3.  Choose a test value $x_0$ from each interval.
    4.  Evaluate $f'(x_0)$.
        *   If $f'(x_0) > 0$, then $f(x)$ is increasing on that interval.
        *   If $f'(x_0) < 0$, then $f(x)$ is decreasing on that interval.
*   **What Could Go Wrong:** Forgetting to consider the domain of the original function $f(x)$ when setting up intervals. For example, if $f(x)$ is defined only for $x \ge 0$, your intervals should reflect that. Also, ensure you test *every* interval created by the critical numbers.

### Step 4: Local Extrema — Peaks and Valleys (The First Derivative Test)

*   **Plain-English Statement:** The magic happens when the function changes direction at a critical number. If you're going uphill and then start going downhill, you must have hit a peak (a local maximum). If you're going downhill and then start going uphill, you must have hit a valley (a local minimum). If you go uphill, flatten out, and then continue uphill, it's neither a peak nor a valley.
*   **Small Concrete Example:** A roller coaster goes up a hill ($f'(x) > 0$), reaches the top ($f'(x) = 0$), and then goes down ($f'(x) < 0$). That top is a local maximum. Conversely, going down ($f'(x) < 0$), reaching the bottom ($f'(x) = 0$), and then going up ($f'(x) > 0$) means the bottom is a local minimum.
*   **The Formal/Mathematical Version (The First Derivative Test):**
    Suppose $c$ is a critical number of a continuous function $f$.
    1.  If $f'(x)$ changes from positive to negative at $c$, then $f(c)$ is a **local maximum**.
    2.  If $f'(x)$ changes from negative to positive at $c$, then $f(c)$ is a **local minimum**.
    3.  If $f'(x)$ does not change sign at $c$ (i.e., $f'(x)$ is positive on both sides of $c$ or negative on both sides), then $f(c)$ is neither a local maximum nor a local minimum.
*   **What Could Go Wrong:** Incorrectly identifying which sign change corresponds to a maximum versus a minimum. Remember: positive to negative means a "hump" (max), negative to positive means a "dip" (min). Also, don't forget to calculate the actual $y$-value, $f(c)$, for the local extremum, not just the $x$-value $c$.

### Step 5: When the First Derivative Test Fails (or is inconclusive)

*   **Plain-English Statement:** Sometimes, even if the derivative is zero or undefined at a point, the function doesn't actually turn around. It might just pause for a moment before continuing in the same direction. In such cases, the critical number isn't a local extremum.
*   **Small Concrete Example:** Consider the function $f(x) = x^3$. Its derivative is $f'(x) = 3x^2$. At $x=0$, $f'(0) = 0$. However, $f'(x)$ is positive for $x < 0$ (e.g., $f'(-1) = 3$) and positive for $x > 0$ (e.g., $f'(1) = 3$). Since the sign of $f'(x)$ does not change at $x=0$, there is no local extremum there. The function is increasing, flattens momentarily, then continues increasing.
*   **The Formal/Mathematical Version:** This is explicitly covered by point 3 of the First Derivative Test. If $f'(x)$ does not change sign at $c$, then $f(c)$ is neither a local maximum nor a local minimum. These points are often called **inflection points** if the concavity changes there (which is a topic for the second derivative test).
*   **What Could Go Wrong:** Automatically assuming that *every* critical number corresponds to a local extremum. Always perform the sign analysis of $f'(x)$ around each critical number.

## 5. Worked examples — multiple, with every step shown

### Example 1: Basic Polynomial

**Problem:** Find the intervals where $f(x) = x^3 - 6x^2 + 9x + 1$ is increasing or decreasing, and locate all local extrema.

**Given:** The function $f(x) = x^3 - 6x^2 + 9x + 1$.
**Wanted:** Intervals of increase/decrease and coordinates of local extrema.

**Step 1: Find the first derivative, $f'(x)$.**
$$f(x) = x^3 - 6x^2 + 9x + 1$$
$$f'(x) = \frac{d}{dx}(x^3) - \frac{d}{dx}(6x^2) + \frac{d}{dx}(9x) + \frac{d}{dx}(1)$$
$$f'(x) = 3x^2 - 12x + 9$$
*Explanation: We apply the power rule and constant multiple rule for differentiation to each term.*

**Step 2: Find the critical numbers.**
Critical numbers occur where $f'(x) = 0$ or $f'(x)$ is undefined.
Since $f'(x) = 3x^2 - 12x + 9$ is a polynomial, it is defined for all real numbers. So, we only need to find where $f'(x) = 0$.
$$3x^2 - 12x + 9 = 0$$
Divide by 3 to simplify:
$$x^2 - 4x + 3 = 0$$
Factor the quadratic equation:
$$(x - 1)(x - 3) = 0$$
Set each factor to zero to find the critical numbers:
$$x - 1 = 0 \implies x = 1$$
$$x - 3 = 0 \implies x = 3$$
*Explanation: We set the derivative equal to zero because these are the points where the tangent line is horizontal, indicating a potential turning point. We then solve the resulting quadratic equation by factoring.*

**Step 3: Create a sign chart for $f'(x)$ using the critical numbers.**
The critical numbers $x=1$ and $x=3$ divide the number line into three intervals: $(-\infty, 1)$, $(1, 3)$, and $(3, \infty)$.
We choose a test value within each interval and substitute it into $f'(x) = 3(x-1)(x-3)$.

*   **Interval $(-\infty, 1)$:** Choose $x=0$.
    $f'(0) = 3(0-1)(0-3) = 3(-1)(-3) = 9$.
    Since $f'(0) > 0$, $f(x)$ is increasing on $(-\infty, 1)$.
*   **Interval $(1, 3)$:** Choose $x=2$.
    $f'(2) = 3(2-1)(2-3) = 3(1)(-1) = -3$.
    Since $f'(2) < 0$, $f(x)$ is decreasing on $(1, 3)$.
*   **Interval $(3, \infty)$:** Choose $x=4$.
    $f'(4) = 3(4-1)(4-3) = 3(3)(1) = 9$.
    Since $f'(4) > 0$, $f(x)$ is increasing on $(3, \infty)$.

*Explanation: We systematically test the sign of the derivative in each interval defined by the critical numbers. The sign tells us whether the original function is increasing or decreasing in that interval.*

**Step 4: Identify local extrema using the First Derivative Test.**

*   **At $x=1$**: $f'(x)$ changes from positive to negative.
    Therefore, there is a local maximum at $x=1$.
    To find the $y$-coordinate, substitute $x=1$ into the original function $f(x)$:
    $f(1) = (1)^3 - 6(1)^2 + 9(1) + 1 = 1 - 6 + 9 + 1 = 5$.
    Local maximum at $(1, 5)$.
*   **At $x=3$**: $f'(x)$ changes from negative to positive.
    Therefore, there is a local minimum at $x=3$.
    To find the $y$-coordinate, substitute $x=3$ into the original function $f(x)$:
    $f(3) = (3)^3 - 6(3)^2 + 9(3) + 1 = 27 - 6(9) + 27 + 1 = 27 - 54 + 27 + 1 = 1$.
    Local minimum at $(3, 1)$.

*Explanation: We observe the sign changes of $f'(x)$ around each critical number. A change from positive to negative indicates a peak (local max), and negative to positive indicates a valley (local min). We then calculate the function's value at these critical points to get the coordinates of the extrema.*

**Summary of Results:**
*   **Increasing intervals:** $(-\infty, 1)$ and $(3, \infty)$
*   **Decreasing interval:** $(1, 3)$
*   **Local maximum:** $\mathbf{(1, 5)}$
*   **Local minimum:** $\mathbf{(3, 1)}$

**Reflection:** This example was straightforward because $f(x)$ was a polynomial, meaning its derivative was always defined. The main steps involved factoring a quadratic and carefully tracking signs.

---

### Example 2: Rational Function

**Problem:** Determine the intervals of increase/decrease and local extrema for $f(x) = \frac{x^2}{x-2}$.

**Given:** The function $f(x) = \frac{x^2}{x-2}$.
**Wanted:** Intervals of increase/decrease and coordinates of local extrema.

**Step 1: Find the first derivative, $f'(x)$.**
We use the quotient rule: $\frac{d}{dx}\left(\frac{u}{v}\right) = \frac{u'v - uv'}{v^2}$.
Here, $u = x^2 \implies u' = 2x$.
And $v = x-2 \implies v' = 1$.
$$f'(x) = \frac{(2x)(x-2) - (x^2)(1)}{(x-2)^2}$$
$$f'(x) = \frac{2x^2 - 4x - x^2}{(x-2)^2}$$
$$f'(x) = \frac{x^2 - 4x}{(x-2)^2}$$
$$f'(x) = \frac{x(x-4)}{(x-2)^2}$$
*Explanation: We apply the quotient rule carefully, expanding the numerator and simplifying to get the derivative in a factored form, which is helpful for sign analysis.*

**Step 2: Find the critical numbers.**
Critical numbers occur where $f'(x) = 0$ or $f'(x)$ is undefined.

*   **Where $f'(x) = 0$:**
    The numerator must be zero: $x(x-4) = 0$.
    This gives $x=0$ and $x=4$.
*   **Where $f'(x)$ is undefined:**
    The denominator must be zero: $(x-2)^2 = 0$.
    This gives $x=2$.
    *Important Note:* We must check if $x=2$ is in the domain of the original function $f(x)$. The domain of $f(x) = \frac{x^2}{x-2}$ is all real numbers except $x=2$. Since $x=2$ is not in the domain of $f(x)$, it cannot be a critical number (as critical numbers must be in the domain of $f$). However, it *does* divide the number line and affects the sign of $f'(x)$, so we must include it in our sign chart. It represents a vertical asymptote.

So, the critical numbers in the domain of $f(x)$ are $x=0$ and $x=4$. The point $x=2$ is a discontinuity that also needs to be on our sign chart.

*Explanation: We find where the numerator is zero for $f'(x)=0$ and where the denominator is zero for $f'(x)$ undefined. We must remember that critical numbers must be in the domain of the *original* function. Discontinuities in $f(x)$ (where $f'(x)$ is undefined) also act as boundary points for intervals.*

**Step 3: Create a sign chart for $f'(x)$ using the critical numbers and points of discontinuity.**
The points $x=0$, $x=2$, and $x=4$ divide the number line into four intervals: $(-\infty, 0)$, $(0, 2)$, $(2, 4)$, and $(4, \infty)$.
We choose a test value within each interval and substitute it into $f'(x) = \frac{x(x-4)}{(x-2)^2}$.

*   **Interval $(-\infty, 0)$:** Choose $x=-1$.
    $f'(-1) = \frac{(-1)(-1-4)}{(-1-2)^2} = \frac{(-1)(-5)}{(-3)^2} = \frac{5}{9}$.
    Since $f'(-1) > 0$, $f(x)$ is increasing on $(-\infty, 0)$.
*   **Interval $(0, 2)$:** Choose $x=1$.
    $f'(1) = \frac{(1)(1-4)}{(1-2)^2} = \frac{(1)(-3)}{(-1)^2} = \frac{-3}{1} = -3$.
    Since $f'(1) < 0$, $f(x)$ is decreasing on $(0, 2)$.
*   **Interval $(2, 4)$:** Choose $x=3$.
    $f'(3) = \frac{(3)(3-4)}{(3-2)^2} = \frac{(3)(-1)}{(1)^2} = \frac{-3}{1} = -3$.
    Since $f'(3) < 0$, $f(x)$ is decreasing on $(2, 4)$.
*   **Interval $(4, \infty)$:** Choose $x=5$.
    $f'(5) = \frac{(5)(5-4)}{(5-2)^2} = \frac{(5)(1)}{(3)^2} = \frac{5}{9}$.
    Since $f'(5) > 0$, $f(x)$ is increasing on $(4, \infty)$.

*Explanation: We test each interval. Note that the denominator $(x-2)^2$ is always positive (for $x \ne 2$), so the sign of $f'(x)$ is determined solely by the numerator $x(x-4)$. This simplifies the sign analysis.*

**Step 4: Identify local extrema using the First Derivative Test.**

*   **At $x=0$**: $f'(x)$ changes from positive to negative.
    Therefore, there is a local maximum at $x=0$.
    $f(0) = \frac{(0)^2}{0-2} = 0$.
    Local maximum at $(0, 0)$.
*   **At $x=2$**: $f'(x)$ does not change sign (negative to negative).
    Also, $x=2$ is not in the domain of $f(x)$. So, no local extremum at $x=2$.
*   **At $x=4$**: $f'(x)$ changes from negative to positive.
    Therefore, there is a local minimum at $x=4$.
    $f(4) = \frac{(4)^2}{4-2} = \frac{16}{2} = 8$.
    Local minimum at $(4, 8)$.

*Explanation: We apply the First Derivative Test. We are careful to note that $x=2$ is not an extremum because the function is not defined there and the derivative's sign doesn't change. We calculate the $y$-values for the identified extrema.*

**Summary of Results:**
*   **Increasing intervals:** $(-\infty, 0)$ and $(4, \infty)$
*   **Decreasing intervals:** $(0, 2)$ and $(2, 4)$
*   **Local maximum:** $\mathbf{(0, 0)}$
*   **Local minimum:** $\mathbf{(4, 8)}$

**Reflection:** This example highlighted the importance of considering points where $f'(x)$ is undefined and checking if those points are in the domain of $f(x)$. The point $x=2$ was crucial for dividing the intervals but did not correspond to an extremum because it was a vertical asymptote.

---

### Example 3: Function with a Radical

**Problem:** Find the intervals of increase/decrease and local extrema for $f(x) = x \sqrt{6-x}$.

**Given:** The function $f(x) = x \sqrt{6-x}$.
**Wanted:** Intervals of increase/decrease and coordinates of local extrema.

**Step 1: Determine the domain of $f(x)$.**
For $\sqrt{6-x}$ to be defined, we must have $6-x \ge 0$, which means $x \le 6$.
So, the domain of $f(x)$ is $(-\infty, 6]$.

*Explanation: It's crucial to establish the domain first, as our analysis of increasing/decreasing intervals and critical points must stay within this domain.*

**Step 2: Find the first derivative, $f'(x)$.**
We use the product rule: $\frac{d}{dx}(uv) = u'v + uv'$.
Here, $u = x \implies u' = 1$.
And $v = \sqrt{6-x} = (6-x)^{1/2}$.
To find $v'$, we use the chain rule: $v' = \frac{1}{2}(6-x)^{-1/2} \cdot (-1) = -\frac{1}{2\sqrt{6-x}}$.
$$f'(x) = (1)\sqrt{6-x} + (x)\left(-\frac{1}{2\sqrt{6-x}}\right)$$
$$f'(x) = \sqrt{6-x} - \frac{x}{2\sqrt{6-x}}$$
To combine these terms, find a common denominator:
$$f'(x) = \frac{\sqrt{6-x}}{1} \cdot \frac{2\sqrt{6-x}}{2\sqrt{6-x}} - \frac{x}{2\sqrt{6-x}}$$
$$f'(x) = \frac{2(6-x) - x}{2\sqrt{6-x}}$$
$$f'(x) = \frac{12 - 2x - x}{2\sqrt{6-x}}$$
$$f'(x) = \frac{12 - 3x}{2\sqrt{6-x}}$$
$$f'(x) = \frac{3(4 - x)}{2\sqrt{6-x}}$$
*Explanation: We apply the product rule and chain rule carefully. Then, we combine the terms in the derivative by finding a common denominator and simplify the expression. This factored form of $f'(x)$ is essential for sign analysis.*

**Step 3: Find the critical numbers.**
Critical numbers occur where $f'(x) = 0$ or $f'(x)$ is undefined, and are in the domain of $f(x)$.

*   **Where $f'(x) = 0$:**
    The numerator must be zero: $3(4-x) = 0$.
    This gives $4-x = 0 \implies x = 4$.
    This is in the domain $(-\infty, 6]$.
*   **Where $f'(x)$ is undefined:**
    The denominator must be zero: $2\sqrt{6-x} = 0$.
    This gives $6-x = 0 \implies x = 6$.
    This point is in the domain of $f(x)$ (it's an endpoint) and $f'(6)$ is undefined. So $x=6$ is a critical number.

The critical numbers are $x=4$ and $x=6$.

*Explanation: We identify points where the derivative is zero (horizontal tangent) or undefined (vertical tangent, cusp, or endpoint where the derivative from one side is infinite). Both $x=4$ and $x=6$ are in the domain of $f(x)$, so they are both critical numbers.*

**Step 4: Create a sign chart for $f'(x)$ using the critical numbers and considering the domain.**
The critical numbers $x=4$ and $x=6$ divide the relevant domain $(-\infty, 6]$ into two intervals: $(-\infty, 4)$ and $(4, 6)$. (Note: $x=6$ is an endpoint, so the interval ends there).
We choose a test value within each interval and substitute it into $f'(x) = \frac{3(4 - x)}{2\sqrt{6-x}}$.

*   **Interval $(-\infty, 4)$:** Choose $x=0$.
    $f'(0) = \frac{3(4 - 0)}{2\sqrt{6-0}} = \frac{12}{2\sqrt{6}} = \frac{6}{\sqrt{6}} > 0$.
    Since $f'(0) > 0$, $f(x)$ is increasing on $(-\infty, 4)$.
*   **Interval $(4, 6)$:** Choose $x=5$.
    $f'(5) = \frac{3(4 - 5)}{2\sqrt{6-5}} = \frac{3(-1)}{2\sqrt{1}} = \frac{-3}{2} < 0$.
    Since $f'(5) < 0$, $f(x)$ is decreasing on $(4, 6)$.

*Explanation: We test the sign of $f'(x)$ in the intervals within the function's domain. The denominator $2\sqrt{6-x}$ is always positive for $x < 6$, so the sign of $f'(x)$ is determined by the numerator $3(4-x)$.*

**Step 5: Identify local extrema using the First Derivative Test.**

*   **At $x=4$**: $f'(x)$ changes from positive to negative.
    Therefore, there is a local maximum at $x=4$.
    $f(4) = (4)\sqrt{6-4} = 4\sqrt{2}$.
    Local maximum at $(4, 4\sqrt{2})$.
*   **At $x=6$**: $f'(x)$ is undefined and $f(x)$ is decreasing as $x$ approaches $6$ from the left. Since $x=6$ is an endpoint of the domain and the function is decreasing towards it, it is a local minimum.
    $f(6) = (6)\sqrt{6-6} = 6 \cdot 0 = 0$.
    Local minimum at $(6, 0)$.

*Explanation: We apply the First Derivative Test. The point $x=4$ clearly shows a sign change. For $x=6$, it's an endpoint. Since the function is decreasing as it approaches $x=6$ from the left, and $f(6)$ is the lowest value *in its immediate neighborhood on the defined domain*, it is a local minimum. This is a subtle but important point for functions with restricted domains.*

**Summary of Results:**
*   **Increasing interval:** $(-\infty, 4)$
*   **Decreasing interval:** $(4, 6)$
*   **Local maximum:** $\mathbf{(4, 4\sqrt{2})}$
*   **Local minimum:** $\mathbf{(6, 0)}$

**Reflection:** This example was harder due to the radical, requiring careful use of the chain rule and product rule, and then meticulous algebraic simplification. Crucially, determining the domain of $f(x)$ *before* finding critical numbers was essential, and correctly identifying the endpoint $x=6$ as a critical number and local extremum required careful consideration of the function's behavior at the boundary of its domain.

---

### Example 4: Trigonometric Function

**Problem:** Find the intervals where $f(x) = \sin x + \cos x$ is increasing or decreasing, and locate all local extrema on the interval $[0, 2\pi]$.

**Given:** The function $f(x) = \sin x + \cos x$ on the interval $[0, 2\pi]$.
**Wanted:** Intervals of increase/decrease and coordinates of local extrema within the given interval.

**Step 1: Find the first derivative, $f'(x)$.**
$$f(x) = \sin x + \cos x$$
$$f'(x) = \frac{d}{dx}(\sin x) + \frac{d}{dx}(\cos x)$$
$$f'(x) = \cos x - \sin x$$
*Explanation: We apply the standard differentiation rules for trigonometric functions.*

**Step 2: Find the critical numbers within the interval $[0, 2\pi]$.**
Critical numbers occur where $f'(x) = 0$ or $f'(x)$ is undefined.
Since $f'(x) = \cos x - \sin x$ is defined for all real numbers, we only need to find where $f'(x) = 0$.
$$\cos x - \sin x = 0$$
$$\cos x = \sin x$$
To solve this, we can divide by $\cos x$ (assuming $\cos x \ne 0$):
$$1 = \frac{\sin x}{\cos x}$$
$$1 = \tan x$$
On the interval $[0, 2\pi]$, $\tan x = 1$ when $x = \frac{\pi}{4}$ and $x = \frac{5\pi}{4}$.
(If $\cos x = 0$, then $x = \frac{\pi}{2}$ or $x = \frac{3\pi}{2}$. At these points, $\sin x$ is $\pm 1$, so $\cos x = \sin x$ cannot be true. Thus, division by $\cos x$ was valid.)
The critical numbers are $x = \frac{\pi}{4}$ and $x = \frac{5\pi}{4}$.

*Explanation: We set the derivative to zero and solve the trigonometric equation. We must be careful to find all solutions within the specified interval $[0, 2\pi]$.*

**Step 3: Create a sign chart for $f'(x)$ using the critical numbers and the interval endpoints.**
The critical numbers $x = \frac{\pi}{4}$ and $x = \frac{5\pi}{4}$, along with the interval endpoints $0$ and $2\pi$, divide the interval $[0, 2\pi]$ into three sub-intervals: $[0, \frac{\pi}{4})$, $(\frac{\pi}{4}, \frac{5\pi}{4})$, and $(\frac{5\pi}{4}, 2\pi]$.
We choose a test value within each interval and substitute it into $f'(x) = \cos x - \sin x$.

*   **Interval $[0, \frac{\pi}{4})$:** Choose $x = \frac{\pi}{6}$ (or $30^\circ$).
    $f'(\frac{\pi}{6}) = \cos(\frac{\pi}{6}) - \sin(\frac{\pi}{6}) = \frac{\sqrt{3}}{2} - \frac{1}{2} = \frac{\sqrt{3}-1}{2}$.
    Since $\sqrt{3} \approx 1.732$, $\frac{\sqrt{3}-1}{2} > 0$.
    So, $f(x)$ is increasing on $[0, \frac{\pi}{4})$.
*   **Interval $(\frac{\pi}{4}, \frac{5\pi}{4})$:** Choose $x = \pi$ (or $180^\circ$).
    $f'(\pi) = \cos(\pi) - \sin(\pi) = -1 - 0 = -1$.
    Since $f'(\pi) < 0$, $f(x)$ is decreasing on $(\frac{\pi}{4}, \frac{5\pi}{4})$.
*   **Interval $(\frac{5\pi}{4}, 2\pi]$:** Choose $x = \frac{3\pi}{2}$ (or $270^\circ$).
    $f'(\frac{3\pi}{2}) = \cos(\frac{3\pi}{2}) - \sin(\frac{3\pi}{2}) = 0 - (-1) = 1$.
    Since $f'(\frac{3\pi}{2}) > 0$, $f(x)$ is increasing on $(\frac{5\pi}{4}, 2\pi]$.

*Explanation: We test the sign of the derivative in each interval, using well-known values of sine and cosine. We include the interval endpoints in our analysis as they define the domain.*

**Step 4: Identify local extrema using the First Derivative Test.**

*   **At $x = \frac{\pi}{4}$**: $f'(x)$ changes from positive to negative.
    Therefore, there is a local maximum at $x = \frac{\pi}{4}$.
    $f(\frac{\pi}{4}) = \sin(\frac{\pi}{4}) + \cos(\frac{\pi}{4}) = \frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2} = \sqrt{2}$.
    Local maximum at $(\frac{\pi}{4}, \sqrt{2})$.
*   **At $x = \frac{5\pi}{4}$**: $f'(x)$ changes from negative to positive.
    Therefore, there is a local minimum at $x = \frac{5\pi}{4}$.
    $f(\frac{5\pi}{4}) = \sin(\frac{5\pi}{4}) + \cos(\frac{5\pi}{4}) = -\frac{\sqrt{2}}{2} + (-\frac{\sqrt{2}}{2}) = -\sqrt{2}$.
    Local minimum at $(\frac{5\pi}{4}, -\sqrt{2})$.
*   **Endpoints:**
    *   At $x=0$: This is a left endpoint. The function is increasing starting from this point.
        $f(0) = \sin(0) + \cos(0) = 0 + 1 = 1$. This is a local minimum (or endpoint minimum) because it's the lowest point in its immediate right neighborhood.
    *   At $x=2\pi$: This is a right endpoint. The function is increasing approaching this point.
        $f(2\pi) = \sin(2\pi) + \cos(2\pi) = 0 + 1 = 1$. This is a local maximum (or endpoint maximum) because it's the highest point in its immediate left neighborhood.

*Explanation: We apply the First Derivative Test. For critical points within the interval, we check the sign change. For endpoints, we consider the behavior of the function approaching the endpoint. If the function is increasing up to a right endpoint, that endpoint is a local maximum. If decreasing up to a right endpoint, it's a local minimum. The reverse applies to left endpoints.*

**Summary of Results:**
*   **Increasing intervals:** $[0, \frac{\pi}{4})$ and $(\frac{5\pi}{4}, 2\pi]$
*   **Decreasing interval:** $(\frac{\pi}{4}, \frac{5\pi}{4})$
*   **Local maxima:** $\mathbf{(\frac{\pi}{4}, \sqrt{2})}$ and $\mathbf{(2\pi, 1)}$
*   **Local minima:** $\mathbf{(\frac{5\pi}{4}, -\sqrt{2})}$ and $\mathbf{(0, 1)}$

**Reflection:** This example introduced trigonometric functions and the challenge of solving trigonometric equations for critical numbers within a specific interval. It also reinforced the need to consider endpoints when dealing with a closed interval, as they can often be local extrema.

## 6. Common mistakes and traps

1.  **Confusing the sign of $f(x)$ with the sign of $f'(x)$:** Just because $f(x)$ is negative doesn't mean it's decreasing. The sign of $f'(x)$ (the slope) is what determines increasing/decreasing.
2.  **Forgetting critical numbers where $f'(x)$ is undefined:** These points are just as important as where $f'(x)=0$. They can be local extrema (e.g., cusps) or points of discontinuity that define intervals.
3.  **Not checking the domain of $f(x)$:** Critical numbers *must* be in the domain of the original function. Points where $f'(x)$ is undefined but are outside the domain of $f(x)$ (like vertical asymptotes) are not critical numbers, though they still serve to partition the number line for sign analysis.
4.  **Assuming every critical number is an extremum:** Remember the case of $f(x)=x^3$ at $x=0$. $f'(0)=0$, but $f'(x)$ doesn't change sign, so it's not an extremum. Always perform the sign test.
5.  **Incorrectly identifying local max vs. local min:** A change from positive $f'(x)$ to negative $f'(x)$ means a local maximum (peak). A change from negative $f'(x)$ to positive $f'(x)$ means a local minimum (valley). Don't mix them up!
6.  **Forgetting to find the $y$-coordinate of the extrema:** Local extrema are points $(c, f(c))$. After finding the critical number $c$, always plug it back into the *original function* $f(x)$ to find the corresponding $y$-value.
7.  **Algebraic errors:** Mistakes in differentiation, factoring, or solving equations for critical numbers will cascade and lead to incorrect results. Double-check your algebra.

## 7. Textbook-precise explanation

This section provides the formal definitions and theorems as they would appear in a rigorous university-level calculus textbook.

**Definition 1: Increasing and Decreasing Functions**
Let $f$ be a function defined on an interval $I$.
1.  $f$ is **increasing** on $I$ if for any two numbers $x_1, x_2$ in $I$ with $x_1 < x_2$, we have $f(x_1) < f(x_2)$.
2.  $f$ is **decreasing** on $I$ if for any two numbers $x_1, x_2$ in $I$ with $x_1 < x_2$, we have $f(x_1) > f(x_2)$.

**Theorem 1: Test for Increasing/Decreasing Functions**
Let $f$ be a function that is continuous on the closed interval $[a, b]$ and differentiable on the open interval $(a, b)$.
1.  If $f'(x) > 0$ for all $x$ in $(a, b)$, then $f$ is increasing on $[a, b]$.
2.  If $f'(x) < 0$ for all $x$ in $(a, b)$, then $f$ is decreasing on $[a, b]$.
3.  If $f'(x) = 0$ for all $x$ in $(a, b)$, then $f$ is constant on $[a, b]$.

**Definition 2: Local Extrema**
1.  A function $f$ has a **local maximum** at $c$ if $f(c) \ge f(x)$ for all $x$ in some open interval containing $c$.
2.  A function $f$ has a **local minimum** at $c$ if $f(c) \le f(x)$ for all $x$ in some open interval containing $c$.
3.  Local maxima and local minima are collectively called **local extrema**.

**Definition 3: Critical Number (or Critical Point)**
A **critical number** of a function $f$ is a number $c$ in the domain of $f$ such that either $f'(c) = 0$ or $f'(c)$ is undefined.

**Theorem 2: Fermat's Theorem**
If $f$ has a local maximum or minimum at $c$, and if $f'(c)$ exists, then $f'(c) = 0$.
*(This theorem implies that local extrema can only occur at critical numbers, but not all critical numbers are local extrema.)*

**Theorem 3: The First Derivative Test**
Suppose $c$ is a critical number of a continuous function $f$.
1.  If $f'(x)$ changes from positive to negative at $c$, then $f$ has a local maximum at $c$.
2.  If $f'(x)$ changes from negative to positive at $c$, then $f$ has a local minimum at $c$.
3.  If $f'(x)$ does not change sign at $c$ (i.e., $f'(x)$ is positive on both sides of $c$ or negative on both sides), then $f$ has no local maximum or minimum at $c$.
    *(Note: This applies to critical numbers where $f'(c)=0$ or $f'(c)$ is undefined, provided $f$ is continuous at $c$.)*

*(References: Stewart, Calculus, Early Transcendentals, 9th ed., Chapter 4, Sections 4.3 and 4.4)*

## 8. ASCII diagrams

```text
       f(x)
       ^
       |                      Local Max (f'(x) changes + to -)
       |                     / \
       |                    /   \
       |                   /     \
       |                  /       \
       |                 /         \
       |                /           \
       |               /             \
       | f'(x) > 0    /               \ f'(x) < 0
       |             /                 \
       |            /                   \
       |-----------C1--------------------C2---------------------> x
       |   Increasing (Slope +)   |   Decreasing (Slope -)   |
       |                          |                          |
       |                          |                          |
       |                          |                          |
       |                          |                          |
       |                          |                          |
       |                          |                          |
       |                          | f'(x) < 0                | f'(x) > 0
       |                          |                           /
       |                          |                          /
       |                          |                         /
       |                          |                        /
       |                          |                       /
       |                          |                      /
       |                          |                     /
       |                          |                    /
       |                          |                   /
       |                          -------------------C3----------
       |                                             Local Min (f'(x) changes - to +)
       |
       |
       |                       Another Critical Point (No extremum)
       |                      /
       |                     /
       |                    /
       |                   /
       | f'(x) > 0        /
       |                 C4
       |                /
       |               / f'(x) > 0
       |              /
       +-------------------------------------------------------------> x
```
**Description of the Figure:**
This ASCII diagram illustrates a hypothetical function $f(x)$ and its derivative's behavior.
*   **C1 (Local Maximum):** The function is increasing to the left of C1 (where $f'(x) > 0$), flattens out at C1 (where $f'(x)=0$), and then decreases to the right of C1 (where $f'(x) < 0$). This sign change (positive to negative) indicates a local maximum.
*   **C2 (No Extremum):** The diagram shows the function decreasing immediately after C1 and continuing to decrease until C3. The point C2 is simply a point in the decreasing interval, not a critical point or extremum.
*   **C3 (Local Minimum):** The function is decreasing to the left of C3 (where $f'(x) < 0$), flattens out at C3 (where $f'(x)=0$), and then increases to the right of C3 (where $f'(x) > 0$). This sign change (negative to positive) indicates a local minimum.
*   **C4 (No Extremum, Inflection Point):** The function is increasing to the left of C4 (where $f'(x) > 0$), flattens out at C4 (where $f'(x)=0$), and then continues to increase to the right of C4 (where $f'(x) > 0$). Since $f'(x)$ does not change sign at C4, it is neither a local maximum nor a local minimum, but rather an inflection point where the concavity might change.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Imagine a car driving on the graph of $f(x)$.
    *   If the car is going **uphill**, the slope is **positive**, and the function is **increasing**. ($f'(x) > 0 \implies f(x) \uparrow$)
    *   If the car is going **downhill**, the slope is **negative**, and the function is **decreasing**. ($f'(x) < 0 \implies f(x) \downarrow$)
    *   If the car reaches the **top of a hill** (local max), it was going uphill, then momentarily flat, then goes downhill. ($f'(x): + \to 0 \to -$)
    *   If the car reaches the **bottom of a valley** (local min), it was going downhill, then momentarily flat, then goes uphill. ($f'(x): - \to 0 \to +$)
    *   If the car flattens out but keeps going in the same direction (e.g., up, then flat, then up again), it's neither a peak nor a valley. ($f'(x): + \to 0 \to +$ or $- \to 0 \to -$)
    **"The sign of the slope tells the story of the function's journey."**

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   $f'(x) > 0 \implies f(x)$ is increasing.
    *   $f'(x) < 0 \implies f(x)$ is decreasing.
    *   The First Derivative Test:
        *   $f'(x): + \to -$ at $c \implies$ local max at $c$.
        *   $f'(x): - \to +$ at $c \implies$ local min at $c$.
        *   No sign change $\implies$ no local extremum.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review this lesson, work through all examples, and attempt self-check questions.
    *   **Day 3:** Reread the "Core Idea" and "First Derivative Test" sections. Redo one medium-difficulty example from memory.
    *   **Day 7:** Redo a hard example and review the "Common Mistakes" section.
    *   **Day 16:** Explain the First Derivative Test aloud to an imaginary friend, then quickly solve a problem involving finding intervals of increase/decrease.
    *   **Day 35:** Review the "Textbook-Precise Explanation" and connect it to your intuitive understanding. Solve a problem that involves a function with a restricted domain or a discontinuity.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the rules, go back to the fundamental definition of the derivative and the concept of slope:
    *   **Definition of Derivative:** $f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$.
    *   **Slope Interpretation:** $f'(x)$ represents the slope of the tangent line to $f(x)$ at point $x$.
    *   **Geometric Intuition:**
        *   If the slope is positive ($f'(x) > 0$), then for a small $h > 0$, $f(x+h) - f(x)$ must be positive, meaning $f(x+h) > f(x)$. This means the function value is increasing as $x$ increases.
        *   If the slope is negative ($f'(x) < 0$), then for a small $h > 0$, $f(x+h) - f(x)$ must be negative, meaning $f(x+h) < f(x)$. This means the function value is decreasing as $x$ increases.
        *   If the slope is zero ($f'(x) = 0$), the tangent line is horizontal, indicating a potential turning point where the function might switch from increasing to decreasing or vice-versa.
    This fundamental connection between the sign of the derivative and the direction of the function is the bedrock upon which the First Derivative Test is built.

## 10. Connections — what this leads to

Understanding increasing/decreasing intervals and local extrema is a cornerstone of calculus and unlocks many advanced topics:

1.  **Optimization Problems:** This is the direct and most significant application. Many real-world problems (maximizing profit, minimizing cost, finding the most efficient design) boil down to finding the absolute maximum or minimum of a function, which often involves identifying local extrema.
2.  **Concavity and the Second Derivative Test:** While the First Derivative Test tells us *if* a critical point is an extremum, the Second Derivative Test helps classify it more quickly (local max or min) by looking at the concavity of the function (whether it's "cupped up" or "cupped down"). This introduces the concept of the second derivative.
3.  **Curve Sketching:** Combining information from the first derivative (increasing/decreasing, local extrema) and the second derivative (concavity, inflection points) allows for highly accurate sketching of complex function graphs.
4.  **Mean Value Theorem:** The concept of the derivative representing an instantaneous rate of change is deeply connected to the Mean Value Theorem, which states that if a function is continuous and differentiable, there's always a point where the instantaneous rate of change equals the average rate of change over an interval.
5.  **Related Rates:** While not a direct application, the mastery of differentiation rules required for finding $f'(x)$ is fundamental to solving related rates problems.
6.  **Newton's Method:** This iterative method for finding roots of functions relies on using the tangent line (derived from the first derivative) to approximate the root.
7.  **Taylor Series:** The ability to find derivatives of a function at a point is a prerequisite for constructing Taylor series, which are infinite polynomial approximations of functions.
8.  **Antiderivatives and Integration:** Understanding how $f'(x)$ relates to $f(x)$ is the inverse process of integration. If we know the rate of change, we can reconstruct the original function.

## 11. Self-check questions

1.  Find the intervals where $f(x) = x^4 - 4x^3$ is increasing or decreasing, and identify all local extrema.
2.  Determine the intervals of increase and decrease for $g(x) = \frac{x-1}{x^2+1}$.
3.  Locate the local extrema of $h(x) = x^{2/3}(x-5)$ on its domain.
4.  Consider the function $k(x) = e^x \cos x$ on the interval $[0, 2\pi]$. Find the intervals of increase/decrease and any local extrema.
5.  Suppose $f(x)$ is a continuous function and its derivative is given by $f'(x) = \frac{(x+2)^2 (x-1)}{(x+5)}$. Find the intervals where $f(x)$ is increasing or decreasing and classify all local extrema.