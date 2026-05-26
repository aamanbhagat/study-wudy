## 1. The one-sentence answer
**Relative motion describes how the velocity of one object appears when measured from the reference frame of another moving object, obtained by vector subtraction of the reference frame’s velocity.**

In one dimension the rule reduces to a signed arithmetic difference. An observer moving at velocity \(v_r\) sees an object moving at \(v_o\) as having velocity \(v_o - v_r\). The sign convention is fixed once the positive direction is chosen; everything else follows from consistent subtraction.

In two dimensions the same principle holds, but velocities are vectors. The velocity of object A relative to observer B is \(\vec{v}_{A/B} = \vec{v}_A - \vec{v}_B\). River-boat problems are the canonical illustration: the boat’s velocity relative to the water is fixed by its engine and rudder, the water’s velocity relative to the ground is the current, and the resultant path over the ground is their vector sum.

> [!NOTE]
> The single decisive insight is that velocities are always measured *relative to something*; there is no absolute velocity. Once two reference frames are chosen, the transformation between them is a simple vector difference, independent of the objects’ accelerations (provided the frames are inertial).

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage return-to-launch-site burns are planned in an Earth-fixed frame while the booster itself is moving at several hundred metres per second relative to the rotating Earth; relative-velocity corrections determine whether the landing legs touch down inside the autonomous-spaceport-droneship footprint.

ESA’s JUICE mission trajectory to Jupiter incorporates repeated gravity-assist fly-bys; each encounter’s incoming and outgoing hyperbolic excess velocities are calculated relative to the moving planet, not the Sun, to within centimetres per second.

Wind compensation for delivery drones operated by Amazon Prime Air requires continuous subtraction of the local wind vector (measured by onboard anemometers) from the desired ground track so that the commanded airspeed vector keeps the package on the street address.

Missile-defence interceptors such as the U.S. Navy’s SM-3 Block IIA solve a real-time relative-motion problem between the kinetic-kill vehicle and a manoeuvring warhead whose velocity is known only in the Earth-centred inertial frame; guidance laws are written directly in the closing-velocity frame.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Position and displacement vectors | Relative velocity is the time derivative of relative position; without vector subtraction the concept collapses. |
| Vector addition and components | All 2-D problems are solved by resolving velocities into orthogonal components and adding them component-wise. |
| Inertial reference frames | The Galilean velocity transformation holds only between frames that are not accelerating relative to one another. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Velocity is frame-dependent
A passenger walking forward at 1 m/s inside a train moving at 20 m/s appears stationary to someone outside if the walker moves backward at exactly 20 m/s. The observed speed therefore depends on the observer’s own motion.

Example: a walkway at an airport moves at 1.5 m/s. You walk forward at 1.0 m/s relative to the belt. Ground observers see 2.5 m/s; someone walking the opposite way on a parallel stationary floor sees you approaching at 2.5 m/s.

Formal statement:  
$$v_{o/r} = v_o - v_r$$

> [!WARNING]
> Reversing the subtraction sign produces the velocity of the reference frame relative to the object; many students invert the labels and obtain the wrong direction.

### Step 2 — One-dimensional signed subtraction
Choose a positive direction once. All velocities measured in that direction are positive; opposite are negative. The relative velocity is the algebraic difference.

Example: two cars on a straight road, car A at +25 m/s, car B at +15 m/s. Velocity of A relative to B is \(25 - 15 = +10\) m/s (A pulling ahead).

Formal statement:  
$$v_{A/B} = v_A - v_B \quad \text{(1-D scalars with sign)}$$

> [!WARNING]
> Omitting the sign when one velocity is opposite the chosen positive axis yields an answer whose magnitude is correct but whose direction is reversed.

### Step 3 — Two-dimensional vector subtraction
Velocities become vectors. Resolve each into components, subtract component-wise, then recombine.

Example: boat velocity relative to water \(\vec{v}_{b/w} = (3,0)\) m/s; current \(\vec{v}_{w/g} = (0,2)\) m/s. Boat velocity relative to ground is \((3,2)\) m/s.

Formal statement:  
$$\vec{v}_{A/B} = \vec{v}_A - \vec{v}_B = (v_{Ax}-v_{Bx})\hat{i} + (v_{Ay}-v_{By})\hat{j}$$

> [!WARNING]
> Treating the vectors as scalars or adding instead of subtracting produces a resultant whose direction is 180° wrong.

### Step 4 — River-boat decomposition
The boat’s velocity relative to water \(\vec{v}_{b/w}\) is fixed by its heading and speed through still water. The water’s velocity relative to ground \(\vec{v}_{w/g}\) is the current. The observed path is their vector sum:
$$\vec{v}_{b/g} = \vec{v}_{b/w} + \vec{v}_{w/g}$$

To cross straight across, choose the heading such that the downstream component of \(\vec{v}_{b/w}\) cancels the current.

### Step 5 — Time of crossing and drift
The time to cross a river of width \(d\) is determined solely by the component of velocity perpendicular to the banks:
$$t = \frac{d}{v_{b/w,\perp}}$$
Drift distance is then \(x = v_{b/g,\parallel} \cdot t\).

### Step 6 — Textbook statement of the Galilean velocity transformation
For any two inertial frames S and S′ with constant relative velocity \(\vec{v}_{S'/S}\), the velocity of an object P measured in each frame satisfies
$$\vec{v}_{P/S} = \vec{v}_{P/S'} + \vec{v}_{S'/S}$$
(Halliday, Resnick & Walker, *Fundamentals of Physics*, 12e, §4-8).

## 5. Worked examples — every step shown

**Example 1 — 1-D head-on approach**  
*Given:* Two trains on the same track, A at +72 km/h, B at −54 km/h.  
*Find:* Velocity of A relative to B.  

Convert to m/s: \(v_A = 20\) m/s, \(v_B = −15\) m/s.  
Subtract: \(v_{A/B} = 20 - (−15) = 35\) m/s.  
*Why:* The sign of B is reversed because B moves opposite the positive direction; subtraction therefore adds the magnitudes.  

**35 m/s (A approaching B)**

*Reflection:* The only difficulty is consistent sign convention; once chosen, arithmetic is mechanical.

**Example 2 — Simple river crossing, no compensation**  
*Given:* River 200 m wide, current 1.5 m/s downstream, boat speed in still water 3.0 m/s pointed straight across.  
*Find:* Time to cross and downstream drift.  

Perpendicular component: \(v_\perp = 3.0\) m/s.  
Time: \(t = 200 / 3.0 = 66.7\) s.  
*Why:* Only the perpendicular component carries the boat across the width.  
Parallel component equals current: 1.5 m/s.  
Drift: \(x = 1.5 \times 66.7 = 100\) m.  

**t = 66.7 s, drift = 100 m**

*Reflection:* Drift accumulates during the entire crossing time; students often forget to multiply velocity by time.

**Example 3 — Upstream return**  
*Given:* Same river, boat now travels 500 m upstream and returns.  
*Find:* Total time.  

Upstream speed relative to ground: 3.0 − 1.5 = 1.5 m/s.  
Downstream speed: 3.0 + 1.5 = 4.5 m/s.  
Times: \(t_\text{up} = 500/1.5 = 333.3\) s, \(t_\text{down} = 500/4.5 = 111.1\) s.  
Total: 444.4 s.  

**Total time = 444.4 s**

*Reflection:* Average speed is not the arithmetic mean; harmonic weighting by distance is required.

**Example 4 — Minimum-time straight crossing**  
*Given:* Same river, boat must reach directly opposite point.  
*Find:* Required heading and crossing time.  

Let \(\theta\) be angle upstream from perpendicular. Then  
\(v_{b/w} \sin\theta = 1.5\) m/s \(\Rightarrow \sin\theta = 0.5 \Rightarrow \theta = 30^\circ\).  
Perpendicular component: \(v_\perp = 3.0 \cos 30^\circ = 2.598\) m/s.  
Time: \(t = 200 / 2.598 = 77.0\) s.  

**Heading 30° upstream, t = 77.0 s**

*Reflection:* The engine must be angled so the current is exactly cancelled; the crossing is slower than the naïve straight heading.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Adding velocities instead of subtracting | Students treat “relative to” as ordinary addition | Always write \(\vec{v}_{A/B} = \vec{v}_A - \vec{v}_B\) explicitly |
| Forgetting that time depends only on perpendicular component | Intuitive but incorrect belief that resultant speed governs crossing time | Isolate the component normal to the banks before calculating \(t\) |
| Using ground speed for upstream/downstream legs interchangeably | Confusing boat speed in still water with ground speed | Recalculate ground speed for each leg separately |
| Reversing the reference-frame labels | “Velocity of boat relative to water” misread as water relative to boat | Label every velocity with two subscripts at every step |
| Ignoring that frames must be inertial | Applying Galilean rule to accelerating frames (e.g., turning aircraft) | Verify both frames have zero relative acceleration |
| Taking the arithmetic mean for round-trip average speed | Forgetting that time spent at each speed differs | Compute total distance over total time |
| Neglecting to resolve vectors when current is not perpendicular | Assuming all motion is collinear | Always draw component diagram even when angle looks simple |

## 7. The textbook-precise statement
Let S and S′ be inertial frames with constant relative velocity \(\vec{v}_{S'/S}\). For any particle P the velocities are related by the Galilean transformation
$$\vec{v}_{P/S} = \vec{v}_{P/S'} + \vec{v}_{S'/S}.$$
All velocities are measured at the same instant; the relation holds only while both frames remain inertial. (Taylor, *Classical Mechanics*, §1.3; also Halliday et al., *Fundamentals of Physics*, 12e, §4-8.)

## 8. Visual — diagram or schematic
```text
          y (across river)
          ↑
          |          v_b/w (heading at angle θ)
          |         /
River     |        /
banks     |       /
          |      /
----------+-----+------------------→ x (downstream)
          |    current v_w/g
          |
Ground frame
```
River banks parallel to x-axis, width d along y. Boat velocity relative to water at angle θ upstream from the y-axis; current along positive x.

## 9. The memory technique
1. **The hook** — Picture two escalators moving past each other in opposite directions; your walking speed on one is measured by an observer standing on the other. The difference of the escalator velocities is the only thing that changes the observed speed.
2. **What to overlearn** — \(\vec{v}_{A/B} = \vec{v}_A - \vec{v}_B\); time to cross = width / perpendicular component; the current never affects the perpendicular component.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.
4. **First-principles fallback** — Return to the definition: relative velocity is the time derivative of relative position, \(\vec{v}_{A/B} = d(\vec{r}_A - \vec{r}_B)/dt\).

## 10. What this unlocks
Mastery of relative velocity supplies the kinematic foundation for projectile motion in moving air, orbital rendezvous, and Doppler-shift calculations. It is presupposed by every subsequent treatment of non-inertial frames, Coriolis acceleration, and special-relativistic velocity addition.

- Projectile motion with wind (next in Kinematics)
- Circular motion in rotating frames
- Momentum conservation in different inertial frames
- Doppler effect for sound and light

## 11. Self-check — five questions, no answers
1. A river is 300 m wide with a 2 m/s current. A boat whose still-water speed is 5 m/s heads 40° upstream from the perpendicular. How long does it take to reach the opposite bank, and where does it land relative to the starting point?

2. Two cars leave an intersection at the same instant: one north at 25 m/s, one east at 20 m/s. What is the velocity of the northbound car as seen by the eastbound driver at t = 10 s?

3. Why does the time required for a boat to cross a river depend only on the component of its velocity perpendicular to the current, even though the resultant path is diagonal?

4. A swimmer crosses a 50 m pool in 40 s while a 0.8 m/s current flows parallel to the lanes. On the return leg the swimmer points in the opposite direction. What is the total time for the round trip?

5. An observer in a frame accelerating at 3 m/s² measures the velocity of a falling object. Can the Galilean velocity transformation be applied directly between this frame and an inertial frame on the ground? Explain the limitation.