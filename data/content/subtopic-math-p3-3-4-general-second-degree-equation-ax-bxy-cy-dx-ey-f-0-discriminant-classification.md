## What it is

The general second-degree equation $$Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$$ describes any conic section (circle, ellipse, parabola, or hyperbola) positioned anywhere in a 2D plane and rotated by any angle. The discriminant classification uses the simple algebraic test $$B^2 - 4AC$$ to instantly identify the shape of the conic, bypassing the need to un-rotate or un-translate the coordinate system.

## Why it matters

In orbital mechanics, this equation models the 2D trajectory of a spacecraft. Instantly knowing whether an orbit is closed (elliptical, $B^2 - 4AC < 0$) or an escape trajectory (hyperbolic, $B^2 - 4AC > 0$) without plotting it is critical for mission analysis. In machine learning and multivariable calculus, this same quadratic form appears in the Hessian matrix; classifying it tells you whether you have found a local minimum, maximum, or a saddle point in a high-dimensional optimization landscape.

## When to study it

You must already understand standard conic sections centered at the origin with axes aligned to the $x$ and $y$ axes (e.g., $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$). You must also be fluent in completing the square and the standard quadratic formula. If you do not know the geometric definitions of an ellipse, parabola, and hyperbola, go back and master them first. 

## How to study it (step by step)

1. **Isolate the rotation:** Acknowledge that the $Dx$, $Ey$, and $F$ terms only translate (shift) the shape. The $Ax^2$, $Bxy$, and $Cy^2$ terms determine the core shape and rotation. 
2. **Analyze the $B$ term:** Recognize that if $B=0$, the conic's axes are parallel to the $x$ and $y$ axes. The presence of a $Bxy$ term means the conic is rotated.
3. **Memorize the discriminant:** Learn the three cases for $\Delta = B^2 - 4AC$: negative (ellipse/circle), zero (parabola), positive (hyperbola).
4. **Derive the intuition:** Use the quadratic formula to solve the general equation for $y$ in terms of $x$. Observe how the $x^2$ term under the square root dictates the domain of the function.
5. **Practice classification:** Write down 10 random second-degree equations and classify them in under 10 seconds each using the discriminant.
6. **Acknowledge degenerate cases:** Understand that these shapes can "collapse" (e.g., an ellipse shrinking to a point, a hyperbola becoming two intersecting lines) if the right-hand side of the standard form zeroes out.

## Key ideas, with intuition

**Idea 1: Translation vs. Shape**
The linear terms ($Dx, Ey$) and the constant ($F$) only move the conic around the plane or change its size. The "DNA" of the shape is entirely contained in the quadratic terms: $Ax^2 + Bxy + Cy^2$. 

**Idea 2: The Discriminant determines the domain (The "Why")**
To understand *why* $B^2 - 4AC$ works, group the general equation by powers of $y$:
$$ Cy^2 + (Bx + E)y + (Ax^2 + Dx + F) = 0 $$
This is just a quadratic equation in $y$. To find $y$ for any given $x$, use the quadratic formula:
$$ y = \frac{-(Bx + E) \pm \sqrt{(Bx + E)^2 - 4C(Ax^2 + Dx + F)}}{2C} $$
Expand the expression under the square root (the discriminant of this specific quadratic):
$$ \text{Inside root} = (B^2 - 4AC)x^2 + (2BE - 4CD)x + (E^2 - 4CF) $$
For very large values of $x$, the $x^2$ term dominates. 
* If **$B^2 - 4AC < 0$**, then for large $x$, the term under the root becomes negative. Real solutions for $y$ cease to exist. The shape is bounded. **(Ellipse)**
* If **$B^2 - 4AC > 0$**, the term under the root is positive for infinitely large $x$. The shape extends to infinity in multiple directions. **(Hyperbola)**
* If **$B^2 - 4AC = 0$**, the $x^2$ term vanishes. The root depends only on the linear term, meaning the shape extends to infinity, but only in one direction. **(Parabola)**

## Worked example

**Problem:** Classify the conic section given by $5x^2 - 4xy + 2y^2 - 12x + 8y - 5 = 0$.

**Step 1: Identify the coefficients $A, B,$ and $C$.**
We only care about the quadratic terms.
$A = 5$ (coefficient of $x^2$)
$B = -4$ (coefficient of $xy$)
$C = 2$ (coefficient of $y^2$)

**Step 2: Calculate the discriminant.**
$$ \Delta = B^2 - 4AC $$
$$ \Delta = (-4)^2 - 4(5)(2) $$
$$ \Delta = 16 - 40 $$
$$ \Delta = -24 $$

**Step 3: Classify based on the sign of the discriminant.**
Since $-24 < 0$, the conic is an **ellipse**.

*Reflection:* The negative discriminant tells us that if we tried to solve for $y$, the $x^2$ term under the radical would be $-24x^2$. As $x$ grows large (positive or negative), the value under the square root becomes strictly negative, meaning there are no real $y$ values. The figure is trapped in a bounded region of the plane.

## Diagrams

```text
      y
      |        Rotated Ellipse (B != 0)
      |           . - ~ ~ - .
      |        /      *      \   <-- Center shifted by D, E
      |       |      /        |
      |       |     /         |
      |        \   /         /
      |          - ~ ~ - . ' 
      |
------|-------------------------- x
      |
      |
```
*Note: If $B=0$, the major and minor axes of the ellipse would be perfectly parallel to the $x$ and $y$ axes. The $Bxy$ term is what tilts the shape.*

## Memory technique — remember this forever

**1. The Mnemonic Hook:**
Tie this directly to the roots of a standard 1D quadratic equation ($ax^2+bx+c=0$).
* **Positive** discriminant = **2** real roots $\rightarrow$ Hyperbola has **2** branches.
* **Zero** discriminant = **1** real root $\rightarrow$ Parabola has **1** branch.
* **Negative** discriminant = **0** real roots $\rightarrow$ Ellipse has **0** openings (it is closed/bounded).

**2. The Facts to Overlearn:**
* $\Delta = B^2 - 4AC$
* $< 0$ : Ellipse
* $= 0$ : Parabola
* $> 0$ : Hyperbola

**3. Spaced Repetition Schedule:**
Review this classification rule and derive it from the quadratic formula at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.

**4. The First Principles Pathway:**
If you forget the rule, write $Cy^2 + Bxy + Ax^2 = 0$. Solve for $y$ using the quadratic formula. The coefficient of $x^2$ under the square root is exactly $B^2 - 4AC$. If that coefficient is negative, $x$ cannot go to infinity (ellipse).

## Common mistakes

* **Confusing the coefficients:** Students often blindly take the first three numbers. $B$ is *strictly* the coefficient of $xy$. If the equation is written as $3x^2 + 4y^2 + 2xy = 0$, then $A=3, B=2, C=4$. 
* **Forgetting the degenerate cases:** $x^2 - y^2 = 0$ yields a positive discriminant, but it graphs as two intersecting lines ($y=x$ and $y=-x$), not a hyperbola. The discriminant identifies the *family*, assuming the shape hasn't collapsed.
* **Sign errors in the formula:** Using $B^2 + 4AC$ instead of $B^2 - 4AC$. Always link it back to the standard quadratic formula to verify the minus sign.

## Self-check

1. Classify the conic section: $3x^2 + 5y^2 - 2x + 7y - 11 = 0$.
2. Classify the conic section: $x^2 - 6xy + 9y^2 + 4x - y = 0$.
3. For what range of values for $k$ does the equation $2x^2 + kxy + 8y^2 - 4x + 2y + 1 = 0$ represent a hyperbola?