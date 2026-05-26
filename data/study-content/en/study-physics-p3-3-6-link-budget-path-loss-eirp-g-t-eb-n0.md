## 1. The one-sentence answer
A link budget is the quantitative accounting of every gain and loss that determines whether a spacecraft radio link closes with sufficient Eb/N0 margin.

Radio waves leaving a spacecraft antenna spread over an ever-larger sphere; the fraction that reaches a distant ground station shrinks with the square of distance and frequency. The transmitter’s power and antenna directivity together set the effective isotropic radiated power that leaves the spacecraft. On the ground the receiving antenna collects a tiny fraction of that power while its own noise temperature sets the noise floor; the ratio of antenna gain to system noise temperature therefore governs how cleanly the signal is recovered. Finally, the ratio of energy per information bit to noise spectral density must exceed a threshold fixed by the chosen modulation and coding if the bit-error rate is to stay acceptably low.

> [!NOTE]
> The entire discipline collapses to one arithmetic statement: Eb/N0 = EIRP − FSPL + G/T − k − 10 log10(Rb) + margins; every other detail is merely a refinement of one term in that chain.

## 2. Why this matters — concrete and current
NASA’s Deep Space Network uses link-budget calculations daily to command the Perseverance rover on Mars; a 1 dB error in predicted path loss can force a switch from 2 Mbps to 256 kbps or lose the link entirely during critical entry-descent-landing sequences.

SpaceX Starlink satellites are designed with on-board link budgets that must remain positive even when the spacecraft is at 550 km altitude and the user terminal sees the satellite at 25° elevation; the same equations determine both the 256-QAM thresholds and the power-amplifier sizing that keeps mass below 260 kg per satellite.

The European Space Agency’s Juice mission to Jupiter will rely on a 20 W X-band transmitter and a 3 m high-gain antenna whose link budget must still deliver 10−5 bit-error rate at 5.2 AU; every decibel of margin directly trades against solar-array area and propellant mass.

The James Webb Space Telescope’s 1.3 m Ka-band high-gain antenna was sized so that its 28 dB G/T at the White Sands ground station yields at least 2 dB margin above the 2.5 dB Eb/N0 required by the rate-1/2 convolutional code after 1.5 million km of free-space loss.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Friis transmission equation | Supplies the geometric 1/r² dependence that becomes free-space path loss.            |
| Antenna gain and directivity | Converts physical aperture and frequency into the dBi numbers used in EIRP and G/T. |
| Boltzmann’s constant k   | Converts noise temperature into noise power spectral density in dBW/Hz.              |
| Decibel arithmetic       | Every term in a link budget is added or subtracted in decibels; linear mistakes are fatal. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Free-space spreading loss
Radio energy expands uniformly over the surface of a sphere whose radius is the slant range; received power therefore falls as 1/r² and also as f² because a larger frequency corresponds to a shorter wavelength and thus a smaller effective capture area.

Example: a 2.2 GHz signal at 1 000 km loses 160 dB even before antenna gains are considered.

The formal expression is  
$$L_{\text{FSPL}} = \left(\frac{4\pi d f}{c}\right)^2.$$

> [!WARNING]
> Using the wavelength form instead of the frequency form without converting units produces a 20 log10(c) offset that silently ruins every subsequent margin.

### Step 2 — Effective Isotropic Radiated Power
EIRP is the power that an isotropic radiator would have to emit to produce the same power density at the receiver as the real transmitter-plus-antenna combination.

In decibels:  
$$ \text{EIRP (dBW)} = P_t\text{(dBW)} + G_t\text{(dBi)} - L_{\text{feed}}\text{(dB)}.$$

> [!WARNING]
> Forgetting feed-line loss after the power amplifier overstates EIRP by the exact number of decibels the cable dissipates.

### Step 3 — Receiver figure of merit G/T
The ratio of antenna gain to system noise temperature tells how much signal power is delivered per kelvin of noise; it is independent of the actual signal level and therefore a pure property of the receiving station.

$$ \frac{G}{T} = G_r\text{(dBi)} - 10\log_{10}(T_{\text{sys}}).$$

> [!WARNING]
> Quoting G/T without specifying the elevation angle hides the fact that atmospheric noise and spillover both rise sharply below 10° elevation.

### Step 4 — Carrier-to-noise density
Subtracting path loss from EIRP and adding G/T yields the received carrier power relative to noise density:  
$$ \frac{C}{N_0} = \text{EIRP} - L_{\text{FSPL}} + \frac{G}{T} + 228.6 \text{ dB},$$  
where 228.6 dB = −10 log10(k) with k = 1.38 × 10−23 J K−1.

### Step 5 — Energy per bit to noise density
Dividing carrier power by bit rate converts the link into a per-bit figure of merit:  
$$ \frac{E_b}{N_0} = \frac{C}{N_0} - 10\log_{10}(R_b).$$

This quantity is compared directly with the theoretical or measured Eb/N0 threshold of the chosen modulation and coding scheme.

## 5. Worked examples — every step shown

**Example 1 — Simple GEO downlink**  
*Given:* 10 W transmitter, 20 dBi antenna, 36 000 km range, 2.2 GHz, 3 m ground antenna (G = 35 dBi), Tsys = 150 K, 1 Mbps BPSK.  
*Find:* Eb/N0.  

Step 1: EIRP = 10 dBW + 20 dBi = 30 dBW.  
*Why:* Convert watts to dBW then add antenna gain.  

Step 2: FSPL = 20 log10(4π × 3.6×10^7 × 2.2×10^9 / 3×10^8) = 190.4 dB.  
*Why:* Direct substitution into the path-loss formula.  

Step 3: G/T = 35 − 10 log10(150) = 35 − 21.8 = 13.2 dB/K.  
*Why:* Antenna gain minus noise temperature in decibels.  

Step 4: C/N0 = 30 − 190.4 + 13.2 + 228.6 = 81.4 dB-Hz.  
*Why:* Combine all link terms with the Boltzmann constant offset.  

Step 5: Eb/N0 = 81.4 − 10 log10(10^6) = 81.4 − 60 = 21.4 dB.  
*Why:* Subtract the bit-rate penalty.  

**21.4 dB**  

*Reflection:* The example is forgiving because GEO numbers are large; the same arithmetic at lunar distances immediately reveals the need for coding gain.

**Example 2 — Adding margins and coding**  
*Given:* Same link but with 3 dB implementation loss, 2 dB atmospheric loss, and rate-1/2 convolutional code requiring Eb/N0 ≥ 4.5 dB.  
*Find:* Margin.  

Margin = 21.4 − 3 − 2 − 4.5 = 11.9 dB.  
**11.9 dB**  

*Reflection:* Margin calculations force the designer to quantify every real-world degradation before launch.

**Example 3 — Uplink from a 70 m DSN station**  
*Given:* 20 kW at 7.2 GHz, 70 m antenna (G = 74 dBi), 1.5 AU range, spacecraft 0 dBi low-gain antenna, Tsys = 300 K.  
*Find:* Achievable bit rate for Eb/N0 = 3 dB.  

FSPL at 1.5 AU and 7.2 GHz = 268.7 dB.  
EIRP = 73 dBW + 74 dBi = 147 dBW.  
Spacecraft G/T = 0 − 24.8 = −24.8 dB/K.  
C/N0 = 147 − 268.7 − 24.8 + 228.6 = 82.1 dB-Hz.  
Rb = 10^(8.21−0.3) ≈ 8.1 Mbps.  
**8.1 Mbps**  

*Reflection:* Uplink budgets are usually power-rich; the limit is often regulatory EIRP density rather than Eb/N0.

**Example 4 — Deep-space Ka-band at 32 GHz**  
*Given:* 35 W, 3 m spacecraft antenna (G = 48 dBi), 5.2 AU, 34 m ground station (G = 80 dBi), Tsys = 25 K.  
*Find:* Margin above 1/2-rate LDPC threshold of 1.2 dB at 100 kbps.  

FSPL = 20 log10(4π × 7.8×10^11 × 32×10^9 / 3×10^8) = 304.3 dB.  
EIRP = 15.4 + 48 = 63.4 dBW.  
G/T = 80 − 14 = 66 dB/K.  
C/N0 = 63.4 − 304.3 + 66 + 228.6 = 53.7 dB-Hz.  
Eb/N0 = 53.7 − 50 = 3.7 dB.  
Margin = 3.7 − 1.2 = 2.5 dB.  
**2.5 dB**  

*Reflection:* Ka-band buys 6 dB extra antenna gain but demands far tighter pointing; the link budget itself remains unchanged in form.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Treating dB and dBi as interchangeable | Both appear after antenna terms                     | Always annotate every term with its reference (dBW, dBi, dB-K−1). |
| Using geometric range instead of slant range | Elevation angle omitted                             | Compute true line-of-sight distance from orbital elements. |
| Ignoring rain fade at Ka-band     | Clear-sky budgets look adequate                     | Add ITU-R P.618 statistical attenuation at the target availability. |
| Forgetting that Eb/N0 is post-decoding | Confusing channel Eb/N0 with coded performance      | Use the coding gain curve for the exact code rate.   |
| Adding linear noise temperatures before taking 10 log | Dimensional error                                   | Convert each temperature to dB first, then subtract. |
| Neglecting pointing loss          | Beamwidth shrinks with frequency                    | Include 3 dB or measured mispoint term for each antenna. |
| Assuming Tsys is constant with elevation | Atmospheric contribution rises at low angles        | Tabulate G/T versus elevation from measured data.    |

## 7. The textbook-precise statement
A link budget is closed when  
$$ \frac{E_b}{N_0}\bigg|_{\text{dB}} \ge \left(\frac{E_b}{N_0}\right)_{\text{req}} + M, $$  
where  
$$ \frac{E_b}{N_0} = \text{EIRP} - L_{\text{FSPL}}(d,f) + \frac{G}{T} - k - 10\log_{10}(R_b) $$  
and all quantities are expressed in consistent decibel units. The free-space loss term is derived from the Friis equation under the far-field, vacuum, isotropic-medium assumptions. Reference: “CCSDS 131.0-B-3, TM Synchronization and Channel Coding,” §2.3, 2020.

## 8. Visual — diagram or schematic
```text
Spacecraft
   Pt ──►[PA]──►[Feed loss]──►[Tx Antenna Gt]──►
                                           │
                                           │ free-space path loss L_FSPL
                                           ▼
Ground station
   [Rx Antenna Gr]──►[LNA]──►[Demod]──► Eb/N0 meter
        ▲
        │
      G/T = Gr − 10 log Tsys
```

## 9. The memory technique
1. **The hook** — Picture a fire hose spraying water into a swimming pool at night; EIRP is how hard the nozzle is aimed, path loss is how much water spreads before it reaches the pool, G/T is the size of the pool versus how choppy the water already is, and Eb/N0 is whether you can still read the label on each arriving drop.
2. **What to overlearn** — The five-term chain EIRP − L_FSPL + G/T − k − 10 log Rb and the numerical constant 228.6 dB.
3. **Spaced-repetition schedule** — Re-derive the chain from the Friis equation at 1 day, 3 days, 7 days, 16 days, and 35 days after first mastery.
4. **First-principles fallback** — Start from power density S = EIRP/(4πd²), multiply by effective aperture Ae = Gr λ²/4π, divide by kT, then convert to per-bit energy.

## 10. What this unlocks
Mastery of the link budget supplies the quantitative language needed for modulation choice, error-correction coding gain allocation, antenna sizing trades, and end-to-end system margin management.  

- Next: convolutional and LDPC code performance curves versus Eb/N0.  
- Next: frequency-dependent atmospheric and ionospheric loss models.  
- Next: spacecraft RF power-amplifier back-off versus linearity versus mass.  
- Next: optical communication link budgets (same structure, photon counting statistics).

## 11. Self-check — five questions, no answers
1. A 2 dB increase in transmitter power raises EIRP by how many decibels, and what happens to the required spacecraft DC power if the amplifier efficiency remains 35 %?  
2. Why does doubling the carrier frequency increase free-space loss by 6 dB even if distance is unchanged?  
3. A receiving station reports G/T = 40 dB/K at 10° elevation and 42 dB/K at 30° elevation; which term in the link budget is responsible and by how much?  
4. If the bit rate is increased by a factor of four while every other parameter is held constant, by how many decibels does Eb/N0 fall, and what coding change could restore the original value?  
5. An engineer forgets the 1.5 dB radome loss on the ground antenna; is the resulting Eb/N0 optimistic or pessimistic, and by how many decibels?