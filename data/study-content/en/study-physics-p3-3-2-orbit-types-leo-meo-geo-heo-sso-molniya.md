## 1. The one-sentence answer
**Orbit types are regions of space around Earth defined by altitude ranges, eccentricity, and inclination that produce distinct periods, ground tracks, and perturbation behaviors.**  

These regions arise directly from Kepler’s third law: the orbital period is fixed once the semi-major axis is chosen. Low altitudes yield short periods and high speeds; higher altitudes lengthen the period until it matches one sidereal day at geostationary altitude. Adding eccentricity stretches the orbit so that apogee dwell time increases, while choosing a precise inclination cancels nodal precession caused by Earth’s oblateness and keeps the orbital plane fixed relative to the Sun.  

The six labels therefore encode engineering choices: LEO for imaging and crewed flight, MEO for navigation, GEO for continuous coverage, SSO for repeatable lighting, and Molniya-type HEO for high-latitude service.  

> [!NOTE]
> The single most powerful insight is that altitude, eccentricity, and inclination are not arbitrary labels; each is chosen so that one orbital element (period, nodal rate, or argument of perigee) remains constant or repeats on a desired schedule.

## 2. Why this matters — concrete and current
SpaceX Starlink satellites operate in LEO shells at 550 km and 1 200 km; the 550 km shell was selected because atmospheric drag removes debris within five years while still allowing 15 ms latency.  

The GPS constellation occupies MEO at 20 200 km altitude; the 12-hour period and 55° inclination produce four satellites visible from any point on Earth at all times, enabling the 1.5 m civilian positioning accuracy reported in the 2023 GPS Performance Standard.  

Intelsat and SES maintain GEO fleets at 35 786 km; each satellite remains fixed in the sky, so a single 3 m dish can deliver 4K television to an entire continent without tracking motors.  

The European Sentinel-2 satellites fly in SSO at 786 km with a 10:30 local-time descending node; the fixed Sun angle produces consistent shadow lengths that allow automated change-detection algorithms to measure crop growth to within 3 % biomass error.  

Russia’s Molniya satellites use 63.4° inclination, 0.72 eccentricity HEO with 12-hour periods; apogee dwell over 63° N latitude provides eight hours of continuous coverage per orbit for military communications where GEO is invisible.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Kepler’s third law \(T^2 \propto a^3\) | Converts altitude directly into period and therefore into orbit class. |
| Specific angular momentum and node precession rate \(\dot{\Omega} = -\frac{3}{2}J_2\frac{R_E^2}{p^2}n\cos i\) | Explains why only one inclination makes an orbit Sun-synchronous. |
| Argument-of-perigee perturbation \(\dot{\omega}\) | Shows why 63.4° freezes perigee for Molniya orbits. |
| Two-body vis-viva equation | Supplies speed at any point once semi-major axis and radius are known. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Period is fixed by size alone
A circular orbit’s period depends only on its radius. Raise the orbit and the satellite must travel farther; gravity weakens, so the required speed drops and the period lengthens.  

Example: at 300 km altitude the period is roughly 90 min; at 35 786 km it reaches 24 h.  

The exact relation is  
$$
T = 2\pi\sqrt{\frac{a^3}{\mu}}
$$  
where \(\mu = GM_E = 3.986 \times 10^{14}\) m³ s⁻².  

> [!WARNING]
> Using altitude instead of semi-major axis \(a = R_E + h\) introduces a 3 % period error at LEO altitudes; always convert first.

### Step 2 — Altitude bands are chosen for period targets
LEO (160–2 000 km) gives \(T < 127\) min, enabling frequent revisits. MEO (2 000–35 786 km) yields 2–24 h periods suited to navigation. GEO sits exactly at 35 786 km so \(T = 1\) sidereal day.  

### Step 3 — Eccentricity trades speed for dwell time
In an elliptical orbit the satellite moves fastest at perigee and slowest at apogee. Raising eccentricity lengthens the time spent near apogee without changing the period (still set by semi-major axis).  

### Step 4 — Inclination controls nodal precession
Earth’s equatorial bulge produces a torque that rotates the orbital plane. The rate is proportional to \(\cos i\). Setting \(\dot{\Omega}\) equal to the mean motion of the Sun (0.9856° day⁻¹) fixes the inclination near 98° for SSO.  

### Step 5 — Critical inclination freezes perigee
At \(i = 63.4^\circ\) or \(116.6^\circ\), \(\dot{\omega} = 0\). Perigee therefore remains fixed in inertial space, allowing repeatable high-latitude apogee passes.  

### Step 6 — The six labels are engineering shorthand
Combining the above constraints produces the conventional names and the altitude–inclination–eccentricity triples listed in any standard reference.

## 5. Worked examples — every step shown

**Example 1 — LEO period**  
*Given:* Circular orbit at 400 km altitude.  
*Find:* Orbital period.  
\(a = 6378 + 400 = 6778\) km \(= 6.778 \times 10^6\) m.  
$$
T = 2\pi\sqrt{\frac{a^3}{3.986\times10^{14}}} = 5554\text{ s} \approx 92.6\text{ min}.
$$  
*Why:* Direct substitution into Kepler’s third law.  
**5554 s**  

*Reflection:* The calculation shows why LEO satellites complete ~15.5 orbits per day.

**Example 2 — GEO altitude**  
*Given:* Desired period = one sidereal day = 86 164 s.  
*Find:* Required semi-major axis.  
$$
a = \left(\frac{T^2\mu}{4\pi^2}\right)^{1/3} = 42\,164\text{ km}.
$$  
Altitude \(h = 42\,164 - 6378 = 35\,786\) km.  
**35 786 km**  

*Reflection:* The result is independent of inclination; only period fixes the radius.

**Example 3 — SSO inclination**  
*Given:* 800 km circular orbit, \(J_2 = 1.08263 \times 10^{-3}\).  
*Find:* inclination for \(\dot{\Omega} = 0.9856^\circ\) day⁻¹.  
Mean motion \(n = 2\pi/T\), \(T \approx 6052\) s so \(n \approx 0.001038\) rad s⁻¹.  
Solving the precession formula yields \(i \approx 98.6^\circ\).  
**98.6°**  

*Reflection:* The cosine term changes sign above 90°, producing retrograde Sun-synchronous orbits.

**Example 4 — Molniya apogee altitude**  
*Given:* \(a = 26\,554\) km, \(e = 0.72\).  
*Find:* Apogee radius and altitude.  
\(r_a = a(1+e) = 45\,673\) km, \(h_a = 45\,673 - 6378 = 39\,295\) km.  
**39 295 km**  

*Reflection:* The high apogee supplies long dwell time above 60° N latitude.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Confusing GEO with geosynchronous | Both have 24 h periods; only GEO is equatorial and therefore stationary | Always check inclination when the label “GEO” appears |
| Using equatorial radius for all calculations | Earth is oblate; equatorial radius underestimates period by ~0.3 % | Use mean radius or the exact \(R_E\) consistent with the gravity model |
| Assuming SSO must be exactly polar | The required inclination is 98–99°; 90° produces slow drift | Solve the precession equation for the target local-time node |
| Treating Molniya as any high-eccentricity orbit | Only 63.4° freezes perigee; other inclinations cause perigee to walk | Verify critical inclination before claiming “Molniya-type” |
| Mixing altitude with semi-major axis at GEO | 35 786 km is altitude, not radius; using it directly as \(a\) errs by 15 % | Always add \(R_E\) first |
| Ignoring that HEO period is still set by \(a\) | Students think eccentricity changes period | Re-state Kepler’s law before every elliptical-orbit calculation |
| Assuming LEO drag lifetime is independent of solar cycle | Density at 400 km varies by factor of 10 over the solar cycle | Include density tables or models when lifetime is required |

## 7. The textbook-precise statement
An Earth orbit is classified by the triple \((a,e,i)\) relative to the following boundaries (Vallado, *Fundamentals of Astrodynamics and Applications*, 4e, §5.2):  
- LEO: \(R_E + 160 \le a \le R_E + 2000\) km, \(e < 0.1\)  
- MEO: \(R_E + 2000 < a < R_E + 35786\) km  
- GEO: \(a = 42164\) km, \(e \approx 0\), \(i \approx 0\)  
- SSO: \(\dot{\Omega}(a,e,i) = 0.9856^\circ\) day⁻¹ (requires \(i > 90^\circ\))  
- Molniya: \(a \approx 26554\) km, \(e \approx 0.72\), \(i = 63.4^\circ\) (so \(\dot{\omega}=0\))  

## 8. Visual — diagram or schematic
```text
                  N
                  |
    SSO (~98°)   /|\   Molniya apogee
               /  |  \
              /   |   \
   GEO -----o-----|----o----- equator
            |     |     |
            |     |     |
   LEO -----o-----|----o----- 400 km
            |     |     |
            S     |     S
                  |
               Earth (not to scale)
```
Horizontal distances represent altitude; the SSO line is drawn retrograde, Molniya ellipse shows high apogee over northern latitudes.

## 9. The memory technique
1. **The hook** — Picture a ladder: bottom rung “Low” (LEO), middle “Medium” (MEO), top “Geo-stationary” (GEO). A slanted high-latitude ladder is the Molniya “ski jump”; the Sun-synchronous rung is painted so the Sun angle never changes.  
2. **What to overlearn** — \(T = 2\pi\sqrt{a^3/\mu}\), GEO altitude 35 786 km, critical inclination 63.4°.  
3. **Spaced-repetition schedule** — Review the six definitions at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive period from centripetal balance, then re-derive nodal rate from \(J_2\) potential, then re-derive \(\dot{\omega}=0\) from the same potential.

## 10. What this unlocks
Mastery of these orbit classes is the prerequisite for constellation design, launch-window calculations, and perturbation analysis.  

- Next: relative motion (Clohessy–Wiltshire equations) in LEO formations  
- Next: station-keeping budgets for GEO longitude slots  
- Next: repeat-ground-track design for SSO remote-sensing missions  
- Next: radiation-environment models that differ sharply between MEO and GEO  

## 11. Self-check — five questions, no answers
1. A satellite is reported at 1 200 km altitude with a 100 min period. Is the orbit circular? Show the calculation.  
2. Why does a 90° inclination orbit slowly drift in local time while a 98.6° orbit does not?  
3. Calculate the apogee altitude of a Molniya orbit with \(a = 26\,554\) km and \(e = 0.72\).  
4. A GEO satellite is given a 1° inclination. Describe its ground track over 24 h.  
5. Which single orbital element must be changed to convert an ordinary HEO into a usable Molniya orbit, and why?