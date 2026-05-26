## 1. The one-sentence answer
**Addition and subtraction of algebraic expressions is the operation of combining like terms after distributing any coefficients across parentheses.**

Algebraic expressions are built from numbers, variables, and the four arithmetic operations. When two expressions are added or subtracted, only terms that contain exactly the same variables raised to the same powers may be merged; their numerical coefficients are added or subtracted while the variable part stays unchanged. All other terms remain separate. This rule follows directly from the commutative and associative properties of addition once like terms are identified.

The process begins by removing parentheses through distribution, then grouping identical variable factors, and finally simplifying the numerical coefficients. The result is a new expression whose degree and structure are preserved except for the reduced number of terms.

> [!NOTE]
> The single decisive insight is that variables act as labels: two terms are “like” only when every label matches exactly, so their coefficients behave exactly like ordinary numbers under addition.

## 2. Why this matters — concrete and current
In semiconductor mask layout, parasitic capacitance between wires is expressed as sums of monomials in wire length and spacing; adding or subtracting these expressions yields the total load seen by a driver, which is then minimized by commercial place-and-route tools such as Cadence Innovus.

In model-predictive control for autonomous drones, the predicted state trajectory is written as a polynomial in the control inputs; subtracting the reference trajectory produces an error polynomial whose coefficients must be driven to zero, a calculation performed thousands of times per second inside PX4 autopilot firmware.

In gradient-boosted decision-tree libraries such as XGBoost, the second-order Taylor expansion of the loss contains quadratic terms in the leaf weights; adding these quadratics across all samples produces the closed-form leaf-weight update used at every split.

In quantum-circuit simulation, the expectation value of an observable is obtained by adding matrix elements expressed as monomials in gate parameters; subtraction of the measured value from the simulated value drives variational-parameter updates on devices such as IBM Quantum processors.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Variable and constant    | Distinguishes the part that stays fixed from the part that combines |
| Coefficient              | The number that multiplies each variable factor and is the only quantity that changes during addition |
| Like terms               | The precise criterion that decides whether two terms may be merged |
| Distributive property    | Required to remove parentheses before like terms can be collected |
| Exponent rules           | Ensures that \(x^2\) and \(x^3\) are recognized as unlike |

## 4. Building the idea — from intuition to formalism

### Step 1 — Terms are indivisible packages
A term is a product of a coefficient and one or more variables raised to powers.  
Example: In \(3x^2y\), the coefficient 3 multiplies the package \(x^2y\).  
Formal statement: An algebraic term is written \(c\cdot x_1^{k_1}\cdots x_m^{k_m}\) where \(c\in\mathbb{R}\) and each \(k_i\) is a non-negative integer.  
> [!WARNING] Treating \(3x\) and \(3x^2\) as addable produces an incorrect degree and breaks later polynomial identities.

### Step 2 — Like terms share identical variable packages
Two terms are like when the variables and all their exponents match exactly.  
Example: \(4x^2y\) and \(-7x^2y\) are like; \(4x^2y\) and \(4xy^2\) are not.  
Formal statement: Terms \(c_1\mathbf{m}\) and \(c_2\mathbf{m}\) are like when the monomial \(\mathbf{m}\) is identical.

### Step 3 — Coefficients combine under addition
The sum of two like terms is the ordinary sum of their coefficients multiplied by the common monomial.  
Example: \(4x^2y + (-7x^2y) = (4-7)x^2y = -3x^2y\).  
Formal statement: \(c_1\mathbf{m} + c_2\mathbf{m} = (c_1+c_2)\mathbf{m}\).

### Step 4 — Subtraction is addition of the negative
Subtracting an expression is equivalent to distributing a factor of −1.  
Example: \(5x - (2x-3) = 5x -2x +3 = 3x +3\).  
Formal statement: \(A - B = A + (-1)B\).

### Step 5 — Parentheses are removed by distribution before collection
Every subtraction or addition of grouped expressions must first expand via the distributive law.  
Formal statement: \(c(A\pm B) = cA \pm cB\).

### Step 6 — The fully simplified expression
After all expansions and collections, the resulting expression contains at most one term for each distinct monomial and is said to be in standard form.

## 5. Worked examples — every step shown

**Example 1 — Two like terms**  
*Given:* \(8x^2 + 5x^2\)  
*Find:* the sum.  
Step 1: Identify the monomial \(x^2\) in both terms.  
*Why:* Both terms share identical variable factors.  
Step 2: Add coefficients: \(8+5=13\).  
*Why:* Coefficients obey ordinary arithmetic once the monomial is fixed.  
**\(13x^2\)**

*Reflection:* The example isolates the single rule that only coefficients change; everything else is copied verbatim.

**Example 2 — Mixed signs with subtraction**  
*Given:* \(4a - (7a - 2)\)  
*Find:* the difference.  
Step 1: Distribute the minus sign: \(4a -7a +2\).  
*Why:* Subtraction of a grouped expression requires the distributive law.  
Step 2: Combine like terms \(4a-7a = -3a\).  
*Why:* Like terms are collected after parentheses are removed.  
**\(-3a + 2\)**

*Reflection:* The sign change inside parentheses is the most frequent source of arithmetic error.

**Example 3 — Three unlike monomials**  
*Given:* \(2x^2y + 3xy^2 - 5x^2y + xy^2\)  
*Find:* the simplified expression.  
Step 1: Group the two \(x^2y\) terms: \((2-5)x^2y = -3x^2y\).  
*Why:* Only identical monomials may be merged.  
Step 2: Group the two \(xy^2\) terms: \((3+1)xy^2 = 4xy^2\).  
*Why:* The remaining monomials are collected independently.  
**\(-3x^2y + 4xy^2\)**

*Reflection:* Sorting terms by monomial type before arithmetic prevents missed cancellations.

**Example 4 — Nested parentheses**  
*Given:* \(3(x-y) - 2(2x + y - 4)\)  
*Find:* the expanded form.  
Step 1: Distribute 3: \(3x - 3y\).  
*Why:* Each outer coefficient multiplies every term inside.  
Step 2: Distribute −2: \(-4x -2y +8\).  
*Why:* The minus sign reverses every sign inside the second parentheses.  
Step 3: Combine all \(x\) terms: \(3x-4x = -x\); all \(y\) terms: \(-3y-2y = -5y\).  
*Why:* Like terms are collected only after full expansion.  
**\(-x -5y +8\)**

*Reflection:* Nested distribution must be performed left-to-right; any omitted sign flip propagates through the entire result.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Adding coefficients of unlike terms | Visual similarity of variables misleads     | Write monomials in canonical order before comparing  |
| Forgetting to distribute a minus sign | Subtraction looks like ordinary minus       | Always replace “−(…)” with “+(−1)×(…)”               |
| Treating \(x\) and \(x^1\) as different | Exponent 1 is invisible                     | Rewrite every variable as \(x^1\) on first pass      |
| Combining \(2x^2\) and \(2x^2y\)   | Shared factors hide differing exponents     | List every exponent tuple explicitly                 |
| Losing the constant term          | Constants have empty monomial               | Treat constants as degree-0 monomials                |
| Sign error after two successive distributions | Each distribution can flip signs            | Track the running sign multiplier after each step    |
| Overlooking that \(0\cdot x = 0\) | Zero coefficient silently drops a term      | Explicitly write any term whose coefficient becomes zero |

## 7. The textbook-precise statement
An algebraic expression is a finite sum of terms, each term being a real coefficient times a monomial. Two monomials are identical when their variable sets and corresponding exponents coincide. The sum or difference of two expressions is obtained by first expanding all parentheses via the distributive law and then replacing every pair of identical monomials \(c_1\mathbf{m}\) and \(c_2\mathbf{m}\) by the single monomial \((c_1+c_2)\mathbf{m}\). The resulting expression is unique up to ordering of terms (Herstein, *Topics in Algebra*, 2e, §1.1).

## 8. Visual — diagram or schematic
```text
Expression A:   4x²y   +   3xy²   −   7x²y
                    |          |          |
                    v          v          v
Monomial buckets:  x²y        xy²       x²y
                    |          |          |
                    v          v          v
Coefficients:     4+(-7)     3+0        (already grouped)
                    |          |
                    v          v
Simplified:      −3x²y   +   3xy²
```
Each vertical arrow shows the monomial label acting as a sorting key; only coefficients inside the same bucket are added.

## 9. The memory technique

**The hook**  
Picture each distinct monomial as a separate mailbox; only letters (coefficients) inside the same mailbox may be added.

**What to overlearn**  
1. Like terms share identical variable-exponent tuples.  
2. Subtraction = distribute −1 then add.  
3. The empty monomial (constant) is always like itself.

**Spaced-repetition schedule**  
Review the three facts above at 1 day, 3 days, 7 days, 16 days, and 35 days after first study.

**First-principles fallback**  
If the rule is forgotten, expand every expression into a sum of individual monomials using the definition of multiplication, then invoke commutativity of addition to regroup identical factors.

## 10. What this unlocks
Mastery of addition and subtraction of expressions is the gateway to polynomial arithmetic, factorization, and equation solving.  
- Polynomial multiplication and division rely on the same monomial bookkeeping.  
- Solving linear systems by elimination repeatedly adds and subtracts entire equations.  
- Derivative rules for polynomials are term-by-term applications of the same collection process.  
- Gröbner-basis algorithms in computational algebra begin with multivariate versions of exactly these reductions.

## 11. Self-check — five questions, no answers
1. Simplify \(5x^2 - 3x + 2 - (2x^2 + 4x - 7)\).  
2. Which of the following pairs are like terms: \((2ab^2, -5a^2b)\), \((7x^3y, 7x^3y^2)\), \((−9, 4)\)?  
3. Expand and collect: \(−2(3x − y) + 4(x + 2y − 1)\).  
4. A student writes \(3x + 2x^2 = 5x^3\). Identify the precise algebraic error.  
5. Prove that the simplified form of any linear expression \(ax + by + c\) is unique regardless of the order of additions and subtractions performed.