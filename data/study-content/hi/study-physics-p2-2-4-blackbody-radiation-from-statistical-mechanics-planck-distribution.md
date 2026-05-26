## 1. The one-sentence answer
**Blackbody radiation from statistical mechanics yields Planck’s distribution when you treat electromagnetic modes as quantum harmonic oscillators whose average energy follows the Boltzmann-weighted partition function, replacing the classical equipartition result.**

Classical statistical mechanics assigns every oscillator an average energy \(kT\), producing the ultraviolet catastrophe. Planck’s 1900 hypothesis replaces continuous energy with discrete multiples \(nh\nu\). In the canonical ensemble the partition function of one oscillator becomes a geometric series whose mean energy is exactly \(\frac{h\nu}{e^{h\nu/kT}-1}\). Multiplying by the mode density in a cavity then gives the spectral energy density \(u(\nu,T)=\frac{8\pi h\nu^3}{c^3}\frac{1}{e^{h\nu/kT}-1}\).

> [!NOTE]
> The single conceptual leap is that the denominator \(e^{h\nu/kT}-1\) arises purely from counting occupation numbers; once that factor appears, both Wien’s law at high frequency and Rayleigh–Jeans at low frequency emerge automatically as mathematical limits.

## 2. Why this matters — concrete and current
Cosmic Microwave Background (CMB) measurements by the Planck satellite use the exact Planck distribution to extract the present temperature 2.725 K and to bound spectral distortions that would signal energy injection in the early universe.  

Infrared focal-plane arrays on James Webb Space Telescope detectors are calibrated against blackbody sources whose radiance is computed from Planck’s law; any deviation in the assumed emissivity directly limits the photometric precision of exoplanet transit spectra.  

LED and laser diode efficiency calculations in semiconductor foundries rely on the equilibrium photon occupation number derived from the same distribution to set the balance between spontaneous and stimulated emission rates.  

Thermal radiation shields on cryogenic rocket stages (Ariane upper-stage LOX tanks, for example) are sized using the integrated Planck spectrum so that the radiative heat load stays below the capacity of the helium refrigerators.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Canonical partition function   | Gives the thermal average energy of a single quantized oscillator                    |
| Density of states in k-space   | Converts the single-oscillator result into the continuous spectrum inside a cavity   |
| Boltzmann factor \(e^{-E/kT}\) | Supplies the relative probability of each energy level \(nh\nu\)                     |
| Mode counting in a 3-D box     | Supplies the factor \(8\pi\nu^2 d\nu / c^3\) that multiplies the average energy      |

If any row above is unfamiliar, pause and review the corresponding section in a statistical-mechanics text before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Classical equipartition fails
A classical electromagnetic mode behaves as a harmonic oscillator whose energy is quadratic in both position and momentum; equipartition therefore assigns it exactly \(kT\). When this is multiplied by the number of modes per frequency interval, the radiated power diverges at high \(\nu\), the ultraviolet catastrophe.

### Step 2 — Energy is quantized
Planck postulated that the energy of each mode can only be \(E_n = nh\nu\), \(n=0,1,2,\dots\). This single assumption replaces the continuous phase-space integral with a discrete sum.

### Step 3 — Write the partition function
For one oscillator the canonical partition function is the geometric series
\[
Z = \sum_{n=0}^\infty e^{-\beta nh\nu} = \frac{1}{1-e^{-\beta h\nu}},
\]
where \(\beta=1/kT\).

### Step 4 — Compute the mean energy
The average energy follows at once:
\[
\langle E\rangle = -\frac{\partial\ln Z}{\partial\beta} = \frac{h\nu}{e^{\beta h\nu}-1}.
\]
Note that the zero-point energy has been omitted; it does not affect thermal radiation.

### Step 5 — Count the electromagnetic modes
Inside a large cavity of volume \(V\) the number of standing-wave modes with frequency between \(\nu\) and \(\nu+d\nu\) is
\[
g(\nu)d\nu = \frac{8\pi V\nu^2}{c^3}d\nu
\]
(the factor 2 accounts for two polarization states).

### Step 6 — Form the spectral energy density
Multiplying mode density by mean energy per mode yields
\[
u(\nu,T)=\frac{8\pi h\nu^3}{c^3}\frac{1}{e^{h\nu/kT}-1}.
\]

### Step 7 — Recover the classical and Wien limits
When \(h\nu\ll kT\) the exponential expands to first order and \(u(\nu,T)\) reduces to the Rayleigh–Jeans law \(\frac{8\pi\nu^2 kT}{c^3}\). When \(h\nu\gg kT\) the denominator is dominated by the exponential and Wien’s exponential decay is recovered.

> [!WARNING]
> If you forget the two polarization states in Step 5, the final prefactor will be wrong by exactly a factor of two; every subsequent integral over frequency will be off by the same factor.

## 5. Worked examples — har step show karo

**Example 1 — Partition function at a single frequency**  
*Given:* \(\nu=10^{14}\) Hz, \(T=300\) K.  
*Find:* \(Z\).  
\[
\beta h\nu = \frac{6.626\times10^{-34}\times10^{14}}{1.381\times10^{-23}\times300}\approx 0.160.
\]
\[
Z=\frac{1}{1-e^{-0.160}}\approx 6.90.
\]
*Why:* Direct substitution into the geometric-series formula.  
**Final answer:** \(Z\approx6.90\).

*Reflection:* The value is greater than 1 because several low-lying levels are still populated at room temperature.

**Example 2 — Mean energy versus classical value**  
*Given:* Same numbers as above.  
*Find:* \(\langle E\rangle\) and compare with \(kT\).  
\[
\langle E\rangle=\frac{h\nu}{e^{0.160}-1}\approx0.92\,kT.
\]
*Why:* The quantum correction reduces the energy below equipartition.  
**Final answer:** \(\langle E\rangle\approx0.92\,kT\).

*Reflection:* Even at 300 K the correction is already 8 % for near-infrared frequencies.

**Example 3 — Spectral radiance at peak wavelength**  
*Given:* \(T=5800\) K (Sun’s photosphere).  
*Find:* \(\nu_\text{max}\) from Wien’s displacement law and evaluate \(u(\nu,T)\).  
Wien’s law gives \(\nu_\text{max}\approx5.88\times10^{14}\) Hz. Substituting into Planck’s formula yields the peak spectral density.  
**Final answer:** \(u(\nu_\text{max},5800\,\text{K})\approx1.3\times10^{-5}\) J m\(^{-3}\) Hz\(^{-1}\).

*Reflection:* The calculation demonstrates how the exponential cutoff prevents divergence.

**Example 4 — Total power radiated (Stefan–Boltzmann)**  
*Given:* Integrate \(u(\nu,T)\) over all \(\nu\) and multiply by \(c/4\) to obtain exitance.  
The definite integral \(\int_0^\infty\frac{x^3}{e^x-1}dx=\frac{\pi^4}{15}\) produces
\[
M=\sigma T^4,\qquad\sigma=\frac{2\pi^5 k^4}{15 h^3 c^2}.
\]
**Final answer:** \(\sigma=5.67\times10^{-8}\) W m\(^{-2}\) K\(^{-4}\).

*Reflection:* The same partition-function result that fixed the spectrum also fixes the \(T^4\) law without additional assumptions.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using \(nh\nu\) including zero-point energy | Zero-point energy is temperature-independent        | Drop the \(+\frac12 h\nu\) term before taking \(\langle E\rangle\) |
| Forgetting the factor 2 for polarization | Students count only one scalar field                | Always write “two transverse modes” in mode counting |
| Setting \(h\nu=kT\) as the boundary between regimes | The transition is smooth; the exponential never switches abruptly | Examine the two analytic limits instead of a single crossover |
| Confusing energy density \(u(\nu)\) with radiance \(B(\nu)\) | Different geometric factors (4\(\pi\) steradians)   | Keep \(u(\nu)\) inside the cavity and divide by 4 to get exitance |
| Treating \(\nu\) as angular frequency | Notation clash with \(\omega=2\pi\nu\)              | Use \(\nu\) for frequency in Hz throughout           |
| Integrating to infinity without checking convergence | The exponential decay guarantees convergence        | Verify the high-frequency tail before evaluating definite integrals |

## 7. The textbook-precise statement
In the canonical ensemble the electromagnetic field inside a large cavity of volume \(V\) with perfectly conducting walls is equivalent to a collection of independent quantum harmonic oscillators, one for each allowed wave-vector and polarization. The energy eigenvalues of the oscillator labeled by frequency \(\nu\) are \(E_n=nh\nu\) (\(n=0,1,2,\dots\)). Its partition function is
\[
Z(\nu,T)=\frac{1}{1-e^{-h\nu/kT}}.
\]
The mean energy is therefore
\[
\langle E(\nu,T)\rangle=\frac{h\nu}{e^{h\nu/kT}-1}.
\]
The density of oscillator states (including two polarization states) is
\[
g(\nu)d\nu=\frac{8\pi V\nu^2}{c^3}d\nu.
\]
Hence the spectral energy density is
\[
u(\nu,T)=\frac{8\pi h\nu^3}{c^3}\frac{1}{e^{h\nu/kT}-1}.
\]
(Reif, *Fundamentals of Statistical and Thermal Physics*, 1965, §9.5, Eq. 9.35.)

## 8. Visual — diagram or schematic
```text
Frequency ν →
Energy ───────────────────────────────────────────────►
   │   classical kT          ────────────────────────► diverges
   │   quantum <E>           ____/‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
   │                        /     exponential cutoff
   │   zero-point (ignored) +1/2 hν  (horizontal line)
   └─────────────────────────────────────────────────────────
```
The curve starts linearly (Rayleigh–Jeans), reaches a maximum, then falls exponentially (Wien tail). The classical line is the straight tangent at the origin.

## 9. The memory technique
1. **The hook** — Picture a staircase whose step height is \(h\nu\); the Boltzmann factor \(e^{-nh\nu/kT}\) tells how many people stand on each step. The average height of the crowd is Planck’s mean energy.
2. **What to overlearn** — The exact expression \(\frac{h\nu}{e^{h\nu/kT}-1}\) and the mode density prefactor \(\frac{8\pi\nu^2}{c^3}\).
3. **Spaced-repetition schedule** — Review the partition-function derivation after 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — If the formula is forgotten, rebuild from the geometric series for \(Z\), differentiate to obtain \(\langle E\rangle\), then multiply by the density of states.

## 10. What this unlocks
Planck’s distribution is the gateway to Bose–Einstein statistics for photons and to the broader theory of quantum ideal gases. It directly supplies the photon occupation number \(1/(e^{h\nu/kT}-1)\) used in laser rate equations, in the Saha ionization formula, and in calculations of radiative transfer through stellar atmospheres.

- Next: Bose–Einstein condensation of massive bosons
- Next: Photon chemical potential and blackbody fluctuations
- Next: Derivation of Stefan–Boltzmann law by integration

## 11. Self-check — five questions, no answers
1. Derive the partition function of a single quantum oscillator starting from the energy ladder \(nh\nu\).
2. Show mathematically that Planck’s law reduces to Rayleigh–Jeans for \(h\nu\ll kT\).
3. A cavity at 300 K contains a mode at 1 THz. Compute the ratio of quantum to classical mean energy.
4. Identify the step in the derivation where the two polarization states enter and explain what happens to the spectrum if only one polarization is counted.
5. A student claims that zero-point energy must be added to \(\langle E\rangle\) before integrating to obtain total energy density. Demonstrate why that term does not contribute to the thermal radiation pressure or to the Stefan–Boltzmann constant.