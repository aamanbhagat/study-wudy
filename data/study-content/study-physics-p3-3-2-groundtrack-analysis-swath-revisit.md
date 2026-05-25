## 1. What it is — in plain English

Imagine a satellite orbiting high above Earth. If you could shine a laser pointer straight down from the satellite to the Earth's surface, and trace the path of that laser dot as the satellite flies, that path is called the **groundtrack**. It's essentially the "shadow" of the satellite on the ground. Because the Earth is spinning underneath the satellite, this groundtrack isn't just a simple circle; it usually looks like a wavy, repeating pattern across the globe.

Now, satellites don't just see a single point; they have cameras or sensors that look at a wider area. Think of it like shining a flashlight from the satellite. The area illuminated by the flashlight beam on the ground is the **swath**. It's the width of the strip of Earth that the satellite's sensors can observe at any given moment. A wider swath means the satellite covers more ground with each pass.

Finally, consider a specific spot on Earth, like your hometown. How long does it take for a satellite to fly over and "see" that spot again, or at least pass close enough for its sensors to capture it within its swath? That duration is called the **revisit time**. Some satellites might revisit a spot every few hours, while others might only do so every few days or even weeks, depending on their mission and orbital design.

## 2. Why it matters — real-world applications

Understanding groundtracks, swath, and revisit times is fundamental to designing and operating nearly any satellite mission. Here are some concrete applications:

1.  **Earth Observation & Climate Monitoring (e.g., NASA's Aqua/Terra, NOAA's JPSS series):** Satellites monitoring weather patterns, ocean temperatures, deforestation, or ice caps need specific revisit times to capture changes. For instance, weather satellites require very frequent revisits (sometimes hourly or even sub-hourly) to track rapidly evolving storms. Climate change monitoring might tolerate longer revisit times but requires consistent, wide-swath coverage over vast areas to build long-term datasets. Machine Learning algorithms then process these vast datasets to identify trends, predict events, and classify land use.

2.  **Telecommunications & Global Internet (e.g., Starlink, OneWeb, Iridium):** Satellite internet constellations aim to provide continuous global coverage. This requires careful design of many satellites in various orbital planes to ensure that any point on Earth always falls within the "swath" of at least one satellite, minimizing latency and maximizing bandwidth. Groundtrack analysis helps determine the optimal number of satellites, orbital altitudes, and inclinations to achieve this continuous coverage with minimal gaps.

3.  **Remote Sensing & Disaster Management (e.g., European Space Agency's Sentinel program, Planet Labs):** When a disaster strikes (e.g., earthquake, flood, wildfire), rapid assessment is crucial. Remote sensing satellites with short revisit times (often achieved through large constellations like Planet Labs' Dove satellites) can image affected areas frequently, providing critical data to first responders, mapping damage, and tracking recovery efforts. The swath width determines how quickly a large affected region can be fully mapped.

4.  **Navigation Systems (e.g., GPS, Galileo, GLONASS):** While not directly "imaging" the Earth, navigation satellites rely on precise groundtrack control to ensure their signals are always available to receivers on the ground. A constellation like GPS is designed so that at least four satellites are always visible from any point on Earth, which is a direct consequence of optimizing their groundtracks and "visibility swaths" (the area from which their signal can be received).

5.  **Intelligence, Surveillance, and Reconnaissance (ISR):** Military and intelligence satellites require precise control over their groundtracks to repeatedly observe specific targets or regions of interest with a desired frequency. Short revisit times are critical for tracking dynamic events or monitoring changes over time, while adjustable groundtracks (achieved through orbital maneuvers) allow for flexible tasking.

## 3. Prerequisites — what you must know first

Before diving deep into groundtrack analysis, swath, and revisit, ensure you have a solid grasp of these foundational concepts:

*   **Orbital Elements (Keplerian Elements):** Understanding semi-major axis ($a$), eccentricity ($e$), inclination ($i$), Right Ascension of the Ascending Node (RAAN, $\Omega$), argument of perigee ($\omega$), and true anomaly ($\nu$) is crucial for defining an orbit.
*   **Kepler's Laws of Planetary Motion:** Especially the relationship between orbital period and semi-major axis.
*   **Newton's Law of Universal Gravitation:** The fundamental force governing orbital motion.
*   **Coordinate Systems:**
    *   **Earth-Centered Inertial (ECI):** A non-rotating frame, useful for describing orbital motion.
    *   **Earth-Centered Earth-Fixed (ECEF):** A rotating frame fixed to the Earth, essential for groundtrack calculations.
    *   **Geographical Coordinates (Latitude, Longitude, Altitude):** How we pinpoint locations on Earth.
*   **Earth's Rotation:** The Earth spins at a known angular velocity ($\omega_E$), which is the primary reason groundtracks shift with each orbit.
*   **Basic Trigonometry & Spherical Geometry:** Necessary for calculating distances, angles, and projections on a spherical (or oblate) Earth.
*   **Satellite Visibility & Line-of-Sight:** The concept that a satellite can only "see" parts of the Earth that are above its local horizon.

## 4. The core idea — step by step

Let's break down the concepts of groundtrack, swath, and revisit time systematically.

### Step 1: Understanding the Groundtrack

*   **Plain English:** The groundtrack is the path traced on the Earth's surface directly beneath the satellite. It's like the shadow of the satellite if the sun were directly overhead.
*   **Concrete Example:** A satellite in a perfect geostationary orbit (circular, equatorial, 24-hour period) has a groundtrack that is a single, fixed point on the equator. A satellite in a perfect polar orbit (inclination $90^\circ$) will have a groundtrack that passes over both poles on every orbit, but shifts longitudinally due to Earth's rotation.
*   **Formal/Mathematical Version:**
    The position vector of a satellite in an ECI frame, $\mathbf{r}_{ECI}(t)$, can be transformed into an ECEF frame, $\mathbf{r}_{ECEF}(t)$, by accounting for the Earth's rotation.
    $$ \mathbf{R}_{ECEF}(t) = [C_{IE}(t)]^T \mathbf{r}_{ECI}(t) $$
    Where $[C_{IE}(t)]$ is the transformation matrix from ECEF to ECI. This matrix accounts for the Earth's sidereal rotation angle $\theta_G(t)$.
    The latitude ($\phi$) and longitude ($\lambda$) of the sub-satellite point (the point directly beneath the satellite) are then derived from $\mathbf{R}_{ECEF}(t) = [x_{ECEF}, y_{ECEF}, z_{ECEF}]^T$.
    $$ \phi = \arcsin\left(\frac{z_{ECEF}}{|\mathbf{R}_{ECEF}|}\right) $$
    $$ \lambda = \arctan2(y_{ECEF}, x_{ECEF}) - \theta_G(t) $$
    (Note: The $\arctan2$ function correctly handles quadrants. $\theta_G(t)$ is the Greenwich Sidereal Time at time $t$.)
    The groundtrack is the plot of $(\phi, \lambda)$ over time.
*   **What could go wrong:** Confusing the satellite's orbital plane (fixed in ECI space) with its groundtrack (moving on the rotating Earth). The groundtrack is *not* simply the projection of the orbital plane onto a static sphere.

### Step 2: Factors Influencing Groundtrack Shape

*   **Plain English:** The shape and behavior of the groundtrack depend on the satellite's specific orbit. How high it is, how tilted its orbit is, and how elliptical it is all play a role.
*   **Concrete Example:**
    *   A satellite in a low Earth orbit (LEO) completes many orbits per day, leading to a dense series of groundtracks.
    *   A satellite with an inclination of $0^\circ$ (equatorial orbit) will always stay above the equator.
    *   A satellite with an inclination of $90^\circ$ (polar orbit) will pass over the poles. The maximum latitude reached by a groundtrack is equal to the orbit's inclination ($|\phi_{max}| = i$).
    *   The orbital period ($T$) dictates how much the Earth rotates underneath the satellite between successive passes over the same latitude. A shorter period means less longitudinal shift per orbit.
    *   Nodal regression (the precession of the orbital plane due to Earth's oblateness) causes the entire groundtrack pattern to slowly shift over time, which can be beneficial for sun-synchronous orbits.
*   **Formal/Mathematical Version:**
    The key factors are:
    1.  **Orbital Period ($T_{orbit}$):** Determines how quickly the satellite completes one revolution.
        $$ T_{orbit} = 2\pi \sqrt{\frac{a^3}{\mu}} $$
        where $a$ is the semi-major axis and $\mu$ is the Earth's gravitational parameter.
    2.  **Earth's Angular Velocity ($\omega_E$):** The rate at which the Earth rotates.
        $$ \omega_E \approx 7.292115 \times 10^{-5} \text{ rad/s} $$
    3.  **Inclination ($i$):** Sets the maximum latitude the groundtrack will reach.
    4.  **Longitudinal Shift per Orbit ($\Delta \lambda_{shift}$):** The amount the groundtrack shifts westward (for prograde orbits) or eastward (for retrograde orbits) after one orbital period, due to Earth's rotation.
        $$ \Delta \lambda_{shift} = \omega_E T_{orbit} $$
        This is the change in longitude of the sub-satellite point from one ascending node crossing to the next, *relative to a fixed point on Earth*.
*   **What could go wrong:** Forgetting that the Earth is rotating, leading to incorrect assumptions about where the groundtrack will appear on subsequent orbits. Ignoring nodal regression for long-term groundtrack analysis.

### Step 3: Defining Swath (Field of View)

*   **Plain English:** The swath is the strip of Earth's surface that a satellite's sensor can "see" at a given moment. It's like the area illuminated by a flashlight beam from space.
*   **Concrete Example:** A satellite camera with a wide-angle lens will have a much wider swath than a telescope designed for high-resolution imaging of a small area. From a higher altitude, a sensor with the same angular field of view will cover a larger area on the ground.
*   **Formal/Mathematical Version:**
    The swath is determined by the satellite's altitude ($h$) and the sensor's half-angle field of view ($\phi$). The half-angle $\phi$ is the angle from the sensor's boresight (nadir direction) to the edge of its field of view.
    The geometry involves the satellite, the center of the Earth, and the edge of the visible area on the Earth's surface. Let $R_E$ be the Earth's radius.
    Consider a right triangle formed by the Earth's center, the satellite, and a point on the Earth's surface at the edge of the swath.
    The angle from the satellite's nadir (directly below) to the edge of the swath, as seen from the satellite, is $\phi$.
    The angle from the Earth's center to the edge of the swath, relative to the nadir point, is $\alpha$.
    Using the Law of Sines on the triangle formed by the Earth's center, the satellite, and the edge of the swath:
    $$ \frac{R_E}{\sin \phi} = \frac{R_E+h}{\sin(90^\circ + \alpha)} = \frac{R_E+h}{\cos \alpha} $$
    Thus, $\cos \alpha = \frac{R_E+h}{R_E} \sin \phi$. This is incorrect.
    Let's use the standard formula for the Earth-centered angle $\alpha$ subtended by the swath:
    $$ \alpha = \arcsin\left(\frac{R_E+h}{R_E} \sin \phi\right) - \phi $$
    This formula calculates the Earth-centered angle from the sub-satellite point to the edge of the swath. The total angular width of the swath is $2\alpha$.
    The linear swath width ($W$) on the Earth's surface is then:
    $$ W = 2 R_E \alpha $$
    where $\alpha$ must be in radians.
*   **What could go wrong:** Assuming a flat Earth, which simplifies the geometry but leads to significant errors for typical satellite altitudes and wide fields of view. Forgetting to convert angles to radians for calculations involving arc length.

### Step 4: Calculating Swath Width

*   **Plain English:** This step is about putting numbers into the formulas from Step 3 to find out exactly how wide the visible strip is.
*   **Concrete Example:** If a satellite is at 500 km altitude and its sensor has a half-angle of $10^\circ$, we can calculate the swath width. If we then raise the satellite to 800 km, the swath width will increase, even with the same sensor.
*   **Formal/Mathematical Version:** (This is the application of the formula from Step 3)
    Given:
    *   Satellite altitude $h$
    *   Earth's radius $R_E$ (approx. $6378 \text{ km}$)
    *   Sensor half-angle field of view $\phi$ (in radians)
    The Earth-centered half-angle $\alpha$ is:
    $$ \alpha = \arcsin\left(\frac{R_E+h}{R_E} \sin \phi\right) - \phi $$
    The total swath width $W$ is:
    $$ W = 2 R_E \alpha $$
    Note: Ensure $\phi$ is converted to radians before using it in the $\sin$ function. The $\arcsin$ function will return radians, which should then be used for $W$.
*   **What could go wrong:** Unit inconsistencies (degrees vs. radians, km vs. m). Incorrectly applying trigonometric functions or the Law of Sines/Cosines.

### Step 5: Defining Revisit Time

*   **Plain English:** Revisit time is the duration between two successive opportunities for a satellite (or a constellation of satellites) to observe a specific point on the Earth's surface. It's about how often a particular spot gets "seen."
*   **Concrete Example:** A farmer might want a satellite to revisit their fields every 3 days to monitor crop health. A military intelligence agency might want a revisit time of less than an hour over a specific target.
*   **Formal/Mathematical Version:**
    Revisit time ($T_{revisit}$) is a complex metric that depends on several factors, including the satellite's orbital parameters, the sensor's swath width, and the latitude of the target. For a single satellite, it's the time between when a target point $P$ first enters the sensor's swath and when it next enters the swath. For constellations, it's the time between when *any* satellite in the constellation can observe $P$.
    It is distinct from the **repeat cycle**, which is the time it takes for the entire groundtrack pattern to precisely repeat itself. A satellite might revisit a point many times within a repeat cycle.
*   **What could go wrong:** Confusing revisit time with the orbital period. A satellite with a 90-minute orbital period doesn't revisit a specific point every 90 minutes unless that point is at the pole or the orbit is special (e.g., geostationary).

### Step 6: Factors Affecting Revisit Time

*   **Plain English:** What makes a satellite see a spot more or less often? Higher altitude, wider sensor view, or more satellites in a group all help.
*   **Concrete Example:**
    *   A satellite in a very low orbit (e.g., 300 km) might have a fast orbital period, but its narrow swath means it misses a lot of the Earth.
    *   A satellite in a higher orbit (e.g., 800 km) has a longer period but a wider swath, potentially leading to similar or better revisit times for certain latitudes.
    *   A constellation of 50 satellites will almost always have a much shorter revisit time than a single satellite, as there's a higher chance one of them will be overhead.
    *   Polar regions generally have much shorter revisit times for highly inclined orbits because many groundtracks converge near the poles. Equatorial regions have longer revisit times for the same orbits.
*   **Formal/Mathematical Version:**
    The primary factors influencing $T_{revisit}$ are:
    1.  **Orbital Period ($T_{orbit}$):** Shorter periods mean more passes per day, but also smaller longitudinal shifts between passes.
    2.  **Inclination ($i$):** Influences coverage density at different latitudes. High inclination orbits provide excellent polar coverage but sparse equatorial coverage.
    3.  **Swath Width ($W$):** A wider swath covers more ground, increasing the probability of observing a target and thus reducing revisit time.
    4.  **Longitudinal Shift per Orbit ($\Delta \lambda_{shift}$):** Determines the spacing between adjacent groundtracks.
    5.  **Number of Satellites in Constellation ($N_{sat}$):** For constellations, $T_{revisit}$ is inversely proportional to $N_{sat}$ (roughly).
    6.  **Target Latitude:** Revisit times are generally shorter at higher latitudes for high-inclination orbits due to the convergence of groundtracks.
    For a single satellite, the instantaneous revisit time for a point at a given latitude can be approximated by considering the time it takes for the Earth to rotate such that the point moves from the edge of one swath to the edge of the next, accounting for the longitudinal shift of the groundtrack.
    An approximate average revisit time for a single satellite at the equator can be expressed as:
    $$ T_{revisit, eq} \approx \frac{2\pi R_E}{W \cdot (\text{number of orbits per day})} - T_{orbit} $$
    This is often overly simplistic. A more robust approach involves simulating the groundtrack and swath over time or using more complex analytical models that account for overlaps and gaps. A common approximation for the *maximum* revisit time for a single satellite over a specified latitude band, assuming sufficient swath overlap, is related to the time it takes for the Earth to rotate by the longitudinal gap between successive swaths.
    $$ T_{revisit} \approx \frac{\Delta \lambda_{gap}}{\omega_E} $$
    where $\Delta \lambda_{gap}$ is the angular gap between the edge of one swath and the start of the next effective swath.
*   **What could go wrong:** Overlooking the interplay between orbital mechanics (period, inclination, nodal regression) and sensor characteristics (swath width). Assuming revisit time is uniform across all latitudes.

---

## 5. Worked examples — multiple, with every step shown

### Example 1 (Easy): Groundtrack for an Equatorial Orbit

**Problem:** A satellite is in a perfect circular orbit with an inclination of $0^\circ$ (equatorial orbit) at an altitude of 400 km. Describe its groundtrack.

**Given:**
*   Altitude, $h = 400 \text{ km}$
*   Inclination, $i = 0^\circ$
*   Orbit is circular and perfect (no perturbations)

**What we want:** A description of the groundtrack.

**Solution:**

1.  **Understand Inclination:** The inclination of an orbit defines the maximum latitude (north or south) that the groundtrack will reach.
    *   *Why this step works:* By definition, the inclination angle is the angle between the orbital plane and the Earth's equatorial plane. The groundtrack cannot go beyond these latitudes.
2.  **Apply Inclination to Groundtrack:** Since the inclination $i = 0^\circ$, the orbital plane lies precisely in the Earth's equatorial plane.
    *   *Why this step works:* This means the satellite is always directly above the equator.
3.  **Consider Earth's Rotation:** The Earth rotates underneath the satellite. However, because the satellite is always above the equator, its path relative to the Earth's surface is constrained to the equator.
    *   *Why this step works:* Even though the Earth spins, the "shadow" of the satellite always falls on the equator.
4.  **Conclusion:** The groundtrack will be a single, continuous line directly along the equator. If the orbital period is less than the Earth's rotation period (which it will be for a 400 km LEO), the satellite will repeatedly trace over the same equatorial line, moving from west to east (for a prograde orbit) or east to west (for a retrograde orbit) relative to the stars, but always staying on the equator relative to the Earth's surface.

**Final Answer:**
The groundtrack is **a single line along the Earth's equator.**

*Reflection:* This example highlights the fundamental role of inclination in defining the latitudinal extent of a groundtrack. For equatorial orbits, the Earth's rotation does not cause the groundtrack to shift in latitude, only in longitude relative to a fixed point on Earth (though the groundtrack itself is fixed to the equator).

### Example 2 (Medium): Swath Width Calculation

**Problem:** A satellite is in a circular orbit at an altitude of 700 km. Its sensor has a half-angle field of view ($\phi$) of $30^\circ$. Calculate the instantaneous swath width on the Earth's surface.

**Given:**
*   Altitude, $h = 700 \text{ km}$
*   Sensor half-angle, $\phi = 30^\circ$
*   Earth's mean radius, $R_E = 6378 \text{ km}$ (standard value)

**What we want:** Instantaneous swath width, $W$.

**Solution:**

1.  **Convert Sensor Half-Angle to Radians:** The formula for swath width requires angles in radians.
    $$ \phi_{rad} = \phi_{deg} \times \frac{\pi}{180^\circ} $$
    $$ \phi_{rad} = 30^\circ \times \frac{\pi}{180^\circ} = \frac{\pi}{6} \text{ rad} $$
    $$ \phi_{rad} \approx 0.52359877 \text{ rad} $$
    *   *Why this step works:* Trigonometric functions in mathematical formulas (especially those involving arc lengths or angles in non-degree contexts) typically assume radian measure for inputs and outputs.
2.  **Calculate Earth-Centered Half-Angle ($\alpha$):** Use the formula derived in Step 3 of the core idea.
    $$ \alpha = \arcsin\left(\frac{R_E+h}{R_E} \sin \phi_{rad}\right) - \phi_{rad} $$
    $$ \alpha = \arcsin\left(\frac{6378 \text{ km} + 700 \text{ km}}{6378 \text{ km}} \sin\left(\frac{\pi}{6}\right)\right) - \frac{\pi}{6} $$
    $$ \alpha = \arcsin\left(\frac{7078}{6378} \times 0.5\right) - 0.52359877 $$
    $$ \alpha = \arcsin\left(1.10975 \times 0.5\right) - 0.52359877 $$
    $$ \alpha = \arcsin(0.554875) - 0.52359877 $$
    $$ \alpha \approx 0.586618 \text{ rad} - 0.52359877 \text{ rad} $$
    $$ \alpha \approx 0.063019 \text{ rad} $$
    *   *Why this step works:* This formula accounts for the Earth's curvature and the geometry between the satellite, the Earth's center, and the edge of the sensor's field of view on the surface.
3.  **Calculate Swath Width ($W$):** Use the Earth-centered half-angle to find the arc length on the Earth's surface.
    $$ W = 2 R_E \alpha $$
    $$ W = 2 \times 6378 \text{ km} \times 0.063019 \text{ rad} $$
    $$ W \approx 12756 \text{ km} \times 0.063019 $$
    $$ W \approx 803.8 \text{ km} $$
    *   *Why this step works:* The length of an arc on a circle is the radius multiplied by the subtended angle in radians. We multiply by 2 because $\alpha$ is the *half*-angle.

**Final Answer:**
The instantaneous swath width is approximately **803.8 km**.

*Reflection:* This example demonstrates how Earth's curvature significantly impacts swath calculations. If we had assumed a flat Earth, the calculation would be a simple $W = 2h \tan \phi$, which would yield $2 \times 700 \text{ km} \times \tan(30^\circ) \approx 808.3 \text{ km}$, a difference of about 4.5 km. While seemingly small here, this difference grows with wider fields of view and higher altitudes.

### Example 3 (Medium): Longitudinal Shift of Groundtrack

**Problem:** A satellite is in a circular polar orbit ($i=90^\circ$) at an altitude of 500 km. Calculate the longitudinal shift between consecutive ascending nodes.

**Given:**
*   Altitude, $h = 500 \text{ km}$
*   Inclination, $i = 90^\circ$
*   Earth's mean radius, $R_E = 6378 \text{ km}$
*   Gravitational parameter of Earth, $\mu = 3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2$
*   Earth's angular velocity, $\omega_E = 7.292115 \times 10^{-5} \text{ rad/s}$

**What we want:** Longitudinal shift per orbit, $\Delta \lambda_{shift}$.

**Solution:**

1.  **Calculate the Semi-major Axis ($a$):** For a circular orbit, the semi-major axis is the Earth's radius plus the altitude.
    $$ a = R_E + h $$
    $$ a = 6378 \text{ km} + 500 \text{ km} = 6878 \text{ km} $$
    Convert to meters for consistency with $\mu$:
    $$ a = 6878 \times 10^3 \text{ m} $$
    *   *Why this step works:* The semi-major axis is a fundamental orbital element that determines the size of the orbit.
2.  **Calculate the Orbital Period ($T_{orbit}$):** Use Kepler's Third Law.
    $$ T_{orbit} = 2\pi \sqrt{\frac{a^3}{\mu}} $$
    $$ T_{orbit} = 2\pi \sqrt{\frac{(6878 \times 10^3 \text{ m})^3}{3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2}} $$
    $$ T_{orbit} = 2\pi \sqrt{\frac{3.2505 \times 10^{20}}{3.986004418 \times 10^{14}}} \text{ s} $$
    $$ T_{orbit} = 2\pi \sqrt{815470.8} \text{ s} $$
    $$ T_{orbit} = 2\pi \times 903.034 \text{ s} $$
    $$ T_{orbit} \approx 5674.3 \text{ s} $$
    Convert to minutes for intuition: $5674.3 \text{ s} / 60 \text{ s/min} \approx 94.57 \text{ minutes}$.
    *   *Why this step works:* The orbital period dictates how long it takes for the satellite to complete one revolution, which is crucial for determining how much the Earth rotates underneath it.
3.  **Calculate the Longitudinal Shift per Orbit ($\Delta \lambda_{shift}$):** This is the product of the Earth's angular velocity and the satellite's orbital period.
    $$ \Delta \lambda_{shift} = \omega_E T_{orbit} $$
    $$ \Delta \lambda_{shift} = 7.292115 \times 10^{-5} \text{ rad/s} \times 5674.3 \text{ s} $$
    $$ \Delta \lambda_{shift} \approx 0.4130 \text{ rad} $$
    Convert to degrees for easier understanding:
    $$ \Delta \lambda_{shift, deg} = 0.4130 \text{ rad} \times \frac{180^\circ}{\pi \text{ rad}} $$
    $$ \Delta \lambda_{shift, deg} \approx 23.66^\circ $$
    *   *Why this step works:* During one orbital period, the Earth rotates by this amount. Since the satellite's orbit is fixed in inertial space (ignoring nodal regression for this calculation), its groundtrack will appear to shift westward by this amount on the rotating Earth.

**Final Answer:**
The longitudinal shift between consecutive ascending nodes is approximately **$0.4130$ radians or $23.66^\circ$ westward.**

*Reflection:* This example shows that even for a relatively low Earth orbit, the Earth's rotation causes a significant shift in the groundtrack. This shift is what creates the "wavy" pattern of groundtracks over time, as each successive pass is over a different longitude.

### Example 4 (Hard): Revisit Time Estimation for a Single Satellite at the Equator

**Problem:** A satellite is in a sun-synchronous orbit at an altitude of 800 km. Its orbital period is 101 minutes. The sensor has a half-angle field of view ($\phi$) of $20^\circ$. Estimate the average revisit time for a point at the equator.

**Given:**
*   Altitude, $h = 800 \text{ km}$
*   Orbital period, $T_{orbit} = 101 \text{ min}$
*   Sensor half-angle, $\phi = 20^\circ$
*   Earth's mean radius, $R_E = 6378 \text{ km}$
*   Earth's angular velocity, $\omega_E = 7.292115 \times 10^{-5} \text{ rad/s}$

**What we want:** Average revisit time at the equator, $T_{revisit, eq}$.

**Solution:**

1.  **Convert Orbital Period to Seconds:**
    $$ T_{orbit} = 101 \text{ min} \times 60 \text{ s/min} = 6060 \text{ s} $$
    *   *Why this step works:* Ensures consistency with Earth's angular velocity units (rad/s).
2.  **Convert Sensor Half-Angle to Radians:**
    $$ \phi_{rad} = 20^\circ \times \frac{\pi}{180^\circ} = \frac{\pi}{9} \text{ rad} \approx 0.34906585 \text{ rad} $$
    *   *Why this step works:* Required for the swath width formula.
3.  **Calculate Swath Width ($W$):** First, calculate the Earth-centered half-angle ($\alpha$).
    $$ \alpha = \arcsin\left(\frac{R_E+h}{R_E} \sin \phi_{rad}\right) - \phi_{rad} $$
    $$ \alpha = \arcsin\left(\frac{6378 \text{ km} + 800 \text{ km}}{6378 \text{ km}} \sin\left(\frac{\pi}{9}\right)\right) - \frac{\pi}{9} $$
    $$ \alpha = \arcsin\left(\frac{7178}{6378} \times 0.34202\right) - 0.34906585 $$
    $$ \alpha = \arcsin\left(1.12543 \times 0.34202\right) - 0.34906585 $$
    $$ \alpha = \arcsin(0.38500) - 0.34906585 $$
    $$ \alpha \approx 0.39509 \text{ rad} - 0.34906585 \text{ rad} $$
    $$ \alpha \approx 0.04602 \text{ rad} $$
    Now, calculate the linear swath width:
    $$ W = 2 R_E \alpha $$
    $$ W = 2 \times 6378 \text{ km} \times 0.04602 \text{ rad} $$
    $$ W \approx 586.9 \text{ km} $$
    *   *Why this step works:* This gives us the physical width of the strip the satellite can observe on the ground.
4.  **Calculate the Angular Swath Width at the Equator ($\Delta \phi_{swath}$):** This is the swath width expressed as an angle from the Earth's center.
    $$ \Delta \phi_{swath} = \frac{W}{R_E} $$
    $$ \Delta \phi_{swath} = \frac{586.9 \text{ km}}{6378 \text{ km}} \approx 0.09202 \text{ rad} $$
    *   *Why this step works:* Allows us to compare the swath's longitudinal extent directly with the longitudinal shift of the groundtrack.
5.  **Calculate the Longitudinal Shift per Orbit ($\Delta \lambda_{shift}$):** This is the amount the groundtrack shifts westward (for prograde orbits) after one orbital period.
    $$ \Delta \lambda_{shift} = \omega_E T_{orbit} $$
    $$ \Delta \lambda_{shift} = 7.292115 \times 10^{-5} \text{ rad/s} \times 6060 \text{ s} $$
    $$ \Delta \lambda_{shift} \approx 0.44199 \text{ rad} $$
    *   *Why this step works:* This tells us how far apart the centerlines of successive groundtracks are at the equator.
6.  **Estimate Revisit Time at the Equator:** The average revisit time for a point at the equator can be estimated by considering the "gap" between the effective coverage provided by successive groundtracks. The Earth needs to rotate by this gap for the point to be covered again.
    $$ \Delta \lambda_{gap} = \Delta \lambda_{shift} - \Delta \phi_{swath} $$
    $$ \Delta \lambda_{gap} = 0.44199 \text{ rad} - 0.09202 \text{ rad} $$
    $$ \Delta \lambda_{gap} \approx 0.34997 \text{ rad} $$
    Now, calculate the time it takes for the Earth to rotate by this gap:
    $$ T_{revisit, eq} = \frac{\Delta \lambda_{gap}}{\omega_E} $$
    $$ T_{revisit, eq} = \frac{0.34997 \text{ rad}}{7.292115 \times 10^{-5} \text{ rad/s}} $$
    $$ T_{revisit, eq} \approx 4799.3 \text{ s} $$
    Convert to hours for intuition: $4799.3 \text{ s} / 3600 \text{ s/hr} \approx 1.33 \text{ hours}$.

**Final Answer:**
The estimated average revisit time for a point at the equator is approximately **4799 seconds (or about 1 hour and 20 minutes).**

*Reflection:* This example demonstrates how to combine orbital mechanics (period, longitudinal shift) with sensor characteristics (swath width) to estimate revisit performance. It highlights that even with a sun-synchronous orbit (which ensures consistent lighting conditions, not necessarily rapid revisit), there are still significant gaps between passes at the equator for a single satellite. Achieving very short revisit times for all latitudes typically requires a constellation of satellites. It also assumes the target point is always within the maximum extent of the swath (nadir viewing), and ignores the varying swath width with scan angle or other complexities.

---

## 6. Common mistakes and traps

1.  **Ignoring Earth's Rotation for Groundtrack:** A frequent mistake is to assume the groundtrack is simply a fixed path on the Earth, like a line drawn on a non-spinning globe. This leads to incorrect predictions of where the satellite will be relative to ground targets on subsequent orbits.
2.  **Confusing Groundtrack with Orbital Plane:** The orbital plane is an imaginary surface in space, fixed (or slowly precessing) relative to the stars. The groundtrack is the projection of the satellite's position onto the *rotating* Earth's surface. They are fundamentally different concepts.
3.  **Assuming Flat Earth for Swath Calculations:** Forgetting to account for the Earth's curvature, especially for wide fields of view or higher altitudes, leads to significant overestimation of the swath width. The "flat Earth" approximation ($W = 2h \tan \phi$) is only valid for very low altitudes and narrow fields of view.
4.  **Mixing Units (Degrees vs. Radians):** Many formulas in orbital mechanics and geometry require angles in radians. Incorrectly using degrees (or vice-versa) in trigonometric functions or arc length calculations is a common source of error.
5.  **Confusing Revisit Time with Orbital Period or Repeat Cycle:** The orbital period is the time for one revolution. The repeat cycle is the time for the entire groundtrack pattern to repeat. Revisit time is the time until a *specific point* is observed again, which can be much shorter than the repeat cycle due to swath width and multiple passes over the same general area.
6.  **Ignoring Latitude Dependence of Revisit Time:** For most non-equatorial orbits, revisit time varies significantly with latitude. Polar regions often have much shorter revisit times (especially for high-inclination orbits) than equatorial regions because groundtracks converge at the poles.

## 7. Textbook-precise explanation

The **groundtrack** of an orbiting satellite is formally defined as the locus of the sub-satellite point on the surface of an idealized oblate Earth, where the sub-satellite point is the intersection of the line connecting the Earth's geocenter to the satellite's position vector with the Earth's reference ellipsoid. This projection accounts for the Earth's sidereal rotation velocity, $\omega_E$, which causes a longitudinal shift of the groundtrack with each orbital revolution. The groundtrack's characteristics, such as its maximum latitudinal extent, are directly determined by the orbit's inclination ($i$), while its longitudinal spacing is primarily governed by the orbital period ($T_{orbit}$) and $\omega_E$, alongside perturbations like J2 effects causing nodal regression ($\dot{\Omega}$).

The **swath** refers to the instantaneous area on the Earth's surface that falls within the field of view (FOV) of a satellite-borne sensor. It is geometrically defined by the sensor's half-angle FOV ($\phi$), the satellite's altitude ($h$), and the Earth's radius ($R_E$). Considering the spherical geometry of the Earth, the Earth-centered half-angle ($\alpha$) subtended by the swath from the nadir point is given by:
$$ \alpha = \arcsin\left(\frac{R_E+h}{R_E} \sin \phi\right) - \phi $$
The linear swath width ($W$) on the Earth's surface is then $W = 2 R_E \alpha$, where $\alpha$ is in radians. This calculation assumes a nadir-pointing sensor and a spherical Earth model; for precise applications, the Earth's oblateness and sensor pointing angles (e.g., off-nadir) must be considered.

The **revisit time** ($T_{revisit}$) for a specific target point on the Earth's surface is the temporal interval between successive opportunities for that point to be within the sensor's effective swath. It is a critical performance metric for Earth observation missions, distinct from the orbital period or the groundtrack repeat cycle. For a single satellite, $T_{revisit}$ is a complex function of $T_{orbit}$, $i$, $h$, $W$, and the target's latitude. It is generally shorter at higher latitudes for high-inclination orbits due to the convergence of groundtracks and longer at the equator. For satellite constellations, $T_{revisit}$ is further influenced by the number of satellites, their orbital phasing, and the distribution across multiple orbital planes, aiming to achieve continuous or near-continuous coverage. Analytical approximations often involve calculating the longitudinal gap between adjacent swaths and the time required for the Earth's rotation to cover this gap.

*References:*
*   Vallado, D. A. (2013). *Fundamentals of Astrodynamics and Applications* (4th ed.). Microcosm Press. (Chapter 9: "Ground Tracks" and "Coverage")
*   Bate, R. R., Mueller, D. D., & White, J. E. (1971). *Fundamentals of Astrodynamics*. Dover Publications. (Chapter 6: "Ground Tracks")

## 8. ASCII diagrams

Here are two ASCII diagrams to illustrate the concepts:

```text
       Satellite
          /|\
         / | \
        /  |  \  <-- Sensor's Field of View (FOV)
       /   |   \
      /    |    \
     /     |     \
    /      |      \
   /       |       \
  /        |        \
 /         |         \
|----------|----------|  <-- Swath Width (W)
|          |          |
|          |          |
|          |          |
|          |          |
|          |          |
|          |          |
|__________|__________|
     EARTH'S SURFACE

Figure 1: Swath Width Diagram.
The satellite is at altitude 'h' above the Earth. The lines extending from the satellite
down to the Earth's surface define the edges of the sensor's field of view, creating
a strip of observable area known as the Swath. The central line is the nadir direction.
```

```text
                                 NORTH POLE
                                     |
                                     |
                                     |
                                     |
                                   /---\
                                  /     \
                                 /       \
                                |         |
                                |         |  <-- Groundtrack for a highly
                                |         |      inclined orbit (e.g., polar)
                                 \       /
                                  \     /
                                   \---/
                                     |
    WEST <---------------------------------------------------> EAST
                                     |
                                     |
                                     |
                                     |
                                     |
                                     |
                                     |
                                     |
                                     |
                                 SOUTH POLE

Figure 2: Groundtrack Diagram (Simplified Polar Orbit).
This shows a groundtrack for a satellite in a highly inclined (e.g., polar) orbit.
As the satellite orbits, the Earth rotates underneath it, causing the groundtrack
to shift longitudinally with each pass. The groundtrack appears as a wavy line
that reaches a maximum latitude equal to the orbit's inclination.
The lines converge at the poles due to the geometry of projecting onto a sphere.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Imagine a **G**iant **R**otating **E**arth with a **T**iny **S**atellite **W**atching. The satellite casts a **GR**ound**T**rack "shadow" that shifts because the Earth is spinning. Its camera has a **SW**ath like a wide paintbrush. How often that paintbrush touches a specific spot is the **RE**visit **T**ime.
    *   **G**roundtrack: **G**hostly **R**oad on **E**arth.
    *   **SW**ath: **SW**ide **A**rea **T**racked **H**orizontally.
    *   **RE**visit **T**ime: **RE**turn **V**iew **I**nterval **S**pot **I**n **T**ime.

2.  **Formulas/Facts to Overlearn:**
    *   **Longitudinal Shift per Orbit:** $\Delta \lambda_{shift} = \omega_E T_{orbit}$ (This is the most fundamental effect of Earth's rotation on groundtracks).
    *   **Swath Width (Earth-centered angle):** $\alpha = \arcsin\left(\frac{R_E+h}{R_E} \sin \phi\right) - \phi$ (Captures Earth curvature). Then $W = 2 R_E \alpha$.
    *   **Maximum Latitude of Groundtrack:** $i$ (Inclination).

3.  **Spaced-Repetition Schedule:**
    *   **Review 1:** In 1 day (tomorrow).
    *   **Review 2:** In 3 days.
    *   **Review 3:** In 7 days.
    *   **Review 4:** In 16 days.
    *   **Review 5:** In 35 days.
    Focus on re-deriving the concepts and solving a few self-check problems each time.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the formulas, you can always rebuild them from these first principles:
    *   **Groundtrack:** Start with a satellite's position vector in an ECI frame. Understand how to rotate this vector into an ECEF frame using the Earth's sidereal rotation angle. From the ECEF Cartesian coordinates, derive latitude and longitude. The plot of these coordinates over time is the groundtrack. The key is the transformation from ECI to ECEF.
    *   **Swath:** Draw a diagram. You have the Earth's center, the satellite, and a point on the Earth's surface at the edge of the swath. This forms a triangle. Use the Law of Sines (or Cosines) on this triangle, incorporating the satellite's altitude and the sensor'