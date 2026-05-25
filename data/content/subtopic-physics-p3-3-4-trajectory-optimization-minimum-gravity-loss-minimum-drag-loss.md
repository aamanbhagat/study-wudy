## What it is
Trajectory optimization is the process of finding the ideal flight path and steering profile for a rocket to achieve its mission objective with the least amount of propellant. This involves managing the trade-off between two primary sources of performance loss: "gravity loss," the fuel spent fighting Earth's pull, and "drag loss," the fuel spent pushing through the atmosphere. The optimal path is never the most direct one, but rather a carefully shaped curve that minimizes the sum of these losses.

## Why it matters
This is the core of modern launch vehicle guidance. Software like NASA's GMAT (General Mission Analysis Tool) or commercial tools like ASTOS run complex optimization algorithms to design the ascent profiles for rockets like Falcon 9 or SLS, maximizing payload to orbit by saving even small percentages of fuel. In robotics and machine learning, these same principles of optimal control are used to find the most energy-efficient paths for drones, robotic arms, and autonomous vehicles.

## When to study it
You should be comfortable with the following before proceeding:
*   **Newton's Second Law ($\vec{F}=m\vec{a}$):** You must be able to decompose forces into vector components in a chosen coordinate system (e.g., local horizontal and vertical).
*   **The Tsiolkovsky Rocket Equation:** Understand that a rocket's performance is measured in delta-v ($\Delta v$), the total change in velocity it can achieve.
*   **Basic Calculus:** Specifically, definite integrals ($\int_a^b f(x)dx$) to sum up effects over time, and the concept of finding minima by setting a derivative to zero.
*   **Force Models:** You need the expressions for gravitational force ($F_g = mg$) and aerodynamic drag ($D = \frac{1}{2}\rho v^2 C_D A$).

## How to study it (step by step)
1.  **Define the Losses:** Write down the rocket equation of motion along its velocity vector. Identify the terms that oppose the thrust. The component of gravity acting against the velocity vector causes gravity loss, and the drag force causes drag loss.
2.  **Derive the Loss Integrals:** Express these losses as integrals over the burn time. This formalizes them as $\Delta v_g = \int g \sin(\gamma) dt$ and $\Delta v_D = \int (D/m) dt$. Understand what each variable ($\gamma$, $D$, $m$) means and why it's inside the integral.
3.  **Analyze the Trade-off (Extremes):** Consider two bad trajectories. First, a pure vertical ascent ($\gamma=90^\circ$): drag is low (you exit the atmosphere fast), but gravity loss is maximum ($g \sin(90^\circ) = g$). Second, a sharp, early turn to horizontal ($\gamma \approx 0^\circ$): gravity loss is minimized, but you fly at high speed through the thickest part of the atmosphere, causing enormous drag loss.
4.  **Sketch the "Gravity Turn":** The solution to the trade-off is the gravity turn. Draw a diagram of this path: a short vertical ascent, followed by a small "pitch-over" maneuver, after which the rocket is allowed to naturally follow a curve as gravity "pulls" the nose of the velocity vector down toward the horizon.
5.  **Solve a Simplified Problem:** Work through a problem where one of the losses is zero (e.g., ascent on an airless body like the Moon, where $D=0$) to isolate and understand the effect of gravity loss.

## Key ideas, with intuition
1.  **Losses are $\Delta v$ penalties.** Your rocket has a total $\Delta v$ budget from its propellant, given by the Tsiolkovsky equation. Every bit of velocity you lose to gravity or drag is directly subtracted from this budget, reducing your final orbital velocity. The goal is to minimize these subtractions.
    $$ \Delta v_{final} = \Delta v_{ideal} - \Delta v_{gravity} - \Delta v_{drag} $$
2.  **Gravity loss is about *time* and *angle*.** Gravity loss is the velocity penalty you pay for spending time thrusting upwards instead of sideways. The longer you fight gravity, the more fuel you waste. The key insight is that the loss depends on the component of gravity that directly opposes your thrust.
    $$ \Delta v_g = \int g \sin(\gamma) dt $$
    Here, $\gamma$ is the flight path angle relative to the horizontal. To minimize this, you want to make $\gamma$ small as fast as possible—that is, turn horizontal quickly.
3.  **Drag loss is about *density* and *speed*.** Drag is a true dissipative force that turns your kinetic energy into heat. It's worst where the atmosphere is thick (low altitude) and when you are moving fast.
    $$ \Delta v_D = \int \frac{\frac{1}{2}\rho(h) v^2 C_D A}{m(t)} dt $$
    To minimize this, you want to get through the dense lower atmosphere ($\rho$ is high) while your velocity ($v$) is still relatively low. This argues for a steep initial ascent.
4.  **The Optimal Path is a Compromise.** The two goals are in direct conflict. Flying steep minimizes drag loss but maximizes gravity loss. Flying shallow minimizes gravity loss but maximizes drag loss. The optimal trajectory is therefore a curve that starts steep to "punch through" the dense air, then gradually flattens out to build horizontal speed efficiently. This is the "gravity turn."

## Worked example
**Problem:** A sounding rocket is launched vertically. For a short period, we can assume its mass $m=1000$ kg, thrust $T=30,000$ N, and gravity $g=9.8$ m/s² are constant. It travels vertically upwards from $h=0$ to $h=2000$ m. Calculate the gravity loss during this phase.

**Solution:**
1.  **Calculate Net Acceleration:** First, find the net force on the rocket and its acceleration.
    $$ F_{net} = T - mg = 30000 \text{ N} - (1000 \text{ kg} \times 9.8 \text{ m/s}^2) = 30000 - 9800 = 20200 \text{ N} $$
    $$ a = \frac{F_{net}}{m} = \frac{20200 \text{ N}}{1000 \text{ kg}} = 20.2 \text{ m/s}^2 $$
2.  **Calculate Time of Flight:** We need to know how long this ascent phase lasts. Using kinematics: $\Delta h = v_0 t + \frac{1}{2}at^2$. Since $v_0=0$:
    $$ 2000 \text{ m} = \frac{1}{2}(20.2 \text{ m/s}^2)t^2 $$
    $$ t^2 = \frac{4000}{20.2} \approx 198 \text{ s}^2 $$
    $$ t \approx \sqrt{198} \approx 14.07 \text{ s} $$
3.  **Calculate Gravity Loss:** Now we use the gravity loss integral. For a purely vertical flight, the flight path angle $\gamma = 90^\circ$, so $\sin(\gamma)=1$.
    $$ \Delta v_g = \int_0^{t} g \sin(\gamma) dt = \int_0^{14.07} g \cdot (1) dt $$
    Since $g$ is constant, this is simple:
    $$ \Delta v_g = g \cdot t = (9.8 \text{ m/s}^2) \times (14.07 \text{ s}) \approx 137.9 \text{ m/s} $$
4.  **Reflection:**
    *   Step 1 worked because we applied Newton's Second Law to find the actual motion of the rocket.
    *   Step 2 used basic kinematics to find the duration, which is the key parameter for gravity loss.
    *   Step 3 applied the formal definition of gravity loss. The rocket had to burn fuel for 14.07 seconds just to counteract gravity, costing it 137.9 m/s of potential velocity that could have otherwise contributed to its final speed. This is the "loss."

## Diagrams
A diagram of the forces on a rocket during ascent, and a diagram illustrating the trajectory trade-off.

```text
Diagram 1: Forces on a Rocket

      ^ y (vertical)
      |
      |       T (Thrust)
      |      /
      |     /
      |    /
      |   /
      |  /
      | /
      *------> v (Velocity vector)
     /| \
    / |  \ D (Drag, opposite v)
   /  |   \
  L   |    `-----> x (horizontal)
(Lift)|
      |
      v mg (Gravity)

The angle between v and the x-axis is the flight path angle, gamma (γ).
The angle of the rocket body itself is the pitch angle, theta (θ).
```

```text
Diagram 2: Trajectory Trade-off

Altitude ^
         |
         |
         | ................................... Target Orbit
         |
         |         B. Optimal Path (Gravity Turn)
         |       /
         |      /
         |     . A. Steep Path
         |    /
         |  ..
         | /
         |/ C. Shallow Path
         +-------------------------------------> Downrange

A. Steep Path: High gravity loss, low drag loss.
C. Shallow Path: Low gravity loss, high drag loss.
B. Optimal Path: The best compromise between the two.
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you have to escape a flooded building with a powerful fire hose (your rocket thrust). The ground floor is flooded (dense atmosphere) and the building is collapsing (gravity).
    *   **To beat the flood (drag):** Point the hose straight down and blast yourself vertically to the second floor as fast as possible.
    *   **To beat the collapse (gravity):** Point the hose out a window to get away from the building horizontally as fast as possible.
    *   **The Optimal Escape:** Blast yourself just high enough to clear the flooded ground floor, then immediately start pointing the hose out the window to get away sideways. This is the gravity turn: "Up to clear the danger, then sideways to escape."
2.  **Must-Know Formulas:**
    $$ \Delta v_{gravity} = \int g \sin(\gamma) dt $$
    $$ \Delta v_{drag} = \int \frac{D}{m(t)} dt $$
3.  **Spaced Repetition:** Review this material and try to re-derive the formulas from a force diagram at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget everything, start with $\vec{F}_{net} = m\vec{a}$.
    *   Draw the rocket and all forces ($\vec{T}, \vec{D}, m\vec{g}$).
    *   Define a coordinate system aligned with the velocity vector $\vec{v}$ (tangential) and perpendicular to it (normal).
    *   Write the tangential equation: $m \frac{dv}{dt} = T_{tangential} - D - mg_{tangential}$.
    *   Recognize that $T_{tangential}$ is the useful part of thrust, while $D$ and $mg_{tangential}$ are the forces that "steal" acceleration.
    *   $mg_{tangential}$ is $mg\sin(\gamma)$. The velocity lost to this term is $\int \frac{mg\sin(\gamma)}{m} dt = \int g\sin(\gamma)dt$. This is gravity loss. The velocity lost to drag is $\int \frac{D}{m} dt$.

## Common mistakes
*   **Confusing Gravity Loss with Potential Energy:** Gravity loss is not $mgh$. It is a $\Delta v$ penalty. Two rockets can reach the same altitude with vastly different gravity losses depending on the *time* they spent thrusting upwards.
*   **Assuming Constant Pitch Angle:** The optimal trajectory does not use a constant pitch angle. The angle of attack and flight path angle are constantly changing to manage the trade-off as altitude, velocity, and mass change.
*   **Ignoring Mass Change:** Forgetting that $m(t)$ is decreasing as propellant is burned. This is crucial, as the rocket's acceleration increases over time, which heavily influences the optimal steering.
*   **"Fighting" the Gravity Turn:** A common beginner mistake in simulations (like Kerbal Space Program) is to try and force the rocket to fly straight, then make a hard right turn. The efficient method is to pitch over slightly and let gravity do the work of turning your trajectory.

## Self-check
1.  A rocket is at "Max Q" (the point of maximum aerodynamic pressure). To minimize drag *at this instant*, should the guidance system command the rocket to pitch up (increase $\gamma$) or pitch down (decrease $\gamma$)? Why?
2.  Two identical rockets burn the same amount of fuel to reach the same final altitude. Rocket A follows a steep trajectory, arriving in 2 minutes. Rocket B follows a shallower trajectory, arriving in 3 minutes. Which rocket experienced more gravity loss, and why?
3.  Imagine a hypothetical rocket with a "variable-geometry" fairing, allowing it to change its cross-sectional area $A$ and drag coefficient $C_D$ in flight. Describe how you would program the fairing to change during ascent to help minimize total drag loss. What would be the trade-off of using such a system?