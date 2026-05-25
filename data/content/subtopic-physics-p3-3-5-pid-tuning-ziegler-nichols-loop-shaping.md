## What it is
PID tuning is the process of selecting the proportional, integral, and derivative gains of a controller to force a dynamic system to behave exactly how you want. Ziegler-Nichols is a classic experimental heuristic that finds these gains by pushing the system to the brink of instability. Loop shaping is a more rigorous, frequency-domain method where you mold the system's open-loop Bode plot to guarantee specific stability margins and response speeds.

## Why it matters
In aerospace, an untuned controller means a rocket engine gimbal oscillates out of control or a drone flips due to wind gusts. Ziegler-Nichols provides a quick, dirty baseline for unknown hardware when you lack a mathematical model. Loop shaping is the industry standard for designing robust flight controllers; it allows you to explicitly balance command tracking against the rejection of high-frequency sensor noise and aerodynamic uncertainties.

## When to study it
Do not attempt this until you have mastered:
1. Laplace transforms and transfer functions.
2. The physical intuition of basic PID control (what P, I, and D terms do to an error signal).
3. Bode plots (magnitude and phase vs. frequency).
4. Closed-loop stability (poles in the left half-plane).
If you cannot draw a Bode plot for a first-order system or do not know what the characteristic equation $1 + C(s)P(s) = 0$ means, stop and review frequency response first.

## How to study it (step by step)
1. Write down the standard PID transfer function in both parallel and standard (ideal) forms. Understand how they map to each other.
2. Derive the closed-loop transfer function for a generic plant $P(s)$ and controller $C(s)$. 
3. Perform a mathematical Ziegler-Nichols test: take a known plant, set $K_i = K_d = 0$, and increase $K_p$ until the roots of the characteristic equation cross the imaginary axis. Record the ultimate gain $K_u$ and ultimate period $T_u$.
4. Apply the Z-N heuristic formulas to find $K_p, T_i, T_d$.
5. Plot the open-loop Bode plot $L(s) = C(s)P(s)$ and identify the gain crossover frequency ($\omega_c$) and phase margin (PM).
6. "Shape" the loop: add an integrator (I) to boost low-frequency gain, and add a derivative (D) to bump up the phase exactly at $\omega_c$.

## Key ideas, with intuition

**The PID Transfer Function**
In standard form, the controller is:
$$C(s) = K_p \left( 1 + \frac{1}{T_i s} + T_d s \right)$$
where $T_i$ is the integral time constant and $T_d$ is the derivative time constant.

**Ziegler-Nichols (The Brink of Chaos)**
If you don't know the plant equations, you turn off I and D, and crank up P until the system oscillates with a constant amplitude. The gain that causes this is the ultimate gain $K_u$, and the period of oscillation is $T_u$. Z-N assumes that scaling these values back by specific ratios (e.g., $K_p = 0.6 K_u$) yields a fast response. It is a heuristic—it usually results in a highly underdamped system (a "quarter-wave decay" where each oscillation is 25% the amplitude of the last).

**Loop Shaping (The Frequency Sculptor)**
Let $L(s) = C(s)P(s)$ be the open-loop transfer function. You want the closed-loop system to track commands and reject noise. 
*   **Low frequencies:** You want $|L(j\omega)| \gg 1$. High gain here means steady-state errors are crushed.
*   **High frequencies:** You want $|L(j\omega)| \ll 1$. Low gain here means high-frequency sensor noise is ignored.
*   **Crossover frequency ($\omega_c$):** Where $|L(j\omega_c)| = 1$ (or 0 dB). This dictates the bandwidth (speed) of the system. Higher $\omega_c$ means faster response.
*   **Phase Margin (PM):** The difference between the phase of $L(j\omega_c)$ and $-180^\circ$. If the phase hits $-180^\circ$ when the gain is 1, the system is marginally stable (oscillates). PM dictates damping; a PM of $45^\circ$ to $60^\circ$ is standard for aerospace.

## Worked example
**Scenario:** Find the Ziegler-Nichols PID gains for the plant $P(s) = \frac{1}{(s+1)^3}$.

**Step 1: Set up the characteristic equation.**
With only proportional control, $C(s) = K_p$. The closed-loop characteristic equation is $1 + C(s)P(s) = 0$:
$$1 + \frac{K_p}{(s+1)^3} = 0 \implies (s+1)^3 + K_p = 0$$
$$s^3 + 3s^2 + 3s + 1 + K_p = 0$$

**Step 2: Find the ultimate gain $K_u$ and frequency $\omega_u$.**
To find marginal stability, substitute $s = j\omega$ (the boundary between stable and unstable):
$$(j\omega)^3 + 3(j\omega)^2 + 3(j\omega) + 1 + K_p = 0$$
$$-j\omega^3 - 3\omega^2 + 3j\omega + 1 + K_p = 0$$
Separate real and imaginary parts. Both must equal zero:
Imaginary: $3\omega - \omega^3 = 0 \implies \omega(\omega^2 - 3) = 0$. 
Since $\omega > 0$ for oscillation, $\omega_u = \sqrt{3}$ rad/s.
Real: $1 + K_p - 3\omega^2 = 0$.
Substitute $\omega^2 = 3$:
$$1 + K_p - 3(3) = 0 \implies K_p = 8$$
Thus, $K_u = 8$. The ultimate period is $T_u = \frac{2\pi}{\omega_u} = \frac{2\pi}{\sqrt{3}}$ seconds.

**Step 3: Apply Z-N rules.**
For a full PID controller, the classic Z-N rules are:
$K_p = 0.6 K_u = 0.6(8) = 4.8$
$T_i = 0.5 T_u = 0.5 \left(\frac{2\pi}{\sqrt{3}}\right) = \frac{\pi}{\sqrt{3}}$
$T_d = 0.125 T_u = 0.125 \left(\frac{2\pi}{\sqrt{3}}\right) = \frac{\pi}{4\sqrt{3}}$

*Reflection:* By evaluating the characteristic equation on the imaginary axis, we analytically derived the exact point of instability, allowing us to bypass the physical experiment and directly calculate the heuristic gains.

## Diagrams

```text
OPEN-LOOP BODE PLOT: LOOP SHAPING
Magnitude (dB)
 ^
 |   \  <-- High gain at low freq (I-term action: crushes steady error)
 |    \
 |     \
0|------\---------------------> Frequency (log w)
 |       \  w_c (Crossover frequency: dictates speed)
 |        \
 |         \ <-- Low gain at high freq (rejects sensor noise)
 |
 
Phase (deg)
 ^
 |
 |              / \  <-- D-term adds a "phase bump" here
-90|           /   \
 |  \         /     \
 |   \       /       \
-180|--\-----/---------\--------> Frequency (log w)
        \   / |< PM >|  \
         \ /             \
          v               v
```
*Notice how the phase bump is deliberately placed at $\omega_c$ to maximize the Phase Margin (PM).*

## Memory technique — remember this forever
1. **Mnemonic for Loop Shaping:** "High Low, Fast Margin." 
   * **High** gain at low freq (tracking).
   * **Low** gain at high freq (noise rejection).
   * Crossover freq = **Fast** (system speed).
   * Phase at crossover = **Margin** (stability/damping).
2. **Formulas to overlearn:** 
   * Standard PID: $C(s) = K_p \left(1 + \frac{1}{T_i s} + T_d s\right)$
   * Characteristic Equation: $1 + C(s)P(s) = 0$
3. **Spaced-repetition schedule:** Review this material at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget Z-N, remember you are just finding where roots cross the imaginary axis. Write $1 + K_p P(s) = 0$, substitute $s = j\omega$, and solve the real and imaginary parts for $K_p$ and $\omega$.

## Common mistakes
1. **Blindly trusting Ziegler-Nichols:** Z-N was designed for chemical plants, not rockets. It often yields a highly oscillatory response (quarter-wave decay). In aerospace, you usually need much higher damping, requiring you to manually lower $K_p$ and increase $T_d$ after a Z-N baseline.
2. **Cranking the D-gain to fix overshoot:** Derivative control amplifies high-frequency noise (since $s$ in the numerator acts as a high-pass filter). If you increase $T_d$ too much, actuator chatter will destroy your hardware.
3. **Confusing open-loop and closed-loop poles:** In loop shaping, you are looking at the Bode plot of the *open-loop* transfer function $L(s)$ to deduce the stability of the *closed-loop* system. 

## Self-check
1. If an unknown system oscillates with a period of 4 seconds at a proportional gain of 12, what are the standard Z-N PID parameters ($K_p, T_i, T_d$)?
2. How does adding a pure integrator (I-term) to a proportional controller affect the phase margin of the open-loop system? Does it increase or decrease stability?
3. Prove that evaluating $1 + C(s)P(s) = 0$ at $s = j\omega$ is mathematically equivalent to finding the frequency where the open-loop Bode plot has a magnitude of 1 and a phase of $-180^\circ$.