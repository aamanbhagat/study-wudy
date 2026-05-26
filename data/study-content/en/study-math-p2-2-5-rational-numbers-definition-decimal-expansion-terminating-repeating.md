## 1. The one-sentence answer
**A rational number is any real number expressible as the ratio of two integers with nonzero denominator, and every such number possesses a decimal expansion that terminates or eventually repeats.**

Any real number obtained by dividing one integer by another is rational. The division algorithm applied to the numerator and denominator produces a sequence of remainders; because only finitely many possible remainders exist, the sequence of digits must eventually cycle or reach remainder zero. This forces the decimal representation to be either finite (terminating) or periodic after some point.

The same remainder argument shows that every terminating or repeating decimal arises from a ratio of integers. Thus the two descriptions—fraction form and decimal form—characterize exactly the same set of numbers.

> [!NOTE]
> The decisive insight is that finite remainders force repetition or termination; irrational numbers escape this trap because their remainders never repeat.

## 2. Why this matters — concrete and current
In semiconductor design, floating-point units in every modern CPU rely on the fact that rational approximations to constants such as \(\sqrt{2}\) must be truncated; IEEE-754 rounding rules are built directly on the terminating/repeating dichotomy to guarantee reproducible results across chips from Intel, AMD, and Arm.

GPS receivers compute pseudoranges as rational multiples of the speed of light; the receiver’s internal arithmetic converts these fractions into decimal expansions whose repeating tails determine the exact number of bits needed for meter-level accuracy in real-time positioning.

High-frequency trading engines at firms such as Jane Street and Citadel represent prices and quantities as exact rationals (e.g., 137/8 cents) rather than floats; the terminating-decimal test decides whether a quoted price can be stored without rounding error before an order is sent.

In quantum chemistry packages such as Gaussian and ORCA, molecular orbital coefficients are stored as rationals during intermediate symbolic steps; the repeating-decimal test identifies when a coefficient can be replaced by a short decimal without introducing algebraic dependence errors in subsequent energy calculations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Integers and divisibility | Rationals are defined as quotients of integers            |
| Division algorithm       | Remainders determine the decimal digits                   |
| Prime factorization      | Termination depends on the prime factors of the denominator after reduction |

## 4. Building the idea — from intuition to formalism

### Step 1 — Ratios of integers
Any number obtained by dividing one whole number by another whole number (nonzero) is called rational.  
Example: \(3/4 = 0.75\).  
Formally,  
\[
\mathbb{Q} = \left\{ \frac{p}{q} \;\middle|\; p,q\in\mathbb{Z},\ q\neq 0 \right\}.
\]
> [!WARNING]
> Treating zero denominator as allowed produces undefined expressions.

### Step 2 — Long division generates digits
Perform ordinary long division of \(p\) by \(q\); each step yields a digit and a remainder strictly smaller than \(q\).  
Example: dividing 1 by 4 yields digits 2 then 5 with remainder 0.  
Formally, at stage \(k\) we have  
\[
10^k \cdot r_{k-1} = d_k q + r_k,\qquad 0\leq r_k < q.
\]

### Step 3 — Remainders are finite
Only \(q\) possible remainders exist, so after at most \(q\) steps a remainder must repeat.  
Example: 1 divided by 6 produces remainders 4, then 4 again.  
Formally, if \(r_i = r_j\) for \(i<j\) then the digit sequence repeats with period \(j-i\).

### Step 4 — Termination versus repetition
If a remainder becomes zero the expansion stops (terminates). Otherwise the first repeated remainder forces an infinite repeating block.  
Example: 1/2 terminates; 1/3 repeats.  
Formally, the decimal terminates if and only if some remainder \(r_k=0\).

### Step 5 — Prime-factor criterion
After canceling common factors, the denominator’s prime factors determine termination: only 2 and 5 are allowed.  
Example: 1/6 = 1/(2·3) repeats; 1/20 = 1/(2²·5) terminates.  
Formally, write \(q = 2^a 5^b m\) with \(m\) coprime to 10; the decimal terminates precisely when \(m=1\).

### Step 6 — Textbook characterization
A real number is rational if and only if its decimal expansion terminates or eventually repeats.

## 5. Worked examples — every step shown

**Example 1 — Simple termination**  
*Given:* \( \frac{7}{25} \).  
*Find:* its decimal expansion.  

Divide 7 by 25:  
\( 7 = 0 \cdot 25 + 7 \).  
*Why:* initial remainder 7.  
Multiply remainder by 10: \(70 = 2 \cdot 25 + 20\).  
*Why:* digit 2, new remainder 20.  
\(200 = 8 \cdot 25 + 0\).  
*Why:* digit 8, remainder 0 terminates.  

**0.28**

*Reflection:* Remainder zero appeared quickly; the denominator factored into only 2 and 5.

**Example 2 — Simple repetition**  
*Given:* \( \frac{5}{6} \).  
*Find:* its decimal expansion.  

\(5 = 0\cdot6 +5\).  
*Why:* start.  
\(50 = 8\cdot6 +2\).  
*Why:* digit 8, remainder 2.  
\(20 = 3\cdot6 +2\).  
*Why:* digit 3, remainder repeats 2.  

**0.8̅3**

*Reflection:* Remainder 2 cycled immediately, producing a single repeating digit.

**Example 3 — Mixed terminating then repeating**  
*Given:* \( \frac{1}{6} \).  
*Find:* decimal.  

After first step remainder 4 appears, then repeats, giving 0.1̅6.  

**0.1̅6**

*Reflection:* The non-repeating digit arises from the factor of 2 before the repeating 3 appears.

**Example 4 — Longer period**  
*Given:* \( \frac{1}{7} \).  
*Find:* decimal.  

Long division yields remainders 1,3,2,6,4,5 then back to 1, period 6.  

**0.̅1̅4̅2̅8̅5̅7**

*Reflection:* Six distinct remainders produced the maximum possible period for denominator 7.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to reduce fraction first | Student tests 2/4 instead of 1/2           | Always cancel gcd before checking factors    |
| Confusing “repeating” with “non-terminating” | All repeating decimals are non-terminating, but not conversely | Check for eventual periodicity, not merely infinitude |
| Thinking 0.999… is irrational     | Visual similarity to 1.000…                 | Prove 0.999… = 1 via geometric series        |
| Ignoring negative signs           | Sign does not affect decimal type           | Reduce absolute value, attach sign at end    |
| Misidentifying period start       | Non-repeating prefix confuses counting      | Mark first repeated remainder explicitly     |
| Assuming every decimal is rational | Irrationals exist                           | Verify repeating block before claiming rationality |
| Treating 1/1 as non-rational      | Overlooking integer case                    | Note every integer is rational (q=1)         |

## 7. The textbook-precise statement
A real number \(x\) is rational if and only if there exist integers \(p\) and \(q\neq 0\) such that \(x=p/q\), and every such \(x\) admits a decimal expansion that is eventually periodic (including the terminating case, viewed as repeating zeros). Conversely, every eventually periodic decimal represents a rational number.  
(Niven, Zuckerman, Montgomery, *An Introduction to the Theory of Numbers*, 5th ed., Theorem 1.1.)

## 8. Visual — diagram or schematic
```text
Long division of 1 by 6
   0.1666...
  __________
6 ) 1.00000
    0
    ---
    10
     6   (digit 1)
    ---
     40
     36   (digit 6)
    ---
      4   remainder repeats → cycle begins
```
Label: initial remainder 4 returns, forcing the repeating block “6”.

## 9. The memory technique
**The hook** — Picture a prison cell block numbered 0 to q−1; each remainder is an inmate who, once seen twice, starts the same conversation (digit) again.

**What to overlearn**  
- A fraction in lowest terms terminates ⇔ denominator’s prime factors ⊆ {2,5}.  
- Period length divides φ(q) when q coprime to 10.

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive by running the division algorithm on p and q and counting possible remainders.

## 10. What this unlocks
Mastery of rational decimals supplies the exact language needed for Diophantine approximation, p-adic numbers, and the construction of the real numbers via Cauchy sequences.

- Next: irrationality proofs (√2, π)  
- Next: Farey sequences and mediants  
- Next: continued-fraction expansions  
- Next: modular arithmetic with denominators coprime to 10

## 11. Self-check — five questions, no answers
1. Write 17/80 as a decimal and state whether it terminates.  
2. Prove that 1/13 has period exactly 6.  
3. Is 0.123456789101112… rational? Explain.  
4. Find the smallest denominator q such that 1/q has decimal period 7.  
5. Given two rationals whose decimals terminate after at most m and n places respectively, what is the maximum number of decimal places needed for their sum?