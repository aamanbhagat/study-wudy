## 1. The one-sentence answer
**The distance formula states that the straight-line distance between two points \((x_1, y_1)\) and \((x_2, y_2)\) equals \(\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\), obtained by completing a right triangle whose legs are the coordinate differences and invoking the Pythagorean theorem.**

Two points determine a unique segment. The horizontal leg of the auxiliary right triangle has length equal to the absolute difference of the x-coordinates; the vertical leg equals the absolute difference of the y-coordinates. These two legs meet at a right angle because the coordinate axes are perpendicular, so the hypotenuse is the desired Euclidean distance.

The square-root expression follows at once from the Pythagorean relation \(c^2 = a^2 + b^2\). Absolute values are unnecessary once the differences are squared, because \((-d)^2 = d^2\).

> [!NOTE]
> The formula works for any pair of points in the plane precisely because every pair of distinct points determines a unique right triangle whose hypotenuse is the segment joining them; the coordinate axes supply the right angle automatically.

## 2. Why this matters — concrete and current
In GPS receivers manufactured by Garmin and u-blox, the distance formula converts latitude-longitude pairs into meter-scale ranges so that trilateration can locate a receiver to within a few meters; the same calculation runs inside every smartphone’s location services stack.

Autonomous-vehicle stacks at Waymo and Cruise embed the formula inside their occupancy-grid planners: each candidate trajectory is scored by summing Euclidean distances to nearby obstacles detected by LiDAR, producing collision-free paths at 10 Hz.

In semiconductor mask-layout software from Synopsys and Cadence, the distance formula computes the minimum separation between polygon edges; design-rule checks that violate a 7 nm threshold are flagged before tape-out.

Particle-tracking detectors at CERN’s LHC store hit coordinates in silicon sensors; the distance formula identifies track seeds by measuring proximity between hits in consecutive layers, reducing combinatorial background before Kalman filtering begins.

Inside the embedding spaces of large language models, cosine similarity is algebraically equivalent to a normalized Euclidean distance; every nearest-neighbor lookup performed by retrieval-augmented generation systems therefore rests on the same two-dimensional derivation scaled to hundreds of dimensions.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Pythagorean theorem      | Supplies the algebraic relation between legs and hypotenuse of the auxiliary right triangle |
| Cartesian coordinates    | Defines the ordered pairs whose differences become the legs |
| Squaring and square roots | Converts the Pythagorean equation \(c^2 = a^2 + b^2\) into an explicit length \(c = \sqrt{a^2 + b^2}\) |

## 4. Building the idea — from intuition to formalism

### Step 1 — Two points determine a segment
Any two distinct points in the plane lie on a unique straight segment.  
Example: points \(A(1,2)\) and \(B(4,6)\).  
The segment \(AB\) is the object whose length we seek.

### Step 2 — Project onto the axes
Drop perpendiculars from each point to the x-axis and y-axis. The projections produce two directed segments whose lengths are the differences \(\Delta x = x_2 - x_1\) and \(\Delta y = y_2 - y_1\).  
Example: \(\Delta x = 4-1 = 3\), \(\Delta y = 6-2 = 4\).

### Step 3 — Form the right triangle
Connect the projections to create a third point \(C(x_2, y_1)\). Triangle \(ABC\) has a right angle at \(C\) because the coordinate axes are perpendicular.  
Formal statement: \(\angle ACB = 90^\circ\).

> [!WARNING]
> If the auxiliary point is placed at \((x_1, y_2)\) instead of \((x_2, y_1)\), the legs remain the same lengths but the visual orientation reverses; confusing the order produces identical algebra yet invites sign errors later.

### Step 4 — Identify the legs
Leg \(AC\) has length \(|\Delta x|\); leg \(BC\) has length \(|\Delta y|\).  
These lengths are the only quantities needed for the Pythagorean theorem.

### Step 5 — Apply Pythagoras
The hypotenuse \(AB\) satisfies  
\[
AB^2 = (\Delta x)^2 + (\Delta y)^2.
\]
Because squaring removes the absolute-value signs, we may write  
\[
AB^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2.
\]

### Step 6 — Solve for length
Taking the non-negative square root yields the distance:  
\[
d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}.
\]
This is the textbook distance formula.

## 5. Worked examples — every step shown

**Example 1 — Axis-aligned points**  
*Given:* \(A(0,0)\), \(B(5,0)\).  
*Find:* distance \(AB\).  

Step 1: \(\Delta x = 5-0 = 5\), \(\Delta y = 0-0 = 0\).  
*Why:* direct subtraction of coordinates.  

Step 2: \(d = \sqrt{5^2 + 0^2}\).  
*Why:* substitute into the derived formula.  

**5**  

*Reflection:* The zero leg shows that the formula collapses correctly to ordinary subtraction on an axis.

**Example 2 — Simple integer offset**  
*Given:* \(A(1,2)\), \(B(4,6)\).  
*Find:* distance.  

Step 1: \(\Delta x = 3\), \(\Delta y = 4\).  
*Why:* subtract corresponding coordinates.  

Step 2: \(d = \sqrt{3^2 + 4^2} = \sqrt{9+16} = \sqrt{25} = 5\).  
*Why:* square, add, take root.  

**5**  

*Reflection:* The classic 3-4-5 triangle appears naturally.

**Example 3 — Negative coordinates**  
*Given:* \(A(-2,1)\), \(B(3,-4)\).  
*Find:* distance.  

Step 1: \(\Delta x = 3-(-2)=5\), \(\Delta y=-4-1=-5\).  
*Why:* arithmetic includes signs.  

Step 2: \(d = \sqrt{5^2 + (-5)^2} = \sqrt{50} = 5\sqrt{2}\).  
*Why:* squares eliminate signs.  

**\(5\sqrt{2}\)**  

*Reflection:* Signs never survive the squaring step; the formula is sign-invariant.

**Example 4 — Fractional coordinates**  
*Given:* \(A(\frac12, \frac13)\), \(B(\frac32, \frac73)\).  
*Find:* distance.  

Step 1: \(\Delta x = 1\), \(\Delta y = 2\).  
*Why:* common denominators yield integers.  

Step 2: \(d = \sqrt{1^2 + 2^2} = \sqrt{5}\).  
*Why:* simplify before rooting.  

**\(\sqrt{5}\)**  

*Reflection:* Fractions disappear early; always clear denominators before squaring.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using \(\Delta x\) and \(\Delta y\) without squaring | Forgetting that Pythagoras requires squares | Write the formula with explicit squares every time |
| Swapping x- and y-differences     | Visual confusion of horizontal and vertical | Label \(\Delta x\) explicitly as “x-difference” |
| Taking \(\sqrt{\Delta x} + \sqrt{\Delta y}\) | Treating roots as linear                    | Remember the hypotenuse is not the sum of roots |
| Forgetting the outer square root  | Stopping after \(d^2\)                      | Always finish with the positive root         |
| Using signed distances in final answer | Retaining unnecessary signs                 | Note that the root is defined non-negative   |
| Applying the formula in 3-D without the z term | Over-generalizing the 2-D derivation        | Add \((z_2-z_1)^2\) when a third coordinate appears |
| Computing distance from origin only | Assuming one point must be (0,0)            | Treat both points symmetrically              |

## 7. The textbook-precise statement
Let \(P_1(x_1,y_1)\) and \(P_2(x_2,y_2)\) be any two points in the Cartesian plane. The Euclidean distance \(d(P_1,P_2)\) is given by  
\[
d(P_1,P_2)=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}.
\]
The expression is well-defined for all real coordinates and yields a non-negative real number that satisfies the metric axioms. (See Stewart, *Precalculus*, 8e, §1.1, or Sullivan, *Algebra & Trigonometry*, 11e, §2.2.)

## 8. Visual — diagram or schematic
```text
          y
          ↑
          |     B(x2,y2)
          |    /|
          |   / |
          |  /  | Δy
          | /   |
          |/____|________→ x
        A(x1,y1)   Δx
```
- Horizontal leg = |x₂ − x₁|  
- Vertical leg = |y₂ − y₁|  
- Hypotenuse = segment AB (the distance)

## 9. The memory technique

1. **The hook**  
   Picture a city block: you must walk east then north; the straight-line distance is the diagonal through the block—the hypotenuse of the coordinate differences.

2. **What to overlearn**  
   - The exact formula \(d = \sqrt{(\Delta x)^2 + (\Delta y)^2}\).  
   - The fact that squaring removes all sign considerations.  
   - The auxiliary right angle is supplied automatically by the axes.

3. **Spaced-repetition schedule**  
   Review at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

4. **First-principles fallback**  
   Re-derive by constructing the auxiliary point \(C(x_2,y_1)\), writing the two leg lengths, and invoking \(AB^2 = AC^2 + BC^2\).

## 10. What this unlocks
The distance formula is the metric foundation for every subsequent theorem in coordinate geometry.  

- Midpoint and section formulas follow by averaging coordinates weighted by the same differences.  
- Slope and the equation of a line are ratios of the same \(\Delta y\) and \(\Delta x\).  
- The circle equation \((x-h)^2 + (y-k)^2 = r^2\) is the distance formula set equal to a constant radius.  
- Perpendicular bisectors, triangle inequalities, and locus problems all rest on repeated application of the same square-root expression.

## 11. Self-check — five questions, no answers
1. Compute the distance between \((0,0)\) and \((3,4)\) without a calculator.  
2. Two points lie on the line \(y = 2x\). Show that their distance is always \(\sqrt{5}\) times the absolute difference of their x-coordinates.  
3. A point \(P\) is 5 units from \((1,2)\) and 13 units from \((4,-3)\). Write the two equations that \(P\) must satisfy.  
4. Explain why replacing \(\sqrt{(\Delta x)^2 + (\Delta y)^2}\) by \(|\Delta x| + |\Delta y|\) produces a strictly larger value except on the axes.  
5. Derive the distance formula in three dimensions by adding one more auxiliary right triangle and state the resulting expression.