## What it is
The Michelson-Morley experiment was a high-precision optical experiment designed to detect the existence of the "luminiferous aether"—a hypothetical medium thought to permeate all of space and carry light waves. It compared the speed of light in two perpendicular directions to detect a relative motion, or "aether wind," as the Earth moved through this medium. The experiment famously produced a null result, finding no difference in the speed of light, which was a critical failure that helped dismantle the aether theory.

## Why it matters
This experiment's null result is a foundational pillar of special relativity, directly supporting Einstein's second postulate: the speed of light in a vacuum is the same for all observers in inertial reference frames. This principle is not academic; it is essential for the operation of GPS satellites, which must apply relativistic corrections to maintain timing accuracy. Furthermore, the interferometry technique pioneered by Michelson is now used in cutting-edge instruments like LIGO to detect gravitational waves, demonstrating the experiment's lasting technological legacy.

## When to study it
Before tackling this, you must have a firm grasp of:
1.  **Classical Mechanics:** Specifically, the principle of Galilean relativity and the vector addition of velocities (e.g., a boat crossing a river).
2.  **Wave Optics:** You must understand the concepts of wave interference (constructive and destructive), path difference, phase shift, and how an interferometer creates an interference pattern (fringes).
3.  **Basic Algebra:** Including the binomial approximation, which is crucial for simplifying the final result.

If you are not confident with these, review them first. Proceeding without them will lead to confusion.

## How to study it (step by step)
1.  **Diagram the Apparatus:** Draw a Michelson interferometer. Label the light source, beam splitter, two perpendicular mirrors (M1, M2), and the detector/telescope. Trace the path of a single wave front as it is split, travels down each arm, reflects, and recombines.
2.  **Derive the "Parallel" Travel Time:** Assume an aether wind exists with speed $v$ parallel to one arm of length $L$. Calculate the round-trip time for the light beam in this arm. The speed is $c-v$ going out (against the wind) and $c+v$ coming back (with the wind).
3.  **Derive the "Perpendicular" Travel Time:** Calculate the round-trip time for the light beam in the arm of length $L$ that is perpendicular to the aether wind. Use the Pythagorean theorem to find the effective speed across the "current."
4.  **Find the Time Difference:** Subtract the perpendicular time from the parallel time to find the expected time difference, $\Delta t$, caused by the aether wind. Use the binomial approximation for $(1-x^2)^{-1}$ and $(1-x^2)^{-1/2}$ since $v \ll c$.
5.  **Calculate the Fringe Shift:** Convert the time difference $\Delta t$ into a path difference $\Delta d = c \Delta t$. The number of fringes this shifts the interference pattern by is $\Delta N = \Delta d / \lambda$.
6.  **Rotate and Re-evaluate:** Now, consider rotating the entire apparatus by 90°. The roles of the parallel and perpendicular arms are swapped. Calculate the *new* time difference and the total expected fringe shift from the original orientation to the new one. This doubles the effect.
7.  **Confront the Null Result:** Understand that Michelson and Morley observed $\Delta N \approx 0$, not the value you calculated. Conclude that the premise—the existence of a detectable aether wind—must be wrong.

## Key ideas, with intuition
1.  **The River Analogy:** Imagine two swimmers racing. They both start at the same point in a river, swim a distance $L$ and back. Swimmer 1 swims across the current to a point on the opposite bank and back. Swimmer 2 swims distance $L$ downstream and then back upstream. The river current is the "aether wind." Intuitively and mathematically, Swimmer 2 (downstream/upstream) always takes longer. The experiment was designed to measure this exact time difference for light.
2.  **Perpendicular Path is Longer:** To travel straight across the river, the swimmer must angle themselves upstream. The path they trace through the water is a hypotenuse, longer than the width of the river. The same applies to light. To travel a distance $L$ perpendicular to the aether wind, the light must travel on a diagonal path of length greater than $L$ relative to the aether. Its resultant speed across the apparatus is thus slower than $c$, specifically $\sqrt{c^2 - v^2}$.
3.  **The Null Result is the Key Result:** The most profound idea is that the experiment *failed* to find what it was looking for, and this failure was its success. The expected time difference between the two paths was never observed. This lack of a result implies that there is no "river" or aether. The speed of light is not affected by the motion of the source or observer, a revolutionary concept.

Let's formalize the travel times. Let the apparatus move with velocity $v$ through the aether.
-   **Parallel arm time:**
    $$t_{\parallel} = \frac{L}{c-v} + \frac{L}{c+v} = \frac{L(c+v) + L(c-v)}{c^2 - v^2} = \frac{2Lc}{c^2 - v^2} = \frac{2L}{c(1-v^2/c^2)}$$
-   **Perpendicular arm time:** The resultant speed across the arm is $\sqrt{c^2 - v^2}$.
    $$t_{\perp} = \frac{2L}{\sqrt{c^2 - v^2}} = \frac{2L}{c\sqrt{1-v^2/c^2}}$$
Since $v < c$, it is clear that $t_{\parallel} > t_{\perp}$. The experiment was designed to detect this difference.

## Worked example
An interferometer with arm length $L=11$ m is used to look for an aether wind. Assume the Earth's orbital speed is its speed through the aether, $v \approx 3.0 \times 10^4$ m/s. The light used has a wavelength of $\lambda = 550$ nm. Calculate the expected fringe shift when the apparatus is rotated by 90°.

**Step 1: Calculate the time difference $\Delta t$.**
We have $t_{\parallel} = \frac{2L}{c(1-v^2/c^2)}$ and $t_{\perp} = \frac{2L}{c}(1-v^2/c^2)^{-1/2}$.
Let $\beta = v/c$. We use the binomial approximations for $\beta \ll 1$:
$(1-\beta^2)^{-1} \approx 1 + \beta^2$
$(1-\beta^2)^{-1/2} \approx 1 + \frac{1}{2}\beta^2$
So,
$t_{\parallel} \approx \frac{2L}{c}(1 + v^2/c^2)$
$t_{\perp} \approx \frac{2L}{c}(1 + \frac{1}{2}v^2/c^2)$
The time difference is:
$\Delta t = t_{\parallel} - t_{\perp} \approx \frac{2L}{c}(1 + v^2/c^2) - \frac{2L}{c}(1 + \frac{1}{2}v^2/c^2) = \frac{2L}{c} \left(\frac{1}{2}\frac{v^2}{c^2}\right) = \frac{L v^2}{c^3}$

**Step 2: Calculate the fringe shift for one orientation.**
The path difference is $\Delta d = c \Delta t = L v^2/c^2$.
The fringe shift is $N = \frac{\Delta d}{\lambda} = \frac{L v^2}{\lambda c^2}$.

**Step 3: Calculate the total shift after a 90° rotation.**
When rotated, the roles of the arms swap. The original parallel arm becomes perpendicular, and vice-versa. This introduces a shift of the same magnitude but in the opposite direction. The total observable shift is twice the value from Step 2.
$\Delta N_{total} = 2N = \frac{2L v^2}{\lambda c^2}$

**Step 4: Plug in the values.**
$L = 11$ m
$v = 3.0 \times 10^4$ m/s
$\lambda = 550 \times 10^{-9}$ m
$c = 3.0 \times 10^8$ m/s
$\Delta N_{total} = \frac{2(11 \text{ m})(3.0 \times 10^4 \text{ m/s})^2}{(550 \times 10^{-9} \text{ m})(3.0 \times 10^8 \text{ m/s})^2}$
$\Delta N_{total} = \frac{2(11)(9.0 \times 10^8)}{(550 \times 10^{-9})(9.0 \times 10^{16})} = \frac{22 \times 9.0 \times 10^8}{550 \times 9.0 \times 10^7} = \frac{220}{550} = 0.4$

**Reflection:**
The calculation predicts a fringe shift of 0.4. The actual experiment was sensitive enough to detect shifts as small as 0.01 fringes. The fact that they observed no shift was a definitive null result, contradicting the aether model and paving the way for relativity. Each step was necessary: deriving the time difference from first principles (Step 1), converting it to a measurable fringe shift (Step 2), accounting for the experimental procedure of rotation (Step 3), and finally quantifying the expected result (Step 4).

## Diagrams
A schematic of the Michelson Interferometer:

```text
          M1 (Mirror 1)
             ^
             |
             | Arm 1 (Length L)
             |
             v
Light ----> BS =========> M2 (Mirror 2)
Source      ^  Arm 2 (Length L)
            |
            |
            v
          Detector
          (Telescope)

BS = Beam Splitter
-->  Path of light
==>  Path of light
```
Vector diagram for the perpendicular arm, assuming an aether wind to the right with speed $v$:

```text
      ^ c (velocity of light relative to aether)
     /|
    / |
   /  | sqrt(c^2 - v^2) (resultant velocity)
  /   |
 /    |
*-----> v (velocity of apparatus)
```

## Memory technique — remember this forever
1.  **The Story:** "Michelson and Morley's Aether Race." Imagine two light beams as runners. One runs a straight path *with and against* a strong wind (the aether wind). The other runs a path *across* the wind. The runner fighting the headwind/tailwind should lose the race. But in the experiment, it was a perfect tie. The shocking conclusion: **there is no wind.**
2.  **Must Overlearn:**
    -   Time difference approximation: $\Delta t \approx \frac{L v^2}{c^3}$
    -   Fringe shift on 90° rotation: $\Delta N = \frac{2L v^2}{\lambda c^2}$
3.  **Spaced Repetition:** Review the derivation and these formulas now. Then again in **1 day, 3 days, 7 days, 16 days, and 35 days**. Do not just read them; re-derive them from the swimmer analogy each time.
4.  **First Principles Pathway:** If you forget everything, rebuild it from the swimmer analogy.
    -   Parallel path: Time = (Distance / (Speed - Wind)) + (Distance / (Speed + Wind)). So $t_{\parallel} = \frac{L}{c-v} + \frac{L}{c+v}$.
    -   Perpendicular path: Use Pythagoras. The speed across is $\sqrt{c^2 - v^2}$. Round trip time is $t_{\perp} = \frac{2L}{\sqrt{c^2-v^2}}$.
    -   The rest is algebra: find $\Delta t = t_{\parallel} - t_{\perp}$ and use the binomial approximation.

## Common mistakes
1.  **Forgetting the Round Trip:** Students often calculate $L/(c-v)$ and forget to add the return trip time $L/(c+v)$. Both arms are round trips.
2.  **Incorrect Perpendicular Speed:** A very common error is to assume the speed in the perpendicular arm is just $c$. You must use vector addition to show the resultant speed across the apparatus is $\sqrt{c^2 - v^2}$ due to the "drift" from the aether wind.
3.  **Botching the Binomial Approximation:** Using the wrong exponent or sign in the approximation. Remember $(1-x)^n \approx 1-nx$ for small $x$. For our cases, $(1-\beta^2)^{-1} \approx 1+\beta^2$ and $(1-\beta^2)^{-1/2} \approx 1+\frac{1}{2}\beta^2$.
4.  **Misinterpreting the Null Result:** Saying "the experiment failed." It did not fail; it successfully showed that the aether wind does not exist. It is one of the most important "failed" experiments in history.

## Self-check
1.  Without using any equations, explain why the light beam traveling parallel to the hypothetical aether wind was expected to take longer for its round trip than the beam traveling perpendicular to it.
2.  Suppose a future, highly advanced civilization builds a Michelson interferometer in deep space with arms $L = 1$ km and moves it through a newly discovered particle field (a hypothetical "neo-aether") at $v=0.1c$. Using light of wavelength $\lambda = 1000$ nm, what is the exact (no approximation) time difference $\Delta t$ they would expect?
3.  Derive the expression for the fringe shift $\Delta N = \frac{2L v^2}{\lambda c^2}$ from first principles, showing all algebraic steps and explicitly stating where and why the binomial approximation is used. Then, explain what physical parameter you would change (and how) to make the experiment *more sensitive* (i.e., to produce a larger expected fringe shift).