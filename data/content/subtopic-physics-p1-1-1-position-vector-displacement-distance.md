## What it is
The **position vector** $\vec{r}$ is an arrow drawn from a chosen origin to an object's location. **Displacement** $\Delta\vec{r}$ is the vector representing the change in position, pointing from an object's initial to its final location. **Distance** is a scalar quantity representing the total length of the path traveled.

## Why it matters
These concepts are the absolute bedrock of kinematics, which describes motion. In aerospace, you cannot plan a rocket's trajectory to orbit without precisely defining its position and displacement vectors over time. In computer science, pathfinding algorithms like A* distinguish between the "distance" of a proposed path and the straight-line "displacement" to the goal (the heuristic) to find solutions efficiently.

## When to study it
You must be comfortable with the concept of a coordinate system (specifically Cartesian coordinates) and basic vector algebra. This includes vector addition, subtraction, and finding the magnitude of a vector. If you cannot confidently subtract $\vec{b} = 5\hat{i} - 2\hat{j}$ from $\vec{a} = 3\hat{i} + 4\hat{j}$, review vector operations first.

## How to study it (step by step)
1.  **Draw it.** On graph paper, draw a 2D Cartesian coordinate system (x and y axes). Mark the origin O at (0,0). Pick a point $P_1$ at coordinates $(x_1, y_1)$, say $(2, 1)$. Draw a vector (an arrow) from O to $P_1$. Label this vector $\vec{r}_1$. This is the initial position vector.
2.  **Draw a second one.** Pick a second point $P_2$ at coordinates $(x_2, y_2)$, say $(5, 5)$. Draw a vector from O to $P_2$. Label it $\vec{r}_2$. This is the final position vector.
3.  **Find the change.** Now, draw a third vector starting at the tip of $\vec{r}_1$ (point $P_1$) and ending at the tip of $\vec{r}_2$ (point $P_2$). This new vector is the displacement, $\Delta\vec{r}$. Look at your drawing. You should see a triangle formed by the vectors $\vec{r}_1$, $\Delta\vec{r}$, and $\vec{r}_2$.
4.  **Derive the relationship.** From the head-to-tail rule of vector addition in your diagram, you can see that $\vec{r}_1 + \Delta\vec{r} = \vec{r}_2$. Rearrange this to solve for the displacement: $\Delta\vec{r} = \vec{r}_2 - \vec{r}_1$. This is the fundamental definition of displacement.
5.  **Calculate.** Using the points from steps 1 & 2, calculate the displacement vector: $\Delta\vec{r} = (5\hat{i} + 5\hat{j}) - (2\hat{i} + 1\hat{j}) = (5-2)\hat{i} + (5-1)\hat{j} = 3\hat{i} + 4\hat{j}$.
6.  **Distinguish magnitude from path.** Calculate the magnitude of the displacement: $|\Delta\vec{r}| = \sqrt{3^2 + 4^2} = \sqrt{9+16} = \sqrt{25} = 5$ units. Now, imagine you walked from $P_1$ to $P_2$, but you had to walk along the grid lines—first 3 units east, then 4 units north. The *distance* you traveled would be $3 + 4 = 7$ units. Note that distance (7) is greater than the magnitude of the displacement (5).

## Key ideas, with intuition
*   **Position is an address.** A position vector tells you where something is, but only relative to a specific starting point (the origin). If you change your origin, the object's position vector also changes. It's like saying "5 km North of the Eiffel Tower" vs. "1 km East of the Arc de Triomphe"—same location, different position vectors.

*   **Displacement is the net journey.** Displacement only cares about the start and end points, not the path taken. It is independent of the origin. If you and I both move from Paris to Rome, our displacement vector is the same, regardless of our starting addresses within Paris or our final addresses within Rome (assuming we start and end at the exact same latitude/longitude). This is because the change in position is an absolute quantity.
    $$ \Delta\vec{r} = \vec{r}_{final} - \vec{r}_{initial} $$

*   **Distance is the odometer reading.** Distance is the literal length of the path you travel. If you run a full 400m lap on a track, you end where you started. Your displacement is zero, but the distance traveled is 400m. This leads to the key inequality:
    $$ \text{Distance} \ge |\text{Displacement}| $$
    Equality only holds if you travel in a straight line without changing direction.

## Worked example
An aircraft is initially at a position $\vec{r}_i = (10 \text{ km})\hat{i} + (25 \text{ km})\hat{j} + (5 \text{ km})\hat{k}$ relative to a radar station at the origin. After 15 minutes, its position is $\vec{r}_f = (13 \text{ km})\hat{i} + (21 \text{ km})\hat{j} + (4.5 \text{ km})\hat{k}$. Find the displacement vector and the magnitude of the displacement.

**Step 1: State the goal.**
We need to find the displacement vector $\Delta\vec{r}$ and its magnitude $|\Delta\vec{r}|$.

**Step 2: Recall the definition of displacement.**
Displacement is the final position vector minus the initial position vector.
$\Delta\vec{r} = \vec{r}_f - \vec{r}_i$

**Step 3: Substitute the given vectors and perform the subtraction.**
$\Delta\vec{r} = ((13)\hat{i} + (21)\hat{j} + (4.5)\hat{k}) - ((10)\hat{i} + (25)\hat{j} + (5)\hat{k})$
Group the components:
$\Delta\vec{r} = (13 - 10)\hat{i} + (21 - 25)\hat{j} + (4.5 - 5)\hat{k}$
$\Delta\vec{r} = (3 \text{ km})\hat{i} - (4 \text{ km})\hat{j} - (0.5 \text{ km})\hat{k}$

**Step 4: Calculate the magnitude of the displacement vector.**
The magnitude of a vector $\vec{v} = v_x\hat{i} + v_y\hat{j} + v_z\hat{k}$ is $|\vec{v}| = \sqrt{v_x^2 + v_y^2 + v_z^2}$.
$|\Delta\vec{r}| = \sqrt{(3)^2 + (-4)^2 + (-0.5)^2}$
$|\Delta\vec{r}| = \sqrt{9 + 16 + 0.25}$
$|\Delta\vec{r}| = \sqrt{25.25} \approx 5.025$ km

**Reflection:**
Step 2 worked because it's the definition. Step 3 is just vector component subtraction, a prerequisite skill. Step 4 applies the Pythagorean theorem in three dimensions to find the straight-line length of the displacement vector. The final result tells us the aircraft moved approximately 5 km in a straight line from its starting point, in the direction specified by the vector $(3, -4, -0.5)$.

## Diagrams
```text
           y
           ^
           |
         5 + - - - - - - - - - - - - - - -> P2(x2, y2)
           |                         . '   /
           |                      . '     /
         4 +                   . '       /
           |                . '         /|
         3 +             . '           / |
           |          . '             /  |
         2 +       . '         Δr = r2-r1|
           |    . '                     |
         1 + - - - > P1(x1, y1)         |
           |  /   . '                   |
           | / . '                      |
         O +-----------------------------------> x
           0   1   2   3   4   5   6   7

Key:
O: Origin (0,0)
r1 (vector O -> P1): Initial position vector
r2 (vector O -> P2): Final position vector
Δr (vector P1 -> P2): Displacement vector
```

## Memory technique — remember this forever
1.  **Story:** You are a pizza delivery driver. The **Origin** is the pizza shop. Your **Position** is your current address, a vector from the shop. Your first delivery is at point $P_1$, the next is at $P_2$. The **Displacement** vector, $\vec{r}_2 - \vec{r}_1$, is the straight-line path from the first customer to the second—what a bird would fly. The **Distance** is what you actually drive, following the roads, which is always longer (or, rarely, the same).

2.  **Overlearn these formulas:**
    *   Displacement: $\Delta\vec{r} = \vec{r}_f - \vec{r}_i$ (Final minus Initial)
    *   Magnitude of displacement (2D): $|\Delta\vec{r}| = \sqrt{(\Delta x)^2 + (\Delta y)^2}$
    *   The fundamental inequality: $\text{Distance} \ge |\Delta\vec{r}|$

3.  **Spaced Repetition:** Review these ideas and re-solve a problem at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, start with a drawing. Draw an origin, an initial point $P_i$, and a final point $P_f$. Draw the position vectors $\vec{r}_i$ and $\vec{r}_f$ from the origin. Draw the displacement vector $\Delta\vec{r}$ from $P_i$ to $P_f$. You will visually reconstruct the vector triangle addition $\vec{r}_i + \Delta\vec{r} = \vec{r}_f$, which you can always solve for $\Delta\vec{r}$. The magnitude is just the Pythagorean theorem.

## Common mistakes
*   **Distance vs. Displacement Magnitude:** A car drives 6 km east and then 6 km west, returning to its starting point. The distance traveled is 12 km. The displacement is $\vec{0}$ because $\vec{r}_f = \vec{r}_i$. Do not say the displacement is 12 km.
*   **Forgetting Direction:** Stating "the displacement is 10 meters" is wrong. It's a vector. It must be "10 meters north" or "10 meters at a 30-degree angle" or given in component form like $(6\hat{i} + 8\hat{j})$ m.
*   **Subtraction Order:** Calculating $\vec{r}_i - \vec{r}_f$ gives you the vector pointing from the final position back to the initial position. It has the correct magnitude but the exact opposite direction. Always do Final minus Initial.

## Self-check
1.  A particle's position changes from $\vec{r}_i = (2\hat{i} - 3\hat{j})$ m to $\vec{r}_f = (-4\hat{i} + 5\hat{j})$ m. What is its displacement vector?
2.  A person walks 40 m East, then 30 m North. What is the total distance they have walked? What is their displacement (magnitude and direction) from their starting point?
3.  The position of a satellite is given by the function $\vec{r}(t) = (t^3)\hat{i} + (2t^2 - 1)\hat{j}$ km, where $t$ is in hours. What is the satellite's displacement vector between $t=0$ h and $t=2$ h? What is the magnitude of this displacement?