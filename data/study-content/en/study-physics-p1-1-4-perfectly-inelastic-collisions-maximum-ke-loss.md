## 1. The one-sentence answer
**A perfectly inelastic collision is one in which two or more bodies merge into a single body after impact, conserving linear momentum while dissipating the largest possible fraction of kinetic energy into other forms.**

In such a collision the final objects share one common velocity. Any relative motion that existed before impact is converted entirely into internal energy—heat, sound, or permanent deformation—because the bodies do not rebound.  

Contrast this with an elastic collision, where the relative velocity of separation equals the relative velocity of approach and kinetic energy is fully restored. Between these limits lie all partially inelastic collisions; each retains some relative velocity after impact and therefore loses less kinetic energy than the perfectly inelastic case. The perfectly inelastic outcome therefore marks the absolute lower bound on final kinetic energy for given initial masses and velocities.

> [!NOTE]
> The “maximum loss” property follows directly from the algebraic fact that, once momentum conservation fixes the common final velocity, no other post-collision velocity pair can yield a smaller total kinetic energy while still satisfying momentum conservation.

## 2. Why this matters — concrete and current
Automotive crash engineering at companies such as Volvo and Tesla designs crumple zones so that passenger compartments undergo nearly perfectly inelastic deformation; the resulting velocity equalization maximizes conversion of kinetic energy into structural work, lowering peak forces transmitted to occupants.

Ballistic pendulums remain the standard laboratory method for measuring the muzzle velocity of firearms; a bullet embeds in a wooden block, forming a perfectly inelastic system whose subsequent swing height yields the initial speed via momentum conservation.

NASA’s Docking Systems on the International Space Station employ controlled inelastic capture mechanisms; the probe-and-cone assembly dissipates relative kinetic energy so that the two massive vehicles reach a single common velocity without destructive rebound.

High-energy heavy-ion collisions at the LHC create quark-gluon plasma droplets whose collective flow is modeled as an almost perfectly inelastic coalescence of nucleons; the measured transverse-momentum spectra directly reflect the maximum kinetic-energy conversion into thermal degrees of freedom.

Asteroid impact studies for planetary defense (NASA’s DART mission follow-on analyses) treat crater formation and ejecta as perfectly inelastic events; the fraction of kinetic energy partitioned into seismic waves versus fragmentation governs deflection efficiency calculations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Linear momentum \(\mathbf{p}=m\mathbf{v}\) | Supplies the single conserved quantity that fixes the final common velocity. |
| Kinetic energy \(K=\frac12mv^2\) | Quantifies the energy removed from the mechanical account. |
| Distinction between elastic and inelastic collisions | Defines the coefficient-of-restitution boundary \(e=0\) that characterises the perfectly inelastic limit. |
| One-dimensional vector algebra | Keeps signs consistent when velocities reverse or masses differ. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Momentum is conserved; kinetic energy is not
Two free bodies approach each other. Their total momentum before impact must equal total momentum afterward because no external force acts during the brief collision interval. Kinetic energy, however, is a scalar quadratic in velocity and therefore need not be conserved.

Consider a 2 kg mass moving at 3 m s⁻¹ striking a stationary 2 kg mass. Momentum conservation alone cannot decide the final velocities; an extra condition is required.

$$m_1v_1+m_2v_2=m_1v_1'+m_2v_2'$$

> [!WARNING]
> Treating kinetic energy as conserved at this stage will produce the elastic solution and hide the maximum-loss behaviour.

### Step 2 — The perfectly inelastic condition forces a single final velocity
When the bodies coalesce they must share one velocity \(v_f\). Substituting into momentum conservation immediately determines that velocity:

$$v_f=\frac{m_1v_1+m_2v_2}{m_1+m_2}$$

### Step 3 — Write the kinetic-energy difference
Initial kinetic energy is \(\frac12m_1v_1^2+\frac12m_2v_2^2\). Final kinetic energy is \(\frac12(m_1+m_2)v_f^2\). Their difference is the energy converted to other forms:

$$\Delta K=\frac12m_1v_1^2+\frac12m_2v_2^2-\frac12(m_1+m_2)v_f^2$$

### Step 4 — Substitute \(v_f\) and simplify
Algebraic reduction yields the compact loss expression

$$\Delta K=\frac12\mu(v_\text{rel})^2$$

where \(\mu=m_1m_2/(m_1+m_2)\) is the reduced mass and \(v_\text{rel}=v_1-v_2\).

### Step 5 — Prove the loss is maximal
Any other final-velocity pair obeying momentum conservation can be written \(v_1'=v_f+\delta\), \(v_2'=v_f-\frac{m_1}{m_2}\delta\). The extra kinetic energy associated with \(\delta\) is always positive; therefore the minimum final kinetic energy (maximum loss) occurs exactly at \(\delta=0\), i.e., when the bodies move together.

## 5. Worked examples — every step shown

**Example 1 — Equal masses, one at rest**  
*Given:* \(m_1=m_2=2\) kg, \(v_1=4\) m s⁻¹, \(v_2=0\).  
*Find:* final velocity and fractional KE loss.  

Momentum: \(2\cdot4+2\cdot0=(2+2)v_f\) → \(v_f=2\) m s⁻¹.  
*Why:* direct application of conservation.  

Initial KE = \(\frac12\cdot2\cdot16=16\) J.  
Final KE = \(\frac12\cdot4\cdot4=8\) J.  
*Why:* quadratic dependence on the single common speed.  

Fraction lost = 50 %.  
**Answer: \(v_f=2\) m s⁻¹, 50 % loss**

*Reflection:* The equal-mass case yields the largest fractional loss possible for any mass ratio.

**Example 2 — Unequal masses**  
*Given:* \(m_1=3\) kg at 5 m s⁻¹, \(m_2=1\) kg at rest.  
*Find:* \(\Delta K\).  

\(v_f=\frac{3\cdot5+1\cdot0}{4}=3.75\) m s⁻¹.  
\(\Delta K= \frac12\cdot3\cdot25-\frac12\cdot4\cdot(3.75)^2=37.5-28.125=9.375\) J.  
**Answer: 9.375 J lost**

*Reflection:* The reduced-mass formula \(\frac12\mu v_\text{rel}^2\) reproduces the same number instantly.

**Example 3 — Both masses moving toward each other**  
*Given:* \(m_1=4\) kg at +3 m s⁻¹, \(m_2=6\) kg at −2 m s⁻¹.  
*Find:* final KE.  

\(v_f=\frac{4\cdot3+6\cdot(-2)}{10}=0\) m s⁻¹.  
Final KE = 0. All 30 J initial KE is dissipated.  
**Answer: 0 J final KE**

*Reflection:* When centre-of-mass velocity is zero, perfectly inelastic collisions can convert the entire mechanical energy store.

**Example 4 — Adding a third body (sequential)**  
*Given:* body A (2 kg, 6 m s⁻¹) strikes stationary B (2 kg); they then strike stationary C (2 kg).  
*Find:* final velocity after both mergers.  

After A+B: \(v_{AB}=3\) m s⁻¹.  
After AB+C: \(v_f=2\) m s⁻¹.  
**Answer: 2 m s⁻¹**

*Reflection:* Successive application of the same rule shows the loss is strictly cumulative.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming final KE equals initial KE | Habit from elastic problems | Explicitly set \(e=0\) before solving. |
| Using \(v_f=(v_1+v_2)/2\) for unequal masses | Over-generalising the equal-mass result | Always divide by total mass \(m_1+m_2\). |
| Forgetting that momentum is a vector | One-dimensional problems hide sign errors | Keep a consistent sign convention throughout. |
| Calculating fractional loss with final KE in numerator | Inverting the definition of loss | Compute \(\Delta K/K_i\), not \(K_f/K_i\). |
| Treating the reduced-mass formula as optional | Missing algebraic simplification | Derive \(\Delta K=\frac12\mu v_\text{rel}^2\) once and memorise. |
| Applying elastic relative-velocity reversal | Confusing coefficient of restitution | Verify \(v_2'-v_1'=0\) for the inelastic case. |
| Ignoring external impulses during “collision” | Real collisions last finite time | Confirm isolation or include external forces explicitly. |

## 7. The textbook-precise statement
In an isolated one-dimensional system of two particles, a collision is perfectly inelastic when the particles emerge with identical velocities. Linear momentum is conserved,

$$m_1\mathbf{v}_1+m_2\mathbf{v}_2=(m_1+m_2)\mathbf{v}_f,$$

while kinetic energy is not; the loss reaches its global minimum value

$$\Delta K=\frac{m_1m_2}{2(m_1+m_2)}(v_1-v_2)^2.$$

(Halliday, Resnick & Walker, *Fundamentals of Physics*, 12e, §9-5.)

## 8. Visual — diagram or schematic

```text
Before          After
  m1 → v1       m1+m2 → vf
  ●━━━━━━        ●━━━━━━━━━━
          ← v2 (if any)
  m2
```
Horizontal axis labelled “x”, arrows show velocity vectors, merged body drawn thicker to indicate coalescence.

## 9. The memory technique

1. **The hook** — Picture two blobs of putty flying together; on contact they become one motionless lump and all their “motion energy” turns into squishy heat.  
2. **What to overlearn** — \(v_f=\frac{m_1v_1+m_2v_2}{m_1+m_2}\) and \(\Delta K=\frac12\mu v_\text{rel}^2\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from momentum conservation plus the single-velocity constraint; the quadratic nature of KE then forces the loss expression.

## 10. What this unlocks
Mastery of perfectly inelastic collisions supplies the reference case against which all other inelasticity is measured and is the direct gateway to coefficient-of-restitution problems, impulsive-force analysis, and variable-mass systems.

- Partially inelastic collisions with \(0<e<1\)
- Ballistic pendulum and ballistic galvanometer extensions
- Rocket equation variable-mass formulation
- Multi-body coalescence in granular and astrophysical flows

## 11. Self-check — five questions, no answers
1. Two ice skaters push apart on frictionless ice; why is their separation not a perfectly inelastic process?  
2. A 5 g bullet embeds in a 1 kg block hanging from a 2 m string. Derive the minimum initial speed that makes the block complete a full vertical circle after the collision.  
3. Show algebraically that the fractional KE loss approaches 1 only when one mass becomes negligible compared with the other.  
4. A railcar of mass M moving at speed v catches up to and couples with an identical stationary railcar. A third identical car is then dropped vertically onto the pair with zero horizontal speed. Compute the final speed after all couplings.  
5. In a perfectly inelastic collision the centre-of-mass kinetic energy is unchanged. Demonstrate this statement and explain its relation to the observed loss of total kinetic energy.