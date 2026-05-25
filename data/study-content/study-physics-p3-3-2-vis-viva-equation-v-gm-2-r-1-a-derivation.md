## 1. What it is — in plain English

Imagine you're watching a satellite zoom around Earth. Sometimes it's faster, sometimes it's slower. What determines its speed at any given moment? And how does that speed relate to the overall size and shape of its orbit?

The Vis-viva equation is like a magic formula that tells you exactly that. It links a satellite's speed at any point in its orbit to its current distance from the planet and the total "size" of its orbit. Think of it as a cosmic speedometer reading that also considers how big the racetrack is.

It's a really powerful tool because it means if you know just a few things about an orbit – like how far away the satellite is right now, and how big its average radius is – you can instantly calculate its speed without knowing anything else about its exact position or when it launched.

In essence, it's an energy conservation statement for orbits, boiled down into a simple equation relating speed, distance, and the overall energy of the orbit. It's valid for any two-body system, whether it's a satellite around Earth, a planet around the Sun, or a star around a black hole.

## 2. Why it matters — real-world applications

The Vis-viva equation is a cornerstone of astrodynamics and has profound implications across various fields:

1.  **Satellite Operations & Mission Planning:** Engineers at companies like SpaceX, Boeing, and Lockheed Martin use Vis-viva constantly. When designing a mission, they need to know the satellite's speed at different points to calculate how much fuel (delta-v) is needed for maneuvers, station-keeping, or orbital transfers. For example, to move a satellite from a low Earth orbit (LEO) to a geostationary transfer orbit (GTO), they use Vis-viva to determine the exact velocity changes required at specific points in the orbit.
2.  **Space Debris Tracking & Collision Avoidance:** Organizations like the US Space Force's 18th Space Defense Squadron (18 SDS) track thousands of pieces of space debris. By knowing the debris's current position (r) and its orbital parameters (a), they can use Vis-viva to predict its future speed and trajectory with high accuracy. This is crucial for calculating potential collision risks with operational satellites and planning avoidance maneuvers.
3.  **Interplanetary Trajectories & Hohmann Transfers:** When NASA plans missions to Mars or beyond, the Vis-viva equation is fundamental for calculating the velocities required for Hohmann transfer orbits – the most fuel-efficient way to travel between two circular orbits. It helps determine the precise speed a spacecraft needs to have at Earth's orbit to reach Mars's orbit, and vice versa.
4.  **Exoplanet Characterization (Indirectly):** While not directly used for the primary detection methods, understanding orbital mechanics, including Vis-viva, is crucial for interpreting data from methods like the radial velocity method. This method detects exoplanets by observing the wobble of their parent stars. The star's wobble is due to the gravitational pull of the orbiting planet, and the orbital parameters (like semi-major axis) derived from these wobbles are intrinsically linked to the system's energy, which Vis-viva describes.

## 3. Prerequisites — what you must know first

Before diving into the derivation of the Vis-viva equation, ensure you have a solid grasp of these fundamental concepts:

*   **Newton's Law of Universal Gravitation:** Describes the attractive force between any two objects with mass. ($F = \frac{GMm}{r^2}$)
*   **Kinetic Energy:** The energy an object possesses due to its motion. ($K = \frac{1}{2}mv^2$)
*   **Gravitational Potential Energy:** The energy an object possesses due to its position within a gravitational field. ($U = -\frac{GMm}{r}$)
*   **Conservation of Mechanical Energy:** In a system where only conservative forces (like gravity) are acting, the total mechanical energy (kinetic + potential) remains constant. ($E_{total} = K + U = \text{constant}$)
*   **Conic Sections:** The shapes of orbits (circle, ellipse, parabola, hyperbola) are conic sections. You should understand their basic properties, especially the concept of the semi-major axis ($a$) for ellipses and circles.
*   **Mass Parameters:** Understanding the difference between $G$ (gravitational constant), $M$ (mass of the central body), $m$ (mass of the orbiting body), and the standard gravitational parameter $\mu = GM$.

## 4. The core idea — step by step

The Vis-viva equation is a direct consequence of the conservation of mechanical energy in a two-body gravitational system. We'll start with the definition of total energy and then relate it to the geometric properties of an orbit.

### Step 1: Start with the Principle of Conservation of Mechanical Energy

*   **Plain-English Statement:** In any system where only gravity is doing work (no air resistance, no rocket thrust, no other planets interfering), the total amount of "energy" an object has never changes. This total energy is the sum of its energy of motion (kinetic energy) and its stored energy due to its position in the gravitational field (potential energy).
*   **Small Concrete Example:** Imagine a roller coaster. As it goes down a hill, it speeds up (gaining kinetic energy) and loses height (losing potential energy). As it goes up the next hill, it slows down (losing kinetic energy) and gains height (gaining potential energy). But if there's no friction, the sum of its kinetic and potential energy always stays the same.
*   **The Formal/Mathematical Version:**
    $$E_{total} = K + U = \text{constant}$$
    Where $K$ is kinetic energy and $U$ is gravitational potential energy.
*   **What Could Go Wrong:** Forgetting that this principle only holds true for *conservative* forces. If there's drag from an atmosphere or thrust from a rocket, the total mechanical energy is *not* conserved.

### Step 2: Define Kinetic and Gravitational Potential Energy for an Orbiting Body

*   **Plain-English Statement:** Now we need to put specific mathematical forms to our general energy terms. Kinetic energy depends on how fast something is moving and how massive it is. Gravitational potential energy depends on how massive the two objects are, how far apart they are, and the strength of gravity.
*   **Small Concrete Example:** A small satellite (mass $m$) moving at $10 \text{ km/s}$ has a certain kinetic energy. If it's $500 \text{ km}$ above Earth (mass $M$), it also has a certain gravitational potential energy. If it moves to $1000 \text{ km}$ above Earth, its potential energy changes.
*   **The Formal/Mathematical Version:**
    The kinetic energy ($K$) of the orbiting body (mass $m$) moving with speed $v$ is:
    $$K = \frac{1}{2}mv^2$$
    The gravitational potential energy ($U$) of the orbiting body (mass $m$) at a distance $r$ from the central body (mass $M$) is:
    $$U = -\frac{GMm}{r}$$
    Here, $G$ is the universal gravitational constant. The negative sign indicates that the potential energy is zero at infinite separation and becomes more negative as the objects get closer (meaning more work is required to separate them).
*   **What Could Go Wrong:** A very common mistake is forgetting the negative sign for gravitational potential energy. This sign is crucial and indicates an attractive force. Another mistake is using the wrong mass for $m$ or $M$.

### Step 3: Combine to Form the Total Mechanical Energy Equation for an Orbit

*   **Plain-English Statement:** We simply substitute the specific expressions for kinetic and potential energy into our conservation of energy equation. This gives us a formula for the total energy of a satellite at any point in its orbit, in terms of its speed and distance.
*   **Small Concrete Example:** If a satellite has a specific speed at a specific distance from Earth, we can plug those values into this combined equation to find its total energy for that orbit. This total energy value will remain the same no matter where else the satellite is in that same orbit.
*   **The Formal/Mathematical Version:**
    Substituting the expressions from Step 2 into the equation from Step 1:
    $$E = \frac{1}{2}mv^2 - \frac{GMm}{r}$$
*   **What Could Go Wrong:** Algebraic errors during substitution, such as mixing up terms or signs.

### Step 4: Relate Total Energy to the Semi-Major Axis ($a$)

*   **Plain-English Statement:** This is a crucial conceptual leap. For a bound orbit (an ellipse or a circle), the total mechanical energy is not just constant, but it's *fixed* by the "size" of the orbit, specifically by its semi-major axis. The semi-major axis ($a$) is half of the longest diameter of an elliptical orbit. For a circular orbit, $a$ is simply the radius. A larger semi-major axis means a less negative (closer to zero) total energy.
*   **Small Concrete Example:** A satellite in a very small, tight orbit around Earth has a certain total energy. If we boost it into a much larger orbit (larger semi-major axis), its total energy will change to a new, higher (less negative) constant value. This new value depends only on the new semi-major axis.
*   **The Formal/Mathematical Version (Derivation of $E = -\frac{GMm}{2a}$):**
    To derive this, we can consider the total energy at two special points in an elliptical orbit: the periapsis (closest point to the central body, $r_p$) and the apoapsis (farthest point, $r_a$).
    At these points, the velocity vector is perpendicular to the position vector, and the speed $v$ is purely tangential.
    The orbital equation for a conic section is given by:
    $$r = \frac{h^2/(GM)}{1+e\cos\theta}$$
    where $h$ is the specific angular momentum, and $e$ is the eccentricity.
    At periapsis ($\theta=0$), $r_p = \frac{h^2/(GM)}{1+e}$.
    At apoapsis ($\theta=\pi$), $r_a = \frac{h^2/(GM)}{1-e}$.
    We also know that for an ellipse:
    $$r_p = a(1-e)$$
    $$r_a = a(1+e)$$
    From these, we can derive the relation for $h^2$:
    $$h^2 = GMa(1-e^2)$$
    Now, let's substitute $h^2$ back into the total energy equation, but we need to express $v$ in terms of $h$.
    The specific angular momentum is $h = r v_\perp$, where $v_\perp$ is the component of velocity perpendicular to $r$. At periapsis and apoapsis, $v = v_\perp$. So, $v = h/r$.
    Substitute this into the total energy equation from Step 3:
    $$E = \frac{1}{2}m\left(\frac{h}{r}\right)^2 - \frac{GMm}{r}$$
    $$E = \frac{1}{2}m\frac{h^2}{r^2} - \frac{GMm}{r}$$
    Now, let's evaluate this at periapsis ($r=r_p$) for simplicity, using $h^2 = GMa(1-e^2)$ and $r_p = a(1-e)$:
    $$E = \frac{1}{2}m \frac{GMa(1-e^2)}{[a(1-e)]^2} - \frac{GMm}{a(1-e)}$$
    $$E = \frac{1}{2}m \frac{GMa(1-e^2)}{a^2(1-e)^2} - \frac{GMm}{a(1-e)}$$
    $$E = \frac{1}{2}m \frac{GM(1+e)(1-e)}{a(1-e)^2} - \frac{GMm}{a(1-e)}$$
    $$E = \frac{1}{2}m \frac{GM(1+e)}{a(1-e)} - \frac{GMm}{a(1-e)}$$
    Now, find a common denominator:
    $$E = \frac{GMm}{a(1-e)} \left( \frac{1+e}{2} - 1 \right)$$
    $$E = \frac{GMm}{a(1-e)} \left( \frac{1+e-2}{2} \right)$$
    $$E = \frac{GMm}{a(1-e)} \left( \frac{e-1}{2} \right)$$
    $$E = \frac{GMm}{a(1-e)} \left( -\frac{1-e}{2} \right)$$
    $$E = -\frac{GMm}{2a}$$
    This is the crucial result:
    $$E = -\frac{GMm}{2a}$$
    This expression for total energy is constant for a given orbit and depends only on the masses $M, m$, the gravitational constant $G$, and the semi-major axis $a$.
*   **What Could Go Wrong:** This derivation can be tricky. A common error is not understanding that $a$ is a *constant* for a given orbit, not a variable like $r$. For hyperbolic orbits, $a$ is negative, and for parabolic orbits, $a$ is infinite (or $1/a=0$), leading to $E=0$.

### Step 5: Equate the Two Expressions for Total Energy

*   **Plain-English Statement:** We now have two different ways of writing the total mechanical energy of an orbiting body. One way relates it to the body's instantaneous speed and distance (from Step 3). The other way relates it to the overall size of its orbit (from Step 4). Since both expressions represent the *same* total energy for the *same* orbit, we can set them equal to each other.
*   **Small Concrete Example:** If you calculate the total energy of a satellite using its speed and distance, and then calculate it again using its semi-major axis, you should get the exact same number. So, we can just set the two formulas equal.
*   **The Formal/Mathematical Version:**
    From Step 3: $E = \frac{1}{2}mv^2 - \frac{GMm}{r}$
    From Step 4: $E = -\frac{GMm}{2a}$
    Equating them:
    $$\frac{1}{2}mv^2 - \frac{GMm}{r} = -\frac{GMm}{2a}$$
*   **What Could Go Wrong:** Simple algebraic mistakes during this step, such as dropping a term or a negative sign.

### Step 6: Solve for $v^2$ (The Vis-viva Equation)

*   **Plain-English Statement:** Our goal is to find an equation that tells us the speed ($v$) of the satellite. So, we'll rearrange the combined energy equation to isolate $v^2$ on one side.
*   **Small Concrete Example:** This is like taking a complex equation and just moving terms around until the variable you want is by itself.
*   **The Formal/Mathematical Version:**
    Start with:
    $$\frac{1}{2}mv^2 - \frac{GMm}{r} = -\frac{GMm}{2a}$$
    First, notice that the mass of the orbiting body ($m$) appears in every term. We can divide the entire equation by $m$:
    $$\frac{1}{2}v^2 - \frac{GM}{r} = -\frac{GM}{2a}$$
    Now, move the $-\frac{GM}{r}$ term to the right side of the equation:
    $$\frac{1}{2}v^2 = \frac{GM}{r} - \frac{GM}{2a}$$
    Multiply the entire equation by 2 to isolate $v^2$:
    $$v^2 = 2\left(\frac{GM}{r} - \frac{GM}{2a}\right)$$
    $$v^2 = \frac{2GM}{r} - \frac{2GM}{2a}$$
    $$v^2 = \frac{2GM}{r} - \frac{GM}{a}$$
    Finally, factor out $GM$:
    $$v^2 = GM\left(\frac{2}{r} - \frac{1}{a}\right)$$
    This is the Vis-viva equation!
*   **What Could Go Wrong:** Algebraic errors are the most common pitfall here: incorrect distribution of the 2, sign errors when moving terms, or forgetting to factor out $GM$.

## 5. Worked examples — multiple, with every step shown

We will use Earth's standard gravitational parameter, $\mu_{Earth} = GM_{Earth} \approx 3.986 \times 10^{14} \text{ m}^3/\text{s}^2$.

### Example 1 (Easy): Circular Orbit Speed

**Problem:** A satellite is in a circular orbit at an altitude of $500 \text{ km}$ above Earth's surface. What is its orbital speed? (Assume Earth's radius $R_E = 6371 \text{ km}$).

**Given:**
*   Altitude ($h$) = $500 \text{ km} = 500,000 \text{ m}$
*   Earth's radius ($R_E$) = $6371 \text{ km} = 6,371,000 \text{ m}$
*   Earth's gravitational parameter ($\mu_{Earth}$) = $3.986 \times 10^{14} \text{ m}^3/\text{s}^2$

**Wanted:** Orbital speed ($v$)

**Solution:**

1.  **Calculate the orbital radius ($r$):**
    The orbital radius is the distance from the center of the Earth to the satellite.
    $$r = R_E + h$$
    $$r = 6,371,000 \text{ m} + 500,000 \text{ m}$$
    $$r = 6,871,000 \text{ m}$$
    *This step converts altitude to orbital radius by adding Earth's radius.*

2.  **Identify the semi-major axis ($a$):**
    For a circular orbit, the radius $r$ is constant, and thus the semi-major axis $a$ is equal to the orbital radius $r$.
    $$a = r$$
    $$a = 6,871,000 \text{ m}$$
    *This is a key property of circular orbits, simplifying the Vis-viva equation.*

3.  **Apply the Vis-viva equation:**
    $$v^2 = GM\left(\frac{2}{r} - \frac{1}{a}\right)$$
    Substitute $GM = \mu_{Earth}$ and $a=r$:
    $$v^2 = \mu_{Earth}\left(\frac{2}{r} - \frac{1}{r}\right)$$
    *This is the Vis-viva equation itself, with $\mu$ replacing $GM$ for convenience.*

4.  **Simplify the equation:**
    $$v^2 = \mu_{Earth}\left(\frac{1}{r}\right)$$
    $$v^2 = \frac{\mu_{Earth}}{r}$$
    *Combining the fractions inside the parenthesis simplifies the expression for circular orbits.*

5.  **Substitute values and calculate $v^2$:**
    $$v^2 = \frac{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}{6,871,000 \text{ m}}$$
    $$v^2 \approx 5.8012 \times 10^7 \text{ m}^2/\text{s}^2$$
    *Plug in the numerical values for $\mu_{Earth}$ and $r$. Make sure units are consistent.*

6.  **Calculate $v$:**
    $$v = \sqrt{5.8012 \times 10^7 \text{ m}^2/\text{s}^2}$$
    $$v \approx 7616.5 \text{ m/s}$$
    $$\boxed{v \approx 7.617 \text{ km/s}}$$
    *Take the square root to get the final velocity. Convert to km/s for common usage.*

**Reflection:** This example highlights how the Vis-viva equation simplifies for circular orbits, reducing to the well-known $v = \sqrt{\mu/r}$ formula. The main trick is correctly identifying that for a circular orbit, $a=r$.

### Example 2 (Medium): Elliptical Orbit Speed at Apoapsis

**Problem:** A satellite is in an elliptical orbit around Earth. Its periapsis (closest point) altitude is $200 \text{ km}$, and its apoapsis (farthest point) altitude is $35,786 \text{ km}$ (geostationary altitude). What is the satellite's speed at apoapsis? (Assume Earth's radius $R_E = 6371 \text{ km}$).

**Given:**
*   Periapsis altitude ($h_p$) = $200 \text{ km} = 200,000 \text{ m}$
*   Apoapsis altitude ($h_a$) = $35,786 \text{ km} = 35,786,000 \text{ m}$
*   Earth's radius ($R_E$) = $6371 \text{ km} = 6,371,000 \text{ m}$
*   Earth's gravitational parameter ($\mu_{Earth}$) = $3.986 \times 10^{14} \text{ m}^3/\text{s}^2$

**Wanted:** Speed at apoapsis ($v_a$)

**Solution:**

1.  **Calculate periapsis radius ($r_p$) and apoapsis radius ($r_a$):**
    These are distances from the center of Earth.
    $$r_p = R_E + h_p = 6,371,000 \text{ m} + 200,000 \text{ m} = 6,571,000 \text{ m}$$
    $$r_a = R_E + h_a = 6,371,000 \text{ m} + 35,786,000 \text{ m} = 42,157,000 \text{ m}$$
    *Convert altitudes to radii by adding Earth's radius.*

2.  **Calculate the semi-major axis ($a$):**
    For an elliptical orbit, the semi-major axis is the average of the periapsis and apoapsis radii.
    $$a = \frac{r_p + r_a}{2}$$
    $$a = \frac{6,571,000 \text{ m} + 42,157,000 \text{ m}}{2}$$
    $$a = \frac{48,728,000 \text{ m}}{2}$$
    $$a = 24,364,000 \text{ m}$$
    *This formula for $a$ is specific to elliptical orbits and is crucial for using Vis-viva.*

3.  **Apply the Vis-viva equation at apoapsis:**
    We want the speed at apoapsis, so we use $r = r_a$.
    $$v_a^2 = GM\left(\frac{2}{r_a} - \frac{1}{a}\right)$$
    Substitute $GM = \mu_{Earth}$:
    $$v_a^2 = \mu_{Earth}\left(\frac{2}{r_a} - \frac{1}{a}\right)$$
    *This is the Vis-viva equation. We use $r_a$ for the instantaneous radius because we're finding the speed *at apoapsis*.*

4.  **Substitute values and calculate $v_a^2$:**
    $$v_a^2 = (3.986 \times 10^{14} \text{ m}^3/\text{s}^2)\left(\frac{2}{42,157,000 \text{ m}} - \frac{1}{24,364,000 \text{ m}}\right)$$
    $$v_a^2 = (3.986 \times 10^{14})\left(4.7441 \times 10^{-8} - 4.1044 \times 10^{-8}\right) \text{ m}^2/\text{s}^2$$
    $$v_a^2 = (3.986 \times 10^{14})(6.397 \times 10^{-9}) \text{ m}^2/\text{s}^2$$
    $$v_a^2 \approx 2.550 \times 10^6 \text{ m}^2/\text{s}^2$$
    *Carefully perform the arithmetic, especially with the fractions and exponents.*

5.  **Calculate $v_a$:**
    $$v_a = \sqrt{2.550 \times 10^6 \text{ m}^2/\text{s}^2}$$
    $$v_a \approx 1596.8 \text{ m/s}$$
    $$\boxed{v_a \approx 1.597 \text{ km/s}}$$
    *Take the square root and convert units.*

**Reflection:** This example shows the full power of Vis-viva for elliptical orbits. The key is correctly calculating the semi-major axis $a$ from the periapsis and apoapsis radii, and then using the correct instantaneous radius ($r_a$) for the desired speed calculation. Notice how much slower the satellite is at apoapsis compared to the circular orbit in Example 1.

### Example 3 (Hard): Hyperbolic Orbit Speed

**Problem:** A spacecraft is on a hyperbolic trajectory away from Earth. Its periapsis distance (closest approach to Earth's center) was $6600 \text{ km}$. If its eccentricity is $e = 1.2$, what is its speed when it is $100,000 \text{ km}$ from the center of Earth?

**Given:**
*   Periapsis radius ($r_p$) = $6600 \text{ km} = 6,600,000 \text{ m}$
*   Eccentricity ($e$) = $1.2$
*   Instantaneous radius ($r$) = $100,000 \text{ km} = 100,000,000 \text{ m}$
*   Earth's gravitational parameter ($\mu_{Earth}$) = $3.986 \times 10^{14} \text{ m}^3/\text{s}^2$

**Wanted:** Speed ($v$) at $r = 100,000 \text{ km}$

**Solution:**

1.  **Calculate the semi-major axis ($a$):**
    For hyperbolic orbits, the semi-major axis $a$ is defined as negative, or sometimes just its magnitude is used, but it's crucial for the Vis-viva equation to use the negative value. The relationship between periapsis radius, semi-major axis, and eccentricity is:
    $$r_p = a(1-e)$$
    Rearrange to solve for $a$:
    $$a = \frac{r_p}{1-e}$$
    $$a = \frac{6,600,000 \text{ m}}{1 - 1.2}$$
    $$a = \frac{6,600,000 \text{ m}}{-0.2}$$
    $$a = -33,000,000 \text{ m}$$
    *For hyperbolic orbits, $e > 1$, which makes $(1-e)$ negative, thus resulting in a negative $a$. This negative sign is critical for Vis-viva.*

2.  **Apply the Vis-viva equation:**
    $$v^2 = GM\left(\frac{2}{r} - \frac{1}{a}\right)$$
    Substitute $GM = \mu_{Earth}$:
    $$v^2 = \mu_{Earth}\left(\frac{2}{r} - \frac{1}{a}\right)$$
    *The standard Vis-viva equation applies directly, even with a negative 'a'.*

3.  **Substitute values and calculate $v^2$:**
    $$v^2 = (3.986 \times 10^{14} \text{ m}^3/\text{s}^2)\left(\frac{2}{100,000,000 \text{ m}} - \frac{1}{-33,000,000 \text{ m}}\right)$$
    $$v^2 = (3.986 \times 10^{14})\left(2.0 \times 10^{-8} - (-3.0303 \times 10^{-8})\right) \text{ m}^2/\text{s}^2$$
    $$v^2 = (3.986 \times 10^{14})\left(2.0 \times 10^{-8} + 3.0303 \times 10^{-8}\right) \text{ m}^2/\text{s}^2$$
    $$v^2 = (3.986 \times 10^{14})(5.0303 \times 10^{-8}) \text{ m}^2/\text{s}^2$$
    $$v^2 \approx 2.005 \times 10^7 \text{ m}^2/\text{s}^2$$
    *Be extremely careful with the negative sign of 'a'. A common error is to treat $1/a$ as positive, effectively turning the minus sign into a positive.*

4.  **Calculate $v$:**
    $$v = \sqrt{2.005 \times 10^7 \text{ m}^2/\text{s}^2}$$
    $$v \approx 4477.7 \text{ m/s}$$
    $$\boxed{v \approx 4.478 \text{ km/s}}$$
    *Take the square root and convert units.*

**Reflection:** This example demonstrates the versatility of the Vis-viva equation for hyperbolic orbits. The key challenge is remembering that for hyperbolic orbits, the semi-major axis $a$ is negative, which leads to a crucial sign change in the equation. The value $1/a$ becomes negative, and thus $-1/a$ becomes positive, making the term inside the parenthesis larger, as expected for higher-energy (escape) trajectories.

### Example 4 (Medium): Finding Semi-Major Axis

**Problem:** A probe is observed to have a speed of $3.5 \text{ km/s}$ when it is $10,000 \text{ km}$ from the center of Earth. What is the semi-major axis of its orbit?

**Given:**
*   Speed ($v$) = $3.5 \text{ km/s} = 3500 \text{ m/s}$
*   Orbital radius ($r$) = $10,000 \text{ km} = 10,000,000 \text{ m}$
*   Earth's gravitational parameter ($\mu_{Earth}$) = $3.986 \times 10^{14} \text{ m}^3/\text{s}^2$

**Wanted:** Semi-major axis ($a$)

**Solution:**

1.  **Start with the Vis-viva equation:**
    $$v^2 = GM\left(\frac{2}{r} - \frac{1}{a}\right)$$
    Substitute $GM = \mu_{Earth}$:
    $$v^2 = \mu_{Earth}\left(\frac{2}{r} - \frac{1}{a}\right)$$
    *The base equation is the starting point.*

2.  **Rearrange to solve for $1/a$:**
    First, divide by $\mu_{Earth}$:
    $$\frac{v^2}{\mu_{Earth}} = \frac{2}{r} - \frac{1}{a}$$
    Now, isolate the $1/a$ term:
    $$\frac{1}{a} = \frac{2}{r} - \frac{v^2}{\mu_{Earth}}$$
    *This is an algebraic rearrangement, moving terms to isolate the desired variable.*

3.  **Substitute values and calculate $1/a$:**
    $$\frac{1}{a} = \frac{2}{10,000,000 \text{ m}} - \frac{(3500 \text{ m/s})^2}{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}$$
    $$\frac{1}{a} = (2.0 \times 10^{-7} \text{ m}^{-1}) - \frac{12,250,000 \text{ m}^2/\text{s}^2}{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}$$
    $$\frac{1}{a} = (2.0 \times 10^{-7} \text{ m}^{-1}) - (3.073 \times 10^{-8} \text{ m}^{-1})$$
    $$\frac{1}{a} = 1.6927 \times 10^{-7} \text{ m}^{-1}$$
    *Carefully calculate each term before combining them. Pay attention to units and exponents.*

4.  **Calculate $a$:**
    $$a = \frac{1}{1.6927 \times 10^{-7} \text{ m}^{-1}}$$
    $$a \approx 5,907,839 \text{ m}$$
    $$\boxed{a \approx 5908 \text{ km}}$$
    *Take the reciprocal to find 'a'.*

**Reflection:** This example shows how to use the Vis-viva equation to find an orbital parameter ($a$) when speed and radius are known. It requires careful algebraic manipulation and confirms that the equation works in reverse. The positive value of 'a' indicates an elliptical orbit (or circular, but $a < r$ here so it's an ellipse).

## 6. Common mistakes and traps

1.  **Units, Units, Units!** Mixing kilometers, meters, seconds, hours, etc., without consistent conversion is the most frequent source of error. Always convert everything to a consistent set (e.g., SI units: meters, kilograms, seconds).
2.  **Sign Error in Potential Energy:** Forgetting the negative sign in $U = -\frac{GMm}{r}$ or incorrectly handling it when substituting into the total energy equation. This will lead to an incorrect total energy and thus an incorrect Vis-viva equation.
3.  **Confusing $r$ and $a$:** The variable $r$ is the *instantaneous* distance from the central body, which changes throughout an elliptical orbit. The variable $a$ is the *constant* semi-major axis, which defines the size of the entire orbit. They are only equal for circular orbits.
4.  **Incorrectly Handling $a$ for Non-Elliptical Orbits:**
    *   For **parabolic orbits** (escape trajectory), $E=0$, which implies $1/a = 0$ (or $a = \infty$). The Vis-viva equation simplifies to $v^2 = \frac{2GM}{r}$.
    *   For **hyperbolic orbits** (interplanetary trajectories), $E > 0$, which implies $a$ is *negative*. Forgetting this negative sign for $a$ will lead to completely wrong results.
5.  **Forgetting to Square Root:** The equation gives $v^2$, not $v$. Remember to take the square root at the very end to get the actual speed.
6.  **Using the Wrong $\mu$ (or $GM$):** Always ensure you are using the gravitational parameter for the *central body* (e.g., Earth's $\mu$ for Earth orbits, Sun's $\mu$ for heliocentric orbits).

## 7. Textbook-precise explanation

The Vis-viva equation, also known as the orbital energy equation, is a fundamental algebraic relationship in classical two-body orbital mechanics that connects the instantaneous speed of an orbiting body to its current radial distance from the central body and the semi-major axis of its orbit. It is a direct consequence of the conservation of mechanical energy within a conservative gravitational field.

Consider a two-body system where a smaller mass $m$ (the orbiting body) orbits a much larger mass $M$ (the central body), such that the center of mass of the system can be approximated as the center of the central body. The gravitational force between them is given by Newton's Law of Universal Gravitation, $F = \frac{GMm}{r^2}$, where $G$ is the gravitational constant and $r$ is the distance between their centers. This force is conservative.

The total mechanical energy $E$ of the orbiting body is the sum of its kinetic energy $K$ and its gravitational potential energy $U$:
$$E = K + U$$
The kinetic energy is given by:
$$K = \frac{1}{2}mv^2$$
where $v$ is the instantaneous speed of the orbiting body.
The gravitational potential energy is given by:
$$U = -\frac{GMm}{r}$$
Thus, the total mechanical energy is:
$$E = \frac{1}{2}mv^2 - \frac{GMm}{r} \quad (*)$$
For a two-body system under an inverse-square law force, the total mechanical energy $E$ is conserved. Furthermore, for bound orbits (elliptical and circular orbits), the total mechanical energy is uniquely determined by the semi-major axis $a$ of the orbit. This relationship is derived from the properties of conic sections and angular momentum conservation, yielding:
$$E = -\frac{GMm}{2a} \quad (**)$$
This specific form is valid for elliptical orbits where $a > 0$. For parabolic orbits, $E=0$, which corresponds to $a \to \infty$. For hyperbolic orbits, $E > 0$, which corresponds to $a < 0$.

Equating the two expressions for the total mechanical energy (equations $(*)$ and $(**)$):
$$\frac{1}{2}mv^2 - \frac{GMm}{r} = -\frac{GMm}{2a}$$
We can divide the entire equation by the mass of the orbiting body $m$, as $m \neq 0$:
$$\frac{1}{2}v^2 - \frac{GM}{r} = -\frac{GM}{2a}$$
To isolate $v^2$, we first move the potential energy term to the right side:
$$\frac{1}{2}v^2 = \frac{GM}{r} - \frac{GM}{2a}$$
Then, multiply the entire equation by 2:
$$v^2 = \frac{2GM}{r} - \frac{GM}{a}$$
Finally, factoring out $GM$ (or $\mu$, the standard gravitational parameter):
$$v^2 = GM\left(\frac{2}{r} - \frac{1}{a}\right)$$
This is the Vis-viva equation. It holds true for all two-body conic section orbits (elliptical, parabolic, and hyperbolic) by correctly interpreting the sign and magnitude of $a$.

**Reference:**
*   Curtis, H. D. (2014). *Orbital Mechanics for Engineering Students* (3rd ed.). Elsevier. §2.5, §3.3
*   Bate, R. R., Mueller, D. D., & White, J. E. (1971). *Fundamentals of Astrodynamics*. Dover Publications. §2.3

## 8. ASCII diagrams

Here's a simplified ASCII diagram illustrating an elliptical orbit, highlighting the central body, orbiting body, instantaneous radius ($r$), and semi-major axis ($a$).

```text
                                        .   <-- Central Body (Mass M, at one focus)
                                       / \
                                      /   \
                                     /     \
                                    /       \
                                   /         *  <-- Orbiting Body (Mass m)
                                  /         /|\  (Velocity vector v, tangential to orbit)
                                 /         / | \
                                /         /  |  \
                               |         /   |   \
                               |        /    |    \
                               |       /     |     \
                               |      /      |      \
                               |     /       |       \
                               |    /        |        \
                               |   /         |         \
                               |  /          |          \
                               | /           |           \
                               |/            |            \
                              (.)------------+------------(.)
                             / \             |             / \
                            /   \            |            /   \
                           /     \           |           /     \
                          /       \          |          /       \
                         /         \         |         /         \
                        /           \        |        /           \
                       /             \       |       /             \
                      /               \      |      /               \
                     /                 \     |     /                 \
                    /                   \    |    /                   \
                   /                     \   |   /                     \
                  /                       \  |  /                       \
                 /                         \ | /                         \
                /                           \|/                           \
               (.)---------------------------+---------------------------(.)
                                             ^
                                             |
                                             |
                                             r  (Instantaneous distance from M to m)
                                             |
                                             |
                                             |
                                             +----------------------------------+
                                             |                                  |
                                             <------------------ a ----------------->
                                             (Semi-major axis: half the longest diameter of the ellipse)
```

**Description for Redrawing:**

Imagine an ellipse drawn on a piece of paper.
1.  **Central Body (M):** Place a dot slightly off-center along the longest axis of the ellipse. This is one of the two foci of the ellipse, and it represents the central massive body (e.g., Earth, Sun).
2.  **Orbiting Body (m):** Draw another small dot anywhere on the elliptical path. This is the orbiting body (e.g., a satellite, a planet).
3.  **Instantaneous Radius (r):** Draw a straight line from the central body (M) to the orbiting body (m). The length of this line is $r$.
4.  **Velocity Vector (v):** At the orbiting body's position, draw an arrow tangent to the elliptical path in the direction of motion. This represents the velocity vector $v$.
5.  **Semi-Major Axis (a):** Draw the longest diameter of the ellipse. This line passes through both foci and the center of the ellipse. The semi-major axis $a$ is half the length of this longest diameter. It extends from the center of the ellipse to the farthest point on the orbit along this axis. Note that the central body (M) is *not* at the center of the ellipse, but at one focus.

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    *   **V**is-**v**iva: "**V**elocity **I**s **S**imply **V**aried by **A**xis and **R**adius." (VIVA and VAR).
    *   Visually, imagine a satellite on a rollercoaster track (the orbit). Its speed (V) is determined by how high it is on the track (r) and how big the entire rollercoaster is (a). The roller coaster's "power" comes from the central body (GM).

2.  **Formulas/Facts to Overlearn:**
    *   The Vis-viva equation itself: $v^2 = GM\left(\frac{2}{r} - \frac{1}{a}\right)$
    *   The total orbital energy for a bound orbit: $E = -\frac{GMm}{2a}$
    *   The fundamental conservation of energy: $E = K + U = \frac{1}{2}mv^2 - \frac{GMm}{r}$

3.  **Spaced-Repetition Schedule:**
    *   **Today (Day 0):** Thoroughly understand the derivation and work through the examples.
    *   **Day 1:** Review the derivation steps. Try to re-derive it without looking.
    *   **Day 3:** Solve one new problem using Vis-viva. Briefly recall the derivation steps.
    *   **Day 7:** Re-derive the equation from scratch. Explain it aloud to an imaginary student.
    *   **Day 16:** Solve a challenging problem involving hyperbolic orbits or finding 'a'.
    *   **Day 35:** Explain the physical meaning of each term in the equation and its implications for different orbit types (circular, elliptical, parabolic, hyperbolic).

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the Vis-viva equation, you can always rebuild it by following these steps:
    1.  **Start with Conservation of Energy:** $E_{total} = K + U$.
    2.  **Define K and U:** $K = \frac{1}{2}mv^2$ and $U = -\frac{GMm}{r}$.
    3.  **Combine for Total Energy:** $E = \frac{1}{2}mv^2 - \frac{GMm}{r}$.
    4.  **Recall Total Energy in terms of Semi-Major Axis:** For a bound orbit, $E = -\frac{GMm}{2a}$. (If you forget this specific formula, remember it's derived from evaluating the total energy at periapsis/apoapsis, where $v$ is purely tangential, and using $h^2 = GMa(1-e^2)$.)
    5.  **Equate the two energy expressions:** $\frac{1}{2}mv^2 - \frac{GMm}{r} = -\frac{GMm}{2a}$.
    6.  **Algebraically Solve for $v^2$:** Divide by $m$, move terms, multiply by 2, and factor out $GM$. This will lead you back to $v^2 = GM\left(\frac{2}{r} - \frac{1}{a}\right)$.

## 10. Connections — what this leads to

The Vis-viva equation is a foundational element that unlocks a deeper understanding of orbital mechanics and is crucial for many advanced topics:

*   **Orbital Maneuvers ($\Delta V$):** Since Vis-viva gives you the speed at any point, it's indispensable for calculating the change in velocity ($\Delta V$) required to transition between orbits (e.g., from a parking orbit to a transfer orbit). This is the basis of all rocket equation calculations.
*   **Hohmann Transfer Orbits:** The most fuel-efficient way to move between two circular orbits. Vis-viva is used to calculate the required speeds at the start and end of the transfer ellipse to determine the necessary $\Delta V$ burns.
*   **Escape Velocity:** The Vis-viva equation directly leads to the formula for escape velocity. If an object has just enough energy to escape a gravitational field, its total energy $E=0$. Setting $E=0$ in $E = -\frac{GMm}{2a}$ implies $a=\infty$ (or $1/a=0$). Plugging $1/a=0$ into Vis-viva gives $v_{escape}^2 = \frac{2GM}{r}$.
*   **Orbital Elements Determination:** If you know a spacecraft's position and velocity vectors at a single instant, you can use Vis-viva (along with angular momentum conservation) to determine all six classical orbital elements, including the semi-major axis and eccentricity.
*   **Lambert's Problem:** This problem involves finding an orbit that connects two points in space in a given amount of time. Vis-viva is an integral part of the iterative solutions used to solve Lambert's problem, as it relates speed and distance within the candidate orbits.
*   **Interplanetary Trajectory Design:** For missions to other planets, the Vis-viva equation helps in designing hyperbolic escape trajectories from Earth and capture trajectories at the target planet. The concept of "C3" (characteristic energy) which is directly related to $v^2$ for hyperbolic excess velocity, stems from Vis-viva.
*   **Orbital Lifetime & Perturbations (Advanced):** While Vis-viva describes ideal two-body motion, understanding it is critical when studying perturbations (e.g., atmospheric drag, third-body gravity). These perturbations cause the semi-major axis $a$ (and thus the total energy $E$) to change over time, altering the orbital speed.

## 11. Self-check questions

1.  Explain in your own words why the Vis-viva equation is a statement of energy conservation. How does the semi-major axis 'a' fit into this energy conservation principle?
2.  A satellite is in a highly elliptical orbit around Jupiter. At its closest approach (periapsis), it is $400,000 \text{ km}$ from Jupiter's center and moving at $50 \text{ km/s}$. At its farthest point (apoapsis), it is $1,500,000 \text{ km}$ from Jupiter's center. Calculate its speed at apoapsis. (Jupiter's $\mu = 1.267 \times 10^{17} \text{ m}^3/\text{s}^2$).
3.  A spacecraft is observed to be moving at $15 \text{ km/s}$ when it is $20,000 \text{ km}$ from the center of Earth. Is this spacecraft in a bound orbit (elliptical/circular), or is it on an escape trajectory (parabolic/hyperbolic)? Justify your answer using the Vis-viva equation.
4.  Derive the formula for circular orbit velocity, $v_c = \sqrt{\frac{GM}{r}}$, directly from the Vis-viva equation. Explain the physical meaning of the simplification.
5.  A newly discovered comet has a perihelion (closest to Sun) distance of $0.5 \text{ AU}$ and an aphelion (farthest from Sun) distance of $50 \text{ AU}$. Calculate its speed when it is exactly $1 \text{ AU}$ from the Sun. ($1 \text{ AU} \approx 1.496 \times 10^{11} \text{ m}$, Sun's $\mu = 1.327 \times 10^{20} \text{ m}^3/\text{s}^2$).