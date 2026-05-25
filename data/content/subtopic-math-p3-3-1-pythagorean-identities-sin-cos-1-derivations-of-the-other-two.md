## What it is
The Pythagorean identities are fundamental equations linking the squares of trigonometric functions. They are direct translations of the Pythagorean theorem ($a^2 + b^2 = c^2$) applied to the geometry of a right triangle inscribed within a unit circle. 

## Why it matters
These identities are the primary algebraic tools for simplifying complex trigonometric expressions and solving trigonometric equations. In calculus, they are essential for integrating rational functions via trigonometric substitution. In physics and aerospace, they allow you to convert between orthogonal vectors (like horizontal and vertical velocity components) and simplify the differential equations governing orbital mechanics and harmonic oscillators.

## When to study it
You must already understand the unit circle, the definitions of all six trigonometric functions ($\sin, \cos, \tan, \sec, \csc, \cot$), and the Pythagorean theorem. If you cannot instantly recall that $\tan(\theta) = \frac{\sin(\theta)}{\cos(\theta)}$ or $\sec(\theta) = \frac{1}{\cos(\theta)}$, stop and review those definitions first. 

## How to study it (step by step)
1. Draw a unit circle with a right triangle inside it in the first quadrant. Label the horizontal leg $\cos(\theta)$, the vertical leg $\sin(\theta)$, and the hypotenuse $1$.
2. Write down the Pythagorean theorem for this specific triangle to derive the anchor identity: $\sin^2(\theta) + \cos^2(\theta) = 1$.
3. Divide the entire anchor equation by $\cos^2(\theta)$. Simplify the resulting fractions using the definitions of tangent and secant to find the second identity.
4. Divide the anchor equation by $\sin^2(\theta)$. Simplify using the definitions of cotangent and cosecant to find the third identity.
5. Algebraically rearrange all three identities to solve for each individual squared term (e.g., isolate $\sin^2(\theta)$ to get $1 - \cos^2(\theta)$). 
6. Solve 5-10 algebraic simplification problems where you substitute these identities to reduce multi-term expressions into a single trigonometric function.

## Key ideas, with intuition

**The Unit Circle Anchor**
Any point $(x, y)$ on the unit circle defines a right triangle with legs $x$ and $y$, and hypotenuse $1$. By definition, $x = \cos(\theta)$ and $y = \sin(\theta)$. The Pythagorean theorem $x^2 + y^2 = 1$ immediately becomes:
$$ \sin^2(\theta) + \cos^2(\theta) = 1 $$
This is not a new rule; it is literally just the geometry of a circle written in trigonometric language.

**The Tangent/Secant Link**
If you take the anchor equation and divide every term by $\cos^2(\theta)$, you are geometrically scaling the triangle. You are dividing the side lengths by $\cos(\theta)$ so that the adjacent side becomes $1$. The opposite side becomes $\frac{\sin(\theta)}{\cos(\theta)} = \tan(\theta)$, and the hypotenuse becomes $\frac{1}{\cos(\theta)} = \sec(\theta)$. 
$$ \frac{\sin^2(\theta)}{\cos^2(\theta)} + \frac{\cos^2(\theta)}{\cos^2(\theta)} = \frac{1}{\cos^2(\theta)} $$
$$ \tan^2(\theta) + 1 = \sec^2(\theta) $$

**The Cotangent/Cosecant Link**
Similarly, dividing the anchor by $\sin^2(\theta)$ scales the triangle so the opposite side is $1$. The adjacent side becomes $\cot(\theta)$ and the hypotenuse becomes $\csc(\theta)$:
$$ \frac{\sin^2(\theta)}{\sin^2(\theta)} + \frac{\cos^2(\theta)}{\sin^2(\theta)} = \frac{1}{\sin^2(\theta)} $$
$$ 1 + \cot^2(\theta) = \csc^2(\theta) $$

## Worked example
**Problem:** Prove the identity $\frac{1}{1 - \sin(\theta)} + \frac{1}{1 + \sin(\theta)} = 2\sec^2(\theta)$.

**Step 1: Find a common denominator to combine the fractions.**
$$ \frac{1(1 + \sin(\theta)) + 1(1 - \sin(\theta))}{(1 - \sin(\theta))(1 + \sin(\theta))} $$

**Step 2: Simplify the numerator and expand the denominator.**
The numerator simplifies to $1 + \sin(\theta) + 1 - \sin(\theta) = 2$.
The denominator is a difference of squares: $(1 - \sin(\theta))(1 + \sin(\theta)) = 1 - \sin^2(\theta)$.
$$ \frac{2}{1 - \sin^2(\theta)} $$

**Step 3: Apply the Pythagorean identity.**
Since $\sin^2(\theta) + \cos^2(\theta) = 1$, we know that $1 - \sin^2(\theta) = \cos^2(\theta)$.
$$ \frac{2}{\cos^2(\theta)} $$

**Step 4: Convert to secant.**
Since $\frac{1}{\cos(\theta)} = \sec(\theta)$, we have:
$$ 2\sec^2(\theta) $$

*Reflection:* Finding a common denominator created a difference of squares ($1 - \sin^2(\theta)$) in the denominator. In trigonometry, a difference of squares involving $1$ and a trig function is a massive structural hint to use a Pythagorean identity. It allows you to compress a two-term expression into a single term ($\cos^2(\theta)$), which can then be moved to the numerator.

## Diagrams

```text
      y
      ^
      |
      |           /| (cos θ, sin θ)
      |        1 / |
      |         /  | 
      |        /   | sin θ
      |       /    |
      |      /θ    |
______|_____/______|________> x
      |    0       
      |      cos θ
      |
```

## Memory technique — remember this forever

1. **The Mnemonic Hooks:**
   * For $\tan^2(\theta) + 1 = \sec^2(\theta)$: Think **"I tan in a sec"** (I get a tan in a second). 
   * For $1 + \cot^2(\theta) = \csc^2(\theta)$: Think **"I cot a cosec"** (I caught a cold/cosec).
2. **Formulas to Overlearn:**
   * $$ \sin^2(\theta) + \cos^2(\theta) = 1 $$
   * $$ \tan^2(\theta) + 1 = \sec^2(\theta) $$
   * $$ 1 + \cot^2(\theta) = \csc^2(\theta) $$
3. **Spaced-Repetition Schedule:** Write these out from memory, then derive the bottom two from the top one. Do this at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you ever blank on a test, draw a right triangle with hypotenuse $1$, adjacent $\cos(\theta)$, and opposite $\sin(\theta)$. Write $a^2 + b^2 = c^2$. You now have $\sin^2(\theta) + \cos^2(\theta) = 1$. Divide by $\cos^2(\theta)$ to get the tangent version; divide by $\sin^2(\theta)$ to get the cotangent version. You never need to memorize if you can build.

## Common mistakes
* **Ignoring the squares:** Students often write $\sin(\theta) + \cos(\theta) = 1$. This is completely false. The identity *only* works for squares.
* **Messing up the signs/order:** Writing $\sec^2(\theta) + 1 = \tan^2(\theta)$ is a common error. If you are ever unsure where the $+1$ goes, spend 10 seconds dividing $\sin^2 + \cos^2 = 1$ by $\cos^2$ to check yourself.
* **Notation confusion:** Forgetting that $\sin^2(\theta)$ means $(\sin(\theta))^2$. It does *not* mean $\sin(\theta^2)$. 

## Self-check
1. Simplify the expression: $(1 - \cos^2(x))\csc^2(x)$.
2. Prove the identity: $\tan^4(x) + \tan^2(x) = \sec^4(x) - \sec^2(x)$.
3. If $\sec(\theta) = \frac{5}{3}$ and $\theta$ is in the fourth quadrant, use the Pythagorean identities to find the exact values of $\tan(\theta)$ and $\sin(\theta)$.