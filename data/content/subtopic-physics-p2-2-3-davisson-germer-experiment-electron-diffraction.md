## What it is
The Davisson-Germer experiment was the first direct experimental confirmation of the wave-like nature of matter, specifically electrons, as predicted by Louis de Broglie. By firing a beam of electrons at a nickel crystal, Clinton Davisson and Lester Germer observed that the electrons diffracted, scattering at specific, predictable angles, forming an interference pattern characteristic of waves. This demonstrated that particles possess a wavelength.

## Why it matters
This experiment is a cornerstone of quantum mechanics, providing the empirical proof for the principle of wave-particle duality. This principle is fundamental to modern electronics and materials science. Techniques like Transmission Electron Microscopy (TEM) and Low-Energy Electron Diffraction (LEED) rely on electron diffraction to image materials at the atomic scale, which is critical for developing advanced alloys for aerospace and fabricating next-generation semiconductors.

## When to study it
Before tackling this, you must have a firm grasp of the following prerequisites. If you are not confident with these, review them first.
*   **Classical Wave Optics:** Specifically, Bragg's Law for X-ray diffraction from a crystal lattice ($n\lambda = 2d\sin\theta$). You must understand path difference and constructive interference.
*   **De Broglie's Hypothesis:** The relation between a particle's momentum $p$ and its wavelength $\lambda$, given by $\lambda = h/p$.
*   **Basic Electromagnetism & Mechanics:** The relationship between accelerating potential $V$, charge $e$, and kinetic energy $K$ ($K=eV$), and the classical definition of kinetic energy in terms of momentum ($K = p^2/2m$).

## How to study it (step by step)
1.  **Review Bragg's Law.** Draw the diagram for X-ray diffraction from crystal planes. Re-derive the condition for constructive interference, $n\lambda = 2d\sin\theta$, by identifying the path length difference between rays reflecting from adjacent planes.
2.  **Calculate the electron's wavelength.** Derive the formula for an electron's de Broglie wavelength purely in terms of the accelerating voltage $V$. Start with $\lambda = h/p$ and substitute expressions for $p$ using $K=p^2/2m_e$ and $K=eV$.
3.  **Analyze the experimental geometry.** Draw the Davisson-Germer setup: electron gun, crystal target, and movable detector. Critically, identify the scattering angle $\phi$ (between incident and scattered beams) and the Bragg angle $\theta$ (between the beam and the crystal plane). Derive the geometric relationship between them.
4.  **Combine the physics.** Substitute your expression for the de Broglie wavelength (from step 2) into Bragg's Law (from step 1). This gives a single equation relating the accelerating voltage $V$ to the angle of constructive interference $\theta$.
5.  **Solve the canonical example.** Use the experimental values from Davisson and Germer's 1927 paper: an accelerating voltage of $V=54$ V, which produced a first-order ($n=1$) peak at a scattering angle of $\phi=50^\circ$. Use the known interplanar spacing for nickel, $d=0.091$ nm.
6.  **Verify the result.** First, use the voltage to predict the wavelength. Then, use that wavelength in Bragg's Law to predict the scattering angle. Compare your prediction to the observed $50^\circ$. The close match is the proof.
7.  **Invert the problem.** Start with the observed angle $\phi=50^\circ$ and use Bragg's Law to calculate the experimental wavelength of the particle. Then, use the de Broglie relation to calculate the momentum and energy of that particle. Finally, find the voltage $V$ required to produce that energy. It should be very close to 54 V.

## Key ideas, with intuition
1.  **Crystals are Nature's Diffraction Gratings for Matter Waves.** For diffraction to be observable, the spacing of the grating must be comparable to the wavelength of the wave. The de Broglie wavelength of a low-energy electron is on the order of angstroms ($10^{-10}$ m), which is precisely the scale of atomic spacing in a crystal. The regular, repeating structure of the nickel crystal provided the perfect "grating" to diffract the electron "waves".

2.  **Voltage is the Wavelength Knob.** An experimenter can directly control the kinetic energy of the electrons by tuning the accelerating voltage $V$. Since wavelength depends on momentum ($\lambda = h/p$) and momentum depends on kinetic energy ($p = \sqrt{2mK}$), the voltage acts as a direct control for the electron's wavelength.
    $$ \lambda = \frac{h}{p} = \frac{h}{\sqrt{2m_e K}} = \frac{h}{\sqrt{2m_e eV}} $$
    Increasing the voltage shortens the wavelength. This is a powerful experimental tool.

3.  **Bragg's Law Governs the Scattering.** The electrons scatter off planes of atoms within the crystal, not just the surface. Constructive interference (a peak in detected electrons) occurs when the path difference for waves reflecting from adjacent planes is an integer multiple of the wavelength. This is the exact same physics as X-ray diffraction, governed by Bragg's Law.
    $$ n\lambda = 2d\sin\theta $$
    Here, $d$ is the interplanar spacing, and $\theta$ is the angle between the electron beam and the atomic plane.

## Worked example
**Problem:** Davisson and Germer accelerated electrons through a potential of $V=54$ V. These electrons scattered from a nickel crystal with an interplanar spacing of $d=0.091$ nm. For the first-order ($n=1$) diffraction peak, predict the scattering angle $\phi$ at which the detector would find a maximum intensity.

**Solution:**

1.  **Find the electron's de Broglie wavelength.**
    First, find the kinetic energy in Joules.
    $K = eV = (1.602 \times 10^{-19} \text{ C})(54 \text{ V}) = 8.65 \times 10^{-18} \text{ J}$.
    Next, find the momentum.
    $p = \sqrt{2m_e K} = \sqrt{2(9.11 \times 10^{-31} \text{ kg})(8.65 \times 10^{-18} \text{ J})} = 3.97 \times 10^{-24} \text{ kg}\cdot\text{m/s}$.
    Finally, calculate the wavelength.
    $\lambda = \frac{h}{p} = \frac{6.626 \times 10^{-34} \text{ J}\cdot\text{s}}{3.97 \times 10^{-24} \text{ kg}\cdot\text{m/s}} = 1.67 \times 10^{-10} \text{ m} = 0.167 \text{ nm}$.
    *This step connects the experimental control (voltage) to the wave property (wavelength).*

2.  **Use Bragg's Law to find the Bragg angle $\theta$.**
    We use the condition for constructive interference, $n\lambda = 2d\sin\theta$, with $n=1$.
    $1 \cdot (0.167 \text{ nm}) = 2(0.091 \text{ nm})\sin\theta$.
    $\sin\theta = \frac{0.167}{2 \cdot 0.091} = 0.917$.
    $\theta = \arcsin(0.917) = 66.6^\circ$.
    *This step uses the wave property and the crystal structure to find the internal scattering angle.*

3.  **Convert the Bragg angle $\theta$ to the observable scattering angle $\phi$.**
    From the geometry of scattering from the crystal planes (see diagram), the angle of incidence with the plane is $\theta$ and the angle of reflection is also $\theta$. The total scattering angle $\phi$ is the angle between the initial and final beam directions. The angle between the crystal plane and the incident beam is $\theta$. The angle between the crystal plane and the scattered beam is also $\theta$. The total angle $\phi$ is supplementary to the angle $2\theta$ inside the crystal. Thus, $\phi + 2\theta = 180^\circ$ is incorrect. A better diagram shows the incident beam, the crystal surface, and the scattered beam. The angle between the incident and scattered beam is $\phi$. If the crystal plane is parallel to the surface, the angle of incidence to the plane is $\theta$, and the angle of scattering from the plane is $\theta$. The angle of deviation from the original path is $\phi$. The geometry is $\phi = 180^\circ - 2\theta$. No, that is for reflection from a single surface. For Bragg diffraction, the angle between the incident beam and the crystal plane is $\theta$. The scattered beam also makes an angle $\theta$ with the plane. The angle between the incident and scattered beams is $\phi$. Therefore, $\theta + \theta + \phi$ is not a straight line. Look at the diagram: the angle between the incident beam and the crystal *normal* is $90^\circ - \theta$. The angle between the scattered beam and the normal is also $90^\circ - \theta$. The total angle between them is $\phi$. The geometry for this setup is that the angle of incidence relative to the surface is $\alpha$, and $\phi$ is the scattering angle. The Bragg planes are not parallel to the surface. For the specific orientation in the experiment, the relation is $\phi = 2\alpha$ where $\sin\alpha = \sin\theta$. Wait, let's use the standard, simpler geometric relation that is taught. The angle between the incident beam and the crystal plane is $\theta$. The angle between the scattered beam and the crystal plane is also $\theta$. The angle of deviation, $\phi$, relates to $\theta$ via the angle of the crystal face. For the specific (111) planes of Nickel, the geometry simplifies such that $\theta = 90^\circ - \phi/2$. Let's use this standard relation.
    $\theta = 90^\circ - \phi/2 \implies \phi = 2(90^\circ - \theta)$.
    $\phi = 2(90^\circ - 66.6^\circ) = 2(23.4^\circ) = 46.8^\circ$.
    *This final step connects the internal physics to the externally measured angle.*

**Reflection:** Our calculated value of $\phi \approx 47^\circ$ is very close to the experimentally observed value of $50^\circ$. The small discrepancy is due to the simplified model (e.g., the refractive index of the crystal for electrons is slightly different from 1). The remarkable agreement between the de Broglie/Bragg theory and the experimental result was the definitive proof of the wave nature of electrons.

## Diagrams

**Experimental Setup:**
```text
                  e- beam
                  ------>
                  ------>
Electron Gun      ------>   Ni Crystal
 (Voltage V)      ------>     /
                            /
                           / Scattering Angle (phi)
                          /
                         /
                        V
                     Detector (movable)
```

**Bragg Diffraction Geometry:**
```text
      Incident Ray 1
      --------------->

      Incident Ray 2      \  theta  / Scattered Ray 1
      --------------->     \       / ------------>
      |                 .   \     /
 Path |                 .    \   /
 Diff |                 .     \ /
      v                 .      X
      ------------------.------------------ Plane 1 (Spacing d)
                        .     / \
                        .    /   \
                        .   /     \
                        .  / theta \  Scattered Ray 2
                        . /         \ ------------->
      ------------------.------------------ Plane 2
                        |<->|
                      d*sin(theta)

Total Path Difference = 2 * d * sin(theta)
```

## Memory technique — remember this forever
1.  **Story:** "Dave and Germer saw electrons **surf** a nickel." Imagine tiny surfers (electrons) riding waves. They don't crash into the nickel atoms like billiard balls; they glide and interfere along the crystal planes. The experiment is about *seeing* the electron's wave.

2.  **Formulas to Overlearn:**
    *   Electron Wavelength from Voltage: $\lambda = \frac{h}{\sqrt{2m_e eV}}$
    *   Bragg's Law: $n\lambda = 2d\sin\theta$

3.  **Spaced Repetition Schedule:** Review this topic and re-work the example problem from memory at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    *   **Goal:** Prove electrons are waves.
    *   **Method:** Show interference. Need a grating. A crystal is a grating.
    *   **Grating Physics:** What's the formula for crystal diffraction? Bragg's Law: $n\lambda = 2d\sin\theta$.
    *   **Electron Physics:** What is the electron's wavelength? De Broglie's idea: $\lambda = h/p$.
    *   **Experiment Control:** How do we control $p$? With kinetic energy, $K=p^2/2m_e$. How do we control $K$? With voltage, $K=eV$.
    *   **Chain:** $V \rightarrow K \rightarrow p \rightarrow \lambda$. Combine this chain with Bragg's law. You have now re-derived the entire theoretical basis of the experiment.

## Common mistakes
*   **Angle Confusion:** Mixing up the scattering angle $\phi$ (measured by the detector) and the Bragg angle $\theta$ (used in the formula, relative to the crystal plane). Always draw the geometry and relate them. For this experiment, the key relation is often given as $\theta = 90^\circ - \phi/2$.
*   **Unit Inconsistency:** Using electron-volts (eV) for energy in one part of a calculation and Joules (J) in another without converting. Always convert eV to Joules before using formulas with SI units like $h$, $m_e$, etc.
*   **Using Atomic Spacing for `d`:** Bragg's law uses the interplanar spacing $d$, which is the perpendicular distance between planes of atoms. This is not always the same as the distance between two adjacent atoms.
*   **Forgetting `n=1`:** The Davisson-Germer result was for the first-order maximum. Students sometimes leave $n$ as a variable and get confused. For most problems on this topic, assume $n=1$ unless told otherwise.

## Self-check
1.  If the accelerating voltage in the Davisson-Germer experiment is quadrupled from 54 V to 216 V, what is the new de Broglie wavelength of the electrons?
2.  An electron beam is accelerated through 80 V. It is incident on a crystal with an unknown interplanar spacing $d$. If the first-order diffraction maximum is observed at a scattering angle of $\phi=60^\circ$, what is the value of $d$?
3.  Neutrons can also exhibit wave-like properties. A beam of thermal neutrons has a kinetic energy of $0.025$ eV. If this beam were directed at the same nickel crystal ($d=0.091$ nm), would you expect to see a first-order diffraction peak? Justify your answer with a calculation. (Proton mass $\approx$ Neutron mass $\approx 1.67 \times 10^{-27}$ kg).