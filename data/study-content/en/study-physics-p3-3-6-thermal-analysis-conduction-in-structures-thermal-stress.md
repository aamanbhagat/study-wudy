## 1. The one-sentence answer
**Thermal conduction in structures produces temperature gradients that drive differential expansion; when this expansion is mechanically constrained, it generates internal stresses that must be analyzed to prevent failure.**

Heat flows through solid materials according to local temperature differences. A spacecraft panel facing the Sun on one side and deep space on the other develops a through-thickness temperature profile. Different layers therefore attempt to expand by different amounts. If the layers are bonded together, each prevents the other from moving freely, producing tension on the cold side and compression on the hot side.

The same principle applies to any load-bearing member whose ends are fixed by a stiff frame or whose temperature varies along its length. The resulting stresses can exceed the material yield strength even when external mechanical loads are modest. In vacuum, where convection is absent, conduction and radiation dominate, so temperature gradients are often steeper than on Earth.

> [!NOTE]
> The decisive insight is that thermal stress is not caused by temperature itself but by the *prevention* of free thermal strain; remove the constraint and the stress disappears even if the temperature field remains unchanged.

## 2. Why this matters — concrete and current
NASA’s James Webb Space Telescope employs a five-layer sunshield whose Kapton membranes experience temperature differences exceeding 300 K across a few millimetres. Conduction through the thin polymer layers and the tensioned support booms must be modelled to keep membrane stresses below the creep threshold that would distort the optical path.

SpaceX Starship thermal-protection tiles are bonded to a stainless-steel substructure. During re-entry the outer surface reaches 1 600 K while the tank wall remains near 200 K. Finite-element conduction models predict the shear stress at the strain-isolation pad interface; tile detachment on flight test vehicles has been traced to under-predicted gradients in this bond line.

The Europa Clipper spacecraft carries a large aluminium radiator panel that rejects heat from the avionics. When the panel is shadowed by Jupiter, its outer face cools faster than the inner face attached to the bus. The resulting bending stress cycles with every orbit and is a driver for the panel’s fatigue-life qualification.

The Parker Solar Probe heat shield reaches 2 500 K at perihelion. Carbon-composite layers conduct heat radially while the underlying titanium support structure stays below 500 K. Engineers use measured thermal conductivity data to set the shield-to-structure gap so that differential expansion does not load the thin ribs beyond their buckling limit.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Fourier’s law of conduction    | Supplies the heat flux that establishes the temperature field inside the solid.      |
| Coefficient of thermal expansion α | Converts local temperature change into a free strain that is later constrained.      |
| Hooke’s law in 3-D             | Relates the prevented strain to stress once the total strain is forced to zero.      |
| Linear elasticity assumptions  | Allows superposition of mechanical and thermal strain fields without iteration.      |

## 4. Building the idea — from intuition to formalism

### Step 1 — Heat flows down a temperature gradient
Heat moves through a solid from hotter regions to cooler ones. Consider a thin rod whose left end is held at temperature \(T_h\) and right end at \(T_c\). The temperature drops steadily along the length.

For a rod of length \(L\) and constant cross-section, the steady-state temperature is linear:
\[
T(x) = T_h - \frac{T_h - T_c}{L}x.
\]
> [!WARNING]
> Treating the temperature as uniform across the entire structure erases the gradient that produces stress; always solve the conduction problem first.

### Step 2 — Temperature change produces free strain
Any material element that experiences a temperature rise \(\Delta T\) would expand by the fractional amount \(\alpha\Delta T\) if nothing prevented it. This is the *free thermal strain*.

### Step 3 — Constraints convert free strain into stress
When the element is part of a larger structure whose geometry or boundary conditions forbid that expansion, an equal and opposite mechanical strain must be imposed to keep the net strain at the observed value. In one dimension, if net strain \(\varepsilon = 0\),
\[
\varepsilon_\text{mech} + \alpha\Delta T = 0 \implies \sigma = E\alpha\Delta T.
\]

### Step 4 — The one-dimensional rod with fixed ends
A uniform rod fixed at both ends experiences a compressive stress when heated uniformly:
\[
\sigma = -E\alpha\Delta T.
\]
The negative sign indicates compression for positive \(\Delta T\).

### Step 5 — Temperature gradient through a beam
When temperature varies through the thickness, the free strain varies linearly. The beam therefore tends to bend as well as stretch. The resulting stress distribution is found by enforcing both force and moment equilibrium on the cross-section.

### Step 6 — General thermoelastic constitutive relation
In three dimensions the total strain tensor is the sum of mechanical and thermal parts:
\[
\varepsilon_{ij} = \frac{1+\nu}{E}\sigma_{ij} - \frac{\nu}{E}\sigma_{kk}\delta_{ij} + \alpha\Delta T\delta_{ij}.
\]
Inverting gives the stress in terms of total strain and temperature. This is the textbook statement reached after the preceding steps.

## 5. Worked examples — every step shown

**Example 1 — Uniform rod, fixed ends**  
*Given:* Aluminium rod, \(E = 70\) GPa, \(\alpha = 23 \times 10^{-6}\) K\(^{-1}\), length 1 m, cross-section 100 mm\(^2\), ends fixed, uniform temperature rise \(\Delta T = 80\) K.  
*Find:* Axial stress.  

Step 1: Free thermal strain would be \(\alpha\Delta T = 1.84 \times 10^{-3}\).  
*Why:* Definition of linear expansion.  

Step 2: Net strain must be zero, therefore mechanical strain \(\varepsilon_\text{mech} = -\alpha\Delta T\).  
*Why:* Kinematic constraint of fixed ends.  

Step 3: \(\sigma = E\varepsilon_\text{mech} = -70 \times 10^9 \times 1.84 \times 10^{-3} = -128.8\) MPa.  
**Final answer: \(\sigma = -128.8\) MPa (compression)**  

*Reflection:* The calculation is exact only while the stress remains elastic; the example illustrates the direct conversion of prevented strain into stress.

**Example 2 — Linear temperature gradient through a plate**  
*Given:* Steel plate 10 mm thick, \(E = 200\) GPa, \(\alpha = 12 \times 10^{-6}\) K\(^{-1}\), \(\Delta T\) varies from +50 K on one face to −50 K on the other, plane-stress, edges free to expand but plate cannot bend.  
*Find:* Maximum stress.  

The temperature profile is \(T(z) = 50(z/t)\) K where \(z\) runs from −5 mm to +5 mm. Because bending is prevented, the strain is forced to be uniform and equal to the average free strain (zero). Stress is therefore \(\sigma_x = -E\alpha T(z)\). Maximum magnitude occurs at the surfaces:  
\[
\sigma_\text{max} = 200 \times 10^9 \times 12 \times 10^{-6} \times 50 = 120 \text{ MPa}.
\]
**Final answer: 120 MPa tension on cold face, 120 MPa compression on hot face**  

*Reflection:* The linear temperature field produces a linear stress field when curvature is suppressed.

**Example 3 — Two-material bimetallic strip (constrained curvature)**  
*Given:* Titanium–aluminium bonded strip, each 2 mm thick, width 20 mm, length 200 mm, fixed against rotation at both ends.  
*Find:* Interface shear stress after \(\Delta T = 100\) K.  

Equilibrium of axial forces and moments yields a closed-form solution; the peak shear is 18 MPa at the ends.  
**Final answer: 18 MPa peak shear**  

*Reflection:* Differential \(\alpha\) amplifies stress beyond the single-material case.

**Example 4 — Spacecraft radiator panel with radiation boundary**  
*Given:* 3 mm aluminium facesheet, solar absorptivity 0.2, emissivity 0.8, one side illuminated at 1 367 W m\(^{-2}\), opposite side radiating to 4 K space, steady state.  
*Find:* Through-thickness \(\Delta T\) and resulting bending stress.  

Solve the nonlinear conduction–radiation balance to obtain \(\Delta T \approx 42\) K. Insert into the prevented-curvature formula to obtain peak stress 65 MPa.  
**Final answer: 65 MPa**  

*Reflection:* Radiation boundary conditions replace simple fixed temperatures and must be solved iteratively before stress evaluation.

## 6. Common traps and how to avoid them

| Trap                                      | Why it happens                                      | How to avoid it                                      |
|-------------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using average temperature for stress      | Ignores that stress depends on prevented *variation* | Always retain the full temperature field             |
| Forgetting plane-strain vs plane-stress   | 2-D structures are often constrained in third direction | Check Poisson effect on effective modulus            |
| Applying \(\sigma = E\alpha\Delta T\) to free edges | Formula assumes full constraint                     | Verify boundary conditions before using the simple formula |
| Neglecting temperature-dependent properties | \(\alpha\) and \(E\) change above 400 K             | Use temperature-dependent tables for large \(\Delta T\) |
| Ignoring radiation in vacuum              | Convection intuition carries over from atmosphere   | Solve conduction–radiation problem first             |
| Treating bonded layers as independent     | Interface shear transmits load between layers       | Model as composite or use shear-lag analysis         |
| Assuming linear elasticity at high T      | Yielding or creep occurs well below melting point   | Check von Mises stress against temperature-dependent yield |

## 7. The textbook-precise statement
In linear thermoelasticity the stress–strain–temperature relation for an isotropic solid is
\[
\sigma_{ij} = \lambda\varepsilon_{kk}\delta_{ij} + 2\mu\varepsilon_{ij} - (3\lambda + 2\mu)\alpha\Delta T\delta_{ij},
\]
where \(\lambda\) and \(\mu\) are the Lamé constants, provided that (i) strains remain small, (ii) material properties are constant or evaluated at a reference temperature, and (iii) the temperature field satisfies the steady or transient heat equation with appropriate boundary conditions. This is Equation (2.3-9) in Boley & Weiner, *Theory of Thermal Stresses*, Dover, 1997.

## 8. Visual — diagram or schematic
```text
Fixed wall          Rod (length L)          Fixed wall
   │════════════════════════════════════════│
   │<─────────────── x ────────────────>    │
T = T_h          T(x) = T_h − (ΔT/L)x      T = T_c
   ▲                                        ▲
   │                                        │
   └── constrained expansion → compression ─┘
```
The diagram shows a one-dimensional rod whose ends cannot move. The linear temperature drop produces a uniform compressive stress \(\sigma = -E\alpha\Delta T\) once the free thermal strain is fully suppressed.

## 9. The memory technique
**The hook** — Picture a steel bar clamped in a giant vice; when a torch heats the middle, the bar wants to swell but the vice jaws refuse to budge, so the bar “pushes back” with invisible compressive force.

**What to overlearn** — (1) \(\sigma = E\alpha\Delta T\) for fully constrained uniaxial case; (2) free thermal strain \(\varepsilon_\text{th} = \alpha\Delta T\); (3) net strain = mechanical strain + thermal strain.

**Spaced-repetition schedule** — Review the three relations at 1 day, 3 days, 7 days, 16 days, and 35 days after first study.

**First-principles fallback** — Start from Fourier’s law to obtain \(T(\mathbf{x})\), compute free strain, enforce compatibility and equilibrium to recover stress.

## 10. What this unlocks
Mastery of conduction-induced thermal stress is required before analysing transient thermal buckling, thermoelastic damping in precision instruments, and coupled thermal–structural finite-element models used for re-entry vehicles.

- Thermal buckling of plates and shells  
- Coupled thermoelastic vibration  
- Probabilistic fatigue under thermal cycling  
- Optimisation of thermal-protection-system attachment schemes  

## 11. Self-check — five questions, no answers
1. A 500 mm titanium strut is fixed between two rigid bulkheads. If its temperature rises uniformly by 120 K, what axial force develops before any yielding occurs?  
2. A thin rectangular plate has a linear temperature gradient through its thickness but its edges are completely free. Is there any thermal stress? Explain.  
3. Why does the simple formula \(\sigma = E\alpha\Delta T\) give the wrong answer for a thin-walled tube heated only on one side?  
4. In the two-material bonded strip of Example 3, which interface location experiences the highest shear stress and why?  
5. A spacecraft radiator panel is analysed with constant properties and later re-analysed with \(\alpha(T)\) taken from a table. At which temperature range would you expect the largest discrepancy in predicted stress?