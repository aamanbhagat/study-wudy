## 1. What it is — in plain English

Imagine a river where the water flow can change. Now, imagine a giant, heavy waterwheel placed in that river. This waterwheel has a lot of inertia – it's hard to get it spinning quickly, and once it's spinning, it's hard to stop it quickly. It "resists" any sudden change in the water flow.

An RL circuit is like that river system, but for electricity. It's simply a resistor (R) and an inductor (L) connected together. The resistor is like a narrow section of the river, restricting the flow of current. The inductor is like our heavy waterwheel; it's a component that resists sudden changes in the *flow of electrical current*.

When you first turn on the power in an RL circuit, the inductor acts like a stubborn gate, preventing the current from instantly reaching its full strength. The current grows gradually, like a heavy waterwheel slowly speeding up. Similarly, if you suddenly turn off the power, the inductor tries to keep the current flowing for a while, causing it to decay gradually rather than stopping instantly.

So, an RL circuit describes how current "ramps up" or "ramps down" in a predictable way when an inductor is present. It's all about how these two components, the resistor and the inductor, interact to control the timing of current changes.

## 2. Why it matters — real-world applications

The transient behavior of RL circuits (how current changes over time) is fundamental to countless electronic and electrical systems. Understanding it is critical for designing reliable and efficient devices.

1.  **Switching Power Supplies (SMPS):** Modern electronics, from your phone charger to spacecraft power systems, use SMPS to efficiently convert one DC voltage to another (e.g., step down 12V to 5V). Inductors are core components in these "buck" and "boost" converters. The RL characteristics dictate how quickly the current builds up in the inductor, which directly affects the efficiency and stability of the power conversion.
2.  **Ignition Systems in Internal Combustion Engines:** In a car's ignition system, a coil (which is an inductor) is used to generate a very high voltage (tens of thousands of volts) from the car's 12V battery. When the current through the coil is suddenly interrupted, the inductor's opposition to change creates a massive voltage spike, which is then used to create a spark across the spark plug, igniting the fuel-air mixture. The RL circuit behavior is precisely what makes this possible.
3.  **Electromechanical Relays and Solenoids:** These devices use an electromagnet (an inductor) to create a magnetic field that operates a mechanical switch or plunger. When power is applied, the current in the inductor builds up, generating the magnetic force. When power is removed, the current decays. The speed of operation and the "hold" time are governed by the RL characteristics. This is crucial in industrial control, aerospace (e.g., landing gear actuation), and even simple door locks.
4.  **Signal Filtering:** RL circuits can act as basic filters. For instance, a series RL circuit can be used as a low-pass filter, allowing low-frequency signals to pass through while attenuating high-frequency signals. This is important in audio equipment, radio frequency circuits, and preventing unwanted noise in sensitive electronics.
5.  **Aerospace Actuator Control:** In aerospace, precise control of actuators (like those for flight surfaces or robotic arms) often involves electromagnets or motors. The response time and smooth operation of these systems are directly influenced by the RL characteristics of their windings. Understanding the growth and decay of current ensures that control signals translate into predictable mechanical actions without overshoots or delays.

## 3. Prerequisites — what you must know first

Before diving deep into RL circuits, ensure you have a solid grasp of these foundational concepts:

*   **Ohm's Law:** The relationship between voltage ($V$), current ($I$), and resistance ($R$) in a resistor: $V = IR$.
*   **Kirchhoff's Voltage Law (KVL):** The algebraic sum of all voltages around any closed loop in a circuit is zero. This is a statement of conservation of energy.
*   **Basic Calculus - Derivatives:** Understanding what a derivative ($d/dt$) represents – the instantaneous rate of change of a quantity with respect to time. This is crucial for understanding inductor behavior.
*   **Basic Calculus - Integration:** Understanding integration as the process of summing up small changes over time, or finding the area under a curve. This is used to solve the differential equations that describe RL circuits.
*   **Basic Calculus - Differential Equations:** Familiarity with first-order linear differential equations, as the governing equations for RL circuits fall into this category. You should at least understand the concept of solving for a function given its rate of change.
*   **Inductors:** What an inductor is, how it stores energy in a magnetic field, and its fundamental voltage-current relationship: $V_L = L \frac{dI}{dt}$, where $L$ is inductance. Understanding Lenz's Law (inductors oppose changes in current) is also key.
*   **Resistors:** Their basic function of opposing current flow and dissipating energy as heat.
*   **DC Circuits (Steady-State):** How to analyze circuits with constant voltage sources after all transients (temporary changes) have settled down. For an inductor, in steady-state DC, it acts like a short circuit (zero resistance).

## 4. The core idea — step by step

Let's break down the behavior of an RL circuit, building from the fundamental principles.

### Step 1: The Inductor's Nature – Opposing Change

*   **Plain English:** An inductor is like a "current flywheel." It resists any attempt to change the current flowing through it. If you try to increase the current quickly, it pushes back. If you try to decrease it quickly, it tries to keep it flowing. It's "lazy" when it comes to current changes.
*   **Small concrete example:** Imagine trying to instantly start a very heavy train. It takes a huge force and some time to get it moving. Similarly, trying to instantly establish a current in a large inductor requires an infinite voltage, which is impossible.
*   **Formal/Mathematical version:** The voltage across an inductor ($V_L$) is directly proportional to the rate of change of current ($dI/dt$) through it, and the constant of proportionality is its inductance ($L$).
    $$V_L = L \frac{dI}{dt}$$
    The unit of inductance $L$ is the Henry (H). If current changes at 1 Ampere per second ($1 \text{ A/s}$) and produces 1 Volt across the inductor, its inductance is 1 Henry.
*   **What could go wrong:** Students often forget that $V_L$ is about the *rate of change* of current, not the current itself. A large current through an inductor can still have zero voltage across it if the current is constant (DC steady state). Conversely, a small current changing rapidly can produce a large voltage.

### Step 2: Setting up the RL Circuit for Current Growth

*   **Plain English:** We're going to connect a resistor and an inductor in series to a constant voltage source (like a battery). When we flip a switch, current will start to flow, but the inductor will fight against it initially.
*   **Small concrete example:** Imagine a simple circuit with a battery, a light bulb (resistor), and a large electromagnet (inductor) all in a line. When you flip the switch, the light bulb won't instantly glow at full brightness; it will gradually brighten as the current builds up in the electromagnet.
*   **Formal/Mathematical version:** Consider a series RL circuit connected to a DC voltage source $V_S$ at time $t=0$ via a switch.
    ```text
    V_S ---- R ---- L ----
           |       |      |
           +       +      +
           -       -      -
           |       |      |
           ------------- Switch ----
    ```
    Applying Kirchhoff's Voltage Law (KVL) around the loop:
    $$V_S - V_R - V_L = 0$$
    Substitute Ohm's Law for the resistor ($V_R = IR$) and the inductor voltage equation ($V_L = L \frac{dI}{dt}$):
    $$V_S - IR - L \frac{dI}{dt} = 0$$
    Rearranging this gives us a first-order linear differential equation:
    $$L \frac{dI}{dt} + RI = V_S$$
*   **What could go wrong:** Incorrectly applying KVL signs (e.g., writing $V_S + V_R + V_L = 0$). Remember to follow a consistent direction around the loop and assign signs based on voltage drops/rises. Also, confusing the independent variable (time $t$) with the dependent variable (current $I$).

### Step 3: Solving the Differential Equation for Current Growth

*   **Plain English:** We need to find a function $I(t)$ that satisfies the differential equation we just wrote. This function will tell us how the current changes over time after the switch is closed.
*   **Small concrete example:** If we know the battery voltage, resistance, and inductance, we can predict exactly how bright our light bulb will be at any given moment after we flip the switch.
*   **Formal/Mathematical version:** The differential equation $L \frac{dI}{dt} + RI = V_S$ can be solved using standard techniques for first-order linear differential equations (e.g., integrating factor or separation of variables).
    The general solution for $I(t)$ for $t \ge 0$ (assuming $I(0) = 0$, i.e., no current initially) is:
    $$I(t) = \frac{V_S}{R} (1 - e^{-(R/L)t})$$
    Let's break this down:
    *   $\frac{V_S}{R}$ is the steady-state current ($I_{max}$ or $I_{final}$). This is the current that would flow if the inductor were just a wire (short circuit) after a long time.
    *   $e^{-(R/L)t}$ is an exponential decay term. As $t$ increases, this term approaches zero.
    *   The $(1 - e^{-(R/L)t})$ term means the current starts at zero (since $e^0 = 1$, so $1-1=0$) and gradually rises towards $\frac{V_S}{R}$.
*   **What could go wrong:** Algebraic errors during the integration process. Forgetting the initial condition ($I(0)=0$) which is used to determine the constant of integration. Confusing the final steady-state current with the instantaneous current.

### Step 4: The Time Constant ($\tau$)

*   **Plain English:** The time constant is a special value that tells us how "fast" or "slow" the current changes in an RL circuit. It's like a characteristic speed for the circuit's response. A small time constant means the current changes quickly; a large one means it changes slowly.
*   **Small concrete example:** If one RL circuit has a time constant of 1 microsecond and another has 1 second, the first one will reach its steady state much, much faster. It's like comparing a lightweight sports car (small $\tau$) to a heavy truck (large $\tau$) in terms of acceleration.
*   **Formal/Mathematical version:** The term $R/L$ appears in the exponent. To simplify, we define the time constant $\tau$ (tau) as:
    $$\tau = \frac{L}{R}$$
    The unit of $\tau$ is seconds. With this, the current growth equation becomes:
    $$I(t) = \frac{V_S}{R} (1 - e^{-t/\tau})$$
    After one time constant ($t = \tau$), the current reaches approximately 63.2% of its final value ($1 - e^{-1} \approx 0.632$). After about $5\tau$, the current is considered to have reached its steady-state value (over 99% of $I_{max}$).
*   **What could go wrong:** Confusing the time constant for an RL circuit ($\tau = L/R$) with that of an RC circuit ($\tau = RC$). Also, misinterpreting what 63.2% means – it's the *change* toward the final value, not necessarily 63.2% of the initial value.

### Step 5: Current Decay in an RL Circuit

*   **Plain English:** What happens if we remove the voltage source (e.g., short the resistor and inductor together) after the current has reached its maximum? The inductor will try to keep the current flowing, but the resistor will dissipate the energy as heat, causing the current to gradually die down.
*   **Small concrete example:** If you've charged up our electromagnet and then disconnect it from the battery and connect its terminals directly together, the magnetic field won't instantly disappear. It will collapse gradually, inducing a current that flows through the resistor, slowly dissipating the stored energy.
*   **Formal/Mathematical version:** Assume the circuit has been in steady-state with current $I_0 = V_S/R$ for $t<0$. At $t=0$, the voltage source is removed (or shorted out). The KVL equation becomes:
    $$V_R + V_L = 0$$
    $$IR + L \frac{dI}{dt} = 0$$
    $$L \frac{dI}{dt} = -RI$$
    This is a separable differential equation. Solving it with the initial condition $I(0) = I_0$:
    $$I(t) = I_0 e^{-(R/L)t}$$
    Or, using the time constant $\tau = L/R$:
    $$I(t) = I_0 e^{-t/\tau}$$
    Here, $I_0$ is the current flowing at the moment the source was removed (i.e., the initial current for the decay phase). The current exponentially decays from $I_0$ towards zero. After one time constant ($t=\tau$), the current will have decayed to approximately 36.8% of its initial value ($e^{-1} \approx 0.368$).
*   **What could go wrong:** Forgetting to use the *initial current* ($I_0$) at the start of the decay phase. Also, incorrectly assuming the steady-state current of the previous phase is always $V_S/R$ if the circuit configuration changes.

### Step 6: Energy Storage and Dissipation

*   **Plain English:** Inductors store energy in their magnetic fields, just like a spring stores potential energy when compressed. Resistors, on the other hand, dissipate energy as heat. In an RL circuit, during growth, the source provides energy, some stored in the inductor, some dissipated by the resistor. During decay, the energy stored in the inductor is dissipated entirely by the resistor.
*   **Small concrete example:** The "kick" you feel from a large inductor if you suddenly try to disconnect it from a power source is the inductor rapidly dumping its stored magnetic energy, often creating a spark. This energy is then dissipated, usually as heat and light.
*   **Formal/Mathematical version:** The energy stored in an inductor at any given time is:
    $$E_L = \frac{1}{2}LI^2$$
    where $I$ is the instantaneous current through the inductor. The power dissipated by the resistor is:
    $$P_R = I^2R$$
    During current growth, the power delivered by the source ($P_S = V_S I$) is split between the power dissipated by the resistor and the rate of energy storage in the inductor:
    $$V_S I = I^2 R + L I \frac{dI}{dt}$$
    This equation can be derived by multiplying the KVL equation ($V_S - IR - L \frac{dI}{dt} = 0$) by $I$.
*   **What could go wrong:** Confusing energy ($E$, measured in Joules) with power ($P$, measured in Watts). Energy is stored, power is the *rate* at which energy is transferred or dissipated.

## 5. Worked examples — multiple, with every step shown

Let's put these concepts into practice with several examples.

---

### Example 1: Simple Current Growth

**Problem:** A series RL circuit consists of a $10 \Omega$ resistor and a $500 \text{ mH}$ inductor. It is connected to a $12 \text{ V}$ DC voltage source at $t=0$.
a) Determine the time constant of the circuit.
b) Find the current through the circuit at $t = 25 \text{ ms}$.
c) What is the steady-state current?

**What's given:** $R = 10 \Omega$, $L = 500 \text{ mH} = 0.5 \text{ H}$, $V_S = 12 \text{ V}$.
**What we want:** a) $\tau$, b) $I(25 \text{ ms})$, c) $I_{max}$.

**Solution:**

a) **Determine the time constant of the circuit.**

$$ \tau = \frac{L}{R} $$
This is the formula for the time constant of an RL circuit.

$$ \tau = \frac{0.5 \text{ H}}{10 \Omega} $$
Substitute the given values for $L$ and $R$.

$$ \tau = 0.05 \text{ s} $$
Perform the division. The units $\text{H}/\Omega$ simplify to seconds.

$$ \tau = \mathbf{50 \text{ ms}} $$
Convert seconds to milliseconds for clarity.

b) **Find the current through the circuit at $t = 25 \text{ ms}$.**

First, determine the steady-state current ($I_{max}$). This is the current after a very long time, when the inductor acts as a short circuit.
$$ I_{max} = \frac{V_S}{R} $$
This is Ohm's Law applied to the circuit in steady state.

$$ I_{max} = \frac{12 \text{ V}}{10 \Omega} $$
Substitute the voltage source and resistance.

$$ I_{max} = 1.2 \text{ A} $$
Calculate the steady-state current.

Now, use the current growth formula:
$$ I(t) = I_{max} (1 - e^{-t/\tau}) $$
This is the general equation for current growth in a series RL circuit when starting from zero current.

$$ I(25 \text{ ms}) = 1.2 \text{ A} (1 - e^{-(25 \text{ ms}) / (50 \text{ ms})}) $$
Substitute $I_{max}$, the given time $t$, and the calculated time constant $\tau$. Ensure units are consistent (both $t$ and $\tau$ in ms or both in s).

$$ I(25 \text{ ms}) = 1.2 \text{ A} (1 - e^{-0.5}) $$
Simplify the exponent.

$$ I(25 \text{ ms}) = 1.2 \text{ A} (1 - 0.6065) $$
Calculate $e^{-0.5}$.

$$ I(25 \text{ ms}) = 1.2 \text{ A} (0.3935) $$
Perform the subtraction inside the parenthesis.

$$ I(25 \text{ ms}) = \mathbf{0.4722 \text{ A}} $$
Perform the final multiplication.

c) **What is the steady-state current?**

$$ I_{max} = \frac{V_S}{R} $$
As calculated above, the steady-state current is when the inductor acts as a short circuit.

$$ I_{max} = \frac{12 \text{ V}}{10 \Omega} $$
Substitute the given voltage and resistance.

$$ I_{max} = \mathbf{1.2 \text{ A}} $$
Calculate the final current.

**Reflection:** This example was straightforward, focusing on direct application of the formulas for time constant and current growth. The main trick was ensuring consistent units (ms vs. s) and correctly identifying the steady-state current.

---

### Example 2: Current Decay

**Problem:** An RL circuit has a $2 \text{ H}$ inductor and a $4 \Omega$ resistor. The inductor has been carrying a steady current of $5 \text{ A}$ for a long time. At $t=0$, the voltage source is removed, and the inductor and resistor are shorted together.
a) Determine the time constant.
b) Write the equation for the current $I(t)$ for $t \ge 0$.
c) Calculate the current at $t = 1 \text{ s}$.
d) How long does it take for the current to decay to $10\%$ of its initial value?

**What's given:** $L = 2 \text{ H}$, $R = 4 \Omega$, $I_0 = 5 \text{ A}$.
**What we want:** a) $\tau$, b) $I(t)$, c) $I(1 \text{ s})$, d) $t$ when $I(t) = 0.1 I_0$.

**Solution:**

a) **Determine the time constant.**

$$ \tau = \frac{L}{R} $$
This is the formula for the time constant of an RL circuit.

$$ \tau = \frac{2 \text{ H}}{4 \Omega} $$
Substitute the given values for $L$ and $R$.

$$ \tau = \mathbf{0.5 \text{ s}} $$
Perform the division. The units $\text{H}/\Omega$ simplify to seconds.

b) **Write the equation for the current $I(t)$ for $t \ge 0$.**

$$ I(t) = I_0 e^{-t/\tau} $$
This is the general equation for current decay in a series RL circuit.

$$ I(t) = 5 \text{ A} \ e^{-t / 0.5 \text{ s}} $$
Substitute the initial current $I_0$ and the calculated time constant $\tau$.

$$ I(t) = \mathbf{5 e^{-2t} \text{ A}} $$
Simplify the exponent ($1/0.5 = 2$). This is the equation for current decay.

c) **Calculate the current at $t = 1 \text{ s}$.**

$$ I(t) = 5 e^{-2t} $$
Use the decay equation derived in part (b).

$$ I(1 \text{ s}) = 5 e^{-2(1 \text{ s})} $$
Substitute $t = 1 \text{ s}$.

$$ I(1 \text{ s}) = 5 e^{-2} $$
Simplify the exponent.

$$ I(1 \text{ s}) = 5 (0.1353) $$
Calculate $e^{-2}$.

$$ I(1 \text{ s}) = \mathbf{0.6765 \text{ A}} $$
Perform the final multiplication.

d) **How long does it take for the current to decay to $10\%$ of its initial value?**

We want to find $t$ when $I(t) = 0.10 \times I_0$.
$$ I(t) = I_0 e^{-t/\tau} $$
Start with the general decay equation.

$$ 0.10 I_0 = I_0 e^{-t/\tau} $$
Set $I(t)$ to $0.10 I_0$.

$$ 0.10 = e^{-t/\tau} $$
Divide both sides by $I_0$.

$$ \ln(0.10) = \ln(e^{-t/\tau}) $$
Take the natural logarithm of both sides to bring down the exponent.

$$ \ln(0.10) = -t/\tau $$
The natural logarithm and exponential function cancel each other out.

$$ -2.3026 = -t/\tau $$
Calculate $\ln(0.10)$.

$$ 2.3026 = t/\tau $$
Multiply both sides by -1.

$$ t = 2.3026 \times \tau $$
Solve for $t$.

$$ t = 2.3026 \times 0.5 \text{ s} $$
Substitute the calculated time constant $\tau = 0.5 \text{ s}$.

$$ t = \mathbf{1.1513 \text{ s}} $$
Perform the final multiplication.

**Reflection:** This example tested the application of the decay formula and required using logarithms to solve for time. It's important to remember that $I_0$ is the initial current *at the start of the decay phase*.

---

### Example 3: Two-Phase Circuit (Growth then Decay)

**Problem:** Consider the circuit below. The switch S1 has been open for a long time. At $t=0$, S1 closes. At $t=100 \text{ ms}$, S1 opens and S2 closes simultaneously.
$$
\begin{array}{ccc}
\text{V_S} & & \\
10\text{V} & & \\
| & & \\
--- & \text{S1} & --- \\
| & / & | \\
| & & \text{R1} \\
--- & & 20\Omega \\
| & & | \\
| & & \text{L} \\
| & & 1\text{H} \\
| & & | \\
--- & \text{S2} & --- \\
| & / & | \\
| & & \text{R2} \\
| & & 30\Omega \\
| & & | \\
--------------------------
\end{array}
$$
a) Find the current through the inductor at $t=50 \text{ ms}$.
b) Find the current through the inductor at $t=150 \text{ ms}$.

**What's given:** $V_S = 10 \text{ V}$, $R1 = 20 \Omega$, $R2 = 30 \Omega$, $L = 1 \text{ H}$.
**Events:** S1 closes at $t=0$. S1 opens and S2 closes at $t=100 \text{ ms}$.
**What we want:** a) $I_L(50 \text{ ms})$, b) $I_L(150 \text{ ms})$.

**Solution:**

**Phase 1: Current Growth ($0 \le t < 100 \text{ ms}$)**

When S1 closes at $t=0$, the circuit consists of $V_S$, $R1$, and $L$ in series. $R2$ is not in the path.

1.  **Calculate the time constant for Phase 1 ($\tau_1$).**
    $$ \tau_1 = \frac{L}{R1} $$
    The time constant for the growth phase uses $R1$.

    $$ \tau_1 = \frac{1 \text{ H}}{20 \Omega} = 0.05 \text{ s} = 50 \text{ ms} $$
    Substitute values and calculate.

2.  **Calculate the steady-state current for Phase 1 ($I_{max1}$).**
    $$ I_{max1} = \frac{V_S}{R1} $$
    The final current if S1 stayed closed indefinitely.

    $$ I_{max1} = \frac{10 \text{ V}}{20 \Omega} = 0.5 \text{ A} $$
    Substitute values and calculate.

3.  **Write the current growth equation for Phase 1.**
    $$ I_L(t) = I_{max1} (1 - e^{-t/\tau_1}) $$
    General growth equation.

    $$ I_L(t) = 0.5 (1 - e^{-t / 50 \text{ ms}}) \text{ A} \quad \text{for } 0 \le t < 100 \text{ ms} $$
    Substitute $I_{max1}$ and $\tau_1$.

a) **Find the current through the inductor at $t=50 \text{ ms}$.**

    $$ I_L(50 \text{ ms}) = 0.5 (1 - e^{-50 \text{ ms} / 50 \text{ ms}}) $$
    Substitute $t = 50 \text{ ms}$ into the Phase 1 equation.

    $$ I_L(50 \text{ ms}) = 0.5 (1 - e^{-1}) $$
    Simplify the exponent.

    $$ I_L(50 \text{ ms}) = 0.5 (1 - 0.3679) $$
    Calculate $e^{-1}$.

    $$ I_L(50 \text{ ms}) = 0.5 (0.6321) = \mathbf{0.316 \text{ A}} $$
    Perform the final calculation.

**Phase 2: Current Decay ($t \ge 100 \text{ ms}$)**

At $t=100 \text{ ms}$, S1 opens and S2 closes. The voltage source is now disconnected, and the inductor $L$ is in series with $R1$ and $R2$. The current will decay.

1.  **Find the initial current for Phase 2 ($I_0$).** This is the current at the moment the switch changes, i.e., at $t=100 \text{ ms}$.
    $$ I_0 = I_L(100 \text{ ms}) = 0.5 (1 - e^{-100 \text{ ms} / 50 \text{ ms}}) $$
    Use the Phase 1 growth equation with $t=100 \text{ ms}$.

    $$ I_0 = 0.5 (1 - e^{-2}) $$
    Simplify the exponent.

    $$ I_0 = 0.5 (1 - 0.1353) $$
    Calculate $e^{-2}$.

    $$ I_0 = 0.5 (0.8647) = 0.43235 \text{ A} $$
    This is the starting current for the decay phase.

2.  **Calculate the time constant for Phase 2 ($\tau_2$).**
    Now both $R1$ and $R2$ are in series with $L$.
    $$ \tau_2 = \frac{L}{R1 + R2} $$
    The total resistance in the decay loop is $R1+R2$.

    $$ \tau_2 = \frac{1 \text{ H}}{20 \Omega + 30 \Omega} = \frac{1 \text{ H}}{50 \Omega} = 0.02 \text{ s} = 20 \text{ ms} $$
    Substitute values and calculate.

3.  **Write the current decay equation for Phase 2.**
    It's crucial to define a *new time variable* for the decay phase, typically $t' = t - t_{switch}$, where $t_{switch}$ is $100 \text{ ms}$. So $t'$ starts at $0$ when the decay begins.
    $$ I_L(t') = I_0 e^{-t'/\tau_2} $$
    General decay equation using the new time variable $t'$.

    $$ I_L(t') = 0.43235 \ e^{-t' / 20 \text{ ms}} \text{ A} \quad \text{for } t' \ge 0 $$
    Substitute $I_0$ and $\tau_2$.

b) **Find the current through the inductor at $t=150 \text{ ms}$.**

    First, convert $t=150 \text{ ms}$ to the new time variable $t'$:
    $$ t' = t - 100 \text{ ms} = 150 \text{ ms} - 100 \text{ ms} = 50 \text{ ms} $$
    This is the elapsed time since the decay started.

    Now use the Phase 2 decay equation:
    $$ I_L(50 \text{ ms}) = 0.43235 \ e^{-50 \text{ ms} / 20 \text{ ms}} $$
    Substitute $t' = 50 \text{ ms}$.

    $$ I_L(50 \text{ ms}) = 0.43235 \ e^{-2.5} $$
    Simplify the exponent.

    $$ I_L(50 \text{ ms}) = 0.43235 \ (0.08208) $$
    Calculate $e^{-2.5}$.

    $$ I_L(50 \text{ ms}) = \mathbf{0.03548 \text{ A}} $$
    Perform the final multiplication.

**Reflection:** This example is more complex because it involves two distinct phases: growth followed by decay. The key is to correctly calculate the initial current for the decay phase (which is the final current of the growth phase) and to use a new time variable for the second phase to avoid confusion. Also, correctly identifying the total resistance in each phase is crucial for calculating the respective time constants.

---

### Example 4: Finding L from Energy and Time

**Problem:** A $20 \Omega$ resistor is connected in series with an inductor to a $100 \text{ V}$ DC source. After $20 \text{ ms}$ from closing the switch, the energy stored in the inductor is $0.2 \text{ J}$.
a) What is the inductance $L$ of the inductor?
b) What is the voltage across the inductor at $t=20 \text{ ms}$?

**What's given:** $R = 20 \Omega$, $V_S = 100 \text{ V}$, $t = 20 \text{ ms} = 0.02 \text{ s}$, $E_L(20 \text{ ms}) = 0.2 \text{ J}$.
**What we want:** a) $L$, b) $V_L(20 \text{ ms})$.

**Solution:**

a) **What is the inductance $L$ of the inductor?**

1.  **Recall the energy stored in an inductor.**
    $$ E_L = \frac{1}{2} L I^2 $$
    This formula relates stored energy to inductance and current.

    We know $E_L$ and we want $L$. This means we need to find the current $I$ at $t=20 \text{ ms}$.

2.  **Write the current growth equation.**
    $$ I(t) = \frac{V_S}{R} (1 - e^{-t/\tau}) $$
    This is the general equation for current growth. We know $V_S$, $R$, and $t$. We need $\tau = L/R$.

    $$ I(t) = \frac{V_S}{R} (1 - e^{-Rt/L}) $$
    Substitute $\tau = L/R$ directly into the exponent.

3.  **Substitute the known values into the current equation.**
    $$ I(0.02 \text{ s}) = \frac{100 \text{ V}}{20 \Omega} (1 - e^{-(20 \Omega)(0.02 \text{ s})/L}) $$
    Substitute $V_S$, $R$, and $t$.

    $$ I(0.02 \text{ s}) = 5 (1 - e^{-0.4/L}) $$
    Simplify the fraction and the exponent.

4.  **Substitute $I(0.02 \text{ s})$ into the energy equation.**
    $$ E_L = \frac{1}{2} L I^2 $$
    $$ 0.2 \text{ J} = \frac{1}{2} L \left[ 5 (1 - e^{-0.4/L}) \right]^2 $$
    Substitute $E_L$ and the expression for $I(0.02 \text{ s})$.

    $$ 0.2 = \frac{1}{2} L \cdot 25 (1 - e^{-0.4/L})^2 $$
    Square the term inside the brackets.

    $$ 0.4 = 25 L (1 - e^{-0.4/L})^2 $$
    Multiply by 2.

    $$ \frac{0.4}{25} = L (1 - e^{-0.4/L})^2 $$
    Divide by 25.

    $$ 0.016 = L (1 - e^{-0.4/L})^2 $$
    This equation is transcendental (cannot be solved algebraically for $L$). We need to use numerical methods (like a calculator's solver or trial and error).

    Let's try some values for $L$.
    If $L = 0.1 \text{ H}$: $0.1 (1 - e^{-0.4/0.1})^2 = 0.1 (1 - e^{-4})^2 = 0.1 (1 - 0.0183)^2 = 0.1 (0.9817)^2 \approx 0.1 \times 0.9637 \approx 0.09637$. (Too high)
    If $L = 0.05 \text{ H}$: $0.05 (1 - e^{-0.4/0.05})^2 = 0.05 (1 - e^{-8})^2 \approx 0.05 (1 - 0.0003)^2 \approx 0.05 \times 0.9994^2 \approx 0.0499$. (Still too high, but much closer)

    Let's re-evaluate the problem. Perhaps there's a simpler path or a specific value of $L$ that makes it solvable.
    Let's assume the current $I$ at $t=20 \text{ ms}$ is known.
    If $L=0.1 \text{ H}$, then $\tau = L/R = 0.1/20 = 0.005 \text{ s} = 5 \text{ ms}$.
    Then $I(20 \text{ ms}) = 5 (1 - e^{-20/5}) = 5 (1 - e^{-4}) = 5 (1 - 0.0183) = 5 (0.9817) = 4.9085 \text{ A}$.
    Then $E_L = \frac{1}{2} (0.1) (4.9085)^2 = 0.05 \times 24.093 = 1.204 \text{ J}$. This is far from $0.2 \text{ J}$.

    Let's try working backward from $E_L$ to $I$.
    $$ 0.2 = \frac{1}{2} L I^2 $$
    We have two unknowns, $L$ and $I$.
    Let's assume the question implies that the current is a specific fraction of $I_{max}$ or that $L$ is a specific value.
    If we *assume* a value for $L$ to make the problem solvable without numerical methods, it would be a specific type of problem.
    However, the problem asks to *find* $L$. This means we must solve the transcendental equation $0.016 = L (1 - e^{-0.4/L})^2$.

    Using a numerical solver (like Wolfram Alpha or a scientific calculator's `solve` function):
    Let $f(L) = L (1 - e^{-0.4/L})^2 - 0.016 = 0$.
    A numerical solution yields $L \approx 0.024 \text{ H}$.
    Let's verify: If $L = 0.024 \text{ H}$, then $\tau = 0.024/20 = 0.0012 \text{ s}$.
    $I(0.02 \text{ s}) = 5 (1 - e^{-0.02/0.0012}) = 5 (1 - e^{-16.666}) \approx 5 (1 - 0) = 5 \text{ A}$.
    If $I \approx 5 \text{ A}$, then $E_L = \frac{1}{2} (0.024) (5)^2 = 0.012 \times 25 = 0.3 \text{ J}$. This is not $0.2 \text{ J}$.

    Let's re-check the calculation:
    $0.016 = L (1 - e^{-0.4/L})^2$
    If $L=0.01 \text{ H}$, $0.01 (1-e^{-40})^2 \approx 0.01$. (Too low)
    If $L=0.02 \text{ H}$, $0.02 (1-e^{-20})^2 \approx 0.02$. (Too low)
    If $L=0.03 \text{ H}$, $0.03 (1-e^{-0.4/0.03})^2 = 0.03 (1-e^{-13.33})^2 \approx 0.03$. (Too low)

    There must be a mistake in my numerical estimation or the problem is designed to be solved numerically. Let's assume the current at $t=20 \text{ms}$ is NOT close to $I_{max}$.
    Let $x = e^{-0.4/L}$. Then $0.016 = L(1-x)^2$.
    The equation $0.016 = L (1 - e^{-0.4/L})^2$ is indeed transcendental. For physics exams, such problems often have values that simplify or are solvable by approximation if $t \ll \tau$ or $t \gg \tau$. Here $t=0.02$s.
    Let's try to express $I$ in terms of $L$ first.
    $$ I(0.02) = \sqrt{\frac{2E_L}{L}} = \sqrt{\frac{2 \times 0.2}{L}} = \sqrt{\frac{0.4}{L}} $$
    So, we have:
    $$ \sqrt{\frac{0.4}{L}} = \frac{V_S}{R} (1 - e^{-Rt/L}) $$
    $$ \sqrt{\frac{0.4}{L}} = 5 (1 - e^{-20 \times 0.02 / L}) $$
    $$ \sqrt{\frac{0.4}{L}} = 5 (1 - e^{-0.4/L}) $$
    Let $y = \frac{1}{\sqrt{L}}$. Then $\sqrt{0.4} y = 5 (1 - e^{-0.4 y^2})$.
    This is still a transcendental equation.

    For typical exam settings, if a numerical solver is not allowed, there might be an implicit assumption or the values are chosen such that $t$ is a multiple of $\tau$ or $t \ll \tau$ or $t \gg \tau$.
    Let's consider if $t=20 \text{ ms}$ is exactly $1\tau$ or $2\tau$ or something.
    If $t = \tau = L/R$, then $0.02 = L/20 \implies L = 0.4 \text{ H}$.
    Let's check this $L$:
    If $L = 0.4 \text{ H}$, then $\tau = 0.4/20 = 0.02 \text{ s}$. So $t = \tau$.
    Then $I(0.02 \text{ s}) = I_{max}(1 - e^{-1}) = 5 (1 - 0.3679) = 5 (0.6321) = 3.1605 \text{ A}$.
    Then $E_L = \frac{1}{2} (0.4 \text{ H}) (3.1605 \text{ A})^2 = 0.2 \times 9.9888 = 1.99776 \text{ J}$. This is not $0.2 \text{ J}$.

    This problem is designed to be solved numerically. Let's use a numerical approach.
    From $\sqrt{\frac{0.4}{L}} = 5 (1 - e^{-0.4/L})$, let $x = 0.4/L$. Then $L = 0.4/x$.
    $$ \sqrt{x} = 5 (1 - e^{-x}) $$
    Let's plot $f(x) = \sqrt{x}$ and $g(x) = 5(1-e^{-x})$ and find their intersection.
    If $x=1$, $\sqrt{1}=1$, $5(1-e^{-1}) = 5(0.632) = 3.16$.
    If $x=0.1$, $\sqrt{0.1} \approx 0.316$, $5(1-e^{-0.1}) = 5(1-0.9048) = 5(0.0952) = 0.476$.
    If $x=0.01$, $\sqrt{0.01}=0.1$, $5(1-e^{-0.01}) = 5(1-0.99) = 5(0.01) = 0.05$.
    The solution for $x$ must be between $0.01$ and $0.1$.
    Using a numerical solver for $\sqrt{x} = 5(1-e^{-x})$ gives $x \approx 0.038$.
    Since $x = 0.4/L$, then $L = 0.4/x = 0.4/0.038 \approx \mathbf{10.53 \text{ H}}$.

    This seems like a very large inductance. Let's re-check the problem statement and typical values.
    Perhaps the question is designed for an approximation where $t \ll \tau$ or $t \gg \tau$.
    If $L$ is very large, then $t \ll \tau$. In this case, $e^{-Rt/L} \approx 1 - Rt/L$.
    So $I(t) \approx \frac{V_S}{R} (1 - (1 - Rt/L)) = \frac{V_S}{R} \frac{Rt}{L} = \frac{V_S t}{L}$.
    Then $E_L = \frac{1}{2} L I^2 = \frac{1}{2} L \left(\frac{V_S t}{L}\right)^2 = \frac{1}{2} L \frac{V_S^2 t^2}{L^2} = \frac{V_S^2 t^2}{2L}$.
    So $0.2 = \frac{(100)^2 (0.02)^2}{2L} = \frac{10000 \times 0.0004}{2L} = \frac{4}{2L} = \frac{2}{L}$.
    This gives $L = 2/0.2 = 10 \text{ H}$.
    Let's check if this approximation is valid. If $L=10 \text{ H}$, then $\tau = L/R = 10/20 = 0.5 \text{ s}$.
    Since $t = 0.02 \text{ s}$ and $\tau = 0.5 \text{ s}$, then $t \ll \tau$ ($0.02 \ll 0.5$). So the approximation is valid!

    Therefore, the inductance $L$ is:
    $$ L = \mathbf{10 \text{ H}} $$

b) **What is the voltage across the inductor at $t=20 \text{ ms}$?**

1.  **First, calculate the current at $t=20 \text{ ms}$ with $L=10 \text{ H}$.**
    Since $t \ll \tau$, we can use the approximation $I(t) \approx \frac{V_S t}{L}$.
    $$ I(0.02 \text{ s}) = \frac{100 \text{ V} \times 0.02 \text{ s}}{10 \text{ H}} = \frac{2}{10} = 0.2 \text{ A} $$
    Alternatively, using the full formula:
    $$ I(0.02 \text{ s}) = \frac{100}{20} (1 - e^{-(20 \times 0.02)/10}) = 5 (1 - e^{-0.04}) = 5 (1 - 0.96078) = 5 (0.03922) = 0.1961 \text{ A} $$
    The approximation is very close. Let's use the full formula for accuracy or the approximated value if it's acceptable. For this, let's use the approximation $I=0.2$ A to match the energy given.

    Let's recheck $E_L$ with $I=0.2 \text{ A}$ and $L=10 \text{ H}$.
    $E_L = \frac{1}{2} (10) (0.2)^2 = 5 \times 0.04 = 0.2 \text{ J}$. This matches the given energy perfectly. So $I(0.02 \text{ s}) = 0.2 \text{ A}$.

2.  **Calculate the voltage across the resistor at $t=20 \text{ ms}$.**
    $$ V_R(t) = I(t)R $$
    This is Ohm's Law.

    $$ V_R(0.02 \text{ s}) = 0.2 \text{ A} \times 20 \Omega = 4 \text{ V} $$
    Substitute the current and resistance.

3.  **Apply KVL to find the voltage across the inductor.**
    $$ V_S - V_R(t) - V_L(t) = 0 $$
    From KVL for the growth phase.

    $$ V_L(t) = V_S - V_R(t) $$
    Rearrange to solve for $V_L$.

    $$ V_L(0.02 \text{ s}) = 100 \text{ V} - 4 \text{ V} $$
    Substitute $V_S$ and $V_R$.

    $$ V_L(0.02 \text{ s}) = \mathbf{96 \text{ V}} $$
    Calculate the inductor voltage.

**Reflection:** This example was challenging because it required solving a transcendental equation, which is often approximated in physics. Recognizing the condition $t \ll \tau$ (or $t/\tau \ll 1$) and using the Taylor expansion $e^{-x} \approx 1-x$ for small $x$ was the key to an analytical solution for $L$. From there, the rest was straightforward. It also highlighted the importance of consistent values and re-checking calculations.

---

## 6. Common mistakes and traps

1.  **Confusing $\tau = L/R$ with $\tau = RC$:** Students often mix up the time constant formulas for RL and RC circuits. Remember that for RL circuits, the inductor *opposes* current change, and resistance *limits* current, so $L/R$ makes sense (larger L, slower change; larger R, faster decay).
2.  **Incorrectly applying initial conditions:** For current growth, $I(0)=0$ is usually true unless there's pre-existing current. For current decay, $I_0$ is the current *at the moment the decay begins*, which might be the steady-state current from a previous phase. Don't always assume $I_0 = V_S/R$.
3.  **Treating inductors as short/open circuits too early:** In transient analysis, an inductor acts as an *open circuit* at $t=0^+$ (instantaneously opposing current change) and a *short circuit* at $t \to \infty$ (steady-state DC). Applying these steady-state assumptions for instantaneous values or vice-versa is a common error.
4.  **Sign errors in KVL:** When applying Kirchhoff's Voltage Law, ensure a consistent direction around the loop and correctly assign positive/negative signs to voltage drops and rises. For an inductor, $V_L = L \frac{dI}{dt}$ is the voltage *drop* in the direction of current flow.
5.  **Algebraic errors when solving for time:** When solving for $t$ in decay problems, remember to use the natural logarithm ($\ln$) to isolate the exponent. Common errors include using base-10 logarithm or making sign errors.
6.  **Confusing energy stored vs. power dissipated:** Energy ($E = \frac{1}{2}LI^2$) is stored in the inductor's magnetic field (in Joules). Power ($P = I^2R$) is dissipated by the resistor as heat (in Watts). These are distinct concepts.

## 7. Textbook-precise explanation

An RL circuit is a fundamental first-order electrical circuit comprising a resistor (R) and an inductor (L) connected in series with a voltage source. Its behavior is characterized by the transient response of current and voltage as the circuit transitions between steady states, due to the inductor's property of opposing changes in current.

**Current Growth:**
When a DC voltage source, $V_S$, is applied to a series RL circuit at $t=0$ (assuming no initial current, $I(0)=0$), the current $I(t)$ does not instantaneously reach its steady-state value. Instead, it rises exponentially according to the differential equation derived from Kirchhoff's Voltage Law (KVL):
$$ V_S - IR - L \frac{dI}{dt} = 0 $$
$$ L \frac{dI}{dt} + RI = V_S $$
The solution to this first-order linear differential equation, with the initial condition $I(0)=0$, is:
$$ I(t) = \frac{V_S}{R} (1 - e^{-(R/L)t}) $$
The term $\frac{V_S}{R}$ represents the final, steady-state current ($I_{max}$ or $I_{final}$) that the circuit would reach if the inductor were a short circuit. The exponential term $e^{-(R/L)t}$ describes the transient response.

**Current Decay:**
If the voltage source is removed from a series RL circuit (e.g., by shorting the resistor and inductor together) at $t=0$, after the current has reached an initial value $I_0$, the current will not instantaneously drop to zero. Instead, the energy stored in the inductor's magnetic field will be dissipated by the resistor, causing the current to decay exponentially. The KVL equation for the decay phase is:
$$ IR + L \frac{dI}{dt} = 0 $$
$$ L \frac{dI}{dt} = -RI $$
The solution to this differential equation, with the initial condition $I(0)=I_0$, is:
$$ I(t) = I_0 e^{-(R/L)t} $$

**Time Constant ($\tau$):**
A critical parameter characterizing the speed of the transient response in an RL circuit is the time constant, $\tau$. It is defined as:
$$ \tau = \frac{L}{R} $$
The unit of $\tau$ is seconds. In terms of the time constant, the current growth and decay equations become:
$$ I_{growth}(t) = I_{max} (1 - e^{-t/\tau}) $$
$$ I_{decay}(t) = I_0 e^{-t/\tau} $$
After one time constant ($t=\tau$), the current in a growth phase reaches approximately 63.2% of its final value, and in a decay phase, it falls to approximately 36.8% of its initial value. After approximately $5\tau$, the current is considered to have reached its steady-state value (within 1% of the final value).

**Energy Storage:**
An inductor stores energy in its magnetic field. The energy stored at any instant is given by:
$$ E_L = \frac{1}{2}LI^2 $$
where $I$ is the instantaneous current through the inductor. During current growth, energy from the source is stored in the inductor and dissipated by the resistor. During current decay, the stored magnetic energy is entirely dissipated as heat by the resistor.

(See, for example, "Nilsson & Riedel, Electric Circuits, 11e, Chapter 7" or "Serway & Jewett, Physics for Scientists and Engineers, 10e, Chapter 31" for further details.)

## 8. ASCII diagrams

```text
       SWITCH (S)
       _
V_S ---/ --- R ---- L ----
      |           |
      |           |
      --------------------
           (Ground)

Figure 1: Simple Series RL Circuit with a Switch for Current Growth.
When S closes at t=0, current starts to flow from V_S, through R, then L.
The inductor L opposes the change in current.

```

```text
          R ---- L ----
         |           |
         |           |
         -------------
        (Initial current I0 from prior state)

Figure 2: Series RL Circuit for Current Decay.
After the current has reached a steady state (I0), the voltage source is removed
(e.g., by shorting the R-L path). The inductor discharges its energy through R,
causing the current to decay.
```

```text
Current (I)
^
|      I_max = V_S / R
|     . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
|    .
|   .
|  .
| .
| .
| .
| .
| .
+------------------------------------------------------------------------> Time (t)
0  tau  2tau  3tau  4tau  5tau

Figure 3: Current Growth in an RL Circuit (I(t) = I_max * (1 - e^(-t/tau))).
The current starts at zero and asymptotically approaches I_max.
At t=tau, I(tau) approx 0.632 * I_max.

```

```text
Current (I)
^
| I_0
| .
|  .
|   .
|    .
|     .
|      .
|       .
|        .
+------------------------------------------------------------------------> Time (t)
0  tau  2tau  3tau  4tau  5tau

Figure 4: Current Decay in an RL Circuit (I(t) = I_0 * e^(-t/tau)).
The current starts at I_0 and asymptotically approaches zero.
At t=tau, I(tau) approx 0.368 * I_0.
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **"Inductor is LAZY."** This is the core idea. It resists *changes* in current. It's slow to start (growth) and slow to stop (decay).
    *   **"L/R is Long/Rapid."** For the time constant $\tau = L/R$: A *Large* L means a *Long* time constant (slow response). A *Large* R means a *Rapid* decay (small time constant, fast response) in decay, but also a *Rapid* approach to $I_{max}$ in growth because $I_{max}$ is smaller. Focus on "Large L, Long $\tau$."

2.  **Formulas/Facts to Overlearn:**
    *   **Inductor Voltage:** $V_L = L \frac{dI}{dt}$ (The inductor's defining characteristic).
    *   **Time Constant:** $\tau = L/R$ (The speed of the circuit's response).
    *   **Current Growth:** $I(t) = I_{max} (1 - e^{-t/\tau})$ (Starting from zero, rising to $I_{max}$).
    *   **Current Decay:** $I(t) = I_0 e^{-t/\tau}$ (Starting from $I_0$, falling to zero).
    *   **Energy Stored in Inductor:** $E_L = \frac{1}{2}LI^2$ (Where the inductor's "laziness" comes from).

3.  **Spaced-Repetition Schedule:**
    *   **1 day:** Review the core ideas, equations, and a simple growth/decay problem.
    *   **3 days:** Review the concepts, re-derive the equations, and work a medium-difficulty problem.
    *   **7 days:** Review again, focusing on common mistakes, and try a multi-phase problem.
    *   **16 days:** Revisit all concepts, try to explain them in your own words without notes, and solve a hard problem.
    *   **35 days:** Final review, check your understanding against the textbook-precise explanation, and ensure you can re-derive everything from first principles.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the formulas, you can always rebuild them:
    *   **Start with KVL:** Apply Kirchhoff's Voltage Law to the series RL circuit.
        *   For growth: $V_S - IR - L \frac{dI}{dt} = 0$
        *   For decay: $IR + L \frac{dI}{dt} = 0$
    *   **Rearrange into a Differential Equation:**
        *   Growth: $L \frac{dI}{dt} + RI = V_S$
        *   Decay: $L \frac{dI}{dt} = -RI$
    *   **Solve the Differential Equation:**
        *   For growth, use integrating factor or separation of variables. Remember the general form $I(t) = I_{particular} + I_{homogeneous}$. $I_{particular} = V_S/R$. $I_{homogeneous} = A e^{-(R/L)t}$. Apply $I(0)=0$ to find $A$.
        *   For decay, use separation of variables. $\frac{dI}{I} = -\frac{R}{L} dt$. Integrate both sides. Apply $I(0)=I_0$ to find the constant.
    *   **Define $\tau = L/R$:** Introduce the time constant to simplify the exponential term.

This pathway ensures you understand *why* the formulas are what they are, not just memorizing them.

## 10. Connections — what this leads to

Understanding RL circuits is a foundational step, unlocking many more advanced topics in electrical engineering and physics:

*   **AC Circuits (Phasors and Impedance):** The concepts of resistance and inductance directly extend to AC circuits, where inductors have an "impedance" that depends on frequency. This is crucial for analyzing circuits with alternating current.
*   **RLC Circuits (Resonance and Oscillations):** Combining resistors,