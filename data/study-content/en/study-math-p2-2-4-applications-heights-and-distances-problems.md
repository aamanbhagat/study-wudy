## 1. The one-sentence answer
**Heights and distances problems apply the trigonometric ratios in right triangles to calculate unknown vertical heights or horizontal distances when an angle of elevation or depression is known.**

The core move is to draw a right triangle whose acute angle matches the observed angle and whose opposite or adjacent side is the unknown length. Once the triangle is identified, any of the three primary ratios converts the given angle and one known side into the missing length. This works because the definitions of sine, cosine, and tangent are ratios of fixed sides in any right triangle sharing that angle.

The method extends immediately to problems that combine two or more triangles, such as an observer on a cliff measuring both a boat and the top of a lighthouse. Each triangle is solved separately and the results are added or subtracted according to the geometry of the scene.

> [!NOTE]
> The single most important realization is that the angle given in the problem statement is never inside the triangle you ultimately solve; it is always the angle between the line of sight and the horizontal, so the right angle sits at the base of the object or at the observer’s eye level.

## 2. Why this matters — concrete and current
Surveying firms such as Trimble use total stations that combine laser ranging with angle encoders; the on-board computer solves exactly these right-triangle problems thousands of times per day to produce elevation maps for construction sites.

Commercial aviation relies on the same geometry when a pilot or autopilot calculates descent angle: a 3-degree glide slope at a known groundspeed determines the precise altitude the aircraft must maintain at each distance from the runway threshold.

In radio astronomy, the Atacama Large Millimeter Array determines the height of water-vapor layers above each antenna by measuring the apparent elevation of a calibration quasar; the resulting correction improves image sharpness at millimeter wavelengths.

Civil engineers designing wind turbines must verify blade-tip clearance above terrain; trigonometric ranging from survey points supplies the required height data when direct measurement is impractical.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Right-triangle definitions of sin, cos, tan | These ratios directly relate an observed angle to the unknown height or distance. |
| Angles of elevation and depression | These are the only angles supplied by real-world sightings; they become the acute angles of the working triangle. |
| Similar triangles        | When two lines of sight share an angle, the triangles formed are similar, allowing proportion or subtraction of heights. |
| Consistent units         | All lengths in a single problem must share the same unit before any ratio is evaluated. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the line of sight and the horizontal
A line drawn from an observer’s eye to the top of an object and a true horizontal line from the same eye form the angle of elevation. The right angle of the working triangle therefore lies at the base of the object or at the observer’s eye level, never at the observed angle itself.

Example: standing 40 m from a flagpole and looking up at 35° places the right angle at the base of the pole.

Formal statement:  
$$\angle(\text{line of sight},\text{horizontal})=\theta\implies\tan\theta=\frac{\text{opposite}}{\text{adjacent}}.$$

> [!WARNING]
> Treating the given angle as an interior angle of the triangle instead of the angle with the horizontal reverses opposite and adjacent sides.

### Step 2 — Draw the auxiliary right triangle
Drop a perpendicular from the observer’s eye level to the ground line; the segment between that foot and the base of the object becomes the adjacent side. The vertical distance from eye level to the top of the object is the opposite side.

### Step 3 — Choose the correct ratio
If the adjacent side is known, use tangent; if the hypotenuse is known, use sine or cosine. The choice follows directly from which side is opposite the given angle.

### Step 4 — Solve for the unknown side
Isolate the unknown length by multiplying both sides of the defining equation by the known length. All calculator work is performed in degree mode unless the angle is explicitly given in radians.

### Step 5 — Account for eye height or multiple segments
When the observer stands above ground level, add or subtract the eye-height segment after solving the main triangle. Multiple segments require separate triangles whose results are combined by addition or subtraction.

### Step 6 — State the final measured quantity
The computed length is reported with appropriate units and rounded to the precision justified by the given data.

## 5. Worked examples — every step shown

**Example 1 — Flagpole height**  
*Given:* An observer 30 m from a flagpole measures an angle of elevation of 40° to the top; eye height is 1.7 m.  
*Find:* Height of the flagpole.  

Step 1: \(\tan 40^\circ = \frac{h}{30}\)  
*Why:* Tangent equals opposite over adjacent.  

Step 2: \(h = 30\tan 40^\circ \approx 25.2\) m  
*Why:* Multiply both sides by the known adjacent side.  

Step 3: Total height = \(25.2 + 1.7 = 26.9\) m  
*Why:* Add eye height to reach ground level.  

**26.9 m**

*Reflection:* The only arithmetic risk is forgetting to add eye height; the triangle itself is elementary.

**Example 2 — Distance to a tower**  
*Given:* From the top of a 50 m building the angle of depression to the base of a tower is 25°.  
*Find:* Horizontal distance between the buildings.  

Step 1: The angle of depression equals the angle of elevation from the tower base, so \(\tan 25^\circ = \frac{50}{d}\).  
*Why:* Alternate interior angles formed by the transversal.  

Step 2: \(d = \frac{50}{\tan 25^\circ} \approx 107.3\) m  
*Why:* Solve for the adjacent side.  

**107.3 m**

*Reflection:* Depression angles must be converted to elevation angles inside the triangle.

**Example 3 — Two observers**  
*Given:* Two observers 200 m apart on level ground sight the top of a tree; angles are 30° and 45°.  
*Find:* Height of the tree.  

Let \(h\) be the height. Let \(x\) be the distance from the 45° observer.  
\(\tan 45^\circ = \frac{h}{x}\implies x = h\).  
\(\tan 30^\circ = \frac{h}{x+200}\implies\frac{h}{\sqrt{3}}=h+200\).  
\(h(\frac{1}{\sqrt{3}}-1)=200\).  
\(h=200\cdot\frac{\sqrt{3}}{1-\sqrt{3}}\approx 273.2\) m (after rationalizing).  

**273.2 m**

*Reflection:* Two triangles share the same height; their bases differ by the known separation.

**Example 4 — Airplane distance**  
*Given:* An observer sees an airplane at 35° elevation; 15 s later the angle is 20°. The plane flies horizontally at constant 250 m/s.  
*Find:* Altitude of the plane.  

Let \(h\) be altitude.  
\(h = d_1\tan 35^\circ = d_2\tan 20^\circ\).  
Distance flown: \(d_1-d_2=250\times15=3750\) m.  
Solve the system: \(d_1=3750\cdot\frac{\tan20^\circ}{\tan35^\circ-\tan20^\circ}\).  
\(h\approx 3750\cdot\frac{\tan20^\circ\tan35^\circ}{\tan35^\circ-\tan20^\circ}\approx 3104\) m.  

**3104 m**

*Reflection:* Two successive right triangles share the height; the difference of bases equals ground distance traveled.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                                      |
|-----------------------------|---------------------------------------------|------------------------------------------------------|
| Using the angle of depression directly as an interior angle | The angle is measured from horizontal, not from vertical | Always convert depression to elevation inside the triangle |
| Forgetting to add or subtract eye height | Eye level is rarely at ground level         | Draw the observer’s eye as a point above the ground line |
| Mixing degrees and radians on the calculator | Default mode differs across devices         | Explicitly set degree mode before each calculation   |
| Assuming the ground is perfectly level when two observers are involved | Small slopes change base lengths            | Verify or state the flat-ground assumption           |
| Reporting more significant figures than the input data | Calculator displays many digits             | Round to the least precise given measurement         |
| Treating the line-of-sight distance as the height | Hypotenuse is confused with opposite side   | Label every side opposite/adjacent before writing a ratio |
| Ignoring that the right angle is at the object base | The diagram is drawn with the right angle in the wrong place | Always place the right angle where the perpendicular meets the ground |

## 7. The textbook-precise statement
Let \(\theta\) be an angle of elevation or depression formed by a horizontal line and a line of sight. In the right triangle determined by dropping a perpendicular from the observer’s eye to the line containing the base of the observed object,  
\[
\tan\theta=\frac{\text{vertical distance}}{\text{horizontal distance}}.
\]
All other ratios follow from the definitions of sine and cosine. (See Stewart, *Precalculus*, 8e, §6.2, Example 4.)

## 8. Visual — diagram or schematic
```text
                  top of object
                       /|
                      / |
                     /  | h (opposite)
                    /   |
  line of sight    /    |
                 / θ   |
                /______|
 observer -----  d (adjacent)  ----- base
     eye level
```
Horizontal line from observer’s eye meets vertical object at right angle; θ is marked between line of sight and horizontal.

## 9. The memory technique

1. **The hook** — Picture a surveyor’s theodolite on a tripod; the bubble level is the horizontal, the telescope is the line of sight, and the height you want is the opposite side of the right triangle formed by the level bubble, the telescope, and the vertical tape on the distant pole.

2. **What to overlearn**  
   - \(\tan\theta=\frac{\text{opposite}}{\text{adjacent}}\) for elevation problems.  
   - Angle of depression equals the alternate interior elevation angle.  
   - Always add or subtract eye height after solving the main triangle.

3. **Spaced-repetition schedule** — Review the three overlearned items at 1 day, 3 days, 7 days, 16 days, and 35 days after first mastery.

4. **First-principles fallback** — Redraw the horizontal from the observer, drop the perpendicular to form the right angle, label opposite and adjacent relative to θ, then write the tangent ratio; every other step follows from algebra.

## 10. What this unlocks
Mastery of single-triangle height problems supplies the geometric intuition required for the law of sines and cosines, for three-dimensional direction cosines, and for the small-angle approximations used in optics and astronomy.

- Law of sines applied to non-right triangles  
- Vectors and navigation (bearing and elevation)  
- Parallax distance measurements in astronomy  
- Inverse trigonometric functions for finding angles from measured lengths  

## 11. Self-check — five questions, no answers
1. A tree 22 m away casts a shadow whose tip makes a 50° angle of elevation from the observer’s eye at ground level. Write the exact expression for the tree’s height.

2. From a lighthouse 80 m above sea level the angle of depression to a ship is 12°. How far is the ship from the base of the lighthouse (nearest metre)?

3. Two observers 150 m apart on flat ground measure angles of elevation 40° and 55° to the top of a spire. Derive the exact height of the spire in terms of tangent.

4. An observer on a cliff 120 m above sea level sees a boat at 8° depression; 30 s later the angle is 12°. If the boat travels directly toward the cliff at constant speed, calculate that speed in m/s.

5. Explain why an angle of depression measured from the top of a building cannot be used directly as an angle inside the right triangle whose opposite side is the building height.