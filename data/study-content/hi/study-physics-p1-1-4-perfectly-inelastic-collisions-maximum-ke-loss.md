## 1. The one-sentence answer
**Perfectly inelastic collisions are collisions in which the colliding bodies coalesce into a single body after impact, conserving linear momentum while dissipating the largest possible fraction of initial kinetic energy into heat, sound and permanent deformation.**

Two bodies approach each other with velocities that satisfy the momentum vector equation \( m_1 \vec{v}_1 + m_2 \vec{v}_2 = (m_1 + m_2) \vec{v}_f \). Because the final velocity is uniquely fixed by momentum conservation, the final kinetic energy is completely determined; any other collision outcome with the same initial conditions yields a higher final kinetic energy. The difference between initial and final kinetic energy reaches its maximum value precisely when the relative velocity after collision becomes zero.

> [!NOTE]
> The “maximum loss” statement is not an extra assumption; it follows directly once the kinematic constraint \( \vec{v}_1' = \vec{v}_2' \) is imposed on top of momentum conservation.

## 2. Why this matters — concrete and current
In rocket stage separation, retro-rockets are deliberately fired so that the spent stage and payload briefly undergo a near-perfectly inelastic interaction with residual propellant gases; the resulting velocity change must be calculated with the coalesced-mass momentum equation to keep the payload on its insertion trajectory.

NASA’s DART mission intentionally created a perfectly inelastic collision between the spacecraft and Dimorphos; the momentum transfer efficiency factor \(\beta\) was extracted from the observed change in orbital period, and that factor is largest precisely because the impactor embedded itself rather than bouncing.

In automotive crash engineering, modern crumple zones are designed to drive the collision as close to perfectly inelastic as possible; the longer the contact time during which the two vehicles move together, the lower the peak force transmitted to occupants.

Semiconductor wire-bonding processes rely on ultrasonic wedge bonding that creates a microscopic perfectly inelastic weld; the kinetic energy of the capillary tool is almost entirely converted into plastic work that forms the intermetallic bond.

High-velocity impact modelling for Whipple shields on the ISS treats the projectile–shield interaction as perfectly inelastic once the shock pressure exceeds the material strength; the resulting debris cloud momentum is then propagated with the coalesced mass.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Conservation of linear momentum | Supplies the only equation that survives after the bodies stick |
| Definition of kinetic energy \( \frac12 mv^2 \) | Quantifies the energy that disappears                     |
| Centre-of-mass frame     | Makes the maximum-loss condition geometrically obvious    |
| Vector subtraction for relative velocity | Shows why \( v_\text{rel}' = 0 \) maximises dissipation   |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Two bodies must share one final velocity
When the bodies “stick”, their surfaces deform until they have the same velocity; this kinematic constraint replaces the elastic restitution equation.  
Concrete example: a lump of clay thrown at a stationary cart embeds itself; both move together afterwards.  
Formal statement:  
$$ \vec{v}_1' = \vec{v}_2' = \vec{v}_f $$  
> [!WARNING]
> Treating the final velocities as independent will produce an under-determined system and hide the maximum-loss result.

### Step 2 — Momentum conservation alone fixes \(\vec{v}_f\)
No external force in the isolated system implies  
$$ m_1\vec{v}_1 + m_2\vec{v}_2 = (m_1+m_2)\vec{v}_f $$  
Solving gives the unique post-collision velocity required for the loss calculation.

### Step 3 — Write initial and final kinetic energies
Initial KE:  
$$ KE_i = \frac12 m_1 v_1^2 + \frac12 m_2 v_2^2 $$  
Final KE:  
$$ KE_f = \frac12 (m_1+m_2) v_f^2 $$  
Loss is simply \( \Delta KE = KE_i - KE_f \).

### Step 4 — Substitute \(v_f\) to obtain explicit loss
After algebraic reduction the loss becomes  
$$ \Delta KE = \frac12 \mu (v_1 - v_2)^2 $$  
where \(\mu = \frac{m_1 m_2}{m_1+m_2}\) is the reduced mass. This expression is always non-negative and equals zero only when the bodies already have identical velocities.

### Step 5 — Compare with elastic case
For elastic collisions the restitution coefficient \(e=1\) returns the relative velocity reversed; the resulting \(KE_f = KE_i\). Any \(0 < e < 1\) yields an intermediate loss; \(e=0\) recovers the perfectly inelastic maximum.

### Step 6 — Centre-of-mass proof that loss is maximal
In the CM frame the total momentum is zero, so after coalescence both bodies are at rest; therefore all kinetic energy relative to the CM is lost. Any elastic rebound would restore that energy.

### Step 7 — Textbook-grade statement
A collision is perfectly inelastic when the coefficient of restitution \(e=0\), which forces the relative velocity after impact to vanish and thereby maximises the kinetic-energy deficit for given initial conditions.

## 5. Worked examples — har step show karo

**Example 1 — Clay on stationary cart**  
*Given:* 0.2 kg clay at 5 m/s strikes 0.8 kg stationary cart and sticks.  
*Find:* final velocity and KE loss.  
Momentum: \(0.2 \times 5 = 1.0 \times v_f \) → \(v_f = 1\) m/s.  
\(KE_i = 0.5 \times 0.2 \times 25 = 2.5\) J.  
\(KE_f = 0.5 \times 1 \times 1^2 = 0.5\) J.  
Loss = **2.0 J**.  
*Why* each step: momentum fixes \(v_f\) uniquely; subtraction gives loss directly.

**Example 2 — Two ice skaters grabbing**  
*Given:* 60 kg skater at +3 m/s meets 40 kg skater at –2 m/s; they hold hands.  
*Find:* common velocity.  
\(60 \times 3 + 40 \times (-2) = 100 v_f\) → \(v_f = 1.4\) m/s.  
\(KE_i = 270 + 80 = 350\) J; \(KE_f = 98\) J; loss = **252 J**.

**Example 3 — Ballistic pendulum with numbers**  
*Given:* 0.01 kg bullet at 400 m/s embeds in 2 kg block.  
*Find:* height the block rises (g = 9.8 m/s²).  
Momentum: \(0.01 \times 400 = 2.01 v_f\) → \(v_f = 1.99\) m/s.  
Energy after: \( \frac12 \times 2.01 \times (1.99)^2 = 4.0\) J = mgh → \(h = 0.203\) m.

**Example 4 — Oblique perfectly inelastic collision**  
*Given:* \(m_1 = 2\) kg, \(\vec{v}_1 = (4,0)\) m/s; \(m_2 = 3\) kg, \(\vec{v}_2 = (0,3)\) m/s; they stick.  
*Find:* final velocity vector and fractional KE loss.  
Momentum components: \(x: 8 = 5 v_x\) → \(v_x = 1.6\); \(y: 9 = 5 v_y\) → \(v_y = 1.8\).  
\(\vec{v}_f = (1.6,1.8)\) m/s.  
\(KE_i = 16 + 13.5 = 29.5\) J; \(KE_f = 12.8\) J; fractional loss = **0.566**.

*Reflection:* each example forces the same algebraic pattern once the sticking condition is applied; the vector case merely repeats the scalar algebra component-wise.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using elastic restitution equation after bodies stick | Students memorise \(v_2'-v_1' = -(v_2-v_1)\) and apply it indiscriminately | Check the problem statement for “stick”, “embed” or “e = 0” before choosing equations |
| Forgetting to add masses in final KE | Habit of writing separate KE terms even after coalescence | Write \(KE_f = \frac12 (m_1+m_2)v_f^2\) explicitly every time |
| Treating momentum as scalar in 2-D problems | Visualising only head-on collisions | Resolve momentum into independent x and y components from the first line |
| Calculating loss before finding \(v_f\) | Jumping to energy equation that is not conserved | Always solve momentum first; energy only for the loss calculation |
| Confusing reduced-mass formula with elastic case | Formula looks similar to elastic energy storage | Remember \(\Delta KE = \frac12\mu v_\text{rel}^2\) holds only for e = 0 |
| Sign errors in opposite-velocity problems | Treating directions casually | Draw arrows and assign consistent positive direction before writing equations |
| Assuming CM remains at rest in lab frame | Misreading “isolated system” | Verify total momentum; CM velocity is constant but usually non-zero |

## 7. The textbook-precise statement
A collision between two free bodies is perfectly inelastic if and only if the coefficient of restitution \(e = 0\). Under the additional assumptions that (i) the system is isolated, (ii) the only appreciable forces are the contact forces during the brief collision interval, and (iii) the bodies form a single rigid body immediately after impact, the following hold simultaneously:  
$$ m_1\vec{v}_1 + m_2\vec{v}_2 = (m_1 + m_2)\vec{v}_f, \qquad \vec{v}_1' = \vec{v}_2' = \vec{v}_f. $$  
The kinetic-energy deficit is then  
$$ \Delta K = \frac12\frac{m_1 m_2}{m_1+m_2}|\vec{v}_1 - \vec{v}_2|^2 \ge 0, $$  
which is the maximum possible loss for the given initial state (Kleppner & Kolenkow, *An Introduction to Mechanics*, 2e, §4.3).

## 8. Visual — diagram or schematic
```
lab frame
  m1 ────────►          m2 ◄───────
       v1                    v2
          \                 /
           \               /
            \             /
             \           /
              \         /
               \       /
                \     /
                 \   /
                  \ /
                   X   ← coalescence; single velocity vf
                  / \
                 /   \
                /     \
               /       \
              /         \
             /           \
```
Horizontal axis is x; vertical axis is y for oblique cases. After the X both masses share the same vector \(\vec{v}_f\).

## 9. The memory technique
1. **The hook** — imagine two blobs of chewing gum hurtling toward each other; after they merge they become one motionless lump in the centre-of-mass frame — all motion energy has vanished into “gum heat”.
2. **What to overlearn** — the two-line pair: momentum gives \(v_f\), loss = \(\frac12\mu v_\text{rel}^2\).
3. **Spaced-repetition schedule** — review the reduced-mass loss formula after 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — if the formula is forgotten, return to CM frame: total momentum zero, final velocity zero, therefore entire CM kinetic energy is lost.

## 10. What this unlocks
Mastery of perfectly inelastic collisions supplies the limiting case needed for variable-mass rocket equations, explosive separations, and coefficient-of-restitution studies.  
- Next: explosions and rocket propulsion (thrust as continuous inelastic mass addition).  
- Next: ballistic pendulum laboratory analysis.  
- Next: oblique collisions with partial elasticity.  
- Next: introduction to the coefficient of restitution as a continuous parameter between 0 and 1.

## 11. Self-check — five questions, no answers
1. A 5 kg mass at 8 m/s strikes a 3 kg mass at rest and sticks; compute the fractional loss of kinetic energy.  
2. Two identical masses approach each other at equal speeds; after a perfectly inelastic collision, what fraction of KE survives?  
3. In an oblique perfectly inelastic collision the initial velocities are perpendicular; show that the loss is still \(\frac12\mu v_\text{rel}^2\).  
4. A ballistic pendulum bob rises to height h after a perfectly inelastic capture; derive the bullet speed in terms of h, masses and g.  
5. Identify the single incorrect step in a hypothetical solution that applies the elastic restitution equation to a clay-cart problem and explain why the numerical answer violates momentum conservation.