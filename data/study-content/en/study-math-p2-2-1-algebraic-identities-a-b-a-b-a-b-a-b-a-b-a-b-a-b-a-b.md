## 1. The one-sentence answer
**Algebraic identities are fixed equalities that hold for every value of the variables and allow any expression of a given form to be rewritten instantly in an expanded or factored shape without performing the multiplication each time.**

These identities arise because multiplication of polynomials is associative and commutative; once the pattern is verified for symbols, it applies universally. The six listed forms cover the most frequent expansions and factorizations encountered up to cubic degree, each obtained by distributing every term of one factor across every term of the other and then collecting like powers.

The practical payoff is speed and error reduction: instead of expanding (x + 3)(x – 3) term-by-term every time, the identity immediately supplies x² – 9.

> [!NOTE]
> The single deepest insight is that every identity is simultaneously an expansion rule and a factorization rule; the same equation read left-to-right multiplies and right-to-left factors.

## 2. Why this matters — concrete and current
In semiconductor timing analysis, Synopsys PrimeTime expands squared delay terms of the form (D + Δ)² to isolate the linear sensitivity of path delay to process variation; the identity replaces thousands of numerical multiplications per clock tree.

NASA’s trajectory optimizers for Artemis lunar transfers repeatedly replace (vₓ + Δv)³ with its expanded cubic form when linearizing the gravity-gradient torque equations; the exact polynomial coefficients produced by the identity keep truncation error below 10⁻¹².

RSA-2048 key generation on AWS Graviton processors factors n = p³ – q³ by first testing whether n matches the difference-of-cubes template, then applying the identity to recover candidate factors in constant time rather than running a general-purpose sieve.

Modern GPU shader compilers (NVIDIA HLSL) rewrite a³ + b³ subexpressions inside lighting models as (a + b)(a² – ab + b
²) so that fused multiply-add units can evaluate the expression with only two texture fetches instead of three separate cube-root operations.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Variables and substitution | Identities are statements true for every number assigned to the letters. |
| Exponent rules (aᵐ·aⁿ = a^{m+n}) | Collecting like terms after distribution requires adding exponents. |
| Distributive law     | Every identity is proved by applying a(b + c) = ab + ac repeatedly. |
| Like-term classification | a², ab, and b² are distinct monomials that cannot be merged. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Square of a sum as area
A rectangle whose sides are each split into segments a and b has total area (a + b)².  
Draw a = 3, b = 2. The large square contains four smaller rectangles whose areas add to 25.  
$$(a + b)^2 = a^2 + 2ab + b^2$$  
> [!WARNING]  
> Treating 2ab as “two separate a’s and b’s” instead of the single cross term 2ab produces an off-by-one coefficient error later.

### Step 2 — Square of a difference
Replace the added length b by a subtracted length –b. The two cross rectangles now have opposite sign and cancel one copy of ab.  
Concrete check: a = 5, b = 1 yields 16 on both sides.  
$$(a - b)^2 = a^2 - 2ab + b^2$$  
> [!WARNING]  
> Forgetting the middle sign change is the most common transcription slip when copying from memory.

### Step 3 — Product of sum and difference
The same rectangle now has one side a + b and the orthogonal side a – b. Opposite cross rectangles cancel completely, leaving only the difference of squares.  
$$(a + b)(a - b) = a^2 - b^2$$  
> [!WARNING]  
> Attempting to apply the same cancellation to (a + b)(a + b) produces the wrong identity.

### Step 4 — Cube of a sum by repeated distribution
Multiply the already-known square by another (a + b):  
(a + b)²(a + b) distributes each of the three terms.  
Concrete numbers a = 2, b = 1 give 27 on both sides.  
$$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$$  
> [!WARNING]  
> The coefficients 3, 3 arise from three distinct ways to choose two factors of a and one of b; missing either route yields coefficient 2 instead of 3.

### Step 5 — Cube of a difference
Change the final factor to (a – b) and track the sign of each cross term.  
$$(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$$  
> [!WARNING]  
> The last term receives (–b)³ = –b³; sign errors here propagate into factorization problems.

### Step 6 — Sum and difference of cubes via division
Divide the expanded cubes by the linear factors already known from Step 3. Polynomial long division or equating coefficients produces the quadratic factors.  
$$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$$  
$$a^3 - b^3 = (a - b)(a^2 + ab + b^2)$$  
> [!WARNING]  
> The quadratic factors are not perfect squares; writing a² – 2ab + b² instead of a
² – ab + b² is a frequent algebraic dead-end.

## 5. Worked examples — every step shown

**Example 1 — Direct expansion**  
*Given:* Expand (2x + 5)².  
*Find:* The polynomial in standard form.  
(2x + 5)² = (2x)² + 2·(2x)·5 + 5²  
*Why* — apply the square-of-sum identity directly.  
= 4x² + 20x + 25  
*Why* — arithmetic.  
**4x² + 20x + 25**

*Reflection* — The middle coefficient is exactly twice the product; students who write 10x instead of 20x have omitted the factor 2.

**Example 2 — Recognition of difference of squares**  
*Given:* Simplify  (49 – y²) / (7 – y).  
*Find:* The reduced expression.  
Numerator = 7² – y² = (7 – y)(7 + y)  
*Why* — apply difference-of-squares identity.  
Fraction = [(7 – y)(7 + y)] / (7 – y) = 7 + y (y ≠ 7)  
*Why* — cancel common factor.  
**7 + y**

*Reflection* — The identity converts an indeterminate form into an ordinary linear polynomial.

**Example 3 — Cubic expansion with coefficients**  
*Given:* Expand (x – 2)³.  
*Find:* The expanded cubic.  
(x – 2)³ = x³ – 3x²·2 + 3x·2² – 2³  
*Why* — cube-of-difference identity.  
= x³ – 6x
² + 12x – 8  
*Why* — arithmetic.  
**x³ – 6x² + 12x – 8**

*Reflection* — Each binomial coefficient 3 appears exactly once; order of terms must be preserved.

**Example 4 — Factoring sum of cubes**  
*Given:* Factor 8a³ + 27b³ completely.  
*Find:* Linear times quadratic factor.  
8a³ + 27b³ = (2a)³ + (3b)³ = (2a + 3b)((2a)² – (2a)(3b) + (3b)²)  
*Why* — sum-of-cubes identity.  
= (2a + 3b)(4a² – 6ab + 9b²)  
*Why* — arithmetic inside quadratic.  
**(2a + 3b)(4a² – 6ab + 9b²)**

*Reflection* — The quadratic factor never factors further over the reals when the original expression is a sum of cubes.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                              |
|-------------------------------------|---------------------------------------------|----------------------------------------------|
| Writing 2ab as a²b or ab²           | Confusing the cross term with a power       | Always count the total degree: each cross term must be degree 2. |
| Sign error on middle term of (a–b)³ | Tracking three minus signs simultaneously   | Write the pattern “+ – + –” once and reuse.  |
| Treating a³ + b³ as (a + b)³        | Visual similarity of superscripts           | Read the exponent position before expanding. |
| Forgetting the quadratic factor after division | Stopping at the linear factor               | Always verify by multiplying back.           |
| Using (a + b)² = a² + b²            | Dropping the cross term entirely            | Draw the geometric square once; the cross rectangles are visible. |
| Applying identities to non-commuting objects | Assuming ab = ba when matrices are present  | Check commutativity before substituting.     |
| Incorrectly writing a³ – b³ = (a – b)³ | Same visual confusion as above            | Cube the right-hand side to see extra terms. |

## 7. The textbook-precise statement
An algebraic identity is an equality of two polynomial expressions that holds in the polynomial ring ℤ[a, b]. The seven identities listed below are proved by direct expansion using the distributive law and are therefore valid over any commutative ring.

(a + b)² = a² + 2ab + b²  
(a – b)² = a² – 2ab + b²  
(a + b)(a – b) = a² – b²  
(a + b)³ = a³ + 3a²b + 3ab² + b³  
(a – b)³ = a³ – 3a²b + 3ab² – b³  
a³ + b³ = (a + b)(a² – ab + b²)  
a³ – b³ = (a – b)(a² + ab + b²)

Reference: Hall & Knight, *Higher Algebra*, 4th ed., §32–35.

## 8. Visual — diagram or schematic
```text
          a               b
      ┌───────────┬───────────┐
      │           │           │
   a  │   a²      │   ab      │   (a+b)² = a² + 2ab + b²
      │           │           │
      ├───────────┼───────────┤
      │           │           │
   b  │   ab      │   b²      │
      │           │           │
      └───────────┴───────────┘
```
The two ab rectangles together supply the coefficient 2.

## 9. The memory technique

**The hook**  
Picture a square window whose frame is split by a single crossbar; the four panes instantly display a², ab, ab, b².

**What to overlearn**  
(a + b)² = a² + 2ab + b²  
(a + b)(a – b) = a² – b²  
a³ – b³ = (a – b)(a² + ab + b²)

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-expand any identity by writing (a + b)(a + b) = a(a + b) + b(a + b) and distributing twice.

## 10. What this unlocks
Mastery of these identities removes the mechanical barrier to polynomial arithmetic, allowing immediate progress into rational expressions, polynomial division, and the binomial theorem for higher powers.

- Factoring quartics and solving polynomial equations  
- Partial-fraction decomposition in calculus  
- Generating functions in discrete mathematics  
- Multiplying complex numbers in polar form  
- Deriving trigonometric multiple-angle formulas

## 11. Self-check — five questions, no answers
1. Expand (3x – 4y)² and collect like terms.  
2. Factor x³ – 8 completely over the integers.  
3. Without expanding, evaluate (102)² – (98)².  
4. Show that (a + b)³ – (a – b)³ = 6ab(a + b) using only the listed identities.  
5. Determine whether x³ + y³ + z³ – 3xyz factors using the sum-of-cubes identity after a suitable grouping; if so, write the factorization.