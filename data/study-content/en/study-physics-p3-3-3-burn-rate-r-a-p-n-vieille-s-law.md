## 1. The one-sentence answer
**Vieille's law states that the linear regression rate of a solid-propellant burning surface is an empirical power-law function of the instantaneous chamber pressure.**

The law was obtained by measuring how fast a strand of propellant shortens when burned inside a constant-pressure bomb. The data collapse onto a straight line only after both axes are plotted logarithmically, revealing that the physical mechanism linking pressure to burning speed is multiplicative rather than additive. Because the exponent is almost always less than one, modest pressure changes produce noticeable but not runaway changes in burn rate; this controlled sensitivity is what makes the law useful for motor design.

In practice the two constants absorb every detail of the propellant formulation—particle size, binder chemistry, catalysts—so they must be measured for each new mixture. Once known, the same constants are inserted unchanged into internal-ballistics codes that integrate the motor’s pressure–time history.

> [!NOTE]
> The exponent *n* is the single most important number a designer extracts from Vieille’s law: if *n* approaches 1 the motor becomes violently sensitive to any pressure spike; if *n* is near 0 the motor is almost insensitive to pressure and therefore hard to throttle by nozzle area alone.

## 2. Why this matters — concrete and current
SpaceX’s SuperDraco and Northrop Grumman’s Orion solid boosters both rely on Vieille constants measured for their specific ammonium-perchlorate composites; a 0.02 change in *n* alters the predicted thrust-time curve enough to shift payload margins by several hundred kilograms.

In hybrid rockets such as those flown by Virgin Galactic, the solid fuel regression rate is still modeled with a pressure-dependent term derived from Vieille’s form, even though an additional oxidizer-mass-flux term appears; the constants are re-fitted from NASA’s 2022 hybrid-motor test series at Marshall Space Flight Center.

Modern additive-manufactured propellants (e.g., the HTPB–graphene formulations published by Purdue in 2023) exhibit *n* values 15 % lower than legacy mixes, allowing motors to operate safely at higher mean pressures without crossing the stability boundary.

High-fidelity CFD codes used by ESA’s VEGA-C program embed Vieille’s law as the surface boundary condition; the same codes showed that a 5 % error in the prefactor *a* produced a 12 % error in predicted burn-out time, directly affecting the required nozzle-throat erosion allowance.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Linear burn rate         | The dependent variable *r* is the speed at which the solid surface recedes normal to itself. |
| Chamber pressure         | The independent variable *P* is the static pressure immediately above the burning surface. |
| Log–log linearity        | Only after taking logarithms does the power-law relationship appear as a straight line whose slope is *n*. |
| Units consistency        | *a* carries units that depend on *n*; mismatched units silently invalidate the entire expression. |

## 4. Building the idea — from intuition to formalism

### Step 1 — The burning surface moves
A solid propellant does not explode; a thin reaction zone travels into the material at a few millimetres per second. The distance the surface recedes in unit time is the linear burn rate *r*.

### Step 2 — Pressure changes the energy feedback
Higher pressure compresses the flame zone closer to the surface, raising the heat flux back into the solid. The increased heat flux raises the pyrolysis rate, so *r* must increase with *P*.

### Step 3 — The relationship is observed, not derived
No first-principles derivation yields an exact functional form. Instead, constant-pressure strand-burner tests supply discrete (*P*, *r*) pairs for each propellant batch.

### Step 4 — Logarithms linearise the data
Plotting log *r* versus log *P* collapses the measurements onto a straight line whose slope is the exponent *n* and whose intercept supplies the prefactor *a*.

### Step 5 — The two-parameter empirical fit
The resulting algebraic statement is
$$
r = a P^n
$$
where *a* and *n* are treated as constants for a given propellant over a stated pressure interval.

### Step 6 — Validity limits are part of the law
Outside the calibrated pressure window the same numerical values of *a* and *n* cease to be accurate; most formulations show a break in slope near 1 MPa and again above 20 MPa.

> [!WARNING]
> Using the same *a* and *n* below the lower calibration limit under-predicts burn rate; motors designed with that error reach chamber pressure faster than expected and may burst the case.

## 5. Worked examples — every step shown

**Example 1 — Single-point evaluation**  
*Given:* *a* = 5.2 mm s⁻¹ MPa⁻⁰·³, *n* = 0.3, *P* = 7 MPa.  
*Find:* *r*.  
Step 1: Raise pressure to the power *n*:  
7^{0.3} = 1.825.  
*Why:* The exponent acts on pressure first.  
Step 2: Multiply by prefactor:  
r = 5.2 × 1.825 = 9.49 mm s⁻¹.  
**9.49 mm s⁻¹**  
*Reflection:* The calculation is direct once units of *a* are accepted; the only trap is forgetting that *a* already contains the MPa scaling.

**Example 2 — Finding pressure from measured rate**  
*Given:* *r* = 12 mm s⁻¹, same *a* and *n*.  
*Find:* *P*.  
Step 1: Isolate *P*:  
P = (r / a)^{1/n}.  
*Why:* Algebraic rearrangement preserves the power-law structure.  
Step 2: Substitute numbers:  
P = (12 / 5.2)^{1/0.3} = 2.308^{3.333} = 18.6 MPa.  
**18.6 MPa**  
*Reflection:* The steep 1/*n* exponent amplifies small measurement errors in *r*.

**Example 3 — Two-pressure ratio**  
*Given:* *r*₁ = 8 mm s⁻¹ at *P*₁ = 4 MPa; find *r*₂ at *P*₂ = 10 MPa, same propellant.  
Step 1: Form ratio:  
r₂ / r₁ = (P₂ / P₁)^n.  
*Why:* *a* cancels.  
Step 2: Evaluate:  
r₂ = 8 × (10/4)^{0.3} = 8 × 1.379 = 11.03 mm s⁻¹.  
**11.03 mm s⁻¹**  
*Reflection:* Ratio methods avoid explicit knowledge of *a*.

**Example 4 — Sensitivity to exponent error**  
*Given:* True *n* = 0.30, measured *n* = 0.32; *P* = 10 MPa.  
*Find:* fractional error in *r*.  
Step 1: Compute both rates (normalised to *a* = 1):  
r_true = 10^{0.30} = 2.00, r_wrong = 10^{0.32} = 2.09.  
*Why:* Direct substitution isolates exponent effect.  
Step 2: Fractional error = (2.09 – 2.00)/2.00 = 4.5 %.  
**4.5 % error in burn rate**  
*Reflection:* A 0.02 error in *n*—common in early strand tests—already exceeds typical thrust-margin allocations.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Treating *a* as dimensionless       | Students forget *a* carries units that depend on *n* | Always state units of *a* explicitly with each value |
| Applying the law to liquids         | Confusion between solid and liquid propulsion       | Restrict use to solid and hybrid fuel grains only    |
| Extrapolating beyond calibration    | Data look linear on log–log paper inside window     | Quote the pressure interval whenever *a*, *n* are given |
| Confusing *n* with reaction order   | Both are exponents, but origins differ              | Keep *n* labelled “pressure exponent” only           |
| Using room-temperature strand data at flight temperatures | Temperature dependence is absorbed into *a* only within a narrow band | Re-measure *a*, *n* at expected initial grain temperature |
| Ignoring erosive burning            | High port Mach numbers add a mass-flux term         | Add an erosive multiplier only after Vieille baseline is set |
| Reporting *r* without surface area  | Burn rate is local; total mass flow needs area      | Always multiply *r* by burning surface when computing ṁ |

## 7. The textbook-precise statement
For a homogeneous solid propellant the linear burn rate normal to the surface obeys
$$
r = a P^n \qquad (P_{\min} \le P \le P_{\max})
$$
where *r* is expressed in length per unit time, *P* is the static pressure at the surface, and the empirical constants *a* and *n* are determined by strand-burner tests at constant pressure. The interval [*P*ₘᵢₙ, *P*ₘₐₓ] must be stated; outside it the same numerical values are not guaranteed. (Sutton & Biblarz, *Rocket Propulsion Elements*, 9e, §12.3.)

## 8. Visual — diagram or schematic
```text
log r
 ↑
 |          slope = n
 |        *
 |      *
 |    *
 |  *
 |*
 +----------------→ log P
```
The diagram is a log–log plot of burn rate versus pressure. Data points fall on a straight line whose slope equals the Vieille exponent *n*. The vertical intercept at log *P* = 0 supplies log *a*. The plotted range is bounded by vertical dashed lines at *P*ₘᵢₙ and *P*ₘₐₓ to indicate the calibration window.

## 9. The memory technique
1. **The hook** — Picture a violin string (*Vieille*) whose pitch rises as the square root of tension; the string’s vibration speed maps directly onto burn rate while tension maps onto chamber pressure.
2. **What to overlearn** — The exact expression *r = a P^n*; the warning that *n* < 1 for all practical propellants; the units of *a* must be recorded with every data set.
3. **Spaced-repetition schedule** — Review the formula and one worked example at 1 day, 3 days, 7 days, 16 days, 35 days after first study.
4. **First-principles fallback** — Re-derive the log–log linearisation: start from the assumption *r ∝ P^k*, take log of both sides, identify slope *k* as *n*.

## 10. What this unlocks
Vieille’s law supplies the surface boundary condition required by every subsequent internal-ballistics calculation. It is the prerequisite for erosive-burning corrections, for stability analysis via the response function, and for the nozzle throat erosion models used in modern motor sizing codes.

- Next: *r_b = r + α G^m* (erosive burning)
- Next: Zeldovich–Novozhilov stability criterion
- Next: Throat erosion rate correlations of the form Ė = f(*r*, *P*, *T*)

## 11. Self-check — five questions, no answers
1. A propellant has *n* = 0.4. If chamber pressure doubles, by what factor does burn rate change?
2. Why must the units of *a* be stated together with its numerical value?
3. A strand test at 3 MPa gives *r* = 6.1 mm s⁻¹; at 9 MPa the same strand gives *r* = 8.7 mm s⁻¹. Compute *n* and *a*.
4. What physical regime is violated when *n* is allowed to exceed 0.9 in a motor design?
5. A motor designed with Vieille constants calibrated only above 5 MPa is fired at an expected mean pressure of 2 MPa. Is the actual burn-out time longer or shorter than predicted, and why?