## 1. The one-sentence answer
**PID control is a feedback law that computes actuator commands as a weighted sum of the current error, the accumulated error over time, and the rate of change of error.**

Aap is law ko rocket ke attitude ya trajectory correction ke liye use karte hain. Proportional term error ke size ke hisaab se turant force lagata hai. Integral term past errors ko jodta hai taaki steady-state offset zero ho jaaye. Derivative term future error ka prediction karke overshoot ko rokta hai.

Yeh teen terms ek saath ek linear combination banate hain jo plant (rocket dynamics) ko desired setpoint par le jaata hai. Har term ka coefficient (Kp, Ki, Kd) tuning se decide hota hai.

> [!NOTE]
> The real power of PID lies in the fact that you never need an exact model of the rocket; you only need to observe how the error behaves right now, in the past, and how fast it is changing.

## 2. Why this matters — concrete and current
SpaceX uses cascaded PID loops on Falcon 9 for both thrust-vector control of the Merlin engines and grid-fin steering during re-entry; the same structure appears in the published flight software architecture papers from 2015–2022.

ISRO’s LVM3 and Gaganyaan attitude control system implements PID on the liquid and solid motor TVC actuators; the gains were tuned on the ground using the same error-integral wind-up protection logic that appears in every GNC textbook.

Blue Origin’s New Shepard employs a gain-scheduled PID controller for the BE-3 engine gimbal during vertical landing; the derivative term is critical because the vehicle’s moment of inertia changes rapidly as propellant is depleted.

In semiconductor lithography machines (ASML EUV steppers) the reticle stage uses PID with feed-forward to achieve sub-nanometer positioning at 100 Hz update rates; the integral term removes thermal drift that would otherwise accumulate over a full wafer lot.

NASA’s Mars 2020 Perseverance entry-descent-landing guidance used a PID-based reaction-control-system allocator; the same algorithm was re-used from the Curiosity mission because its stability margins had already been verified on Earth.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Linear time-invariant systems | PID is a linear controller; superposition must hold for superposition of P, I, D terms |
| Laplace transform        | Transfer-function representation lets you write the closed-loop characteristic equation in s-domain |
| First-order and second-order response | Rise time, overshoot, settling time are defined on these canonical plants |
| Basic feedback stability | You must recognise that adding integral action can push poles across the imaginary axis |

If any row above is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Error is the only signal you measure
Aap sirf dekhte hain ki current state desired state se kitna door hai.  
Concrete example: rocket ka pitch angle 5° chahiye, abhi 2° hai → error = 3°.  
Formal statement: let \(e(t) = r(t) - y(t)\).  
> [!WARNING]  
> Agar aap measurement noise ko error maanne lagte hain to derivative term instantly amplify ho jaayega aur actuators saturate ho jaayenge.

### Step 2 — Proportional term reacts to present size of error
Bada error → badi correction.  
Example: 3° error par Kp = 10 Nm/deg to 30 Nm torque command.  
Formal: \(u_P(t) = K_p e(t)\).  
> [!WARNING]  
> Sirf proportional action chhodne se steady-state offset bachta hai kyunki kuch finite error hi torque produce karta hai.

### Step 3 — Integral term removes accumulated offset
Past errors ka area integrate karke zero-offset enforce karta hai.  
Formal: \(u_I(t) = K_i \int_0^t e(\tau) d\tau\).  
> [!WARNING]  
> Integral wind-up: agar actuator already saturated hai aur error abhi bhi non-zero hai to integral term infinity tak ja sakta hai.

### Step 4 — Derivative term damps the rate of change
Error jaldi badh raha hai to opposite command do.  
Formal: \(u_D(t) = K_d \frac{de(t)}{dt}\).  
> [!WARNING]  
> Pure differentiation noise ko badhaata hai; practical implementations always add a low-pass filter.

### Step 5 — Linear superposition gives the complete law
\(u(t) = K_p e(t) + K_i \int e + K_d \dot{e}\).  
Textbook-grade statement reached.

## 5. Worked examples — har step show karo

**Example 1 — Pure proportional on first-order plant**  
*Given:* Plant \(\dot{y} = -2y + u\), Kp = 4, r = 1 (step).  
*Find:* steady-state value of y.  
Step 1: write closed-loop \(\dot{y} = -2y + 4(1-y)\).  
*Why:* substitution of u = Kp e.  
Step 2: at equilibrium \(\dot{y}=0\) → 0 = -2y + 4-4y → y = 4/6 = 2/3.  
**Final answer**  
**y_ss = 2/3**  
*Reflection:* proportional alone leaves 33 % offset; integral is mandatory for zero error.

**Example 2 — Adding integral removes offset**  
*Given:* same plant, add Ki = 6.  
*Find:* new steady-state.  
Step 1: now two states (y and integrator x).  
*Why:* integral state equation \(\dot{x}=e=1-y\).  
Step 2: equilibrium requires \(\dot{x}=0\) hence y=1.  
**Final answer**  
**y_ss = 1**  
*Reflection:* integral forces the only equilibrium that satisfies both plant and integrator equations simultaneously.

**Example 3 — Derivative improves transient**  
*Given:* second-order plant, Kp=9, Ki=0, Kd=3.  
*Find:* damping ratio.  
Step 1: characteristic equation s² + (b+Kd)s + Kp = 0.  
*Why:* standard form comparison.  
Step 2: ζ = (b+Kd)/(2√Kp).  
**Final answer**  
**ζ = 0.67**  
*Reflection:* derivative directly augments damping without changing stiffness.

**Example 4 — Full PID on rocket attitude**  
*Given:* J = 1200 kg m², desired θ = 0, measured θ = 0.2 rad, ∫e dt = 1.5, ė = −0.05 rad/s; Kp=8000, Ki=200, Kd=12000.  
*Find:* torque command.  
Step 1: e = 0 − 0.2 = −0.2.  
*Why:* definition of error.  
Step 2: u = 8000(−0.2) + 200(1.5) + 12000(−0.05).  
*Why:* direct substitution into PID law.  
**Final answer**  
**u = −2200 Nm**  
*Reflection:* negative torque reduces the positive attitude error; integral term already positive because past error was larger.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Derivative kick on setpoint step | Setpoint jump makes ė infinite            | Apply derivative only on measured output     |
| Integral wind-up            | Actuator saturates while error remains      | Clamp integrator or use conditional integration |
| No filtering on derivative  | Sensor noise amplified                      | Use filtered derivative: Kd s/(1+Ts)         |
| Gain sign error             | Positive feedback instead of negative       | Verify u and −y have same sign in block diagram |
| Ignoring sample time        | Discrete implementation differs from continuous | Use Tustin or backward Euler discretisation  |
| Tuning one term at a time without re-checking stability | Coupling between terms                      | Always re-plot root locus or Nyquist after each change |
| Forgetting units            | Kp in Nm/rad vs Nm/deg mismatch             | Keep consistent SI units throughout          |

## 7. The textbook-precise statement
A PID controller has the form  
\[U(s) = K_p E(s) + \frac{K_i}{s} E(s) + K_d s E(s)\]  
where the closed-loop system is assumed to be linear, time-invariant, and initially at rest. The integral term is defined only when the integral exists in the ordinary sense (i.e., e(t) is absolutely integrable over finite intervals). Reference: Ogata, *Modern Control Engineering*, 5th ed., §7-6, Prentice-Hall, 2010.

## 8. Visual — diagram or schematic
```
r(t) ---->(+)----> e(t) ----[Kp]----+
          ^ -                       |
          |                         v
        [Plant] <---[Actuator]<---(+)----> u(t)
          |          ^             ^
          |          |            [Ki/s]
         y(t)        |             |
                     +<---[Kd s]<--+
```
Labels: r = reference, y = output (attitude), e = error, u = torque command.

## 9. The memory technique

1. **The hook** — Imagine three musicians: “Present” (proportional) plays the current note, “Memory” (integral) remembers every missed note and keeps humming the total debt, “Speed” (derivative) warns “the pitch is rising too fast, slow down.”  
2. **What to overlearn** — The exact expression \(u = K_p e + K_i\int e\,dt + K_d\dot{e}\) and the fact that only the integral term guarantees zero steady-state error for a step reference.  
3. **Spaced-repetition schedule** — Review the three-term formula after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from the definition of error, add a term proportional to error, then a term proportional to its integral, then to its derivative; each addition solves one observed deficiency (offset, overshoot, sluggishness).

## 10. What this unlocks
Once you master PID you can immediately move to gain scheduling, cascade loops, and state-space observers that appear in every modern rocket GNC stack.  

- Lead-lag compensation for higher bandwidth  
- LQR optimal control as the “best” linear state-feedback law  
- Model-predictive control that respects actuator limits  
- Kalman-filter sensor fusion feeding the PID error signal  

## 11. Self-check — five questions, no answers
1. A first-order plant under pure P control reaches what steady-state error for a unit ramp reference?  
2. Show that adding integral action increases system type by one.  
3. Derive the condition on Kd that keeps all closed-loop poles in the left half-plane for a given second-order plant.  
4. In discrete time, write the backward-Euler version of the integral term and state its stability consequence.  
5. A PID controller is applied to an open-loop unstable plant; list the two extra conditions (beyond the three gains being positive) that are now required for closed-loop stability.