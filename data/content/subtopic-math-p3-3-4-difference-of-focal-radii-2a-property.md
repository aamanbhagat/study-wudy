## What it is
The "difference of focal radii = $2a$" property is the fundamental geometric definition of a hyperbola. It states that for any point on a hyperbola, the absolute difference between its distance to the first focus and its distance to the second focus is a constant. This constant is exactly $2a$, which is the distance between the hyperbola's two vertices (the transverse axis).

## Why it matters
In orbital mechanics, any spacecraft exceeding a planet's escape velocity follows a hyperbolic trajectory. The $2a$ property dictates the geometry of this escape path and ties directly to the orbital energy of the spacecraft. On Earth, this property is the mathematical engine behind Time Difference of Arrival (TDOA) navigation systems, such as LORAN or modern multilateration used to track aircraft and cell phones. If two receivers record a signal at slightly different times, the constant difference in distance places the transmitter on a specific hyperbola.

## When to study it
You must already be fluent in:
1. The Cartesian distance formula.
2. Algebraic manipulation of radicals (specifically, isolating a square root and squaring both sides twice).
3. The geometric definition of an ellipse (sum of focal radii = $2a$). 
If you cannot derive the standard equation of an ellipse from its focal definition, do not attempt the hyperbola yet. Go back and master the ellipse.

## How to study it (step by step)
1. **Analyze the vertex:** Place the foci at $(-c, 0)$ and $(c, 0)$. Place a vertex at $(a, 0)$. Calculate the distance from the vertex to both foci. Subtract the smaller from the larger to prove to yourself that the difference is exactly $2a$.
2. **Set up the general equation:** Let $P(x,y)$ be any point on the hyperbola. Write the distance equation: $\left| \sqrt{(x-c)^2 + y^2} - \sqrt{(x+c)^2 + y^2} \right| = 2a$.
3. **Execute the algebraic derivation:** Drop the absolute value by adding $\pm$ to $2a$. Isolate one radical. Square both sides. Isolate the remaining radical. Square again. (This will take 15-20 minutes and is a mandatory rite of passage in algebraic stamina).
4. **Define $b$:** During the derivation, you will encounter the term $c^2 - a^2$. Because $c > a$ in a hyperbola, this is a positive number. Define it as $b^2 = c^2 - a^2$ to compress the algebra into the standard form $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$.
5. **Compare and contrast:** Write the definitions and Pythagorean relations of the ellipse and hyperbola side-by-side to solidify the differences.

## Key ideas, with intuition

**1. The Geometric Anchor (Why $2a$?)**
Why is the constant difference exactly $2a$? Look at the right vertex $V(a, 0)$. The distance to the left focus $F_1(-c, 0)$ is $c + a$. The distance to the right focus $F_2(c, 0)$ is $c - a$. 
$$|VF_1 - VF_2| = (c + a) - (c - a) = 2a$$
Because the definition holds for *all* points on the curve, the constant must be $2a$.

**2. The Absolute Value Dictates the Branches**
The equation $|d_1 - d_2| = 2a$ contains an absolute value. 
If $d_1 - d_2 = 2a$, the point is closer to $F_2$, generating the right branch. 
If $d_1 - d_2 = -2a$, the point is closer to $F_1$, generating the left branch. 
Without the absolute value, a hyperbola is only half a curve.

**3. The Pythagorean Reversal**
For an ellipse, the vertices are further out than the foci ($a > c$), so $a^2 = b^2 + c^2$. 
For a hyperbola, the foci are further out than the vertices ($c > a$), so $c^2 = a^2 + b^2$. 
The geometry dictates the algebra. Do not memorize these blindly; visualize which point is furthest from the center.

## Worked example
**Problem:** Find the standard equation of a hyperbola whose foci are at $(\pm 5, 0)$ and for which the absolute difference of the focal radii for any point on the curve is $6$.

**Step 1: Identify given parameters from the geometry.**
The foci are at $(\pm c, 0)$, so $c = 5$.
The constant difference of focal radii is $2a$, so $2a = 6 \implies a = 3$.

**Step 2: Find $b^2$.**
For a hyperbola, the foci are outside the vertices ($c > a$). Therefore, the Pythagorean relationship is $c^2 = a^2 + b^2$.
$$5^2 = 3^2 + b^2$$
$$25 = 9 + b^2 \implies b^2 = 16$$

**Step 3: Write the standard equation.**
Because the foci lie on the x-axis, the hyperbola opens horizontally. The $x^2$ term must be positive.
$$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1 \implies \frac{x^2}{9} - \frac{y^2}{16} = 1$$

*Reflection:* By knowing the geometric definition, we bypassed pages of brutal radical algebra. The phrase "difference of focal radii is 6" translates instantly to "$2a = 6$".

## Diagrams

```text
                      y
                      |
           Branch 1   |   Branch 2
             \        |        /
              \       |       /
               \      |      /
                |     |     |   P(x,y)
                |     |     |  /
                |     |     | / d2
                |     |     |/
---*------------*-----|-----*------------*--- x
 F1(-c,0)    V1(-a,0) |  V2(a,0)      F2(c,0)
  \                   |
   \__________________|
            d1

At point P: |d1 - d2| = 2a
```

## Memory technique — remember this forever
1. **The Mnemonic:** "An Ellipse is *inclusive* (sum, +). A Hyperbola is *divisive* (difference, -)." 
2. **Formulas to overlearn:**
   * $|PF_1 - PF_2| = 2a$
   * $c^2 = a^2 + b^2$ (Hyperbola Pythagorean relation)
3. **Spaced-repetition schedule:** Review this concept and re-derive the vertex proof on days 1, 3, 7, 16, and 35.
4. **First principles pathway:** If you forget what the constant is, draw a horizontal line. Mark the center at $0$, foci at $\pm c$, and vertices at $\pm a$. Put your finger on the right vertex $(a)$. Calculate the distance to $-c$ (which is $c+a$) and the distance to $c$ (which is $c-a$). Subtract them. You will instantly recover $2a$.

## Common mistakes
* **Confusing the Pythagorean relations:** Students frequently use $a^2 = b^2 + c^2$ (the ellipse relation) for hyperbolas. Remember that in a hyperbola, the focus $c$ is the furthest point from the center, so $c$ must be the hypotenuse in the $a-b-c$ triangle.
* **Misidentifying $2a$ as the focal distance:** Students read "difference of focal radii is 10" and set $2c = 10$. Focal radii are the distances from a *point on the curve* to the foci. The constant difference is $2a$. The distance between the foci themselves is $2c$.
* **Dropping the absolute value in proofs:** Writing $PF_1 - PF_2 = 2a$ defines only one branch of the hyperbola. You must include the absolute value to define the full conic section.

## Self-check
1. A hyperbola has foci at $(0, 13)$ and $(0, -13)$. The absolute difference of focal radii is $10$. What is the standard equation of the hyperbola?
2. A point $P(x,y)$ moves such that the difference of its distances from $(5,0)$ and $(-5,0)$ is always exactly $10$. What specific geometric shape does $P$ trace out? (Hint: Be careful. Check the relationship between $a$ and $c$).
3. Two microphones, $M_1$ and $M_2$, are located $2000$ meters apart. A loud explosion is recorded by $M_1$ exactly $2$ seconds before it is recorded by $M_2$. Assuming the speed of sound is $340$ m/s, write the equation of the curve on which the explosion must have occurred. Set the midpoint of the microphones as the origin $(0,0)$.