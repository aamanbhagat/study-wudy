## What it is
An ellipse is defined geometrically as the locus of all points in a plane where the sum of the distances to two fixed points (the foci) is constant. This constant sum is exactly equal to $2a$, which is the total length of the ellipse's major axis. 

## Why it matters
In orbital mechanics, every closed two-body orbit is an ellipse with the central body at one focus. The $2a$ property directly dictates the specific mechanical energy of the orbit: the total energy of a satellite depends *only* on the semi-major axis $a$, completely independent of the orbit's eccentricity. In optics and acoustics, this property guarantees that waves emitted from one focus will perfectly converge at the other, a principle used in lasers, whispering gallery vaults, and lithotripsy (using sound waves to destroy kidney stones).

## When to study it
You must already be comfortable with:
* The Cartesian distance formula: $d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$.
* Algebraic manipulation of radicals (specifically, squaring equations twice to eliminate two square roots).
* The anatomy of an ellipse: center, vertices, co-vertices, major axis ($2a$), and minor axis ($2b$).

If you cannot confidently expand $(x-c)^2$ or isolate a radical in an algebraic equation, review polynomial expansion and radical algebra first.

## How to study it (step by step)
1. **Physical intuition:** Grab two pins, a piece of string of length $2a$, and a pencil. Pin the ends of the string to a board (these are the foci). Pull the string taut with the pencil and trace the curve. You are physically enforcing $d_1 + d_2 = 2a$.
2. **Setup the geometry:** On a Cartesian plane, place the foci at $F_1(-c, 0)$ and $F_2(c, 0)$. Let $P(x,y)$ be any point on the ellipse. Write down the literal translation of the property: $\sqrt{(x+c)^2 + y^2} + \sqrt{(x-c)^2 + y^2} = 2a$.
3. **Evaluate at the vertex:** Place $P$ at the far-right vertex $(a, 0)$. Calculate the distance to both foci to prove to yourself why the constant must equal exactly $2a$.
4. **Evaluate at the co-vertex:** Place $P$ at the top co-vertex $(0, b)$. Use this to derive the fundamental relationship $a^2 = b^2 + c^2$.
5. **Grind the algebra:** Take the equation from Step 2 and algebraically derive the standard Cartesian equation of the ellipse $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$. (Move one radical to the right, square both sides, isolate the remaining radical, square again, and substitute $b^2 = a^2 - c^2$).

## Key ideas, with intuition

**1. The String Intuition**
Imagine a string of length $2a$ anchored at foci $F_1$ and $F_2$. As a point $P$ moves along the ellipse, it slides along the taut string. The individual distances $d_1$ and $d_2$ change, but their sum $d_1 + d_2$ never changes.

**2. Why the constant is exactly $2a$**
Place $P$ at the right-most vertex $(a, 0)$. 
* The distance to the right focus $(c, 0)$ is $a-c$. 
* The distance to the left focus $(-c, 0)$ is $a+c$. 
Sum them: $(a-c) + (a+c) = 2a$. The constant is simply the length of the major axis.

**3. The Pythagorean Connection ($a^2 = b^2 + c^2$)**
Place $P$ at the top co-vertex $(0, b)$. By symmetry, the distance to each focus is exactly half the total string length, so $d_1 = a$ and $d_2 = a$. Drop a perpendicular to the origin. You have formed a right triangle with height $b$, base $c$, and hypotenuse $a$. By the Pythagorean theorem:
$$a^2 = b^2 + c^2$$
This is the master key for all ellipse geometry.

## Worked example
**Problem:** Find the standard equation of the ellipse whose foci are at $(\pm 3, 0)$ and for which the sum of the focal radii is $10$.

**Step 1: Identify the knowns from the geometry.**
The foci are at $(\pm c, 0)$, so $c = 3$.
The sum of the focal radii is $2a$, so $2a = 10 \implies a = 5$.

**Step 2: Find the semi-minor axis $b$.**
Using the geometric relationship derived at the co-vertex:
$$a^2 = b^2 + c^2$$
$$5^2 = b^2 + 3^2$$
$$25 = b^2 + 9 \implies b^2 = 16$$

**Step 3: Write the standard equation.**
Because the foci are on the x-axis, the major axis is horizontal. The standard equation is:
$$\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$$
$$\frac{x^2}{25} + \frac{y^2}{16} = 1$$

*Reflection:* We bypassed brutal double-radical algebra by trusting the geometric constants. The $2a$ property handed us $a$ directly, and the Pythagorean relationship (derived from evaluating the $2a$ property at the co-vertex) handed us $b$.

## Diagrams

```text
General Point P(x,y):                     Evaluating at Co-vertex (0,b):
             y                                         y
             ^                                         ^
             |   P(x,y)                                | (0,b)
           _.*._  /                                    *
       _,-'  |  `-,_                                  /|\
     ,'     _|_     `.                             a / | \ a
    /      / | \      \                             /  |b \
   |    d1/  |  \d2    |                           /   |   \
   |     /   |   \     |                  ---|-.-*-----+---*-.-|-|---> x
---|-.-*-----+---*-.-|-|---> x              -a  F1  c  O  c  F2  a
  -a  F1     O   F2  a                        (-c,0)       (c,0)
```

## Memory technique — remember this forever
1. **The Visual Hook:** "The Taut String." If you snap the major axis out of the ellipse and use it as a string pinned at the foci, it perfectly traces the perimeter.
2. **Overlearn these facts:**
   * $d_1 + d_2 = 2a$
   * $a^2 = b^2 + c^2$ (In an ellipse, $a$ is the longest dimension, so it is the hypotenuse. Do not confuse this with the hyperbola, where $c$ is the hypotenuse).
3. **Spaced-repetition schedule:** Review this concept and re-derive the co-vertex triangle at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget $a^2 = b^2 + c^2$, draw the ellipse. Put a point at the top co-vertex $(0,b)$. The string has length $2a$, so the distance to one focus is $a$. The triangle has height $b$ and base $c$. Pythagoras gives you the formula.

## Common mistakes
* **Equating the sum to $a$ instead of $2a$.** The sum is the *entire* major axis, not the semi-major axis.
* **Using the hyperbola relation ($c^2 = a^2 + b^2$).** Students blindly apply the standard Pythagorean theorem. Remember the visual: in an ellipse, $a$ is the hypotenuse.
* **Algebraic failure with radicals.** When proving the Cartesian equation, students often square $\sqrt{A} + \sqrt{B} = 2a$ to get $A + B = 4a^2$. This is a fatal algebra error. $(X + Y)^2 = X^2 + 2XY + Y^2$.

## Self-check
1. An ellipse has foci at $(0, \pm 4)$ and a major axis of length $14$. What is the sum of the distances from any point on the ellipse to the foci? What is the value of $b^2$?
2. A satellite is in an elliptical orbit around Earth (Earth is at one focus). At its closest approach (perigee), it is $7,000$ km from Earth's center. At its furthest (apogee), it is $13,000$ km from Earth's center. What is the semi-major axis $a$ of the orbit?
3. Starting from $\sqrt{(x+c)^2 + y^2} + \sqrt{(x-c)^2 + y^2} = 2a$, perform the full algebraic derivation to arrive at $\frac{x^2}{a^2} + \frac{y^2}{a^2-c^2} = 1$. Do not skip steps.