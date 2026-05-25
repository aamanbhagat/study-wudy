## What it is
The Pythagorean theorem states that in a flat plane, the square of the hypotenuse of a right-angled triangle is equal to the sum of the squares of the other two sides ($a^2 + b^2 = c^2$). Proving it from first principles—via geometric rearrangement or similar triangles—transforms this from a memorized rule into a logical inevitability. The converse states that if the side lengths of a triangle satisfy $a^2 + b^2 = c^2$, the triangle must contain exactly one $90^\circ$ angle.

## Why it matters
This is the fundamental metric of flat space. In physics and rocket science, it is the basis for vector magnitude; when a spacecraft has horizontal and vertical velocity components, this theorem calculates its total speed. In computer science and machine learning, it generalizes to the L2 norm (Euclidean distance) in $n$-dimensional space, which is how algorithms measure the "distance" between data points. In trigonometry, it gives birth to the unit circle identity $\sin^2(\theta) + \cos^2(\theta) = 1$.

## When to study it
You must already understand:
1. Basic algebra (expanding polynomials like $(a+b)^2$, solving for variables).
2. Basic geometry (area of triangles and squares, the fact that triangle interior angles sum to $180^\circ$).
3. The definition of similar triangles (triangles with the same angles have proportional side lengths).
If you cannot confidently set up a proportion between two similar triangles, review that first.

## How to study it (step by step)
1. **Draw the rearrangement proof:** Sketch a large square of side length $(a+b)$. Inside it, draw four identical right triangles with legs $a$ and $b$, arranged so their hypotenuses $c$ form a tilted inner square. 
2. **Derive via algebra:** Write the area of the large square in two ways: as $(a+b)^2$, and as the sum of the inner square's area plus the four triangles. Equate them and simplify.
3. **Draw the similar triangles setup:** Sketch a right triangle resting on its hypotenuse. Drop an altitude (a perpendicular line) from the right angle straight down to the hypotenuse.
4. **Derive via proportions:** Identify the three similar triangles created. Write the ratios of their sides, cross-multiply to get $a^2$ and $b^2$, and add them together.
5. **Prove the converse:** Assume a triangle has sides satisfying $a^2 + b^2 = c^2$. Construct a *second*, guaranteed right triangle with legs $a$ and $b$. Use the theorem to show its hypotenuse must be $c$, proving the two triangles are congruent (Side-Side-Side), meaning the first triangle must also be a right triangle.
6. **Drill:** Solve 5-10 problems finding missing sides, focusing on keeping exact radical forms (e.g., $\sqrt{17}$) rather than decimals.

## Key ideas, with intuition
**1. Area Equivalence (The Rearrangement)**
The theorem is literally about physical space. $a^2$, $b^2$, and $c^2$ are not just algebraic symbols; they are the areas of literal squares drawn on the sides of the triangle. The rearrangement proof shows that the area of the $c$-square perfectly consumes the areas of the $a$-square and $b$-square. 

**2. Fractal Self-Similarity (Similar Triangles)**
When you drop an altitude from the right angle to the hypotenuse, you split the triangle into two smaller triangles. Because they share angles with the parent triangle, all three are similar. This means the parent triangle is made of two smaller, scaled copies of itself. The theorem falls out naturally from the scale factors.

**3. The Converse is a Two-Way Street**
Geometry often works in one direction (e.g., all squares are rectangles, but not all rectangles are squares). The Pythagorean theorem is a biconditional (an "if and only if"). The right angle dictates the side lengths, and the side lengths strictly dictate the right angle. 

## Worked example
**Deriving the theorem via Similar Triangles**

Let $\triangle ABC$ be a right triangle with the right angle at $C$. Let the sides opposite to angles $A, B, C$ be $a, b, c$. 
Drop an altitude from $C$ to the hypotenuse $AB$, meeting at point $D$. 
Let $AD = x$ and $DB = y$. Note that $c = x + y$.

**Step 1: Establish similarity.**
$\triangle ABC$ has a right angle at $C$ and includes $\angle A$.
$\triangle ACD$ has a right angle at $D$ and includes $\angle A$.
Because they share two angles, the third must be equal. Therefore, $\triangle ABC \sim \triangle ACD$.
By the exact same logic (sharing $\angle B$), $\triangle ABC \sim \triangle CBD$.

**Step 2: Set up ratios for $b^2$.**
Because $\triangle ABC \sim \triangle ACD$, the ratio of the hypotenuse to the short leg is constant:
$$ \frac{\text{Hypotenuse}}{\text{Short Leg}} \implies \frac{c}{b} = \frac{b}{x} $$
Cross-multiply:
$$ b^2 = cx $$
*(Reflection: The square of a leg is the product of the hypotenuse and the segment of the hypotenuse adjacent to that leg.)*

**Step 3: Set up ratios for $a^2$.**
Because $\triangle ABC \sim \triangle CBD$, the ratio of the hypotenuse to the long leg is constant:
$$ \frac{\text{Hypotenuse}}{\text{Long Leg}} \implies \frac{c}{a} = \frac{a}{y} $$
Cross-multiply:
$$ a^2 = cy $$

**Step 4: Add them together.**
$$ a^2 + b^2 = cy + cx $$
Factor out $c$:
$$ a^2 + b^2 = c(y + x) $$
Since $x + y = c$:
$$ a^2 + b^2 = c(c) = c^2 $$
*(Reflection: We proved the theorem purely by exploiting the fact that a right triangle is composed of smaller versions of itself.)*

## Diagrams

```text
1. Rearrangement Proof Setup
   Area of whole = (a+b)^2
   Area of parts = c^2 + 4*(1/2*a*b)

   +-------------------------+
   |a        c      /       b|
   |  + - - - - - +          |
   |  | \       / |          |
   |  |   \   /   |          |
   |b |     X     | a        |
   |  |   /   \   |          |
   |  | /       \ |          |
   |  + - - - - - +          |
   |b       c       \       a|
   +-------------------------+
     (Imagine the inner square is tilted, 
      formed by 4 corner right triangles)

2. Similar Triangles Proof Setup
           C
          /|\
       b / | \ a
        /  |h \
       /   |   \
      /____|____\
     A  x  D  y  B
        \___c___/
```

## Memory technique — remember this forever
1. **Visual Hook:** Picture the large $(a+b)$ square with the tilted $c$ square trapped inside it. This single image contains the entire algebraic proof.
2. **Must Overlearn:** 
   * $a^2 + b^2 = c^2$ (where $c$ is strictly the hypotenuse).
   * **Converse:** If $a^2 + b^2 = c^2$, the angle opposite $c$ is $90^\circ$.
3. **Spaced-repetition schedule:** Review this derivation at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget everything, draw a square of side $(a+b)$. Put a point on each side separating length $a$ and $b$. Connect the points to form an inner square of side $c$. Write the area equation: $(a+b)^2 = c^2 + 4(\frac{1}{2}ab)$. Expand the left to $a^2 + 2ab + b^2$. Subtract $2ab$ from both sides. You have $a^2 + b^2 = c^2$.

## Common mistakes
1. **Blindly plugging numbers into $a, b, c$:** Students often assign the largest given number to $a$ or $b$ instead of $c$. $c$ *must* be the hypotenuse (the side opposite the right angle).
2. **Forgetting to take the square root:** Solving $3^2 + 4^2 = c^2 \implies 9 + 16 = 25$, and then stating the hypotenuse is 25. The hypotenuse is $\sqrt{25} = 5$.
3. **Applying it to non-right triangles:** The theorem only works if the triangle has a $90^\circ$ angle. If the angle is not $90^\circ$, you must use the Law of Cosines.

## Self-check
1. A right triangle has legs of length $5$ and $12$. What is the length of the hypotenuse?
2. A triangle has side lengths $8, 15,$ and $17$. Use the converse of the Pythagorean theorem to prove whether or not it is a right triangle.
3. Draw a trapezoid with parallel bases of length $a$ and $b$, and a height of $(a+b)$. Inside it, pack two right triangles of legs $a,b$ and one isosceles right triangle of legs $c,c$. Use the area of the trapezoid to derive $a^2 + b^2 = c^2$. (This is President James A. Garfield's proof).