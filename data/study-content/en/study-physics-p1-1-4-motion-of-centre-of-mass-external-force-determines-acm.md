## 1. The one-sentence answer
**The acceleration of a system’s centre of mass is fixed by the net external force alone: \(\mathbf{a}_\text{CM} = \mathbf{F}_\text{ext, net}/M\).**

Internal forces between parts of the system cancel in pairs by Newton’s third law and therefore never shift the centre-of-mass trajectory. Only forces from outside the system—gravity, thrust, drag, contact with another body—can change the velocity of the centre of mass. Consequently, once the external forces are known, the motion of the centre of mass can be calculated exactly as if all the mass were concentrated at that single point.

This separation between internal and external effects is what lets engineers treat a rocket plus its exhaust as one system while still predicting the rocket’s overall path, or lets astronomers follow the orbit of a binary star pair without solving every detail of their mutual gravity.

> [!NOTE]
> The centre of mass accelerates exactly as a single point particle would under the net external force; everything else is internal bookkeeping.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage return relies on the fact that the centre-of-mass trajectory after stage separation is fixed solely by Earth’s gravity and residual aerodynamic drag; the internal explosive bolts and cold-gas thrusters that push the booster away do not alter that trajectory.

In the design of the James Webb Space Telescope’s sunshield, engineers model the five-layer membrane plus spacecraft bus as one rigid body whose centre-of-mass acceleration under solar radiation pressure must remain inside a tight station-keeping box at L2; internal tensioning motors never appear in the external-force budget.

During the DART mission impact on Dimorphos, the momentum transferred to the binary asteroid system was calculated by treating the spacecraft-plus-asteroid pair as a single system whose centre-of-mass velocity changed only by the external impulse delivered at contact; post-impact ejecta plumes were internal and therefore irrelevant to the orbital-period shift measurement.

Semiconductor wire-bonding machines vibrate at kilohertz frequencies; the stage controller predicts the motion of the centre of mass of the moving head plus wire spool so that reaction forces transmitted to the granite base remain below the isolation threshold, again using only external forces from the voice-coil actuators.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Position and velocity vectors | Centre-of-mass coordinates are weighted averages of these vectors |
| Newton’s second and third laws | External force equals total mass times a_CM; internal forces cancel |
| Summation notation       | Definition of centre of mass is a sum over all particles  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Position of the centre of mass
The centre of mass is the balance point of the system. For two equal masses the balance point lies exactly midway; for unequal masses it lies closer to the heavier one.

Example: two particles, 2 kg at x = 0 m and 4 kg at x = 3 m. The balance point is at x = 2 m.

Formally,
\[
\mathbf{R}_\text{CM} = \frac{1}{M}\sum_i m_i\mathbf{r}_i, \quad M = \sum_i m_i.
\]

> [!WARNING]
> Treating the centre of mass as the arithmetic mean of positions instead of the mass-weighted mean produces wrong results as soon as masses differ.

### Step 2 — Velocity of the centre of mass
Differentiate the position definition with respect to time. Masses are constant, so
\[
\mathbf{V}_\text{CM} = \frac{1}{M}\sum_i m_i\mathbf{v}_i.
\]

Example: the same two particles now move at 1 m s⁻¹ and 2 m s⁻¹ respectively; V_CM = 5/3 m s⁻¹.

### Step 3 — Acceleration of the centre of mass
Differentiate once more:
\[
\mathbf{A}_\text{CM} = \frac{1}{M}\sum_i m_i\mathbf{a}_i.
\]

### Step 4 — Apply Newton’s second law to every particle
For each particle i,
\[
m_i\mathbf{a}_i = \mathbf{F}_i^\text{ext} + \sum_{j\neq i}\mathbf{F}_{ij},
\]
where F_ij is the force on i due to j.

### Step 5 — Sum over all particles
Sum the equations:
\[
\sum_i m_i\mathbf{a}_i = \sum_i\mathbf{F}_i^\text{ext} + \sum_i\sum_{j\neq i}\mathbf{F}_{ij}.
\]
The double sum of internal forces vanishes because F_ij = –F_ji (Newton’s third law) and therefore pairs cancel.

### Step 6 — Arrive at the governing equation
The left side is exactly M A_CM, yielding the textbook result
\[
M\mathbf{A}_\text{CM} = \mathbf{F}_\text{ext, net}.
\]

## 5. Worked examples — every step shown

**Example 1 — Two blocks connected by a spring on a frictionless table**  
*Given:* 3 kg block at rest, 5 kg block given initial velocity 2 m s⁻¹ rightward; spring force internal.  
*Find:* acceleration of centre of mass.  
Step 1: net external force = 0.  
*Why:* no friction or other external horizontal forces.  
Step 2: A_CM = 0 / 8 = 0.  
**Answer:** \(\mathbf{a}_\text{CM} = 0\).  
*Reflection:* internal spring force never appears; CM continues at constant velocity.

**Example 2 — Exploding projectile**  
*Given:* 10 kg projectile at apex, velocity 50 m s⁻¹ horizontal; internal explosion splits it into 4 kg and 6 kg fragments.  
*Find:* acceleration of centre of mass immediately after explosion.  
Step 1: only external force is gravity, –98 N vertical.  
*Why:* explosion forces are internal.  
Step 2: a_CM,y = –98/10 = –9.8 m s⁻².  
**Answer:** \(\mathbf{a}_\text{CM} = -9.8\,\hat{\jmath}\) m s⁻².  
*Reflection:* fragments fly apart yet their mass-weighted average still falls at g.

**Example 3 — Rocket ejecting fuel**  
*Given:* 5000 kg rocket plus 2000 kg fuel; external force = –5000 × 9.8 N gravity plus 30 000 N thrust.  
*Find:* a_CM at that instant.  
Step 1: F_ext,net = 30 000 – 49 000 = –19 000 N.  
*Why:* thrust is external once exhaust has left the nozzle.  
Step 2: a_CM = –19 000 / 7000 ≈ –2.71 m s⁻².  
**Answer:** \(\mathbf{a}_\text{CM} \approx -2.71\,\hat{\jmath}\) m s⁻².  
*Reflection:* fuel still inside counts toward total mass; ejected fuel does not.

**Example 4 — Three-body collision in space**  
*Given:* three satellites, masses 100 kg, 200 kg, 300 kg, initial velocities known; only mutual gravitational forces after contact.  
*Find:* long-term motion of centre of mass.  
Step 1: net external force = 0.  
*Why:* mutual gravity internal.  
Step 2: A_CM remains zero; CM moves with constant velocity equal to initial V_CM.  
**Answer:** uniform rectilinear motion of CM.  
*Reflection:* even though individual orbits are complicated, the system barycentre coasts.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Including internal forces in F_ext,net | Habit of writing every force that appears in a free-body diagram | Draw a dashed boundary around the whole system first; only forces crossing the boundary count |
| Forgetting that thrust becomes external once exhaust leaves | Thinking “the rocket pushes on its own fuel” | Redefine the system boundary after each mass element is ejected |
| Using arithmetic mean instead of mass-weighted mean | Intuition from geometry class | Always write the sum m_i r_i / M explicitly |
| Assuming a_CM = 0 whenever total momentum is conserved | Confusing isolated with force-free | Check whether any external force (gravity, magnetic field, etc.) exists |
| Treating variable-mass systems as having constant M | Textbook problems often keep M fixed | Use M(t) when mass crosses the system boundary (rockets, conveyors) |
| Neglecting that a_CM is a vector | One-dimensional examples dominate early homework | Keep vector notation until the last line of every calculation |
| Believing internal forces can never change kinetic energy | Over-generalising the CM theorem | Remember the theorem constrains only the CM motion, not relative motion or energy |

## 7. The textbook-precise statement
For a system of N particles with constant individual masses m_i, let the net external force on the system be F_ext,net. Then the acceleration of the centre of mass satisfies
\[
M\mathbf{A}_\text{CM} = \mathbf{F}_\text{ext, net},\qquad M=\sum_{i=1}^N m_i,
\]
provided Newton’s third law holds for every internal pair (F_ij = –F_ji). This is Theorem 8.16 in Kleppner & Kolenkow, *An Introduction to Mechanics*, 2nd ed.

## 8. Visual — diagram or schematic
```text
          F_ext (down)
              ↓
   m1 ●────────● m2
       \      /
        \    /
         ● CM
```
Labelled axes: horizontal x, vertical y; CM marked at weighted average position; only the external arrow crosses the dashed system boundary.

## 9. The memory technique
**The hook** — Picture the centre of mass as a tiny, indestructible bead threaded on a wire; only hands outside the system can push that bead.

**What to overlearn**  
- a_CM = F_ext,net / M  
- Internal forces cancel in pairs  
- Boundary defines what is external

**Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Start from the definition R_CM = Σ m_i r_i / M, differentiate twice, insert Newton’s second law for each particle, cancel internal pairs.

## 10. What this unlocks
This result lets every later analysis of collisions, variable-mass rockets, and rigid-body rotation treat the translational motion of the system separately from its internal degrees of freedom.

- Linear momentum conservation when F_ext,net = 0  
- Rocket equation derivation  
- Two-body problem reduction to equivalent one-body orbit about the barycentre  
- Impulse–momentum theorems for extended bodies

## 11. Self-check — five questions, no answers
1. A 2 kg ball and a 3 kg ball are tied by a string on a frictionless surface; you pull the string with 10 N. What is a_CM?  
2. In deep space two identical spacecraft push apart with identical thrusters. Does the centre of mass of the pair accelerate?  
3. A cart of mass M contains sand that leaks out vertically at rate dm/dt. An external horizontal force F acts on the cart. Write the expression for a_CM(t).  
4. Why can the gravitational force between Earth and Moon be ignored when calculating the acceleration of the Earth–Moon barycentre around the Sun?  
5. A system of particles has zero net external force yet its total kinetic energy increases. Is this possible? Explain using the centre-of-mass theorem.