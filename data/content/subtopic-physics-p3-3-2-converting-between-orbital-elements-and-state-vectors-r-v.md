## What it is
An orbiting body's state can be described in two equivalent ways. A **state vector** $(\vec{r}, \vec{v})$ gives its instantaneous position and velocity in a 3D coordinate system. A set of **orbital elements** ($a, e, i, \Omega, \omega, \nu$) describes the static geometry of the entire orbit. Converting between them is the process of translating from the dynamic, instantaneous description to the static, geometric one, and vice versa.

## Why it matters
This is the fundamental link between observation and prediction in astrodynamics. Ground-based radar or GPS gives you state vectors $(\vec{r}, \vec{v})$, but to predict the satellite's position a week from now, you need orbital elements. Conversely, when designing a mission to Mars, you define the target orbit using elements, then convert to state vectors to calculate the required rocket burns.

## When to study it
You must have a firm grasp of the following before proceeding. If not, master them first.
1.  **Vector Calculus:** Dot products, cross products, and vector magnitudes.
2.  **Coordinate Systems:** Primarily the Earth-Centered Inertial (ECI) frame, defined by the Earth's equator and the vernal equinox direction.
3.  **The Two-Body Problem:** The derivation of the orbit equation $r = \frac{p}{1+e \cos \nu}$ and the concepts of specific mechanical energy $\mathcal{E}$ and specific angular momentum $\vec{h}$.
4.  **The Six Classical Orbital Elements:** You must know what each element—$a, e, i, \Omega, \omega, \nu$—physically represents.

## How to study it (step by step)
1.  **Derive the key vectors:** Start with the state vector $(\vec{r}, \vec{v})$. Use first principles ($\vec{h} = \vec{r} \times \vec{v}$) to calculate the specific angular momentum vector, $\vec{h}$. This vector is fundamental as it's perpendicular to the orbital plane.
2.  **Calculate the geometric elements from $\vec{h}$:** Use the components of $\vec{h}$ to find the inclination $i$ and the longitude of the ascending node $\Omega$. Define the node vector $\vec{n} = \hat{K} \times \vec{h}$ and see how it points towards the ascending node.
3.  **Derive the eccentricity vector $\vec{e}$:** Calculate $\vec{e}$ from $(\vec{r}, \vec{v})$ and the gravitational parameter $\mu$. This vector is crucial because it points from the central body to the periapsis, defining the orbit's orientation within its plane. Its magnitude is the eccentricity, $e$.
4.  **Calculate the remaining elements:** Use $\vec{n}$ and $\vec{e}$ to find the argument of periapsis $\omega$. Use $\vec{e}$ and $\vec{r}$ to find the true anomaly $\nu$.
5.  **Calculate the energy:** Find the specific mechanical energy $\mathcal{E}$ from $(\vec{r}, \vec{v})$. Use the *vis-viva* equation to relate $\mathcal{E}$ to the semi-major axis $a$. Now you have all six elements.
6.  **Reverse the process:** To go from elements to state vectors, start by writing $\vec{r}$ and $\vec{v}$ in the perifocal coordinate frame (a convenient 2D frame aligned with the orbit's axes). The components will be functions of $p, e, \nu$.
7.  **Rotate back to the inertial frame:** Apply a sequence of three rotation matrices to the perifocal vectors to transform them into the ECI frame. The angles for these rotations are $\omega$, $i$, and $\Omega$. This is a standard coordinate transformation.

## Key ideas, with intuition
1.  **Physics provides the constants.** The entire conversion from a dynamic state $(\vec{r}, \vec{v})$ to static elements relies on two conserved quantities from physics: specific angular momentum $\vec{h}$ and specific energy $\mathcal{E}$. The geometry of the orbit doesn't change because these quantities don't change (in the ideal two-body problem).
    $$ \vec{h} = \vec{r} \times \vec{v} = \text{constant vector} $$
    $$ \mathcal{E} = \frac{v^2}{2} - \frac{\mu}{r} = \text{constant scalar} = -\frac{\mu}{2a} $$
2.  **Vectors define the geometry.** Two vectors, derived from $(\vec{r}, \vec{v})$, define the entire orbital geometry.
    *   $\vec{h}$ is normal to the orbital plane. Its direction gives the plane's tilt ($i$) and swivel ($\Omega$).
    *   The eccentricity vector, $\vec{e}$, points towards periapsis. Its direction, relative to the node line, gives the orientation of the ellipse within its plane ($\omega$). Its magnitude is the eccentricity, $e$.
    $$ \vec{e} = \frac{1}{\mu} \left[ \left(v^2 - \frac{\mu}{r}\right)\vec{r} - (\vec{r} \cdot \vec{v})\vec{v} \right] $$
3.  **The problem is a change of basis.** Converting from elements to state vectors is just a coordinate transformation. You know the position in a "natural" frame for the orbit (the perifocal frame, with $\hat{p}$ pointing to periapsis and $\hat{q}$ in the direction of motion). You simply apply rotations to express that same vector in the standard ECI frame.

## Worked example
**Problem:** An object has the following ECI state vector:
$\vec{r} = (6524.8, 6862.8, 6448.3)$ km
$\vec{v} = (4.9013, 5.5337, -1.9763)$ km/s
The Earth's gravitational parameter is $\mu = 398600$ km$^3$/s$^2$. Find the six classical orbital elements.

**Solution:**

1.  **Calculate magnitudes:**
    $r = ||\vec{r}|| = \sqrt{6524.8^2 + 6862.8^2 + 6448.3^2} = 11313.4$ km
    $v = ||\vec{v}|| = \sqrt{4.9013^2 + 5.5337^2 + (-1.9763)^2} = 7.6499$ km/s

2.  **Calculate specific angular momentum, $\vec{h}$:**
    $$ \vec{h} = \vec{r} \times \vec{v} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ 6524.8 & 6862.8 & 6448.3 \\ 4.9013 & 5.5337 & -1.9763 \end{vmatrix} $$
    $$ \vec{h} = (-13548.5 - 35752.2)\hat{i} - (-12895.3 - 31495.9)\hat{j} + (36095.3 - 33621.5)\hat{k} $$
    $$ \vec{h} = (-49300.7, 44391.2, 2473.8) \text{ km}^2/\text{s} $$
    $h = ||\vec{h}|| = 66505.2$ km$^2$/s

3.  **Calculate inclination, $i$:**
    The angle between $\vec{h}$ and the Z-axis ($\hat{K}$) is $i$.
    $$ \cos(i) = \frac{\vec{h} \cdot \hat{K}}{||\vec{h}||} = \frac{h_z}{h} = \frac{2473.8}{66505.2} = 0.0372 $$
    $$ i = \arccos(0.0372) = 87.87^\circ $$

4.  **Calculate longitude of ascending node, $\Omega$:**
    First, find the node vector $\vec{n} = \hat{K} \times \vec{h}$. This vector points along the line where the orbit crosses the equatorial plane going north.
    $$ \vec{n} = (0,0,1) \times (-49300.7, 44391.2, 2473.8) = (-44391.2, -49300.7, 0) $$
    $\Omega$ is the angle from the X-axis ($\hat{I}$) to $\vec{n}$.
    $$ \cos(\Omega) = \frac{\vec{n} \cdot \hat{I}}{||\vec{n}||} = \frac{n_x}{||\vec{n}||} = \frac{-44391.2}{66505.2} = -0.6675 $$
    Since $n_y < 0$, $\Omega$ is in the third quadrant.
    $$ \Omega = 360^\circ - \arccos(-0.6675) = 360^\circ - 131.86^\circ = 228.14^\circ $$

5.  **Calculate the eccentricity vector, $\vec{e}$:**
    $$ \vec{e} = \frac{1}{\mu} \left[ (v^2 - \frac{\mu}{r})\vec{r} - (\vec{r} \cdot \vec{v})\vec{v} \right] $$
    $v^2 - \frac{\mu}{r} = 7.6499^2 - \frac{398600}{11313.4} = 23.28$
    $\vec{r} \cdot \vec{v} = (6524.8)(4.9013) + (6862.8)(5.5337) + (6448.3)(-1.9763) = 57235.4$
    $$ \vec{e} = \frac{1}{398600} [23.28 \cdot (6524.8, ...) - 57235.4 \cdot (4.9013, ...)] $$
    After computing the vector arithmetic:
    $$ \vec{e} = (-0.3236, -0.4435, 0.5828) $$
    $e = ||\vec{e}|| = 0.8213$

6.  **Calculate argument of periapsis, $\omega$:**
    $\omega$ is the angle between the node vector $\vec{n}$ and the eccentricity vector $\vec{e}$.
    $$ \cos(\omega) = \frac{\vec{n} \cdot \vec{e}}{||\vec{n}|| ||\vec{e}||} = \frac{(-44391.2)(-0.3236) + (-49300.7)(-0.4435)}{(66505.2)(0.8213)} = 0.6643 $$
    To find the quadrant, check the sign of $\vec{e} \cdot \hat{K} = e_z$. Since $e_z > 0$, periapsis is in the northern hemisphere.
    $$ \omega = \arccos(0.6643) = 48.37^\circ $$

7.  **Calculate true anomaly, $\nu$:**
    $\nu$ is the angle between the eccentricity vector $\vec{e}$ and the position vector $\vec{r}$.
    $$ \cos(\nu) = \frac{\vec{e} \cdot \vec{r}}{||\vec{e}|| ||\vec{r}||} = \frac{(-0.3236)(6524.8) + ...}{(0.8213)(11313.4)} = 0.3502 $$
    To find the quadrant, check the sign of $\vec{r} \cdot \vec{v}$. Since it's positive (57235.4), the spacecraft is moving away from periapsis.
    $$ \nu = \arccos(0.3502) = 69.50^\circ $$

8.  **Calculate semi-major axis, $a$:**
    Use the *vis-viva* equation.
    $$ \mathcal{E} = \frac{v^2}{2} - \frac{\mu}{r} = \frac{7.6499^2}{2} - \frac{398600}{11313.4} = -5.92 \text{ km}^2/\text{s}^2 $$
    $$ a = -\frac{\mu}{2\mathcal{E}} = -\frac{398600}{2(-5.92)} = 33665 \text{ km} $$

**Reflection:** Each step builds on the last. We start with the raw state $(\vec{r}, \vec{v})$ and compute conserved physical quantities ($\vec{h}$, $\mathcal{E}$) and derived vectors ($\vec{n}$, $\vec{e}$). These vectors form a geometric scaffold from which we can measure the required angles ($i, \Omega, \omega, \nu$) using simple dot products. The scalar energy gives us the orbit's size ($a$).

## Diagrams

Diagram 1: The Orbital Plane in the Inertial Frame
```text
      ^ Z (K_hat, North Pole)
      |
      |     .---. h_vec (normal to orbit plane)
      |    /
      |   / i (inclination)
      |  /
      | /
<-----+----------------------> Y (J_hat)
     /|`-.
    / |   `-.
   /  |      `-.  <-- Orbital Plane
  /   |         `-.
 /    | Ascending Node (n_vec points here)
X ----Ω----
(I_hat, Vernal Equinox)
```
*   The $(\hat{I}, \hat{J}, \hat{K})$ axes form the ECI frame.
*   $\vec{h}$ is perpendicular to the orbital plane.
*   $i$ is the angle between $\hat{K}$ and $\vec{h}$.
*   The "line of nodes" is the intersection of the orbital and equatorial planes.
*   $\Omega$ is the angle in the equatorial plane from $\hat{I}$ to the ascending node.

Diagram 2: Orbit Geometry within the Plane
```text
                 Apoapsis
                    *
                 .     .
              .           .
            .               .
           *                 r_vec
          / \               /
         /   \ nu          /
 F' *---F--e_vec---P----*---
 (focus) \ (periapsis)
          \
           .               .
            .             .
              .         .
                  *
```
*   This is a 2D view looking down onto the orbital plane.
*   The central body is at focus F.
*   The eccentricity vector $\vec{e}$ points from F to periapsis P.
*   The true anomaly $\nu$ is the angle from $\vec{e}$ to the current position vector $\vec{r}$.

## Memory technique — remember this forever
1.  **The Story: "HENA"**
    When you have state vectors $(\vec{r}, \vec{v})$, you're lost in the dynamics. You need to find the orbit's "DNA". The key is the "HENA" sequence.
    *   **H**: Calculate $\vec{h} = \vec{r} \times \vec{v}$. This gives you the plane's orientation ($i, \Omega$).
    *   **E**: Calculate Energy $\mathcal{E}$ and the eccentricity vector $\vec{e}$. This gives you the size ($a$) and shape/orientation-in-plane ($e, \omega$).
    *   **N**: Calculate the Node vector $\vec{n} = \hat{K} \times \vec{h}$. This is your reference line in the equator for measuring angles.
    *   **A**: Calculate the final Angles ($\omega, \nu$) using dot products with $\vec{n}$, $\vec{e}$, and $\vec{r}$.

2.  **Must-Overlearn Formulas:**
    $$ \vec{h} = \vec{r} \times \vec{v} $$
    $$ \mathcal{E} = \frac{v^2}{2} - \frac{\mu}{r} = -\frac{\mu}{2a} $$
    $$ \vec{e} = \frac{1}{\mu} \left[ (v^2 - \frac{\mu}{r})\vec{r} - (\vec{r} \cdot \vec{v})\vec{v} \right] $$

3.  **Spaced Repetition Schedule:**
    Review this entire lesson and re-work the example at: **1 day, 3 days, 7 days, 16 days, 35 days.** Do not skip this.

4.  **First Principles Pathway:**
    If you forget the formula for $\vec{e}$, you can re-derive it. Remember that the Laplace-Runge-Lenz vector (which $\vec{e}$ is a multiple of) is a conserved quantity in the two-body problem. It arises from considering the time derivative of $\vec{v} \times \vec{h}$.
    $$ \frac{d}{dt}(\vec{v} \times \vec{h}) = \frac{d\vec{v}}{dt} \times \vec{h} + \vec{v} \times \frac{d\vec{h}}{dt} $$
    Since $\vec{h}$ is constant, the second term is zero. $\frac{d\vec{v}}{dt} = \vec{a} = -\frac{\mu}{r^3}\vec{r}$.
    $$ \frac{d}{dt}(\vec{v} \times \vec{h}) = -\frac{\mu}{r^3}\vec{r} \times (\vec{r} \times \vec{v}) $$
    Using the vector triple product identity $\vec{A} \times (\vec{B} \times \vec{C}) = (\vec{A} \cdot \vec{C})\vec{B} - (\vec{A} \cdot \vec{B})\vec{C}$, you can show this equals $\mu \frac{d}{dt}(\frac{\vec{r}}{r})$. Integrating with respect to time gives $\vec{v} \times \vec{h} = \mu \frac{\vec{r}}{r} + \vec{C}$, where $\vec{C}$ is a constant of integration. This constant vector is $\mu\vec{e}$.

## Common mistakes
1.  **Angle Quadrant Errors:** Using `acos` or `asin` for $\Omega$, $\omega$, or $\nu$ will give you an answer in $[0, 180^\circ]$. You must use a secondary condition (e.g., the sign of a vector component) to place the angle in the correct quadrant. For example, for $\Omega$, if $n_y < 0$, then $\Omega$ must be in the range $[180^\circ, 360^\circ]$.
2.  **Forgetting Special Cases:** The definitions for $\Omega$ and $\omega$ break down for certain orbits.
    *   If $i=0$ (equatorial orbit), the ascending node is undefined. $\Omega$ is not well-defined.
    *   If $e=0$ (circular orbit), the periapsis is undefined. $\omega$ is not well-defined.
3.  **Mixing up $\omega$ and $\nu$:** Students often mix up the argument of periapsis ($\omega$, the angle from the node to periapsis) and the true anomaly ($\nu$, the angle from periapsis to the satellite). Remember $\omega$ orients the ellipse, $\nu$ locates the satellite on it.

## Self-check
1.  Given $\vec{r} = (0, 8000, 0)$ km and $\vec{v} = (7.5, 0, 0)$ km/s in ECI, and $\mu_{Earth} = 398600$ km$^3$/s$^2$, calculate the six classical orbital elements.
2.  An orbit has an inclination $i=0$. Explain which classical orbital elements become ill-defined and why. How might you define an alternative set of elements to describe this orbit's orientation?
3.  A spacecraft in a circular orbit with radius $R$ fires its thrusters to instantaneously double its speed, with the velocity vector remaining in the same direction. Describe qualitatively and quantitatively what happens to the vectors $\vec{h}$ and $\vec{e}$, and the resulting values of $a$ and $e$.