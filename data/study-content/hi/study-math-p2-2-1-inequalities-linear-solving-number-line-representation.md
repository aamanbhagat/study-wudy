## 1. The one-sentence answer

**Linear inequalities are statements that compare two expressions using symbols such as <, >, ≤ or ≥, and solving them produces an interval of values rather than a single point.**

Aap already equations solve karte ho, jahaan ek exact value milta hai. Inequalities mein ek range milta hai kyunki hum equality ki jagah comparison kar rahe hain. Number line par is range ko open circles (strict inequality) aur closed circles (inclusive) ke saath dikhaya jaata hai, arrows direction batate hain.

Pehle aap variables ko isolate karte ho jaise equations mein, lekin jab aap negative number se multiply ya divide karte ho to inequality sign flip ho jaata hai. Yeh flip hi sabse critical step hai kyunki yeh solution set ko ulta kar deta hai.

> [!NOTE]
> The single most important insight is that the solution to a linear inequality is always an interval (or union of intervals) on the real line, never an isolated point, because any value inside the interval satisfies the original comparison.

## 2. Why this matters — concrete and current

In semiconductor design at TSMC and Intel, engineers use linear inequalities to define feasible voltage and current ranges for transistor gates so that power consumption stays below thermal limits.

In reinforcement learning at DeepMind and OpenAI, constraint-based reward shaping relies on linear inequalities to keep policy updates inside safe regions during training, preventing catastrophic actions in robotics.

In aerospace trajectory planning for SpaceX Falcon 9, propellant mass and thrust bounds are expressed as linear inequalities inside linear programming solvers that generate real-time ascent profiles.

In supply-chain optimisation at Amazon, warehouse capacity and delivery-time windows are modelled as linear inequalities whose feasible region determines daily routing decisions for millions of packages.

In fundamental physics, the Heisenberg uncertainty principle applied to position-momentum pairs produces linear inequalities that bound measurement precision in quantum optics experiments.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Solving linear equations   | Core algebraic manipulations remain identical             |
| Inequality symbols and ordering | Determines direction of comparison and when to flip sign  |
| Number line and intervals  | Final representation of solution set                      |
| Multiplication by negatives| Triggers the critical sign-reversal rule                  |

Agar aap linear equations comfortably solve nahi kar pa rahe, pehle woh topic complete kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Comparing quantities on the number line
Aap do numbers ko compare karte ho by unki positions dekh kar. Agar 5 left of 7 hai to 5 < 7. Yeh intuition hi inequalities ka base hai.

Example: 3 < 8 is true because 3 lies left of 8.

Formal statement: For any real numbers a and b, a < b if and only if b − a is positive.

> [!WARNING]
> Never assume the direction of an inequality without checking the sign of the difference; visual intuition fails when numbers are negative.

### Step 2 — Preserving the inequality under addition and subtraction
Adding or subtracting the same number from both sides leaves the inequality direction unchanged because the distance between the two sides stays constant.

Example: Start with 4 > 1. Add 3 to both sides → 7 > 4, still true.

Formal statement: If a > b then a + c > b + c for any real c.

### Step 3 — Preserving the inequality under positive multiplication
Multiplying or dividing both sides by a positive number keeps the direction the same.

Example: 2 < 6, multiply by 3 → 6 < 18.

Formal statement: If a < b and c > 0 then ac < bc.

### Step 4 — Reversing the inequality under negative multiplication
When the multiplier is negative the order reverses because the number line is flipped.

Example: 2 < 6, multiply by −3 → −6 > −18.

Formal statement: If a < b and c < 0 then ac > bc.

### Step 5 — Isolating the variable to obtain the solution interval
Apply the above rules until the variable stands alone; record whether the endpoint is included.

Example: Solve −2x + 1 ≥ 7.

Formal statement: The solution set is an interval of the form (r, ∞), [r, ∞), (−∞, r) or (−∞, r] where r is the critical value obtained after isolation.

## 5. Worked examples — har step show karo

**Example 1 — Simple positive coefficient**
- *Given:* x + 4 > 9
- *Find:* Solution set and number-line representation
Subtract 4 from both sides → x > 5.  
*Why:* Subtraction preserves direction.  
Solution set is (5, ∞).  
**x > 5**  
*Reflection:* The example is straightforward; the open circle at 5 signals that 5 itself is excluded.

**Example 2 — Negative coefficient requiring sign flip**
- *Given:* −3x − 2 ≤ 10
- *Find:* Solution set
Add 2 → −3x ≤ 12.  
*Why:* Addition never flips sign.  
Divide by −3 and flip → x ≥ −4.  
*Why:* Negative divisor reverses inequality.  
**x ≥ −4**  
*Reflection:* Students often forget the flip; the closed circle at −4 now includes equality.

**Example 3 — Variable on both sides**
- *Given:* 5x − 7 < 2x + 8
- *Find:* Solution set
Subtract 2x → 3x − 7 < 8.  
*Why:* Keeps variable coefficient positive.  
Add 7 → 3x < 15.  
Divide by 3 → x < 5.  
**x < 5**  
*Reflection:* Moving all variable terms first avoids later sign errors.

**Example 4 — Compound interval after two flips**
- *Given:* −4(2x − 1) > 12
- *Find:* Solution set
Distribute → −8x + 4 > 12.  
*Why:* Distributing a negative does not yet flip; the inequality symbol stays.  
Subtract 4 → −8x > 8.  
Divide by −8 and flip → x < −1.  
**x < −1**  
*Reflection:* Two negatives appear (distributor and divisor), but only the divisor causes a flip; tracking each sign change prevents mistakes.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to flip when dividing by negative | Habit from equation solving                 | Write “÷ (−)” and immediately flip before calculating |
| Using closed circle for strict inequality | Confusing ≤ with <                          | Check the original symbol before drawing     |
| Moving terms without flipping sign | Treating inequality like equality           | Re-apply the rule each time a negative crosses |
| Writing solution as single value  | Equation mindset                            | Always express answer as interval notation   |
| Graphing arrow in wrong direction | Misreading the final inequality             | Test one number from each side of boundary   |
| Ignoring domain restrictions      | Not checking if variable is real            | State solution only on ℝ unless specified    |

## 7. The textbook-precise statement

A linear inequality in one variable x is an inequality that can be written in the form ax + b < c, ax + b ≤ c, ax + b > c or ax + b ≥ c where a, b, c ∈ ℝ and a ≠ 0. The solution set is the set of all real x that satisfy the inequality. If a > 0 the solution is an interval whose left or right endpoint is the unique real number x = (c − b)/a; if a < 0 the inequality sign reverses upon division. (Sullivan, *Algebra & Trigonometry*, 11e, §1.6)

## 8. Visual — diagram or schematic

```text
Number line for x ≥ −2          Number line for x < 3
          −3  −2  −1   0   1            1   2   3   4   5
           |   |   |   |   |            |   |   |   |   |
               ●────────────────►           ◯───────────►
             closed circle                 open circle
```

The diagram shows a closed circle at −2 with arrow to +∞ and an open circle at 3 with arrow to −∞.

## 9. The memory technique

1. **The hook** — Picture a seesaw: when a negative weight (multiplier) jumps on, the entire board flips, reversing which side is “greater.”
2. **What to overlearn** — The four preservation rules plus the single sentence “negative multiplier flips the sign.”
3. **Spaced-repetition schedule** — Review the sign-flip rule after 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — Return to the definition: multiply both sides by a test negative number and observe the order reversal on the number line.

## 10. What this unlocks

Mastery of linear inequalities lets you describe feasible regions in linear programming, set constraints in optimisation models, and interpret solution sets for systems of inequalities that appear in later algebra topics.

- Systems of linear inequalities and their polygonal feasible regions
- Absolute-value inequalities via case analysis
- Linear programming and simplex method foundations
- Interval notation used in calculus limit definitions

## 11. Self-check — five questions, no answers

1. Solve 7 − 2x > 3 and represent the solution on a number line.
2. Without solving, predict whether the inequality sign will flip when you solve −5x + 4 ≤ 9.
3. A student obtained x ≤ 2 after dividing −4x ≥ −8 by −4 but drew an open circle; identify the mistake.
4. Express the solution set of 3(x − 1) < 6x + 9 in interval notation.
5. Given that x satisfies −2 < x ≤ 5, which of the following must also be true: 2x > −4 or 2x < 10?