## What it is
An RL circuit consists of a resistor ($R$) and an inductor ($L$) connected in series to a voltage source. We study it to understand how the current behaves over time when a voltage is suddenly applied or removed. Due to the inductor's property of opposing changes in current, the current does not change instantaneously but instead follows a predictable exponential curve, either growing towards a maximum value or decaying towards zero.

## Why it matters
This is not just a textbook exercise; it's the foundation of power electronics and signal processing. In aerospace, RL circuits model the behavior of electric motors, power converters that regulate voltage for avionics, and ignition systems. In computing, they are fundamental to the design of switching power supplies that power every component, and understanding their transient response is critical for stable operation.

## When to study it
Before tackling this, you must have a firm grasp of the following. If any of these are weak, review them first.
*   **Kirchhoff's Voltage Law (KVL):** The sum of voltage drops around any closed loop is zero.
*   **Ohm's Law:** $V_R = IR$.
*   **Inductor behavior:** The voltage across an inductor is proportional to the rate of change of current through it, $V_L = L \frac{dI}{dt}$.
*   **Calculus:** Solving first-order linear ordinary differential equations (ODEs), specifically using the method of separation of variables.

## How to study it (step by step)
1.  **Derive the Growth Equation:** Draw a series RL circuit with a switch, resistor, inductor, and a DC voltage source $\mathcal{E}$. At time $t=0$, the switch closes. Apply KVL to the loop to write down the governing differential equation.
2.  **Solve the Growth ODE:** Solve the equation from step 1 for the current $I(t)$, using the initial condition that the current is zero at the moment the switch is closed, i.e., $I(0)=0$.
3.  **Define and Analyze the Time Constant:** From your solution, identify the term $\tau = L/R$, the inductive time constant. Analyze its meaning: how does a large $L$ or a small $R$ affect how quickly the current reaches its final value? Sketch the graph of $I(t)$ vs. $t$.
4.  **Derive the Decay Equation:** Draw the circuit for the decay phase. This typically involves the inductor and resistor being left in a closed loop after the voltage source is removed. Apply KVL to this new loop.
5.  **Solve the Decay ODE:** Solve the new differential equation from step 4. The initial condition is now $I(0) = I_0$, where $I_0$ is the steady-state current from the growth phase.
6.  **Contrast Growth and Decay:** Place the graphs for current growth and decay side-by-side. Note the shared time constant $\tau$ but the inverted exponential shape. Understand physically why one is an approach to a maximum and the other is a decay to zero.
7.  **Problem Solving:** Work through problems where a switch is in one position for a long time (implying steady state) and then flipped. Calculate the current at various times during both the growth and decay phases.

## Key ideas, with intuition
1.  **Inductors have inertia.** Think of an inductor as a heavy flywheel. It resists changes in its state of motion (current). You can't instantly spin it up to full speed; it takes time. Likewise, you can't instantly stop it; it will continue to coast. This "inertial" property is its inductance, $L$.
2.  **The Back EMF is the source of resistance to change.** When you try to increase the current, the inductor generates a voltage that opposes your effort: $V_L = L \frac{dI}{dt}$. This is called back EMF. At the very first instant ($t=0^+$) of closing the switch, the current tries to jump from 0 to some value, making $\frac{dI}{dt}$ very large. The inductor generates a back EMF equal and opposite to the source voltage, so the initial current is zero. As time passes, the current changes more slowly, the back EMF weakens, and more voltage is dropped across the resistor, allowing the current to rise.
3.  **The time constant $\tau = L/R$ sets the timescale.** This value tells you how "sluggish" the circuit is. A large inductance $L$ (heavy flywheel) or a small resistance $R$ (less friction) leads to a long time constant. It takes longer for the current to change. After one time constant, $t=\tau$, the current has completed $(1 - 1/e) \approx 63.2\%$ of its total change (either growth or decay).
4.  **Energy is stored in the magnetic field.** During current growth, the power source does work not just to dissipate heat in the resistor, but also to build up a magnetic field in the inductor. The energy stored is $U_B = \frac{1}{2}LI^2$. During decay, this stored energy is the *only* thing powering the circuit, and it gets dissipated as heat in the resistor until the current and the field collapse to zero.

## Worked example
A circuit contains a $12 \text{ V}$ battery, a switch, a $3.0 \text{ H}$ inductor, and a $6.0 \ \Omega$ resistor in series. The switch is closed at $t=0$.

**(a) What is the current at $t=1.0 \text{ s}$?**
**(b) After a very long time, the switch is moved, disconnecting the battery and leaving the inductor and resistor in a closed loop. How long does it take for the current to decay to $1.0\%$ of its initial value?**

**Solution:**

**Part (a): Current Growth**

1.  **Apply KVL:** When the switch is closed, KVL for the loop gives:
    $$ \mathcal{E} - V_R - V_L = 0 $$
    $$ \mathcal{E} - IR - L\frac{dI}{dt} = 0 $$
2.  **Solve the ODE:** This is the governing equation for current growth. The standard solution, which you should derive as practice, is:
    $$ I(t) = \frac{\mathcal{E}}{R}(1 - e^{-t/\tau}) $$
3.  **Calculate constants:**
    *   The maximum current is $I_{max} = \frac{\mathcal{E}}{R} = \frac{12 \text{ V}}{6.0 \ \Omega} = 2.0 \text{ A}$.
    *   The time constant is $\tau = \frac{L}{R} = \frac{3.0 \text{ H}}{6.0 \ \Omega} = 0.5 \text{ s}$.
4.  **Find the current at $t=1.0 \text{ s}$:**
    $$ I(1.0) = (2.0 \text{ A})(1 - e^{-1.0 \text{ s} / 0.5 \text{ s}}) = (2.0 \text{ A})(1 - e^{-2}) $$
    $$ I(1.0) \approx (2.0 \text{ A})(1 - 0.1353) = (2.0 \text{ A})(0.8647) \approx 1.73 \text{ A} $$

**Part (b): Current Decay**

1.  **Initial condition:** "After a very long time" means the current has reached its steady-state maximum value, so the initial current for the decay phase is $I_0 = I_{max} = 2.0 \text{ A}$.
2.  **Apply KVL:** For the new loop with just the resistor and inductor, KVL gives:
    $$ -V_R - V_L = 0 \implies -IR - L\frac{dI}{dt} = 0 $$
3.  **Solve the ODE:** The standard solution for current decay is:
    $$ I(t) = I_0 e^{-t/\tau} $$
4.  **Solve for time $t$:** We want the time when the current is $1.0\%$ of its initial value, so $I(t) = 0.01 \times I_0$.
    $$ 0.01 \times I_0 = I_0 e^{-t/\tau} $$
    $$ 0.01 = e^{-t/0.5} $$
    Take the natural logarithm of both sides:
    $$ \ln(0.01) = -\frac{t}{0.5 \text{ s}} $$
    $$ t = -0.5 \text{ s} \times \ln(0.01) \approx -0.5 \text{ s} \times (-4.605) \approx 2.30 \text{ s} $$

**Reflection:** Each step builds on the last. We start with the fundamental law (KVL), which gives us a differential equation. Solving this equation with the correct initial conditions gives us the formula for current over time. The rest is algebraic manipulation and calculation.

## Diagrams

**Growth Phase:** At $t=0$, the switch S moves from position `a` to `b`.

```text
       a
      /
---S--b------R (Resistor)-------+
|    \                         |
|     |                        |
E     |                        L (Inductor)
|     |                        |
|     |                        |
+------------------------------+
```

**Decay Phase:** After a long time, the switch S moves from `b` to `a`, removing the battery `E`.

```text
       a-----------------R (Resistor)-------+
      /                                    |
---S--b                                    |
     \                                     |
      |                                    L (Inductor)
E     |                                    |
      |                                    |
+------------------------------------------+
```

## Memory technique — remember this forever
1.  **The Story:** The inductor is a "stubborn mule" that hates change. When the farmer ($\mathcal{E}$) tries to pull it forward (current growth), the mule digs its heels in, resisting strongly at first, then gradually gets up to speed. When the farmer lets go of the rope (current decay), the mule's inertia keeps it stumbling forward for a while before it finally stops. The resistor is the "muddy field" that provides the friction to slow it down in both cases.
2.  **Overlearn these formulas:**
    *   Time Constant: $\tau = L/R$
    *   Growth (approaching a max): $I(t) = I_{max}(1 - e^{-t/\tau})$
    *   Decay (from an initial value): $I(t) = I_0 e^{-t/\tau}$
3.  **Spaced Repetition Schedule:** Review your derivations and these formulas at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Do not just read them. Re-derive them from KVL.
4.  **First Principles Pathway:** If you forget everything, remember **Kirchhoff's Voltage Law**.
    *   For growth: $\mathcal{E} - IR - L\frac{dI}{dt} = 0$.
    *   For decay: $-IR - L\frac{dI}{dt} = 0$.
    These are simple, separable first-order ODEs. You can solve them in two minutes on an exam and rebuild the formulas from scratch.

## Common mistakes
*   **Mixing up growth and decay formulas:** Using the simple exponential decay formula for a growth situation. Remember: growth must start at 0 and approach a maximum, so it needs the `(1 - ...)` term. Decay starts at a maximum and goes to 0.
*   **Incorrect time constant:** Using $\tau=RC$ (for capacitors) instead of $\tau=L/R$. Remember that a large resistor *slows down* capacitor charging (large $\tau$) but *speeds up* inductor current decay (small $\tau$).
*   **Wrong initial condition for decay:** Assuming $I(0)=0$ for decay. The decay phase can only begin if there is already current flowing, so $I(0)$ must be some non-zero value $I_0$.
*   **Sign errors in KVL:** Be meticulous with your signs when setting up the initial KVL equation. The voltage drop across a resistor is $IR$, and the inductor's back EMF $L\frac{dI}{dt}$ opposes the change.

## Self-check
1.  An RL circuit has $L = 50 \text{ mH}$ and $R = 10 \ \Omega$. It is connected to a $20 \text{ V}$ source at $t=0$. What is the rate of change of the current, $\frac{dI}{dt}$, at the exact moment the switch is closed ($t=0^+$)?
2.  Consider two RL circuits. Circuit A has components $L$ and $R$. Circuit B has components $2L$ and $R/2$. Which circuit reaches 50% of its maximum current faster? Explain your reasoning without calculating the exact time.
3.  A circuit with $L=2\text{ H}$ and $R=10 \ \Omega$ is connected to a $100\text{ V}$ battery. The switch is closed for 0.4 seconds, then opened, instantly disconnecting the battery and leaving the L and R in a closed loop. What is the current in the circuit 0.2 seconds *after* the switch is opened?