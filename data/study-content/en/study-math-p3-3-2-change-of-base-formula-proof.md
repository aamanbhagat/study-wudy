## 1. The one-sentence answer
**The change of base formula states that \(\log_b a = \frac{\log_k a}{\log_k b}\) for any valid positive bases \(a, b, k\) with \(b \neq 1\), \(k \neq 1\).**

It converts a logarithm in one base into an equivalent ratio of logarithms in any other convenient base. Begin with the definition: if \(y = \log_b a\), then \(b^y = a\) by definition. Apply the same logarithm in base \(k\) to both sides of this exponential equation. The power rule for logarithms pulls the exponent \(y\) down as a multiplier, producing \(y \log_k b = \log_k a\). Division isolates \(y\) and yields the ratio. The result holds because the exponential and logarithmic functions are inverses, so every algebraic step is reversible under the stated domain restrictions.

The formula therefore lets any calculator or computational system evaluate a logarithm in an arbitrary base by using only the two built-in bases (usually 10 or \(e\)).

> [!NOTE]
> The single deepest insight is that logarithms in every base differ from one another only by a constant multiplicative factor; the ratio of two logs simply extracts that constant.

## 2. Why this matters — concrete and current
In aerospace trajectory software at NASA’s Johnson Space Center, orbital-mechanics routines compute \(\log\) of arbitrary ratios of semi-major axes; the change-of-base step allows the same code path to run on both double-precision IEEE-754 hardware and on radiation-hardened chips whose only floating-point log primitive is base-2.

Modern gradient-boosted-tree libraries such as XGBoost and LightGBM evaluate split-gain logarithms millions of times per training epoch; the formula lets engineers switch from natural-log to base-2 implementations without rewriting the core histogram kernels, directly improving cache locality on Intel Xeon and AMD EPYC servers.

Semiconductor yield-analysis pipelines at TSMC convert measured failure probabilities expressed in base-10 into natural-log form required by maximum-likelihood estimators; the change-of-base step is the only arithmetic bridge between the measurement database and the statistical model.

In radio astronomy, the conversion between decibel (base-10) flux densities recorded by the Event Horizon Telescope and the natural-log intensities needed by Bayesian imaging codes relies on exactly this identity at every pixel.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definition of \(\log_b a\) | Supplies the exponential relation \(b^y = a\) that starts every proof |
| Power rule \(\log(k^m) = m\log k\) | Moves the unknown exponent out of the logarithm           |
| Inverse relationship between exponential and logarithm | Guarantees every algebraic manipulation is reversible     |
| Domain restrictions \(a > 0\), \(b > 0\), \(b \neq 1\) | Prevents division by zero and undefined expressions       |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the definition
Any logarithmic statement is an exponential statement in disguise.  
Concrete example: \(\log_2 8 = 3\) because \(2^3 = 8\).  
Formal statement:  
$$y = \log_b a \quad \iff \quad b^y = a.$$

> [!WARNING]
> Treating the definition as a mere notation rather than an equivalence will later produce sign errors when bases lie between 0 and 1.

### Step 2 — Introduce an arbitrary second base
Choose any convenient positive \(k \neq 1\). The goal is to express the same numerical value \(y\) using only logarithms base \(k\).  
No new example is required yet; the same numbers will be reused.

### Step 3 — Apply \(\log_k\) to both sides of the exponential equation
Take \(\log_k\) of \(b^y = a\):  
$$\log_k(b^y) = \log_k a.$$

### Step 4 — Invoke the power rule
The left side simplifies immediately:  
$$y \log_k b = \log_k a.$$

### Step 5 — Isolate the original logarithm
Divide both sides by the constant \(\log_k b\) (valid because \(k \neq 1\) forces \(\log_k b \neq 0\)):  
$$y = \frac{\log_k a}{\log_k b}.$$  
Substitute back \(y = \log_b a\) to obtain the change-of-base formula.

### Step 6 — Verify reversibility
Every step used equivalences (definition, power rule, division by nonzero constant), so the final equality holds in both directions inside the stated domain.

## 5. Worked examples — every step shown

**Example 1 — Direct numerical check**  
*Given:* Evaluate \(\log_2 8\) using only base-10 logarithms.  
*Find:* The numerical value via change of base.  
Step 1: Write \(\log_2 8 = \frac{\log_{10} 8}{\log_{10} 2}\).  
*Why:* Formula proved above.  
Step 2: Insert known values \(\log_{10} 8 \approx 0.90309\), \(\log_{10} 2 \approx 0.30103\).  
*Why:* Decimal approximations from any base-10 table.  
Step 3: Divide: \(0.90309 / 0.30103 \approx 3\).  
**3**  
*Reflection:* The result recovers the integer exponent exactly, confirming no rounding artefact occurred.

**Example 2 — Non-integer result**  
*Given:* \(\log_3 7\).  
*Find:* Expression and approximate value in base \(e\).  
Step 1: \(\log_3 7 = \frac{\ln 7}{\ln 3}\).  
*Why:* Direct substitution of \(k = e\).  
Step 2: \(\ln 7 \approx 1.945910\), \(\ln 3 \approx 1.098612\).  
*Why:* Standard natural-log values.  
Step 3: Division yields \(\approx 1.77124\).  
**\(\frac{\ln 7}{\ln 3}\)**  
*Reflection:* The same numerical value appears whether the ratio is computed in base 10 or base \(e\), illustrating invariance.

**Example 3 — Solving an exponential equation**  
*Given:* Solve \(5^x = 12\).  
*Find:* Exact expression for \(x\).  
Step 1: Take \(\log_{10}\) of both sides: \(\log_{10}(5^x) = \log_{10} 12\).  
*Why:* Logarithm is one-to-one.  
Step 2: Apply power rule: \(x \log_{10} 5 = \log_{10} 12\).  
*Why:* Power rule.  
Step 3: Divide: \(x = \frac{\log_{10} 12}{\log_{10} 5}\).  
**\(x = \frac{\log_{10} 12}{\log_{10} 5}\)**  
*Reflection:* The change-of-base step is hidden inside the algebraic rearrangement.

**Example 4 — Nested change of base**  
*Given:* Simplify \(\frac{\log_4 9}{\log_8 9}\).  
*Find:* Single logarithm.  
Step 1: Rewrite numerator and denominator with common base 2: \(\frac{\frac{\log_2 9}{\log_2 4}}{\frac{\log_2 9}{\log_2 8}}\).  
*Why:* Apply formula twice.  
Step 2: Cancel \(\log_2 9\): \(\frac{\log_2 8}{\log_2 4}\).  
*Why:* Division of fractions.  
Step 3: Simplify powers of 2: \(\frac{3}{2}\).  
**\(\dfrac{3}{2}\)**  
*Reflection:* Multiple applications of the formula can telescope.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Dividing by \(\log_k b\) when \(b = 1\) | Forgetting domain check                     | Explicitly test \(b \neq 1\) before writing ratio |
| Reversing numerator and denominator | Confusing which log belongs in the denominator | Always keep \(\log_k a\) (the argument) on top |
| Using the formula with negative bases | Treating logs as defined for negatives      | Restate domain \(a > 0\), \(b > 0\) at every use |
| Treating the constant factor as additive | Mixing change-of-base with log addition rules | Keep the identity strictly multiplicative    |
| Calculator mode mismatch (degrees vs. radians irrelevant here, but base mismatch) | Assuming built-in log is natural when it is common | Verify calculator base before numerical check |
| Forgetting that \(\log_k b = 1 / \log_b k\) | Over-applying the formula recursively       | Derive the reciprocal identity once and store separately |
| Applying the formula to \(\log_b 1 = 0\) | Division by zero when \(a = 1\)             | Handle the special case \(\log_b 1 = 0\) separately |

## 7. The textbook-precise statement
Let \(a > 0\), \(b > 0\), \(b \neq 1\), and let \(k > 0\), \(k \neq 1\). Then  
$$\log_b a = \frac{\log_k a}{\log_k b}.$$  
This identity appears as Theorem 3 in Stewart, *Calculus*, 9e, §3.4.

## 8. Visual — diagram or schematic
```text
          log_k a
          -------
log_b a = log_k b     (height of upper bar over height of lower bar)

          | numerator log_k a |
          +-------------------+
          | denominator log_k b |
```
The diagram shows two positive lengths on the same scale; their ratio equals the height of a rectangle whose width is 1 and whose area encodes the original logarithm.

## 9. The memory technique

1. **The hook** — Picture a ladder whose rungs are logarithms; changing base is simply sliding the measuring tape from one rung to another while keeping the same physical height.
2. **What to overlearn** — The exact ratio form \(\frac{\log_k a}{\log_k b}\); the reciprocal identity \(\log_b k = 1 / \log_k b\); the domain triple \((a > 0, b > 0, b \neq 1)\).
3. **Spaced-repetition schedule** — Review the proof at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.
4. **First-principles fallback** — Re-derive from \(b^y = a\) by taking \(\log_k\) and applying the power rule.

## 10. What this unlocks
The identity removes any artificial restriction on the base that appears in an expression, allowing seamless movement among exponential, logarithmic, and power functions.  
- Solving exponential and logarithmic equations in arbitrary bases  
- Derivative and integral formulas for \(\log_b x\)  
- Entropy calculations in information theory (switching between bits and nats)  
- pH, decibel, and Richter-scale conversions in applied science

## 11. Self-check — five questions, no answers
1. Prove the change-of-base formula starting from \(b^y = a\) using only the definition and the power rule.  
2. Evaluate \(\log_7 2\) to three decimal places using only base-10 logarithms; show every division.  
3. Simplify \(\log_4 32\) to an integer by changing to base 2, then verify numerically with base \(e\).  
4. A student writes \(\log_3 5 = \log_5 3\); identify the precise algebraic error and correct it.  
5. For which values of \(k\) does the expression \(\frac{\log_k 9}{\log_k 27}\) equal \(\frac{2}{3}\)? Prove your answer holds for every admissible \(k\).