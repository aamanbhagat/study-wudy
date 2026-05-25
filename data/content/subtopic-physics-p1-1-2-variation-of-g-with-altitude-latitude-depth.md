## What it is
The acceleration due to gravity, $g$, is not a universal constant but the value of the gravitational field at a specific location. It varies predictably with altitude (distance from the Earth's center), depth (distance below the surface), and latitude (position relative to the equator) due to changes in mass distribution and rotational effects. We typically use the standard value $g \approx 9.81 \, \text{m/s}^2$ as a convenient average for the Earth's surface.

## Why it matters
Precision in $g$ is non-negotiable in aerospace engineering. Calculating satellite orbits, launch vehicle trajectories, and reentry paths requires accounting for these variations to avoid catastrophic errors. In geophysics, minute changes in $g$ are used to map subsurface density variations, helping locate mineral deposits or understand tectonic plate movements.

## When to study it
Before tackling this, you must have a firm grasp of these prerequisites:
1.  **Newton's Law of Universal Gravitation:** $F_g = G \frac{m_1 m_2}{r^2}$.
2.  **Newton's Second Law:** $\vec{F}_{net} = m\vec{a}$.
3.  **Shell Theorem:** You must understand that for a spherically symmetric mass, (a) the gravitational force on an external point mass is the same as if all the mass were concentrated at the center, and (b) the net gravitational force on an internal point mass from a surrounding shell is zero.
4.  **Uniform Circular Motion & Centripetal Force:** $a_c = \frac{v^2}{r} = \omega^2 r$.

If you are not confident with the Shell Theorem or centripetal force, review them first. This topic directly applies them.

## How to study it (step by step)
1.  **Derive Baseline g:** Start from first principles. Equate Newton's Second Law ($F=mg$) with the Law of Universal Gravitation ($F_g = G \frac{M_E m}{R_E^2}$) for a mass $m$ on the surface of the Earth (mass $M_E$, radius $R_E$). Solve for $g$ to get the foundational equation: $g = \frac{GM_E}{R_E^2}$.
2.  **Derive Altitude Variation:** Re-derive $g$ for a point at altitude $h$ above the surface. The distance from the center is now $r = R_E + h$. Find the expression for $g_h$. Then, use the binomial approximation $(1+x)^n \approx 1+nx$ for small $x$ to find the simplified linear approximation for $g_h$ when $h \ll R_E$.
3.  **Derive Depth Variation:** Consider a point at depth $d$ below the surface. Apply the Shell Theorem: only the mass of the smaller sphere of radius $r = R_E - d$ contributes to the gravitational pull. Assuming uniform density $\rho$, express this inner mass in terms of $\rho$ and $r$, substitute it into the gravity formula, and derive the expression for $g_d$.
4.  **Derive Latitude Variation:** Draw a force diagram for a mass $m$ at latitude $\lambda$. The true gravitational force $\vec{F}_g$ points to the center of the Earth. The surface provides a normal force $\vec{N}$. The vector sum $\vec{F}_g + \vec{N}$ must provide the centripetal force $\vec{F}_c$ required for the mass to rotate with the Earth. The apparent weight is the normal force, so the apparent gravity $g'$ is $N/m$. Solve for $g'$ in terms of $g$, $R_E$, the Earth's angular velocity $\omega$, and $\lambda$.
5.  **Solve Problems:** Work through one numerical problem for each case (altitude, depth, latitude) to solidify the formulas and their physical meaning.

## Key ideas, with intuition
1.  **Altitude: An Inverse Square Game.** Gravity weakens as you move away from a mass. The force is proportional to $1/r^2$. So, at an altitude $h$, the new distance is $r = R_E+h$, and the new gravity is:
    $$ g_h = \frac{GM_E}{(R_E+h)^2} = \frac{GM_E}{R_E^2(1+h/R_E)^2} = g \left(1 + \frac{h}{R_E}\right)^{-2} $$
    For small altitudes ($h \ll R_E$), this is approximately $g_h \approx g(1 - 2h/R_E)$. The drop is approximately linear for short distances.

2.  **Depth: Less Mass Pulling You.** As you go down a mine shaft, two things happen: you get closer to the center (which would increase gravity), but you also leave some of Earth's mass "above" you. The Shell Theorem states this shell of mass above you exerts zero net force. You are only pulled by the sphere of mass below you. This second effect dominates. Assuming uniform density, the mass pulling you ($M'$) drops as $r^3$, while the gravitational force increases as $1/r^2$. The net effect is a linear decrease in $g$ as you approach the center.
    $$ g_d = g \left(1 - \frac{d}{R_E}\right) $$
    At the center of the Earth ($d=R_E$), the net gravitational force is zero.

3.  **Latitude: The Centrifugal "Discount".** The Earth is spinning. An object on the surface is in circular motion. Part of the true gravitational force is "used up" to provide the necessary centripetal force to keep the object moving in a circle. The apparent weight (what a scale measures) is the true weight minus this centripetal component. This effect is maximum at the equator (largest radius of rotation) and zero at the poles (zero radius of rotation).
    $$ g_{\lambda} = g - R_E \omega^2 \cos^2\lambda $$
    This is why you are technically "lighter" at the equator than at the North Pole.

## Worked example
**Problem:** A satellite orbits at an altitude of $h = 400 \, \text{km}$. Calculate the acceleration due to gravity at this altitude. Use $g_{surface} = 9.81 \, \text{m/s}^2$ and $R_E = 6400 \, \text{km}$. Compare the exact value with the value from the linear approximation.

**Solution:**

1.  **Identify variables:**
    *   $g = 9.81 \, \text{m/s}^2$
    *   $h = 400 \, \text{km} = 4 \times 10^5 \, \text{m}$
    *   $R_E = 6400 \, \text{km} = 6.4 \times 10^6 \, \text{m}$

2.  **Use the exact formula for altitude variation:**
    The formula is $g_h = g \left(1 + \frac{h}{R_E}\right)^{-2}$.
    $$ g_h = 9.81 \left(1 + \frac{4 \times 10^5}{6.4 \times 10^6}\right)^{-2} $$
    $$ g_h = 9.81 \left(1 + \frac{4}{64}\right)^{-2} = 9.81 \left(1 + \frac{1}{16}\right)^{-2} = 9.81 \left(\frac{17}{16}\right)^{-2} $$
    $$ g_h = 9.81 \left(\frac{16}{17}\right)^2 \approx 9.81 \times (0.941)^2 \approx 9.81 \times 0.885 $$
    $$ g_h \approx 8.68 \, \text{m/s}^2 $$

3.  **Use the linear approximation formula:**
    The condition for the approximation is $h \ll R_E$. Here, $h/R_E = 400/6400 = 1/16$, which is reasonably small.
    The formula is $g_h \approx g(1 - 2h/R_E)$.
    $$ g_h \approx 9.81 \left(1 - 2 \times \frac{4 \times 10^5}{6.4 \times 10^6}\right) $$
    $$ g_h \approx 9.81 \left(1 - 2 \times \frac{1}{16}\right) = 9.81 \left(1 - \frac{1}{8}\right) = 9.81 \left(\frac{7}{8}\right) $$
    $$ g_h \approx 9.81 \times 0.875 \approx 8.58 \, \text{m/s}^2 $$

**Reflection:**
*   Step 1 sets up the problem with consistent units.
*   Step 2 applies the fundamental inverse-square relationship. It is always valid.
*   Step 3 uses the binomial approximation, a mathematical shortcut. The result is close to the exact value but noticeably different (about 1.2% error), showing the limit of the approximation. For orbital mechanics, you must use the exact formula.

## Diagrams
Variation with Altitude and Depth:
```text
                  + O (mass m at altitude h)
                  |
                  | h
                  |
      ------------- Surface (Radius R)
     /             \
    /       .       \
   |      / | \      |
   |     /  |d \     |  <-- Point at depth d
   |    O---+--.     |
   |      \ r /      |  <-- r = R-d
    \       .       /
     \             /
      --- Center ---
```

Variation with Latitude:
```text
              ^ North Pole (lambda = 90 deg)
             /|\
            / | \
           /  |  \
          /   |   \
         /    |    \
        O-----+-----> r (radius of rotation = R*cos(lambda))
       / \    |    /
      /   \   |   /
     /     \  |  /
    <------- Center (True gravity vector Fg points here)
     \       \|/    \
      \       V      \
       \    lambda   /
        \           /
         ----------- Equator (lambda = 0 deg)
```
*Description:* The second diagram shows a cross-section of the Earth. A point `O` is on the surface at latitude `lambda`. The true gravitational force $\vec{F}_g$ points to the center. The object at `O` rotates in a circle of radius $r = R_E \cos\lambda$. The centripetal force required for this rotation points horizontally towards the Earth's axis of rotation.

## Memory technique — remember this forever
1.  **The Story:** Imagine digging a hole and climbing a mountain.
    *   "Going **DOWN** is a **straight** deal." As you go down, gravity decreases *linearly*. The formula $g_d = g(1 - d/R)$ is linear.
    *   "Going **UP** is a **square** deal." As you go up, gravity decreases by an *inverse square* law. The formula $g_h = g(R/(R+h))^2$ has a square.
    *   "The **Equator** is a **light** place to be." The Earth's spin "flings" you out the most at the equator, reducing your apparent weight.

2.  **Must-Know Formulas:**
    *   Altitude (approximate): $g_h \approx g(1 - 2h/R_E)$
    *   Depth: $g_d = g(1 - d/R_E)$
    *   Latitude: $g_{\lambda} = g - R_E \omega^2 \cos^2\lambda$

3.  **Spaced Repetition Schedule:** Review these derivations and formulas in **1 day, 3 days, 7 days, 16 days, and 35 days**. Actively re-derive them from scratch each time.

4.  **First Principles Pathway:** If you forget everything, rebuild it:
    *   **Altitude/Depth:** Start with $F_g = G \frac{M'm}{r^2}$ and $F=mg'$.
        *   For altitude, $M' = M_E$ and $r = R_E+h$.
        *   For depth, $r = R_E-d$. $M'$ is the mass of the inner sphere. Find $M'$ using density: $\rho = \frac{M_E}{\frac{4}{3}\pi R_E^3}$ and $M' = \rho \times (\frac{4}{3}\pi r^3)$. Substitute and simplify.
    *   **Latitude:** Draw the free-body diagram. The net force ($\vec{F}_g + \vec{N}$) must equal the centripetal force ($m \vec{a}_c$). The apparent gravity is related to the normal force $\vec{N}$. Resolve vectors along the line to the center of the Earth.

## Common mistakes
1.  **Approximation Abuse:** Using the linear approximation $g_h \approx g(1 - 2h/R_E)$ for high altitudes (e.g., geostationary orbit). The approximation is only valid for $h \ll R_E$.
2.  **Depth Mass Error:** Forgetting to use the Shell Theorem for depth. Students incorrectly use the full mass of the Earth $M_E$ even when inside the planet, leading to the wrong conclusion that gravity increases as you go down.
3.  **Latitude Angle Mix-up:** Using $\sin\lambda$ instead of $\cos\lambda$ in the latitude formula. Remember the radius of the circular path is $r = R_E \cos\lambda$, which is maximum at the equator ($\lambda=0, \cos 0 = 1$) and zero at the poles ($\lambda=90^\circ, \cos 90^\circ = 0$).
4.  **Center of Distance:** Using $h$ instead of $R_E+h$ in the denominator of the main gravity equation. Distance is always measured from the center of mass.

## Self-check
1.  Calculate the altitude above the Earth's surface where your weight would be 50% of your weight on the surface.
2.  Assuming the Earth has a uniform density, at what depth below the surface is the acceleration due to gravity equal to its value at an altitude $h = R_E$?
3.  A hyper-advanced train runs in an evacuated tunnel from the North Pole to the Equator. Ignoring all friction, is the travel time from Pole to Equator the same as from Equator to Pole? Justify your answer quantitatively by considering the effective gravity along the path.