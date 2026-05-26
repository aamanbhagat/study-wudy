## 1. The one-sentence answer
**TVC dynamics — gimbal servo bandwidth, time delay** describes how fast and how faithfully the gimbal actuator can tilt the rocket engine in response to GNC commands, and the phase lag it inevitably introduces.

Gimbal servo bandwidth tells you the frequency up to which the actuator can track sinusoidal commands with acceptable amplitude and phase error. Time delay is the additional pure lag caused by digital sampling, computation, and actuator dynamics that shifts the phase margin of the attitude control loop. Together they set the practical upper limit on how aggressive your autopilot gains can be before the closed-loop system becomes unstable or limit-cycles.

A rocket with a 15 Hz gimbal servo bandwidth and 25 ms total delay behaves very differently from one with 40 Hz bandwidth and 8 ms delay during a high-dynamic-pressure pitch-over maneuver.

> [!NOTE]
> The single most important “aha” is that bandwidth and time delay trade directly against each other inside the same actuator: pushing bandwidth higher almost always increases delay, so the designer must optimize their product (phase margin contribution) rather than either quantity alone.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 uses Merlin 1D gimbaled engines whose servo bandwidth is deliberately tuned near 25 Hz; the 20–30 ms cumulative delay from flight computer, valve drivers and hydraulic actuators is explicitly budgeted in the ascent autopilot so that the vehicle can still reject 2–3°/s wind gusts at max-Q without rate saturation.

ISRO’s LVM3 (GSLV Mk-III) employs electro-hydraulic gimbal servos on the two S200 boosters; published telemetry shows that a measured 18 Hz bandwidth combined with 35 ms delay forced the designers to lower the attitude-loop crossover frequency by 30 % compared with the initial design target, directly affecting payload-to-GTO margin.

NASA’s SLS Block 1 uses RS-25 core-stage engines with redundant electromechanical actuators whose closed-loop bandwidth exceeds 35 Hz; the 12 ms digital delay budget is one of the reasons the vehicle can fly a single-engine-out trajectory with only 4° gimbal authority remaining.

Blue Origin’s New Glenn first stage uses BE-4 engines whose gimbal servos are specified to 30 Hz bandwidth and <15 ms total delay; this combination is required to keep the vehicle stable when two engines are intentionally shut down at 120 s to simulate a booster-return profile.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                                                 |
|----------------------------|--------------------------------------------------------------------------------------|
| Second-order transfer function | Models the dominant poles of a position servo and directly yields bandwidth and damping |
| Phase margin               | Quantifies how much extra phase lag (from time delay) the loop can tolerate before instability |
| Padé approximation         | Converts pure time delay into a rational transfer function so classical Bode analysis remains valid |
| Open-loop crossover frequency | The frequency at which bandwidth and delay must be traded to keep phase margin >30° |

If any row is unfamiliar, pause and review it before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Gimbal servo as a position control loop
A gimbal servo is simply a high-bandwidth position servo whose output angle \(\delta\) must follow the commanded angle \(\delta_c\) from the flight computer. The simplest useful model is a second-order system whose natural frequency \(\omega_n\) and damping \(\zeta\) set both the rise time and the resonant peak.

For a typical hydraulic gimbal actuator, \(\omega_n \approx 120\) rad/s and \(\zeta \approx 0.7\) give a –3 dB bandwidth of roughly 25 Hz.

> [!WARNING]
> Treating the servo as instantaneous (\(\delta = \delta_c\)) removes the only phase lag that grows with frequency; the attitude loop will then be designed 30–40° more optimistic than reality.

### Step 2 — Definition of servo bandwidth
Bandwidth \(\omega_b\) is the frequency at which the magnitude of the closed-loop transfer function drops to \(1/\sqrt{2}\) of its DC value. For the second-order plant above it is given by
\[
\omega_b = \omega_n\sqrt{1-2\zeta^2 + \sqrt{2-4\zeta^2+4\zeta^4}}.
\]

### Step 3 — Sources of time delay
Total loop delay \(\tau\) is the sum of three deterministic contributions: sensor sampling (one sample), flight-computer computation (one or two cycles), and actuator transport lag (valve spool dynamics plus fluid-line delay). Typical values range from 8 ms (all-electric) to 40 ms (hydraulic).

### Step 4 — Phase contribution of pure delay
A pure delay \(e^{-s\tau}\) contributes a phase of \(-\omega\tau\) radians at every frequency. At the intended crossover frequency \(\omega_c\), this phase must be subtracted from the available phase margin.

### Step 5 — Interaction with autopilot crossover
The attitude-loop crossover \(\omega_c\) is deliberately placed 1.5–2.5 times below \(\omega_b\) so that the actuator still has 30–40° of phase margin left after the delay penalty \(-\omega_c\tau\) is applied.

### Step 6 — First-order Padé approximation for analysis
For classical Bode design the delay is replaced by the (1,1) Padé approximant
\[
e^{-s\tau} \approx \frac{1-s\tau/2}{1+s\tau/2}.
\]
The resulting rational transfer function can be multiplied into the open-loop plant without leaving the s-domain.

## 5. Worked examples — har step show karo

**Example 1 — Bandwidth from second-order parameters**  
*Given:* \(\omega_n = 120\) rad/s, \(\zeta = 0.7\).  
*Find:* –3 dB bandwidth \(\omega_b\).  
Substitute into the formula:  
\[
\omega_b = 120\sqrt{1-2(0.49)+\sqrt{2-1.96+1.96}} = 120\sqrt{0.02+1.414} \approx 114.5 \text{ rad/s} \approx 18.2 \text{ Hz}.
\]  
*Why:* Direct substitution evaluates the closed-loop magnitude condition.  
**18.2 Hz**

*Reflection:* This example shows that bandwidth is always lower than \(\omega_n\) once damping is realistic.

**Example 2 — Phase lag from measured delay**  
*Given:* \(\tau = 25\) ms, desired \(\omega_c = 8\) rad/s.  
*Find:* phase contribution.  
\[
\phi = -8 \times 0.025 \times 180/\pi \approx -11.5^\circ.
\]  
*Why:* Linear phase slope of a pure delay is constant in frequency.  
**-11.5°**

*Reflection:* Eleven degrees may look small, yet it often consumes one-third of the total phase-margin budget.

**Example 3 — Padé insertion into open-loop plant**  
*Given:* plant \(G(s) = \frac{5}{s^2}\), delay \(\tau = 0.03\) s.  
Replace delay:  
\[
G_{\text{aug}}(s) = \frac{5}{s^2}\cdot\frac{1-0.015s}{1+0.015s}.
\]  
*Why:* Keeps the loop rational so root-locus or Bode tools remain applicable.  
**Augmented plant ready for margin calculation**

*Reflection:* The right-half-plane zero introduced by Padé warns that high gain will destabilize the loop.

**Example 4 — Allowable crossover given bandwidth and delay**  
*Given:* servo bandwidth 25 Hz, total delay 20 ms, required phase margin 35°.  
Assume actuator contributes –25° at \(\omega_c\); remaining margin for delay is 10°.  
\[
\omega_c \le 10^\circ \times \pi/180 / 0.02 \approx 8.7 \text{ rad/s} \approx 1.4 \text{ Hz}.
\]  
*Why:* Phase margin allocation forces crossover well below bandwidth.  
**\(\omega_c \le 1.4\) Hz**

*Reflection:* The factor of 18 between bandwidth and crossover is typical once all delays are counted.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming servo bandwidth equals \(\omega_n\) | Textbook second-order formula is rarely memorized correctly | Always compute \(\omega_b\) from the magnitude condition |
| Ignoring computation delay when quoting “servo bandwidth” | Vendor data sheets list only hydraulic or motor bandwidth | Add measured flight-computer latency before using the number |
| Placing crossover at 1/3 of bandwidth | Rule of thumb forgets that delay phase grows linearly | Recalculate allowable \(\omega_c\) after every delay budget change |
| Using Pade (2,2) without checking RHP zeros | Higher-order approximants introduce extra unstable zeros | Stay with (1,1) unless \(\omega_c\tau < 0.2\) |
| Treating delay as constant across temperature | Hydraulic fluid viscosity changes \(\tau\) by 30 % | Include worst-case hot/cold delay in Monte-Carlo stability runs |
| Forgetting that bandwidth itself drops under load | High aerodynamic torque reduces effective \(\omega_n\) | Measure closed-loop bandwidth on a loaded test stand |

## 7. The textbook-precise statement
In “Space Vehicle Dynamics and Control” (2nd ed., B. Wie, AIAA, 2008, §7.4), the gimbal-actuator dynamics are written
\[
\frac{\delta(s)}{\delta_c(s)} = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2} e^{-s\tau},
\]
where \(\omega_n\) and \(\zeta\) are identified from step-response tests and \(\tau\) is the measured end-to-end transport lag (sensor-to-surface). The open-loop transfer function of the attitude loop then becomes
\[
L(s) = K(s) \cdot G_{\text{rigid}}(s) \cdot \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2} e^{-s\tau},
\]
and stability margins must be evaluated after the (1,1) Padé substitution with the explicit hypothesis that \(\omega_c\tau < 0.3\).

## 8. Visual — diagram or schematic
```text
Flight Computer --> [ZOH] --> [Delay τ_comp] --> [Servo TF] --> δ
                       |                                |
                       +--- ω_b measurement point ------+
                       |                                |
                       +--- total τ = τ_comp + τ_act ---+
```

Horizontal axis is time or frequency; vertical arrows show command flow and the two delay blocks that accumulate phase lag.

## 9. The memory technique
1. **The hook** — Picture the gimbal servo as a dog on a leash: bandwidth is how quickly the dog can turn its head; time delay is how long the leash is. A short leash (low delay) lets the dog run faster (higher crossover) before it trips.
2. **What to overlearn** — \(\omega_b \approx 0.8\omega_n\) for \(\zeta=0.7\); every 10 ms of delay costs ~6° of phase at 10 rad/s.
3. **Spaced-repetition schedule** — Review the two formulas at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If the formula is forgotten, start from the magnitude condition \(|G(j\omega)| = 1/\sqrt{2}\) and solve for \(\omega\); rebuild the phase contribution as \(-\omega\tau\).

## 10. What this unlocks
Mastery of gimbal servo bandwidth and delay lets you set autopilot crossover frequencies with confidence and predict limit-cycle amplitude when the actuator saturates.  

- Next: gain scheduling across the transonic region  
- Next: describing-function analysis of rate saturation  
- Next: structural-filter design to protect bending modes once actuator phase is known  

## 11. Self-check — five questions, no answers
1. A servo with \(\omega_n = 100\) rad/s and \(\zeta = 0.5\) has what –3 dB bandwidth in hertz?  
2. If total delay increases from 15 ms to 30 ms while bandwidth stays fixed, by how many degrees does phase margin drop at 10 rad/s?  
3. Why does raising servo gain to increase bandwidth eventually reduce phase margin?  
4. Using the (1,1) Padé approximant, locate the right-half-plane zero and state its effect on high-frequency roll-off.  
5. A measured step response shows 10 % overshoot and 25 ms settling time; estimate both \(\zeta\) and the resulting bandwidth.