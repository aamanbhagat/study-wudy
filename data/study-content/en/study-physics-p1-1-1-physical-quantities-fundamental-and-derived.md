## 1. The one-sentence answer
**Physical quantities are properties of the physical world that can be measured, partitioned into seven fundamental quantities that serve as independent bases and all other quantities that are formed by algebraic combination of those bases.**

A physical quantity carries both a numerical value and a unit that together allow comparison and calculation. Length, mass and time illustrate the fundamental set because none can be expressed using the others; every other mechanical quantity is built from them. Velocity therefore appears as length divided by time, and force as mass multiplied by length divided by time squared.

This partition is not arbitrary. It mirrors the smallest set of independent measurements needed to describe motion and interaction. Once the seven base quantities are fixed by international convention, every derived quantity follows automatically and its dimensional formula is fixed.

> [!NOTE]
> The distinction is not about size or importance; it is about independence. A quantity is fundamental precisely when it cannot be written as a product or quotient of any other quantities already chosen as fundamental.

## 2. Why this matters — concrete and current
SpaceX engineers dimension every propellant-tank pressure sensor in pascals (kg·m⁻¹·s⁻²). The fundamental trio mass–length–time therefore appears directly in the structural-load equations that decide whether a Falcon 9 tank survives launch.

Semiconductor foundries at TSMC measure photoresist thickness in nanometres while controlling ion-implant dose in atoms per square centimetre. Both quantities are derived; their dimensional consistency with the seven base units guarantees that process models written in one fab transfer to another without hidden conversion factors.

The LIGO collaboration records strain as a dimensionless derived quantity (length change over length). Because strain is constructed solely from the base quantity length, calibration of the 4 km arms remains traceable to the definition of the metre realised by frequency-stabilised lasers.

Climate models at ECMWF integrate the derived quantity specific humidity (mass of water vapour per mass of moist air). The ratio is dimensionally homogeneous only because both numerator and denominator are ultimately multiples of the base unit kilogram; any mismatch would break conservation of mass inside the dynamical core.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Measurement          | Supplies the numerical value and the unit that every quantity carries |
| SI base units        | Provides the concrete standards chosen for the seven fundamentals |
| Algebraic operations | Required to combine base quantities into derived ones     |

## 4. Building the idea — from intuition to formalism

### Step 1 — Recognising measurable attributes of objects
Every object or process presents attributes that can be compared with a standard. Length is compared with a ruler, mass with a balance, temperature with a thermometer.  
Example: the height of a rocket is 70 m when laid beside a calibrated tape.  
Formally, a physical quantity \(Q\) is the product of a numerical value \(\{Q\}\) and a unit \([Q]\):
\[
Q = \{Q\} \cdot [Q].
\]
> [!WARNING]
> Treating “big” or “small” as a quantity without a unit destroys traceability; numerical comparisons become meaningless across different standards.

### Step 2 — Selecting a minimal independent set
Not all measurable attributes are independent. Area can be obtained from length multiplied by length, so area need not be chosen as a separate base. The smallest set that cannot be reduced further is declared fundamental.  
Example: once length is chosen, area and volume follow; they are not added to the base list.  
The current international choice comprises seven independent quantities whose units are defined by fixed numerical values of seven defining constants.

### Step 3 — Constructing derived quantities by multiplication and division
Any quantity outside the base set is formed by taking products or quotients of base quantities raised to powers.  
Example: speed is length divided by time.  
In symbols the dimensional formula appears as
\[
[\text{speed}] = \mathrm{L}^1\mathrm{T}^{-1}.
\]

### Step 4 — Writing dimensional formulae
Each derived quantity receives a unique combination of the seven base dimensions M, L, T, Θ, I, N, J.  
Example: force is
\[
[\text{force}] = \mathrm{M}^1\mathrm{L}^1\mathrm{T}^{-2}.
\]

### Step 5 — Confirming homogeneity in equations
Every physically valid equation must have identical dimensions on both sides. This supplies an immediate consistency check before numerical work begins.  
Example: the kinematic equation \(v^2 = u^2 + 2as\) has dimensions \(\mathrm{L}^2\mathrm{T}^{-2}\) on every term.

### Step 6 — Reaching the textbook partition
The set of all physical quantities is therefore partitioned into a basis of seven fundamental quantities and an infinite derived set generated by the monomials of the basis.

## 5. Worked examples — every step shown

**Example 1 — Simple speed**  
*Given:* A vehicle travels 120 km in 2 h.  
*Find:* The derived quantity speed and its dimensional formula.  

120 km is first written with the base unit metre:  
\[
120\,\mathrm{km}=120\times10^3\,\mathrm{m}.
\]  
*Why:* The kilometre is a prefixed multiple of the metre (base quantity length).  

Time is already in the base unit:  
\[
2\,\mathrm{h}=2\times3600\,\mathrm{s}=7200\,\mathrm{s}.
\]  
*Why:* The hour is converted to the base unit second.  

Divide:  
\[
\text{speed}=\frac{120\times10^3\,\mathrm{m}}{7200\,\mathrm{s}}=16.67\,\mathrm{m\,s^{-1}}.
\]  
*Why:* Division of length by time yields the derived quantity speed.  

**Final answer**  
\[
[\text{speed}]=\mathrm{LT}^{-1}
\]

*Reflection:* The only non-obvious move was unit conversion; once both quantities share base units the dimensional formula appears automatically.

**Example 2 — Force from Newton’s second law**  
*Given:* Mass 5 kg, acceleration 3 m s⁻².  
*Find:* Force and its dimensional formula.  

Multiply:  
\[
F=5\,\mathrm{kg}\times3\,\mathrm{m\,s^{-2}}=15\,\mathrm{kg\,m\,s^{-2}}.
\]  
*Why:* Force is defined as the product of the two base quantities mass and acceleration.  

Acceleration itself expands as length per time squared, confirming the formula.  

**Final answer**  
\[
[\text{force}]=\mathrm{MLT}^{-2}
\]

*Reflection:* The example forces explicit expansion of the derived quantity acceleration before the final formula is written.

**Example 3 — Checking homogeneity**  
*Given:* Alleged equation \(E=mc^3\).  
*Find:* Whether dimensions match.  

Left side (energy) has dimensions \(\mathrm{ML^2T^{-2}}\).  
Right side expands to \(\mathrm{M(LT^{-1})^3}=\mathrm{ML^3T^{-3}}\).  
Dimensions differ, so the equation is invalid.  

**Final answer**  
Equation is dimensionally inconsistent.

*Reflection:* The check catches algebraic errors before any numerical evaluation.

**Example 4 — Identifying base versus derived in a list**  
*Given:* pressure, luminous intensity, electric charge, amount of substance.  
*Find:* Which are fundamental.  

Luminous intensity and amount of substance appear among the seven defining base quantities.  
Pressure = force/area expands to \(\mathrm{ML^{-1}T^{-2}}\) (derived).  
Charge = current × time expands to \(\mathrm{IT}\) (derived).  

**Final answer**  
Fundamental: luminous intensity, amount of substance. Derived: pressure, electric charge.

*Reflection:* Recognition rests on memorising the seven base names rather than deriving each formula.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Treating “weight” as fundamental  | Everyday language conflates mass and force          | Always expand weight to \(mg\) and inspect dimensions |
| Writing unit prefixes inside dimensions | Prefixes are convenience, not new dimensions     | Convert to base units before writing dimensional formulae |
| Assuming all equations are homogeneous | Physics problems sometimes contain distractors   | Perform dimensional check on every equation before substituting numbers |
| Confusing quantity with unit      | Students write “the speed is m/s” instead of “the unit of speed is m/s” | State the quantity first, then its unit              |
| Forgetting that angle is dimensionless | Radian is defined as length/length               | Keep [angle] = 1 in dimensional analysis             |
| Using imperial units without conversion | Mixed-unit data appear in engineering drawings   | Convert every datum to SI base units at the outset   |
| Over-counting base quantities     | Inventing “area” or “volume” as extra bases       | Verify each candidate can be reduced to M, L, T, …   |

## 7. The textbook-precise statement
A physical quantity is any property that can be quantified by comparison with a standard. The International System of Quantities (ISQ) selects seven mutually independent base quantities—length (L), mass (M), time (T), thermodynamic temperature (Θ), electric current (I), amount of substance (N), luminous intensity (J)—whose units are realised by exact numerical values of seven defining constants (BIPM, *The International System of Units*, 9th ed., 2019, §2.2). Every other physical quantity is derived and possesses a dimensional formula that is a unique monomial in these seven base dimensions. An equation relating physical quantities is dimensionally homogeneous if and only if the dimensional formulae of both sides are identical.

## 8. Visual — diagram or schematic
```text
Fundamental (basis)
├── L  length
├── M  mass
├── T  time
├── Θ  temperature
├── I  current
├── N  amount
└── J  luminous intensity
        ↓ algebraic products & quotients
Derived (examples)
├── LT⁻¹          speed
├── MLT⁻²         force
├── ML⁻¹T⁻²       pressure
├── ML²T⁻²        energy
└── ...           (infinite set)
```

## 9. The memory technique

1. **The hook**  
   Picture seven coloured bricks labelled M, L, T, Θ, I, N, J standing on a table; every derived quantity is a Lego structure built only from those bricks.

2. **What to overlearn**  
   - The seven base symbols: M, L, T, Θ, I, N, J  
   - Dimensional formula of force: MLT⁻²  
   - Rule: every valid equation must have matching dimensions on both sides

3. **Spaced-repetition schedule**  
   Review the seven bases at 1 day, 3 days, 7 days, 16 days, 35 days after first study.

4. **First-principles fallback**  
   Ask: “Can this quantity be expressed using only products or quotients of length, mass, time, …?” If yes, it is derived; if no, it belongs to the base set.

## 10. What this unlocks
Mastery of fundamental versus derived quantities supplies the dimensional grammar required for every subsequent chapter.  

- Vector algebra begins with displacement (fundamental L) and velocity (derived LT⁻¹).  
- Kinematic equations are written only after confirming dimensional homogeneity of each term.  
- Newton’s laws introduce force as the first non-trivial derived quantity, opening the door to dynamics.  
- Fluid mechanics and orbital mechanics rely on the same dimensional scaffolding when constructing dimensionless numbers such as Reynolds or Mach.

## 11. Self-check — five questions, no answers
1. Write the dimensional formula of kinetic energy and verify it matches that of work.  
2. A certain equation claims power equals force multiplied by velocity. Perform a dimensional check and state whether the claim is admissible.  
3. List three quantities that are dimensionally identical to energy but carry different names.  
4. An engineer records thrust in “kg”. Identify the error and supply the correct derived quantity and its dimensional formula.  
5. Given the seven base dimensions, prove that electric potential (voltage) must be a derived quantity and give its dimensional formula.