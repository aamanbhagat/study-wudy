## 1. The one-sentence answer
**The first derivative test uses the sign of \(f'(x)\) to determine where a differentiable function \(f\) is increasing or decreasing and to classify its local extrema at critical points.**

A function increases when its derivative stays positive because the tangent slopes point upward, and it decreases when the derivative stays negative. Critical points occur where \(f'(x)=0\) or \(f'(x)\) does not exist; the test checks whether the derivative changes sign around each such point. A sign change from positive to negative marks a local maximum, while negative to positive marks a local minimum; no sign change means the point is neither.

This approach converts the abstract notion of “slope” into concrete interval-wise behaviour without needing second derivatives. It directly answers how the graph bends around stationary points by tracking only the first derivative’s sign chart.

> [!NOTE]
> The single “aha” is that a derivative sign chart turns every critical point into a clear local max or min decision by recording only where the slope flips direction.

## 2. Why this matters — concrete and current
SpaceX uses the first derivative test inside trajectory optimisers to locate the exact burn times that maximise payload while keeping acceleration within structural limits; the sign changes of the thrust-derivative function flag the switch from ascent to pitch-over phases.  

In semiconductor process control at TSMC, engineers model wafer temperature as a function of heater power; the test identifies local minima of thermal gradients that prevent dopant diffusion defects during rapid thermal annealing.  

Gradient-descent training loops at OpenAI rely on the same sign logic to detect when a loss surface has passed a local valley; an automated scheduler pauses and restarts from a new initialisation precisely when the first-derivative sign pattern indicates a saddle rather than a minimum.  

Particle physicists at CERN apply the test to the likelihood function of Higgs-boson decay channels; local maxima of the likelihood surface locate the mass value that best fits observed collision data before full profile-likelihood scans begin.  

Autonomous-vehicle planners at Waymo examine the derivative of projected collision risk with respect to steering angle; sign changes reveal the safest local heading that minimises instantaneous risk before the planner commits to a lane-change manoeuvre.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definition of derivative | Supplies the slope \(f'(x)\) whose sign we will read      |
| Continuity on an interval| Guarantees that sign changes can only occur at critical points |
| Critical-point definition| Tells us exactly where to test for sign changes           |
| Limit of a quotient      | Underpins why \(f'(x)>0\) forces the function to rise     |

If any row above feels shaky, pause and review that single idea before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Slope controls direction
If the tangent line at every point inside an interval has positive slope, the function values must rise as \(x\) grows.  
Example: \(f(x)=x^3-3x\) on \((0,1)\). Here \(f'(x)=3x^2-3>0\) for \(x>\sqrt{1}\), so \(f\) increases.  
Formal statement: If \(f'(x)>0\) for all \(x\in(a,b)\), then \(f\) is strictly increasing on \([a,b]\).  
> [!WARNING]  
> Forgetting that the inequality must hold for every \(x\) in the open interval, not merely at endpoints, produces false “increasing” claims on intervals containing a hidden zero of \(f'\).

### Step 2 — Critical points are the only places sign can flip
Because \(f'\) is continuous wherever \(f\) is differentiable, the only locations where \(f'\) can change sign are the zeros of \(f'\) or points where \(f'\) fails to exist.  
Example: \(f(x)=|x|\) at \(x=0\); \(f'\) does not exist, yet the sign of the difference quotient flips.  
Formal statement: Let \(c\) be an interior point of the domain. If \(f'(c)=0\) or \(f'(c)\) undefined, then \(c\) is a candidate for a local extremum.

### Step 3 — Construct the sign chart
Factor \(f'(x)\) and mark its roots on the real line; test one point in each open sub-interval to record the sign of \(f'\).  
Example: \(f'(x)=x(x-2)\). Roots \(0,2\) divide \(\mathbb{R}\) into \((-\infty,0)\), \((0,2)\), \((2,\infty)\). Test points \(-1\), \(1\), \(3\) give signs \(+\), \(-\), \(+\).

### Step 4 — Read local extrema from sign changes
A change “+ to −” at a critical point signals a local maximum; “− to +” signals a local minimum; no change signals neither.  
Formal statement (first derivative test): Suppose \(f\) is continuous at \(c\) and differentiable on a deleted neighbourhood of \(c\). If \(f'\) changes from positive to negative at \(c\), then \(f\) has a local maximum at \(c\); if from negative to positive, a local minimum.

### Step 5 — Increasing/decreasing intervals follow directly
Once the sign chart is complete, write the union of intervals carrying a “+” sign as the increasing set and “−” as the decreasing set.  
This yields the complete monotonicity portrait of \(f\) on its domain.

## 5. Worked examples — har step show karo

**Example 1 — Cubic with two turning points**  
*Given:* \(f(x)=x^3-3x\).  
*Find:* Intervals of increase/decrease and local extrema.  
\(f'(x)=3x^2-3=3(x^2-1)\).  
Critical points: \(x=\pm1\).  
Sign chart: \(f'>0\) on \((-\infty,-1)\cup(1,\infty)\); \(f'<0\) on \((-1,1)\).  
Local max at \(x=-1\) (\(+ \to -\)), local min at \(x=1\) (\(- \to +\)).  
**Increasing on \((-\infty,-1]\cup[1,\infty)\), decreasing on \([-1,1]\).**  
*Reflection:* The example is simple because the quadratic factors cleanly; the same chart immediately supplies both monotonicity and extrema.

**Example 2 — Rational function with vertical asymptote**  
*Given:* \(f(x)=\frac{x^2}{x-1}\).  
*Find:* Behaviour around the critical point.  
\(f'(x)=\frac{x(x-2)}{(x-1)^2}\).  
Critical points: \(x=0,2\) (note \(x=1\) is undefined).  
Sign chart on \((-\infty,1)\cup(1,\infty)\): \(f'>0\) on \((-\infty,0)\cup(2,\infty)\), \(f'<0\) on \((0,1)\cup(1,2)\).  
Local max at \(x=0\), local min at \(x=2\).  
**Increasing on \((-\infty,0]\cup[2,\infty)\), decreasing on \([0,1)\cup(1,2]\).**  
*Reflection:* The discontinuity at \(x=1\) splits the domain; each piece receives its own sign test.

**Example 3 — Function whose derivative does not exist**  
*Given:* \(f(x)=x^{2/3}\).  
*Find:* Classification at \(x=0\).  
\(f'(x)=\frac{2}{3}x^{-1/3}\).  
\(f'\) undefined at \(x=0\); \(f'>0\) on both sides.  
No sign change, hence neither max nor min.  
**\(f\) is strictly increasing on \(\mathbb{R}\).**  
*Reflection:* The cusp shows that an undefined derivative alone does not guarantee an extremum.

**Example 4 — Higher-degree polynomial**  
*Given:* \(f(x)=x^4-4x^3+4x^2\).  
*Find:* All local extrema.  
\(f'(x)=4x^3-12x^2+8x=4x(x^2-3x+2)=4x(x-1)(x-2)\).  
Roots: \(0,1,2\).  
Sign changes: \(0\) (+ to −) local max; \(1\) (− to +) local min; \(2\) (+ to −) local max.  
**Local max at \(x=0\) and \(x=2\); local min at \(x=1\).**  
*Reflection:* Three critical points require testing four intervals; systematic factoring prevents sign errors.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Testing only at the critical point| Students forget sign must flip on both sides| Always evaluate one point left and one right |
| Ignoring points where \(f'\) undefined | Over-focus on solving \(f'=0\)             | List both zeros and undefined points first   |
| Forgetting domain splits          | Rational functions have vertical asymptotes | Factor denominator before drawing intervals  |
| Assuming every sign change is extremum | Misses flat points like \(x^3\) at 0     | Verify the sign actually reverses            |
| Using closed intervals for sign test | Endpoints may hide interior zeros         | Test only open intervals between critical points |
| Mixing increasing with non-decreasing | Forgets strict inequality                   | State “strictly” when \(f'>0\) everywhere    |
| Calculator sign errors            | Rounding hides exact zeros                  | Keep exact algebraic factors until the end   |

## 7. The textbook-precise statement
Let \(f\) be continuous on a closed interval \([a,b]\) and differentiable on \((a,b)\). Suppose \(c\in(a,b)\). If \(f'(x)>0\) for all \(x\in(a,c)\) and \(f'(x)<0\) for all \(x\in(c,b)\), then \(f\) attains a local maximum at \(c\). The symmetric statement holds for a local minimum when the inequalities reverse. (Stewart, *Calculus*, 9e, §4.3, First Derivative Test.)

## 8. Visual — diagram or schematic
```
          f'
+         -         +
-----•---------•---------•-----
    -1        0        1     x
   local max       local min
```
Horizontal axis labelled \(x\), vertical dashes mark critical points; “+” and “−” record the sign of \(f'\) in each interval. The function itself rises, peaks, falls, then rises again.

## 9. The memory technique
1. **The hook** — Picture a ski slope: whenever the slope sign flips from “up” to “down” you crest a local summit; “down” to “up” you reach a local valley.  
2. **What to overlearn** — The exact wording of the first derivative test and the three-line sign-chart procedure.  
3. **Spaced-repetition schedule** — Review the sign-chart template after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the sign of \(f'\) from the definition \(f'(c)=\lim_{h\to0}\frac{f(c+h)-f(c)}{h}\) on each side of \(c\); the sign of the difference quotient tells monotonicity directly.

## 10. What this unlocks
Mastery of the first derivative test lets you sketch graphs, optimise functions, and prepare for the second derivative test and concavity arguments.  

- Curve sketching in Calculus I  
- Optimisation word problems (max/min applications)  
- Introduction to Taylor polynomials via higher-order tests  
- Gradient-based methods in multivariable calculus and machine learning  

## 11. Self-check — five questions, no answers
1. For \(f(x)=x^4-2x^2\), locate and classify all local extrema using only the first derivative test.  
2. Construct the sign chart of \(g'(x)\) where \(g(x)=\frac{x+1}{x^2-4}\) and state the open intervals of increase.  
3. True or false: if \(f'(c)=0\) then \(c\) must be a local extremum. Give a counter-example if false.  
4. A function has a vertical tangent at \(x=0\) where the derivative changes from negative to positive; is this a local minimum? Explain.  
5. Given only the factored form \(h'(x)=x(x+2)(x-3)^2\), list every local extremum and justify each classification without computing \(h(x)\).