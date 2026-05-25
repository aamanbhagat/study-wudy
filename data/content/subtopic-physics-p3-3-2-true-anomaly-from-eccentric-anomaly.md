## What it is
True anomaly, $\nu$, is the actual angular position of an orbiting body as measured from the main focus of its elliptical orbit (where the central body is). Eccentric anomaly, $E$, is a geometric parameter—an angle measured from the center of the ellipse to a projected point on an "auxiliary circle" that circumscribes the ellipse. The conversion between them is a purely geometric transformation that links the physically meaningful angle ($\nu$) to the mathematically convenient one ($E$) used in Kepler's equation.

## Why it matters
This conversion is the critical link between time and position in an orbit. We first solve Kepler's Equation to find the eccentric anomaly $E$ at a given time, but $E$ itself does not directly tell you where the satellite is. You must then convert $E$ to the true anomaly $\nu$ to find the satellite's actual bearing from the central body, which is essential for pointing antennas, planning trajectory maneuvers, and predicting rendezvous.

## When to study it
Before tackling this, you must be comfortable with the geometry of an ellipse, including the definitions of the semi-major axis ($a$), semi-minor axis ($b$), eccentricity ($e$), and the foci. You should also understand the definitions of the true anomaly ($\nu$) and the eccentric anomaly ($E$) and the concept of the auxiliary circle. A solid grasp of trigonometry, especially half-angle identities, is required.

## How to study it (step by step)
1.  **Draw the Diagram.** Draw an ellipse with its circumscribing auxiliary circle. Mark the center (C), the primary focus (F), the orbiting body (P), and the projected point on the auxiliary circle (Q). Label the angles $\nu$ and $E$ from their correct origins (F and C, respectively). This diagram is the foundation for everything.
2.  **Express Coordinates using $E$.** Write the Cartesian coordinates $(x, y)$ of the body P in the reference frame centered at the ellipse's center C. Use the definition of the auxiliary circle and the ellipse's geometry to find $x = a \cos E$ and $y = b \sin E$.
3.  **Express Coordinates using $\nu$.** Now, write the coordinates of P in a frame centered at the focus F. The distance from the focus to P is the radial distance $r$. The coordinates are $(r \cos \nu, r \sin \nu)$. Shift the origin from C to F by recalling the distance $CF = ae$. This gives $x = ae + r \cos \nu$ and $y = r \sin \nu$ in the center-frame.
4.  **Equate and Derive.** You now have two expressions for the coordinates of P. Equate them: $a \cos E = ae + r \cos \nu$ and $b \sin E = r \sin \nu$. Use the orbit equation $r = a(1 - e \cos E)$ to substitute for $r$ and simplify.
5.  **Derive the Tangent Half-Angle Formula.** The resulting equations can be messy. Use trigonometric half-angle identities, specifically for $\tan(\theta/2)$, to combine them into the standard, robust formula relating $\nu$ and $E$. This form avoids quadrant ambiguity.
6.  **Solve Problems.** Work through numerical examples converting a given $E$ to $\nu$ for various eccentricities. Then, practice the inverse: converting a given $\nu$ to $E$.

## Key ideas, with intuition
1.  **The Auxiliary Circle is a Computational Crutch.** An object on a circular path sweeps out equal angles in equal times. An object in an elliptical orbit does not. The auxiliary circle and the eccentric anomaly $E$ are a brilliant geometric construction that lets us relate the position on the ellipse to a uniform circular motion, which is much easier to work with when dealing with time (via Kepler's Equation). $E$ is the angle in this "ghost" circular world.
2.  **True Anomaly is Physical Reality.** While $E$ is a mathematical convenience, the true anomaly $\nu$ is what you would actually observe. It's the true angular separation between the point of closest approach (periapsis) and the satellite's current position, as seen from the central body.
3.  **The Relationship is a "Squashed Circle".** An ellipse is just a circle that has been squashed in one dimension. The relationship between the coordinates of a point on the ellipse $(x_p, y_p)$ and its projection on the auxiliary circle $(x_q, y_q)$ is simple: $x_p = x_q$ and $y_p = (b/a) y_q$. This vertical scaling is the geometric heart of the conversion. Since $x_q = a \cos E$ and $y_q = a \sin E$, we get the coordinates of P on the ellipse:
    $$ x_p = a \cos E $$
    $$ y_p = b \sin E = a\sqrt{1-e^2} \sin E $$
    These coordinate relations are the starting point for the full derivation.

## Worked example
**Problem:** An Earth-orbiting satellite has an orbit with eccentricity $e=0.4$. At a certain time, its eccentric anomaly is calculated to be $E = 120^\circ$. Find its true anomaly $\nu$.

**Solution:**
1.  **State the governing equation.** The most robust relationship between true anomaly $\nu$ and eccentric anomaly $E$ is the tangent half-angle formula:
    $$ \tan\left(\frac{\nu}{2}\right) = \sqrt{\frac{1+e}{1-e}} \tan\left(\frac{E}{2}\right) $$

2.  **Substitute known values.** We are given $e=0.4$ and $E=120^\circ$.
    - First, calculate the term with eccentricity:
      $$ \sqrt{\frac{1+e}{1-e}} = \sqrt{\frac{1+0.4}{1-0.4}} = \sqrt{\frac{1.4}{0.6}} = \sqrt{\frac{7}{3}} \approx 1.5275 $$
    - Next, calculate the tangent term:
      $$ \tan\left(\frac{E}{2}\right) = \tan\left(\frac{120^\circ}{2}\right) = \tan(60^\circ) = \sqrt{3} \approx 1.7321 $$

3.  **Calculate $\tan(\nu/2)$.**
    $$ \tan\left(\frac{\nu}{2}\right) \approx 1.5275 \times 1.7321 \approx 2.6457 $$

4.  **Solve for $\nu$.**
    - First, find the half-angle:
      $$ \frac{\nu}{2} = \arctan(2.6457) \approx 69.295^\circ $$
    - Then, double it to find the full angle:
      $$ \nu = 2 \times 69.295^\circ \approx 138.59^\circ $$

**Reflection:**
- Step 1 chose the best formula for the job, one that avoids quadrant issues inherent in using sine or cosine alone.
- Step 2 broke the problem down by calculating the components of the formula separately, which prevents calculation errors.
- Step 3 combined the components.
- Step 4 correctly isolated $\nu$ by first taking the arctangent and then multiplying by two. The result $\nu > E$ ($138.59^\circ > 120^\circ$) is expected for this part of the orbit (the satellite is moving away from apoapsis towards periapsis, where it moves fastest), confirming the physical intuition.

## Diagrams
This diagram shows the geometric relationship between the true anomaly ($\nu$) and the eccentric anomaly ($E$).

```text
                 Q
                 .
              ,' | `.
            ,'   |   `.  Auxiliary Circle (radius a)
          ,'     |     `.
         /       |       \
        /     P<´|        \  Ellipse
       /      .´ |         \
      /    .´    |          \
     / .´        |           \
 F' *<...........C...........* F ----> Periapsis (direction of e)
      \  ` .     |          /
       \    ` .  |         /
        \      `.|        /
         \       |       /
          `.     |     ,'
            `.   |   ,'
              `. | ,'
                 '

C = Center of ellipse
F = Focus (location of central body)
P = Position of orbiting body
Q = Projection of P onto the auxiliary circle

Angles:
- Eccentric Anomaly E: Angle from Periapsis direction to CQ
- True Anomaly v: Angle from Periapsis direction to FP
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you're at the center of a perfect circular park (the auxiliary circle, point C). Your friend is at point Q on the edge. The angle you see them at is $E$. But the real gravitational action is happening at a fountain (the focus, F) off to the side. A satellite P is on an elliptical path inside the circle. To find its *true* angle $\nu$ from the fountain, you can't just use your angle $E$. You need a "magic spyglass" (the $\sqrt{\frac{1+e}{1-e}}$ factor) that stretches or shrinks your view based on how eccentric the path is. The half-angle formula is the recipe for using this spyglass.

2.  **Formula to Overlearn:**
    $$ \tan\left(\frac{\nu}{2}\right) = \sqrt{\frac{1+e}{1-e}} \tan\left(\frac{E}{2}\right) $$

3.  **Spaced Repetition Schedule:** Review this derivation and formula at **1 day, 3 days, 7 days, 16 days, 35 days**. Actively re-derive it from the diagram on days 7 and 35.

4.  **First Principles Pathway:** If you forget the formula, rebuild it from the geometry.
    - Start with the coordinates of P from the center C: $(x, y) = (a \cos E, b \sin E)$.
    - Remember $b = a\sqrt{1-e^2}$.
    - Express the position vector $\vec{r}$ from the focus F to P: $\vec{r} = (x - ae, y)$.
    - The components are $r \cos \nu = a \cos E - ae$ and $r \sin \nu = b \sin E = a\sqrt{1-e^2} \sin E$.
    - Use the half-angle identity $\tan(\theta/2) = \frac{\sin \theta}{1+\cos \theta}$.
    - Substitute the expressions for $\sin \nu$ and $\cos \nu$ (dividing by $r$) into this identity. The algebra will lead you back to the formula.

## Common mistakes
1.  **Angle Origins:** Confusing the origins. Remember: **E**ccentric is from the **c**enter. **T**rue is from the **f**ocus (the central body). Always draw the diagram to be sure.
2.  **Quadrant Errors:** Using `arcsin` or `arccos` to find $\nu$ can lead to ambiguity. For example, $\cos(135^\circ) = \cos(225^\circ)$. The tangent half-angle formula is robust because $\tan(\theta/2)$ is unique for $\theta \in [0, 360^\circ)$. If you don't use it, you must use an `atan2(y, x)` function with the correct coordinate components to resolve the quadrant.
3.  **Unit Mismatch:** Mixing degrees and radians. Kepler's equation for Mean Anomaly *must* use radians. While this conversion can be done in degrees, be ruthlessly consistent with your calculator's mode.

## Self-check
1.  For an orbit with $e=0.1$, if the eccentric anomaly $E = 30^\circ$, what is the true anomaly $\nu$? Is it larger or smaller than $E$?
2.  Consider a perfectly circular orbit ($e=0$). What does the conversion formula simplify to? Does this match your physical intuition for a circle?
3.  An object in a highly eccentric orbit ($e=0.9$) has a true anomaly of $\nu=90^\circ$. What is its eccentric anomaly $E$? (This requires solving the formula for $E$).