## 1. The one-sentence answer
**In a central gravitational field the specific mechanical energy and the specific angular momentum of a spacecraft or planet are each constant along its trajectory.**

A gravitational force directed exactly toward a fixed point exerts no torque about that point, so the angular momentum vector cannot change. The same central force is conservative, so the sum of kinetic and potential energy per unit mass also stays fixed. These two invariants together replace Newton’s second law with two algebraic constants that fully constrain the shape, size, and plane of any orbit.

The constancy of angular momentum forces motion to remain in a single plane and produces the 1/r² dependence of areal velocity that Kepler observed. The constancy of energy then selects the precise curve—circle, ellipse, parabola, or hyperbola—inside that plane. Together they convert a differential equation into geometry.

> [!NOTE]
> The two constants replace an entire second-order vector differential equation; once you know h and ε you can write the orbit equation without integrating again.

## 2. Why this matters — concrete and current
SpaceX computes the C₃ (twice the specific energy) of every Falcon 9 upper stage to decide whether a payload reaches escape or remains captured; the same number appears on the launch checklist for all interplanetary missions.

ESA’s Juice spacecraft, launched in 2023, uses a sequence of Earth and Venus gravity assists whose trajectories are designed by holding specific angular momentum constant between burns; any drift in the measured h vector would indicate an unmodeled torque from solar radiation pressure.

Planet-formation codes at the Carnegie Institution integrate thousands of planetesimals under mutual gravity; conservation of angular momentum about the central star is enforced at every time step so that total angular momentum error remains below 10⁻¹², allowing reliable statistics on final orbital spacings.

The U.S. Space Force’s orbital warfare simulators maintain real-time catalogues of resident space objects by propagating two-line element sets with the vis-viva equation derived directly from energy conservation; the same constants allow rapid re-acquisition after maneuvers.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector cross product     | Defines specific angular momentum h = r × v               |
| Work–energy theorem      | Shows that a central 1/r² force is conservative           |
| Polar coordinates        | Simplifies the orbit equation once h is constant          |
| Newton’s law of gravitation | Supplies the force law whose central character yields both conservations |

## 4. Building the idea — from intuition to formalism

### Step 1 — Central force implies zero torque
A gravitational force lies exactly along the line connecting the two bodies.  
Example: at position r the force is –(μ m / r²) ê_r; the lever arm from the origin is also r, so torque = r × F = 0.  
Formally,  
$$
\boldsymbol{\tau} = \mathbf{r} \times \mathbf{F} = 0 \implies \frac{d\mathbf{h}}{dt} = 0,
$$  
where h = r × v is specific angular momentum.  
> [!WARNING]  
> If the force is even slightly non-central (oblateness, third body), h precesses and the orbital plane is no longer fixed.

### Step 2 — Angular momentum fixes the orbital plane
Because h is constant in both magnitude and direction, r and v must always remain perpendicular to the same fixed vector; motion is confined to a single plane.  
The scalar magnitude h = |r × v| = r v_⊥ is therefore constant.

### Step 3 — Areal velocity is constant
The area swept by r in time dt is (1/2) r v_⊥ dt, so  
$$
\frac{dA}{dt} = \frac{h}{2} = \text{constant}.
$$  
This is Kepler’s second law recovered from first principles.

### Step 4 — Gravity is conservative
The gravitational force derives from the potential U = –μ/r.  
The work done along any closed path is zero, therefore specific mechanical energy  
$$
\varepsilon = \frac{v^2}{2} - \frac{\mu}{r}
$$  
is constant.

### Step 5 — Two constants replace the differential equation
With h and ε known, the radial speed is  
$$
v_r = \pm\sqrt{2(\varepsilon + \mu/r) - (h/r)^2}.
$$  
Eliminating time yields the polar orbit equation  
$$
r = \frac{h^2/\mu}{1 + e\cos\theta},
$$  
where the eccentricity e = √(1 + 2ε h²/μ²) is fixed by the two constants.

### Step 6 — Conic-section classification
The sign of ε selects the curve: ε < 0 (ellipse), ε = 0 (parabola), ε > 0 (hyperbola). This is the textbook statement reached from conservation alone.

## 5. Worked examples — every step shown

**Example 1 — Circular low-Earth orbit**  
*Given:* Altitude 300 km, μ = 3.986 × 10¹⁴ m³ s⁻², R_E = 6378 km.  
*Find:* Specific angular momentum h and specific energy ε.  

v = √(μ/r), r = 6678 km.  
Why: centripetal acceleration equals gravitational acceleration.  
h = r v = √(μ r).  
Why: v_⊥ = v for circular motion.  
ε = v²/2 – μ/r = –μ/(2r).  
Why: kinetic and potential terms for circular orbit.  
**h = 5.213 × 10¹⁰ m² s⁻¹, ε = –2.988 × 10⁷ J kg⁻¹**

*Reflection:* The negative energy immediately signals a closed orbit; h fixes the radius once μ is known.

**Example 2 — Escape from Earth’s surface**  
*Given:* r = R_E.  
*Find:* Escape speed and the value of ε.  

Set ε = 0 for parabolic escape: v_esc = √(2μ/r).  
Why: total energy zero means the body reaches infinity with zero speed.  
**v_esc = 11.18 km s⁻¹, ε = 0**

*Reflection:* Any launch faster than this value yields positive ε and a hyperbolic excess speed.

**Example 3 — Hohmann transfer to GEO**  
*Given:* LEO radius 6678 km, GEO radius 42164 km.  
*Find:* Δv at perigee.  

Energy on transfer ellipse:  
ε = –μ/(a_trans), a_trans = (r_LEO + r_GEO)/2.  
v_per = √[2(ε + μ/r_LEO)].  
Why: vis-viva equation from energy conservation.  
Circular LEO speed v_LEO = √(μ/r_LEO).  
Δv = v_per – v_LEO.  
**Δv = 2.455 km s⁻¹**

*Reflection:* Only energy and angular momentum at the burn point are required; no time integration needed.

**Example 4 — Hyperbolic flyby**  
*Given:* v_∞ = 6 km s⁻¹, impact parameter b = 10 000 km, μ = 3.986 × 10¹⁴ m³ s⁻².  
*Find:* turning angle δ.  

h = b v_∞.  
ε = v_∞²/2.  
e = √(1 + 2ε h²/μ²).  
δ = 2 arcsin(1/e) – 180°.  
**δ = 48.2°**

*Reflection:* The two constants fully determine the asymptotes without solving the trajectory differential equation.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using total energy instead of specific energy | Forgetting to divide by spacecraft mass | Always work with quantities per unit mass; μ appears without m |
| Treating h as a scalar when plane changes occur | h is a vector; only its component normal to the original plane is conserved under pure central gravity | Check that the force remains exactly radial before assuming h direction is fixed |
| Sign error in potential | Confusing U = –μ/r with the force law | Remember force = –∇U; negative sign is required for attraction |
| Applying vis-viva at the wrong focus | Using r measured from empty focus | Always measure r from the occupied focus (central body) |
| Ignoring that h fixes only the plane, not the node | Precession or third-body torques rotate the plane | Verify central-force assumption before claiming nodal constancy |
| Setting ε = 0 for circular orbits | Misremembering escape condition | Circular orbits have ε = –μ/(2r) < 0 |
| Forgetting units when mixing km and m | Inconsistent r and μ | Convert once at the start and keep SI throughout |

## 7. The textbook-precise statement
In an inverse-square central gravitational field the specific angular momentum  
$$
\mathbf{h} = \mathbf{r} \times \mathbf{v}
$$  
and the specific mechanical energy  
$$
\varepsilon = \frac{v^2}{2} - \frac{\mu}{r}
$$  
are both constant. Consequently every trajectory is a conic section lying in the plane normal to h, with eccentricity  
$$
e = \sqrt{1 + \frac{2\varepsilon h^2}{\mu^2}}.
$$  
(Vallado, *Fundamentals of Astrodynamics and Applications*, 4e, §2.2–2.3.)

## 8. Visual — diagram or schematic
```text
          h (out of page)
               ↑
   v_perp      |      
     ↗         | r
    /          |
   ●-----------+----------> θ
   spacecraft   focus (central body)
```
The radius vector r lies in the plane perpendicular to the fixed vector h. The perpendicular velocity component v_⊥ produces the areal rate h/2. The angle θ is measured from periapsis.

## 9. The memory technique

1. **The hook** — Picture a frozen ice-skater pulling in her arms: angular momentum (the spin) stays constant while energy (the effort) decides whether she escapes the gravitational “well” or stays bound in an elliptical “track”.  
2. **What to overlearn** — h = r × v (vector), ε = v²/2 – μ/r, and the eccentricity formula e = √(1 + 2ε h²/μ²).  
3. **Spaced-repetition schedule** — Review the two conservation statements at 1 day, 3 days, 7 days, 16 days, 35 days after first study.  
4. **First-principles fallback** — Re-derive torque = 0 from r parallel to F, then integrate F·dr to obtain the potential; the constants follow at once.

## 10. What this unlocks
These two constants are the foundation of every subsequent orbit calculation.  
- They yield the vis-viva equation used for Δv budgeting.  
- They produce the orbit equation that feeds Lambert’s problem solvers.  
- They allow analytic expressions for time-of-flight via Kepler’s equation.  
- They underpin perturbation theory when small non-central forces are added later.

## 11. Self-check — five questions, no answers
1. A spacecraft at r = 10 000 km has v = 8 km s⁻¹ perpendicular to r. Compute h and ε; is the trajectory elliptic, parabolic, or hyperbolic?  
2. Show that for any closed orbit the time-averaged kinetic energy equals –½ times the time-averaged potential energy.  
3. Two impulses are applied to a satellite on the same radial line. Which constant (h or ε) changes, and why?  
4. A hyperbolic excess speed of 3 km s⁻¹ is measured at infinity. What is the specific energy?  
5. An orbit has perigee radius 7000 km and apogee radius 42 000 km. Without calculating numbers, state whether its specific angular momentum is larger or smaller than that of a circular orbit at 7000 km, and justify.