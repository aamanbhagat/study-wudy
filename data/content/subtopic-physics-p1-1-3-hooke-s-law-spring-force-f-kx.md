## What it is
Hooke's Law states that the force required to stretch or compress a spring by some distance is directly proportional to that distance. This force, called a restoring force, always acts in the direction opposite to the displacement, attempting to return the spring to its equilibrium (unstretched) length.

## Why it matters
This law is the foundation for understanding oscillations and vibrations, which are ubiquitous in physics and engineering. In aerospace, it's used to model the vibrational modes of aircraft wings and rocket bodies, and to design landing gear suspension systems. In computer science, it's a model for penalty functions in optimization algorithms, where moving away from an ideal solution incurs a "cost" proportional to the deviation.

## When to study it
Before tackling Hooke's Law, you must have a solid grasp of Newton's Laws of Motion, particularly the concepts of force ($F=ma$), vectors (understanding direction and magnitude), and static equilibrium (where the net force on an object is zero, $\sum F = 0$). Without these, the meaning of the force vector and the importance of the equilibrium position will be unclear.

## How to study it (step by step)
1.  **Develop physical intuition.** Find a rubber band or a simple spring (like from a ballpoint pen). Stretch it. Notice how the resistance you feel increases the more you stretch it. This tactile experience is the core of Hooke's Law.
2.  **Deconstruct the formula: $F_s = -kx$.** Write down each term and define it precisely. $F_s$ is the restoring force exerted *by the spring*. $x$ is the displacement *from the equilibrium position*. $k$ is the spring constant, a measure of stiffness. The negative sign indicates $F_s$ is in the opposite direction to $x$.
3.  **Derive the potential energy.** The work done *on* the spring to stretch it from $0$ to $x$ is stored as potential energy. Use the definition of work, $W = \int F \cdot dx$. Since you must apply a force $F_{app} = +kx$ to counteract the spring, the work you do is $W = \int_0^x (kx') dx' = \frac{1}{2}kx^2$. This result, $U_s = \frac{1}{2}kx^2$, is as important as the force law itself.
4.  **Solve a static equilibrium problem.** Hang a known mass from a spring and measure the displacement. Use Newton's First Law ($\sum F = 0$) to equate the spring force and the gravitational force ($kx = mg$) and solve for the spring constant $k$.
5.  **Set up a dynamic problem.** Attach a mass to a spring on a frictionless horizontal surface, pull it back, and release it. Apply Newton's Second Law ($F=ma$). The only horizontal force is the spring force, so $-kx = ma$. Since acceleration is the second derivative of position, this gives the equation $-kx = m\frac{d^2x}{dt^2}$. You don't need to solve this differential equation yet, but recognizing it is the starting point for simple harmonic motion is a critical step.

## Key ideas, with intuition
1.  **The Negative Sign is Direction.** This is the most important concept. The force exerted *by the spring* is a *restoring* force. If you pull the spring to the right (positive $x$), the spring pulls you back to the left (negative $F$). If you compress it to the left (negative $x$), it pushes you back to the right (positive $F$). The force always opposes the displacement from equilibrium.
    $$ F_s = -kx $$
2.  **Equilibrium is the Origin.** The displacement $x$ is *always* measured from the position where the spring is relaxed and exerts no force. This position is your $x=0$. If you measure from the end of the wall or the end of the unstretched spring, your calculations will be wrong.
3.  **The Spring Constant $k$ is Stiffness.** A large value for $k$ means the spring is very stiff; it takes a lot of force to stretch it a little. A small value for $k$ means the spring is weak or "soft". The units of $k$ are Newtons per meter ($N/m$), which you can remember as "the force needed to stretch it by one meter."
4.  **Energy is Stored Quadratically.** The potential energy stored in the spring is not linear with stretch, but quadratic. This means stretching a spring from $x=2$ cm to $x=3$ cm requires more work than stretching it from $x=0$ to $x=1$ cm. The energy is the area under the force-displacement graph, which is a triangle.
    $$ U_s = \frac{1}{2}kx^2 $$

## Worked example
**Problem:** A 0.5 kg mass is hung from a vertical spring, causing the spring to stretch by 20 cm from its original length.
(a) What is the spring constant $k$?
(b) How much more force is required to stretch the spring an additional 10 cm?

**Solution:**

**(a) Find the spring constant $k$.**

1.  **Identify the state:** The mass is hanging motionless. This is a static equilibrium problem.
2.  **Draw a free-body diagram:** Two forces act on the mass: gravity pulls it down ($F_g = mg$), and the spring pulls it up ($F_s = kx$).
3.  **Apply Newton's First Law:** Since the mass is in equilibrium, the net force is zero. Let's define "up" as the positive direction.
    $$ \sum F_y = F_s - F_g = 0 $$
    $$ F_s = F_g $$
4.  **Substitute the formulas for the forces:** The magnitude of the spring force is $|-kx| = kx$. The gravitational force is $mg$.
    $$ kx = mg $$
5.  **Solve for $k$:** First, convert all units to SI. The displacement $x = 20 \text{ cm} = 0.20 \text{ m}$. The mass $m = 0.5 \text{ kg}$. We use $g \approx 9.8 \text{ m/s}^2$.
    $$ k = \frac{mg}{x} = \frac{(0.5 \text{ kg})(9.8 \text{ m/s}^2)}{0.20 \text{ m}} $$
    $$ k = \frac{4.9 \text{ N}}{0.20 \text{ m}} = 24.5 \text{ N/m} $$

*Reflection on (a): We used the principle of equilibrium. The unknown stiffness of the spring was balanced by the known force of gravity, allowing us to isolate and calculate $k$.*

**(b) Find the additional force for an additional stretch.**

1.  **Identify the goal:** We need the *additional* force to stretch the spring *from* $x_1 = 0.20$ m *to* $x_2 = 0.20 + 0.10 = 0.30$ m.
2.  **Use Hooke's Law directly:** The law gives the *total* restoring force at a given displacement. The force you must apply, $F_{app}$, is equal and opposite to the spring's restoring force, so $F_{app} = kx$.
3.  **Calculate the forces at both positions:**
    *   Force at initial stretch: $F_1 = kx_1 = (24.5 \text{ N/m})(0.20 \text{ m}) = 4.9 \text{ N}$. (This matches the weight of the mass, as expected).
    *   Force at final stretch: $F_2 = kx_2 = (24.5 \text{ N/m})(0.30 \text{ m}) = 7.35 \text{ N}$.
4.  **Find the difference:** The additional force required is the change in the applied force.
    $$ \Delta F = F_2 - F_1 = 7.35 \text{ N} - 4.9 \text{ N} = 2.45 \text{ N} $$

*Reflection on (b): The key was recognizing that the force is linear. The additional force only depends on the additional displacement $\Delta x = 0.10$ m. We could have calculated it directly: $\Delta F = k(\Delta x) = (24.5 \text{ N/m})(0.10 \text{ m}) = 2.45 \text{ N}$. This linearity is a core property.*

## Diagrams
Here are three states of a horizontal spring-mass system.

**1. Equilibrium:** The spring is at its natural length. The mass is at position $x=0$. No force is exerted.

```text
       <-- x=0 -->
|-------------------[ M ]
|
Wall
```

**2. Stretched:** The mass has been pulled to the right to a position $x > 0$. The spring exerts a restoring force $F_s$ to the left.

```text
       <-- x=0 -->
|-------------------O-------------------[ M ]
|                   |                   <---- F_s
|                   Equilibrium         Displacement x > 0
```

**3. Compressed:** The mass has been pushed to the left to a position $x < 0$. The spring exerts a restoring force $F_s$ to the right.

```text
       <-- x=0 -->
|----------[ M ]----O-------------------
|         ----> F_s  |
| Displacement x < 0 Equilibrium
```

## Memory technique — remember this forever
1.  **Mnemonic Story:** Imagine Robert **Hooke** was a fisherman. His fishing line is a spring. When a fish gets on the **hook**, the line stretches by $x$. The fish pulls back with a force $F$. A bigger fish (more force $F$) causes a bigger stretch $x$. The line's stiffness is $k$. The fish always pulls *back* towards the boat (equilibrium), hence the negative sign. The story links **Hooke -> hook -> fishing line -> stretch -> restoring force**.
2.  **Must-know formulas:**
    *   Spring Force: $F_s = -kx$
    *   Spring Potential Energy: $U_s = \frac{1}{2}kx^2$
3.  **Spaced Repetition Schedule:** Review this material and solve one new problem at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget everything, remember the core idea: **for small displacements, the restoring force is linear.** This is an empirical law. From this, you can rebuild everything. If $F \propto x$, then $F = -kx$ (the minus sign is because it's a *restoring* force). To get the energy, you must do work against this force. Work is the integral of force over distance: $U_s = W = -\int_0^x F_s dx' = -\int_0^x (-kx') dx' = \int_0^x kx' dx' = \frac{1}{2}kx^2$.

## Common mistakes
1.  **The Sign Error:** Forgetting the minus sign in $F_s = -kx$. This leads to systems that accelerate away from equilibrium instead of oscillating around it. Always ask: "Which way is the spring trying to pull/push the object?"
2.  **The Displacement Error:** Measuring $x$ from the end of the wall or the physical end of the spring, instead of from the **equilibrium position**. If a mass is hanging, the equilibrium position is where the spring has already stretched to support the weight. Any *further* displacement for oscillation is measured from that new point.
3.  **Unit Conversion Failure:** Using centimeters for displacement $x$ with a spring constant $k$ in N/m. Always convert to SI units (meters, kilograms, seconds) before calculating.

## Self-check
1.  A spring with constant $k=200$ N/m is compressed by 15 cm. What is the magnitude and direction of the force exerted by the spring?
2.  A car's shock absorber is a large spring. A 1200 kg car is supported by four such springs, and its body settles by 5 cm due to its weight. Assuming the weight is distributed evenly, what is the spring constant of a single shock absorber?
3.  A spring has an unknown constant $k$. When a 100 J of work is done to stretch it, it ends up at a length of 2 m. When an additional 150 J of work is done (for 250 J total), it ends up at a length of 3 m. What is the spring's natural, unstretched length?