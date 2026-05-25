## What it is
Kepler's first law states that the orbit of a body around a central mass is a conic section—an ellipse, parabola, or hyperbola. The central mass is not at the center of this path, but at one of its two foci. This law is a direct mathematical consequence of Newton's inverse-square law of universal gravitation.

## Why it matters
This is the geometric foundation of all trajectory design and analysis. Predicting the path of a satellite, planning an interplanetary transfer for a probe like Voyager, or even calculating the rendezvous path for a docking at the ISS requires precise knowledge of the orbit's shape, defined as a conic section. Understanding this allows us to use a few key parameters (like eccentricity and semi-major axis) to describe an entire trajectory.

## When to study it
Before tackling this, you must have a firm grasp of the following:
*   **Newton's Law of Universal Gravitation:** Specifically, the vector form $\vec{F}_g = - \frac{G M m}{r^2} \hat{r}$.
*   **Vector Calculus:** You need to be comfortable with derivatives of vectors, dot products, and cross products.
*   **Polar Coordinates:** The final orbit equation is expressed in polar form, so you must understand the $(r, \theta)$ system.
*   **Second-Order Ordinary Differential Equations:** The derivation involves solving an equation of the form $\ddot{\vec{r}} + \frac{\mu}{r^3}\vec{r} = \vec{0}$.
*   **Geometry of Conic Sections:** You should know the definition of an ellipse, parabola, and hyperbola in terms of focus, directrix, and eccentricity ($e$).

If you are missing any of these, pause and review them. The derivation will be opaque otherwise.

## How to study it (step by step)
1.  **Review Conic Sections:** Spend 30 minutes reviewing the polar equation of a conic section: $r = \frac{p}{1 + e \cos \nu}$. Ensure you understand what the parameters $p$ (semi-latus rectum), $e$ (eccentricity), and $\nu$ (true anomaly) represent geometrically.
2.  **Set up the Two-Body Problem:** Start with Newton's second law, $\vec{F} = m\ddot{\vec{r}}$, and Newton's law of gravitation. Write down the vector differential equation of motion for a small mass $m$ orbiting a large mass $M$.
3.  **Prove Angular Momentum is Conserved:** Take the cross product of the position vector $\vec{r}$ with the equation of motion. Show that this implies $\frac{d}{dt}(\vec{r} \times \dot{\vec{r}}) = \vec{0}$. This proves that the specific angular momentum vector, $\vec{h} = \vec{r} \times \vec{v}$, is constant. This is a crucial step that simplifies the problem to a 2D plane.
4.  **Derive the Orbit Equation:** This is the main derivation. It involves taking the cross product of the equation of motion with $\vec{h}$ and integrating. The result will be an equation relating $\vec{v} \times \vec{h}$ to $\vec{r}$.
5.  **Solve for Position:** Take the dot product of the result from step 4 with $\vec{r}$. Use vector identities (like the vector triple product) to simplify the expression into the final polar form $r = \frac{h^2/\mu}{1 + e \cos \nu}$.
6.  **Interpret the Result:** Match the derived equation to the standard polar form of a conic section from step 1. Identify how eccentricity $e$ and the semi-latus rectum $p$ depend on the physical constants of the orbit (energy and angular momentum).
7.  **Solve a Problem:** Find a standard problem where you are given initial position $\vec{r}_0$ and velocity $\vec{v}_0$ vectors. Calculate the specific angular momentum $\vec{h}$, the eccentricity vector $\vec{e}$, and classify the resulting orbit.

## Key ideas, with intuition
1.  **Central Forces mean Planar Orbits:** The force of gravity on a satellite always points directly toward the central body ($\vec{F} \propto -\hat{r}$). This means there is no torque ($\vec{\tau} = \vec{r} \times \vec{F} = \vec{0}$). Since torque is the rate of change of angular momentum, angular momentum ($\vec{L} = \vec{r} \times m\vec{v}$) must be constant. A constant angular momentum vector means the orbit must lie in a fixed plane perpendicular to that vector. The problem is instantly simplified from 3D to 2D.

2.  **Energy Determines the Shape:** The total specific energy of the orbit, $\mathcal{E} = \frac{v^2}{2} - \frac{\mu}{r}$, is also constant. This single value dictates the type of conic section.
    *   $\mathcal{E} < 0$: The object is gravitationally bound. It doesn't have enough kinetic energy to escape. The orbit is an **ellipse**.
    *   $\mathcal{E} = 0$: The object has the exact minimum kinetic energy needed to escape to infinity with zero velocity. The orbit is a **parabola**.
    *   $\mathcal{E} > 0$: The object has more than enough energy to escape. It will reach infinity with some leftover kinetic energy. The orbit is a **hyperbola**.

3.  **The Orbit Equation is the Answer:** The entire derivation boils down to solving the equation of motion to get this one result:
    $$r(\nu) = \frac{p}{1 + e \cos \nu}$$
    Here, $r$ is the distance from the central body, and $\nu$ is the angle of the orbiting body from the point of closest approach (periapsis). The shape is entirely determined by the eccentricity, $e$.
    *   $e = 0$: Circle (a special ellipse)
    *   $0 < e < 1$: Ellipse
    *   $e = 1$: Parabola
    *   $e > 1$: Hyperbola

4.  **The Eccentricity Vector:** During the derivation, a constant vector called the eccentricity vector, $\vec{e}$, appears. It is defined as:
    $$\vec{e} = \frac{\vec{v} \times \vec{h}}{\mu} - \frac{\vec{r}}{r}$$
    This vector is a mathematical convenience that simplifies the derivation. Its magnitude is the scalar eccentricity $e$, and its direction always points from the central body to the periapsis (point of closest approach).

## Worked example
**Problem:** A spacecraft at a position $\vec{r} = 10000 \hat{i}$ km has a velocity $\vec{v} = 8 \hat{j}$ km/s. The central body is Earth, with gravitational parameter $\mu = 398600$ km³/s². Determine the type of orbit.

**Solution:**

1.  **Calculate Specific Angular Momentum ($\vec{h}$):**
    The specific angular momentum vector is $\vec{h} = \vec{r} \times \vec{v}$.
    $$ \vec{h} = (10000 \hat{i}) \times (8 \hat{j}) = (10000 \times 8) (\hat{i} \times \hat{j}) = 80000 \hat{k} \text{ km²/s} $$
    The magnitude is $h = ||\vec{h}|| = 80000$ km²/s.

2.  **Calculate Specific Energy ($\mathcal{E}$):**
    The specific energy is $\mathcal{E} = \frac{v^2}{2} - \frac{\mu}{r}$.
    First, find the magnitudes $v$ and $r$.
    $r = ||\vec{r}|| = \sqrt{10000^2} = 10000$ km.
    $v = ||\vec{v}|| = \sqrt{8^2} = 8$ km/s.
    Now, calculate $\mathcal{E}$:
    $$ \mathcal{E} = \frac{8^2}{2} - \frac{398600}{10000} = \frac{64}{2} - 39.86 = 32 - 39.86 = -7.86 \text{ km²/s²} $$

3.  **Determine the Orbit Type from Energy:**
    Since the specific energy $\mathcal{E} = -7.86$ is negative, the spacecraft is in a gravitationally bound orbit. The orbit is an **ellipse**.

4.  **Calculate Eccentricity ($e$) for confirmation:**
    We can use the formula relating energy, angular momentum, and eccentricity: $e = \sqrt{1 + \frac{2\mathcal{E}h^2}{\mu^2}}$.
    $$ e = \sqrt{1 + \frac{2(-7.86)(80000)^2}{(398600)^2}} $$
    $$ e = \sqrt{1 + \frac{2(-7.86)(6.4 \times 10^9)}{1.5888 \times 10^{11}}} $$
    $$ e = \sqrt{1 - \frac{1.006 \times 10^{11}}{1.5888 \times 10^{11}}} = \sqrt{1 - 0.633} = \sqrt{0.367} \approx 0.606 $$

**Reflection:**
*   Step 1 worked because the cross product of orthogonal position and velocity vectors is simple and gives the crucial constant $\vec{h}$.
*   Step 2 worked because energy is also conserved, and its sign immediately tells us if the orbit is bound or unbound.
*   Step 3 provided the final answer directly from the sign of the energy.
*   Step 4 confirmed the result. Since $0 < e < 1$, the orbit is indeed an ellipse. The calculation of $e$ gives us the precise shape of that ellipse.

## Diagrams
Here is an ASCII diagram of an elliptical orbit, which is the most common case for satellites.

```text
                 Apoapsis (furthest)
                     *
                    / \
                   /   \
                  /     \
                 /       \
       +---------F-------C--------->  Semi-major axis (a)
      /          .       . \
     /           .       .  \
    *.......................* Periapsis (closest)
    F'                       F (Earth)

    F, F' : Foci of the ellipse
    C     : Center of the ellipse
    The Earth is at one focus (F), NOT the center (C).
    The distance from C to F is c = a*e.
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Kepler's First Law is **FOCAL**." This reminds you that the central body is at the **FOCUS** of the conic section, not the center. This is the single most common mistake.

2.  **Formulas to Overlearn:**
    *   The Orbit Equation: $r = \frac{p}{1 + e \cos \nu}$ (This is the geometric shape).
    *   Eccentricity from Energy: $e = \sqrt{1 + \frac{2\mathcal{E}h^2}{\mu^2}}$ (This links dynamics to geometry).

3.  **Spaced Repetition Schedule:**
    Review the derivation and these formulas at these intervals:
    *   1 day (tomorrow)
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget everything, rebuild it from here:
    *   Start with $\vec{F}=m\vec{a} \implies m\ddot{\vec{r}} = -\frac{G M m}{r^3} \vec{r}$.
    *   Cancel $m$ and define $\mu = GM$. Now you have $\ddot{\vec{r}} + \frac{\mu}{r^3}\vec{r} = \vec{0}$.
    *   Show angular momentum $\vec{h} = \vec{r} \times \dot{\vec{r}}$ is constant. This proves the orbit is planar.
    *   Solve the vector differential equation for $\vec{r}(t)$. The standard trick is to examine $\ddot{\vec{r}} \times \vec{h}$ and integrate. This will lead you back to the orbit equation.

## Common mistakes
1.  **Placing the Earth at the Center:** Students often draw the Earth at the geometric center of the ellipse. It is at one **focus**. The center of the ellipse is empty space.
2.  **Assuming All Orbits are Ellipses:** While most satellite orbits are elliptical, escape trajectories for deep space probes are hyperbolic ($\mathcal{E} > 0$), and the boundary case is parabolic ($\mathcal{E} = 0$). Kepler's law covers all three.
3.  **Algebraic Errors in the Derivation:** The derivation of the orbit equation involves vector triple products ($\vec{A} \times (\vec{B} \times \vec{C})$) and careful integration. It is easy to make a sign error or misapply an identity. Work through it slowly.
4.  **Confusing True Anomaly ($\nu$) with Time:** The orbit equation gives position $r$ as a function of angle $\nu$, not time $t$. Finding position as a function of time (Kepler's Problem) is a separate, more complex challenge.

## Self-check
1.  If a comet's trajectory has an eccentricity $e=1.001$, what is its shape? Will it ever return to the inner solar system? Why?
2.  A satellite has a specific angular momentum of $h = 70000$ km²/s and a specific energy of $\mathcal{E} = -15$ km²/s². Using Earth's $\mu = 398600$ km³/s², calculate its eccentricity and classify the orbit.
3.  How would Kepler's first law change if the law of gravitation were an inverse-cube law ($F \propto 1/r^3$) instead of an inverse-square law? Would orbits still be closed ellipses? (Hint: investigate the stability of the orbit by analyzing the effective potential).