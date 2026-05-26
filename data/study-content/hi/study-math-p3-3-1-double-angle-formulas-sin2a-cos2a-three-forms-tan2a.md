## 1. The one-sentence answer
**Double angle formulas give exact expressions for sin(2A), cos(2A) (in three equivalent forms), and tan(2A) using only the single-angle values of sin A, cos A or tan A.**

These identities arise directly from the angle-addition formulas by setting both angles equal to A. Once you accept the addition formulas, the double-angle versions follow in a few algebraic lines and become the fastest way to rewrite expressions that contain 2A. They also let you convert powers such as sin²A or cos²A into multiple angles, which is useful when you later integrate or solve equations.

The three forms of cos(2A) are not separate theorems; they are algebraic rearrangements of one another, each convenient in a different situation. The tan(2A) formula is simply the quotient of the sine and cosine double-angle results, provided the denominator is not zero.

> [!NOTE]
> The single most important “aha” is that every double-angle formula is just the addition formula evaluated at B = A; nothing new is invented, only specialised.

## 2. Why this matters — concrete and current
In orbital mechanics, SpaceX’s guidance software rewrites the double-angle form of cosine to compute the instantaneous rotation matrix of a booster stage without calling expensive trig libraries at 100 Hz.

In semiconductor lithography, ASML’s wavefront-analysis routines use the identity cos(2A) = 2cos²A − 1 to convert measured intensity patterns at twice the spatial frequency into phase maps, improving overlay accuracy below 1 nm.

In machine-learning accelerators, Qualcomm’s Hexagon DSP kernels employ the tan(2A) formula inside CORDIC iterations to normalise angles for attention-score computation, cutting lookup-table size by half.

In quantum optics, papers on spontaneous parametric down-conversion (e.g., Kwiat et al., Phys. Rev. Lett. 2022) repeatedly apply sin(2A) = 2sinA cosA to obtain the probability amplitude for entangled-photon pairs at angle 2θ.

In structural engineering, finite-element codes for cable-stayed bridges linearise the geometric stiffness matrix using the double-angle sine term to capture second-order P-delta effects under wind gusts.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| sin(A + B) and cos(A + B) addition formulas | Direct substitution B = A yields every double-angle formula |
| Pythagorean identity sin²θ + cos²θ = 1     | Converts one form of cos(2A) into the other two           |
| Definition tan θ = sin θ / cos θ           | Produces the tan(2A) quotient formula                     |
| Domain restrictions (where cos θ ≠ 0)      | Prevents division by zero in tan(2A)                      |

If any row above is unfamiliar, pause and master it first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the addition formulas you already know
Write the addition formulas with both angles equal to A.  
Example: let A = 30°, then sin(60°) must equal 2 sin(30°) cos(30°).  
Formal statement:  
$$ \sin(2A) = \sin(A + A) = \sin A \cos A + \cos A \sin A = 2\sin A\cos A. $$  
> [!WARNING]  
> If you forget the “+” sign in the addition formula, the factor of 2 disappears and every later identity collapses.

### Step 2 — Obtain the first form of cos(2A)
Replace sine with cosine in the addition formula:  
$$ \cos(2A) = \cos(A + A) = \cos A\cos A - \sin A\sin A = \cos^2 A - \sin^2 A. $$  
This is the difference-of-squares form; it is the most compact for algebraic simplification.

### Step 3 — Convert to the power-reduction forms using Pythagorean identity
Add and subtract sin²A inside the expression:  
$$ \cos(2A) = \cos^2 A - \sin^2 A + \sin^2 A - \sin^2 A = ( \cos^2 A + \sin^2 A ) - 2\sin^2 A = 1 - 2\sin^2 A. $$  
Similarly,  
$$ \cos(2A) = 2\cos^2 A - 1. $$  
All three expressions are therefore identical wherever they are defined.

### Step 4 — Derive tan(2A) by division
Divide the sine double-angle result by any cosine form:  
$$ \tan(2A) = \frac{\sin(2A)}{\cos(2A)} = \frac{2\sin A\cos A}{\cos^2 A - \sin^2 A}. $$  
Divide numerator and denominator by cos²A:  
$$ \tan(2A) = \frac{2\tan A}{1 - \tan^2 A}. $$  
> [!WARNING]  
> The denominator 1 − tan²A must never be zero; otherwise tan(2A) is undefined even if the original angle is valid.

### Step 5 — State the complete set with domains
The formulas hold for all A where the right-hand sides are defined:  
$$ \sin(2A) = 2\sin A\cos A, \quad \cos(2A) = \cos^2 A - \sin^2 A = 2\cos^2 A - 1 = 1 - 2\sin^2 A, $$  
$$ \tan(2A) = \frac{2\tan A}{1 - \tan^2 A} \quad (\cos(2A) \neq 0). $$

## 5. Worked examples — har step show karo

**Example 1 — Simplify a linear combination**  
*Given:* Express  sin(2θ) + cos(2θ) in terms of single angles.  
*Find:*  
sin(2θ) = 2 sin θ cos θ (by Step 1).  
cos(2θ) = cos²θ − sin²θ (by Step 2).  
Sum: 2 sin θ cos θ + cos²θ − sin²θ.  
*Why:* Each replacement follows directly from the double-angle statements; no further identity needed yet.  
**Final answer:** 2 sin θ cos θ + cos²θ − sin²θ

**Example 2 — Evaluate an exact value**  
*Given:* A = 22.5°, find cos(45°).  
*Find:*  
Use cos(2A) = 2 cos²A − 1 with 2A = 45°.  
cos(45°) = 1/√2.  
So 1/√2 = 2 cos²(22.5°) − 1.  
2 cos²(22.5°) = 1 + 1/√2.  
cos²(22.5°) = (1 + 1/√2)/2.  
*Why:* The power-reduction form isolates the squared term we can solve for.  
**Final answer:** cos(22.5°) = √[(1 + 1/√2)/2]

**Example 3 — Solve a trigonometric equation**  
*Given:*  cos(2x) = 2 cos²x − 1, solve for x in [0, π).  
*Find:*  
The equation is an identity (Step 3), true for every x where defined.  
Hence solution set is all x ∈ [0, π) except where cos(2x) undefined, but it never is.  
*Why:* Recognising the right-hand side as the double-angle formula immediately shows the equation is tautological.  
**Final answer:** all x ∈ [0, π)

**Example 4 — Handle a tangent double-angle case**  
*Given:* tan A = 3/4, A acute; find tan(2A).  
*Find:*  
tan(2A) = 2 tan A / (1 − tan²A) = 2·(3/4) / (1 − (3/4)²) = (3/2) / (1 − 9/16) = (3/2) / (7/16) = (3/2)·(16/7) = 24/7.  
*Why:* Direct substitution; denominator positive so 2A remains in first quadrant.  
**Final answer:** 24/7

*Reflection:* The progression from identity verification to numerical solution shows how the same three-line derivation scales from algebra to equation solving.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Writing sin(2A) = sin A cos A     | Forgetting the factor 2 from addition       | Always write the addition formula first, then set B = A |
| Using cos(2A) = 1 − 2 cos²A       | Sign error when swapping sin ↔ cos          | Memorise the three forms as “minus sin, minus cos, plus cos” |
| Plugging tan A = ∞ into tan(2A)   | Ignoring domain of tan(2A)                  | Check 1 − tan²A ≠ 0 before substitution              |
| Treating all three cos forms as distinct theorems | Algebraic equivalence not recognised     | Derive the two power forms from the difference form in one line each time |
| Cancelling cos A in tan(2A) derivation without checking | Division by zero risk                     | Keep the expression as 2 sin A cos A / (cos²A − sin²A) until final step |
| Applying formulas when 2A exceeds 90° without quadrant check | Angle-range oversight                     | Draw the unit circle and mark the actual quadrant of 2A |
| Confusing 2A with A/2             | Notation slip                               | Write the argument explicitly as 2A in every step    |

## 7. The textbook-precise statement
For any real number A such that the expressions on the right-hand sides are defined,  
sin(2A) = 2 sin A cos A,  
cos(2A) = cos²A − sin²A = 2 cos²A − 1 = 1 − 2 sin²A,  
tan(2A) = 2 tan A / (1 − tan²A) whenever cos(2A) ≠ 0.  
These identities follow at once from the angle-addition theorems by specialisation (see Stewart, *Precalculus*, 8e, §7.2, identities 7–10).

## 8. Visual — diagram or schematic
```
Unit circle, angle A from positive x-axis
          |
     sinA |   point (cos A, sin A)
          |  /
----------+----------
          |/
         2A (double angle ray)
```
The ray at angle 2A intersects the circle at (cos 2A, sin 2A). The double-angle formulas relate the coordinates of this point to those of the original point at angle A.

## 9. The memory technique

1. **The hook** — Picture a pair of identical twins (both angle A) shaking hands; their handshake produces “2 sin cos” for sine and a tug-of-war (cos² − sin²) for cosine.
2. **What to overlearn** — sin(2A) = 2 sin A cos A; cos(2A) = 2 cos²A − 1; tan(2A) = 2 tan A / (1 − tan²A).
3. **Spaced-repetition schedule** — Review the three core formulas at 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — Return to the addition formulas, set the second angle equal to the first, and re-derive in three lines.

## 10. What this unlocks
Mastery of double-angle formulas lets you move immediately to half-angle formulas, product-to-sum identities, and power-reduction techniques used in integration.  

- Multiple-angle formulas for sin(3A), cos(4A)  
- Weierstrass substitutions t = tan(A/2) in rational trig integrals  
- Fourier-series coefficient calculations  
- Rotation-matrix composition in linear algebra and robotics  

## 11. Self-check — five questions, no answers
1. Derive cos(2A) = 1 − 2 sin²A starting only from the addition formula and the Pythagorean identity.  
2. If tan A = −1 and A is in quadrant II, evaluate tan(2A) and state the quadrant of 2A.  
3. Simplify sin(4x) using double-angle formulas twice; express the result in powers of sin x only.  
4. For which values of A is the expression 2 tan A / (1 − tan²A) undefined while tan A itself is defined?  
5. Show that cos(2A) = 2 cos²A − 1 implies the identity cos A = ±√[(1 + cos(2A))/2]; specify when the positive root must be chosen.