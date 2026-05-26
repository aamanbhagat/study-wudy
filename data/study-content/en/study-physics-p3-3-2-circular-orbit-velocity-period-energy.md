## 1. The one-sentence answer
**A circular orbit is the unique trajectory in which a satellite maintains constant speed and constant radial distance from the central body because gravitational force supplies exactly the centripetal acceleration required for uniform circular motion.**

Gravity pulls inward with magnitude \(GMm/r^2\). For the distance to stay fixed, this force must equal the centripetal requirement \(mv^2/r\). Equating the two expressions immediately yields the orbital speed. Once speed is known, the time to complete one revolution follows from circumference divided by speed, and total mechanical energy follows from adding kinetic and gravitational potential terms.

The same balance fixes both the period and the specific energy. Because kinetic energy exactly equals half the absolute value of potential energy, total energy is always negative and scales as \(-1/(2r)\). This single relation governs every circular orbit, whether around Earth, the Sun, or any other spherical mass.

> [!NOTE]
> The negative total energy is the direct signature that the orbit is bound; any circular orbit can be reached from a lower-energy ellipse by adding precisely the right \(\Delta v\) at apoapsis or periapsis.

## 2. Why this matters — concrete and current
SpaceX’s Starlink constellation places thousands of satellites in 550 km circular low-Earth orbits; the exact velocity 7.55 km s\(^{-1}\) and 95-minute period determine both collision-avoidance maneuvers and the daily revisit rate used for global broadband coverage.

NASA’s James Webb Space Telescope operates in a halo orbit around the Sun–Earth L2 point that is continuously adjusted to remain effectively circular relative to the rotating Sun–Earth line; the period of 180 days is set by the same \(\sqrt{r^3/GM}\) relation applied to the effective central mass.

Planet Labs’ Dove satellites fly 475 km circular Sun-synchronous orbits whose 98.6° inclination and 94-minute period keep local solar time constant, enabling consistent daily imaging for agricultural and disaster-monitoring customers.

The proposed Lunar Gateway will occupy a near-circular near-rectilinear halo orbit around the Moon whose 6.5-day period and 3 km s\(^{-1}\) speed are calculated from the circular-orbit energy equation applied to the Earth–Moon restricted three-body problem.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Newton’s law of gravitation \(F = GMm/r^2\) | Supplies the inward force that must be balanced by centripetal acceleration. |
| Kinetic energy \(\frac12 mv^2\) and gravitational potential \(-GMm/r\) | Required to compute total mechanical energy once velocity is known. |
| Definition of period \(T\) as time for one full revolution | Links orbital speed to the circumference \(2\pi r\). |
| Specific quantities (divide by satellite mass \(m\)) | Simplifies all formulas to depend only on central-body parameter \(\mu = GM\) and radius \(r\). |

## 4. Building the idea — from intuition to formalism

### Step 1 — Force balance at constant radius
A satellite at fixed distance \(r\) from a spherical central body experiences an unchanging gravitational pull. For the radial coordinate to remain exactly \(r\), the net radial acceleration must be zero in the orbiting frame; therefore the gravitational acceleration must be supplied entirely by the centripetal term \(v^2/r\).

Consider a 300 km altitude Earth orbit. The gravitational acceleration is \(9.0\) m s\(^{-2}\). Setting \(v^2/r = 9.0\) m s\(^{-2}\) immediately gives \(v \approx 7.7\) km s\(^{-1}\).

The formal statement is
\[
\frac{GM}{r^2} = \frac{v^2}{r}.
\]

> [!WARNING]
> Treating gravity as a constant \(g\) instead of \(GM/r^2\) produces a 10 % error even at 300 km; the inverse-square law must be retained.

### Step 2 — Solving for speed
Algebraic rearrangement of the force-balance equation isolates orbital speed:
\[
v = \sqrt{\frac{GM}{r}} = \sqrt{\frac{\mu}{r}}.
\]
This is the circular-orbit speed. It decreases with increasing altitude, contrary to the everyday intuition that “higher means faster.”

### Step 3 — Period from circumference and speed
The orbital period is the time to travel the circumference at constant speed:
\[
T = \frac{2\pi r}{v} = 2\pi\sqrt{\frac{r^3}{\mu}}.
\]
Kepler’s third law for circular orbits appears directly.

### Step 4 — Kinetic and potential energy per unit mass
Specific kinetic energy is \(\frac12 v^2 = \mu/(2r)\). Specific potential energy is \(-\mu/r\). Their sum, the specific mechanical energy, is therefore
\[
\varepsilon = -\frac{\mu}{2r}.
\]

### Step 5 — Total energy and escape condition
Because \(\varepsilon < 0\), the satellite is gravitationally bound. Escape requires \(\varepsilon = 0\), which occurs only at infinite radius or at the local escape speed \(\sqrt{2\mu/r}\).

## 5. Worked examples — every step shown

**Example 1 — Low-Earth circular speed**
- *Given:* Earth radius \(R = 6378\) km, \(\mu = 3.986 \times 10^5\) km\(^3\) s\(^{-2}\), altitude 300 km.
- *Find:* orbital speed \(v\).

\[
r = 6378 + 300 = 6678~\text{km}
\]
*Why:* add altitude to equatorial radius to obtain geocentric distance.

\[
v = \sqrt{\frac{3.986\times10^5}{6678}} = 7.726~\text{km s}^{-1}
\]
*Why:* direct substitution of the circular-speed formula.

**7.726 km s\(^{-1}\)**

*Reflection:* The dominant error source is usually uncertainty in \(\mu\) or in the chosen radius; the algebra itself is one line.

**Example 2 — Period of a geostationary orbit**
- *Given:* \(\mu = 3.986\times10^5\) km\(^3\) s\(^{-2}\), \(r = 42164\) km.
- *Find:* sidereal period \(T\).

\[
T = 2\pi\sqrt{\frac{(42164)^3}{3.986\times10^5}} = 86164~\text{s}
\]
*Why:* the cube of radius appears because period scales with \(r^{3/2}\).

**86164 s (23 h 56 min 4 s)**

*Reflection:* The four-minute difference from 24 h is exactly the sidereal-versus-solar day distinction.

**Example 3 — Specific energy comparison**
- *Given:* the 300 km LEO of Example 1.
- *Find:* specific mechanical energy \(\varepsilon\).

\[
\varepsilon = -\frac{3.986\times10^5}{2\times6678} = -29.86~\text{km}^2\text{s}^{-2}
\]
*Why:* total energy is always half the potential energy for a circular orbit.

**-29.86 km\(^2\) s\(^{-2}\)**

*Reflection:* The negative sign tells us escape from this orbit still requires an additional 3.2 km s\(^{-1}\).

**Example 4 — Raising a circular orbit**
- *Given:* initial \(r_1 = 6678\) km, target \(r_2 = 10000\) km, same \(\mu\).
- *Find:* \(\Delta v\) needed if performed as a single tangential burn.

\[
v_1 = \sqrt{\frac{\mu}{r_1}} = 7.726~\text{km s}^{-1},\quad v_2 = \sqrt{\frac{\mu}{r_2}} = 6.313~\text{km s}^{-1}
\]
\[
\Delta v = v_2 - v_1 = -1.413~\text{km s}^{-1}
\]
*Why:* speed must decrease to enlarge a circular orbit.

**-1.413 km s\(^{-1}\)**

*Reflection:* The burn is applied opposite to velocity; the magnitude is modest because both orbits are already bound.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using \(g = 9.81\) m s\(^{-2}\) at any altitude | Everyday experience equates gravity with a constant | Always write \(GM/r^2\) and evaluate at the actual \(r\). |
| Confusing sidereal and solar day for GEO period | 24 h is solar; orbital period is sidereal | Subtract 3 min 56 s or use 86164 s directly. |
| Forgetting that \(\varepsilon = - \mu/(2r)\) already includes both energies | Students add kinetic and potential separately and double-count | Memorize the compact result \(\varepsilon = -\mu/(2r)\). |
| Treating \(\mu\) as \(GM_\ Earth\) when the central body is the Moon or Sun | Symbol \(\mu\) is generic | Replace \(\mu\) with the correct body’s gravitational parameter each time. |
| Assuming circular speed increases with altitude | Everyday vehicles go faster on highways | Note that \(v \propto r^{-1/2}\); higher orbits are slower. |
| Omitting the factor of 2 in the energy formula | Derivation of virial theorem is skipped | Re-derive \(\varepsilon = K + U = \mu/(2r) - \mu/r\) once. |
| Using Earth radius 6371 km (mean) instead of 6378 km (equatorial) for LEO | Different reference radii in tables | Choose the radius consistent with the \(\mu\) value employed. |

## 7. The textbook-precise statement
For a satellite of negligible mass \(m\) in a circular orbit of radius \(r\) about a spherical central body of gravitational parameter \(\mu\), the speed, period, and specific mechanical energy are
\[
v = \sqrt{\frac{\mu}{r}},\qquad T = 2\pi\sqrt{\frac{r^3}{\mu}},\qquad \varepsilon = -\frac{\mu}{2r}.
\]
These relations follow from equating gravitational and centripetal accelerations under the inverse-square law and from conservation of mechanical energy. (Curtis, *Orbital Mechanics for Engineering Students*, 4e, §2.4.)

## 8. Visual — diagram or schematic
```text
          satellite
             •  v (tangential)
             |
             | r
             |
             • central body (mass M)
             radius vector from centre to satellite is constant
```
The diagram shows a point mass at the origin, a second point mass at distance \(r\) moving perpendicular to the radius vector with speed \(v\). No radial component of velocity exists; the trajectory is therefore a perfect circle.

## 9. The memory technique

**The hook**  
Picture a ball on a string swung in a horizontal circle: gravity replaces the string tension, and the length of the string is the orbital radius.

**What to overlearn**  
1. \(v = \sqrt{\mu/r}\)  
2. \(T = 2\pi\sqrt{r^3/\mu}\)  
3. \(\varepsilon = -\mu/(2r)\)

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

**First-principles fallback**  
Start from \(GMm/r^2 = mv^2/r\), solve for \(v\), then compute \(T = 2\pi r/v\) and \(\varepsilon = v^2/2 - \mu/r\).

## 10. What this unlocks
Circular-orbit relations are the reference solution against which every elliptical, parabolic, and hyperbolic trajectory is compared. They also supply the Hohmann-transfer \(\Delta v\) budgets and the vis-viva equation special case \(v = \sqrt{\mu/r}\).

- Elliptical orbits and the vis-viva equation  
- Two-body problem reduction to polar coordinates  
- Orbit-raising and de-orbit burns  
- Sphere-of-influence patching for interplanetary trajectories  

## 11. Self-check — five questions, no answers
1. Derive the circular speed at 500 km altitude above Earth and compare it with the value at 35 786 km (GEO).  
2. A newly discovered asteroid has \(\mu = 4.5\times10^4\) km\(^3\) s\(^{-2}\). What orbital period corresponds to a 300 km circular orbit about it?  
3. Show that the escape speed from a circular orbit is exactly \(\sqrt{2}\) times the orbital speed.  
4. Why does a satellite in a higher circular orbit possess lower kinetic energy yet higher total mechanical energy?  
5. Identify the algebraic mistake that would produce a positive total energy for a circular orbit and explain the physical impossibility of the result.