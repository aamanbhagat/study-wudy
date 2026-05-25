## What it is
An optical aberration is any deviation from the perfect, point-to-point image formation predicted by simple theory. Chromatic aberration occurs because a lens refracts different colors (wavelengths) of light by different amounts, causing color fringing. Spherical aberration occurs because rays hitting the edge of a spherical lens focus at a different point than rays hitting the center, causing blurring.

## Why it matters
Aberrations are the primary limiting factor in the performance of high-precision optical systems. In aerospace, correcting for aberrations is critical for satellite imaging, star trackers used for navigation, and laser communication systems. The Hubble Space Telescope's famous initial flaw was a severe case of spherical aberration, which required a corrective optics mission to fix.

## When to study it
You must have a firm grasp of geometric optics first. Specifically, be comfortable with:
1.  **Snell's Law:** $n_1 \sin\theta_1 = n_2 \sin\theta_2$.
2.  **The Paraxial Approximation:** For small angles, $\sin\theta \approx \tan\theta \approx \theta$ (in radians).
3.  **The Thin Lens Equation:** $\frac{1}{s_o} + \frac{1}{s_i} = \frac{1}{f}$.
4.  **The Lens Maker's Equation:** $\frac{1}{f} = (n-1) \left( \frac{1}{R_1} - \frac{1}{R_2} \right)$.

Aberrations are, by definition, the failure of the paraxial approximation. If these prerequisites are not solid, you will struggle to understand why aberrations occur.

## How to study it (step by step)
1.  **Re-derive the Lens Maker's Equation.** Start with Snell's law at a single spherical surface, apply the paraxial approximation, and extend it to a second surface to find the focal length $f$ in terms of the index of refraction $n$ and radii of curvature $R_1, R_2$. This reinforces that the "ideal" lens formula is an approximation.
2.  **Analyze Chromatic Aberration.** Take the Lens Maker's Equation you just derived. Treat the index of refraction $n$ as a function of wavelength, $n(\lambda)$. Use calculus to find how the focal length $f$ changes with respect to $n$. This will show mathematically why $f$ must also be a function of wavelength, $f(\lambda)$.
3.  **Analyze Spherical Aberration.** Draw a large diagram of a single spherical lens. Trace two parallel incoming rays: one near the central axis (a paraxial ray) and one near the very edge (a marginal ray). Apply Snell's Law *without* the small angle approximation to both rays at the first surface. You will see geometrically that the marginal ray bends more sharply.
4.  **Explore Correction Methods.** Research the concept of an "achromatic doublet." This involves combining two lenses made of different materials (e.g., crown and flint glass) to cancel out chromatic aberration at two specific wavelengths. Understand conceptually how this works by pairing a positive and negative lens.
5.  **Connect to Aperture.** For spherical aberration, reason about the effect of an aperture stop (i.e., reducing the diameter of the lens used). See how "stopping down" the lens eliminates the marginal rays, thus reducing spherical aberration at the cost of collecting less light. This is why camera lenses are often sharper at smaller apertures like f/8 than when wide open at f/1.8.

## Key ideas, with intuition
1.  **Ideal Optics is a Lie (a useful one).** Simple lens equations rely on the paraxial approximation, which assumes all light rays travel very close to the central axis at shallow angles. Aberrations are the predictable, real-world consequences of violating this assumption with marginal rays (hitting the lens edge) or with light of multiple wavelengths.
2.  **Chromatic Aberration: Dispersion is the Culprit.** You know that a prism splits white light into a rainbow. This phenomenon is called dispersion, and it happens because the material's index of refraction $n$ is a function of wavelength $\lambda$. Blue light ($n_{blue} > n_{red}$) bends more than red light. A lens is essentially a curved prism. Therefore, a simple lens will focus blue light closer to itself than red light.
    $$ \frac{1}{f(\lambda)} = (n(\lambda)-1) \left( \frac{1}{R_1} - \frac{1}{R_2} \right) $$
    Since $n_{blue} > n_{red}$, it follows that $\frac{1}{f_{blue}} > \frac{1}{f_{red}}$, which means $f_{blue} < f_{red}$.
3.  **Spherical Aberration: A Sphere is Not a Parabola.** For perfect focusing of parallel rays to a single point, a lens surface should have a parabolic shape. However, grinding a precise parabola is difficult and expensive, so most lenses are spherical. A sphere is a good approximation of a parabola near the axis, but it curves too much at the edges. This "over-bending" of marginal rays causes them to focus closer to the lens than the paraxial rays from the center. This is a purely geometric effect.

## Worked example
**Problem:** A biconvex lens is made of BK7 glass. The radii of curvature are $R_1 = 100 \text{ mm}$ and $R_2 = -100 \text{ mm}$. The refractive index for red light ($\lambda_r = 656 \text{ nm}$) is $n_r = 1.5143$, and for blue light ($\lambda_b = 486 \text{ nm}$) is $n_b = 1.5224$. Calculate the longitudinal chromatic aberration, which is the difference in focal lengths $|f_b - f_r|$.

**Solution:**
1.  **State the governing equation.** We use the Lens Maker's Equation:
    $$ \frac{1}{f} = (n-1) \left( \frac{1}{R_1} - \frac{1}{R_2} \right) $$
2.  **Calculate the focal length for red light ($f_r$).**
    Substitute the values for red light:
    $$ \frac{1}{f_r} = (1.5143 - 1) \left( \frac{1}{100 \text{ mm}} - \frac{1}{-100 \text{ mm}} \right) $$
    $$ \frac{1}{f_r} = (0.5143) \left( \frac{1}{100} + \frac{1}{100} \right) = (0.5143) \left( \frac{2}{100 \text{ mm}} \right) = \frac{1.0286}{100 \text{ mm}} $$
    $$ f_r = \frac{100 \text{ mm}}{1.0286} \approx 97.22 \text{ mm} $$
3.  **Calculate the focal length for blue light ($f_b$).**
    Substitute the values for blue light:
    $$ \frac{1}{f_b} = (1.5224 - 1) \left( \frac{1}{100 \text{ mm}} - \frac{1}{-100 \text{ mm}} \right) $$
    $$ \frac{1}{f_b} = (0.5224) \left( \frac{2}{100 \text{ mm}} \right) = \frac{1.0448}{100 \text{ mm}} $$
    $$ f_b = \frac{100 \text{ mm}}{1.0448} \approx 95.71 \text{ mm} $$
4.  **Calculate the difference.**
    $$ |f_b - f_r| = |95.71 \text{ mm} - 97.22 \text{ mm}| = 1.51 \text{ mm} $$

**Reflection:** Each step directly applied the Lens Maker's Equation, which links geometry ($R_1, R_2$) and material properties ($n$) to optical performance ($f$). The core of the problem was recognizing that $n$ is not a constant but varies with wavelength, leading directly to a variation in $f$. The blue light, having a higher index of refraction, bends more strongly and thus has a shorter focal length, as predicted by the theory.

## Diagrams

**Chromatic Aberration**
```text
                  .----------------.
Incoming      --->|                |---> Red Focus
White Light   --->|   Convex Lens  |----.-----> F_r
              --->|                |--.   .--> Blue Focus
                  '----------------'  |  /
                                      | /
                                     F_b
<-- f_blue --><---- L.C.A. ---->
<--------- f_red ---------->

L.C.A. = Longitudinal Chromatic Aberration
```

**Spherical Aberration**
```text
              .--- Marginal Ray ---.
             /                      \
Incoming    |   .--- Paraxial ---.   |
Parallel  ----> |                | ------> Paraxial Focus (F_p)
Rays        ----> |   Convex Lens  | ----.-----------> F_p
            |   '---  Ray   ---'   |   |
             \                      /  |
              '--- Marginal Ray ---'   |
                   |___________________|
                         |
                 Marginal Focus (F_m)

<-- f_m --><-- S.A. --><-- f_p -->

S.A. = Longitudinal Spherical Aberration
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:**
    -   **Chromatic = Color.** Think of a *chrome* bumper on a car reflecting a rainbow. Chromatic aberration splits colors.
    -   **Spherical = Shape.** The problem is the *spherical* shape of the lens. It's a geometry problem, not a color problem. Imagine a perfectly round basketball (a sphere) that can't quite roll straight; its shape is the issue.
2.  **Must-Know Formula:** The Lens Maker's Equation is the origin of these concepts. Overlearn it.
    $$ \frac{1}{f} = (n-1) \left( \frac{1}{R_1} - \frac{1}{R_2} \right) $$
    From this, you can see that if $n$ depends on $\lambda$, then $f$ must depend on $\lambda$ (chromatic). Spherical aberration comes from the fact that this formula itself is an approximation derived using $\sin\theta \approx \theta$.
3.  **Spaced Repetition Schedule:** Review this material and re-work the example at **1 day, 3 days, 7 days, 16 days, 35 days**.
4.  **First Principles Pathway:** If you forget everything, rebuild from **Snell's Law** ($n_1 \sin\theta_1 = n_2 \sin\theta_2$).
    -   For a single curved surface, apply Snell's law.
    -   Make the paraxial approximation ($\sin\theta \approx \theta$) to derive the ideal focusing behavior.
    -   To understand aberrations, ask two questions:
        1.  What if $n$ isn't constant for all light? (Leads to chromatic aberration).
        2.  What if $\theta$ is not small, so $\sin\theta \neq \theta$? (Leads to spherical aberration).

## Common mistakes
-   **Confusing the two:** The most common error. Remember the mnemonic: Chromatic=Color, Spherical=Shape. A monochromatic laser can suffer from spherical aberration but *cannot* have chromatic aberration.
-   **Applying to mirrors:** Simple mirrors do *not* have chromatic aberration. The law of reflection ($\theta_i = \theta_r$) is independent of wavelength. High-end telescopes (like the JWST) use mirrors precisely for this reason.
-   **Thinking aberrations are always reduced by stopping down:** While reducing the aperture reduces spherical aberration, it can make diffraction effects worse. Optics is a game of trade-offs.
-   **Assuming the "circle of least confusion" is the focal point:** For an aberrated lens, there is no single focal point. The sharpest possible image is formed at a location called the "circle of least confusion," which is a compromise position between the different focal points.

## Self-check
1.  A perfect, monochromatic point source of light (e.g., a red laser) is aimed at a simple biconvex glass lens. Which of the two aberrations discussed, if any, will be present in the image? Why?
2.  An engineer wants to build a simple telescope objective lens that minimizes chromatic aberration. She has access to two types of glass: crown ($n \approx 1.5$) and flint ($n \approx 1.7$), where flint glass is much more dispersive (its $n$ changes more with $\lambda$). Propose a two-lens combination (a doublet) that could achieve her goal. Should the primary (positive) lens be crown or flint?
3.  How does the magnitude of longitudinal spherical aberration for a simple lens depend on its diameter, $D$, for a fixed focal length $f$? Does a "fast" lens (small f-number, $N = f/D$) suffer more or less from spherical aberration than a "slow" lens (large f-number)? Justify your answer geometrically.