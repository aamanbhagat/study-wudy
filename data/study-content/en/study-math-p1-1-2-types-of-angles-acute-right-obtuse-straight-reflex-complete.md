## 1. The one-sentence answer
**Angles are regions formed by two rays sharing a common endpoint and are classified solely by the measure of rotation between those rays, expressed in degrees.**

An angle exists the moment two rays leave a shared vertex. Its size records how far one ray has turned from the other. Because a full turn returns the ray to its starting position, every angle measure lies between 0° and 360°. Partitioning this interval at the landmarks 90°, 180°, and 360° produces six standard names that describe every possible angle without remainder or overlap.

These names are not arbitrary labels. They encode geometric behaviour: an acute angle fits inside a right angle, an obtuse angle cannot fit inside a right angle yet remains smaller than a straight line, and a reflex angle exceeds a straight line while remaining smaller than a complete turn.

> [!NOTE]
> The decisive “aha” is that classification depends only on the numerical measure; the physical size of the drawing or the length of the rays never changes the type.

## 2. Why this matters — concrete and current
In semiconductor lithography, ASML’s extreme-ultraviolet scanners align silicon wafers using sub-degree angular tolerances; a misclassified 91° angle instead of 90° produces a 3 nm overlay error that destroys an entire wafer lot.

Aircraft flight-control software at Boeing and Airbus converts control-surface deflections into right, acute, and obtuse categories to trigger distinct autopilot modes; a reflex-angle reading greater than 180° signals a stall-recovery manoeuvre.

In robotic-arm path planning at Boston Dynamics, joint angles are labelled acute or obtuse to decide whether an inverse-kinematics solver uses the elbow-up or elbow-down configuration, directly affecting collision avoidance.

Computer-vision libraries such as OpenCV classify edge angles in images; reflex angles identify concave corners of objects, enabling shape-matching algorithms used in autonomous-vehicle obstacle detection.

In crystallography, X-ray diffraction patterns at facilities such as the European Synchrotron Radiation Facility rely on precise measurement of angles between lattice planes; straight and complete angles correspond to symmetry axes that determine material properties.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Ray and vertex       | An angle is defined only when two rays share an endpoint. |
| Degree as 1/360 of a turn | All six angle types are partitions of the 360° circle.   |
| Inequality notation  | Classification uses strict comparisons such as < 90° or > 180°. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Two rays create a region
Two rays drawn from one point divide the plane into two regions; the smaller region is conventionally called the angle.  
Example: rays OA and OB with vertex O form ∠AOB.  
Formal statement:  
$$ \angle AOB = \{\text{points on rays } \overrightarrow{OA} \text{ and } \overrightarrow{OB}\} \cup \text{interior region}. $$  
> [!WARNING] Treating the larger region as the angle without explicit statement leads to inconsistent reflex-angle identification later.

### Step 2 — Measure by fraction of a circle
The measure is the fraction of a full circle swept by one ray to reach the other, scaled so a full circle equals 360°.  
Example: a quarter-turn sweep yields 90°.  
Formal statement:  
$$ m(\angle AOB) = \frac{\theta}{360^\circ} \times 360^\circ = \theta, $$  
where θ is the central angle in degrees.

### Step 3 — Introduce the right angle benchmark
A right angle is defined as exactly one-quarter turn.  
Formal statement:  
$$ m(\angle) = 90^\circ. $$  
> [!WARNING] Confusing “right” with “straight” produces immediate classification errors at 180°.

### Step 4 — Partition the half-plane
Angles between 0° and 90° lie inside a right angle; angles between 90° and 180° lie outside a right angle yet inside a straight angle.  
Formal statements:  
$$ 0^\circ < m(\angle) < 90^\circ \quad (\text{acute}), $$  
$$ 90^\circ < m(\angle) < 180^\circ \quad (\text{obtuse}). $$

### Step 5 — Cross the straight angle
A straight angle occupies exactly half a circle.  
Formal statement:  
$$ m(\angle) = 180^\circ. $$  
Angles larger than 180° but smaller than 360° are reflex.

### Step 6 — Close the circle
A complete angle is a full turn.  
Formal statement:  
$$ m(\angle) = 360^\circ. $$

### Step 7 — Exhaustive classification
Every angle measure m satisfies exactly one of:  
$$ 0^\circ < m < 90^\circ,\quad m=90^\circ,\quad 90^\circ < m < 180^\circ,\quad m=180^\circ,\quad 180^\circ < m < 360^\circ,\quad m=360^\circ. $$

## 5. Worked examples — every step shown

**Example 1 — Identify a 47° angle**  
*Given:* Two rays form an angle whose measure is 47°.  
*Find:* Its type.  
Step 1: Compare with 90°.  
*Why:* Acute angles are defined by the strict inequality m < 90°.  
Step 2: 47° satisfies 0° < 47° < 90°.  
*Why:* The definition matches exactly.  
**47° angle → acute**  

*Reflection:* The comparison is direct; no boundary cases arise.

**Example 2 — Identify a 90° angle**  
*Given:* Rays perpendicular by construction.  
*Find:* Type.  
Step 1: Measure equals 90°.  
*Why:* The right-angle definition is equality, not inequality.  
Step 2: No other interval contains exactly 90°.  
*Why:* The partitions are disjoint.  
**90° angle → right**  

*Reflection:* Equality must be checked before inequalities.

**Example 3 — Identify a 142° angle**  
*Given:* Interior angle of a quadrilateral vertex measures 142°.  
*Find:* Type.  
Step 1: 90° < 142° < 180°.  
*Why:* This places the angle strictly between right and straight.  
Step 2: Therefore obtuse by definition.  
*Why:* The obtuse interval is the only remaining slot below 180°.  
**142° angle → obtuse**  

*Reflection:* Crossing 90° changes category even though the angle still “looks sharp” in a drawing.

**Example 4 — Identify a 275° angle**  
*Given:* A robot arm rotates past the straight position to 275°.  
*Find:* Type.  
Step 1: 180° < 275° < 360°.  
*Why:* Reflex angles occupy the open interval above straight and below complete.  
Step 2: 275° ≠ 360°.  
*Why:* Equality would make it complete, not reflex.  
**275° angle → reflex**  

*Reflection:* The reflex label appears only after confirming the measure exceeds 180°; students often stop at 180°.

## 6. Common traps and how to avoid them

| Trap                          | Why it happens                              | How to avoid it                              |
|-------------------------------|---------------------------------------------|----------------------------------------------|
| Calling 180° “obtuse”         | Over-generalising “larger than right”       | Memorise the exact boundary 180° = straight. |
| Treating 360° as reflex       | Forgetting the upper limit of reflex        | Always test m < 360° before reflex label.    |
| Ignoring that 90° is not acute| Treating “acute” as “small” rather than strict inequality | Check equality separately first.             |
| Measuring the exterior instead of interior | Ambiguous diagram shading                   | Explicitly select the region named by the vertex and two points. |
| Confusing straight with complete | Both appear “flat” in crude sketches        | Count quarter-turns: two = straight, four = complete. |
| Assuming negative angles      | Direction reversal in diagrams              | Reduce modulo 360° and reclassify the positive remainder. |
| Using radians without conversion | Mixing degree-based names with radian numbers | Convert to degrees before naming.            |

## 7. The textbook-precise statement
An angle is the union of two rays with common origin together with the convex region they bound. Its measure m is the length of the intercepted arc on the unit circle centred at the vertex, expressed in degrees so that a full circle has measure 360°. The six types are then defined by the following exhaustive partition (Euclid, *Elements*, Book I, Definition 10, supplemented by modern degree measure):

- acute if \(0^\circ < m < 90^\circ\),
- right if \(m = 90^\circ\),
- obtuse if \(90^\circ < m < 180^\circ\),
- straight if \(m = 180^\circ\),
- reflex if \(180^\circ < m < 360^\circ\),
- complete if \(m = 360^\circ\).

Reference: Euclid, *Elements*, Book I (c. 300 BCE); modern degree formulation appears in Stewart, *Calculus*, 9e, §1.1.

## 8. Visual — diagram or schematic
```text
          B
         /
        /  acute (47°)
       /
      O----------A   (straight 180° continues beyond A)
       \
        \  obtuse (142°)
         \
          C

D (reflex 275° continues past straight line through the long way around back to O)
```
Label each region with its degree measure and type. The circle centred at O with radius OA makes the 360° reference explicit.

## 9. The memory technique

1. **The hook**  
   Picture a clock face: 3 o’clock is right, 6 o’clock is straight, 9 o’clock begins the reflex zone, and 12 o’clock closes the complete circle.

2. **What to overlearn**  
   - 90° = right (exact)  
   - 180° = straight (exact)  
   - 360° = complete (exact)  
   The three open intervals fill the remaining names.

3. **Spaced-repetition schedule**  
   Review at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback**  
   Re-derive by dividing a circle into four 90° quadrants; any angle is located by counting how many quadrants it crosses and whether it lands exactly on a boundary.

## 10. What this unlocks
Mastery of angle classification supplies the vocabulary required for triangle-angle sum proofs, polygon interior-angle formulas, trigonometric function domains, and rotation matrices in linear algebra.

- Triangle inequality and angle-sum theorem  
- Regular-polygon exterior-angle formula  
- Unit-circle definitions of sine and cosine  
- Rotation matrices in \(\mathbb{R}^2\) and \(\mathbb{R}^3\)  
- Directed-angle conventions in complex-number multiplication

## 11. Self-check — five questions, no answers
1. An angle formed by two perpendicular lines measures exactly 90°. Which single word names it?  
2. A turn of 215° is performed by a robotic joint. Name the angle type and justify with the relevant inequality.  
3. Why is 180° never called obtuse?  
4. Convert 3π/2 radians to degrees and classify the resulting angle.  
5. A diagram shows two rays that together sweep three full quadrants plus an extra 15°. What type is the angle, and what would change if the measure were increased by another 30°?