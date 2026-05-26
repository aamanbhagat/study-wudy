## 1. The one-sentence answer
**A geometric series \(\sum_{k=0}^\infty ar^k\) converges to the finite sum \(a/(1-r)\) precisely when \(|r|<1\).**

The series is an infinite sum of terms that form a constant multiple of a fixed ratio at each step. When the absolute value of that ratio stays below one, each new term shrinks fast enough that the accumulated total never exceeds a fixed bound; the partial sums therefore settle to a single number. When the absolute value equals or exceeds one, the terms either stay the same size or grow, so the partial sums either oscillate without settling or diverge to infinity.

The convergence condition is sharp: equality at \(|r|=1\) produces two qualitatively different failures (the harmonic-like constant series and the alternating non-convergent series), while \(|r|>1\) produces outright explosion. The proof therefore splits into an explicit closed form for the partial sums followed by a limit argument that succeeds exactly inside the unit disk.

> [!NOTE]
> The single decisive fact is that the remainder after \(n\) terms is exactly the tail of another geometric series whose first term is \(ar^{n+1}\); this tail vanishes if and only if \(|r|<1\).

## 2. Why this matters — concrete and current
In reinforcement learning, the infinite-horizon discounted return \(\sum_{t=0}^\infty \gamma^t r_t\) is a geometric series whose convergence is guaranteed by the discount factor \(\gamma\in[0,1)\); every policy-gradient algorithm at DeepMind and OpenAI relies on this guarantee to keep value estimates finite.  

In semiconductor yield modeling, the probability that a wafer survives \(k\) successive process steps with survival probability \(r\) per step is again a geometric series; Intel and TSMC use the closed-form sum to predict overall yield before fabrication begins.  

In laser-cavity optics, the total output intensity after infinitely many internal reflections is \(\sum (r e^{i\phi})^k\), a geometric series whose convergence determines whether the cavity lases; the same formula appears in the design documents for LIGO’s arm cavities.  

In continuous-time finance, the present value of a perpetual bond paying one dollar per year is the geometric series \(\sum (e^{-r})^k\), which converges for any positive interest rate and supplies the closed-form price used by every major fixed-income desk.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Limit of a sequence      | The definition of convergence of the series is the existence of \(\lim_{n\to\infty} S_n\). |
| Algebraic manipulation of finite sums | The closed-form expression for the partial sum must be derived exactly. |
| Absolute value and inequalities | The condition \(|r|<1\) is expressed with the modulus; the comparison \(|r^{n+1}|\to 0\) requires it. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Partial sums are finite and explicit
Any finite initial segment of the series can be summed by multiplying by the common ratio and subtracting.  
Example: \(1 + r + r^2 + r^3\) multiplied by \(r\) yields \(r + r^2 + r^3 + r^4\); subtraction cancels all middle terms.  
\[
S_n = a + ar + \cdots + ar^n = a\frac{1-r^{n+1}}{1-r}.
\]
> [!WARNING] If the subtraction step is performed with the wrong sign, the numerator becomes \(r^{n+1}-1\) and every subsequent limit argument collapses.

### Step 2 — The infinite sum is the limit of the partial sums
By definition the series converges when and only when \(\lim_{n\to\infty} S_n\) exists and is finite.  
Substitute the closed form: the limit reduces to the single term involving \(r^{n+1}\).

### Step 3 — The remainder vanishes exactly when \(|r|<1\)
\[
\lim_{n\to\infty} r^{n+1} = 0 \iff |r|<1.
\]
For \(|r|<1\) the exponential decay dominates any polynomial growth in the denominator; outside this interval the power either stays constant or grows.

### Step 4 — Convergence implies the closed-form sum
When the limit of the remainder is zero,
\[
\sum_{k=0}^\infty ar^k = \frac{a}{1-r}, \qquad |r|<1.
\]

### Step 5 — Divergence for \(|r|\ge 1\)
If \(|r|>1\) then \(|ar^n|\to\infty\), so the terms do not tend to zero and the series diverges.  
If \(r=1\) the partial sums are \((n+1)a\), unbounded.  
If \(r=-1\) the partial sums alternate between \(a\) and \(0\), which fails to converge.

## 5. Worked examples — every step shown

**Example 1 — Sum with ratio 1/2**  
*Given:* \(\sum_{k=0}^\infty (1/2)^k\).  
*Find:* the sum if it exists.  
Partial sum: \(S_n = (1 - (1/2)^{n+1})/(1-1/2) = 2(1 - 2^{-(n+1)})\).  
*Why:* direct substitution of \(a=1\), \(r=1/2\) into the finite-sum formula.  
Limit: \(\lim_{n\to\infty} S_n = 2\).  
*Why:* \(2^{-(n+1)}\to 0\) because \(|1/2|<1\).  
**2**

*Reflection:* The calculation is routine once the closed form is known; the only decision is verifying \(|r|<1\).

**Example 2 — Sum with ratio 2**  
*Given:* \(\sum_{k=0}^\infty 2^k\).  
*Find:* does the series converge?  
Terms: \(2^k \to\infty\), hence do not tend to zero.  
*Why:* necessary condition for convergence is that the general term \(\to 0\).  
Diverges.

*Reflection:* Divergence is detected before any partial-sum formula is written.

**Example 3 — Alternating unit ratio**  
*Given:* \(\sum_{k=0}^\infty (-1)^k\).  
*Find:* convergence?  
Partial sums: \(S_{2m}=1\), \(S_{2m+1}=0\).  
*Why:* direct computation of even and odd indices.  
Sequence of partial sums has two limit points, hence diverges.

*Reflection:* The case \(r=-1\) is the canonical example of oscillation.

**Example 4 — Starting index and coefficient**  
*Given:* \(\sum_{k=3}^\infty 3\cdot(1/4)^k\).  
*Find:* the sum.  
Factor out the first three powers: \(3(1/4)^3 + 3(1/4)^4 + \cdots = 3\cdot(1/4)^3\sum_{m=0}^\infty (1/4)^m\).  
*Why:* re-indexing shifts the summation variable but leaves the common ratio unchanged.  
Inner sum equals \(1/(1-1/4)=4/3\).  
Total: \(3\cdot(1/64)\cdot(4/3)=1/16\).  
**1/16**

*Reflection:* The convergence condition depends only on the ratio, not on the starting index.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using \(|r|\le 1\)                | Confusion with the radius of convergence of power series | Always test the endpoint cases separately.           |
| Forgetting the first term \(a\)   | Treating the series as starting at \(k=1\)  | Write the general term explicitly before summing.    |
| Applying the formula at \(r=1\)   | Algebraic division by zero                  | Check \(r=1\) by direct inspection of partial sums.  |
| Believing conditional convergence can occur | Geometric terms are never conditionally convergent | Note that absolute convergence is automatic when the series converges. |
| Mis-indexing the partial-sum formula | Off-by-one in the exponent \(n+1\)          | Derive the finite sum from scratch each time until automatic. |
| Confusing geometric with arithmetic | Both have constant “step”, but different operations | Verify that the ratio of consecutive terms is constant. |
| Assuming convergence at \(r=-1\) for \(a=0\) | Trivial case masks the general rule         | State the hypothesis \(a\neq 0\) when discussing endpoints. |

## 7. The textbook-precise statement
Let \(a\in\mathbb{R}\) and \(r\in\mathbb{R}\). The geometric series \(\sum_{k=0}^\infty ar^k\) converges if and only if \(|r|<1\), in which case
\[
\sum_{k=0}^\infty ar^k = \frac{a}{1-r}.
\]
When \(|r|\ge 1\) the series diverges. (See Stewart, *Calculus*, 9e, §11.2, Theorem 4.)

## 8. Visual — diagram or schematic
```text
Number line for r:
          -∞       -1        0        1        +∞
          |---------|--------|--------|---------|
Diverge   |   ←→   |        |        |   →∞    |
Converge            |--------|--------|
          r < -1     -1 < r < 1      r > 1
```
The open interval (-1,1) is the sole region where the powers \(r^n\) decay to zero.

## 9. The memory technique

1. **The hook** — Picture a photocopier that reduces every page to 70 % of the previous size; after infinitely many copies the total ink used is finite and exactly 1/(1-0.7) times the first page.  
2. **What to overlearn** — The closed form \(a/(1-r)\) and the strict inequality \(|r|<1\).  
3. **Spaced-repetition schedule** — Review the statement at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the partial-sum formula by the “multiply by r and subtract” trick, then examine the limit of the remainder term.

## 10. What this unlocks
Mastery of geometric series supplies the model case for every later test of convergence and supplies the explicit sum needed in power-series manipulations.  

- Ratio test and root test are proved by comparison with a geometric series.  
- Taylor series for \(1/(1-x)\) is the geometric series itself.  
- Generating functions in combinatorics and probability rest on the same closed form.  
- Residue calculus later evaluates infinite sums by treating them as geometric series inside a contour integral.

## 11. Self-check — five questions, no answers
1. Compute \(\sum_{k=0}^\infty 5\cdot(3/4)^k\) or state that it diverges.  
2. For which real numbers \(r\) does \(\sum_{k=2}^\infty r^k\) converge? Give the sum when it exists.  
3. Prove that if \(|r|>1\) then the general term does not tend to zero.  
4. Why is the formula \(a/(1-r)\) invalid at \(r=1\) even though the algebraic expression is defined by continuity?  
5. A student claims the series \(\sum (-2)^k\) converges because the terms alternate. Identify the precise error in the claim.