## 1. The one-sentence answer
**Magnetic field of a current-carrying conductor is obtained by integrating the Biot-Savart law around the geometry, yielding closed-form expressions that differ sharply inside versus outside each shape.**

Straight wire produces a circling field whose strength falls as 1/r. Circular loop concentrates the field along its axis with a characteristic 1/(distance)^3 decay far away. Solenoid stacks many loops so the interior field becomes uniform and axial while the exterior nearly vanishes. Toroid bends the solenoid into a closed ring, confining the field strictly inside the toroidal volume. These four geometries form the practical toolkit for designing electromagnets, from lab coils to spacecraft magnetic torquers.

> [!NOTE]
> The single deepest insight is that symmetry plus Ampère’s law often replaces the full Biot-Savart integral; once you see the symmetry, the answer appears without evaluating a single complicated integral.

## 2. Why this matters — concrete and current
NASA’s Magnetospheric Multiscale mission uses precisely wound solenoids to generate calibration fields that must match the toroidal geometry of Earth’s magnetosphere within 0.1 %.  
ITER’s toroidal-field coils create a 5.3 T field inside a toroid of major radius 6.2 m; the B = μ₀ N I / (2 π r) expression directly sets the superconductor current and quench-protection thresholds.  
SpaceX Starlink satellites employ torque rods (air-core solenoids) whose on-orbit magnetic moment is calculated from the solenoid formula to desaturate reaction wheels without expending propellant.  
In semiconductor fabs, ASML’s EUV lithography tools rely on solenoid pairs to steer electron beams; any non-uniformity inside the solenoid appears as overlay error on the wafer.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Biot-Savart law          | Starting point for every B-field calculation              |
| Right-hand rule          | Fixes direction of dB and final B without sign errors     |
| Ampère’s circuital law   | Converts symmetry into algebraic answers for solenoid and toroid |
| Symmetry arguments       | Allows replacement of surface integrals by simple products |
| Vector cross product     | Encodes the 90° relationship between I, dl and r          |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Biot-Savart law as the microscopic source
Every infinitesimal current element Idl produces a magnetic field dB at a point whose magnitude is proportional to sinθ / r² and whose direction is perpendicular to both dl and the line to the observation point.  
Example: a 1 cm wire segment carrying 10 A observed 5 cm away at 90° gives dB = 4 × 10^{-7} T.  
Formal statement:  
$$d\vec{B}=\frac{\mu_0}{4\pi}\frac{I\,d\vec{l}\times\hat{r}}{r^2}.$$  
> [!WARNING]  
> Forgetting the cross product and writing only the scalar magnitude produces a field in the wrong direction and breaks every later symmetry argument.

### Step 2 — Straight wire via direct integration
Place an infinite wire along z; observation point at perpendicular distance r. Parameterise dl = dz hat z, r vector has constant cylindrical radius. The azimuthal components survive after integration while axial components cancel.  
Result:  
$$B_\phi=\frac{\mu_0 I}{2\pi r}.$$  
> [!WARNING]  
> Using a finite length without taking the limit L → ∞ yields an extra cosine factor that students often forget to remove.

### Step 3 — Circular loop on axis
For a loop of radius R lying in xy-plane, every dl is symmetric; only the z-component of dB survives. The integral reduces to a single variable after substituting the constant angle.  
$$B_z=\frac{\mu_0 I R^2}{2(R^2+z^2)^{3/2}}.$$  
At z = 0 the centre field is μ₀ I /(2R).

### Step 4 — Solenoid as continuum limit of stacked loops
When N loops per unit length are placed end-to-end, interior axial fields add while exterior fields largely cancel. Applying Ampère’s law to a rectangular loop that straddles the wall gives the textbook interior result B = μ₀ n I.

### Step 5 — Toroid via azimuthal symmetry
Bend the solenoid into a doughnut of mean radius R. The Amperian loop is now a circle of radius r inside the winding; enclosed current is N I.  
$$B_\phi=\frac{\mu_0 N I}{2\pi r}\quad(R_\text{inner}<r<R_\text{outer}).$$  
Outside the toroid the enclosed current is zero, so B = 0.

## 5. Worked examples — har step show karo

**Example 1 — Infinite straight wire at 3 cm**  
*Given:* I = 5 A, r = 0.03 m.  
*Find:* B.  
Apply formula directly:  
$$B=\frac{4\pi\times10^{-7}\times5}{2\pi\times0.03}=3.33\times10^{-5}\,\text{T}.$$  
*Why:* Distance is measured perpendicular to the wire; azimuthal direction follows right-hand rule.  
**3.33 × 10^{-5} T**  

*Reflection:* The 1/r dependence means field is strong only near the wire; this is why return paths must be kept far away in circuit design.

**Example 2 — Single loop centre field**  
*Given:* R = 0.1 m, I = 2 A.  
*Find:* B at centre.  
$$B=\frac{\mu_0 I}{2R}=\frac{4\pi\times10^{-7}\times2}{2\times0.1}=1.257\times10^{-5}\,\text{T}.$$  
*Why:* z = 0 simplifies the general loop expression to this compact form.  
**1.257 × 10^{-5} T**  

*Reflection:* Doubling radius halves the field; this trade-off appears in helmholtz-coil design.

**Example 3 — Long solenoid**  
*Given:* n = 200 turns/m, I = 3 A.  
*Find:* interior B.  
$$B=\mu_0 n I=4\pi\times10^{-7}\times200\times3=7.54\times10^{-4}\,\text{T}.$$  
*Why:* End effects neglected only when length ≫ diameter.  
**7.54 × 10^{-4} T**  

*Reflection:* The field is independent of radius inside—an extremely useful feature for uniform-field experiments.

**Example 4 — Toroid with 500 turns**  
*Given:* N = 500, I = 4 A, r = 0.15 m.  
*Find:* B inside winding.  
$$B=\frac{\mu_0 N I}{2\pi r}=2.67\times10^{-3}\,\text{T}.$$  
*Why:* All 500 turns are enclosed by the Amperian circle at r.  
**2.67 × 10^{-3} T**  

*Reflection:* Outside the toroid B drops exactly to zero only in the ideal case of infinite turns per radian.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                              |
|-------------------------------------|---------------------------------------------|----------------------------------------------|
| Using 2πr instead of 2r for loop centre | Confusing loop with straight-wire formula   | Memorise B_loop centre = μ₀I/2R first        |
| Forgetting n = N/L in solenoid      | Treating n as total turns                   | Always write n = turns per metre             |
| Applying toroid formula outside     | Missing that enclosed current becomes zero  | Draw Amperian loop and count enclosed turns  |
| Sign error in right-hand rule       | Treating dl × r as commutative              | Physically curl fingers around current       |
| Ignoring finite-length correction   | Assuming L → ∞ without checking aspect ratio| Use exact elliptic-integral expressions when L < 10 D |

## 7. The textbook-precise statement
Griffiths, *Introduction to Electrodynamics*, 4e, §5.4–5.5 states: “For an infinite straight wire, a circular loop, an ideal solenoid and an ideal toroid, the magnetic field is given respectively by  
B = (μ₀ I)/(2 π s) φ-hat (wire),  
B = (μ₀ I R²)/(2 (R² + z²)^{3/2}) z-hat (loop axis),  
B = μ₀ n I z-hat (inside solenoid),  
B = (μ₀ N I)/(2 π s) φ-hat (inside toroid),  
provided the observation point lies in the region where the stated symmetry arguments hold and the conductors are assumed perfectly rigid and infinitely thin.”

## 8. Visual — diagram or schematic
```
          z
          ↑
   ───────┼───────   straight wire along z
          │
   r ─────┼────────► observation point (cylindrical r)
          │
Toroid cross-section:
   (R-r)   (R)   (R+r)
     ●───────●───────●   windings
        inside   B_phi
```
The diagram shows the three radial zones of a toroid and the single perpendicular distance for a straight wire.

## 9. The memory technique
1. **The hook** — Imagine your right hand gripping the wire or coil; thumb points with current, fingers curl exactly in the direction of B.  
2. **What to overlearn** — B_wire = μ₀I/(2πr), B_solenoid = μ₀nI, B_toroid = μ₀NI/(2πr).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from Biot-Savart, exploit cylindrical or azimuthal symmetry, apply Ampère’s law to the appropriate Amperian loop.

## 10. What this unlocks
These four canonical solutions become the building blocks for designing magnetic nozzles in electric propulsion, calculating mutual inductance between coils, and understanding tokamak plasma confinement.  
- Next: vector potential A for the same geometries  
- Force between parallel wires (definition of ampere)  
- Magnetic moment and torque on current loops in uniform fields  

## 11. Self-check — five questions, no answers
1. A wire of length 2 m carrying 8 A produces what B at 4 cm perpendicular distance if the return path is 2 m away?  
2. At what axial distance from a 5 cm radius loop does the field fall to 1 % of its centre value?  
3. A 30 cm long solenoid of 400 turns must produce 0.02 T; what current is required?  
4. Why does the toroid formula contain 2πr in the denominator while the solenoid formula does not?  
5. If the toroid winding has a small gap, where does the field leak and by how much qualitatively?