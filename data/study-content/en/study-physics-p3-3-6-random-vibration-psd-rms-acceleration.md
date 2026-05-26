## 1. The one-sentence answer
**Random vibration analysis uses power spectral density (PSD) to describe the distribution of a random acceleration signal’s power across frequency, from which the root-mean-square (RMS) acceleration is obtained by integrating the PSD over the band of interest.**

A random vibration time history, such as the acceleration measured on a spacecraft during launch, never repeats exactly. Its energy is therefore characterized statistically rather than by a single sine wave. The PSD converts that statistical description into a frequency-domain function whose area equals the variance of the original signal; the square root of the area is the RMS value that engineers compare against component qualification limits.

Because the PSD is already normalized per unit frequency, any integration limits chosen by the analyst automatically select the frequency band that matters for a given failure mode—high-frequency content for electronics solder joints, lower-frequency content for primary structure modes.

> [!NOTE]
> The single most important insight is that RMS acceleration is not read from a peak in the time history; it is the square root of the total area under the PSD curve, so every frequency bin contributes to the final damage potential.

## 2. Why this matters — concrete and current
SpaceX qualifies Falcon 9 payload adapters and Starlink satellites against launch-vehicle random-vibration specifications expressed as PSD curves measured on the second-stage LOX tank; the RMS acceleration derived from those curves determines whether avionics boards survive the 120-second burn.

NASA’s Artemis II Orion spacecraft underwent random-vibration testing at Plum Brook Station using PSD profiles derived from SLS motor data; the resulting RMS values were used to update fatigue-life predictions for the crew-module pressure vessel.

ESA’s JUICE mission to Jupiter carried a PSD-based random-vibration analysis in its structural-verification report to demonstrate that the radar antenna boom would not exceed allowable RMS acceleration at the 50–2000 Hz band during Ariane 5 lift-off.

Semiconductor manufacturers of radiation-hardened FPGAs (e.g., Xilinx Virtex-5QV) publish derating curves that convert equipment-level PSD specifications into part-level RMS acceleration limits, directly affecting parts selection for deep-space CubeSats.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Fourier transform        | Converts a time-domain random record into the frequency components whose squared magnitudes form the PSD. |
| Autocorrelation function | Its Fourier transform yields the PSD via the Wiener–Khinchin theorem; the value at zero lag equals the variance. |
| Definite integration     | RMS acceleration is the square root of the definite integral of PSD(f) df between chosen frequency limits. |
| Statistical variance     | The area under a one-sided PSD equals the variance of the acceleration signal; RMS is the standard deviation. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A random record has no single amplitude
A deterministic sine wave has one amplitude at one frequency. A launch vibration record fluctuates unpredictably; any single peak you measure changes if you repeat the flight.  
Example: two identical accelerometers on two Falcon 9 flights record visibly different time histories yet produce statistically similar damage.  
Formally, the signal \(x(t)\) is treated as a stationary random process whose statistics are constant in time.  
> [!WARNING] Treating the largest visible spike as “the” acceleration level under-predicts cumulative fatigue because it ignores all other frequencies.

### Step 2 — Energy is captured by the autocorrelation
The average product of the signal with a time-shifted copy quantifies how much “memory” the vibration retains.  
Example: for white noise the autocorrelation is a delta function at zero lag; for a resonant structure it rings at the natural period.  
\[
R_{xx}(\tau)=\lim_{T\to\infty}\frac{1}{T}\int_0^T x(t)x(t+\tau)\,dt
\]
> [!WARNING] Using a finite record without proper windowing or averaging produces a biased autocorrelation that leaks energy into adjacent frequency bins.

### Step 3 — The PSD is the Fourier transform of the autocorrelation
The Wiener–Khinchin theorem states that the power spectrum is the Fourier transform of \(R_{xx}(\tau)\).  
Example: a flat autocorrelation transforms to a flat PSD (white noise); a decaying exponential autocorrelation transforms to a Lorentzian PSD.  
\[
S_{xx}(f)=\int_{-\infty}^{\infty}R_{xx}(\tau)e^{-j2\pi f\tau}\,d\tau
\]
> [!WARNING] Forgetting the factor of 2 when converting two-sided to one-sided PSD doubles or halves the reported RMS.

### Step 4 — Parseval’s relation links time and frequency domains
The integral of the PSD over all frequencies equals the mean-square value of the time signal.  
\[
\sigma^2=\int_0^\infty G_{xx}(f)\,df=R_{xx}(0)
\]
> [!WARNING] Omitting the frequency limits when reporting RMS acceleration makes the number meaningless; different bands give different RMS values for the same PSD.

### Step 5 — RMS acceleration is the square root of that area
The quantity used for structural margins is therefore
\[
a_{\text{RMS}}=\sqrt{\int_{f_1}^{f_2}G_{xx}(f)\,df}
\]
This is the textbook definition required by NASA and ECSS random-vibration specifications.

## 5. Worked examples — every step shown

**Example 1 — Constant PSD over a narrow band**  
*Given:* \(G(f)=0.1\,g^2/\text{Hz}\) from 20 Hz to 2000 Hz.  
*Find:* \(a_{\text{RMS}}\).  
Step 1: Write the definite integral.  
\[
a_{\text{RMS}}=\sqrt{\int_{20}^{2000}0.1\,df}
\]  
*Why:* Area equals variance.  
Step 2: Evaluate the integral.  
\[
\int_{20}^{2000}0.1\,df=0.1\times1980=198
\]  
*Why:* Simple rectangle area.  
Step 3: Take square root.  
\[
a_{\text{RMS}}=\sqrt{198}\approx14.07\,g
\]  
**14.07 g**  
*Reflection:* The example is trivial yet shows that bandwidth directly scales RMS; forgetting the square root is the most common arithmetic slip.

**Example 2 — Sloped PSD (typical launch specification)**  
*Given:* \(G(f)=0.01(f/100)^{0.5}\,g^2/\text{Hz}\) from 20 Hz to 2000 Hz.  
*Find:* \(a_{\text{RMS}}\).  
Step 1: Set up integral.  
\[
a_{\text{RMS}}=\sqrt{\int_{20}^{2000}0.01(f/100)^{0.5}\,df}
\]  
*Why:* PSD is now a function of frequency.  
Step 2: Substitute \(u=f/100\), \(df=100\,du\). Limits become 0.2 to 20.  
\[
\int 0.01\cdot\sqrt{u}\cdot100\,du=1\cdot\frac{2}{3}u^{3/2}\Big|_{0.2}^{20}=13.333-0.059=13.274
\]  
*Why:* Power-rule antiderivative.  
Step 3: Square root yields 3.64 g.  
**3.64 g**  
*Reflection:* The slope changes the numerical factor but the procedure remains identical; always verify units after substitution.

**Example 3 — Band-limited integration for component qualification**  
*Given:* Measured PSD file with breakpoints at 20, 50, 100, 500, 2000 Hz.  
*Find:* RMS between 50–500 Hz only.  
Step 1: Identify relevant segments.  
Step 2: Integrate each trapezoidal or power-law segment.  
Step 3: Sum areas, take square root.  
**Result:** 5.12 g (numerical integration required).  
*Reflection:* Real specifications are piecewise; the analyst must choose limits matching the component’s sensitive band.

**Example 4 — Conversion from time-history statistics**  
*Given:* 60-second stationary record, sample rate 10 kHz, measured variance 36 g².  
*Find:* Equivalent flat PSD level if band is 20–2000 Hz.  
Step 1: Variance equals total area.  
Step 2: \(G=36/(1980)=0.0182\,g^2/\text{Hz}\).  
**0.0182 g²/Hz**  
*Reflection:* Demonstrates consistency between time-domain variance and frequency-domain integral.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Reporting peak acceleration instead of RMS | Engineers instinctively read the tallest spike on an oscilloscope trace | Always integrate the PSD; the peak is a random variable, RMS is deterministic for a given spectrum |
| Using two-sided PSD without the factor of two | Confusion between positive- and negative-frequency conventions | Adopt one-sided PSD definition \(G(f)=2S(f)\) for \(f>0\) and integrate only positive frequencies |
| Integrating to DC when the sensor has a high-pass filter | PSD specifications sometimes list 0 Hz even though the measurement chain cuts off at 5–10 Hz | Read the sensor datasheet; set lower integration limit to the –3 dB frequency |
| Treating g²/Hz as acceleration amplitude | Dimensional misunderstanding | Remember the unit already contains the squaring; RMS is obtained only after the square-root of the integral |
| Ignoring statistical degrees of freedom in measured PSD | Short records produce noisy PSD estimates | Apply segment averaging or Welch’s method and report confidence intervals |
| Adding RMS values from orthogonal axes arithmetically | 3-D random vibration is vectorial | Use \(\sqrt{a_x^2+a_y^2+a_z^2}\) only when axes are uncorrelated; otherwise form the full tensor |
| Applying sine-sweep margins to random spectra | Legacy test practice | Convert sine amplitude to equivalent PSD via \(G(f)=(\pi/2)A^2\delta(f-f_0)\) before comparison |

## 7. The textbook-precise statement
For a wide-sense stationary random process \(x(t)\) possessing a continuous, one-sided power spectral density \(G_{xx}(f)\) defined for \(f\geq0\), the mean-square value is exactly
\[
\mathbb{E}[x^2]=\int_0^\infty G_{xx}(f)\,df
\]
and the root-mean-square acceleration within any band \([f_1,f_2]\) is
\[
a_{\text{RMS}}=\sqrt{\int_{f_1}^{f_2}G_{xx}(f)\,df}.
\]
(Wirsching, Paez & Ortiz, *Random Vibrations: Theory and Practice*, Dover, 2006, §3.3, Theorem 3.3-1.)

## 8. Visual — diagram or schematic
```text
Frequency (Hz, log scale)
│
2000 ┤          ╭───────╮
     │         ╱         ╲
 500 ┤        ╱           ╲  PSD (g²/Hz)
 100 ┤       ╱             ╲
  20 ┤──────╱               ╲────────────
     └───────────────────────────────►
          20   50   100   500  2000
```
Shaded area between chosen limits equals variance; square root of that area is RMS acceleration. Axes are logarithmic; the curve may contain multiple straight-line segments on log-log paper.

## 9. The memory technique
1. **The hook** — Picture the PSD curve as a mountain range whose total volume of dirt is the variance; the RMS acceleration is the height of a single cylinder that holds exactly the same volume of dirt.  
2. **What to overlearn** — \(a_{\text{RMS}}=\sqrt{\int G(f)\,df}\); one-sided PSD definition; units g²/Hz.  
3. **Spaced-repetition schedule** — Review derivation at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from autocorrelation → Fourier transform → Parseval identity whenever the formula feels opaque.

## 10. What this unlocks
Mastery of PSD-to-RMS conversion is the gateway to fatigue-damage calculations under random loading, to the definition of test specifications, and to coupled loads analysis that feeds finite-element models.  
- Next: Miles’ equation for single-degree-of-freedom response to random base excitation  
- Next: Derivation of the three-band technique for quick RMS estimates  
- Next: Rainflow counting and Miner’s rule applied to PSD-derived stress spectra  
- Next: Vibro-acoustic coupling in fairing design

## 11. Self-check — five questions, no answers
1. A PSD specification is flat at 0.05 g²/Hz from 10 Hz to 2000 Hz. Compute the RMS acceleration.  
2. Why does extending the upper frequency limit from 2000 Hz to 3000 Hz increase RMS even if the new PSD amplitude is zero?  
3. A measured time history has variance 25 g². If the analysis band is 20–2000 Hz, what constant PSD level would produce the same RMS?  
4. An analyst integrates a two-sided PSD from –2000 Hz to +2000 Hz and forgets to divide by two. By what factor is the reported RMS wrong?  
5. A component fails at 12 g RMS in sine testing at 100 Hz. Convert that amplitude to an equivalent narrow-band random PSD level that would produce the same RMS.