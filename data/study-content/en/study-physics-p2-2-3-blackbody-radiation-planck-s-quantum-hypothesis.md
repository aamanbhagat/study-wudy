## 1. The one-sentence answer
**Blackbody radiation is the electromagnetic spectrum emitted by an ideal absorber in thermal equilibrium, and Planck resolved its classical divergence by hypothesizing that oscillator energies are discrete multiples of hf.**

Classical physics treated the walls of a cavity as continuous harmonic oscillators that could exchange any amount of energy with the radiation field. This produced an energy density that rose without bound at short wavelengths—the ultraviolet catastrophe. Planck instead required each oscillator of frequency *f* to possess energy *E = nhf* where *n* is a positive integer and *h* is a new constant. Summing the resulting Boltzmann-weighted probabilities over these discrete levels yields a spectral distribution that matches experiment at all wavelengths.

The single new assumption—that energy is exchanged only in quanta—simultaneously fixes the high-frequency tail and recovers the long-wavelength Rayleigh–Jeans limit, thereby founding quantum theory.

> [!NOTE]
> The “aha” is that quantization is not an extra postulate imposed on light itself; it is forced on the *matter* oscillators inside the cavity before any photons are invoked.

## 2. Why this matters — concrete and current
Spacecraft thermal-control engineers at NASA and ESA size multi-layer insulation and radiator panels using Planck’s law to predict equilibrium temperatures of satellites whose surfaces behave as near-blackbodies; an error of 5 % in emissivity at 10 µm can shift predicted temperatures by tens of kelvin and endanger cryogenic instruments.

Semiconductor foundries calibrate rapid-thermal-annealing lamps with blackbody standards traceable to Planck’s formula; the 0.1 % spectral accuracy required for 3 nm process nodes rests directly on the same distribution that Planck derived in 1900.

Cosmologists extract the Hubble constant and baryon density from the Planck spacecraft’s map of cosmic-microwave-background anisotropies; the 2.725 K blackbody spectrum supplies the absolute calibration against which all temperature fluctuations are measured.

High-power laser facilities such as the National Ignition Facility model hohlraum walls as blackbodies to predict X-ray drive symmetry; Planck’s spectral radiance sets the conversion efficiency from laser energy to soft-X-ray flux inside the target.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Classical equipartition  | Predicts the ultraviolet catastrophe that Planck removes  |
| Boltzmann factor         | Supplies the statistical weight of each energy level      |
| Standing-wave modes in a cavity | Counts the number of oscillators per frequency interval |
| Thermodynamic equilibrium | Justifies use of a single temperature for all modes       |

## 4. Building the idea — from intuition to formalism

### Step 1 — Classical cavity modes
A cubic cavity of side *L* supports electromagnetic standing waves whose wave-vectors satisfy *k_x = n_x π/L* (and likewise for *y*, *z*). Each mode behaves as a harmonic oscillator.  
Example: *L* = 1 cm yields roughly 10^10 modes below 1 THz.  
The mode density per unit volume in frequency interval *df* is  
$$g(f)\,df = \frac{8\pi f^2}{c^3}\,df.$$  
> [!WARNING]  
> Forgetting the factor of 2 for two polarization states halves the predicted energy density and hides the catastrophe.

### Step 2 — Equipartition theorem
Each quadratic term in the energy contributes *½kT*. A classical oscillator therefore carries average energy *kT*.  
Multiplying mode density by *kT* produces the Rayleigh–Jeans law  
$$u(f) = \frac{8\pi f^2 kT}{c^3}.$$  
> [!WARNING]  
> Applying equipartition at arbitrarily high *f* drives total energy to infinity—the ultraviolet catastrophe.

### Step 3 — Planck’s quantization hypothesis
Planck required the energy of an oscillator of frequency *f* to be  
$$E_n = nhf,\qquad n=0,1,2,\dots$$  
where *h* is Planck’s constant. Zero-point energy is omitted for thermal averages.

### Step 4 — Boltzmann-weighted average energy
The probability of state *n* is proportional to *e^{-nhf/kT}*. The mean energy is therefore  
$$\langle E\rangle = \frac{hf}{e^{hf/kT}-1}.$$  
> [!WARNING]  
> Using *e^{-E/kT}* without normalizing the partition function yields an incorrect numerator.

### Step 5 — Planck’s spectral distribution
Substitute the quantized mean energy into the mode density:  
$$u(f,T) = \frac{8\pi hf^3}{c^3}\frac{1}{e^{hf/kT}-1}.$$  
This is the textbook Planck law. It reduces to Rayleigh–Jeans for *hf ≪ kT* and cuts off exponentially for *hf ≫ kT*.

## 5. Worked examples — every step shown

**Example 1 — Peak wavelength at 3000 K**  
*Given:* A blackbody at *T = 3000 K*.  
*Find:* Wavelength of maximum spectral radiance in wavelength units.  
Wien’s displacement law follows by maximizing *u(λ,T)*:  
$$\lambda_\text{max}T = 2.897\times10^{-3}\,\text{m·K}.$$  
*Why:* Differentiate Planck’s law in wavelength form and set derivative to zero.  
**2898 µm**  
*Reflection:* The numerical constant is universal; only temperature scales the peak.

**Example 2 — Total radiated power**  
*Given:* Surface at *T = 5000 K*.  
*Find:* Emissive power *M*.  
Integrate Planck’s law over all frequencies and hemispheres:  
$$M = \sigma T^4,\qquad\sigma = \frac{2\pi^5 k^4}{15 h^3 c^2}.$$  
*Why:* The integral of *x^3/(e^x−1)* equals *π^4/15*.  
**5.67×10^8 W·m^{-2}**  
*Reflection:* Stefan–Boltzmann law emerges only after quantization supplies the convergent integral.

**Example 3 — Ratio of energies at two frequencies**  
*Given:* *f_1 = 10^{14} Hz*, *f_2 = 5×10^{14} Hz*, *T = 2000 K*.  
*Find:* *u(f_2)/u(f_1)*.  
Direct substitution into Planck’s law yields 0.037.  
*Why:* The exponential term dominates once *hf/kT > 3*.  
**0.037**  
*Reflection:* Classical theory would have given ratio 25; quantization suppresses high frequencies.

**Example 4 — Recover Rayleigh–Jeans limit**  
*Given:* *hf/kT = 0.01*.  
*Find:* Approximate *u(f)*.  
Series expansion *e^x ≈ 1+x* produces  
$$u(f) \approx \frac{8\pi f^2 kT}{c^3}.$$  
*Why:* First-order Taylor restores equipartition.  
**Rayleigh–Jeans expression**  
*Reflection:* The same formula that diverges at high *f* is recovered automatically at low *f*.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Confusing *u(f)* with *u(λ)*      | Jacobian *df/dλ* is omitted                         | Always specify spectral variable before differentiating |
| Setting *n=0* energy to zero      | Zero-point energy is irrelevant thermally           | Drop *n=0* term only after writing the partition function |
| Using *hf* instead of *nhf*       | Misreading the hypothesis                           | Write the allowed energies explicitly before averaging |
| Forgetting two polarizations      | Mode counting error                                 | Insert factor of 2 immediately after counting *k*-states |
| Applying Wien’s law outside its range | Peak location depends on spectral variable         | State whether *f* or *λ* representation is used      |
| Treating *h* as adjustable        | Historical fitting procedure                        | Fix *h = 6.626×10^{-34} J·s* from independent measurements |
| Ignoring *T→0* limit             | Exponential never reaches exactly zero              | Verify *u(f)→0* as *T→0* for all finite *f*         |

## 7. The textbook-precise statement
An ideal blackbody in thermal equilibrium at temperature *T* emits radiation whose spectral energy density per unit frequency interval inside a cavity is given by Planck’s law  
$$u(f,T)=\frac{8\pi hf^3}{c^3}\frac{1}{e^{hf/kT}-1},$$  
where the oscillators constituting the cavity walls possess only energies *E_n=nhf* (*n=0,1,2,…*), *h* is Planck’s constant, *k* is Boltzmann’s constant, and *c* is the speed of light. (See Eisberg & Resnick, *Quantum Physics*, 2nd ed., §1–5.)

## 8. Visual — diagram or schematic
```text
u(f) ↑
     |               Planck curve
     |            /‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     |          /
     |        /
RJ   |      /
     |    /
     |  /
     |/______________________________________________→ f
          f_peak
```
Horizontal axis: frequency *f*. Vertical axis: spectral energy density *u(f)*. Solid curve is Planck’s law; dashed straight line at low *f* is Rayleigh–Jeans; curve peaks then decays exponentially.

## 9. The memory technique
1. **The hook** — Imagine a choir of oscillators that may sing only at integer multiples of a base note *hf*; any fractional energy is forbidden.  
2. **What to overlearn** — Planck’s law, Wien displacement constant *2.897×10^{-3} m·K*, and *h = 6.626×10^{-34} J·s*.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the mean energy *⟨E⟩ = hf/(e^{hf/kT}−1)* from the geometric series of the partition function.

## 10. What this unlocks
Planck’s hypothesis opens the door to the photon concept, the photoelectric effect, and the quantization of all bosonic fields.  
- Einstein’s 1905 photon paper  
- Bose–Einstein statistics for photons and other bosons  
- Derivation of the Stefan–Boltzmann constant from first principles  
- Foundation for laser physics and semiconductor band-gap engineering  

## 11. Self-check — five questions, no answers
1. Show that Planck’s law reduces to the Rayleigh–Jeans law when *hf ≪ kT*.  
2. Compute the frequency at which *u(f,T)* is maximum; express the result in terms of *kT/h*.  
3. A cavity at 1000 K contains radiation at 10 µm and at 1 µm. Which wavelength carries more energy per mode, and by what factor?  
4. Identify the step in the derivation where classical equipartition is replaced by quantization and state why that replacement is indispensable.  
5. If the mode density *g(f)* were proportional to *f* instead of *f²*, how would the high-frequency behavior of *u(f)* change?