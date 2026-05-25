## 1. What it is — in plain English

Imagine you have a curvy path drawn on a piece of paper, and you want to find the exact area enclosed between this path and a straight line (like the x-axis). If the path were a simple shape, like a rectangle or a triangle, you'd just use a basic geometry formula. But what if it's not? What if it's a wavy line or a parabola?

This is where Riemann sums come in. They give us a way to *estimate* that area. The core idea is to chop the complicated curvy area into many thin, simple rectangles. We know how to find the area of a rectangle (width times height!), so we find the area of each little rectangle and then add them all up. This sum gives us an approximation of the total area.

The clever part is that the more rectangles you use, and the thinner you make them, the better your approximation becomes. If you use an infinite number of infinitely thin rectangles, your approximation becomes perfectly accurate, giving you the *exact* area. This exact area is what we call the "definite integral."

So, a Riemann sum is just the sum of the areas of those approximating rectangles. The "definite integral" is what you get when you take that sum and push it to the limit, making the rectangles infinitesimally thin. It's the bridge from estimating to exactness.

## 2. Why it matters — real-world applications

The ability to calculate the exact area under a curve, or the definite integral, is fundamental across almost all scientific and engineering disciplines. Riemann sums provide the conceptual and computational basis for understanding this power.

1.  **Physics and Engineering — Total Work Done or Distance Traveled**:
    *   **Application**: If a variable force acts on an object over a distance (e.g., stretching a spring, pushing a rocket against air resistance), the *total work done* is the area under the force-distance curve. Similarly, if you know an object's velocity over time, the *total distance traveled* is the area under the velocity-time curve.
    *   **Example**: NASA engineers designing a new propulsion system might need to calculate the total impulse (change in momentum) delivered by a rocket engine where thrust varies over time. This is the integral of the thrust function over the burn time. Riemann sums are the conceptual foundation for understanding how to sum up the tiny impulses from each moment.
2.  **Economics and Finance — Total Profit/Cost or Consumer/Producer Surplus**:
    *   **Application**: In economics, the area under a marginal cost curve gives the total cost, and the area under a marginal revenue curve gives total revenue. The area between supply and demand curves and the equilibrium point represents consumer or producer surplus.
    *   **Example**: A financial analyst at Goldman Sachs might use integral calculus (derived from Riemann sums) to calculate the total accumulated profit from an investment where the profit rate changes continuously over a period, or to estimate the total cost of a project with a variable rate of expenditure.
3.  **Computer Graphics and Machine Learning — Probability and Optimization**:
    *   **Application**: In machine learning, probability density functions (PDFs) describe the likelihood of a continuous random variable taking on a certain value. The probability of the variable falling within a certain range is the area under the PDF curve for that range. Integrals are also crucial in optimizing complex models.
    *   **Example**: When training a neural network model for image recognition at Google, the "loss function" (which measures how good the model is) often involves integrals. Calculating the expected value of a feature, or the total probability of an event, requires integrating probability distributions. Riemann sums underpin the numerical integration techniques used when analytical solutions are impossible.
4.  **Environmental Science — Total Pollution or Resource Consumption**:
    *   **Application**: Scientists might need to calculate the total amount of a pollutant released into a river over a period, given a varying discharge rate, or the total resource consumption from a factory over time.
    *   **Example**: Environmental engineers at the EPA might monitor the rate of CO2 emissions from a power plant, which fluctuates throughout the day. To determine the total CO2 emitted over a week, they would integrate the emission rate function over time. Riemann sums give them the conceptual tool to understand how to sum up the emissions from each small time interval.

## 3. Prerequisites — what you must know first

Before diving deep into Riemann sums and the formal definition of the definite integral, ensure you have a solid grasp of these foundational concepts:

*   **Functions**: Understanding what a function is, how to evaluate $f(x)$ for a given $x$, and how to graph common functions (linear, quadratic, trigonometric, exponential).
*   **Limits**: A firm grasp of the concept of a limit, particularly $\lim_{n \to \infty}$, and how to evaluate basic limits. This is crucial for understanding how Riemann sums become exact integrals.
*   **Summation Notation ($\Sigma$)**: Familiarity with sigma notation, including how to expand a sum, common summation formulas (e.g., $\sum_{i=1}^n c$, $\sum_{i=1}^n i$, $\sum_{i=1}^n i^2$), and properties of sums.
*   **Area of a Rectangle**: The simple formula $A = \text{width} \times \text{height}$. This is the fundamental building block.
*   **Interval Notation**: Understanding $[a, b]$ as a closed interval from $a$ to $b$.
*   **Basic Algebra**: Proficiency in algebraic manipulation, including simplifying expressions, factoring, and solving equations.

## 4. The core idea — step by step

Let's break down the concept of Riemann sums and the definite integral, building intuition piece by piece. Our goal is to find the area under a continuous function $f(x)$ from $x=a$ to $x=b$.

### Step 1: The Problem — Approximating the Area Under a Curve

*   **Plain English**: We want to find the area of a region that has a curved boundary. Imagine a hill profile and you want to know how much land is under it, down to the ground level. We don't have a simple formula for such a shape.
*   **Small Concrete Example**: Consider the function $f(x) = x^2$ on the interval $[0, 1]$. We want to find the area bounded by $y=x^2$, the x-axis, $x=0$, and $x=1$. This is a curved region.
*   **Formal/Mathematical Version**: We are trying to compute the value of the definite integral $\int_a^b f(x) \, dx$. At this stage, we don't know how to compute it directly, so we're looking for an approximation method.
*   **What Could Go Wrong**: Assuming that simply drawing a straight line between the endpoints of the curve and finding the area of the resulting trapezoid will be accurate enough. This works for some functions (like linear ones) but is generally a poor approximation for curves.

### Step 2: Divide the Interval into Subintervals

*   **Plain English**: Since we can't find the area of the whole curvy region directly, let's break it into smaller, manageable pieces. We'll divide the total width of our region (from $a$ to $b$) into several equally sized smaller segments. Each segment will form the base of one of our approximating rectangles.
*   **Small Concrete Example**: For $f(x) = x^2$ on $[0, 1]$, let's divide the interval into $n=4$ equal subintervals. These would be $[0, 0.25]$, $[0.25, 0.5]$, $[0.5, 0.75]$, and $[0.75, 1]$.
*   **Formal/Mathematical Version**: We partition the interval $[a, b]$ into $n$ subintervals of equal width. Let $x_0 = a$, $x_1$, $x_2$, ..., $x_n = b$ be the endpoints of these subintervals. Each subinterval is $[x_{i-1}, x_i]$ for $i=1, 2, ..., n$.
*   **What Could Go Wrong**: Not dividing the interval into *equal* widths, which complicates the calculation significantly and doesn't align with the standard Riemann sum definition.

### Step 3: Determine the Width of Each Subinterval ($\Delta x$)

*   **Plain English**: How wide is each of those small segments we just created? Since we divided the total length $(b-a)$ into $n$ equal pieces, each piece must have a width equal to the total length divided by the number of pieces.
*   **Small Concrete Example**: For $f(x) = x^2$ on $[0, 1]$ with $n=4$:
    The total length is $b-a = 1-0 = 1$.
    The width of each subinterval is $\Delta x = \frac{1}{4} = 0.25$.
*   **Formal/Mathematical Version**: The width of each subinterval, denoted by $\Delta x$, is given by:
    $$ \Delta x = \frac{b-a}{n} $$
    The endpoints of the subintervals can then be expressed as $x_i = a + i \Delta x$ for $i=0, 1, ..., n$.
*   **What Could Go Wrong**: Forgetting to subtract $a$ from $b$ (i.e., using $b/n$ instead of $(b-a)/n$) or incorrectly calculating the total length of the interval.

### Step 4: Choose the Height of Each Rectangle (Sample Points)

*   **Plain English**: Now we have the base (width) for each rectangle. But what about its height? Since the top of our region is curved, we need to pick a single height for each rectangle that somehow "represents" the curve over that small segment. There are several common ways to do this:
    *   **Left Riemann Sum (LRS)**: Use the function's value at the *left endpoint* of each subinterval as the height. This often underestimates an increasing function and overestimates a decreasing function.
    *   **Right Riemann Sum (RRS)**: Use the function's value at the *right endpoint* of each subinterval as the height. This often overestimates an increasing function and underestimates a decreasing function.
    *   **Midpoint Riemann Sum (MRS)**: Use the function's value at the *midpoint* of each subinterval as the height. This often provides a more accurate approximation than left or right sums.

*   **Small Concrete Example**: For $f(x) = x^2$ on $[0, 1]$ with $n=4$ and $\Delta x = 0.25$:
    The subintervals are $[0, 0.25]$, $[0.25, 0.5]$, $[0.5, 0.75]$, $[0.75, 1]$.
    *   **Left Endpoints**: $x_0^* = 0$, $x_1^* = 0.25$, $x_2^* = 0.5$, $x_3^* = 0.75$.
        Heights: $f(0)$, $f(0.25)$, $f(0.5)$, $f(0.75)$.
    *   **Right Endpoints**: $x_1^* = 0.25$, $x_2^* = 0.5$, $x_3^* = 0.75$, $x_4^* = 1$.
        Heights: $f(0.25)$, $f(0.5)$, $f(0.75)$, $f(1)$.
    *   **Midpoints**: $x_1^* = \frac{0+0.25}{2} = 0.125$, $x_2^* = \frac{0.25+0.5}{2} = 0.375$, etc.
        Heights: $f(0.125)$, $f(0.375)$, $f(0.625)$, $f(0.875)$.

*   **Formal/Mathematical Version**: For each subinterval $[x_{i-1}, x_i]$, we choose a sample point $x_i^*$.
    *   **Left Endpoint**: $x_i^* = x_{i-1} = a + (i-1)\Delta x$
    *   **Right Endpoint**: $x_i^* = x_i = a + i\Delta x$
    *   **Midpoint**: $x_i^* = \frac{x_{i-1} + x_i}{2} = a + (i - \frac{1}{2})\Delta x$
    The height of the $i$-th rectangle is then $f(x_i^*)$.

*   **What Could Go Wrong**: Using the wrong index for the sample point (e.g., for a left sum, using $x_i$ instead of $x_{i-1}$), or incorrectly calculating the midpoint.

### Step 5: Sum the Areas of All Rectangles

*   **Plain English**: Now that we have the width and height for each rectangle, we calculate the area of each one (width $\times$ height) and then add all these individual areas together. This sum is our Riemann sum approximation.
*   **Small Concrete Example**: For $f(x) = x^2$ on $[0, 1]$ with $n=4$ and $\Delta x = 0.25$.
    Let's use the **Right Riemann Sum**:
    Rect 1: Base $[0, 0.25]$, height $f(0.25) = (0.25)^2 = 0.0625$. Area $= 0.0625 \times 0.25 = 0.015625$.
    Rect 2: Base $[0.25, 0.5]$, height $f(0.5) = (0.5)^2 = 0.25$. Area $= 0.25 \times 0.25 = 0.0625$.
    Rect 3: Base $[0.5, 0.75]$, height $f(0.75) = (0.75)^2 = 0.5625$. Area $= 0.5625 \times 0.25 = 0.140625$.
    Rect 4: Base $[0.75, 1]$, height $f(1) = (1)^2 = 1$. Area $= 1 \times 0.25 = 0.25$.
    Total RRS Area $= 0.015625 + 0.0625 + 0.140625 + 0.25 = 0.46875$.

*   **Formal/Mathematical Version**: The Riemann sum, $R_n$, is the sum of the areas of the $n$ rectangles:
    $$ R_n = \sum_{i=1}^n f(x_i^*) \Delta x $$
    where $x_i^*$ is the chosen sample point in the $i$-th subinterval.
*   **What Could Go Wrong**: Arithmetic errors in calculating $f(x_i^*)$ or in summing the terms. Forgetting to multiply each $f(x_i^*)$ by $\Delta x$.

### Step 6: Take the Limit — The Formal Definition of the Definite Integral

*   **Plain English**: We've approximated the area with a finite number of rectangles. The approximation gets better as we use more rectangles (i.e., as $n$ increases) because the "gaps" or "overlaps" between the rectangles and the curve become smaller. To get the *exact* area, we imagine making the number of rectangles infinitely large ($n \to \infty$). As $n$ goes to infinity, $\Delta x$ goes to zero, meaning the rectangles become infinitely thin. At this point, the sum of the areas of these infinitely thin rectangles becomes the true area under the curve.
*   **Small Concrete Example**: For $f(x) = x^2$ on $[0, 1]$, we found an RRS of $0.46875$ for $n=4$. If we calculated it for $n=100$, it would be even closer to the true value. The true area is $1/3 \approx 0.3333...$. The limit as $n \to \infty$ of our Riemann sum will give us exactly $1/3$.
*   **Formal/Mathematical Version**: The definite integral of $f(x)$ from $a$ to $b$ is defined as the limit of the Riemann sums:
    $$ \int_a^b f(x) \, dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \Delta x $$
    provided this limit exists and is the same regardless of the choice of sample points $x_i^*$. If this limit exists, we say $f$ is *integrable* on $[a, b]$. For continuous functions, this limit always exists.
*   **What Could Go Wrong**: Not understanding that the limit is what transforms the approximation into an exact value. Misinterpreting the meaning of $n \to \infty$ or incorrectly applying summation formulas and limit properties.

## 5. Worked examples — multiple, with every step shown

### Example 1: Estimate a simple integral using a Right Riemann Sum

**Problem**: Estimate the definite integral $\int_0^2 x \, dx$ using a Right Riemann Sum with $n=4$ subintervals.

**Given**:
*   Function: $f(x) = x$
*   Interval: $[a, b] = [0, 2]$
*   Number of subintervals: $n=4$
*   Method: Right Riemann Sum

**What we want**: The approximate value of the integral using the specified method.

**Step-by-step solution**:

1.  **Calculate $\Delta x$**:
    $$ \Delta x = \frac{b-a}{n} $$
    $$ \Delta x = \frac{2-0}{4} $$
    $$ \Delta x = \frac{2}{4} = 0.5 $$
    *Explanation*: We find the width of each rectangle by dividing the total length of the interval by the number of rectangles.

2.  **Determine the subinterval endpoints**:
    $x_0 = a = 0$
    $x_1 = a + 1\Delta x = 0 + 1(0.5) = 0.5$
    $x_2 = a + 2\Delta x = 0 + 2(0.5) = 1.0$
    $x_3 = a + 3\Delta x = 0 + 3(0.5) = 1.5$
    $x_4 = b = a + 4\Delta x = 0 + 4(0.5) = 2.0$
    The subintervals are $[0, 0.5]$, $[0.5, 1.0]$, $[1.0, 1.5]$, $[1.5, 2.0]$.
    *Explanation*: We list out the points that divide our interval into the $n$ equal segments.

3.  **Identify the sample points ($x_i^*$) for a Right Riemann Sum**:
    For a Right Riemann Sum, we use the right endpoint of each subinterval.
    $x_1^* = x_1 = 0.5$
    $x_2^* = x_2 = 1.0$
    $x_3^* = x_3 = 1.5$
    $x_4^* = x_4 = 2.0$
    *Explanation*: We select the specific x-values within each subinterval that will determine the height of our rectangles. For a right sum, these are the rightmost x-values in each segment.

4.  **Evaluate the function at each sample point ($f(x_i^*)$)**:
    $f(x_1^*) = f(0.5) = 0.5$
    $f(x_2^*) = f(1.0) = 1.0$
    $f(x_3^*) = f(1.5) = 1.5$
    $f(x_4^*) = f(2.0) = 2.0$
    *Explanation*: We calculate the height of each rectangle by plugging the chosen sample point into the function.

5.  **Calculate the area of each rectangle and sum them**:
    Right Riemann Sum $= \sum_{i=1}^4 f(x_i^*) \Delta x$
    $= f(0.5)\Delta x + f(1.0)\Delta x + f(1.5)\Delta x + f(2.0)\Delta x$
    $= (0.5)(0.5) + (1.0)(0.5) + (1.5)(0.5) + (2.0)(0.5)$
    $= 0.25 + 0.5 + 0.75 + 1.0$
    $= 2.5$
    *Explanation*: We multiply each rectangle's height by its width ($\Delta x$) to get its area, then add all these individual areas together to get the total approximate area.

**Final Answer**: The estimated value of $\int_0^2 x \, dx$ using a Right Riemann Sum with $n=4$ is $\boxed{2.5}$.

**Reflection**: This example was straightforward because $f(x)=x$ is a simple linear function. Geometrically, the area under $f(x)=x$ from $0$ to $2$ is a triangle with base $2$ and height $2$, so its exact area is $\frac{1}{2} \times 2 \times 2 = 2$. Our approximation of $2.5$ is an overestimate, which is typical for a right Riemann sum on an increasing function.

---

### Example 2: Estimate a reciprocal integral using a Left Riemann Sum

**Problem**: Estimate $\int_1^3 \frac{1}{x} \, dx$ using a Left Riemann Sum with $n=3$ subintervals.

**Given**:
*   Function: $f(x) = \frac{1}{x}$
*   Interval: $[a, b] = [1, 3]$
*   Number of subintervals: $n=3$
*   Method: Left Riemann Sum

**What we want**: The approximate value of the integral using the specified method.

**Step-by-step solution**:

1.  **Calculate $\Delta x$**:
    $$ \Delta x = \frac{b-a}{n} $$
    $$ \Delta x = \frac{3-1}{3} $$
    $$ \Delta x = \frac{2}{3} $$
    *Explanation*: We determine the uniform width for each of our three approximating rectangles.

2.  **Determine the subinterval endpoints**:
    $x_0 = a = 1$
    $x_1 = a + 1\Delta x = 1 + \frac{2}{3} = \frac{5}{3}$
    $x_2 = a + 2\Delta x = 1 + 2\left(\frac{2}{3}\right) = 1 + \frac{4}{3} = \frac{7}{3}$
    $x_3 = b = a + 3\Delta x = 1 + 3\left(\frac{2}{3}\right) = 1 + 2 = 3$
    The subintervals are $[1, \frac{5}{3}]$, $[\frac{5}{3}, \frac{7}{3}]$, $[\frac{7}{3}, 3]$.
    *Explanation*: We define the boundaries of each of the three subintervals.

3.  **Identify the sample points ($x_i^*$) for a Left Riemann Sum**:
    For a Left Riemann Sum, we use the left endpoint of each subinterval.
    $x_1^* = x_0 = 1$
    $x_2^* = x_1 = \frac{5}{3}$
    $x_3^* = x_2 = \frac{7}{3}$
    *Explanation*: We choose the x-value at the left side of each subinterval to set the height of the corresponding rectangle.

4.  **Evaluate the function at each sample point ($f(x_i^*)$)**:
    $f(x_1^*) = f(1) = \frac{1}{1} = 1$
    $f(x_2^*) = f(\frac{5}{3}) = \frac{1}{5/3} = \frac{3}{5}$
    $f(x_3^*) = f(\frac{7}{3}) = \frac{1}{7/3} = \frac{3}{7}$
    *Explanation*: We calculate the height of each rectangle by substituting the chosen left endpoint into the function $f(x) = 1/x$.

5.  **Calculate the area of each rectangle and sum them**:
    Left Riemann Sum $= \sum_{i=1}^3 f(x_i^*) \Delta x$
    $= f(1)\Delta x + f(\frac{5}{3})\Delta x + f(\frac{7}{3})\Delta x$
    $= (1)\left(\frac{2}{3}\right) + \left(\frac{3}{5}\right)\left(\frac{2}{3}\right) + \left(\frac{3}{7}\right)\left(\frac{2}{3}\right)$
    Factor out $\Delta x = \frac{2}{3}$:
    $= \frac{2}{3} \left(1 + \frac{3}{5} + \frac{3}{7}\right)$
    Find a common denominator for the terms in the parenthesis (LCD = $5 \times 7 = 35$):
    $= \frac{2}{3} \left(\frac{35}{35} + \frac{21}{35} + \frac{15}{35}\right)$
    $= \frac{2}{3} \left(\frac{35+21+15}{35}\right)$
    $= \frac{2}{3} \left(\frac{71}{35}\right)$
    $= \frac{142}{105}$
    As a decimal: $\approx 1.35238$
    *Explanation*: We sum the products of height and width for each rectangle. Factoring out $\Delta x$ can simplify the arithmetic, especially when dealing with fractions.

**Final Answer**: The estimated value of $\int_1^3 \frac{1}{x} \, dx$ using a Left Riemann Sum with $n=3$ is $\boxed{\frac{142}{105}}$.

**Reflection**: The function $f(x)=1/x$ is decreasing on $[1,3]$. A Left Riemann Sum for a decreasing function typically overestimates the true integral value. The exact value of this integral is $\ln(3) - \ln(1) = \ln(3) \approx 1.0986$. Our approximation of $1.35238$ is indeed an overestimate.

---

### Example 3: Estimate a trigonometric integral using a Midpoint Riemann Sum

**Problem**: Estimate $\int_0^\pi \sin(x) \, dx$ using a Midpoint Riemann Sum with $n=2$ subintervals.

**Given**:
*   Function: $f(x) = \sin(x)$
*   Interval: $[a, b] = [0, \pi]$
*   Number of subintervals: $n=2$
*   Method: Midpoint Riemann Sum

**What we want**: The approximate value of the integral using the specified method.

**Step-by-step solution**:

1.  **Calculate $\Delta x$**:
    $$ \Delta x = \frac{b-a}{n} $$
    $$ \Delta x = \frac{\pi-0}{2} $$
    $$ \Delta x = \frac{\pi}{2} $$
    *Explanation*: We find the width of each of the two rectangles.

2.  **Determine the subinterval endpoints**:
    $x_0 = a = 0$
    $x_1 = a + 1\Delta x = 0 + \frac{\pi}{2} = \frac{\pi}{2}$
    $x_2 = b = a + 2\Delta x = 0 + 2\left(\frac{\pi}{2}\right) = \pi$
    The subintervals are $[0, \frac{\pi}{2}]$ and $[\frac{\pi}{2}, \pi]$.
    *Explanation*: We identify the boundaries of our two subintervals.

3.  **Identify the sample points ($x_i^*$) for a Midpoint Riemann Sum**:
    For a Midpoint Riemann Sum, we use the midpoint of each subinterval.
    $x_1^* = \frac{x_0 + x_1}{2} = \frac{0 + \pi/2}{2} = \frac{\pi}{4}$
    $x_2^* = \frac{x_1 + x_2}{2} = \frac{\pi/2 + \pi}{2} = \frac{3\pi/2}{2} = \frac{3\pi}{4}$
    *Explanation*: We calculate the midpoint x-value for each subinterval, which will be used to determine the rectangle's height.

4.  **Evaluate the function at each sample point ($f(x_i^*)$)**:
    $f(x_1^*) = f(\frac{\pi}{4}) = \sin(\frac{\pi}{4}) = \frac{\sqrt{2}}{2}$
    $f(x_2^*) = f(\frac{3\pi}{4}) = \sin(\frac{3\pi}{4}) = \frac{\sqrt{2}}{2}$
    *Explanation*: We plug the midpoint x-values into the function $f(x) = \sin(x)$ to get the heights of the rectangles.

5.  **Calculate the area of each rectangle and sum them**:
    Midpoint Riemann Sum $= \sum_{i=1}^2 f(x_i^*) \Delta x$
    $= f(\frac{\pi}{4})\Delta x + f(\frac{3\pi}{4})\Delta x$
    $= \left(\frac{\sqrt{2}}{2}\right)\left(\frac{\pi}{2}\right) + \left(\frac{\sqrt{2}}{2}\right)\left(\frac{\pi}{2}\right)$
    $= 2 \left(\frac{\sqrt{2}}{2}\right)\left(\frac{\pi}{2}\right)$
    $= \frac{\sqrt{2}\pi}{2}$
    As a decimal: $\approx 2.2214$
    *Explanation*: We multiply each height by the common width $\Delta x$ and add the results to find the total approximate area.

**Final Answer**: The estimated value of $\int_0^\pi \sin(x) \, dx$ using a Midpoint Riemann Sum with $n=2$ is $\boxed{\frac{\sqrt{2}\pi}{2}}$.

**Reflection**: The exact value of $\int_0^\pi \sin(x) \, dx = [-\cos(x)]_0^\pi = -\cos(\pi) - (-\cos(0)) = -(-1) - (-1) = 1+1=2$. Our approximation of $\frac{\sqrt{2}\pi}{2} \approx 2.2214$ is quite close, even with only two subintervals. Midpoint Riemann sums are generally more accurate than left or right sums for the same number of subintervals.

---

### Example 4: Express a definite integral as a limit of Riemann sums

**Problem**: Express the definite integral $\int_2^5 (x^2 - x) \, dx$ as a limit of Riemann sums, using right endpoints. Do not evaluate the limit.

**Given**:
*   Function: $f(x) = x^2 - x$
*   Interval: $[a, b] = [2, 5]$
*   Method: Right Riemann Sum
*   Goal: Express as $\lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \Delta x$

**What we want**: The symbolic expression of the integral as a limit of a sum, with all components defined in terms of $n$ and $i$.

**Step-by-step solution**:

1.  **Define $\Delta x$**:
    $$ \Delta x = \frac{b-a}{n} $$
    $$ \Delta x = \frac{5-2}{n} $$
    $$ \Delta x = \frac{3}{n} $$
    *Explanation*: We express the width of each infinitesimally thin rectangle in terms of $n$, the number of subintervals. As $n \to \infty$, $\Delta x \to 0$.

2.  **Define the right endpoints $x_i^*$**:
    For a Right Riemann Sum, $x_i^* = a + i\Delta x$.
    Substitute $a=2$ and $\Delta x = \frac{3}{n}$:
    $$ x_i^* = 2 + i\left(\frac{3}{n}\right) $$
    $$ x_i^* = 2 + \frac{3i}{n} $$
    *Explanation*: We find a general expression for the x-coordinate of the right endpoint of the $i$-th subinterval. This coordinate depends on the starting point $a$, the index $i$, and the width $\Delta x$.

3.  **Evaluate the function at the right endpoints $f(x_i^*)$**:
    Substitute $x_i^*$ into $f(x) = x^2 - x$:
    $$ f(x_i^*) = \left(2 + \frac{3i}{n}\right)^2 - \left(2 + \frac{3i}{n}\right) $$
    Expand the square:
    $$ = \left(4 + 2\left(\frac{3i}{n}\right) + \left(\frac{3i}{n}\right)^2\right) - \left(2 + \frac{3i}{n}\right) $$
    $$ = \left(4 + \frac{6i}{n} + \frac{9i^2}{n^2}\right) - \left(2 + \frac{3i}{n}\right) $$
    Combine terms:
    $$ = 4 + \frac{6i}{n} + \frac{9i^2}{n^2} - 2 - \frac{3i}{n} $$
    $$ = 2 + \frac{3i}{n} + \frac{9i^2}{n^2} $$
    *Explanation*: We substitute the general expression for $x_i^*$ into the given function to get a general expression for the height of the $i$-th rectangle. This expression is crucial for the summation.

4.  **Formulate the Riemann sum**:
    The Riemann sum is $\sum_{i=1}^n f(x_i^*) \Delta x$.
    Substitute $f(x_i^*)$ and $\Delta x$:
    $$ \sum_{i=1}^n \left(2 + \frac{3i}{n} + \frac{9i^2}{n^2}\right) \left(\frac{3}{n}\right) $$
    *Explanation*: We combine the height $f(x_i^*)$ and width $\Delta x$ into the summation notation, representing the sum of the areas of all $n$ rectangles.

5.  **Express the definite integral as the limit of the Riemann sum**:
    $$ \int_2^5 (x^2 - x) \, dx = \lim_{n \to \infty} \sum_{i=1}^n \left(2 + \frac{3i}{n} + \frac{9i^2}{n^2}\right) \left(\frac{3}{n}\right) $$
    *Explanation*: This is the formal definition. By taking the limit as $n$ approaches infinity, we transition from an approximation (the Riemann sum) to the exact value of the definite integral.

**Final Answer**: The definite integral $\int_2^5 (x^2 - x) \, dx$ expressed as a limit of Riemann sums using right endpoints is:
$$ \boxed{\lim_{n \to \infty} \sum_{i=1}^n \left(2 + \frac{3i}{n} + \frac{9i^2}{n^2}\right) \left(\frac{3}{n}\right)} $$

**Reflection**: This example is harder because it requires symbolic manipulation and a firm understanding of how each component of the Riemann sum (especially $x_i^*$) is expressed in terms of $n$ and $i$. The key is to systematically replace $a$, $b$, $f(x)$, and the choice of endpoint into the general formulas for $\Delta x$ and $x_i^*$, and then substitute these into the sum. This form is what you would then use with summation formulas (like $\sum i$ and $\sum i^2$) to actually evaluate the limit, but the problem only asked for the expression.

## 6. Common mistakes and traps

1.  **Incorrect $\Delta x$ Calculation**: Forgetting to subtract $a$ from $b$ (e.g., using $b/n$ instead of $(b-a)/n$) or making arithmetic errors in the subtraction. This throws off all subsequent calculations.
2.  **Wrong Sample Points ($x_i^*$)**:
    *   **Left vs. Right**: Confusing $x_{i-1}$ for left endpoints with $x_i$ for right endpoints. A left sum starts with $f(x_0)$ and ends with $f(x_{n-1})$, while a right sum starts with $f(x_1)$ and ends with $f(x_n)$.
    *   **Midpoint Errors**: Incorrectly calculating the midpoint, often by just taking the average of $a$ and $b$ for all intervals instead of the average of $x_{i-1}$ and $x_i$ for each specific interval.
3.  **Forgetting to Multiply by $\Delta x$**: Students sometimes sum just the $f(x_i^*)$ values and forget that each height must be multiplied by the width $\Delta x$ to form the area of a rectangle. The $\Delta x$ is a common factor in the sum, so it can be factored out, but it must be present.
4.  **Sign Errors with Negative Function Values**: If $f(x)$ is negative over some part of the interval, the "area" contribution from that part will be negative. The definite integral calculates *net signed area*. Students sometimes incorrectly take absolute values, which would calculate total area.
5.  **Algebraic Errors in Summation Formulas**: When evaluating the limit of a Riemann sum (which was not done in the examples but is the next step), students often make errors in using the summation formulas for $\sum i$, $\sum i^2$, etc., or in simplifying the resulting expressions as $n \to \infty$.
6.  **Confusing Definite Integral with Indefinite Integral**: The definite integral $\int_a^b f(x) \, dx$ evaluates to a single number (the net signed area), while the indefinite integral $\int f(x) \, dx$ evaluates to a family of functions (the antiderivative). Riemann sums are specifically for the definite integral.

## 7. Textbook-precise explanation

The concept of the definite integral is built upon a more rigorous foundation involving partitions and the limit of Riemann sums. This formal definition ensures that the integral is well-defined for a broad class of functions.

Let $f$ be a function defined on the closed interval $[a, b]$.

1.  **Partition**: A **partition** $P$ of $[a, b]$ is a finite sequence of points $x_0, x_1, x_2, \dots, x_n$ such that
    $$ a = x_0 < x_1 < x_2 < \dots < x_n = b $$
    These points divide $[a, b]$ into $n$ subintervals $[x_{i-1}, x_i]$ for $i=1, 2, \dots, n$.

2.  **Width of Subintervals**: The length of the $i$-th subinterval is $\Delta x_i = x_i - x_{i-1}$.
    In the context of standard Riemann sums, we often assume a **regular partition**, where all subintervals have equal width:
    $$ \Delta x = \frac{b-a}{n} $$
    In this case, $x_i = a + i\Delta x$.

3.  **Sample Points**: In each subinterval $[x_{i-1}, x_i]$, we choose an arbitrary point $x_i^*$, called a **sample point**.
    *   For a Left Riemann Sum, $x_i^* = x_{i-1}$.
    *   For a Right Riemann Sum, $x_i^* = x_i$.
    *   For a Midpoint Riemann Sum, $x_i^* = \frac{x_{i-1} + x_i}{2}$.

4.  **Riemann Sum**: For a given partition $P$ and a choice of sample points $x_i^*$, the **Riemann sum** is defined as:
    $$ R_P = \sum_{i=1}^n f(x_i^*) \Delta x_i $$
    If we use a regular partition, this simplifies to:
    $$ R_n = \sum_{i=1}^n f(x_i^*) \Delta x $$

5.  **Norm of a Partition**: The **norm** of the partition $P$, denoted by $||P||$, is the length of the longest subinterval: $||P|| = \max_{1 \le i \le n} \Delta x_i$.

6.  **Formal Definition of the Definite Integral**: The **definite integral** of $f$ from $a$ to $b$ is defined as the limit of the Riemann sums as the norm of the partition approaches zero (which implies the number of subintervals $n$ approaches infinity):
    $$ \int_a^b f(x) \, dx = \lim_{||P|| \to 0} \sum_{i=1}^n f(x_i^*) \Delta x_i $$
    If this limit exists, we say that $f$ is **integrable** on $[a, b]$. For continuous functions on a closed interval $[a, b]$, this limit always exists, and the value of the limit is independent of the choice of sample points $x_i^*$.

(Adapted from: Stewart, James. *Calculus: Early Transcendentals*. 9th ed. Cengage Learning, 2021. Chapter 5.2, "The Definite Integral")

## 8. ASCII diagrams

Here's an ASCII diagram illustrating a Left Riemann Sum for a function $f(x)$ on an interval $[a, b]$ with $n=4$ subintervals.

```text
       ^ y
       |
       |     .---f(x)---.
       |    /            \
       |   /              \
       |  /                \
       | |                  |
       | |                  |
       +---------------------------------> x
       a x1  x2  x3  b
       | |   |   |   |
       |<---->| Delta x
       |  |   |   |   |
       |  |   |   |   |
       |  |   |   |   |
       |  |   |   |   |
       |  |   |   |   |
       |  |   |   |   |
       +--+---+---+---+--
       |  |   |   |   |
       |  |   |   |   |
       |  |   |   |   |
       |  |   |   |   |
       +--+---+---+---+--
       |<--->|
       x_0 x_1
       f(x_0) is height of 1st rect.
       f(x_1) is height of 2nd rect.
       f(x_2) is height of 3rd rect.
       f(x_3) is height of 4th rect.

Description:
The x-axis represents the interval [a, b].
The curve represents the function f(x).
The interval [a, b] is divided into 4 equal subintervals by points a, x1, x2, x3, b.
The width of each subinterval is Delta x.
For each subinterval, a rectangle is drawn whose height is determined by the function value at the LEFT endpoint of that subinterval.
The shaded areas represent the sum of these rectangles, which approximates the area under the curve.
Notice how the rectangles might under- or overestimate the true area, depending on the curve's behavior.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook**:
    *   **"Area is a SUM of RECTANGLES, getting infinitely THIN."**
    *   **Visual**: Imagine slicing a loaf of bread (the area under the curve) into many thin slices (rectangles). The thinner the slices, the more perfectly they approximate the original loaf. The "sum" is adding up all the slices, and the "limit" is what happens when those slices become impossibly thin. Think of a deli slicer making transparently thin cuts.

2.  **The 1-3 Formulas/Facts You MUST Overlearn**:
    *   **Width of Subintervals**: $\Delta x = \frac{b-a}{n}$
    *   **General Riemann Sum Structure**: $\sum_{i=1}^n f(x_i^*) \Delta x$ (Area = Sum of Height $\times$ Width)
    *   **Formal Definition of Definite Integral**: $\int_a^b f(x) \, dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \Delta x$

3.  **Spaced-Repetition Schedule**:
    *   **Today**: Review this lesson thoroughly. Work through the examples without looking at the solutions.
    *   **1 Day Later**: Redo one easy and one medium example. Write out the formal definition from memory.
    *   **3 Days Later**: Redo the hard example. Explain the difference between left, right, and midpoint sums to yourself aloud.
    *   **7 Days Later**: Solve a new problem from a textbook using all three Riemann sum types.
    *   **16 Days Later**: Re-derive the formal definition of the definite integral. Explain why the limit is necessary.
    *   **35 Days Later**: Focus on the connections this topic has to other areas of calculus.

4.  **First-Principles Re-derivation Pathway**:
    If you ever forget the formulas, here's how you can rebuild the concept from scratch:
    *   **Problem**: How to find the area under a curve $f(x)$ from $a$ to $b$?
    *   **Idea**: We can't use simple geometry. Let's approximate it.
    *   **Approximation Tool**: Rectangles are simple shapes whose area we know.
    *   **Step 1: Divide the Base**: Divide the interval $[a, b]$ into $n$ equal segments. Each segment has width $\Delta x = (b-a)/n$.
    *   **Step 2: Determine Rectangle Height**: For each segment, pick a representative height. The simplest choices are the function value at the left end, right end, or midpoint of the segment. Let's call this $f(x_i^*)$.
    *   **Step 3: Area of One Rectangle**: The area of the $i$-th rectangle is $f(x_i^*) \times \Delta x$.
    *   **Step 4: Sum All Rectangles**: The total approximate area is the sum of all these individual rectangle areas: $\sum_{i=1}^n f(x_i^*) \Delta x$.
    *   **Step 5: Achieve Exactness**: To get the *exact* area, we need to make the approximation perfect. This means using an infinite number of infinitely thin rectangles. So, take the limit as $n \to \infty$ (which means $\Delta x \to 0$).
    *   **Result**: $\int_a^b f(x) \, dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \Delta x$.

## 10. Connections — what this leads to

Understanding Riemann sums and the formal definition of the definite integral is a cornerstone of calculus. It directly unlocks or forms the basis for numerous advanced topics:

*   **The Fundamental Theorem of Calculus (FTC)**: This is the most direct and powerful consequence. The FTC Part 2 states that $\int_a^b f(x) \, dx = F(b) - F(a)$, where $F$ is any antiderivative of $f$. Riemann sums show *why* this area calculation is related to antiderivatives, even if they don't explicitly calculate them. The FTC provides a much more efficient way to evaluate definite integrals than taking limits of sums.
*   **Applications of Definite Integrals**: Once you can calculate definite integrals, a vast array of real-world problems become solvable:
    *   **Area between Curves**: Extending the idea of area under one curve.
    *   **Volumes of Solids of Revolution**: Using techniques like the disk/washer method or cylindrical shells, which are essentially Riemann sums in 3D.
    *   **Arc Length**: Calculating the length of a curve.
    *   **Surface Area of Solids of Revolution**: Finding the surface area of objects formed by rotating a curve.
    *   **Work Done by a Variable Force**: As discussed in applications.
    *   **Fluid Pressure and Force**: Calculating forces exerted by fluids.
    *   **Center of Mass/Centroids**: Finding the balance point of objects.
    *   **Probability**: Calculating probabilities for continuous random variables using probability density functions.
*   **Numerical Integration Techniques**: When an antiderivative cannot be found (i.e., the FTC cannot be directly applied), we rely on numerical methods to approximate definite integrals. The Trapezoidal Rule and Simpson's Rule are refined versions of Riemann sums, using trapezoids or parabolas instead of rectangles for better accuracy.
*   **Improper Integrals**: Extending the concept of definite integrals to intervals that are infinite or functions that have infinite discontinuities. The definition still relies on limits, but now of the integration bounds or points of discontinuity.
*   **Multivariable Calculus**: The concept of integrating over a region extends to higher dimensions. Double integrals and triple integrals are essentially multi-dimensional Riemann sums, summing up volumes of tiny rectangular prisms (or hyper-rectangles).
*   **Differential Equations**: Solutions to many differential equations involve integrals, and understanding the definite integral is crucial for interpreting these solutions.
*   **Fourier Analysis**: Representing functions as sums (or integrals) of sines and cosines, with coefficients determined by integrals.

## 11. Self-check questions

1.  Consider the function $f(x) = x^3$ on the interval $[0, 2]$.
    a.  Calculate $\Delta x$ for $n=4$ subintervals.
    b.  List the sample points $x_i^*$ for a Left Riemann Sum with $n=4$.
    c.  Calculate the Left Riemann Sum for $f(x)=x^3$ on $[0,2]$ with $n=4$.
2.  Estimate $\int_1^5 (4-x^2) \, dx$ using a Right Riemann Sum with $n=4$ subintervals. Be careful with negative values of the function.
3.  For the integral $\int_0^2 e^x \, dx$, use a Midpoint Riemann Sum with $n=2$ subintervals to approximate its value.
4.  Express the definite integral $\int_{-1}^3 (2x^2 + 5) \, dx$ as a limit of Riemann sums, using left endpoints. Ensure all components ($\Delta x$, $x_i^*$, $f(x_i^*)$) are clearly defined in terms of $n$ and $i$. Do not evaluate the limit.
5.  A car's velocity (in m/s) is given by $v(t) = 10t - t^2$ for $0 \le t \le 10$ seconds. Explain how you would use Riemann sums to estimate the total distance traveled by the car during the first 5 seconds. What would be the practical meaning of increasing the number of subintervals $n$?