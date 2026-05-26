## 1. The one-sentence answer
**Word problems using linear equations translate a narrative description of additive or proportional relationships into an equation of the form \(ax + b = c\) and solve for the unknown quantity.**

The core skill is recognizing that everyday statements such as “twice as many” or “five more than” map directly onto multiplication and addition. Once the mapping is complete, the equation is solved by isolating the variable through inverse operations, exactly as in any one-variable linear equation. The final numerical result is then interpreted back into the original context to confirm it satisfies every stated condition.

This translation step is what distinguishes word problems from pure algebraic manipulation: the algebra itself remains elementary, yet the modeling requires precise attention to language.

> [!NOTE]
> The decisive insight is that every correctly solved word problem produces an equation whose solution automatically satisfies the original story; any mismatch signals an error in the translation, not in the algebra.

## 2. Why this matters — concrete and current
NASA trajectory analysts convert fuel-burn rates and payload masses into linear equations to compute the exact propellant load required for a given delta-v on the Artemis missions; an error of a few kilograms in the solved value alters the entire mission timeline.

Amazon’s inventory-optimization engines model daily demand and replenishment lead times as linear relations to decide how many units of each SKU to place in each fulfillment center, directly affecting same-day delivery promises.

Semiconductor fabs such as TSMC use linear models of chemical-consumption rates versus wafer throughput to schedule precursor deliveries so that a single missed shipment does not idle a multi-billion-dollar production line.

Economists at the Federal Reserve employ linear supply-and-demand equations fitted to real-time price and quantity data to estimate the short-term effect of a tariff change on consumer prices.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Variables and constants  | Represent the unknown quantity and the fixed numbers given in the problem |
| Order of operations      | Guarantees that the algebraic translation matches the intended arithmetic |
| Inverse operations       | Isolate the variable once the equation is written         |
| Checking solutions       | Verify that the numerical answer satisfies every original constraint |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the unknown
A word problem always contains at least one quantity whose value is not stated; that quantity becomes the variable.  
Example: “A number increased by 7 equals 15.” The unknown number is \(x\).  
Formal statement: Let \(x\) be the unknown quantity.  
> [!WARNING]  
> Choosing the wrong quantity as the variable (for instance, letting \(x\) be the result instead of the starting number) forces the rest of the equation into an inconsistent form.

### Step 2 — Translate relational phrases
Words such as “more than,” “twice,” or “per” become addition, multiplication, or division.  
Example: “twice the number plus 3” becomes \(2x + 3\).  
Formal statement: Convert each relational phrase into an algebraic operation applied to the variable.  
> [!WARNING]  
> Reversing the direction of a phrase (“5 less than” versus “less than 5”) produces an incorrect sign or swapped terms.

### Step 3 — Assemble the equation
Place the translated expressions on either side of an equality that matches the problem’s final statement.  
Example: “twice the number plus 3 equals 27” yields \(2x + 3 = 27\).  
Formal statement: Write a single equation whose left- and right-hand sides are the two translated expressions.  
> [!WARNING]  
> Omitting a constant term that appears in the narrative leaves the equation under-determined.

### Step 4 — Solve the linear equation
Apply inverse operations to isolate the variable.  
Example: Subtract 3, then divide by 2, obtaining \(x = 12\).  
Formal statement:  
\[
2x + 3 = 27 \implies 2x = 24 \implies x = 12.
\]

### Step 5 — Verify in context
Substitute the numerical solution back into every original condition.  
Example: 12 increased by 7 is 19, but the problem stated 15; the mismatch reveals an earlier translation error.  
Formal statement: The solution must satisfy the equation and all implicit constraints (non-negativity, integer values, etc.).

## 5. Worked examples — every step shown

**Example 1 — Simple age relation**  
*Given:* Sam is 4 years older than twice Mia’s age. Their ages sum to 46.  
*Find:* Mia’s age.  
Let \(m\) be Mia’s age.  
Sam’s age is \(2m + 4\).  
Equation: \(m + (2m + 4) = 46\).  
*Why:* The phrase “sum to 46” supplies the equality.  
\(3m + 4 = 46\).  
*Why:* Combine like terms.  
\(3m = 42\).  
*Why:* Subtract 4 from both sides.  
\(m = 14\).  
*Why:* Divide both sides by 3.  
**14**  
*Reflection:* The only modeling choice was selecting Mia’s age as the variable; everything else followed directly from the relational phrases.

**Example 2 — Coin mixture**  
*Given:* A vending machine contains 120 coins that are either nickels or quarters; their total value is $15.60.  
*Find:* Number of quarters.  
Let \(q\) be the number of quarters.  
Number of nickels: \(120 - q\).  
Value equation: \(0.25q + 0.05(120 - q) = 15.60\).  
*Why:* Each quarter contributes 0.25 dollars.  
\(0.25q + 6 - 0.05q = 15.60\).  
*Why:* Distribute and combine like terms.  
\(0.20q = 9.60\).  
*Why:* Subtract 6 from both sides.  
\(q = 48\).  
**48**  
*Reflection:* The two different unit values forced an explicit conversion to dollars before writing the equation.

**Example 3 — Distance-rate-time**  
*Given:* A cyclist travels 45 km at one speed and then 30 km at a speed 5 km/h slower; total time is 3.5 h.  
*Find:* The faster speed.  
Let \(r\) be the faster speed in km/h.  
Time equation: \(\frac{45}{r} + \frac{30}{r-5} = 3.5\).  
*Why:* Time equals distance over rate.  
Multiply through by \(r(r-5)\): \(45(r-5) + 30r = 3.5r(r-5)\).  
*Why:* Clear denominators.  
\(45r - 225 + 30r = 3.5r^2 - 17.5r\).  
*Why:* Expand both sides.  
\(75r - 225 = 3.5r^2 - 17.5r\).  
Bring all terms to one side and solve the resulting quadratic, discarding the extraneous root.  
**20 km/h**  
*Reflection:* Two different rates produced a rational equation that simplified to a quadratic; verification eliminated the negative root.

**Example 4 — Work-rate problem**  
*Given:* Pipe A fills a tank in 6 h; Pipe B fills the same tank in 4 h. How long do both pipes take together?  
*Find:* Combined time.  
Let \(t\) be the time in hours.  
Fractional work: \(\frac{t}{6} + \frac{t}{4} = 1\).  
*Why:* Each pipe contributes a fraction of the tank per hour.  
\(\frac{2t + 3t}{12} = 1\).  
*Why:* Common denominator.  
\(5t = 12\).  
*Why:* Multiply both sides by 12.  
\(t = 2.4\).  
**2.4 hours**  
*Reflection:* The unit “tank per hour” converts the problem into an additive linear equation whose solution is immediately interpretable.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                                      | How to avoid it                                      |
|-----------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using the wrong variable    | Selecting the total instead of the unknown part     | Explicitly state “let \(x\) be …” before writing any equation |
| Reversing “more than” / “less than” | Confusing the order of subtraction                | Translate the phrase word-for-word, then check with a concrete number |
| Forgetting units            | Mixing dollars and cents, hours and minutes         | Convert every quantity to a single consistent unit before writing the equation |
| Ignoring implicit constraints | Negative or fractional answers that violate context | After solving, test whether the value satisfies all unstated conditions (non-negative, integer, etc.) |
| Adding instead of multiplying rates | Treating “twice as fast” as “two more”            | Underline every multiplier word (“twice,” “half,” “per”) before translating |
| Solving only the algebra, not verifying | Treating the equation as an end in itself         | Substitute the numerical answer back into the original narrative sentences |
| Omitting a constant term    | Overlooking a fixed fee or initial amount           | List every numeric quantity mentioned before constructing the equation |

## 7. The textbook-precise statement
A word problem involving a single unknown quantity is solved by constructing and solving a linear equation \(ax + b = c\) (with \(a \neq 0\)) whose coefficients and constant term are obtained by direct translation of the problem’s relational statements. The solution \(x = \frac{c - b}{a}\) must be checked against every explicit and implicit condition stated in the problem. (See: Sullivan, *Algebra & Trigonometry*, 11e, §1.2, “Applications of Linear Equations.”)

## 8. Visual — diagram or schematic
```text
Problem text
     │
     ▼
[Identify unknown] → Let x = ...
     │
     ▼
[Translate phrases] → + , − , × , ÷
     │
     ▼
[Write equation] → ax + b = c
     │
     ▼
[Solve] → x = (c − b)/a
     │
     ▼
[Verify] → substitute back into story
     │
     ▼
Final answer (with units)
```

## 9. The memory technique

1. **The hook** — Picture a translator at the United Nations converting spoken sentences into algebraic symbols; each relational word is a precise dictionary entry.  
2. **What to overlearn** — The four-step sequence: define variable, translate, solve, verify.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-read the problem sentence by sentence, replacing every quantity phrase with its algebraic counterpart and enforcing equality at the final verb.

## 10. What this unlocks
Mastery of single-equation word problems supplies the modeling foundation for systems of linear equations, linear inequalities, and optimization.  

- Systems of equations (two or more unknowns)  
- Linear programming in two variables  
- Direct and inverse variation problems  
- Transition to quadratic and exponential models once rates become non-constant  

## 11. Self-check — five questions, no answers
1. A rectangle’s length is 3 cm more than its width; the perimeter is 54 cm. Find the width.  
2. A chemist mixes 30 mL of 12 % acid solution with x mL of 5 % acid solution to obtain 100 mL of 8 % acid. Set up and solve for x.  
3. Two trains leave the same station at the same time traveling in opposite directions; one travels 20 km/h faster than the other. After 3 h they are 390 km apart. Find both speeds.  
4. Explain why letting x represent “the total number of coins” instead of “the number of quarters” can produce an inconsistent equation in a coin problem.  
5. A problem states “the sum of two consecutive even integers is 46.” A student writes \(n + (n + 2) = 46\). Another writes \(n + (n + 1) = 46\). Which equation is correct and why?