## 1. The one-sentence answer
**Radioactive decay is the spontaneous transformation of an unstable nucleus into a more stable configuration by emitting an alpha particle, beta particle, or gamma photon.**

Alpha decay occurs when a heavy nucleus tunnels through the Coulomb barrier and ejects a helium-4 nucleus, reducing both atomic number Z and mass number A. Beta decay proceeds via the weak interaction inside the nucleus, converting a neutron into a proton (or vice versa) while emitting an electron or positron plus a neutrino, thereby changing Z by one unit while A stays constant. Gamma decay follows either of these processes when the daughter nucleus sheds excess energy by emitting a high-energy photon without altering Z or A.

The three modes differ sharply in their selection rules, penetration power, and the underlying forces they probe. Alpha decay is governed by the strong force and quantum tunneling; beta decay is the only process that directly reveals the weak force at low energies; gamma decay is a pure electromagnetic transition between nuclear energy levels.

> [!NOTE]
> The single deepest insight is that each decay mode is forbidden by classical physics yet allowed by quantum mechanics or a new fundamental interaction, which is why half-lives range from microseconds to billions of years.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover carries a plutonium-238 radioisotope thermoelectric generator whose steady alpha decay supplies 110 W of electrical power on the Martian surface; without understanding the 87.7-year half-life and the 5.5 MeV alpha energy, mission planners could not size the heat source or predict power fade.

In semiconductor manufacturing, Intel and TSMC monitor alpha-particle emission rates from trace uranium and thorium in packaging materials because a single 5 MeV alpha can flip bits in advanced 3 nm SRAM, producing silent data corruption; the industry therefore specifies maximum emission rates below 0.001 counts cm⁻² h⁻¹.

Beta-decay spectra of tritium and carbon-14 are used in neutrino-mass experiments such as KATRIN; the precise shape of the electron endpoint spectrum directly constrains the effective electron-neutrino mass below 0.8 eV, a result published in 2022 that feeds into both particle physics and cosmology.

Gamma-ray lines from cobalt-56 decay in Type Ia supernovae allow astronomers to measure the nickel yield and therefore calibrate the cosmic distance ladder; the 847 keV and 1238 keV lines observed by INTEGRAL and Fermi confirm the thermonuclear explosion model used to standardize candles for dark-energy surveys.

Medical isotope production at cyclotrons and reactors relies on controlled beta and gamma emitters such as fluorine-18 and technetium-99m; the branching ratios and decay constants determine both the activity delivered to hospitals and the radiation shielding requirements inside PET scanners.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Binding energy and Q-value | Determines whether a decay is energetically allowed and sets the kinetic energy released |
| Coulomb barrier and tunneling probability | Explains why alpha decay occurs despite classical prohibition                        |
| Fermi’s golden rule and weak interaction | Gives the rate of beta decay and the continuous spectrum shape                       |
| Nuclear excited states and selection rules | Governs gamma emission probabilities and multipolarity                               |
| Exponential decay law N(t) = N₀ e^{-λt} | Connects microscopic transition rates to observable half-lives                       |

If any of these are unfamiliar, pause and review them before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Energy release sets the stage
A nucleus decays only when the total rest mass of the final products is smaller than the initial mass; the difference appears as kinetic energy shared among the emitted particles and recoil.  
Consider uranium-238: its mass exceeds the combined mass of thorium-234 plus helium-4 by 4.27 MeV/c², so alpha emission is allowed.  
The Q-value is written  
$$Q = [m(^{238}\mathrm{U}) - m(^{234}\mathrm{Th}) - m(^{4}\mathrm{He})]c^{2}.$$  
> [!WARNING]  
> If you forget to convert mass excess into energy or neglect the electron masses in beta decay, the sign of Q can flip and you will wrongly conclude a decay is forbidden.

### Step 2 — Alpha decay proceeds by tunneling
The alpha particle is pre-formed inside the nucleus but faces a ~30 MeV Coulomb barrier; classically it is trapped, yet the wave function penetrates the barrier with a small but non-zero probability.  
For a simplified rectangular barrier of height V₀ and width L the transmission coefficient is approximately  
$$T \approx \exp\left(-2\int_{r_{1}}^{r_{2}}\sqrt{\frac{2m}{\hbar^{2}}[V(r)-E]}dr\right).$$  
> [!WARNING]  
> Treating the barrier as infinitely thick or using the classical turning points incorrectly will produce transmission probabilities wrong by many orders of magnitude.

### Step 3 — Beta decay requires the weak force
A down quark inside a neutron changes flavor to an up quark, emitting a W⁻ boson that immediately decays into an electron and an antineutrino; the three-body final state produces the continuous electron spectrum.  
The decay rate follows Fermi’s golden rule  
$$\lambda = \frac{2\pi}{\hbar}|M|^{2}\rho(E),$$  
where M is the weak matrix element and ρ(E) is the density of final states.  
> [!WARNING]  
> Omitting the neutrino or treating the electron spectrum as mono-energetic will destroy agreement with measured beta spectra.

### Step 4 — Gamma decay is an electromagnetic multipole transition
After alpha or beta decay the daughter nucleus is often left excited; it relaxes by emitting a photon whose energy equals the level spacing and whose angular momentum and parity satisfy electromagnetic selection rules.  
The transition rate scales as  
$$\lambda_{\gamma}\propto\frac{E_{\gamma}^{2L+1}}{\hbar c},$$  
where L is the multipolarity (E1, M1, E2, …).  
> [!WARNING]  
> Ignoring parity or angular-momentum conservation leads to predicting strong transitions that are in reality highly forbidden.

### Step 5 — The observed decay constant combines all channels
The total decay constant is the incoherent sum  
$$\lambda_{\mathrm{tot}}=\lambda_{\alpha}+\lambda_{\beta}+\lambda_{\gamma}.$$  
Branching ratios are simply λᵢ/λ_tot and fix the relative intensities of each radiation type.

## 5. Worked examples — har step show karo

**Example 1 — Simple Q-value check**  
*Given:* Atomic masses: m(²³⁸U) = 238.050 788 u, m(²³⁴Th) = 234.043 601 u, m(⁴He) = 4.002 603 u.  
*Find:* Q-value for alpha decay.  
Step 1: Compute mass defect Δm = 238.050 788 − 234.043 601 − 4.002 603 = 0.004 584 u.  
*Why:* Only the nuclear masses enter; atomic masses already include the correct number of electrons.  
Step 2: Convert using 1 u = 931.494 MeV/c² → Q = 0.004 584 × 931.494 = 4.270 MeV.  
**Final answer**  
**Q = 4.270 MeV**  
*Reflection:* This example is easy yet forces correct handling of atomic versus nuclear masses, a common source of sign errors later.

**Example 2 — Alpha tunneling estimate**  
*Given:* Barrier height V₀ = 28 MeV, alpha kinetic energy E = 4.2 MeV, barrier width at E from r = 9 fm to 35 fm.  
*Find:* Rough transmission probability.  
Step 1: Approximate integral as 2κL with κ = √[2m(V₀−E)]/ℏ.  
*Why:* Rectangular-barrier formula gives order-of-magnitude insight before full WKB integration.  
Step 2: m c² ≈ 3727 MeV for alpha, yielding κ ≈ 1.6 fm⁻¹, L ≈ 26 fm → T ≈ e^{-83} ≈ 10^{-36}.  
**Final answer**  
**T ≈ 10^{-36}**  
*Reflection:* The tiny number explains the 4.5 × 10⁹ yr half-life of ²³⁸U despite a large Q-value.

**Example 3 — Beta endpoint energy**  
*Given:* Free neutron decay, Q = 782 keV.  
*Find:* Maximum electron kinetic energy.  
Step 1: In the limit m_ν = 0 the maximum occurs when neutrino carries zero energy.  
*Why:* Three-body kinematics allows the entire Q-value to go to electron plus recoil.  
Step 2: Recoil kinetic energy is only a few eV, negligible → K_max ≈ 782 keV.  
**Final answer**  
**K_max = 782 keV**  
*Reflection:* This sharp endpoint is the observable used in neutrino-mass searches.

**Example 4 — Gamma branching**  
*Given:* ⁶⁰Ni first excited state at 1.333 MeV, 2⁺ → 0⁺ E2 transition.  
*Find:* Dominant multipolarity and relative strength.  
Step 1: ΔJ = 2, parity unchanged → E2 allowed, M1 forbidden.  
*Why:* Selection rules immediately eliminate competing modes.  
Step 2: Weisskopf estimate gives λ_E2 ≈ 10^{12} s⁻¹ → half-life ~ 0.7 ps.  
**Final answer**  
**Pure E2 transition, τ ≈ 0.7 ps**  
*Reflection:* The calculation shows why gamma lifetimes are usually femtoseconds to picoseconds unless hindered by selection rules.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using atomic masses without correcting electron count in beta-plus decay | Students forget two extra electron masses must be subtracted | Always write the full reaction including atomic electrons |
| Treating alpha barrier as rectangular instead of Coulomb | Simpler math tempts; real potential is 1/r         | Use WKB integral or at least note the approximation  |
| Confusing continuous beta spectrum with discrete gamma lines | Both are “radiation” but different mechanisms       | Ask “how many bodies in final state?” before plotting |
| Ignoring neutrino in energy balance | Neutrino is invisible and massless in simple models | Remember three-body kinematics for every beta decay  |
| Applying classical turning points to tunneling | Classical intuition is strong                       | Always integrate the forbidden region in the exponent|
| Mixing half-life with mean life   | Notation T½ versus τ = 1/λ confuses students        | Write λ = ln 2 / T½ explicitly each time             |
| Forgetting recoil kinetic energy  | Recoil seems negligible                             | Check p conservation; recoil can be 100 keV in alpha decay |

## 7. The textbook-precise statement
The radioactive decay law follows from the assumption that each nucleus decays independently with constant probability per unit time λ. The number of nuclei therefore obeys the first-order differential equation  
$$\frac{dN}{dt}=-\lambda N, \qquad N(t)=N_0e^{-\lambda t},$$  
where λ = λ_α + λ_β + λ_γ. For alpha decay the partial width is given by the Gamow factor arising from the WKB tunneling integral through the Coulomb barrier (Krane, *Introductory Nuclear Physics*, 1988, §8.4). Beta decay rates are obtained from the Fermi theory  
$$\lambda=\frac{G_F^2}{2\pi^3\hbar^7c^4}|M|^2\int F(Z,E)pE(Q-E)^2\,dE,$$  
with F(Z,E) the Fermi function (ibid., §9.3). Gamma decay rates are electromagnetic multipole transition probabilities evaluated with nuclear matrix elements (ibid., §10.2). All three expressions assume the standard model of nuclear structure and the absence of external fields strong enough to perturb the nuclear wave functions.

## 8. Visual — diagram or schematic
```
          Nucleus (r < R)
   |-------------------|   Coulomb barrier V(r) = (2(Z-2)e²)/(4πε₀r)
   |   α pre-formed    |   
   |-------------------|   E_α
   |   forbidden region|   ↑
   |   (classically)   |   |  tunneling
   |-------------------|   |
   |   free region     |   ↓
   +-------------------+   r → ∞
```
The horizontal axis is radial distance; the vertical axis is potential energy. The shaded forbidden region between the nuclear radius R and the outer classical turning point is where the alpha wave function decays exponentially.

## 9. The memory technique
1. **The hook** — Picture a heavy nucleus as a prison yard; the alpha particle is an inmate who tunnels under the high Coulomb wall instead of climbing it.  
2. **What to overlearn** — Q-value definition, λ = ln 2 / T½, and the three-body nature of beta decay.  
3. **Spaced-repetition schedule** — Review the three mechanisms after 1 day, 3 days, 7 days, 16 days, and 35 days; each time recalculate one Q-value and one tunneling estimate from memory.  
4. **First-principles fallback** — If you forget the Gamow factor, start from the WKB integral, insert the Coulomb potential, and recover the exponential dependence on Z/√E.

## 10. What this unlocks
Mastery of decay mechanisms lets you calculate radiation doses, design detectors, interpret stellar nucleosynthesis, and predict backgrounds in rare-event searches.  

- Next you can derive the Bateman equations for secular equilibrium in decay chains.  
- You will be ready for the Fermi theory of beta decay in quantitative detail.  
- The same tunneling mathematics reappears in field emission and fusion cross-sections.  
- Gamma selection rules feed directly into nuclear spectroscopy and angular-correlation experiments.

## 11. Self-check — five questions, no answers
1. A nucleus has Q_α = 4 MeV and Z = 90. Estimate the order of magnitude of the alpha tunneling probability using a 25 fm barrier width.  
2. Why does the beta-electron spectrum end at a sharp maximum energy while the gamma spectrum shows discrete lines?  
3. For the decay ¹⁴C → ¹⁴N + e⁻ + ν-bar, write the atomic-mass expression for Q and evaluate it numerically.  
4. A 2⁺ state decays to a 0⁺ ground state. Which multipole is allowed and which is forbidden by parity?  
5. If a sample contains both ²³⁸U (T½ = 4.5 × 10⁹ yr) and ²³⁹Pu (T½ = 2.4 × 10⁴ yr) with equal initial activities, which isotope dominates the alpha emission rate after 10⁵ years?