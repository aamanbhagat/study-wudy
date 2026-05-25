## What it is
A forced oscillation occurs when a system capable of oscillating (like a mass on a spring) is subjected to a periodic external force. The "driving frequency" is the frequency of this external force. After a short initial period, the system settles into oscillating at the exact same frequency as the driving force, not at its own natural frequency.

## Why it matters
This concept is fundamental to understanding resonance, a phenomenon that appears everywhere. In aerospace, it explains dangerous structural vibrations in aircraft wings and rocket bodies (pogo oscillation) that must be engineered around. In electronics, it's the principle behind tuning a radio or any resonant circuit to a specific frequency. In physics, it's key to understanding how atoms absorb light at specific frequencies and how particle accelerators work.

## When to study it
You must have a solid grasp of these prerequisites first. Do not proceed otherwise.
1.  **Simple Harmonic Motion (SHM):** The solution to the equation $m\ddot{x} + kx = 0$.
2.  **Damped Oscillations:** The solution to $m\ddot{x} + b\dot{x} + kx = 0$. You should understand underdamped, overdamped, and critically damped cases.
3.  **Second-Order Linear Non-homogeneous Differential Equations:** You need to know the method of undetermined coefficients, and the concept that the general solution is the sum of the homogeneous solution (the transient part) and a particular solution (the steady-state part).

## How to study it (step by step)
1.  **Start with the Equation of Motion.** Write down Newton's second law for a damped mass-spring system, but add a sinusoidal driving force on the right-hand side: $m\ddot{x} + b\dot{x} + kx = F_0 \cos(\omega_d t)$. Identify each term: inertia, damping, restoring force, and driving force. $\omega_d$ is the driving frequency.
2.  **Separate the Solution.** Recall that the full solution is $x(t) = x_h(t) + x_p(t)$. The homogeneous part, $x_h(t)$, is the damped oscillation solution you already know. Recognize that this part always decays to zero due to the damping term ($e^{-\gamma t}$). The particular solution, $x_p(t)$, is what remains after the initial transients die out; this is the "steady-state" solution.
3.  **Assume a Steady-State Solution.** We guess that the system will eventually follow the driver. So, assume a particular solution of the form $x_p(t) = A \cos(\omega_d t - \delta)$. Here, $A$ is the steady-state amplitude and $\delta$ is the phase lag. Our goal is to find $A$ and $\delta$ in terms of the system parameters ($m, b, k$) and driving parameters ($F_0, \omega_d$).
4.  **Solve for Amplitude and Phase.** Substitute $x_p(t)$ and its derivatives ($\dot{x}_p$, $\ddot{x}_p$) into the equation of motion. This is algebra-intensive. Use trigonometric identities for $\cos(\omega_d t - \delta)$ and $\sin(\omega_d t - \delta)$. Equate the coefficients of the $\cos(\omega_d t)$ and $\sin(\omega_d t)$ terms on both sides of the equation to solve for the two unknowns, $A$ and $\delta$.
5.  **Analyze the Amplitude Equation.** You will derive an expression for $A$ as a function of $\omega_d$. Plot this function, $A(\omega_d)$. Observe how the amplitude changes as you vary the driving frequency. Notice the peak.
6.  **Find the Resonant Frequency.** Calculate the frequency $\omega_d$ that maximizes the amplitude $A(\omega_d)$ by taking the derivative $dA/d\omega_d$ and setting it to zero. This frequency is the resonant frequency, $\omega_r$. Compare it to the natural frequency $\omega_0 = \sqrt{k/m}$.

## Key ideas, with intuition
1.  **The System Surrenders to the Driver.** A damped oscillator has a "natural" frequency it *wants* to oscillate at. However, an external driving force continuously pumps energy into the system. The damping dissipates energy. After a while, the system's own natural oscillation dies out (the transient response), and it is forced to oscillate at the driver's frequency, $\omega_d$ (the steady-state response).
2.  **Resonance is a Game of Timing.** Imagine pushing a child on a swing. If you push at a random frequency, you'll often be pushing against their motion, and they won't go high. If you time your pushes to match the swing's natural frequency, each push adds more energy, and the amplitude grows dramatically. This is resonance. The driving frequency $\omega_d$ matches the system's natural frequency $\omega_0$.
3.  **Amplitude is a Function of Frequency.** The key result is the formula for the steady-state amplitude:
    $$
    A(\omega_d) = \frac{F_0/m}{\sqrt{(\omega_0^2 - \omega_d^2)^2 + (b\omega_d/m)^2}}
    $$
    Look at the denominator. When the driving frequency $\omega_d$ is close to the natural frequency $\omega_0$, the first term $(\omega_0^2 - \omega_d^2)^2$ becomes very small. If damping ($b$) is also small, the whole denominator becomes small, making the amplitude $A$ huge.
4.  **Phase Lag Tells You Who's Leading.** The displacement $x(t)$ does not peak at the same time as the force $F(t)$. The displacement lags behind the force by a phase angle $\delta$.
    -   At very low frequencies ($\omega_d \ll \omega_0$), the force and displacement are almost in phase ($\delta \approx 0$). You push slowly, the mass moves slowly with you.
    -   At resonance ($\omega_d \approx \omega_0$), the displacement lags the force by a quarter cycle ($\delta = \pi/2$). You are pushing hardest when the mass is moving fastest through equilibrium.
    -   At very high frequencies ($\omega_d \gg \omega_0$), the displacement is almost perfectly out of phase with the force ($\delta \approx \pi$). The mass barely has time to respond before the force reverses; it moves opposite to the push.

## Worked example
A 2 kg mass is attached to a spring with spring constant $k = 200$ N/m and a damper with damping coefficient $b = 16$ Ns/m. It is driven by an external force $F(t) = 10 \cos(8t)$. Find the steady-state amplitude of the oscillation.

**1. Identify parameters.**
- Mass $m = 2$ kg
- Spring constant $k = 200$ N/m
- Damping coefficient $b = 16$ Ns/m
- Driving force amplitude $F_0 = 10$ N
- Driving angular frequency $\omega_d = 8$ rad/s

**2. Calculate system properties.**
- Natural frequency: $\omega_0 = \sqrt{k/m} = \sqrt{200/2} = \sqrt{100} = 10$ rad/s.

**3. Use the steady-state amplitude formula.**
The formula is:
$$
A(\omega_d) = \frac{F_0/m}{\sqrt{(\omega_0^2 - \omega_d^2)^2 + (b\omega_d/m)^2}}
$$

**4. Substitute the values.**
$$
A(8) = \frac{10/2}{\sqrt{((10)^2 - (8)^2)^2 + (16 \cdot 8 / 2)^2}}
$$

**5. Calculate the terms.**
- $F_0/m = 5$
- $\omega_0^2 - \omega_d^2 = 100 - 64 = 36$
- $(\omega_0^2 - \omega_d^2)^2 = 36^2 = 1296$
- $b\omega_d/m = 16 \cdot 8 / 2 = 64$
- $(b\omega_d/m)^2 = 64^2 = 4096$

**6. Final calculation.**
$$
A(8) = \frac{5}{\sqrt{1296 + 4096}} = \frac{5}{\sqrt{5392}} \approx \frac{5}{73.43} \approx 0.068 \text{ m}
$$
The steady-state amplitude is approximately 6.8 cm.

**Reflection:** Each step was a direct application of the derived physics. We identified the inputs, calculated the intrinsic property of the system ($\omega_0$), and then plugged everything into the master formula for amplitude. This shows the predictive power of the model: given the physical setup and the external force, we can precisely calculate the resulting motion.

## Diagrams
Here is an ASCII diagram of the amplitude response curve, showing how the steady-state amplitude $A$ changes with the driving frequency $\omega_d$.

```text
      A (Amplitude)
      ^
      |
      |
      | . . . . . . . . . . . . . . . . . . . . . . . Low Damping (large peak)
      |                                           .
      |                                         .
      |                                        .
      |                                       / \
      |                                      /   \
      |                                     /     \
      | . . . . . . . . . . . . . . . . . ./       \. . . . . . High Damping (small peak)
      |                                  /         \
      |                                 /           \
      |                                /             \
      |_______________________________/_______________\____________> ω_d (Driving Freq)
      0                             ω_r ≈ ω_0
                                   (Resonant Freq)
```
This plot shows that for any given amount of damping, the amplitude is largest when the driving frequency $\omega_d$ is close to the natural frequency $\omega_0$. Less damping leads to a much higher and sharper resonance peak.

## Memory technique — remember this forever
1.  **The Mnemonic:** "The Resonant Swing." Think of pushing a child on a swing.
    -   **Driving Frequency ($\omega_d$):** How often you push.
    -   **Natural Frequency ($\omega_0$):** How often the swing *wants* to swing back and forth on its own.
    -   **Resonance:** Pushing at the swing's natural frequency ($\omega_d = \omega_0$). Each push adds maximum energy. The amplitude gets huge.
    -   **Damping ($b$):** Air resistance and friction in the chain. It's what stops the swing's amplitude from becoming infinite.
    -   **Phase Lag ($\delta$):** To get the biggest swing, you don't push at the very peak of the backswing. You push as the swing passes through the bottom (equilibrium), when it's moving fastest. Your force leads the displacement by $\pi/2$ (a quarter cycle).

2.  **Must-Know Formulas:**
    -   Equation of Motion: $m\ddot{x} + b\dot{x} + kx = F_0 \cos(\omega_d t)$
    -   Steady-State Amplitude: $A(\omega_d) = \frac{F_0/m}{\sqrt{(\omega_0^2 - \omega_d^2)^2 + (b\omega_d/m)^2}}$ where $\omega_0 = \sqrt{k/m}$.

3.  **Spaced Repetition Schedule:** Review this material and re-derive the amplitude formula on this schedule:
    -   Tomorrow (1 day)
    -   In 3 days
    -   In 7 days
    -   In 16 days
    -   In 35 days

4.  **First Principles Pathway:** If you forget the amplitude formula, rebuild it.
    -   Start with $F=ma$: $m\ddot{x} + b\dot{x} + kx = F_0 \cos(\omega_d t)$.
    -   Assume the steady-state solution is $x_p(t) = A \cos(\omega_d t - \delta)$.
    -   Calculate $\dot{x}_p$ and $\ddot{x}_p$.
    -   Substitute all three into the differential equation.
    -   Use the sum-of-angle formula: $\cos(X-Y) = \cos X \cos Y + \sin X \sin Y$.
    -   Group all terms multiplying $\cos(\omega_d t)$ and all terms multiplying $\sin(\omega_d t)$.
    -   The coefficients of these terms must be equal on both sides of the equation. This gives you two equations for two unknowns ($A$ and $\delta$). Solve them. It's just algebra.

## Common mistakes
1.  **Confusing Frequencies.** Students mix up driving frequency ($\omega_d$, external), natural frequency ($\omega_0 = \sqrt{k/m}$, intrinsic to the undamped system), and damped natural frequency ($\omega' = \sqrt{\omega_0^2 - (b/2m)^2}$, the transient frequency). In steady-state, the *only* frequency is $\omega_d$.
2.  **Assuming Resonance is Exactly at $\omega_0$.** The peak amplitude for a *damped* system occurs at the resonant frequency $\omega_r = \sqrt{\omega_0^2 - b^2/(2m^2)}$. This is slightly *less* than $\omega_0$. For low damping, they are very close, but they are not identical.
3.  **Ignoring the Transient Solution.** While we focus on the steady-state, the full motion for $t>0$ includes a decaying transient part. A common mistake is to assume the steady-state solution is valid from $t=0$, which is only true if the initial conditions are just right.

## Self-check
1.  A system has a very high natural frequency ($\omega_0$ is large). What happens to the steady-state amplitude if you drive it with a very low frequency force ($\omega_d \to 0$)? Use the amplitude formula to explain your reasoning.
2.  A 0.5 kg mass on a spring ($k=50$ N/m) is driven by a periodic force. The damping is light. At approximately what driving frequency (in Hz, not rad/s) would you expect the amplitude to be maximal?
3.  Consider the system from the worked example ($m=2, k=200, b=16, F_0=10$). We found the amplitude at $\omega_d = 8$ rad/s. Now, calculate the amplitude at the natural frequency, $\omega_d = \omega_0 = 10$ rad/s. Which amplitude is larger and why?