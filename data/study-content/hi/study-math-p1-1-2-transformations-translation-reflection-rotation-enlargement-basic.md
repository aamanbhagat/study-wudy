## 1. The one-sentence answer
**Transformations in basic geometry are precise rules that map every point of a figure to a new position while preserving key properties such as distance or angle measures.**

Translation slides a shape without rotating or resizing it. Reflection flips a shape over a mirror line so that each point lands at an equal distance on the opposite side. Rotation turns a shape around a fixed centre by a given angle. Enlargement scales a shape from a centre by a positive scale factor, changing its size but keeping angles and proportions intact. These four operations together let you reposition, flip, turn or resize any plane figure using only coordinates or vectors.

The core insight is that each transformation is completely determined by a small set of parameters (vector, line, centre-plus-angle, or centre-plus-factor) and can be applied to every point independently.

> [!NOTE]
> Once you internalise that every point moves according to the same rule, the entire topic reduces to applying one consistent mapping; all later proofs and applications rest on this single fact.

## 2. Why this matters — concrete and current
In satellite imagery processing at ISRO and NASA, translation and rotation align successive orbital passes so that ground features occupy identical pixel coordinates before change-detection algorithms run.  

In semiconductor mask design at TSMC and Intel, reflection and rotation generate the four orientations of a standard cell library, ensuring that every transistor layout satisfies design-rule symmetry without redrawing each variant.  

In robotics motion planning at Boston Dynamics, rotation matrices update the orientation of each limb joint while translation vectors update the base position; the combined rigid-body transformation keeps the robot’s centre of mass inside the support polygon at every timestep.  

In deep-learning data augmentation pipelines used by Meta and Google, random enlargement combined with reflection increases training-set diversity for image-classification models, measurably raising accuracy on ImageNet without collecting new photographs.  

In crystallography, rotation and reflection symmetries classify the 230 space groups; the same transformations appear in the International Tables for Crystallography when determining atomic coordinates inside a unit cell.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Cartesian coordinates | Every transformation is defined by how it changes (x, y) pairs |
| Distance formula     | Translation and rotation preserve distances; enlargement scales them by a constant factor |
| Basic angle measure  | Rotation is completely specified by an angle; reflection reverses orientation |
| Vectors              | Translation is addition of a fixed vector to every point  |

If any row above feels unfamiliar, pause and review that single concept before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Translation as vector addition
A translation simply adds the same vector to every point of the figure.  
Example: moving the point (2, 3) by the vector (4, −1) lands it at (6, 2).  
Formally, the image of point P under translation by vector \(\vec{v}\) is  
\[P' = P + \vec{v}.\]  
> [!WARNING]  
> If you add different vectors to different points you have left the definition of translation; the figure will distort.

### Step 2 — Reflection across a mirror line
Reflection sends each point to its mirror image across a fixed line L. The line L is the perpendicular bisector of every segment joining a point to its image.  
Example: reflecting (3, 1) over the x-axis yields (3, −1).  
Formally, if L is the line ax + by + c = 0, the reflection formula is  
\[P' = P - 2\frac{a x_p + b y_p + c}{a^2 + b^2}(a, b).\]  
> [!WARNING]  
> Forgetting the factor of 2 produces a point that lies on L rather than its mirror image.

### Step 3 — Rotation about a centre
Rotation turns every point around a fixed centre C by a fixed angle θ (counter-clockwise positive).  
Example: rotating (1, 0) about the origin by 90° gives (0, 1).  
The matrix form is  
\[P' = C + R_\theta(P - C),\qquad R_\theta = \begin{pmatrix}\cos\theta & -\sin\theta\\\sin\theta & \cos\theta\end{pmatrix}.\]  
> [!WARNING]  
> Using clockwise angles without a negative sign reverses the intended direction.

### Step 4 — Enlargement from a centre
Enlargement multiplies every vector from a centre C by a positive scale factor k.  
Example: enlarging (2, 4) from the origin by k = 3 produces (6, 12).  
Algebraically,  
\[P' = C + k(P - C).\]  
> [!WARNING]  
> k < 0 is not basic enlargement; it introduces an extra reflection.

### Step 5 — Composition of transformations
Applying two transformations in succession yields another transformation of the same family or a new one (for example, two reflections produce a rotation). The order matters: reflection followed by translation is generally not the same as translation followed by reflection.  
Formal statement: if T and S are isometries, then T ∘ S is also an isometry whose matrix (when it exists) is the product of the individual matrices.

### Step 6 — Invariants and classification
Translation, rotation and reflection preserve distances and angles (they are isometries). Enlargement preserves angles and ratios of distances but scales absolute lengths by k. These invariants let us decide which transformation has been applied simply by measuring lengths and angles before and after.

## 5. Worked examples — har step show karo

**Example 1 — Simple translation**  
*Given:* Point A(1, 2) and vector \(\vec{v} = (3, 4)\).  
*Find:* Image of A after translation.  
Step 1: Add x-coordinates → 1 + 3 = 4.  
Step 2: Add y-coordinates → 2 + 4 = 6.  
*Why:* Translation is defined as vector addition applied uniformly.  
**Final answer**  
**(4, 6)**

*Reflection:* The arithmetic is trivial, yet the same rule scales unchanged to polygons and entire diagrams.

**Example 2 — Reflection over y-axis**  
*Given:* Triangle with vertices (2, 1), (4, 1), (3, 3).  
*Find:* Image after reflection in the y-axis.  
Step 1: Replace each x with −x while keeping y unchanged.  
(2, 1) → (−2, 1), (4, 1) → (−4, 1), (3, 3) → (−3, 3).  
*Why:* The y-axis is the line x = 0; the reflection formula reduces to (x, y) → (−x, y).  
**Final answer**  
**Vertices (−2, 1), (−4, 1), (−3, 3)**

*Reflection:* Students often flip only one coordinate; checking that every point is the same distance on the opposite side catches the error.

**Example 3 — Rotation about origin**  
*Given:* Point (√3, 1) rotated 30° anticlockwise about (0, 0).  
*Find:* Image coordinates.  
Step 1: cos 30° = √3/2, sin 30° = 1/2.  
Step 2: New x = √3·(√3/2) − 1·(1/2) = 3/2 − 1/2 = 1.  
Step 3: New y = √3·(1/2) + 1·(√3/2) = √3/2 + √3/2 = √3.  
*Why:* The rotation matrix multiplies the column vector exactly once.  
**Final answer**  
**(1, √3)**

*Reflection:* Angle sign and centre choice are the two most frequent sources of sign errors.

**Example 4 — Enlargement from an external centre**  
*Given:* Point B(4, 6) enlarged from centre C(1, 2) by scale factor 2.  
*Find:* Image B′.  
Step 1: Vector CB = (4−1, 6−2) = (3, 4).  
Step 2: Multiply by 2 → (6, 8).  
Step 3: Add back to C → (1+6, 2+8) = (7, 10).  
*Why:* Enlargement is a homothety: every vector from the centre is scaled uniformly.  
**Final answer**  
**(7, 10)**

*Reflection:* When the centre lies outside the figure, the image may appear on the opposite side; the vector method prevents confusion.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Adding different vectors to different vertices | Treating translation as independent moves   | Always add the same vector to every coordinate pair  |
| Reflecting only the x-coordinate when mirror is y = x | Confusing axis choice                       | Write the mirror line equation first, then apply the perpendicular-bisector test |
| Using clockwise angles without a minus sign | Memorising matrix without sign convention   | Adopt the consistent convention “positive = anticlockwise” and insert the minus explicitly |
| Forgetting to subtract the centre before rotation | Applying matrix at origin instead of arbitrary centre | Always translate centre to origin, rotate, translate back |
| Using negative scale factor in enlargement | Mixing enlargement with reflection          | Restrict k > 0 until orientation-reversing maps are introduced |
| Reversing order of composition    | Assuming transformations commute            | Compute both orders on a single test point and compare |
| Measuring distance after enlargement without multiplying by k | Forgetting that lengths scale               | Multiply every length measurement by the stated scale factor before comparing |

## 7. The textbook-precise statement
A translation by vector \(\vec{v}\) is the map \(T_{\vec{v}}: \mathbb{R}^2 \to \mathbb{R}^2\) defined by \(T_{\vec{v}}(x) = x + \vec{v}\).  
A reflection in line \(L\) is the unique isometry that fixes every point of \(L\) and sends each point not on \(L\) to the point \(P'\) such that the foot of the perpendicular from \(P\) to \(L\) is the midpoint of \(PP'\).  
A rotation about centre \(C\) by angle \(\theta\) is the isometry \(R_{C,\theta}\) whose matrix representation in coordinates centred at \(C\) is the orthogonal matrix with determinant +1 given above.  
An enlargement (homothety) of centre \(C\) and factor \(k > 0\) is the similarity \(H_{C,k}(x) = C + k(x - C)\).  
All four maps are affine; their composition is again affine. (See: Brannan, Esplen & Gray, *Geometry*, 2e, §2.2–2.4.)

## 8. Visual — diagram or schematic
```
y
↑
|     B'(7,10)   ← enlargement k=2 from C
|        •
|               • B(4,6)
|     C(1,2) •
|           • A(1,2) --translation--> A'(4,6)
|     reflection over y-axis: (2,1) ↔ (-2,1)
|     rotation 90° about origin: (1,0) → (0,1)
+--------------------------------→ x
```

## 9. The memory technique
1. **The hook** — Picture a transparent sheet on a coordinate grid: slide it (translation), flip it over a ruler (reflection), spin it around a drawing-pin (rotation), or stretch it from the pin (enlargement).  
2. **What to overlearn** — Translation: \(P' = P + \vec{v}\); Rotation matrix for 90° and 180°; Enlargement formula with external centre.  
3. **Spaced-repetition schedule** — Review the four definitions after 1 day, 3 days, 7 days, 16 days and 35 days; each time apply them to a fresh point.  
4. **First-principles fallback** — Return to the geometric definition: “every point moves the same way relative to the fixed element (vector, line, centre, or centre-plus-factor).”

## 10. What this unlocks
These four maps generate the larger groups of isometries and similarities that appear in congruence proofs, tessellations and symmetry classification.  

- Rigid motions (translation + rotation + reflection) preserve distance and are the foundation of triangle congruence criteria.  
- Similarity transformations (adding enlargement) underpin the AA similarity theorem and scale drawings.  
- Matrix representations prepare the ground for linear transformations in linear algebra and computer-graphics pipelines.

## 11. Self-check — five questions, no answers
1. Translate the square with vertices (0,0), (1,0), (1,1), (0,1) by (−2, 3). List the new vertices.  
2. Reflect the point (5, −3) first in the line y = 0 and then in the line x = 0. What single transformation replaces the two reflections?  
3. Rotate the vector (2, 0) 135° anticlockwise about the origin; give the exact coordinates.  
4. A triangle is enlarged from centre (0,0) by factor ½. One side of length 8 becomes what length?  
5. A student claims that reflecting a figure over the x-axis and then translating it by (0, 2) is the same as translating first and then reflecting. Construct a counter-example using a single point and show the images differ.