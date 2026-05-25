## What it is
Orbital velocity is the precise speed an object must maintain to follow a stable, circular path around a central body. This speed creates a perfect balance where the gravitational force pulling the object inward is exactly equal to the centripetal force required to keep it moving in a circle. Any deviation from this speed results in a non-circular (elliptical) orbit or escape.

## Why it matters
This concept is the foundation of mission design for every satellite, space station, and interplanetary probe ever launched. Engineers use this calculation to place satellites like those in the Starlink constellation into their correct orbits and to keep the International Space Station (ISS) from falling back to Earth. Understanding this derivation is the first step toward analyzing more complex elliptical orbits, orbital maneuvers, and calculating the energy required to travel through space.

## When to study it
Before tackling this, you must have a solid grasp of three prerequisites:
1.  **Newton's Second Law:** The relationship between force, mass, and acceleration, $F_{net} = ma$.
2.  **Newton's Law of Universal Gravitation:** The formula for gravitational force between two masses, $F_g = \frac{G M m}{r^2}$.
3.  **Uniform Circular Motion:** Specifically, the formula for centripetal acceleration, $a_c = \frac{v^2}{r}$.

If any of these are weak, review them first. The derivation is a direct synthesis of these three ideas.

## How to study it (step by step)
1.  **Draw the System:** Draw a large central mass $M$ (like a planet) and a smaller satellite of mass $m$ in a circular orbit of radius $r$ around it. Draw the velocity vector $\vec{v}$ (tangent to the circle) and the gravitational force vector $\vec{F_g}$ (pointing from $m$ to $M$).
2.  **State the Core Principle:** For a stable circular orbit, the *only* force acting on the satellite is gravity. This gravitational force *provides* the necessary centripetal force to keep the satellite in its circular path.
3.  **Set Up the Equation:** Write down the mathematical expression of the core principle: $F_g = F_c$. This is the central physics insight.
4.  **Substitute the Physics:** Replace $F_g$ and $F_c$ with their full formulas. Use $F_c = m a_c$ and then substitute the expression for centripetal acceleration, $a_c$. This gives you $\frac{G M m}{r^2} = \frac{m v^2}{r}$.
5.  **Solve for Velocity ($v$):** Perform the algebra to isolate $v$. Notice that the satellite's mass $m$ and one factor of $r$ cancel out. This is a critical step with profound implications.
6.  **Analyze the Result:** Look at the final formula. What does it say about the relationship between velocity and orbital radius? What about the masses? Work through a numerical example, like calculating the orbital speed of the ISS.
7.  **Consider the Limits:** Ask yourself what would happen if the actual velocity were slightly higher or lower than the calculated $v_{orbit}$. This builds intuition for elliptical orbits and orbital decay.

## Key ideas, with intuition
1.  **Gravity is the Centripetal Force.** An object in orbit is continuously falling toward the central body. However, its tangential velocity is so high that as it falls, the surface of the central body curves away beneath it at the same rate. The force causing this "fall" is gravity. Therefore, the gravitational force *is* the centripetal force.
    $$F_{gravity} = F_{centripetal}$$

2.  **The Equation of Balance.** To maintain a circle of radius $r$ at speed $v$, an object of mass $m$ requires a specific centripetal force, $F_c = \frac{mv^2}{r}$. Nature provides the gravitational force, $F_g = \frac{G M m}{r^2}$. A stable circular orbit exists only when these two are perfectly matched.
    $$\frac{G M m}{r^2} = \frac{m v^2}{r}$$

3.  **The Satellite's Mass is Irrelevant.** Notice that the mass of the orbiting object, $m$, appears on both sides of the equation and cancels out. This means a feather and the International Space Station would orbit at the same speed at the same altitude (ignoring atmospheric drag). The orbital speed depends only on the mass of the central body ($M$) and the orbital radius ($r$).

4.  **Higher Orbits are Slower.** After solving for $v$, we get $v = \sqrt{\frac{GM}{r}}$. This shows an inverse relationship between speed and radius: $v \propto \frac{1}{\sqrt{r}}$. This is counter-intuitive. One might think a higher orbit requires more speed, but it requires less. At a greater distance, gravity is weaker, so less speed is needed to balance it and maintain a circular path.

## Worked example
**Problem:** Calculate the orbital speed of the International Space Station (ISS).
Given:
- Mass of Earth, $M_E \approx 5.972 \times 10^{24}$ kg
- Radius of Earth, $R_E \approx 6.371 \times 10^6$ m
- Altitude of ISS, $h \approx 408$ km
- Gravitational Constant, $G \approx 6.674 \times 10^{-11} \, \text{N}\cdot\text{m}^2/\text{kg}^2$

**Step 1: Identify the core principle.**
The gravitational force exerted by the Earth on the ISS provides the centripetal force required for its circular orbit.
$$F_g = F_c$$

**Step 2: Substitute the formulas.**
$$\frac{G M_E m_{ISS}}{r^2} = \frac{m_{ISS} v^2}{r}$$

**Step 3: Calculate the orbital radius, $r$.**
The radius $r$ is measured from the center of the Earth, not its surface. We must add the Earth's radius to the ISS's altitude. Crucially, convert altitude to meters first.
$h = 408 \, \text{km} = 408 \times 10^3 \, \text{m}$
$r = R_E + h = (6.371 \times 10^6 \, \text{m}) + (408 \times 10^3 \, \text{m}) = 6.779 \times 10^6 \, \text{m}$

**Step 4: Solve the equation for $v$.**
First, cancel $m_{ISS}$ from both sides and one factor of $r$.
$$\frac{G M_E}{r} = v^2$$
$$v = \sqrt{\frac{G M_E}{r}}$$
This is the general formula for orbital velocity.

**Step 5: Substitute the numerical values and compute.**
$$v = \sqrt{\frac{(6.674 \times 10^{-11}) (5.972 \times 10^{24})}{6.779 \times 10^6}}$$
$$v = \sqrt{\frac{3.986 \times 10^{14}}{6.779 \times 10^6}}$$
$$v = \sqrt{5.880 \times 10^7}$$
$$v \approx 7668 \, \text{m/s}$$

**Reflection:**
- Step 1 established the physical law governing the situation.
- Step 2 translated that law into a mathematical equation.
- Step 3 was a crucial data-processing step, avoiding the common mistake of using altitude for radius.
- Step 4 isolated the target variable algebraically, yielding a general and powerful formula.
- Step 5 performed the final calculation, giving a concrete answer (approx. 7.7 km/s or 17,150 mph).

## Diagrams
```text
        Satellite (m)
           /
          /
         /
        V
       ---> v (tangential velocity)
      /
     /
    r
   /
  /
 /
O------------------> F_g (gravitational force)
M (Central Body)

Figure 1: A satellite of mass m in a circular orbit of radius r around a
central body of mass M. The velocity vector v is always tangent to the
orbital path. The gravitational force F_g is the only force acting on the
satellite and always points toward the center of M, providing the
centripetal force.
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you are swinging a ball on a string around your head. The tension in the string is what keeps the ball moving in a circle. In space, gravity is the "string". The core idea is simply "The tension from gravity's string equals the force needed to swing the satellite."
2.  **Formulas to Overlearn:**
    *   $F_g = \frac{G M m}{r^2}$ (Gravity's pull)
    *   $F_c = \frac{m v^2}{r}$ (Force needed for a circle)
    *   $v_{orbit} = \sqrt{\frac{G M}{r}}$ (The result of setting them equal)
3.  **Spaced Repetition Schedule:** Review this derivation and the key formulas at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Actively re-derive it from scratch each time.
4.  **First Principles Pathway:** If you forget the final formula, you can rebuild it in 30 seconds.
    *   Start with the core concept: **Gravitational Force = Centripetal Force**.
    *   Write the equations: $\frac{G M m}{r^2} = \frac{m v^2}{r}$.
    *   Solve for $v$.

## Common mistakes
1.  **Radius vs. Altitude:** Using the altitude ($h$) above the surface instead of the orbital radius ($r = R_{planet} + h$). The gravitational force acts from the center of mass.
2.  **Mass Confusion:** Mixing up $M$ (the large, central body's mass) and $m$ (the small, orbiting satellite's mass). Remember, $m$ cancels out; the final velocity only depends on $M$.
3.  **Forgetting the Square Root:** A common algebraic slip is to solve for $v^2$ and forget to take the square root at the end.
4.  **Unit Inconsistency:** Mixing kilometers and meters in the same calculation. Always convert everything to standard SI units (meters, kilograms, seconds) before substituting into the formula.

## Self-check
1.  Starting with the final orbital velocity formula, $v = \sqrt{\frac{GM}{r}}$, and the fact that for a circle, speed is distance/time ($v = 2\pi r / T$), derive an expression for the orbital period, $T$.
2.  A spy satellite orbits at an altitude of 200 km. Mission control decides to move it to a more stable "parking" orbit at 800 km. Does the satellite need to speed up or slow down to maintain the new circular orbit? Justify your answer using the derived formula.
3.  Two planets, A and B, orbit the same star. Planet A's orbit has a radius $R$. Planet B's orbit has a radius $4R$. What is the ratio of Planet A's orbital velocity to Planet B's orbital velocity ($v_A / v_B$)?