## What it is
The equation $f(x) = A\sin(Bx + C) + D$ (or its cosine equivalent) is the generalized mathematical model for a wave. The four parameters—$A, B, C, D$—act as control knobs that independently stretch, squash, and slide the fundamental $y = \sin(x)$ graph to fit any periodic phenomenon. 

## Why it matters
Every periodic system in the universe is modeled using these transformations. In aerospace engineering, launch vehicle vibration analysis relies on breaking down complex oscillations into a sum of shifted, scaled sine waves (Fourier analysis). In electrical engineering, alternating current (AC) circuits use phase shifts ($C$) and amplitudes ($A$) to manage power grids. In machine learning, positional encodings in Transformer models (like the one generating this text) use sine and cosine functions of varying periods ($B$) to give the neural network a sense of sequence order.

## When to study it
You must already possess:
1. Fluency with the unit circle (radians, exact values for standard angles).
2. The ability to sketch the base graphs of $y = \sin(x)$ and $y = \cos(x)$ from memory, knowing their roots, peaks, and troughs.
3. A solid grasp of general function transformations (knowing why $f(x-2)$ shifts a graph *right*, not left, and why $3f(x)$ stretches it vertically). 
If you do not understand why inside modifications act inversely to outside modifications, review general function transformations first.

## How to study it (step by step)
1. **Master the baseline:** Draw $y = \sin(x)$ and $y = \cos(x)$. Mark the five key points of one cycle: start, first quarter (peak/trough), half (zero-crossing), third quarter (trough/peak), and end.
2. **Isolate the vertical ($A$ and $D$):** Graph $y = 2\sin(x) + 3$. Notice how the baseline moves to $y=3$, and the wave oscillates between $1$ and $5$. The vertical transformations are intuitive and happen exactly as written.
3. **Isolate the period ($B$):** Graph $y = \sin(2x)$. Realize that because $x$ is multiplied by 2, the function reaches $2\pi$ twice as fast. The period is halved.
4. **Isolate the phase shift ($C$):** Graph $y = \sin(x - \pi/4)$. Observe the horizontal slide. 
5. **Combine horizontally ($B$ and $C$):** This is the crux. Graph $y = \sin(2x - \pi/2)$. Factor the inside to $y = \sin(2(x - \pi/4))$. See that the true shift is $\pi/4$, not $\pi/2$. 
6. **Synthesize:** Take a full equation, extract the four parameters, map the new five key points, and sketch.

## Key ideas, with intuition
**1. Amplitude ($A$)**
Amplitude is the strict distance from the center baseline to a peak. It is always positive: $|A|$. If $A$ is negative, the wave is reflected across its baseline, but the amplitude remains $|A|$. 
*Intuition:* The volume of a sound wave.

**2. Vertical Shift ($D$)**
This is the new baseline of the wave. The entire graph shifts up or down by $D$. The maximum value is $D + |A|$ and the minimum is $D - |A|$.
*Intuition:* A DC offset in an electrical signal.

**3. Period (controlled by $B$)**
The standard sine wave takes $2\pi$ to complete a cycle. The parameter $B$ is the angular frequency multiplier. It tells you how many cycles fit into the standard $2\pi$ window. Therefore, the length of one cycle (the Period) is:
$$ \text{Period} = \frac{2\pi}{|B|} $$
*Intuition:* The pitch of a sound wave (higher $B$ = higher frequency = shorter period).

**4. Phase Shift (controlled by $B$ and $C$)**
This is the horizontal starting point of the wave. The most rigorous way to find it is to ask: *What value of $x$ makes the inside of the sine function zero?*
$$ Bx + C = 0 \implies x = -\frac{C}{B} $$
The phase shift is $-C/B$. 

## Worked example
**Analyze and sketch one cycle of $f(x) = -3\cos(2x + \pi) + 1$.**

1. **Identify parameters:** $A = -3$, $B = 2$, $C = \pi$, $D = 1$.
2. **Vertical bounds:** The baseline is $y = 1$. The amplitude is $|-3| = 3$. 
   * Maximum: $1 + 3 = 4$.
   * Minimum: $1 - 3 = -2$.
   * Because $A$ is negative, the cosine wave starts at its *minimum* instead of its maximum.
3. **Period:** $P = \frac{2\pi}{B} = \frac{2\pi}{2} = \pi$. One full cycle takes a horizontal distance of $\pi$.
4. **Phase Shift:** Set the argument to zero. $2x + \pi = 0 \implies x = -\frac{\pi}{2}$. The cycle begins at $x = -\frac{\pi}{2}$.
5. **Find the 5 key points:** 
   * Start: $x_0 = -\frac{\pi}{2}$
   * Step size (Period / 4): $\frac{\pi}{4}$
   * $x_1 = -\frac{\pi}{2} + \frac{\pi}{4} = -\frac{\pi}{4}$
   * $x_2 = 0$
   * $x_3 = \frac{\pi}{4}$
   * $x_4 = \frac{\pi}{2}$ (Notice $x_4 - x_0 = \pi$, which matches our period).
   * Corresponding $y$-values (Min, Baseline, Max, Baseline, Min): $-2, 1, 4, 1, -2$.

*Reflection:* Factoring the argument to $-3\cos(2(x + \pi/2)) + 1$ immediately reveals the leftward shift of $\pi/2$. Setting the argument to zero achieves the exact same result algebraically.

## Diagrams

```text
       y
       ^
 Max 4 |       *               *       <-- Peak (D + |A|)
       |     /   \           /   \
       |   /       \       /       \
Base 1 | -* - - - - *- - -* - - - - *- <-- Baseline (y = D)
       | /           \   /           \
       |/             \ /             \
-------+---------------*---------------+---> x
      /|               ^               ^
     / |               |               |
Min -2 *               |               |
       ^               |               |
       |               |               |
  Phase Shift      Period ends      Next cycle
  (Start of wave)  (Start + 2pi/B)
```

## Memory technique — remember this forever
1. **The Visual Hook:** Think **"Inside = Inverse & Horizontal, Outside = Obvious & Vertical"**. 
   * Outside parameters ($A, D$) affect the $y$-axis exactly as they look.
   * Inside parameters ($B, C$) affect the $x$-axis *inversely*. Multiplication by $B$ divides the period. Addition of $C$ subtracts from the starting point.
2. **Must Overlearn:**
   * $\text{Period} = \frac{2\pi}{|B|}$
   * $\text{Phase Shift} = -\frac{C}{B}$
3. **Spaced-repetition schedule:** Review this concept at 1 day, 3 days, 7 days, 16 days, and 35 days. On each review, write down a random equation (e.g., $y = 4\sin(3x-\pi)-2$) and graph it in under 2 minutes.
4. **First Principles Pathway:** If you forget the phase shift or period formulas, simply take the argument $(Bx + C)$ and set it to $0$ to find the start of the cycle, and set it to $2\pi$ to find the end of the cycle. 
   $$ Bx + C = 0 \implies x_{\text{start}} $$
   $$ Bx + C = 2\pi \implies x_{\text{end}} $$
   The difference $x_{\text{end}} - x_{\text{start}}$ is your period.

## Common mistakes
1. **The Phase Shift Trap:** Claiming the phase shift of $\sin(2x - \pi)$ is $\pi$ to the right. It is not. You must factor out the $B$ term: $2(x - \pi/2)$. The shift is $\pi/2$ to the right.
2. **Negative Amplitude:** Stating that amplitude is $-4$ for $y = -4\sin(x)$. Amplitude is a distance. It is $4$. The negative sign is a reflection.
3. **Confusing $B$ with the Period:** $B$ is the angular frequency, not the period. If $B=3$, the period is not 3; the period is $2\pi/3$.

## Self-check
1. Find the amplitude, period, phase shift, and baseline of $y = 5\cos(3x + \pi/2) - 2$.
2. Write the equation of a sine wave with an amplitude of 4, a period of $4\pi$, a phase shift to the right by $\pi/4$, and a baseline of $y=3$.
3. Using transformations and the unit circle, prove algebraically and graphically that $y = \sin(x + \pi/2)$ is identical to $y = \cos(x)$.