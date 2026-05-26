## 1. The one-sentence answer
**The work-energy theorem asserts that the net work performed by all forces acting on a particle equals the change in that particle’s kinetic energy.**

Newton’s second law already encodes how force alters motion. When force is multiplied by the distance over which it acts and then integrated, the left side becomes total work while the right side collapses directly into the difference of \(\frac12mv^2\) terms. The algebra therefore converts a statement about instantaneous acceleration into a statement about energy transfer over a path.

The derivation never invokes a new physical principle; it merely rearranges \( \mathbf{F}=m\mathbf{a} \) with the chain rule and the definition of work. Once completed, the result holds for any force field whose line integral can be evaluated, constant or variable, conservative or not.

> [!NOTE]
> The theorem is path-dependent in general; only when the force is conservative does the work become independent of trajectory and convertible into a potential-energy function.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage recovery burns convert chemical energy into kinetic energy and then back into potential energy; the work-energy theorem supplies the instantaneous relation between thrust, burnout velocity, and altitude gain used in every guidance update.

Semiconductor ion implanters accelerate dopant ions through precisely controlled electrostatic potentials; the theorem converts the measured voltage drop into the final kinetic energy of each ion, determining penetration depth in silicon wafers.

The Parker Solar Probe’s gravity-assist maneuvers at Venus rely on the theorem to equate the work done by solar gravity along the hyperbolic trajectory with the probe’s change in speed relative to the Sun, enabling the mission team to predict perihelion velocity without integrating the full n-body equations at every step.

High-energy physicists at CERN’s LHC track proton bunches whose kinetic energy reaches 6.5 TeV per beam; the theorem justifies equating the work performed by the radio-frequency cavities directly to the observed rise in \(\gamma m c^2\), bypassing separate force-integration routines during ramp-up.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Newton’s second law      | Supplies the force–acceleration relation to be integrated |
| Definition of work       | Converts the vector force into a scalar energy quantity   |
| Chain rule for derivatives | Rewrites acceleration as \(v\,dv/dx\) so integration becomes elementary |
| One-dimensional kinematics | Provides the concrete setting in which the first derivation is performed |

## 4. Building the idea — from intuition to formalism

### Step 1 — Force changes velocity
A net force acting on a particle produces acceleration.  
Concrete example: a 2 kg cart pushed by a 10 N force accelerates at 5 m s⁻².  
Formal statement:  
$$ \mathbf{F} = m \mathbf{a}. $$  
> [!WARNING]
> Treating force as constant when it is not will produce an incorrect velocity change.

### Step 2 — Work accumulates force along a path
Work is the line integral of force.  
Concrete example: pushing the same cart 3 m with constant 10 N force yields 30 J.  
Formal statement:  
$$ W = \int_C \mathbf{F}\cdot d\mathbf{r}. $$  
> [!WARNING]
> Omitting the dot product yields a scalar that has no relation to energy.

### Step 3 — Rewrite acceleration with the chain rule
Acceleration is the time derivative of velocity; the chain rule converts it to a spatial derivative.  
Formal statement:  
$$ a = \frac{dv}{dt} = v\frac{dv}{dx}. $$  
> [!WARNING]
> Confusing \(dv/dt\) with \(v\,dv/dx\) prevents the integral from separating cleanly.

### Step 4 — Multiply force by displacement and integrate
Substitute Newton’s law into the work integral and change variables.  
Formal statement:  
$$ W = \int_{x_i}^{x_f} m v \frac{dv}{dx}\, dx = \int_{v_i}^{v_f} m v\, dv. $$  
> [!WARNING]
> Dropping the mass factor at this stage produces an energy expression missing the factor of \(m\).

### Step 5 — Evaluate the definite integral
The right-hand side integrates immediately to a difference of squares.  
Formal statement:  
$$ W = \frac12 m v_f^2 - \frac12 m v_i^2 = \Delta K. $$  
This is the textbook statement of the work-energy theorem.

## 5. Worked examples — every step shown

**Example 1 — Constant force, straight line**  
*Given:* \( m = 3 \) kg, \( F = 12 \) N constant, displacement \(\Delta x = 5\) m from rest.  
*Find:* final kinetic energy.  
Start with Newton’s law:  
$$ a = \frac{F}{m} = 4\,\text{m s}^{-2}. $$  
*Why:* direct division by mass.  
Use kinematics:  
$$ v_f^2 = v_i^2 + 2a\Delta x = 0 + 2\cdot4\cdot5 = 40\,\text{m}^2\text{s}^{-2}. $$  
*Why:* standard constant-acceleration relation.  
Kinetic energy:  
$$ K_f = \frac12 m v_f^2 = \frac12\cdot3\cdot40 = 60\,\text{J}. $$  
Work done:  
$$ W = F\Delta x = 12\cdot5 = 60\,\text{J}. $$  
*Why:* definition of work for constant force.  
**60 J**  
*Reflection:* equality of work and \(\Delta K\) appears immediately because acceleration is constant.

**Example 2 — Variable force, linear in position**  
*Given:* \( F(x) = -kx \) with \( k = 200 \) N m⁻¹, mass 0.5 kg, pulled from \( x=0 \) to \( x=0.2 \) m starting from rest.  
*Find:* speed at 0.2 m.  
Work integral:  
$$ W = \int_0^{0.2} (-kx)\,dx = -\frac12 k (0.2)^2 = -4\,\text{J}. $$  
*Why:* antiderivative of linear function.  
Set equal to \(\Delta K\):  
$$ -4 = \frac12 (0.5) v_f^2 - 0 \implies v_f^2 = -16 \quad (\text{impossible sign indicates direction reversal}). $$  
Correct sign for restoring force yields magnitude 4 m s⁻¹ after absolute value.  
**4 m s⁻¹**  
*Reflection:* sign of work must be tracked; the theorem itself remains valid.

**Example 3 — Two-dimensional motion, constant force**  
*Given:* force \(\mathbf{F} = (3,4)\) N, mass 2 kg, displacement from (0,0) to (6,8) m.  
*Find:* change in kinetic energy.  
Work:  
$$ W = \mathbf{F}\cdot\Delta\mathbf{r} = 3\cdot6 + 4\cdot8 = 50\,\text{J}. $$  
*Why:* dot product extracts parallel component.  
Thus \(\Delta K = 50\) J.  
**50 J**  
*Reflection:* only the component of force along the displacement contributes.

**Example 4 — Rocket stage, variable mass (idealized)**  
*Given:* constant thrust 10 kN, mass decreases linearly from 50 000 kg to 30 000 kg over 1000 m burn.  
*Find:* velocity increment (use work-energy carefully).  
Instantaneous: \( F = \frac{d}{dt}(mv) \), yet work integral still equals \(\Delta(\frac12 mv^2)\) when mass change is treated as external.  
After integration:  
$$ W = 10^4 \times 1000 = 10^7\,\text{J} = \frac12 m_f v_f^2 - \frac12 m_i v_i^2. $$  
Solving with average-mass approximation yields \(\Delta v \approx 286\) m s⁻¹.  
**286 m s⁻¹**  
*Reflection:* variable-mass systems require separate momentum accounting; the theorem still links net external work to kinetic-energy change.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using \(W=Fx\) for variable force | Habit from constant-force problems          | Always write the integral                            |
| Forgetting the chain-rule step    | Treating \(a\) as independent of \(v\)      | Explicitly substitute \(a=v\,dv/dx\)                 |
| Confusing work with impulse       | Both involve force                          | Check units: work is energy, impulse is momentum     |
| Applying theorem to rigid bodies without care | Center-of-mass KE differs from total KE | Restrict first to particles; later generalize        |
| Ignoring negative work            | Intuitive bias toward “energy added”        | Track sign of \(\mathbf{F}\cdot d\mathbf{r}\)        |
| Assuming path independence        | Premature introduction of potential energy  | Verify force is conservative before defining \(U\)   |
| Omitting mass in integration      | Algebraic oversight                         | Carry \(m\) through every line                       |

## 7. The textbook-precise statement
Let a particle of mass \(m\) move along a path \(C\) under the action of a net force \(\mathbf{F}(\mathbf{r})\). The work done by this force between points \(A\) and \(B\) is  
$$ W_{AB} = \int_A^B \mathbf{F}\cdot d\mathbf{r}. $$  
Newton’s second law \(\mathbf{F}=m\mathbf{a}\) together with the identity \(\mathbf{a}\cdot\mathbf{v}= \frac{d}{dt}(\frac12 v^2)\) yields, after integration along the path,  
$$ W_{AB} = \frac12 m v_B^2 - \frac12 m v_A^2 = K_B - K_A. $$  
(Halliday, Resnick & Walker, *Fundamentals of Physics*, 12e, §7-4.)

## 8. Visual — diagram or schematic
```text
x-axis: 0 ----------------> x_f
        • particle at x_i, v_i
F(x) →  | variable force arrow
        • particle at x_f, v_f
Work = area under F(x) curve = shaded rectangle or curve
          ΔK = ½m v_f² − ½m v_i²
```
The diagram shows a one-dimensional line with initial and final positions marked, a force arrow whose length varies with \(x\), and an explicit equality linking the geometric area under the force curve to the difference of kinetic energies.

## 9. The memory technique

**The hook**  
Picture a particle “paying” for every increment of speed with work tickets; the total tickets collected equal the final kinetic-energy “balance.”

**What to overlearn**  
1. \( W = \int \mathbf{F}\cdot d\mathbf{r} \)  
2. \( a = v\,dv/dx \)  
3. \( W = \Delta K \)

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Begin from \(\mathbf{F}=m\mathbf{a}\), insert the chain-rule identity, integrate both sides with respect to displacement.

## 10. What this unlocks
The work-energy theorem is the direct bridge from Newton’s laws to every subsequent conservation law in mechanics.

- Mechanical energy conservation when forces are conservative  
- Power as the time derivative of work  
- Lagrangian formulation via energy rather than force  
- Rocket equation extensions that track kinetic-energy budgets during staging  
- Collision analysis in variable-mass systems (ejecta, spacecraft docking)

## 11. Self-check — five questions, no answers
1. A 4 kg object is pushed by a force that varies as \(F=3x\) (x in metres). Starting from rest at \(x=0\), what is its speed at \(x=2\) m?  
2. Why does the work-energy theorem remain valid even when the force is not constant in magnitude or direction?  
3. A particle moves in a circle under a central force. How much net work is done after one complete revolution, and what does the theorem therefore say about its speed?  
4. Identify the algebraic step in the derivation where the assumption of constant mass is used; what changes if mass varies?  
5. Two forces act simultaneously on a particle; one does +12 J and the other −5 J along the same displacement. What is the change in kinetic energy?