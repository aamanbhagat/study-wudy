## 1. The one-sentence answer
**Solving a trigonometric equation means locating every angle whose sine, cosine or tangent equals a given value, first by writing an infinite family of solutions that accounts for periodicity and symmetry, then by extracting the finite subset that lies inside any prescribed interval.**

The sine function repeats its values every \(2\pi\) radians and is symmetric about \(\pi/2\) inside each period. Consequently any equation \(\sin\theta = k\) possesses solutions spaced \(\pi\) apart once a single reference angle is known. The same periodicity governs cosine and tangent, but the spacing and symmetry points differ for each function. Mastering the general solution therefore reduces every trig equation to two mechanical tasks: locate one principal angle, then apply the appropriate arithmetic progression.

When a closed interval such as \([0,2\pi)\) is supplied, the general solution is evaluated at successive integers until the angles fall outside the interval; the survivors are the required particular solutions. This procedure works uniformly for linear combinations of sine and cosine once they have been rewritten in single-function form.

> [!NOTE]
> The single most powerful observation is that every trigonometric equation ultimately reduces to one of three prototype statements—\(\sin\theta=\sin\alpha\), \(\cos\theta=\cos\alpha\), or \(\tan\theta=\tan\alpha\)—each of which possesses an explicit two-parameter general solution.

## 2. Why this matters — concrete and current
In phased-array radar design at Raytheon, engineers solve \(\sin\theta = c/v\) repeatedly to steer beams; the general solution supplies every admissible steering angle inside one mechanical rotation of the array.

Spacecraft attitude-control software on NASA’s Artemis missions linearises small-angle approximations but falls back to exact inverse-cosine solutions when quaternion error exceeds a threshold; the solver must return only angles inside \([0,2\pi)\) to avoid gimbal-lock discontinuities.

Inside the Hough-transform stage of OpenCV’s line-detection pipeline, the equation \(\theta = \arctan(m)\) is solved for every candidate slope; restricting solutions to \([0,\pi)\) eliminates duplicate lines and halves memory traffic.

Semiconductor metrology tools at ASML measure overlay error by solving systems of the form \(A\sin\phi + B\cos\phi = C\); converting to a single sine and extracting the two solutions per period yields sub-nanometre stage corrections at 100 kHz update rates.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Unit-circle definitions of sine, cosine, tangent | Supplies the reference angles and symmetry points         |
| Periodicity: \(2\pi\) for sine/cosine, \(\pi\) for tangent | Determines the spacing of successive solutions            |
| Inverse sine, cosine, tangent ranges | Guarantees a unique principal value from which all others are generated |
| Interval notation and inequalities | Allows systematic selection of solutions inside a given range |

## 4. Building the idea — from intuition to formalism

### Step 1 — Locate one reference angle
Any equation \(\sin\theta = k\) with \(|k|\le 1\) possesses at least one solution in \([0,\pi/2]\). Compute \(\alpha=\arcsin|k|\).  
Example: \(\sin\theta=0.5\) yields \(\alpha=\pi/6\).  
Formal statement: \(\alpha=\arcsin|k|\) where \(\alpha\in[0,\pi/2]\).  
> [!WARNING]  
> Using \(\arcsin k\) directly when \(k<0\) places the reference angle in the wrong quadrant and shifts every subsequent solution by \(\pi\).

### Step 2 — Exploit reflection symmetry inside one period
Sine is positive in the first and second quadrants. The second solution inside \([0,2\pi)\) is therefore \(\pi-\alpha\).  
Example: \(\pi-\pi/6=5\pi/6\).  
Formal statement: if \(\sin\theta=\sin\alpha\) then one pair of solutions is \(\alpha\) and \(\pi-\alpha\).

### Step 3 — Add the fundamental period
Both sine and cosine repeat every \(2\pi\). Adding integer multiples of \(2\pi\) therefore generates all further solutions.  
Formal statement: \(\theta=\alpha+2n\pi\) and \(\theta=\pi-\alpha+2n\pi\), \(n\in\mathbb{Z}\).

### Step 4 — Condense into a single compact formula
The two families may be written together by introducing an alternating sign:  
\[
\theta=n\pi+(-1)^n\alpha,\qquad n\in\mathbb{Z}.
\]
Verification for \(n\) even and odd recovers the two arithmetic progressions of Step 3.

### Step 5 — Adapt the pattern to cosine and tangent
Cosine symmetry yields \(\theta=2n\pi\pm\alpha\). Tangent, being odd and \(\pi\)-periodic, collapses to the single family \(\theta=n\pi+\alpha\). These three prototype statements cover every elementary trigonometric equation after algebraic reduction.

### Step 6 — Restrict to a closed interval
Substitute successive integers \(n\) into the general solution and retain only those values that satisfy the given inequalities. Because the spacing is constant, at most a handful of integers need checking.

## 5. Worked examples — every step shown

**Example 1 — Linear sine equation**  
*Given:* \(\sin\theta=1/2\).  
*Find:* all real solutions.  
Step: \(\alpha=\arcsin(1/2)=\pi/6\).  
*Why:* definition of principal value.  
Step: apply prototype formula \(\theta=n\pi+(-1)^n(\pi/6)\).  
*Why:* Step 4 above.  
**Final answer**  
\[\theta=n\pi+(-1)^n\frac{\pi}{6},\quad n\in\mathbb{Z}\]

*Reflection:* once the reference angle is correct, the remainder is purely mechanical; the same template applies to any constant right-hand side.

**Example 2 — Cosine equation inside an interval**  
*Given:* \(\cos\theta=-\sqrt{3}/2\), \(0\le\theta<2\pi\).  
*Find:* solutions in the interval.  
Step: \(\alpha=\arccos(\sqrt{3}/2)=\pi/6\).  
*Why:* reference angle ignores sign.  
Step: cosine prototype \(\theta=2n\pi\pm\pi/6\).  
*Why:* Step 5.  
Step: test \(n=0\): \(\pi/6,11\pi/6\); \(n=1\): \(13\pi/6>2\pi\) (discard).  
*Why:* interval bounds.  
**Final answer**  
\[\theta=\frac{11\pi}{6}\]  
(only value inside \([0,2\pi)\))

*Reflection:* cosine spacing is twice that of sine, halving the number of candidates per period.

**Example 3 — Tangent equation**  
*Given:* \(\tan\theta=\sqrt{3}\).  
*Find:* general solution.  
Step: \(\alpha=\arctan\sqrt{3}=\pi/3\).  
*Why:* principal value.  
Step: tangent prototype \(\theta=n\pi+\pi/3\).  
*Why:* \(\pi\)-periodicity.  
**Final answer**  
\[\theta=n\pi+\frac{\pi}{3},\quad n\in\mathbb{Z}\]

*Reflection:* tangent’s shorter period collapses two families into one.

**Example 4 — Linear combination**  
*Given:* \(\sqrt{3}\sin\theta+\cos\theta=1\), \(0\le\theta\le\pi\).  
*Find:* solutions in the interval.  
Step: rewrite as \(R\sin(\theta+\phi)=1\) where \(R=2\), \(\phi=\pi/6\).  
*Why:* auxiliary-angle identity.  
Step: \(\sin(\theta+\pi/6)=1/2\).  
*Why:* divide by \(R\).  
Step: \(\theta+\pi/6=n\pi+(-1)^n(\pi/6)\).  
Step: solve for \(\theta\) and test \(n=0,1,2\).  
*Why:* interval length \(\pi\) admits at most three candidates.  
**Final answer**  
\[\theta=\frac{\pi}{3},\frac{2\pi}{3}\]

*Reflection:* reduction to a prototype is always the first non-trivial move.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting the \(\pi\)-shift for negative sine values | Students apply \(\arcsin k\) directly without quadrant check | Always compute \(\alpha=\arcsin|k|\) first, then place signs via the prototype formula |
| Using \(2n\pi\) spacing for tangent | Confusion between periods of sine and tangent | Memorise that tangent repeats every \(\pi\) |
| Losing solutions when dividing by \(\cos\theta\) | Division by zero or by a trig function that can vanish | Move all terms to one side before dividing; factor instead |
| Reporting only positive \(n\) in general solution | Belief that negative integers are unnecessary | Substitute \(n\) and \(-n-1\) to verify both directions are covered |
| Interval endpoints counted twice | Closed interval notation misread | Evaluate the general solution at the exact endpoints and include only once |
| Mixing degree and radian mode on calculators | Calculator default setting | Explicitly append “rad” or convert \(\alpha\) to radians before adding multiples |
| Ignoring extraneous roots after squaring | Squaring both sides of an equation | Substitute candidate solutions back into the original equation |

## 7. The textbook-precise statement
Let \(\alpha\) be any real number. The complete solution sets are:

\[
\sin\theta=\sin\alpha\iff\theta=n\pi+(-1)^n\alpha,\quad n\in\mathbb{Z},
\]

\[
\cos\theta=\cos\alpha\iff\theta=2n\pi\pm\alpha,\quad n\in\mathbb{Z},
\]

\[
\tan\theta=\tan\alpha\iff\theta=n\pi+\alpha,\quad n\in\mathbb{Z}.
\]

When solutions are required inside a half-open interval \([a,b)\), substitute successive integers \(n\) and retain those \(\theta\) satisfying \(a\le\theta<b\). (Stewart, *Calculus*, 9e, §3.4.)

## 8. Visual — diagram or schematic

```text
          2π
   ────────●───────────────●───────────────
          / \             / \
         /   \           /   \
        /     \         /     \
   α   /       \   π-α /       \
      /         \     /         \
     /           \   /           \
────●─────────────●───────────────●────  θ
   0             π             2π
```
Labelled points: reference angle \(\alpha\), reflection \(\pi-\alpha\), then each subsequent pair shifted by \(2\pi\).

## 9. The memory technique

1. **The hook** — Picture a sine wave bouncing between two mirrors placed at 0 and \(\pi\); each bounce flips the sign and adds another \(\pi\) step.
2. **What to overlearn** — The three prototype formulae exactly as written in Section 7; the conversion \(R\sin(\theta+\phi)\) identity.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Return to the unit circle, mark the two intersections with a horizontal line at height \(k\), then add \(2\pi\) repeatedly.

## 10. What this unlocks
The ability to solve trig equations is the gateway to Fourier analysis, differential-equation boundary-value problems, and all phasor arithmetic in electrical engineering.  

- Linear differential equations with constant coefficients  
- Fourier-series coefficient formulae  
- Complex-impedance calculations  
- Stability criteria for sampled-data control systems  

## 11. Self-check — five questions, no answers
1. Write the general solution of \(\sin\theta=-\frac12\) and list the four smallest positive values.  
2. Solve \(\cos2\theta=\frac12\) for \(\theta\in[0,2\pi)\). How many solutions exist?  
3. An equation \(\tan\theta=k\) is known to have a solution at \(\theta=5\pi/4\). What is \(k\)?  
4. After rewriting \(3\sin\theta+4\cos\theta=5\) in single-sine form, one obtains \(R=5\). Why does this guarantee solutions exist, and how many appear in any interval of length \(2\pi\)?  
5. A careless student writes the general solution of \(\sin\theta=0.8\) as \(\theta=2n\pi+\arcsin(0.8)\). Which solutions are missing, and why?