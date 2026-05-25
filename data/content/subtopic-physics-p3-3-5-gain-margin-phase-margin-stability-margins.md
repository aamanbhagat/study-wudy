## What it is
Gain margin (GM) and phase margin (PM) quantify how close a feedback control system is to instability. They measure the exact amount you can increase the system's gain, or increase its phase lag, before the closed-loop system goes completely out of control and diverges. 

## Why it matters
Mathematical models of aerospace vehicles are never perfect. As a rocket burns propellant, its mass drops, which inadvertently increases the system gain. Flight computers and hydraulic actuators introduce unmodeled time delays, which add phase lag. Stability margins guarantee your Guidance, Navigation, and Control (GNC) algorithms are robust enough to handle the difference between the idealized physics model and the messy reality of flight hardware. 

## When to study it
Do not attempt this until you are fluent in:
1. Complex numbers and Euler's formula.
2. Laplace transforms and Transfer Functions.
3. Bode plots (magnitude in decibels, phase in degrees).
4. The Nyquist stability criterion (specifically, mapping the $s$-plane to the $L(s)$-plane).
If you cannot look at $L(s) = \frac{1}{s+1}$ and immediately sketch its Bode plot, return to linear systems theory.

## How to study it (step by step)
1. **Define the Open-Loop System:** Identify the open-loop transfer function $L(s) = C(s)P(s)$, where $C(s)$ is your controller and $P(s)$ is your plant (the rocket). 
2. **Convert to Frequency Domain:** Substitute $s = j\omega$ to get the frequency response $L(j\omega)$.
3. **Find Gain Crossover:** Solve for the gain crossover frequency $\omega_{gc}$ where the magnitude $|L(j\omega)| = 1$ (which is $0$ dB).
4. **Calculate Phase Margin:** Evaluate the phase at $\omega_{gc}$. The PM is how far this angle is from $-180^\circ$.
5. **Find Phase Crossover:** Solve for the phase crossover frequency $\omega_{pc}$ where the phase $\angle L(j\omega) = -180^\circ$ (which is $-\pi$ radians).
6. **Calculate Gain Margin:** Evaluate the magnitude at $\omega_{pc}$. The GM is the reciprocal of this magnitude.
7. **Visualize:** Plot $L(j\omega)$ on a Bode diagram and physically label the margins.

## Key ideas, with intuition
The core of stability margins comes from the closed-loop transfer function:
$$ T(s) = \frac{L(s)}{1 + L(s)} $$
The system goes unstable if the denominator hits zero. This happens when $L(s) = -1$. 
In the frequency domain, the complex number $-1$ has a magnitude of $1$ ($0$ dB) and a phase of $-180^\circ$. **Margins are simply a measure of how far $L(j\omega)$ is from the critical point $(-1, 0)$ on the complex plane.**

*   **Gain Margin (GM):** Imagine you are at the frequency where the phase is already $-180^\circ$. If your magnitude reaches $1$ here, you hit the critical point and crash. The GM is the factor by which you can multiply your current magnitude to reach $1$. 
    $$ GM = \frac{1}{|L(j\omega_{pc})|} $$
*   **Phase Margin (PM):** Imagine you are at the frequency where your magnitude is exactly $1$. If your phase reaches $-180^\circ$ here, you hit the critical point and crash. The PM is the amount of additional phase lag you can tolerate before hitting $-180^\circ$.
    $$ PM = 180^\circ + \angle L(j\omega_{gc}) $$

## Worked example
Let's analyze a spacecraft attitude thruster with a pure time delay. 
Open-loop transfer function: $L(s) = \frac{1}{s} e^{-0.5s}$
*(The $1/s$ is an integrator, typical for torque-to-angular-velocity. The $e^{-0.5s}$ is a 0.5-second processing delay).*

**Step 1: Frequency response**
$$ L(j\omega) = \frac{1}{j\omega} e^{-j 0.5 \omega} $$

**Step 2: Find Gain Crossover ($\omega_{gc}$) and Phase Margin (PM)**
Magnitude: $|L(j\omega)| = \frac{1}{\omega} |e^{-j 0.5 \omega}| = \frac{1}{\omega} (1) = \frac{1}{\omega}$
Set magnitude to $1$: 
$$ \frac{1}{\omega_{gc}} = 1 \implies \omega_{gc} = 1 \text{ rad/s} $$
Phase at $\omega_{gc}$: 
$$ \angle L(j\omega) = \angle\left(\frac{1}{j\omega}\right) + \angle(e^{-j 0.5 \omega}) = -90^\circ - (0.5 \omega \times \frac{180^\circ}{\pi}) $$
At $\omega = 1$:
$$ \angle L(j1) = -90^\circ - \frac{90^\circ}{\pi} \approx -90^\circ - 28.65^\circ = -118.65^\circ $$
Calculate PM:
$$ PM = 180^\circ + (-118.65^\circ) = 61.35^\circ $$
*Reflection: The system has a healthy phase margin. A standard aerospace requirement is $PM \ge 30^\circ$ to $45^\circ$.*

**Step 3: Find Phase Crossover ($\omega_{pc}$) and Gain Margin (GM)**
Set phase to $-180^\circ$:
$$ -90^\circ - \left(0.5 \omega_{pc} \times \frac{180^\circ}{\pi}\right) = -180^\circ $$
$$ 0.5 \omega_{pc} \times \frac{180^\circ}{\pi} = 90^\circ \implies \omega_{pc} = \pi \approx 3.14 \text{ rad/s} $$
Magnitude at $\omega_{pc}$:
$$ |L(j\pi)| = \frac{1}{\pi} \approx 0.318 $$
Calculate GM:
$$ GM = \frac{1}{0.318} = \pi \approx 3.14 $$
In decibels: $GM_{dB} = 20 \log_{10}(\pi) \approx 9.94 \text{ dB}$
*Reflection: We can multiply the system gain by a factor of 3.14 before the spacecraft loses control. Standard aerospace requirement is $GM \ge 6 \text{ dB}$.*

## Diagrams

```text
BODE PLOT MARGINS

Magnitude (dB)
  ^
  |      \
0 |-------+---------\------------------ 0 dB line
  |        \         \  <-- GM measured here (gap to 0 dB)
  |         \         +
  |          \        | \
  +-----------+-------+----------------> Frequency (log w)
             w_gc    w_pc

Phase (deg)
  ^
  |           \
  |            \
  |   PM gap -> +       \
  |             |        \
-180|-----------+---------+------------ -180 deg line
  |                        \
  +-----------+-------+----------------> Frequency (log w)
             w_gc    w_pc
```

## Memory technique — remember this forever
1. **The Mnemonic:** *"Cross the streams."* 
   You evaluate Gain Margin at the Phase crossover. 
   You evaluate Phase Margin at the Gain crossover. 
2. **The Formulas to Overlearn:**
   * $\omega_{gc} \implies |L| = 1 \implies PM = 180^\circ + \angle L$
   * $\omega_{pc} \implies \angle L = -180^\circ \implies GM_{dB} = -20 \log_{10}|L|$
3. **Spaced Repetition Schedule:** Review this concept and re-derive the worked example at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget everything, write $1 + L(j\omega) = 0$. Solve for $L(j\omega) = -1$. Recognize that $-1$ is $1$ in magnitude and $-180^\circ$ in phase. Margins are just the distance from your curve to this exact point.

## Common mistakes
* **Analyzing the closed-loop system:** Students often mistakenly calculate margins using $T(s) = \frac{L(s)}{1+L(s)}$. Margins are *always* calculated on the open-loop transfer function $L(s)$.
* **Sign errors in dB Gain Margin:** If $|L(j\omega_{pc})| = 0.5$, the absolute GM is $2$. In dB, $20\log_{10}(2) = +6$ dB. Many students take $20\log_{10}(0.5) = -6$ dB and report a negative margin. A stable system has a *positive* GM in dB.
* **Mixing up radians and degrees:** When dealing with delays ($e^{-j\omega T}$), the phase $\omega T$ is in radians. You must convert it to degrees before adding it to other phase components.

## Self-check
1. Find the Gain Margin (in absolute terms and dB) and Phase Margin for $L(s) = \frac{10}{s(s+1)}$. *(Hint: Does the phase ever actually reach $-180^\circ$?)*
2. If a system has a Phase Margin of $-10^\circ$, what does that physically mean for the vehicle?
3. Derive the maximum allowable time delay $T_{max}$ for the system $L(s) = \frac{2}{s+1}$ before it becomes unstable.