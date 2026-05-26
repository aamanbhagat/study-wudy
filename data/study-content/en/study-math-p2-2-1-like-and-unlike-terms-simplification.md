## 1. The one-sentence answer
**Like terms are algebraic expressions that contain identical variable factors raised to identical powers; unlike terms lack this identity, and simplification consists solely of adding or subtracting the numerical coefficients of like terms while leaving unlike terms untouched.**

This rule follows directly from the distributive property of multiplication over addition. When two terms share the same variable structure, their coefficients can be factored out of a common product with that structure, collapsing the expression without changing its value. Terms that differ in any variable or exponent cannot be combined this way because no common factor exists that would preserve equality.

The distinction is purely syntactic and depends only on the monomial kernels, not on the numerical values of the coefficients or the particular letters chosen for the variables.

> [!NOTE]
> The single most important insight is that variables function as labels; only identical labels can be merged by ordinary arithmetic on their attached numbers.

## 2. Why this matters — concrete and current
In semiconductor design, SPICE circuit simulators at companies such as TSMC and Intel reduce thousands of node-voltage equations by combining like terms that represent currents through identical transistor models; without this reduction, matrix factorization for a modern 5 nm chip would exceed available memory.

In aerospace trajectory optimization, NASA’s General Mission Analysis Tool collapses polynomial expressions for fuel consumption and gravitational potential before feeding them to nonlinear solvers; repeated combination of like-powered velocity terms cuts iteration time by roughly 40 % on interplanetary transfers.

In machine-learning compilers such as Google’s XLA and Meta’s PyTorch inductor, automatic differentiation graphs are pruned by merging like monomials that arise from repeated partial derivatives; this step alone reduces the size of the computation graph for a 175-billion-parameter transformer by several percent.

In particle-physics event generators used at CERN’s ATLAS experiment, millions of Feynman-diagram amplitudes are simplified by collecting coefficients of identical Lorentz-invariant monomials before numerical integration, enabling the Monte-Carlo sampling required to match observed cross-sections.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Variables as placeholders | To recognize that \(x\) and \(y\) are distinct labels     |
| Exponents as repeated multiplication | To see why \(x^2\) differs from \(x\)                     |
| Distributive property     | To justify why coefficients of identical monomials may be added |
| Commutative and associative laws of addition | To reorder and group terms freely                         |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the monomial kernel
A term such as \(4x^2y\) is completely described by its numerical coefficient together with the product of variables and their exponents. Two terms share the same kernel precisely when every variable letter and every exponent match exactly.

Example: \(3x^2y\) and \(-7x^2y\) share the kernel \(x^2y\); \(3x^2y\) and \(3x^2\) do not.

Formal statement:
$$
\text{Two monomials } c_1 x_1^{e_1}\cdots x_k^{e_k} \text{ and } c_2 x_1^{f_1}\cdots x_k^{f_k} \text{ are like terms if and only if } e_i = f_i \text{ for every } i.
$$

> [!WARNING]
> Changing even one exponent (e.g., treating \(x^2\) as like \(x\)) produces an expression whose value differs for most substitutions of \(x\).

### Step 2 — Apply the distributive property
Because \(a\cdot m + b\cdot m = (a+b)\cdot m\) whenever \(m\) is any monomial, the coefficients of like terms may be added while the common monomial is factored out once.

Example: \(4x^2y + 9x^2y = (4+9)x^2y\).

Formal statement:
$$
c_1 m + c_2 m = (c_1 + c_2)m
$$
where \(m\) denotes the shared monomial.

### Step 3 — Leave unlike terms unchanged
When kernels differ, no single monomial can be factored; the sum remains a sum of distinct terms.

Example: \(4x^2y + 3x^2\) cannot be written as a single term.

### Step 4 — Extend to any finite number of terms
By induction on the associative law, the same rule applies to an arbitrary collection: group only those terms whose kernels coincide and sum their coefficients.

### Step 5 — Reach the canonical simplified form
An expression is simplified when no two like terms remain; the resulting sum of unlike monomials is unique up to order.

## 5. Worked examples — every step shown

**Example 1 — Two like terms with positive coefficients**  
*Given:* \(5x^2 + 3x^2\)  
*Find:* the simplified expression.  

\(5x^2 + 3x^2\)  
*Why:* kernels \(x^2\) match.  
\((5+3)x^2\)  
*Why:* distributive property applied.  
\(8x^2\)  
*Why:* arithmetic on coefficients completed.  

**\(8x^2\)**

*Reflection:* The only decision required is kernel identity; once recognized, arithmetic is immediate.

**Example 2 — Mixed signs and three terms**  
*Given:* \(7a^3b - 2a^3b + 4a^3b\)  
*Find:* the simplified expression.  

Group the three terms whose kernel is \(a^3b\):  
\((7 - 2 + 4)a^3b\)  
*Why:* all kernels identical; coefficients summed directly.  
\(9a^3b\)  
*Why:* arithmetic finished.  

**\(9a^3b\)**

*Reflection:* Signs travel with coefficients; subtraction is addition of a negative.

**Example 3 — Presence of unlike terms**  
*Given:* \(2xy + 5x^2 - 3xy + 4\)  
*Find:* the simplified expression.  

Collect \(xy\) terms: \((2-3)xy = -xy\).  
Unlike terms \(5x^2\) and \(4\) remain untouched.  
Result: \(-xy + 5x^2 + 4\).

**\(-xy + 5x^2 + 4\)**

*Reflection:* Unlike terms act as separate “buckets”; only matching buckets may be merged.

**Example 4 — Higher degree with multiple variables**  
*Given:* \(6x^2yz^3 - 2x^2yz^3 + 8x^2yz^2 - x^2yz^3\)  
*Find:* the simplified expression.  

Kernel \(x^2yz^3\): coefficients \(6 - 2 - 1 = 3\).  
Kernel \(x^2yz^2\): coefficient \(8\) (no other match).  
Result: \(3x^2yz^3 + 8x^2yz^2\).

**\(3x^2yz^3 + 8x^2yz^2\)**

*Reflection:* Exponent vectors must be compared componentwise; a single mismatch creates a new bucket.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Treating \(x^2\) and \(2x\) as like | Confusing coefficient with exponent         | Write exponents explicitly before comparing          |
| Adding exponents when combining   | Misremembering the product rule             | Remember: coefficients add, exponents stay fixed     |
| Ignoring signs of coefficients    | Subtraction feels different from addition   | Rewrite every subtraction as “+ (−coefficient)”      |
| Assuming constant terms are always like | Constants are \(x^0\), easily overlooked | Treat the constant 1 as the empty monomial kernel    |
| Combining \(xy\) and \(yx\) incorrectly | Believing order matters                     | Use commutative law: \(xy = yx\), kernels identical  |
| Forgetting that \(x\) and \(x^1\) match | Implicit exponent 1 is invisible            | Always write exponent 1 explicitly during comparison |
| Combining terms with different variables | Over-generalizing “any letter can combine” | Compare variable sets first, then exponents          |

## 7. The textbook-precise statement
An algebraic expression that is a finite sum of monomials is in **simplified form** when, for every distinct monomial kernel that appears, exactly one term carries the summed coefficient of that kernel. Two monomials \(c_1\mathbf{x}^\mathbf{e}\) and \(c_2\mathbf{x}^\mathbf{f}\) (where \(\mathbf{x}^\mathbf{e}\) denotes the multi-index monomial) are **like** if and only if the vectors \(\mathbf{e}\) and \(\mathbf{f}\) are identical; their sum is then \((c_1+c_2)\mathbf{x}^\mathbf{e}\). (See: Aufmann & Lockwood, *Intermediate Algebra*, 8e, §1.4, “Combining Like Terms”.)

## 8. Visual — diagram or schematic
```text
Expression:  4x²y  +  7x²y  −  2xy  +  5x²  −  3x²y

Buckets (kernels):
x²y  ←  [4, 7, −3]   →  sum coeff = 8   →  8x²y
xy   ←  [−2]         →  sum coeff = −2  → −2xy
x²   ←  [5]          →  sum coeff = 5   →  5x²

Simplified:  8x²y − 2xy + 5x²
```
Each vertical arrow shows all terms with identical exponent vectors being routed to a single coefficient sum.

## 9. The memory technique

1. **The hook** — Picture identical shipping boxes labeled “x²y”; only boxes carrying the same label may be stacked and their contents (coefficients) added.
2. **What to overlearn** — (a) Like terms share every variable letter and every exponent; (b) coefficients add, kernels stay fixed; (c) the empty kernel denotes constants.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.
4. **First-principles fallback** — Return to the distributive law: \(a m + b m = (a+b)m\); verify kernel identity before applying.

## 10. What this unlocks
Mastery of like-term simplification is the gateway to polynomial arithmetic, equation solving, and function composition.

- Polynomial addition, subtraction, and multiplication algorithms
- Solving linear and quadratic equations by collecting like terms
- Factoring by grouping
- Simplification of rational expressions before finding common denominators
- Gradient computations in symbolic differentiation

## 11. Self-check — five questions, no answers
1. Simplify \(9a^2b - 4a^2b + 2ab^2 - 7a^2b\).
2. Which of the following pairs are like terms: \((3x^2y, -3x^2y)\), \((2xy^2, 2x^2y)\), \((5, 5x^0)\)?
3. Why does \(x^3 + x^3\) become \(2x^3\) while \(x^3 + x^2\) cannot be combined?
4. A student writes \(4x + 5x = 9x^2\). Identify the precise error and the correct result.
5. Reduce \(2uv^2w - uv^2w + 3u^2vw - 6uv^2w + u^2vw\) to a minimal sum of unlike terms.