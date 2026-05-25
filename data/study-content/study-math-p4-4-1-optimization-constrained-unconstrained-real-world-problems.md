## 1. What it is — in plain English

Imagine you're trying to find the highest point on a roller coaster track, or the lowest valley in a mountain range. That's essentially what optimization is about in mathematics. It's the process of finding the "best" possible outcome in a given situation.

"Best" can mean many things. It might mean maximizing something, like the profit a company makes, the area of a garden, or the speed of a rocket. Or it might mean minimizing something, like the cost of materials, the time it takes to travel, or the amount of fuel used.

In calculus, we use the tools of derivatives to find these maximum or minimum values of a function. The function represents the thing we want to optimize (like profit or cost), and its inputs are the variables we can control (like the number of items produced or the dimensions of a garden). Sometimes, there are limitations or rules we have to follow, like a fixed budget or a certain amount of material available – these are called "constraints."

So, in a nutshell, optimization is about using calculus to find the biggest or smallest value a function can take, often while respecting certain conditions or boundaries. It's about finding the sweet spot, the optimal solution.

## 2. Why it matters — real-world applications

Optimization is not just a theoretical exercise; it's a fundamental tool across almost every quantitative field, driving efficiency, innovation, and understanding.

1.  **Aerospace Engineering (Rocket Trajectory Optimization):** When launching a satellite or sending a probe to Mars, engineers need to calculate the most fuel-efficient trajectory. This involves optimizing the rocket's thrust, burn times, and flight path to minimize fuel consumption while ensuring the payload reaches its target orbit or destination. Companies like SpaceX heavily rely on complex optimization algorithms to plan missions, saving billions in fuel costs and enabling ambitious space exploration.
2.  **Machine Learning (Training Neural Networks):** At the heart of most machine learning algorithms, especially deep learning, is an optimization problem. When you train a neural network, you're trying to find a set of parameters (weights and biases) that minimize a "loss function." The loss function quantifies how far off the network's predictions are from the actual values. Algorithms like Gradient Descent, which are direct applications of finding the minimum of a function, are used to iteratively adjust these parameters until the loss is minimized, making the model as accurate as possible.
3.  **Physics (Principle of Least Action):** Many fundamental laws of physics can be derived from optimization principles. For instance, Fermat's Principle states that light travels between two points along the path that takes the least time. More broadly, the Principle of Least Action in classical mechanics states that the path taken by a physical system between two states is the one for which the "action" (a specific mathematical quantity related to energy and momentum) is minimized. This elegant principle unifies various physical phenomena and is a cornerstone of modern physics, from quantum mechanics to general relativity.
4.  **Business and Economics (Profit Maximization, Cost Minimization):** Businesses constantly optimize. A manufacturing company might want to determine the production level that maximizes its profit, given production costs, demand curves, and labor availability. A logistics company like Amazon might optimize delivery routes to minimize fuel consumption and delivery time. Financial analysts use optimization to construct investment portfolios that maximize returns for a given level of risk or minimize risk for a desired return.
5.  **Engineering Design (Material Efficiency, Structural Integrity):** Engineers optimize designs for structures, components, and systems. For example, designing a bridge or an airplane wing involves finding the optimal shape and material distribution to maximize strength and durability while minimizing weight and material cost. This ensures safety and efficiency, making structures last longer and perform better with fewer resources.

## 3. Prerequisites — what you must know first

Before diving deep into optimization problems, ensure you have a solid grasp of the following concepts from pre-calculus and earlier sections of Calculus I:

*   **Functions:** Understanding what a function is, its domain (valid inputs), range (possible outputs), and how to interpret its graph. You should be comfortable with various types of functions (polynomial, rational, exponential, logarithmic).
*   **Algebraic Manipulation:** Proficiency in solving equations, rearranging formulas, factoring, and working with inequalities. Many optimization problems boil down to solving algebraic equations once the calculus is applied.
*   **Derivatives:**
    *   **Definition of the Derivative:** Understanding the derivative as the instantaneous rate of change and the slope of the tangent line to a curve.
    *   **Differentiation Rules:** Knowing how to apply the power rule, product rule, quotient rule, chain rule, and derivatives of trigonometric, exponential, and logarithmic functions.
    *   **Geometric Interpretation of the Derivative:** Recognizing that $f'(x) > 0$ means the function is increasing, $f'(x) < 0$ means it's decreasing, and $f'(x) = 0$ indicates a horizontal tangent.
*   **Critical Points:** These are points where $f'(x) = 0$ or $f'(x)$ is undefined. You must know how to find them, as they are the primary candidates for local maximums and minimums.
*   **First Derivative Test:** A method to determine if a critical point corresponds to a local maximum, local minimum, or neither, by examining the sign of the derivative on either side of the critical point.
*   **Second Derivative Test:** An alternative method to classify critical points using the sign of the second derivative at the critical point. If $f''(c) > 0$, it's a local minimum; if $f''(c) < 0$, it's a local maximum; if $f''(c) = 0$, the test is inconclusive.
*   **Local vs. Absolute Extrema:** Understanding the difference between local (relative) maximums/minimums (the highest/lowest point in a small neighborhood) and absolute (global) maximums/minimums (the highest/lowest point over the entire domain).
*   **Extreme Value Theorem:** This theorem states that a continuous function on a closed interval $[a,b]$ must attain both an absolute maximum and an absolute minimum on that interval. This is crucial for problems with bounded domains.
*   **Basic Geometry Formulas:** Knowledge of formulas for areas (rectangle, circle, triangle), volumes (box, cylinder, sphere), and perimeters/circumferences. Many optimization problems are geometric in nature.

If any of these concepts feel shaky, pause here and review them. A strong foundation is essential for success in optimization.

## 4. The core idea — step by step

Optimization problems, particularly those solvable with single-variable calculus, follow a systematic approach. The goal is always to find the maximum or minimum value of some quantity, often subject to constraints.

### Step 1: Understand the Problem and Define the Objective Function

*   **Plain English Statement:** Read the problem carefully. Identify *what* quantity you are trying to maximize or minimize. This quantity will be represented by your "objective function." Assign variables to all quantities involved.
*   **Small Concrete Example:** "Maximize the area of a rectangular garden." Here, the quantity to maximize is "Area." Let the length be $L$ and the width be $W$.
*   **Formal/Mathematical Version:** Express the quantity to be optimized as a function of one or more variables. For our example, the area of a rectangle is $A = LW$. So, our objective function is $A(L, W) = LW$.
*   **What Could Go Wrong:** Misinterpreting the problem statement and optimizing the wrong quantity (e.g., maximizing perimeter instead of area). Not clearly defining variables or choosing variables that make the problem unnecessarily complex later on.

### Step 2: Identify and Express Constraints (if any)

*   **Plain English Statement:** Look for any limitations, restrictions, or conditions given in the problem. These are your "constraints." They often relate the variables in your objective function.
*   **Small Concrete Example:** "Maximize the area of a rectangular garden using exactly 100 feet of fencing." The constraint here is the total amount of fencing.
*   **Formal/Mathematical Version:** Write the constraints as equations or inequalities relating your variables. For our example, the perimeter of the garden is $2L + 2W$. Since we have 100 feet of fencing, the constraint is $2L + 2W = 100$.
*   **What Could Go Wrong:** Overlooking a constraint, misinterpreting a constraint (e.g., thinking "at most 100 feet" means $2L+2W \le 100$ when the problem implies "exactly 100 feet" for maximum area), or writing the constraint equation incorrectly.

### Step 3: Express the Objective Function in Terms of a Single Variable

*   **Plain English Statement:** If your objective function currently has more than one variable (like $A=LW$), use your constraint equation(s) to eliminate all but one variable. This is crucial for applying single-variable calculus.
*   **Small Concrete Example:** From $A = LW$ and $2L + 2W = 100$:
    1.  Solve the constraint for one variable, say $W$: $2W = 100 - 2L \implies W = 50 - L$.
    2.  Substitute this expression for $W$ into the objective function: $A(L) = L(50 - L)$.
*   **Formal/Mathematical Version:** Substitute the expression from the constraint into the objective function to get $f(x)$ or $A(L)$ in our example.
    $$A(L) = L(50 - L) = 50L - L^2$$
*   **What Could Go Wrong:** Algebraic errors during substitution. Sometimes, choosing which variable to eliminate can simplify the algebra; think strategically. If you can't reduce it to a single variable, you might be missing a constraint or the problem requires multivariable calculus (which is beyond Calculus I).

### Step 4: Determine the Domain of the Objective Function

*   **Plain English Statement:** Think about the realistic or physically possible values for your single variable. What are the minimum and maximum possible values it can take? This often comes from the nature of the quantities (e.g., length cannot be negative) and the constraints.
*   **Small Concrete Example:** For $A(L) = 50L - L^2$:
    *   Length $L$ must be positive: $L > 0$.
    *   Width $W = 50 - L$ must also be positive: $50 - L > 0 \implies L < 50$.
    *   So, the domain for $L$ is $(0, 50)$.
*   **Formal/Mathematical Version:** State the domain as an interval, e.g., $L \in (0, 50)$ or $x \in [a,b]$. This domain might be an open interval, a closed interval, or an infinite interval.
*   **What Could Go Wrong:** Forgetting physical constraints (e.g., dimensions must be positive). Not considering the implications of the constraint equation on the range of possible values for your single variable. If the domain is a closed interval, you *must* check the endpoints later.

### Step 5: Find the Critical Points of the Objective Function

*   **Plain English Statement:** Take the derivative of your single-variable objective function and set it equal to zero to find where the slope is flat. Also, check for points where the derivative is undefined. These are the "critical points," which are candidates for local maximums or minimums.
*   **Small Concrete Example:** For $A(L) = 50L - L^2$:
    1.  Find the derivative: $A'(L) = 50 - 2L$.
    2.  Set the derivative to zero: $50 - 2L = 0$.
    3.  Solve for $L$: $2L = 50 \implies L = 25$.
    *   There are no points where $A'(L)$ is undefined.
*   **Formal/Mathematical Version:**
    $$A(L) = 50L - L^2$$
    $$A'(L) = \frac{d}{dL}(50L - L^2) = 50 - 2L$$
    Set $A'(L) = 0$:
    $$50 - 2L = 0$$
    $$2L = 50$$
    $$L = 25$$
*   **What Could Go Wrong:** Making algebraic errors while differentiating or solving for $L$. Forgetting to check for points where the derivative is undefined (though less common for polynomial functions in optimization).

### Step 6: Test Critical Points and Endpoints (if applicable)

*   **Plain English Statement:** Now you need to determine if your critical points correspond to a maximum or minimum. You can use the First Derivative Test or the Second Derivative Test. If your domain is a closed interval (e.g., $[a,b]$), you *must* also evaluate the objective function at the endpoints. The largest value will be the absolute maximum, and the smallest will be the absolute minimum.
*   **Small Concrete Example:** For $A(L) = 50L - L^2$ and critical point $L=25$.
    *   **Using Second Derivative Test:**
        1.  Find the second derivative: $A''(L) = \frac{d}{dL}(50 - 2L) = -2$.
        2.  Evaluate $A''(25)$: $A''(25) = -2$.
        3.  Since $A''(25) < 0$, $L=25$ corresponds to a local maximum.
    *   **Considering the Domain:** Our domain was $(0, 50)$, an open interval. Since we found only one critical point and it's a local maximum, and the function is a downward-opening parabola, this local maximum must be the absolute maximum on the interval.
*   **Formal/Mathematical Version:**
    *   **Second Derivative Test:**
        $$A''(L) = -2$$
        Since $A''(25) = -2 < 0$, $L=25$ yields a local maximum.
    *   **Extreme Value Theorem (for closed intervals):** If the domain were $[0,50]$, we would evaluate $A(0)$, $A(50)$, and $A(25)$.
        $A(0) = 0$
        $A(50) = 0$
        $A(25) = 50(25) - (25)^2 = 1250 - 625 = 625$.
        The maximum value is 625.
*   **What Could Go Wrong:** Forgetting to check endpoints if the domain is a closed interval. Misapplying the First or Second Derivative Test (e.g., confusing positive second derivative with a maximum). Only finding a local extremum when an absolute extremum is required.

### Step 7: State the Answer and Interpret it in the Context of the Problem

*   **Plain English Statement:** Once you've found the optimal value(s) for your variable(s), answer the original question. Make sure your answer is clear, includes units, and directly addresses what was asked.
*   **Small Concrete Example:** The problem asked to maximize the area. We found $L=25$ feet gives the maximum area.
    1.  Find the corresponding width: $W = 50 - L = 50 - 25 = 25$ feet.
    2.  Calculate the maximum area: $A = LW = 25 \times 25 = 625$ square feet.
    3.  Answer: The maximum area of the garden is 625 square feet, achieved when the dimensions are 25 feet by 25 feet.
*   **Formal/Mathematical Version:** Clearly state the optimal value of the objective function and the values of the variables that produce it.
    Maximum Area: $A_{max} = 625 \, \text{ft}^2$
    Dimensions: $L = 25 \, \text{ft}$, $W = 25 \, \text{ft}$
*   **What Could Go Wrong:** Answering with just the value of the variable ($L=25$) instead of the actual maximum/minimum value (Area = 625 sq ft). Forgetting to find all related quantities asked for (e.g., finding $L$ but not $W$). Not including units.

## 5. Worked examples — multiple, with every step shown

### Example 1: Easy — Unconstrained Numerical Optimization

**Problem:** Find two non-negative numbers whose sum is 20 and whose product is as large as possible.

**Identify what's given and what we want:**
*   **Given:** Two non-negative numbers, let's call them $x$ and $y$. Their sum is 20: $x + y = 20$.
*   **Want:** Maximize their product, $P = xy$.

**Step-by-step solution:**

1.  **Define the Objective Function:**
    *   We want to maximize the product $P$.
    *   $$P = xy$$
    *   *Explanation:* This is the quantity we're trying to optimize.

2.  **Identify Constraints:**
    *   The sum of the two numbers is 20:
    *   $$x + y = 20$$
    *   Also, the numbers must be non-negative: $x \ge 0$ and $y \ge 0$.
    *   *Explanation:* This equation links our two variables, and the inequalities define their valid range.

3.  **Express Objective Function in One Variable:**
    *   From the constraint $x + y = 20$, we can express $y$ in terms of $x$:
    *   $$y = 20 - x$$
    *   Substitute this into the product function:
    *   $$P(x) = x(20 - x)$$
    *   $$P(x) = 20x - x^2$$
    *   *Explanation:* We need a function of a single variable to use single-variable calculus. The constraint allows us to eliminate $y$.

4.  **Determine the Domain of the Objective Function:**
    *   Since $x \ge 0$ (given).
    *   And $y = 20 - x \ge 0 \implies 20 \ge x \implies x \le 20$.
    *   So, the domain for $x$ is the closed interval $[0, 20]$.
    *   *Explanation:* The physical (or problem-defined) constraints on the variables dictate the feasible domain for our function. Since it's a closed interval, we'll need to check endpoints later.

5.  **Find Critical Points:**
    *   Take the derivative of $P(x)$ with respect to $x$:
    *   $$P'(x) = \frac{d}{dx}(20x - x^2) = 20 - 2x$$
    *   Set the derivative to zero to find critical points:
    *   $$20 - 2x = 0$$
    *   $$2x = 20$$
    *   $$x = 10$$
    *   *Explanation:* Critical points are where the rate of change is zero, indicating a potential maximum or minimum.

6.  **Test Critical Points and Endpoints:**
    *   Since the domain is a closed interval $[0, 20]$, we evaluate $P(x)$ at the critical point and the endpoints.
    *   At critical point $x=10$:
        *   $$P(10) = 20(10) - (10)^2 = 200 - 100 = 100$$
    *   At endpoint $x=0$:
        *   $$P(0) = 20(0) - (0)^2 = 0$$
    *   At endpoint $x=20$:
        *   $$P(20) = 20(20) - (20)^2 = 400 - 400 = 0$$
    *   *Explanation:* For a continuous function on a closed interval, the absolute maximum (or minimum) must occur at a critical point or an endpoint. Comparing the values tells us which one is the largest.

7.  **State the Answer and Interpret:**
    *   The maximum product is 100, which occurs when $x=10$.
    *   To find the other number, $y = 20 - x = 20 - 10 = 10$.
    *   **The two numbers are 10 and 10, and their maximum product is 100.**
    *   *Explanation:* We've found the values of $x$ and $y$ that satisfy the conditions and yield the maximum product, directly answering the problem.

**Reflection:** This example was relatively straightforward because the objective function was a simple parabola, whose maximum is easily found. The domain was a closed interval, requiring endpoint checks, but these were trivial.

---

### Example 2: Medium — Constrained Geometry (Fencing Problem)

**Problem:** A farmer has 1200 feet of fencing and wants to enclose a rectangular field bordering a straight river. He needs no fence along the river. What are the dimensions of the field that has the largest area?

**Identify what's given and what we want:**
*   **Given:** Total fencing material = 1200 feet. The field is rectangular and borders a river (no fence needed on one side).
*   **Want:** Maximize the area of the field.

**Step-by-step solution:**

1.  **Define the Objective Function:**
    *   Let the dimensions of the rectangular field be $x$ (width, perpendicular to the river) and $y$ (length, parallel to the river).
    *   The area $A$ is given by:
    *   $$A = xy$$
    *   *Explanation:* This is the quantity we aim to maximize.

2.  **Identify Constraints:**
    *   The total fencing used is 1200 feet. Since one side is the river, the fencing will cover two widths and one length:
    *   $$2x + y = 1200$$
    *   Also, dimensions must be positive: $x > 0$ and $y > 0$.
    *   *Explanation:* This equation relates the dimensions of the field to the available fencing.

3.  **Express Objective Function in One Variable:**
    *   From the constraint $2x + y = 1200$, solve for $y$:
    *   $$y = 1200 - 2x$$
    *   Substitute this expression for $y$ into the area function:
    *   $$A(x) = x(1200 - 2x)$$
    *   $$A(x) = 1200x - 2x^2$$
    *   *Explanation:* We've reduced the problem to optimizing a function of a single variable, $x$.

4.  **Determine the Domain of the Objective Function:**
    *   Since $x > 0$ (width must be positive).
    *   And $y = 1200 - 2x > 0 \implies 1200 > 2x \implies x < 600$.
    *   So, the domain for $x$ is the open interval $(0, 600)$.
    *   *Explanation:* These bounds ensure that the dimensions are physically meaningful. Because it's an open interval, we don't have endpoints to check, but we must verify our critical point is indeed a maximum.

5.  **Find Critical Points:**
    *   Take the derivative of $A(x)$ with respect to $x$:
    *   $$A'(x) = \frac{d}{dx}(1200x - 2x^2) = 1200 - 4x$$
    *   Set the derivative to zero:
    *   $$1200 - 4x = 0$$
    *   $$4x = 1200$$
    *   $$x = 300$$
    *   *Explanation:* This critical point is a candidate for the maximum area.

6.  **Test Critical Points:**
    *   We can use the Second Derivative Test to confirm if $x=300$ is a maximum.
    *   Find the second derivative of $A(x)$:
    *   $$A''(x) = \frac{d}{dx}(1200 - 4x) = -4$$
    *   Evaluate $A''(300)$:
    *   $$A''(300) = -4$$
    *   Since $A''(300) < 0$, the function $A(x)$ has a local maximum at $x=300$. Because this is the only critical point in our domain and the function is a downward-opening parabola, this local maximum is also the absolute maximum.
    *   *Explanation:* The second derivative test efficiently confirms the nature of the critical point.

7.  **State the Answer and Interpret:**
    *   The width $x = 300$ feet.
    *   Find the corresponding length $y$ using the constraint equation:
    *   $$y = 1200 - 2x = 1200 - 2(300) = 1200 - 600 = 600 \text{ feet}$$
    *   The maximum area is:
    *   $$A = xy = 300 \times 600 = 180,000 \text{ square feet}$$
    *   **The dimensions that maximize the area are 300 feet (perpendicular to the river) by 600 feet (parallel to the river), yielding a maximum area of 180,000 square feet.**
    *   *Explanation:* We've found both dimensions and the resulting maximum area, as requested.

**Reflection:** This problem required careful setup of the perimeter constraint due to the river. The domain was an open interval, making the Second Derivative Test a clean way to confirm the maximum.

---

### Example 3: Harder — Volume/Surface Area (Cylindrical Can Design)

**Problem:** A cylindrical can is to be made to hold 1 liter (1000 cm³) of oil. Find the dimensions (radius and height) that will minimize the cost of the metal to make the can.

**Identify what's given and what we want:**
*   **Given:** Volume of the cylinder $V = 1000 \text{ cm}^3$.
*   **Want:** Minimize the surface area $S$ (representing the cost of metal).

**Step-by-step solution:**

1.  **Define the Objective Function:**
    *   Let the radius of the cylinder be $r$ and the height be $h$.
    *   The surface area $S$ of a closed cylinder (top, bottom, and side) is given by:
    *   $$S = 2\pi r^2 + 2\pi rh$$
    *   *Explanation:* We want to minimize the amount of material, which is represented by the surface area.

2.  **Identify Constraints:**
    *   The volume of the cylinder must be 1000 cm³:
    *   $$V = \pi r^2 h = 1000$$
    *   Also, dimensions must be positive: $r > 0$ and $h > 0$.
    *   *Explanation:* This equation links $r$ and $h$ to the fixed volume.

3.  **Express Objective Function in One Variable:**
    *   From the constraint $\pi r^2 h = 1000$, solve for $h$ (it's generally easier to solve for $h$ than $r^2$):
    *   $$h = \frac{1000}{\pi r^2}$$
    *   Substitute this expression for $h$ into the surface area function:
    *   $$S(r) = 2\pi r^2 + 2\pi r \left(\frac{1000}{\pi r^2}\right)$$
    *   Simplify the expression:
    *   $$S(r) = 2\pi r^2 + \frac{2000}{r}$$
    *   *Explanation:* This is now our objective function in terms of a single variable, $r$.

4.  **Determine the Domain of the Objective Function:**
    *   Since $r > 0$ (radius must be positive).
    *   And $h = \frac{1000}{\pi r^2} > 0$ is automatically satisfied if $r > 0$.
    *   There is no upper bound on $r$ (theoretically, a very wide, very short can is possible). So, the domain is $(0, \infty)$.
    *   *Explanation:* The radius can be any positive value.

5.  **Find Critical Points:**
    *   Rewrite $S(r)$ for easier differentiation: $S(r) = 2\pi r^2 + 2000r^{-1}$.
    *   Take the derivative of $S(r)$ with respect to $r$:
    *   $$S'(r) = \frac{d}{dr}(2\pi r^2 + 2000r^{-1}) = 4\pi r - 2000r^{-2}$$
    *   Set the derivative to zero:
    *   $$4\pi r - \frac{2000}{r^2} = 0$$
    *   $$4\pi r = \frac{2000}{r^2}$$
    *   $$4\pi r^3 = 2000$$
    *   $$r^3 = \frac{2000}{4\pi}$$
    *   $$r^3 = \frac{500}{\pi}$$
    *   $$r = \sqrt[3]{\frac{500}{\pi}}$$
    *   Approximate value: $r \approx \sqrt[3]{\frac{500}{3.14159}} \approx \sqrt[3]{159.15} \approx 5.419$ cm.
    *   *Explanation:* We found the radius where the rate of change of surface area is zero.

6.  **Test Critical Points:**
    *   We use the Second Derivative Test since our domain is an open interval.
    *   Find the second derivative of $S(r)$:
    *   $$S''(r) = \frac{d}{dr}(4\pi r - 2000r^{-2}) = 4\pi + 4000r^{-3}$$
    *   $$S''(r) = 4\pi + \frac{4000}{r^3}$$
    *   Substitute $r = \sqrt[3]{\frac{500}{\pi}}$ into $S''(r)$:
    *   $$S''\left(\sqrt[3]{\frac{500}{\pi}}\right) = 4\pi + \frac{4000}{\left(\sqrt[3]{\frac{500}{\pi}}\right)^3}$$
    *   $$S''\left(\sqrt[3]{\frac{500}{\pi}}\right) = 4\pi + \frac{4000}{\frac{500}{\pi}} = 4\pi + 4000 \cdot \frac{\pi}{500} = 4\pi + 8\pi = 12\pi$$
    *   Since $S''(r) = 12\pi > 0$, the surface area is minimized at this radius.
    *   *Explanation:* A positive second derivative confirms that this critical point corresponds to a local minimum. Since it's the only critical point in an open domain, it's the absolute minimum.

7.  **State the Answer and Interpret:**
    *   The optimal radius is $r = \sqrt[3]{\frac{500}{\pi}}$ cm.
    *   Now find the corresponding height $h$:
    *   $$h = \frac{1000}{\pi r^2} = \frac{1000}{\pi \left(\sqrt[3]{\frac{500}{\pi}}\right)^2} = \frac{1000}{\pi \left(\frac{500}{\pi}\right)^{2/3}}$$
    *   This can be simplified: $h = \frac{1000}{\pi^{1/3} 500^{2/3}} = \frac{2 \cdot 500}{\pi^{1/3} 500^{2/3}} = 2 \cdot \frac{500^{1/3}}{\pi^{1/3}} = 2 \sqrt[3]{\frac{500}{\pi}}$
    *   Notice that $h = 2r$.
    *   Approximate values: $r \approx 5.42$ cm, $h \approx 2 \times 5.42 = 10.84$ cm.
    *   The minimum surface area would be $S(r) = 2\pi r^2 + \frac{2000}{r} \approx 2\pi (5.42)^2 + \frac{2000}{5.42} \approx 553.57 \text{ cm}^2$.
    *   **To minimize the cost of the metal, the can should have a radius of $\sqrt[3]{\frac{500}{\pi}}$ cm (approximately 5.42 cm) and a height of $2\sqrt[3]{\frac{500}{\pi}}$ cm (approximately 10.84 cm). The height should be twice the radius.**
    *   *Explanation:* We've provided both dimensions that minimize surface area and noted the interesting relationship between $h$ and $r$.

**Reflection:** This problem involved more complex algebraic manipulation and differentiation, including negative exponents. The key insight $h=2r$ is a classic result for optimal cylindrical can design.

---

### Example 4: Hardest — Distance/Rate (Boat Landing Problem)

**Problem:** A man is on a boat 2 miles offshore and wants to reach a town 6 miles down a straight shore. He can row at 2 mph and walk at 4 mph. Where should he land the boat to minimize the total travel time?

**Identify what's given and what we want:**
*   **Given:**
    *   Distance offshore = 2 miles.
    *   Distance along shore to town = 6 miles.
    *   Rowing speed $v_r = 2$ mph.
    *   Walking speed $v_w = 4$ mph.
*   **Want:** Minimize total travel time.

**Step-by-step solution:**

1.  **Define the Objective Function:**
    *   Let $x$ be the distance along the shore from the point directly opposite the boat to where the man lands the boat.
    *   The distance the man rows (hypotenuse of a right triangle) is $d_r = \sqrt{x^2 + 2^2} = \sqrt{x^2 + 4}$.
    *   The distance the man walks is $d_w = 6 - x$.
    *   Time = Distance / Speed.
    *   Time rowing $T_r = \frac{d_r}{v_r} = \frac{\sqrt{x^2 + 4}}{2}$.
    *   Time walking $T_w = \frac{d_w}{v_w} = \frac{6 - x}{4}$.
    *   The total time $T(x)$ is the sum of rowing time and walking time:
    *   $$T(x) = \frac{\sqrt{x^2 + 4}}{2} + \frac{6 - x}{4}$$
    *   *Explanation:* We're building a function that represents the total time, which is what we want to minimize.

2.  **Identify Constraints:**
    *   The landing point $x$ must be between the point directly opposite the boat (where $x=0$) and the town (where $x=6$).
    *   So, $0 \le x \le 6$.
    *   *Explanation:* The variable $x$ represents a physical distance along the shore, so it must be within these bounds.

3.  **Express Objective Function in One Variable:**
    *   It's already in one variable, $x$.
    *   $$T(x) = \frac{1}{2}(x^2 + 4)^{1/2} + \frac{1}{4}(6 - x)$$
    *   *Explanation:* No further simplification or substitution is needed here.

4.  **Determine the Domain of the Objective Function:**
    *   Based on the physical setup, the landing point $x$ can range from 0 (landing directly opposite and walking the full 6 miles) to 6 (landing at the town itself, rowing the full distance).
    *   The domain is the closed interval $[0, 6]$.
    *   *Explanation:* This closed interval means we must check the endpoints for potential minimums.

5.  **Find Critical Points:**
    *   Take the derivative of $T(x)$ with respect to $x$:
    *   $$T'(x) = \frac{1}{2} \cdot \frac{1}{2}(x^2 + 4)^{-1/2} \cdot (2x) + \frac{1}{4}(-1)$$
    *   $$T'(x) = \frac{x}{2\sqrt{x^2 + 4}} - \frac{1}{4}$$
    *   Set the derivative to zero:
    *   $$\frac{x}{2\sqrt{x^2 + 4}} - \frac{1}{4} = 0$$
    *   $$\frac{x}{2\sqrt{x^2 + 4}} = \frac{1}{4}$$
    *   $$4x = 2\sqrt{x^2 + 4}$$
    *   $$2x = \sqrt{x^2 + 4}$$
    *   Square both sides (note: this can introduce extraneous solutions, so we must check our final $x$ value):
    *   $$(2x)^2 = (\sqrt{x^2 + 4})^2$$
    *   $$4x^2 = x^2 + 4$$
    *   $$3x^2 = 4$$
    *   $$x^2 = \frac{4}{3}$$
    *   $$x = \pm\sqrt{\frac{4}{3}} = \pm\frac{2}{\sqrt{3}} = \pm\frac{2\sqrt{3}}{3}$$
    *   Since $x$ must be within $[0, 6]$, we take the positive value:
    *   $$x = \frac{2\sqrt{3}}{3} \approx 1.155 \text{ miles}$$
    *   This value is within our domain $[0, 6]$.
    *   *Explanation:* This critical point is a candidate for the minimum travel time. Squaring both sides is a common technique, but requires verifying the solution in the original equation or context.

6.  **Test Critical Points and Endpoints:**
    *   Evaluate $T(x)$ at the critical point $x = \frac{2\sqrt{3}}{3}$ and the endpoints $x=0$ and $x=6$.
    *   **At critical point $x = \frac{2\sqrt{3}}{3}$:**
        *   $T\left(\frac{2\sqrt{3}}{3}\right) = \frac{1}{2}\sqrt{\left(\frac{2\sqrt{3}}{3}\right)^2 + 4} + \frac{1}{4}\left(6 - \frac{2\sqrt{3}}{3}\right)$
        *   $= \frac{1}{2}\sqrt{\frac{4 \cdot 3}{9} + 4} + \frac{6}{4} - \frac{2\sqrt{3}}{12}$
        *   $= \frac{1}{2}\sqrt{\frac{12}{9} + 4} + \frac{3}{2} - \frac{\sqrt{3}}{6}$
        *   $= \frac{1}{2}\sqrt{\frac{4}{3} + \frac{12}{3}} + \frac{3}{2} - \frac{\sqrt{3}}{6}$
        *   $= \frac{1}{2}\sqrt{\frac{16}{3}} + \frac{3}{2} - \frac{\sqrt{3}}{6}$
        *   $= \frac{1}{2}\frac{4}{\sqrt{3}} + \frac{3}{2} - \frac{\sqrt{3}}{6}$
        *   $= \frac{2}{\sqrt{3}} + \frac{3}{2} - \frac{\sqrt{3}}{6} = \frac{2\sqrt{3}}{3} + \frac{3}{2} - \frac{\sqrt{3}}{6}$
        *   To combine terms with $\sqrt{3}$: $\frac{4\sqrt{3}}{6} - \frac{\sqrt{3}}{6} = \frac{3\sqrt{3}}{6} = \frac{\sqrt{3}}{2}$.
        *   So, $T\left(\frac{2\sqrt{3}}{3}\right) = \frac{\sqrt{3}}{2} + \frac{3}{2} = \frac{3 + \sqrt{3}}{2} \approx \frac{3 + 1.732}{2} \approx \frac{4.732}{2} \approx 2.366$ hours.
    *   **At endpoint $x=0$ (row directly to shore, then walk 6 miles):**
        *   $$T(0) = \frac{\sqrt{0^2 + 4}}{2} + \frac{6 - 0}{4} = \frac{\sqrt{4}}{2} + \frac{6}{4} = \frac{2}{2} + \frac{3}{2} = 1 + 1.5 = 2.5 \text{ hours}$$
    *   **At endpoint $x=6$ (row directly to town):**
        *   $$T(6) = \frac{\sqrt{6^2 + 4}}{2} + \frac{6 - 6}{4} = \frac{\sqrt{36 + 4}}{2} + 0 = \frac{\sqrt{40}}{2} = \frac{2\sqrt{10}}{2} = \sqrt{10} \approx 3.162 \text{ hours}$$
    *   Comparing the times: $2.366$ hours (critical point) is less than $2.5$ hours (endpoint $x=0$) and $3.162$ hours (endpoint $x=6$).
    *   *Explanation:* We must compare all candidates for the minimum. The Extreme Value Theorem guarantees the minimum exists on this closed interval.

7.  **State the Answer and Interpret:**
    *   The minimum time is approximately 2.366 hours, achieved when $x = \frac{2\sqrt{3}}{3}$ miles.
    *   **The man should land the boat approximately $\frac{2\sqrt{3}}{3}$ miles (about 1.155 miles) down the shore from the point directly opposite his starting position to minimize his total travel time.**
    *   *Explanation:* The answer specifies the optimal landing point, which was the variable $x$ we defined.

**Reflection:** This problem was challenging due to the square root in the objective function, leading to more complex differentiation and algebraic solving (squaring both sides). The closed interval domain also necessitated checking endpoints, which is often a source of error if forgotten.

## 6. Common mistakes and traps

Students often stumble in optimization problems due to several recurring errors. Being aware of these can significantly improve your accuracy.

1.  **Incorrectly Defining the Objective Function:** The most fundamental error is setting up the wrong function to maximize or minimize. Forgetting a component (e.g., only considering the top and bottom of a can, not the side) or misinterpreting the goal (e.g., maximizing perimeter instead of area).
    *   *Why it happens:* Rushing the problem setup, not drawing a diagram, or misreading the question.
2.  **Ignoring or Misinterpreting Constraints:** Constraints are crucial for reducing the objective function to a single variable. Forgetting a constraint, or writing it down incorrectly (e.g., $2x+y=P$ for a fence against a wall vs. $2x+2y=P$ for a freestanding fence), will lead to an incorrect objective function.
    *   *Why it happens:* Not explicitly listing all given information, or not understanding the physical implications of the problem statement.
3.  **Forgetting to Define and Check the Domain:** The domain of the objective function (especially physical constraints like dimensions being positive) is vital. If the domain is a closed interval, you **must** check the function's value at the endpoints. Critical points only guarantee local extrema; endpoints might hold the absolute extremum.
    *   *Why it happens:* Focusing solely on calculus steps ($f'(x)=0$) and neglecting the broader context of the problem.
4.  **Algebraic or Differentiation Errors:** Optimization problems often involve multiple steps of algebra and differentiation. A small error in finding the derivative, solving for critical points, or substituting back into the objective function can propagate and lead to a completely wrong answer.
    *   *Why it happens:* Lack of practice with algebraic manipulation, carelessness, or rushing through calculations.
5.  **Not Answering the Original Question:** After finding the optimal value for the independent variable (e.g., $x=5$), students sometimes stop there. However, the problem usually asks for the maximum/minimum value of the *objective function* (e.g., the maximum area), or other related dimensions.
    *   *Why it happens:* Losing sight of the original goal amidst the steps, or not re-reading the question at the end.
6.  **Confusing Local and Absolute Extrema (especially on open intervals):** When working on an open interval or an infinite domain, a single critical point that is a local maximum/minimum is often the absolute maximum/minimum. However, this is not always guaranteed without further analysis (e.g., by checking the behavior of the function as $x \to \pm \infty$ or by using the Second Derivative Test to confirm concavity).
    *   *Why it happens:* Not fully understanding the implications of the Extreme Value Theorem or how to justify an absolute extremum on an open interval.

## 7. Textbook-precise explanation

Optimization, in the context of single-variable calculus, refers to the process of finding the absolute maximum or minimum value of a function over a specified domain. These problems are often referred to as "applied maximum and minimum problems."

Let $f(x)$ be a continuous function defined on an interval $I$. The goal of an optimization problem is to find a value $c \in I$ such that $f(c)$ is the absolute maximum or absolute minimum of $f$ on $I$.

**Key Definitions and Theorems:**

1.  **Absolute Extrema (Global Extrema):**
    *   A function $f$ has an **absolute maximum** at $c$ on an interval $I$ if $f(c) \ge f(x)$ for all $x \in I$.
    *   A function $f$ has an **absolute minimum** at $c$ on an interval $I$ if $f(c) \le f(x)$ for all $x \in I$.
2.  **Extreme Value Theorem (EVT):** If a function $f$ is continuous on a closed interval $[a,b]$, then $f$ attains an absolute maximum value $f(c)$ and an absolute minimum value $f(d)$ at some numbers $c$ and $d$ in $[a,b]$.
    *   *Significance:* This theorem guarantees the existence of absolute extrema on closed intervals, simplifying the search process.
3.  **Fermat's Theorem (Critical Points):** If $f$ has a local maximum or minimum at $c$, and if $f'(c)$ exists, then $f'(c) = 0$.
    *   A **critical number** (or critical point) of a function $f$ is a number $c$ in the domain of $f$ such that $f'(c) = 0$ or $f'(c)$ is undefined.
    *   *Significance:* This theorem tells us that absolute extrema on an interval, if they occur within the interval's interior, must occur at critical points.
4.  **Closed Interval Method (for finding absolute extrema on $[a,b]$):**
    To find the absolute maximum and minimum values of a continuous function $f$ on a closed interval $[a,b]$:
    1.  Find the values of $f$ at the critical numbers of $f$ in $(a,b)$.
    2.  Find the values of $f$ at the endpoints of the interval, $f(a)$ and $f(b)$.
    3.  The largest of these values from steps 1 and 2 is the absolute maximum value, and the smallest is the absolute minimum value.
5.  **First Derivative Test for Absolute Extrema (for open/infinite intervals):**
    If $c$ is the only critical number of a continuous function $f$ on an interval $I$:
    *   If $f'(x)$ changes from positive to negative at $c$, then $f(c)$ is an absolute maximum on $I$.
    *   If $f'(x)$ changes from negative to positive at $c$, then $f(c)$ is an absolute minimum on $I$.
    *   *Significance:* This is useful when the domain is an open or infinite interval where the EVT doesn't apply directly.
6.  **Second Derivative Test for Local Extrema:**
    If $f''(c)$ is continuous near $c$:
    *   If $f'(c) = 0$ and $f''(c) > 0$, then $f$ has a local minimum at $c$.
    *   If $f'(c) = 0$ and $f''(c) < 0$, then $f$ has a local maximum at $c$.
    *   If $f'(c) = 0$ and $f''(c) = 0$, the test is inconclusive.
    *   *Significance:* Provides an alternative way to classify critical points, and if combined with the "only critical point" condition, can confirm absolute extrema on open intervals.

**General Procedure for Solving Optimization Problems:**

1.  **Understand the Problem:** Read the problem carefully. Identify the quantity to be optimized (the objective function) and any given constraints. Draw a diagram if helpful.
2.  **Formulate the Objective Function:** Introduce variables and express the quantity to be optimized as a function of these variables.
3.  **Formulate Constraints:** Write any given constraints as equations or inequalities in terms of the variables.
4.  **Reduce to a Single Variable:** Use the constraint equations to eliminate variables until the objective function is expressed in terms of a single independent variable.
5.  **Determine the Domain:** Identify the feasible range of values for the single independent variable, considering both explicit constraints and implicit physical restrictions.
6.  **Find Critical Points:** Differentiate the objective function with respect to the single variable and set the derivative to zero. Solve for the critical numbers. Also, identify points where the derivative is undefined.
7.  **Test Critical Points and Endpoints:**
    *   If the domain is a closed interval $[a,b]$, use the Closed Interval Method.
    *   If the domain is an open or infinite interval, use the First Derivative Test or the Second Derivative Test (if applicable) to classify the critical points. If there's only one critical point, it is often the absolute extremum.
8.  **State the Answer:** Clearly answer the original question, including units and all relevant quantities.

This rigorous framework ensures that all potential extrema are considered, leading to a mathematically sound solution.

*References: Stewart, Calculus: Early Transcendentals, 9th Edition, Chapter 4.7: Optimization Problems.*

## 8. ASCII diagrams

Here are a few ASCII diagrams to help visualize common optimization setups:

**1. Rectangular Field (e.g., Fencing Problem)**

```text
       y (length)
   +-----------------+
   |                 |
 x |                 | x (width)
   |                 |
   +-----------------+
       y (length)

   Perimeter = 2x + 2y
   Area      = xy

   If bordering a river (river is one 'y' side):

   +-----------------+
   |                 |
 x |                 | x
   |                 |
   +-----------------+
       y (length)
   <----- River ------>

   Perimeter (fencing) = 2x + y
   Area                = xy
```

**2. Cylindrical Can (e.g., Volume/Surface Area Problem)**

```text
         _______
       /       \
      |   Top   |   <-- Area = pi * r^2
      \_______/
          |
          | h (height)
          |
         _______
       /       \
      |  Bottom |   <-- Area = pi * r^2
      \_______/

   Side (unrolled) is a rectangle:
   Length = Circumference = 2 * pi * r
   Height = h
   Area   = 2 * pi * r * h

   Total Surface Area = 2 * pi * r^2 + 2 * pi * r * h
   Volume             = pi * r^2 * h
```

**3. Boat Landing Problem**

```text
       Boat (B)
       |
       | 2 miles (offshore distance)
       |
       *---------------------> Shoreline
       P  <--- x ---> L <--- (6-x) ---> T
       ^                  ^            ^
       |                  |            |
       Point directly     Landing      Town
       opposite boat (P)  Spot (L)     (T)

   Distance from B to L (rowing) = sqrt(x^2 + 2^2)
   Distance from L to T (walking) = 6 - x
   Total distance along shore from P to T = 6 miles
```

## 9. Memory technique — never forget this

To master optimization, you need a systematic approach you can recall under pressure.

1.  **Mnemonic/Visual Hook: "F.C.D.C.T.A."**
    *   **F**unction: Define the **F**unction you want to optimize (the objective function). What are you maximizing/minimizing?
    *   **C**onstraints: Identify all **C**onstraints and write them as equations.
    *   **D**omain: Use constraints to reduce your objective function to a single variable, then determine its realistic **D**omain.
    *   **C**ritical Points: Find the **C**ritical points by taking the derivative and setting it to zero (and checking where undefined).
    *   **T**est: **T**est critical points (and endpoints if the domain is closed) to find the absolute maximum/minimum.
    *   **A**nswer: **A**nswer the original question, including units and all requested values.

    *Visual Hook:* Imagine a tiny explorer (your critical point) trying to find the highest peak or lowest valley on a roller coaster track (your function graph). The track has boundaries (your domain/endpoints) and possibly loops or turns (where the derivative is zero or undefined). The explorer must check the highest point on the track and also where the track begins and ends.

2.  **1-3 Formulas/Facts You MUST Overlearn:**
    1.  **Critical Points:** Absolute extrema (if in the interior of the domain) *always* occur at critical points where $f'(x) = 0$ or $f'(x)$ is undefined. This is the cornerstone.
    2.  **Extreme Value Theorem:** For continuous functions on a closed interval $[a,b]$, the absolute max/min *must* exist and occur either at a critical point *or* at an endpoint ($a$ or $b$).
    3.  **Derivative Tests:** Know how to use the First Derivative Test (sign changes) and Second Derivative Test (concavity) to classify critical points as local max/min.

3.  **Spaced-Repetition Schedule:**
    *   **1 Day:** Review the F.C.D.C.T.A. steps. Redo Example 1 (easy) without looking at the solution.
    *   **3 Days:** Redo Example 2 (medium) and try to explain each step's *purpose* aloud.
    *   **7 Days:** Redo Example 3 (harder). Pay close attention to the algebraic simplification after differentiation.
    *   **16 Days:** Tackle Example 4 (hardest). Focus on setting up the time function and solving the derivative equation.
    *   **35 Days:** Try to solve a new, unseen optimization problem from your textbook. If you get stuck, refer back to F.C.D.C.T.A. and the fundamental facts.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the exact steps, always go back to the fundamental idea of a derivative:
    *   **What does $f'(x)$ tell you?** It tells you the instantaneous rate of change (slope).
    *   **Where would a function stop increasing and start decreasing (a max), or stop decreasing and start increasing (a min)?** At those points, the rate of change must momentarily be zero (the slope is flat).
    *   **What if the function doesn't have a smooth turn?** It could have a sharp peak or valley, where the derivative is undefined.
    *   **What if the "best" point isn't in the middle?** If you're looking at a specific range (a closed interval), the highest or lowest point might be right at the edges of that range.
    This chain of thought naturally leads you to find critical points ($f'(x)=0$ or undefined) and check endpoints, which are the core components of optimization.

## 10. Connections — what this leads to

Optimization in Calculus I is a foundational concept that opens doors to many advanced topics and real-world applications across various disciplines. Mastering it here is crucial for future studies:

1.  **Multivariable Calculus (Calculus III):** This is the direct next step. You'll learn to optimize functions of multiple variables ($f(x,y)$ or $f(x,y,z)$).
    *   **Partial Derivatives:** Instead of $f'(x)$, you'll use partial derivatives ($\frac{\partial f}{\partial x}$, $\frac{\partial f}{\partial y}$) to find critical points.
    *   **Hessian Matrix:** The Second Derivative Test generalizes to the Hessian matrix to classify critical points (local max, min, or saddle point).
    *   **Lagrange Multipliers:** This powerful technique is specifically for *constrained* optimization problems with multiple variables, where direct substitution (like we did in single-variable optimization) is often impossible or too complex. It's a cornerstone of economics, physics, and engineering.
2.  **Numerical Optimization:** Many real-world optimization problems are too complex to solve analytically (i.e., finding an exact solution using derivatives). Numerical optimization involves using iterative algorithms (like Gradient Descent, Newton's Method, Simulated Annealing) to approximate optimal solutions.
    *   This is fundamental in **Machine Learning** for training models by minimizing loss functions.
    *   Used in **Operations Research** for logistics, resource allocation, and scheduling.
3.  **Calculus of Variations:** This advanced field deals with optimizing "functionals" (functions of functions), rather than just functions of variables. It asks questions like: "What path minimizes the travel time for light?" or "What shape encloses the maximum area for a given perimeter?" (leading to the brachistochrone problem and isoperimetric problems).
    *   Central to **Theoretical Physics** (e.g., Principle of Least Action, deriving Euler-Lagrange equations).
4.  **Differential Equations:** Optimization principles can sometimes be used to derive or understand solutions to differential equations, especially in physics and engineering.
5.  **Economics:** Optimization is at the core of microeconomics. Firms optimize profit, consumers optimize utility, and governments optimize social welfare, all using calculus-based optimization.
6.  **Engineering Design:** From designing efficient engines to stable structures, engineers constantly optimize parameters for performance, cost, and safety.
7.  **Computer Graphics and Robotics:** Path planning for robots, rendering efficient graphics, and physics simulations all rely on optimization techniques.

In essence, optimization is the mathematical language of "best possible outcomes." Wherever a decision needs to be made to achieve a goal most effectively, optimization principles are at play.

## 11. Self-check questions

These questions are designed to test your understanding, ranging from conceptual recall to applying the steps in a new context. Do not look for answers; attempt them fully.

1.  **Conceptual Understanding:** Explain in your own words why setting the first derivative to zero is a crucial step in finding extrema. What other points must always be considered when searching for an absolute extremum on a closed interval, and why?
2.  **Basic Application (Unconstrained):** Find the positive number $x$ such that the sum of $x$ and its reciprocal is minimized.
3.  **Geometry Problem (Constrained):** A piece of wire 10 meters long is cut into two pieces. One piece is bent into a square and the other is bent into a circle. How should the wire be cut so that the total area enclosed by both shapes is:
    a) A maximum?
    b) A minimum?
4.  **Cost Optimization:** A company manufactures cylindrical containers. The material for the top and bottom costs $5 per square meter, and the material for the side costs $3 per square meter. If the container must have a volume of $200 \text{ m}^3$, find the radius and height that minimize the total cost of the materials.
5.  **Rate/Distance Problem (Advanced):** A power station is located on one side of a river that is 0.5 miles wide. A factory is 3 miles downstream on the opposite side. The cost to run power lines over land is $6000 per mile, and the cost to run lines under the river is $10,000 per mile. What path should the power line take to minimize the total cost? (Assume the power line runs straight from the power station to a point on the