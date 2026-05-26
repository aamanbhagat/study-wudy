## 1. The one-sentence answer
**The unitary method solves proportion problems by isolating the value of one unit and then scaling that value linearly or reciprocally according to whether the quantities vary directly or inversely.**

Direct proportion occurs when two quantities increase or decrease together at a constant ratio, so the product of one quantity with the reciprocal of the other remains fixed. Inverse proportion occurs when an increase in one quantity produces a proportional decrease in the other, so their product itself remains fixed. The unitary method exploits this constancy by first computing the contribution of a single unit, then multiplying or dividing by the required number of units.

This approach converts any scaling question into an elementary multiplication or division once the unit value is known. It works uniformly for both types of proportion because the underlying constant—whether a multiplier or a divisor—is recovered from the given data before any final adjustment.

> [!NOTE]
> The single deepest insight is that every direct or inverse proportion problem reduces to finding one fixed number (the constant of proportionality) and then applying it; the unitary step is merely the explicit calculation of that constant from a single datum.

## 2. Why this matters — concrete and current
In semiconductor manufacturing, engineers at TSMC use direct-proportion scaling when they adjust exposure time on a wafer stepper linearly with photoresist thickness; the unitary method lets them compute the exact dose per nanometre of resist before multiplying by total thickness.

NASA’s Jet Propulsion Laboratory applies inverse proportion when sizing solar arrays for deep-space probes: more efficient cells reduce required area, and mission planners first find power output per square metre before dividing total mission demand by that figure.

In high-frequency trading, latency budgets at firms such as Jane Street treat the number of parallel FPGA pipelines as inversely proportional to processing time per order; the unitary calculation yields nanoseconds per pipeline, which is then divided into the target latency.

Pharmacokinetic models at Pfizer scale drug clearance rates directly with patient body mass; clinicians first determine clearance per kilogram from trial data, then multiply by the individual’s mass to set the infusion rate.

Agricultural yield optimisation at John Deere’s precision-farming division treats fertiliser application as directly proportional to hectares planted; the unitary step produces kilograms per hectare, which is multiplied by field size to generate the prescription map.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Multiplication and division of whole numbers and decimals | The unitary method consists of one division followed by one multiplication. |
| Recognition of constant ratios | Direct and inverse relations are defined by the constancy of a ratio or product. |
| Distinction between “per unit” and “total” | The method requires isolating the per-unit quantity before scaling. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify whether the quantities move together or oppositely
If both quantities grow or shrink simultaneously, the relation is direct; if one grows while the other shrinks, the relation is inverse.  
Example: More workers finish a job faster → inverse. More distance at constant speed takes more time → direct.  
Formally, label the quantities \(x\) and \(y\). The problem states whether \(y\) increases with \(x\) or decreases with \(x\).  
> [!WARNING]
> Misclassifying the type produces an answer that grows when it should shrink, or vice versa.

### Step 2 — Write the constant that characterises the relation
For direct proportion the constant is the ratio \(k = y/x\). For inverse proportion the constant is the product \(k = xy\).  
Example: 4 workers finish a task in 6 days → \(k = 4 \times 6 = 24\) worker-days.  
\[
k = 
\begin{cases}
\dfrac{y}{x} & \text{direct} \\
xy & \text{inverse}
\end{cases}
\]

### Step 3 — Compute the value attached to a single unit
Divide the known total by the known number of units. This isolates the contribution of one unit.  
Example: 24 worker-days ÷ 4 workers = 6 days per worker.  
\[
\text{Unit value} = \dfrac{\text{total}}{\text{number of units}}
\]

### Step 4 — Scale the unit value to the required number of units
Multiply (direct) or divide (inverse) the unit value by the new number of units.  
Example: 6 days per worker ÷ 8 workers = 0.75 days.  
\[
\text{Required total} = 
\begin{cases}
\text{unit value} \times \text{new number} & \text{direct} \\
\text{unit value} \div \text{new number} & \text{inverse}
\end{cases}
\]

### Step 5 — Verify that the original constant is recovered
Substitute the new pair back into the defining relation; the constant must match the value obtained in Step 2.  
This final check confirms both the classification and the arithmetic.

## 5. Worked examples — every step shown

**Example 1 — Simple direct proportion**  
*Given:* 5 notebooks cost ₹120.  
*Find:* Cost of 12 notebooks.  

Divide total cost by number of notebooks:  
\[
120 \div 5 = 24
\]  
*Why:* isolates cost per notebook.  

Multiply unit cost by required number:  
\[
24 \times 12 = 288
\]  
*Why:* scales the unit value linearly.  

**288**  

*Reflection:* The numbers were small; the only risk was forgetting to treat cost as the dependent quantity.

**Example 2 — Simple inverse proportion**  
*Given:* 6 pumps empty a tank in 8 hours.  
*Find:* Time for 16 pumps.  

Compute the constant product:  
\[
6 \times 8 = 48
\]  
*Why:* records the invariant worker-hour total.  

Divide the constant by the new number of pumps:  
\[
48 \div 16 = 3
\]  
*Why:* recovers time when more pumps share the same total work.  

**3 hours**  

*Reflection:* The inverse step is a division; swapping the operation would invert the answer.

**Example 3 — Mixed units with decimals**  
*Given:* 2.5 kg of rice costs ₹187.50.  
*Find:* Cost of 7.2 kg.  

Unit price:  
\[
187.50 \div 2.5 = 75
\]  
*Why:* yields rupees per kilogram.  

Scale:  
\[
75 \times 7.2 = 540
\]  
*Why:* direct multiplication after unit extraction.  

**₹540**  

*Reflection:* Decimal division is the only extra arithmetic; the logic remains identical.

**Example 4 — Inverse with non-integer result**  
*Given:* 15 workers build a wall in 24 days.  
*Find:* Days required with 20 workers.  

Constant:  
\[
15 \times 24 = 360
\]  
*Why:* total worker-days fixed.  

New time:  
\[
360 \div 20 = 18
\]  
*Why:* distributes fixed work over more workers.  

**18 days**  

*Reflection:* The answer is smaller, as expected; checking \(20 \times 18 = 360\) confirms constancy.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating every problem as direct  | Habit from everyday “more means more” intuition | Explicitly ask: “Does the second quantity shrink?” before writing the constant. |
| Dividing when multiplication is required | Confusing which quantity is the unit | Always isolate the per-unit value first; the scaling operation is then dictated by the proportion type. |
| Using the wrong constant (ratio vs product) | Mixing the two definitions | Write “direct → divide” and “inverse → multiply” on scrap paper before starting. |
| Forgetting to convert units       | Quantities given in mixed units (hours vs days) | Perform all conversions before computing the constant. |
| Rounding the unit value too early | Premature approximation | Keep the exact fraction until the final multiplication or division. |
| Swapping the roles of x and y     | Ambiguous wording in the problem statement  | Label the constant explicitly: \(k = y/x\) or \(k = xy\). |
| Checking only the final number, not the constant | Over-focus on the asked quantity | Substitute new values back into the defining relation and verify equality with the original constant. |

## 7. The textbook-precise statement
Let \(x\) and \(y\) be positive real quantities. They are said to be in **direct proportion** if there exists a constant \(k > 0\) such that \(y = kx\) for all admissible pairs. They are in **inverse proportion** if there exists a constant \(k > 0\) such that \(xy = k\) for all admissible pairs.  

The unitary method consists of the following algorithm: (i) compute \(k\) from the given pair, (ii) solve for the unknown member of the second pair using the same relation.  

Reference: Class 8 NCERT Mathematics, Chapter 13 “Direct and Inverse Proportions”, §13.1–13.3.

## 8. Visual — diagram or schematic
```text
Direct proportion          Inverse proportion
y                          y
|                          |
|   *                      |*
|  *                       | *
| *                        |  *
|*                         |   *
+---------------- x        +---------------- x
Constant slope k           Constant area k (hyperbola xy = k)
```

## 9. The memory technique

**The hook**  
Picture a single soldier (the “unit”) carrying a fixed load; in direct proportion the total load grows with more soldiers, while in inverse proportion the time to finish shrinks as more soldiers share the same load.

**What to overlearn**  
- Direct: \(y/x = k\)  
- Inverse: \(xy = k\)  
- Unitary step always isolates the single-unit contribution first.

**Spaced-repetition schedule**  
Review the two defining equations at 1 day, 3 days, 7 days, 16 days, and 35 days after first study.

**First-principles fallback**  
If the constant is forgotten, return to the original data pair, recompute the ratio or product, and verify that the new pair yields the identical numerical value.

## 10. What this unlocks
Mastery of the unitary method supplies the arithmetic engine for all later work on ratios, rates, and scaling laws in algebra and physics.  

- Linear functions and slope in coordinate geometry  
- Rate problems in kinematics (\(v = d/t\))  
- Density and concentration calculations in chemistry  
- Scaling arguments in similar triangles and dimensional analysis  

## 11. Self-check — five questions, no answers
1. A car travels 240 km on 20 litres of fuel. How far will it travel on 7 litres at the same efficiency?  
2. Twelve workers can complete a task in 15 days. How many days will 20 workers need for the same task?  
3. The cost of 3.5 m of cloth is ₹280. Find the cost of 8.75 m.  
4. A garrison of 500 men had provisions for 24 days. After 6 days, 100 more men arrive. How many days will the remaining food last?  
5. Explain why dividing the constant by the new number of units is required in inverse proportion but multiplying is required in direct proportion.