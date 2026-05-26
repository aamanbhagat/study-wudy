## 1. The one-sentence answer
**The 3D distance formula computes the Euclidean length of the straight-line segment joining any two points whose coordinates differ in x, y, and z.**

It arises by applying the Pythagorean theorem twice: first in one coordinate plane to obtain an intermediate length, then again with the remaining coordinate. The algebra collapses into a single square root whose radicand is the sum of three squared differences. The result is independent of order and of the coordinate origin.

The same expression measures separation in any Cartesian frame once the axes are mutually perpendicular. It therefore serves as the metric that turns ordinary three-space into a true metric space.

> [!NOTE]
> The square root is required because the differences alone give squared length; omitting it produces a quantity whose units and numerical value are both wrong for actual distance.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 guidance software repeatedly evaluates the Euclidean distance between the instantaneous vehicle position and the planned trajectory points expressed in ECEF coordinates; an error of a few metres at 50 km altitude would trigger an unnecessary abort.

In semiconductor lithography, ASML’s TwinScan machines locate alignment marks on a silicon wafer by computing 3-D distances between measured fiducials and the design database; sub-nanometre repeatability depends on the exact formula rather than on projected 2-D approximations.

Protein-structure prediction algorithms such as AlphaFold compare candidate Cα atom positions by their 3-D distances; the loss function penalises deviations from experimentally observed distances obtained by X-ray crystallography, directly influencing side-chain packing accuracy.

Aircraft collision-avoidance systems (TCAS) compute slant range—the true 3-D distance—between two transponder reports rather than horizontal separation alone; regulatory separation minima are defined in this metric.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Pythagorean theorem      | Supplies the length of a right triangle in any plane      |
| Cartesian coordinates    | Defines the three independent signed distances            |
| Square-root function     | Converts squared length back to ordinary length           |
| Algebraic expansion      | Reveals why cross terms cancel when axes are orthogonal   |

## 4. Building the idea — from intuition to formalism

### Step 1 — Two dimensions already work
In the xy-plane the straight-line distance between (x₁, y₁) and (x₂, y₂) is obtained by forming a right triangle whose legs are the differences Δx = x₂ − x₁ and Δy = y₂ − y₁.  
Example: points (0,0) and (3,4) give legs 3 and 4; hypotenuse 5.  
Formal statement:  
$$d = \sqrt{(\Delta x)^2 + (\Delta y)^2}.$$  
> [!WARNING] Reversing the sign of Δx does not change the result only because the quantity is squared; forgetting the square produces a signed “distance” that can be negative.

### Step 2 — Add a third perpendicular direction
Once a z-axis is introduced perpendicular to the xy-plane, the two points generally differ by an additional amount Δz = z₂ − z₁. This difference is the leg of a new right triangle whose other leg is the already-computed planar distance.  
Example: points (0,0,0) and (3,4,12) first give planar distance 5, then combine with 12.  
Formal intermediate length:  
$$d_{xy} = \sqrt{(\Delta x)^2 + (\Delta y)^2}.$$

### Step 3 — Apply Pythagorean theorem again
The final hypotenuse satisfies  
$$d^2 = d_{xy}^2 + (\Delta z)^2.$$  
Substituting the expression for d_xy immediately yields the three-term formula.  
> [!WARNING] Treating the three differences as legs of a single non-existent “3-D right triangle” with three mutually perpendicular edges is conceptually harmless only because the axes are orthogonal; the justification is successive planar applications, not a 3-D Pythagorean theorem with three terms.

### Step 4 — Write the compact expression
Collecting all substitutions produces the textbook distance formula.  
$$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}.$$

### Step 5 — Verify invariance properties
The expression is unchanged under permutation of the two points and under rigid translation or rotation of the coordinate frame, confirming it measures intrinsic separation.

## 5. Worked examples — every step shown

**Example 1 — Origin to a lattice point**  
*Given:* A(0,0,0), B(2,3,6).  
*Find:* Euclidean distance.  
Compute each difference:  
Δx = 2 − 0 = 2 *Why:* subtract corresponding coordinates.  
Δy = 3 − 0 = 3 *Why:* same.  
Δz = 6 − 0 = 6 *Why:* same.  
Square and sum:  
2² + 3² + 6² = 4 + 9 + 36 = 49 *Why:* each squared term removes sign.  
Take square root:  
√49 = 7 *Why:* positive root gives length.  
**7**

*Reflection:* The numbers were chosen as a 3-4-5 multiple; the arithmetic stays trivial while confirming the formula.

**Example 2 — Two arbitrary points in the first octant**  
*Given:* P(−1,4,2), Q(3,−2,5).  
*Find:* Distance.  
Δx = 3 − (−1) = 4 *Why:* order of subtraction irrelevant after squaring.  
Δy = −2 − 4 = −6  
Δz = 5 − 2 = 3  
4² + (−6)² + 3² = 16 + 36 + 9 = 61  
√61 *Why:* 61 is prime, so the radical does not simplify.  
**√61**

*Reflection:* Negative coordinates test that signs disappear correctly.

**Example 3 — Vertical line segment**  
*Given:* A(5,−3,1), B(5,−3,7).  
*Find:* Length.  
Δx = 0, Δy = 0, Δz = 6 *Why:* identical x and y leave only height.  
√(0 + 0 + 36) = 6  
**6**

*Reflection:* Shows the formula reduces gracefully to a single coordinate difference.

**Example 4 — Symmetric points about the origin**  
*Given:* M(2,−1,4), N(−2,1,−4).  
*Find:* Distance.  
Δx = −2 − 2 = −4, Δy = 1 − (−1) = 2, Δz = −4 − 4 = −8  
(−4)² + 2² + (−8)² = 16 + 4 + 64 = 84  
√84 = 2√21  
**2√21**

*Reflection:* Demonstrates factoring after summation and the irrelevance of order.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting the outer square root  | Confusing squared length with length        | Always write the radical last                |
| Using Δx + Δy + Δz inside         | Treating differences as a vector sum        | Square each term before adding               |
| Mixing coordinate order           | Subtracting in inconsistent sequence        | Consistently use (point 2 − point 1)         |
| Omitting a coordinate             | Projecting onto a coordinate plane          | Verify all three variables appear            |
| Computing in non-orthogonal axes  | Assuming formula works for oblique frames   | Confirm axes are Cartesian before use        |
| Reporting negative distance       | Taking signed difference without squaring   | Square immediately; distance is non-negative |
| Confusing with Manhattan metric   | Adding absolute values instead of squares   | Remember Euclidean metric squares first      |

## 7. The textbook-precise statement
Let P₁(x₁, y₁, z₁) and P₂(x₂, y₂, z₂) be any two points in ℝ³ equipped with the standard Euclidean inner product. The distance d(P₁, P₂) is defined by  
$$d(P_1,P_2)=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}.$$  
This expression is the unique function satisfying positivity, symmetry, the triangle inequality, and invariance under isometries of ℝ³. (See Stewart, *Calculus*, 9e, §12.1.)

## 8. Visual — diagram or schematic
```text
z
↑
|     • B(x₂,y₂,z₂)
|    /
|   /   Δz
|  /
| /_____• A(x₁,y₁,z₁) ----→ y
|        \
|         Δx
+----------→ x
```
Axes are mutually perpendicular. The three segments Δx, Δy, Δz lie along the coordinate directions; the space diagonal from A to B is the required distance.

## 9. The memory technique
1. **The hook** — Picture a city block lifted into the air: walk Δx east, Δy north, then climb Δz floors; the crow-flies distance is the single hypotenuse of that 3-D “staircase.”
2. **What to overlearn** — The exact three-term radicand and the fact that squaring removes all sign dependence.
3. **Spaced-repetition schedule** — Re-derive once after 1 day, again after 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Rebuild by applying Pythagorean theorem first in the xy-plane, then again with the resulting length and Δz.

## 10. What this unlocks
The 3-D distance formula is the metric that lets every subsequent concept in vector geometry—dot product, cross product, planes, spheres, lines, and rigid motions—be expressed quantitatively.  
- Equation of a sphere centred at an arbitrary point  
- Shortest distance from point to line or plane  
- Definition of convexity and convex hulls in ℝ³  
- Kinematics of rigid-body displacement

## 11. Self-check — five questions, no answers
1. Compute the distance between (1,−2,3) and (−4,5,0).  
2. A point moves from (0,0,0) to (a,a,a). Show that its path length is a√3 and explain why the factor √3 appears.  
3. Two points differ only in the z-coordinate. Which term survives in the formula, and why do the other two vanish?  
4. Demonstrate algebraically that swapping the labels of the two points leaves the distance unchanged.  
5. Identify the hidden assumption that would make the formula give an incorrect numerical result if the coordinate axes were not mutually perpendicular.