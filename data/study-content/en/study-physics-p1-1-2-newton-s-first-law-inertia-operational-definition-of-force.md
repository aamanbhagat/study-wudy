## 1. The one-sentence answer
**Newton’s first law states that a body’s velocity remains constant unless a net external force acts on it, thereby defining inertia as the property of matter that resists changes in motion and supplying the operational definition of force as whatever produces such a change.**

A body left alone keeps whatever velocity it already has. Rest is simply the special case of zero velocity. Everyday experience seems to contradict this because friction or air drag is almost always present, but remove those influences and the body continues in a straight line at constant speed.

The law therefore does more than describe motion; it tells us how to recognize force. If an object’s velocity changes, a net force must be acting. If velocity stays constant, the vector sum of all forces is zero. This operational test replaces any prior intuitive notion of force as a “push or pull” with a measurable criterion.

> [!NOTE]
> The deepest insight is that force is not an intrinsic property of an object but a relation detected solely through acceleration; inertia is the name we give to the observed reluctance of that acceleration to appear.

## 2. Why this matters — concrete and current
Spacecraft coasting between Earth and Mars maintain constant velocity for months once their engines shut down. Mission planners at NASA’s Jet Propulsion Laboratory rely on the first law to predict trajectories with meter-level accuracy over hundreds of millions of kilometers; any unmodeled force would appear immediately as a deviation from the predicted straight-line path in the heliocentric frame.

Semiconductor lithography stages float on air bearings and are driven by voice-coil actuators. Engineers at ASML must cancel every residual force to within micronewtons so that the stage velocity remains constant during exposure; the first law supplies the null test used to calibrate force sensors before each wafer run.

High-energy particle detectors at CERN record tracks of charged particles that travel in straight lines inside field-free regions of the beam pipe. Any curvature signals the presence of an electric or magnetic force; the first law is therefore the reference against which detector alignment is verified to sub-millimeter precision.

Autonomous drone navigation systems fuse IMU data with the assumption that, in the absence of thrust or aerodynamic force, velocity is constant. When wind gusts appear they are identified precisely because the measured acceleration deviates from the zero predicted by the first law, allowing the flight controller to compensate within milliseconds.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Vector quantity      | Velocity and force are vectors; direction matters.        |
| Reference frame      | The law holds only in inertial frames.                    |
| Net force            | Only the vector sum of all external forces counts.        |
| Operational definition | The law itself supplies the experimental meaning of force. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Everyday motion always seems to stop
A sliding block eventually stops. Friction and air resistance act on it, so its velocity decreases. Remove every visible influence and the block continues indefinitely. This thought experiment isolates the law from confounding effects.

### Step 2 — Velocity, not speed, is the conserved quantity
Direction must be included. A puck on an air table moves in a straight line until it hits a wall. Curved paths require sideways force. The conserved entity is therefore the full velocity vector \(\vec{v}\).

### Step 3 — Inertia names the observed persistence
We label the tendency of velocity to remain unchanged as **inertia**. Mass quantifies inertia: larger mass requires larger force to produce the same acceleration, but the first law itself does not yet introduce mass.

### Step 4 — Force appears only when velocity changes
If \(\vec{v}\) is constant, net force is absent. If \(\vec{v}\) changes, a net force exists. This supplies the operational definition: force is that which alters momentum (or, at constant mass, velocity).

### Step 5 — The law is frame-dependent
Inside an accelerating elevator the same free particle appears to accelerate backward. The first law therefore holds exclusively in inertial frames—frames in which an isolated particle moves with constant velocity.

### Step 6 — Formal statement
An isolated body has \(\frac{d\vec{v}}{dt}=0\). Equivalently, the net force \(\sum\vec{F}=0\) implies zero acceleration. This is the precise content of Newton’s first law.

## 5. Worked examples — every step shown

**Example 1 — Hockey puck on frictionless ice**  
*Given:* A 0.16 kg puck is struck and acquires velocity 12 m s⁻¹ east on a perfectly frictionless surface.  
*Find:* Velocity after 30 s.  

The surface exerts no horizontal force.  
*Why:* First law asserts that velocity remains constant when net force is zero.  
Therefore \(\vec{v}(t)=12\,\hat{i}\) m s⁻¹ for all later times.  
**12 m s⁻¹ east**  

*Reflection:* The example isolates the law by removing friction; any real deviation would immediately indicate an unrecognized force.

**Example 2 — Satellite after main-engine cutoff**  
*Given:* A spacecraft at 7800 m s⁻¹ tangential to its orbit shuts engines; residual drag is negligible.  
*Find:* Speed and direction 90 min later.  

No tangential force acts.  
*Why:* First law requires constant velocity vector.  
Speed and direction are therefore unchanged.  
**7800 m s⁻¹ tangential**  

*Reflection:* Orbital curvature is produced by gravity, a centripetal force; the tangential component remains constant.

**Example 3 — Apparent force inside an accelerating truck**  
*Given:* A truck accelerates forward at 2 m s⁻². A box rests on its frictionless floor.  
*Find:* Acceleration of the box relative to the truck.  

In the truck’s frame the box appears to accelerate backward at 2 m s⁻².  
*Why:* The truck frame is non-inertial; the first law does not hold.  
In an inertial frame fixed to the ground the box remains at rest while the truck moves forward.  
**Box acceleration relative to truck = −2 m s⁻²**  

*Reflection:* The apparent force is fictitious and disappears when the correct inertial frame is chosen.

**Example 4 — Force calibration using constant-velocity motion**  
*Given:* A test mass moves at constant 5 m s⁻¹ inside a vacuum chamber. A candidate force sensor reads 0.3 mN.  
*Find:* Is the sensor zeroed correctly?  

Velocity is constant, therefore net force must be zero.  
*Why:* First law supplies the null condition.  
Any nonzero reading indicates an offset error.  
**Sensor must be recalibrated to read zero**  

*Reflection:* The law converts a kinematic observation directly into a force-calibration standard.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Treating rest as the natural state| Aristotelian intuition lingers              | Always ask “constant velocity, including nonzero?”   |
| Forgetting reference-frame requirement | Everyday frames are mildly accelerated   | Explicitly verify that the chosen frame is inertial  |
| Confusing force with momentum     | Both affect motion                          | Remember force is the *rate* of momentum change      |
| Assuming mass appears in the law  | Later laws introduce \(F=ma\)               | State the first law before mass is defined           |
| Ignoring vector character         | Speed is easier to visualize than velocity  | Draw velocity arrows before deciding “no force”      |
| Applying the law inside accelerating vehicles | Pseudo-forces feel real                | Switch to an inertial frame or add fictitious forces |
| Believing the law is approximate  | Friction is ubiquitous                    | Design thought experiments that remove friction      |

## 7. The textbook-precise statement
In an inertial reference frame, if the net external force acting on a body is zero, then the body’s velocity remains constant:  
\[
\vec{v}=\text{constant}\quad\text{when}\quad\sum\vec{F}_{\text{ext}}=0.
\]
Equivalently, the first law asserts the existence of inertial frames in which isolated particles move with uniform rectilinear motion. (See Feynman, *The Feynman Lectures on Physics*, Vol. I, §9-2.)

## 8. Visual — diagram or schematic
```text
Inertial frame (ground):
  → v = constant          (isolated puck)
  no arrows for force

Non-inertial frame (accelerating truck):
  truck → a_truck
  box appears to accelerate ← a_rel
  fictitious force drawn as dashed arrow on box
```
The diagram shows the same physical situation viewed from two frames; only the inertial frame satisfies the first-law condition of zero net force with zero acceleration.

## 9. The memory technique
1. **The hook** — Picture a hockey puck gliding forever across an infinite frozen lake; any bend or slowdown means an invisible force has touched it.
2. **What to overlearn** — “Constant velocity when \(\sum\vec{F}=0\)”; inertial frames are those in which this statement is true.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by asking: what single experiment would falsify the claim that an isolated body keeps constant velocity? The answer is any observed acceleration, which by definition signals a net force.

## 10. What this unlocks
Newton’s first law supplies the reference state against which all subsequent dynamical laws are written.  

- It is presupposed by the second law \( \sum\vec{F}=m\vec{a} \).  
- It defines the inertial frames required for the third law and for conservation of momentum.  
- It is the null test used in rocket guidance, precision metrology, and particle tracking.  
- It leads directly to the concept of fictitious forces in non-inertial frames.

## 11. Self-check — five questions, no answers
1. A satellite in deep space fires its thrusters briefly then coasts. In which frame does its velocity remain exactly constant after burnout?  
2. Inside a descending elevator accelerating at g, a ball is released from rest relative to the elevator. Does the first law predict constant velocity for the ball?  
3. Two observers disagree on whether a puck moves with constant velocity. What must be true of at least one observer?  
4. A force sensor attached to a motionless mass on a lab bench reads 0.4 mN. Using only the first law, what conclusion follows?  
5. Why does the first law remain valid on the International Space Station even though the station itself is in free fall around Earth?