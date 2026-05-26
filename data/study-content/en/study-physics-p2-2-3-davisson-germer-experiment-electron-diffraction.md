## 1. The one-sentence answer
**The Davisson-Germer experiment demonstrated that a beam of electrons incident on a nickel crystal produces intensity maxima at angles satisfying the Bragg condition for wave diffraction, thereby confirming Louis de Broglie’s hypothesis that matter possesses wave properties with wavelength \(\lambda = h/p\).**

In 1927 Clinton Davisson and Lester Germer directed a monoenergetic beam of electrons onto a single-crystal nickel target inside a vacuum chamber. They observed that the scattered electrons formed sharp peaks in intensity at specific angles rather than a smooth distribution. Those angles matched the predictions of Bragg’s law once the de Broglie wavelength was inserted, proving that electrons interfere with themselves exactly as waves must.

The experiment closed the logical loop opened by the photoelectric effect: light had been shown to behave like particles; electrons were now shown to behave like waves. The measured wavelength agreed with \(h/\sqrt{2mE}\) to within a few percent, furnishing the first quantitative verification of wave-particle duality for matter.

> [!NOTE]
> The decisive “aha” is that a classical particle picture predicts only a smooth cosine distribution of scattered intensity; the observed sharp Bragg peaks appear only when the electrons are assigned a wavelength and allowed to diffract coherently from the periodic lattice planes.

## 2. Why this matters — concrete and current
Electron diffraction is the operating principle of low-energy electron diffraction (LEED) surface-analysis instruments manufactured by companies such as Omicron and SPECS; these tools determine atomic positions on crystal surfaces to 0.01 Å precision and are standard in semiconductor process development at Intel and TSMC.

Transmission electron microscopes (TEMs) from Thermo Fisher and JEOL rely on the same coherent scattering physics; the 2023 Nature paper reporting atomic-resolution imaging of twisted bilayer graphene at 30 kV accelerating voltage explicitly cites the Davisson-Germer geometry to calibrate the electron coherence length.

Neutron and atom interferometers used in precision measurements of the fine-structure constant (e.g., the 2022 LNE-SYRTE result) trace their design lineage to the nickel-crystal geometry; the same Bragg-angle relation appears in the phase-shift calculation.

In aerospace materials qualification, electron backscatter diffraction (EBSD) systems from Oxford Instruments map grain orientations in turbine-blade superalloys; the acceptance criterion for single-crystal CMSX-4 blades on the LEAP engine explicitly requires verification that the observed Kikuchi bands satisfy the same wavelength-lattice condition first measured in 1927.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| de Broglie relation      | Supplies the wavelength \(\lambda = h/p\) that must satisfy Bragg’s law |
| Bragg’s law              | Gives the geometric condition for constructive interference from lattice planes |
| Elastic scattering       | Ensures kinetic energy (hence \(\lambda\)) is unchanged upon reflection |
| Crystal lattice spacing  | Provides the known distance \(d\) that converts observed angle into wavelength |

## 4. Building the idea — from intuition to formalism

### Step 1 — Matter waves exist only if wavelength matches lattice spacing
A free electron carries momentum \(p = \sqrt{2mE}\). If it also possesses a wave nature, its wavelength must be \(\lambda = h/p\). For diffraction to be observable, this wavelength must be comparable to the spacing between atoms in a crystal (\(\approx 2\) Å).  
**Concrete example**: 54 eV electrons give \(\lambda \approx 1.67\) Å, close to the Ni(111) plane spacing.  
\[
\lambda = \frac{h}{\sqrt{2mE}}
\]
> [!WARNING]
> If you insert the wrong mass or forget to convert eV to joules, the calculated \(\lambda\) will be off by orders of magnitude and no Bragg peak will appear at the measured angle.

### Step 2 — Lattice planes act as a three-dimensional grating
Nickel atoms form parallel planes spaced by \(d\). An electron wave reflected from successive planes travels an extra path length \(2d\sin\theta\).  
\[
2d\sin\theta = n\lambda
\]
> [!WARNING]
> Using the external scattering angle instead of the glancing angle \(\theta\) measured from the plane produces a 90° error and predicts peaks where none exist.

### Step 3 — Intensity maxima require phase coherence
Only when the path difference is an integer number of wavelengths do the partial waves from every plane add constructively. The detector therefore records a sharp peak rather than uniform scattering.  
> [!WARNING]
> Treating electrons as classical billiard balls predicts a smooth \(\cos\phi\) angular distribution; the peak-to-valley ratio would be 1 instead of the observed >10.

### Step 4 — Energy is conserved in elastic reflection
The incident kinetic energy fixes \(\lambda\); after reflection the same energy is recovered, so the same \(\lambda\) applies.  
\[
E = \frac{p^2}{2m} \quad \Rightarrow \quad \lambda = \frac{h}{\sqrt{2mE}}
\]
> [!WARNING]
> Inelastic channels (plasmon losses) broaden the peak and shift the apparent angle; the original experiment used retarding grids to reject electrons that lost >1 eV.

### Step 5 — Measured angles yield wavelength that matches de Broglie prediction
Davisson and Germer recorded a first-order maximum at \(\theta = 50^\circ\) for 54 eV electrons with \(d = 2.15\) Å. Inserting into Bragg’s law gave \(\lambda = 1.65\) Å, agreeing with \(h/\sqrt{2mE}\) to 1 %.  
> [!WARNING]
> Neglecting the inner potential of the crystal (≈18 V for Ni) produces a 3 % systematic discrepancy that was the main source of early controversy.

### Step 6 — Result: electrons diffract exactly as waves
The experiment therefore demonstrates that the de Broglie relation governs the propagation of electrons through periodic potentials, establishing wave mechanics for matter.

## 5. Worked examples — every step shown

**Example 1 — Calculate de Broglie wavelength**  
*Given:* Electron accelerated through 54 V.  
*Find:* \(\lambda\).  
\[
p = \sqrt{2mE},\quad E = 54\,\text{eV} = 8.64\times10^{-18}\,\text{J}
\]  
*Why:* Convert voltage to energy.  
\[
p = \sqrt{2\times9.11\times10^{-31}\times8.64\times10^{-18}} = 3.99\times10^{-24}\,\text{kg m s}^{-1}
\]  
*Why:* Non-relativistic momentum.  
\[
\lambda = \frac{h}{p} = \frac{6.626\times10^{-34}}{3.99\times10^{-24}} = 1.66\times10^{-10}\,\text{m} = 1.66\,\text{Å}
\]  
**1.66 Å**  
*Reflection:* The arithmetic is elementary, yet the unit conversion from eV to joules is the most common source of numerical error.

**Example 2 — Predict Bragg angle**  
*Given:* \(\lambda = 1.66\) Å, \(d = 2.15\) Å, \(n=1\).  
*Find:* \(\theta\).  
\[
\sin\theta = \frac{n\lambda}{2d} = \frac{1.66}{4.30} = 0.386
\]  
*Why:* Direct substitution into Bragg’s law.  
\[
\theta = \arcsin(0.386) = 22.7^\circ
\]  
**22.7°**  
*Reflection:* The angle is measured from the plane, not from the surface normal.

**Example 3 — Recover voltage from observed angle**  
*Given:* First-order peak at 50° from Ni(111) planes, \(d=2.15\) Å.  
*Find:* accelerating voltage.  
\[
\lambda = 2d\sin 50^\circ = 3.29\,\text{Å}
\]  
*Why:* Solve Bragg’s law for \(\lambda\).  
\[
E = \frac{h^2}{2m\lambda^2} = 54.4\,\text{eV}
\]  
**54.4 V**  
*Reflection:* Inner-potential correction raises the effective voltage inside the crystal by ≈18 V, reconciling the 54 V external reading with the 1.65 Å wavelength.

**Example 4 — Distinguish elastic from inelastic channel**  
*Given:* Same geometry, but detector records a broad hump at 40° when grid bias is removed.  
*Find:* energy loss responsible.  
\[
\lambda' = 2d\sin 40^\circ = 2.76\,\text{Å} \quad \Rightarrow \quad E' = 77\,\text{eV}
\]  
Energy loss = 23 eV (plasmon).  
*Reflection:* Retarding-field analysis is essential; without it the diffraction peak is swamped by inelastic background.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using surface normal angle        | Confuses \(\theta\) definition in Bragg’s law | Always measure glancing angle from lattice plane     |
| Forgetting inner potential        | Crystal refracts electron wave              | Add measured inner potential (≈18 V for Ni) to E     |
| Ignoring finite coherence length  | Polycrystalline or dirty surface washes out peaks | Use single-crystal, atomically clean target          |
| Relativistic correction omitted   | At >100 keV the non-relativistic \(\lambda\) errs | Use \(\lambda = h/\sqrt{2mE(1+E/2mc^2)}\)            |
| Treating electrons as classical particles | Predicts smooth scattering only          | Compute expected peak-to-valley ratio from wave model|
| Wrong order \(n\) assignment      | Higher-order peaks misidentified          | Verify multiple orders satisfy same \(\lambda\)      |
| Detector solid-angle integration  | Peak appears broadened                     | Record differential intensity dI/dΩ                  |

## 7. The textbook-precise statement
A collimated beam of electrons with de Broglie wavelength \(\lambda = h/\sqrt{2mE}\) is incident on a monatomic crystal whose lattice planes are spaced by distance \(d\). Elastic scattering occurs when the Bragg condition  
\[
n\lambda = 2d\sin\theta,\qquad n=1,2,\dots
\]  
is satisfied, where \(\theta\) is the glancing angle between the beam and the reflecting planes. Under these conditions the differential scattered intensity exhibits sharp maxima whose angular locations and voltage dependence match the wave-mechanical prediction to within experimental error. (Davisson & Germer, *Phys. Rev.* **30**, 705 (1927); see also Griffiths, *Introduction to Quantum Mechanics*, 2nd ed., §1.2.)

## 8. Visual — diagram or schematic
```text
Electron gun (V_acc)
        |
        v  monoenergetic beam
        |
   θ ↗  |  ↘ detector
      \ | /
       \|/  Ni crystal
      //////  (111) planes, d = 2.15 Å
     ///////
```
Horizontal axis is crystal surface; vertical dashed lines mark lattice planes. Angle \(\theta\) is measured between incident ray and plane, not surface normal.

## 9. The memory technique
1. **The hook** — Picture electrons as tiny water waves washing across a picket fence; only when the fence spacing is an integer number of wave crests do you see a bright reflected beam.  
2. **What to overlearn** — \(\lambda = h/\sqrt{2mE}\), Bragg’s law \(2d\sin\theta = n\lambda\), and the numerical result \(\lambda(54\,\text{eV}) \approx 1.65\,\text{Å}\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive \(\lambda\) from \(E = p^2/2m\), insert into Bragg’s law, solve for \(\theta\).

## 10. What this unlocks
The experiment supplies the empirical foundation for the Schrödinger equation and for all subsequent matter-wave optics.  
- Electron diffraction in TEM and LEED surface science  
- de Broglie wavelength in scanning tunneling microscopy resolution limits  
- Aharonov–Bohm phase and electron interferometry  
- Band theory of solids via Kronig–Penney model  
- Quantum scattering theory and partial-wave analysis

## 11. Self-check — five questions, no answers
1. An electron accelerated through 150 V strikes a crystal with \(d = 1.54\) Å. At what glancing angle does the first-order Bragg peak appear?  
2. Why does the observed peak voltage shift when the crystal is rotated by 5°?  
3. A second-order peak is recorded at the same angle as a first-order peak for a different voltage. Which voltage is higher and by what factor?  
4. If the inner potential is neglected, the derived wavelength is 3 % too large. What voltage correction restores agreement?  
5. In an inelastic channel the electrons lose 25 eV. By how many degrees does the apparent Bragg angle change for the same lattice plane?