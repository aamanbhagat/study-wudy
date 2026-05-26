## 1. The one-sentence answer
**Angles are measured in degrees using a protractor, and two angles are complementary when they add to exactly 90° or supplementary when they add to exactly 180°.**

A protractor is a half-circle tool marked from 0° to 180°. You align its centre with the vertex of the angle and read the scale where the ray crosses it. Complementary and supplementary pairs simply describe how two angles fit together to make a right angle or a straight line. These relationships follow directly from the definition of a straight angle as 180° and a right angle as 90°.

The key insight is that you never need to memorise separate formulas; once you can read an angle correctly on the protractor, the complementary or supplementary partner is found by simple subtraction from 90° or 180°.

> [!NOTE]
> The single “aha” moment is realising that complementary and supplementary are not new angle types—they are just statements about the sum of two existing angles.

## 2. Why this matters — concrete and current
In semiconductor lithography, ASML’s EUV machines align masks using precise angle measurements of reflected beams; a 0.01° error in supplementary angles can shift an entire circuit layer by several nanometres.  

Aerospace firms such as ISRO use complementary-angle relationships when calibrating star trackers on satellites; the angle between the optical axis and the local horizon must remain exactly 90° minus the measured elevation.  

In robotics, Boston Dynamics’ Spot robot calculates leg-joint angles so that adjacent servo motors stay supplementary during a straight-leg stance, ensuring the centre of mass stays balanced without extra torque calculations.  

Computer-vision libraries such as OpenCV rely on supplementary-angle checks when detecting vanishing points in road images for autonomous vehicles; two lines are declared parallel only when their measured angles sum to 180° within a tolerance.  

Fundamental physics experiments at CERN measure particle-track angles; complementary pairs appear when a track reflects off a detector plane at 90° to the incident direction.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Point, ray, line segment | Defines the vertex and the two sides of any angle         |
| Straight angle = 180° | Supplies the reference for supplementary angles           |
| Right angle = 90°     | Supplies the reference for complementary angles           |
| Degree symbol °       | Standard unit on every protractor scale                   |

If any of these four ideas are unclear, pause and review the earlier lesson on points, lines and rays before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Reading a protractor scale
Place the protractor’s centre hole exactly on the angle’s vertex and align the base line with one ray. The second ray crosses one of the two degree scales; choose the scale that starts from 0° on the aligned ray.  
Example: an angle whose second ray crosses the 47° mark is 47° wide.  
Formal statement: the measure \( m\angle AOB = \theta \) where \(\theta\) is the smallest non-negative reading on the protractor scale between rays \(\overrightarrow{OA}\) and \(\overrightarrow{OB}\).  
> [!WARNING]  
> If the vertex is placed even 1 mm off the centre hole, the reading can be off by several degrees; always double-check the centre alignment first.

### Step 2 — Distinguishing the inner and outer scales
Most protractors have two scales running in opposite directions. After aligning the base line with one ray, read only the scale that begins at 0° on that ray.  
Example: the same physical angle may show 47° on one scale and 133° on the other; the correct measure is the one whose 0° mark coincides with the chosen ray.  
Formal statement: select the scale \( S \) such that the reading at the first ray is 0 on \( S \).  
> [!WARNING]  
> Choosing the wrong scale is the most common source of supplementary-angle mistakes later.

### Step 3 — Defining complementary angles
Two angles are complementary when their measures sum to exactly 90°.  
Example: 35° and 55° are complementary because \( 35 + 55 = 90 \).  
Formal statement: angles \(\alpha\) and \(\beta\) satisfy \( m\alpha + m\beta = 90^\circ \).  
> [!WARNING]  
> The angles need not share a vertex; the definition is purely about their numerical measures.

### Step 4 — Defining supplementary angles
Two angles are supplementary when their measures sum to exactly 180°.  
Example: 72° and 108° are supplementary because \( 72 + 108 = 180 \).  
Formal statement: angles \(\alpha\) and \(\beta\) satisfy \( m\alpha + m\beta = 180^\circ \).  
> [!WARNING]  
> Adjacent angles on a straight line are always supplementary, but the converse is not automatically true unless they are also adjacent.

### Step 5 — Finding the partner angle by subtraction
Given one angle \(\theta\), its complementary partner is \( 90^\circ - \theta \) and its supplementary partner is \( 180^\circ - \theta \).  
Formal statement: if \( m\alpha = \theta \), then the complement is \( 90^\circ - \theta \) and the supplement is \( 180^\circ - \theta \), provided both results are positive.  
> [!WARNING]  
> Negative results indicate the original angle already exceeds the target sum; re-check the protractor reading.

## 5. Worked examples — har step show karo

**Example 1 — Measuring a simple angle**  
*Given:* Two rays sharing vertex O; one ray lies along the protractor base line, the other crosses the inner scale at the mark labelled 64.  
*Find:* Measure of the angle.  
Step 1: Centre hole is on O → reading valid.  
Step 2: Inner scale starts at 0 on the base ray → read 64.  
*Why:* We confirmed both alignment conditions before accepting the number.  
**64°**

*Reflection:* The example is straightforward, yet it trains the habit of checking centre and scale direction before recording any value.

**Example 2 — Complementary pair from a diagram**  
*Given:* \(\angle A = 38^\circ\), \(\angle B\) drawn adjacent so they form a right angle.  
*Find:* Measure of \(\angle B\).  
\( m\angle B = 90^\circ - 38^\circ = 52^\circ \).  
*Why:* Complementary definition directly supplies the subtraction.  
**52°**

*Reflection:* Subtraction replaces any need to re-measure; the relationship itself gives the answer.

**Example 3 — Supplementary angles on a straight line**  
*Given:* A straight line with a ray rising from a point on it, forming a 115° angle with one side.  
*Find:* The angle on the other side of the ray.  
\( m\angle = 180^\circ - 115^\circ = 65^\circ \).  
*Why:* The straight angle is 180° by definition, so the two adjacent angles must be supplementary.  
**65°**

*Reflection:* This is the geometric origin of the supplementary relation; the protractor merely confirms it.

**Example 4 — Mixed problem with protractor and relationship**  
*Given:* Protractor reading shows 27°; the angle is part of a straight line that also contains an unknown angle.  
*Find:* The unknown angle and state whether the pair is complementary or supplementary.  
Unknown = \( 180^\circ - 27^\circ = 153^\circ \).  
The pair sums to 180°, hence supplementary.  
*Why:* First apply the protractor result, then choose the correct reference (180°) from the straight-line context.  
**153°, supplementary**

*Reflection:* Real problems combine measurement with relationship; always identify the larger geometric figure (right angle or straight line) before subtracting.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Reading the wrong scale           | Two scales run opposite directions          | Always verify the 0° mark lies on the chosen ray     |
| Forgetting to centre the protractor | Vertex placement feels “close enough”     | Physically place a pencil tip in the centre hole     |
| Assuming adjacent angles are complementary | Confusing 90° with 180°               | Ask “Do they form a right angle or a straight line?” |
| Negative result after subtraction | Original angle already > 90° or 180°        | Re-measure; the angle cannot exceed the reference    |
| Treating vertical angles as supplementary | Misreading intersecting-line diagram     | Label all four angles formed by two intersecting lines |
| Using radians instead of degrees  | Calculator in wrong mode                    | Check that protractor and answer both use ° symbol   |
| Adding instead of subtracting     | Habit from other arithmetic problems        | Write the equation \( x + \theta = 90^\circ \) first |

## 7. The textbook-precise statement
Two angles are complementary if the sum of their measures is \(90^\circ\); they are supplementary if the sum of their measures is \(180^\circ\). The measure of an angle is the smallest non-negative real number \(\theta\) such that a protractor, centred at the vertex and aligned with one side, reads \(\theta\) on the scale that begins at zero on that side (Moise, Elementary Geometry from an Advanced Standpoint, 3e, §1.3).

## 8. Visual — diagram or schematic
```
          180°
   ------------------- straight line
          /|
         / | 65°
        /  |
       /   | 115°
      O----+  (vertex at O, protractor centre)
```
The upper angle 65° and lower angle 115° lie on the straight line and therefore sum to 180°.

## 9. The memory technique
1. **The hook** — Picture a book opening to a perfect right angle (90°); any two pages that close that gap are “completing” the right angle, hence complementary. A straight ruler (180°) needs two angles that “complete” the ruler, hence supplementary.  
2. **What to overlearn** — \(90^\circ\) for complementary, \(180^\circ\) for supplementary; subtraction from these two constants.  
3. **Spaced-repetition schedule** — Review the two definitions after 1 day, again after 3 days, 7 days, 16 days and 35 days.  
4. **First-principles fallback** — If the numbers are forgotten, redraw the right angle or straight line, place the known angle inside it, and the remaining space is the partner.

## 10. What this unlocks
Mastery of angle measurement and these two relationships lets you move directly into parallel-line theorems, triangle angle sums, and circle theorems without pausing to re-derive basic facts.  

- Alternate-interior angles and corresponding angles on parallel lines  
- Sum of angles in any triangle equals 180°  
- Inscribed-angle theorem in circles  
- Trigonometric definitions of sine and cosine in right triangles  

## 11. Self-check — five questions, no answers
1. Using a protractor, measure an angle whose second ray crosses the outer scale at 119 while the base ray is aligned with 0 on the inner scale; which reading is correct and why?  
2. Two angles measure 41° and 49°; are they complementary, supplementary, or neither? Show the arithmetic.  
3. An angle on a straight line reads 3° on the protractor; what is its adjacent angle?  
4. A diagram shows two angles that share a vertex and together form a right angle; one is labelled \(x + 10^\circ\). Write an equation and solve for \(x\).  
5. A student measures an angle as 92° and then claims its complement is \( -2^\circ \). Identify the mistake and state the correct relationship the student should have used.