## 1. The one-sentence answer
**The three laws of logarithms convert multiplication, division and exponentiation into addition, subtraction and scalar multiplication so that complicated expressions collapse into simpler ones.**

These laws follow directly from the definition of the logarithm as the inverse of an exponential function. If you accept that every positive number can be written as \(b^y\) for some real \(y\), then the algebraic behaviour of exponents immediately transfers to logarithms. The proofs therefore require nothing more than careful substitution and the uniqueness of the exponent.

The product rule turns a product of arguments into a sum of logs; the quotient rule turns a ratio into a difference; the power rule pulls the exponent outside as a multiplier. Once these three identities are established, almost every algebraic manipulation involving logs becomes mechanical.

> [!NOTE]
> The single deepest insight is that logarithms exist precisely to turn the multiplicative structure of the positive reals into the additive structure of the reals; every proof is just transporting the three exponent rules across this isomorphism.

## 2. Why this matters — concrete and current
In semiconductor yield modelling, Intel and TSMC use the product rule inside log-likelihood functions when they combine independent defect probabilities across billions of transistors; the sum-of-logs form lets gradient descent run in linear time instead of requiring expensive product evaluations.

NASA’s Deep Space Network converts received signal power ratios into decibels with the quotient rule before feeding the data into Kalman filters; the subtraction form prevents floating-point overflow when the dynamic range exceeds 120 dB.

In transformer-based language models, the power rule appears inside the log-probability calculation of token sequences: \(\log p(x_1\dots x_n)=\sum\log p(x_i)\) is actually the power rule applied to each conditional probability raised to the first power, allowing the entire sequence log-likelihood to be computed with a single pass of additions.

Radio astronomers at the Event Horizon Telescope project apply the same three rules when they calibrate visibility amplitudes across multiple frequency bands; without the log identities the \(\chi^2\) minimisation would be numerically unstable for the terabyte-scale datasets.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definition \(y=\log_b x \iff b^y=x\) | Supplies the substitution that converts every log identity back into an exponential identity |
| Exponent rules \(b^{m+n}=b^m\cdot b^n\), \(b^{m-n}=b^m/b^n\), \((b^m)^n=b^{mn}\) | These are the only algebraic facts the proofs rely on |
| Domain restriction \(x>0\), \(b>0\), \(b\neq1\) | Guarantees that every logarithm and every exponential is well-defined and unique |

If any of the three rows above feels shaky, pause and review that single concept before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the definition
Any positive number \(x\) can be written uniquely as \(x=b^{\log_b x}\). This single sentence is the entire foundation; everything else is substitution.

Example: let \(x=8\), \(b=2\). Then \(8=2^{\log_2 8}\) becomes \(8=2^3\), which is true by inspection.

Formal statement:  
\[
x=b^{\log_b x}\qquad\text{for all }x>0.
\]

> [!WARNING]
> Forgetting that the base must stay fixed throughout the proof is the fastest way to produce nonsense identities.

### Step 2 — Write the product as a single exponential
Let \(a=b^u\) and \(c=b^v\). Their product is \(ac=b^{u+v}\). Taking \(\log_b\) of both sides immediately gives the product rule.

Formal statement after taking log:  
\[
\log_b(ac)=u+v=\log_b a+\log_b c.
\]

### Step 3 — Handle the quotient by writing it as a negative exponent
Replace the product step with \(a/c=b^u\cdot b^{-v}=b^{u-v}\). The same logarithm step yields the quotient rule.

### Step 4 — Extract a power by grouping repeated multiplication
\(a^k=(b^u)^k=b^{uk}\). Taking the log produces the power rule in one line.

### Step 5 — State the three rules together
Combining the previous three steps produces the complete set that every textbook lists.

### Step 6 — Verify domain and uniqueness
Because the exponential function \(b^y\) is one-to-one for fixed \(b>0\), \(b\neq1\), the exponent on the right-hand side is unique; therefore each log identity holds for exactly one real number on the right-hand side.

## 5. Worked examples — har step show karo

**Example 1 — Product of two numbers**  
*Given:* \(\log_3 4+\log_3 9\).  
*Find:* a single logarithm.  

Start with the sum:  
\[
\log_3 4+\log_3 9=\log_3(4\cdot9)
\]  
*Why:* product rule applied in reverse.  
\[
=\log_3 36
\]  
**Final answer** \(\log_3 36\).

*Reflection:* The example is trivial yet forces the student to recognise that the rule works in both directions.

**Example 2 — Quotient inside a power**  
*Given:* \(\log 8-\log 2+2\log 3\).  
*Find:* single log expression (base 10).  

Combine the first two terms:  
\[
\log 8-\log 2=\log(8/2)=\log 4
\]  
*Why:* quotient rule.  
Add the power term:  
\[
\log 4+2\log 3=\log 4+\log(3^2)=\log(4\cdot9)=\log 36
\]  
*Why:* power rule followed by product rule.  
**Final answer** \(\log 36\).

*Reflection:* Two different rules appear in one line; the order of application must be chosen deliberately.

**Example 3 — Nested logs**  
*Given:* \(\log_b(\sqrt{x}\cdot y^3/z)\).  
*Find:* expanded form without radicals or fractions inside the log.  

Rewrite the argument:  
\[
\sqrt{x}\cdot y^3/z=x^{1/2}\cdot y^3\cdot z^{-1}
\]  
Apply power rule to each factor:  
\[
\log_b(x^{1/2}\cdot y^3\cdot z^{-1})=\frac12\log_b x+3\log_b y-\log_b z
\]  
*Why:* power rule distributes over every exponent, including negative and fractional ones.  
**Final answer** \(\frac12\log_b x+3\log_b y-\log_b z\).

*Reflection:* The example shows why students must treat roots as fractional exponents from the very first step.

**Example 4 — Change-of-base disguised as proof**  
*Given:* Prove \(\log_b a=\frac{\ln a}{\ln b}\).  
*Find:* the identity using only the three laws.  

Write \(a=b^{\log_b a}\). Take natural log of both sides:  
\[
\ln a=\ln(b^{\log_b a})=(\log_b a)\cdot\ln b
\]  
*Why:* power rule with base \(e\).  
Solve for the unknown:  
\[
\log_b a=\frac{\ln a}{\ln b}
\]  
**Final answer** \(\log_b a=\frac{\ln a}{\ln b}\).

*Reflection:* The change-of-base formula is not an extra rule; it is the power rule applied once.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Writing \(\log(a+b)=\log a+\log b\) | Confusing addition with multiplication      | Always check whether the argument is a product      |
| Dropping the base when moving terms | Assuming base 10 is universal               | Keep the base visible until the final answer         |
| Applying power rule to sums       | Treating \(\log(x+y)\) as \(\log x+\log y\) | Remember power rule only acts on a single argument raised to a power |
| Negative arguments                | Forgetting domain \(x>0\)                   | Insert a quick domain check before every manipulation |
| Reversing quotient rule sign      | Mixing \(\log(a/b)\) with \(\log(b/a)\)     | Write the rule as \(\log a-\log b\) every single time |
| Forgetting that \(\log 1=0\)      | Treating 1 as a neutral element like 0      | Memorise \(\log_b 1=0\) as the additive identity     |
| Using log laws on non-logs        | Applying identities to plain exponents      | Verify that every term actually contains a logarithm |

## 7. The textbook-precise statement
Let \(b>0\), \(b\neq1\), and let \(a,c>0\). Then  
\[
\log_b(ac)=\log_b a+\log_b c,\qquad\log_b(a/c)=\log_b a-\log_b c,\qquad\log_b(a^k)=k\log_b a
\]  
for every real number \(k\). These identities appear as Theorem 5 in Sullivan, *Precalculus*, 11th ed., §5.4.

## 8. Visual — diagram or schematic
```
log_b (a * c)          log_b a + log_b c
      |                       |
   b^y = a*c               y = u + v
      |                       |
   b^u * b^v  ------------>  b^(u+v)
      |                       |
      a          c            u          v
```
The diagram shows the single exponent \(y\) splitting into the sum \(u+v\) exactly when the arguments multiply.

## 9. The memory technique
1. **The hook** — Picture a busy market where every time two people multiply prices they shout “add the logs!”; the addition sign appears like a plus-shaped stall between the two log tables.
2. **What to overlearn** — The three identities written with identical bases on every term; also \(\log_b 1=0\) and \(\log_b b=1\).
3. **Spaced-repetition schedule** — Review the three rules after 1 day, 3 days, 7 days, 16 days and 35 days; each session must include at least one fresh proof from definition.
4. **First-principles fallback** — If the formula disappears, write \(a=b^u\), \(c=b^v\) again and repeat Steps 2–4 above; the derivation is only four lines.

## 10. What this unlocks
These three rules are the gateway to differentiation and integration of logarithmic and exponential functions, to solving exponential equations in closed form, and to the entire machinery of information theory (entropy is a sum of logs).  
- Derivative of \(\ln x\) follows in one line from the limit definition plus the quotient rule.  
- Change-of-base formula used in every computational library is the power rule in disguise.  
- pH, decibel and Richter scales are direct quotient-rule applications.  
- Maximum-likelihood estimation in statistics reduces to sums of logs precisely because of the product rule.

## 11. Self-check — five questions, no answers
1. Simplify \(\log_2 12-\log_2 3+\log_2 5\) to a single logarithm and state the base.  
2. Prove \(\log_b(b^x)=x\) using only the power rule.  
3. Find the exact value of \(\log_3 81-\log_9 81\) without a calculator.  
4. A student writes \(\log(x^2+y^2)=2\log x+2\log y\); identify the precise algebraic mistake.  
5. Using only the three laws and \(\log_{10}2\approx0.3010\), compute \(\log_{10}8+\log_{10}125\) to four decimal places.