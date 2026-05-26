## 1. The one-sentence answer
**A rational number is any number that can be written as the ratio of two integers p and q where q ≠ 0, and its decimal expansion is always either terminating or eventually repeating.**

Iska matlab yeh hai ki jab aap kisi number ko fraction ke form mein likh sakte ho with integer numerator and denominator, toh woh rational hai. Decimal mein convert karne par woh ya toh finite digits ke baad khatam ho jaata hai (terminating) ya phir ek fixed pattern mein repeat hone lagta hai (repeating). Yeh property sirf rationals ki hai; irrationals jaise √2 ya π kabhi bhi repeat nahi karte.

Aap soch sakte ho ki har rational number ek clean, predictable decimal deta hai kyunki woh integers ke beech ek exact division result hai. Iske ulat, agar decimal terminating ya repeating nahi hai toh number rational nahi ho sakta.

> [!NOTE]
> The single deepest insight is that the repeating or terminating behaviour is completely determined by the prime factors of the denominator after simplifying the fraction; only 2 and 5 produce terminating decimals, everything else forces a cycle.

## 2. Why this matters — concrete and current
In IEEE 754 floating-point hardware used by every modern CPU, rational numbers with denominators that are powers of 2 are stored exactly; all other rationals suffer rounding error, which is why financial software such as Bloomberg Terminal still uses decimal arithmetic libraries instead of binary floats.

SpaceX’s flight software converts sensor readings into rational fractions before feeding them to the Kalman filter so that the on-board computer can guarantee exact repeatability across reboots; any non-repeating decimal would introduce accumulating drift over thousands of orbital manoeuvres.

In semiconductor mask design at TSMC, the placement grid is defined in rational multiples of the base wavelength; repeating decimal expansions allow the layout engine to detect periodic aliasing patterns before fabrication, saving millions in re-spin costs.

Machine-learning frameworks such as PyTorch store learning-rate schedules as rational numbers so that the same schedule can be reproduced bit-for-bit on different GPUs; the repeating property guarantees that the schedule eventually cycles cleanly for long training runs.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Integers and divisibility | Rational numbers are built directly from integer pairs; you must know when one integer divides another. |
| Prime factorisation      | The terminating/repeating test depends only on the primes 2 and 5 in the denominator after cancellation. |
| Long division algorithm  | Decimal expansion is literally the long-division process; understanding remainders explains the repeating cycle. |

If any of these three are shaky, pause and review them first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the ratio definition
A rational number is any number you can obtain by dividing one integer by another non-zero integer.  
Example: 3/4, –7/2, 22/7.  
Formal statement:  
$$ \mathbb{Q} = \left\{ \frac{p}{q} \;\middle|\; p,q \in \mathbb{Z},\ q \neq 0 \right\}. $$  
> [!WARNING]  
> Forgetting to exclude q = 0 produces undefined expressions; every later decimal argument collapses.

### Step 2 — Reduce to lowest terms
Any fraction can be rewritten so that numerator and denominator share no common factors greater than 1.  
Example: 12/18 becomes 2/3.  
Formal statement: there exist coprime p, q with q > 0 such that the original number equals p/q.  
> [!WARNING]  
> Skipping reduction hides the true prime factors that decide terminating versus repeating behaviour.

### Step 3 — Perform long division and track remainders
Divide p by q; each step produces a digit and a remainder strictly between 0 and q–1.  
Example: 1 ÷ 6 gives remainder sequence 4, 4, 4… after the first step.  
Formal statement: the decimal digit at step k is floor(10·r_{k–1}/q) where r_k = 10·r_{k–1} mod q.  
> [!WARNING]  
> If you treat remainders as unbounded you will never detect the cycle.

### Step 4 — Pigeonhole forces repetition
There are only q possible remainders. After at most q+1 steps a remainder must repeat.  
Formal statement: if r_i = r_j for i < j then the decimal repeats with period j–i.  
> [!WARNING]  
> Ignoring this finite-state argument leads students to believe some rationals have non-repeating decimals.

### Step 5 — Characterise terminating decimals
The decimal terminates if and only if the denominator’s prime factors (after reduction) are only 2 and/or 5.  
Formal statement: q = 2^a 5^b m with m = 1.  
> [!WARNING]  
> Forgetting to cancel common factors before checking primes produces false “non-terminating” answers.

### Step 6 — Write the canonical form
Every rational therefore possesses a unique decimal that is either finite (pad with zeros) or eventually periodic.  
Formal statement: the decimal expansion of p/q is eventually periodic with period equal to the multiplicative order of 10 modulo the part of q coprime to 10.

## 5. Worked examples — har step show karo

**Example 1 — Simple terminating case**  
*Given:* 7/8  
*Find:* decimal expansion  
7 ÷ 8 = 0.875 exactly (remainder 0 after three steps).  
*Why:* 8 = 2^3, only prime 2, so terminates.  
**0.875**

*Reflection:* The example is easy because the denominator is already a power of 2; the same logic scales to any 2^a 5^b.

**Example 2 — Repeating single digit**  
*Given:* 1/6  
*Find:* decimal expansion  
Long division: 1.00000… yields remainders 4, 4, 4…  
Digits: 1, then 6 repeating.  
*Why:* remainder 4 repeats immediately, forcing period 1.  
**0.1̅6**

*Reflection:* Students often write 0.1666… but forget the “1” before the bar; the bar must start exactly where the cycle begins.

**Example 3 — Mixed terminating and repeating**  
*Given:* 1/6 after multiplying by 10 (i.e., 10/6)  
*Find:* expansion of 5/3  
5 ÷ 3: remainder sequence 2, 2, 2…  
**1.̅6**

*Reflection:* Multiplying numerator and denominator by 2 or 5 can turn a repeating fraction into a terminating one only when the extra factors cancel the 3.

**Example 4 — Period detection with pigeonhole**  
*Given:* 1/7  
*Find:* decimal and period length  
Remainders: 1, 3, 2, 6, 4, 5, then back to 1.  
Six distinct remainders before repeat → period 6.  
**0.̅142857**

*Reflection:* 7–1 = 6 is the maximum possible period; this is the longest cycle for any one-digit denominator.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Checking prime factors before cancelling | Students factor the original denominator only      | Always reduce p/q to lowest terms first              |
| Placing the repeating bar too early | Confusing the first non-zero digit with cycle start | Mark the bar only after the decimal point where remainder first repeats |
| Claiming √2 = 1.4142… is rational | Seeing digits that look repeating at first glance  | Apply the factor test: denominator after any finite prefix still has prime 2 or 5 only? No → irrational |
| Forgetting negative signs         | Treating –3/4 as positive only                      | Keep sign with the integer p; decimal rules unchanged |
| Writing 0.999… ≠ 1                | Believing terminating and repeating forms are distinct | Prove 1 = 0.̅9 by the same remainder argument       |
| Assuming all repeating decimals have period 1 | Over-generalising from 1/3, 1/6 examples            | Count distinct remainders before repetition          |
| Dividing by zero in definition    | Writing q = 0 when simplifying                      | State q ≠ 0 explicitly at every definition step      |

## 7. The textbook-precise statement
A rational number is an element of the field of fractions of the integers: any equivalence class of pairs (p, q) with q ≠ 0 under the relation (p, q) ∼ (r, s) iff ps = qr. Every such number admits a unique decimal expansion that is eventually periodic. More precisely, after a possible non-repeating prefix whose length is the maximum of the exponents of 2 and 5 in the reduced denominator, the remaining digits repeat with period equal to the multiplicative order of 10 modulo the largest divisor of the denominator that is coprime to 10. (Niven, Zuckerman & Montgomery, *An Introduction to the Theory of Numbers*, 5th ed., §1.3.)

## 8. Visual — diagram or schematic
```
Long division of 1 ÷ 7
   0.142857142857...
7 )1.000000000000
    7
    30
    28
     20
     14
      60
      56
       40
       35
        50
        49
         1   ← remainder returns to start
```
Remainders cycle through {1,3,2,6,4,5}.

## 9. The memory technique

1. **The hook** — Picture a clock whose only two “safe” hours are 2 and 5; any denominator that lands only on those hours terminates, otherwise the minute hand starts looping.
2. **What to overlearn** — After reduction, denominator’s prime factors are subset of {2,5} ⇒ terminating; otherwise period = order of 10 modulo that coprime part.
3. **Spaced-repetition schedule** — Review the factor test after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If you forget the test, run long division on the reduced fraction and watch whether remainders hit zero or cycle; the cycle length is the first repeated remainder distance.

## 10. What this unlocks
Mastering rational decimal behaviour lets you move directly into modular arithmetic, continued fractions, and Diophantine approximation without hidden rounding surprises.

- Farey sequences and mediants
- Decimal-to-fraction conversion algorithms used in computer algebra systems
- p-adic valuations that generalise the 2-and-5 test
- Irrationality proofs that rely on assuming a repeating decimal

## 11. Self-check — five questions, no answers
1. Write 17/80 as a decimal and state whether it terminates or repeats; justify using prime factors.
2. Find the exact period of the decimal expansion of 1/13 without performing the full division.
3. Prove that 0.̅9 equals 1 using only the definition of rational numbers and remainder repetition.
4. A student claims 22/7 is “more rational” than 3/1 because its decimal repeats. Identify the conceptual error.
5. Given a decimal 0.d1d2…dk̅r1r2…rm, construct the fraction p/q in lowest terms and show that q’s prime factors outside {2,5} determine the period m.