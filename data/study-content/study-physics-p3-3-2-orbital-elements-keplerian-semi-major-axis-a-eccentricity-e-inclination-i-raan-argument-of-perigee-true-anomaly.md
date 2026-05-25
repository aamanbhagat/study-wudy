## 1. What it is — in plain English

Imagine you want to describe the exact path a satellite takes around Earth. It's not just "it goes around." You need a precise "address" for that path, something that tells you its size, its shape, its tilt, and where it's pointing in space. That's exactly what Keplerian orbital elements are.

Think of it like giving directions to a friend: "Go down Main Street for two blocks (size), then turn left at the curvy road (shape), head north (tilt), past the big oak tree (where it crosses a reference line), then turn into the driveway with the mailbox (where the closest point is), and your destination is the house itself (where it is right now)." These six numbers are the "directions" for an orbit.

These six specific numbers, or "elements," completely define an object's path in space around a central body (like Earth, the Sun, or another planet). Once you know these six numbers, you know everything about the orbit: how big it is, how stretched out it is, how much it's tilted, and its orientation in 3D space.

They are called "Keplerian" because they build upon Johannes Kepler's laws of planetary motion, which describe how objects orbit under the influence of gravity. While Kepler originally described planetary orbits around the Sun, these elements are universally applicable to any two-body gravitational system.

Crucially, five of these elements describe the *path itself*, which remains constant if there are no external forces other than the central body's gravity. The sixth element simply tells you *where* the object is along that path at a specific moment in time.

## 2. Why it matters — real-world applications

Keplerian orbital elements are the fundamental language of spaceflight. Without them, we couldn't operate in space.

1.  **Satellite Tracking and Collision Avoidance (NORAD/Space-Track.org):** Every active satellite and significant piece of space debris has its orbital elements (often presented as Two-Line Elements or TLEs, which are derived from Keplerian elements). Organizations like the North American Aerospace Defense Command (NORAD) and the Space Force's 18th Space Defense Squadron constantly track these objects. By knowing their orbital elements, we can predict their future positions, identify potential collision risks (e.g., between the International Space Station and a piece of debris), and issue warnings or plan avoidance maneuvers. This is critical for maintaining a safe and sustainable space environment.

2.  **Mission Planning and Design (SpaceX, NASA, ESA):** Before any satellite is launched, its desired orbital elements are meticulously calculated. This determines everything from the launch window (when to launch to reach the desired orbit efficiently) to the design of its communication systems (which ground stations it will pass over) and its operational lifetime (how much fuel it needs for station-keeping). For example, designing a constellation like Starlink requires precise control over the semi-major axis, inclination, and RAAN of hundreds or thousands of satellites to ensure global coverage.

3.  **Spacecraft Navigation and Control (GPS, Galileo, GLONASS):** Global Navigation Satellite Systems (GNSS) like GPS rely on satellites broadcasting their precise orbital elements (ephemeris data) to receivers on Earth. Your phone's GPS uses this data to calculate the satellites' positions in space, then measures the time delay of signals from multiple satellites to pinpoint your location on Earth. Accurate orbital elements are paramount for the integrity and precision of these navigation systems.

4.  **Interplanetary Trajectory Design (JPL, various space agencies):** When planning missions to Mars, Jupiter, or beyond, engineers use Keplerian elements as the starting point for calculating complex trajectories. While interplanetary paths are often patched-conics (a series of two-body problems), understanding the Keplerian elements of the departure and arrival orbits around each celestial body is essential for designing efficient transfers, such as Hohmann transfers, and ensuring the spacecraft arrives at its destination at the correct time and velocity.

## 3. Prerequisites — what you must know first

Before diving deep into Keplerian orbital elements, ensure you have a solid grasp of these foundational concepts:

*   **Newtonian Mechanics:** Understanding Newton's Laws of Motion (especially F=ma) and his Law of Universal Gravitation, which describes the attractive force between any two masses.
*   **Conic Sections:** Familiarity with the geometric properties of ellipses, parabolas, and hyperbolas, as these are the fundamental shapes of orbits under a central gravitational force.
*   **Vectors:** Proficiency in vector addition, subtraction, dot products, and cross products, as position, velocity, and angular momentum are inherently vector quantities.
*   **Spherical Coordinates:** Understanding how to describe a point in 3D space using a radial distance and two angles (e.g., longitude and latitude), which helps in visualizing orbital orientation.
*   **Basic Trigonometry:** Comfort with sine, cosine, tangent, and inverse trigonometric functions, as many orbital calculations involve angles and their relationships within right triangles.
*   **Conservation Laws:** Knowledge of the conservation of energy and angular momentum in a gravitational field, which are critical for deriving and understanding orbital parameters.
*   **Reference Frames:** An awareness of inertial reference frames and how coordinate systems are defined (e.g., Earth-Centered Inertial, or ECI, frame).

## 4. The core idea — step by step

The six Keplerian orbital elements are a set of parameters that define a unique orbit. Five of them define the shape and orientation of the orbit, and the sixth defines the position of the satellite along that orbit at a specific time.

Let's break them down. We'll assume an Earth-centered inertial (ECI) coordinate system with its origin at the center of the Earth, its X-axis pointing towards the Vernal Equinox (a fixed direction in space), its Z-axis pointing along the Earth's rotational axis (North Pole), and its Y-axis completing a right-handed system.

### Step 1: Semi-major axis ($a$)

*   **Plain English:** The semi-major axis describes the *size* of the orbit. For an elliptical orbit, it's half the longest diameter of the ellipse. For a circular orbit, it's simply the radius. It's directly related to the total energy of the orbiting object.
*   **Small Concrete Example:** A satellite in Low Earth Orbit (LEO) might have a semi-major axis of about 6,800 km (Earth's radius + ~400 km altitude). A geostationary satellite will have a semi-major axis of about 42,164 km. The larger the 'a', the larger the orbit.
*   **Formal/Mathematical Version:**
    For an elliptical orbit, the semi-major axis $a$ is half the sum of the periapsis radius ($r_p$, closest point to the central body) and the apoapsis radius ($r_a$, farthest point).
    $$a = \frac{r_p + r_a}{2}$$
    More generally, it's related to the specific orbital energy ($\mathcal{E}$) by:
    $$\mathcal{E} = -\frac{\mu}{2a}$$
    where $\mu$ is the standard gravitational parameter of the central body ($\mu = GM$, where G is the gravitational constant and M is the mass of the central body). Note that $\mathcal{E}$ is negative for bound (elliptical/circular) orbits.
*   **What could go wrong:** Confusing semi-major axis with the radius of the central body or the altitude. Remember it's measured from the center of the central body to the edge of the ellipse along its longest axis, then halved. It's a measure of the *overall size* of the orbit.

### Step 2: Eccentricity ($e$)

*   **Plain English:** Eccentricity describes the *shape* of the orbit – how "squashed" or "stretched out" it is. A value of zero means a perfect circle. Values between zero and one mean an ellipse. A value of exactly one means a parabola (an escape trajectory), and greater than one means a hyperbola (another type of escape trajectory).
*   **Small Concrete Example:** A perfectly circular orbit (like some idealized LEOs) has $e=0$. The Earth's orbit around the Sun has a small eccentricity of about $e=0.0167$, making it very close to a circle. A highly elliptical orbit, like that of a Molniya satellite, might have $e \approx 0.7$.
*   **Formal/Mathematical Version:**
    For an elliptical orbit, the eccentricity $e$ is given by:
    $$e = \frac{r_a - r_p}{r_a + r_p}$$
    It can also be expressed in terms of the specific angular momentum ($h$) and specific orbital energy ($\mathcal{E}$):
    $$e = \sqrt{1 + \frac{2\mathcal{E}h^2}{\mu^2}}$$
    where $h = |\mathbf{r} \times \mathbf{v}|$ is the magnitude of the specific angular momentum.
*   **What could go wrong:** Forgetting that eccentricity is always non-negative ($e \ge 0$). Also, misinterpreting $e=1$ as a highly stretched ellipse; it's actually the boundary case for an escape trajectory.

### Step 3: Inclination ($i$)

*   **Plain English:** Inclination describes the *tilt* of the orbital plane relative to a specific reference plane. For Earth orbits, the reference plane is usually the Earth's equatorial plane. If $i=0^\circ$, the satellite orbits directly over the equator. If $i=90^\circ$, it's a polar orbit, passing over both poles.
*   **Small Concrete Example:** The International Space Station (ISS) has an inclination of approximately $51.6^\circ$. This means its orbital plane is tilted $51.6^\circ$ with respect to the Earth's equator. A satellite in a sun-synchronous orbit often has an inclination around $98^\circ$, meaning it orbits "backwards" relative to Earth's rotation.
*   **Formal/Mathematical Version:**
    Inclination $i$ is the angle between the angular momentum vector $\mathbf{h}$ (which is perpendicular to the orbital plane) and the Z-axis of the reference frame (which is normal to the reference plane).
    $$\cos i = \frac{\mathbf{h} \cdot \mathbf{K}}{|\mathbf{h}| |\mathbf{K}|}$$
    where $\mathbf{K}$ is the unit vector along the Z-axis (e.g., $[0, 0, 1]^T$ in ECI). $i$ is typically defined in the range $0^\circ \le i \le 180^\circ$.
*   **What could go wrong:** Confusing inclination with the spacecraft's attitude (its orientation). Inclination describes the *plane* of the orbit, not which way the satellite is pointing. Also, forgetting that $i > 90^\circ$ means a retrograde orbit (orbiting against the direction of the central body's rotation).

### Step 4: Right Ascension of the Ascending Node (RAAN, $\Omega$)

*   **Plain English:** RAAN tells you *where* the orbital plane crosses the reference plane (usually the equator) as the satellite moves from south to north. Think of it as the "longitude" of the point where the satellite "ascends" above the equator.
*   **Small Concrete Example:** If the reference X-axis points to the Vernal Equinox, and a satellite crosses the equator heading north directly over the Greenwich Meridian, its RAAN would be roughly $0^\circ$ (if Greenwich aligns with the Vernal Equinox at that moment, which it doesn't, but it's an analogy). More accurately, it's measured from a fixed direction in space (the Vernal Equinox).
*   **Formal/Mathematical Version:**
    RAAN $\Omega$ is the angle in the reference plane (e.g., equatorial plane) from the reference X-axis (e.g., Vernal Equinox direction) to the **ascending node**. The ascending node is the point where the orbit crosses the reference plane going from negative Z (south) to positive Z (north).
    It is calculated using the node vector $\mathbf{n}$, which points from the central body to the ascending node:
    $$\mathbf{n} = \mathbf{K} \times \mathbf{h}$$
    where $\mathbf{K}$ is the unit vector along the Z-axis and $\mathbf{h}$ is the specific angular momentum vector.
    Then, $\Omega$ is the angle between the reference X-axis ($\mathbf{I}$) and $\mathbf{n}$:
    $$\cos \Omega = \frac{\mathbf{n} \cdot \mathbf{I}}{|\mathbf{n}| |\mathbf{I}|}$$
    If $n_y < 0$ (the Y-component of $\mathbf{n}$ is negative), then $\Omega = 360^\circ - \Omega_{calculated}$. $\Omega$ is defined in the range $0^\circ \le \Omega < 360^\circ$.
*   **What could go wrong:** Forgetting the "ascending" part – there's also a descending node. Also, confusing it with longitude on Earth; RAAN is fixed relative to the inertial reference frame, not Earth's rotating surface. It's undefined for $i=0^\circ$ or $i=180^\circ$ (equatorial orbits) because there's no distinct ascending node.

### Step 5: Argument of Perigee ($\omega$)

*   **Plain English:** The argument of perigee tells you *where* the closest point of the orbit (perigee) is located *within the orbital plane*. It's measured from the ascending node to the perigee.
*   **Small Concrete Example:** If a satellite crosses the equator going north (ascending node) and then immediately reaches its closest point to Earth, its argument of perigee would be $0^\circ$. If its closest point is 90 degrees *after* the ascending node in its orbital path, then $\omega = 90^\circ$.
*   **Formal/Mathematical Version:**
    The argument of perigee $\omega$ is the angle in the orbital plane from the ascending node vector $\mathbf{n}$ to the periapsis vector $\mathbf{e}$ (eccentricity vector, which points towards periapsis).
    $$\cos \omega = \frac{\mathbf{n} \cdot \mathbf{e}}{|\mathbf{n}| |\mathbf{e}|}$$
    If $e_z < 0$ (the Z-component of $\mathbf{e}$ is negative), then $\omega = 360^\circ - \omega_{calculated}$. $\omega$ is defined in the range $0^\circ \le \omega < 360^\circ$.
    The eccentricity vector $\mathbf{e}$ is given by:
    $$\mathbf{e} = \frac{(\mathbf{v} \times \mathbf{h})}{\mu} - \frac{\mathbf{r}}{|\mathbf{r}|}$$
    where $\mathbf{r}$ is the position vector and $\mathbf{v}$ is the velocity vector.
*   **What could go wrong:** Forgetting that $\omega$ is measured *in the orbital plane*. It's also undefined for circular orbits ($e=0$) because there is no distinct perigee, and for equatorial orbits ($i=0^\circ$ or $i=180^\circ$) because there is no distinct ascending node.

### Step 6: True Anomaly ($\nu$)

*   **Plain English:** The true anomaly tells you *where the satellite is right now* along its orbit. It's the angle measured from the perigee to the satellite's current position vector, *in the orbital plane*.
*   **Small Concrete Example:** If a satellite is currently at its closest point to Earth (perigee), its true anomaly is $0^\circ$. If it's halfway around its orbit from perigee, its true anomaly is $180^\circ$.
*   **Formal/Mathematical Version:**
    The true anomaly $\nu$ is the angle in the orbital plane from the eccentricity vector $\mathbf{e}$ (pointing to periapsis) to the current position vector $\mathbf{r}$.
    $$\cos \nu = \frac{\mathbf{e} \cdot \mathbf{r}}{|\mathbf{e}| |\mathbf{r}|}$$
    If $\mathbf{r} \cdot \mathbf{v} < 0$ (meaning the satellite is moving towards periapsis), then $\nu = 360^\circ - \nu_{calculated}$. Otherwise, if $\mathbf{r} \cdot \mathbf{v} \ge 0$ (moving away from periapsis), $\nu$ is the calculated value. $\nu$ is defined in the range $0^\circ \le \nu < 360^\circ$.
*   **What could go wrong:** Confusing true anomaly with other "anomalies" like eccentric anomaly ($E$) or mean anomaly ($M$), which are related but different ways to describe position along the orbit. It's also undefined for circular orbits ($e=0$) because there's no distinct perigee to measure from.

## 5. Worked examples — multiple, with every step shown

We'll use standard gravitational parameter for Earth: $\mu = 3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2$.

### Example 1 (Easy): Calculate semi-major axis and eccentricity from periapsis and apoapsis radii.

**Problem:** A satellite has a periapsis altitude of 400 km and an apoapsis altitude of 1000 km above the Earth's surface. Assuming Earth's radius $R_E = 6378 \text{ km}$, calculate its semi-major axis $a$ and eccentricity $e$.

**Given:**
*   Periapsis altitude $h_p = 400 \text{ km}$
*   Apoapsis altitude $h_a = 1000 \text{ km}$
*   Earth's radius $R_E = 6378 \text{ km}$

**Want:** Semi-major axis $a$, Eccentricity $e$.

**Solution:**

1.  **Calculate periapsis radius ($r_p$):**
    The periapsis radius is the distance from the center of the Earth to the closest point of the orbit.
    $$r_p = R_E + h_p$$
    $$r_p = 6378 \text{ km} + 400 \text{ km}$$
    $$r_p = 6778 \text{ km}$$
    This is the distance from the center of the Earth to the closest point in the orbit.

2.  **Calculate apoapsis radius ($r_a$):**
    The apoapsis radius is the distance from the center of the Earth to the farthest point of the orbit.
    $$r_a = R_E + h_a$$
    $$r_a = 6378 \text{ km} + 1000 \text{ km}$$
    $$r_a = 7378 \text{ km}$$
    This is the distance from the center of the Earth to the farthest point in the orbit.

3.  **Calculate semi-major axis ($a$):**
    The semi-major axis is half the sum of the periapsis and apoapsis radii.
    $$a = \frac{r_p + r_a}{2}$$
    $$a = \frac{6778 \text{ km} + 7378 \text{ km}}{2}$$
    $$a = \frac{14156 \text{ km}}{2}$$
    $$\mathbf{a = 7078 \text{ km}}$$
    This gives us the overall size of the elliptical orbit.

4.  **Calculate eccentricity ($e$):**
    The eccentricity describes the shape of the ellipse, based on the difference between apoapsis and periapsis radii.
    $$e = \frac{r_a - r_p}{r_a + r_p}$$
    $$e = \frac{7378 \text{ km} - 6778 \text{ km}}{7378 \text{ km} + 6778 \text{ km}}$$
    $$e = \frac{600 \text{ km}}{14156 \text{ km}}$$
    $$\mathbf{e \approx 0.04238}$$
    This value, between 0 and 1, confirms it's an elliptical orbit, but fairly close to circular.

**Reflection:** This example was straightforward, directly applying the definitions of $a$ and $e$ for an ellipse. The key was to remember that periapsis/apoapsis *radii* are measured from the *center* of the central body, not just altitudes above the surface.

### Example 2 (Medium): Calculate semi-major axis and eccentricity from specific energy and angular momentum.

**Problem:** A spacecraft has a specific orbital energy $\mathcal{E} = -2.95 \times 10^7 \text{ J/kg}$ and a magnitude of specific angular momentum $h = 5.2 \times 10^{10} \text{ m}^2/\text{s}$. Calculate its semi-major axis $a$ and eccentricity $e$. Use $\mu = 3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2$.

**Given:**
*   Specific orbital energy $\mathcal{E} = -2.95 \times 10^7 \text{ J/kg}$ (or $\text{m}^2/\text{s}^2$)
*   Magnitude of specific angular momentum $h = 5.2 \times 10^{10} \text{ m}^2/\text{s}$
*   Earth's gravitational parameter $\mu = 3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2$

**Want:** Semi-major axis $a$, Eccentricity $e$.

**Solution:**

1.  **Calculate semi-major axis ($a$) from specific orbital energy:**
    The specific orbital energy is directly related to the semi-major axis for bound orbits.
    $$\mathcal{E} = -\frac{\mu}{2a}$$
    Rearrange the formula to solve for $a$:
    $$2a\mathcal{E} = -\mu$$
    $$a = -\frac{\mu}{2\mathcal{E}}$$
    Substitute the given values:
    $$a = -\frac{3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2}{2 \times (-2.95 \times 10^7 \text{ m}^2/\text{s}^2)}$$
    $$a = \frac{3.986004418 \times 10^{14}}{5.9 \times 10^7} \text{ m}$$
    $$\mathbf{a \approx 6.7559 \times 10^6 \text{ m} \quad (or \ 6755.9 \text{ km})}$$
    The semi-major axis is positive, as expected for a bound orbit.

2.  **Calculate eccentricity ($e$) from specific energy and angular momentum:**
    Eccentricity can be found using the specific energy, angular momentum, and gravitational parameter.
    $$e = \sqrt{1 + \frac{2\mathcal{E}h^2}{\mu^2}}$$
    Substitute the given values:
    $$e = \sqrt{1 + \frac{2 \times (-2.95 \times 10^7) \times (5.2 \times 10^{10})^2}{(3.986004418 \times 10^{14})^2}}$$
    First, calculate the numerator term inside the square root:
    $$2 \times (-2.95 \times 10^7) \times (5.2 \times 10^{10})^2 = -5.9 \times 10^7 \times (27.04 \times 10^{20})$$
    $$= -159.536 \times 10^{27} = -1.59536 \times 10^{29}$$
    Next, calculate the denominator term:
    $$(3.986004418 \times 10^{14})^2 = 15.888219 \times 10^{28} = 1.5888219 \times 10^{29}$$
    Now, substitute these back into the eccentricity equation:
    $$e = \sqrt{1 + \frac{-1.59536 \times 10^{29}}{1.5888219 \times 10^{29}}}$$
    $$e = \sqrt{1 - 1.004115}$$
    $$e = \sqrt{-0.004115}$$
    **Wait!** A negative value inside the square root for eccentricity indicates a problem. Let's recheck calculations or assumptions. The formula $e = \sqrt{1 + \frac{2\mathcal{E}h^2}{\mu^2}}$ is correct.

    Let's re-evaluate the calculation:
    $2\mathcal{E}h^2 = 2 \times (-2.95 \times 10^7) \times (5.2 \times 10^{10})^2 = -5.9 \times 10^7 \times 2.704 \times 10^{21} = -1.59536 \times 10^{29}$
    $\mu^2 = (3.986004418 \times 10^{14})^2 = 1.5888219 \times 10^{29}$

    The ratio is $\frac{-1.59536 \times 10^{29}}{1.5888219 \times 10^{29}} \approx -1.004115$.
    So $e = \sqrt{1 - 1.004115} = \sqrt{-0.004115}$.

    This implies the given specific energy and angular momentum are incompatible with a real elliptical orbit, or they describe a hyperbolic orbit. However, if $\mathcal{E}$ is negative, it *must* be an ellipse or circle. Let's assume there's a slight error in the problem's given values, or I need to be more precise with $\mu$.
    Let's try using the exact $\mu$ and re-calculating the denominator:
    $\mu = 398600.4418 \times 10^9 \text{ m}^3/\text{s}^2$
    $\mu^2 = (3.986004418 \times 10^{14})^2 = 1.588821901 \times 10^{29}$

    Let's re-evaluate the numerator with more precision for $h$:
    $h = 5.2 \times 10^{10} \text{ m}^2/\text{s}$
    $h^2 = (5.2 \times 10^{10})^2 = 27.04 \times 10^{20} = 2.704 \times 10^{21}$
    $2\mathcal{E}h^2 = 2 \times (-2.95 \times 10^7) \times (2.704 \times 10^{21}) = -5.9 \times 10^7 \times 2.704 \times 10^{21} = -1.59536 \times 10^{29}$

    The numbers are correct. This means the given $\mathcal{E}$ and $h$ values are physically impossible for a bound orbit. For a bound orbit, $1 + \frac{2\mathcal{E}h^2}{\mu^2}$ must be $\ge 0$. Since $\mathcal{E}$ is negative, $2\mathcal{E}h^2$ is negative. So we need $1 > |\frac{2\mathcal{E}h^2}{\mu^2}|$. In this case, $1 < 1.004115$, which is why it's negative.

    **Let's adjust the problem values to make it solvable.** Let's assume $\mathcal{E} = -3.0 \times 10^7 \text{ J/kg}$ and $h = 5.0 \times 10^{10} \text{ m}^2/\text{s}$.

    **Revised Problem:** A spacecraft has a specific orbital energy $\mathcal{E} = -3.0 \times 10^7 \text{ J/kg}$ and a magnitude of specific angular momentum $h = 5.0 \times 10^{10} \text{ m}^2/\text{s}$. Calculate its semi-major axis $a$ and eccentricity $e$. Use $\mu = 3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2$.

    **Revised Solution:**

    1.  **Calculate semi-major axis ($a$):**
        $$a = -\frac{\mu}{2\mathcal{E}}$$
        $$a = -\frac{3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2}{2 \times (-3.0 \times 10^7 \text{ m}^2/\text{s}^2)}$$
        $$a = \frac{3.986004418 \times 10^{14}}{6.0 \times 10^7} \text{ m}$$
        $$\mathbf{a \approx 6.6433 \times 10^6 \text{ m} \quad (or \ 6643.3 \text{ km})}$$

    2.  **Calculate eccentricity ($e$):**
        $$e = \sqrt{1 + \frac{2\mathcal{E}h^2}{\mu^2}}$$
        Calculate numerator:
        $2\mathcal{E}h^2 = 2 \times (-3.0 \times 10^7) \times (5.0 \times 10^{10})^2$
        $$= -6.0 \times 10^7 \times (25.0 \times 10^{20}) = -150.0 \times 10^{27} = -1.5 \times 10^{29}$$
        Calculate denominator:
        $\mu^2 = (3.986004418 \times 10^{14})^2 = 1.588821901 \times 10^{29}$
        Substitute into $e$ formula:
        $$e = \sqrt{1 + \frac{-1.5 \times 10^{29}}{1.588821901 \times 10^{29}}}$$
        $$e = \sqrt{1 - 0.944111}$$
        $$e = \sqrt{0.055889}$$
        $$\mathbf{e \approx 0.2364}$$
    This is a valid eccentricity for an elliptical orbit.

**Reflection:** This example highlights the importance of checking for physical consistency in intermediate results. The initial values led to an imaginary eccentricity, indicating an error in the problem statement or an understanding of the conditions for bound orbits. The revised values yield a physically plausible result. It also shows how $a$ and $e$ are fundamental properties derived from the conserved quantities of energy and angular momentum.

### Example 3 (Medium-Hard): Calculate inclination, RAAN, and argument of perigee from state vectors.

**Problem:** A satellite has a position vector $\mathbf{r} = [7000, 0, 0]^T \text{ km}$ and a velocity vector $\mathbf{v} = [0, 8, 2]^T \text{ km/s}$ in an ECI frame. Calculate its inclination $i$, Right Ascension of the Ascending Node $\Omega$, and Argument of Perigee $\omega$. Assume $\mu = 3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2$. (Convert km to m for calculations).

**Given:**
*   $\mathbf{r} = [7000, 0, 0]^T \text{ km} = [7 \times 10^6, 0, 0]^T \text{ m}$
*   $\mathbf{v} = [0, 8, 2]^T \text{ km/s} = [0, 8 \times 10^3, 2 \times 10^3]^T \text{ m/s}$
*   $\mu = 3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2$

**Want:** Inclination $i$, RAAN $\Omega$, Argument of Perigee $\omega$.

**Solution:**

1.  **Calculate specific angular momentum vector ($\mathbf{h}$):**
    The specific angular momentum vector is perpendicular to the orbital plane.
    $$\mathbf{h} = \mathbf{r} \times \mathbf{v}$$
    $$\mathbf{h} = \begin{vmatrix} \mathbf{I} & \mathbf{J} & \mathbf{K} \\ 7 \times 10^6 & 0 & 0 \\ 0 & 8 \times 10^3 & 2 \times 10^3 \end{vmatrix}$$
    $$\mathbf{h} = (0 \cdot 2 \times 10^3 - 0 \cdot 8 \times 10^3)\mathbf{I} - (7 \times 10^6 \cdot 2 \times 10^3 - 0 \cdot 0)\mathbf{J} + (7 \times 10^6 \cdot 8 \times 10^3 - 0 \cdot 0)\mathbf{K}$$
    $$\mathbf{h} = [0, -14 \times 10^9, 56 \times 10^9]^T \text{ m}^2/\text{s}$$
    $$\mathbf{h} = [0, -1.4 \times 10^{10}, 5.6 \times 10^{10}]^T \text{ m}^2/\text{s}$$
    This vector defines the orientation of the orbital plane.

2.  **Calculate inclination ($i$):**
    Inclination is the angle between $\mathbf{h}$ and the Z-axis ($\mathbf{K} = [0,0,1]^T$).
    $$|\mathbf{h}| = \sqrt{0^2 + (-1.4 \times 10^{10})^2 + (5.6 \times 10^{10})^2}$$
    $$|\mathbf{h}| = \sqrt{1.96 \times 10^{20} + 31.36 \times 10^{20}}$$
    $$|\mathbf{h}| = \sqrt{33.32 \times 10^{20}} = \sqrt{3.332 \times 10^{21}} \approx 5.772 \times 10^{10} \text{ m}^2/\text{s}$$
    $$\cos i = \frac{\mathbf{h} \cdot \mathbf{K}}{|\mathbf{h}| |\mathbf{K}|} = \frac{[0, -1.4 \times 10^{10}, 5.6 \times 10^{10}] \cdot [0, 0, 1]}{5.772 \times 10^{10} \cdot 1}$$
    $$\cos i = \frac{5.6 \times 10^{10}}{5.772 \times 10^{10}} \approx 0.9699$$
    $$i = \arccos(0.9699)$$
    $$\mathbf{i \approx 14.15^\circ}$$
    This is a low-inclination orbit, close to the equatorial plane.

3.  **Calculate node vector ($\mathbf{n}$):**
    The node vector points to the ascending node. It's the cross product of the Z-axis unit vector and $\mathbf{h}$.
    $$\mathbf{n} = \mathbf{K} \times \mathbf{h}$$
    $$\mathbf{n} = \begin{vmatrix} \mathbf{I} & \mathbf{J} & \mathbf{K} \\ 0 & 0 & 1 \\ 0 & -1.4 \times 10^{10} & 5.6 \times 10^{10} \end{vmatrix}$$
    $$\mathbf{n} = (0 \cdot 5.6 \times 10^{10} - 1 \cdot (-1.4 \times 10^{10}))\mathbf{I} - (0 \cdot 5.6 \times 10^{10} - 1 \cdot 0)\mathbf{J} + (0 \cdot (-1.4 \times 10^{10}) - 0 \cdot 0)\mathbf{K}$$
    $$\mathbf{n} = [1.4 \times 10^{10}, 0, 0]^T \text{ m}^2/\text{s}$$
    $$|\mathbf{n}| = 1.4 \times 10^{10} \text{ m}^2/\text{s}$$
    This vector points along the X-axis, meaning the ascending node is in the direction of the Vernal Equinox.

4.  **Calculate RAAN ($\Omega$):**
    RAAN is the angle between the reference X-axis ($\mathbf{I} = [1,0,0]^T$) and $\mathbf{n}$.
    $$\cos \Omega = \frac{\mathbf{n} \cdot \mathbf{I}}{|\mathbf{n}| |\mathbf{I}|} = \frac{[1.4 \times 10^{10}, 0, 0] \cdot [1, 0, 0]}{1.4 \times 10^{10} \cdot 1}$$
    $$\cos \Omega = \frac{1.4 \times 10^{10}}{1.4 \times 10^{10}} = 1$$
    $$\Omega = \arccos(1)$$
    $$\Omega = 0^\circ$$
    Since $n_y = 0$, we don't need the $360^\circ - \Omega$ check.
    $$\mathbf{\Omega = 0^\circ}$$
    This means the ascending node is aligned with the reference X-axis.

5.  **Calculate eccentricity vector ($\mathbf{e}$):**
    The eccentricity vector points towards the periapsis.
    $$\mathbf{e} = \frac{(\mathbf{v} \times \mathbf{h})}{\mu} - \frac{\mathbf{r}}{|\mathbf{r}|}$$
    First, calculate $\mathbf{v} \times \mathbf{h}$:
    $$\mathbf{v} \times \mathbf{h} = \begin{vmatrix} \mathbf{I} & \mathbf{J} & \mathbf{K} \\ 0 & 8 \times 10^3 & 2 \times 10^3 \\ 0 & -1.4 \times 10^{10} & 5.6 \times 10^{10} \end{vmatrix}$$
    $$= (8 \times 10^3 \cdot 5.6 \times 10^{10} - 2 \times 10^3 \cdot (-1.4 \times 10^{10}))\mathbf{I}$$
    $$- (0 \cdot 5.6 \times 10^{10} - 2 \times 10^3 \cdot 0)\mathbf{J}$$
    $$+ (0 \cdot (-1.4 \times 10^{10}) - 8 \times 10^3 \cdot 0)\mathbf{K}$$
    $$= (44.8 \times 10^{13} + 2.8 \times 10^{13})\mathbf{I} - 0\mathbf{J} + 0\mathbf{K}$$
    $$= [47.6 \times 10^{13}, 0, 0]^T \text{ m}^3/\text{s}^2$$
    Now, substitute into the $\mathbf{e}$ formula:
    $$\mathbf{e} = \frac{[4.76 \times 10^{14}, 0, 0]^T}{3.986004418 \times 10^{14}} - \frac{[7 \times 10^6, 0, 0]^T}{7 \times 10^6}$$
    $$\mathbf{e} = [1.1941, 0, 0]^T - [1, 0, 0]^T$$
    $$\mathbf{e} = [0.1941, 0, 0]^T$$
    So, $|\mathbf{e}| = 0.1941$. This is the eccentricity $e$.

6.  **Calculate argument of perigee ($\omega$):**
    Argument of perigee is the angle between $\mathbf{n}$ and $\mathbf{e}$.
    $$\cos \omega = \frac{\mathbf{n} \cdot \mathbf{e}}{|\mathbf{n}| |\mathbf{e}|}$$
    $$\cos \omega = \frac{[1.4 \times 10^{10}, 0, 0] \cdot [0.1941, 0, 0]}{1.4 \times 10^{10} \cdot 0.1941}$$
    $$\cos \omega = \frac{1.4 \times 10^{10} \times 0.1941}{1.4 \times 10^{10} \times 0.1941} = 1$$
    $$\omega = \arccos(1)$$
    $$\mathbf{\omega = 0^\circ}$$
    Since $e_z = 0$, we don't need the $360^\circ - \omega$ check.
    This means the periapsis is also aligned with the reference X-axis, at the ascending node.

**Reflection:** This example demonstrates the vector math required to determine orbital orientation. The fact that $\Omega$ and $\omega$ both came out to $0^\circ$ means the ascending node is along the X-axis, and perigee is also along the X-axis, which implies the orbit's closest point to Earth is at the ascending node. The initial position vector $\mathbf{r} = [7000, 0, 0]^T$ being aligned with the X-axis and $\mathbf{v}$ having positive Z component means the satellite is exactly at the ascending node *and* at perigee at this instant. This implies the true anomaly at this instant is also $0^\circ$.

### Example 4 (Hard): Calculate all six Keplerian elements from a given state vector.

**Problem:** A spacecraft is at position $\mathbf{r} = [1000, 5000, 2000]^T \text{ km}$ and has velocity $\mathbf{v} = [-5, 2, 6]^T \text{ km/s}$ in an ECI frame. Calculate all six Keplerian orbital elements: $a, e, i, \Omega, \omega, \nu$. Use $\mu = 3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2$. (Convert km to m for calculations).

**Given:**
*   $\mathbf{r} = [1000, 5000, 2000]^T \text{ km} = [1 \times 10^6, 5 \times 10^6, 2 \times 10^6]^T \text{ m}$
*   $\mathbf{v} = [-5, 2, 6]^T \text{ km/s} = [-5 \times 10^3, 2 \times 10^3, 6 \times 10^3]^T \text{ m/s}$
*   $\mu = 3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2$

**Want:** $a, e, i, \Omega, \omega, \nu$.

**Solution:**

1.  **Calculate magnitude of position and velocity vectors:**
    $$|\mathbf{r}| = \sqrt{(1 \times 10^6)^2 + (5 \times 10^6)^2 + (2 \times 10^6)^2}$$
    $$|\mathbf{r}| = \sqrt{1 \times 10^{12} + 25 \times 10^{12} + 4 \times 10^{12}} = \sqrt{30 \times 10^{12}} = \sqrt{3 \times 10^{13}} \approx 5.4772 \times 10^6 \text{ m}$$
    $$|\mathbf{v}| = \sqrt{(-5 \times 10^3)^2 + (2 \times 10^3)^2 + (6 \times 10^3)^2}$$
    $$|\mathbf{v}| = \sqrt{25 \times 10^6 + 4 \times 10^6 + 36 \times 10^6} = \sqrt{65 \times 10^6} = \sqrt{6.5 \times 10^7} \approx 8.0623 \times 10^3 \text{ m/s}$$

2.  **Calculate specific angular momentum vector ($\mathbf{h}$):**
    $$\mathbf{h} = \mathbf{r} \times \mathbf{v}$$
    $$\mathbf{h} = \begin{vmatrix} \mathbf{I} & \mathbf{J} & \mathbf{K} \\ 1 \times 10^6 & 5 \times 10^6 & 2 \times 10^6 \\ -5 \times 10^3 & 2 \times 10^3 & 6 \times 10^3 \end{vmatrix}$$
    $$h_x = (5 \times 10^6)(6 \times 10^3) - (2 \times 10^6)(2 \times 10^3) = 30 \times 10^9 - 4 \times 10^9 = 26 \times 10^9$$
    $$h_y = (2 \times 10^6)(-5 \times 10^3) - (1 \times 10^6)(6 \times 10^3) = -10 \times 10^9 - 6 \times 10^9 = -16 \times 10^9$$
    $$h_z = (1 \times 10^6)(2 \times 10^3) - (5 \times 10^6)(-5 \times 10^3) = 2 \times 10^9 + 25 \times 10^9 = 27 \times 10^9$$
    $$\mathbf{h} = [2.6 \times 10^{10}, -1.6 \times 10^{10}, 2.7 \times 10^{10}]^T \text{ m}^2/\text{s}$$
    $$|\mathbf{h}| = \sqrt{(2.6 \times 10^{10})^2 + (-1.6 \times 10^{10})^2 + (2.7 \times 10^{10})^2}$$
    $$|\mathbf{h}| = \sqrt{6.76 \times 10^{20} + 2.56 \times 10^{20} + 7.29 \times 10^{20}} = \sqrt{16.61 \times 10^{20}} \approx 4.0755 \times 10^{10} \text{ m}^2/\text{s}$$

3.  **Calculate specific orbital energy ($\mathcal{E}$):**
    $$\mathcal{E} = \frac{|\mathbf{v}|^2}{2} - \frac{\mu}{|\mathbf{r}|}$$
    $$\mathcal{E} = \frac{(8.0623 \times 10^3)^2}{2} - \frac{3.986004418 \times 10^{14}}{5.4772 \times 10^6}$$
    $$\mathcal{E} = \frac{6.5 \times 10^7}{2} - 7.2778 \times 10^7$$
    $$\mathcal{E} = 3.25 \times 10^7 - 7.2778 \times 10^7$$
    $$\mathcal{E} = -4.0278 \times 10^7 \text{ J/kg}$$

4.  **Calculate semi-major axis ($a$):**
    $$a = -\frac{\mu}{2\mathcal{E}}$$
    $$a = -\frac{3.986004418 \times 10^{14}}{2 \times (-4.0278 \times 10^7)}$$
    $$a = \frac{3.986004418 \times 10^{14}}{8.0556 \times 10^7}$$
    $$\mathbf{a \approx 4.9481 \times 10^6 \text{ m} \quad (or \ 4948.1 \text{ km})}$$

5.  **Calculate eccentricity vector ($\mathbf{e}$):**
    $$\mathbf{e} = \frac{(\mathbf{v} \times \mathbf{h})}{\mu} - \frac{\mathbf{r}}{|\mathbf{r}|}$$
    First, $\mathbf{v} \times \mathbf{h}$:
    $$\mathbf{v} \times \mathbf{h} = \begin{vmatrix} \mathbf{I} & \mathbf{J} & \mathbf{K} \\ -5 \times 10^3 & 2 \times 10^3 & 6 \times 10^3 \\ 2.6 \times 10^{10} & -1.6 \times 10^{10} & 2.7 \times 10^{10} \end{vmatrix}$$
    $$(2 \times 10^3)(2.7 \times 10^{10}) - (6 \times 10^3)(-1.6 \times 10^{10}) = 5.4 \times 10^{13} + 9.6 \times 10^{13} = 15.0 \times 10^{13}$$
    $$(6 \times 10^3)(2.6 \times 10^{10}) - (-5 \times 10^3)(2.7 \times 10^{10}) = 15.6 \times 10^{13} + 13.5 \times 10^{13} = 29.1 \times 10^{13}$$
    $$(-5 \times 10^3)(-1.6 \times 10^{10}) - (2 \times 10^3)(2.6 \times 10^{10}) = 8.0 \times 10^{13} - 5.2 \times 10^{13} = 2.8 \times 10^{13}$$
    $$\mathbf{v} \times \mathbf{h} = [1.5 \times 10^{14}, 2.91 \times 10^{14}, 2.8 \times 10^{13}]^T$$
    Now, calculate $\mathbf{e}$:
    $$\mathbf{e} = \frac{[1.5 \times 10^{14}, 2.91 \times 10^{14}, 2.8 \times 10^{13}]^T}{3.986004418 \times 10^{14}} - \frac{[1 \times 10^6, 5 \times 10^6, 2 \times 10^6]^T}{5.4772 \times 10^6}$$
    $$\mathbf{e} = [0.3763, 0.7301, 0.07026]^T - [0.1826, 0.9129, 0.3651]^T$$
    $$\mathbf{e} = [0.1937, -0.1828, -0.2948]^T$$

6.  **Calculate eccentricity ($e$):**
    $$e = |\mathbf{e}| = \sqrt{(0.1937)^2 + (-0.1828)^2 + (-0.2948)^2}$$
    $$e = \sqrt{0.03752 + 0.03341 + 0.08691} = \sqrt{0.15784}$$
    $$\mathbf{e \approx 0.3973}$$

7.  **Calculate inclination ($i$):**
    $$\cos i = \frac{\mathbf{h} \cdot \mathbf{K}}{|\mathbf{h}| |\mathbf{K}|} = \frac{h_z}{|\mathbf{h}|}$$
    $$\cos i = \frac{2.7 \times 10^{10}}{4.0755 \times 10^{10}} \approx 0.6625$$
    $$i = \arccos(0.6625)$$
    $$\mathbf{i \approx 48.5^\circ}$$

8.  **Calculate node vector ($\mathbf{n}$):**
    $$\mathbf{n} = \mathbf{K} \times \mathbf{h} = \begin{vmatrix} \mathbf{I} & \mathbf{J} & \mathbf{K} \\ 0 & 0 & 1 \\ 2.6 \times 10^{10} & -1.6 \times 10^{10} & 2.7 \times 10^{10} \end{vmatrix}$$
    $$n_x = (0)(2.7 \times 10^{10}) - (1)(-1.6 \times 10^{10}) = 1.6 \times 10^{10}$$
    $$n_y = (1)(2.6 \times 10^{10}) - (0)(2.7 \times 10^{10}) = -2.6 \times 10^{10}$$
    $$n_z = (0)(-1.6 \times 10^{10}) - (0)(2.6 \times 10^{10}) = 0$$
    $$\mathbf{n} = [1.6 \times 10^{10}, -2.6 \times 10^{10}, 0]^T$$
    $$|\mathbf{n}| = \sqrt{(1.6 \times 10^{10})^2 + (-2.6 \times 10^{10})^2 + 0^2} = \sqrt{2.56 \times 10^{20} + 6.76 \times 10^{20}} = \sqrt{9.32 \times 10^{20}} \approx 3.0529 \times 10^{10} \text{ m}^2/\text{s}$$

9.  **Calculate RAAN ($\Omega$):**
    $$\cos \Omega = \frac{\mathbf{n} \cdot \mathbf{I}}{|\mathbf{n}| |\mathbf{I}|} = \frac{n_x}{|\mathbf{n}|}$$
    $$\cos \Omega = \frac{1.6 \times 10^{10}}{3.0529 \times 10^{10}} \approx 0.5241$$
    Since $n_y = -2.6 \times 10^{10} < 0$, $\Omega$ is in the 3rd or 4th quadrant.
    The raw $\arccos(0.5241) \approx 58.39^\circ$.
    Since $n_y$ is negative, $\Omega = 360^\circ - 58.39^\circ$.
    $$\mathbf{\Omega \approx 301.61^\circ}$$

10. **Calculate argument of perigee ($\omega$):**
    $$\cos \omega = \frac{\mathbf{n} \cdot \mathbf{e}}{|\mathbf{n}| |\mathbf{e}|}$$
    $$\mathbf{n} \cdot \mathbf{e} = (1.6 \times 10^{10})(0.1937) + (-2.6 \times 10^{10})(-0.1828) + (0)(-0.2948)$$
    $$= 0.30992 \times 10^{10} + 0.47528 \times 10^{10} = 0.7852 \times 10^{10}$$
    $$|\mathbf{n}| |\mathbf{e}| = (3.0529 \times 10^{10})(0.3973) \approx 1.2127 \times 10^{10}$$
    $$\cos \omega = \frac{0.7852 \times 10^{10}}{1.2127 \times 10^{10}} \approx 0.6475$$
    To determine the correct quadrant for $\omega$, we check the Z-component of the eccentricity vector, $e_z = -0.2948$. Since $e_z < 0$, $\omega$ is in the 3rd or 4th quadrant.
    The raw $\arccos(0.6475) \approx 49.63^\circ$.
    Since $e_z$ is negative, $\omega = 360^\circ - 49.63^\circ$.
    $$\mathbf{\omega \approx 310.37^\circ}$$

11. **Calculate true anomaly ($\nu$):**
    $$\cos \nu = \frac{\mathbf{e} \cdot \mathbf{r}}{|\mathbf{e}| |\mathbf{r}|}$$
    $$\mathbf{e} \cdot \mathbf{r} = (0.1937)(1 \times 10^6) + (-0.1828)(5 \times 10^6) + (-0.2948)(2 \times 10^6)$$
    $$= 0.1937 \times 10^6 - 0.914 \times 10^6 - 0.5896 \times 10^6 = -1.3099 \times 10^6$$
    $$|\mathbf{e}| |\mathbf{r}| = (0.3973)(5.4772 \times 10^6) \approx 2.1764 \times 10^6$$
    $$\cos \nu = \frac{-1.3099 \times 10^6}{2.1764 \times 10^6} \approx -0.6019$$
    To determine the correct quadrant for $\nu$, we check the radial velocity component.
    $$\mathbf{r} \cdot \mathbf{v} = (1 \times 10^6)(-5 \times 10^3) + (5 \times 10^6)(2 \times 10^3) + (2 \times 10^6)(6 \times 10^3)$$
    $$= -5 \times 10^9 + 10 \times 10^9 + 12 \times 10^9 = 17 \times 10^9$$
    Since $\mathbf{r} \cdot \mathbf{v} > 0$, the spacecraft is moving away from perigee.
    The raw $\arccos(-0.6019) \approx 127.0^\circ$.
    Since $\mathbf{r} \cdot \mathbf{v} > 0$, $\nu$ is in the 1st or 2nd quadrant, so the calculated value is correct.
    $$\mathbf{\nu \approx 127.0^\circ}$$

**Summary of Orbital Elements:**
*   **Semi-major axis $a \approx 4948.1 \text{ km}$**
*   **Eccentricity $e \approx 0.3973$**
*   **Inclination $i \approx 48.5^\circ$**
*   **RAAN $\Omega \approx 301.61^\circ$**
*   **Argument of Perigee $\omega \approx 310.37^\circ$**