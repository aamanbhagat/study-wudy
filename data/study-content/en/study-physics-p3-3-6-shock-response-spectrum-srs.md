## 1. The one-sentence answer
**The shock response spectrum (SRS) is the curve of maximum absolute acceleration responses experienced by an ensemble of single-degree-of-freedom oscillators, each with a different natural frequency, when all are subjected to the same transient acceleration time history.**

A shock is a short, intense acceleration pulse that can excite every resonance inside a spacecraft. Rather than analyze the pulse itself, engineers ask what the worst-case peak acceleration would be for any component whose natural frequency lies anywhere in the band of interest. The SRS answers that question by passing the measured (or predicted) shock waveform through a bank of ideal oscillators and recording only the highest absolute acceleration each oscillator reaches.

This single curve therefore replaces an entire family of time-history calculations. It directly supplies the acceleration level a component at any given frequency must be designed or tested to survive.

> [!NOTE]
> The SRS is not a property of the structure; it is a property of the *input shock* expressed in the language of the structure’s possible resonances.

## 2. Why this matters — concrete and current
NASA’s Artemis program uses SRS specifications derived from SLS solid-rocket booster ignition and stage-separation pyrotechnics to qualify every avionics box on the Orion spacecraft; any unit whose first mode lies between 100 Hz and 10 kHz must demonstrate survival to the published SRS envelope.

SpaceX performs SRS analysis on Falcon 9 fairing separation shocks measured during flight; the resulting spectra are used to set random-vibration test levels for Starlink satellites whose solar-array hinges have natural frequencies near 800 Hz.

ESA’s JUICE mission to Jupiter carries sensitive magnetometer boom electronics whose SRS qualification was derived from the Ariane 5 upper-stage separation event; the 3 kHz peak in that spectrum dictated a redesign of the boom’s titanium flexures.

Semiconductor manufacturers of MEMS inertial sensors for launch vehicles now publish SRS withstand ratings (typically 1000 g at 1 kHz, Q = 10) so that CubeSat integrators can decide whether additional shock isolation is required.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Single-degree-of-freedom (SDOF) oscillator | The entire SRS is built from the peak responses of these ideal elements |
| Absolute acceleration response | SRS is conventionally plotted in absolute (not relative) acceleration |
| Damping ratio or quality factor Q | Peak height scales directly with Q; the standard value is Q = 10 |
| Log-log frequency plotting | SRS spans decades in both frequency and amplitude         |

## 4. Building the idea — from intuition to formalism

### Step 1 — A shock is a transient acceleration
A shock appears as a brief, high-amplitude acceleration record \(a(t)\) lasting only a few milliseconds.  
Example: a half-sine pulse of 1000 g peak lasting 1 ms.  
Formally, the input is any integrable function \(a(t)\) with finite duration.  
> [!WARNING] Treating the shock as a steady-state sinusoid produces wildly incorrect damage estimates.

### Step 2 — Replace the real structure by an ideal SDOF oscillator
Any local resonance can be approximated by a mass-spring-damper system whose equation of motion is
\[
\ddot{x} + 2\zeta\omega_n\dot{x} + \omega_n^2 x = -a(t)
\]
where \(\omega_n\) is the natural frequency we will vary.  
The absolute acceleration of the mass is \(\ddot{x} + a(t)\).

### Step 3 — Solve for the absolute acceleration time history
For each chosen \(\omega_n\) and fixed \(\zeta\) (usually 0.05), integrate the differential equation numerically from rest to obtain the absolute acceleration response \(a_{\text{resp}}(t;\omega_n)\).

### Step 4 — Extract the single worst peak
Define the SRS value at that frequency as
\[
\text{SRS}(\omega_n) = \max_t |a_{\text{resp}}(t;\omega_n)|
\]
Only the largest absolute value is retained; phase and duration information are discarded.

### Step 5 — Sweep natural frequency across the band
Repeat Steps 2–4 for every \(\omega_n\) of engineering interest (typically 10 Hz to 10 kHz in logarithmic steps).  
The resulting discrete set \(\{\omega_n, \text{SRS}(\omega_n)\}\) is the shock response spectrum.

### Step 6 — Plot on log-log axes with standard damping
The textbook SRS is presented as a log-log graph of acceleration (g) versus natural frequency (Hz) at a stated quality factor Q = 10 (\(\zeta \approx 0.05\)).

## 5. Worked examples — every step shown

**Example 1 — Half-sine pulse, analytic check**  
*Given:* \(a(t) = A\sin(\pi t/\tau)\) for \(0\le t\le\tau\), zero elsewhere; \(A=1000\) g, \(\tau=1\) ms, \(\zeta=0\).  
*Find:* SRS value at \(\omega_n = \pi/\tau\).  
The analytic solution for the undamped oscillator yields a peak absolute acceleration of exactly 2A.  
**Why:** the pulse duration equals one half-period of the oscillator, producing resonant build-up.  
**Final answer:** \(\text{SRS}=2000\) g at 500 Hz.  
*Reflection:* The factor-of-two amplification is the simplest possible SRS result and generalizes to the “doubling” rule of thumb for low-frequency shocks.

**Example 2 — Same pulse at high frequency**  
*Given:* same pulse, now \(\omega_n = 10\pi/\tau\) (5 kHz).  
*Find:* SRS value.  
Because the pulse is much longer than the natural period, the mass barely moves during the event; the absolute acceleration therefore follows \(a(t)\) itself.  
**Why:** inertia prevents significant relative motion.  
**Final answer:** \(\text{SRS}\approx 1000\) g.  
*Reflection:* High-frequency asymptote of any SRS equals the peak of the input pulse.

**Example 3 — Numerical SRS point via Newmark integration**  
*Given:* measured pyrotechnic shock time history sampled at 100 kHz; \(\omega_n = 2000\) Hz, \(\zeta=0.05\).  
*Find:* one SRS ordinate.  
Apply the Newmark-β method with \(\beta=1/4\), \(\gamma=1/2\) to the SDOF equation; scan the resulting absolute-acceleration array and retain its maximum.  
**Why:** unconditional stability permits large time steps while preserving peak accuracy.  
**Final answer:** 2450 g (after convergence check at 200 kHz sampling).  
*Reflection:* Real shocks require digital filtering and sampling-rate verification before SRS computation.

**Example 4 — Tolerance band construction**  
*Given:* three measured SRS curves from identical separation events.  
*Find:* the qualification envelope.  
Take the maximum envelope, multiply by a factor of 1.5 (or +6 dB) below 2 kHz and 2.0 above 2 kHz per NASA practice, then round corners with one-third-octave smoothing.  
**Why:** statistical variability and test-fixture impedance demand margin.  
**Final answer:** the smoothed +6 dB curve becomes the test specification.  
*Reflection:* The margin policy is mission-specific and must be traceable to the governing requirements document.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using Fourier transform instead of SRS | Both are frequency-domain plots; Fourier assumes periodicity | Always integrate the SDOF oscillator equations       |
| Forgetting the stated Q value     | Different Q values shift the entire spectrum        | Explicitly label every SRS plot with its Q or ζ      |
| Plotting relative instead of absolute acceleration | Relative displacement is sometimes easier to compute | Convert to absolute acceleration before taking max   |
| Insufficient sampling rate        | Peaks between samples are missed                    | Sample at ≥10× highest frequency of interest         |
| Applying SRS to steady-state sine | SRS is defined only for transients                  | Use sine sweep or random vibration specifications instead |
| Ignoring multi-axis coupling      | Real shocks are triaxial                            | Generate independent SRS for each axis or use 3-D SRS |
| Over-smoothing the spectrum       | Narrow resonances disappear                         | Limit smoothing to ≤1/6 octave unless requirements dictate otherwise |

## 7. The textbook-precise statement
The shock response spectrum at natural frequency \(\omega\) and damping ratio \(\zeta\) for an acceleration time history \(a(t)\) is
\[
\text{SRS}(\omega,\zeta)=\max_{t\ge0}\left|\ddot{x}(t)+a(t)\right|
\]
where \(x(t)\) satisfies
\[
\ddot{x}+2\zeta\omega\dot{x}+\omega^2 x=-a(t),\qquad x(0)=\dot{x}(0)=0.
\]
When \(\zeta=0.05\) (Q=10) the spectrum is called the *standard SRS*. (See: Harris & Piersol, *Harris’ Shock and Vibration Handbook*, 6th ed., §21.4.)

## 8. Visual — diagram or schematic
```text
          Absolute acceleration
               ^
               |               SRS curve
          10000|               /\
               |              /  \   <-- peak at resonance
           1000|   __________/    \____________  (high-freq asymptote = input peak)
               |  /
            100| /
               +-----------------------------------> Natural frequency (Hz)
                10     100     1000     10000
```
Labelled elements: vertical axis = g (log), horizontal axis = Hz (log), curve rises with +6 dB/octave slope below resonance, peaks, then flattens to the maximum value of a(t).

## 9. The memory technique
1. **The hook** — Imagine the shock pulse as a thrown stone; each SDOF oscillator is a tuning fork of different pitch; the SRS records how loudly each fork rang.
2. **What to overlearn** — (i) SRS(ω) ≡ max |absolute acceleration| of SDOF at ω, ζ=0.05; (ii) high-frequency asymptote equals peak of a(t); (iii) Q=10 is the aerospace default.
3. **Spaced-repetition schedule** — Review definitions at 1 day, 3 days, 7 days, 16 days, 35 days after first study.
4. **First-principles fallback** — Re-derive the SDOF equation, integrate numerically for three frequencies, and plot the three maxima; the shape of the resulting curve is the SRS.

## 10. What this unlocks
Mastery of SRS lets you specify, measure, and mitigate pyrotechnic and impact environments for any spacecraft component. It is the direct prerequisite for pyroshock test tailoring (NASA-STD-7003), shock-isolation design, and fatigue-life prediction under repeated separation events. Subsequent topics include multi-degree-of-freedom shock synthesis, statistical energy analysis at high frequencies, and coupled loads analysis that folds SRS margins into system-level verification.

## 11. Self-check — five questions, no answers
1. A 0.5 ms, 2000 g half-sine pulse produces what SRS value at 100 Hz for ζ=0.05?  
2. Why does the SRS curve eventually become flat at high frequencies?  
3. If two shocks have identical SRS but different durations, which one is more likely to damage a 2 kHz component?  
4. An engineer computes the Fourier transform of a shock and calls the magnitude plot an SRS; what is the single most important conceptual error?  
5. A measured SRS at 3 kHz is 5000 g (Q=10). What absolute acceleration must a Q=50 resonator at the same frequency survive under the same shock?