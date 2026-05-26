## 1. The one-sentence answer
**Spring-mass collision problems are solved by applying conservation of linear momentum across the instantaneous collision (when applicable) together with conservation of mechanical energy throughout the subsequent compression and rebound phases, where kinetic energy is reversibly stored as elastic potential energy \(\frac12kx^2\).**

A moving mass strikes either a fixed spring or another mass coupled through a spring. During contact the spring compresses, converting ordered kinetic energy into stored potential energy while the centre-of-mass velocity remains constant if no external forces act. After maximum compression the spring returns the energy, producing separation velocities that are found by solving the two conservation statements simultaneously.

The decisive step is recognising that the collision itself may be treated as instantaneous for momentum purposes, yet the energy accounting must continue through the finite-duration spring deformation that follows.

> [!NOTE]
> The single most important insight is that the spring never dissipates energy; any “loss” appears only when the collision between the masses themselves is inelastic, after which the combined system still oscillates on the spring with reduced amplitude.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage landing legs incorporate crushable spring cartridges that absorb the final touchdown impulse; engineers size the spring constant so that peak force stays below the structural limit while all kinetic energy at contact is converted to elastic potential.

In the LIGO gravitational-wave detectors, the test-mass suspension uses blade springs whose collision-like ringing after seismic events must be modelled with the same energy bookkeeping to keep residual motion below \(10^{-19}\) m.

Semiconductor wire-bonding machines drive a capillary at high speed into a gold ball; the collision is buffered by a precision spring whose compression profile determines bond quality and is simulated with exactly these conservation laws.

Particle-physics time-of-flight detectors employ spring-mounted scintillators; when a minimum-ionising particle strikes, the instantaneous momentum transfer and subsequent spring oscillation set the position resolution.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Conservation of momentum | Determines velocity of centre of mass when external forces are negligible during the brief collision interval |
| Hooke’s law \(F=-kx\)    | Supplies the force law that converts kinetic energy into spring potential |
| Elastic potential energy \(\frac12kx^2\) | Provides the second equation needed once momentum has fixed the centre-of-mass motion |
| Coefficient of restitution | Quantifies inelasticity when kinetic energy is not fully recovered after the spring returns |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the system and external forces
During the short interval of contact, external impulses are often negligible compared with the internal spring force, so total linear momentum is conserved.  
Concrete example: a 2 kg mass at 3 m s\(^{-1}\) strikes a 3 kg mass initially at rest, connected by a spring of stiffness 600 N m\(^{-1}\).  
Momentum conservation:  
\[ m_1v_1 + m_2v_2 = (m_1+m_2)V_{\text{cm}} \]  
> [!WARNING]
> Forgetting that momentum conservation applies only while external impulses remain zero leads to incorrect centre-of-mass velocity.

### Step 2 — Write the mechanical-energy statement
Mechanical energy is conserved after the collision phase because the spring force is conservative.  
At maximum compression the relative velocity is zero and all available kinetic energy resides in the spring:  
\[ \frac12\mu v_{\text{rel}}^2 = \frac12kx_{\max}^2 \]  
where \(\mu\) is the reduced mass.

### Step 3 — Distinguish elastic and inelastic contact
If the masses themselves deform plastically, kinetic energy drops by a factor \(e^2\) (restitution coefficient) before the spring begins to store energy. The energy equation is therefore written after this loss.

### Step 4 — Solve the two equations simultaneously
Momentum fixes \(V_{\text{cm}}\); energy fixes the oscillation amplitude about that centre of mass. Post-collision velocities are recovered by adding the centre-of-mass velocity to the relative velocity at separation.

### Step 5 — Textbook statement of the result
For a one-dimensional collision mediated by a massless spring, the velocities after the spring has fully decompressed are  
\[ v_{1f} = V_{\text{cm}} - e\frac{m_2}{m_1+m_2}v_{\text{rel},i}, \qquad v_{2f} = V_{\text{cm}} + e\frac{m_1}{m_1+m_2}v_{\text{rel},i} \]  
where \(e=1\) recovers the fully elastic case.

## 5. Worked examples — every step shown

**Example 1 — Mass striking a fixed spring**  
*Given:* 0.5 kg mass, initial speed 4 m s\(^{-1}\), spring \(k=200\) N m\(^{-1}\), fixed at far end.  
*Find:* maximum compression.  
Momentum is irrelevant (wall supplies impulse). Energy:  
\[ \frac12(0.5)(4)^2 = \frac12(200)x^2 \]  
*Why:* kinetic energy at contact equals spring energy at turnaround.  
\[ x = 0.2\,\text{m} \]  
**0.2 m**  
*Reflection:* the wall removes momentum but not energy; only the spring matters.

**Example 2 — Two equal masses, elastic spring collision**  
*Given:* \(m_1=m_2=1\) kg, \(v_1=2\) m s\(^{-1}\), \(v_2=0\), \(k=100\) N m\(^{-1}\).  
*Find:* velocities after separation.  
Momentum: \(V_{\text{cm}}=1\) m s\(^{-1}\).  
Energy at max compression: \(\frac12\mu(2)^2=\frac12kx^2\) yields \(x=0.1414\) m.  
Separation restores the same relative speed:  
\[ v_{1f}=0,\quad v_{2f}=2\,\text{m s}^{-1} \]  
**0 m s\(^{-1}\), 2 m s\(^{-1}\)**  
*Reflection:* equal masses exchange velocities when the spring is ideal.

**Example 3 — Inelastic contact followed by spring storage**  
*Given:* same masses, but \(e=0.6\).  
*Find:* amplitude of subsequent oscillation.  
Post-contact relative speed = \(0.6\times2=1.2\) m s\(^{-1}\).  
Energy available: \(\frac12(0.5)(1.2)^2=0.36\) J.  
\[ x_{\max}=\sqrt{0.36\times2/100}=0.0849\,\text{m} \]  
**0.0849 m**  
*Reflection:* inelasticity reduces stored energy before oscillation begins.

**Example 4 — Mass sliding onto spring attached to second free mass**  
*Given:* \(m_1=2\) kg at 3 m s\(^{-1}\), \(m_2=3\) kg at rest, spring between them.  
*Find:* maximum spring compression.  
\(V_{\text{cm}}=1.2\) m s\(^{-1}\), \(\mu=1.2\) kg, \(v_{\text{rel}}=3\).  
Energy: \(\frac12(1.2)(3)^2=\frac12 k x^2\) gives \(x\) once \(k\) known.  
**Answer depends on \(k\); scales as \(1/\sqrt{k}\)**  
*Reflection:* centre-of-mass frame reduces any two-body spring problem to a single reduced-mass oscillator.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating the spring as instantly rigid | Students confuse contact time with spring period | Always compare collision duration with \(\pi\sqrt{\mu/k}\) |
| Applying \(e\) after energy storage | Mis-timing the inelastic loss | Apply restitution at the instant relative velocity reverses at contact surface |
| Forgetting reduced mass | Using total mass instead of \(\mu\) | Write kinetic energy in centre-of-mass frame first |
| Ignoring wall impulse on momentum | Assuming isolated system when one end is fixed | Check external forces explicitly before writing \(p=\) constant |
| Sign error on velocities | Treating directions inconsistently | Choose a single positive direction and keep it throughout |
| Using \(\frac12kx^2\) before contact ends | Adding potential while masses are still approaching | Confirm that relative velocity is zero at maximum compression |
| Neglecting gravity on vertical springs | Treating vertical setup as horizontal | Shift equilibrium position by \(mg/k\) before applying energy conservation |

## 7. The textbook-precise statement
In one dimension, let two point masses \(m_1\) and \(m_2\) interact through a massless linear spring of stiffness \(k\). If the collision between the masses is characterised by coefficient of restitution \(e\), then after the spring has returned to its natural length the final velocities are given by the expressions in Step 5 above, provided no external force acts during the entire interaction interval. (See Kleppner & Kolenkow, *An Introduction to Mechanics*, 2e, §5.6.)

## 8. Visual — diagram or schematic
```text
          v1 >          k          v2
   m1 ──────────────────────── m2
        |<--- compression --->|
   x=0                       x=L0
```
Horizontal axis points right. Masses move only along this line. Spring natural length \(L_0\) is shown at initial contact; maximum compression occurs when the distance between centres equals \(L_0-x_{\max}\).

## 9. The memory technique
1. **The hook** — picture two railway trucks connected by a stiff buffer spring; the instant they touch, momentum is frozen while the spring “breathes” in and out.  
2. **What to overlearn** — \(V_{\text{cm}}\) from momentum; \(\frac12\mu v_{\text{rel}}^2\) equals spring energy at turnaround; final velocities differ from \(V_{\text{cm}}\) by \(\pm e\) times the reduced-mass fractions.  
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — return to centre-of-mass frame, reduce to single-body oscillator of mass \(\mu\), solve \(\frac12\mu v_{\text{rel}}^2=\frac12kx^2\), then boost back.

## 10. What this unlocks
Mastery of spring-mediated collisions supplies the exact language needed for coupled oscillators, normal modes, and the impulse response of damped harmonic systems.  
- Next: driven damped oscillators  
- Impact loading of beams and columns  
- Vibro-acoustic modelling of launch-vehicle payloads  
- Hamiltonian formulation of conservative collisions  

## 11. Self-check — five questions, no answers
1. A 1 kg block at 5 m s\(^{-1}\) strikes a 2 kg block at rest through a spring; restitution \(e=0.8\). What fraction of initial kinetic energy remains after the spring has fully decompressed?  
2. Derive the maximum compression when the spring constant is doubled while all masses and velocities stay fixed.  
3. Two identical masses approach each other at equal speeds; the spring between them is replaced by a rigid rod of the same mass. Does maximum “compression” change?  
4. A vertical spring hangs from the ceiling with mass \(m\) attached. A second identical mass is dropped from height \(h\) onto the first. Write the energy equation at maximum compression, carefully shifting the zero of gravitational potential.  
5. In Example 3, if \(e\) is lowered to zero, what happens to the oscillation amplitude and to the final common velocity?