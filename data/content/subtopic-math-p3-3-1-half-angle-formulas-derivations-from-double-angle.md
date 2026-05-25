## What it is
Half-angle formulas express trigonometric functions of half an angle, such as $\sin(\theta/2)$, entirely in terms of the trigonometric functions of the full angle, $\theta$. They are not independent axioms; they are direct algebraic rearrangements of the cosine double-angle formulas.

## Why it matters
In calculus, you cannot easily integrate $\sin^2(x)$ or $\cos^2(x)$. You must use the "power-reducing" formulas—which are just the half-angle formulas in disguise—to linearize the integral. In aerospace engineering, the half-angle formulas are used to relate the eccentric anomaly to the true anomaly in Kepler's equation, allowing us to pinpoint a satellite's exact position in an elliptical orbit. 

## When to study it
You must already possess absolute fluency in:
1. The Pythagorean identity: $\sin^2(x) + \cos^2(x) = 1$.
2. The double-angle formula for cosine: $\cos(2x) = \cos^2(x) - \sin^2(x)$.

If you cannot instantly recall these and manipulate them algebraically, stop and review them. The half-angle formulas will seem like arbitrary memorization if you lack these prerequisites.

## How to study it (step by step)
1. **Write the core identity:** Start with $\cos(2x) = \cos^2(x) - \sin^2(x)$.
2. **Derive the sine-only form:** Substitute $\cos^2(x) = 1 - \sin^2(x)$ into the core identity to get $\cos(2x) = 1 - 2\sin^2(x)$. 
3. **Isolate the squared term:** Rearrange the sine-only form to solve for $\sin^2(x)$. This gives you the power-reducing formula.
4. **Substitute and root:** Let $x = \theta/2$. Take the square root of both sides. You have now derived the sine half-angle formula.
5. **Repeat for cosine:** Go back to step 2, but substitute $\sin^2(x) = 1 - \cos^2(x)$ to get the cosine-only form: $\cos(2x) = 2\cos^2(x) - 1$. Repeat steps 3 and 4 to derive the cosine half-angle formula.
6. **Derive tangent:** Divide your result for $\sin(\theta/2)$ by $\cos(\theta/2)$ to find $\tan(\theta/2)$. 

## Key ideas, with intuition
**1. The Cosine Double-Angle is the Engine**
Notice that we *only* use the double-angle formula for cosine to derive the half-angle formulas for *both* sine and cosine. The cosine double-angle formula uniquely links a $2x$ angle to squared functions of an $x$ angle. 

**2. Power Reduction is Half-Angle**
When you isolate the squared terms, you get:
$$ \sin^2(x) = \frac{1 - \cos(2x)}{2} $$
$$ \cos^2(x) = \frac{1 + \cos(2x)}{2} $$
Squaring a trigonometric function is mathematically equivalent to doubling its frequency. This is a profound property of waves.

**3. The Variable Substitution**
Algebra does not care what symbols you use. The relationship between $x$ and $2x$ is identical to the relationship between $\theta/2$ and $\theta$. By setting $x = \theta/2$, $2x$ simply becomes $\theta$.

**4. The $\pm$ Ambiguity**
Taking the square root introduces a $\pm$ symbol:
$$ \sin(\theta/2) = \pm \sqrt{\frac{1 - \cos\theta}{2}} $$
This does *not* mean the answer is both positive and negative. It means the algebra has lost track of which quadrant the angle $\theta/2$ lives in. You must manually choose $+$ or $-$ based on the quadrant of $\theta/2$.

## Worked example
**Problem:** Find the exact value of $\sin(15^\circ)$ using the half-angle formula.

**Step 1: Identify the relationship.**
We want $\sin(15^\circ)$. We know exact values for $30^\circ$. Let $\theta = 30^\circ$, so $\theta/2 = 15^\circ$.

**Step 2: Choose the formula and the sign.**
$$ \sin(\theta/2) = \pm \sqrt{\frac{1 - \cos\theta}{2}} $$
Since $15^\circ$ is in Quadrant I, its sine is positive. We select the $+$ sign.

**Step 3: Substitute and evaluate.**
$$ \sin(15^\circ) = +\sqrt{\frac{1 - \cos(30^\circ)}{2}} $$
Substitute $\cos(30^\circ) = \frac{\sqrt{3}}{2}$:
$$ \sin(15^\circ) = \sqrt{\frac{1 - \frac{\sqrt{3}}{2}}{2}} $$

**Step 4: Simplify the nested fractions.**
Multiply the numerator and denominator inside the radical by 2:
$$ \sin(15^\circ) = \sqrt{\frac{2 - \sqrt{3}}{4}} = \frac{\sqrt{2 - \sqrt{3}}}{2} $$

*Reflection:* The derivation works smoothly because we stepped down from a known angle to an unknown angle. The most critical step was manually enforcing the positive sign before doing the arithmetic, ensuring our geometry matched our algebra.

## Diagrams

The most common failure point is choosing the wrong sign for the square root. This happens because halving an angle changes its quadrant. 

```text
      Quadrant II           |           Quadrant I
      Sine is (+)           |           Sine is (+)
                            |
           * \              |              /*
           |   \            |            /  |
           |     \          |          /    |
           |       \        |        /      |
           |         \      |      /        |
           |           \    |    /          |
           |             \  |  /  \ θ/2     |
-----------+----------------+----------------+-----------
           |                |                |
           |                |                |
           |                |                |
           |                |                |
           |                |                |
           |                |                |
      Quadrant III          |           Quadrant IV
      Sine is (-)           |           Sine is (-)

If θ is in Q3 (e.g., 200°), its sine is NEGATIVE.
But θ/2 is in Q2 (e.g., 100°), where sine is POSITIVE.
You must choose the (+) root for sin(θ/2).
```

## Memory technique — remember this forever
**1. The Visual Hook:** 
"Cosine likes itself; Sine is negative." 
Look at the formulas below. The formula for $\cos(\theta/2)$ uses a **plus** sign with $\cos\theta$. Cosine likes cosine. The formula for $\sin(\theta/2)$ uses a **minus** sign with $\cos\theta$. Sine is the contrarian.

**2. The Formulas to Overlearn:**
$$ \sin\left(\frac{\theta}{2}\right) = \pm\sqrt{\frac{1 - \cos\theta}{2}} $$
$$ \cos\left(\frac{\theta}{2}\right) = \pm\sqrt{\frac{1 + \cos\theta}{2}} $$

**3. Spaced Repetition Schedule:**
Review these formulas and derive them from scratch in: 1 day, 3 days, 7 days, 16 days, and 35 days.

**4. The First Principles Pathway:**
If you forget the formulas, do not panic. Write down $\cos(2x) = \cos^2(x) - \sin^2(x)$. Convert it entirely to sine (or cosine) using $\sin^2(x) + \cos^2(x) = 1$. Isolate the squared term. Substitute $x = \theta/2$. You can rebuild the entire concept in 45 seconds.

## Common mistakes
1. **Judging the $\pm$ sign by $\theta$ instead of $\theta/2$.** If you are calculating $\cos(165^\circ)$ using $\theta = 330^\circ$, you must look at $165^\circ$ (Quadrant II, cosine is negative) to choose the sign, not $330^\circ$ (Quadrant IV, cosine is positive).
2. **Mixing up the internal signs.** Writing $\sin(\theta/2) = \sqrt{(1 + \cos\theta)/2}$. Remember the mnemonic: Sine is the contrarian (minus).
3. **Forgetting to square root.** Students often stop at the power-reducing formula and claim $\sin(15^\circ) = \frac{1 - \cos(30^\circ)}{2}$. That is $\sin^2(15^\circ)$, not $\sin(15^\circ)$.

## Self-check
1. Derive the half-angle formula for $\cos(\theta/2)$ starting from $\cos(2x) = \cos^2(x) - \sin^2(x)$. Show every algebraic step.
2. Evaluate $\tan(22.5^\circ)$ exactly using a half-angle formula. (Hint: derive the tangent formula first by dividing sine by cosine).
3. Suppose $\sin\theta = -4/5$ and $180^\circ < \theta < 270^\circ$. Find the exact value of $\cos(\theta/2)$. Pay strict attention to the quadrant.