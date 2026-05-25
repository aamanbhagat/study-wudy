## 1. What it is — in plain English

Imagine you're on a skateboard, rolling along. You see a big, heavy truck driving past. If you could somehow grab onto the back of the truck for a moment, let it pull you along, and then let go, what would happen? You'd suddenly be going much faster, having "stolen" some speed from the truck!

A gravity assist, often called a "slingshot" maneuver, is exactly like this, but for spacecraft and planets. Instead of grabbing on, the spacecraft uses the planet's immense gravitational pull to change its speed and direction.

The planet acts like a moving ramp or a moving paddle. As the spacecraft approaches the planet, it speeds up due to the planet's gravity. Then, as it swings around and leaves the planet, it slows down relative to the planet, but because the planet itself is moving very fast around the Sun, the spacecraft ends up with a significantly different velocity relative to the Sun.

Crucially, the planet barely feels this interaction because it's so much more massive than the spacecraft. It's like the truck barely noticing the skateboarder. This allows us to "borrow" speed and direction changes for free, without using precious rocket fuel.

## 2. Why it matters — real-world applications

Gravity assists are not just theoretical; they are absolutely fundamental to deep-space exploration. Without them, many of our most ambitious missions would be impossible or prohibitively expensive.

1.  **Deep Space Probes (Voyager, Cassini, Galileo, New Horizons):** These iconic missions to the outer solar system extensively used gravity assists. Voyager 1 and 2, for instance, used a "Grand Tour" sequence of gravity assists from Jupiter, Saturn, Uranus, and Neptune to reach the far reaches of our solar system and achieve escape velocity from the Sun, sending them into interstellar space. Cassini used Venus, Earth, and Jupiter to build up enough speed to reach Saturn. New Horizons used Jupiter to accelerate towards Pluto, drastically shortening its travel time.
2.  **Fuel Efficiency and Cost Savings:** Launching a spacecraft with enough fuel to accelerate directly to the speeds needed for outer planet missions would require an enormous and incredibly expensive rocket, often exceeding current capabilities. Gravity assists provide a "free" boost in velocity, saving tons of fuel and making missions feasible with existing launch vehicles.
3.  **Reducing Travel Time:** By increasing a spacecraft's speed, gravity assists significantly cut down the time it takes to reach distant targets. This is vital for mission longevity, as spacecraft components degrade over time, and for scientific return, allowing data to be gathered sooner.
4.  **Changing Orbital Inclination:** Gravity assists aren't just for speeding up or slowing down. They can also be used to change the plane of a spacecraft's orbit. For example, the Ulysses mission used a Jupiter gravity assist to swing out of the ecliptic plane and study the Sun's poles, something very difficult to achieve directly.

## 3. Prerequisites — what you must know first

Before diving into gravity assists, ensure you have a solid grasp of these foundational concepts:

*   **Newton's Laws of Motion and Universal Gravitation:** The basic principles governing force, mass, acceleration ($F=ma$), and gravitational attraction ($F = G\frac{m_1 m_2}{r^2}$).
*   **Conservation Laws:** Especially conservation of energy and conservation of angular momentum. These are paramount in understanding orbital mechanics.
*   **Vectors:** How to represent quantities with both magnitude and direction, and how to perform vector addition and subtraction.
*   **Relative Velocity:** Understanding how velocities change when viewed from different frames of reference (e.g., velocity of A relative to B, velocity of A relative to C, and velocity of B relative to C).
*   **Two-Body Problem:** The analytical solution for the motion of two point masses under mutual gravitational attraction, leading to conic section trajectories.
*   **Orbital Mechanics Basics:**
    *   **Conic Sections:** Understanding elliptical, parabolic, and hyperbolic orbits.
    *   **Orbital Elements:** Parameters like semi-major axis ($a$), eccentricity ($e$), inclination ($i$), etc.
    *   **Specific Energy ($\mathcal{E}$):** The total energy per unit mass of a spacecraft in orbit ($\mathcal{E} = \frac{v^2}{2} - \frac{\mu}{r}$).
    *   **Specific Angular Momentum ($\vec{h}$):** The angular momentum per unit mass.
    *   **Escape Velocity:** The minimum speed needed to escape the gravitational pull of a body.
    *   **Hyperbolic Excess Velocity ($v_\infty$):** The speed a spacecraft would have if it were infinitely far from a body, having just barely escaped its gravity. This is a critical concept for gravity assists.

## 4. The core idea — step by step

The core idea behind a gravity assist relies on a clever simplification called the "patched conic approximation" and a careful understanding of relative velocities.

### ### Step 1: The "Patched Conic" Approximation

*   **Plain English:** The real universe is incredibly complex, with countless celestial bodies all pulling on each other. Calculating the exact path of a spacecraft under all these influences (an "N-body problem") is computationally intensive and often intractable analytically. So, we simplify! We pretend that at any given time, the spacecraft is only significantly influenced by *one* major body.
    *   When the spacecraft is far from a planet (e.g., traveling from Earth to Jupiter), we assume it's only orbiting the Sun.
    *   When it gets close enough to a planet, we switch our perspective and assume it's only orbiting *that planet*, ignoring the Sun's influence for a short time.
    *   Once it leaves the planet's vicinity, we switch back to considering it only orbiting the Sun.
*   **Small Concrete Example:** Imagine a space probe traveling from Earth to Jupiter. For most of its journey, we calculate its path as an ellipse around the Sun. When it gets within a certain distance of Jupiter, we "patch" its trajectory to a hyperbola around Jupiter. After it swings past Jupiter, we "patch" back to an ellipse (or hyperbola) around the Sun.
*   **Formal/Mathematical Version:** This simplification relies on the concept of the **Sphere of Influence (SOI)**. The SOI is a theoretical region around a celestial body where its gravitational pull is dominant over that of other, more distant, massive bodies (like the Sun). The radius of the SOI ($r_{\text{SOI}}$) for a planet orbiting the Sun is often approximated by:
    $$r_{\text{SOI}} = R_{\text{planet-Sun}} \left( \frac{m_{\text{planet}}}{m_{\text{Sun}}} \right)^{2/5}$$
    where $R_{\text{planet-Sun}}$ is the distance from the planet to the Sun, $m_{\text{planet}}$ is the mass of the planet, and $m_{\text{Sun}}$ is the mass of the Sun.
    Inside the SOI, we treat the spacecraft as being in a two-body orbit around the planet. Outside the SOI, we treat it as being in a two-body orbit around the Sun.
*   **What Could Go Wrong:** The patched conic approximation is an approximation! It ignores the subtle, continuous gravitational tugs from other bodies, known as "third-body perturbations." For precise trajectories, numerical integration of the N-body problem is required, but for understanding the mechanics of gravity assist, patched conics are incredibly powerful and accurate enough.

### ### Step 2: The Encounter in the Planet's Frame

*   **Plain English:** To understand how the spacecraft's speed changes, it's easiest to imagine you're sitting on the planet, watching the spacecraft fly by. From your perspective on the planet, the planet isn't moving. The spacecraft approaches, swings around you, and then flies away.
*   **Small Concrete Example:** Imagine you're standing on the sidewalk, and a car drives past you. From your point of view, the car approaches, passes, and recedes. You don't feel the Earth moving under your feet, so the car's motion is relative to you, a "stationary" observer.
*   **Formal/Mathematical Version:** We switch to a **planet-centered inertial frame of reference**. In this frame, the planet is considered stationary. The spacecraft's velocity relative to the planet is denoted as $\vec{v}_{\text{rel}}$. When the spacecraft enters the planet's SOI, its trajectory relative to the planet is a **hyperbola**. This is because the spacecraft typically has enough energy to escape the planet's gravity if the planet were isolated (i.e., its specific energy relative to the planet is positive).
*   **What Could Go Wrong:** Forgetting to switch frames, or confusing velocities in the Sun's frame with velocities in the planet's frame. This is the most common source of error in gravity assist calculations.

### ### Step 3: The Velocity Vector at Infinity ($v_\infty$)

*   **Plain English:** In the planet's frame, the spacecraft approaches the planet from "infinity" (meaning, from very far away, effectively outside the SOI) with a certain velocity. After it swings around the planet, it departs towards "infinity" with another velocity. This velocity, which is its speed relative to the planet when it's far enough away that the planet's gravity is negligible, is called the "hyperbolic excess velocity" or simply $v_\infty$ (pronounced "v-infinity").
*   **Small Concrete Example:** Think of a spaceship that's just barely escaping Earth's gravity. As it gets further and further away, its speed relative to Earth approaches a constant value. That constant value is its $v_\infty$. For a gravity assist, the spacecraft *enters* the planet's SOI with a certain $v_\infty$ and *leaves* with a $v_\infty$ of the same magnitude but different direction.
*   **Formal/Mathematical Version:** For a hyperbolic trajectory, the specific energy $\mathcal{E}$ is positive: $\mathcal{E} = \frac{v^2}{2} - \frac{\mu}{r} > 0$. As $r \to \infty$, the term $\frac{\mu}{r} \to 0$. Thus, the velocity at infinity, $v_\infty$, is defined by:
    $$\mathcal{E} = \frac{v_\infty^2}{2}$$
    Therefore, $v_\infty = \sqrt{2\mathcal{E}}$. This $v_\infty$ vector (both magnitude and direction) is the crucial link between the heliocentric (Sun-centered) trajectory and the planetocentric (planet-centered) trajectory.
    The incoming $v_\infty$ vector relative to the planet, $\vec{v}_{\infty, \text{in}}$, is related to the spacecraft's heliocentric velocity $\vec{v}_{\text{sc, in}}$ and the planet's heliocentric velocity $\vec{v}_{\text{planet}}$ just before entering the SOI:
    $$\vec{v}_{\infty, \text{in}} = \vec{v}_{\text{sc, in}} - \vec{v}_{\text{planet}}$$
    Similarly, for the outgoing $v_\infty$ vector:
    $$\vec{v}_{\infty, \text{out}} = \vec{v}_{\text{sc, out}} - \vec{v}_{\text{planet}}$$
*   **What Could Go Wrong:** Confusing $v_\infty$ with the spacecraft's actual speed while it's close to the planet, or with the planet's escape velocity. $v_\infty$ is a *relative* velocity, specifically the asymptotic velocity of the hyperbola.

### ### Step 4: The Change in Direction (and Speed Magnitude in the Planet Frame)

*   **Plain English:** As the spacecraft sweeps around the planet, the planet's gravity bends its path. From the perspective of someone on the planet, the spacecraft's speed *relative to the planet* does not change. It approaches at $v_\infty$ and leaves at the *same speed* $v_\infty$. However, its *direction* of travel relative to the planet changes. This change in direction is the "slingshot" effect.
*   **Small Concrete Example:** Imagine a satellite in a circular orbit around Earth. Its speed is constant, but its direction is continuously changing, causing it to orbit. For a gravity assist, the spacecraft is on an "open" hyperbolic path, so it doesn't orbit, but its direction still changes as it passes the planet.
*   **Formal/Mathematical Version:** In the planet's frame, the specific energy $\mathcal{E}$ and specific angular momentum $\vec{h}$ of the spacecraft relative to the planet are conserved throughout the hyperbolic encounter. Since $\mathcal{E} = v_\infty^2/2$, the magnitude of $v_\infty$ *must* remain constant in the planet's frame. What changes is the direction of the $v_\infty$ vector. The angle through which the $v_\infty$ vector is turned is called the **deflection angle** or **turn angle**, denoted by $\delta$. For a hyperbolic trajectory, this angle is given by:
    $$\delta = 2 \arcsin \left( \frac{1}{e} \right)$$
    where $e$ is the eccentricity of the hyperbolic trajectory. The eccentricity for a hyperbola is $e = 1 + \frac{r_p v_\infty^2}{\mu_{\text{planet}}}$, where $r_p$ is the periapsis distance (closest approach to the planet's center) and $\mu_{\text{planet}} = G m_{\text{planet}}$.
    Alternatively, the turn angle can be expressed as:
    $$\delta = 2 \arctan \left( \frac{\mu_{\text{planet}}}{r_p v_\infty^2} \right)$$
    The maximum possible turn angle is $180^\circ$ (if $r_p$ approaches the planet's surface), but practically, it's less due to the planet's physical size.
*   **What Could Go Wrong:** A common misconception is that the magnitude of $v_\infty$ changes in the planet's frame. It does *not*. Only its direction changes. The change in speed (relative to the Sun) comes from adding this deflected $v_\infty$ vector to the planet's velocity vector.

### ### Step 5: Transforming Back to the Sun's Frame

*   **Plain English:** We've seen how the spacecraft's path is bent relative to the planet. Now, let's put the planet back into motion around the Sun. The actual velocity of the spacecraft relative to the Sun after the assist is the vector sum of its new relative velocity (relative to the planet) and the planet's velocity (relative to the Sun). This is where the magic happens – the "free" energy change.
*   **Small Concrete Example:** Imagine you're on a moving train. You throw a ball forward. Relative to you, the ball's speed is, say, 10 mph. But relative to someone standing on the ground, the ball's speed is 10 mph plus the train's speed. If you throw the ball backward, its speed relative to the ground is the train's speed minus 10 mph. The same principle applies here, but with vectors.
*   **Formal/Mathematical Version:** This is a straightforward vector addition.
    The spacecraft's velocity relative to the Sun *before* the assist is:
    $$\vec{v}_{\text{sc, pre-assist}} = \vec{v}_{\infty, \text{in}} + \vec{v}_{\text{planet}}$$
    The spacecraft's velocity relative to the Sun *after* the assist is:
    $$\vec{v}_{\text{sc, post-assist}} = \vec{v}_{\infty, \text{out}} + \vec{v}_{\text{planet}}$$
    Since $|\vec{v}_{\infty, \text{in}}| = |\vec{v}_{\infty, \text{out}}| = v_\infty$, the change in the spacecraft's speed relative to the Sun depends entirely on the direction of $\vec{v}_{\infty, \text{out}}$ relative to $\vec{v}_{\text{planet}}$. If $\vec{v}_{\infty, \text{out}}$ is more aligned with $\vec{v}_{\text{planet}}$, the spacecraft gains speed. If it's anti-aligned, it loses speed.
*   **What Could Go Wrong:** Incorrectly performing vector addition or subtraction. Forgetting that $\vec{v}_{\text{planet}}$ is a vector and has both magnitude and direction, and its direction is generally perpendicular to the radius vector from the Sun for a circular orbit.

### ### Step 6: The Energy Gain/Loss

*   **Plain English:** The change in the spacecraft's speed (and thus its kinetic energy) relative to the Sun means it has either gained or lost energy. Where does this energy come from? It's "stolen" from or "given" to the planet. Because the planet is vastly more massive, its own speed and orbital energy change by an infinitesimally tiny amount that is practically unmeasurable. It's like a fly hitting a truck – the fly's velocity changes dramatically, the truck's velocity changes by an imperceptible amount.
*   **Small Concrete Example:** If a spacecraft gains 1 km/s in speed relative to the Sun, its kinetic energy increases. This energy must come from somewhere, and in this case, it comes from the planet's orbital energy.
*   **Formal/Mathematical Version:** The specific energy of the spacecraft relative to the Sun is $\mathcal{E}_{\text{Sun}} = \frac{v_{\text{sc, Sun}}^2}{2} - \frac{\mu_{\text{Sun}}}{r_{\text{sc, Sun}}}$. A change in $v_{\text{sc, Sun}}$ directly impacts $\mathcal{E}_{\text{Sun}}$. The change in specific energy for the spacecraft is:
    $$\Delta \mathcal{E}_{\text{sc}} = \mathcal{E}_{\text{sc, post-assist}} - \mathcal{E}_{\text{sc, pre-assist}}$$
    This change in energy is precisely matched by an equal and opposite change in the planet's orbital energy. The total energy of the Sun-planet-spacecraft system is conserved.
    The change in the *magnitude* of the spacecraft's heliocentric velocity is approximately:
    $$\Delta v_{\text{sc, Sun}} \approx 2 v_\infty \sin(\delta/2)$$
    This approximation holds for certain geometries. The exact change is found by calculating the magnitudes of the pre- and post-assist vectors.
*   **What Could Go Wrong:** Thinking that the gravity assist somehow creates energy, or that it's a perpetual motion machine. It's a transfer of energy and momentum within the system.

## 5. Worked examples — multiple, with every step shown

Let's work through some examples to solidify these concepts. We'll simplify to 1D motion for the first example to build intuition, then move to 2D. Assume circular planetary orbits for simplicity unless stated otherwise.

**Given Constants:**
*   Gravitational parameter of the Sun: $\mu_{\text{Sun}} = 1.327 \times 10^{11} \text{ km}^3/\text{s}^2$
*   Gravitational parameter of Jupiter: $\mu_{\text{Jupiter}} = 1.267 \times 10^8 \text{ km}^3/\text{s}^2$
*   Gravitational parameter of Earth: $\mu_{\text{Earth}} = 3.986 \times 10^5 \text{ km}^3/\text{s}^2$
*   Jupiter's orbital radius (approx): $R_{\text{Jupiter}} = 7.78 \times 10^8 \text{ km}$
*   Earth's orbital radius (approx): $R_{\text{Earth}} = 1.496 \times 10^8 \text{ km}$
*   Jupiter's radius: $R_{\text{Jup}} = 71492 \text{ km}$
*   Earth's radius: $R_{\text{Earth, surf}} = 6378 \text{ km}$

### Example 1: Simple 1D Slingshot (Speed Boost)

**Problem Statement:**
A spacecraft is approaching Jupiter from "behind" (in the same direction as Jupiter's motion) along a path that brings it close to Jupiter. Jupiter is moving at $13.06 \text{ km/s}$ relative to the Sun. The spacecraft's velocity relative to the Sun before the assist is $10 \text{ km/s}$. The spacecraft passes Jupiter such that its $v_\infty$ relative to Jupiter is $5 \text{ km/s}$ and it undergoes a full $180^\circ$ deflection (a "U-turn") relative to Jupiter. What is the spacecraft's velocity relative to the Sun after the assist? Assume all motion is in a straight line for simplicity.

**What's Given:**
*   $\vec{v}_{\text{Jupiter}} = +13.06 \text{ km/s}$ (relative to Sun, positive direction)
*   $\vec{v}_{\text{sc, pre-assist}} = +10 \text{ km/s}$ (relative to Sun, positive direction)
*   $v_\infty = 5 \text{ km/s}$ (magnitude of relative velocity at infinity)
*   Deflection angle $\delta = 180^\circ$ (relative to Jupiter)

**What We Want:**
*   $\vec{v}_{\text{sc, post-assist}}$ (velocity of spacecraft relative to Sun after assist)

**Solution:**

1.  **Calculate the incoming $v_\infty$ vector (relative to Jupiter):**
    The spacecraft's velocity relative to Jupiter before the assist is found by subtracting Jupiter's velocity from the spacecraft's velocity, both in the Sun's frame.
    $$\vec{v}_{\infty, \text{in}} = \vec{v}_{\text{sc, pre-assist}} - \vec{v}_{\text{Jupiter}}$$
    $$\vec{v}_{\infty, \text{in}} = (+10 \text{ km/s}) - (+13.06 \text{ km/s})$$
    $$\vec{v}_{\infty, \text{in}} = -3.06 \text{ km/s}$$
    *Explanation:* This tells us that from Jupiter's perspective, the spacecraft is approaching from the "front" (opposite to Jupiter's motion) at $3.06 \text{ km/s}$. However, the problem states $v_\infty = 5 \text{ km/s}$ and implies the spacecraft approaches from behind and gets a boost. This discrepancy means the problem's given $v_\infty$ is a *magnitude* and implies a different approach geometry than a simple head-on collision. Let's re-read the problem statement carefully: "The spacecraft passes Jupiter such that its $v_\infty$ relative to Jupiter is $5 \text{ km/s}$". This means we are given the *magnitude* of the relative velocity, and we need to use this specific value. The initial relative velocity $\vec{v}_{\text{sc, pre-assist}} - \vec{v}_{\text{Jupiter}}$ is *not* necessarily the $v_\infty$ that defines the hyperbolic trajectory unless the spacecraft is already at infinity relative to Jupiter. Let's assume the problem means the specific hyperbolic trajectory has a $v_\infty$ of $5 \text{ km/s}$ and the initial heliocentric velocity is just a point of reference. This is a common simplification in introductory problems.

    Let's use the given $v_\infty = 5 \text{ km/s}$ as the magnitude of the relative velocity for the hyperbolic trajectory.

2.  **Determine the outgoing $v_\infty$ vector (relative to Jupiter):**
    The problem states a $180^\circ$ deflection. This means the direction of the relative velocity vector reverses, but its magnitude remains the same.
    $$|\vec{v}_{\infty, \text{out}}| = |\vec{v}_{\infty, \text{in}}| = v_\infty = 5 \text{ km/s}$$
    Since the deflection is $180^\circ$, if the incoming relative velocity was in one direction, the outgoing relative velocity is in the exact opposite direction.
    If we assume the incoming relative velocity was $-5 \text{ km/s}$ (i.e., approaching Jupiter from the "front"), then after a $180^\circ$ turn, the outgoing relative velocity would be $+5 \text{ km/s}$ (moving away from Jupiter in the direction of Jupiter's motion).
    Let's assume the problem implicitly defines the incoming relative velocity such that the $180^\circ$ turn results in a speed boost. For a speed boost, the spacecraft must pass *behind* the planet, meaning its relative velocity vector reverses from being against the planet's motion to with the planet's motion.
    So, if $\vec{v}_{\infty, \text{in}}$ was $-5 \text{ km/s}$ (relative to Jupiter), then $\vec{v}_{\infty, \text{out}}$ will be $+5 \text{ km/s}$.

    *Explanation:* The magnitude of the spacecraft's velocity relative to the planet remains constant during the hyperbolic pass. Only its direction changes. A $180^\circ$ deflection means the spacecraft essentially turns around relative to the planet.

3.  **Calculate the spacecraft's velocity relative to the Sun after the assist:**
    Now, we switch back to the Sun's frame by adding Jupiter's velocity.
    $$\vec{v}_{\text{sc, post-assist}} = \vec{v}_{\infty, \text{out}} + \vec{v}_{\text{Jupiter}}$$
    $$\vec{v}_{\text{sc, post-assist}} = (+5 \text{ km/s}) + (+13.06 \text{ km/s})$$
    $$\vec{v}_{\text{sc, post-assist}} = +18.06 \text{ km/s}$$

    *Explanation:* We vector-add the outgoing relative velocity (which is with Jupiter's motion) to Jupiter's velocity (relative to the Sun) to get the final velocity of the spacecraft relative to the Sun.

**Final Answer:**
The spacecraft's velocity relative to the Sun after the assist is $\boxed{\mathbf{18.06 \text{ km/s}}}$.

*Reflection:* This example highlights the core principle: the planet's velocity is added to the *deflected* relative velocity vector. The tricky part here was interpreting the initial $v_\infty$ and the $180^\circ$ turn in a 1D context to result in a speed gain. For a speed gain, the spacecraft must pass "behind" the planet, meaning its relative velocity reverses from opposing the planet's motion to aligning with it.

### Example 2: 2D Slingshot (Speed Boost and Direction Change)

**Problem Statement:**
A spacecraft approaches Jupiter (moving at $13.06 \text{ km/s}$ along the +X axis relative to the Sun) with an incoming $v_\infty$ vector relative to Jupiter of $\vec{v}_{\infty, \text{in}} = (0, -5) \text{ km/s}$. The spacecraft performs a gravity assist, deflecting its $v_\infty$ vector by an angle of $\delta = 90^\circ$ counter-clockwise. What is the spacecraft's velocity relative to the Sun after the assist?

**What's Given:**
*   $\vec{v}_{\text{Jupiter}} = (13.06, 0) \text{ km/s}$ (relative to Sun)
*   $\vec{v}_{\infty, \text{in}} = (0, -5) \text{ km/s}$ (relative to Jupiter)
*   Deflection angle $\delta = 90^\circ$ counter-clockwise (relative to Jupiter)

**What We Want:**
*   $\vec{v}_{\text{sc, post-assist}}$ (velocity of spacecraft relative to Sun after assist)

**Solution:**

1.  **Determine the magnitude of $v_\infty$:**
    The magnitude of the incoming $v_\infty$ vector is:
    $$|\vec{v}_{\infty, \text{in}}| = \sqrt{0^2 + (-5)^2} = 5 \text{ km/s}$$
    *Explanation:* This is the magnitude of the hyperbolic excess velocity, which remains constant in the planet's frame.

2.  **Calculate the outgoing $v_\infty$ vector (relative to Jupiter):**
    The incoming vector is $\vec{v}_{\infty, \text{in}} = (0, -5)$. This vector points along the negative Y-axis.
    A $90^\circ$ counter-clockwise rotation means we rotate this vector.
    A rotation matrix for an angle $\theta$ is:
    $$R(\theta) = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$$
    For $\theta = 90^\circ$:
    $$R(90^\circ) = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$$
    So, $\vec{v}_{\infty, \text{out}} = R(90^\circ) \vec{v}_{\infty, \text{in}}$:
    $$\vec{v}_{\infty, \text{out}} = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} 0 \\ -5 \end{pmatrix} = \begin{pmatrix} (0)(0) + (-1)(-5) \\ (1)(0) + (0)(-5) \end{pmatrix} = \begin{pmatrix} 5 \\ 0 \end{pmatrix} \text{ km/s}$$
    So, $\vec{v}_{\infty, \text{out}} = (5, 0) \text{ km/s}$.

    *Explanation:* The spacecraft's path relative to Jupiter bends. The magnitude of its relative velocity stays $5 \text{ km/s}$, but its direction changes by $90^\circ$ counter-clockwise.

3.  **Calculate the spacecraft's velocity relative to the Sun after the assist:**
    Add the outgoing relative velocity vector to Jupiter's velocity vector.
    $$\vec{v}_{\text{sc, post-assist}} = \vec{v}_{\infty, \text{out}} + \vec{v}_{\text{Jupiter}}$$
    $$\vec{v}_{\text{sc, post-assist}} = (5, 0) \text{ km/s} + (13.06, 0) \text{ km/s}$$
    $$\vec{v}_{\text{sc, post-assist}} = (5+13.06, 0+0) \text{ km/s}$$
    $$\vec{v}_{\text{sc, post-assist}} = (18.06, 0) \text{ km/s}$$

    *Explanation:* This is the final velocity vector of the spacecraft in the Sun's frame, obtained by summing the deflected relative velocity with the planet's velocity.

**Final Answer:**
The spacecraft's velocity relative to the Sun after the assist is $\boxed{\mathbf{(18.06, 0) \text{ km/s}}}$.

*Reflection:* This example shows how vector addition works in 2D. The spacecraft not only gained speed (from $v_{sc,pre} = \sqrt{0^2 + (-5)^2 + 13.06^2} = \sqrt{25+13.06^2} \approx 13.99 \text{ km/s}$ to $18.06 \text{ km/s}$), but also had its direction of motion aligned with Jupiter's. The tricky part is correctly applying the rotation to the vector.

### Example 3: 2D Slingshot (Braking Maneuver)

**Problem Statement:**
A spacecraft approaches Jupiter (moving at $13.06 \text{ km/s}$ along the +X axis relative to the Sun) with an incoming $v_\infty$ vector relative to Jupiter of $\vec{v}_{\infty, \text{in}} = (5, 0) \text{ km/s}$. The spacecraft performs a gravity assist, deflecting its $v_\infty$ vector by an angle of $\delta = 90^\circ$ clockwise. What is the spacecraft's velocity relative to the Sun after the assist?

**What's Given:**
*   $\vec{v}_{\text{Jupiter}} = (13.06, 0) \text{ km/s}$ (relative to Sun)
*   $\vec{v}_{\infty, \text{in}} = (5, 0) \text{ km/s}$ (relative to Jupiter)
*   Deflection angle $\delta = 90^\circ$ clockwise (relative to Jupiter)

**What We Want:**
*   $\vec{v}_{\text{sc, post-assist}}$ (velocity of spacecraft relative to Sun after assist)

**Solution:**

1.  **Determine the magnitude of $v_\infty$:**
    The magnitude of the incoming $v_\infty$ vector is:
    $$|\vec{v}_{\infty, \text{in}}| = \sqrt{5^2 + 0^2} = 5 \text{ km/s}$$
    *Explanation:* Again, this magnitude remains constant.

2.  **Calculate the outgoing $v_\infty$ vector (relative to Jupiter):**
    The incoming vector is $\vec{v}_{\infty, \text{in}} = (5, 0)$. This vector points along the positive X-axis.
    A $90^\circ$ clockwise rotation (which is $-90^\circ$ counter-clockwise) means we rotate this vector.
    For $\theta = -90^\circ$:
    $$R(-90^\circ) = \begin{pmatrix} \cos(-90^\circ) & -\sin(-90^\circ) \\ \sin(-90^\circ) & \cos(-90^\circ) \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$$
    So, $\vec{v}_{\infty, \text{out}} = R(-90^\circ) \vec{v}_{\infty, \text{in}}$:
    $$\vec{v}_{\infty, \text{out}} = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix} \begin{pmatrix} 5 \\ 0 \end{pmatrix} = \begin{pmatrix} (0)(5) + (1)(0) \\ (-1)(5) + (0)(0) \end{pmatrix} = \begin{pmatrix} 0 \\ -5 \end{pmatrix} \text{ km/s}$$
    So, $\vec{v}_{\infty, \text{out}} = (0, -5) \text{ km/s}$.

    *Explanation:* The relative velocity vector is now pointing in the negative Y direction, having turned $90^\circ$ clockwise.

3.  **Calculate the spacecraft's velocity relative to the Sun after the assist:**
    Add the outgoing relative velocity vector to Jupiter's velocity vector.
    $$\vec{v}_{\text{sc, post-assist}} = \vec{v}_{\infty, \text{out}} + \vec{v}_{\text{Jupiter}}$$
    $$\vec{v}_{\text{sc, post-assist}} = (0, -5) \text{ km/s} + (13.06, 0) \text{ km/s}$$
    $$\vec{v}_{\text{sc, post-assist}} = (0+13.06, -5+0) \text{ km/s}$$
    $$\vec{v}_{\text{sc, post-assist}} = (13.06, -5) \text{ km/s}$$

    *Explanation:* This is the final velocity vector of the spacecraft in the Sun's frame.

**Final Answer:**
The spacecraft's velocity relative to the Sun after the assist is $\boxed{\mathbf{(13.06, -5) \text{ km/s}}}$.

*Reflection:* In this case, the initial heliocentric speed was $v_{sc,pre} = \sqrt{5^2 + 13.06^2} \approx 13.99 \text{ km/s}$. The final heliocentric speed is $\sqrt{13.06^2 + (-5)^2} \approx 13.99 \text{ km/s}$. Wait, the speed didn't change! This is because the deflection angle was $90^\circ$. For a pure speed change, the deflection needs to be more aligned or anti-aligned with the planet's velocity. This example primarily shows a change in direction. To achieve braking, the outgoing $v_\infty$ vector would typically be anti-aligned with the planet's velocity. Let's adjust the problem for a clear braking example.

### Example 3 (Revised): 2D Slingshot (Braking Maneuver for Speed Reduction)

**Problem Statement:**
A spacecraft approaches Jupiter (moving at $13.06 \text{ km/s}$ along the +X axis relative to the Sun) with an incoming $v_\infty$ vector relative to Jupiter of $\vec{v}_{\infty, \text{in}} = (5, 0) \text{ km/s}$. The spacecraft performs a gravity assist, deflecting its $v_\infty$ vector by an angle of $\delta = 180^\circ$ (reversing its direction relative to Jupiter). What is the spacecraft's velocity relative to the Sun after the assist?

**What's Given:**
*   $\vec{v}_{\text{Jupiter}} = (13.06, 0) \text{ km/s}$ (relative to Sun)
*   $\vec{v}_{\infty, \text{in}} = (5, 0) \text{ km/s}$ (relative to Jupiter)
*   Deflection angle $\delta = 180^\circ$ (reverses direction relative to Jupiter)

**What We Want:**
*   $\vec{v}_{\text{sc, post-assist}}$ (velocity of spacecraft relative to Sun after assist)

**Solution:**

1.  **Determine the magnitude of $v_\infty$:**
    $$|\vec{v}_{\infty, \text{in}}| = \sqrt{5^2 + 0^2} = 5 \text{ km/s}$$
    *Explanation:* Magnitude of relative velocity is constant.

2.  **Calculate the outgoing $v_\infty$ vector (relative to Jupiter):**
    The incoming vector is $\vec{v}_{\infty, \text{in}} = (5, 0)$. A $180^\circ$ deflection means the vector reverses direction.
    $$\vec{v}_{\infty, \text{out}} = -\vec{v}_{\infty, \text{in}} = (-5, 0) \text{ km/s}$$
    *Explanation:* A $180^\circ$ turn simply flips the direction of the relative velocity vector.

3.  **Calculate the spacecraft's velocity relative to the Sun after the assist:**
    Add the outgoing relative velocity vector to Jupiter's velocity vector.
    $$\vec{v}_{\text{sc, post-assist}} = \vec{v}_{\infty, \text{out}} + \vec{v}_{\text{Jupiter}}$$
    $$\vec{v}_{\text{sc, post-assist}} = (-5, 0) \text{ km/s} + (13.06, 0) \text{ km/s}$$
    $$\vec{v}_{\text{sc, post-assist}} = (-5+13.06, 0+0) \text{ km/s}$$
    $$\vec{v}_{\text{sc, post-assist}} = (8.06, 0) \text{ km/s}$$

    *Explanation:* The final velocity in the Sun's frame is the sum of the reversed relative velocity and the planet's velocity.

**Final Answer:**
The spacecraft's velocity relative to the Sun after the assist is $\boxed{\mathbf{(8.06, 0) \text{ km/s}}}$.

*Reflection:* This example clearly shows a braking maneuver. The initial heliocentric speed was $v_{sc,pre} = \sqrt{5^2 + 13.06^2} \approx 13.99 \text{ km/s}$. The final heliocentric speed is $8.06 \text{ km/s}$. This significant reduction in speed is achieved by having the spacecraft pass "in front" of the planet, effectively pushing against the planet's motion and transferring energy to it.

### Example 4: Calculating Turn Angle and Specific Energy Change

**Problem Statement:**
A spacecraft approaches Jupiter with an incoming $v_\infty$ of $8 \text{ km/s}$. It performs a gravity assist, aiming for a periapsis distance $r_p = 1.5 \times 10^5 \text{ km}$ from Jupiter's center. Calculate the deflection angle ($\delta$) of the $v_\infty$ vector in Jupiter's frame. If Jupiter's velocity relative to the Sun is $13.06 \text{ km/s}$ (along +X) and the incoming $v_\infty$ is $(0, -8) \text{ km/s}$, what is the change in the spacecraft's specific energy relative to the Sun after the assist?

**What's Given:**
*   $v_\infty = 8 \text{ km/s}$ (magnitude of relative velocity at infinity)
*   $r_p = 1.5 \times 10^5 \text{ km}$ (periapsis distance from Jupiter's center)
*   $\mu_{\text{Jupiter}} = 1.267 \times 10^8 \text{ km}^3/\text{s}^2$
*   $\vec{v}_{\text{Jupiter}} = (13.06, 0) \text{ km/s}$ (relative to Sun)
*   $\vec{v}_{\infty, \text{in}} = (0, -8) \text{ km/s}$ (relative to Jupiter)

**What We Want:**
*   Deflection angle $\delta$
*   Change in specific energy relative to the Sun, $\Delta \mathcal{E}_{\text{Sun}}$

**Solution:**

1.  **Calculate the deflection angle ($\delta$):**
    We use the formula for the turn angle:
    $$\delta = 2 \arctan \left( \frac{\mu_{\text{Jupiter}}}{r_p v_\infty^2} \right)$$
    Plug in the values:
    $$\delta = 2 \arctan \left( \frac{1.267 \times 10^8 \text{ km}^3/\text{s}^2}{(1.5 \times 10^5 \text{ km}) (8 \text{ km/s})^2} \right)$$
    $$\delta = 2 \arctan \left( \frac{1.267 \times 10^8}{1.5 \times 10^5 \times 64} \right)$$
    $$\delta = 2 \arctan \left( \frac{1.267 \times 10^8}{9.6 \times 10^6} \right)$$
    $$\delta = 2 \arctan (13.1979)$$
    $$\delta = 2 \times 85.64^\circ$$
    $$\delta = 171.28^\circ$$

    *Explanation:* The periapsis distance and $v_\infty$ determine how sharply the spacecraft's path is bent by the planet's gravity. A smaller $r_p$ or larger $v_\infty$ leads to a larger deflection.

2.  **Calculate the outgoing $v_\infty$ vector (relative to Jupiter):**
    The incoming vector is $\vec{v}_{\infty, \text{in}} = (0, -8) \text{ km/s}$. Its angle is $-90^\circ$ (or $270^\circ$).
    The deflection angle is $\delta = 171.28^\circ$. We need to specify the direction of deflection. For a speed boost, the spacecraft generally passes behind the planet, so the turn is "away" from the planet's velocity vector. Let's assume a counter-clockwise turn for simplicity in calculation, which means the final angle is $-90^\circ + 171.28^\circ = 81.28^\circ$.
    The magnitude of $\vec{v}_{\infty, \text{out}}$ is still $8 \text{ km/s}$.
    $$\vec{v}_{\infty, \text{out}} = (v_\infty \cos(\theta_{\text{out}}), v_\infty \sin(\theta_{\text{out}}))$$
    $$\vec{v}_{\infty, \text{out}} = (8 \cos(81.28^\circ), 8 \sin(81.28^\circ))$$
    $$\vec{v}_{\infty, \text{out}} \approx (8 \times 0.151, 8 \times 0.988)$$
    $$\vec{v}_{\infty, \text{out}} \approx (1.208, 7.904) \text{ km/s}$$

    *Explanation:* We rotate the incoming $v_\infty$ vector by the calculated deflection angle to get the outgoing $v_\infty$ vector.

3.  **Calculate the spacecraft's velocity relative to the Sun *before* the assist:**
    $$\vec{v}_{\text{sc, pre-assist}} = \vec{v}_{\infty, \text{in}} + \vec{v}_{\text{Jupiter}}$$
    $$\vec{v}_{\text{sc, pre-assist}} = (0, -8) \text{ km/s} + (13.06, 0) \text{ km/s}$$
    $$\vec{v}_{\text{sc, pre-assist}} = (13.06, -8) \text{ km/s}$$
    Calculate the magnitude:
    $$|\vec{v}_{\text{sc, pre-assist}}| = \sqrt{13.06^2 + (-8)^2} = \sqrt{170.5636 + 64} = \sqrt{234.5636} \approx 15.315 \text{ km/s}$$

    *Explanation:* This is the spacecraft's initial velocity in the Sun's frame, before it enters Jupiter's SOI.

4.  **Calculate the spacecraft's velocity relative to the Sun *after* the assist:**
    $$\vec{v}_{\text{sc, post-assist}} = \vec{v}_{\infty, \text{out}} + \vec{v}_{\text{Jupiter}}$$
    $$\vec{v}_{\text{sc, post-assist}} = (1.208, 7.904) \text{ km/s} + (13.06, 0) \text{ km/s}$$
    $$\vec{v}_{\text{sc, post-assist}} = (1.208+13.06, 7.904+0) \text{ km/s}$$
    $$\vec{v}_{\text{sc, post-assist}} = (14.268, 7.904) \text{ km/s}$$
    Calculate the magnitude:
    $$|\vec{v}_{\text{sc, post-assist}}| = \sqrt{14.268^2 + 7.904^2} = \sqrt{203.575 + 62.473} = \sqrt{266.048} \approx 16.311 \text{ km/s}$$

    *Explanation:* This is the spacecraft's final velocity in the Sun's frame, after exiting Jupiter's SOI.

5.  **Calculate the change in specific energy relative to the Sun:**
    The specific energy relative to the Sun is $\mathcal{E}_{\text{Sun}} = \frac{v_{\text{sc, Sun}}^2}{2} - \frac{\mu_{\text{Sun}}}{r_{\text{sc, Sun}}}$.
    Since the gravity assist happens over a relatively short period, we can assume the radial distance from the Sun ($r_{\text{sc, Sun}}$) is approximately constant during the maneuver. Thus, the change in specific energy is primarily due to the change in the square of the velocity magnitude.
    $$\Delta \mathcal{E}_{\text{Sun}} = \frac{1}{2} (|\vec{v}_{\text{sc, post-assist}}|^2 - |\vec{v}_{\text{sc, pre-assist}}|^2)$$
    $$\Delta \mathcal{E}_{\text{Sun}} = \frac{1}{2} ((16.311 \text{ km/s})^2 - (15.315 \text{ km/s})^2)$$
    $$\Delta \mathcal{E}_{\text{Sun}} = \frac{1}{2} (266.048 - 234.5636)$$
    $$\Delta \mathcal{E}_{\text{Sun}} = \frac{1}{2} (31.4844)$$
    $$\Delta \mathcal{E}_{\text{Sun}} \approx 15.742 \text{ km}^2/\text{s}^2$$

    *Explanation:* The change in specific energy is calculated from the change in the kinetic energy term, assuming the potential energy term (due to the Sun) is constant over the short duration of the assist.

**Final Answer:**
The deflection angle $\delta$ is $\boxed{\mathbf{171.28^\circ}}$.
The change in specific energy relative to the Sun is $\boxed{\mathbf{15.742 \text{ km}^2/\text{s}^2}}$.

*Reflection:* This example integrates calculating the turn angle based on periapsis distance and then using that angle to find the energy change. The tricky part is the vector rotation and then correctly calculating the specific energy change (which is a scalar) from the vector magnitudes. This shows a clear gain in energy for the spacecraft.

## 6. Common mistakes and traps

1.  **Confusing Frames of Reference:** The most frequent error is mixing up velocities relative to the Sun (heliocentric) and velocities relative to the planet (planetocentric). Always be explicit about which frame you are in.
2.  **Incorrect Vector Addition/Subtraction:** Treating velocities as scalars instead of vectors, especially when adding the planet's velocity to the relative velocity. Directions matter!
3.  **Assuming $v_\infty$ Magnitude Changes in Planet's Frame:** The magnitude of the hyperbolic excess velocity ($v_\infty$) remains constant throughout the hyperbolic encounter *in the planet's frame*. Only its direction changes.
4.  **Misinterpreting the Turn Angle:** The turn angle ($\delta$) is the angle between the *incoming* and *outgoing* $v_\infty$ vectors, always measured in the planet's frame. It's not the angle between the spacecraft's trajectory and the planet's orbital path.
5.  **Ignoring the Physical Size of the Planet:** The periapsis distance ($r_p$) cannot be less than the planet's radius. This sets a physical limit on the maximum achievable deflection angle.
6.  **Forgetting Patched Conic Limitations:** While useful, remember it's an approximation. For highly precise missions or scenarios with significant third-body perturbations, a full N-body simulation is required.

## 7. Textbook-precise explanation

A **gravity assist**, also known as a planetary swing-by or slingshot maneuver, is an astrodynamic technique that uses the relative motion and gravity of a celestial body (typically a planet) to alter the path and speed of a spacecraft. This is achieved without expending propellant, by exchanging momentum and energy with the assisting body.

The analysis of a gravity assist maneuver fundamentally relies on the **patched conic approximation**. This method simplifies the complex N-body problem into a series of two-body problems, valid within distinct regions of space:

1.  **Heliocentric Phase:** When the spacecraft is far from any planet, its motion is modeled as a two-body problem with the Sun as the primary body. The spacecraft follows a conic section (ellipse, parabola, or hyperbola) around the Sun.
2.  **Planetocentric Phase:** When the spacecraft enters the **Sphere of Influence (SOI)** of an assisting planet, its motion is modeled as a two-body problem with the planet as the primary body. The gravitational influence of the Sun is temporarily neglected. The spacecraft's trajectory relative to the planet is typically a hyperbola, as it usually possesses sufficient energy to escape the planet's gravity.
3.  **Post-Assist Heliocentric Phase:** After the spacecraft exits the planet's SOI, its motion is again modeled as a two-body problem with the Sun as the primary body, but with a new velocity vector.

The radius of the Sphere of Influence ($r_{\text{SOI}}$) for a body of mass $m_p$ orbiting a central body of mass $m_c$ at a distance $R$ is given by:
$$r_{\text{SOI}} = R \left( \frac{m_p}{m_c} \right)^{2/5}$$
(Bate, Mueller, White, *Fundamentals of Astrodynamics*, 1971, p. 119)

The key to understanding the velocity change is the concept of **hyperbolic excess velocity**, denoted as $\vec{v}_\infty$. This is the velocity of the spacecraft relative to the assisting planet at an infinite distance from the planet (i.e., at the boundary of the SOI). The incoming $\vec{v}_\infty$ vector, $\vec{v}_{\infty, \text{in}}$, is related to the spacecraft's heliocentric velocity $\vec{v}_{\text{sc, pre-assist}}$ and the planet's heliocentric velocity $\vec{v}_{\text{planet}}$ by:
$$\vec{v}_{\infty, \text{in}} = \vec{v}_{\text{sc, pre-assist}} - \vec{v}_{\text{planet}}$$
(Vallado, *Fundamentals of Astrodynamics and Applications*, 4th ed., 2013, p. 385)

During the hyperbolic encounter within the planet's SOI, the magnitude of the spacecraft's specific energy relative to the planet, $\mathcal{E}_{\text{planet}} = \frac{v_{\text{rel}}^2}{2} - \frac{\mu_{\text{planet}}}{r_{\text{rel}}}$, is conserved. For a hyperbolic trajectory, $\mathcal{E}_{\text{planet}} > 0$, and as $r_{\text{rel}} \to \infty$, $v_{\text{rel}} \to v_\infty$. Thus, the magnitude of the hyperbolic excess velocity, $v_\infty = \sqrt{2\mathcal{E}_{\text{planet}}}$, remains constant.
However, the direction of the $\vec{v}_\infty$ vector is altered. The **deflection angle** or **turn angle**, $\delta$, is the angle between $\vec{v}_{\infty, \text{in}}$ and the outgoing $\vec{v}_{\infty, \text{out}}$ vectors. For a hyperbolic trajectory, $\delta$ is given by:
$$\delta = 2 \arcsin \left( \frac{1}{e} \right)$$
where $e$ is the eccentricity of the hyperbola. The eccentricity can be expressed in terms of $v_\infty$, the gravitational parameter of the planet $\mu_{\text{planet}}$, and the periapsis radius $r_p$ (closest approach to the planet's center):
$$e = 1 + \frac{r_p v_\infty^2}{\mu_{\text{planet}}}$$
Alternatively, the deflection angle can be expressed as:
$$\delta = 2 \arctan \left( \frac{\mu_{\text{planet}}}{r_p v_\infty^2} \right)$$
(Curtis, *Orbital Mechanics for Engineering Students*, 4th ed., 2020, p. 396)

The spacecraft's velocity relative to the Sun *after* the assist is then found by vector addition:
$$\vec{v}_{\text{sc, post-assist}} = \vec{v}_{\infty, \text{out}} + \vec{v}_{\text{planet}}$$
The change in the spacecraft's heliocentric velocity magnitude, and thus its heliocentric specific energy, results from the vector addition of the deflected $\vec{v}_{\infty, \text{out}}$ to the planet's velocity $\vec{v}_{\text{planet}}$. If $\vec{v}_{\infty, \text{out}}$ is rotated to be more aligned with $\vec{v}_{\text{planet}}$, the spacecraft gains speed and energy. If it is rotated to be anti-aligned, the spacecraft loses speed and energy (a braking maneuver). The total energy and momentum of the Sun-planet-spacecraft system are conserved; the spacecraft's gain/loss of energy is precisely balanced by an infinitesimal loss/gain in the planet's orbital energy due to its much larger mass.

## 8. ASCII diagrams

```text
Diagram 1: Patched Conic Approximation

        Sun (Central body)
         .
         |
         |  (Spacecraft's heliocentric trajectory,
         |   e.g., an ellipse around the Sun)
         |
         |
         +-------------------------------------------------->
         |                       .
         |                      / \
         |                     /   \
         |                    /     \
         |                   /       \
         |                  /         \
         |                 /           \
         |                /             \
         |               /               \
         |              /                 \
         |             /                   \
         |            /                     \
         |           /                       \
         |          /                         \
         |         /                           \
         |        /                             \
         |       /                               \
         |      /                                 \
         |     /                                   \
         |    /                                     \
         |   /                                       \
         |  /                                         \
         | /                                           \
         |/                                             \
         +-------------------------------------------------> (Planet's orbital path around the Sun)
                     .  .  .  .  .  .  .  .  .  .
                 .                              .
              .                                   .
            .                                       .
           .         Sphere of Influence (SOI)        .
          .                                           .
         .                                             .
        .           (Planet)                            .
       .               *                                 .
      .                                                   .
       .                                                 .
        .                                               .
         .                                             .
          .                                           .
           .                                         .
            .                                       .
             .                                     .
              .                                   .
                 .  .  .  .  .  .  .  .  .  .

    - Outside SOI: Spacecraft orbits Sun (Heliocentric phase)
    - Inside SOI: Spacecraft orbits Planet (Planetocentric phase)
```

```text
Diagram 2: Gravity Assist in Planet's Frame (Hyperbolic Trajectory)

                                        ^
                                        |
                                        |
                                        |  Outgoing V_infinity_rel
                                        | /
                                        |/
                                       /|
                                      / |
                                     /  |
                                    /   |
                                   /    |
                                  /     |
                                 /      |
                                /       |
                               /        |
                              /         |
                             /          |
                            /           |
                           /            |
                          /             |
                         /              |
                        /               |
                       /                |
                      /                 |
                     /                  |
                    /                   |
                   /                    |
                  /                     |
                 /                      |
                /                       |
               /                        |
              /                         |
             /                          |
            /                           |
           /                            |
          /                             |
         /                              |
        /                               |
       /                                |
      /                                 |
     /                                  |
    /                                   |
   /                                    |
  /                                     |
 /                                      |
/                                       |
*---------------------------------------+----------------------> Planet's path (not shown, as planet is origin)
 \                                      |
  \                                     |
   \                                    |
    \                                   |
     \                                  |
      \                                 |
       \                                |
        \                               |
         \                              |
          \                             |
           \                            |
            \                           |
             \                          |
              \                         |
               \                        |
                \                       |
                 \                      |
                  \                     |
                   \                    |
                    \                   |
                     \                  |
                      \                 |
                       \                |
                        \               |