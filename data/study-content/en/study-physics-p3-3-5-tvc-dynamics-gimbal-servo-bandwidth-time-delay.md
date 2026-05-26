## 1. The one-sentence answer
**TVC gimbal servo bandwidth is the frequency at which the actuator can still deliver commanded nozzle deflection with acceptable gain and phase, while time delay is the pure transport lag between command and actual motion; together they set the ultimate speed and stability limits of thrust-vector steering.**

A rocket steers by tilting its thrust vector a few degrees. The gimbal servo is the closed-loop motor or hydraulic system that produces that tilt. Its bandwidth tells you how rapidly it can follow a rapidly changing steering command before amplitude drops or phase lag grows large. Any additional pure time delay—arising from computation, valve spool travel, or structural compliance—adds phase lag that grows linearly with frequency and can push the vehicle’s attitude loop across the stability boundary.

In the time domain the same limitation appears as finite acceleration and velocity saturation of the nozzle; in the frequency domain it appears as a magnitude roll-off accompanied by phase shift. The combined effect forces the guidance law to limit its own bandwidth well below the actuator’s, leaving margin for the inevitable delay.

> [!NOTE]
> The single most important insight is that actuator bandwidth and delay are not merely “speed limits”; they directly determine the minimum achievable time constant of the vehicle’s rigid-body attitude dynamics and therefore set the highest frequency at which the guidance filter may command corrections.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 and Starship use electro-hydraulic gimbal servos on the Merlin and Raptor engines whose closed-loop bandwidth is deliberately kept above 15 Hz so that the vehicle can reject wind gusts and engine-out transients within the first 10–15 s of flight.  
NASA’s SLS uses redundant hydraulic TVC actuators whose 8–10 Hz bandwidth and measured 12 ms transport delay were explicitly folded into the flight-control stability margins documented in the 2022 Green Run test reports.  
Electron and Neutron rockets from Rocket Lab employ electric TVC; their servo bandwidth of roughly 20 Hz allows a very stiff guidance loop that compensates for the vehicle’s low moment of inertia and consequent high natural frequency.  
Reusable first-stage boost-back burns (Falcon 9, New Shepard) require rapid, repeated gimbal sweeps; servo delay directly limits how late the last correction can be issued before touchdown.  
Modern model-predictive guidance algorithms (e.g., SpaceX’s “Iterative Learning” and NASA’s GPOPS-II trajectories) treat actuator bandwidth and delay as hard constraints inside the optimizer; violation produces either actuator saturation or loss of phase margin.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Second-order linear system response | Servo dynamics are routinely approximated as second-order; natural frequency and damping set the achievable bandwidth. |
| Phase margin and gain margin | Time delay contributes frequency-dependent phase lag that must remain inside stability margins. |
| Transport lag / pure time delay | Introduces e^{-sT} in the Laplace domain; understanding its phase contribution is essential. |
| Closed-loop bandwidth definition (−3 dB) | The numerical value used to specify servo performance and to allocate control-loop crossover frequency. |

## 4. Building the idea — from intuition to formalism

### Step 1 — The actuator must move the nozzle faster than the vehicle rotates
A rigid-body rocket rotates under thrust misalignment with angular acceleration \(\ddot{\theta}=T\delta l/I\). If the nozzle cannot reach the commanded deflection \(\delta\) before the vehicle has already rotated appreciably, the corrective moment arrives too late.

Consider a 100 t vehicle with \(I=2\times10^6\) kg m² and 1 MN engine. A 1° misalignment produces \(\ddot{\theta}\approx0.3\) rad s⁻². The servo must therefore deliver that 1° within roughly 50 ms if the attitude error is to stay below 0.5°.

Formally the open-loop plant from gimbal angle command to vehicle attitude contains the factor
\[
G(s)=\frac{T l}{I s^2}\cdot\frac{\delta(s)}{u(s)},
\]
where \(u(s)\) is the servo command.

> [!WARNING]
> Treating the gimbal angle as an instantaneous input (i.e., setting \(\delta(s)/u(s)=1\)) removes the actuator dynamics and produces an unrealistically high crossover frequency.

### Step 2 — The servo itself is a closed-loop position system
A typical gimbal servo contains an inner velocity or pressure loop wrapped by an outer position loop. Its transfer function from commanded angle \(\delta_c\) to actual angle \(\delta\) is commonly written
\[
\frac{\delta(s)}{\delta_c(s)}=\frac{\omega_n^2}{s^2+2\zeta\omega_n s+\omega_n^2}.
\]

A concrete hydraulic servo on a 200 kN engine might have \(\omega_n=120\) rad s⁻¹ (≈19 Hz) and \(\zeta=0.7\), giving a −3 dB bandwidth of roughly 18 Hz.

> [!WARNING]
> Using the undamped natural frequency \(\omega_n\) as the bandwidth figure overstates performance by 30–40 %; always compute the actual −3 dB point.

### Step 3 — Time delay adds pure phase lag without affecting magnitude
Any computation, valve delay, or structural compliance contributes a term \(e^{-sT}\). Its magnitude is unity, but its phase is \(-\omega T\) rad. At the intended crossover frequency \(\omega_c=10\) rad s⁻¹ a 15 ms delay already subtracts 8.6° of phase margin.

> [!WARNING]
> Ignoring the delay term while keeping the second-order magnitude roll-off leads to an optimistic stability prediction; the Nichols plot will cross the critical point.

### Step 4 — Bandwidth allocation rule
Vehicle rigid-body dynamics, bending modes, and slosh all lie above the actuator bandwidth. The guidance loop crossover is therefore placed at
\[
\omega_c\le\frac{\omega_b}{3}\quad\text{to}\quad\frac{\omega_b}{5},
\]
where \(\omega_b\) is the servo −3 dB bandwidth, leaving margin for the extra phase contributed by delay.

### Step 5 — Unified frequency-domain statement
The complete actuator transfer function used in stability analysis is therefore
\[
G_a(s)=\frac{\omega_n^2}{s^2+2\zeta\omega_n s+\omega_n^2}e^{-sT}.
\]
All subsequent control design proceeds with this plant.

## 5. Worked examples — every step shown

**Example 1 — Bandwidth from step response**
*Given:* A gimbal servo reaches 63 % of a 2° step command in 12 ms with 8 % overshoot.  
*Find:* Approximate \(\omega_n\) and \(\zeta\).

The 10–90 % rise time for a second-order system is \(t_r\approx1.8/\omega_n\). Using the 63 % figure gives \(\omega_n\approx83\) rad s⁻¹.  
Overshoot \(M_p=e^{-\pi\zeta/\sqrt{1-\zeta^2}}=0.08\) yields \(\zeta\approx0.62\).  
**Final answer**  
\(\omega_n\approx83\) rad s⁻¹, \(\zeta\approx0.62\).

*Reflection* The approximation assumes an underdamped step response; measuring overshoot directly avoids iteration.

**Example 2 — Phase contribution of delay**
*Given:* Servo bandwidth 15 Hz, measured transport delay \(T=18\) ms, desired crossover 4 Hz.  
*Find:* Phase lag at crossover due to delay alone.

\[
\phi=-2\pi\cdot4\cdot0.018=-0.45\text{ rad}=-26^\circ.
\]
**Final answer**  
−26° of phase margin consumed by delay.

*Reflection* The linear growth of phase with frequency is the reason delay is more dangerous than a comparable lag from poles.

**Example 3 — Maximum allowable delay for 30° margin**
*Given:* Crossover planned at 5 Hz, all other phase contributions total −120°.  
*Find:* Largest \(T\) that still leaves 30° margin.

Remaining phase budget = 180° − 120° − 30° = 30°.  
\[
T=\frac{30^\circ}{360^\circ\cdot5}=16.7\text{ ms}.
\]
**Final answer**  
\(T\le16.7\) ms.

*Reflection* The calculation shows why electric servos with <5 ms delay enable higher-gain loops than hydraulics.

**Example 4 — Closed-loop attitude time constant**
*Given:* Vehicle gain \(K=T l/I=0.5\) s⁻², actuator \(\omega_b=12\) Hz, \(T=10\) ms.  
*Find:* Achievable attitude-loop time constant.

Place crossover at \(\omega_c=2.4\) Hz (one-fifth of bandwidth). Effective plant gain at crossover yields closed-loop bandwidth ≈1.8 Hz, hence time constant \(\tau\approx0.09\) s.  
**Final answer**  
\(\tau\approx90\) ms.

*Reflection* The factor-of-five rule of thumb directly translates actuator hardware numbers into vehicle-level performance.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using natural frequency instead of −3 dB bandwidth | Manufacturers quote \(\omega_n\) because it is easy to measure in design. | Always compute \(\omega_b=\omega_n\sqrt{1-2\zeta^2+\sqrt{2-4\zeta^2+4\zeta^4}}\). |
| Treating delay as additional damping | Engineers confuse lag with the phase of a real pole. | Insert \(e^{-sT}\) explicitly; never approximate by a pole. |
| Ignoring amplitude dependence of bandwidth | Hydraulic flow limits and motor torque saturation reduce effective bandwidth at large deflections. | Measure frequency response at the maximum expected command amplitude. |
| Assuming zero delay because “the loop is digital” | Computation, valve dynamics and sensor filtering each add 1–5 ms. | Sum every contributor in the signal chain before analysis. |
| Placing crossover at the −3 dB point | The actuator already contributes −45° to −90° phase at its own bandwidth. | Keep crossover ≤ bandwidth/3. |
| Neglecting structural compliance between actuator and nozzle | Mount stiffness adds series compliance that appears as extra delay. | Include mount transfer function measured during static firing. |
| Using small-signal linear models for large step commands | Rate and current limits turn the servo into a nonlinear system. | Validate linear margins with time-domain nonlinear simulation. |

## 7. The textbook-precise statement
Let \(G_a(s)\) be the transfer function from commanded gimbal angle to actual gimbal angle. Then
\[
G_a(s)=\frac{\omega_n^2}{s^2+2\zeta\omega_n s+\omega_n^2}e^{-sT_d},
\]
where \(\omega_n\) and \(\zeta\) are identified from frequency-response data, and \(T_d\) is the total effective transport delay (computation + valve + structural). The −3 dB bandwidth satisfies
\[
|G_a(j\omega_b)|=\frac{1}{\sqrt{2}}.
\]
Stability margins of any outer attitude loop are evaluated with this plant; see Ogata, *Modern Control Engineering*, 5e, §7-6 for the standard derivation of phase margin including transport lag.

## 8. Visual — diagram or schematic
```text
δ_cmd ──► [Servo Controller] ──► [Hydraulic/Electric Actuator] ──► δ_actual
            (PID or state-space)          (2nd-order + saturation)     │
                                       │                              │
                                       ▼                              │
                                 [Transport Delay e^{-sT}] ◄──────────┘
                                       │
                                       ▼
                                 Nozzle / Thrust Vector
                                       │
                                       ▼
                                 Vehicle Angular Accel  θ̈ = (T l / I) δ
```
Horizontal axis is time or frequency; vertical axis shows signal flow from digital command through hardware to vehicle motion.

## 9. The memory technique

**The hook**  
Picture the nozzle as a dog on a leash: bandwidth is how quickly the dog can turn its head; delay is the slack in the leash before the pull is felt.

**What to overlearn**  
1. \(\omega_b \approx \omega_n\sqrt{1-2\zeta^2+\sqrt{2-4\zeta^2+4\zeta^4}}\)  
2. Phase lag of delay: \(\phi=-\omega T\) rad.  
3. Rule of thumb: \(\omega_c\le\omega_b/3\).

**Spaced-repetition schedule**  
Review definitions at 1 day, 3 days, 7 days, 16 days, 35 days after first study.

**First-principles fallback**  
Start from Newton’s second law for the vehicle, insert the second-order servo, multiply by \(e^{-sT}\), then compute the open-loop Bode plot to recover margins.

## 10. What this unlocks
Mastery of gimbal servo bandwidth and delay lets you close the attitude loop with guaranteed margins and then proceed to guidance filter design, bending-mode notch filters, and propellant-slosh compensation.

- Next: rigid-body attitude control law synthesis  
- Next: structural-mode interaction (gain stabilization of bending)  
- Next: model-predictive guidance with actuator constraints  
- Next: fault detection of servo performance degradation in flight

## 11. Self-check — five questions, no answers
1. A servo has \(\omega_n=100\) rad s⁻¹ and \(\zeta=0.65\). Compute its −3 dB bandwidth to the nearest hertz.  
2. If the same servo exhibits an additional 12 ms pure delay, what phase margin is lost when the attitude loop crosses over at 3 Hz?  
3. A vehicle’s moment of inertia halves after staging. How must the allowable crossover frequency change if actuator bandwidth and delay remain fixed?  
4. Why does increasing servo damping from 0.5 to 0.8 sometimes reduce, rather than improve, closed-loop stability when delay is present?  
5. You are given frequency-response data that shows −3 dB at 14 Hz but a phase of −110° at that frequency. What does this reveal about unmodelled delay or higher-order poles?