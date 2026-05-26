## 1. The one-sentence answer

**Equivalent fractions represent identical quantities using different numerators and denominators; simplifying a fraction means rewriting it in lowest terms by removing all common factors greater than 1.**

A fraction \( \frac{a}{b} \) records a division of a whole into \( b \) equal parts and the selection of \( a \) of them. Two such fractions are equivalent when the underlying quantity is the same, which occurs precisely when one numerator–denominator pair is obtained from the other by multiplying (or dividing) both numbers by the identical positive integer. Because multiplication by 1 leaves any number unchanged, the value of the fraction is preserved under this scaling.

Simplifying reverses the process: any common divisor of numerator and denominator is factored out until the only remaining positive common divisor is 1. The resulting fraction is called *reduced* or *in lowest terms*.

> [!NOTE]
> The single deepest insight is that equivalence is not about the symbols looking alike but about the ratio being identical; once you see a fraction as a ratio rather than two separate numbers, every later manipulation follows automatically.

## 2. Why this matters — concrete and current

In semiconductor mask design at TSMC, layer alignments are expressed as rational multiples of the wafer diameter; two masks are declared compatible only after their alignment fractions are confirmed equivalent in lowest terms, preventing sub-nanometer overlay errors.

In the training pipelines of large language models at OpenAI, dataset splits are allocated by fractions such as \( \frac{8}{10} \) for training and \( \frac{1}{10} \) for validation; these ratios are reduced and cross-checked for exact equivalence across distributed GPU clusters so that every node processes mathematically identical proportions.

NASA’s Artemis lunar lander guidance software stores propellant-mixture ratios as reduced fractions; any unreduced representation risks floating-point drift during real-time thrust calculations, so equivalence checks are performed at every trajectory update.

In high-frequency trading engines at Jane Street, position-sizing rules are encoded as fractions of total capital; equivalence verification ensures that risk limits remain identical after internal rebalancing across multiple accounts.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Positive integers and their factors | Every fraction is built from integers; common factors must be identified. |
| Multiplication of integers | Scaling both numerator and denominator uses multiplication. |
| Division of integers     | Removing common factors requires exact division.          |
| The number 1             | Multiplying or dividing by 1 leaves value unchanged.      |

## 4. Building the idea — from intuition to formalism

### Step 1 — A fraction records a ratio
A fraction \( \frac{a}{b} \) with \( b \neq 0 \) denotes the quantity obtained by dividing \( a \) by \( b \).  
Concrete example: \( \frac{2}{4} \) means “2 divided by 4,” which equals 0.5.  
Formal statement:  
\[ \frac{a}{b} = a \div b \]  
> [!WARNING] Treating numerator and denominator as independent counts instead of a single ratio leads to incorrect comparisons later.

### Step 2 — Scaling both parts by the same integer
If both numerator and denominator are multiplied by the same positive integer \( k \), the ratio remains unchanged because multiplication by \( k/k = 1 \) has occurred.  
Concrete example: \( \frac{2}{4} \times \frac{2}{2} = \frac{4}{8} \). Both equal 0.5.  
Formal statement:  
\[ \frac{a}{b} = \frac{a \cdot k}{b \cdot k} \quad (k > 0) \]  
> [!WARNING] Multiplying only one part changes the value; the operation must be applied to both.

### Step 3 — Definition of equivalence
Two fractions \( \frac{a}{b} \) and \( \frac{c}{d} \) are equivalent when there exists a positive integer \( k \) such that \( c = a \cdot k \) and \( d = b \cdot k \).  
Concrete example: \( \frac{3}{6} = \frac{1}{2} \) because \( k = 3 \).  
Formal statement:  
\[ \frac{a}{b} = \frac{c}{d} \iff ad = bc \] (cross-multiplication test).  
> [!WARNING] Visual similarity of digits is irrelevant; only the cross-product equality matters.

### Step 4 — Removing a common factor
If a positive integer \( m > 1 \) divides both \( a \) and \( b \), then  
\[ \frac{a}{b} = \frac{a/m}{b/m}. \]  
Concrete example: \( \frac{6}{9} = \frac{2}{3} \) by dividing by \( m = 3 \).  
Formal statement:  
\[ \frac{a}{b} = \frac{a \div m}{b \div m} \quad (m \mid a \text{ and } m \mid b). \]  
> [!WARNING] Dividing only the numerator or only the denominator produces an inequivalent fraction.

### Step 5 — Lowest terms via the greatest common divisor
A fraction is in lowest terms when the greatest common divisor of numerator and denominator equals 1.  
Concrete example: \( \gcd(12,18) = 6 \), so \( \frac{12}{18} = \frac{2}{3} \).  
Formal statement:  
\[ \frac{a}{b} \text{ is reduced} \iff \gcd(a,b) = 1. \]  
> [!WARNING] Stopping after removing only some factors leaves a non-reduced but still correct fraction; full reduction requires the GCD.

### Step 6 — The canonical reduction procedure
To simplify \( \frac{a}{b} \), compute \( d = \gcd(a,b) \) and replace the fraction by \( \frac{a/d}{b/d} \). This is the unique reduced form with positive denominator.  
Formal statement (textbook version appears in §7).

## 5. Worked examples — every step shown

**Example 1 — Simple halving**  
*Given:* \( \frac{4}{8} \)  
*Find:* its reduced form.  

Divide numerator and denominator by 4:  
\[ 4 \div 4 = 1 \]  
*Why:* 4 is a common divisor.  
\[ 8 \div 4 = 2 \]  
*Why:* same divisor applied to denominator.  
**\( \frac{1}{2} \)**  

*Reflection:* The example is easy because the GCD is obvious; the same logic scales to any pair.

**Example 2 — Larger common factor**  
*Given:* \( \frac{18}{24} \)  
*Find:* reduced form.  

\[ \gcd(18,24) = 6 \]  
*Why:* list factors or use Euclidean algorithm.  
\[ 18 \div 6 = 3, \quad 24 \div 6 = 4 \]  
*Why:* both divided by full GCD.  
**\( \frac{3}{4} \)**  

*Reflection:* Using the GCD in one step avoids repeated partial cancellations.

**Example 3 — Already reduced**  
*Given:* \( \frac{7}{13} \)  
*Find:* reduced form.  

\[ \gcd(7,13) = 1 \]  
*Why:* 7 is prime and does not divide 13.  
No change needed.  
**\( \frac{7}{13} \)**  

*Reflection:* Checking the GCD first prevents unnecessary work.

**Example 4 — Three-digit numbers**  
*Given:* \( \frac{210}{462} \)  
*Find:* reduced form.  

Euclidean algorithm:  
\[ 462 = 2 \cdot 210 + 42 \]  
\[ 210 = 5 \cdot 42 + 0 \]  
*Why:* last non-zero remainder is the GCD = 42.  
\[ 210 \div 42 = 5, \quad 462 \div 42 = 11 \]  
*Why:* divide by full GCD.  
**\( \frac{5}{11} \)**  

*Reflection:* The algorithm guarantees the greatest divisor even when numbers are large.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Canceling digits instead of factors | Confusing notation with arithmetic         | Always divide by an actual common divisor, never by matching digits. |
| Forgetting to divide the denominator | Focusing only on the numerator              | Write both numbers and cross out the same factor from each. |
| Stopping at a partial reduction | Missing that multiple common factors may exist | Compute the full GCD before dividing.        |
| Treating 0 in denominator as valid | Overlooking the definition of a fraction    | Verify denominator ≠ 0 before any operation. |
| Assuming negative signs cancel freely | Sign rules feel symmetric but are not       | Reduce absolute values first, then place sign in numerator. |
| Using cross-multiplication with zero | Edge case where one fraction is zero        | Handle zero separately: only \( \frac{0}{b} \) (b≠0) equals zero. |
| Reducing when already lowest terms | Unnecessary work from not checking GCD     | Always compute GCD; if it equals 1, stop.    |

## 7. The textbook-precise statement

A fraction \( \frac{a}{b} \) with \( a,b \in \mathbb{Z} \), \( b > 0 \), \( \gcd(a,b) = d \) is *equivalent* to \( \frac{c}{e} \) if and only if \( ae = bc \). The fraction is in *lowest terms* when \( d = 1 \). The unique reduced representative is obtained by  
\[ \frac{a}{b} = \frac{a/d}{b/d}. \]  
(See Niven, Zuckerman, Montgomery, *An Introduction to the Theory of Numbers*, 5e, §1.1.)

## 8. Visual — diagram or schematic

```text
Number line segment from 0 to 1:

0 ---------------- 1/2 ---------------- 1
          |               |
         2/4             3/6
          |               |
         4/8             5/10
All vertical ticks coincide at the same physical point,
showing that 1/2 = 2/4 = 3/6 = 4/8 = 5/10.
```

## 9. The memory technique

**The hook**  
Picture a pizza cut into 2 slices with one taken, then the same pizza cut into 4 slices with two taken; the missing portion is visually identical.

**What to overlearn**  
1. \( \frac{a}{b} = \frac{ak}{bk} \) for any positive integer \( k \).  
2. A fraction is reduced exactly when \( \gcd(a,b) = 1 \).  
3. Cross-multiplication test: \( ad = bc \).

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive equivalence by writing both fractions with a common denominator \( bd \):  
\[ \frac{a}{b} = \frac{ad}{bd}, \quad \frac{c}{d} = \frac{bc}{bd}; \]  
equality holds precisely when the new numerators match.

## 10. What this unlocks

Mastery of equivalence and reduction supplies the mechanical foundation for every subsequent arithmetic operation on rational numbers.

- Adding and subtracting fractions (requires common denominators obtained via equivalent forms).  
- Multiplying and dividing fractions (cancellation of common factors after reduction).  
- Solving linear equations containing rational coefficients.  
- Working with ratios, proportions, and percentages.  
- Converting between fractions, decimals, and percentages without loss of precision.

## 11. Self-check — five questions, no answers

1. Show that \( \frac{15}{25} \) and \( \frac{9}{15} \) are equivalent by two different methods.  
2. Reduce \( \frac{84}{210} \) to lowest terms and prove no further reduction is possible.  
3. If \( \frac{7}{k} = \frac{21}{39} \), find the positive integer \( k \) without using decimal approximations.  
4. Explain why \( \frac{0}{5} \) is already in lowest terms while \( \frac{0}{0} \) is undefined.  
5. A student claims \( \frac{16}{24} = \frac{2}{3} \) by “canceling the 8’s.” Identify the error and give the correct reasoning.