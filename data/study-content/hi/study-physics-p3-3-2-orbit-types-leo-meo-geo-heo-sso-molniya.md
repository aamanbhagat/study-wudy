## 1. The one-sentence answer
**Orbit types classify closed paths around Earth by altitude, eccentricity, inclination and period so that each mission can trade coverage, latency, power and revisit time against launch cost.**

Different missions need different balances. A weather satellite that must image the same longitude every 30 minutes sits at 35786 km with zero inclination and zero eccentricity; that is GEO. A navigation constellation that needs global coverage with modest latency uses 20180 km circular orbits at 55° inclination; that is MEO. An Earth-observation satellite that must pass over every point at the same local solar time flies a 600–800 km retrograde orbit whose nodal precession matches Earth’s orbital rate around the Sun; that is SSO. All of these are solutions to the same two-body problem; only the constants of integration change.

The constants themselves come from the vis-viva equation and the angular-momentum vector. Once you fix semi-major axis \(a\), eccentricity \(e\), inclination \(i\), right ascension of ascending node \(\Omega\), argument of perigee \(\omega\) and true anomaly \(\nu\), the orbit is fully specified. Changing any one of them moves the satellite into a different named regime.

> [!NOTE]
> The single most useful “aha” is that altitude and period are locked together by Kepler’s third law; everything else (inclination, eccentricity, nodal precession) is chosen afterwards to satisfy mission geometry.

## 2. Why this matters — concrete and current
SpaceX Starlink operates almost entirely in LEO shells at 550 km and 570 km because round-trip light time must stay below 30 ms for low-latency internet; each shell is further divided into inclination planes so that the constellation maintains continuous coverage above 25° latitude.

ESA’s Galileo navigation system occupies MEO at 23222 km with 56° inclination; the higher altitude reduces the number of satellites needed for global coverage while still keeping dilution-of-precision low enough for centimetre-level positioning after carrier-phase processing.

Intelsat and SES keep broadcast satellites in GEO slots at 0° inclination; a single transponder at 36 000 km can illuminate an entire continent with a fixed antenna pointing angle, eliminating the need for tracking dishes on the ground.

The Russian Molniya constellation (and its modern replacement, the Express network) uses 12-hour HEO orbits with 63.4° inclination and perigee over the northern hemisphere; this gives eight hours of high-elevation coverage above 60° N latitude where GEO satellites sit below the horizon.

NASA’s Landsat-8 and ESA’s Sentinel-2 both fly SSOs at 705 km and 786 km respectively; their orbital planes precess at exactly 0.9856° per day so that every image is acquired at the same local solar time, allowing direct comparison of surface reflectance without diurnal illumination correction.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Two-body problem & Keplerian elements | All orbit types are just different numerical values of \(a, e, i, \Omega, \omega, \nu\). |
| Vis-viva equation              | Gives speed at any radius once \(a\) is known; used to size \(\Delta v\) budgets.    |
| Nodal precession due to \(J_2\) | Explains why SSOs exist and why Molniya orbits freeze their argument of perigee.     |
| Sidereal versus solar day      | Distinguishes GEO (one sidereal day) from SSO (one mean solar day nodal rate).       |

If any row above is unfamiliar, pause and review the two-body problem before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Altitude fixes period
A circular orbit’s period is set only by its radius. Raising the satellite lengthens the path and weakens gravity, so the period grows.  
Example: at 300 km altitude the period is ~90 min; at 35 786 km it becomes 23 h 56 min.  
Formal statement:  
$$T = 2\pi\sqrt{\frac{a^3}{\mu}}$$  
where \(\mu = 3.986 \times 10^{14}\) m³ s⁻².  
> [!WARNING]  
> Forgetting that \(a\) is measured from Earth’s centre (not altitude) produces a 6378 km error and a wrong period.

### Step 2 — Eccentricity stretches the orbit
Non-zero \(e\) creates perigee and apogee. Energy is still fixed by semi-major axis, but speed now varies.  
Example: Molniya has \(e \approx 0.72\), perigee 500 km, apogee 40 000 km.  
Formal:  
$$r = \frac{a(1-e^2)}{1+e\cos\nu}$$  
> [!WARNING]  
> Using altitude instead of radius in the denominator breaks the polar equation and gives impossible negative radii.

### Step 3 — Inclination sets latitude coverage
Inclination \(i\) is the angle between the orbital plane and the equator. \(i = 90^\circ\) reaches the poles; \(i < 90^\circ\) never does.  
Example: ISS at 51.6° never sees latitudes above 51.6° N.  
Formal: maximum geocentric latitude equals \(i\).

### Step 4 — Nodal precession from \(J_2\)
Earth’s oblateness causes \(\Omega\) to drift:  
$$\dot{\Omega} = -\frac{3}{2}J_2\left(\frac{R_E}{a}\right)^2 n\cos i$$  
Choosing \(a\) and \(i\) so that \(\dot{\Omega}\) equals Earth’s mean motion around the Sun produces a Sun-synchronous orbit.

### Step 5 — Frozen argument of perigee
For \(i = 63.4^\circ\) or \(116.6^\circ\), \(\dot{\omega}\) due to \(J_2\) vanishes. Molniya exploits this to keep perigee fixed over the northern hemisphere.

### Step 6 — Combining elements into named regimes
LEO: \(a < 8378\) km, \(e < 0.25\);  
MEO: 8378 km < \(a\) < 41 164 km;  
GEO: \(a = 42 164\) km, \(e \approx 0\), \(i \approx 0\);  
HEO: \(e > 0.25\);  
SSO: \(\dot{\Omega} = 0.9856^\circ\) day⁻¹;  
Molniya: \(T = 12\) h, \(i = 63.4^\circ\), \(\omega = 270^\circ\).

## 5. Worked examples — har step show karo

**Example 1 — Simple LEO period**  
*Given:* Circular orbit at 400 km altitude.  
*Find:* Orbital period.  
\(a = 6378 + 400 = 6778\) km \(= 6.778 \times 10^6\) m.  
$$T = 2\pi\sqrt{\frac{(6.778\times10^6)^3}{3.986\times10^{14}}} = 5555\ \text{s} \approx 92.6\ \text{min}.$$  
*Why:* Converted altitude to geocentric radius first.  
**5555 s (92.6 min)**

*Reflection:* The calculation is identical for any circular orbit; only \(a\) changes.

**Example 2 — GEO radius**  
*Given:* Period must equal one sidereal day (86 164 s).  
*Find:* Required semi-major axis.  
$$a = \left(\frac{\mu T^2}{4\pi^2}\right)^{1/3} = 42\,164\ \text{km}.$$  
**42 164 km**

*Reflection:* The 35 786 km altitude figure quoted everywhere is simply 42 164 km minus Earth’s equatorial radius.

**Example 3 — SSO inclination at 700 km**  
*Given:* \(a = 7078\) km, \(n = 0.00105\) rad s⁻¹.  
*Find:* \(i\) so \(\dot{\Omega} = 1.991\times10^{-7}\) rad s⁻¹.  
Using the \(J_2\) formula and solving yields \(i \approx 98.2^\circ\).  
**98.2°**

*Reflection:* The retrograde value is required so that nodal precession is positive (eastward).

**Example 4 — Molniya apogee altitude**  
*Given:* \(a = 26\,554\) km, \(e = 0.72\).  
*Find:* Apogee radius and altitude.  
$$r_a = a(1+e) = 45\,673\ \text{km}, \quad h_a = 45\,673 - 6378 = 39\,295\ \text{km}.$$  
**39 295 km**

*Reflection:* The high apogee gives long dwell time over high latitudes; the 63.4° inclination keeps perigee fixed.

## 6. Common traps and how to avoid them

| Trap                                      | Why it happens                                      | How to avoid it                                      |
|-------------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using altitude instead of \(a\) in Kepler’s law | Altitude is measured from surface, not centre      | Always add 6378 km first                            |
| Calling any 24 h orbit “GEO”              | GEO also requires zero inclination and eccentricity | Check \(e < 0.001\) and \(i < 1^\circ\)             |
| Forgetting SSO must be retrograde         | Students assume prograde for “Sun-synchronous”     | Solve \(\dot{\Omega}\) equation; sign forces \(i > 90^\circ\) |
| Treating Molniya as any HEO               | Only the specific \(i\) and \(\omega\) freeze perigee | Verify \(i = 63.4^\circ\), \(\omega = 270^\circ\)   |
| Mixing solar and sidereal day for GEO     | Broadcast satellites appear fixed in solar time    | Use 86 164 s, not 86 400 s                          |
| Ignoring \(J_2\) when calculating SSO     | Pure Keplerian model gives zero precession         | Always include the \(J_2\) term                     |
| Assuming LEO is only below 1000 km        | Definition is fuzzy; many sources use 2000 km      | State the exact altitude or \(a\) you adopt         |

## 7. The textbook-precise statement
An Earth orbit is completely determined by the six Keplerian elements \(\{a,e,i,\Omega,\omega,\nu\}\) or their equivalent set of orbital constants. The classical orbital elements are defined with respect to the Earth-centered inertial frame whose fundamental plane is the mean equator of epoch J2000. Low Earth orbits satisfy \(a < 8378\) km; medium Earth orbits occupy \(8378 < a < 41\,164\) km; geostationary orbits satisfy \(a = 42\,164\) km, \(e \approx 0\), \(i \approx 0\). Sun-synchronous orbits are those for which the nodal precession rate equals the mean orbital rate of the Earth about the Sun:  
$$\dot{\Omega} = \frac{2\pi}{365.2422\times86\,400}\ \text{rad s}^{-1}.$$  
Highly elliptical orbits are those with \(e > 0.25\). The Molniya orbit is the specific HEO having period 43 082 s, eccentricity 0.72, inclination 63.4° and argument of perigee 270°. (Curtis, *Orbital Mechanics for Engineering Students*, 3e, §4.4 and §11.3.)

## 8. Visual — diagram or schematic
```
                GEO (35 786 km)
                     o
                     |
          SSO (700 km)     Molniya apogee
               \           /
                \         /
                 \       /
                  Earth
                 /       \
                /         \
     LEO (400 km)         Molniya perigee
```
Axes: horizontal is equatorial plane; vertical is polar axis. GEO circle is equatorial; SSO is near-polar retrograde; Molniya ellipse has perigee at southernmost point and apogee over northern high latitudes.

## 9. The memory technique

1. **The hook** — Picture a ladder: bottom rung LEO (fast, low), middle MEO (navigation), top GEO (stationary TV), with a stretched rubber-band Molniya orbit looping high over Russia and a spinning SSO hoop keeping the Sun always on the same side.

2. **What to overlearn** — \(T = 2\pi\sqrt{a^3/\mu}\), GEO radius 42 164 km, Molniya inclination exactly 63.4°.

3. **Spaced-repetition schedule** — Review the six definitions after 1 day, 3 days, 7 days, 16 days and 35 days; each time recompute one numerical example from scratch.

4. **First-principles fallback** — If the name is forgotten, start from the two requirements “period = 24 h” or “nodal rate = 0.9856° day⁻¹” and solve the vis-viva or \(J_2\) equation; the resulting numbers label the orbit.

## 10. What this unlocks
Mastery of these regimes lets you size constellations, compute revisit times and choose launch inclinations without re-deriving the two-body problem each time.

- Next: constellation design (Walker, Streets)  
- Next: launch-window calculation using \(\Omega\) drift  
- Next: \(\Delta v\) budgets for orbit raising from LEO to GEO  
- Next: perturbation theory for long-term station-keeping

## 11. Self-check — five questions, no answers
1. A satellite at 700 km altitude has what orbital period?  
2. Why must a true GEO satellite have both zero eccentricity and zero inclination?  
3. Derive the inclination that produces a Sun-synchronous orbit at 800 km altitude.  
4. A Molniya orbit has perigee altitude 500 km and apogee altitude 39 000 km; calculate its semi-major axis and period.  
5. Which single orbital element would you change to convert an ordinary HEO into a Molniya orbit, and why?