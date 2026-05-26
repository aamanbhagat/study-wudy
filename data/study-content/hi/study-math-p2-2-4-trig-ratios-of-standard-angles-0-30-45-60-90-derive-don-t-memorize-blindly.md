## 1. The one-sentence answer
**Trig ratios of the standard angles are exact values of sine, cosine and tangent at 0°, 30°, 45°, 60° and 90° that you obtain by deriving them from the geometry of two right triangles and the unit circle rather than storing them as a list.**

These ratios appear repeatedly in every later topic of trigonometry, so deriving them once builds both accuracy and intuition. When you construct an isosceles right triangle for 45° or bisect an equilateral triangle for 30° and 60°, the side lengths fix the ratios permanently; the same values then reappear on the unit circle because every point (x, y) on that circle satisfies x = cos θ and y = sin θ. The process also reveals why the values at 0° and 90° are the boundary cases 0 and 1.

> [!NOTE]
> The single deepest insight is that every standard ratio is the length of a leg or hypotenuse in one of two primitive right triangles; once those triangles are drawn, the numbers are forced by Pythagoras and cannot be chosen arbitrarily.

## 2. Why this matters — concrete and current
In orbital mechanics, SpaceX’s guidance software evaluates sin 30° and cos 60° when it rotates a booster’s thrust vector during a landing burn; the exact fractions 1/2 and √3/2 keep the quaternion updates free of floating-point drift.  

In semiconductor lithography, ASML’s EUV scanners use 45° beam splitters whose reflectance depends on the Fresnel coefficients at that angle; the value 1/√2 must be known exactly so the wavefront error stays below 0.1 nm.  

Inside every modern GPU, the fast inverse-square-root routine still relies on the fact that cos 60° = 1/2 when it normalises vectors for lighting calculations in real-time rendering.  

In quantum computing, the Hadamard gate that creates superposition is literally a 45° rotation on the Bloch sphere; its matrix entries are precisely ±1/√2, which appear because the gate is built from microwave pulses whose phase is set to 45°.  

In structural engineering, the moment distribution method for a 60° truss joint uses sin 60° = √3/2 to resolve forces; any rounding error here propagates into member sizing and can violate safety factors.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Pythagorean theorem | Fixes the hypotenuse once two sides of a right triangle are known |
| Definition of sine and cosine on the unit circle | Converts the side ratios into function values at any angle |
| Properties of isosceles and equilateral triangles | Supplies the equal sides needed to create 45°, 30° and 60° angles |
| Square-root of 2 and 3 | Arise directly from solving the two primitive triangles |

If any row is unfamiliar, pause and review that single idea before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the unit circle definition
Place a right triangle inside the unit circle so that one acute angle equals θ. The x-coordinate of the point where the hypotenuse meets the circle is then cos θ and the y-coordinate is sin θ. This single picture replaces every later table.

### Step 2 — Derive 45° from the isosceles right triangle
An isosceles right triangle has two equal legs of length 1. By Pythagoras the hypotenuse equals √2. Therefore sin 45° = 1/√2, cos 45° = 1/√2 and tan 45° = 1.

> [!WARNING]
> If you label the legs “opposite” and “adjacent” inconsistently, the sine and cosine values swap; always decide which angle you are measuring first.

### Step 3 — Derive 30° and 60° from the equilateral triangle
An equilateral triangle of side 2 is bisected by an altitude that creates two 30°-60°-90° right triangles. The altitude length is √3, so the sides are 1 : √3 : 2. Hence sin 30° = 1/2, cos 30° = √3/2, sin 60° = √3/2 and cos 60° = 1/2.

### Step 4 — Obtain the boundary values at 0° and 90°
When θ approaches 0° on the unit circle the point (cos θ, sin θ) approaches (1, 0), so sin 0° = 0, cos 0° = 1. When θ = 90° the point reaches (0, 1), giving sin 90° = 1, cos 90° = 0. Tangent is undefined at 90° because the adjacent side is zero.

### Step 5 — Write the complete table once, then never memorise again
All six ratios for the five angles are now fixed by the two triangles and the unit-circle limits. Any later problem simply refers back to these geometric constructions.

## 5. Worked examples — har step show karo

**Example 1 — Find sin 30° without looking up**
- *Given:* An equilateral triangle of side 2 is bisected.
- *Find:* sin 30°.
Halve the base to obtain a right triangle whose opposite side to 30° is 1 and hypotenuse is 2.  
sin 30° = opposite / hypotenuse = 1/2.  
*Why:* The bisection creates the 30° angle and the side lengths are forced by symmetry.  
**1/2**

*Reflection:* The same triangle also supplies cos 30° once you identify the adjacent side.

**Example 2 — Evaluate cos 45° + sin 45°**
- *Given:* 45° angle in isosceles right triangle.
- *Find:* Numerical value of the sum.
Each leg is 1, hypotenuse √2, therefore cos 45° = 1/√2 and sin 45° = 1/√2.  
cos 45° + sin 45° = 2/√2 = √2.  
*Why:* Both ratios come from the same triangle so they are identical.  
**√2**

*Reflection:* The sum is larger than 1, which is allowed because we are not normalising.

**Example 3 — Show that tan 60° equals √3**
- *Given:* 30°-60°-90° triangle with sides 1 : √3 : 2.
- *Find:* tan 60°.
Opposite side to 60° is √3, adjacent side is 1.  
tan 60° = √3 / 1 = √3.  
*Why:* Tangent is simply the ratio of the two legs already fixed by Pythagoras.  
**√3**

*Reflection:* The same value appears as cot 30°, illustrating cofunction identities.

**Example 4 — Compute sin² 60° + cos² 60°**
- *Given:* sin 60° = √3/2, cos 60° = 1/2.
- *Find:* The sum of squares.
(√3/2)² + (1/2)² = 3/4 + 1/4 = 1.  
*Why:* Pythagorean identity must hold for any angle; the numbers confirm it.  
**1**

*Reflection:* This check works for every standard angle and catches sign errors.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Swapping sin 30° with sin 60° | Students remember only the numbers 1/2 and √3/2 without the angle | Always redraw the 30-60-90 triangle and label the angle first |
| Writing tan 90° = 1 | Confusing it with tan 45° | Remember that adjacent side is zero, so tangent is undefined |
| Forgetting the √2 in 45° hypotenuse | Using legs of length 1 but calling hypotenuse 2 | Apply Pythagoras explicitly each time |
| Sign errors in quadrants | Extending ratios beyond first quadrant without checking | Stay inside [0°, 90°] until the unit-circle signs are introduced |
| Rationalising 1/√2 as √2/2 too early | Loses sight of the original triangle side | Keep 1/√2 until the final simplification step |
| Assuming sin 0° = 1 | Reversing the limiting points on the circle | Visualise the point (1,0) at 0° |

## 7. The textbook-precise statement
Let θ be an angle in degrees belonging to the set {0, 30, 45, 60, 90}. Define sin θ and cos θ as the y- and x-coordinates, respectively, of the point at angle θ on the unit circle x² + y
² = 1. Then the following identities hold:

sin 0° = 0, cos 0° = 1, tan 0° = 0;  
sin 30° = 1/2, cos 30° = √3/2, tan 30° = 1/√3;  
sin 45° = cos 45° = 1/√2, tan 45° = 1;  
sin 60° = √3/2, cos 60° = 1/2, tan 60° = √3;  
sin 90° = 1, cos 90° = 0, tan 90° undefined.

These values are obtained by embedding the 45°-45°-90° and 30°-60°-90° triangles inside the unit circle and taking the appropriate limits at the axes (Sullivan, *Precalculus*, 10e, §5.2).

## 8. Visual — diagram or schematic
```
Unit circle radius 1
          (0,1) 90°
            |
(-1,0) 180°-+-- 0° (1,0)
            |
          (0,-1) 270°

Inside first quadrant:
45°: point (1/√2, 1/√2)
30°: point (√3/2, 1/2)
60°: point (1/2, √3/2)
```

## 9. The memory technique

1. **The hook** — Picture a birthday cake cut at 30°; the small slice gives sin 30° = 1/2, the tall slice at 60° gives the taller √3/2.
2. **What to overlearn** — The two side-ratio triples 1 : 1 : √2 and 1 : √3 : 2, plus the unit-circle limits at the axes.
3. **Spaced-repetition schedule** — Review the derivations on day 1, day 3, day 7, day 16 and day 35.
4. **First-principles fallback** — Redraw the isosceles right triangle or the bisected equilateral triangle; the ratios reappear automatically from Pythagoras.

## 10. What this unlocks
Once these five angles are derived, every later identity, graph and integral that uses them becomes exact rather than approximate.  

- Angle-addition formulas tested at 75° = 45° + 30°  
- Exact values needed for sin 15° and cos 15° via subtraction formulas  
- Reference angles in all four quadrants  
- Simple exact limits for derivatives of sine and cosine at these points  
- Standard angles inside Fourier-series coefficients and DFT twiddle factors  

## 11. Self-check — five questions, no answers
1. Using only the 30-60-90 triangle, compute the exact value of cot 30°.  
2. Show that sin 45° + cos 45° is irrational while sin 30° + cos 30° is also irrational; which is larger?  
3. A right triangle has one angle 60° and hypotenuse 4. What is the length of the side opposite 60°?  
4. Why does tan 90° have no real value while tan 0° equals zero?  
5. If you rotate the vector (1,0) by 60° twice, what exact coordinates do you obtain after the second rotation?