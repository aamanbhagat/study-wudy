## 1. The one-sentence answer
**The work-energy theorem says that the net work done by all forces on a particle equals the change in its kinetic energy, and this follows directly from integrating Newton's second law along the particle's path.**

Newton's second law tells us how force changes momentum or acceleration. When you multiply both sides by an infinitesimal displacement and integrate, the left side becomes the total work while the right side becomes the difference in kinetic energy. This link is exact for point particles and remains valid even when forces vary with position or time.

The derivation does not assume conservative forces; it works for any net force. Only the net work matters, so internal cancellations or path details appear naturally once you perform the integration.

> [!NOTE]
> The deepest insight is that kinetic energy is not an arbitrary definition—it is the mathematical consequence of force acting through distance, so energy bookkeeping emerges straight from F = ma without extra postulates.

## 2. Why this matters — concrete and current
In SpaceX Falcon 9 first-stage recovery, engineers integrate thrust minus drag along the descent trajectory to predict exactly how much kinetic energy must be removed by the landing burn; the work-energy theorem supplies the instantaneous speed target at each altitude.

During the Parker Solar Probe’s gravity-assist manoeuvres at Venus, mission designers calculate the work done by solar gravity on the spacecraft’s hyperbolic trajectory to confirm the precise Δv needed for the subsequent perihelion pass.

In semiconductor ion-implantation machines, the kinetic-energy change of accelerated dopant ions is obtained by integrating the electric-field force over the acceleration column length, directly giving the implant depth distribution without solving the full time-dependent motion.

LIGO’s mirror suspensions rely on the theorem to convert residual seismic work into mirror velocity noise budgets; any net force integrated along the suspension wire length appears as excess kinetic energy that must stay below the 10⁻¹⁹ m displacement threshold.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Newton's second law  | Starting point: F = ma must be written in vector form     |
| Dot product          | Work is defined only for the component of force along dr  |
| Definite integration | Converts the local relation F·dr = m v·dv into global work and ΔKE |
| Kinetic energy definition | The ½mv² term appears automatically after integration   |

If the dot product or the meaning of ∫F·dr is unclear, pause and review those before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from Newton's second law in vector form
Force changes momentum or produces acceleration. Write F = ma exactly as a vector equation so direction is preserved.

Concrete example: a rocket engine pushes a 100 kg probe with a 500 N thrust vector in free space.  
Formal statement:  
$$ \mathbf{F} = m \mathbf{a} = m \frac{d\mathbf{v}}{dt} $$

> [!WARNING]
> If you drop the vector character and treat F as a scalar, the later dot product with displacement fails and you obtain only a 1-D projection instead of true work.

### Step 2 — Form the scalar product with infinitesimal displacement
Multiply both sides by dr. The left side becomes the definition of infinitesimal work.

Formal statement:  
$$ \mathbf{F} \cdot d\mathbf{r} = m \mathbf{a} \cdot d\mathbf{r} $$

### Step 3 — Replace acceleration with the chain-rule identity
Use the identity a·dr = v·dv. This converts the acceleration term into a perfect differential of speed.

Formal statement:  
$$ \mathbf{a} \cdot d\mathbf{r} = \mathbf{v} \cdot d\mathbf{v} $$

### Step 4 — Integrate both sides along the actual path
Integrate from initial position A to final position B. The left side is net work; the right side collapses to the difference of ½mv².

Formal statement:  
$$ W_{\text{net}} = \int_A^B \mathbf{F} \cdot d\mathbf{r} = \frac{1}{2} m v_B^2 - \frac{1}{2} m v_A^2 $$

### Step 5 — State the theorem cleanly
Net work equals change in kinetic energy for any path and any force field. No assumption of conservative forces is required.

## 5. Worked examples — har step show karo

**Example 1 — Constant force along a straight line**  
*Given:* A 2 kg block is pushed by a constant 10 N force over 5 m.  
*Find:* Final speed if it starts from rest.  

Apply the integrated form directly:  
$$ W = F \Delta x = 10 \times 5 = 50\,\text{J} $$  
*Why:* Because force and displacement are parallel, the dot product reduces to ordinary multiplication.  
$$ 50 = \frac12 (2) v^2 \implies v^2 = 50 \implies v = 5\sqrt{2}\,\text{m/s} **

*Reflection:* The example is simple because both force and path are constant; the same algebra scales to variable forces once integration replaces multiplication.

**Example 2 — Force opposite to motion (deceleration)**  
*Given:* A 3 kg cart moving at 8 m/s experiences a constant 6 N drag force over 4 m.  
*Find:* Speed after travelling 4 m.  

Net work is negative:  
$$ W = -6 \times 4 = -24\,\text{J} $$  
*Why:* Drag is antiparallel, so the dot product carries a minus sign.  
$$ -24 = \frac12 (3)(v^2 - 64) \implies v^2 = 48 \implies v = 4\sqrt{3}\,\text{m/s} **

*Reflection:* Sign errors appear most often when students forget that work is a scalar that can be negative.

**Example 3 — Variable force (linear spring)**  
*Given:* A 0.5 kg mass compresses a spring (k = 200 N/m) from x = 0 to x = −0.2 m, starting at rest.  
*Find:* Maximum speed when the spring returns to x = 0.  

Work done by the spring:  
$$ W = \int_{-0.2}^{0} (-kx) dx = \frac12 k (0.2)^2 = 4\,\text{J} $$  
*Why:* The integral evaluates the area under the F-x line, exactly the definition of work for a position-dependent force.  
$$ 4 = \frac12 (0.5) v^2 \implies v = 4\,\text{m/s} **

*Reflection:* The variable-force case forces you to perform the integral before invoking the theorem; skipping integration is the most common mistake.

**Example 4 — Two-dimensional path with gravity (rocket staging)**  
*Given:* A 500 kg upper-stage rocket rises 300 m while a 2000 N thrust acts at 30° to the vertical against a 1500 N gravity force.  
*Find:* Speed gain.  

Net force component along the path:  
$$ W = (2000\cos 30^\circ - 1500) \times 300 = 69{,}615\,\text{J} $$  
*Why:* Only the component parallel to dr contributes; perpendicular parts cancel in the dot product.  
$$ 69{,}615 = \frac12 (500)(v^2 - 0) \implies v = \sqrt{278.46} \approx 16.7\,\text{m/s} **

*Reflection:* The angled thrust shows why vector notation and the dot product are indispensable once motion leaves one dimension.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Treating work as F times path length instead of F·dr | Students replace the dot product with ordinary multiplication | Always write the dot product explicitly before integrating |
| Forgetting that only net work appears | Internal forces or normal forces are ignored | Sum every force vector first, then integrate         |
| Using ½mv² without checking the reference frame | Kinetic energy is frame-dependent           | State the inertial frame before writing velocities   |
| Integrating with respect to time instead of displacement | Confuse F = ma with power = F·v             | Remember the theorem integrates F·dr, not F dt       |
| Sign error when force opposes displacement | Negative work is conceptually uncomfortable | Draw a quick arrow diagram of F and dr before calculating |
| Assuming the theorem requires conservative forces | Over-generalisation from potential-energy chapters | Re-derive quickly: no step used ∇×F = 0              |
| Applying the theorem to extended rigid bodies without care | Centre-of-mass versus individual particles  | Reduce to centre-of-mass motion when body is rigid   |

## 7. The textbook-precise statement
The work-energy theorem for a particle states that if a particle of mass m moves from point A to point B under the action of a net force F, then  
$$ \int_A^B \mathbf{F} \cdot d\mathbf{r} = \frac12 m v_B^2 - \frac12 m v_A^2, $$  
where the integral is taken along the actual trajectory of the particle and v denotes speed in an inertial frame. The only assumptions are that mass is constant and Newton’s second law holds. (Taylor, *Classical Mechanics*, 2005, §4.2)

## 8. Visual — diagram or schematic
```text
Path from A to B
      F
      ↑   ↗ dr
      |  /
      | /
A ----+----> B
      |
     mg (example)
```
Label: each infinitesimal dr is tangent to the curved path; F is drawn at an arbitrary angle so only its projection along dr contributes to the integral.

## 9. The memory technique
1. **The hook** — Picture a tiny spacecraft leaving a “work receipt” stamped on every metre of its trajectory; the total receipts equal the change in its speed-squared label.
2. **What to overlearn** — The compact line \(W_{\rm net}=\Delta K\) and the integral identity \(\int\mathbf{F}\cdot d\mathbf{r}=\int m\mathbf{v}\cdot d\mathbf{v}\).
3. **Spaced-repetition schedule** — Review the derivation at 1 day, 3 days, 7 days, 16 days, and 35 days after first study.
4. **First-principles fallback** — If the final formula is forgotten, restart from F = ma, form the dot product with dr, replace a·dr by v·dv, and integrate; the algebra itself regenerates the theorem.

## 10. What this unlocks
Once the work-energy theorem is solid, you can move without gaps into potential energy, conservation of mechanical energy, and the powerful Lagrangian formulation used in orbital mechanics.

- Definition of potential energy for conservative forces
- Escape velocity and orbital energy calculations for interplanetary trajectories
- Power as the time derivative of work, essential for rocket engine performance curves
- Transition to the work-energy theorem for systems of particles and rigid bodies

## 11. Self-check — five questions, no answers
1. A 10 N force acts at 60° to a 3 m displacement; compute the work done and the resulting speed change for a 2 kg mass starting from rest.
2. Derive the work-energy theorem in one dimension starting from F = ma, showing every algebraic step.
3. A particle moves in a circle under a central force; what is the net work done after one revolution, and why?
4. Identify the mistake: a student writes ∫F dt = Δ(½mv²). Explain why the equation is dimensionally and conceptually wrong.
5. For the angled-thrust rocket example above, recalculate the speed gain if the thrust angle is changed to 45° while keeping magnitudes fixed; discuss which physical effect changed.