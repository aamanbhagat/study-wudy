## 1. The one-sentence answer
**Blackbody radiation from statistical mechanics is the derivation of Planck’s spectral distribution by treating electromagnetic modes in a cavity as quantized harmonic oscillators whose average energy follows from the Boltzmann factor.**

Classically, each mode of the radiation field behaves like a harmonic oscillator that can hold any amount of energy. When the number of modes at frequency \(\nu\) is counted and each is assigned the classical average energy \(kT\), the predicted intensity diverges at high frequencies—the ultraviolet catastrophe.

Planck’s resolution replaces the continuous energy of each oscillator with discrete multiples \(n h\nu\). The partition function for one oscillator then yields a finite average energy \(\frac{h\nu}{e^{h\nu/kT}-1}\). Multiplying by the density of states produces the Planck distribution, which matches experiment at all frequencies and reduces to the classical result only when \(h\nu \ll kT\).

> [!NOTE]
> The decisive step is not merely “energy is quantized”; it is that the *average energy per mode* itself becomes frequency-dependent and vanishes exponentially at high \(\nu\), automatically suppressing the ultraviolet divergence.

## 2. Why this matters — concrete and current
The Planck mission (ESA, 2009–2013) mapped the cosmic microwave background to 1 part in \(10^5\) using the exact blackbody spectrum at 2.725 K; any deviation would have signaled new physics beyond the standard model.  

Satellite thermal-control engineers at NASA and ESA size multi-layer insulation and radiator coatings by integrating the Planck function over the infrared; a 10 % error in emissivity at 300 K changes predicted equilibrium temperatures by several kelvin and can violate component qualification limits.  

In semiconductor manufacturing, rapid thermal processing tools at Applied Materials and Lam Research rely on pyrometers calibrated to the Planck curve between 0.9 µm and 1.6 µm to control wafer temperature to ±1 °C during 1000 °C anneals; misapplication of the Wien approximation produces systematic doping-profile errors.  

Re-entry vehicle designers at SpaceX and Lockheed Martin model the shock-layer plasma on Dragon and Orion capsules as a near-blackbody radiator at 8000–12000 K; the resulting radiative heat flux, obtained by integrating the Planck spectrum weighted by the Planck-mean absorption coefficient, determines the thickness of PICA-X heat-shield tiles.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Boltzmann factor \(e^{-E/kT}\) | Supplies the relative probability of each energy level of a quantized oscillator |
| Partition function \(Z\) | Converts the Boltzmann factor into the average energy per mode |
| Density of states in a cavity | Counts how many independent electromagnetic modes exist per frequency interval |
| Thermodynamic limit (large volume) | Converts discrete mode sums into the continuous spectral density used in Planck’s law |

## 4. Building the idea — from intuition to formalism

### Step 1 — Classical modes in a cavity
A metallic cavity supports standing electromagnetic waves whose wave-vectors satisfy periodic boundary conditions. The number of modes with wave-vector magnitude between \(k\) and \(k+dk\) is proportional to \(k^2 dk\). Because \(\nu = ck/2\pi\) for photons, the density of states per unit volume in frequency is
\[
g(\nu)\,d\nu = \frac{8\pi\nu^2}{c^3}\,d\nu.
\]
> [!WARNING]
> Omitting the factor of 2 for two polarization states produces a spectrum that is exactly half the measured intensity.

### Step 2 — Classical average energy per mode
Each mode is a harmonic oscillator. In classical statistical mechanics the equipartition theorem assigns \(\frac12 kT\) to each quadratic term in the Hamiltonian, giving exactly \(kT\) per mode. Multiplying by \(g(\nu)\) immediately yields the Rayleigh–Jeans law
\[
B_\nu^\text{classical}(\nu,T) = \frac{2\nu^2 kT}{c^2},
\]
which diverges as \(\nu\to\infty\).

### Step 3 — Energy quantization
Planck postulated that the energy of the oscillator is restricted to \(E_n = nh\nu\), \(n=0,1,2,\dots\). The partition function for one oscillator is therefore the geometric series
\[
Z = \sum_{n=0}^\infty e^{-\beta nh\nu} = \frac{1}{1-e^{-\beta h\nu}}.
\]

### Step 4 — Average energy from the partition function
The mean energy follows at once:
\[
\langle E\rangle = -\frac{\partial\ln Z}{\partial\beta} = \frac{h\nu}{e^{h\nu/kT}-1}.
\]
When \(h\nu\ll kT\) the denominator expands to recover the classical \(kT\); at high frequency the average energy drops exponentially.

### Step 5 — Planck’s spectral radiance
Multiplying the density of states by the new average energy and converting to radiance per steradian gives the Planck distribution:
\[
B_\nu(\nu,T) = \frac{2h\nu^3}{c^2}\frac{1}{e^{h\nu/kT}-1}.
\]

### Step 6 — Thermodynamic consistency checks
Integration over all frequencies recovers the Stefan–Boltzmann law \(u = aT^4\) with \(a = 4\sigma/c\). Differentiation of \(B_\nu\) with respect to \(\nu\) locates the peak at \(h\nu_\text{max}\approx 2.82 kT\) (Wien’s displacement law).

## 5. Worked examples — every step shown

**Example 1 — Average energy at low frequency**  
*Given:* \(\nu = 10^{12}\) Hz, \(T=300\) K.  
*Find:* \(\langle E\rangle\).  
Step 1: Compute \(x = h\nu/kT \approx 0.16\).  
*Why:* Convert the dimensionless ratio that controls the exponential.  
Step 2: \(\langle E\rangle = h\nu/(e^x-1) \approx h\nu/0.174 \approx 5.75\,h\nu\).  
*Why:* Direct substitution of the exact formula.  
**\(\langle E\rangle \approx 3.81\times10^{-22}\) J**  
*Reflection:* The result is already within 8 % of the classical \(kT\), illustrating the rapid approach to equipartition.

**Example 2 — Spectral radiance at a laser wavelength**  
*Given:* \(\nu=5\times10^{14}\) Hz (600 nm), \(T=2000\) K.  
*Find:* \(B_\nu\).  
Step 1: \(x=h\nu/kT\approx12\).  
*Why:* Establish that the mode is deep in the Wien tail.  
Step 2: \(B_\nu = \frac{2h\nu^3}{c^2}\frac{1}{e^{12}-1}\approx\frac{2h\nu^3}{c^2}e^{-12}\).  
*Why:* Neglect the −1 in the denominator for \(x>5\).  
**\(B_\nu\approx 1.3\times10^{-9}\) W m\(^{-2}\) sr\(^{-1}\) Hz\(^{-1}\)**  
*Reflection:* The exponential suppression explains why a 2000 K tungsten filament emits negligible ultraviolet.

**Example 3 — Total power radiated by a blackbody**  
*Given:* \(T=300\) K, surface area 1 m\(^2\).  
*Find:* Radiated power.  
Step 1: Integrate \(B_\nu\) over frequency and solid angle: \(P=\sigma AT^4\).  
*Why:* The integral \(\int_0^\infty B_\nu\,d\nu=\frac{\sigma}{\pi}T^4\).  
**\(P=460\) W**  
*Reflection:* The \(T^4\) dependence emerges only after the frequency integral is performed; no single frequency dominates.

**Example 4 — Temperature from peak wavelength**  
*Given:* Peak at \(\lambda_\text{max}=500\) nm.  
*Find:* \(T\).  
Step 1: Use Wien’s law \(\lambda_\text{max}T=2.897\times10^{-3}\) m K.  
**\(T=5794\) K**  
*Reflection:* The constant 2.897 mm K is obtained by solving \(x=3(1-e^{-x})\) numerically, not by a simple closed form.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using \(kT\) instead of \(\frac{h\nu}{e^{h\nu/kT}-1}\) at all frequencies | Classical intuition remains dominant | Always compute \(h\nu/kT\) first; if >3, discard equipartition |
| Forgetting the two polarization states | Mode counting is done for scalar waves | Insert the explicit factor of 2 when writing \(g(\nu)\) |
| Confusing \(B_\nu\) with \(B_\lambda\) | Jacobian \(d\nu = -c\lambda^{-2}d\lambda\) is omitted | Convert only after the frequency form is derived |
| Treating photons as Boltzmann particles | Photon number is not conserved | Use Bose–Einstein statistics from the outset; the chemical potential is zero |
| Applying Wien’s law to the energy-density peak instead of radiance | Different weighting shifts the maximum | Distinguish \(u(\nu)\) from \(B_\nu(\nu)\) when locating peaks |
| Neglecting stimulated emission in the derivation | Einstein A/B coefficients appear later | Recognize that the factor \(1/(e^x-1)\) already encodes net emission |
| Using \(h\) instead of \(\hbar\) in mode frequency | Angular versus cyclic frequency mix-up | Fix the convention: \(\nu\) is cyclic frequency, \(E=h\nu\) |

## 7. The textbook-precise statement
In the grand canonical ensemble the mean occupation of a photon mode of energy \(\varepsilon=h\nu\) is \(\langle n\rangle=(e^{\beta\varepsilon}-1)^{-1}\). The spectral energy density inside a large cavity of volume \(V\) is therefore
\[
u(\nu,T)\,d\nu=\frac{8\pi h\nu^3}{c^3}\frac{1}{e^{h\nu/kT}-1}\,d\nu.
\]
The specific intensity (radiance) observed outside the cavity is
\[
B_\nu(\nu,T)=\frac{2h\nu^3}{c^2}\frac{1}{e^{h\nu/kT}-1}.
\]
This is Theorem 1 of Chapter 4 in Pathria & Beale, *Statistical Mechanics*, 3rd ed. (2011).

## 8. Visual — diagram or schematic
```text
B_ν
 ^
 |          Planck curve
 |        *
 |      *   *
 |    *       *
 |  *           *
 | *             *   Rayleigh-Jeans (classical)
 |*               * * * * * * * * * → ∞
 +------------------------------------→ ν
     Wien tail          peak      long-wave
```
The curve starts at zero, rises as \(\nu^3\) on the low-frequency side, reaches a maximum near \(h\nu\approx2.82kT\), and decays exponentially on the high-frequency side. The classical Rayleigh–Jeans line is the straight tangent that the Planck curve approaches for \(\nu\to0\) and diverges for \(\nu\to\infty\).

## 9. The memory technique
1. **The hook** — Picture a crowded dance floor where each dancer (oscillator) can only move in steps of height \(h\nu\); at high frequency the steps become so tall that almost no one is dancing, automatically cutting off the ultraviolet light.  
2. **What to overlearn** — The exact average-energy formula \(\langle E\rangle=h\nu/(e^{h\nu/kT}-1)\) and the density-of-states prefactor \(8\pi\nu^2/c^3\).  
3. **Spaced-repetition schedule** — Review the derivation at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the partition function of a single quantized oscillator, multiply by the mode density, and integrate.

## 10. What this unlocks
Planck’s distribution is the gateway to all quantum gases of massless bosons.  
- Photon gas thermodynamics and the derivation of Stefan–Boltzmann and Wien laws.  
- Bose–Einstein condensation for massive bosons (replace \(\mu=0\) by \(\mu<0\)).  
- Density of states engineering in photonic crystals and cavity QED.  
- Thermal noise spectra in microwave amplifiers and superconducting qubits.

## 11. Self-check — five questions, no answers
1. Compute the ratio of Planck to Rayleigh–Jeans radiance at \(h\nu=5kT\).  
2. Show that the total energy density \(u=\int u(\nu)d\nu\) scales exactly as \(T^4\).  
3. Locate the frequency at which \(B_\nu\) is maximum by solving the transcendental equation that appears after differentiation.  
4. A filter transmits only frequencies above \(10^{15}\) Hz. At what temperature does the transmitted power first exceed 1 % of the total blackbody power?  
5. Identify the step in the derivation where the assumption that photons are indistinguishable bosons is used implicitly and explain what would change if they were treated as distinguishable.