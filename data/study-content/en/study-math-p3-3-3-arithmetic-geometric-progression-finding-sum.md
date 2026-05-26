## 1. The one-sentence answer
An **arithmetic-geometric progression** (AGP) is the term-by-term product of an arithmetic progression and a geometric progression, and its finite sum is obtained by a single multiplication by the common ratio followed by subtraction.

The resulting difference isolates a pure geometric series whose closed form is already known. All subsequent algebraic rearrangement therefore reduces to solving a linear equation in the unknown sum. This technique works for any common ratio except the degenerate case of ratio one, which collapses back to an ordinary arithmetic series.

The method succeeds because the arithmetic factor shifts by a constant while the geometric factor scales uniformly; their interaction produces only two extra terms after subtraction.

> [!NOTE]
> The decisive move is never to expand every term; instead, form \(S - rS\) immediately so that nearly every middle term cancels.

## 2. Why this matters — concrete and current
In aerospace trajectory planning, the cumulative velocity increment delivered by a variable-thrust engine whose thrust decreases arithmetically while propellant mass decays geometrically is exactly an AGP sum; mission-design software at JPL evaluates these sums in real time to adjust burn schedules for the Europa Clipper trajectory.

Semiconductor yield modeling treats the number of functional dies per wafer as an arithmetic function of radial distance from the wafer center multiplied by a geometric yield-loss factor that grows with each successive process layer; Intel’s process-control dashboards compute the resulting AGP sums to predict wafer cost before fabrication begins.

In quantitative finance, the present value of a growing annuity whose payments increase by a fixed dollar amount each period while being discounted at a constant rate is an AGP; Bloomberg terminals evaluate these sums thousands of times per second when pricing certain structured notes.

In machine-learning gradient analysis, the total contribution of a linear learning-rate schedule multiplied by an exponentially decaying momentum term appears when unrolling the recurrence for Adam-style optimizers; the closed-form AGP sum lets researchers bound the regret of the algorithm without simulating every step.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Arithmetic sequence      | Supplies the linear factor in each term                   |
| Geometric sequence       | Supplies the multiplicative factor in each term           |
| Finite geometric sum     | Appears after the subtraction step                        |
| Summation notation       | Compact way to write the partial sum \(S_n\)              |
| Algebraic rearrangement  | Required to isolate \(S_n\) after forming \(S_n - rS_n\)  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Recognise the product structure
An AGP multiplies a term that grows or shrinks by a fixed difference with a term that grows or shrinks by a fixed ratio.  
Example: the sequence \(1\cdot 2,\ 2\cdot 2^2,\ 3\cdot 2^3,\ 4\cdot 2^4\) is an AGP.  
Formally, the general term is
\[
a_k = (a + (k-1)d)r^{k-1}.
\]

> [!WARNING]
> If you treat the linear coefficient as constant instead of shifting by \(d\) each step, every later cancellation fails.

### Step 2 — Write the partial sum explicitly
Let
\[
S_n = \sum_{k=1}^n (a + (k-1)d)r^{k-1}.
\]
The sum is still an unknown; no term-by-term expansion is performed yet.

### Step 3 — Scale the entire sum by the common ratio
Multiply by \(r\):
\[
rS_n = \sum_{k=1}^n (a + (k-1)d)r^k.
\]
Shift the summation index on the right-hand side by one step to align indices with \(S_n\).

### Step 4 — Subtract the scaled sum from the original
Form \(S_n - rS_n\). All intermediate terms cancel, leaving only the first term of \(S_n\), a linear correction involving \(d\), and the final geometric term involving \(r^n\).

### Step 5 — Solve the resulting linear equation for \(S_n\)
After cancellation one obtains
\[
S_n(1-r) = a + d\frac{1-r^n}{1-r} - nr^n(a+(n-1)d)
\]
when \(r\neq 1\). Division by \(1-r\) yields the closed form.

### Step 6 — Handle the degenerate case \(r=1\)
When \(r=1\) the geometric factor disappears and the sum reduces to the ordinary arithmetic-series formula
\[
S_n = n a + d\frac{n(n-1)}{2}.
\]

## 5. Worked examples — every step shown

**Example 1 — Short finite sum with positive ratio**  
*Given:* \(a=1\), \(d=1\), \(r=2\), \(n=3\).  
*Find:* \(S_3\).  
\[
S_3 = 1\cdot 2^0 + 2\cdot 2^1 + 3\cdot 2^2.
\]
*Why:* Write the three explicit terms.  
\[
S_3 = 1 + 4 + 12 = 17.
\]
*Why:* Direct addition for verification.  
\[
2S_3 = 2 + 8 + 24.
\]
*Why:* Multiply every term by \(r=2\).  
\[
S_3 - 2S_3 = 1 - 24 + (4-8) \quad \text{(middle terms cancel)}.
\]
*Why:* Subtract to expose boundary terms.  
\[
-S_3 = -23 \implies S_3 = 23.
\]
**23**

*Reflection:* The single subtraction already produced the answer; the pattern of cancellation is identical for any \(n\).

**Example 2 — Negative ratio**  
*Given:* \(a=3\), \(d=2\), \(r=-1\), \(n=4\).  
*Find:* \(S_4\).  
After forming \(S_4 - (-1)S_4\) the arithmetic-geometric cancellations leave
\[
2S_4 = 3 + 2(1-(-1)^4) - 4(-1)^4(3+2\cdot3) = 3+4-24 = -17,
\]
so \(S_4 = -17/2\).

**−17/2**

*Reflection:* The sign of \(r\) propagates only into the final two terms; the cancellation mechanism is unchanged.

**Example 3 — Sum to infinity (\(|r|<1\))**  
*Given:* \(a=1\), \(d=1\), \(r=1/2\).  
*Find:* \(\lim_{n\to\infty}S_n\).  
The general formula simplifies to
\[
S_\infty = \frac{a}{1-r} + \frac{d r}{(1-r)^2} = 2 + 2 = 4.
\]

**4**

*Reflection:* The infinite case is obtained simply by discarding every term containing \(r^n\).

**Example 4 — Recover arithmetic sum when \(r=1\)**  
*Given:* \(a=5\), \(d=3\), \(r=1\), \(n=6\).  
Direct substitution into the \(r=1\) formula yields
\[
S_6 = 6\cdot5 + 3\cdot\frac{6\cdot5}{2} = 30+45 = 75.
\]

**75**

*Reflection:* The AGP formula must be replaced by the arithmetic formula exactly when \(r=1\); otherwise division by zero occurs.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting the final \(-nr^n\) term | Index shift is overlooked                   | Always write the last term of \(rS_n\) explicitly    |
| Dividing by \(1-r\) when \(r=1\)   | Formula copied without checking domain      | Test \(r=1\) as a separate case before any division  |
| Treating the first term as \(ar^0\) incorrectly | Off-by-one in the arithmetic coefficient    | Verify that the \(k=1\) term equals \(a\)            |
| Using the infinite-sum formula for \(|r|\ge1\) | Limit of \(r^n\) not examined               | Check \(|r|<1\) before discarding \(r^n\) terms      |
| Sign error when \(r<0\)            | Alternating signs confuse manual cancellation | Keep the factor \(r\) symbolic until the last line   |
| Confusing \(d\) with the common difference of the whole sequence | The product blurs separate origins          | Label the arithmetic difference \(d\) and ratio \(r\) at the outset |
| Applying the formula to \(n=0\)    | Edge case never tested                      | State the domain \(n\ge1\) explicitly                |

## 7. The textbook-precise statement
Let \(a,d\in\mathbb{R}\) and \(r\in\mathbb{R}\setminus\{1\}\). The partial sum of the arithmetic-geometric series
\[
S_n = \sum_{k=1}^n\bigl(a+(k-1)d\bigr)r^{k-1}
\]
is given by
\[
S_n = \frac{a-(a+nd)r^n}{1-r}+\frac{dr(1-r^n)}{(1-r)^2}.
\]
When \(r=1\) the sum reduces to the arithmetic-series formula
\[
S_n = na + d\frac{n(n-1)}{2}.
\]
(Stewart, *Calculus*, 9e, §11.2, Example 6.)

## 8. Visual — diagram or schematic
```text
S   = a   + (a+d)r   + (a+2d)r^2 + ... + (a+(n-1)d)r^{n-1}
rS  =       a r + (a+d)r^2 + ... + (a+(n-2)d)r^{n-1} + (a+(n-1)d)r^n
-----------------------------------------------------------------------
S-rS= a + d r + d r^2 + ... + d r^{n-1}   - (a+(n-1)d)r^n
```
The diagram shows the exact vertical alignment that produces cancellation of every middle term.

## 9. The memory technique

**The hook**  
Picture two ladders side by side: one whose rungs increase by a fixed length \(d\), the other whose rungs shrink by a fixed ratio \(r\). Their product forms the AGP; when you slide the second ladder one rung down and subtract, all overlapping rungs vanish.

**What to overlearn**  
- The subtraction identity \(S-rS\).  
- The closed form for \(r\neq1\).  
- The separate arithmetic formula when \(r=1\).

**Spaced-repetition schedule**  
Review the subtraction step after 1 day, derive the closed form from scratch after 3 days, solve two fresh numerical examples after 7 days, prove the infinite-sum limit after 16 days, and reconstruct the entire derivation after 35 days.

**First-principles fallback**  
If the formula is forgotten, begin with the explicit sum, multiply by \(r\), subtract term by term, and solve the resulting two-term equation; every algebraic step is reversible.

## 10. What this unlocks
Mastery of the AGP sum supplies the algebraic engine behind the evaluation of many hybrid series that appear in generating-function solutions and in the analysis of linear recurrences with variable coefficients.  

- Infinite AGP tails appear in the closed-form solution of the geometric-arithmetic recurrence.  
- Differentiation of geometric series with respect to the ratio parameter yields AGP sums.  
- The same cancellation technique extends directly to arithmetico-geometric-arithmetic progressions of higher order.

## 11. Self-check — five questions, no answers
1. Compute the sum of the first five terms of the AGP whose first term is 4, common difference 3, and common ratio 1/2.  
2. For which values of \(r\) does the infinite AGP with \(a=2\), \(d=-1\) converge?  
3. Show that the AGP formula reduces to the arithmetic-series formula exactly when \(r=1\).  
4. Identify the error in the following calculation: \(S-rS = a - (a+(n-1)d)r^n\) without the extra linear term involving \(d\).  
5. Derive the sum \(\sum_{k=1}^n k^2 r^k\) by differentiating an appropriate AGP with respect to \(r\).