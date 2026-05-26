## 1. The one-sentence answer
**An RC circuit is a series combination of resistance and capacitance whose currents and voltages evolve exponentially toward steady state with a single characteristic time τ = RC.**

A capacitor stores charge on its plates. When connected to a resistor and a voltage source, charge cannot appear or vanish instantly because the resistor limits the flow. The instantaneous current therefore depends on the voltage still present across the capacitor, producing a differential equation whose solution is an exponential.

The same exponential governs both charging (capacitor voltage rising toward the supply) and discharging (capacitor voltage falling toward zero). The product RC sets the speed of that exponential; after one RC interval the circuit has completed 63 % of its total change.

> [!NOTE]
> The voltage never quite reaches its final value; the approach is asymptotic, yet after five time constants the deviation is smaller than 1 % and is treated as “done” for every engineering purpose.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 avionics power-up sequences use RC timing networks to stagger the enable lines of flight computers, ensuring that each rail stabilizes before the next is switched. The time constant is deliberately set near 50 ms so that the 28 V bus reaches 99 % of final voltage before the next stage is commanded.

Semiconductor foundries rely on RC delay extraction in every static-timing run; a 7 nm standard-cell library quotes effective τ values for every net so that clock skew remains below 3 ps across a 400 mm² die. TSMC’s 2023 N3E process design kit lists these extracted constants as hard constraints for sign-off.

High-energy physics experiments at CERN use RC integrators in the front-end ASICs of the ATLAS liquid-argon calorimeters; the 25 ns LHC bunch-crossing interval is matched to an RC time constant of 15 ns, converting fast charge pulses into shaped waveforms whose peak amplitude encodes deposited energy.

Lithium-ion battery management systems in electric aircraft (e.g., magniX magni350) employ RC equivalent-circuit models to estimate state-of-charge; a single parallel RC branch with τ ≈ 120 s reproduces the diffusion tail observed in 10 C pulsed discharge data.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Kirchhoff’s voltage law  | Writes the loop equation that becomes the governing ODE   |
| Definition of capacitance| Relates stored charge Q to voltage V_C via C = Q/V_C      |
| Ohm’s law                | Gives instantaneous current I = V_R / R                   |
| Derivative of exponential| Recognizes that d(e^{kt})/dt = k e^{kt} solves the ODE    |

## 4. Building the idea — from intuition to formalism

### Step 1 — Charge cannot jump
A capacitor’s voltage is proportional to the charge already on its plates. Adding or removing charge requires current through the resistor, so voltage changes continuously.

Concrete example: a 1 µF capacitor at 0 V is suddenly placed across a 10 V source through 1 kΩ. At the first instant the voltage across the capacitor is still zero.

Formal statement:  
$$V_C(t=0^+)=V_C(0^-).$$

> [!WARNING]
> Treating V_C as discontinuous at t = 0 produces an infinite current and violates energy conservation.

### Step 2 — Write the loop equation
Apply KVL around the series loop containing battery V, resistor R, and capacitor C. The sum of voltage drops is zero at every instant.

Formal statement:  
$$V - IR - V_C = 0.$$

### Step 3 — Express current as rate of change of capacitor voltage
Current is the only path for charge: I = C dV_C/dt. Substitute into the loop equation.

Formal statement:  
$$V - RC\frac{dV_C}{dt} - V_C = 0.$$

### Step 4 — Rearrange into standard first-order form
Collect terms to obtain the canonical linear ODE:  
$$\frac{dV_C}{dt} + \frac{1}{RC}V_C = \frac{V}{RC}.$$

### Step 5 — Solve the homogeneous equation first
The homogeneous solution is V_C,h = A e^{-t/RC}. The exponent must carry the dimension of inverse time; therefore the coefficient 1/RC is identified as the reciprocal of the time constant τ ≡ RC.

### Step 6 — Find a particular solution and apply initial condition
A constant particular solution V_C,p = V satisfies the non-homogeneous equation. The complete solution is therefore V_C(t) = V + A e^{-t/RC}. The initial condition V_C(0) = 0 fixes A = –V, yielding the textbook charging waveform.

### Step 7 — Discharge follows by the same logic
With the source shorted, V = 0 and the initial voltage is V_0, the solution becomes V_C(t) = V_0 e^{-t/RC}.

## 5. Worked examples — every step shown

**Example 1 — Basic charging time constant**  
*Given:* R = 2 kΩ, C = 470 nF, V = 12 V, initial V_C = 0.  
*Find:* V_C at t = 1 ms.  

RC = 2×10^3 × 470×10^{-9} = 0.94 ms.  
Why: product of resistance and capacitance yields the time constant.  
t/τ = 1/0.94 ≈ 1.064.  
Why: normalize time to the natural scale of the exponential.  
V_C = 12(1 – e^{-1.064}) = 12(1 – 0.345) = 7.86 V.  
Why: insert normalized time into the charging formula.  

**7.86 V**

*Reflection:* The only arithmetic trap is forgetting to convert units before multiplying R and C.

**Example 2 — Discharge to a specified fraction**  
*Given:* τ = 3.3 ms, V_0 = 5 V.  
*Find:* time when V_C has fallen to 1 V.  

1 = 5 e^{-t/3.3 ms}.  
Why: apply the discharge solution directly.  
ln(1/5) = –t/3.3 ms.  
Why: isolate the exponent by taking the natural logarithm.  
t = –3.3 ms × ln(0.2) = 5.35 ms.  

**5.35 ms**

*Reflection:* The logarithm converts the exponential decay into a linear relation between time and voltage ratio.

**Example 3 — Two-time-constant settling**  
*Given:* τ = 47 µs.  
*Find:* fraction of final voltage reached after exactly 94 µs.  

t/τ = 2.  
V_C/V = 1 – e^{-2} ≈ 0.8647 (86.5 %).  

**0.8647**

*Reflection:* Two time constants is a convenient mental benchmark; the remaining 13.5 % error is still visible on an oscilloscope.

**Example 4 — Initial current and power**  
*Given:* R = 100 Ω, C = 10 µF, V = 5 V.  
*Find:* initial current and initial power dissipated in R.  

I(0) = V/R = 50 mA.  
Why: at t = 0 the capacitor looks like a short circuit.  
P(0) = I(0)^2 R = 0.25 W.  

**50 mA, 0.25 W**

*Reflection:* Power is maximum at the first instant and then decays exponentially.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                  | How to avoid it                              |
|-----------------------------------|-------------------------------------------------|----------------------------------------------|
| Using τ = 1/RC instead of RC      | Confuses frequency-domain pole location         | Write τ = RC explicitly on every derivation  |
| Treating capacitor voltage as continuous but forgetting i = C dV/dt | Omits the link between current and voltage change | Always substitute I = C dV_C/dt immediately after KVL |
| Assuming steady state at t = 3τ   | 95 % is “close enough” for some contexts only   | Use 5τ for <1 % error unless specification allows otherwise |
| Sign error in discharge equation  | Reverses the direction of current               | Define the polarity of V_C consistently with the loop |
| Neglecting initial condition      | Starts integration from t = –∞                  | Explicitly state V_C(0) before solving       |
| Confusing series and parallel RC  | Parallel combination has different τ            | Verify topology before writing the ODE       |
| Unit mismatch (kΩ·nF vs ms)       | Mixed prefixes produce off-by-1000 errors       | Convert to base SI units before multiplying  |

## 7. The textbook-precise statement
For a series RC circuit driven by a constant voltage V with initial capacitor voltage V_C(0), the capacitor voltage for t ≥ 0 is

$$V_C(t) = V + \bigl(V_C(0)-V\bigr)e^{-t/RC}.$$

The time constant is defined by τ ≡ RC. The current is I(t) = C dV_C/dt. This is the unique solution of the first-order linear ODE obtained from KVL under the constitutive relations V_R = IR and I = C dV_C/dt. (See Nilsson & Riedel, *Electric Circuits*, 11e, §7.2.)

## 8. Visual — diagram or schematic

```text
          +----- R -----+
          |             |
         [V]           [C]
          |             |
          +-------------+
               GND

Charging:   V_C(t) rises from 0 toward V as 1 – e^{-t/RC}
Discharging: V_C(t) falls from V_0 toward 0 as e^{-t/RC}
Axes: horizontal t (units of τ), vertical normalized voltage 0→1
Curve: smooth exponential, slope –1/τ at t = 0, asymptotic to final value
```

## 9. The memory technique

**The hook**  
Picture a capacitor as a bucket and the resistor as a thin straw; the time constant τ is how long it takes the water level to change by 63 % when the straw is the only exit.

**What to overlearn**  
- τ = RC exactly  
- Charging: 1 – e^{-t/τ}  
- Discharging: e^{-t/τ}  
- Five time constants ≈ settled to <1 %

**Spaced-repetition schedule**  
Review the three formulas above at 1 day, 3 days, 7 days, 16 days, and 35 days after first study.

**First-principles fallback**  
Start from KVL, substitute I = C dV_C/dt, rearrange to dV_C/dt + V_C/RC = constant, then solve the linear first-order ODE by separation or integrating factor.

## 10. What this unlocks
Mastery of the RC time constant supplies the language for every subsequent transient circuit: RL circuits, RLC ringing, switched-capacitor filters, and feedback-amplifier compensation.

- Next: RL circuits and the magnetic dual of τ = L/R  
- Next: Series and parallel RLC natural responses  
- Next: Laplace-domain pole placement for control systems  
- Next: Switched-capacitor and sample-and-hold timing analysis

## 11. Self-check — five questions, no answers
1. A 10 kΩ resistor and 0.1 µF capacitor are placed in series across a 5 V step. At what exact time does the capacitor voltage equal 3 V?  
2. Show that the energy dissipated in the resistor during complete charging equals the final stored energy in the capacitor, independent of R.  
3. An oscilloscope probe with 1 MΩ || 15 pF is used to measure a node whose Thevenin resistance is 10 kΩ. By what percentage is the observed 10 %–90 % rise time lengthened?  
4. Why does the initial current in an RC circuit equal V/R even though the capacitor voltage is zero?  
5. A student claims that after exactly one time constant the capacitor is “half charged.” Identify the precise numerical error and the conceptual mistake that produced it.