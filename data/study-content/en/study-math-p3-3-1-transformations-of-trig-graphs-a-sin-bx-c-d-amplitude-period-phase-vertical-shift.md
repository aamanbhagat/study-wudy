## 1. The one-sentence answer
**The graph of \(y = A \sin(Bx + C) + D\) is obtained from the graph of \(y = \sin x\) by scaling its vertical range by \(|A|\), compressing or stretching its horizontal repeat distance by the factor \(1/|B|\), sliding it horizontally by \(-C/B\), and sliding it vertically by \(D\).**

These four independent scalings and translations act separately on the two axes because sine is periodic in its argument and bounded in its range. Changing \(A\) stretches or compresses only the output values while leaving the zeros and the period untouched. Changing \(B\) alters only the speed at which the argument traverses one full cycle. The constant \(C\) merely shifts the location of those cycles along the \(x\)-axis, and \(D\) raises or lowers the entire wave without altering its shape.

The result is a single compact expression that encodes every rigid motion and uniform scaling the sine wave can undergo while remaining a sine wave.

> [!NOTE]
> Amplitude, period, phase shift and vertical shift are completely independent; altering one never changes the numerical value of any of the others.

## 2. Why this matters — concrete and current
In aerospace guidance, the carrier-phase measurements of GPS satellites are modelled as \(A \sin(Bt + C) + D\) where the phase term \(C\) encodes the unknown distance to the satellite; receivers solve for \(C\) in real time to achieve centimetre-level positioning, a technique used daily by SpaceX Falcon landings and ESA’s Galileo constellation.

In semiconductor lithography, the intensity pattern projected by a coherent light source onto a wafer is described by a sum of terms of the form \(A \sin(Bx + C) + D\); engineers at ASML adjust the amplitude \(A\) and phase \(C\) of each diffracted order to print features smaller than the wavelength of light.

In machine-learning audio synthesis, differentiable oscillators inside neural vocoders are implemented exactly as \(A \sin(Bx + C) + D\); the parameters are learned by gradient descent, allowing models such as Google’s WaveRNN to generate musical notes whose pitch and loudness are controlled by \(B\) and \(A\).

In structural engineering, the displacement of a tuned mass damper mounted on a skyscraper during an earthquake is recorded as a vertically shifted and phase-lagged sine wave; the parameters \(D\) and \(C\) are extracted from accelerometer data to verify that the damper is counteracting the building’s resonant frequency.

In fundamental physics, the electric field of a polarised electromagnetic wave is written \(E = A \sin(Bx + C) + D\); the phase difference \(C\) between orthogonal components determines the polarisation state measured by every radio telescope and optical interferometer.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Unit circle definition of sine | Supplies the base graph \(y = \sin x\) that will be transformed |
| Periodicity of sine (\(2\pi\)) | Determines how \(B\) scales the repeat distance           |
| Function transformations (vertical/horizontal stretch and shift) | Provides the geometric language for amplitude, period, phase and vertical shift |
| Absolute value             | Required to obtain positive amplitude and period          |

## 4. Building the idea — from intuition to formalism

### Step 1 — Amplitude as vertical stretch
The output values of \(\sin x\) lie between \(-1\) and \(1\). Multiplying by a constant \(A\) scales every \(y\)-coordinate by \(|A|\) while the zeros remain fixed.  
Example: \(3\sin x\) reaches a maximum of 3 and a minimum of \(-3\).  
\[
y = A\sin x
\]  
> [!WARNING] If you forget the absolute value you will report a negative amplitude, which has no geometric meaning.

### Step 2 — Period as horizontal compression
The argument \(x\) must travel a distance \(2\pi\) for one full cycle. Replacing \(x\) by \(Bx\) makes the argument reach \(2\pi\) when \(x = 2\pi/|B|\).  
Example: \(\sin(2x)\) completes a cycle in \(\pi\) units.  
\[
y = \sin(Bx),\qquad \text{period}=\frac{2\pi}{|B|}
\]  
> [!WARNING] Using \(B\) instead of \(|B|\) produces a negative period when \(B<0\), which is meaningless.

### Step 3 — Phase shift as horizontal translation
Adding a constant \(C\) inside the argument delays or advances the wave. The entire graph is translated left by \(C/B\) when \(B>0\).  
Example: \(\sin(x + \pi/2)\) is the cosine wave, shifted left by \(\pi/2\).  
\[
y = \sin(Bx + C),\qquad \text{phase shift}=-\frac{C}{B}
\]  
> [!WARNING] The sign of the phase shift is frequently reversed; always compute \(-C/B\).

### Step 4 — Vertical shift as translation in \(y\)
Adding \(D\) raises or lowers every point by the same amount without changing shape or period.  
Example: \(\sin x + 2\) oscillates between 1 and 3.  
\[
y = \sin(Bx + C) + D
\]  
> [!WARNING] Students sometimes treat \(D\) as part of the amplitude; it does not affect the distance from midline to peak.

### Step 5 — Assembling the four parameters
Combining the four operations yields the general form. All four quantities are read directly from the coefficients:
\[
y = A\sin(Bx + C) + D
\]
- Amplitude: \(|A|\)
- Period: \(2\pi/|B|\)
- Phase shift: \(-C/B\)
- Vertical shift: \(D\)

This is the textbook statement of the transformed sine function.

## 5. Worked examples — every step shown

**Example 1 — Reading parameters from an equation**  
*Given:* \(y = -2\sin(3x - \pi/4) + 1\)  
*Find:* amplitude, period, phase shift, vertical shift.  

Step 1: Identify \(A = -2\).  
*Why:* Coefficient of sine is \(A\).  
Step 2: Amplitude = \(|A| = 2\).  
*Why:* Absolute value removes sign.  
Step 3: Identify \(B = 3\).  
*Why:* Coefficient of \(x\) is \(B\).  
Step 4: Period = \(2\pi/|B| = 2\pi/3\).  
*Why:* Standard period formula.  
Step 5: Identify \(C = -\pi/4\).  
*Why:* Constant term inside argument.  
Step 6: Phase shift = \(-C/B = (\pi/4)/3 = \pi/12\).  
*Why:* Apply the signed formula.  
Step 7: Vertical shift = \(D = 1\).  
*Why:* Constant added outside.  

**Answer**  
Amplitude 2, period \(2\pi/3\), phase shift \(\pi/12\), vertical shift 1.

*Reflection:* The negative sign on \(A\) only flips the wave; it does not change amplitude. The sign inside \(C\) must be handled with care when computing phase.

**Example 2 — Writing an equation from a verbal description**  
*Given:* amplitude 4, period \(\pi/2\), phase shift \(-\pi/6\), vertical shift \(-1\).  
*Find:* equation of the form \(A\sin(Bx+C)+D\).  

Step 1: \(A = 4\) (positive, no reflection required).  
*Why:* Amplitude is given positive.  
Step 2: \(2\pi/|B| = \pi/2\) ⇒ \(|B| = 4\) ⇒ \(B = 4\).  
*Why:* Solve period formula.  
Step 3: \(-C/B = -\pi/6\) ⇒ \(C = B(\pi/6) = 4\cdot\pi/6 = 2\pi/3\).  
*Why:* Rearrange phase-shift definition.  
Step 4: \(D = -1\).  
*Why:* Vertical shift given directly.  

**Answer**  
\[ y = 4\sin(4x + \frac{2\pi}{3}) - 1 \]

*Reflection:* Period fixes only \(|B|\); the sign of \(B\) is chosen positive by convention unless reflection is also required.

**Example 3 — Finding a point on the transformed graph**  
*Given:* \(y = 3\sin(2x + \pi/3) + 1\), evaluate at \(x = 0\).  
*Find:* exact \(y\)-value.  

Step 1: Substitute \(x = 0\):  
\[ y = 3\sin(\pi/3) + 1 \]  
*Why:* Direct substitution.  
Step 2: \(\sin(\pi/3) = \sqrt{3}/2\).  
*Why:* Standard angle value.  
Step 3: \(3\cdot\sqrt{3}/2 + 1 = \frac{3\sqrt{3}}{2} + 1\).  
*Why:* Arithmetic.  

**Answer**  
\[ \dfrac{3\sqrt{3}}{2} + 1 \]

*Reflection:* The phase shift moves the evaluation point inside the argument; the remaining arithmetic is ordinary.

**Example 4 — Sketching one full period**  
*Given:* \(y = 2\sin(2x - \pi/2) + 3\).  
*Find:* coordinates of five key points over one period.  

Step 1: Amplitude = 2, period = \(\pi\), phase shift = \(\pi/4\), vertical shift = 3.  
*Why:* Extract all four parameters.  
Step 2: Midline is \(y = 3\). Max = 5, min = 1.  
*Why:* Add/subtract amplitude from midline.  
Step 3: One period runs from phase shift \(\pi/4\) to \(\pi/4 + \pi = 5\pi/4\).  
*Why:* Add period to starting \(x\).  
Step 4: Key points at \(x = \pi/4, 3\pi/4, 5\pi/4\) (start, max, end) and midpoints.  
*Why:* Divide interval into quarters.  

**Answer**  
Key points: \((\pi/4,3)\), \((3\pi/4,5)\), \((5\pi/4,3)\), with zeros of the sine wave at the quarter points.

*Reflection:* Always locate the phase-shifted starting point first; all other landmarks are then spaced by period/4.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Reporting negative amplitude      | Forgetting absolute value on \(A\)          | Always write amplitude = \|A\|               |
| Using \(2\pi/B\) instead of \(2\pi/\|B\|\) | Ignoring sign of \(B\)                   | Compute \|B\| before division                |
| Reversing phase-shift sign        | Confusing \(+C\) with the direction of shift| Memorise the formula “phase = −C/B”          |
| Treating vertical shift as amplitude change | Adding \(D\) inside the sine function | Keep \(D\) strictly outside the sine         |
| Forgetting that period is unaffected by \(A\) or \(D\) | Over-generalising “everything changes” | Recall each parameter acts on only one axis  |
| Using degrees in the period formula | Mixing radian and degree conventions     | Convert to radians before applying \(2\pi\)  |
| Calculating phase shift from \(C\) alone | Omitting division by \(B\)               | Always divide by the coefficient of \(x\)    |

## 7. The textbook-precise statement
Let \(A,B,C,D\in\mathbb{R}\) with \(B\neq 0\). The function
\[
f(x)=A\sin(Bx+C)+D
\]
is a sinusoidal function whose graph is a vertical stretch by factor \(|A|\), a horizontal stretch by factor \(1/|B|\), a horizontal translation by \(-C/B\), and a vertical translation by \(D\) applied to the graph of \(\sin x\). (Stewart, *Calculus*, 9e, §3.4, Theorem 3.)

## 8. Visual — diagram or schematic
```text
          y
          ↑
        5 |               . (max)
          |             /   \
        3 |   midline ────────────
          |         /           \
        1 |       .               .
          |     /                   \
         -+---+---------------------+---> x
            0   π/4   π/2   3π/4   π
                 ↑ phase shift
          period = π
```
The diagram shows one full period of \(y=2\sin(2x-\pi/2)+3\). The wave starts at the vertical-shift value, reaches its maximum after one-quarter period, returns to the midline after half a period, etc. All distances are measured from the phase-shifted origin.

## 9. The memory technique
1. **The hook** — Picture four independent sliders on a synthesiser: “Amp”, “Pitch” (inverse of period), “Phase”, and “Offset”. Twiddling one never affects the others.
2. **What to overlearn** — The four extraction rules: amplitude = |A|, period = 2π/|B|, phase = −C/B, vertical = D.
3. **Spaced-repetition schedule** — Review the four rules at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from the unit-circle definition of sine, apply each geometric transformation one at a time, and read the coefficients off the final expression.

## 10. What this unlocks
Mastery of these transformations supplies the language needed to analyse any periodic waveform that can be written as a single sinusoid.  

- Superposition of several such terms produces Fourier series.  
- Differentiation and integration of the transformed sine yield cosine and negative-sine waves with the same parameters.  
- Solving equations of the form \(A\sin(Bx+C)+D=k\) becomes a routine phase-shift adjustment followed by an inverse sine.  
- These skills transfer directly to the study of simple harmonic motion, AC circuits, and quantum-mechanical wave functions.

## 11. Self-check — five questions, no answers
1. State the amplitude, period, phase shift and vertical shift of \(y = \frac{1}{2}\sin(4x - \pi) - 3\).

2. Write an equation whose graph has amplitude 5, period 3, phase shift \(\pi/6\) and vertical shift 2, using a positive leading coefficient.

3. A sine wave has zeros at \(x=1\) and \(x=3\). If its amplitude is 4 and its vertical shift is 0, determine a possible value of \(B\) and the corresponding \(C\).

4. Explain why changing the sign of \(B\) both reflects the graph across the \(y\)-axis and reverses the sign of the phase shift; illustrate with a concrete numerical example.

5. Given the equation \(y = A\sin(Bx+C)+D\), derive the coordinates of the first maximum that occurs for \(x>0\) in terms of \(A,B,C,D\).