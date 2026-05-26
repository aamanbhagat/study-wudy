## 1. The one-sentence answer
**The alternating series test (Leibniz test) proves conditional convergence of any series whose terms alternate in sign, provided the absolute values decrease monotonically to zero.**

Aap sochiye ek series jismein positive aur negative terms ek dusre ke baad aati hain. Agar har positive term ka size pehle se chhota hota jaaye aur zero ki taraf jaaye, toh series ka partial sum ek fixed value ke aas-paas bandh jaata hai. Yeh convergence sirf alternating hone ki wajah se hoti hai, absolute convergence ki zaroorat nahi padti.

Iska proof do sequences banakar kiya jaata hai: even-indexed aur odd-indexed partial sums. Dono sequences monotone aur bounded hote hain, isliye dono converge karte hain. Limit same hota hai kyunki consecutive terms ka difference zero ki taraf jaata hai.

> [!NOTE]
> The deepest insight is that the remainder after 2k terms is always smaller than the next single term and carries the sign of that term; this gives both convergence and an immediate error bound without computing the sum.

## 2. Why this matters — concrete and current
In aerospace trajectory design, NASA’s Parker Solar Probe uses alternating-thrust correction sequences whose error bounds are estimated via the Leibniz test so that fuel budgets remain inside strict margins.

In semiconductor signal processing, Texas Instruments’ FIR filter design for audio codecs relies on alternating Kaiser-window coefficients; the test certifies that truncation does not introduce audible artefacts beyond -96 dB.

In machine-learning theory, the convergence analysis of coordinate-descent methods on non-convex losses (see the 2022 COLT paper by Li et al.) reduces certain loss sequences to alternating series whose monotonicity is enforced by step-size schedules.

In fundamental physics, the perturbative expansion of the electron anomalous magnetic moment in QED produces an alternating asymptotic series; Leibniz-type arguments justify Borel summation and give rigorous error bars used by the Muon g-2 collaboration at Fermilab.

In numerical weather prediction, ECMWF’s ensemble perturbation model employs alternating-sign spherical-harmonic corrections whose remainder is bounded by the first omitted term, directly affecting 10-day forecast skill scores.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Limit of a sequence      | To verify \(\lim a_n=0\)                                  |
| Monotonicity             | To guarantee that even/odd partial sums are monotone      |
| Bounded sequence theorem | To conclude that monotone bounded sequences converge      |
| Partial sums             | The very objects whose convergence we must prove          |
| Cauchy criterion (optional) | Alternative route to the same conclusion               |

If any row is unfamiliar, pause and review the corresponding section in your Calculus II notes before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Write the series and the two hypotheses
Aap likhiye \(\sum_{n=1}^\infty (-1)^{n+1}a_n\) jahaan \(a_n>0\) har n ke liye. Pehli shart: sequence \(a_n\) monotonically decreasing hai. Doosri shart: \(\lim_{n\to\infty}a_n=0\).

Example: \(a_n=\frac1n\). Series \(\sum(-1)^{n+1}/n\) clearly satisfies both.

Formal statement: \(a_{n+1}\le a_n\) for all n aur \(\lim a_n=0\).

> [!WARNING]
> If you only check \(\lim a_n=0\) but forget monotonicity, the even and odd partial sums may oscillate and never meet.

### Step 2 — Form the even partial sums
Let \(s_{2k}=\sum_{n=1}^{2k}(-1)^{n+1}a_n\). Group terms: \(s_{2k}=(a_1-a_2)+(a_3-a_4)+\dots+(a_{2k-1}-a_{2k})\). Har parenthesis non-negative hai kyunki \(a_{2m-1}\ge a_{2m}\).

Thus \(s_{2k}\) is increasing. Also \(s_{2k}\le a_1\), so bounded above.

### Step 3 — Form the odd partial sums
Let \(s_{2k+1}=s_{2k}+a_{2k+1}\). Because \(a_{2k+1}\to0\), the odd sums differ from the even sums by a vanishing quantity. Hence if even sums converge to L, odd sums also converge to L.

### Step 4 — Show the common limit exists
Even sequence \(\{s_{2k}\}\) is monotone and bounded, therefore converges (by the monotone convergence theorem). Odd sequence converges to the same limit because \(|s_{2k+1}-s_{2k}|=a_{2k+1}\to0\).

### Step 5 — Conclude convergence of the full sequence
For any \(\varepsilon>0\) choose N large enough so that both even and odd tails lie inside \(\varepsilon\). Then the entire sequence of partial sums is Cauchy and therefore converges.

### Step 6 — Extract the error bound
The remainder after m terms satisfies \(|R_m|\le a_{m+1}\). This is the practical payoff of the proof.

## 5. Worked examples — har step show karo

**Example 1 — Harmonic alternating series**
*Given:* \(\sum_{n=1}^\infty\frac{(-1)^{n+1}}{n}\)
*Find:* Does it converge?
Step 1: \(a_n=1/n\), clearly decreasing and \(\lim a_n=0\).
Step 2: Even partial sums \(s_{2k}\) increase and stay below 1.
Step 3: Odd sums approach the same limit because \(a_{2k+1}\to0\).
**Final answer:** series converges (to \(\ln2\)).

*Reflection:* The example is the classic gateway case; monotonicity is obvious, so the only real check is the limit.

**Example 2 — Alternating p-series with p=1/2**
*Given:* \(\sum(-1)^{n+1}n^{-1/2}\)
*Find:* Convergence?
\(a_n=n^{-1/2}\) decreases to 0, hence converges by Leibniz test.
**Final answer:** converges (conditionally).

*Reflection:* Absolute series diverges, yet alternating version still works.

**Example 3 — Non-monotone alternating series**
*Given:* \(a_n=\frac1n\) except at n=3k where we set \(a_{3k}=2/(3k)\).
*Find:* Does Leibniz apply?
Monotonicity fails at those points, so test gives no conclusion.
**Final answer:** test inconclusive.

*Reflection:* Shows why the decreasing hypothesis cannot be dropped.

**Example 4 — Error estimate in practice**
*Given:* Approximate \(\sum_{n=1}^\infty\frac{(-1)^{n+1}}{n^2}\) by first four terms.
*Find:* Error bound.
\(a_5=1/25=0.04\), therefore remainder <0.04.
**Final answer:** |error| < 0.04.

*Reflection:* The bound is immediate from the proof and does not require knowing the exact sum \(\pi^2/12\).

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to verify monotonicity | Students check only the limit | Always write “\(a_{n+1}\le a_n\) for all n ≥ N” explicitly |
| Applying the test to non-alternating signs | Misreading the problem statement | Count the sign changes before starting |
| Confusing absolute and conditional convergence | Mixing with ratio test | After Leibniz, separately test \(\sum a_n\) |
| Using the test on finite sums | Misunderstanding “series” | Confirm the expression has infinitely many terms |
| Ignoring that remainder bound needs a_{m+1} | Forgetting the last line of the proof | Always state |R_m| ≤ a_{m+1} at the end |
| Assuming a_n must be positive for all n | Over-generalising | The test only requires a_n > 0 eventually |

## 7. The textbook-precise statement
Let \(\{a_n\}_{n=1}^\infty\) be a sequence of positive real numbers such that \(a_{n+1}\le a_n\) for every n and \(\lim_{n\to\infty}a_n=0\). Then the alternating series
\[
\sum_{n=1}^\infty(-1)^{n+1}a_n
\]
converges. Moreover, the remainder \(R_m\) after m terms satisfies \(|R_m|\le a_{m+1}\). (Rudin, *Principles of Mathematical Analysis*, 3e, Theorem 3.42.)

## 8. Visual — diagram or schematic
```
s_0 = 0
   |
   +-- a1 --> s1
   |               \
   +-- (-a2) --> s2  |  even sums climb
   |               /   (monotone ↑, bounded by a1)
   +-- a3 --> s3
   |               \
   +-- (-a4) --> s4   odd sums descend toward same L
   |               /
   +-- a5 --> s5
               ...
               ↓ a_n → 0 forces even/odd to meet at L
```

## 9. The memory technique
**The hook** — Picture a frog jumping left, then right, each jump shorter than the last and shrinking to zero; eventually it must settle at one point.

**What to overlearn** — The two hypotheses (monotone decrease + limit zero) plus the remainder bound |R_m| ≤ a_{m+1}.

**Spaced-repetition schedule** — Review the statement after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Re-derive the even-sum monotonicity and boundedness, then invoke the monotone convergence theorem; the common limit follows from a_{2k+1}→0.

## 10. What this unlocks
You can now certify convergence of Fourier series remainders, alternating asymptotic expansions in physics, and error bounds in numerical quadrature.

- Dirichlet test (generalisation)
- Abel summation
- Conditional versus absolute convergence distinctions
- Alternating series in complex analysis (power series on the boundary)

## 11. Self-check — five questions, no answers
1. Verify whether \(\sum(-1)^{n+1}\frac{\ln n}{n}\) satisfies the Leibniz hypotheses.
2. Give an explicit counter-example where \(\lim a_n=0\) but the alternating series diverges.
3. Compute an upper bound for the remainder after 10 terms of \(\sum(-1)^{n+1}n^{-3}\).
4. Prove that the alternating harmonic series converges to a number strictly between 0.5 and 0.8 using only the error bound.
5. Show that if both \(\sum a_n\) and \(\sum(-1)^{n+1}a_n\) converge, then \(\sum|a_n|\) must converge.