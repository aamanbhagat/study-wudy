## What it is
SOH-CAH-TOA is a mnemonic used to remember the definitions of the three primary trigonometric functions: Sine, Cosine, and Tangent. It specifies how to calculate these functions as ratios of the sides of a right-angled triangle relative to a specific acute angle. 

## Why it matters
In physics and aerospace, forces, velocities, and thrust vectors rarely align perfectly with your coordinate axes. SOH-CAH-TOA is the mathematical tool used to decompose a diagonal vector into orthogonal $x$ and $y$ components. Whether you are calculating the horizontal distance a ballistic projectile will travel or determining the exact amount of lateral thrust needed to correct a rocket's trajectory, you are using these ratios. 

## When to study it
You must have a solid grasp of basic geometry and algebra. Specifically, you need to know:
1. The properties of a right triangle (one angle is exactly $90^\circ$).
2. The Pythagorean theorem ($a^2 + b^2 = c^2$).
3. How to solve basic algebraic proportions (e.g., solving for $x$ in $\frac{3}{5} = \frac{x}{10}$).
If you do not know how to identify the hypotenuse of a right triangle, review basic geometry before proceeding.

## How to study it (step by step)
1. **Define the anatomy:** Draw a right triangle. Identify the $90^\circ$ angle. The side opposite this angle is the Hypotenuse. Pick one of the other two angles and label it $\theta$.
2. **Label the legs:** Relative to $\theta$, label the side across the triangle from it as "Opposite". Label the side touching $\theta$ (that is not the Hypotenuse) as "Adjacent".
3. **Write the ratios:** Write out the SOH-CAH-TOA equations from memory. 
4. **Rotate the triangle:** Draw the triangle in various orientations (upside down, mirrored). Pick an angle and re-label the Opposite, Adjacent, and Hypotenuse. This breaks the fragile habit of thinking "Adjacent is always the bottom."
5. **Solve for a side:** Given one angle and one side length, use the appropriate ratio to algebraically solve for a missing side.
6. **Solve for an angle:** Given two side lengths, use inverse trigonometric functions (e.g., $\sin^{-1}$, $\cos^{-1}$) to find the missing angle.

## Key ideas, with intuition
**1. Trigonometry is just the geometry of similar triangles.**
Why does $\sin(30^\circ)$ always equal $0.5$, regardless of how big the triangle is? Because all right triangles with a $30^\circ$ angle are *similar triangles*. If you double the length of the hypotenuse, the opposite side strictly doubles as well. The *ratio* between the sides remains perfectly constant. Trigonometric functions are simply lookup tables for these constant ratios.

**2. The definitions are relative.**
The Hypotenuse is an absolute property of the triangle—it is always the longest side, opposite the right angle. However, "Opposite" and "Adjacent" are relative to the angle you care about ($\theta$). If you switch your focus to the other acute angle in the triangle, the Opposite and Adjacent sides swap identities.

**3. The Formal Definitions (SOH-CAH-TOA):**
$$ \sin(\theta) = \frac{\text{Opposite}}{\text{Hypotenuse}} \quad \text{(SOH)} $$
$$ \cos(\theta) = \frac{\text{Adjacent}}{\text{Hypotenuse}} \quad \text{(CAH)} $$
$$ \tan(\theta) = \frac{\text{Opposite}}{\text{Adjacent}} \quad \text{(TOA)} $$

## Worked example
**Problem:** A rocket ascends along a perfectly straight flight path angled at $60^\circ$ relative to the flat ground. The rocket's telemetry shows it has traveled $2000 \text{ meters}$ along this path. What is the rocket's current altitude?

**Step 1: Identify the knowns and unknowns.**
*   The flight path is the Hypotenuse: $H = 2000 \text{ m}$.
*   The angle to the ground is $\theta = 60^\circ$.
*   The altitude is the side across from the angle: Opposite ($O$).

**Step 2: Choose the correct ratio.**
We know $H$ and want to find $O$. The mnemonic containing $O$ and $H$ is SOH ($\sin = \frac{O}{H}$).

**Step 3: Set up the equation and solve.**
$$ \sin(60^\circ) = \frac{O}{2000} $$
$$ O = 2000 \cdot \sin(60^\circ) $$
Using a calculator (ensure it is in degrees, not radians), $\sin(60^\circ) \approx 0.866$.
$$ O = 2000 \cdot 0.866 = 1732 \text{ meters} $$

*Reflection:* We correctly identified that altitude corresponds to the "Opposite" side relative to the launch angle. Multiplying the hypotenuse by the sine of the angle perfectly projected the diagonal path onto the vertical axis.

## Diagrams

```text
         *
        /|
       / |
      /  |
   H /   | O
    /    |
   /     |
  /θ    _|
 *-------*
     A

H = Hypotenuse (longest side, opposite the 90° angle)
O = Opposite (side across from angle θ)
A = Adjacent (side touching angle θ, but not the Hypotenuse)
θ = The angle of interest
_| = 90° Right Angle
```

## Memory technique — remember this forever
1. **The Hook:** Treat "SOH-CAH-TOA" as a single pseudo-word (pronounced *so-cah-toe-uh*). If you prefer a sentence mnemonic: **S**ome **O**ld **H**orses **C**an **A**lways **H**ear **T**heir **O**wners **A**pproach.
2. **Must Overlearn:** 
   * $\sin = O/H$
   * $\cos = A/H$
   * $\tan = O/A$
3. **Spaced-repetition schedule:** Review this concept, drawing the triangle and writing the three formulas from scratch, at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget SOH-CAH-TOA, you can rebuild it by drawing a coordinate plane. Draw a line from the origin $(0,0)$ to a point $(x,y)$ with length $r$. The angle from the x-axis is $\theta$. By definition in the unit circle, $x$ is related to cosine, $y$ is related to sine. Therefore, $\cos(\theta) = x/r$ (Adjacent/Hypotenuse) and $\sin(\theta) = y/r$ (Opposite/Hypotenuse).

## Common mistakes
1. **Applying SOH-CAH-TOA to non-right triangles.** This is a fatal error. These specific ratios *only* work if one angle in the triangle is exactly $90^\circ$. For other triangles, you must use the Law of Sines or Law of Cosines.
2. **Calculator mode error.** Calculating $\sin(60^\circ)$ while your calculator is set to Radians will yield $-0.304$ instead of $0.866$. Always verify your calculator's angular unit mode.
3. **Hardcoding "Adjacent = Bottom".** Students often assume the horizontal base of a triangle is always the Adjacent side. If the angle $\theta$ is at the top of the triangle, the horizontal base becomes the *Opposite* side. Always label relative to $\theta$.

## Self-check
1. A right triangle has sides of length $5$, $12$, and $13$. For the angle opposite the side of length $5$, what is the exact value of the cosine of that angle?
2. You are looking down from a $50 \text{ m}$ tall cliff at a boat. The angle of depression (the angle below the horizontal) is $20^\circ$. Write the trigonometric equation you would use to find the horizontal distance from the base of the cliff to the boat.
3. Prove algebraically that $\tan(\theta) = \frac{\sin(\theta)}{\cos(\theta)}$ using the SOH-CAH-TOA definitions.