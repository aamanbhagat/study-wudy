## 1. The one-sentence answer
**Curve sketching is the ordered application of limits, first and second derivatives, and algebraic features to produce an accurate graph of a function using only a finite number of calculated points and intervals.**

The method begins with the function’s algebraic skeleton—its domain and any obvious symmetries or factorizations—then layers on information that derivatives supply about monotonicity and curvature. Each new derivative test carves the real line into intervals whose sign patterns dictate where the graph rises or falls and where it bends upward or downward. The final sketch assembles these intervals, the special points they contain, and any asymptotic behavior into a single coherent curve.

Because the procedure never requires dense point-plotting, it scales to functions whose explicit values are expensive or impossible to compute by hand. It also reveals global shape features—such as the existence of local extrema or inflection points—that numerical sampling alone can miss.

> [!NOTE]
> The decisive insight is that the sign chart of \(f'\) and \(f''\) partitions the domain into a small number of qualitatively uniform pieces; once those pieces and their boundary points are known, the entire graph is determined up to a rigid vertical translation fixed by a single intercept.

## 2. Why this matters — concrete and current
Aerospace trajectory teams at NASA’s Jet Propulsion Laboratory sketch the zero-effort-miss curves of candidate gravity-assist paths before running high-fidelity integrators; the monotonicity intervals supplied by the first derivative immediately expose corridors that cannot reach the target without thrust.

Semiconductor process engineers at TSMC plot the capacitance–voltage curves of MOS transistors during device modeling; concavity changes detected by the second derivative flag the onset of depletion-region effects that govern leakage current.

Quantitative analysts at Jane Street construct implied-volatility surfaces from option prices; systematic sketches of the resulting functions expose arbitrage boundaries that automated fitting routines occasionally overlook.

Ecologists modeling spruce-budworm outbreaks use the systematic procedure on the Holling-type-III predation term to locate the two stable equilibria whose basins determine whether an outbreak collapses or persists.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Limit evaluation at finite points and infinity | Locates vertical and horizontal asymptotes                |
| First-derivative definition and power rule     | Produces the sign chart that governs increasing/decreasing behavior |
| Second-derivative test or concavity definition | Determines intervals of upward or downward concavity      |
| Critical-point classification                  | Identifies local maxima and minima on the sketch          |
| Polynomial factoring and rational-root theorem | Simplifies intercepts and end-behavior analysis           |

## 4. Building the idea — from intuition to formalism

### Step 1 — Determine the natural domain
The function can be graphed only where it is defined.  
Example: \(f(x)=\sqrt{x-2}\) is defined solely for \(x\ge2\).  
Formal statement: \(\operatorname{dom}(f)=\{x\in\mathbb{R}:f(x)\text{ is defined}\}\).  
> [!WARNING]
> Treating an expression as defined everywhere when a root or denominator vanishes produces nonexistent intervals and phantom asymptotes.

### Step 2 — Locate intercepts
Compute \(f(0)\) and solve \(f(x)=0\).  
Example: \(f(x)=x^2-1\) meets the axes at \((0,-1)\) and \((\pm1,0)\).  
Formal statement: \(y\)-intercept \(=f(0)\); \(x\)-intercepts are roots of \(f(x)=0\).

### Step 3 — Identify all asymptotes
Vertical asymptotes occur where the function tends to \(\pm\infty\); horizontal or oblique asymptotes are read from limits at infinity.  
Example: \(\lim_{x\to0^+}x^{-1}=\infty\) yields a vertical asymptote at \(x=0\).  
Formal statement: if \(\lim_{x\to a}f(x)=\pm\infty\) then \(x=a\) is a vertical asymptote.

### Step 4 — Compute and factor the first derivative
The sign of \(f'\) determines monotonicity.  
Example: \(f'(x)=3x^2-3=3(x-1)(x+1)\).  
Formal statement: \(f'(x)=\frac{d}{dx}f(x)\).

### Step 5 — Build the sign chart for \(f'\)
Test intervals created by the zeros of \(f'\).  
Example: \(f'>0\) on \((-\infty,-1)\cup(1,\infty)\) implies \(f\) is increasing there.  
Formal statement: on each open interval where \(f'\) does not change sign, \(f\) is strictly monotonic.

### Step 6 — Compute and factor the second derivative
The sign of \(f''\) determines concavity.  
Example: \(f''(x)=6x\).  
Formal statement: \(f''(x)=\frac{d^2}{dx^2}f(x)\).

### Step 7 — Build the sign chart for \(f''\) and locate inflection points
Zeros of \(f''\) that change sign mark inflection points.  
Example: \(f''\) changes from negative to positive at \(x=0\), so \((0,f(0))\) is an inflection point.

### Step 8 — Assemble the sketch
Plot intercepts, critical points, inflection points, and asymptotes; connect them consistently with the monotonicity and concavity data.  
The completed procedure yields the unique qualitative graph compatible with the collected information.

## 5. Worked examples — every step shown

**Example 1 — Cubic with one real root**  
*Given:* \(f(x)=x^3-3x+2\).  
*Find:* qualitative graph.  
\(f'(x)=3x^2-3=3(x^2-1)\). *Why:* power rule applied termwise.  
Critical points: \(x=\pm1\). *Why:* solve \(f'=0\).  
Sign chart of \(f'\): positive on \((-\infty,-1)\), negative on \((-1,1)\), positive on \((1,\infty)\). *Why:* test points \(-2,0,2\).  
\(f''(x)=6x\). *Why:* differentiate \(f'\).  
Inflection point at \(x=0\). *Why:* \(f''\) changes sign.  
**Final sketch:** local max at \((-1,4)\), local min at \((1,0)\), inflection at origin, ends \(\to\pm\infty\).

**Example 2 — Rational function**  
*Given:* \(f(x)=\frac{x}{x-1}\).  
*Find:* qualitative graph.  
Domain: \(x\neq1\). *Why:* denominator zero.  
Vertical asymptote \(x=1\), horizontal asymptote \(y=1\). *Why:* limits at infinity and at the pole.  
\(f'(x)=-\frac{1}{(x-1)^2}<0\) everywhere defined. *Why:* quotient rule.  
No critical points; strictly decreasing on each component of the domain.  
**Final sketch:** two branches, each approaching \(y=1\) and the line \(x=1\).

**Example 3 — Exponential with linear term**  
*Given:* \(f(x)=xe^{-x}\).  
*Find:* qualitative graph.  
\(f'(x)=e^{-x}(1-x)\). *Why:* product rule.  
Critical point \(x=1\), maximum value \(1/e\).  
\(f''(x)=e^{-x}(x-2)\). *Why:* differentiate \(f'\).  
Inflection at \(x=2\).  
**Final sketch:** rises from origin to \((1,1/e)\), then decays to zero with inflection at \((2,2/e^2)\).

**Example 4 — Function with oblique asymptote**  
*Given:* \(f(x)=x+\frac{1}{x}\).  
*Find:* qualitative graph.  
Domain \(x\neq0\).  
Oblique asymptote \(y=x\) (divide: remainder \(1/x\)).  
\(f'(x)=1-\frac{1}{x^2}\). Critical points \(\pm1\).  
Local max at \(-1\), local min at \(1\).  
**Final sketch:** hyperbola-like branches symmetric about origin, approaching \(y=x\) and \(y=-x\).

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting to restrict domain       | Overlooking roots or denominators                   | Always solve \(f(x)\) defined before any derivative  |
| Sign error in \(f'\) test points    | Arithmetic slip when evaluating at a test value     | Use a consistent test-point list and verify two points per interval |
| Treating a removable discontinuity as an asymptote | Cancelled factor still present in original expression | Factor completely and cancel before limit analysis   |
| Missing an inflection point         | Zero of \(f''\) does not change sign                | Check the sign of \(f''\) on both sides of each candidate |
| Drawing a cusp where \(f'\) only touches zero | Confusing a horizontal tangent with a vertical tangent | Verify that \(f'\) actually changes sign             |
| Ignoring end behavior at finite endpoints | Domain is a closed interval                         | Evaluate one-sided limits at every finite boundary   |
| Plotting an extra unnecessary point | Desire for visual reassurance                       | Trust the monotonicity and concavity intervals; extra points are redundant once signs are known |

## 7. The textbook-precise statement
Let \(f\) be twice differentiable on an open interval \(I\) except possibly at finitely many points. The systematic curve-sketching procedure consists of determining (i) the maximal domain, (ii) intercepts and symmetry, (iii) all vertical, horizontal, and oblique asymptotes via one-sided and infinite limits, (iv) the sign chart of \(f'\) on the resulting intervals, (v) the sign chart of \(f''\) together with inflection points, and (vi) assembling the data into a graph whose local monotonicity and concavity match the sign charts. (Stewart, *Calculus*, 9e, §4.3–4.5.)

## 8. Visual — diagram or schematic
```text
y
↑
|          / inflection
|         /   (0,0)
|   max  /     
| (-1,4)·      
|       |      
|       |  min
|       | (1,0)
|       |      
+-------|------→ x
   -1   0   1
```
Horizontal line at y=0 is the x-axis; vertical dashed line at x=1 would appear for a vertical asymptote in other examples. All monotonicity arrows and concavity bends are implied by the sign charts constructed in Steps 5 and 7.

## 9. The memory technique
1. **The hook** — Picture a detective walking a crime scene: first tape off the domain (the room), then mark the entry and exit points (intercepts), then look for escape routes (asymptotes), then follow the rising/falling footprints (\(f'\)), and finally feel the floor tilt (\(f''\)).

2. **What to overlearn** — The exact quotient and product rules for the two most common rational and exponential families; the three-line algorithm that converts a factored derivative into a sign chart.

3. **Spaced-repetition schedule** — Review the seven-step checklist after 1 day, again after 3 days, 7 days, 16 days, and 35 days, each time sketching one new function from each of the four example classes.

4. **First-principles fallback** — Re-derive the sign-chart meaning of \(f'\) from the definition \(f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}\): a positive limit forces \(f(x+h)>f(x)\) for small positive \(h\), hence the function increases.

## 10. What this unlocks
Mastery of systematic curve sketching supplies the visual language required for optimization problems, related-rates diagrams, and the geometric interpretation of the definite integral.  
- It is presupposed by the first-derivative test for absolute extrema on closed intervals.  
- It supplies the pictures used to justify the mean-value theorem and Taylor’s theorem with remainder.  
- It reappears in multivariable calculus when level curves and gradient fields are sketched.

## 11. Self-check — five questions, no answers
1. Sketch \(f(x)=x^4-2x^2+1\) completely, labeling every critical point and inflection point with coordinates.

2. Without computing any derivatives, decide whether \(g(x)=\frac{x^2+1}{x-2}\) can have a local maximum; justify using only limits and algebra.

3. A function satisfies \(f'(x)>0\) on \((-\infty,0)\), \(f'(x)<0\) on \((0,2)\), and \(f'(x)>0\) on \((2,\infty)\). Must it possess a local minimum at \(x=2\)? Explain.

4. Locate all inflection points of \(h(x)=x^{2/3}(x-3)\) and verify that the concavity change is genuine.

5. Construct the graph of a rational function that possesses both an oblique asymptote and exactly one vertical asymptote, then prove that your sketch is the only one compatible with the derivative sign charts.