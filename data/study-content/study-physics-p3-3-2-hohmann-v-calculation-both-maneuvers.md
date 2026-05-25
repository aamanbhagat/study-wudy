## 1. What it is — in plain English

Imagine you have a toy car driving in a perfect circle around a giant central magnet on a smooth table. Now, you want to move that car to a bigger, higher circular track, also around the same magnet, but without using too much fuel. How would you do it?

You can't just push it sideways, because it would fly off. Instead, you give it a quick push *forward* (or backward) at one point. This push makes its path stretch out into an oval (an ellipse). This oval path is carefully designed so that it just barely touches your original circular track at one end, and it just barely touches your *new, target* circular track at the other end.

Once your car reaches the new track, you give it *another* quick push, again forward (or backward), to make its oval path flatten out into a perfect circle again, matching the new track. This two-push maneuver, using an oval path to connect two circular paths, is called a "Hohmann Transfer." It's the most fuel-efficient way to move between two circular orbits around the same central body.

## 2. Why it matters — real-world applications

The Hohmann transfer is a cornerstone of space travel because it's the most fuel-efficient way to change orbits between two coplanar circular paths. Fuel (or propellant) is extremely heavy and expensive to launch into space, so minimizing its use is critical for mission success and cost-effectiveness.

1.  **Satellite Deployment & Repositioning:** When a communication satellite like those operated by SpaceX's Starlink or Viasat is launched into a Low Earth Orbit (LEO), it often needs to reach a higher Geostationary Earth Orbit (GEO) or a Medium Earth Orbit (MEO). A Hohmann transfer is typically used to boost the satellite from its initial parking orbit to its final operational orbit. Similarly, if a satellite needs to be moved to a different orbital slot in GEO, a Hohmann transfer might be used.
2.  **International Space Station (ISS) Resupply:** While the ISS operates in LEO, resupply vehicles (like Northrop Grumman's Cygnus or SpaceX's Dragon) often launch into slightly different LEOs and then perform orbital maneuvers, sometimes using Hohmann-like transfers (though often more complex rendezvous maneuvers are involved for precision docking), to match the ISS's orbit. The *principles* of changing orbital energy are directly applicable.
3.  **Interplanetary Travel:** Sending probes to other planets, like NASA's Mars rovers or the Voyager spacecraft, relies heavily on Hohmann transfers. To travel from Earth to Mars, for example, a spacecraft is launched from Earth's orbit into a Hohmann transfer ellipse around the Sun. This ellipse is designed to intersect Mars's orbit. Once it reaches Mars's orbit, a second burn is performed to match Mars's orbital velocity around the Sun, allowing the probe to be captured by Mars's gravity.
4.  **Orbital Debris Mitigation:** If a defunct satellite needs to be moved to a "graveyard orbit" (a higher, less congested orbit) or deorbited (moved to a lower orbit for atmospheric reentry), a Hohmann-like transfer can be planned to achieve this with minimal propellant expenditure, extending the operational life of active satellites by reducing collision risk.

## 3. Prerequisites — what you must know first

Before diving into the Hohmann transfer, ensure you have a solid grasp of these fundamental concepts:

*   **Newton's Law of Universal Gravitation:** Understanding how gravitational force depends on mass and distance.
*   **Orbital Mechanics Basics:** Concepts like orbits, periapsis (closest point to central body), apoapsis (farthest point), semi-major axis, eccentricity.
*   **Conservation of Energy in Orbits:** The total mechanical energy (kinetic + potential) of an object in orbit is constant. This leads directly to the Vis-Viva equation.
*   **Conservation of Angular Momentum:** How angular momentum remains constant in an orbit, affecting velocity at different points.
*   **Kinetic and Potential Energy:** The definitions and formulas for these energy forms.
*   **Circular Orbit Velocity:** The specific formula for the speed required to maintain a circular orbit at a given radius.
*   **Vis-Viva Equation:** The general equation for orbital speed at any point in an elliptical orbit. This is absolutely critical.
*   **Gravitational Parameter ($\mu$):** Understanding that $\mu = GM$, where G is the gravitational constant and M is the mass of the central body. This simplifies orbital calculations.
*   **Vector Addition/Subtraction:** Understanding that $\Delta v$ is a change in velocity, which is a vector, but in the context of Hohmann transfers between coplanar circular orbits, it often simplifies to scalar subtraction because the burns are tangential.

## 4. The core idea — step by step

The core idea of a Hohmann transfer is to use two precise, instantaneous changes in velocity (called "impulsive burns") to move a spacecraft from one circular orbit to another, coplanar circular orbit, using an elliptical transfer orbit as the bridge.

### Step 1: Understand the Goal — Changing Orbital Energy

*   **Plain English:** To move to a higher orbit, you need more energy. To move to a lower orbit, you need less energy. A Hohmann transfer achieves this energy change in the most fuel-efficient way.
*   **Concrete Example:** Imagine a satellite in a 500 km altitude circular orbit around Earth. We want to move it to a 36,000 km altitude GEO circular orbit. This requires increasing its total orbital energy significantly.
*   **Formal/Mathematical Version:** The total specific orbital energy, $\mathcal{E}$, for an object in orbit is given by:
    $$ \mathcal{E} = \frac{v^2}{2} - \frac{\mu}{r} $$
    For a circular orbit, $v_c = \sqrt{\frac{\mu}{r}}$, so $\mathcal{E}_c = \frac{1}{2}\frac{\mu}{r} - \frac{\mu}{r} = -\frac{\mu}{2r}$.
    To move from $r_1$ to $r_2$ (where $r_2 > r_1$), we need to change $\mathcal{E}$ from $-\frac{\mu}{2r_1}$ to $-\frac{\mu}{2r_2}$. Since $-\frac{\mu}{2r_2} > -\frac{\mu}{2r_1}$ (it's less negative), energy must be added.
*   **What could go wrong:** Forgetting that specific orbital energy is negative and becomes *less negative* for higher energy (larger) orbits. This can lead to sign errors in intuition.

### Step 2: Define the Transfer Ellipse

*   **Plain English:** We need a temporary oval path that just kisses our starting circle at one end and just kisses our target circle at the other. This oval is called the "transfer ellipse."
*   **Concrete Example:** For our satellite from 500 km LEO to 36,000 km GEO, the transfer ellipse would have its periapsis (closest point) at the LEO radius and its apoapsis (farthest point) at the GEO radius.
*   **Formal/Mathematical Version:** For a Hohmann transfer between a circular orbit of radius $r_1$ and another circular orbit of radius $r_2$ (assuming $r_2 > r_1$):
    *   The periapsis radius of the transfer ellipse, $r_p$, is $r_1$.
    *   The apoapsis radius of the transfer ellipse, $r_a$, is $r_2$.
    *   The semi-major axis of this transfer ellipse, $a_{transfer}$, is the average of its periapsis and apoapsis radii:
        $$ a_{transfer} = \frac{r_p + r_a}{2} = \frac{r_1 + r_2}{2} $$
*   **What could go wrong:** Confusing $r_1$ and $r_2$ with altitudes. Remember, these are *radii* from the center of the central body. Always add the central body's radius to the altitude.

### Step 3: Calculate the First Maneuver ($\Delta v_1$)

*   **Plain English:** At the starting circular orbit, we give the spacecraft a precisely timed forward push. This push increases its speed just enough to jump it onto the transfer ellipse.
*   **Concrete Example:** Our satellite is orbiting Earth at $r_1$. Its current speed is $v_{c1}$. We need to accelerate it to a higher speed, $v_{p,transfer}$, which is the speed required to be at the periapsis of our transfer ellipse. The difference, $v_{p,transfer} - v_{c1}$, is our first $\Delta v$.
*   **Formal/Mathematical Version:**
    1.  First, calculate the velocity of the spacecraft in the initial circular orbit ($v_{c1}$):
        $$ v_{c1} = \sqrt{\frac{\mu}{r_1}} $$
    2.  Next, calculate the velocity required at the periapsis of the transfer ellipse ($v_{p,transfer}$). We use the Vis-Viva equation for this, with $r = r_p = r_1$ and $a = a_{transfer}$:
        $$ v_{p,transfer} = \sqrt{\mu \left( \frac{2}{r_1} - \frac{1}{a_{transfer}} \right)} $$
    3.  The first change in velocity ($\Delta v_1$) is the difference between the required transfer velocity and the initial circular velocity:
        $$ \Delta v_1 = v_{p,transfer} - v_{c1} $$
        This value will be positive, indicating a prograde (forward) burn.
*   **What could go wrong:** Using $r_2$ instead of $r_1$ for the periapsis velocity calculation, or forgetting to calculate $a_{transfer}$ correctly.

### Step 4: Calculate the Second Maneuver ($\Delta v_2$)

*   **Plain English:** After coasting along the transfer ellipse, the spacecraft reaches the target circular orbit. At this point, its speed is too slow for the target circular orbit. We need to give it another forward push to speed it up, making its path circular again.
*   **Concrete Example:** Our satellite has reached the apoapsis of the transfer ellipse, which is at radius $r_2$. Its speed there is $v_{a,transfer}$. The target circular orbit at $r_2$ requires a speed of $v_{c2}$. We need to accelerate it from $v_{a,transfer}$ to $v_{c2}$. The difference, $v_{c2} - v_{a,transfer}$, is our second $\Delta v$.
*   **Formal/Mathematical Version:**
    1.  First, calculate the velocity of the spacecraft in the target circular orbit ($v_{c2}$):
        $$ v_{c2} = \sqrt{\frac{\mu}{r_2}} $$
    2.  Next, calculate the velocity of the spacecraft at the apoapsis of the transfer ellipse ($v_{a,transfer}$). Again, use the Vis-Viva equation, with $r = r_a = r_2$ and $a = a_{transfer}$:
        $$ v_{a,transfer} = \sqrt{\mu \left( \frac{2}{r_2} - \frac{1}{a_{transfer}} \right)} $$
    3.  The second change in velocity ($\Delta v_2$) is the difference between the target circular velocity and the velocity at the apoapsis of the transfer ellipse:
        $$ \Delta v_2 = v_{c2} - v_{a,transfer} $$
        This value will also be positive, indicating another prograde burn.
*   **What could go wrong:** Forgetting that for a transfer to a *higher* orbit, $v_{a,transfer}$ will be *less* than $v_{c2}$. If you get a negative $\Delta v_2$ for a higher orbit transfer, you likely made a calculation error or swapped the velocities.

### Step 5: Calculate Total $\Delta v$

*   **Plain English:** The total fuel cost is the sum of the magnitudes of the two pushes.
*   **Concrete Example:** If $\Delta v_1$ was 2.4 km/s and $\Delta v_2$ was 1.4 km/s, the total $\Delta v$ is 3.8 km/s.
*   **Formal/Mathematical Version:** The total $\Delta v$ required for the Hohmann transfer is the sum of the absolute values of the two maneuvers:
    $$ \Delta v_{total} = |\Delta v_1| + |\Delta v_2| $$
*   **What could go wrong:** Accidentally subtracting the $\Delta v$ values if one came out negative (e.g., if calculating a transfer *down* to a lower orbit). Always sum the *magnitudes* of the required velocity changes.

## 5. Worked examples — multiple, with every step shown

We will use Earth as the central body for the first two examples.
Gravitational parameter for Earth: $\mu = 3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2$
Earth's mean radius: $R_E = 6,378 \text{ km} = 6.378 \times 10^6 \text{ m}$

### Example 1: LEO to GEO Transfer

**Problem:** A satellite is in a circular Low Earth Orbit (LEO) at an altitude of 500 km. Calculate the $\Delta v$ required for a Hohmann transfer to a Geostationary Earth Orbit (GEO) at an altitude of 35,786 km.

**Given:**
*   Altitude of initial circular orbit ($h_1$) = 500 km
*   Altitude of target circular orbit ($h_2$) = 35,786 km
*   Gravitational parameter ($\mu$) = $3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2$
*   Earth's radius ($R_E$) = $6.378 \times 10^6 \text{ m}$

**Want:**
*   $\Delta v_1$ (first burn)
*   $\Delta v_2$ (second burn)
*   $\Delta v_{total}$ (total $\Delta v$)

**Solution:**

1.  **Convert altitudes to orbital radii (from Earth's center):**
    $$ r_1 = R_E + h_1 $$
    $$ r_1 = 6.378 \times 10^6 \text{ m} + 500 \times 10^3 \text{ m} = 6.878 \times 10^6 \text{ m} $$
    *This step converts the given altitudes into radii from the center of the Earth, which is what orbital mechanics equations require.*
    $$ r_2 = R_E + h_2 $$
    $$ r_2 = 6.378 \times 10^6 \text{ m} + 35,786 \times 10^3 \text{ m} = 42.164 \times 10^6 \text{ m} $$
    *Same for the target orbit. Always use meters for consistency with $\mu$.*

2.  **Calculate the velocity in the initial circular orbit ($v_{c1}$):**
    $$ v_{c1} = \sqrt{\frac{\mu}{r_1}} $$
    $$ v_{c1} = \sqrt{\frac{3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2}{6.878 \times 10^6 \text{ m}}} $$
    $$ v_{c1} = \sqrt{5.79574 \times 10^7 \text{ m}^2/\text{s}^2} $$
    $$ v_{c1} = 7613.0 \text{ m/s} $$
    *This is the speed the satellite is currently traveling at in its initial LEO.*

3.  **Calculate the semi-major axis of the transfer ellipse ($a_{transfer}$):**
    $$ a_{transfer} = \frac{r_1 + r_2}{2} $$
    $$ a_{transfer} = \frac{6.878 \times 10^6 \text{ m} + 42.164 \times 10^6 \text{ m}}{2} $$
    $$ a_{transfer} = \frac{49.042 \times 10^6 \text{ m}}{2} $$
    $$ a_{transfer} = 24.521 \times 10^6 \text{ m} $$
    *This defines the size of the elliptical path that will connect the two circular orbits.*

4.  **Calculate the velocity at the periapsis of the transfer ellipse ($v_{p,transfer}$):**
    $$ v_{p,transfer} = \sqrt{\mu \left( \frac{2}{r_1} - \frac{1}{a_{transfer}} \right)} $$
    $$ v_{p,transfer} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{6.878 \times 10^6} - \frac{1}{24.521 \times 10^6} \right)} $$
    $$ v_{p,transfer} = \sqrt{3.986004418 \times 10^{14} \left( 2.90796 \times 10^{-7} - 4.07813 \times 10^{-8} \right)} $$
    $$ v_{p,transfer} = \sqrt{3.986004418 \times 10^{14} \left( 2.4999 \times 10^{-7} \right)} $$
    $$ v_{p,transfer} = \sqrt{9.964 \times 10^7 \text{ m}^2/\text{s}^2} $$
    $$ v_{p,transfer} = 9982.0 \text{ m/s} $$
    *This is the speed the satellite *needs* to have at the LEO radius to begin its journey on the transfer ellipse.*

5.  **Calculate the first $\Delta v$ burn ($\Delta v_1$):**
    $$ \Delta v_1 = v_{p,transfer} - v_{c1} $$
    $$ \Delta v_1 = 9982.0 \text{ m/s} - 7613.0 \text{ m/s} $$
    $$ \Delta v_1 = 2369.0 \text{ m/s} $$
    *This is the amount of velocity change (impulse) required at the initial LEO to inject the satellite into the transfer ellipse.*

6.  **Calculate the velocity at the apoapsis of the transfer ellipse ($v_{a,transfer}$):**
    $$ v_{a,transfer} = \sqrt{\mu \left( \frac{2}{r_2} - \frac{1}{a_{transfer}} \right)} $$
    $$ v_{a,transfer} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{42.164 \times 10^6} - \frac{1}{24.521 \times 10^6} \right)} $$
    $$ v_{a,transfer} = \sqrt{3.986004418 \times 10^{14} \left( 4.7431 \times 10^{-8} - 4.07813 \times 10^{-8} \right)} $$
    $$ v_{a,transfer} = \sqrt{3.986004418 \times 10^{14} \left( 6.6497 \times 10^{-9} \right)} $$
    $$ v_{a,transfer} = \sqrt{2.649 \times 10^6 \text{ m}^2/\text{s}^2} $$
    $$ v_{a,transfer} = 1627.6 \text{ m/s} $$
    *This is the speed the satellite will have when it reaches the GEO radius, still on the transfer ellipse.*

7.  **Calculate the velocity in the target circular orbit ($v_{c2}$):**
    $$ v_{c2} = \sqrt{\frac{\mu}{r_2}} $$
    $$ v_{c2} = \sqrt{\frac{3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2}{42.164 \times 10^6 \text{ m}}} $$
    $$ v_{c2} = \sqrt{9.4548 \times 10^6 \text{ m}^2/\text{s}^2} $$
    $$ v_{c2} = 3074.8 \text{ m/s} $$
    *This is the speed the satellite *needs* to have to maintain a circular orbit at GEO altitude.*

8.  **Calculate the second $\Delta v$ burn ($\Delta v_2$):**
    $$ \Delta v_2 = v_{c2} - v_{a,transfer} $$
    $$ \Delta v_2 = 3074.8 \text{ m/s} - 1627.6 \text{ m/s} $$
    $$ \Delta v_2 = 1447.2 \text{ m/s} $$
    *This is the amount of velocity change required at the GEO radius to circularize the orbit.*

9.  **Calculate the total $\Delta v$:**
    $$ \Delta v_{total} = |\Delta v_1| + |\Delta v_2| $$
    $$ \Delta v_{total} = 2369.0 \text{ m/s} + 1447.2 \text{ m/s} $$
    $$ \Delta v_{total} = 3816.2 \text{ m/s} $$

**Final Answer:**
*   **$\Delta v_1 = 2369.0 \text{ m/s}$**
*   **$\Delta v_2 = 1447.2 \text{ m/s}$**
*   **$\Delta v_{total} = 3816.2 \text{ m/s}$**

**Reflection:** This example demonstrates a classic LEO to GEO transfer, which is a very common mission profile. Notice that the first burn is significantly larger than the second. This is typical for transfers where the initial orbit is much smaller and faster than the target orbit.

### Example 2: From a Higher Circular Orbit Down to a Lower Circular Orbit

**Problem:** A defunct satellite in a circular orbit at an altitude of 1200 km needs to be moved to a lower circular "disposal" orbit at an altitude of 600 km. Calculate the $\Delta v$ required for this Hohmann transfer.

**Given:**
*   Altitude of initial circular orbit ($h_1$) = 1200 km
*   Altitude of target circular orbit ($h_2$) = 600 km
*   Gravitational parameter ($\mu$) = $3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2$
*   Earth's radius ($R_E$) = $6.378 \times 10^6 \text{ m}$

**Want:**
*   $\Delta v_1$ (first burn)
*   $\Delta v_2$ (second burn)
*   $\Delta v_{total}$ (total $\Delta v$)

**Solution:**

1.  **Convert altitudes to orbital radii:**
    $$ r_1 = R_E + h_1 = 6.378 \times 10^6 \text{ m} + 1200 \times 10^3 \text{ m} = 7.578 \times 10^6 \text{ m} $$
    *Initial orbit is now the higher one.*
    $$ r_2 = R_E + h_2 = 6.378 \times 10^6 \text{ m} + 600 \times 10^3 \text{ m} = 6.978 \times 10^6 \text{ m} $$
    *Target orbit is the lower one.*

2.  **Calculate the velocity in the initial circular orbit ($v_{c1}$):**
    $$ v_{c1} = \sqrt{\frac{\mu}{r_1}} = \sqrt{\frac{3.986004418 \times 10^{14}}{7.578 \times 10^6}} = \sqrt{5.2600 \times 10^7} = 7252.6 \text{ m/s} $$
    *This is the initial speed of the satellite in the higher circular orbit.*

3.  **Calculate the semi-major axis of the transfer ellipse ($a_{transfer}$):**
    *In a Hohmann transfer *down*, the initial orbit ($r_1$) becomes the apoapsis of the transfer ellipse, and the target orbit ($r_2$) becomes the periapsis.*
    $$ a_{transfer} = \frac{r_1 + r_2}{2} = \frac{7.578 \times 10^6 \text{ m} + 6.978 \times 10^6 \text{ m}}{2} = \frac{14.556 \times 10^6 \text{ m}}{2} = 7.278 \times 10^6 \text{ m} $$
    *The semi-major axis is still the average of the two radii, regardless of transfer direction.*

4.  **Calculate the velocity at the apoapsis of the transfer ellipse ($v_{a,transfer}$):**
    *For a transfer *down*, the first burn occurs at the apoapsis of the transfer ellipse (which is $r_1$).*
    $$ v_{a,transfer} = \sqrt{\mu \left( \frac{2}{r_1} - \frac{1}{a_{transfer}} \right)} $$
    $$ v_{a,transfer} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{7.578 \times 10^6} - \frac{1}{7.278 \times 10^6} \right)} $$
    $$ v_{a,transfer} = \sqrt{3.986004418 \times 10^{14} \left( 2.6393 \times 10^{-7} - 1.3739 \times 10^{-7} \right)} $$
    $$ v_{a,transfer} = \sqrt{3.986004418 \times 10^{14} \left( 1.2654 \times 10^{-7} \right)} $$
    $$ v_{a,transfer} = \sqrt{5.044 \times 10^7} = 7102.1 \text{ m/s} $$
    *This is the speed needed at $r_1$ to enter the transfer ellipse that will take it *down*.*

5.  **Calculate the first $\Delta v$ burn ($\Delta v_1$):**
    *To move to a lower orbit, we need to *decrease* the specific orbital energy. This means a retrograde burn (slowing down).*
    $$ \Delta v_1 = v_{a,transfer} - v_{c1} $$
    $$ \Delta v_1 = 7102.1 \text{ m/s} - 7252.6 \text{ m/s} $$
    $$ \Delta v_1 = -150.5 \text{ m/s} $$
    *The negative sign indicates a retrograde burn (slowing down). When calculating total $\Delta v$, we use its magnitude.*

6.  **Calculate the velocity at the periapsis of the transfer ellipse ($v_{p,transfer}$):**
    *The satellite reaches the target orbit $r_2$ at the periapsis of the transfer ellipse.*
    $$ v_{p,transfer} = \sqrt{\mu \left( \frac{2}{r_2} - \frac{1}{a_{transfer}} \right)} $$
    $$ v_{p,transfer} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{6.978 \times 10^6} - \frac{1}{7.278 \times 10^6} \right)} $$
    $$ v_{p,transfer} = \sqrt{3.986004418 \times 10^{14} \left( 2.8660 \times 10^{-7} - 1.3739 \times 10^{-7} \right)} $$
    $$ v_{p,transfer} = \sqrt{3.986004418 \times 10^{14} \left( 1.4921 \times 10^{-7} \right)} $$
    $$ v_{p,transfer} = \sqrt{5.947 \times 10^7} = 7711.9 \text{ m/s} $$
    *This is the speed the satellite will have when it reaches the lower orbit radius, still on the transfer ellipse.*

7.  **Calculate the velocity in the target circular orbit ($v_{c2}$):**
    $$ v_{c2} = \sqrt{\frac{\mu}{r_2}} = \sqrt{\frac{3.986004418 \times 10^{14}}{6.978 \times 10^6}} = \sqrt{5.7122 \times 10^7} = 7557.9 \text{ m/s} $$
    *This is the speed required to maintain a circular orbit at the lower altitude.*

8.  **Calculate the second $\Delta v$ burn ($\Delta v_2$):**
    *To circularize at the lower orbit, the satellite needs to slow down again, as its current speed ($v_{p,transfer}$) is *higher* than the required circular speed ($v_{c2}$). This is another retrograde burn.*
    $$ \Delta v_2 = v_{c2} - v_{p,transfer} $$
    $$ \Delta v_2 = 7557.9 \text{ m/s} - 7711.9 \text{ m/s} $$
    $$ \Delta v_2 = -154.0 \text{ m/s} $$
    *Another negative value, indicating a retrograde burn.*

9.  **Calculate the total $\Delta v$:**
    $$ \Delta v_{total} = |\Delta v_1| + |\Delta v_2| $$
    $$ \Delta v_{total} = |-150.5 \text{ m/s}| + |-154.0 \text{ m/s}| $$
    $$ \Delta v_{total} = 150.5 \text{ m/s} + 154.0 \text{ m/s} $$
    $$ \Delta v_{total} = 304.5 \text{ m/s} $$

**Final Answer:**
*   **$\Delta v_1 = -150.5 \text{ m/s}$ (retrograde)**
*   **$\Delta v_2 = -154.0 \text{ m/s}$ (retrograde)**
*   **$\Delta v_{total} = 304.5 \text{ m/s}$**

**Reflection:** This example highlights that for a Hohmann transfer *down* to a lower orbit, both burns are retrograde (negative $\Delta v$), meaning the spacecraft must slow down. This decreases its orbital energy. It's crucial to correctly identify which radius is the apoapsis and which is the periapsis of the transfer ellipse.

### Example 3: Interplanetary Hohmann Transfer (Earth to Mars)

**Problem:** Calculate the $\Delta v$ required for a Hohmann transfer from Earth's orbit to Mars's orbit. Assume both planetary orbits are circular and coplanar around the Sun.

**Given:**
*   Radius of Earth's orbit ($r_E$) = $1.496 \times 10^{11} \text{ m}$ (1 AU)
*   Radius of Mars's orbit ($r_M$) = $2.279 \times 10^{11} \text{ m}$ (1.524 AU)
*   Gravitational parameter of the Sun ($\mu_{Sun}$) = $1.327 \times 10^{20} \text{ m}^3/\text{s}^2$

**Want:**
*   $\Delta v_1$ (first burn at Earth's orbit)
*   $\Delta v_2$ (second burn at Mars's orbit)
*   $\Delta v_{total}$ (total $\Delta v$)

**Solution:**

1.  **Define initial and target radii:**
    $$ r_1 = r_E = 1.496 \times 10^{11} \text{ m} $$
    $$ r_2 = r_M = 2.279 \times 10^{11} \text{ m} $$
    *The central body is now the Sun, and the "orbits" are the planets' paths around it.*

2.  **Calculate Earth's orbital velocity ($v_{c1}$):**
    $$ v_{c1} = \sqrt{\frac{\mu_{Sun}}{r_1}} = \sqrt{\frac{1.327 \times 10^{20}}{1.496 \times 10^{11}}} = \sqrt{8.8703 \times 10^8} = 29783 \text{ m/s} $$
    *This is Earth's average speed around the Sun.*

3.  **Calculate the semi-major axis of the transfer ellipse ($a_{transfer}$):**
    $$ a_{transfer} = \frac{r_1 + r_2}{2} = \frac{1.496 \times 10^{11} + 2.279 \times 10^{11}}{2} = \frac{3.775 \times 10^{11}}{2} = 1.8875 \times 10^{11} \text{ m} $$
    *This is the semi-major axis of the elliptical path the spacecraft will take around the Sun.*

4.  **Calculate the velocity at the periapsis of the transfer ellipse ($v_{p,transfer}$):**
    *The first burn occurs at Earth's orbit, which is the periapsis of the transfer ellipse.*
    $$ v_{p,transfer} = \sqrt{\mu_{Sun} \left( \frac{2}{r_1} - \frac{1}{a_{transfer}} \right)} $$
    $$ v_{p,transfer} = \sqrt{1.327 \times 10^{20} \left( \frac{2}{1.496 \times 10^{11}} - \frac{1}{1.8875 \times 10^{11}} \right)} $$
    $$ v_{p,transfer} = \sqrt{1.327 \times 10^{20} \left( 1.3369 \times 10^{-11} - 5.2975 \times 10^{-12} \right)} $$
    $$ v_{p,transfer} = \sqrt{1.327 \times 10^{20} \left( 8.0715 \times 10^{-12} \right)} $$
    $$ v_{p,transfer} = \sqrt{1.0712 \times 10^9} = 32730 \text{ m/s} $$
    *This is the speed the spacecraft needs to have at Earth's distance from the Sun to enter the transfer ellipse.*

5.  **Calculate the first $\Delta v$ burn ($\Delta v_1$):**
    $$ \Delta v_1 = v_{p,transfer} - v_{c1} $$
    $$ \Delta v_1 = 32730 \text{ m/s} - 29783 \text{ m/s} $$
    $$ \Delta v_1 = 2947 \text{ m/s} $$
    *This is the velocity change imparted by the spacecraft's engine, relative to the Sun, to leave Earth's orbit and begin the journey to Mars.*

6.  **Calculate the velocity at the apoapsis of the transfer ellipse ($v_{a,transfer}$):**
    *The spacecraft reaches Mars's orbit at the apoapsis of the transfer ellipse.*
    $$ v_{a,transfer} = \sqrt{\mu_{Sun} \left( \frac{2}{r_2} - \frac{1}{a_{transfer}} \right)} $$
    $$ v_{a,transfer} = \sqrt{1.327 \times 10^{20} \left( \frac{2}{2.279 \times 10^{11}} - \frac{1}{1.8875 \times 10^{11}} \right)} $$
    $$ v_{a,transfer} = \sqrt{1.327 \times 10^{20} \left( 8.7757 \times 10^{-12} - 5.2975 \times 10^{-12} \right)} $$
    $$ v_{a,transfer} = \sqrt{1.327 \times 10^{20} \left( 3.4782 \times 10^{-12} \right)} $$
    $$ v_{a,transfer} = \sqrt{4.615 \times 10^8} = 21482 \text{ m/s} $$
    *This is the speed the spacecraft will have when it reaches Mars's distance from the Sun, still on the transfer ellipse.*

7.  **Calculate Mars's orbital velocity ($v_{c2}$):**
    $$ v_{c2} = \sqrt{\frac{\mu_{Sun}}{r_2}} = \sqrt{\frac{1.327 \times 10^{20}}{2.279 \times 10^{11}}} = \sqrt{5.8227 \times 10^8} = 24130 \text{ m/s} $$
    *This is Mars's average speed around the Sun.*

8.  **Calculate the second $\Delta v$ burn ($\Delta v_2$):**
    $$ \Delta v_2 = v_{c2} - v_{a,transfer} $$
    $$ \Delta v_2 = 24130 \text{ m/s} - 21482 \text{ m/s} $$
    $$ \Delta v_2 = 2648 \text{ m/s} $$
    *This is the velocity change required at Mars's orbit to match Mars's speed and circularize around the Sun (before considering Mars's own gravity well).*

9.  **Calculate the total $\Delta v$:**
    $$ \Delta v_{total} = |\Delta v_1| + |\Delta v_2| $$
    $$ \Delta v_{total} = 2947 \text{ m/s} + 2648 \text{ m/s} $$
    $$ \Delta v_{total} = 5595 \text{ m/s} $$

**Final Answer:**
*   **$\Delta v_1 = 2947 \text{ m/s}$**
*   **$\Delta v_2 = 2648 \text{ m/s}$**
*   **$\Delta v_{total} = 5595 \text{ m/s}$**

**Reflection:** This example demonstrates the application of Hohmann transfers for interplanetary travel. It's important to remember that these $\Delta v$ values are relative to the *Sun*. A real mission would also need to account for the $\Delta v$ required to escape Earth's gravity well (Trans-Mars Injection burn, which incorporates $\Delta v_1$ conceptually) and then to enter orbit around Mars (Mars Orbit Insertion burn, which is related to $\Delta v_2$ but also involves braking into Mars's gravity well).

### Example 4: Hohmann Transfer Between Two LEOs (Closer Radii)

**Problem:** A satellite is in a circular orbit at an altitude of 700 km. It needs to be moved to a circular orbit at an altitude of 900 km. Calculate the $\Delta v$ for this Hohmann transfer.

**Given:**
*   Altitude of initial circular orbit ($h_1$) = 700 km
*   Altitude of target circular orbit ($h_2$) = 900 km
*   Gravitational parameter ($\mu$) = $3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2$
*   Earth's radius ($R_E$) = $6.378 \times 10^6 \text{ m}$

**Want:**
*   $\Delta v_1$ (first burn)
*   $\Delta v_2$ (second burn)
*   $\Delta v_{total}$ (total $\Delta v$)

**Solution:**

1.  **Convert altitudes to orbital radii:**
    $$ r_1 = R_E + h_1 = 6.378 \times 10^6 \text{ m} + 700 \times 10^3 \text{ m} = 7.078 \times 10^6 \text{ m} $$
    $$ r_2 = R_E + h_2 = 6.378 \times 10^6 \text{ m} + 900 \times 10^3 \text{ m} = 7.278 \times 10^6 \text{ m} $$

2.  **Calculate the velocity in the initial circular orbit ($v_{c1}$):**
    $$ v_{c1} = \sqrt{\frac{\mu}{r_1}} = \sqrt{\frac{3.986004418 \times 10^{14}}{7.078 \times 10^6}} = \sqrt{5.6315 \times 10^7} = 7504.3 \text{ m/s} $$

3.  **Calculate the semi-major axis of the transfer ellipse ($a_{transfer}$):**
    $$ a_{transfer} = \frac{r_1 + r_2}{2} = \frac{7.078 \times 10^6 \text{ m} + 7.278 \times 10^6 \text{ m}}{2} = \frac{14.356 \times 10^6 \text{ m}}{2} = 7.178 \times 10^6 \text{ m} $$

4.  **Calculate the velocity at the periapsis of the transfer ellipse ($v_{p,transfer}$):**
    $$ v_{p,transfer} = \sqrt{\mu \left( \frac{2}{r_1} - \frac{1}{a_{transfer}} \right)} $$
    $$ v_{p,transfer} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{7.078 \times 10^6} - \frac{1}{7.178 \times 10^6} \right)} $$
    $$ v_{p,transfer} = \sqrt{3.986004418 \times 10^{14} \left( 2.8259 \times 10^{-7} - 1.3931 \times 10^{-7} \right)} $$
    $$ v_{p,transfer} = \sqrt{3.986004418 \times 10^{14} \left( 1.4328 \times 10^{-7} \right)} $$
    $$ v_{p,transfer} = \sqrt{5.709 \times 10^7} = 7555.8 \text{ m/s} $$

5.  **Calculate the first $\Delta v$ burn ($\Delta v_1$):**
    $$ \Delta v_1 = v_{p,transfer} - v_{c1} $$
    $$ \Delta v_1 = 7555.8 \text{ m/s} - 7504.3 \text{ m/s} $$
    $$ \Delta v_1 = 51.5 \text{ m/s} $$

6.  **Calculate the velocity at the apoapsis of the transfer ellipse ($v_{a,transfer}$):**
    $$ v_{a,transfer} = \sqrt{\mu \left( \frac{2}{r_2} - \frac{1}{a_{transfer}} \right)} $$
    $$ v_{a,transfer} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{7.278 \times 10^6} - \frac{1}{7.178 \times 10^6} \right)} $$
    $$ v_{a,transfer} = \sqrt{3.986004418 \times 10^{14} \left( 2.7479 \times 10^{-7} - 1.3931 \times 10^{-7} \right)} $$
    $$ v_{a,transfer} = \sqrt{3.986004418 \times 10^{14} \left( 1.3548 \times 10^{-7} \right)} $$
    $$ v_{a,transfer} = \sqrt{5.401 \times 10^7} = 7349.4 \text{ m/s} $$

7.  **Calculate the velocity in the target circular orbit ($v_{c2}$):**
    $$ v_{c2} = \sqrt{\frac{\mu}{r_2}} = \sqrt{\frac{3.986004418 \times 10^{14}}{7.278 \times 10^6}} = \sqrt{5.4767 \times 10^7} = 7400.5 \text{ m/s} $$

8.  **Calculate the second $\Delta v$ burn ($\Delta v_2$):**
    $$ \Delta v_2 = v_{c2} - v_{a,transfer} $$
    $$ \Delta v_2 = 7400.5 \text{ m/s} - 7349.4 \text{ m/s} $$
    $$ \Delta v_2 = 51.1 \text{ m/s} $$

9.  **Calculate the total $\Delta v$:**
    $$ \Delta v_{total} = |\Delta v_1| + |\Delta v_2| $$
    $$ \Delta v_{total} = 51.5 \text{ m/s} + 51.1 \text{ m/s} $$
    $$ \Delta v_{total} = 102.6 \text{ m/s} $$

**Final Answer:**
*   **$\Delta v_1 = 51.5 \text{ m/s}$**
*   **$\Delta v_2 = 51.1 \text{ m/s}$**
*   **$\Delta v_{total} = 102.6 \text{ m/s}$**

**Reflection:** This example shows a transfer between two relatively close orbits. The required $\Delta v$ values are much smaller compared to the LEO to GEO transfer. This demonstrates that Hohmann transfers are more efficient when the ratio of the two radii is closer to 1. As the target orbit gets much larger, the relative velocity at apoapsis drops significantly, requiring a larger second burn.

## 6. Common mistakes and traps

1.  **Using Altitude instead of Radius:** The most common mistake is forgetting to add the central body's radius (e.g., Earth's radius) to the given altitudes. All orbital mechanics formulas use radii from the center of mass.
2.  **Incorrect Units:** Mixing kilometers and meters, or using inconsistent units for $\mu$, radius, and velocity. Always convert everything to a consistent system (e.g., SI: meters, kilograms, seconds).
3.  **Swapping $r_1$ and $r_2$ in Vis-Viva:** When calculating $v_{p,transfer}$, ensure you use $r_1$ (the periapsis radius of the transfer ellipse). When calculating $v_{a,transfer}$, ensure you use $r_2$ (the apoapsis radius of the transfer ellipse).
4.  **Sign Errors for $\Delta v$:** Forgetting that $\Delta v$ is a change in velocity. For transfers to *higher* orbits, both burns are prograde (speed up, positive $\Delta v$). For transfers to *lower* orbits, both burns are retrograde (slow down, negative $\Delta v$). The *total* $\Delta v$ is always the sum of the *magnitudes* of the individual burns.
5.  **Confusing Circular Velocity with Elliptical Velocity:** Using $v_c = \sqrt{\mu/r}$ for points on the transfer ellipse. This formula is *only* for circular orbits. For elliptical orbits, the Vis-Viva equation ($v = \sqrt{\mu (2/r - 1/a)}$) must be used.
6.  **Incorrect Semi-major Axis for Transfer Ellipse:** Calculating $a_{transfer}$ incorrectly, or using the semi-major axis of one of the circular orbits instead of the transfer ellipse.
7.  **Skipping the Vis-Viva Equation:** Some students try to derive velocities using conservation of angular momentum or energy directly, which is more prone to error than simply applying the Vis-Viva equation once $a_{transfer}$ is known.

## 7. Textbook-precise explanation

A **Hohmann transfer orbit** is a specific elliptical orbit used to transfer a spacecraft between two coplanar circular orbits around a central body. It is characterized by being tangent to the initial circular orbit at its periapsis (or apoapsis) and tangent to the final circular orbit at its apoapsis (or periapsis). This two-impulse maneuver is the most fuel-efficient method for such a transfer.

Let $r_1$ be the radius of the initial circular orbit and $r_2$ be the radius of the target circular orbit, with $r_1 < r_2$. The central body has a gravitational parameter $\mu$.

1.  **Initial Circular Orbit Velocity:** The spacecraft's initial velocity in the circular orbit of radius $r_1$ is given by:
    $$ v_{c1} = \sqrt{\frac{\mu}{r_1}} $$

2.  **Transfer Ellipse Parameters:** The Hohmann transfer ellipse has its periapsis at $r_1$ and its apoapsis at $r_2$. Its semi-major axis, $a_{transfer}$, is:
    $$ a_{transfer} = \frac{r_1 + r_2}{2} $$

3.  **Velocity at Periapsis of Transfer Ellipse:** The velocity required at the periapsis of the transfer ellipse ($r_1$) to enter the transfer orbit is found using the Vis-Viva equation:
    $$ v_{p,transfer} = \sqrt{\mu \left( \frac{2}{r_1} - \frac{1}{a_{transfer}} \right)} $$

4.  **First Maneuver ($\Delta v_1$):** This burn occurs tangentially in the direction of motion (prograde) at $r_1$. The required change in velocity is:
    $$ \Delta v_1 = v_{p,transfer} - v_{c1} $$
    This value will be positive for a transfer to a higher orbit.

5.  **Velocity at Apoapsis of Transfer Ellipse:** The velocity of the spacecraft when it reaches the apoapsis of the transfer ellipse ($r_2$) is:
    $$ v_{a,transfer} = \sqrt{\mu \left( \frac{2}{r_2} - \frac{1}{a_{transfer}} \right)} $$

6.  **Target Circular Orbit Velocity:** The velocity required for a circular orbit at radius $r_2$ is:
    $$ v_{c2} = \sqrt{\frac{\mu}{r_2}} $$

7.  **Second Maneuver ($\Delta v_2$):** This burn occurs tangentially in the direction of motion (prograde) at $r_2$. The required change in velocity is:
    $$ \Delta v_2 = v_{c2} - v_{a,transfer} $$
    This value will also be positive for a transfer to a higher orbit.

8.  **Total $\Delta v$:** The total characteristic energy change (propellant expenditure) for the Hohmann transfer is the sum of the magnitudes of the two impulses:
    $$ \Delta v_{total} = |\Delta v_1| + |\Delta v_2| $$

For a Hohmann transfer from a higher orbit ($r_1$) to a lower orbit ($r_2$), the logic is similar but the roles of periapsis and apoapsis are swapped for the *initial burn point*. The first burn would be retrograde to decrease velocity and drop into the transfer ellipse, which would have its apoapsis at $r_1$ and periapsis at $r_2$. The second burn would also be retrograde to circularize at $r_2$. The $\Delta v$ values would be negative, but their magnitudes sum to the total $\Delta v$.

(Reference: *Fundamentals of Astrodynamics and Applications* by David A. Vallado, 4th Edition, Chapter 6, "Orbital Maneuvers")

## 8. ASCII diagrams

```text
       Central Body (M)
        +
       / \
      /   \
     /     \
    /       \
   /         \
  /           \
 |             |
|               |
|  r1 (Initial) |
|   ----------- |  <-- Initial Circular Orbit (v_c1)
|  /           \ |
| /             \|
|/               \
A-----------------B  <-- Hohmann Transfer Ellipse (v_p,transfer at A, v_a,transfer at B)
|\               /|
| \             / |
|  \           /  |
|   -----------   |  <-- Target Circular Orbit (v_c2)
|  r2 (Target)    |
|                 |
 \               /
  \             /
   \           /
    \         /
     \       /
      \     /
       \   /
        \ /
         +

Key:
A: Point of first burn (periapsis of transfer ellipse, radius r1)
B: Point of second burn (apoapsis of transfer ellipse, radius r2)

Description:
The diagram shows a central body (M) at the origin. Two concentric circles represent the initial (inner, radius r1) and target (outer, radius r2) circular orbits. An ellipse (the Hohmann transfer orbit) is drawn such that its periapsis (closest point to M) is tangent to the inner circle at point A, and its apoapsis (farthest point from M) is tangent to the outer circle at point B.
The first maneuver (delta-v1) occurs at point A, boosting the spacecraft from the inner circular orbit onto the transfer ellipse.
The second maneuver (delta-v2) occurs at point B, boosting the spacecraft from the transfer ellipse into the outer circular orbit.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    *   Think of a **H**ighway **O**val for **H**ohmann. You're trying to get from a small circular road to a large circular road using a single oval-shaped "on-ramp" and "off-ramp."
    *   **V**is-**V**iva **V**elocity: The three 'V's remind you that Vis-Viva is the key to calculating velocities *on the ellipse*. Circular orbits are simpler, just $\sqrt{\mu/r}$.

2.  **Formulas/Facts to Overlearn:**
    *   **Circular Orbit Velocity:** $v_c = \sqrt{\frac{\mu}{r}}$
    *   **Vis-Viva Equation:** $v = \sqrt{\mu \left( \frac{2}{r} - \frac{1}{a} \right)}$
    *   **Semi-major axis of Hohmann Transfer:** $a_{transfer} = \frac{r_1 + r_2}{2}$
    *   **$\Delta v$ is always $v_{final} - v_{initial}$ at the burn point.** (But sum magnitudes for total).

3.  **Spaced-Repetition Schedule:**
    *   **1 Day:** Re-derive the full set of equations and work through Example 1 again.
    *   **3 Days:** Work through Example 2 and 3. Focus on understanding the direction of burns.
    *   **7 Days:** Solve a new Hohmann problem from scratch without looking at notes. Articulate each step's purpose.
    *   **16 Days:** Explain the Hohmann transfer and its calculations to an imaginary peer. Identify potential pitfalls.
    *   **35 Days:** Revisit the derivation and work a challenging problem involving a transfer *down* to a lower orbit.

4.  **First-Principles Re-derivation Pathway:** If you forget the formulas, you can always rebuild them:
    *   **Start with Newton's Law of Gravitation:** $F = \frac{GMm}{r^2}$.
    *   **Derive Circular Orbit Velocity:** Equate gravitational force to centripetal force ($F = \frac{mv^2}{r}$). This gives you $v_c = \sqrt{\frac{GM}{r}} = \sqrt{\frac{\mu}{r}}$.
    *   **Derive Specific Orbital Energy:** Start with total mechanical energy $E = KE + PE = \frac{1}{2}mv^2 - \frac{GMm}{r}$. Divide by mass to get specific energy $\mathcal{E} = \frac{v^2}{2} - \frac{\mu}{r}$.
    *   **Relate Specific Energy to Semi-major Axis:** For any elliptical orbit, $\mathcal{E} = -\frac{\mu}{2a}$. Equate the two expressions for $\mathcal{E}$ to get the **Vis-Viva equation**: $\frac{v^2}{2} - \frac{\mu}{r} = -\frac{\mu}{2a} \implies v = \sqrt{\mu \left( \frac{2}{r} - \frac{1}{a} \right)}$.
    *   **Define Hohmann Ellipse:** Recognize that for a Hohmann transfer, the periapsis of the ellipse is $r_1$ and the apoapsis is $r_2$. The semi-major axis $a_{transfer}$ is simply $\frac{r_1+r_2}{2}$.
    *   **Calculate $\Delta v$:** At each burn point, calculate the initial velocity (circular orbit) and the required final velocity (transfer ellipse or target circular orbit) using the formulas derived above, then find the difference.

## 10. Connections — what this leads to

The Hohmann transfer is a foundational concept that unlocks understanding of many advanced topics in orbital mechanics:

*   **Optimal Trajectories:** While Hohmann is optimal for *coplanar circular* orbits, it serves as a baseline for understanding more complex optimal trajectories, such as bi-elliptic transfers (which can be more efficient for very large changes in radius) or low-thrust transfers.
*   **Interplanetary Trajectories:** As seen in Example 3, Hohmann transfers are the conceptual basis for planning missions to other planets, even though real-world missions involve gravitational assists, plane changes, and finite burn durations.
*   **Rendezvous and Docking:** Understanding how to precisely change orbits is critical for spacecraft rendezvous, where two vehicles must meet in space (e.g., docking with the ISS). While not a pure Hohmann, the principles of changing orbital energy and velocity are fundamental.
*   **Orbital Phasing:** Hohmann transfers can be used to change the timing of a spacecraft in orbit. For example, if a satellite needs to catch up to another, it might perform a small Hohmann transfer to a slightly lower (faster) or higher (slower) orbit, wait a certain number of orbits, and then transfer back to its original orbit, effectively changing its position relative to the other satellite.
*   **Propellant Budgets:** The $\Delta v$ calculated for Hohmann transfers directly informs the design of spacecraft propulsion systems and the amount of fuel they need to carry, which is a primary driver of mission cost and capability.
*   **Lambert's Problem:** The Hohmann transfer is a specific solution to Lambert's Problem, which asks to find an orbit connecting two points in space in a given time. Understanding Hohmann helps contextualize more general solutions.

## 11. Self-check questions

1.  A satellite is in a circular orbit at 600 km altitude. Calculate the circular velocity ($v_c$) for this orbit. (Use Earth's $\mu$ and $R_E$).
2.  A spacecraft needs to transfer from a circular orbit of 6800 km radius to a circular orbit of 10,000 km radius around Earth. What is the semi-major axis of the Hohmann transfer ellipse?
3.  For the transfer in Question 2, calculate the velocity required at the periapsis of the transfer ellipse ($v_{p,transfer}$) and the velocity at the apoapsis of the transfer ellipse ($v_{a,transfer}$).
4.  Using your answers from Questions 1-3, determine the $\Delta v_1$ and $\Delta v_2$ for the transfer from 6800 km to 10,000 km.
5.  Explain why a Hohmann transfer is considered the most fuel-efficient way to move between two coplanar circular orbits. What are its main limitations in practical applications?