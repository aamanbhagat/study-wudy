## What it is
When changing a double integral from Cartesian coordinates $(x,y)$ to polar coordinates $(r,\theta)$, the differential area element $dA = dx \, dy$ becomes $dA = r \, dr \, d\theta$. The extra factor of $r$ is the **Jacobian determinant** of the coordinate transformation, and it accounts for the fact that the area of a small patch in polar coordinates depends on its distance from the origin.

## Why it matters
This transformation is essential for solving problems with circular, radial, or angular symmetry. In physics, you will use it to calculate the gravitational field of a disk or the moment of inertia of a spinning object. In machine learning, it is the key to proving that the integral of the Gaussian function over the entire plane is 1, a cornerstone of probability theory and statistics.

## When to study it
Before tackling this, you must be proficient with:
1.  **Double integrals in Cartesian coordinates:** You should be able to set up and evaluate $\iint_R f(x,y) \, dx \, dy$.
2.  **Polar coordinates:** You must fluently convert between $(x,y)$ and $(r,\theta)$ using $x = r \cos \theta$, $y = r \sin \theta$, and $r^2 = x^2 + y^2$.
3.  **Determinants of 2x2 matrices:** You need to know how to compute $\det \begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad-bc$.

If you are not confident in these three areas, master them first. This topic builds directly upon them.

## How to study it (step by step)
1.  **Intuitive Derivation:** Draw a "polar rectangle"—a small region bounded by two radii ($r$ and $r+dr$) and two angles ($\theta$ and $\theta+d\theta$). Approximate its area by treating it as a trapezoid or, more simply, a rectangle. The "width" is $dr$. The "length" is the arc length, which is $r \, d\theta$. Conclude that the area $dA \approx (dr)(r \, d\theta) = r \, dr \, d\theta$.
2.  **Formal Derivation:** Define the transformation $T(r, \theta) = (x, y)$ where $x = r \cos \theta$ and $y = r \sin \theta$. Construct the Jacobian matrix of partial derivatives: $J = \begin{pmatrix} \frac{\partial x}{\partial r} & \frac{\partial x}{\partial \theta} \\ \frac{\partial y}{\partial r} & \frac{\partial y}{\partial \theta} \end{pmatrix}$.
3.  **Compute the Determinant:** Calculate the four partial derivatives and compute the determinant of the matrix from Step 2. Simplify the result using the identity $\cos^2\theta + \sin^2\theta = 1$. This will prove that $|\det(J)| = r$.
4.  **Convert a full integral:** Take the integral $\iint_D (x^2+y^2) \, dA$ where $D$ is the unit disk $x^2+y^2 \le 1$. Convert every piece:
    *   The integrand: $x^2+y^2 = r^2$.
    *   The area element: $dA = r \, dr \, d\theta$.
    *   The region bounds: $0 \le r \le 1$ and $0 \le \theta \le 2\pi$.
    *   Assemble and solve the new integral: $\int_0^{2\pi} \int_0^1 (r^2) \, r \, dr \, d\theta$.
5.  **Solve a problem you couldn't before:** Calculate the volume under the paraboloid $z = 1 - x^2 - y^2$ above the $xy$-plane. Note how the polar form $z = 1-r^2$ over the disk $0 \le r \le 1$ makes the integral trivial.

## Key ideas, with intuition
1.  **Area elements are distorted.** A small rectangle in the $r\theta$-plane with area $dr \, d\theta$ does not map to a rectangle in the $xy$-plane. It maps to a small, curved shape that looks like a sector of an annulus.
2.  **Stretching depends on radius.** The further a polar rectangle is from the origin, the larger its area in the $xy$-plane. A change in angle $d\theta$ sweeps out a much larger arc length at $r=10$ than it does at $r=0.1$. The area scaling factor must depend on $r$.
    $$ dA \approx \underbrace{(r \, d\theta)}_{\text{arc length}} \times \underbrace{(dr)}_{\text{width}} = r \, dr \, d\theta $$
3.  **The Jacobian is the local area scaling factor.** For any change of variables, the absolute value of the Jacobian determinant tells you how much the area is stretched or compressed at a given point. For the transformation from polar to Cartesian coordinates, this scaling factor is exactly $r$.
    $$ J = \begin{pmatrix} \frac{\partial x}{\partial r} & \frac{\partial x}{\partial \theta} \\ \frac{\partial y}{\partial r} & \frac{\partial y}{\partial \theta} \end{pmatrix} = \begin{pmatrix} \cos \theta & -r \sin \theta \\ \sin \theta & r \cos \theta \end{pmatrix} $$
    $$ \det(J) = (r \cos^2 \theta) - (-r \sin^2 \theta) = r(\cos^2 \theta + \sin^2 \theta) = r $$

## Worked example
**Problem:** Find the volume of the solid bounded by the paraboloid $z = 16 - x^2 - y^2$ and the plane $z=0$.

**Solution:**
1.  **Identify the region of integration.** The solid sits above the $xy$-plane. The intersection with the $xy$-plane ($z=0$) is given by $0 = 16 - x^2 - y^2$, which is the circle $x^2 + y^2 = 16$. This is a disk $D$ of radius 4 centered at the origin.
2.  **Choose coordinates.** The circular boundary and the term $x^2+y^2$ in the function strongly suggest using polar coordinates.
3.  **Convert the integrand.** The height of the solid at any point $(x,y)$ is $z = f(x,y) = 16 - (x^2 + y^2)$. In polar coordinates, this becomes $f(r, \theta) = 16 - r^2$.
4.  **Convert the bounds.** The disk $D$ is described by the inequalities $0 \le r \le 4$ and $0 \le \theta \le 2\pi$.
5.  **Convert the area element.** The differential area element is $dA = r \, dr \, d\theta$.
6.  **Set up and evaluate the integral.** The volume $V$ is given by the double integral of the height function over the disk $D$.
    $$ V = \iint_D (16 - x^2 - y^2) \, dA = \int_{0}^{2\pi} \int_{0}^{4} (16 - r^2) \, r \, dr \, d\theta $$
    First, evaluate the inner integral with respect to $r$:
    $$ \int_{0}^{4} (16r - r^3) \, dr = \left[ 8r^2 - \frac{1}{4}r^4 \right]_{0}^{4} = \left( 8(4^2) - \frac{1}{4}(4^4) \right) - (0) = (8 \cdot 16 - 64) = 128 - 64 = 64 $$
    Now, evaluate the outer integral with respect to $\theta$:
    $$ V = \int_{0}^{2\pi} 64 \, d\theta = [64\theta]_{0}^{2\pi} = 64(2\pi) - 0 = 128\pi $$

**Reflection:**
*   Step 1 defined the problem domain.
*   Step 2 made the strategic choice of coordinate system.
*   Steps 3, 4, and 5 systematically translated every part of the original Cartesian integral into the new polar system. Forgetting any one of these would lead to an incorrect answer.
*   Step 6 was mechanical evaluation. The polar form resulted in a simple polynomial integral, whereas the Cartesian form would have required trigonometric substitution.

## Diagrams

**Diagram 1: The Polar Area Element in the xy-plane**
This shows a small patch defined by a small change in $r$ and $\theta$. The sides are not straight lines, but the area is approximately a rectangle.

```text
      y
      |
      |     /-----\
      |    /       \  <-- arc length is approx. r*d(theta)
      |   |    dA   |
      |    \       /
      |     \-----/
      |       ^
      |       | dr
      +------------------ x
     /
    /
   origin
```

**Diagram 2: The Mapping from rθ-plane to xy-plane**
This shows how a simple rectangle in the parameter space ($r\theta$-plane) gets transformed into a curved region in the physical space ($xy$-plane).

```text
r-theta plane (parameter space)        xy-plane (physical space)

  theta ^                                 y ^
        |                                   |
  d(th) |----|                              |     /-----\
        |////|                              |    ////////\
        +----+-----> r                      +---------------> x
           dr                                 origin

The area of the shaded rectangle         The area of the shaded polar
on the left is dr*d(theta).              region on the right is r*dr*d(theta).
                                         The transformation scales the area.
```

## Memory technique — remember this forever
1.  **The Sprinkler Story:** Imagine a lawn sprinkler at the origin. It spins (changing $\theta$) and the jet of water moves in and out (changing $r$). To find the total amount of water on the lawn, you integrate. But a patch of lawn far away ($r$ is large) gets more water per degree of turn than a patch close to the center, because the water is moving faster and covers more ground. The "amount" of area covered by a small turn $d\theta$ is proportional to $r$. So when you add up all the patches of area, you must weight them by their distance from the center: $dA = \boldsymbol{r} \, dr \, d\theta$.
2.  **Formulas to overlearn:**
    *   $x = r \cos \theta$, $y = r \sin \theta$
    *   $dA = dx \, dy = \boldsymbol{r} \, dr \, d\theta$
3.  **Spaced Repetition Schedule:** Review this entire lesson and re-work the example at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget the formula for $dA$, you have two ways to rebuild it:
    *   **Geometric:** Sketch the polar area element. It's a sliver of an annulus. Its area is approximately (arc length) $\times$ (width) = $(r \, d\theta) \times (dr)$.
    *   **Algebraic:** Re-compute the Jacobian determinant. Write down $x=r\cos\theta, y=r\sin\theta$. Find the four partial derivatives $\frac{\partial x}{\partial r}, \frac{\partial x}{\partial \theta}, \frac{\partial y}{\partial r}, \frac{\partial y}{\partial \theta}$. Put them in a 2x2 matrix and find its determinant. It will be $r$. This is foolproof.

## Common mistakes
1.  **Forgetting the $r$.** This is the single most common error. Students write $\iint f(r,\theta) \, dr \, d\theta$. The integral will almost always be wrong. Always write $r \, dr \, d\theta$.
2.  **Incorrectly converting the function.** You must substitute $x = r \cos \theta$ and $y = r \sin \theta$ into the function $f(x,y)$ itself. An integral cannot contain a mix of $x, y, r, \theta$.
3.  **Messing up the bounds for $r$.** The radius $r$ is a distance, so it is almost always non-negative. A common lower bound is $r=0$. The upper bound can be a constant (for a circle) or a function of $\theta$ (for more complex shapes like cardioids).

## Self-check
1.  Set up, but do not evaluate, the double integral in polar coordinates to find the area of a semicircle of radius 5 centered at the origin in the upper half-plane ($y \ge 0$).
2.  Evaluate $\iint_R \frac{1}{1+x^2+y^2} \, dA$ where $R$ is the sector in the first quadrant bounded by $y=0$, $y=x$, and $x^2+y^2=4$.
3.  Find the volume of the solid region that lies under the hemisphere $z = \sqrt{25-x^2-y^2}$ and above the annular region $D = \{(x,y) \mid 1 \le x^2+y^2 \le 9\}$.