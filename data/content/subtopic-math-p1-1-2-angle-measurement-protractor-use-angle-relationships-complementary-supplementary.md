## What it is
An angle measures the amount of rotation between two intersecting rays (lines) originating from a common vertex. A protractor is the standard physical tool used to measure this rotation in degrees, where $360^\circ$ represents a full circle. Angle relationships define specific pairs of angles that sum to fundamental geometric constants: complementary angles sum to $90^\circ$, and supplementary angles sum to $180^\circ$.

## Why it matters
In aerospace and physics, angles dictate force vectors, trajectories, and attitude control (pitch, yaw, roll). If you cannot decompose a thrust vector using precise angle relationships, you cannot calculate how much force is pushing a rocket upward versus sideways. Later, these basic additive relationships form the absolute foundation of trigonometry, orthogonal projections, and dot/cross products in linear algebra.

## When to study it
You must understand basic arithmetic and how to solve simple linear equations (e.g., isolating $x$ in $2x + 40 = 180$). You must also grasp the basic geometric definitions of a point, a line, a line segment, and a ray. If you cannot confidently solve a one-variable algebraic equation, review basic algebra before proceeding. 

## How to study it (step by step)
1. **Calibrate your eye (15 mins):** Get a physical protractor. Draw five random angles without measuring. Estimate their size by eye, then measure them. A good physicist or engineer can estimate an angle to within $5^\circ$ visually.
2. **Master the tool (10 mins):** Protractors have two sets of numbers (left-to-right and right-to-left). Draw an acute angle (less than $90^\circ$). Place the protractor origin on the vertex and align the baseline. Notice that the line passes through two numbers (e.g., $40^\circ$ and $140^\circ$). Because the angle is acute, you must choose the smaller number.
3. **Construct supplementary pairs (15 mins):** Draw a straight horizontal line. Place a point $O$ on it, and draw a ray shooting out from $O$. Measure both adjacent angles. Add them together. Verify they sum to exactly $180^\circ$.
4. **Construct complementary pairs (15 mins):** Use your protractor to draw a perfect $90^\circ$ angle. Draw a random ray splitting this angle. Measure both smaller angles and verify they sum to $90^\circ$.
5. **Algebraic integration (20 mins):** Stop measuring and start calculating. Write out algebraic equations for unknown angles. If told two angles are supplementary, immediately write $\theta_1 + \theta_2 = 180^\circ$. Substitute knowns and solve for unknowns.

## Key ideas, with intuition
* **Angle as Rotation:** Do not think of an angle as a static wedge of pie. Think of it as the *action* of sweeping a line around a pivot. 
* **The Right Angle ($90^\circ$):** A quarter-turn. It is the geometric definition of "independent" or "orthogonal." In physics, forces acting at $90^\circ$ to each other do not interact (e.g., horizontal velocity does not affect vertical gravity). Two angles that combine to build this quarter-turn are *complementary*: 
  $$\theta_1 + \theta_2 = 90^\circ$$
* **The Straight Line ($180^\circ$):** A half-turn. Facing exactly the opposite direction. Two angles that combine to build a straight line are *supplementary*: 
  $$\theta_1 + \theta_2 = 180^\circ$$
* **Angle Addition Postulate:** Angles are perfectly additive. If you place angle $A$ adjacent to angle $B$, the total rotation is simply $A + B$. 

## Worked example
**Problem:** Two angles are supplementary. One angle is $15^\circ$ more than twice the measure of the other. Find the measure of both angles.

**Step 1: Translate geometry to algebra.**
Let the first angle be $x$. 
The second angle is "$15^\circ$ more than twice the other", so it is $2x + 15^\circ$.
Because they are supplementary, their sum must be $180^\circ$.
$$x + (2x + 15^\circ) = 180^\circ$$

**Step 2: Solve for $x$.**
Combine like terms:
$$3x + 15^\circ = 180^\circ$$
Subtract $15^\circ$ from both sides:
$$3x = 165^\circ$$
Divide by 3:
$$x = 55^\circ$$

**Step 3: Find the second angle.**
Substitute $x$ back into the expression for the second angle:
$$2(55^\circ) + 15^\circ = 110^\circ + 15^\circ = 125^\circ$$

**Step 4: Verify.**
$$55^\circ + 125^\circ = 180^\circ$$

*Reflection:* We did not need to draw anything. By locking onto the keyword "supplementary," we established a strict algebraic equality that allowed us to solve for the unknown.

## Diagrams

```text
SUPPLEMENTARY ANGLES (Sum to 180°)       COMPLEMENTARY ANGLES (Sum to 90°)
                                        
          /                                      ^ y-axis
         /                                       |   /
        /                                        |  /
       /                                         | /  Angle Y
Angle /  Angle                                   |/
  A  /     B                                     +--------> x-axis
----O----------                              Angle X

Equation: A + B = 180°                   Equation: X + Y = 90°
Forms a straight line.                   Forms a right corner.
```

## Memory technique — remember this forever
1. **The Mnemonic:** Alphabetical and numerical order. 
   **C** comes before **S** in the alphabet. 
   **90** comes before **180** on the number line. 
   Therefore, **C**omplementary = **90** and **S**upplementary = **180**.
   Alternatively: **C**omplementary makes a **C**orner; **S**upplementary makes a **S**traight line.
2. **Overlearn these facts:** 
   * Complementary: $\theta_1 + \theta_2 = 90^\circ$
   * Supplementary: $\theta_1 + \theta_2 = 180^\circ$
3. **Spaced-repetition schedule:** Review this mnemonic and the two equations at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** Degrees are an arbitrary human invention (base-60 from the Babylonians). What is fundamental is the circle. A full circle is $1$. A straight line cuts the universe in half ($1/2$ of a circle). A perpendicular intersection cuts that half in half ($1/4$ of a circle). If you forget $180$ and $90$, remember that supplementary is the half-circle and complementary is the quarter-circle.

## Common mistakes
* **Reading the wrong scale on the protractor:** Protractors have an inner and outer ring of numbers. Students frequently measure a sharp, acute angle but read the obtuse number (e.g., recording $130^\circ$ instead of $50^\circ$). Always look at the angle and ask, "Is this smaller or larger than a $90^\circ$ corner?" before writing the number.
* **Assuming by looking:** Never assume two angles are complementary just because they "look" like a right angle. Unless there is a square right-angle symbol in the corner, or the text explicitly states it, you cannot assume they sum to $90^\circ$.
* **Confusing the terms:** Mixing up complementary and supplementary. Use the C/S alphabetical mnemonic to permanently eliminate this error.

## Self-check
1. An angle measures $37^\circ$. What is the measure of its complement, and what is the measure of its supplement?
2. Two angles are complementary. The ratio of their measures is $2:7$. What is the exact measure of the larger angle?
3. Four rays emerge from a single point, forming four angles that complete a full $360^\circ$ circle. Three of the angles measure $x$, $2x$, and $x + 20^\circ$. The fourth angle is supplementary to the first angle $x$. Set up the equation and find the exact value of $x$.