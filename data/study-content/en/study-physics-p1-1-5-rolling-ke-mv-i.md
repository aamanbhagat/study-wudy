## 1. The one-sentence answer
**A rigid body that rolls without slipping possesses total kinetic energy equal to the sum of its translational kinetic energy of the center of mass and its rotational kinetic energy about the center of mass.**

An object moving in a straight line stores kinetic energy only as ½mv². When the same object also spins while its point of contact remains instantaneously at rest, an additional term appears because every mass element is moving relative to the center of mass. The two contributions add because kinetic energy is a scalar and the velocity field is the vector sum of translation and rotation. The no-slip condition then links the two speeds through v = rω, allowing the expression to be rewritten in a single variable when needed.

The result follows directly from the definition of kinetic energy once the velocity of each particle is decomposed. It is not an approximation; it is exact for rigid bodies whose rotation axis is fixed relative to the center of mass.

> [!NOTE]
> The rotational term ½Iω² is never optional for rolling; omitting it undercounts the energy required to reach a given speed by the factor (1 + k), where k = I/(mr²).

## 2. Why this matters — concrete and current
The Mars 2020 Perseverance rover’s six aluminum wheels must accelerate from rest while climbing 30° slopes; mission planners use the rolling kinetic-energy expression to size the motors and predict power draw during traverses across Jezero crater.

SpaceX’s Starship prototypes perform controlled belly-flop maneuvers followed by flip-and-landing burns; the vehicle’s composite tanks and grid fins store both translational and rotational kinetic energy, and the same partition appears in the flight-software energy budget that decides when to ignite the Raptor engines.

High-precision gyro-stabilized platforms inside the James Webb Space Telescope’s fine-steering mirror assembly rely on the identical decomposition to keep reaction-wheel momentum within limits while the observatory slews between guide stars.

In semiconductor manufacturing, silicon wafers ride on air-bearing rollers inside EUV lithography scanners; the kinetic-energy budget determines the maximum acceleration before slip occurs and particles are generated.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Kinetic energy of a particle | Starting definition; total KE is sum over all particles   |
| Center-of-mass motion    | Allows separation of translation of CM and motion about CM |
| Moment of inertia I      | Quantifies resistance to rotation about a chosen axis     |
| Rigid-body velocity field | v_particle = v_CM + ω × r_rel; needed to square and integrate |
| No-slip rolling condition | Links v_CM and ω so the two energies can be compared      |

## 4. Building the idea — from intuition to formalism

### Step 1 — Kinetic energy is always ½mv² for each particle
Every particle of mass m_i moving at speed v_i stores ½m_i v_i². When many particles form a rigid body, the total kinetic energy is simply the sum of these terms.

Consider a dumbbell of two equal masses connected by a massless rod. If the dumbbell translates at 2 m/s without rotating, each mass contributes ½m(2)²; the total is 2m.

The formal statement is  
$$
K = \sum_i \frac12 m_i v_i^2.
$$

> [!WARNING]
> Treating the entire mass as moving at a single speed ignores internal velocity differences and undercounts K whenever rotation is present.

### Step 2 — Decompose velocity into center-of-mass translation plus rotation
For any rigid body the velocity of particle i is  
$$
\vec{v}_i = \vec{v}_\text{cm} + \vec{\omega} \times \vec{r}_i,
$$
where r_i is measured from the center of mass.

Squaring gives v_i² = v_cm² + 2 v_cm · (ω × r_i) + |ω × r_i|². The cross term integrates to zero because the center of mass is the balance point.

### Step 3 — Integrate to obtain two separate energies
After integration the total kinetic energy splits cleanly:  
$$
K = \frac12 M v_\text{cm}^2 + \frac12 I_\text{cm} \omega^2.
$$
The first term is the translational kinetic energy of the center of mass; the second is the rotational kinetic energy about the center of mass.

### Step 4 — Impose the rolling-without-slipping constraint
When a wheel or sphere rolls on a stationary surface without sliding, the contact point has zero instantaneous velocity. This enforces  
$$
v_\text{cm} = r\omega
$$
(with consistent signs). The two energies therefore become proportional.

### Step 5 — Write the compact rolling expression
Substituting the constraint yields the textbook result used throughout mechanics and vehicle dynamics:  
$$
K_\text{rolling} = \frac12 m v^2 + \frac12 I \omega^2.
$$

## 5. Worked examples — every step shown

**Example 1 — Solid sphere rolling at constant speed**  
*Given:* A uniform solid sphere (m = 2 kg, r = 0.1 m, I_cm = 0.4 m r²) rolls without slipping at v_cm = 3 m/s.  
*Find:* Total kinetic energy.  

Why: Use the rolling formula directly.  
$$
K = \frac12 m v^2 + \frac12 I_\text{cm} \omega^2
$$  
Why: No-slip gives ω = v/r = 30 rad/s.  
$$
I_\text{cm} = 0.4 \times 2 \times (0.1)^2 = 0.008\,\text{kg·m}^2
$$  
Why: Substitute numerical values.  
$$
K = \frac12(2)(9) + \frac12(0.008)(900) = 9 + 3.6 = 12.6\,\text{J}
$$  
**12.6 J**

*Reflection:* The rotational share is 28.6 % of the total; the factor (1 + 2/5) = 1.4 multiplies the translational term.

**Example 2 — Hoop rolling down an incline**  
*Given:* A thin hoop (m = 0.5 kg, r = 0.2 m) starts from rest and rolls 1.5 m down a 20° incline.  
*Find:* Speed at the bottom using energy conservation.  

Why: Loss in potential equals gain in rolling KE.  
$$
m g h = \frac12 m v^2 + \frac12 I \omega^2,\quad I = m r^2,\quad \omega = v/r
$$  
Why: Simplify using k = I/(m r²) = 1.  
$$
m g (1.5 \sin 20^\circ) = \frac12 m v^2 (1 + 1) \implies v = \sqrt{g h}
$$  
Why: Evaluate.  
$$
v = \sqrt{9.81 \times 0.513} \approx 2.24\,\text{m/s}
$$  
**2.24 m/s**

*Reflection:* The hoop is slower than a sliding block because half the potential energy is locked in rotation.

**Example 3 — Sphere versus cylinder race**  
*Given:* A solid sphere (k = 2/5) and a solid cylinder (k = 1/2) roll from rest down the same height h.  
*Find:* Ratio of their final speeds.  

Why: Both obey mgh = ½ m v² (1 + k).  
$$
v = \sqrt{\frac{2gh}{1+k}}
$$  
Why: Form the ratio.  
$$
\frac{v_\text{sphere}}{v_\text{cyl}} = \sqrt{\frac{1 + 0.5}{1 + 0.4}} = \sqrt{1.071} \approx 1.035
$$  
**1.035**

*Reflection:* Even a 0.1 difference in k produces a measurable speed advantage.

**Example 4 — Rolling object with external torque**  
*Given:* A wheel (m = 10 kg, I_cm = 0.8 kg·m², r = 0.25 m) receives a constant torque τ = 4 N·m for 3 s starting from rest.  
*Find:* Final translational speed assuming no slip.  

Why: Angular impulse changes angular momentum.  
$$
\tau t = I \omega \implies \omega = \frac{4\times3}{0.8} = 15\,\text{rad/s}
$$  
Why: Convert to linear speed via rolling constraint.  
$$
v = r\omega = 0.25\times15 = 3.75\,\text{m/s}
$$  
Why: Verify energy balance (optional cross-check).  
$$
K = \frac12(10)(3.75)^2 + \frac12(0.8)(15)^2 = 70.3 + 90 = 160.3\,\text{J}
$$  
Work done by torque equals rotational KE; friction does no work because contact point is at rest.  
**3.75 m/s**

*Reflection:* The translational speed is obtained solely from ω once the constraint is enforced.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using I about the contact point instead of CM | Confusion with parallel-axis theorem or instantaneous axis | Always compute rotational KE about the center of mass; translation is handled separately |
| Forgetting ω = v/r when substituting | Treating v and ω as independent variables | Write the constraint explicitly before algebra |
| Applying ½Iω² to slipping objects | Assuming the formula requires only rotation | Verify no-slip condition first; otherwise total KE must be integrated particle-by-particle |
| Using I = ½mr² for every rolling shape | Over-generalizing the disk formula | Look up or derive the correct I for the actual mass distribution |
| Neglecting that friction can do no work at the contact point | Thinking friction always dissipates energy | Remember the instantaneous velocity at contact is zero under pure rolling |
| Adding ½mv² + ½Iω² without converting units of ω | rad/s versus rev/min mismatch | Convert angular speed to rad/s before numerical evaluation |
| Assuming total KE equals ½I_contact ω² for all problems | Over-reliance on instantaneous-axis shortcut | Use only when the surface is fixed and you need dynamics; energy bookkeeping is safer with CM terms |

## 7. The textbook-precise statement
For a rigid body of total mass M whose center of mass moves at velocity v_cm while the body rotates at angular velocity ω about an axis through the center of mass, the total kinetic energy is  
$$
K = \frac12 M v_\text{cm}^2 + \frac12 I_\text{cm}\omega^2,
$$  
where I_cm is the moment of inertia about the center-of-mass axis. When the body rolls without slipping on a stationary surface, the kinematic constraint v_cm = rω holds, and the expression is conventionally written  
$$
K_\text{rolling} = \frac12 m v^2 + \frac12 I\omega^2.
$$  
(Goldstein, *Classical Mechanics*, 3e, §4.9; Kleppner & Kolenkow, *An Introduction to Mechanics*, 2e, §6.4.)

## 8. Visual — diagram or schematic
```text
          ω (CCW)
           ↑
      +----+----+
     /     |     \
    |      | r    |  v_cm → (right)
     \     |     /
      +----+----+
          ● CM
           |
           |  contact point P (instantaneous velocity = 0)
          ground (stationary)
```
The diagram shows a wheel of radius r. The center-of-mass velocity v_cm points horizontally; the angular velocity ω points out of the page (right-hand rule). At the contact point P the rotational velocity rω exactly cancels v_cm, satisfying the no-slip condition.

## 9. The memory technique
1. **The hook** — Picture a rolling coin: the center flies forward while the coin itself spins; both motions carry “money” (energy) that must be paid to reach a given speed.
2. **What to overlearn** — K = ½mv² + ½Iω² with v = rω; the factor (1 + I/mr²) multiplies translational KE.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Return to K = Σ ½m_i v_i², insert v_i = v_cm + ω × r_i, integrate, and apply the no-slip constraint.

## 10. What this unlocks
This partition of kinetic energy is the direct gateway to Lagrangian mechanics of rolling systems, stability analysis of rolling vehicles, and energy methods in orbital mechanics where reaction wheels exchange angular momentum with the spacecraft bus.

- Rolling down inclines and effective mass in Atwood machines with pulleys
- Yo-yo dynamics and spool problems
- Conservation of energy in variable-mass rockets with spinning stages
- Derivation of the moment of inertia from rolling oscillation periods

## 11. Self-check — five questions, no answers
1. A solid sphere and a hollow sphere of equal mass and radius roll down the same incline from rest. Which reaches the bottom first, and by what factor are their speeds different?
2. Derive the condition on the friction coefficient μ that permits a sphere to roll without slipping when a horizontal force F is applied at its center.
3. An object rolls inside a vertical loop. At what height must it start so that the normal force remains positive at the top while still obeying the rolling constraint?
4. Show that the instantaneous axis at the contact point yields the same total kinetic energy as the center-of-mass decomposition only when the no-slip condition holds.
5. A thin rod of length L stands vertically on a frictionless table and tips over. After it has rotated through angle θ, what fraction of its kinetic energy is rotational about its center of mass?