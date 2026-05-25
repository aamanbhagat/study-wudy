## 1. What it is — in plain English

Imagine you're trying to tell someone exactly where something is in your room. If your room was perfectly flat, like a piece of paper, you might say, "It's 3 steps to the right and 2 steps forward from the door." This is essentially what a 2D coordinate system does: it gives you two numbers (like 'right/left' and 'forward/back') to pinpoint a location on a flat surface.

Now, what if your room isn't flat? What if you want to describe the location of a drone flying inside your room, or a light fixture on the ceiling? You need more information than just right/left and forward/back. You also need to know how high up it is! Is it near the floor, in the middle of the room, or close to the ceiling?

A 3D coordinate system simply adds this third piece of information: 'up/down'. So, instead of two numbers, you use three numbers to describe any point in space. These three numbers tell you how far to go along three special, perpendicular directions, typically called the x-axis, y-axis, and z-axis, starting from a central point called the "origin."

Think of it like a universal address system for any point in the entire universe. The x-axis might be your 'east-west' direction, the y-axis your 'north-south' direction, and the z-axis your 'up-down' direction. Every single point in space gets a unique address, like $(5, -2, 7)$, which means 5 units along x, -2 units along y (meaning 2 units in the opposite direction of positive y), and 7 units along z (7 units up).

## 2. Why it matters — real-world applications

The 3D coordinate system is fundamental to almost all modern technology and scientific understanding that deals with space and motion. Without it, our world as we know it would not exist.

1.  **Aerospace and Navigation:** Every airplane, drone, satellite, and rocket relies on 3D coordinates. GPS (Global Positioning System) receivers use signals from satellites to calculate their exact 3D position (latitude, longitude, and altitude) on Earth. Air traffic control uses 3D coordinates to track thousands of aircraft simultaneously, ensuring they don't collide. Spacecraft navigation, from launching to orbiting to landing on other planets, is entirely based on precise 3D positioning and trajectory calculations.

2.  **Computer Graphics and Virtual Reality:** When you play a video game, watch an animated movie, or use a VR headset, everything you see is built using 3D coordinates. Every character, object, and environment is a collection of points (vertices) defined by their $(x,y,z)$ coordinates. These points are connected to form shapes, and then textures and lighting are applied. Without 3D coordinates, there would be no way to represent or manipulate objects in a virtual 3D world.

3.  **Robotics and Autonomous Systems:** Robots, whether in a factory assembly line or an autonomous car, need to know where they are, where objects are, and where they need to go. This "spatial awareness" is achieved using 3D coordinate systems. A robotic arm picking up a component needs to calculate the component's 3D coordinates and then compute the precise 3D path its end effector must follow to reach and grasp it. Autonomous vehicles map their surroundings using sensors (like LiDAR) that generate point clouds, which are collections of 3D coordinates representing objects in the environment.

4.  **Medical Imaging:** Techniques like MRI (Magnetic Resonance Imaging) and CT (Computed Tomography) scans generate incredibly detailed 3D images of the human body. These machines work by taking "slices" of the body, and then using algorithms that reconstruct a full 3D model. Each tiny point (voxel, the 3D equivalent of a pixel) in these models has a specific $(x,y,z)$ coordinate, allowing doctors to precisely locate tumors, injuries, or anatomical structures within the body.

5.  **Physics and Engineering:** From designing bridges to simulating fluid dynamics, 3D coordinates are indispensable. Engineers use them to define the geometry of structures, calculate stress and strain at different points, and model how forces act in three dimensions. Physicists use 3D coordinates to describe the position and motion of particles, the shape of electric and magnetic fields, and the propagation of waves through space. For instance, understanding the path of a projectile or the orbit of a planet fundamentally relies on tracking its 3D coordinates over time.

## 3. Prerequisites — what you must know first

Before diving deep into the 3D coordinate system, ensure you have a solid grasp of the following foundational concepts. If any of these feel unfamiliar, pause and review them first.

*   **Number Line:** Understanding how real numbers (positive, negative, and zero) are represented as points on a straight line, with direction and magnitude.
*   **Cartesian Coordinate System (2D):** The ability to locate points in a plane using an ordered pair $(x,y)$, where $x$ and $y$ are distances from two perpendicular axes (the x-axis and y-axis) intersecting at the origin $(0,0)$. You should be comfortable with quadrants and plotting points.
*   **Basic Algebra:** Proficiency in manipulating equations, substituting values, and understanding inequalities.
*   **Geometric Intuition:** A general ability to visualize shapes, lines, and planes in space, even if informally. This helps in understanding the spatial relationships described by coordinates.

## 4. The core idea — step by step

Let's build the 3D coordinate system piece by piece, starting from what you already know.

### Step 1: Extending from 2D to 3D

**Plain-English Statement:** Imagine your familiar flat map (the 2D coordinate plane). To make it 3D, we simply add a third direction that goes straight up and down, perpendicular to both directions on your map.

**Small Concrete Example:** In 2D, a point is $(x,y)$. If you're at $(3,2)$, you go 3 units right, 2 units up. To make it 3D, we add a $z$-coordinate. So, if we have $(3,2,5)$, it means 3 units right, 2 units up (on the "floor"), and then 5 units straight up from that spot on the floor.

**Formal/Mathematical Version:** In two dimensions, a point is an ordered pair $(x,y)$ belonging to the set of all real numbers squared, denoted $\mathbb{R}^2$. To extend this to three dimensions, we introduce a third coordinate, $z$, making a point an ordered triplet $(x,y,z)$ belonging to the set of all real numbers cubed, denoted $\mathbb{R}^3$.
$$ P = (x,y,z) \in \mathbb{R}^3 $$

**What Could Go Wrong:** Students sometimes struggle to visualize the transition from a flat plane to actual space. Don't just think of adding a number; think of adding a whole new, independent dimension of movement.

### Step 2: The Three Axes (x, y, z)

**Plain-English Statement:** Just like your 2D map has an 'east-west' (x-axis) and 'north-south' (y-axis) line, our 3D space has three fundamental, straight lines that are all perfectly perpendicular to each other. We call them the x-axis, y-axis, and z-axis. They are like the edges of a room that all meet at one corner.

**Small Concrete Example:** Hold out your right hand. Point your index finger straight forward (this is your positive x-axis). Point your middle finger straight to the left (this is your positive y-axis). Point your thumb straight up (this is your positive z-axis). This is the standard "right-handed coordinate system" used in mathematics and physics.

**Formal/Mathematical Version:** The 3D Cartesian coordinate system is defined by three mutually orthogonal (perpendicular) directed lines, called the coordinate axes. These are typically denoted as the $x$-axis, $y$-axis, and $z$-axis. They intersect at a single point, the origin. The orientation is conventionally chosen to be a *right-handed system*, meaning that if you curl the fingers of your right hand from the positive $x$-axis to the positive $y$-axis, your thumb points in the direction of the positive $z$-axis.

**What Could Go Wrong:** Confusing the orientation of the axes. While mathematically any three mutually perpendicular axes work, the right-handed convention is standard. If you use a left-handed system (e.g., if your thumb pointed down when curling from x to y), some formulas (like cross products in vector calculus) would change their sign. Stick to the right-hand rule.

### Step 3: The Origin

**Plain-English Statement:** The origin is the central starting point for all our measurements. It's where all three axes cross. Its address is $(0,0,0)$ because you haven't moved any distance along any axis yet.

**Small Concrete Example:** If your room's corner is the origin, then to describe a point $(0,0,0)$ means you are standing right in that corner.

**Formal/Mathematical Version:** The point where the three coordinate axes intersect is called the origin. It is denoted by $O$ and has coordinates $(0,0,0)$. All coordinates of any other point are measured as directed distances from the origin along or parallel to the respective axes.

**What Could Go Wrong:** Forgetting that coordinates are relative to the origin. A point $(5,0,0)$ is 5 units *away* from the origin along the x-axis, not 5 units from some arbitrary point.

### Step 4: Plotting a Point $(x,y,z)$

**Plain-English Statement:** To find a point $(x,y,z)$, you start at the origin. First, move $x$ units along the x-axis (positive means in the positive direction, negative means in the negative direction). From there, move $y$ units parallel to the y-axis. Finally, from *that* spot, move $z$ units parallel to the z-axis. You've arrived!

**Small Concrete Example:** Let's plot the point $P(2,3,4)$:
1.  Start at $(0,0,0)$.
2.  Move 2 units along the positive x-axis. You are now at $(2,0,0)$.
3.  From $(2,0,0)$, move 3 units parallel to the positive y-axis. You are now at $(2,3,0)$. (This point is on the $xy$-plane, directly below or above $P$).
4.  From $(2,3,0)$, move 4 units parallel to the positive z-axis. You are now at $(2,3,4)$.

**Formal/Mathematical Version:** A point $P$ in $\mathbb{R}^3$ is uniquely identified by an ordered triplet $(x,y,z)$. The values $x, y, z$ are called the Cartesian coordinates of $P$. The coordinate $x$ represents the directed distance from the $yz$-plane to $P$, $y$ represents the directed distance from the $xz$-plane to $P$, and $z$ represents the directed distance from the $xy$-plane to $P$.

**What Could Go Wrong:** Mixing up the order of coordinates. $(2,3,4)$ is a completely different point from $(3,2,4)$ or $(4,3,2)$. Always remember the order: $(x,y,z)$. Also, misinterpreting negative signs; for example, $x=-2$ means moving 2 units in the *negative* x-direction.

### Step 5: Coordinate Planes

**Plain-English Statement:** When you combine any two of the axes, they form a flat surface, like a floor or a wall. These are called the coordinate planes. There are three of them.

*   The **$xy$-plane** is like the floor (or ceiling) where the $z$-coordinate is always zero.
*   The **$xz$-plane** is like one of the walls where the $y$-coordinate is always zero.
*   The **$yz$-plane** is like the other wall where the $x$-coordinate is always zero.

**Small Concrete Example:**
*   Any point on the $xy$-plane will look like $(x,y,0)$, e.g., $(5, -2, 0)$.
*   Any point on the $xz$-plane will look like $(x,0,z)$, e.g., $(1, 0, 7)$.
*   Any point on the $yz$-plane will look like $(0,y,z)$, e.g., $(0, 4, -3)$.

**Formal/Mathematical Version:** The three coordinate axes define three mutually perpendicular planes called the coordinate planes:
*   The **$xy$-plane** contains the $x$-axis and $y$-axis. Its equation is $z=0$.
*   The **$xz$-plane** contains the $x$-axis and $z$-axis. Its equation is $y=0$.
*   The **$yz$-plane** contains the $y$-axis and $z$-axis. Its equation is $x=0$.
These planes divide 3D space into eight regions.

**What Could Go Wrong:** Confusing which plane corresponds to which missing variable. A good way to remember is that the plane's name tells you which variables are *free* to change, and the missing variable is the one that *must be zero* on that plane. So, $xy$-plane means $x$ and $y$ can be anything, but $z$ must be zero.

### Step 6: Octants

**Plain-English Statement:** In 2D, the two axes divide the plane into four "quadrants." In 3D, the three coordinate planes divide all of space into eight "octants" (just like an octagon has 8 sides, an octant is one of eight parts). Each octant is defined by a specific combination of positive or negative signs for the $x, y,$ and $z$ coordinates.

**Small Concrete Example:**
*   The **first octant** is where all three coordinates are positive: $x>0, y>0, z>0$. This is the "front-top-right" section from the origin.
*   If a point is in the region where $x<0, y>0, z>0$, it would be in a different octant.

**Formal/Mathematical Version:** The three coordinate planes ($x=0, y=0, z=0$) divide $\mathbb{R}^3$ into eight regions called octants. The first octant is the region where all three coordinates are positive: $x>0, y>0, z>0$. There is no standard numbering convention for the other seven octants, though sometimes specific numbering schemes are used in particular contexts. It's usually clearer to describe them by the signs of their coordinates (e.g., "the octant where $x$ is negative, $y$ is positive, and $z$ is negative").

**What Could Go Wrong:** Forgetting that there are eight octants, not just four. Also, incorrectly identifying the signs for a given octant. Always think of the combination of positive/negative for $x$, then $y$, then $z$.

## 5. Worked examples — multiple, with every step shown

### Example 1: Plotting a point and identifying its properties

**Problem:** Consider the point $P(3, 5, 2)$.
a) Plot the point in a 3D coordinate system.
b) Identify which octant the point lies in.
c) Find the coordinates of the point's projection onto the $xy$-plane.

**Given:** Point $P(3, 5, 2)$.
**Want:** Plot, octant, projection onto $xy$-plane.

**Solution:**

a) **Plotting the point:**
1.  Start at the origin $(0,0,0)$.
2.  Move 3 units along the positive x-axis.
    *   *Explanation:* The first coordinate is $x=3$, so we move in the positive x-direction.
3.  From $(3,0,0)$, move 5 units parallel to the positive y-axis.
    *   *Explanation:* The second coordinate is $y=5$, so we move parallel to the positive y-direction. We are now at $(3,5,0)$.
4.  From $(3,5,0)$, move 2 units parallel to the positive z-axis.
    *   *Explanation:* The third coordinate is $z=2$, so we move parallel to the positive z-direction.
    *   The point is now located at $\mathbf{(3,5,2)}$.

b) **Identifying the octant:**
1.  Examine the signs of the coordinates:
    *   $x=3$ (positive)
    *   $y=5$ (positive)
    *   $z=2$ (positive)
    *   *Explanation:* All three coordinates are positive.
2.  The octant where all three coordinates are positive is by definition the **first octant**.
    *   *Explanation:* This is the standard definition for the first octant.

c) **Finding the projection onto the $xy$-plane:**
1.  Recall that the $xy$-plane is defined by $z=0$.
    *   *Explanation:* The $xy$-plane is the "floor" or "base" of the 3D space, where there is no "height" (z-value).
2.  To project a point $(x_0, y_0, z_0)$ onto the $xy$-plane, we simply set its $z$-coordinate to 0, resulting in $(x_0, y_0, 0)$.
    *   *Explanation:* Projection means finding the point directly "below" or "above" it on that plane. This involves keeping the $x$ and $y$ coordinates the same and forcing $z$ to be zero.
3.  For $P(3, 5, 2)$, its projection onto the $xy$-plane is $\mathbf{(3, 5, 0)}$.

**Reflection:** This example reinforces the basic understanding of coordinate signs and the definition of coordinate planes. The key is to remember which coordinate corresponds to which axis and which plane.

---

### Example 2: Working with negative coordinates and projections

**Problem:** A point $Q$ is located at $(-4, 1, -3)$.
a) In which octant does $Q$ lie?
b) Find the coordinates of the point's projection onto the $xz$-plane.
c) Find the coordinates of the point's projection onto the $y$-axis.

**Given:** Point $Q(-4, 1, -3)$.
**Want:** Octant, projection onto $xz$-plane, projection onto $y$-axis.

**Solution:**

a) **In which octant does $Q$ lie?**
1.  Examine the signs of the coordinates:
    *   $x=-4$ (negative)
    *   $y=1$ (positive)
    *   $z=-3$ (negative)
    *   *Explanation:* We need to identify the combination of signs.
2.  Therefore, $Q$ lies in the octant where $x$ is negative, $y$ is positive, and $z$ is negative.
    *   *Explanation:* Since there's no standard numbering for octants beyond the first, we describe it by the signs of its coordinates.

b) **Find the coordinates of the point's projection onto the $xz$-plane:**
1.  Recall that the $xz$-plane is defined by $y=0$.
    *   *Explanation:* The $xz$-plane is one of the "walls" where movement left/right (y-direction) is zero.
2.  To project a point $(x_0, y_0, z_0)$ onto the $xz$-plane, we set its $y$-coordinate to 0, resulting in $(x_0, 0, z_0)$.
    *   *Explanation:* This means we keep the $x$ and $z$ coordinates and force $y$ to be zero.
3.  For $Q(-4, 1, -3)$, its projection onto the $xz$-plane is $\mathbf{(-4, 0, -3)}$.

c) **Find the coordinates of the point's projection onto the $y$-axis:**
1.  Recall that the $y$-axis is defined by $x=0$ AND $z=0$.
    *   *Explanation:* The $y$-axis is a line, and on any axis, the other two coordinates must be zero.
2.  To project a point $(x_0, y_0, z_0)$ onto the $y$-axis, we set its $x$-coordinate to 0 and its $z$-coordinate to 0, resulting in $(0, y_0, 0)$.
    *   *Explanation:* This means we keep the $y$ coordinate and force both $x$ and $z$ to be zero.
3.  For $Q(-4, 1, -3)$, its projection onto the $y$-axis is $\mathbf{(0, 1, 0)}$.

**Reflection:** This example emphasizes understanding how to project onto planes *and* axes. The key is to remember which coordinates are zero for each specific plane or axis.

---

### Example 3: Finding a point given distances from coordinate planes

**Problem:** A point $R$ is 7 units from the $xy$-plane, -2 units from the $yz$-plane, and 4 units from the $xz$-plane. What are the coordinates of $R$?

**Given:**
*   Distance from $xy$-plane = 7
*   Distance from $yz$-plane = -2
*   Distance from $xz$-plane = 4

**Want:** Coordinates of $R(x,y,z)$.

**Solution:**

1.  **Interpret "distance from $xy$-plane":**
    *   The $xy$-plane is where $z=0$. The directed distance from a point $(x,y,z)$ to the $xy$-plane is simply $z$.
    *   *Explanation:* If you are 7 units "up" from the floor, your z-coordinate is 7. If you are 7 units "down", your z-coordinate is -7.
    *   Given distance = 7, so $z = 7$.

2.  **Interpret "distance from $yz$-plane":**
    *   The $yz$-plane is where $x=0$. The directed distance from a point $(x,y,z)$ to the $yz$-plane is simply $x$.
    *   *Explanation:* If you are 2 units to the "left" of the $yz$-plane (which is like a wall), your x-coordinate is -2. If you are 2 units "right", your x-coordinate is 2.
    *   Given distance = -2, so $x = -2$.

3.  **Interpret "distance from $xz$-plane":**
    *   The $xz$-plane is where $y=0$. The directed distance from a point $(x,y,z)$ to the $xz$-plane is simply $y$.
    *   *Explanation:* If you are 4 units "forward" from the $xz$-plane, your y-coordinate is 4. If you are 4 units "back", your y-coordinate is -4.
    *   Given distance = 4, so $y = 4$.

4.  **Assemble the coordinates:**
    *   We found $x=-2$, $y=4$, and $z=7$.
    *   The coordinates of point $R$ are $\mathbf{(-2, 4, 7)}$.

**Reflection:** This example tests the understanding that each coordinate ($x, y, z$) represents the directed distance from a *specific* coordinate plane ($yz$-plane, $xz$-plane, $xy$-plane, respectively). The sign of the distance is crucial.

---

### Example 4: Describing a region in 3D space

**Problem:** Describe the region in 3D space defined by the inequalities $0 \le x \le 3$, $-1 \le y \le 2$, and $0 \le z \le 5$.

**Given:** Inequalities $0 \le x \le 3$, $-1 \le y \le 2$, $0 \le z \le 5$.
**Want:** A description of the region.

**Solution:**

1.  **Analyze the $x$-inequality:** $0 \le x \le 3$.
    *   *Explanation:* This means the $x$-coordinate of any point in the region must be between 0 and 3, inclusive. It's a slab parallel to the $yz$-plane.
    *   This defines a region bounded by the planes $x=0$ (the $yz$-plane) and $x=3$.

2.  **Analyze the $y$-inequality:** $-1 \le y \le 2$.
    *   *Explanation:* This means the $y$-coordinate of any point in the region must be between -1 and 2, inclusive. It's a slab parallel to the $xz$-plane.
    *   This defines a region bounded by the planes $y=-1$ and $y=2$.

3.  **Analyze the $z$-inequality:** $0 \le z \le 5$.
    *   *Explanation:* This means the $z$-coordinate of any point in the region must be between 0 and 5, inclusive. It's a slab parallel to the $xy$-plane.
    *   This defines a region bounded by the planes $z=0$ (the $xy$-plane) and $z=5$.

4.  **Combine the descriptions:**
    *   When all three conditions are met simultaneously, the region is a rectangular box (or cuboid).
    *   *Explanation:* Each inequality restricts the space between two parallel planes. The intersection of these three pairs of parallel planes forms a rectangular prism.
    *   The dimensions of the box are:
        *   Length along $x$-axis: $3 - 0 = 3$ units.
        *   Length along $y$-axis: $2 - (-1) = 3$ units.
        *   Length along $z$-axis: $5 - 0 = 5$ units.
    *   One corner of the box is at $(0, -1, 0)$ and the opposite corner is at $(3, 2, 5)$.

The region is a **rectangular box (cuboid)** with vertices at $(0,-1,0)$, $(3,-1,0)$, $(0,2,0)$, $(3,2,0)$, $(0,-1,5)$, $(3,-1,5)$, $(0,2,5)$, and $(3,2,5)$. It has dimensions $3 \times 3 \times 5$ units.

**Reflection:** This example moves beyond individual points to describing entire regions. It tests the understanding that inequalities define ranges along each axis, and combining them describes a bounded volume. This is crucial for later topics like integration and understanding domains of multivariable functions.

## 6. Common mistakes and traps

1.  **Confusing the order of axes:** Always remember $(x,y,z)$. Students often swap $y$ and $z$ or $x$ and $y$, especially when visualizing. A point $(1,2,3)$ is very different from $(1,3,2)$.
2.  **Incorrectly applying the right-hand rule:** While not always critical for basic plotting, using a left-handed system can lead to sign errors in advanced topics like vector cross products. Always visualize with your right hand: X-forefinger, Y-middle finger, Z-thumb.
3.  **Forgetting negative signs for coordinates:** A point like $(-2, -3, -1)$ is in a very different part of space than $(2,3,1)$. Ensure you account for the direction indicated by the sign.
4.  **Mixing up quadrants (2D) with octants (3D):** There are 4 quadrants in 2D, but 8 octants in 3D. Students sometimes mistakenly refer to "quadrants" in 3D or try to number octants 1-4. Only the first octant ($x,y,z > 0$) has a universally accepted number.
5.  **Misidentifying coordinate planes:** The $xy$-plane is where $z=0$, not $x=0$ or $y=0$. Similarly, $xz$-plane implies $y=0$, and $yz$-plane implies $x=0$. A good mnemonic is that the plane's name tells you which variables are *not* zero.
6.  **Assuming all problems are in the first octant:** Many diagrams and simple examples focus on the first octant (all positive coordinates). However, problems frequently involve points in other octants, requiring careful attention to negative coordinates.

## 7. Textbook-precise explanation

The **three-dimensional Cartesian coordinate system**, also known as the **rectangular coordinate system**, provides a method for uniquely specifying the position of any point in three-dimensional Euclidean space ($\mathbb{R}^3$) using an ordered triplet of real numbers.

It is constructed by establishing three mutually orthogonal (perpendicular) directed lines, called the **coordinate axes**, which intersect at a single point called the **origin**. These axes are conventionally labeled the $x$-axis, $y$-axis, and $z$-axis. The positive directions of these axes are typically chosen to form a **right-handed system**: if the fingers of the right hand curl from the positive $x$-axis towards the positive $y$-axis, the thumb points in the direction of the positive $z$-axis.

Any point $P$ in $\mathbb{R}^3$ is represented by an **ordered triplet** of real numbers $(x,y,z)$, where:
*   $x$ is the **$x$-coordinate** (or abscissa), representing the directed distance from the $yz$-plane to $P$.
*   $y$ is the **$y$-coordinate** (or ordinate), representing the directed distance from the $xz$-plane to $P$.
*   $z$ is the **$z$-coordinate** (or applicate), representing the directed distance from the $xy$-plane to $P$.

The **origin**, denoted by $O$, has coordinates $(0,0,0)$.

The three coordinate axes define three mutually perpendicular **coordinate planes**:
*   The **$xy$-plane** (or $z=0$ plane) contains the $x$-axis and $y$-axis. All points on this plane have a $z$-coordinate of 0.
*   The **$xz$-plane** (or $y=0$ plane) contains the $x$-axis and $z$-axis. All points on this plane have a $y$-coordinate of 0.
*   The **$yz$-plane** (or $x=0$ plane) contains the $y$-axis and $z$-axis. All points on this plane have an $x$-coordinate of 0.

These three coordinate planes divide three-dimensional space into eight regions, called **octants**. The **first octant** is the region where all three coordinates are positive ($x>0, y>0, z>0$). There is no standard numbering convention for the other seven octants; they are typically referred to by the signs of their coordinates (e.g., the octant where $x<0, y>0, z<0$).

This foundational system is crucial for defining vectors, lines, planes, surfaces, and volumes in space, forming the basis for multivariable calculus and linear algebra.

(Reference: Stewart, James. *Calculus: Early Transcendentals*. 9th ed., Cengage Learning, 2021. Chapter 12: Vectors and the Geometry of Space, Section 12.1: Three-Dimensional Coordinate Systems.)

## 8. ASCII diagrams

Here is a basic ASCII representation of a 3D coordinate system, along with an example point $P(3,4,2)$ in the first octant.

```text
       Z
       ^
       |
       |
       |  . P(3,4,2)
       | /|
       |/ |
       +--+-----> Y
      /| /
     / |/
    /  +
   /  /
  / /
 v X
```

**Description of the figure:**
*   The `X` axis points towards the viewer (often depicted as coming "out" of the page).
*   The `Y` axis points to the right.
*   The `Z` axis points upwards.
*   The origin $(0,0,0)$ is where the three axes intersect.
*   Point `P(3,4,2)` is shown in the first octant. To visualize its position:
    *   Imagine moving 3 units along the positive X-axis.
    *   From there, move 4 units parallel to the positive Y-axis. This brings you to $(3,4,0)$ on the XY-plane.
    *   From $(3,4,0)$, move 2 units parallel to the positive Z-axis to reach $(3,4,2)$.
*   The dashed lines from P to the axes/planes represent the perpendicular projections, helping to locate the point. The line from P goes down to the point $(3,4,0)$ on the XY-plane. From $(3,4,0)$, there are lines parallel to the X and Y axes to meet the axes themselves.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **Right-Hand Rule for Axes:** This is the most critical visual. Point your **right** index finger forward (positive X). Point your **right** middle finger to the left (positive Y). Your **right** thumb will naturally point upwards (positive Z). Practice this until it's automatic. "X-Y-Z" in order of fingers: Index, Middle, Thumb.
    *   **Coordinate Planes:** Remember "Floor, Wall, Wall."
        *   **Floor:** $xy$-plane (where you stand, $z=0$).
        *   **Wall 1:** $xz$-plane (like a wall in front/back of you, $y=0$).
        *   **Wall 2:** $yz$-plane (like a wall to your left/right, $x=0$).
    *   **Octants:** Think of a cube. If the origin is at the very center, the three coordinate planes cut it into 8 smaller cubes. One for each combination of positive/negative for X, Y, Z.

2.  **The 1-3 Formulas/Facts You MUST Overlearn:**
    *   A point in 3D space is always an **ordered triplet** $(x,y,z)$. The order matters!
    *   The **origin** is $(0,0,0)$.
    *   The three **coordinate planes** are:
        *   $xy$-plane: $z=0$
        *   $xz$-plane: $y=0$
        *   $yz$-plane: $x=0$
    *   There are **8 octants**, and the first octant is where $x>0, y>0, z>0$.

3.  **Spaced-Repetition Schedule:**
    *   **Initial review:** Immediately after this lesson, review the key definitions and try to plot a few points.
    *   **1 day:** Quickly re-read the "Core Idea" section and try the first two self-check questions.
    *   **3 days:** Draw a 3D coordinate system from memory, label the axes, and plot a point with negative coordinates. Try self-check questions 3 and 4.
    *   **7 days:** Explain the concept of octants to yourself without looking at notes. Try to derive the coordinates of projections onto different axes/planes. Attempt self-check question 5.
    *   **16 days:** Review all "Common Mistakes" and mentally correct them.
    *   **35 days:** Re-read the entire lesson, focusing on the "Textbook-precise explanation" to solidify formal understanding.

4.  **First-Principles Re-derivation Pathway:**
    *   **Start with 2D:** Imagine a single point on a line (1D, just $x$). Then add a perpendicular line (y-axis) through the origin, creating a 2D plane with points $(x,y)$.
    *   **Add the third dimension:** Now, imagine adding a third line (z-axis) that is perpendicular to *both* the x-axis and the y-axis at their intersection (the origin). This creates 3D space.
    *   **Define coordinates:** A point's coordinates $(x,y,z)$ are simply its directed distances from the three coordinate planes ($yz$-plane for $x$, $xz$-plane for $y$, $xy$-plane for $z$). If you project the point onto each axis, the coordinate is the value on that axis.
    *   **Define planes:** If one coordinate is fixed at zero, the point must lie on a plane. For example, if $z=0$, the point has no "height" and must be on the "floor" (the $xy$-plane).
    *   **Define octants:** Since each axis can be positive or negative, and there are three axes, there are $2 \times 2 \times 2 = 8$ possible combinations of signs, each defining a unique octant.

## 10. Connections — what this leads to

A solid understanding of the 3D coordinate system is the absolute bedrock for nearly all advanced topics in mathematics, physics, and engineering that deal with space.

*   **Vectors in 3D:** Once you can locate points, you can define vectors (quantities with both magnitude and direction) by subtracting the coordinates of two points. This unlocks vector addition, scalar multiplication, dot products, and cross products, which are essential for physics (forces, velocities) and computer graphics.
*   **Equations of Lines and Planes in 3D:** Using 3D coordinates, you can write algebraic equations that describe geometric objects like straight lines (parametric and symmetric equations) and flat planes (linear equations like $Ax+By+Cz=D$). This is crucial for defining boundaries, surfaces, and paths.
*   **Distances and Midpoints in 3D:** The distance formula and midpoint formula, familiar from 2D, extend naturally to 3D, allowing you to calculate the distance between any two points in space or find the midpoint of a line segment.
*   **Surfaces in 3D:** Beyond planes, you can define more complex surfaces like spheres, cylinders, cones, and paraboloids using equations involving $x, y, z$. This is the start of understanding 3D shapes algebraically.
*   **Multivariable Calculus:** This is where 3D coordinates truly shine. You'll study functions of multiple variables ($f(x,y,z)$), partial derivatives (how a function changes with respect to one variable while others are held constant), multiple integrals (for calculating volumes and other quantities over 3D regions), and vector fields.
*   **Linear Algebra:** 3D coordinates represent vectors in $\mathbb{R}^3$. Linear algebra deals with transformations of these vectors, systems of linear equations in 3 variables, and concepts like basis vectors and eigenvalues, which are fundamental to computer graphics, machine learning, and quantum mechanics.
*   **Physics:** Every aspect of classical mechanics (kinematics, dynamics, rigid body motion), electromagnetism, and fluid dynamics relies on describing quantities and phenomena in 3D space using coordinates.

## 11. Self-check questions

1.  Plot the point $P(4, -3, 2)$ in a 3D coordinate system and identify the octant in which it lies.
2.  A point $A$ has coordinates $(x,y,z)$. What are the coordinates of its projection onto the $yz$-plane? What are the coordinates of its projection onto the $x$-axis?
3.  Describe the region in 3D space where $x \le 0$, $y \ge 0$, and $z \le 0$. Which octant(s) does this region encompass?
4.  Consider a cube with side length 2 units. If one vertex of the cube is at the origin $(0,0,0)$ and its edges are aligned with the positive $x, y, z$ axes, what are the coordinates of all 8 vertices of the cube?
5.  A point $Q(a,b,c)$ is equidistant from the $xy$-plane and the $xz$-plane. What relationship must exist between $a, b,$ and $c$? If $Q$ also lies on the $yz$-plane, what are its coordinates?