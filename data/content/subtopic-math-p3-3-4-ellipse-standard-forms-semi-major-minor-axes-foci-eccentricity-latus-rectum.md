## What it is
An ellipse is the set of all points in a plane such that the sum of the distances from any point on the curve to two fixed points (the foci) is constant. Visually, it is a stretched or squashed circle representing a closed curve where the distance from the center smoothly varies between a maximum and minimum value.

## Why it matters
Kepler's First Law dictates that all planetary orbits are ellipses with the central body at one focus. In rocket science and orbital mechanics, every closed trajectory—from a low Earth parking orbit to an interplanetary Hohmann transfer—is mathematically modeled as an ellipse. Mastering the geometry of the ellipse is non-negotiable for understanding orbital energy, velocity at periapsis/apoapsis, and satellite ground tracks.

## When to study it
You must already be fluent in:
* Cartesian coordinates and the distance formula.
* The standard equation of a circle ($x^2 + y^2 = r^2$).
* Completing the square for quadratic equations.
If you cannot confidently complete the square to find the center and radius of a circle, stop and master that algebraic technique first. You will drown in the algebra of conics otherwise.

## How to study it (step by step)
1. **The String Derivation:** Tape two ends of a string to a piece of cardboard (these are the foci). Pull the string taut with a pencil and trace the curve. This physical act permanently locks in the defining property: $d_1 + d_2 = \text{constant}$.
2. **The Algebraic Derivation:** Place the foci at $(-c, 0)$ and $(c, 0)$. Let the constant sum be $2a$. Set up the distance formula: $\sqrt{(x+c)^2 + y^2} + \sqrt{(x-c)^2 + y^2} = 2a$. Isolate a radical, square both sides, and grind through the algebra to derive $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$. Do this once in your life.
3. **Map the Anatomy:** Draw a large ellipse. Label the center, semi-major axis ($a$), semi-minor axis ($b$), foci ($c$), and the vertices. 
4. **Master the Pythagorean Link:** Prove to yourself why $a^2 = b^2 + c^2$ by looking at the point where the minor axis intersects the ellipse. 
5. **Calculate Eccentricity:** Define $e = \frac{c}{a}$. Calculate $e$ for a perfect circle ($c=0$) and a highly elliptical comet orbit ($c \approx a$) to build intuition for the "squash factor."
6. **Derive the Latus Rectum:** Plug $x = c$ into the standard equation to find the $y$-value above the focus. Multiply by 2 to get the total length of the latus rectum: $\frac{2b^2}{a}$.
7. **Practice Translation:** Take general quadratic equations, complete the square for both $x$ and $y$, and extract the standard form to find the translated center $(h, k)$.

## Key ideas, with intuition
* **The Constant Sum ($2a$):** The sum of the distances to the foci is always $2a$. Why $2a$? Place your point at the far right vertex $(a, 0)$. The distance to the left focus $(-c, 0)$ is $a+c$. The distance to the right focus $(c, 0)$ is $a-c$. Their sum is $(a+c) + (a-c) = 2a$. The length of the entire major axis is exactly the length of your "string."
* **The Pythagorean Relationship:** Place a point at the top vertex of the minor axis $(0, b)$. By symmetry, the distance to each focus is exactly half the string length, which is $a$. This forms a right triangle with the origin, the focus $(c, 0)$, and the top vertex $(0, b)$. The hypotenuse is $a$, and the legs are $b$ and $c$. Therefore:
  $$a^2 = b^2 + c^2$$
  *Notice that $a$ is the hypotenuse, not $c$.*
* **Standard Form:** For an ellipse centered at $(h,k)$:
  $$\frac{(x-h)^2}{a^2} + \frac{(y-k)^2}{b^2} = 1$$
  By convention, $a$ is always the semi-major (longer) axis, so $a > b$. If the larger denominator is under the $x$-term, the ellipse is horizontal. If it is under the $y$-term, the ellipse is vertical.
* **Eccentricity ($e$):** Measures how far off-center the foci are. 
  $$e = \frac{c}{a}$$
  Because $c < a$, eccentricity is strictly $0 \le e < 1$. If $e=0$, $c=0$ and the foci merge at the center: it becomes a circle.
* **Latus Rectum:** The chord passing through a focus, perpendicular to the major axis. Its length $\frac{2b^2}{a}$ dictates how "fat" the ellipse is at the foci.

## Worked example
**Problem:** Find the center, semi-major/minor axes, foci, and eccentricity of the ellipse given by $9x^2 + 4y^2 - 18x + 16y - 11 = 0$.

**Step 1: Group terms and factor out leading coefficients.**
$$9(x^2 - 2x) + 4(y^2 + 4y) = 11$$

**Step 2: Complete the square.**
Take half the linear coefficient, square it, and add it inside. Balance the equation by adding the distributed value to the right side!
$$9(x^2 - 2x + 1) + 4(y^2 + 4y + 4) = 11 + 9(1) + 4(4)$$
$$9(x-1)^2 + 4(y+2)^2 = 11 + 9 + 16$$
$$9(x-1)^2 + 4(y+2)^2 = 36$$

**Step 3: Divide by 36 to achieve standard form.**
$$\frac{(x-1)^2}{4} + \frac{(y+2)^2}{9} = 1$$

**Step 4: Extract the anatomy.**
*   **Center:** $(1, -2)$
*   **Axes:** The larger denominator is 9, so it's under the $y$-term. The ellipse is vertical. $a^2 = 9 \implies a = 3$. $b^2 = 4 \implies b = 2$.
*   **Foci:** $c^2 = a^2 - b^2 = 9 - 4 = 5 \implies c = \sqrt{5}$. Since the major axis is vertical, we add/subtract $c$ to the $y$-coordinate of the center. Foci are at $(1, -2 + \sqrt{5})$ and $(1, -2 - \sqrt{5})$.
*   **Eccentricity:** $e = \frac{c}{a} = \frac{\sqrt{5}}{3}$.

*Reflection:* Completing the square merely translates the ellipse; it does not change its shape ($a, b, c$). Balancing the right side of the equation during completion of the square is the most critical algebraic step.

## Diagrams

```text
                  y
                  |
             _,-'"""`-,_           Top Vertex (0, b)
          ,-'     |     `-.        
        ,'        |        `.      
       /          |          \     
      /           | b         \    
     |            |            |   
 ----+-------F1---+---F2-------+---- x
 -a  |      (-c)  |   (c)      |  a
     |            |            |   
      \           |           /    
       \          |          /     
        `.        |        ,'      
          `-. _   |   _ .-'        
             `'---"---'`           
                  |                
```
*Note: The distance from $F_2(c,0)$ to the Top Vertex $(0,b)$ is exactly $a$. This forms the right triangle with legs $b, c$ and hypotenuse $a$.*

## Memory technique — remember this forever
1. **The Mnemonic:** "Alpha is always the biggest, C is Center-to-focus." ($a$ is the semi-major axis, $c$ is the focal distance).
2. **The 3 MUST-learn formulas:**
   * Standard form: $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$
   * The Ellipse Pythagorean relation: $a^2 = b^2 + c^2$
   * Eccentricity: $e = \frac{c}{a}$
3. **Spaced-repetition schedule:** Review this material at 1 day, 3 days, 7 days, 16 days, and 35 days. Write the formulas from memory, then draw the anatomy diagram.
4. **First principles pathway:** If you forget $a^2 = b^2 + c^2$, visualize the string. Pinned at the foci, pulled to the top vertex $(0,b)$. The string length is $2a$, so each side of the triangle is $a$. The base is $c$, the height is $b$. The Pythagorean theorem immediately yields $c^2 + b^2 = a^2$.

## Common mistakes
* **Applying the standard Pythagorean Theorem:** Students blindly write $a^2 + b^2 = c^2$. In an ellipse, $a$ is the longest dimension, so it must be the hypotenuse: $a^2 = b^2 + c^2$.
* **Assuming $a^2$ is always under $x^2$:** $a^2$ is simply the *larger* of the two denominators. If the larger number is under $y^2$, the ellipse is vertical, and the foci lie on the vertical axis.
* **Algebraic failure when completing the square:** If you have $4(x^2 + 2x + 1)$, you didn't just add $1$ to the left side, you added $4 \times 1 = 4$. You must add $4$ to the right side.

## Self-check
1. What is the length of the latus rectum of the ellipse $\frac{x^2}{25} + \frac{y^2}{16} = 1$?
2. Derive the coordinates of the foci for the ellipse $x^2 + 4y^2 + 2x - 24y + 33 = 0$.
3. An Earth satellite has a perigee (closest approach) of $300\text{ km}$ and an apogee (farthest point) of $3000\text{ km}$ above the Earth's surface. If the Earth's radius is $6371\text{ km}$, what is the eccentricity of the orbit? *(Hint: The center of the Earth is at one focus, not the center of the ellipse).*