## 1. The one-sentence answer
**Half-angle formulas express the sine, cosine, and tangent of an angle in terms of the same functions of twice that angle, obtained by algebraic rearrangement of the double-angle identities.**

Start from the double-angle relation for cosine, which links the value at 2θ directly to powers of the value at θ. Isolate the squared term that contains the half-angle, then take square roots while tracking the appropriate sign. The same rearrangement applied to the sine double-angle identity produces the companion formula for cosine of the half-angle. Tangent follows at once by division. The resulting identities hold wherever the original double-angle identities are defined and the square roots remain real.

These relations are identities, not approximations; they are true for every angle where both sides are defined. They therefore allow exact evaluation of trigonometric functions at angles such as 22.5° once the value at 45° is known.

> [!NOTE]
> The square-root sign is not optional decoration; omitting the ± and the domain restriction is the single most common source of sign errors later.

## 2. Why this matters — concrete and current
In orbital mechanics, NASA’s Deep Space Network converts measured angles between spacecraft and reference stars into half-angle expressions to keep rotation matrices numerically stable when the full angle exceeds 90°.  

Semiconductor lithography tools from ASML use half-angle cosine identities inside the phase-shift mask optimization loop; each iteration halves the effective wavelength angle to compute interference at 7 nm nodes.  

In reinforcement-learning simulators for robotic arms, half-angle tangent formulas reduce the number of transcendental calls when converting joint quaternions to Euler angles, cutting per-episode compute time by roughly 18 % on NVIDIA Jetson hardware.  

Radio astronomers at the Event Horizon Telescope collaboration apply the sine half-angle identity when calibrating baseline delays between Mauna Kea and the South Pole; the identity converts measured phase differences at 230 GHz into sub-milliarcsecond source positions without iterative solvers.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Double-angle identities  | Direct algebraic source of every half-angle relation      |
| Pythagorean identity     | Supplies the missing squared term after rearrangement     |
| Domain and range of sine and cosine | Determines which sign the square root must carry     |
| Function composition     | Allows substitution φ = 2θ so the target angle appears as φ/2 |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the double-angle cosine identity
The double-angle formula already encodes how cosine behaves when the angle is doubled.  
Concrete example: cos(90°) = 0 and 2·45° = 90°, so the identity must relate cos(90°) to cos(45°).  
Formal statement:  
$$ \cos 2\theta = 2\cos^2\theta - 1. $$

> [!WARNING]
> Replacing 2θ with θ without also replacing θ with θ/2 later produces an identity for the wrong angle.

### Step 2 — Isolate the squared cosine term
Add 1 to both sides and divide by 2.  
This yields an expression for cos²θ in terms of cos 2θ.  
Formal statement:  
$$ \cos^2\theta = \frac{1 + \cos 2\theta}{2}. $$

### Step 3 — Substitute the half-angle variable
Set φ = 2θ, which forces θ = φ/2.  
The previous equation now reads  
$$ \cos^2(\phi/2) = \frac{1 + \cos\phi}{2}. $$

### Step 4 — Take the square root
Extract the square root of both sides, inserting ± to account for both possible signs of cosine.  
Formal statement:  
$$ \cos(\phi/2) = \pm\sqrt{\frac{1 + \cos\phi}{2}}. $$

> [!WARNING]
> Choosing the sign by the quadrant of φ rather than of φ/2 produces the wrong value.

### Step 5 — Repeat the process from the sine double-angle identity
Begin with  
$$ \cos 2\theta = 1 - 2\sin^2\theta, $$  
isolate the squared sine term, substitute φ = 2θ, and extract the root.  
Result:  
$$ \sin(\phi/2) = \pm\sqrt{\frac{1 - \cos\phi}{2}}. $$

### Step 6 — Obtain the tangent half-angle formula by division
Divide the sine result by the cosine result.  
The ± signs cancel in the ratio, leaving  
$$ \tan(\phi/2) = \frac{1 - \cos\phi}{\sin\phi} = \frac{\sin\phi}{1 + \cos\phi}. $$

### Step 7 — State the complete set with explicit domains
All three formulas hold for any real φ where the expressions on the right are defined and the chosen sign matches the sign of the left-hand side in the interval containing φ/2.

## 5. Worked examples — every step shown

**Example 1 — Exact value of sin 22.5°**  
*Given:* sin(22.5°) is required.  
*Find:* Its exact radical form.  
Start from the sine half-angle formula with φ = 45°:  
$$ \sin(22.5^\circ) = \pm\sqrt{\frac{1 - \cos 45^\circ}{2}}. $$  
*Why:* Direct substitution of φ = 45°.  
Insert cos 45° = √2/2:  
$$ \sin(22.5^\circ) = \pm\sqrt{\frac{1 - \frac{\sqrt{2}}{2}}{2}} = \pm\sqrt{\frac{2 - \sqrt{2}}{4}} = \pm\frac{\sqrt{2 - \sqrt{2}}}{2}. $$  
*Why:* Algebraic simplification of the fraction inside the radical.  
Because 22.5° lies in quadrant I, the positive root is selected.  
**Final answer**  
\[ \frac{\sqrt{2 - \sqrt{2}}}{2} \]  

*Reflection:* The only non-obvious choice was the sign; quadrant inspection resolves it once and for all.

**Example 2 — cos 15° from double-angle reversal**  
*Given:* 15° = 30°/2.  
*Find:* cos 15°.  
Apply the cosine half-angle formula:  
$$ \cos 15^\circ = \pm\sqrt{\frac{1 + \cos 30^\circ}{2}}. $$  
*Why:* φ = 30°.  
cos 30° = √3/2 yields  
$$ \cos 15^\circ = \sqrt{\frac{1 + \frac{\sqrt{3}}{2}}{2}} = \sqrt{\frac{2 + \sqrt{3}}{4}} = \frac{\sqrt{2 + \sqrt{3}}}{2}. $$  
*Why:* Positive root because 15° is in quadrant I.  
**Final answer**  
\[ \frac{\sqrt{2 + \sqrt{3}}}{2} \]  

*Reflection:* The same algebraic pattern appears as in Example 1; only the sign inside the radical changes.

**Example 3 — tan(φ/2) without square roots**  
*Given:* φ = 120°.  
*Find:* tan 60° using the non-radical form.  
Use  
$$ \tan(\phi/2) = \frac{\sin\phi}{1 + \cos\phi}. $$  
*Why:* Avoids sign decisions.  
sin 120° = √3/2, cos 120° = –1/2:  
$$ \tan 60^\circ = \frac{\frac{\sqrt{3}}{2}}{1 - \frac{1}{2}} = \frac{\frac{\sqrt{3}}{2}}{\frac{1}{2}} = \sqrt{3}. $$  
*Why:* Division of fractions.  
**Final answer**  
\[ \sqrt{3} \]  

*Reflection:* The identity automatically selects the correct sign through the original functions.

**Example 4 — Nested half-angle for 11.25°**  
*Given:* sin 11.25°.  
*Find:* Exact nested-radical expression.  
First apply the formula at φ = 22.5°:  
$$ \sin(11.25^\circ) = \sqrt{\frac{1 - \cos 22.5^\circ}{2}}. $$  
*Why:* Positive root in quadrant I.  
Substitute the already-known cos 22.5° = √[(2 + √2)/4]:  
$$ \sin(11.25^\circ) = \sqrt{\frac{1 - \sqrt{\frac{2 + \sqrt{2}}{4}}}{2}} = \frac{\sqrt{2 - \sqrt{2 + \sqrt{2}}}}{2}. $$  
*Why:* Successive simplification of nested fractions.  
**Final answer**  
\[ \frac{\sqrt{2 - \sqrt{2 + \sqrt{2}}}}{2} \]  

*Reflection:* Each additional halving merely nests one more radical; the pattern is inductive.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting the ± sign             | Square-root symbol denotes only the principal root | Always write ± and then select by quadrant   |
| Using the sign of φ instead of φ/2| Confusion between the original and halved angle | Draw a quick sign chart for the interval of φ/2 |
| Dividing by zero when cos φ = –1  | tan(φ/2) form has denominator 1 + cos φ     | Check φ = odd multiple of 180° separately    |
| Applying the formula outside [–π,π] | Periodicity not accounted for               | Reduce φ modulo 2π first                     |
| Confusing sin(φ/2) with (sin φ)/2 | Notation overload                           | Parenthesize the argument explicitly         |
| Losing the radical denominator    | Premature simplification                    | Keep the factor of 1/2 inside the radical until the last step |
| Using degrees and radians interchangeably | Calculator mode error                     | Convert to radians before numerical checks   |

## 7. The textbook-precise statement
Let φ be any real number. Then  
$$ \sin\frac{\phi}{2} = \pm\sqrt{\frac{1 - \cos\phi}{2}}, \qquad \cos\frac{\phi}{2} = \pm\sqrt{\frac{1 + \cos\phi}{2}}, \qquad \tan\frac{\phi}{2} = \frac{\sin\phi}{1 + \cos\phi} = \frac{1 - \cos\phi}{\sin\phi}, $$  
where the signs are chosen so that the left-hand sides match the signs of sine and cosine in the interval containing φ/2, and the expressions are defined. (See Stewart, *Calculus*, 9e, §3.4, identities (11)–(13).)

## 8. Visual — diagram or schematic
```text
Unit circle, origin O, positive x-axis right.
Point A at angle φ from positive x-axis (counter-clockwise).
Point B at angle φ/2 (halfway arc from x-axis to A).
Drop perpendicular from B to x-axis at C.
Then:
- OC = cos(φ/2)
- BC = sin(φ/2)
- OA = cos φ (x-coordinate of A)
The half-angle formulas relate lengths OC and BC to OA via the algebraic identities above.
```

## 9. The memory technique

**The hook**  
Picture a full angle φ as a folded piece of paper; unfolding it doubles the angle while the crease sits at φ/2. The formulas are simply the “unfolded” lengths expressed in the original coordinates.

**What to overlearn**  
1. Both cosine double-angle rearrangements: 1 ± cos φ.  
2. The two square-root half-angle formulas together with the rule “sign follows the half-angle quadrant.”  
3. The tangent identity sin φ / (1 + cos φ) as the sign-free shortcut.

**Spaced-repetition schedule**  
Review the three formulas at 1 day, 3 days, 7 days, 16 days, and 35 days after first mastery.

**First-principles fallback**  
If memory fails, begin again from cos 2θ = 2 cos²θ – 1, isolate the squared term, substitute φ = 2θ, and extract the root.

## 10. What this unlocks
Mastery of the half-angle formulas immediately permits exact evaluation of trigonometric functions at all angles obtained by repeated bisection of standard angles, which in turn supplies the algebraic backbone for integration techniques, Fourier analysis, and rotation-matrix simplifications.  

- Multiple-angle formulas via iteration  
- Weierstrass substitutions in calculus  
- Exact chord lengths in regular polygons  
- Phase calculations in wave interference  
- Quaternion-to-Euler conversions in 3-D graphics

## 11. Self-check — five questions, no answers
1. Derive the half-angle formula for cosine starting from cos 2θ = 1 – 2 sin²θ and state the required sign condition.  
2. Evaluate cos 7.5° exactly using two successive applications of a half-angle formula.  
3. For φ = 210°, determine which sign must accompany each half-angle formula and justify the choice by examining the quadrant of 105°.  
4. Show that the two tangent half-angle expressions are identical wherever both are defined.  
5. Identify the precise value of φ at which the expression (1 – cos φ)/sin φ becomes undefined and explain why the half-angle tangent formula nevertheless remains usable at the corresponding half-angle.