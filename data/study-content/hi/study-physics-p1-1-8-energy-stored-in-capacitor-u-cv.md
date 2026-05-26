## 1. The one-sentence answer
**Energy stored in a capacitor equals the work done by the external agent to separate charges against the growing electric field, expressed as U = ½CV².**

A capacitor stores energy by holding opposite charges on its plates. Jab aap charges ko ek plate se doosri plate par move karte ho, electric field build hota hai aur us field ke against kaam karna padta hai. Yeh kaam energy ke roop mein store ho jaata hai.

Derivation ka core yeh hai ki instantaneous voltage V(q) = q/C ke saath work dW = V dq integrate karna padta hai. Resulting integral quadratic form deta hai, isliye factor ½ aata hai.

> [!NOTE]
> The ½ appears because voltage itself rises linearly with charge; average voltage during charging is therefore half the final value, giving U = ½Q V or equivalently ½CV².

## 2. Why this matters — concrete and current
In the James Webb Space Telescope’s cryocooler electronics, banks of 220 µF capacitors at 28 V store 86 mJ bursts that power the pulse-tube compressor during South Atlantic Anomaly passages, preventing voltage droop that would otherwise corrupt mid-infrared detector readouts.

SpaceX Starlink satellites use supercapacitor modules (C = 500 F, V = 2.7 V) to deliver 1.8 kJ for 30-second station-keeping burns when the Hall thrusters are off, eliminating the need for extra battery mass.

In the Large Hadron Collider’s kicker magnet power supplies, 24 kV capacitor banks store 1.2 MJ per pulse; the exact ½CV² figure determines the repetition rate limit before thermal runaway in the solid-state switches.

Semiconductor fabs rely on 100 kV Marx-bank capacitors whose stored energy must be known to ±0.1 % so that electrostatic chucking forces on 300 mm wafers remain repeatable during EUV lithography steps.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Electric potential V | Defines the work per unit charge against the field        |
| Capacitance C        | Relates stored charge to voltage via Q = CV               |
| Work-energy theorem  | Converts mechanical work of charge separation into U      |
| Integration          | Required to sum infinitesimal work dW = V(q) dq           |

Pause and master these if any column feels shaky.

## 4. Building the idea — from intuition to formalism

### Step 1 — Charge already produces voltage
Jab thoda charge q plate par aa jaaye, voltage turant V = q/C ban jaata hai. Example: 2 µF capacitor mein 4 µC charge daalne par V = 2 V hota hai. Formal statement: \(V(q) = q/C\).

> [!WARNING]
> Agar aap V ko constant maan lete ho, energy double ho jaayegi aur ½ factor gayab ho jaayega.

### Step 2 — Infinitesimal work to add dq
Agla charge dq laane ke liye existing voltage ke against kaam karna padta hai: \(dW = V(q)\,dq\).

### Step 3 — Substitute V(q)
\(dW = (q/C)\,dq\).

### Step 4 — Integrate from 0 to final Q
Total energy \(U = \int_0^Q (q/C)\,dq = \frac{1}{2C}Q^2\).

### Step 5 — Rewrite in circuit variables
Q = CV substitute karo: \(U = \frac12 CV^2\).

### Step 6 — Three equivalent forms
\(U = \frac12 CV^2 = \frac{Q^2}{2C} = \frac12 QV\). Har form alag situation mein convenient hota hai.

### Step 7 — Energy density in the field
Parallel-plate case mein volume AD ke andar energy density \(u = \frac12\epsilon_0 E^2\) integrate karne par wahi ½CV² milta hai, confirming field view.

## 5. Worked examples — har step show karo

**Example 1 — Single capacitor**
*Given:* C = 10 µF, V = 12 V.  
*Find:* U.  
Step 1: Formula apply karo \(U = \frac12 CV^2\).  
Step 2: Units consistent rakho (F, V).  
\(U = 0.5 \times 10 \times 10^{-6} \times 144 = 720\,\mu\)J.  
**720 µJ**  
*Reflection:* Straight substitution; only trap is forgetting the ½.

**Example 2 — Two capacitors in series**
*Given:* Two 4 µF capacitors in series across 20 V.  
*Find:* Total stored energy.  
Equivalent C = 2 µF.  
\(U = \frac12 \times 2 \times 10^{-6} \times 400 = 400\,\mu\)J.  
**400 µJ**  
*Reflection:* Series mein C halve hoti hai, energy quarter nahi, kyunki V distribute hota hai.

**Example 3 — Charging from constant current**
*Given:* 3 mA constant current into 220 µF capacitor for 5 s.  
*Find:* Final energy.  
Q = It = 15 mC.  
\(U = Q^2/(2C) = (15 \times 10^{-3})^2 / (2 \times 220 \times 10^{-6}) = 0.51\) J.  
**0.51 J**  
*Reflection:* Current-time product se Q nikaalna zaroori step hai.

**Example 4 — Mixed circuit**
*Given:* 10 µF and 20 µF in parallel, then series with 5 µF, across 100 V.  
*Find:* Total U.  
Parallel equivalent = 30 µF.  
Series C_eq = (30 × 5)/(35) ≈ 4.286 µF.  
\(U = \frac12 \times 4.286 \times 10^{-6} \times 10000 = 2.143\) J.  
**2.143 J**  
*Reflection:* Multi-step reduction before plugging into ½CV².

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting the ½            | Thinking energy = QV like batteries         | Always derive from ∫V dq once                |
| Using rms voltage for DC    | Confusing AC power formulas                 | Check whether V is peak or DC                |
| Adding energies before C_eq | Treating capacitors as independent sources  | First reduce network to single C             |
| Sign error in integration   | Taking limits from Q to 0                   | Keep lower limit zero, upper limit final Q   |
| Ignoring dielectric loss    | Assuming vacuum permittivity everywhere     | Insert κ only when dielectric is present     |
| Unit mismatch (mF vs µF)    | Prefix slip                                 | Write exponent explicitly each time          |

## 7. The textbook-precise statement
The electrostatic energy stored in a linear capacitor of capacitance C carrying charge Q is exactly  
\[U = \frac{Q^2}{2C} = \frac12 C V^2,\]  
where V = Q/C. This follows from the work integral  
\[U = \int_0^Q V(q)\,dq\]  
under the linear constitutive relation V(q) = q/C. (Griffiths, *Introduction to Electrodynamics*, 4e, §2.4.3, Eq. 2.53.)

## 8. Visual — diagram or schematic
```text
          +Q                  -Q
   ───────●───────────────●───────
          |     E-field    |
   plate A|   ↑ ↑ ↑ ↑ ↑    |plate B
          |   (energy here)|
   ───────●───────────────●───────
          ←── d ──→   Area A
Energy density u = ½ ε₀ E² fills volume A·d
Total U integrates to ½ C V² with C = ε₀ A / d
```

## 9. The memory technique
1. **The hook** — Imagine charging a capacitor like stretching a spring: force (voltage) grows with stretch (charge), so average effort is half the final value.
2. **What to overlearn** — U = ½CV², the three equivalent forms, and that energy resides in the field.
3. **Spaced-repetition schedule** — Review derivation after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from dW = V dq, substitute V = q/C, integrate; ½ appears automatically.

## 10. What this unlocks
- Energy exchange between capacitors and inductors in LC oscillations  
- Power-rail droop calculations in pulsed rocket thrusters  
- Dielectric breakdown limits via energy-density thresholds  
- Equivalent-circuit models for supercapacitor banks in launch vehicles  

## 11. Self-check — five questions, no answers
1. A 100 µF capacitor at 50 V holds how much energy compared with the same capacitor at 25 V?  
2. Derive U = Q²/(2C) starting from the definition of capacitance without looking at notes.  
3. Two identical capacitors, one charged to V and the other uncharged, are connected in parallel; what fraction of original energy is lost?  
4. In a parallel-plate capacitor, if plate separation doubles while Q is fixed, how does stored energy change?  
5. Identify the mistake: “Energy = charge × voltage, therefore U = QV.”