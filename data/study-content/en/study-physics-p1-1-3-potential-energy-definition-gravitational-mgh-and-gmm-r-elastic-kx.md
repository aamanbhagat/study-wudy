## 1. The one-sentence answer
**Potential energy is the scalar quantity assigned to a configuration of a system such that the work done by a conservative force equals the negative change in this quantity.**

Potential energy exists only for forces whose work is path-independent. When you lift a mass or stretch a spring, the force you apply stores energy that can later be recovered as kinetic energy without loss to friction. The value itself is always relative to an arbitrary reference point chosen for convenience.

The two gravitational forms arise from the same underlying inverse-square law: the linear *mgh* approximation holds when height changes are tiny compared with Earth’s radius, while *-GMm/r* is the exact expression measured from the center of the attracting body. Elastic potential energy follows directly from integrating Hooke’s restoring force.

> [!NOTE]
> The zero of potential energy can be placed anywhere; only differences matter. Choosing an inconvenient zero merely adds a constant that cancels in every physical prediction.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage recovery relies on the conversion between kinetic energy at separation and gravitational potential energy gained during the boost-back burn; engineers set the apogee so that the stage returns with precisely the right speed for the landing burn.  

NASA’s Parker Solar Probe repeatedly uses the gravitational potential term *-GMm/r* to calculate the Oberth effect at perihelion, where a small rocket burn at minimum *r* yields the largest gain in heliocentric specific energy.  

Modern semiconductor lithography stages employ voice-coil actuators whose elastic restoring forces are modeled with ½kx²; sub-nanometer positioning tolerances require that stored elastic energy be accounted for in the real-time servo loop.  

Seismic isolation systems in LIGO store elastic energy in the blade springs and pendulums; the ½kx² term determines the resonant frequencies that must lie below the 10 Hz observation band.  

CubeSat deployers on the ISS use constant-force springs whose potential-energy curves are integrated to guarantee that separation velocity remains below 2 m s⁻¹, protecting both the station and the satellite.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Work done by a force     | Potential energy is defined as the negative of that work for conservative forces |
| Conservative vs. non-conservative forces | Only conservative forces possess a potential-energy function |
| Integration of F(x)      | Both gravitational and elastic potentials are obtained by integrating the force law |
| Newton’s law of gravitation | Supplies the force whose integral yields -GMm/r           |

## 4. Building the idea — from intuition to formalism

### Step 1 — Work is path-independent only for conservative forces
A force is conservative when the net work around any closed path is zero. Gravity and the ideal spring force satisfy this; friction does not.  
Example: lifting a 1 kg book 2 m straight up or via any curved path against gravity always requires 19.6 J.  
The mathematical statement is  
$$\oint \mathbf{F}\cdot d\mathbf{r}=0.$$  
> [!WARNING]
> If you assume friction is conservative you will obtain a potential that depends on path length and the bookkeeping will fail.

### Step 2 — Define potential energy from the work integral
Because work is path-independent, there exists a scalar function *U* such that  
$$W_{\text{cons}}=-\Delta U.$$  
The negative sign is chosen so that positive work by the field lowers potential energy.  
> [!WARNING]
> Reversing the sign convention produces opposite signs in every energy-conservation equation that follows.

### Step 3 — Gravitational force near Earth’s surface
For *r* ≈ *R*ₑ the force is essentially constant, *F* = −*mg*. Integrating from height *h*₁ to *h*₂ gives  
$$U_g=mgh+C.$$  
We conventionally set *C*=0 at *h*=0, yielding the familiar *mgh*.  
> [!WARNING]
> Using *mgh* when height changes exceed a few percent of *R*ₑ introduces several-percent errors in orbital-energy calculations.

### Step 4 — Exact gravitational potential from the inverse-square law
The true force is *F* = −*GMm/r*². Integrating from *r*₁ to *r*₂ yields  
$$U_g=-\frac{GMm}{r}+C.$$  
Choosing *C*=0 at infinity produces the standard form −*GMm/r*.  
> [!WARNING]
> Setting zero at infinity makes *U* negative everywhere; forgetting the sign when adding kinetic energy leads to incorrect escape-velocity results.

### Step 5 — Elastic potential from Hooke’s law
The restoring force of an ideal spring is *F* = −*kx*. Integrating from *x*=0 to *x* gives  
$$U_s=\frac12kx^2.$$  
The factor ½ appears because force increases linearly with displacement.  
> [!WARNING]
> Omitting the ½ produces an energy that is twice the actual stored value and violates the work-energy theorem.

### Step 6 — Total mechanical energy is conserved
When only conservative forces act,  
$$K+U=\text{constant}.$$  
This is the direct consequence of the definition in Step 2 and is the statement used in all subsequent rocket and orbital calculations.

## 5. Worked examples — every step shown

**Example 1 — Simple lift**  
*Given:* A 2 kg payload is raised 5 m at constant speed on Earth.  
*Find:* Change in gravitational potential energy.  
Work done by the lifting force equals *mgh* because gravity is conservative.  
$$W=\int_0^5 mg\,dh=mg\times5.$$  
*Why*: Force is constant, so the integral collapses to multiplication.  
$$\Delta U_g=2\times9.81\times5=98.1\,\text{J}.$$  
**98.1 J**  
*Reflection*: The zero point at ground level cancels when only differences are required.

**Example 2 — Spring launch**  
*Given:* A spring (*k*=800 N m⁻¹) is compressed 0.15 m and releases a 0.3 kg mass on a frictionless table.  
*Find:* Speed at release.  
Initial elastic energy converts entirely to kinetic energy.  
$$\frac12kx^2=\frac12mv^2.$$  
*Why*: Mechanical energy conservation with *U*ₛ only.  
Solve:  
$$v=x\sqrt{k/m}=0.15\sqrt{800/0.3}=7.75\,\text{m s}^{-1}.$$  
**7.75 m s⁻¹**  
*Reflection*: The ½ in both energies cancels, but must be present initially.

**Example 3 — Escape from Earth**  
*Given:* A rocket of mass 500 kg is at 300 km altitude.  
*Find:* Minimum speed to reach infinity.  
Use *U* = −*GMm/r*. At infinity *K*=0 and *U*=0, so  
$$\frac12mv_\text{esc}^2-\frac{GMm}{R_E+h}=0.$$  
*Why*: Total energy must be zero for marginal escape.  
$$v_\text{esc}=\sqrt{2GM/(R_E+h)}=10.93\,\text{km s}^{-1}.$$  
**10.93 km s⁻¹**  
*Reflection*: The negative sign of *U* is essential; a positive value would imply bound motion at infinity.

**Example 4 — Combined gravitational and elastic**  
*Given:* A 1 kg mass hangs from a spring (*k*=200 N m⁻¹) whose unstretched length places the mass 0.4 m below the support.  
*Find:* Extension at equilibrium.  
Gravitational potential decrease balances elastic potential increase.  
$$mgx=\frac12kx^2.$$  
*Why*: Net change in total *U* is zero at static equilibrium.  
Solve quadratic:  
$$x=2mg/k=0.098\,\text{m}.$$  
**0.098 m**  
*Reflection*: The equilibrium point is shifted from the spring’s natural length by the constant gravitational field.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Treating *mgh* as exact at orbital altitudes | Habit from introductory problems            | Check *h/R*ₑ; switch to −*GMm/r* when ratio > 0.01   |
| Forgetting the negative sign in −*GMm/r* | Confusion between force and potential       | Always integrate *F* = −*dU/dr* to confirm sign      |
| Setting zero of elastic energy at maximum extension | Misreading the reference point              | Zero *U*ₛ at *x*=0 by definition                     |
| Adding potentials without choosing a common reference | Different arbitrary constants               | Explicitly state the zero for each *U* before adding |
| Using *U* = *mgh* with upward positive while force is downward | Coordinate sign inconsistency               | Keep consistent sign convention throughout           |
| Ignoring that real springs have *U* beyond ½*kx*² at large *x* | Linear Hooke’s law fails                    | Verify strain remains inside elastic limit           |
| Confusing potential energy with potential (per unit mass) | Notation overlap in orbital mechanics       | Write *U* for energy, *V* or *Φ* for specific potential |

## 7. The textbook-precise statement
For a conservative force **F** = −∇*U*, the potential energy *U* satisfies  
$$U(\mathbf{r}_2)-U(\mathbf{r}_1)=-\int_{\mathbf{r}_1}^{\mathbf{r}_2}\mathbf{F}\cdot d\mathbf{r}.$$  
Near Earth’s surface, *U*₉(*h*) = *mgh* with zero at *h*=0. For two point masses,  
$$U_g(r)=-\frac{GMm}{r}$$  
with zero at infinity. For a linear spring obeying *F* = −*kx*,  
$$U_s(x)=\frac12kx^2$$  
with zero at *x*=0. (Taylor, *Classical Mechanics*, 2005, §4.3.)

## 8. Visual — diagram or schematic
```text
r (radial)
↑
|          U=0 at ∞
|   ────────────────────────────────  (asymptote)
|          \
|           \   U(r) = -GMm/r
|            \
|             \___________
|                       \
|                        \   (more negative)
|                         \
+---------------------------→ r
          R_E   low orbit   surface
```
The curve is a hyperbola opening downward; its slope at any *r* equals the gravitational force magnitude.

## 9. The memory technique
1. **The hook** — Picture a roller-coaster car: gravitational potential is the height of each hill; elastic potential is the stretch of the return spring at the bottom; both convert cleanly into speed at the next valley.  
2. **What to overlearn** — *ΔU* = −*W*₍cons₎, *U*₉ = *mgh*, *U*₉ = −*GMm/r*, *U*ₛ = ½*kx*².  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-integrate the force law from the chosen zero point; the constant of integration is fixed by the reference choice.

## 10. What this unlocks
Mastery of these three potential-energy expressions is the prerequisite for every subsequent conservation-of-energy argument in orbital mechanics, rocket staging, and vibration analysis.  

- Specific orbital energy *ε* = *v*²/2 − *GM/r*  
- Vis-viva equation  
- Effective potential in central-force problems  
- Simple-harmonic motion and normal-mode analysis  
- Energy methods in Lagrangian mechanics  

## 11. Self-check — five questions, no answers
1. A 50 kg instrument is placed on a spring scale on the Moon (*g*ₘ = *g*/6). By how much does the scale spring compress if *k* = 2000 N m⁻¹?  
2. Calculate the gravitational potential energy difference for a 100 kg satellite moved from 400 km to 4000 km altitude using both *mgh* and −*GMm/r*; quantify the percentage error.  
3. A spring (*k* = 150 N m⁻¹) is stretched 0.2 m and then released with a 0.4 kg mass attached. At what displacement does the mass first come to rest?  
4. Why does the choice of zero for −*GMm/r* at infinity make total mechanical energy negative for all bound orbits?  
5. A force *F* = −*αx*³ is claimed to be conservative. Derive the associated potential energy function and state the reference point you chose.