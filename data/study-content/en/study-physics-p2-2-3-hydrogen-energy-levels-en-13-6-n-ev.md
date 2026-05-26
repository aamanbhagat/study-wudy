## 1. The one-sentence answer
**The allowed energies of an electron bound to a proton are discrete levels given by \(E_n = -13.6/n^2\) eV.**

An electron and proton attract each other through the Coulomb force. Classically the electron could orbit at any radius and possess any negative total energy. Quantum mechanics changes this: the wave nature of the electron together with the requirement that the wave function remain single-valued around the nucleus forces the orbital radius to take only specific values. Each allowed radius corresponds to one allowed energy, and the lowest of these energies is −13.6 eV when the electron occupies the smallest orbit.

The same energies emerge from both the 1913 Bohr model (angular-momentum quantization) and the exact solution of the Schrödinger equation for the Coulomb potential. Because the levels are negative, the electron is bound; zero energy marks the ionization threshold. The integer \(n\) that labels each level is called the principal quantum number.

> [!NOTE]
> The factor 13.6 eV is not arbitrary; it is the ionization energy of hydrogen expressed in electron-volts and arises directly from the combination of fundamental constants \(m_e e^4/(2\hbar^2)\) once units are converted.

## 2. Why this matters — concrete and current
Hydrogen line spectra are the calibration source for every ultraviolet, optical, and near-infrared spectrometer flown on spacecraft; the Lyman series (transitions to \(n=1\)) fixes wavelength scales for the Hubble and James Webb instruments to better than 0.001 nm.

Semiconductor defect physics uses the hydrogenic model to predict donor and acceptor binding energies in silicon and gallium arsenide; the 13.6 eV result is simply scaled by the dielectric constant and effective mass, guiding doping profiles in every CMOS process node below 7 nm.

Rydberg atoms, prepared in states with \(n>50\), serve as sensitive electric-field sensors in plasma diagnostics for Hall-effect thrusters; their transition frequencies shift linearly with the local field, allowing non-invasive mapping inside operating ion engines.

Laser cooling and trapping of antihydrogen at CERN relies on the same level structure to drive the 1S–2S two-photon transition at 243 nm; any measured deviation from −13.6 eV/4 would signal CPT violation.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Coulomb’s law            | Supplies the potential energy \(U(r)=-ke^2/r\)            |
| Quantization of angular momentum | Bohr’s postulate that produces discrete radii             |
| Reduced mass             | Corrects the electron mass for finite proton mass         |
| Wave-function single-valuedness | Enforces \(n\) integer in the full quantum treatment     |

## 4. Building the idea — from intuition to formalism

### Step 1 — Classical bound orbit
An electron of mass \(m_e\) moving in the Coulomb field of a proton has total energy \(E=K+U\). For a circular orbit the centripetal force equals the electrostatic attraction, yielding a continuous range of possible radii and energies.  
**Example:** At \(r=0.1\) nm the classical energy can be any value less than zero.  
$$E=\frac12 m_e v^2-\frac{ke^2}{r}.$$  
> [!WARNING] Treating the orbit as continuous hides the fact that only certain radii produce standing de Broglie waves.

### Step 2 — Angular-momentum quantization
Bohr postulated that angular momentum is an integer multiple of \(\hbar\):  
$$L=m_evr=n\hbar,\qquad n=1,2,3,\dots$$  
This single extra condition discretizes the allowed radii.

### Step 3 — Solve for radius
Combine the force balance \(m_ev^2/r=ke^2/r^2\) with the quantization condition to obtain the Bohr radius scaled by \(n^2\):  
$$r_n=n^2a_0,\qquad a_0=\frac{4\pi\epsilon_0\hbar^2}{m_ee^2}=0.529\,\text{Å}.$$

### Step 4 — Substitute back into energy
Kinetic energy is half the magnitude of potential energy for any inverse-square force, so  
$$E_n=-\frac{ke^2}{2r_n}=-\frac{m_ee^4}{8\epsilon_0^2h^2n^2}.$$  
Evaluating the prefactor in electron-volts yields the constant 13.6 eV.

### Step 5 — Reduced-mass correction
Replace \(m_e\) by the reduced mass \(\mu=m_em_p/(m_e+m_p)\) to account for proton motion; the numerical value shifts only in the sixth digit but is required for spectroscopic precision.

### Step 6 — Full quantum-mechanical confirmation
The time-independent Schrödinger equation in spherical coordinates separates; the radial equation yields the same energies when the associated Laguerre polynomials are required to be finite at infinity. The result is identical:  
$$E_n=-\frac{\mu e^4}{8\epsilon_0^2h^2n^2}.$$

### Step 7 — Textbook statement
The derivation above reaches the exact eigenvalue spectrum of the hydrogen Hamiltonian.

## 5. Worked examples — every step shown

**Example 1 — Ground-state energy**  
*Given:* \(n=1\).  
*Find:* \(E_1\).  
Substitute \(n=1\) directly into the formula:  
$$E_1=-13.6/1^2=-13.6\,\text{eV}.$$  
*Why:* The formula already incorporates all constants.  
**−13.6 eV**  
*Reflection:* This is the ionization energy; any photon with \(E>13.6\) eV can free the electron.

**Example 2 — First excited level**  
*Given:* \(n=2\).  
*Find:* \(E_2\).  
$$E_2=-13.6/4=-3.40\,\text{eV}.$$  
*Why:* Division by \(n^2\) scales the energy.  
**−3.40 eV**  
*Reflection:* The level is four times closer to zero, matching the \(n^2\) growth of orbital radius.

**Example 3 — Ionization from n=3**  
*Given:* Electron at \(n=3\).  
*Find:* Energy required to reach \(E=0\).  
$$E_\text{ion}=0-(-13.6/9)=1.51\,\text{eV}.$$  
*Why:* Subtract the current energy from the continuum threshold.  
**1.51 eV**  
*Reflection:* Demonstrates that higher levels are easier to ionize.

**Example 4 — Transition wavelength**  
*Given:* Electron drops from \(n=3\) to \(n=2\).  
*Find:* Wavelength of emitted photon.  
Energy difference:  
$$\Delta E=-13.6(1/4-1/9)=-13.6(5/36)=-1.89\,\text{eV}.$$  
Convert to joules and apply \(E=hc/\lambda\):  
$$\lambda=hc/\Delta E=656\,\text{nm}.$$  
*Why:* Photon energy equals level spacing.  
**656 nm**  
*Reflection:* This is the well-known H-α line; the calculation links energy levels directly to observable spectra.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                              |
|-------------------------------------|---------------------------------------------|----------------------------------------------|
| Using \(m_e\) instead of \(\mu\)    | Forgetting proton recoil                    | Always insert reduced mass for spectroscopic work |
| Taking \(|E_n|\) as positive binding energy | Sign convention confusion                   | Keep the minus sign; binding energy is \(-E_n\) |
| Allowing \(n=0\)                    | Intuitive but forbidden                     | \(n\) starts at 1; \(n=0\) produces infinite negative energy |
| Confusing \(n\) with orbital angular momentum \(l\) | Notation overlap                            | Remember \(n\) sets energy; \(l=0\dots n-1\) |
| Expecting degeneracy in every potential | Hydrogen is special                         | Only \(1/r\) potentials produce \(n\)-only degeneracy |
| Omitting units conversion           | Mixing eV and joules                        | Convert \(\hbar\) and \(e\) consistently once |
| Applying formula to multi-electron atoms without screening | Over-generalization                         | Use only for hydrogen or scaled hydrogenic ions |

## 7. The textbook-precise statement
For the Hamiltonian  
$$H=-\frac{\hbar^2}{2\mu}\nabla^2-\frac{e^2}{4\pi\epsilon_0r}$$  
the bound-state eigenvalues are  
$$E_n=-\frac{\mu e^4}{8\epsilon_0^2h^2n^2},\qquad n=1,2,3,\dots$$  
with each level \((2n^2)\)-fold degenerate when spin is ignored. (Griffiths, *Introduction to Quantum Mechanics*, 2e, §4.2, Eq. 4.70.)

## 8. Visual — diagram or schematic
```text
Energy (eV)
  0  ───────────────────────────────────────  n = ∞   (continuum)
 -0.85 ────────────────────────────  n = 4
 -1.51 ────────────────────  n = 3
 -3.40 ───────────  n = 2
-13.60  ●  n = 1   (ground state)
```
Vertical arrows between levels represent allowed transitions; the length of each arrow is proportional to photon energy.

## 9. The memory technique
1. **The hook** — Picture a ladder whose rungs get four times farther apart as you climb; the bottom rung sits at −13.6 eV and the top rung floats at zero.
2. **What to overlearn** — \(E_n=-13.6/n^2\) eV exactly; \(n\) integer \(\ge1\); ionization energy = 13.6 eV.
3. **Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from angular-momentum quantization plus centripetal force, then insert constants.

## 10. What this unlocks
The hydrogen spectrum is the gateway to all one-electron ions (He\(^+\), Li\(^{2+}\)) and to the quantum treatment of any central-force problem.  
- Balmer, Lyman, Paschen series formulas  
- Fine-structure corrections and Lamb shift  
- Quantum defect in alkali atoms  
- Selection rules \(\Delta l=\pm1\), \(\Delta m_l=0,\pm1\)  
- Rydberg constant determination and precision metrology

## 11. Self-check — five questions, no answers
1. Compute the energy required to excite hydrogen from the ground state to \(n=4\).

2. An electron in hydrogen absorbs a 12.1 eV photon. Which level does it reach, and is the atom ionized?

3. Why does the energy difference between \(n\) and \(n+1\) decrease as \(n\) increases?

4. A hypothetical atom obeys \(E_n=-20/n^2\) eV. What is its ionization energy from the third level?

5. Identify the hidden assumption that would make the formula \(E_n=-13.6/n^2\) eV invalid for a two-electron atom.