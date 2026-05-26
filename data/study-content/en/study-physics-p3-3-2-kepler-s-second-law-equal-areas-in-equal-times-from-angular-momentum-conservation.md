## 1. The one-sentence answer
**Kepler's second law states that the radius vector from the Sun to a planet sweeps out equal areas in equal times because angular momentum is conserved under a central force.**

A central gravitational force always points exactly toward the Sun. Any force aligned with the position vector produces zero torque, so the angular momentum vector of the orbiting body cannot change. Because angular momentum magnitude is twice the product of mass and areal velocity, that areal velocity must remain constant.

The result is geometric: faster motion near the Sun is exactly offset by a shorter radius, and slower motion far from the Sun is offset by a longer radius, so the area swept per unit time stays the same.

> [!NOTE]
> The law is not an independent geometric rule; it is the direct, local consequence of zero torque. Once torque vanishes, equal areas follow automatically for any central-force orbit, bound or unbound.

## 2. Why this matters — concrete and current
SpaceX’s Starlink constellation uses the law to schedule station-keeping burns. Because areal velocity is fixed, a satellite’s angular speed is highest at perigee; operators therefore time thruster firings to exploit the brief high-speed window, minimizing propellant for the same change in orbital energy.

ESA’s Juice mission to Jupiter’s icy moons relies on the same conservation to design gravity-assist sequences. The area-sweep rate around each moon determines the precise deflection angle achievable in a single flyby; mission designers integrate the constant areal velocity analytically to meet tight arrival-time windows years in advance.

In exoplanet detection, radial-velocity surveys infer minimum planet mass from the host star’s wobble. The observed periodicity and amplitude are interpreted through the equal-area relation: the star and planet orbit their common barycenter with constant areal velocity, allowing the mass function to be extracted without assuming a circular orbit.

Cometary impact hazard assessment uses the law to propagate long-period orbits backward through the Oort cloud. Because areal velocity is conserved even on highly eccentric trajectories, astronomers can integrate only one scalar constant rather than the full six-element state vector when screening thousands of candidates for Earth-crossing risk.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Position and velocity vectors | Define the radius vector whose sweep rate we examine      |
| Cross product            | Expresses angular momentum and instantaneous area element |
| Torque                   | Links force direction to rate of change of angular momentum |
| Central-force motion     | Guarantees torque is identically zero                     |

## 4. Building the idea — from intuition to formalism

### Step 1 — Central force produces zero torque
A force directed exactly along the line connecting two bodies has no lever arm.  
Concrete example: the Sun’s gravity on a planet always lies along the planet’s position vector.  
Formally, torque \(\boldsymbol{\tau} = \mathbf{r} \times \mathbf{F}\). When \(\mathbf{F}\) is parallel to \(\mathbf{r}\), the cross product vanishes.  
> [!WARNING]
> If even a tiny transverse force component exists (e.g., solar radiation pressure mis-modeled), torque appears and areal velocity is no longer constant.

### Step 2 — Zero torque implies constant angular momentum
Newton’s second law for rotation states \(\boldsymbol{\tau} = d\mathbf{L}/dt\). With \(\boldsymbol{\tau} = \mathbf{0}\), \(\mathbf{L}\) is fixed in both magnitude and direction.  
Concrete example: a comet at 50 AU feels only radial solar gravity; its specific angular momentum vector remains the same vector it had at perihelion.  
\[
\mathbf{L} = \mathbf{r} \times m\mathbf{v} = \text{constant}.
\]

### Step 3 — Angular momentum magnitude equals twice mass times areal velocity
The magnitude of the cross product \(|\mathbf{r} \times \mathbf{v}|\) is \(r v_\perp\), the product of radius and tangential speed. The infinitesimal area swept is \(\frac12 r^2 d\theta = \frac12 r v_\perp dt\). Thus areal velocity is
\[
\frac{dA}{dt} = \frac{L}{2m}.
\]
Because \(L\) and \(m\) are constant, \(dA/dt\) is constant.

### Step 4 — The equal-area statement follows at once
Integrating the constant areal velocity between any two times \(t_1\) and \(t_2\) yields identical areas whenever the time interval is the same, regardless of where the body is in its orbit.

### Step 5 — Textbook statement of Kepler’s second law
A line joining a planet and the Sun sweeps out equal areas during equal intervals of time.

## 5. Worked examples — every step shown

**Example 1 — Circular orbit verification**  
*Given:* A satellite in circular low-Earth orbit, radius \(r = 6771\) km, speed \(v = 7.67\) km s\(^{-1}\).  
*Find:* Areal velocity.  
\[
L = m r v \quad \text{(velocity purely tangential)}
\]  
*Why:* Cross product reduces to \(r v\) when vectors are perpendicular.  
\[
\frac{dA}{dt} = \frac{r v}{2} = 2.60 \times 10^{4}\ \text{km}^2\text{s}^{-1}
\]  
**Final answer:** \(2.60 \times 10^{4}\) km² s⁻¹.  
*Reflection:* The calculation recovers the familiar \(\pi r^2 / T\) result, confirming consistency for the simplest case.

**Example 2 — Periapsis versus apoapsis speed ratio**  
*Given:* An elliptical orbit with eccentricity 0.3, semi-major axis 10 000 km.  
*Find:* Ratio of speeds at perigee and apogee.  
Angular momentum conservation: \(r_p v_p = r_a v_a\).  
*Why:* \(L/m\) is the same scalar at both points.  
\[
r_p = a(1-e),\quad r_a = a(1+e) \implies \frac{v_p}{v_a} = \frac{1+e}{1-e} = 1.857
\]  
**Final answer:** 1.857.  
*Reflection:* The inverse-radius relation emerges directly from constant areal velocity.

**Example 3 — Area swept in a 30-day arc**  
*Given:* Specific angular momentum \(h = 60 000\) km² s⁻¹.  
*Find:* Area swept in 30 days.  
\[
\frac{dA}{dt} = \frac h2 = 30 000\ \text{km}^2\text{s}^{-1}
\]  
*Why:* Definition of areal velocity.  
Area = \(30 000 \times 2.592 \times 10^6 = 7.776 \times 10^{10}\) km².  
**Final answer:** \(7.776 \times 10^{10}\) km².  
*Reflection:* Time interval alone determines area; orbital shape is irrelevant.

**Example 4 — Hyperbolic escape trajectory**  
*Given:* An interstellar object approaches on a hyperbola with asymptotic speed 10 km s⁻¹ and impact parameter 0.5 AU.  
*Find:* Areal velocity far from the Sun.  
Far away, velocity is parallel to the asymptote; angular momentum per unit mass is \(h = v_\infty b\).  
\[
\frac{dA}{dt} = \frac{v_\infty b}{2} = 1.118 \times 10^8\ \text{km}^2\text{s}^{-1}
\]  
**Final answer:** \(1.118 \times 10^8\) km² s⁻¹ (constant at all distances).  
*Reflection:* The law holds for unbound orbits; only the central-force assumption matters.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating areal velocity as linear speed | Confusing \(dA/dt\) with \(v\) | Always compute \(L/2m\) explicitly before numerical work |
| Assuming the law requires an ellipse | Historical association with Kepler’s first law | Derive from torque = 0; note validity for any conic section |
| Forgetting the ½ factor in area | Misremembering triangle area formula | Write \(dA = \frac12 \mathbf{r} \times d\mathbf{r}\) every time |
| Applying the law to non-central forces | Solar sails or drag appear “almost radial” | Verify torque is numerically negligible before invoking constancy |
| Using inertial versus rotating frames without care | Coriolis terms masquerade as torque | Stay in an inertial frame when computing \(\mathbf{L}\) |
| Neglecting that L is a vector | Direction also fixed, implying planar motion | Confirm \(\mathbf{L}\) points normal to the orbital plane once |
| Confusing specific and total angular momentum | Mass cancels only in specific form | Decide at the outset whether working per unit mass |

## 7. The textbook-precise statement
Under an inverse-square central gravitational force, the radius vector from the primary to the secondary sweeps out area at the constant rate
\[
\frac{dA}{dt} = \frac{h}{2},
\]
where \(h = |\mathbf{r} \times \mathbf{v}|\) is the specific angular momentum (Vallado, *Fundamentals of Astrodynamics and Applications*, 4e, §1.4, Eq. 1-23). The result follows at once from \(\dot{\mathbf{h}} = \mathbf{r} \times \mathbf{a} = \mathbf{0}\) whenever acceleration \(\mathbf{a}\) is parallel to \(\mathbf{r}\).

## 8. Visual — diagram or schematic
```text
          v_perp
            ^
            |
   r(t) --> o---------> area dA in dt
   /        \
  /          \   Sun at focus
 /            \
o--------------o   planet positions at t and t+dt
     r(t+dt)
```
The radius vector rotates through angle \(d\theta\); the triangular sector has area \(\frac12 r^2 d\theta = \frac12 r v_\perp dt\).

## 9. The memory technique

1. **The hook** — Picture a lawn sprinkler at the Sun throwing water at constant volume per minute; the “area” the water covers per minute is fixed no matter how far the grass is.  
2. **What to overlearn** — \(h = r v_\perp =\) constant; \(\frac{dA}{dt} = h/2\).  
3. **Spaced-repetition schedule** — Review derivation at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from \(\boldsymbol{\tau} = \mathbf{r} \times \mathbf{F}\); if \(\mathbf{F} \parallel \mathbf{r}\) then \(\dot{\mathbf{h}} = 0\), hence constant areal speed.

## 10. What this unlocks
Kepler’s second law supplies the conserved scalar that reduces the two-body problem from six to five degrees of freedom and enables analytic expressions for flight-path angle and time-of-flight.  

- Orbit equation derivation (polar conic form)  
- Vis-viva equation via energy–angular-momentum interplay  
- Lambert’s problem solvers used in rendezvous planning  
- Frozen-orbit design via averaged perturbation equations  
- Stability analysis of Lagrange points in the circular restricted three-body problem  

## 11. Self-check — five questions, no answers
1. A force field contains a small azimuthal component proportional to \(1/r^2\). Does areal velocity remain constant?  
2. Derive the time required to sweep a quarter of the orbital area for an ellipse of eccentricity 0.5 starting from perigee.  
3. Two satellites share the same specific angular momentum but have different energies. Which one sweeps area faster?  
4. In a Sun-centered frame, a solar sail produces a constant transverse acceleration of \(10^{-6}\) m s\(^{-2}\). After one year, by what percentage has the areal velocity changed?  
5. Show that the law still holds when the orbiting body has variable mass (e.g., a rocket expelling exhaust radially).