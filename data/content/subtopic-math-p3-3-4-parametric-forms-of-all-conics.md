## What it is
Parametric forms of conics express the $x$ and $y$ coordinates of a conic section not as a single equation relating them to each other (like $x^2 + y^2 = r^2$), but as two separate functions of a third, independent variable called a parameter (usually $t$ or $\theta$). Instead of viewing a curve as a static set of points, parametrization allows you to trace the curve point-by-point as the parameter varies.

## Why it matters
In Cartesian form, an equation tells you the *track* a roller coaster takes. In parametric form, the equations tell you exactly *where* the roller coaster is at time $t$. This is non-negotiable in aerospace engineering and orbital mechanics. Kepler's laws dictate that planets and satellites move in conic sections; calculating a satellite's position at a specific timestamp requires the parametric formulation of its elliptical or hyperbolic orbit (often using the "eccentric anomaly" as the parameter).

## When to study it
Do not attempt this until you have mastered:
1. The standard Cartesian forms of all four conics (circle, parabola, ellipse, hyperbola).
2. Completing the square to find the center and vertices of shifted conics.
3. The foundational Pythagorean trigonometric identities: $\cos^2 t + \sin^2 t = 1$ and $\sec^2 t - \tan^2 t = 1$. 

If you cannot instantly recall the Cartesian equation of a hyperbola or the identity for $\sec^2 t$, go back and review them. 

## How to study it (step by step)
1. **Master the identity map:** Write down the Cartesian equation for a unit circle and the unit hyperbola. Directly below them, write the corresponding Pythagorean trig identities. Visually map the variables to the trig functions.
2. **Derive the ellipse:** Start with $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$. Substitute $X = \frac{x}{a}$ and $Y = \frac{y}{b}$ to reduce it to a circle, then apply the trig parametrization.
3. **Derive the hyperbola:** Repeat the above process for $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$ using the secant/tangent identity.
4. **Derive the parabola:** Start with $y^2 = 4ax$. Let $y = 2at$. Solve for $x$. Understand that $t$ here represents the reciprocal of the slope of the tangent line at that point.
5. **Practice elimination:** Take arbitrary parametric equations (e.g., $x = 3 + 2\cos t$, $y = -1 + 5\sin t$), isolate the trig functions, square them, and add/subtract to recover the Cartesian form.
6. **Analyze domain restrictions:** Determine what happens to the hyperbola $x = a\sec t, y = b\tan t$ when $t \in (-\frac{\pi}{2}, \frac{\pi}{2})$ versus $t \in (\frac{\pi}{2}, \frac{3\pi}{2})$. 

## Key ideas, with intuition

**1. The Trigonometric Hack**
Parametrizing ellipses and hyperbolas is just pattern matching with trigonometry. 
For an ellipse:
$$ \left(\frac{x}{a}\right)^2 + \left(\frac{y}{b}\right)^2 = 1 $$
We know that $\cos^2 t + \sin^2 t = 1$. Therefore, we can force:
$$ \frac{x}{a} = \cos t \implies x = a\cos t $$
$$ \frac{y}{b} = \sin t \implies y = b\sin t $$

For a hyperbola:
$$ \left(\frac{x}{a}\right)^2 - \left(\frac{y}{b}\right)^2 = 1 $$
We know that $\sec^2 t - \tan^2 t = 1$. Therefore:
$$ \frac{x}{a} = \sec t \implies x = a\sec t $$
$$ \frac{y}{b} = \tan t \implies y = b\tan t $$

**2. The Parabola's Algebraic Hack**
The parabola $y^2 = 4ax$ doesn't easily map to a trig identity. Instead, we use a rational parameter. We want to express $x$ and $y$ such that squaring $y$ gives a multiple of $x$. 
Let $y = 2at$. Substitute this into the Cartesian equation:
$$ (2at)^2 = 4ax \implies 4a^2t^2 = 4ax \implies x = at^2 $$
The parametric form is $(at^2, 2at)$.

**3. The Eccentric Angle (Crucial Intuition)**
In the ellipse $x = a\cos t, y = b\sin t$, the parameter $t$ is **not** the angle made with the origin from the point $(x,y)$. It is the *eccentric angle*. If you draw a circle of radius $a$ (the major circle) and a circle of radius $b$ (the minor circle), $t$ is the angle of a ray from the origin intersecting these circles. The ellipse point takes its $x$-coordinate from the major circle and its $y$-coordinate from the minor circle.

## Worked example
**Problem:** Eliminate the parameter to find the Cartesian equation of the curve given by $x = 2 + 3\sec t$ and $y = -1 + 4\tan t$. Identify the conic and its center.

**Step 1: Isolate the trigonometric functions.**
$$ x - 2 = 3\sec t \implies \frac{x - 2}{3} = \sec t $$
$$ y + 1 = 4\tan t \implies \frac{y + 1}{4} = \tan t $$
*Why: We need the trig functions isolated so we can exploit the Pythagorean identity.*

**Step 2: Square both equations.**
$$ \left(\frac{x - 2}{3}\right)^2 = \sec^2 t $$
$$ \left(\frac{y + 1}{4}\right)^2 = \tan^2 t $$
*Why: The identity requires squared terms.*

**Step 3: Subtract the equations to eliminate $t$.**
$$ \left(\frac{x - 2}{3}\right)^2 - \left(\frac{y + 1}{4}\right)^2 = \sec^2 t - \tan^2 t $$
Since $\sec^2 t - \tan^2 t = 1$:
$$ \frac{(x - 2)^2}{9} - \frac{(y + 1)^2}{16} = 1 $$
*Why: This is the standard Cartesian form of a conic.*

**Step 4: Identify the conic.**
The equation features a subtracted squared term. This is a **hyperbola**.
Its center is at $(2, -1)$, with a horizontal transverse axis (since the $x$-term is positive).

## Diagrams
The Eccentric Angle $t$ of an Ellipse:

```text
          y
          |       Outer circle (radius a)
          |  _,-'´| `'-._
       _,-'´      |      `'-._
     /            |            \
   /        Inner | circle       \
  /        (rad b)|               \
 |       _,-'´| `'-._              |
 |     /      |      \             |
 |    /       |       \            |
|    |        |        | P(x,y)     |
|----|--------+--------+---*--------|-- x
|    |        |       /|   |        |
 |    \       |      / |   |       |
 |     \      |     /  |   |       |
 |       `'-._| _,-'   |   |       |
  \           |/ t     |   |      /
   \          +------------------/
     \        |                  /
       `'-._  |              _,-'
            `'|-..__    __..-|'
                    `''`
```
*Description:* A ray at angle $t$ from the positive x-axis intersects the inner circle of radius $b$ and the outer circle of radius $a$. A horizontal line from the inner intersection and a vertical line from the outer intersection meet exactly at point $P(x,y)$ on the ellipse. Thus, $x = a\cos t$ and $y = b\sin t$.

## Memory technique — remember this forever
1. **The Hook:** "Match the Squares." Ellipses have a plus, so match with $\cos^2 + \sin^2 = 1$. Hyperbolas have a minus, so match with $\sec^2 - \tan^2 = 1$.
2. **Must-know formulas:**
   * Ellipse: $(a\cos t, b\sin t)$
   * Hyperbola: $(a\sec t, b\tan t)$
   * Parabola ($y^2=4ax$): $(at^2, 2at)$
3. **Spaced-repetition schedule:** Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First principles pathway:** If you forget the formulas, write down the Cartesian equation. Set the terms equal to the variables in the corresponding Pythagorean identity. Solve for $x$ and $y$.

## Common mistakes
* **Assuming $t$ is the polar angle:** In the ellipse $(a\cos t, b\sin t)$, students often assume $t$ is the angle from the origin to the point $(x,y)$. It is not. The actual polar angle $\theta$ relates to $t$ via $\tan \theta = \frac{b}{a} \tan t$.
* **Ignoring the branches of a hyperbola:** The parametrization $x = a\sec t, y = b\tan t$ traces the right branch when $t \in (-\frac{\pi}{2}, \frac{\pi}{2})$ and the left branch when $t \in (\frac{\pi}{2}, \frac{3\pi}{2})$. Students often plug in values blindly without checking which branch they are on.
* **Parabola axis confusion:** Memorizing $(at^2, 2at)$ and applying it to $x^2 = 4ay$. If the parabola opens upward, the parametrization swaps: $x = 2at, y = at^2$.

## Self-check
1. Find the Cartesian equation for the curve defined by $x = -1 + 4\sin t$ and $y = 3 + 4\cos t$. What specific shape is this?
2. Parametrize the hyperbola $9y^2 - 4x^2 = 36$. (Hint: Pay attention to which term is positive).
3. The parametric equations $x = a\cosh t$ and $y = b\sinh t$ also represent a hyperbola (using the hyperbolic identity $\cosh^2 t - \sinh^2 t = 1$). What is the geometric limitation of this parametrization compared to the secant/tangent version?