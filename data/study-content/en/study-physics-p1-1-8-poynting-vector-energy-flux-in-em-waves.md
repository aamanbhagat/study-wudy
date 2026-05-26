## 1. The one-sentence answer
**The Poynting vector \(\vec{S} = \frac{1}{\mu_0} \vec{E} \times \vec{B}\) is the local, instantaneous energy flux density of an electromagnetic field.**

Electromagnetic fields store energy. When those fields change in space and time, the stored energy must move. The Poynting vector quantifies exactly how much energy crosses a unit area per unit time and in which direction that flow occurs. In a propagating wave the electric and magnetic fields stand at right angles; their cross product therefore points along the direction of travel and its magnitude equals the power per unit area carried by the wave.

The same expression applies to static or quasi-static configurations. Energy can flow through regions where no charges or currents are present, simply because the fields themselves are nonzero. This single vector therefore unifies the description of energy transport in transmission lines, radiating antennas, and free-space waves.

> [!NOTE]
> The energy in an electromagnetic wave is not carried by the particles that may be present; it is carried by the fields, and the Poynting vector tells you precisely where that energy is going at every instant.

## 2. Why this matters — concrete and current
NASA’s 2010 IKAROS mission demonstrated solar-sail propulsion by measuring the momentum delivered by sunlight; the thrust arises directly from the Poynting flux of solar radiation pressure integrated over the sail area.  

In high-power microwave systems used for deep-space communication, engineers at JPL calculate the Poynting vector inside waveguide feeds to ensure that peak power density remains below breakdown thresholds before the signal is radiated.  

Semiconductor foundries employ time-domain Poynting-vector maps extracted from finite-difference simulations to locate and suppress unwanted electromagnetic energy leakage between adjacent interconnects at 5 nm nodes.  

Laser ablation propulsion concepts under study by the U.S. Air Force Research Laboratory rely on the instantaneous Poynting flux of pulsed beams to predict the momentum coupling coefficient delivered to a target surface.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Maxwell’s equations      | Supply the differential relations that convert field energy into a continuity equation |
| Electromagnetic energy density \(u = \frac12(\epsilon_0 E^2 + B^2/\mu_0)\) | Provides the “stuff” whose flow the Poynting vector must conserve |
| Vector cross product     | Determines both magnitude and direction of energy flow    |
| Divergence theorem       | Converts the local conservation law into an integral statement over surfaces |

## 4. Building the idea — from intuition to formalism

### Step 1 — Energy resides in the fields
The work done by fields on charges changes the mechanical energy of those charges; the difference must be accounted for by a change in field energy.  
A parallel-plate capacitor with vacuum between plates stores energy density \(\frac12\epsilon_0 E^2\).  
\[
u_E = \frac12\epsilon_0 E^2, \qquad u_B = \frac{B^2}{2\mu_0}.
\]
> [!WARNING]
> Treating the energy as located only inside conductors misses the dominant contribution stored in the surrounding space.

### Step 2 — Local conservation demands a flux term
Start from the mechanical power per unit volume \(\vec{J}\cdot\vec{E}\) and substitute Ampère’s and Faraday’s laws. After vector identities the equation becomes
\[
\frac{\partial u}{\partial t} + \nabla\cdot\vec{S} = -\vec{J}\cdot\vec{E},
\]
where \(u = u_E + u_B\). The new term \(\nabla\cdot\vec{S}\) is required for local conservation.

### Step 3 — Identify the candidate flux vector
The only vector that emerges with the correct dimensions and transformation properties is
\[
\vec{S} = \frac{1}{\mu_0}\vec{E}\times\vec{B}.
\]
Its divergence exactly cancels the time derivatives of the field energies when Maxwell’s equations hold.

### Step 4 — Verify dimensions and direction
\(\vec{E}\) has units V m\(^{-1}\), \(\vec{B}\) has units T; the combination yields W m\(^{-2}\). The right-hand rule places \(\vec{S}\) perpendicular to both fields and along the propagation direction for a plane wave.

### Step 5 — Specialize to a monochromatic plane wave
Let \(\vec{E} = E_0\cos(kz-\omega t)\hat{x}\) and \(\vec{B} = (E_0/c)\cos(kz-\omega t)\hat{y}\). Then
\[
\vec{S} = \frac{E_0^2}{\mu_0 c}\cos^2(kz-\omega t)\hat{z}.
\]
The time average equals the familiar intensity \(I = \frac12 c\epsilon_0 E_0^2\).

### Step 6 — Recover the textbook statement
The Poynting theorem in differential form is therefore
\[
-\vec{J}\cdot\vec{E} = \frac{\partial}{\partial t}\left(\frac{\epsilon_0 E^2}{2} + \frac{B^2}{2\mu_0}\right) + \nabla\cdot\left(\frac{\vec{E}\times\vec{B}}{\mu_0}\right).
\]

## 5. Worked examples — every step shown

**Example 1 — Plane-wave intensity**  
*Given:* \(E_0 = 100\) V m\(^{-1}\), vacuum.  
*Find:* Time-averaged \(|\vec{S}|\).  
Step 1: \(B_0 = E_0/c = 3.33\times10^{-7}\) T.  
*Why:* Faraday’s law in a plane wave enforces \(B = E/c\).  
Step 2: Instantaneous \(S_z = E B/\mu_0\).  
*Why:* Definition of \(\vec{S}\).  
Step 3: \(\langle\cos^2\rangle = 1/2\), so \(\langle S\rangle = E_0 B_0/(2\mu_0) = 26.5\) W m\(^{-2}\).  
**26.5 W m\(^{-2}\)**  

*Reflection:* The factor 1/2 arises solely from time averaging; omitting it is the most common numerical error.

**Example 2 — Coaxial cable DC**  
*Given:* Inner radius \(a\), outer \(b\), current \(I\), voltage \(V\).  
*Find:* Total power flowing through annular region.  
Step 1: \(E = V/[\rho\ln(b/a)]\), \(B = \mu_0 I/(2\pi\rho)\).  
*Why:* Electrostatic and magnetostatic solutions inside coax.  
Step 2: \(S_\rho = 0\), \(S_z = (V I)/(2\pi\rho^2\ln(b/a))\).  
*Why:* \(\vec{E}\times\vec{B}\) points axially.  
Step 3: Integrate over annulus: \(\int_a^b S_z 2\pi\rho\,d\rho = VI\).  
**VI**  

*Reflection:* All power travels in the fields between conductors, not inside the metal.

**Example 3 — Standing wave**  
*Given:* Two counter-propagating plane waves of equal amplitude.  
*Find:* Time-averaged Poynting vector.  
Step 1: Superpose fields; \(E\) and \(B\) become standing-wave patterns 90° out of phase.  
*Why:* Phase difference forces \(\langle\vec{E}\times\vec{B}\rangle = 0\).  
**0**  

*Reflection:* Energy oscillates locally but net transport vanishes.

**Example 4 — Energy flow into a resistor**  
*Given:* Cylindrical resistor of radius \(a\), length \(L\), conductivity \(\sigma\), steady current \(I\).  
*Find:* Radial inward Poynting flux integrated over surface.  
Step 1: Inside, \(E_z = I/(\sigma\pi a^2)\), \(B_\phi = \mu_0 I\rho/(2\pi a^2)\).  
*Why:* Ohm’s law and Ampère’s law.  
Step 2: At surface \(\rho = a\), \(S_r = -E_z B_\phi/\mu_0\).  
*Why:* Negative sign indicates inflow.  
Step 3: Surface integral yields \(I^2 R\).  
**I²R**  

*Reflection:* Joule heating is supplied by electromagnetic energy flowing in from the sides.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using \(\vec{S}\) for static fields only | Textbook examples emphasize waves                   | Compute \(\nabla\cdot\vec{S}\) explicitly; it is nonzero even in magnetostatics |
| Forgetting \(\mu_0\) in denominator | SI-unit confusion with cgs                          | Always write \(\vec{S} = \vec{E}\times\vec{H}\) when \(\vec{H}\) is used |
| Taking instantaneous value as intensity | Peak versus average mismatch                        | Insert \(\langle\cos^2\rangle = 1/2\) for sinusoids  |
| Sign error in direction           | Right-hand-rule slip                                | Draw \(\vec{E}\), \(\vec{B}\), then \(\vec{S}\) on three axes |
| Ignoring displacement current     | Low-frequency intuition                             | Retain \(\partial\vec{D}/\partial t\) in every derivation |
| Applying to nonlinear media without modification | Constitutive relations change                       | Replace \(\mu_0^{-1}\vec{B}\) by \(\vec{H}\) when \(\mu\neq\mu_0\) |
| Confusing energy density with flux| Both contain \(E\) and \(B\)                        | Check units: energy density is J m\(^{-3}\), flux is W m\(^{-2}\) |

## 7. The textbook-precise statement
In any region of space the local conservation of electromagnetic energy is expressed by Poynting’s theorem:
\[
-\int_V\vec{J}\cdot\vec{E}\,dV = \frac{d}{dt}\int_V\left(\frac{\epsilon_0 E^2}{2}+\frac{B^2}{2\mu_0}\right)dV + \oint_S\frac{\vec{E}\times\vec{H}}{\,}\cdot d\vec{A},
\]
where \(\vec{H}=\vec{B}/\mu_0\) in linear media. All fields are assumed sufficiently smooth for the divergence theorem to apply. (Griffiths, *Introduction to Electrodynamics*, 4th ed., §8.2.2.)

## 8. Visual — diagram or schematic

```text
Plane EM wave propagating in +z
          E (x-dir) ↑
                 |
                 |
B (y-dir) →      |      S (z-dir) →
                 |
                 |
                ─┼────────────────────► z
```
E, B, and S form a right-handed triad; S lies along the propagation direction and its magnitude is \(EB/\mu_0\).

## 9. The memory technique
1. **The hook** — Picture an arrowhead formed by E and B; the arrow flies in the direction energy travels.  
2. **What to overlearn** — \(\vec{S}=\frac1{\mu_0}\vec{E}\times\vec{B}\); time average of \(\cos^2\theta\) is exactly 1/2; \(\langle S\rangle = \frac12 c\epsilon_0 E_0^2\) for plane waves in vacuum.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from \(\partial u/\partial t + \nabla\cdot\vec{S} = -\vec{J}\cdot\vec{E}\) using only Maxwell’s equations and the vector identity \(\nabla\cdot(\vec{E}\times\vec{B})\).

## 10. What this unlocks
Mastery of the Poynting vector supplies the rigorous foundation for radiation pressure, antenna directivity, and the energy budget of any electromagnetic system.  
- Next: radiation from accelerating charges (Larmor formula via integrated Poynting flux)  
- Momentum density \(\vec{g}=\vec{S}/c^2\) and radiation pressure  
- Energy-momentum tensor in relativistic electrodynamics  
- Mode power in waveguides and optical fibers

## 11. Self-check — five questions, no answers
1. A 1 GHz plane wave in vacuum has \(E_0 = 10\) V m\(^{-1}\). What is its time-averaged intensity?  
2. Inside a long solenoid carrying a slowly increasing current, is the Poynting vector pointing radially inward or outward? Compute its divergence.  
3. Two orthogonal linearly polarized waves of equal amplitude and frequency propagate in the same direction but with a 90° phase difference. What is the time-averaged Poynting vector?  
4. A student claims that in a charging capacitor all energy flows through the wires. Use the Poynting vector to test the claim.  
5. In a medium with \(\mu = \mu_0\) but \(\epsilon = 4\epsilon_0\), how does the magnitude of \(\vec{S}\) for a given \(\vec{E}\) and \(\vec{B}\) compare with the vacuum case?