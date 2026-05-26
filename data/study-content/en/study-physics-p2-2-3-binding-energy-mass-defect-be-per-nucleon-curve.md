## 1. The one-sentence answer
**Binding energy is the mass defect of a nucleus converted to energy via \(E = \Delta m c^2\), and the binding energy per nucleon curve reveals why fusion releases energy for light nuclei while fission does so for heavy ones.**

Nuclei weigh less than the free protons and neutrons that compose them. That missing mass is not lost; it is the energy that was radiated away when the nucleus formed. The binding energy per nucleon therefore measures how tightly each particle is held, and the curve of this quantity versus mass number peaks near iron.

The shape of the curve follows directly from the interplay of the strong force and the Coulomb repulsion. Light nuclei gain stability by fusing because adding particles increases the average binding. Heavy nuclei lose stability when they split because the repulsive term grows faster than the attractive volume term.

> [!NOTE]
> The single deepest insight is that the curve’s peak at \(A \approx 56\) is the reason stars stop fusing at iron and why both fusion reactors and fission weapons are possible on Earth.

## 2. Why this matters — concrete and current
NASA’s DRACO nuclear-thermal propulsion program uses the same binding-energy release that powers stars; the higher exhaust velocity obtainable from fission fragments directly reduces transit time to Mars.  
ITER and private tokamaks such as Commonwealth Fusion Systems rely on the steep rise of the binding-energy curve below \(A = 56\) to guarantee net energy gain once deuterium–tritium reactions are sustained.  
Stellar nucleosynthesis models in the 2023 release of MESA incorporate the precise binding energies of iron-peak nuclei to predict the location of the “iron core” that triggers core-collapse supernovae.  
Medical isotope production at TRIUMF and Brookhaven exploits the fission yield curve of uranium-235, whose binding-energy per nucleon drop supplies the neutron-rich fragments used in targeted radiotherapy.  
Semiconductor supply-chain security now includes neutron-irradiation facilities whose shielding calculations rest on the same mass-defect data that govern reactor criticality.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Special relativity       | Supplies \(E = mc^2\) that converts mass defect into energy |
| Atomic number \(Z\) and mass number \(A\) | Defines the number of protons and nucleons whose masses must be summed |
| Isotopes and isotopic mass tables | Provide the measured atomic masses needed to compute \(\Delta m\) |

## 4. Building the idea — from intuition to formalism

### Step 1 — Nucleus versus free nucleons
A nucleus is not simply a bag of independent protons and neutrons; the strong force binds them, and that binding removes energy from the system.  
Take the deuteron: the separate proton and neutron masses sum to 2.015 941 u, yet the deuteron mass is 2.014 102 u.  
The formal statement is the mass defect  
\[
\Delta m = Z m_p + (A-Z) m_n - m_{\rm nucleus}.
\]
> [!WARNING]
> Using atomic masses instead of nuclear masses without subtracting the electron masses will produce an error of order \(Z \times 0.000 548\) u.

### Step 2 — Einstein’s mass–energy equivalence
Any mass difference must appear as energy.  
For the deuteron, \(\Delta m = 0.002 388\) u converts to 2.224 MeV.  
The conversion is expressed by  
\[
BE = \Delta m \cdot c^2 = \Delta m \times 931.494\,{\rm MeV/u}.
\]

### Step 3 — Binding energy per nucleon
Stability is compared across nuclei of different sizes by dividing by \(A\):  
\[
\frac{BE}{A} = \frac{\Delta m \cdot 931.494}{A}\quad({\rm MeV}).
\]
This quantity is largest near \(A = 56\).

### Step 4 — Semi-empirical mass formula (volume and Coulomb terms)
The liquid-drop model supplies the dominant terms:  
\[
BE = a_v A - a_c \frac{Z(Z-1)}{A^{1/3}} + \cdots.
\]
The volume term grows linearly with \(A\); the Coulomb term grows as \(Z^2/A^{1/3}\). Their competition produces the observed maximum.

### Step 5 — Plotting the curve
When \(BE/A\) is plotted against \(A\), the data form a broad peak at \(^{56}\)Fe (8.79 MeV) that falls slowly toward uranium (7.6 MeV) and more steeply toward the lightest nuclei.

### Step 6 — Textbook definition
The binding energy of a nucleus is the minimum energy required to separate it completely into its constituent protons and neutrons at rest at infinity.

## 5. Worked examples — every step shown

**Example 1 — Deuteron mass defect**  
*Given:* \(m_p = 1.007 825\) u, \(m_n = 1.008 665\) u, \(m_d = 2.014 102\) u.  
*Find:* \(\Delta m\) and \(BE\).  
Step 1: Sum free masses = 2.016 490 u.  
*Why:* Add the tabulated rest masses of the separate nucleons.  
Step 2: \(\Delta m = 2.016 490 - 2.014 102 = 0.002 388\) u.  
*Why:* Subtract actual nucleus mass.  
Step 3: \(BE = 0.002 388 \times 931.494 = 2.224\) MeV.  
**2.224 MeV**  
*Reflection:* The arithmetic is exact once the correct isotopic masses are chosen; the only common error is forgetting that tabulated masses are usually atomic.

**Example 2 — Alpha particle**  
*Given:* Atomic mass of \(^4\)He = 4.002 603 u.  
*Find:* \(BE/A\).  
Step 1: \(\Delta m = 2(1.007 825) + 2(1.008 665) - 4.002 603 = 0.030 377\) u.  
*Why:* Two protons and two neutrons minus the helium atomic mass (electrons cancel).  
Step 2: \(BE = 0.030 377 \times 931.494 = 28.296\) MeV.  
Step 3: \(BE/A = 28.296/4 = 7.074\) MeV.  
**7.074 MeV**  
*Reflection:* The result already shows the rapid rise from deuteron to alpha.

**Example 3 — Iron-56**  
*Given:* Atomic mass of \(^{56}\)Fe = 55.934 937 u.  
*Find:* \(BE/A\).  
Step 1: \(\Delta m = 26 m_H + 30 m_n - 55.934 937 = 0.528 460\) u.  
*Why:* Use hydrogen mass to include electrons automatically.  
Step 2: \(BE = 492.258\) MeV.  
Step 3: \(BE/A = 8.790\) MeV.  
**8.790 MeV**  
*Reflection:* This is the global maximum; small changes in mass tables shift the value by <0.001 MeV.

**Example 4 — Uranium-235 fission into two fragments**  
*Given:* \(BE/A\) (U) = 7.591 MeV, average \(BE/A\) (fragments) ≈ 8.5 MeV, 235 nucleons.  
*Find:* Energy released.  
Step 1: Total BE of U = 7.591 × 235 = 1783.9 MeV.  
*Why:* Multiply tabulated value by A.  
Step 2: Total BE of products ≈ 8.5 × 235 = 1997.5 MeV.  
Step 3: \(\Delta BE = 1997.5 - 1783.9 = 213.6\) MeV.  
**213.6 MeV per fission**  
*Reflection:* The calculation uses only the curve values; actual Q-value varies slightly with fragment pair.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using atomic masses without electron correction | Tabulated masses include electrons          | Subtract Z m_e or use hydrogen masses        |
| Confusing BE with separation energy | Both involve mass differences               | Remember BE is total; separation energy is last nucleon |
| Reading the curve peak as exactly 56Fe | Neighbouring nuclei are within 0.01 MeV     | State “maximum near A = 56”                  |
| Forgetting 1 u = 931.494 MeV      | Conversion constant not memorised           | Keep the factor on a single reference card   |
| Plotting total BE instead of BE/A | Curve shape disappears                      | Always normalise by A before graphing        |
| Ignoring pairing term for odd-A nuclei | Small but visible wiggles on the curve      | Add the \(\delta\) term when precision <0.1 MeV is needed |
| Assuming the curve is symmetric   | Fission and fusion energy releases differ   | Note the steeper slope on the light side     |

## 7. The textbook-precise statement
The binding energy \(B(Z,A)\) of a nucleus with proton number \(Z\) and mass number \(A\) is  
\[
B(Z,A) = [Z m(^{1}\rm H) + (A-Z)m_n - m(Z,A)]c^2,
\]  
where \(m(Z,A)\) is the atomic mass. The binding energy per nucleon is \(B/A\). The function \(B/A\) versus \(A\) reaches a maximum of 8.790 MeV at \(^{56}\)Fe and declines to 7.570 MeV at \(^{238}\)U (Krane, *Introductory Nuclear Physics*, 1988, §3.3).

## 8. Visual — diagram or schematic
```text
BE/A (MeV)
9.0 |                                   *
8.8 |                                * 56Fe
8.5 |                             *
8.0 |                          *
7.5 |                       *          * 235U
7.0 |                    *
6.5 |                 *
6.0 |              *
5.5 |           *
5.0 |        *
4.5 |     *
4.0 |  *
    +------------------------------------------- A
      1   4  12  16  56         120       238
```
Horizontal axis: mass number A (log scale optional). Vertical axis: BE/A in MeV. Peak at A = 56; slow decline to the right, steeper to the left.

## 9. The memory technique
**The hook** — Picture iron-56 sitting at the summit of a mountain pass; everything to the left wants to climb up by fusing, everything to the right wants to slide down by fission.  
**What to overlearn** — (i) 1 u = 931.494 MeV, (ii) peak value 8.79 MeV at A ≈ 56, (iii) definition \(BE = \Delta m \times 931.494\).  
**Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
**First-principles fallback** — Re-derive \(\Delta m\) from tabulated masses, multiply by \(c^2\), divide by A.

## 10. What this unlocks
This subtopic supplies the quantitative foundation for every subsequent discussion of nuclear stability, energy release, and reaction rates.  
- Liquid-drop model and semi-empirical mass formula  
- Nuclear fission barrier height and spontaneous fission  
- Stellar nucleosynthesis pathways (r-process, s-process)  
- Design of nuclear rockets and inertial-confinement fusion targets  

## 11. Self-check — five questions, no answers
1. Calculate the binding energy per nucleon of \(^{12}\)C given its atomic mass 12.000 000 u.  
2. Why does the binding-energy curve fall more steeply for \(A < 56\) than it rises for \(A > 56\)?  
3. A proposed reaction fuses two \(^{28}\)Si nuclei into \(^{56}\)Fe. Is the reaction exoergic or endoergic? By how much per nucleon?  
4. Identify the numerical error that appears if electron masses are omitted when computing the mass defect of \(^{238}\)U.  
5. Sketch, without data tables, the qualitative shape of the BE/A curve and mark the approximate locations of \(^{4}\)He, \(^{56}\)Fe, and \(^{235}\)U.