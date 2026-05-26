## 1. The one-sentence answer
**In simple harmonic motion the total mechanical energy is conserved and equals ½kA² at every instant.**

A mass on a spring stores energy in two interchangeable forms. When the spring is stretched to its maximum distance A the mass is momentarily still, so all the energy sits in the spring as potential energy. As the mass begins to move that stored energy steadily converts into kinetic energy of the moving mass, yet the sum never changes.

At the equilibrium position the spring is relaxed and the mass reaches its highest speed; the entire ½kA² now resides in kinetic energy. Between these extremes the partition between kinetic and potential energy shifts continuously while the total remains fixed.

> [!NOTE]
> The constancy of ½kA² is not an extra assumption; it follows directly from the fact that the restoring force is linear, so the work done around any closed path is zero and mechanical energy is therefore conserved.

## 2. Why this matters — concrete and current
SpaceX uses energy bookkeeping in the vibration qualification of Falcon 9 tanks; finite-element models of liquid-propulsion structures rely on the exact result that peak kinetic energy equals ½kA² to set accelerometer limits before flight.

Seismic instruments aboard the InSight lander on Mars convert ground motion into electrical signals by measuring how much kinetic energy a proof mass acquires at the equilibrium point of its suspension; that energy is precisely ½kA² and determines the instrument’s noise floor.

Quartz crystal microbalances in semiconductor deposition chambers operate at MHz frequencies where the motional energy ½kA² must remain constant to 1 part in 10⁸; any drift signals contamination on the crystal surface.

Molecular-dynamics simulations of rocket-nozzle coatings treat interatomic bonds as harmonic springs; the equipartition result that each oscillator carries average energy ½kA² (with A set by temperature) predicts thermal expansion coefficients used in NASA’s ablative-material design codes.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Hooke’s law F = −kx      | Defines the linear restoring force that makes energy quadratic and therefore conserved |
| Position function x(t) = A cos(ωt + ϕ) | Supplies the instantaneous displacement needed to write PE |
| Velocity v = dx/dt       | Supplies the instantaneous speed needed to write KE       |
| Work–energy theorem      | Links the work of the conservative force to the change in kinetic energy |

## 4. Building the idea — from intuition to formalism

### Step 1 — Elastic potential energy
A spring that obeys Hooke’s law stores energy equal to the work required to stretch it.  
Example: stretching a spring of constant k by distance x requires force rising linearly from 0 to kx; average force ½kx acting through distance x gives stored energy ½kx².  
$$U = \frac12 k x^2$$  
> [!WARNING]
> Replacing the factor ½ with 1 produces an energy that grows too fast and violates energy conservation when the mass returns to equilibrium.

### Step 2 — Kinetic energy of the oscillating mass
The moving mass carries kinetic energy ½mv² at every instant.  
Example: at x = 0 the speed reaches its maximum value v_max; kinetic energy is then ½m v_max².  
$$K = \frac12 m v^2$$  
> [!WARNING]
> Treating velocity as constant ignores the continuous exchange with potential energy and leads to an incorrect total-energy curve.

### Step 3 — Total mechanical energy
Add the two forms:  
$$E = K + U = \frac12 m v^2 + \frac12 k x^2$$  
Because the spring force is conservative, E is constant in time.

### Step 4 — Extreme positions fix the constant
At maximum displacement, x = A and v = 0, so  
$$E = \frac12 k A^2$$  
Hence  
$$E = \frac12 k A^2 \quad\text{(constant)}$$

### Step 5 — Energy equality at every phase
Substitute the SHM solution x(t) = A cos(ωt + ϕ) and its derivative into E; trigonometric identities reduce the sum identically to ½kA².  
The textbook statement therefore reads  
$$K + U = \frac12 k A^2 \quad\text{(constant)}$$

## 5. Worked examples — every step shown

**Example 1 — Total energy from amplitude**  
*Given:* k = 200 N m⁻¹, A = 0.05 m.  
*Find:* E.  
Step 1: write the constant-energy expression.  
*Why:* Step 4 above fixes E at the turning point.  
$$E = \frac12 k A^2$$  
Step 2: insert numbers.  
*Why:* Direct substitution yields the numerical value.  
$$E = \frac12 \times 200 \times (0.05)^2 = 0.25\,\text{J}$$  
**0.25 J**

*Reflection:* The calculation uses only the extreme position; it generalises to any SHM system once A and k are known.

**Example 2 — Kinetic energy at half amplitude**  
*Given:* same k and A; x = A/2.  
*Find:* K.  
Step 1: obtain potential energy at that point.  
*Why:* U depends only on instantaneous x.  
$$U = \frac12 k (A/2)^2 = \frac18 k A^2$$  
Step 2: subtract from total energy.  
*Why:* Conservation (Step 3) gives K = E − U.  
$$K = \frac12 k A^2 - \frac18 k A^2 = \frac38 k A^2$$  
**⅜ k A²**

*Reflection:* The fraction ⅜ appears repeatedly; it shows that energy partitions are fixed by position ratio alone.

**Example 3 — Maximum speed**  
*Given:* m = 0.5 kg, k = 200 N m⁻¹, A = 0.05 m.  
*Find:* v_max.  
Step 1: set K = E at x = 0.  
*Why:* All energy is kinetic at equilibrium.  
$$\frac12 m v_\text{max}^2 = \frac12 k A^2$$  
Step 2: solve for speed.  
*Why:* Algebraic isolation of v_max.  
$$v_\text{max} = A\sqrt{\frac k m} = 0.05\sqrt{400} = 1\,\text{m s}^{-1}$$  
**1 m s⁻¹**

*Reflection:* The square-root dependence on k/m is the natural frequency ω₀; it reappears in every later wave or oscillator problem.

**Example 4 — Energy at arbitrary phase**  
*Given:* x(t) = A cos(ωt), ω = √(k/m).  
*Find:* explicit K(t) + U(t).  
Step 1: write both energies.  
*Why:* Direct substitution tests constancy.  
$$U = \frac12 k A^2 \cos^2(\omega t),\quad K = \frac12 m A^2 \omega^2 \sin^2(\omega t)$$  
Step 2: replace mω² by k.  
*Why:* Definition of ω².  
$$K = \frac12 k A^2 \sin^2(\omega t)$$  
Step 3: add and apply identity.  
*Why:* cos² + sin
² = 1.  
$$E = \frac12 k A^2$$  
**½kA² (constant)**

*Reflection:* The trigonometric cancellation proves conservation without evaluating limits again.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                                      |
|-------------------------------------|---------------------------------------------|------------------------------------------------------|
| Using x = A inside the KE term      | Confuses amplitude with instantaneous displacement | Always evaluate v from the derivative, never from x alone |
| Forgetting the ½ in ½kA²            | Remembers only “kA²” from force law         | Write the potential-energy integral each time until automatic |
| Treating total E as ½kA at extremes | Drops the square on amplitude               | Check dimensions: energy must have units kg m² s⁻²   |
| Setting v = 0 at x = 0              | Reverses the phase of motion                | Sketch x(t) and v(t) together before calculating     |
| Adding K and U without common units | Mixes joules and newton-metres carelessly   | Convert every quantity to base SI units first        |
| Assuming E changes with time        | Forgets force is conservative               | Verify dE/dt = 0 explicitly once using chain rule    |
| Using ω instead of √(k/m) for v_max | Loses track of where ω originates           | Derive v_max = ωA from energy before memorising      |

## 7. The textbook-precise statement
For a particle of mass m attached to a spring of stiffness k obeying Hooke’s law, subject only to that force and moving along the line of the spring, the total mechanical energy  
$$E = \frac12 m \dot x^2 + \frac12 k x^2$$  
is constant and equal to ½kA², where A is the amplitude of the resulting simple-harmonic motion. (Taylor, *Classical Mechanics*, 2005, §5.2.)

## 8. Visual — diagram or schematic
```text
x = -A          x = 0           x = +A
   |               |               |
   ●               ●               ●   position
  (v=0)          (v max)         (v=0)
   U=½kA²        U=0             U=½kA²
   K=0           K=½kA²          K=0
   ───────────────────────────────► x
   Energy bar:  [████████████]  constant height ½kA²
```

## 9. The memory technique
1. **The hook** — picture a fixed-height “energy reservoir” tank labelled ½kA²; a sliding partition labelled “K” and “U” moves back and forth but never changes the tank’s total height.
2. **What to overlearn** — the single line E = ½kA² together with the two expressions K = ½m v² and U = ½k x
².
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — recompute the work integral ∫F dx from 0 to x to recover U, add K, then evaluate at x = A to recover the constant.

## 10. What this unlocks
Energy accounting in SHM supplies the conserved quantity needed for every subsequent driven, damped, or coupled oscillator and for the transition from discrete masses to continuous waves.

- Derivation of the time-independent Schrödinger equation for the harmonic oscillator
- Power balance in driven damped systems (resonance width)
- Normal-mode analysis of multi-degree-of-freedom rocket structures
- Acoustic wave energy density in nozzles and combustion chambers

## 11. Self-check — five questions, no answers
1. A 0.3 kg mass on a 150 N m⁻¹ spring oscillates with amplitude 4 cm. Compute its total energy and its speed at x = 1 cm.
2. At what fraction of the amplitude is the kinetic energy exactly half the total energy?
3. Show algebraically that dE/dt = 0 when x(t) = A cos(ωt) and E = ½mẋ² + ½kx
².
4. A student writes E = ½kA instead of ½kA². Which physical dimension is violated and what is the correct SI unit of the missing factor?
5. In a vertical spring-mass system the equilibrium point shifts by mg/k. Does the oscillation energy expression ½kA² still hold? If so, measured from which point?