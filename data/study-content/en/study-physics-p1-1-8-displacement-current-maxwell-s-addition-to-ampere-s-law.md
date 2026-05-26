## 1. The one-sentence answer
**Displacement current is the term \(\varepsilon_0 \frac{d\Phi_E}{dt}\) that Maxwell added to Ampere’s law so the resulting equation remains consistent with charge conservation when electric fields change with time.**

In a charging capacitor the conduction current stops at the plates, yet a magnetic field still circles between them exactly as it does inside the wires. Without an extra term the line integral of \(\mathbf{B}\) would depend on which surface you choose to cap the Amperian loop, violating the requirement that physics be independent of arbitrary mathematical surfaces. Maxwell’s addition supplies the missing contribution by treating a changing electric flux as an effective current.

The term is not a flow of charge. It is a bookkeeping device that restores continuity of total current and, as a direct consequence, permits electromagnetic waves to propagate in vacuum.

> [!NOTE]
> The single conceptual leap is that a time-varying electric field is magnetically indistinguishable from a real current; once this equivalence is granted, the four Maxwell equations close and light becomes an electromagnetic phenomenon.

## 2. Why this matters — concrete and current
In the James Webb Space Telescope’s fine-steering mirrors, piezoelectric actuators are driven by rapidly switched high-voltage capacitors; the displacement-current correction inside those capacitors determines the exact magnetic shielding required to keep the wavefront sensor free of induced noise at the nanoradian level.

Particle accelerators at CERN rely on the full Ampère–Maxwell law when designing the beam-position monitors; the displacement-current term inside the ceramic vacuum chambers sets the bandwidth limit of the 40 MHz bunch-by-bunch feedback loops that stabilize the 7 TeV beams.

Modern 5G millimetre-wave phased-array antennas are simulated with FDTD codes whose update equations are discretised versions of the Ampère–Maxwell law; omitting the displacement-current term produces non-physical reflections at every dielectric interface and destroys the predicted beam pattern.

Gravitational-wave detectors such as LIGO use electro-optic modulators whose rapidly varying electric fields inside lithium-niobate crystals generate measurable magnetic fields; the displacement-current contribution must be included in the finite-element models that set the stray-field budget for the 4 km interferometer arms.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Ampère’s original law    | Provides the starting integral statement that must be repaired |
| Electric flux \(\Phi_E\) | The quantity whose time derivative supplies the new term |
| Continuity equation      | Demonstrates the inconsistency that Maxwell’s term removes |
| Steady-state magnetostatics | Supplies the symmetry argument that \(\mathbf{B}\) circles a current |

## 4. Building the idea — from intuition to formalism

### Step 1 — The original law fails for a capacitor
A steady conduction current produces a definite circulation of \(\mathbf{B}\). When the same current charges a capacitor the conduction current vanishes between the plates, yet symmetry still demands a magnetic field there.  
Consider a parallel-plate capacitor being charged at constant current \(I\). An Amperian loop encircling the wire gives \(\oint\mathbf{B}\cdot d\mathbf{l}=\mu_0 I\). The identical loop with a surface passing between the plates encloses zero conduction current, so the same integral would be zero—an immediate contradiction.  
\[ \oint_C\mathbf{B}\cdot d\mathbf{l}=\mu_0 I_{\text{enc}} \]  
> [!WARNING]  
> Treating the surface choice as optional hides the fact that the equation as written is mathematically inconsistent for any time-dependent charge distribution.

### Step 2 — Introduce electric flux
The electric field between the plates is \(E=\sigma/\varepsilon_0=Q/(A\varepsilon_0)\). The flux through an area \(A\) is therefore \(\Phi_E=Q/\varepsilon_0\). Its time derivative is proportional to the charging current.  
\[ \frac{d\Phi_E}{dt}=\frac{1}{\varepsilon_0}\frac{dQ}{dt}=\frac{I}{\varepsilon_0} \]  
This quantity has the same units as current and can serve as a surrogate inside the gap.

### Step 3 — Restore surface independence
Add a term proportional to \(d\Phi_E/dt\) so that every surface bounded by the same loop encloses the same total “current”. The constant of proportionality must be \(\varepsilon_0\) to recover the correct units and to match the known \(E\)-field of the capacitor.  
\[ I_d=\varepsilon_0\frac{d\Phi_E}{dt} \]  
The modified right-hand side is now \(I_{\text{enc}}+I_d\), identical for every surface.

### Step 4 — Write the corrected integral law
The line integral of \(\mathbf{B}\) equals \(\mu_0\) times the sum of conduction and displacement currents.  
\[ \oint_C\mathbf{B}\cdot d\mathbf{l}=\mu_0\left(I_{\text{enc}}+\varepsilon_0\frac{d\Phi_E}{dt}\right) \]  
This is the Ampère–Maxwell law.

### Step 5 — Differential form and wave equation
Apply Stokes’ theorem and the definition of curl to obtain the local statement  
\[ \nabla\times\mathbf{B}=\mu_0\mathbf{J}+\mu_0\varepsilon_0\frac{\partial\mathbf{E}}{\partial t}. \]  
When combined with Faraday’s law the two curl equations yield the wave equation whose speed is \(c=1/\sqrt{\mu_0\varepsilon_0}\).

## 5. Worked examples — every step shown

**Example 1 — Displacement current in a parallel-plate capacitor**  
*Given:* Circular plates of radius \(R=5.0\) cm, separation 1.0 mm, charging current \(I=2.0\) A.  
*Find:* Displacement current \(I_d\) between the plates.  

The conduction current is entirely replaced by displacement current once it reaches the plates:  
\[ I_d=\varepsilon_0\frac{d\Phi_E}{dt}. \]  
*Why* — definition of displacement current.  
All charging current \(I\) contributes to changing electric flux, so  
\[ I_d=I=2.0\,\text{A}. \]  
*Why* — continuity of total current through any surface.  
**2.0 A**

*Reflection* — The numerical value equals the wire current; the example forces recognition that \(I_d\) is not an extra current but a replacement term.

**Example 2 — Magnetic field inside a charging capacitor**  
*Given:* Same capacitor, uniform \(\mathbf{E}\) between plates.  
*Find:* \(\mathbf{B}\) at radial distance \(r<R\).  

Apply the Ampère–Maxwell law to a circular path of radius \(r\):  
\[ \oint\mathbf{B}\cdot d\mathbf{l}=B\cdot2\pi r=\mu_0 I_{d,\text{enc}}. \]  
*Why* — symmetry and the corrected law.  
The enclosed displacement current is the fraction of total flux through area \(\pi r^2\):  
\[ I_{d,\text{enc}}=I\cdot\frac{r^2}{R^2}. \]  
*Why* — uniform \(dE/dt\).  
Solve for \(B\):  
\[ B=\frac{\mu_0 I r}{2\pi R^2}. \]  
**\(B=\frac{\mu_0 I r}{2\pi R^2}\)** (azimuthal)

*Reflection* — The \(r\) dependence matches the interior field of a steady wire, showing the mathematical continuity Maxwell restored.

**Example 3 — Inconsistency without the term**  
*Given:* Charging capacitor, two different Amperian surfaces.  
*Find:* Contradiction in \(\oint\mathbf{B}\cdot d\mathbf{l}\).  

Surface 1 (through wire) encloses \(I\); surface 2 (between plates) encloses 0.  
Without \(I_d\) the integrals differ by \(\mu_0 I\), violating path independence.  
After adding \(I_d\) both surfaces give \(\mu_0 I\).

*Reflection* — Demonstrates why the correction is mandatory rather than optional.

**Example 4 — Displacement current density in vacuum**  
*Given:* Plane wave \(\mathbf{E}=E_0\cos(kz-\omega t)\hat{x}\).  
*Find:* Displacement-current density.  

\[ J_d=\varepsilon_0\frac{\partial E_x}{\partial t}=\varepsilon_0\omega E_0\sin(kz-\omega t). \]  
*Why* — definition with \(\mathbf{J}=0\).  
This \(J_d\) sources the magnetic field of the wave via the Ampère–Maxwell law.

*Reflection* — Shows the term is indispensable for free-space propagation.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating displacement current as literal moving charge | The word “current” suggests flow of electrons | Remember it is \(\varepsilon_0 d\Phi_E/dt\), not \(dq/dt\) |
| Forgetting the term exists only when \(\partial\mathbf{E}/\partial t\neq0\) | Steady-state intuition dominates | Check whether \(E\) is changing before writing the law |
| Applying the term inside conductors where \(\mathbf{J}\) already exists | Confusion between total and free current | Use the macroscopic form with \(\mathbf{D}\) when dielectrics are present |
| Sign error in the direction of \(\mathbf{B}\) | Right-hand rule applied to fictitious current | Draw the changing \(\mathbf{E}\) vector and apply the same rule used for real \(I\) |
| Assuming the term vanishes in vacuum | Belief that “nothing is there” | Recall that \(\varepsilon_0\) multiplies the vacuum field derivative |
| Using the integral form without verifying surface independence | Skipping the consistency check | Always evaluate the same loop with two surfaces |
| Confusing \(\varepsilon_0 d\Phi_E/dt\) with polarisation current | Mixing microscopic and macroscopic descriptions | Reserve \(P\) terms for linear media; vacuum displacement current uses only \(\varepsilon_0\) |

## 7. The textbook-precise statement
The Ampère–Maxwell law in integral form states that for any closed curve \(C\) bounding an oriented surface \(S\),

\[
\oint_C\mathbf{B}\cdot d\mathbf{l}=\mu_0\int_S\mathbf{J}\cdot d\mathbf{A}+\mu_0\varepsilon_0\frac{d}{dt}\int_S\mathbf{E}\cdot d\mathbf{A},
\]

provided the fields are piecewise smooth and the surface is piecewise smooth with consistent orientation (Griffiths, *Introduction to Electrodynamics*, 4e, Eq. 7.42). In differential form inside linear media it becomes

\[
\nabla\times\mathbf{B}=\mu_0\mathbf{J}+\mu_0\varepsilon_0\frac{\partial\mathbf{E}}{\partial t}.
\]

## 8. Visual — diagram or schematic
```text
Charging capacitor (side view)
  +++++++++++++++  plate area A
       |  ↑ E(t) increasing
  wire →I   gap d
       |  ↓
  ---------------
       B circles into page (×) above, out (•) below
Amperian loop (circle) radius r < plate radius
```
The diagram shows two plates, the conduction current \(I\) arriving from the left, the uniform \(\mathbf{E}\) between plates whose magnitude grows, and concentric circles representing the azimuthal \(\mathbf{B}\) field produced by the displacement current.

## 9. The memory technique
1. **The hook** — Picture Maxwell inserting an invisible “ghost current” between capacitor plates so the magnetic field lines remain continuous loops, exactly as water remains continuous when a pipe widens into a clear section.
2. **What to overlearn** — The exact term \(\varepsilon_0 d\Phi_E/dt\), the corrected integral law, and the derived wave speed \(c=1/\sqrt{\mu_0\varepsilon_0}\).
3. **Spaced-repetition schedule** — Review the integral law at 1 day, 3 days, 7 days, 16 days, 35 days; each time derive the wave speed from the two curl equations without notes.
4. **First-principles fallback** — Start from the continuity equation \(\nabla\cdot\mathbf{J}+\partial\rho/\partial t=0\), convert \(\rho\) to electric flux via Gauss’s law, and insert the resulting term into Ampère’s law.

## 10. What this unlocks
The corrected law supplies the second curl equation required for electromagnetic waves, the consistency of all four Maxwell equations, and the prediction that light propagates at finite speed.  

- Electromagnetic wave equation and Poynting vector  
- Boundary conditions at dielectric interfaces  
- Retarded potentials and radiation fields  
- Special-relativistic unification of \(\mathbf{E}\) and \(\mathbf{B}\)

## 11. Self-check — five questions, no answers
1. A parallel-plate capacitor with circular plates is charged by a constant current. At what radial distance inside the gap is \(B\) maximum?  
2. Show explicitly that the two surfaces used in Example 3 now give identical values of \(\oint\mathbf{B}\cdot d\mathbf{l}\) once the displacement-current term is included.  
3. In a region where \(\mathbf{J}=0\) but \(\partial\mathbf{E}/\partial t\neq0\), what is the divergence of the right-hand side of the Ampère–Maxwell law?  
4. A student claims “displacement current only matters inside capacitors.” Give one counter-example from free space and one from an accelerator component.  
5. Starting from the integral form, derive the differential form inside a linear dielectric where \(\mathbf{D}=\varepsilon\mathbf{E}\) and free charge is absent.