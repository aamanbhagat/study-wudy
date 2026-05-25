## What it is
The eccentricity, denoted by $e$, is a single, non-negative number that quantifies how much an orbit deviates from a perfect circle. An orbit is a conic section, and its shape is uniquely determined by its eccentricity: a circle has $e=0$, an ellipse has $0 < e < 1$, a parabola has $e=1$, and a hyperbola has $e > 1$.

## Why it matters
Understanding eccentricity is fundamental to mission design and trajectory analysis. Geostationary communication satellites require near-circular orbits ($e \approx 0$) to remain fixed over a point on Earth. Interplanetary transfers, like the Hohmann transfer to Mars, use elliptical orbits ($0 < e < 1$). Interstellar probes like Voyager use hyperbolic escape trajectories ($e > 1$) to leave the solar system's gravitational well permanently.

## When to study it
You must have a solid grasp of these prerequisites:
1.  **Newton's Law of Universal Gravitation:** The inverse-square law force, $F = G \frac{M m}{r^2}$.
2.  **Conservation of Energy and Angular Momentum:** Derivation of specific mechanical energy $\mathcal{E} = \frac{v^2}{2} - \frac{\mu}{r}$ and specific angular momentum $h = |\mathbf{r} \times \mathbf{v}|$.
3.  **Conic Sections (Geometry):** The geometric definitions of a circle, ellipse, parabola, and hyperbola.

If you cannot derive the specific energy equation from first principles, review that material before proceeding.

## How to study it (step by step)
1.  **Review Conic Sections Geometrically:** Draw the four conic sections. For the ellipse, physically measure the distance from a point on the curve to the two foci and see that the sum is constant. For the hyperbola, see that the difference is constant. Understand the focus-directrix property: the ratio of the distance to the focus to the distance to a line (the directrix) is a constant, $e$.
2.  **Derive the Orbit Equation:** Start with the differential equation of motion for the two-body problem, $\ddot{\mathbf{r}} + \frac{\mu}{r^3}\mathbf{r} = 0$. Solve it using conservation of angular momentum and energy to arrive at the polar equation for an orbit: $r = \frac{h^2/\mu}{1+e \cos \theta}$. This is the most critical derivation.
3.  **Connect Eccentricity to Energy:** From the derivation in the previous step, you will find the constant of integration, $e$, is given by $e = \sqrt{1 + \frac{2 \mathcal{E} h^2}{\mu^2}}$. This is the bridge between the dynamics (energy $\mathcal{E}$) and the geometry (eccentricity $e$).
4.  **Analyze the Energy Condition:** Use the formula from step 3.
    *   If the orbit is bound (closed), the object can't escape. Total energy must be negative ($\mathcal{E} < 0$). Plug this in: the term inside the square root is less than 1, so $0 \le e < 1$. This gives a circle or an ellipse.
    *   If the object has exactly escape velocity, its total energy is zero ($\mathcal{E} = 0$). Plug this in: $e = \sqrt{1+0} = 1$. This is a parabola.
    *   If the object exceeds escape velocity, its total energy is positive ($\mathcal{E} > 0$). Plug this in: the term inside the square root is greater than 1, so $e > 1$. This is a hyperbola.
5.  **Graph the Polar Equation:** Choose $h^2/\mu = 1$ for simplicity. Plot $r(\theta)$ for $e=0$, $e=0.5$, $e=1$, and $e=2$. Watch how the shape changes from a circle to a progressively more open curve. Notice for $e \ge 1$, $r \to \infty$ for certain angles $\theta$.

## Key ideas, with intuition
1.  **Eccentricity is "non-circularity".** A value of $e=0$ means "0% non-circular". A value of $e=0.7$ is "70% of the way from a circle to a parabola". It's a measure of how "squashed" or "stretched" the orbit is.
2.  **Energy determines the orbit *type* (bound vs. unbound).** The total specific energy, $\mathcal{E}$, is the sum of kinetic and potential energy.
    $$ \mathcal{E} = \frac{v^2}{2} - \frac{\mu}{r} $$
    *   **$\mathcal{E} < 0$ (Bound):** Potential energy dominates. The object is trapped in the gravity well. It will orbit forever. This corresponds to circles and ellipses ($0 \le e < 1$).
    *   **$\mathcal{E} = 0$ (Critically Unbound):** Kinetic and potential energy are perfectly balanced. The object has *exactly* enough velocity to coast to infinity and arrive with zero speed. This is a parabolic escape trajectory ($e=1$).
    *   **$\mathcal{E} > 0$ (Unbound):** Kinetic energy dominates. The object will escape to infinity and still have leftover velocity. This is a hyperbolic flyby trajectory ($e > 1$).
3.  **The master equation connects geometry and physics.** The shape of any two-body orbit is described by one equation, where $e$ dictates the type of conic.
    $$ r(\theta) = \frac{p}{1 + e \cos \theta} $$
    Here, $p = h^2/\mu$ is a constant called the semi-latus rectum, which sets the *size* of the orbit. The denominator, $1 + e \cos \theta$, determines the *shape*. If $e<1$, the denominator is never zero, so $r$ is always finite (a closed orbit). If $e \ge 1$, the denominator can go to zero, allowing $r$ to become infinite (an open, escape trajectory).

## Worked example
**Problem:** A spacecraft at an altitude of 1000 km above Earth has a velocity of 10 km/s, perpendicular to its position vector from Earth's center. Determine its orbit shape. Use Earth's gravitational parameter $\mu = 398600 \text{ km}^3/\text{s}^2$ and radius $R_E = 6378 \text{ km}$.

**Solution:**

1.  **Calculate the state vectors.**
    The radius from the center of the Earth is $r = R_E + \text{altitude} = 6378 + 1000 = 7378 \text{ km}$.
    The velocity is given as $v = 10 \text{ km/s}$. Since velocity is perpendicular to the position vector, this point is either periapsis or apoapsis.

2.  **Calculate specific angular momentum, $h$.**
    For perpendicular vectors, the cross product magnitude is simple:
    $h = |\mathbf{r} \times \mathbf{v}| = r v \sin(90^\circ) = rv$.
    $h = (7378 \text{ km})(10 \text{ km/s}) = 73780 \text{ km}^2/\text{s}$.

3.  **Calculate specific mechanical energy, $\mathcal{E}$.**
    $\mathcal{E} = \frac{v^2}{2} - \frac{\mu}{r}$
    $\mathcal{E} = \frac{(10 \text{ km/s})^2}{2} - \frac{398600 \text{ km}^3/\text{s}^2}{7378 \text{ km}}$
    $\mathcal{E} = 50 \text{ km}^2/\text{s}^2 - 54.025 \text{ km}^2/\text{s}^2 = -4.025 \text{ km}^2/\text{s}^2$.

4.  **Calculate eccentricity, $e$.**
    $e = \sqrt{1 + \frac{2 \mathcal{E} h^2}{\mu^2}}$
    $e = \sqrt{1 + \frac{2 (-4.025 \text{ km}^2/\text{s}^2) (73780 \text{ km}^2/\text{s})^2}{(398600 \text{ km}^3/\text{s}^2)^2}}$
    $e = \sqrt{1 + \frac{(-8.05)(5.4435 \times 10^9)}{1.5888 \times 10^{11}}}$
    $e = \sqrt{1 - 0.2755} = \sqrt{0.7245} \approx 0.851$.

5.  **Determine orbit shape.**
    Since $0 < 0.851 < 1$, the orbit is an **ellipse**.

**Reflection:** Each step was a direct application of a definition. We first established the craft's state ($r, v$), then calculated the two key conserved quantities (energy $\mathcal{E}$ and angular momentum $h$), and finally used the formula that connects these physical quantities to the geometric property of eccentricity, $e$. The negative energy immediately signaled a bound orbit (ellipse or circle), and the final calculation confirmed it was non-circular.

## Diagrams
Here is an ASCII diagram showing the family of conic sections, all sharing one focus (F), representing the central body.

```text
                 Hyperbola (e>1)
                      \
                       \
                        \
                         .
Parabola (e=1) ......... . ...................
                      . /
                   .   /
                .     /
             .       * F
Ellipse   .         /
(0<e<1) . . . . . .
         .       .
          . . . .

    Circle (e=0)
       around F

(Note: All curves share the same focus F and periapsis point)
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Energy is Destiny."
    *   **Negative** energy? You're **trapped**, bound in an **Ellipse** or **Circle**.
    *   **Zero** energy? You're on the edge, escaping perfectly on a **Parabola**.
    *   **Positive** energy? You have **excess** speed, flying by on a **Hyperbola**.

2.  **Must-know formulas:**
    *   Specific Energy: $\mathcal{E} = \frac{v^2}{2} - \frac{\mu}{r}$
    *   Eccentricity from Energy: $e = \sqrt{1 + \frac{2 \mathcal{E} h^2}{\mu^2}}$

3.  **Spaced repetition schedule:** Review these formulas and the "Energy is Destiny" mnemonic now. Then again in 1 day, 3 days, 7 days, 16 days, and 35 days. Do not just read them; re-derive the eccentricity formula from the orbit equation on days 7 and 35.

4.  **First principles pathway:** If you forget everything, rebuild from Newton's Second Law for gravity: $\mathbf{F} = m\mathbf{a} \implies m\ddot{\mathbf{r}} = -\frac{G M m}{r^3}\mathbf{r}$.
    *   Define $\mu = GM$.
    *   Show that specific angular momentum $\mathbf{h} = \mathbf{r} \times \dot{\mathbf{r}}$ is constant ($\dot{\mathbf{h}}=0$).
    *   Show that specific energy $\mathcal{E}$ is constant ($\dot{\mathcal{E}}=0$).
    *   Solve the differential equation of motion. The solution will be $r(\theta)$, and the integration constant that appears will be the eccentricity, defined in terms of $\mathcal{E}$ and $h$. This path is always available to you.

## Common mistakes
*   **Sign error in energy:** Forgetting the minus sign in the potential energy term ($-\mu/r$). A positive potential energy is physically meaningless here and will lead to incorrect conclusions about orbit type.
*   **Using altitude for $r$:** Always use the distance from the *center* of the central body ($r = R_{\text{body}} + \text{altitude}$), not just the altitude. The gravitational force originates from the center of mass.
*   **Confusing bound and unbound:** A high eccentricity (e.g., $e=0.99$) is still a bound, elliptical orbit. The object will always return. Only when $e \ge 1$ has the object truly escaped.
*   **Assuming $e=0$ is typical:** Most orbits are at least slightly elliptical due to perturbations and imperfect insertion maneuvers. A perfectly circular orbit is an idealization.

## Self-check
1.  A satellite in a circular orbit fires its thrusters, instantaneously increasing its speed in the direction of motion. What is the eccentricity of the new orbit? Is it greater or less than the original eccentricity?
2.  A long-period comet is observed with an eccentricity of $e=1.0001$. Is this comet gravitationally bound to the Sun? What does this value imply about its origin?
3.  Given an orbit with periapsis radius $r_p$ and apoapsis radius $r_a$, derive a formula for the eccentricity $e$ purely in terms of $r_p$ and $r_a$. Verify that your formula gives $e=0$ when $r_p = r_a$.