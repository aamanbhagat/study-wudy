## What it is
The trigonometric ratios of standard angles are the exact values of sine, cosine, and tangent for $0^\circ$, $30^\circ$, $45^\circ$, $60^\circ$, and $90^\circ$. Instead of relying on a calculator's decimal approximations, these values are expressed as simple fractions and square roots derived directly from the geometry of equilateral and right isosceles triangles.

## Why it matters
These exact values are the alphabet of higher math and physics. In rocket science, resolving thrust vectors or orbital inclinations relies heavily on these angles because they frequently appear in idealized models and structural geometries. In computer science, 3D graphics engines use these exact ratios to optimize rotation matrices, avoiding the floating-point errors that accumulate when using decimal approximations.

## When to study it
You must already understand the Pythagorean theorem ($a^2 + b^2 = c^2$) and the basic right-triangle definitions of sine, cosine, and tangent (SOH CAH TOA). You should also be comfortable simplifying square roots and rationalizing denominators. If you cannot confidently solve for the third side of a right triangle given two sides, stop and master the Pythagorean theorem first.

## How to study it (step by step)
1. Draw a square with side length 1. Cut it in half diagonally to form two $45^\circ$-$45^\circ$-$90^\circ$ triangles. Use the Pythagorean theorem to find the length of the hypotenuse.
2. Derive $\sin(45^\circ)$, $\cos(45^\circ)$, and $\tan(45^\circ)$ using this triangle and SOH CAH TOA.
3. Draw an equilateral triangle with side length 2. Drop an altitude from the top vertex to cut it into two $30^\circ$-$60^\circ$-$90^\circ$ triangles.
4. Use the Pythagorean theorem to find the length of that altitude.
5. Derive the sine, cosine, and tangent for both $30^\circ$ and $60^\circ$ using this new triangle.
6. Imagine a right triangle where one angle shrinks to $0^\circ$ (forcing the other to $90^\circ$). Observe what happens to the lengths of the opposite and adjacent sides to derive the ratios for $0^\circ$ and $90^\circ$.

## Key ideas, with intuition
**The $45^\circ$ Triangle (Isosceles Right)**
If the two legs of a right triangle are equal (say, length 1), the angles opposite them must be equal ($45^\circ$). The hypotenuse is $\sqrt{1^2 + 1^2} = \sqrt{2}$. Therefore, the ratio of the opposite side to the hypotenuse is:
$$ \sin(45^\circ) = \cos(45^\circ) = \frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2} $$

**The $30^\circ$-$60^\circ$ Triangle (Half-Equilateral)**
An equilateral triangle with side length 2 has three $60^\circ$ angles. Slicing it in half yields a right triangle with a hypotenuse of 2, a short leg of 1 (half the base), and a long leg (the altitude). By Pythagoras, the altitude is $\sqrt{2^2 - 1^2} = \sqrt{3}$. 
From the $30^\circ$ angle, the opposite side is 1. From the $60^\circ$ angle, the opposite side is $\sqrt{3}$. 
$$ \sin(30^\circ) = \frac{1}{2}, \quad \sin(60^\circ) = \frac{\sqrt{3}}{2} $$

**The Extreme Angles ($0^\circ$ and $90^\circ$)**
Think of $\sin(\theta)$ as the "verticalness" and $\cos(\theta)$ as the "horizontalness" of a hypotenuse of length 1. 
At $0^\circ$, the triangle is completely flat: the vertical height is 0, so $\sin(0^\circ)=0$. The horizontal length matches the hypotenuse, so $\cos(0^\circ)=1$. 
At $90^\circ$, the triangle is perfectly straight up: the vertical height is 1, so $\sin(90^\circ)=1$. The horizontal length is 0, so $\cos(90^\circ)=0$.

## Worked example
**Problem:** Evaluate exactly: $\sin^2(30^\circ) + \cos^2(45^\circ) - \tan(60^\circ)$.

**Step 1: Find $\sin(30^\circ)$.**
From the half-equilateral triangle, the side opposite $30^\circ$ is 1, and the hypotenuse is 2.
$\sin(30^\circ) = \frac{1}{2}$.

**Step 2: Find $\cos(45^\circ)$.**
From the isosceles right triangle, the adjacent side is 1, and the hypotenuse is $\sqrt{2}$.
$\cos(45^\circ) = \frac{1}{\sqrt{2}}$.

**Step 3: Find $\tan(60^\circ)$.**
From the half-equilateral triangle, the side opposite $60^\circ$ is $\sqrt{3}$, and the adjacent side is 1.
$\tan(60^\circ) = \frac{\sqrt{3}}{1} = \sqrt{3}$.

**Step 4: Substitute and compute.**
$$ \left(\frac{1}{2}\right)^2 + \left(\frac{1}{\sqrt{2}}\right)^2 - \sqrt{3} $$
$$ = \frac{1}{4} + \frac{1}{2} - \sqrt{3} $$
$$ = \frac{3}{4} - \sqrt{3} $$

*Reflection:* By relying on geometric derivations rather than a calculator, we maintain absolute mathematical precision. Squaring the ratios eliminates the radicals for the $45^\circ$ term, demonstrating why exact fractional forms are algebraically superior to decimals.

## Diagrams
```text
  45°-45°-90° Triangle              30°-60°-90° Triangle
  (Half of a square)                (Half of an equilateral)

       *                                  *
       |\                                 |\
       | \                                | \
       |  \                               |  \
     1 |   \  sqrt(2)             sqrt(3) |   \  2
       |    \                             |    \
       |     \                            |     \
       |_ _ _ \                           |_ _ _ \
         1                                   1

  Angles:                           Angles:
  Bottom-left = 90°                 Bottom-left = 90°
  Top = 45°                         Top = 30°
  Bottom-right = 45°                Bottom-right = 60°
```

## Memory technique — remember this forever
1. **The $\frac{\sqrt{x}}{2}$ Pattern:** Write the standard angles in ascending order: $0^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ$. 
For sine, the numerators follow the pattern $\sqrt{0}, \sqrt{1}, \sqrt{2}, \sqrt{3}, \sqrt{4}$, all divided by 2. 
Simplifying these gives $0, \frac{1}{2}, \frac{\sqrt{2}}{2}, \frac{\sqrt{3}}{2}, 1$. 
Cosine is the exact reverse sequence. Tangent is simply sine divided by cosine.
2. **Overlearn these three facts:**
   $$ \sin(30^\circ) = \frac{1}{2} $$
   $$ \sin(45^\circ) = \frac{\sqrt{2}}{2} $$
   $$ \sin(60^\circ) = \frac{\sqrt{3}}{2} $$
3. **Spaced-repetition schedule:** Review this pattern and derive the triangles from scratch at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you blank on a test, do not panic. Draw a square of side 1 and cut it diagonally. Draw an equilateral triangle of side 2 and cut it in half. Use the Pythagorean theorem to label the missing sides. Read the ratios directly off the triangles using SOH CAH TOA.

## Common mistakes
* **Swapping $\sin(30^\circ)$ and $\sin(60^\circ)$:** Remember that a smaller angle opens up to a smaller side. $30^\circ$ is smaller than $60^\circ$, so it opens to the side of length 1, not $\sqrt{3}$. Therefore, $\sin(30^\circ)$ must be the smaller value ($\frac{1}{2}$).
* **Confusing Undefined with Zero:** $\tan(0^\circ) = \frac{0}{1} = 0$. However, $\tan(90^\circ) = \frac{1}{0}$, which is strictly undefined. Do not write 0 for $\tan(90^\circ)$.
* **Forgetting to rationalize the denominator:** Writing $\frac{1}{\sqrt{2}}$ is mathematically correct, but standard conventions (and multiple-choice tests) almost always write it as $\frac{\sqrt{2}}{2}$. Be fluent in converting between the two.

## Self-check
1. Using the $30^\circ$-$60^\circ$-$90^\circ$ triangle, prove geometrically that $\sin(30^\circ) = \cos(60^\circ)$.
2. Evaluate the expression $\frac{\sin(45^\circ) \cdot \cos(45^\circ)}{\tan(60^\circ)}$ exactly. Leave no square roots in the denominator.
3. A rocket is launched at a $60^\circ$ angle relative to the flat ground. If it travels 10,000 meters exactly along its straight flight path, what is its exact altitude?