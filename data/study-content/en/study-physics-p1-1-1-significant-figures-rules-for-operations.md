## 1. The one-sentence answer
**Significant figures rules for operations prescribe how many digits to retain in a calculated result so that its uncertainty matches the uncertainty of the least precise input measurement.**

Measurements carry inherent limits on precision; when two or more such values combine arithmetically, the output cannot claim more certainty than its weakest contributor. The rules therefore act as a bookkeeping device that propagates the rightmost uncertain digit through each operation. They are applied after the arithmetic is complete and before the final value is recorded.

The distinction between addition/subtraction and multiplication/division arises because the two classes of operation affect absolute uncertainty differently. In addition the absolute uncertainties add directly, so decimal-place alignment governs the result. In multiplication the relative uncertainties add, so the count of significant digits governs the result. These conventions are not arbitrary; they follow directly from the definition of uncertainty as the interval within which the true value is expected to lie.

> [!NOTE]
> The rules never alter the arithmetic itself; they only dictate how many digits survive rounding at the end.

## 2. Why this matters — concrete and current
SpaceX records Merlin engine chamber pressure to six significant figures during static-fire tests; when these values are multiplied by throat area (known to four figures) to obtain thrust, the product is reported to only four figures so that the uncertainty band on thrust remains honest for trajectory software.

NASA’s Perseverance entry-descent-landing team combined radar altimeter ranges (five figures) with atmospheric density models (three figures) during final parachute deployment calculations; the multiplication rule forced the descent velocity solution to three figures, directly affecting the 2021 touchdown ellipse size.

Semiconductor fabs at TSMC measure wafer thickness with interferometers to eight figures; when these thicknesses enter etch-rate equations that also contain pressure readings limited to four figures, the division rule caps the computed etch depth at four figures, preventing over-specification of process tolerances.

In LHC luminosity calculations at CERN, integrated luminosity (six figures) is multiplied by cross-sections derived from Monte Carlo runs whose statistical precision is quoted to three figures; the product is therefore published to three figures, ensuring that quoted event yields do not imply spurious accuracy.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Place value and decimals | Determines which digit is the last certain one in sums    |
| Scientific notation      | Makes the count of significant digits unambiguous         |
| Basic rounding           | Required to reduce a calculated result to the allowed number of digits |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the uncertain digit
Any measured number is known only up to its last reliable digit; all subsequent digits are estimates or zeros inserted for place-keeping.  
Example: 3.42 m means the true length lies between 3.415 m and 3.425 m.  
The last certain digit is therefore the hundredths place.  
> [!WARNING]
> Treating a trailing zero as significant when it is only a placeholder will inflate the apparent precision of every later calculation.

### Step 2 — Separate addition and subtraction from multiplication and division
Addition and subtraction combine absolute uncertainties; multiplication and division combine relative uncertainties.  
Hence two distinct rules are required.  
The absolute-uncertainty rule for sums is expressed by aligning decimal places; the relative-uncertainty rule for products is expressed by counting significant figures.

### Step 3 — Rule for addition and subtraction
Perform the addition or subtraction first, then round the result so that its last decimal place matches the rightmost decimal place that appears in every input number.  
Formal statement:  
If \(x\) has uncertainty \(\Delta x\) ending at the \(10^{-k}\) place and \(y\) has uncertainty \(\Delta y\) ending at the \(10^{-m}\) place with \(k < m\), the sum or difference is rounded to the \(10^{-k}\) place.  
> [!WARNING]
> Rounding before the arithmetic step introduces an extra rounding error that can exceed the measurement uncertainty itself.

### Step 4 — Rule for multiplication and division
Perform the multiplication or division first, then round the result to the same number of significant figures possessed by the input having the fewest significant figures.  
Formal statement:  
If \(x\) has \(n\) significant figures and \(y\) has \(m\) significant figures with \(n < m\), then \(x \times y\) or \(x / y\) is reported with \(n\) significant figures.

### Step 5 — Treat exact numbers and defined constants
Exact conversion factors (for example, 100 cm = 1 m) and integers arising from counting carry infinite significant figures and therefore never limit the precision of a result.  
They are ignored when determining the number of figures to retain.

### Step 6 — Apply rounding only at the final step
All intermediate results are kept with at least one extra guard digit; only the ultimate answer is rounded according to the appropriate rule.  
This yields the textbook statement of the operational rules for significant figures.

## 5. Worked examples — every step shown

**Example 1 — Addition of distances**  
*Given:* Runway segment lengths 124.3 m and 17.85 m.  
*Find:* Total length.  
124.3 + 17.85 = 142.15  
The first number ends at the tenths place; therefore round to tenths.  
**142.2 m**  
*Reflection:* The second addend’s extra hundredths digit is discarded because it cannot be known once the coarser measurement is included.

**Example 2 — Multiplication in thrust calculation**  
*Given:* Chamber pressure 6.842 MPa (four significant figures) and throat area 0.03157 m² (four significant figures).  
*Find:* Thrust (pressure × area).  
6.842 × 0.03157 = 0.2161 MN  
Both factors have four figures, so retain four.  
**0.2161 MN**  
*Reflection:* The product’s leading zeros after the decimal do not count toward significant figures; the four-digit limit is set by the inputs.

**Example 3 — Mixed operations in velocity**  
*Given:* Displacement 4.82 km (three figures) in time 9.4 s (two figures).  
*Find:* Average speed.  
First divide: 4.82 / 9.4 = 0.5128 km s⁻¹  
Round to two figures (limited by time): 0.51 km s⁻¹.  
**0.51 km s⁻¹**  
*Reflection:* The extra guard digit kept during division prevents premature rounding error before the final two-figure cut.

**Example 4 — Subtraction followed by division**  
*Given:* Initial mass 452.67 kg, final mass 447.3 kg, burn time 12.4 s.  
*Find:* Average mass-loss rate.  
Subtract: 452.67 − 447.3 = 5.37 kg (rounded to tenths because 447.3 ends at tenths).  
Divide: 5.37 / 12.4 = 0.433 km s⁻¹ wait, 0.433 kg s⁻¹.  
Round to three figures (limited by 5.37).  
**0.433 kg s⁻¹**  
*Reflection:* The subtraction step itself enforces a decimal-place limit that then propagates into the subsequent division.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Counting all zeros as significant | Place-keeping zeros look identical to measured zeros | Use scientific notation to expose which zeros are significant |
| Rounding intermediate results     | Desire for tidy numbers at each step        | Carry one extra digit until the final answer         |
| Applying the wrong rule to mixed operations | Forgetting that subtraction can change the limiting precision | Identify the last arithmetic operation performed     |
| Treating conversion factors as limiting | Confusion between exact definitions and measured quantities | Mark exact numbers with an “exact” label before counting figures |
| Reporting 0.00034 with two figures as 3.4 × 10^{-4} but then adding another measured value | Failure to re-evaluate after each new operation | Re-apply the appropriate rule after every arithmetic step |
| Ignoring that 2.0 has two figures while 2 has one | Belief that trailing zeros are always insignificant | Write 2.0 explicitly when the zero is measured       |
| Using calculator display digits without rounding | Trust in machine output                     | Manually count significant figures of each input first |

## 7. The textbook-precise statement
When a quantity \(z\) is obtained from measured quantities \(x_i\) by addition, subtraction, multiplication or division, the number of significant figures in \(z\) equals the smallest number of significant figures present in any \(x_i\) that participates in a multiplication or division, or the number of decimal places is fixed by the \(x_i\) with the coarsest decimal place in an addition or subtraction. Exact numbers are excluded from the count. (See Taylor, *An Introduction to Error Analysis*, 2e, §2.3.)

## 8. Visual — diagram or schematic
```text
Measurement A:  3.42   m     (uncertain beyond 0.01)
Measurement B:  0.8    m     (uncertain beyond 0.1)
                ----   ----
Sum (align decimals): 4.2   m   <-- last digit set by B
Product (sig figs):   2.7   m²  <-- limited to 1 sig fig from B
```

## 9. The memory technique

**The hook**  
Picture a chain whose weakest link determines the safe load; the measurement with the fewest reliable digits is that weakest link.

**What to overlearn**  
Addition/subtraction → decimal-place rule.  
Multiplication/division → significant-figure count rule.  
Exact numbers never limit precision.

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive by asking: “Which input uncertainty interval is largest relative to the scale of the result?” The rule that matches that interval is the correct one.

## 10. What this unlocks
Mastery of significant-figure rules supplies the foundation for honest uncertainty propagation in every subsequent calculation of vectors, velocities, and accelerations.  
- Vector addition in two dimensions  
- Instantaneous velocity from position-time data  
- Propagation of random errors in laboratory reports  
- Dimensional analysis with measured constants  

## 11. Self-check — five questions, no answers
1. Add 12.34 m and 0.7 m; how many decimal places appear in the reported sum?  
2. Multiply 3.1416 by 2.0; how many significant figures does the product contain?  
3. A rocket travels 452 km in 38 s. Report the average speed with the correct number of significant figures.  
4. Why does the subtraction 100.0 − 99.9 yield a result whose precision is limited by the hundredths place rather than the ones place?  
5. In the expression (4.82 × 10³) / (2.0 × 10²) + 17, which operation determines the number of significant figures retained in the final answer?