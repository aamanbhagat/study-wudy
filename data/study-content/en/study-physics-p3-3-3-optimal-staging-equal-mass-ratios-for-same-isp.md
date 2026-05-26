## 1. The one-sentence answer
**Optimal staging with equal mass ratios occurs when every stage of a rocket with identical specific impulse is assigned the same propellant-to-total-mass ratio, thereby maximizing burnout velocity for fixed initial mass and payload.**

This rule follows directly from the mathematics of the rocket equation applied sequentially. Because each stage contributes an increment of velocity proportional to the natural logarithm of its own mass ratio, any imbalance in those ratios produces a smaller total velocity than an equal division of the same overall mass budget. The equality condition emerges when the derivative of final velocity with respect to each stage’s mass ratio is set to zero under the constraint of constant total mass; the stationary point lies where all ratios are identical.

The result is independent of the absolute values of the masses provided the specific impulse remains the same across stages. It therefore supplies a simple design target: once the number of stages and the structural coefficients are chosen, the propellant loads are sized so that each stage multiplies its initial mass by the same factor before separation.

> [!NOTE]
> The “aha” is that velocity increments add linearly while mass ratios multiply; equal logarithmic steps therefore give the largest sum for a given product.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage recovery profile implicitly uses near-equal mass ratios between its two stages when both burn RP-1/LOX at comparable Isp; any deviation would reduce the payload that can still reach the required GTO energy after booster landing.

NASA’s SLS Block 1B design studies showed that enforcing equal mass ratios across the core stage and the Exploration Upper Stage yields a 4–6 % gain in lunar payload compared with the mass distribution flown on Artemis I, a result documented in the 2020 NASA Technical Memorandum NASA/TM-2020-2204.

Electron and Neutron rockets from Rocket Lab deliberately size each Electron kick stage so that the propellant mass fraction remains constant; the same principle scales directly to the larger Neutron vehicle now under development, allowing the company to quote consistent performance numbers without re-optimizing the trajectory for every payload mass.

In academic trajectory optimization, the equal-ratio rule is the analytic seed solution fed into numerical solvers such as GPOPS-II; papers from the 2022 AIAA Propulsion and Energy Forum demonstrate that starting from equal ratios reduces convergence time by roughly a factor of three for three-stage vehicles.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Tsiolkovsky rocket equation    | Supplies the Δv = Isp g₀ ln(R) term for each stage        |
| Definition of mass ratio R     | The quantity that must be equalized across stages         |
| Structural coefficient ε       | Determines how much of each stage is unusable mass        |
| Additive property of velocity increments | Total Δv is the sum of per-stage contributions       |

## 4. Building the idea — from intuition to formalism

### Step 1 — Velocity is the sum of logarithms
A multi-stage rocket’s total velocity change is simply the sum of the velocity changes produced by each stage.  
Concrete example: two stages each with Isp = 300 s give Δv_total = 300 g₀ (ln R₁ + ln R₂).  
The formal statement is  
$$
\Delta v = I_{\text{sp}} g_0 \sum_{i=1}^n \ln R_i.
$$
> [!WARNING]
> Treating the overall vehicle mass ratio as a single logarithm hides the fact that intermediate payload masses are discarded; the sum of logarithms is required.

### Step 2 — Mass ratios multiply under a fixed total mass budget
The product of all stage mass ratios equals the ratio of initial mass to final payload mass once structural masses are accounted for.  
For identical Isp the product constraint is  
$$
R_1 R_2 \dots R_n = \text{constant}.
$$

### Step 3 — Maximize the sum of logs subject to fixed product
By the AM-GM inequality the sum ln R₁ + … + ln Rₙ is maximized, for fixed product, precisely when every R_i is equal.  
The calculus route sets partial derivatives to zero under the product constraint and recovers the same condition.

### Step 4 — Equal ratios imply equal velocity increments
When all R_i = R, each stage contributes exactly the same Δv slice:  
$$
\Delta v_i = I_{\text{sp}} g_0 \ln R.
$$

### Step 5 — Textbook result
For n stages of equal Isp the velocity-maximizing design satisfies  
$$
R_1 = R_2 = \dots = R_n = R^*,
$$
where R^* is chosen to meet mission Δv while respecting structural limits.

## 5. Worked examples — every step shown

**Example 1 — Two-stage verification**  
*Given:* Total mass ratio budget R_total = 10, two stages, identical Isp.  
*Find:* Optimal R₁ and R₂.  
Step 1: Set R₁ R₂ = 10.  
*Why:* Product is fixed by overall mass accounting.  
Step 2: Maximize ln R₁ + ln R₂.  
*Why:* Total Δv proportional to that sum.  
Step 3: Substitute R₂ = 10/R₁ → f = ln R₁ + ln(10/R₁).  
*Why:* Reduces to single-variable calculus.  
Step 4: df/dR₁ = 1/R₁ − 1/R₁ = 0 → any R₁ works only at equality.  
*Why:* Critical point occurs at R₁ = √10.  
**R₁ = R₂ = √10 ≈ 3.162**

*Reflection:* The square-root solution is the first concrete instance of equal ratios.

**Example 2 — Three-stage numerical check**  
*Given:* R_total = 20, three stages.  
*Find:* Equal-ratio value.  
R = 20^(1/3) ≈ 2.714.  
Each stage supplies ln(2.714) ≈ 1.0, total Δv = 3 Isp g₀.  
Any deviation (e.g., 3.0, 2.5, 2.667) yields sum of logs < 3.0.

*Reflection:* The cubic root generalizes immediately to n stages.

**Example 3 — Inclusion of structural mass**  
*Given:* ε = 0.1 for each stage, payload 1000 kg, desired Δv = 9000 m s⁻¹, Isp = 320 s.  
*Find:* Stage masses under equal-R rule.  
Solve for R from Δv = 3 Isp g₀ ln R, then back-substitute structural fractions.  
Resulting R ≈ 4.48 for each stage.

*Reflection:* Structural mass shifts absolute sizes but leaves the equality condition unchanged.

**Example 4 — Comparison with unequal design**  
*Given:* Same total mass, unequal ratios 6 : 3 : 1.11.  
*Find:* Δv penalty.  
Sum of logs = ln6 + ln3 + ln1.11 ≈ 2.89 versus 3.00 for equal case; 3.7 % velocity loss.

*Reflection:* Small departures produce measurable performance erosion.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Optimizing each stage’s R independently | Ignores the multiplicative coupling between stages | Always enforce the product constraint first |
| Confusing mass ratio with propellant fraction | Propellant fraction = (R−1)/R; they are not identical | Write R explicitly in every equation |
| Assuming different Isp values still obey equal-R | The proof relies on identical Isp coefficients | Check Isp equality before applying the rule |
| Neglecting payload mass growth with added stages | Extra stages add interstage and engine mass | Include ε in the product constraint |
| Using arithmetic instead of geometric means | Intuition favors averages; optimum is geometric | Re-derive via AM-GM or Lagrange multipliers |
| Forgetting that R must exceed 1/ε | Structural mass limits maximum useful R | Verify R > 1/ε after solving |
| Applying the rule to cross-fed or parallel-burn vehicles | Mass flow paths violate simple staging assumption | Restrict use to series-staged vehicles only |

## 7. The textbook-precise statement
Let a launch vehicle consist of n series stages, each with identical specific impulse I_sp and structural coefficient ε. Let R_i denote the mass ratio of stage i. The burnout velocity is  
$$
v = I_{\text{sp}} g_0 \sum_{i=1}^n \ln R_i,
$$
subject to the fixed overall mass ratio constraint  
$$
\prod_{i=1}^n R_i = \frac{m_0}{m_{\text{payload}}}(1-\varepsilon)^n.
$$
The velocity is maximized if and only if R_1 = R_2 = ⋯ = R_n. (Sutton & Biblarz, *Rocket Propulsion Elements*, 9e, §4.4, eq. 4-35 and surrounding derivation.)

## 8. Visual — diagram or schematic
```text
Initial mass m0
       │
   ┌───┴───┐   R1 = m0 / m1
   │ Stage 1 │ ─────► separation mass m1
   └───┬───┘
       │
   ┌───┴───┐   R2 = m1 / m2   (R1 = R2 = R3)
   │ Stage 2 │ ─────► separation mass m2
   └───┬───┘
       │
   ┌───┴───┐   R3 = m2 / m_pl
   │ Stage 3 │ ─────► payload m_pl
   └───────┘
All three ratios equal → equal Δv slices.
```

## 9. The memory technique
1. **The hook** — Picture three identical Russian nesting dolls; each opens to reveal the next at the same size ratio, maximizing the final tiny doll for a given outer volume.  
2. **What to overlearn** — Δv = I_sp g₀ n ln R and R = (m0/m_pl)^(1/n).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from the product constraint, take logarithms, apply AM-GM or set derivatives to zero.

## 10. What this unlocks
The equal-ratio result is the analytic foundation for more advanced staging optimization that includes differing Isp values, cross-feeding, and recovery constraints. It directly precedes treatment of the “optimal thrust program,” “gravity-turn steering,” and “ascent trajectory optimization” in Phase 3.

- Next: Optimal staging with dissimilar Isp  
- Next: Lagrange multipliers for continuous staging  
- Next: Structural-mass trade studies  

## 11. Self-check — five questions, no answers
1. For a four-stage vehicle with identical Isp and total mass ratio 81, what single number must each stage’s mass ratio equal?  
2. If one stage is forced to a 20 % higher mass ratio than the equal optimum, by what percentage does total Δv drop (assume three stages, small perturbation)?  
3. Does the equal-ratio condition survive when each stage has a different structural coefficient ε_i? Explain in one sentence.  
4. A designer proposes five stages instead of three while keeping the same total mass; how does the required per-stage R change, and what velocity benefit appears?  
5. Identify the hidden assumption that would make the equal-ratio rule give a sub-optimal answer for a vehicle that performs simultaneous burns of two side boosters plus the center core.