## 1. The one-sentence answer
**Similarity in fluid mechanics is the systematic reduction of a flow problem to a smaller set of dimensionless parameters so that a scaled model reproduces the essential physics of the prototype.**

Geometric similarity requires that all linear dimensions of the model and prototype stand in the same constant ratio; every angle is therefore identical. Kinematic similarity adds the requirement that velocity vectors at corresponding points are parallel and in the same constant ratio. Dynamic similarity further demands that all forces—pressure, viscous, inertial, gravitational—remain in fixed ratios, which is enforced by matching the governing dimensionless groups such as the Reynolds number.

When these three conditions hold, the nondimensional velocity and pressure fields become identical; measurements on the model therefore translate directly to the full-scale device by simple scaling rules.

> [!NOTE]
> The single most powerful insight is that once the Reynolds number is matched, the entire force balance of a viscous flow collapses to a universal curve independent of the separate values of density, velocity, length, or viscosity.

## 2. Why this matters — concrete and current
SpaceX uses Reynolds-number-matched wind-tunnel models of Starship at the NASA Ames 11-foot transonic facility to predict base heating and aerodynamic loads before each flight; the models are geometrically scaled by 1:50 yet produce force coefficients that collapse onto the same curve once Re = 1.4 × 10^6 is achieved.

In semiconductor manufacturing, ASML’s extreme-ultraviolet lithography tools rely on kinematic similarity of helium purge flows inside the scanner; matching both Reynolds and Mach numbers between the 1:4 test rig and the production tool guarantees that particle trajectories remain identical, reducing defect rates below one per wafer.

The Boeing 787 program validated its natural-laminar-flow wing using a 6.5 % dynamically scaled half-model in the NASA Langley National Transonic Facility; dynamic similarity at Re = 30 × 10^6 confirmed transition locations that later matched flight-test data within 2 % chord.

Marine-current-turbine developers at the European Marine Energy Centre scale 1:10 rotors in tow tanks to Re ≈ 10^6; the measured power curves collapse onto the full-scale prediction once both Reynolds and Froude numbers are satisfied, allowing certification without a full-scale prototype in every tidal site.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Dimensional homogeneity  | Guarantees that any physical equation can be rewritten in dimensionless form.        |
| Force balance on a fluid element | Supplies the inertial, viscous, and pressure terms that must scale identically. |
| Definition of viscosity  | Appears explicitly in the Reynolds number; without it the dynamic-similarity condition cannot be stated. |
| Boundary conditions      | Must be geometrically and kinematically similar for the nondimensional solution to be unique. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Geometric similarity
Two bodies are geometrically similar when every linear dimension of one is a fixed multiple of the corresponding dimension of the other.  
A 1:10 scale model of an airfoil has chord 10 cm if the prototype chord is 1 m; thickness ratio, camber, and all angles remain unchanged.  
Formally, if \(\mathbf{r}_m = \lambda \mathbf{r}_p\) for every point on the surface, then \(\lambda\) is constant.  
> [!WARNING]
> If the model distorts even one angle (e.g., a rounded leading edge becomes sharp), the location of separation changes and no later scaling can recover the correct forces.

### Step 2 — Kinematic similarity
Velocity vectors at corresponding points must be parallel and scaled by a single factor.  
In a water channel, if the free-stream velocity is reduced by 1/10 while the model is 1/10 size, the entire streamline pattern remains an exact scaled copy.  
Mathematically, \(\mathbf{V}_m(\mathbf{r}_m) = \alpha \mathbf{V}_p(\mathbf{r}_p)\).  
> [!WARNING]
> Matching only speeds at one point while leaving boundary-layer thickness mismatched destroys kinematic similarity; pressure gradients then diverge.

### Step 3 — Force ratios and dynamic similarity
Dynamic similarity requires every class of force—inertial, viscous, pressure—to stand in the same ratio everywhere.  
Consider the ratio of inertial to viscous force on a fluid element of size \(L\):  
\[
\frac{\text{inertial}}{\text{viscous}} = \frac{\rho V^2 L^2}{\mu V L} = \frac{\rho V L}{\mu}.
\]
When this ratio is identical for model and prototype, the nondimensional Navier–Stokes equations become identical.  
> [!WARNING]
> Treating “same speed” as sufficient ignores the length and viscosity dependence; a 1 m/s model in water does not replicate a 100 m/s aircraft in air.

### Step 4 — Emergence of the Reynolds number
The dimensionless group identified above is the Reynolds number  
\[
\text{Re} = \frac{\rho V L}{\mu}.
\]
Equality of Re is therefore the necessary and sufficient condition for dynamic similarity in incompressible, constant-property flow without free surfaces.  
> [!WARNING]
> For compressible or stratified flows, additional groups (Mach, Froude) must also match; matching only Re is then insufficient.

### Step 5 — Formal statement of complete similarity
A flow field is completely similar when geometric similarity, kinematic similarity, and equality of all relevant dimensionless force ratios (chiefly Re) are simultaneously satisfied. Under these conditions the nondimensional fields  
\[
\frac{\mathbf{V}}{V_\infty} = f\left(\frac{\mathbf{r}}{L},\text{Re}\right)
\]
are identical for model and prototype.

## 5. Worked examples — every step shown

**Example 1 — Simple pipe-flow scaling**  
*Given:* Prototype pipe diameter \(D_p = 0.2\) m, water at 20 °C (\(\rho = 998\) kg m^{-3}, \(\mu = 1.0 \times 10^{-3}\) Pa s), \(V_p = 2\) m s^{-1}. Model uses air at 20 °C (\(\rho_m = 1.2\) kg m^{-3}, \(\mu_m = 1.8 \times 10^{-5}\) Pa s).  
*Find:* Required model diameter and speed to match Re.  

Step 1: Compute prototype Re  
\[
\text{Re}_p = \frac{998 \times 2 \times 0.2}{1.0 \times 10^{-3}} = 4.0 \times 10^5.
\]  
*Why:* Direct substitution of the definition.  

Step 2: Set \(\text{Re}_m = \text{Re}_p\) and solve for \(V_m D_m\)  
\[
V_m D_m = \frac{\text{Re}_p \mu_m}{\rho_m} = 6.0\,\text{m}^2\text{s}^{-1}.
\]  
*Why:* Algebraic rearrangement of the Re equality.  

Step 3: Choose convenient model diameter \(D_m = 0.05\) m  
\[
V_m = \frac{6.0}{0.05} = 120\,\text{m s}^{-1}.
\]  
**Final answer:** \(D_m = 0.05\) m, \(V_m = 120\) m s^{-1}.  

*Reflection:* The high air speed illustrates why liquids are often preferred for low-speed model tests.

**Example 2 — Sphere drag coefficient**  
*Given:* A 1:5 model sphere tested in water at Re = 10^5 yields \(C_D = 0.47\).  
*Find:* Prototype drag in air at same Re.  

Prototype diameter 1 m, air \(\rho = 1.2\) kg m^{-3}, \(V_p = 30\) m s^{-1}.  

Because Re is matched, \(C_D\) is identical.  
\[
F_D = C_D \frac12 \rho V^2 A = 0.47 \times \frac12 \times 1.2 \times 30^2 \times \frac{\pi}{4} (1)^2 \approx 200\,\text{N}.
\]  
**Final answer:** 200 N.  

*Reflection:* The example shows that once Re matches, the coefficient itself becomes the transferable quantity.

**Example 3 — Boundary-layer thickness scaling**  
*Given:* Flat-plate boundary-layer thickness \(\delta/L \approx 5/\sqrt{\text{Re}_x}\). Model at 1:4 scale, same Re.  
*Find:* Ratio of physical thicknesses.  

At corresponding stations, Re\(_x\) identical implies \(\delta_m/L_m = \delta_p/L_p\).  
Thus \(\delta_m = \frac14 \delta_p\).  
**Final answer:** Physical boundary layer on model is one-quarter as thick.

*Reflection:* Kinematic similarity forces all lengths normalized by \(L\) to collapse.

**Example 4 — Incomplete similarity with free surface**  
*Given:* Ship model 1:50 in fresh water; prototype in seawater. Gravity waves present.  
*Find:* Why matching only Re fails.  

Froude number Fr = \(V/\sqrt{gL}\) must also match. Simultaneous satisfaction of Re and Fr forces incompatible fluid properties or speeds; hence complete dynamic similarity is impossible in a single test.  
**Final answer:** Two separate tests (Re-matched and Fr-matched) are required; extrapolation introduces uncertainty.

*Reflection:* The trap of single-parameter similarity appears when more than one dimensionless group governs the physics.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Matching only geometric scale     | Intuition that “smaller copy” is enough             | Always compute and equate all relevant dimensionless groups |
| Using the same fluid and speed    | Overlooks the explicit dependence of Re on \(\rho,\mu\) | Recalculate required speed or choose different fluid |
| Ignoring temperature effects on viscosity | Viscosity changes rapidly with temperature          | Control and report fluid temperature in every test   |
| Assuming dynamic similarity from equal Re alone in compressible flow | Mach number also matters                            | Verify Ma < 0.3 or match both Re and Ma              |
| Distorted model features          | Manufacturing tolerances on small radii             | Inspect critical curvatures with coordinate measurement |
| Neglecting wall effects in confined tests | Tunnel blockage alters effective Re                 | Keep blockage ratio < 5 % or apply blockage corrections |
| Forgetting that Re must be based on the correct reference length | Different conventions (chord vs. thickness)         | State the reference length explicitly in every Re    |

## 7. The textbook-precise statement
Two flows are dynamically similar if and only if they possess identical geometry, identical boundary conditions, and identical values of all independent dimensionless parameters appearing in the nondimensional Navier–Stokes equations. For incompressible flow with constant properties and no body forces other than gravity, the sole parameter is the Reynolds number  
\[
\text{Re} = \frac{\rho V_\text{ref} L_\text{ref}}{\mu}.
\]
When these conditions are met, the nondimensional fields \(\mathbf{V}^*(\mathbf{r}^*)\) and \(p^*(\mathbf{r}^*)\) are unique solutions of the same boundary-value problem. (White, *Fluid Mechanics*, 8e, §7.3.)

## 8. Visual — diagram or schematic

```text
Prototype          Model
   L_p               L_m = λ L_p
   V_p               V_m = (Re μ_m / ρ_m L_m)
   ρ_p, μ_p          ρ_m, μ_m

Flow field (nondimensional)
   V/V_ref = f(x/L, Re)   identical for both
```

The diagram shows two bodies, one scaled by λ, with arrows indicating that the nondimensional velocity field is a function only of nondimensional position and Re.

## 9. The memory technique

**The hook**  
Picture a tiny submarine and a full-size submarine; both “feel” the same water only when the ratio of their “push” to their “stickiness” (Re) is identical—imagine the fluid as a rubber sheet that must stretch the same way around each hull.

**What to overlearn**  
1. Definition \(\text{Re} = \rho V L / \mu\).  
2. Complete similarity requires geometric + kinematic + dynamic (Re) match.  
3. Once Re matches, all nondimensional force coefficients are identical.

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Start from the Navier–Stokes equations, nondimensionalize every term, and observe that the coefficient of the viscous term is exactly 1/Re; equality of Re then makes the equations identical.

## 10. What this unlocks

Mastery of Reynolds similarity permits immediate use of wind-tunnel and water-tunnel data for lift, drag, and heat-transfer prediction; it also supplies the foundation for more advanced similarity arguments involving Mach number, Froude number, and Rossby number.

- Next: compressible-flow similarity and Mach-number matching  
- Next: free-surface flows and Froude-number scaling  
- Next: stratified and rotating flows (Ekman, Rossby numbers)  
- Next: turbulence modeling and large-eddy similarity

## 11. Self-check — five questions, no answers

1. A 2 cm sphere falls at 0.3 m s^{-1} in glycerin; what speed must a 10 cm sphere have in the same glycerin to produce dynamically similar flow?  
2. Why does a 1:100 aircraft model tested at the same speed in air fail to reproduce prototype boundary-layer behavior?  
3. Two pipes of different diameters carry the same fluid at speeds chosen so Re is identical. Are the wall shear stresses identical? Explain quantitatively.  
4. A model submarine is tested in a wind tunnel at Re = 10^6; the prototype operates at Re = 10^9. What systematic error is introduced if transition is not artificially triggered on the model?  
5. Derive the condition under which geometric similarity alone guarantees kinematic similarity for creeping flow (Re ≪ 1).