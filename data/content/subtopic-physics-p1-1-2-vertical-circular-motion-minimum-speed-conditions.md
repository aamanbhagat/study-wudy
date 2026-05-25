## What it is
Vertical circular motion describes an object moving in a circular path in a vertical plane, under the influence of gravity and some other force (like tension or a normal force). The minimum speed condition is the exact speed an object needs at the very top of the loop to complete the circle without the string going slack or the object falling off the track. Any slower, and the object will fail to complete the loop.

## Why it matters
This principle is fundamental to aerospace engineering and physics. An aircraft performing an inside loop must maintain a speed above this minimum to avoid stalling or losing control. In orbital mechanics, while the force is only gravity, the concept of a minimum speed to maintain a specific path is central to defining stable orbits.

## When to study it
You must have a solid understanding of these prerequisites before proceeding:
1.  **Newton's Second Law:** $\vec{F}_{net} = m\vec{a}$.
2.  **Centripetal Acceleration & Force:** You must know that for an object moving in a circle of radius $r$ at speed $v$, the acceleration towards the center is $a_c = \frac{v^2}{r}$, and the net force required to cause this is $F_c = \frac{mv^2}{r}$.
3.  **Free-Body Diagrams (FBDs):** You must be able to draw and analyze the forces (gravity, tension, normal force) acting on an object.
4.  **Conservation of Mechanical Energy:** You should understand the relationship between kinetic energy ($K = \frac{1}{2}mv^2$) and gravitational potential energy ($U_g = mgh$).

If any of these are weak, review them first. This topic combines them all.

## How to study it (step by step)
1.  **Draw the FBD at the top.** Consider a mass $m$ on a string of length $r$ at the highest point of a vertical circle. Identify the forces acting on it: gravity ($mg$) and tension ($T$), both pointing downwards towards the center.
2.  **Apply Newton's Second Law.** The net force towards the center of the circle provides the centripetal force. Write the equation for the vertical direction: $\sum F_{radial} = T + mg = \frac{mv_{top}^2}{r}$.
3.  **Define the "minimum" condition.** The string is about to go slack when the object *just barely* makes it over the top. "Slack" means the tension disappears. The minimum condition is therefore $T=0$.
4.  **Solve for minimum top speed.** Substitute $T=0$ into your equation from step 2. This isolates the minimum speed at the top, $v_{top, min}$.
5.  **Use energy conservation.** To find the minimum speed required at the *bottom* of the loop to achieve this top speed, apply the conservation of energy principle between the bottom and top points. Set the potential energy at the bottom to zero. The height difference is $2r$.
6.  **Solve a problem from scratch.** Take a new problem (e.g., a roller coaster car on a track) and repeat steps 1-5 without looking at your notes. The process of rebuilding the logic is what matters.

## Key ideas, with intuition
1.  **Centripetal force is a *result*, not a cause.** It is the *net force* pointing towards the center. At the top of the loop, both tension and gravity point down, so they add up: $F_c = T + mg$. At the bottom, tension points up (towards the center) and gravity points down (away from the center), so they oppose each other: $F_c = T - mg$.
2.  **Gravity helps at the top.** At the loop's apex, gravity is already pulling the object towards the center. The tension in the string only needs to provide the *rest* of the required centripetal force.
3.  **The "just making it" condition means tension vanishes.** Imagine swinging a bucket of water. If you swing it fast enough, the water stays in. If you go too slow at the top, it falls. The minimum speed is that knife-edge moment where the water is "weightless" and feels no force from the bucket's bottom. For a string, this means tension becomes zero. At this point, gravity *alone* provides the exact required centripetal force.
    $$mg = \frac{mv_{top, min}^2}{r}$$
    Any slower, and $mg > \frac{mv^2}{r}$, meaning gravity's pull is too strong for the path's curvature, and the object will begin to fall inside the circle.
4.  **Speed is not constant.** As the object moves up the loop, it converts kinetic energy to potential energy, so it slows down. As it comes down, it speeds up. The minimum speed is at the top, and the maximum speed is at the bottom. This is why we must use energy conservation to relate speeds at different points.

## Worked example
**Problem:** A small ball of mass $m=0.5$ kg is attached to a string of length $r=1.0$ m. It is swung in a vertical circle.
(a) What is the minimum speed the ball must have at the top of the circle to complete the loop?
(b) What is the minimum speed the ball must have at the bottom of the circle to achieve this?

**Solution:**

**(a) Minimum speed at the top ($v_{top}$)**

1.  **FBD at the top:** At the highest point, two forces act on the ball: gravity ($mg$) and tension ($T$). Both point straight down, towards the center of the circle.
2.  **Newton's Second Law:** The net force in the radial direction provides the centripetal force.
    $$ \sum F_{radial} = T + mg = \frac{mv_{top}^2}{r} $$
3.  **Apply minimum condition:** The minimum speed occurs at the threshold where the string is about to go slack. This means the tension $T$ approaches zero. We set $T=0$.
    $$ 0 + mg = \frac{mv_{top, min}^2}{r} $$
4.  **Solve for $v_{top, min}$:**
    $$ mg = \frac{mv_{top, min}^2}{r} $$
    The mass $m$ cancels out.
    $$ g = \frac{v_{top, min}^2}{r} $$
    $$ v_{top, min}^2 = gr $$
    $$ v_{top, min} = \sqrt{gr} $$
5.  **Calculate:** Using $g \approx 9.8 \, \text{m/s}^2$ and $r=1.0$ m:
    $$ v_{top, min} = \sqrt{(9.8 \, \text{m/s}^2)(1.0 \, \text{m})} = \sqrt{9.8} \approx 3.13 \, \text{m/s} $$

**(b) Minimum speed at the bottom ($v_{bottom}$)**

1.  **Conservation of Energy:** We relate the state at the bottom (point B) to the state at the top (point T). Let the potential energy at the bottom be $U_B = 0$. The height at the top is $h=2r$.
    $$ E_{bottom} = E_{top} $$
    $$ K_B + U_B = K_T + U_T $$
    $$ \frac{1}{2}mv_{bottom}^2 + 0 = \frac{1}{2}mv_{top}^2 + mg(2r) $$
2.  **Substitute $v_{top, min}$:** We use the minimum speed at the top we just found, $v_{top, min}^2 = gr$.
    $$ \frac{1}{2}mv_{bottom, min}^2 = \frac{1}{2}m(gr) + 2mgr $$
3.  **Solve for $v_{bottom, min}$:** The mass $m$ cancels out again.
    $$ \frac{1}{2}v_{bottom, min}^2 = \frac{1}{2}gr + 2gr = \frac{5}{2}gr $$
    $$ v_{bottom, min}^2 = 5gr $$
    $$ v_{bottom, min} = \sqrt{5gr} $$
4.  **Calculate:**
    $$ v_{bottom, min} = \sqrt{5(9.8 \, \text{m/s}^2)(1.0 \, \text{m})} = \sqrt{49} = 7.0 \, \text{m/s} $$

**Reflection:** Each step was necessary. The FBD and Newton's Law established the dynamic condition at the top. Setting $T=0$ captured the physical meaning of "minimum." Conservation of energy provided the only link between the dynamics at the top and the required initial state at the bottom, as the tension force does no work.

## Diagrams

**Forces at the TOP of the loop (minimum speed condition):**
```text
        (Top)
          o  <-- mass m
          |
          | mg (gravity)
          v

(Tension T=0 at minimum speed)
Center of circle is below the mass.
Net Force = mg, providing the centripetal force.
```

**Forces at the BOTTOM of the loop:**
```text
Center of circle is above the mass.

          ^
          | T (Tension)
          |
          o  <-- mass m
          |
          v mg (gravity)

        (Bottom)

Net Force = T - mg, providing the centripetal force.
```

## Memory technique — remember this forever
1.  **The Story: "Gravity is Just Enough"**
    At the absolute top of the loop, to just barely make it, you need some force to pull you down and keep you turning. Who is always there to pull you down? Gravity. The minimum condition is when gravity is *exactly* the right amount of force to do the job alone. The string can take a break ($T=0$). So you just set gravity equal to the required centripetal force: $mg = mv^2/r$.

2.  **Must-Know Formulas:**
    - Minimum speed at the top: $$v_{top} = \sqrt{gr}$$
    - Minimum speed at the bottom to complete the loop: $$v_{bottom} = \sqrt{5gr}$$

3.  **Spaced Repetition Schedule:**
    Review this material from first principles (don't just read the formulas) at these intervals:
    - 1 day
    - 3 days
    - 7 days
    - 16 days
    - 35 days

4.  **First Principles Pathway:**
    If you forget everything, rebuild it.
    - **Top:** Draw FBD at top $\rightarrow$ Write $T+mg = mv^2/r$ $\rightarrow$ Set $T=0$ for "minimum" $\rightarrow$ Solve for $v$.
    - **Bottom:** Write energy conservation: $E_{bottom} = E_{top}$ $\rightarrow$ $\frac{1}{2}mv_{bot}^2 = \frac{1}{2}mv_{top}^2 + mg(2r)$ $\rightarrow$ Substitute the $v_{top}$ you just derived $\rightarrow$ Solve for $v_{bot}$.

## Common mistakes
1.  **Setting $v_{top}=0$.** An object at the top of the loop is still moving. If its velocity were zero, it would simply fall straight down.
2.  **Ignoring gravity in the centripetal force calculation.** Students often think $F_c = T$. This is wrong. $F_c$ is the *net* force towards the center. At the top, $F_c = T+mg$.
3.  **Using the wrong height in the energy equation.** The change in height between the bottom and top of a vertical circle is the diameter, $h=2r$, not the radius $r$.
4.  **Assuming tension is constant.** Tension changes continuously throughout the loop. It is maximum at the bottom and minimum at the top. You cannot calculate it at one point and use it at another.

## Self-check
1.  A roller coaster has a loop with a radius of $20$ m. What is the minimum speed the car must have at the apex of the loop to not lose contact with the track? (Assume $g=10 \, \text{m/s}^2$).
2.  For the ball on a string in the worked example, if the speed at the bottom is $8.0 \, \text{m/s}$ (which is greater than the minimum), what is the tension in the string when the ball is at the very top of the loop?
3.  A small bead is on a frictionless, circular wire hoop of radius $r$ in a vertical plane. If the bead is given a minimum speed $v_0$ at the bottom to just complete the loop, what is its speed when it is at the same height as the center of the hoop (i.e., at the "9 o'clock" position)?