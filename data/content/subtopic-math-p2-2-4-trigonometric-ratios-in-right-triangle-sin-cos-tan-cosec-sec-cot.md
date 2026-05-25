## What it is
Trigonometric ratios are simply the ratios of the side lengths of a right-angled triangle, evaluated relative to a specific acute angle. Instead of dealing with absolute lengths, they describe the fundamental, scale-invariant shape of the triangle. The six ratios—sine, cosine, tangent, cosecant, secant, and cotangent—map a given angle to these specific geometric proportions.

## Why it matters
These ratios are the bedrock of resolving vectors into components, which is mandatory for calculating forces on a rocket, aerodynamic lift, or velocities in orbital mechanics. In computer science and physics, they form the basis of wave mechanics and Fourier transforms, allowing you to decompose complex signals into simple oscillations. Without them, you cannot model rotation, oscillation, or any 2D/3D geometry.

## When to study it
You must already understand basic geometry (angles, parallel lines, properties of triangles) and the Pythagorean theorem ($a^2 + b^2 = c^2$). You must also be highly comfortable with algebraic fractions and ratios. If you cannot confidently manipulate fractions or solve a basic algebraic equation for an unknown variable, review those concepts first.

## How to study it (step by step)
1. Draw a right triangle. Pick one of the acute angles and label it $\theta$. Explicitly label the three sides relative to $\theta$: Hypotenuse (longest), Opposite (across from $\theta$), and Adjacent (next to $\theta$).
2. Write out the definitions of the primary three ratios: $\sin(\theta)$, $\cos(\theta)$, and $\tan(\theta)$ as fractions of these sides.
3. Define the reciprocal ratios ($\csc$, $\sec$, $\cot$) and write them as $1/\sin$, $1/\cos$, and $1/\tan$.
4. Pick an angle (e.g., $30^\circ$) and draw a right triangle with known side lengths ($1, \sqrt{3}, 2$). Calculate all six ratios manually to see them in action.
5. Use the definitions of sine and cosine alongside the Pythagorean theorem to prove the fundamental identity: $\sin^2(\theta) + \cos^2(\theta) = 1$.

## Key ideas, with intuition

**1. Similarity implies constant ratios**
If you scale a right triangle up or down, the angles do not change. Because the triangles remain geometrically similar, the *ratios* of their side lengths remain identical. This is why $\sin(\theta)$ depends *only* on the angle $\theta$, not on how large you draw the triangle.

**2. The Primary Three**
The core trigonometric functions are defined as follows:
$$ \sin(\theta) = \frac{\text{Opposite}}{\text{Hypotenuse}}, \quad \cos(\theta) = \frac{\text{Adjacent}}{\text{Hypotenuse}}, \quad \tan(\theta) = \frac{\text{Opposite}}{\text{Adjacent}} $$
*Intuition:* Sine measures "how vertical" the triangle is relative to the hypotenuse. Cosine measures "how horizontal" it is. Tangent measures the "slope" (rise over run) of the hypotenuse relative to the adjacent side.

**3. The Reciprocal Three**
The remaining three ratios are simply the reciprocals of the primary three. They exist largely for algebraic convenience so we don't have to write fractions constantly.
$$ \csc(\theta) = \frac{\text{Hypotenuse}}{\text{Opposite}} = \frac{1}{\sin(\theta)} $$
$$ \sec(\theta) = \frac{\text{Hypotenuse}}{\text{Adjacent}} = \frac{1}{\cos(\theta)} $$
$$ \cot(\theta) = \frac{\text{Adjacent}}{\text{Opposite}} = \frac{1}{\tan(\theta)} $$

## Worked example
**Problem:** Given a right triangle where $\sin(\theta) = \frac{3}{5}$, find the exact values of the other five trigonometric ratios.

**Step 1: Assign side lengths based on the given ratio.**
Since $\sin(\theta) = \frac{\text{Opposite}}{\text{Hypotenuse}} = \frac{3}{5}$, we can model a triangle where the Opposite side is $3$ and the Hypotenuse is $5$. (Any multiple, like $6$ and $10$, works, but $3$ and $5$ are simplest).

**Step 2: Find the missing side using the Pythagorean theorem.**
$$ (\text{Adjacent})^2 + (\text{Opposite})^2 = (\text{Hypotenuse})^2 $$
$$ a^2 + 3^2 = 5^2 $$
$$ a^2 + 9 = 25 \implies a^2 = 16 \implies a = 4 $$
The Adjacent side is $4$.

**Step 3: Calculate the remaining primary ratios.**
$$ \cos(\theta) = \frac{\text{Adjacent}}{\text{Hypotenuse}} = \frac{4}{5} $$
$$ \tan(\theta) = \frac{\text{Opposite}}{\text{Adjacent}} = \frac{3}{4} $$

**Step 4: Calculate the reciprocal ratios.**
$$ \csc(\theta) = \frac{5}{3}, \quad \sec(\theta) = \frac{5}{4}, \quad \cot(\theta) = \frac{4}{3} $$

*Reflection:* By knowing just one ratio, we fixed the shape of the right triangle up to a scaling factor. The Pythagorean theorem provided the missing dimension, unlocking all other geometric proportions.

## Diagrams

```text
       *
      /|
     / |
  H /  | O
   /   |
  /    |
 /θ____|
    A

H = Hypotenuse (longest side, opposite the 90° angle)
O = Opposite (side directly across from angle θ)
A = Adjacent (side forming the angle θ alongside the hypotenuse)
```

## Memory technique — remember this forever
1. **The Mnemonic:** **SOH CAH TOA**. 
   * **S**ine is **O**pposite over **H**ypotenuse.
   * **C**osine is **A**djacent over **H**ypotenuse.
   * **T**angent is **O**pposite over **A**djacent.
   * *For the reciprocals:* Remember that the letters swap. **S**ecant goes with **C**osine. **C**osecant goes with **S**ine. (Tangent and Cotangent obviously pair together).

2. **Must-overlearn formulas:**
   $$ \tan(\theta) = \frac{\sin(\theta)}{\cos(\theta)} $$
   $$ \sin^2(\theta) + \cos^2(\theta) = 1 $$

3. **Spaced-repetition schedule:** Review SOH CAH TOA, the reciprocal pairings, and the Pythagorean identity at 1 day, 3 days, 7 days, 16 days, and 35 days.

4. **First principles pathway:** If you forget everything, draw a right triangle. Label the sides $a, b, c$. You know $a^2 + b^2 = c^2$. Divide the entire equation by $c^2$ to get $(a/c)^2 + (b/c)^2 = 1$. You have just re-derived $\sin^2(\theta) + \cos^2(\theta) = 1$ from basic geometry.

## Common mistakes
* **Misidentifying the Adjacent and Opposite sides:** When the triangle is rotated, students often assume the "bottom" horizontal side is the Adjacent. Always find the Hypotenuse first (opposite the right angle), then the Opposite (across from $\theta$). The remaining side is the Adjacent.
* **Confusing reciprocal functions with inverse functions:** $\sin^{-1}(x)$ is the *inverse* sine (arcsine), which finds an angle given a ratio. It is completely different from $(\sin(x))^{-1} = \frac{1}{\sin(x)} = \csc(x)$.
* **Pairing secant with sine:** Students see the "s" in secant and assume it is $1/\sin$. It is not. $\sec(\theta) = 1/\cos(\theta)$.

## Self-check
1. If $\tan(\theta) = 1$ in a right triangle, what are the exact values of $\sin(\theta)$ and $\cos(\theta)$?
2. A right triangle has side lengths $7, 24,$ and $25$. For the smallest angle $\alpha$ in this triangle, compute $\sec(\alpha)$.
3. Prove algebraically, using only the side-ratio definitions (Opposite, Adjacent, Hypotenuse), that $\tan(\theta) + \cot(\theta) = \sec(\theta)\csc(\theta)$.