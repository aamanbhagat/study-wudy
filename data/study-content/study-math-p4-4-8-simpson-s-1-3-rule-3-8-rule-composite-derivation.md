## 1. What it is — in plain English

Imagine you have a curvy line on a graph, and you want to find the exact area trapped underneath it, between two specific points. This is a common problem in math, and often, the curve is so complicated that you can't find the area using standard calculus formulas.

That's where "numerical integration" comes in. Instead of finding the *exact* area, we try to *estimate* it very accurately. Think of it like trying to measure the area of a puddle with an irregular shape. You could try to fit a bunch of tiny squares into it and count them, but that's tedious and not very precise.

Simpson's Rules are like using smarter, curvier shapes to fill that puddle. Instead of just squares (like the basic rectangle rule) or straight-edged trapezoids (like the trapezoidal rule), Simpson's 1/3 rule uses parabolas (curves that look like a 'U' or an upside-down 'U') to approximate the shape of your curvy line. Simpson's 3/8 rule goes a step further, using cubic curves (which can have more wiggles) for an even closer fit.

By fitting these parabolic or cubic "caps" over small sections of our original curvy line, and then adding up the areas of all these caps, we can get a very good estimate of the total area under the curve. The "composite" part just means we're doing this many, many times over small segments and adding them all up to cover the entire range we're interested in. It's like building a mosaic of curved tiles to perfectly cover our puddle.

## 2. Why it matters — real-world applications

Numerical integration techniques like Simpson's rules are fundamental in science and engineering because many real-world functions simply don't have neat, analytical antiderivatives. When you can't integrate a function exactly, you *must* resort to numerical methods.

1.  **Aerospace Engineering (Rocket Trajectories & Fluid Dynamics):** Calculating the total impulse of a rocket engine over time, where thrust might vary non-linearly, often involves integrating a thrust-vs-time curve. Similarly, simulating airflow over a wing (computational fluid dynamics, CFD) requires integrating complex pressure distributions to find lift and drag forces. Companies like **SpaceX** or **Boeing** rely heavily on such computations to design and optimize their vehicles.

2.  **Physics (Work, Energy, and Moments of Inertia):** When a force varies with distance, the work done is the integral of force with respect to distance. If the force function is complex (e.g., in a non-linear spring or a gravitational field with varying density), Simpson's rules can accurately estimate the work. In structural analysis, calculating the moment of inertia for irregularly shaped cross-sections (crucial for determining bending resistance) also frequently uses numerical integration. This is vital in designing everything from bridges to roller coasters.

3.  **Machine Learning and Statistics (Probability Distributions):** In fields like Bayesian inference, you often need to integrate probability density functions (PDFs) to find probabilities or normalize distributions. Many PDFs do not have closed-form integrals. For example, calculating the cumulative distribution function (CDF) for a complex, empirically derived PDF might require numerical integration. This is used by companies like **Google** or **Amazon** in their recommendation systems, natural language processing, or any area involving statistical modeling of complex data.

4.  **Signal Processing (Filtering and Analysis):** When analyzing continuous signals, such as audio waveforms or sensor data, operations like finding the total energy of a signal over a time interval involve integration. If the signal is digitized and represented by discrete points, Simpson's rules can provide a highly accurate approximation of these integrals, crucial for tasks like noise reduction or feature extraction in audio processing software or medical imaging devices.

## 3. Prerequisites — what you must know first

Before diving deep into Simpson's rules, ensure you have a solid grasp of these foundational concepts:

*   **Definite Integral:** Understanding that $\int_a^b f(x) dx$ represents the signed area under the curve $f(x)$ from $x=a$ to $x=b$.
*   **Polynomials:** Familiarity with linear, quadratic, and cubic polynomials, their general forms, and how to evaluate them.
*   **Polynomial Interpolation:** The concept of finding a polynomial that passes through a given set of data points. This is the core idea behind Simpson's rules.
*   **Lagrange Interpolation Formula:** A specific method for constructing an interpolating polynomial that passes through a set of points. While not strictly *required* to understand the *result* of Simpson's rule, its derivation heavily relies on it.
*   **Basic Integration Rules:** How to integrate simple polynomials (e.g., $\int x^n dx = \frac{x^{n+1}}{n+1} + C$).
*   **Algebraic Manipulation:** Proficiency in expanding expressions, factoring, and solving systems of linear equations.
*   **Summation Notation ($\Sigma$):** Understanding how to represent sums of terms compactly.
*   **Taylor Series (for Error Analysis):** While not explicitly used in the *derivation* of the rules themselves, understanding Taylor series is crucial for understanding the *error terms* associated with these rules, which determines their accuracy.

## 4. The core idea — step by step

Simpson's rules are part of a family of numerical integration techniques called Newton-Cotes formulas. These formulas approximate a function $f(x)$ with a polynomial $P_n(x)$ and then integrate $P_n(x)$ instead of $f(x)$. The "composite" version means we apply the basic rule over many small subintervals.

We'll derive Simpson's 1/3 rule first, then Simpson's 3/8 rule.

### Derivation of Simpson's 1/3 Rule

The Simpson's 1/3 rule approximates the function $f(x)$ with a quadratic polynomial (parabola) over two subintervals. This requires three points.

#### ### Step 1: The Problem Statement

*   **Plain English:** We want to find the approximate area under a continuous function $f(x)$ between two points, $a$ and $b$. We assume $f(x)$ is "nice enough" (e.g., continuous and differentiable enough times).
*   **Concrete Example:** Estimate the area under $f(x) = x^3$ from $x=0$ to $x=2$. The exact answer is $\int_0^2 x^3 dx = [\frac{x^4}{4}]_0^2 = \frac{2^4}{4} - 0 = \frac{16}{4} = 4$. We want to see how close our approximation gets.
*   **Formal/Mathematical Version:** We want to approximate the definite integral:
    $$ I = \int_a^b f(x) dx $$
*   **What could go wrong:** If $f(x)$ is highly oscillatory or has discontinuities within $[a, b]$, a simple polynomial approximation might be very inaccurate.

#### ### Step 2: Approximating with a Parabola

*   **Plain English:** Instead of integrating the complicated $f(x)$ directly, we'll replace it with a simpler function that's easy to integrate: a parabola. This parabola will be chosen to pass through three specific points on $f(x)$ within our integration interval.
*   **Concrete Example:** For our interval $[0, 2]$, we'll pick three points: the start ($x=0$), the end ($x=2$), and the midpoint ($x=1$). We'll find a parabola that passes through $(0, f(0))$, $(1, f(1))$, and $(2, f(2))$.
*   **Formal/Mathematical Version:** We approximate $f(x)$ with a quadratic interpolating polynomial $P_2(x)$:
    $$ f(x) \approx P_2(x) $$
    The integral then becomes:
    $$ \int_a^b f(x) dx \approx \int_a^b P_2(x) dx $$
*   **What could go wrong:** If the function $f(x)$ is very "bumpy" or has sharp turns between the chosen points, a parabola might not capture its behavior well, leading to a large error.

#### ### Step 3: Defining the Points and Interval

*   **Plain English:** To define a unique parabola, we need three points. We'll pick three equally spaced points within our integration interval $[a, b]$: the start point, the end point, and the exact middle point.
*   **Concrete Example:** For $[a, b]$, let $x_0 = a$, $x_2 = b$. The midpoint is $x_1 = (a+b)/2$. The spacing between points is $h = x_1 - x_0 = x_2 - x_1 = (b-a)/2$. So the points are $x_0, x_0+h, x_0+2h$.
*   **Formal/Mathematical Version:** Let the interval be $[x_0, x_2]$. We divide it into two subintervals of equal width $h$:
    $$ h = \frac{x_2 - x_0}{2} $$
    The three points are $x_0$, $x_1 = x_0 + h$, and $x_2 = x_0 + 2h$. The interpolating polynomial $P_2(x)$ passes through $(x_0, f(x_0))$, $(x_1, f(x_1))$, and $(x_2, f(x_2))$.
*   **What could go wrong:** Using unequally spaced points would complicate the derivation significantly and lead to a different formula.

#### ### Step 4: Shifting the Interval (Simplification for Integration)

*   **Plain English:** Integrating a polynomial is easiest when the limits of integration are symmetric around zero. So, we'll temporarily shift our coordinate system so that the middle point $x_1$ becomes $0$. This makes the integration much simpler.
*   **Concrete Example:** If our points are $x_0, x_1, x_2$, we'll introduce a new variable $s$ such that $x = x_1 + s$.
    *   When $x=x_0$, $s = x_0 - x_1 = -h$.
    *   When $x=x_1$, $s = x_1 - x_1 = 0$.
    *   When $x=x_2$, $s = x_2 - x_1 = h$.
    Now we integrate from $-h$ to $h$.
*   **Formal/Mathematical Version:** Let $x = x_1 + s$, so $dx = ds$. The integration limits change from $[x_0, x_2]$ to $[-h, h]$.
    The function $f(x)$ becomes $f(x_1+s)$. Let $g(s) = f(x_1+s)$.
    The interpolating polynomial $P_2(x)$ can be rewritten in terms of $s$. A general quadratic polynomial is $As^2 + Bs + C$.
    The integral becomes:
    $$ \int_{x_0}^{x_2} P_2(x) dx = \int_{-h}^{h} P_2(x_1+s) ds $$
    We can use Lagrange interpolation for $P_2(x_1+s)$:
    $$ P_2(x_1+s) = f(x_0) \frac{(s-0)(s-h)}{(-h-0)(-h-h)} + f(x_1) \frac{(s-(-h))(s-h)}{(0-(-h))(0-h)} + f(x_2) \frac{(s-(-h))(s-0)}{(h-(-h))(h-0)} $$
    $$ P_2(x_1+s) = f(x_0) \frac{s(s-h)}{2h^2} + f(x_1) \frac{(s+h)(s-h)}{-h^2} + f(x_2) \frac{s(s+h)}{2h^2} $$
*   **What could go wrong:** Forgetting to change the integration limits or the differential ($dx \rightarrow ds$) when performing the substitution.

#### ### Step 5: Integrating the Interpolating Polynomial

*   **Plain English:** Now we integrate the simplified quadratic polynomial over the symmetric interval $[-h, h]$. The symmetry helps cancel out some terms, making the calculation easier.
*   **Formal/Mathematical Version:**
    $$ \int_{-h}^{h} P_2(x_1+s) ds = \int_{-h}^{h} \left[ f(x_0) \frac{s^2-sh}{2h^2} + f(x_1) \frac{s^2-h^2}{-h^2} + f(x_2) \frac{s^2+sh}{2h^2} \right] ds $$
    Let's integrate term by term:
    $$ \int_{-h}^{h} \frac{s^2-sh}{2h^2} ds = \frac{1}{2h^2} \left[ \frac{s^3}{3} - \frac{s^2h}{2} \right]_{-h}^{h} $$
    $$ = \frac{1}{2h^2} \left[ \left(\frac{h^3}{3} - \frac{h^3}{2}\right) - \left(\frac{(-h)^3}{3} - \frac{(-h)^2h}{2}\right) \right] $$
    $$ = \frac{1}{2h^2} \left[ \left(\frac{h^3}{3} - \frac{h^3}{2}\right) - \left(-\frac{h^3}{3} - \frac{h^3}{2}\right) \right] $$
    $$ = \frac{1}{2h^2} \left[ \frac{h^3}{3} - \frac{h^3}{2} + \frac{h^3}{3} + \frac{h^3}{2} \right] = \frac{1}{2h^2} \left[ \frac{2h^3}{3} \right] = \frac{h}{3} $$

    $$ \int_{-h}^{h} \frac{s^2-h^2}{-h^2} ds = -\frac{1}{h^2} \left[ \frac{s^3}{3} - h^2s \right]_{-h}^{h} $$
    $$ = -\frac{1}{h^2} \left[ \left(\frac{h^3}{3} - h^3\right) - \left(-\frac{h^3}{3} + h^3\right) \right] $$
    $$ = -\frac{1}{h^2} \left[ \frac{h^3}{3} - h^3 + \frac{h^3}{3} - h^3 \right] = -\frac{1}{h^2} \left[ \frac{2h^3}{3} - 2h^3 \right] $$
    $$ = -\frac{1}{h^2} \left[ \frac{2h^3 - 6h^3}{3} \right] = -\frac{1}{h^2} \left[ -\frac{4h^3}{3} \right] = \frac{4h}{3} $$

    $$ \int_{-h}^{h} \frac{s^2+sh}{2h^2} ds = \frac{1}{2h^2} \left[ \frac{s^3}{3} + \frac{s^2h}{2} \right]_{-h}^{h} $$
    $$ = \frac{1}{2h^2} \left[ \left(\frac{h^3}{3} + \frac{h^3}{2}\right) - \left(\frac{(-h)^3}{3} + \frac{(-h)^2h}{2}\right) \right] $$
    $$ = \frac{1}{2h^2} \left[ \left(\frac{h^3}{3} + \frac{h^3}{2}\right) - \left(-\frac{h^3}{3} + \frac{h^3}{2}\right) \right] $$
    $$ = \frac{1}{2h^2} \left[ \frac{h^3}{3} + \frac{h^3}{2} + \frac{h^3}{3} - \frac{h^3}{2} \right] = \frac{1}{2h^2} \left[ \frac{2h^3}{3} \right] = \frac{h}{3} $$

    Combining these results:
    $$ \int_{x_0}^{x_2} P_2(x) dx = f(x_0) \left(\frac{h}{3}\right) + f(x_1) \left(\frac{4h}{3}\right) + f(x_2) \left(\frac{h}{3}\right) $$
    $$ \int_{x_0}^{x_2} f(x) dx \approx \frac{h}{3} [f(x_0) + 4f(x_1) + f(x_2)] $$
    This is the **basic Simpson's 1/3 Rule**.
*   **What could go wrong:** Algebraic errors, especially when dealing with the negative signs and powers of $h$. It's easy to make a mistake in the evaluation of the definite integral.

#### ### Step 6: Composite Simpson's 1/3 Rule

*   **Plain English:** The basic rule works for a small interval using three points. To integrate over a larger interval $[a, b]$, we divide it into many smaller, equally sized subintervals. We then apply the basic Simpson's 1/3 rule to pairs of these subintervals and sum up all the results. This requires an *even* number of subintervals (and thus an odd number of points).
*   **Concrete Example:** If we want to integrate from $x=0$ to $x=4$ and use 4 subintervals, we have points $x_0=0, x_1=1, x_2=2, x_3=3, x_4=4$. We apply the basic rule to $[x_0, x_2]$ and then to $[x_2, x_4]$.
    $$ \int_0^4 f(x) dx \approx \frac{h}{3}(f(x_0) + 4f(x_1) + f(x_2)) + \frac{h}{3}(f(x_2) + 4f(x_3) + f(x_4)) $$
    Notice $f(x_2)$ is counted twice.
*   **Formal/Mathematical Version:** To approximate $\int_a^b f(x) dx$, we divide the interval $[a, b]$ into $N$ (an even integer) subintervals of equal width $h = (b-a)/N$. This creates $N+1$ points: $x_0=a, x_1, \dots, x_N=b$.
    We apply the basic Simpson's 1/3 rule to each pair of subintervals $[x_{2i}, x_{2i+2}]$ for $i=0, 1, \dots, N/2 - 1$.
    $$ \int_a^b f(x) dx = \sum_{i=0}^{(N/2)-1} \int_{x_{2i}}^{x_{2i+2}} f(x) dx $$
    $$ \approx \sum_{i=0}^{(N/2)-1} \frac{h}{3} [f(x_{2i}) + 4f(x_{2i+1}) + f(x_{2i+2})] $$
    Expanding the sum:
    $$ = \frac{h}{3} [ (f(x_0) + 4f(x_1) + f(x_2)) + (f(x_2) + 4f(x_3) + f(x_4)) + \dots + (f(x_{N-2}) + 4f(x_{N-1}) + f(x_N)) ] $$
    Combining the common terms:
    $$ \int_a^b f(x) dx \approx \frac{h}{3} [f(x_0) + 4f(x_1) + 2f(x_2) + 4f(x_3) + 2f(x_4) + \dots + 2f(x_{N-2}) + 4f(x_{N-1}) + f(x_N)] $$
    This can be written compactly as:
    $$ \int_a^b f(x) dx \approx \frac{h}{3} [f(x_0) + f(x_N) + 4 \sum_{i=1, \text{odd}}^{N-1} f(x_i) + 2 \sum_{i=2, \text{even}}^{N-2} f(x_i)] $$
    This is the **Composite Simpson's 1/3 Rule**.
*   **What could go wrong:** Forgetting that $N$ *must* be an even number. If $N$ is odd, you can't form pairs of subintervals for the 1/3 rule. Also, misapplying the coefficients (1, 4, 2, 4, 2, ..., 4, 1).

### Derivation of Simpson's 3/8 Rule

The Simpson's 3/8 rule approximates the function $f(x)$ with a cubic polynomial over three subintervals. This requires four points.

#### ### Step 7: Approximating with a Cubic

*   **Plain English:** Similar to the 1/3 rule, but for potentially greater accuracy (especially for functions that are more "wiggly"), we use a cubic polynomial to approximate $f(x)$. A cubic polynomial needs four points to be uniquely defined.
*   **Concrete Example:** For an interval $[a, b]$, we'll pick four equally spaced points: $x_0=a$, $x_1$, $x_2$, and $x_3=b$.
*   **Formal/Mathematical Version:** We approximate $f(x)$ with a cubic interpolating polynomial $P_3(x)$:
    $$ f(x) \approx P_3(x) $$
    The integral then becomes:
    $$ \int_a^b f(x) dx \approx \int_a^b P_3(x) dx $$
*   **What could go wrong:** While a cubic approximation is generally more accurate than a quadratic one, it requires more function evaluations and slightly more complex calculations.

#### ### Step 8: Defining Points and Interval for Cubic Interpolation

*   **Plain English:** We need four equally spaced points for a cubic polynomial. So, we divide our interval $[a, b]$ into three equal subintervals.
*   **Concrete Example:** Let the interval be $[x_0, x_3]$. We divide it into three subintervals of equal width $h = (x_3 - x_0)/3$. The points are $x_0, x_1=x_0+h, x_2=x_0+2h, x_3=x_0+3h$.
*   **Formal/Mathematical Version:** Let the interval be $[x_0, x_3]$. We divide it into three subintervals of equal width $h$:
    $$ h = \frac{x_3 - x_0}{3} $$
    The four points are $x_0$, $x_1 = x_0 + h$, $x_2 = x_0 + 2h$, and $x_3 = x_0 + 3h$. The interpolating polynomial $P_3(x)$ passes through $(x_0, f(x_0))$, $(x_1, f(x_1))$, $(x_2, f(x_2))$, and $(x_3, f(x_3))$.
    Again, we can shift the interval to simplify integration. Let $x = x_0 + s$. Then $s$ ranges from $0$ to $3h$. The points are $s=0, h, 2h, 3h$.
*   **What could go wrong:** Incorrectly calculating $h$ or defining the points.

#### ### Step 9: Integrating the Cubic Interpolating Polynomial

*   **Plain English:** Now we integrate the cubic polynomial over the interval defined by the four points. This is algebraically more involved than the quadratic case.
*   **Formal/Mathematical Version:** We use Lagrange interpolation for $P_3(x)$ (or $P_3(x_0+s)$) and integrate from $x_0$ to $x_3$ (or $0$ to $3h$).
    The general form of the Lagrange interpolating polynomial for four points $(x_0, f_0), (x_1, f_1), (x_2, f_2), (x_3, f_3)$ is:
    $$ P_3(x) = \sum_{j=0}^{3} f(x_j) L_j(x) $$
    where $L_j(x)$ are the Lagrange basis polynomials.
    Integrating $P_3(x)$ from $x_0$ to $x_3$ (or $x_1-3h/2$ to $x_1+3h/2$ for symmetry, which is a common approach, or simply $0$ to $3h$ for $x=x_0+s$):
    $$ \int_{x_0}^{x_3} P_3(x) dx = \int_{0}^{3h} P_3(x_0+s) ds $$
    The derivation is lengthy and involves integrating each $L_j(x_0+s)$ term. For brevity, we present the result here, but a full derivation would involve careful integration of each Lagrange basis polynomial over the interval $[0, 3h]$.
    After performing the integration, we arrive at:
    $$ \int_{x_0}^{x_3} f(x) dx \approx \frac{3h}{8} [f(x_0) + 3f(x_1) + 3f(x_2) + f(x_3)] $$
    This is the **basic Simpson's 3/8 Rule**.
*   **What could go wrong:** The algebraic complexity of integrating the Lagrange basis polynomials for a cubic function is high. Errors in arithmetic or variable substitution are common.

#### ### Step 10: Composite Simpson's 3/8 Rule

*   **Plain English:** Just like the 1/3 rule, we can apply the 3/8 rule repeatedly over a larger interval. We divide the total interval $[a, b]$ into a number of subintervals that is a multiple of 3. Then we apply the basic 3/8 rule to each group of three subintervals and sum the results.
*   **Concrete Example:** If we want to integrate from $x=0$ to $x=6$ and use 6 subintervals, we have points $x_0=0, \dots, x_6=6$. We apply the basic rule to $[x_0, x_3]$ and then to $[x_3, x_6]$.
    $$ \int_0^6 f(x) dx \approx \frac{3h}{8}(f(x_0) + 3f(x_1) + 3f(x_2) + f(x_3)) + \frac{3h}{8}(f(x_3) + 3f(x_4) + 3f(x_5) + f(x_6)) $$
    Notice $f(x_3)$ is counted twice.
*   **Formal/Mathematical Version:** To approximate $\int_a^b f(x) dx$, we divide the interval $[a, b]$ into $N$ (a multiple of 3) subintervals of equal width $h = (b-a)/N$. This creates $N+1$ points: $x_0=a, x_1, \dots, x_N=b$.
    We apply the basic Simpson's 3/8 rule to each group of three subintervals $[x_{3i}, x_{3i+3}]$ for $i=0, 1, \dots, N/3 - 1$.
    $$ \int_a^b f(x) dx = \sum_{i=0}^{(N/3)-1} \int_{x_{3i}}^{x_{3i+3}} f(x) dx $$
    $$ \approx \sum_{i=0}^{(N/3)-1} \frac{3h}{8} [f(x_{3i}) + 3f(x_{3i+1}) + 3f(x_{3i+2}) + f(x_{3i+3})] $$
    Expanding the sum:
    $$ = \frac{3h}{8} [ (f(x_0) + 3f(x_1) + 3f(x_2) + f(x_3)) + (f(x_3) + 3f(x_4) + 3f(x_5) + f(x_6)) + \dots + (f(x_{N-3}) + 3f(x_{N-2}) + 3f(x_{N-1}) + f(x_N)) ] $$
    Combining the common terms:
    $$ \int_a^b f(x) dx \approx \frac{3h}{8} [f(x_0) + f(x_N) + 3 \sum_{i \in \{1, 2, 4, 5, \dots, N-2, N-1\}} f(x_i) + 2 \sum_{i \in \{3, 6, \dots, N-3\}} f(x_i)] $$
    This can be written more clearly as:
    $$ \int_a^b f(x) dx \approx \frac{3h}{8} [f(x_0) + 3f(x_1) + 3f(x_2) + 2f(x_3) + 3f(x_4) + 3f(x_5) + 2f(x_6) + \dots + 3f(x_{N-1}) + f(x_N)] $$
    This is the **Composite Simpson's 3/8 Rule**.
*   **What could go wrong:** Forgetting that $N$ *must* be a multiple of 3. Also, correctly applying the coefficients (1, 3, 3, 2, 3, 3, 2, ..., 3, 1) can be tricky.

## 5. Worked examples — multiple, with every step shown

### Example 1: Basic Simpson's 1/3 Rule

**Problem:** Approximate the integral $\int_0^2 x^2 dx$ using the basic Simpson's 1/3 rule.

**Given:**
*   Function: $f(x) = x^2$
*   Interval: $[a, b] = [0, 2]$
*   Rule: Basic Simpson's 1/3 rule (implies $N=2$ subintervals, 3 points)

**What we want:** An approximation of the definite integral.

**Solution:**

1.  **Determine $h$:**
    The basic Simpson's 1/3 rule uses 2 subintervals.
    $$ h = \frac{b-a}{N} = \frac{2-0}{2} = 1 $$
    *Explanation: $h$ is the width of each subinterval. For the basic 1/3 rule, we always have 2 subintervals.*

2.  **Identify the points:**
    The points are $x_0 = a$, $x_1 = a+h$, $x_2 = a+2h = b$.
    $$ x_0 = 0 $$
    $$ x_1 = 0 + 1 = 1 $$
    $$ x_2 = 0 + 2(1) = 2 $$
    *Explanation: We need three points for the quadratic approximation: the start, the midpoint, and the end of the interval.*

3.  **Evaluate $f(x)$ at these points:**
    $$ f(x_0) = f(0) = 0^2 = 0 $$
    $$ f(x_1) = f(1) = 1^2 = 1 $$
    $$ f(x_2) = f(2) = 2^2 = 4 $$
    *Explanation: We calculate the y-values (function values) at each of our chosen x-points.*

4.  **Apply the basic Simpson's 1/3 rule formula:**
    $$ \int_a^b f(x) dx \approx \frac{h}{3} [f(x_0) + 4f(x_1) + f(x_2)] $$
    $$ \int_0^2 x^2 dx \approx \frac{1}{3} [f(0) + 4f(1) + f(2)] $$
    $$ \approx \frac{1}{3} [0 + 4(1) + 4] $$
    $$ \approx \frac{1}{3} [0 + 4 + 4] $$
    $$ \approx \frac{1}{3} [8] $$
    $$ \approx \frac{8}{3} $$
    $$ \approx 2.6666... $$
    *Explanation: Substitute the calculated values into the derived formula for Simpson's 1/3 rule.*

5.  **Compare with the exact value (optional, but good for understanding accuracy):**
    $$ \int_0^2 x^2 dx = \left[ \frac{x^3}{3} \right]_0^2 = \frac{2^3}{3} - \frac{0^3}{3} = \frac{8}{3} - 0 = \frac{8}{3} $$
    In this case, Simpson's 1/3 rule gives the **exact** answer. This is because Simpson's 1/3 rule is exact for polynomials up to degree 3. Since $f(x)=x^2$ is a polynomial of degree 2, the parabolic approximation is perfect.

**Final Answer:**
The approximation is $\boxed{\frac{8}{3}}$.

**Reflection:** This example shows the power of Simpson's rule: for polynomials of degree 2 or 3, it provides the exact integral, even with just one application of the basic rule. This is a property of Newton-Cotes formulas where the degree of the interpolating polynomial is $n$, and the formula is exact for polynomials up to degree $n+1$ (or $n+2$ for symmetric rules like Simpson's 1/3).

---

### Example 2: Composite Simpson's 1/3 Rule

**Problem:** Approximate the integral $\int_0^1 e^x dx$ using the Composite Simpson's 1/3 rule with $N=4$ subintervals.

**Given:**
*   Function: $f(x) = e^x$
*   Interval: $[a, b] = [0, 1]$
*   Rule: Composite Simpson's 1/3 rule
*   Number of subintervals: $N=4$ (which is even, as required)

**What we want:** An approximation of the definite integral.

**Solution:**

1.  **Determine $h$:**
    $$ h = \frac{b-a}{N} = \frac{1-0}{4} = 0.25 $$
    *Explanation: $h$ is the width of each subinterval. We divide the total interval into $N$ equal parts.*

2.  **Identify the points:**
    We need $N+1 = 4+1 = 5$ points, starting from $x_0=a$ and incrementing by $h$.
    $$ x_0 = 0 $$
    $$ x_1 = 0 + 0.25 = 0.25 $$
    $$ x_2 = 0 + 2(0.25) = 0.50 $$
    $$ x_3 = 0 + 3(0.25) = 0.75 $$
    $$ x_4 = 0 + 4(0.25) = 1.00 $$
    *Explanation: These are the x-coordinates where we will evaluate the function $f(x)$.*

3.  **Evaluate $f(x)$ at these points:**
    $$ f(x_0) = e^0 = 1.0000 $$
    $$ f(x_1) = e^{0.25} \approx 1.2840 $$
    $$ f(x_2) = e^{0.50} \approx 1.6487 $$
    $$ f(x_3) = e^{0.75} \approx 2.1170 $$
    $$ f(x_4) = e^{1.00} \approx 2.7183 $$
    *Explanation: Calculate the function value (y-coordinate) for each x-point. Keep enough decimal places for accuracy.*

4.  **Apply the Composite Simpson's 1/3 rule formula:**
    $$ \int_a^b f(x) dx \approx \frac{h}{3} [f(x_0) + 4f(x_1) + 2f(x_2) + 4f(x_3) + f(x_4)] $$
    $$ \approx \frac{0.25}{3} [1.0000 + 4(1.2840) + 2(1.6487) + 4(2.1170) + 2.7183] $$
    $$ \approx \frac{0.25}{3} [1.0000 + 5.1360 + 3.2974 + 8.4680 + 2.7183] $$
    $$ \approx \frac{0.25}{3} [20.6197] $$
    $$ \approx 0.083333 \times 20.6197 $$
    $$ \approx 1.718308 $$
    *Explanation: Substitute the $h$ value and the function values into the composite formula, carefully applying the coefficients (1, 4, 2, 4, ..., 2, 4, 1).*

5.  **Compare with the exact value:**
    $$ \int_0^1 e^x dx = [e^x]_0^1 = e^1 - e^0 = e - 1 \approx 2.7182818 - 1 = 1.7182818 $$
    Our approximation $1.718308$ is very close to the exact value $1.7182818$.

**Final Answer:**
The approximation is $\boxed{1.718308}$.

**Reflection:** This example demonstrates how the composite rule improves accuracy by using more subintervals. The coefficients (1, 4, 2, 4, 1) are critical to remember for the composite 1/3 rule.

---

### Example 3: Basic Simpson's 3/8 Rule

**Problem:** Approximate the integral $\int_0^3 x^3 dx$ using the basic Simpson's 3/8 rule.

**Given:**
*   Function: $f(x) = x^3$
*   Interval: $[a, b] = [0, 3]$
*   Rule: Basic Simpson's 3/8 rule (implies $N=3$ subintervals, 4 points)

**What we want:** An approximation of the definite integral.

**Solution:**

1.  **Determine $h$:**
    The basic Simpson's 3/8 rule uses 3 subintervals.
    $$ h = \frac{b-a}{N} = \frac{3-0}{3} = 1 $$
    *Explanation: $h$ is the width of each subinterval. For the basic 3/8 rule, we always have 3 subintervals.*

2.  **Identify the points:**
    The points are $x_0 = a$, $x_1 = a+h$, $x_2 = a+2h$, $x_3 = a+3h = b$.
    $$ x_0 = 0 $$
    $$ x_1 = 0 + 1 = 1 $$
    $$ x_2 = 0 + 2(1) = 2 $$
    $$ x_3 = 0 + 3(1) = 3 $$
    *Explanation: We need four points for the cubic approximation.*

3.  **Evaluate $f(x)$ at these points:**
    $$ f(x_0) = f(0) = 0^3 = 0 $$
    $$ f(x_1) = f(1) = 1^3 = 1 $$
    $$ f(x_2) = f(2) = 2^3 = 8 $$
    $$ f(x_3) = f(3) = 3^3 = 27 $$
    *Explanation: Calculate the function values at each x-point.*

4.  **Apply the basic Simpson's 3/8 rule formula:**
    $$ \int_a^b f(x) dx \approx \frac{3h}{8} [f(x_0) + 3f(x_1) + 3f(x_2) + f(x_3)] $$
    $$ \int_0^3 x^3 dx \approx \frac{3(1)}{8} [f(0) + 3f(1) + 3f(2) + f(3)] $$
    $$ \approx \frac{3}{8} [0 + 3(1) + 3(8) + 27] $$
    $$ \approx \frac{3}{8} [0 + 3 + 24 + 27] $$
    $$ \approx \frac{3}{8} [54] $$
    $$ \approx \frac{162}{8} $$
    $$ \approx \frac{81}{4} $$
    $$ \approx 20.25 $$
    *Explanation: Substitute the values into the 3/8 rule formula.*

5.  **Compare with the exact value:**
    $$ \int_0^3 x^3 dx = \left[ \frac{x^4}{4} \right]_0^3 = \frac{3^4}{4} - \frac{0^4}{4} = \frac{81}{4} - 0 = \frac{81}{4} $$
    Again, Simpson's 3/8 rule gives the **exact** answer. This is because Simpson's 3/8 rule is also exact for polynomials up to degree 3. Since $f(x)=x^3$ is a polynomial of degree 3, the cubic approximation is perfect.

**Final Answer:**
The approximation is $\boxed{\frac{81}{4} \text{ or } 20.25}$.

**Reflection:** Similar to the 1/3 rule, the 3/8 rule is exact for cubic polynomials. This makes it a powerful tool when dealing with functions that behave like cubics.

---

### Example 4: Composite Simpson's 3/8 Rule

**Problem:** Approximate the integral $\int_0^3 \sin(x) dx$ using the Composite Simpson's 3/8 rule with $N=6$ subintervals.

**Given:**
*   Function: $f(x) = \sin(x)$
*   Interval: $[a, b] = [0, 3]$
*   Rule: Composite Simpson's 3/8 rule
*   Number of subintervals: $N=6$ (which is a multiple of 3, as required)

**What we want:** An approximation of the definite integral.

**Solution:**

1.  **Determine $h$:**
    $$ h = \frac{b-a}{N} = \frac{3-0}{6} = 0.5 $$
    *Explanation: $h$ is the width of each subinterval.*

2.  **Identify the points:**
    We need $N+1 = 6+1 = 7$ points, starting from $x_0=a$ and incrementing by $h$.
    $$ x_0 = 0 $$
    $$ x_1 = 0.5 $$
    $$ x_2 = 1.0 $$
    $$ x_3 = 1.5 $$
    $$ x_4 = 2.0 $$
    $$ x_5 = 2.5 $$
    $$ x_6 = 3.0 $$
    *Explanation: List all the x-coordinates for function evaluation.*

3.  **Evaluate $f(x)$ at these points:**
    (Using radians for sine function)
    $$ f(x_0) = \sin(0) = 0.0000 $$
    $$ f(x_1) = \sin(0.5) \approx 0.4794 $$
    $$ f(x_2) = \sin(1.0) \approx 0.8415 $$
    $$ f(x_3) = \sin(1.5) \approx 0.9975 $$
    $$ f(x_4) = \sin(2.0) \approx 0.9093 $$
    $$ f(x_5) = \sin(2.5) \approx 0.5985 $$
    $$ f(x_6) = \sin(3.0) \approx 0.1411 $$
    *Explanation: Calculate the function values, ensuring your calculator is in radian mode for trigonometric functions.*

4.  **Apply the Composite Simpson's 3/8 rule formula:**
    $$ \int_a^b f(x) dx \approx \frac{3h}{8} [f(x_0) + 3f(x_1) + 3f(x_2) + 2f(x_3) + 3f(x_4) + 3f(x_5) + f(x_6)] $$
    $$ \approx \frac{3(0.5)}{8} [0.0000 + 3(0.4794) + 3(0.8415) + 2(0.9975) + 3(0.9093) + 3(0.5985) + 0.1411] $$
    $$ \approx \frac{1.5}{8} [0.0000 + 1.4382 + 2.5245 + 1.9950 + 2.7279 + 1.7955 + 0.1411] $$
    $$ \approx 0.1875 [10.6222] $$
    $$ \approx 1.9916625 $$
    *Explanation: Substitute the $h$ value and the function values into the composite 3/8 rule formula, carefully applying the coefficients (1, 3, 3, 2, 3, 3, 1).*

5.  **Compare with the exact value:**
    $$ \int_0^3 \sin(x) dx = [-\cos(x)]_0^3 = -\cos(3) - (-\cos(0)) = -\cos(3) + \cos(0) $$
    $$ = -\cos(3) + 1 \approx -(-0.989992) + 1 = 0.989992 + 1 = 1.989992 $$
    Our approximation $1.9916625$ is very close to the exact value $1.989992$.

**Final Answer:**
The approximation is $\boxed{1.9916625}$.

**Reflection:** This example demonstrates the composite 3/8 rule for a transcendental function. The exact integral of $\sin(x)$ is known, allowing us to gauge the accuracy. The coefficients for the composite 3/8 rule are more complex than the 1/3 rule (1, 3, 3, 2, 3, 3, ..., 2, 3, 3, 1), requiring careful application.

## 6. Common mistakes and traps

1.  **Incorrect Number of Subintervals ($N$):**
    *   **Trap:** Using an odd $N$ for Composite Simpson's 1/3 rule, or an $N$ that is not a multiple of 3 for Composite Simpson's 3/8 rule.
    *   **Why it happens:** The basic 1/3 rule requires 2 subintervals (3 points), and the 3/8 rule requires 3 subintervals (4 points). The composite rules build upon these basic units. If $N$ doesn't fit these requirements, the method cannot be applied directly.

2.  **Miscalculating $h$:**
    *   **Trap:** Forgetting the formula $h = (b-a)/N$ or making arithmetic errors in its calculation.
    *   **Why it happens:** $h$ is fundamental to the accuracy and correct application of the rule. A wrong $h$ leads to incorrect subinterval points and thus incorrect function evaluations.

3.  **Incorrect Coefficient Pattern:**
    *   **Trap:** Forgetting the specific coefficients for the composite rules:
        *   1/3 rule: $1, 4, 2, 4, 2, \dots, 2, 4, 1$
        *   3/8 rule: $1, 3, 3, 2, 3, 3, \dots, 2, 3, 3, 1$
    *   **Why it happens:** These patterns are derived from summing the basic rule applications. It's easy to mix them up or forget the alternating $2$s for the 1/3 rule, or the $2$s at multiples of 3 for the 3/8 rule.

4.  **Arithmetic Errors in Summation:**
    *   **Trap:** Simple addition/multiplication errors when summing up the terms $f(x_i)$ multiplied by their coefficients.
    *   **Why it happens:** These calculations can be lengthy, especially with many subintervals and floating-point numbers. It's crucial to be meticulous or use a calculator carefully.

5.  **Confusing $x_i$ with $f(x_i)$:**
    *   **Trap:** Accidentally using the x-coordinate values ($x_0, x_1, \dots$) in the sum instead of the function values ($f(x_0), f(x_1), \dots$).
    *   **Why it happens:** The formulas explicitly call for $f(x_i)$, but in the heat of calculation, one might grab the wrong value from a table.

6.  **Using the Wrong Rule for the Context:**
    *   **Trap:** Trying to apply Simpson's 3/8 rule when $N$ is even but not a multiple of 3 (e.g., $N=4$), or vice versa. Sometimes, a mixed approach (e.g., 1/3 rule for most of the interval, then 3/8 for the last few subintervals if $N$ is odd or not suitable for a single rule) is necessary, but this is an advanced technique.
    *   **Why it happens:** A lack of understanding of the underlying requirements for $N$ for each rule.

## 7. Textbook-precise explanation

Simpson's rules are specific instances of Newton-Cotes formulas, which are a family of numerical integration methods based on interpolating the integrand with polynomials at equally spaced points.

**Simpson's 1/3 Rule:**

Consider a function $f(x)$ integrated over an interval $[a, b]$.
For a single application of the basic Simpson's 1/3 rule, we divide the interval $[a, b]$ into two subintervals of equal width $h = (b-a)/2$. Let the points be $x_0=a$, $x_1=a+h$, and $x_2=b$.
The basic Simpson's 1/3 rule approximates the integral by fitting a quadratic polynomial $P_2(x)$ through the points $(x_0, f(x_0))$, $(x_1, f(x_1))$, and $(x_2, f(x_2))$ and integrating $P_2(x)$:
$$ \int_a^b f(x) dx \approx \frac{h}{3} [f(x_0) + 4f(x_1) + f(x_2)] $$
The error term for the basic Simpson's 1/3 rule is given by $E = -\frac{h^5}{90} f^{(4)}(\xi)$, where $\xi \in (a, b)$. This indicates that the rule is exact for polynomials up to degree 3, as $f^{(4)}(\xi)=0$ for such polynomials.

For the **Composite Simpson's 1/3 Rule**, we divide the interval $[a, b]$ into an *even* number, $N$, of subintervals of equal width $h = (b-a)/N$. This creates $N+1$ points $x_0, x_1, \dots, x_N$. The rule is applied over successive pairs of subintervals $[x_{2i}, x_{2i+2}]$:
$$ \int_a^b f(x) dx \approx \frac{h}{3} \left[ f(x_0) + 4 \sum_{i=1, \text{odd}}^{N-1} f(x_i) + 2 \sum_{i=2, \text{even}}^{N-2} f(x_i) + f(x_N) \right] $$
The error term for the composite Simpson's 1/3 rule is $E = -\frac{(b-a)h^4}{180} f^{(4)}(\xi)$, where $\xi \in (a, b)$. This shows that the error decreases rapidly (proportional to $h^4$) as $h$ decreases (i.e., as $N$ increases).

**Simpson's 3/8 Rule:**

For a single application of the basic Simpson's 3/8 rule, we divide the interval $[a, b]$ into three subintervals of equal width $h = (b-a)/3$. Let the points be $x_0=a$, $x_1=a+h$, $x_2=a+2h$, and $x_3=b$.
The basic Simpson's 3/8 rule approximates the integral by fitting a cubic polynomial $P_3(x)$ through the points $(x_0, f(x_0))$, $(x_1, f(x_1))$, $(x_2, f(x_2))$, and $(x_3, f(x_3))$ and integrating $P_3(x)$:
$$ \int_a^b f(x) dx \approx \frac{3h}{8} [f(x_0) + 3f(x_1) + 3f(x_2) + f(x_3)] $$
The error term for the basic Simpson's 3/8 rule is $E = -\frac{3h^5}{80} f^{(4)}(\xi)$, where $\xi \in (a, b)$. This also indicates that the rule is exact for polynomials up to degree 3. While it uses a cubic interpolant, its error term has the same order as Simpson's 1/3 rule.

For the **Composite Simpson's 3/8 Rule**, we divide the interval $[a, b]$ into $N$ subintervals of equal width $h = (b-a)/N$, where $N$ *must be a multiple of 3*. This creates $N+1$ points $x_0, x_1, \dots, x_N$. The rule is applied over successive groups of three subintervals $[x_{3i}, x_{3i+3}]$:
$$ \int_a^b f(x) dx \approx \frac{3h}{8} \left[ f(x_0) + 3 \sum_{i=1}^{N-1} f(x_i) \text{ (where } i \text{ is not a multiple of 3)} + 2 \sum_{i=3}^{N-3} f(x_i) \text{ (where } i \text{ is a multiple of 3)} + f(x_N) \right] $$
More explicitly:
$$ \int_a^b f(x) dx \approx \frac{3h}{8} [f(x_0) + 3f(x_1) + 3f(x_2) + 2f(x_3) + 3f(x_4) + 3f(x_5) + 2f(x_6) + \dots + 3f(x_{N-1}) + f(x_N)] $$
The error term for the composite Simpson's 3/8 rule is $E = -\frac{(b-a)h^4}{80} f^{(4)}(\xi)$, where $\xi \in (a, b)$.

**Reference:**
*   Burden, R. L., Faires, J. D., & Burden, A. M. (2016). *Numerical Analysis* (10th ed.). Cengage Learning. (Chapter 4, Section 4.4: Composite Numerical Integration)
*   Chapra, S. C., & Canale, R. P. (2015). *Numerical Methods for Engineers* (7th ed.). McGraw-Hill Education. (Chapter 21, Section 21.2: Simpson's Rules)

## 8. ASCII diagrams

### Basic Simpson's 1/3 Rule (Quadratic Approximation)

This diagram shows how a single application of Simpson's 1/3 rule approximates the area under a curve $f(x)$ using a parabola that passes through three points.

```text
       f(x)
         ^
         |
         |        . f(x_1)
         |      /   \
         |     /     \
         |    .       .
         |   f(x_0)   f(x_2)
         |  /           \
         | /             \
         +-------------------------> x
         x_0    x_1    x_2

   Area under f(x) is approximated by the area under the parabola.
   The parabola passes through (x_0, f(x_0)), (x_1, f(x_1)), (x_2, f(x_2)).
   h = x_1 - x_0 = x_2 - x_1
```

### Composite Simpson's 1/3 Rule

This diagram illustrates the composite rule, where the interval is divided into multiple pairs of subintervals, and a parabola is fitted over each pair.

```text
       f(x)
         ^
         |
         |    . f(x_1)      . f(x_3)      . f(x_5)
         |   /   \         /   \         /   \
         |  /     \       /     \       /     \
         | .       .     .       .     .       .
         |f(x_0)   f(x_2) f(x_2)  f(x_4) f(x_4)  f(x_6)
         |/         \   /         \   /         \
         +---------------------------------------------> x
         x_0 x_1 x_2 x_3 x_4 x_5 x_6

   The total integral is the sum of areas under multiple parabolas.
   Each parabola covers two subintervals (e.g., [x_0, x_2], [x_2, x_4], etc.).
   N must be even.
```

### Basic Simpson's 3/8 Rule (Cubic Approximation)

This diagram shows how a single application of Simpson's 3/8 rule approximates the area under a curve $f(x)$ using a cubic polynomial that passes through four points.

```text
       f(x)
         ^
         |           . f(x_2)