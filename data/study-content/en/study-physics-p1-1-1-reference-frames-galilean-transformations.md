## 1. The one-sentence answer
**Galilean transformations are the linear coordinate mappings that relate the position and time of any event as measured in two inertial frames moving at constant velocity relative to each other.**

In everyday experience you already use them without naming them. Stand on a station platform and watch a train pass at speed \(v\); the location where a passenger drops a coin looks different to you than to the passenger, yet both descriptions must be consistent with the same physical laws. The transformations simply enforce that consistency by shifting the origin of one frame by the amount \(vt\) while leaving time unchanged.

The key physical content is that absolute space does not exist; only relative positions and velocities matter. Once the relative velocity between frames is known, every trajectory can be rewritten in the other frame by a simple algebraic shift. No new forces appear and no accelerations are created or destroyed.

> [!NOTE]
> The deepest “aha” is that the transformations leave acceleration invariant: \(\mathbf{a}' = \mathbf{a}\). That single fact is why Newton’s second law keeps exactly the same form in every inertial frame and why classical mechanics can be formulated without ever choosing a preferred origin.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage return-to-launch-site burns are planned in an Earth-centered frame, then transformed into the vehicle’s instantaneous body frame so that the guidance computer can issue thrust-vector commands; the Galilean shift between these frames must be recomputed every 10 ms.

Aircraft inertial navigation systems continuously integrate accelerometer data in a local-level frame while GPS supplies position in an Earth-centered, Earth-fixed frame; the navigation filter applies a Galilean velocity correction at each update to keep the two streams aligned within metres.

Particle-tracking detectors at the LHC record hits in the laboratory frame; reconstruction software applies successive Galilean boosts to move each track into the rest frame of the parent collision vertex, allowing invariant-mass calculations that would otherwise be frame-dependent.

Oceanographic drifters measure surface currents in their own drifting frame; satellite altimetry supplies the same velocity field in the geostationary frame; the two data sets are merged only after a Galilean transformation removes the drifter’s own motion.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Cartesian coordinates    | Positions are expressed as ordered triples \((x,y,z)\)    |
| Vector addition          | Relative position is a vector difference                  |
| Derivative as rate       | Velocity and acceleration are first and second derivatives of position with respect to time |
| Inertial frames          | Only frames with zero or constant relative velocity preserve Newton’s laws |

## 4. Building the idea — from intuition to formalism

### Step 1 — Two observers watch the same event
Two inertial observers record the same spark. One sits at the origin of frame \(S\); the other rides in frame \(S'\) that moves at constant velocity \(\mathbf{v}\) along the common \(x\)-axis. Both clocks read zero when the origins coincide.

The position vector of the spark measured in \(S\) is \(\mathbf{r}\). In \(S'\) the same vector appears shorter by the distance the origin of \(S'\) has already travelled.

### Step 2 — Time is shared
No experiment performed at constant velocity reveals absolute motion, so both observers assign the identical time coordinate to the event:
\[
t' = t.
\]

### Step 3 — Position transformation
Subtract the displacement of the moving origin:
\[
x' = x - vt, \quad y' = y, \quad z' = z.
\]
In vector form the Galilean transformation reads
\[
\mathbf{r}' = \mathbf{r} - \mathbf{v}t, \quad t' = t.
\]

> [!WARNING]
> If you mistakenly treat \(t\) as frame-dependent you have already stepped into special relativity; classical mechanics assumes a universal time.

### Step 4 — Differentiate once for velocity
Differentiate the position map with respect to the common time:
\[
\mathbf{u}' = \mathbf{u} - \mathbf{v},
\]
where \(\mathbf{u} = d\mathbf{r}/dt\) and \(\mathbf{u}' = d\mathbf{r}'/dt'\). Velocities differ by the constant relative velocity of the frames.

### Step 5 — Differentiate again for acceleration
A second derivative yields
\[
\mathbf{a}' = \mathbf{a}.
\]
Acceleration is invariant. This is the mathematical reason Newton’s second law is form-invariant across inertial frames.

### Step 6 — Inverse transformation
Solve for the original coordinates by reversing the sign of \(\mathbf{v}\):
\[
\mathbf{r} = \mathbf{r}' + \mathbf{v}t, \quad t = t'.
\]

### Step 7 — General relative velocity
When \(\mathbf{v}\) is not aligned with a coordinate axis the same algebra holds component-wise in three dimensions; the transformation remains a simple vector shift.

### Step 8 — Textbook statement
Any two inertial frames whose relative velocity is the constant vector \(\mathbf{v}\) are related by the Galilean map
\[
\mathbf{r}' = \mathbf{r} - \mathbf{v}t, \quad t' = t
\]
and its inverse. The map preserves intervals of time and differences of position vectors up to the uniform translation \(\mathbf{v}t\).

## 5. Worked examples — every step shown

**Example 1 — Ball dropped inside a moving railcar**  
*Given:* A railcar moves at constant 10 m/s relative to the platform. At \(t=0\) a ball is released from rest at height 2 m above the car floor, directly above the car’s origin.  
*Find:* Position of the ball versus time in both frames.  

In the car frame \(S'\) the ball’s initial velocity is zero, so
\[
y'(t) = 2 - \frac12 g t^2, \quad x' = 0.
\]
*Why:* Free-fall equation with zero initial vertical speed.  

Transform to the platform frame \(S\):
\[
x = x' + v t = 10t, \quad y = y'.
\]
*Why:* Galilean position shift with \(v = 10\) m/s.  

Final answer:  
**\(x(t) = 10t\), \(y(t) = 2 - \frac12 g t^2\)**  

*Reflection:* The parabolic trajectory appears tilted only because the horizontal velocity is added uniformly; the vertical motion is unchanged.

**Example 2 — Two boats crossing a river**  
*Given:* Boat A heads east at 3 m/s relative to water; boat B heads north at 4 m/s relative to water. River flows east at 1 m/s.  
*Find:* Velocity of A relative to B.  

Velocity of A relative to ground: \(\mathbf{u}_A = (3+1,0) = (4,0)\) m/s.  
Velocity of B relative to ground: \(\mathbf{u}_B = (1,4)\) m/s.  
Relative velocity:
\[
\mathbf{u}_{A/B} = \mathbf{u}_A - \mathbf{u}_B = (3,-4)\ \text{m/s}.
\]
*Why:* Direct application of velocity subtraction.  

**Final answer:**  
**3 m/s east, 4 m/s south**  

*Reflection:* The river’s current is already Galilean-shifted into both boats’ ground velocities; subtracting them removes the common current automatically.

**Example 3 — Projectile launched from a moving cart**  
*Given:* Cart moves at 5 m/s; projectile launched at 20 m/s, 30° above horizontal relative to cart.  
*Find:* Range on level ground in ground frame.  

Velocity relative to ground:
\[
u_x = 20\cos30^\circ + 5, \quad u_y = 20\sin30^\circ.
\]
Time of flight from \(y=0\):
\[
t = \frac{2u_y}{g}.
\]
Range:
\[
R = u_x t.
\]
*Why:* Galilean addition of cart velocity to launch velocity, then standard projectile equations.  

**Final answer:**  
**\(R \approx 42.4\) m**  

*Reflection:* Only the horizontal component receives the Galilean boost; vertical motion and flight time remain identical in both frames.

**Example 4 — Three-frame chain**  
*Given:* Frame \(S'\) moves at \(v_1 = 10\) m/s relative to \(S\); frame \(S''\) moves at \(v_2 = 7\) m/s relative to \(S'\).  
*Find:* Velocity of object at rest in \(S''\) as seen from \(S\).  

Velocity in \(S'\):
\[
u' = 0.
\]
Apply inverse Galilean map:
\[
u = u' + v_1 = 10\ \text{m/s}.
\]
Now apply map from \(S'\) to \(S''\):
\[
u'' = u' - v_2 = -7\ \text{m/s (relative to } S'\text{)}.
\]
Velocity in \(S\):
\[
u = u'' + v_1 = 3\ \text{m/s}.
\]
*Why:* Successive Galilean additions commute because relative velocities are constant.  

**Final answer:**  
**3 m/s relative to \(S\)**  

*Reflection:* Composition of Galilean boosts is again a Galilean boost at the algebraic sum of the velocities.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Treating time as frame-dependent  | Confusion with Lorentz transformations              | Write \(t' = t\) explicitly at the start of every problem |
| Adding velocities as scalars      | Forgetting vector character                         | Always use vector subtraction \(\mathbf{u}' = \mathbf{u} - \mathbf{v}\) |
| Applying transformation to acceleration | Believing acceleration must also shift              | Differentiate twice; watch the second derivative vanish |
| Choosing non-inertial frames      | Real vehicles always have some acceleration         | Verify relative velocity is strictly constant before using Galilean map |
| Reversing the sign of \(\mathbf{v}\)| Mixing active and passive viewpoints                | Decide once which frame is primed and keep the sign consistent |
| Forgetting that the map is only between inertial frames | Everyday frames (car braking) are non-inertial      | Check \(\mathbf{a} = 0\) for both origins            |
| Using the map at relativistic speeds | Habit from low-speed problems                       | Check \(v \ll c\) before applying; otherwise switch to Lorentz |

## 7. The textbook-precise statement
Let \(S\) and \(S'\) be two inertial frames whose origins coincide at \(t = t' = 0\) and whose relative velocity is the constant vector \(\mathbf{v}\). The Galilean transformation between coordinates of any event is
\[
\mathbf{r}' = \mathbf{r} - \mathbf{v}t, \qquad t' = t.
\]
The inverse map is obtained by interchanging primed and unprimed symbols and replacing \(\mathbf{v}\) by \(-\mathbf{v}\). Both maps leave the acceleration of every particle unchanged: \(\mathbf{a}' = \mathbf{a}\). Consequently the Newtonian equation \(\mathbf{F} = m\mathbf{a}\) retains identical form in every inertial frame. (Taylor, *Classical Mechanics*, 2005, §1.3.)

## 8. Visual — diagram or schematic
```text
          y                  y'
          |                  |
          |                  |
          |   S              |   S'
          |    •(event)      |    •(event)
          |                  |
     -----+-----> x     -----+-----> x'
          O                  O'
               v → (constant)
```
- Frame \(S'\) origin \(O'\) moves at constant velocity \(\mathbf{v}\) along the shared \(x\)-axis of \(S\).  
- Both frames share the same time coordinate.  
- The event’s coordinates satisfy \(x' = x - vt\), \(y' = y\).

## 9. The memory technique

1. **The hook** — Picture Galileo on a smoothly sailing ship dropping a ball from the mast; the ball appears to fall straight down to him but traces a slanted parabola to an observer on the dock. The ship’s steady motion is exactly the Galilean shift.

2. **What to overlearn** — \(\mathbf{r}' = \mathbf{r} - \mathbf{v}t\), \(t' = t\), and the invariance \(\mathbf{a}' = \mathbf{a}\).

3. **Spaced-repetition schedule** — Review the three boxed equations at 1 day, 3 days, 7 days, 16 days, and 35 days after first mastery.

4. **First-principles fallback** — Start from the definition of inertial frames, impose constant relative velocity, subtract the displacement of the moving origin, then differentiate twice with respect to the common time.

## 10. What this unlocks
Galilean invariance is the foundation on which every subsequent layer of classical mechanics is built. It directly enables the centre-of-mass theorem, the two-body reduction, the Lagrangian formulation with ignorable coordinates, and the transition to non-inertial frames via fictitious forces. In aerospace engineering it supplies the velocity-addition rule used in ascent-trajectory optimisation and in the design of relative-navigation filters for rendezvous. The identical structure reappears, with a different transformation law, as the starting point for special relativity.

## 11. Self-check — five questions, no answers
1. A ball is thrown vertically upward at 15 m/s inside an elevator moving upward at constant 2 m/s. What is its initial velocity relative to the ground?

2. Frame \(S'\) moves at \(\mathbf{v} = (3,4,0)\) m/s relative to \(S\). An object has velocity \(\mathbf{u}' = (-1,2,5)\) m/s in \(S'\). Compute \(\mathbf{u}\) in \(S\).

3. Show algebraically that if acceleration is zero in one inertial frame it is zero in every inertial frame related by a Galilean transformation.

4. Two cars approach each other on a straight road, each at 25 m/s relative to the ground. What is the closing speed according to a Galilean observer in either car?

5. A accelerometer mounted on a drone reads 0.3 m/s² while the drone flies at constant velocity over level ground. Is the reading consistent with a Galilean inertial frame? Explain.