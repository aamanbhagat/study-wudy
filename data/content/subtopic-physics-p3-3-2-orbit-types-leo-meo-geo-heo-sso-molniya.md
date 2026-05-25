## What it is
Orbit types are classifications for artificial satellite trajectories around a central body, typically Earth. These classifications are based on key orbital parameters such as altitude (distance from the surface), inclination (angle to the equator), and eccentricity (deviation from a perfect circle). Each type offers a unique combination of ground coverage, orbital period, and viewing geometry.

## Why it matters
Choosing the correct orbit is the most fundamental decision in mission design, dictating what a satellite can do. LEO is essential for high-resolution Earth imaging and constellations like Starlink, GEO is the backbone of global communications and weather forecasting, and specialized orbits like Molniya are critical for persistent coverage of high-latitude regions. Understanding these tradeoffs is non-negotiable for designing spacecraft, planning launches, or analyzing satellite data.

## When to study it
Before tackling this, you must have a firm grasp of the two-body problem and the six classical orbital elements: semi-major axis ($a$), eccentricity ($e$), inclination ($i$), right ascension of the ascending node ($\Omega$), argument of perigee ($\omega$), and true anomaly ($\nu$). Specifically, you should be able to derive and use the Vis-viva equation ($v^2 = \mu(2/r - 1/a)$) and Kepler's Third Law ($T = 2\pi \sqrt{a^3/\mu}$) from first principles. If these terms or equations are unfamiliar, review them first.

## How to study it (step by step)
1.  **Master Altitude and Period.** Start with the simplest discriminator: altitude. Use Kepler's Third Law to calculate the orbital periods for circular orbits at altitudes of 500 km (LEO), 20,000 km (MEO, typical for GPS), and 35,786 km (GEO). Note how drastically the period changes.
2.  **Derive GEO.** From first principles (gravitational force = centripetal force), derive the exact altitude required for an orbit to have a period matching Earth's sidereal rotation period (23 hours, 56 minutes, 4 seconds). This is the most important calculation in this subtopic.
3.  **Introduce Inclination.** Draw Earth with its equatorial plane. Now draw an orbit tilted at an angle $i$ to that plane. Realize that this satellite will only ever pass over latitudes between $+i$ and $-i$. What inclination do you need for global coverage?
4.  **Combine Altitude and Inclination for SSO.** Research the concept of nodal precession due to Earth's oblateness ($J_2$ effect). Understand that for a specific low altitude, there is a unique retrograde inclination (~98°) that makes the orbit's plane precess at the same rate Earth orbits the Sun (~0.986 degrees/day). This creates a Sun-Synchronous Orbit (SSO).
5.  **Introduce Eccentricity for HEO.** Analyze the Vis-viva equation for an elliptical orbit. Note how velocity is maximum at perigee (lowest point) and minimum at apogee (highest point). This "apogee dwell" is the key to Highly Elliptical Orbits (HEO) like the Molniya orbit, which are designed to linger over a specific hemisphere.
6.  **Synthesize.** Create a table with columns: Orbit Type, Altitude Range (km), Period, Inclination, Eccentricity, and Primary Application. Fill it out for LEO, MEO, GEO, HEO (Molniya), and SSO. This will be your master reference.

## Key ideas, with intuition
*   **Altitude is Energy, and Energy sets the Period.** Higher orbits have more total energy (less negative). From the Vis-viva equation, for a given radius $r$, a higher semi-major axis $a$ means lower velocity $v$. A larger path and a slower speed mean a much longer period. This relationship is formalized by Kepler's Third Law:
    $$ T = 2\pi \sqrt{\frac{a^3}{\mu}} $$
    Where $T$ is the period, $a$ is the semi-major axis, and $\mu$ is the gravitational parameter of the central body ($GM$). Higher altitude means larger $a$, which means a much longer $T$.

*   **Geostationary is a "Fixed Point" in the Sky.** To appear stationary from the ground, a satellite must orbit in the same direction as Earth's rotation and have a period that exactly matches Earth's sidereal day. To stay above one point, it must also have an inclination of $0^\circ$ (orbiting over the equator) and an eccentricity of $0$ (a perfect circle). Any deviation from these three conditions will cause it to drift in the sky.

*   **Inclination is a "Latitude Boundary."** A satellite in an orbit with inclination $i$ never flies over a latitude greater than $|i|$. An orbit with $i=28^\circ$ (typical for launches from Cape Canaveral) can see all of Brazil but none of Europe. To see the whole world, including the poles, you need a polar orbit with $i \approx 90^\circ$.

*   **SSO "Freezes" the Sun's Angle.** Earth is not a perfect sphere; it bulges at the equator. This bulge tugs on inclined orbits, causing their orbital plane to rotate (precess) over time. A Sun-Synchronous Orbit is a clever trick where a specific altitude and inclination are chosen so this precession exactly matches the rate at which the Earth orbits the Sun. The result is that the satellite always crosses the equator at the same local solar time (e.g., 10:30 AM), which is invaluable for consistent lighting in Earth observation imagery.

*   **HEO "Loiters" at the Top.** Kepler's Second Law states that an orbit sweeps out equal areas in equal times. For a highly eccentric orbit, this means the satellite must move incredibly fast near its closest point (perigee) and very slowly near its farthest point (apogee). A Molniya orbit exploits this by placing its apogee over the northern hemisphere, allowing it to "dwell" for hours, providing long-duration communications and surveillance coverage to high-latitude regions like Russia.

## Worked example
**Problem:** Calculate the altitude of a Geostationary Earth Orbit (GEO).

**Given:**
*   Earth's gravitational parameter, $\mu = GM \approx 3.986 \times 10^{14} \, \text{m}^3/\text{s}^2$.
*   Earth's sidereal rotation period, $T = 23 \, \text{h} \, 56 \, \text{min} \, 4.09 \, \text{s} \approx 86164.09 \, \text{s}$.
*   Earth's equatorial radius, $R_E \approx 6378 \, \text{km}$.

**Solution:**
1.  **State the principle.** For a stable circular orbit, the gravitational force must provide the necessary centripetal force.
    $$ F_g = F_c $$
    $$ \frac{G M m}{r^2} = \frac{m v^2}{r} $$
    Where $r$ is the orbital radius from the center of the Earth.

2.  **Relate velocity to period.** For a circular orbit, the velocity $v$ is the circumference divided by the period $T$.
    $$ v = \frac{2\pi r}{T} $$

3.  **Substitute and solve for radius.** Substitute the expression for $v$ into the force balance equation.
    $$ \frac{GM}{r^2} = \frac{(2\pi r / T)^2}{r} = \frac{4\pi^2 r^2}{T^2 r} = \frac{4\pi^2 r}{T^2} $$
    Now, rearrange to solve for $r^3$.
    $$ r^3 = \frac{GM T^2}{4\pi^2} $$
    Using $\mu = GM$:
    $$ r = \sqrt[3]{\frac{\mu T^2}{4\pi^2}} $$
    This is just a rearrangement of Kepler's Third Law for the semi-major axis $a$, where $a=r$ for a circular orbit.

4.  **Calculate the value.** Plug in the given values for $\mu$ and $T$.
    $$ r = \sqrt[3]{\frac{(3.986 \times 10^{14} \, \text{m}^3/\text{s}^2) (86164.09 \, \text{s})^2}{4\pi^2}} $$
    $$ r \approx \sqrt[3]{7.496 \times 10^{22} \, \text{m}^3} \approx 42,164,140 \, \text{m} \approx 42,164 \, \text{km} $$

5.  **Find the altitude.** The result $r$ is the radius from the center of the Earth. To find the altitude $h$ above the surface, subtract Earth's radius.
    $$ h = r - R_E = 42,164 \, \text{km} - 6378 \, \text{km} = 35,786 \, \text{km} $$

**Reflection:** Each step builds on the last. We started with the fundamental principle of orbital motion (force balance), related it to the desired orbital characteristic (period), solved for the physical dimension (radius), and finally converted that dimension to the required engineering parameter (altitude). This pathway from physics to engineering is universal.

## Diagrams
A simplified view of LEO, MEO, and GEO altitudes relative to Earth.

```text
                                       . . . . . . . . . . . . . . GEO (~35,786 km)
                               . . . . . . . . . . . . . . . . . . . .
                           . . . . . . . . . . . . . . . . . . . . . . .
                         . . . . . . . . . . . . . . . . . . . . . . . . .
                       . . .                                         . . .
                     . . .                                             . . .
                   . . .                                                 . . .
                  . . .                MEO (~20,000 km)                   . . .
                 . . .            . . . . . . . . . . . . .            . . .
                . . .           . . . . . . . . . . . . . .           . . .
               . . .          . . .                       . . .          . . .
              . . .         . . .                           . . .         . . .
             . . .         . . .    LEO (~200-2000 km)       . . .         . . .
             . . .         . . .         , - ~ ~ ~ - ,       . . .         . . .
             . . .         . . .     , '               ' ,   . . .         . . .
             . . .         . . .    /         o         \    . . .         . . .
             . . .         . . .   |        EARTH        |   . . .         . . .
             . . .         . . .    \                   /    . . .         . . .
             . . .         . . .     , . _ _ _ _ _ . ,     . . .         . . .
             . . .         . . .                           . . .         . . .
              . . .         . . .                         . . .         . . .
               . . .          . . .                     . . .          . . .
                . . .           . . . . . . . . . . . . . .           . . .
                 . . .            . . . . . . . . . . . . .            . . .
                  . . .                                                 . . .
                   . . .                                                 . . .
                     . . .                                             . . .
                       . . .                                         . . .
                         . . . . . . . . . . . . . . . . . . . . . . . . .
                           . . . . . . . . . . . . . . . . . . . . . . .
                               . . . . . . . . . . . . . . . . . . . .
                                       . . . . . . . . . . . . . .
```

A Highly Elliptical Orbit (HEO) like Molniya, showing inclination and apogee dwell.

```text
                                  ^ N Pole
                                  |
                                  |         .--'''--.   <-- Apogee (slow, long dwell time
                                 / \       /         \         over Northern Hemisphere)
                                | E |     /           \
                                | a |    /             \
 Equatorial Plane <-------------| r |---/---------------\------------->
           (i=0 deg)            | t |  /                 \
                                | h | /                   \
                                 \ / /                     \
                                  v /                       \
                                   /                         \
                                  |                           |
                                  |                           |
                                  \            . Perigee      /
                                   \         (fast)          /
                                    \                       /
                                     `-.                 .-'
                                        `--...___...--'`

Orbit is inclined at angle i (~63.4 deg for Molniya) to the Equatorial Plane.
```

## Memory technique — remember this forever
1.  **Mnemonic:** "**L**ow **M**akes **G**round **H**urry, **S**un **S**tays **M**otionless."
    *   **L**EO, **M**EO, **G**EO, **H**EO are primarily about altitude (Low -> High).
    *   **S**un-**S**ynchronous is about the Sun's angle staying constant.
    *   **M**olniya is for high-latitude "motionless" (long dwell time) coverage.

2.  **Must overlearn:**
    *   GEO altitude: **$h \approx 35,786$ km**.
    *   Kepler's Third Law: **$T = 2\pi \sqrt{a^3/\mu}$**. Higher means slower.
    *   SSO key property: **Nodal precession rate matches Earth's revolution rate around the Sun.**

3.  **Spaced repetition schedule:** Review your notes and these key facts in **1 day, 3 days, 7 days, 16 days, and 35 days**. Do not skip this.

4.  **First principles pathway:** If you forget everything, rebuild from Newton.
    *   Force Balance: $F_g = F_c \implies G M m / r^2 = m v^2 / r$.
    *   For a circle, $v = 2\pi r / T$.
    *   Substitute $v$ into the force balance and solve for $T$ or $r$. This gives you Kepler's Third Law, the foundation for relating altitude and period for all orbit types.

## Common mistakes
*   **Using a Solar Day for GEO.** Using $T=24$ hours for GEO calculations is wrong. The Earth must rotate ~361° to have the Sun appear in the same place (a solar day), but a satellite only needs to match the 360° rotation of the Earth itself (a sidereal day). This error will put your GEO altitude off by about 160 km.
*   **Confusing Geosynchronous and Geostationary.** A geosynchronous orbit has a period of one sidereal day. A geostationary orbit is a *specific case* of a geosynchronous orbit that also has $e=0$ and $i=0$. An inclined geosynchronous orbit traces a figure-eight pattern over the ground.
*   **Thinking LEO is "slow".** LEO satellites have the shortest periods (around 90 minutes) and the highest orbital velocities (~7.8 km/s). They are only "low"; they are extremely fast.
*   **Assuming SSO is always in sunlight.** SSO means the angle to the Sun is constant. A "dawn-dusk" SSO stays near the terminator (the line between night and day), while a "noon-midnight" SSO passes over points at local noon and local midnight. Some SSO satellites can be eclipsed by the Earth regularly.

## Self-check
1.  A satellite is designed for direct-to-home television broadcasting to a fixed continent. What single orbit type is the only logical choice, and what three specific orbital parameters must it have?
2.  You are designing a constellation of satellites for global internet with low latency. Why is LEO a better choice than MEO or GEO? What is the primary disadvantage you must overcome with a LEO constellation?
3.  The critical inclination for a Molniya orbit is $i \approx 63.4^\circ$. At this inclination, the perturbation that causes the argument of perigee ($\omega$) to rotate is zero. Why is it critically important for the apogee of a Molniya orbit to remain fixed over the northern hemisphere rather than drifting around the orbit?