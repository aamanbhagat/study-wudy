## 1. The one-sentence answer
**The ASTC rule determines the correct sign of sine, cosine, and tangent for any angle greater than 90° by identifying which function stays positive in each quadrant.**

Angles larger than 90° land in quadrants II, III, or IV of the unit circle. Each quadrant flips the sign of one or two trigonometric functions while the others remain negative. The rule organises these sign patterns into a simple mnemonic: All positive in quadrant I, only Sine positive in quadrant II, only Tangent positive in quadrant III, and only Cosine positive in quadrant IV. Once you reduce the given angle to its reference angle inside the first quadrant, you evaluate the function at that acute angle and then attach the sign dictated by the quadrant.

The same logic extends to angles beyond 360° by first subtracting suitable multiples of 360° to bring the angle into [0°, 360°). This reduction never changes the final sign pattern. The rule therefore converts every trigonometric evaluation into a first-quadrant calculation plus a single sign choice.

> [!NOTE]
> The deepest insight is that the unit circle’s symmetry forces exactly one function to be positive in each quadrant; memorising which one survives is enough to fix every sign without memorising four separate tables.

## 2. Why this matters — concrete and current
In satellite attitude control, engineers at ISRO’s inertial navigation group routinely convert raw star-sensor angles (often > 180°) into direction cosines; an incorrect ASTC sign produces an attitude error that fails the 0.01° tolerance required for GSLV insertion.

In semiconductor lithography, ASML’s wafer-stage metrology uses trigonometric projections of laser interferometer readings that wrap past 90° many times per scan; the firmware applies the ASTC rule inside its CORDIC routine to keep sub-nanometre positioning accuracy.

In reinforcement-learning simulators for robotic arms, MuJoCo and NVIDIA Isaac Gym sample joint angles uniformly over [−2π, 2π]; the policy network receives sine and cosine features whose signs must remain consistent across quadrant boundaries, otherwise gradient updates become noisy.

In fundamental physics, LHCb track reconstruction transforms azimuthal angles φ ∈ [−π, π] into transverse-momentum components; a quadrant-II sign error on sin φ directly biases the measured CP-violation parameters.

In smartphone AR engines (ARKit, ARCore), device orientation quaternions are converted to Euler angles that cross quadrant boundaries dozens of times per second; the graphics pipeline relies on correct ASTC signs to avoid visual jitter in virtual overlays.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Unit-circle definition of sine and cosine | Supplies the geometric meaning of each function so that quadrant signs become visible rather than arbitrary. |
| Reference angle (acute angle to x-axis) | Reduces every angle > 90° to a first-quadrant calculation whose positive value is already known. |
| Coterminal angles and 360° periodicity | Lets you bring any angle into [0°, 360°) without changing its trigonometric values. |
| Basic first-quadrant values (30°, 45°, 60°) | Provides the numerical seed that you later multiply by the correct sign. |

If any row above is unfamiliar, pause and master that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Locate the quadrant
Draw the angle on the unit circle and note which quadrant it occupies. An angle θ satisfies 90° < θ < 180° in quadrant II, 180° < θ < 270° in quadrant III, and 270° < θ < 360° in quadrant IV.

Example: 150° lies between 90° and 180°, hence quadrant II.

Formally, the quadrant is given by  
$$
\left\lfloor \frac{\theta \bmod 360^\circ}{90^\circ} \right\rfloor + 1.
$$

> [!WARNING]
> Forgetting to reduce modulo 360° first places angles such as 510° into the wrong quadrant and flips every subsequent sign.

### Step 2 — Compute the reference angle
Subtract the nearest multiple of 90° so that the result α lies in (0°, 90°].  
For quadrant II: α = 180° − θ.  
For quadrant III: α = θ − 180°.  
For quadrant IV: α = 360° − θ.

Example: reference angle of 150° is 180° − 150° = 30°.

### Step 3 — Evaluate the function at the reference angle
Calculate sin α, cos α or tan α using known first-quadrant values or a calculator. All three are positive at this stage.

### Step 4 — Apply the ASTC sign
Attach the sign according to the quadrant:  
- Quadrant I: all positive.  
- Quadrant II: sine positive, cosine and tangent negative.  
- Quadrant III: tangent positive, sine and cosine negative.  
- Quadrant IV: cosine positive, sine and tangent negative.

### Step 5 — Write the final signed value
Combine the positive magnitude from Step 3 with the sign from Step 4.

### Step 6 — Extend to angles outside [0°, 360°)
Subtract or add integer multiples of 360° until the angle lies in [0°, 360°), then repeat Steps 1–5. Periodicity guarantees the result is unchanged.

The complete procedure yields the textbook-grade identity  
$$
\sin(\theta) = (-1)^{q} \sin(\alpha),\qquad
\cos(\theta) = (-1)^{r} \cos(\alpha),
$$
where q and r are quadrant-dependent exponents fixed by the ASTC table.

## 5. Worked examples — har step show karo

**Example 1 — sin 150°**  
*Given:* θ = 150°.  
*Find:* sin 150°.  
150° lies in quadrant II (Step 1). Reference angle α = 180° − 150° = 30° (Step 2).  
sin 30° = 1/2 (Step 3). Quadrant II keeps sine positive (Step 4).  
**sin 150° = +1/2**  
*Reflection:* The example is easy because 150° is a standard angle; the same steps work for any non-standard angle once you can compute the reference value.

**Example 2 — cos 210°**  
*Given:* θ = 210°.  
*Find:* cos 210°.  
210° lies in quadrant III (Step 1). Reference angle α = 210° − 180° = 30° (Step 2).  
cos 30° = √3/2 (Step 3). Quadrant III makes cosine negative (Step 4).  
**cos 210° = −√3/2**  
*Reflection:* Students often forget the sign change here; writing the quadrant first prevents the error.

**Example 3 — tan 315°**  
*Given:* θ = 315°.  
*Find:* tan 315°.  
315° lies in quadrant IV (Step 1). Reference angle α = 360° − 315° = 45° (Step 2).  
tan 45° = 1 (Step 3). Quadrant IV makes tangent negative (Step 4).  
**tan 315° = −1**  
*Reflection:* 315° is coterminal with −45°, illustrating that the rule works equally for negative angles after reduction.

**Example 4 — sin 690°**  
*Given:* θ = 690°.  
*Find:* sin 690°.  
690° − 360° × 1 = 330° (Step 6). 330° lies in quadrant IV (Step 1). Reference angle α = 360° − 330° = 30° (Step 2).  
sin 30° = 1/2 (Step 3). Quadrant IV makes sine negative (Step 4).  
**sin 690° = −1/2**  
*Reflection:* The extra reduction step shows why periodicity must be handled before quadrant lookup.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using the original angle instead of the reference angle | Students plug 150° directly into a calculator without reduction. | Always compute α first; the calculator then gives the positive seed. |
| Confusing quadrant II and quadrant IV signs | Both have one positive function, but different ones. | Write “II → Sin only” or “IV → Cos only” before writing the answer. |
| Forgetting 360° reduction for angles > 360° | 690° looks like quadrant III at first glance. | Subtract 360° repeatedly until the result is < 360°. |
| Mixing tan with sin/cos signs in quadrant III | tan is positive while sin and cos are negative. | Memorise the single positive function per quadrant, not the negatives. |
| Applying ASTC to coterminal negative angles without reduction | −150° lands in quadrant III, not II. | Add 360° first, then apply the rule to the positive coterminal angle. |
| Calculator in degree vs radian mode after reduction | Reference angle 30° becomes π/6, producing wrong numerical seed. | Keep the calculator in the same unit used for the original angle. |
| Writing the sign after the final numerical answer | Sign is decided early; late placement invites transcription errors. | Write “+” or “−” immediately after identifying the quadrant. |

## 7. The textbook-precise statement
Let θ be any real number. Let α be the reference angle of θ mod 360°, so 0° ≤ α ≤ 90°. Then  

$$
\sin\theta = \operatorname{sign}_{\text{II,III}}(\theta)\cdot\sin\alpha,\qquad
\cos\theta = \operatorname{sign}_{\text{III,IV}}(\theta)\cdot\cos\alpha,\qquad
\tan\theta = \operatorname{sign}_{\text{II,III}}(\theta)\cdot\tan\alpha,
$$

where the sign functions equal +1 or −1 according to the ASTC table: quadrant I (all +), II (sin +, cos −, tan −), III (sin −, cos −, tan +), IV (sin −, cos +, tan −). (Thomas’ Calculus, 15e, §1.3, p. 48)

## 8. Visual — diagram or schematic
```
          y
          ^
   II     |     I
  sin+    |   all+
  cos-    |   +
  tan-    |   
----------+----------> x
   III    |     IV
  sin-    |   sin-
  cos-    |   cos+
  tan+    |   tan-
```

Quadrants labelled with the single positive function (or “all+”) according to ASTC. The reference angle α is always measured from the positive x-axis to the terminal ray inside quadrant I.

## 9. The memory technique
1. **The hook** — Picture a tea cup sitting on a table: “All Silver Tea Cups” spells ASTC and reminds you that the cup (positive value) sits only in the quadrant named by the letter.
2. **What to overlearn** — The four positive cases: Q1 all, Q2 sin, Q3 tan, Q4 cos; and the reduction formula θ ↦ θ mod 360°.
3. **Spaced-repetition schedule** — Review the mnemonic and four signs after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Return to the unit-circle definitions: x = cos θ, y = sin θ; the sign of x or y is read directly from the coordinate signs in that quadrant.

## 10. What this unlocks
Mastery of ASTC lets you evaluate any trigonometric expression involving angles outside [0°, 90°] without a calculator and prepares you for trigonometric identities, calculus of trigonometric functions, and Fourier analysis.  

- Graphing y = sin θ and y = cos θ over all real numbers  
- Solving trigonometric equations that produce multiple quadrants  
- Derivatives of sin(ax + b) and cos(ax + b)  
- Complex exponential form e^{iθ} and De Moivre’s theorem  
- Fourier coefficients that integrate over full periods  

## 11. Self-check — five questions, no answers
1. Without a calculator, evaluate cos 240° and state which quadrant supplied the sign.  
2. Reduce 785° to an equivalent angle between 0° and 360°, then find sin of the reduced angle.  
3. An angle θ satisfies sin θ < 0 and cos θ < 0. Which quadrant must θ occupy?  
4. Show that tan(θ + 180°) = tan θ for any θ where both sides are defined.  
5. A student claims sin 210° = +1/2. Identify the exact mistake and give the correct value.