## What it is
Quantum tunneling is a phenomenon where a quantum particle, like an electron, can pass through a potential energy barrier that it classically should not be able to overcome. The particle does not "break" or "go over" the barrier; its wavefunction has a non-zero probability of existing on the other side, so the particle can simply appear there.

## Why it matters
Tunneling is fundamental to nuclear fusion, the process that powers stars; protons must tunnel through their mutual electrostatic repulsion to get close enough to fuse. It is the operating principle behind Scanning Tunneling Microscopes (STMs), which allow us to image individual atoms. In computer science, tunneling sets a physical limit on how small transistors can be, as electrons can tunnel through insulating gates if they are too thin, causing current leakage.

## When to study it
You must be comfortable with the following before proceeding:
1.  **The Time-Independent Schrödinger Equation (TISE):** You should be able to write it down and understand that its solutions, $\psi(x)$, are wavefunctions describing the state of a particle.
2.  **Potential Energy Diagrams:** You need to be able to interpret graphs of potential energy $V(x)$ versus position $x$ for a particle.
3.  **Wavefunctions & Probability Density:** Understand that $\Psi(x,t)$ is the wavefunction, $\psi(x)$ is its spatial part, and $|\psi(x)|^2$ is the probability density of finding the particle at position $x$.
4.  **Complex Exponentials:** Be fluent in using Euler's formula ($e^{i\theta} = \cos\theta + i\sin\theta$) to represent oscillating waves.

If these are not solid, review them first.

## How to study it (step by step)
1.  **Contrast with the Classical Case:** Draw a potential barrier of height $V_0$. Imagine a ball with kinetic energy $E < V_0$ rolling towards it. Classically, it hits the barrier and rolls back with 100% certainty. The probability of finding it on the other side is exactly zero.
2.  **Set up the Quantum Problem:** Consider a square potential barrier of height $V_0$ and width $L$. A beam of particles with mass $m$ and energy $E < V_0$ is incident from the left ($x < 0$).
3.  **Write the TISE for Three Regions:**
    *   Region I ($x < 0$): $V(x) = 0$.
    *   Region II ($0 < x < L$): $V(x) = V_0$.
    *   Region III ($x > L$): $V(x) = 0$.
    The TISE is $-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2} + V(x)\psi = E\psi$. Write it out for each region.
4.  **Solve the TISE in Each Region:**
    *   In Regions I and III, since $E > V(x)$, the solutions are oscillating plane waves: $\psi_I(x) = Ae^{ikx} + Be^{-ikx}$ and $\psi_{III}(x) = Fe^{ikx}$, where $k = \frac{\sqrt{2mE}}{\hbar}$. (Note: there is no reflected wave in Region III).
    *   In Region II, since $E < V_0$, the TISE becomes $\frac{d^2\psi}{dx^2} = \frac{2m(V_0-E)}{\hbar^2}\psi$. The solutions are real exponentials: $\psi_{II}(x) = Ce^{-\kappa x} + De^{\kappa x}$, where $\kappa = \frac{\sqrt{2m(V_0-E)}}{\hbar}$.
5.  **Apply Boundary Conditions:** The wavefunction $\psi(x)$ and its derivative $\psi'(x)$ must be continuous at the boundaries $x=0$ and $x=L$. This gives you a system of four linear equations relating the coefficients A, B, C, D, and F.
6.  **Derive the Transmission Coefficient (T):** The goal is to solve for the ratio $|F|^2/|A|^2$. This ratio, $T$, is the transmission coefficient—the fraction of particles that tunnel through. The full derivation is algebraically intensive, but it yields a precise result.
7.  **Analyze the "Thick Barrier" Approximation:** For many practical cases where the barrier is wide or high ($\kappa L \gg 1$), the transmission coefficient is well-approximated by:
    $$ T \approx 16 \frac{E}{V_0} \left(1 - \frac{E}{V_0}\right) e^{-2\kappa L} $$
    Focus on the exponential term. This tells you that the probability of tunneling decreases exponentially with barrier width $L$ and with the square root of the energy deficit $V_0 - E$.

## Key ideas, with intuition
1.  **The Wavefunction Penetrates the Barrier:** Classically, a particle is forbidden from a region where its total energy $E$ is less than the potential energy $V_0$. Quantum mechanically, the Schrödinger equation still has a valid solution in this region. The solution is not an oscillating wave but an exponentially decaying curve.
    $$ \psi_{II}(x) \propto e^{-\kappa x} $$
    The wavefunction's amplitude decreases inside the barrier, but it doesn't instantly drop to zero.

2.  **Non-Zero Amplitude = Non-Zero Probability:** If the barrier is thin enough, the wavefunction's amplitude is still non-zero when it reaches the other side ($x=L$). Since the probability of finding the particle is proportional to $|\psi|^2$, a non-zero amplitude means a non-zero probability of the particle appearing on the far side.

3.  **Exponential Sensitivity:** The probability of tunneling is extraordinarily sensitive to the barrier's parameters. The dominant term is $e^{-2\kappa L}$.
    $$ T \propto \exp\left(-2L\frac{\sqrt{2m(V_0-E)}}{\hbar}\right) $$
    This means doubling the barrier width $L$ *squares* the suppression factor (e.g., if the probability was $10^{-6}$, it becomes $10^{-12}$). Similarly, a heavier particle (larger $m$) or a higher energy deficit ($V_0-E$) will dramatically decrease the tunneling probability. This exponential dependence is the key quantitative takeaway.

## Worked example
**Problem:** An electron with kinetic energy $E = 5 \text{ eV}$ is incident on a potential barrier of height $V_0 = 10 \text{ eV}$ and width $L = 0.1 \text{ nm}$. Estimate the probability that the electron will tunnel through the barrier.

**Given:**
*   Electron mass, $m_e = 9.11 \times 10^{-31} \text{ kg}$
*   Energy, $E = 5 \text{ eV} = 5 \times (1.602 \times 10^{-19} \text{ J}) = 8.01 \times 10^{-19} \text{ J}$
*   Barrier height, $V_0 = 10 \text{ eV} = 1.602 \times 10^{-18} \text{ J}$
*   Barrier width, $L = 0.1 \text{ nm} = 1.0 \times 10^{-10} \text{ m}$
*   Reduced Planck constant, $\hbar = 1.054 \times 10^{-34} \text{ J} \cdot \text{s}$

**Solution:**

1.  **Verify Tunneling Condition:** We have $E < V_0$ (5 eV < 10 eV), so tunneling is the relevant phenomenon. We can use the thick barrier approximation as a good estimate.

2.  **Calculate the decay constant, $\kappa$:**
    $$ \kappa = \frac{\sqrt{2m_e(V_0 - E)}}{\hbar} $$
    The energy difference is $V_0 - E = 10 \text{ eV} - 5 \text{ eV} = 5 \text{ eV} = 8.01 \times 10^{-19} \text{ J}$.
    $$ \kappa = \frac{\sqrt{2(9.11 \times 10^{-31} \text{ kg})(8.01 \times 10^{-19} \text{ J})}}{1.054 \times 10^{-34} \text{ J} \cdot \text{s}} $$
    $$ \kappa = \frac{\sqrt{1.46 \times 10^{-48} \text{ kg}^2 \cdot \text{m}^2/\text{s}^2}}{1.054 \times 10^{-34} \text{ J} \cdot \text{s}} = \frac{1.208 \times 10^{-24} \text{ kg} \cdot \text{m}/\text{s}}{1.054 \times 10^{-34} \text{ J} \cdot \text{s}} $$
    $$ \kappa \approx 1.146 \times 10^{10} \text{ m}^{-1} $$

3.  **Calculate the exponential term:** The key factor is the dimensionless quantity $2\kappa L$.
    $$ 2\kappa L = 2 \times (1.146 \times 10^{10} \text{ m}^{-1}) \times (1.0 \times 10^{-10} \text{ m}) = 2.292 $$
    The exponential suppression is $e^{-2\kappa L} = e^{-2.292} \approx 0.101$.

4.  **Calculate the Transmission Coefficient, T:** Now use the full approximate formula.
    $$ T \approx 16 \frac{E}{V_0} \left(1 - \frac{E}{V_0}\right) e^{-2\kappa L} $$
    $$ T \approx 16 \left(\frac{5}{10}\right) \left(1 - \frac{5}{10}\right) (0.101) $$
    $$ T \approx 16 (0.5) (0.5) (0.101) = 4 \times 0.101 = 0.404 $$

The probability of the electron tunneling is approximately 40.4%.

**Reflection:**
*   Step 1 confirmed we were in the right regime.
*   Step 2 calculated how *quickly* the wavefunction decays inside the barrier. A larger $\kappa$ means faster decay.
*   Step 3 combined the decay rate with the barrier width to find the total suppression factor. Since $2\kappa L \approx 2.3$, the barrier is "moderately thick," and the approximation is reasonable.
*   Step 4 included the pre-factor, which accounts for reflections at the interfaces, to get the final probability. The dominant effect clearly comes from the exponential term.

## Diagrams

A diagram showing the potential energy $V(x)$ and the real part of the wavefunction $\text{Re}[\psi(x)]$.

```text
       V(x)
        ^
        |
   V_0  +-----------------+
        |                 |
        |     Region II   |
E ------|~~~~~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~~~> x
        |                 |
   V=0  +-----------------+---------
        |<- Region I ->| L |<- Region III ->
        0                 

      Re[psi(x)]
        ^
        |     Incident + Reflected Wave
        |       /V\ /V\ /V\
--/\--/--\/--\/---\/---\------  <-- Exponential decay inside barrier
  /  \/  \  /  \  /  \ | \
 /    \   \/    \/    \|  \
                       |   \     Transmitted Wave (smaller amplitude)
                       |    \       /V\ /V\
                       |     \-----/---\---/---> x
                       |      \   /     \ /
                       |       \ /
        0                 L
```

## Memory technique — remember this forever
1.  **Visual Hook:** The "Ghost Through the Wall". A quantum particle is like a ghost approaching a solid wall. It doesn't need to break the wall or climb over it. Most of its "ghostliness" reflects off, but a small part of its essence *leaks through*. The thicker the wall, the less essence makes it to the other side.

2.  **Formulas to Overlearn:** The approximation is what you use most often. Burn this into memory. The important part is the structure, especially the exponential.
    *   **Transmission Probability:** $T \approx (\text{pre-factor}) \times e^{-2\kappa L}$
    *   **Decay Constant:** $\kappa = \frac{\sqrt{2m(V_0 - E)}}{\hbar}$

3.  **Spaced Repetition Schedule:**
    *   Review this material tomorrow (1 day).
    *   Then in 3 days.
    *   Then in 1 week (7 days).
    *   Then in ~2 weeks (16 days).
    *   Then in ~1 month (35 days).
    Each time, try to re-derive the logic from the TISE.

4.  **First Principles Pathway:** If you forget the formula for $T$, you can always rebuild it.
    *   Start with the Time-Independent Schrödinger Equation.
    *   Write the general solutions in the three regions (oscillating outside, decaying inside).
        *   Region I: $A e^{ikx} + B e^{-ikx}$
        *   Region II: $C e^{-\kappa x} + D e^{\kappa x}$
        *   Region III: $F e^{ikx}$
    *   Enforce continuity of $\psi$ and $\psi'$ at the boundaries ($x=0, x=L$).
    *   Solve the system of four equations for the ratio $F/A$.
    *   The transmission coefficient is $T = |F/A|^2$. This procedure is foolproof.

## Common mistakes
1.  **Energy Conservation Violation Fallacy:** Thinking the particle "loses" energy to get through the barrier. This is false. The particle's energy $E$ is constant throughout the process. It simply appears in a classically forbidden region *with the same energy*.
2.  **Mixing up $k$ and $\kappa$:** Confusing the wave number for the oscillating solution, $k = \sqrt{2mE}/\hbar$, with the decay constant for the tunneling solution, $\kappa = \sqrt{2m(V_0-E)}/\hbar$. The term under the square root determines the character of the solution. If $(E-V) > 0$, it's a wave. If $(E-V) < 0$, it's a real exponential.
3.  **Assuming the Wavefunction is Zero:** Stating that $\psi=0$ inside the barrier. This is the classical mistake. The entire phenomenon relies on the fact that $\psi$ is non-zero and decays exponentially.
4.  **Ignoring the Pre-factor:** While the exponential term is dominant for thick barriers, the pre-factor $16 \frac{E}{V_0}(1-\frac{E}{V_0})$ can be important. It accounts for the initial reflection at the $x=0$ interface. Forgetting it gives an incomplete picture, especially when $E$ is close to $V_0$ or $E$ is very small.

## Self-check
1.  An electron tunnels through a barrier with a probability of $T = 10^{-8}$. If the width of the barrier is doubled, all other factors remaining the same, what is the new approximate tunneling probability?
2.  A proton and a deuteron (one proton, one neutron, so roughly twice the mass) are fired with the same kinetic energy at the same potential barrier. Which particle has a significantly higher probability of tunneling through? Justify your answer using the formula for $\kappa$.
3.  Consider a potential *well* instead of a barrier, where $V(x) = -V_0$ for $0 < x < L$. A particle is incident with energy $E > 0$. What is the functional form of the wavefunction *inside* the well? Will the transmitted wave in Region III have a larger, smaller, or identical amplitude to the incident wave in Region I? Why?