## What it is
Single-slit diffraction is the phenomenon where a wave, such as light, bends as it passes through a narrow opening. The intensity pattern is the specific distribution of light and dark bands (fringes) observed on a distant screen, characterized by a bright central maximum flanked by progressively dimmer and narrower secondary maxima. This lesson derives the mathematical function that describes this intensity.

## Why it matters
This principle is fundamental to the resolving power of any imaging system, from spy satellites and astronomical telescopes (like Hubble or JWST) to microscopes. The diffraction pattern from a circular aperture (an "Airy disk") sets the absolute physical limit on how close two objects can be and still be distinguished as separate. In signal processing, the mathematics used here (specifically the Fourier transform relationship between the slit and the pattern) is the foundation for analyzing and manipulating signals and images.

## When to study it
You should be comfortable with these prerequisites before proceeding:
1.  **Huygens' Principle:** The idea that every point on a wavefront acts as a source of secondary spherical wavelets.
2.  **Wave Superposition & Interference:** Adding waves, considering their phase, to find the resultant wave.
3.  **Phasors (or Complex Exponentials):** Representing wave amplitude and phase as a vector or a complex number ($Ae^{i\phi}$). This is crucial for summing the contributions from different parts of the slit.
4.  **Basic Calculus:** Integration of trigonometric or exponential functions.

If you are not solid on Huygens' principle and phasors, review them first. The derivation will be opaque otherwise.

## How to study it (step by step)
1.  **Visualize the Model:** Draw a single slit of width $a$. Use Huygens' principle to imagine it as a continuous line of an infinite number of point sources, all coherent (in phase).
2.  **Calculate Path Difference:** For an arbitrary angle $\theta$ relative to the normal, derive the path difference between a wavelet from the center of the slit and a wavelet from a position $y$ above the center.
3.  **Set up the Integral:** Express the contribution of the electric field $dE$ from an infinitesimal source element $dy$ at position $y$. This field will have an amplitude proportional to $dy$ and a phase term dependent on the path difference. Integrate $dE$ over the entire slit (from $y = -a/2$ to $y = a/2$) to find the total electric field $E$ at the screen.
4.  **Execute the Integration:** Solve the integral. The result will be a complex number whose magnitude is the resultant amplitude $A(\theta)$ of the wave at angle $\theta$.
5.  **Find the Intensity:** Recall that intensity $I$ is proportional to the amplitude squared ($I \propto A^2$). Square the magnitude of the result from step 4 to get the intensity function $I(\theta)$.
6.  **Analyze the Result:** The final function is a "sinc-squared" function. Find its zeros to locate the dark fringes (minima) and its approximate peaks for the bright fringes (maxima).

## Key ideas, with intuition
1.  **The Slit as a Continuous Emitter:** Don't think of the slit as one object. Think of it as an infinite number of tiny, coherent radio antennas lined up in a row. Each one emits a wavelet. What we see on the screen is the grand sum of all these wavelets interfering with each other.

2.  **Path Difference Creates Phase Difference:** The only reason a pattern forms is that for any angle $\theta \neq 0$, wavelets from different parts of the slit travel different distances to reach the same point on the screen. A path difference of $\Delta x$ creates a phase difference of $\phi = k \Delta x = \frac{2\pi}{\lambda} \Delta x$. This phase difference is the engine of interference.

3.  **Phasors Make Summation Visual:** Imagine each wavelet's contribution as a small vector (a phasor).
    *   At the center point on the screen ($\theta=0$), all path differences are zero. All phasors point in the same direction. They add up to a maximum possible length (maximum amplitude, maximum brightness).
    *   As you move to a small angle $\theta$, each successive phasor is slightly rotated relative to the last. They start to form a curve. The total amplitude is the vector from the tail of the first to the head of the last.
    *   At the first minimum, the phase difference between the top and bottom of the slit is exactly $2\pi$. The chain of phasors curls up into a perfect circle and the start point meets the end point. The resultant vector has zero length (zero amplitude, zero intensity).
    $$
    \text{Total Phase Difference } \beta = (\text{Phase from top}) - (\text{Phase from bottom}) = \frac{2\pi}{\lambda} (a \sin\theta)
    $$

4.  **Intensity is Amplitude Squared:** The electric field can be positive or negative, but brightness cannot. Intensity is proportional to the energy of the wave, which goes as the square of its amplitude. This is why the final intensity function is squared.
    $$
    I(\theta) \propto |E_{total}|^2
    $$

## Worked example
**Problem:** A laser with wavelength $\lambda = 632.8$ nm (a He-Ne laser) illuminates a single slit of width $a = 0.1$ mm. The diffraction pattern is observed on a screen far away. Find the angular position (in degrees) of the first two dark fringes (minima) on one side of the central maximum.

**Solution:**

1.  **Identify the governing principle:** The condition for destructive interference (dark fringes) in single-slit diffraction is given by the formula for minima.
2.  **State the formula:** The minima occur when the path difference between the top and bottom of the slit is an integer multiple of the wavelength.
    $$
    a \sin\theta = m\lambda, \quad \text{for } m = \pm 1, \pm 2, \pm 3, \dots
    $$
    Note: $m=0$ is excluded because it corresponds to the central maximum, not a minimum.
3.  **Solve for the first minimum ($m=1$):**
    *   Substitute the given values: $a = 0.1 \text{ mm} = 1 \times 10^{-4} \text{ m}$ and $\lambda = 632.8 \text{ nm} = 6.328 \times 10^{-7} \text{ m}$.
    *   Set $m=1$:
        $$
        (1 \times 10^{-4} \text{ m}) \sin\theta_1 = (1)(6.328 \times 10^{-7} \text{ m})
        $$
    *   Isolate $\sin\theta_1$:
        $$
        \sin\theta_1 = \frac{6.328 \times 10^{-7}}{1 \times 10^{-4}} = 6.328 \times 10^{-3} = 0.006328
        $$
    *   Calculate $\theta_1$. Since $\sin\theta_1$ is very small, $\sin\theta_1 \approx \theta_1$ in radians. However, for precision and to answer in degrees, we use the arcsin function:
        $$
        \theta_1 = \arcsin(0.006328) \approx 0.3626^\circ
        $$
4.  **Solve for the second minimum ($m=2$):**
    *   Set $m=2$:
        $$
        (1 \times 10^{-4} \text{ m}) \sin\theta_2 = (2)(6.328 \times 10^{-7} \text{ m})
        $$
    *   Isolate $\sin\theta_2$:
        $$
        \sin\theta_2 = \frac{2 \times 6.328 \times 10^{-7}}{1 \times 10^{-4}} = 1.2656 \times 10^{-2} = 0.012656
        $$
    *   Calculate $\theta_2$:
        $$
        \theta_2 = \arcsin(0.012656) \approx 0.7253^\circ
        $$

**Reflection:**
*   Step 1 correctly identified the physical regime.
*   Step 2 deployed the correct formula for minima. Crucially, it excluded $m=0$.
*   Steps 3 & 4 were methodical application of the formula, showing care with units (converting mm and nm to m) and solving for the required quantity, $\theta$. The results make physical sense: the angles are small, as expected for diffraction with visible light and a slit much wider than the wavelength.

## Diagrams
**Diagram 1: Single Slit Geometry**

```text
                 Slit of width 'a'
+------------------------------------------------------+
|          |                                           |
|       y=a/2|-------------------                     | Incoming
|          |         /|\         .                    | Plane
|          |          |          .                    | Wave
|          |          |y         .                    | (from left)
|       y=0|----------+----------.------------> To screen at angle theta
|          |          |          . \
|          |          *----------.  \ (Path difference = y*sin(theta))
|          |         \|/         .   \
|      y=-a/2|-------------------     \
|          |                           \
+------------------------------------------------------+
```

**Diagram 2: Phasor Summation**

```text
        At Central Max (theta=0)          At First Minimum (theta=theta_1)
        All phasors in phase.             Phasors curl into a closed circle.

        <---- A_total ---->               Resultant A_total = 0
        ------>------>------>             (Start point meets end point)
                                                 ***
                                              *       *
                                            *           *
                                           -->         <--
                                            *           *
                                              *       *
                                                 ***
```

## Memory technique — remember this forever
1.  **The Story:** Imagine the slit is a long doorway filled with a line of soldiers, all firing their guns simultaneously.
    *   **Central Max:** If you stand directly in front of the door, you hear all the gunshots at once. It's a loud, powerful boom. This is the central maximum, $I_0$.
    *   **First Minimum:** Now, step to the side. There's a specific angle where the sound from the soldier on the far end of the door arrives exactly one "sound-wave" cycle later than the sound from the soldier in the middle. This means the first half of the soldiers (from the middle to one edge) *perfectly cancels* the sound from the second half (from the middle to the other edge). You hear silence. This is the first minimum.

2.  **Formulas to Overlearn:**
    *   **Minima condition:** $a \sin\theta = m\lambda$ (for $m = \pm 1, \pm 2, \dots$). *The width times the angle's sine is an integer number of wavelengths.*
    *   **Intensity function:** $I(\theta) = I_0 \left[ \frac{\sin(\alpha)}{\alpha} \right]^2$ where $\alpha = \frac{\pi a}{\lambda} \sin\theta$. (Note: some texts use $\beta=2\alpha$). This is the "sinc-squared" function.

3.  **Spaced Repetition Schedule:**
    *   Review this derivation and these formulas in **1 day**.
    *   Then again in **3 days**.
    *   Then again in **7 days**.
    *   Then in **16 days**.
    *   Finally, in **35 days**.

4.  **First Principles Pathway:** If you forget everything, rebuild it:
    *   Start with Huygens: the slit is a line of sources.
    *   Pick a source at height $y$. Its path difference to a distant point relative to the center source is $y \sin\theta$.
    *   Its phase difference is $k \times (\text{path difference}) = \frac{2\pi}{\lambda} y \sin\theta$.
    *   The total field is the integral of all source contributions: $E \propto \int_{-a/2}^{a/2} e^{i \frac{2\pi}{\lambda} y \sin\theta} dy$.
    *   Do the integral. Find its magnitude. Square it. The formula will reappear.

## Common mistakes
1.  **Confusing with Double-Slit:** The single-slit minima formula $a \sin\theta = m\lambda$ looks dangerously like the double-slit *maxima* formula $d \sin\theta = m\lambda$. Remember: `a` is for slit *width*, `d` is for slit *separation*. In single-slit, this condition gives you darkness.
2.  **Forgetting $m \neq 0$ for Minima:** Plugging $m=0$ into the minima formula gives $\sin\theta = 0$, which is the location of the central *maximum*. The minima start at $m=1$.
3.  **Radians vs. Degrees:** The argument of the sinc function, $\alpha = \frac{\pi a}{\lambda} \sin\theta$, is in radians. If you calculate this value and then take the sine of it on a calculator set to degrees, your result will be incorrect.
4.  **Approximating Maxima:** The secondary maxima do *not* occur exactly halfway between the minima. They are shifted slightly closer to the central maximum. To find their true location, you must differentiate the intensity function and set it to zero.

## Self-check
1.  If you decrease the slit width $a$, what happens to the physical width of the central bright fringe on the screen? Explain why, using the formula for the first minimum.
2.  The intensity of the first secondary maximum (next to the central one) is approximately $I_0/22$. Using the intensity formula $I(\theta) = I_0 (\sin\alpha/\alpha)^2$, show where this value comes from. (Hint: This maximum occurs approximately when the phasor diagram curls into 1.5 circles, so the total phase shift $\beta = 3\pi$, or $\alpha = 3\pi/2$).
3.  Derive the intensity pattern using phasors graphically. By considering the arc length of the chain of phasors and the length of the chord connecting the start to the end, re-derive the $A \propto \sin(\alpha)/\alpha$ relationship without using calculus.