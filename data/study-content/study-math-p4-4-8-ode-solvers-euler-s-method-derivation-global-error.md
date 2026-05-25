## 1. What it is — in plain English

Imagine you're trying to predict where a tiny boat will be on a lake. You don't have a map of its path, but you *do* have a rule that tells you, at any moment, how fast and in what direction the boat is currently moving based on its current position and the wind. This "rule" is a differential equation.

Euler's method is like this: you look at the boat *right now*, figure out its speed and direction. Then, you assume it will keep moving at *that exact speed and direction* for a very short period of time. After that short period, you mark its new estimated spot.

Now, from that *new estimated spot*, you again figure out its speed and direction (using the same rule, but with the new position). You assume it keeps *that* speed and direction for another short period, and mark its next estimated spot. You repeat this process over and over, taking many tiny steps.

By stringing together these many short, straight-line movements, Euler's method gives you an approximate path for the boat. It's not perfectly accurate because the boat's speed and direction are constantly changing, but if your "short periods of time" (called step sizes) are small enough, the approximation can be quite good. It's a way to "walk forward" in time when you only know the instantaneous rate of change.

## 2. Why it matters — real-world applications

Euler's method, despite its simplicity, is the foundational concept for many more sophisticated numerical techniques used to solve differential equations. Understanding it is crucial for appreciating how computers model dynamic systems.

1.  **Aerospace Engineering (Rocket Trajectories):** When launching a rocket, engineers need to predict its trajectory based on forces like thrust, gravity, and air resistance. These forces often depend on the rocket's current position, velocity, and mass. While advanced methods like Runge-Kutta are used for precision, Euler's method provides the basic framework for discretizing time and iteratively calculating the next state. Companies like SpaceX or NASA use such solvers to simulate launches, orbital maneuvers, and re-entry, ensuring missions are safe and successful.

2.  **Financial Modeling (Option Pricing, Population Dynamics):** In quantitative finance, models like the Black-Scholes equation (which can be transformed into a partial differential equation) are used to price financial derivatives. While Black-Scholes has an analytical solution, more complex models for asset prices or interest rates often require numerical methods. Similarly, population dynamics models (e.g., predator-prey systems, disease spread like COVID-19) are often expressed as systems of ODEs, and numerical solvers help predict future trends, informing public health policy or investment strategies.

3.  **Physics Simulations (Particle Dynamics, Climate Models):** Simulating the motion of particles under various forces (e.g., gravitational N-body problems, molecular dynamics) relies heavily on ODE solvers. In video games, for instance, physics engines use numerical integration to make objects fall, collide, and bounce realistically. On a larger scale, climate scientists use complex models involving many differential equations to predict weather patterns and long-term climate change, where numerical methods are indispensable for stepping forward in time.

4.  **Electrical Engineering (Circuit Analysis):** The behavior of circuits containing capacitors and inductors is described by differential equations. For complex circuits, especially non-linear ones, analytical solutions are impossible. Engineers use numerical solvers to simulate circuit responses to various inputs, helping them design and optimize electronic devices, from microchips to power grids.

## 3. Prerequisites — what you must know first

Before diving deep into Euler's method, ensure you have a solid grasp of these fundamental concepts:

*   **Differential Equations (ODEs):** Understanding what an ordinary differential equation (ODE) is, particularly an initial value problem (IVP) of the form $y' = f(t, y)$ with $y(t_0) = y_0$. This is the problem Euler's method aims to solve.
*   **Derivatives:** The concept of a derivative as the instantaneous rate of change or the slope of the tangent line to a curve at a given point. This is the core idea Euler's method leverages.
*   **Taylor Series Expansion:** Specifically, the ability to expand a function $y(t+h)$ around $t$ and understanding the meaning of the remainder term. This is absolutely critical for deriving the local and global error of Euler's method.
*   **Limits:** The foundation of calculus, essential for understanding derivatives and the concept of error approaching zero as step size decreases.
*   **Numerical Approximation:** The general idea of using discrete steps to approximate continuous processes.
*   **Summation Notation ($\Sigma$):** Useful for expressing the accumulation of errors over many steps.
*   **Order Notation ($O(h^p)$):** Understanding what it means for an error to be "of order $h^p$", indicating how the error scales with the step size $h$.

## 4. The core idea — step by step

Euler's method is built on a very simple, intuitive idea: if you know where you are and how fast you're changing, you can estimate where you'll be a little bit later by assuming that rate of change stays constant for that short duration.

### Step 1: The Problem Statement

*   **Plain English:** We have a starting point and a rule that tells us how something is changing at any given moment. We want to find out what its value will be at some future time.
*   **Small Concrete Example:** Imagine you have a bank account with $1000. At any time, the interest rate is equal to the current amount in the account (a very strange bank!). So, if you have $1000, your money grows at $1000/year. If you have $1010, it grows at $1010/year. You start with $1000 at time $t=0$. What will your balance be at $t=1$ year?
*   **Formal/Mathematical Version:** We are trying to solve an Initial Value Problem (IVP) of the form:
    $$ \frac{dy}{dt} = f(t, y) $$
    with an initial condition:
    $$ y(t_0) = y_0 $$
    Here, $y(t)$ is the unknown function we want to find, $t$ is the independent variable (often time), and $f(t, y)$ is the given function that defines the rate of change of $y$ with respect to $t$.
*   **What Could Go Wrong:** Not having an initial condition ($y_0$) means there are infinitely many solutions. Not having a well-defined $f(t,y)$ means you don't know the rule of change.

### Step 2: The Tangent Line Approximation (Linear Approximation)

*   **Plain English:** If you're standing on a curve and know its slope at your current position, you can draw a straight line (the tangent line) that touches the curve at that point. For a *very short distance* along that tangent line, you'll stay pretty close to the actual curve.
*   **Small Concrete Example:** If you are at position $y=5$ and the slope of the curve at that point is $2$, and you want to estimate the value of $y$ after moving $0.1$ units in $t$, you'd say $y_{new} \approx 5 + (2 \times 0.1) = 5.2$.
*   **Formal/Mathematical Version:** From the definition of the derivative, for a small step size $h = \Delta t$:
    $$ \frac{dy}{dt} \approx \frac{y(t+h) - y(t)}{h} $$
    Rearranging this, we get the linear approximation:
    $$ y(t+h) \approx y(t) + h \frac{dy}{dt} $$
    More formally, using the first two terms of a Taylor series expansion for $y(t+h)$ around $t$:
    $$ y(t+h) = y(t) + h y'(t) + \frac{h^2}{2!} y''(c) $$
    where $c$ is some value between $t$ and $t+h$. Euler's method *truncates* this series after the first derivative term, essentially ignoring the $O(h^2)$ and higher order terms.
*   **What Could Go Wrong:** The approximation gets worse as $h$ gets larger, because the curve deviates more from the straight tangent line.

### Step 3: Relating the Approximation to the ODE

*   **Plain English:** The "rule of change" given by our differential equation ($dy/dt = f(t,y)$) *is* the slope of the tangent line at any point $(t,y)$. So, we can just plug that rule into our linear approximation.
*   **Small Concrete Example:** In our bank account example, $dy/dt = y$. So, if we are at $y=1000$ and $t=0$, the slope $dy/dt$ is $1000$.
*   **Formal/Mathematical Version:** We substitute $y'(t) = f(t, y(t))$ into our linear approximation:
    $$ y(t+h) \approx y(t) + h f(t, y(t)) $$
    This is the core of Euler's method. It says that the next value of $y$ can be approximated by the current value plus the step size multiplied by the current rate of change.
*   **What Could Go Wrong:** Confusing the *true* solution $y(t)$ with our *approximation* $y_i$. The $f(t, y(t))$ term uses the *exact* value of $y$ at time $t$, which we usually don't know. So, we'll have to use our *approximated* value.

### Step 4: The Iterative Formula (Euler's Method)

*   **Plain English:** We'll start at our initial known point. Then, we'll use the formula from Step 3 to estimate the next point. From that *estimated* point, we'll use the same formula again to estimate the *next* point, and so on, creating a sequence of approximations.
*   **Small Concrete Example:** Starting with $y(0)=1000$ and $dy/dt = y$. Let's pick a step size $h=0.1$ years.
    *   First step: $y_1 \approx y_0 + h \times (dy/dt \text{ at } (0, y_0)) = 1000 + 0.1 \times 1000 = 1100$. This is our approximation for $y(0.1)$.
    *   Second step: Now we're at $(t_1, y_1) = (0.1, 1100)$. The rate of change at this *approximated* point is $1100$. So, $y_2 \approx y_1 + h \times (dy/dt \text{ at } (0.1, y_1)) = 1100 + 0.1 \times 1100 = 1210$. This is our approximation for $y(0.2)$.
*   **Formal/Mathematical Version:** Let $t_i = t_0 + i \cdot h$ be the discrete time points, and $y_i$ be our numerical approximation of the true solution $y(t_i)$.
    The Euler's method formula is:
    $$ y_{i+1} = y_i + h f(t_i, y_i) $$
    where $i = 0, 1, 2, \dots, N-1$. We start with $y_0$ (the given initial condition).
*   **What Could Go Wrong:** Forgetting to update $t_i$ for the $f(t_i, y_i)$ calculation, or using $y_{i+1}$ on the right-hand side (which would make it an implicit method, not Euler's).

### Step 5: Local Truncation Error (LTE)

*   **Plain English:** This is the error we make in *just one single step* of Euler's method. It's the difference between the true solution at the next point and our Euler's approximation starting from the *exact* previous point.
*   **Small Concrete Example:** If the true curve is $y=x^2$, and we are at $x=1, y=1$. The true slope is $y'=2x=2$. If we use $h=0.1$, Euler's method would predict $y(1.1) \approx 1 + 0.1 \times 2 = 1.2$. But the true value is $y(1.1) = (1.1)^2 = 1.21$. The local error is $1.21 - 1.2 = 0.01$. Notice this error is related to $h^2$.
*   **Formal/Mathematical Version:** We use the Taylor series expansion from Step 2:
    $$ y(t_i+h) = y(t_i) + h y'(t_i) + \frac{h^2}{2!} y''(t_i) + \frac{h^3}{3!} y'''(c_i) $$
    The Euler's method approximation, if we started from the *exact* $y(t_i)$, would be:
    $$ y_{i+1}^{\text{Euler}} = y(t_i) + h f(t_i, y(t_i)) = y(t_i) + h y'(t_i) $$
    The Local Truncation Error (LTE) at step $i$ is the difference between the true value $y(t_i+h)$ and the value predicted by Euler's method *assuming no prior errors*:
    $$ \text{LTE}_i = y(t_i+h) - y_{i+1}^{\text{Euler}} = \left( y(t_i) + h y'(t_i) + \frac{h^2}{2!} y''(t_i) + O(h^3) \right) - \left( y(t_i) + h y'(t_i) \right) $$
    $$ \text{LTE}_i = \frac{h^2}{2!} y''(t_i) + O(h^3) $$
    This means the local truncation error is **$O(h^2)$**. It's proportional to the square of the step size. If you halve $h$, the error in one step becomes a quarter of what it was.
*   **What Could Go Wrong:** Forgetting that LTE assumes you start from the *exact* solution at $t_i$. It doesn't account for errors accumulated from previous steps.

### Step 6: Global Truncation Error (GTE)

*   **Plain English:** This is the *total* error at the end of the entire simulation, after many steps. It's the difference between the true solution at the final time and the final value predicted by Euler's method, taking into account all the errors that accumulated over all the steps.
*   **Small Concrete Example:** If you take $N$ steps to reach a final time $T$, then $N = T/h$. Each step introduces an error of $O(h^2)$. If these errors simply added up, the total error would be $N \times O(h^2) = (T/h) \times O(h^2) = T \times O(h)$. So, the total error is roughly proportional to $h$.
*   **Formal/Mathematical Version:** The Global Truncation Error (GTE) at a fixed time $T$ (so $N = (T-t_0)/h$ steps) is the difference between the true solution $y(T)$ and the numerical approximation $y_N$:
    $$ \text{GTE} = y(T) - y_N $$
    While the derivation is more involved (requiring concepts like Lipschitz continuity and bounding the accumulation of local errors), the crucial result is that the global truncation error for Euler's method is **$O(h)$**.
    This means that if you halve the step size $h$, the global error will approximately halve. This is a first-order method.
*   **What Could Go Wrong:** Incorrectly assuming global error is $O(h^2)$ because local error is $O(h^2)$. The accumulation of errors over $N$ steps (where $N$ increases as $h$ decreases) changes the order.

## 5. Worked examples — multiple, with every step shown

We will solve initial value problems using Euler's method.
The general formula is $y_{i+1} = y_i + h f(t_i, y_i)$.
We need to keep track of $t_i$, $y_i$, and $f(t_i, y_i)$ at each step.

---

### Example 1: Easy - Exponential Growth

**Problem:** Use Euler's method to approximate $y(0.2)$ for the IVP:
$$ \frac{dy}{dt} = y, \quad y(0) = 1 $$
Use a step size $h = 0.1$.
**Exact solution:** $y(t) = e^t$.

**Identify what's given and what we want:**
*   ODE: $dy/dt = y$, so $f(t, y) = y$.
*   Initial condition: $y(t_0) = y(0) = 1$, so $t_0=0$, $y_0=1$.
*   Step size: $h = 0.1$.
*   Target time: $t_{final} = 0.2$.
*   Number of steps: $(0.2 - 0) / 0.1 = 2$ steps.

**Step-by-step solution:**

**Step 0: Initialization**
We start with the initial condition.
$t_0 = 0$
$y_0 = 1$

**Step 1: Calculate $y_1$ (approximation for $y(0.1)$)**
1.  **Calculate $f(t_0, y_0)$:**
    $f(t_0, y_0) = f(0, 1) = y_0 = 1$
    *This is the slope of the true solution at the starting point $(0,1)$.*
2.  **Apply Euler's formula:**
    $y_1 = y_0 + h f(t_0, y_0)$
    $y_1 = 1 + (0.1)(1)$
    $y_1 = 1 + 0.1$
    $y_1 = 1.1$
    *We use the initial value and the slope at $t_0$ to estimate the value at $t_1 = t_0 + h = 0 + 0.1 = 0.1$.*
3.  **Update $t_i$:**
    $t_1 = t_0 + h = 0 + 0.1 = 0.1$
    *We move to the next time point.*

**Step 2: Calculate $y_2$ (approximation for $y(0.2)$)**
1.  **Calculate $f(t_1, y_1)$:**
    $f(t_1, y_1) = f(0.1, 1.1) = y_1 = 1.1$
    *This is the slope based on our *approximated* value at $t_1=0.1$.*
2.  **Apply Euler's formula:**
    $y_2 = y_1 + h f(t_1, y_1)$
    $y_2 = 1.1 + (0.1)(1.1)$
    $y_2 = 1.1 + 0.11$
    $y_2 = 1.21$
    *We use our previous approximation $y_1$ and the slope at $(t_1, y_1)$ to estimate the value at $t_2 = t_1 + h = 0.1 + 0.1 = 0.2$.*
3.  **Update $t_i$:**
    $t_2 = t_1 + h = 0.1 + 0.1 = 0.2$
    *We have reached our target time.*

**Final Answer:**
The approximation for $y(0.2)$ using Euler's method with $h=0.1$ is $\boxed{1.21}$.

**Reflection:**
The exact solution at $t=0.2$ is $y(0.2) = e^{0.2} \approx 1.2214$. Our approximation $1.21$ is quite close. This example highlights how Euler's method tends to underestimate for functions that are concave up (like $e^t$) because it always follows the tangent line, which lies below the curve.

---

### Example 2: Medium - Linear ODE with $t$ dependence

**Problem:** Use Euler's method to approximate $y(0.4)$ for the IVP:
$$ \frac{dy}{dt} = 2t - y, \quad y(0) = 1 $$
Use a step size $h = 0.2$.
**Exact solution:** $y(t) = 2t - 2 + 3e^{-t}$.

**Identify what's given and what we want:**
*   ODE: $dy/dt = 2t - y$, so $f(t, y) = 2t - y$.
*   Initial condition: $y(t_0) = y(0) = 1$, so $t_0=0$, $y_0=1$.
*   Step size: $h = 0.2$.
*   Target time: $t_{final} = 0.4$.
*   Number of steps: $(0.4 - 0) / 0.2 = 2$ steps.

**Step-by-step solution:**

**Step 0: Initialization**
$t_0 = 0$
$y_0 = 1$

**Step 1: Calculate $y_1$ (approximation for $y(0.2)$)**
1.  **Calculate $f(t_0, y_0)$:**
    $f(t_0, y_0) = f(0, 1) = 2(0) - 1 = -1$
    *This is the slope of the true solution at the starting point $(0,1)$.*
2.  **Apply Euler's formula:**
    $y_1 = y_0 + h f(t_0, y_0)$
    $y_1 = 1 + (0.2)(-1)$
    $y_1 = 1 - 0.2$
    $y_1 = 0.8$
    *We use the initial value and the slope at $t_0$ to estimate the value at $t_1 = t_0 + h = 0 + 0.2 = 0.2$.*
3.  **Update $t_i$:**
    $t_1 = t_0 + h = 0 + 0.2 = 0.2$
    *We move to the next time point.*

**Step 2: Calculate $y_2$ (approximation for $y(0.4)$)**
1.  **Calculate $f(t_1, y_1)$:**
    $f(t_1, y_1) = f(0.2, 0.8) = 2(0.2) - 0.8 = 0.4 - 0.8 = -0.4$
    *This is the slope based on our *approximated* value at $t_1=0.2$. Note that $f$ now depends on both $t$ and $y$.*
2.  **Apply Euler's formula:**
    $y_2 = y_1 + h f(t_1, y_1)$
    $y_2 = 0.8 + (0.2)(-0.4)$
    $y_2 = 0.8 - 0.08$
    $y_2 = 0.72$
    *We use our previous approximation $y_1$ and the slope at $(t_1, y_1)$ to estimate the value at $t_2 = t_1 + h = 0.2 + 0.2 = 0.4$.*
3.  **Update $t_i$:**
    $t_2 = t_1 + h = 0.2 + 0.2 = 0.4$
    *We have reached our target time.*

**Final Answer:**
The approximation for $y(0.4)$ using Euler's method with $h=0.2$ is $\boxed{0.72}$.

**Reflection:**
The exact solution at $t=0.4$ is $y(0.4) = 2(0.4) - 2 + 3e^{-0.4} = 0.8 - 2 + 3(0.67032) = -1.2 + 2.01096 \approx 0.81096$. Our approximation $0.72$ has a noticeable error. This example emphasizes the importance of correctly evaluating $f(t_i, y_i)$ using *both* the current $t_i$ and the *approximated* $y_i$.

---

### Example 3: Harder - Non-linear ODE

**Problem:** Use Euler's method to approximate $y(0.1)$ for the IVP:
$$ \frac{dy}{dt} = y^2, \quad y(0) = 1 $$
Use a step size $h = 0.05$.
**Exact solution:** $y(t) = \frac{1}{1-t}$.

**Identify what's given and what we want:**
*   ODE: $dy/dt = y^2$, so $f(t, y) = y^2$.
*   Initial condition: $y(t_0) = y(0) = 1$, so $t_0=0$, $y_0=1$.
*   Step size: $h = 0.05$.
*   Target time: $t_{final} = 0.1$.
*   Number of steps: $(0.1 - 0) / 0.05 = 2$ steps.

**Step-by-step solution:**

**Step 0: Initialization**
$t_0 = 0$
$y_0 = 1$

**Step 1: Calculate $y_1$ (approximation for $y(0.05)$)**
1.  **Calculate $f(t_0, y_0)$:**
    $f(t_0, y_0) = f(0, 1) = y_0^2 = 1^2 = 1$
    *This is the slope of the true solution at the starting point $(0,1)$.*
2.  **Apply Euler's formula:**
    $y_1 = y_0 + h f(t_0, y_0)$
    $y_1 = 1 + (0.05)(1)$
    $y_1 = 1 + 0.05$
    $y_1 = 1.05$
    *We use the initial value and the slope at $t_0$ to estimate the value at $t_1 = t_0 + h = 0 + 0.05 = 0.05$.*
3.  **Update $t_i$:**
    $t_1 = t_0 + h = 0 + 0.05 = 0.05$
    *We move to the next time point.*

**Step 2: Calculate $y_2$ (approximation for $y(0.1)$)**
1.  **Calculate $f(t_1, y_1)$:**
    $f(t_1, y_1) = f(0.05, 1.05) = y_1^2 = (1.05)^2 = 1.1025$
    *This is the slope based on our *approximated* value at $t_1=0.05$. Be careful with squaring the approximated $y_1$.*
2.  **Apply Euler's formula:**
    $y_2 = y_1 + h f(t_1, y_1)$
    $y_2 = 1.05 + (0.05)(1.1025)$
    $y_2 = 1.05 + 0.055125$
    $y_2 = 1.105125$
    *We use our previous approximation $y_1$ and the slope at $(t_1, y_1)$ to estimate the value at $t_2 = t_1 + h = 0.05 + 0.05 = 0.1$.*
3.  **Update $t_i$:**
    $t_2 = t_1 + h = 0.05 + 0.05 = 0.1$
    *We have reached our target time.*

**Final Answer:**
The approximation for $y(0.1)$ using Euler's method with $h=0.05$ is $\boxed{1.105125}$.

**Reflection:**
The exact solution at $t=0.1$ is $y(0.1) = \frac{1}{1-0.1} = \frac{1}{0.9} \approx 1.111111$. Our approximation $1.105125$ is close, but again, it underestimates. The non-linear nature of $f(t,y) = y^2$ means the slope changes quite rapidly as $y$ increases, making precise approximation more challenging. The function $1/(1-t)$ is also concave up, leading to underestimation.

---

### Example 4: Hardest - ODE with both $t$ and non-linear $y$ dependence

**Problem:** Use Euler's method to approximate $y(0.2)$ for the IVP:
$$ \frac{dy}{dt} = t \cos(y), \quad y(0) = 0 $$
Use a step size $h = 0.1$.
**Exact solution:** This ODE does not have a simple closed-form analytical solution. We will compare our result to a more accurate numerical solution obtained with a much smaller step size or a more advanced method. For reference, a high-precision numerical solver gives $y(0.2) \approx 0.019933$.

**Identify what's given and what we want:**
*   ODE: $dy/dt = t \cos(y)$, so $f(t, y) = t \cos(y)$.
*   Initial condition: $y(t_0) = y(0) = 0$, so $t_0=0$, $y_0=0$.
*   Step size: $h = 0.1$.
*   Target time: $t_{final} = 0.2$.
*   Number of steps: $(0.2 - 0) / 0.1 = 2$ steps.

**Step-by-step solution:**

**Step 0: Initialization**
$t_0 = 0$
$y_0 = 0$

**Step 1: Calculate $y_1$ (approximation for $y(0.1)$)**
1.  **Calculate $f(t_0, y_0)$:**
    $f(t_0, y_0) = f(0, 0) = 0 \times \cos(0) = 0 \times 1 = 0$
    *The slope at the initial point is zero. This means the function is momentarily flat.*
2.  **Apply Euler's formula:**
    $y_1 = y_0 + h f(t_0, y_0)$
    $y_1 = 0 + (0.1)(0)$
    $y_1 = 0$
    *Since the initial slope is zero, our first step doesn't change $y$.*
3.  **Update $t_i$:**
    $t_1 = t_0 + h = 0 + 0.1 = 0.1$
    *We move to the next time point.*

**Step 2: Calculate $y_2$ (approximation for $y(0.2)$)**
1.  **Calculate $f(t_1, y_1)$:**
    $f(t_1, y_1) = f(0.1, 0) = 0.1 \times \cos(0) = 0.1 \times 1 = 0.1$
    *At $t=0.1$, the slope is no longer zero, as $t$ is now non-zero.*
2.  **Apply Euler's formula:**
    $y_2 = y_1 + h f(t_1, y_1)$
    $y_2 = 0 + (0.1)(0.1)$
    $y_2 = 0 + 0.01$
    $y_2 = 0.01$
    *We use our previous approximation $y_1$ and the slope at $(t_1, y_1)$ to estimate the value at $t_2 = t_1 + h = 0.1 + 0.1 = 0.2$.*
3.  **Update $t_i$:**
    $t_2 = t_1 + h = 0.1 + 0.1 = 0.2$
    *We have reached our target time.*

**Final Answer:**
The approximation for $y(0.2)$ using Euler's method with $h=0.1$ is $\boxed{0.01}$.

**Reflection:**
Comparing to the reference value $y(0.2) \approx 0.019933$, our approximation $0.01$ is quite far off. This example highlights several challenges:
*   The function $f(t,y)$ depends on both $t$ and $y$ in a non-linear way (cosine function).
*   The initial slope was zero, leading to $y_1 = y_0$, which might intuitively seem like the function isn't changing, but it quickly starts to change as $t$ increases.
*   The true solution is still very small at $t=0.2$, meaning the actual curve is very shallow. Euler's method, with a relatively large step size (0.1 for such a small change in $y$), struggles to capture this subtle curvature accurately. This problem would require a much smaller step size or a higher-order method for good accuracy.

---

## 6. Common mistakes and traps

1.  **Confusing $f(t_i, y_i)$ with $y(t_i)$:** Students often forget that $f(t_i, y_i)$ *is* the derivative $dy/dt$ at the point $(t_i, y_i)$, not the function $y(t)$ itself. The ODE *defines* the slope.
2.  **Using $y_{i+1}$ on the right-hand side:** The formula is $y_{i+1} = y_i + h f(t_i, y_i)$. A common mistake is to accidentally use $y_{i+1}$ when calculating $f$, e.g., $y_{i+1} = y_i + h f(t_i, y_{i+1})$. This would make it an *implicit* Euler method, which is a different (and often more stable) method requiring solving an equation for $y_{i+1}$ at each step. Euler's method is *explicit*.
3.  **Forgetting to update $t_i$:** The $f(t_i, y_i)$ term often depends on $t_i$. If you only update $y_i$ but keep $t_i$ fixed, your approximations will be incorrect. Remember that $t_{i+1} = t_i + h$.
4.  **Misunderstanding Local vs. Global Error:** Students often assume that because the local truncation error is $O(h^2)$, the global truncation error is also $O(h^2)$. As discussed, the accumulation of errors over $N$ steps (where $N \propto 1/h$) means the global error is $O(h)$.
5.  **Algebraic Errors in Iteration:** Euler's method involves repetitive calculations. Even small arithmetic mistakes in early steps will propagate and amplify, leading to large errors in later steps. It's crucial to be meticulous with calculations.
6.  **Using a constant $f(t,y)$:** Sometimes students simplify $f(t,y)$ to just $f(y)$ or $f(t)$ even when it depends on both variables, or they might reuse $f(t_0, y_0)$ for all steps. Always re-evaluate $f(t_i, y_i)$ using the *current* $t_i$ and the *most recent approximation* $y_i$.

## 7. Textbook-precise explanation

Consider the initial value problem (IVP):
$$ \frac{dy}{dt} = f(t, y), \quad t \in [a, b], \quad y(a) = y_0 $$
where $f(t, y)$ is a given continuous function, and $y_0$ is the initial condition. We seek to approximate the solution $y(t)$ at discrete points $t_i$ within the interval $[a, b]$.

Let $h > 0$ be a chosen step size. We define a sequence of equally spaced time points $t_i$ such that $t_0 = a$ and $t_{i+1} = t_i + h$ for $i = 0, 1, \dots, N-1$, where $N = (b-a)/h$. Let $y_i$ denote the numerical approximation of the true solution $y(t_i)$.

**Derivation of Euler's Method:**
Assume the true solution $y(t)$ is sufficiently smooth (i.e., twice continuously differentiable). We can expand $y(t_{i+1})$ around $t_i$ using a Taylor series with a remainder term:
$$ y(t_{i+1}) = y(t_i + h) = y(t_i) + h y'(t_i) + \frac{h^2}{2!} y''(c_i) $$
for some $c_i \in (t_i, t_{i+1})$.
From the given differential equation, we know that $y'(t_i) = f(t_i, y(t_i))$. Substituting this into the Taylor expansion:
$$ y(t_{i+1}) = y(t_i) + h f(t_i, y(t_i)) + \frac{h^2}{2!} y''(c_i) $$
Euler's method arises by truncating this Taylor series after the first derivative term, effectively ignoring the $O(h^2)$ and higher-order terms. We replace the true value $y(t_i)$ with its numerical approximation $y_i$. This leads to the iterative formula:
$$ y_{i+1} = y_i + h f(t_i, y_i) $$
This is an explicit, one-step method. Given $y_i$ and $t_i$, we can directly compute $y_{i+1}$.

**Local Truncation Error (LTE):**
The local truncation error, denoted $\tau_{i+1}$, is the error introduced in a single step, assuming that the method starts from the *exact* solution at $t_i$.
$$ \tau_{i+1} = y(t_{i+1}) - (y(t_i) + h f(t_i, y(t_i))) $$
Substituting the Taylor expansion:
$$ \tau_{i+1} = \left( y(t_i) + h y'(t_i) + \frac{h^2}{2!} y''(c_i) \right) - \left( y(t_i) + h y'(t_i) \right) $$
$$ \tau_{i+1} = \frac{h^2}{2!} y''(c_i) $$
Assuming $y''(t)$ is bounded on $[a, b]$, there exists a constant $M$ such that $|y''(c_i)| \le M$. Therefore, the local truncation error is $O(h^2)$:
$$ |\tau_{i+1}| \le \frac{M}{2} h^2 $$
This indicates that Euler's method is a first-order method in terms of its local error *per step*.

**Global Truncation Error (GTE):**
The global truncation error, denoted $E_N$, is the accumulated error after $N$ steps, i.e., $E_N = y(t_N) - y_N$.
To analyze the global error, we consider the difference between the true solution and the numerical approximation:
$$ y(t_{i+1}) - y_{i+1} = [y(t_i) + h f(t_i, y(t_i)) + \tau_{i+1}] - [y_i + h f(t_i, y_i)] $$
$$ y(t_{i+1}) - y_{i+1} = (y(t_i) - y_i) + h [f(t_i, y(t_i)) - f(t_i, y_i)] + \tau_{i+1} $$
Let $E_i = y(t_i) - y_i$ be the global error at step $i$. Then:
$$ E_{i+1} = E_i + h [f(t_i, y(t_i)) - f(t_i, y_i)] + \tau_{i+1} $$
Assuming $f(t, y)$ satisfies a Lipschitz condition with respect to $y$ (i.e., $|f(t, y_1) - f(t, y_2)| \le L|y_1 - y_2|$ for some constant $L$):
$$ |E_{i+1}| \le |E_i| + h L |y(t_i) - y_i| + |\tau_{i+1}| $$
$$ |E_{i+1}| \le (1 + hL) |E_i| + \frac{M}{2} h^2 $$
With $E_0 = y(t_0) - y_0 = 0$ (since $y_0$ is the exact initial condition), this recurrence relation can be solved. It can be shown (e.g., using a discrete Gronwall inequality) that for a fixed $T = t_N - t_0$, as $h \to 0$:
$$ |E_N| \le \frac{M}{2L} (e^{L(T-t_0)} - 1) h $$
Thus, the global truncation error for Euler's method is **$O(h)$**. This means Euler's method is a first-order method.

**References:**
*   Burden, R. L., & Faires, J. D. (2011). *Numerical Analysis* (9th ed.). Brooks Cole. Chapter 5: Initial-Value Problems for Ordinary Differential Equations.
*   Atkinson, K. E. (1989). *An Introduction to Numerical Analysis* (2nd ed.). John Wiley & Sons. Chapter 6: Numerical Solution of Ordinary Differential Equations.

## 8. ASCII diagrams

Let's visualize Euler's method. The true solution $y(t)$ is a smooth curve. Euler's method approximates this curve with a series of straight line segments.

```text
       ^ y
       |
       |  . y(t_i+h)  (True value at next step)
       | /
       |/
       +---------------------> t
   y(t_i) .     /
          |    /
          |   /
          |  /  (Tangent line, slope = f(t_i, y(t_i)))
          | /
          |/
        y_i +---------------------> t
          |   . y_i+1 (Euler's approximation at next step)
          |   |
          |   |  <----- Local Truncation Error (LTE)
          |   |
          |   |
          |   |
          |   |
          +---+-----------+---
        t_i  t_i+h

      ^ y
      |
      |          . y(t_N) (True solution at final time T)
      |         /
      |        /
      |       /
      |      /
      |     /
      |    /
      |   /
      |  /
      | /
      |/
      +-------------------------------------------> t
    y_0 .
        | \
        |  \
        |   . y_1 (Euler approx)
        |   | \
        |   |  \
        |   |   . y_2 (Euler approx)
        |   |   | \
        |   |   |  \
        |   |   |   . y_3
        |   |   |   | \
        |   |   |   |  \
        |   |   |   |   . y_N (Euler approx at final time T)
        +---+---+---+---+--------------------------
      t_0 t_1 t_2 t_3 t_N=T

      <----------------- Global Truncation Error (GTE) ------>

      Description:
      The top diagram illustrates a single step.
      - The smooth curve is the true solution y(t).
      - At t_i, we know y_i (our current approximation).
      - We calculate the slope f(t_i, y_i) and draw a tangent line from (t_i, y_i).
      - We follow this tangent line for a step size h to get y_i+1.
      - The vertical distance between the true solution y(t_i+h) and y_i+1 is the Local Truncation Error.

      The bottom diagram illustrates the accumulation over multiple steps.
      - The true solution is a continuous curve starting from y_0.
      - Euler's method generates a "staircase" approximation (y_0, y_1, y_2, ..., y_N).
      - Each step follows a tangent from the *previous approximation*.
      - The vertical distance between y(t_N) and y_N at the final time T is the Global Truncation Error.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    *   **"EULER: Estimate Using Linear Extrapolation Repeatedly."** This captures the essence: linear (tangent line) approximation, repeated steps.
    *   **Visual:** Imagine a staircase trying to climb a smooth hill. Each step of the staircase is straight (linear), but the hill curves, so the staircase always misses the true hill slightly. The shorter your steps (smaller $h$), the more steps you take, and the closer your staircase gets to the hill.

2.  **Formulas/Facts to Overlearn:**
    *   **Euler's Method Formula:** $y_{i+1} = y_i + h f(t_i, y_i)$
        *   This is the heart of it. Understand each term: $y_{i+1}$ (next approximation), $y_i$ (current approximation), $h$ (step size), $f(t_i, y_i)$ (slope at current point).
    *   **Local Truncation Error (LTE):** $O(h^2)$
        *   Error in *one* step.
    *   **Global Truncation Error (GTE):** $O(h)$
        *   Total error after *many* steps. This is the crucial distinction from LTE.

3.  **Spaced-Repetition Schedule:**
    *   **Review 1:** Immediately after this lesson (today). Can you write down the formula and explain LTE vs GTE?
    *   **Review 2:** In 3 days. Work through one simple example from scratch.
    *   **Review 3:** In 7 days. Re-derive the LTE using Taylor series.
    *   **Review 4:** In 16 days. Explain why GTE is $O(h)$ given LTE is $O(h^2)$.
    *   **Review 5:** In 35 days. Explain Euler's method to someone as if they knew nothing about ODEs.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the Euler's formula, you can always rebuild it:
    1.  **Start with the definition of the derivative:** $y'(t) = \lim_{h \to 0} \frac{y(t+h) - y(t)}{h}$.
    2.  **Approximate for small $h$:** For a small (finite) $h$, we can drop the limit: $y'(t) \approx \frac{y(t+h) - y(t)}{h}$.
    3.  **Rearrange to solve for $y(t+h)$:** $y(t+h) \approx y(t) + h y'(t)$.
    4.  **Substitute the ODE:** The problem states $y'(t) = f(t, y(t))$. So, $y(t+h) \approx y(t) + h f(t, y(t))$.
    5.  **Discretize for iteration:** Replace continuous $t$ with discrete $t_i$, and true $y(t)$ with approximation $y_i$: $y_{i+1} = y_i + h f(t_i, y_i)$.
    This pathway directly leads to the formula and reminds you of its foundation in the derivative's definition.

## 10. Connections — what this leads to

Euler's method is the simplest numerical ODE solver, but its study is fundamental because it lays the groundwork for understanding all more advanced methods.

1.  **Improved ODE Solvers (Higher-Order Methods):**
    *   **Heun's Method (Improved Euler):** Addresses Euler's tendency to follow the initial slope too long by averaging the slope at the beginning and end of the interval. It's an $O(h^2)$ global error method.
    *   **Midpoint Method:** Estimates the slope at the midpoint of the interval, which often provides a better average slope. Also $O(h^2)$ global error.
    *   **Runge-Kutta Methods (RK2, RK4):** These are families of methods that use weighted averages of several slope evaluations within each step to achieve much higher accuracy. RK4, for example, is globally $O(h^4)$ and is a workhorse in many scientific and engineering applications. All these methods build upon the idea of using local slope information to predict the next point.

2.  **Adaptive Step Size Methods:** Euler's method uses a fixed step size $h$. More sophisticated methods can estimate the local error at each step and adjust $h$ dynamically. If the error is too large, they reduce $h$; if it's very small, they increase $h$ to save computation time. This concept of error estimation is directly related to the LTE analysis of Euler's method.

3.  **Stiff ODEs:** For certain types of ODEs (called "stiff" equations), Euler's method requires an extremely small step size to maintain stability, leading to very long computation times. This inefficiency highlights the need for *implicit* methods (like Implicit Euler or Backward Euler), which are more stable for stiff problems, even though they require solving an algebraic equation at each step.

4.  **Finite Difference Methods for PDEs:** The idea of replacing derivatives with finite differences (like $\frac{y(t+h)-y(t)}{h} \approx y'(t)$) is not limited to ODEs. It's a cornerstone of solving Partial Differential Equations (PDEs) numerically, where time and space derivatives are approximated using similar techniques.

5.  **Stability Analysis:** Understanding why Euler's method can diverge or become unstable for certain problems or large step sizes is crucial. This leads to the broader field of numerical stability, where properties like absolute stability regions are analyzed for different numerical methods.

6.  **Numerical Integration/Quadrature:** While not directly solving ODEs, the concept of approximating a continuous process with discrete sums (like summing up small changes) is analogous to numerical integration techniques (e.g., Riemann sums, trapezoidal rule, Simpson's rule).

## 11. Self-check questions

1.  Consider the IVP $dy/dt = -2y$, $y(0)=1$. Use Euler's method with $h=0.1$ to approximate $y(0.2)$. Show all steps.
2.  Explain the difference between Local Truncation Error (LTE) and Global Truncation Error (GTE) for Euler's method. Why is one $O(h^2)$ and the other $O(h)$?
3.  For the ODE $dy/dt = t^2 + y$, $y(1)=0.5$. Calculate the Euler approximation for $y(1.1)$ using $h=0.1$.
4.  Suppose you are using Euler's method to solve an ODE and you want to reduce the global error by a factor of 10. By what factor would you need to reduce the step size $h$? Justify your answer.
5.  Derive the formula for Euler's method starting from the first two terms of the Taylor series expansion for $y(t+h)$. Clearly state any assumptions made.