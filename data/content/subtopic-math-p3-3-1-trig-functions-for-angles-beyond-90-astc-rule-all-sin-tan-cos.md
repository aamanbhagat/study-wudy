## What it is
Trigonometric functions for angles beyond $90^\circ$ extend the definitions of sine, cosine, and tangent from the ratios of right-angled triangles to the coordinates of a point rotating around a circle. The ASTC rule (All, Sin, Tan, Cos) is a mnemonic shortcut used to determine whether a trigonometric function evaluates to a positive or negative number based on which of the four quadrants the angle's terminal side falls into.

## Why it matters
In physics, engineering, and aerospace, vectors (like thrust, velocity, or electromagnetic fields) do not conveniently confine themselves to the first quadrant. To resolve a force vector pointing down and to the left, or to model the continuous $360^\circ$ rotation of a satellite in orbit, you must evaluate trigonometric functions for any angle. Machine learning algorithms dealing with periodic data (like Fourier transforms) also rely entirely on this extended definition of trigonometry.

## When to study it
You must already have a flawless grasp of:
1. Right-triangle trigonometry (SOH CAH TOA).
2. The exact trigonometric values for standard acute angles ($30^\circ$, $45^\circ$, $60^\circ$).
3. The Cartesian coordinate system ($x$ and $y$ axes, and the four quadrants).
4. The Pythagorean theorem.

If you cannot instantly recall that $\sin(30^\circ) = \frac{1}{2}$, return to basic trigonometry before proceeding.

## How to study it (step by step)
1. **Draw the Unit Circle:** Sketch a Cartesian plane with a circle of radius $r=1$ centered at the origin $(0,0)$. 
2. **Redefine the Functions:** Place a point $(x,y)$ on the circle. Draw a line from the origin to this point, forming an angle $\theta$ with the positive $x$-axis. Drop a perpendicular line to the $x$-axis to form a right triangle. Notice that the hypotenuse is $1$, the adjacent side is $x$, and the opposite side is $y$. Therefore, $\cos\theta = x$, $\sin\theta = y$, and $\tan\theta = \frac{y}{x}$.
3. **Map the Signs:** Sweep the angle $\theta$ into Quadrant II (between $90^\circ$ and $180^\circ$). Observe that $x$ is negative and $y$ is positive. Deduce the signs of $\sin$, $\cos$, and $\tan$. Repeat for Quadrants III and IV.
4. **Define the Reference Angle:** Understand that the numerical value (magnitude) of the trig function for any angle $\theta$ is identical to the trig function of its *reference angle* $\alpha$—the acute angle formed between the terminal side and the **$x$-axis**.
5. **Synthesize:** Combine the magnitude from the reference angle and the sign from the quadrant to evaluate trig functions for any angle.

## Key ideas, with intuition
**1. The Unit Circle Definition**
We abandon the "opposite/hypotenuse" triangle definition because a triangle cannot have an angle of $150^\circ$ and still have a right angle. Instead, we define trig functions purely as coordinates on the unit circle:
$$ \cos\theta = x $$
$$ \sin\theta = y $$
$$ \tan\theta = \frac{y}{x} $$

**2. The Reference Angle ($\alpha$)**
Symmetry dictates that a point at $150^\circ$ has the exact same height ($y$-coordinate) as a point at $30^\circ$. The reference angle is the shortest path to the flat ground (the $x$-axis). *Never* measure the reference angle to the $y$-axis. 

**3. The ASTC Logic**
By looking at the signs of $x$ and $y$ in each quadrant, the signs of the trig functions naturally emerge:
*   **Quadrant I ($0^\circ - 90^\circ$):** $x > 0$, $y > 0$. **A**ll functions are positive.
*   **Quadrant II ($90^\circ - 180^\circ$):** $x < 0$, $y > 0$. Only **S**ine ($y$) is positive.
*   **Quadrant III ($180^\circ - 270^\circ$):** $x < 0$, $y < 0$. Tangent is $\frac{-y}{-x}$, so only **T**angent is positive.
*   **Quadrant IV ($270^\circ - 360^\circ$):** $x > 0$, $y < 0$. Only **C**osine ($x$) is positive.

## Worked example
**Problem:** Evaluate the exact value of $\cos(210^\circ)$.

**Step 1: Identify the Quadrant.**
$210^\circ$ is between $180^\circ$ and $270^\circ$. This places the angle in Quadrant III.

**Step 2: Determine the sign using ASTC.**
In Quadrant III, only **T**angent is positive. Therefore, the cosine of this angle will be negative.
$$ \cos(210^\circ) = - \text{something} $$

**Step 3: Find the reference angle.**
The reference angle is the acute angle made with the $x$-axis. The nearest $x$-axis is at $180^\circ$.
$$ \alpha = 210^\circ - 180^\circ = 30^\circ $$

**Step 4: Combine sign and magnitude.**
The magnitude is $\cos(30^\circ)$, and the sign is negative.
$$ \cos(210^\circ) = -\cos(30^\circ) = -\frac{\sqrt{3}}{2} $$

*Reflection:* This works because the point on the unit circle at $210^\circ$ is the exact reflection of the point at $30^\circ$ across the origin. Its $x$-coordinate must be the negative of $\cos(30^\circ)$.

## Diagrams

```text
          y-axis
            ^
            |
      Q2    |    Q1
    (-x, +y)| (+x, +y)
      Sin   |   All
            |
------------+------------> x-axis
            |
      Q3    |    Q4
    (-x, -y)| (+x, -y)
      Tan   |   Cos
            |
```

## Memory technique — remember this forever
1. **The Mnemonic:** **A**ll **S**tudents **T**ake **C**alculus. (Starting in Q1 and moving counter-clockwise: All, Sin, Tan, Cos).
2. **The Must-Overlearn Facts:** 
   * $\cos\theta = x$
   * $\sin\theta = y$
   * Reference angles are ALWAYS drawn to the $x$-axis.
3. **Spaced Repetition:** Re-derive the signs for all four quadrants using the unit circle at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget the mnemonic, simply draw a set of axes. Pick a quadrant. Ask yourself: "Is $x$ positive or negative here? Is $y$ positive or negative here?" Since $\cos$ is $x$ and $\sin$ is $y$, you instantly have the signs without needing a mnemonic.

## Common mistakes
*   **The Y-Axis Trap:** Students frequently calculate the reference angle using the $y$-axis. For example, for $120^\circ$, a student might say $120^\circ - 90^\circ = 30^\circ$. This is fatally wrong. The reference angle must be to the $x$-axis: $180^\circ - 120^\circ = 60^\circ$.
*   **Forgetting the Sign on Tangent:** Students remember that Q3 has negative $x$ and negative $y$, and mistakenly assume *all* functions are negative in Q3. They forget that $\tan\theta = \frac{y}{x}$, and a negative divided by a negative yields a positive.

## Self-check
1. What is the exact value of $\sin(315^\circ)$?
2. If $\tan\theta = \frac{3}{4}$ and $\cos\theta < 0$, in which quadrant does $\theta$ lie, and what is the exact value of $\sin\theta$?
3. Express $\cos(180^\circ + \theta)$ in terms of $\cos\theta$, assuming $\theta$ is an acute angle. Prove your result using the unit circle definitions of $x$ and $y$.