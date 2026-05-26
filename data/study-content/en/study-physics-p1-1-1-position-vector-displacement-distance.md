## 1. The one-sentence answer
**Position is a vector from a chosen origin to a point in space; displacement is the vector difference between two positions; distance is the scalar length of the actual path taken.**

A position tells you where something sits relative to one fixed reference point. Once that reference (the origin) is fixed, every location acquires a unique arrow pointing from the origin to the object; that arrow is the position vector. When the object moves, the change in its position vector is the displacement—an arrow that points directly from start to finish, carrying both length and direction.

Distance, by contrast, ignores direction and records only the total length of the route actually followed. A particle can return to its starting point after traveling a long, winding path; its displacement is then the zero vector while its distance is the full length of the path.

> [!NOTE]
> The decisive distinction is that displacement depends only on the initial and final positions, while distance depends on every intermediate point; the two quantities are numerically equal only for straight-line motion with no reversal.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 guidance computer integrates position vectors at 100 Hz to compute instantaneous displacement from the launch pad, feeding the closed-loop steering algorithm that keeps the booster inside its narrow return corridor.

In semiconductor lithography, the stage that holds a silicon wafer reports its position vector to sub-nanometer precision; any error in the displacement calculation between two exposure sites produces overlay misalignment and scrapped dies.

The Laser Interferometer Gravitational-Wave Observatory (LIGO) measures the differential displacement of its 4 km arm-end mirrors; the strain signal is extracted from the change in the position vectors of the test masses relative to the beam splitter.

Autonomous drone navigation stacks fuse GPS position vectors with visual odometry; the displacement between successive frames supplies the velocity estimate used by the flight controller to reject wind gusts.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Scalar vs vector     | Distance is scalar; position and displacement are vectors |
| Coordinate system    | An origin and axes must be chosen before any vector can be written |
| Cartesian components | Components convert the geometric vector into numbers that can be subtracted |

## 4. Building the idea — from intuition to formalism

### Step 1 — Locating a point requires a reference
Any statement of “where” an object is must be anchored to something else. Without an agreed reference, the same location can be described in infinitely many contradictory ways.

Concrete example: a book lying on a table can be “1 m north of the south edge” or “2 m east of the west edge.” Both descriptions are useless until the edges themselves are fixed.

Formal statement: choose a point O called the origin. The location of point P is then completely specified once the directed line segment from O to P is given.

> [!WARNING]
> Omitting the origin leaves the vector undefined; two observers using different origins will report different position vectors for the identical physical point.

### Step 2 — The position vector formalizes location
The directed segment from the origin to P is denoted \(\vec{r}\). In three-dimensional Cartesian coordinates it is written with three components.

\[
\vec{r} = x\,\hat{i} + y\,\hat{j} + z\,\hat{k}
\]

### Step 3 — Motion produces a new position vector
At a later instant the same object occupies a new point P′ with position vector \(\vec{r}'\). The two vectors \(\vec{r}\) and \(\vec{r}'\) together encode the entire change of location.

### Step 4 — Displacement is the vector difference
Subtract the initial position vector from the final one. The result is the displacement vector \(\Delta\vec{r}\).

\[
\Delta\vec{r} = \vec{r}' - \vec{r} = (x' - x)\,\hat{i} + (y' - y)\,\hat{j} + (z' - z)\,\hat{k}
\]

This vector points straight from start to finish and is independent of the path taken.

> [!WARNING]
> Reversing the subtraction order yields the negative of the true displacement; sign errors here invert the direction of motion.

### Step 5 — Distance is path length, not vector length
Distance \(s\) is the integral of infinitesimal path elements \(ds\) along the actual trajectory. It is a scalar and is always non-negative.

\[
s = \int_{t_1}^{t_2} \sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2 + \left(\frac{dz}{dt}\right)^2}\,dt
\]

### Step 6 — The textbook definitions are now complete
Position vector, displacement, and distance are thereby distinguished by their mathematical character: \(\vec{r}\) and \(\Delta\vec{r}\) are vectors; \(s\) is a scalar. Equality \(|\Delta\vec{r}| = s\) holds only for rectilinear motion without reversal.

## 5. Worked examples — every step shown

**Example 1 — One-dimensional launch**
*Given:* A sounding rocket starts at the origin; after burnout its position is \(x = 2500\) m on the vertical axis.  
*Find:* displacement and distance traveled (straight ascent).  

\[
\vec{r}_i = 0\,\hat{k}, \quad \vec{r}_f = 2500\,\hat{k}
\]

\[
\Delta\vec{r} = \vec{r}_f - \vec{r}_i = 2500\,\hat{k}
\]

Because motion is collinear and unidirectional, distance equals magnitude of displacement.  
**2500 m**  

*Reflection:* The example is trivial yet forces explicit subtraction of vectors; the same subtraction in higher dimensions yields the identical logic.

**Example 2 — Two-dimensional displacement**
*Given:* A drone flies from \((0,0)\) to \((3,4)\) m.  
*Find:* displacement vector and its magnitude.  

\[
\Delta\vec{r} = (3-0)\hat{i} + (4-0)\hat{j} = 3\hat{i} + 4\hat{j}
\]

\[
|\Delta\vec{r}| = \sqrt{3^2 + 4^2} = 5\,\text{m}
\]

**\(3\hat{i} + 4\hat{j}\) m (magnitude 5 m)**  

*Reflection:* The magnitude is not the distance if the drone actually followed a curved route; only the straight-line assumption makes them equal.

**Example 3 — Return to origin**
*Given:* A particle travels from \((0,0)\) to \((4,0)\) then back to \((0,0)\).  
*Find:* displacement and distance.  

\[
\Delta\vec{r} = (0-0)\hat{i} + (0-0)\hat{j} = \vec{0}
\]

Path length \(s = 4 + 4 = 8\) m.  
**Displacement = zero vector; distance = 8 m**  

*Reflection:* Zero displacement with nonzero distance is the clearest demonstration that the two quantities are distinct.

**Example 4 — Rocket stage separation in 3-D**
*Given:* Booster position at separation \(\vec{r}_1 = 1200\hat{i} + 300\hat{j} + 5000\hat{k}\) m; upper-stage position 30 s later \(\vec{r}_2 = 1800\hat{i} + 450\hat{j} + 8200\hat{k}\) m.  
*Find:* displacement of the upper stage relative to the booster.  

\[
\Delta\vec{r} = (1800-1200)\hat{i} + (450-300)\hat{j} + (8200-5000)\hat{k} = 600\hat{i} + 150\hat{j} + 3200\hat{k}
\]

**\(600\hat{i} + 150\hat{j} + 3200\hat{k}\) m**  

*Reflection:* Component-wise subtraction works regardless of coordinate orientation; the result is the input required by any subsequent relative-velocity calculation.

## 6. Common traps and how to avoid them

| Trap                          | Why it happens                              | How to avoid it                                      |
|-------------------------------|---------------------------------------------|------------------------------------------------------|
| Treating displacement as distance | Everyday language uses “distance” for both | Always ask: “Is direction required?” If yes, use vector |
| Forgetting the origin         | Origin is tacit in casual description       | Write the origin coordinates explicitly each time    |
| Reversing subtraction order   | Vector subtraction is non-commutative       | Consistently compute final minus initial             |
| Using path length for displacement magnitude | Curved trajectories hide the distinction | Compute both quantities separately on every problem  |
| Ignoring units or coordinate frame | Mixed frames produce nonsense vectors       | State frame and units before any numerical step      |
| Assuming \(\Delta\vec{r} = 0\) implies no motion | Object may have traveled and returned       | Check distance separately when displacement vanishes |
| Confusing position with displacement | Both are vectors, but one is absolute       | Label every vector “position” or “displacement”      |

## 7. The textbook-precise statement
Let \(O\) be a fixed origin in an inertial frame. The position of a particle at time \(t\) is the vector \(\vec{r}(t)\) from \(O\) to the particle. The displacement between instants \(t_1\) and \(t_2\) is the vector \(\Delta\vec{r} = \vec{r}(t_2) - \vec{r}(t_1)\). The distance traveled is the arc-length scalar \(s = \int_{t_1}^{t_2} |\dot{\vec{r}}(t)|\,dt\). (Taylor, *Classical Mechanics*, 2005, §1.2)

## 8. Visual — diagram or schematic
```text
          z
          ↑
          |     P'(x',y',z')
          |    /
          |   /  Δr
          |  /
O---------+--------→ y
          | \
          |  \ r
          |   \
          P(x,y,z)
          ↓
          x (out of page)
```
Origin O, position vector \(\vec{r}\) to initial point P, new position vector to P′, and displacement \(\Delta\vec{r}\) connecting them. All axes are mutually perpendicular.

## 9. The memory technique
**The hook** — Picture your home as the origin. Your position vector is the straight arrow from the front door to where you stand. Displacement is the arrow from where you were to where you are now. Distance is the length of the crumpled string you dragged behind you the whole time.

**What to overlearn**  
- \(\Delta\vec{r} = \vec{r}_f - \vec{r}_i\)  
- Distance is always \(\geq |\Delta\vec{r}|\), equality only for straight-line motion.

**Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Re-derive by writing two position vectors in components, subtract component-wise, then integrate the speed for distance.

## 10. What this unlocks
Mastery of position, displacement, and distance supplies the language for every subsequent kinematic quantity.  
- Velocity is the time derivative of the position vector.  
- Acceleration is the time derivative of velocity.  
- Work and kinetic energy are defined through the displacement vector.  
- Orbit determination and rendezvous algorithms operate directly on differences of position vectors.

## 11. Self-check — five questions, no answers
1. A particle moves from \(\vec{r}_1 = 2\hat{i}\) to \(\vec{r}_2 = -3\hat{i}\). What is its displacement?  
2. Does a closed circular orbit of radius \(R\) produce zero displacement after one period? What is the distance traveled?  
3. In a two-dimensional Cartesian plane an object travels along the path \(y = x^2\) from \(x=0\) to \(x=3\). Compute both displacement and distance.  
4. Why can two observers using different origins report different position vectors yet agree on the displacement?  
5. A rover’s odometer reads 12.4 km while its net displacement vector has magnitude 4.7 km. What does this imply about the rover’s path?