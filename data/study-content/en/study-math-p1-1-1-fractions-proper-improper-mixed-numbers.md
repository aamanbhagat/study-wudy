## 1. The one-sentence answer
**A fraction is a single number that records a division of integers; it is called proper when its absolute value is less than one, improper when its absolute value is at least one, and is written as a mixed number when an improper fraction is expressed as an integer plus a proper fraction.**

Any two integers \(a\) and \(b\) with \(b \neq 0\) determine the fraction \(\frac{a}{b}\). The sign is carried by \(a\), and the size comparison with 1 is performed after taking absolute values. This single definition already contains the three labels.

The distinction matters only for readability and for certain arithmetic algorithms. A proper fraction never reaches or passes the next integer; an improper fraction does; a mixed number makes that passage explicit by separating the integer part.

> [!NOTE]
> The three names describe the same underlying rational number; they are not different objects but different conventional writings of one object.

## 2. Why this matters — concrete and current
In semiconductor mask design, feature sizes are expressed as improper fractions of the wafer radius (for example, \(\frac{17}{8}\) of a 300 mm wafer) so that integer multiples of the reticle field fit without waste; CAD software converts these directly to mixed numbers for human review.

In orbital-mechanics software used by SpaceX, propellant-mass ratios appear as improper fractions such as \(\frac{312}{227}\); converting them to mixed numbers \(\frac{1}{227}\) lets engineers verify at a glance that the vehicle is carrying slightly more than one extra tank.

In high-frequency trading engines, position sizing is stored as proper fractions of available margin to guarantee that no single order exceeds 1; the IEEE 754 floating-point representation is obtained from these fractions by a fixed algorithm that treats the numerator and denominator separately.

In crystallography, atomic coordinates inside a unit cell are reported as proper fractions between 0 and 1; when an atom lies on a boundary the coordinate becomes the improper fraction 1, which is immediately rewritten as the mixed number \(1\frac{0}{1}\) and reduced modulo 1.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Integers         | Numerators and denominators are integers.                 |
| Division of integers | The fraction symbol \(\frac{a}{b}\) is defined as the quotient \(a \div b\). |
| Ordering on the number line | Proper vs. improper is decided by whether the value lies left or right of \(\pm 1\). |

## 4. Building the idea — from intuition to formalism

### Step 1 — Division produces a single number
Any division of two integers yields one rational number.  
Example: \(7 \div 3\) produces the single number written \(\frac{7}{3}\).  
\[
\frac{a}{b} := a \div b \quad (b \neq 0).
\]
> [!WARNING]
> Treating numerator and denominator as two separate quantities instead of one quotient leads to errors when comparing size with 1.

### Step 2 — Compare absolute value with 1
A fraction is proper when \(|a| < |b|\) and improper when \(|a| \ge |b|\).  
Example: \(\frac{2}{5}\) satisfies \(2 < 5\), hence proper; \(\frac{8}{5}\) satisfies \(8 > 5\), hence improper.  
\[
\frac{a}{b}\text{ is proper} \iff |a| < |b|, \qquad \frac{a}{b}\text{ is improper} \iff |a| \ge |b|.
\]

### Step 3 — Extract the integer part
Any improper fraction can be written as an integer plus a remainder fraction whose numerator is smaller than the denominator.  
Example: \(\frac{17}{5} = 3 + \frac{2}{5}\).  
\[
\frac{a}{b} = q + \frac{r}{b}, \quad q = \left\lfloor \frac{a}{b} \right\rfloor,\quad 0 \le r < |b|.
\]

### Step 4 — Mixed-number notation
The expression \(q\frac{r}{b}\) is called a mixed number.  
Example: \(3\frac{2}{5}\).  
\[
q\frac{r}{b} \quad\text{means}\quad q + \frac{r}{b}.
\]

### Step 5 — Equivalence of representations
Every rational number therefore possesses three standard writings: proper fraction, improper fraction, and mixed number (when the absolute value is at least 1).  
\[
\frac{17}{5} = \frac{17}{5} = 3\frac{2}{5}.
\]

## 5. Worked examples — every step shown

**Example 1 — Classify a simple fraction**  
*Given:* \(\frac{3}{7}\).  
*Find:* Proper or improper?  
Divide: \(|3| < |7|\).  
Hence the fraction is proper.  
**\(\frac{3}{7}\) is proper.**

*Reflection:* The comparison uses only the absolute values; sign is irrelevant to the label.

**Example 2 — Convert improper fraction to mixed number**  
*Given:* \(\frac{22}{7}\).  
*Find:* Mixed-number form.  
Divide 22 by 7: \(7 \times 3 = 21\), remainder 1.  
\[
\frac{22}{7} = 3 + \frac{1}{7} = 3\frac{1}{7}.
\]
**\(3\frac{1}{7}\).**

*Reflection:* The remainder must be strictly smaller than the denominator; otherwise the integer part is increased.

**Example 3 — Mixed number back to improper fraction**  
*Given:* \(5\frac{3}{4}\).  
*Find:* Improper-fraction form.  
Multiply whole number by denominator: \(5 \times 4 = 20\).  
Add numerator: \(20 + 3 = 23\).  
Place over denominator: \(\frac{23}{4}\).  
**\(\frac{23}{4}\).**

*Reflection:* The operation is exactly the reverse of the division algorithm.

**Example 4 — Negative improper fraction**  
*Given:* \(-\frac{9}{4}\).  
*Find:* Mixed-number form.  
Absolute value: \(\frac{9}{4} = 2 + \frac{1}{4}\).  
Restore sign: \(-2\frac{1}{4}\).  
**\(-2\frac{1}{4}\).**

*Reflection:* The integer part carries the sign; the fractional part remains non-negative.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting that \(\frac{4}{4}\) is improper | Equality with 1 is often overlooked         | Always test \(|a| \ge |b|\) strictly       |
| Writing a negative mixed number as \(-2 + \frac{1}{4}\) | Sign is attached only to the integer        | Keep the fractional part non-negative        |
| Treating mixed numbers as multiplication | Notation \(3\frac{1}{2}\) visually resembles juxtaposition | Read the symbol as “plus”                    |
| Reducing before converting        | Cancellation can hide the integer part      | Convert first, reduce the resulting fraction |
| Comparing signed fractions by numerator alone | Absolute-value rule is forgotten            | Strip signs before comparing magnitudes      |
| Zero denominator                  | Division by zero is undefined               | Verify \(b \neq 0\) at the outset            |
| Remainder equal to denominator    | Off-by-one error in the division algorithm  | Enforce remainder \(< |b|\)                  |

## 7. The textbook-precise statement
A **proper fraction** is a rational number \(\frac{a}{b}\) (in lowest terms, \(b > 0\)) satisfying \(|a| < b\). An **improper fraction** satisfies \(|a| \ge b\). A **mixed number** is an expression \(q + \frac{r}{b}\) where \(q \in \mathbb{Z}\), \(0 \le r < b\), and \(b > 0\). These three writings name the same element of \(\mathbb{Q}\). (See: Lang, *Basic Mathematics*, 1988, Chapter I, §3.)

## 8. Visual — diagram or schematic
```text
Number line (unit interval enlarged)
          -2   -1    0     1     2
-----------|-----|-----|-----|-----|-----------
          -9/4       -3/5   2/3   7/4   5/2
proper          proper      proper improper improper
          mixed: -2 1/4           mixed: 1 3/4  2 1/2
```
The vertical ticks mark integers. Fractions left of \(-1\) or right of \(+1\) are improper; those between \(-1\) and \(+1\) are proper.

## 9. The memory technique

**The hook**  
Picture a fence exactly one metre high. Any fraction shorter than the fence is “proper”; any fraction that reaches or clears the fence is “improper.” A mixed number is the sight of one whole fence panel plus the remaining proper piece.

**What to overlearn**  
- Test: \(|a| < |b|\) decides proper vs. improper.  
- Conversion: \(q = \lfloor a/b \rfloor\), \(r = a - q b\).  
- Mixed-number sign rule: fractional part always non-negative.

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive by performing the division algorithm on numerator and denominator; the quotient is the integer part and the remainder supplies the proper fractional part.

## 10. What this unlocks
Mastery of these three writings is presupposed by every subsequent arithmetic operation on rationals and by the construction of the real numbers.  

- Addition and subtraction of fractions with unlike denominators  
- Conversion between fractions and terminating or repeating decimals  
- Ordering and comparison of rational numbers  
- Field axioms for \(\mathbb{Q}\)  
- Rational expressions in algebra and the concept of rational functions

## 11. Self-check — five questions, no answers
1. Is \(\frac{0}{5}\) proper or improper?  
2. Write \(\frac{100}{17}\) as a mixed number and verify by converting back.  
3. Express \(-3\frac{2}{9}\) as an improper fraction; confirm the absolute value test.  
4. A cake recipe calls for \(\frac{7}{4}\) cups of flour. Rewrite the quantity as a mixed number and explain why a cook might prefer that form.  
5. Suppose \(\frac{p}{q}\) is improper and \(\frac{r}{q}\) is proper; must \(\frac{p+r}{q}\) be improper? Construct a counter-example or prove it must be.