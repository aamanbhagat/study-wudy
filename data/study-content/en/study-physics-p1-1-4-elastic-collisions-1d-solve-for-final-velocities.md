## 1. The one-sentence answer
**Elastic collisions in one dimension are solved for final velocities by simultaneously enforcing conservation of momentum and conservation of kinetic energy, yielding explicit algebraic expressions for the post-collision speeds.**

Two bodies approach each other along a straight line. Their incoming velocities and masses are known. Because the collision returns all kinetic energy to the objects rather than dissipating it as heat or deformation, the scalar sum of (1/2)mv² remains identical before and after. Linear momentum m v likewise remains unchanged. These two scalar statements supply two independent equations in two unknowns—the two outgoing velocities—allowing direct algebraic solution without reference to the brief interaction forces.

The resulting formulas are symmetric and reduce to intuitive limits: equal masses exchange velocities; a light object striking a heavy stationary target rebounds with nearly its original speed while the heavy target creeps forward slowly.

> [!NOTE]
> The decisive insight is that the two conservation laws together close the system completely; once they are written, the interaction details cancel and the final velocities become functions only of the four initial quantities.

## 2. Why this matters — concrete and current
In neutron moderation inside nuclear reactors, fast neutrons collide elastically with hydrogen nuclei in water or polyethylene; the derived velocity-exchange formulas determine how quickly the neutron population thermalizes, directly affecting reactor control-rod timing and fuel-cycle length at facilities such as those operated by EDF and Rosatom.

Spacecraft designers at NASA and ESA use the same one-dimensional elastic solutions to predict the velocity change imparted to a servicing satellite when its robotic arm captures a cooperative target; the mass-ratio dependence governs propellant budgeting for the Northrop Grumman MEV-1 and MEV-2 missions already performing such dockings.

High-energy physicists at CERN extract particle masses from elastic scattering kinematics in fixed-target runs; the algebraic expressions for final velocities allow experimenters to convert measured laboratory angles into center-of-mass scattering angles without iterative simulation for each event.

In precision semiconductor manufacturing, ion implanters rely on elastic nuclear collisions between accelerated dopant ions and lattice atoms; the velocity formulas predict the depth distribution of implanted species, enabling process engineers at Intel and TSMC to tune beam energy for sub-5 nm node junctions.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Linear momentum          | Supplies the first scalar equation relating the four velocities |
| Kinetic energy           | Supplies the second independent scalar equation that closes the system |
| One-dimensional kinematics | Restricts all motion to a single axis so vectors reduce to signed scalars |
| Algebraic solution of two linear equations | Required to isolate the two unknown final velocities      |

## 4. Building the idea — from intuition to formalism

### Step 1 — Define an elastic collision
An elastic collision is one in which the total kinetic energy of the system is unchanged by the interaction.  
Consider two billiard balls of masses 0.2 kg and 0.3 kg rolling toward each other at 1 m s⁻¹ and −2 m s⁻¹; after they collide the sum (1/2)m v² must still equal 0.7 J.  
Formally,  
$$
\frac12 m_1 u_1^2 + \frac12 m_2 u_2^2 = \frac12 m_1 v_1^2 + \frac12 m_2 v_2^2.
$$
> [!WARNING]  
> Treating the collision as elastic when even 5 % of the energy is lost to sound or deformation produces final velocities that violate experimental observation by tens of percent.

### Step 2 — Write momentum conservation
Momentum is conserved because the interaction forces are internal and equal-and-opposite.  
For the same two balls the total momentum before impact is 0.2·1 + 0.3·(−2) = −0.4 kg m s⁻¹ and must equal the total afterward.  
Formally,  
$$
m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2.
$$

### Step 3 — Rearrange the two equations
Subtract the momentum equation from the energy equation after suitable algebraic manipulation; the difference isolates a relative-velocity relation.  
The algebra yields the compact statement that the relative velocity reverses sign:  
$$
v_2 - v_1 = u_1 - u_2.
$$

### Step 4 — Solve the linear system
Treat the momentum and relative-velocity equations as simultaneous linear relations in v₁ and v₂.  
Clearing the unknowns produces the standard closed-form expressions:  
$$
v_1 = \frac{m_1-m_2}{m_1+m_2}u_1 + \frac{2m_2}{m_1+m_2}u_2,
$$
$$
v_2 = \frac{2m_1}{m_1+m_2}u_1 + \frac{m_2-m_1}{m_1+m_2}u_2.
$$

### Step 5 — Verify limiting cases
When m₁ = m₂ the formulas reduce to v₁ = u₂ and v₂ = u₁, recovering the velocity-exchange rule observed on a frictionless air track.  
When m₂ ≫ m₁ and u₂ = 0 the light mass rebounds with v₁ ≈ −u₁, matching everyday experience of a tennis ball striking a wall.

## 5. Worked examples — every step shown

**Example 1 — Equal masses, target at rest**  
*Given:* m₁ = m₂ = 2 kg, u₁ = 4 m s⁻¹, u₂ = 0.  
*Find:* v₁ and v₂.  

Momentum: 2·4 + 2·0 = 2v₁ + 2v₂ ⇒ 4 = v₁ + v₂.  
Relative velocity: v₂ − v₁ = 4 − 0 ⇒ v₂ − v₁ = 4.  
Add the two equations: 2v₂ = 8 ⇒ v₂ = 4 m s⁻¹.  
Subtract: 2v₁ = 0 ⇒ v₁ = 0.  

**v₁ = 0 m s⁻¹, v₂ = 4 m s⁻¹**  

*Reflection:* The algebra collapses immediately once masses cancel; the result generalizes to any equal-mass elastic pair.

**Example 2 — Unequal masses, target at rest**  
*Given:* m₁ = 1 kg, m₂ = 3 kg, u₁ = 5 m s⁻¹, u₂ = 0.  
*Find:* v₁, v₂.  

Substitute into the derived formulas:  
v₁ = (1−3)/(1+3)·5 + (2·3)/(4)·0 = (−2/4)·5 = −2.5 m s⁻¹,  
v₂ = (2·1)/(4)·5 + (3−1)/4·0 = (2/4)·5 = 2.5 m s⁻¹.  

**v₁ = −2.5 m s⁻¹, v₂ = 2.5 m s⁻¹**  

*Reflection:* The light projectile rebounds while transferring half its speed to the heavier target; the pattern appears in every mass-ratio case.

**Example 3 — Both masses moving toward each other**  
*Given:* m₁ = 4 kg, m₂ = 2 kg, u₁ = 3 m s⁻¹, u₂ = −3 m s⁻¹.  
*Find:* v₁, v₂.  

v₁ = (4−2)/(6)·3 + (4/6)·(−3) = (1/3)·3 − (2/3)·3 = 1 − 2 = −1 m s⁻¹,  
v₂ = (8/6)·3 + (2−4)/6·(−3) = (4/3)·3 − (1/3)·(−3) = 4 + 1 = 5 m s⁻¹.  

**v₁ = −1 m s⁻¹, v₂ = 5 m s⁻¹**  

*Reflection:* Opposite initial directions produce a sign change that must be tracked carefully in every term.

**Example 4 — Heavy projectile overtaking light target**  
*Given:* m₁ = 5 kg, m₂ = 1 kg, u₁ = 2 m s⁻¹, u₂ = 6 m s⁻¹.  
*Find:* v₁, v₂.  

v₁ = (5−1)/6·2 + (2/6)·6 = (4/6)·2 + (1/3)·6 = 4/3 + 2 = 10/3 m s⁻¹,  
v₂ = (10/6)·2 + (1−5)/6·6 = (5/3)·2 − (4/6)·6 = 10/3 − 4 = −2/3 m s⁻¹.  

**v₁ = 10/3 m s⁻¹, v₂ = −2/3 m s⁻¹**  

*Reflection:* The lighter body is driven backward relative to the lab frame; the calculation demonstrates that initial ordering of speeds does not alter the algebraic procedure.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using only momentum conservation  | Students forget a second equation is required | Always write both conservation statements before solving |
| Sign error on relative velocity   | Direction reversal is counter-intuitive     | Explicitly verify v₂ − v₁ = u₁ − u₂ after each solution |
| Treating masses as vectors        | Confusion with vector momentum              | Keep masses strictly positive scalars                |
| Assuming v₁ = 0 when target heavier | Over-generalizing equal-mass result         | Insert numerical mass ratio into the formula first   |
| Forgetting units consistency      | Mixed SI and imperial data                  | Convert every quantity to consistent units before substitution |
| Applying formulas to inelastic data | Real collisions dissipate energy            | Check that calculated KE_final equals KE_initial     |
| Neglecting 1-D restriction        | Attempting to use 2-D angles               | Confirm all velocities lie on a single line          |

## 7. The textbook-precise statement
For two particles of masses m₁ and m₂ undergoing a one-dimensional elastic collision, the laboratory-frame velocities after impact are given exactly by  
$$
v_1 = \frac{m_1-m_2}{m_1+m_2}u_1 + \frac{2m_2}{m_1+m_2}u_2, \qquad
v_2 = \frac{2m_1}{m_1+m_2}u_1 + \frac{m_2-m_1}{m_1+m_2}u_2,
$$  
provided the interaction conserves both momentum and kinetic energy and no external forces act along the line of centers during the brief collision interval (Taylor, *Classical Mechanics*, 2005, §4.4).

## 8. Visual — diagram or schematic
```text
Lab frame (x increasing right)
          u1 > 0          u2 < 0
   m1 ────────►     ◄─────── m2
   ────────────────────────────── x
          v1 ?            v2 ?
After collision the arrows reverse or exchange according to the mass ratio.
```

## 9. The memory technique
1. **The hook** — Picture two freight cars coupling and then magically “bouncing” with perfect spring energy; the lighter car always ends up moving as though it had passed through the heavier one and swapped identities.  
2. **What to overlearn** — The pair of final-velocity formulas and the relative-velocity reversal v₂ − v₁ = u₁ − u₂.  
3. **Spaced-repetition schedule** — Review the formulas at 1 day, 3 days, 7 days, 16 days, and 35 days after first mastery.  
4. **First-principles fallback** — Re-derive by writing momentum and energy conservation, subtracting after multiplying the momentum equation by an auxiliary velocity, and solving the resulting linear pair.

## 10. What this unlocks
Mastery of the one-dimensional elastic solution supplies the algebraic kernel for every subsequent treatment of collisions.  

- Two-dimensional elastic collisions are solved by resolving velocities along the line of centers and applying the identical 1-D formulas to the normal components.  
- The coefficient of restitution is introduced as a continuous parameter between the elastic (e = 1) and perfectly inelastic (e = 0) limits.  
- Center-of-mass frame transformations become transparent once the lab-frame velocities are known.  
- Relativistic elastic kinematics reduce to the same structure after replacement of classical momentum and energy by their four-vector counterparts.

## 11. Self-check — five questions, no answers
1. Two equal masses collide elastically; one is initially at rest. Predict the final velocities without substituting numbers into the general formula.  
2. A 10 kg mass moving at 4 m s⁻¹ strikes a stationary 2 kg mass. Calculate both final velocities and verify that kinetic energy is conserved to three significant figures.  
3. In an elastic collision the target is three times more massive than the projectile and initially at rest. Is it possible for the projectile to continue forward after impact? Justify with the sign of v₁.  
4. A student obtains v₁ = 3 m s⁻¹ and v₂ = −1 m s⁻¹ from the elastic formulas but measures kinetic energy increasing by 8 %. Identify the most probable algebraic mistake.  
5. Derive the condition on the mass ratio such that the projectile stops dead after striking a stationary target; prove that only one specific ratio satisfies the condition.