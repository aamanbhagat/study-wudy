## What it is
Area is the measure of two-dimensional space enclosed within a flat boundary. For polygons like triangles, parallelograms, and trapeziums, it quantifies how many $1 \times 1$ unit squares fit inside the shape, which we calculate by mathematically rearranging these shapes into simple rectangles.

## Why it matters
In physics and aerospace, area dictates forces: aerodynamic drag on a rocket, heat dissipation across a radiator, and pressure distribution ($F = P \times A$). In calculus and machine learning, the area under a curve (integration) is routinely approximated using trapeziums (the Trapezoidal Rule). Mastering composite shapes now builds the spatial reasoning required to evaluate complex mass distributions and moments of inertia in rigid body dynamics.

## When to study it
You must already understand:
1. Basic arithmetic and algebraic substitution.
2. Properties of parallel and perpendicular lines.
3. The definition and area of a rectangle ($A = \text{base} \times \text{height}$).
If you do not intuitively grasp why a rectangle's area is base times height, stop and draw a grid of squares to prove it to yourself before proceeding.

## How to study it (step by step)
1. **Derive the parallelogram:** Draw a slanted parallelogram. Drop a perpendicular line to "chop off" a right triangle from one end. Mentally move it to the other end to form a rectangle. Prove to yourself that $A = b \times h$.
2. **Derive the triangle:** Draw any triangle. Draw an identical, upside-down copy of it attached to one of its sides. Observe that they form a parallelogram. Conclude that the triangle's area must be exactly half of the parallelogram's.
3. **Derive the trapezium:** Draw a trapezium. Draw an identical copy, rotate it 180 degrees, and attach it to the original along the slanted edge. Observe the resulting parallelogram and derive the trapezium area formula.
4. **Decompose composite shapes:** Sketch three complex, irregular rectilinear shapes (e.g., a house profile, a blocky "L" or "T"). Draw dashed lines to break them down into non-overlapping rectangles and triangles. Calculate the total area by summing the parts.
5. **Invert the formulas:** Write down problems where the *area* is known, but a base or height is missing. Solve algebraically for the missing dimension.

## Key ideas, with intuition

**1. The Rectangle is the Atom**
Every area formula for straight-edged shapes is just a manipulation to turn the shape back into a rectangle. 

**2. Parallelogram (The Sheared Rectangle)**
Imagine a neat stack of printer paper. Viewed from the side, it is a rectangle. If you push the top of the stack, it shears into a parallelogram. The total amount of paper hasn't changed. Therefore, the area depends strictly on the base and the *perpendicular* height, not the slanted edge.
$$A = b \times h$$

**3. Triangle (Half a Parallelogram)**
Any triangle is exactly half of a parallelogram with the same base and height. 
$$A = \frac{1}{2} b \times h$$

**4. Trapezium (The Average Base)**
A trapezium has two parallel bases of different lengths, $a$ and $b$. To find its area, you can pretend it is a rectangle whose base is the *average* of the two parallel sides. 
$$A = \left( \frac{a + b}{2} \right) \times h$$

## Worked example
**Problem:** A composite metal plate consists of a trapezium with parallel bases of $6\text{ cm}$ and $10\text{ cm}$, and a perpendicular height of $4\text{ cm}$. A right-angled triangle with a base of $3\text{ cm}$ and a height of $4\text{ cm}$ is cut out of (removed from) the trapezium. Find the final area of the plate.

**Step 1: Calculate the area of the full trapezium.**
$$A_{\text{trap}} = \frac{1}{2}(a + b)h$$
$$A_{\text{trap}} = \frac{1}{2}(6 + 10)(4)$$
$$A_{\text{trap}} = \frac{1}{2}(16)(4) = 32\text{ cm}^2$$

**Step 2: Calculate the area of the triangle to be removed.**
$$A_{\text{tri}} = \frac{1}{2}bh$$
$$A_{\text{tri}} = \frac{1}{2}(3)(4)$$
$$A_{\text{tri}} = 6\text{ cm}^2$$

**Step 3: Subtract the removed area from the total area.**
$$A_{\text{final}} = A_{\text{trap}} - A_{\text{tri}}$$
$$A_{\text{final}} = 32 - 6 = 26\text{ cm}^2$$

*Reflection:* Decomposing composite shapes requires treating area as a scalar quantity that can be added or subtracted. We calculated the macroscopic shape first, then subtracted the void, relying strictly on perpendicular heights for both.

## Diagrams

```text
Deriving the Trapezium Area:

   Base a                  Base b
 +--------+             +------------+
 |         \           /             |
 | Original \    +    / Rotated Copy | Height h
 |           \       /               |
 +------------+     +--------+-------+
     Base b           Base a

Combined, they form a Parallelogram:
Total Base = (a + b)
Total Height = h
Combined Area = (a + b) * h

Since the original trapezium is exactly half of this:
Area = 1/2 * (a + b) * h
```

## Memory technique — remember this forever
1. **The Hook:** *"Everything is a rectangle in disguise."* When you look at a triangle or trapezium, visualize the ghost of the rectangle it was carved from.
2. **The Must-Know Formulas:**
   * Triangle: $$A = \frac{1}{2}bh$$
   * Parallelogram: $$A = bh$$
   * Trapezium: $$A = \frac{1}{2}(a+b)h$$
3. **Spaced-repetition schedule:** Review these derivations (not just the formulas) at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget a formula, duplicate the shape. Two identical triangles make a parallelogram. Two identical trapeziums make a parallelogram. A parallelogram's area is just a rectangle's area ($b \times h$). Divide by two to get your original shape back.

## Common mistakes
1. **Using the slant edge instead of perpendicular height:** This is the single most common error. Height must *always* be measured at a $90^\circ$ angle to the base. Slant length is useless for area.
2. **Forgetting the $\frac{1}{2}$ in the triangle formula:** Students often multiply base by height and stop, accidentally calculating the area of the bounding parallelogram.
3. **Misidentifying the bases of a trapezium:** The bases $a$ and $b$ are strictly the two *parallel* sides, regardless of the shape's orientation on the page.

## Self-check
1. Find the area of a triangle with a base of $12\text{ m}$, a slant edge of $5\text{ m}$, and a perpendicular height of $4\text{ m}$.
2. A trapezium has an area of $50\text{ cm}^2$, a height of $5\text{ cm}$, and one parallel base of $8\text{ cm}$. What is the length of the other parallel base?
3. You have a square of side length $x$. Inside it, a triangle is drawn such that its base is one side of the square, and its third vertex lies *anywhere* on the opposite side of the square. Prove algebraically that the area of the triangle is exactly half the area of the square, regardless of where that third vertex is placed.