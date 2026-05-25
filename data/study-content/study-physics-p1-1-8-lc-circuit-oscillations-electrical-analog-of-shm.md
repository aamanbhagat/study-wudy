## 1. What it is — in plain English

Imagine you have a bouncy spring and a heavy ball. If you pull the ball, stretch the spring, and then let go, what happens? The ball bounces back and forth, right? It keeps moving, converting the spring's stored "stretchiness" energy into the ball's "motion" energy, and back again. This back-and-forth motion is called oscillation.

Now, let's swap out the spring and ball for electrical parts. Instead of a spring, we have a "capacitor," which is like an electrical storage tank for charge. And instead of a heavy ball, we have an "inductor," which is like an electrical flywheel that resists changes in current.

If you charge up the capacitor (fill its "tank" with electrical charge) and then connect it to the inductor, the charge will start sloshing back and forth between them. The capacitor will empty, creating a current that builds up a magnetic field in the inductor. Then, the inductor's magnetic field will collapse, pushing the charge back onto the capacitor, but in the opposite direction! This continuous electrical sloshing, converting energy between the electric field in the capacitor and the magnetic field in the inductor, is what we call an LC circuit oscillation.

It's essentially an electrical version of that spring-ball system, where the "stretchiness" of the spring is like the capacitor's ability to store charge, and the "heaviness" of the ball is like the inductor's ability to resist current changes.

## 2. Why it matters — real-world applications

LC circuits are fundamental building blocks in countless technologies, especially those dealing with radio frequencies and signals.

1.  **Radio Tuners and Receivers:** When you tune your radio to a specific station (e.g., 98.7 FM), you're adjusting an LC circuit inside the radio. Different stations broadcast at different frequencies. The LC circuit is designed to "resonate" (oscillate strongly) at only one specific frequency, allowing your radio to pick up that station's signal while ignoring all others. This is critical for any wireless communication, from old-school radios to modern Wi-Fi and satellite communication systems.

2.  **RF Filters:** In electronics, sometimes you want to block certain frequencies from passing through a circuit while allowing others. For instance, in a mobile phone, you want to filter out noise and interference from other devices. LC circuits can be designed as "filters" (e.g., low-pass, high-pass, band-pass, band-stop) to precisely select or reject specific frequency ranges, ensuring clean signal transmission and reception.

3.  **Oscillators for Signal Generation:** LC circuits can be used to generate stable, continuous oscillating electrical signals at specific frequencies. These "oscillators" are the heart of clock signals in computers, frequency generators in test equipment, and the carrier waves used to transmit information in radio, television, and cell phone systems. Without them, there would be no way to create the rhythmic pulses that drive our digital world or carry our voices across vast distances.

4.  **Wireless Power Transfer:** While less common for long distances, LC resonance is key to some forms of wireless power transfer, such as in induction cooktops or charging pads for toothbrushes and some smartphones. By tuning the transmitting and receiving coils (which are essentially inductors) to the same resonant frequency using capacitors, energy can be efficiently transferred over short distances through magnetic fields.

5.  **Magnetic Resonance Imaging (MRI):** In medical imaging, MRI machines use powerful magnetic fields and radiofrequency pulses to create detailed images of organs and tissues. The RF pulses are generated and detected using resonant LC circuits, which are tuned to the specific "Larmor frequency" at which hydrogen nuclei in the body precess. This allows for precise manipulation and detection of the signals that form the images.

## 3. Prerequisites — what you must know first

To fully grasp the LC circuit, ensure you have a solid understanding of these foundational concepts:

*   **Capacitors:** How they store electric charge and electric potential energy ($U_C = \frac{1}{2}CV^2$), their defining relationship $Q=CV$, and how current relates to charge $I = \frac{dQ}{dt}$.
*   **Inductors:** How they store magnetic potential energy ($U_L = \frac{1}{2}LI^2$), their defining relationship $V_L = L\frac{dI}{dt}$ (Faraday's Law of Induction), and the concept of inductance $L$.
*   **Voltage and Current:** Basic definitions, Ohm's Law ($V=IR$), and Kirchhoff's Voltage Law (KVL), which states that the sum of voltage drops around any closed loop in a circuit is zero.
*   **Energy Conservation:** The principle that energy cannot be created or destroyed, only transformed from one form to another.
*   **Simple Harmonic Motion (SHM):** The physics of oscillating systems like a mass on a spring, including the differential equation $m\frac{d^2x}{dt^2} + kx = 0$ and the angular frequency $\omega = \sqrt{k/m}$.
*   **Differential Equations:** A basic familiarity with solving second-order linear homogeneous differential equations, especially those of the form $a\frac{d^2y}{dx^2} + by = 0$.
*   **Calculus:** Proficiency with derivatives (especially time derivatives) and basic integration.

If any of these concepts feel unfamiliar, pause here and review them before proceeding.

## 4. The core idea — step by step

Let's break down the operation of an ideal LC circuit, step by step, building from intuition to the formal mathematics. We'll assume ideal components (no resistance) and no external power source.

### ### Step 1: The Setup — Initial State

*   **Plain English:** We start with a capacitor that's fully charged, meaning it has a maximum amount of electrical energy stored in its electric field. The inductor connected to it has no current flowing through it yet, so it stores no energy.
*   **Concrete Example:** Imagine a capacitor $C$ charged to a voltage $V_0$, so it holds a charge $Q_0 = CV_0$. At time $t=0$, we connect this charged capacitor directly across an inductor $L$.
*   **Formal/Mathematical Version:**
    At $t=0$:
    Charge on capacitor: $Q(0) = Q_0$
    Voltage across capacitor: $V_C(0) = Q_0/C = V_0$
    Current through inductor: $I(0) = 0$
    Energy in capacitor: $U_C(0) = \frac{1}{2}CV_0^2 = \frac{1}{2}\frac{Q_0^2}{C}$
    Energy in inductor: $U_L(0) = \frac{1}{2}LI(0)^2 = 0$
    Total energy: $U_{total} = U_C(0) = \frac{1}{2}\frac{Q_0^2}{C}$
*   **What could go wrong:** Forgetting that "fully charged" means maximum voltage and charge, and zero current initially.

### ### Step 2: Capacitor Discharges, Inductor Charges

*   **Plain English:** As soon as the circuit is connected, the capacitor starts to discharge. Charge flows out of one plate and onto the other, creating a current through the inductor. This current builds up a magnetic field around the inductor, which means energy is now being stored in the inductor. The capacitor's voltage and stored electric energy decrease.
*   **Concrete Example:** The current $I$ starts to increase from zero. The voltage $V_C$ across the capacitor starts to decrease from $V_0$.
*   **Formal/Mathematical Version:**
    The current $I(t)$ is the rate of change of charge. If $Q$ is the charge on the positive plate of the capacitor, then current flowing *out* of the positive plate is $I = -\frac{dQ}{dt}$.
    Voltage across the capacitor: $V_C(t) = Q(t)/C$
    Voltage across the inductor: $V_L(t) = L\frac{dI}{dt}$
    By Kirchhoff's Voltage Law (KVL), the sum of voltages around the loop is zero. Assuming we traverse the loop in the direction of current flow, and take voltage drops as positive:
    $V_L + V_C = 0$ (This implies $V_L = -V_C$, meaning the inductor voltage opposes the capacitor voltage, consistent with Lenz's Law).
    Substituting: $L\frac{dI}{dt} + \frac{Q}{C} = 0$
    Energy in capacitor: $U_C(t) = \frac{1}{2}\frac{Q(t)^2}{C}$
    Energy in inductor: $U_L(t) = \frac{1}{2}LI(t)^2$
    Total energy: $U_{total} = U_C(t) + U_L(t) = \text{constant}$
*   **What could go wrong:** Incorrectly assigning the sign for current ($I = dQ/dt$ vs $I = -dQ/dt$). The choice depends on the defined direction of current and which plate $Q$ refers to. For consistency, let's define $I$ as the current flowing *from* the positive plate of the capacitor. Then $I = -dQ/dt$.

### ### Step 3: Capacitor Empty, Inductor Fully Charged

*   **Plain English:** The capacitor eventually completely discharges ($Q=0$, $V_C=0$). At this moment, all the initial electrical energy from the capacitor has been converted into magnetic energy stored in the inductor. The current through the inductor reaches its maximum value. The inductor, due to its "inertia" (inductance), tries to keep this maximum current flowing.
*   **Concrete Example:** $V_C=0$, $Q=0$. $I = I_{max}$. The inductor's magnetic field is at its strongest.
*   **Formal/Mathematical Version:**
    At this point, $Q(t) = 0$.
    The equation $L\frac{dI}{dt} + \frac{Q}{C} = 0$ becomes $L\frac{dI}{dt} = 0$, which implies that the current is momentarily at an extremum (maximum or minimum).
    Energy in capacitor: $U_C(t) = 0$
    Energy in inductor: $U_L(t) = \frac{1}{2}LI_{max}^2$
    Total energy: $U_{total} = \frac{1}{2}LI_{max}^2 = \frac{1}{2}\frac{Q_0^2}{C}$ (from energy conservation)
*   **What could go wrong:** Thinking the current stops when the capacitor is empty. The inductor's job is to *resist changes* in current, so it will continue to drive current even when the capacitor is depleted.

### ### Step 4: Inductor Discharges, Capacitor Recharges (Opposite Polarity)

*   **Plain English:** Since the inductor wants to keep the current flowing, it starts to "push" charge onto the capacitor's plates, but in the opposite direction compared to its initial charge. This means the capacitor begins to charge up again, but with reversed polarity. The current through the inductor starts to decrease as its magnetic field collapses, releasing its stored energy.
*   **Concrete Example:** Current $I$ starts to decrease from $I_{max}$. Charge $Q$ starts to build up on the capacitor, but with the opposite sign from $Q_0$.
*   **Formal/Mathematical Version:**
    The current $I(t)$ decreases, meaning $\frac{dI}{dt}$ is negative.
    The voltage across the inductor $V_L = L\frac{dI}{dt}$ becomes negative, driving current against the voltage of the capacitor as it charges in reverse.
    The charge $Q(t)$ on the capacitor becomes negative, indicating reversed polarity.
*   **What could go wrong:** Not understanding why the capacitor recharges with opposite polarity. It's the inductor's "inertia" (Lenz's Law in action) that forces the current to continue and reverse the charge.

### ### Step 5: Cycle Completes, Ready to Repeat

*   **Plain English:** The inductor eventually fully discharges its magnetic energy, and all that energy is transferred back to the capacitor, which is now fully charged again, but with the opposite polarity from its initial state. At this point, the current momentarily drops to zero, and the capacitor is ready to discharge again, starting the entire process over in the reverse direction. This completes half an oscillation cycle. The full cycle completes when the capacitor is charged back to $Q_0$ with its original polarity.
*   **Concrete Example:** $Q = -Q_0$, $V_C = -V_0$, $I=0$. Then, the capacitor discharges again, current flows in the opposite direction, and the process repeats.
*   **Formal/Mathematical Version:**
    At $t = T/2$ (half period), $Q(T/2) = -Q_0$ and $I(T/2) = 0$.
    At $t = T$ (full period), $Q(T) = Q_0$ and $I(T) = 0$.
    The total energy $U_{total} = \frac{1}{2}\frac{(-Q_0)^2}{C} = \frac{1}{2}\frac{Q_0^2}{C}$ remains constant.
*   **What could go wrong:** Confusing the half-cycle with the full cycle, or forgetting that the total energy in an ideal LC circuit is conserved.

### ### Step 6: The Governing Differential Equation

*   **Plain English:** We can describe this continuous energy exchange mathematically using Kirchhoff's Voltage Law. By summing the voltage drops across the inductor and capacitor in the loop, we get an equation that describes how charge (or current) changes over time.
*   **Concrete Example:** Imagine traversing the loop clockwise. The voltage across the inductor is $V_L = L\frac{dI}{dt}$. The voltage across the capacitor is $V_C = \frac{Q}{C}$. Applying KVL: $V_L + V_C = 0$.
*   **Formal/Mathematical Version:**
    Starting with KVL:
    $$V_L + V_C = 0$$
    Substitute the voltage relations for ideal components:
    $$L\frac{dI}{dt} + \frac{Q}{C} = 0$$
    Now, we need to express current $I$ in terms of charge $Q$. If $Q$ is the charge on the positive plate of the capacitor, and $I$ is the current flowing *out* of that plate, then $I = -\frac{dQ}{dt}$.
    Substitute $I = -\frac{dQ}{dt}$ into the equation:
    $$L\frac{d}{dt}\left(-\frac{dQ}{dt}\right) + \frac{Q}{C} = 0$$
    $$-L\frac{d^2Q}{dt^2} + \frac{Q}{C} = 0$$
    Multiply by -1 and rearrange:
    $$L\frac{d^2Q}{dt^2} + \frac{1}{C}Q = 0$$
    This is a second-order linear homogeneous differential equation.
*   **What could go wrong:** Incorrectly applying KVL or the relationship between current and charge. The sign of $I = \pm dQ/dt$ is crucial. If we define $I$ as the current flowing *into* the positive plate, then $I = dQ/dt$, and KVL would be $V_C - V_L = 0$ or $V_L = V_C$ if we consider the voltage drop across the inductor in the direction of current flow. It's often easier to stick to a consistent convention, like $I = -dQ/dt$ when $Q$ is the charge on the plate from which current flows.

### ### Step 7: Analogy to Simple Harmonic Motion (SHM)

*   **Plain English:** The differential equation we just derived for the LC circuit looks exactly like the equation for a mass-spring system undergoing Simple Harmonic Motion. This means the electrical oscillations in an LC circuit are mathematically identical to the mechanical oscillations of a spring and mass.
*   **Concrete Example:**
    Mass-spring system: $m\frac{d^2x}{dt^2} + kx = 0$
    LC circuit: $L\frac{d^2Q}{dt^2} + \frac{1}{C}Q = 0$
    By comparing these, we can see the direct analogies:
    *   Mass ($m$) is analogous to Inductance ($L$). (Both represent "inertia" – resistance to change in motion/current).
    *   Spring constant ($k$) is analogous to the inverse of Capacitance ($1/C$). (Both represent "stiffness" or resistance to displacement/charge).
    *   Displacement ($x$) is analogous to Charge ($Q$).
    *   Velocity ($dx/dt$) is analogous to Current ($I = dQ/dt$).
*   **Formal/Mathematical Version:**
    The general form for SHM is $\frac{d^2y}{dt^2} + \omega^2 y = 0$.
    For the mass-spring system, $\frac{d^2x}{dt^2} + \frac{k}{m}x = 0$, so $\omega^2 = \frac{k}{m}$.
    For the LC circuit, $\frac{d^2Q}{dt^2} + \frac{1}{LC}Q = 0$, so $\omega^2 = \frac{1}{LC}$.
*   **What could go wrong:** Mixing up which electrical component corresponds to which mechanical one, especially $k$ vs $1/C$. Remember that a stiffer spring (large $k$) leads to faster oscillations, just as a smaller capacitance (large $1/C$) leads to faster oscillations.

### ### Step 8: Solution and Natural Frequency

*   **Plain English:** Since the LC circuit equation is identical to the SHM equation, its solution will be a sinusoidal function (a sine or cosine wave). This means the charge on the capacitor and the current through the inductor will oscillate sinusoidally over time. The rate at which they oscillate is called the natural angular frequency, determined by the values of $L$ and $C$.
*   **Concrete Example:** If we start with a fully charged capacitor and zero current, the charge $Q(t)$ will follow a cosine function, and the current $I(t)$ will follow a negative sine function (because $I = -dQ/dt$).
*   **Formal/Mathematical Version:**
    The general solution to $L\frac{d^2Q}{dt^2} + \frac{1}{C}Q = 0$ is:
    $$Q(t) = Q_0 \cos(\omega t + \phi)$$
    where $Q_0$ is the maximum charge, $\omega$ is the angular frequency, and $\phi$ is the phase constant.
    By comparing with the general SHM solution, the angular frequency $\omega$ is found to be:
    $$\omega = \frac{1}{\sqrt{LC}}$$
    The unit for $\omega$ is radians per second (rad/s).
    The frequency $f$ (in Hertz, Hz) is related by $\omega = 2\pi f$, so:
    $$f = \frac{1}{2\pi\sqrt{LC}}$$
    The period $T$ (in seconds, s) is $T = 1/f = 2\pi/\omega$:
    $$T = 2\pi\sqrt{LC}$$
    If we assume $Q(0) = Q_0$ and $I(0) = 0$, then $\phi=0$, and:
    $$Q(t) = Q_0 \cos(\omega t)$$
    Then, the current $I(t)$ is:
    $$I(t) = -\frac{dQ}{dt} = -Q_0 \frac{d}{dt}(\cos(\omega t)) = -Q_0 (-\omega \sin(\omega t))$$
    $$I(t) = \omega Q_0 \sin(\omega t)$$
    The maximum current $I_{max}$ is $\omega Q_0$.
*   **What could go wrong:** Forgetting the square root in the frequency formula, or confusing angular frequency $\omega$ with linear frequency $f$. Also, ensure the correct phase relationship between $Q(t)$ and $I(t)$.

## 5. Worked examples — multiple, with every step shown

### Example 1: Basic Frequency and Period Calculation

**Problem:** An ideal LC circuit consists of an inductor with $L = 5.0 \, \text{mH}$ and a capacitor with $C = 200 \, \text{nF}$. Calculate the angular frequency, frequency, and period of the oscillations.

**Given:**
*   Inductance $L = 5.0 \, \text{mH} = 5.0 \times 10^{-3} \, \text{H}$
*   Capacitance $C = 200 \, \text{nF} = 200 \times 10^{-9} \, \text{F} = 2.0 \times 10^{-7} \, \text{F}$

**Want:**
*   Angular frequency $\omega$
*   Frequency $f$
*   Period $T$

**Solution:**

1.  **Calculate the angular frequency $\omega$:**
    The formula for angular frequency in an LC circuit is $\omega = \frac{1}{\sqrt{LC}}$.
    $$ \omega = \frac{1}{\sqrt{(5.0 \times 10^{-3} \, \text{H})(2.0 \times 10^{-7} \, \text{F})}} $$
    *   Substitute the given values for L and C.
    $$ \omega = \frac{1}{\sqrt{10.0 \times 10^{-10} \, \text{H}\cdot\text{F}}} $$
    *   Multiply the numbers inside the square root. $5.0 \times 2.0 = 10.0$. $10^{-3} \times 10^{-7} = 10^{-10}$.
    $$ \omega = \frac{1}{\sqrt{1.0 \times 10^{-9} \, \text{H}\cdot\text{F}}} $$
    *   Rewrite $10.0 \times 10^{-10}$ as $1.0 \times 10^{-9}$ for easier square root calculation.
    $$ \omega = \frac{1}{\sqrt{10^{-9}}} $$
    *   Calculate the square root. $\sqrt{10^{-9}}$ is approximately $\sqrt{10 \times 10^{-10}} \approx 3.16 \times 10^{-5}$.
    Let's be more precise: $\sqrt{10^{-9}} = \sqrt{10 \times 10^{-10}} = \sqrt{10} \times 10^{-5}$.
    $$ \omega = \frac{1}{\sqrt{10} \times 10^{-5} \, \text{s}} $$
    *   The unit $\sqrt{\text{H}\cdot\text{F}}$ simplifies to seconds (s), so $1/\text{s}$ is rad/s.
    $$ \omega \approx \frac{1}{3.162 \times 10^{-5}} \, \text{rad/s} $$
    $$ \omega \approx 31622.77 \, \text{rad/s} $$
    *   Perform the division.

    The angular frequency is $\mathbf{\omega \approx 3.16 \times 10^4 \, \text{rad/s}}$.

2.  **Calculate the frequency $f$:**
    The relationship between angular frequency and linear frequency is $f = \frac{\omega}{2\pi}$.
    $$ f = \frac{31622.77 \, \text{rad/s}}{2\pi} $$
    *   Substitute the calculated $\omega$ and use $\pi \approx 3.14159$.
    $$ f \approx \frac{31622.77}{6.28318} \, \text{Hz} $$
    *   Perform the division.
    $$ f \approx 5032.89 \, \text{Hz} $$

    The frequency is $\mathbf{f \approx 5.03 \, \text{kHz}}$.

3.  **Calculate the period $T$:**
    The period is the inverse of the frequency, $T = \frac{1}{f}$.
    $$ T = \frac{1}{5032.89 \, \text{Hz}} $$
    *   Substitute the calculated $f$.
    $$ T \approx 0.00019869 \, \text{s} $$
    *   Perform the division.

    The period is $\mathbf{T \approx 0.20 \, \text{ms}}$.

**Reflection:** This example was straightforward, mainly testing unit conversions and the direct application of the formula $\omega = 1/\sqrt{LC}$. The trickiest part might be handling the powers of 10 correctly and remembering the relationship between $\omega$, $f$, and $T$.

---

### Example 2: Charge and Current as Functions of Time

**Problem:** An LC circuit has $L = 10.0 \, \text{mH}$ and $C = 4.00 \, \mu\text{F}$. At $t=0$, the capacitor is charged to $Q_0 = 50.0 \, \mu\text{C}$ and the current in the inductor is zero. Find the expressions for charge $Q(t)$ and current $I(t)$.

**Given:**
*   Inductance $L = 10.0 \, \text{mH} = 10.0 \times 10^{-3} \, \text{H} = 1.0 \times 10^{-2} \, \text{H}$
*   Capacitance $C = 4.00 \, \mu\text{F} = 4.00 \times 10^{-6} \, \text{F}$
*   Initial charge $Q_0 = 50.0 \, \mu\text{C} = 50.0 \times 10^{-6} \, \text{C} = 5.0 \times 10^{-5} \, \text{C}$
*   Initial current $I(0) = 0$

**Want:**
*   $Q(t)$
*   $I(t)$

**Solution:**

1.  **Calculate the angular frequency $\omega$:**
    $$ \omega = \frac{1}{\sqrt{LC}} $$
    *   Use the formula for angular frequency.
    $$ \omega = \frac{1}{\sqrt{(1.0 \times 10^{-2} \, \text{H})(4.00 \times 10^{-6} \, \text{F})}} $$
    *   Substitute the given values.
    $$ \omega = \frac{1}{\sqrt{4.00 \times 10^{-8} \, \text{H}\cdot\text{F}}} $$
    *   Multiply inside the square root.
    $$ \omega = \frac{1}{(2.00 \times 10^{-4}) \, \text{s}} $$
    *   Take the square root. $\sqrt{4.00} = 2.00$, $\sqrt{10^{-8}} = 10^{-4}$.
    $$ \omega = 5000 \, \text{rad/s} $$
    *   Perform the division.

    So, $\omega = 5000 \, \text{rad/s}$.

2.  **Determine the form of $Q(t)$:**
    The general solution for charge oscillation is $Q(t) = Q_{max} \cos(\omega t + \phi)$.
    *   We know $Q_{max}$ is the initial charge $Q_0$ since the capacitor is fully charged at $t=0$. So, $Q_{max} = 5.0 \times 10^{-5} \, \text{C}$.
    *   We are given $I(0) = 0$. Since $I(t) = -\frac{dQ}{dt}$, this means $\frac{dQ}{dt}(0) = 0$.
    *   The derivative of $\cos(\omega t + \phi)$ is $-\omega \sin(\omega t + \phi)$. For this to be zero at $t=0$, we need $\sin(\phi) = 0$. This implies $\phi = 0$ (or $\pi$, but $\phi=0$ corresponds to $Q(0)=Q_{max}$).
    Therefore, the charge function is $Q(t) = Q_0 \cos(\omega t)$.
    $$ Q(t) = (5.0 \times 10^{-5} \, \text{C}) \cos(5000 \, \text{rad/s} \cdot t) $$

    The expression for charge is $\mathbf{Q(t) = (50.0 \, \mu\text{C}) \cos(5000t)}$.

3.  **Determine the form of $I(t)$:**
    Current is the rate of change of charge, $I(t) = -\frac{dQ}{dt}$.
    $$ I(t) = -\frac{d}{dt} \left[ (5.0 \times 10^{-5} \, \text{C}) \cos(5000 \, t) \right] $$
    *   Take the derivative of $Q(t)$.
    $$ I(t) = -(5.0 \times 10^{-5} \, \text{C}) (-\sin(5000 \, t) \cdot 5000 \, \text{rad/s}) $$
    *   The derivative of $\cos(ax)$ is $-a\sin(ax)$.
    $$ I(t) = (5.0 \times 10^{-5} \times 5000) \, \text{A} \cdot \sin(5000 \, t) $$
    *   Multiply the constants. $5.0 \times 10^{-5} \times 5000 = 5.0 \times 10^{-5} \times 5 \times 10^3 = 25 \times 10^{-2} = 0.25$.
    $$ I(t) = 0.25 \, \text{A} \cdot \sin(5000 \, t) $$

    The expression for current is $\mathbf{I(t) = (0.25 \, \text{A}) \sin(5000t)}$.

**Reflection:** This example required not just calculating $\omega$, but also correctly applying initial conditions to determine the phase constant and deriving the current function from the charge function. The negative sign in $I = -dQ/dt$ is crucial for the correct phase of the current.

---

### Example 3: Energy Considerations and Maximum Current

**Problem:** An ideal LC circuit has an inductor of $L = 2.5 \, \text{mH}$ and a capacitor of $C = 1.0 \, \mu\text{F}$. The capacitor is initially charged to a voltage of $V_0 = 10.0 \, \text{V}$ and then connected to the inductor.
a) What is the maximum charge on the capacitor?
b) What is the maximum current in the circuit?
c) What is the total energy stored in the circuit?

**Given:**
*   Inductance $L = 2.5 \, \text{mH} = 2.5 \times 10^{-3} \, \text{H}$
*   Capacitance $C = 1.0 \, \mu\text{F} = 1.0 \times 10^{-6} \, \text{F}$
*   Initial voltage $V_0 = 10.0 \, \text{V}$

**Want:**
*   a) $Q_{max}$
*   b) $I_{max}$
*   c) $U_{total}$

**Solution:**

a) **Calculate the maximum charge on the capacitor ($Q_{max}$):**
    The maximum charge occurs at $t=0$ when the capacitor is fully charged.
    $$ Q_{max} = C V_0 $$
    *   Use the definition of capacitance $Q=CV$.
    $$ Q_{max} = (1.0 \times 10^{-6} \, \text{F})(10.0 \, \text{V}) $$
    *   Substitute the given values.
    $$ Q_{max} = 1.0 \times 10^{-5} \, \text{C} $$

    The maximum charge on the capacitor is $\mathbf{Q_{max} = 10.0 \, \mu\text{C}}$.

b) **Calculate the maximum current in the circuit ($I_{max}$):**
    The maximum current occurs when the capacitor is fully discharged ($Q=0$) and all the energy is stored in the inductor. We can use energy conservation.
    The total energy in the circuit is constant and equal to the initial energy stored in the capacitor:
    $$ U_{total} = U_C(0) = \frac{1}{2}CV_0^2 $$
    *   The total energy is the initial energy of the capacitor.
    $$ U_{total} = \frac{1}{2}(1.0 \times 10^{-6} \, \text{F})(10.0 \, \text{V})^2 $$
    *   Substitute $C$ and $V_0$.
    $$ U_{total} = \frac{1}{2}(1.0 \times 10^{-6})(100) \, \text{J} $$
    *   Calculate $V_0^2$.
    $$ U_{total} = 5.0 \times 10^{-5} \, \text{J} $$
    *   Perform the multiplication.

    Now, when the current is maximum ($I_{max}$), the energy in the capacitor is zero, and all the energy is in the inductor:
    $$ U_{total} = U_L(\text{when } I=I_{max}) = \frac{1}{2}LI_{max}^2 $$
    *   Set the total energy equal to the maximum energy in the inductor.
    $$ 5.0 \times 10^{-5} \, \text{J} = \frac{1}{2}(2.5 \times 10^{-3} \, \text{H})I_{max}^2 $$
    *   Substitute $U_{total}$ and $L$.
    $$ 1.0 \times 10^{-4} \, \text{J} = (2.5 \times 10^{-3} \, \text{H})I_{max}^2 $$
    *   Multiply both sides by 2.
    $$ I_{max}^2 = \frac{1.0 \times 10^{-4} \, \text{J}}{2.5 \times 10^{-3} \, \text{H}} $$
    *   Isolate $I_{max}^2$.
    $$ I_{max}^2 = 0.04 \, \text{A}^2 $$
    *   Perform the division.
    $$ I_{max} = \sqrt{0.04 \, \text{A}^2} $$
    *   Take the square root.
    $$ I_{max} = 0.20 \, \text{A} $$

    The maximum current is $\mathbf{I_{max} = 0.20 \, \text{A}}$.

c) **Calculate the total energy stored in the circuit ($U_{total}$):**
    We already calculated this in part (b) using the initial capacitor energy.
    $$ U_{total} = \frac{1}{2}CV_0^2 = 5.0 \times 10^{-5} \, \text{J} $$

    The total energy stored in the circuit is $\mathbf{U_{total} = 5.0 \times 10^{-5} \, \text{J}}$.

**Reflection:** This example highlights the principle of energy conservation in an ideal LC circuit. The maximum energy in the capacitor must equal the maximum energy in the inductor, and both are equal to the total energy. It's easy to make calculation errors with powers of 10.

---

### Example 4: Determining Component Values from Oscillation Data

**Problem:** An LC circuit is observed to oscillate at a frequency of $f = 1.0 \, \text{MHz}$. If the inductance used is $L = 5.0 \, \mu\text{H}$, what is the capacitance $C$ of the circuit?

**Given:**
*   Frequency $f = 1.0 \, \text{MHz} = 1.0 \times 10^6 \, \text{Hz}$
*   Inductance $L = 5.0 \, \mu\text{H} = 5.0 \times 10^{-6} \, \text{H}$

**Want:**
*   Capacitance $C$

**Solution:**

1.  **Relate frequency to angular frequency:**
    The formula for linear frequency is $f = \frac{\omega}{2\pi}$. We need $\omega$ to use in the LC formula.
    $$ \omega = 2\pi f $$
    *   Rearrange the frequency formula to solve for $\omega$.
    $$ \omega = 2\pi (1.0 \times 10^6 \, \text{Hz}) $$
    *   Substitute the given frequency.
    $$ \omega = 2\pi \times 10^6 \, \text{rad/s} $$
    *   Perform the multiplication.

2.  **Use the angular frequency formula to find C:**
    The formula for angular frequency in an LC circuit is $\omega = \frac{1}{\sqrt{LC}}$.
    We need to solve for $C$.
    $$ \omega^2 = \frac{1}{LC} $$
    *   Square both sides to remove the square root.
    $$ C = \frac{1}{L\omega^2} $$
    *   Rearrange the equation to solve for $C$.
    $$ C = \frac{1}{(5.0 \times 10^{-6} \, \text{H})(2\pi \times 10^6 \, \text{rad/s})^2} $$
    *   Substitute the values for $L$ and $\omega$.
    $$ C = \frac{1}{(5.0 \times 10^{-6} \, \text{H})(4\pi^2 \times 10^{12} \, \text{rad}^2/\text{s}^2)} $$
    *   Square the term $(2\pi \times 10^6)$. $(2\pi)^2 = 4\pi^2$. $(10^6)^2 = 10^{12}$.
    $$ C = \frac{1}{ (5.0 \times 4\pi^2) \times (10^{-6} \times 10^{12}) \, \text{H}\cdot\text{rad}^2/\text{s}^2 } $$
    *   Group terms for multiplication.
    $$ C = \frac{1}{ (20\pi^2) \times 10^6 \, \text{H}/\text{s}^2 } $$
    *   Perform the multiplication in the denominator. Note that $\text{H}/\text{s}^2$ is equivalent to Farads (F).
    $$ C \approx \frac{1}{ (20 \times 9.8696) \times 10^6 } \, \text{F} $$
    *   Use $\pi^2 \approx 9.8696$.
    $$ C \approx \frac{1}{ 197.392 \times 10^6 } \, \text{F} $$
    *   Perform the multiplication.
    $$ C \approx \frac{1}{1.97392 \times 10^8} \, \text{F} $$
    *   Rewrite the denominator in scientific notation.
    $$ C \approx 5.066 \times 10^{-9} \, \text{F} $$
    *   Perform the division.

    The capacitance is $\mathbf{C \approx 5.07 \, \text{nF}}$.

**Reflection:** This example requires algebraic manipulation of the frequency formula to solve for an unknown component. It's crucial to correctly handle the squaring of $2\pi f$ and the powers of 10. Forgetting to square $2\pi$ or $10^6$ is a common error.

---

## 6. Common mistakes and traps

1.  **Confusing $\omega$ and $f$:** Students often mix up angular frequency ($\omega$, in rad/s) and linear frequency ($f$, in Hz). Remember $\omega = 2\pi f$. The formula $\frac{1}{\sqrt{LC}}$ gives $\omega$, not $f$.
2.  **Incorrectly using $C$ vs. $1/C$:** In the SHM analogy, $L$ corresponds to $m$, but $1/C$ corresponds to $k$. When writing the differential equation, ensure you have $L\frac{d^2Q}{dt^2} + \frac{1}{C}Q = 0$, not $L\frac{d^2Q}{dt^2} + CQ = 0$.
3.  **Sign errors in current/charge relationship:** The relationship $I = \pm dQ/dt$ can be tricky. If $Q$ is the charge on the plate from which current $I$ flows, then $I = -dQ/dt$. If $Q$ is the charge on the plate *to* which current $I$ flows, then $I = dQ/dt$. Consistency is key.
4.  **Forgetting the square root:** The formula for angular frequency is $\omega = \frac{1}{\sqrt{LC}}$, not $\frac{1}{LC}$. This is a simple but common algebraic error.
5.  **Neglecting units and prefixes:** Always convert milli- ($10^{-3}$), micro- ($10^{-6}$), nano- ($10^{-9}$), etc., to base units (Henries, Farads, Volts, Amperes, Coulombs) before calculations.
6.  **Ignoring initial conditions for phase:** While $\omega = 1/\sqrt{LC}$ is always true for the frequency, the specific functions $Q(t)$ and $I(t)$ depend on the initial state (e.g., $Q(0)$ and $I(0)$) which determines the phase constant $\phi$.
7.  **Assuming ideal components:** In real-world circuits, inductors have resistance, capacitors have leakage, and wires have resistance. This resistance leads to energy dissipation and damped oscillations (an RLC circuit), which means the oscillations eventually die out. The ideal LC circuit assumes zero resistance.

## 7. Textbook-precise explanation

An ideal LC circuit consists of an inductor of inductance $L$ and a capacitor of capacitance $C$ connected in series, devoid of any resistive elements. When such a circuit is initialized with a charged capacitor (or a non-zero current through the inductor), it undergoes undamped sinusoidal oscillations, representing a continuous exchange of energy between the electric field of the capacitor and the magnetic field of the inductor.

Consider a capacitor with an initial charge $Q_0$ at time $t=0$, connected to an inductor. Let $Q(t)$ be the charge on the positive plate of the capacitor at time $t$, and $I(t)$ be the current flowing out of this plate through the inductor. By definition, $I(t) = -\frac{dQ}{dt}$.

Applying Kirchhoff's Voltage Law (KVL) to the series loop, the sum of the voltage drops across the inductor ($V_L$) and the capacitor ($V_C$) must be zero:
$$V_L + V_C = 0$$
The voltage across an inductor is given by $V_L = L\frac{dI}{dt}$, and the voltage across a capacitor is $V_C = \frac{Q}{C}$. Substituting these into the KVL equation:
$$L\frac{dI}{dt} + \frac{Q}{C} = 0$$
Now, substitute $I = -\frac{dQ}{dt}$ into the equation:
$$L\frac{d}{dt}\left(-\frac{dQ}{dt}\right) + \frac{Q}{C} = 0$$
$$-L\frac{d^2Q}{dt^2} + \frac{Q}{C} = 0$$
Rearranging this into the standard form for a second-order linear homogeneous differential equation:
$$\frac{d^2Q}{dt^2} + \frac{1}{LC}Q = 0$$
This equation is mathematically analogous to the differential equation for a simple harmonic oscillator (SHO), $m\frac{d^2x}{dt^2} + kx = 0$, or $\frac{d^2x}{dt^2} + \frac{k}{m}x = 0$.
By comparing these forms, we identify the angular frequency of oscillation, $\omega$, where $\omega^2 = \frac{1}{LC}$. Thus, the natural angular frequency of the LC circuit is:
$$\omega = \frac{1}{\sqrt{LC}}$$
The solution for $Q(t)$ is a sinusoidal function:
$$Q(t) = Q_{max} \cos(\omega t + \phi)$$
where $Q_{max}$ is the maximum charge on the capacitor and $\phi$ is the phase constant, determined by initial conditions.
If at $t=0$, the capacitor is fully charged ($Q(0) = Q_{max}$) and there is no current ($I(0) = 0$), then $\phi=0$, and:
$$Q(t) = Q_{max} \cos(\omega t)$$
The current $I(t)$ is found by differentiating $Q(t)$:
$$I(t) = -\frac{dQ}{dt} = -Q_{max} (-\omega \sin(\omega t)) = \omega Q_{max} \sin(\omega t)$$
The maximum current is $I_{max} = \omega Q_{max}$.

The total energy $U_{total}$ in an ideal LC circuit remains constant. It oscillates between being entirely stored in the capacitor's electric field ($U_C = \frac{1}{2}\frac{Q^2}{C}$) and entirely in the inductor's magnetic field ($U_L = \frac{1}{2}LI^2$):
$$U_{total} = U_C(t) + U_L(t) = \frac{1}{2}\frac{Q(t)^2}{C} + \frac{1}{2}LI(t)^2 = \text{constant}$$
At times when $Q(t) = Q_{max}$ (and $I(t)=0$), $U_{total} = \frac{1}{2}\frac{Q_{max}^2}{C}$.
At times when $I(t) = I_{max}$ (and $Q(t)=0$), $U_{total} = \frac{1}{2}LI_{max}^2$.
Therefore, $\frac{1}{2}\frac{Q_{max}^2}{C} = \frac{1}{2}LI_{max}^2$, which implies $I_{max} = Q_{max}\sqrt{\frac{1}{LC}} = Q_{max}\omega$.

This rigorous treatment establishes the LC circuit as a fundamental example of an electrical harmonic oscillator, providing a cornerstone for understanding resonant phenomena in electronics and electromagnetism.

(Refer to: Griffiths, David J. *Introduction to Electrodynamics*. 4th ed. Pearson, 2013, Chapter 7. Serway, Raymond A., and John W. Jewett Jr. *Physics for Scientists and Engineers*. 10th ed. Cengage Learning, 2018, Chapter 32.)

## 8. ASCII diagrams

Here is a simple representation of an LC circuit:

```text
      L (Inductor)
  +---/\/\/\---+
  |            |
  |            |
 --- C (Capacitor)
 ---           |
  |            |
  +------------+

Figure 1: Basic Series LC Circuit
```

And here is a conceptual diagram illustrating the sinusoidal oscillation of charge and current over time in an ideal LC circuit, assuming the capacitor is initially fully charged at $t=0$:

```text
  Charge Q(t) and Current I(t) in an LC Circuit

  ^
  | Q(t) (blue line)
  | I(t) (red dashed line)
Q0|--+----------------------------------------------------------------------
  |  |                                                                  |
  |  |                                                                  |
  |  |                                                                  |
  |  |                                                                  |
  |  |                                                                  |
  |  |                                                                  |
  |  |             . . . . . . . . . . . . . . . . . . . . . . . . . .  |
  |  |           .                                                     .
  |  |         .                                                     .
  |  |       .                                                     .
  |  |     .                                                     .
  |  |   .                                                     .
  |  | .                                                     .
--+--+--------------------------------------------------------------------> t
  |  | . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
  |  |   .                                                     .
  |  |     .                                                     .
  |  |       .                                                     .
  |  |         .                                                     .
  |  |           .                                                     .
  |  |             . . . . . . . . . . . . . . . . . . . . . . . . . .  |
  |  |                                                                  |
  |  |                                                                  |
  |  |                                                                  |
  |  |                                                                  |
  |  |                                                                  |
-Q0|--+----------------------------------------------------------------------
  |
  v

  Figure 2: Oscillations of Charge Q(t) and Current I(t).
  Q(t) starts at maximum (Q0) and follows a cosine curve.
  I(t) starts at zero, becomes positive, reaches maximum when Q(t) is zero,
  and follows a sine curve (specifically, I(t) = I_max sin(wt) if Q(t) = Q_max cos(wt)).
  The current I(t) is 90 degrees out of phase with the charge Q(t).
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **"LC Oscillation: It's an Electrical Seesaw!"** Imagine a child (charge) on one side of a seesaw (capacitor plate), and a heavy block (magnetic field energy) on the other side (inductor). As the child goes down, the block goes up (capacitor discharges, inductor charges). Then the block pushes the child back up on the *other* side (inductor discharges, capacitor recharges with opposite polarity). The "seesaw" keeps rocking back and forth.
    *   **"LIMB" for LC-SHM Analogy:**
        *   **L** (Inductance) is like **M**ass (inertia).
        *   **C** (Capacitance) is like a **B**ouncy spring (inverse stiffness, $1/k$).
        *   **Q** (Charge) is like **D**isplacement ($x$).
        *   **I** (Current) is like **V**elocity ($v$).
        This helps remember the structural parallels.

2.  **1-3 Formulas/Facts to Overlearn:**
    *   **The Angular Frequency:** $\omega = \frac{1}{\sqrt{LC}}$ (This is the most critical formula for LC circuits).
    *   **The Differential Equation:** $L\frac{d^2Q}{dt^2} + \frac{1}{C}Q = 0$ (Understanding its derivation and structure is key).
    *   **Energy Conservation (Ideal LC):** $U_{total} = \frac{1}{2}\frac{Q^2}{C} + \frac{1}{2}LI^2 = \text{constant}$ (Energy continually swaps between electric and magnetic fields).

3.  **Spaced-Repetition Schedule:**
    *   Review this lesson:
        *   **1 day** from now
        *   **3 days** from now
        *   **7 days** from now
        *   **16 days** from now
        *   **35 days** from now
    *   Actively recall the core ideas, derivations, and formulas during each review session.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the formula for $\omega$, you can always rebuild it from first principles:
    1.  **Start with Kirchhoff's Voltage Law (KVL):** Sum of voltages around the loop is zero. For an LC circuit: $V_L + V_C = 0$.
    2.  **Substitute component voltage definitions:** $V_L = L\frac{dI}{dt}$ and $V_C = \frac{Q}{C}$. This gives $L\frac{dI}{dt} + \frac{Q}{C} = 0$.
    3.  **Relate current to charge:** Remember $I = -\frac{dQ}{dt}$ (assuming $Q$ is charge on the positive plate and $I$ flows out).
    4.  **Substitute $I$ into the KVL equation:** $L\frac{d}{dt}\left(-\frac{dQ}{dt}\right) + \frac{Q}{C} = 0$, which simplifies to $-L\frac{d^2Q}{dt^2} + \frac{Q}{C} = 0$.
    5.  **Rearrange to standard SHM form:** $\frac{d^2Q}{dt^2} + \frac{1}{LC}Q = 0$.
    6.  **Compare to general SHM equation:** $\frac{d^2x}{dt^2} + \omega^2 x = 0$.
    7.  **Identify $\omega^2$ and solve for $\omega$:** $\omega^2 = \frac{1}{LC} \implies \omega = \frac{1}{\sqrt{LC}}$.

## 10. Connections — what this leads to

Understanding LC circuits is crucial because they are the simplest form of an electrical oscillator and serve as a gateway to many advanced concepts:

*   **RLC Circuits (Damped Oscillations and Resonance):** Adding resistance to an LC circuit creates an RLC circuit. This introduces damping, causing oscillations to decay over time. Critically, RLC circuits exhibit *resonance*, where the circuit responds most strongly to an external driving frequency that matches its natural frequency. This phenomenon is vital for tuning radios, filtering signals, and many other applications.
*   **AC Circuits (Alternating Current):** LC circuits are fundamental to understanding how circuits behave with alternating current sources. Concepts like impedance, reactance (the frequency-dependent resistance of capacitors and inductors), and phase relationships between voltage and current become essential.
*   **Electromagnetic Waves:** The oscillating electric and magnetic fields in an LC circuit are a localized, contained version of what happens in electromagnetic waves (like light, radio waves, X-rays). Maxwell's equations describe how oscillating electric fields generate magnetic fields, and vice-versa, allowing energy to propagate through space. An LC circuit can be thought of as a miniature antenna, generating or receiving EM waves.
*   **Antennas and Radio Communication:** Antennas are essentially designed to be resonant LC circuits (or parts of them) that are optimized to efficiently radiate or receive electromagnetic waves at specific frequencies. The ability to tune these circuits (e.g., by changing $C$ or $L$) is how we select different radio stations.
*   **Quantum Harmonic Oscillator:** In quantum mechanics, the simple harmonic oscillator (which the LC circuit is an analog of) is a foundational model for understanding everything from molecular vibrations to the quantization of electromagnetic fields (photons). The mathematical framework developed here reappears in a more abstract form in quantum field theory.
*   **Filters and Signal Processing:** LC circuits are the basis for many types of electronic filters used to process signals, separating desired frequencies from noise or unwanted signals in audio equipment, communication systems, and medical devices.

## 11. Self-check questions

1.  An ideal LC circuit has an inductor of $L = 10 \, \text{mH}$ and a capacitor of $C = 40 \, \mu\text{F}$. If the capacitor is initially charged to $20 \, \text{V}$, what is the maximum current that will flow through the inductor?
2.  Explain, in terms of energy, why the current in an ideal LC circuit does not stop when the capacitor is fully discharged. What is the state of energy storage at that precise moment?
3.  Derive the differential equation for an LC circuit starting from Kirchhoff's Voltage Law. Clearly state your sign conventions for current and charge.
4.  You are designing a radio receiver that needs to tune to a frequency of $100 \, \text{MHz}$. If you have a variable capacitor that can range from $10 \, \text{pF}$ to $100 \, \text{pF}$, what inductance value (or range of values) would you need for your tuning circuit?
5.  Consider an LC circuit where the charge on the capacitor is given by $Q(t) = Q_0 \cos(\omega t)$. Sketch the graphs for the instantaneous electric potential energy in the capacitor ($U_C(t)$) and the instantaneous magnetic potential energy in the inductor ($U_L(t)$) over one full period. Describe the phase relationship between these two energy forms and how they relate to the total energy.