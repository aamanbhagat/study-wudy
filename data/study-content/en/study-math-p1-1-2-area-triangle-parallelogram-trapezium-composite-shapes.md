## 1. The one-sentence answer
**Area quantifies the interior region enclosed by a polygon by multiplying a base length by a corresponding perpendicular height, halved for triangles and averaged across parallel sides for trapeziums, then summed over non-overlapping pieces for composite figures.**

Any closed polygon can be cut into triangles. Each triangle’s area equals half its base times its height because two identical triangles form a parallelogram whose area is base times height. A parallelogram itself arises from a rectangle by sliding one side without changing height, so its area remains base times height. A trapezium splits into a rectangle and one or two triangles, which simplifies to the average of the two parallel sides multiplied by the perpendicular distance between them.

Composite shapes follow the same rule once they are partitioned into these primitives without gaps or overlaps; the total area is simply the sum of the parts.

> [!NOTE]
> The height used in every formula must be measured perpendicular to the chosen base; slant lengths produce systematic over- or under-estimates.

## 2. Why this matters — concrete and current
In semiconductor mask design, engineers at TSMC compute the precise silicon area occupied by trapezoidal interconnects and triangular transistor fins; each square nanometre saved directly lowers fabrication cost and power leakage.

NASA’s Mars Sample Return mission uses area calculations of composite solar-array panels to guarantee that the required power budget is met under variable illumination angles, feeding directly into trajectory optimisation software.

In machine-learning hardware, Google’s TPU architects calculate the active silicon area of systolic arrays whose repeating parallelogram tiles determine both transistor count and thermal density, constraining the feasible clock frequency.

Surveying firms employing LiDAR drones decompose irregular land parcels into trapeziums and triangles to produce legally defensible area certificates for property taxation and agricultural subsidy allocation.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Perpendicular lines  | Height is defined as the shortest distance to the base; any other length violates the formula. |
| Rectangle area       | Serves as the primitive from which parallelogram and triangle areas are derived by rigid motion or bisection. |
| Additivity of area   | Composite shapes are handled by partitioning; areas of non-overlapping regions sum exactly. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Rectangle area as foundation
A rectangle with sides of length \(b\) and \(h\) fills a grid of unit squares whose count is exactly \(b \times h\).

Concrete example: a 3-by-2 rectangle covers six unit squares.

Formal statement:
\[
A_{\text{rectangle}} = b h
\]

> [!WARNING]
> Measuring along a diagonal instead of the sides counts area twice or not at all.

### Step 2 — Parallelogram by shear
Slide one side of the rectangle parallel to the base; the perpendicular height remains \(h\) while the slanted side length changes. The covered region is unchanged in measure.

Concrete example: a rectangle 4 by 3 sheared into a parallelogram of base 4 and height 3 still occupies 12 square units.

Formal statement:
\[
A_{\text{parallelogram}} = b h
\]

> [!WARNING]
> Substituting the slanted side for the base produces an incorrect product unless the corresponding height is recalculated.

### Step 3 — Triangle as half a parallelogram
Two congruent triangles form a parallelogram when placed along any side. Therefore each triangle occupies exactly half the parallelogram area.

Concrete example: base 5, height 4 yields a parallelogram of area 20; each triangle has area 10.

Formal statement:
\[
A_{\text{triangle}} = \frac12 b h
\]

> [!WARNING]
> Using two sides of the triangle as base and “height” without ensuring perpendicularity yields the wrong value.

### Step 4 — Trapezium via average bases
A trapezium with parallel sides \(a\) and \(b\) can be partitioned into a rectangle of width \(\frac{a+b}{2}\) and height \(h\), or equivalently into a parallelogram and a triangle whose areas sum to the same expression.

Formal statement:
\[
A_{\text{trapezium}} = \frac{a+b}{2} h
\]

> [!WARNING]
> Averaging the non-parallel sides instead of the parallel sides produces an unrelated quantity.

### Step 5 — Composite shapes by partition
Any polygon is triangulated or decomposed into parallelograms and trapeziums whose interiors intersect only on boundaries of measure zero. The total area equals the sum of the component areas.

Formal statement:
\[
A_{\text{composite}} = \sum_i A_i
\]

> [!WARNING]
> Overlapping regions counted twice or gaps left uncounted violate additivity.

## 5. Worked examples — every step shown

**Example 1 — Right triangle**
*Given:* legs 6 and 8 meeting at right angle.  
*Find:* area.  

Base \(b=6\), height \(h=8\).  
\[
A = \frac12 b h = \frac12 \times 6 \times 8 = 24
\]
*Why:* the right angle guarantees the legs are perpendicular.  
**24**

*Reflection:* the right angle removes any ambiguity in height choice; the same triangle with an obtuse angle would require dropping a perpendicular.

**Example 2 — Parallelogram**
*Given:* base 7, slant side 5, perpendicular height 4.  
*Find:* area.  

\[
A = b h = 7 \times 4 = 28
\]
*Why:* only the perpendicular height enters the product.  
**28**

*Reflection:* the slant length is irrelevant once height is known; students often multiply 7 by 5 instead.

**Example 3 — Trapezium**
*Given:* parallel sides 10 and 4, height 3.  
*Find:* area.  

\[
A = \frac{10+4}{2} \times 3 = 7 \times 3 = 21
\]
*Why:* the average base produces an equivalent rectangle of width 7.  
**21**

*Reflection:* the formula works even when the non-parallel sides differ in length.

**Example 4 — Composite house shape**
*Given:* rectangular base 8 wide by 5 high, isosceles triangular roof with base 8 and height 3.  
*Find:* total area.  

Rectangle: \(8 \times 5 = 40\).  
Triangle: \(\frac12 \times 8 \times 3 = 12\).  
Sum: \(40 + 12 = 52\).  
**52**

*Reflection:* the shared base is counted once in each piece but lies on the boundary, so no double-area error occurs.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using a slant side as height      | Diagram shows the slanted edge prominently  | Draw the perpendicular explicitly            |
| Forgetting the ½ for triangles    | Memorised parallelogram formula dominates   | Always verify the shape before substituting  |
| Adding areas of overlapping pieces| Partition lines drawn inside the figure     | Shade each component with a different colour |
| Averaging all four sides of trapezium | Confusion between bases and legs         | Identify the two parallel sides first        |
| Measuring height to the wrong vertex | Acute/obtuse angle misidentified         | Extend the base and drop perpendicular       |
| Treating composite area as product  | Over-generalisation from single-shape formulas | Decompose first, then sum                    |
| Using coordinate differences without absolute value | Sign errors in subtraction             | Compute distance as \(\lvert\Delta x\rvert\) or \(\lvert\Delta y\rvert\) |

## 7. The textbook-precise statement
Let \(P\) be a polygon in the Euclidean plane that admits a triangulation into triangles \(T_1,\dots,T_n\) or a decomposition into parallelograms and trapeziums whose interiors are pairwise disjoint. The area of \(P\) is
\[
A(P)=\sum_i A(T_i),\qquad A(T_i)=\frac12 b_i h_i
\]
where \(b_i\) is any side of \(T_i\) and \(h_i\) is the perpendicular distance from the opposite vertex to the line containing \(b_i\). For a trapezium with parallel sides \(a,b\) and height \(h\), the area is \(\frac{a+b}{2}h\). (See: Euclid, *Elements*, Book I, Propositions 41–42; modern treatment in Lang, *Basic Mathematics*, 1971, Chapter 6.)

## 8. Visual — diagram or schematic
```text
          height h
        +-----------+
       /|           |\
      / |           | \
     /  | parallelo |  \
    /   |   -gram    |   \
   +----+-----------+----+
   base b (bottom)   top a
```
The figure shows a trapezium formed by a parallelogram with an added triangle on the left; the perpendicular height \(h\) is marked between the two parallel sides.

## 9. The memory technique
1. **The hook** — Picture a stack of identical books: sliding them sideways turns a rectangle into a parallelogram without changing the shelf space they occupy; cutting the stack diagonally yields two equal triangles.
2. **What to overlearn** — \(A_{\triangle}=\frac12bh\), \(A_{\square}=bh\), \(A_{\text{trap}}=\frac{a+b}{2}h\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive any formula by converting the figure back to a rectangle via shear or bisection and counting unit squares.

## 10. What this unlocks
Mastery of polygonal area supplies the geometric scaffolding for integration, surface integrals in vector calculus, and finite-element stress analysis.

- Definite integrals as limits of Riemann sums over trapezoidal partitions.
- Green’s theorem relating area integrals to boundary line integrals.
- Volume of prisms and pyramids obtained by extruding these areas.
- Mesh-area computations in computational geometry and graphics pipelines.

## 11. Self-check — five questions, no answers
1. A triangle has sides 5, 5 and included angle 60°. Compute its area using only the two equal sides and the angle.
2. A parallelogram and a triangle share the same base length and the same height. What is the ratio of their areas?
3. An irregular quadrilateral is divided into two triangles by one diagonal. Under what condition does the choice of the other diagonal change the computed total area?
4. A trapezium has non-parallel sides each of length 5; the parallel sides are 12 and 4. If the height is increased by 1 while the parallel sides remain fixed, by how much does the area increase?
5. A composite shape consists of a rectangle 10 by 6 with an equilateral triangle of side 6 attached to one short side. Identify the single most common numerical error that would arise when a student calculates the total area.