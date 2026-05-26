## 1. The one-sentence answer
**An infinite geometric series converges to a finite sum if and only if the absolute value of its common ratio is strictly less than one.**

A geometric series is formed by repeated multiplication of a fixed ratio. Its partial sums are always finite, yet the infinite collection of terms settles to a single number precisely when each new term shrinks fast enough that the tail vanishes. The explicit limit is obtained by writing the partial-sum formula and sending the number of terms to infinity; the only surviving piece is the closed expression a/(1−r).

This behaviour is not obvious from the first few terms alone. When |r| exceeds one the terms grow without bound, so the partial sums diverge. When |r| equals one the series either stays constant or oscillates and never settles. Only inside the open interval (−1,1) does the remainder after n terms approach zero uniformly.

> [!NOTE]
> The single decisive fact is that lim (n→∞) r^n = 0 exactly when |r| < 1; every other property of the infinite sum follows from this limit.

## 2. Why this matters — concrete and current
In aerospace trajectory design, infinite geometric series appear when modelling successive gravity-assist corrections; each delta-v increment is scaled by a fixed ratio less than one, and the total fuel budget is the closed sum a/(1−r). NASA’s 2023 Psyche mission planning documents explicitly bound the ratio of successive correction impulses to guarantee convergence of the total impulse.

In semiconductor yield modelling, the probability of a defect propagating through successive lithographic layers forms a geometric series whose common ratio is the defect transfer coefficient. Intel’s 2022 process-node papers sum the infinite tail to obtain an exact expression for expected yield loss when that coefficient lies below one.

In reinforcement-learning value iteration, the return of an infinite-horizon discounted Markov decision process is an infinite geometric series whose ratio is the discount factor γ. Every modern implementation (OpenAI, DeepMind) truncates only after proving |γ| < 1 forces the tail below a chosen tolerance.

In radio-frequency engineering, multiple reflections inside a transmission line produce voltage contributions that form a geometric series. The total steady-state voltage is computed by summing the infinite series once the reflection coefficient magnitude is verified to be less than one.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Finite geometric sum     | Supplies the closed expression whose limit is taken       |
| Limit of a sequence      | Defines what “convergence” means for the partial sums     |
| Absolute value and inequalities | Encodes the precise condition |r| < 1 that forces the remainder to vanish |

## 4. Building the idea — from intuition to formalism

### Step 1 — Partial sums are the only objects we can actually add
Any finite collection of terms can be added directly. The infinite series is defined only as the limit of these finite partial sums; without that limit the phrase “sum to infinity” has no meaning.

Consider the series 1 + ½ + ¼ + ⅛ + ….  
The first four partial sums are 1, 1.5, 1.75, 1.875.  
Formally, let S_n = a + ar + … + ar^{n−1}. Then the infinite sum, if it exists, is lim (n→∞) S_n.

> [!WARNING]
> Treating the infinite sum as “adding forever” without reference to the limit of partial sums produces paradoxes when |r| ≥ 1.

### Step 2 — Derive the closed form for every finite partial sum
Multiply S_n by r and subtract:  
S_n − r S_n = a − ar^n.  
Hence S_n = a(1 − r^n)/(1 − r) whenever r ≠ 1.  
This algebraic identity holds for every finite n and every r ≠ 1.

### Step 3 — Pass to the limit
The infinite sum is defined as lim (n→∞) S_n.  
Provided the limit exists,  
lim (n→∞) S_n = a/(1 − r) − [a/(1 − r)] lim (n→∞) r^n.

### Step 4 — The power r^n tends to zero precisely when |r| < 1
If |r| < 1 then −1 < r < 1, so |r^n| = |r|^n → 0 as n → ∞.  
If |r| > 1 then |r^n| → ∞.  
If |r| = 1 then r^n oscillates or equals 1 and never tends to zero.

### Step 5 — Convergence criterion and the sum formula
Therefore lim (n→∞) S_n exists and equals a/(1 − r) if and only if |r| < 1 (and r ≠ 1, already excluded).  
When |r| ≥ 1 the partial sums diverge.

## 5. Worked examples — every step shown

**Example 1 — Simple convergent case**  
*Given:* a = 3, r = 1/2.  
*Find:* sum of the infinite series.  
S_n = 3(1 − (1/2)^n)/(1 − 1/2) = 6(1 − (1/2)^n).  
*Why:* Algebraic identity from Step 2.  
lim (n→∞) S_n = 6(1 − 0) = 6.  
*Why:* (1/2)^n → 0 because |1/2| < 1.  
**6**

*Reflection:* The arithmetic is immediate once the limit condition is verified; the same pattern scales to any |r| < 1.

**Example 2 — Divergent case with |r| > 1**  
*Given:* a = 1, r = 2.  
*Find:* does the series converge?  
S_n = 1 − 2^n.  
lim (n→∞) S_n does not exist (grows without bound).  
*Why:* 2^n → ∞ when |2| > 1.  
**Diverges**

*Reflection:* The formula still gives the partial sums, yet the limit step fails exactly where the convergence test predicts.

**Example 3 — |r| = 1 edge case**  
*Given:* a = 5, r = −1.  
S_n = 5(1 − (−1)^n)/2.  
The sequence alternates between 5 and 0; no single limit exists.  
**Diverges**

*Reflection:* Equality |r| = 1 must be checked separately; the power limit is never zero.

**Example 4 — Fractional ratio with negative sign**  
*Given:* a = 4, r = −3/4.  
S_n = 4(1 − (−3/4)^n)/(1 + 3/4) = (16/7)(1 − (−3/4)^n).  
lim (n→∞) S_n = 16/7 because |−3/4| < 1.  
**16/7**

*Reflection:* The absolute-value test is insensitive to sign; only the magnitude governs convergence.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to verify |r| < 1 before writing a/(1−r) | The algebraic formula for S_n exists for all r ≠ 1, so the expression is written mechanically | Always test |r| < 1 first; write the sum only after the test passes |
| Confusing r = 1 with |r| = 1 | When r = 1 the series is constant and clearly diverges, yet students lump all |r| = 1 cases together | Treat r = 1 as a separate one-line check before invoking the absolute-value criterion |
| Using the formula when r = 1 | Division by zero in the closed form | The derivation of S_n assumes r ≠ 1; handle r = 1 by direct inspection of partial sums |
| Believing convergence depends on a | The first term merely scales the sum; convergence is controlled solely by r | State the criterion as “|r| < 1, a any real number” |
| Thinking the sum is “a + ar + ar² + …” without limit | Everyday language suggests endless addition | Replace the phrase with “limit of partial sums” in every written argument |
| Ignoring that r may be negative | Students test only r < 1 and forget the lower bound | Always compute |r| explicitly |
| Truncating the series before proving the tail vanishes | Numerical convenience overrides analytic justification | Compute an explicit bound on the remainder |r|^n |a/(1−r)| before discarding terms |

## 7. The textbook-precise statement
Let a ∈ ℝ and r ∈ ℝ. The infinite geometric series ∑_{k=0}^∞ ar^k converges if and only if |r| < 1. In that case its sum equals a/(1 − r).  
When |r| ≥ 1 the series diverges.  
(Stewart, *Calculus*, 9e, §11.2, Theorem 4.)

## 8. Visual — diagram or schematic
```text
Number line for r
          -1               0               1
-----------|---------------|---------------|-----------
          diverge         converge        diverge
          (oscillate)     (tail → 0)      (|r^n| → ∞)
```
The open interval (−1,1) is the only region in which the remainder term a r^n /(1 − r) tends to zero for every fixed a.

## 9. The memory technique

1. **The hook**  
   Picture a frog jumping half the remaining distance to a wall each second; after infinitely many jumps it reaches the wall exactly when each jump is shorter than the previous by a factor strictly less than one.

2. **What to overlearn**  
   - Convergence ⇔ |r| < 1  
   - Sum = a/(1 − r) under that condition  
   - Partial-sum identity S_n = a(1 − r^n)/(1 − r)

3. **Spaced-repetition schedule**  
   Review at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback**  
   Re-derive S_n by the subtraction trick, then invoke the standard limit lim r^n = 0 ⇔ |r| < 1.

## 10. What this unlocks
Mastery of infinite geometric sums supplies the first rigorous example of a convergent series and the prototype for all power-series arguments. It is presupposed by the ratio test, by Taylor expansions of 1/(1 − x), by the solution of linear recurrence relations, and by the derivation of the Basel problem via Fourier series.

- Ratio test and root test for general series  
- Taylor series for |x| < 1  
- Closed-form solution of linear homogeneous recurrences  
- Generating-function techniques in combinatorics

## 11. Self-check — five questions, no answers
1. For which values of r does ∑_{k=0}^∞ 7(−2/3)^k converge, and what is its sum?  
2. Compute lim (n→∞) S_n where S_n = 2(1 − (3/2)^n)/(1 − 3/2) and explain why the limit fails to exist.  
3. A perpetuity pays £100 immediately, £100×0.97 after one year, £100×0.97² after two years, …. Find the present value when the discount factor is 0.97.  
4. Prove that if |r| < 1 then the remainder after n terms satisfies |R_n| ≤ |a r^n|/(1 − |r|).  
5. Construct a geometric series whose partial sums oscillate between two distinct values for all n and therefore diverge; state its first term and common ratio.