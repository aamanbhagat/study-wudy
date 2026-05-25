## 1. What it is — in plain English

Imagine you're swinging a ball on a string in a perfect circle above your head. The ball is always moving, but it's also always staying the same distance from your hand. That's pretty much what a circular orbit is! It's when an object, like a satellite or a planet, moves around a much larger central object, like Earth or the Sun, in a path that's almost a perfect circle.

The key idea is a perfect balance: the central object's gravity is constantly pulling the orbiting object inward, trying to make it fall. But the orbiting object is also moving sideways so fast that it's constantly "missing" the central object. It's like trying to fall towards something but always having enough forward speed to curve around it instead of hitting it.

In a circular orbit, this balance is so precise that the object maintains a constant speed and stays at an exact, unchanging distance from the center of the larger body. It's the simplest and most fundamental type of orbit, a perfect cosmic dance where gravity and momentum are in perfect harmony.

## 2. Why it matters — real-world applications

Circular orbits are not just theoretical constructs; they are the backbone of modern space technology and our understanding of the universe.

1.  **Global Positioning Systems (GPS):** The satellites that power GPS (like those from Lockheed Martin for the US Space Force's GPS III constellation) orbit Earth in nearly circular paths at a specific altitude (around 20,200 km). Their precise, predictable circular orbits are crucial for accurate timing and location data, enabling everything from navigating your car to precision farming and disaster response.
2.  **Communication Satellites:** Many telecommunications satellites (e.g., those built by Boeing or Airbus for companies like SES or Viasat) are placed in geosynchronous or geostationary orbits, which are special types of circular orbits. A geostationary satellite orbits Earth at an altitude of about 35,786 km above the equator, completing one orbit in exactly 24 hours. This makes it appear stationary from the ground, allowing ground antennas to remain fixed without tracking, providing continuous TV, internet, and phone services.
3.  **International Space Station (ISS):** The ISS, a collaborative project involving NASA, Roscosmos, ESA, JAXA, and CSA, orbits Earth in a nearly circular path at an altitude of about 400 km. Its stable, low Earth orbit allows for continuous scientific research in microgravity and serves as a testbed for future space exploration technologies. Understanding its circular orbit is fundamental to planning resupply missions and crew rotations.
4.  **Weather and Earth Observation Satellites:** Satellites like NOAA's POES (Polar-orbiting Operational Environmental Satellites) or NASA's Landsat series often use circular polar orbits. These allow them to pass over virtually every point on Earth's surface multiple times a day, providing comprehensive data for weather forecasting, climate monitoring, and environmental management.

## 3. Prerequisites — what you must know first

Before diving deep into circular orbits, ensure you have a solid grasp of these fundamental concepts:

*   **Newton's Laws of Motion:** Especially the First Law (inertia – an object in motion stays in motion unless acted upon) and Second Law ($F=ma$).
*   **Newton's Law of Universal Gravitation:** The force of attraction between any two masses ($F_g = G\frac{Mm}{r^2}$).
*   **Centripetal Force and Acceleration:** The force and acceleration required to keep an object moving in a circular path ($a_c = \frac{v^2}{r}$, $F_c = m\frac{v^2}{r}$).
*   **Basic Kinematics:** Understanding concepts like speed ($v = \frac{d}{t}$), distance, and time. For circular motion, specifically how distance relates to circumference ($C = 2\pi r$).
*   **Work and Energy:** Kinetic energy ($K = \frac{1}{2}mv^2$), gravitational potential energy ($U = -G\frac{Mm}{r}$), and the principle of conservation of mechanical energy.
*   **Algebra and Trigonometry:** Proficiency in manipulating equations, solving for variables, and understanding basic geometric relationships (like the circumference of a circle).
*   **Units and Conversions:** The importance of using consistent units (preferably SI units: meters, kilograms, seconds) and how to convert between them.

## 4. The core idea — step by step

The core idea of a circular orbit revolves around a delicate balance of forces and the resulting motion. We'll break it down into deriving the key characteristics: velocity, period, and energy.

### Step 1: The Force Balance — Gravitational Force Provides Centripetal Force

**Plain English Statement:** For an object to move in a perfect circle around another object, the inward pull of gravity must be exactly equal to the force needed to keep it moving in that circle (the centripetal force). If gravity is too strong, the object falls; if it's too weak, the object flies away.

**Concrete Example:** Imagine swinging a bucket of water over your head in a circle. The tension in your arm (pulling the bucket inward) is providing the centripetal force. If you let go, the bucket flies off in a straight line. In orbit, gravity plays the role of your arm, constantly pulling the satellite inward, preventing it from flying off into space.

**Formal/Mathematical Version:**
We equate Newton's Law of Universal Gravitation to the formula for centripetal force.
Let $M$ be the mass of the central body (e.g., Earth), and $m$ be the mass of the orbiting satellite.
Let $r$ be the radius of the circular orbit (distance from the center of $M$ to the center of $m$).
Let $G$ be the universal gravitational constant ($6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2$).
Let $v$ be the orbital speed of the satellite.

The gravitational force ($F_g$) acting on the satellite is:
$$F_g = G \frac{Mm}{r^2}$$

The centripetal force ($F_c$) required to keep the satellite in a circular orbit is:
$$F_c = m \frac{v^2}{r}$$

For a stable circular orbit, these two forces must be equal:
$$F_g = F_c$$
$$G \frac{Mm}{r^2} = m \frac{v^2}{r}$$

**What could go wrong:** A common mistake is thinking of centripetal force as a *new* type of force. It's not. It's the *role* that an existing force (in this case, gravity) plays in causing circular motion. Another trap is confusing the mass of the central body ($M$) with the mass of the orbiting object ($m$).

### Step 2: Orbital Velocity ($v$)

**Plain English Statement:** This is how fast an object *must* travel to maintain a circular orbit at a specific distance from the central body. It's a very precise speed; too slow and it falls, too fast and it flies away into an elliptical or escape trajectory.

**Concrete Example:** The International Space Station (ISS) orbits at about 400 km above Earth's surface. To stay in that orbit, it has to travel at approximately 7.66 kilometers per second (about 17,100 miles per hour!). If it went slower, it would start to descend; faster, and its orbit would expand.

**Formal/Mathematical Version:**
We start from the force balance equation derived in Step 1:
$$G \frac{Mm}{r^2} = m \frac{v^2}{r}$$
Notice that the mass of the orbiting object ($m$) appears on both sides. This is a crucial insight: the orbital velocity for a given radius does *not* depend on the mass of the orbiting object!
Divide both sides by $m$:
$$G \frac{M}{r^2} = \frac{v^2}{r}$$
Multiply both sides by $r$:
$$G \frac{M}{r} = v^2$$
Take the square root of both sides to solve for $v$:
$$v = \sqrt{\frac{GM}{r}}$$
This is the orbital velocity for a circular orbit.

**What could go wrong:** Forgetting to take the square root, or accidentally including the mass of the orbiting object ($m$) in the final velocity formula. Also, remember that $r$ is the distance from the *center* of the central body, not just the altitude above its surface. So, $r = R_{body} + h$, where $R_{body}$ is the radius of the central body and $h$ is the altitude.

### Step 3: Orbital Period ($T$)

**Plain English Statement:** The orbital period is the time it takes for an orbiting object to complete one full revolution around the central body. It's essentially the "year" for that specific orbit.

**Concrete Example:** The ISS has an orbital period of about 92 minutes. This means it circles the Earth about 15-16 times a day. A geostationary satellite, on the other hand, has an orbital period of exactly 24 hours, matching Earth's rotation.

**Formal/Mathematical Version:**
For an object moving in a circle at a constant speed, the distance traveled in one period ($T$) is the circumference of the circle, $2\pi r$.
The relationship between speed, distance, and time is $v = \frac{\text{distance}}{\text{time}}$.
So, for one orbit:
$$v = \frac{2\pi r}{T}$$
We can rearrange this to solve for $T$:
$$T = \frac{2\pi r}{v}$$
Now, substitute the expression for $v$ we found in Step 2 ($v = \sqrt{\frac{GM}{r}}$):
$$T = \frac{2\pi r}{\sqrt{\frac{GM}{r}}}$$
To simplify, bring the $\sqrt{\frac{GM}{r}}$ term into the denominator:
$$T = 2\pi r \sqrt{\frac{r}{GM}}$$
$$T = 2\pi \sqrt{\frac{r^2 \cdot r}{GM}}$$
$$T = 2\pi \sqrt{\frac{r^3}{GM}}$$
This is the orbital period for a circular orbit. This relationship is a specific case of Kepler's Third Law for circular orbits.

**What could go wrong:** Algebraic errors when substituting $v$ and simplifying the square root. Forgetting that the distance is the circumference ($2\pi r$).

### Step 4: Orbital Energy ($E$)

**Plain English Statement:** The total mechanical energy of an orbiting object is the sum of its kinetic energy (energy of motion) and its gravitational potential energy (energy due to its position in the gravitational field). For a stable circular orbit, this total energy is constant and always negative, indicating that the object is "bound" to the central body.

**Concrete Example:** To launch a satellite into a higher orbit, you need to give it more energy. This means increasing its total mechanical energy, making it less negative (closer to zero). If you give it enough energy to reach zero or positive total energy, it will escape Earth's gravity entirely.

**Formal/Mathematical Version:**
The total mechanical energy ($E$) is the sum of kinetic energy ($K$) and gravitational potential energy ($U$):
$$E = K + U$$
The kinetic energy is:
$$K = \frac{1}{2}mv^2$$
The gravitational potential energy is (remember the negative sign, as potential energy is conventionally zero at infinite separation):
$$U = -G\frac{Mm}{r}$$
So, the total energy is:
$$E = \frac{1}{2}mv^2 - G\frac{Mm}{r}$$
Now, we can substitute the expression for $v^2$ from Step 2. From $v = \sqrt{\frac{GM}{r}}$, we get $v^2 = \frac{GM}{r}$.
Substitute this into the energy equation:
$$E = \frac{1}{2}m \left(\frac{GM}{r}\right) - G\frac{Mm}{r}$$
$$E = \frac{GMm}{2r} - \frac{GMm}{r}$$
To combine these terms, find a common denominator:
$$E = \frac{GMm}{2r} - \frac{2GMm}{2r}$$
$$E = -\frac{GMm}{2r}$$
This is the total mechanical energy for an object in a circular orbit. The negative sign signifies that the object is gravitationally bound to the central body.

**What could go wrong:** Forgetting the negative sign for gravitational potential energy, or making an algebraic error when combining the kinetic and potential energy terms. It's crucial to remember that total energy for a bound orbit is always negative.

### Step 5: Specific Orbital Energy ($\epsilon$)

**Plain English Statement:** This is simply the total orbital energy divided by the mass of the orbiting object. It's useful because it describes the energy of the orbit itself, independent of how heavy the satellite is. It's the "energy per kilogram" of the satellite.

**Concrete Example:** If you're comparing two different orbits, say a Low Earth Orbit (LEO) and a Medium Earth Orbit (MEO), the specific orbital energy tells you which orbit requires more energy *per unit mass* to achieve. This is a fundamental concept in mission planning, as it relates directly to the $\Delta V$ (change in velocity) required for maneuvers.

**Formal/Mathematical Version:**
Specific orbital energy ($\epsilon$) is defined as the total orbital energy ($E$) divided by the mass of the orbiting object ($m$):
$$\epsilon = \frac{E}{m}$$
Using the formula for $E$ from Step 4:
$$\epsilon = \frac{-\frac{GMm}{2r}}{m}$$
Cancel out $m$:
$$\epsilon = -\frac{GM}{2r}$$
This is the specific orbital energy for a circular orbit.

**What could go wrong:** Forgetting to divide by $m$, or confusing specific energy with total energy. The units are different (Joules for E, Joules/kg for $\epsilon$).

## 5. Worked examples — multiple, with every step shown

We will use the following constants for Earth:
*   Mass of Earth ($M_E$) = $5.972 \times 10^{24} \text{ kg}$
*   Radius of Earth ($R_E$) = $6.371 \times 10^6 \text{ m}$
*   Universal Gravitational Constant ($G$) = $6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2$
*   Gravitational parameter of Earth ($\mu = GM_E$) = $3.986 \times 10^{14} \text{ m}^3/\text{s}^2$ (often used to simplify calculations for Earth orbits)

---

### Example 1: International Space Station (ISS) Velocity and Period

**Problem:** The International Space Station (ISS) orbits at an average altitude of approximately 420 km above Earth's surface. Assuming a perfectly circular orbit, calculate its orbital velocity and orbital period.

**Given:**
*   Altitude ($h$) = $420 \text{ km} = 420 \times 10^3 \text{ m}$
*   Mass of Earth ($M_E$) = $5.972 \times 10^{24} \text{ kg}$
*   Radius of Earth ($R_E$) = $6.371 \times 10^6 \text{ m}$
*   Gravitational Constant ($G$) = $6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2$

**What we want:**
*   Orbital velocity ($v$)
*   Orbital period ($T$)

**Solution:**

**Step 1: Calculate the orbital radius ($r$).**
The orbital radius is the distance from the center of the Earth to the satellite.
$$r = R_E + h$$
$$r = 6.371 \times 10^6 \text{ m} + 420 \times 10^3 \text{ m}$$
$$r = 6.371 \times 10^6 \text{ m} + 0.420 \times 10^6 \text{ m}$$
$$r = (6.371 + 0.420) \times 10^6 \text{ m}$$
$$r = 6.791 \times 10^6 \text{ m}$$
*Explanation: We need the total distance from the center of the central body. This is the sum of the Earth's radius and the satellite's altitude above the surface. All units must be in meters for consistency.*

**Step 2: Calculate the orbital velocity ($v$).**
We use the formula derived in Step 2 of the core idea: $v = \sqrt{\frac{GM}{r}}$.
$$v = \sqrt{\frac{(6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2) \times (5.972 \times 10^{24} \text{ kg})}{6.791 \times 10^6 \text{ m}}}$$
First, calculate the numerator ($GM$):
$$GM = (6.674 \times 10^{-11}) \times (5.972 \times 10^{24}) = 3.986 \times 10^{14} \text{ m}^3/\text{s}^2$$
*Explanation: This is the gravitational parameter, $\mu$, for Earth. It's often pre-calculated for convenience.*
Now, substitute $GM$ and $r$ into the velocity formula:
$$v = \sqrt{\frac{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}{6.791 \times 10^6 \text{ m}}}$$
$$v = \sqrt{5.869 \times 10^7 \text{ m}^2/\text{s}^2}$$
$$v = 7661.0 \text{ m/s}$$
$$v \approx 7.661 \text{ km/s}$$
*Explanation: We perform the division and then take the square root to find the velocity in meters per second, then convert to kilometers per second for easier interpretation.*

**Step 3: Calculate the orbital period ($T$).**
We use the formula derived in Step 3 of the core idea: $T = 2\pi \sqrt{\frac{r^3}{GM}}$.
We already have $r = 6.791 \times 10^6 \text{ m}$ and $GM = 3.986 \times 10^{14} \text{ m}^3/\text{s}^2$.
First, calculate $r^3$:
$$r^3 = (6.791 \times 10^6 \text{ m})^3 = (6.791)^3 \times (10^6)^3 \text{ m}^3$$
$$r^3 = 313.98 \times 10^{18} \text{ m}^3 = 3.1398 \times 10^{20} \text{ m}^3$$
Now, substitute $r^3$ and $GM$ into the period formula:
$$T = 2\pi \sqrt{\frac{3.1398 \times 10^{20} \text{ m}^3}{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}}$$
$$T = 2\pi \sqrt{7.877 \times 10^5 \text{ s}^2}$$
$$T = 2\pi \times 887.5 \text{ s}$$
$$T = 5576.8 \text{ s}$$
To convert to minutes:
$$T = \frac{5576.8 \text{ s}}{60 \text{ s/min}} \approx 92.95 \text{ minutes}$$
*Explanation: We cube the orbital radius, then divide by GM, take the square root, and multiply by $2\pi$. The result is in seconds, which is then converted to minutes for practical understanding.*

**Final Answer:**
The orbital velocity of the ISS is $\boxed{7.661 \text{ km/s}}$.
The orbital period of the ISS is $\boxed{92.95 \text{ minutes}}$.

**Reflection:** This example highlights the importance of using the correct orbital radius (Earth's radius + altitude) and consistent units. The high velocity demonstrates why astronauts experience weightlessness – they are constantly falling around the Earth, not truly "floating" in zero gravity.

---

### Example 2: Geostationary Satellite Altitude

**Problem:** A geostationary satellite has an orbital period of exactly 24 hours. Calculate the altitude above Earth's surface at which it must orbit.

**Given:**
*   Orbital period ($T$) = $24 \text{ hours} = 24 \times 3600 \text{ s} = 86400 \text{ s}$
*   Mass of Earth ($M_E$) = $5.972 \times 10^{24} \text{ kg}$
*   Radius of Earth ($R_E$) = $6.371 \times 10^6 \text{ m}$
*   Gravitational Constant ($G$) = $6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2$
*   Gravitational parameter of Earth ($\mu = GM_E$) = $3.986 \times 10^{14} \text{ m}^3/\text{s}^2$

**What we want:**
*   Altitude ($h$)

**Solution:**

**Step 1: Use the orbital period formula to solve for orbital radius ($r$).**
We use the formula $T = 2\pi \sqrt{\frac{r^3}{GM}}$. We need to rearrange this to solve for $r$.
Divide by $2\pi$:
$$\frac{T}{2\pi} = \sqrt{\frac{r^3}{GM}}$$
Square both sides:
$$\left(\frac{T}{2\pi}\right)^2 = \frac{r^3}{GM}$$
Multiply by $GM$:
$$r^3 = GM \left(\frac{T}{2\pi}\right)^2$$
$$r^3 = \frac{GMT^2}{4\pi^2}$$
Take the cube root of both sides:
$$r = \sqrt[3]{\frac{GMT^2}{4\pi^2}}$$
*Explanation: We algebraically isolate $r$ from the period formula. This involves squaring to remove the square root, then multiplying, and finally taking the cube root.*

**Step 2: Substitute values and calculate $r$.**
$$r = \sqrt[3]{\frac{(3.986 \times 10^{14} \text{ m}^3/\text{s}^2) \times (86400 \text{ s})^2}{4\pi^2}}$$
Calculate $T^2$:
$$(86400 \text{ s})^2 = 7.46496 \times 10^9 \text{ s}^2$$
Calculate $4\pi^2$:
$$4\pi^2 \approx 4 \times (3.14159)^2 \approx 4 \times 9.8696 \approx 39.4784$$
Now, substitute these into the equation for $r$:
$$r = \sqrt[3]{\frac{(3.986 \times 10^{14}) \times (7.46496 \times 10^9)}{39.4784}}$$
$$r = \sqrt[3]{\frac{2.974 \times 10^{24}}{39.4784}}$$
$$r = \sqrt[3]{7.533 \times 10^{22} \text{ m}^3}$$
$$r = 4.216 \times 10^7 \text{ m}$$
*Explanation: Careful calculation of $T^2$ and $4\pi^2$ is important. Then perform the multiplication, division, and finally the cube root to get the orbital radius in meters.*

**Step 3: Calculate the altitude ($h$).**
The orbital radius is $r = R_E + h$. So, $h = r - R_E$.
$$h = 4.216 \times 10^7 \text{ m} - 6.371 \times 10^6 \text{ m}$$
$$h = 42.16 \times 10^6 \text{ m} - 6.371 \times 10^6 \text{ m}$$
$$h = (42.16 - 6.371) \times 10^6 \text{ m}$$
$$h = 35.789 \times 10^6 \text{ m}$$
$$h \approx 35,789 \text{ km}$$
*Explanation: Subtract the Earth's radius from the calculated orbital radius to find the altitude above the surface. Convert to kilometers for a more intuitive value.*

**Final Answer:**
The altitude of a geostationary satellite is $\boxed{35,789 \text{ km}}$.

**Reflection:** This example demonstrates how to rearrange formulas and highlights the precise altitude required for a geostationary orbit, which is critical for many communication and meteorological applications. It also shows the power of using the gravitational parameter $\mu = GM$ to simplify calculations.

---

### Example 3: Total and Specific Orbital Energy

**Problem:** A satellite of mass $m = 500 \text{ kg}$ is in a circular orbit at an altitude of $1000 \text{ km}$ above Earth's surface. Calculate its total orbital energy and its specific orbital energy.

**Given:**
*   Satellite mass ($m$) = $500 \text{ kg}$
*   Altitude ($h$) = $1000 \text{ km} = 1.0 \times 10^6 \text{ m}$
*   Mass of Earth ($M_E$) = $5.972 \times 10^{24} \text{ kg}$
*   Radius of Earth ($R_E$) = $6.371 \times 10^6 \text{ m}$
*   Gravitational Constant ($G$) = $6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2$
*   Gravitational parameter of Earth ($\mu = GM_E$) = $3.986 \times 10^{14} \text{ m}^3/\text{s}^2$

**What we want:**
*   Total orbital energy ($E$)
*   Specific orbital energy ($\epsilon$)

**Solution:**

**Step 1: Calculate the orbital radius ($r$).**
$$r = R_E + h$$
$$r = 6.371 \times 10^6 \text{ m} + 1.0 \times 10^6 \text{ m}$$
$$r = 7.371 \times 10^6 \text{ m}$$
*Explanation: As before, add the Earth's radius to the altitude to get the total orbital radius from the center of the Earth.*

**Step 2: Calculate the total orbital energy ($E$).**
We use the formula derived in Step 4 of the core idea: $E = -\frac{GMm}{2r}$.
$$E = -\frac{(3.986 \times 10^{14} \text{ m}^3/\text{s}^2) \times (500 \text{ kg})}{2 \times (7.371 \times 10^6 \text{ m})}$$
Calculate the numerator (excluding the negative sign for now):
$$GMm = (3.986 \times 10^{14}) \times 500 = 1.993 \times 10^{17} \text{ J m}$$
Calculate the denominator:
$$2r = 2 \times (7.371 \times 10^6) = 1.4742 \times 10^7 \text{ m}$$
Now, substitute these into the energy formula:
$$E = -\frac{1.993 \times 10^{17} \text{ J m}}{1.4742 \times 10^7 \text{ m}}$$
$$E = -1.3519 \times 10^{10} \text{ J}$$
*Explanation: Substitute the known values into the total energy formula. Be careful with the negative sign and ensure all units are consistent. The result is in Joules.*

**Step 3: Calculate the specific orbital energy ($\epsilon$).**
We use the formula derived in Step 5 of the core idea: $\epsilon = -\frac{GM}{2r}$.
Alternatively, we can use $\epsilon = \frac{E}{m}$.
Using the first method:
$$\epsilon = -\frac{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}{2 \times (7.371 \times 10^6 \text{ m})}$$
$$\epsilon = -\frac{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}{1.4742 \times 10^7 \text{ m}}$$
$$\epsilon = -2.7038 \times 10^7 \text{ J/kg}$$
Using the second method (as a check):
$$\epsilon = \frac{-1.3519 \times 10^{10} \text{ J}}{500 \text{ kg}}$$
$$\epsilon = -2.7038 \times 10^7 \text{ J/kg}$$
*Explanation: Calculate specific orbital energy using either the direct formula or by dividing the total energy by the satellite mass. Both methods should yield the same result, serving as a good cross-check.*

**Final Answer:**
The total orbital energy is $\boxed{-1.352 \times 10^{10} \text{ J}}$.
The specific orbital energy is $\boxed{-2.704 \times 10^7 \text{ J/kg}}$.

**Reflection:** This example demonstrates the calculation of orbital energy, emphasizing the negative sign for bound orbits. It also shows the relationship between total energy and specific energy, which is often more useful in mission design as it's independent of the satellite's mass.

---

### Example 4: Energy Change for an Orbital Transfer

**Problem:** A $1500 \text{ kg}$ satellite is initially in a circular parking orbit at an altitude of $300 \text{ km}$. It needs to be moved to a higher circular orbit at an altitude of $700 \text{ km}$. How much additional energy must be supplied to the satellite for this transfer? (Assume the transfer itself is instantaneous for energy calculation purposes, and we are only interested in the energy difference between the two stable circular orbits).

**Given:**
*   Satellite mass ($m$) = $1500 \text{ kg}$
*   Initial altitude ($h_1$) = $300 \text{ km} = 300 \times 10^3 \text{ m}$
*   Final altitude ($h_2$) = $700 \text{ km} = 700 \times 10^3 \text{ m}$
*   Mass of Earth ($M_E$) = $5.972 \times 10^{24} \text{ kg}$
*   Radius of Earth ($R_E$) = $6.371 \times 10^6 \text{ m}$
*   Gravitational Constant ($G$) = $6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2$
*   Gravitational parameter of Earth ($\mu = GM_E$) = $3.986 \times 10^{14} \text{ m}^3/\text{s}^2$

**What we want:**
*   Change in total orbital energy ($\Delta E$)

**Solution:**

**Step 1: Calculate the initial orbital radius ($r_1$).**
$$r_1 = R_E + h_1$$
$$r_1 = 6.371 \times 10^6 \text{ m} + 300 \times 10^3 \text{ m}$$
$$r_1 = 6.371 \times 10^6 \text{ m} + 0.300 \times 10^6 \text{ m}$$
$$r_1 = 6.671 \times 10^6 \text{ m}$$
*Explanation: Calculate the radius for the initial orbit by adding Earth's radius to the initial altitude.*

**Step 2: Calculate the final orbital radius ($r_2$).**
$$r_2 = R_E + h_2$$
$$r_2 = 6.371 \times 10^6 \text{ m} + 700 \times 10^3 \text{ m}$$
$$r_2 = 6.371 \times 10^6 \text{ m} + 0.700 \times 10^6 \text{ m}$$
$$r_2 = 7.071 \times 10^6 \text{ m}$$
*Explanation: Calculate the radius for the final orbit by adding Earth's radius to the final altitude.*

**Step 3: Calculate the initial total orbital energy ($E_1$).**
We use the formula $E = -\frac{GMm}{2r}$.
$$E_1 = -\frac{(3.986 \times 10^{14} \text{ m}^3/\text{s}^2) \times (1500 \text{ kg})}{2 \times (6.671 \times 10^6 \text{ m})}$$
Numerator ($GMm$):
$$GMm = (3.986 \times 10^{14}) \times 1500 = 5.979 \times 10^{17} \text{ J m}$$
Denominator ($2r_1$):
$$2r_1 = 2 \times (6.671 \times 10^6) = 1.3342 \times 10^7 \text{ m}$$
$$E_1 = -\frac{5.979 \times 10^{17} \text{ J m}}{1.3342 \times 10^7 \text{ m}}$$
$$E_1 = -4.481 \times 10^{10} \text{ J}$$
*Explanation: Calculate the total energy of the satellite in its initial orbit. Remember the negative sign.*

**Step 4: Calculate the final total orbital energy ($E_2$).**
$$E_2 = -\frac{(3.986 \times 10^{14} \text{ m}^3/\text{s}^2) \times (1500 \text{ kg})}{2 \times (7.071 \times 10^6 \text{ m})}$$
Numerator ($GMm$) is the same: $5.979 \times 10^{17} \text{ J m}$.
Denominator ($2r_2$):
$$2r_2 = 2 \times (7.071 \times 10^6) = 1.4142 \times 10^7 \text{ m}$$
$$E_2 = -\frac{5.979 \times 10^{17} \text{ J m}}{1.4142 \times 10^7 \text{ m}}$$
$$E_2 = -4.228 \times 10^{10} \text{ J}$$
*Explanation: Calculate the total energy of the satellite in its final orbit. Note that a higher orbit has a less negative (i.e., higher) total energy.*

**Step 5: Calculate the change in total orbital energy ($\Delta E$).**
$$\Delta E = E_2 - E_1$$
$$\Delta E = (-4.228 \times 10^{10} \text{ J}) - (-4.481 \times 10^{10} \text{ J})$$
$$\Delta E = -4.228 \times 10^{10} \text{ J} + 4.481 \times 10^{10} \text{ J}$$
$$\Delta E = (4.481 - 4.228) \times 10^{10} \text{ J}$$
$$\Delta E = 0.253 \times 10^{10} \text{ J}$$
$$\Delta E = 2.53 \times 10^9 \text{ J}$$
*Explanation: The energy required for the transfer is the difference between the final and initial total energies. Since the final orbit is higher, its energy is less negative, resulting in a positive change in energy, meaning energy must be added.*

**Final Answer:**
The additional energy that must be supplied to the satellite is $\boxed{2.53 \times 10^9 \text{ J}}$.

**Reflection:** This example demonstrates a practical application of orbital energy calculations in mission planning. It highlights that moving to a higher orbit requires adding energy (positive $\Delta E$) and that higher orbits have less negative total energy. This is a simplified calculation, as actual transfers (like Hohmann transfers) involve more complex energy considerations related to propulsive burns.

---

## 6. Common mistakes and traps

1.  **Confusing Radius ($r$) with Altitude ($h$):** The orbital radius $r$ is always measured from the *center* of the central body. Students often forget to add the radius of the central body ($R_{body}$) to the given altitude ($h$), i.e., $r = R_{body} + h$. This is perhaps the most frequent error.
2.  **Sign Errors in Potential and Total Energy:** Gravitational potential energy ($U = -G\frac{Mm}{r}$) is negative, and total mechanical energy for bound orbits ($E = -\frac{GMm}{2r}$) is also negative. Forgetting these negative signs leads to incorrect energy values and physical interpretations.
3.  **Mixing Up Masses ($M$ and $m$):** $M$ is the mass of the *central body* (e.g., Earth), and $m$ is the mass of the *orbiting object* (e.g., satellite). While $m$ cancels out in the velocity and period formulas, it is crucial for energy calculations.
4.  **Inconsistent Units:** Physics equations require consistent units, typically SI units (meters, kilograms, seconds). Students often forget to convert kilometers to meters, grams to kilograms, or minutes/hours to seconds, leading to wildly incorrect numerical results.
5.  **Assuming Centripetal Force is a Separate Force:** Centripetal force is not a fundamental force like gravity or electromagnetism. It's the *net force* (or component of a force) that acts *inward* to cause an object to move in a circular path. In orbital mechanics, gravity *provides* the centripetal force.
6.  **Algebraic Errors:** Manipulating equations involving squares, square roots, and cube roots, especially when rearranging for a specific variable (like solving for $r$ from the period equation), is prone to algebraic mistakes. Double-check every step.

## 7. Textbook-precise explanation

A circular orbit is a specific trajectory where an orbiting body, of mass $m$, maintains a constant distance $r$ from the center of a much more massive central body, of mass $M$, while moving at a constant tangential speed $v$. This motion is governed by the gravitational interaction between the two bodies, where the gravitational force supplies the necessary centripetal force for circular motion.

The gravitational force $F_g$ exerted by the central body on the orbiting body is given by Newton's Law of Universal Gravitation:
$$F_g = G \frac{Mm}{r^2}$$
where $G$ is the universal gravitational constant.

For the orbiting body to maintain a circular path of radius $r$ at a constant speed $v$, a centripetal force $F_c$ is required:
$$F_c = m \frac{v^2}{r}$$
In a stable circular orbit, the gravitational force *is* the centripetal force:
$$F_g = F_c \implies G \frac{Mm}{r^2} = m \frac{v^2}{r}$$

From this force balance, the **orbital velocity** $v$ can be derived:
$$v = \sqrt{\frac{GM}{r}}$$
This velocity is independent of the orbiting body's mass $m$.

The **orbital period** $T$, which is the time taken for one complete revolution, is related to the orbital velocity and radius by $v = \frac{2\pi r}{T}$. Substituting the expression for $v$:
$$T = \frac{2\pi r}{v} = \frac{2\pi r}{\sqrt{\frac{GM}{r}}} = 2\pi \sqrt{\frac{r^3}{GM}}$$
This is a specific form of Kepler's Third Law for circular orbits.

The **total mechanical energy** $E$ of the orbiting body is the sum of its kinetic energy $K$ and its gravitational potential energy $U$.
The kinetic energy is $K = \frac{1}{2}mv^2$.
The gravitational potential energy is $U = -G\frac{Mm}{r}$, where the zero reference for potential energy is at infinite separation.
Thus, the total energy is:
$$E = K + U = \frac{1}{2}mv^2 - G\frac{Mm}{r}$$
Substituting $v^2 = \frac{GM}{r}$ (from the force balance):
$$E = \frac{1}{2}m\left(\frac{GM}{r}\right) - G\frac{Mm}{r} = \frac{GMm}{2r} - \frac{2GMm}{2r} = -\frac{GMm}{2r}$$
The negative sign indicates that the orbiting body is gravitationally bound to the central body. To escape, energy must be added to bring $E$ to zero or positive.

The **specific orbital energy** $\epsilon$, which is the total energy per unit mass of the orbiting body, is:
$$\epsilon = \frac{E}{m} = -\frac{GM}{2r}$$
This quantity is fundamental in astrodynamics for characterizing orbits independent of the spacecraft's mass.

These derivations are foundational in orbital mechanics and are extensively covered in texts such as "Curtis, Orbital Mechanics for Engineering Students, 4e, §2.3" and "Bate, Mueller, and White, Fundamentals of Astrodynamics, §2.2".

## 8. ASCII diagrams

```text
       ^ v (Velocity vector, tangential)
       |
     .---.
    /     \
   |   m   |  <-- Satellite (mass m)
    \     /
     '---'
       |
       | Fg (Gravitational force, inward)
       |
       |
       |
       |<---------------- r (Orbital Radius) ---------->
       |
       |
     .-----.
    /       \
   |    M    | <-- Central Body (mass M)
    \       /
     '-----'

Description:
A central body (M) is at the center. An orbiting satellite (m) is shown moving in a circular path around it.
An arrow labeled 'v' indicates the instantaneous velocity vector of the satellite, which is tangential to the circular path.
An arrow labeled 'Fg' indicates the gravitational force vector acting on the satellite, always pointing towards the center of the central body. This force provides the centripetal force.
The distance 'r' from the center of M to the center of m is the orbital radius.
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **GPC-VET:** *G*ravity *P*rovides *C*entripetal (for the force balance). *V*elocity, *E*nergy, *T*ime (Period) are the outputs. Visualize a satellite happily orbiting, held by an invisible rope of gravity (GPC), and then think "VET" to recall the three main things you can calculate.
    *   For the energy formula $E = -\frac{GMm}{2r}$, think of it as "Negative G-M-m over two-r." The "two-r" is unique and helps distinguish it from potential energy. The negative sign is critical: "Bound orbits are bad (negative) for your energy."

2.  **Formulas/Facts to Overlearn:**
    *   **Orbital Velocity:** $v = \sqrt{\frac{GM}{r}}$ (The most fundamental one, as it comes directly from the force balance)
    *   **Orbital Period:** $T = 2\pi \sqrt{\frac{r^3}{GM}}$ (Comes from $v = \frac{2\pi r}{T}$ and the velocity formula)
    *   **Total Orbital Energy:** $E = -\frac{GMm}{2r}$ (Crucial for understanding orbital transfers and stability)
    *   **Key Fact:** The mass of the orbiting object ($m$) does *not* affect its orbital velocity or period for a given radius.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review this lesson, work through the examples again without looking at the solutions.
    *   **Day 3:** Re-derive all three core formulas ($v, T, E$) from first principles.
    *   **Day 7:** Solve 2-3 new problems, focusing on unit conversions and avoiding common traps.
    *   **Day 16:** Explain the concepts and derivations to an imaginary peer, ensuring clarity and precision.
    *   **Day 35:** Attempt a challenging problem that combines multiple concepts or requires algebraic manipulation.

4.  **First-Principles Re-derivation Pathway:**
    *   **Start with the Force Balance:** The gravitational force provides the centripetal force.
        $$F_g = F_c$$
        $$G \frac{Mm}{r^2} = m \frac{v^2}{r}$$
    *   **Derive Velocity ($v$):** Cancel $m$, multiply by $r$, take the square root.
        $$v = \sqrt{\frac{GM}{r}}$$
    *   **Derive Period ($T$):** Use the definition of speed for circular motion ($v = \frac{2\pi r}{T}$), rearrange for $T$, and substitute the expression for $v$.
        $$T = \frac{2\pi r}{v} \implies T = 2\pi r \left(\frac{1}{\sqrt{\frac{GM}{r}}}\right) \implies T = 2\pi \sqrt{\frac{r^2 \cdot r}{GM}} \implies T = 2\pi \sqrt{\frac{r^3}{GM}}$$
    *   **Derive Total Energy ($E$):** Start with $E = K + U$, substitute $K = \frac{1}{2}mv^2$ and $U = -G\frac{Mm}{r}$. Then substitute $v^2 = \frac{GM}{r}$ (from the force balance).
        $$E = \frac{1}{2}m\left(\frac{GM}{r}\right) - G\frac{Mm}{r} \implies E = \frac{GMm}{2r} - \frac{2GMm}{2r} \implies E = -\frac{GMm}{2r}$$
    This pathway ensures that even if you forget a specific formula, you can always rebuild it from fundamental physical laws.

## 10. Connections — what this leads to

Understanding circular orbits is the gateway to almost all other concepts in orbital mechanics and astrodynamics. It is the simplest case, but its principles underpin more complex scenarios:

*   **Elliptical Orbits (Kepler's Laws):** Circular orbits are a special case of elliptical orbits (where eccentricity $e=0$). The concepts of orbital period and energy extend directly to elliptical orbits, with the semi-major axis replacing the radius $r$ in the energy formula ($E = -\frac{GMm}{2a}$). This leads into Kepler's Laws of Planetary Motion.
*   **Hohmann Transfer Orbits:** This is the most fuel-efficient way to move a spacecraft between two circular orbits. The calculation of the energy change required for such a transfer (as seen in Example 4) is directly built upon the total energy formula for circular orbits.
*   **Escape Velocity:** If a spacecraft is given enough energy to reach a total mechanical energy of zero (or positive), it will escape the gravitational pull of the central body. This concept is derived from the total orbital energy formula, where $E=0$ implies a specific velocity known as escape velocity.
*   **Orbital Maneuvers and Rendezvous:** Planning any change in orbit (e.g., changing altitude, inclination, or phasing) requires precise calculations of velocity and energy changes, all stemming from the fundamental equations of circular orbits. This is critical for docking with the ISS or rendezvous with other spacecraft.
*   **Interplanetary Trajectories:** While interplanetary travel involves highly elliptical or hyperbolic trajectories, the initial departure from Earth and arrival at another planet often involves establishing a circular parking orbit, and the $\Delta V$ calculations are rooted in the energy concepts learned here.
*   **Perturbations and Orbital Decay:** Real-world orbits are never perfectly circular. Atmospheric drag (especially in Low Earth Orbit), the gravitational pull of other celestial bodies, and the non-uniformity of Earth's gravity field cause perturbations. Understanding the ideal circular orbit is the baseline against which these perturbations are measured and analyzed.
*   **Space Debris Management:** Knowing the velocity and period of objects in circular orbits helps track space debris, predict conjunctions, and plan avoidance maneuvers to protect active satellites.

## 11. Self-check questions

1.  A newly launched satellite is placed into a circular orbit at an altitude of $500 \text{ km}$ above Earth's surface. What is its orbital velocity in $\text{km/s}$?
2.  If a planet has a mass four times that of Earth ($M_P = 4M_E$) and a radius twice that of Earth ($R_P = 2R_E$), how would the orbital velocity of a satellite in a circular orbit at an altitude equal to $R_P$ above this planet compare to the orbital velocity of a satellite in a circular orbit at an altitude equal to $R_E$ above Earth? Express your answer as a ratio.
3.  A spy satellite needs to complete 16 full orbits around Earth in a 24-hour period. Assuming a circular orbit, what is the required orbital radius $r$ (from Earth's center) in meters?
4.  Two satellites, Satellite A (mass $100 \text{ kg}$) and Satellite B (mass $1000 \text{ kg}$), are in the same circular orbit around Earth at an altitude of $800 \text{ km}$. Compare their orbital velocities, orbital periods, total orbital energies, and specific orbital energies. Explain any similarities or differences.
5.  An asteroid is detected in a circular orbit around the Sun with an orbital period of 5 Earth years. Calculate the radius of its orbit in Astronomical Units (AU), given that 1 AU is the average distance from Earth to the Sun (assume Earth's orbit is circular with a period of 1 year). Use Kepler's Third Law in its general form, $T^2 \propto r^3$, and the fact that for the Sun $GM_{Sun}$ is constant. (Hint: you don't need the value of $G$ or $M_{Sun}$ explicitly, but can use Earth's orbital parameters as a reference).