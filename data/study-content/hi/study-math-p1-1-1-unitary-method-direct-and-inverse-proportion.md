## 1. The one-sentence answer
**The unitary method finds an unknown quantity by first determining the value corresponding to a single unit and then scaling it according to direct or inverse proportion.**

Direct proportion occurs when two quantities increase or decrease together so that their ratio remains constant. Inverse proportion occurs when an increase in one quantity produces a proportional decrease in the other so that their product remains constant. In both cases the unitary method reduces the problem to finding the per-unit value and then multiplying by the required number of units. This approach works because any linear relationship between quantities can be expressed through a single reference point.

The method therefore converts every proportion problem into two transparent arithmetic operations: division to reach the unit and multiplication to reach the target. Once the unit value is known, scaling follows immediately from the definition of proportion.

> [!NOTE]
> The single deepest insight is that every direct or inverse proportion problem ultimately collapses to multiplication by a constant factor; the unitary step merely isolates that constant explicitly so the scaling becomes obvious.

## 2. Why this matters — concrete and current
In semiconductor manufacturing, engineers at TSMC use the unitary method to scale photomask exposure times when wafer diameter changes from 200 mm to 300 mm while maintaining constant energy density per unit area.

In aerospace trajectory planning, NASA’s Artemis program calculates propellant mass flow rates by first finding consumption per second for a reference thrust level and then scaling directly with burn duration.

In machine-learning data pipelines at Google, the cost of training a transformer model on TPU pods is estimated by first computing FLOPs per training example and then multiplying by the total number of examples under direct proportion.

In epidemiology, contact-tracing models for COVID-19 outbreaks compute secondary infection rates by first finding transmissions per index case per day and then scaling inversely with the reduction in average contact time achieved by interventions.

In high-frequency trading, latency budgets at Jane Street are allocated by first determining the allowable microseconds per order-book update and then scaling inversely with the number of instruments being monitored simultaneously.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Basic multiplication and division | Required to compute the unit value and then scale it      |
| Equality of ratios   | Defines direct proportion mathematically                  |
| Constant product     | Defines inverse proportion mathematically                 |
| Units and dimensions | Ensures the “per unit” quantity carries correct meaning   |

If any of these four ideas are shaky, pause and review them before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the constant relationship
When two quantities are linked so that doubling one doubles the other, the relationship is direct; when doubling one halves the other, it is inverse.  
Example: if 3 workers paint 12 m² in one hour, then the area per worker is 4 m².  
Formally, if \(y = kx\) for direct proportion or \(y = k/x\) for inverse proportion, the constant \(k\) is the same for all pairs.  
> [!WARNING] Treating a relationship as direct when it is inverse (or vice versa) produces an answer whose magnitude is exactly inverted, which is the most common source of sign errors later.

### Step 2 — Isolate the unit value
Divide the known total by the number of units to obtain the value of one unit.  
Example: 12 m² ÷ 3 workers = 4 m² per worker.  
Mathematically: \(k = \frac{y_1}{x_1}\).

### Step 3 — Scale by the required number of units
Multiply the unit value by the new number of units.  
Example: 4 m²/worker × 7 workers = 28 m².  
Mathematically: \(y_2 = k \cdot x_2\).

### Step 4 — Handle inverse cases by using the product
When quantities are inversely proportional, first compute the constant product \(k = x_1 y_1\), then solve for the missing variable via \(y_2 = k / x_2\).  
Example: if 5 pumps empty a tank in 12 hours, then \(k = 5 \times 12 = 60\) pump-hours; 4 pumps require \(60 / 4 = 15\) hours.

### Step 5 — Verify dimensional consistency
Check that the final unit matches the expected physical or numerical dimension; any mismatch signals an incorrect choice of direct versus inverse scaling.

### Step 6 — Textbook-grade statement
If \(y\) is directly proportional to \(x\), there exists a constant \(k\) such that \(y = kx\) for all admissible \(x\). If \(y\) is inversely proportional to \(x\), there exists a constant \(k\) such that \(xy = k\) for all admissible \(x \neq 0\).

## 5. Worked examples — har step show karo

**Example 1 — Simple direct proportion**  
*Given:* 8 notebooks cost ₹240.  
*Find:* Cost of 13 notebooks.  
Divide 240 by 8 to obtain the unit price: \(240 \div 8 = 30\).  
*Why:* isolates the constant of proportionality.  
Multiply by 13: \(30 \times 13 = 390\).  
**₹390**  
*Reflection:* The arithmetic is elementary, yet the same two-step pattern scales to any linear pricing model.

**Example 2 — Direct proportion with decimals**  
*Given:* A car travels 315 km on 28 litres of fuel.  
*Find:* Distance on 40 litres.  
Unit distance: \(315 \div 28 = 11.25\) km per litre.  
*Why:* converts the given pair into the constant \(k\).  
Scale: \(11.25 \times 40 = 450\).  
**450 km**  
*Reflection:* Decimal division appears, yet the logic remains identical to Example 1.

**Example 3 — Inverse proportion with integers**  
*Given:* 12 workers finish a job in 15 days.  
*Find:* Days required by 20 workers.  
Constant product: \(12 \times 15 = 180\) worker-days.  
*Why:* encodes the inverse relationship.  
Divide by new workforce: \(180 \div 20 = 9\).  
**9 days**  
*Reflection:* The product 180 stays invariant; only the split between workers and days changes.

**Example 4 — Inverse proportion with rates**  
*Given:* A pipe fills a cistern in 6 hours; another fills it in 8 hours.  
*Find:* Time when both pipes work together.  
First-pipe rate: 1/6 cistern per hour.  
Second-pipe rate: 1/8 cistern per hour.  
Combined rate: \(1/6 + 1/8 = 7/24\) cistern per hour.  
Time required: \(24/7\) hours.  
**\(24/7\) hours**  
*Reflection:* Rates add under direct proportion while times multiply to a constant under inverse proportion; the unitary view makes the addition step explicit.

## 6. Common traps and how to avoid them

| Trap                          | Why it happens                              | How to avoid it                                      |
|-------------------------------|---------------------------------------------|------------------------------------------------------|
| Using multiplication instead of division for the unit step | Students memorise “multiply” without checking the relationship | Always ask: “Do I need one unit or many units first?” |
| Forgetting to invert when the problem is inverse | The word “more workers, fewer days” is misread as direct | Write the product \(xy\) explicitly before substituting |
| Mixing units (hours vs minutes) | Dimensional analysis skipped | Convert everything to the same unit before any calculation |
| Treating “per” statements as inverse automatically | Linguistic cue overrides actual relationship | Verify whether both quantities move in the same direction |
| Rounding the unit value too early | Loss of precision propagates | Keep the exact fraction until the final multiplication |
| Assuming zero is admissible in inverse cases | Division by zero is overlooked | State the domain restriction \(x \neq 0\) explicitly |
| Confusing “rate” with “time” in work problems | Two inverse layers are present | Reduce work problems to worker-days or machine-hours first |

## 7. The textbook-precise statement
If two variable quantities \(x\) and \(y\) are related so that the ratio \(y/x\) is constant whenever \(x \neq 0\), then \(y\) is said to be directly proportional to \(x\), written \(y \propto x\) or \(y = kx\) for some constant \(k\). If the product \(xy\) is constant whenever \(x \neq 0\) and \(y \neq 0\), then \(y\) is said to be inversely proportional to \(x\), written \(y \propto 1/x\) or \(xy = k\). These definitions appear in any rigorous treatment of ratio and proportion; see, for instance, Lang, *Basic Mathematics*, 1st ed., §2.3.

## 8. Visual — diagram or schematic
```text
Direct Proportion          Inverse Proportion
x   y                      x   y
1   k                      1   k
2   2k                     2   k/2
3   3k                     3   k/3
↑   ↑                      ↑   ↓
Both increase together     One increases, other decreases
Product xy = constant
```
The left column shows the constant slope \(k\); the right column shows the constant rectangular area \(k\).

## 9. The memory technique
1. **The hook** — Picture a single brick (the unit) that you weigh first; every larger wall is just that brick multiplied by the number of bricks. For inverse cases, picture a fixed-size pizza that must be shared: more people means smaller slices, yet the pizza area never changes.
2. **What to overlearn** — \(y = kx\) for direct, \(xy = k\) for inverse; always compute \(k\) from the first data pair before scaling.
3. **Spaced-repetition schedule** — Review the two defining equations after 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — If the formula is forgotten, return to the definition: divide the given total by the given number of units to obtain the per-unit value, then multiply or divide according to whether the second quantity moves in the same or opposite direction.

## 10. What this unlocks
Mastery of the unitary method supplies the arithmetic foundation for linear functions, slope, and rates of change that appear throughout algebra and calculus.  
- Direct proportion extends immediately to the concept of constant slope and the equation of a straight line.  
- Inverse proportion prepares the ground for rational functions and hyperbolic relationships used in physics (Boyle’s law, gravitational force).  
- Both forms reappear when constructing dimensionless groups in dimensional analysis and when normalising data in machine-learning pipelines.

## 11. Self-check — five questions, no answers
1. If 7 kg of rice cost ₹280, what is the cost of 11 kg?  
2. A car covers 252 km in 4.5 hours at constant speed. How far will it travel in 7 hours?  
3. Twelve labourers can build a wall in 15 days. How many days will 20 labourers take?  
4. Two taps fill a tank in 6 h and 8 h respectively. How long will they take together?  
5. A rectangle has constant area 120 cm². If its length increases from 8 cm to 15 cm, what is the new width?