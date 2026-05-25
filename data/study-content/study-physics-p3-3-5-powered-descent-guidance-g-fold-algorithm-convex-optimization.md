## 1. What it is — in plain English

Imagine you're trying to land a very expensive, very powerful drone perfectly on a tiny landing pad, in a specific spot, without crashing, and using the absolute minimum amount of fuel. It's not just about pointing it down; you need to constantly adjust its engines, fight against gravity, and make sure you hit zero speed exactly when you touch the pad.

"Powered descent guidance" is the rocket science term for figuring out this exact path and engine firing sequence. It’s like a super-smart GPS for landing, but one that also tells the rocket's engines exactly how much to push and in what direction, second by second.

The "G-FOLD algorithm" is a particularly clever way to solve this problem. Think of it as a special kind of calculator that can find the absolute best landing trajectory. What makes it special is that it transforms a very complicated, "bumpy" problem (where many solutions look good but aren't the *best*) into a "smooth" one (where the best solution is easy to find).

This "smoothing" trick comes from a field of math called "convex optimization." It allows the rocket's computer to quickly and reliably find the most fuel-efficient and safest way to land, even in real-time, by turning a hard problem into one that standard, powerful math tools can solve with guaranteed optimality.

## 2. Why it matters — real-world applications

The ability to precisely and efficiently guide a rocket during powered descent is absolutely critical for modern space exploration and commercial spaceflight.

1.  **Reusable Rocket Landings (e.g., SpaceX Falcon 9 and Starship):** The most prominent application. For rockets to be reusable, they must land upright and gently back on Earth. G-FOLD-like algorithms are essential for calculating the precise thrust profiles and steering commands needed to bring these massive boosters back from the edge of space to a pinpoint landing on a drone ship or landing pad, minimizing fuel consumption for maximum payload capacity on future flights.
2.  **Planetary Landers (e.g., Mars Rovers like Perseverance, InSight):** Landing on other planets, especially Mars, is incredibly challenging due to thin atmospheres and unknown terrain. Algorithms like G-FOLD enable landers to perform "hazard-relative navigation," identifying safe landing zones in real-time and adjusting their descent trajectory to avoid rocks or craters, ensuring the safety of multi-billion dollar missions and their valuable scientific payloads.
3.  **Lunar Landers (e.g., NASA's Artemis Program, Commercial Lunar Payload Services):** As humanity returns to the Moon, precise landings are crucial for establishing bases, delivering cargo, and exploring specific scientific sites. G-FOLD can optimize trajectories for lunar landers, accounting for the Moon's unique gravity field and terrain, allowing for safe and efficient touchdown near desired exploration targets.
4.  **Autonomous Drone Delivery and Air Taxis:** While currently focused on rockets, the principles of powered descent guidance and convex optimization are directly transferable to future autonomous aerial vehicles. Imagine a heavy-lift drone delivering packages or transporting passengers. G-FOLD could optimize its descent path to a precise landing spot, minimizing energy use and ensuring safety, especially in complex urban environments.
5.  **Autonomous Docking and Rendezvous:** While not strictly "descent," the underlying principles of optimizing trajectories under thrust and mass constraints are vital for spacecraft performing autonomous rendezvous and docking maneuvers with space stations or other spacecraft, ensuring precise alignment and minimal fuel expenditure.

## 3. Prerequisites — what you must know first

To fully grasp G-FOLD and its underlying principles, you should be familiar with the following concepts:

*   **Newton's Laws of Motion:** Understanding $F=ma$ (force equals mass times acceleration), especially how thrust and gravity contribute to the net force, and how mass changes over time due to fuel consumption.
*   **Basic Calculus (Derivatives and Integrals):** Knowing how to work with rates of change (derivatives) to describe velocity from position, and acceleration from velocity, and how to sum up continuous changes (integrals) to find total change.
*   **Vectors and Matrices:** Comfort with vector arithmetic (addition, subtraction, dot product, magnitude) to represent position, velocity, acceleration, and force in 2D or 3D space, and basic matrix operations.
*   **Orbital Mechanics Fundamentals:** Concepts like thrust, specific impulse ($I_{sp}$), gravitational acceleration ($\mathbf{g}$), and delta-v ($\Delta V$) as a measure of a rocket's maneuverability.
*   **Control Systems Basics:** An understanding of what a "control system" does (making a system behave in a desired way), the difference between open-loop and closed-loop control, and the idea of a "state" (position, velocity, mass).
*   **Optimization Theory:** The general idea of finding the "best" solution (maximum or minimum) for a given objective function, subject to certain constraints. Familiarity with local vs. global optima.
*   **Convex Sets and Convex Functions:** Basic definitions of what makes a set "convex" (any two points in the set, the line segment connecting them is also in the set) and a function "convex" (its graph "bows upwards" or is flat, meaning any local minimum is also a global minimum).

## 4. The core idea — step by step

G-FOLD tackles the complex problem of guiding a rocket to a precise landing by cleverly transforming it into a mathematically "easy" problem. Let's break down the core ideas.

### Step 1: The Descent Problem – Getting from Here to There, Perfectly

*   **Plain English Statement:** A rocket is currently at some position and velocity, and it needs to end up at a specific landing spot on the ground, with exactly zero velocity (i.e., stopped) when it gets there. It also needs to do this safely and efficiently.
*   **Concrete Example:** Imagine a rocket 10 kilometers above the surface, moving downwards at 100 meters per second. It needs to land precisely at coordinates (0, 0, 0) on the ground, with a final velocity of (0, 0, 0) m/s.
*   **Formal/Mathematical Version:**
    We define the rocket's "state" at any time $t$ as its position $\mathbf{r}(t)$ and velocity $\mathbf{v}(t)$. Let's combine these into a state vector $\mathbf{x}(t) = [\mathbf{r}(t)^T, \mathbf{v}(t)^T]^T$.
    The problem starts at an initial state $\mathbf{x}_0 = [\mathbf{r}_0^T, \mathbf{v}_0^T]^T$ at time $t_0$.
    The goal is to reach a final state $\mathbf{x}_f = [\mathbf{r}_f^T, \mathbf{0}^T]^T$ at some final time $t_f$.
    $$ \mathbf{x}(t_0) = \mathbf{x}_0 $$
    $$ \mathbf{x}(t_f) = \mathbf{x}_f $$
    We also want to minimize some objective, typically fuel consumption, which means minimizing the total change in mass.
*   **What could go wrong:** If we don't precisely hit the target velocity of zero, the rocket will either crash hard (if it's still moving downwards) or bounce/fly away (if it's moving upwards or sideways). Missing the landing spot means failing the mission.

### Step 2: Rocket Dynamics – How the Rocket Moves

*   **Plain English Statement:** The rocket's movement is governed by gravity pulling it down and the engine pushing it (and steering it). Crucially, as the engine burns fuel, the rocket's mass decreases, which means the same engine thrust produces more acceleration over time.
*   **Concrete Example:** If an engine produces 100 kN of thrust, and the rocket weighs 10,000 kg, the acceleration from thrust is $100 \text{ kN} / 10,000 \text{ kg} = 10 \text{ m/s}^2$. But if it burns 1,000 kg of fuel, its mass becomes 9,000 kg, and the same 100 kN thrust now gives $100 \text{ kN} / 9,000 \text{ kg} \approx 11.1 \text{ m/s}^2$.
*   **Formal/Mathematical Version:**
    The equations of motion are:
    $$ \dot{\mathbf{r}}(t) = \mathbf{v}(t) $$
    $$ \dot{\mathbf{v}}(t) = \mathbf{g} + \frac{T(t)}{m(t)}\mathbf{u}(t) $$
    $$ \dot{m}(t) = -\frac{T(t)}{I_{sp}g_0} $$
    Where:
    *   $\mathbf{r}(t)$ is position, $\mathbf{v}(t)$ is velocity.
    *   $\mathbf{g}$ is the gravitational acceleration vector (assumed constant for short descents, or a more complex model for longer ones).
    *   $T(t)$ is the magnitude of the engine thrust.
    *   $m(t)$ is the instantaneous mass of the rocket.
    *   $\mathbf{u}(t)$ is the unit vector in the direction of thrust (i.e., $\mathbf{u}(t)$ has magnitude 1, $|\mathbf{u}(t)| = 1$).
    *   $I_{sp}$ is the engine's specific impulse.
    *   $g_0$ is standard gravity (approximately $9.80665 \text{ m/s}^2$).
    Notice the $\frac{T(t)}{m(t)}$ term and the changing mass $m(t)$. These are the tricky parts!
*   **What could go wrong:** Ignoring the changing mass or assuming a constant thrust direction simplifies the problem but leads to inaccurate and potentially dangerous trajectories.

### Step 3: Constraints – What the Rocket Can't Do

*   **Plain English Statement:** Rockets have physical limits. Their engines can only produce so much thrust (minimum and maximum), they can only point in certain directions, and they definitely can't fly through the ground. Fuel is also a finite resource.
*   **Concrete Example:** An engine might have a maximum thrust of 500 kN and a minimum thrust of 100 kN. The rocket can't point its engine backwards relative to its body beyond a certain angle. Its altitude must always be non-negative.
*   **Formal/Mathematical Version:**
    *   **Thrust Magnitude Constraints:** The thrust must be within the engine's operational limits.
        $$ T_{min} \le T(t) \le T_{max} $$
    *   **Thrust Direction Constraint:** The thrust direction is a unit vector.
        $$ |\mathbf{u}(t)| = 1 $$
        This is a non-linear constraint, as $\mathbf{u} \cdot \mathbf{u} = 1$.
    *   **State Constraints:** The rocket must not hit the ground.
        $$ \mathbf{r}_z(t) \ge 0 $$
        (assuming z is altitude).
    *   **Fuel/Mass Constraints:** The mass must always be positive and greater than the dry mass (mass without fuel).
        $$ m_{dry} \le m(t) \le m_0 $$
    *   **Terminal Constraints:** As seen in Step 1, specific position and velocity at $t_f$.
*   **What could go wrong:** Violating these constraints means the calculated trajectory is physically impossible or unsafe. Forgetting a constraint can lead to a "solution" that crashes the rocket.

### Step 4: The Challenge of Non-Convexity – Why This is Hard

*   **Plain English Statement:** The equations describing rocket motion, especially with changing mass and variable thrust direction, are "bumpy" or non-linear. This means if you try to find the best solution, you might get stuck in a "local best" spot that isn't the *absolute best* overall. It's like trying to find the lowest point in a landscape that has many small dips and valleys; you might think you're at the lowest point, but there's a deeper valley just over the hill.
*   **Concrete Example:** The term $\frac{T(t)}{m(t)}$ involves a division by a changing variable, and the constraint $|\mathbf{u}(t)| = 1$ is a circle/sphere, which is not "flat" or "bowed upwards" in a way that makes the problem easy to solve globally. These non-linearities create multiple potential "optimal" paths, making it hard to guarantee you've found the truly best one (e.g., the one that uses the least fuel).
*   **Formal/Mathematical Version:**
    The terms $\frac{T(t)}{m(t)}$ and the product $T(t)\mathbf{u}(t)$ are non-linear. The constraint $|\mathbf{u}(t)| = 1$ (a sphere) is non-convex. When these appear in an optimization problem, they make the overall problem non-convex.
    A non-convex problem can have multiple local optima, making it computationally very expensive and difficult to find the global optimum (the absolute best solution). Standard numerical optimization methods can get stuck in a local minimum.
*   **What could go wrong:** A rocket guided by a local optimum might use significantly more fuel than necessary, take a less safe path, or even fail to reach its target.

### Step 5: G-FOLD's Trick: Convexification (Lossless Convexification) – Making it Smooth

*   **Plain English Statement:** G-FOLD's genius is to cleverly re-describe the problem using new variables and constraints that transform the "bumpy" non-convex problem into an equivalent "smooth" convex problem. It's like re-drawing the landscape so that all the little dips disappear, leaving just one big, smooth bowl. Now, finding the lowest point in the bowl is easy and guaranteed to be the absolute lowest. This transformation is "lossless" because it doesn't approximate or simplify the physics; it just changes the mathematical representation.
*   **Concrete Example:** Instead of directly optimizing $T(t)$ and $\mathbf{u}(t)$ and $m(t)$ separately, G-FOLD introduces new variables:
    1.  **Thrust Acceleration Vector:** Let $\mathbf{f}(t) = \frac{T(t)}{m(t)}\mathbf{u}(t)$. This new variable represents the acceleration due to thrust.
    2.  **Inverse Mass:** Let $\sigma(t) = \frac{1}{m(t)}$.
    Now, the velocity dynamics become $\dot{\mathbf{v}}(t) = \mathbf{g} + \mathbf{f}(t)$, which is linear in $\mathbf{f}(t)$.
    The mass dynamics become $\dot{\sigma}(t) = \frac{1}{m(t)^2} \frac{T(t)}{I_{sp}g_0} = \sigma(t)^2 \frac{T(t)}{I_{sp}g_0}$. This is still non-linear. The key insight of G-FOLD is to integrate the mass dynamics *analytically* to get a convex constraint.
    The non-convex constraint $|\mathbf{u}(t)| = 1$ is replaced by a convex constraint on $\mathbf{f}(t)$ and $\sigma(t)$. Specifically, the constraint $T_{min} \le T(t) \le T_{max}$ becomes $T_{min} \sigma(t) \le |\mathbf{f}(t)| \le T_{max} \sigma(t)$. This is a Second-Order Cone (SOC) constraint, which is convex!
    The fuel consumption objective (minimizing final mass) can also be formulated in a convex way.
*   **Formal/Mathematical Version:**
    The core variable transformation involves:
    1.  **Thrust acceleration:** $\mathbf{f}(t) = \frac{T(t)}{m(t)}\mathbf{u}(t)$
    2.  **Inverse mass:** $\sigma(t) = \frac{1}{m(t)}$
    The state equations become:
    $$ \dot{\mathbf{r}}(t) = \mathbf{v}(t) $$
    $$ \dot{\mathbf{v}}(t) = \mathbf{g} + \mathbf{f}(t) $$
    These are now linear in $\mathbf{f}(t)$.
    The mass dynamics are handled by integrating $\dot{m} = -\frac{T}{I_{sp}g_0}$ to get $m(t) = m_0 - \frac{1}{I_{sp}g_0} \int_{t_0}^t T(\tau) d\tau$.
    The non-convex thrust constraint $T_{min} \le T(t) \le T_{max}$ and $|\mathbf{u}(t)|=1$ are combined and transformed into:
    $$ T_{min} \sigma(t) \le |\mathbf{f}(t)| \le T_{max} \sigma(t) $$
    This is equivalent to a set of Second-Order Cone (SOC) constraints, which define a convex set.
    The fuel minimization objective (minimizing $m_0 - m_f$) is equivalent to minimizing $\int_{t_0}^{t_f} T(\tau) d\tau$, which can also be formulated as a convex objective function.
*   **What could go wrong:** If the transformation weren't "lossless," the solution to the convex problem wouldn't be the exact solution to the original problem. G-FOLD's power comes from the fact that this transformation *is* lossless under certain conditions.

### Step 6: Solving the Convex Problem – Using Standard Tools

*   **Plain English Statement:** Once the problem is transformed into a convex form, it becomes a standard mathematical problem that can be solved very efficiently and reliably by powerful, off-the-shelf optimization software. These solvers are guaranteed to find the absolute best solution because there are no "local dips" to get stuck in.
*   **Concrete Example:** The transformed problem is usually formulated as a Second-Order Cone Program (SOCP). There are highly optimized numerical algorithms (like interior-point methods) implemented in software libraries (e.g., CVXPY, MOSEK, Gurobi) that can solve SOCPs extremely fast, even for large problems, making G-FOLD suitable for real-time applications.
*   **Formal/Mathematical Version:**
    The discretized version of the convexified problem (where time is broken into small steps) becomes a large-scale Second-Order Cone Program (SOCP). An SOCP is a type of convex optimization problem that can be solved very efficiently using specialized algorithms, typically interior-point methods. These methods find the global optimum in polynomial time.
*   **What could go wrong:** Numerical issues can arise if the problem is poorly scaled or if the solver's precision limits are hit. However, these are generally well-understood and managed in modern solvers.

### Step 7: Reconstructing the Original Solution – Getting Back to Rocket Controls

*   **Plain English Statement:** The optimization solver gives us optimal values for our new "smooth" variables (thrust acceleration $\mathbf{f}(t)$ and inverse mass $\sigma(t)$). We then need to convert these back into the actual, physical controls the rocket engine understands: the real thrust magnitude $T(t)$ and the real thrust direction $\mathbf{u}(t)$.
*   **Concrete Example:** If the solver gives us $\mathbf{f}(t)$ and $\sigma(t)$, we can calculate the optimal thrust magnitude as $T(t) = |\mathbf{f}(t)| / \sigma(t)$ and the optimal thrust direction as $\mathbf{u}(t) = \mathbf{f}(t) / |\mathbf{f}(t)|$. We also recover the mass $m(t) = 1/\sigma(t)$. These are the commands sent to the rocket's engines.
*   **Formal/Mathematical Version:**
    From the optimal $\mathbf{f}^*(t)$ and $\sigma^*(t)$ found by the SOCP solver, we reconstruct the original control variables:
    $$ T^*(t) = \frac{|\mathbf{f}^*(t)|}{\sigma^*(t)} $$
    $$ \mathbf{u}^*(t) = \frac{\mathbf{f}^*(t)}{|\mathbf{f}^*(t)|} \quad (\text{if } |\mathbf{f}^*(t)| > 0) $$
    And the mass profile:
    $$ m^*(t) = \frac{1}{\sigma^*(t)} $$
*   **What could go wrong:** Errors in the reconstruction step could lead to non-physical or incorrect control commands being sent to the rocket, negating the benefit of the optimal trajectory. However, these transformations are straightforward and typically robust.

## 5. Worked examples — multiple, with every step shown

Fully working out a G-FOLD problem by hand involves solving a Second-Order Cone Program (SOCP), which is typically done with specialized software. However, we can illustrate the key principles and transformations with simplified examples.

---

### Example 1: Simple 1D Vertical Descent (Constant Mass, No Thrust Limits)

**Problem:** A rocket is descending vertically towards the ground. We want to bring it to a complete stop at a target altitude of 0 meters. For this simplified example, assume the rocket's mass is constant, and there are no thrust magnitude limits. We only need to find the thrust profile to achieve a soft landing.

**Given:**
*   Initial altitude $r_0 = 100 \text{ m}$
*   Initial velocity $v_0 = -10 \text{ m/s}$ (negative indicates downward motion)
*   Final altitude $r_f = 0 \text{ m}$
*   Final velocity $v_f = 0 \text{ m/s}$
*   Gravitational acceleration $g = -9.81 \text{ m/s}^2$ (negative for downward acceleration)
*   Constant mass $m = 1000 \text{ kg}$

**What we want:** The thrust $T(t)$ as a function of time, and the final time $t_f$.

**Solution:**

1.  **Define the dynamics:**
    The vertical acceleration $a(t)$ is due to gravity $g$ and thrust $T(t)$ acting upwards.
    $$ a(t) = g + \frac{T(t)}{m} $$
    Since $v(t) = \dot{r}(t)$ and $a(t) = \dot{v}(t)$, we have:
    $$ \dot{v}(t) = g + \frac{T(t)}{m} $$
    $$ \dot{r}(t) = v(t) $$
    *Explanation: These are the fundamental kinematic equations. The acceleration is the sum of gravitational acceleration and the acceleration provided by the engine. The engine thrust $T(t)$ acts opposite to gravity, hence it's positive in our upward-positive coordinate system.*

2.  **Integrate velocity:**
    Let's integrate the velocity equation from $t$ to $t_f$:
    $$ \int_t^{t_f} \dot{v}(\tau) d\tau = \int_t^{t_f} \left(g + \frac{T(\tau)}{m}\right) d\tau $$
    $$ v(t_f) - v(t) = g(t_f - t) + \frac{1}{m} \int_t^{t_f} T(\tau) d\tau $$
    We know $v(t_f) = 0$. So,
    $$ -v(t) = g(t_f - t) + \frac{1}{m} \int_t^{t_f} T(\tau) d\tau $$
    $$ v(t) = -g(t_f - t) - \frac{1}{m} \int_t^{t_f} T(\tau) d\tau $$
    *Explanation: We integrate backwards from the final time $t_f$ to an arbitrary time $t$. This allows us to relate the velocity at any time $t$ to the final velocity and the integrated thrust over the remaining time. The integral term represents the total impulse from the engine.*

3.  **Integrate position:**
    Now, integrate the position equation from $t$ to $t_f$:
    $$ \int_t^{t_f} \dot{r}(\tau) d\tau = \int_t^{t_f} v(\tau) d\tau $$
    $$ r(t_f) - r(t) = \int_t^{t_f} \left(-g(t_f - \tau) - \frac{1}{m} \int_\tau^{t_f} T(\xi) d\xi \right) d\tau $$
    We know $r(t_f) = 0$. So,
    $$ -r(t) = \int_t^{t_f} -g(t_f - \tau) d\tau - \frac{1}{m} \int_t^{t_f} \int_\tau^{t_f} T(\xi) d\xi d\tau $$
    Let's simplify the first integral:
    $$ \int_t^{t_f} -g(t_f - \tau) d\tau = -g \left[ t_f \tau - \frac{\tau^2}{2} \right]_t^{t_f} = -g \left( (t_f^2 - \frac{t_f^2}{2}) - (t_f t - \frac{t^2}{2}) \right) $$
    $$ = -g \left( \frac{t_f^2}{2} - t_f t + \frac{t^2}{2} \right) = -g \frac{(t_f - t)^2}{2} $$
    The second integral is a bit tricky. We can use integration by parts or Fubini's theorem (changing order of integration). For simplicity, let's assume constant thrust $T$ for a moment to get a feel for the solution structure. If $T$ is constant, then $\int_\tau^{t_f} T d\xi = T(t_f-\tau)$.
    Then $\int_t^{t_f} T(t_f-\tau) d\tau = T [t_f \tau - \frac{\tau^2}{2}]_t^{t_f} = T \frac{(t_f-t)^2}{2}$.
    So, for constant $T$:
    $$ -r(t) = -g \frac{(t_f - t)^2}{2} - \frac{T}{m} \frac{(t_f - t)^2}{2} $$
    $$ r(t) = (g + \frac{T}{m}) \frac{(t_f - t)^2}{2} $$
    *Explanation: We integrate the velocity equation to get the position. This is a double integral of acceleration. The second integral, involving $T(\xi)$, is complex for a general $T(t)$. However, the principle remains: we are relating the current position to the final position, initial velocity, and the integrated effect of thrust and gravity over time.*

4.  **Solve for initial conditions at $t=t_0$:**
    At $t=t_0$, we have $r(t_0) = r_0$ and $v(t_0) = v_0$.
    From step 2:
    $$ v_0 = -g(t_f - t_0) - \frac{1}{m} \int_{t_0}^{t_f} T(\tau) d\tau $$
    From step 3 (using the result for constant thrust for simplicity, but recognizing that $\frac{1}{m} \int_{t_0}^{t_f} \int_\tau^{t_f} T(\xi) d\xi d\tau$ is the integral of the velocity change due to thrust):
    $$ r_0 = -g \frac{(t_f - t_0)^2}{2} - \frac{1}{m} \int_{t_0}^{t_f} \int_\tau^{t_f} T(\xi) d\xi d\tau $$
    Let $t_{go} = t_f - t_0$ be the "time to go".
    $$ v_0 = -g \cdot t_{go} - \frac{1}{m} \int_{t_0}^{t_f} T(\tau) d\tau $$
    $$ r_0 = -g \frac{t_{go}^2}{2} - \frac{1}{m} \int_{t_0}^{t_f} \int_\tau^{t_f} T(\xi) d\xi d\tau $$
    *Explanation: We set the general equations at time $t$ to the given initial conditions at $t_0$. This gives us two equations that must be satisfied by the thrust profile $T(\tau)$ and the final time $t_f$. Note the double integral of thrust for position.*

5.  **Finding a specific thrust profile (e.g., constant thrust):**
    If we assume constant thrust $T$ (this is an assumption for simplicity, not a general solution), the integrals simplify:
    $$ v_0 = -g \cdot t_{go} - \frac{T}{m} t_{go} $$
    $$ r_0 = -g \frac{t_{go}^2}{2} - \frac{T}{m} \frac{t_{go}^2}{2} $$
    From the second equation:
    $$ r_0 = -(g + \frac{T}{m}) \frac{t_{go}^2}{2} $$
    From the first equation:
    $$ v_0 = -(g + \frac{T}{m}) t_{go} $$
    Divide the second by the first:
    $$ \frac{r_0}{v_0} = \frac{-(g + T/m) t_{go}^2 / 2}{-(g + T/m) t_{go}} = \frac{t_{go}}{2} $$
    So, $t_{go} = \frac{2r_0}{v_0}$.
    *Wait, the initial velocity $v_0$ is negative, so $t_{go}$ would be negative. This indicates a problem with the direction of $v_0$ in the denominator, or that this simple division is only valid if $v_0$ is positive. Let's re-evaluate the equations with upward positive convention.*
    
    Let's use $a_T(t) = T(t)/m$ as the thrust acceleration.
    $\dot{v}(t) = g + a_T(t)$
    $\dot{r}(t) = v(t)$
    $v_f = v_0 + \int_{t_0}^{t_f} (g + a_T(\tau)) d\tau = v_0 + g(t_f-t_0) + \int_{t_0}^{t_f} a_T(\tau) d\tau$
    $r_f = r_0 + \int_{t_0}^{t_f} v(\tau) d\tau = r_0 + v_0(t_f-t_0) + \int_{t_0}^{t_f} \int_{t_0}^\tau (g + a_T(\xi)) d\xi d\tau$

    With $v_f=0, r_f=0$:
    $$ 0 = v_0 + g \cdot t_{go} + \int_{t_0}^{t_f} a_T(\tau) d\tau \quad (Eq. 1) $$
    $$ 0 = r_0 + v_0 \cdot t_{go} + g \frac{t_{go}^2}{2} + \int_{t_0}^{t_f} \int_{t_0}^\tau a_T(\xi) d\xi d\tau \quad (Eq. 2) $$
    Let $A_T = \int_{t_0}^{t_f} a_T(\tau) d\tau$ (total change in velocity from thrust)
    Let $R_T = \int_{t_0}^{t_f} \int_{t_0}^\tau a_T(\xi) d\xi d\tau$ (total change in position from thrust)

    Then:
    $$ 0 = v_0 + g \cdot t_{go} + A_T \quad (Eq. 1') $$
    $$ 0 = r_0 + v_0 \cdot t_{go} + g \frac{t_{go}^2}{2} + R_T \quad (Eq. 2') $$
    From (Eq. 1'): $A_T = -v_0 - g \cdot t_{go}$
    From (Eq. 2'): $R_T = -r_0 - v_0 \cdot t_{go} - g \frac{t_{go}^2}{2}$

    Now, we need a relationship between $A_T$ and $R_T$. For constant acceleration $a_T$, $A_T = a_T \cdot t_{go}$ and $R_T = a_T \frac{t_{go}^2}{2}$.
    So, $R_T = A_T \frac{t_{go}}{2}$.
    Substitute $A_T$ and $R_T$:
    $$ -r_0 - v_0 \cdot t_{go} - g \frac{t_{go}^2}{2} = (-v_0 - g \cdot t_{go}) \frac{t_{go}}{2} $$
    $$ -r_0 - v_0 \cdot t_{go} - g \frac{t_{go}^2}{2} = -\frac{v_0}{2} t_{go} - g \frac{t_{go}^2}{2} $$
    $$ -r_0 - v_0 \cdot t_{go} = -\frac{v_0}{2} t_{go} $$
    $$ -r_0 = v_0 \cdot t_{go} - \frac{v_0}{2} t_{go} $$
    $$ -r_0 = \frac{v_0}{2} t_{go} $$
    $$ t_{go} = -\frac{2r_0}{v_0} $$
    *Explanation: We used the standard kinematic equations, expressing total velocity and position changes due to thrust and gravity. By setting final conditions to zero, we derived a relationship between $r_0, v_0, g,$ and $t_{go}$. The assumption of constant thrust acceleration $a_T$ (which implies constant thrust $T$ given constant mass) allows us to connect the integrated thrust terms $A_T$ and $R_T$ via a simple kinematic relation.*

6.  **Calculate $t_{go}$ and $T$:**
    Given: $r_0 = 100 \text{ m}$, $v_0 = -10 \text{ m/s}$, $g = -9.81 \text{ m/s}^2$ (using upward positive for $r, v$, so gravity is negative).
    $$ t_{go} = -\frac{2 \times 100 \text{ m}}{-10 \text{ m/s}} = \frac{200}{10} = 20 \text{ s} $$
    Now, find the required constant thrust acceleration $a_T = T/m$:
    From $A_T = -v_0 - g \cdot t_{go}$:
    $$ a_T \cdot t_{go} = -v_0 - g \cdot t_{go} $$
    $$ a_T = -\frac{v_0}{t_{go}} - g $$
    $$ a_T = -\frac{-10 \text{ m/s}}{20 \text{ s}} - (-9.81 \text{ m/s}^2) $$
    $$ a_T = 0.5 \text{ m/s}^2 + 9.81 \text{ m/s}^2 $$
    $$ a_T = 10.31 \text{ m/s}^2 $$
    Finally, calculate the thrust $T = m \cdot a_T$:
    $$ T = 1000 \text{ kg} \times 10.31 \text{ m/s}^2 = 10310 \text{ N} $$

    The final answer is:
    **Final Time $t_f = t_0 + t_{go} = t_0 + 20 \text{ s}$**
    **Constant Thrust $T = 10310 \text{ N}$**

    *Explanation: We plug in the initial values to find the time to go. Then, using the derived relations, we calculate the constant acceleration needed from the engine, and finally the thrust magnitude. This demonstrates how a simple optimal control problem can be solved analytically under strong simplifying assumptions.*

**Reflection:** This example was easy because we assumed constant mass and constant thrust direction (vertical), allowing for analytical integration. The core idea was to satisfy the terminal conditions by finding the right thrust over time. The "optimal" part here is implicit in finding *any* thrust that achieves the goal, as there are no limits or costs to minimize.

---

### Example 2: 1D Vertical Descent (Changing Mass, Constant Upward Thrust Direction, Thrust Limits)

**Problem:** A rocket is descending vertically. We need to land it softly at $r_f=0, v_f=0$. Now, its mass changes due to fuel consumption, and the engine has min/max thrust limits. We want to find the thrust profile $T(t)$ that minimizes fuel consumption (i.e., minimizes total change in mass).

**Given:**
*   Initial altitude $r_0 = 100 \text{ m}$
*   Initial velocity $v_0 = -10 \text{ m/s}$
*   Initial mass $m_0 = 1000 \text{ kg}$
*   Dry mass $m_{dry} = 500 \text{ kg}$
*   Gravitational acceleration $g = -9.81 \text{ m/s}^2$
*   Engine specific impulse $I_{sp} = 300 \text{ s}$
*   Standard gravity $g_0 = 9.81 \text{ m/s}^2$
*   Minimum thrust $T_{min} = 5000 \text{ N}$
*   Maximum thrust $T_{max} = 15000 \text{ N}$

**What we want:** The optimal thrust profile $T(t)$ and final time $t_f$ that minimizes fuel.

**Solution (Conceptual G-FOLD Transformation):**

This problem is non-convex due to the changing mass in the acceleration term ($\frac{T(t)}{m(t)}$) and the thrust limits interacting with mass. We will outline how G-FOLD transforms this into a convex problem.

1.  **Define Dynamics:**
    $$ \dot{r}(t) = v(t) $$
    $$ \dot{v}(t) = g + \frac{T(t)}{m(t)} $$
    $$ \dot{m}(t) = -\frac{T(t)}{I_{sp}g_0} $$
    *Explanation: These are the standard rocket equations of motion, now including the mass change due to thrust.*

2.  **Define Constraints:**
    *   Initial/Terminal Conditions:
        $r(t_0) = r_0$, $v(t_0) = v_0$, $m(t_0) = m_0$
        $r(t_f) = 0$, $v(t_f) = 0$
    *   Thrust Limits:
        $T_{min} \le T(t) \le T_{max}$
    *   Mass Limits:
        $m_{dry} \le m(t) \le m_0$
    *   Altitude:
        $r(t) \ge 0$
    *   Final Time: $t_f$ is a variable to be optimized or fixed. For fuel minimization, it's typically optimized.
    *Explanation: These are the physical boundaries and mission requirements that the trajectory must satisfy.*

3.  **Objective Function:**
    Minimize fuel consumption, which is equivalent to minimizing the final mass $m(t_f)$ or maximizing the total mass change $m_0 - m(t_f)$.
    This also means minimizing $\int_{t_0}^{t_f} T(\tau) d\tau$.
    *Explanation: Less fuel burned means more mass remaining at landing, which is a common optimization goal for reusability.*

4.  **G-FOLD Transformation (Convexification):**
    This is the core step. We introduce new variables to linearize the dynamics and convexify the constraints.
    *   **New Control Variable:** Let $u(t) = \frac{T(t)}{m(t)}$. This is the thrust acceleration.
    *   **New State Variable:** Let $\sigma(t) = \frac{1}{m(t)}$. This is the inverse mass.
    *Explanation: These are the key variable substitutions. $u(t)$ replaces the non-linear $\frac{T(t)}{m(t)}$ term in the velocity equation. $\sigma(t)$ helps manage the mass dynamics.*

5.  **Rewrite Dynamics in terms of new variables:**
    $$ \dot{r}(t) = v(t) $$
    $$ \dot{v}(t) = g + u(t) $$
    These are now linear in $u(t)$.
    For mass dynamics: $\dot{m}(t) = -\frac{T(t)}{I_{sp}g_0}$.
    Substitute $T(t) = u(t)m(t) = u(t)/\sigma(t)$:
    $$ \dot{m}(t) = -\frac{u(t)}{I_{sp}g_0 \sigma(t)} $$
    This is still non-linear. G-FOLD uses an analytical integration of the mass flow.
    Recall $m(t) = m_0 - \frac{1}{I_{sp}g_0} \int_{t_0}^t T(\tau) d\tau$.
    So, $1/\sigma(t) = m_0 - \frac{1}{I_{sp}g_0} \int_{t_0}^t \frac{u(\tau)}{\sigma(\tau)} d\tau$.
    This is still complex. The G-FOLD approach for mass is to integrate the mass flow directly in the problem formulation.
    The total mass burned is $\Delta m = \int_{t_0}^{t_f} \frac{T(t)}{I_{sp}g_0} dt$.
    To make this convex, we use the variable $P(t) = \int_{t_0}^t T(\tau) d\tau$, so $\dot{P}(t) = T(t)$.
    Then $m(t) = m_0 - P(t)/(I_{sp}g_0)$.
    Now, the thrust limits: $T_{min} \le T(t) \le T_{max}$.
    Since $T(t) = u(t)m(t) = u(t)/\sigma(t)$, we have:
    $$ T_{min} \le u(t)/\sigma(t) \le T_{max} $$
    $$ T_{min} \sigma(t) \le u(t) \le T_{max} \sigma(t) $$
    *Explanation: The key is that $u(t)$ (thrust acceleration) and $\sigma(t)$ (inverse mass) are now the decision variables. The dynamic equations for $r$ and $v$ are linear. The thrust constraints are now linear inequalities on $u(t)$ and $\sigma(t)$ if we consider $u(t)$ to be a positive quantity (since thrust is always upwards in 1D). The mass dynamics are handled by expressing the mass as an initial mass minus the integrated thrust divided by $I_{sp}g_0$. This makes $m(t)$ a linear function of $P(t)$, where $P(t)$ is the integrated thrust.*

6.  **Formulate as a Convex Optimization Problem:**
    The problem becomes:
    **Minimize:** $P(t_f)$ (total integrated thrust, equivalent to minimizing fuel)
    **Subject to:**
    *   $\dot{r}(t) = v(t)$
    *   $\dot{v}(t) = g + u(t)$
    *   $\dot{P}(t) = T(t)$ (where $T(t)$ is the actual thrust magnitude)
    *   $m(t) = m_0 - P(t)/(I_{sp}g_0)$
    *   $T_{min} \le T(t) \le T_{max}$
    *   $m_{dry} \le m(t)$
    *   $r(t) \ge 0$
    *   Initial/Terminal conditions for $r, v, m$.

    The trick is to replace $T(t)$ with $u(t)m(t)$ and then use the inverse mass $\sigma(t) = 1/m(t)$.
    The constraint $T_{min} \le T(t) \le T_{max}$ becomes:
    $$ T_{min} \le u(t)m(t) \le T_{max} $$
    $$ T_{min} \sigma(t) \le u(t) \le T_{max} \sigma(t) $$
    These are linear inequalities if $u(t)$ and $\sigma(t)$ are positive.
    The mass constraint $m_{dry} \le m(t)$ becomes $1/m_{dry} \ge 1/m(t) = \sigma(t)$.
    The final time $t_f$ is also an optimization variable.

    This discretized problem can be formulated as a Linear Program (LP) or a Quadratic Program (QP) in 1D, or more generally as a Second-Order Cone Program (SOCP) if direction is involved. For this 1D case, it can be handled with an LP.

    **Final Answer (Conceptual):** The G-FOLD transformation converts the original problem into a convex optimization problem (e.g., an LP or SOCP) that a numerical solver can efficiently and reliably solve to find the optimal $u(t)$ and $\sigma(t)$ profiles. From these, the actual thrust $T(t) = u(t)/\sigma(t)$ and mass $m(t) = 1/\sigma(t)$ profiles can be reconstructed.

**Reflection:** This example highlights the transformation step. While we didn't solve it numerically by hand (which would require a solver), we showed how the non-linear terms (mass change, thrust limits) are re-expressed using new variables ($\sigma(t)$, $u(t)$) to create linear or convex constraints that can be handled by efficient solvers. The key is that the mass dynamics are not directly linearized but rather integrated and handled through the constraints on $m(t)$ or $\sigma(t)$.

---

### Example 3: 2D Descent (Constant Mass, Variable Thrust Direction, Fixed Final Time)

**Problem:** A rocket is performing a 2D descent from an initial position and velocity to a target landing spot with zero velocity. For this example, assume constant mass (simplification to focus on thrust direction) and a fixed final time $t_f$. We want to find the thrust vector $\mathbf{T}(t)$ that minimizes fuel (which, with constant mass, means minimizing the integral of thrust magnitude).

**Given:**
*   Initial position $\mathbf{r}_0 = [1000 \text{ m}, 5000 \text{ m}]^T$ (x, z)
*   Initial velocity $\mathbf{v}_0 = [10 \text{ m/s}, -100 \text{ m/s}]^T$
*   Final position $\mathbf{r}_f = [0 \text{ m}, 0 \text{ m}]^T$
*   Final velocity $\mathbf{v}_f = [0 \text{ m/s}, 0 \text{ m/s}]^T$
*   Constant mass $m = 1000 \text{ kg}$
*   Gravitational acceleration $\mathbf{g} = [0 \text{ m/s}^2, -9.81 \text{ m/s}^2]^T$
*   Fixed final time $t_f = 60 \text{ s}$
*   Maximum thrust magnitude $T_{max} = 20000 \text{ N}$ (for this example, assume $T_{min}=0$)

**What we want:** The optimal thrust vector $\mathbf{T}(t) = T(t)\mathbf{u}(t)$ such that $T(t) \le T_{max}$ and $\int_{t_0}^{t_f} T(t) dt$ is minimized.

**Solution (Conceptual G-FOLD Transformation):**

1.  **Define Dynamics:**
    $$ \dot{\mathbf{r}}(t) = \mathbf{v}(t) $$
    $$ \dot{\mathbf{v}}(t) = \mathbf{g} + \frac{\mathbf{T}(t)}{m} $$
    Here $\mathbf{T}(t) = T(t)\mathbf{u}(t)$, where $T(t)=|\mathbf{T}(t)|$.
    *Explanation: Standard 2D kinematics, where thrust is now a vector, and gravity acts only in the z-direction.*

2.  **Define Constraints:**
    *   Initial/Terminal Conditions:
        $\mathbf{r}(t_0) = \mathbf{r}_0$, $\mathbf{v}(t_0) = \mathbf{v}_0$
        $\mathbf{r}(t_f) = \mathbf{r}_f$, $\mathbf{v}(t_f) = \mathbf{v}_f$
    *   Thrust Magnitude:
        $|\mathbf{T}(t)| \le T_{max}$
    *   Altitude:
        $\mathbf{r}_z(t) \ge 0$
    *Explanation: These are the mission requirements and physical limits.*

3.  **Objective Function:**
    Minimize total fuel. Since mass is constant here, this is equivalent to minimizing the total impulse:
    $$ \text{Minimize } \int_{t_0}^{t_f} |\mathbf{T}(t)| dt $$
    *Explanation: With constant mass, minimizing the integral of thrust magnitude is a good proxy for fuel efficiency.*

4.  **G-FOLD Transformation (Convexification):**
    This problem is non-convex because of the $|\mathbf{T}(t)|$ term in the objective and the constraint.
    *   **New Control Variable:** Let $\mathbf{f}(t) = \frac{\mathbf{T}(t)}{m}$. This is the thrust acceleration vector.
    *Explanation: This substitution linearizes the velocity dynamics.*

5.  **Rewrite Dynamics in terms of new variables:**
    $$ \dot{\mathbf{r}}(t) = \mathbf{v}(t) $$
    $$ \dot{\mathbf{v}}(t) = \mathbf{g} + \mathbf{f}(t) $$
    These are now linear in $\mathbf{f}(t)$.
    *Explanation: The dynamics are now a simple linear system in terms of $\mathbf{f}(t)$.*

6.  **Rewrite Constraints and Objective:**
    *   **Thrust Magnitude Constraint:** $|\mathbf{T}(t)| \le T_{max}$
        Since $\mathbf{T}(t) = m\mathbf{f}(t)$, this becomes:
        $$ |m\mathbf{f}(t)| \le T_{max} $$
        $$ |\mathbf{f}(t)| \le \frac{T_{max}}{m} $$
        This is a Second-Order Cone (SOC) constraint, which is convex! It defines a sphere (or circle in 2D) centered at the origin, which is a convex set.
    *   **Objective Function:** Minimize $\int_{t_0}^{t_f} |\mathbf{T}(t)| dt = \int_{t_0}^{t_f} |m\mathbf{f}(t)| dt = m \int_{t_0}^{t_f} |\mathbf{f}(t)| dt$.
        Minimizing $\int_{t_0}^{t_f} |\mathbf{f}(t)| dt$ is a convex objective function. It's the $L_1$ norm of the acceleration, which is convex.
    *Explanation: The key here is that the magnitude of a vector is a convex function, and the region defined by its magnitude being less than or equal to a constant (a sphere/circle) is a convex set. This allows the non-convex problem to be transformed into a convex one.*

7.  **Formulate as a Convex Optimization Problem:**
    Discretize time into $N$ steps. Let $\mathbf{f}_k$ be the thrust acceleration at time step $k$.
    **Minimize:** $\sum_{k=0}^{N-1} |\mathbf{f}_k| \Delta t$
    **Subject to:**
    *   $\mathbf{r}_{k+1} = \mathbf{r}_k + \mathbf{v}_k \Delta t$
    *   $\mathbf{v}_{k+1} = \mathbf{v}_k + (\mathbf{g} + \mathbf{f}_k) \Delta t$
    *   Initial/Terminal conditions for $\mathbf{r}, \mathbf{v}$.
    *   $|\mathbf{f}_k| \le T_{max}/m$ for all $k$.
    *   $\mathbf{r}_{z,k} \ge 0$ for all $k$.

    This is a Second-Order Cone Program (SOCP).

    **Final Answer (Conceptual):** The optimal thrust vector $\mathbf{T}(t)$ and its magnitude $T(t)$ can be found by solving the resulting SOCP for $\mathbf{f}(t)$ and then reconstructing $\mathbf{T}(t) = m\mathbf{f}(t)$. This solution is guaranteed to be the global optimum for fuel efficiency under the given constraints.

**Reflection:** This example demonstrates how the non-convexity arising from variable thrust direction (unit vector constraint) and thrust magnitude (in the objective) can be handled by reformulating the problem in terms of thrust acceleration $\mathbf{f}(t)$. The magnitude constraint $|\mathbf{f}(t)| \le \text{constant}$ is a standard convex constraint, and minimizing the integral of $|\mathbf{f}(t)|$ is a convex objective.

---

### Example 4: Full G-FOLD Transformation for 2D Powered Descent (Variable Mass, Variable Thrust Direction)

**Problem:** Combine the challenges of Example 2 and Example 3. A rocket is performing a 2D descent from an initial position, velocity, and mass to a target landing spot with zero velocity. Its mass changes due to fuel consumption, and the engine has min/max thrust limits and variable thrust direction. We want to find the optimal thrust vector $\mathbf{T}(t)$ that minimizes fuel consumption (maximizes final mass).

**Given:**
*   Initial position $\mathbf{r}_0 = [1000 \text{ m}, 5000 \text{ m}]^T$
*   Initial velocity $\mathbf{v}_0 = [10 \text{ m/s}, -100 \text{ m/s}]^T$
*   Initial mass $m_0 = 1000 \text{ kg}$
*   Dry mass $m_{dry} = 500 \text{ kg}$
*   Gravitational acceleration $\mathbf{g} = [0 \text{ m/s}^2, -9.81 \text{ m/s}^2]^T$
*   Engine specific impulse $I_{sp} = 300 \text{ s}$
*   Standard gravity $g_0 = 9.81 \text{ m/s}^2$
*   Minimum thrust $T_{min} = 5000 \text{ N}$
*   Maximum thrust $T_{max} = 15000 \text{ N}$

**What we want:** The optimal thrust vector $\mathbf{T}(t) = T(t)\mathbf{u}(t)$ and final time $t_f$ that maximizes $m(t_f)$.

**Solution (Full G-FOLD Transformation):**

1.  **Define Dynamics:**
    $$ \dot{\mathbf{r}}(t) = \mathbf{v}(t) $$
    $$ \dot{\mathbf{v}}(t) = \mathbf{g} + \frac{T(t)}{m(t)}\mathbf{u}(t) $$
    $$ \dot{m}(t) = -\frac{T(t)}{I_{sp}g_0} $$
    *Explanation: The full non-linear, coupled dynamics.*

2.  **Define Constraints:**
    *   Initial/Terminal Conditions:
        $\mathbf{r}(t_0) = \mathbf{r}_0$, $\mathbf{v}(t_0) = \mathbf{v}_0$, $m(t_0) = m_0$
        $\mathbf{r}(t_f) = \mathbf{r}_f$, $\mathbf{v}(t_f) = \mathbf{v}_f$
    *   Thrust Magnitude: $T_{min} \le T(t) \le T_{max}$
    *   Thrust Direction: $|\mathbf{u}(t)| = 1$
    *   Mass Limits: $m_{dry} \le m(t) \le m_0$
    *   Altitude: $\mathbf{r}_z(t) \ge 0$
    *Explanation: All physical and mission constraints.*

3.  **Objective Function:**
    Maximize $m(t_f)$ (final mass). This is equivalent to minimizing $m_0 - m(t_f)$, which is the total fuel consumed.
    *Explanation: Fuel minimization is key for reusability and mission payload.*

4.  **G-FOLD Transformation (Convexification):**
    This is where G-FOLD shines by making the problem solvable.
    *   **New Control Variable:** $\mathbf{f}(t) = \frac{T(t)}{m(t)}\mathbf{u}(t)$ (thrust acceleration vector).
    *   **New State Variable:** $\sigma(t) = \frac{1}{m(t)}$ (inverse mass).
    *Explanation: These are the standard G-FOLD substitutions to linearize the velocity dynamics and manage the non-linear mass term.*

5.  **Rewrite Dynamics in terms of new variables:**
    $$ \dot{\mathbf{r}}(t) = \mathbf{v}(t) $$
    $$ \dot{\mathbf{v}}(t) = \mathbf{g} + \mathbf{f}(t) $$
    These are now linear in $\mathbf{f}(t)$.
    The mass dynamics $\dot{m}(t) = -\frac{T(t)}{I_{sp}g_0}$ is handled by integrating it to express $m(t)$ as:
    $$ m(t) = m_0 - \frac{1}{I_{sp}g_0} \int_{t_0}^t T(\tau) d\tau $$
    And since $\sigma(t) = 1/m(t)$, we have:
    $$ \frac{1}{\sigma(t)} = m_0 - \frac{1}{I_{sp}g_0} \int_{t_0}^t \frac{|\mathbf{f}(\tau)|}{\sigma(\tau)} d\tau $$
    This integral is still non-linear. G-FOLD handles this by introducing an auxiliary variable $\alpha(t)$ for the integrated thrust, and then using a careful discretization and convex relaxation technique that is proven to be lossless.