## What it is
A blackbody is an idealized object that absorbs all incident electromagnetic radiation. The Planck distribution is a function derived from statistical mechanics that describes the spectral radiance—the intensity of radiation at each frequency—emitted by a blackbody in thermal equilibrium at a given temperature. It successfully resolved the "ultraviolet catastrophe" of classical physics and was a foundational result of quantum theory.

## Why it matters
The Planck distribution is essential for astrophysics to determine the temperature of stars and galaxies from their emitted light spectrum. In aerospace, it's critical for thermal management, calculating heat loads on spacecraft, and designing infrared sensors and stealth technology. The cosmic microwave background radiation, the afterglow of the Big Bang, is the most perfect blackbody spectrum ever observed, providing a cornerstone of modern cosmology.

## When to study it
Before tackling this, you must have a solid grasp of the following prerequisites. If any are weak, review them first.
1.  **Statistical Mechanics:** The canonical ensemble, partition function ($Z = \sum_i e^{-\beta E_i}$), and the Boltzmann factor ($e^{-\beta E}$ where $\beta = 1/k_B T$). You must understand how to calculate average energy from the partition function: $\langle E \rangle = -\frac{\partial \ln Z}{\partial \beta}$.
2.  **Electromagnetism:** The concept of electromagnetic waves as modes of oscillation in a three-dimensional cavity.
3.  **Quantum Mechanics (Introductory):** Planck's energy quantization hypothesis ($E = h\nu$) and the concept of photons as discrete energy packets.
4.  **Calculus:** Multivariable integration, specifically changing variables to spherical coordinates, and summing an infinite geometric series.

## How to study it (step by step)
1.  **Model the System:** Picture a hollow cube with perfectly reflecting inner walls, held at a temperature $T$. The electromagnetic field inside can be described as a superposition of standing waves, or "modes." The radiation inside this cavity is in thermal equilibrium with the walls.
2.  **Count the Modes (Density of States):** First, calculate the number of allowed standing wave modes within a certain frequency range. This is a geometric problem of counting points on a lattice in "k-space." The result is the density of states, $g(\nu)$, which tells you how many "slots" for energy exist per unit frequency per unit volume.
3.  **Apply Quantum Mechanics:** Here is the crucial step that classical physics missed. Assume that the energy of each mode is quantized. A mode of frequency $\nu$ cannot have any arbitrary energy; it can only have energy in discrete multiples of $h\nu$. That is, $E_n = n h\nu$ for $n=0, 1, 2, ...$. Think of this as each mode being a quantum harmonic oscillator.
4.  **Use Statistical Mechanics:** For a single mode of frequency $\nu$, calculate its average energy, $\langle E_\nu \rangle$, at temperature $T$. Do this by finding its partition function $Z_\nu$ and using the formula $\langle E_\nu \rangle = -\frac{\partial \ln Z_\nu}{\partial \beta}$.
5.  **Combine Results:** The total energy density per unit frequency, $u(\nu, T)$, is the product of the number of modes at that frequency (density of states) and the average energy per mode. That is: $u(\nu, T) = g(\nu) \langle E_\nu \rangle$. This final expression is the Planck distribution.

## Key ideas, with intuition
1.  **The Ultraviolet Catastrophe:** Classically, each mode was predicted to have an average energy of $k_B T$ (by the equipartition theorem). Since the number of modes increases as $\nu^2$, this implied that the total energy emitted would be infinite, with most of it at infinitely high frequencies (in the ultraviolet and beyond). This was a catastrophic failure of 19th-century physics.
2.  **Quantization "Freezes Out" High-Frequency Modes:** Planck's hypothesis, $E=nh\nu$, solves the catastrophe. For a high-frequency mode, the minimum energy packet $h\nu$ is very large. At a given temperature $T$, the thermal energy available is roughly $k_B T$. If $h\nu \gg k_B T$, it is extremely unlikely for the system to have enough energy to excite this mode even once. The probability is suppressed by the Boltzmann factor $e^{-h\nu/k_B T}$. High-frequency modes are effectively "frozen out" and don't contribute to the total energy.
3.  **Counting Modes in k-space:** The allowed wavevectors $\vec{k}$ for standing waves in a box of side $L$ are quantized: $\vec{k} = (\frac{n_x \pi}{L}, \frac{n_y \pi}{L}, \frac{n_z \pi}{L})$. The number of modes with wavevector magnitude up to $k$ is found by counting the integer points $(n_x, n_y, n_z)$ inside one octant of a sphere of radius $k$ in this "k-space." This geometric argument leads directly to the density of states.
4.  **Average Energy per Mode:** The heart of the statistical mechanics calculation is finding the average energy of one oscillator.
    $$ Z = \sum_{n=0}^{\infty} e^{-\beta E_n} = \sum_{n=0}^{\infty} e^{-n \beta h \nu} = \sum_{n=0}^{\infty} (e^{-\beta h \nu})^n $$
    This is a geometric series which sums to $Z = \frac{1}{1 - e^{-\beta h \nu}}$. The average energy is then:
    $$ \langle E_\nu \rangle = -\frac{\partial}{\partial \beta} \ln(Z) = \frac{h\nu}{e^{\beta h \nu} - 1} = \frac{h\nu}{e^{h\nu/k_B T} - 1} $$
    This is the famous Bose-Einstein distribution for a single mode. It correctly goes to $k_B T$ for low frequencies and to zero for high frequencies.

## Worked example
**Problem:** Derive the Rayleigh-Jeans Law, the classical approximation for blackbody radiation, by taking the low-frequency limit of the Planck distribution.

**Solution:**
1.  **Start with the Planck Distribution:** The spectral energy density is given by:
    $$ u(\nu, T) = \frac{8\pi h \nu^3}{c^3} \frac{1}{e^{h\nu/k_B T} - 1} $$
    The first term, $\frac{8\pi \nu^2}{c^3}$, is the density of states per unit volume, $g(\nu)$. The second term is the average energy per mode, $\langle E_\nu \rangle$.

2.  **Identify the Limit:** The "low-frequency limit" means we consider frequencies $\nu$ such that the quantum of energy $h\nu$ is much smaller than the characteristic thermal energy $k_B T$.
    $$ h\nu \ll k_B T \quad \implies \quad \frac{h\nu}{k_B T} \ll 1 $$

3.  **Apply Taylor Expansion:** Let $x = \frac{h\nu}{k_B T}$. Since $x \ll 1$, we can use the Taylor series expansion for the exponential function, $e^x \approx 1 + x + \frac{x^2}{2!} + \dots$. We only need the first two terms for a good approximation.
    $$ e^{h\nu/k_B T} \approx 1 + \frac{h\nu}{k_B T} $$

4.  **Substitute the Approximation:** Substitute this back into the denominator of the Planck distribution:
    $$ e^{h\nu/k_B T} - 1 \approx \left(1 + \frac{h\nu}{k_B T}\right) - 1 = \frac{h\nu}{k_B T} $$

5.  **Simplify the Expression:** Now, replace the denominator in the full Planck distribution with this approximation.
    $$ u(\nu, T) \approx \frac{8\pi h \nu^3}{c^3} \frac{1}{\frac{h\nu}{k_B T}} $$
    $$ u(\nu, T) \approx \frac{8\pi h \nu^3}{c^3} \frac{k_B T}{h\nu} $$
    The factors of $h$ and one factor of $\nu$ cancel out.
    $$ u_{RJ}(\nu, T) = \frac{8\pi \nu^2 k_B T}{c^3} $$

**Reflection:** This result is the Rayleigh-Jeans Law. Each step was a direct application of a mathematical tool to a physical assumption. Step 1 stated the known result. Step 2 defined the physical regime. Step 3 used a standard mathematical tool (Taylor series) appropriate for that regime. Step 4-5 were algebraic simplification. Notice the final form is (density of states) $\times$ (classical average energy $k_B T$), which makes perfect physical sense.

## Diagrams
Here is a plot of the Planck distribution for three different temperatures, $T_1 < T_2 < T_3$.

```text
Spectral Radiance u(ν,T)
  ^
  |
  |                                 ****** T3
  |                              ***
  |                            **
  |                          **
  |                        **
  |                     ***
  |          ****** T2 ***
  |       ***      **
  |     **       **
  |   **       **
  |  *        *
  | *       **
  |*   ** T1
 -*--*----*--------------------------------> Frequency (ν)
  |  |    |
  ν_peak1 |
       ν_peak2
            ν_peak3
```
**Key features illustrated:**
1.  For any given temperature, the intensity is zero at $\nu=0$ and approaches zero as $\nu \to \infty$.
2.  As temperature $T$ increases, the total energy emitted (area under the curve) increases sharply.
3.  As temperature $T$ increases, the peak of the distribution shifts to higher frequencies (Wien's Displacement Law).

## Memory technique — remember this forever
1.  **The Mnemonic Story:** Imagine a nightclub called "Club Planck". The cover charge to get in is $h\nu$.
    -   **Low-frequency (infrared) wing:** The cover charge is cheap. Lots of low-energy photons can get in and party. This is the rising part of the curve.
    -   **High-frequency (ultraviolet) wing:** The cover charge is ridiculously expensive ($h\nu \gg k_B T$). Very few photons have enough thermal energy to pay the cover and get in. This is the exponential decay part of the curve, preventing the "ultraviolet catastrophe" of an infinitely crowded club.
    -   The bouncer is the Boltzmann factor, $e^{-h\nu/k_B T}$, who ruthlessly turns away under-funded photons.

2.  **Formulas to Overlearn:**
    $$ u(\nu, T) = \underbrace{\frac{8\pi \nu^2}{c^3}}_{\text{Density of States}} \times \underbrace{\frac{h\nu}{e^{h\nu/k_B T} - 1}}_{\text{Avg. Energy per State}} $$
    Memorize it as the product of these two physically meaningful parts. The first part is classical wave counting. The second part is the quantum/statistical mechanics magic.

3.  **Spaced Repetition Schedule:** Re-derive the full result from first principles on this schedule:
    -   In 24 hours.
    -   In 3 days.
    -   In 7 days.
    -   In 16 days.
    -   In 35 days.

4.  **First Principles Pathway:** If you forget the formula, rebuild it.
    -   **Goal:** $u(\nu) = (\text{modes per volume per Hz}) \times (\text{avg energy per mode})$.
    -   **Modes:** Box of side $L \implies k_i = n_i \pi/L$. Number of modes up to $k$ is volume of $1/8$ of a sphere in n-space. Convert $k$ to $\nu$ using $k=2\pi\nu/c$. Differentiate to get density $g(\nu) \propto \nu^2$. Don't forget the 2 polarization states. This gives $\frac{8\pi \nu^2}{c^3}$.
    -   **Energy:** Each mode is a QHO with levels $E_n = nh\nu$. Write the partition function $Z = \sum_n e^{-n\beta h\nu}$. Recognize it's a geometric series. Sum it: $Z=(1-e^{-\beta h\nu})^{-1}$. Calculate $\langle E \rangle = -\frac{\partial \ln Z}{\partial \beta}$. This gives the Bose-Einstein factor.
    -   **Multiply them.** Done.

## Common mistakes
1.  **Wavelength vs. Frequency Form:** Students often assume you can just substitute $\nu=c/\lambda$ into $u(\nu,T)$ to get $u(\lambda,T)$. This is wrong. The energy densities must be conserved over corresponding intervals: $|u(\lambda,T)d\lambda| = |u(\nu,T)d\nu|$. You must include the Jacobian of the transformation: $u(\lambda,T) = u(\nu,T) |\frac{d\nu}{d\lambda}| = u(\nu,T) \frac{c}{\lambda^2}$.
2.  **Forgetting Polarization:** The density of states includes a factor of 2 because electromagnetic waves have two independent polarization states (e.g., vertical and horizontal). It's easy to drop this factor.
3.  **Approximating $e^x-1$ as $e^x$:** For the high-frequency limit (Wien's approximation), $e^{h\nu/k_B T} \gg 1$, so $e^{h\nu/k_B T} - 1 \approx e^{h\nu/k_B T}$. For the low-frequency limit (Rayleigh-Jeans), you must use the Taylor series $e^x \approx 1+x$, so $e^x-1 \approx x$. Confusing these two limits is a common error.

## Self-check
1.  Starting from the Planck distribution $u(\nu, T)$, derive Wien's approximation, which is valid for high frequencies ($h\nu \gg k_B T$). What is the functional form of the result?
2.  The total energy density of blackbody radiation is $U(T) = \int_0^\infty u(\nu, T) d\nu$. Perform this integration to derive the Stefan-Boltzmann Law, $U(T) = \sigma' T^4$. (Hint: you will need to perform a substitution $x = h\nu/k_B T$ and use the standard result for the resulting definite integral, which is related to the Riemann zeta function: $\int_0^\infty \frac{x^3}{e^x-1}dx = \frac{\pi^4}{15}$).
3.  The sun's surface is approximately a blackbody at $T \approx 5800$ K. The peak of its emission is in the visible spectrum. A neutron star might have a surface temperature of $10^6$ K. In what part of the electromagnetic spectrum would its thermal emission peak? Justify your answer quantitatively using Wien's displacement law, which can be derived from the Planck distribution.