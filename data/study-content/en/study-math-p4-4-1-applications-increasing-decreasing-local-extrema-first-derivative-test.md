## 1. The one-sentence answer
**The first derivative test determines where a differentiable function increases or decreases and classifies its local extrema by examining the sign changes of \(f'\) around critical points.**

A function \(f\) is increasing on an interval when its graph rises from left to right; the derivative \(f'\) records the slope at each point, so a positive slope forces the function values to grow. When the slope is negative the function falls. At an isolated point where the slope changes from positive to negative the function reaches a local peak; the opposite sign change produces a local valley. This sign analysis converts the geometric notions of rise and fall into an algebraic procedure performed on \(f'\) alone.

The test therefore rests on two prior facts: the mean-value theorem guarantees that a positive derivative implies strictly increasing behavior, and continuity of \(f'\) (or at least its existence in punctured neighborhoods) lets us read the sign from a single test point in each interval created by the critical points.

> [!NOTE]
> The single deepest insight is that the derivative need not be evaluated everywhere; its sign on each open interval between critical points is completely determined by any convenient test value inside that interval.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover uses real-time slope monitoring derived from first-derivative tests on terrain elevation maps to decide whether a planned drive segment will keep the vehicle on a safe grade; the onboard algorithm flags intervals where the elevation function changes from increasing to decreasing and aborts if a local maximum would strand the rover.

In semiconductor process control, Intel applies the test to the derivative of wafer-thickness functions measured by ellipsometry; a sign change from positive to negative signals an unintended local maximum in thickness that must be corrected before the next lithography step.

Gradient-boosted decision trees in XGBoost rely on the same monotonicity logic when they split features: the algorithm checks whether the partial derivative of the loss with respect to a feature is consistently positive or negative on an interval, exactly mirroring the increasing/decreasing test, before committing to a split that would create a local extremum in the loss surface.

High-frequency trading engines at Jane Street examine the sign of the first derivative of order-book imbalance functions; a change from positive to negative at a critical price level is interpreted as a local maximum in buying pressure and triggers an immediate position unwind.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definition of derivative | Supplies the slope whose sign we read                     |
| Critical points          | The only places where sign changes of \(f'\) can occur    |
| Continuity of \(f\)      | Guarantees that local extrema occur at critical points    |
| Mean-value theorem       | Converts sign of \(f'\) into strict monotonicity          |

## 4. Building the idea — from intuition to formalism

### Step 1 — Slope tells direction of motion
If the tangent line at every point on an interval has positive slope, the function must be rising.  
Example: \(f(x)=x^3\) on \((0,1)\) has \(f'(x)=3x^2>0\), so \(f(0.2)<f(0.8)\).  
Formally, \(f'(x)>0\) for all \(x\in(a,b)\) implies \(f\) is strictly increasing on \([a,b]\).  
> [!WARNING]  
> Forgetting that the inequality is strict allows constant functions (where \(f'=0\)) to be misclassified as increasing.

### Step 2 — Sign chart partitions the domain
Critical points divide the real line into open intervals on which \(f'\) cannot change sign without passing through zero.  
Example: \(f'(x)=x(x-2)\) has roots 0 and 2; the intervals are \((-\infty,0)\), \((0,2)\), \((2,\infty)\).  
Formally, if \(c\) is the only root of \(f'\) in \([a,b]\), then \(f'\) keeps constant sign on each of \((a,c)\) and \((c,b)\).

### Step 3 — Test points reveal the sign
Pick any number inside an interval and evaluate the sign of \(f'\) there; the result holds for the entire interval.  
Example: on \((0,2)\) choose \(x=1\), \(f'(1)=-1<0\).  
Formally, if \(f'(x_0)<0\) and \(x_0\) lies in an interval free of critical points, then \(f'<0\) everywhere in that interval.

### Step 4 — Sign change classifies the extremum
A change from \(+\) to \(-\) at a critical point produces a local maximum; \(-\) to \(+\) produces a local minimum.  
Example: \(f'(x)\) changes \(+\) to \(-\) at \(x=0\) for \(f(x)=-x^2\).  
Formally, if \(f'\) changes sign at \(c\), then \(f\) has a local extremum at \(c\) whose type is read from the direction of the change.

### Step 5 — The first-derivative test (textbook statement)
Let \(f\) be continuous on \([a,b]\) and differentiable on \((a,b)\). Suppose \(c\in(a,b)\) is the only critical point in some neighborhood. If \(f'\) changes from positive to negative at \(c\), then \(f(c)\) is a local maximum; if from negative to positive, a local minimum; if no sign change occurs, \(c\) is neither.

## 5. Worked examples — every step shown

**Example 1 — Simple cubic**  
*Given:* \(f(x)=x^3-3x\).  
*Find:* intervals of increase/decrease and local extrema.  

- Compute \(f'(x)=3x^2-3\). *Why:* differentiate term by term.  
- Solve \(3x^2-3=0\) → \(x=\pm1\). *Why:* factor and apply zero-product rule.  
- Intervals: \((-\infty,-1)\), \((-1,1)\), \((1,\infty)\). *Why:* critical points are the only possible sign-change locations.  
- Test \(x=-2\): \(f'(-2)=9>0\); \(x=0\): \(f'(0)=-3<0\); \(x=2\): \(f'(2)=9>0\). *Why:* one point per interval suffices.  
- Sign change \(+\) to \(-\) at \(x=-1\) → local max; \(-\) to \(+\) at \(x=1\) → local min.  

**\(f\) increases on \((-\infty,-1]\) and \([1,\infty)\), decreases on \([-1,1]\); local max at \((-1,2)\), local min at \((1,-2)\).**

*Reflection:* The example is straightforward because the derivative factors completely; the same sign-chart logic scales to higher-degree polynomials.

**Example 2 — Rational function**  
*Given:* \(f(x)=\frac{x}{x^2+1}\).  
*Find:* local extrema via the first-derivative test.  

- \(f'(x)=\frac{1-x^2}{(x^2+1)^2}\). *Why:* quotient rule.  
- Critical points: \(x=\pm1\). *Why:* numerator zero and denominator never zero.  
- Test points yield sign pattern \(+\) on \((-\infty,-1)\), \(-\) on \((-1,1)\), \(+\) on \((1,\infty)\).  
- Sign changes at both points.  

**Local maximum at \((-1,-1/2)\), local minimum at \((1,1/2)\).**

*Reflection:* The denominator’s positivity simplifies sign reading but does not alter the test itself.

**Example 3 — Function with no extremum**  
*Given:* \(f(x)=x^3\).  
*Find:* classification at \(x=0\).  

- \(f'(x)=3x^2\). *Why:* power rule.  
- Only critical point \(x=0\).  
- \(f'(x)\ge0\) on both sides; no sign change.  

**\(x=0\) is neither local max nor min.**

*Reflection:* Absence of sign change is decisive; students often assume every critical point yields an extremum.

**Example 4 — Piecewise linear derivative**  
*Given:* \(f'(x)=|x-1|-1\).  
*Find:* monotonicity intervals of \(f\).  

- Critical points of \(f\) occur where \(f'=0\), i.e., \(x=0\) and \(x=2\).  
- Sign chart on intervals determined by 0 and 2 shows \(f'<0\) on \((-\infty,0)\), \(f'>0\) on \((0,2)\), \(f'<0\) on \((2,\infty)\).  

**\(f\) decreases on \((-\infty,0]\), increases on \([0,2]\), decreases on \([2,\infty)\).**

*Reflection:* The test works even when \(f'\) is not differentiable, provided \(f'\) exists and we can read its sign.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Assuming every critical point is an extremum | Confusing “necessary” with “sufficient”     | Always verify sign change before declaring extremum |
| Using a test point exactly at a root | Careless interval selection                 | Choose test points strictly inside each open interval |
| Forgetting that \(f'\) may not exist at the point | Overlooking corners or cusps                | Check domain of \(f'\) before drawing sign chart |
| Misreading sign when \(f'\) has even multiplicity | Treating \((x-c)^2\) factor as sign change | Factor completely and count multiplicity     |
| Applying test on closed interval without interior | Boundary points cannot be local extrema in the interior sense | Restrict attention to open intervals around each candidate |
| Ignoring points where \(f'=0\) but \(f'\) does not change sign | Overlooking flat points such as \(x^3\)     | Explicitly compare signs on both immediate sides |
| Confusing increasing with non-decreasing | Allowing \(f'=0\) intervals                 | State “strictly increasing” when \(f'>0\) everywhere |

## 7. The textbook-precise statement
Let \(f\) be continuous on an interval \(I\) and differentiable on the interior of \(I\). Let \(c\) be an interior point of \(I\) such that \(f'(c)=0\) or \(f'(c)\) does not exist, and suppose there exists a punctured neighborhood of \(c\) in which \(f'\) exists. If \(f'\) changes from positive to negative at \(c\), then \(f\) has a local maximum at \(c\); if from negative to positive, a local minimum. (Stewart, *Calculus*, 9e, §4.3, First Derivative Test.)

## 8. Visual — diagram or schematic
```text
f' sign chart          f graph sketch
          +               /\
   ----0-----1-----2---- /  \   /\
          -             /    \/  \
   local max at 0      /          \
   local min at 1     /            \
                     /              \
```
Horizontal axis marked with critical points 0 and 1; plus signs left of 0 and right of 1, minus sign between them. The curve rises to a peak at 0, falls to a valley at 1, then rises again.

## 9. The memory technique

**The hook**  
Picture a hiker carrying a signpost that flips from “UP” to “DOWN” exactly when the trail reaches a summit; the flip occurs only where the slope changes sign.

**What to overlearn**  
1. \(f'>0\) on an interval ⇒ strictly increasing.  
2. Sign change of \(f'\) at an isolated critical point classifies the extremum.  
3. One test point per interval determines the entire sign pattern.

**Spaced-repetition schedule**  
Review the three facts above at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

**First-principles fallback**  
Re-derive the mean-value theorem implication: if \(f'(x)>0\) then for any \(x_1<x_2\) there exists \(\xi\) with \(f(x_2)-f(x_1)=f'(\xi)(x_2-x_1)>0\), hence \(f(x_2)>f(x_1)\).

## 10. What this unlocks
The first-derivative test supplies the monotonicity information required for curve sketching, optimization, and the second-derivative test. It is presupposed by the mean-value theorem applications that follow and by the rigorous definition of concavity.

- Second-derivative test and higher-order tests  
- Global optimization on closed intervals  
- Implicit differentiation and related rates that require monotonicity  
- Introduction to antiderivatives via the fundamental theorem

## 11. Self-check — five questions, no answers
1. For \(f(x)=x^4-2x^2\), locate all intervals of increase and decrease and classify every critical point using only the first-derivative test.  
2. Construct a function whose derivative changes sign at a point yet the function is neither increasing nor decreasing through that point; explain why the test fails.  
3. Given only the sign chart of \(f'\) on \((-\infty,\infty)\) with changes at \(x=2\) and \(x=5\), sketch the qualitative shape of \(f\) and mark all local extrema.  
4. Prove that if \(f'(x)>0\) for all \(x\in(a,b)\) except at one point \(c\) where \(f'(c)=0\), then \(f\) is still strictly increasing on \([a,b]\).  
5. A function satisfies \(f'(x)=(x-1)^2(x+2)\). Without graphing, decide whether \(x=1\) yields a local extremum and justify the conclusion.