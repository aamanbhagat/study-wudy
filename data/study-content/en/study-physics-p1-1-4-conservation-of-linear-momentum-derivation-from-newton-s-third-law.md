## 1. The one-sentence answer
**Conservation of linear momentum follows directly from Newton's third law: when two bodies interact, the forces they exert on each other are equal and opposite, so their momentum changes cancel exactly and the system's total momentum stays constant in the absence of external forces.**

Consider two isolated objects pushing against each other. Whatever momentum one gains, the other loses at the same rate. The individual momenta can change, yet their vector sum does not. This cancellation occurs at every instant because the third law operates continuously.

Extend the picture to any number of particles. Every internal pair obeys the same rule. All internal contributions therefore sum to zero, leaving only external forces able to alter the total momentum.

> [!NOTE]
> Momentum conservation is not an independent postulate; it is the integrated consequence of action-reaction pairs inside an isolated system.

## 2. Why this matters — concrete and current
SpaceX recovers Falcon 9 first stages by separating the booster while the upper stage continues; the momentum carried away by exhaust and separation mechanisms must be accounted for so the booster’s remaining velocity vector stays within the narrow re-entry corridor.

In high-energy particle detectors at CERN, two protons collide inside the LHC. Because the initial total momentum is known to high precision along the beam axis, any missing transverse momentum signals the production of undetected neutrinos or other neutral particles.

Semiconductor wire-bonding machines accelerate a capillary tip to bond gold wire to a die. The stage holding the die must absorb an equal-and-opposite impulse; conservation of momentum lets engineers calculate the required counter-mass motion so vibration transmitted to adjacent dies stays below 10 nm.

Binary asteroid systems such as 1999 KW4 exhibit mutual orbits whose period and separation obey momentum balance about their common centre of mass; radar astronomers use this relation to infer individual masses without waiting for a spacecraft fly-by.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Newton's second law            | Links force to the time derivative of momentum            |
| Vector addition                | Momentum is a vector; cancellation must be shown component-wise |
| Isolated system                | Defines the boundary inside which internal forces alone act |

## 4. Building the idea — from intuition to formalism

### Step 1 — Newton's third law in force language
Two bodies exert forces on each other that are equal in magnitude and opposite in direction at every instant.  
Concrete example: a 2 kg block pushes a 3 kg block with 5 N to the right; the 3 kg block pushes back with 5 N to the left.  
Formal statement:  
\[
\vec{F}_{12} = -\vec{F}_{21}.
\]
> [!WARNING]
> Treating the forces as equal but not opposite in direction breaks the cancellation that follows.

### Step 2 — Force equals momentum change rate
Newton’s second law written for each body reads  
\[
\vec{F}_{12} = \frac{d\vec{p}_1}{dt}, \qquad \vec{F}_{21} = \frac{d\vec{p}_2}{dt}.
\]
The concrete numbers above give each block a momentum change rate of 5 N (or 5 kg m s⁻²).

### Step 3 — Substitute the third-law pair
Insert the third-law relation:  
\[
\frac{d\vec{p}_1}{dt} = -\frac{d\vec{p}_2}{dt}.
\]
Rearrangement yields the differential statement  
\[
\frac{d}{dt}(\vec{p}_1 + \vec{p}_2) = 0.
\]

### Step 4 — Integrate over time
Because the derivative of the sum is identically zero, the sum itself cannot change:  
\[
\vec{p}_1 + \vec{p}_2 = \text{constant}.
\]
This is the two-body conservation law.

### Step 5 — Extend to N bodies
Every internal pair obeys the same cancellation. Summing over all pairs, every internal force appears once positive and once negative; the net internal contribution vanishes. Only external forces survive:  
\[
\frac{d\vec{P}_{\text{total}}}{dt} = \vec{F}_{\text{ext}}.
\]

### Step 6 — Isolated-system limit
When \(\vec{F}_{\text{ext}} = 0\),  
\[
\vec{P}_{\text{total}} = \text{constant}.
\]
This is the textbook statement of linear-momentum conservation.

## 5. Worked examples — every step shown

**Example 1 — Two equal masses, head-on push**  
*Given:* Two 1.0 kg carts on a frictionless track; cart A starts at rest, cart B approaches with velocity 2.0 m s⁻¹. They exchange a brief internal force.  
*Find:* Velocities immediately after interaction if the carts do not stick.  

Cart A receives impulse \(J\):  
\[
\Delta p_A = J \implies m v_A' = J \quad \text{(Why: definition of impulse as change in momentum)}.
\]  
Cart B receives \(-J\):  
\[
m v_B' - m v_B = -J \quad \text{(Why: third-law pair)}.
\]  
Add the two equations:  
\[
m(v_A' + v_B') = m v_B \implies v_A' + v_B' = v_B.
\]  
For elastic equal-mass exchange the solution satisfying the vector relation is \(v_A' = 2.0\) m s⁻¹, \(v_B' = 0\).  
**Final answer**  
\[
v_A' = 2.0\,\text{m s}^{-1},\quad v_B' = 0.
\]  
*Reflection:* The algebra is simplest when masses are equal; the same addition step works for any masses once the relative velocity reversal condition is supplied.

**Example 2 — Ice skaters pushing apart**  
*Given:* Two skaters, masses 60 kg and 80 kg, initially at rest on frictionless ice. They push each other with a constant 120 N force for 0.50 s.  
*Find:* Final velocities.  

Impulse on each: \(J = 120 \times 0.50 = 60\) N s.  
60 kg skater: \(60 v_1 = 60 \implies v_1 = 1.0\) m s⁻¹.  
80 kg skater: \(80 v_2 = -60 \implies v_2 = -0.75\) m s⁻¹.  
**Final answer**  
\[
\vec{v}_1 = 1.0\,\text{m s}^{-1},\quad \vec{v}_2 = -0.75\,\text{m s}^{-1}.
\]  
*Reflection:* Directions are automatically opposite once the sign convention is fixed; total momentum remains zero.

**Example 3 — Ballistic pendulum (inelastic)**  
*Given:* 0.010 kg bullet at 400 m s⁻¹ embeds in a 2.0 kg block hanging from strings.  
*Find:* Velocity of block immediately after embedding.  

Momentum before: \(0.010 \times 400 = 4.0\) kg m s⁻¹.  
Momentum after: \((2.01) v\).  
Conservation: \(4.0 = 2.01 v \implies v = 1.99\) m s⁻¹.  
**Final answer**  
\[
v = 1.99\,\text{m s}^{-1}.
\]  
*Reflection:* Kinetic energy is not conserved, yet momentum is; the internal deformation force is still an internal pair.

**Example 4 — Rocket in free space**  
*Given:* 1000 kg rocket ejects 10 kg of fuel at 2000 m s⁻¹ relative to the rocket; initial velocity zero.  
*Find:* Rocket velocity after fuel ejection (treat as instantaneous).  

Let final rocket velocity be \(v_r\). Fuel velocity relative to inertial frame is \(v_r - 2000\).  
Momentum: \(990 v_r + 10(v_r - 2000) = 0\).  
\(1000 v_r - 20000 = 0 \implies v_r = 20\) m s⁻¹.  
**Final answer**  
\[
v_r = 20\,\text{m s}^{-1}.
\]  
*Reflection:* The same cancellation occurs continuously; variable-mass systems are handled by integrating the instantaneous third-law pairs.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting vectors                | Students treat momentum as scalar           | Always resolve components before summing     |
| Applying conservation with external forces present | Habit of ignoring friction or gravity       | Draw free-body diagram first                 |
| Confusing system boundary         | Including only one colliding body           | Explicitly list all objects inside the system|
| Sign errors in one dimension      | Choosing inconsistent positive direction    | Fix positive direction once, then be consistent|
| Assuming kinetic energy conservation | Momentum lesson is taught near energy lessons | Ask “is the collision elastic?” each time    |
| Treating momentum as velocity     | Same units, different concepts              | Keep mass factor explicit in every equation  |
| Ignoring reference-frame choice   | Non-inertial frames introduce fictitious forces | State inertial frame before writing equations|

## 7. The textbook-precise statement
Let a system of \(N\) particles have momenta \(\vec{p}_i = m_i \vec{v}_i\). If the net external force vanishes,  
\[
\frac{d}{dt}\sum_{i=1}^N \vec{p}_i = 0 \implies \sum_{i=1}^N \vec{p}_i = \text{constant vector}.
\]  
This follows at once from Newton’s third law applied to every internal pair (Feynman Lectures on Physics, Vol. I, §9–2).

## 8. Visual — diagram or schematic
```text
          p1 →          ← p2
   m1 •──────────────• m2
         F12 = -F21
   (isolated pair, no external forces)
```
Horizontal line represents the line of interaction; arrows show momentum vectors before any external impulse arrives. The force pair is drawn as equal-length opposing arrows between the masses.

## 9. The memory technique

**The hook**  
Picture two ice skaters holding opposite ends of a rope; every tug they exchange is a perfect mirror image, so the centre of mass never drifts.

**What to overlearn**  
1. \(\vec{F}_{12}=-\vec{F}_{21}\).  
2. \(\frac{d\vec{P}}{dt}=\vec{F}_{\rm ext}\).  
3. When \(\vec{F}_{\rm ext}=0\), \(\vec{P}=\) constant.

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Start from the third-law pair, replace each force by \(d\vec{p}/dt\), add the two equations, integrate.

## 10. What this unlocks
The principle supplies the foundation for collision analysis, variable-mass rocket equations, centre-of-mass motion, and recoil calculations in particle physics.  

- Inelastic and elastic collision formulae  
- Rocket thrust equation in vacuum  
- Reduced-mass two-body problem  
- Impulse-momentum diagrams for impact loading

## 11. Self-check — five questions, no answers
1. Two 5 kg masses approach each other at 3 m s⁻¹ and 4 m s⁻¹ on a frictionless line. After an internal spring pushes them apart, one moves at 5 m s⁻¹. What is the other’s velocity?  
2. A 0.2 kg ball strikes a stationary 0.8 kg ball head-on. The lighter ball rebounds at half its incident speed. Is momentum conserved? Show the arithmetic.  
3. Why does a spacecraft firing its attitude-control thrusters experience no net change in centre-of-mass velocity?  
4. A student claims “momentum is always conserved, even when a ball hits the floor.” Identify the external force that violates the premise.  
5. Derive the condition under which the centre-of-mass velocity of an isolated two-body system remains zero when viewed from the lab frame.