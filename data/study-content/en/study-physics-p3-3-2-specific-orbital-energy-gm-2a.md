## 1. The one-sentence answer
**Specific orbital energy ε is the constant total mechanical energy per unit mass of a satellite in a two-body Keplerian orbit and equals −GM/(2a) for any closed elliptical trajectory.**

This quantity is obtained by adding the specific kinetic energy ½v² to the specific gravitational potential −GM/r. Because the two-body problem conserves mechanical energy and the orbit is periodic, the sum remains fixed at every point along the path. The only geometric parameter that can carry this fixed value is the semi-major axis a, which therefore appears in the denominator of the final expression.

The negative sign signals that the orbit is bound: the satellite does not possess enough energy to reach infinity. Changing a stretches or shrinks the ellipse while keeping ε strictly determined by that single length.

> [!NOTE]
> The numerical value of ε depends only on a, not on eccentricity; two orbits with identical semi-major axes but wildly different shapes share exactly the same specific energy.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 and Starship guidance algorithms evaluate ε after every upper-stage burn to decide whether the instantaneous state lies on a safe elliptical coast arc or has already reached escape; the onboard flight computer compares the computed −GM/(2a) against a stored threshold before committing to the next relight.

NASA’s Artemis I trajectory-design team used the same relation to set the precise semi-major axis of the near-rectilinear halo orbit that Orion occupies around the Moon; a 100 km change in a produces a 0.5 m s⁻¹ change in ε that must be absorbed by the service-module propulsion budget.

Planet Labs’ daily tasking of the Dove constellation relies on ε to propagate each satellite’s mean anomaly over weeks without numerical integration; because ε fixes a, the orbital period is known to centimetre-level accuracy from a single GPS fix.

ESA’s Space Safety Programme screens thousands of catalogued objects each day by computing ε from two-line elements; objects whose ε lies above the GEO value −GM/(2aGEO) are flagged as potential GTO or lunar-escape candidates requiring collision-avoidance priority.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Specific quantities      | All energies are expressed per unit mass, removing m from every term |
| Newtonian gravitational potential | The −GM/r term is the only source of potential energy in the two-body problem |
| Conservation of mechanical energy | The constancy of ε follows directly from the absence of non-conservative forces |
| Definition of semi-major axis a | a is the sole orbital element that appears in the final energy expression |

## 4. Building the idea — from intuition to formalism

### Step 1 — Total mechanical energy per unit mass
Mechanical energy is the sum of kinetic and gravitational potential contributions. When divided by satellite mass the result is specific energy ε = ½v² − GM/r. This quantity is conserved along any coasting arc because gravity is conservative.

### Step 2 — Evaluate at an arbitrary point
At any true anomaly the speed v and radial distance r are related by the polar equation of the orbit, yet the numerical value of ε must remain identical regardless of the chosen point.

### Step 3 — Introduce the vis-viva equation
The vis-viva relation supplies v² = GM(2/r − 1/a). Substituting this expression for v² directly into the specific-energy definition yields ε = GM(1/r − 1/(2a)) − GM/r.

### Step 4 — Algebraic simplification
The two 1/r terms cancel, leaving ε = −GM/(2a). The cancellation occurs at every point on the ellipse, proving that the constant equals −GM/(2a).

### Step 5 — Sign and binding condition
Because a is positive for an ellipse, ε is negative. A negative value means kinetic energy is insufficient to cancel the absolute value of potential energy at infinity, so the trajectory remains bound.

### Step 6 — Extension to other conics
For a parabola a → ∞ and ε = 0; for a hyperbola a is taken negative by convention and ε becomes positive, recovering the same algebraic form.

## 5. Worked examples — every step shown

**Example 1 — Low-Earth circular orbit**  
*Given:* Altitude 300 km above Earth, R_E = 6378 km, μ = GM = 3.986 × 10¹⁴ m³ s⁻².  
*Find:* ε.  

Radius r = 6378 + 300 = 6678 km = 6.678 × 10⁶ m.  
For a circle, a = r.  
ε = −μ/(2a)  
= −3.986 × 10¹⁴ / (2 × 6.678 × 10⁶)  
= −2.985 × 10⁷ J kg⁻¹.  

**−2.985 × 10⁷ J kg⁻¹**  

*Reflection:* The example is simple because a equals r; the same formula applies unchanged to any ellipse once a is known.

**Example 2 — Molniya orbit**  
*Given:* a = 26 554 km, e = 0.72.  
*Find:* ε.  

ε = −μ/(2a)  
μ = 3.986 × 10¹⁴ m³ s⁻², a = 2.6554 × 10⁷ m.  
ε = −3.986 × 10¹⁴ / (2 × 2.6554 × 10⁷)  
= −7.515 × 10⁶ J kg⁻¹.  

**−7.515 × 10⁶ J kg⁻¹**  

*Reflection:* Eccentricity never entered the calculation; only a matters.

**Example 3 — Escape trajectory check**  
*Given:* Position r = 42 164 km, v = 3.074 km s⁻¹ (GEO circular speed).  
*Find:* ε and confirm it is zero for escape.  

ε = ½v² − μ/r  
v = 3074 m s⁻¹, μ/r = 3.986 × 10¹⁴ / 4.2164 × 10⁷ = 9.453 × 10⁶ m² s⁻².  
½v² = ½(3074)² = 4.726 × 10⁶ m² s⁻².  
ε = 4.726 × 10⁶ − 9.453 × 10⁶ = −4.727 × 10⁶ J kg⁻¹.  

To reach escape the speed must be increased until ε = 0.  

**−4.727 × 10⁶ J kg⁻¹**  

*Reflection:* The negative value shows the GEO orbit is still bound; escape requires raising ε to zero.

**Example 4 — From two position–velocity vectors**  
*Given:* r = 7000 km, v = 8.0 km s⁻¹, flight-path angle 30°.  
*Find:* ε and the implied a.  

Specific kinetic energy = ½(8000)² = 3.2 × 10⁷ m² s⁻².  
Specific potential = −3.986 × 10¹⁴ / 7 × 10⁶ = −5.694 × 10⁷ m² s⁻².  
ε = 3.2 × 10⁷ − 5.694 × 10⁷ = −2.494 × 10⁷ J kg⁻¹.  
a = −μ/(2ε) = −3.986 × 10¹⁴ / (2 × −2.494 × 10⁷) = 8.00 × 10⁶ m = 8000 km.  

**a = 8000 km**  

*Reflection:* The radial velocity component is automatically included once the scalar speed is used; the result yields a directly.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using r instead of a in the energy formula | Circular-orbit intuition is over-generalised | Always extract a from the orbit equation or vis-viva before computing ε |
| Forgetting the factor ½ in kinetic energy | Algebraic slip when substituting vis-viva | Write ½v² explicitly each time |
| Sign error on hyperbolic orbits | Treating a as positive when the standard convention is negative | Adopt the signed-a convention consistently |
| Confusing specific energy with total energy | Forgetting that m has been divided out | Keep all symbols lower-case for specific quantities |
| Applying the formula inside an atmosphere | Drag removes the conservation premise | Verify that the arc is above sensible atmosphere before using ε |
| Mixing units (km vs m) in μ | μ is usually quoted in m³ s⁻² | Convert a to metres before dividing |
| Assuming ε changes at perigee burn | Forgetting that an impulsive Δv instantly changes ε | Recalculate ε after every Δv using the new v |

## 7. The textbook-precise statement
In the two-body problem with inverse-square gravitation, the specific mechanical energy  
ε = ½v² − μ/r  
is constant along any coasting trajectory. For an elliptical orbit the constant equals −μ/(2a), where a is the semi-major axis. This identity follows at once from substitution of the vis-viva equation v² = μ(2/r − 1/a) and holds under the assumptions of point-mass gravity, no drag, and no third-body perturbations. (Bate, Mueller & White, *Fundamentals of Astrodynamics*, Dover 1971, §2.4.)

## 8. Visual — diagram or schematic

```text
          Apogee
            *
           / \
          /   \
Perigee  /     \   a
   *----/-------\----*----> direction of motion
        \       /
         \     /
          \   /
           \ /
            *   Focus (Earth)
```
Horizontal major axis length 2a; focus offset by ae. Energy ε is identical at every point on the ellipse and depends only on a.

## 9. The memory technique

1. **The hook** — Picture a stretched rubber band whose length is 2a; the stored “tension” you feel is exactly −GM/(2a).  
2. **What to overlearn** — ε = −GM/(2a); a > 0 for ellipses, a → ∞ for parabolas, a < 0 for hyperbolas.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from ε = ½v² − GM/r, insert vis-viva, cancel 1/r terms.

## 10. What this unlocks
Mastery of specific orbital energy supplies the direct bridge to orbital period, escape speed, and the rocket equation expressed in terms of Δε.  

- Vis-viva equation and orbital speed at any radius  
- Hohmann and bi-elliptic transfer Δv budgets  
- Sphere-of-influence patching for interplanetary trajectories  
- Lifetime estimation under atmospheric drag via secular change in a (hence in ε)

## 11. Self-check — five questions, no answers
1. A satellite is observed at r = 10 000 km with v = 7 km s⁻¹; compute ε and the corresponding a.  
2. Two elliptical orbits share the same apogee radius but have different perigees. Do they necessarily share the same ε?  
3. An impulsive burn raises ε from −30 MJ kg⁻¹ to −20 MJ kg⁻¹. By what factor does a change?  
4. Why does the specific-energy formula remain valid even when the flight-path angle is 45°?  
5. A proposed lunar transfer orbit yields ε = +2 MJ kg⁻¹. Is the trajectory bound or unbound, and what does the sign imply for arrival hyperbolic excess speed?