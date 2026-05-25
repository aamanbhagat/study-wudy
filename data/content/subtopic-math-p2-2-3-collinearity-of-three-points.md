## What it is
Three or more points are collinear if they lie exactly on the same straight line. In coordinate geometry, this means a single linear equation passes through all of them, and a path traveling from the first point to the second can continue in the exact same direction to hit the third.

## Why it matters
Collinearity is the geometric basis for trajectory verification. In orbital mechanics, you must determine if a spacecraft, a moon, and a communication relay are collinear to predict signal blackouts (occultations). In computer science, collinearity checks are fundamental to rendering algorithms (to cull degenerate triangles) and in machine learning for detecting perfectly correlated features that cause matrix singularities.

## When to study it
You must already understand:
1. The Cartesian coordinate system.
2. The concept of slope (gradient) between two points: $m = \frac{\Delta y}{\Delta x}$.
3. The distance formula: $d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$.
If you cannot reliably calculate the slope or distance between two arbitrary coordinates, stop and master those first.

## How to study it (step by step)
1. **Visualize the slope:** Plot three collinear points on graph paper. Calculate the slope from point 1 to point 2, and point 2 to point 3. Verify they are identical.
2. **Understand the shared point:** Realize that having the same slope is not enough (that just means parallel). You must explicitly recognize that sharing a middle point locks them onto the *same* line.
3. **Derive the distance condition:** Draw a straight line segment with points $A$, $B$, and $C$ in that order. Prove to yourself visually that $AB + BC = AC$. 
4. **Derive the area condition:** Imagine a triangle made of three points. Slowly move the top vertex down until it rests on the base. Recognize that the area of this "triangle" is now zero.
5. **Practice algebra:** Solve 3-5 problems where you are given two points and must find a missing coordinate (e.g., $k$) in a third point to force collinearity.
6. **Handle edge cases:** Test your methods on vertical lines (where slope calculation causes division by zero). 

## Key ideas, with intuition

**1. The Slope Method (Constant Rate of Change)**
If points $A$, $B$, and $C$ form a line, the "stairs" you climb to get from $A$ to $B$ must have the exact same steepness as the stairs from $B$ to $C$. 
$$ m_{AB} = m_{BC} $$
$$ \frac{y_2 - y_1}{x_2 - x_1} = \frac{y_3 - y_2}{x_3 - x_2} $$
*Crucial addition:* They must share a point (here, $B$) to anchor the two segments together.

**2. The Area Method (The Collapsed Triangle)**
Three points in a 2D plane generally form a triangle. The formula for the area of a coordinate triangle is:
$$ \text{Area} = \frac{1}{2} |x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)| $$
If the points are collinear, the triangle is completely flat. Therefore, its area is precisely $0$. This method is superior for computer algorithms because it avoids division by zero entirely.

**3. The Distance Method (The Shortest Path)**
The shortest distance between two points is a straight line. If point $B$ lies on the line segment between $A$ and $C$, taking a detour is impossible. The sum of the parts equals the whole:
$$ d(A,B) + d(B,C) = d(A,C) $$

## Worked example
**Question:** Determine if the points $A(-1, -3)$, $B(1, 1)$, and $C(4, 7)$ are collinear.

**Step 1: Calculate the slope of segment $AB$.**
$$ m_{AB} = \frac{y_B - y_A}{x_B - x_A} = \frac{1 - (-3)}{1 - (-1)} = \frac{4}{2} = 2 $$

**Step 2: Calculate the slope of segment $BC$.**
$$ m_{BC} = \frac{y_C - y_B}{x_C - x_B} = \frac{7 - 1}{4 - 1} = \frac{6}{3} = 2 $$

**Step 3: State the conclusion clearly.**
Since $m_{AB} = m_{BC} = 2$, the line segments are parallel. Because both segments share the common point $B(1,1)$, they are not just parallel, but the exact same line. Therefore, $A$, $B$, and $C$ are collinear.

*Reflection:* The slope method is the fastest for human calculation. Notice how we explicitly mentioned the shared point $B$. Without stating that, the proof is mathematically incomplete.

## Diagrams

```text
      y
      ^
      |                 C (4,7)
      |                /|
      |               / | dy = 6
      |              /  |
      |             /   |
      |      B (1,1)----+
      |       /|    dx = 3
      |      / | dy = 4
      |     /  |
      |A(-1,-3)+
      |   dx=2
------|------------------------> x
      |
      |
```
*Notice the similar triangles formed by the $dx$ and $dy$ steps. The ratio $\frac{dy}{dx}$ is identical for both segments ($4/2 = 6/3 = 2$), proving constant steepness.*

## Memory technique — remember this forever
1. **The Hook:** Think of **"The Collapsed Triangle"**. A triangle that gets stepped on until it is perfectly flat has an area of exactly zero. 
2. **The Facts to Overlearn:**
   * Slope condition: $m_{AB} = m_{BC}$ **AND** they share point $B$.
   * Area condition: Area of $\triangle ABC = 0$.
3. **Spaced-repetition schedule:** Review these facts and re-derive them at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the formulas, draw a diagonal line. Put three dots on it. Draw the horizontal and vertical steps between them. You will instantly see two similar right triangles. Similar triangles have proportional sides, meaning $\frac{\Delta y_1}{\Delta x_1} = \frac{\Delta y_2}{\Delta x_2}$. This is the slope formula.

## Common mistakes
1. **Forgetting the shared point:** Proving $m_{AB} = m_{CD}$ only proves that line $AB$ is parallel to line $CD$. To prove collinearity, you must use a shared point, like $m_{AB} = m_{BC}$.
2. **Division by zero on vertical lines:** If the points are $(2, 1)$, $(2, 5)$, and $(2, 9)$, the slope calculation $\frac{5-1}{2-2}$ yields $\frac{4}{0}$. Students panic here. Recognize that all $x$-coordinates are identical, which by definition forms a vertical line. Alternatively, use the Area method, which handles vertical lines perfectly.
3. **Wrong order in the Distance Method:** If you check $AB + BC = AC$, but the points are actually in the order $B - A - C$ on the line, the equation will fail, and you might falsely conclude they aren't collinear. You must find the longest distance first, and check if the two shorter distances sum to it.

## Self-check
1. Use the slope method to determine if the points $P(2, 4)$, $Q(4, 6)$, and $R(6, 8)$ are collinear.
2. Find the exact value of $k$ such that the points $(1, 3)$, $(2, k)$, and $(4, 9)$ are collinear.
3. Prove algebraically that for any non-zero constants $a, b,$ and $c$, the points $(a, b)$, $(a+c, b+c)$, and $(a+2c, b+2c)$ are always collinear.