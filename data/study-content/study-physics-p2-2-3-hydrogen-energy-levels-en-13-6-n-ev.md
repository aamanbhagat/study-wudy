## 1. What it is — in plain English

Imagine an atom like a tiny solar system, with a heavy nucleus at the center and much lighter electrons orbiting around it. For the simplest atom, Hydrogen, you have just one proton in the nucleus and one electron orbiting it.

Now, here's the crucial part: this electron isn't allowed to orbit at *any* distance or with *any* energy it wants. Instead, it's like our electron is climbing a staircase. It can only stand on the steps, not float in between them. Each "step" represents a specific, allowed energy level.

The formula $E_n = -13.6/n^2 \text{ eV}$ is a special rule that tells us exactly how much energy the electron has when it's on a particular "step" in a hydrogen atom. The '$n$' is just a step number (1 for the first step, 2 for the second, and so on). The 'eV' is a tiny unit of energy, perfect for describing the energies inside atoms. The negative sign means the electron is "stuck" or "bound" to the nucleus, much like a ball at the bottom of a well has negative potential energy relative to the ground.

So, in simple terms, this formula gives us the precise, fixed energies an electron can have in a hydrogen atom, showing us that atomic energy isn't continuous but comes in distinct, quantized packets.

## 2. Why it matters — real-world applications

The understanding of hydrogen energy levels is not just an academic curiosity; it forms the bedrock of modern physics and has profound real-world implications across various fields:

1.  **Spectroscopy and Astronomical Observation:** This is perhaps the most direct application. Every element, including hydrogen, has a unique "fingerprint" of light it absorbs or emits, corresponding to electrons jumping between these specific energy levels. By analyzing the light from distant stars and galaxies (spectroscopy), astronomers can determine their composition, temperature, velocity (via Doppler shift), and even age. For example, the famous Balmer series lines in hydrogen's spectrum are used to classify stars and understand stellar atmospheres. NASA's James Webb Space Telescope heavily relies on spectroscopy to analyze the light from exoplanets and early universe galaxies, searching for hydrogen and other elements.

2.  **Laser Technology:** Lasers (Light Amplification by Stimulated Emission of Radiation) fundamentally depend on electrons transitioning between specific energy levels. While most practical lasers use more complex atoms or molecules, the underlying principle of population inversion and stimulated emission is derived from the quantized energy levels first understood in hydrogen. For instance, in a ruby laser, electrons are excited to higher energy levels and then stimulated to fall back, emitting coherent light. This principle is crucial for applications ranging from barcode scanners and fiber-optic communication to precision cutting in manufacturing and medical surgery.

3.  **Fusion Energy Research:** Understanding how hydrogen atoms behave at extreme temperatures and pressures is vital for developing controlled nuclear fusion, a potential clean energy source. Fusion reactions, like those in the sun, involve hydrogen isotopes (deuterium and tritium). Knowing their energy levels and how they interact with photons and other particles helps scientists design and optimize fusion reactors like ITER (International Thermonuclear Experimental Reactor), aiming to harness the power of the stars on Earth.

4.  **Quantum Computing and Information Science:** The concept of discrete energy levels is a precursor to understanding quantum states, which are the basis of quantum computing. While hydrogen itself isn't a quantum computer, the idea that particles can exist in specific, distinct states (like "on" or "off" in a classical computer, but with quantum superposition) is directly related. Superconducting qubits, for example, exploit quantized energy levels in circuits to create quantum bits.

5.  **Chemical Bonding and Material Science:** Although the hydrogen formula is for a single electron atom, the principles of quantized energy levels extend to more complex atoms and molecules. These energy levels dictate how atoms bond together to form molecules, influencing their chemical properties, reactivity, and the structure of materials. Understanding these levels allows chemists and material scientists to design new materials with desired properties, from semiconductors to catalysts.

## 3. Prerequisites — what you must know first

Before diving deep into hydrogen energy levels, ensure you have a solid grasp of the following foundational concepts:

*   **Classical Mechanics:** Understanding concepts like force, acceleration, velocity, kinetic energy ($KE = \frac{1}{2}mv^2$), and potential energy ($PE$).
*   **Electromagnetism:** Familiarity with Coulomb's Law, describing the electrostatic force between charged particles ($F = k \frac{|q_1 q_2|}{r^2}$), and the concept of electric potential energy ($PE = k \frac{q_1 q_2}{r}$).
*   **Atomic Structure:** Basic knowledge of what an atom is, its constituents (protons, neutrons, electrons), and their respective charges and masses.
*   **Energy and Conservation of Energy:** The principle that energy cannot be created or destroyed, only transformed from one form to another. Understanding total mechanical energy $E = KE + PE$.
*   **Electromagnetic Radiation:** The nature of light as an electromagnetic wave, its properties (wavelength $\lambda$, frequency $f$), and the relationship $c = \lambda f$. Also, the idea that light consists of discrete packets called photons, with energy $E = hf = hc/\lambda$.
*   **Quantization:** The fundamental idea in quantum mechanics that certain physical quantities (like energy, angular momentum) are not continuous but exist only in discrete, specific values.
*   **Units and Conversions:** Familiarity with standard SI units (Joules for energy, meters for distance, seconds for time) and the electronvolt (eV) as a convenient unit for atomic energies ($1 \text{ eV} = 1.602 \times 10^{-19} \text{ J}$).
*   **Basic Algebra:** Proficiency in manipulating equations, solving for unknowns, and working with exponents.

If any of these prerequisites feel shaky, it's highly recommended to review them before proceeding, as they form the essential building blocks for understanding this topic.

## 4. The core idea — step by step

Let's break down the concept of hydrogen energy levels, building from the historical context to the modern understanding.

### ### Step 1: The Failure of Classical Physics (Why we need something new)

*   **Plain English Statement:** According to the physics known before the 20th century (classical physics), an electron orbiting a nucleus should quickly lose energy and spiral into the nucleus, destroying the atom. This clearly doesn't happen, or else everything would collapse!
*   **Concrete Example:** Imagine swinging a charged object on a string. If you swing it fast enough, it will generate electromagnetic waves (like radio waves). This radiation carries energy away from the object. Similarly, a classical electron orbiting a nucleus is an accelerating charge, and classical electromagnetism predicts it should continuously radiate energy.
*   **Formal/Mathematical Version:**
    *   An electron in a circular orbit experiences centripetal acceleration: $a = v^2/r$.
    *   Classical electromagnetism (specifically, Larmor's formula for power radiated by an accelerating charge) states that an accelerating charge radiates energy.
    *   This continuous energy loss would cause the electron's orbit to shrink, and it would spiral into the nucleus in a fraction of a second ($ \approx 10^{-11} \text{ s}$).
*   **What could go wrong:** Assuming that electrons orbit like planets around the sun, without considering the electromagnetic consequences of their charge and acceleration. Classical physics works well for large objects but fails spectacularly at the atomic scale.

### ### Step 2: Bohr's Revolutionary Postulates (Introducing Quantization)

*   **Plain English Statement:** Niels Bohr, in 1913, proposed some radical ideas to fix the classical problem. He suggested that electrons don't radiate energy when in certain special orbits, and that their angular momentum (a measure of how much they're "spinning" around the nucleus) can only take on specific, discrete values.
*   **Concrete Example:** Instead of a ramp where a ball can roll to any height, imagine a staircase. A ball can only rest on the steps, not between them. Bohr's postulates are like saying the electron is only allowed to exist on these "steps."
*   **Formal/Mathematical Version:** Bohr's model for the hydrogen atom rests on three key postulates:
    1.  **Stationary States:** Electrons can exist in certain stable, non-radiating orbits (called "stationary states") without losing energy.
    2.  **Quantized Angular Momentum:** In these stable orbits, the electron's angular momentum ($L$) is quantized, meaning it can only take on integer multiples of $\hbar$ (reduced Planck's constant, $\hbar = h/(2\pi)$).
        $$L = m_e v r = n\hbar \quad \text{for } n = 1, 2, 3, \ldots$$
        where $m_e$ is the electron mass, $v$ is its speed, $r$ is the orbit radius, and $n$ is the principal quantum number.
    3.  **Energy Transitions:** An electron can jump from one stationary state to another by absorbing or emitting a photon whose energy is exactly equal to the energy difference between the two states.
        $$\Delta E = E_{final} - E_{initial} = hf$$
*   **What could go wrong:** Thinking Bohr's model is a complete and perfect description of the atom. It's a semi-classical model, a crucial stepping stone to full quantum mechanics, but it has limitations (e.g., only works for hydrogen-like atoms, doesn't explain spectral line intensities).

### ### Step 3: Deriving the Energy Levels (Conceptual Overview)

*   **Plain English Statement:** By combining Bohr's idea of quantized angular momentum with classical physics' descriptions of forces and energy, we can actually calculate the specific energies for each allowed "step" or orbit.
*   **Concrete Example:** Imagine you know the formula for the potential energy of a ball on a staircase ($PE = mgh$). If you also know that the ball can only be at specific heights ($h_1, h_2, h_3, \ldots$), you can then calculate the specific potential energy at each height.
*   **Formal/Mathematical Version:**
    1.  **Centripetal Force = Coulomb Force:** For a stable circular orbit, the electrostatic attractive force between the electron and the nucleus (proton) provides the necessary centripetal force.
        $$\frac{m_e v^2}{r} = \frac{1}{4\pi\epsilon_0} \frac{e^2}{r^2}$$
        where $e$ is the elementary charge.
    2.  **Solve for $v$ and substitute from Bohr's postulate:** From $L = m_e v r = n\hbar$, we get $v = \frac{n\hbar}{m_e r}$. Substitute this into the force equation to solve for the allowed radii $r_n$.
        $$r_n = \frac{4\pi\epsilon_0 \hbar^2}{m_e e^2} n^2 = a_0 n^2$$
        where $a_0 = 0.0529 \text{ nm}$ is the Bohr radius (the radius of the $n=1$ orbit).
    3.  **Calculate Total Energy:** The total energy $E_n$ is the sum of the kinetic energy ($KE = \frac{1}{2}m_e v^2$) and the electric potential energy ($PE = -\frac{1}{4\pi\epsilon_0} \frac{e^2}{r}$, using infinity as the zero reference).
        $$E_n = KE + PE = \frac{1}{2}m_e v^2 - \frac{1}{4\pi\epsilon_0} \frac{e^2}{r}$$
        Substitute $v$ and $r$ in terms of $n$ into this energy equation.
*   **What could go wrong:** Getting lost in the algebraic details of the full derivation. For now, focus on the *process*: combining classical forces with quantum conditions to arrive at discrete values.

### ### Step 4: The Formula for Hydrogen Energy Levels

*   **Plain English Statement:** After all the calculations, we arrive at a simple formula that gives us the exact energy for each "step" (or principal quantum number, $n$) for the electron in a hydrogen atom.
*   **Concrete Example:** If $n=1$ (the first step, or ground state), the energy is $-13.6 \text{ eV}$. If $n=2$ (the second step, or first excited state), the energy is $-13.6/2^2 = -13.6/4 = -3.4 \text{ eV}$.
*   **Formal/Mathematical Version:** The total energy of the electron in the $n$-th stationary state of a hydrogen atom is given by:
    $$E_n = -\frac{m_e e^4}{8\epsilon_0^2 h^2} \frac{1}{n^2}$$
    When all the fundamental constants ($m_e$, $e$, $\epsilon_0$, $h$) are plugged in, this simplifies to:
    $$E_n = -\frac{2.179 \times 10^{-18}}{n^2} \text{ J}$$
    Or, more commonly and conveniently, in electronvolts (eV):
    $$E_n = -\frac{13.6}{n^2} \text{ eV}$$
    where $n = 1, 2, 3, \ldots$ is the principal quantum number.
*   **What could go wrong:** Forgetting the negative sign, which is crucial for understanding that the electron is bound. Also, mixing up units (Joules vs. electronvolts) without proper conversion.

### ### Step 5: Interpreting the Negative Sign and Units (eV)

*   **Plain English Statement:** The negative sign in the energy formula means the electron is "bound" to the nucleus. It takes energy to pull the electron away and free it. If the energy were zero, the electron would be free, infinitely far from the nucleus. The unit 'eV' (electronvolt) is just a very small, convenient unit for measuring these tiny atomic energies.
*   **Concrete Example:** Think of a ball at the bottom of a well. Its potential energy is negative relative to the ground level. You have to *add* energy to lift it out of the well. Similarly, to "ionize" a hydrogen atom (remove its electron), you need to add $13.6 \text{ eV}$ of energy to an electron in the $n=1$ state.
*   **Formal/Mathematical Version:**
    *   **Negative Energy:** $E < 0$ signifies a bound state, meaning the electron is trapped by the nucleus's electric field. Energy must be supplied to the atom to move the electron to a higher (less negative) energy state or to completely remove it (ionization).
    *   **Zero Energy:** $E = 0$ represents the ionization limit, where the electron is no longer bound to the nucleus and is free.
    *   **Principal Quantum Number ($n$):** $n=1$ is the ground state (lowest energy, most stable). $n=2, 3, \ldots$ are excited states. As $n \to \infty$, $E_n \to 0$.
    *   **Electronvolt (eV):** $1 \text{ eV}$ is the amount of kinetic energy gained by a single electron accelerating through an electric potential difference of one volt.
        $$1 \text{ eV} = 1.602 \times 10^{-19} \text{ J}$$
*   **What could go wrong:** Misinterpreting negative energy as "impossible" or "unstable." It simply means "bound." Also, failing to convert between eV and Joules when necessary for calculations involving Planck's constant ($h$) or photon energy formulas ($E=hf$).

## 5. Worked examples — multiple, with every step shown

### Example 1: Calculating the First Three Energy Levels

**Problem:** Calculate the energy of the electron in the first three allowed energy levels (ground state and first two excited states) of a hydrogen atom, in electronvolts.

**Given:** The formula $E_n = -\frac{13.6}{n^2} \text{ eV}$.
**Want:** $E_1$, $E_2$, and $E_3$.

**Solution:**

1.  **For the ground state ($n=1$):**
    $$E_1 = -\frac{13.6}{(1)^2} \text{ eV}$$
    $$E_1 = -\frac{13.6}{1} \text{ eV}$$
    $$E_1 = -13.6 \text{ eV}$$
    *This is the lowest possible energy an electron can have in a hydrogen atom, indicating it is most tightly bound.*

2.  **For the first excited state ($n=2$):**
    $$E_2 = -\frac{13.6}{(2)^2} \text{ eV}$$
    $$E_2 = -\frac{13.6}{4} \text{ eV}$$
    $$E_2 = -3.4 \text{ eV}$$
    *This is the next allowed energy level. Notice it's less negative, meaning the electron is less tightly bound than in the ground state.*

3.  **For the second excited state ($n=3$):**
    $$E_3 = -\frac{13.6}{(3)^2} \text{ eV}$$
    $$E_3 = -\frac{13.6}{9} \text{ eV}$$
    $$E_3 \approx -1.51 \text{ eV}$$
    *As $n$ increases, the energy levels get closer together and closer to zero, indicating the electron is progressively less bound.*

**Final Answer:**
*   **$E_1 = -13.6 \text{ eV}$**
*   **$E_2 = -3.4 \text{ eV}$**
*   **$E_3 = -1.51 \text{ eV}$**

**Reflection:** This example demonstrates the discrete nature of energy levels and how the energy increases (becomes less negative) as the principal quantum number $n$ increases. The calculation is straightforward application of the formula.

### Example 2: Ionization Energy

**Problem:** What is the minimum energy, in electronvolts, required to ionize a hydrogen atom if its electron is initially in the ground state ($n=1$)? What if it's initially in the $n=3$ state?

**Given:**
*   Initial state $n_{initial} = 1$ (for the first part), $n_{initial} = 3$ (for the second part).
*   Ionization means the electron becomes free, so $n_{final} = \infty$, which means $E_{final} = E_\infty = -\frac{13.6}{\infty^2} = 0 \text{ eV}$.
*   Formula: $E_n = -\frac{13.6}{n^2} \text{ eV}$.
**Want:** $\Delta E_{ionization}$ for $n=1$ and $n=3$.

**Solution:**
Ionization energy is the energy required to move the electron from its initial bound state ($E_{initial}$) to a free state ($E_{final} = 0 \text{ eV}$).
$\Delta E = E_{final} - E_{initial}$

1.  **For initial state $n=1$:**
    *   Calculate initial energy $E_1$:
        $$E_1 = -\frac{13.6}{(1)^2} \text{ eV} = -13.6 \text{ eV}$$
        *This is the energy of the electron in the ground state.*
    *   Calculate the energy required for ionization:
        $$\Delta E_{ionization} = E_{final} - E_{initial}$$
        $$\Delta E_{ionization} = 0 \text{ eV} - (-13.6 \text{ eV})$$
        $$\Delta E_{ionization} = 13.6 \text{ eV}$$
        *We need to *add* $13.6 \text{ eV}$ of energy to free the electron from the ground state.*

2.  **For initial state $n=3$:**
    *   Calculate initial energy $E_3$:
        $$E_3 = -\frac{13.6}{(3)^2} \text{ eV} = -\frac{13.6}{9} \text{ eV} \approx -1.51 \text{ eV}$$
        *This is the energy of the electron in the third energy level.*
    *   Calculate the energy required for ionization:
        $$\Delta E_{ionization} = E_{final} - E_{initial}$$
        $$\Delta E_{ionization} = 0 \text{ eV} - (-1.51 \text{ eV})$$
        $$\Delta E_{ionization} = 1.51 \text{ eV}$$
        *Since the electron is already in a higher energy level (less bound), it requires less energy to ionize it.*

**Final Answer:**
*   To ionize from $n=1$: **$\Delta E_{ionization} = 13.6 \text{ eV}$**
*   To ionize from $n=3$: **$\Delta E_{ionization} = 1.51 \text{ eV}$**

**Reflection:** This example highlights the meaning of the negative energy values. The ionization energy is always positive, representing the energy *input* required to free a bound electron. It also shows that electrons in higher energy levels are easier to ionize.

### Example 3: Energy of an Emitted Photon (Emission)

**Problem:** An electron in a hydrogen atom drops from the $n=4$ energy level to the $n=2$ energy level. Calculate the energy of the photon emitted during this transition, in electronvolts.

**Given:**
*   Initial state $n_{initial} = 4$.
*   Final state $n_{final} = 2$.
*   Formula: $E_n = -\frac{13.6}{n^2} \text{ eV}$.
**Want:** $E_{photon} = \Delta E$.

**Solution:**
The energy of the emitted photon is equal to the absolute difference in energy between the initial and final states.
$E_{photon} = |\Delta E| = |E_{final} - E_{initial}|$

1.  **Calculate the energy of the initial state ($n=4$):**
    $$E_4 = -\frac{13.6}{(4)^2} \text{ eV}$$
    $$E_4 = -\frac{13.6}{16} \text{ eV}$$
    $$E_4 = -0.85 \text{ eV}$$
    *This is the energy of the electron before the transition.*

2.  **Calculate the energy of the final state ($n=2$):**
    $$E_2 = -\frac{13.6}{(2)^2} \text{ eV}$$
    $$E_2 = -\frac{13.6}{4} \text{ eV}$$
    $$E_2 = -3.4 \text{ eV}$$
    *This is the energy of the electron after the transition.*

3.  **Calculate the energy difference:**
    $$\Delta E = E_{final} - E_{initial}$$
    $$\Delta E = (-3.4 \text{ eV}) - (-0.85 \text{ eV})$$
    $$\Delta E = -3.4 \text{ eV} + 0.85 \text{ eV}$$
    $$\Delta E = -2.55 \text{ eV}$$
    *The negative sign here indicates that energy was *emitted* from the atom (the atom lost energy).*

4.  **The energy of the photon:**
    The energy of the photon is always a positive value, representing the magnitude of the energy change.
    $$E_{photon} = |\Delta E| = |-2.55 \text{ eV}|$$
    $$E_{photon} = 2.55 \text{ eV}$$
    *This is the specific energy of the photon that carries away the energy difference.*

**Final Answer:**
*   **$E_{photon} = 2.55 \text{ eV}$**

**Reflection:** This example demonstrates how energy is conserved during transitions. When an electron drops to a lower energy level, it emits a photon with energy equal to the energy difference. The negative sign for $\Delta E$ correctly indicates emission. This specific transition ($n=4 \to n=2$) is part of the Balmer series, which produces visible light.

### Example 4: Wavelength of an Absorbed Photon (Absorption)

**Problem:** What is the wavelength of a photon, in nanometers, that is absorbed by a hydrogen atom, causing its electron to jump from the $n=1$ (ground) state to the $n=3$ state?

**Given:**
*   Initial state $n_{initial} = 1$.
*   Final state $n_{final} = 3$.
*   Formula: $E_n = -\frac{13.6}{n^2} \text{ eV}$.
*   Constants: $h = 4.136 \times 10^{-15} \text{ eV} \cdot \text{s}$ (Planck's constant in eV·s), $c = 3.00 \times 10^8 \text{ m/s}$ (speed of light).
**Want:** Wavelength $\lambda$ in nanometers (nm).

**Solution:**
For absorption, the photon energy must be equal to the positive energy difference required for the electron to jump to a higher level.
$E_{photon} = \Delta E = E_{final} - E_{initial}$
Also, $E_{photon} = \frac{hc}{\lambda}$. We can rearrange this to find $\lambda = \frac{hc}{E_{photon}}$.

1.  **Calculate the energy of the initial state ($n=1$):**
    $$E_1 = -\frac{13.6}{(1)^2} \text{ eV} = -13.6 \text{ eV}$$
    *This is the electron's energy before absorbing the photon.*

2.  **Calculate the energy of the final state ($n=3$):**
    $$E_3 = -\frac{13.6}{(3)^2} \text{ eV} = -\frac{13.6}{9} \text{ eV} \approx -1.511 \text{ eV}$$
    *This is the electron's energy after absorbing the photon.*

3.  **Calculate the energy of the absorbed photon:**
    $$\Delta E = E_{final} - E_{initial}$$
    $$\Delta E = (-1.511 \text{ eV}) - (-13.6 \text{ eV})$$
    $$\Delta E = -1.511 \text{ eV} + 13.6 \text{ eV}$$
    $$\Delta E = 12.089 \text{ eV}$$
    *Since $\Delta E$ is positive, it means energy was *absorbed* by the atom.*
    $$E_{photon} = 12.089 \text{ eV}$$

4.  **Calculate the wavelength of the photon:**
    Use the formula $\lambda = \frac{hc}{E_{photon}}$. It's convenient to use $h$ in eV·s.
    $$\lambda = \frac{(4.136 \times 10^{-15} \text{ eV} \cdot \text{s}) \times (3.00 \times 10^8 \text{ m/s})}{12.089 \text{ eV}}$$
    $$\lambda = \frac{1.2408 \times 10^{-6} \text{ eV} \cdot \text{m}}{12.089 \text{ eV}}$$
    $$\lambda \approx 1.0264 \times 10^{-7} \text{ m}$$
    *The eV units cancel out, leaving meters.*

5.  **Convert wavelength to nanometers:**
    Since $1 \text{ nm} = 10^{-9} \text{ m}$, multiply by $10^9 \text{ nm/m}$.
    $$\lambda = (1.0264 \times 10^{-7} \text{ m}) \times \left(\frac{10^9 \text{ nm}}{1 \text{ m}}\right)$$
    $$\lambda \approx 102.6 \text{ nm}$$
    *This wavelength is in the ultraviolet range, as expected for transitions from the ground state to higher levels (Lyman series).*

**Final Answer:**
*   **$\lambda \approx 102.6 \text{ nm}$**

**Reflection:** This example combines the energy level formula with the photon energy formula. Careful attention to units (especially using $h$ in eV·s) and the sign of $\Delta E$ for absorption/emission is crucial. The final conversion to nanometers is a common step in atomic physics problems.

### Example 5: Energy in Joules for a specific transition

**Problem:** An electron in a hydrogen atom makes a transition from $n=5$ to $n=3$. Calculate the energy of the emitted photon in Joules.

**Given:**
*   Initial state $n_{initial} = 5$.
*   Final state $n_{final} = 3$.
*   Formula: $E_n = -\frac{13.6}{n^2} \text{ eV}$.
*   Conversion: $1 \text{ eV} = 1.602 \times 10^{-19} \text{ J}$.
**Want:** $E_{photon}$ in Joules.

**Solution:**
First, calculate the energy difference in eV, then convert to Joules.

1.  **Calculate the energy of the initial state ($n=5$):**
    $$E_5 = -\frac{13.6}{(5)^2} \text{ eV}$$
    $$E_5 = -\frac{13.6}{25} \text{ eV}$$
    $$E_5 = -0.544 \text{ eV}$$
    *This is the electron's energy before the transition.*

2.  **Calculate the energy of the final state ($n=3$):**
    $$E_3 = -\frac{13.6}{(3)^2} \text{ eV}$$
    $$E_3 = -\frac{13.6}{9} \text{ eV}$$
    $$E_3 \approx -1.511 \text{ eV}$$
    *This is the electron's energy after the transition.*

3.  **Calculate the energy difference ($\Delta E$):**
    $$\Delta E = E_{final} - E_{initial}$$
    $$\Delta E = (-1.511 \text{ eV}) - (-0.544 \text{ eV})$$
    $$\Delta E = -1.511 \text{ eV} + 0.544 \text{ eV}$$
    $$\Delta E = -0.967 \text{ eV}$$
    *The negative sign indicates emission.*

4.  **The energy of the emitted photon ($E_{photon}$):**
    $$E_{photon} = |\Delta E| = 0.967 \text{ eV}$$
    *This is the energy of the photon in electronvolts.*

5.  **Convert the photon energy from electronvolts to Joules:**
    $$E_{photon, J} = E_{photon, eV} \times (1.602 \times 10^{-19} \text{ J/eV})$$
    $$E_{photon, J} = (0.967 \text{ eV}) \times (1.602 \times 10^{-19} \text{ J/eV})$$
    $$E_{photon, J} \approx 1.549 \times 10^{-19} \text{ J}$$
    *The eV units cancel out, leaving Joules.*

**Final Answer:**
*   **$E_{photon} \approx 1.549 \times 10^{-19} \text{ J}$**

**Reflection:** This example emphasizes the importance of unit conversion, especially when dealing with the fundamental constants that are often expressed in SI units (Joules). It's a common requirement to convert between eV and J in more advanced problems.

## 6. Common mistakes and traps

Students often stumble on specific points when working with hydrogen energy levels. Be vigilant for these common errors:

1.  **Forgetting the Negative Sign:** The negative sign in $E_n = -13.6/n^2 \text{ eV}$ is crucial. It signifies that the electron is bound to the nucleus. Omitting it will lead to incorrect energy calculations and misinterpretations of bound vs. free states.
2.  **Incorrectly Using $n^2$:** A frequent mistake is to forget to square the principal quantum number $n$, or to incorrectly square it (e.g., calculating $13.6/2$ instead of $13.6/2^2$). Always double-check that $n$ is squared in the denominator.
3.  **Units Confusion (eV vs. J):** Many problems will require calculations involving Planck's constant ($h$) or the speed of light ($c$), which are typically given in SI units (Joules, meters, seconds). If you use $E_n$ in eV, you must convert it to Joules before using $E=hf$ or $E=hc/\lambda$, or use the appropriate value of $h$ in eV·s. Forgetting this conversion is a major source of error.
4.  **Misinterpreting $\Delta E$ Sign for Absorption/Emission:**
    *   If $\Delta E = E_{final} - E_{initial}$ is **positive**, it means energy was *absorbed* by the atom (electron jumped to a higher energy level).
    *   If $\Delta E = E_{final} - E_{initial}$ is **negative**, it means energy was *emitted* by the atom (electron dropped to a lower energy level).
    The energy of a photon itself is always positive, representing the magnitude of this energy change.
5.  **Confusing Principal Quantum Number ($n$) with Other Quantum Numbers:** While $n$ is the primary quantum number determining energy in the Bohr model, other quantum numbers ($l, m_l, m_s$) exist in a full quantum mechanical description. Don't confuse $n$ with these, or incorrectly use it in contexts where it doesn't apply (e.g., assuming $n$ also defines electron spin).
6.  **Applying the Formula to Non-Hydrogen Atoms:** The formula $E_n = -13.6/n^2 \text{ eV}$ is *specifically* for hydrogen (a single electron orbiting a nucleus with charge $+e$). For hydrogen-like ions (e.g., He$^+$, Li$^{2+}$), the formula becomes $E_n = -13.6 \frac{Z^2}{n^2} \text{ eV}$, where $Z$ is the atomic number (number of protons). For multi-electron atoms, this simple formula does not apply due to electron-electron repulsion and shielding effects.

## 7. Textbook-precise explanation

The energy levels of a hydrogenic atom, as derived from the Bohr model and subsequently confirmed and refined by quantum mechanics, are discrete, quantized values representing the allowed total energies of the electron. For a single-electron atom with atomic number $Z$ (e.g., $Z=1$ for hydrogen, $Z=2$ for He$^+$, $Z=3$ for Li$^{2+}$), the energy of the $n$-th stationary state is given by:

$$E_n = -\frac{Z^2 m_e e^4}{8\epsilon_0^2 h^2 n^2}$$

where:
*   $m_e$ is the electron rest mass ($9.109 \times 10^{-31} \text{ kg}$).
*   $e$ is the elementary charge ($1.602 \times 10^{-19} \text{ C}$).
*   $\epsilon_0$ is the permittivity of free space ($8.854 \times 10^{-12} \text{ F/m}$).
*   $h$ is Planck's constant ($6.626 \times 10^{-34} \text{ J} \cdot \text{s}$).
*   $n$ is the principal quantum number, an integer ($n=1, 2, 3, \ldots$).

Upon substituting the numerical values of these fundamental constants, the expression simplifies to:

$$E_n = -\frac{2.179 \times 10^{-18} Z^2}{n^2} \text{ J}$$

For hydrogen ($Z=1$), this becomes:

$$E_n = -\frac{2.179 \times 10^{-18}}{n^2} \text{ J}$$

It is common practice in atomic physics to express these energies in electronvolts (eV), where $1 \text{ eV} = 1.602 \times 10^{-19} \text{ J}$. Converting the constant factor:

$$\frac{2.179 \times 10^{-18} \text{ J}}{1.602 \times 10^{-19} \text{ J/eV}} \approx 13.60 \text{ eV}$$

Thus, for a hydrogen atom ($Z=1$), the energy levels are precisely given by:

$$E_n = -\frac{13.6}{n^2} \text{ eV}$$

The negative sign indicates that the electron is bound to the nucleus; energy must be supplied to the atom to liberate the electron (i.e., to ionize it). The state $n=1$ corresponds to the ground state, which is the lowest possible energy state and the most stable configuration. States with $n > 1$ are excited states, which are less stable. As $n \to \infty$, $E_n \to 0$, representing the ionization limit where the electron is no longer bound to the nucleus.

Transitions between these discrete energy levels involve the absorption or emission of photons with energy $\Delta E = |E_{final} - E_{initial}|$. This principle explains the characteristic line spectra observed for hydrogen, described by the Rydberg formula. While the Bohr model provides an excellent intuitive and quantitatively accurate description for hydrogenic atoms, a more complete and rigorous treatment requires solving the Schrödinger equation, which naturally yields these quantized energy levels and introduces additional quantum numbers describing the electron's orbital angular momentum and spin.

(Refer to: Serway & Jewett, *Physics for Scientists and Engineers*, 9th ed., Chapter 42, "Atomic Physics"; Griffiths, David J., *Introduction to Quantum Mechanics*, 3rd ed., Chapter 4, "Hydrogen Atom".)

## 8. ASCII diagrams

```text
       E = 0 eV (Ionization Limit)
       -------------------------------------
       |                                   |
       |                                   |  n=∞
       |                                   |
       |                                   |
       |                                   |
       |                                   |
       |                                   |
       |                                   |
       |                                   |
       |                                   |
       |                                   |
       |                                   |
       |                                   |
       ------------------------------------- n=5  E = -0.54 eV
       |                                   |
       |                                   |
       ------------------------------------- n=4  E = -0.85 eV
       |                                   |
       |                                   |
       ------------------------------------- n=3  E = -1.51 eV
       |                                   |
       |                                   |
       |                                   |
       |                                   |
       ------------------------------------- n=2  E = -3.40 eV
       |                                   |
       |                                   |
       |                                   |
       |                                   |
       |                                   |
       |                                   |
       |                                   |
       |                                   |
       |                                   |
       |                                   |
       |                                   |
       |                                   |
       ------------------------------------- n=1  E = -13.60 eV (Ground State)

       Hydrogen Energy Level Diagram

       <-- Example Transitions -->
       ^                         ^
       | Photon Absorption       | Photon Emission
       | (e.g., n=1 to n=3)      | (e.g., n=4 to n=2)
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       |                         |
       -------------------------------------------------------------
       Energy (eV)
```

**Description of Figure:**
The diagram above illustrates the quantized energy levels of a hydrogen atom. The vertical axis represents energy in electronvolts (eV). The horizontal lines represent the allowed discrete energy levels, each labeled with its principal quantum number $n$ and its corresponding energy value $E_n = -13.6/n^2 \text{ eV}$.

*   The lowest line, labeled $n=1$, is the ground state with an energy of $-13.60 \text{ eV}$.
*   Successive lines, $n=2, 3, 4, 5$, represent excited states with progressively higher (less negative) energies.
*   As $n$ increases, the energy levels become closer together.
*   The dashed line at $E=0 \text{ eV}$ represents the ionization limit ($n=\infty$), where the electron is no longer bound to the nucleus.
*   Arrows indicate possible transitions:
    *   An upward arrow (e.g., from $n=1$ to $n=3$) signifies the absorption of a photon, causing the electron to jump to a higher energy level.
    *   A downward arrow (e.g., from $n=4$ to $n=2$) signifies the emission of a photon, as the electron drops to a lower energy level. The length of the arrow is proportional to the energy of the photon.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Imagine a **hydrogen atom** as a **hotel** with very strict rules. The **electron** is a guest, and it can only stay on specific **floors** ($n=1, 2, 3, \ldots$). The **ground floor** ($n=1$) is the cheapest but also the deepest in the "energy well" (most negative energy). To leave the hotel (ionize), you need to pay a "fee" of **13.6 eV**. The higher floors are more expensive (less negative energy) but cost less to leave. The **cost** of staying on any floor is **-$13.60 divided by the square of the floor number ($n^2$)**.

    **Visual:** Picture a tall building. The lowest floor is $n=1$, deep underground, with a sign "$E = -13.6 \text{ eV}$". As you go up, the floors are closer together and the negative numbers get smaller (e.g., $n=2$ is at $-3.4 \text{ eV}$). The roof is "free" ($E=0 \text{ eV}$).

2.  **Formulas/Facts to Overlearn:**
    *   **The Hydrogen Energy Formula:** $E_n = -\frac{13.6}{n^2} \text{ eV}$
    *   **Energy Change in Transitions:** $\Delta E = E_{final} - E_{initial}$ (positive for absorption, negative for emission)
    *   **Photon Energy:** $E_{photon} = \frac{hc}{\lambda} = hf$ (Remember to match units! Use $h \approx 1240 \text{ eV} \cdot \text{nm}$ for quick $\lambda$ in nm from $E$ in eV, or $h = 4.136 \times 10^{-15} \text{ eV} \cdot \text{s}$ for $f$ in Hz).

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review this lesson, especially the core idea and worked examples. Try to re-derive the concept from scratch.
    *   **Day 3:** Reread the "Core Idea" and "Common Mistakes." Work through 1-2 new problems.
    *   **Day 7:** Quickly recall the formula and its meaning. Explain it aloud to yourself.
    *   **Day 16:** Attempt a harder problem involving unit conversions and multiple steps.
    *   **Day 35:** Revisit the "Textbook-Precise Explanation" to solidify your understanding against formal definitions.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the exact form of the formula, you can rebuild it by remembering the core assumptions of the Bohr model:

    1.  **Classical Mechanics:** Start with the electron orbiting the nucleus. The attractive Coulomb force provides the centripetal force:
        $$F_{Coulomb} = F_{centripetal} \implies \frac{1}{4\pi\epsilon_0} \frac{e^2}{r^2} = \frac{m_e v^2}{r}$$
    2.  **Bohr's Quantization of Angular Momentum:** The electron's angular momentum is quantized:
        $$L = m_e v r = n\hbar$$
        From this, solve for $v$ ($v = \frac{n\hbar}{m_e r}$) and substitute it into the force equation. This will allow you to solve for the allowed radii $r_n$.
    3.  **Total Energy:** The total energy is the sum of kinetic and potential energy:
        $$E = KE + PE = \frac{1}{2}m_e v^2 - \frac{1}{4\pi\epsilon_0} \frac{e^2}{r}$$
        Substitute the expressions for $v$ and $r$ (in terms of $n$) back into the total energy equation. After algebraic simplification, you will arrive at the full expression for $E_n$.

## 10. Connections — what this leads to

The concept of hydrogen energy levels is a foundational pillar in physics, leading directly to many advanced topics:

1.  **Quantum Numbers and Atomic Structure:** The principal quantum number $n$ is just the first of a set of four quantum numbers ($n, l, m_l, m_s$) that fully describe an electron's state in an atom. Understanding $E_n$ opens the door to understanding how these other quantum numbers arise from the Schrödinger equation and how they dictate the shape of orbitals, angular momentum, and electron spin.
2.  **Multi-electron Atoms and the Periodic Table:** While the $E_n$ formula is exact only for hydrogen, the *concept* of quantized energy levels extends to all atoms. Electron shielding and inter-electron repulsion modify the energy levels, but the fundamental idea of discrete states explains the Aufbau principle, Hund's rule, and the Pauli exclusion principle, which together dictate the electronic configuration of all elements and thus the entire structure of the periodic table.
3.  **Atomic Spectroscopy and Selection Rules:** The specific energy differences ($\Delta E$) between levels correspond to the precise energies of photons that can be absorbed or emitted. This is the basis of atomic spectroscopy, which allows us to identify elements. Further, not all transitions are allowed; "selection rules" (derived from quantum mechanics) govern which transitions are possible, leading to specific spectral lines.
4.  **Lasers and Stimulated Emission:** The detailed understanding of energy levels and transitions, including the concept of excited states, population inversion, and stimulated emission, is the theoretical basis for all laser technology.
5.  **Molecular Bonding and Chemical Reactions:** When atoms combine to form molecules, their atomic energy levels broaden and combine to form molecular orbitals. The principles of quantized energy levels are essential for understanding chemical bonds, molecular structure, and the energetics of chemical reactions.
6.  **Solid-State Physics and Band Theory:** In solids, the discrete atomic energy levels of individual atoms merge into continuous "energy bands." The gaps between these bands (band gaps) determine whether a material is a conductor, semiconductor, or insulator. This is crucial for understanding electronics, solar cells, and LED technology.
7.  **Quantum Field Theory:** At the most fundamental level, the quantization of energy is a manifestation of quantum fields. The electron in an atom is described by an electron field, and its discrete energy levels arise from the allowed modes of excitation of this field in the presence of the nucleus's electromagnetic field.

## 11. Self-check questions

1.  An electron in a hydrogen atom is in the $n=5$ state. What is its energy in electronvolts?
2.  What is the minimum energy, in Joules, required to excite a hydrogen atom from its second excited state ($n=3$) to the $n=6$ state?
3.  A hydrogen atom emits a photon with an energy of $12.75 \text{ eV}$. If the electron ends up in the ground state ($n=1$), from which initial energy level did it transition?
4.  Calculate the frequency of the photon absorbed when a hydrogen electron jumps from $n=2$ to $n=4$. (Use $h = 6.626 \times 10^{-34} \text{ J} \cdot \text{s}$).
5.  Compare the energy difference between $n=1$ and $n=2$ with the energy difference between $n=2$ and $n=3$. Explain why they are not equal and what this implies about the spacing of energy levels as $n$ increases.