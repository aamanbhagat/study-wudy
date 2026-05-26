## 1. The one-sentence answer
**The total linear momentum of a defined system remains constant if and only if the net external force on that system is exactly zero.**

Momentum changes only when an external force acts. Inside any chosen boundary the internal forces between parts of the system always appear in equal-and-opposite pairs, so they cancel when the total momentum is calculated. The boundary itself therefore decides whether momentum is conserved: redraw the boundary to enclose every force that matters and the conservation statement becomes exact.

In everyday language this means you must decide what counts as “outside” the system. If a rocket ejects gas, the gas is outside once it has left the nozzle; the rocket’s momentum alone is therefore not conserved. If you redraw the system to include both rocket and the just-ejected gas, the net external force may still be gravity or drag, and conservation again fails unless those forces are negligible.

> [!NOTE]
> The decisive act is not the presence or absence of forces but the deliberate choice of system boundary that makes their vector sum zero.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage landing burns occur while the stage is still inside Earth’s gravitational field; analysts nevertheless treat the horizontal momentum of the stage plus its exhaust as conserved over the few seconds of the burn because the external aerodynamic and gravitational impulses remain small compared with the thrust impulse.

In high-energy particle detectors at CERN, two protons collide inside the LHC; the tracking algorithms assume transverse momentum is exactly conserved because the net external force from the magnetic lattice is zero in the plane perpendicular to the beam pipe during the 10^{-22} s collision.

Semiconductor ion implanters accelerate dopant ions into silicon wafers; the wafer chuck experiences a measurable recoil, yet the momentum transferred to the entire implanter frame is treated as conserved because the external mounting forces act on a timescale orders of magnitude longer than the ion impact.

When a meteoroid strikes a spacecraft, mission teams integrate the impulse over milliseconds; solar radiation pressure and gravity gradients are external yet produce negligible momentum change in that interval, allowing reliable reconstruction of the impactor’s velocity vector.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector sum               | Net force is a vector; only the resultant changes total momentum |
| Impulse = ∫F dt          | Finite external forces can still be ignored if their duration is short |
| System boundary          | Conservation statements are meaningless until the system is explicitly defined |
| Newton’s third law       | Internal forces cancel in pairs only when both members of each pair lie inside the boundary |

## 4. Building the idea — from intuition to formalism

### Step 1 — Momentum changes only under external influence
Any object’s momentum changes solely because something outside it pushes or pulls. A concrete example is a hockey puck sliding on ice: its momentum stays nearly constant until the boards exert a force. Formally,
$$
\frac{d\vec{p}}{dt} = \vec{F}_{\rm ext}.
$$
If you forget that only external forces appear on the right-hand side you will incorrectly conclude that two colliding billiard balls conserve momentum even when friction with the table is present.

### Step 2 — Internal forces cancel by pairs
Inside a chosen boundary, every force has an equal-and-opposite partner also inside the boundary. Their contributions to the total momentum derivative therefore sum to zero. For two particles,
$$
\vec{F}_{12} + \vec{F}_{21} = 0 \implies \frac{d}{dt}(\vec{p}_1 + \vec{p}_2)_{\rm internal} = 0.
$$

### Step 3 — Net external force is the sole survivor
Adding the equations for every particle in the system leaves only the external forces:
$$
\frac{d\vec{P}}{dt} = \sum \vec{F}_{\rm ext},
$$
where \(\vec{P} = \sum \vec{p}_i\).

### Step 4 — Exact conservation requires a vanishing sum
The total momentum \(\vec{P}\) is constant if and only if
$$
\sum \vec{F}_{\rm ext} = 0.
$$
Any non-zero resultant, however small, produces a secular change in \(\vec{P}\).

### Step 5 — Practical conservation during brief intervals
When \(\sum \vec{F}_{\rm ext}\) is not zero but the interaction time \(\Delta t\) is short, the impulse \(\int \sum F_{\rm ext}\,dt\) can be negligible compared with the momentum exchanged internally. This is the usual justification for treating collisions as momentum-conserving even in the presence of gravity or friction.

### Step 6 — Textbook statement of the result
The linear momentum of a system is conserved if and only if the vector sum of external forces on the system vanishes. (Taylor, *Classical Mechanics*, 2005, §4.2.)

## 5. Worked examples — every step shown

**Example 1 — Two blocks on a frictionless table**
*Given:* Block A (2 kg) moves at 3 m/s right; block B (3 kg) at rest. They collide and stick.
*Find:* Final velocity.
- Define system = A + B.  
  *Why:* Both blocks lie inside the boundary, so friction with table is external but zero.
- \(\vec{F}_{\rm ext} = 0\) therefore \(\vec{P}_i = \vec{P}_f\).
- \(2\cdot3 + 3\cdot0 = 5v\)  
  *Why:* Direct substitution of known values.
- \(v = 1.2\) m/s right.  
**1.2 m/s right**

*Reflection:* The frictionless condition made the external force identically zero; any friction would have required an impulse calculation.

**Example 2 — Ballistic pendulum with gravity**
*Given:* 0.05 kg bullet at 400 m/s embeds in 2 kg block hanging from strings.
*Find:* Maximum height.
- System = bullet + block. External forces are gravity and tension.
- Collision duration ≪ pendulum period, so impulse of gravity is negligible.  
  *Why:* \(\Delta t \approx 10^{-3}\) s gives \(mg\Delta t \ll \Delta p\).
- Momentum conserved: \(0.05\cdot400 = 2.05 v\) → \(v = 9.76\) m/s.
- Energy after collision: \(\frac12(2.05)v^2 = 2.05 gh\) → \(h = 4.85\) m.  
**4.85 m**

*Reflection:* Gravity is external yet ignored only during the collision interval.

**Example 3 — Exploding projectile**
*Given:* 10 kg projectile at 200 m/s explodes into two 4 kg and 6 kg fragments.
*Find:* Fragment velocities if explosion adds 500 J internal energy.
- System = all fragments. Gravity external but vertical.
- Horizontal momentum conserved because horizontal external force is zero.  
  *Why:* Gravity has no horizontal component.
- Let fragments have velocities \(v_4, v_6\); solve simultaneously with energy equation.  
**\(v_4 = 212.5\) m/s, \(v_6 = 141.7\) m/s (horizontal components)**

*Reflection:* Only the component free of external force is conserved.

**Example 4 — Rocket sled on rails**
*Given:* 500 kg sled ejects 2 kg of propellant at 800 m/s relative to sled; external friction = 50 N.
*Find:* Velocity change in 0.1 s burn.
- System = sled + propellant still inside nozzle.
- External force = friction; impulse = 5 N·s.  
  *Why:* Must be subtracted from momentum change.
- \(\Delta P = -m_{\rm prop}v_{\rm rel} - F_{\rm ext}\Delta t\) → \(\Delta v = 3.19\) m/s.  
**3.19 m/s**

*Reflection:* The external force must be retained once its impulse becomes comparable to the thrust impulse.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating friction as internal | Students forget the table lies outside the sliding-block system | Redraw the boundary explicitly and list every force crossing it |
| Ignoring gravity in vertical collisions | Gravity is always present so it “feels” internal | Check whether \(\int mg\,dt\) is negligible compared with collision impulse |
| Applying conservation across an explosion without redefining the system | The chemical energy release is internal but fragments may leave the original boundary | Include all fragments inside the system from the start |
| Confusing momentum with kinetic energy conservation | Both quantities are constant under similar conditions, inviting conflation | Write separate statements: \(\sum F_{\rm ext}=0\) for momentum, no dissipation for kinetic energy |
| Forgetting that net external force, not individual forces, must vanish | Opposing external forces may still sum to zero | Always compute the vector sum before declaring conservation |
| Using conservation when mass is variable (rockets) | Mass crosses the boundary | Switch to the variable-mass form \(m\frac{dv}{dt}=v_{\rm rel}\frac{dm}{dt}+F_{\rm ext}\) |
| Assuming conservation holds after the interaction ends | External forces continue to act | Conservation applies only while \(\sum F_{\rm ext}=0\); integrate afterward with the known external force |

## 7. The textbook-precise statement
A system of particles has total momentum \(\vec{P} = \sum_i m_i\vec{v}_i\). Differentiating with respect to time and invoking Newton’s second and third laws yields
$$
\frac{d\vec{P}}{dt} = \sum_i \vec{F}_i^{\rm ext}.
$$
Hence \(\vec{P}\) is constant if and only if \(\sum \vec{F}_i^{\rm ext} = \vec{0}\). (Taylor, *Classical Mechanics*, 2005, §4.2, Theorem 4.3.)

## 8. Visual — diagram or schematic
```text
Boundary line
     ┌──────────────────────┐
     │   m1 →   m2 ←        │   ← internal forces cancel
     │                      │
 F_ext1 ↓          ↑ F_ext2 │   ← only these survive
     └──────────────────────┘
          System S
```
The diagram shows two particles inside an arbitrary closed boundary; internal force arrows lie wholly inside and cancel, while external force arrows cross the boundary and determine \(d\vec{P}/dt\).

## 9. The memory technique
1. **The hook** — Picture a chalk circle drawn on the floor around the colliding objects; only forces that cross the chalk line can change the total momentum inside.
2. **What to overlearn** — \(\frac{d\vec{P}}{dt}=\sum\vec{F}_{\rm ext}\); \(\vec{P}\) constant ⇔ \(\sum\vec{F}_{\rm ext}=\vec{0}\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from \(\vec{F}=d\vec{p}/dt\) for each particle, sum, cancel internal pairs by Newton’s third law.

## 10. What this unlocks
Mastery of the boundary condition lets you decide instantly whether momentum conservation applies to variable-mass systems, collisions on rough surfaces, or spacecraft trajectories. It directly precedes the study of rocket equation derivations, center-of-mass motion under gravity, and the impulse-momentum theorem for impact analysis.

- Variable-mass rocket equation
- Center-of-mass frame transformations
- Impulse approximation in scattering theory
- Lagrangian mechanics with constraints

## 11. Self-check — five questions, no answers
1. A 5 kg block slides across a table with kinetic friction 2 N and collides with a stationary 3 kg block. Is total momentum conserved during the collision? Justify with a numerical estimate of the frictional impulse.

2. Two ice skaters push off each other on a frictionless rink. After they separate, each feels only air drag of 0.3 N. Under what condition does their combined momentum remain constant for the next 10 s?

3. A ballistic pendulum is used on the Moon where g = 1.62 m/s². Does the momentum-conservation step during the bullet–block collision still hold? Why or why not?

4. An open railcar of mass M collects falling rain at rate dm/dt while coasting horizontally. External horizontal force is zero. Derive whether the car’s speed changes.

5. In a particle-physics detector a collision occurs inside a 2 T magnetic field. The tracking software assumes transverse momentum is conserved. Estimate the maximum track curvature radius for which this assumption introduces <0.1 % error in a 10^{-10} s interaction.