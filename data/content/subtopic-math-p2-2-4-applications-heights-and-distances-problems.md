## What it is
Heights and distances problems are practical applications of right-triangle trigonometry used to calculate unknown dimensions without direct measurement. By establishing a line of sight, a horizontal reference, and a measured angle, you can use trigonometric ratios to solve for the exact height of an object or your distance from it.

## Why it matters
This is the mathematical foundation of optical tracking and surveying. In aerospace, ground stations use these exact geometric principles to calculate a rocket's altitude based on radar elevation angles. In physics, mastering this builds the intuition required to decompose 2D vectors into orthogonal components, a non-negotiable skill for analyzing forces, projectile motion, and orbital mechanics.

## When to study it
You must already be fluent in:
*   Right-triangle trigonometry (SOH CAH TOA).
*   The Pythagorean theorem ($a^2 + b^2 = c^2$).
*   Basic algebraic manipulation (solving systems of linear equations).
*   Geometry of transversal lines (specifically, alternate interior angles).

If you cannot instantly recall that $\tan(\theta) = \frac{\text{opposite}}{\text{adjacent}}$ or that parallel lines intersected by a line create equal alternate interior angles, review those concepts before proceeding.

## How to study it (step by step)
1.  **Define the terminology:** Spend 15 minutes drawing and labeling the "line of sight," "horizontal line," "angle of elevation," and "angle of depression." Never proceed until you can draw these from memory.
2.  **Master the translation:** Take 5 word problems and do nothing but draw the corresponding right triangles. Do not solve them. Label the knowns and unknowns ($h$, $x$, $\theta$).
3.  **Isolate the tangent function:** Recognize that 90% of these problems involve the tangent ratio, because you usually care about the height (opposite) and the distance along the ground (adjacent), not the direct line-of-sight distance (hypotenuse).
4.  **Solve single-triangle problems:** Spend 30 minutes solving basic problems to build algebraic muscle memory. 
5.  **Solve shared-side problems:** Spend 30 minutes solving complex problems involving two observers or moving objects. Identify the geometric side that both triangles share (usually the vertical height) and use it to link two equations together.

## Key ideas, with intuition

**1. The Horizontal Reference Frame**
Angles in these problems are *always* measured from a perfectly horizontal line. 
*   **Angle of Elevation:** Looking up from the horizontal.
*   **Angle of Depression:** Looking down from the horizontal. 
Intuition: Your neck's neutral position looking straight ahead is $0^\circ$. 

**2. Elevation = Depression**
Because the horizontal line at the observer's eye level is parallel to the horizontal ground, the line of sight acts as a transversal. By the geometry of alternate interior angles, the angle of depression from the top of a cliff to a boat exactly equals the angle of elevation from the boat to the top of the cliff. 

**3. The Tangent Dominance**
If you know the distance to a launchpad ($d$) and the angle to the rocket ($\theta$), the height ($h$) is derived instantly from first principles:
$$ \tan(\theta) = \frac{\text{Opposite}}{\text{Adjacent}} = \frac{h}{d} $$
$$ h = d \cdot \tan(\theta) $$

**4. The Shared Side Principle**
When a problem involves two angles (e.g., looking at a tower from two different distances), you will have two right triangles. They will almost always share the vertical side ($h$). You solve these by writing two equations for $h$ and setting them equal to each other.

## Worked example
**Problem:** From a point on the ground, the angle of elevation to the top of a rocket is $30^\circ$. Walking $100$ meters closer to the launchpad, the angle of elevation becomes $60^\circ$. Find the exact height of the rocket.

**Step 1: Define variables and set up the geometry.**
Let $h$ be the height of the rocket.
Let $x$ be the distance from the second point to the base of the rocket.
We now have two right triangles: a smaller one with base $x$ and angle $60^\circ$, and a larger one with base $(x + 100)$ and angle $30^\circ$. Both share height $h$.

**Step 2: Write the equation for the smaller triangle.**
$$ \tan(60^\circ) = \frac{h}{x} $$
Since $\tan(60^\circ) = \sqrt{3}$:
$$ \sqrt{3} = \frac{h}{x} \implies h = x\sqrt{3} $$

**Step 3: Write the equation for the larger triangle.**
$$ \tan(30^\circ) = \frac{h}{x + 100} $$
Since $\tan(30^\circ) = \frac{1}{\sqrt{3}}$:
$$ \frac{1}{\sqrt{3}} = \frac{h}{x + 100} $$

**Step 4: Substitute and solve for $x$.**
Substitute $h = x\sqrt{3}$ into the second equation:
$$ \frac{1}{\sqrt{3}} = \frac{x\sqrt{3}}{x + 100} $$
Cross-multiply:
$$ x + 100 = (x\sqrt{3})(\sqrt{3}) $$
$$ x + 100 = 3x $$
$$ 100 = 2x \implies x = 50 \text{ meters} $$

**Step 5: Solve for $h$.**
$$ h = x\sqrt{3} = 50\sqrt{3} \text{ meters} $$

*Reflection:* By identifying the shared side ($h$), we created a system of two equations. Substituting one into the other allowed us to solve for the unknown ground distance first, which immediately yielded the height.

## Diagrams

```text
        R (Rocket Top)
        *
        | \
        |   \
      h |     \
        |       \
        | 60°     \ 30°
        L----------B----------A
             x          100
```
*   **L:** Launchpad (Right angle).
*   **A:** Initial observer position.
*   **B:** Second observer position ($100$m closer).
*   **Triangle RLA:** Represents the $30^\circ$ observation. Base is $x + 100$.
*   **Triangle RLB:** Represents the $60^\circ$ observation. Base is $x$.

## Memory technique — remember this forever
1.  **The Hook:** "The Horizon is the Anchor." If you draw an angle starting from a vertical wall, you have failed. Always draw your horizontal line first.
2.  **Must Overlearn:** 
    *   $\text{Angle of Elevation} = \text{Angle of Depression}$
    *   $h = d \cdot \tan(\theta)$
3.  **Spaced Repetition:** Review this concept, specifically setting up the shared-side dual triangles, at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4.  **First Principles Pathway:** If you forget whether to use sine, cosine, or tangent, draw the triangle. Ask: "What do I know? What do I want?" If you know the ground distance (adjacent) and want the height (opposite), SOH CAH TOA dictates you must use Tangent.

## Common mistakes
*   **Measuring from the vertical:** Students often draw the angle of depression from the vertical object (like the side of a cliff) instead of drawing an imaginary horizontal line outward from the observer's eye. This calculates the wrong angle (the complement, $90^\circ - \theta$).
*   **Ignoring observer height:** If a problem states "A 1.8m tall observer looks at a tree...", the triangle calculates the height of the tree *above the observer's eyes*. You must add 1.8m to your final answer to get the total height of the tree.
*   **Premature decimal approximation:** Keep $\sqrt{3}$ and $\sqrt{2}$ in your equations until the final step. Rounding early introduces cascading errors, which is unacceptable in engineering and physics.

## Self-check
1.  A radar station detects a weather balloon at a ground distance of $4,000$ meters. The angle of elevation is $45^\circ$. What is the altitude of the balloon?
2.  A $2$-meter tall surveyor stands $50$ meters from a building. The angle of elevation from her eyes to the top of the building is $30^\circ$. What is the total height of the building?
3.  From the top of a $200$-meter vertical cliff, the angles of depression to two ships in the same line of sight on the water are $45^\circ$ and $30^\circ$. What is the exact distance between the two ships?