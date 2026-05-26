## 1. The one-sentence answer
**Addition and subtraction of algebraic expressions means combining only the like terms after you have removed parentheses by distributing coefficients and signs.**

Algebraic expressions are built from constants, variables, and exponents. When you add or subtract two such expressions you are not allowed to touch unlike terms; you must first identify every pair that has exactly the same variable factors raised to the same powers. The operation then reduces to ordinary arithmetic on their numerical coefficients. This rule follows directly from the commutative and distributive properties of the real numbers.

A negative sign in front of a parenthesis flips the sign of every term inside; forgetting that single flip is the source of most early mistakes. Once signs are corrected, you simply add or subtract the coefficients of matching terms and leave the variable part unchanged.

> [!NOTE]
> The single “aha” moment is that variables are labels, not numbers; you can add 4x and 7x because both count the same thing, but you can never add 4x and 7y because they count different things.

## 2. Why this matters — concrete and current
In orbital-mechanics software at NASA’s Jet Propulsion Laboratory, engineers add the perturbation polynomials that describe gravitational forces from multiple bodies; each monomial must be collected by degree before numerical integration begins.

In the forward pass of a neural-network training loop at PyTorch or JAX, the loss expression is expanded symbolically so that like-powered weight terms can be grouped; this grouping reduces the size of the computational graph before automatic differentiation runs.

Semiconductor foundries use polynomial addition when they combine process-variation models; the resulting compact expression is fed into Monte-Carlo simulators that predict transistor delay distributions.

When an aerospace team at ISRO merges two trajectory-correction polynomials for a lunar transfer orbit, subtraction of like-powered velocity terms yields the net delta-v budget that the onboard computer must execute.

Economists at the Reserve Bank of India subtract quarterly GDP component polynomials to isolate seasonal effects; the remaining expression is then used for inflation forecasting models.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Variable and constant| You must recognise which symbols are fixed numbers and which can change. |
| Like terms           | Only terms with identical variable factors may be combined. |
| Distributive law     | You need it to remove parentheses before any addition.    |
| Signed-number arithmetic | Coefficients can be negative; you must add and subtract them correctly. |

If any row above is unclear, pause and master that idea first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify every term
An algebraic expression is a sum of terms. Each term is a coefficient multiplied by a product of variables raised to non-negative integer powers.  
Example: In \(3x^2 - 5xy + 7\), the terms are \(3x^2\), \(-5xy\) and \(7\).  
Formal statement: An expression \(E\) is written \(E = \sum c_i m_i\) where each \(m_i\) is a monomial.  
> [!WARNING]  
> Treating the minus sign as attached to the following variable instead of the coefficient will produce an incorrect monomial list.

### Step 2 — Locate like terms
Two terms are like terms when their variable parts are identical.  
Example: \(4x^2y\) and \(-9x^2y\) are like; \(4x^2y\) and \(4xy^2\) are not.  
Formal statement: Monomials \(m_i\) and \(m_j\) satisfy \(m_i \sim m_j\) iff the exponents of every variable match exactly.  
> [!WARNING]  
> Matching only the variables while ignoring exponents (for example, treating \(x^2\) and \(x^3\) as like) collapses distinct powers and destroys the polynomial degree.

### Step 3 — Distribute negatives
A subtraction sign in front of a parenthesis multiplies every term inside by \(-1\).  
Example: \( (2x - 3) - (4x + 1) = 2x - 3 - 4x - 1 \).  
Formal statement: \(A - B = A + (-1)\cdot B\).  
> [!WARNING]  
> Changing only the first term’s sign and leaving the rest untouched is the most common single-term error.

### Step 4 — Group like terms
After distribution, rearrange so that like terms sit next to each other; this step uses commutativity of addition.  
Example: \(2x - 4x + 3y - y = (2x - 4x) + (3y - y)\).  
Formal statement: \(\sum c_i m_i + \sum d_j m_j = \sum (c_i + d_i) m_i\) where the sum runs only over matching monomials.  
> [!WARNING]  
> Adding coefficients of unlike terms produces an expression that is no longer equal to the original.

### Step 5 — Combine coefficients
For each group of like terms add or subtract the numerical coefficients; the variable part stays exactly the same.  
Example: \(2x - 4x = -2x\).  
Formal statement: \(c\cdot m + d\cdot m = (c+d)\cdot m\).  
> [!WARNING]  
> Forgetting that \(x\) means \(1\cdot x\) leads to writing answers such as \(-2\) instead of \(-2x\).

### Step 6 — Write the final polynomial in standard form
Arrange the resulting terms in descending order of total degree and, within the same degree, lexicographical order of variables.  
Formal statement: The canonical representative of the equivalence class is the unique polynomial whose monomials are strictly decreasing in degree.  
> [!WARNING]  
> Leaving terms unsorted hides opportunities to spot further like-term cancellations later.

## 5. Worked examples — har step show karo

**Example 1 — Two like terms**  
*Given:* \(5x + 3x\)  
*Find:* the simplified expression.  
5x + 3x = (5 + 3)x (add coefficients of identical monomials)  
**\(8x\)**  
*Reflection:* The example isolates the single arithmetic step; the pattern generalises to any number of like terms.

**Example 2 — Negative distribution**  
*Given:* \(4a - (2a - 7)\)  
*Find:* simplified form.  
4a − (2a − 7) = 4a − 2a + 7 (distribute −1)  
= (4a − 2a) + 7 (group)  
= 2a + 7 (combine)  
**\(2a + 7\)**  
*Reflection:* The minus sign flip is the only non-obvious move; once performed, the rest is ordinary addition.

**Example 3 — Mixed variables**  
*Given:* \(3x^2y - 5x^2y + 2xy^2 - xy^2\)  
*Find:* simplified expression.  
3x²y − 5x²y = −2x
²y  
2xy² − xy² = xy²  
**\(-2x^2y + xy^2\)**  
*Reflection:* Two separate pairs of like terms appear; each pair is handled independently.

**Example 4 — Higher degree with subtraction**  
*Given:* \((2x^3 - 4x + 1) - (x^3 + 3x^2 - 4x + 5)\)  
*Find:* result in standard form.  
2x³ − 4x + 1 − x³ − 3x² + 4x − 5 (distribute)  
(2x
³ − x³) − 3x² + (−4x + 4x) + (1 − 5) (group)  
x³ − 3x² + 0x − 4 (combine)  
**\(x^3 - 3x^2 - 4\)**  
*Reflection:* The zero coefficient of x disappears in the final write-up; degree order must still be maintained.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Changing only the first sign inside parentheses | Students treat “−” as a binary operator only | Always multiply every term by −1 explicitly  |
| Adding coefficients of unlike terms | Visual similarity misleads                  | Write variable parts above coefficients and match exactly |
| Forgetting that a lone variable has coefficient 1 | Implicit 1 is invisible                     | Rewrite x as 1·x before combining            |
| Dropping the variable after subtraction yields zero | Over-generalising “numbers only”            | Keep the monomial until coefficient arithmetic finishes |
| Sign error on the constant term | Constants look “different” from variables   | Treat constants as degree-zero monomials     |
| Leaving unlike terms in the answer | Incomplete grouping                         | After each addition pass, scan remaining terms for new matches |
| Wrong exponent match (x² vs x³) | Rushing the comparison                      | Compare exponent vectors term by term        |

## 7. The textbook-precise statement
Let \(R\) be the ring of real numbers and let \(R[x_1,\dots,x_n]\) be the polynomial ring in \(n\) indeterminates. For any two polynomials \(f = \sum_{\alpha} a_{\alpha} X^{\alpha}\) and \(g = \sum_{\alpha} b_{\alpha} X^{\alpha}\) (multi-index notation), their sum and difference are defined by
\[
(f \pm g) = \sum_{\alpha} (a_{\alpha} \pm b_{\alpha}) X^{\alpha}.
\]
Only monomials sharing the identical multi-index \(\alpha\) may have their coefficients added. This is stated in Artin, *Algebra*, 2e, Chapter 10, §2.

## 8. Visual — diagram or schematic
```text
Expression:  3x²y  -  5x²y  +  2xy²  -  xy²
             │       │        │        │
Like-term    └──┬────┘        └──┬────┘
groups          ▼                ▼
             -2x
²y          + xy²
```

## 9. The memory technique
1. **The hook** — Picture two baskets labelled “x²y” and “xy²”; you may drop only identical fruit into the same basket.
2. **What to overlearn** — The distributive rule \(A-(B+C)=A-B-C\) and the definition of like terms (identical variable factors and exponents).
3. **Spaced-repetition schedule** — Review the six steps after 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — Return to the distributive law and the commutative property of addition; rebuild the grouping step by step.

## 10. What this unlocks
Mastery lets you simplify any polynomial before you multiply, divide, factor or differentiate it.  
- Polynomial multiplication (next lesson)  
- Factorisation by grouping  
- Solving polynomial equations  
- Partial-fraction decomposition  
- Derivative power rule applications  

## 11. Self-check — five questions, no answers
1. Simplify \(7m - 3n + 2m - 5n\).
2. Expand and simplify \((x^2 - 3x + 4) - 2(x^2 + x - 1)\).
3. Which of the following pairs are like terms: \(4a^2b\), \(-4ab^2\), \(4a^2b^3\)? Explain.
4. A student writes \(2x + 3x = 5x^2\). Identify the error and correct it.
5. Reduce \((2x^3y - x^2y^2) - (x^3y + 3x^2y^2)\) to standard form and state its degree.