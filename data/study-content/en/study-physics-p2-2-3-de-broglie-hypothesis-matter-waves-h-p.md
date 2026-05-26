## 1. The one-sentence answer
**The de Broglie hypothesis states that every particle with momentum \(p\) possesses an associated wave whose wavelength is exactly \(\lambda = h/p\).**

Waves and particles were long treated as separate categories. Light sometimes diffracts like a wave and sometimes knocks electrons out of metals like a particle. De Broglie asked why the same logic should not run in the opposite direction: if light carries both aspects, then objects we already call particles should carry a wave aspect as well.

The wavelength follows at once once the photon relations \(E = hf\) and \(p = E/c\) are rewritten for any particle that has rest mass. The result is universal: the larger the momentum, the shorter the wave. Macroscopic objects therefore have wavelengths so small they are undetectable; electrons and neutrons have wavelengths comparable to atomic spacings and therefore produce measurable interference.

> [!NOTE]
> The single deep insight is that wavelength is fixed solely by momentum; no separate “wave equation” is postulated at this stage—the relation itself forces wave behaviour into the kinematics of matter.

## 2. Why this matters — concrete and current
Electron microscopes at JEOL and Thermo Fisher achieve sub-angstrom resolution precisely because the de Broglie wavelength of 100–300 keV electrons is only a few picometres, far below optical wavelengths; the same relation sets the ultimate resolution limit when spherical aberration is corrected.

Semiconductor foundries rely on electron-beam lithography tools whose beam energy is chosen so that \(\lambda \approx 0.01\) nm, allowing direct writing of 5 nm features; any miscalculation of \(\lambda = h/p\) produces stitching errors between adjacent exposure fields.

Neutron powder diffractometers at NIST and the Institut Laue–Langevin select neutron momenta to place \(\lambda\) between 0.1 nm and 0.5 nm, matching interatomic distances; the resulting Bragg peaks map crystal structures of battery materials under development for electric vehicles.

In particle accelerators such as the LHC, the de Broglie wavelength of protons at 6.5 TeV centre-of-mass energy reaches \(10^{-19}\) m, setting the smallest distance scale that can be probed and thereby determining the design energy of any future collider.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Planck’s constant \(h\)  | Supplies the conversion factor between energy and frequency |
| Momentum \(p = mv\)      | The variable to which wavelength is inversely proportional |
| Photon relations \(E=hf\), \(p=E/c\) | Provide the template that is generalised to massive particles |
| Wave interference        | Explains why a wavelength attached to a particle produces observable fringes |

## 4. Building the idea — from intuition to formalism

### Step 1 — Light already mixes waves and particles
Light produces interference patterns yet delivers energy in quanta \(E = hf\). The same quanta carry momentum \(p = h/\lambda\).  
Example: a 500 nm photon has \(p = 1.33 \times 10^{-27}\) kg m s\(^{-1}\).  
Formal statement:  
$$p = \frac{h}{\lambda}.$$  
> [!WARNING] Treating the photon relation as merely “for light” blocks the symmetry argument that follows.

### Step 2 — Symmetry demands the same relation for matter
If waves can behave as particles, particles should be able to behave as waves; otherwise an arbitrary distinction remains between the two categories.  
No numerical example yet; the claim is logical consistency.  
Formal statement: the association \(p \leftrightarrow \lambda\) must hold for any entity carrying momentum.

### Step 3 — Replace the photon energy–momentum link with the relativistic or classical link
For a massive particle the energy–momentum relation is \(E^2 = (pc)^2 + (mc^2)^2\) (or \(E = p^2/2m\) non-relativistically). Frequency is still tied to energy by \(E = hf\).  
Example: an electron with \(p = 5.3 \times 10^{-25}\) kg m s\(^{-1}\) yields \(E \approx 3\) keV classically.  
Formal statement: equate the two expressions for \(E\) and solve for \(\lambda\).

### Step 4 — Eliminate frequency and energy
Divide \(E = hf\) by \(E = pc\) (ultra-relativistic limit) or keep the general case; either route produces  
$$\lambda = \frac{h}{p}.$$  
The frequency cancels, leaving wavelength determined only by momentum.

### Step 5 — State the hypothesis in final form
Every free particle is accompanied by a wave of wavelength \(\lambda = h/p\). The wave manifests itself through interference and diffraction whenever apertures or gratings have dimensions comparable to \(\lambda\).

## 5. Worked examples — every step shown

**Example 1 — Thermal neutron**  
*Given:* Neutron mass \(m = 1.675 \times 10^{-27}\) kg, speed \(v = 2200\) m s\(^{-1}\).  
*Find:* \(\lambda\).  
\(p = mv = 3.685 \times 10^{-24}\) kg m s\(^{-1}\).  
*Why:* Direct definition of momentum.  
\(\lambda = h/p = 6.626 \times 10^{-34}/3.685 \times 10^{-24} = 0.180\) nm.  
*Why:* Insert de Broglie relation.  
**0.180 nm**  
*Reflection:* The value matches typical interatomic spacings, so diffraction occurs; the arithmetic is only division once \(p\) is known.

**Example 2 — 100 keV electron**  
*Given:* Kinetic energy \(K = 100\) keV.  
*Find:* \(\lambda\).  
Use relativistic momentum: \(p = \sqrt{2mK + K^2/c^2}\).  
\(m c^2 = 511\) keV, so \(p c = \sqrt{2\cdot511\cdot100 + 100^2} = 177.6\) keV.  
\(p = 177.6 \times 10^3 \times 1.602 \times 10^{-19}/3 \times 10^8 = 9.48 \times 10^{-23}\) kg m s\(^{-1}\).  
\(\lambda = h/p = 6.626 \times 10^{-34}/9.48 \times 10^{-23} = 6.99 \times 10^{-12}\) m.  
**6.99 pm**  
*Reflection:* Relativistic correction changes the result by ~10 %; always check \(K\) versus rest energy.

**Example 3 — Macroscopic object**  
*Given:* 100 g ball at 10 m s\(^{-1}\).  
*Find:* \(\lambda\).  
\(p = 1\) kg m s\(^{-1}\).  
\(\lambda = 6.626 \times 10^{-34}\) m.  
**6.6 \times 10^{-34} m**  
*Reflection:* Wavelength lies 20 orders below nuclear sizes; interference is unobservable, explaining classical behaviour.

**Example 4 — Same momentum, different masses**  
*Given:* Electron and proton, both with \(p = 10^{-24}\) kg m s\(^{-1}\).  
*Find:* ratio of wavelengths.  
\(\lambda = h/p\) is identical for both.  
**Ratio = 1**  
*Reflection:* Wavelength depends only on momentum, not mass; this universality is frequently overlooked.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using \(v\) instead of \(p\)      | Confusing wavelength with velocity          | Always compute \(p = mv\) or \(\gamma mv\) first |
| Inserting rest mass into \(E = hf\) | Mixing rest energy with wave frequency      | Use only kinetic or total energy consistent with \(p\) |
| Forgetting relativistic momentum  | Defaulting to classical \(p = mv\) at high speed | Check \(K\) against \(mc^2\) before calculating |
| Expecting wave to have mass       | Visualising the wave as a physical ripple   | Treat \(\lambda\) as a kinematic label only   |
| Applying \(\lambda = h/p\) inside potentials | Relation derived for free particles         | Use it only in field-free regions or match boundary conditions |
| Confusing group velocity with phase velocity | Both appear in wave derivations             | Verify \(v_g = p/m\) equals particle velocity |
| Assuming \(\lambda\) changes with observer | Ignoring that \(p\) is frame-dependent      | Transform four-momentum, not \(\lambda\) directly |

## 7. The textbook-precise statement
De Broglie’s hypothesis (1924) asserts that any free particle of momentum \(\mathbf{p}\) is associated with a plane wave \(\psi(\mathbf{r},t) = A\exp[i(\mathbf{k}\cdot\mathbf{r}-\omega t)]\) whose wave vector satisfies \(\hbar\mathbf{k}=\mathbf{p}\) and whose angular frequency satisfies \(\hbar\omega=E\), where \(E\) is the relativistic energy belonging to \(\mathbf{p}\). Consequently the wavelength is  
$$\lambda=\frac{h}{p}.$$  
The hypothesis was confirmed by Davisson and Germer (1927) and by G. P. Thomson. See Griffiths, *Introduction to Quantum Mechanics*, 2nd ed., §1.3.

## 8. Visual — diagram or schematic
```text
p (momentum axis)
   ↑
   │          short λ (high p)
   │   ●──────────────────────
   │         electron 100 keV
   │
   │          medium λ
   │   ●──────────────────────
   │         thermal neutron
   │
   │          long λ (low p)
   │   ●──────────────────────
   │         100 g ball
   └──────────────────────────────→ λ (wavelength)
          10^{-34}   10^{-10}   10^{-12} m
```
Horizontal axis logarithmic; each dot marks a real object whose measured diffraction or lack thereof matches the plotted \(\lambda = h/p\).

## 9. The memory technique
**The hook**  
Picture a tiny pilot wave stitched to every particle like a flag whose length shrinks exactly as the particle speeds up; the flag’s length is always \(h\) divided by momentum.

**What to overlearn**  
- \(\lambda = h/p\) (exact, universal)  
- \(h = 6.626 \times 10^{-34}\) J s  
- For electrons: \(\lambda(\text{pm}) \approx 1.226 / \sqrt{K(\text{eV})}\)

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

**First-principles fallback**  
Re-derive from \(E = hf\), \(p = E/c\) (or relativistic \(E(p)\)), cancel \(f\) and \(E\) to recover \(\lambda = h/p\).

## 10. What this unlocks
De Broglie waves supply the kinematic foundation for the Schrödinger equation, the Heisenberg uncertainty principle, and all subsequent quantum dynamics.  

- Schrödinger equation construction  
- Born interpretation of \(|\psi|^2\)  
- Electron diffraction and LEED surface analysis  
- Quantum tunnelling probability calculations  
- Band theory of solids

## 11. Self-check — five questions, no answers
1. Calculate the de Broglie wavelength of a 50 keV electron; state whether it will diffract from a crystal with 0.2 nm planes.  
2. An alpha particle and an electron have the same kinetic energy; which has the longer wavelength and by what factor?  
3. Why does the de Broglie relation remain valid inside a constant-potential region but require boundary matching at a step?  
4. A student computes \(\lambda = h/mv\) for a relativistic proton; identify the numerical error and its sign.  
5. Design a one-sentence experiment that would falsify \(\lambda = h/p\) while preserving \(E = hf\) for photons.