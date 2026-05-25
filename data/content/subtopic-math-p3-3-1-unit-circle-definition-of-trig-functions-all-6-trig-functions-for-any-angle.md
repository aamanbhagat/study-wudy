## What it is
The unit circle is a circle with a radius of exactly $1$ centered at the origin $(0,0)$ of a Cartesian coordinate system. By placing an angle $\theta$ at the origin, the coordinates $(x, y)$ where the angle's terminal line intersects the circle define the trigonometric functions for any angle: $\cos(\theta) = x$ and $\sin(\theta) = y$. The remaining four trigonometric functions are defined as ratios of these coordinates.

## Why it matters
Right-triangle trigonometry limits you to angles between $0$ and $\pi/2$ radians ($0^\circ$ to $90^\circ$). The unit circle breaks this limitation, allowing you to evaluate trig functions for *any* real number, including negative angles and angles stretching to infinity. This transition turns trigonometry from a tool for measuring static triangles into a language for continuous wave functions. You will use this constantly in Fourier analysis (signal processing and machine learning), orbital mechanics (satellite position vectors), and solving differential equations for simple harmonic motion.

## When to study it
You must already understand:
1. Basic right-triangle trigonometry (SOH CAH TOA).
2. The Pythagorean theorem.
3. Cartesian coordinate geometry (graphing $(x,y)$ points in four quadrants).
4. Radian measure (understanding that $2\pi \text{ radians} = 360^\circ$).
If you are not comfortable converting between degrees and radians, review that first. The unit circle is almost exclusively navigated in radians.

## How to study it (step by step)
1. **Draw the geometry:** Sketch a circle of radius $1$ centered at the origin. Draw a line from the origin to a point $(x,y)$ on the circle in Quadrant I, forming an angle $\theta$ with the positive x-axis. Drop a vertical line to the x-axis to form a right triangle.
2. **Map the definitions:** Apply SOH CAH TOA to this triangle. Notice that the hypotenuse is $1$, the adjacent side is $x$, and the opposite side is $y$. Conclude that $\cos(\theta) = x$ and $\sin(\theta) = y$.
3. **Define the other four:** Write out $\tan(\theta)$, $\csc(\theta)$, $\sec(\theta)$, and $\cot(\theta)$ strictly in terms of $x$ and $y$.
4. **Memorize Quadrant I:** Memorize the exact $(x,y)$ coordinates for the standard angles $0, \frac{\pi}{6}, \frac{\pi}{4}, \frac{\pi}{3}, \frac{\pi}{2}$. 
5. **Exploit symmetry:** Do not memorize the whole circle. Practice reflecting the Quadrant I coordinates into Quadrants II, III, and IV by simply changing the signs of $x$ and $y$ based on the quadrant.

## Key ideas, with intuition

**1. The Coordinate Definition**
Forget "opposite over hypotenuse." From now on, think of cosine and sine as a machine that converts an angle into an $(x, y)$ coordinate on a circle of radius 1.
$$ \cos(\theta) = x $$
$$ \sin(\theta) = y $$

**2. The Extended Functions**
The other four functions are simply combinations of $x$ and $y$. Tangent is the slope of the line ($\frac{\text{rise}}{\text{run}}$). The others are reciprocals.
$$ \tan(\theta) = \frac{y}{x} \quad \text{(Slope)} $$
$$ \sec(\theta) = \frac{1}{x} \quad \csc(\theta) = \frac{1}{y} \quad \cot(\theta) = \frac{x}{y} $$
*Intuition:* When the angle is $\frac{\pi}{2}$ (straight up), $x=0$. Therefore, $\tan(\frac{\pi}{2})$ and $\sec(\frac{\pi}{2})$ require dividing by zero, which is why they are undefined (vertical asymptotes).

**3. The Pythagorean Identity**
The equation for a circle of radius $1$ centered at the origin is $x^2 + y^2 = 1$. Substituting our definitions yields the most important identity in trigonometry:
$$ \cos^2(\theta) + \sin^2(\theta) = 1 $$

**4. Reference Angles**
Every angle $\theta$, no matter how large or negative, has a terminal side that lands somewhere on the circle. The acute angle made between this terminal side and the *x-axis* is the reference angle. The absolute values of the trig functions are identical to those of the reference angle; only the $\pm$ signs change depending on the quadrant.

## Worked example
**Problem:** Evaluate all six trigonometric functions for $\theta = \frac{7\pi}{6}$.

**Step 1: Find the reference angle and quadrant.**
$\frac{7\pi}{6}$ is $\pi + \frac{\pi}{6}$. This places the angle in Quadrant III. The reference angle with the x-axis is $\frac{\pi}{6}$.

**Step 2: Recall Quadrant I coordinates.**
For $\theta = \frac{\pi}{6}$, the coordinates are $(x, y) = \left(\frac{\sqrt{3}}{2}, \frac{1}{2}\right)$.

**Step 3: Apply Quadrant III signs.**
In Quadrant III, both $x$ and $y$ are negative. Therefore, our point is $\left(-\frac{\sqrt{3}}{2}, -\frac{1}{2}\right)$.

**Step 4: Calculate the six functions.**
*   $\sin\left(\frac{7\pi}{6}\right) = y = -\frac{1}{2}$
*   $\cos\left(\frac{7\pi}{6}\right) = x = -\frac{\sqrt{3}}{2}$
*   $\tan\left(\frac{7\pi}{6}\right) = \frac{y}{x} = \frac{-1/2}{-\sqrt{3}/2} = \frac{1}{\sqrt{3}} = \frac{\sqrt{3}}{3}$
*   $\csc\left(\frac{7\pi}{6}\right) = \frac{1}{y} = \frac{1}{-1/2} = -2$
*   $\sec\left(\frac{7\pi}{6}\right) = \frac{1}{x} = \frac{1}{-\sqrt{3}/2} = -\frac{2}{\sqrt{3}} = -\frac{2\sqrt{3}}{3}$
*   $\cot\left(\frac{7\pi}{6}\right) = \frac{x}{y} = \frac{-\sqrt{3}/2}{-1/2} = \sqrt{3}$

*Reflection:* By reducing the problem to a Quadrant I reference angle and applying the $(x,y)$ definitions, we derived all six values without needing a calculator or memorizing a massive table.

## Diagrams

```text
                  y
                  ^
                  |      (x,y) = (\cos\theta, \sin\theta)
                  |     /|
                  |    / |
                  | 1 /  | y = \sin\theta
                  |  /   |
                  | /    |
                  |/ \theta|
------------------+------+------------------> x
                  |   x = \cos\theta
                  |
                  |
                  |
                  |
                  v
```

## Memory technique — remember this forever
1. **The Mnemonic:** To remember which functions are positive in which quadrant, use **ASTC**: **A**ll **S**tudents **T**ake **C**alculus.
   * Quadrant I: **A**ll functions are positive.
   * Quadrant II: **S**ine (and Cosecant) are positive.
   * Quadrant III: **T**angent (and Cotangent) are positive.
   * Quadrant IV: **C**osine (and Secant) are positive.
   * *Alphabetical trick:* $x$ comes before $y$, and $\cos$ comes before $\sin$. Thus, $(x,y) = (\cos, \sin)$.

2. **The Facts to Overlearn:**
   * $(x, y) = (\cos\theta, \sin\theta)$
   * $\tan\theta = \frac{y}{x}$
   * The Quadrant I coordinates for $(0, \frac{\pi}{6}, \frac{\pi}{4}, \frac{\pi}{3}, \frac{\pi}{2})$ are:
     $(1, 0)$, $(\frac{\sqrt{3}}{2}, \frac{1}{2})$, $(\frac{\sqrt{2}}{2}, \frac{\sqrt{2}}{2})$, $(\frac{1}{2}, \frac{\sqrt{3}}{2})$, $(0, 1)$.

3. **Spaced-Repetition Schedule:** Draw a blank unit circle and fill in the 16 standard angles (in radians) and their $(x,y)$ coordinates. Do this from memory on day 1, day 3, day 7, day 16, and day 35.

4. **First Principles Pathway:** If you forget everything, draw a circle $x^2 + y^2 = r^2$. Set $r=1$. Draw a right triangle inside it. Using SOH CAH TOA, $\cos(\theta) = \frac{\text{adj}}{\text{hyp}} = \frac{x}{1} = x$. Rebuild the rest from there.

## Common mistakes
* **Swapping Sine and Cosine:** Students frequently write $\sin(\theta) = x$. Remember the alphabetical rule: $(x,y) \rightarrow (\cos, \sin)$.
* **Ignoring the Quadrant Sign:** Finding the reference angle but forgetting to make the final answer negative when required. Always check ASTC before finalizing your answer.
* **Confusing Undefined with Zero:** $\frac{0}{1} = 0$, but $\frac{1}{0}$ is undefined. For example, $\tan(\frac{\pi}{2}) = \frac{1}{0}$, which is undefined, not zero.

## Self-check
1. Evaluate $\sec\left(-\frac{3\pi}{4}\right)$ exactly.
2. If $\sin(\theta) = \frac{3}{5}$ and $\theta$ is in Quadrant II, find $\tan(\theta)$ using the unit circle definitions.
3. Prove that $\tan^2(\theta) + 1 = \sec^2(\theta)$ starting entirely from the unit circle equation $x^2 + y^2 = 1$.