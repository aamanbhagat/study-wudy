## 1. What it is — in plain English

Imagine you're trying to predict where a toy car will be in a few seconds. If you only look at its speed and direction *right now* and assume it stays exactly the same, you might be wrong if the car speeds up, slows down, or turns. This simple "assume current conditions" approach is like the basic Euler's method in mathematics.

Heun's method is a smarter way to predict. Instead of just assuming the current speed, it does a two-step prediction. First, it makes a quick, rough guess about where the car *might* be if it kept its current speed (this is the "predictor" step, like Euler's).

But then, it doesn't stop there! It looks at that rough predicted location and asks, "What would the car's speed and direction be *at that predicted spot*?" Once it has the current speed and the *predicted* speed, it averages these two speeds together.

Finally, it uses this *average* speed to make its final, more accurate prediction of where the car will actually end up. It's like saying, "Okay, the car started at 10 mph, and I guess it'll be going 20 mph by the time it reaches the next point, so let's use an average speed of 15 mph for the journey." This averaging makes the prediction much more reliable than just using the starting speed alone.

## 2. Why it matters — real-world applications

Numerical methods like Heun's are crucial because many real-world problems can be described by differential equations that are impossible or extremely difficult to solve exactly with pen and paper. When an exact, closed-form solution isn't available, we turn to numerical approximations. Heun's method, being more accurate than simple Euler's, provides a good balance of accuracy and computational cost for many applications.

1.  **Aerospace Engineering (Trajectory Prediction):** When launching rockets or designing aircraft flight paths, engineers need to predict the trajectory under various forces (gravity, thrust, drag, wind). These forces often depend on the current position, velocity, and atmospheric conditions, leading to complex systems of differential equations. Heun's method can be used to numerically integrate these equations to predict the rocket's path, ensuring it reaches its target orbit or destination safely. Companies like SpaceX or NASA rely on such methods for mission planning and real-time adjustments.

2.  **Climate Modeling and Weather Prediction:** Atmospheric and oceanic models involve vast systems of partial differential equations that describe temperature, pressure, humidity, and fluid flow. To simulate how these systems evolve over time, they are discretized and solved numerically. While more advanced methods are often used for large-scale simulations, the principles of predictor-corrector methods like Heun's are foundational. Understanding how a system changes from one time step to the next is critical for predicting hurricanes, understanding climate change, or forecasting local weather.

3.  **Financial Modeling (Option Pricing):** In quantitative finance, models like the Black-Scholes equation (or its more complex variants) are used to price financial derivatives such as options. These are often partial differential equations, which can be reduced to systems of ordinary differential equations under certain conditions or solved using finite difference methods that employ similar numerical integration techniques. Heun's method could be applied, for instance, to simulate stochastic processes that model asset prices over time, helping traders and institutions manage risk and make investment decisions.

4.  **Physics Simulations (Particle Dynamics):** Simulating the motion of particles in a fluid, the behavior of molecules in a chemical reaction, or the movement of celestial bodies under gravitational forces all involve solving differential equations. For example, in molecular dynamics simulations, the forces between atoms depend on their current positions. Heun's method, or its higher-order relatives, can be used to update the positions and velocities of these particles over small time steps, allowing researchers to study material properties, drug interactions, or astrophysical phenomena.

## 3. Prerequisites — what you must know first

Before diving deep into Heun's method, ensure you have a solid understanding of these fundamental concepts:

*   **Derivatives:** The concept of an instantaneous rate of change; how to calculate $dy/dx$ for various functions.
*   **Integrals:** The concept of accumulation or area under a curve; how to calculate definite and indefinite integrals.
*   **Differential Equations (ODEs):** What an ordinary differential equation is, how to identify its order, and what an initial value problem (IVP) entails ($dy/dx = f(x,y)$ with $y(x_0)=y_0$).
*   **Taylor Series:** The idea of approximating a function using an infinite sum of terms based on its derivatives at a single point. This is crucial for understanding the *error* in numerical methods.
*   **Euler's Method:** The simplest numerical method for solving ODEs, which forms the "predictor" step of Heun's method. You should understand its formula and why it works (approximating the curve with its tangent line).
*   **Slope:** The gradient of a line or a curve at a point, representing its steepness.
*   **Average:** How to calculate the mean of two or more numbers.

## 4. The core idea — step by step

Heun's method, also known as the Modified Euler method or the Improved Euler method, is a predictor-corrector method. It improves upon the basic Euler's method by using an average of two slopes to estimate the next point, leading to greater accuracy.

Let's assume we have an initial value problem (IVP) of the form:
$$ \frac{dy}{dx} = f(x, y) $$
with an initial condition $y(x_0) = y_0$. We want to find the value of $y$ at subsequent points $x_1, x_2, \ldots, x_n$. We'll use a constant step size $h = x_{n+1} - x_n$.

### Step 1: Understand the Problem and Initial Conditions

*   **Plain English:** We're given a rule (the differential equation) that tells us how fast $y$ is changing with respect to $x$ at any point $(x,y)$. We also know where we start ($x_0, y_0$). Our goal is to find out where we'll be after a small step in $x$.
*   **Small Concrete Example:** Suppose $dy/dx = x+y$, and we start at $(x_0, y_0) = (0, 1)$. We want to find $y(0.1)$ using a step size $h=0.1$.
*   **Formal/Mathematical Version:**
    Given:
    $$ \frac{dy}{dx} = f(x, y) $$
    $$ y(x_0) = y_0 $$
    We want to approximate $y(x_1), y(x_2), \ldots$ where $x_{n+1} = x_n + h$.
*   **What Could Go Wrong:** Misinterpreting $f(x,y)$ or incorrectly identifying $x_0$ and $y_0$. Forgetting to define a step size $h$.

### Step 2: Make an Initial Prediction (Euler's Predictor Step)

*   **Plain English:** First, we make a rough guess. We use the slope at our current point $(x_n, y_n)$ to predict where we'll be at the next point, $(x_{n+1})$. This is exactly what basic Euler's method does. We call this predicted value $y_{n+1}^*$ (pronounced "y-n-plus-one star").
*   **Small Concrete Example:**
    From $(x_0, y_0) = (0, 1)$ and $f(x,y) = x+y$, with $h=0.1$:
    The slope at $(0,1)$ is $f(0,1) = 0+1 = 1$.
    Our predicted $y_1^*$ would be $y_0 + h \cdot f(x_0, y_0) = 1 + 0.1 \cdot 1 = 1.1$.
    So, our rough guess for $y(0.1)$ is $1.1$.
*   **Formal/Mathematical Version:**
    $$ y_{n+1}^* = y_n + h \cdot f(x_n, y_n) $$
    where $y_{n+1}^*$ is the predicted value of $y$ at $x_{n+1}$.
*   **What Could Go Wrong:** Calculating $f(x_n, y_n)$ incorrectly. Using the wrong $h$. This prediction itself is prone to error, which is why we need the next step.

### Step 3: Calculate the Slope at the Predicted Point

*   **Plain English:** Now that we have our rough guess for the next point $(x_{n+1}, y_{n+1}^*)$, we calculate what the slope *would be* if we were actually at that predicted point. This gives us a "future" slope.
*   **Small Concrete Example:**
    We predicted that at $x_1 = 0.1$, $y_1^*$ would be $1.1$.
    Now, calculate the slope at this *predicted* point: $f(x_1, y_1^*) = f(0.1, 1.1) = 0.1 + 1.1 = 1.2$.
    So, our "future" slope is $1.2$.
*   **Formal/Mathematical Version:**
    Calculate $f(x_{n+1}, y_{n+1}^*)$.
*   **What Could Go Wrong:** Using $y_n$ instead of $y_{n+1}^*$ in this calculation. Using $x_n$ instead of $x_{n+1}$. It's crucial to use the *predicted* point.

### Step 4: Average the Two Slopes

*   **Plain English:** We now have two slopes: the slope at our starting point $(x_n, y_n)$ and the slope at our predicted next point $(x_{n+1}, y_{n+1}^*)$. We take the average of these two slopes. This average slope is considered a better representation of the "average rate of change" over the interval $[x_n, x_{n+1}]$.
*   **Small Concrete Example:**
    Starting slope (from Step 2): $f(x_0, y_0) = 1$.
    Predicted slope (from Step 3): $f(x_1, y_1^*) = 1.2$.
    Average slope: $\frac{1 + 1.2}{2} = \frac{2.2}{2} = 1.1$.
*   **Formal/Mathematical Version:**
    $$ \text{Average Slope} = \frac{f(x_n, y_n) + f(x_{n+1}, y_{n+1}^*)}{2} $$
*   **What Could Go Wrong:** Incorrectly averaging or using only one of the slopes. This average is the core improvement of Heun's method.

### Step 5: Make the Corrected Prediction (Corrector Step)

*   **Plain English:** Instead of using just the initial slope (like Euler's) or just the predicted slope, we use this newly calculated *average slope* to make our final, more accurate estimation for $y_{n+1}$.
*   **Small Concrete Example:**
    We started at $y_0 = 1$. Our step size $h=0.1$. Our average slope is $1.1$.
    Our corrected $y_1$ is $y_0 + h \cdot (\text{Average Slope}) = 1 + 0.1 \cdot 1.1 = 1 + 0.11 = 1.11$.
    So, our final, more accurate estimate for $y(0.1)$ is $1.11$.
*   **Formal/Mathematical Version:**
    $$ y_{n+1} = y_n + h \cdot \frac{f(x_n, y_n) + f(x_{n+1}, y_{n+1}^*)}{2} $$
    This is the final value for $y$ at $x_{n+1}$.
*   **What Could Go Wrong:** Forgetting to multiply by $h$. Using the predicted $y_{n+1}^*$ instead of $y_n$ as the starting point for this step. The corrector step *always* starts from $y_n$, not $y_{n+1}^*$.

### Step 6: Update and Repeat

*   **Plain English:** We've found $y_1$ at $x_1$. Now, to find $y_2$ at $x_2$, we treat $(x_1, y_1)$ as our new starting point $(x_n, y_n)$ and repeat Steps 2 through 5.
*   **Small Concrete Example:**
    For the next step, our new starting point is $(x_1, y_1) = (0.1, 1.11)$.
    We would then calculate $x_2 = x_1 + h = 0.1 + 0.1 = 0.2$.
    Then repeat the process to find $y_2$.
*   **Formal/Mathematical Version:**
    Set $n \leftarrow n+1$ and repeat the process until the desired $x$ value is reached.
*   **What Could Go Wrong:** Incorrectly updating $x_n$ or $y_n$ for the next iteration.

In summary, Heun's method takes an Euler step to *predict* a future point, then uses that predicted point to calculate a *better average slope*, which it then uses to *correct* its initial estimate. This "predictor-corrector" approach significantly reduces the error compared to the basic Euler method.

## 5. Worked examples — multiple, with every step shown

### Example 1: Simple Linear ODE

**Problem:** Use Heun's method to approximate $y(0.2)$ for the initial value problem $y' = y$, with $y(0)=1$ and step size $h=0.1$.

**Given:**
*   Differential equation: $y' = f(x,y) = y$
*   Initial condition: $(x_0, y_0) = (0, 1)$
*   Step size: $h = 0.1$
*   Target: $y(0.2)$ (means we need two steps)

**Step 1: First Iteration (from $x_0=0$ to $x_1=0.1$)**

1.  **Identify current point:** $(x_0, y_0) = (0, 1)$.
2.  **Calculate $x_1$:**
    $$ x_1 = x_0 + h = 0 + 0.1 = 0.1 $$
    *This is the next x-value we want to find y for.*
3.  **Predict $y_1^*$ (Euler's Predictor):**
    $$ y_1^* = y_0 + h \cdot f(x_0, y_0) $$
    $$ y_1^* = 1 + 0.1 \cdot f(0, 1) $$
    *This is our initial guess for y at x_1, using the slope at (x_0, y_0).*
    Calculate $f(0, 1)$:
    $$ f(0, 1) = 1 \quad (\text{since } f(x,y) = y) $$
    Substitute back:
    $$ y_1^* = 1 + 0.1 \cdot 1 = 1 + 0.1 = 1.1 $$
    *So, our predicted value for y at x=0.1 is 1.1.*
4.  **Calculate slope at predicted point:**
    $$ f(x_1, y_1^*) = f(0.1, 1.1) $$
    *We need the slope at our predicted future point (0.1, 1.1).*
    $$ f(0.1, 1.1) = 1.1 \quad (\text{since } f(x,y) = y) $$
    *The slope at the predicted point is 1.1.*
5.  **Calculate average slope:**
    $$ \text{Average Slope} = \frac{f(x_0, y_0) + f(x_1, y_1^*)}{2} $$
    $$ \text{Average Slope} = \frac{1 + 1.1}{2} = \frac{2.1}{2} = 1.05 $$
    *This is the average of the slope at the start of the interval and the slope at the predicted end of the interval.*
6.  **Correct $y_1$ (Corrector Step):**
    $$ y_1 = y_0 + h \cdot (\text{Average Slope}) $$
    $$ y_1 = 1 + 0.1 \cdot 1.05 = 1 + 0.105 = 1.105 $$
    *This is our final, more accurate estimate for y at x=0.1, using the average slope.*
    So, after the first step, our new point is $(x_1, y_1) = (0.1, 1.105)$.

**Step 2: Second Iteration (from $x_1=0.1$ to $x_2=0.2$)**

1.  **Identify current point:** $(x_1, y_1) = (0.1, 1.105)$.
2.  **Calculate $x_2$:**
    $$ x_2 = x_1 + h = 0.1 + 0.1 = 0.2 $$
    *This is the target x-value.*
3.  **Predict $y_2^*$ (Euler's Predictor):**
    $$ y_2^* = y_1 + h \cdot f(x_1, y_1) $$
    $$ y_2^* = 1.105 + 0.1 \cdot f(0.1, 1.105) $$
    *Using our newly found point (0.1, 1.105) as the starting point.*
    Calculate $f(0.1, 1.105)$:
    $$ f(0.1, 1.105) = 1.105 \quad (\text{since } f(x,y) = y) $$
    Substitute back:
    $$ y_2^* = 1.105 + 0.1 \cdot 1.105 = 1.105 + 0.1105 = 1.2155 $$
    *Predicted y at x=0.2 is 1.2155.*
4.  **Calculate slope at predicted point:**
    $$ f(x_2, y_2^*) = f(0.2, 1.2155) $$
    *Slope at the predicted future point (0.2, 1.2155).*
    $$ f(0.2, 1.2155) = 1.2155 \quad (\text{since } f(x,y) = y) $$
    *The slope at the predicted point is 1.2155.*
5.  **Calculate average slope:**
    $$ \text{Average Slope} = \frac{f(x_1, y_1) + f(x_2, y_2^*)}{2} $$
    $$ \text{Average Slope} = \frac{1.105 + 1.2155}{2} = \frac{2.3205}{2} = 1.16025 $$
    *Average of the slope at (0.1, 1.105) and the slope at (0.2, 1.2155).*
6.  **Correct $y_2$ (Corrector Step):**
    $$ y_2 = y_1 + h \cdot (\text{Average Slope}) $$
    $$ y_2 = 1.105 + 0.1 \cdot 1.16025 = 1.105 + 0.116025 = 1.221025 $$
    *Final estimate for y at x=0.2.*

**Final Answer:**
The approximation for $y(0.2)$ using Heun's method is $\boxed{1.221025}$.

**Reflection:** This was a straightforward application of the method. The exact solution to $y'=y, y(0)=1$ is $y(x)=e^x$. So $y(0.2) = e^{0.2} \approx 1.221402758$. Heun's method gave a very close approximation, showing its improvement over basic Euler (which would give $y(0.2) \approx 1.21$).

---

### Example 2: Non-Linear ODE with $x$ and $y$ dependence

**Problem:** Use Heun's method to approximate $y(1.2)$ for the initial value problem $y' = x - y^2$, with $y(1)=2$ and step size $h=0.1$.

**Given:**
*   Differential equation: $y' = f(x,y) = x - y^2$
*   Initial condition: $(x_0, y_0) = (1, 2)$
*   Step size: $h = 0.1$
*   Target: $y(1.2)$ (two steps)

**Step 1: First Iteration (from $x_0=1$ to $x_1=1.1$)**

1.  **Identify current point:** $(x_0, y_0) = (1, 2)$.
2.  **Calculate $x_1$:**
    $$ x_1 = x_0 + h = 1 + 0.1 = 1.1 $$
3.  **Predict $y_1^*$ (Euler's Predictor):**
    $$ y_1^* = y_0 + h \cdot f(x_0, y_0) $$
    $$ y_1^* = 2 + 0.1 \cdot f(1, 2) $$
    Calculate $f(1, 2)$:
    $$ f(1, 2) = 1 - (2)^2 = 1 - 4 = -3 $$
    Substitute back:
    $$ y_1^* = 2 + 0.1 \cdot (-3) = 2 - 0.3 = 1.7 $$
    *Predicted y at x=1.1 is 1.7.*
4.  **Calculate slope at predicted point:**
    $$ f(x_1, y_1^*) = f(1.1, 1.7) $$
    $$ f(1.1, 1.7) = 1.1 - (1.7)^2 = 1.1 - 2.89 = -1.79 $$
    *Slope at the predicted point (1.1, 1.7) is -1.79.*
5.  **Calculate average slope:**
    $$ \text{Average Slope} = \frac{f(x_0, y_0) + f(x_1, y_1^*)}{2} $$
    $$ \text{Average Slope} = \frac{-3 + (-1.79)}{2} = \frac{-4.79}{2} = -2.395 $$
    *Average of the initial slope (-3) and the predicted slope (-1.79).*
6.  **Correct $y_1$ (Corrector Step):**
    $$ y_1 = y_0 + h \cdot (\text{Average Slope}) $$
    $$ y_1 = 2 + 0.1 \cdot (-2.395) = 2 - 0.2395 = 1.7605 $$
    *Final estimate for y at x=1.1 is 1.7605.*
    So, after the first step, our new point is $(x_1, y_1) = (1.1, 1.7605)$.

**Step 2: Second Iteration (from $x_1=1.1$ to $x_2=1.2$)**

1.  **Identify current point:** $(x_1, y_1) = (1.1, 1.7605)$.
2.  **Calculate $x_2$:**
    $$ x_2 = x_1 + h = 1.1 + 0.1 = 1.2 $$
3.  **Predict $y_2^*$ (Euler's Predictor):**
    $$ y_2^* = y_1 + h \cdot f(x_1, y_1) $$
    $$ y_2^* = 1.7605 + 0.1 \cdot f(1.1, 1.7605) $$
    Calculate $f(1.1, 1.7605)$:
    $$ f(1.1, 1.7605) = 1.1 - (1.7605)^2 = 1.1 - 3.0992 = -1.9992 $$
    Substitute back:
    $$ y_2^* = 1.7605 + 0.1 \cdot (-1.9992) = 1.7605 - 0.19992 = 1.56058 $$
    *Predicted y at x=1.2 is 1.56058.*
4.  **Calculate slope at predicted point:**
    $$ f(x_2, y_2^*) = f(1.2, 1.56058) $$
    $$ f(1.2, 1.56058) = 1.2 - (1.56058)^2 = 1.2 - 2.43539 = -1.23539 $$
    *Slope at the predicted point (1.2, 1.56058) is -1.23539.*
5.  **Calculate average slope:**
    $$ \text{Average Slope} = \frac{f(x_1, y_1) + f(x_2, y_2^*)}{2} $$
    $$ \text{Average Slope} = \frac{-1.9992 + (-1.23539)}{2} = \frac{-3.23459}{2} = -1.6173 $$
    *Average of the slope at (1.1, 1.7605) and the slope at (1.2, 1.56058).*
6.  **Correct $y_2$ (Corrector Step):**
    $$ y_2 = y_1 + h \cdot (\text{Average Slope}) $$
    $$ y_2 = 1.7605 + 0.1 \cdot (-1.6173) = 1.7605 - 0.16173 = 1.59877 $$
    *Final estimate for y at x=1.2.*

**Final Answer:**
The approximation for $y(1.2)$ using Heun's method is $\boxed{1.59877}$.

**Reflection:** This example involved a non-linear function $f(x,y)=x-y^2$, making the calculations a bit more involved due to squaring $y$ values. The negative slopes indicate that $y$ is decreasing, which is consistent with the result. The calculations require careful attention to detail and precision.

---

### Example 3: Finding $y(0.1)$ with a smaller step size

**Problem:** Use Heun's method to approximate $y(0.1)$ for $y' = \cos(x) + y$, with $y(0)=0$ and step size $h=0.05$.

**Given:**
*   Differential equation: $y' = f(x,y) = \cos(x) + y$
*   Initial condition: $(x_0, y_0) = (0, 0)$
*   Step size: $h = 0.05$
*   Target: $y(0.1)$ (two steps)

**Step 1: First Iteration (from $x_0=0$ to $x_1=0.05$)**

1.  **Identify current point:** $(x_0, y_0) = (0, 0)$.
2.  **Calculate $x_1$:**
    $$ x_1 = x_0 + h = 0 + 0.05 = 0.05 $$
3.  **Predict $y_1^*$ (Euler's Predictor):**
    $$ y_1^* = y_0 + h \cdot f(x_0, y_0) $$
    $$ y_1^* = 0 + 0.05 \cdot f(0, 0) $$
    Calculate $f(0, 0)$:
    $$ f(0, 0) = \cos(0) + 0 = 1 + 0 = 1 $$
    Substitute back:
    $$ y_1^* = 0 + 0.05 \cdot 1 = 0.05 $$
    *Predicted y at x=0.05 is 0.05.*
4.  **Calculate slope at predicted point:**
    $$ f(x_1, y_1^*) = f(0.05, 0.05) $$
    $$ f(0.05, 0.05) = \cos(0.05) + 0.05 $$
    Using a calculator for $\cos(0.05)$ (in radians): $\cos(0.05) \approx 0.99875$
    $$ f(0.05, 0.05) \approx 0.99875 + 0.05 = 1.04875 $$
    *Slope at the predicted point (0.05, 0.05) is approximately 1.04875.*
5.  **Calculate average slope:**
    $$ \text{Average Slope} = \frac{f(x_0, y_0) + f(x_1, y_1^*)}{2} $$
    $$ \text{Average Slope} = \frac{1 + 1.04875}{2} = \frac{2.04875}{2} = 1.024375 $$
    *Average of the initial slope (1) and the predicted slope (1.04875).*
6.  **Correct $y_1$ (Corrector Step):**
    $$ y_1 = y_0 + h \cdot (\text{Average Slope}) $$
    $$ y_1 = 0 + 0.05 \cdot 1.024375 = 0.05121875 $$
    *Final estimate for y at x=0.05 is 0.05121875.*
    So, after the first step, our new point is $(x_1, y_1) = (0.05, 0.05121875)$.

**Step 2: Second Iteration (from $x_1=0.05$ to $x_2=0.1$)**

1.  **Identify current point:** $(x_1, y_1) = (0.05, 0.05121875)$.
2.  **Calculate $x_2$:**
    $$ x_2 = x_1 + h = 0.05 + 0.05 = 0.1 $$
3.  **Predict $y_2^*$ (Euler's Predictor):**
    $$ y_2^* = y_1 + h \cdot f(x_1, y_1) $$
    $$ y_2^* = 0.05121875 + 0.05 \cdot f(0.05, 0.05121875) $$
    Calculate $f(0.05, 0.05121875)$:
    $$ f(0.05, 0.05121875) = \cos(0.05) + 0.05121875 $$
    $$ f(0.05, 0.05121875) \approx 0.99875 + 0.05121875 = 1.04996875 $$
    *Predicted slope at (0.05, 0.05121875) is approximately 1.04996875.*
    Substitute back:
    $$ y_2^* = 0.05121875 + 0.05 \cdot 1.04996875 = 0.05121875 + 0.0524984375 = 0.1037171875 $$
    *Predicted y at x=0.1 is approximately 0.1037171875.*
4.  **Calculate slope at predicted point:**
    $$ f(x_2, y_2^*) = f(0.1, 0.1037171875) $$
    $$ f(0.1, 0.1037171875) = \cos(0.1) + 0.1037171875 $$
    Using a calculator for $\cos(0.1)$ (in radians): $\cos(0.1) \approx 0.99500$
    $$ f(0.1, 0.1037171875) \approx 0.99500 + 0.1037171875 = 1.0987171875 $$
    *Slope at the predicted point (0.1, 0.1037171875) is approximately 1.0987171875.*
5.  **Calculate average slope:**
    $$ \text{Average Slope} = \frac{f(x_1, y_1) + f(x_2, y_2^*)}{2} $$
    $$ \text{Average Slope} = \frac{1.04996875 + 1.0987171875}{2} = \frac{2.1486859375}{2} = 1.07434296875 $$
    *Average of the slope at (0.05, 0.05121875) and the slope at (0.1, 0.1037171875).*
6.  **Correct $y_2$ (Corrector Step):**
    $$ y_2 = y_1 + h \cdot (\text{Average Slope}) $$
    $$ y_2 = 0.05121875 + 0.05 \cdot 1.07434296875 = 0.05121875 + 0.0537171484375 = 0.1049358984375 $$
    *Final estimate for y at x=0.1.*

**Final Answer:**
The approximation for $y(0.1)$ using Heun's method is $\boxed{0.104935898}$. (Rounded to 9 decimal places for clarity).

**Reflection:** This example involved trigonometric functions and a smaller step size, leading to more decimal places in intermediate calculations. It highlights the need for careful arithmetic and maintaining precision throughout the steps. The exact solution to $y' = \cos(x)+y, y(0)=0$ is $y(x) = \frac{1}{2}(\sin(x) - \cos(x) + e^x)$. For $x=0.1$, $y(0.1) = \frac{1}{2}(\sin(0.1) - \cos(0.1) + e^{0.1}) \approx \frac{1}{2}(0.099833 - 0.995004 + 1.105171) \approx \frac{1}{2}(0.200000) = 0.100000$. My calculations seem off. Let me re-check the $y(0.1)$ exact value.
$y(0.1) = \frac{1}{2}(\sin(0.1) - \cos(0.1) + e^{0.1}) \approx \frac{1}{2}(0.0998334166 - 0.9950041653 + 1.1051709181) \approx \frac{1}{2}(0.2100001694) \approx 0.1050000847$.
So, the Heun's method result $0.104935898$ is quite close to the exact $0.1050000847$. The difference is about $0.000064$. This is a good approximation. The reflection should point out the importance of using enough precision throughout.

---

### Example 4: A more complex $f(x,y)$

**Problem:** Use Heun's method to approximate $y(0.5)$ for $y' = \frac{x^2 - y}{e^x}$, with $y(0)=1$ and step size $h=0.25$.

**Given:**
*   Differential equation: $y' = f(x,y) = \frac{x^2 - y}{e^x}$
*   Initial condition: $(x_0, y_0) = (0, 1)$
*   Step size: $h = 0.25$
*   Target: $y(0.5)$ (two steps)

**Step 1: First Iteration (from $x_0=0$ to $x_1=0.25$)**

1.  **Identify current point:** $(x_0, y_0) = (0, 1)$.
2.  **Calculate $x_1$:**
    $$ x_1 = x_0 + h = 0 + 0.25 = 0.25 $$
3.  **Predict $y_1^*$ (Euler's Predictor):**
    $$ y_1^* = y_0 + h \cdot f(x_0, y_0) $$
    $$ y_1^* = 1 + 0.25 \cdot f(0, 1) $$
    Calculate $f(0, 1)$:
    $$ f(0, 1) = \frac{0^2 - 1}{e^0} = \frac{-1}{1} = -1 $$
    Substitute back:
    $$ y_1^* = 1 + 0.25 \cdot (-1) = 1 - 0.25 = 0.75 $$
    *Predicted y at x=0.25 is 0.75.*
4.  **Calculate slope at predicted point:**
    $$ f(x_1, y_1^*) = f(0.25, 0.75) $$
    $$ f(0.25, 0.75) = \frac{(0.25)^2 - 0.75}{e^{0.25}} $$
    $(0.25)^2 = 0.0625$
    $e^{0.25} \approx 1.284025$
    $$ f(0.25, 0.75) = \frac{0.0625 - 0.75}{1.284025} = \frac{-0.6875}{1.284025} \approx -0.535425 $$
    *Slope at the predicted point (0.25, 0.75) is approximately -0.535425.*
5.  **Calculate average slope:**
    $$ \text{Average Slope} = \frac{f(x_0, y_0) + f(x_1, y_1^*)}{2} $$
    $$ \text{Average Slope} = \frac{-1 + (-0.535425)}{2} = \frac{-1.535425}{2} = -0.7677125 $$
    *Average of the initial slope (-1) and the predicted slope (-0.535425).*
6.  **Correct $y_1$ (Corrector Step):**
    $$ y_1 = y_0 + h \cdot (\text{Average Slope}) $$
    $$ y_1 = 1 + 0.25 \cdot (-0.7677125) = 1 - 0.191928125 = 0.808071875 $$
    *Final estimate for y at x=0.25 is 0.808071875.*
    So, after the first step, our new point is $(x_1, y_1) = (0.25, 0.808071875)$.

**Step 2: Second Iteration (from $x_1=0.25$ to $x_2=0.5$)**

1.  **Identify current point:** $(x_1, y_1) = (0.25, 0.808071875)$.
2.  **Calculate $x_2$:**
    $$ x_2 = x_1 + h = 0.25 + 0.25 = 0.5 $$
3.  **Predict $y_2^*$ (Euler's Predictor):**
    $$ y_2^* = y_1 + h \cdot f(x_1, y_1) $$
    $$ y_2^* = 0.808071875 + 0.25 \cdot f(0.25, 0.808071875) $$
    Calculate $f(0.25, 0.808071875)$:
    $$ f(0.25, 0.808071875) = \frac{(0.25)^2 - 0.808071875}{e^{0.25}} $$
    $$ f(0.25, 0.808071875) = \frac{0.0625 - 0.808071875}{1.284025} = \frac{-0.745571875}{1.284025} \approx -0.580652 $$
    *Predicted slope at (0.25, 0.808071875) is approximately -0.580652.*
    Substitute back:
    $$ y_2^* = 0.808071875 + 0.25 \cdot (-0.580652) = 0.808071875 - 0.145163 = 0.662908875 $$
    *Predicted y at x=0.5 is approximately 0.662908875.*
4.  **Calculate slope at predicted point:**
    $$ f(x_2, y_2^*) = f(0.5, 0.662908875) $$
    $$ f(0.5, 0.662908875) = \frac{(0.5)^2 - 0.662908875}{e^{0.5}} $$
    $(0.5)^2 = 0.25$
    $e^{0.5} \approx 1.648721$
    $$ f(0.5, 0.662908875) = \frac{0.25 - 0.662908875}{1.648721} = \frac{-0.412908875}{1.648721} \approx -0.250441 $$
    *Slope at the predicted point (0.5, 0.662908875) is approximately -0.250441.*
5.  **Calculate average slope:**
    $$ \text{Average Slope} = \frac{f(x_1, y_1) + f(x_2, y_2^*)}{2} $$
    $$ \text{Average Slope} = \frac{-0.580652 + (-0.250441)}{2} = \frac{-0.831093}{2} = -0.4155465 $$
    *Average of the slope at (0.25, 0.808071875) and the slope at (0.5, 0.662908875).*
6.  **Correct $y_2$ (Corrector Step):**
    $$ y_2 = y_1 + h \cdot (\text{Average Slope}) $$
    $$ y_2 = 0.808071875 + 0.25 \cdot (-0.4155465) = 0.808071875 - 0.103886625 = 0.70418525 $$
    *Final estimate for y at x=0.5.*

**Final Answer:**
The approximation for $y(0.5)$ using Heun's method is $\boxed{0.70418525}$.

**Reflection:** This example involved an exponential term in the denominator of $f(x,y)$, adding another layer of calculation complexity and requiring the use of a calculator for $e^x$. It emphasizes the importance of keeping sufficient decimal places throughout the calculation to maintain accuracy, especially when dealing with functions that can quickly change values. The exact solution to this ODE is $y(x) = x^2 e^{-x} + 2xe^{-x} - 2e^{-x} + 3e^{-x}$. No, that's not right. The exact solution to $y' = \frac{x^2 - y}{e^x}$ is $y(x) = (x^2+2x+2)e^{-x} + Ce^{-x}$. With $y(0)=1$, $1 = (0+0+2)e^0 + Ce^0 \implies 1 = 2+C \implies C=-1$. So $y(x) = (x^2+2x+2)e^{-x} - e^{-x} = (x^2+2x+1)e^{-x} = (x+1)^2 e^{-x}$.
Let's check $y(0.5)$: $y(0.5) = (0.5+1)^2 e^{-0.5} = (1.5)^2 e^{-0.5} = 2.25 \cdot e^{-0.5} \approx 2.25 \cdot 0.60653 \approx 1.36469$.
My numerical solution of $0.70418525$ is significantly different from the exact solution $1.36469$. This suggests a potential miscalculation or a misunderstanding of the ODE's exact solution. Let me re-derive the exact solution.
The ODE is $y' = x^2 e^{-x} - y e^{-x}$. Rearranging, $y' + e^{-x}y = x^2 e^{-x}$. This is a first-order linear ODE of the form $y' + P(x)y = Q(x)$, where $P(x) = e^{-x}$ and $Q(x) = x^2 e^{-x}$.
The integrating factor is $I(x) = e^{\int P(x) dx} = e^{\int e^{-x} dx} = e^{-e^{-x}}$.
So, $(y \cdot e^{-e^{-x}})' = x^2 e^{-x} e^{-e^{-x}}$. Integrating this is non-trivial.
Okay, the exact solution I initially thought of was for $y' = x^2 - y$. The problem is $y' = (x^2-y)/e^x$. So the exact solution is indeed hard. This highlights why numerical methods are needed! My comparison with an "exact solution" was faulty. The numerical calculation itself seems consistent.

## 6. Common mistakes and traps

1.  **Using $y_{n+1}^*$ instead of $y_n$ in the Corrector Step:** The corrector formula is $y_{n+1} = y_n + h \cdot \text{AvgSlope}$. Students sometimes mistakenly write $y_{n+1} = y_{n+1}^* + h \cdot \text{AvgSlope}$, which is incorrect. The correction is applied starting from the *current known point* $y_n$, not from the predicted point $y_{n+1}^*$.
2.  **Incorrectly calculating the average slope:** Forgetting to divide by 2, or using $f(x_n, y_n)$ twice, or using $f(x_{n+1}, y_{n+1})$ (the *actual* next point, which we don't know yet) instead of $f(x_{n+1}, y_{n+1}^*)$ (the *predicted* next point).
3.  **Mixing up $x_n$ and $x_{n+1}$ in $f(x,y)$:** Be very careful with the arguments to $f$. The first slope uses $f(x_n, y_n)$. The second slope (for the predictor) uses $f(x_{n+1}, y_{n+1}^*)$.
4.  **Arithmetic Errors:** Heun's method involves several steps and often decimals. A single arithmetic mistake can propagate and lead to a significantly incorrect final answer. It's crucial to use a calculator carefully and maintain sufficient precision (e.g., 5-7 decimal places) throughout intermediate calculations.
5.  **Forgetting to update $x_n$ and $y_n$ for the next iteration:** After calculating $y_{n+1}$, this becomes the new $y_n$ for the next step, and $x_{n+1}$ becomes the new $x_n$. Failing to update these values correctly will lead to incorrect subsequent steps.
6.  **Using degrees instead of radians for trigonometric functions:** When $f(x,y)$ involves trigonometric functions like $\sin(x)$ or $\cos(x)$, ensure your calculator is in radian mode, as $x$ in differential equations is almost always treated as a radian measure unless explicitly stated otherwise.

## 7. Textbook-precise explanation

Heun's method, also known as the Modified Euler method or the Improved Euler method, is a second-order Runge-Kutta method for approximating the solution to an initial value problem (IVP) of the form:
$$ \frac{dy}{dx} = f(x, y), \quad y(x_0) = y_0 $$
Given a step size $h$, the method proceeds iteratively to approximate $y(x_{n+1})$ from $y(x_n)$ using a predictor-corrector scheme.

For each step from $x_n$ to $x_{n+1} = x_n + h$:

1.  **Predictor Step (Euler's method):** An initial estimate for $y(x_{n+1})$, denoted $y_{n+1}^*$, is computed using the slope at the current point $(x_n, y_n)$:
    $$ y_{n+1}^* = y_n + h \cdot f(x_n, y_n) $$
    This is an explicit forward Euler step.

2.  **Corrector Step (Trapezoidal Rule approximation):** The final approximation for $y(x_{n+1})$, denoted $y_{n+1}$, is then calculated by averaging the slope at the current point $(x_n, y_n)$ and the slope at the predicted point $(x_{n+1}, y_{n+1}^*)$:
    $$ y_{n+1} = y_n + h \cdot \frac{f(x_n, y_n) + f(x_{n+1}, y_{n+1}^*)}{2} $$
    This formula is derived from approximating the integral $\int_{x_n}^{x_{n+1}} f(x,y(x)) dx$ using the trapezoidal rule, where $f(x_{n+1}, y(x_{n+1}))$ is approximated by $f(x_{n+1}, y_{n+1}^*)$.

Heun's method is considered a second-order method because its local truncation error is of order $O(h^3)$, meaning that the error introduced in a single step is proportional to $h^3$. Consequently, the global truncation error (error over a fixed interval) is of order $O(h^2)$. This is an improvement over Euler's method, which has a local truncation error of $O(h^2)$ and a global truncation error of $O(h)$.

**Textbook Reference:**
*   Richard L. Burden, J. Douglas Faires, Annette M. Burden. *Numerical Analysis*, 10th Edition. Chapter 5, Section 5.3 (Euler's Method and Its Modifications).
*   Kendall E. Atkinson, Weimin Han. *Elementary Numerical Analysis*, 3rd Edition. Chapter 6, Section 6.2 (Runge-Kutta Methods).

## 8. ASCII diagrams

Let's visualize the difference between Euler's method and Heun's method for a single step.

```text
       y ^
         |
         |
y_n+1,corrected +-------------------
         | \                       /
         |  \                     /
         |   \                   /   (True solution path)
         |    \                 /
         |     \               /
         |      \             /
         |       \           /
         |        \         /
         |         \       /
y_n+1,predicted* +----------+ (slope at this point is f(x_n+1, y_n+1*))
         |          \     /
         |           \   /
         |            \ /
      y_n+1_euler +----+ (slope at this point is f(x_n, y_n))
         |         /
         |        /
       y_n +-----+ (x_n, y_n)
         |      /|
         |     / |
         +-----+---+---------------------> x
              x_n  x_n+1

Legend:
- (x_n, y_n): Starting point.
- y_n+1_euler: The result of basic Euler's method. This uses only the slope at (x_n, y_n).
  It's a straight line from (x_n, y_n) with slope f(x_n, y_n).
- y_n+1,predicted*: The predicted point in Heun's method (same as Euler's method's result).
  This is (x_n+1, y_n + h * f(x_n, y_n)).
- Slope at (x_n, y_n): f(x_n, y_n)
- Slope at (x_n+1, y_n+1,predicted*): f(x_n+1, y_n+1*).
- y_n+1,corrected: The final, corrected point in Heun's method.
  This point is found by starting from y_n and using the *average* of the two slopes:
  [f(x_n, y_n) + f(x_n+1, y_n+1*)] / 2.
  Visually, the line segment from (x_n, y_n) to (x_n+1, y_n+1,corrected) has a slope that is the average of the initial tangent and the tangent at the predicted point. This average slope usually provides a better approximation of the true curve's behavior over the interval.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Think of Heun's method as a **P**redictor-**C**orrector method, or "P.C. with an A.S." (Average Slope).
    *   **P**redict: Make a simple Euler guess (like a straight line).
    *   **C**alculate: Find the slope *at that predicted point*.
    *   **A**verage: Average the starting slope and the predicted slope.
    *   **S**tep: Use this average slope to take a *corrected* step from your original starting point.

    Visually, imagine drawing a tangent line at your current point (Euler's prediction). Then, go to the end of that tangent line and draw *another* tangent line there. Heun's method draws a new line from your *original starting point* that splits the difference between the first tangent's steepness and the second tangent's steepness. It's like finding a better "average direction" to travel.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **Predictor:** $y_{n+1}^* = y_n + h \cdot f(x_n, y_n)$
    *   **Corrector:** $y_{n+1} = y_n + h \cdot \frac{f(x_n, y_n) + f(x_{n+1}, y_{n+1}^*)}{2}$
    *   Heun's method is a **predictor-corrector** method that uses the **average of two slopes**.

3.  **Spaced-Repetition Schedule:**
    *   **Review 1:** At 1 day (tomorrow). Re-derive the formulas and work through one simple example.
    *   **Review 2:** At 3 days. Explain the core idea in plain English and identify common mistakes.
    *   **Review 3:** At 7 days. Work through a harder example, paying attention to precision.
    *   **Review 4:** At 16 days. Compare Heun's method with basic Euler's method and discuss its advantages.
    *   **Review 5:** At 35 days. Explain its connection to the trapezoidal rule and higher-order Runge-Kutta methods.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the Heun's method formula, remember that solving $dy/dx = f(x,y)$ is equivalent to integrating:
    $$ \int_{x_n}^{x_{n+1}} \frac{dy}{dx} dx = \int_{x_n}^{x_{n+1}} f(x,y) dx $$
    This gives:
    $$ y(x_{n+1}) - y(x_n) = \int_{x_n}^{x_{n+1}} f(x,y) dx $$
    So, $y_{n+1} = y_n + \int_{x_n}^{x_{n+1}} f(x,y) dx$.

    The challenge is to approximate the integral $\int_{x_n}^{x_{n+1}} f(x,y) dx$.
    *   **Basic Euler:** Approximates the integral as $h \cdot f(x_n, y_n)$ (rectangle rule using left endpoint).
    *   **Heun's Method (Trapezoidal Rule):** Approximates the integral as the area of a trapezoid. The trapezoidal rule for $\int_a^b g(x) dx$ is $\frac{b-a}{2} (g(a) + g(b))$.
        Applying this, we get:
        $$ \int_{x_n}^{x_{n+1}} f(x,y) dx \approx \frac{h}{2} (f(x_n, y_n) + f(x_{n+1}, y_{n+1})) $$
        The problem is that $y_{n+1}$ is unknown on the right side. This is where the **predictor** comes in: we use Euler's method to *predict* $y_{n+1}$ as $y_{n+1}^*$.
        $$ y_{n+1}^* = y_n + h \cdot f(x_n, y_n) $$
        Then, we substitute this predicted value into the trapezoidal rule approximation:
        $$ y_{n+1} = y_n + h \cdot \frac{f(x_n, y_n) + f(x_{n+1}, y_{n+1}^*)}{2} $$
        This re-derivation shows that Heun's method is essentially an explicit version of the trapezoidal rule for numerical integration of ODEs.

## 10. Connections — what this leads to

Heun's method is a foundational concept in numerical analysis and serves as a stepping stone to understanding more advanced techniques for solving differential equations.

1.  **Higher-Order Runge-Kutta Methods:** Heun's method is itself a second-order Runge-Kutta (RK2) method. It directly leads to the understanding of the family of Runge-Kutta methods, which are widely used for their accuracy and stability. The most famous is the fourth-order Runge-Kutta (RK4) method, which involves calculating four different slopes within each step and taking a weighted average. Heun's method helps build the intuition for why averaging multiple slope evaluations improves accuracy.

2.  **Error Analysis (Local and Global Truncation Error):** Understanding Heun's method's $O(h^2)$ global error (compared to Euler's $O(h)$) introduces the critical concept of order of accuracy. This leads to deeper studies in how errors accumulate over multiple steps and how they relate to the Taylor series expansion of the solution.

3.  **Adaptive Step Size Methods:** The improvement in accuracy with Heun's method often comes at the cost of more computation per step. This naturally leads to the idea of adaptive step size methods, where the step size $h$ is adjusted dynamically during the computation. For example, some methods (like the Runge-Kutta-Fehlberg method) estimate the error at each step and then either reduce $h$ if the error is too large or increase $h$ if the error is very small, to optimize efficiency while maintaining desired accuracy.

4.  **Implicit Methods and Stiff ODEs:** While Heun's method is an *explicit* method (meaning $y_{n+1}$ is directly calculated from previous values), its connection to the trapezoidal rule hints at *implicit* methods. The full trapezoidal method for ODEs, $y_{n+1} = y_n + \frac{h}{2}(f(x_n, y_n) + f(x_{n+1}, y_{n+1}))$,