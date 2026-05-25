## 1. What it is — in plain English

Imagine you have an object, any object at all – maybe a flat plate, a solid ball, or even just a thin wire. When we talk about its "mass," we're simply asking, "How much 'stuff' is there in this object?" If the object is made of the same material throughout, it's easy: just multiply its volume (or area, or length) by how dense the material is. But what if the material isn't uniform? What if it's denser in some places than others? That's where calculus comes in, allowing us to sum up tiny bits of mass across the entire object.

Now, picture trying to balance that object on the tip of your finger. There's usually one special point where it perfectly balances without tipping over. This magical spot is called the "centre of mass." It's like the average position of all the 'stuff' in the object. If you push the object at its centre of mass, it will move without spinning. If you hang it from its centre of mass, it will stay perfectly still.

Finally, imagine you want to spin that object. Some objects are easy to spin, like a pencil around its middle. Others are much harder, like a long pole held at one end. The "moment of inertia" is a measure of an object's resistance to being spun or its tendency to keep spinning once it's started. It's not just about how heavy the object is; it's also about how that mass is distributed relative to the axis you're trying to spin it around. The further the mass is from the axis, the harder it is to get it to spin or stop spinning.

## 2. Why it matters — real-world applications

These concepts are fundamental across engineering, physics, and even computer science, allowing us to predict and control the behavior of physical systems.

1.  **Aerospace Engineering & Satellite Design**: When designing rockets, satellites, or aircraft, engineers absolutely must know the centre of mass. For a rocket (like those built by SpaceX or NASA), the centre of mass needs to be carefully positioned relative to the centre of pressure for stable flight. If it's off, the rocket tumbles. For satellites, knowing the centre of mass is crucial for attitude control – how the satellite is oriented in space. Thrusters apply forces to rotate the satellite, and their effectiveness depends entirely on the satellite's mass distribution and centre of mass.
2.  **Robotics & Biomechanics**: Robotics engineers (e.g., Boston Dynamics) use centre of mass calculations to design stable robots that can walk, run, and balance. A robot's ability to maintain balance on uneven terrain or perform dynamic movements relies on its control system constantly estimating and adjusting its centre of mass. Similarly, in biomechanics, understanding the centre of mass of a human body (or parts of it) helps analyze athletic performance, design prosthetics, and even understand injury mechanisms.
3.  **Mechanical Engineering & Rotating Machinery**: The moments of inertia are critical for any rotating machinery. Consider a car tire, a turbine blade in a jet engine, or a flywheel in an energy storage system. If the mass isn't distributed symmetrically around the axis of rotation, it creates imbalances and vibrations, leading to wear and tear, noise, and even catastrophic failure. Engineers at companies like General Electric or Siemens use moment of inertia calculations to design balanced components, ensuring smooth and efficient operation.
4.  **Sports Equipment Design**: Think about a golf club, a baseball bat, or a tennis racket. The "sweet spot" on a bat or racket, where impact feels solid and powerful, is often related to the object's centre of mass and moments of inertia. Designers meticulously calculate these properties to optimize performance, making the equipment easier to swing, more forgiving on off-centre hits, and capable of imparting maximum energy to the ball.
5.  **Physics & Astronomy (Planetary Dynamics)**: In physics, the moment of inertia is a key concept in rotational dynamics, appearing in Newton's second law for rotation ($ \tau = I \alpha $, where $\tau$ is torque, $I$ is moment of inertia, and $\alpha$ is angular acceleration). Astronomers use these concepts to understand how planets rotate, how stars form, and how galaxies spin. The distribution of mass within a celestial body dictates its moment of inertia, which in turn affects its rotational period and stability.

## 3. Prerequisites — what you must know first

Before diving deep into mass, centre of mass, and moments of inertia using multivariable calculus, ensure you have a solid grasp of the following concepts:

*   **Single-Variable Integration**: The fundamental concept of using integrals to sum infinitesimal quantities. You should be comfortable with definite integrals and how they relate to Riemann sums for calculating areas, volumes, and total quantities from a rate or density.
*   **Multivariable Integration (Double and Triple Integrals)**: Extending single-variable integration to two and three dimensions. This includes setting up limits of integration for various regions (rectangles, disks, spheres, arbitrary regions), changing the order of integration, and understanding the geometric interpretation of $\iint_R f(x,y) \, dA$ and $\iiint_E f(x,y,z) \, dV$.
*   **Coordinate Systems**: Proficiency in Cartesian (rectangular) coordinates $(x,y,z)$, polar coordinates $(r,\theta)$, cylindrical coordinates $(r,\theta,z)$, and spherical coordinates $(\rho,\phi,\theta)$. You must know how to convert between them and how to express differential area ($dA$) and differential volume ($dV$) elements in each system (e.g., $dA = r \, dr \, d\theta$, $dV = r \, dz \, dr \, d\theta$, $dV = \rho^2 \sin\phi \, d\rho \, d\phi \, d\theta$).
*   **Density**: Understanding density as mass per unit length (1D, $\lambda$), mass per unit area (2D, $\sigma$), or mass per unit volume (3D, $\rho$). Crucially, you should be comfortable with the idea that density can be a function of position, not just a constant.
*   **Basic Vector Calculus**: While not strictly a prerequisite for *calculating* these quantities, an intuitive understanding of position vectors and how they describe points in space will help conceptualize the centre of mass.
*   **Basic Physics Concepts**: A rudimentary understanding of concepts like force, torque (rotational force), and the general idea of inertia (resistance to change in motion) will provide valuable context for why we calculate these quantities.

## 4. The core idea — step by step

Let's break down the concepts of mass, centre of mass, and moments of inertia, starting from the simplest cases and building up to the multivariable calculus formulations.

### Step 1: Mass of a 1D object (a thin rod or wire)

**Plain English:** Imagine a very thin wire. If it's made of the same material throughout, its total "stuff" (mass) is just its length multiplied by how much 'stuff' there is per unit length. But if it's thicker or made of denser material at one end, its "stuff per unit length" (linear density) changes along its length. To find the total mass, we chop the wire into tiny pieces, find the mass of each tiny piece, and add them all up.

**Small concrete example:** Consider a thin rod of length $L$ placed along the x-axis from $x=0$ to $x=L$. If its linear density (mass per unit length) is constant, say $\lambda$ kg/m, then its total mass is simply $M = \lambda L$. But if the density varies, for example, $\lambda(x) = kx$ (meaning it gets denser as $x$ increases), then we can't just multiply. We take a tiny segment of the rod, $dx$, at position $x$. The mass of this tiny segment is $dm = \lambda(x) \, dx$. To get the total mass, we sum up all these tiny masses from $x=0$ to $x=L$.

**The formal/mathematical version:**
For a one-dimensional object (a curve $C$) with linear density function $\lambda(x)$ (or $\lambda(x,y)$, $\lambda(x,y,z)$ if it's a curve in 2D or 3D space), its total mass $M$ is given by:
$$ M = \int_C \lambda(x,y,z) \, ds $$
where $ds$ is the differential arc length. If the curve is along the x-axis from $x=a$ to $x=b$, this simplifies to:
$$ M = \int_a^b \lambda(x) \, dx $$

**What could go wrong:** Forgetting that density can be a function of position. If you treat a variable density as constant, your mass calculation will be incorrect. Also, ensure the limits of integration correctly span the entire object.

### Step 2: Mass of a 2D object (a flat plate or lamina)

**Plain English:** Now imagine a flat, thin plate, like a cookie sheet. If it's uniformly thick and made of the same material, its total "stuff" (mass) is its area multiplied by how much 'stuff' there is per unit area (surface density). If it's thicker in some spots or made of different materials, its "stuff per unit area" (surface density) changes across its surface. We divide the plate into tiny squares, find the mass of each tiny square, and add them all up.

**Small concrete example:** Consider a rectangular plate defined by $0 \le x \le 2$ and $0 \le y \le 1$. If its surface density is constant, say $\sigma$ kg/m$^2$, its mass is $M = \sigma \times (\text{Area}) = \sigma \times (2 \times 1) = 2\sigma$. If the density varies, for example, $\sigma(x,y) = xy$ kg/m$^2$, we take a tiny rectangular patch $dA = dx \, dy$ at position $(x,y)$. The mass of this tiny patch is $dm = \sigma(x,y) \, dA$. To find the total mass, we sum up all these tiny masses over the entire region $R$ of the plate.

**The formal/mathematical version:**
For a two-dimensional object (a lamina or thin plate) occupying a region $R$ in the $xy$-plane, with surface density function $\sigma(x,y)$, its total mass $M$ is given by a double integral:
$$ M = \iint_R \sigma(x,y) \, dA $$
where $dA$ can be $dx \, dy$, $dy \, dx$, or in polar coordinates, $r \, dr \, d\theta$.

**What could go wrong:** Incorrectly setting up the limits of integration for the region $R$, especially for non-rectangular shapes. Also, choosing the wrong differential area element ($dA$) for the coordinate system being used.

### Step 3: Mass of a 3D object (a solid body)

**Plain English:** Finally, imagine a solid object, like a potato. If it's made of the same material throughout, its total "stuff" (mass) is its volume multiplied by how much 'stuff' there is per unit volume (volume density). If it's denser in the middle or hollow in parts, its "stuff per unit volume" (volume density) changes. We chop the potato into tiny cubes, find the mass of each tiny cube, and add them all up.

**Small concrete example:** Consider a solid cube defined by $0 \le x \le 1$, $0 \le y \le 1$, $0 \le z \le 1$. If its volume density is constant, say $\rho$ kg/m$^3$, its mass is $M = \rho \times (\text{Volume}) = \rho \times (1 \times 1 \times 1) = \rho$. If the density varies, for example, $\rho(x,y,z) = x+y+z$ kg/m$^3$, we take a tiny cubic patch $dV = dx \, dy \, dz$ at position $(x,y,z)$. The mass of this tiny patch is $dm = \rho(x,y,z) \, dV$. To find the total mass, we sum up all these tiny masses over the entire solid region $E$.

**The formal/mathematical version:**
For a three-dimensional object (a solid body) occupying a region $E$ in space, with volume density function $\rho(x,y,z)$, its total mass $M$ is given by a triple integral:
$$ M = \iiint_E \rho(x,y,z) \, dV $$
where $dV$ can be $dx \, dy \, dz$, or in cylindrical coordinates $r \, dz \, dr \, d\theta$, or in spherical coordinates $\rho^2 \sin\phi \, d\rho \, d\phi \, d\theta$.

**What could go wrong:** The most common pitfalls here are setting up the limits of integration incorrectly for complex 3D regions and choosing an inefficient or incorrect coordinate system (e.g., trying to integrate a sphere in Cartesian coordinates when spherical is much easier).

### Step 4: Centre of Mass (the "balance point")

**Plain English:** The centre of mass is the single point where, if you could support the entire object there, it would balance perfectly. It's the weighted average of all the positions of the tiny bits of mass that make up the object. To find it, we calculate "moments." A moment is essentially the mass of an object multiplied by its distance from a reference line or plane. For a 2D object, the moment about the x-axis tells us how mass is distributed relative to that axis (how "far up or down" it is), and the moment about the y-axis tells us how mass is distributed relative to that axis (how "far left or right" it is).

**Small concrete example:** Imagine a seesaw. If you put a heavy person far from the pivot and a light person close, it won't balance. To balance, the "moment" created by the heavy person must equal the "moment" created by the light person. Moment = (mass) $\times$ (distance from pivot). For a continuous object, we sum up the moments of all tiny mass elements.

**The formal/mathematical version:**
The coordinates of the centre of mass $(\bar{x}, \bar{y}, \bar{z})$ are found by dividing the *moments* by the total mass $M$.

*   **For a 1D object (rod) along the x-axis with density $\lambda(x)$:**
    Moment about the origin: $M_0 = \int_a^b x \lambda(x) \, dx$
    Centre of mass: $\bar{x} = \frac{M_0}{M}$

*   **For a 2D object (lamina) in the $xy$-plane with density $\sigma(x,y)$:**
    Moment about the $x$-axis: $M_x = \iint_R y \sigma(x,y) \, dA$ (Note: $y$ is the distance from the x-axis)
    Moment about the $y$-axis: $M_y = \iint_R x \sigma(x,y) \, dA$ (Note: $x$ is the distance from the y-axis)
    Centre of mass: $(\bar{x}, \bar{y}) = \left( \frac{M_y}{M}, \frac{M_x}{M} \right)$

*   **For a 3D object (solid) with density $\rho(x,y,z)$:**
    Moment about the $yz$-plane: $M_{yz} = \iiint_E x \rho(x,y,z) \, dV$
    Moment about the $xz$-plane: $M_{xz} = \iiint_E y \rho(x,y,z) \, dV$
    Moment about the $xy$-plane: $M_{xy} = \iiint_E z \rho(x,y,z) \, dV$
    Centre of mass: $(\bar{x}, \bar{y}, \bar{z}) = \left( \frac{M_{yz}}{M}, \frac{M_{xz}}{M}, \frac{M_{xy}}{M} \right)$

**What could go wrong:** A very common mistake is confusing $M_x$ and $M_y$. Remember, $M_x$ is the moment *about* the x-axis, which depends on the $y$-coordinate (distance from the x-axis). Similarly, $M_y$ depends on the $x$-coordinate. For 3D, $M_{yz}$ depends on $x$, $M_{xz}$ depends on $y$, and $M_{xy}$ depends on $z$. Always think of the coordinate that represents the perpendicular distance from the plane/axis.

### Step 5: Moments of Inertia (resistance to rotation)

**Plain English:** The moment of inertia tells you how hard it is to start or stop an object from rotating around a specific axis. It depends on two things: the object's mass and how far that mass is from the axis of rotation. The further the mass is from the axis, the more it contributes to the moment of inertia, and thus the harder it is to change its rotational motion. Think of a figure skater: when they pull their arms in, their mass is closer to their axis of rotation, and they spin faster (lower moment of inertia). When they extend their arms, their mass is further out, and they spin slower (higher moment of inertia).

**Small concrete example:** Imagine two identical dumbbells. One is held with the weights close to your hands, and the other with the weights far from your hands (like a long bar). It's much easier to spin the first dumbbell around its center than the second. The second one has a higher moment of inertia because its mass is distributed further from the axis of rotation. For a tiny particle of mass $m$ at a distance $r$ from an axis, its moment of inertia is $mr^2$. For a continuous object, we sum up $r^2 \, dm$ for all tiny mass elements.

**The formal/mathematical version:**
The moment of inertia of an object about an axis is the integral of the square of the distance from the axis, multiplied by the differential mass element.

*   **For a 2D object (lamina) in the $xy$-plane with density $\sigma(x,y)$:**
    Moment of inertia about the $x$-axis: $I_x = \iint_R y^2 \sigma(x,y) \, dA$
    Moment of inertia about the $y$-axis: $I_y = \iint_R x^2 \sigma(x,y) \, dA$
    Moment of inertia about the origin (or $z$-axis, if the object is in $xy$-plane): $I_0 = I_z = \iint_R (x^2+y^2) \sigma(x,y) \, dA = \iint_R r^2 \sigma(x,y) \, dA$ (where $r^2 = x^2+y^2$)

*   **For a 3D object (solid) with density $\rho(x,y,z)$:**
    Moment of inertia about the $x$-axis: $I_x = \iiint_E (y^2+z^2) \rho(x,y,z) \, dV$ (Distance from x-axis is $\sqrt{y^2+z^2}$)
    Moment of inertia about the $y$-axis: $I_y = \iiint_E (x^2+z^2) \rho(x,y,z) \, dV$ (Distance from y-axis is $\sqrt{x^2+z^2}$)
    Moment of inertia about the $z$-axis: $I_z = \iiint_E (x^2+y^2) \rho(x,y,z) \, dV$ (Distance from z-axis is $\sqrt{x^2+y^2}$)

**What could go wrong:** Using the wrong distance squared. For $I_x$, the distance from the x-axis is $\sqrt{y^2+z^2}$, so you square that. For a 2D object in the $xy$-plane, $z=0$, so the distance from the x-axis is just $y$. Always visualize the axis and the perpendicular distance of a point $(x,y,z)$ from that axis.

### Step 6: Parallel Axis Theorem

**Plain English:** Sometimes you know the moment of inertia of an object about an axis that passes through its centre of mass (often denoted $I_{CM}$), but you need to find its moment of inertia about a *different* axis that is parallel to the first one. The Parallel Axis Theorem gives you a shortcut: you don't have to re-calculate the entire integral. You just take the moment of inertia about the centre of mass axis, add the total mass of the object multiplied by the square of the distance between the two parallel axes.

**Small concrete example:** You know the moment of inertia of a thin rod about its center ($I_{CM} = ML^2/12$). You want to find its moment of inertia about one of its ends. The distance $d$ between the center and the end is $L/2$. So, $I_{end} = I_{CM} + Md^2 = ML^2/12 + M(L/2)^2 = ML^2/12 + ML^2/4 = ML^2/12 + 3ML^2/12 = 4ML^2/12 = ML^2/3$.

**The formal/mathematical version:**
If $I_{CM}$ is the moment of inertia of an object about an axis passing through its centre of mass, and $I$ is the moment of inertia about a parallel axis at a distance $d$ from the first axis, then:
$$ I = I_{CM} + Md^2 $$
where $M$ is the total mass of the object.

**What could go wrong:** This theorem only applies if the two axes are *parallel*. It cannot be used for axes that intersect or are skewed. Also, ensure you use the correct distance $d$ between the two parallel axes.

## 5. Worked examples — multiple, with every step shown

### Example 1: Mass and Center of Mass of a 1D Rod (Easy)

**Problem:** A thin rod of length $L=4$ meters lies along the x-axis from $x=0$ to $x=4$. Its linear density is given by $\lambda(x) = (1 + x/2)$ kg/m. Find the total mass and the center of mass of the rod.

**Identify what's given and what we want:**
Given:
*   Length of rod: $L=4$ m (from $x=0$ to $x=4$)
*   Linear density function: $\lambda(x) = 1 + x/2$ kg/m
Want:
*   Total mass $M$
*   Center of mass $\bar{x}$

**Show every algebraic / logical step:**

**Step 1: Calculate the total mass $M$.**
The formula for the mass of a 1D object is $M = \int_a^b \lambda(x) \, dx$.
$$ M = \int_0^4 \left(1 + \frac{x}{2}\right) \, dx $$
This integral sums up the mass of infinitesimally small segments of the rod.
$$ M = \left[x + \frac{x^2}{4}\right]_0^4 $$
We integrate term by term. The integral of $1$ is $x$, and the integral of $x/2$ is $x^2/4$.
$$ M = \left(4 + \frac{4^2}{4}\right) - \left(0 + \frac{0^2}{4}\right) $$
Now, we evaluate the definite integral by plugging in the upper and lower limits.
$$ M = (4 + 4) - 0 $$
$$ M = 8 $$
The total mass of the rod is 8 kg.

**Step 2: Calculate the moment about the origin ($M_0$).**
The formula for the moment about the origin for a 1D object is $M_0 = \int_a^b x \lambda(x) \, dx$.
$$ M_0 = \int_0^4 x \left(1 + \frac{x}{2}\right) \, dx $$
This integral sums up the product of each tiny mass element's position ($x$) and its mass ($dm = \lambda(x) \, dx$).
$$ M_0 = \int_0^4 \left(x + \frac{x^2}{2}\right) \, dx $$
First, distribute $x$ into the density function.
$$ M_0 = \left[\frac{x^2}{2} + \frac{x^3}{6}\right]_0^4 $$
Integrate term by term. The integral of $x$ is $x^2/2$, and the integral of $x^2/2$ is $x^3/6$.
$$ M_0 = \left(\frac{4^2}{2} + \frac{4^3}{6}\right) - \left(\frac{0^2}{2} + \frac{0^3}{6}\right) $$
Evaluate the definite integral.
$$ M_0 = \left(\frac{16}{2} + \frac{64}{6}\right) - 0 $$
$$ M_0 = 8 + \frac{32}{3} $$
$$ M_0 = \frac{24}{3} + \frac{32}{3} = \frac{56}{3} $$
The moment about the origin is $56/3$ kg·m.

**Step 3: Calculate the center of mass $\bar{x}$.**
The formula for the center of mass is $\bar{x} = M_0 / M$.
$$ \bar{x} = \frac{56/3}{8} $$
We divide the total moment by the total mass.
$$ \bar{x} = \frac{56}{3 \times 8} $$
$$ \bar{x} = \frac{56}{24} $$
$$ \bar{x} = \frac{7}{3} $$
$$ \bar{x} \approx 2.33 $$
The center of mass is at $x = 7/3$ meters.

**Final Answer:**
The total mass of the rod is $\boxed{8 \text{ kg}}$.
The center of mass of the rod is at $\boxed{\bar{x} = \frac{7}{3} \text{ m}}$.

**Reflection:** This example was straightforward because it's a 1D problem. The density function was simple, leading to easy polynomial integration. The key is to correctly set up the integral for mass and moment, remembering to multiply the density by $x$ for the moment calculation. Since the density increases with $x$, it makes sense that the center of mass is to the right of the geometric center ($x=2$).

---

### Example 2: Mass and Center of Mass of a 2D Lamina with Constant Density (Medium)

**Problem:** Find the mass and the center of mass of a lamina in the shape of a triangle with vertices $(0,0)$, $(2,0)$, and $(0,3)$. Assume the lamina has a constant surface density $\sigma = 5$ kg/m$^2$.

**Identify what's given and what we want:**
Given:
*   Vertices of the triangular lamina: $(0,0)$, $(2,0)$, $(0,3)$
*   Constant surface density: $\sigma(x,y) = 5$ kg/m$^2$
Want:
*   Total mass $M$
*   Center of mass $(\bar{x}, \bar{y})$

**Show every algebraic / logical step:**

**Step 1: Define the region of integration.**
The vertices are $(0,0)$, $(2,0)$ on the x-axis, and $(0,3)$ on the y-axis.
The hypotenuse connects $(2,0)$ and $(0,3)$.
The equation of the line connecting $(2,0)$ and $(0,3)$ can be found using the two-point form or slope-intercept form.
Slope $m = (3-0)/(0-2) = -3/2$.
Using point $(0,3)$: $y - 3 = -\frac{3}{2}(x - 0) \implies y = -\frac{3}{2}x + 3$.
So, the region $R$ is bounded by $x=0$, $y=0$, and $y = -\frac{3}{2}x + 3$.
We can integrate with respect to $y$ first, then $x$:
$0 \le y \le -\frac{3}{2}x + 3$
$0 \le x \le 2$

**Step 2: Calculate the total mass $M$.**
The formula for the mass of a 2D object is $M = \iint_R \sigma(x,y) \, dA$. Since $\sigma(x,y) = 5$ (constant), we have:
$$ M = \iint_R 5 \, dy \, dx $$
This integral sums up the mass of tiny area elements over the region.
$$ M = \int_0^2 \int_0^{-\frac{3}{2}x+3} 5 \, dy \, dx $$
First, integrate with respect to $y$.
$$ M = \int_0^2 \left[5y\right]_0^{-\frac{3}{2}x+3} \, dx $$
$$ M = \int_0^2 5\left(-\frac{3}{2}x+3\right) \, dx $$
Now, integrate with respect to $x$.
$$ M = \int_0^2 \left(-\frac{15}{2}x+15\right) \, dx $$
$$ M = \left[-\frac{15}{2}\frac{x^2}{2} + 15x\right]_0^2 $$
$$ M = \left[-\frac{15}{4}x^2 + 15x\right]_0^2 $$
Evaluate the definite integral.
$$ M = \left(-\frac{15}{4}(2)^2 + 15(2)\right) - \left(-\frac{15}{4}(0)^2 + 15(0)\right) $$
$$ M = \left(-\frac{15}{4}(4) + 30\right) - 0 $$
$$ M = -15 + 30 $$
$$ M = 15 $$
The total mass of the lamina is 15 kg. (Alternatively, Area = $1/2 \times \text{base} \times \text{height} = 1/2 \times 2 \times 3 = 3$. Mass = density $\times$ Area = $5 \times 3 = 15$. This confirms the integral calculation.)

**Step 3: Calculate the moment about the x-axis ($M_x$).**
The formula for $M_x$ is $M_x = \iint_R y \sigma(x,y) \, dA$.
$$ M_x = \int_0^2 \int_0^{-\frac{3}{2}x+3} y \cdot 5 \, dy \, dx $$
This integral sums up the product of each tiny mass element's y-coordinate and its mass.
$$ M_x = \int_0^2 \left[\frac{5y^2}{2}\right]_0^{-\frac{3}{2}x+3} \, dx $$
Integrate with respect to $y$.
$$ M_x = \int_0^2 \frac{5}{2}\left(-\frac{3}{2}x+3\right)^2 \, dx $$
Expand the squared term: $(-\frac{3}{2}x+3)^2 = \frac{9}{4}x^2 - 2(\frac{3}{2}x)(3) + 9 = \frac{9}{4}x^2 - 9x + 9$.
$$ M_x = \frac{5}{2} \int_0^2 \left(\frac{9}{4}x^2 - 9x + 9\right) \, dx $$
Now, integrate with respect to $x$.
$$ M_x = \frac{5}{2} \left[\frac{9}{4}\frac{x^3}{3} - 9\frac{x^2}{2} + 9x\right]_0^2 $$
$$ M_x = \frac{5}{2} \left[\frac{3}{4}x^3 - \frac{9}{2}x^2 + 9x\right]_0^2 $$
Evaluate the definite integral.
$$ M_x = \frac{5}{2} \left(\frac{3}{4}(2)^3 - \frac{9}{2}(2)^2 + 9(2)\right) - 0 $$
$$ M_x = \frac{5}{2} \left(\frac{3}{4}(8) - \frac{9}{2}(4) + 18\right) $$
$$ M_x = \frac{5}{2} (6 - 18 + 18) $$
$$ M_x = \frac{5}{2} (6) $$
$$ M_x = 15 $$
The moment about the x-axis is 15 kg·m.

**Step 4: Calculate the moment about the y-axis ($M_y$).**
The formula for $M_y$ is $M_y = \iint_R x \sigma(x,y) \, dA$.
$$ M_y = \int_0^2 \int_0^{-\frac{3}{2}x+3} x \cdot 5 \, dy \, dx $$
This integral sums up the product of each tiny mass element's x-coordinate and its mass.
$$ M_y = \int_0^2 \left[5xy\right]_0^{-\frac{3}{2}x+3} \, dx $$
Integrate with respect to $y$.
$$ M_y = \int_0^2 5x\left(-\frac{3}{2}x+3\right) \, dx $$
$$ M_y = \int_0^2 \left(-\frac{15}{2}x^2+15x\right) \, dx $$
Now, integrate with respect to $x$.
$$ M_y = \left[-\frac{15}{2}\frac{x^3}{3} + 15\frac{x^2}{2}\right]_0^2 $$
$$ M_y = \left[-\frac{5}{2}x^3 + \frac{15}{2}x^2\right]_0^2 $$
Evaluate the definite integral.
$$ M_y = \left(-\frac{5}{2}(2)^3 + \frac{15}{2}(2)^2\right) - 0 $$
$$ M_y = \left(-\frac{5}{2}(8) + \frac{15}{2}(4)\right) $$
$$ M_y = (-20 + 30) $$
$$ M_y = 10 $$
The moment about the y-axis is 10 kg·m.

**Step 5: Calculate the center of mass $(\bar{x}, \bar{y})$.**
The formulas are $\bar{x} = M_y / M$ and $\bar{y} = M_x / M$.
$$ \bar{x} = \frac{10}{15} = \frac{2}{3} $$
$$ \bar{y} = \frac{15}{15} = 1 $$

**Final Answer:**
The total mass of the lamina is $\boxed{15 \text{ kg}}$.
The center of mass of the lamina is $\boxed{\left(\frac{2}{3}, 1\right)}$.

**Reflection:** This example involved a non-rectangular region, which required careful setup of the integration limits. Since the density was constant, the calculations were simpler than if it were variable. It's a good check that for a triangle, the centroid (center of mass for constant density) is at $(x_1+x_2+x_3)/3, (y_1+y_2+y_3)/3$. Here, $(0+2+0)/3 = 2/3$ and $(0+0+3)/3 = 1$, which matches our result. This confirms our calculations.

---

### Example 3: Mass and Center of Mass of a 2D Lamina with Variable Density (Harder)

**Problem:** A lamina occupies the region $D$ in the first quadrant bounded by the circle $x^2+y^2=1$ and the coordinate axes. Its surface density is given by $\sigma(x,y) = x+y$ kg/m$^2$. Find the total mass and the center of mass of the lamina.

**Identify what's given and what we want:**
Given:
*   Region $D$: first quadrant of the unit circle ($x^2+y^2=1$, $x \ge 0, y \ge 0$).
*   Surface density function: $\sigma(x,y) = x+y$ kg/m$^2$.
Want:
*   Total mass $M$
*   Center of mass $(\bar{x}, \bar{y})$

**Show every algebraic / logical step:**

**Step 1: Choose a coordinate system and define the region.**
The region is a quarter circle, which strongly suggests using polar coordinates.
In polar coordinates:
*   $x = r \cos\theta$
*   $y = r \sin\theta$
*   $dA = r \, dr \, d\theta$
*   The density function becomes $\sigma(r,\theta) = r \cos\theta + r \sin\theta = r(\cos\theta + \sin\theta)$.
The region $D$ is $0 \le r \le 1$ and $0 \le \theta \le \pi/2$.

**Step 2: Calculate the total mass $M$.**
$$ M = \iint_D \sigma(x,y) \, dA = \int_0^{\pi/2} \int_0^1 r(\cos\theta + \sin\theta) \cdot r \, dr \, d\theta $$
Substitute the polar forms for $\sigma$ and $dA$.
$$ M = \int_0^{\pi/2} \int_0^1 r^2(\cos\theta + \sin\theta) \, dr \, d\theta $$
This separates nicely into two independent integrals.
$$ M = \left(\int_0^1 r^2 \, dr\right) \left(\int_0^{\pi/2} (\cos\theta + \sin\theta) \, d\theta\right) $$
Integrate with respect to $r$:
$$ \int_0^1 r^2 \, dr = \left[\frac{r^3}{3}\right]_0^1 = \frac{1^3}{3} - 0 = \frac{1}{3} $$
Integrate with respect to $\theta$:
$$ \int_0^{\pi/2} (\cos\theta + \sin\theta) \, d\theta = \left[\sin\theta - \cos\theta\right]_0^{\pi/2} $$
$$ = (\sin(\pi/2) - \cos(\pi/2)) - (\sin(0) - \cos(0)) $$
$$ = (1 - 0) - (0 - 1) = 1 - (-1) = 2 $$
Now, multiply the results:
$$ M = \frac{1}{3} \times 2 = \frac{2}{3} $$
The total mass of the lamina is $2/3$ kg.

**Step 3: Calculate the moment about the x-axis ($M_x$).**
The formula for $M_x$ is $M_x = \iint_D y \sigma(x,y) \, dA$.
$$ M_x = \int_0^{\pi/2} \int_0^1 (r \sin\theta) \cdot r(\cos\theta + \sin\theta) \cdot r \, dr \, d\theta $$
Substitute $y=r\sin\theta$, $\sigma(r,\theta)$, and $dA$.
$$ M_x = \int_0^{\pi/2} \int_0^1 r^3 \sin\theta (\cos\theta + \sin\theta) \, dr \, d\theta $$
$$ M_x = \int_0^{\pi/2} \sin\theta \cos\theta + \sin^2\theta \, d\theta \int_0^1 r^3 \, dr $$
Integrate with respect to $r$:
$$ \int_0^1 r^3 \, dr = \left[\frac{r^4}{4}\right]_0^1 = \frac{1}{4} $$
Integrate with respect to $\theta$:
We use the identity $\sin^2\theta = \frac{1-\cos(2\theta)}{2}$ and substitution for $\sin\theta\cos\theta$: let $u=\sin\theta$, $du=\cos\theta\,d\theta$.
$$ \int_0^{\pi/2} (\sin\theta \cos\theta + \sin^2\theta) \, d\theta = \int_0^{\pi/2} \sin\theta \cos\theta \, d\theta + \int_0^{\pi/2} \frac{1-\cos(2\theta)}{2} \, d\theta $$
$$ = \left[\frac{\sin^2\theta}{2}\right]_0^{\pi/2} + \left[\frac{1}{2}\theta - \frac{\sin(2\theta)}{4}\right]_0^{\pi/2} $$
$$ = \left(\frac{\sin^2(\pi/2)}{2} - \frac{\sin^2(0)}{2}\right) + \left(\frac{1}{2}(\pi/2) - \frac{\sin(\pi)}{4}\right) - \left(0 - \frac{\sin(0)}{4}\right) $$
$$ = \left(\frac{1}{2} - 0\right) + \left(\frac{\pi}{4} - 0\right) - 0 = \frac{1}{2} + \frac{\pi}{4} $$
Now, multiply the results:
$$ M_x = \frac{1}{4} \times \left(\frac{1}{2} + \frac{\pi}{4}\right) = \frac{1}{8} + \frac{\pi}{16} $$
The moment about the x-axis is $\left(\frac{1}{8} + \frac{\pi}{16}\right)$ kg·m.

**Step 4: Calculate the moment about the y-axis ($M_y$).**
The formula for $M_y$ is $M_y = \iint_D x \sigma(x,y) \, dA$.
$$ M_y = \int_0^{\pi/2} \int_0^1 (r \cos\theta) \cdot r(\cos\theta + \sin\theta) \cdot r \, dr \, d\theta $$
Substitute $x=r\cos\theta$, $\sigma(r,\theta)$, and $dA$.
$$ M_y = \int_0^{\pi/2} \int_0^1 r^3 \cos\theta (\cos\theta + \sin\theta) \, dr \, d\theta $$
$$ M_y = \int_0^{\pi/2} \cos^2\theta + \sin\theta \cos\theta \, d\theta \int_0^1 r^3 \, dr $$
Integrate with respect to $r$: (Same as for $M_x$)
$$ \int_0^1 r^3 \, dr = \frac{1}{4} $$
Integrate with respect to $\theta$:
We use the identity $\cos^2\theta = \frac{1+\cos(2\theta)}{2}$.
$$ \int_0^{\pi/2} (\cos^2\theta + \sin\theta \cos\theta) \, d\theta = \int_0^{\pi/2} \frac{1+\cos(2\theta)}{2} \, d\theta + \int_0^{\pi/2} \sin\theta \cos\theta \, d\theta $$
$$ = \left[\frac{1}{2}\theta + \frac{\sin(2\theta)}{4}\right]_0^{\pi/2} + \left[\frac{\sin^2\theta}{2}\right]_0^{\pi/2} $$
$$ = \left(\frac{1}{2}(\pi/2) + \frac{\sin(\pi)}{4}\right) - (0 + 0) + \left(\frac{\sin^2(\pi/2)}{2} - 0\right) $$
$$ = \frac{\pi}{4} + 0 + \frac{1}{2} = \frac{\pi}{4} + \frac{1}{2} $$
Now, multiply the results:
$$ M_y = \frac{1}{4} \times \left(\frac{\pi}{4} + \frac{1}{2}\right) = \frac{\pi}{16} + \frac{1}{8} $$
The moment about the y-axis is $\left(\frac{\pi}{16} + \frac{1}{8}\right)$ kg·m.
Notice $M_x = M_y$. This makes sense because the region is symmetric with respect to $y=x$, and the density function $\sigma(x,y)=x+y$ is also symmetric ($x+y$ is the same as $y+x$).

**Step 5: Calculate the center of mass $(\bar{x}, \bar{y})$.**
The formulas are $\bar{x} = M_y / M$ and $\bar{y} = M_x / M$.
$$ \bar{x} = \frac{\frac{\pi}{16} + \frac{1}{8}}{\frac{2}{3}} = \frac{\frac{\pi+2}{16}}{\frac{2}{3}} = \frac{\pi+2}{16} \times \frac{3}{2} = \frac{3(\pi+2)}{32} $$
$$ \bar{y} = \frac{\frac{1}{8} + \frac{\pi}{16}}{\frac{2}{3}} = \frac{3(\pi+2)}{32} $$

**Final Answer:**
The total mass of the lamina is $\boxed{\frac{2}{3} \text{ kg}}$.
The center of mass of the lamina is $\boxed{\left(\frac{3(\pi+2)}{32}, \frac{3(\pi+2)}{32}\right)}$.

**Reflection:** This example highlights the importance of choosing the correct coordinate system. Polar coordinates simplified the region and the density function significantly. The integration of trigonometric functions (especially $\sin^2\theta$ and $\cos^2\theta$) is a common step in these problems and requires knowledge of power-reduction formulas. The symmetry of the problem (both region and density) was a good check for the equality of $M_x$ and $M_y$.

---

### Example 4: Moment of Inertia of a 3D Solid (Hardest)

**Problem:** Find the moment of inertia about the z-axis of a solid cone with height $H$ and base radius $R$. Assume the cone has a constant volume density $\rho_0$ kg/m$^3$. The cone's base is in the $xy$-plane, centered at the origin, and its apex is at $(0,0,H)$.

**Identify what's given and what we want:**
Given:
*   Solid cone: height $H$, base radius $R$.
*   Base in $xy$-plane, centered at origin. Apex at $(0,0,H)$.
*   Constant volume density: $\rho(x,y,z) = \rho_0$ kg/m$^3$.
Want:
*   Moment of inertia about the z-axis ($I_z$).

**Show every algebraic / logical step:**

**Step 1: Choose a coordinate system and define the region.**
The cone geometry and the axis of rotation (z-axis) strongly suggest cylindrical coordinates.
In cylindrical coordinates:
*   $x = r \cos\theta$
*   $y = r \sin\theta$
*   $dV = r \, dz \, dr \, d\theta$
The equation of the cone's side can be found. The radius $r$ decreases linearly from $R$ at $z=0$ to $0$ at $z=H$.
So, $r = \frac{R}{H}(H-z)$.
The limits of integration are:
*   $0 \le \theta \le 2\pi$ (full circle)
*   $0 \le z \le H$ (full height)
*   $0 \le r \le \frac{R}{H}(H-z)$ (radius depends on $z$)

**Step 2: Set up the integral for the moment of inertia about the z-axis ($I_z$).**
The formula for $I_z$ for a 3D object is $I_z = \iiint_E (x^2+y^2) \rho(x,y,z) \, dV$.
In cylindrical coordinates, $x^2+y^2 = r^2$, and $\rho(x,y,z) = \rho_0$.
$$ I_z = \iiint_E r^2 \rho_0 \, dV $$
$$ I_z = \int_0^{2\pi} \int_0^H \int_0^{\frac{R}{H}(H-z)} r^2 \rho_0 \cdot r \, dr \, dz \, d\theta $$
$$ I_z = \rho_0 \int_0^{2\pi} \int_0^H \int_0^{\frac{R}{H}(H-z)} r^3 \, dr \, dz \, d\theta $$
We can pull out the constant density $\rho_0$.

**Step 3: Integrate with respect to $r$.**
$$ \int_0^{\frac{R}{H}(H-z)} r^3 \, dr = \left[\frac{r^4}{4}\right]_0^{\frac{R}{H}(H-z)} $$
$$ = \frac{1}{4} \left(\frac{R}{H}(H-z)\right)^4 $$
$$ = \frac{R^4}{4H^4}(H-z)^4 $$

**Step 4: Integrate with respect to $z$.**
Substitute the result from Step 3 back into the integral for $I_z$:
$$ I_z = \rho_0 \int_0^{2\pi} \int_0^H \frac{R^4}{4H^4}(H-z)^4 \, dz \, d\theta $$
We can pull out the constants $\frac{R^4}{4H^4}$:
$$ I_z = \frac{\rho_0 R^4}{4H^4} \int_0^{2\pi} \int_0^H (H-z)^4 \, dz \, d\theta $$
Now, integrate $(H-z)^4$ with respect to $z$. Let $u = H-z$, so $du = -dz$. When $z=0, u=H$. When $z=H, u=0$.
$$ \int_0^H (H-z)^4 \, dz = \int_H^0 u^4 (-du) = -\int_H^0 u^4 \, du $$
$$ = \int_0^H u^4 \, du = \left[\frac{u^5}{5}\right]_0^H = \frac{H^5}{5} - 0 = \frac{H^5}{5} $$

**Step 5: Integrate with respect to $\theta$.**
Substitute the result from Step 4:
$$ I_z = \frac{\rho_0 R^4}{4H^4} \int_0^{2\pi} \frac{H^5}{5} \, d\theta $$
$$ I_z = \frac{\rho_0 R^4 H^5}{20H^4} \int_0^{2\pi} \, d\theta $$
$$ I_z = \frac{\rho_0 R^4 H}{20} [\theta]_0^{2\pi} $$
$$ I_z = \frac{\rho_0 R^4 H}{20} (2\pi - 0) $$
$$ I_z = \frac{2\pi \rho_0 R^4 H}{20} = \frac{\pi \rho_0 R^4 H}{10} $$

**Step 6: Express $I_z$ in terms of total mass $M$.**
First, let's find the total mass $M$ of the cone.
Volume of a cone $V = \frac{1}{3}\pi R^2 H$.
So, $M = \rho_0 V = \rho_0 \frac{1}{3}\pi R^2 H$.
From this, we can express $\rho_0 = \frac{3M}{\pi R^2 H}$.
Substitute this into the expression for $I_z$:
$$ I_z = \frac{\pi}{10} \left(\frac{3M}{\pi R^2 H}\right) R^4 H $$
$$ I_z = \frac{3M R^4 H}{10 R^2 H} $$
$$ I_z = \frac{3}{10} M R^2 $$

**Final Answer:**
The moment of inertia of the cone about the z-axis is $\boxed{\frac{3}{10} M R^2}$.

**Reflection:** This was a challenging problem due to the 3D integration and the variable limit for $r$. Choosing cylindrical coordinates was crucial for simplifying the setup. The key steps were correctly defining the limits for $r$ as a function of $z$ (the cone's tapering shape) and then performing the iterated integration carefully. Finally, expressing the answer in terms of the total mass $M$ is a standard practice in physics and engineering, making the result more general and easier to compare with tabulated values.

## 6. Common mistakes and traps

1.  **Confusing moments ($M_x, M_y$) with coordinates of center of mass ($\bar{x}, \bar{y}$):** Students often mix up $M_x$ and $\bar{x}$, or $M_y$ and $\bar{y}$. Remember that $\bar{x} = M_y/M$ and $\bar{y} = M_x/M$. The moment *about* the y-axis ($M_y$) tells you about the x-coordinate of the center of mass, and vice-versa. This is because $x$ is the distance from the y-axis, and $y$ is the distance from the x-axis.
2.  **Incorrectly setting up limits of integration:** This is perhaps the most frequent error. For 2D regions, visualize how the inner integral's limits depend on the outer variable. For 3D, ensure all three limits correctly define the solid. Sketching the region is almost always necessary.
3.  **Forgetting the density function or treating variable density as constant:** If the density $\rho$ (or $\sigma$, or $\lambda$) is given as a function of $x,y,z$, it *must* be included in the integrand. Only if it's explicitly stated as constant can it be pulled out of the integral.
4.  **Using the wrong distance squared for moments of inertia:** For $I_x$, the distance from the x-axis is $\sqrt{y^2+z^2}$, so the integrand is $(y^2+z^2)\rho \, dV$. For $I_y$, it's $(x^2+z^2)\rho \, dV$. For $I_z$, it's $(x^2+y^2)\rho \, dV$. Do not use $x^2$ for $I_x$ or $y^2$ for $I_y$ in 3D problems; this only applies to 2D objects in the $xy$-plane where $z=0$.
5.  **Errors in coordinate system transformations:** When switching to polar, cylindrical, or spherical coordinates, remember to:
    *   Replace $x,y,z$ in the integrand (density, moment arm) with their coordinate equivalents.
    *   Replace $dA$ or $dV$ with the correct Jacobian factor (e.g., $r \, dr \, d\theta$, $r \, dz \, dr \, d\theta$, $\rho^2 \sin\phi \, d\rho \, d\phi \, d\theta$).
    *   Correctly transform the limits of integration for the new variables.
6.  **Algebraic and trigonometric calculation errors:** These integrals often involve polynomials, trigonometric functions, or substitutions. Be meticulous with algebra, signs, and trigonometric identities (e.g., $\sin^2\theta = (1-\cos(2\theta))/2$).

## 7. Textbook-precise explanation

Let $D$ be a region in $\mathbb{R}^n$ (where $n=1, 2,$ or $3$) occupied by a physical object. Let $\rho(\mathbf{x})$ be the density function of the object at a point $\mathbf{x} = (x,y,z) \in D$. The density function describes the mass per unit length (for 1D objects, $\lambda$), mass per unit area (for 2D objects, $\sigma$), or mass per unit volume (for 3D objects, $\rho$) at any given point.

**Total Mass ($M$):**
The total mass $M$ of the object is the integral of its density function over the region it occupies.
*   **For a 1D object (curve $C$)**: $M = \int_C \lambda(\mathbf{x}) \, ds$
*   **For a 2D object (lamina $R$ in $xy$-plane)**: $M = \iint_R \sigma(x,y) \, dA$
*   **For a 3D object (solid $E$)**: $M = \iiint_E \rho(x,y,z) \, dV$

**Moments of Mass (First Moments):**
The first moments measure the distribution of mass relative to a specific axis or plane. They are the weighted average of the position coordinates, where the weights are the differential masses.

*   **For a 2D lamina $R$ with density $\sigma(x,y)$**:
    *   Moment about the $x$-axis: $M_x = \iint_R y \sigma(x,y) \, dA$
    *   Moment about the $y$-axis: $M_y = \iint_R x \sigma(x,y) \, dA$

*   **For a 3D solid $E$ with density $\rho(x,y,z)$**:
    *   Moment about the $yz$-plane: $M_{yz} = \iiint_E x \rho(x,y,z) \, dV$
    *   Moment about the $xz$-plane: $M_{xz} = \iiint_E y \rho(x,y,z) \, dV$
    *   Moment about the $xy$-plane: $M_{xy} = \iiint_E z \rho(x,y,z) \, dV$

**Centre of Mass (Centroid):**
The centre of mass $(\bar{x}, \bar{y}, \bar{z})$ is the point where the object would balance perfectly. It is calculated by dividing the first moments by the total mass.

*   **For a 1D object**: $\bar{x} = \frac{\int_C x \lambda(\mathbf{x}) \, ds}{M}$
*   **For a 2D lamina**: $(\bar{x}, \bar{y}) = \left(\frac{M_y}{M}, \frac{M_x}{M}\right)$
*   **For a 3D solid**: $(\bar{x}, \bar{y}, \bar{z}) = \left(\frac{M_{yz}}{M}, \frac{M_{xz}}{M}, \frac{M_{xy}}{M}\right)$
If the density is constant, the centre of mass is also called the centroid.

**Moments of Inertia (Second Moments):**
The moments of inertia (also called second moments of mass) quantify an object's resistance to angular acceleration about a given axis. They are calculated by integrating the square of the perpendicular distance from the axis of rotation, weighted by the differential mass.

*   **For a 2D lamina $R$ with density $\sigma(x,y)$**:
    *   About the $x$-axis: $I_x = \iint_R y^2 \sigma(x,y) \, dA$
    *   About the $y$-axis: $I_y = \iint_R x^2 \sigma(x,y) \, dA$
    *   About the $z$-axis (or origin, for a 2D object): $I_z = I_0 = \iint_R (x^2+y^2) \sigma(x,y) \, dA = \iint_R r^2 \sigma(x,y) \, dA$

*   **For a 3D solid $E$ with density $\rho(x,y,z)$**:
    *   About the $x$-axis: $I_x = \iiint_E (y^2+z^2) \rho(x,y,z) \, dV$
    *   About the $y$-axis: $I_y = \iiint_E (x^2+z^2) \rho(x,y,z) \, dV$
    *   About the $z$-axis: $I_z = \iiint_E (x^2+y^2) \rho(x,y,z) \, dV$

**Parallel Axis Theorem:**
If $I_{CM}$ is the moment of inertia of an object about an axis passing through its centre of mass, then the moment of inertia $I$ about any parallel axis at a perpendicular distance $d$ from the $CM$ axis is given by:
$$ I = I_{CM} + Md^2 $$
where $M$ is the total mass of the object.

These definitions are standard in multivariable calculus and introductory physics textbooks. For instance, see Chapter 15 ("Multiple Integrals") in *Calculus* by James Stewart, particularly sections on "Mass and Center of Mass" and "Moments of Inertia."

## 8. ASCII diagrams

Here's an ASCII diagram illustrating a 2D lamina, its center of mass, and axes for moments.

```text
       y
       ^
       |
  (0,3)X
       |\
       | \
       |  \
       |   \
       |    \
       |     \
       |      \
       |       \
       +