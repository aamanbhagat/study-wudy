## 1. The one-sentence answer
**In a right triangle, the six trigonometric ratios are the fixed ratios of pairs of sides determined by each acute angle.**

These ratios arise because any two right triangles that share an acute angle are similar; their corresponding sides are proportional. Consequently the ratio of any two sides depends only on that angle, not on the triangle’s absolute size. The three primary ratios are therefore sin = opposite over hypotenuse, cos = adjacent over hypotenuse, and tan = opposite over adjacent; the remaining three are simply their reciprocals.

The definitions hold exclusively inside right triangles and only for the two acute angles. Extending them to obtuse angles or to the unit circle requires additional machinery that is not part of this foundation.

> [!NOTE]
> Once the three side lengths are known, every trigonometric value is completely determined; no further measurement or external data is required.

## 2. Why this matters — concrete and current
Surveying firms such as Leica Geosystems compute elevation angles with total stations; the tangent ratio converts the measured angle and horizontal distance into precise height differences used for road grading and bridge construction.

In aerospace, SpaceX guidance software evaluates the sine and cosine of thrust-vector angles to resolve rocket-engine forces into vertical and horizontal components during ascent.

Semiconductor lithography machines at ASML project circuit patterns through lenses whose alignment tolerances are maintained by calculating the cosine of minute angular deviations detected by interferometers.

Video-game engines such as Unreal Engine 5 rotate character models by applying 2-by-2 matrices whose entries are exactly the sine and cosine of the rotation angle, ensuring frame-rate–independent animation.

Architectural analysis of Gothic cathedrals, performed by structural engineers at firms such as Arup, uses the cotangent of roof pitch to determine horizontal thrust that must be countered by flying buttresses.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Right angle (90°)        | Defines the hypotenuse and guarantees similarity          |
| Opposite / adjacent sides| Labels the two legs relative to a chosen acute angle       |
| Ratio of lengths         | The numerical value that remains constant across similar triangles |
| Hypotenuse               | Longest side; appears in both sine and cosine denominators |

## 4. Building the idea — from intuition to formalism

### Step 1 — Locate the right angle and choose an acute angle
Any right triangle contains one 90° angle; the remaining two angles are acute and complementary. Select one acute angle; the side opposite it and the side adjacent to it are now unambiguously identified.

Consider △ABC with right angle at C and acute angle at A measuring 30°. Side BC lies opposite A; side AC lies adjacent to A.

Formally, label ∠A = θ (acute), side opposite θ as o, side adjacent to θ as a, and hypotenuse as h.

> [!WARNING]
> Choosing the wrong acute angle swaps opposite and adjacent sides, inverting every ratio except sine and cosine of the complementary angle.

### Step 2 — Identify the three sides relative to θ
The hypotenuse is always the side opposite the right angle. The opposite side does not touch θ; the adjacent side touches θ but is not the hypotenuse.

In the 30° example, BC = o, AC = a, AB = h.

$$o = BC,\quad a = AC,\quad h = AB.$$

> [!WARNING]
> Treating the hypotenuse as merely “the longest side” without reference to the right angle leads to using a leg in the denominator of sine or cosine.

### Step 3 — Define sine and cosine
Sine is the ratio of the opposite side to the hypotenuse; cosine is the ratio of the adjacent side to the hypotenuse. Both ratios are independent of scaling.

For any right triangle,
$$\sin\theta = \frac{o}{h},\qquad\cos\theta = \frac{a}{h}.$$

> [!WARNING]
> Writing sin θ = h/o inverts the fraction and produces values greater than 1, violating the range of the sine function.

### Step 4 — Define tangent
Tangent is the ratio of the opposite side to the adjacent side; it does not involve the hypotenuse.

$$\tan\theta = \frac{o}{a}.$$

> [!WARNING]
> Confusing tan with sin/cos produces the reciprocal instead of the correct ratio, which is fatal in slope calculations.

### Step 5 — Introduce the reciprocal ratios
Cosecant, secant, and cotangent are defined as the reciprocals of sine, cosine, and tangent respectively.

$$\csc\theta = \frac{h}{o},\qquad\sec\theta = \frac{h}{a},\qquad\cot\theta = \frac{a}{o}.$$

> [!WARNING]
> Attempting to define csc as o/h repeats the original sine value and destroys the reciprocal relationship required by identities such as sin θ · csc θ = 1.

### Step 6 — Record the fundamental identity
Pythagoras applied to the sides yields the relation between sine and cosine that holds for every acute angle.

$$\sin^2\theta + \cos^2\theta = 1.$$

> [!WARNING]
> Forgetting to square the ratios produces the linear statement sin θ + cos θ = 1, which fails for every θ except 45°.

## 5. Worked examples — every step shown

**Example 1 — Evaluate a single ratio**  
*Given:* Right △ABC, ∠C = 90°, ∠A = 30°, hypotenuse AB = 2.  
*Find:* sin 30°.

- Identify opposite side to 30°: BC.  
  *Why:* Opposite side does not touch ∠A.  
- By similarity to the standard 30-60-90 triangle, BC = 1.  
  *Why:* Sides are 1 : √3 : 2.  
- Apply definition:  
  $$\sin 30^\circ = \frac{BC}{AB} = \frac{1}{2}.$$  
**Answer:** \(\frac12\)

*Reflection:* The example isolates the definition; the only possible error is swapping opposite and hypotenuse.

**Example 2 — Compute cosine from given sides**  
*Given:* Legs 5 and 12, hypotenuse 13; acute angle adjacent to leg 5.  
*Find:* cos θ.

- Adjacent side = 5, hypotenuse = 13.  
  *Why:* Hypotenuse is longest side opposite right angle.  
- $$\cos\theta = \frac{5}{13}.$$  
**Answer:** \(\frac{5}{13}\)

*Reflection:* Verifying 5-12-13 is Pythagorean prevents using an incorrect hypotenuse.

**Example 3 — Find tangent and its reciprocal**  
*Given:* Opposite = 4, adjacent = 3.  
*Find:* tan θ and cot θ.

- $$\tan\theta = \frac{4}{3},\qquad\cot\theta = \frac{3}{4}.$$  
**Answer:** \(\frac43\) and \(\frac34\)

*Reflection:* Reciprocal pairs always multiply to 1; checking this catches inversion mistakes.

**Example 4 — Solve for an unknown side**  
*Given:* ∠A = 40°, hypotenuse = 10, find opposite side.  
*Find:* length opposite 40°.

- Use sine definition:  
  $$\sin 40^\circ = \frac{o}{10}\implies o = 10\sin 40^\circ.$$  
- Numerically, sin 40° ≈ 0.6428, therefore o ≈ 6.428.  
**Answer:** \(10\sin 40^\circ\) (exact), ≈ 6.428 (numeric)

*Reflection:* Keeping the exact form until the final step preserves precision for further calculations.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using hypotenuse as adjacent      | Misidentifying the right angle              | Mark the right angle first, then label sides |
| Writing sin θ = h/o               | Inverting fraction from memory lapse        | Always say “opposite over hypotenuse” aloud  |
| Treating tan θ as sin θ / cos θ without checking definition | Over-generalising later identities too early | Derive tan directly from opposite/adjacent   |
| Applying ratios to the obtuse angle | Forgetting only acute angles are allowed    | Verify both angles sum to 90°                |
| Forgetting to square in Pythagorean identity | Algebraic slip                             | Write sin²θ + cos²θ = 1 explicitly           |
| Confusing sec with csc            | Similar spelling                            | Remember sec pairs with cos, csc with sin    |
| Calculator in degree vs radian mode | Default setting mismatch                    | Check mode before every computation          |

## 7. The textbook-precise statement
Let △ABC be a right triangle with right angle at C and acute angle ∠BAC = θ. Denote the side opposite θ by a, the side adjacent to θ by b, and the hypotenuse by c. Then the six trigonometric ratios are defined by

\[
\sin\theta = \frac{a}{c},\quad
\cos\theta = \frac{b}{c},\quad
\tan\theta = \frac{a}{b},
\]
\[
\csc\theta = \frac{c}{a},\quad
\sec\theta = \frac{c}{b},\quad
\cot\theta = \frac{b}{a}.
\]

These definitions appear in Stewart, *Calculus*, 9e, §3.4, and are the sole foundation for all subsequent trigonometric identities inside right triangles.

## 8. Visual — diagram or schematic

```text
          C
         /|
        / |  opposite = a
       /  |
      /   |
  b  /    |  
    /     |
   / θ    |  hypotenuse = c
  A-------B
     adjacent = b
Right angle at C; θ at A.
```

## 9. The memory technique

1. **The hook** — Picture a right triangle as a steep ramp: “SOH-CAH-TOA” becomes the chant “Some Old Hippie Caught Another Hippie Taking Opium Always.”  
2. **What to overlearn** — The three primary definitions (sin = o/h, cos = a/h, tan = o/a) together with the identity sin²θ + cos²θ = 1.  
3. **Spaced-repetition schedule** — Review definitions at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.  
4. **First-principles fallback** — Reconstruct every ratio by drawing an arbitrary right triangle, labelling the sides relative to a chosen acute angle, and writing the three fractions directly.

## 10. What this unlocks
Mastery of right-triangle ratios supplies the definitions required for trigonometric identities, the law of sines and cosines, polar coordinates, and the differentiation of sine and cosine in calculus.

- Angle-sum formulas  
- Law of sines: a / sin A = 2R  
- Unit-circle extension of the same ratios  
- Derivative: d(sin x)/dx = cos x  

## 11. Self-check — five questions, no answers
1. In a right triangle with acute angle 35° and hypotenuse 8, compute sin 35° and sec 35° to three decimal places.  
2. A ladder 5 m long leans against a wall at 60° to the ground. How high up the wall does it reach?  
3. If tan θ = 5/12, determine the exact values of sin θ and cos θ.  
4. Explain why cot(90° − θ) equals tan θ using only side labels.  
5. A student writes sin θ = adjacent/hypotenuse. Identify the error and state the correct definition.