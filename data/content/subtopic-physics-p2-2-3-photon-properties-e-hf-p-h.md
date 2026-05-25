## What it is
A photon is the fundamental quantum of light, a discrete packet of electromagnetic energy. Its properties bridge the gap between waves and particles: its energy $E$ is proportional to its wave frequency $f$, and its momentum $p$ is inversely proportional to its wavelength $\lambda$. These relationships are the cornerstone of quantum mechanics.

## Why it matters
These equations are not just academic; they govern technologies that are critical to modern science and engineering. In aerospace, they are the basis for solar sails, which use the momentum of photons from the sun for propulsion. In astrophysics, analyzing the energy of photons (spectroscopy) allows us to determine the chemical composition, temperature, and velocity of distant stars and galaxies.

## When to study it
Before tackling this, you must be solid on three prerequisites:
1.  **Classical Waves:** You must understand the relationship between wave speed ($c$), frequency ($f$), and wavelength ($\lambda$): $c = f\lambda$.
2.  **Classical Mechanics:** You must be comfortable with the definitions of energy ($E$) and momentum ($p$).
3.  **Special Relativity:** You need the relativistic energy-momentum relation, $E^2 = (pc)^2 + (m_0c^2)^2$, and understand the concept of rest mass ($m_0$).

If you are not confident with the relativistic energy-momentum relation, pause and review that first. The photon's momentum makes no sense without it.

## How to study it (step by step)
1.  **Derive Photon Energy:** Start with Max Planck's hypothesis that the energy of an oscillator is quantized. He proposed that the energy of a light quantum is proportional to its frequency: $E \propto f$. The constant of proportionality is Planck's constant, $h$, giving the famous relation $E = hf$. Spend 15 minutes reading the historical context of the ultraviolet catastrophe in blackbody radiation to understand *why* this radical idea was necessary.
2.  **Derive Photon Momentum:** Use the relativistic energy-momentum relation $E^2 = (pc)^2 + (m_0c^2)^2$. A photon is massless, so its rest mass $m_0 = 0$. The equation simplifies dramatically to $E^2 = (pc)^2$, which gives $E=pc$.
3.  **Connect the Two:** Now, equate the two expressions for energy: $hf = pc$. We know from classical wave theory that for light, $c = f\lambda$, which can be rearranged to $f = c/\lambda$. Substitute this into our equation: $h(c/\lambda) = pc$.
4.  **Isolate Momentum:** The speed of light $c$ cancels from both sides of $h(c/\lambda) = pc$, leaving the de Broglie relation for a photon: $p = h/\lambda$. Take 10 minutes to work through this derivation yourself until it's trivial.
5.  **Problem Solving (Energy):** Solve 5 problems converting between wavelength, frequency, and photon energy. Use units of Joules (J) and electron-volts (eV). Drill the unit conversions.
6.  **Problem Solving (Momentum):** Solve 5 problems calculating photon momentum. Then, tackle a problem on radiation pressure: find the force exerted by a laser beam on a mirror (hint: force is the rate of change of momentum, $F = \Delta p / \Delta t$, and for reflection, the momentum change is $2p$).

## Key ideas, with intuition
1.  **Wave-Particle Duality is a Bridge, Not a Contradiction.**
    The core idea is that light is *one thing* that exhibits both wave-like and particle-like properties depending on how you measure it. The equations $E=hf$ and $p=h/\lambda$ are the mathematical bridge connecting these two aspects.
    $$
    \underbrace{E, p}_{\text{Particle Properties}} \quad \Leftrightarrow \quad \underbrace{f, \lambda}_{\text{Wave Properties}}
    $$
    The constant that makes the bridge possible is Planck's constant, $h \approx 6.626 \times 10^{-34} \, \text{J}\cdot\text{s}$. It's incredibly small, which is why we don't notice quantum effects in our everyday world.

2.  **Energy is "Granular".**
    Think of light not as a continuous stream, but as a hail of tiny bullets (photons). The "color" of the light (its frequency) determines the energy of each individual bullet. A blue light photon ($f_{blue} > f_{red}$) is a more energetic "bullet" than a red light photon. The brightness (intensity) of the light corresponds to the *number* of bullets fired per second.

3.  **Massless Things Can Have Momentum.**
    In classical physics, momentum is $p=mv$. If mass $m=0$, momentum is zero. This is incorrect in relativity. The true definition comes from $E^2 = (pc)^2 + (m_0c^2)^2$. For a photon, $m_0=0$, which gives $E=pc$. Since a photon definitely has energy ($E=hf$), it *must* have momentum ($p=E/c$). This is a purely relativistic concept. A photon has momentum because it has energy and is in motion.

## Worked example
**Problem:** A green laser pointer emits light with a wavelength of $\lambda = 532$ nm. What is the energy (in Joules and eV) and momentum of a single photon from this laser?

**Given:**
- Wavelength $\lambda = 532 \, \text{nm} = 532 \times 10^{-9} \, \text{m}$
- Planck's constant $h = 6.626 \times 10^{-34} \, \text{J}\cdot\text{s}$
- Speed of light $c = 3.00 \times 10^8 \, \text{m/s}$
- Conversion factor $1 \, \text{eV} = 1.602 \times 10^{-19} \, \text{J}$

**Step 1: Calculate the frequency.**
We need the frequency to find the energy. Use the fundamental wave relation $c = f\lambda$.
$$
f = \frac{c}{\lambda} = \frac{3.00 \times 10^8 \, \text{m/s}}{532 \times 10^{-9} \, \text{m}} \approx 5.64 \times 10^{14} \, \text{Hz}
$$
*Reflection: This step connects the given wave property ($\lambda$) to the other wave property ($f$) needed for the energy formula.*

**Step 2: Calculate the energy in Joules.**
Use the Planck-Einstein relation, $E=hf$.
$$
E = (6.626 \times 10^{-34} \, \text{J}\cdot\text{s}) \times (5.64 \times 10^{14} \, \text{s}^{-1}) \approx 3.74 \times 10^{-19} \, \text{J}
$$
*Reflection: This is the core calculation, directly applying the formula that links the wave world ($f$) to the particle world ($E$).*

**Step 3: Convert energy to electron-volts (eV).**
Electron-volts are a more convenient unit for single-particle energies.
$$
E_{\text{eV}} = \frac{3.74 \times 10^{-19} \, \text{J}}{1.602 \times 10^{-19} \, \text{J/eV}} \approx 2.33 \, \text{eV}
$$
*Reflection: Units matter. Joules are the SI standard, but eV are practical for the quantum scale. Knowing how to convert is non-negotiable.*

**Step 4: Calculate the momentum.**
Use the de Broglie relation, $p = h/\lambda$.
$$
p = \frac{h}{\lambda} = \frac{6.626 \times 10^{-34} \, \text{J}\cdot\text{s}}{532 \times 10^{-9} \, \text{m}} \approx 1.25 \times 10^{-27} \, \frac{\text{kg}\cdot\text{m}}{\text{s}}
$$
(Note: The units work out because $1 \, \text{J} = 1 \, \frac{\text{kg}\cdot\text{m}^2}{\text{s}^2}$, so $\frac{\text{J}\cdot\text{s}}{\text{m}} = \frac{\text{kg}\cdot\text{m}^2\cdot\text{s}}{\text{s}^2\cdot\text{m}} = \frac{\text{kg}\cdot\text{m}}{\text{s}}$).
*Reflection: This step directly calculates the other particle property ($p$) from the given wave property ($\lambda$). It's often more direct than calculating energy first.*

## Diagrams
A simple electromagnetic wave, with a photon represented as a localized packet of energy.

```text
       ^ E-field
       |
     /---\
    /     \         /---\
---/-------\-------/-------\----->  Direction of propagation (Momentum p)
  /         \     /         \
 /           \---/           \
               |
               v B-field (into page)

|<-- λ -->|    A single photon can be visualized
             as one "packet" or quantum of this wave:

                   ~>
                ( γ )   Energy E, Momentum p
                   ~>
```

## Memory technique — remember this forever
1.  **The Story:** Imagine an energetic surfer named **Planck**. His **E**nergy comes from how **f**requently he bobs on the waves ($E=hf$). His **p**ushing power (momentum) is greatest on short, choppy waves with small **λ**engths ($p=h/\lambda$). High frequency = high energy. Short wavelength = high momentum.

2.  **Overlearn these formulas:**
    $$ E = hf $$
    $$ p = \frac{h}{\lambda} $$
    $$ c = f\lambda $$

3.  **Spaced Repetition Schedule:**
    - Review these derivations and solve one problem: tomorrow (1 day).
    - Review and solve a different problem: in 3 days.
    - Review from memory: in 7 days.
    - Review from memory: in 16 days.
    - Review from memory: in 35 days.

4.  **First Principles Pathway:** If you forget, rebuild it.
    - Start with the two pillars: Einstein's relativistic energy for a massless particle and Planck's quantum hypothesis.
    - Pillar 1: $E^2 = (pc)^2 + (m_0c^2)^2$. For a photon, $m_0=0 \implies E=pc$.
    - Pillar 2: $E=hf$.
    - Equate them: $pc = hf$.
    - Use the universal wave equation $c=f\lambda \implies f=c/\lambda$.
    - Substitute for $f$: $pc = h(c/\lambda)$.
    - Cancel $c$: $p = h/\lambda$. You have re-derived everything.

## Common mistakes
1.  **Unit Nightmare:** Using wavelength in nanometers (nm) directly in $p=h/\lambda$. You *must* convert to meters first. The same goes for energy; convert eV to Joules before using them in momentum calculations.
2.  **Classical Momentum Fallacy:** Do not *ever* write $p=mv$ for a photon. It has zero rest mass. Its momentum comes purely from its energy and motion, via $p=E/c$.
3.  **Confusing Intensity and Energy:** The intensity (brightness) of a light beam is related to the *number of photons* arriving per second, not the energy of a *single* photon. A dim blue light can be made of a few high-energy photons, while a bright red light is made of many low-energy photons.

## Self-check
1.  An X-ray photon has a frequency of $2.5 \times 10^{18}$ Hz. What is its energy in keV?
2.  A 100 W sodium lamp emits yellow light of wavelength 589 nm. Assuming 100% efficiency, how many photons does it emit per second?
3.  Sunlight strikes the Earth with an intensity of about $1360 \, \text{W/m}^2$. A perfectly reflective, 1 km by 1 km solar sail is deployed in space. What is the force exerted on the sail by the sunlight? (Assume an average wavelength of 500 nm for sunlight).