## What it is
The energy levels of a hydrogen atom are quantized, meaning its single electron can only exist in specific, discrete energy states. The formula $E_n = -\frac{13.6 \text{ eV}}{n^2}$ gives the energy of the state labeled by the principal quantum number $n$, where $n$ is any positive integer ($1, 2, 3, ...$). The negative sign indicates that the electron is bound to the proton.

## Why it matters
This formula is the cornerstone of atomic physics and spectroscopy. Astronomers use it to determine the composition and redshift of distant stars and galaxies by analyzing the light they emit. In engineering, it's fundamental to the design of lasers, which operate by stimulating electrons to transition between these precise energy levels.

## When to study it
Before tackling this, you must have a solid grasp of the following prerequisites. If not, master them first.
1.  **Classical Mechanics:** Newton's Second Law, centripetal force ($F_c = \frac{mv^2}{r}$), and the concepts of kinetic energy ($K = \frac{1}{2}mv^2$) and potential energy.
2.  **Classical Electromagnetism:** Coulomb's Law ($F_e = \frac{k q_1 q_2}{r^2}$) and electrostatic potential energy ($U = \frac{k q_1 q_2}{r}$).
3.  **Introductory Quantum Concepts:** The de Broglie hypothesis ($\lambda = h/p$) and Bohr's postulates for the atom, especially the quantization of angular momentum ($L = n\hbar$).

## How to study it (step by step)
1.  **Start with the forces.** Write down the equation equating the electrostatic Coulomb force between the proton and electron to the centripetal force required for a circular orbit. This is the classical foundation.
2.  **Introduce quantization.** Write down Bohr's postulate for the quantization of angular momentum: $L = m_e v r = n \frac{h}{2\pi} = n\hbar$. This is the key quantum leap. You now have two equations and two unknowns ($v$ and $r$).
3.  **Derive the allowed radii.** Solve the two equations from steps 1 and 2 simultaneously to find an expression for the allowed radii, $r_n$, in terms of $n$ and fundamental constants. Notice that radius is proportional to $n^2$.
4.  **Derive the total energy.** Write the expression for the total energy of the electron: $E = K + U = \frac{1}{2}m_e v^2 - \frac{k e^2}{r}$. Use your force equation from step 1 to show that $K = -\frac{1}{2}U$, which means $E = \frac{1}{2}U = -K$. This is a consequence of the virial theorem for a $1/r$ potential.
5.  **Combine for quantized energy.** Substitute your expressions for the allowed radius $r_n$ (and velocity $v_n$) into your total energy equation. This will yield the final result, $E_n$, in terms of $n$ and fundamental constants.
6.  **Plug in the numbers.** Substitute the values for the electron mass ($m_e$), electron charge ($e$), Coulomb's constant ($k$), and Planck's constant ($\hbar$) to calculate the constant factor. Convert the result from Joules to electron-Volts (eV) to arrive at the familiar $-13.6 \text{ eV}$.

## Key ideas, with intuition
1.  **Bound States Have Negative Energy.** An electron orbiting a proton is in a "potential well." You must *add* energy to it to pull it away. We define the zero point of energy as the state where the electron is infinitely far from the proton and at rest. Since the bound electron has less energy than that, its energy must be negative.
2.  **Quantization as a Standing Wave.** Why are only certain orbits allowed? The de Broglie hypothesis suggests the electron has a wavelength. The only stable orbits are those where an integer number of the electron's wavelengths fit perfectly around the circumference. This creates a constructive, standing wave; any other orbit would lead to destructive interference and is not stable.
    $$2\pi r = n\lambda = n \frac{h}{p} \implies mvr = n\frac{h}{2\pi} \implies L = n\hbar$$
3.  **Energy Levels Get Closer Together.** The formula $E_n = -13.6/n^2$ means the energy gap between successive levels shrinks as $n$ increases. The jump from $n=1$ to $n=2$ is huge ($-13.6 \to -3.4$ eV, a $10.2$ eV gap). The jump from $n=10$ to $n=11$ is tiny ($-0.136 \to -0.112$ eV, a $0.024$ eV gap). This is because the potential well gets flatter at larger distances from the nucleus.

## Worked example
**Problem:** Calculate the wavelength of the photon emitted when an electron in a hydrogen atom transitions from the $n=3$ state to the $n=2$ state.

**Solution:**

1.  **Calculate the initial and final energies.**
    The initial state is $n_i = 3$ and the final state is $n_f = 2$.
    $$E_i = E_3 = \frac{-13.6 \text{ eV}}{3^2} = \frac{-13.6}{9} \approx -1.511 \text{ eV}$$
    $$E_f = E_2 = \frac{-13.6 \text{ eV}}{2^2} = \frac{-13.6}{4} = -3.40 \text{ eV}$$
    *This step applies the core formula to find the energy of each level.*

2.  **Find the energy of the emitted photon.**
    The energy of the photon, $E_{\gamma}$, is equal to the difference in energy between the two levels.
    $$\Delta E = E_i - E_f = (-1.511 \text{ eV}) - (-3.40 \text{ eV}) = 1.889 \text{ eV}$$
    Note that we calculate $E_{initial} - E_{final}$ because the atom *loses* energy, which is carried away by the photon. The photon's energy must be positive.
    *This step uses the principle of conservation of energy.*

3.  **Convert the photon energy from eV to Joules.**
    The relationship between photon energy and wavelength uses SI units.
    $$E_{\gamma} = (1.889 \text{ eV}) \times (1.602 \times 10^{-19} \frac{\text{J}}{\text{eV}}) \approx 3.026 \times 10^{-19} \text{ J}$$
    *This is a crucial unit conversion step.*

4.  **Calculate the wavelength.**
    Use the Planck-Einstein relation, $E = hf = \frac{hc}{\lambda}$.
    $$\lambda = \frac{hc}{E_{\gamma}} = \frac{(6.626 \times 10^{-34} \text{ J}\cdot\text{s})(3.00 \times 10^8 \text{ m/s})}{3.026 \times 10^{-19} \text{ J}}$$
    $$\lambda \approx 6.56 \times 10^{-7} \text{ m} = 656 \text{ nm}$$
    *This final step connects the photon's energy to its wavelength.*

This result is the famous red H-alpha line in the Balmer series, a prominent spectral line in the visible spectrum of hydrogen.

## Diagrams
Here is an energy level diagram for hydrogen. Energy is on the vertical axis. The levels are not evenly spaced; they bunch up as they approach the ionization limit at $E=0$.

```text
       Energy (eV)
         0  ------------------------------------  n=∞ (Ionization)
        ...
        -0.54 ---------------------------------  n=5
        -0.85 ---------------------------------  n=4
        -1.51 ---------------------------------  n=3
                                                 |
                                                 | (Photon emitted)
                                                 v
        -3.40 ---------------------------------  n=2

        
        
        -13.6 ---------------------------------  n=1 (Ground State)
```

## Memory technique — remember this forever
1.  **The Story:** Imagine the electron lives in a "Quantum Hotel". The ground floor is $n=1$, deep in the basement, costing $-13.6$ energy units. Each floor $n$ has a cost given by the formula. To check out of the hotel (ionize), the electron must get to the ground level outside, where the energy cost is $E=0$. The elevator only stops at floors $1, 2, 3, ...$, and the floors get closer and closer together near the top. The cost to move up is the difference in floor "rent".
2.  **Must Overlearn:**
    $$E_n = -\frac{13.6 \text{ eV}}{n^2}$$
    $$\Delta E = E_{initial} - E_{final} = hf = \frac{hc}{\lambda}$$
3.  **Spaced Repetition Schedule:** Review this material and re-derive the main result at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget everything, rebuild it from two facts:
    *   **Force Balance (Classical):** Coulomb force equals centripetal force.
        $$\frac{k e^2}{r^2} = \frac{m_e v^2}{r}$$
    *   **Angular Momentum Quantization (Quantum):**
        $$m_e v r = n\hbar$$
    Solve these for $r$ and $v$. Substitute into the total energy equation $E = \frac{1}{2}m_e v^2 - \frac{k e^2}{r}$. The result will be the energy level formula.

## Common mistakes
1.  **Forgetting the negative sign.** $E_n$ is negative because the electron is bound. A positive energy would mean the electron is unbound and flying away.
2.  **Mixing up initial and final states.** For an emitted photon, the atom's energy decreases, so $n_{initial} > n_{final}$. For an absorbed photon, the atom's energy increases, so $n_{final} > n_{initial}$. The photon energy is always positive, so always take the absolute value of the energy difference: $|\Delta E_{atom}| = E_{photon}$.
3.  **Unit Hell.** Do not mix eV and Joules in the same equation. The formula gives you eV. The formula $\lambda = hc/E$ requires $E$ in Joules. Convert carefully.
4.  **Assuming levels are evenly spaced.** The $1/n^2$ dependence is critical. Drawing an evenly spaced energy diagram is a conceptual error that will lead to incorrect intuition about transition energies.

## Self-check
1.  What is the shortest possible wavelength of a photon that can be *absorbed* by a hydrogen atom in its ground state?
2.  An electron is in the $n=5$ state. It de-excites, eventually reaching the ground state. How many different spectral lines could be produced during this process?
3.  Consider a muonic hydrogen atom, where the electron is replaced by a muon. A muon has the same charge as an electron but is approximately 207 times more massive. Derive the formula for the energy levels of muonic hydrogen and calculate its ground state energy.