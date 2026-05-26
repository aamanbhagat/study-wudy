## 1. The one-sentence answer
**Nuclear fission sustains a chain reaction when neutrons released by one nucleus splitting induce further splits, and this process becomes self-sustaining only above a critical mass where neutron production balances absorption and leakage.**

A uranium-235 nucleus absorbs a slow neutron and deforms until electrostatic repulsion overcomes the strong force, splitting into two lighter nuclei plus two or three free neutrons. Each new neutron can repeat the process, creating an exponential cascade if enough material is present. The decisive quantity is therefore the effective multiplication factor \(k\), which counts how many neutrons from one generation cause fissions in the next.

The geometry and purity of the assembly control whether neutrons escape before they interact. A sphere minimizes surface-to-volume ratio and therefore leakage; impurities absorb neutrons without fission. When the mass reaches the threshold at which \(k=1\), the reaction neither dies out nor explodes uncontrollably in an uncontrolled assembly.

> [!NOTE]
> Critical mass is not a fixed property of the isotope alone; it is the minimum mass for which the neutron economy inside that specific geometry and material reaches exact balance.

## 2. Why this matters — concrete and current
NASA’s Nuclear Thermal Propulsion program (DRACO mission, 2027 target) uses a uranium-fuelled reactor whose fission chain reaction heats hydrogen propellant; the same neutron-multiplication physics that sets critical mass on the ground determines the reactor’s startup mass and control-drum worth in orbit.

In civilian power, the AP1000 pressurized-water reactor maintains \(k \approx 1\) by precise control-rod positioning; operators calculate the minimum critical boron concentration each cycle using the identical six-factor formula that governs weapons design.

The National Ignition Facility’s 2022 ignition shots demonstrated fusion gain, yet the diagnostic hohlraums still contain trace uranium fission fragments whose neutron spectra must be subtracted—an application of fission cross-section data originally measured for chain-reaction studies.

Natural nuclear reactors operated at Oklo, Gabon, 1.7 billion years ago; isotopic analysis of residual xenon shows sustained chain reactions ran for hundreds of thousands of years at effective \(k=1\), providing the only known natural benchmark for critical-mass calculations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Neutron cross sections   | \(\sigma_f\) and \(\sigma_a\) set the probability of fission versus capture per nucleus |
| Exponential growth       | Neutron population obeys \(N(t)=N_0k^{t/\tau}\); stability requires \(k=1\) |
| Mean free path           | Determines average distance a neutron travels before interaction, fixing leakage |
| Binding energy curve     | Explains why fission of heavy nuclei releases energy and neutrons |

## 4. Building the idea — from intuition to formalism

### Step 1 — Neutron emission in fission
A fission event liberates two to three neutrons on average. For uranium-235 the measured prompt-neutron yield is \(\nu \approx 2.43\).  
Example: thermal fission of \(^{235}\)U produces fragments whose mass numbers sum to 236 minus the neutrons; typical pairs are \(^{92}\)Kr + \(^{141}\)Ba + 3n.  
Formal statement:  
\[
\nu = \frac{\text{number of prompt neutrons emitted}}{\text{number of fission events}}.
\]
> [!WARNING]
> Using \(\nu=2\) instead of 2.43 underestimates multiplication by 20 % and yields an erroneously high critical mass.

### Step 2 — Neutron multiplication factor
Each generation the number of neutrons changes by the factor \(k = \nu \times\) (probability a neutron causes fission).  
For an infinite medium, \(k_\infty = \eta \epsilon f p\), the four-factor formula.  
> [!WARNING]
> Treating \(k\) as a constant independent of energy spectrum ignores resonance absorption and produces order-of-magnitude errors.

### Step 3 — Finite-size leakage
In a real assembly some neutrons diffuse out. The non-leakage probability is approximately \(P_{NL} \approx 1/(1+B^2 L^2)\), where \(B^2\) is the geometric buckling.  
Criticality now reads \(k_\text{eff}=k_\infty P_{NL}=1\).  
> [!WARNING]
> Ignoring leakage predicts criticality for arbitrarily small masses.

### Step 4 — Critical radius from diffusion theory
Solving the one-speed diffusion equation \(\nabla^2\phi + B^2\phi=0\) with zero-flux boundary yields the critical radius for a sphere  
\[
R_c = \pi\sqrt{\frac{D}{\Sigma_a(k_\infty-1)}}.
\]
Mass follows from density and volume.  
> [!WARNING]
> Using the wrong boundary condition (extrapolated endpoint omitted) shifts \(R_c\) by several centimetres.

### Step 5 — Bare critical mass
For pure \(^{235}\)U metal the diffusion parameters give \(R_c \approx 8.7\) cm and \(M_c \approx 52\) kg. Real devices use reflectors to reduce this value.  
The textbook statement is therefore: an assembly is critical when its material and geometry together satisfy \(k_\text{eff}=1\).

## 5. Worked examples — every step shown

**Example 1 — Neutron yield calculation**  
*Given:* 1000 thermal fissions of \(^{235}\)U occur.  
*Find:* Expected prompt neutrons.  
Step 1: Multiply events by \(\nu\): \(1000 \times 2.43 = 2430\).  
*Why:* Definition of average yield.  
**2430 neutrons**

*Reflection:* The integer result hides Poisson statistics; fluctuations matter for small assemblies.

**Example 2 — Infinite multiplication factor**  
*Given:* \(\eta=2.43\), \(\epsilon=1.03\), \(f=0.92\), \(p=0.88\).  
*Find:* \(k_\infty\).  
Step 1: \(k_\infty = 2.43 \times 1.03 \times 0.92 \times 0.88 = 2.02\).  
*Why:* Product of the four factors.  
**\(k_\infty = 2.02\)**

*Reflection:* Even with \(\nu>2\), resonance escape \(p<1\) keeps \(k_\infty\) modest.

**Example 3 — Critical radius**  
*Given:* \(D=0.9\) cm, \(\Sigma_a=0.3\) cm\(^{-1}\), \(k_\infty=1.8\).  
*Find:* \(R_c\) for a bare sphere.  
Step 1: Compute \(k_\infty-1=0.8\).  
*Why:* Excess multiplication drives the buckling.  
Step 2: \(B^2 = \Sigma_a(k_\infty-1)/D = 0.3\times0.8/0.9=0.267\) cm\(^{-2}\).  
Step 3: \(R_c=\pi/B=6.09\) cm.  
**\(R_c=6.09\) cm**

*Reflection:* Small changes in \(D\) or \(k_\infty\) produce large radius shifts because of the square root.

**Example 4 — Mass scaling with reflector**  
*Given:* Bare \(M_c=52\) kg; 10 cm beryllium reflector halves leakage.  
*Find:* Reflected critical mass.  
Step 1: Effective buckling reduced by factor \(\approx4\) (empirical).  
Step 2: Radius scales as \(\sqrt{1/4}=1/2\).  
Step 3: Mass scales as radius cubed \(\to 52/8=6.5\) kg.  
**Reflected critical mass \(\approx6.5\) kg**

*Reflection:* Reflectors dominate practical designs; bare-sphere numbers are only theoretical limits.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Confusing critical mass with critical density | Mass depends on shape; density does not     | Always compute volume from geometry first    |
| Using thermal \(\sigma_f\) for fast assemblies | Spectrum changes cross sections by orders of magnitude | Match cross-section library to neutron energy |
| Neglecting delayed neutrons | They constitute only 0.65 % but control dynamics | Separate prompt and delayed multiplication factors |
| Treating \(k=1\) as “no reaction” | Exactly balanced production equals loss     | Remember steady power still requires \(k=1\) |
| Ignoring \(^{238}\)U resonance integral | Strong absorption dips between 1–100 eV     | Include resonance self-shielding factors     |
| Assuming spherical geometry always optimal | Reflectors and control rods break symmetry  | Solve the actual transport problem           |
| Forgetting \(\alpha\)-n reactions in impurities | Light-element contaminants produce extra neutrons | Assay oxygen and fluorine content            |

## 7. The textbook-precise statement
A homogeneous medium of fissile material reaches criticality when the effective neutron multiplication factor satisfies  
\[
k_\text{eff} = \frac{\nu\Sigma_f}{\Sigma_a + D B_g^2} = 1,
\]  
where \(B_g^2\) is the geometric buckling fixed by the extrapolated boundary condition of the assembly. The corresponding critical mass is obtained by integrating the fuel density over the volume that yields this buckling. (Duderstadt & Hamilton, *Nuclear Reactor Analysis*, 1976, §5.3.)

## 8. Visual — diagram or schematic

```text
          Neutron economy in a sphere
               (radius R)
   ------------------------------- surface
   |           leakage             |
   |   fission   capture   escape  |
   |     \        /         /      |
   |      \      /         /       |
   |       source neutrons         |
   |          (k generations)      |
   ------------------------------- center
```

Label axes: radial coordinate \(r=0\) at centre, \(r=R\) at extrapolated boundary. Neutron flux \(\phi(r)\) peaks at centre and falls to zero at boundary. Arrows show three competing fates of each neutron: induce fission (multiplies), radiative capture (absorbs), or leakage (lost).

## 9. The memory technique
1. **The hook** — Picture a forest fire: each burning tree throws sparks; if sparks ignite more than one new tree on average the fire spreads; critical mass is the smallest patch of trees where that happens.  
2. **What to overlearn** — \(\nu\approx2.43\) for \(^{235}\)U; \(k_\text{eff}=1\) at criticality; bare-sphere \(M_c\approx52\) kg.  
3. **Spaced-repetition schedule** — Review definitions at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the diffusion equation from Fick’s law, impose zero-flux boundary, solve for the lowest eigenvalue \(B^2\).

## 10. What this unlocks
Mastery of chain-reaction criticality lets you analyse reactor kinetics, estimate yield of fission explosives, and design nuclear rockets.  

- Six-factor formula and resonance integrals  
- Reactor period and delayed-neutron kinetics  
- Neutron transport methods (Monte Carlo, discrete ordinates)  
- Breeding ratios in fast-spectrum systems  

## 11. Self-check — five questions, no answers
1. A 10 kg sphere of 93 % enriched uranium metal is assembled; is \(k_\text{eff}\) greater or less than unity?  
2. By what factor does the critical mass of a bare sphere change if linear dimensions are scaled by 1.2 while density is held constant?  
3. Why does adding a 5 cm depleted-uranium reflector lower critical mass more than the same thickness of steel?  
4. In a pulsed fast reactor the prompt-neutron lifetime is 10 ns; if \(k=1.001\), how many generations occur before the population grows by \(e\)?  
5. A designer replaces 10 % of the \(^{235}\)U atoms with \(^{238}\)U while keeping geometry fixed; qualitatively, does the new critical mass rise or fall, and by how much roughly?