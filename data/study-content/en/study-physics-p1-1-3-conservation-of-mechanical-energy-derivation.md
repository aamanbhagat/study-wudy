## 1. The one-sentence answer
**Conservation of mechanical energy states that the sum of kinetic and potential energy remains constant for a particle or system acted on solely by conservative forces.**

Mechanical energy is the sum of an object’s kinetic energy (energy of motion) and potential energy (energy stored in position within a force field). When every force doing work derives from a potential—gravity, springs, electrostatics—the work done simply trades one form of energy for the other without loss or gain. The net result is that the total never changes.

This statement is not an extra law; it follows directly from Newton’s second law once the definition of potential energy is introduced. The derivation therefore consists of writing the work–energy theorem and then showing that the work of conservative forces equals the negative change in potential energy, leaving only the statement that kinetic plus potential energy is invariant.

> [!NOTE]
> The single deep insight is that “conservative” is not a property of the force itself but of the path: if the work done between two points is independent of route, a potential function exists and mechanical energy is conserved.

## 2. Why this matters — concrete and current
SpaceX recovers Falcon 9 first stages by converting gravitational potential energy into kinetic energy during descent and then dissipating that kinetic energy controllably with retro-propulsion; engineers verify that the mechanical-energy budget closes to within a few percent before ignition commands are issued.

In semiconductor lithography, electrostatic stages accelerate reticles to velocities of several metres per second and must stop them without vibration; designers treat the stage as a conservative electrostatic spring plus a small non-conservative damping term so that total mechanical energy can be predicted to sub-nanometre accuracy.

The Parker Solar Probe’s gravity-assist manoeuvres at Venus rely on the exact conservation of mechanical energy in the Sun’s gravitational field; any unaccounted dissipation would shift the subsequent perihelion by kilometres and threaten the mission’s thermal survival.

Modern gravitational-wave detectors such as LIGO model suspended test masses as harmonic oscillators whose mechanical energy must remain constant between seismic events; deviations flag stray electric fields or gas damping at the 10⁻²⁰ m level.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Work–energy theorem      | Supplies the starting equation that links net work to change in kinetic energy. |
| Definition of work       | Required to express the work done by any force, conservative or not. |
| Conservative vs. non-conservative forces | Determines whether a potential-energy function can be defined. |
| Potential-energy function | Converts the path-independent work of conservative forces into a state function. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Kinetic energy from Newton’s second law
The work done by the net force on a particle equals the change in a quantity we label kinetic energy.  
A 2 kg cart accelerated from rest by a 10 N force over 3 m reaches 6 m s⁻¹; its kinetic energy is therefore 36 J.  
$$W_\text{net}=\int\mathbf{F}\cdot d\mathbf{r}=\Delta K=\frac12mv_f^2-\frac12mv_i^2.$$  
> [!WARNING]  
> Treating kinetic energy as “½mv²” without deriving it from work hides the fact that it is defined only for the net force.

### Step 2 — Work of a conservative force is path-independent
A force is conservative when the work it performs between two points is the same for every path connecting them.  
Gravity does −mgΔh whether a mass slides down an incline or falls straight; both paths give the same number.  
$$W_\text{cons}(A\to B)=-\Delta U.$$  
> [!WARNING]  
> If you assume path independence without checking (e.g., for friction), the potential function does not exist and energy is not conserved.

### Step 3 — Potential energy defined
Because the work is path-independent, there exists a scalar function U such that the work of the conservative force equals the negative change in U.  
For a vertical spring, U = ½kx² + mgh.  
$$W_\text{cons}=-\Delta U.$$

### Step 4 — Total mechanical energy
Add the kinetic-energy term to the potential-energy term.  
E = K + U is then a single scalar whose value depends only on the state of the system.  
$$E=K+U.$$

### Step 5 — Non-conservative work
Any remaining forces do work W_nc that is path-dependent.  
The work–energy theorem now reads W_nc + W_cons = ΔK.  
Substituting W_cons = −ΔU immediately yields  
$$W_\text{nc}=\Delta K+\Delta U=\Delta E.$$

### Step 6 — Conservation statement
When W_nc = 0, the change in total mechanical energy is zero.  
$$K_i+U_i=K_f+U_f.$$  
This is the textbook statement of conservation of mechanical energy.

## 5. Worked examples — every step shown

**Example 1 — Free fall from rest**  
*Given:* A 0.5 kg stone is released from rest at height 20 m; g = 9.8 m s⁻².  
*Find:* Speed just before impact.  
Step 1: Set U_i = mgh = 98 J, K_i = 0.  
*Why:* Initial kinetic energy is zero by the problem statement.  
Step 2: At impact U_f = 0, so K_f = 98 J.  
*Why:* W_nc = 0 and gravity is conservative.  
Step 3: ½mv² = 98 J → v = √(392) ≈ 19.8 m s⁻¹.  
**98 J**  

*Reflection:* The only arithmetic is solving for v; the physics is exhausted once the energy balance is written.

**Example 2 — Vertical spring launch**  
*Given:* A 0.2 kg mass compresses a k = 200 N m⁻¹ spring by 0.1 m and is released.  
*Find:* Maximum height above the release point.  
Step 1: Initial energy = ½k x² = 1 J.  
*Why:* All energy is spring potential at maximum compression.  
Step 2: At maximum height, v = 0 and spring is relaxed, so mgh = 1 J.  
*Why:* Mechanical energy is conserved; kinetic energy is again zero at the turning point.  
Step 3: h = 1/(0.2×9.8) ≈ 0.51 m.  
**0.51 m**  

*Reflection:* The zero of potential can be chosen anywhere; only differences matter.

**Example 3 — Pendulum with small air drag**  
*Given:* A 1 kg bob swings from 30° with drag doing −0.05 J per half-cycle.  
*Find:* Height after three full swings.  
Step 1: Initial E = mgL(1−cos30°) = 1.27 J.  
Step 2: After six half-cycles, W_nc = −0.30 J.  
Step 3: E_final = 0.97 J → height = 0.099 m.  
**0.099 m**  

*Reflection:* When W_nc is known, the same algebra still works; only the numerical value of E changes.

**Example 4 — Two-stage rocket coast**  
*Given:* After burnout a 5000 kg upper stage has v = 7500 m s⁻¹ at 200 km altitude; Earth radius 6371 km, g₀ = 9.81 m s⁻².  
*Find:* Apogee radius.  
Step 1: K_i = ½×5000×7500² = 1.406×10¹¹ J.  
Step 2: U_i = −GMm/r_i, r_i = 6571 km.  
Step 3: At apogee v = 0, so E = U_f.  
Step 4: Solve r_f = GMm / |E| = 42 300 km.  
**42 300 km**  

*Reflection:* Gravitational potential is negative; the sign must be tracked carefully.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using ΔU = mgh for springs        | Habit from gravity problems                 | Write the explicit potential for each conservative force before substituting. |
| Forgetting that friction is path-dependent | Friction appears everywhere in daily life   | Explicitly compute W_nc = ∫f·dr along the actual path. |
| Setting U = 0 at arbitrary points inconsistently | Zero of potential is conventional           | Fix the zero once at the start and keep it.          |
| Treating kinetic energy as always positive | Sign error when velocities reverse          | Remember K is ½mv²; direction lives in velocity, not K. |
| Applying conservation when electric fields do non-conservative work | Mis-classifying forces                      | Check curl F = 0 or path independence before declaring a force conservative. |
| Ignoring system boundaries        | Energy “lost” to a subsystem                | Define the system so that all conservative forces are internal. |
| Numerical cancellation of large terms | Gravitational potential is large and negative | Compute ΔU directly rather than U_f − U_i separately. |

## 7. The textbook-precise statement
If every force acting on a particle or rigid body is conservative, then the total mechanical energy  
$$E=\frac12mv^2+U(\mathbf{r})$$  
is constant along the motion. Equivalently,  
$$W_\text{nc}=\Delta E=0.$$  
(See Goldstein, *Classical Mechanics*, 3e, §1.4, or Taylor, *Classical Mechanics*, §4.2.)

## 8. Visual — diagram or schematic
```text
          v
          ↑
      K = ½mv²
          |
  U = mgh | h
          |
--------- ground (U=0) ----------
```
Labelled points: initial height h with K=0; final height 0 with U=0 and K=½mv². The vertical arrow indicates the only allowed energy exchange when W_nc=0.

## 9. The memory technique
1. **The hook** — Picture a ski jumper at the top of a perfectly smooth slope: the instant the slope turns icy, the red “energy meter” (K+U) freezes; any friction melts the meter reading.
2. **What to overlearn** — E = K + U; W_nc = ΔE; U_grav = mgh (near Earth); U_spring = ½kx².
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from W_net = ΔK, split W_net into W_cons + W_nc, replace W_cons by −ΔU, and set W_nc = 0.

## 10. What this unlocks
The conservation statement is the gateway to orbital mechanics, Lagrangian and Hamiltonian formulations, and all subsequent energy methods in rigid-body dynamics.  
- Orbital vis-viva equation  
- Effective potential in central-force problems  
- Hamilton’s equations  
- Noether’s theorem for time-translation invariance  

## 11. Self-check — five questions, no answers
1. A bead slides on a frictionless vertical circle. At what angle does its kinetic energy equal its gravitational potential energy measured from the bottom?  
2. A spring-launched mass reaches height h on Earth. What height does it reach on the Moon (g_Moon = g/6) if the spring compression is unchanged?  
3. A particle moves under a force F = −kx − βv. Is mechanical energy conserved? Justify in one sentence.  
4. Two identical blocks compress identical springs by the same amount; one is released on a rough table, the other on a smooth table. Which block rises higher when both reach a smooth ramp?  
5. Derive the escape speed from Earth’s surface using only conservation of mechanical energy and the Newtonian gravitational potential; state every assumption explicitly.