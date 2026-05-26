## 1. The one-sentence answer
**Power is the time rate at which work is performed or energy is transferred.**

Work accumulates energy over an interval; power measures how rapidly that accumulation occurs. Average power therefore equals total work divided by elapsed time, while instantaneous power is the limiting value of that ratio as the interval shrinks to zero. In one dimension the instantaneous form reduces to the product of force and velocity because work itself is the integral of force along a path.

This distinction matters immediately in any system whose energy flow changes with time. A rocket engine does not deliver constant power even at constant thrust; its power rises linearly with speed because the same force acts through greater distance per second as velocity increases. The same principle governs electric motors, metabolic rates, and semiconductor heat dissipation.

> [!NOTE]
> The single deepest insight is that power is always a derivative (or finite-difference ratio) of energy with respect to time; any quantity that looks like “energy per unit time” is therefore power, regardless of the labels attached to the energy.

## 2. Why this matters — concrete and current
SpaceX’s Raptor engine produces roughly 2.3 MN of thrust in vacuum. At 1000 m s⁻¹ vehicle speed the instantaneous propulsive power already exceeds 2.3 GW; that figure is obtained directly from P = F·v and is used in real-time guidance algorithms to decide throttle settings during ascent.

Tesla’s 4680 cell manufacturing line measures average power draw on each formation cycler to within 0.1 %. Because formation occurs at variable C-rates, engineers track both average power over the 12-hour cycle and instantaneous peaks that determine cable sizing and cooling capacity.

The Event Horizon Telescope relies on hydrogen maser clocks whose frequency stability is limited by the instantaneous power fluctuations in the microwave amplifiers; a 10 nW drift over 1 s integrates into phase noise that would blur the photon ring of M87*.

Semiconductor fabs running extreme-ultraviolet lithography tools consume 1–2 MW per scanner. Power-delivery networks must keep instantaneous voltage droop below 1 % during the 10 kHz laser pulses; average power alone is insufficient for the design.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Work                 | Power is defined as the time derivative of work           |
| Scalar product       | Instantaneous power is F·v; direction matters             |
| Derivative (limit)   | Instantaneous power is the limit of ΔW/Δt as Δt → 0       |
| SI base units        | Watt = J s⁻¹ = kg m² s⁻³; dimensional checks rely on this |

## 4. Building the idea — from intuition to formalism

### Step 1 — Work stores energy; time is the independent variable
Work done on a system changes its total mechanical energy. Because any real process occupies a finite interval, the natural next question is how much work occurs per unit time.

Example: lifting a 10 kg mass 2 m in 4 s versus 8 s requires the same 196 J but feels twice as demanding in the shorter interval.

Formally,  
$$W = \int_{\mathbf{r}_1}^{\mathbf{r}_2} \mathbf{F}\cdot d\mathbf{r}.$$

> [!WARNING]
> Treating work as an instantaneous quantity instead of an accumulated quantity leads to dimensionally inconsistent expressions later.

### Step 2 — Average power is the finite ratio of work to time
When only the totals are known, divide work by elapsed time. This yields a single number that characterises the entire interval.

Example: the 196 J lift performed in 4 s gives P_avg = 49 W.

Formally,  
$$P_\text{avg} = \frac{\Delta W}{\Delta t} = \frac{W}{t}.$$

> [!WARNING]
> Using P_avg when the force or velocity varies appreciably inside the interval underestimates peak loads on motors or structures.

### Step 3 — Instantaneous power is the derivative of work with respect to time
Shrink the interval until the ratio converges to a unique value at each instant. By definition this is the derivative.

Formally,  
$$P = \lim_{\Delta t \to 0} \frac{\Delta W}{\Delta t} = \frac{dW}{dt}.$$

> [!WARNING]
> Confusing the derivative with a simple ratio at a finite but small Δt produces systematic error that grows with the second derivative of W(t).

### Step 4 — Chain rule yields the force–velocity product
Because W = ∫ F·dr and dr = v dt, the chain rule immediately supplies  
$$P = \mathbf{F}\cdot\mathbf{v}.$$

This form is often easier to evaluate when force and velocity are the measured quantities.

> [!WARNING]
> Omitting the dot product and writing P = Fv yields an incorrect scalar when force and velocity are not parallel.

### Step 5 — Units follow directly from the definition
Work has units joules (J = N·m). Division by time produces watts:  
$$1\,\text{W} = 1\,\text{J s}^{-1} = 1\,\text{kg m}^2\text{s}^{-3}.$$

> [!WARNING]
> Using horsepower or calories per hour without explicit conversion factors is the most common source of numerical error in engineering calculations.

### Step 6 — The general statement for any energy reservoir
Power is the rate of change of any energy form—kinetic, potential, chemical, electrical—so the same definitions apply unchanged when the symbol E replaces W.

## 5. Worked examples — every step shown

**Example 1 — Constant force, straight-line motion**  
*Given:* A 500 N force acts parallel to displacement for 8 m in 5 s.  
*Find:* Average power.  

Step 1: Compute work.  
$$W = F\cdot d = 500\,\text{N}\times 8\,\text{m} = 4000\,\text{J}$$  
*Why:* Work equals force times distance when vectors are parallel.

Step 2: Divide by time.  
$$P_\text{avg} = \frac{4000\,\text{J}}{5\,\text{s}} = 800\,\text{W}$$  
*Why:* Definition of average power.

**800 W**

*Reflection:* Parallel vectors made the dot product trivial; the same arithmetic appears in every constant-thrust coast phase.

**Example 2 — Force and velocity at an instant**  
*Given:* A 1200 kg car travels at 25 m s⁻¹ while its engine delivers 30 kN forward.  
*Find:* Instantaneous power.

Step 1: Form the dot product.  
$$P = F v \cos 0^\circ = 30000\,\text{N}\times 25\,\text{m s}^{-1}$$  
*Why:* Instantaneous power equals F·v.

Step 2: Multiply.  
$$P = 750000\,\text{W} = 750\,\text{kW}$$  
*Why:* Direct evaluation of the product.

**750 kW**

*Reflection:* No integration was required once the force–velocity form was recognised.

**Example 3 — Variable speed, constant thrust (rocket)**  
*Given:* A rocket produces constant 10 kN thrust while accelerating from 200 m s⁻¹ to 800 m s⁻¹ in 60 s.  
*Find:* Average power over the interval.

Step 1: Work equals thrust times distance; distance = average velocity × time.  
$$d = \frac{200+800}{2}\times 60 = 30000\,\text{m}$$  
*Why:* Constant acceleration implies constant average velocity.

Step 2: Work.  
$$W = 10000\,\text{N}\times 30000\,\text{m} = 3\times 10^8\,\text{J}$$  
*Why:* Definition of work.

Step 3: Average power.  
$$P_\text{avg} = \frac{3\times 10^8}{60} = 5\times 10^6\,\text{W}$$  
*Why:* Definition of average power.

**5 MW**

*Reflection:* Average velocity shortcut works only for constant acceleration; otherwise integrate v(t) explicitly.

**Example 4 — Instantaneous power from energy function**  
*Given:* Kinetic energy of a 2 kg mass is K(t) = 10 t² J.  
*Find:* Instantaneous power at t = 3 s.

Step 1: Differentiate energy.  
$$P = \frac{dK}{dt} = 20 t$$  
*Why:* Power is the time derivative of energy.

Step 2: Evaluate at t = 3.  
$$P(3) = 60\,\text{W}$$  
*Why:* Direct substitution.

**60 W**

*Reflection:* Any differentiable energy function immediately supplies power by differentiation; no force calculation was needed.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Reporting P_avg when peaks matter | Most instruments display only averages              | Compute both ΔW/Δt and dW/dt; compare magnitudes     |
| Writing P = Fv without dot product| Scalar multiplication is easier to type             | Always retain vector notation until angle is known   |
| Confusing watt with watt-hour     | Everyday language uses “watts” for energy           | Convert explicitly: 1 Wh = 3600 J                    |
| Using P = ΔE/Δt for non-constant processes | Finite difference hides curvature            | Take limit or fit analytic derivative                |
| Mixing horsepower and watts       | Legacy units in automotive data sheets              | Convert 1 hp = 745.7 W before arithmetic             |
| Forgetting that gravity does no work in horizontal motion | Vertical force component is perpendicular to velocity | Project force onto velocity vector first             |
| Treating negative power as “loss” | Sign indicates direction of energy flow             | Keep sign; negative P means energy leaving the system|

## 7. The textbook-precise statement
Power is the instantaneous rate of change of work (or any energy) with respect to time:  
$$P(t) \equiv \frac{dW}{dt} = \mathbf{F}(t)\cdot\mathbf{v}(t).$$  
Average power over a finite interval [t₁, t₂] is the ratio  
$$P_\text{avg} = \frac{W(t_2)-W(t_1)}{t_2-t_1}.$$  
Both statements hold in SI units where 1 W = 1 J s⁻¹. (Halliday, Resnick & Walker, *Fundamentals of Physics*, 12e, §7-7.)

## 8. Visual — diagram or schematic
```text
Energy W(t)
   ↑
   |               W(t)
   |            *
   |         *   \
   |      *       \
   |   *           \
   | *  instantaneous slope = P(t)
   |______________________________→ t
       Δt          average slope = P_avg
```
Labelled points: vertical rise ΔW over horizontal run Δt gives average power; tangent at any point gives instantaneous power.

## 9. The memory technique

1. **The hook** — Imagine energy as water in a tank; power is the litres per second flowing through the outlet pipe. Average power is total litres divided by minutes; instantaneous power is the reading on the flow meter right now.
2. **What to overlearn** — P_avg = W/t; P = F·v; 1 W = 1 J s⁻¹.
3. **Spaced-repetition schedule** — Review definitions at 1 day, 3 days, 7 days, 16 days, 35 days after first study.
4. **First-principles fallback** — Start from W = ∫F·dr, divide by Δt, take the limit Δt→0, apply chain rule to recover F·v.

## 10. What this unlocks
Mastery of average and instantaneous power lets you analyse energy flow in variable-thrust trajectories, size power electronics, and derive the power form of the work–energy theorem.  

- Rocket equation in power variables  
- Instantaneous efficiency η(t) = P_mech(t)/P_input(t)  
- Kinetic-energy theorem differentiated with respect to time  
- Specific power (W kg⁻¹) budgets for spacecraft

## 11. Self-check — five questions, no answers
1. A 200 N force acts at 30° to the velocity vector of a 5 kg object moving at 4 m s⁻¹. Compute instantaneous power.

2. The kinetic energy of a particle is K(t) = 3t³ + 2t J. At what instant is instantaneous power exactly 50 W?

3. A motor lifts a 50 kg mass 12 m in 8 s at constant speed. What average power does it deliver? (Ignore efficiency.)

4. Why does a rocket’s propulsive power increase with speed even though thrust is constant?

5. An engineer records 4500 J of work over the first 3 s of motion and 15000 J over the next 3 s. Is the average power the same in both intervals? If not, what does the difference reveal about the force or velocity?