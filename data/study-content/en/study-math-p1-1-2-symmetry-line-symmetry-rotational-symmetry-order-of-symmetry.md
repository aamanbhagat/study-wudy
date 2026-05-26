## 1. The one-sentence answer
**Symmetry in the plane consists of isometries—rigid motions—that map a figure onto itself, specifically reflections across lines (line symmetry) and rotations about a point (rotational symmetry), with the order of rotational symmetry defined as the number of distinct positions obtained by repeated minimal rotation through 360°.**

A figure possesses line symmetry when there exists a line such that reflection across that line leaves every point of the figure in a position that coincides with another point of the figure. This produces a mirror image that is indistinguishable from the original. Rotational symmetry exists when there is a fixed point (the center) and an angle θ < 360° such that rotation by any integer multiple of θ maps the figure onto itself. The order counts how many such distinct rotations fit inside a full turn.

These two notions are independent yet compatible: a square has four lines of symmetry and rotational symmetry of order 4. The definitions rest only on the preservation of distances and the geometry of the Euclidean plane; no coordinates or algebra are required at the outset.

> [!NOTE]
> The single deepest insight is that symmetry is not decoration but invariance: the figure is unchanged under a non-trivial transformation, which immediately constrains its possible shapes and measurements.

## 2. Why this matters — concrete and current
In semiconductor manufacturing, Intel and TSMC rely on the rotational symmetry of silicon crystal lattices (order 4 for the {100} face) to align photolithography masks; any misalignment produces defective transistors at the 3 nm node.

In aerospace, SpaceX Falcon 9 booster fins are designed with bilateral line symmetry so that aerodynamic loads remain balanced during atmospheric re-entry; the symmetry reduces the control authority needed from the grid fins.

In structural biology, the icosahedral rotational symmetry (order 60) of adenoviruses is exploited by Moderna and Pfizer when engineering virus-like particles for vaccines; the symmetry multiplies the number of identical protein subunits that can self-assemble from a single genetic sequence.

In machine-vision pipelines at Google and Meta, training sets for object detection are augmented by applying the dihedral group of line and rotational symmetries to each image; this reduces the sample complexity of convolutional networks by roughly a factor equal to the order of the symmetry group.

In condensed-matter physics, the 2023 paper on twisted bilayer graphene (Nature 620, 525) shows that the moiré pattern’s rotational symmetry of order 6 produces flat bands whose topology is protected by that symmetry.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Distance-preserving transformations (isometries) | Symmetry is defined by mappings that leave distances unchanged |
| Angle measure in degrees | Order of rotation is counted inside a 360° circle         |
| Regular polygons     | They furnish the simplest non-trivial examples            |
| Center and axis      | Every symmetry transformation is specified by a fixed point or line |

## 4. Building the idea — from intuition to formalism

### Step 1 — Mirror balance
A shape feels “balanced” when one half can be flipped onto the other.  
Example: an isosceles triangle flipped across its altitude coincides with itself.  
Formally, a line \(\ell\) is a line of symmetry of set \(S\) if reflection \(\sigma_\ell\) satisfies \(\sigma_\ell(S) = S\).  
> [!WARNING]
> Do not confuse the mirror line with a median or altitude; only the reflection test matters.

### Step 2 — Turning in place
A shape can also look identical after being spun around a point without flipping.  
Example: an equilateral triangle rotated 120° around its centroid lands on itself.  
Formally, a point \(O\) is a center of rotational symmetry if there exists \(\theta\), \(0^\circ < \theta < 360^\circ\), such that rotation \(\rho_{O,\theta}\) satisfies \(\rho_{O,\theta}(S) = S\).

### Step 3 — Minimal angle
Among all possible rotation angles that work, there is a smallest positive one, called the fundamental angle \(\theta_0\).  
Example: for the equilateral triangle, \(\theta_0 = 120^\circ\).

### Step 4 — Counting distinct positions
The order \(n\) is the largest integer such that \(n\theta_0 = 360^\circ\).  
Thus \(n = 360^\circ / \theta_0\).  
For the square, \(\theta_0 = 90^\circ\), so \(n=4\).

### Step 5 — Textbook definition
A figure \(S\) has rotational symmetry of order \(n\) about \(O\) when the smallest positive angle satisfying \(\rho_{O,\theta}(S)=S\) is exactly \(360^\circ/n\).

## 5. Worked examples — every step shown

**Example 1 — Square**  
*Given:* square \(ABCD\) with side length 2, center \(O\).  
*Find:* lines of symmetry and rotational order.  
Reflection across the two diagonals and across the two midlines maps the square to itself.  
Rotation by \(90^\circ\) about \(O\) maps \(A\to B\), \(B\to C\), etc.  
Four distinct positions appear before repetition.  
**Order 4, four lines of symmetry.**  
*Reflection:* the example is simple because every symmetry of the square is obvious; the same counting works for any regular \(n\)-gon.

**Example 2 — Rectangle (non-square)**  
*Given:* rectangle 3 by 2.  
*Find:* symmetries.  
Only two lines (the lines through midpoints of opposite sides) work.  
Rotation by \(180^\circ\) works; \(90^\circ\) does not.  
**Order 2, two lines of symmetry.**

**Example 3 — Equilateral triangle**  
*Given:* equilateral triangle side 1.  
*Find:* order and lines.  
Three altitudes serve as reflection lines.  
Fundamental rotation \(120^\circ\).  
**Order 3, three lines.**

**Example 4 — Parallelogram that is not a rectangle or rhombus**  
*Given:* parallelogram with angles \(70^\circ,110^\circ\).  
*Find:* symmetries.  
No reflection line exists.  
Only the \(180^\circ\) rotation about the intersection of diagonals survives.  
**Order 2, zero lines of symmetry.**  
*Reflection:* the absence of line symmetry is the trap; students often assume every parallelogram has mirrors.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Counting a 360° rotation as order 1 | Forgetting that the identity is trivial     | Always exclude the 0°/360° case              |
| Calling every median a symmetry line | Confusing geometric construction with invariance | Test by actual reflection                    |
| Assuming order equals number of sides | Over-generalizing from regular polygons     | Compute \(360^\circ/\theta_0\) directly      |
| Missing 180° symmetry in “odd” shapes | Expecting only high-order symmetry          | Check 180° rotation explicitly               |
| Confusing rotational center with centroid | Using mass-center instead of fixed-point test | Verify that every vertex maps to another vertex |
| Thinking a circle has infinite order | Correct intuition, but imprecise language   | State “order is infinite” or “continuous”    |
| Forgetting that reflection reverses orientation | Treating mirror images as rotations         | Keep orientation-reversing vs preserving distinction |

## 7. The textbook-precise statement
A subset \(S \subset \mathbb{R}^2\) is said to be symmetric with respect to a line \(\ell\) if \(\sigma_\ell(S)=S\), where \(\sigma_\ell\) denotes reflection across \(\ell\). \(S\) possesses rotational symmetry of order \(n \geq 2\) about a point \(O\) if the smallest positive angle \(\theta\) such that the rotation \(\rho_{O,\theta}\) satisfies \(\rho_{O,\theta}(S)=S\) is exactly \(\theta=360^\circ/n\). (See: Brannan, Esplen, Gray, *Geometry*, 2e, §3.2.)

## 8. Visual — diagram or schematic
```text
          D
         /|\
        / | \
       /  |  \
      A---O---C     square ABCD
       \  |  /
        \ | /
         \|/
          B
Lines: AC (vertical), BD (horizontal), diagonals AD, BC
Rotations: 90°, 180°, 270° about O
```
All four lines and three non-trivial rotations map the square onto itself.

## 9. The memory technique
**The hook:** picture a clock face whose hands return to the same position after exactly \(n\) equal jumps; the number of jumps is the order.

**What to overlearn:**  
- Order \(n\) means minimal angle \(360^\circ/n\).  
- Regular \(n\)-gon has order \(n\) and \(n\) reflection lines.  
- Parallelograms (non-rhombus, non-rectangle) have order 2 and zero lines.

**Spaced-repetition schedule:** 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback:** start from the definition of isometry, fix a point or line, test whether repeated application returns every vertex to a vertex of the figure, then count the distinct positions inside 360°.

## 10. What this unlocks
Line and rotational symmetry are the first concrete realizations of group actions and invariance. They open directly onto:

- dihedral groups \(D_n\) and cyclic groups \(C_n\) in abstract algebra;
- frieze and wallpaper groups in tessellation theory;
- symmetry-protected topological phases in physics;
- equivariant neural networks in machine learning;
- molecular point-group classification in chemistry.

## 11. Self-check — five questions, no answers
1. A regular octagon is rotated by 15°. Does the image coincide with the original? Explain using order.

2. Draw a capital letter “H”. State its lines of symmetry and rotational order.

3. An isosceles trapezoid has exactly one pair of parallel sides. How many lines of symmetry can it possess?

4. Prove that if a figure has two distinct lines of symmetry intersecting at angle \(\alpha\), then it must also have rotational symmetry of order at least \(180^\circ/\alpha\).

5. A shape has rotational symmetry of order 5 but no line symmetry. Sketch one possible outline and justify why no reflection line exists.