## What it is
An angle measures the amount of rotation between two intersecting lines or rays, typically expressed in degrees (from $0^\circ$ to $360^\circ$) or radians. We classify angles into six specific types—acute, right, obtuse, straight, reflex, and complete—based purely on the magnitude of this rotation. This classification provides a standardized vocabulary to describe geometric shapes, physical trajectories, and vector relationships.

## Why it matters
Angle classification is the bedrock of trigonometry and vector resolution. In aerospace and rocket science, the difference between an acute and obtuse angle of attack dictates whether a vehicle generates lift or stalls catastrophically. In computer science, dot products in machine learning (like cosine similarity) rely entirely on whether the angle between two high-dimensional vectors is acute (indicating similarity) or obtuse (indicating dissimilarity). 

## When to study it
You should already understand the basic concepts of points, lines, and rays. You must also have a firm grasp of the degree system (knowing a full circle is $360^\circ$) and basic algebraic inequalities (e.g., $90 < x < 180$). If you do not know what a ray is or how to manipulate a standard inequality, review basic point-line geometry and pre-algebra before proceeding.

## How to study it (step by step)
1. Memorize the exact numerical boundaries for all six angle types.
2. Draw a Cartesian coordinate system (an $x$ and $y$ axis). Physically trace a ray starting from the positive $x$-axis and rotate it counter-clockwise, calling out the angle type as it passes through each boundary.
3. Practice estimating angle measures by eye. Look at intersections in the real world (corners of rooms, roof pitches, leaning objects) and classify them instantly.
4. Solve basic algebraic geometry problems where an angle is given as an expression (e.g., $2x + 10^\circ$) and you must find $x$ given the angle type.
5. Translate the definitions into radians. Map the six types to their radian equivalents (e.g., knowing a right angle is exactly $\frac{\pi}{2}$).

## Key ideas, with intuition
The entire system of angle classification is built around two structural anchors: the quarter-turn ($90^\circ$) and the half-turn ($180^\circ$). 

**The Inner Circle (0° to 180°):**
These are the angles you encounter most often in basic polygons.
*   **Acute:** $0^\circ < \theta < 90^\circ$. Intuition: "Sharp" or "pinched."
*   **Right:** $\theta = 90^\circ$. Intuition: Perfectly perpendicular. The cornerstone of orthogonal coordinate systems.
*   **Obtuse:** $90^\circ < \theta < 180^\circ$. Intuition: "Blunt" or "leaning back." 

**The Outer Circle (180° to 360°):**
These describe larger physical rotations and the "outside" of standard shapes.
*   **Straight:** $\theta = 180^\circ$. Intuition: A flat, continuous line. 
*   **Reflex:** $180^\circ < \theta < 360^\circ$. Intuition: Bending past a flat line, exposing the outside of a joint. Every acute or obtuse angle has a corresponding reflex angle on the other side.
*   **Complete:** $\theta = 360^\circ$. Intuition: A full revolution back to the starting position.

## Worked example
**Problem:** An angle $\theta$ is defined by the equation $\theta = 3x + 15^\circ$. If $\theta$ is an obtuse angle, what is the strict range of possible values for $x$?

**Step 1: State the definition of an obtuse angle.**
$$90^\circ < \theta < 180^\circ$$
*Why:* We must ground the geometric word "obtuse" into a rigorous algebraic constraint before we can solve anything.

**Step 2: Substitute the algebraic expression for $\theta$.**
$$90^\circ < 3x + 15^\circ < 180^\circ$$
*Why:* This connects the geometry to our specific variable $x$.

**Step 3: Isolate the $x$ term by subtracting $15^\circ$ from all parts of the inequality.**
$$75^\circ < 3x < 165^\circ$$
*Why:* Standard algebraic manipulation to maintain the balance of the compound inequality.

**Step 4: Divide by 3.**
$$25^\circ < x < 55^\circ$$
*Why:* To find the final bounds for $x$. 

**Reflection:** By translating the geometric definition ("obtuse") into a strict algebraic inequality, we bounded the variable $x$. This demonstrates how geometric classifications serve as constraints in algebraic and physical systems.

## Diagrams

```text
                      y-axis
                   Right (90°)
                        |
       Obtuse           |           Acute
     (90° < θ < 180°)   |       (0° < θ < 90°)
                        |
                        |
  ----------------------+---------------------- x-axis
  Straight (180°)       |                 (0° / 360°)
                        |               Complete (360°)
                        |
       Reflex           |           Reflex
    (180° < θ < 360°)   |       (180° < θ < 360°)
                        |
```

## Memory technique — remember this forever
**1. The "Opening Door" Story:**
Imagine looking down at a door from above.
*   Barely open: **A cute** little opening (**Acute**).
*   Open exactly halfway: Standing **Right** up (**Right**).
*   Pushed too far, hinges straining: **Obtuse** (sounds like "obese" — wide and blunt).
*   Smashed flat against the wall: **Straight** line (**Straight**).
*   Hinges break and it swings backward: **Reflex** (like a knee reflex kicking backward).
*   Spins all the way around: **Complete** circle.

**2. Facts to overlearn:**
You must instantly recall these inequalities without hesitation:
*   Acute: $0^\circ < \theta < 90^\circ$
*   Obtuse: $90^\circ < \theta < 180^\circ$
*   Reflex: $180^\circ < \theta < 360^\circ$

**3. Spaced-repetition schedule:**
Review these definitions and the diagram at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days. 

**4. First principles pathway:**
If you forget the terms, draw a circle with a crosshair (x and y axes). The axes inherently define $90^\circ$, $180^\circ$, $270^\circ$, and $360^\circ$. Every angle type is simply a specific boundary line on this crosshair, or the space between them. 

## Common mistakes
*   **Confusing $0^\circ$ with $360^\circ$:** Geometrically, the rays look identical on paper. Dynamically, a complete angle ($360^\circ$) represents a full physical rotation, whereas $0^\circ$ represents no rotation. In physics, this distinction is critical.
*   **Forgetting the "Reflex" side:** When two lines intersect, they create an "inside" angle (usually acute or obtuse) and an "outside" angle (reflex). Students often ignore the reflex angle. Remember that the inner angle $\theta$ and its reflex counterpart always sum to $360^\circ$.
*   **Treating boundaries as regions:** An angle of exactly $90^\circ$ is *not* acute. An angle of exactly $180^\circ$ is *not* obtuse. Acute, obtuse, and reflex are strictly defined by inequalities ($<$ and $>$), not equals signs.

## Self-check
1. Classify the following angles by their measure: $89.9^\circ$, $180.1^\circ$, $90^\circ$.
2. If angle $\alpha$ is acute and angle $\beta$ is a right angle, what are the possible angle types for their sum, $\alpha + \beta$?
3. A rocket's gimballed engine rotates from a neutral $0^\circ$ position to an angle $\theta = x^2 - 10x + 114^\circ$. If the engine's rotation must strictly remain an acute angle to avoid structural failure, what is the valid range of values for $x$?