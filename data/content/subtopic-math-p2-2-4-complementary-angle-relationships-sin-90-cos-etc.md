## What it is
Complementary angles are two angles that sum to $90^\circ$ (or $\frac{\pi}{2}$ radians). The complementary angle relationships—often called cofunction identities—state that the trigonometric function of an angle is exactly equal to the "co"-function of its complement. Geometrically, this is simply the result of looking at a right triangle from the perspective of the other non-right angle.

## Why it matters
These relationships are heavily used to simplify complex trigonometric expressions and integrals in calculus. In physics and aerospace, they allow you to seamlessly shift reference frames. For example, if you know a rocket's thrust vector angle relative to the horizon (elevation), you can instantly rewrite the physics equations relative to the vertical axis (zenith) by swapping sines for cosines. 

## When to study it
You must already understand:
1. The definition of a right triangle and the fact that its interior angles sum to $180^\circ$.
2. Basic right triangle trigonometry (SOH CAH TOA).
If you cannot instantly define sine, cosine, and tangent as ratios of opposite, adjacent, and hypotenuse sides, stop and master those first.

## How to study it (step by step)
1. Draw a right triangle. Label the right angle $90^\circ$. Label one acute angle $\theta$. 
2. Deduce the third angle. Since a triangle's angles sum to $180^\circ$, the third angle must be $180^\circ - 90^\circ - \theta = 90^\circ - \theta$.
3. Label the sides $a$ (opposite $\theta$), $b$ (adjacent to $\theta$), and $c$ (hypotenuse).
4. Write out the ratio for $\sin(\theta)$ using the side labels.
5. Shift your focus to the angle $(90^\circ - \theta)$. Write out the ratio for $\cos(90^\circ - \theta)$. 
6. Observe that the ratios are identical. Equate them to establish the identity.
7. Repeat this derivation for tangent/cotangent and secant/cosecant.

## Key ideas, with intuition

**1. The "Co" means Complement**
Cosine is not an arbitrary name. It literally means "sine of the complement." Cotangent means "tangent of the complement." Cosecant means "secant of the complement." The etymology of the words hands you the mathematical identity on a silver platter.

**2. The Shift in Perspective**
A right triangle has two acute angles. The side that is "opposite" to one angle is inherently "adjacent" to the other. 
$$ \text{Opposite}(\theta) = \text{Adjacent}(90^\circ - \theta) $$
Because sine relies on the opposite side and cosine relies on the adjacent side, swapping the angle forces a swap of the function.

**3. The Core Identities**
For any angle $\theta$ (in degrees):
$$ \sin(90^\circ - \theta) = \cos(\theta) $$
$$ \cos(90^\circ - \theta) = \sin(\theta) $$
$$ \tan(90^\circ - \theta) = \cot(\theta) $$
*(Note: To use radians, simply replace $90^\circ$ with $\frac{\pi}{2}$.)*

## Worked example
**Problem:** Solve for the acute angle $x$ if $\sin(2x) = \cos(x - 15^\circ)$.

**Step 1:** Recognize that we cannot easily solve an equation with sine on one side and cosine on the other. We must convert one to match the other using a cofunction identity. We know that $\cos(\alpha) = \sin(90^\circ - \alpha)$.

**Step 2:** Apply the identity to the right side of the equation. Let $\alpha = (x - 15^\circ)$.
$$ \cos(x - 15^\circ) = \sin(90^\circ - (x - 15^\circ)) $$

**Step 3:** Substitute this back into the original equation.
$$ \sin(2x) = \sin(90^\circ - (x - 15^\circ)) $$

**Step 4:** Since both angles are acute, we can equate the arguments inside the sine functions.
$$ 2x = 90^\circ - (x - 15^\circ) $$

**Step 5:** Distribute the negative sign carefully and solve for $x$.
$$ 2x = 90^\circ - x + 15^\circ $$
$$ 2x = 105^\circ - x $$
$$ 3x = 105^\circ $$
$$ x = 35^\circ $$

*Reflection:* By translating cosine into sine via the complementary relationship, we created an "apples-to-apples" comparison that reduced a trigonometric problem to basic algebra.

## Diagrams

```text
       B
       |\
       | \
       |  \
       |   \ 
     a |    \ c
       |     \
       |      \
       |_______\ A
      C    b
```
Let angle $C = 90^\circ$. 
Let angle $A = \theta$. 
Therefore, angle $B = 90^\circ - \theta$.

From the perspective of $A$ ($\theta$):
*   Opposite side = $a$
*   Adjacent side = $b$
*   $$ \sin(\theta) = \frac{a}{c} $$

From the perspective of $B$ ($90^\circ - \theta$):
*   Opposite side = $b$
*   Adjacent side = $a$
*   $$ \cos(90^\circ - \theta) = \frac{a}{c} $$

Conclusion: $\sin(\theta) = \cos(90^\circ - \theta)$ because they both describe the exact same physical ratio ($\frac{a}{c}$) in this triangle.

## Memory technique — remember this forever
1. **The Hook:** "CO means COmplement." If you see a "co" in the function name, it is the complement of the function without the "co". 
2. **Must overlearn:** 
   * $\sin(90^\circ - \theta) = \cos(\theta)$
   * $\tan(90^\circ - \theta) = \cot(\theta)$
   * $\sec(90^\circ - \theta) = \csc(\theta)$
3. **Spaced-repetition schedule:** Review this derivation today, tomorrow (Day 1), Day 3, Day 7, Day 16, and Day 35. 
4. **First principles pathway:** If you ever forget the identities, draw a right triangle. Label the non-right angles $\theta$ and $90^\circ-\theta$. Write SOH CAH TOA for both angles. The identities will immediately appear on the page.

## Common mistakes
* **Confusing complementary ($90^\circ$) with supplementary ($180^\circ$).** The identity $\sin(180^\circ - \theta) = \sin(\theta)$ is a completely different relationship based on the unit circle's symmetry, not right triangle cofunctions.
* **Algebraic sign errors.** When applying the identity to an expression, students often fail to distribute the negative. E.g., writing $90^\circ - (x - 10^\circ)$ as $90^\circ - x - 10^\circ$ instead of the correct $90^\circ - x + 10^\circ$.
* **Mixing up reciprocal and cofunction identities.** Sine's *reciprocal* is cosecant ($\frac{1}{\sin} = \csc$). Sine's *cofunction* is cosine. Do not conflate the two.

## Self-check
1. Express $\tan(72^\circ)$ in terms of its cofunction.
2. Solve for the acute angle $\alpha$: $\sec(3\alpha) = \csc(\alpha + 10^\circ)$.
3. Prove that $\sin^2(15^\circ) + \sin^2(75^\circ) = 1$ without using a calculator. (Hint: Use a cofunction identity on one of the terms, then apply a fundamental trigonometric identity).