## 1. The one-sentence answer
An arithmetic progression is a sequence in which each term after the first is obtained by adding a fixed constant to the preceding term.

This constant difference produces terms that lie on a straight line when plotted against their position index. The structure lets us replace repeated addition with a single multiplication, yielding closed-form expressions for any chosen term and for the total of the first n terms. Those two expressions are derived directly from the definition without assuming any later results.

The derivations rest only on the definition of the sequence and the associative property of addition; once obtained they apply uniformly to every arithmetic progression, finite or infinite.

> [!NOTE]
> The entire power of the topic reduces to one observation: equal spacing in value allows the sum to be computed by pairing the first term with the last, the second with the second-last, and so on; each pair totals the same constant.

## 2. Why this matters — concrete and current
In aerospace trajectory design, engineers at NASA’s Jet Propulsion Laboratory model constant-thrust burns as arithmetic progressions of velocity increments; the closed-form sum gives the exact Δv budget after n discrete firings without iterating each step.

In semiconductor process control, Intel’s yield-prediction models treat the number of defects per wafer as an arithmetic sequence indexed by radial distance from the wafer centre; the nth-term formula supplies the defect count at any radius for rapid Monte-Carlo sampling.

Linear interpolation routines inside GPU texture units (NVIDIA CUDA cores) generate pixel values along scan lines by adding a fixed colour step; the nth-term expression replaces a loop of n additions with one fused multiply-add instruction.

Simple-interest accrual schedules used by retail banks (e.g., HSBC fixed-rate deposits) accumulate interest in arithmetic steps; the sum formula produces the maturity value after exactly n compounding periods for regulatory stress testing.

In machine-learning optimisers, certain learning-rate warm-up schedules (used in the original BERT training run) increase the rate by a constant increment each step; the sum formula computes the total “learning distance” travelled during warm-up in constant time.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Variables and substitution | To replace the general first term a and common difference d with concrete numbers without losing track of which quantity is which. |
| Summation notation Σ     | To express the sum of the first n terms compactly before deriving its closed form. |
| Distributive law         | To factor n/2 out of the paired sum during the derivation of S_n. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Definition of an arithmetic progression
An arithmetic progression is completely determined by its first term and the fixed amount added at every step.  
Example: 3, 7, 11, 15,… begins with 3 and adds 4 each time.  
Formally, a sequence {a_k} is an arithmetic progression when a_{k+1} − a_k = d for every k, where d is constant.  
> [!WARNING]  
> Treating d as allowed to change between steps destroys every later formula; the sequence then ceases to be arithmetic.

### Step 2 — Position-index notation
Label each term by its place in the sequence.  
Example: a_1 = 3, a_2 = 7, a_3 = 11.  
By definition a_n denotes the term in position n.  
> [!WARNING]  
> Off-by-one errors appear when n is counted from zero instead of one; the formulas below assume indexing begins at 1.

### Step 3 — Deriving the nth-term formula
Write the first few terms explicitly:  
a_1 = a,  
a_2 = a + d,  
a_3 = a + 2d,  
…  
a_n = a + (n−1)d.  
The pattern is immediate once each added d is counted.  
> [!WARNING]  
> Forgetting the “−1” produces a term that is exactly one step too large.

### Step 4 — Summation definition
The sum of the first n terms is S_n = a_1 + a_2 + … + a_n.  
Using the nth-term result already obtained,  
S_n = a + (a+d) + (a+2d) + … + [a+(n−1)d].

### Step 5 — Pairing method for the sum
Write the same sum in reverse order:  
S_n = [a+(n−1)d] + [a+(n−2)d] + … + a.  
Add the two expressions term by term; each pair equals 2a+(n−1)d. There are exactly n such pairs, so  
2S_n = n[2a+(n−1)d].

### Step 6 — Closed-form sum
Divide by 2:  
S_n = \frac{n}{2}[2a+(n−1)d].  
Equivalently, letting l = a_n be the last term,  
S_n = \frac{n}{2}(a+l).  
This is the textbook statement reached after the six preceding steps.

## 5. Worked examples — every step shown

**Example 1 — Direct nth term**  
*Given:* a = 5, d = 3, n = 7.  
*Find:* a_7.  
Start with the derived formula:  
a_n = a + (n−1)d.  
Substitute the given values:  
a_7 = 5 + (7−1)·3 = 5 + 6·3 = 5 + 18 = 23.  
*Why:* The formula already encodes the (n−1) additions of d.  
**23**

*Reflection:* The only arithmetic required is multiplication and addition; the derivation guarantees correctness for any integer n ≥ 1.

**Example 2 — Sum via pairing**  
*Given:* 2, 5, 8, … up to 8 terms.  
*Find:* S_8.  
a = 2, d = 3, n = 8.  
Apply the sum formula:  
S_8 = 8/2 [2·2 + (8−1)·3] = 4 [4 + 21] = 4·25 = 100.  
*Why:* The bracket evaluates the common pair sum; multiplication by n/2 counts the pairs.  
**100**

*Reflection:* The same numerical result is obtained by writing all eight numbers and adding, confirming the algebra.

**Example 3 — Find n given last term and sum**  
*Given:* a = 4, d = −1, S_n = 10.  
*Find:* n.  
Use both formulas:  
l = 4 + (n−1)(−1) = 5 − n,  
S_n = n/2 (4 + (5−n)) = n/2 (9−n) = 10.  
Multiply both sides by 2: n(9−n) = 20 → 9n − n² = 20 → n² − 9n + 20 = 0.  
Factor: (n−4)(n−5) = 0.  
Thus n = 4 or n = 5. Both satisfy the original sum.  
**n = 4 or n = 5**

*Reflection:* Quadratic equations appear naturally when n is unknown; both roots must be checked because n must be a positive integer.

**Example 4 — Mixed parameters**  
*Given:* a_5 = 17, a_9 = 29.  
*Find:* S_12.  
From a_5 = a + 4d = 17,  
a_9 = a + 8d = 29.  
Subtract: 4d = 12 → d = 3.  
Then a + 12 = 17 → a = 5.  
Now S_12 = 12/2 [2·5 + 11·3] = 6·(10 + 33) = 6·43 = 258.  
*Why:* Two nth-term equations supply the two unknowns a and d.  
**258**

*Reflection:* The difference of two terms directly yields d; once d is known, a follows at once.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using a_n = a + nd                | Counting n additions instead of (n−1)       | Always verify with n = 1: the formula must return a. |
| Forgetting the 1/2 in S_n         | Treating the pair sum as the final answer   | Keep the factor 2S_n until the last algebraic step.  |
| Applying formulas to geometric sequences | Confusing “common difference” with “common ratio” | Check that consecutive differences are constant, not ratios. |
| Negative d producing negative n   | Solving quadratics without domain check     | Discard any root that is not a positive integer.     |
| Off-by-one indexing in code       | Arrays usually start at 0                   | Map array index k to sequence index k+1 explicitly.  |
| Using S_n when only the nth term is required | Habit of always computing the sum           | Read the question: “find the 15th term” needs only a_15. |
| Treating d as a fraction without clearing denominators | Arithmetic with fractions feels messy       | Multiply through by the denominator before substituting. |

## 7. The textbook-precise statement
Let {a_n} be the sequence defined by a_1 = a and a_{n+1} = a_n + d for all n ≥ 1, where a, d ∈ ℝ. Then for every positive integer n,

a_n = a + (n−1)d,

S_n := ∑_{k=1}^n a_k = n/2 [2a + (n−1)d] = n/2 (a + a_n).

(See Stewart, *Precalculus*, 8e, §8.2, Theorem 1.)

## 8. Visual — diagram or schematic
```text
Index n:   1     2     3     4     5
Value:     a ──► a+d ──► a+2d ──► a+3d ──► a+4d
            │     │     │     │     │
Diff:       d     d     d     d
```
Horizontal arrows represent repeated addition of the constant d; vertical ticks mark the equal spacing that permits the pairing argument.

## 9. The memory technique

**The hook**  
Picture a staircase with identical risers; each riser is the common difference d. The height of the nth step is a+(n−1)d; the total height after n steps is obtained by averaging the first and last heights and multiplying by n.

**What to overlearn**  
- a_n = a + (n−1)d  
- S_n = n/2 [2a + (n−1)d]  
- S_n = n/2 (a + l) where l = a_n

**Spaced-repetition schedule**  
Review the two formulas at 1 day, 3 days, 7 days, 16 days, and 35 days after first mastery.

**First-principles fallback**  
Re-derive a_n by writing the first n terms explicitly; re-derive S_n by writing the sum forward and backward and adding.

## 10. What this unlocks
Mastery of arithmetic-progression formulas supplies the algebraic engine for every later summation technique that begins with a linear pattern.

- Geometric series derivations rely on the same summation notation but replace addition with multiplication.  
- Arithmetic-geometric progressions combine both patterns and appear in telescoping sums.  
- Calculus treatments of Riemann sums with equal partition widths reuse the sum formula directly.  
- Discrete-mathematics counting arguments (handshakes, triangular numbers) are special cases of S_n with a = 1, d = 1.

## 11. Self-check — five questions, no answers
1. Write the 20th term of the progression 7, 11, 15, … .  
2. The sum of the first n terms of an AP is 3n² + 5n. Find a and d.  
3. An AP has a_3 = 8 and a_7 = −4. Compute S_10.  
4. For which positive integers n does the sum of the first n terms of 10, 7, 4, … equal −20?  
5. Explain, without using the formula, why the average of the first and last terms equals the average of all terms in any finite AP.