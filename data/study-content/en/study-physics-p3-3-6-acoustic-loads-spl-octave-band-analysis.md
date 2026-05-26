## 1. The one-sentence answer
**Acoustic loads on spacecraft are quantified by sound pressure level (SPL) expressed in decibels and decomposed into octave bands so that random, broadband pressure fluctuations from launch can be mapped onto structural frequency response.**

Sound consists of rapid pressure variations superimposed on ambient pressure. Because the human ear and most structures respond over many orders of magnitude in both amplitude and frequency, engineers convert the raw pressure time history into a logarithmic scale and then partition that spectrum into constant-percentage bandwidths called octaves. The result is a compact table or spectrum of SPL values per band that can be applied directly as forcing functions in finite-element or statistical-energy models.

The conversion to decibels compresses the dynamic range while preserving ratios; the octave partitioning matches the way energy is distributed in turbulent rocket plumes and the way modal density increases with frequency in plates and shells. Once both operations are performed, acoustic qualification reduces to comparing band-limited SPL against allowable random-vibration spectra derived from the spacecraft’s own resonance frequencies.

> [!NOTE]
> The single most important insight is that SPL is not an absolute energy quantity; it is always a ratio referenced to 20 µPa, and octave bands are not arbitrary bins—they are geometrically spaced so each successive band doubles the frequency limits, automatically weighting higher-frequency energy according to the physics of both the source and the structure.

## 2. Why this matters — concrete and current
SpaceX measures 1/3-octave SPL spectra at 20 microphone locations during every Falcon 9 static-fire and launch; these data are used to update the random-vibration environment for Starlink satellites whose solar-array hinges have repeatedly shown fatigue cracks above 800 Hz.

NASA’s SLS Block 1B acoustic qualification campaign for the Orion spacecraft combined full-scale motor tests with octave-band scaling laws published in NASA-CR-2018-21996; the resulting 0.5–2 kHz band levels drove the thickness of the crew-module heat-shield attachment ring.

Ariane 6 upper-stage payload fairing design relied on statistical energy analysis whose input power spectral densities were derived from octave-band SPL measurements taken inside the 2019 P120 motor test; the analysis showed that the 500 Hz band contributed 40 % of the total acoustic power absorbed by the JUICE spacecraft’s magnetometer boom.

Semiconductor fabrication clean-room designers use the same SPL-to-octave-band workflow to specify vibration isolators for extreme-ultraviolet lithography stages; acoustic coupling from HVAC fans produces 63 Hz and 125 Hz bands that translate into 10 nm overlay errors if left untreated.

## 3. Mental prerequisites

| Concept              | Why you need it here                                                                 |
|----------------------|--------------------------------------------------------------------------------------|
| Logarithms (base 10) | SPL definition is 20 log₁₀(p/p_ref); every decibel calculation is a logarithmic ratio |
| Decibel scale        | Converts pascals into a dimensionless level that adds when pressures are incoherent |
| Frequency and Hz     | Octave bands are defined by frequency ratios, not absolute values                    |
| Root-mean-square     | SPL uses rms pressure; time-averaged energy is required before taking the logarithm  |
| Modal density        | Structures have more modes at higher frequencies; octave bands naturally capture this increase |

## 4. Building the idea — from intuition to formalism

### Step 1 — Pressure fluctuations are the physical quantity
Sound reaches a structure as a time-varying pressure field whose amplitude is typically only a few pascals even when painfully loud.  
A 1 Pa rms pressure fluctuation on a 1 m² panel produces a force of 1 N—small compared with launch accelerations yet dangerous because it is applied over a broad frequency range.  
The instantaneous pressure is written  
$$p(t)=p_{\text{rms}}\sqrt{2}\sin(\omega t+\phi).$$  
> [!WARNING]  
> Treating peak pressure instead of rms pressure overestimates levels by 3 dB and violates the definition used in all aerospace standards.

### Step 2 — Logarithmic compression yields the decibel
Because pressure spans six orders of magnitude from threshold of hearing to rocket exhaust, ratios are expressed in decibels.  
The sound pressure level is therefore  
$$L_p=20\log_{10}\left(\frac{p_{\text{rms}}}{p_{\text{ref}}}\right)\quad\text{dB re }20\,\mu\text{Pa}.$$  
A pressure of 1 Pa gives exactly 94 dB.  
> [!WARNING]  
> Using 20 log instead of 10 log is mandatory for pressure; using 10 log converts the quantity into intensity or power and produces a 6 dB error.

### Step 3 — Reference pressure fixes the zero point
The conventional reference 20 µPa is the threshold of hearing at 1 kHz; it is not a physical constant but an agreed convention.  
All SPL values in spacecraft documentation are therefore relative to this single number, allowing direct numerical comparison between wind-tunnel, motor-test, and flight data.

### Step 4 — Octave bands group energy by constant ratio
An octave band is defined so the upper frequency is exactly twice the lower frequency.  
Standard center frequencies follow the ISO series: 31.5, 63, 125, 250, 500, 1000 Hz, etc.  
Band limits for the 1000 Hz octave are 707 Hz to 1414 Hz; the geometric center is \(\sqrt{707\times1414}=1000\) Hz.

### Step 5 — Band SPL is obtained by integration
Within each octave the mean-square pressure is integrated over the band and then converted back to level:  
$$L_{p,\text{band}}=10\log_{10}\left(\int_{f_1}^{f_2}G_{pp}(f)\,df\right)-10\log_{10}(p_{\text{ref}}^2),$$  
where \(G_{pp}(f)\) is the one-sided power spectral density.  
This step automatically accounts for the increasing modal density of the structure at higher frequencies.

### Step 6 — Overall SPL is recovered by incoherent summation
Because acoustic pressures in different bands are uncorrelated, total mean-square pressure is the sum of band mean-square pressures.  
The overall level is therefore  
$$L_{p,\text{overall}}=10\log_{10}\sum_i10^{0.1L_{p,i}}.$$  
This is the textbook statement used in NASA-HDBK-7005 and ECSS-E-ST-10-03C.

## 5. Worked examples — every step shown

**Example 1 — Single-tone SPL**  
*Given:* rms pressure = 0.2 Pa.  
*Find:* SPL re 20 µPa.  
Step 1: Form the ratio \(0.2/(20\times10^{-6})=10^4\).  
*Why:* Reference pressure is the agreed zero.  
Step 2: Take \(20\log_{10}(10^4)=80\).  
*Why:* The factor 20 converts pressure ratio to decibels.  
**80 dB**

*Reflection:* The calculation is exact because the signal is tonal; the same arithmetic applies inside any octave band after rms is extracted.

**Example 2 — Adding two incoherent sources**  
*Given:* 85 dB and 88 dB in the same octave.  
*Find:* Combined level.  
Step 1: Convert to intensity ratios: \(10^{8.5}=3.162\times10^8\), \(10^{8.8}=6.310\times10^8\).  
*Why:* Decibels are logarithmic; addition must occur in linear power.  
Step 2: Sum = \(9.472\times10^8\).  
Step 3: \(10\log_{10}(9.472\times10^8)=89.75\) dB.  
**89.8 dB** (rounded to 0.1 dB per aerospace convention)

*Reflection:* The 3 dB difference produces only a 1.8 dB rise—classic trap for engineers expecting arithmetic addition.

**Example 3 — Octave-band integration**  
*Given:* Flat PSD \(G_{pp}=0.01\) Pa²/Hz from 707 Hz to 1414 Hz.  
*Find:* Band SPL.  
Step 1: Bandwidth = 707 Hz.  
Step 2: Mean-square pressure = \(0.01\times707=7.07\) Pa².  
Step 3: \(L_p=10\log_{10}(7.07/(4\times10^{-10}))=102.5\) dB.  
**102.5 dB**

*Reflection:* The 707 Hz bandwidth is exactly one octave; doubling the bandwidth raises level by 3 dB when PSD is constant.

**Example 4 — Overall level from three bands**  
*Given:* 500 Hz band 105 dB, 1000 Hz band 110 dB, 2000 Hz band 102 dB.  
*Find:* Overall SPL.  
Step 1: Linear powers: \(3.162\times10^{10}\), \(1.000\times10^{11}\), \(1.585\times10^{10}\).  
Step 2: Sum = \(1.475\times10^{11}\).  
Step 3: \(10\log_{10}(1.475\times10^{11})=111.7\) dB.  
**111.7 dB**

*Reflection:* The 1000 Hz band dominates; lowering it by 3 dB reduces overall level by only 1.8 dB.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using 10 log instead of 20 log for SPL | Confusing pressure with intensity                   | Always write “20 log p” when pressure is given       |
| Adding decibel levels arithmetically | Intuition from linear quantities                    | Convert to linear power, add, convert back           |
| Treating octave limits as linear rather than geometric | Forgetting that “octave” means ratio of 2           | Verify upper = 2 × lower before integrating          |
| Ignoring the 3 dB difference between 1/1 and 1/3 octave | Standards sometimes publish both                    | Check the bandwidth correction factor explicitly     |
| Applying A-weighting to spacecraft data | Habit from environmental noise work                 | Use unweighted (“flat”) SPL for structural loads     |
| Forgetting that rms pressure is frequency-dependent | Measuring only overall rms with a sound-level meter | Always request spectral data from test instrumentation |
| Rounding band levels before summing | Loss of precision in the tail bands                 | Keep one extra decimal until final overall level     |

## 7. The textbook-precise statement
Sound pressure level in the ith octave band is defined by  
$$L_{p,i}=10\log_{10}\left(\frac{1}{p_{\text{ref}}^2}\int_{f_i/\sqrt{2}}^{f_i\sqrt{2}}G_{pp}(f)\,df\right)\quad\text{dB re }20\,\mu\text{Pa},$$  
where \(G_{pp}(f)\) is the single-sided mean-square pressure spectral density, \(p_{\text{ref}}=20\times10^{-6}\) Pa, and the integration limits are the exact geometric octave edges. The overall level follows from incoherent summation of the band energies. This formulation appears verbatim in NASA-HDBK-7005, “Dynamic Environmental Criteria,” §4.3.2 (2001).

## 8. Visual — diagram or schematic
```text
Frequency (Hz, log scale)
   31.5   63   125   250   500  1000  2000  4000
     |     |     |     |     |     |     |     |
     [ octave band 1 ] [ octave band 2 ] ...
          ^             ^
       f_lower=707     f_upper=1414   (1000 Hz band)
Each vertical bar represents constant-percentage bandwidth;
height of bar = SPL (dB). Adjacent bands abut at geometric center.
```

## 9. The memory technique
1. **The hook** — Picture a rocket exhaust “octave ladder”: each rung is twice as high as the one below; the loudness written on the rung is already the integrated SPL for that rung.
2. **What to overlearn** — SPL formula with the factor 20, the definition of octave edges (\(f\sqrt{2}\)), and the rule that powers add, not decibels.
3. **Spaced-repetition schedule** — Review the SPL definition at 1 day, 3 days, 7 days, 16 days, 35 days after first study.
4. **First-principles fallback** — Re-derive from \(p_{\text{rms}}\) → ratio → 20 log₁₀ → geometric band edges → incoherent summation.

## 10. What this unlocks
Mastery of SPL and octave-band analysis supplies the forcing function that feeds directly into random-vibration analysis, statistical energy analysis, and acoustic-fatigue life prediction.  

- Next: Miles’ equation for single-degree-of-freedom response to random pressure spectra  
- Next: SEA coupling-loss factors between acoustic and structural subsystems  
- Next: Derivation of equivalent sine or random-vibration test specifications from acoustic data  
- Next: High-cycle acoustic fatigue of honeycomb panels and composite fairings

## 11. Self-check — five questions, no answers
1. A pressure transducer records an rms value of 5 Pa inside the 500 Hz octave. What is the band SPL?  
2. Two uncorrelated sources produce 94 dB and 100 dB in the same octave; what is the combined level?  
3. Why does doubling the analysis bandwidth raise the measured SPL by 3 dB when the PSD is flat?  
4. A spacecraft specification quotes an overall acoustic level of 147 dB but supplies only 1/3-octave data. How would you obtain the 1/1-octave spectrum required by your finite-element code?  
5. If the 2000 Hz octave band SPL is lowered by 6 dB while all other bands remain unchanged, by how many decibels does the overall level drop? Under what condition would the drop be exactly 6 dB?