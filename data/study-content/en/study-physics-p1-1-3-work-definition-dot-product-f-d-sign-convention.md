## 1. The one-sentence answer
**Work is the scalar obtained when a force vector is projected along a displacement vector and multiplied by the magnitude of that displacement.**

In everyday language this means that only the part of a force that actually moves an object in the direction of motion counts. A force perpendicular to the motion contributes nothing; a force opposing the motion subtracts. The mathematical embodiment of this projection is the dot product, which automatically encodes both the magnitude and the directional alignment.

The sign of the resulting scalar follows directly from the angle between the two vectors. When the angle is acute the work is positive; when obtuse it is negative; when exactly 90° it is zero. This sign convention is not arbitrary: it records whether the force adds or removes energy from the object.

> [!NOTE]
> The dot product is the single operation that converts the vector pair (force, displacement) into a signed energy transfer; every subsequent energy theorem in mechanics rests on this definition.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage landing burns convert chemical energy into kinetic energy while the engines produce thrust aligned with the velocity vector; the work done by thrust is therefore positive and equals the increase in the stage’s mechanical energy that must be dissipated by the grid fins and landing legs.

In semiconductor manufacturing, electron-beam lithography stages accelerate silicon wafers under constant electromagnetic forces; the work calculation determines the exact current-versus-time profile needed to reach target velocities without overshoot, directly affecting overlay precision measured in nanometres.

LIGO’s mirror suspensions experience radiation-pressure forces from the 200 kW circulating laser beams; the tiny work done by these forces on the 40 kg test masses appears as displacement noise that must be subtracted from the gravitational-wave strain signal.

The Parker Solar Probe’s trajectory designers compute the work performed by solar gravity on the spacecraft as it falls through the corona; the resulting negative work (gravity acting opposite to the radial velocity component during certain phases) sets the perihelion speed record of 163 km s⁻¹.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Vector notation      | Force and displacement are vectors; their components must be tracked separately. |
| Scalar versus vector | Work is a scalar; the operation must eliminate directional information in a controlled way. |
| Cosine of an angle   | The projection of one vector onto another is expressed by the cosine of the included angle. |
| Units of force and length | Work is measured in joules (N·m); recognising the product of these units confirms dimensional consistency. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Everyday “effort that moves something”
A person pushing a crate feels they are doing work only when the crate actually slides in the direction of the push. If the crate does not move, or if the push is sideways while the crate slides forward, the felt effort does not transfer energy to the crate’s motion.

Example: sliding a 10 kg box 3 m across a floor with a 50 N horizontal force. The effort is effective because force and motion coincide.

Formally, work is zero whenever displacement magnitude is zero, regardless of force magnitude.

> [!WARNING]
> Treating any applied force as automatically performing work leads to the error of counting forces that merely deform an object without displacement.

### Step 2 — Only the parallel component contributes
Resolve the force into a component parallel to the displacement and a component perpendicular to it. Only the parallel component multiplies the displacement length to give work.

Example: pushing the same box with a 50 N force at 30° to the horizontal. The parallel part is 50 cos 30° ≈ 43.3 N; the perpendicular part merely presses the box against the floor.

The parallel component is expressed by the projection \( F_\parallel = \mathbf{F} \cdot \hat{\mathbf{d}} \).

> [!WARNING]
> Omitting the cosine factor and using the full force magnitude overestimates work whenever the force is not perfectly aligned with motion.

### Step 3 — The dot product encodes projection and sign
The dot product \(\mathbf{F} \cdot \mathbf{d}\) multiplies the magnitudes and the cosine of the included angle, automatically supplying both the projection and the correct sign.

Example: if the angle is 120°, cos 120° = −0.5, so work is negative even though magnitudes are positive.

Mathematically,
$$
W = \mathbf{F} \cdot \mathbf{d} = F_x d_x + F_y d_y + F_z d_z = |\mathbf{F}| \, |\mathbf{d}| \cos\theta.
$$

> [!WARNING]
> Reversing the order of the vectors does not change the result, but reversing the direction of \(\mathbf{d}\) (i.e., choosing the opposite displacement) flips the sign of work—an easy bookkeeping error in closed-path calculations.

### Step 4 — Units and dimensions
Force in newtons times displacement in metres yields joules. The dot product of two vectors therefore carries units of energy, confirming that work belongs in the energy ledger rather than the momentum ledger.

### Step 5 — Textbook definition
Work done by a constant force \(\mathbf{F}\) acting through a displacement \(\mathbf{d}\) is the scalar
$$
W = \mathbf{F} \cdot \mathbf{d}.
$$
When \(\mathbf{F}\) varies, the definition becomes the line integral
$$
W = \int_C \mathbf{F} \cdot d\mathbf{r}.
$$

## 5. Worked examples — every step shown

**Example 1 — Horizontal push**
*Given:* \(\mathbf{F} = (30, 0)\) N, \(\mathbf{d} = (5, 0)\) m.  
*Find:* work done.  
Step 1: write the dot product \(W = 30 \times 5 + 0 \times 0\).  
*Why:* only matching components survive.  
Step 2: evaluate \(W = 150\) J.  
**150 J**  
*Reflection:* alignment is perfect; the sign is positive because force and displacement share the same direction.

**Example 2 — Angled force**
*Given:* \(|\mathbf{F}| = 50\) N at 37° above horizontal, \(\mathbf{d} = (4, 0)\) m.  
*Find:* work.  
Step 1: resolve \(F_x = 50 \cos 37^\circ \approx 40\) N.  
*Why:* only the horizontal component lies along \(\mathbf{d}\).  
Step 2: \(W = 40 \times 4 = 160\) J.  
**160 J**  
*Reflection:* the vertical component does no work; omitting the cosine would have given 200 J—an overcount.

**Example 3 — Opposing force (braking)**
*Given:* friction \(\mathbf{F} = (-200, 0)\) N, \(\mathbf{d} = (3, 0)\) m.  
*Find:* work by friction.  
Step 1: dot product \(W = (-200)(3) + 0 \cdot 0 = -600\) J.  
*Why:* cosine of 180° supplies the minus sign.  
**-600 J**  
*Reflection:* negative work indicates kinetic energy is removed from the object.

**Example 4 — Three-dimensional thrust vector**
*Given:* rocket thrust \(\mathbf{F} = (1200, 300, 0)\) N, displacement \(\mathbf{d} = (50, 10, 0)\) m.  
*Find:* work.  
Step 1: \(W = 1200 \cdot 50 + 300 \cdot 10 + 0 \cdot 0 = 63{,}000\) J.  
*Why:* each Cartesian pair is multiplied and summed.  
**63 000 J**  
*Reflection:* the calculation is coordinate-independent; any orthogonal frame yields the identical scalar.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using \(W = F d\) without cosine  | Habit from one-dimensional problems                 | Always draw the angle between \(\mathbf{F}\) and \(\mathbf{d}\). |
| Treating work as a vector         | Confusion with force or momentum                    | Remember work is energy transfer; scalars add, vectors do not. |
| Sign error on opposing forces     | Forgetting that 180° gives cos = −1                 | Check whether force points toward or away from displacement tip. |
| Adding work from perpendicular forces | Assuming any force “helps”                          | Project each force separately; perpendicular term vanishes. |
| Forgetting that static forces do zero work | Misreading “effort” as work                         | Verify displacement is nonzero before computing.     |
| Using displacement of the point of application instead of centre-of-mass displacement | Ambiguous reference point                           | For rigid bodies use centre-of-mass displacement unless rotation is analysed separately. |
| Confusing work by a force with net work | Mixing single-force and net-force calculations      | Label the agent of each force explicitly.            |

## 7. The textbook-precise statement
Work done by a force \(\mathbf{F}\) on a particle that undergoes an infinitesimal displacement \(d\mathbf{r}\) is the scalar \(dW = \mathbf{F} \cdot d\mathbf{r}\). For a finite path \(C\) the total work is the line integral
$$
W = \int_C \mathbf{F}(\mathbf{r}) \cdot d\mathbf{r}.
$$
When \(\mathbf{F}\) is constant the integral reduces to the dot product \(\mathbf{F} \cdot \Delta\mathbf{r}\). (Taylor, *Classical Mechanics*, 2005, §4.2.)

## 8. Visual — diagram or schematic
```text
          F
         /\
        /  θ
       /    \
      /      \
     ----------> d
   origin
```
Axes: horizontal x, vertical y. Vector \(\mathbf{d}\) lies along +x; vector \(\mathbf{F}\) makes angle θ with +x. The projection \(F \cos\theta\) is the adjacent side of the right triangle formed by dropping a perpendicular from the tip of \(\mathbf{F}\) onto the line of \(\mathbf{d}\).

## 9. The memory technique
**The hook** — imagine the force vector casting a “shadow” exactly along the displacement arrow; only the length of that shadow, multiplied by the arrow’s length, counts as work.

**What to overlearn** — \(W = \mathbf{F} \cdot \mathbf{d} = F d \cos\theta\); positive work when \(\theta < 90^\circ\), negative when \(\theta > 90^\circ\).

**Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — start from the definition of projection: the scalar component of \(\mathbf{F}\) parallel to \(\mathbf{d}\) is \(|\mathbf{F}| \cos\theta\); multiply by \(|\mathbf{d}|\) to recover the dot-product formula.

## 10. What this unlocks
Work is the bridge from Newton’s laws to the energy theorems. The work–kinetic-energy theorem follows at once, as does the definition of potential energy for conservative forces.

- Kinetic energy change equals net work (work–KE theorem)
- Line integrals of conservative forces become path-independent
- Power as the time derivative of work
- Rocket equation energy accounting (thrust work versus propellant kinetic energy)

## 11. Self-check — five questions, no answers
1. A 10 N force acts at 90° to a 2 m displacement. Compute the work and state the physical meaning of the result.

2. A sled is pulled by a rope at 30° to the horizontal with tension 80 N over 15 m. Calculate the work done by tension and by gravity (assume level snow).

3. A variable force \(F_x = 3x\) N acts from \(x = 0\) to \(x = 4\) m. Write the integral expression for the work and evaluate it.

4. In a closed rectangular path a constant force does +12 J on the rightward leg and −12 J on the leftward leg. What is the net work around the loop? What does the result imply about the force?

5. Two students compute the work done by friction on a sliding block. One uses the displacement of the bottom surface; the other uses the centre-of-mass displacement. Which value is correct for the mechanical-energy ledger, and why?