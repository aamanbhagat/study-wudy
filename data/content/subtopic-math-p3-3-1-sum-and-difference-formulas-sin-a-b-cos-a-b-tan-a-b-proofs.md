## What it is
The sum and difference formulas are trigonometric identities that allow you to expand the sine, cosine, or tangent of a combined angle $(A \pm B)$ into an expression using the trigonometric values of the individual angles $A$ and $B$. They are the algebraic bridge between angle addition and trigonometric ratios.

## Why it matters
These formulas are the bedrock of wave mechanics and signal processing. In physics, when two waves interfere, these identities determine the resulting superposition (beat frequencies). In aerospace, resolving thrust vectors or angular momentum into rotating reference frames requires expanding $\cos(\theta + \phi)$. In calculus, you cannot derive the fundamental derivatives of $\sin(x)$ and $\cos(x)$ without using these exact sum formulas to evaluate the limit definition of the derivative.

## When to study it
Do not attempt this until you have absolute mastery over:
1. Right-triangle trigonometry (SOH CAH TOA).
2. The Unit Circle (exact values for $30^\circ, 45^\circ, 60^\circ$, etc., in all quadrants).
3. The Pythagorean identity: $\sin^2\theta + \cos^2\theta = 1$.
4. Even and odd functions: $\sin(-\theta) = -\sin(\theta)$ and $\cos(-\theta) = \cos(\theta)$.

If you hesitate on any of the above, stop and review them. You cannot build a skyscraper on a swamp.

## How to study it (step by step)
1. **Derive the sum formulas geometrically:** Draw the stacked right-triangle proof for $\sin(A+B)$ and $\cos(A+B)$. You must see visually why the lengths add up.
2. **Derive the difference formulas algebraically:** Substitute $-B$ for $B$ into your sum formulas. Use the even/odd properties of sine and cosine to simplify the signs.
3. **Derive the tangent formulas:** Write $\tan(A+B) = \frac{\sin(A+B)}{\cos(A+B)}$. Expand both the numerator and denominator, then divide every single term by $\cos A \cos B$ to force tangents to appear.
4. **Derive the double angle formulas:** Substitute $B = A$ into the sum formulas to find $\sin(2A)$ and $\cos(2A)$. 
5. **Compute exact values:** Practice finding exact values for non-standard angles (like $15^\circ$ or $75^\circ$) by breaking them into sums or differences of standard unit circle angles ($45^\circ - 30^\circ$, $45^\circ + 30^\circ$).

## Key ideas, with intuition
**Idea 1: Trigonometry is not linear.** 
The most fatal assumption a student can make is that $\sin(A+B) = \sin A + \sin B$. If you double an angle, you do not double the height of the triangle. The relationship is rotational, not linear.

**Idea 2: The Core Formulas.**
$$ \sin(A \pm B) = \sin A \cos B \pm \cos A \sin B $$
$$ \cos(A \pm B) = \cos A \cos B \mp \sin A \sin B $$
$$ \tan(A \pm B) = \frac{\tan A \pm \tan B}{1 \mp \tan A \tan B} $$
Notice the sign inversion in the cosine formula ($\pm$ becomes $\mp$). When you add angles, the cosine (horizontal projection) shrinks faster, hence the subtraction.

**Idea 3: Parity makes half the formulas redundant.**
You only need to memorize the sum formulas. Because $\cos(-B) = \cos(B)$ and $\sin(-B) = -\sin(B)$, the difference formulas naturally emerge by plugging in a negative angle.

## Worked example
**Problem:** Calculate the exact value of $\cos(15^\circ)$ without a calculator.

**Step 1: Express $15^\circ$ as a difference of standard angles.**
$$ 15^\circ = 45^\circ - 30^\circ $$

**Step 2: Apply the cosine difference formula.**
$$ \cos(A - B) = \cos A \cos B + \sin A \sin B $$
$$ \cos(15^\circ) = \cos(45^\circ - 30^\circ) = \cos(45^\circ)\cos(30^\circ) + \sin(45^\circ)\sin(30^\circ) $$

**Step 3: Substitute exact values from the unit circle.**
$$ \cos(45^\circ) = \frac{\sqrt{2}}{2}, \quad \cos(30^\circ) = \frac{\sqrt{3}}{2} $$
$$ \sin(45^\circ) = \frac{\sqrt{2}}{2}, \quad \sin(30^\circ) = \frac{1}{2} $$

**Step 4: Multiply and add.**
$$ \cos(15^\circ) = \left(\frac{\sqrt{2}}{2}\right)\left(\frac{\sqrt{3}}{2}\right) + \left(\frac{\sqrt{2}}{2}\right)\left(\frac{1}{2}\right) $$
$$ \cos(15^\circ) = \frac{\sqrt{6}}{4} + \frac{\sqrt{2}}{4} = \frac{\sqrt{6} + \sqrt{2}}{4} $$

*Reflection:* By exploiting the difference formula, we bypassed numerical approximation. We mapped an unknown rotation to a linear combination of known geometric projections.

## Diagrams

To visualize $\sin(A+B)$ and $\cos(A+B)$, imagine two right triangles stacked on top of each other. 

```text
               P
              /| \
             / |   \  Length of OP = 1
            /  |     \
           / B |       \
          /    |         \
         O-----T----------S
          \  A |          |
           \   |          |
            \  |          |
             \ |          |
              \|__________|
               Q          R
```
*Prose description for geometric derivation:* 
Let vector $OP$ have length 1 and sit at angle $A+B$ from the x-axis. 
1. Draw a right triangle with angle $A$ resting on the x-axis. 
2. Stack a second right triangle with angle $B$ on the hypotenuse of the first. 
3. The total height of point $P$ is $\sin(A+B)$. By drawing horizontal and vertical lines from the intermediate vertices, you can split this total height into two segments: one of length $\sin A \cos B$ and another of length $\cos A \sin B$. 

## Memory technique — remember this forever
**1. The Mnemonic:**
*   **Sine is Social:** It mixes with cosine ($\sin\cos \pm \cos\sin$) and keeps its sign (positive attitude).
*   **Cosine is Cliquey:** It groups like with like ($\cos\cos \mp \sin\sin$) and flips its sign (negative attitude).
*   **Tangent:** "Tan plus Tan, over One minus Tan-Tan."

**2. The Must-Overlearn Formulas:**
$$ \sin(A + B) = \sin A \cos B + \cos A \sin B $$
$$ \cos(A + B) = \cos A \cos B - \sin A \sin B $$

**3. Spaced Repetition Schedule:**
Write these from memory at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

**4. The "First Principles" Pathway (Elite Level):**
If you are ever trapped on a desert island and forget the formulas, use Euler's Formula: $e^{i\theta} = \cos\theta + i\sin\theta$.
Write $e^{i(A+B)}$ in two different ways:
$$ e^{i(A+B)} = \cos(A+B) + i\sin(A+B) $$
$$ e^{i(A+B)} = e^{iA}e^{iB} = (\cos A + i\sin A)(\cos B + i\sin B) $$
Expand the right side:
$$ = (\cos A \cos B - \sin A \sin B) + i(\sin A \cos B + \cos A \sin B) $$
Equate the real parts to get the cosine sum formula. Equate the imaginary parts to get the sine sum formula. This is mathematically bulletproof and requires zero geometric memorization.

## Common mistakes
1. **The Linearity Trap:** Writing $\cos(A+B) = \cos A + \cos B$. This is an instant failure. Trigonometric functions are not linear multipliers.
2. **Sign Flipping in Cosine:** Forgetting that $\cos(A+B)$ uses a *minus* sign in its expansion, and $\cos(A-B)$ uses a *plus* sign.
3. **Quadrant Errors:** When given $\sin A = \frac{3}{5}$ and asked to find $\cos(A+B)$, students often assume $\cos A = \frac{4}{5}$. You must check which quadrant angle $A$ is in; if it's in Quadrant II, $\cos A = -\frac{4}{5}$.

## Self-check
1. Compute the exact value of $\sin(105^\circ)$. (Hint: $105^\circ = 60^\circ + 45^\circ$).
2. Prove that $\cos(x - \frac{\pi}{2}) = \sin x$ using the difference formula.
3. Given $\sin A = \frac{5}{13}$ (where $A$ is in Quadrant II) and $\cos B = \frac{3}{5}$ (where $B$ is in Quadrant IV), find the exact value of $\tan(A+B)$.