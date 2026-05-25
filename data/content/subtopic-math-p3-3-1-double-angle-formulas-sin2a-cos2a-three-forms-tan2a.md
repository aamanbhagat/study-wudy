## What it is
Double angle formulas are trigonometric identities that express the sine, cosine, or tangent of twice an angle ($2A$) in terms of the trigonometric functions of the original single angle ($A$). They are a direct, specialized consequence of the angle addition formulas where the two angles being added are identical.

## Why it matters
These formulas are the primary tool for manipulating the frequency of periodic functions. In calculus, you cannot easily integrate expressions like $\sin^2(x)$ or $\cos^2(x)$; you must use the rearranged double angle formulas to step down the power to $\cos(2x)$, which integrates trivially. In aerospace and physics, they are used to analyze wave interference, beat frequencies, and orbital mechanics, allowing engineers to calculate peak amplitudes when two identical waveforms superimpose.

## When to study it
You must already possess a rock-solid understanding of:
1. The unit circle and the definitions of sine, cosine, and tangent.
2. The fundamental Pythagorean identity: $\sin^2 A + \cos^2 A = 1$.
3. The angle addition formulas: $\sin(A+B)$, $\cos(A+B)$, and $\tan(A+B)$. 
If you cannot derive or confidently recall the angle addition formulas, stop here. Go back and master them. You cannot build a bridge on a cracked foundation.

## How to study it (step by step)
1. **Derive the base forms:** Write down the formulas for $\sin(A+B)$, $\cos(A+B)$, and $\tan(A+B)$. Substitute $B = A$ into each and simplify. Do this until you can do it in under 60 seconds.
2. **Derive the alternate cosine forms:** Take your result for $\cos(2A)$. Substitute $\sin^2 A = 1 - \cos^2 A$ to find the cosine-only form. Then, substitute $\cos^2 A = 1 - \sin^2 A$ into the base form to find the sine-only form.
3. **Isolate the squares:** Rearrange your two alternate $\cos(2A)$ formulas to solve for $\sin^2 A$ and $\cos^2 A$. These are the "power-reduction" formulas.
4. **Solve homogeneous equations:** Practice solving equations like $\sin(2x) = \cos(x)$ by using the double angle formula to ensure all trigonometric functions in the equation operate on the same argument ($x$).
5. **Verify identities:** Work through 5-10 proofs requiring you to transform one side of a complex trigonometric equation into the other using these formulas.

## Key ideas, with intuition
**1. The Sine Double Angle**
Start with $\sin(A+B) = \sin A \cos B + \cos A \sin B$. When the angles are the same ($B=A$), the two terms become identical. They perfectly stack:
$$ \sin(2A) = \sin A \cos A + \cos A \sin A $$
$$ \sin(2A) = 2\sin A \cos A $$

**2. The Cosine Double Angle (Base Form)**
Start with $\cos(A+B) = \cos A \cos B - \sin A \sin B$. Setting $B=A$ yields a difference of squares. Notice how it resembles the Pythagorean identity, but with a minus sign:
$$ \cos(2A) = \cos^2 A - \sin^2 A $$

**3. The Cosine Double Angle (Alternate Forms)**
The base form of $\cos(2A)$ contains both sine and cosine. By leveraging $\sin^2 A + \cos^2 A = 1$, we can force $\cos(2A)$ to speak strictly in terms of sine, or strictly in terms of cosine. 
Substitute $\sin^2 A = 1 - \cos^2 A$:
$$ \cos(2A) = \cos^2 A - (1 - \cos^2 A) \implies \cos(2A) = 2\cos^2 A - 1 $$
Substitute $\cos^2 A = 1 - \sin^2 A$:
$$ \cos(2A) = (1 - \sin^2 A) - \sin^2 A \implies \cos(2A) = 1 - 2\sin^2 A $$

**4. The Tangent Double Angle**
Start with $\tan(A+B) = \frac{\tan A + \tan B}{1 - \tan A \tan B}$. Setting $B=A$ doubles the numerator and squares the term in the denominator:
$$ \tan(2A) = \frac{2\tan A}{1 - \tan^2 A} $$

## Worked example
**Problem:** Solve $\cos(2x) + 3\sin(x) - 2 = 0$ for $x$ in the interval $[0, 2\pi)$.

**Step 1:** Recognize the argument mismatch. We have $2x$ and $x$. We must unify the arguments to $x$.
**Step 2:** Choose the optimal double angle formula. Because the middle term is $3\sin(x)$, we want the entire equation in terms of sine. We select $\cos(2x) = 1 - 2\sin^2(x)$.
**Step 3:** Substitute and simplify.
$$ (1 - 2\sin^2 x) + 3\sin x - 2 = 0 $$
$$ -2\sin^2 x + 3\sin x - 1 = 0 $$
Multiply by $-1$ to make the leading coefficient positive:
$$ 2\sin^2 x - 3\sin x + 1 = 0 $$
**Step 4:** Factor the quadratic. Let $u = \sin x$. The equation is $2u^2 - 3u + 1 = 0$, which factors to $(2u - 1)(u - 1) = 0$.
$$ (2\sin x - 1)(\sin x - 1) = 0 $$
**Step 5:** Solve for $\sin x$.
$$ \sin x = \frac{1}{2} \quad \text{or} \quad \sin x = 1 $$
**Step 6:** Find $x$ on the unit circle for $[0, 2\pi)$.
For $\sin x = \frac{1}{2}$, $x = \frac{\pi}{6}, \frac{5\pi}{6}$.
For $\sin x = 1$, $x = \frac{\pi}{2}$.

*Reflection:* By choosing the sine-only form of $\cos(2x)$, we transformed a transcendental equation with mixed arguments into a standard quadratic equation that easily factored. 

## Diagrams
Here is a geometric visualization of the double angle on the unit circle. Notice that doubling the angle does *not* simply double the $y$-coordinate (sine) or $x$-coordinate (cosine). 

```text
               y
               |   Point P2: (cos 2A, sin 2A)
               |  /
               | /
               |/  Angle 2A
               + - - - - - - - - - 
              /|
             / |   Point P1: (cos A, sin A)
            /  |  /
           /   | /
          /    |/  Angle A
         +-----+------------------ x
        Origin
```
*Prose description for deeper geometry:* To geometrically prove $\sin(2A) = 2\sin A\cos A$, draw a right triangle inscribed in a semicircle of radius 1 (diameter = 2). Let one acute angle be $A$. The opposite side is $2\sin A$ and the adjacent is $2\cos A$. The area of this triangle is $\frac{1}{2}(2\sin A)(2\cos A) = 2\sin A\cos A$. If you calculate the area a second way—using the diameter as the base and the height as $\sin(2A)$—the area is $\frac{1}{2}(2)(\sin 2A) = \sin(2A)$. Equating the two areas yields the identity.

## Memory technique — remember this forever
**1. The Mnemonic Hook:** *"Sine is the friendly mixer, Cosine is the selfish snob."*
*   **Sine** mixes things up: $\sin(2A)$ puts Sine and Cosine together in the same term ($2\sin A\cos A$).
*   **Cosine** is a snob: $\cos(2A)$ groups Cosines with Cosines and Sines with Sines ($\cos^2 A - \sin^2 A$). Furthermore, Cosine is selfish—it always puts itself first and positive.

**2. The Must-Overlearn Formulas:**
*   $\sin(2A) = 2\sin A\cos A$
*   $\cos(2A) = \cos^2 A - \sin^2 A$

**3. Spaced-Repetition Schedule:**
Test yourself on deriving all five formulas (one sine, three cosine, one tangent) at these intervals: 1 day, 3 days, 7 days, 16 days, and 35 days.

**4. The First Principles Pathway:**
If you ever blank on a test, write down the addition formulas: $\sin(A+B)$ or $\cos(A+B)$. Replace every $B$ with an $A$. You will rebuild the formulas flawlessly in 15 seconds.

## Common mistakes
*   **The Linearity Trap:** Students intuitively (and incorrectly) write $\sin(2A) = 2\sin A$. Trigonometric functions are *not* linear. Doubling the angle does not double the output. 
*   **Sign Errors in Cosine:** Mixing up the alternate cosine forms, such as writing $\cos(2A) = 2\sin^2 A - 1$ or $\cos(2A) = 1 - 2\cos^2 A$. Remember the snob mnemonic: Cosine puts itself *first and positive*.
*   **Tangent Denominator:** Forgetting that the denominator in $\tan(2A)$ is $1 - \tan^2 A$, confusing it with a Pythagorean identity (which has a plus sign).

## Self-check
1. Evaluate exactly, without a calculator: $\cos^2(15^\circ) - \sin^2(15^\circ)$.
2. Express $\sin(3x)$ entirely in terms of $\sin(x)$. (Hint: treat $3x$ as $2x + x$ and use both addition and double angle formulas).
3. Prove the identity: $\tan(A) + \cot(A) = 2\csc(2A)$.