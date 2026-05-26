## 1. The one-sentence answer
**Pascal's law states that any change in pressure applied to an enclosed incompressible fluid is transmitted undiminished and equally in all directions throughout the fluid.**

Pressure at any point inside a static fluid depends only on depth and density. When an external force increases pressure at one location, every other point experiences exactly the same increase because the fluid cannot sustain shear stress at rest and therefore redistributes the force through normal stresses alone. The result is that a small force applied over a small area produces an identical pressure everywhere, which can then act over a much larger area to multiply the output force.

This equality holds only for fluids that are both enclosed and effectively incompressible on the timescale of interest. The law therefore supplies the operating principle for every hydraulic actuator, from vehicle brakes to rocket-gimbal systems.

> [!NOTE]
> The decisive insight is that pressure is a scalar: once the fluid is in equilibrium, the force per unit area is identical on every face of an imaginary cube inside the fluid, regardless of orientation.

## 2. Why this matters — concrete and current
SpaceX uses hydraulic power units on Falcon 9 to gimbal the Merlin engines. A small pump raises pressure in an enclosed oil circuit; Pascal’s law guarantees that the same pressure reaches each actuator piston, delivering precise thrust-vector control without pressure drop along the lines.

Semiconductor manufacturers employ hydraulic presses rated above 100 MPa to flatten wafers during lithography. Because pressure transmits uniformly, the force on the wafer remains constant across its entire surface even when the press platens are slightly misaligned.

Deep-sea submersibles such as Alvin maintain internal atmospheric pressure while external pressure exceeds 40 MPa. The hull experiences uniform compression precisely because any local pressure increment is transmitted equally through the surrounding seawater, eliminating shear concentrations that would otherwise buckle the structure.

Aircraft flight-control systems on the Boeing 787 replace mechanical linkages with electro-hydraulic actuators. A central hydraulic reservoir at 35 MPa supplies identical pressure to every actuator; the law ensures that a command to one surface does not starve pressure from another.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definition of pressure   | Pressure = normal force per unit area; the law is a statement about this scalar quantity. |
| Hydrostatic equilibrium  | Net force on any fluid element must be zero; otherwise pressure would not be uniform. |
| Incompressibility        | Volume change would absorb the pressure increment; the law assumes negligible density change. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Pressure is force per unit area, normal to any surface
A fluid at rest cannot support shear. Therefore the only force it exerts on a surface is perpendicular to that surface.  
Consider a 1 cm² patch on the wall of a closed tank; the force is \(F = pA\) where \(p\) is the same no matter which direction the patch faces.  
\[
p = \frac{F_\perp}{A}
\]
> [!WARNING]
> Treating pressure as a vector leads to the false conclusion that pressure could point “along the pipe”; pressure has no direction.

### Step 2 — Equilibrium of an infinitesimal fluid element
Draw a tiny cube of side \(\delta x\) inside the fluid. The pressure on each pair of opposite faces must be equal; otherwise a net force would accelerate the element, violating static equilibrium.  
The three normal stresses are therefore identical: \(p_x = p_y = p_z = p\).

### Step 3 — External pressure increment at one boundary
Apply an additional force \(\Delta F\) over area \(A_0\) at one point on the container. This instantly raises the pressure at that boundary by \(\Delta p = \Delta F / A_0\). Because the fluid cannot expand or shear, the same \(\Delta p\) must appear on every face of every internal cube to keep the element in equilibrium.

### Step 4 — Propagation without loss
The pressure change propagates at the speed of sound in the fluid (effectively instantaneous for incompressible liquids). Once equilibrium is restored, the new pressure field is the old field plus the constant \(\Delta p\) everywhere.

### Step 5 — Formal statement of Pascal’s law
Any pressure change \(\Delta p\) applied to an enclosed incompressible fluid appears undiminished at every point:
\[
p(\mathbf{r}) = p_0(\mathbf{r}) + \Delta p
\]
where \(p_0\) is the original hydrostatic distribution.

## 5. Worked examples — every step shown

**Example 1 — Hydraulic jack, basic force multiplication**  
*Given:* Input piston area \(A_1 = 2\,\text{cm}^2\), output piston area \(A_2 = 200\,\text{cm}^2\), input force \(F_1 = 100\,\text{N}\).  
*Find:* Output force \(F_2\).  

Pressure created at input:  
\[
p = \frac{F_1}{A_1} = \frac{100\,\text{N}}{2 \times 10^{-4}\,\text{m}^2} = 5 \times 10^5\,\text{Pa}.
\]  
*Why:* Definition of pressure.  

This pressure is transmitted unchanged:  
\[
F_2 = p A_2 = 5 \times 10^5\,\text{Pa} \times 2 \times 10^{-2}\,\text{m}^2 = 10^4\,\text{N}.
\]  
*Why:* Pascal’s law.  

**Final answer**  
**\(F_2 = 10\,\text{kN}\)**

*Reflection:* The example is simple because areas are given directly; the same pressure appears on both pistons.

**Example 2 — Two pistons at different elevations**  
*Given:* Same jack, but output piston is 0.5 m higher; oil density \(\rho = 850\,\text{kg m}^{-3}\).  
*Find:* Exact output force.  

Hydrostatic correction:  
\[
\Delta p_\text{hydro} = \rho g h = 850 \times 9.81 \times 0.5 \approx 4.15\,\text{kPa}.
\]  
*Why:* Hydrostatic pressure increase with depth.  

Net pressure on output piston:  
\[
p_2 = p_1 - \Delta p_\text{hydro}.
\]  
*Why:* Pressure decreases as height increases.  

\[
F_2 = (5 \times 10^5 - 4150) \times 0.02 \approx 9.917\,\text{kN}.
\]  

**Final answer**  
**\(F_2 \approx 9.92\,\text{kN}\)**

*Reflection:* The correction is small but illustrates that Pascal’s law transmits the *change*, not the absolute pressure.

**Example 3 — Force on a submerged valve**  
*Given:* A 10 cm diameter valve at 20 m depth in seawater (\(\rho = 1025\,\text{kg m}^{-3}\)), surface pressure 101 kPa.  
*Find:* Force on the valve disk.  

Pressure at depth:  
\[
p = p_\text{atm} + \rho g h = 101 + 1025 \times 9.81 \times 20 = 302.7\,\text{kPa}.
\]  
*Why:* Hydrostatic equation plus Pascal transmission from surface.  

Force:  
\[
F = p \times \pi r^2 = 302.7 \times 10^3 \times \pi (0.05)^2 \approx 2.38\,\text{kN}.
\]  

**Final answer**  
**\(F \approx 2.38\,\text{kN}\)**

*Reflection:* Surface atmospheric pressure is transmitted fully to depth; omitting it is a common error.

**Example 4 — Closed cylinder with thermal expansion**  
*Given:* A completely filled, rigid cylinder, initial pressure 1 MPa, temperature rise that would expand fluid by 0.2 % if free. Bulk modulus \(K = 1.5\,\text{GPa}\).  
*Find:* Pressure increase.  

Volumetric strain equals pressure change divided by bulk modulus:  
\[
\frac{\Delta V}{V} = -\frac{\Delta p}{K} \implies \Delta p = -K \frac{\Delta V}{V}.
\]  
*Why:* Definition of bulk modulus for confined fluid.  

\[
\Delta p = 1.5 \times 10^9 \times 0.002 = 3\,\text{MPa}.
\]  

**Final answer**  
**New pressure = 4 MPa**

*Reflection:* Even tiny volume changes produce large pressure rises when the fluid is confined, showing why relief valves are mandatory.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming pressure is higher at the output piston | Confusing force with pressure | Always compute \(p = F/A\) first; pressure is identical. |
| Forgetting atmospheric pressure on open systems | Treating gauge pressure as absolute | Add \(p_\text{atm}\) whenever absolute force on a surface is required. |
| Applying the law to gases without checking compressibility | Gases change density appreciably | Verify Mach number ≪ 1 or use bulk modulus criterion. |
| Neglecting elevation head in tall systems | Treating \(\Delta p\) as exactly uniform | Add \(\rho g \Delta h\) after applying Pascal’s increment. |
| Using the law on flowing fluids | Forgetting that shear appears once velocity gradients exist | Confirm flow is static or creeping before invoking the law. |
| Treating containers as perfectly rigid | Thin walls deflect and absorb \(\Delta p\) | Include vessel compliance when \(\Delta p\) is large. |
| Sign error on hydrostatic correction | Depth measured upward instead of downward | Always define \(z\) increasing upward and use \(p = p_0 - \rho g z\). |

## 7. The textbook-precise statement
Pascal’s law (also called Pascal’s principle) asserts that, in a fluid at rest, an externally applied pressure increment is transmitted uniformly throughout the fluid. Formally, if an incompressible fluid of density \(\rho\) fills a connected domain \(\Omega\) bounded by rigid walls and is initially in hydrostatic equilibrium under body force \(\mathbf{g}\), then any additional normal stress \(\Delta p\) imposed on a portion of \(\partial\Omega\) produces a new pressure field
\[
p(\mathbf{x}) = p_\text{ref} - \rho \mathbf{g}\cdot\mathbf{x} + \Delta p, \quad \forall \mathbf{x}\in\Omega.
\]
The result follows from the vanishing of the deviatoric stress tensor in a Stokesian fluid at zero strain rate (White, *Fluid Mechanics*, 8e, §2.3).

## 8. Visual — diagram or schematic
```text
          F_in
           ↓
      ┌────┴────┐
      │  small  │  A₁
      │ piston  │
      └────┬────┘
           │
    ═══════╪══════════════════  (enclosed incompressible fluid)
           │
      ┌────┴────┐
      │  large  │  A₂ ≫ A₁
      │ piston  │
      └────┬────┘
           ↓
          F_out = F_in (A₂/A₁)
```
The diagram shows two pistons connected by a rigid, fluid-filled cylinder. Pressure generated under the small piston is transmitted unchanged to the large piston.

## 9. The memory technique
1. **The hook** — Picture a sealed balloon inside a glass box: squeeze any face and every other face bulges equally; the fluid inside cannot “choose” a direction.  
2. **What to overlearn** — \(p = F/A\) and the statement “\(\Delta p\) is the same everywhere in a confined incompressible fluid.”  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from equilibrium of a fluid cube: set net force on each axis to zero to recover \(p_x = p_y = p_z\).

## 10. What this unlocks
Pascal’s law is the foundation for hydrostatics and for the design of all hydraulic machinery. It directly precedes the hydrostatic equation, Archimedes’ principle, manometer analysis, and the derivation of Bernoulli’s equation along a streamline when viscous losses are negligible.

- Hydrostatic pressure distribution \(p = p_0 + \rho g h\)  
- Hydraulic lift and brake system sizing  
- Pressure measurement with dead-weight testers  
- Derivation of the Navier–Stokes equation at zero velocity  

## 11. Self-check — five questions, no answers
1. A hydraulic press has pistons of 5 cm² and 500 cm². If 200 N is applied to the small piston, what force appears on the large piston when both are at the same elevation?  
2. The output piston of a hydraulic cylinder sits 3 m above the input piston. Oil density is 900 kg m⁻³. By how much does the pressure at the output differ from the pressure at the input?  
3. Why does Pascal’s law fail to apply inside a rocket turbopump that is operating at full flow?  
4. A diver at 30 m depth inflates a small balloon from a tank. Does the balloon experience the same internal pressure as the tank, or must the diver account for depth?  
5. A closed tank is completely filled with water at 20 °C. The temperature is raised 10 °C. Estimate the pressure rise if the tank walls are rigid and the bulk modulus of water is 2.2 GPa; the volumetric expansion coefficient of water is 2.07 × 10⁻⁴ K⁻¹.