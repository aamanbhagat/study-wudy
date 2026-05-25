## 1. What it is — in plain English

Imagine you have a secret recipe, but instead of ingredients, it's a mathematical rule that tells you how to get an output number for any input number. This rule is called a "function." Curve sketching is simply the art of drawing a picture of that function. It's like being a detective trying to draw a suspect's face based on a series of clues.

Instead of just plotting a few points and connecting the dots (which can be very misleading!), we use powerful mathematical tools from calculus to uncover all the important features of the function's graph. These features include where it crosses the axes, where it goes up or down, where it bends, and whether it approaches certain lines forever.

The goal isn't just to make a pretty drawing, but to *understand* the complete behavior of the function visually. It allows us to see its "personality" — where it's happy (increasing), where it's sad (decreasing), where it's turning a corner, or where it's completely breaking apart.

By systematically gathering and interpreting these clues, we can create a highly accurate and informative visual representation of even the most complex mathematical relationships. It transforms abstract equations into concrete pictures.

## 2. Why it matters — real-world applications

Understanding the shape and behavior of functions through curve sketching is not just an academic exercise; it's a fundamental skill with wide-ranging applications across science, engineering, and technology.

1.  **Aerospace Engineering (Trajectory Optimization):** When designing the flight path for a rocket, drone, or aircraft, engineers use functions to model its position, velocity, and acceleration over time. Curve sketching helps visualize these functions to ensure the trajectory avoids obstacles, minimizes fuel consumption (by finding optimal points on cost functions), or maximizes payload delivery. For instance, the lift-to-drag ratio curve for an aircraft wing is crucial; sketching it helps identify the angle of attack that maximizes efficiency, a critical factor for companies like Boeing or SpaceX in designing their vehicles.

2.  **Machine Learning (Loss Function Visualization):** In machine learning, algorithms learn by minimizing a "loss function," which measures how far off a model's predictions are from the actual values. These loss functions can be complex, often existing in high-dimensional spaces. While direct sketching in many dimensions isn't possible, understanding the principles of curve sketching in 2D and 3D helps data scientists visualize optimization landscapes. This allows them to identify local minima, saddle points, and the overall "shape" of the error surface, guiding the choice of optimization algorithms (e.g., gradient descent) used by companies like Google (for search algorithms) or NVIDIA (for AI hardware).

3.  **Physics and Mechanical Engineering (Stress-Strain Analysis):** When materials are subjected to forces, they deform. The relationship between stress (force per unit area) and strain (relative deformation) is described by a stress-strain curve. Engineers at companies like Siemens or General Electric sketch these curves to understand a material's elastic limit, yield strength, and ultimate tensile strength. This is vital for designing structures (bridges, buildings) and components (engine parts, medical implants) that can withstand expected loads without failing, ensuring safety and durability.

4.  **Economics and Business (Profit Maximization):** Businesses often model their costs, revenues, and profits as functions of the quantity of goods produced or sold. By sketching the profit function (Revenue - Cost), economists and business analysts can visually identify the production level that yields maximum profit. Similarly, supply and demand curves are fundamental to understanding market equilibrium. Curve sketching provides an intuitive way to see how changes in price affect quantity demanded and supplied, informing pricing strategies and production decisions for virtually any company.

## 3. Prerequisites — what you must know first

Before diving into the systematic approach to curve sketching, ensure you have a solid grasp of the following foundational concepts. Each is a building block, and skipping one will make the subsequent steps significantly harder.

*   **Functions:** Understanding what a function is, its notation ($f(x)$), and how to evaluate it for specific input values.
*   **Domain and Range:** Knowing how to determine the set of all possible input values (domain) and output values (range) for a given function, especially for rational functions and functions involving square roots.
*   **Algebraic Manipulation:** Proficiency in solving equations ($f(x)=0$), solving inequalities ($f(x)>0$), factoring polynomials, and performing polynomial long division.
*   **Precalculus Graphing:** Familiarity with the basic shapes of common functions (linear, quadratic, cubic, rational, exponential, logarithmic, trigonometric) and how transformations (shifts, stretches, reflections) affect their graphs.
*   **Limits:** The concept of a limit, how to evaluate limits (including one-sided limits), and understanding limits involving infinity (infinite limits and limits at infinity). This is crucial for identifying asymptotes.
*   **Continuity:** What it means for a function to be continuous at a point and on an interval, and how to identify different types of discontinuities (removable, jump, infinite).
*   **Derivatives:** The definition of a derivative, the rules of differentiation (power rule, product rule, quotient rule, chain rule), and how to calculate first and second derivatives of various functions.
*   **Critical Numbers:** How to find critical numbers of a function, which are points where the first derivative is zero or undefined. These are candidates for local maxima or minima.
*   **Extreme Values:** Understanding local (relative) maxima and minima, and how to use the First Derivative Test to classify them.
*   **Concavity:** The concept of concavity (concave up vs. concave down) and its relationship to the second derivative.
*   **Inflection Points:** How to identify inflection points, which are points where the concavity of the graph changes.

## 4. The core idea — step by step

Curve sketching is a systematic process that uses calculus to extract crucial information about a function's behavior and then synthesize that information into an accurate graph. Here's a detailed, step-by-step guide.

### Step 1: Domain, Intercepts, and Symmetry

This initial step helps you understand the fundamental boundaries and basic structure of your function.

*   **Plain English Statement:** Before drawing anything, we need to know where the function exists (its boundaries), where it crosses the horizontal and vertical lines (the axes), and if it has any mirror-like qualities that can save us work.

*   **Small Concrete Example:** Let's consider the function $f(x) = \frac{x^2 - 1}{x}$.

    *   **Domain:** The denominator cannot be zero, so $x \neq 0$. The domain is $(-\infty, 0) \cup (0, \infty)$. This immediately tells us there might be a vertical asymptote at $x=0$.
    *   **$x$-intercepts:** Set $f(x)=0$: $\frac{x^2 - 1}{x} = 0 \implies x^2 - 1 = 0 \implies (x-1)(x+1) = 0$. So, $x=1$ and $x=-1$. The $x$-intercepts are $(1,0)$ and $(-1,0)$.
    *   **$y$-intercept:** Set $x=0$: $f(0) = \frac{0^2 - 1}{0}$, which is undefined. This confirms there is no $y$-intercept, consistent with $x=0$ being excluded from the domain.
    *   **Symmetry:**
        *   Even: Is $f(-x) = f(x)$? $f(-x) = \frac{(-x)^2 - 1}{-x} = \frac{x^2 - 1}{-x} = -f(x)$. No, it's not even.
        *   Odd: Is $f(-x) = -f(x)$? Yes, $f(-x) = -f(x)$. So, the function has origin symmetry. This means if we rotate the graph 180 degrees around the origin, it looks the same.

*   **Formal/Mathematical Version:**
    1.  **Domain:** Determine all values of $x$ for which $f(x)$ is defined. Pay close attention to denominators (cannot be zero) and even roots (argument must be non-negative).
    2.  **$x$-intercepts:** Solve the equation $f(x) = 0$. These are the points $(x_0, 0)$ where the graph crosses the $x$-axis.
    3.  **$y$-intercept:** Evaluate $f(0)$. This is the point $(0, y_0)$ where the graph crosses the $y$-axis (if $0$ is in the domain).
    4.  **Symmetry:**
        *   **Even function:** If $f(-x) = f(x)$ for all $x$ in the domain, the graph is symmetric about the $y$-axis.
        *   **Odd function:** If $f(-x) = -f(x)$ for all $x$ in the domain, the graph is symmetric about the origin.

*   **What Could Go Wrong:** Forgetting to check domain restrictions, especially for rational functions or functions with square roots. Incorrectly calculating intercepts due to algebraic errors. Misapplying symmetry tests.

### Step 2: Asymptotes

Asymptotes are imaginary lines that the function's graph approaches but never quite touches (or sometimes crosses for horizontal/slant asymptotes). They reveal the function's behavior at the edges of its domain or as $x$ approaches infinity.

*   **Plain English Statement:** We look for invisible lines that the graph gets closer and closer to, either as $x$ gets very big or very small, or as $x$ approaches a specific problematic value. These lines act like guiding rails for our drawing.

*   **Small Concrete Example:** Continuing with $f(x) = \frac{x^2 - 1}{x}$.

    *   **Vertical Asymptotes (VA):** We identified $x=0$ as a point where the denominator is zero and the numerator is non-zero. Let's check the limits:
        $$ \lim_{x \to 0^+} \frac{x^2 - 1}{x} = \frac{-1}{0^+} = -\infty $$
        $$ \lim_{x \to 0^-} \frac{x^2 - 1}{x} = \frac{-1}{0^-} = +\infty $$
        Since these limits are infinite, there is a vertical asymptote at $x=0$.
    *   **Horizontal Asymptotes (HA):** We check limits as $x \to \pm\infty$:
        $$ \lim_{x \to \infty} \frac{x^2 - 1}{x} = \lim_{x \to \infty} \left(x - \frac{1}{x}\right) = \infty - 0 = \infty $$
        $$ \lim_{x \to -\infty} \frac{x^2 - 1}{x} = \lim_{x \to -\infty} \left(x - \frac{1}{x}\right) = -\infty - 0 = -\infty $$
        Since these limits are not finite numbers, there is no horizontal asymptote.
    *   **Slant Asymptotes (SA):** For rational functions where the degree of the numerator is exactly one greater than the degree of the denominator, we perform polynomial long division.
        $$ \frac{x^2 - 1}{x} = x - \frac{1}{x} $$
        As $x \to \pm\infty$, the term $-\frac{1}{x} \to 0$. So, the function approaches the line $y=x$. Thus, $y=x$ is a slant asymptote.

*   **Formal/Mathematical Version:**
    1.  **Vertical Asymptotes (VA):** If $\lim_{x \to a^+} f(x) = \pm\infty$ or $\lim_{x \to a^-} f(x) = \pm\infty$ for some finite number $a$, then the line $x=a$ is a vertical asymptote. These usually occur where the denominator of a rational function is zero and the numerator is non-zero. (If both are zero, there might be a hole instead).
    2.  **Horizontal Asymptotes (HA):** If $\lim_{x \to \infty} f(x) = L$ or $\lim_{x \to -\infty} f(x) = L$ for some finite number $L$, then the line $y=L$ is a horizontal asymptote.
    3.  **Slant (Oblique) Asymptotes (SA):** If $\lim_{x \to \pm\infty} [f(x) - (mx+b)] = 0$ for some line $y=mx+b$, then $y=mx+b$ is a slant asymptote. For rational functions $f(x) = P(x)/Q(x)$ where the degree of $P(x)$ is one greater than the degree of $Q(x)$, perform polynomial long division to write $f(x) = (mx+b) + \frac{R(x)}{Q(x)}$. The slant asymptote is $y=mx+b$.

*   **What Could Go Wrong:** Confusing a removable discontinuity (a hole) with a vertical asymptote. Incorrectly evaluating limits at infinity. Forgetting to check for slant asymptotes when appropriate.

### Step 3: First Derivative Test (Increasing/Decreasing, Local Extrema)

The first derivative tells us about the slope of the tangent line to the curve. This information is critical for identifying where the function is rising or falling and where it reaches its peaks and valleys.

*   **Plain English Statement:** We calculate the "slope function" ($f'(x)$) to see where the original graph is going uphill (positive slope), downhill (negative slope), or momentarily flat (zero slope, indicating a potential peak or valley).

*   **Small Concrete Example:** Let's analyze $f(x) = x^3 - 3x^2 + 2$.

    *   **First Derivative:** $f'(x) = 3x^2 - 6x$.
    *   **Critical Numbers:** Set $f'(x)=0$: $3x^2 - 6x = 0 \implies 3x(x-2) = 0$. So, $x=0$ and $x=2$ are critical numbers. (Also check where $f'(x)$ is undefined, but for polynomials, it's always defined).
    *   **Intervals of Increase/Decrease:** We use the critical numbers to divide the number line into test intervals: $(-\infty, 0)$, $(0, 2)$, $(2, \infty)$.
        *   Test $x=-1$ in $(-\infty, 0)$: $f'(-1) = 3(-1)^2 - 6(-1) = 3+6 = 9 > 0$. So, $f$ is increasing on $(-\infty, 0)$.
        *   Test $x=1$ in $(0, 2)$: $f'(1) = 3(1)^2 - 6(1) = 3-6 = -3 < 0$. So, $f$ is decreasing on $(0, 2)$.
        *   Test $x=3$ in $(2, \infty)$: $f'(3) = 3(3)^2 - 6(3) = 27-18 = 9 > 0$. So, $f$ is increasing on $(2, \infty)$.
    *   **Local Extrema (using First Derivative Test):**
        *   At $x=0$: $f'(x)$ changes from positive to negative. This means a local maximum occurs at $x=0$. $f(0) = 0^3 - 3(0)^2 + 2 = 2$. Local max at $(0, 2)$.
        *   At $x=2$: $f'(x)$ changes from negative to positive. This means a local minimum occurs at $x=2$. $f(2) = 2^3 - 3(2)^2 + 2 = 8 - 12 + 2 = -2$. Local min at $(2, -2)$.

*   **Formal/Mathematical Version:**
    1.  **Calculate $f'(x)$:** Find the first derivative of the function.
    2.  **Find Critical Numbers:** Determine all values of $x$ in the domain of $f$ where $f'(x) = 0$ or $f'(x)$ is undefined.
    3.  **Sign Chart for $f'(x)$:** Use the critical numbers to divide the number line into intervals. Pick a test value within each interval and evaluate $f'(x)$ at that point.
        *   If $f'(x) > 0$ on an interval, $f(x)$ is increasing on that interval.
        *   If $f'(x) < 0$ on an interval, $f(x)$ is decreasing on that interval.
    4.  **First Derivative Test for Local Extrema:**
        *   If $f'(x)$ changes from positive to negative at a critical number $c$, then $f(c)$ is a local maximum.
        *   If $f'(x)$ changes from negative to positive at a critical number $c$, then $f(c)$ is a local minimum.
        *   If $f'(x)$ does not change sign at $c$, then $f(c)$ is neither a local maximum nor a local minimum.

*   **What Could Go Wrong:** Algebraic errors in calculating $f'(x)$. Forgetting to check where $f'(x)$ is undefined (e.g., for functions with absolute values or fractional exponents). Incorrectly interpreting the sign changes of $f'(x)$.

### Step 4: Second Derivative Test (Concavity, Inflection Points)

The second derivative tells us about the *rate of change of the slope*, which dictates the curve's concavity – whether it's bending upwards like a cup or downwards like a frown.

*   **Plain English Statement:** We calculate the "slope of the slope" function ($f''(x)$) to see where the graph is curving upwards (like a smile) or curving downwards (like a frown). Points where the curvature changes are special; they're called inflection points.

*   **Small Concrete Example:** Continuing with $f(x) = x^3 - 3x^2 + 2$.

    *   **Second Derivative:** $f'(x) = 3x^2 - 6x$, so $f''(x) = 6x - 6$.
    *   **Possible Inflection Points:** Set $f''(x)=0$: $6x - 6 = 0 \implies 6x = 6 \implies x=1$. (Also check where $f''(x)$ is undefined, but for polynomials, it's always defined).
    *   **Intervals of Concavity:** We use $x=1$ to divide the number line: $(-\infty, 1)$, $(1, \infty)$.
        *   Test $x=0$ in $(-\infty, 1)$: $f''(0) = 6(0) - 6 = -6 < 0$. So, $f$ is concave down on $(-\infty, 1)$.
        *   Test $x=2$ in $(1, \infty)$: $f''(2) = 6(2) - 6 = 12 - 6 = 6 > 0$. So, $f$ is concave up on $(1, \infty)$.
    *   **Inflection Points:** At $x=1$, $f''(x)$ changes sign. This means there is an inflection point at $x=1$. $f(1) = 1^3 - 3(1)^2 + 2 = 1 - 3 + 2 = 0$. Inflection point at $(1, 0)$.
    *   **Second Derivative Test for Local Extrema (optional check):**
        *   At $x=0$ (critical number): $f''(0) = -6 < 0$. Since $f''(0)$ is negative, there's a local maximum at $x=0$. (Matches First Derivative Test).
        *   At $x=2$ (critical number): $f''(2) = 6 > 0$. Since $f''(2)$ is positive, there's a local minimum at $x=2$. (Matches First Derivative Test).

*   **Formal/Mathematical Version:**
    1.  **Calculate $f''(x)$:** Find the second derivative of the function.
    2.  **Find Possible Inflection Points:** Determine all values of $x$ in the domain of $f$ where $f''(x) = 0$ or $f''(x)$ is undefined.
    3.  **Sign Chart for $f''(x)$:** Use these points to divide the number line into intervals. Pick a test value within each interval and evaluate $f''(x)$ at that point.
        *   If $f''(x) > 0$ on an interval, $f(x)$ is concave up on that interval.
        *   If $f''(x) < 0$ on an interval, $f(x)$ is concave down on that interval.
    4.  **Inflection Points:** An inflection point occurs where $f''(x)$ changes sign (and $f(x)$ is defined at that point).
    5.  **Second Derivative Test for Local Extrema (Alternative to First Derivative Test):** If $c$ is a critical number where $f'(c)=0$:
        *   If $f''(c) > 0$, then $f(c)$ is a local minimum.
        *   If $f''(c) < 0$, then $f(c)$ is a local maximum.
        *   If $f''(c) = 0$ or $f''(c)$ is undefined, the test is inconclusive, and you must use the First Derivative Test.

*   **What Could Go Wrong:** Algebraic errors in calculating $f''(x)$. Assuming a point where $f''(x)=0$ is automatically an inflection point without checking for a concavity change. Confusing the roles of $f'(x)$ and $f''(x)$.

### Step 5: Plotting Points and Sketching the Graph

This is where all the pieces come together to form the complete picture.

*   **Plain English Statement:** Now that we have all our clues (intercepts, asymptotes, local peaks/valleys, and curvature changes), we plot the key points on a graph, draw any invisible guiding lines (asymptotes), and then connect the dots, making sure our curve follows all the rules we discovered about increasing/decreasing and concavity.

*   **Small Concrete Example:** Combining all the information for $f(x) = x^3 - 3x^2 + 2$:
    *   **From Step 1:**
        *   Domain: $(-\infty, \infty)$
        *   $x$-intercepts: $f(x)=0 \implies x^3 - 3x^2 + 2 = 0$. (This is hard to solve by hand easily, but we know $x=1$ is an inflection point and $f(1)=0$, so $(1,0)$ is an $x$-intercept. We could use synthetic division to find other roots, $x \approx -0.732, 2.732$).
        *   $y$-intercept: $(0, 2)$
        *   Symmetry: None.
    *   **From Step 2:** No asymptotes for a polynomial.
    *   **From Step 3:**
        *   Increasing on $(-\infty, 0)$ and $(2, \infty)$.
        *   Decreasing on $(0, 2)$.
        *   Local maximum at $(0, 2)$.
        *   Local minimum at $(2, -2)$.
    *   **From Step 4:**
        *   Concave down on $(-\infty, 1)$.
        *   Concave up on $(1, \infty)$.
        *   Inflection point at $(1, 0)$.

    **Plotting:**
    1.  Plot the $y$-intercept $(0,2)$. This is also a local maximum.
    2.  Plot the local minimum $(2,-2)$.
    3.  Plot the inflection point $(1,0)$. This is also an $x$-intercept.
    4.  Consider the intervals:
        *   $(-\infty, 0)$: Increasing and concave down. Starting from very low on the left, rising towards $(0,2)$ while curving downwards.
        *   $(0, 1)$: Decreasing and concave down. From $(0,2)$, falling towards $(1,0)$ while still curving downwards.
        *   $(1, 2)$: Decreasing and concave up. From $(1,0)$, falling towards $(2,-2)$ but now curving upwards.
        *   $(2, \infty)$: Increasing and concave up. From $(2,-2)$, rising forever while curving upwards.

    Connecting these points and following the concavity and increasing/decreasing rules gives a clear sketch.

*   **Formal/Mathematical Version:**
    1.  **Plot Key Points:** Mark all intercepts, local extrema, and inflection points on your coordinate plane.
    2.  **Draw Asymptotes:** Lightly sketch any vertical, horizontal, or slant asymptotes as dashed lines.
    3.  **Use Intervals:** Refer to your sign charts for $f'(x)$ and $f''(x)$ to guide the curve's behavior in each interval.
        *   If increasing and concave up: Curve goes up and bends like a smile.
        *   If increasing and concave down: Curve goes up and bends like a frown.
        *   If decreasing and concave up: Curve goes down and bends like a smile.
        *   If decreasing and concave down: Curve goes down and bends like a frown.
    4.  **Connect the Dots:** Draw a smooth curve that passes through the plotted points, approaches the asymptotes correctly, and adheres to the determined increasing/decreasing and concavity behavior in each interval.

*   **What Could Go Wrong:** Drawing a curve that contradicts the analytical findings (e.g., drawing it concave up where it should be concave down). Not smoothly transitioning through inflection points. Ignoring asymptote behavior.

## 5. Worked examples — multiple, with every step shown

Here are several fully worked examples, demonstrating the systematic approach from easy to more challenging functions.

### Example 1: Easy Polynomial Function

**Problem:** Sketch the graph of $f(x) = x^4 - 4x^3$.

**Given:** The function $f(x) = x^4 - 4x^3$.
**We want:** A detailed sketch of its graph.

---

**### Step 1: Domain, Intercepts, and Symmetry**

1.  **Domain:**
    *   **Explanation:** Since $f(x)$ is a polynomial, it is defined for all real numbers.
    *   **Result:** Domain is $(-\infty, \infty)$.

2.  **$x$-intercepts:**
    *   **Explanation:** Set $f(x)=0$ and solve for $x$. Factor the polynomial to find the roots.
    *   $$ x^4 - 4x^3 = 0 $$
    *   $$ x^3(x - 4) = 0 $$
    *   $$ x^3 = 0 \quad \text{or} \quad x - 4 = 0 $$
    *   $$ x = 0 \quad \text{or} \quad x = 4 $$
    *   **Result:** The $x$-intercepts are $(0, 0)$ and $(4, 0)$.

3.  **$y$-intercept:**
    *   **Explanation:** Set $x=0$ and evaluate $f(0)$.
    *   $$ f(0) = (0)^4 - 4(0)^3 = 0 - 0 = 0 $$
    *   **Result:** The $y$-intercept is $(0, 0)$. (This is also an $x$-intercept).

4.  **Symmetry:**
    *   **Explanation:** Check if $f(-x) = f(x)$ (even) or $f(-x) = -f(x)$ (odd).
    *   $$ f(-x) = (-x)^4 - 4(-x)^3 = x^4 - 4(-x^3) = x^4 + 4x^3 $$
    *   Since $f(-x) \neq f(x)$ and $f(-x) \neq -f(x)$, there is no $y$-axis or origin symmetry.
    *   **Result:** No symmetry.

**### Step 2: Asymptotes**

1.  **Vertical Asymptotes:**
    *   **Explanation:** Polynomials do not have vertical asymptotes because their domain is all real numbers, and there are no points where the function approaches infinity.
    *   **Result:** None.

2.  **Horizontal Asymptotes:**
    *   **Explanation:** For polynomials, we check the limit as $x \to \pm\infty$.
    *   $$ \lim_{x \to \infty} (x^4 - 4x^3) = \lim_{x \to \infty} x^4(1 - \frac{4}{x}) = \infty(1 - 0) = \infty $$
    *   $$ \lim_{x \to -\infty} (x^4 - 4x^3) = \lim_{x \to -\infty} x^4(1 - \frac{4}{x}) = \infty(1 - 0) = \infty $$
    *   Since the limits are not finite numbers, there are no horizontal asymptotes.
    *   **Result:** None.

3.  **Slant Asymptotes:**
    *   **Explanation:** Polynomials do not have slant asymptotes. Slant asymptotes occur typically for rational functions where the numerator's degree is one greater than the denominator's.
    *   **Result:** None.

**### Step 3: First Derivative Test (Increasing/Decreasing, Local Extrema)**

1.  **Calculate $f'(x)$:**
    *   **Explanation:** Use the power rule for differentiation.
    *   $$ f(x) = x^4 - 4x^3 $$
    *   $$ f'(x) = 4x^3 - 12x^2 $$

2.  **Find Critical Numbers:**
    *   **Explanation:** Set $f'(x)=0$ and solve for $x$. $f'(x)$ is a polynomial, so it's always defined.
    *   $$ 4x^3 - 12x^2 = 0 $$
    *   $$ 4x^2(x - 3) = 0 $$
    *   $$ 4x^2 = 0 \quad \text{or} \quad x - 3 = 0 $$
    *   $$ x = 0 \quad \text{or} \quad x = 3 $$
    *   **Result:** Critical numbers are $x=0$ and $x=3$.

3.  **Sign Chart for $f'(x)$:**
    *   **Explanation:** Use the critical numbers to divide the number line into intervals and test a value in each interval to determine the sign of $f'(x)$.
    *   Intervals: $(-\infty, 0)$, $(0, 3)$, $(3, \infty)$.
        *   Test $x=-1$ (in $(-\infty, 0)$): $f'(-1) = 4(-1)^2(-1-3) = 4(1)(-4) = -16 < 0$.
        *   Test $x=1$ (in $(0, 3)$): $f'(1) = 4(1)^2(1-3) = 4(1)(-2) = -8 < 0$.
        *   Test $x=4$ (in $(3, \infty)$): $f'(4) = 4(4)^2(4-3) = 4(16)(1) = 64 > 0$.
    *   **Result:**
        *   $f(x)$ is decreasing on $(-\infty, 0)$ and $(0, 3)$.
        *   $f(x)$ is increasing on $(3, \infty)$.

4.  **Local Extrema (First Derivative Test):**
    *   **Explanation:** Observe sign changes in $f'(x)$ at critical numbers.
    *   At $x=0$: $f'(x)$ does not change sign (it's negative on both sides of 0).
    *   At $x=3$: $f'(x)$ changes from negative to positive.
    *   **Result:**
        *   No local extremum at $x=0$.
        *   Local minimum at $x=3$. Calculate $f(3) = (3)^4 - 4(3)^3 = 81 - 4(27) = 81 - 108 = -27$.
        *   Local minimum at $(3, -27)$.

**### Step 4: Second Derivative Test (Concavity, Inflection Points)**

1.  **Calculate $f''(x)$:**
    *   **Explanation:** Differentiate $f'(x)$.
    *   $$ f'(x) = 4x^3 - 12x^2 $$
    *   $$ f''(x) = 12x^2 - 24x $$

2.  **Find Possible Inflection Points:**
    *   **Explanation:** Set $f''(x)=0$ and solve for $x$. $f''(x)$ is a polynomial, so it's always defined.
    *   $$ 12x^2 - 24x = 0 $$
    *   $$ 12x(x - 2) = 0 $$
    *   $$ 12x = 0 \quad \text{or} \quad x - 2 = 0 $$
    *   $$ x = 0 \quad \text{or} \quad x = 2 $$
    *   **Result:** Possible inflection points at $x=0$ and $x=2$.

3.  **Sign Chart for $f''(x)$:**
    *   **Explanation:** Use these points to divide the number line into intervals and test a value in each interval to determine the sign of $f''(x)$.
    *   Intervals: $(-\infty, 0)$, $(0, 2)$, $(2, \infty)$.
        *   Test $x=-1$ (in $(-\infty, 0)$): $f''(-1) = 12(-1)^2 - 24(-1) = 12 + 24 = 36 > 0$.
        *   Test $x=1$ (in $(0, 2)$): $f''(1) = 12(1)^2 - 24(1) = 12 - 24 = -12 < 0$.
        *   Test $x=3$ (in $(2, \infty)$): $f''(3) = 12(3)^2 - 24(3) = 12(9) - 72 = 108 - 72 = 36 > 0$.
    *   **Result:**
        *   $f(x)$ is concave up on $(-\infty, 0)$ and $(2, \infty)$.
        *   $f(x)$ is concave down on $(0, 2)$.

4.  **Inflection Points:**
    *   **Explanation:** An inflection point occurs where $f''(x)$ changes sign.
    *   At $x=0$: $f''(x)$ changes from positive to negative. Calculate $f(0) = 0$.
    *   At $x=2$: $f''(x)$ changes from negative to positive. Calculate $f(2) = (2)^4 - 4(2)^3 = 16 - 4(8) = 16 - 32 = -16$.
    *   **Result:** Inflection points at $(0, 0)$ and $(2, -16)$.

**### Step 5: Plotting Points and Sketching the Graph**

1.  **Plot Key Points:**
    *   $x$-intercepts: $(0,0), (4,0)$
    *   $y$-intercept: $(0,0)$
    *   Local minimum: $(3, -27)$
    *   Inflection points: $(0,0), (2, -16)$

2.  **Draw Asymptotes:** None.

3.  **Combine Information:**
    *   **$(-\infty, 0)$:** Decreasing, Concave Up. Starts high, curves like a smile, goes down to $(0,0)$.
    *   **$(0, 2)$:** Decreasing, Concave Down. From $(0,0)$, curves like a frown, goes down to $(2,-16)$.
    *   **$(2, 3)$:** Decreasing, Concave Up. From $(2,-16)$, curves like a smile, goes down to $(3,-27)$.
    *   **$(3, \infty)$:** Increasing, Concave Up. From $(3,-27)$, curves like a smile, goes up through $(4,0)$ and beyond.

    The point $(0,0)$ is an $x$-intercept, $y$-intercept, and an inflection point. The graph is decreasing and concave up until $(0,0)$, then it continues decreasing but changes to concave down, passing through $(0,0)$ smoothly. This is a horizontal tangent at $(0,0)$ which is also an inflection point.

---

**Final Sketch Description:**
The graph starts from the upper left, decreasing and concave up, passing through the origin $(0,0)$ (which is a horizontal tangent and an inflection point). After the origin, it continues to decrease but becomes concave down, reaching the point $(2,-16)$ (another inflection point). From $(2,-16)$, it continues to decrease but changes to concave up, reaching its lowest point, the local minimum, at $(3,-27)$. Finally, it increases from $(3,-27)$ onwards, remaining concave up, passing through the $x$-intercept $(4,0)$ and extending upwards indefinitely.

---

**Reflection:** This example was tricky at $x=0$. It's a critical number where $f'(x)=0$, but not a local extremum. Instead, it's an inflection point with a horizontal tangent. This highlights that $f'(c)=0$ does not guarantee a local extremum, and $f''(c)=0$ does not guarantee an inflection point *unless* concavity changes.

---

### Example 2: Rational Function with Vertical and Horizontal Asymptotes

**Problem:** Sketch the graph of $f(x) = \frac{x-1}{x+2}$.

**Given:** The function $f(x) = \frac{x-1}{x+2}$.
**We want:** A detailed sketch of its graph.

---

**### Step 1: Domain, Intercepts, and Symmetry**

1.  **Domain:**
    *   **Explanation:** The denominator cannot be zero.
    *   $$ x+2 \neq 0 \implies x \neq -2 $$
    *   **Result:** Domain is $(-\infty, -2) \cup (-2, \infty)$.

2.  **$x$-intercepts:**
    *   **Explanation:** Set the numerator to zero.
    *   $$ x-1 = 0 \implies x = 1 $$
    *   **Result:** The $x$-intercept is $(1, 0)$.

3.  **$y$-intercept:**
    *   **Explanation:** Set $x=0$ and evaluate $f(0)$.
    *   $$ f(0) = \frac{0-1}{0+2} = \frac{-1}{2} = -\frac{1}{2} $$
    *   **Result:** The $y$-intercept is $(0, -1/2)$.

4.  **Symmetry:**
    *   **Explanation:** Check $f(-x)$.
    *   $$ f(-x) = \frac{(-x)-1}{(-x)+2} = \frac{-x-1}{-x+2} $$
    *   This is not equal to $f(x)$ or $-f(x)$.
    *   **Result:** No symmetry.

**### Step 2: Asymptotes**

1.  **Vertical Asymptotes (VA):**
    *   **Explanation:** The denominator is zero at $x=-2$, and the numerator is non-zero ($(-2)-1 = -3$). We check the limits.
    *   $$ \lim_{x \to -2^+} \frac{x-1}{x+2} = \frac{-3}{0^+} = -\infty $$
    *   $$ \lim_{x \to -2^-} \frac{x-1}{x+2} = \frac{-3}{0^-} = +\infty $$
    *   **Result:** Vertical asymptote at $x=-2$.

2.  **Horizontal Asymptotes (HA):**
    *   **Explanation:** Compare degrees of numerator and denominator. They are equal (degree 1). The HA is the ratio of leading coefficients.
    *   $$ \lim_{x \to \infty} \frac{x-1}{x+2} = \lim_{x \to \infty} \frac{x(1 - 1/x)}{x(1 + 2/x)} = \lim_{x \to \infty} \frac{1 - 1/x}{1 + 2/x} = \frac{1-0}{1+0} = 1 $$
    *   $$ \lim_{x \to -\infty} \frac{x-1}{x+2} = 1 $$
    *   **Result:** Horizontal asymptote at $y=1$.

3.  **Slant Asymptotes (SA):**
    *   **Explanation:** The degree of the numerator is not one greater than the denominator.
    *   **Result:** None.

**### Step 3: First Derivative Test (Increasing/Decreasing, Local Extrema)**

1.  **Calculate $f'(x)$:**
    *   **Explanation:** Use the quotient rule: $\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$. Here $u=x-1, v=x+2$. So $u'=1, v'=1$.
    *   $$ f'(x) = \frac{(1)(x+2) - (x-1)(1)}{(x+2)^2} = \frac{x+2 - x+1}{(x+2)^2} = \frac{3}{(x+2)^2} $$

2.  **Find Critical Numbers:**
    *   **Explanation:** Set $f'(x)=0$ or find where $f'(x)$ is undefined.
    *   $f'(x) = \frac{3}{(x+2)^2}$ is never zero (numerator is 3).
    *   $f'(x)$ is undefined at $x=-2$. However, $x=-2$ is not in the domain of $f(x)$, so it's not a critical number.
    *   **Result:** No critical numbers.

3.  **Sign Chart for $f'(x)$:**
    *   **Explanation:** Since there are no critical numbers, we only use the point where $f(x)$ is undefined ($x=-2$) to divide the number line.
    *   Intervals: $(-\infty, -2)$, $(-2, \infty)$.
        *   Test $x=-3$ (in $(-\infty, -2)$): $f'(-3) = \frac{3}{(-3+2)^2} = \frac{3}{(-1)^2} = 3 > 0$.
        *   Test $x=0$ (in $(-2, \infty)$): $f'(0) = \frac{3}{(0+2)^2} = \frac{3}{4} > 0$.
    *   **Result:**
        *   $f(x)$ is increasing on $(-\infty, -2)$ and $(-2, \infty)$.

4.  **Local Extrema:**
    *   **Explanation:** Since $f'(x)$ never changes sign, there are no local extrema.
    *   **Result:** None.

**### Step 4: Second Derivative Test (Concavity, Inflection Points)**

1.  **Calculate $f''(x)$:**
    *   **Explanation:** Differentiate $f'(x) = 3(x+2)^{-2}$. Use the chain rule.
    *   $$ f''(x) = 3(-2)(x+2)^{-3}(1) = \frac{-6}{(x+2)^3} $$

2.  **Find Possible Inflection Points:**
    *   **Explanation:** Set $f''(x)=0$ or find where $f''(x)$ is undefined.
    *   $f''(x)$ is never zero (numerator is -6).
    *   $f''(x)$ is undefined at $x=-2$. Again, $x=-2$ is not in the domain of $f(x)$.
    *   **Result:** No possible inflection points in the domain.

3.  **Sign Chart for $f''(x)$:**
    *   **Explanation:** Use $x=-2$ to divide the number line.
    *   Intervals: $(-\infty, -2)$, $(-2, \infty)$.
        *   Test $x=-3$ (in $(-\infty, -2)$): $f''(-3) = \frac{-6}{(-3+2)^3} = \frac{-6}{(-1)^3} = \frac{-6}{-1} = 6 > 0$.
        *   Test $x=0$ (in $(-2, \infty)$): $f''(0) = \frac{-6}{(0+2)^3} = \frac{-6}{8} = -\frac{3}{4} < 0$.
    *   **Result:**
        *   $f(x)$ is concave up on $(-\infty, -2)$.
        *   $f(x)$ is concave down on $(-2, \infty)$.

4.  **Inflection Points:**
    *   **Explanation:** Although concavity changes at $x=-2$, $f(x)$ is not defined at $x=-2$. Therefore, it is not an inflection point.
    *   **Result:** None.

**### Step 5: Plotting Points and Sketching the Graph**

1.  **Plot Key Points:**
    *   $x$-intercept: $(1,0)$
    *   $y$-intercept: $(0, -1/2)$

2.  **Draw Asymptotes:**
    *   Vertical asymptote: $x=-2$ (dashed line)
    *   Horizontal asymptote: $y=1$ (dashed line)

3.  **Combine Information:**
    *   **Left of VA ($x < -2$):** Increasing, Concave Up. Approaches $y=1$ from below as $x \to -\infty$. Approaches $x=-2$ (VA) from the left, going to $+\infty$.
    *   **Right of VA ($x > -2$):** Increasing, Concave Down. Approaches $x=-2$ (VA) from the right, going to $-\infty$. Passes through $(0, -1/2)$ and $(1,0)$. Approaches $y=1$ from below as $x \to \infty$.

---

**Final Sketch Description:**
The graph has a vertical asymptote at $x=-2$ and a horizontal asymptote at $y=1$. To the left of $x=-2$, the function is increasing and concave up, rising from the horizontal asymptote $y=1$ (as $x \to -\infty$) towards $+\infty$ as $x \to -2^-$. To the right of $x=-2$, the function is increasing and concave down, coming from $-\infty$ as $x \to -2^+$, passing through the $y$-intercept $(0, -1/2)$ and the $x$-intercept $(1,0)$, and then approaching the horizontal asymptote $y=1$ from below as $x \to \infty$. The graph never crosses its horizontal asymptote.

---

**Reflection:** This example highlights the importance of asymptotes and how they guide the graph's behavior at the "edges." The absence of critical numbers and inflection points *in the domain* simplifies the analysis of extrema and concavity changes, but we still use the VA to define the intervals for testing.

---

### Example 3: Function with Square Root and Limited Domain

**Problem:** Sketch the graph of $f(x) = x\sqrt{4-x^2}$.

**Given:** The function $f(x) = x\sqrt{4-x^2}$.
**We want:** A detailed sketch of its graph.

---

**### Step 1: Domain, Intercepts, and Symmetry**

1.  **Domain:**
    *   **Explanation:** The expression under the square root must be non-negative.
    *   $$ 4-x^2 \ge 0 \implies x^2 \le 4 \implies -2 \le x \le 2 $$
    *   **Result:** Domain is $[-2, 2]$.

2.  **$x$-intercepts:**
    *   **Explanation:** Set $f(x)=0$.
    *   $$ x\sqrt{4-x^2} = 0 $$
    *   This implies $x=0$ or $\sqrt{4-x^2}=0$.
    *   If $\sqrt{4-x^2}=0$, then $4-x^2=0 \implies x^2=4 \implies x=\pm 2$.
    *   **Result:** The $x$-intercepts are $(-2, 0)$, $(0, 0)$, and $(2, 0)$.

3.  **$y$-intercept:**
    *   **Explanation:** Set $x=0$.
    *   $$ f(0) = 0\sqrt{4-0^2} = 0 $$
    *   **Result:** The $y$-intercept is $(0, 0)$.

4.  **Symmetry:**
    *   **Explanation:** Check $f(-x)$.
    *   $$ f(-x) = (-x)\sqrt{4-(-x)^2} = -x\sqrt{4-x^2} = -f(x) $$
    *   **Result:** The function is odd (origin symmetry). This means we only need to analyze $[0, 2]$ and can reflect the results.

**### Step 2: Asymptotes**

1.  **Vertical Asymptotes:**
    *   **Explanation:** The domain is a closed interval, so there are no vertical asymptotes. The function is continuous on its domain.
    *   **Result:** None.

2.  **Horizontal Asymptotes:**
    *   **Explanation:** The domain is finite, so we cannot take limits as $x \to \pm\infty$.
    *   **Result:** None.

3.  **Slant Asymptotes:**
    *   **Explanation:** Same reason as horizontal asymptotes.
    *   **Result:** None.

**### Step 3: First Derivative Test (Increasing/Decreasing, Local Extrema)**

1.  **Calculate $f'(x)$:**
    *   **Explanation:** Use the product rule and chain rule. $f(x) = x(4-x^2)^{1/2}$.
    *   $$ f'(x) = (1)\sqrt{4-x^2} + x \cdot \frac{1}{2}(4-x^2)^{-1/2}(-2x) $$
    *   $$ f'(x) = \sqrt{4-x^2} - \frac{x^2}{\sqrt{4-x^2}} $$
    *   Combine terms by finding a common denominator:
    *   $$ f'(x) = \frac{(4-x^2) - x^2}{\sqrt{4-x^2}} = \frac{4 - 2x^2}{\sqrt{4-x^2}} $$

2.  **Find Critical Numbers:**
    *   **Explanation:** Set $f'(x)=0$ or find where $f'(x)$ is undefined.
    *   $f'(x)=0$: Set numerator to zero.
        *   $$ 4 - 2x^2 = 0 \implies 2x^2 = 4 \implies x^2 = 2 \implies x = \pm\sqrt{2} $$
        *   Both $\sqrt{2}$ and $-\sqrt{2}$ are in the domain $[-2,2]$.
    *   $f'(x)$ undefined: Set denominator to zero.
        *   $$ \sqrt{4-x^2} = 0 \implies 4-x^2 = 0 \implies x = \pm 2 $$
        *   These are the endpoints of the domain. While $f'(x)$ is undefined, they are not typically called critical numbers in the interior of the domain, but they are important points to consider for extrema.
    *   **Result:** Critical numbers are $x=-\sqrt{2}$ and $x=\sqrt{2}$. Endpoints are $x=-2, x=2$.

3.  **Sign Chart for $f'(x)$:**
    *   **Explanation:** Use critical numbers and endpoints to divide the domain. $\sqrt{2} \approx 1.414$.
    *   Intervals: $[-2, -\sqrt{2})$, $(-\sqrt{2}, \sqrt{2})$, $(\sqrt{2}, 2]$.
        *   Test $x=-1.5$ (in $[-2, -\sqrt{2})$): $f'(-1.5) = \frac{4 - 2(-1.5)^2}{\sqrt{4-(-1.5)^2}} = \frac{4 - 2(2.25)}{\sqrt{1.75}} = \frac{4 - 4.5}{\sqrt{1.75}} = \frac{-0.5}{\sqrt{1.75}} < 0$.
        *   Test $x=0$ (in $(-\sqrt{2}, \sqrt{2})$): $f'(0) = \frac{4 - 2(0)^2}{\sqrt{4-0^2}} = \frac{4}{2} = 2 > 0$.
        *   Test $x=1.5$ (in $(\sqrt{2}, 2]$): $f'(1.5) = \frac{4 - 2(1.5)^2}{\sqrt{4-(1.5)^2}} = \frac{4 - 2(2.25)}{\sqrt{1.75}} = \frac{4 - 4.5}{\sqrt{1.75}} = \frac{-0.5}{\sqrt{1.75}} < 0$.
    *   **Result:**
        *   $f(x)$ is decreasing on $[-2, -\sqrt{2})$ and $(\sqrt{2}, 2]$.
        *   $f(x)$ is increasing on $(-\sqrt{2}, \sqrt{2})$.

4.  **Local Extrema (First Derivative Test):**
    *   **Explanation:** Observe sign changes in $f'(x)$.
    *   At $x=-\sqrt{2}$: $f'(x)$ changes from negative to positive. Local minimum.
        *   $f(-\sqrt{2}) = (-\sqrt{2})\sqrt{4-(-\sqrt{2})^2} = -\sqrt{2}\sqrt{4-2} = -\sqrt{2}\sqrt{2} = -2$.
        *   Local minimum at $(-\sqrt{2}, -2)$.
    *   At $x=\sqrt{2}$: $f'(x)$ changes from positive to negative. Local maximum.
        *   $f(\sqrt{2}) = (\sqrt{2})\sqrt{4-(\sqrt{2})^2} = \sqrt{2}\sqrt{4-2} = \sqrt{2}\sqrt{2} = 2$.
        *   Local maximum at $(\sqrt{2}, 2)$.
    *   Endpoints: $f(-2)=0, f(2)=0$. These are absolute minima/maxima for the interval, but not local extrema in the strict sense (as they are not interior points).
    *   **Result:** Local minimum at $(-\sqrt{2}, -2)$, local maximum at $(\sqrt{2}, 2)$.

**### Step 4: Second Derivative Test (Concavity, Inflection Points)**

1.  **Calculate $f''(x)$:**
    *   **Explanation:** Differentiate $f'(x) = \frac{4 - 2x^2}{(4-x^2)^{1/2}}$. Use the quotient rule.
    *   Let $u = 4-2x^2 \implies u' = -4x$.
    *   Let $v = (4-x^2)^{1/2} \implies v' = \frac{1}{2}(4-x^2)^{-1/2}(-2x) = -x(4-x^2)^{-1/2}$.
    *   $$ f''(x) = \frac{u'v - uv'}{v^2} = \frac{(-4x)\sqrt{4-x^2} - (4-2x^2)(-x(4-x^2)^{-1/2})}{(\sqrt{4-x^2})^2} $$
    *   Multiply numerator and denominator by $\sqrt{4-x^2}$ to clear negative exponents:
    *   $$ f''(x) = \frac{-4x(4-x^2) + x(4-2x^2)}{(4-x^2)^{3/2}} $$
    *   $$ f''(x) = \frac{-16x + 4x^3 + 4x - 2x^3}{(4-x^2)^{3/2}} = \frac{2x^3 - 12x}{(4-x^2)^{3/2}} = \frac{2x(x^2 - 6)}{(4-x^2)^{3/2}} $$

2.  **Find Possible Inflection Points:**
    *   **Explanation:** Set $f''(x)=0$ or find where $f''(x)$ is undefined.
    *   $f''(x)=0$: Set numerator to zero.
        *   $$ 2x(x^2 - 6) = 0 \implies x=0 \quad \text{or} \quad x^2=6 \implies x=\pm\sqrt{6} $$
        *   $x=0$ is in the domain $[-2,2]$.
        *   $x=\pm\sqrt{6} \approx \pm 2.45$, which are outside the domain $[-2,2]$. So we only consider $x=0$.
    *   $f''(x)$ undefined: Denominator zero.
        *   $$ (4-x^2)^{3/2} = 0 \implies 4-x^2 = 0 \implies x = \pm 2 $$
        *   These are the endpoints of the domain.
    *   **Result:** Possible inflection point at $x=0$.

3.  **Sign Chart for $f''(x)$:**
    *   **Explanation:** Use $x=0$ and endpoints to divide the domain.
    *   Intervals: $[-2, 0)$, $(0, 2]$.
        *   Test $x=-1$ (in $[-2, 0)$): $f''(-1) = \frac{2(-1)((-1)^2 - 6)}{(4-(-1)^2)^{3/2}} = \frac{-2(1-6)}{(3)^{3/2}} = \frac{-2(-5)}{3\sqrt{3}} = \frac{10}{3\sqrt{3}} > 0$.
        *   Test $x=1$ (in $(0, 2]$): $f''(1) = \frac{2(1)(1^2 - 6)}{(4-1^2)^{3/2}} = \frac{2(-5)}{(3)^{3/2}} = \frac{-10}{3\sqrt{3}} < 0$.
    *   **Result:**
        *   $f(x)$ is concave up on $[-2, 0)$.
        *   $f(x)$ is concave down on $(0, 2]$.

4.  **Inflection Points:**
    *   **Explanation:** $f''(x)$ changes sign at $x=0$.
    *   At $x=0$: $f''(x)$ changes from positive to negative. $f(0)=0$.
    *   **Result:** Inflection point at $(0, 0)$.

**### Step 5: Plotting Points and Sketching the Graph**

1.  **Plot Key Points:**
    *   $x$-intercepts: $(-2,0), (0,0), (2,0)$
    *