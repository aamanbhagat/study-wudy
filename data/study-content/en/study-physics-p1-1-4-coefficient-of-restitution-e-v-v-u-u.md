## 1. The one-sentence answer
**The coefficient of restitution \(e\) is the constant ratio of relative velocity of separation to relative velocity of approach along the line of impact for two colliding bodies.**

In everyday collisions, objects do not bounce back with the same speed they approached. A tennis ball hitting a racket reverses direction but loses speed; two lumps of clay simply stick. The ratio that quantifies this loss is fixed for any given pair of materials and impact geometry. It arises because the impulse delivered during contact reverses the relative motion while dissipating a fraction of the kinetic energy.

The definition isolates the relative velocities before and after contact, discarding any common centre-of-mass velocity that merely translates both bodies together. When \(e=1\) the collision is elastic; when \(e=0\) the bodies move as one after impact. Values between zero and one describe every real macroscopic collision.

> [!NOTE]
> The single number \(e\) encodes the entire dissipative physics of the contact phase; once measured for a material pair, it lets you predict post-collision velocities without modelling deformation or internal friction.

## 2. Why this matters — concrete and current
SpaceX recovers Falcon 9 first stages by landing them on drone ships; the landing legs are designed so that the coefficient of restitution between the leg pads and the deck remains near 0.2, converting most kinetic energy into controlled crushing rather than dangerous rebound.

In semiconductor wire-bonding machines, gold or copper wires strike aluminium pads at 10–20 m/s; manufacturers tune the capillary material and impact velocity so that \(e \approx 0.35\) produces a weld without cracking the underlying silicon die.

Billiard-ball manufacturers publish measured values of \(e\) between 0.88 and 0.92 for phenolic-resin spheres; tournament organisers use these numbers to certify that table cushions will return the ball with reproducible speed, directly affecting professional play.

NASA’s OSIRIS-REx spacecraft collected regolith from asteroid Bennu by briefly contacting the surface with a nitrogen-gas-assisted sampler head; pre-flight tests determined that the effective \(e\) between the head and the porous asteroid material was below 0.1, ensuring the sample stayed inside rather than bouncing away.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| One-dimensional velocity | Collisions are analysed along the line joining centres at contact; transverse components are treated separately. |
| Conservation of momentum | The total momentum of an isolated system is unchanged by internal collision impulses. |
| Impulse                  | The brief contact force integrated over time changes each body’s momentum and is equal and opposite for the pair. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Relative velocity before contact
Two bodies approach each other along a straight line. Their individual velocities relative to the lab frame are \(u_1\) and \(u_2\); what matters for the collision is how fast they close the gap.

Take two spheres on a frictionless track. Sphere A moves at \(+3\) m/s, sphere B at \(+1\) m/s. The gap closes at 2 m/s.

The relative approach velocity is therefore
\[
u_{\text{rel}} = u_1 - u_2.
\]

> [!WARNING]
> Reversing the sign convention here will flip the sign of \(e\) and produce velocities that violate conservation of momentum.

### Step 2 — Relative velocity after contact
After the brief interaction the bodies move at \(v_1\) and \(v_2\). Their relative velocity of separation is
\[
v_{\text{rel}} = v_2 - v_1.
\]

Using the same numbers, suppose measurements give \(v_1 = +1.4\) m/s and \(v_2 = +2.6\) m/s; the separation speed is again 1.2 m/s.

### Step 3 — Definition of the coefficient
Experiment shows that the ratio of separation speed to approach speed is constant for given materials and geometry:
\[
e = \frac{v_2 - v_1}{u_1 - u_2}.
\]

The equation is written so that \(e\) is positive when the bodies rebound.

### Step 4 — Range and limiting cases
Because kinetic energy cannot increase, \(0 \le e \le 1\). When \(e = 1\) the relative speed is unchanged (elastic). When \(e = 0\) the relative velocity after contact is zero (perfectly inelastic).

### Step 5 — Textbook statement reached
Combining the definition with conservation of momentum for two masses \(m_1\) and \(m_2\) yields the post-collision velocities in closed form; the coefficient \(e\) appears as the single additional parameter required to solve the two-body problem.

## 5. Worked examples — every step shown

**Example 1 — Equal masses, head-on elastic collision**  
*Given:* \(m_1 = m_2 = 1\) kg, \(u_1 = 4\) m/s, \(u_2 = 0\), \(e = 1\).  
*Find:* \(v_1\) and \(v_2\).

Momentum conservation:
\[
m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2 \implies 4 = v_1 + v_2.
\]
*Why:* total momentum before equals total momentum after.

Restitution definition:
\[
e = 1 = \frac{v_2 - v_1}{u_1 - u_2} \implies v_2 - v_1 = 4.
\]
*Why:* separation speed equals approach speed when \(e=1\).

Solve the simultaneous equations:
\[
v_1 = 0,\quad v_2 = 4.
\]
**Final answer**  
**\(v_1 = 0\), \(v_2 = 4\) m/s**

*Reflection:* The result is the classic velocity exchange; the algebra works only because both conservation laws were used.

**Example 2 — Equal masses, inelastic collision**  
*Given:* same masses and initial velocities, but \(e = 0.5\).  
*Find:* final velocities.

Momentum:
\[
4 = v_1 + v_2.
\]
Restitution:
\[
0.5 = \frac{v_2 - v_1}{4} \implies v_2 - v_1 = 2.
\]
Solution:
\[
v_1 = 1,\quad v_2 = 3.
\]
**Final answer**  
**\(v_1 = 1\) m/s, \(v_2 = 3\) m/s**

*Reflection:* Halving \(e\) halves the relative rebound speed while momentum still fixes the centre-of-mass velocity.

**Example 3 — Unequal masses**  
*Given:* \(m_1 = 2\) kg, \(m_2 = 1\) kg, \(u_1 = 3\) m/s, \(u_2 = -1\) m/s, \(e = 0.8\).  
*Find:* final velocities.

Momentum:
\[
2\cdot3 + 1\cdot(-1) = 2v_1 + v_2 \implies 5 = 2v_1 + v_2.
\]
Restitution:
\[
0.8 = \frac{v_2 - v_1}{3 - (-1)} \implies v_2 - v_1 = 3.2.
\]
Solve:
\[
v_1 = 0.6,\quad v_2 = 3.8.
\]
**Final answer**  
**\(v_1 = 0.6\) m/s, \(v_2 = 3.8\) m/s**

*Reflection:* The heavier mass barely reverses; the lighter mass rebounds strongly.

**Example 4 — Finding \(e\) from measured velocities**  
*Given:* \(m_1 = m_2 = 0.5\) kg, \(u_1 = 5\) m/s, \(u_2 = 1\) m/s, \(v_1 = 2\) m/s, \(v_2 = 4\) m/s.  
*Find:* \(e\).

Relative approach:
\[
u_1 - u_2 = 4.
\]
Relative separation:
\[
v_2 - v_1 = 2.
\]
Thus
\[
e = \frac{2}{4} = 0.5.
\]
**Final answer**  
**\(e = 0.5\)**

*Reflection:* Direct measurement of all four velocities bypasses mass values when they are equal.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using lab-frame velocities instead of relative | Students forget only the closing speed matters     | Always compute \(u_1 - u_2\) and \(v_2 - v_1\) first |
| Sign error in restitution formula | Velocity directions chosen inconsistently           | Adopt a single positive direction for the entire problem |
| Applying \(e\) to oblique collisions without projection | Component perpendicular to line of impact is ignored | Resolve velocities onto the normal before using \(e\) |
| Assuming \(e\) is constant for all speeds | Material response can change with strain rate       | Verify \(e\) experimentally at the relevant speed    |
| Treating \(e > 1\) as possible    | Energy would increase                               | Reject any solution yielding \(e > 1\)               |
| Forgetting momentum conservation when solving for two unknowns | Restitution alone supplies only one equation       | Always write both conservation of momentum and restitution |
| Using scalar speeds instead of signed velocities | Absolute values hide direction reversal             | Keep algebraic signs throughout                      |

## 7. The textbook-precise statement
For two particles of masses \(m_1\) and \(m_2\) whose velocities lie along the line joining their centres at the instant of impact, the coefficient of restitution is defined by
\[
e = \frac{v_2 - v_1}{u_1 - u_2},
\]
where the velocities are taken positive in a single chosen direction and the bodies are isolated from external impulses during contact. The value of \(e\) satisfies \(0 \le e \le 1\). (See Goldstein, *Classical Mechanics*, 3rd ed., §3.6.)

## 8. Visual — diagram or schematic
```text
Lab frame positive direction →
Before:   m1 ────────► u1          m2 ────────► u2
               gap closing at u1−u2

Contact impulse J (equal and opposite)

After:    m1 ────────► v1          m2 ────────► v2
               separation speed v2−v1
```
The diagram shows two masses on a straight line; arrows indicate signed velocities. The impulse \(J\) acts rightward on \(m_2\) and leftward on \(m_1\).

## 9. The memory technique

**The hook**  
Picture two railway buffers slamming together: the “e” is the fraction of the closing gap that reappears as a separating gap after the buffers spring back.

**What to overlearn**  
- Definition: \(e = (v_2 - v_1)/(u_1 - u_2)\)  
- Bounds: \(0 \le e \le 1\)  
- Pair with momentum conservation for any two-body problem.

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Start from momentum conservation \(m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2\) and the experimental observation that relative velocity reverses proportionally; solve the linear system to recover the definition of \(e\).

## 10. What this unlocks
Mastery of the coefficient of restitution supplies the missing equation that closes the two-body collision problem, allowing prediction of final velocities in one dimension.

- Two-dimensional oblique collisions (resolve onto normal)  
- Newton’s cradle and multiple sequential impacts  
- Variable-\(e\) problems in granular flows and asteroid dynamics  
- Energy-loss calculations leading to the coefficient of restitution and the loss coefficient \(1-e^2\)

## 11. Self-check — five questions, no answers
1. Two identical balls collide head-on with approach speed 6 m/s; after impact their separation speed is 4.2 m/s. What is \(e\)?  
2. A 3 kg mass travelling at 5 m/s strikes a stationary 1 kg mass. If \(e = 0.6\), find both final velocities.  
3. Why does the restitution equation contain a minus sign when written with absolute speeds?  
4. A ball is dropped from height \(h\) onto a fixed surface. Show that the rebound height is \(e^2 h\).  
5. In an elastic collision (\(e=1\)) between unequal masses, one body stops dead. What must be true about the mass ratio?