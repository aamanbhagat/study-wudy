## 1. The one-sentence answer
**Fatigue analysis via S-N curves and Miner's rule quantifies how repeated cyclic stresses below a material's ultimate strength accumulate irreversible damage until fracture occurs.**

A metal component in a spacecraft experiences thousands of vibration cycles during launch and orbit adjustments. Each cycle imposes a stress that never reaches the static failure load, yet after enough repetitions the part cracks. The S-N curve records the stress amplitude at which a specimen survives exactly N cycles; it therefore converts an observed stress history into an expected life.

Miner's rule then adds the fractional lives consumed at every different stress level. When the sum of those fractions reaches one, failure is predicted. The approach assumes damage is linear and order-independent, which is an engineering approximation rather than a physical law.

> [!NOTE]
> The decisive insight is that life is exhausted by *fractional* consumption at each stress, not by any single peak; a few high-stress cycles can therefore dominate the total damage budget even when most cycles are mild.

## 2. Why this matters — concrete and current
SpaceX re-uses Falcon 9 first-stage tanks that experience thousands of pressure and thermal cycles between flights. Engineers track cumulative fatigue damage on the aluminium-lithium domes to certify each booster for a second or third flight without destructive inspection.

NASA's Europa Clipper mission must survive intense vibro-acoustic loads during launch followed by years of low-level thermal cycling in Jupiter orbit. Miner's rule is applied to the titanium propellant lines to show that the combined spectrum remains below the failure threshold with the required margin.

Reaction-wheel assemblies on commercial GEO satellites spin at varying speeds for attitude control. Bearing fatigue life is predicted from S-N data for the 52100 steel races; operators use the rule to schedule wheel replacements before the cumulative damage index reaches 0.7.

Additive-manufactured brackets on the Artemis Orion spacecraft contain microscopic porosity that lowers the high-cycle fatigue limit. Qualification testing therefore maps an S-N curve specific to the build parameters and applies Miner's summation across the random vibration spectrum measured on the SLS booster.

## 3. Mental prerequisites
| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Uniaxial stress          | S-N curves are defined for fully reversed or mean-stress-adjusted uniaxial tension-compression |
| Cycle counting           | Rain-flow or peak counting converts a random load history into discrete stress ranges |
| Linear superposition     | Miner's rule adds damage fractions; it therefore inherits the linearity of elastic stress fields |

## 4. Building the idea — from intuition to formalism

### Step 1 — Cyclic stress shortens life even when static strength is not exceeded
A bar loaded once to 60 % of its tensile strength survives; the same stress repeated 10^5 times produces a crack. The material therefore possesses a fatigue limit that depends on the number of repetitions.

Example: a polished steel specimen survives 10^7 cycles at 300 MPa but fails after 10^5 cycles at 450 MPa.

Formally, the fatigue life N at stress amplitude S is read from the material-specific S-N curve:
$$N = f(S)$$

> [!WARNING]
> Treating the fatigue limit as a hard threshold below which infinite life is guaranteed ignores the statistical scatter and the effect of mean stress.

### Step 2 — The S-N curve is obtained from constant-amplitude tests
Standard rotating-bending or axial tests apply fully reversed sinusoidal stress until fracture. The median life at each stress level is plotted on log-log axes.

The Basquin relation in the high-cycle regime is
$$S = A N^{b}$$
where A and b are fitted constants.

> [!WARNING]
> Using the median curve without knockdown factors for surface finish, size, or temperature produces unconservative life predictions.

### Step 3 — Damage per cycle is defined as the reciprocal of life
At a given stress S_i the specimen can withstand N_i cycles before failure. Each applied cycle therefore consumes the fraction 1/N_i of the total life.

### Step 4 — Miner's rule sums the fractional damage
When several stress levels act in sequence, the total damage is assumed additive:
$$\sum_{i=1}^{k} \frac{n_i}{N_i} = 1$$
at failure, where n_i is the number of cycles applied at stress S_i.

### Step 5 — The rule is applied after rain-flow counting of a service spectrum
A measured or modelled load-time history is reduced to a set of closed hysteresis loops. Each loop supplies an (S_i, n_i) pair that is inserted into the summation above.

## 5. Worked examples — every step shown

**Example 1 — Constant-amplitude life from an S-N curve**  
*Given:* For 7075-T6 aluminium, S = 200 MPa lies on the curve N = 2×10^6 cycles.  
*Find:* Cycles to failure.  
Read directly from the curve.  
**200 MPa → N = 2×10^6 cycles**  
*Reflection:* The example is trivial but establishes that N is a deterministic function of S for a given material and surface condition.

**Example 2 — Single-level damage fraction**  
*Given:* 50 000 cycles at 200 MPa (N = 2×10^6).  
*Find:* Damage D.  
Each cycle consumes 1/N = 5×10^{-7}.  
D = 50 000 × 5×10^{-7} = 0.025.  
**D = 0.025**  
*Reflection:* Damage is simply the ratio; the calculation forces recognition that even 2.5 % of life is consumed by a modest number of cycles.

**Example 3 — Two-level Miner's summation**  
*Given:* 10 000 cycles at S_1 = 250 MPa (N_1 = 4×10^5) and 80 000 cycles at S_2 = 180 MPa (N_2 = 8×10^6).  
*Find:* Total damage and remaining life fraction.  
D_1 = 10 000 / 4×10^5 = 0.025  
D_2 = 80 000 / 8×10^6 = 0.01  
D_total = 0.035  
Remaining life fraction = 1 − 0.035 = 0.965.  
**D_total = 0.035**  
*Reflection:* The higher stress dominates despite fewer cycles; this illustrates why spectrum peaks control design.

**Example 4 — Spectrum with three stresses and failure prediction**  
*Given:* A launch vibration spectrum produces n_1 = 2×10^4 cycles at 300 MPa (N_1 = 1×10^5), n_2 = 1×10^5 at 220 MPa (N_2 = 1.5×10^6), n_3 = 3×10^6 at 150 MPa (N_3 = 2×10^7).  
*Find:* Cumulative damage and whether failure occurs before end of mission.  
D_1 = 2×10^4 / 1×10^5 = 0.2  
D_2 = 1×10^5 / 1.5×10^6 ≈ 0.0667  
D_3 = 3×10^6 / 2×10^7 = 0.15  
D_total = 0.4167 < 1 → mission survives.  
**D_total = 0.4167**  
*Reflection:* The arithmetic is elementary, yet the ordering of stresses is lost once the sum is formed; this is the central modelling assumption.

## 6. Common traps and how to avoid them
| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using the median S-N curve without factors | Test data scatter is ignored                        | Apply A-basis or B-basis knockdowns per MMPDS        |
| Ignoring mean-stress effects      | Most service loads are not fully reversed           | Use Goodman or Gerber correction before entering S-N |
| Treating Miner's sum = 1 as exact | Real materials show load-sequence and interaction effects | Apply safety factor 0.7–0.8 on the damage index      |
| Counting every peak instead of closed cycles | Over-counts non-damaging reversals                  | Always apply rain-flow counting first                |
| Extrapolating S-N below the knee without endurance limit | Some alloys have no true limit                      | Verify material class and apply infinite-life criterion only when justified |
| Neglecting surface and size factors | S-N curves are for polished lab specimens           | Multiply stress by K_f and K_size before lookup      |
| Summing damage across different temperatures | Creep-fatigue interaction is nonlinear              | Use separate S-N families or nonlinear damage models |

## 7. The textbook-precise statement
For a uniaxial stress spectrum reduced to discrete levels S_i with n_i applied cycles, the Palmgren-Miner linear damage rule states
$$\sum_{i} \frac{n_i}{N(S_i)} = D$$
where N(S) is taken from the material S-N curve (typically Basquin form in the high-cycle regime) and failure is predicted when D reaches a critical value D_c (commonly set to 1). The rule assumes elastic behaviour, constant temperature, and no load-sequence effects. Reference: Shigley, *Mechanical Engineering Design*, 11e, §6.4–6.5.

## 8. Visual — diagram or schematic
```text
Stress S (MPa)
   ^
   |   *  (high-stress, low-cycle)
   |    *
   |     *   S-N curve (log-log)
   |      *
   |       *  
   |        *  
   |         *  
   |          *  (fatigue limit knee)
   +-----------*------------------> log10 N (cycles)
        10^4   10^6   10^7   10^8
```
Horizontal axis: log cycles; vertical axis: log stress amplitude. The straight line in the finite-life region follows S = A N^b; below the knee the curve flattens for ferrous alloys.

## 9. The memory technique
1. **The hook** — Picture a bank account where every stress cycle is a withdrawal of 1/N dollars; when the balance hits zero the part is bankrupt.
2. **What to overlearn** — Basquin exponent b ≈ −0.085 for metals; Miner's critical index D_c = 1 (or 0.7–0.8 with margin).
3. **Spaced-repetition schedule** — Review the summation equation at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the fractional damage 1/N from the definition of the S-N curve, then invoke linearity of elastic damage accumulation.

## 10. What this unlocks
Mastery of S-N curves and Miner's rule supplies the fatigue half of any spacecraft structural verification. It directly enables subsequent work on crack-propagation (Paris law), fracture-mechanics-based life extension, and probabilistic fatigue design under random vibration.

- Next: cumulative damage under variable amplitude with interaction effects
- Next: Goodman diagram construction for mean-stress correction
- Next: rain-flow cycle counting algorithms for power-spectral-density loads

## 11. Self-check — five questions, no answers
1. A polished 2024-T3 specimen has N = 5×10^5 cycles at 180 MPa. How many cycles at 220 MPa produce the same damage?
2. Why does the presence of a tensile mean stress move a data point leftward on the S-N plot?
3. A spectrum yields D = 0.92 after 10 years. If the highest stress bin is removed, D drops to 0.61. Which physical assumption is being tested?
4. Two load sequences produce identical rain-flow matrices yet different experimental lives. Which modelling hypothesis is violated?
5. Derive the expression for remaining life fraction after partial damage D has already accumulated, assuming the next block is applied at constant amplitude S.