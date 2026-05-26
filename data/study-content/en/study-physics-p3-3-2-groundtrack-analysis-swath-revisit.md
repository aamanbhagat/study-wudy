## 1. The one-sentence answer
**Groundtrack analysis quantifies the repeating trace a satellite’s sub-satellite point makes on Earth’s rotating surface and determines both the instantaneous coverage width (swath) and the time interval until that trace again intersects a chosen ground location (revisit).**

A satellite in a fixed inertial orbit projects a moving point directly beneath it onto the spinning Earth. Because Earth rotates 15° per hour while the satellite completes its orbit, successive ground tracks are displaced westward, creating a shifting pattern whose spacing depends on orbital period and inclination. Swath is the east-west width of the sensor footprint measured at the surface; revisit is the elapsed time until any point inside that swath is again viewed under comparable geometry.

The two quantities are coupled: a wider swath reduces revisit time at the cost of coarser resolution or higher power, while orbital altitude and inclination set the fundamental spacing between tracks. Designers therefore trade these parameters against mission requirements for global coverage, temporal sampling, or regional persistence.

> [!NOTE]
> The single most important insight is that revisit time is not the orbital period; it is the time required for the cumulative westward drift of successive ground tracks to bring a new track inside the swath of an earlier one.

## 2. Why this matters — concrete and current
Planet Labs’ Dove constellation uses 3U CubeSats at ~475 km altitude with ~90° inclination; their daily global revisit is achieved by placing 150+ satellites so that the 20 km swath of each optical sensor produces a track spacing that fills the Earth in roughly 24 h.

The European Space Agency’s Sentinel-1 C-band SAR satellites operate at 693 km in a 12-day repeat cycle; their 250 km swath and 6-day constellation revisit enable operational flood mapping and ice-motion tracking because the exact repeat geometry guarantees interferometric coherence.

SpaceX Starlink’s second-generation satellites at 550 km employ phased-array user terminals whose 25 km effective swath must be scheduled against the 53° inclination shell so that any mid-latitude ground station experiences no more than 15 min outage; ground-track analysis supplies the contact-duration statistics used in the scheduling algorithm.

NASA’s TROPICS constellation of six 6U CubeSats at 550 km exploits 12° inclination and 80 km microwave swaths to achieve sub-hourly revisit over tropical cyclones; the tight spacing of tracks is possible only because the low inclination produces slow nodal precession relative to the target latitude band.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Keplerian orbital period | Sets the time between successive equator crossings and therefore track spacing       |
| Sidereal rotation rate of Earth | Produces the westward drift of ground tracks each orbit                               |
| Spherical trigonometry   | Converts angular swath at the satellite into surface distance and overlap geometry   |
| Inclination and nodal precession | Determines whether the ground-track pattern is sun-synchronous or drifting            |

## 4. Building the idea — from intuition to formalism

### Step 1 — The ground track is an inertial great-circle projected onto a rotating sphere
The orbital plane is fixed in inertial space; its intersection with Earth’s surface would be a fixed great circle if Earth did not rotate. Earth’s rotation therefore slides each successive equator crossing westward by an angle equal to the Earth rotation during one orbital period.  
Example: a 90 min LEO orbit sees Earth rotate 22.5° between ascending nodes.  
Formal statement: the longitude shift per revolution is  
$$
\Delta\lambda = \omega_\ Earth \cdot T,
$$  
where \(T\) is the nodal period.  
> [!WARNING]  
> Treating Earth as non-rotating yields a single fixed ground track; all revisit calculations then become identically zero.

### Step 2 — Track spacing at the equator equals the longitude shift
At the equator the surface distance between successive ascending nodes is simply \(R_E \Delta\lambda\). This spacing is the fundamental grid size that any swath must bridge.  
Example: 22.5° at 6378 km radius yields 2520 km equatorial spacing.  
Formal statement: equatorial track spacing  
$$
S_\text{eq} = R_E \omega_\ Earth T.
$$

### Step 3 — Swath width is the surface arc subtended by the sensor half-angle
A sensor with off-nadir angle \(\theta\) illuminates an angular width \(2\theta\) at the satellite. The corresponding surface swath \(W\) follows from the law of cosines in the plane containing the radius vector and the line of sight.  
Example: \(\theta = 15^\circ\) at 600 km altitude produces \(W \approx 330\) km.  
Formal statement:  
$$
W = 2 R_E \arcsin\left(\frac{(R_E+h)\sin\theta}{R_E}\right) - 2\theta R_E \quad\text{(small-angle form often used)}.
$$

### Step 4 — Revisit occurs when cumulative track drift falls inside one swath
After \(N\) orbits the total westward drift is \(N\Delta\lambda\). Revisit is achieved at the smallest \(N\) such that the remainder of \(N\Delta\lambda\) modulo 360° lies inside the swath expressed in longitude.  
Formal statement: minimum revisit orbits satisfy  
$$
\min N \quad\text{s.t.}\quad \min_k |N\Delta\lambda - 360^\circ k| < \frac{W}{R_E\cos\phi}.
$$

### Step 5 — Exact repeat requires rational ratio of orbital period to sidereal day
When \(T/T_\text{day} = p/q\) in lowest terms, the ground track closes after \(q\) days and \(p\) orbits, producing a fixed lattice of \(q\) unique tracks. This is the classic “repeat-cycle” orbit used by mapping missions.  
Formal statement: repeat factor  
$$
\frac{T}{T_\text{sidereal}} = \frac{M}{N},
$$  
where \(M,N\) are integers giving the number of orbits and days in the cycle.

### Step 6 — Sun-synchronous orbits freeze the drift relative to the Sun
A small retrograde inclination adjustment makes nodal precession exactly 360° per year, so the local-time of ascending node is constant. Revisit statistics then become purely geometric and independent of season.  
Formal statement: nodal rate  
$$
\dot{\Omega} = -\frac{3}{2}J_2\left(\frac{R_E}{a}\right)^2 n\cos i = \frac{2\pi}{365.2422\text{ d}}.
$$

## 5. Worked examples — every step shown

**Example 1 — Equatorial spacing for a 90-minute orbit**  
*Given:* \(T = 90\) min, \(R_E = 6378\) km.  
*Find:* \(S_\text{eq}\).  
Step 1: Convert period to seconds: \(T = 5400\) s.  
*Why:* SI units required for angular rate.  
Step 2: Earth angular displacement: \(\Delta\lambda = 7.292115\times10^{-5}\times5400 = 0.3938\) rad = 22.56°.  
*Why:* Uses sidereal rotation rate.  
Step 3: Convert to arc length: \(S_\text{eq} = 6378\times0.3938 = 2512\) km.  
**2512 km**  

*Reflection:* The calculation assumes a spherical non-rotating Earth frame; the only subtlety is using sidereal rather than solar day.

**Example 2 — Swath width at 30° latitude**  
*Given:* \(h = 600\) km, \(\theta = 20^\circ\), latitude \(\phi = 30^\circ\).  
*Find:* surface swath \(W\).  
Step 1: Slant-range geometry yields half-angle at centre of Earth \(\gamma = \arcsin\left(\frac{R_E+h}{R_E}\sin\theta\right)\).  
*Why:* Law of sines in the triangle satellite–Earth centre–footprint edge.  
Step 2: \(\gamma \approx 21.8^\circ\).  
Step 3: Full surface angle \(2(\gamma-\theta) = 3.6^\circ\).  
Step 4: Multiply by local radius of parallel: \(W = 2(\gamma-\theta)\times\frac{\pi}{180}\times R_E\cos\phi \approx 350\) km.  
**350 km**  

*Reflection:* Latitude correction \(\cos\phi\) is often omitted in first-order estimates; it matters for polar coverage.

**Example 3 — Revisit orbits for 250 km swath**  
*Given:* \(\Delta\lambda = 25^\circ\), \(W = 250\) km \(\to 2.25^\circ\) longitude at equator.  
*Find:* smallest \(N\).  
Step 1: Normalised spacing \(25^\circ / 360^\circ = 1/14.4\).  
Step 2: Search integer \(N\) until fractional part of \(N/14.4\) lies inside \(\pm1.125^\circ/360^\circ\).  
Step 3: \(N=3\) yields remainder 0.208° < 1.125°.  
**3 orbits (4.5 h)**  

*Reflection:* The fractional-part search is exactly the same algorithm used for constellation phasing.

**Example 4 — 16-day exact repeat orbit**  
*Given:* Desired 16-day cycle, 14 + 9/16 orbits per day.  
*Find:* nodal period.  
Step 1: Orbits per cycle = \(16\times(14 + 9/16) = 233\).  
Step 2: Period \(T = 86400\times16/233 \approx 5937\) s.  
Step 3: Semi-major axis from Kepler’s law yields \(a \approx 7078\) km (\(h \approx 700\) km).  
**233 : 16 repeat cycle at 700 km**  

*Reflection:* The integers 233 and 16 are coprime; any common factor would collapse the number of unique tracks.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using solar day instead of sidereal day | Everyday intuition defaults to 24 h | Always insert 86164 s for Earth rotation calculations |
| Forgetting \(\cos\phi\) in swath | Swath tables are usually quoted at equator | Multiply by local parallel radius for any latitude-specific analysis |
| Treating revisit as orbital period | Confusion between single-orbit and multi-orbit coverage | Revisit = smallest \(N\) such that \(N\Delta\lambda \mod 360^\circ\) < swath angle |
| Ignoring nodal precession for long cycles | J2 perturbation is small per orbit but accumulates | Include \(\dot{\Omega}\) when cycle exceeds a few days |
| Assuming circular orbit for swath edge | Small eccentricity moves perigee latitude | Use instantaneous radius at the latitude of interest |
| Neglecting Earth oblateness in track spacing | 0.3 % radius difference at poles | Use mean equatorial radius for first order; add J2 correction for precise repeat design |
| Overlapping swaths counted as zero revisit | Adjacent tracks may have temporal gaps larger than one orbit | Compute both spatial overlap and local time difference |

## 7. The textbook-precise statement
A ground track is the locus of the subsatellite point  
$$
\mathbf{r}_{ss}(t) = R_E\frac{\mathbf{r}(t)}{|\mathbf{r}(t)|},
$$  
where \(\mathbf{r}(t)\) is the inertial position of a satellite obeying the Keplerian two-body problem plus \(J_2\) secular perturbations. The swath is the surface set whose angular distance from \(\mathbf{r}_{ss}\) is less than the sensor half-angle projected through the local horizon. Revisit time at latitude \(\phi\) is the infimum of all positive \(t\) such that the longitude difference between two successive passes satisfies the overlap condition given in Step 4. (Vallado, *Fundamentals of Astrodynamics and Applications*, 4e, §5.3 & §11.4.)

## 8. Visual — diagram or schematic
```text
                North Pole
                    *
                   /|\
                  / | \
                 /  |  \   <-- orbit plane (inclination i)
                /   |   \
Equator --------+----|----+--------
               /     |     \
              /      |      \
             /   Δλ  |       \
            /<------>|        \
           Asc. node 1      Asc. node 2
Swath width W shown as horizontal bar centred on each ground track
```
The diagram shows two successive ascending nodes separated by longitude shift Δλ. The swath bars illustrate the surface width that must overlap the next track for revisit.

## 9. The memory technique
1. **The hook** — Picture a lawn sprinkler on a rotating merry-go-round; each pass waters a strip, and you wait until the merry-go-round brings an unwatered strip under the next sweep.  
2. **What to overlearn** — \(S_\text{eq} = R_E\omega_E T\) and the fractional-part condition for revisit orbits.  
3. **Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive \(\Delta\lambda\) from sidereal rotation during one Keplerian period, then test integer multiples until overlap occurs.

## 10. What this unlocks
Ground-track geometry supplies the coverage lattice required for constellation design, repeat-pass interferometry, and coverage-gap statistics used in mission planning.  
- Next: constellation phasing and Walker-delta patterns  
- Repeat-pass InSAR baseline calculation  
- Sun-synchronous orbit selection for constant illumination  
- Access-time statistics for ground-station scheduling

## 11. Self-check — five questions, no answers
1. A 98.6° sun-synchronous orbit at 705 km has what equatorial track spacing?  
2. If a sensor swath is 185 km at 30° latitude, what longitude width must be used for revisit calculations?  
3. For a 14.5 orbits-per-day orbit, how many days until an exact repeat occurs?  
4. Why does increasing inclination from 28° to 98° decrease equatorial revisit time for the same swath?  
5. A proposed 3-day repeat orbit yields track spacing of 1200 km; a 250 km swath leaves gaps. What single orbital-element change would close the gaps without altering altitude?