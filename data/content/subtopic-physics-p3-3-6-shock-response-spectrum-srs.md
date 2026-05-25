## What it is
The Shock Response Spectrum (SRS) is a graphical representation of how a transient acceleration (a shock) affects a system. It plots the maximum absolute response—usually acceleration—of a theoretical bank of independent, single-degree-of-freedom (SDOF) spring-mass-damper systems, each tuned to a different natural frequency, when subjected to that same shock input.

## Why it matters
In aerospace, pyrotechnic events (like explosive bolts for stage separation or fairing deployments) send violent, high-frequency shockwaves through the spacecraft. Modeling the exact time-history response of every single circuit board and bracket to this transient is computationally impossible. The SRS allows engineers to define a bounding curve of maximum expected accelerations across all frequencies. If a component is tested and survives the SRS curve, it will survive the actual flight shock.

## When to study it
You must already understand:
1. Second-order linear ordinary differential equations.
2. Single-degree-of-freedom (SDOF) vibrations (natural frequency $\omega_n$, damping ratio $\zeta$).
3. Duhamel's integral (the convolution integral for transient response).

If you cannot write the equation of motion for a spring-mass-damper system under base excitation, stop and review basic mechanical vibrations.

## How to study it (step by step)
1. Write the equation of motion for an SDOF system undergoing base excitation.
2. Express the relative motion EOM in terms of the input base acceleration.
3. Use Duhamel's integral to write the general solution for the system's response to an arbitrary transient input.
4. Define the "maximax" response (the absolute peak value of the response over all time, including after the shock has ended).
5. Calculate the maximax response analytically for a simple step-acceleration input.
6. Plot this maximum response as a function of the natural frequency $f_n$. This plot is the SRS.

## Key ideas, with intuition
**The Tuning Fork Bank**
Do not think of the SRS as a Fourier Transform. A Fourier Transform tells you the frequency content of the *input signal*. An SRS tells you the *peak damage potential* of that signal. 
Imagine a board with thousands of tuning forks attached to it, each with a different pitch (natural frequency $f_n$). You hit the board with a hammer (the shock). The SRS is simply a graph of exactly how hard each tuning fork vibrates. 

**The Equation of Motion**
Let $y(t)$ be the displacement of the base (the spacecraft structure) and $x(t)$ be the displacement of the mass (the sensitive component). The relative displacement is $z(t) = x(t) - y(t)$. The equation of motion is:
$$ m\ddot{x}(t) + c\dot{z}(t) + kz(t) = 0 $$
Substitute $\ddot{x}(t) = \ddot{z}(t) + \ddot{y}(t)$ and divide by $m$:
$$ \ddot{z}(t) + 2\zeta\omega_n \dot{z}(t) + \omega_n^2 z(t) = -\ddot{y}(t) $$
where $\ddot{y}(t)$ is the input shock acceleration. 

**The Maximax Absolute Acceleration**
Engineers usually care about the absolute acceleration of the mass, $\ddot{x}(t)$, because $F=ma$ dictates the internal forces tearing the component apart. For a given input $\ddot{y}(t)$, a given damping $\zeta$, and a specific $\omega_n$, we solve for $\ddot{x}(t)$ and find its absolute peak over all time $t$:
$$ \text{SRS}(f_n) = \max_{t} |\ddot{x}(t, f_n)| $$
where $f_n = \omega_n / 2\pi$.

## Worked example
Let us calculate the SRS for a spacecraft component subjected to a sudden, continuous step acceleration of magnitude $A_0$. Assume the component is undamped ($\zeta = 0$).

1. **Set up the EOM:**
   From the key ideas, the relative motion EOM is:
   $$ \ddot{z}(t) + \omega_n^2 z(t) = -A_0 \quad \text{for } t > 0 $$

2. **Solve for relative displacement $z(t)$:**
   This is a standard 2nd-order ODE with a constant forcing function. Assuming zero initial conditions ($z(0)=0, \dot{z}(0)=0$), the solution is the sum of the homogeneous and particular solutions:
   $$ z(t) = \frac{A_0}{\omega_n^2}(\cos(\omega_n t) - 1) $$

3. **Find absolute acceleration $\ddot{x}(t)$:**
   Differentiate $z(t)$ twice to get relative acceleration:
   $$ \ddot{z}(t) = -A_0 \cos(\omega_n t) $$
   Recall that absolute acceleration $\ddot{x}(t) = \ddot{z}(t) + \ddot{y}(t)$. Since $\ddot{y}(t) = A_0$:
   $$ \ddot{x}(t) = -A_0 \cos(\omega_n t) + A_0 = A_0(1 - \cos(\omega_n t)) $$

4. **Find the maximax response:**
   The function $1 - \cos(\omega_n t)$ oscillates between $0$ and $2$. Therefore, the maximum absolute acceleration is:
   $$ \max |\ddot{x}(t)| = 2A_0 $$

*Reflection:* Notice that $\omega_n$ drops out of the maximum value. For a pure step acceleration, the SRS is a flat horizontal line at $2A_0$ for all frequencies. The sudden step causes the dynamic system to overshoot the steady-state input by a factor of 2. This dynamic amplification is exactly why we use SRS instead of just looking at the peak input acceleration.

## Diagrams

```text
THE SDOF BASE EXCITATION MODEL
      
      |--> x(t) Absolute mass motion
     [m]
      |
     _|_  <-- Spring (k) & Damper (c)
     \ /
      |
   -------
   |Base | --> y(t) Input shock motion
   -------

TYPICAL SHOCK RESPONSE SPECTRUM (Log-Log Scale)

 Peak Accel (G)
 10000 |                              .--------
       |                            /
  1000 |                          /
       |                        /
   100 |                      /
       |                    /
    10 |                  /
       |                /
     1 +---------------------------------------
       10       100      1000     10000   Frequency (Hz)
```

## Memory technique — remember this forever
1. **Mnemonic:** "SRS = **S**weeping a **R**ow of **S**prings." You are sweeping across frequencies, testing a row of springs, and plotting only their worst-case (max) flinching.
2. **Formulas to overlearn:** 
   * The relative EOM: $\ddot{z} + 2\zeta\omega_n \dot{z} + \omega_n^2 z = -\ddot{y}(t)$
   * The SRS definition: $\text{SRS}(f_n) = \max_{t} |\ddot{x}(t, f_n)|$
3. **Spaced-repetition schedule:** Review this derivation and the definitions at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget everything, remember $F=ma$ on a spring-mass system with a moving base. Derive $\ddot{z} + \omega_n^2 z = -\ddot{y}$. Solve for a step input to prove to yourself that dynamic amplification exists (the factor of 2).

## Common mistakes
1. **Assuming SRS is a time-history.** The x-axis is *natural frequency*, not time. An SRS plot tells you nothing about the duration of the shock.
2. **Confusing SRS with FFT.** An FFT breaks a signal into its constituent sine waves. An SRS shows the *response* of physical systems to the signal. They are mathematically distinct; phase information is completely lost in an SRS.
3. **Adding SRS curves linearly.** Because phase data is discarded when you take the absolute maximum, you cannot linearly add the SRS of Shock A to the SRS of Shock B to find the combined shock response.

## Self-check
1. Why does an undamped SDOF system subjected to a step base acceleration experience a peak absolute acceleration of exactly $2A_0$? Explain physically.
2. If you are handed an SRS plot, can you reverse-engineer the exact time-domain shock pulse $\ddot{y}(t)$ that created it? Why or why not?
3. Derive the exact time $t_{peak}$ at which the maximum acceleration occurs for an undamped SDOF system subjected to a rectangular acceleration pulse (magnitude $A_0$) that lasts for a finite duration $T$. (Hint: You must check both during the pulse $t < T$ and after the pulse $t > T$).