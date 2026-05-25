## 1. What it is — in plain English

Imagine you have a magic machine that takes a number, does some calculations with it, and spits out another number. We call this a "function." Sometimes, you want to know what number you need to feed into the machine so that it spits out a zero. That special input number is called a "root" of the function. Think of it as finding the "zero point" or where the function "crosses the finish line" at zero.

"Root-finding" is simply the process of figuring out what that special input number is. It's like being a detective trying to find a hidden treasure (the root) by following clues. Often, the equations describing our functions are too complicated to solve directly with simple algebra, so we need clever strategies to pinpoint that zero.

In this lesson, we'll explore two main detective strategies: the "Bisection Method" and the "Newton-Raphson Method." The Bisection Method is like playing a game of "hot or cold" with a friend, narrowing down where the treasure is hidden. The Newton-Raphson Method is like using a compass and a map to predict the treasure's location based on where you are right now and which way is downhill. Both get to the treasure, but they do it in different ways.

## 2. Why it matters — real-world applications

Root-finding is a fundamental tool in almost every scientific and engineering discipline, because many real-world problems can be formulated as finding the zero of a complex equation.

1.  **Aerospace Engineering & Orbital Mechanics:** When designing a rocket trajectory or planning satellite orbits, engineers often need to solve Kepler's Equation, $M = E - e \sin(E)$, to determine the eccentric anomaly $E$ of an orbiting body at a given time. This equation is transcendental (cannot be solved algebraically for $E$) and requires numerical root-finding methods like Newton-Raphson to find $E$ accurately, which then helps predict the satellite's position.
2.  **Machine Learning & Optimization:** Many machine learning algorithms involve minimizing a "loss function," which measures how well a model performs. To find the minimum of a function, you typically find where its derivative is zero (because the slope is flat at a minimum or maximum). Thus, finding the root of the derivative of a loss function is a core step in training models, especially in algorithms like gradient descent where you're effectively moving towards a root of the gradient.
3.  **Physics & Engineering Simulations:** In fields like fluid dynamics, structural analysis, or heat transfer, complex differential equations describe physical phenomena. Often, these equations don't have analytical solutions. When discretized for numerical simulation, they lead to large systems of non-linear algebraic equations. Finding the roots of these systems (or individual equations within them) is crucial for predicting how structures behave under stress, how fluids flow, or how heat dissipates. For instance, calculating the resonant frequencies of a system might involve finding roots of a characteristic equation.
4.  **Financial Modeling:** Calculating the "implied volatility" of an option contract (a key input for pricing models like Black-Scholes) often requires numerical root-finding. The Black-Scholes formula gives the option price, but market prices are known. To find the implied volatility, one must solve the Black-Scholes equation for volatility, which is a non-linear equation that doesn't have a direct algebraic solution.
5.  **Chemical Engineering:** Determining chemical equilibrium concentrations in complex reaction systems often involves solving non-linear mass balance equations. These equations arise from applying principles like the law of mass action and conservation of elements, and their roots represent the stable equilibrium states of the system.

## 3. Prerequisites — what you must know first

Before diving deep into root-finding, ensure you have a solid grasp of these fundamental concepts:

*   **Functions:** What a function $f(x)$ is, how to evaluate it for a given input $x$, and understanding its domain and range.
*   **Continuity:** The intuitive idea that a function is "continuous" if you can draw its graph without lifting your pen; formally, $\lim_{x \to c} f(x) = f(c)$.
*   **Derivatives:** How to calculate the derivative $f'(x)$ of a function, and its geometric interpretation as the slope of the tangent line to the function's graph at a point. This is essential for Newton-Raphson.
*   **Intermediate Value Theorem (IVT):** The theorem states that if a function $f$ is continuous on a closed interval $[a, b]$, and $k$ is any number between $f(a)$ and $f(b)$, then there exists at least one $c$ in $[a, b]$ such that $f(c) = k$. For root-finding, this means if $f(a)$ and $f(b)$ have opposite signs, there must be a root between $a$ and $b$. This is the cornerstone of the Bisection Method.
*   **Limits:** A basic understanding of limits, especially in the context of convergence (what it means for a sequence of numbers to approach a specific value).
*   **Algebra:** Proficiency in manipulating equations, solving simple linear and quadratic equations, and evaluating expressions.
*   **Basic Programming Logic:** Concepts like variables, conditional statements (if/else), and loops (for/while) are necessary to implement these methods in code.

## 4. The core idea — step by step

Let's break down the core ideas behind the Bisection Method and the Newton-Raphson Method.

### The Bisection Method: "Divide and Conquer"

The Bisection Method is robust and simple. It relies on the Intermediate Value Theorem to guarantee that if a continuous function changes sign over an interval, there must be a root within that interval.

### Step 1: Find an initial interval that "brackets" the root.

*   **Plain English:** You need to find two starting points, let's call them $a$ and $b$, such that when you plug them into your function, one gives a positive result and the other gives a negative result. This tells you the root *must* be somewhere between $a$ and $b$.
*   **Concrete Example:** If you're looking for the root of $f(x) = x^2 - 2$, and you try $x=1$, you get $f(1) = 1^2 - 2 = -1$ (negative). If you try $x=2$, you get $f(2) = 2^2 - 2 = 2$ (positive). Since $f(1)$ is negative and $f(2)$ is positive, there *must* be a root between $1$ and $2$.
*   **Formal/Mathematical:** Given a continuous function $f(x)$, find an interval $[a, b]$ such that $f(a) \cdot f(b) < 0$. This condition mathematically ensures that $f(a)$ and $f(b)$ have opposite signs.
*   **What could go wrong:** If $f(a) \cdot f(b) > 0$, there might be no root, or an even number of roots, or the function might not be continuous. The method won't work correctly.

### Step 2: Calculate the midpoint of the interval.

*   **Plain English:** Once you have your interval $[a, b]$, you guess the root is exactly in the middle. This is your first approximation.
*   **Concrete Example:** For our interval $[1, 2]$, the midpoint is $(1+2)/2 = 1.5$.
*   **Formal/Mathematical:** Calculate the midpoint $c = \frac{a+b}{2}$.
*   **What could go wrong:** If the root is not exactly at the midpoint, this guess will be wrong. But that's okay, we're iterating!

### Step 3: Evaluate the function at the midpoint.

*   **Plain English:** Plug your midpoint guess into the function to see what value it produces.
*   **Concrete Example:** For $f(x) = x^2 - 2$ and $c=1.5$, we calculate $f(1.5) = (1.5)^2 - 2 = 2.25 - 2 = 0.25$.
*   **Formal/Mathematical:** Compute $f(c)$.
*   **What could go wrong:** Nothing inherently wrong here, just a calculation.

### Step 4: Narrow down the interval based on the sign of $f(c)$.

*   **Plain English:** Now you compare the sign of $f(c)$ with the signs of $f(a)$ and $f(b)$. If $f(c)$ has the opposite sign of $f(a)$, then the root must be in the new interval $[a, c]$. If $f(c)$ has the opposite sign of $f(b)$, then the root must be in $[c, b]$. You essentially discard half of your current interval, keeping the half that still brackets the root.
*   **Concrete Example:** We had $f(1) = -1$, $f(2) = 2$, and $f(1.5) = 0.25$. Since $f(1.5)$ is positive, and $f(1)$ is negative, the root must be in $[1, 1.5]$. We discard the interval $[1.5, 2]$. Our new interval is $[1, 1.5]$.
*   **Formal/Mathematical:**
    *   If $f(c) = 0$, then $c$ is the root. (Highly unlikely in practice).
    *   If $f(a) \cdot f(c) < 0$, then the root is in $[a, c]$. Set $b_{new} = c$.
    *   If $f(b) \cdot f(c) < 0$, then the root is in $[c, b]$. Set $a_{new} = c$.
*   **What could go wrong:** If $f(c)$ is extremely close to zero, floating point precision issues might misinterpret its sign.

### Step 5: Repeat until the interval is sufficiently small.

*   **Plain English:** You keep repeating steps 2-4. Each time, your interval gets halved. You stop when the interval is so tiny that any point within it is a good enough approximation of the root for your needs.
*   **Concrete Example:** For our new interval $[1, 1.5]$:
    *   Midpoint: $(1+1.5)/2 = 1.25$.
    *   $f(1.25) = (1.25)^2 - 2 = 1.5625 - 2 = -0.4375$.
    *   Since $f(1.25)$ is negative and $f(1.5)$ is positive, the root is in $[1.25, 1.5]$.
    *   We continue this process.
*   **Formal/Mathematical:** Iterate steps 2-4 until $|b-a| < \epsilon$ (where $\epsilon$ is a small tolerance value) or until $|f(c)| < \epsilon$.
*   **What could go wrong:** If your tolerance $\epsilon$ is too small, you might run into floating-point precision limits, or the algorithm might take too many iterations to converge. If it's too large, your approximation won't be accurate enough.

---

### The Newton-Raphson Method: "Tangent Line Approximation"

The Newton-Raphson Method is generally much faster than Bisection, but it requires the function to be differentiable and can be sensitive to the initial guess.

### Step 1: Make an initial guess for the root.

*   **Plain English:** You start with a single number, $x_0$, that you think might be somewhat close to the root. It doesn't have to be perfect, just a reasonable starting point.
*   **Concrete Example:** For $f(x) = x^2 - 2$, let's guess $x_0 = 2$.
*   **Formal/Mathematical:** Choose an initial approximation $x_0$.
*   **What could go wrong:** A very poor initial guess can lead the method to diverge (move away from the root) or converge to a different root than intended.

### Step 2: Calculate the function value and its derivative at your current guess.

*   **Plain English:** At your current guess $x_n$, figure out two things: what $f(x_n)$ is (how far you are from zero) and what $f'(x_n)$ is (the slope of the function's graph at that point).
*   **Concrete Example:** For $f(x) = x^2 - 2$, its derivative is $f'(x) = 2x$.
    *   At $x_0 = 2$: $f(2) = 2^2 - 2 = 2$.
    *   At $x_0 = 2$: $f'(2) = 2 \cdot 2 = 4$.
*   **Formal/Mathematical:** Evaluate $f(x_n)$ and $f'(x_n)$.
*   **What could go wrong:** If $f'(x_n)$ is zero or very close to zero, the next step will involve division by zero or a very large number, leading to problems.

### Step 3: Use the tangent line to find a better guess.

*   **Plain English:** Imagine drawing a straight line that just touches the function's graph at your current guess $x_n$ (this is the tangent line). Now, extend that line until it crosses the x-axis. The point where it crosses is your *next*, hopefully much better, guess for the root.
*   **Concrete Example:** At $x_0 = 2$, $f(2)=2$ and $f'(2)=4$. The tangent line equation is $y - f(x_n) = f'(x_n)(x - x_n)$. We want to find where $y=0$.
    *   $0 - 2 = 4(x_1 - 2)$
    *   $-2 = 4x_1 - 8$
    *   $6 = 4x_1$
    *   $x_1 = 6/4 = 1.5$. This is our new guess.
*   **Formal/Mathematical:** The formula for the next approximation $x_{n+1}$ is derived from the tangent line equation $y - f(x_n) = f'(x_n)(x - x_n)$. Setting $y=0$ (to find the x-intercept) and solving for $x$ (which becomes $x_{n+1}$):
    $$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$
*   **What could go wrong:** As mentioned, if $f'(x_n)$ is zero, this formula blows up. If the tangent line is nearly horizontal, the next guess $x_{n+1}$ can be very far away, potentially diverging.

### Step 4: Repeat until the guess is sufficiently accurate.

*   **Plain English:** You take your new guess, $x_{n+1}$, and treat it as your current guess $x_n$. Then you repeat steps 2 and 3. You stop when the function value at your guess is very close to zero, or when your guesses stop changing significantly.
*   **Concrete Example:** Our new guess is $x_1 = 1.5$.
    *   $f(1.5) = (1.5)^2 - 2 = 0.25$.
    *   $f'(1.5) = 2 \cdot 1.5 = 3$.
    *   $x_2 = 1.5 - \frac{0.25}{3} = 1.5 - 0.08333... = 1.41666...$
    *   Notice how quickly we're approaching $\sqrt{2} \approx 1.41421$.
*   **Formal/Mathematical:** Iterate steps 2-3 until $|f(x_n)| < \epsilon$ or $|x_{n+1} - x_n| < \epsilon$.
*   **What could go wrong:** Similar to Bisection, an inappropriate tolerance can lead to either too many iterations or insufficient accuracy. The method might also oscillate around a local extremum or diverge if the function behaves poorly.

## 5. Worked examples — multiple, with every step shown

### Example 1: Bisection Method (Easy)
**Problem:** Find a root of $f(x) = x^3 - x - 1$ in the interval $[1, 2]$ to an accuracy of two decimal places for the root value.

**What's given:** Function $f(x) = x^3 - x - 1$, initial interval $[a, b] = [1, 2]$, desired accuracy for $x$ is $0.01$.
**What we want:** An approximation of the root $c$ such that $|b-a| < 0.01$.

**Step 1: Check initial interval.**
*   $f(a) = f(1) = (1)^3 - 1 - 1 = 1 - 1 - 1 = -1$
    *   *Explanation:* Evaluate the function at the lower bound.
*   $f(b) = f(2) = (2)^3 - 2 - 1 = 8 - 2 - 1 = 5$
    *   *Explanation:* Evaluate the function at the upper bound.
*   Since $f(1) = -1$ (negative) and $f(2) = 5$ (positive), $f(a) \cdot f(b) < 0$. A root exists in $[1, 2]$.
    *   *Explanation:* The signs are opposite, so the Intermediate Value Theorem guarantees a root is present.

**Iteration 1:**
*   Current interval: $[1, 2]$
*   Midpoint $c = \frac{1+2}{2} = 1.5$
    *   *Explanation:* Calculate the middle point of the current interval.
*   $f(c) = f(1.5) = (1.5)^3 - 1.5 - 1 = 3.375 - 1.5 - 1 = 0.875$
    *   *Explanation:* Evaluate the function at the midpoint.
*   Since $f(1) = -1$ (negative) and $f(1.5) = 0.875$ (positive), the root is in $[1, 1.5]$.
    *   *Explanation:* $f(c)$ has the same sign as $f(b)$, so we replace $b$ with $c$.
*   New interval: $[1, 1.5]$
*   Interval width: $1.5 - 1 = 0.5$. (Still greater than $0.01$).

**Iteration 2:**
*   Current interval: $[1, 1.5]$
*   Midpoint $c = \frac{1+1.5}{2} = 1.25$
    *   *Explanation:* Calculate the new midpoint.
*   $f(c) = f(1.25) = (1.25)^3 - 1.25 - 1 = 1.953125 - 1.25 - 1 = -0.296875$
    *   *Explanation:* Evaluate the function at the new midpoint.
*   Since $f(1.25) = -0.296875$ (negative) and $f(1.5) = 0.875$ (positive), the root is in $[1.25, 1.5]$.
    *   *Explanation:* $f(c)$ has the same sign as $f(a)$, so we replace $a$ with $c$.
*   New interval: $[1.25, 1.5]$
*   Interval width: $1.5 - 1.25 = 0.25$.

**Iteration 3:**
*   Current interval: $[1.25, 1.5]$
*   Midpoint $c = \frac{1.25+1.5}{2} = 1.375$
*   $f(c) = f(1.375) = (1.375)^3 - 1.375 - 1 = 2.593994 - 1.375 - 1 = 0.218994$
*   Since $f(1.25)$ is negative and $f(1.375)$ is positive, the root is in $[1.25, 1.375]$.
*   New interval: $[1.25, 1.375]$
*   Interval width: $1.375 - 1.25 = 0.125$.

**Iteration 4:**
*   Current interval: $[1.25, 1.375]$
*   Midpoint $c = \frac{1.25+1.375}{2} = 1.3125$
*   $f(c) = f(1.3125) = (1.3125)^3 - 1.3125 - 1 = 2.260986 - 1.3125 - 1 = -0.051514$
*   Since $f(1.3125)$ is negative and $f(1.375)$ is positive, the root is in $[1.3125, 1.375]$.
*   New interval: $[1.3125, 1.375]$
*   Interval width: $1.375 - 1.3125 = 0.0625$.

**Iteration 5:**
*   Current interval: $[1.3125, 1.375]$
*   Midpoint $c = \frac{1.3125+1.375}{2} = 1.34375$
*   $f(c) = f(1.34375) = (1.34375)^3 - 1.34375 - 1 = 2.427002 - 1.34375 - 1 = 0.083252$
*   Since $f(1.3125)$ is negative and $f(1.34375)$ is positive, the root is in $[1.3125, 1.34375]$.
*   New interval: $[1.3125, 1.34375]$
*   Interval width: $1.34375 - 1.3125 = 0.03125$.

**Iteration 6:**
*   Current interval: $[1.3125, 1.34375]$
*   Midpoint $c = \frac{1.3125+1.34375}{2} = 1.328125$
*   $f(c) = f(1.328125) = (1.328125)^3 - 1.328125 - 1 = 2.343169 - 1.328125 - 1 = 0.015044$
*   Since $f(1.3125)$ is negative and $f(1.328125)$ is positive, the root is in $[1.3125, 1.328125]$.
*   New interval: $[1.3125, 1.328125]$
*   Interval width: $1.328125 - 1.3125 = 0.015625$.

**Iteration 7:**
*   Current interval: $[1.3125, 1.328125]$
*   Midpoint $c = \frac{1.3125+1.328125}{2} = 1.3203125$
*   $f(c) = f(1.3203125) = (1.3203125)^3 - 1.3203125 - 1 = 2.301556 - 1.3203125 - 1 = -0.0187565$
*   Since $f(1.3203125)$ is negative and $f(1.328125)$ is positive, the root is in $[1.3203125, 1.328125]$.
*   New interval: $[1.3203125, 1.328125]$
*   Interval width: $1.328125 - 1.3203125 = 0.0078125$.
    *   *Explanation:* The interval width is now less than $0.01$, so we can stop.

The approximate root is the midpoint of the final interval, or any value within it.
Final interval: $[1.3203125, 1.328125]$.
Midpoint of final interval: $1.32421875$.
Rounding to two decimal places, we get $\mathbf{1.32}$.

**Reflection:** This example shows the steady, predictable, but somewhat slow convergence of the Bisection Method. Each iteration halves the uncertainty, but it takes many steps to achieve high precision. The "trickiness" here is simply the number of iterations required to meet the tolerance.

### Example 2: Newton-Raphson Method (Easy)
**Problem:** Find a root of $f(x) = x^2 - 5$ starting with an initial guess $x_0 = 2$, accurate to 4 decimal places.

**What's given:** Function $f(x) = x^2 - 5$, initial guess $x_0 = 2$, desired accuracy for $x$ is $0.0001$.
**What we want:** An approximation of the root $x$ such that $|x_{n+1} - x_n| < 0.0001$.

**Step 1: Define the function and its derivative.**
*   $f(x) = x^2 - 5$
    *   *Explanation:* The function for which we want to find the root.
*   $f'(x) = 2x$
    *   *Explanation:* The derivative of the function, needed for Newton-Raphson.

**Iteration 1:**
*   Initial guess $x_0 = 2$.
    *   *Explanation:* Start with the given guess.
*   $f(x_0) = f(2) = (2)^2 - 5 = 4 - 5 = -1$
    *   *Explanation:* Evaluate the function at the current guess.
*   $f'(x_0) = f'(2) = 2 \cdot 2 = 4$
    *   *Explanation:* Evaluate the derivative at the current guess.
*   Calculate the next approximation $x_1$:
    $$x_1 = x_0 - \frac{f(x_0)}{f'(x_0)} = 2 - \frac{-1}{4} = 2 + 0.25 = 2.25$$
    *   *Explanation:* Apply the Newton-Raphson formula to get a new, improved guess.
*   Check convergence: $|x_1 - x_0| = |2.25 - 2| = 0.25$. (Greater than $0.0001$).

**Iteration 2:**
*   Current guess $x_1 = 2.25$.
    *   *Explanation:* The previous result becomes the new current guess.
*   $f(x_1) = f(2.25) = (2.25)^2 - 5 = 5.0625 - 5 = 0.0625$
*   $f'(x_1) = f'(2.25) = 2 \cdot 2.25 = 4.5$
*   Calculate the next approximation $x_2$:
    $$x_2 = x_1 - \frac{f(x_1)}{f'(x_1)} = 2.25 - \frac{0.0625}{4.5} \approx 2.25 - 0.0138888... \approx 2.2361111...$$
*   Check convergence: $|x_2 - x_1| = |2.2361111... - 2.25| \approx |-0.0138888...| \approx 0.01388$. (Still greater than $0.0001$).

**Iteration 3:**
*   Current guess $x_2 \approx 2.2361111$.
*   $f(x_2) = f(2.2361111) = (2.2361111)^2 - 5 \approx 4.99999999... - 5 \approx 0.000000002$
    *   *Explanation:* Notice how close $f(x_2)$ is to zero already. This indicates rapid convergence.
*   $f'(x_2) = f'(2.2361111) = 2 \cdot 2.2361111 = 4.4722222$
*   Calculate the next approximation $x_3$:
    $$x_3 = x_2 - \frac{f(x_2)}{f'(x_2)} = 2.2361111 - \frac{0.000000002}{4.4722222} \approx 2.2361111 - 0.0000000004... \approx 2.2360679...$$
*   Check convergence: $|x_3 - x_2| = |2.2360679... - 2.2361111...| \approx |-0.0000432...| \approx 0.0000432$. (Less than $0.0001$). We can stop.

The approximate root is $x_3 \approx 2.2360679$.
Rounding to 4 decimal places, we get $\mathbf{2.2361}$.

**Reflection:** This example demonstrates the quadratic convergence of Newton-Raphson. The number of correct digits roughly doubles with each iteration. The "trickiness" is ensuring the derivative is correctly calculated and that the initial guess is reasonable enough not to cause divergence.

### Example 3: Bisection Method (Medium)
**Problem:** Find the positive root of $f(x) = e^x - 3x$ in the interval $[0, 1]$ to an absolute error in $f(x)$ less than $0.001$.

**What's given:** Function $f(x) = e^x - 3x$, initial interval $[a, b] = [0, 1]$, desired accuracy for $f(x)$ is $0.001$.
**What we want:** An approximation of the root $c$ such that $|f(c)| < 0.001$.

**Step 1: Check initial interval.**
*   $f(a) = f(0) = e^0 - 3(0) = 1 - 0 = 1$
*   $f(b) = f(1) = e^1 - 3(1) = 2.71828 - 3 = -0.28172$
*   Since $f(0) = 1$ (positive) and $f(1) = -0.28172$ (negative), a root exists in $[0, 1]$.

**Iteration 1:**
*   Current interval: $[0, 1]$
*   Midpoint $c = \frac{0+1}{2} = 0.5$
*   $f(c) = f(0.5) = e^{0.5} - 3(0.5) = 1.64872 - 1.5 = 0.14872$
    *   *Explanation:* $|f(c)| = 0.14872$ is not less than $0.001$.
*   Since $f(0.5)$ is positive and $f(1)$ is negative, the root is in $[0.5, 1]$.
*   New interval: $[0.5, 1]$

**Iteration 2:**
*   Current interval: $[0.5, 1]$
*   Midpoint $c = \frac{0.5+1}{2} = 0.75$
*   $f(c) = f(0.75) = e^{0.75} - 3(0.75) = 2.11700 - 2.25 = -0.13300$
    *   *Explanation:* $|f(c)| = 0.13300$ is not less than $0.001$.
*   Since $f(0.5)$ is positive and $f(0.75)$ is negative, the root is in $[0.5, 0.75]$.
*   New interval: $[0.5, 0.75]$

**Iteration 3:**
*   Current interval: $[0.5, 0.75]$
*   Midpoint $c = \frac{0.5+0.75}{2} = 0.625$
*   $f(c) = f(0.625) = e^{0.625} - 3(0.625) = 1.86825 - 1.875 = -0.00675$
    *   *Explanation:* $|f(c)| = 0.00675$ is not less than $0.001$.
*   Since $f(0.5)$ is positive and $f(0.625)$ is negative, the root is in $[0.5, 0.625]$.
*   New interval: $[0.5, 0.625]$

**Iteration 4:**
*   Current interval: $[0.5, 0.625]$
*   Midpoint $c = \frac{0.5+0.625}{2} = 0.5625$
*   $f(c) = f(0.5625) = e^{0.5625} - 3(0.5625) = 1.75505 - 1.6875 = 0.06755$
    *   *Explanation:* $|f(c)| = 0.06755$ is not less than $0.001$.
*   Since $f(0.5625)$ is positive and $f(0.625)$ is negative, the root is in $[0.5625, 0.625]$.
*   New interval: $[0.5625, 0.625]$

**Iteration 5:**
*   Current interval: $[0.5625, 0.625]$
*   Midpoint $c = \frac{0.5625+0.625}{2} = 0.59375$
*   $f(c) = f(0.59375) = e^{0.59375} - 3(0.59375) = 1.81078 - 1.78125 = 0.02953$
    *   *Explanation:* $|f(c)| = 0.02953$ is not less than $0.001$.
*   Since $f(0.59375)$ is positive and $f(0.625)$ is negative, the root is in $[0.59375, 0.625]$.
*   New interval: $[0.59375, 0.625]$

**Iteration 6:**
*   Current interval: $[0.59375, 0.625]$
*   Midpoint $c = \frac{0.59375+0.625}{2} = 0.609375$
*   $f(c) = f(0.609375) = e^{0.609375} - 3(0.609375) = 1.83935 - 1.828125 = 0.011225$
    *   *Explanation:* $|f(c)| = 0.011225$ is not less than $0.001$.
*   Since $f(0.609375)$ is positive and $f(0.625)$ is negative, the root is in $[0.609375, 0.625]$.
*   New interval: $[0.609375, 0.625]$

**Iteration 7:**
*   Current interval: $[0.609375, 0.625]$
*   Midpoint $c = \frac{0.609375+0.625}{2} = 0.6171875$
*   $f(c) = f(0.6171875) = e^{0.6171875} - 3(0.6171875) = 1.85392 - 1.8515625 = 0.0023575$
    *   *Explanation:* $|f(c)| = 0.0023575$ is not less than $0.001$.
*   Since $f(0.6171875)$ is positive and $f(0.625)$ is negative, the root is in $[0.6171875, 0.625]$.
*   New interval: $[0.6171875, 0.625]$

**Iteration 8:**
*   Current interval: $[0.6171875, 0.625]$
*   Midpoint $c = \frac{0.6171875+0.625}{2} = 0.62109375$
*   $f(c) = f(0.62109375) = e^{0.62109375} - 3(0.62109375) = 1.86105 - 1.86328125 = -0.00223125$
    *   *Explanation:* $|f(c)| = 0.00223125$ is not less than $0.001$.
*   Since $f(0.6171875)$ is positive and $f(0.62109375)$ is negative, the root is in $[0.6171875, 0.62109375]$.
*   New interval: $[0.6171875, 0.62109375]$

**Iteration 9:**
*   Current interval: $[0.6171875, 0.62109375]$
*   Midpoint $c = \frac{0.6171875+0.62109375}{2} = 0.619140625$
*   $f(c) = f(0.619140625) = e^{0.619140625} - 3(0.619140625) = 1.85748 - 1.857421875 = 0.000058125$
    *   *Explanation:* $|f(c)| = 0.000058125$ is less than $0.001$. We can stop.

The approximate root is $c \approx 0.619140625$.
Rounding to a reasonable number of decimal places (e.g., 5), we get $\mathbf{0.61914}$.

**Reflection:** This example highlights that the stopping condition can be based on the absolute error of $f(x)$ (how close the function value is to zero) rather than the interval width. It also shows that even for a relatively simple function, Bisection can require many iterations for high accuracy. The "trickiness" here was keeping track of many iterations and ensuring the correct stopping condition was met.

### Example 4: Newton-Raphson Method (Medium/Hard)
**Problem:** Find a root of $f(x) = \ln(x) - x + 2$ using Newton-Raphson, starting with $x_0 = 1$, accurate to 6 decimal places.

**What's given:** Function $f(x) = \ln(x) - x + 2$, initial guess $x_0 = 1$, desired accuracy for $x$ is $0.000001$.
**What we want:** An approximation of the root $x$ such that $|x_{n+1} - x_n| < 0.000001$.

**Step 1: Define the function and its derivative.**
*   $f(x) = \ln(x) - x + 2$
    *   *Explanation:* The function for which we want the root. Note that $\ln(x)$ requires $x > 0$.
*   $f'(x) = \frac{1}{x} - 1$
    *   *Explanation:* The derivative of the function.

**Iteration 1:**
*   Initial guess $x_0 = 1$.
*   $f(x_0) = f(1) = \ln(1) - 1 + 2 = 0 - 1 + 2 = 1$
*   $f'(x_0) = f'(1) = \frac{1}{1} - 1 = 1 - 1 = 0$
    *   *Explanation:* Uh oh! The derivative is zero. This means the tangent line is horizontal, and it will never cross the x-axis (or it's parallel to the x-axis). This causes division by zero in the Newton-Raphson formula.

**Problem Encountered:** $f'(x_0) = 0$. Newton-Raphson fails.
**Reflection:** This is a classic "what could go wrong" scenario. If the derivative is zero at or near the guess, Newton-Raphson breaks down. In this case, $x=1$ is a local maximum for $f(x)$ (since $f'(1)=0$ and $f''(x) = -1/x^2$, so $f''(1) = -1 < 0$).
We need to choose a different initial guess. Let's try $x_0 = 0.5$ or $x_0 = 3$.
Let's analyze the function:
$f(x) = \ln(x) - x + 2$
$f'(x) = 1/x - 1$
$f'(x) = 0$ implies $1/x = 1$, so $x=1$. This is where the local maximum is.
Let's try $x_0 = 3$.

**Restart with $x_0 = 3$:**

**Iteration 1 (restarted):**
*   Initial guess $x_0 = 3$.
*   $f(x_0) = f(3) = \ln(3) - 3 + 2 \approx 1.098612 - 3 + 2 = 0.098612$
*   $f'(x_0) = f'(3) = \frac{1}{3} - 1 = 0.333333 - 1 = -0.666667$
*   Calculate the next approximation $x_1$:
    $$x_1 = x_0 - \frac{f(x_0)}{f'(x_0)} = 3 - \frac{0.098612}{-0.666667} \approx 3 - (-0.147918) = 3.147918$$
*   Check convergence: $|x_1 - x_0| = |3.147918 - 3| = 0.147918$. (Greater than $0.000001$).

**Iteration 2:**
*   Current guess $x_1 = 3.147918$.
*   $f(x_1) = f(3.147918) = \ln(3.147918) - 3.147918 + 2 \approx 1.146743 - 3.147918 + 2 = -0.001175$
*   $f'(x_1) = f'(3.147918) = \frac{1}{3.147918} - 1 \approx 0.317666 - 1 = -0.682334$
*   Calculate the next approximation $x_2$:
    $$x_2 = x_1 - \frac{f(x_1)}{f'(x_1)} = 3.147918 - \frac{-0.001175}{-0.682334} \approx 3.147918 - 0.001722 \approx 3.146196$$
*   Check convergence: $|x_2 - x_1| = |3.146196 - 3.147918| = |-0.001722| = 0.001722$. (Still greater than $0.000001$).

**Iteration 3:**
*   Current guess $x_2 = 3.146196$.
*   $f(x_2) = f(3.146196) = \ln(3.146196) - 3.146196 + 2 \approx 1.146196 - 3.146196 + 2 = 0.000000$ (very close to zero)
*   $f'(x_2) = f'(3.146196) = \frac{1}{3.146196} - 1 \approx 0.317822 - 1 = -0.682178$
*   Calculate the next approximation $x_3$:
    $$x_3 = x_2 - \frac{f(x_2)}{f'(x_2)} = 3.146196 - \frac{0.000000}{-0.682178} \approx 3.146196 - 0 = 3.146196$$
*   Check convergence: $|x_3 - x_2| = |3.146196 - 3.146196| = 0$. (Less than $0.000001$). We can stop.

The approximate root is $\mathbf{3.146196}$.

**Reflection:** This example perfectly illustrates the critical importance of a good initial guess for Newton-Raphson. An initial guess at a local extremum (where the derivative is zero) causes immediate failure. After choosing a more appropriate guess, the method converged very rapidly, showing its power when conditions are favorable. The "trickiness" was identifying the failure mode and knowing how to recover (by choosing a new initial guess).

## 6. Common mistakes and traps

1.  **Incorrect Initial Interval (Bisection):** Not ensuring that $f(a)$ and $f(b)$ have opposite signs. If they have the same sign, there might be no root, or an even number of roots, or the function might be discontinuous, and the Bisection Method will either fail to converge to a root or converge to a non-existent one.
2.  **Derivative is Zero or Near Zero (Newton-Raphson):** If $f'(x_n)$ is zero or very small at any point during the Newton-Raphson iteration, the division $f(x_n)/f'(x_n)$ will lead to an undefined result (division by zero) or a very large step that sends the next guess far away, often causing divergence. This happens if the guess is near a local extremum.
3.  **Poor Initial Guess (Newton-Raphson):** A bad starting point for Newton-Raphson can lead to divergence (the guesses move further and further away from the root), convergence to a different root than intended, or oscillation around a local extremum without finding a root.
4.  **Floating-Point Precision Issues:** Using a very small tolerance $\epsilon$ for stopping conditions (e.g., $|b-a| < \epsilon$ or $|f(x)| < \epsilon$) can lead to infinite loops or incorrect results due to the inherent limitations of floating-point arithmetic. Numbers that should be exactly zero might be represented as tiny non-zero values.
5.  **Not Handling Non-Convergence:** Both methods (especially Newton-Raphson) can fail to converge. Forgetting to implement a maximum number of iterations as a safeguard can lead to programs running indefinitely.
6.  **Discontinuous Functions:** The Bisection Method fundamentally relies on the Intermediate Value Theorem, which requires continuity. Applying it to a discontinuous function (e.g., $f(x)=1/x$ in $[-1,1]$) where a sign change occurs due to a discontinuity, not a root, will lead to incorrect results. Newton-Raphson also implicitly assumes differentiability and continuity.

## 7. Textbook-precise explanation

A **root** of a function $f(x)$ is a value $x=r$ such that $f(r) = 0$. The process of finding such values is called root-finding or finding zeros of a function.

### The Bisection Method

The Bisection Method is a bracketing method that relies on the **Intermediate Value Theorem (IVT)**.
**IVT Statement:** If $f$ is a continuous function on the closed interval $[a, b]$ and $k$ is any number between $f(a)$ and $f(b)$ (inclusive), then there is at least one number $c$ in $[a, b]$ such that $f(c) = k$.
For root-finding, if $f(a)$ and $f(b)$ have opposite signs, meaning $f(a)f(b) < 0$, then by the IVT, there must exist at least one root $r \in (a, b)$ such that $f(r) = 0$.

**Algorithm:**
1.  **Initialization:** Choose an interval $[a_0, b_0]$ such that $f(a_0)f(b_0) < 0$. Set $k=0$.
2.  **Iteration:**
    *   Calculate the midpoint $c_k = \frac{a_k + b_k}{2}$.
    *   Evaluate $f(c_k)$.
    *   If $f(c_k) = 0$, then $c_k$ is the root. Stop.
    *   If $f(a_k)f(c_k) < 0$, the root lies in $[a_k, c_k]$. Set $a_{k+1} = a_k$ and $b_{k+1} = c_k$.
    *   Else ($f(c_k)f(b_k) < 0$), the root lies in $[c_k, b_k]$. Set $a_{k+1} = c_k$ and $b_{k+1} = b_k$.
3.  **Termination:** Repeat step 2 until $|b_k - a_k| < \epsilon$ (a predefined tolerance for the interval width) or $|f(c_k)| < \delta$ (a predefined tolerance for the function value), or a maximum number of iterations is reached. The approximate root is then $c_k$ or $(a_k+b_k)/2$.

**Convergence:** The Bisection Method guarantees convergence to a root if $f$ is continuous and the initial interval brackets a root. The length of the interval is halved in each step, so after $n$ iterations, the interval length is $(b_0 - a_0)/2^n$. To achieve an error tolerance $\epsilon$, the number of iterations required is $n \ge \log_2\left(\frac{b_0 - a_0}{\epsilon}\right)$. This is considered **linear convergence**.

*Reference: Burden, R. L., & Faires, J. D. (2011). *Numerical Analysis* (9th ed.). Brooks Cole. Chapter 2.1.*

### The Newton-Raphson Method

The Newton-Raphson Method (often simply Newton's Method) is an open method that uses the tangent line approximation to iteratively find a root. It requires the function to be differentiable.

**Derivation:**
Assume we have an approximation $x_n$ to a root $r$. We can approximate $f(x)$ using its first-order Taylor polynomial around $x_n$:
$$f(x) \approx f(x_n) + f'(x_n)(x - x_n)$$
To find the root, we set $f(x) = 0$:
$$0 = f(x_n) + f'(x_n)(x - x_n)$$
Solving for $x$ (which will be our next approximation $x_{n+1}$):
$$f'(x_n)(x_{n+1} - x_n) = -f(x_n)$$
$$x_{n+1} - x_n = -\frac{f(x_n)}{f'(x_n)}$$
$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$

**Algorithm:**
1.  **Initialization:** Choose an initial guess $x_0$.
2.  **Iteration:** For $n = 0, 1, 2, \dots$, calculate the next approximation using the formula:
    $$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$
3.  **Termination:** Repeat step 2 until $|x_{n+1} - x_n| < \epsilon$ (a predefined tolerance for the change in $x$), or $|f(x_{n+1})| < \delta$ (a predefined tolerance for the function value), or a maximum number of iterations is reached.

**Convergence:** If $f(x)$, $f'(x)$, and $f''(x)$ are continuous in an interval containing the root $r$, and $f'(r) \neq 0$, and the initial guess $x_0$ is sufficiently close to $r$, then the Newton-Raphson Method exhibits **quadratic convergence**. This means that the number of correct decimal places approximately doubles with each iteration, making it very fast. However, it is not guaranteed to converge if the initial guess is far from the root, or if $f'(x_n)$ is close to zero during iteration.

*Reference: Quarteroni, A., Sacco, R., & Saleri, F. (2007). *Numerical Mathematics* (2nd ed.). Springer. Chapter 4.2.*

## 8. ASCII diagrams

Here are conceptual ASCII diagrams for both methods.

```text
Diagram 1: Bisection Method

Function: f(x)
Root: R

Initial interval [a, b]
f(a) is negative, f(b) is positive.

f(x)
^
|      f(b) +
|           / \
|          /   \
|         /     \
+--------R-------x----------------->
|       / \     /
|      /   \   /
|     /     \ /
|    + f(a)
|

Iteration 1:
- Midpoint c1 = (a+b)/2
- Evaluate f(c1)
- If f(c1) is positive, new interval is [a, c1]
- If f(c1) is negative, new interval is [c1, b]

Let's assume f(c1) is positive (as shown below).
New interval: [a, c1]

f(x)
^
|           f(c1) +
|                 / \
|                /   \
|               /     \
+--------R-----c1------x----------->
|       / \   /
|      /   \ /
|     /     + f(a)
|    /
|

Iteration 2:
- Midpoint c2 = (a+c1)/2
- Evaluate f(c2)

Let's assume f(c2) is negative (as shown below).
New interval: [c2, c1]

f(x)
^
|                 f(c1) +
|                       /
|                      /
+--------c2----R-----c1-----x----->
|         \    /
|          \  /
|           + f(c2)
|
|

The interval containing the root R is continuously halved.
```

```text
Diagram 2: Newton-Raphson Method

Function: f(x)
Root: R

Start with initial guess x0.
Draw tangent line at (x0, f(x0)).
The x-intercept of the tangent line is the next guess x1.

f(x)
^
|
|         f(x0) +
|              /|
|             / |
|            /  |
|           /   |
+----------/----|----R--x----------->
|         x0    |   x1
|          \    |
|           \   |
|            \  |
|             \ |
|              \|
|               + (Tangent line crosses x-axis at x1)
|

Now, from x1, repeat the process.
Draw tangent line at (x1, f(x1)).
The x-intercept of this new tangent line is x2.

f(x)
^
|
|
|             f(x1) +
|                  /|
|                 / |
+----------------/--|--R-x--------->
|               x1  |  x2
|                \  |
|                 \ |
|                  \|
|                   + (Tangent line crosses x-axis at x2)
|

Notice how x1 is closer to R than x0, and x2 is even closer.
The tangent line "slides" down the function