## 1. What it is — in plain English

Imagine you're watching a car drive down a perfectly straight road. When the driver steps on the gas, the car's speed changes. When they hit the brakes, its speed changes again. And as it moves, it covers some distance.

"Equations of motion," often called "SUVAT equations" (pronounced SOO-vat), are just a set of five special formulas that help us describe and predict how things move when they're speeding up or slowing down at a steady rate. Think of them as a toolkit for understanding motion in a straight line.

These equations connect five key pieces of information: the distance an object travels, its starting speed, its ending speed, how quickly its speed changes (that's acceleration), and the time it takes for all this to happen. If you know any three of these, you can use these equations to find the other two.

The "calculus" part means we're going to build these useful formulas from the ground up, using the fundamental ideas of how speed relates to distance, and how acceleration relates to speed. It's like understanding the basic LEGO bricks before you build a complex model.

## 2. Why it matters — real-world applications

These equations are fundamental to almost every field of engineering and physics, especially when dealing with motion. They are the bedrock upon which more complex analyses are built.

1.  **Rocket Launch Trajectories (Aerospace Engineering):** When SpaceX launches a Falcon 9 rocket, engineers use these principles to calculate how much fuel is needed, what thrust profile to use, and how long to fire the engines to achieve a specific orbital velocity and altitude. The initial climb phase, where the acceleration is relatively constant (or can be approximated as such in segments), heavily relies on these equations to predict the rocket's speed and position.
2.  **Self-Driving Car Algorithms (Machine Learning/Robotics):** Autonomous vehicles constantly predict the motion of other cars, pedestrians, and obstacles. SUVAT equations (or their more complex cousins) are used to estimate braking distances, collision avoidance trajectories, and safe following distances. For instance, if a car ahead suddenly brakes, the self-driving system uses its current speed, the estimated deceleration rate, and the time available to determine if it can stop safely.
3.  **Sports Science and Biomechanics:** Analyzing the performance of athletes often involves kinematics. For a sprinter, coaches can use these equations to break down their run into phases of acceleration and constant velocity, optimizing their start or mid-race technique. Similarly, in sports like long jump or shot put, understanding the projectile's initial velocity and the effect of gravity (constant acceleration) is crucial for maximizing distance.
4.  **Forensic Accident Reconstruction:** After a car accident, investigators use skid marks, vehicle damage, and eyewitness accounts to determine the initial speeds, braking distances, and acceleration/deceleration rates of the vehicles involved. This helps piece together the sequence of events and assign fault, often relying directly on the SUVAT equations to work backward from the evidence.
5.  **Astronomy and Orbital Mechanics (Simplified):** While orbital mechanics is more complex, the core idea of how gravity causes constant acceleration (near Earth's surface, or approximating small segments of orbits) is rooted in these equations. For example, calculating the impact speed of a meteor falling through the atmosphere (ignoring air resistance for a first pass) or the speed of a satellite during a short, controlled burn.

## 3. Prerequisites — what you must know first

To fully grasp the derivations and applications of the equations of motion, you should be comfortable with the following concepts:

*   **Basic Algebra:** Manipulating equations, solving for unknowns, and understanding variables.
*   **Functions:** The concept of a function, like $f(x)$, where one quantity depends on another.
*   **Derivatives (Calculus):**
    *   **Definition of a derivative:** Understanding that a derivative represents the instantaneous rate of change of a function. For example, if $s(t)$ is position, $s'(t)$ or $\frac{ds}{dt}$ is velocity.
    *   **Power rule for differentiation:** How to differentiate terms like $x^n$ (e.g., $\frac{d}{dx}(ax^n) = nax^{n-1}$).
*   **Integrals (Calculus):**
    *   **Definition of an indefinite integral:** Understanding that integration is the reverse process of differentiation, finding the antiderivative.
    *   **Power rule for integration:** How to integrate terms like $x^n$ (e.g., $\int ax^n dx = \frac{a}{n+1}x^{n+1} + C$).
    *   **Constant of integration:** The importance of the "$+C$" when performing indefinite integration and how to determine its value using initial conditions.
*   **Fundamental Physics Definitions:**
    *   **Displacement ($s$):** The change in position of an object, including direction. Not just distance traveled.
    *   **Velocity ($v$):** The rate of change of displacement, including direction.
    *   **Acceleration ($a$):** The rate of change of velocity, including direction.
    *   **Constant Acceleration:** The crucial assumption that the rate of change of velocity does not change over the time period being considered.

## 4. The core idea — step by step

The core idea is to start with the fundamental definitions of acceleration and velocity as derivatives, and then use integration to "undo" those derivatives and find expressions for velocity and displacement over time. The crucial assumption throughout is **constant acceleration**.

We will derive the five standard SUVAT equations, where:
*   $s$ = displacement (the change in position)
*   $u$ = initial velocity (velocity at time $t=0$)
*   $v$ = final velocity (velocity at time $t$)
*   $a$ = constant acceleration
*   $t$ = time interval

### Step 1: Defining Acceleration and its Relationship to Velocity

*   **Plain-English Statement:** Acceleration is simply how quickly an object's velocity is changing. If your car's speed is increasing rapidly, you have high acceleration. If it's increasing slowly, you have low acceleration.
*   **Concrete Example:** If a car goes from $0 \text{ m/s}$ to $10 \text{ m/s}$ in $2 \text{ seconds}$, its average acceleration is $5 \text{ m/s}^2$. If it goes from $10 \text{ m/s}$ to $20 \text{ m/s}$ in $1 \text{ second}$, its average acceleration is $10 \text{ m/s}^2$.
*   **Formal/Mathematical Version:** In calculus, the instantaneous acceleration $a$ is defined as the derivative of velocity $v$ with respect to time $t$.
    $$a = \frac{dv}{dt}$$
    We are assuming $a$ is a constant value.
*   **What could go wrong:** If acceleration isn't constant, this simple relationship holds true only for an instant. The SUVAT equations derived from this assumption *will not work* for non-constant acceleration.

### Step 2: Deriving the First Equation (Velocity as a function of time)

*   **Plain-English Statement:** If we know how an object is accelerating, and we know its starting speed, we can figure out its speed at any later time. We just "add up" all the small changes in velocity caused by the acceleration over time.
*   **Concrete Example:** If a ball starts at $5 \text{ m/s}$ and accelerates at $2 \text{ m/s}^2$, after $1 \text{ second}$ its speed will be $7 \text{ m/s}$, after $2 \text{ seconds}$ it will be $9 \text{ m/s}$, and so on.
*   **Formal/Mathematical Version:**
    We start with the definition from Step 1:
    $$a = \frac{dv}{dt}$$
    Rearrange this to isolate $dv$:
    $$dv = a \, dt$$
    Now, integrate both sides. We're integrating from an initial time $t=0$ (where velocity is $u$) to a final time $t$ (where velocity is $v$).
    $$\int_u^v dv = \int_0^t a \, dt$$
    Since $a$ is constant, we can pull it out of the integral on the right side:
    $$\int_u^v dv = a \int_0^t dt$$
    Perform the integration:
    $$[v]_u^v = a[t]_0^t$$
    Evaluate the definite integrals:
    $$v - u = a(t - 0)$$
    $$v - u = at$$
    Rearrange to get the first SUVAT equation:
    $$\boxed{v = u + at}$$
*   **What could go wrong:** Forgetting to include the initial velocity ($u$) as the constant of integration (or the lower limit of the integral). If you just integrated $dv = a dt$ as $\int dv = \int a dt \implies v = at + C$, you'd need to explicitly state that at $t=0$, $v=u$, so $C=u$.

### Step 3: Defining Velocity and its Relationship to Displacement

*   **Plain-English Statement:** Velocity is how quickly an object's position (or displacement) is changing. If you're moving fast, your position changes a lot in a short time.
*   **Concrete Example:** If you walk at a steady $1 \text{ m/s}$, after $1 \text{ second}$ you've covered $1 \text{ meter}$, after $2 \text{ seconds}$ you've covered $2 \text{ meters}$, etc.
*   **Formal/Mathematical Version:** The instantaneous velocity $v$ is defined as the derivative of displacement $s$ with respect to time $t$.
    $$v = \frac{ds}{dt}$$
*   **What could go wrong:** Confusing displacement with total distance traveled. Displacement is a vector (has direction), total distance is a scalar. SUVAT equations deal with displacement.

### Step 4: Deriving the Second Equation (Displacement as a function of time)

*   **Plain-English Statement:** We can find the total distance an object covers if we know its starting speed, how long it travels, and how much it accelerates. It's like calculating how far a car goes if you know its initial speed, how hard it presses the gas, and for how long.
*   **Concrete Example:** A car starting at rest ($u=0$) and accelerating at $2 \text{ m/s}^2$ for $3 \text{ seconds}$ will cover a certain distance. It speeds up, so it covers more distance in the later seconds than the earlier ones.
*   **Formal/Mathematical Version:**
    We start with the definition from Step 3:
    $$v = \frac{ds}{dt}$$
    We also know from Step 2 that $v = u + at$. Substitute this expression for $v$ into the equation above:
    $$\frac{ds}{dt} = u + at$$
    Rearrange to isolate $ds$:
    $$ds = (u + at) \, dt$$
    Now, integrate both sides. We're integrating from an initial time $t=0$ (where displacement is $s_0$, which we usually set to 0 for simplicity, meaning we measure displacement *from* the starting point) to a final time $t$ (where displacement is $s$).
    $$\int_{s_0}^s ds = \int_0^t (u + at) \, dt$$
    If we set $s_0 = 0$:
    $$\int_0^s ds = \int_0^t u \, dt + \int_0^t at \, dt$$
    Perform the integration:
    $$[s]_0^s = u[t]_0^t + a\left[\frac{t^2}{2}\right]_0^t$$
    Evaluate the definite integrals:
    $$s - 0 = u(t - 0) + a\left(\frac{t^2}{2} - \frac{0^2}{2}\right)$$
    $$s = ut + \frac{1}{2}at^2$$
    This is the second SUVAT equation:
    $$\boxed{s = ut + \frac{1}{2}at^2}$$
*   **What could go wrong:** Forgetting to integrate the constant $u$ with respect to $t$ (which becomes $ut$) or making an error in the power rule for $at$ (which becomes $\frac{1}{2}at^2$). Also, if $s_0$ is not zero, the equation would be $s - s_0 = ut + \frac{1}{2}at^2$.

### Step 5: Deriving the Third Equation (Displacement without final velocity)

*   **Plain-English Statement:** This equation combines the previous two to find displacement without needing to know the final speed. Sometimes you just know the start speed, how fast it's changing, and for how long.
*   **Concrete Example:** A train accelerates from $10 \text{ m/s}$ at $0.5 \text{ m/s}^2$ for $60 \text{ seconds}$. We can find the distance it travels without first calculating its speed after $60 \text{ seconds}$.
*   **Formal/Mathematical Version:** This equation is the same as the second one, $s = ut + \frac{1}{2}at^2$. It's often listed separately in textbooks to highlight its specific use case (when $v$ is unknown). We've already derived it.

### Step 6: Deriving the Fourth Equation (Displacement without acceleration)

*   **Plain-English Statement:** If you know the starting speed, ending speed, and the time taken, you can find the distance covered, even if you don't know the acceleration. It's like taking the average speed and multiplying by time.
*   **Concrete Example:** A car starts at $10 \text{ m/s}$ and ends at $20 \text{ m/s}$ after $5 \text{ seconds}$. What distance did it cover? The average speed is $\frac{10+20}{2} = 15 \text{ m/s}$, so distance is $15 \text{ m/s} \times 5 \text{ s} = 75 \text{ m}$.
*   **Formal/Mathematical Version:**
    We start with the second equation:
    $$s = ut + \frac{1}{2}at^2$$
    From the first equation, $v = u + at$, we can solve for $a$:
    $$a = \frac{v - u}{t}$$
    Substitute this expression for $a$ into the second equation:
    $$s = ut + \frac{1}{2}\left(\frac{v - u}{t}\right)t^2$$
    Simplify the $t^2$ term:
    $$s = ut + \frac{1}{2}(v - u)t$$
    Distribute the $\frac{1}{2}t$:
    $$s = ut + \frac{1}{2}vt - \frac{1}{2}ut$$
    Combine the $ut$ terms:
    $$s = \frac{1}{2}ut + \frac{1}{2}vt$$
    Factor out $\frac{1}{2}t$:
    $$s = \frac{1}{2}(u + v)t$$
    This is the fourth SUVAT equation:
    $$\boxed{s = \frac{1}{2}(u + v)t}$$
*   **What could go wrong:** Algebraic errors when substituting and simplifying. This derivation relies on the first two equations being correct.

### Step 7: Deriving the Fifth Equation (Velocity without time)

*   **Plain-English Statement:** If you know the starting speed, how far something traveled, and its acceleration, you can figure out its final speed without knowing how long it took. This is very useful when time isn't measured or relevant.
*   **Concrete Example:** A ball is dropped from a height. We know its initial speed ($0 \text{ m/s}$), the distance it falls, and the acceleration due to gravity. We can find its speed just before it hits the ground without knowing the fall time.
*   **Formal/Mathematical Version:**
    We start with the first equation:
    $$v = u + at$$
    Square both sides:
    $$v^2 = (u + at)^2$$
    $$v^2 = u^2 + 2uat + (at)^2$$
    $$v^2 = u^2 + 2uat + a^2t^2$$
    Now, let's try to relate this to the second equation, $s = ut + \frac{1}{2}at^2$.
    Notice the $2uat$ and $a^2t^2$ terms. We can factor out $2a$ from the last two terms:
    $$v^2 = u^2 + 2a\left(ut + \frac{1}{2}at^2\right)$$
    The expression in the parenthesis is exactly our second equation for $s$:
    $$s = ut + \frac{1}{2}at^2$$
    Substitute $s$ into the equation for $v^2$:
    $$\boxed{v^2 = u^2 + 2as}$$
    This is the fifth SUVAT equation.
*   **What could go wrong:** Algebraic mistakes when squaring or factoring. A common error is assuming $(u+at)^2 = u^2 + (at)^2$. Also, confusing $2as$ with $2a^2s$ or $2as^2$.

To summarize, the five SUVAT equations are:
1.  $v = u + at$
2.  $s = ut + \frac{1}{2}at^2$
3.  $s = vt - \frac{1}{2}at^2$ (Derived similarly to 2, but starting from $u = v - at$)
4.  $s = \frac{1}{2}(u + v)t$
5.  $v^2 = u^2 + 2as$

Note: Equation 3 is often not listed as a "primary" SUVAT equation but can be derived from $s = vt - \frac{1}{2}at^2$ by substituting $u = v - at$ into $s = ut + \frac{1}{2}at^2$.

## 5. Worked examples — multiple, with every step shown

Here are several worked examples demonstrating the application of SUVAT equations, with detailed steps and explanations.

### Example 1: Basic Acceleration of a Car

**Problem:** A car starts from rest and accelerates uniformly at $3.0 \text{ m/s}^2$ for $5.0 \text{ seconds}$.
a) What is its final velocity?
b) What distance does it cover during this time?

**Identify what's given and what we want:**
Given:
*   Initial velocity, $u = 0 \text{ m/s}$ (starts from rest)
*   Acceleration, $a = 3.0 \text{ m/s}^2$
*   Time, $t = 5.0 \text{ s}$
Want:
*   Final velocity, $v$
*   Displacement, $s$

**Solution:**

**Part a) Find the final velocity ($v$):**

1.  **Choose the appropriate equation:** We have $u$, $a$, and $t$, and we want $v$. The equation $v = u + at$ is perfect for this.
    $$v = u + at$$
2.  **Substitute the known values into the equation:**
    $$v = (0 \text{ m/s}) + (3.0 \text{ m/s}^2)(5.0 \text{ s})$$
    *Here, we're plugging in the numbers for initial velocity, acceleration, and time.*
3.  **Perform the multiplication:**
    $$v = 0 \text{ m/s} + 15.0 \text{ m/s}$$
    *The units $\text{m/s}^2 \times \text{s}$ simplify to $\text{m/s}$, which is correct for velocity.*
4.  **Perform the addition:**
    $$v = 15.0 \text{ m/s}$$
    *This is the final velocity after 5 seconds.*

    **Final Answer (a):** $\boxed{\text{15.0 m/s}}$

**Part b) Find the displacement ($s$):**

1.  **Choose the appropriate equation:** We have $u$, $a$, and $t$, and we want $s$. The equation $s = ut + \frac{1}{2}at^2$ is suitable.
    $$s = ut + \frac{1}{2}at^2$$
2.  **Substitute the known values into the equation:**
    $$s = (0 \text{ m/s})(5.0 \text{ s}) + \frac{1}{2}(3.0 \text{ m/s}^2)(5.0 \text{ s})^2$$
    *We're substituting $u$, $t$, and $a$ into the displacement formula.*
3.  **Calculate the terms separately:**
    *   First term: $(0 \text{ m/s})(5.0 \text{ s}) = 0 \text{ m}$
        *Since the initial velocity is zero, the first part of the displacement is zero.*
    *   Second term: $\frac{1}{2}(3.0 \text{ m/s}^2)(25.0 \text{ s}^2)$
        *First, square the time: $(5.0 \text{ s})^2 = 25.0 \text{ s}^2$. Then multiply the numbers.*
        $$ = \frac{1}{2}(75.0 \text{ m})$$
        $$ = 37.5 \text{ m}$$
        *The units $\text{m/s}^2 \times \text{s}^2$ simplify to $\text{m}$, which is correct for displacement.*
4.  **Add the terms:**
    $$s = 0 \text{ m} + 37.5 \text{ m}$$
    $$s = 37.5 \text{ m}$$
    *This is the total distance covered.*

    **Final Answer (b):** $\boxed{\text{37.5 m}}$

**Reflection:** This example was straightforward because the car started from rest ($u=0$), simplifying the calculations. It directly applied two of the most common SUVAT equations.

### Example 2: Object Thrown Upwards (Gravity)

**Problem:** A ball is thrown vertically upwards with an initial velocity of $20 \text{ m/s}$. Assuming air resistance is negligible and acceleration due to gravity is $9.8 \text{ m/s}^2$ downwards.
a) How long does it take for the ball to reach its maximum height?
b) What is the maximum height achieved by the ball?

**Identify what's given and what we want:**
Given:
*   Initial velocity, $u = +20 \text{ m/s}$ (we define upwards as positive)
*   Acceleration, $a = -9.8 \text{ m/s}^2$ (gravity acts downwards, opposite to initial motion)
*   At maximum height, the final velocity, $v = 0 \text{ m/s}$ (momentarily stops before falling)
Want:
*   Time to max height, $t$
*   Displacement (max height), $s$

**Solution:**

**Part a) Find the time to reach maximum height ($t$):**

1.  **Choose the appropriate equation:** We have $u$, $v$, and $a$, and we want $t$. The equation $v = u + at$ is suitable.
    $$v = u + at$$
2.  **Substitute the known values into the equation:**
    $$0 \text{ m/s} = (20 \text{ m/s}) + (-9.8 \text{ m/s}^2)t$$
    *We're plugging in $v=0$ (at max height), $u=20$, and $a=-9.8$. Note the negative sign for acceleration due to gravity.*
3.  **Isolate the term with $t$:**
    $$-20 \text{ m/s} = (-9.8 \text{ m/s}^2)t$$
    *Subtract $20 \text{ m/s}$ from both sides.*
4.  **Solve for $t$:**
    $$t = \frac{-20 \text{ m/s}}{-9.8 \text{ m/s}^2}$$
    *Divide both sides by $-9.8 \text{ m/s}^2$. The negative signs cancel out, and the units $\text{m/s} / (\text{m/s}^2)$ simplify to $\text{s}$.*
    $$t \approx 2.04 \text{ s}$$

    **Final Answer (a):** $\boxed{\text{2.04 s}}$

**Part b) Find the maximum height ($s$):**

1.  **Choose the appropriate equation:** We have $u$, $v$, and $a$, and we want $s$. The equation $v^2 = u^2 + 2as$ is ideal as it doesn't require time $t$ (though we just calculated it).
    $$v^2 = u^2 + 2as$$
2.  **Substitute the known values into the equation:**
    $$(0 \text{ m/s})^2 = (20 \text{ m/s})^2 + 2(-9.8 \text{ m/s}^2)s$$
    *Plug in $v=0$, $u=20$, and $a=-9.8$.*
3.  **Calculate the squared terms:**
    $$0 = 400 \text{ m}^2/\text{s}^2 + 2(-9.8 \text{ m/s}^2)s$$
    *$(20)^2 = 400$.*
4.  **Simplify the acceleration term:**
    $$0 = 400 \text{ m}^2/\text{s}^2 - 19.6 \text{ m/s}^2 s$$
    *Multiply $2 \times -9.8 = -19.6$.*
5.  **Isolate the term with $s$:**
    $$19.6 \text{ m/s}^2 s = 400 \text{ m}^2/\text{s}^2$$
    *Add $19.6s$ to both sides to make it positive.*
6.  **Solve for $s$:**
    $$s = \frac{400 \text{ m}^2/\text{s}^2}{19.6 \text{ m/s}^2}$$
    *Divide both sides by $19.6 \text{ m/s}^2$. The units $\text{m}^2/\text{s}^2 / (\text{m/s}^2)$ simplify to $\text{m}$.*
    $$s \approx 20.41 \text{ m}$$

    **Final Answer (b):** $\boxed{\text{20.41 m}}$

**Reflection:** This example highlights the importance of consistent sign conventions (up as positive, down as negative) and recognizing specific conditions (like $v=0$ at maximum height). Using $v^2 = u^2 + 2as$ was efficient for part b, avoiding the need to use the calculated time from part a, thus reducing potential for error propagation.

### Example 3: Braking Distance

**Problem:** A car is traveling at $30 \text{ m/s}$ when the driver sees an obstacle and applies the brakes, causing a constant deceleration of $6.0 \text{ m/s}^2$.
a) What distance does the car travel before coming to a complete stop?
b) How long does it take for the car to stop?

**Identify what's given and what we want:**
Given:
*   Initial velocity, $u = 30 \text{ m/s}$
*   Final velocity, $v = 0 \text{ m/s}$ (comes to a complete stop)
*   Acceleration, $a = -6.0 \text{ m/s}^2$ (deceleration means acceleration is opposite to initial velocity, so negative)
Want:
*   Displacement, $s$
*   Time, $t$

**Solution:**

**Part a) Find the braking distance ($s$):**

1.  **Choose the appropriate equation:** We have $u$, $v$, and $a$, and we want $s$. The equation $v^2 = u^2 + 2as$ is perfect as it doesn't involve time.
    $$v^2 = u^2 + 2as$$
2.  **Substitute the known values into the equation:**
    $$(0 \text{ m/s})^2 = (30 \text{ m/s})^2 + 2(-6.0 \text{ m/s}^2)s$$
    *Plug in $v=0$, $u=30$, and $a=-6.0$.*
3.  **Calculate the squared terms:**
    $$0 = 900 \text{ m}^2/\text{s}^2 + 2(-6.0 \text{ m/s}^2)s$$
    *$(30)^2 = 900$.*
4.  **Simplify the acceleration term:**
    $$0 = 900 \text{ m}^2/\text{s}^2 - 12.0 \text{ m/s}^2 s$$
    *Multiply $2 \times -6.0 = -12.0$.*
5.  **Isolate the term with $s$:**
    $$12.0 \text{ m/s}^2 s = 900 \text{ m}^2/\text{s}^2$$
    *Add $12.0s$ to both sides.*
6.  **Solve for $s$:**
    $$s = \frac{900 \text{ m}^2/\text{s}^2}{12.0 \text{ m/s}^2}$$
    *Divide both sides by $12.0 \text{ m/s}^2$.*
    $$s = 75 \text{ m}$$

    **Final Answer (a):** $\boxed{\text{75 m}}$

**Part b) Find the time to stop ($t$):**

1.  **Choose the appropriate equation:** We have $u$, $v$, and $a$, and we want $t$. The equation $v = u + at$ is ideal.
    $$v = u + at$$
2.  **Substitute the known values into the equation:**
    $$0 \text{ m/s} = (30 \text{ m/s}) + (-6.0 \text{ m/s}^2)t$$
    *Plug in $v=0$, $u=30$, and $a=-6.0$.*
3.  **Isolate the term with $t$:**
    $$-30 \text{ m/s} = (-6.0 \text{ m/s}^2)t$$
    *Subtract $30 \text{ m/s}$ from both sides.*
4.  **Solve for $t$:**
    $$t = \frac{-30 \text{ m/s}}{-6.0 \text{ m/s}^2}$$
    *Divide both sides by $-6.0 \text{ m/s}^2$.*
    $$t = 5.0 \text{ s}$$

    **Final Answer (b):** $\boxed{\text{5.0 s}}$

**Reflection:** This example demonstrates how deceleration is handled by using a negative acceleration value. It also shows how to choose the most efficient equation based on the knowns and unknowns, sometimes avoiding a variable that was just calculated.

### Example 4: Two-Stage Motion (Slightly harder)

**Problem:** A rocket accelerates vertically upwards from rest at $10 \text{ m/s}^2$ for $10 \text{ seconds}$. After $10 \text{ seconds}$, its engines cut out, and it continues to move under gravity alone (acceleration due to gravity = $9.8 \text{ m/s}^2$ downwards).
a) What is the rocket's velocity when its engines cut out?
b) What is the maximum height the rocket reaches above its launch pad?

**Identify what's given and what we want:**
This problem involves two distinct stages of motion. We need to analyze each stage separately and use the end conditions of the first stage as the initial conditions for the second.

**Stage 1: Engines Firing (Constant upward acceleration)**
Given:
*   Initial velocity, $u_1 = 0 \text{ m/s}$ (starts from rest)
*   Acceleration, $a_1 = +10 \text{ m/s}^2$ (upwards is positive)
*   Time, $t_1 = 10 \text{ s}$
Want:
*   Final velocity of Stage 1 ($v_1$), which will be the initial velocity of Stage 2 ($u_2$)
*   Displacement of Stage 1 ($s_1$)

**Stage 2: Engines Cut Out (Gravity only)**
Given:
*   Initial velocity, $u_2 = v_1$ (from Stage 1)
*   Acceleration, $a_2 = -9.8 \text{ m/s}^2$ (gravity acts downwards)
*   At maximum height, final velocity, $v_2 = 0 \text{ m/s}$
Want:
*   Displacement of Stage 2 ($s_2$)
*   Total maximum height ($s_{total} = s_1 + s_2$)

**Solution:**

**Part a) Rocket's velocity when engines cut out ($v_1$):**

1.  **Choose the appropriate equation for Stage 1:** We have $u_1$, $a_1$, and $t_1$, and we want $v_1$. Use $v = u + at$.
    $$v_1 = u_1 + a_1 t_1$$
2.  **Substitute and calculate:**
    $$v_1 = (0 \text{ m/s}) + (10 \text{ m/s}^2)(10 \text{ s})$$
    $$v_1 = 100 \text{ m/s}$$
    *This is the velocity of the rocket when its engines stop firing. This will be $u_2$ for the next stage.*

    **Final Answer (a):** $\boxed{\text{100 m/s}}$

**Part b) Maximum height reached ($s_{total}$):**

First, calculate the displacement during Stage 1 ($s_1$):

1.  **Choose the appropriate equation for Stage 1:** We have $u_1$, $a_1$, and $t_1$, and we want $s_1$. Use $s = ut + \frac{1}{2}at^2$.
    $$s_1 = u_1 t_1 + \frac{1}{2}a_1 t_1^2$$
2.  **Substitute and calculate:**
    $$s_1 = (0 \text{ m/s})(10 \text{ s}) + \frac{1}{2}(10 \text{ m/s}^2)(10 \text{ s})^2$$
    $$s_1 = 0 + \frac{1}{2}(10 \text{ m/s}^2)(100 \text{ s}^2)$$
    $$s_1 = 500 \text{ m}$$
    *This is the height the rocket reaches while its engines are firing.*

Next, calculate the displacement during Stage 2 ($s_2$):

1.  **Define initial conditions for Stage 2:** $u_2 = v_1 = 100 \text{ m/s}$ (from part a), $a_2 = -9.8 \text{ m/s}^2$, and $v_2 = 0 \text{ m/s}$ (at max height).
2.  **Choose the appropriate equation for Stage 2:** We have $u_2$, $v_2$, and $a_2$, and we want $s_2$. Use $v^2 = u^2 + 2as$.
    $$v_2^2 = u_2^2 + 2a_2 s_2$$
3.  **Substitute and calculate:**
    $$(0 \text{ m/s})^2 = (100 \text{ m/s})^2 + 2(-9.8 \text{ m/s}^2)s_2$$
    $$0 = 10000 \text{ m}^2/\text{s}^2 - 19.6 \text{ m/s}^2 s_2$$
4.  **Isolate $s_2$:**
    $$19.6 \text{ m/s}^2 s_2 = 10000 \text{ m}^2/\text{s}^2$$
5.  **Solve for $s_2$:**
    $$s_2 = \frac{10000 \text{ m}^2/\text{s}^2}{19.6 \text{ m/s}^2}$$
    $$s_2 \approx 510.20 \text{ m}$$
    *This is the additional height the rocket gains after its engines cut out.*

Finally, calculate the total maximum height ($s_{total}$):

1.  **Add the displacements from both stages:**
    $$s_{total} = s_1 + s_2$$
    $$s_{total} = 500 \text{ m} + 510.20 \text{ m}$$
    $$s_{total} = 1010.20 \text{ m}$$

    **Final Answer (b):** $\boxed{\text{1010.20 m}}$

**Reflection:** This example demonstrates how to break down a complex problem into simpler stages. The key is to correctly identify the final conditions of one stage as the initial conditions for the next. Careful attention to positive and negative signs for acceleration and displacement is also crucial.

## 6. Common mistakes and traps

Students often encounter specific pitfalls when working with SUVAT equations. Being aware of these can save a lot of frustration.

1.  **Inconsistent Sign Conventions:** This is perhaps the most common error. If you define "up" as positive, then all upward velocities and displacements are positive, and downward accelerations (like gravity) or velocities must be negative. Stick to one convention throughout the entire problem.
2.  **Assuming Constant Acceleration:** The SUVAT equations are *only* valid for situations where acceleration is constant. If acceleration changes (e.g., a car accelerating then braking, or a rocket with variable thrust), you must break the problem into segments where acceleration *is* constant, or use more advanced calculus techniques.
3.  **Mixing Units:** Ensure all quantities are in consistent units (e.g., meters for displacement, seconds for time, meters per second for velocity, meters per second squared for acceleration). Convert everything to a standard system (like SI units) before plugging into equations.
4.  **Forgetting Initial Conditions (Constants of Integration):** When integrating to derive the equations, the constants of integration (like $u$ for initial velocity or $s_0$ for initial displacement) are crucial. In problem-solving, this translates to correctly identifying $u$ (initial velocity) and often setting initial displacement $s_0=0$ at the starting point of the motion.
5.  **Confusing Displacement with Distance:** Displacement ($s$) is a vector quantity representing the net change in position from start to end. Distance is a scalar representing the total path length traveled. For example, if a ball is thrown up and returns to its starting point, its final displacement is zero, but the distance traveled is twice its maximum height. SUVAT equations calculate displacement.
6.  **Choosing the Wrong Equation:** Each SUVAT equation omits one of the five variables ($s, u, v, a, t$). Select the equation that does *not* include the variable you neither know nor need to find. Forgetting this can lead to unnecessary steps or getting stuck.

## 7. Textbook-precise explanation

In a rigorous university physics or calculus textbook (e.g., *Physics for Scientists and Engineers* by Serway & Jewett, or *Calculus* by Stewart), the derivation of the equations of motion for constant acceleration is presented as follows:

Consider a particle moving along a straight line. Let its position at time $t$ be $s(t)$, its velocity be $v(t)$, and its acceleration be $a(t)$.

By definition, velocity is the time derivative of position:
$$v(t) = \frac{ds}{dt}$$
And acceleration is the time derivative of velocity:
$$a(t) = \frac{dv}{dt}$$

**Assumption:** We assume that the acceleration is constant, i.e., $a(t) = a$, where $a$ is a constant value.

**Derivation of $v = u + at$:**
Starting with the definition of acceleration:
$$a = \frac{dv}{dt}$$
Rearranging and integrating both sides with respect to time, from an initial time $t=0$ (where velocity is $u$) to a final time $t$ (where velocity is $v$):
$$\int_{u}^{v} dv = \int_{0}^{t} a \, dt$$
Since $a$ is constant, it can be taken out of the integral:
$$\int_{u}^{v} dv = a \int_{0}^{t} dt$$
Performing the integration:
$$[v]_{u}^{v} = a[t]_{0}^{t}$$
Evaluating the definite integrals:
$$v - u = a(t - 0)$$
$$v = u + at \quad \text{(Equation 1)}$$

**Derivation of $s = ut + \frac{1}{2}at^2$:**
Starting with the definition of velocity:
$$v = \frac{ds}{dt}$$
Substitute Equation 1 for $v$:
$$\frac{ds}{dt} = u + at$$
Rearranging and integrating both sides with respect to time, from an initial time $t=0$ (where displacement is $s_0$, typically set to 0 for simplicity, meaning we measure displacement from the origin) to a final time $t$ (where displacement is $s$):
$$\int_{s_0}^{s} ds = \int_{0}^{t} (u + at) \, dt$$
If we set $s_0=0$:
$$\int_{0}^{s} ds = \int_{0}^{t} u \, dt + \int_{0}^{t} at \, dt$$
Performing the integration:
$$[s]_{0}^{s} = u[t]_{0}^{t} + a\left[\frac{t^2}{2}\right]_{0}^{t}$$
Evaluating the definite integrals:
$$s - 0 = u(t - 0) + a\left(\frac{t^2}{2} - \frac{0^2}{2}\right)$$
$$s = ut + \frac{1}{2}at^2 \quad \text{(Equation 2)}$$

**Derivation of $s = \frac{1}{2}(u + v)t$:**
From Equation 1, we can express $t$:
$$t = \frac{v - u}{a}$$
Substitute this expression for $t$ into Equation 2:
$$s = u\left(\frac{v - u}{a}\right) + \frac{1}{2}a\left(\frac{v - u}{a}\right)^2$$
$$s = \frac{uv - u^2}{a} + \frac{1}{2}a\frac{(v - u)^2}{a^2}$$
$$s = \frac{uv - u^2}{a} + \frac{(v - u)^2}{2a}$$
$$s = \frac{2(uv - u^2) + (v - u)^2}{2a}$$
$$s = \frac{2uv - 2u^2 + v^2 - 2uv + u^2}{2a}$$
$$s = \frac{v^2 - u^2}{2a}$$
Rearranging gives:
$$2as = v^2 - u^2$$
$$v^2 = u^2 + 2as \quad \text{(Equation 5)}$$
*Self-correction: I derived the $v^2$ equation here. Let's re-derive $s = \frac{1}{2}(u+v)t$ more directly as done in the step-by-step section, which is more common.*

Let's re-derive $s = \frac{1}{2}(u + v)t$ from the previous equations.
We have Equation 1: $v = u + at \implies at = v - u$.
We have Equation 2: $s = ut + \frac{1}{2}at^2$.
Substitute $at = v - u$ into Equation 2, but first factor out $t$ from Equation 2:
$$s = t\left(u + \frac{1}{2}at\right)$$
Now, we know $at = v - u$, so $\frac{1}{2}at = \frac{1}{2}(v - u)$.
Substitute this into the factored Equation 2:
$$s = t\left(u + \frac{1}{2}(v - u)\right)$$
$$s = t\left(\frac{2u}{2} + \frac{v - u}{2}\right)$$
$$s = t\left(\frac{2u + v - u}{2}\right)$$
$$s = t\left(\frac{u + v}{2}\right)$$
$$s = \frac{1}{2}(u + v)t \quad \text{(Equation 4)}$$

**Derivation of $v^2 = u^2 + 2as$:**
From Equation 1, solve for $t$:
$$t = \frac{v - u}{a}$$
Substitute this expression for $t$ into Equation 4:
$$s = \frac{1}{2}(u + v)\left(\frac{v - u}{a}\right)$$
$$s = \frac{(u + v)(v - u)}{2a}$$
Using the difference of squares formula, $(v-u)(v+u) = v^2 - u^2$:
$$s = \frac{v^2 - u^2}{2a}$$
Rearranging to solve for $v^2$:
$$2as = v^2 - u^2$$
$$v^2 = u^2 + 2as \quad \text{(Equation 5)}$$

These five equations (Equations 1, 2, 3, 4, 5, where Equation 3 is $s = vt - \frac{1}{2}at^2$, which can be derived by substituting $u = v - at$ into Equation 2) form the complete set of kinematic equations for constant acceleration.

## 8. ASCII diagrams

Here's an ASCII diagram illustrating a particle's motion along a straight line, showing initial and final states, and another showing a velocity-time graph for constant acceleration.

```text
Diagram 1: Particle Motion on a Straight Line

Initial State (t=0)             Final State (t)
  u (initial velocity)          v (final velocity)
  |------------------------------>|
  O-------------------------------X
  <---------- s (displacement) -->
  Accelerating uniformly at 'a'
```
*Description for Diagram 1:* This diagram shows a particle starting at point 'O' with an initial velocity 'u' at time $t=0$. It moves along a straight line, experiencing a constant acceleration 'a'. After a time 't', it reaches point 'X' with a final velocity 'v', having undergone a total displacement 's'. The arrows indicate the direction of velocity and displacement.

```text
Diagram 2: Velocity-Time Graph for Constant Acceleration

^ Velocity (v)
|
|   /|
|  / |
| /  |
|/   |
u------------------
| \  |
|  \ |
|   \|
|    v
+---------------------> Time (t)
0    t_initial      t_final

The slope of the line (dv/dt) is 'a' (constant acceleration).
The area under the line (integral of v dt) is 's' (displacement).
```
*Description for Diagram 2:* This is a velocity-time (v-t) graph. For constant acceleration, the velocity changes linearly with time, resulting in a straight line. The initial velocity is 'u' (at $t=0$), and the final velocity is 'v' (at time 't'). The slope of this straight line is equal to the constant acceleration 'a'. The area enclosed between the velocity line, the time axis, and the initial/final time ordinates represents the total displacement 's'. This area can be seen as a trapezoid, or a rectangle (ut) plus a triangle ($\frac{1}{2}at^2$).

## 9. Memory technique — never forget this

1.  **Specific Mnemonic / Visual Hook:**
    The most popular mnemonic for the variables is **SUVAT**. Just remember "S-U-V-A-T".
    *   **S** - Displacement
    *   **U** - Initial Velocity
    *   **V** - Final Velocity
    *   **A** - Acceleration (constant!)
    *   **T** - Time

    For the equations themselves, think of them as a set of tools where each equation is missing one variable. This helps you choose the right one:
    *   $v = u + at$ (Missing S)
    *   $s = ut + \frac{1}{2}at^2$ (Missing V)
    *   $s = vt - \frac{1}{2}at^2$ (Missing U)
    *   $s = \frac{1}{2}(u + v)t$ (Missing A)
    *   $v^2 = u^2 + 2as$ (Missing T)

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   The fundamental definitions: $a = \frac{dv}{dt}$ and $v = \frac{ds}{dt}$. These are the starting points.
    *   The core three SUVAT equations (from which others can be derived or are variations):
        1.  $v = u + at$
        2.  $s = ut + \frac{1}{2}at^2$
        3.  $v^2 = u^2 + 2as$
    *   The crucial condition: These equations are **only valid for constant acceleration**.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Immediately after learning, review the derivations and work through 2-3 examples.
    *   **Day 3:** Re-derive all five equations from scratch. Solve 2 new problems.
    *   **Day 7:** Review the derivations, focusing on the calculus steps. Solve 2-3 harder problems.
    *   **Day 16:** Attempt to explain the derivations and the meaning of each variable to yourself or a peer without notes. Solve 1-2 challenging problems involving multiple stages.
    *   **Day 35:** Re-derive the equations, focusing on the "what could go wrong" aspects. Solve a complex problem that tests common misconceptions.

4.  **The First-Principles Re-derivation Pathway:**
    If you ever forget any of the SUVAT equations, you can always rebuild them from these two fundamental definitions and the assumption of constant acceleration:

    *   **Step 1: Start with the definition of constant acceleration.**
        $$a = \frac{dv}{dt}$$
    *   **Step 2: Integrate to find velocity.**
        $$\int dv = \int a \, dt \implies v = at + C_1$$
        Apply initial conditions: at $t=0$, $v=u$. So, $u = a(0) + C_1 \implies C_1 = u$.
        This gives: $v = u + at$ (Equation 1)
    *   **Step 3: Use the definition of velocity.**
        $$v = \frac{ds}{dt}$$
    *   **Step 4: Substitute the expression for $v$ from Step 2 and integrate to find displacement.**
        $$\frac{ds}{dt} = u + at$$
        $$\int ds = \int (u + at) \, dt \implies s = ut + \frac{1}{2}at^2 + C_2$$
        Apply initial conditions: at $t=0$, $s=0$ (assuming starting point is origin). So, $0 = u(0) + \frac{1}{2}a(0)^2 + C_2 \implies C_2 = 0$.
        This gives: $s = ut + \frac{1}{2}at^2$ (Equation 2)
    *   **Step 5: Algebraically manipulate Equations 1 and 2 to derive the others.**
        *   To get $v^2 = u^2 + 2as$: Solve Equation 1 for $t$, then substitute into Equation 2.
        *   To get $s = \frac{1}{2}(u+v)t$: Add Equation 1 to $u$ and divide by 2 to get average velocity, then multiply by $t$. Or substitute $t$ from Equation 1 into Equation 2.

## 10. Connections — what this leads to

The SUVAT equations are a foundational cornerstone of classical mechanics. Mastering them unlocks understanding of many subsequent, more complex topics:

*   **Projectile Motion:** This is a direct extension. Projectile motion separates into independent horizontal (constant velocity, $a=0$) and vertical (constant acceleration due to gravity) components, each solvable using SUVAT equations.
*   **Newton's Laws of Motion:** SUVAT equations describe *how* objects move. Newton's Laws explain *why* they move that way (forces cause acceleration). The relationship $F=ma$ directly links the acceleration in SUVAT to the forces acting on an object.
*   **Work, Energy, and Power:** These concepts are intimately related to motion. For example, the work done by a constant force is related to the change in kinetic energy, which in turn depends on the change in velocity ($v^2 - u^2$), directly linking to $v^2 = u^2 + 2as$.
*   **Rotational Kinematics:** Just as linear motion has displacement, velocity, and acceleration, rotational motion has angular displacement, angular velocity, and angular acceleration. There's a direct analogy, and similar "SUVAT-like" equations exist for rotational motion when angular acceleration is constant.
*   **Simple Harmonic Motion (SHM):** While SHM involves *non-constant* acceleration (it depends on displacement), understanding constant acceleration is a prerequisite. SHM is often introduced by considering its relationship to uniform circular motion, where components of motion can be analyzed using concepts derived from kinematics.
*   **Relativity (Special Relativity):** While special relativity deals with speeds approaching the speed of light and alters the classical definitions of time, length, and mass, the classical kinematics of SUVAT serves as the low-speed limit and conceptual starting point.
*   **Computational Physics and Simulations:** Numerical methods for simulating complex physical systems often discretize time into small steps where acceleration can be approximated as constant, effectively applying SUVAT principles iteratively. This is crucial in fields like aerospace for trajectory simulations or in game physics engines.

## 11. Self-check questions

1.  A train accelerates from $15 \text{ m/s}$ to $25 \text{ m/s}$ in $4.0 \text{ seconds}$. Assuming constant acceleration, what distance did it cover during this time?
2.  An object is dropped from a height of $70 \text{ meters}$ above the ground. Ignoring air resistance, how long does it take to hit the ground, and what is its velocity just before impact? (Use $g = 9.8 \text{ m/s}^2$)
3.  A car traveling at $20 \text{ m/s}$ applies its brakes and comes to a stop in $5.0 \text{ seconds}$. What was its constant deceleration, and how far did it travel during braking?
4.  A bullet leaves the barrel of a rifle $0.80 \text{ meters}$ long with a muzzle velocity of $400 \text{ m/s}$. Assuming constant acceleration, what was the acceleration of the bullet while in the barrel, and how long did it take to travel the length of the barrel?
5.  A hot air balloon is rising vertically at a constant velocity of $5.0 \text{ m/s}$. When it is $100 \text{ meters}$ above the ground, a sandbag is released.
    a) What is the initial velocity of the sandbag immediately after release?
    b) How long does it take for the sandbag to reach the ground?
    c) What is the velocity of the sandbag just before it hits the ground? (Use $g = 9.8 \text{ m/s}^2$).