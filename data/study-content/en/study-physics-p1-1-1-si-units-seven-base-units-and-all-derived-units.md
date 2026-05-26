## 1. The one-sentence answer
**The SI system rests on exactly seven irreducible base units that together generate every other measurable quantity through products and quotients alone.**

These seven quantities—length, mass, time, electric current, thermodynamic temperature, amount of substance, and luminous intensity—are assigned the base units metre, kilogram, second, ampere, kelvin, mole and candela. All other units used in physics and engineering, from the newton to the becquerel, are formed by combining powers of these seven; no additional independent standards are required. The structure therefore guarantees that any physical law expressed in SI units remains dimensionally consistent without external conversion factors.

The choice of precisely these seven is not arbitrary. Each corresponds to a fundamental aspect of nature that cannot be reduced to the others by any known physical relation. Once the base units are fixed by precise definitions (now all tied to constants of nature), derived units follow automatically. This economy of definitions is what makes the system coherent across every scale from subatomic collisions to interplanetary trajectories.

> [!NOTE]
> The decisive insight is that the entire edifice of derived units is fixed once the seven base definitions and the algebraic rules of multiplication and division are accepted; nothing else needs to be memorised or negotiated.

## 2. Why this matters — concrete and current
SpaceX measures Merlin-engine thrust in newtons (kg·m·s⁻²) and specific impulse in seconds; both are derived directly from the three mechanical base units, allowing thrust-to-weight ratios computed in one laboratory to be used without adjustment on another continent or on Mars.

Semiconductor foundries at TSMC and Intel control dopant concentrations in atoms per cubic metre (m⁻³), a derived unit whose numerical value is traceable to the mole and the metre; a 0.1 % error in this derived unit shifts threshold voltages enough to scrap entire wafer lots.

LIGO’s strain measurement is reported in dimensionless units, yet the underlying length change is obtained by dividing a displacement (metres) by an arm length (metres); the cancellation is valid only because both quantities share the same base unit defined by the speed of light.

NASA’s Deep Space Network timestamps signals to nanoseconds; the second is now defined by a fixed caesium frequency, so round-trip light times convert directly into distances without ever invoking an auxiliary length standard.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Distinction between quantity and unit | Prevents conflating “length” with “metre” when forming derived units |
| Algebraic rules for exponents        | Required to combine base units correctly (e.g., m·s⁻²)    |
| Concept of a standard                | Explains why base units must be realised from invariants rather than artefacts |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify quantities that cannot be expressed in terms of one another
Every measurable property is first classified by asking whether it can be built from simpler properties already chosen. Length, for example, cannot be constructed from mass or time; it must stand alone.

A rod’s length is compared with a separate rod; no combination of weighing the rods or timing their motion yields the same comparison. Hence length is adopted as a base quantity.

Formally, the set of base quantities is chosen so that the dimension function mapping any physical quantity to the seven exponents is unique.

> [!WARNING]
> Treating “force” as base would force an extra independent standard; all subsequent mechanical units would then carry an unnecessary extra dimension.

### Step 2 — Assign a base unit to each chosen base quantity
Once a quantity is declared base, a single unit is fixed by reference to a constant of nature. The metre is now defined by fixing the numerical value of the speed of light exactly at 299 792 458 m·s⁻¹.

The kilogram is fixed by assigning an exact numerical value to the Planck constant. Each such definition removes any dependence on a physical artefact.

### Step 3 — Form derived units by multiplication and division
Any new quantity whose dimension is a product of powers of the base quantities receives a unit that is the corresponding product of powers of the base units. Acceleration therefore receives the unit m·s⁻².

No separate decree is required; the algebraic combination supplies both the name and the dimension.

### Step 4 — Introduce special names only for frequent combinations
When a derived unit appears constantly, a single-word name is attached for convenience (newton = kg·m·s⁻²). The special name does not alter the underlying combination of base units.

### Step 5 — Extend to electromagnetic, thermal and chemical domains
Electric current is adopted as a fourth base quantity because no combination of length, mass and time reproduces the force between current-carrying wires. The ampere is fixed by assigning an exact value to the elementary charge. The kelvin, mole and candela complete the set for temperature, amount of substance and luminous intensity.

### Step 6 — Verify coherence across all derived units
Once the seven base definitions are accepted, every physical equation must balance in both numerical value and the seven exponents. The absence of any leftover dimension is the operational test that the system is closed.

## 5. Worked examples — every step shown

**Example 1 — Derive the unit of force**  
*Given:* Newton’s second law states force equals mass times acceleration.  
*Find:* The SI unit of force.  

Mass carries unit kg.  
*Why:* Mass is a base quantity.  
Acceleration carries unit m·s⁻².  
*Why:* Length and time are base; the exponent on time follows from velocity (m·s⁻¹) differentiated with respect to time.  
Therefore force carries unit kg·m·s⁻².  
*Why:* Multiplication of units mirrors multiplication of quantities.  

**kg·m·s⁻²**

*Reflection:* The example shows that a named unit is unnecessary for correctness; the combination of base units already suffices.

**Example 2 — Derive the unit of pressure**  
*Given:* Pressure equals force per unit area.  
*Find:* The SI unit of pressure.  

Force unit = kg·m·s⁻².  
*Why:* From Example 1.  
Area unit = m².  
*Why:* Length is base; area is length squared.  
Division yields kg·m⁻¹·s⁻².  

**kg·m⁻¹·s⁻²** (pascal)

*Reflection:* The negative exponent appears automatically once division is recognised as multiplication by the reciprocal.

**Example 3 — Convert an energy value into base units**  
*Given:* Kinetic energy ½mv² with m = 2 kg, v = 3 m·s⁻¹.  
*Find:* The numerical value and unit expressed solely in base units.  

Compute ½ × 2 × 9 = 9.  
*Why:* Arithmetic is performed after units are stripped.  
Unit of energy = kg·(m·s⁻¹)² = kg·m²·s⁻².  
*Why:* Squaring multiplies all exponents by two.  

**9 kg·m²·s⁻²**

*Reflection:* The calculation confirms that joules are dispensable; the base combination is always available for dimensional checks.

**Example 4 — Check dimensional homogeneity of rocket equation**  
*Given:* Tsiolkovsky equation Δv = v_e ln(m_0/m_f).  
*Find:* Verify that both sides share identical base-unit exponents.  

Left side: velocity → m·s⁻¹.  
Right side: exhaust velocity also m·s⁻¹; logarithm is dimensionless.  
*Why:* The argument of any transcendental function must be dimensionless, so the ratio of masses carries zero exponents.  
Exponents match on both sides.  

**Consistent**

*Reflection:* Any mismatch would have revealed an illicit extra base quantity hidden in the model.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Treating the newton as a base unit | Everyday language names derived units first         | Always expand named units back to base exponents     |
| Writing “kgs” for kilograms       | Plural “s” collides with second symbol              | Use “kg” only; never add “s” for plural              |
| Forgetting that mole is base      | Amount of substance feels “derived” from mass       | Memorise the seven quantities; mole is not redundant |
| Confusing radian with dimensionless | Plane angle is sometimes given unit rad             | Remember rad = m·m⁻¹; it cancels in every equation   |
| Using °C in place of K for differences | Celsius scale has arbitrary zero                    | Convert differences: 1 °C difference = 1 K difference|
| Prefix errors (e.g., mN vs MN)    | Exponent sign reversed when moving prefix           | Write prefix as power of ten before combining units  |
| Assuming candela is unnecessary   | Photometry appears irrelevant to mechanics          | Retain it; radiative heat transfer in rockets uses lm and cd |

## 7. The textbook-precise statement
The International System of Units is defined by the seven base quantities and the seven corresponding base units whose magnitudes are fixed by assigning exact numerical values to seven defining constants (BIPM, *The International System of Units*, 9th ed., 2019, §2.1). Any physical quantity Q has the dimension  
$$
[Q] = \mathrm{L}^\alpha\mathrm{M}^\beta\mathrm{T}^\gamma\mathrm{I}^\delta\Theta^\epsilon\mathrm{N}^\zeta\mathrm{J}^\eta
$$  
where the seven exponents are integers or zero; the coherent SI unit of Q is then  
$$
\{Q\} = \mathrm{m}^\alpha\mathrm{kg}^\beta\mathrm{s}^\gamma\mathrm{A}^\delta\mathrm{K}^\epsilon\mathrm{mol}^\zeta\mathrm{cd}^\eta.
$$  
The system is coherent: the unit of any derived quantity formed by multiplication or division of other quantities is the corresponding product or quotient of their units.

## 8. Visual — diagram or schematic
```text
Base quantities (fixed by constants)
├── length  → m   (c)
├── mass    → kg  (h)
├── time    → s   (Δν_Cs)
├── current → A   (e)
├── temp    → K   (k_B)
├── amount  → mol (N_A)
└── lum. int→ cd  (K_cd)
Derived units (products of powers)
  force      = kg·m·s⁻²          (N)
  pressure   = kg·m⁻¹·s⁻²        (Pa)
  energy     = kg·m²·s⁻²         (J)
  power      = kg·m²·s⁻³         (W)
  charge     = A·s                (C)
  voltage    = kg·m²·s⁻³·A⁻¹     (V)
  (tree continues indefinitely)
```

## 9. The memory technique

1. **The hook** — Picture seven pillars holding up a single roof; every derived unit is a plank resting on those pillars alone.  
2. **What to overlearn** — The seven base symbols (m, kg, s, A, K, mol, cd) and the rule that every derived unit is a monomial in these symbols.  
3. **Spaced-repetition schedule** — Reproduce the seven base units from memory at 1 day, 3 days, 7 days, 16 days and 35 days.  
4. **First-principles fallback** — Re-derive any unit by writing the defining equation (F = ma, E = ½mv², etc.) and substituting only base units.

## 10. What this unlocks
Mastery of base and derived units supplies the dimensional skeleton required for every subsequent topic in kinematics and dynamics.  

- Vector components inherit metres for displacement, m·s⁻¹ for velocity, m·s⁻² for acceleration.  
- Differentiation and integration with respect to time preserve dimensional consistency only when the time unit is the second.  
- The impulse-momentum theorem and the work-energy theorem become immediate checks once both sides are expanded to base units.  
- Later, electromagnetic and thermodynamic chapters reuse the same seven dimensions without introducing new base quantities.

## 11. Self-check — five questions, no answers
1. Express the derived unit of dynamic viscosity in base units and name the physical quantity whose SI unit is kg·m⁻¹·s⁻¹.  
2. A certain equation claims that energy equals force times velocity. Perform a dimensional check and state whether the equation can be correct.  
3. Convert 3.7 MN·m to base units, then rewrite the result using only the joule.  
4. Why does the mole remain a base unit even though mass and volume can be measured for any sample of substance?  
5. An engineer writes acceleration as “9.81 m/s/s”. Rewrite the expression using negative exponents and identify the hidden trap in the original notation.