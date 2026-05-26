## 1. The one-sentence answer
**The atomic nucleus is a dense collection of protons and neutrons held together by the strong nuclear force, which acts attractively over distances of order 1 fm and overwhelms the electromagnetic repulsion between protons.**

A nucleus therefore contains two distinct nucleon species: the proton (charge +e, mass ≈ 938.3 MeV/c²) and the neutron (charge 0, mass ≈ 939.6 MeV/c²). Their spatial arrangement and relative numbers determine nuclear stability, size, and the energy released or absorbed in nuclear reactions. The strong force is charge-independent and saturates, so each nucleon interacts strongly with only its nearest neighbors rather than with every other nucleon in the nucleus.

This structure replaces the earlier plum-pudding picture of the atom and explains why nuclei occupy volumes of order 10^{-45} m³ while atoms occupy volumes of order 10^{-30} m³. The neutrons supply the additional strong attraction needed to bind multiple protons without adding extra Coulomb repulsion.

> [!NOTE]
> The strong force is not a simple pairwise potential; it is a residual color force between quarks that effectively becomes a Yukawa interaction between nucleons at distances greater than the nucleon size.

## 2. Why this matters — concrete and current
Nuclear thermal propulsion concepts under study by NASA and DARPA rely on accurate modeling of neutron moderation and fission-product recoil inside uranium fuel elements; the same nuclear-structure data determine the maximum specific impulse achievable before material limits are reached.

In inertial-confinement fusion at the National Ignition Facility, the deuterium-tritium reaction cross-section is computed from measured nucleon-nucleon phase shifts; small errors in the strong-force range parameter shift predicted ignition thresholds by several percent.

Positron-emission tomography scanners used in oncology detect the 511 keV annihilation photons from fluorine-18 decay; the production rate of this isotope inside a cyclotron depends on the (p,n) reaction threshold set by the neutron-proton mass difference and the Coulomb barrier height.

Stellar nucleosynthesis calculations that reproduce observed solar-system abundances of iron-peak elements require precise values of the strong-force saturation density and symmetry energy; these enter every modern supernova simulation code.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Coulomb’s law            | Quantifies electromagnetic repulsion between protons      |
| Reduced mass             | Corrects two-body kinematics inside the nucleus           |
| de Broglie wavelength    | Sets the scale at which wave mechanics replaces classical orbits |
| Binding energy           | Measures the energy equivalent of mass defect via E = mc² |

## 4. Building the idea — from intuition to formalism

### Step 1 — Discovery of a compact positive core
Rutherford’s 1911 gold-foil experiment showed that most α particles pass through matter undeflected while a few scatter at large angles.  
A head-on collision with a gold nucleus (Z = 79) reverses an α particle’s direction, implying all positive charge resides inside a radius ≪ atomic radius.  
The distance of closest approach for a head-on trajectory at kinetic energy K is  
$$d = \frac{1}{4\pi\epsilon_0}\frac{(2e)(Ze)}{K}.$$  
> [!WARNING]  
> Treating the nucleus as point-like is valid only when the α de Broglie wavelength is much smaller than nuclear size; otherwise diffraction must be included.

### Step 2 — Identification of the proton
In 1919 Rutherford observed that nitrogen bombarded by α particles emits hydrogen nuclei.  
These “H-rays” carry charge +e and mass ≈ 1 u, establishing the proton as a constituent of all nuclei heavier than hydrogen.  
Charge conservation and baryon number conservation together require that a nucleus of atomic number Z contains exactly Z protons.

### Step 3 — Need for the neutron
Measured nuclear masses exceed Z times the proton mass, yet nuclei are electrically neutral.  
Chadwick’s 1932 beryllium–α reaction produced a neutral particle of mass ≈ 1 u that could eject protons from paraffin with energies inconsistent with γ-ray Compton scattering.  
Thus every nucleus contains N = A − Z neutrons in addition to Z protons, where A is the mass number.

### Step 4 — Range and strength of the nuclear force
Scattering experiments show that the nucleon–nucleon force drops to negligible values beyond ≈ 2 fm.  
Inside this range it is attractive and roughly 100 times stronger than the Coulomb force at the same separation.  
A simple model is the Yukawa potential  
$$V(r) = -V_0\frac{e^{-r/\lambda}}{r/\lambda}, \quad \lambda \approx 1.4\,\text{fm}.$$

### Step 5 — Saturation and charge independence
Binding energy per nucleon is nearly constant (≈ 8 MeV) for A ≳ 16, implying each nucleon interacts with only a few neighbors.  
The pp, pn, and nn strong interactions are equal once Coulomb and Pauli effects are removed; this is verified by comparing mirror nuclei and low-energy scattering lengths.

### Step 6 — Textbook statement of nuclear structure
A nucleus is therefore characterized by proton number Z, neutron number N, and the many-body wave function obeying the Schrödinger equation with the strong potential plus electromagnetic terms. The ground-state binding energy is  
$$B(Z,N) = [Zm_p + Nm_n - M(Z,N)]c^2.$$  
This is the precise statement found in Krane, *Introductory Nuclear Physics*, §3.1.

## 5. Worked examples — every step shown

**Example 1 — Closest-approach distance**  
*Given:* 7.7 MeV α particle incident on gold (Z = 79).  
*Find:* Distance of closest approach d.  
Step 1: Convert K to joules: 7.7 × 10^6 eV × 1.6 × 10^{-19} J eV^{-1} = 1.232 × 10^{-12} J.  
*Why:* SI units required for Coulomb constant.  
Step 2: Insert into formula  
$$d = \frac{(9\times10^9)(2)(79)(1.6\times10^{-19})^2}{1.232\times10^{-12}} = 2.95\times10^{-14}\,\text{m}.$$  
*Why:* Direct substitution yields the classical turning point.  
**2.95 × 10^{-14} m**  
*Reflection:* This distance already exceeds typical nuclear radii, confirming the nucleus is compact.

**Example 2 — Neutron number from mass and charge**  
*Given:* ^{56}Fe has Z = 26 and atomic mass 55.9349 u.  
*Find:* N.  
N = A − Z = 56 − 26 = 30.  
*Why:* Mass number A is defined as total nucleons.  
**N = 30**

**Example 3 — Order-of-magnitude nuclear density**  
*Given:* R = 1.2 A^{1/3} fm.  
*Find:* Density ρ for A = 56.  
R ≈ 4.6 fm, volume = (4/3)πR³ ≈ 4.1 × 10^{-43} m³.  
Mass ≈ 56 × 1.67 × 10^{-27} kg.  
ρ ≈ 2.3 × 10^{17} kg m^{-3}.  
**2.3 × 10^{17} kg m^{-3}**

**Example 4 — Binding energy of deuteron**  
*Given:* m_d = 2.0141 u, m_p + m_n = 2.0159 u.  
*Find:* B.  
Δm = 0.0018 u = 0.0018 × 931.5 MeV/u = 1.68 MeV.  
B = Δm c² = 2.224 MeV (exact value after rounding).  
**2.224 MeV**  
*Reflection:* The small binding energy shows the deuteron is barely bound, a direct consequence of the short range of the force.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating strong force as long-range | Confusion with gravity or Coulomb force     | Always compare range to nuclear diameter     |
| Assuming constant density for A < 16 | Shell effects dominate in light nuclei      | Use measured radii from electron scattering  |
| Ignoring Coulomb barrier in fusion  | Classical turning point overlooked          | Calculate d for each reactant pair           |
| Confusing binding energy with separation energy | Different definitions                       | Distinguish total B from single-nucleon S_n, S_p |
| Using atomic masses without electron correction | Electron masses cancel only for neutral atoms | Subtract Z m_e when using atomic mass tables |
| Expecting classical orbits inside nucleus | de Broglie wavelength comparable to size    | Solve Schrödinger equation or use shell model |
| Neglecting isospin symmetry         | Electromagnetic breaking of charge independence | Compare mirror nuclei after Coulomb correction |

## 7. The textbook-precise statement
A nucleus is a self-bound system of A = Z + N nucleons whose ground-state properties are obtained from the many-body Hamiltonian  
$$H = \sum_i T_i + \frac12\sum_{i\neq j} V_{ij}^\text{strong} + \sum_{i<j} V_{ij}^\text{Coulomb},$$  
where V^strong is approximately charge-independent and of range ∼1 fm. The binding energy is defined by  
$$B(Z,N) = [Z m_p + N m_n - M(Z,N)]c^2$$  
(Krane, *Introductory Nuclear Physics*, 1988, §3.1).

## 8. Visual — diagram or schematic
```text
          r (fm)
          ^
          |   V_Coulomb (repulsive)
          |     /
          |    /
          |   /
   0 -----+--/------------------> r
          | /
          |/   V_strong (attractive well)
         /|
        / |
       /  |
      /   |
     /    |  ~1.4 fm
    /     |
   /      |
  /       |
 /        |
V         |
          +--------------------->
```
The diagram shows the short-range attractive strong potential dominating at r ≲ 2 fm while the long-range repulsive Coulomb potential dominates at larger separations.

## 9. The memory technique
1. **The hook** — Picture two nucleons as fuzzy tennis balls connected by a spring that only works when they touch; the spring (strong force) is far stronger than their electric repulsion but vanishes the instant they separate by more than one ball diameter.  
2. **What to overlearn** — R = 1.2 A^{1/3} fm; B/A ≈ 8 MeV for A > 16; range of strong force ≈ 1–2 fm.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the closest-approach distance from energy conservation and Coulomb’s law, then compare with measured nuclear radius.

## 10. What this unlocks
Nuclear structure supplies the microscopic foundation for radioactivity, fission, and fusion.  
- Liquid-drop model and semi-empirical mass formula  
- Nuclear shell model and magic numbers  
- α, β, and γ decay selection rules  
- Neutron-induced fission cross sections for reactor design  
- Thermonuclear reaction rates in stellar interiors

## 11. Self-check — five questions, no answers
1. Calculate the classical distance of closest approach for a 5 MeV proton incident on ^{208}Pb.  
2. Why does the binding energy per nucleon peak near A = 56 and then slowly decline?  
3. A nucleus has Z = 20 and mass number 48. How many neutrons does it contain, and is it neutron-rich or proton-rich relative to stable neighbors?  
4. The measured rms charge radius of ^{40}Ca is 3.48 fm. Does this agree with the simple formula R = 1.2 A^{1/3} fm? Quantify the difference.  
5. In a head-on deuteron–deuteron collision at very low energy, which force first becomes important as the nuclei approach, and why?