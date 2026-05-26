## 1. The one-sentence answer
**Fractions are ratios of integers that represent division, and the four arithmetic operations on them are executed by rewriting each fraction so that the underlying multiplicative structure is preserved.**

A fraction \(\frac{a}{b}\) with \(b \neq 0\) denotes the unique real number that satisfies \(b \cdot x = a\). All operations on fractions therefore reduce to finding another pair of integers whose ratio equals the same real number after the operation is performed. Addition and subtraction require a common scale (common denominator) so that the numerators count identical units. Multiplication scales both the numerator and denominator directly. Division inverts the scaling factor.

The rules that follow are not arbitrary recipes; each is the only transformation that keeps the equality \(b \cdot x = a\) intact after the operation. Once the integer operations of multiplication and addition are trusted, the fraction rules follow mechanically.

> [!NOTE]
> The single deepest insight is that every valid operation on fractions is simply an instance of the field axioms applied to the field of rational numbers; the familiar “cross-multiply” or “invert-and-multiply” steps are merely the concrete arithmetic that realizes those axioms.

## 2. Why this matters — concrete and current
In semiconductor mask design, overlay error budgets are expressed as fractions of a nanometer; Intel’s 18A process node allocates sub-0.1 nm tolerances that must be added and subtracted across dozens of layers while preserving exact rational multiples of the design grid.

In the training of large language models, the Adam optimizer maintains exponential moving averages of gradients that are rational multiples of the learning-rate schedule; every weight update therefore executes thousands of fraction multiplications and divisions per parameter.

NASA’s Perseverance rover uses fractional clock-cycle timing derived from its 200 MHz RAD750 processor to synchronize mast-camera exposures with wheel odometry; addition of these fractions must remain exact to avoid drift in visual odometry over a 1000-sol mission.

Modern cryptographic libraries such as OpenSSL implement constant-time modular inverses for elliptic-curve arithmetic by treating field elements as fractions modulo a prime; division of fractions is reduced to a single multiplication by the modular inverse, a step whose correctness rests on the same rules taught here.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Positive integers and zero | Supply the numerators and denominators                    |
| Multiplication of integers | Core operation inside every fraction rule                 |
| Division as inverse multiplication | Explains why division by a fraction uses a reciprocal     |
| Equality of ratios       | Determines when two different-looking fractions are identical |

## 4. Building the idea — from intuition to formalism

### Step 1 — A fraction names a scaled unit
Any fraction \(\frac{a}{b}\) means “\(a\) copies of the unit that is one-\(b\)th of the whole.”  
Example: \(\frac{3}{4}\) is three pieces each one-fourth the size of 1.  
Formal statement:  
\[
\frac{a}{b} = a \cdot \frac{1}{b}, \quad b \neq 0.
\]
> [!WARNING]
> Treating the denominator as a label rather than a genuine divisor produces errors when the denominator later changes.

### Step 2 — Equivalent fractions share the same value
Multiplying numerator and denominator by the same nonzero integer leaves the value unchanged.  
Example: \(\frac{1}{2} = \frac{3}{6}\).  
Formal statement:  
\[
\frac{a}{b} = \frac{a \cdot k}{b \cdot k}, \quad k \neq 0.
\]

### Step 3 — Addition requires a common unit
Rewrite both fractions so they count pieces of identical size, then add the counts.  
Example: \(\frac{1}{2} + \frac{1}{3} = \frac{3}{6} + \frac{2}{6} = \frac{5}{6}\).  
Formal statement:  
\[
\frac{a}{b} + \frac{c}{d} = \frac{a d + b c}{b d}, \quad b,d \neq 0.
\]
> [!WARNING]
> Adding numerators while leaving denominators untouched counts pieces of different sizes and yields an incorrect total.

### Step 4 — Subtraction is addition of the additive inverse
The same common-denominator step applies after negating one numerator.  
Formal statement:  
\[
\frac{a}{b} - \frac{c}{d} = \frac{a d - b c}{b d}.
\]

### Step 5 — Multiplication scales both parts
The product of two ratios is the ratio of the products.  
Example: \(\frac{2}{3} \times \frac{4}{5} = \frac{8}{15}\).  
Formal statement:  
\[
\frac{a}{b} \cdot \frac{c}{d} = \frac{a c}{b d}.
\]

### Step 6 — Division multiplies by the reciprocal
Dividing by \(\frac{c}{d}\) is identical to multiplying by \(\frac{d}{c}\).  
Formal statement:  
\[
\frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \cdot \frac{d}{c} = \frac{a d}{b c}, \quad c,d \neq 0.
\]

### Step 7 — Reduce by extracting the greatest common divisor
After any operation, divide numerator and denominator by their greatest common divisor to obtain the canonical representative.  
Formal statement: if \(g = \gcd(|a|,|b|)\), then \(\frac{a}{b} = \frac{a/g}{b/g}\).

## 5. Worked examples — every step shown

**Example 1 — Simple addition**  
*Given:* \(\frac{1}{6} + \frac{5}{6}\).  
*Find:* the sum.  
\[
\frac{1}{6} + \frac{5}{6} = \frac{1+5}{6+0} \quad \text{(same denominator already)}
\]  
*Why:* numerators count identical sixths.  
\[
= \frac{6}{6} = 1
\]  
**1**  
*Reflection:* when denominators match, the operation collapses to ordinary integer addition.

**Example 2 — Subtraction requiring rewriting**  
*Given:* \(\frac{5}{8} - \frac{1}{3}\).  
*Find:* the difference.  
Find common denominator \(24\):  
\[
\frac{5}{8} = \frac{5 \cdot 3}{8 \cdot 3} = \frac{15}{24}, \quad \frac{1}{3} = \frac{1 \cdot 8}{3 \cdot 8} = \frac{8}{24}.
\]  
*Why:* multiplication by 1 in the form \(\frac{3}{3}\) or \(\frac{8}{8}\) preserves value.  
\[
\frac{15}{24} - \frac{8}{24} = \frac{7}{24}.
\]  
**\(\frac{7}{24}\)**  
*Reflection:* the least common multiple is not required; any common multiple works, but the smallest keeps numbers modest.

**Example 3 — Multiplication of negatives**  
*Given:* \(\left(-\frac{2}{5}\right) \times \frac{7}{4}\).  
*Find:* the product.  
\[
\left(-\frac{2}{5}\right) \times \frac{7}{4} = \frac{(-2) \cdot 7}{5 \cdot 4} = \frac{-14}{20}.
\]  
*Why:* sign follows integer multiplication rule.  
Reduce by dividing by 2:  
\[
\frac{-14 \div 2}{20 \div 2} = -\frac{7}{10}.
\]  
**\(-\frac{7}{10}\)**  
*Reflection:* reduction after multiplication prevents unnecessary growth of intermediate integers.

**Example 4 — Division yielding an integer**  
*Given:* \(\frac{9}{4} \div \frac{3}{8}\).  
*Find:* the quotient.  
Invert and multiply:  
\[
\frac{9}{4} \times \frac{8}{3} = \frac{9 \cdot 8}{4 \cdot 3} = \frac{72}{12}.
\]  
*Why:* \(\frac{8}{3}\) is the multiplicative inverse of \(\frac{3}{8}\).  
Reduce:  
\[
\frac{72 \div 12}{12 \div 12} = 6.
\]  
**6**  
*Reflection:* a fraction division can produce an integer when the divisor is a factor of the dividend.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Adding numerators and denominators separately | Confuses the fraction with a pair of independent counts | Always produce a single common denominator first     |
| Forgetting to flip the fraction when dividing | Treats division like multiplication         | Explicitly write “multiply by reciprocal” each time  |
| Cancelling across an addition sign | Mistakenly applies the multiplication cancellation rule | Cancel only factors that multiply the entire numerator or denominator |
| Using different signs inconsistently | Loses track of which fraction is negative   | Move all signs to numerators before operating        |
| Reducing before finding a common denominator | Destroys the necessary common unit          | Reduce only after the operation is complete          |
| Treating zero denominator as valid | Forgets the definition of a fraction        | State \(b \neq 0\) at every formal step              |
| Cross-multiplying for addition instead of multiplication | Confuses the two algorithms                 | Reserve cross-multiplication exclusively for equality checks or division |

## 7. The textbook-precise statement
Let \(\mathbb{Q}\) be the field of rational numbers. For \(a,b,c,d \in \mathbb{Z}\) with \(b \neq 0\), \(d \neq 0\),

\[
\frac{a}{b} + \frac{c}{d} := \frac{ad + bc}{bd}, \qquad
\frac{a}{b} - \frac{c}{d} := \frac{ad - bc}{bd}, \qquad
\frac{a}{b} \cdot \frac{c}{d} := \frac{ac}{bd}, \qquad
\frac{a}{b} \div \frac{c}{d} := \frac{ad}{bc}.
\]

These definitions are independent of representatives: if \(\frac{a}{b} = \frac{a'}{b'}\) and \(\frac{c}{d} = \frac{c'}{d'}\), the results coincide. (See Hungerford, *Abstract Algebra*, 3e, §IV.1.)

## 8. Visual — diagram or schematic
```text
          1
   +-------------+
   |      |      |
   |  1/2 | 1/2  |   <-- two halves
   +-------------+
   
   +-------------+
   |  1/3 |1/3|1/3|   <-- three thirds
   +-------------+
   
   Common scale (sixths):
   +---------------------------+
   |1/6|1/6|1/6|1/6|1/6|1/6|   <-- six equal parts
   +---------------------------+
   3/6          +     2/6   = 5/6
```
The diagram shows why a common denominator converts each fraction into a count of identical slices before addition.

## 9. The memory technique
1. **The hook** — Picture a pizza cut into \(b\) slices; the numerator tells how many slices you hold. Changing the denominator is “re-cutting the same pizza” so slices match before you add or subtract.
2. **What to overlearn** — The four operation formulas in Step 6 and the rule that \(\frac{a}{b} = \frac{ak}{bk}\) for any nonzero \(k\).
3. **Spaced-repetition schedule** — Review the four formulas at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Return to the definition \(\frac{a}{b} = a \cdot b^{-1}\) and re-derive each operation from the field axioms of multiplication and addition.

## 10. What this unlocks
Mastery of fraction arithmetic supplies the exact algebraic substrate for every later manipulation of rational expressions, ratios in probability, and scaling factors in linear algebra.  
- Solving linear equations with rational coefficients  
- Partial-fraction decomposition in calculus  
- Exact arithmetic inside computer-algebra systems  
- Construction of the real numbers via Dedekind cuts or Cauchy sequences  

## 11. Self-check — five questions, no answers
1. Compute \(\frac{5}{12} + \frac{7}{18}\) and reduce the result.  
2. Show that \(\frac{2}{3} - \frac{5}{6} = -\frac{1}{6}\) using only the definition of subtraction.  
3. Evaluate \(\frac{-3}{8} \div \left(-\frac{9}{4}\right)\) and simplify.  
4. Without calculating numerical values, decide whether \(\frac{13}{17} + \frac{5}{19}\) is greater than 1; justify using only fraction properties.  
5. A student claims that \(\frac{a}{b} + \frac{c}{d} = \frac{a+c}{b+d}\). Construct a concrete counter-example with small positive integers and explain the conceptual error.