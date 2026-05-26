## 1. The one-sentence answer
**Orbital velocity for a circular orbit is the constant tangential speed at which gravitational attraction alone supplies exactly the centripetal acceleration required to keep a body moving in a circle of chosen radius.**

Gravity pulls inward with force \(GMm/r^2\). For any curved path the body must accelerate toward the center; in a circle that acceleration is \(v^2/r\). Setting the two equal gives the unique speed that matches the geometry of the circle to the strength of gravity at that distance. The speed does not depend on the orbiting mass and is independent of direction provided the velocity vector lies in the plane of the circle and is perpendicular to the radius vector.

If the speed is lower, the gravitational pull exceeds the required centripetal acceleration and the path curves inward into an ellipse (or falls to the surface). If the speed is higher, the path opens into a larger ellipse or a hyperbola. Only one speed produces a perfect, unchanging circle.

> [!NOTE]
> The orbital velocity formula emerges from equating two expressions for the same physical effect—gravitational force equals mass times centripetal acceleration—rather than from any new law beyond Newton’s second law and his law of universal gravitation.

## 2. Why this matters — concrete and current
SpaceX Starlink satellites are placed in circular low-Earth orbits at approximately 550 km altitude; their orbital velocity of roughly 7.6 km s^{-1} determines both the required launch \(\Delta v\) and the frequency of station-keeping burns.

The Global Positioning System satellites occupy medium-Earth circular orbits at 20 200 km altitude with orbital speeds near 3.9 km s^{-1}; the constancy of that speed enters directly into the relativistic time-dilation corrections broadcast by each satellite clock.

The James Webb Space Telescope operates in a halo orbit about the Sun–Earth L2 point, but the underlying circular-orbit velocity at 1.5 million km from Earth sets the scale for the station-keeping budget that keeps the telescope within its tight Lissajous path.

Planetary ring systems, such as Saturn’s main rings, consist of countless icy particles whose individual orbital velocities decrease with radius exactly as \(\sqrt{GM/r}\); this differential rotation produces the observed spiral density waves mapped by the Cassini mission.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Newton’s law of universal gravitation \(F = GMm/r^2\) | Supplies the inward force that must equal centripetal requirement |
| Centripetal acceleration \(v^2/r\) for uniform circular motion | Defines the kinematic acceleration that gravity must produce |
| Newton’s second law \(F = ma\) | Converts the force balance into an equation for speed     |
| Vector decomposition of velocity (tangential vs. radial) | Ensures the velocity remains perpendicular to the radius vector |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the single force acting
A satellite in circular orbit experiences only the central gravitational attraction of the primary body; no thrust or atmospheric drag is present.  
Concrete example: a 100 kg spacecraft 300 km above Earth feels Earth’s gravity but nothing else once drag is neglected.  
Formal statement: the net force is purely radial, \(\vec{F} = - (GMm/r^2) \hat{r}\).  
> [!WARNING]
> Treating gravity as a “field” without writing the explicit force on the satellite mass \(m\) often leads to forgetting that \(m\) cancels later.

### Step 2 — Recall the kinematic requirement for circular motion
Any object moving at speed \(v\) on a circle of radius \(r\) must have an inward acceleration of magnitude \(v^2/r\).  
Concrete example: a car rounding a 50 m radius curve at 20 m s^{-1} needs 8 m s^{-2} toward the center.  
Formal statement: \(\vec{a} = - (v^2/r) \hat{r}\).

### Step 3 — Apply Newton’s second law along the radial direction
The gravitational force supplies the entire centripetal acceleration:  
\[
\frac{GMm}{r^2} = m \frac{v^2}{r}.
\]
> [!WARNING]
> Writing the left side as weight \(mg\) instead of \(GMm/r^2\) produces an answer valid only at Earth’s surface and hides the inverse-square dependence.

### Step 4 — Cancel the orbiting mass
Divide both sides by \(m\) (assuming \(m \neq 0\)):  
\[
\frac{GM}{r^2} = \frac{v^2}{r}.
\]

### Step 5 — Solve for orbital speed
Multiply both sides by \(r\) and take the positive square root:  
\[
v = \sqrt{\frac{GM}{r}}.
\]
This is the textbook expression for circular-orbit speed at orbital radius \(r\).

## 5. Worked examples — every step shown

**Example 1 — Low-Earth orbit**  
*Given:* Earth mass \(M = 5.972 \times 10^{24}\) kg, orbital radius \(r = 6.778 \times 10^6\) m (400 km altitude).  
*Find:* orbital speed \(v\).  

\[
v = \sqrt{\frac{GM}{r}} = \sqrt{\frac{(6.67430 \times 10^{-11})(5.972 \times 10^{24})}{6.778 \times 10^6}}
\]  
*Why:* substitute constants directly into the derived formula.  
\[
v = 7.67 \times 10^3\ \text{m s}^{-1}.
\]  
**7.67 km s^{-1}**

*Reflection:* radius appears only under the square root, so modest altitude changes produce small velocity changes.

**Example 2 — Geostationary orbit**  
*Given:* same Earth mass, \(r = 4.2164 \times 10^7\) m.  
*Find:* \(v\).  

\[
v = \sqrt{\frac{GM}{4.2164 \times 10^7}} = 3.075 \times 10^3\ \text{m s}^{-1}.
\]  
**3.075 km s^{-1}**

*Reflection:* larger \(r\) yields slower speed, illustrating the inverse-square-root dependence.

**Example 3 — Circular orbit about the Sun at 1 AU**  
*Given:* solar mass \(M_\odot = 1.989 \times 10^{30}\) kg, \(r = 1.496 \times 10^{11}\) m.  
*Find:* Earth’s orbital speed.  

\[
v = \sqrt{\frac{GM_\odot}{r}} = 2.978 \times 10^4\ \text{m s}^{-1}.
\]  
**29.78 km s^{-1}**

*Reflection:* the same formula applies to any central body once its mass and the orbital radius are known.

**Example 4 — Minimum circular-orbit speed around a white dwarf**  
*Given:* white-dwarf mass \(M = 1.2 M_\odot\), radius of orbit just above surface \(r = 7 \times 10^6\) m.  
*Find:* \(v\).  

\[
v = \sqrt{\frac{G(1.2 \times 1.989 \times 10^{30})}{7 \times 10^6}} = 5.82 \times 10^6\ \text{m s}^{-1}.
\]  
**5820 km s^{-1}**

*Reflection:* relativistic effects become important; the Newtonian derivation still supplies the reference value.

## 6. Common traps and how to avoid them

| Trap                                      | Why it happens                              | How to avoid it                                      |
|-------------------------------------------|---------------------------------------------|------------------------------------------------------|
| Using altitude instead of radius          | Confuses given data with the variable \(r\) | Always add planetary radius to altitude first        |
| Forgetting to cancel satellite mass \(m\) | Intuition that “heavier satellites need faster speed” | Explicitly divide both sides by \(m\)                |
| Applying surface gravity \(g\) everywhere | Over-generalizes the constant-\(g\) approximation | Replace \(mg\) with \(GMm/r^2\) from the start       |
| Taking the negative square root           | Mechanical habit from solving quadratics    | Remember speed is a magnitude; discard the minus sign |
| Confusing orbital speed with escape speed | Both involve \(\sqrt{GM/r}\)                | Note escape speed carries an extra \(\sqrt{2}\)      |
| Ignoring that \(r\) is measured from center | Visualizing orbits from the surface         | Draw the radius vector from the central body’s center|
| Assuming the orbit remains circular under drag | Neglecting non-gravitational forces         | State the idealization “gravity only” at the outset  |

## 7. The textbook-precise statement
Let a particle of mass \(m\) move under the sole influence of a fixed central mass \(M\) located at the origin. If the particle’s position vector \(\vec{r}\) satisfies \(|\vec{r}| = r =\) constant and its velocity satisfies \(\vec{v} \cdot \vec{r} = 0\), then the speed must be
\[
v = \sqrt{\frac{GM}{r}}
\]
for the trajectory to remain circular. (Goldstein, Poole & Safko, *Classical Mechanics*, 3rd ed., §3.3.)

## 8. Visual — diagram or schematic
```text
          v (tangential)
           ↑
           │
           │ r
           │
   M ──────●──────→ (satellite at distance r)
  (center)      (velocity perpendicular to radius)
```
The diagram shows a central mass \(M\), radial line of length \(r\) to the satellite, and the velocity vector drawn perpendicular to that radius, producing uniform circular motion.

## 9. The memory technique
1. **The hook** — Picture a perfectly balanced banked curve in space where the road’s “bank angle” is supplied by gravity itself; only one speed keeps the car on the road without sliding up or down.
2. **What to overlearn** — \(v = \sqrt{GM/r}\) and the recognition that orbital speed decreases as the square root of distance.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.
4. **First-principles fallback** — Re-derive by writing \(GMm/r^2 = m v^2/r\) and solving for \(v\).

## 10. What this unlocks
Circular-orbit velocity is the reference speed from which all conic-section orbits are measured.  
- Elliptical orbits and Kepler’s second law  
- Vis-viva equation for arbitrary orbits  
- Escape velocity \(\sqrt{2GM/r}\)  
- Hohmann transfer calculations  
- Restricted three-body problem and Lagrange points  

## 11. Self-check — five questions, no answers
1. Derive the orbital speed at height \(h\) above a planet of radius \(R\) and mass \(M\).
2. Show that the orbital period \(T\) satisfies \(T^2 \propto r^3\) using only the circular-orbit speed formula.
3. A satellite in circular orbit suddenly loses 10 % of its speed. Qualitatively describe the new orbit.
4. Two satellites orbit the same planet at radii \(r\) and \(2r\). What is the ratio of their orbital speeds?
5. Identify the algebraic error in the following incorrect derivation: \(GMm/r^2 = mv^2\) therefore \(v = \sqrt{GM/r}\).