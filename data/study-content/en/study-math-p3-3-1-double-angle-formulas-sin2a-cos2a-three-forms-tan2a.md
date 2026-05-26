## 1. The one-sentence answer
**Double-angle formulas express the sine, cosine, and tangent of twice an angle in terms of the sine, cosine, or tangent of the original angle.**

These identities arise directly from the angle-addition formulas by setting the two angles equal. They compress two-angle expressions into single-angle ones, which simplifies algebraic manipulation and reveals periodic behaviour at twice the frequency.

The three forms of the cosine formula exist because each is obtained by a different substitution into the addition formula and each proves convenient in different algebraic contexts. The tangent formula follows at once once sine and cosine are known.

> [!NOTE]
> The three cosine forms are algebraically equivalent; choosing the right one often removes an unwanted square root or converts an expression into a perfect square.

## 2. Why this matters — concrete and current
In phased-array radar systems such as those used by SpaceX’s Starlink satellites, double-angle identities convert phase-shift commands into efficient cosine and sine lookup tables that steer beams without recalculating full rotation matrices at every time step.

In semiconductor lithography, ASML’s extreme-ultraviolet scanners employ double-angle relations inside Fourier optics models to predict how a 13.5 nm wavefront interferes after passing through a mask whose features are spaced at twice the critical dimension.

In machine-learning accelerators, NVIDIA’s Tensor Cores accelerate trigonometric activations in positional encodings for transformers; the double-angle recurrence lets the hardware replace two expensive sine/cosine evaluations with one multiplication and an addition.

In structural engineering, the natural frequencies of a taut cable under large-amplitude vibration satisfy a double-angle relation derived from the wave equation; finite-element packages such as ANSYS therefore embed these identities to avoid numerical instability when the mesh size approaches half the wavelength.

In quantum computing, the controlled-phase gate on IBM’s superconducting qubits is calibrated using the double-angle formula for the Bloch-sphere rotation; calibration routines published in Physical Review Applied repeatedly apply the identity to map microwave pulse amplitudes directly to rotation angles.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| sin(A + B) and cos(A + B) addition formulas | The double-angle identities are the special case B = A   |
| Pythagorean identity sin²θ + cos²θ = 1     | Required to rewrite one cosine form into the other two   |
| Definition of tan θ = sin θ / cos θ        | Needed to obtain the tangent double-angle formula        |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the sum formulas
The addition formulas already give the value of sine or cosine when two different angles are combined. Setting those angles equal collapses the expression to twice one angle.  
Example: let A = 30°, B = 30°. Then sin(60°) should equal an expression involving only 30°.  
Formal statement:  
$$ \sin(A+B)=\sin A\cos B+\cos A\sin B $$  
> [!WARNING]  
> Replacing B with A before you have verified the addition formula itself produces an identity that looks correct but rests on an unproven foundation.

### Step 2 — Specialise to equal angles
Substitute B = A into the sine addition formula.  
Example: sin(2A) = sin A cos A + cos A sin A.  
Formal statement:  
$$ \sin(2A)=2\sin A\cos A $$  
> [!WARNING]  
> Forgetting the factor of 2 is the most common algebraic slip; it turns a correct identity into an incorrect factor-of-two error that propagates through later calculations.

### Step 3 — Derive the first cosine form
Apply the same substitution to the cosine addition formula.  
Example: cos(60°) = cos 30° cos 30° − sin 30° sin 30°.  
Formal statement:  
$$ \cos(2A)=\cos^2 A-\sin^2 A $$  
> [!WARNING]  
> Reversing the order of subtraction yields the negative of the correct identity and breaks every subsequent identity check.

### Step 4 — Obtain the power-reduction forms
Replace cos²A − sin
²A with 1 − 2 sin²A by using sin²A + cos²A = 1.  
Example: cos(2A) = 1 − 2 sin²A.  
Formal statement:  
$$ \cos(2A)=1-2\sin^2 A $$  
> [!WARNING]  
> Using the Pythagorean identity on the wrong term produces 2 cos²A − 1 instead of the intended form.

### Step 5 — Produce the remaining cosine form
Repeat the substitution starting from cos²A = 1 − sin²A to reach  
$$ \cos(2A)=2\cos^2 A-1. $$  
> [!WARNING]  
> Confusing which form contains the minus sign leads to sign errors when solving equations.

### Step 6 — Derive the tangent formula
Divide the double-angle sine formula by the double-angle cosine formula and replace each ratio by tan A.  
Formal statement:  
$$ \tan(2A)=\frac{2\tan A}{1-\tan^2 A} $$  
> [!WARNING]  
> Division by zero when cos(2A) = 0 is invisible if you cancel before writing the denominator.

## 5. Worked examples — every step shown

**Example 1 — Evaluate an exact value**  
*Given:* A = 22.5°.  
*Find:* sin 45°.  
Step 1: Write sin(45°) = 2 sin 22.5° cos 22.5°.  
*Why:* Apply the sine double-angle formula.  
Step 2: Insert the known half-angle values sin 22.5° = √((1 − cos 45°)/2) and likewise for cosine.  
*Why:* These are previously derived half-angle results.  
**Final answer**  
$$ \sin 45^\circ = \frac{\sqrt{2}}{2} $$

*Reflection:* The example shows direct substitution; the only algebraic hazard is tracking nested radicals.

**Example 2 — Convert to a single cosine**  
*Given:* cos 4θ.  
*Find:* an expression in powers of cos θ.  
Step 1: cos 4θ = 2 cos² 2θ − 1.  
*Why:* First cosine double-angle form with argument 2θ.  
Step 2: cos 2θ = 2 cos
² θ − 1.  
*Why:* Same identity again.  
Step 3: Substitute and expand.  
*Why:* Algebraic replacement.  
**Final answer**  
$$ \cos 4\theta=8\cos^4\theta-8\cos^2\theta+1 $$

*Reflection:* Repeated application of the same identity produces a polynomial; sign errors accumulate quickly if any intermediate minus sign is mishandled.

**Example 3 — Solve a trigonometric equation**  
*Given:* cos 2x = 2 cos² x − 1.  
*Find:* all solutions in [0, 2π).  
Step 1: The equation is an identity, hence true for all x.  
*Why:* The right-hand side is exactly one of the cosine double-angle forms.  
**Final answer**  
All real x.

*Reflection:* Recognising an identity prevents unnecessary solving steps.

**Example 4 — Simplify a tangent expression**  
*Given:* tan 2A where tan A = 3/4.  
*Find:* the exact value.  
Step 1: tan 2A = 2·(3/4) / (1 − (3/4)²).  
*Why:* Direct substitution into the tangent formula.  
Step 2: Simplify numerator and denominator.  
*Why:* Arithmetic.  
**Final answer**  
$$ \tan 2A=\frac{24}{7} $$

*Reflection:* The denominator 1 − tan²A must be evaluated before division; omitting parentheses produces an incorrect fraction.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Writing sin 2A = sin A cos A      | Forgetting the coefficient 2                | Always write the factor of 2 first           |
| Using cos 2A = sin²A − cos²A      | Reversing subtraction order                 | Memorise the order cos² − sin²               |
| Cancelling cos A in tan 2A derivation | Division by zero when cos 2A = 0         | Keep the denominator explicit until the end  |
| Confusing 2 cos²A − 1 with 1 − 2 sin²A | Similar appearance of the two power forms | Label each form by its leading term          |
| Applying the formulas when 2A exceeds the principal range | Periodicity is forgotten                    | Reduce the argument modulo 2π first          |
| Treating tan 2A as 2 tan A        | Analogous omission of the denominator       | Always write the full fraction               |
| Sign error when A is in quadrant II | Double-angle maps to quadrant IV or III   | Draw a quick quadrant diagram before substitution |

## 7. The textbook-precise statement
Let A be any real number such that the relevant functions are defined. Then  
$$ \sin 2A=2\sin A\cos A, $$  
$$ \cos 2A=\cos^2 A-\sin^2 A=2\cos^2 A-1=1-2\sin^2 A, $$  
$$ \tan 2A=\frac{2\tan A}{1-\tan^2 A}. $$  
These identities appear as Theorem 3 in Stewart, *Calculus*, 9e, §3.4.

## 8. Visual — diagram or schematic

```text
Unit circle, angle A at origin
          (cos A, sin A)
               •
              /|
             / |
            /  |
           /   | sin A
          /    |
         /_____|
        (1,0)   cos A
Angle 2A reaches twice as far around the circle;
the double-angle formulas give its coordinates directly
from the single-angle point without measuring 2A.
```

## 9. The memory technique

1. **The hook** — Picture a single spotlight beam hitting a mirror at angle A; the reflected beam leaves at angle 2A. The double-angle formulas are the “bounce” rules that convert incoming coordinates into outgoing ones.

2. **What to overlearn**  
   - sin 2A = 2 sin A cos A  
   - cos 2A = 2 cos² A − 1 (most useful for integration)  
   - tan 2A = 2 tan A / (1 − tan² A)

3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback** — Return to the addition formulas, set the two angles equal, and re-derive each identity in under two minutes.

## 10. What this unlocks
Mastery of these identities is the gateway to multiple-angle formulas, product-to-sum conversions, and the integration of rational functions of sine and cosine.  

- Triple-angle and half-angle formulas follow by iteration.  
- Fourier-series coefficients for even and odd harmonics rely on these reductions.  
- Weierstrass substitutions in calculus become algebraic once double-angle relations are fluent.  
- Rotation matrices in linear algebra and computer graphics compose via the same double-angle arithmetic.

## 11. Self-check — five questions, no answers
1. Without a calculator, evaluate cos 120° using only the double-angle cosine formula and the known values of sin 60° and cos 60°.  
2. Prove that cos 4θ = 8 cos⁴ θ − 8 cos² θ + 1 starting from the double-angle identities.  
3. Solve the equation 1 − 2 sin² x = cos 2x for x in [0, 2π) and identify any extraneous roots introduced by algebraic rearrangement.  
4. Show that tan 2A = 2 tan A / (1 − tan² A) is undefined precisely when cos 2A = 0.  
5. Given sin θ = 3/5 and θ in quadrant II, compute sin 2θ, cos 2θ, and tan 2θ without first finding θ itself.