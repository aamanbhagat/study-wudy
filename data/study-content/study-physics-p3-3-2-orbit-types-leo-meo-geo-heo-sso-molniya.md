## 1. What it is — in plain English

Imagine our Earth is like a giant, spinning ball, and around it, we have different "lanes" or "highways" where satellites can travel. These lanes aren't just random; they are specific paths called **orbits**, and the "orbit type" simply describes the characteristics of that lane.

Just like different types of cars use different roads – a city car uses local streets, while a semi-truck uses highways – different satellites need different types of orbits to do their specific jobs. Some satellites need to stay close to Earth to take detailed pictures, while others need to be very far away to provide constant internet across a whole continent.

So, an "orbit type" is a way of categorizing these satellite highways based on how high they are, how fast satellites travel on them, and what angle they take relative to the Earth's equator. Each type has unique properties that make it perfect for certain missions, like taking photos, providing navigation, or broadcasting TV signals.

In this lesson, we'll explore the most common and important of these "lanes": Low Earth Orbit (LEO), Medium Earth Orbit (MEO), Geostationary Orbit (GEO), Highly Elliptical Orbit (HEO), Sun-Synchronous Orbit (SSO), and a special type of HEO called Molniya.

## 2. Why it matters — real-world applications

Understanding orbit types is fundamental to space exploration and satellite technology because the choice of orbit dictates nearly every aspect of a mission, from the launch vehicle required to the satellite's design, power consumption, and operational lifespan.

1.  **Global Communication & Internet:**
    *   **Geostationary Orbit (GEO):** Satellites like those from **Intelsat** or **SES** operate in GEO to provide continuous, wide-area coverage for traditional television broadcasting, fixed satellite internet, and long-distance phone calls. Because they appear stationary from the ground, a single ground antenna can maintain a constant link.
    *   **Low Earth Orbit (LEO):** Newer constellations like **Starlink (SpaceX)** and **OneWeb** use thousands of LEO satellites to provide global broadband internet with much lower latency than GEO satellites. Their proximity to Earth means signals travel shorter distances, making them ideal for interactive applications.

2.  **Navigation Systems:**
    *   **Medium Earth Orbit (MEO):** The Global Positioning System (GPS) operated by the **United States Space Force**, as well as Europe's **Galileo** and Russia's **GLONASS** systems, all rely on MEO satellites. The specific altitude and inclination of MEO orbits allow a relatively small constellation of satellites (typically 20-30) to ensure that at least four satellites are visible from almost any point on Earth at any given time, which is crucial for accurate positioning.

3.  **Earth Observation & Remote Sensing:**
    *   **Low Earth Orbit (LEO) & Sun-Synchronous Orbit (SSO):** Satellites such as the **Landsat** series (NASA/USGS), **Sentinel** missions (ESA), and commercial imaging satellites (e.g., **Planet Labs**, **Maxar Technologies**) primarily use LEO, often specifically SSO. SSO is critical because it allows these satellites to pass over the same spot on Earth at roughly the same local time each day, ensuring consistent lighting conditions for imaging. This consistency is vital for monitoring changes over time, such as deforestation, urban growth, or crop health.

4.  **Weather Forecasting & Climate Monitoring:**
    *   **Geostationary Orbit (GEO):** Weather satellites like **GOES (NOAA)** provide continuous, real-time imagery of large regions of Earth from a fixed vantage point, allowing meteorologists to track storms, hurricanes, and weather patterns as they develop.
    *   **LEO (often polar):** Other weather and climate satellites, like those in the **JPSS (NOAA/NASA)** series, use LEO to collect global atmospheric data, temperature profiles, and sea-surface temperatures, which are fed into numerical weather prediction models.

5.  **High-Latitude Communication:**
    *   **Highly Elliptical Orbit (HEO) - Molniya Type:** For countries with significant landmasses at high northern or southern latitudes (like Russia and Canada), GEO satellites are not effective because they are too low on the horizon. The specialized **Molniya orbit**, a type of HEO, allows satellites to spend a significant portion of their orbital period high over these regions, providing crucial communication links for military, government, and civilian use where GEO coverage is poor.

In essence, the selection of an orbit type is a fundamental engineering decision driven by the mission's objectives, directly impacting the capabilities, cost, and complexity of any space endeavor.

## 3. Prerequisites — what you must know first

Before diving deep into the specifics of orbit types, a solid understanding of the foundational principles of orbital mechanics is essential. If any of these concepts are unfamiliar, pause and review them thoroughly.

*   **Newton's Law of Universal Gravitation:** The fundamental law describing the attractive force between any two masses, $F = G \frac{m_1 m_2}{r^2}$, where $G$ is the gravitational constant, $m_1$ and $m_2$ are the masses, and $r$ is the distance between their centers. This force is what keeps satellites in orbit.
*   **Centripetal Force:** The force required to keep an object moving in a circular path, directed towards the center of the circle, $F_c = \frac{mv^2}{r}$. For a satellite in orbit, the gravitational force provides this centripetal force.
*   **Orbital Velocity:** The speed at which a satellite must travel to maintain a specific orbit. For a circular orbit, this velocity is $v = \sqrt{\frac{\mu}{r}}$, where $\mu = GM$ is the standard gravitational parameter of the central body (Earth).
*   **Orbital Period ($T$):** The time it takes for a satellite to complete one full revolution around the central body. For a circular orbit, $T = \frac{2\pi r}{v}$. For elliptical orbits, Kepler's Third Law states $T = 2\pi\sqrt{\frac{a^3}{\mu}}$, where $a$ is the semi-major axis.
*   **Orbital Altitude ($h$):** The height of a satellite above the surface of the central body. It's crucial to distinguish this from orbital radius ($r$), which is the distance from the center of the central body ($r = R_E + h$, where $R_E$ is the radius of Earth).
*   **Orbital Inclination ($i$):** The angle between the orbital plane of a satellite and the equatorial plane of the central body. An inclination of $0^\circ$ means the satellite orbits directly over the equator, while $90^\circ$ means it passes over the poles.
*   **Orbital Eccentricity ($e$):** A measure of how "stretched out" or non-circular an orbit is. An eccentricity of $e=0$ indicates a perfect circle, while $0 < e < 1$ indicates an ellipse. Higher eccentricity means a more elongated ellipse.
*   **Apogee and Perigee:** For an elliptical orbit around Earth, **Apogee** is the point in the orbit farthest from Earth, and **Perigee** is the point closest to Earth. For orbits around the Sun, these are called Aphelion and Perihelion, respectively.
*   **Kepler's Laws of Planetary Motion:** Especially the Third Law, which relates the orbital period to the semi-major axis of the orbit. Also, the First Law (orbits are ellipses) and Second Law (equal areas in equal times) are important for understanding elliptical orbits.
*   **Standard Gravitational Parameter ($\mu$):** For Earth, $\mu = GM_E \approx 3.986 \times 10^{14} \text{ m}^3/\text{s}^2$. This constant simplifies calculations by combining the gravitational constant $G$ and the mass of the Earth $M_E$.
*   **Earth's Oblateness ($J_2$ effect):** The Earth is not a perfect sphere; it bulges at the equator. This bulge creates a small, non-uniform gravitational perturbation that causes orbital planes to precess (rotate), particularly for non-equatorial orbits. This effect is crucial for understanding Sun-Synchronous and Molniya orbits.
*   **Reference Frames:** Understanding the difference between an inertial (non-rotating) frame of reference and a rotating frame (like one fixed to the Earth's surface) is essential for grasping concepts like geosynchronous and geostationary orbits.

## 4. The core idea — step by step

The core idea behind orbit types is that specific combinations of orbital altitude, inclination, and eccentricity lead to distinct operational characteristics, making them suitable for different mission objectives. We'll break down the most common types.

### Step 1: The Fundamental Orbital Parameters

*   **Plain English:** Every orbit can be described by a few key numbers: how high it is, how round or stretched out it is, and what angle it makes with Earth's equator. These numbers define its "type."
*   **Concrete Example:** Imagine two race tracks around a stadium. One is a perfect circle, close to the stands. The other is a long oval, much further away, and tilted. These differences dictate how fast a car can go and what parts of the stadium it passes over.
*   **Formal/Mathematical Version:** An orbit is fully described by six **orbital elements**. For our purposes, the most relevant are:
    *   **Semi-major axis ($a$):** For a circular orbit, this is simply the radius $r$. For an elliptical orbit, it's half the longest diameter of the ellipse. It primarily determines the orbital period and energy.
    *   **Eccentricity ($e$):** Describes the shape of the orbit. $e=0$ for a circle, $0 < e < 1$ for an ellipse.
    *   **Inclination ($i$):** The angle between the orbital plane and the Earth's equatorial plane.
    *   **Altitude ($h$):** The height above the Earth's surface. Note that orbital radius $r = a$ (for circular) or $r_{avg} = a$ (for elliptical) is measured from the center of the Earth, so $h = r - R_E$, where $R_E \approx 6378 \text{ km}$ is Earth's mean equatorial radius.
*   **What could go wrong:** Confusing orbital radius ($r$) with orbital altitude ($h$). Always remember $r = R_E + h$. A common mistake is to use altitude directly in formulas that require orbital radius.

### Step 2: Low Earth Orbit (LEO)

*   **Plain English:** These are the "city streets" of space. Satellites in LEO are relatively close to Earth, so they orbit very quickly. They're great for getting detailed views of the Earth or for things that need low communication delay.
*   **Concrete Example:** The International Space Station (ISS) is in LEO. When you see it streak across the night sky, it's moving fast because it's so close to Earth.
*   **Formal/Mathematical Version:**
    *   **Altitude ($h$):** Typically $160 \text{ km}$ to $2,000 \text{ km}$ above Earth's surface.
    *   **Orbital Period ($T$):** Approximately $90 \text{ minutes}$ to $120 \text{ minutes}$. This means a satellite in LEO completes many orbits per day.
    *   **Inclination ($i$):** Can vary widely, from near-equatorial ($0^\circ$) to polar ($90^\circ$).
    *   **Eccentricity ($e$):** Usually low, close to circular ($e \approx 0$).
    *   **Key Characteristics:**
        *   **High Resolution:** Close proximity allows for detailed imaging.
        *   **Low Latency:** Shorter signal travel time for communications.
        *   **Atmospheric Drag:** Even at $160 \text{ km}$, there's residual atmosphere, causing drag. Satellites require periodic re-boosts to maintain orbit.
        *   **Short Lifespan (unmaintained):** Without re-boosts, drag causes LEO satellites to re-enter Earth's atmosphere relatively quickly.
        *   **Small Footprint:** Each satellite covers a small area, requiring constellations for continuous global coverage.
        *   **High Delta-V for Maneuvers:** Requires significant energy to change inclination or altitude.
*   **What could go wrong:** Forgetting that atmospheric drag is a significant factor in LEO. Satellites here are constantly fighting against the thin wisps of atmosphere, which means they need fuel for station-keeping or will eventually fall back to Earth.

### Step 3: Medium Earth Orbit (MEO)

*   **Plain English:** MEO is the "regional highway." It's higher than LEO but not as high as GEO. Satellites here move slower than LEO but faster than GEO, and they cover a wider area than LEO. It's often used for navigation systems.
*   **Concrete Example:** The GPS satellites are in MEO. They're high enough that a few of them can cover a large part of the Earth, allowing your phone to pinpoint your location.
*   **Formal/Mathematical Version:**
    *   **Altitude ($h$):** Ranges from $2,000 \text{ km}$ up to just below geostationary altitude, $35,786 \text{ km}$.
    *   **Orbital Period ($T$):** Typically $2 \text{ hours}$ to $24 \text{ hours}$. GPS satellites, for example, have a period of approximately $12 \text{ hours}$.
    *   **Inclination ($i$):** Varies, but often moderate to high (e.g., GPS uses $55^\circ$ inclination).
    *   **Eccentricity ($e$):** Usually low, close to circular ($e \approx 0$).
    *   **Key Characteristics:**
        *   **Larger Footprint:** Each satellite covers a larger area than LEO.
        *   **Less Drag:** Negligible atmospheric drag compared to LEO, leading to longer operational lifespans.
        *   **Intermediate Latency:** Better than GEO, worse than LEO.
        *   **Ideal for Navigation:** The specific altitudes and periods allow for constellations that provide continuous global coverage with good geometry for trilateration.
*   **What could go wrong:** Thinking MEO is a single, specific altitude. It's a broad range of altitudes between LEO and GEO, each with its own specific period and characteristics.

### Step 4: Geostationary/Geosynchronous Orbit (GEO/GSO)

*   **Plain English:** This is the "fixed parking spot" in space. A satellite in this orbit appears to hover over the same spot on Earth's equator all the time. This is perfect for broadcasting TV or providing constant communication to a region.
*   **Concrete Example:** Your satellite TV dish points to a specific spot in the sky because the satellite it communicates with is in GEO, staying "fixed" relative to your location.
*   **Formal/Mathematical Version:**
    *   **Geosynchronous Orbit (GSO):** Any orbit with an orbital period exactly equal to Earth's sidereal rotation period ($T_{sidereal} \approx 23 \text{ hours } 56 \text{ minutes } 4 \text{ seconds}$).
        *   **Altitude ($h$):** Approximately $35,786 \text{ km}$ above the equator. The corresponding orbital radius $r_{GSO} = R_E + h \approx 6378 \text{ km} + 35786 \text{ km} = 42164 \text{ km}$.
        *   **Eccentricity ($e$):** Can be non-zero (elliptical), leading to the satellite drifting north/south and east/west relative to a fixed point on Earth.
        *   **Inclination ($i$):** Can be non-zero. If $i \neq 0^\circ$, the satellite will trace a figure-eight pattern in the sky from a ground observer's perspective.
    *   **Geostationary Orbit (GEO):** A special type of GSO.
        *   **Altitude ($h$):** Exactly $35,786 \text{ km}$.
        *   **Eccentricity ($e$):** Must be $e \approx 0$ (nearly perfectly circular).
        *   **Inclination ($i$):** Must be $i \approx 0^\circ$ (directly above the equator).
        *   **Key Characteristics:**
            *   **Appears Stationary:** From the ground, it seems to hover over a fixed point on the equator.
            *   **Constant Coverage:** Provides continuous coverage to about 42% of Earth's surface.
            *   **High Latency:** Due to the large distance, signal travel time is significant ($\approx 250 \text{ ms}$ one way).
            *   **Crowded Orbit:** The GEO belt is a finite resource, leading to strict international regulations for satellite placement.
*   **What could go wrong:** Confusing GSO and GEO. All GEOs are GSOs, but not all GSOs are GEOs. GSO simply means the period matches Earth's rotation; GEO adds the requirements of circularity and equatorial inclination to make it appear truly stationary.

### Step 5: Highly Elliptical Orbit (HEO)

*   **Plain English:** This is the "slingshot" orbit. Satellites in HEO follow a very stretched-out path, spending most of their time very far from Earth (at apogee) and then swinging quickly past Earth (at perigee). This is useful for spending a long time over specific regions, especially at high latitudes.
*   **Concrete Example:** Think of a swing. It moves fastest at the bottom (perigee) and slows down as it reaches its highest point (apogee), spending more time there.
*   **Formal/Mathematical Version:**
    *   **Eccentricity ($e$):** High eccentricity, typically $e > 0.6$.
    *   **Apogee ($r_a$):** Very high, often in MEO or even GEO ranges.
    *   **Perigee ($r_p$):** Relatively low, often in LEO range.
    *   **Orbital Period ($T$):** Can vary widely, from a few hours to 24 hours or more.
    *   **Inclination ($i$):** Can vary, but often high for specific applications (e.g., Molniya).
    *   **Key Characteristics:**
        *   **Long Dwell Time at Apogee:** Due to Kepler's Second Law, the satellite moves slowest at apogee, maximizing coverage time over a specific region.
        *   **Varying Altitude and Speed:** Significant changes in speed and altitude throughout the orbit.
        *   **Good for High Latitudes:** When apogee is placed over high northern or southern latitudes, it provides excellent coverage for those regions, where GEO satellites are ineffective.
*   **What could go wrong:** Assuming all HEOs are the same. HEO is a broad category; specific HEOs (like Molniya) have very particular parameters for their intended mission.

### Step 6: Sun-Synchronous Orbit (SSO)

*   **Plain English:** This is the "consistent lighting" orbit. A satellite in SSO passes over any given spot on Earth at roughly the same local solar time every day. This is incredibly useful for Earth observation because it means the Sun's angle on the ground is always similar, allowing for consistent lighting conditions in images.
*   **Concrete Example:** Imagine a photographer always wanting to take pictures of a specific building at 10 AM every day. An SSO satellite effectively does this from space, ensuring shadows are consistent and comparisons over time are accurate.
*   **Formal/Mathematical Version:**
    *   **Mechanism:** SSO is achieved by carefully selecting the orbit's altitude and inclination such that the Earth's oblateness (the $J_2$ effect) causes the orbital plane to precess (rotate) eastward at a rate of approximately $0.9856^\circ$ per day. This rate matches the Earth's average orbital motion around the Sun.
    *   **Altitude ($h$):** Typically LEO altitudes, $600 \text{ km}$ to $1,000 \text{ km}$.
    *   **Inclination ($i$):** High inclination, usually between $97^\circ$ and $100^\circ$ (retrograde, meaning it orbits slightly against Earth's rotation to achieve the eastward precession).
    *   **Eccentricity ($e$):** Usually low, close to circular.
    *   **Key Characteristics:**
        *   **Constant Illumination Angle:** Crucial for remote sensing, allowing for consistent image comparison over time.
        *   **Global Coverage:** Often near-polar, providing coverage of most of the Earth's surface over several days.
        *   **Predictable Overpass Times:** The satellite passes over a given latitude at the same local mean solar time each day.
    *   **Nodal Precession Rate ($\dot{\Omega}$):** The rate at which the orbital plane rotates. For SSO, $\dot{\Omega} \approx 0.9856^\circ/\text{day}$ (eastward). The formula for nodal precession due to $J_2$ is:
        $$ \dot{\Omega} = -\frac{3}{2} J_2 \left(\frac{R_E}{a}\right)^2 \sqrt{\frac{\mu}{a^3}} \cos i $$
        where $J_2$ is the Earth's oblateness coefficient ($\approx 1.0826 \times 10^{-3}$), $R_E$ is Earth's mean radius, $a$ is the semi-major axis, $\mu$ is Earth's gravitational parameter, and $i$ is the inclination. The negative sign indicates westward precession for prograde orbits ($i < 90^\circ$) and eastward precession for retrograde orbits ($i > 90^\circ$). For SSO, we need eastward precession, so $i$ must be greater than $90^\circ$.
*   **What could go wrong:** Believing "sun-synchronous" means the satellite is stationary relative to the Sun. It means the orbital plane's orientation relative to the Sun is maintained, ensuring consistent lighting, not that the satellite itself is fixed with respect to the Sun.

### Step 7: Molniya Orbit

*   **Plain English:** A specialized type of HEO, named after the Russian Molniya communication satellites. It's designed to provide communication coverage over high northern (or southern) latitudes for extended periods. It's like a highly elongated figure-eight that spends most of its time high over the northern hemisphere.
*   **Concrete Example:** Russian communication satellites use this to serve vast areas of Russia and other northern countries, where GEO satellites are too low on the horizon to be effective.
*   **Formal/Mathematical Version:**
    *   **Eccentricity ($e$):** High, typically $e \approx 0.7$ to $0.75$.
    *   **Inclination ($i$):** Very specific, usually $63.4^\circ$ or $116.6^\circ$. This "critical inclination" is chosen because it causes the argument of perigee to remain nearly constant, meaning the perigee (and thus apogee) doesn't drift over time due to the $J_2$ effect. If $i$ were different, the apogee would drift, making the orbit unstable for its intended purpose.
    *   **Orbital Period ($T$):** Typically $12 \text{ hours}$ (or sometimes $24 \text{ hours}$), allowing the satellite to pass over the target region twice a day (or once a day for $24 \text{ hr}$ period).
    *   **Apogee ($h_a$):** Very high, often up to $40,000 \text{ km}$.
    *   **Perigee ($h_p$):** Relatively low, typically $500 \text{ km}$ to $1,500 \text{ km}$.
    *   **Key Characteristics:**
        *   **Long Dwell Time:** Spends a significant portion of its 12-hour period at apogee over the target high-latitude region.
        *   **Figure-Eight Ground Track:** From Earth, it traces a figure-eight pattern, with the top loop centered over the high-latitude region.
        *   **Critical Inclination:** The $63.4^\circ$ or $116.6^\circ$ inclination stabilizes the argument of perigee, preventing it from rotating due to Earth's oblateness. This is given by the condition $\cos^2 i = 1/5$, which yields $i \approx 63.43^\circ$ or $116.57^\circ$.
*   **What could go wrong:** Forgetting the critical inclination ($63.4^\circ$) is the defining characteristic that makes a Molniya orbit stable and useful for its purpose. Without it, the apogee would drift, and the satellite wouldn't reliably cover the desired region.

## 5. Worked examples — multiple, with every step shown

We'll use the following constants for Earth:
*   Earth's mean equatorial radius ($R_E$): $6378 \text{ km}$
*   Standard gravitational parameter of Earth ($\mu$): $3.986 \times 10^{14} \text{ m}^3/\text{s}^2$
*   Earth's sidereal rotation period ($T_{sidereal}$): $23 \text{ hours } 56 \text{ minutes } 4 \text{ seconds} \approx 86164 \text{ seconds}$
*   Earth's oblateness coefficient ($J_2$): $1.0826 \times 10^{-3}$

---

### Example 1: LEO Satellite Orbital Period

**Problem:** A satellite is in a circular Low Earth Orbit (LEO) at an altitude of $500 \text{ km}$ above Earth's surface. Calculate its orbital period in minutes.

**Given:**
*   Altitude ($h$) = $500 \text{ km}$
*   Earth's radius ($R_E$) = $6378 \text{ km}$
*   Earth's gravitational parameter ($\mu$) = $3.986 \times 10^{14} \text{ m}^3/\text{s}^2$

**Wanted:** Orbital Period ($T$) in minutes.

**Solution:**

**Step 1: Convert altitude to orbital radius and ensure consistent units.**
The orbital radius ($r$) is the distance from the center of the Earth to the satellite.
$$ r = R_E + h $$
$$ r = 6378 \text{ km} + 500 \text{ km} $$
$$ r = 6878 \text{ km} $$
Now, convert kilometers to meters for consistency with $\mu$:
$$ r = 6878 \times 10^3 \text{ m} $$
*Explanation: The gravitational parameter $\mu$ is in $\text{m}^3/\text{s}^2$, so all distances must be in meters.*

**Step 2: Use Kepler's Third Law for the orbital period.**
For a circular orbit, the semi-major axis ($a$) is equal to the orbital radius ($r$).
$$ T = 2\pi\sqrt{\frac{a^3}{\mu}} $$
Substitute $a = r$:
$$ T = 2\pi\sqrt{\frac{r^3}{\mu}} $$
*Explanation: This fundamental equation relates the orbital period to the size of the orbit and the gravitational pull of the central body. It's derived from equating gravitational force to centripetal force.*

**Step 3: Plug in the values and calculate the period in seconds.**
$$ T = 2\pi\sqrt{\frac{(6878 \times 10^3 \text{ m})^3}{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}} $$
First, calculate $r^3$:
$$ (6878 \times 10^3)^3 = (6.878 \times 10^6)^3 = 3.256 \times 10^{20} \text{ m}^3 $$
Now, substitute back into the period equation:
$$ T = 2\pi\sqrt{\frac{3.256 \times 10^{20} \text{ m}^3}{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}} $$
$$ T = 2\pi\sqrt{817094830 \text{ s}^2} $$
$$ T = 2\pi \times 285.85 \text{ s} $$
$$ T = 1796.0 \text{ s} $$
*Explanation: Perform the calculations step-by-step to avoid errors, keeping track of units. The units cancel out to leave seconds, which is correct for a period.*

**Step 4: Convert the period from seconds to minutes.**
$$ T_{minutes} = \frac{1796.0 \text{ s}}{60 \text{ s/minute}} $$
$$ T_{minutes} = 29.93 \text{ minutes} $$

**Final Answer:**
The orbital period of the LEO satellite is approximately **29.93 minutes**.

---
**Reflection:** This example highlights the incredibly fast orbital periods in LEO. A satellite at $500 \text{ km}$ altitude takes less than 30 minutes to circle the Earth, meaning it completes many orbits in a day. The trickiest part is ensuring all units are consistent (meters and seconds) before calculation and converting to the desired final unit.

---

### Example 2: Geostationary Orbit (GEO) Altitude

**Problem:** Determine the exact altitude above Earth's surface required for a satellite to be in a geostationary orbit.

**Given:**
*   Earth's gravitational parameter ($\mu$) = $3.986 \times 10^{14} \text{ m}^3/\text{s}^2$
*   Earth's sidereal rotation period ($T_{sidereal}$) = $86164 \text{ seconds}$
*   Earth's radius ($R_E$) = $6378 \text{ km}$

**Wanted:** Geostationary altitude ($h_{GEO}$) in kilometers.

**Solution:**

**Step 1: Understand the condition for geostationary orbit.**
A geostationary satellite has an orbital period ($T$) exactly equal to Earth's sidereal rotation period ($T_{sidereal}$).
$$ T = T_{sidereal} = 86164 \text{ s} $$
*Explanation: For a satellite to appear stationary relative to a point on Earth, it must orbit at the same rate as the Earth rotates, and its orbit must be circular and in the equatorial plane.*

**Step 2: Use Kepler's Third Law to find the orbital radius.**
We have the period $T$ and $\mu$, and we want to find the orbital radius $r_{GEO}$ (which is also the semi-major axis $a$ for a circular orbit).
$$ T = 2\pi\sqrt{\frac{r_{GEO}^3}{\mu}} $$
Rearrange the formula to solve for $r_{GEO}$:
$$ \frac{T}{2\pi} = \sqrt{\frac{r_{GEO}^3}{\mu}} $$
Square both sides:
$$ \left(\frac{T}{2\pi}\right)^2 = \frac{r_{GEO}^3}{\mu} $$
Multiply by $\mu$:
$$ r_{GEO}^3 = \mu \left(\frac{T}{2\pi}\right)^2 $$
Take the cube root:
$$ r_{GEO} = \left(\frac{\mu T^2}{4\pi^2}\right)^{1/3} $$
*Explanation: This is the algebraic rearrangement of Kepler's Third Law to solve for the orbital radius (or semi-major axis) given the period and gravitational parameter.*

**Step 3: Plug in the values and calculate the orbital radius in meters.**
$$ r_{GEO} = \left(\frac{(3.986 \times 10^{14} \text{ m}^3/\text{s}^2) \times (86164 \text{ s})^2}{4\pi^2}\right)^{1/3} $$
Calculate $T^2$:
$$ (86164)^2 = 7.4242 \times 10^9 \text{ s}^2 $$
Calculate $4\pi^2$:
$$ 4\pi^2 \approx 39.478 $$
Substitute these values:
$$ r_{GEO} = \left(\frac{(3.986 \times 10^{14}) \times (7.4242 \times 10^9)}{39.478}\right)^{1/3} $$
$$ r_{GEO} = \left(\frac{2.959 \times 10^{24}}{39.478}\right)^{1/3} $$
$$ r_{GEO} = (7.496 \times 10^{22} \text{ m}^3)^{1/3} $$
$$ r_{GEO} = 42164000 \text{ m} $$
*Explanation: Careful calculation, ensuring units are correct. The final unit for $r_{GEO}$ will be meters.*

**Step 4: Convert the orbital radius to altitude above Earth's surface and convert to kilometers.**
$$ h_{GEO} = r_{GEO} - R_E $$
First, convert $R_E$ to meters: $R_E = 6378 \times 10^3 \text{ m}$.
$$ h_{GEO} = 42164000 \text{ m} - 6378000 \text{ m} $$
$$ h_{GEO} = 35786000 \text{ m} $$
Now, convert meters to kilometers:
$$ h_{GEO} = \frac{35786000 \text{ m}}{1000 \text{ m/km}} $$
$$ h_{GEO} = 35786 \text{ km} $$

**Final Answer:**
The altitude required for a geostationary orbit is approximately **35,786 km**.

---
**Reflection:** This calculation is a cornerstone of satellite communications. The exact value of $35,786 \text{ km}$ (or $22,236 \text{ miles}$) is often memorized, but it's vital to understand its derivation from fundamental physics. The key challenge is the careful algebraic manipulation and ensuring units are consistent throughout.

---

### Example 3: Sun-Synchronous Orbit (SSO) Inclination (Qualitative/Semi-Quantitative)

**Problem:** Explain the principle behind a Sun-Synchronous Orbit (SSO) and qualitatively describe how the inclination is chosen to achieve it.

**Given:**
*   Earth's oblateness coefficient ($J_2$) = $1.0826 \times 10^{-3}$
*   Earth's radius ($R_E$) = $6378 \text{ km}$
*   Gravitational parameter ($\mu$) = $3.986 \times 10^{14} \text{ m}^3/\text{s}^2$
*   Target nodal precession rate ($\dot{\Omega}_{target}$) = Earth's orbital rate around the Sun, approximately $0.9856^\circ/\text{day}$.

**Wanted:** Qualitative explanation of SSO and how inclination is chosen using the nodal precession formula.

**Solution:**

**Step 1: Understand the goal of Sun-Synchronous Orbit.**
The primary goal of an SSO is to maintain a constant relationship between the orbital plane and the Sun's direction. This means the satellite passes over any given latitude at the same local solar time each day. This ensures consistent lighting conditions for Earth observation, remote sensing, and reconnaissance missions.
*Explanation: Imagine taking a photo of a tree every day at noon. The lighting would be consistent. SSO tries to achieve this consistency from space.*

**Step 2: Identify the mechanism: Nodal Precession due to Earth's Oblateness.**
The Earth is not a perfect sphere; it bulges at the equator. This equatorial bulge creates a perturbation on a satellite's orbit, causing its orbital plane to slowly rotate (precess) around the Earth's polar axis. This phenomenon is called **nodal precession**. The rate of this precession ($\dot{\Omega}$) depends on the satellite's altitude (semi-major axis) and inclination.
*Explanation: The Earth's bulge pulls on the satellite differently depending on its position, causing a torque that rotates the orbital plane. This is a crucial $J_2$ effect in astrodynamics.*

**Step 3: Relate nodal precession to Earth's motion around the Sun.**
For an orbit to be Sun-synchronous, its orbital plane must precess eastward at the same rate that the Earth-Sun line rotates. The Earth orbits the Sun approximately $360^\circ$ in $365.25$ days, which means an average rate of:
$$ \dot{\Omega}_{target} = \frac{360^\circ}{365.25 \text{ days}} \approx 0.9856^\circ/\text{day} \text{ (eastward)} $$
*Explanation: If the orbital plane rotates eastward at the same rate as the Earth moves around the Sun, the angle between the orbital plane and the Sun's direction remains constant.*

**Step 4: Use the nodal precession formula to determine the required inclination.**
The nodal precession rate due to Earth's $J_2$ effect is given by:
$$ \dot{\Omega} = -\frac{3}{2} J_2 \left(\frac{R_E}{a}\right)^2 \sqrt{\frac{\mu}{a^3}} \cos i $$
Let's analyze this formula:
*   The negative sign indicates that for prograde orbits ($i < 90^\circ$), the precession is westward. For retrograde orbits ($i > 90^\circ$), $\cos i$ is negative, making $\dot{\Omega}$ positive, indicating eastward precession.
*   For SSO, we need an **eastward** precession, so the inclination ($i$) must be **retrograde** (i.e., $i > 90^\circ$).
*   The rate of precession depends on the semi-major axis ($a$) and the inclination ($i$). For a given altitude (and thus $a$), we can choose the inclination $i$ to achieve the desired $\dot{\Omega}_{target}$.

Let's consider a typical SSO altitude, say $h = 800 \text{ km}$.
$$ a = R_E + h = 6378 \text{ km} + 800 \text{ km} = 7178 \text{ km} = 7.178 \times 10^6 \text{ m} $$
We want $\dot{\Omega} = 0.9856^\circ/\text{day}$. Convert this to radians per second:
$$ \dot{\Omega}_{target} = 0.9856 \frac{\text{deg}}{\text{day}} \times \frac{\pi \text{ rad}}{180 \text{ deg}} \times \frac{1 \text{ day}}{86400 \text{ s}} \approx 1.991 \times 10^{-7} \text{ rad/s} $$
Now, rearrange the formula to solve for $\cos i$:
$$ \cos i = -\frac{2 a^{7/2} \dot{\Omega}}{3 J_2 R_E^2 \sqrt{\mu}} $$
Substitute the values:
$$ \cos i = -\frac{2 (7.178 \times 10^6 \text{ m})^{7/2} (1.991 \times 10^{-7} \text{ rad/s})}{3 (1.0826 \times 10^{-3}) (6.378 \times 10^6 \text{ m})^2 \sqrt{3.986 \times 10^{14} \text{ m}^3/\text{s}^2}} $$
This calculation is complex, but the result for typical SSO altitudes ($600 \text{ km}$ to $1000 \text{ km}$) leads to inclinations $i$ in the range of $97^\circ$ to $100^\circ$. For example, if $a = 7178 \text{ km}$:
$$ \cos i \approx -0.127 $$
$$ i = \arccos(-0.127) $$
$$ i \approx 97.3^\circ $$

**Final Answer:**
A Sun-Synchronous Orbit is achieved by selecting a specific **retrograde inclination** (typically $97^\circ$ to $100^\circ$) in conjunction with a particular LEO **altitude** (e.g., $600 \text{ km}$ to $1000 \text{ km}$). This combination causes the Earth's equatorial bulge to perturb the orbit, making its orbital plane precess eastward at the same rate as the Earth orbits the Sun ($ \approx 0.9856^\circ/\text{day}$). This ensures the satellite always passes over a given location at the same local solar time, providing consistent lighting for Earth observation.

---
**Reflection:** This example is more conceptual and involves a complex formula. The key takeaway is understanding *why* SSO works: it leverages the Earth's non-spherical shape ($J_2$ effect) to achieve a desired precession rate. The specific inclination (retrograde and typically $97^\circ-100^\circ$) is critical. The calculation itself is involved but demonstrates how the parameters are linked.

---

### Example 4: Molniya Orbit Apogee and Perigee Altitudes

**Problem:** A Molniya orbit has a semi-major axis ($a$) of $26,560 \text{ km}$ and an eccentricity ($e$) of $0.72$. Calculate the apogee and perigee altitudes above Earth's surface.

**Given:**
*   Semi-major axis ($a$) = $26,560 \text{ km}$
*   Eccentricity ($e$) = $0.72$
*   Earth's radius ($R_E$) = $6378 \text{ km}$

**Wanted:** Apogee altitude ($h_a$) and Perigee altitude ($h_p$) in kilometers.

**Solution:**

**Step 1: Calculate the apogee radius ($r_a$) and perigee radius ($r_p$).**
For an elliptical orbit, the distances from the center of the Earth to apogee and perigee are given by:
$$ r_a = a(1 + e) $$
$$ r_p = a(1 - e) $$
*Explanation: These are standard formulas for elliptical orbits, derived from the definition of eccentricity and semi-major axis.*

**Step 2: Plug in the values for $a$ and $e$ to find $r_a$ and $r_p$.**
For apogee radius:
$$ r_a = 26560 \text{ km} \times (1 + 0.72) $$
$$ r_a = 26560 \text{ km} \times 1.72 $$
$$ r_a = 45683.2 \text{ km} $$
For perigee radius:
$$ r_p = 26560 \text{ km} \times (1 - 0.72) $$
$$ r_p = 26560 \text{ km} \times 0.28 $$
$$ r_p = 7436.8 \text{ km} $$
*Explanation: Simple multiplication using the given values. Units remain in kilometers as inputs are in kilometers.*

**Step 3: Convert orbital radii to altitudes above Earth's surface.**
Altitude is the distance from the surface, so we subtract Earth's radius ($R_E$) from the orbital radius.
$$ h_a = r_a - R_E $$
$$ h_p = r_p - R_E $$
*Explanation: This converts the distance from Earth's center to the height above its surface.*

**Step 4: Calculate $h_a$ and $h_p$.**
For apogee altitude:
$$ h_a = 45683.2 \text{ km} - 6378 \text{ km} $$
$$ h_a = 39305.2 \text{ km} $$
For perigee altitude:
$$ h_p = 7436.8 \text{ km} - 6378 \text{ km} $$
$$ h_p = 1058.8 \text{ km} $$

**Final Answer:**
The apogee altitude is approximately **39,305.2 km**, and the perigee altitude is approximately **1,058.8 km**.

---
**Reflection:** This example demonstrates the highly elliptical nature of a Molniya orbit. The apogee is well into the MEO/GEO range, while the perigee is in LEO. This large difference in altitude is what allows for the long dwell time over high latitudes (at apogee) and the quick transit through perigee. The calculation itself is straightforward once the correct formulas for apogee/perigee radii are known.

---

## 6. Common mistakes and traps

1.  **Confusing Altitude with Orbital Radius:** Many formulas in orbital mechanics (e.g., for velocity, period) use the orbital radius ($r$), which is the distance from the *center* of the central body. Students often mistakenly use the altitude ($h$, distance from the *surface*) directly. Remember: $r = R_E + h$.
2.  **Mixing up Geosynchronous (GSO) and Geostationary (GEO):** While closely related, they are not identical. All GEOs are GSOs, but not all GSOs are GEOs. GEO requires $e \approx 0$ (circular) and $i \approx 0^\circ$ (equatorial) in addition to a sidereal period, whereas GSO only requires the sidereal period.
3.  **Ignoring Atmospheric Drag in LEO:** At LEO altitudes (especially below $400 \text{ km}$), even the extremely thin atmosphere creates significant drag. This drag causes orbits to decay, requiring frequent re-boosts or leading to rapid re-entry. Ignoring this effect can lead to incorrect mission planning for LEO satellites.
4.  **Misunderstanding Sun-Synchronous Orbit (SSO):** Students sometimes think "sun-synchronous" means the satellite is stationary relative to the Sun or that it orbits the Sun. Instead, it means the orbital plane precesses to maintain a constant angle with the Earth-Sun line, ensuring consistent local solar time for ground passes.
5.  **Not Appreciating the Critical Inclination of Molniya Orbits:** The $63.4^\circ$ (or $116.6^\circ$) inclination for a Molniya orbit is not arbitrary. It's specifically chosen to prevent the argument of perigee from drifting due to Earth's oblateness, which is crucial for maintaining the desired ground track and high-latitude dwell time.
6.  **Incorrect Units in Calculations:** Orbital mechanics calculations often involve very large or very small numbers. Mixing units (e.g., using kilometers for radius while $\mu$ is in $\text{m}^3/\text{s}^2$) is a very common source of error. Always convert to a consistent system (e.g., SI units: meters, kilograms, seconds) before calculation.

## 7. Textbook-precise explanation

In astrodynamics, an orbit is precisely defined by a set of six Keplerian orbital elements. Orbit types are classifications based on specific ranges or values of these elements, particularly the semi-major axis ($a$), eccentricity ($e$), and inclination ($i$). The standard gravitational parameter ($\mu = GM$) of the central body is also fundamental.

1.  **Low Earth Orbit (LEO):**
    *   **Definition:** An orbit with a semi-major axis ($a$) such that the perigee altitude ($h_p$) is above the significant atmosphere (typically $160 \text{ km}$) and the apogee altitude ($h_a$) is below $2,000 \text{ km}$.
    *   **Characteristics:** $a \approx R_E + (160 \text{ km} \text{ to } 2000 \text{ km})$. Eccentricity ($e$) is typically low ($e \approx 0$). Inclination ($i$) can range from equatorial ($0^\circ$) to polar ($90^\circ$). Orbital periods range from approximately $90 \text{ minutes}$ to $120 \text{ minutes}$. Significant atmospheric drag is present, requiring propulsion for station-keeping.
    *   **Reference:** *Curtis, Howard D. "Orbital Mechanics for Engineering Students." Elsevier, 3rd ed., 2013, §6.2.*

2.  **Medium Earth Orbit (MEO):**
    *   **Definition:** An orbit with a semi-major axis ($a$) such that the perigee altitude ($h_p$) is above $2,000 \text{ km}$ and the apogee altitude ($h_a$) is below the geostationary altitude ($35,786 \text{ km}$).
    *   **Characteristics:** $a \approx R_E + (2000 \text{ km} \text{ to } 35786 \text{ km})$. Eccentricity ($e$) is typically low ($e \approx 0$). Inclination ($i$) is often moderate to high, e.g., $55^\circ$ for GPS. Orbital periods range from approximately $2 \text{ hours}$ to $24 \text{ hours}$. Atmospheric drag is negligible.
    *   **Reference:** *Vallado, David A. "Fundamentals of Astrodynamics and Applications." McGraw-Hill, 4th ed., 2013, §2.2.3.*

3.  **Geosynchronous Orbit (GSO):**
    *   **Definition:** A direct (prograde) orbit around Earth with an orbital period ($T$) precisely equal to Earth's sidereal rotation period ($T_{sidereal} \approx 86164 \text{ s}$). The semi-major axis ($a$) for a GSO is approximately $42,164 \text{ km}$ ($35,786 \text{ km}$ altitude).
    *   **Characteristics:** The satellite's ground track repeats daily. If $e > 0$ or $i > 0^\circ$, the satellite's position relative to a fixed ground point will oscillate (trace a figure-eight or elliptical pattern).
    *   **Reference:** *Bate, Roger R., Mueller, Donald D., and White, Jerry E. "Fundamentals of Astrodynamics." Dover Publications, 1971, §6.3.*

4.  **Geostationary Orbit (GEO):**
    *   **Definition:** A specific type of Geosynchronous Orbit that is circular ($e \approx 0$) and equatorial ($i \approx 0^\circ$).
    *   **Characteristics:** The satellite appears to remain fixed over a single point on the Earth's equator. This requires a semi-major axis of $a \approx 42,164 \text{ km}$ (altitude $h \approx 35,786 \text{ km}$).
    *   **Reference:** *Larson, Wiley J., and Wertz, James R. "Space Mission Analysis and Design." Microcosm Press, 3rd ed., 2005, §10.2.*

5.  **Highly Elliptical Orbit (HEO):**
    *   **Definition:** An orbit characterized by a high eccentricity ($e > 0.6$), resulting in a significant difference between apogee and perigee altitudes.
    *   **Characteristics:** Perigee altitude is typically in LEO, while apogee altitude can extend well into MEO or beyond. Due to Kepler's Second Law, the satellite spends a disproportionately long time near apogee, providing extended coverage ("dwell time") over the region beneath apogee.
    *   **Reference:** *Vallado, David A. "Fundamentals of Astrodynamics and Applications." McGraw-Hill, 4th ed., 2013, §2.2.3.*

6.  **Sun-Synchronous Orbit (SSO):**
    *   **Definition:** An orbit (typically LEO, $h \approx 600 \text{ km}$ to $1,000 \text{ km}$) whose orbital plane precesses eastward at a rate matching the Earth's mean orbital rate around the Sun (approximately $0.9856^\circ/\text{day}$). This precession is achieved by selecting a specific retrograde inclination ($i > 90^\circ$, typically $97^\circ$ to $100^\circ$) to leverage the $J_2$ perturbation effect of Earth's oblateness.
    *   **Characteristics:** Maintains a constant local mean solar time for ground track crossings, ensuring consistent illumination conditions for Earth observation. The nodal precession rate $\dot{\Omega}$ is given by:
        $$ \dot{\Omega} = -\frac{3}{2} J_2 \left(\frac{R_E}{a}\right)^2 \sqrt{\frac{\mu}{a^3}} \cos i $$
        where $J_2 \approx 1.0826 \times 10^{-3}$ is the Earth's second zonal harmonic coefficient.
    *   **Reference:** *Chobotov, Vladimir A. "Orbital Mechanics." AIAA Education Series, 3rd ed., 2002, §4.3.*

7.  **Molniya Orbit:**
    *   **Definition:** A specific type of Highly Elliptical Orbit (HEO) characterized by high eccentricity ($e \approx 0.7 \text{ to } 0.75$), a nominal 12-hour (or 24-hour) period, and a critical inclination of $i = 63.43^\circ$ or $i = 116.57^\circ$.
    *   **Characteristics:** The critical inclination stabilizes the argument of perigee, preventing its long-term drift due to $J_2$ perturbations. This ensures the apogee remains over a desired high-latitude region (e.g., the Northern Hemisphere) for an extended portion of the orbital period, providing prolonged coverage. The ground track typically forms a figure-eight pattern.
    *   **Reference:** *Wertz, James R., and Larson, Wiley J. "Space Mission Analysis and Design." Microcosm Press, 3rd ed., 2005, §10.4.*

## 8. ASCII diagrams

```text
                                                . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                            .                                                           .
                                          .                                                               .
                                        .                                                                   .
                                      .                                                                       .
                                    .                                                                           .
                                  .                                                                               .
                                 .                                                                                 .
                                .                                                                                   .
                               .                                                                                     .
                              .                                                                                       .
                             .                                                                                         .
                            .                                                                                           .
                           .                                                                                             .
                          .                                                                                               .
                         .                                                                                                 .
                        .                                                                                                   .
                       .                                                                                                     .
                      .                                                                                                       .
                     .                                                                                                         .
                    .                                                                                                           .
                   .                                                                                                             .
                  .                                                                                                               .
                 .                                                                                                                 .
                .                                                                                                                   .
               .                                                                                                                     .
              .                                                                                                                       .
             .                                                                                                                         .
            .                                                                                                                           .
           .                                                                                                                             .
          .                                                                                                                               .
         .                                                                                                                                 .
        .                                                                                                                                   .
       .                                                                                                                                     .
      .                                                                                                                                       .
     .                                                                                                                                         .
    .                                                                                                                                           .
   .                                                                                                                                             .
  .                                                                                                                                               .
 .                                                                                                                                                 .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                                                                                   .
.                                                                                             