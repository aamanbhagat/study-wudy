## 1. The one-sentence answer
**An LC circuit stores energy alternately in the electric field of a capacitor and the magnetic field of an inductor, producing sinusoidal oscillations in charge and current that are mathematically identical to the displacement and velocity of a mass-spring system.**

The circuit contains only inductance \(L\) and capacitance \(C\). When the capacitor holds charge \(q\), its voltage drives current through the inductor. The inductor opposes rapid change in current, so the charge on the capacitor decreases, builds up in the opposite direction, and the process repeats. No resistor is present, so the total energy remains constant and the motion is perpetual and harmonic.

The governing relation follows directly from Kirchhoff’s voltage law applied to the loop: the inductor voltage \(L di/dt\) exactly cancels the capacitor voltage \(q/C\). Because \(i = dq/dt\), this produces a second-order linear differential equation whose solutions are sines and cosines with angular frequency \(1/\sqrt{LC}\).

> [!NOTE]
> The electrical quantities map exactly onto mechanical ones: charge \(q\) plays the role of position \(x\), current \(i\) plays the role of velocity \(v\), inductance \(L\) plays the role of mass \(m\), and \(1/C\) plays the role of spring constant \(k\).

## 2. Why this matters — concrete and current
LC tanks set the resonant frequency of every superheterodyne receiver and every FM broadcast transmitter; modern software-defined radios still rely on high-Q LC filters to reject image frequencies before the analog-to-digital converter.

Superconducting LC resonators form the readout and coupling elements in transmon qubits; both IBM Quantum and Google Quantum AI use circuits whose resonance frequencies lie near 5–7 GHz and whose quality factors exceed \(10^6\) at millikelvin temperatures.

Particle-accelerator RF cavities are massive LC resonators whose stored electromagnetic energy accelerates bunches; the LHC 400 MHz cavities, for example, store several megajoules per cavity and must maintain phase stability to a few tenths of a degree.

Precision timekeeping and frequency synthesis in GPS satellites and optical-lattice clocks employ temperature-compensated LC oscillators as the first local oscillator before phase-locking to atomic references.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Voltage–current relations for ideal L and C | They supply the two equations that close the loop         |
| Kirchhoff’s voltage law  | It equates inductor and capacitor voltages around a single loop |
| Definition of SHM        | It supplies the differential equation whose solutions are already known |
| Energy conservation      | It shows why the oscillation amplitude remains constant   |

## 4. Building the idea — from intuition to formalism

### Step 1 — Energy resides in two distinct stores
Energy can sit either as \(\frac12 C V^2\) on the capacitor plates or as \(\frac12 L I^2\) in the inductor’s magnetic field. At any instant the sum is fixed.

A 10 nF capacitor charged to 5 V stores 125 nJ; that same energy appears as a 1 A current in a 250 nH inductor.

The instantaneous energies are
\[
U_C = \frac{q^2}{2C}, \qquad U_L = \frac12 L i^2.
\]

> [!WARNING]
> Treating the inductor voltage as constant rather than \(L di/dt\) destroys the coupling between the two energy stores.

### Step 2 — Current is the rate of change of charge
By definition the current leaving one plate of the capacitor equals the rate at which charge on that plate decreases:
\[
i = -\frac{dq}{dt}.
\]

If \(q\) decreases at 2 mC s\(^{-1}\), the current is 2 mA in the direction that discharges the capacitor.

\[
i \equiv -\frac{dq}{dt}.
\]

> [!WARNING]
> Reversing the sign convention between \(i\) and \(dq/dt\) produces an inverted differential equation whose frequency is still correct but whose phase is consistently wrong.

### Step 3 — Kirchhoff’s loop rule supplies the restoring mechanism
The sum of voltages around the closed loop is zero:
\[
L\frac{di}{dt} + \frac{q}{C} = 0.
\]

Substituting the definition of current converts this into an equation containing only \(q\).

### Step 4 — Differentiation yields the SHM equation
Differentiate the loop equation once with respect to time and replace \(di/dt\) by \(d^2q/dt^2\):
\[
L\frac{d^2q}{dt^2} + \frac{q}{C} = 0.
\]

Divide by \(L\):
\[
\frac{d^2q}{dt^2} + \frac{1}{LC}q = 0.
\]

This is exactly the SHM equation \(\ddot x + \omega^2 x = 0\) with \(\omega^2 = 1/(LC)\).

### Step 5 — The general solution and initial conditions
The solution is
\[
q(t) = Q\cos(\omega t + \phi), \qquad \omega = \frac{1}{\sqrt{LC}}.
\]

Current follows by differentiation:
\[
i(t) = -\omega Q\sin(\omega t + \phi).
\]

## 5. Worked examples — every step shown

**Example 1 — Finding the period from component values**  
*Given:* \(L = 4\,\mu\)H, \(C = 1\,\)nF.  
*Find:* oscillation period \(T\).

\[
\omega = \frac{1}{\sqrt{LC}} = \frac{1}{\sqrt{4\times10^{-6}\times10^{-9}}} = 5\times10^{6}\,\text{rad s}^{-1}.
\]

*Why:* direct substitution of the derived angular frequency.

\[
T = \frac{2\pi}{\omega} = \frac{2\pi}{5\times10^6} = 1.257\times10^{-6}\,\text{s}.
\]

**1.257 µs**

*Reflection:* Only the product \(LC\) matters; doubling either component doubles the period.

**Example 2 — Energy partition at arbitrary phase**  
*Given:* \(q(0) = 2\,\mu\)C, \(i(0) = 0\), \(C = 2\,\)nF, \(L = 5\,\)mH.  
*Find:* inductor energy at \(t = T/8\).

First obtain
\[
\omega = 10^4\,\text{rad s}^{-1}, \quad Q = 2\,\mu\text{C}.
\]

Charge at \(T/8\):
\[
q = Q\cos(\pi/4) = 1.414\,\mu\text{C}.
\]

*Why:* cosine evaluated at one-eighth period.

Remaining capacitor energy:
\[
U_C = \frac{(1.414\times10^{-6})^2}{2\times2\times10^{-9}} = 0.5\,\mu\text{J}.
\]

Total energy (from initial condition):
\[
U_\text{total} = \frac{(2\times10^{-6})^2}{2\times2\times10^{-9}} = 1\,\mu\text{J}.
\]

Inductor energy:
\[
U_L = 1 - 0.5 = 0.5\,\mu\text{J}.
\]

**0.5 µJ**

*Reflection:* Energy is exactly half electric, half magnetic at 45° phase, independent of component values.

**Example 3 — Maximum current from initial charge**  
*Given:* \(Q_0 = 3\,\mu\)C, \(L = 2\,\)mH, \(C = 8\,\)nF.  
*Find:* peak current.

\[
\omega = \frac{1}{\sqrt{LC}} = 7.906\times10^4\,\text{rad s}^{-1}.
\]

Peak current occurs when all energy is magnetic:
\[
I_\text{max} = \omega Q_0 = 0.237\,\text{A}.
\]

**237 mA**

*Reflection:* The factor \(\omega\) converts charge amplitude directly into current amplitude.

**Example 4 — Phase from mixed initial conditions**  
*Given:* \(q(0) = 1\,\mu\)C, \(i(0) = 50\,\)mA, \(L = 1\,\)mH, \(C = 4\,\)nF.  
*Find:* phase constant \(\phi\).

\[
\omega = 1.581\times10^5\,\text{rad s}^{-1}, \quad Q = \sqrt{q_0^2 + (i_0/\omega)^2} = 1.118\,\mu\text{C}.
\]

\[
\phi = \arccos(q_0/Q) = 0.463\,\text{rad}.
\]

**\(\phi = 26.5^\circ\)**

*Reflection:* The initial current fixes the sine term and therefore the phase offset.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Writing \(i = +dq/dt\) instead of the discharge sign | Students copy the capacitor definition without regard to loop direction | Fix a consistent sign convention on the diagram before writing equations |
| Forgetting that \(\omega = 1/\sqrt{LC}\) is independent of amplitude | Mechanical SHM intuition carries over; amplitude independence is automatic here too | Verify that the differential equation is linear and homogeneous |
| Treating voltage across L as \(L I\) rather than \(L di/dt\) | Confusing steady-state DC inductance with AC behavior | Always start from Faraday’s law when writing the inductor voltage |
| Adding a resistive term “just to be realistic” | Real circuits contain resistance; the ideal model is then lost | Keep the model purely LC until damping is introduced deliberately |
| Confusing resonance frequency of driven RLC with natural frequency of LC | Both involve \(\sqrt{LC}\), but one is damped | Compute the homogeneous solution first; resonance appears only when a drive term is added |
| Using peak energy formulas with rms values | Laboratory instruments report rms; energy formulas use instantaneous peaks | Convert rms to peak by \(\sqrt{2}\) before substituting into \(\frac12 L I^2\) |
| Neglecting that current is continuous while charge on capacitor can jump (if switch closes) | Topology changes violate continuity assumptions | Check initial conditions against inductor current continuity |

## 7. The textbook-precise statement
For an ideal series combination of inductance \(L\) and capacitance \(C\) with no resistance and no external emf, the charge \(q(t)\) on the capacitor obeys
\[
L\ddot q + \frac1C q = 0,
\]
subject to initial conditions \(q(0)\) and \(\dot q(0)\). The general solution is
\[
q(t) = A\cos\omega t + B\sin\omega t, \qquad \omega = (LC)^{-1/2}.
\]
(Griffiths, *Introduction to Electrodynamics*, 4e, §8.2.2, “LC Oscillations”.)

## 8. Visual — diagram or schematic
```text
          +──────[ L ]──────+
          │                 │
         [C]                │
          │                 │
          +─────────────────+
          ↑ i(t)            ↑ q(t) on upper plate
```
Horizontal line is the closed loop. Inductor L on top branch, capacitor C on bottom branch. Arrow labeled i(t) circulates clockwise; charge q(t) marked on upper capacitor plate.

## 9. The memory technique
1. **The hook** — Picture two buckets connected by a pipe: one bucket holds water (electric charge), the other holds a spinning flywheel (magnetic field). Water flowing turns the flywheel; the flywheel’s inertia pushes water back the other way.
2. **What to overlearn** — \(\omega = 1/\sqrt{LC}\); total energy \(U = q^2/(2C) + Li^2/2\) is constant; \(i = -dq/dt\).
3. **Spaced-repetition schedule** — Review the differential equation and frequency formula at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from \(v_L = L di/dt\), \(v_C = q/C\), close the loop with KVL, differentiate, and recover SHM.

## 10. What this unlocks
LC oscillations supply the homogeneous solution required for every driven RLC circuit, every coupled-resonator filter, and every discussion of Q-factor and damping.

- Driven series RLC circuits  
- Coupled LC oscillators and normal modes  
- Impedance matching networks and Smith-chart techniques  
- Quantum harmonic oscillator in circuit QED  

## 11. Self-check — five questions, no answers
1. Derive the differential equation for charge starting from Faraday’s law and the capacitor relation; state the single assumption that makes the equation linear.  
2. An LC circuit has \(L = 3\,\mu\)H and stores 4 µJ when the capacitor is fully charged. Compute the maximum current that will ever flow.  
3. Show that the time-averaged electric energy equals the time-averaged magnetic energy over one period, and state whether this remains true if a small resistance is added.  
4. Two different LC pairs have the same resonant frequency but different L and C. Which pair stores more total energy for the same charge amplitude?  
5. A student writes \(L d^2q/dt^2 + q/C = 0\) but obtains \(\omega = \sqrt{LC}\). Identify the algebraic error and give the correct frequency.