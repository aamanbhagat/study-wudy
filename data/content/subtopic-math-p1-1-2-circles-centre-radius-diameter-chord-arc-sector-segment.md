## What it is
A circle is the set of all points in a 2D plane that are exactly the same distance from a single, fixed point. That fixed point is the **centre**, the uniform distance is the **radius**, and the terminology that follows (chords, arcs, sectors, segments) simply gives us a precise vocabulary for cutting up and measuring pieces of this shape. 

## Why it matters
In physics and aerospace, circles model rotational kinematics, orbital mechanics (as a special case of ellipses), and electromagnetic fields. You cannot calculate the centripetal force of a satellite or the angular velocity of a motor without mastering radii and arcs. In computer science, circular buffers and radial basis functions in machine learning rely on the geometry of fixed distances from a centre.

## When to study it
You should already understand:
* Basic algebraic manipulation (solving for $x$).
* The concepts of points, line segments, and 2D planes.
* Angles measured in degrees (knowing that a full rotation is $360^\circ$).

If you do not understand what an angle is or how to measure it, stop and review basic angle geometry first.

## How to study it (step by step)
1. **Draw the constraints:** Take a blank paper. Mark a point (centre). Draw 5 points exactly 5 cm away. Realize the circle is just the infinite collection of these points.
2. **Master the lines:** Draw a circle. Draw a line segment from the centre to the edge (radius). Draw a segment connecting two points on the edge (chord). Force a chord to pass through the centre (diameter). 
3. **Master the boundaries (1D):** Trace a portion of the circle's outer edge with a colored pen. This is an arc.
4. **Master the regions (2D):** Draw two radii and shade the region between them (sector). Draw a chord and shade the region between the chord and the edge (segment).
5. **Formalize the relationships:** Write down the algebraic relationship between the radius $r$ and diameter $d$. Prove to yourself visually why a diameter is the longest possible chord.

## Key ideas, with intuition

**1. The Circle as a Locus (Constraint)**
A circle is not just a shape; it is a mathematical constraint. If the centre is $C$, then for any point $P$ on the circle, the distance is constant:
$$ \text{Distance}(C, P) = r $$
This single idea is the foundation of trigonometry and polar coordinates.

**2. Lines: Radius, Chord, and Diameter**
*   **Radius ($r$):** The fundamental unit of the circle. It defines the circle's size.
*   **Chord:** Any straight line segment connecting two points on the circle. 
*   **Diameter ($d$):** A chord that passes through the centre. Because it goes from edge to centre to edge, it is exactly two radii long: $$d = 2r$$. It is the longest possible chord.

**3. Edges and Areas: Arcs, Sectors, and Segments**
*   **Arc:** A 1D curve. It is a fraction of the total perimeter (circumference). 
*   **Sector:** A 2D area. Think of a slice of pizza. It is bounded by two radii and an arc. 
*   **Segment:** A 2D area. Think of a cookie where you snapped off the edge in a straight line. It is bounded by a chord and an arc.

## Worked example
**Problem:** A circle has a radius of $r = 4 \text{ cm}$. A sector is cut out by two radii separated by an angle of $90^\circ$. Identify the length of the diameter, and determine what fraction of the circle's total area is contained within this sector.

**Step 1: Find the diameter.**
The diameter is always twice the radius.
$$ d = 2r = 2(4) = 8 \text{ cm} $$
*Why it works:* The diameter is a chord passing through the centre, effectively forming two radii end-to-end.

**Step 2: Determine the fraction of the circle's area in the sector.**
A full circle represents a rotation of $360^\circ$. The sector is defined by a $90^\circ$ angle.
$$ \text{Fraction} = \frac{\text{Sector Angle}}{\text{Total Angle}} = \frac{90^\circ}{360^\circ} $$
$$ \text{Fraction} = \frac{1}{4} $$
*Why it works:* A circle is perfectly symmetric. Area scales linearly with the angle that sweeps it out. A $90^\circ$ sweep is exactly one-quarter of a full $360^\circ$ rotation, so the sector contains one-quarter of the total area.

## Diagrams

```text
                 ARC
           _ . - ¯ ¯ - . _
       . '    \       |    ' .
     .         \      |       .
    .   SECTOR  \     |        .
   .             \    |         .
  .               \   | RADIUS   .
  .                \  |          .
  .                 \ |          .
  .                  \| CENTRE   .
  .                   +----------.  <-- DIAMETER (horizontal)
  .                   |          .
  .                   |          .
   .                  |         .
    .                 |        .
     .                |       .  <----- CHORD
       . '            |    ' . \
           - . _      | _ -     \
                 ¯ ¯ ¯           \
                                SEGMENT (shaded area between chord & arc)
```

## Memory technique — remember this forever

**1. The Visual Hook**
*   **Sector = Slice:** A **Sec**tor is a slice of pizza (cut from the centre).
*   **Segment = Scrap:** A **Seg**ment is the scrap of crust left over when you chop off the edge with a straight knife (the chord).
*   **Chord = Cord:** A straight piece of string (cord) pulled taut between two points on the edge.

**2. Formulas to overlearn**
*   $$d = 2r$$
*   Fraction of circle = $$\frac{\theta}{360^\circ}$$ (where $\theta$ is the angle in degrees).

**3. Spaced-repetition schedule**
Review this anatomy (draw a blank circle and label all 7 terms from memory) at intervals of: 1 day, 3 days, 7 days, 16 days, and 35 days.

**4. The First Principles Pathway**
If you forget how a sector relates to the whole circle, remember the definition of the circle: uniform sweep around a centre. A full sweep is $360^\circ$. Any piece of the circle (arc length, sector area) is just a simple ratio: $\frac{\text{your angle}}{360^\circ}$. 

## Common mistakes
*   **Confusing Sectors and Segments:** Students frequently swap these. Remember the pizza (sector) vs. the chopped scrap (segment).
*   **Thinking the diameter isn't a chord:** The diameter is a chord; it is simply the *longest* chord. A chord only requires its endpoints to be on the circle.
*   **Mixing up 1D and 2D parts:** An arc is a 1D line (length). Sectors and segments are 2D regions (area). You cannot calculate the "area of an arc."

## Self-check
1. Draw a circle. Draw a chord that is *not* a diameter. Shade the minor segment created by this chord. 
2. If a sector has an angle of $180^\circ$, what special name do we give the chord that bounds its corresponding segment?
3. Imagine two chords of equal length in the same circle. Must they be the same distance from the centre? (Draw it to find out).