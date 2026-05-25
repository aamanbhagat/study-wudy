## 1. What it is — in plain English

Imagine you're trying to throw a ball really, really fast. If you throw it a little bit, it goes up and then falls back down to Earth. If you throw it harder, it goes further before hitting the ground. Now, imagine you could throw it so incredibly fast that by the time it falls a little bit, the Earth's surface has curved away beneath it! It keeps falling, but it keeps missing the ground.

That's essentially what "orbital velocity for a circular orbit" is. It's the exact speed an object needs to move horizontally so that as gravity pulls it downwards, the curve of the Earth (or whatever planet it's orbiting) matches its fall, making it continuously "miss" the ground and stay at a constant height. It's not floating; it's constantly falling around the planet.

Think of it like a perfectly balanced tug-of-war. Gravity is constantly pulling the object inward, trying to make it crash. But the object's sideways motion is constantly trying to make it fly off into space. Orbital velocity is the specific speed where these two effects perfectly cancel each other out, resulting in a stable circle around the central body.

This magical speed depends on two main things: how strong the gravity is (which depends on the mass of the central planet) and how far away the object is from the center of that planet. The closer you are, and the heavier the planet, the faster you need to go to stay in orbit.

## 2. Why it matters — real-world applications

Understanding orbital velocity is not just an academic exercise; it's fundamental to nearly everything we do in space and beyond.

1.  **Satellite Deployment and Communication (e.g., SpaceX Starlink, OneWeb, GPS):** Companies like SpaceX and OneWeb launch thousands of satellites into orbit to provide global internet access. GPS satellites, owned and operated by the U.S. government, provide navigation services worldwide. To place these satellites into their correct circular orbits (Low Earth Orbit, Medium Earth Orbit, or Geosynchronous Orbit), engineers must precisely calculate the required orbital velocity. If a satellite is too slow, it will fall back to Earth; if it's too fast, it will fly off into a higher, elliptical, or even escape trajectory. Accurate velocity ensures the satellite stays in its intended path, providing reliable services.

2.  **International Space Station (ISS) Operations:** The ISS, a collaborative project involving multiple space agencies, orbits Earth at an altitude of about 400 km. Maintaining its precise orbital velocity is crucial. While its primary velocity is constant, atmospheric drag (even at that altitude) causes a slight deceleration, which would eventually lead to deorbiting. Understanding orbital velocity allows mission control to periodically boost the ISS back to its correct speed and altitude using onboard thrusters, extending its operational life and ensuring astronaut safety.

3.  **Planetary Science and Exploration (e.g., NASA Mars Reconnaissance Orbiter, Juno):** Space probes sent to other planets often enter orbit around them to conduct long-term studies. For example, NASA's Mars Reconnaissance Orbiter (MRO) has been circling Mars since 2006, mapping its surface and atmosphere. Similarly, the Juno spacecraft orbits Jupiter, studying its composition and magnetic field. The engineers designing these missions must calculate the specific orbital velocity required to capture the spacecraft into a stable orbit around the target planet, ensuring it doesn't just fly past or crash into the planet.

4.  **Astrodynamics and Space Debris Management:** With increasing numbers of satellites, space debris (defunct satellites, rocket stages, fragments from collisions) is a growing concern. Each piece of debris, no matter how small, has its own orbital velocity. Understanding these velocities is critical for tracking debris, predicting potential collisions, and designing collision avoidance maneuvers for active satellites. It's also essential for planning future missions to avoid adding to the debris problem.

## 3. Prerequisites — what you must know first

Before diving into the derivation of orbital velocity, ensure you have a solid grasp of these fundamental concepts:

*   **Newton's First Law of Motion (Inertia):** An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force. This explains why an object would fly off into space if not for gravity.
*   **Newton's Second Law of Motion ($F=ma$):** The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. This is the core equation we'll use to relate force and motion.
*   **Newton's Law of Universal Gravitation ($F_G = \frac{GMm}{r^2}$):** Every particle in the universe attracts every other particle with a force that is directly proportional to the product of their masses and inversely proportional to the square of the distance between their centers. This is the force that *causes* the orbit.
*   **Centripetal Force ($F_c = \frac{mv^2}{r}$):** The force required to keep an object moving in a circular path. This force is always directed towards the center of the circle. In an orbit, gravity *is* this centripetal force.
*   **Basic Algebra:** Proficiency in rearranging equations, solving for unknowns, and handling square roots.
*   **Understanding of Vectors vs. Scalars:** Knowing that velocity is a vector (magnitude and direction) while speed is a scalar (magnitude only), and that force is a vector. Although we'll primarily deal with magnitudes in the final derivation, understanding the changing direction of velocity is key to circular motion.
*   **Units and Dimensional Analysis:** The ability to work with SI units (kilograms, meters, seconds) and ensure consistency throughout calculations.

## 4. The core idea — step by step

The core idea behind deriving orbital velocity for a circular orbit is to recognize that for an object to move in a stable circle, the force pulling it inward (gravity) must be exactly equal to the force required to keep it moving in that circle (centripetal force).

### Step 1: Understand the nature of the force causing the orbit.

*   **Plain-English Statement:** For anything to orbit a planet or star, there must be a force constantly pulling it towards the center of that planet or star. Without this inward pull, the object would just fly off in a straight line, thanks to inertia.
*   **Concrete Example:** If you tie a string to a ball and swing it around your head, the tension in the string is the force pulling the ball inward. In space, there's no string. What's the "string" for a satellite?
*   **Formal/Mathematical Version:** This inward pull is provided by **Newton's Law of Universal Gravitation**.
    $$F_G = \frac{GMm}{r^2}$$
    Where:
    *   $F_G$ is the gravitational force.
    *   $G$ is the universal gravitational constant ($6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2$).
    *   $M$ is the mass of the central body (e.g., Earth, Jupiter).
    *   $m$ is the mass of the orbiting object (e.g., satellite, moon).
    *   $r$ is the distance between the *centers* of the two objects (this is the radius of the orbit).
*   **What could go wrong:** Students often confuse $r$ with the altitude above the surface. Remember, $r$ is the distance from the *center* of the central body to the *center* of the orbiting body. So, if given altitude, you must add the radius of the central body.

### Step 2: Understand the force required for circular motion.

*   **Plain-English Statement:** Any object moving in a circle, at a constant speed, isn't actually moving at a constant *velocity* because its direction is constantly changing. A change in velocity means there's an acceleration, and by Newton's Second Law ($F=ma$), an acceleration means there's a force. This force, always pointing towards the center of the circle, is called the centripetal force.
*   **Concrete Example:** When you're in a car turning a sharp corner, you feel pushed outwards. But from the perspective of the car, the car seat or door is pushing *you* inwards, providing the centripetal force needed to turn. Without that inward push, you'd continue in a straight line.
*   **Formal/Mathematical Version:** The force required to maintain circular motion is the **centripetal force**.
    $$F_c = \frac{mv^2}{r}$$
    Where:
    *   $F_c$ is the centripetal force.
    *   $m$ is the mass of the orbiting object.
    *   $v$ is the orbital speed (what we want to find!).
    *   $r$ is the radius of the circular orbit.
*   **What could go wrong:** Forgetting that $v$ here is the *speed* (magnitude of velocity) and that the force is always perpendicular to the direction of motion, constantly changing the direction but not necessarily the speed. Also, again, confusing $r$ as just altitude.

### Step 3: Equate the two forces.

*   **Plain-English Statement:** For a stable circular orbit, the gravitational force pulling the satellite inwards *is* the centripetal force that keeps it moving in a circle. These two forces aren't separate things; gravity *provides* the necessary centripetal force. Therefore, they must be equal in magnitude.
*   **Concrete Example:** In our string-and-ball analogy, the tension in the string *is* the centripetal force. If the string breaks, there's no centripetal force, and the ball flies off. In orbit, if gravity suddenly vanished, the satellite would fly off.
*   **Formal/Mathematical Version:** Set the gravitational force equal to the centripetal force:
    $$F_G = F_c$$
    $$\frac{GMm}{r^2} = \frac{mv^2}{r}$$
*   **What could go wrong:** Accidentally reversing the terms, or forgetting which mass goes where. The mass $m$ is the orbiting object, $M$ is the central body. Both forces depend on the orbiting object's mass ($m$) and the orbital radius ($r$).

### Step 4: Solve for the orbital velocity ($v$).

*   **Plain-English Statement:** Now that we have an equation where gravity's pull equals the requirement for circular motion, we can use algebra to isolate the speed ($v$) that makes this balance happen.
*   **Concrete Example:** If you know how much money you have and how much an item costs, you can figure out how many items you can buy. Here, we know the forces, and we want to find the speed.
*   **Formal/Mathematical Version:**
    Start with the equated forces:
    $$\frac{GMm}{r^2} = \frac{mv^2}{r}$$
    First, notice that the mass of the orbiting object ($m$) appears on both sides. We can cancel it out! This is a profound result: the orbital velocity doesn't depend on the mass of the satellite itself.
    $$\frac{GM}{r^2} = \frac{v^2}{r}$$
    Next, multiply both sides by $r$ to isolate $v^2$:
    $$\frac{GM}{r} = v^2$$
    Finally, take the square root of both sides to solve for $v$:
    $$v = \sqrt{\frac{GM}{r}}$$
*   **What could go wrong:**
    *   Forgetting to cancel $m$.
    *   Algebraic errors, especially with the $r$ terms (e.g., multiplying by $r^2$ instead of $r$).
    *   Forgetting the square root at the end.
    *   Not understanding the significance of $m$ cancelling out (it means a feather and a hammer orbit at the same speed if at the same radius, assuming negligible air resistance).

This final equation, $v = \sqrt{\frac{GM}{r}}$, is the orbital velocity required for a stable circular orbit. It tells us that orbital velocity depends only on the mass of the central body ($M$) and the radius of the orbit ($r$).

## 5. Worked examples — multiple, with every step shown

### Example 1: Easy - Low Earth Orbit Satellite

**Problem:** Calculate the orbital velocity of a satellite orbiting Earth at an altitude of 400 km.
(Given: Mass of Earth $M_E = 5.972 \times 10^{24} \text{ kg}$, Radius of Earth $R_E = 6.371 \times 10^6 \text{ m}$, Gravitational Constant $G = 6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2$)

**Identify what's given and what we want:**
*   Given:
    *   Altitude $h = 400 \text{ km} = 400 \times 10^3 \text{ m}$
    *   Mass of Earth $M = 5.972 \times 10^{24} \text{ kg}$
    *   Radius of Earth $R_E = 6.371 \times 10^6 \text{ m}$
    *   Gravitational Constant $G = 6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2$
*   Want: Orbital velocity $v$

**Show every algebraic / logical step:**

1.  **Calculate the orbital radius ($r$):** The orbital radius is the distance from the center of the Earth to the satellite.
    $$r = R_E + h$$
    $$r = 6.371 \times 10^6 \text{ m} + 400 \times 10^3 \text{ m}$$
    $$r = 6.371 \times 10^6 \text{ m} + 0.400 \times 10^6 \text{ m}$$
    $$r = 6.771 \times 10^6 \text{ m}$$
    *Explanation: We must use the distance from the center of the central body, not just the altitude above its surface.*

2.  **State the formula for orbital velocity:**
    $$v = \sqrt{\frac{GM}{r}}$$
    *Explanation: This is the derived formula we just learned.*

3.  **Substitute the known values into the formula:**
    $$v = \sqrt{\frac{(6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2)(5.972 \times 10^{24} \text{ kg})}{6.771 \times 10^6 \text{ m}}}$$
    *Explanation: Plug in the values for G, M (Earth's mass), and the calculated orbital radius $r$. Ensure all units are SI.*

4.  **Perform the multiplication in the numerator:**
    $$GM = (6.674 \times 10^{-11})(5.972 \times 10^{24}) \text{ N m}^2/\text{kg}$$
    $$GM \approx 3.986 \times 10^{14} \text{ N m}^2/\text{kg}$$
    *Explanation: Calculate the product of G and M first to simplify the expression.*

5.  **Perform the division:**
    $$\frac{GM}{r} = \frac{3.986 \times 10^{14} \text{ N m}^2/\text{kg}}{6.771 \times 10^6 \text{ m}}$$
    $$\frac{GM}{r} \approx 5.887 \times 10^7 \text{ m}^2/\text{s}^2$$
    *Explanation: Divide the result from step 4 by the orbital radius. Note how the units simplify to (m/s)^2, which is correct for v^2.*

6.  **Take the square root:**
    $$v = \sqrt{5.887 \times 10^7 \text{ m}^2/\text{s}^2}$$
    $$v \approx 7673 \text{ m/s}$$
    *Explanation: The final step is to take the square root to get the velocity in meters per second.*

**Final Answer:**
$$ \boxed{v \approx 7673 \text{ m/s}}$$
(or approximately $7.67 \text{ km/s}$)

**Reflection:** This example was straightforward, primarily testing the correct use of the formula and unit consistency. The main "trap" was remembering to add the Earth's radius to the altitude to get the full orbital radius $r$.

---

### Example 2: Medium - Satellite around Mars

**Problem:** A scientific probe is designed to orbit Mars at an altitude of 300 km. What is its orbital velocity?
(Given: Mass of Mars $M_{Mars} = 6.417 \times 10^{23} \text{ kg}$, Radius of Mars $R_{Mars} = 3.389 \times 10^6 \text{ m}$, Gravitational Constant $G = 6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2$)

**Identify what's given and what we want:**
*   Given:
    *   Altitude $h = 300 \text{ km} = 300 \times 10^3 \text{ m}$
    *   Mass of Mars $M = 6.417 \times 10^{23} \text{ kg}$
    *   Radius of Mars $R_{Mars} = 3.389 \times 10^6 \text{ m}$
    *   Gravitational Constant $G = 6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2$
*   Want: Orbital velocity $v$

**Show every algebraic / logical step:**

1.  **Calculate the orbital radius ($r$):**
    $$r = R_{Mars} + h$$
    $$r = 3.389 \times 10^6 \text{ m} + 300 \times 10^3 \text{ m}$$
    $$r = 3.389 \times 10^6 \text{ m} + 0.300 \times 10^6 \text{ m}$$
    $$r = 3.689 \times 10^6 \text{ m}$$
    *Explanation: As before, add the planet's radius to the altitude to get the total orbital radius.*

2.  **State the formula for orbital velocity:**
    $$v = \sqrt{\frac{GM}{r}}$$
    *Explanation: Use the standard orbital velocity formula.*

3.  **Substitute the known values into the formula:**
    $$v = \sqrt{\frac{(6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2)(6.417 \times 10^{23} \text{ kg})}{3.689 \times 10^6 \text{ m}}}$$
    *Explanation: Substitute G, the mass of Mars, and the calculated orbital radius.*

4.  **Perform the multiplication in the numerator:**
    $$GM = (6.674 \times 10^{-11})(6.417 \times 10^{23}) \text{ N m}^2/\text{kg}$$
    $$GM \approx 4.279 \times 10^{13} \text{ N m}^2/\text{kg}$$
    *Explanation: Calculate the product of G and M.*

5.  **Perform the division:**
    $$\frac{GM}{r} = \frac{4.279 \times 10^{13} \text{ N m}^2/\text{kg}}{3.689 \times 10^6 \text{ m}}$$
    $$\frac{GM}{r} \approx 1.160 \times 10^7 \text{ m}^2/\text{s}^2$$
    *Explanation: Divide by the orbital radius.*

6.  **Take the square root:**
    $$v = \sqrt{1.160 \times 10^7 \text{ m}^2/\text{s}^2}$$
    $$v \approx 3406 \text{ m/s}$$
    *Explanation: Take the square root to get the final velocity.*

**Final Answer:**
$$ \boxed{v \approx 3406 \text{ m/s}}$$
(or approximately $3.41 \text{ km/s}$)

**Reflection:** This example reinforces the application of the formula with different planetary parameters. Notice the significantly lower velocity compared to Earth orbit, primarily due to Mars's smaller mass. It highlights that orbital velocity is specific to the central body and orbital radius.

---

### Example 3: Harder - Geosynchronous Orbit Altitude

**Problem:** A satellite in geosynchronous orbit around Earth appears to stay above the same point on the equator. This means its orbital period is exactly one sidereal day (the time it takes for Earth to rotate once relative to the distant stars). Calculate the orbital altitude of such a satellite. (Then, calculate its orbital velocity.)
(Given: Mass of Earth $M_E = 5.972 \times 10^{24} \text{ kg}$, Radius of Earth $R_E = 6.371 \times 10^6 \text{ m}$, Gravitational Constant $G = 6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2$, Sidereal Day $T = 23 \text{ hours } 56 \text{ minutes } 4 \text{ seconds}$)

**Identify what's given and what we want:**
*   Given:
    *   Period $T = 23 \text{ h } 56 \text{ min } 4 \text{ s}$
    *   Mass of Earth $M = 5.972 \times 10^{24} \text{ kg}$
    *   Radius of Earth $R_E = 6.371 \times 10^6 \text{ m}$
    *   Gravitational Constant $G = 6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2$
*   Want: Orbital altitude $h$, then orbital velocity $v$.

**Show every algebraic / logical step:**

1.  **Convert the period to seconds:**
    $$T = 23 \text{ h} \times \frac{3600 \text{ s}}{1 \text{ h}} + 56 \text{ min} \times \frac{60 \text{ s}}{1 \text{ min}} + 4 \text{ s}$$
    $$T = 82800 \text{ s} + 3360 \text{ s} + 4 \text{ s}$$
    $$T = 86164 \text{ s}$$
    *Explanation: All calculations require SI units, so convert hours and minutes to seconds.*

2.  **Relate orbital velocity to orbital period and radius:** For a circular orbit, distance equals speed times time. The distance is the circumference of the orbit ($2\pi r$).
    $$v = \frac{2\pi r}{T}$$
    *Explanation: This is the definition of speed for an object moving in a circle.*

3.  **Equate this velocity expression with the derived orbital velocity formula:**
    $$\frac{2\pi r}{T} = \sqrt{\frac{GM}{r}}$$
    *Explanation: We have two expressions for $v$. Since they both represent the same orbital velocity, we can set them equal to each other.*

4.  **Solve for $r$ (orbital radius) algebraically:**
    Square both sides to get rid of the square root:
    $$\left(\frac{2\pi r}{T}\right)^2 = \frac{GM}{r}$$
    $$\frac{4\pi^2 r^2}{T^2} = \frac{GM}{r}$$
    Multiply both sides by $r$:
    $$\frac{4\pi^2 r^3}{T^2} = GM$$
    Multiply both sides by $T^2$ and divide by $4\pi^2$:
    $$r^3 = \frac{GMT^2}{4\pi^2}$$
    Take the cube root of both sides:
    $$r = \sqrt[3]{\frac{GMT^2}{4\pi^2}}$$
    *Explanation: This is the most complex algebraic manipulation. We need to isolate $r$. Squaring both sides is the first step to remove the square root. Then, careful multiplication and division lead to $r^3$, and finally, the cube root gives $r$.*

5.  **Substitute values and calculate $r$:**
    $$r = \sqrt[3]{\frac{(6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2)(5.972 \times 10^{24} \text{ kg})(86164 \text{ s})^2}{4\pi^2}}$$
    Calculate the numerator:
    $$(6.674 \times 10^{-11})(5.972 \times 10^{24})(86164)^2 \approx (3.986 \times 10^{14})(7.424 \times 10^9)$$
    $$\approx 2.959 \times 10^{24} \text{ m}^3$$
    Calculate the denominator:
    $$4\pi^2 \approx 39.478$$
    Now divide:
    $$r^3 = \frac{2.959 \times 10^{24} \text{ m}^3}{39.478} \approx 7.500 \times 10^{22} \text{ m}^3$$
    Take the cube root:
    $$r = \sqrt[3]{7.500 \times 10^{22} \text{ m}^3}$$
    $$r \approx 4.217 \times 10^7 \text{ m}$$
    *Explanation: Carefully substitute all values and perform the calculations. It's often helpful to break down complex calculations into smaller steps (numerator, denominator, then division, then cube root).*

6.  **Calculate the orbital altitude ($h$):**
    $$h = r - R_E$$
    $$h = 4.217 \times 10^7 \text{ m} - 6.371 \times 10^6 \text{ m}$$
    $$h = 42.17 \times 10^6 \text{ m} - 6.371 \times 10^6 \text{ m}$$
    $$h = 3.580 \times 10^7 \text{ m}$$
    *Explanation: The altitude is the orbital radius minus the Earth's radius.*

**First Part Final Answer (Altitude):**
$$ \boxed{h \approx 3.580 \times 10^7 \text{ m}}$$
(or approximately $35,800 \text{ km}$)

7.  **Now, calculate the orbital velocity ($v$) using the calculated $r$:**
    $$v = \frac{2\pi r}{T}$$
    $$v = \frac{2\pi (4.217 \times 10^7 \text{ m})}{86164 \text{ s}}$$
    $$v = \frac{264.9 \times 10^6 \text{ m}}{86164 \text{ s}}$$
    $$v \approx 3074 \text{ m/s}$$
    *Explanation: Now that we have $r$ and $T$, we can easily calculate $v$ using the definition of speed for circular motion.*
    (Alternatively, we could use $v = \sqrt{\frac{GM}{r}}$:
    $$v = \sqrt{\frac{(6.674 \times 10^{-11})(5.972 \times 10^{24})}{4.217 \times 10^7}}$$
    $$v = \sqrt{\frac{3.986 \times 10^{14}}{4.217 \times 10^7}} = \sqrt{9.452 \times 10^6} \approx 3074 \text{ m/s}$$
    Both methods yield the same result, serving as a good cross-check.)

**Second Part Final Answer (Velocity):**
$$ \boxed{v \approx 3074 \text{ m/s}}$$
(or approximately $3.07 \text{ km/s}$)

**Reflection:** This example was harder because it required combining the orbital velocity formula with the definition of orbital period. The key was to derive an expression for $r$ in terms of $G, M, T,$ and $\pi$, then calculate $r$ before finding $h$ and $v$. Algebraic manipulation and careful unit conversion were critical.

---

### Example 4: Hardest - Determine Mass of Central Body

**Problem:** A newly discovered exoplanet has a moon orbiting it at a radius of $1.5 \times 10^8 \text{ m}$ with an orbital period of $3.5 \times 10^5 \text{ s}$. Estimate the mass of this exoplanet.
(Given: Orbital radius $r = 1.5 \times 10^8 \text{ m}$, Orbital period $T = 3.5 \times 10^5 \text{ s}$, Gravitational Constant $G = 6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2$)

**Identify what's given and what we want:**
*   Given:
    *   Orbital radius $r = 1.5 \times 10^8 \text{ m}$
    *   Orbital period $T = 3.5 \times 10^5 \text{ s}$
    *   Gravitational Constant $G = 6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2$
*   Want: Mass of the exoplanet $M$.

**Show every algebraic / logical step:**

1.  **Start with the relationship derived in Example 3 for orbital radius:**
    $$r^3 = \frac{GMT^2}{4\pi^2}$$
    *Explanation: This equation relates the orbital radius, period, and the mass of the central body. It's a powerful result from combining the centripetal and gravitational force equations.*

2.  **Rearrange the formula to solve for $M$:**
    Multiply both sides by $4\pi^2$:
    $$4\pi^2 r^3 = GMT^2$$
    Divide both sides by $GT^2$:
    $$M = \frac{4\pi^2 r^3}{GT^2}$$
    *Explanation: We need to isolate $M$. This involves multiplying by $4\pi^2$ and dividing by $GT^2$. This algebraic step is crucial.*

3.  **Substitute the known values into the formula:**
    $$M = \frac{4\pi^2 (1.5 \times 10^8 \text{ m})^3}{(6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2)(3.5 \times 10^5 \text{ s})^2}$$
    *Explanation: Plug in the given values for $r$, $T$, and $G$. Ensure all units are SI.*

4.  **Calculate the terms in the numerator:**
    $$(1.5 \times 10^8 \text{ m})^3 = (1.5)^3 \times (10^8)^3 \text{ m}^3 = 3.375 \times 10^{24} \text{ m}^3$$
    $$4\pi^2 (3.375 \times 10^{24} \text{ m}^3) \approx 39.478 \times 3.375 \times 10^{24} \text{ m}^3$$
    $$\text{Numerator} \approx 1.333 \times 10^{26} \text{ m}^3$$
    *Explanation: First cube the radius, then multiply by $4\pi^2$. Be careful with exponents when cubing.*

5.  **Calculate the terms in the denominator:**
    $$(3.5 \times 10^5 \text{ s})^2 = (3.5)^2 \times (10^5)^2 \text{ s}^2 = 12.25 \times 10^{10} \text{ s}^2 = 1.225 \times 10^{11} \text{ s}^2$$
    $$(6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2)(1.225 \times 10^{11} \text{ s}^2) \approx 8.176 \text{ N m}^2 \text{ s}^2/\text{kg}$$
    $$\text{Denominator} \approx 8.176 \text{ N m}^2 \text{ s}^2/\text{kg}$$
    *Explanation: First square the period, then multiply by $G$. Pay attention to unit cancellation. Recall that $1 \text{ N} = 1 \text{ kg m/s}^2$. So $\text{N m}^2 \text{ s}^2/\text{kg} = (\text{kg m/s}^2) \text{ m}^2 \text{ s}^2/\text{kg} = \text{m}^3/\text{kg} \cdot \text{kg} = \text{m}^3$. Wait, this unit analysis is slightly off. Let's re-evaluate the denominator units: $\text{N m}^2/\text{kg}^2 \cdot \text{s}^2 = (\text{kg m/s}^2) \text{ m}^2/\text{kg}^2 \cdot \text{s}^2 = \text{m}^3/\text{kg}$. This is correct for the denominator. So the overall unit for M will be $\text{m}^3 / (\text{m}^3/\text{kg}) = \text{kg}$.*

6.  **Perform the final division:**
    $$M = \frac{1.333 \times 10^{26} \text{ m}^3}{8.176 \text{ m}^3/\text{kg}}$$
    $$M \approx 1.630 \times 10^{25} \text{ kg}$$
    *Explanation: Divide the numerator by the denominator. The units correctly cancel to give kilograms, which is the unit for mass.*

**Final Answer:**
$$ \boxed{M \approx 1.630 \times 10^{25} \text{ kg}}$$

**Reflection:** This example was the hardest because it required solving for a different variable ($M$) and involved more complex algebraic rearrangement and careful handling of exponents and units. It demonstrates the power of the derived relationships to determine unknown properties of celestial bodies based on orbital observations, which is a cornerstone of astrophysics.

## 6. Common mistakes and traps

1.  **Using Altitude instead of Orbital Radius ($r$):** The most frequent error. The formula $v = \sqrt{\frac{GM}{r}}$ uses $r$ as the distance from the *center* of the central body to the *center* of the orbiting object. If given the altitude ($h$) above the surface, you must add the radius of the central body ($R$) to get $r = R + h$.
2.  **Confusing Masses ($M$ vs. $m$):** In the formula $v = \sqrt{\frac{GM}{r}}$, $M$ is always the mass of the *central body* (the one being orbited), not the mass of the orbiting satellite ($m$). The satellite's mass cancels out during the derivation.
3.  **Incorrect Units:** Not converting all quantities to consistent SI units (meters for distance, kilograms for mass, seconds for time) before calculation. This often leads to wildly incorrect answers.
4.  **Algebraic Errors:** Mistakes in rearranging the formula, especially when dealing with squares, square roots, or cube roots (as seen in the harder examples). Always double-check your algebraic steps.
5.  **Confusing $G$ and $g$:** $G$ is the universal gravitational constant ($6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2$), a fundamental constant of nature. $g$ is the acceleration due to gravity (approximately $9.81 \text{ m/s}^2$ on Earth's surface), which is specific to a location and depends on $G$, $M$, and $R$. Do not use $g$ in the orbital velocity formula.
6.  **Forgetting the Square Root:** A common oversight is to calculate $v^2$ and forget the final step of taking the square root to find $v$.

## 7. Textbook-precise explanation

For an object of mass $m$ to maintain a stable circular orbit around a central body of mass $M$, the gravitational force exerted by the central body on the orbiting object must provide the necessary centripetal force for its circular motion.

According to Newton's Law of Universal Gravitation, the magnitude of the gravitational force ($F_G$) between the two bodies is given by:
$$F_G = G \frac{Mm}{r^2}$$
where $G$ is the universal gravitational constant, $M$ is the mass of the central body, $m$ is the mass of the orbiting object, and $r$ is the distance between the centers of the two bodies (i.e., the radius of the orbit).

For an object moving in a circular path of radius $r$ with a tangential speed $v$, the magnitude of the centripetal force ($F_c$) required to maintain this motion is given by:
$$F_c = \frac{mv^2}{r}$$
where $m$ is the mass of the orbiting object and $v$ is its orbital speed.

For a stable circular orbit, these two forces must be equal in magnitude:
$$F_G = F_c$$
$$G \frac{Mm}{r^2} = \frac{mv^2}{r}$$

We can observe that the mass of the orbiting object, $m$, appears on both sides of the equation, allowing it to be canceled out:
$$G \frac{M}{r^2} = \frac{v^2}{r}$$

To solve for the orbital speed $v$, we multiply both sides by $r$:
$$G \frac{M}{r} = v^2$$

Finally, taking the square root of both sides yields the formula for the orbital velocity in a circular orbit:
$$v = \sqrt{\frac{GM}{r}}$$

This equation demonstrates that the orbital velocity for a circular orbit depends only on the mass of the central body ($M$) and the radius of the orbit ($r$), and is independent of the mass of the orbiting object ($m$).

*Reference: Serway, Raymond A., and John W. Jewett Jr. *Physics for Scientists and Engineers*. 9th ed. Cengage Learning, 2014. Chapter 13, Section 13.4.*

## 8. ASCII diagrams

```text
       . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
     .                                                                                             .
   .                                                                                                 .
  .                                                                                                   .
 .                                                                                                     .
.                                                                                                       .
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                 +-------------------------------------+                               |
|                                 |                                     |                               |
|                                 |  Central Body (Mass M)              |                               |
|                                 |                                     |                               |
|                                 +-------------------------------------+                               |
|                                          / \                                                          |
|                                         /   \                                                         |
|                                        /     \                                                        |
|                                       /       \                                                       |
|                                      /         \                                                      |
|                                     /           \                                                     |
|                                    /             \                                                    |
|                                   /               \                                                   |
|                                  /                 \                                                  |
|                                 /                   \                                                 |
|                                /                     \                                                |
|                               /                       \                                               |
|                              /                         \                                              |
|                             /                           \                                             |
|                            /                             \                                            |
|                           /                               \                                           |
|                          /                                 \                                          |
|                         /                                   \                                         |
|                        /                                     \                                        |
|                       /                                       \                                       |
|                      /                                         \                                      |
|                     /                                           \                                     |
|                    /                                             \                                    |
|                   /                                               \                                   |
|                  /                                                 \                                  |
|                 /                                                   \                                 |
|                /                                                     \                                |
|               /                                                       \                               |
|              /                                                         \                              |
|             /                                                           \                             |
|            /                                                             \                            |
|           /                                                               \                           |
|          /                                                                 \                          |
|         /                                                                   \                         |
|        /                                                                     \                        |
|       /                                                                       \                       |
|      /                                                                         \                      |
|     /                                                                           \                     |
|    /                                                                             \                    |
|   /                                                                               \                   |
|  /                                                                                 \                  |
| /                                                                                   \                 |
|/                                                                                     \                |
+---------------------------------------------------------------------------------------+                |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |