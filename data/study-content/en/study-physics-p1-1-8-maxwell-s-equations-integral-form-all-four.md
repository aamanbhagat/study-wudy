## 1. The one-sentence answer
**Maxwell’s four equations in integral form are the complete classical statement of how electric and magnetic fields are produced by charges, currents, and each other’s time variation, expressed as relations between surface and line integrals over any chosen volume or loop.**

Electric flux through any closed surface equals the enclosed charge divided by vacuum permittivity; magnetic flux through any closed surface is always zero; the line integral of the electric field around any loop equals the negative rate of change of magnetic flux through the surface bounded by that loop; and the line integral of the magnetic field around any loop equals the vacuum permeability times the enclosed current plus an extra term proportional to the rate of change of electric flux. These statements replace the older, incomplete laws of Coulomb, Gauss, Faraday, and Ampère with a single, mutually consistent set that is valid even when fields change rapidly.

The integral versions make global conservation statements obvious: net “outflow” of a field is fixed by sources inside the volume, and changing flux through a surface forces a compensating circulation around its edge. They also reveal that light is an electromagnetic wave that can propagate in empty space.

> [!NOTE]
> The displacement-current term is the single addition Maxwell made; without it the equations are inconsistent with charge conservation and electromagnetic waves cannot exist.

## 2. Why this matters — concrete and current
Spacecraft attitude-control magnetorquers on satellites such as NASA’s PACE mission and ESA’s Sentinel-6 are sized directly from the integral form of Ampère’s law with Maxwell’s correction; the torque calculation integrates the induced magnetic field over the spacecraft bus volume.

Semiconductor foundries use Gauss’s law in integral form to verify that the net electric flux out of any test volume around a transistor gate equals the controlled charge on the gate electrode; TSMC’s 2 nm process metrology routines still rely on this check before committing masks.

The LIGO gravitational-wave detectors monitor tiny changes in circulating laser power; the Faraday and Ampère–Maxwell integrals together guarantee that the circulating electromagnetic wave remains divergence-free and curl-consistent over the 4 km arm lengths, allowing the instrument to reach strain sensitivities of 10⁻²³.

Pulsed-power machines at Sandia National Laboratories (Z machine) design megampere current feeds by integrating the corrected Ampère law across the magnetically insulated transmission lines; the displacement-current term limits the rise time and sets the minimum electrode spacing.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Divergence theorem       | Converts volume integrals of sources into surface fluxes  |
| Stokes’ theorem          | Converts surface integrals of curls into line integrals   |
| Electric flux definition | Quantifies “field lines leaving a surface”                |
| Magnetic flux definition | Quantifies linkage used in induction laws                 |
| Charge conservation      | Requires the displacement-current term for consistency    |

## 4. Building the idea — from intuition to formalism

### Step 1 — Electric field lines originate on charge
Net electric flux out of any closed surface equals enclosed charge divided by ε₀.  
Consider a point charge q inside a spherical balloon of radius R. Every field line that starts on the charge must cross the balloon surface exactly once.  
$$
\oint_S \mathbf{E} \cdot d\mathbf{A} = \frac{q_\text{enc}}{\varepsilon_0}
$$
> [!WARNING]
> Forgetting the 1/ε₀ factor produces units that do not match newtons per coulomb.

### Step 2 — Magnetic field lines form closed loops
No magnetic monopoles exist, so every field line that enters a closed surface must leave it.  
A bar magnet inside a Gaussian surface has its north-pole lines leaving and south-pole lines re-entering; the algebraic sum is zero.  
$$
\oint_S \mathbf{B} \cdot d\mathbf{A} = 0
$$
> [!WARNING]
> Treating an isolated magnetic pole as a source violates this equation and breaks the vector identity ∇·B ≡ 0.

### Step 3 — Changing magnetic flux induces circulation of E
A time-varying magnetic field through any surface forces an electric field to circulate around the boundary.  
Inside a long solenoid whose current is increasing, B is uniform and rising; the line integral of E around a concentric circular path equals the negative rate of change of flux.  
$$
\oint_C \mathbf{E} \cdot d\mathbf{l} = -\frac{d\Phi_B}{dt}
$$
> [!WARNING]
> Omitting the minus sign reverses the predicted direction of the induced electric field and violates Lenz’s law.

### Step 4 — Currents produce magnetic circulation
A steady current through any Amperian loop produces a magnetic field whose line integral equals μ₀ times enclosed current.  
A long straight wire carrying current I yields ∮ B·dl = μ₀ I when the loop is a circle centered on the wire.  
$$
\oint_C \mathbf{B} \cdot d\mathbf{l} = \mu_0 I_\text{enc}
$$
> [!WARNING]
> Using this form alone for time-varying fields violates continuity of charge.

### Step 5 — Electric flux that changes with time also produces magnetic circulation
Maxwell added the displacement-current term μ₀ε₀ dΦ_E/dt so that the equation remains consistent when charge is flowing onto a capacitor plate.  
Between the plates of a charging capacitor, I_enc = 0 yet a magnetic field still circles the axis; the extra term supplies the missing source.  
$$
\oint_C \mathbf{B} \cdot d\mathbf{l} = \mu_0 I_\text{enc} + \mu_0\varepsilon_0\frac{d\Phi_E}{dt}
$$
> [!WARNING]
> Dropping the displacement term makes the equations incompatible with ∇·J + ∂ρ/∂t = 0.

### Step 6 — The four integral statements together are complete
The set of four equations above, taken over arbitrary surfaces and loops, constitutes the integral form of Maxwell’s equations in vacuum. All classical electromagnetic phenomena follow from them together with the Lorentz force law.

## 5. Worked examples — every step shown

**Example 1 — Point charge inside arbitrary surface**  
*Given:* Point charge q at the origin; surface S is any closed surface enclosing the origin.  
*Find:* Net electric flux through S.  
Apply Gauss’s law directly:  
$$
\oint_S \mathbf{E} \cdot d\mathbf{A} = \frac{q_\text{enc}}{\varepsilon_0}
$$  
*Why:* The integral statement already equates flux to enclosed charge; no further calculation is required when only the net flux is asked.  
**Final answer**  
$$
\oint_S \mathbf{E} \cdot d\mathbf{A} = \frac{q}{\varepsilon_0}
$$  
*Reflection:* The result is independent of surface shape, a direct consequence of the divergence theorem applied to 1/r² fields.

**Example 2 — Solenoid with linearly rising current**  
*Given:* Long solenoid, n turns per metre, radius a, current I(t) = kt.  
*Find:* Line integral of induced E along a concentric circle of radius r < a.  
Magnetic field inside: B = μ₀ n kt.  
Flux through circle of radius r: Φ_B = B·πr² = μ₀ n kt π r
².  
Faraday’s law:  
$$
\oint_C \mathbf{E} \cdot d\mathbf{l} = -\frac{d\Phi_B}{dt} = -\mu_0 n k \pi r^2
$$  
*Why:* Only the interior flux contributes; the path is closed so the left side is well-defined.  
**Final answer**  
$$
\oint E\,dl = -\mu_0 n k \pi r^2
$$  
*Reflection:* The azimuthal E field grows linearly with r inside the solenoid, a result that generalises to any cylindrically symmetric changing B.

**Example 3 — Charging parallel-plate capacitor**  
*Given:* Circular plates of radius R, separation d ≪ R, current I charging the capacitor.  
*Find:* B at radial distance r < R between the plates.  
Enclosed conduction current = 0.  
Electric field between plates: E = σ/ε₀ = It/(ε₀ π R²).  
Electric flux through Amperian circle of radius r: Φ_E = E·πr².  
Ampère–Maxwell law:  
$$
\oint B\,dl = \mu_0\varepsilon_0\frac{d\Phi_E}{dt} = \mu_0\varepsilon_0\frac{I r^2}{R^2}\frac{1}{\varepsilon_0} = \mu_0 I\frac{r^2}{R^2}
$$  
Thus B = (μ₀ I r)/(2π R²).  
**Final answer**  
$$
B = \frac{\mu_0 I r}{2\pi R^2}
$$  
*Reflection:* The displacement term supplies exactly the current that would have flowed if the gap were conducting, restoring continuity.

**Example 4 — Consistency check with continuity equation**  
*Given:* Arbitrary volume V bounded by S; charge density ρ and current density J inside.  
*Find:* Relation implied by the four equations.  
Take the time derivative of Gauss’s law, substitute into the Ampère–Maxwell law after applying the divergence theorem, and obtain  
$$
\frac{\partial\rho}{\partial t} + \nabla\cdot\mathbf{J} = 0
$$  
*Why:* The displacement term was introduced precisely to make this identity hold.  
**Final answer**  
Charge is locally conserved.  
*Reflection:* Any proposed modification to Maxwell’s equations must preserve this continuity relation.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using ∮B·dl = μ₀I_enc for a capacitor | Students forget fields are time-varying | Always check whether dΦ_E/dt is nonzero |
| Sign error in Faraday’s law | Lenz’s law is applied after integration | Determine direction of positive circulation first |
| Treating magnetic flux as zero for any surface | Confusing “no monopoles” with “no field” | Zero net flux does not imply B = 0 |
| Applying Gauss’s law to non-inverse-square fields | Forgetting the theorem requires 1/r² | Verify the field satisfies ∇·E = ρ/ε₀ first |
| Omitting ε₀ or μ₀ in cgs units | Mixing unit systems | Write constants explicitly until units are second nature |
| Assuming surface must be spherical | Over-generalising textbook examples | Choose any surface whose symmetry matches the source |
| Neglecting displacement current in vacuum | Believing “no charges, no effect” | Remember vacuum supports propagating waves |

## 7. The textbook-precise statement
In vacuum, for any fixed volume V bounded by closed surface S and any fixed open surface Σ bounded by closed curve C, the integral form of Maxwell’s equations reads:

$$
\oint_S\mathbf{E}\cdot d\mathbf{A}=\frac{1}{\varepsilon_0}\int_V\rho\,dV
$$

$$
\oint_S\mathbf{B}\cdot d\mathbf{A}=0
$$

$$
\oint_C\mathbf{E}\cdot d\mathbf{l}=-\frac{d}{dt}\int_\Sigma\mathbf{B}\cdot d\mathbf{A}
$$

$$
\oint_C\mathbf{B}\cdot d\mathbf{l}=\mu_0\int_\Sigma\mathbf{J}\cdot d\mathbf{A}+\mu_0\varepsilon_0\frac{d}{dt}\int_\Sigma\mathbf{E}\cdot d\mathbf{A}
$$

(Griffiths, *Introduction to Electrodynamics*, 4e, Eqs. 7.40–7.43, with surfaces held fixed while fields vary.)

## 8. Visual — diagram or schematic
```text
          E lines          B lines
           ^               closed loops
           |                    ○
    +q ----|---->      N───────S
           |                    ○
           v
Gaussian surface (any shape) encloses +q
Flux out = q/ε₀          Flux in = Flux out
```
The left half shows radial E lines leaving a positive charge; the right half shows closed B loops around a bar magnet. Both surfaces are arbitrary closed surfaces.

## 9. The memory technique

1. **The hook** — Picture four closed loops of wire on a table: one glowing with charge (Gauss electric), one empty (Gauss magnetic), one with a spinning arrow (Faraday), and one with both a battery and a flashing light (Ampère–Maxwell).
2. **What to overlearn** — The exact four integral equations with all constants; the statement that displacement current restores continuity.
3. **Spaced-repetition schedule** — Re-derive each equation from its differential counterpart at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from ∇·E = ρ/ε₀, ∇·B = 0, ∇×E = −∂B/∂t, ∇×B = μ₀J + μ₀ε₀∂E/∂t and apply the divergence and Stokes theorems directly.

## 10. What this unlocks
Mastery of the integral statements lets you pass immediately to the differential form, to electromagnetic waves, and to the stress–energy tensor of the field.  
- Derivation of the wave equation c = 1/√(μ₀ε₀)  
- Boundary conditions at dielectric interfaces  
- Conservation laws via the Poynting vector  
- Lienard–Wiechert potentials for moving charges  
- Foundation for plasma physics and accelerator design

## 11. Self-check — five questions, no answers
1. A point charge sits exactly on the surface of a Gaussian cube. What fraction of its flux leaves through each face?  
2. Inside the gap of a charging capacitor the displacement current equals the conduction current in the wires. Show that the magnetic field at the same radius is continuous across the plate edge.  
3. A uniform B field fills a cylindrical volume and is decreasing at constant rate. Sketch the induced E lines both inside and outside the cylinder.  
4. Why does the integral form of Gauss’s law for magnetism remain valid even in regions where ∇×A is nonzero?  
5. A student omits the displacement term and calculates radiation from an oscillating dipole. Which Maxwell equation is violated and at what order in frequency?