## What it is
Groundtrack analysis is the study of the path a satellite traces over the surface of a rotating planet. Swath is the width of the area on the surface visible to the satellite's sensors at any given moment. Revisit time is the duration between successive observations of the same point on the ground.

## Why it matters
This is the core of mission design for Earth observation, reconnaissance, and global communication constellations. Designing a system like Starlink to provide continuous global coverage, or a spy satellite to monitor a specific location daily, is fundamentally a problem of optimizing swath and revisit time. Understanding this allows you to determine what a satellite can actually *see* and *how often* it can see it.

## When to study it
You must have a firm grasp of the six classical orbital elements ($a, e, i, \Omega, \omega, \nu$), the two-body problem, and orbital perturbations, specifically the nodal precession caused by Earth's oblateness ($J_2$ effect). You also need to be comfortable with spherical coordinates and the difference between a sidereal day and a solar day. If you don't know why your calculations must use the Earth's sidereal rotation period, you need to review that first.

## How to study it (step by step)
1.  **Derive the Swath Width:** Start with simple geometry. Model the Earth as a sphere of radius $R_E$. Place a satellite at altitude $h$. Given a sensor's half-angle field of view, $\beta$, use trigonometry to find the arc length on the surface it covers.
2.  **Model the Groundtrack Shift:** In a non-rotating frame, the satellite orbit is fixed. Now, add the Earth's rotation. Calculate the amount of longitude, $\Delta\lambda$, the Earth rotates during one satellite orbital period, $P$. This is the primary driver of the groundtrack's westward shift.
3.  **Incorporate Nodal Precession:** Add the $J_2$ perturbation. The orbital plane itself precesses at a rate $\dot{\Omega}$. This adds or subtracts from the Earth's rotation rate. Derive the corrected formula for the longitudinal shift per orbit, accounting for both Earth's rotation $\omega_E$ and nodal precession $\dot{\Omega}$.
4.  **Formulate the Revisit Condition:** A groundtrack repeats when the satellite completes an integer number of orbits, $k$, in the same time it takes for the Earth to rotate through an integer number of days, $d$. This creates a commensurability condition between the satellite's period and the Earth's rotational period.
5.  **Solve for Revisit Time:** For a non-repeating groundtrack, the problem is more complex. Calculate the longitudinal spacing between adjacent groundtracks. The revisit time for a specific point is then related to how many orbits it takes for one of these tracks to fall within the sensor's swath width over the target.

## Key ideas, with intuition
1.  **Relative Motion is Everything:** The groundtrack is not the orbit itself. It's the projection of the orbit onto a surface that is spinning underneath it. The fundamental concept is the relative angular velocity between the satellite's orbital plane and the planet's surface. The satellite is in a race with the Earth's rotation.
    $$ \omega_{rel} = \omega_E - \dot{\Omega} $$
    Here, $\omega_E$ is the Earth's sidereal rotation rate and $\dot{\Omega}$ is the rate of nodal precession. This relative angular velocity determines how quickly the groundtrack shifts.

2.  **Swath Width is a Geometric Trade-off:** The width of the sensor's view on the ground is determined by altitude $h$ and the instrument's field-of-view half-angle $\beta$.
    From the center of the Earth, the angle to the edge of the swath is $\lambda$. By the law of sines in the triangle formed by the Earth's center, the satellite, and the swath edge:
    $$ \frac{\sin \lambda}{R_E+h} = \frac{\sin \beta}{R_E} \implies \lambda = \arcsin\left(\frac{R_E+h}{R_E}\sin\beta\right) $$
    This is incorrect. Let's re-derive. Let $\eta$ be the angle from the satellite's nadir to the swath edge, as seen from the Earth's center. The angle from the satellite between nadir and the swath edge is $\beta$. The angle at the swath edge between the local vertical and the satellite is $\epsilon$.
    $$ \frac{\sin\beta}{R_E} = \frac{\sin(\pi - \epsilon)}{R_E+h} = \frac{\sin\epsilon}{R_E+h} $$
    Also, $\epsilon + \beta + \eta = \pi$. This is getting complicated. Let's use a simpler approach. The angle $\alpha$ is the angle at the satellite between its nadir vector and the line of sight to the horizon. $\sin\alpha = R_E / (R_E+h)$. If our sensor half-angle $\beta < \alpha$, we can see the ground. The angle subtended at the Earth's center, $\eta$, can be found from the nadir angle $\beta$ using the law of sines on the triangle (Earth center, satellite, swath edge):
    $$ \frac{\sin\beta}{R_E} = \frac{\sin(\frac{\pi}{2}+\beta)}{R_E+h} \text{ is incorrect.} $$
    Let's try again. The angle at the satellite is $\beta$. The angle at the swath edge between the local vertical and the line-of-sight is $\epsilon$. The angle at the Earth's center is $\eta$. The sum of angles in the triangle is $\pi$. The angle at the satellite between nadir and the Earth's limb is $\alpha_{lim} = \arcsin(R_E / (R_E+h))$. We must have $\beta < \alpha_{lim}$.
    From the law of sines:
    $$ \frac{R_E}{\sin\beta} = \frac{R_E+h}{\sin(\frac{\pi}{2}+\eta)} \text{ is incorrect.} $$
    Let's use the nadir angle $\lambda$ from the satellite to the point on the surface. The central angle from nadir is $\gamma$.
    $$ R_E \sin\gamma = (R_E+h)\sin\lambda - \text{no, this is also not right.} $$
    Let's be precise. Triangle vertices: Earth Center (C), Satellite (S), Point on Swath Edge (P). Sides: $CS = R_E+h$, $CP = R_E$. Angle at S is $\beta$. Angle at C is $\eta$. Angle at P is $\epsilon$.
    By Law of Sines:
    $$ \frac{\sin\beta}{R_E} = \frac{\sin\epsilon}{R_E+h} $$
    And $\eta + \beta + \epsilon = \pi$. So $\epsilon = \pi - (\eta+\beta)$.
    $$ \frac{\sin\beta}{R_E} = \frac{\sin(\pi - (\eta+\beta))}{R_E+h} = \frac{\sin(\eta+\beta)}{R_E+h} $$
    $$ (R_E+h)\sin\beta = R_E(\sin\eta\cos\beta + \cos\eta\sin\beta) $$
    This is too complex for intuition. Let's simplify. For small angles, the arc length is approximately the straight-line distance. The distance from the satellite to nadir is $h$. The distance from nadir to swath edge is $d \approx h \tan\beta$. This is a flat-Earth approximation.
    The correct intuition is geometric: higher altitude means you can see a wider area, but each pixel in your camera covers more ground (lower resolution). This is a fundamental trade-off in remote sensing.
    The correct formula for the swath width $S_w$ is $S_w = 2 R_E \eta$, where $\eta$ is the half-angle of the swath as seen from the Earth's center. $\eta$ is found by solving $\frac{\sin\beta}{R_E} = \frac{\sin(\pi - (\eta+\beta))}{R_E+h}$.

3.  **Repeating Groundtracks are about Harmonics:** An exactly repeating groundtrack occurs when the satellite's orbital frequency and the planet's effective rotational frequency (including precession) have a rational ratio.
    $$ \frac{P_{nodal}}{T_{sidereal}} = \frac{d}{k} $$
    Where $P_{nodal}$ is the time between successive ascending node crossings, $T_{sidereal}$ is the sidereal rotation period of the Earth, and $d, k$ are integers. This means the satellite completes $k$ orbits in exactly $d$ sidereal days. The groundtrack will then repeat every $d$ days.

## Worked example
**Problem:** A satellite is in a circular, sun-synchronous orbit at an altitude of $h=800$ km. Its imaging sensor has a total field of view of $2\beta = 20^\circ$. What is its swath width and how many days will it take for its groundtrack to repeat?

**Data:**
- Earth Radius: $R_E = 6378$ km
- Earth Gravitational Parameter: $\mu = 398600.44$ km$^3$/s$^2$
- Earth Sidereal Day: $T_E = 86164.1$ s
- $J_2$ coefficient: $J_2 = 1.082 \times 10^{-3}$

**Step 1: Find orbital parameters.**
The orbit is circular, so $a = R_E + h = 6378 + 800 = 7178$ km.
The orbital period is $P = 2\pi\sqrt{\frac{a^3}{\mu}} = 2\pi\sqrt{\frac{7178^3}{398600.44}} = 6046.7$ s.
The mean motion is $n = \sqrt{\frac{\mu}{a^3}} = 0.001039$ rad/s.

**Step 2: Find inclination for sun-synchronous orbit.**
A sun-synchronous orbit requires the nodal precession rate $\dot{\Omega}$ to match the Earth's mean orbital motion around the sun ($\approx 0.9856^\circ$/day).
$$ \dot{\Omega}_{SSO} = \frac{360^\circ}{365.25 \text{ days}} \approx 0.9856 \text{ deg/day} = 1.991 \times 10^{-7} \text{ rad/s} $$
The nodal precession rate due to $J_2$ is:
$$ \dot{\Omega} = -\frac{3}{2} J_2 \left(\frac{R_E}{a}\right)^2 n \cos(i) $$
We set $\dot{\Omega} = \dot{\Omega}_{SSO}$ and solve for $i$:
$$ 1.991 \times 10^{-7} = -\frac{3}{2} (1.082 \times 10^{-3}) \left(\frac{6378}{7178}\right)^2 (0.001039) \cos(i) $$
$$ 1.991 \times 10^{-7} = -1.334 \times 10^{-6} \cos(i) $$
$$ \cos(i) = -0.1492 \implies i = \arccos(-0.1492) = 98.58^\circ $$
This is a retrograde orbit, as expected for sun-synchronous missions.

**Step 3: Calculate Swath Width.**
Sensor half-angle $\beta = 10^\circ = 0.1745$ rad. We need to find the Earth central angle $\eta$.
Using the derived sine law relation: $\frac{\sin(\eta+\beta)}{R_E+h} = \frac{\sin\beta}{R_E}$
$$ \sin(\eta+10^\circ) = \frac{R_E+h}{R_E}\sin(10^\circ) = \frac{7178}{6378}\sin(10^\circ) = 1.125 \times 0.1736 = 0.1954 $$
$$ \eta+10^\circ = \arcsin(0.1954) = 11.27^\circ $$
$$ \eta = 1.27^\circ $$
The total swath width is $S_w = 2 \eta R_E = 2 \times (1.27^\circ \times \frac{\pi}{180^\circ}) \times 6378 \text{ km} \approx 282.5$ km.

**Step 4: Calculate Groundtrack Repeat Cycle.**
The Earth's sidereal rotation rate is $\omega_E = \frac{2\pi}{T_E} = \frac{2\pi}{86164.1} = 7.292 \times 10^{-5}$ rad/s.
The longitudinal shift per orbit is $\Delta\lambda = P(\omega_E - \dot{\Omega})$.
$$ \Delta\lambda = 6046.7 \text{ s} \times (7.292 \times 10^{-5} - 1.991 \times 10^{-7}) \text{ rad/s} = 0.440 \text{ rad} = 25.2^\circ $$
The number of orbits per sidereal day is $N = T_E / P = 86164.1 / 6046.7 \approx 14.25$.
We need to find integers $k$ (orbits) and $d$ (days) such that $k/d \approx 14.25$.
Let's test small integer values for $d$.
If $d=1$, $k=14$. Ratio is 14.
If $d=2$, $k=28.5$.
If $d=3$, $k=42.75$.
If $d=4$, $k=57$. Ratio is $57/4 = 14.25$. This is a perfect match.
So, the satellite completes $k=57$ orbits in exactly $d=4$ sidereal days. The groundtrack repeats every 4 days.

**Reflection:** Each step built on the last. We needed orbital parameters to find the sun-synchronous condition. We needed geometry for the swath. Critically, we needed the orbital period $P$ and the precession rate $\dot{\Omega}$ to calculate the longitudinal shift, which is the key to finding the repeat cycle. The repeat cycle condition is a search for a rational number approximation.

## Diagrams
```text
Diagram 1: Swath Width Geometry

      S (Satellite)
      |\
      | \
      |  \  <-- Line of sight
      |   \
      |    \
      |     \
      |      P (Swath Edge)
      |     /
      |    /
      |   /
      |  /
      | /
  C---N----------
(Earth Center)

Labels:
- C: Earth Center
- S: Satellite at altitude h
- N: Nadir point (directly below S)
- P: Point at the edge of the sensor's swath
- CN = CP = R_E (Earth Radius)
- SN = h (Altitude)
- Angle CSN = 90 degrees (for this simplified view)
- Angle NSP = beta (Sensor half-angle)
- Angle NCP = eta (Earth central half-angle)
- Swath Width = 2 * (Arc length NP) = 2 * R_E * eta

Diagram 2: Groundtrack Longitudinal Shift

        ^ North Pole
        |
        |
       /|\
      / | \  <-- Orbit 1
     /  |  \
 <--/- -|- - \----> Equator
    \   |   /
     \  |  /  <-- Orbit 2 (shifted west)
      \ | /
       \|/
        |

- Orbit 1 crosses the equator at some longitude L_1.
- During one period P, the Earth rotates eastward by angle Delta_Lambda.
- Orbit 2, one period later, crosses the equator at longitude L_2 = L_1 - Delta_Lambda.
- This westward shift creates the spacing between adjacent groundtracks.
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you are a security guard (the satellite) responsible for patrolling a giant, rotating merry-go-round (the Earth). Your flashlight beam is your sensor's **swath**. How often you can check on a specific wooden horse is the **revisit time**. The merry-go-round's rotation constantly moves the horses, so even though you walk a fixed path, the path you trace over the moving floor (**groundtrack**) is a complex spiral. The final twist: a gentle breeze (**$J_2$ precession**) is constantly pushing you slightly sideways, altering your path over the long term.

2.  **Must-Memorize Formulas:**
    *   **Nodal Precession:** $\dot{\Omega} = -\frac{3}{2} J_2 \left(\frac{R_E}{a(1-e^2)}\right)^2 n \cos(i)$
        *   *Why:* This is the engine of sun-synchronous orbits and the crucial long-term correction for groundtracks.
    *   **Longitudinal Shift per Orbit:** $\Delta\lambda = P(\omega_E - \dot{\Omega})$
        *   *Why:* This is the direct result of the "race" between the Earth's rotation and the orbit's precession. It dictates the spacing between tracks.
    *   **Repeat Condition:** $k P \approx d T_E$
        *   *Why:* The heart of revisit analysis. It's a search for integers $k$ (orbits) and $d$ (days) that make the orbital and rotational periods commensurate.

3.  **Spaced Repetition Schedule:** Review these concepts and re-derive the formulas from the story hook at:
    *   1 day (tomorrow)
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget everything, start here:
    *   A satellite's orbit is (mostly) fixed in inertial space.
    *   The Earth rotates underneath it at a rate $\omega_E$.
    *   Therefore, after one orbit of period $P$, the Earth has rotated by an angle $\Delta\lambda_{rot} = \omega_E P$. This is the primary shift.
    *   Refine this: Earth's bulge makes the orbit's plane precess at rate $\dot{\Omega}$. This is a real rotation of the orbit in inertial space. So the *net* shift relative to the Earth is due to the difference in angular rates: $(\omega_E - \dot{\Omega})$. The total shift is this rate multiplied by the period $P$.

## Common mistakes
1.  **Using Solar Day:** Calculating Earth's rotation rate $\omega_E$ using a 24-hour solar day instead of the 23h 56m 4s sidereal day ($T_E = 86164.1$ s). Orbital mechanics happens in an inertial frame, so we must use the rotation period relative to the stars, not the Sun.
2.  **Ignoring $J_2$ Precession:** For short-term analysis (one or two orbits), omitting $\dot{\Omega}$ might be acceptable. For any long-term revisit calculation, it is a critical error, especially for high-inclination LEO orbits where it is significant.
3.  **Confusing Nodal and Anomalistic Period:** When using the repeat condition formula, the period $P$ should technically be the nodal period (time between ascending node crossings), not the Keplerian period, as the groundtrack is defined by its equatorial crossings. For most cases, they are close enough, but for precision work, this matters.
4.  **Flat-Earth Swath Calculation:** Using $S_w \approx 2h \tan(\beta)$ for high altitudes or wide fields of view. This ignores Earth's curvature and will significantly overestimate the swath width.

## Self-check
1.  A satellite in a circular orbit at 500 km altitude has a camera with a total field of view of $40^\circ$. Ignoring atmospheric refraction, what is the width of the swath it can image on the ground?
2.  An equatorial satellite ($i=0^\circ$) is in a circular orbit with a period of 12 hours. If its first ascending node is over longitude $0^\circ$, what is the longitude of its fifth ascending node? (Hint: what is $\dot{\Omega}$ for an equatorial orbit?)
3.  You are tasked to design a mission that requires an exactly repeating groundtrack. The satellite must complete 29 orbits in exactly 2 sidereal days. What is the required semi-major axis of this circular orbit? Does this orbit need to account for $J_2$ effects in its altitude calculation for the groundtrack to repeat perfectly? Why or why not?