## 1. What it is — in plain English

Imagine you're trying to predict how something changes over time. You know its current state and a rule that tells you how fast it's changing *right now*. A simple way to predict the future is to just take a small step forward, assuming the change rate stays the same for that tiny step. This is what the basic "Euler method" (often called "Forward Euler") does.

But what if the thing you're tracking has two very different speeds of change happening at the same time? Like a super-fast twitch and a super-slow drift. If you try to use the simple Euler method, you'd have to take incredibly tiny steps to accurately capture the super-fast twitch, even if you're only interested in the slow drift over a long period. Taking these tiny steps makes the calculation take forever. This situation, where you have widely varying rates of change, is called a "stiff equation."

"Implicit methods," like the "Backward Euler" method, are clever ways to handle these stiff equations. Instead of looking at the *current* change rate to predict the future, they look at the change rate *in the future* to figure out the future state. It's like saying, "What future state, if I apply the rules of change *at that future state*, would be consistent with my current state?" This sounds a bit like a riddle, and it means you have to solve an equation at each step, but the big advantage is that you can take much larger steps without the prediction going wildly wrong.

So, in short: "Stiff equations" are problems where simple prediction methods fail unless you take impossibly small steps. "Implicit methods" like "Backward Euler" are robust techniques that can take much larger steps for these difficult problems, even though each step requires a bit more work (solving an equation).

## 2. Why it matters — real-world applications

Stiff equations are not rare curiosities; they appear in many critical scientific and engineering domains where systems exhibit components evolving on vastly different timescales. Using inappropriate numerical methods for these problems can lead to inaccurate results, instability, or prohibitively long computation times.

1.  **Chemical Kinetics and Reaction-Diffusion Systems:** In chemistry, many reactions occur at vastly different rates. For instance, some intermediate species might form and decay extremely rapidly (nanoseconds), while the overall reaction proceeds over minutes or hours. Simulating the concentration changes of reactants and products in such systems (e.g., combustion models, atmospheric chemistry, biological pathways) directly involves stiff ODEs. Companies like **ANSYS** (for fluid dynamics and combustion simulation) or pharmaceutical companies modeling drug interactions heavily rely on robust stiff ODE solvers.
2.  **Electrical Circuit Simulation:** Complex electronic circuits, especially those with both very fast switching components (like transistors) and slow energy storage elements (like large capacitors or inductors), give rise to stiff ODEs. The transient analysis of these circuits requires methods that can handle components with time constants ranging from picoseconds to seconds. Software like **SPICE** (Simulation Program with Integrated Circuit Emphasis), widely used by companies like **Intel**, **Qualcomm**, or **Texas Instruments** for chip design, incorporates advanced implicit methods to efficiently simulate these stiff systems.
3.  **Control Systems and Robotics:** When designing controllers for robots or industrial processes, engineers often need to simulate the system's response to various inputs. If a robot has both very fast joint dynamics (e.g., motor response) and slow environmental interactions or high-gain feedback loops, the resulting differential equations can be stiff. This is crucial for ensuring stability and performance in applications ranging from autonomous vehicles (e.g., **Waymo**, **Tesla**) to industrial automation.
4.  **Climate and Weather Modeling:** Global climate models involve numerous coupled physical and chemical processes occurring at vastly different scales. Atmospheric chemistry, cloud microphysics, and radiative transfer can have very fast dynamics, while oceanic currents and ice sheet dynamics evolve much more slowly. Simulating these complex interactions over long periods (decades, centuries) requires numerical methods that can handle the stiffness efficiently. Research institutions like **NOAA** or the **European Centre for Medium-Range Weather Forecasts (ECMWF)** utilize advanced stiff ODE solvers in their predictive models.

## 3. Prerequisites — what you must know first

Before diving deep into stiff equations and the Backward Euler method, ensure you have a solid grasp of these fundamental concepts. If any of these feel unfamiliar, pause and review them.

*   **Ordinary Differential Equations (ODEs):**
    *   **Concept:** Equations involving an unknown function of one independent variable and its derivatives.
    *   **Why:** Stiff equations are a specific type of ODE, and numerical methods are designed to approximate their solutions.
    *   **Example:** $y'(t) = f(t, y(t))$ with an initial condition $y(t_0) = y_0$.
*   **Initial Value Problems (IVPs):**
    *   **Concept:** An ODE where the value of the unknown function is specified at a given initial point.
    *   **Why:** Numerical methods for ODEs typically solve IVPs, stepping forward from a known initial state.
*   **Numerical Integration of ODEs:**
    *   **Concept:** Approximating the solution of an ODE by stepping forward in discrete time intervals.
    *   **Why:** Backward Euler is one such numerical integration method.
*   **Forward Euler Method:**
    *   **Concept:** The simplest numerical method for ODEs: $y_{n+1} = y_n + h f(t_n, y_n)$. It uses the derivative at the *current* point to estimate the next point.
    *   **Why:** Understanding Forward Euler's limitations (especially its stability issues with stiff problems) is crucial for appreciating why Backward Euler is needed.
*   **Taylor Series Expansion:**
    *   **Concept:** Representing a function as an infinite sum of terms calculated from the function's derivatives at a single point.
    *   **Why:** Used to derive numerical methods and analyze their accuracy (local truncation error).
*   **Numerical Stability:**
    *   **Concept:** The property of a numerical method to not produce unbounded errors when applied to problems whose exact solution remains bounded.
    *   **Why:** Stiff equations specifically challenge numerical stability, and implicit methods are designed to overcome these challenges.
*   **Solving Algebraic Equations:**
    *   **Concept:** Methods for finding the roots of equations, $g(x)=0$. This includes linear equations ($Ax=b$) and non-linear equations (e.g., using Newton-Raphson).
    *   **Why:** Implicit methods like Backward Euler require solving an algebraic equation (or a system of equations) at each time step to find the next value $y_{n+1}$.
*   **Linear Algebra (for systems of ODEs):**
    *   **Concept:** Operations on vectors and matrices, solving systems of linear equations ($Ax=b$).
    *   **Why:** Stiff problems often arise from systems of coupled ODEs, which transform into systems of algebraic equations when using implicit methods. Understanding eigenvalues is also key to defining stiffness.

## 4. The core idea — step by step

Let's break down the concept of stiff equations and how the Backward Euler method tackles them.

### Step 1: The Problem - What is a Stiff Equation?

**Plain-English Statement:** Imagine you have a system where some parts change incredibly quickly, while other parts change very slowly. If you try to simulate this system with a simple method that assumes a constant rate of change over a small time step, you'll find that to keep the simulation stable and accurate for the fast parts, you have to take ridiculously tiny steps. These tiny steps then make simulating the slow parts take an absurdly long time. This mismatch in timescales is what makes an equation "stiff."

**Small Concrete Example:** Consider a cup of very hot coffee cooling down in a cold room, but also imagine a tiny, super-fast chemical reaction happening in the coffee at the same time (e.g., a dye quickly decaying). The coffee's temperature changes relatively slowly, but the dye concentration changes extremely rapidly. If you want to simulate the coffee's temperature over an hour, but your method requires you to take a step every millisecond to capture the dye's decay without numerical instability, your simulation will be agonizingly slow.

**Formal/Mathematical Version:** A system of ODEs, $\mathbf{y}' = \mathbf{f}(t, \mathbf{y})$, is considered stiff if its Jacobian matrix, $J = \frac{\partial \mathbf{f}}{\partial \mathbf{y}}$, has eigenvalues with widely varying real parts, or eigenvalues with large negative real parts. Specifically, if the eigenvalues $\lambda_i$ of $J$ satisfy $\max_i |\text{Re}(\lambda_i)| \gg \min_i |\text{Re}(\lambda_i)|$ (for negative real parts), or if some eigenvalues have very large negative real parts, requiring very small step sizes for stability with explicit methods. A classic example is the scalar test equation:
$$ y' = \lambda y, \quad \text{with } \text{Re}(\lambda) \ll 0 $$
For such an equation, the exact solution is $y(t) = y_0 e^{\lambda t}$, which decays rapidly if $\lambda$ is a large negative number. Explicit methods like Forward Euler struggle here.

**What Could Go Wrong:** If you ignore stiffness and use a standard explicit method (like Forward Euler) with a step size $h$ that's too large, your numerical solution will likely become unstable. Instead of decaying smoothly, it might oscillate wildly and grow unbounded, even if the true solution should decay to zero. You'd get garbage results that don't reflect the physical reality.

### Step 2: The Failure of Forward Euler for Stiff Equations

**Plain-English Statement:** The simple "Forward Euler" method is like driving a car by only looking at the speedometer *now* and assuming that speed will continue for the next short burst. If the road suddenly gets very slippery and you need to slow down *immediately*, but your method only reacts to the *current* speed, you'll quickly spin out of control unless your "bursts" are incredibly, incredibly short.

**Small Concrete Example:** Let's use the simple stiff test equation $y' = -100y$. The exact solution is $y(t) = y_0 e^{-100t}$, which decays very quickly.
Forward Euler is $y_{n+1} = y_n + h f(t_n, y_n)$.
Substituting $f(t_n, y_n) = -100y_n$:
$y_{n+1} = y_n + h(-100y_n) = y_n(1 - 100h)$.
For the solution to remain stable (not grow in magnitude), we need $|1 - 100h| \le 1$. This implies $-1 \le 1 - 100h \le 1$.
$0 \le 100h \le 2 \implies 0 \le h \le 0.02$.
So, for this stiff equation, the step size $h$ *must* be $0.02$ or smaller. If you need to simulate for $T=10$ seconds, you'd need $10 / 0.02 = 500$ steps. If $\lambda$ was $-100,000$, $h$ would need to be $0.00002$, requiring $500,000$ steps! This is the core issue.

**Formal/Mathematical Version:** For the scalar test equation $y' = \lambda y$, the Forward Euler method is given by:
$$ y_{n+1} = y_n + h \lambda y_n = (1 + h\lambda) y_n $$
For the numerical solution to be stable (i.e., $|y_{n+1}|$ does not grow if $|y_n|$ is bounded), we require the amplification factor $|1 + h\lambda| \le 1$.
If $\lambda$ is a real, negative number (e.g., $\lambda = -100$), then $1 + h\lambda$ must be between -1 and 1.
$-1 \le 1 + h\lambda \le 1$
$-2 \le h\lambda \le 0$
Since $\lambda$ is negative, this implies $0 \le h \le -2/\lambda$.
If $\lambda = -100$, then $h \le -2/(-100) = 0.02$. This is a severe restriction on the step size.

**What Could Go Wrong:** If you choose $h > 0.02$ for $y' = -100y$ with Forward Euler, the term $(1-100h)$ will be less than -1. For example, if $h=0.03$, then $(1-100h) = -2$. So $y_{n+1} = -2y_n$. The solution will oscillate and grow in magnitude ($y_0, -2y_0, 4y_0, -8y_0, \dots$), completely diverging from the true solution which decays to zero.

### Step 3: The Solution - Introducing Implicit Methods

**Plain-English Statement:** Instead of only looking at the "speed now" to predict the future, an "implicit method" looks at the "speed *in the future*" to figure out what that future state must be. It's like asking: "What future speed, if I were to apply it backwards from the future point to my current point, would make sense?" This involves solving a puzzle at each step, but it allows for much larger steps without losing stability.

**Small Concrete Example:** Let's go back to $y' = -100y$. For Forward Euler, we used $f(t_n, y_n) = -100y_n$. An implicit method, specifically Backward Euler, uses $f(t_{n+1}, y_{n+1}) = -100y_{n+1}$.
So, the equation for Backward Euler becomes:
$y_{n+1} = y_n + h f(t_{n+1}, y_{n+1})$
$y_{n+1} = y_n + h(-100y_{n+1})$
Notice that $y_{n+1}$ appears on *both* sides of the equation. This is what makes it "implicit." We need to solve for $y_{n+1}$.

**Formal/Mathematical Version:** The general form of an explicit method is:
$$ y_{n+1} = y_n + h \Phi(t_n, y_n; h) $$
where $\Phi$ is an increment function that depends only on information at time $t_n$.

The general form of an implicit method is:
$$ y_{n+1} = y_n + h \Phi(t_{n+1}, y_{n+1}; h) $$
Here, $\Phi$ depends on information at time $t_{n+1}$, specifically $y_{n+1}$, which is the unknown we are trying to find. This means $y_{n+1}$ is defined implicitly by an equation, rather than explicitly.

**What Could Go Wrong:** The main "downside" of implicit methods is that they are computationally more expensive per step. You're no longer just plugging numbers into a formula; you're solving an algebraic equation (or a system of equations) at each time step. For complex non-linear ODEs, this might require iterative methods like Newton-Raphson, which can add significant overhead.

### Step 4: The Backward Euler Method - A Specific Implicit Approach

**Plain-English Statement:** The Backward Euler method is the simplest type of implicit method. Instead of using the derivative at the start of your time step (like Forward Euler), it uses the derivative at the *end* of your time step. It's like trying to figure out where you need to be in the future by using the acceleration you'll experience *at that future point*.

**Small Concrete Example:** Let's derive it. We want to approximate $y(t_{n+1})$.
We know $y'(t) = f(t, y(t))$.
Integrate both sides from $t_n$ to $t_{n+1}$:
$\int_{t_n}^{t_{n+1}} y'(t) dt = \int_{t_n}^{t_{n+1}} f(t, y(t)) dt$
$y(t_{n+1}) - y(t_n) = \int_{t_n}^{t_{n+1}} f(t, y(t)) dt$
Now, for Backward Euler, we approximate the integral on the right-hand side using a rectangle rule where the height is taken at the *right endpoint* ($t_{n+1}$):
$\int_{t_n}^{t_{n+1}} f(t, y(t)) dt \approx (t_{n+1} - t_n) f(t_{n+1}, y(t_{n+1}))$
Let $h = t_{n+1} - t_n$. Let $y_n \approx y(t_n)$ and $y_{n+1} \approx y(t_{n+1})$.
Substituting these into our integrated equation:
$y_{n+1} - y_n = h f(t_{n+1}, y_{n+1})$
Rearranging, we get the Backward Euler formula:
$y_{n+1} = y_n + h f(t_{n+1}, y_{n+1})$

**Formal/Mathematical Version:** For an initial value problem $y' = f(t, y)$, with $y(t_0) = y_0$, the Backward Euler method computes approximations $y_n \approx y(t_n)$ at discrete time points $t_n = t_0 + nh$ (where $h$ is the step size) using the iterative formula:
$$ y_{n+1} = y_n + h f(t_{n+1}, y_{n+1}) $$
This is a first-order method, meaning its local truncation error is $O(h^2)$ and its global error is $O(h)$.

**What Could Go Wrong:** The main challenge, as noted, is solving this equation for $y_{n+1}$.
*   If $f(t, y)$ is linear in $y$ (e.g., $f(t,y) = Ay + B$), then $y_{n+1}$ can be solved for directly using algebra.
*   If $f(t, y)$ is non-linear in $y$ (e.g., $f(t,y) = y^2 + \sin(y)$), then you'll need to use a numerical root-finding method, such as the Newton-Raphson method, to find $y_{n+1}$. This adds another layer of iteration within each time step.

### Step 5: Why Backward Euler is Good for Stiff Equations - Stability!

**Plain-English Statement:** The Backward Euler method is "A-stable." This is a fancy way of saying it's incredibly robust. No matter how "stiff" your equation is (how fast some parts decay), the Backward Euler method will *always* produce a stable, decaying solution if the true solution decays. It won't blow up or oscillate wildly, even with large step sizes. It might not be super *accurate* with large steps, but it will be *stable*.

**Small Concrete Example:** Let's revisit $y' = -100y$.
Backward Euler: $y_{n+1} = y_n + h(-100y_{n+1})$
Rearrange to solve for $y_{n+1}$:
$y_{n+1} + 100h y_{n+1} = y_n$
$y_{n+1}(1 + 100h) = y_n$
$y_{n+1} = \frac{1}{1 + 100h} y_n$
Now, consider the amplification factor: $\frac{1}{1 + 100h}$.
Since $h > 0$, $1 + 100h$ will always be greater than 1.
Therefore, $0 < \frac{1}{1 + 100h} < 1$.
This means that $|y_{n+1}| < |y_n|$ for any positive $h$. The numerical solution will always decay, just like the true solution, regardless of how large $h$ is. This is the power of A-stability!

**Formal/Mathematical Version:** For the scalar test equation $y' = \lambda y$, the Backward Euler method yields:
$$ y_{n+1} = y_n + h \lambda y_{n+1} $$
Solving for $y_{n+1}$:
$$ y_{n+1} (1 - h\lambda) = y_n $$
$$ y_{n+1} = \frac{1}{1 - h\lambda} y_n $$
The amplification factor is $S(h\lambda) = \frac{1}{1 - h\lambda}$.
A method is **A-stable** if its region of absolute stability contains the entire left half-plane of the complex plane ($\text{Re}(\lambda) < 0$).
For Backward Euler, if $\text{Re}(\lambda) < 0$, then $\text{Re}(1 - h\lambda) = 1 - h \text{Re}(\lambda)$. Since $h>0$ and $\text{Re}(\lambda)<0$, then $h \text{Re}(\lambda)$ is negative, so $1 - h \text{Re}(\lambda)$ is positive and greater than 1.
Also, $|1 - h\lambda|^2 = (1 - h \text{Re}(\lambda))^2 + (h \text{Im}(\lambda))^2$.
Since $1 - h \text{Re}(\lambda) > 1$ (as $h \text{Re}(\lambda)$ is negative), it implies $|1 - h\lambda| > 1$.
Therefore, $|S(h\lambda)| = \left|\frac{1}{1 - h\lambda}\right| < 1$ for all $h>0$ and all $\lambda$ with $\text{Re}(\lambda) < 0$.
This confirms that Backward Euler is A-stable.

**What Could Go Wrong:** While A-stability guarantees stability for any step size, it does *not* guarantee accuracy. If you use a very large step size $h$, the numerical solution might be stable and decay, but it might decay much slower than the true solution, leading to a large global error. So, you still need to choose $h$ small enough for accuracy, but not necessarily for stability.

## 5. Worked examples — multiple, with every step shown

### Example 1: Simple Linear ODE (Demonstrating Basic Backward Euler)

**Problem:** Use the Backward Euler method to approximate $y(0.2)$ for the ODE $y' = -2y$ with initial condition $y(0) = 1$, using a step size $h = 0.1$.

**Given:**
*   ODE: $y' = f(t, y) = -2y$
*   Initial condition: $y_0 = y(0) = 1$
*   Step size: $h = 0.1$
*   Target: $y(0.2)$

**What we want:** $y_1 \approx y(0.1)$ and $y_2 \approx y(0.2)$.

**Step 1: Write down the Backward Euler formula.**
$$ y_{n+1} = y_n + h f(t_{n+1}, y_{n+1}) $$
*This is the general form we will use for each step.*

**Step 2: Substitute $f(t, y) = -2y$ into the formula.**
$$ y_{n+1} = y_n + h (-2y_{n+1}) $$
*The key here is that $f$ is evaluated at $y_{n+1}$, not $y_n$.*

**Step 3: Rearrange the equation to solve for $y_{n+1}$.**
$$ y_{n+1} = y_n - 2h y_{n+1} $$
$$ y_{n+1} + 2h y_{n+1} = y_n $$
$$ y_{n+1}(1 + 2h) = y_n $$
$$ y_{n+1} = \frac{y_n}{1 + 2h} $$
*This step isolates the unknown $y_{n+1}$ on one side, making it an explicit formula for this specific linear ODE.*

**Step 4: Calculate $y_1$ (approximation for $y(0.1)$).**
We use $n=0$. $y_0 = 1$, $h = 0.1$.
$$ y_1 = \frac{y_0}{1 + 2h} $$
$$ y_1 = \frac{1}{1 + 2(0.1)} $$
$$ y_1 = \frac{1}{1 + 0.2} $$
$$ y_1 = \frac{1}{1.2} $$
$$ y_1 = \frac{10}{12} = \frac{5}{6} \approx 0.83333 $$
*We substitute the known values for $y_0$ and $h$ into our rearranged formula.*

**Step 5: Calculate $y_2$ (approximation for $y(0.2)$).**
We use $n=1$. Now $y_1 = 5/6$, $h = 0.1$.
$$ y_2 = \frac{y_1}{1 + 2h} $$
$$ y_2 = \frac{5/6}{1 + 2(0.1)} $$
$$ y_2 = \frac{5/6}{1.2} $$
$$ y_2 = \frac{5}{6 \times 1.2} $$
$$ y_2 = \frac{5}{7.2} $$
$$ y_2 = \frac{50}{72} = \frac{25}{36} \approx 0.69444 $$
*We use the previously calculated $y_1$ as the starting point for the next step.*

**Final Answer:** The approximation for $y(0.2)$ is $\boxed{\frac{25}{36}}$.

**Reflection:** This example was straightforward because the ODE was linear in $y$, allowing us to algebraically solve for $y_{n+1}$ directly. The exact solution is $y(t) = e^{-2t}$, so $y(0.2) = e^{-0.4} \approx 0.67032$. Our approximation is close, demonstrating the method's basic functionality.

---

### Example 2: Stiff Linear ODE (Highlighting Stability)

**Problem:** Use the Backward Euler method to approximate $y(0.01)$ for the ODE $y' = -100y$ with initial condition $y(0) = 1$, using a step size $h = 0.01$. Compare with Forward Euler.

**Given:**
*   ODE: $y' = f(t, y) = -100y$
*   Initial condition: $y_0 = y(0) = 1$
*   Step size: $h = 0.01$
*   Target: $y(0.01)$

**What we want:** $y_1 \approx y(0.01)$.

**Step 1: Write down the Backward Euler formula.**
$$ y_{n+1} = y_n + h f(t_{n+1}, y_{n+1}) $$

**Step 2: Substitute $f(t, y) = -100y$ into the formula.**
$$ y_{n+1} = y_n + h (-100y_{n+1}) $$

**Step 3: Rearrange to solve for $y_{n+1}$.**
$$ y_{n+1} = y_n - 100h y_{n+1} $$
$$ y_{n+1} + 100h y_{n+1} = y_n $$
$$ y_{n+1}(1 + 100h) = y_n $$
$$ y_{n+1} = \frac{y_n}{1 + 100h} $$

**Step 4: Calculate $y_1$ (approximation for $y(0.01)$).**
We use $n=0$. $y_0 = 1$, $h = 0.01$.
$$ y_1 = \frac{1}{1 + 100(0.01)} $$
$$ y_1 = \frac{1}{1 + 1} $$
$$ y_1 = \frac{1}{2} = 0.5 $$

**Final Answer:** The approximation for $y(0.01)$ is $\boxed{0.5}$.

**Comparison with Forward Euler:**
Recall for $y' = -100y$, Forward Euler is $y_{n+1} = y_n(1 - 100h)$.
With $h=0.01$:
$y_1 = y_0(1 - 100(0.01)) = 1(1 - 1) = 1(0) = 0$.
The exact solution is $y(t) = e^{-100t}$. So, $y(0.01) = e^{-100(0.01)} = e^{-1} \approx 0.36788$.
Notice that Forward Euler gave $0$, which is stable but not very accurate. Backward Euler gave $0.5$.
Now, let's consider a *larger* step size for Forward Euler, say $h=0.03$. As discussed in the core idea, this would lead to instability:
$y_1 = y_0(1 - 100(0.03)) = 1(1 - 3) = -2$.
$y_2 = y_1(1 - 100(0.03)) = -2(-2) = 4$. The solution oscillates and grows.
For Backward Euler with $h=0.03$:
$y_1 = \frac{y_0}{1 + 100h} = \frac{1}{1 + 100(0.03)} = \frac{1}{1+3} = \frac{1}{4} = 0.25$.
This is stable and decaying, even if less accurate than with a smaller $h$.

**Reflection:** This example starkly highlights the stability advantage of Backward Euler. Even for a stiff problem where Forward Euler would require a very small $h$ for stability (here, $h \le 0.02$), Backward Euler remains stable for any $h$. While the accuracy improves with smaller $h$, the stability is guaranteed.

---

### Example 3: System of Linear ODEs (Matrix Form)

**Problem:** Consider the system of ODEs:
$$ \begin{pmatrix} y_1' \\ y_2' \end{pmatrix} = \begin{pmatrix} -1 & 0 \\ 0 & -100 \end{pmatrix} \begin{pmatrix} y_1 \\ y_2 \end{pmatrix} $$
with initial conditions $y_1(0) = 1, y_2(0) = 1$. Use Backward Euler with $h = 0.05$ to approximate $\mathbf{y}(0.05)$.

**Given:**
*   System ODE: $\mathbf{y}' = A\mathbf{y}$ where $A = \begin{pmatrix} -1 & 0 \\ 0 & -100 \end{pmatrix}$
*   Initial condition: $\mathbf{y}_0 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$
*   Step size: $h = 0.05$
*   Target: $\mathbf{y}(0.05)$

**What we want:** $\mathbf{y}_1 \approx \mathbf{y}(0.05)$.

**Step 1: Write down the Backward Euler formula for a system of ODEs.**
$$ \mathbf{y}_{n+1} = \mathbf{y}_n + h \mathbf{f}(t_{n+1}, \mathbf{y}_{n+1}) $$
In our case, $\mathbf{f}(t, \mathbf{y}) = A\mathbf{y}$.
$$ \mathbf{y}_{n+1} = \mathbf{y}_n + h A \mathbf{y}_{n+1} $$
*The formula extends naturally to vector-valued functions.*

**Step 2: Rearrange the equation to solve for $\mathbf{y}_{n+1}$.**
$$ \mathbf{y}_{n+1} - h A \mathbf{y}_{n+1} = \mathbf{y}_n $$
To factor out $\mathbf{y}_{n+1}$, we need the identity matrix $I$:
$$ (I - h A) \mathbf{y}_{n+1} = \mathbf{y}_n $$
$$ \mathbf{y}_{n+1} = (I - h A)^{-1} \mathbf{y}_n $$
*This is the matrix equivalent of solving $x(1-ha) = b \implies x = b/(1-ha)$. We need to invert a matrix.*

**Step 3: Calculate the matrix $(I - h A)$.**
$I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$, $A = \begin{pmatrix} -1 & 0 \\ 0 & -100 \end{pmatrix}$, $h = 0.05$.
$$ I - h A = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} - 0.05 \begin{pmatrix} -1 & 0 \\ 0 & -100 \end{pmatrix} $$
$$ = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} - \begin{pmatrix} -0.05 & 0 \\ 0 & -5 \end{pmatrix} $$
$$ = \begin{pmatrix} 1 - (-0.05) & 0 - 0 \\ 0 - 0 & 1 - (-5) \end{pmatrix} $$
$$ = \begin{pmatrix} 1.05 & 0 \\ 0 & 6 \end{pmatrix} $$
*We perform scalar multiplication and matrix subtraction carefully.*

**Step 4: Calculate the inverse $(I - h A)^{-1}$.**
For a diagonal matrix $\begin{pmatrix} a & 0 \\ 0 & b \end{pmatrix}$, the inverse is $\begin{pmatrix} 1/a & 0 \\ 0 & 1/b \end{pmatrix}$.
$$ (I - h A)^{-1} = \begin{pmatrix} 1/1.05 & 0 \\ 0 & 1/6 \end{pmatrix} $$
$$ = \begin{pmatrix} 20/21 & 0 \\ 0 & 1/6 \end{pmatrix} $$
*Inverting a diagonal matrix is straightforward. For non-diagonal matrices, this step would involve more complex matrix inversion techniques.*

**Step 5: Calculate $\mathbf{y}_1$.**
$$ \mathbf{y}_1 = (I - h A)^{-1} \mathbf{y}_0 $$
$$ \mathbf{y}_1 = \begin{pmatrix} 20/21 & 0 \\ 0 & 1/6 \end{pmatrix} \begin{pmatrix} 1 \\ 1 \end{pmatrix} $$
$$ \mathbf{y}_1 = \begin{pmatrix} (20/21) \times 1 + 0 \times 1 \\ 0 \times 1 + (1/6) \times 1 \end{pmatrix} $$
$$ \mathbf{y}_1 = \begin{pmatrix} 20/21 \\ 1/6 \end{pmatrix} $$
$$ \mathbf{y}_1 \approx \begin{pmatrix} 0.95238 \\ 0.16667 \end{pmatrix} $$
*Perform matrix-vector multiplication.*

**Final Answer:** The approximation for $\mathbf{y}(0.05)$ is $\boxed{\begin{pmatrix} 20/21 \\ 1/6 \end{pmatrix}}$.

**Reflection:** This system is stiff because the eigenvalues of $A$ are $\lambda_1 = -1$ and $\lambda_2 = -100$, which are widely separated.
For Forward Euler, the stability condition for $y_1'$ is $h \le 2/1 = 2$.
For Forward Euler, the stability condition for $y_2'$ is $h \le 2/100 = 0.02$.
So, Forward Euler would require $h \le 0.02$ for stability. Our chosen $h=0.05$ would make the $y_2$ component unstable with Forward Euler. Backward Euler, however, handles it perfectly by solving the system of equations. This demonstrates the power of implicit methods for systems of stiff ODEs.

---

### Example 4: Non-Linear ODE (Requiring Iterative Solver)

**Problem:** Use the Backward Euler method to approximate $y(0.1)$ for the ODE $y' = -y^2$ with initial condition $y(0) = 1$, using a step size $h = 0.1$. Use Newton-Raphson to solve the implicit equation, performing two iterations.

**Given:**
*   ODE: $y' = f(t, y) = -y^2$
*   Initial condition: $y_0 = y(0) = 1$
*   Step size: $h = 0.1$
*   Target: $y(0.1)$

**What we want:** $y_1 \approx y(0.1)$.

**Step 1: Write down the Backward Euler formula.**
$$ y_{n+1} = y_n + h f(t_{n+1}, y_{n+1}) $$

**Step 2: Substitute $f(t, y) = -y^2$ into the formula.**
For $n=0$:
$$ y_1 = y_0 + h (-y_1^2) $$
$$ y_1 = 1 + 0.1 (-y_1^2) $$
$$ y_1 = 1 - 0.1 y_1^2 $$
*This is a non-linear algebraic equation for $y_1$. We cannot solve it directly.*

**Step 3: Rearrange the implicit equation into the form $G(y_1) = 0$.**
$$ 0.1 y_1^2 + y_1 - 1 = 0 $$
Let $G(x) = 0.1x^2 + x - 1$. We want to find the root $x = y_1$.

**Step 4: Apply the Newton-Raphson method.**
The Newton-Raphson iteration formula is $x_{k+1} = x_k - \frac{G(x_k)}{G'(x_k)}$.
First, find $G'(x)$:
$G'(x) = \frac{d}{dx}(0.1x^2 + x - 1) = 0.2x + 1$.

**Step 5: Perform the first iteration ($k=0$).**
We need an initial guess, $x_0$. A common choice for implicit ODE solvers is to use the Forward Euler approximation as the guess:
$y_{1, \text{FE}} = y_0 + h f(t_0, y_0) = 1 + 0.1 (-1^2) = 1 - 0.1 = 0.9$.
So, let $x_0 = 0.9$.

Calculate $G(x_0)$:
$G(0.9) = 0.1(0.9)^2 + 0.9 - 1 = 0.1(0.81) + 0.9 - 1 = 0.081 + 0.9 - 1 = 0.981 - 1 = -0.019$.

Calculate $G'(x_0)$:
$G'(0.9) = 0.2(0.9) + 1 = 0.18 + 1 = 1.18$.

Update $x_1$:
$$ x_1 = x_0 - \frac{G(x_0)}{G'(x_0)} = 0.9 - \frac{-0.019}{1.18} $$
$$ x_1 = 0.9 + \frac{0.019}{1.18} \approx 0.9 + 0.01610169 \approx 0.91610 $$
*We use the Forward Euler approximation as a good starting guess for Newton's method. Then we apply the Newton-Raphson formula to refine the guess.*

**Step 6: Perform the second iteration ($k=1$).**
Now, $x_1 = 0.91610$.

Calculate $G(x_1)$:
$G(0.91610) = 0.1(0.91610)^2 + 0.91610 - 1 = 0.1(0.83924) + 0.91610 - 1 = 0.083924 + 0.91610 - 1 = 1.000024 - 1 = 0.000024$.

Calculate $G'(x_1)$:
$G'(0.91610) = 0.2(0.91610) + 1 = 0.18322 + 1 = 1.18322$.

Update $x_2$:
$$ x_2 = x_1 - \frac{G(x_1)}{G'(x_1)} = 0.91610 - \frac{0.000024}{1.18322} $$
$$ x_2 = 0.91610 - 0.00002028 \approx 0.91608 $$
*We repeat the process, using the refined guess from the previous iteration.*

**Final Answer:** After two Newton-Raphson iterations, the approximation for $y(0.1)$ is $\boxed{0.91608}$.

**Reflection:** This example demonstrates the extra computational cost of implicit methods for non-linear ODEs. Each time step requires an iterative solver (like Newton-Raphson) to find $y_{n+1}$. The exact solution for $y' = -y^2$ with $y(0)=1$ is $y(t) = \frac{1}{t+1}$. So $y(0.1) = \frac{1}{0.1+1} = \frac{1}{1.1} \approx 0.90909$. Our approximation is reasonably close after two iterations. The choice of initial guess for Newton's method is important, and Forward Euler often provides a good starting point.

## 6. Common mistakes and traps

1.  **Confusing Forward and Backward Euler:** The most common mistake is using $f(t_n, y_n)$ instead of $f(t_{n+1}, y_{n+1})$ in the Backward Euler formula. This turns an implicit method into an explicit one, losing the stability benefits.
    *   *Why it happens:* Students are often more familiar with explicit methods and automatically default to evaluating $f$ at the "known" time step $t_n$.
2.  **Failing to solve the implicit equation:** Forgetting that $y_{n+1}$ is an unknown that must be solved for at each step. This is particularly easy to overlook when the ODE is non-linear.
    *   *Why it happens:* It's a fundamental difference from explicit methods, where $y_{n+1}$ is directly calculated. Students might try to isolate $y_{n+1}$ algebraically even when it's not possible.
3.  **Incorrectly applying Newton-Raphson (for non-linear problems):** Errors in setting up the function $G(y_{n+1})=0$ or its derivative $G'(y_{n+1})$, or making algebraic mistakes during the iterative process.
    *   *Why it happens:* Newton-Raphson itself requires careful algebraic manipulation and computation, and an error at any stage propagates.
4.  **Assuming Backward Euler is always *accurate* with large step sizes:** While Backward Euler is A-stable (always stable for stiff problems), it is still a first-order method. Using very large step sizes might maintain stability but can lead to significant accuracy loss.
    *   *Why it happens:* The impressive stability can sometimes overshadow the need for accuracy. Stability means the solution won't blow up; accuracy means it's close to the true solution.
5.  **Not recognizing stiffness:** Trying to solve a stiff ODE with Forward Euler (or other explicit methods) and then being surprised by instability or tiny required step sizes.
    *   *Why it happens:* Understanding stiffness requires analyzing the eigenvalues of the Jacobian matrix, which is an extra step often skipped if the problem isn't explicitly labeled "stiff."
6.  **Computational cost oversight:** Underestimating the increased computational cost per step for implicit methods due to solving algebraic equations (especially for large systems or non-linear problems).
    *   *Why it happens:* Focus is often on the theoretical stability, not the practical implementation cost.

## 7. Textbook-precise explanation

For an initial value problem (IVP) of an ordinary differential equation (ODE) given by:
$$ y'(t) = f(t, y(t)), \quad y(t_0) = y_0 $$
where $y(t) \in \mathbb{R}^m$ (i.e., a system of $m$ ODEs), the **Backward Euler method** is a first-order implicit numerical method for approximating the solution.

Let $h$ be the constant step size, and let $t_n = t_0 + nh$ for $n = 0, 1, 2, \dots$. The approximation of $y(t_n)$ is denoted by $y_n$. The Backward Euler formula is derived by approximating the integral of $y'(t)$ from $t_n$ to $t_{n+1}$ using the right-hand rectangle rule:
$$ \int_{t_n}^{t_{n+1}} y'(t) dt = \int_{t_n}^{t_{n+1}} f(t, y(t)) dt $$
$$ y(t_{n+1}) - y(t_n) \approx h f(t_{n+1}, y(t_{n+1})) $$
Replacing the exact values with their numerical approximations, we obtain:
$$ y_{n+1} = y_n + h f(t_{n+1}, y_{n+1}) $$
This equation implicitly defines $y_{n+1}$. For each step $n$, one must solve this algebraic equation (or system of equations if $m>1$) for $y_{n+1}$.

**Stiff Equations:**
A system of ODEs $y' = f(t, y)$ is considered **stiff** if, for a given initial value problem, explicit numerical methods (like Forward Euler) are forced to use an extremely small step size $h$ to maintain stability, much smaller than required for accuracy alone. This typically occurs when the Jacobian matrix $J = \frac{\partial f}{\partial y}$ has eigenvalues $\lambda_i$ such that:
1.  $\text{Re}(\lambda_i) < 0$ for all $i$.
2.  There is a large variation in the magnitudes of the real parts of the eigenvalues, i.e., $\max_i |\text{Re}(\lambda_i)| \gg \min_i |\text{Re}(\lambda_i)|$. The "stiffness ratio" is often defined as this maximum-to-minimum ratio.
3.  Alternatively, some eigenvalues have very large negative real parts.

The local truncation error of the Backward Euler method is $O(h^2)$, and its global error is $O(h)$.

**Stability of Backward Euler (A-stability):**
The Backward Euler method is **A-stable**. A numerical method is A-stable if its region of absolute stability contains the entire left half-plane of the complex plane, i.e., $\{z \in \mathbb{C} \mid \text{Re}(z) < 0\}$. For the linear test equation $y' = \lambda y$, the Backward Euler method yields $y_{n+1} = \frac{1}{1 - h\lambda} y_n$. The amplification factor is $S(h\lambda) = \frac{1}{1 - h\lambda}$. For any $h > 0$ and any $\lambda$ with $\text{Re}(\lambda) < 0$, we have $|S(h\lambda)| < 1$. This means that if the exact solution decays, the numerical solution will also decay, regardless of the step size $h$. This property makes Backward Euler highly suitable for stiff problems, as it avoids the severe step-size restrictions imposed by stability requirements of explicit methods.

**Solving the Implicit Equation:**
*   **Linear Case:** If $f(t, y)$ is linear in $y$, i.e., $f(t, y) = A(t)y + b(t)$, then the implicit equation becomes:
    $$ y_{n+1} = y_n + h (A(t_{n+1})y_{n+1} + b(t_{n+1})) $$
    $$ (I - h A(t_{n+1}))y_{n+1} = y_n + h b(t_{n+1}) $$
    This is a linear system of equations that can be solved directly using methods like Gaussian elimination or LU decomposition.
*   **Non-linear Case:** If $f(t, y)$ is non-linear in $y$, then the equation $y_{n+1} = y_n + h f(t_{n+1}, y_{n+1})$ must be solved using an iterative root-finding method. Rearranging, we define a function $G(y_{n+1}) = y_{n+1} - y_n - h f(t_{n+1}, y_{n+1}) = 0$. The **Newton-Raphson method** is commonly used:
    $$ y_{n+1}^{(k+1)} = y_{n+1}^{(k)} - \left[ \frac{\partial G}{\partial y_{n+1}} (y_{n+1}^{(k)}) \right]^{-1} G(y_{n+1}^{(k)}) $$
    where $k$ is the iteration index. The derivative $\frac{\partial G}{\partial y_{n+1}} = I - h \frac{\partial f}{\partial y} (t_{n+1}, y_{n+1}^{(k)})$ involves the Jacobian matrix of $f$. A common initial guess $y_{n+1}^{(0)}$ is the Forward Euler approximation $y_n + h f(t_n, y_n)$.

**References:**
*   Burden, R. L., & Faires, J. D. (2011). *Numerical Analysis* (9th ed.). Brooks Cole. (Chapter 5: Initial-Value Problems for Ordinary Differential Equations)
*   Hairer, E., & Wanner, G. (1996). *Solving Ordinary Differential Equations I: Nonstiff Problems* (2nd ed.). Springer. (Chapter II: Runge-Kutta Methods, Chapter IV: Linear Multistep Methods)
*   Ascher, U. M., & Petzold, L. R. (1998). *Computer Methods for Ordinary Differential Equations and Differential-Algebraic Equations*. SIAM. (Chapter 5: Stiff Problems)

## 8. ASCII diagrams

Here are two ASCII diagrams to help visualize the concepts:

```text
Diagram 1: Forward Euler vs. Backward Euler - Evaluation Point

Let y(t) be the true solution curve.
Let y_n be the numerical approximation at time t_n.
Let y_n+1 be the numerical approximation at time t_n+1.
Let h = t_n+1 - t_n be the step size.

Forward Euler (Explicit):
Uses the slope at (t_n, y_n) to predict y_n+1.

  y ^
    |       . y_n+1 (FE)
    |      /
    |     /
    |    / slope = f(t_n, y_n)
    |   . y_n
    |   |
    +---+--------> t
    t_n t_n+1

Backward Euler (Implicit):
Uses the slope at (t_n+1, y_n+1) to predict y_n+1.
(Imagine drawing a line from y_n to y_n+1 such that its slope matches f(t_n+1, y_n+1))

  y ^
    |           . y_n+1 (BE)
    |          /|
    |         / |
    |        /  | slope = f(t_n+1, y_n+1)
    |       /   |
    |      . y_n
    |      |
    +------+-----> t
    t_n    t_n+1

Description:
The diagram shows a conceptual true solution curve (not drawn, but implied by the slopes).
For Forward Euler, the slope used to project from y_n to y_n+1 is determined *only* by the information available at t_n.
For Backward Euler, the slope used to project from y_n to y_n+1 is determined by the information at t_n+1, specifically y_n+1 itself. This is why it's implicit and requires solving an equation.
```

```text
Diagram 2: Stability Regions (Conceptual)

This diagram represents the complex plane, where the horizontal axis is Re(h*lambda) and the vertical axis is Im(h*lambda). The left half-plane (Re(h*lambda) < 0) is where stable physical solutions (decaying or oscillating) reside.

-------------------------------------------------------------------
       Im(h*lambda) ^
                    |
                    |           Forward Euler Stability Region
                    |           (A circle centered at (-1,0) with radius 1)
                    |               . . .
                    |            .         .
                    |          .             .
                    |         .               .
                    |        .                 .
                    |       .                   .
<-------------------|-------(-1,0)--------------(0,0)------------> Re(h*lambda)
                    |       .                   .
                    |        .                 .
                    |         .               .
                    |          .             .
                    |            .         .
                    |               . . .
                    |
                    |
                    |           Backward Euler Stability Region
                    |           (The entire left half-plane)
                    |
                    |  /////////////////////////////////////////////
                    |  /////////////////////////////////////////////
                    |  /////////////////////////////////////////////
                    |  /////////////////////////////////////////////
                    |  /////////////////////////////////////////////
                    |  /////////////////////////////////////////////
                    |  /////////////////////////////////////////////
-------------------------------------------------------------------

Description:
The top part of the diagram shows the stability region for Forward Euler. It's a circle in the complex plane centered at $(-1,0)$ with radius 1. For a method to be stable for $y' = \lambda y$, the value $h\lambda$ must lie within this region. If $\lambda$ has a large negative real part (e.g., for stiff equations), $h$ must be very small for $h\lambda$ to fall within this small circle.

The bottom part shows the stability region for Backward Euler. It is the entire left half-plane (Re(h*lambda) < 0). This means that for any $\lambda$ with a negative real part (which is typical for stiff problems where solutions decay), the Backward Euler method is stable for *any* positive step size $h$. This is the crucial property of A-stability. The shaded area represents the stable region.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    *   **"Backward looks *ahead* for stability."**
    *   Visualize a person trying to walk a tightrope (representing the solution path).
        *   **Forward Euler:** Looks *only* at their current footing ($y_n$) and tries to step forward. If the tightrope suddenly becomes very wobbly (stiff), they quickly fall off (instability).
        *   **Backward Euler:** Looks *where they want to place their next foot* ($y_{n+1}$) and figures out what angle their current foot needs to be at to reach that stable future point. It's harder to figure out (implicit equation), but they won't fall, even if the tightrope is super wobbly (A-stability). The key is "looking ahead" to the unknown $y_{n+1}$ to define the slope.

2.  **1-3 Formulas/Facts to Overlearn:**
    *   **Backward Euler Formula:** $y_{n+1} = y_n + h f(t_{n+1}, y_{n+1})$
    *   **Stiffness Definition (Qualitative):** Widely separated timescales (fast and slow dynamics) in an ODE, leading to explicit methods needing impractically small step sizes for stability.
    *   **A-Stability:** Backward Euler is A-stable, meaning it is stable for *any* step size $h$ when applied to problems whose true solutions decay (i.e., for any $\lambda$ with $\text{Re}(\lambda) < 0$).

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review the core idea, Backward Euler formula, and its stability for $y'=\lambda y$.
    *   **Day 3:** Rework Example 2 (stiff linear ODE) and try to explain A-stability in your own words without looking at notes.
    *   **Day 7:** Rework Example 4 (non-linear ODE) focusing on the Newton-Raphson setup. Explain why implicit methods are more computationally expensive per step.
    *   **Day 16:** Explain the concept of stiffness and why Forward Euler fails where Backward Euler succeeds. Draw the conceptual stability regions from memory.
    *   **Day 35:** Review all concepts, try to derive the Backward Euler formula from the integral form, and list 3-5 real-world applications.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the Backward Euler formula, you can always rebuild it from the fundamental definition of a derivative or integral.
    *   **Start with the ODE:** $y'(t) = f(t, y(t))$
    *   **Integrate over a step:** $\int_{t_n}^{t_{n+1}} y'(t) dt = \int_{t_n}^{t_{n+1}} f(t, y(t)) dt$
    *   **Left side (Fundamental Theorem of Calculus):** $y(t_{n+1}) - y(t_n)$
    *   **Right side (Numerical Approximation):** Approximate the integral using the *right-hand rectangle rule* (this is the key for "Backward" Euler). The height of the rectangle is $f(t_{n+1}, y(t_{n+1}))$ and the width is $h = t_{n+1} - t_n$.
        So, $\int_{t_n}^{t_{n+1}} f(t, y(t)) dt \approx h f(t_{n+1}, y(t_{n+1}))$.
    *   **Combine and approximate:** $y_{n+1} - y_n = h f(t_{n+1}, y_{n+1})$
    *   **Rearrange:** $y_{n+1} = y_n + h f(t_{n+1}, y_{n+1})$

## 10. Connections — what this leads to

Understanding stiff equations and implicit methods like Backward Euler is a foundational step that unlocks a vast array of advanced topics in numerical analysis and computational science:

1.  **Higher-Order Implicit Methods:** Backward Euler is first-order. This leads to the study of more accurate implicit methods:
    *   **Trapezoidal Method (Implicit Midpoint Rule):** A second-order A-stable implicit method, often preferred for its balance of accuracy and stability. $y_{n+1} = y_n + \frac{h}{2} (f(t_n, y_n) + f(t_{n+1}, y_{n+1}))$.
    *   **Backward Differentiation Formulas (BDFs):** A family of implicit multistep methods, specifically designed for stiff ODEs. BDFs of order up to 6 are A-stable or $A(\alpha)$-stable and are widely used in professional stiff ODE solvers (e.g., ode15s in MATLAB, CVODE in SUNDIALS).
    *   **Implicit Runge-Kutta Methods:** Generalizations of explicit Runge-Kutta methods that evaluate $f$ at intermediate points within the interval $[t_n, t_{n+1}]$ implicitly. Some are A-stable and can achieve very high orders of accuracy.

2.  **Absolute Stability and A-stability Theory:** The concept of A-stability introduced with Backward Euler is a crucial theoretical framework for analyzing the stability of numerical methods for stiff ODEs. This leads to further concepts like L-stability, $A(\alpha)$-stability, and regions of absolute stability in the complex plane.

3.  **Adaptive Step-Size Control:** While implicit methods allow larger steps for stability, you still need to control the step size for accuracy. This leads to methods that dynamically adjust $h$ during the simulation based on local error estimates, often using embedded Runge-Kutta pairs or predictor-corrector schemes.

4.  **Differential-Algebraic Equations (DAEs):** Many physical systems are naturally described by DAEs, which are a mix of differential and algebraic equations (e.g., constrained mechanical systems, electrical circuits with ideal components). Stiff ODE solvers, particularly those based on BDFs, are often extended to solve DAEs.

5.  **Software Libraries for ODE/DAE Solvers:** The theoretical understanding of stiff equations and implicit methods is directly applied in sophisticated software packages (e.g., CVODE/IDA in SUNDIALS, ode45/ode15s in MATLAB, SciPy's `solve_ivp`) that provide robust and efficient solvers for a wide range of ODE and DAE problems, often automatically detecting stiffness and switching to appropriate implicit methods.

6.  **Numerical Linear Algebra:** Solving the implicit equations in each step of an implicit method often involves solving large sparse linear systems, especially for systems of ODEs. This connects directly to advanced topics in numerical linear algebra, such as iterative solvers (Krylov subspace methods like GMRES or BiCGSTAB) and preconditioning techniques.

7.  **Partial Differential Equations (PDEs):** When solving time-dependent PDEs (e.g., heat equation, reaction-diffusion equations) using methods like Finite Differences or Finite Elements, the spatial discretization often transforms the PDE into a large system of ODEs. If these ODEs are stiff (which is common for parabolic PDEs), then implicit methods are essential for their time integration.

## 11. Self-check questions

1.  Consider the ODE $y' = -50y + \cos(t)$ with $y(0)=1$.
    a.  Is this ODE likely to be stiff? Justify your answer.
    b.  If you were to use Forward Euler with $h=0.1$, what would be the expected behavior of the numerical solution?
    c.  Write down the Backward Euler formula for this specific ODE.
    d.  Rearrange the Backward Euler formula to solve for $y_{n+1}$ explicitly for this linear ODE.

2.  Apply the Backward Euler method for one step to the ODE $y' = -y^3$ with $y(0)=2$ and $h=0.05$.
    a.  Write down the implicit equation for $y_1$.
    b.  Use the Newton-Raphson method with an initial guess from Forward Euler to find $y_1$, performing two iterations. Show all steps.

3.  Explain, in your own words, the difference between the "stability" and "accuracy" of a numerical method. How does the Backward Euler method exemplify this distinction when applied to stiff problems with a large step size?

4.  Consider a system of two ODEs:
    $$ y_1' = -10y_1 + y_2 $$
    $$ y_2' = -y_2 $$
    with initial conditions $y_1(0)=1, y_2(0)=1$.
    a.  Write this system in the form $\mathbf{y}' = A\mathbf{y}$.
    b.  Write down the Backward Euler formula for this system in matrix form.
    c.  If you were to use $h=0.5$, explain why Forward Euler would fail, but Backward Euler would remain stable. (You don't need to compute the solution, just explain the stability aspect.)

5.  Suppose you are simulating a complex chemical reaction