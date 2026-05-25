## What it is

These are the fundamental, zero- and one-dimensional building blocks of all geometry. A point is an exact, dimensionless location in space. A line is a perfectly straight, one-dimensional path extending infinitely in opposite directions. A line segment is a finite, bounded piece of a line between two specific points. A ray is a "half-line" that begins at a specific point and extends infinitely in one direction. Notation exists solely to rigorously distinguish the infinite boundaries of these objects.

## Why it matters

In physics and rocket science, these concepts form the absolute foundation of vectors and kinematics. A spacecraft's center of mass is tracked as a point; its trajectory is often modeled via line segments (for numerical integration); its velocity and thrust are vectors, which are geometrically represented as directed line segments or rays. In computer science, ray-tracing algorithms for 3D rendering rely entirely on calculating the intersections of rays (simulating photons of light) with geometric planes. 

## When to study it

Study this at the very beginning of your geometry or linear algebra journey. The only prerequisites are basic arithmetic and an understanding of the 1D number line. If you do not understand how to plot a real number on a number line, review that first. 

## How to study it (step by step)

1. **Define the point:** Recognize a point as a 0D coordinate. Draw several points and label them with capital letters (e.g., $A, B$). 
2. **Construct the segment:** Connect two points. Write the notation $\overline{AB}$. Understand that because it is bounded, it has a measurable, finite length.
3. **Construct the ray:** Extend the segment infinitely past one endpoint. Write the notation $\overrightarrow{AB}$. Note that order matters: the first letter is the origin, the second is a point it passes through.
4. **Construct the line:** Extend the segment infinitely in both directions. Write the notation $\overleftrightarrow{AB}$. Recognize that because it is infinite in both directions, $\overleftrightarrow{AB}$ is identical to $\overleftrightarrow{BA}$.
5. **Translate text to math:** Practice converting English descriptions into rigorous notation. "A laser fired from satellite $S$ passing through coordinate $C$" becomes $\overrightarrow{SC}$.

## Key ideas, with intuition

**1. Dimensionality**
A point has 0 dimensions—it has position, but no length, width, or height. Lines, rays, and segments are 1-dimensional. Even if a line exists in 3D space ($x, y, z$), moving *along* the line requires only a single parameter (like time, $t$). 

**2. The Notation Mirrors the Geometry**
The symbol above the letters literally draws the boundaries of the object.
*   **Line Segment:** $\overline{AB}$. No arrows. The object stops exactly at $A$ and $B$.
*   **Ray:** $\overrightarrow{AB}$. One arrow. The object starts at $A$, and goes forever past $B$.
*   **Line:** $\overleftrightarrow{AB}$. Two arrows. The object goes forever past both $A$ and $B$.

**3. Object vs. Measure**
Geometry distinguishes between a physical shape and its numerical measurement. 
*   $\overline{AB}$ refers to the *set of points* between $A$ and $B$. 
*   $AB$ (with no bar on top) refers to the *distance* between $A$ and $B$. 
You can write $AB = 5$, but writing $\overline{AB} = 5$ is mathematical nonsense. You cannot say a set of points equals the number 5.

**4. Collinearity**
Any two distinct points uniquely define exactly one line. If a third point lies on that same line, the three points are called *collinear*.

## Worked example

**Problem:** 
Given three collinear points $X$, $Y$, and $Z$ in that order, determine the geometric intersection of ray $\overrightarrow{YX}$ and ray $\overrightarrow{YZ}$.

**Step 1: Visualize the origins and directions.**
Ray $\overrightarrow{YX}$ has its origin at $Y$ and extends infinitely in the direction of $X$. 
Ray $\overrightarrow{YZ}$ has its origin at $Y$ and extends infinitely in the direction of $Z$.

**Step 2: Analyze the collinearity.**
We are given that the points are collinear in the order $X-Y-Z$. This means $Y$ sits strictly between $X$ and $Z$ on the line $\overleftrightarrow{XZ}$.

**Step 3: Determine the intersection.**
Because $Y$ is between $X$ and $Z$, the direction from $Y$ to $X$ is exactly opposite to the direction from $Y$ to $Z$. 
The set of points in $\overrightarrow{YX}$ includes $Y$ and everything to its "left" (towards $X$).
The set of points in $\overrightarrow{YZ}$ includes $Y$ and everything to its "right" (towards $Z$).
The only point that exists in *both* sets is the origin point $Y$.

**Step 4: Formalize the answer.**
Using set intersection notation ($\cap$):
$$ \overrightarrow{YX} \cap \overrightarrow{YZ} = \{Y\} $$

*Reflection:* Drawing the geometry out forces us to see that rays are directional. Even though they live on the exact same line, their intersection is just a single 0D point because they diverge from $Y$.

## Diagrams

```text
Point:       A
             *

Segment:     A                  B
(AB)         *------------------*
             (bounded, finite length)

Ray:         A                  B
(AB)         *------------------|----->
             (starts at A, continues infinitely past B)

Line:        A                  B
(AB)   <-----|------------------|----->
             (continues infinitely in both directions)
```

## Memory technique — remember this forever

**1. The Visual Hook: "The Hat Rule"**
Look at the "hat" on the letters. 
* No arrows = Trapped in a box. 
* One arrow = A laser pointer (starts at the battery, shoots forever). 
* Two arrows = An infinite highway.

**2. Facts to Overlearn**
1. $\overline{AB} = \overline{BA}$ (Segments are symmetric).
2. $\overleftrightarrow{AB} = \overleftrightarrow{BA}$ (Lines are symmetric).
3. $\overrightarrow{AB} \neq \overrightarrow{BA}$ (Rays are strictly directional).

**3. Spaced-Repetition Schedule**
Review these notations and symmetries at 1 day, 3 days, 7 days, 16 days, and 35 days.

**4. First Principles Pathway**
If you forget whether $\overrightarrow{AB}$ and $\overrightarrow{BA}$ are the same, derive it by drawing. Draw a point $A$, then a point $B$. Draw a laser firing from $A$ through $B$. Now draw a laser firing from $B$ through $A$. Do the beams cover the exact same space? No. The first covers space past $B$; the second covers space past $A$. Therefore, the order of the letters dictates the physical reality.

## Common mistakes

1. **Confusing an object with its length:** Writing $\overline{AB} = 10$ instead of $AB = 10$. A segment is a geometric figure; its length is a scalar number.
2. **Assuming ray notation can point left:** Students sometimes write $\overleftarrow{BA}$ to mean a ray starting at $B$ and going through $A$. By rigorous convention, the arrow in the notation *always* points right. A ray starting at $B$ and passing through $A$ is written as $\overrightarrow{BA}$.
3. **Naming a line with three letters:** Writing $\overleftrightarrow{ABC}$. A line is uniquely defined by exactly two points. Choose any two. $\overleftrightarrow{AB}$ is the exact same line as $\overleftrightarrow{AC}$.

## Self-check

1. If you have distinct points $P$ and $Q$, what is the geometric intersection of the segment $\overline{PQ}$ and the line $\overleftrightarrow{PQ}$?
2. Let $A$, $B$, and $C$ be collinear points in that order. What is the union ($\cup$) of the rays $\overrightarrow{BA}$ and $\overrightarrow{BC}$?
3. Consider four points $A, B, C, D$ in 3D space. If line $\overleftrightarrow{AB}$ and line $\overleftrightarrow{CD}$ intersect at exactly one point $P$, what can you conclude about the mathematical plane containing these four points?