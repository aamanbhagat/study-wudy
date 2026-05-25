## What it is
The perimeter is the total length of the continuous 1D boundary that encloses a 2D shape. For a polygon—a closed shape made entirely of straight line segments—the perimeter is simply the sum of the lengths of all its sides. A "regular" polygon has sides of equal length and equal interior angles; an "irregular" polygon has sides and/or angles of varying measures.

## Why it matters
Perimeter is your first introduction to boundary conditions. In aerospace engineering, perimeter calculations dictate the length of sealing gaskets required for pressure vessels or the amount of framing material needed for a satellite chassis. In advanced mathematics, the perimeter of a 2D domain (denoted as $\partial \Omega$) is the foundation for line integrals and Stokes' Theorem, which you will eventually use to calculate fluid circulation and electromagnetic flux. 

## When to study it
You must study this only after you have mastered:
1. Basic arithmetic (addition and multiplication).
2. The definition of a polygon (vertices, edges, and closed paths).
3. Units of measurement (meters, centimeters, inches) and how to convert between them.

If you cannot confidently add a string of five numbers or explain what a vertex is, review those concepts first.

## How to study it (step by step)
1. **Define the boundary:** Take a physical object (like a book) and trace its edge with your finger. Internalize that perimeter is strictly about the *outside edge*, not the space inside.
2. **Master the irregular summation:** Draw a random, asymmetrical polygon with 5 sides. Assign a random length to each side. Write out the sum manually to find the perimeter.
3. **Derive the regular formula:** Draw a square with side length $s$. Sum the sides: $s + s + s + s$. Factor out $s$ to get $4s$. Generalize this to any regular polygon with $n$ sides to derive $P = n \cdot s$.
4. **Hunt for missing information:** Draw a rectilinear "L-shape" polygon. Label all sides except two. Use the parallel nature of the known sides to deduce the lengths of the unknown sides, then calculate the total perimeter. 
5. **Standardize units:** Practice problems where sides are given in mixed units (e.g., three sides in cm, two sides in mm). Force yourself to convert all measurements to a single unit before summing.

## Key ideas, with intuition

**1. The Unwinding Principle**
Perimeter is a 1D measurement living in a 2D world. Imagine the polygon is constructed from a single piece of stiff wire. If you take wire cutters, snip exactly one vertex, and pull the wire perfectly straight into a single line, the length of that line is the perimeter. 

**2. The General Formula (Irregular Polygons)**
For any polygon with $n$ sides, where the length of the $i$-th side is $s_i$, the perimeter $P$ is the sum of all sides:
$$P = \sum_{i=1}^{n} s_i = s_1 + s_2 + s_3 + \dots + s_n$$
This requires no special symmetry; you simply walk around the boundary and tally the distance.

**3. The Multiplicative Shortcut (Regular Polygons)**
Multiplication is just repeated addition. If a polygon is regular, all $n$ sides have the exact same length $s$. The summation simplifies algebraically:
$$P = \sum_{i=1}^{n} s = \underbrace{s + s + \dots + s}_{n \text{ times}} = n \cdot s$$

## Worked example
**Problem:** Find the perimeter of an irregular rectilinear L-shaped room. The bottom wall is $9\text{ m}$, the top wall is $5\text{ m}$, the right-most vertical wall is $4\text{ m}$, and the inner vertical corner wall is $3\text{ m}$. Two walls are unlabelled.

**Step 1: Identify the missing sides.**
Let the unlabelled left-most vertical wall be $v$. Let the unlabelled inner horizontal wall be $h$. 
Because the shape is rectilinear (all right angles), the total width at the top must equal the total width at the bottom.
$$5\text{ m} + h = 9\text{ m} \implies h = 4\text{ m}$$
Similarly, the total height on the left must equal the sum of the vertical segments on the right.
$$v = 3\text{ m} + 4\text{ m} \implies v = 7\text{ m}$$

**Step 2: Sum all sides.**
Starting from the top wall and moving clockwise:
$$P = 5\text{ m (top)} + 3\text{ m (inner vertical)} + 4\text{ m (inner horizontal)} + 4\text{ m (right vertical)} + 9\text{ m (bottom)} + 7\text{ m (left vertical)}$$

**Step 3: Calculate.**
$$P = 5 + 3 + 4 + 4 + 9 + 7 = 32\text{ m}$$

*Reflection:* This works because rectilinear geometry guarantees that opposite parallel segments project onto each other perfectly. We could not solve this if the angles were not exactly $90^\circ$.

## Diagrams

```text
Irregular Rectilinear Polygon (The Worked Example)
      
      5m
  +--------+
  |        | 3m
v |        +----+ h
  |             | 4m
  +-------------+
        9m

Regular Hexagon (n = 6)

       s
    /-----\
 s /       \ s
   \       /
 s  \-----/  s
       s
```

## Memory technique — remember this forever
1. **The Hook:** Look at the word itself. *Peri* (Greek for "around") + *metron* (Greek for "measure"). Imagine a tiny surveyor ant walking exactly on the fence line of a property, dragging a measuring tape. 
2. **Must Overlearn:** 
   * Irregular: $P = \sum s_i$
   * Regular: $P = n \cdot s$
3. **Spaced-repetition schedule:** Review these concepts at 1 day, 3 days, 7 days, 16 days, and 35 days. During each review, draw one irregular shape and one regular shape, and calculate their perimeters from scratch.
4. **First Principles Pathway:** If you forget the formula for a regular polygon, return to the unwinding principle. Draw the shape, pretend to cut it, and add the sides one by one. You will naturally rediscover that adding $s$ to itself $n$ times is $n \cdot s$.

## Common mistakes
* **Confusing perimeter with area:** Students often multiply length by width ($A = l \cdot w$) when asked for the perimeter of a rectangle. Perimeter is 1D (meters); area is 2D (meters squared).
* **Forgetting unlabelled sides:** In composite or irregular shapes, students often just add the numbers printed on the page, ignoring sides that lack explicit labels but can be deduced.
* **Ignoring unit mismatches:** Adding $5\text{ cm}$ to $2\text{ m}$ to get $7$. Always normalize units before executing the summation.

## Self-check
1. A triangle has sides of $4\text{ cm}$, $7\text{ cm}$, and $9\text{ cm}$. What is its perimeter?
2. A regular nonagon (9 sides) has a perimeter of $117\text{ mm}$. What is the length of a single side?
3. A rectangular plot of land has a perimeter of $100\text{ m}$. If the length is $4$ times the width, what are the exact dimensions of the plot?