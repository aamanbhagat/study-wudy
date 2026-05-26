## 1. The one-sentence answer
**Centripetal force is not a distinct force but the net radial component of already-present forces that produces the observed change in direction of velocity.**

Any object moving in a curved path has an acceleration perpendicular to its instantaneous velocity; Newton’s second law then requires a net force in that same inward direction. The actual agent supplying that force is always one of the familiar interactions—tension, gravity, friction, electromagnetic force, or their resultant—never a new “centripetal force.” Once the source is identified, the magnitude follows directly from \( F_{\text{net},r} = m v^2 / r \).

The distinction matters because students often treat “centripetal force” as an extra arrow on the free-body diagram. Removing that arrow and replacing it with the concrete interaction that actually acts on the object eliminates double-counting and clarifies which forces do the work of turning the trajectory.

> [!NOTE]
> The phrase “what provides the centripetal force” is answered by naming the real force (or forces) already acting on the body; the centripetal requirement merely tells you the direction and magnitude that net inward force must have.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage boost-back burn keeps the rocket on a curved trajectory that returns it to the landing pad; the centripetal acceleration is supplied by the component of thrust and aerodynamic lift, not by any separate centripetal agency.

The Juno spacecraft at Jupiter maintains a 53-day elliptical orbit whose periapsis radius is set by the balance between Jupiter’s gravity and the spacecraft’s tangential velocity; the centripetal force is entirely gravitational.

In semiconductor manufacturing, wafers are spun at 3000 rpm on electrostatic chucks; the centripetal acceleration that keeps the wafer from flying off is provided by friction and the normal force from the chuck, quantities that must be calculated to avoid particle contamination.

Banked-curve highway design at 120 km/h on a 300 m radius curve uses a combination of tire friction and the horizontal component of the normal force; civil engineers solve for the banking angle so that the centripetal requirement is met without relying on friction alone.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Newton’s second law      | \( \vec{F}_{\rm net} = m \vec{a} \) must be applied in radial coordinates |
| Vector decomposition     | Velocity and acceleration must be resolved into radial and tangential parts |
| Free-body diagrams       | Every real force acting on the object must be drawn before the radial sum is taken |
| Uniform circular motion kinematics | \( a_r = v^2/r \) supplies the kinematic link between speed and required acceleration |

## 4. Building the idea — from intuition to formalism

### Step 1 — Velocity is always tangent to the path
An object traveling along a curved trajectory has an instantaneous velocity vector that points exactly along the local tangent. At any single instant the direction of motion is straight; the curve appears only when the direction changes over time.

Consider a car entering a circular roundabout at constant speed. At the instant it is at the easternmost point its velocity is due north.

The mathematical statement is simply that the velocity vector \(\vec{v}\) is parallel to the unit tangent \(\hat{t}\):
\[
\vec{v} = v \hat{t}.
\]

> [!WARNING]
> If you treat the velocity as already pointing inward you will later invent a nonexistent outward force to “cancel” it.

### Step 2 — Direction change implies radial acceleration
Because the direction of \(\vec{v}\) is changing, its time derivative \(\vec{a} = d\vec{v}/dt\) acquires a component perpendicular to \(\vec{v}\). For motion on a circle of radius \(r\) that component is \(v^2/r\) directed toward the center.

A concrete check: at speed 10 m/s on a 5 m radius the tip of the velocity vector sweeps through an angle \(d\theta = (v dt)/r\) in time \(dt\), producing a change \(dv_\perp = v\,d\theta = v^2 dt/r\).

Thus
\[
a_r = \frac{v^2}{r}.
\]

> [!WARNING]
> Omitting the radial acceleration term while still writing Newton’s law in polar coordinates leads to an inconsistent force balance.

### Step 3 — Newton’s second law demands a net radial force
Newton’s second law written in the radial direction reads
\[
F_{\rm net,r} = m a_r = m \frac{v^2}{r}.
\]
The left side is the algebraic sum of every real force component pointing toward the center; no additional centripetal term appears.

### Step 4 — Identify the physical source of that radial force
The forces already present—tension in a string, gravitational attraction, static friction, Lorentz force—are examined one by one. Their vector sum is projected onto the radial direction. Whatever remains after the tangential components are subtracted must equal \(m v^2/r\).

### Step 5 — Close the loop with the free-body diagram
Draw every force that contacts or acts at a distance on the object. Resolve each into radial and tangential parts. Set the radial sum equal to \(m v^2/r\) and solve for unknowns. The textbook statement follows at once:

**The centripetal force is the radial component of the net force supplied by the actual interactions acting on the body.**

## 5. Worked examples — every step shown

**Example 1 — Stone on a string**
*Given:* A 0.20 kg stone is swung in a horizontal circle of radius 0.80 m at 3.0 m/s.  
*Find:* Tension in the string.

- Draw free-body diagram: only tension acts horizontally.  
  *Why:* Gravity and normal force cancel vertically.  
- Apply radial form of Newton’s second law:  
  \[
  T = m \frac{v^2}{r}.
  \]
  *Why:* \(T\) is the sole radial force.  
- Substitute values:  
  \[
  T = 0.20 \times \frac{9.0}{0.80} = 2.25\,\text{N}.
  \]

**Final answer**  
**2.25 N**

*Reflection:* The string tension alone supplies the entire centripetal requirement; no “centripetal force” arrow is added.

**Example 2 — Car on a flat curve**
*Given:* 1500 kg car travels at 20 m/s on a curve of radius 100 m; coefficient of static friction \(\mu_s = 0.80\).  
*Find:* Minimum \(\mu_s\) required.

- Free-body diagram: normal force, weight, friction.  
  *Why:* Friction is the only horizontal force.  
- Radial equation:  
  \[
  f_s = m \frac{v^2}{r} \implies \mu_s N = m \frac{v^2}{r}.
  \]
  *Why:* \(N = mg\).  
- Solve:  
  \[
  \mu_s = \frac{v^2}{rg} = 0.41.
  \]

**Final answer**  
**0.41**

*Reflection:* Friction must point inward; its maximum value limits the safe speed.

**Example 3 — Vertical circle at the top**
*Given:* 0.50 kg mass on 1.2 m string moving at 4.0 m/s at the highest point.  
*Find:* Tension.

- At top both gravity and tension point inward.  
  *Why:* Center of circle lies below the mass.  
- Radial sum:  
  \[
  T + mg = m \frac{v^2}{r}.
  \]
  *Why:* Both forces contribute to centripetal requirement.  
- Substitute:  
  \[
  T = 0.50 \times \frac{16}{1.2} - 4.9 = 1.77\,\text{N}.
  \]

**Final answer**  
**1.77 N**

*Reflection:* Gravity assists; tension can be smaller than at the bottom.

**Example 4 — Banked curve with friction**
*Given:* 1200 kg car, 25 m/s, 80 m radius, banking angle 15°, \(\mu_s = 0.30\).  
*Find:* Whether the car tends to slide up or down the bank.

- Resolve normal and friction into radial and vertical components.  
  *Why:* Need net radial force exactly \(m v^2/r\).  
- Write two equations (radial and vertical) and solve for friction direction.  
  *Why:* Sign of friction reveals tendency.  
- Result: required friction points down the bank, so car tends to slide up.

**Final answer**  
**Slides up the bank**

*Reflection:* Comparing the no-friction speed with actual speed determines friction direction.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Adding a “centripetal force” arrow to the free-body diagram | Confusing the kinematic requirement with an interaction | Never draw a force that is not one of the four fundamental interactions |
| Using \(v^2/r\) as a force rather than an acceleration | Mixing kinematics with dynamics                     | Always write \(F_{\rm net,r} = m v^2/r\)            |
| Forgetting that gravity supplies part of the centripetal force at the top of a vertical circle | Treating gravity as always “down” and centripetal as “inward” | Resolve every force into the radial direction at that instant |
| Assuming the normal force on a banked curve equals \(mg\) | Ignoring the radial component of the normal force   | Write both radial and vertical equilibrium equations |
| Using kinetic friction when the vehicle is not sliding | Misidentifying static friction as the default       | Check whether required centripetal force exceeds \(\mu_s N\) |
| Sign error in radial direction    | Choosing an outward-positive convention inconsistently | Fix the positive radial direction toward the center before writing equations |
| Treating tension as always equal to \(mv^2/r\) in vertical motion | Neglecting gravity’s contribution                   | Include every force that has a radial component      |

## 7. The textbook-precise statement
For a particle of mass \(m\) whose trajectory has instantaneous radius of curvature \(r\) and speed \(v\), the radial component of Newton’s second law is
\[
\sum F_r = m \frac{v^2}{r},
\]
where the sum is taken over all real forces acting on the particle and the positive radial direction points toward the center of curvature (Kleppner & Kolenkow, *An Introduction to Mechanics*, 2e, §3.3).

## 8. Visual — diagram or schematic
```text
          center
            •
           /|
          / | r
         /  |
        /   |
       •----•  <-- object, velocity tangent (→)
      tension or gravity or friction inward
```
Label: radial direction from object to center; velocity vector drawn perpendicular to radius vector.

## 9. The memory technique
1. **The hook** — Picture the string or road surface literally “pulling” or “pushing” the object inward; the word “centripetal” merely names the direction of that pull.
2. **What to overlearn** — \( a_r = v^2/r \), \( F_{\rm net,r} = m v^2/r \), and the rule that only real forces appear on free-body diagrams.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from \(\vec{a} = d\vec{v}/dt\), resolve into radial and tangential parts, then apply \(\sum \vec{F} = m\vec{a}\).

## 10. What this unlocks
Mastery of centripetal-force identification lets you proceed directly to orbital mechanics, rotational dynamics, and non-inertial frames.

- Two-body gravitational orbits and Kepler’s laws
- Torque and angular momentum for rigid bodies
- Accelerated reference frames and fictitious forces
- Stability analysis of rotating space-station habitats

## 11. Self-check — five questions, no answers
1. A 2 kg object moves at constant speed 5 m/s on a circle of radius 1.5 m. Draw the free-body diagram and state which single force supplies the centripetal acceleration.
2. In a vertical loop-the-loop, at what point on the track is the normal force from the track largest? Explain using the radial force equation.
3. A car rounds a banked curve at a speed higher than the design speed. In which direction does friction act? Derive the condition that decides the direction.
4. Why is it incorrect to write “centripetal force − gravity = \( m v^2/r \)” when analyzing a satellite at the top of its elliptical orbit?
5. A string can withstand a maximum tension of 50 N. What is the highest speed a 0.3 kg mass can have at the top of a vertical circle of radius 0.9 m without breaking the string?