## What it is
These three quantities describe the "speed" of any repeating motion, like a wave or a pendulum swing. Frequency ($f$) is the number of cycles per second. Period ($T$) is the time it takes to complete one cycle. Angular frequency ($\omega$) is the rate of change of the phase angle, measured in radians per second.

## Why it matters
This is the fundamental language for describing anything that oscillates or propagates as a wave. In rocket science, you will use it to analyze structural vibrations that can tear a vehicle apart (pogo oscillations). In computer science, it is the basis of signal processing, from audio synthesis to compressing images with Fourier transforms.

## When to study it
You should have a solid grasp of the unit circle, the definition of a radian, and basic algebraic manipulation. Specifically, you must understand that one full circle corresponds to $2\pi$ radians. If you are not comfortable with this, review trigonometry before proceeding.

## How to study it (step by step)
1.  **Define Period and Frequency from units.** Take a piece of paper. Write down the definition of Period: $T = \frac{\text{seconds}}{\text{cycle}}$. Now write the definition of Frequency: $f = \frac{\text{cycles}}{\text{second}}$. Stare at them. See that one is the exact reciprocal of the other. Derive $T = 1/f$ and $f = 1/T$ purely from these unit definitions.
2.  **Connect to the Unit Circle.** Draw a circle. A point moving around the circle is the canonical model for simple harmonic motion. Define one "cycle" as one full trip around the circle.
3.  **Introduce Radians.** Recall that one full trip around the circle is $360^{\circ}$, which is defined as $2\pi$ radians. This is the key conversion factor. A "cycle" is geometrically equivalent to an angular distance of $2\pi$ radians.
4.  **Derive Angular Frequency.** We want a measure of speed in radians per second. We know frequency $f$ is in cycles per second. Using our conversion factor from step 3:
    $$ \omega \left[ \frac{\text{rad}}{\text{s}} \right] = f \left[ \frac{\text{cycle}}{\text{s}} \right] \times 2\pi \left[ \frac{\text{rad}}{\text{cycle}} \right] $$
    This gives the fundamental relationship: $\omega = 2\pi f$.
5.  **Combine the relationships.** Start with $\omega = 2\pi f$. Substitute $f = 1/T$ into this equation. This immediately gives you the third relationship: $\omega = 2\pi / T$. You now have the complete set.
6.  **Solve practice problems.** Find 5 simple problems that give you one variable and ask for the other two. Do not move on until you can solve them instantly and correctly, paying close attention to units.

## Key ideas, with intuition
1.  **Frequency and Period are Inverses.** This is the most basic idea. If something happens very frequently (high $f$), the time for each event must be very short (low $T$). If an event takes a long time to happen (high $T$), it must happen infrequently (low $f$). Their relationship, $T = 1/f$, is a direct mathematical statement of this common-sense inverse relationship.

2.  **The $2\pi$ is just a conversion factor.** Do not be intimidated by $\omega$. It is almost the same thing as $f$. The only difference is the "units" we use to measure a cycle. Frequency $f$ counts full, discrete cycles. Angular frequency $\omega$ measures the smooth angular distance traveled in radians. Since every single cycle contains $2\pi$ radians of angular travel, $\omega$ will always be $2\pi$ times larger than $f$.
    $$ \omega = (2\pi) \cdot f $$

3.  **Omega ($\omega$) is the natural language for physics equations.** The equation for an oscillator is often written as $x(t) = A \cos(\omega t + \phi)$. The argument of a trigonometric function like cosine *must* be an angle (in radians). Since $\omega$ has units of rad/s and $t$ has units of seconds, their product $\omega t$ correctly yields radians. Using $f$ directly would require writing $x(t) = A \cos(2\pi f t + \phi)$ every time, which is cumbersome. Thus, we use $\omega$ for elegance and correctness.

## Worked example
**Problem:** A satellite's antenna vibrates in the vacuum of space. It completes 30 full oscillations in one minute. Calculate its period ($T$), frequency ($f$), and angular frequency ($\omega$).

**Solution:**

1.  **Identify knowns and convert units.**
    -   Number of cycles: $N = 30$
    -   Total time: $\Delta t = 1 \text{ minute} = 60 \text{ seconds}$

2.  **Calculate frequency ($f$).** Frequency is defined as cycles per second.
    $$ f = \frac{N}{\Delta t} = \frac{30 \text{ cycles}}{60 \text{ s}} = 0.5 \frac{\text{cycles}}{\text{s}} = 0.5 \text{ Hz} $$
    *Reflection: This step directly applies the definition of frequency.*

3.  **Calculate period ($T$).** Period is the inverse of frequency.
    $$ T = \frac{1}{f} = \frac{1}{0.5 \text{ Hz}} = 2 \text{ s} $$
    Alternatively, we could use the definition: time per cycle.
    $$ T = \frac{\Delta t}{N} = \frac{60 \text{ s}}{30 \text{ cycles}} = 2 \frac{\text{s}}{\text{cycle}} $$
    *Reflection: This confirms the inverse relationship and shows that deriving from the definition works equally well.*

4.  **Calculate angular frequency ($\omega$).** This is the frequency, scaled by the number of radians in a cycle.
    $$ \omega = 2\pi f = 2\pi (0.5 \text{ Hz}) = \pi \frac{\text{rad}}{\text{s}} $$
    The result is approximately $3.14159$ radians per second.
    *Reflection: This final step converts our cycle-based measurement into the radian-based measurement required for physics equations.*

## Diagrams
A sine wave showing the Period ($T$) and Amplitude ($A$). The period is the horizontal distance between two consecutive peaks.

```text
      ^ y (Displacement)
      |
      |     .---.
  A   |    /     \
      |   /       \
 -----|--/---------\-----> t (Time)
      | /           \
 -A   |/             \
      '---------------'
      |<---- T ---->|
```

The unit circle, showing that one full cycle is a rotation of $2\pi$ radians.

```text
        ^ y
        |
        |     /
     1  +----'----. (cos(θ), sin(θ))
        |  ,' \   /
        |,'    \ /
  <-----+------+-----> x
      ,'|`.    /
     /  |  `._/
   -1   |     θ
        +
       -1
```
A point starting at (1,0) and moving counter-clockwise travels an angular distance of $\theta$. One full cycle returns the point to (1,0), which is a journey of $\theta = 2\pi$ radians.

## Memory technique — remember this forever
1.  **The Story: The "Radian Racetrack".**
    -   Imagine a circular racetrack that is exactly $2\pi$ meters long.
    -   **Frequency ($f$)** is how many **laps** you complete per second. (Unit: laps/sec or Hz).
    -   **Period ($T$)** is how much **time** it takes you to complete one lap. (Unit: sec/lap).
    -   **Angular Frequency ($\omega$)** is your **speed** in meters per second along the track. (Unit: m/sec or rad/sec).
    -   If you run $f$ laps/sec, and each lap is $2\pi$ meters, your speed is clearly $\omega = 2\pi f$.

2.  **Formulas to Overlearn (Do Not Paraphrase):**
    $$ T = \frac{1}{f} $$
    $$ \omega = 2\pi f $$

3.  **Spaced Repetition Schedule:**
    -   Review this material and re-derive the formulas in 1 day.
    -   Then again in 3 days.
    -   Then again in 7 days.
    -   Then in 16 days.
    -   Finally, in 35 days.

4.  **First Principles Pathway:** If you forget everything, rebuild from definitions:
    -   $f \equiv \frac{\text{cycles}}{\text{time}}$
    -   $T \equiv \frac{\text{time}}{\text{cycle}}$
    -   $1 \text{ cycle} \equiv 2\pi \text{ radians}$
    -   From these three lines, you can derive all the relationships through simple substitution and unit analysis.

## Common mistakes
1.  **Confusing $f$ and $\omega$.** This is the most common error. Students will use a frequency in Hz directly in an equation like $\cos(\omega t)$. Always remember: if it's going inside a trig function, it almost certainly needs to be $\omega$ in rad/s. The factor of $2\pi$ is not optional.
2.  **Units Mismatch.** Forgetting to convert minutes to seconds, or kHz to Hz, before applying the formulas. Always convert to base SI units (seconds, Hertz) before you begin calculations.
3.  **Calculator in Degrees Mode.** When you evaluate a function like $\sin(\omega t)$, your calculator must be in radian mode. The entire framework of these physics equations is built on radians, not degrees.

## Self-check
1.  The period of a certain radio wave is $5$ nanoseconds ($5 \times 10^{-9}$ s). What are its frequency and angular frequency?
2.  The equation of motion for a mass on a spring is given by $x(t) = 0.1 \cos(50\pi t)$. What are the period and frequency of the oscillation?
3.  System A oscillates with a period $T$. System B has an angular frequency that is four times larger than System A's. What is the period of System B in terms of $T$?