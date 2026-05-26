## 1. The one-sentence answer
**An RL circuit is a series combination of resistor R and inductor L driven by a DC source, where current grows exponentially toward its steady value with time constant τ = L/R and decays exponentially to zero when the source is removed.**

Inductor opposes sudden change in current because of the back emf V_L = -L di/dt. When the switch closes, voltage across resistor and inductor together equals the battery voltage, producing the first-order differential equation L di/dt + R i = V. Solution shows current starting from zero and approaching V/R asymptotically.

When the battery is disconnected and circuit is shorted through R, stored magnetic energy dissipates in the resistor and current falls as e^{-(R/L)t}. The same time constant governs both processes.

> [!NOTE]
> The single most important insight is that the inductor stores energy in its magnetic field (½ L I²) and releases it gradually; the exponential behaviour is the direct mathematical consequence of energy dissipation being proportional to instantaneous current squared.

## 2. Why this matters — concrete and current
In reusable rocket engines such as SpaceX Merlin, electromagnetic valves controlling fuel flow use RL drive circuits; the known L/R time constant lets engineers predict valve opening delay to millisecond precision and schedule ignition timing.

Satellite reaction wheels and control-moment gyros employ brushless DC motors whose phase windings form RL loads; current rise-time directly limits attitude-control bandwidth, which is why torque-ripple compensation algorithms incorporate the exact exponential solution derived here.

Semiconductor test equipment from companies such as Teradyne uses RL snubber networks across relay contacts; accurate modelling of current decay prevents arcing and extends relay life beyond 10^9 operations.

Particle-accelerator beam-steering magnets at CERN are large RL loads; the growth transient determines how quickly the field can be ramped without quenching the superconducting coils.

Power-electronics gate drivers for IGBTs in electric-vehicle inverters contain parasitic inductance; the resulting RL transient sets the minimum dead-time needed to avoid shoot-through, a parameter fixed in firmware after the exponential analysis.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Kirchhoff’s voltage law | Gives the loop equation L di/dt + Ri = V that must be solved |
| Derivative and exponential function | The solution of the first-order linear DE is exponential  |
| Energy stored in inductor | Explains why current cannot jump discontinuously          |
| Steady-state DC circuit behaviour | Tells us the final value i(∞) = V/R after transients die  |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Write the circuit equation from KVL
When the switch closes at t = 0, battery voltage V appears across R and L in series. Voltage drop across inductor is L di/dt, so the loop equation is L di/dt + R i = V.  
Concrete example: L = 2 H, R = 4 Ω, V = 12 V gives 2 di/dt + 4i = 12.  
Formal statement:  
$$L\frac{di}{dt}+Ri=V.$$  
> [!WARNING]  
> Forgetting the sign of the inductor voltage (it opposes the increase) produces an unstable growing exponential instead of the bounded solution.

### Step 2 — Rearrange into standard first-order linear form
Divide by L:  
$$\frac{di}{dt}+\frac{R}{L}i=\frac{V}{L}.$$  
This is now in the canonical shape di/dt + P i = Q with constant coefficients.

### Step 3 — Solve the homogeneous equation first
Set right-hand side to zero: di/dt + (R/L)i = 0.  
Separation of variables yields i(t) = A e^{-(R/L)t}.  
The homogeneous solution always decays.

### Step 4 — Find one particular solution for the non-homogeneous equation
After long time, di/dt = 0, so i_p = V/R (constant).  
This is the steady-state current.

### Step 5 — Form the complete solution and apply initial condition
General solution: i(t) = A e^{-(R/L)t} + V/R.  
At t = 0, i(0) = 0 (inductor current cannot jump), therefore A = -V/R.  
Final expression:  
$$i(t)=\frac{V}{R}(1-e^{-(R/L)t}).$$

### Step 6 — Repeat for decay phase
When battery is removed at t = t_0 and terminals shorted through R, the equation becomes L di/dt + R i = 0.  
Solution with i(t_0) = I_0 is  
$$i(t)=I_0e^{-(R/L)(t-t_0)}.$$  
Textbook-grade statement reached.

## 5. Worked examples — har step show karo

**Example 1 — Simple growth calculation**  
*Given:* L = 4 H, R = 2 Ω, V = 10 V, switch closes at t = 0.  
*Find:* i(3 s).  
Step 1: τ = L/R = 2 s.  
Step 2: i(t) = (10/2)(1 - e^{-t/2}) = 5(1 - e^{-1.5}).  
Step 3: e^{-1.5} ≈ 0.2231.  
*Why* each line: first computes time constant, second substitutes into growth formula, third evaluates the exponential numerically.  
**5(1 - 0.2231) = 3.8845 A**

*Reflection:* The numbers are small so arithmetic stays transparent; the same algebra scales to any values.

**Example 2 — Find time to reach 90 % of final current**  
*Given:* Same circuit as Example 1.  
*Find:* t such that i(t) = 0.9 × 5 A.  
5(1 - e^{-t/2}) = 4.5 → e^{-t/2} = 0.1 → -t/2 = ln(0.1) → t = 4.605 s.  
*Why* the logarithm appears: we invert the exponential to solve for time.  
**t ≈ 4.61 s**

*Reflection:* Shows how to extract time from a given fraction of steady-state value.

**Example 3 — Decay after steady state**  
*Given:* Circuit reaches steady state, then at t = 5 s battery is replaced by short.  
*Find:* i(7 s).  
I_0 = 5 A, τ = 2 s, elapsed time after removal = 2 s.  
i = 5 e^{-2/2} = 5 e^{-1} ≈ 1.839 A.  
**1.839 A**

*Reflection:* Confirms that decay uses the identical time constant.

**Example 4 — Energy dissipated during decay**  
*Given:* Same numbers, compute total energy dissipated in R from t = 5 s onward.  
Energy = ∫_5^∞ I_0² R e^{-2(t-5)/τ} dt = (½) L I_0² = ½ × 4 × 25 = 50 J.  
*Why* integral equals initial magnetic energy: all stored energy eventually appears as Joule heat.  
**50 J**

*Reflection:* Links electrical transient to energy conservation.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using i(0) = V/R at t = 0+        | Confusing steady-state with initial value   | Always remember inductor current is continuous |
| Writing e^{+t/τ} instead of e^{-t/τ} | Sign error in exponent when separating variables | Check that current must decrease, exponent must be negative |
| Treating τ = R/L                  | Inverting the ratio                         | Memorise τ = L/R from dimensional analysis   |
| Forgetting units of τ (seconds)   | Treating L and R as pure numbers            | Keep SI units explicit in every calculation  |
| Applying growth formula to decay phase | Not resetting the differential equation when topology changes | Write new KVL equation after switch action   |
| Ignoring internal resistance of inductor | Real coils have series resistance           | Add r_internal to R before computing τ       |

## 7. The textbook-precise statement
In an RL series circuit containing inductance L and resistance R, with constant voltage source V applied for t ≥ 0 and initial current i(0) = 0, the current is given by  
$$i(t)=\frac{V}{R}\left(1-e^{-(R/L)t}\right),\qquad t\geq0.$$  
When the source is removed at t = t_1 and the circuit is closed through R only, with i(t_1) = I_0, the current for t ≥ t_1 becomes  
$$i(t)=I_0e^{-(R/L)(t-t_1)}.$$  
Both expressions assume ideal lumped elements, constant temperature, and neglect parasitic capacitance. (Nilsson & Riedel, *Electric Circuits*, 11e, §7.4).

## 8. Visual — diagram or schematic
```
          +----- R -----+
          |             |
         [ ]           [ ]
         [ ] L         [ ]  switch
         [ ]           [ ]
          |             |
         GND           V
```
Current vs time sketch (ASCII):
```
i(t)
^          ___________
|         /
|        /
|       /
|      /
|     /
|    /
|   /
|  /
| /
0+------------------> t
   0   τ   2τ   3τ
```
Growth curve starts at origin, reaches 63 % at τ, 86 % at 2τ, asymptote V/R. Decay curve starts at I_0 and falls to 37 % after one τ.

## 9. The memory technique

1. **The hook** — Picture an inductor as a heavy flywheel: voltage is torque, current is angular speed; it takes time to spin up or slow down, exactly the exponential lag.
2. **What to overlearn** — τ = L/R; i_growth = (V/R)(1 - e^{-t/τ}); i_decay = I_0 e^{-t/τ}.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If formula forgotten, return to KVL, separate variables in di/(V - Ri) = dt/L, integrate both sides to recover the exponential.

## 10. What this unlocks
Mastery of RL transients is the direct gateway to RLC circuits, where the second-order differential equation appears and oscillatory behaviour emerges. It also underpins switched-mode power supplies, motor-control PWM analysis, and electromagnetic interference filter design.

- Next topics: LC oscillation, under-damped RLC response, Laplace-transform treatment of circuits.
- Techniques unlocked: phasor analysis for AC steady state, Bode plots of RL filters, state-space modelling of higher-order networks.

## 11. Self-check — five questions, no answers
1. In an RL circuit with τ = 5 ms, how long after switch closure does current reach 99 % of final value?  
2. An inductor of 3 H carries 4 A when suddenly shorted through 6 Ω; write the expression for i(t) and compute stored energy at t = 0.  
3. Why does the voltage across the inductor at t = 0+ equal the full battery voltage, while resistor voltage is zero?  
4. A student writes i(t) = (V/R) e^{-t/τ} for the growth phase; identify the conceptual error and its physical consequence.  
5. Two RL circuits have identical τ but different L and R; which one dissipates more total energy during decay from the same initial current, and why?