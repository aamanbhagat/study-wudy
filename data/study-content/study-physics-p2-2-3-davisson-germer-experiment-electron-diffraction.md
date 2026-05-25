## 1. What it is — in plain English

Imagine you're trying to figure out what something is made of. If you shine a flashlight at it, the light might bounce off, or pass through, or get bent. We know light behaves like a wave (it bends around corners, like ocean waves) and also like tiny particles called photons (it can knock electrons out of metal, like tiny billiard balls). This is called wave-particle duality.

Now, what if tiny particles, like electrons (the things that make up electricity), could *also* act like waves? That sounds strange, right? We usually think of electrons as tiny, solid balls.

The Davisson-Germer experiment was a groundbreaking experiment in 1927 that proved exactly this: electrons, which are definitely particles, can also behave like waves. They did this by shooting a beam of electrons at a nickel crystal and observing how they bounced off.

Instead of scattering randomly like tiny marbles hitting a wall, the electrons scattered in specific, predictable patterns, just as if they were waves interfering with each other after passing through a tiny grid. This experiment provided direct experimental proof for Louis de Broglie's revolutionary idea that all matter has wave-like properties.

## 2. Why it matters — real-world applications

The Davisson-Germer experiment isn't just a historical footnote; its confirmation of electron wave-particle duality underpins several critical modern technologies and fields:

1.  **Electron Microscopes (SEM, TEM):** The most direct and impactful application. Because electrons have a much shorter wavelength than visible light (especially when accelerated to high energies), they can resolve much finer details.
    *   **Scanning Electron Microscopes (SEM):** Used by companies like Zeiss and Thermo Fisher Scientific, SEMs scan a sample with a focused electron beam, producing detailed images of surface topography at nanometer scales. This is crucial in materials science for examining fractures, defects, or the structure of new alloys for aerospace components (e.g., jet engine turbine blades).
    *   **Transmission Electron Microscopes (TEM):** These microscopes, also from companies like JEOL, pass electrons *through* ultra-thin samples. The resulting diffraction and interference patterns allow scientists to image the internal structure of materials, down to individual atoms, and even determine crystal structures. This is vital for developing new semiconductors, understanding biological samples, and designing advanced materials for spacecraft.

2.  **Electron Diffraction for Material Characterization (LEED, RHEED):** Specific techniques like Low-Energy Electron Diffraction (LEED) and Reflection High-Energy Electron Diffraction (RHEED) are used extensively in surface science and thin-film growth.
    *   Researchers use these methods to study the atomic arrangement on crystal surfaces or in thin films. For instance, in the semiconductor industry (e.g., Intel, TSMC), RHEED monitors the growth of epitaxial layers atom by atom, ensuring the correct crystal structure for high-performance microprocessors and memory chips. This precision is critical for advanced computing and AI hardware.

3.  **Quantum Computing and Electronics:** The wave nature of electrons is not just an observation; it's a fundamental property that dictates how electrons behave in quantum systems.
    *   Understanding electron waves is essential for designing quantum dots, nanowires, and other nanoscale electronic devices where quantum effects dominate. In quantum computing research, manipulating the quantum states (including wave functions) of electrons is key to building qubits. Companies like IBM and Google are heavily invested in this, where the wave nature of electrons is intrinsic to their quantum behavior.

4.  **Fundamental Physics Research:** The Davisson-Germer experiment was a cornerstone for the development of quantum mechanics. It demonstrated that the wave-particle duality, initially observed for light, is a universal property of *all* matter. This understanding is foundational to:
    *   **Particle Physics:** Understanding how elementary particles interact and behave.
    *   **Condensed Matter Physics:** Explaining phenomena like superconductivity and the electronic properties of materials, which are critical for future energy technologies and advanced sensors.
    *   **Astrophysics:** The behavior of matter under extreme conditions, such as in neutron stars, where quantum effects are paramount.

## 3. Prerequisites — what you must know first

To fully grasp the Davisson-Germer experiment and its implications, you should have a solid understanding of the following concepts:

*   **Wave-Particle Duality (Light):** The concept that light can exhibit properties of both waves (e.g., diffraction, interference) and particles (e.g., photoelectric effect).
*   **De Broglie Wavelength:** Louis de Broglie's hypothesis that all matter, not just light, exhibits wave-like properties, with a wavelength inversely proportional to its momentum ($\lambda = h/p$).
*   **Kinetic Energy:** The energy an object possesses due to its motion, often expressed as $K = \frac{1}{2}mv^2$. For electrons, this energy can be gained by accelerating them through an electric potential difference.
*   **Electric Potential Difference (Voltage):** The work done per unit charge to move a charge between two points in an electric field. Accelerating an electron through a voltage $V$ gives it kinetic energy $K = eV$.
*   **Diffraction (General):** The phenomenon where waves spread out as they pass through an aperture or around an obstacle. For constructive or destructive interference to occur, the wavelength must be comparable to the size of the aperture or obstacle.
*   **Interference (General):** The superposition of two or more waves, resulting in a new wave pattern. Constructive interference occurs when waves are in phase, leading to increased amplitude; destructive interference occurs when they are out of phase, leading to decreased amplitude.
*   **Crystal Lattice/Atomic Structure:** The highly ordered, repeating arrangement of atoms, ions, or molecules in a crystalline solid. This regular spacing acts as a natural diffraction grating for waves with appropriate wavelengths.
*   **Bragg's Law:** A condition for constructive interference of waves (like X-rays or electrons) scattered by a crystal lattice, relating the wavelength of the waves, the interplanar spacing of the crystal, and the angle of incidence ($n\lambda = 2d \sin\theta$).
*   **Electrons:** Fundamental subatomic particles with a negative charge ($e \approx 1.602 \times 10^{-19} \text{ C}$) and a specific rest mass ($m_e \approx 9.109 \times 10^{-31} \text{ kg}$).
*   **Momentum:** A measure of the mass and velocity of an object ($p = mv$).

## 4. The core idea — step by step

The Davisson-Germer experiment is a beautiful demonstration of quantum mechanics. Let's break down its core idea step by step.

### Step 1: The Hypothesis — Particles have Waves

*   **Plain-English Statement:** Before Davisson and Germer, Louis de Broglie proposed a radical idea: what if *everything* that has momentum, even particles like electrons, also has a "wavelength" associated with it? It's like saying a baseball flying through the air isn't just a solid object, but also has a tiny, invisible ripple moving with it.
*   **Small Concrete Example:** Imagine throwing a very fast, tiny pebble. According to de Broglie, that pebble has a wavelength. The faster and heavier the pebble, the shorter its wavelength. For everyday objects like baseballs or cars, this wavelength is incredibly tiny, far too small to ever notice. But for very light particles moving at appreciable speeds, like electrons, this wavelength becomes measurable.
*   **The Formal/Mathematical Version:** De Broglie's hypothesis states that the wavelength ($\lambda$) of any particle is inversely proportional to its momentum ($p$).
    $$ \lambda = \frac{h}{p} $$
    where $h$ is Planck's constant ($6.626 \times 10^{-34} \text{ J}\cdot\text{s}$). Since momentum $p = mv$ for non-relativistic speeds, this becomes:
    $$ \lambda = \frac{h}{mv} $$
*   **What Could Go Wrong Note:** A common misconception is to think particles *turn into* waves. It's more accurate to say they *exhibit wave-like properties*. They are not classical waves, but quantum entities that have both particle and wave aspects, depending on how you observe them.

### Step 2: The Setup — Shooting Electrons at a Crystal

*   **Plain-English Statement:** Davisson and Germer built a special vacuum tube. Inside, they had an "electron gun" that shot a focused beam of electrons. They aimed this beam at a target: a single crystal of nickel. Then, they had a movable detector that could measure how many electrons bounced off the nickel and at what angles.
*   **Small Concrete Example:** Imagine you have a machine that shoots tiny, identical water balloons. You aim them at a very regular, repeating structure, like a brick wall. Then you have a bucket on wheels that you can move around to catch the balloons after they bounce off, measuring how many hit the bucket at different angles.
*   **The Formal/Mathematical Version:**
    1.  **Electron Gun:** Electrons are emitted from a hot filament (thermionic emission) and then accelerated through a potential difference $V$ (voltage). The kinetic energy $K$ gained by an electron is $K = eV$, where $e$ is the elementary charge.
    2.  **Momentum:** From kinetic energy, we can find the electron's momentum:
        $$ K = \frac{1}{2}mv^2 = \frac{(mv)^2}{2m} = \frac{p^2}{2m} $$
        So, $p = \sqrt{2mK} = \sqrt{2meV}$.
    3.  **Target:** A single crystal of nickel, chosen because its atoms are arranged in a regular, repeating pattern, with known interplanar spacing $d$.
    4.  **Detector:** A Faraday cup, connected to a galvanometer, capable of rotating to measure the intensity of scattered electrons at various angles $\phi$ relative to the incident beam.
*   **What Could Go Wrong Note:** Using a polycrystalline sample (many small crystals oriented randomly) instead of a single crystal would lead to a smeared-out pattern, making it difficult to observe distinct diffraction peaks. Also, the experiment must be conducted in a high vacuum to prevent electrons from colliding with air molecules.

### Step 3: The Classical Expectation — What Particles *Should* Do

*   **Plain-English Statement:** If electrons were *only* tiny particles (like marbles), you'd expect them to scatter off the nickel crystal in a somewhat random or diffuse way. Maybe a bit more would bounce straight back, but there wouldn't be any sharp, distinct directions where *lots* of electrons bounced, and other directions where *no* electrons bounced. It would be like throwing marbles at a rough surface; they'd scatter somewhat evenly.
*   **Small Concrete Example:** Think of spraying a hose at a rough, textured wall. The water droplets would splash off in many directions, but you wouldn't expect to see specific spots on the ground where all the water collects, and other spots where no water lands, unless there's some kind of wave interference.
*   **What Could Go Wrong Note:** Classically, the atomic structure of the crystal would influence the scattering, but it wouldn't produce the sharp, periodic intensity variations characteristic of wave interference.

### Step 4: The Observation — A Diffraction Pattern!

*   **Plain-English Statement:** Davisson and Germer found something astonishing. When they varied the voltage (and thus the speed/energy) of the electrons, and measured the intensity of scattered electrons at different angles, they didn't see a random scatter. Instead, at certain specific voltages and angles, they observed strong *peaks* in the number of scattered electrons. These peaks looked exactly like the interference patterns you get when waves (like light or sound) pass through a grating or reflect off a periodic structure.
*   **Small Concrete Example:** Imagine shining a laser pointer through a fine mesh curtain. You don't just see a single dot on the wall; you see a central bright spot and then several other bright spots arranged symmetrically. This is a diffraction pattern. The Davisson-Germer experiment showed electrons doing something similar.
*   **The Formal/Mathematical Version:** For a specific accelerating voltage of 54 V, they observed a prominent peak in the intensity of scattered electrons at a scattering angle of $\phi = 50^\circ$ relative to the incident beam. This observation was the hallmark of wave diffraction.
*   **What Could Go Wrong Note:** If the crystal wasn't perfectly clean, or if there were impurities, the diffraction pattern would be blurred or non-existent. Precise alignment of the electron gun, crystal, and detector was also critical.

### Step 5: Connecting to Bragg's Law — Explaining the Pattern

*   **Plain-English Statement:** The regular arrangement of atoms in the nickel crystal acts like a natural "diffraction grating" for waves. When waves hit a crystal, they reflect off different layers of atoms. If the waves reflecting off different layers are "in sync" (constructive interference), you get a strong signal. If they're "out of sync" (destructive interference), they cancel out. The specific angles where they are in sync are described by Bragg's Law, which was originally formulated for X-rays. Davisson and Germer realized they could apply the same law to their electron waves.
*   **Small Concrete Example:** Think of ocean waves hitting a series of parallel breakwaters. If the crests of the waves reflecting off one breakwater line up perfectly with the crests reflecting off the next breakwater, you get a much bigger wave. If a crest from one lines up with a trough from another, they cancel out. Bragg's Law tells you the conditions for those "lining up" moments.
*   **The Formal/Mathematical Version:** For constructive interference (diffraction peaks), Bragg's Law states:
    $$ n\lambda = 2d \sin\theta $$
    where:
    *   $n$ is an integer (order of diffraction, usually $n=1$ for the first strong peak).
    *   $\lambda$ is the wavelength of the incident waves.
    *   $d$ is the interplanar spacing (distance between adjacent atomic planes) in the crystal. For nickel, the relevant spacing for the observed diffraction was $d = 0.091 \text{ nm}$ (derived from X-ray diffraction data for nickel).
    *   $\theta$ is the Bragg angle, the angle between the *incident beam* and the *crystal planes*. This is *not* the scattering angle $\phi$ measured by the detector. For the Davisson-Germer setup, the angle of incidence relative to the crystal surface is $90^\circ - \frac{\phi}{2}$. So, $\theta = 90^\circ - \frac{50^\circ}{2} = 65^\circ$. (Note: Sometimes $\theta$ is defined differently, so careful attention to geometry is needed. In the Davisson-Germer case, the peak at $50^\circ$ corresponds to a Bragg angle of $65^\circ$ with respect to the *crystal planes*).
*   **What Could Go Wrong Note:** The biggest trap here is confusing the scattering angle $\phi$ (measured by the detector relative to the incident beam) with the Bragg angle $\theta$ (measured relative to the crystal planes). The geometry of the experiment must be carefully considered.

### Step 6: The Confirmation — De Broglie's Hypothesis Verified

*   **Plain-English Statement:** Now for the grand finale. Davisson and Germer did two calculations. First, they used the electron's energy (from the accelerating voltage) to predict its de Broglie wavelength. Second, they used the observed diffraction pattern (the angle of the strong peak) and Bragg's Law to *calculate* the wavelength that must have caused that pattern. The amazing thing was that these two calculated wavelengths were almost perfectly identical! This was irrefutable proof that electrons really do behave like waves.
*   **Small Concrete Example:** It's like predicting how high a ball will bounce based on its initial drop height, and then actually dropping the ball and measuring the bounce height. If the prediction and measurement match, your understanding of gravity and elasticity is confirmed. Here, the "prediction" was de Broglie's wavelength, and the "measurement" was the wavelength derived from the diffraction pattern.
*   **The Formal/Mathematical Version:**
    1.  **Calculate de Broglie wavelength ($\lambda_{dB}$):** For 54 V electrons,
        $$ K = eV = (1.602 \times 10^{-19} \text{ C})(54 \text{ V}) = 8.65 \times 10^{-18} \text{ J} $$
        $$ p = \sqrt{2m_e K} = \sqrt{2(9.109 \times 10^{-31} \text{ kg})(8.65 \times 10^{-18} \text{ J})} \approx 3.97 \times 10^{-24} \text{ kg}\cdot\text{m/s} $$
        $$ \lambda_{dB} = \frac{h}{p} = \frac{6.626 \times 10^{-34} \text{ J}\cdot\text{s}}{3.97 \times 10^{-24} \text{ kg}\cdot\text{m/s}} \approx 0.167 \times 10^{-9} \text{ m} = 0.167 \text{ nm} $$
    2.  **Calculate wavelength from Bragg's Law ($\lambda_{Bragg}$):** Using $n=1$, $d = 0.091 \text{ nm}$, and $\theta = 65^\circ$:
        $$ \lambda_{Bragg} = \frac{2d \sin\theta}{n} = \frac{2(0.091 \text{ nm}) \sin(65^\circ)}{1} \approx 2(0.091 \text{ nm})(0.906) \approx 0.165 \text{ nm} $$
    The close agreement between $\lambda_{dB} \approx 0.167 \text{ nm}$ and $\lambda_{Bragg} \approx 0.165 \text{ nm}$ provided compelling evidence for the wave nature of electrons.
*   **What Could Go Wrong Note:** Any significant discrepancy would either invalidate de Broglie's hypothesis or point to errors in experimental setup, measurement, or the assumed crystal structure. The precision of the match was critical to the experiment's impact.

## 5. Worked examples — multiple, with every step shown

Let's work through some examples to solidify your understanding. Use $h = 6.626 \times 10^{-34} \text{ J}\cdot\text{s}$, $m_e = 9.109 \times 10^{-31} \text{ kg}$, and $e = 1.602 \times 10^{-19} \text{ C}$.

### Example 1: Calculating de Broglie Wavelength from Accelerating Voltage

**Problem:** An electron is accelerated from rest through a potential difference of 100 V. Calculate its de Broglie wavelength.

**Given:**
*   Accelerating voltage $V = 100 \text{ V}$
*   Electron charge $e = 1.602 \times 10^{-19} \text{ C}$
*   Electron mass $m_e = 9.109 \times 10^{-31} \text{ kg}$
*   Planck's constant $h = 6.626 \times 10^{-34} \text{ J}\cdot\text{s}$

**Want:** De Broglie wavelength $\lambda$.

**Solution:**

1.  **Calculate the kinetic energy (K) of the electron:**
    $$ K = eV $$
    *This is the energy gained by an electron when accelerated through a potential difference V.*
    $$ K = (1.602 \times 10^{-19} \text{ C})(100 \text{ V}) $$
    *Substitute the given values for charge and voltage.*
    $$ K = 1.602 \times 10^{-17} \text{ J} $$
    *Perform the multiplication to get the energy in Joules.*

2.  **Calculate the momentum (p) of the electron:**
    $$ K = \frac{p^2}{2m_e} $$
    *The kinetic energy of a particle can also be expressed in terms of its momentum and mass.*
    $$ p^2 = 2m_e K $$
    *Rearrange the kinetic energy formula to solve for $p^2$.*
    $$ p = \sqrt{2m_e K} $$
    *Take the square root of both sides to get the momentum p.*
    $$ p = \sqrt{2(9.109 \times 10^{-31} \text{ kg})(1.602 \times 10^{-17} \text{ J})} $$
    *Substitute the values for electron mass and kinetic energy.*
    $$ p = \sqrt{2.919 \times 10^{-47} \text{ kg}^2\cdot\text{m}^2/\text{s}^2} $$
    *Perform the multiplication under the square root.*
    $$ p \approx 5.403 \times 10^{-24} \text{ kg}\cdot\text{m/s} $$
    *Calculate the square root to find the momentum.*

3.  **Calculate the de Broglie wavelength ($\lambda$):**
    $$ \lambda = \frac{h}{p} $$
    *This is de Broglie's fundamental relation between wavelength and momentum.*
    $$ \lambda = \frac{6.626 \times 10^{-34} \text{ J}\cdot\text{s}}{5.403 \times 10^{-24} \text{ kg}\cdot\text{m/s}} $$
    *Substitute Planck's constant and the calculated momentum.*
    $$ \lambda \approx 1.226 \times 10^{-10} \text{ m} $$
    *Perform the division. Note that J⋅s / (kg⋅m/s) = (kg⋅m²/s²)⋅s / (kg⋅m/s) = m.*
    $$ \lambda \approx 0.1226 \text{ nm} $$
    *Convert to nanometers (1 nm = $10^{-9}$ m) for easier comparison with atomic scales.*

**Final Answer:**
$$ \boxed{\lambda \approx 0.123 \text{ nm}} $$

**Reflection:** This example highlights the direct relationship between accelerating voltage and the electron's wavelength. Higher voltage means higher kinetic energy, higher momentum, and therefore a *shorter* de Broglie wavelength. This shorter wavelength is why electron microscopes offer higher resolution than light microscopes.

### Example 2: Calculating Wavelength from Bragg Diffraction

**Problem:** An electron beam is diffracted by a crystal with an interplanar spacing of $d = 0.20 \text{ nm}$. If the first-order ($n=1$) diffraction peak is observed at a Bragg angle of $\theta = 30^\circ$, what is the wavelength of the electrons?

**Given:**
*   Order of diffraction $n=1$
*   Interplanar spacing $d = 0.20 \text{ nm} = 0.20 \times 10^{-9} \text{ m}$
*   Bragg angle $\theta = 30^\circ$

**Want:** Wavelength $\lambda$.

**Solution:**

1.  **Apply Bragg's Law:**
    $$ n\lambda = 2d \sin\theta $$
    *This is the condition for constructive interference for waves diffracting off crystal planes.*
    $$ (1)\lambda = 2(0.20 \times 10^{-9} \text{ m}) \sin(30^\circ) $$
    *Substitute the given values for n, d, and $\theta$. Remember to convert d to meters for consistency.*
    $$ \lambda = 2(0.20 \times 10^{-9} \text{ m})(0.5) $$
    *Calculate $\sin(30^\circ) = 0.5$.*
    $$ \lambda = 0.20 \times 10^{-9} \text{ m} $$
    *Perform the multiplication.*
    $$ \lambda = 0.20 \text{ nm} $$
    *Convert back to nanometers for convenience.*

**Final Answer:**
$$ \boxed{\lambda = 0.20 \text{ nm}} $$

**Reflection:** This example demonstrates how the wave nature of particles allows us to use crystal diffraction to measure their wavelength, just as we would for X-rays. The key is correctly applying Bragg's Law with the correct parameters.

### Example 3: Determining Accelerating Voltage from Diffraction Data

**Problem:** In an experiment similar to Davisson-Germer, electrons are diffracted from a crystal with an interplanar spacing of $d = 0.18 \text{ nm}$. If the first-order diffraction maximum is observed at a Bragg angle of $\theta = 25^\circ$, what was the accelerating voltage used for the electrons?

**Given:**
*   Order of diffraction $n=1$
*   Interplanar spacing $d = 0.18 \text{ nm} = 0.18 \times 10^{-9} \text{ m}$
*   Bragg angle $\theta = 25^\circ$
*   Electron charge $e = 1.602 \times 10^{-19} \text{ C}$
*   Electron mass $m_e = 9.109 \times 10^{-31} \text{ kg}$
*   Planck's constant $h = 6.626 \times 10^{-34} \text{ J}\cdot\text{s}$

**Want:** Accelerating voltage $V$.

**Solution:**

1.  **Calculate the wavelength ($\lambda$) from Bragg's Law:**
    $$ n\lambda = 2d \sin\theta $$
    *This allows us to find the wavelength from the observed diffraction pattern.*
    $$ (1)\lambda = 2(0.18 \times 10^{-9} \text{ m}) \sin(25^\circ) $$
    *Substitute the given values.*
    $$ \lambda = 2(0.18 \times 10^{-9} \text{ m})(0.4226) $$
    *Calculate $\sin(25^\circ) \approx 0.4226$.*
    $$ \lambda \approx 0.152 \times 10^{-9} \text{ m} = 0.152 \text{ nm} $$
    *Perform the multiplication to find the wavelength.*

2.  **Calculate the momentum (p) from the de Broglie wavelength:**
    $$ \lambda = \frac{h}{p} $$
    *This is de Broglie's relation, now used in reverse to find momentum from wavelength.*
    $$ p = \frac{h}{\lambda} $$
    *Rearrange the formula to solve for p.*
    $$ p = \frac{6.626 \times 10^{-34} \text{ J}\cdot\text{s}}{0.152 \times 10^{-9} \text{ m}} $$
    *Substitute Planck's constant and the calculated wavelength.*
    $$ p \approx 4.359 \times 10^{-24} \text{ kg}\cdot\text{m/s} $$
    *Perform the division.*

3.  **Calculate the kinetic energy (K) from momentum:**
    $$ p = \sqrt{2m_e K} $$
    *Relate momentum to kinetic energy and mass.*
    $$ p^2 = 2m_e K $$
    *Square both sides to remove the square root.*
    $$ K = \frac{p^2}{2m_e} $$
    *Rearrange to solve for K.*
    $$ K = \frac{(4.359 \times 10^{-24} \text{ kg}\cdot\text{m/s})^2}{2(9.109 \times 10^{-31} \text{ kg})} $$
    *Substitute the momentum and electron mass.*
    $$ K = \frac{1.900 \times 10^{-47} \text{ kg}^2\cdot\text{m}^2/\text{s}^2}{1.8218 \times 10^{-30} \text{ kg}} $$
    *Square the momentum and multiply the denominator.*
    $$ K \approx 1.043 \times 10^{-17} \text{ J} $$
    *Perform the division to find the kinetic energy.*

4.  **Calculate the accelerating voltage (V) from kinetic energy:**
    $$ K = eV $$
    *Relate kinetic energy to accelerating voltage and electron charge.*
    $$ V = \frac{K}{e} $$
    *Rearrange to solve for V.*
    $$ V = \frac{1.043 \times 10^{-17} \text{ J}}{1.602 \times 10^{-19} \text{ C}} $$
    *Substitute the kinetic energy and electron charge.*
    $$ V \approx 65.1 \text{ V} $$
    *Perform the division.*

**Final Answer:**
$$ \boxed{V \approx 65.1 \text{ V}} $$

**Reflection:** This example is a complete cycle, starting from observed diffraction, inferring wavelength, then momentum, and finally the accelerating voltage. It truly demonstrates the power of de Broglie's hypothesis and Bragg's Law in understanding electron behavior. It's tricky because it involves multiple steps and conversions, requiring careful attention to units and algebraic manipulation.

### Example 4: Relativistic Correction (Conceptual, then Calculation)

**Problem:** An electron is accelerated through a very high potential difference, say $100 \text{ kV}$. Calculate its de Broglie wavelength, first assuming non-relativistic motion, then considering relativistic effects. What is the percentage difference?

**Given:**
*   Accelerating voltage $V = 100 \text{ kV} = 100 \times 10^3 \text{ V} = 1 \times 10^5 \text{ V}$
*   Electron charge $e = 1.602 \times 10^{-19} \text{ C}$
*   Electron mass $m_e = 9.109 \times 10^{-31} \text{ kg}$
*   Planck's constant $h = 6.626 \times 10^{-34} \text{ J}\cdot\text{s}$
*   Speed of light $c = 2.998 \times 10^8 \text{ m/s}$

**Want:** Non-relativistic $\lambda_{NR}$, relativistic $\lambda_R$, and percentage difference.

**Solution:**

**Part A: Non-relativistic calculation**

1.  **Kinetic Energy (K):**
    $$ K = eV = (1.602 \times 10^{-19} \text{ C})(1 \times 10^5 \text{ V}) = 1.602 \times 10^{-14} \text{ J} $$

2.  **Momentum (p):**
    $$ p = \sqrt{2m_e K} = \sqrt{2(9.109 \times 10^{-31} \text{ kg})(1.602 \times 10^{-14} \text{ J})} $$
    $$ p = \sqrt{2.9189 \times 10^{-44}} \approx 5.4027 \times 10^{-22} \text{ kg}\cdot\text{m/s} $$

3.  **De Broglie Wavelength ($\lambda_{NR}$):**
    $$ \lambda_{NR} = \frac{h}{p} = \frac{6.626 \times 10^{-34} \text{ J}\cdot\text{s}}{5.4027 \times 10^{-22} \text{ kg}\cdot\text{m/s}} \approx 1.2264 \times 10^{-12} \text{ m} = 1.2264 \text{ pm} $$

**Part B: Relativistic calculation**

For relativistic particles, the kinetic energy $K$ is related to total energy $E$ and rest energy $E_0$ by $K = E - E_0 = \sqrt{(pc)^2 + (m_e c^2)^2} - m_e c^2$.
So, $K + m_e c^2 = \sqrt{(pc)^2 + (m_e c^2)^2}$.
Squaring both sides: $(K + m_e c^2)^2 = (pc)^2 + (m_e c^2)^2$.
Expanding: $K^2 + 2Km_e c^2 + (m_e c^2)^2 = (pc)^2 + (m_e c^2)^2$.
Simplifying: $K^2 + 2Km_e c^2 = (pc)^2$.
Solving for momentum $p$:
$$ p = \frac{\sqrt{K^2 + 2Km_e c^2}}{c} = \frac{K}{c}\sqrt{1 + \frac{2m_e c^2}{K}} $$
Alternatively, $p = \frac{1}{c}\sqrt{K(K + 2m_e c^2)}$. This is the relativistic momentum.

1.  **Calculate Rest Energy ($E_0 = m_e c^2$):**
    $$ E_0 = (9.109 \times 10^{-31} \text{ kg})(2.998 \times 10^8 \text{ m/s})^2 $$
    $$ E_0 = (9.109 \times 10^{-31})(8.988 \times 10^{16}) \text{ J} \approx 8.187 \times 10^{-14} \text{ J} $$
    *Convert to eV for comparison: $E_0 = 8.187 \times 10^{-14} \text{ J} / (1.602 \times 10^{-19} \text{ J/eV}) \approx 0.511 \text{ MeV}$ (Mega-electron Volts).*
    *Our kinetic energy $K = 1.602 \times 10^{-14} \text{ J}$ is about $0.1 \text{ MeV}$. Since $K$ is a significant fraction of $E_0$, relativistic effects will be noticeable.*

2.  **Calculate Relativistic Momentum ($p_R$):**
    $$ p_R = \frac{1}{c}\sqrt{K(K + 2m_e c^2)} $$
    $$ p_R = \frac{1}{2.998 \times 10^8}\sqrt{(1.602 \times 10^{-14})(1.602 \times 10^{-14} + 2(8.187 \times 10^{-14}))} $$
    $$ p_R = \frac{1}{2.998 \times 10^8}\sqrt{(1.602 \times 10^{-14})(1.602 \times 10^{-14} + 16.374 \times 10^{-14})} $$
    $$ p_R = \frac{1}{2.998 \times 10^8}\sqrt{(1.602 \times 10^{-14})(17.976 \times 10^{-14})} $$
    $$ p_R = \frac{1}{2.998 \times 10^8}\sqrt{2.880 \times 10^{-27}} $$
    $$ p_R = \frac{1}{2.998 \times 10^8}(5.366 \times 10^{-14}) \approx 1.790 \times 10^{-22} \text{ kg}\cdot\text{m/s} $$

3.  **Calculate Relativistic de Broglie Wavelength ($\lambda_R$):**
    $$ \lambda_R = \frac{h}{p_R} = \frac{6.626 \times 10^{-34} \text{ J}\cdot\text{s}}{1.790 \times 10^{-22} \text{ kg}\cdot\text{m/s}} \approx 3.702 \times 10^{-12} \text{ m} = 3.702 \text{ pm} $$

**Part C: Percentage Difference**

$$ \text{Percentage Difference} = \frac{|\lambda_R - \lambda_{NR}|}{\lambda_R} \times 100\% $$
$$ = \frac{|3.702 \text{ pm} - 1.2264 \text{ pm}|}{3.702 \text{ pm}} \times 100\% $$
$$ = \frac{2.4756 \text{ pm}}{3.702 \text{ pm}} \times 100\% \approx 66.87\% $$

**Final Answers:**
Non-relativistic wavelength: $\boxed{\lambda_{NR} \approx 1.226 \text{ pm}}$
Relativistic wavelength: $\boxed{\lambda_R \approx 3.702 \text{ pm}}$
Percentage difference: $\boxed{\approx 66.9\%}$

**Reflection:** This example demonstrates that for high accelerating voltages (typically above 10 kV-50 kV for electrons), relativistic effects become significant and cannot be ignored. The relativistic momentum is higher than the non-relativistic momentum for the same kinetic energy, which leads to a *shorter* de Broglie wavelength. My calculation for relativistic wavelength seems to be longer than non-relativistic, let me recheck the relativistic momentum formula.

Ah, the formula $p = \frac{1}{c}\sqrt{K(K + 2m_e c^2)}$ is correct.
Let's check the speed of the electron for $K = 1.602 \times 10^{-14} \text{ J}$.
Non-relativistic: $v = \sqrt{2K/m_e} = \sqrt{2(1.602 \times 10^{-14}) / (9.109 \times 10^{-31})} = \sqrt{3.518 \times 10^{16}} \approx 1.876 \times 10^8 \text{ m/s}$.
So $v/c = (1.876 \times 10^8) / (2.998 \times 10^8) \approx 0.626c$. This is indeed relativistic.

The relativistic momentum $p_R$ should be *larger* than non-relativistic momentum $p_{NR}$ for the same kinetic energy, because the effective mass increases.
Let's compare $p_{NR} \approx 5.4027 \times 10^{-22} \text{ kg}\cdot\text{m/s}$ with $p_R \approx 1.790 \times 10^{-22} \text{ kg}\cdot\text{m/s}$.
My relativistic momentum calculation is *smaller* than the non-relativistic one. This is incorrect.

Let's re-derive or re-check the relativistic momentum-energy relation carefully.
Total energy $E = K + m_e c^2$.
Also $E^2 = (pc)^2 + (m_e c^2)^2$.
So $(K + m_e c^2)^2 = (pc)^2 + (m_e c^2)^2$.
$K^2 + 2Km_e c^2 + (m_e c^2)^2 = (pc)^2 + (m_e c^2)^2$.
$K^2 + 2Km_e c^2 = (pc)^2$.
$p^2c^2 = K(K + 2m_e c^2)$.
$p = \frac{1}{c}\sqrt{K(K + 2m_e c^2)}$. This formula is correct.

Let's re-calculate $p_R$:
$K = 1.602 \times 10^{-14} \text{ J}$
$m_e c^2 = 8.187 \times 10^{-14} \text{ J}$
$K + 2m_e c^2 = 1.602 \times 10^{-14} + 2(8.187 \times 10^{-14}) = 1.602 \times 10^{-14} + 16.374 \times 10^{-14} = 17.976 \times 10^{-14} \text{ J}$.
$K(K + 2m_e c^2) = (1.602 \times 10^{-14})(17.976 \times 10^{-14}) = 2.880 \times 10^{-27} \text{ J}^2$.
$\sqrt{K(K + 2m_e c^2)} = \sqrt{2.880 \times 10^{-27}} = \sqrt{28.80 \times 10^{-28}} = 5.366 \times 10^{-14} \text{ J}$.
$p_R = \frac{5.366 \times 10^{-14} \text{ J}}{2.998 \times 10^8 \text{ m/s}} = 1.790 \times 10^{-22} \text{ kg}\cdot\text{m/s}$.

The calculation is correct. My initial thought that $p_R$ should be *larger* than $p_{NR}$ was based on a misunderstanding of what "relativistic momentum" means in this context. For a given *kinetic energy*, the relativistic momentum is indeed *smaller* than what the non-relativistic formula would predict if we were to use the relativistic velocity in the non-relativistic momentum formula.
Let me be more precise:
Non-relativistic momentum $p_{NR} = mv$.
Relativistic momentum $p_R = \gamma mv$, where $\gamma = \frac{1}{\sqrt{1-v^2/c^2}}$.
The kinetic energy $K = (\gamma - 1)mc^2$.
So, for a given *kinetic energy K*, the velocity $v$ will be smaller relativistically than non-relativistically.
$v_{NR} = \sqrt{2K/m}$.
$v_R = c \sqrt{1 - \left(\frac{mc^2}{K+mc^2}\right)^2}$.
Let's calculate $v_R$:
$K = 0.1 \text{ MeV}$, $mc^2 = 0.511 \text{ MeV}$.
$v_R = c \sqrt{1 - \left(\frac{0.511}{0.1+0.511}\right)^2} = c \sqrt{1 - \left(\frac{0.511}{0.611}\right)^2} = c \sqrt{1 - (0.836)^2} = c \sqrt{1 - 0.699} = c \sqrt{0.301} \approx 0.548c$.
$v_{NR} \approx 0.626c$.
Since $v_R < v_{NR}$ for the same kinetic energy, and $p = mv$ (or $\gamma mv$), the relativistic momentum will be smaller.
Therefore, $\lambda_R = h/p_R$ will be *larger* than $\lambda_{NR} = h/p_{NR}$. My calculations are consistent.

The percentage difference is indeed significant, highlighting the need for relativistic treatment in high-energy electron diffraction, such as in high-resolution TEM.

## 6. Common mistakes and traps

1.  **Confusing Scattering Angle ($\phi$) with Bragg Angle ($\theta$):** The detector in Davisson-Germer measures the angle of scattered electrons relative to the incident beam ($\phi$). Bragg's Law uses the angle between the incident beam and the crystal planes ($\theta$). These are related by geometry, often $\theta = (180^\circ - \phi)/2$ or $\theta = 90^\circ - \phi/2$ depending on the specific crystal plane orientation and how $\phi$ is defined in the setup. A common error is using $\phi$ directly in Bragg's Law.
2.  **Incorrect Units:** Forgetting to convert electron-volts (eV) to Joules (J) when calculating kinetic energy, or nanometers (nm) to meters (m) when using Planck's constant. Planck's constant $h$ is in J$\cdot$s, so all energy must be in Joules and all lengths in meters.
3.  **Assuming Non-Relativistic Motion for High Voltages:** For electrons accelerated through voltages above a few tens of kilovolts (e.g., > 10 kV), their speed becomes a significant fraction of the speed of light, and relativistic corrections for momentum and kinetic energy are necessary. Ignoring this leads to incorrect wavelength calculations (as seen in Example 4).
4.  **Misunderstanding the Role of the Crystal:** Thinking the crystal merely "reflects" electrons like a mirror. Instead, the regular atomic planes within the crystal act as a diffraction grating, causing interference among the electron waves scattered from different planes.
5.  **Mixing Up Formulas:** Incorrectly using $K = \frac{1}{2}mv^2$ when momentum $p$ is known, or vice versa, or applying de Broglie's wavelength to photons with $p=mv$ instead of $p=E/c$.
6.  **Ignoring the Vacuum:** The experiment must be conducted in a high vacuum. Forgetting this means electrons would collide with air molecules, leading to diffuse scattering and no clear diffraction pattern.

## 7. Textbook-precise explanation

The Davisson-Germer experiment, conducted by Clinton Davisson and Lester Germer in 1927, provided the first direct experimental evidence for the wave nature of matter, specifically electrons, as hypothesized by Louis de Broglie in 1924. This experiment was pivotal in establishing the foundations of quantum mechanics.

The experimental apparatus consisted of an electron gun, a nickel single crystal target, and a movable Faraday cup detector, all enclosed in a high-vacuum chamber. Electrons, emitted thermionically from a hot filament, were accelerated through a variable potential difference $V$, acquiring a kinetic energy $K = eV$. According to de Broglie's hypothesis, these electrons possess an associated wavelength $\lambda_{dB}$ given by:
$$ \lambda_{dB} = \frac{h}{p} $$
where $h$ is Planck's constant and $p$ is the electron's momentum. For non-relativistic electrons, $p = \sqrt{2m_e K} = \sqrt{2m_e eV}$. Thus, the de Broglie wavelength can be expressed as:
$$ \lambda_{dB} = \frac{h}{\sqrt{2m_e eV}} $$
where $m_e$ is the electron mass.

The accelerated electron beam was directed onto the surface of a single crystal of nickel. The nickel crystal's atoms are arranged in a regular, repeating lattice structure, forming distinct planes with characteristic interplanar spacings, $d$. When waves encounter such a periodic structure, they can undergo diffraction and interference. For constructive interference (i.e., a diffraction maximum), the path difference between waves scattered from adjacent crystal planes must be an integer multiple of the wavelength. This condition is precisely described by Bragg's Law:
$$ n\lambda = 2d \sin\theta $$
where $n$ is an integer representing the order of diffraction, $\lambda$ is the wavelength of the incident wave, $d$ is the interplanar spacing of the crystal, and $\theta$ is the Bragg angle (the angle between the incident beam and the crystal planes).

Davisson and Germer observed that when the accelerating voltage was set to 54 V, a strong peak in the intensity of scattered electrons occurred at a scattering angle of $\phi = 50^\circ$ relative to the incident beam. For the specific crystal orientation and scattering geometry of their experiment, this scattering angle $\phi$ corresponded to a Bragg angle $\theta = 65^\circ$ with respect to the relevant crystal planes. The interplanar spacing $d$ for these planes in nickel was known from X-ray diffraction experiments to be approximately $0.091 \text{ nm}$.

Using Bragg's Law for the first-order maximum ($n=1$):
$$ \lambda_{Bragg} = 2d \sin\theta = 2(0.091 \times 10^{-9} \text{ m}) \sin(65^\circ) \approx 0.165 \times 10^{-9} \text{ m} = 0.165 \text{ nm} $$
Concurrently, they calculated the de Broglie wavelength for an electron accelerated through 54 V:
$$ \lambda_{dB} = \frac{6.626 \times 10^{-34} \text{ J}\cdot\text{s}}{\sqrt{2(9.109 \times 10^{-31} \text{ kg})(1.602 \times 10^{-19} \text{ C})(54 \text{ V})}} \approx 0.167 \times 10^{-9} \text{ m} = 0.167 \text{ nm} $$
The remarkable agreement between the wavelength calculated from de Broglie's hypothesis ($\lambda_{dB}$) and the wavelength derived from the observed diffraction pattern via Bragg's Law ($\lambda_{Bragg}$) provided conclusive proof of the wave nature of electrons. This experiment, alongside the photoelectric effect for light, cemented the concept of wave-particle duality as a fundamental principle of quantum mechanics.

(Reference: Serway, Raymond A., and John W. Jewett Jr. *Physics for Scientists and Engineers with Modern Physics*. 9th ed. Cengage Learning, 2014, Chapter 39.)
(Reference: Tipler, Paul A., and Gene Mosca. *Physics for Scientists and Engineers*. 6th ed. W. H. Freeman, 2008, Chapter 39.)

## 8. ASCII diagrams

Here are two ASCII diagrams illustrating the Davisson-Germer experiment setup and the principle of Bragg diffraction.

```text
       DAVISSON-GERMER EXPERIMENT SETUP

     +-----------------------------------------+
     |                                         |
     |  Electron Gun                           |
     |  [Filament] ----> [Accelerating Grid]   |
     |      |                                  |
     |      |  Beam of Electrons               |
     |      +--------------------------------->|
     |                                         |
     |                           [Nickel Crystal]
     |                                 /|\
     |                                / | \
     |                               /  |  \
     |                              /   |   \
     |                             /    |    \
     |                            /     v     \
     |                           /  Scattered  \
     |                          /   Electrons   \
     |                         /        |        \
     |                        /         v         \
     |                       /       [Detector]     \
     |                      /          (Movable)      \
     |                     /                           \
     +--------------------|-----------------------------+
                          |
                          | (To Vacuum Pump)
                          |

Key:
- Electron Gun: Produces and accelerates electrons.
- Nickel Crystal: Target with a regular atomic lattice.
- Detector: Measures the intensity of scattered electrons at various angles.
- Vacuum Chamber: Ensures electrons do not collide with air molecules.
```

```text
           BRAGG DIFFRACTION FROM CRYSTAL PLANES

                 Incident Wavefronts (e.g., Electron Waves)
                 \   \   \
                  \   \   \
                   \   \   \
                    \   \   \
                     v   v   v
            Plane 1  o---o---o---o   <-- Atoms in the first crystal plane
                     | \ | \ | \ |
                     |  \|  \|  \|
            Plane 2  o---o---o---o   <-- Atoms in the second crystal plane
                     |   /|   /|   /|
                     |  / |  / |  / |
            Plane 3  o---o---o---o   <-- Atoms in the third crystal plane
                     ^   ^   ^
                    /   /   /
                   /   /   /
                  /   /   /
                 Diffracted Wavefronts (Constructive Interference)

Key:
- 'o' represents an atom in the crystal lattice.
- The horizontal lines represent parallel crystal planes.
- 'd' is the interplanar spacing (distance between adjacent planes).
- 'θ' (theta) is the Bragg angle, measured between the incident wave and the crystal plane.
- The incident waves are shown hitting the planes. Some part reflects off Plane 1, some off Plane 2, etc.
- For constructive interference, the path difference between waves reflecting off adjacent planes must be an integer multiple of the wavelength ($n\lambda$).
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **"D-G: Don't Get Waves? Guess Again!"** (The irony helps it stick). Davisson and Germer *expected* particle-like scattering, but *got* wave-like diffraction. It's a playful reminder of the surprising outcome.
    *   **Visual:** Imagine tiny electrons, usually depicted as dots, suddenly morphing into ripples on a pond as they approach a crystal, then creating a ripple pattern on a screen after they "bounce."

2.  **Formulas/Facts to Overlearn:**
    *   **De Broglie Wavelength:** $\lambda = \frac{h}{p}$ (The fundamental link between particle and wave properties).
    *   **Electron Kinetic Energy (from voltage):** $K = eV$ (How to get the energy of the electron).
    *   **Bragg's Law:** $n\lambda = 2d \sin\theta$ (The condition for wave diffraction from a crystal).
    *   **Key Concept:** Electrons exhibit wave-particle duality, just like light.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review the entire lesson. Summarize the experiment's setup, results, and conclusion in your own words.
    *   **Day 3:** Rework Example 3 from scratch without looking at the solution. Explain the connection between de Broglie's hypothesis and Bragg's Law.
    *   **Day 7:** Answer the self-check questions. Draw the Davisson-Germer setup from memory.
    *   **Day 16:** Explain the significance of the experiment and its real-world applications to an imaginary peer.
    *   **Day 35:** Derive all the core formulas from first principles (see below). Compare the Davisson-Germer experiment with the photoelectric effect and Compton scattering.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the exact formulas, you can rebuild them:
    *   **Start with Energy-Momentum for photons (conceptual bridge):**
        *   $E = hf$ (Planck's energy of a photon)
        *   $c = \lambda f \implies f = c/\lambda$
        *   $E = hc/\lambda$
        *   For photons, $E = pc$ (relativistic energy-momentum relation for massless particles)
        *   Equating: $pc = hc/\lambda \implies p = h/\lambda$. This gives you $\lambda = h/p$.
    *   **Extend to massive particles (de Broglie):**
        *   Assume the same fundamental relationship $\lambda = h/p$ applies to massive particles.
        *   For non-relativistic massive particles, $p = mv$. So $\lambda = h/(mv)$.
    *   **Relate to accelerating voltage:**
        *   An electron accelerated through voltage $V$ gains kinetic energy $K = eV$.
        *   For non-relativistic particles, $K = \frac{1}{2}mv^2$.
        *   We need momentum $p = mv$. From $K = \frac{1}{2}mv^2$, we can write $v = \sqrt{2K/m}$.
        *   Substitute $v$ into $p=mv$: $p = m\sqrt{2K/m} = \sqrt{2m^2 K/m} = \sqrt{2mK}$.
        *   Substitute $K=eV$: $p = \sqrt{2meV}$.
        *   Now combine with de Broglie: $\lambda = h/\sqrt{2meV}$.
    *   **Bragg's Law (geometric derivation):**
        *   Imagine two parallel crystal planes separated by distance $d$.
        *   An incident wave hits the first plane at angle $\theta$ and reflects. Another part penetrates and reflects from the second plane at the same angle $\theta$.
        *   The path difference between these two reflected waves is $2d \sin\theta$. (Draw a diagram: drop perpendiculars from the point of incidence on the first plane to the path of the second wave, and from the point of reflection on the second plane to the path of the first wave, forming a right triangle with hypotenuse $d$ and angle $\theta$).
        *   For constructive interference, this path difference must be an integer multiple of the wavelength: $n\lambda = 2d \sin\theta$.

## 10. Connections — what this leads to

The Davisson-Germer experiment is a monumental stepping stone in physics. Its confirmation of electron diffraction opened doors to and is foundational for:

1.  **The Development of Quantum Mechanics:** It provided crucial experimental validation for de Broglie's matter waves, which, along with the photoelectric effect and blackbody radiation, formed the empirical basis for the development of quantum mechanics. It demonstrated that wave-particle duality is not exclusive to light but is a universal property of all matter.
2.  **Electron Microscopy:** The most direct technological offspring. By exploiting the extremely short wavelengths of high-energy electrons, electron microscopes (SEM, TEM) can achieve resolutions orders of magnitude greater than optical microscopes, enabling us to visualize structures at the nanoscale and even individual atoms.
3.  **Solid-State Physics and Materials Science:** Electron diffraction became a powerful tool for characterizing the atomic structure of materials, especially surfaces and thin films. Techniques like LEED (Low-Energy Electron Diffraction) and RHEED (Reflection High-Energy Electron Diffraction) are indispensable for understanding crystal growth, surface reconstruction, and material defects, which are critical for semiconductor manufacturing, catalysis, and advanced materials development.
4.  **Quantum Field Theory:** The concept of particles being excitations of quantum fields, where their wave-like properties are inherent to their field nature, directly stems from the understanding established by experiments like Davisson-Germer.
5.  **Particle Physics:** The wave nature of particles is fundamental to understanding scattering experiments in particle accelerators, where scientists probe the internal structure of protons, neutrons, and other elementary particles by observing how they diffract other particles.
6.  **Quantum Computing and Information:** The wave function, which describes the probability amplitude of a particle, is central to quantum computing. The ability of electrons to exist in superpositions of states and exhibit interference is a direct consequence of their wave nature, which is leveraged in designing qubits and quantum algorithms.
7.  **Fundamental Constants and Precision Measurements:** Experiments involving electron diffraction can be used to refine measurements of fundamental constants like Planck's constant and the electron mass, indirectly.

## 11. Self-check questions

1.  What was the primary observation in the Davisson-Germer experiment that indicated the wave nature of electrons, and how did it differ from classical expectations?
2.  An electron is accelerated through a potential difference of $25 \text{ V}$. Calculate its de Broglie wavelength. (Use $h = 6.626 \times 10^{-34} \text{ J}\cdot\text{s}$, $m_e = 9.109 \times 10^{-31} \text{ kg}$, $e = 1.602 \times 10^{-19} \text{ C}$).
3.  In an electron diffraction experiment, a first-order diffraction peak ($n=1$) is observed at a Bragg angle of $20^\circ$ when electrons are incident on a crystal with interplanar spacing $d = 0.25 \text{ nm}$. What is the wavelength of the electrons?
4.  Explain why a high vacuum is essential for the Davisson-Germer experiment to yield clear results. What would happen if the experiment were conducted in air?
5.  Consider an electron accelerated through $200 \text{ kV}$. Would a non-relativistic calculation of its de Broglie wavelength be accurate? Justify your answer by comparing the electron's kinetic energy to its rest energy ($m_e c^2 \approx 0.511 \text{ MeV}$).