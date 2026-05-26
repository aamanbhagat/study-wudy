## 1. The one-sentence answer
**Gravity measured at Earth’s surface is not constant; it decreases with height above the surface, decreases with depth below the surface, and varies with latitude because of rotation and the planet’s oblate shape.**

Gravity is the net acceleration an object feels when the gravitational attraction of Earth’s mass is combined with the centrifugal effect of Earth’s spin. At greater altitude the distance to Earth’s centre increases, so the pure gravitational term weakens. Below the surface only the mass inside your radius contributes, so the net field falls linearly toward the centre. Latitude enters because points near the equator are both farther from the centre (Earth is an oblate spheroid) and experience a larger centrifugal reduction.

The three effects are small—order 0.1 % to 0.5 %—yet they matter for precision navigation, satellite orbits, and geophysical mapping. They are derived directly from Newton’s law of gravitation plus the kinematics of uniform rotation, without any new postulates.

> [!NOTE]
> The single most useful approximation is that, near the surface, each 10 km of altitude lowers *g* by roughly 0.03 m s⁻²—enough to shift the trajectory of a sounding rocket by kilometres if ignored.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 guidance software applies a latitude-dependent *g* model when computing the initial thrust-to-weight ratio at Cape Canaveral (28.5° N) versus Vandenberg (34.7° N); the 0.2 % difference alters the propellant load calculation by several hundred kilograms.

The European Space Agency’s GOCE satellite mapped the geoid to 1–2 cm accuracy by measuring local *g* variations caused by both altitude and latitude; those maps are now used to correct GPS heights for centimetre-level surveying.

Oil-exploration gravimeters deployed by Schlumberger detect underground density anomalies only after the raw readings have been corrected for latitude (centrifugal + oblateness) and for the depth of the instrument below the reference ellipsoid.

The U.S. GPS constellation broadcasts Earth-orientation parameters that incorporate the EGM2008 gravity model; receivers at high latitudes must apply the latitude term or accumulate range errors of several metres after a few hours.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Newton’s law of gravitation    | Supplies the 1/r² force between point masses or spheres   |
| Centripetal acceleration       | Converts Earth’s rotation into an effective outward acceleration |
| Gauss’s law for gravity        | Shows that only mass inside a Gaussian surface contributes when you are below the surface |
| Small-angle binomial expansion | Converts exact expressions into the linear approximations used in engineering |

## 4. Building the idea — from intuition to formalism

### Step 1 — Gravitational field outside a spherical mass
A uniform sphere attracts an external point exactly as though all its mass were at the centre.  
Example: at the surface, *g* = *GM*/*R*².  
The formal statement is  
$$g(r) = \frac{GM}{r^2}\qquad(r\ge R).$$  
> [!WARNING]  
> Treating Earth as a point mass when you are inside it produces an erroneously large field.

### Step 2 — Effect of altitude
Raise the observer a height *h* above radius *R*. The new distance is *R*+*h*, so  
$$g(h) = \frac{GM}{(R+h)^2}.$$  
For *h* ≪ *R* the binomial expansion yields the linear drop  
$$g(h)\approx g\left(1-\frac{2h}{R}\right).$$

### Step 3 — Effect of depth
Inside a uniform sphere only the mass within radius *r* = *R*–*d* contributes. That enclosed mass is *M*(*r*/*R*)³, therefore  
$$g(d) = \frac{GM}{R^3}(R-d)=g\left(1-\frac{d}{R}\right).$$  
The field falls linearly to zero at the centre.

### Step 4 — Centrifugal reduction
At latitude *φ* the distance from the axis is *R* cos *φ*. The centrifugal acceleration is *ω*²(*R* cos *φ*) directed outward perpendicular to the axis. Its local vertical component is *ω*²*R* cos² *φ*.

### Step 5 — Combined latitude dependence
Adding the centrifugal term and the small oblateness correction (Earth’s equatorial radius exceeds polar radius by 21 km) produces the International Gravity Formula  
$$g(\phi)=9.780327\left(1+0.0053024\sin^2\phi-0.0000058\sin^2 2\phi\right)\ \mathrm{m\,s^{-2}}.$$

### Step 6 — Textbook statement of the three variations
The surface acceleration *g* therefore satisfies three independent first-order corrections: altitude *h*, depth *d*, and latitude *φ*, each derived from Newton’s law plus rigid-body rotation.

## 5. Worked examples — every step shown

**Example 1 — Simple altitude correction**  
*Given:* *g* = 9.81 m s⁻², *R* = 6371 km, *h* = 10 km.  
*Find:* *g*(10 km).  
Step 1: write the exact expression  
$$g(h)=\frac{GM}{(R+h)^2}.$$  
*Why:* definition of gravitational field outside a sphere.  
Step 2: insert the linear approximation  
$$g(h)\approx 9.81\left(1-\frac{2\times10}{6371}\right)=9.807\ \mathrm{m\,s^{-2}}.$$  
*Why:* binomial expansion valid for *h*/*R* ≪ 1.  
**9.807 m s⁻²**  
*Reflection:* The factor of 2 arises because both the numerator and the inverse-square law contribute one power of distance.

**Example 2 — Depth correction**  
*Given:* uniform-density Earth, *d* = 1000 km.  
*Find:* *g*(1000 km).  
Step 1: enclosed mass fraction = (*R*–*d*)/*R*  
Step 2: multiply by surface *g*  
$$g(d)=9.81\times\frac{5371}{6371}=8.27\ \mathrm{m\,s^{-2}}.$$  
*Why:* Gauss’s law for gravity.  
**8.27 m s⁻²**  
*Reflection:* Linearity with depth is a direct consequence of the *r*³ scaling of enclosed mass.

**Example 3 — Latitude at equator versus pole**  
*Given:* *ω* = 7.292×10⁻⁵ rad s⁻¹, *R* = 6378 km (equator).  
*Find:* centrifugal reduction at equator.  
Step 1: *ω*²*R* = (7.292×10⁻⁵)²×6.378×10⁶ = 0.034 m s⁻².  
Step 2: at equator the full term opposes gravity.  
**0.034 m s⁻² reduction**  
*Reflection:* The value is only 0.3 % of *g*, yet it is measurable by gravimeters.

**Example 4 — Combined altitude-plus-latitude for a sounding rocket**  
*Given:* launch at 28.5° N, *h* = 50 km.  
*Find:* net *g* correction relative to sea-level pole value.  
Step 1: altitude term –2h/R = –0.0157.  
Step 2: latitude term from International Gravity Formula ≈ –0.0018.  
Step 3: total fractional change –0.0175 → Δ*g* ≈ –0.172 m s⁻².  
**g_eff ≈ 9.78 – 0.172 = 9.61 m s⁻²**  
*Reflection:* Both corrections must be applied simultaneously for ascent guidance.

## 6. Common traps and how to avoid them

| Trap                                      | Why it happens                                      | How to avoid it                                      |
|-------------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using 1/r² inside Earth                   | Forgetting Gauss’s law                            | Always check whether the point is inside or outside the mass distribution |
| Forgetting the factor of 2 in altitude formula | Treating only the denominator                      | Remember g ∝ 1/r² so two powers appear               |
| Applying centrifugal term at the pole     | Misidentifying the angle                          | Centrifugal component is zero only when cos φ = 0    |
| Ignoring oblateness when using latitude   | Treating Earth as perfect sphere                  | Use the International Gravity Formula or add the 21 km flattening term |
| Confusing height above ellipsoid with radial distance | GPS gives height above reference ellipsoid        | Convert to geocentric radius before applying 1/r²    |
| Using surface *g* for orbital period at low altitude | Neglecting the 2h/R term in Kepler’s law          | Replace *g* by *g*(1–2h/R) or use *GM*/r³ directly   |
| Sign error on depth formula               | Expecting field to increase with depth            | Remember enclosed mass decreases faster than 1/r²    |

## 7. The textbook-precise statement
For a spherically symmetric body of mass *M* and mean radius *R*, the gravitational acceleration at geocentric distance *r* is  
$$g(r)=\begin{cases}\frac{GM}{r^2} & r\ge R,\\\frac{GM}{R^3}r & r\le R\end{cases}$$  
(assuming uniform density for the interior). When the observer is on the rotating oblate Earth at geographic latitude *φ* and height *h* above the reference ellipsoid, add the centrifugal acceleration projected onto the local vertical and the small flattening correction; the resulting surface gravity is given by the International Gravity Formula (Moritz, *Geodetic Reference System 1980*, Bull. Géod. 54, 395, 1980).

## 8. Visual — diagram or schematic
```text
          North Pole (φ=90°)
               •
              /|\
             / | \   R_polar
            /  |  \
Equator  •----+----•  R_eq = R_polar + 21 km
            \  |  /
             \ | /
              \|/
               •  Centre
Altitude h:   observer at r = R + h
Depth d:      observer at r = R – d
Centrifugal:  ω²(R cos φ) outward from axis
```
Axes labelled: radial vector *r*, rotation axis vertical, local plumb line tilted by ~0.1° from *r* at mid-latitudes.

## 9. The memory technique
**The hook**  
Picture three arrows pulling *g* down: one arrow shortens when you climb a ladder (altitude), one arrow shrinks when you descend an elevator (depth), and one arrow is longest at the equator because the carousel spins fastest there.

**What to overlearn**  
1. Altitude: *g*(1 – 2h/R)  
2. Depth: *g*(1 – d/R)  
3. Equatorial centrifugal: 0.034 m s⁻²

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive from *GM*/r² plus Gauss’s law plus *ω*²*r* cos² φ.

## 10. What this unlocks
The corrections derived here are the starting point for orbital perturbation theory, satellite gravimetry, and inertial-navigation error budgets.  
- Next: effective potential in the rotating frame  
- Next: *J*₂ oblateness term in orbital elements  
- Next: free-air and Bouguer gravity anomalies  
- Next: launch-site selection trade studies

## 11. Self-check — five questions, no answers
1. A mine shaft reaches 2 km depth. By what fractional amount does *g* change if Earth is uniform?  
2. A balloon rises 30 km. Compute the percentage drop in *g* using both the exact 1/r² law and the linear approximation; compare the two results.  
3. At what latitude is the centrifugal reduction exactly half its equatorial value?  
4. Why does the depth formula predict *g* = 0 at the centre while the altitude formula does not?  
5. A gravimeter at 45° N reads 9.806 m s⁻² at sea level. After a 5 km ascent, what reading is expected once both altitude and latitude terms are included?