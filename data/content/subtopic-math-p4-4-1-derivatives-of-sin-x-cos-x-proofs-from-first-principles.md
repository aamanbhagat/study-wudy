## What it is
Deriving the derivatives of $\sin x$ and $\cos x$ from first principles means using the formal limit definition of the derivative, $f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$, rather than relying on memorized rules. This process proves that the instantaneous rate of change of a sine wave is a cosine wave, and the rate of change of a cosine wave is an inverted sine wave.

## Why it matters
These derivatives are the bedrock of modeling periodic phenomena. In physics and aerospace engineering, the fact that the second derivative of sine is its own negative ($f''(x) = -f(x)$) is the mathematical definition of Simple Harmonic Motion. You will use this exact relationship to model pendulum swings, orbital mechanics, AC circuits, and structural vibrations. Without these foundational proofs, differential equations and Fourier analysis are inaccessible.

## When to study it
Do not attempt this until you have mastered:
1. The limit definition of the derivative.
2. Angle addition formulas: $\sin(A+B)$ and $\cos(A+B)$.
3. The Squeeze Theorem, specifically applied to prove the small-angle limits: $\lim_{h \to 0} \frac{\sin h}{h} = 1$ and $\lim_{h \to 0} \frac{\cos h - 1}{h} = 0$. 
If you do not know why $\lim_{h \to 0} \frac{\sin h}{h} = 1$ in radians, go back and review geometric limit proofs.

## How to study it (step by step)
1. **Review the identities (10 mins):** Write down the angle addition formulas for sine and cosine. You cannot start the derivation without them.
2. **Verify the small-angle limits (15 mins):** Review the geometric proof (using the unit circle and areas of sectors) that $\lim_{h \to 0} \frac{\sin h}{h} = 1$. 
3. **Derive sine (20 mins):** Set up the limit definition for $f(x) = \sin x$. Expand the numerator using the addition formula, group terms, and apply the small-angle limits.
4. **Derive cosine (20 mins):** Repeat the exact same process for $g(x) = \cos x$. Pay strict attention to the negative sign that emerges.
5. **Graph them (15 mins):** Sketch $\sin x$. Below it, sketch its slope at $x = 0, \pi/2, \pi, 3\pi/2$. Verify visually that the slope graph perfectly matches $\cos x$.

## Key ideas, with intuition
**1. The Expansion**
When you plug a trigonometric function into the limit definition, you get an entangled term like $\sin(x+h)$. You cannot factor $h$ out of this. You must use the angle addition formula: 
$$ \sin(x+h) = \sin x \cos h + \cos x \sin h $$
This splits the variable $x$ (which is fixed during the limit) from the variable $h$ (which is going to zero).

**2. The Re-grouping**
Once expanded, you group the terms by the original function's components. You will isolate the $h$-dependent terms into two specific fractions: $\frac{\sin h}{h}$ and $\frac{\cos h - 1}{h}$.

**3. The Resolution**
Because $x$ is treated as a constant with respect to the limit variable $h$, terms like $\sin x$ can be pulled outside the limit. The entire proof hinges on the geometric facts that as an angle $h$ gets infinitely small, the ratio of its sine to itself approaches 1, and the ratio of $(\cos h - 1)$ to itself approaches 0.

**4. Radians are Mandatory**
This proof *fails* if $x$ is in degrees. The limit $\lim_{h \to 0} \frac{\sin h}{h} = 1$ is only true when $h$ is measured in radians (arc length). If you use degrees, a messy conversion factor of $\frac{\pi}{180}$ appears in your derivatives. Calculus requires radians.

## Worked example
**Problem:** Prove from first principles that $\frac{d}{dx} \sin x = \cos x$.

**Step 1: State the limit definition.**
$$ \frac{d}{dx} \sin x = \lim_{h \to 0} \frac{\sin(x+h) - \sin x}{h} $$

**Step 2: Expand using the angle addition formula.**
$$ = \lim_{h \to 0} \frac{(\sin x \cos h + \cos x \sin h) - \sin x}{h} $$
*Why it works:* This breaks the $x+h$ argument apart, allowing us to interact algebraically with $h$.

**Step 3: Rearrange and factor to isolate $h$ terms.**
Group the terms containing $\sin x$ together:
$$ = \lim_{h \to 0} \frac{\sin x \cos h - \sin x + \cos x \sin h}{h} $$
Factor out $\sin x$:
$$ = \lim_{h \to 0} \frac{\sin x (\cos h - 1) + \cos x \sin h}{h} $$

**Step 4: Split the fraction and apply limit properties.**
$$ = \lim_{h \to 0} \left[ \sin x \left( \frac{\cos h - 1}{h} \right) + \cos x \left( \frac{\sin h}{h} \right) \right] $$
Since $\sin x$ and $\cos x$ do not depend on $h$, they act as constants inside this limit:
$$ = \sin x \left[ \lim_{h \to 0} \frac{\cos h - 1}{h} \right] + \cos x \left[ \lim_{h \to 0} \frac{\sin h}{h} \right] $$

**Step 5: Evaluate the known limits.**
We know $\lim_{h \to 0} \frac{\cos h - 1}{h} = 0$ and $\lim_{h \to 0} \frac{\sin h}{h} = 1$.
$$ = \sin x (0) + \cos x (1) $$
$$ = \cos x $$
*Reflection:* The proof elegantly destroys the original function ($\sin x$) by multiplying it by zero, leaving only the shifted function ($\cos x$).

## Diagrams

```text
Visualizing the Derivative of sin(x)

       f(x) = sin(x)                      Slope (m) of tangent line
                                          becomes the value of f'(x)
  1 +       * * *       +                 At x=0, slope is steepest (+1)
    |     *       *     |                 At x=pi/2, slope is flat (0)
    |    *         *    |                 At x=pi, slope is steepest (-1)
  0 +---*-----|-----*---+-----|---> x     
    | 0      pi/2    *  |    3pi/2        
    |                 * |                 
 -1 +                   * * *             


       f'(x) = cos(x)

  1 + *                 +                 
    |   *               |                 
    |     *             |                 
  0 +-------*-|---------+-----|---> x     
    |        pi/2 *     |    3pi/2        
    |               *   |                 
 -1 +                 * * *               
```
Notice how the peaks and valleys of $\sin x$ (where the tangent is horizontal, slope = 0) perfectly align with the $x$-intercepts of $\cos x$.

## Memory technique — remember this forever
1. **The Visual Hook:** "The Derivative Cycle". Imagine a clock face. Top is $\sin x$, right is $\cos x$, bottom is $-\sin x$, left is $-\cos x$. Taking a derivative is moving one step clockwise. Integrating is moving counter-clockwise.
2. **Must overlearn:** 
   * $\frac{d}{dx} \sin x = \cos x$
   * $\frac{d}{dx} \cos x = -\sin x$
3. **Spaced-repetition schedule:** Review this derivation at 1 day, 3 days, 7 days, 16 days, and 35 days. Do it on a blank sheet of paper.
4. **First principles pathway:** If you forget the cycle, write $\lim_{h \to 0} \frac{\sin(x+h) - \sin x}{h}$. The moment you see $\sin(x+h)$, your brain will trigger the angle addition formula. The rest is just algebra.

## Common mistakes
* **Circular reasoning with L'Hôpital's Rule:** Students often try to prove $\lim_{h \to 0} \frac{\sin h}{h} = 1$ using L'Hôpital's rule. But L'Hôpital's rule requires you to know the derivative of $\sin x$, which is exactly what you are trying to prove! You must use the geometric Squeeze Theorem proof for the limit.
* **Losing the negative sign on cosine:** When expanding $\cos(x+h) = \cos x \cos h - \sin x \sin h$, students forget the minus sign in the identity, which leads to missing the negative sign in $\frac{d}{dx} \cos x = -\sin x$.
* **Treating $x$ as the limit variable:** In the limit definition, $h \to 0$, not $x$. Students sometimes mistakenly plug $0$ in for $x$ halfway through the derivation.

## Self-check
1. Derive $\frac{d}{dx} \cos x = -\sin x$ from first principles, showing every algebraic step.
2. Use the limit definition of the derivative to find $f'(x)$ for $f(x) = \sin(2x)$. (Hint: you will need to manipulate the denominator to match the argument of the sine function in your limit).
3. Using the known limit $\lim_{h \to 0} \frac{\sin h}{h} = 1$, prove algebraically that $\lim_{h \to 0} \frac{\cos h - 1}{h} = 0$ by multiplying the numerator and denominator by the conjugate $(\cos h + 1)$.