## 1. The one-sentence answer
**The alternating series test states that an alternating series \(\sum (-1)^{n+1} a_n\) converges whenever the sequence \(a_n\) is positive, monotonically decreasing, and tends to zero.**

An alternating series flips sign with each term. The test isolates the minimal conditions that force the partial sums to settle on a single limit despite the sign changes. The decreasing-to-zero requirement prevents the terms from growing or lingering away from the axis; monotonicity keeps the swings from overshooting in a way that would prevent convergence.

The proof works by showing that the sequence of even partial sums is increasing and bounded above, while the sequence of odd partial sums is decreasing and bounded below; both therefore converge, and they converge to the same value because their difference is exactly the general term that vanishes.

> [!NOTE]
> The test guarantees convergence but says nothing about absolute convergence; many alternating series converge only conditionally.

## 2. Why this matters — concrete and current
In aerospace guidance software at NASA’s Jet Propulsion Laboratory, truncated alternating series appear when expanding the gravitational potential of irregular asteroids; the Leibniz test supplies rigorous a-priori error bounds that keep trajectory-correction maneuvers inside fuel budgets.

Power-electronics engineers at Tesla use Fourier-series representations of pulse-width-modulated inverter waveforms; the alternating coefficients satisfy the Leibniz hypotheses, allowing guaranteed truncation error when designing output filters that meet electromagnetic-interference regulations.

In machine-learning hardware, the error-function approximation inside Intel’s Habana Gaudi accelerators is realized by a minimax polynomial whose remainder is an alternating series; the test certifies that the fixed-point implementation never exceeds the advertised 1-ULP accuracy.

Meteorologists at the European Centre for Medium-Range Weather Forecasts expand the spherical harmonics of the Coriolis term with alternating Legendre polynomials; the test confirms that the spectral coefficients decay fast enough for stable semi-implicit time stepping.

Semiconductor foundries employ alternating-series expansions of the plasma dispersion function when modeling RF sheaths; convergence guarantees are required for the Monte-Carlo doping simulators that set implant schedules at TSMC.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Limit of a sequence      | The condition \(\lim a_n = 0\) is stated directly in the hypothesis. |
| Monotonic sequences      | The proof relies on even and odd partial sums being monotonic. |
| Bounded monotonic sequences converge | The core argument that produces the common limit. |
| Partial sums and remainder | Convergence is defined via the sequence of partial sums. |

## 4. Building the idea — from intuition to formalism

### Step 1 — An alternating series is a signed sequence with a fixed pattern
Write the general term as \((-1)^{n+1}a_n\) where \(a_n>0\). The signs therefore read \(+,-,+,-\dots\).  
Example: \(1 - \frac12 + \frac13 - \frac14 + \dots\).  
Formally the series is \(\sum_{n=1}^\infty (-1)^{n+1}a_n\).

> [!WARNING]
> If the signs are not strictly alternating, the test does not apply even if magnitudes decrease.

### Step 2 — The three hypotheses
Require (i) \(a_n>0\) for all \(n\), (ii) \(a_{n+1}\le a_n\) for all \(n\), (iii) \(\lim_{n\to\infty}a_n=0\).

> [!WARNING]
> Dropping monotonicity while keeping the other two conditions can produce divergence (e.g., \(a_n=1/n\) for \(n\) even and \(1/n^2\) for \(n\) odd).

### Step 3 — Even partial sums are increasing and bounded above
Let \(s_{2k}=\sum_{n=1}^{2k}(-1)^{n+1}a_n\). Grouping terms yields \(s_{2k}= (a_1-a_2)+(a_3-a_4)+\dots+(a_{2k-1}-a_{2k})\). Each parenthesis is nonnegative by monotonicity, so \(s_{2k}\) is increasing. Also \(s_{2k}\le a_1\), hence bounded above.

### Step 4 — Odd partial sums are decreasing and bounded below
The same grouping for odd indices shows \(s_{2k+1}\) is decreasing and bounded below by \(a_1-a_2\).

### Step 5 — Both subsequences converge to the same limit
Because \(s_{2k+1}-s_{2k}=a_{2k+1}\to0\), the two limits must coincide; call the common value \(s\).

### Step 6 — The full sequence of partial sums converges
Every partial sum \(s_m\) lies between \(s_{m-1}\) and \(s_{m+1}\), both of which approach \(s\). Therefore \(s_m\to s\).

### Step 7 — The textbook statement
If \(a_n>0\), \(a_n\) is decreasing, and \(\lim a_n=0\), then \(\sum(-1)^{n+1}a_n\) converges.

## 5. Worked examples — every step shown

**Example 1 — The alternating harmonic series**  
*Given:* \(a_n=1/n\).  
*Find:* Does \(\sum_{n=1}^\infty(-1)^{n+1}/n\) converge?  
Step 1: \(a_n=1/n>0\). *Why:* obvious.  
Step 2: \(1/(n+1)<1/n\), decreasing. *Why:* cross-multiply.  
Step 3: \(\lim 1/n=0\). *Why:* standard limit.  
The three hypotheses hold, so the series converges.  
**Converges.**

*Reflection:* The classic case; monotonicity is immediate yet the series converges only conditionally.

**Example 2 — Rapidly decreasing coefficients**  
*Given:* \(a_n=1/n^2\).  
*Find:* Convergence of \(\sum(-1)^{n+1}/n^2\).  
All three conditions hold (decreasing follows from \(n^2<(n+1)^2\)).  
**Converges (absolutely, in fact).**

*Reflection:* The test still applies, but absolute convergence is stronger; the test does not detect this.

**Example 3 — Failure of the limit condition**  
*Given:* \(a_n=1/\sqrt n\).  
*Find:* Does the alternating series converge?  
\(a_n\to0\) fails. The test gives no information; the series actually diverges by comparison with the harmonic series on even terms.  
**Test inconclusive.**

*Reflection:* Always verify \(\lim a_n=0\) first; many students skip it.

**Example 4 — Monotonicity violation**  
*Given:* \(a_n=\frac1n\) if \(n\) even, \(\frac1{n^2}\) if \(n\) odd.  
*Find:* Convergence?  
\(\lim a_n=0\) and positivity hold, yet \(a_n\) is not monotone. Direct inspection shows the even partial sums behave like a divergent harmonic series.  
**Diverges.**

*Reflection:* The proof collapses exactly where the grouped differences cease to be positive.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to check monotonicity  | Students focus only on the limit            | Write the inequality \(a_{n+1}\le a_n\) explicitly before invoking the test |
| Assuming absolute convergence     | Confusion with the ratio or root test       | Compute \(\sum|a_n|\) separately             |
| Applying the test to non-alternating signs | Misreading the problem statement            | Count the sign changes in the first five terms |
| Using the test on finite sums     | Misunderstanding “series”                   | Verify the expression is an infinite sum     |
| Confusing decreasing with eventually decreasing | Subtle tail behaviour                       | Check the inequality for all \(n\ge N_0\) and adjust the first finitely many terms |
| Thinking the sum equals zero      | Visualising symmetric cancellation          | Remember the first term is never cancelled   |
| Neglecting conditional convergence in error estimates | Over-reliance on absolute error bounds      | Use the alternating-series remainder estimate instead |

## 7. The textbook-precise statement
Let \(\{a_n\}_{n=1}^\infty\) be a sequence of positive real numbers such that \(a_{n+1}\le a_n\) for every \(n\) and \(\lim_{n\to\infty}a_n=0\). Then the series \(\sum_{n=1}^\infty(-1)^{n+1}a_n\) converges. (Stewart, *Calculus*, 9e, §11.5, Theorem 3.)

## 8. Visual — diagram or schematic
```text
s1 ──► s3 ──► s5 ──► …          (odd partial sums, decreasing, bounded below)
          ↘
            s (common limit)
          ↗
s2 ──► s4 ──► s6 ──► …          (even partial sums, increasing, bounded above)
```
The vertical gaps between consecutive partial sums shrink to zero because they equal \(a_n\).

## 9. The memory technique
**The hook** — Picture a frog jumping left, then right, each jump half the previous distance but always smaller; eventually it must stop at a single lily pad.

**What to overlearn** — The exact three hypotheses and the fact that the test is sufficient but not necessary for convergence.

**Spaced-repetition schedule** — Review the statement at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Re-derive the monotonicity and boundedness of even/odd partial sums from the grouping argument.

## 10. What this unlocks
The alternating-series test is the gateway to conditional convergence, the Dirichlet test, and Abel summation. It also supplies the explicit remainder bound used in Taylor-series error estimates and in the convergence theory of Fourier series.

- Dirichlet test for more general coefficients  
- Abel’s theorem on power-series endpoints  
- Alternating-series remainder estimate  
- Conditional versus absolute convergence distinctions in functional analysis

## 11. Self-check — five questions, no answers
1. State the three hypotheses of the alternating series test verbatim.  
2. Prove that the even partial sums of a series satisfying the hypotheses form an increasing sequence bounded above by \(a_1\).  
3. Does the test apply to \(\sum(-1)^n\frac{n}{n+1}\)? Explain in one sentence.  
4. Construct a concrete counter-example showing that dropping monotonicity can destroy convergence while preserving the other two conditions.  
5. Compute the smallest \(N\) such that the remainder after \(N\) terms of \(\sum(-1)^{n+1}/n^2\) is less than \(10^{-6}\), using the alternating-series remainder estimate.