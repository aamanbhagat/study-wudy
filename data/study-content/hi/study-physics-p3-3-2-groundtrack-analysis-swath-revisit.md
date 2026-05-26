## 1. The one-sentence answer
**Groundtrack analysis studies the projection of a satellite’s orbital path onto Earth’s rotating surface, then quantifies the instantaneous coverage width (swath) and the time interval between successive passes over the same ground point (revisit).**

A satellite in low Earth orbit moves at roughly 7.5 km/s relative to inertial space. Because Earth itself rotates 15° per hour, the ground track drifts westward on each revolution. Swath is set by the instrument’s field-of-view angle and altitude; revisit is set by the interplay between orbital period, nodal precession, and Earth’s rotation rate. Once both quantities are known, mission designers can decide whether daily global coverage, 3-day stereo revisit, or 16-day exact repeat is feasible.

The central engineering trade-off is simple: a wider swath reduces revisit time but usually demands higher altitude or larger optics, which in turn changes drag, power, and resolution.

> [!NOTE]
> The single most useful mental picture is that the ground track is not a fixed line on the globe; it is a moving “comb” whose teeth spacing is controlled by the difference between the orbital nodal period and one sidereal day.

## 2. Why this matters — concrete and current
Sentinel-2 (ESA) flies a 290 km swath at 786 km altitude to achieve 5-day revisit with two satellites; the same orbit without the twin would give only 10-day revisit, insufficient for agricultural monitoring contracts that ESA has with the European Commission.

Planet Labs’ Dove constellation uses 3U CubeSats at ~475 km with ~20 km swaths; by flying 150+ satellites they force daily revisit everywhere, a capability sold directly to hedge funds tracking global commodity storage.

The U.S. Space Force’s Space-Based Infrared System (SBIRS) GEO satellites have essentially zero swath motion relative to Earth; their revisit is continuous, which is why they are used for missile-warning rather than mapping.

NASA’s Landsat-9 maintains an exact 16-day repeat ground track at 705 km so that every pixel is illuminated at the same local solar time; any drift in the ground track would invalidate the 50-year surface-reflectance archive used by climate researchers.

Iridium-NEXT LEO comms satellites deliberately choose 780 km, 86.4° inclination orbits so that their 48-beam ~600 km swaths tile the entire planet with <10 min revisit, guaranteeing pole-to-pole voice and data coverage.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Keplerian orbital elements (a, e, i, Ω, ω, M) | Swath and revisit are functions of semi-major axis a and inclination i only when eccentricity is zero; you must start from these six numbers. |
| Sidereal rotation rate of Earth ω_E | The relative angular velocity between the orbital plane and the rotating Earth determines how fast the ground track walks westward. |
| Earth-centered Earth-fixed (ECEF) versus ECI frames | Ground tracks are drawn in ECEF; orbital propagation is done in ECI; you need the transformation between them. |
| Spherical trigonometry on the unit sphere | Latitude–longitude of the sub-satellite point is obtained from the argument of latitude and the rotation angle of Earth. |

If any row is unfamiliar, pause and review before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Sub-satellite point from orbital elements
A satellite’s position vector in the ECI frame is obtained from its orbital elements. Projecting that vector onto the Earth’s surface gives the instantaneous latitude φ and longitude λ.  
Example: at ascending node, argument of latitude u = 0, so φ = 0 and λ equals the Greenwich sidereal time at epoch.  
Formal statement:  
$$
\vec{r}_{\text{ECI}} = a( \cos u\,\hat{i} + \sin u\,\hat{j} ),\quad
\phi = \arcsin(\hat{r}\cdot\hat{z}),\quad
\lambda = \atantwo(\hat{r}\cdot\hat{y},\hat{r}\cdot\hat{x}) - \theta_G(t)
$$  
> [!WARNING]
> Forgetting to subtract Greenwich sidereal time θ_G(t) produces a ground track fixed in inertial space instead of drifting with Earth rotation.

### Step 2 — Swath width from field-of-view
The instrument half-angle α defines an Earth-central half-angle β via the law of cosines in the triangle formed by satellite, Earth centre, and tangent point.  
Example: 30° FOV at 600 km altitude yields β ≈ 8.3°, giving a swath of ~920 km at the equator.  
Formal statement:  
$$
\cos(\beta) = \frac{R_E}{R_E+h}\cos\alpha - \sin\alpha\sqrt{1-\left(\frac{R_E}{R_E+h}\right)^2}
$$  
> [!WARNING]
> Using the flat-Earth approximation α ≈ β underestimates swath by >15 % above 30° latitude.

### Step 3 — Longitudinal shift per revolution
After one orbital period T, Earth has rotated ω_E T. The orbital plane itself precesses at rate \(\dot{\Omega}\) due to J₂. The net longitude shift between successive ascending nodes is  
$$
\Delta\lambda = \omega_E T - \dot{\Omega}T
$$  
> [!WARNING]
> Ignoring J₂ precession makes sun-synchronous orbits appear to have 24 h instead of 24 h 56 min nodal periods.

### Step 4 — Revisit time for a single satellite
Revisit is the smallest integer number of revolutions N such that N·Δλ is an integer multiple of 360° within a chosen tolerance.  
Formal condition:  
$$
N\cdot\Delta\lambda \equiv 0 \pmod{360^\circ}
$$  
> [!WARNING]
> Treating revisit as exactly T·(360°/Δλ) without checking commensurability produces fractional orbits that never close.

### Step 5 — Constellation revisit scaling
For K equally spaced satellites in the same orbital plane the effective revisit drops by K. Adding M orbital planes spaced by 360°/M further multiplies the reduction. The resulting mean revisit is therefore  
$$
T_{\text{rev}} = \frac{T}{K\cdot M}\cdot\frac{360^\circ}{\Delta\lambda}
$$  
This is the textbook-grade statement of the coverage equation.

## 5. Worked examples

**Example 1 — Equatorial swath at 600 km**  
*Given:* h = 600 km, α = 15°, R_E = 6378 km.  
*Find:* swath width s at equator.  
Step 1: compute β from the cosine law above → β = 4.29°.  
Step 2: s = 2 R_E β (in radians) → s = 2 × 6378 × 0.0749 ≈ 954 km.  
*Why* each step: the law of cosines converts instrument angle to Earth-central angle; arc length on the sphere then gives ground distance.  
**954 km**

*Reflection:* the calculation is exact only at the equator; at higher latitudes the same β produces a shorter chord because of spherical geometry.

**Example 2 — Single-satellite 16-day repeat**  
*Given:* Landsat-type orbit, Δλ = 22.5° per revolution.  
*Find:* revolutions N until ground track repeats.  
22.5 N = 360 k → N = 16.  
**16 revolutions (exactly 16 days at 98.9 min period)**

*Reflection:* 16 is the smallest integer that satisfies the modular condition; any smaller N leaves a residual longitude offset.

**Example 3 — Two-satellite constellation revisit**  
*Given:* same orbit as Example 2, now two satellites phased 180° apart.  
Revisit halves to 8 days.  
**8 days**

*Reflection:* phasing only works if both satellites share identical orbital elements; differential drag destroys the assumption.

**Example 4 — Sun-synchronous swath planning**  
*Given:* 10:30 LTAN, h = 705 km, i = 98.2°, desired 5-day revisit with 2 satellites.  
Compute Δλ ≈ 25.2°; N = 14.3 → choose 14 rev; adjust phasing of second satellite to 2.5° offset. Resulting mean revisit = 2.5 days.  
**2.5-day mean global revisit**

*Reflection:* the 0.3-revolution remainder is absorbed by the second satellite’s initial node; this is how real missions close the coverage gap.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using 24 h instead of sidereal day | Confusing solar time with inertial rotation         | Always use ω_E = 7.292115 × 10^{-5} rad s^{-1}      |
| Forgetting latitude dependence of swath | Treating Earth as flat or using equatorial formula only | Multiply by cos φ or integrate over the swath arc   |
| Assuming zero eccentricity        | Many textbooks start with circular orbits           | Insert the radial distance r = a(1-e²)/(1+e cos ν)  |
| Ignoring J₂ nodal precession      | Treating the orbital plane as inertially fixed      | Add \(\dot{\Omega}_{J2} = -\frac{3}{2}J_2(R_E/p)^2 n\cos i\) |
| Counting calendar days instead of orbital revolutions | Revisit tables published in “days” without period   | Convert T_rev back to number of orbits first        |
| Overlapping swaths counted twice  | Simple division of Earth circumference by swath     | Use spherical cap area or Monte-Carlo coverage sim  |
| Neglecting Earth oblateness in β  | Using spherical law of cosines on WGS84 radii       | Replace R_E with local radius of curvature          |

## 7. The textbook-precise statement
Vallado, *Fundamentals of Astrodynamics and Applications*, 4e, §9.2 states:  
“Let the satellite position in the ECI frame be given by the classical orbital elements. The sub-satellite latitude and longitude in the ECEF frame are  
$$
\phi = \sin^{-1}(\sin i \sin u),\qquad
\lambda = \Omega - \theta_G + \tan^{-1}(\tan u \cos i)
$$  
where u is the argument of latitude. The ground-track swath half-width β satisfies the Earth-central-angle relation  
$$
\cos(\beta) = \frac{R_E}{r}\cos\alpha - \sin\alpha\sqrt{1-\left(\frac{R_E}{r}\right)^2}.
$$  
Revisit time is the smallest T_r > 0 such that the longitude of the ascending node after integer revolutions differs from the initial node by an integer multiple of 360° within a prescribed tolerance ε.”

## 8. Visual — diagram or schematic
```
          North Pole
              *
             /|\
            / | \
   Orbit   /  |  \   <-- ground track (drifts west each rev)
          /   |   \
Equator --*----|----*--  (ascending node shifts Δλ each pass)
          \   |   /
           \  |  /
            \ | /
             \|/
              *
          South Pole
```
The vertical line is the orbital plane; the slanted lines show successive ground tracks after one nodal period. Horizontal spacing = Δλ.

## 9. The memory technique
1. **The hook** — Picture a lawn sprinkler on a spinning merry-go-round; the “wet stripe” width is swath and the time until the same grass gets wet again is revisit.
2. **What to overlearn** — Δλ = (ω_E − Ω̇)T and the modular condition N Δλ ≡ 0 (mod 360°).
3. **Spaced-repetition schedule** — Review the two equations on day 1, 3, 7, 16, 35.
4. **First-principles fallback** — If the formula is forgotten, recompute the inertial longitude of the ascending node after each revolution and subtract the accumulated Greenwich angle.

## 10. What this unlocks
Once ground-track, swath and revisit are mastered, the next topics become straightforward: constellation design (Walker and Streets), coverage optimization under lighting constraints, and formation-flying interferometry.

- Repeat-ground-track orbit selection for SAR tomography
- Orbit maintenance Δv budgets driven by repeat-cycle tolerance
- Multi-satellite scheduling algorithms that treat revisit as a set-covering problem

## 11. Self-check — five questions, no answers
1. A 500 km circular orbit at 97.5° inclination has what nodal period and what Δλ per revolution?
2. If an instrument swath is 120 km at 30° latitude, what is its swath at 60° latitude (same altitude and FOV)?
3. How many satellites are required in a single sun-synchronous plane to guarantee ≤1 day revisit with 200 km swaths?
4. Why does increasing altitude both increase swath and lengthen revisit for a fixed FOV?
5. A student calculates revisit using 24 h instead of a sidereal day and obtains 14.6 revolutions; what is the actual integer N and the resulting longitude error after 14 days?