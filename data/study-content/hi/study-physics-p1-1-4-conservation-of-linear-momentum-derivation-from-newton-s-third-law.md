## 1. The one-sentence answer
**Conservation of linear momentum** follows directly from Newton's third law: when two bodies interact, the forces they exert on each other are equal and opposite, so the total rate of change of their combined momentum is zero and the vector sum of momenta stays constant in an isolated system.

Newton's third law states that if body A pushes body B with force \(\vec{F}\), then B pushes A with \(-\vec{F}\). Because force equals the time derivative of momentum, \(d\vec{p}_A/dt = -\ d\vec{p}_B/dt\). Adding both sides immediately gives \(d(\vec{p}_A + \vec{p}_B)/dt = 0\), which means \(\vec{p}_A + \vec{p}_B\) cannot change with time.

This holds for any pair of bodies that form a closed system; no external force is required in the derivation itself. The result extends to any number of bodies once every internal pair satisfies the third law.

> [!NOTE]
> The deepest insight is that momentum conservation is not an extra postulate; it is the integrated consequence of action-reaction pairs cancelling inside the system.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 landings rely on conservation of momentum between the rocket and its exhaust gases; the downward momentum carried by hot gases exactly balances the upward momentum gained by the booster, allowing precise throttle control during entry burns.

In the LIGO gravitational-wave detectors, conservation of linear momentum between the suspended test masses and the photon momentum in the laser arms sets the fundamental limit on radiation-pressure noise; any imbalance would appear as a fake strain signal.

Particle physicists at CERN's LHC use the same principle to reconstruct invisible neutrinos: the vector sum of all visible particle momenta must equal the known incoming proton momenta, so any missing transverse momentum is attributed to neutrinos.

When two satellites perform autonomous rendezvous, onboard thrusters fire in opposite pairs; momentum conservation guarantees that the centre-of-mass of the two-satellite system continues in free-fall orbit without external torque.

Natural phenomena such as supernova recoil also obey the law: asymmetric ejection of stellar material gives the neutron star a “kick” velocity of hundreds of km/s, exactly as predicted by integrating the third-law pairs over the explosion.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Newton's second law  | \(\vec{F}=d\vec{p}/dt\) converts force pairs into momentum derivatives |
| Vector addition      | Momenta are vectors; only their vector sum is conserved   |
| Isolated system      | External forces must be absent or accounted for separately |
| Time derivative      | The proof hinges on showing the total derivative is zero  |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — State Newton's third law for two particles
Aap already know that forces come in equal-and-opposite pairs. Consider two particles labelled 1 and 2 that interact with each other and with nothing else.

Example: two ice skaters pushing each other on a frictionless rink. The force skater 1 exerts on skater 2 is exactly opposite to the force skater 2 exerts on skater 1.

Formal statement:
\[
\vec{F}_{12} = -\vec{F}_{21}
\]

> [!WARNING]
> If you forget the minus sign, the total force appears non-zero and momentum seems to appear from nowhere.

### Step 2 — Replace force with momentum derivative
Newton's second law for each particle gives \(\vec{F}_{12}=d\vec{p}_1/dt\) and \(\vec{F}_{21}=d\vec{p}_2/dt\).

Substituting the third-law relation immediately produces
\[
\frac{d\vec{p}_1}{dt} = -\frac{d\vec{p}_2}{dt}.
\]

### Step 3 — Add the two equations
Add both sides:
\[
\frac{d\vec{p}_1}{dt} + \frac{d\vec{p}_2}{dt} = 0 \implies \frac{d}{dt}(\vec{p}_1 + \vec{p}_2) = 0.
\]

The quantity inside the derivative is therefore constant.

### Step 4 — Interpret the constant
Because the time derivative of the total momentum is zero, \(\vec{p}_1 + \vec{p}_2 = \text{constant vector}\). This constant is fixed by initial conditions.

### Step 5 — Extend to N particles
Every internal pair obeys the same cancellation. Summing over all pairs, internal forces cancel in equal-and-opposite couples, leaving only external forces (which are absent by assumption). Hence
\[
\frac{d}{dt}\sum_{i=1}^N \vec{p}_i = 0.
\]

### Step 6 — Write the conservation statement
For an isolated system of any number of particles whose mutual forces obey Newton's third law,
\[
\sum_{i=1}^N \vec{p}_i = \text{constant}.
\]

## 5. Worked examples — har step show karo

**Example 1 — Two equal masses at rest**
*Given:* Two 2 kg masses rest on a frictionless table; they push each other apart with equal forces for a short time.  
*Find:* Final velocities if one ends with velocity \(+3\) m/s in x-direction.

Step 1: Initial total momentum = \(2\cdot0 + 2\cdot0 = 0\).  
*Why:* Both start at rest, so vector sum is zero.  
Step 2: After interaction, let velocities be \(\vec{v}_1\) and \(\vec{v}_2\). Conservation requires \(2\vec{v}_1 + 2\vec{v}_2 = 0\).  
*Why:* Total momentum cannot change.  
Step 3: \(\vec{v}_2 = -\vec{v}_1\). Given \(\vec{v}_1 = 3\hat{i}\), then \(\vec{v}_2 = -3\hat{i}\).  
**Final answer**  
\(\vec{v}_1 = 3\hat{i}\) m/s, \(\vec{v}_2 = -3\hat{i}\) m/s.

*Reflection:* The example is simple because initial momentum is zero; any non-zero initial value would simply shift both velocities equally.

**Example 2 — Unequal masses, one initially moving**
*Given:* Mass \(m_1=3\) kg moves at \(4\) m/s; mass \(m_2=1\) kg is at rest. They collide and stick.  
*Find:* Common velocity after collision.

Step 1: \(\vec{p}_\text{total initial} = 3\cdot4 + 1\cdot0 = 12\) kg m/s.  
*Why:* Only the moving mass contributes.  
Step 2: After sticking, \( (3+1)v = 12 \).  
*Why:* Momentum conservation plus they now share one velocity.  
Step 3: \(v=3\) m/s.  
**Final answer**  
\(v=3\) m/s in the original direction.

*Reflection:* Inelastic collision still conserves momentum; kinetic energy does not.

**Example 3 — Two-dimensional collision**
*Given:* 2 kg mass at \(5\hat{i}\) collides with 3 kg mass at \(2\hat{j}\). After collision the 2 kg mass moves at \(1\hat{i}+3\hat{j}\).  
*Find:* Velocity of the 3 kg mass.

Step 1: \(\vec{p}_\text{initial} = 2\cdot5\hat{i} + 3\cdot2\hat{j} = 10\hat{i}+6\hat{j}\).  
*Why:* Components are independent.  
Step 2: Let final velocity of 3 kg be \(v_x\hat{i}+v_y\hat{j}\). Then \(2(1\hat{i}+3\hat{j}) + 3(v_x\hat{i}+v_y\hat{j}) = 10\hat{i}+6\hat{j}\).  
*Why:* Vector equation must hold in each component.  
Step 3: x: \(2 + 3v_x = 10 \implies v_x=8/3\); y: \(6 + 3v_y = 6 \implies v_y=0\).  
**Final answer**  
\(\vec{v}_2 = \frac{8}{3}\hat{i}\) m/s.

*Reflection:* Separate components; never mix x and y momenta.

**Example 4 — Rocket in free space**
*Given:* Rocket of mass 1000 kg ejects 10 kg of fuel at 2000 m/s backward.  
*Find:* Rocket's forward velocity change (initially at rest).

Step 1: Initial total momentum = 0.  
*Why:* Isolated system.  
Step 2: Let rocket velocity become \(v\hat{i}\), fuel velocity \(-2000\hat{i}\). Then \(990v + 10(-2000) = 0\).  
*Why:* Fuel mass is now separate.  
Step 3: \(v = 20000/990 \approx 20.20\) m/s.  
**Final answer**  
\(v \approx 20.20\) m/s forward.

*Reflection:* The same third-law pair that accelerates the exhaust decelerates the rocket by the exact opposite momentum increment.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating momentum as scalar | Students forget direction when velocities reverse | Always write vector symbols or separate x/y components |
| Applying conservation with external forces present | Friction or gravity is overlooked | Draw system boundary; confirm net external force is zero |
| Confusing mass with weight | Weight appears in force equations but not in momentum | Use inertial mass only; ignore g unless thrust or drag is involved |
| Sign error in third-law pair | Minus sign is omitted during addition | Explicitly write \(\vec{F}_{12}=-\vec{F}_{21}\) before substituting |
| Assuming conservation in inelastic collisions only | Belief that sticking is required | Conservation holds whether collision is elastic or not |
| Ignoring reference-frame dependence | Momentum values change between frames | Choose inertial frame and stay inside it for the whole problem |
| Forgetting that total momentum is a vector | Magnitude is conserved but direction may rotate | Conserve each Cartesian component independently |

## 7. The textbook-precise statement
Let \(S\) be an isolated system of \(N\) particles whose mutual forces satisfy Newton's third law in its strong form (equal magnitude, opposite direction, and along the line joining the particles). Then the total linear momentum
\[
\vec{P} = \sum_{i=1}^N m_i\vec{v}_i
\]
is constant in time:
\[
\frac{d\vec{P}}{dt} = 0.
\]
This follows at once from pairwise cancellation of internal forces and the absence of external forces. (Kleppner & Kolenkow, *An Introduction to Mechanics*, 2e, §3.3.)

## 8. Visual — diagram or schematic
```text
      p1 →          ← p2
   m1 ●───────────● m2
        F12 = -F21
   (isolated pair on frictionless line)
```
Horizontal line represents one dimension; arrows show equal-and-opposite forces and the momenta they change.

## 9. The memory technique
1. **The hook** — Picture two people standing on ice; every time one pushes the other, both slide apart so their momentum arrows always add to the same fixed vector, like two dancers whose total “dance momentum” never changes.
2. **What to overlearn** — \(\vec{F}_{12}=-\vec{F}_{21}\) and \(d(\vec{p}_1+\vec{p}_2)/dt=0\); initial total momentum equals final total momentum for any isolated pair.
3. **Spaced-repetition schedule** — Review the derivation at 1 day, 3 days, 7 days, 16 days, and 35 days after first study.
4. **First-principles fallback** — If the formula is forgotten, start from \(\vec{F}=d\vec{p}/dt\), insert the third-law pair, add the two equations, and integrate with respect to time.

## 10. What this unlocks
Once you own this derivation you can move to variable-mass systems (rockets), centre-of-mass motion, elastic and inelastic collision formulae, and finally angular-momentum conservation.

- Rocket equation derivation
- Centre-of-mass reference frame problems
- Collision coefficient of restitution definitions
- Two-body reduction in gravitational orbits

## 11. Self-check — five questions, no answers
1. Two particles of masses 4 kg and 6 kg approach each other with velocities \(+5\) m/s and \(-3\) m/s on a straight line. After an elastic collision the 4 kg mass reverses direction at 2 m/s. What is the final speed of the 6 kg mass?
2. A 50 kg astronaut floating in space throws a 2 kg wrench at 10 m/s. What is the astronaut’s recoil velocity?
3. Why does momentum conservation fail if you analyse a falling ball while standing on Earth without including Earth’s momentum?
4. In a two-dimensional collision the initial momenta are \(3\hat{i}\) and \(4\hat{j}\). After collision one particle has momentum \(1\hat{i}+2\hat{j}\). Show that the other particle’s momentum must be \(2\hat{i}+2\hat{j}\).
5. A student claims “momentum is always conserved, even when a car hits a wall.” Identify the mistake and correct the statement.