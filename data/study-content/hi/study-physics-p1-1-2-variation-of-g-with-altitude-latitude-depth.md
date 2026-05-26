## 1. The one-sentence answer
**Gravity measured on Earth’s surface is not constant; it decreases with altitude and depth while also varying with latitude due to rotation and Earth’s oblate shape.**

Gravity follows an inverse-square law outside a spherical mass, so moving farther from the centre reduces the attractive force. Inside a uniform sphere the effective mass above you shrinks linearly with radius, producing a restoring force that also weakens linearly toward the centre. Earth’s spin adds a centrifugal term whose magnitude depends on latitude, and the equatorial bulge further modulates local g. These three effects together produce measurable differences of order 0.5 % across the planet.

The corrections matter once you leave the laboratory scale. A 10 km altitude change already shifts g by roughly 0.3 %, enough to affect precision gravimetry, satellite orbits, and even the calibration of accelerometers in smartphones. Depth dependence appears in mine shafts and in models of Earth’s interior; latitude dependence appears in every launch trajectory and every GPS timing correction.

> [!NOTE]
> The single deepest insight is that g is not a universal constant but a local, position-dependent field whose first-order variations are completely fixed by Newton’s inverse-square law plus the geometry and rotation of the planet.

## 2. Why this matters — concrete and current
SpaceX and Rocket Lab must adjust thrust profiles and guidance loops for the 0.5 % drop in g between Cape Canaveral (28° N) and the equatorial launch sites they sometimes consider; the difference changes payload margins by tens of kilograms on Falcon 9-class vehicles.

The GRACE-FO satellite pair maps Earth’s gravity field at 1 µGal resolution precisely because latitude and altitude corrections must be removed before any geophysical signal can be extracted; the same maps are used by oil-exploration companies to locate density anomalies.

Underground neutrino detectors such as INO (India) and JUNO (China) sit 1–2 km deep; the local g value enters the calculation of muon flux and rock density, which in turn sets background rates for rare-event searches.

Aircraft gravimeters flown by NOAA and commercial survey firms correct for both altitude (free-air correction) and latitude (Eötvös correction) in real time; a missed 0.1 mGal term ruins reservoir-volume estimates worth millions of dollars.

GNSS satellite clocks experience a gravitational redshift that depends on their orbital radius; the 20 200 km altitude shift from Earth’s surface produces a 45 µs/day advance that must be pre-compensated, otherwise positioning errors grow to kilometres within minutes.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Newton’s law of gravitation    | Gives the 1/r² force between point masses or spherical shells |
| Gauss’s law for gravity        | Converts the integral form into the simple interior-field result |
| Centrifugal acceleration       | Supplies the latitude-dependent outward term              |
| First-order Taylor expansion   | Converts exact expressions into the linear corrections used in engineering |
| Earth’s sidereal rotation rate | Numerical value of ω required for all latitude calculations |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Outside a spherical planet (altitude)
Gravity outside any spherically symmetric mass is identical to that of a point mass at the centre. At altitude h the distance from the centre is R+h, therefore g(h) = GM/(R+h)². For h ≪ R a binomial expansion immediately yields the linear drop g(h) ≈ g(1−2h/R).

Example: at h = 10 km, R = 6371 km, the fractional change is −0.00314, so g drops by 3.1 cm s⁻².

$$g(h)=\frac{GM}{(R+h)^2}\approx g\left(1-\frac{2h}{R}\right)$$

> [!WARNING]
> Treating Earth as a point mass is safe only outside the surface; inside you must switch to the shell theorem or Gauss’s law.

### Step 2 — Inside a uniform sphere (depth)
By Gauss’s law, only the mass inside radius r contributes to the field at r. For uniform density the enclosed mass is (4/3)πr³ρ, so g(r) = (4/3)πGρ r, linear in r.

Example: at half the radius, g is exactly half the surface value.

$$g(r)=\frac{GM}{R^3}r=g\frac{r}{R}\qquad(r<R)$$

> [!WARNING]
> Real Earth has radially increasing density; the linear law is only a first approximation.

### Step 3 — Centrifugal correction (rotation)
A frame fixed to Earth rotates with angular velocity ω. The centrifugal acceleration is ω²d, where d is the perpendicular distance from the axis. At latitude λ, d = R cos λ, so the outward component is ω²R cos²λ.

Example: at the equator λ = 0, centrifugal term reaches 0.034 m s⁻²; at the pole it is zero.

$$g_{\text{eff}}=g-\omega^2R\cos^2\lambda$$

> [!WARNING]
> This term is a fictitious force; it does not appear in an inertial frame.

### Step 4 — Latitude dependence of true gravitational acceleration
Earth is an oblate spheroid (flattening f ≈ 1/298.257). The equatorial radius is larger, so gravitational acceleration is already smaller there even before rotation. The combined effect produces the international gravity formula.

### Step 5 — Combined first-order expression
Collecting all three contributions gives the working formula used in geodesy and launch-vehicle software:

$$g(\lambda,h)\approx g_0(\lambda)\left(1-\frac{2h}{R}\right)-\omega^2R\cos^2\lambda$$

### Step 6 — Order-of-magnitude check
Typical numbers: 2h/R term ≈ 3×10⁻³ at 10 km; centrifugal term ≈ 3.4×10⁻³ at equator. Both are measurable with a good spring gravimeter.

### Step 7 — Textbook-grade statement
The effective gravity on a rotating oblate planet is the gradient of the total potential (gravitational plus centrifugal). All higher-order harmonics are obtained from spherical-harmonic expansion of that potential.

## 5. Worked examples — har step show karo

**Example 1 — Simple altitude correction**  
*Given:* R = 6371 km, g = 9.81 m s⁻², h = 5 km.  
*Find:* g(h).  
Step 1: compute 2h/R = 2×5000/6.371×10⁶ = 1.567×10⁻³.  
Step 2: g(h) = 9.81(1−0.001567) = 9.7946 m s⁻².  
*Why:* The binomial coefficient 2 appears directly from (R+h)⁻².  
**9.7946 m s⁻²**

*Reflection:* The calculation is linear; any small h follows the same ratio.

**Example 2 — Depth inside uniform sphere**  
*Given:* uniform Earth, r = 0.8 R.  
*Find:* g(r)/g.  
g(r)/g = r/R = 0.8.  
*Why:* Enclosed mass scales with volume, field with enclosed mass over r², hence linear.  
**0.8 g**

*Reflection:* Inside a uniform body the field increases with distance from centre.

**Example 3 — Equatorial centrifugal term**  
*Given:* ω = 7.292×10⁻⁵ rad s⁻¹, R = 6378 km (equatorial).  
*Find:* ω²R.  
ω²R = (7.292×10⁻⁵)²×6.378×10⁶ = 0.0339 m s⁻².  
*Why:* Only the component perpendicular to the axis survives.  
**0.0339 m s⁻² outward**

*Reflection:* This is 0.35 % of g; comparable to the altitude term at a few kilometres.

**Example 4 — Combined latitude-plus-altitude**  
*Given:* λ = 45°, h = 2 km, g₀(45°) = 9.806 m s⁻².  
*Find:* g_eff.  
Centrifugal term = ω²R cos²45° = 0.0339×0.5 = 0.01695 m s⁻².  
Altitude term = 9.806×(2×2000/6371000) = 0.00614 m s⁻² reduction.  
g_eff = 9.806 − 0.00614 − 0.01695 = 9.783 m s⁻².  
*Why:* Both corrections are subtracted from the non-rotating reference value.  
**9.783 m s⁻²**

*Reflection:* Real missions add the small oblateness correction on top of these numbers.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using 1/r² inside the planet      | Confuses exterior and interior solutions    | Always check r < R before applying Gauss’s law |
| Forgetting cos²λ factor           | Treats centrifugal acceleration as scalar   | Draw the axis and perpendicular distance d   |
| Treating R as constant            | Uses mean radius at every latitude          | Insert local radius of curvature when precision < 0.01 % is needed |
| Sign error in depth formula       | Writes g(r) = g(1−r/R) instead of g(r/R)    | Remember field must vanish at centre         |
| Ignoring density layering         | Applies uniform-sphere result to real Earth | Use PREM model or at least note the approximation |
| Adding centrifugal to orbital g   | Mixes surface and free-space calculations   | Centrifugal term exists only in rotating frame on surface |
| Confusing free-air and Bouguer corrections | Both reduce with height but for different reasons | Free-air = −2g h/R; Bouguer adds mass of rock slab |

## 7. The textbook-precise statement
On a non-rotating, spherically symmetric body of mass M and radius R the gravitational acceleration at distance r from the centre is g(r) = GM/r² for r ≥ R and g(r) = (GM/R³)r for r ≤ R (uniform density). When the body rotates with angular velocity ω the effective gravity measured in the co-rotating frame is the vector sum of the Newtonian field and the centrifugal acceleration −ω × (ω × r). For Earth the leading-order latitude dependence at the reference ellipsoid is given by the Somigliana formula (Heiskanen & Moritz, Physical Geodesy, 1967, §2-7). All higher multipoles are contained in the spherical-harmonic expansion of the geopotential.

## 8. Visual — diagram or schematic
```
          North Pole (λ=90°)
               |
               |   axis of rotation
               |
Equator (λ=0°) o----------------- centre
               |     centrifugal
               |     outward
               v
```
At latitude λ the distance from the axis is R cos λ; the centrifugal vector is perpendicular to the axis and has magnitude ω²(R cos λ). Its local vertical component is ω²R cos²λ.

## 9. The memory technique

1. **The hook** — Imagine Earth as a spinning orange: the poles are closer to the centre and the equator bulges; gravity is strongest at the poles and weakest at the equator.

2. **What to overlearn** — g(h) ≈ g(1−2h/R), g(d) ≈ g(1−d/R), centrifugal term ω²R cos²λ.

3. **Spaced-repetition schedule** — Review the three formulas at 1 day, 3 days, 7 days, 16 days, 35 days after first study.

4. **First-principles fallback** — If the formula is forgotten, restart from Newton’s law plus Gauss’s law for the interior and from the definition of centrifugal acceleration for the rotation term.

## 10. What this unlocks
Once you can compute local g you can proceed to orbital mechanics (escape velocity, circular-orbit speed), to the physics of pendulums and gravimeters, and to the design of gravity-assisted trajectories.

- Calculation of circular-orbit period at low Earth altitude
- Derivation of the Roche limit for fluid satellites
- Modelling of seismic P- and S-wave travel times inside Earth
- Precision trajectory integration for interplanetary probes

## 11. Self-check — five questions, no answers
1. Calculate g at 500 km altitude above mean sea level using the linear approximation; compare with the exact 1/r² result.

2. At what depth would g fall to 90 % of surface value inside a uniform sphere?

3. Derive the numerical value of the centrifugal acceleration at 30° latitude and state its direction relative to local vertical.

4. A gravimeter reading 9.812 m s⁻² at sea level is flown to 3 km; what reading is expected after free-air correction only?

5. Identify the sign error a student would make if they added rather than subtracted the centrifugal term when computing effective g at the equator.