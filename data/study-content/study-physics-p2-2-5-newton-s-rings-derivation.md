## 1. What it is — in plain English

Imagine you place a very slightly curved piece of glass, like a magnifying glass, on top of a perfectly flat piece of glass. If you shine light down on them and look closely, you'll see a pattern of concentric bright and dark rings, centered where the two pieces of glass touch. These rings are called "Newton's rings."

What's happening? There's a tiny, wedge-shaped gap of air between the curved glass and the flat glass. When light hits this setup, some of it reflects off the bottom surface of the curved glass, and some reflects off the top surface of the flat glass. These two reflected light waves travel slightly different distances.

Because light acts like a wave, these two reflected waves can either "add up" (making a bright spot) or "cancel each other out" (making a dark spot), depending on how much extra distance one wave traveled and whether their "ups and downs" are aligned or opposed. This adding and canceling is called interference. The rings appear because the thickness of the air gap changes uniformly as you move away from the center, leading to a predictable pattern of where the waves add up or cancel out.

So, in simple terms, Newton's rings are an interference pattern created by light reflecting off the top and bottom surfaces of a very thin, wedge-shaped air film trapped between a curved lens and a flat surface.

## 2. Why it matters — real-world applications

Newton's rings, while seemingly a simple classroom demonstration, reveal fundamental principles of wave optics and have several critical real-world applications:

1.  **Optical Flatness Testing:** This is perhaps the most direct and crucial application. Manufacturers of high-precision optical components (like lenses, mirrors for telescopes, or laser systems) use Newton's rings to check the flatness or curvature of surfaces. By observing the pattern of rings, engineers can determine if a surface is truly flat, spherical, or if it has imperfections. For instance, if the rings are perfectly circular and evenly spaced, the surfaces are well-matched. Distorted or uneven rings indicate flaws in the optical surface, which is vital for companies like **Zeiss** or **Northrop Grumman** producing aerospace-grade optics.

2.  **Thin Film Thickness Measurement:** The phenomenon provides a highly sensitive method for measuring extremely small thicknesses of transparent films. By analyzing the ring pattern, one can deduce the thickness of the air gap at various points, and by extension, the thickness of a thin coating or layer if it replaces the air. This is relevant in material science for characterizing thin films used in semiconductors, anti-reflective coatings on glasses (e.g., **Corning Gorilla Glass**), or even biological samples under a microscope.

3.  **Calibration of Optical Instruments:** Newton's rings can be used to calibrate certain optical instruments or to determine the wavelength of monochromatic light with high precision. If the radius of curvature of the lens is known, observing the radii of the rings allows for a very accurate calculation of the light's wavelength, which is fundamental in spectroscopy and metrology. This level of precision is critical in research labs and for companies developing advanced sensors.

4.  **Understanding Interference in Complex Systems:** The principles behind Newton's rings (path difference, phase change on reflection, constructive/destructive interference) are foundational to understanding more complex optical phenomena and technologies. This includes interferometers (like the Michelson interferometer used in gravitational wave detection by **LIGO**), anti-reflection coatings on camera lenses (e.g., **Canon, Nikon**), and the operation of optical filters. It underpins much of modern optical engineering and photonics.

## 3. Prerequisites — what you must know first

Before diving into the derivation of Newton's rings, ensure you have a solid grasp of the following concepts:

*   **Wave Nature of Light:** Understanding that light propagates as a wave, characterized by wavelength ($\lambda$), frequency ($f$), and amplitude.
*   **Interference:** The phenomenon where two or more waves superpose to form a resultant wave of greater, lower, or the same amplitude. This includes constructive interference (waves add up, resulting in brightness) and destructive interference (waves cancel out, resulting in darkness).
*   **Reflection:** The process where light bounces off a surface. You should be familiar with the law of reflection (angle of incidence equals angle of reflection).
*   **Phase Change upon Reflection:** A crucial concept stating that when light reflects from an interface with a *denser* medium (e.g., air to glass), it undergoes a phase shift of $\pi$ radians (or $180^\circ$). When reflecting from a *rarer* medium (e.g., glass to air), there is no phase shift.
*   **Thin Films:** The basic idea of interference occurring in thin layers of transparent material, where light reflects from both the top and bottom surfaces of the film.
*   **Basic Geometry and Trigonometry:** Specifically, the Pythagorean theorem, properties of circles (radius, chord, tangent), and small angle approximations (e.g., $\sin \theta \approx \theta$, $\cos \theta \approx 1$ for small $\theta$).

If any of these concepts are unfamiliar, pause here and review them before proceeding.

## 4. The core idea — step by step

The derivation of Newton's rings relies on a careful combination of wave interference principles and geometric analysis of the experimental setup. Let's break it down step-by-step.

### ### Step 1: The Experimental Setup and the Air Wedge

*   **Plain-English Statement:** We start with a plano-convex lens (flat on one side, curved on the other) placed on a flat glass plate. Light shines down from above. The crucial part is the tiny, wedge-shaped air gap between the curved surface of the lens and the flat surface of the plate.
*   **Concrete Example:** Imagine placing a magnifying glass (curved side down) onto a very smooth, flat window pane. The air trapped between them forms the "wedge."
*   **Formal/Mathematical Version:** A plano-convex lens with a large radius of curvature, $R$, is placed on a flat glass plate. Monochromatic light (light of a single wavelength, $\lambda$) is incident normally (perpendicularly) on this system. The air film between the lens and the plate has a thickness $t$, which varies with the radial distance $r$ from the point of contact.
*   **What Could Go Wrong:** Misunderstanding that the interference occurs *within the air film*, not within the glass. The air film acts as the "thin film" in this scenario.

### ### Step 2: Light Rays and Reflections

*   **Plain-English Statement:** When light hits the air wedge, it splits. One part reflects off the bottom surface of the lens (which is the top surface of the air gap). The other part travels through the air gap, reflects off the top surface of the flat plate (which is the bottom surface of the air gap), and then travels back up. These two reflected rays are what interfere.
*   **Concrete Example:** Think of dropping a pebble into a pond. Some ripples bounce off a nearby wall (like the first reflection), while others travel further to a second wall and then bounce back (like the second reflection).
*   **Formal/Mathematical Version:** Consider a ray of monochromatic light incident normally on the lens.
    1.  A portion of the light, Ray 1, reflects from the lower surface of the plano-convex lens (interface between glass and air).
    2.  The remaining portion transmits into the air film. This light then reflects from the upper surface of the flat glass plate (interface between air and glass), forming Ray 2.
    3.  Ray 1 and Ray 2 travel back upwards and interfere.
*   **What Could Go Wrong:** Forgetting that there are *two* specific reflections involved in the interference, not just one.

### ### Step 3: Path Difference

*   **Plain-English Statement:** Because Ray 2 travels down through the air gap and then back up, it covers an extra distance compared to Ray 1, which just reflects off the top of the gap. This extra distance is twice the thickness of the air gap at that point.
*   **Concrete Example:** If you have two people running a race, and one has to run to a cone and back (distance $2t$), while the other just touches a line at the starting point and turns around (distance 0), the first runner has an extra path of $2t$.
*   **Formal/Mathematical Version:** The optical path difference ($\Delta x$) between Ray 1 and Ray 2 is due to Ray 2 traversing the air film twice (down and up).
    $$ \Delta x = 2t $$
    where $t$ is the thickness of the air film at the point where the reflections occur.
*   **What Could Go Wrong:** Forgetting the factor of 2. It's $2t$, not just $t$, because the light travels *through* the film and *back*.

### ### Step 4: Phase Changes upon Reflection

*   **Plain-English Statement:** When light reflects, its "wave pattern" can sometimes flip upside down. This flip, or phase change, depends on whether the light is going from a less dense medium to a more dense medium, or vice versa.
    *   Ray 1 reflects at the glass-air interface (denser to rarer). No phase change.
    *   Ray 2 reflects at the air-glass interface (rarer to denser). This causes a $180^\circ$ (or $\pi$ radians) phase change.
*   **Concrete Example:** Imagine a rope tied to a fixed wall. If you send a wave down the rope, it reflects back inverted (like reflecting from a denser medium). If the rope is tied to a loose ring on a pole, the wave reflects back upright (like reflecting from a rarer medium).
*   **Formal/Mathematical Version:**
    1.  Ray 1 reflects from the glass-air interface. Since light goes from a denser medium (glass) to a rarer medium (air), there is **no phase change** upon reflection.
    2.  Ray 2 reflects from the air-glass interface. Since light goes from a rarer medium (air) to a denser medium (glass), there is a **phase change of $\pi$ radians** (or $180^\circ$) upon reflection.
    Thus, there is a net phase difference of $\pi$ radians between Ray 1 and Ray 2 due to reflections alone. This is equivalent to an additional optical path difference of $\lambda/2$.
*   **What Could Go Wrong:** Incorrectly assigning the phase change. The key is to identify the *relative* optical densities of the media at each reflection point.

### ### Step 5: Total Optical Path Difference

*   **Plain-English Statement:** We combine the extra distance traveled (from Step 3) with the effect of the phase flip (from Step 4) to get the total "effective" path difference between the two waves.
*   **Concrete Example:** If one runner takes an extra 10 meters, but also starts 5 meters behind the line, their *effective* path difference is only 5 meters. Here, the phase shift is like a "head start" or "handicap" in terms of wavelength.
*   **Formal/Mathematical Version:** The total effective optical path difference ($\Delta x_{total}$) is the sum of the path difference due to geometry and the equivalent path difference due to phase change:
    $$ \Delta x_{total} = 2t + \frac{\lambda}{2} $$
    *Alternatively, one can consider the conditions directly:*
    The actual path difference is $2t$. Due to the $\pi$ phase shift at one reflection, the conditions for constructive and destructive interference are swapped compared to a standard thin film without such a phase shift.
    *   For **Constructive Interference (Bright Ring):** The waves are in phase.
        $$ 2t = m\lambda $$
        where $m = 0, 1, 2, \dots$ is the order of the bright ring. (This is because the $\lambda/2$ path difference from the phase shift effectively "undoes" the standard constructive condition of $m\lambda$, making it $m\lambda$ for *constructive* interference here.)
    *   For **Destructive Interference (Dark Ring):** The waves are out of phase.
        $$ 2t = \left(m + \frac{1}{2}\right)\lambda $$
        where $m = 0, 1, 2, \dots$ is the order of the dark ring. (Similarly, the $\lambda/2$ from phase shift makes the standard constructive condition become destructive).
    *   **Note on Central Spot ($m=0$):** At the point of contact ($r=0$), the thickness of the air film $t=0$.
        For constructive interference: $2(0) = m\lambda \implies m=0$. This implies a bright central spot.
        For destructive interference: $2(0) = (m+1/2)\lambda \implies 0 = (m+1/2)\lambda$, which is impossible for $m \ge 0$.
        Therefore, at the center ($t=0$), we should expect a **bright central spot** *if* we use the conditions above. However, the standard observation for Newton's rings is a **dark central spot**. This discrepancy arises because the very first reflection (glass-air) is often considered from the *bottom surface of the lens*, and the second from the *top surface of the plate*. If we consider the light reflecting from the *top surface of the air film* (bottom of lens, glass-air) and the *bottom surface of the air film* (top of plate, air-glass), then there is a net phase shift of $\pi$.
        Let's re-evaluate the conditions carefully:
        If there is a net $\pi$ phase shift (equivalent to $\lambda/2$ path difference), then:
        *   **Constructive Interference (Bright):** Path difference must be $(m + 1/2)\lambda$. So, $2t = (m + 1/2)\lambda$.
        *   **Destructive Interference (Dark):** Path difference must be $m\lambda$. So, $2t = m\lambda$.
        Using these conditions, for $t=0$ (center):
        *   Bright: $2(0) = (m+1/2)\lambda \implies 0 = (m+1/2)\lambda$, impossible.
        *   Dark: $2(0) = m\lambda \implies m=0$. This implies a **dark central spot**. This matches observations.
        **We will proceed with these conditions:**
        *   **Dark Rings (Destructive Interference):** $2t = m\lambda$ (where $m=0, 1, 2, \dots$)
        *   **Bright Rings (Constructive Interference):** $2t = \left(m + \frac{1}{2}\right)\lambda$ (where $m=0, 1, 2, \dots$)
*   **What Could Go Wrong:** Getting the conditions for constructive and destructive interference swapped due to the phase change. Always remember the net $\pi$ phase shift effectively swaps the standard conditions.

### ### Step 6: Geometry of the Air Wedge

*   **Plain-English Statement:** The thickness of the air gap, $t$, isn't constant. It's zero at the center and gradually increases as you move outwards from the point of contact. We need a way to relate this thickness $t$ to the radius $r$ of a particular ring. This relationship comes from the curvature of the lens.
*   **Concrete Example:** Imagine a large sphere (like a giant exercise ball) touching a flat floor. If you cut the sphere, the distance from the floor to the sphere's surface increases as you move away from the contact point.
*   **Formal/Mathematical Version:** Let $R$ be the radius of curvature of the plano-convex lens. Let $r$ be the radius of a Newton's ring (the distance from the center of contact to the ring). Let $t$ be the thickness of the air film at radius $r$.
    Consider a cross-section of the lens. By the Pythagorean theorem, applied to the right-angled triangle formed by the radius of curvature ($R$), the radius of the ring ($r$), and the distance from the center of curvature to the flat plate ($R-t$):
    $$ r^2 + (R-t)^2 = R^2 $$
    Expand this equation:
    $$ r^2 + R^2 - 2Rt + t^2 = R^2 $$
    $$ r^2 - 2Rt + t^2 = 0 $$
    Since the air film is very thin ($t \ll R$), the $t^2$ term is negligibly small compared to $2Rt$. We can approximate:
    $$ r^2 \approx 2Rt $$
    Therefore, the thickness of the air film at a radius $r$ is:
    $$ t = \frac{r^2}{2R} $$
*   **What Could Go Wrong:** Algebraic errors in expanding $(R-t)^2$ or forgetting the small $t$ approximation, which simplifies the equation significantly.

### ### Step 7: Deriving the Radii of the Rings

*   **Plain-English Statement:** Now we combine the conditions for bright/dark rings (from Step 5) with the geometric relationship between air film thickness and ring radius (from Step 6). This will give us formulas for the radii of the dark and bright rings.
*   **Concrete Example:** If you know that dark rings appear when the air gap is $0, \lambda/2, \lambda, 3\lambda/2, \dots$ and you also know how the air gap thickness relates to the distance from the center, you can figure out where those dark rings will be.
*   **Formal/Mathematical Version:**

    **For Dark Rings:**
    We use the condition for destructive interference:
    $$ 2t = m\lambda $$
    Substitute the expression for $t$ from Step 6 ($t = \frac{r^2}{2R}$):
    $$ 2 \left(\frac{r_m^2}{2R}\right) = m\lambda $$
    $$ \frac{r_m^2}{R} = m\lambda $$
    Solving for $r_m^2$:
    $$ r_m^2 = mR\lambda $$
    And for the radius of the $m$-th dark ring:
    $$ r_m = \sqrt{mR\lambda} $$
    Here, $m = 0, 1, 2, \dots$.
    *   For $m=0$, $r_0=0$, which corresponds to the dark central spot.
    *   For $m=1$, $r_1 = \sqrt{R\lambda}$, the radius of the first dark ring.
    *   For $m=2$, $r_2 = \sqrt{2R\lambda}$, the radius of the second dark ring, and so on.

    **For Bright Rings:**
    We use the condition for constructive interference:
    $$ 2t = \left(m + \frac{1}{2}\right)\lambda $$
    Substitute the expression for $t$ from Step 6 ($t = \frac{r^2}{2R}$):
    $$ 2 \left(\frac{r_m^2}{2R}\right) = \left(m + \frac{1}{2}\right)\lambda $$
    $$ \frac{r_m^2}{R} = \left(m + \frac{1}{2}\right)\lambda $$
    Solving for $r_m^2$:
    $$ r_m^2 = \left(m + \frac{1}{2}\right)R\lambda $$
    And for the radius of the $m$-th bright ring:
    $$ r_m = \sqrt{\left(m + \frac{1}{2}\right)R\lambda} $$
    Here, $m = 0, 1, 2, \dots$.
    *   For $m=0$, $r_0 = \sqrt{\frac{1}{2}R\lambda}$, the radius of the first bright ring.
    *   For $m=1$, $r_1 = \sqrt{\frac{3}{2}R\lambda}$, the radius of the second bright ring, and so on.

*   **What Could Go Wrong:** Mixing up the formulas for dark and bright rings, or making algebraic mistakes during substitution. Remember that the $m$ in the dark ring formula refers to the *order* of the dark ring, starting from $m=0$ for the central dark spot. The $m$ in the bright ring formula also refers to the order, starting from $m=0$ for the first bright ring.

## 5. Worked examples — multiple, with every step shown

### Example 1: Calculate the radius of a specific dark ring

**Problem:** A plano-convex lens with a radius of curvature $R = 100 \text{ cm}$ is placed on a flat glass plate. Monochromatic light of wavelength $\lambda = 589 \text{ nm}$ is incident normally. Calculate the radius of the 5th dark ring.

**Given:**
*   Radius of curvature of the lens, $R = 100 \text{ cm} = 1.0 \text{ m}$
*   Wavelength of light, $\lambda = 589 \text{ nm} = 589 \times 10^{-9} \text{ m}$
*   Order of the dark ring, $m = 5$

**Wanted:** Radius of the 5th dark ring, $r_5$.

**Solution:**

1.  **Recall the formula for the radius of a dark ring:**
    $$ r_m^2 = mR\lambda $$
    *This formula relates the square of the radius of the $m$-th dark ring to the order of the ring, the radius of curvature of the lens, and the wavelength of light. It's derived from the conditions for destructive interference and the geometry of the air wedge.*

2.  **Substitute the given values into the formula:**
    $$ r_5^2 = (5) \times (1.0 \text{ m}) \times (589 \times 10^{-9} \text{ m}) $$
    *We're plugging in the values for $m$, $R$, and $\lambda$ into our derived equation. Ensure all units are consistent (meters in this case).*

3.  **Perform the multiplication:**
    $$ r_5^2 = 5 \times 589 \times 10^{-9} \text{ m}^2 $$
    $$ r_5^2 = 2945 \times 10^{-9} \text{ m}^2 $$
    $$ r_5^2 = 2.945 \times 10^{-6} \text{ m}^2 $$
    *Calculate the numerical product. It's often helpful to keep powers of 10 separate until the end.*

4.  **Take the square root to find $r_5$:**
    $$ r_5 = \sqrt{2.945 \times 10^{-6} \text{ m}^2} $$
    $$ r_5 \approx 0.001716 \text{ m} $$
    *The final step is to find the square root to get the radius. The unit will be meters.*

5.  **Convert to a more convenient unit (e.g., millimeters):**
    $$ r_5 \approx 1.716 \times 10^{-3} \text{ m} = 1.716 \text{ mm} $$
    *Converting to millimeters makes the number more readable and relatable to typical experimental scales.*

**Final Answer:**
The radius of the 5th dark ring is $\boxed{1.716 \text{ mm}}$.

*Reflection:* This example was straightforward, mainly testing the direct application of the derived formula and unit consistency. The key is to correctly identify the order $m$ for the dark ring.

### Example 2: Determine the wavelength of light

**Problem:** In a Newton's rings experiment, the radius of the 10th dark ring is measured to be $3.0 \text{ mm}$ when a plano-convex lens with a radius of curvature of $2.5 \text{ m}$ is used. What is the wavelength of the monochromatic light?

**Given:**
*   Radius of the 10th dark ring, $r_{10} = 3.0 \text{ mm} = 3.0 \times 10^{-3} \text{ m}$
*   Order of the dark ring, $m = 10$
*   Radius of curvature of the lens, $R = 2.5 \text{ m}$

**Wanted:** Wavelength of light, $\lambda$.

**Solution:**

1.  **Recall the formula for the radius of a dark ring:**
    $$ r_m^2 = mR\lambda $$
    *We start with the same fundamental formula as before, as it relates all the given quantities to the unknown wavelength.*

2.  **Rearrange the formula to solve for $\lambda$:**
    $$ \lambda = \frac{r_m^2}{mR} $$
    *Algebraically isolate $\lambda$ by dividing both sides by $mR$. This is a standard step when solving for a different variable.*

3.  **Substitute the given values into the rearranged formula:**
    $$ \lambda = \frac{(3.0 \times 10^{-3} \text{ m})^2}{(10) \times (2.5 \text{ m})} $$
    *Carefully substitute the numerical values, ensuring units are consistent. Remember to square the radius, including its power of 10.*

4.  **Calculate the square of the radius:**
    $$ (3.0 \times 10^{-3} \text{ m})^2 = 9.0 \times 10^{-6} \text{ m}^2 $$
    *Squaring the term $(3.0 \times 10^{-3})$ means squaring both the numerical part and the power of 10: $3^2 = 9$ and $(10^{-3})^2 = 10^{-6}$.*

5.  **Perform the multiplication in the denominator:**
    $$ 10 \times 2.5 \text{ m} = 25 \text{ m} $$
    *Simplify the denominator before dividing.*

6.  **Perform the division to find $\lambda$:**
    $$ \lambda = \frac{9.0 \times 10^{-6} \text{ m}^2}{25 \text{ m}} $$
    $$ \lambda = 0.36 \times 10^{-6} \text{ m} $$
    $$ \lambda = 3.6 \times 10^{-7} \text{ m} $$
    *Divide the numerator by the denominator. The unit will simplify to meters, which is appropriate for wavelength.*

7.  **Convert to nanometers for standard representation:**
    $$ \lambda = 3.6 \times 10^{-7} \text{ m} = 360 \times 10^{-9} \text{ m} = 360 \text{ nm} $$
    *Wavelengths of visible light are typically expressed in nanometers, so this conversion is good practice.*

**Final Answer:**
The wavelength of the monochromatic light is $\boxed{360 \text{ nm}}$.

*Reflection:* This example required rearranging the formula, which is a common task in physics problems. It also highlighted the importance of careful exponent handling during squaring and division.

### Example 3: Calculate the radius of a bright ring

**Problem:** Using the same experimental setup as Example 1 ($R = 100 \text{ cm}$, $\lambda = 589 \text{ nm}$), calculate the radius of the 3rd bright ring.

**Given:**
*   Radius of curvature of the lens, $R = 100 \text{ cm} = 1.0 \text{ m}$
*   Wavelength of light, $\lambda = 589 \text{ nm} = 589 \times 10^{-9} \text{ m}$
*   Order of the bright ring. For the 3rd bright ring, we need to be careful with $m$.
    *   The first bright ring corresponds to $m=0$.
    *   The second bright ring corresponds to $m=1$.
    *   The third bright ring corresponds to $m=2$.
    So, for the 3rd bright ring, $m = 2$.

**Wanted:** Radius of the 3rd bright ring, $r_2$.

**Solution:**

1.  **Recall the formula for the radius of a bright ring:**
    $$ r_m^2 = \left(m + \frac{1}{2}\right)R\lambda $$
    *This formula is distinct from the dark ring formula due to the different interference condition for bright fringes, specifically the $(m+1/2)$ term.*

2.  **Determine the correct value for $m$ for the 3rd bright ring:**
    *   The first bright ring is for $m=0$.
    *   The second bright ring is for $m=1$.
    *   The third bright ring is for $m=2$.
    So, we use $m=2$.
    *This is a common trap! Always remember that $m=0$ refers to the first instance of a bright or dark ring, not necessarily the "zeroth" ring if you're counting from 1.*

3.  **Substitute the given values and $m=2$ into the formula:**
    $$ r_2^2 = \left(2 + \frac{1}{2}\right) \times (1.0 \text{ m}) \times (589 \times 10^{-9} \text{ m}) $$
    $$ r_2^2 = \left(2.5\right) \times (1.0 \text{ m}) \times (589 \times 10^{-9} \text{ m}) $$
    *Substitute $m=2$, $R=1.0 \text{ m}$, and $\lambda=589 \times 10^{-9} \text{ m}$. Calculate the $(m+1/2)$ term first.*

4.  **Perform the multiplication:**
    $$ r_2^2 = 2.5 \times 589 \times 10^{-9} \text{ m}^2 $$
    $$ r_2^2 = 1472.5 \times 10^{-9} \text{ m}^2 $$
    $$ r_2^2 = 1.4725 \times 10^{-6} \text{ m}^2 $$
    *Multiply the numerical parts and keep track of the power of 10.*

5.  **Take the square root to find $r_2$:**
    $$ r_2 = \sqrt{1.4725 \times 10^{-6} \text{ m}^2} $$
    $$ r_2 \approx 0.001213 \text{ m} $$
    *Calculate the square root.*

6.  **Convert to millimeters:**
    $$ r_2 \approx 1.213 \times 10^{-3} \text{ m} = 1.213 \text{ mm} $$
    *Convert to a more practical unit.*

**Final Answer:**
The radius of the 3rd bright ring is $\boxed{1.213 \text{ mm}}$.

*Reflection:* The trickiest part here is correctly identifying the order $m$ for the bright ring. Always remember that $m=0$ for bright rings gives the *first* bright ring.

### Example 4: Determine the refractive index of a liquid filling the gap

**Problem:** A Newton's rings experiment is performed in air, and the radius of the 8th dark ring is found to be $1.5 \text{ mm}$. When the space between the lens and the glass plate is filled with a transparent liquid, the radius of the 8th dark ring becomes $1.2 \text{ mm}$. Assuming the same lens and monochromatic light, what is the refractive index of the liquid?

**Given:**
*   Radius of 8th dark ring in air, $r_{8, \text{air}} = 1.5 \text{ mm} = 1.5 \times 10^{-3} \text{ m}$
*   Radius of 8th dark ring in liquid, $r_{8, \text{liquid}} = 1.2 \text{ mm} = 1.2 \times 10^{-3} \text{ m}$
*   Order of the dark ring, $m = 8$ (same for both cases)
*   Lens radius of curvature $R$ and wavelength $\lambda$ are constant.

**Wanted:** Refractive index of the liquid, $n$.

**Solution:**

1.  **Recall the formula for the radius of a dark ring:**
    $$ r_m^2 = mR\lambda $$
    *This is the base formula for dark rings. However, this formula assumes the medium in the gap is air (or vacuum), where the refractive index is approximately 1.*

2.  **Adapt the formula for a medium with refractive index $n$:**
    When light travels through a medium with refractive index $n$, its wavelength effectively changes to $\lambda' = \lambda/n$, where $\lambda$ is the wavelength in vacuum (or air). The path difference $2t$ is still valid, but the interference condition now involves $\lambda'$.
    So, the condition for dark rings becomes:
    $$ 2t = m\lambda' = m\frac{\lambda}{n} $$
    Substituting $t = \frac{r_m^2}{2R}$ (geometry remains the same):
    $$ 2 \left(\frac{r_m^2}{2R}\right) = m\frac{\lambda}{n} $$
    $$ \frac{r_m^2}{R} = m\frac{\lambda}{n} $$
    Therefore, the formula for the radius of a dark ring in a medium of refractive index $n$ is:
    $$ r_m^2 = \frac{mR\lambda}{n} $$
    *This is a crucial step. The wavelength of light *within* the medium is what matters for interference. The geometry of the air wedge (and thus the $t = r^2/2R$ relationship) does not change, but the wavelength does.*

3.  **Write down the formula for the air case ($n=1$):**
    $$ r_{m, \text{air}}^2 = mR\lambda $$
    *This is our original formula, specific to air where $n=1$.*

4.  **Write down the formula for the liquid case (refractive index $n$):**
    $$ r_{m, \text{liquid}}^2 = \frac{mR\lambda}{n} $$
    *This is the modified formula for the liquid, where $n$ is the unknown refractive index.*

5.  **Form a ratio to eliminate $mR\lambda$ (which are constant):**
    Divide the equation for the liquid by the equation for air:
    $$ \frac{r_{m, \text{liquid}}^2}{r_{m, \text{air}}^2} = \frac{\frac{mR\lambda}{n}}{mR\lambda} $$
    $$ \frac{r_{m, \text{liquid}}^2}{r_{m, \text{air}}^2} = \frac{1}{n} $$
    *This is an elegant way to solve problems where some parameters (like $R$, $\lambda$, $m$) are constant but unknown. By taking a ratio, they cancel out, leaving only the variable we need.*

6.  **Rearrange to solve for $n$:**
    $$ n = \frac{r_{m, \text{air}}^2}{r_{m, \text{liquid}}^2} $$
    *Isolate $n$ algebraically.*

7.  **Substitute the given values:**
    $$ n = \frac{(1.5 \times 10^{-3} \text{ m})^2}{(1.2 \times 10^{-3} \text{ m})^2} $$
    *Substitute the given radii. Note that since the units are the same (mm or m), they will cancel out, so converting to meters is not strictly necessary for the ratio, but it's good practice for consistency.*

8.  **Calculate the squares:**
    $$ n = \frac{2.25 \times 10^{-6} \text{ m}^2}{1.44 \times 10^{-6} \text{ m}^2} $$
    *Perform the squaring operation for both numerator and denominator.*

9.  **Perform the division:**
    $$ n = \frac{2.25}{1.44} $$
    $$ n \approx 1.5625 $$
    *The powers of 10 cancel out, leaving a pure number, which is correct for a refractive index.*

**Final Answer:**
The refractive index of the liquid is $\boxed{1.56}$.

*Reflection:* This is a harder example because it requires understanding how the wavelength changes in a different medium and modifying the core formula accordingly. The use of a ratio is a powerful technique to simplify calculations when several parameters are constant but their exact values are not given.

## 6. Common mistakes and traps

1.  **Forgetting the factor of 2 in path difference:** A very common error is to use $t$ instead of $2t$ for the optical path difference. Remember the light travels down *and* up through the film.
2.  **Incorrectly applying phase change upon reflection:** Students often forget about the $\pi$ phase shift, or apply it to the wrong reflection, or miss the *net* phase shift. Always remember: rarer to denser (e.g., air to glass) causes a $\pi$ phase shift; denser to rarer (e.g., glass to air) causes no phase shift. In Newton's rings, there's typically one of each, leading to a net $\pi$ phase shift.
3.  **Mixing up constructive and destructive interference conditions:** Due to the net $\pi$ phase shift, the standard conditions for constructive ($2t = m\lambda$) and destructive ($2t = (m+1/2)\lambda$) interference are effectively swapped. So, for Newton's rings:
    *   Dark rings (destructive): $2t = m\lambda$
    *   Bright rings (constructive): $2t = (m+1/2)\lambda$
    Getting these swapped will lead to incorrect ring radii.
4.  **Algebraic errors in the geometry derivation:** The expansion of $(R-t)^2$ and the subsequent approximation $t^2 \ll 2Rt$ often lead to mistakes. Ensure $r^2 + (R-t)^2 = R^2$ correctly simplifies to $r^2 \approx 2Rt$.
5.  **Incorrectly numbering the rings (order $m$):** For dark rings, $m=0$ corresponds to the central dark spot, $m=1$ to the first dark ring, and so on. For bright rings, $m=0$ corresponds to the *first* bright ring. If a question asks for the "nth" ring, be careful to map it to the correct $m$ value.
6.  **Ignoring the refractive index of the medium in the gap:** If the space between the lens and plate is filled with a liquid, the wavelength of light within that medium changes ($\lambda' = \lambda/n$). Forgetting to account for this change will lead to incorrect calculations for ring radii or derived refractive indices.

## 7. Textbook-precise explanation

Newton's rings are an optical interference phenomenon observed when a plano-convex lens of large radius of curvature is placed on a flat glass plate. The setup creates a thin, circularly symmetric air film of varying thickness between the two surfaces. When monochromatic light is incident normally on this assembly, two coherent light rays emerge from the air film and interfere.

Consider a ray of light incident normally on the lens. A portion of this light (Ray 1) is reflected from the lower surface of the lens (glass-air interface). The remaining portion transmits into the air film and is subsequently reflected from the upper surface of the flat glass plate (air-glass interface), forming Ray 2. These two reflected rays interfere.

The optical path difference ($\Delta x$) between Ray 1 and Ray 2 arises from two factors:
1.  **Geometric Path Difference:** Ray 2 travels twice the thickness of the air film, $t$, more than Ray 1. Thus, $\Delta x_{geom} = 2t$.
2.  **Phase Change upon Reflection:**
    *   Ray 1 reflects from a denser medium (glass) to a rarer medium (air). There is no phase change.
    *   Ray 2 reflects from a rarer medium (air) to a denser medium (glass). This reflection introduces a phase change of $\pi$ radians, equivalent to an optical path difference of $\lambda/2$.
Therefore, the total effective optical path difference is:
$$ \Delta x_{total} = 2t + \frac{\lambda}{2} $$
Alternatively, one can state that the net $\pi$ phase shift swaps the standard conditions for constructive and destructive interference.

For **destructive interference (dark rings)**, the total phase difference must be an odd multiple of $\pi$, or the total path difference must be an integer multiple of $\lambda$:
$$ 2t = m\lambda $$
where $m = 0, 1, 2, \dots$ represents the order of the dark ring.

For **constructive interference (bright rings)**, the total phase difference must be an even multiple of $\pi$, or the total path difference must be an odd multiple of $\lambda/2$:
$$ 2t = \left(m + \frac{1}{2}\right)\lambda $$
where $m = 0, 1, 2, \dots$ represents the order of the bright ring.

To relate the film thickness $t$ to the radius of the rings $r$, we use the geometry of the lens. Let $R$ be the radius of curvature of the plano-convex lens. From the Pythagorean theorem applied to the cross-section of the lens at a radial distance $r$:
$$ r^2 + (R-t)^2 = R^2 $$
Expanding this equation gives:
$$ r^2 + R^2 - 2Rt + t^2 = R^2 $$
$$ r^2 - 2Rt + t^2 = 0 $$
Since the film thickness $t$ is very small compared to the radius of curvature $R$ ($t \ll R$), the $t^2$ term can be neglected ($t^2 \approx 0$). Thus, the equation simplifies to:
$$ r^2 = 2Rt $$
From this, the film thickness is given by $t = \frac{r^2}{2R}$.

Substituting this expression for $t$ into the interference conditions:

**For Dark Rings:**
$$ 2\left(\frac{r_m^2}{2R}\right) = m\lambda $$
$$ \frac{r_m^2}{R} = m\lambda $$
$$ r_m^2 = mR\lambda $$
The radius of the $m$-th dark ring is $r_m = \sqrt{mR\lambda}$. For $m=0$, $r_0=0$, indicating a dark central spot, consistent with observation.

**For Bright Rings:**
$$ 2\left(\frac{r_m^2}{2R}\right) = \left(m + \frac{1}{2}\right)\lambda $$
$$ \frac{r_m^2}{R} = \left(m + \frac{1}{2}\right)\lambda $$
$$ r_m^2 = \left(m + \frac{1}{2}\right)R\lambda $$
The radius of the $m$-th bright ring is $r_m = \sqrt{\left(m + \frac{1}{2}\right)R\lambda}$. For $m=0$, this gives the first bright ring.

If the space between the lens and plate is filled with a transparent medium of refractive index $n$, the wavelength of light in that medium becomes $\lambda' = \lambda/n$. The interference conditions are modified accordingly:
For dark rings: $r_m^2 = \frac{mR\lambda}{n}$
For bright rings: $r_m^2 = \frac{\left(m + \frac{1}{2}\right)R\lambda}{n}$

(Refer to "Optics" by Eugene Hecht, 5th Ed., Chapter 9, or "Fundamentals of Physics" by Halliday, Resnick, Walker, 11th Ed., Chapter 35.)

## 8. ASCII diagrams

```text
       Incident Light
              |
              V
      -------------------  <-- Plano-convex lens (curved surface down)
     /                 \
    |                   |  <-- Glass (n_glass)
    |                   |
    |      Air Film     |  <-- Air (n_air = 1)
    |                   |
    |-------------------|  <-- Flat glass plate (n_glass)
    |                   |
    ---------------------

Detail of the air wedge and reflections:

       Incident Ray
           |
           V
    Glass (Lens)  |  R_1 (Reflection 1 - glass to air, no phase shift)
    --------------+------------------  <-- Interface 1 (bottom of lens)
            \     /
             \   /
              \ /  <-- Air film (thickness 't')
               X
              / \
             /   \
    --------+------------------------  <-- Interface 2 (top of flat plate)
    Glass   |  R_2 (Reflection 2 - air to glass, pi phase shift)
            |

Geometry for thickness 't' and radius 'r':

           O (Center of curvature of lens)
           |
         R |
           |
           .------- P (Point on lens surface at radius r)
          /|
         / |
        /  | r
       /   |
      /    |
     A-----B-------------------------  <-- Flat plate surface
     <--t-->
     <-----R-----> (Radius of curvature)

Where:
O = Center of curvature of the plano-convex lens
R = Radius of curvature of the lens
r = Radius of the Newton's ring at point P
t = Thickness of the air film at radius r
A = Point of contact (center of rings)
B = Point on the flat plate directly below P
```

**Description for redrawing:**
Imagine a large circle representing the cross-section of the spherical surface of the plano-convex lens. Its center is 'O'. The flat glass plate is a horizontal line tangent to this circle at its lowest point, 'A'.
Now, consider a point 'P' on the curved surface of the lens, at a horizontal distance 'r' from 'A'. The vertical distance from 'P' to the flat plate is the thickness of the air film, 't'.
Draw a right-angled triangle with vertices:
1.  'O' (center of curvature).
2.  The point directly above 'A' at the same height as 'O'. Let's call this 'C'.
3.  The point 'P'.
The hypotenuse of this triangle is $OP = R$.
One leg is the horizontal distance $CP = r$.
The other leg is the vertical distance $OC$. Since the distance from O to A is R, and the thickness of the air film at P is t, the distance from O to B (the point on the flat plate directly below P) is $R-t$. Thus, $OC = R-t$.
Applying Pythagoras: $r^2 + (R-t)^2 = R^2$.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Imagine "Newton's Rings" as a **"Double-Reflecting Air Sandwich"**.
    *   **Double-Reflecting:** Reminds you that light reflects *twice* (from the bottom of the lens and the top of the plate). This is key for the $2t$ path difference.
    *   **Air Sandwich:** Reminds you that the interference happens in the *air film* (or liquid film), and its thickness $t$ is the crucial variable.
    *   **Phase Flip:** Visualize one reflection flipping the wave (like a surfer wiping out), while the other doesn't. This leads to the "swapped" conditions for bright/dark.
    *   **Curved Geometry:** Picture the lens as a giant dome, and the rings forming as the air gap gets progressively thicker. This links to $r^2 = 2Rt$.

2.  **Formulas/Facts to MUST Overlearn:**
    *   **Net Phase Shift:** Always a $\pi$ phase shift (or $\lambda/2$ path difference) between the two interfering rays. This is critical for getting the conditions right.
    *   **Dark Rings Condition:** $2t = m\lambda$ (where $m=0, 1, 2, \dots$)
    *   **Bright Rings Condition:** $2t = (m + 1/2)\lambda$ (where $m=0, 1, 2, \dots$)
    *   **Geometric Relation:** $t = \frac{r^2}{2R}$ (or $r^2 = 2Rt$)
    *   **Combined Dark Ring Formula:** $r_m^2 = mR\lambda$
    *   **Combined Bright Ring Formula:** $r_m^2 = (m + 1/2)R\lambda$

3.  **Spaced-Repetition Schedule:**
    *   Review the derivation and formulas: **1 day** after initial learning.
    *   Review again: **3 days** after the first review.
    *   Review again: **7 days** after the second review.
    *   Review again: **16 days** after the third review.
    *   Final review: **35 days** after the fourth review.
    (Actively re-derive, don't just read.)

4.  **First-Principles Re-derivation Pathway:**
    If you forget the formulas, you can always rebuild them by following these logical steps:
    1.  **Setup:** Plano-convex lens on flat plate creates a thin air film.
    2.  **Rays:** Light reflects from *two* surfaces: bottom of lens (glass-air) and top of plate (air-glass).
    3.  **Path Difference (Geometric):** Ray 2 travels $2t$ further than Ray 1 (down and up the film).
    4.  **Phase Shifts (Reflections):**
        *   Glass-air: No phase shift.
        *   Air-glass: $\pi$ phase shift.
        *   **Net:** A $\pi$ phase shift (equivalent to $\lambda/2$ path difference).
    5.  **Interference Conditions (with net $\pi$ shift):**
        *   Dark: $2t = m\lambda$
        *   Bright: $2t = (m + 1/2)\lambda$
    6.  **Geometry:** Use Pythagoras on the lens curvature: $r^2 + (R-t)^2 = R^2$. Simplify with $t \ll R$ to get $r^2 \approx 2Rt$, so $t = r^2 / (2R)$.
    7.  **Combine:** Substitute the geometric $t$ into the interference conditions to get the final formulas for $r_m^2$.

## 10. Connections — what this leads to

Understanding Newton's rings and its derivation is a foundational step in several advanced optics topics:

*   **Interferometry:** The principle of using interference patterns to make precise measurements is central to all interferometers (e.g., Michelson, Fabry-Perot). Newton's rings is a simple form of a two-beam interferometer. This knowledge is crucial for fields like gravitational wave detection (LIGO uses Michelson interferometers), high-precision metrology, and optical testing.
*   **Thin Film Optics:** The concepts of path difference, phase change, and interference in thin films are directly applicable to understanding and designing anti-reflection coatings on lenses, high-reflectivity mirrors, dielectric filters, and optical sensors. This is vital in consumer electronics (camera lenses, smartphone screens), aerospace (telescopes, satellite optics), and medical devices.
*   **Optical Metrology:** The ability to precisely measure small distances, surface flatness, and wavelengths forms the basis of optical metrology. Newton's rings are a direct example of how light waves can be used as a "ruler" for incredibly small dimensions.
*   **Holography:** While more complex, holography relies on the interference of light waves to record and reconstruct 3D images. The fundamental wave interactions are rooted in principles like those seen in Newton's rings.
*   **Wavefront Sensing:** In adaptive optics, systems are designed to correct distortions in wavefronts (e.g., from atmospheric turbulence in astronomy). Understanding how optical path differences lead to interference patterns is key to designing and interpreting wavefront sensors.
*   **Quantum Optics:** At a deeper level, the wave nature of light demonstrated by interference phenomena like Newton's rings paved the way for understanding the dual wave-particle nature of light and matter, a cornerstone of quantum mechanics.

## 11. Self-check questions

1.  Explain in your own words why the central spot in a standard Newton's rings experiment (in air) is dark. What would happen if the experiment were performed with a liquid of refractive index $n > 1$ filling the gap, and the lens was made of a material with refractive index $n_{lens} > n$?
2.  Derive the formula for the radius of the $m$-th bright ring, $r_m = \sqrt{\left(m + \frac{1}{2}\right)R\lambda}$, starting from the conditions for constructive interference and the geometry of the air wedge. Clearly state all assumptions.
3.  In a Newton's rings experiment, the diameter of the 4th dark ring is $1.8 \text{ mm}$ when using light of wavelength $600 \text{ nm}$. If the radius of curvature of the plano-convex lens is $50 \text{ cm}$, what would be the diameter of the 9th dark ring under the same conditions?
4.  A Newton's rings setup is illuminated by white light. Describe the appearance of the rings and explain why they are colored. What would be the appearance of the central spot?
5.  Two plano-convex lenses, both with radius of curvature $R$, are placed in contact such that their curved surfaces face each other. Describe how the interference pattern (Newton's rings) would differ from the standard setup (one plano-convex lens on a flat plate). Derive the formula for the radius of the $m$-th dark ring in this new configuration.