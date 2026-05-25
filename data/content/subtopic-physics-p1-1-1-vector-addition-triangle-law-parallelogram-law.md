## What it is
Vector addition is the process of combining two or more vectors to find a single equivalent vector, called the resultant. The triangle law and parallelogram law are two graphical, and geometrically equivalent, methods for visualizing and calculating this resultant for two vectors. They formalize the idea of combining quantities that have both magnitude and direction, like displacement or force.

## Why it matters
This is the bedrock of mechanics and field theory. In rocketry, you'll sum velocity vectors to calculate an orbital injection path, and you'll sum force vectors from multiple engines (plus gravity and drag) to find the net force and resulting acceleration of a launch vehicle. In machine learning, high-dimensional vectors (e.g., word embeddings) are added and subtracted to find relationships in data.

## When to study it
Before starting, you must be comfortable with:
1.  **Definition of a Vector:** A quantity with both magnitude and direction. You should know how to represent it graphically as an arrow.
2.  **Basic Trigonometry:** Sine, cosine, tangent, and their inverses.
3.  **Geometric Laws:** The Law of Sines and the Law of Cosines for non-right triangles.

If you are missing any of these, pause and review them. Proceeding without them will lead to confusion.

## How to study it (step by step)
1.  **Draw and Displace (Triangle Law):** On paper, draw two vectors, $\vec{A}$ and $\vec{B}$, with different lengths and directions, starting from the same origin. Now, redraw them but place the *tail* of $\vec{B}$ at the *head* (tip) of $\vec{A}$. The resultant vector, $\vec{R} = \vec{A} + \vec{B}$, is the vector drawn from the tail of $\vec{A}$ to the head of $\vec{B}$. This completes the triangle.
2.  **Draw and Branch (Parallelogram Law):** Again, draw $\vec{A}$ and $\vec{B}$ starting from the same origin (tail-to-tail). Treat these two vectors as adjacent sides of a parallelogram and draw the other two sides. The resultant vector, $\vec{R} = \vec{A} + \vec{B}$, is the diagonal of the parallelogram that starts from the common origin.
3.  **Prove Equivalence:** Look at your parallelogram diagram. Observe that the side opposite $\vec{A}$ is a parallel vector of the same length, which is equivalent to $\vec{A}$. The same is true for $\vec{B}$. Notice that the parallelogram is simply two triangles from the triangle law stuck together, proving that $\vec{A} + \vec{B} = \vec{B} + \vec{A}$ (the commutative property).
4.  **Derive the Magnitude Formula:** In your triangle diagram, label the magnitudes of the vectors as $A$, $B$, and $R$. Let the angle *between* the original vectors $\vec{A}$ and $\vec{B}$ (when placed tail-to-tail) be $\theta$. The corresponding angle inside the triangle at the junction of $\vec{A}$ and $\vec{B}$ will be $180^\circ - \theta$ or $\pi - \theta$ radians. Apply the Law of Cosines to find the magnitude of the resultant, $R$.
5.  **Solve a Problem:** Find a simple physics problem, such as "A boat travels east at 4 m/s across a river flowing south at 3 m/s. What is the boat's resultant velocity?" Solve it graphically and then analytically using your derived formula. (This is a special case where $\theta = 90^\circ$).
6.  **Solve a Harder Problem:** Find a problem where the vectors are not perpendicular. For example, two forces, 10 N and 8 N, act on a point with an angle of $60^\circ$ between them. Calculate the magnitude and direction of the resultant force.

## Key ideas, with intuition
1.  **Addition is "Net Effect" or "Chained Displacement":** Think of vectors as instructions for a journey. $\vec{A}$ says "walk this far in this direction." $\vec{B}$ says "then, walk this far in that direction." The resultant vector $\vec{R} = \vec{A} + \vec{B}$ is the single instruction, "walk from your absolute start point to your absolute end point." The triangle law visualizes this journey perfectly.
2.  **Tip-to-Tail vs. Tail-to-Tail:**
    *   **Triangle Law (Tip-to-Tail):** Best for sequential events, like displacement followed by another displacement.
    *   **Parallelogram Law (Tail-to-Tail):** Best for simultaneous events acting on one point, like two forces pulling on a hook. The resultant shows the single force that would have the same effect.
3.  **Vector Addition is Commutative:** The order doesn't matter: $\vec{A} + \vec{B} = \vec{B} + \vec{A}$. The parallelogram law makes this visually obvious. Walking east then north gets you to the same final point as walking north then east.
4.  **The Analytical Solution Comes from Geometry:** The formula for the magnitude of the resultant is not magic. It is a direct application of the Law of Cosines to the triangle formed by the vectors. Let $\theta$ be the angle between $\vec{A}$ and $\vec{B}$ when placed tail-to-tail.
    $$R^2 = A^2 + B^2 - 2AB \cos(\pi - \theta)$$
    Since $\cos(\pi - \theta) = -\cos(\theta)$, this simplifies to the standard form:
    $$R = \sqrt{A^2 + B^2 + 2AB \cos\theta}$$

## Worked example
**Problem:** Two tugboats are pushing a large ship. Tugboat 1 pushes with a force $\vec{F_1}$ of 20,000 Newtons due East. Tugboat 2 pushes with a force $\vec{F_2}$ of 30,000 Newtons at an angle of $30^\circ$ North of East. What is the magnitude and direction of the resultant force $\vec{F_R}$ on the ship?

**Solution:**
1.  **Identify Vectors and Angle:**
    *   $|\vec{F_1}| = F_1 = 20,000$ N
    *   $|\vec{F_2}| = F_2 = 30,000$ N
    *   The angle $\theta$ between the two force vectors is $30^\circ$.

2.  **Calculate the Magnitude of the Resultant:** We use the derived formula (from the Law of Cosines):
    $$F_R = \sqrt{F_1^2 + F_2^2 + 2F_1 F_2 \cos\theta}$$
    $$F_R = \sqrt{(20000)^2 + (30000)^2 + 2(20000)(30000) \cos(30^\circ)}$$
    $$F_R = \sqrt{4 \times 10^8 + 9 \times 10^8 + 12 \times 10^8 \times \frac{\sqrt{3}}{2}}$$
    $$F_R = \sqrt{13 \times 10^8 + 6\sqrt{3} \times 10^8} \approx \sqrt{13 \times 10^8 + 10.39 \times 10^8}$$
    $$F_R = \sqrt{23.39 \times 10^8} \approx 4.836 \times 10^4 \text{ N}$$
    So, the magnitude of the resultant force is approximately 48,360 N.

3.  **Calculate the Direction of the Resultant:** We need to find the angle, let's call it $\alpha$, that $\vec{F_R}$ makes with $\vec{F_1}$ (the East direction). We use the Law of Sines on the vector triangle. The angle inside the triangle opposite to side $F_2$ is $180^\circ - 30^\circ = 150^\circ$.
    $$\frac{F_2}{\sin\alpha} = \frac{F_R}{\sin(150^\circ)}$$
    $$\sin\alpha = \frac{F_2 \sin(150^\circ)}{F_R}$$
    $$\sin\alpha = \frac{30000 \times 0.5}{48360} \approx 0.3102$$
    $$\alpha = \arcsin(0.3102) \approx 18.07^\circ$$

4.  **Final Answer:** The resultant force has a magnitude of approximately 48,360 N at an angle of $18.07^\circ$ North of East.

**Reflection:** Step 1 defined the inputs. Step 2 used the Law of Cosines to find the length of the third side of the vector triangle. Step 3 used the Law of Sines to find an unknown angle within that triangle, giving us the direction. Each step is a logical consequence of representing the physical forces as a geometric triangle.

## Diagrams
**Triangle Law (Tip-to-Tail)**
```text
      ^ North
      |
      |          /
      |         /
      |      B /
      |       /
      |      /
      | A-->+------> East
      |    /
      |   / R
      |  /
      | /
      +-------------
```
*Description: Vector A points East. The tail of Vector B starts at the tip of A and points up and to the right. The resultant R starts at the tail of A and ends at the tip of B, forming a triangle.*

**Parallelogram Law (Tail-to-Tail)**
```text
      ^ North
      |
      |      +-------/
      |     /     /
      |  B /   R /
      |   /   /
      |  / /
      +----A------> East
```
*Description: Vectors A and B both start from the origin. A points East, B points up and to the right. Dashed lines complete the parallelogram. The resultant R is the diagonal starting from the origin.*

## Memory technique — remember this forever
1.  **The Mnemonic:**
    *   **Triangle Law is a Journey:** You walk along path $\vec{A}$, then you walk along path $\vec{B}$. The resultant $\vec{R}$ is the shortcut from your *start* to your *finish*. (Tip-to-tail).
    *   **Parallelogram Law is a Tug-of-War:** Two forces, $\vec{A}$ and $\vec{B}$, pull on the same point. The resultant $\vec{R}$ is the direction the object will actually move. (Tail-to-tail).

2.  **Formulas to Overlearn:**
    *   Resultant Magnitude: $R = \sqrt{A^2 + B^2 + 2AB \cos\theta}$ (where $\theta$ is the angle between vectors placed tail-to-tail).
    *   Resultant Direction (Law of Sines): $\frac{A}{\sin\beta} = \frac{B}{\sin\alpha} = \frac{R}{\sin(\pi - \theta)}$ (where $\alpha$ is angle opposite side A, $\beta$ is angle opposite side B).

3.  **Spaced Repetition Schedule:** Review this material and re-derive the formulas from a blank sheet of paper at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:** If you forget everything, remember this: **Vector addition is just building a triangle.** Draw the triangle. If you know two sides ($A$ and $B$) and the angle between them ($180^\circ - \theta$), you can always find the third side ($R$) using the Law of Cosines. You can find the other angles using the Law of Sines. All formulas are just pre-packaged applications of these two geometric laws.

## Common mistakes
1.  **The Angle Error:** Confusing the angle *between* the vectors, $\theta$, with the angle *inside the triangle*, which is $180^\circ - \theta$. The formula $R = \sqrt{A^2 + B^2 + 2AB \cos\theta}$ uses $\theta$ (the tail-to-tail angle). If you use the Law of Cosines directly on the triangle, you must use the internal angle: $R^2 = A^2 + B^2 - 2AB \cos(180^\circ - \theta)$.
2.  **Adding Magnitudes:** Never assume $|\vec{A} + \vec{B}| = |\vec{A}| + |\vec{B}|$. This is only true if the vectors are collinear and point in the same direction ($\theta = 0^\circ$).
3.  **Resultant Direction Error:** In the parallelogram, drawing the wrong diagonal. The resultant must start from the common origin of the two vectors.
4.  **Calculator Mode:** Ensure your calculator is in degrees or radians mode to match the units you are using for the angles. This is a trivial but catastrophic error.

## Self-check
1.  A vector $\vec{A}$ has magnitude 5 and points North. Vector $\vec{B}$ has magnitude 12 and points West. What is the magnitude and direction of $\vec{R} = \vec{A} + \vec{B}$?
2.  Two forces, $|\vec{F_1}| = 100$ N and $|\vec{F_2}| = 100$ N, act on a body. The angle between them is $120^\circ$. What is the magnitude of the resultant force?
3.  Consider two vectors $\vec{A}$ and $\vec{B}$ with fixed magnitudes. How must they be oriented relative to each other for the magnitude of their resultant, $|\vec{A} + \vec{B}|$, to be (a) a maximum, and (b) a minimum? What are these maximum and minimum magnitudes in terms of $|\vec{A}|$ and $|\vec{B}|$?