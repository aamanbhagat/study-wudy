## 1. The one-sentence answer
**Energy stored in a capacitor equals one-half the product of its capacitance and the square of the voltage across it.**

A capacitor accumulates opposite charges on two conductors separated by an insulator. The work done to move each incremental charge against the growing electric field is stored as potential energy in that field. Because the voltage rises linearly with added charge, the average voltage during charging is half the final value, yielding the factor of one-half.

The same result follows from integrating the instantaneous power delivered by the charging source. No energy is lost to heat in the ideal case; all work appears in the electric field.

> [!NOTE]
> The quadratic dependence on voltage means doubling the operating voltage stores four times the energy, which is why high-voltage designs dominate aerospace power systems.

## 2. Why this matters — concrete and current
NASA’s Europa Clipper mission uses supercapacitor banks rated at several hundred farads to buffer power spikes from its radar sounder during flybys; the stored-energy formula directly sets the mass of those banks.

In SpaceX Starlink satellites, the phased-array antennas rely on thousands of small decoupling capacitors whose collective stored energy must survive brief eclipse periods; engineers size them with U = ½CV² to guarantee link margin without excess mass.

The James Webb Space Telescope’s fine-steering mirror actuators employ piezoelectric drivers whose drive capacitors store 10–20 mJ per cycle; the quadratic voltage term determines the required solar-array overcapacity.

Laboratory railgun experiments at the Air Force Research Laboratory routinely reach 5 MJ stored in capacitor banks; the same formula governs safety interlocks and pulse-shaping networks.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Charge and voltage       | Defines the state variables whose product gives energy    |
| Capacitance definition   | C = Q/V supplies the linear relation between Q and V      |
| Work as line integral    | Energy is work done by the external agent against E-field |
| Integration of power     | Instantaneous power P = VI integrated over time yields U  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Charge produces voltage
Opposite charges on the plates create an electric field proportional to the accumulated charge. For any given geometry the voltage between plates is therefore V = Q/C.  
Concrete example: a 1 µF capacitor holding 1 µC shows 1 V.  
Formal statement:  
$$V = \frac{Q}{C}.$$  
> [!WARNING]  
> Treating V as independent of Q reverses cause and effect and produces inconsistent energy calculations.

### Step 2 — Incremental work to add charge
To move an extra dQ onto the positive plate you must push against the existing voltage V. The infinitesimal work is therefore dU = V dQ.  
Formal statement:  
$$dU = V\,dQ.$$  
> [!WARNING]  
> Omitting the differential leaves the factor-of-two error that appears in many early student derivations.

### Step 3 — Substitute the linear relation
Replace V with Q/C inside the work expression:  
$$dU = \frac{Q}{C}\,dQ.$$  
This substitution is valid only because capacitance is constant.

### Step 4 — Integrate from zero to final charge
Integrate both sides from Q = 0 to Q = Q_final:  
$$U = \int_0^{Q_f} \frac{Q}{C}\,dQ = \frac{1}{2C}Q_f^2.$$  
The definite integral supplies the exact factor of one-half.

### Step 5 — Express in measurable voltage
Use Q_f = C V_f to eliminate charge:  
$$U = \frac{1}{2} C V_f^2.$$  
This is the textbook result for energy stored in an electrostatic field between capacitor plates.

## 5. Worked examples — every step shown

**Example 1 — Parallel-plate capacitor at 100 V**  
*Given:* C = 2.0 µF, V = 100 V.  
*Find:* stored energy U.  
Step 1: Write the defining relation.  
$$U = \frac12 C V^2$$  
*Why:* direct statement of the derived result.  
Step 2: Substitute values.  
$$U = \frac12 \times 2.0 \times 10^{-6} \times (100)^2 = 0.01\,\text{J}$$  
**0.01 J**  
*Reflection:* arithmetic is trivial; the example checks unit consistency.

**Example 2 — Charge known instead of voltage**  
*Given:* C = 470 nF, Q = 3.2 µC.  
*Find:* U.  
Step 1: Convert to voltage via V = Q/C.  
$$V = \frac{3.2 \times 10^{-6}}{470 \times 10^{-9}} = 6.81\,\text{V}$$  
*Why:* need V for the energy formula.  
Step 2: Insert into energy expression.  
$$U = \frac12 \times 470 \times 10^{-9} \times (6.81)^2 = 1.09 \times 10^{-5}\,\text{J}$$  
**10.9 µJ**  
*Reflection:* demonstrates conversion path when only charge is measured.

**Example 3 — Energy comparison at two voltages**  
*Given:* C = 100 µF, V₁ = 12 V, V₂ = 24 V.  
*Find:* ratio U₂/U₁.  
Step 1: Form the ratio directly.  
$$\frac{U_2}{U_1} = \left(\frac{V_2}{V_1}\right)^2 = 4$$  
*Why:* quadratic dependence cancels C and the ½.  
**Ratio = 4**  
*Reflection:* shows why voltage rating is the dominant design driver.

**Example 4 — Capacitor charged by constant-current source**  
*Given:* constant I = 2 mA, C = 10 µF, charging time t = 5 ms.  
*Find:* final stored energy.  
Step 1: Final voltage from Q = It.  
$$V = \frac{It}{C} = \frac{2\times10^{-3}\times5\times10^{-3}}{10\times10^{-6}} = 1\,\text{V}$$  
*Why:* linear ramp of voltage under constant current.  
Step 2: Apply energy formula.  
$$U = \frac12 C V^2 = 5\,\mu\text{J}$$  
**5 µJ**  
*Reflection:* connects time-domain charging to stored-energy result.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting the ½                  | Confuses energy with QV                     | Always derive from ∫V dQ                     |
| Using peak power instead of energy| Mixes instantaneous and integrated quantities | Integrate P dt explicitly                    |
| Treating C as voltage-dependent   | Real dielectrics show nonlinearity          | Verify C constant or use nonlinear integral  |
| Ignoring polarity reversal losses | Assumes ideal lossless discharge            | Account for ESR or external circuit resistance |
| Confusing U with power density    | Units appear similar at first glance        | Check dimensions: J vs W                     |
| Applying formula to AC rms values without care | rms voltage does not store average energy | Use instantaneous expression then average    |
| Neglecting self-discharge         | Ideal model omits leakage                   | Add parallel resistance term when time scales matter |

## 7. The textbook-precise statement
For a linear, time-invariant capacitor of constant capacitance C the electrostatic energy stored when the voltage difference between its terminals is V is  
$$U = \frac12 C V^2,$$  
where U is measured in joules when C is in farads and V in volts. The relation holds under the assumptions that (i) the electric field is quasistatic, (ii) no magnetic energy is stored, and (iii) dielectric losses are negligible. (Griffiths, *Introduction to Electrodynamics*, 4e, Eq. 8.2.)

## 8. Visual — diagram or schematic

```text
          +Q                  -Q
   ───────┬────────────────────┬───────
          │      E-field       │
   plate A│<──────────────────>│plate B
          │      d             │
   ───────┴────────────────────┴───────
          |<------ area A ----->|
Energy density u = ½ ε₀ E² fills volume A·d
Total U = u·volume = ½ C V² with C = ε₀ A/d
```

## 9. The memory technique

1. **The hook** — Picture a capacitor as a spring whose “stretch” is voltage; energy stored is ½kx² with k replaced by C.  
2. **What to overlearn** — U = ½CV² and the differential form dU = V dQ.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by integrating V dQ after substituting V = Q/C.

## 10. What this unlocks
The capacitor energy relation is the foundation for time-constant calculations in RC circuits, resonance in LC tanks, and energy exchange in switched-mode power converters used on spacecraft.  
- Next: magnetic energy in inductors (½LI²)  
- Next: time-domain solution of series RLC circuits  
- Next: Poynting-vector proof that field energy resides in the volume between plates

## 11. Self-check — five questions, no answers
1. A 1 F supercapacitor is charged to 2.7 V. How much energy is stored?  
2. Derive the energy formula starting from the definition of capacitance and the work differential without looking at prior steps.  
3. Two identical capacitors are charged to V and then connected in parallel; what fraction of the initial energy is lost?  
4. Why does the energy expression remain valid when the dielectric constant is greater than unity?  
5. A capacitor is charged through a resistor from a constant-voltage source. Where does the “missing” half of the supplied energy appear?