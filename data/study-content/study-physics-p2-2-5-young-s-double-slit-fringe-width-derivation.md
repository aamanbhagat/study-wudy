## 1. What it is — in plain English

Imagine you're watching ripples spread out on the surface of a pond after you've thrown two pebbles into it at the same time, very close to each other. Where the peaks of the ripples meet, they make an even bigger peak. Where a peak meets a trough, they cancel each other out, making flat water. This is called interference.

Now, picture light not as tiny bullets, but as these same kinds of waves. If you shine a light through two incredibly tiny, very close-together slits (like two pinholes), the light waves spread out from each of those slits. As these spreading waves overlap, they interfere with each other, just like the water ripples.

What you see on a screen placed some distance away isn't just two bright lines, but a pattern of alternating bright and dark lines or "fringes." The bright fringes are where the light waves from both slits arrive in sync and add up (constructive interference), making the light brighter. The dark fringes are where the light waves arrive out of sync and cancel each other out (destructive interference), making it dark. The "fringe width" is simply the distance between the center of one bright fringe and the center of the next bright fringe (or one dark fringe to the next dark fringe).

## 2. Why it matters — real-world applications

The Young's double-slit experiment is not just a historical curiosity; it's a foundational concept that underpins many modern technologies and scientific disciplines.

1.  **Spectroscopy and Astronomical Observation:** By analyzing the interference patterns produced when light passes through a diffraction grating (which is essentially a device with many, many parallel slits, an extension of the double-slit idea), scientists can determine the precise wavelengths of light emitted or absorbed by distant stars, galaxies, or chemical samples. This allows us to understand the chemical composition, temperature, and even velocity of celestial bodies. For example, the James Webb Space Telescope uses sophisticated interferometric techniques to analyze light from the early universe, revealing its secrets.
2.  **High-Precision Metrology and Sensing (e.g., LIGO):** Interferometers, which are devices that exploit wave interference, are used for incredibly precise measurements of length, displacement, and changes in refractive index. The Laser Interferometer Gravitational-Wave Observatory (LIGO), for instance, uses a massive Michelson interferometer to detect minuscule distortions in spacetime caused by gravitational waves. This technology relies directly on the principles of path difference and interference observed in Young's experiment.
3.  **Optical Data Storage and Lithography:** The ability to precisely control and understand light interference is crucial in technologies like Blu-ray discs, where data is read by a laser beam whose wavelength is comparable to the size of the data pits. In semiconductor manufacturing, photolithography uses interference patterns to etch incredibly fine circuit details onto silicon wafers, pushing the limits of miniaturization in microprocessors (e.g., Intel, TSMC).
4.  **Quantum Computing and Photonics:** At the heart of quantum mechanics is the wave-particle duality, famously demonstrated by the double-slit experiment even with single electrons or photons. Understanding how individual photons interfere is critical for developing quantum computers, quantum cryptography, and advanced photonic devices that manipulate light at its most fundamental level. Companies like IBM and Google are heavily invested in quantum computing research, where the wave nature of particles is paramount.
5.  **Aerospace Navigation and Remote Sensing:** High-resolution optical systems on satellites and spacecraft often employ interferometric principles for tasks like precise altitude determination, atmospheric sensing, and creating synthetic aperture radar images. The ability to measure tiny phase shifts in light waves, derived from interference, allows for highly accurate data collection in remote sensing applications.

## 3. Prerequisites — what you must know first

Before diving into the derivation, ensure you have a solid grasp of these fundamental concepts:

*   **Wave Nature of Light:** Light is an electromagnetic wave, characterized by its wavelength ($\lambda$), frequency ($f$), and speed ($c$). These are related by $c = \lambda f$.
*   **Superposition Principle:** When two or more waves overlap in space, the resultant displacement at any point and time is the vector sum of the displacements due of the individual waves.
*   **Interference (Constructive & Destructive):** The phenomenon where two or more waves superpose to form a resultant wave of greater, lower, or the same amplitude. Constructive interference occurs when waves are in phase (peaks meet peaks), leading to increased amplitude. Destructive interference occurs when waves are out of phase (peaks meet troughs), leading to decreased amplitude or cancellation.
*   **Path Difference:** The difference in the distance traveled by two waves from their sources to a point of observation. This difference determines whether interference is constructive or destructive.
*   **Trigonometry (especially for small angles):** Basic sine, cosine, and tangent functions for right-angled triangles. Crucially, for very small angles ($\theta$ in radians), $\sin\theta \approx \tan\theta \approx \theta$.
*   **Basic Geometry:** Understanding of similar triangles and properties of parallel lines.

## 4. The core idea — step by step

Let's break down the derivation of fringe width in Young's double-slit experiment.

### ### Step 1: The Setup

*   **Plain English Statement:** We start with a single light source that shines on a barrier with two tiny, very narrow slits cut into it. These slits are very close to each other. Far away, behind this barrier, we place a screen to observe the light pattern.
*   **Concrete Example:** Imagine a laser pointer shining through two extremely fine scratches made by a razor blade on a piece of aluminum foil. The light then hits a wall several meters away.
*   **Formal/Mathematical Version:**
    Let $S_1$ and $S_2$ be the two narrow, parallel slits.
    Let $d$ be the distance between the centers of the two slits.
    Let $D$ be the distance from the plane of the slits to the screen.
    We assume the light source is monochromatic (single wavelength, $\lambda$) and coherent (waves maintain a constant phase relationship).
*   **What Could Go Wrong:** Assuming the slits are wide (they must be narrow, comparable to the wavelength of light for distinct interference patterns) or that the light isn't coherent (incoherent light won't produce stable interference patterns).

### ### Step 2: Path Difference to a Point on the Screen

*   **Plain English Statement:** For light from each slit to reach any specific point on the screen, it travels a slightly different distance. This difference in distance is called the "path difference." It's the key to understanding interference.
*   **Concrete Example:** If you're standing exactly in the middle of two speakers, the sound reaches you at the same time (zero path difference). If you move to one side, the sound from the closer speaker reaches you a tiny bit sooner (a path difference exists).
*   **Formal/Mathematical Version:**
    Consider a point $P$ on the screen, at a vertical distance $y$ from the central axis (the point directly opposite the midpoint of the slits).
    The light from $S_1$ travels a distance $r_1$ to $P$.
    The light from $S_2$ travels a distance $r_2$ to $P$.
    The path difference, $\Delta x$, is given by:
    $$ \Delta x = r_2 - r_1 $$
    To simplify, we draw a line from $S_1$ perpendicular to the line $S_2P$. Let the point where it intersects be $K$. Then, $S_1P \approx KP$. The path difference $S_2P - S_1P \approx S_2P - KP = S_2K$.
    This forms a small right-angled triangle $S_1S_2K$. The angle $\angle S_2S_1K$ is approximately equal to the angle $\theta$ that the line $OP$ makes with the central axis.
    Therefore, the path difference can be expressed as:
    $$ \Delta x = d \sin\theta $$
*   **What Could Go Wrong:** Incorrectly assuming $S_1P$ and $S_2P$ are parallel lines (they are not, but for a distant screen, the rays are *almost* parallel) or misidentifying the sides of the triangle used for the path difference calculation. The approximation $S_1P \approx KP$ is valid because $D \gg d$.

### ### Step 3: Conditions for Constructive and Destructive Interference

*   **Plain English Statement:** Whether we see a bright spot (constructive interference) or a dark spot (destructive interference) at point P depends entirely on this path difference. If the path difference is a whole number of wavelengths, the waves reinforce. If it's a half-number of wavelengths, they cancel.
*   **Concrete Example:** Two identical waves. If one wave travels exactly one wavelength further than the other, their peaks still line up. If one travels half a wavelength further, a peak meets a trough.
*   **Formal/Mathematical Version:**
    For **constructive interference** (bright fringes), the path difference must be an integer multiple of the wavelength:
    $$ \Delta x = m\lambda $$
    where $m = 0, \pm 1, \pm 2, \dots$ ($m=0$ is the central bright fringe).

    For **destructive interference** (dark fringes), the path difference must be an odd multiple of half a wavelength:
    $$ \Delta x = (m + \frac{1}{2})\lambda $$
    where $m = 0, \pm 1, \pm 2, \dots$.
*   **What Could Go Wrong:** Confusing the conditions for constructive and destructive interference, or using the wrong integer values for $m$.

### ### Step 4: Relating Path Difference to Screen Position (using small angle approximation)

*   **Plain English Statement:** We now have two ways to express the path difference: one in terms of the slit separation and angle, and another in terms of wavelengths for interference. We need to connect the angle $\theta$ to the actual position $y$ on the screen.
*   **Concrete Example:** If you hold a ruler vertically at arm's length, a small angle change in your head corresponds to a small shift in where you see a mark on the ruler.
*   **Formal/Mathematical Version:**
    From Step 2, we have $\Delta x = d \sin\theta$.
    From the geometry of the setup, for a point $P$ at height $y$ on the screen, and the screen at distance $D$ from the slits, we have:
    $$ \tan\theta = \frac{y}{D} $$
    Since $D \gg d$ and we are typically looking at fringes close to the center, the angle $\theta$ is usually very small. For small angles (in radians):
    $$ \sin\theta \approx \tan\theta \approx \theta $$
    This is known as the **small angle approximation**.
    Using this approximation, we can write:
    $$ \sin\theta \approx \frac{y}{D} $$
*   **What Could Go Wrong:** Forgetting the small angle approximation is only valid for small angles. If the screen is too close or the point $P$ is very far from the central axis, this approximation breaks down, and the exact trigonometric functions must be used.

### ### Step 5: Deriving the Position of Fringes

*   **Plain English Statement:** Now we combine our understanding of path difference, interference conditions, and the geometry of the setup to find exactly where the bright and dark fringes appear on the screen.
*   **Concrete Example:** We're putting together the puzzle pieces: "path difference is $d \sin\theta$", "bright fringes happen when path difference is $m\lambda$", and "$\sin\theta$ is roughly $y/D$".
*   **Formal/Mathematical Version:**
    Substitute $\sin\theta \approx y/D$ into the path difference equation $\Delta x = d \sin\theta$:
    $$ \Delta x = d \frac{y}{D} $$
    Now, apply the conditions for interference:

    For **constructive interference** (bright fringes):
    $$ d \frac{y_m}{D} = m\lambda $$
    Solving for the position $y_m$ of the $m$-th bright fringe:
    $$ y_m = m \frac{\lambda D}{d} $$
    where $m = 0, \pm 1, \pm 2, \dots$. ($m=0$ is the central maximum at $y=0$).

    For **destructive interference** (dark fringes):
    $$ d \frac{y'_m}{D} = (m + \frac{1}{2})\lambda $$
    Solving for the position $y'_m$ of the $m$-th dark fringe:
    $$ y'_m = (m + \frac{1}{2}) \frac{\lambda D}{d} $$
    where $m = 0, \pm 1, \pm 2, \dots$.
*   **What Could Go Wrong:** Algebraic errors during rearrangement, or misinterpreting the meaning of $m$ for bright vs. dark fringes.

### ### Step 6: Deriving the Fringe Width

*   **Plain English Statement:** The "fringe width" is the distance between the centers of two consecutive bright fringes, or two consecutive dark fringes. Since the fringes are equally spaced, calculating the distance between the first and second bright fringe (or zeroth and first) will give us the general width.
*   **Concrete Example:** If the first bright stripe is at 2mm and the second is at 4mm, the fringe width is 2mm.
*   **Formal/Mathematical Version:**
    Let $\Delta y$ be the fringe width. We can find it by taking the difference between the positions of two consecutive bright fringes, say the $(m+1)$-th and the $m$-th bright fringe:
    $$ \Delta y = y_{m+1} - y_m $$
    Using the formula for bright fringe position:
    $$ y_{m+1} = (m+1) \frac{\lambda D}{d} $$
    $$ y_m = m \frac{\lambda D}{d} $$
    Subtracting $y_m$ from $y_{m+1}$:
    $$ \Delta y = (m+1) \frac{\lambda D}{d} - m \frac{\lambda D}{d} $$
    Factor out $\frac{\lambda D}{d}$:
    $$ \Delta y = ( (m+1) - m ) \frac{\lambda D}{d} $$
    $$ \Delta y = (1) \frac{\lambda D}{d} $$
    Thus, the fringe width is:
    $$ \Delta y = \frac{\lambda D}{d} $$
    We can verify this for dark fringes as well:
    $$ y'_{m+1} = ((m+1) + \frac{1}{2}) \frac{\lambda D}{d} = (m + \frac{3}{2}) \frac{\lambda D}{d} $$
    $$ y'_m = (m + \frac{1}{2}) \frac{\lambda D}{d} $$
    $$ \Delta y = y'_{m+1} - y'_m = ( (m + \frac{3}{2}) - (m + \frac{1}{2}) ) \frac{\lambda D}{d} = (1) \frac{\lambda D}{d} $$
    The fringe width is indeed the same for both bright and dark fringes.
*   **What Could Go Wrong:** Making algebraic errors during subtraction or forgetting that $\Delta y$ represents the distance between *consecutive* fringes.

## 5. Worked examples — multiple, with every step shown

### Example 1: Basic Fringe Width Calculation (Easy)

**Problem:** In a Young's double-slit experiment, the distance between the slits ($d$) is 0.2 mm, and the screen is placed 1.5 m away ($D$). If light of wavelength ($\lambda$) 600 nm is used, what is the fringe width ($\Delta y$)?

**Given:**
*   Slit separation, $d = 0.2 \text{ mm}$
*   Screen distance, $D = 1.5 \text{ m}$
*   Wavelength, $\lambda = 600 \text{ nm}$

**Wanted:** Fringe width, $\Delta y$.

**Solution:**

1.  **Convert all units to SI (meters):**
    *   $d = 0.2 \text{ mm} = 0.2 \times 10^{-3} \text{ m}$
        *   *Explanation:* The standard unit for length in physics is meters. Millimeters need to be converted to meters by dividing by 1000, or multiplying by $10^{-3}$.
    *   $D = 1.5 \text{ m}$ (already in meters)
    *   $\lambda = 600 \text{ nm} = 600 \times 10^{-9} \text{ m} = 6 \times 10^{-7} \text{ m}$
        *   *Explanation:* Nanometers need to be converted to meters by dividing by $10^9$, or multiplying by $10^{-9}$.

2.  **Recall the formula for fringe width:**
    $$ \Delta y = \frac{\lambda D}{d} $$
    *   *Explanation:* This is the derived formula for the spacing between consecutive bright or dark fringes, assuming small angles and monochromatic light.

3.  **Substitute the converted values into the formula:**
    $$ \Delta y = \frac{(6 \times 10^{-7} \text{ m}) \times (1.5 \text{ m})}{0.2 \times 10^{-3} \text{ m}} $$
    *   *Explanation:* We are plugging in the values for wavelength ($\lambda$), screen distance ($D$), and slit separation ($d$) into the formula.

4.  **Perform the calculation:**
    $$ \Delta y = \frac{9 \times 10^{-7} \text{ m}^2}{0.2 \times 10^{-3} \text{ m}} $$
    $$ \Delta y = \frac{9}{0.2} \times 10^{-7 - (-3)} \text{ m} $$
    $$ \Delta y = 45 \times 10^{-4} \text{ m} $$
    $$ \Delta y = 4.5 \times 10^{-3} \text{ m} $$
    *   *Explanation:* First, multiply the numerator values. Then, divide the numerical coefficients and subtract the exponents of 10. Finally, adjust to standard scientific notation.

5.  **Convert the answer to a more convenient unit (e.g., mm):**
    $$ \Delta y = 4.5 \times 10^{-3} \text{ m} = 4.5 \text{ mm} $$
    *   *Explanation:* $1 \text{ mm} = 10^{-3} \text{ m}$, so multiplying by $10^3$ converts meters to millimeters.

**Final Answer:**
$$ \boxed{\Delta y = 4.5 \text{ mm}} $$

**Reflection:** This example was straightforward, primarily testing unit conversion and direct application of the formula. The trickiest part for beginners is often ensuring all units are consistent before calculation.

---

### Example 2: Finding Wavelength (Medium)

**Problem:** A double-slit experiment produces bright fringes that are 2.5 mm apart on a screen 2.0 m away. If the slits are separated by 0.3 mm, what is the wavelength of the light used?

**Given:**
*   Fringe width, $\Delta y = 2.5 \text{ mm}$
*   Screen distance, $D = 2.0 \text{ m}$
*   Slit separation, $d = 0.3 \text{ mm}$

**Wanted:** Wavelength, $\lambda$.

**Solution:**

1.  **Convert all units to SI (meters):**
    *   $\Delta y = 2.5 \text{ mm} = 2.5 \times 10^{-3} \text{ m}$
        *   *Explanation:* Convert millimeters to meters.
    *   $D = 2.0 \text{ m}$ (already in meters)
    *   $d = 0.3 \text{ mm} = 0.3 \times 10^{-3} \text{ m}$
        *   *Explanation:* Convert millimeters to meters.

2.  **Recall the formula for fringe width and rearrange for wavelength:**
    The formula is $\Delta y = \frac{\lambda D}{d}$.
    To solve for $\lambda$, multiply both sides by $d$ and divide by $D$:
    $$ \lambda = \frac{\Delta y \cdot d}{D} $$
    *   *Explanation:* We need to isolate $\lambda$. Multiplying by $d$ moves $d$ to the left side, and dividing by $D$ moves $D$ to the right side of the equation.

3.  **Substitute the converted values into the rearranged formula:**
    $$ \lambda = \frac{(2.5 \times 10^{-3} \text{ m}) \times (0.3 \times 10^{-3} \text{ m})}{2.0 \text{ m}} $$
    *   *Explanation:* Plug in the known values for $\Delta y$, $d$, and $D$.

4.  **Perform the calculation:**
    $$ \lambda = \frac{0.75 \times 10^{-6} \text{ m}^2}{2.0 \text{ m}} $$
    $$ \lambda = 0.375 \times 10^{-6} \text{ m} $$
    $$ \lambda = 3.75 \times 10^{-7} \text{ m} $$
    *   *Explanation:* Multiply the numerator values, then divide by the denominator. Adjust to standard scientific notation.

5.  **Convert the answer to nanometers (nm) for convenience, as wavelengths are often expressed this way:**
    $$ \lambda = 3.75 \times 10^{-7} \text{ m} = 375 \times 10^{-9} \text{ m} = 375 \text{ nm} $$
    *   *Explanation:* $1 \text{ nm} = 10^{-9} \text{ m}$, so multiplying by $10^9$ converts meters to nanometers.

**Final Answer:**
$$ \boxed{\lambda = 375 \text{ nm}} $$

**Reflection:** This example required algebraic manipulation of the formula before substitution. It also highlighted the importance of converting to appropriate units for the final answer (nm for visible light).

---

### Example 3: Finding Slit Separation (Medium-Hard)

**Problem:** A double-slit experiment uses light of wavelength 550 nm. The third-order bright fringe (m=3) is observed at a distance of 1.65 cm from the central maximum on a screen 1.8 m away. Calculate the separation between the slits.

**Given:**
*   Wavelength, $\lambda = 550 \text{ nm}$
*   Order of bright fringe, $m = 3$
*   Position of the $m=3$ bright fringe, $y_3 = 1.65 \text{ cm}$
*   Screen distance, $D = 1.8 \text{ m}$

**Wanted:** Slit separation, $d$.

**Solution:**

1.  **Convert all units to SI (meters):**
    *   $\lambda = 550 \text{ nm} = 550 \times 10^{-9} \text{ m} = 5.5 \times 10^{-7} \text{ m}$
        *   *Explanation:* Convert nanometers to meters.
    *   $y_3 = 1.65 \text{ cm} = 1.65 \times 10^{-2} \text{ m}$
        *   *Explanation:* Convert centimeters to meters.
    *   $D = 1.8 \text{ m}$ (already in meters)

2.  **Recall the formula for the position of a bright fringe:**
    $$ y_m = m \frac{\lambda D}{d} $$
    *   *Explanation:* This formula gives the position of the $m$-th bright fringe from the central maximum.

3.  **Rearrange the formula to solve for slit separation ($d$):**
    Multiply both sides by $d$:
    $$ y_m \cdot d = m \lambda D $$
    Divide both sides by $y_m$:
    $$ d = \frac{m \lambda D}{y_m} $$
    *   *Explanation:* We need to isolate $d$. We move $d$ to the numerator on the left and then move $y_m$ to the denominator on the right.

4.  **Substitute the converted values into the rearranged formula:**
    $$ d = \frac{(3) \times (5.5 \times 10^{-7} \text{ m}) \times (1.8 \text{ m})}{1.65 \times 10^{-2} \text{ m}} $$
    *   *Explanation:* Plug in the known values for $m$, $\lambda$, $D$, and $y_m$.

5.  **Perform the calculation:**
    $$ d = \frac{3 \times 5.5 \times 1.8 \times 10^{-7} \text{ m}^2}{1.65 \times 10^{-2} \text{ m}} $$
    $$ d = \frac{29.7 \times 10^{-7} \text{ m}^2}{1.65 \times 10^{-2} \text{ m}} $$
    $$ d = 18 \times 10^{-7 - (-2)} \text{ m} $$
    $$ d = 18 \times 10^{-5} \text{ m} $$
    $$ d = 1.8 \times 10^{-4} \text{ m} $$
    *   *Explanation:* Multiply the numerator values, then divide by the denominator. Subtract the exponents of 10. Adjust to standard scientific notation.

6.  **Convert the answer to millimeters (mm) for convenience:**
    $$ d = 1.8 \times 10^{-4} \text{ m} = 0.18 \times 10^{-3} \text{ m} = 0.18 \text{ mm} $$
    *   *Explanation:* $1 \text{ mm} = 10^{-3} \text{ m}$, so multiplying by $10^3$ converts meters to millimeters.

**Final Answer:**
$$ \boxed{d = 0.18 \text{ mm}} $$

**Reflection:** This example required using the formula for the position of a specific fringe, not directly the fringe width formula. It also involved more careful algebraic rearrangement and unit conversions.

---

### Example 4: Comparing Fringe Widths for Different Wavelengths (Hard)

**Problem:** In a double-slit experiment, yellow light ($\lambda_1 = 580 \text{ nm}$) produces a fringe width of 3.0 mm. If the same experimental setup (same $d$ and $D$) is then used with blue light ($\lambda_2 = 450 \text{ nm}$), what will be the new fringe width ($\Delta y_2$)?

**Given:**
*   Wavelength of yellow light, $\lambda_1 = 580 \text{ nm}$
*   Fringe width for yellow light, $\Delta y_1 = 3.0 \text{ mm}$
*   Wavelength of blue light, $\lambda_2 = 450 \text{ nm}$
*   Same setup implies $d$ and $D$ are constant.

**Wanted:** Fringe width for blue light, $\Delta y_2$.

**Solution:**

1.  **Understand the relationship:** The fringe width formula is $\Delta y = \frac{\lambda D}{d}$. Since $D$ and $d$ are constant for both cases, we can see that $\Delta y$ is directly proportional to $\lambda$.
    *   *Explanation:* This is a crucial insight. It means if we know the ratio of wavelengths, we know the ratio of fringe widths.

2.  **Set up a ratio:**
    For yellow light: $\Delta y_1 = \frac{\lambda_1 D}{d}$
    For blue light: $\Delta y_2 = \frac{\lambda_2 D}{d}$

    Divide the second equation by the first:
    $$ \frac{\Delta y_2}{\Delta y_1} = \frac{\frac{\lambda_2 D}{d}}{\frac{\lambda_1 D}{d}} $$
    *   *Explanation:* By taking the ratio, the unknown constants $D$ and $d$ will cancel out, simplifying the problem.

3.  **Simplify the ratio:**
    $$ \frac{\Delta y_2}{\Delta y_1} = \frac{\lambda_2}{\lambda_1} $$
    *   *Explanation:* The common terms $D$ and $d$ cancel out from the numerator and denominator.

4.  **Rearrange to solve for $\Delta y_2$:**
    $$ \Delta y_2 = \Delta y_1 \left( \frac{\lambda_2}{\lambda_1} \right) $$
    *   *Explanation:* Multiply both sides by $\Delta y_1$ to isolate $\Delta y_2$.

5.  **Substitute the given values (unit conversion is not strictly necessary here since it's a ratio, but good practice):**
    *   $\lambda_1 = 580 \text{ nm}$
    *   $\Delta y_1 = 3.0 \text{ mm}$
    *   $\lambda_2 = 450 \text{ nm}$

    $$ \Delta y_2 = (3.0 \text{ mm}) \left( \frac{450 \text{ nm}}{580 \text{ nm}} \right) $$
    *   *Explanation:* Plug in the known values. Since the units for $\lambda$ are the same (nm), they will cancel out, and the unit for $\Delta y_2$ will be the same as $\Delta y_1$ (mm).

6.  **Perform the calculation:**
    $$ \Delta y_2 = (3.0 \text{ mm}) \left( \frac{45}{58} \right) $$
    $$ \Delta y_2 \approx (3.0 \text{ mm}) \times (0.77586) $$
    $$ \Delta y_2 \approx 2.32758 \text{ mm} $$

7.  **Round to an appropriate number of significant figures:**
    $$ \Delta y_2 \approx 2.3 \text{ mm} $$
    *   *Explanation:* The given values have two or three significant figures, so the answer should reflect that precision.

**Final Answer:**
$$ \boxed{\Delta y_2 \approx 2.3 \text{ mm}} $$

**Reflection:** This example demonstrates how to use proportional reasoning to solve problems without needing to calculate $D$ or $d$ explicitly. It's a more efficient approach for comparative problems and highlights the direct relationship between wavelength and fringe width. The trick here is recognizing the constant factors and setting up a ratio.

## 6. Common mistakes and traps

1.  **Inconsistent Units:** This is the most frequent error. Students often mix millimeters, centimeters, nanometers, and meters in the same calculation without converting them to a single consistent unit (usually meters for SI).
    *   *Why it happens:* Lack of attention to detail or forgetting conversion factors ($1 \text{ mm} = 10^{-3} \text{ m}$, $1 \text{ nm} = 10^{-9} \text{ m}$).
2.  **Misapplying the Small Angle Approximation:** Using $\sin\theta \approx y/D$ when $\theta$ is not small. This occurs if $y$ is very large compared to $D$, or $D$ is too small.
    *   *Why it happens:* Over-reliance on the simplified formula without understanding its underlying assumptions.
3.  **Confusing Slit Separation ($d$) and Screen Distance ($D$):** Swapping these two variables in the formula.
    *   *Why it happens:* Both are distances, and their symbols are similar. Careful labeling in diagrams and problem statements helps.
4.  **Incorrectly Identifying $m$ for Dark Fringes:** For bright fringes, $m=0, 1, 2, \dots$ corresponds to the 0th, 1st, 2nd bright fringe. For dark fringes, $m=0$ corresponds to the *first* dark fringe, not the central one. The central point ($y=0$) is always a bright fringe ($m=0$).
    *   *Why it happens:* Not internalizing the specific conditions for constructive and destructive interference, especially the $(m+1/2)$ term.
5.  **Forgetting the Central Maximum ($m=0$):** Sometimes students start counting fringes from $m=1$, overlooking the central bright fringe at $y=0$.
    *   *Why it happens:* A natural inclination to start counting from "one," rather than "zero."
6.  **Algebraic Errors in Rearranging Formulas:** When solving for $d$, $\lambda$, or $D$, students sometimes make mistakes in moving terms around the equation.
    *   *Why it happens:* Rushing or not showing every step of algebraic manipulation.

## 7. Textbook-precise explanation

The Young's double-slit experiment, initially performed by Thomas Young in 1801, serves as a cornerstone demonstration of the wave nature of light and the principle of superposition.

Consider two coherent, monochromatic point sources of light, $S_1$ and $S_2$, separated by a distance $d$. These sources are typically idealized as narrow slits illuminated by a single primary source, ensuring coherence. A screen is placed at a distance $D$ from the plane containing the slits, where $D \gg d$.

Let $P$ be an arbitrary point on the screen at a vertical distance $y$ from the central axis $O$, which is equidistant from $S_1$ and $S_2$. The light waves from $S_1$ and $S_2$ travel distances $r_1$ and $r_2$, respectively, to reach point $P$. The optical path difference, $\Delta x$, between the waves arriving at $P$ is given by:
$$ \Delta x = r_2 - r_1 $$
From the geometry of the setup, drawing a line from $S_1$ perpendicular to $S_2P$, we form a right-angled triangle where the hypotenuse is $d$ and the side opposite the angle $\theta$ (the angle between the central axis and the line $OP$) is approximately $\Delta x$. Thus,
$$ \Delta x = d \sin\theta $$
For constructive interference (bright fringes) at point $P$, the path difference must be an integer multiple of the wavelength $\lambda$:
$$ \Delta x = m\lambda \quad \text{for } m = 0, \pm 1, \pm 2, \dots $$
For destructive interference (dark fringes) at point $P$, the path difference must be an odd multiple of half a wavelength:
$$ \Delta x = (m + \frac{1}{2})\lambda \quad \text{for } m = 0, \pm 1, \pm 2, \dots $$
(Note: Some texts use $m=1, 2, \dots$ for destructive interference with $(2m-1)\lambda/2$, which is equivalent.)

For the geometry relating the angle $\theta$ to the position $y$ on the screen, we have:
$$ \tan\theta = \frac{y}{D} $$
Given that $D \gg d$, the angle $\theta$ is typically very small for observable fringe patterns near the central maximum. Under the **small angle approximation**, where $\theta$ is expressed in radians:
$$ \sin\theta \approx \tan\theta \approx \theta $$
Therefore, we can approximate $\sin\theta \approx y/D$. Substituting this into the path difference equation:
$$ \Delta x = d \frac{y}{D} $$
Now, combining this with the interference conditions:

For **bright fringes** (constructive interference), the position $y_m$ of the $m$-th bright fringe is:
$$ d \frac{y_m}{D} = m\lambda $$
$$ y_m = m \frac{\lambda D}{d} $$
where $m=0$ corresponds to the central maximum.

For **dark fringes** (destructive interference), the position $y'_m$ of the $m$-th dark fringe is:
$$ d \frac{y'_m}{D} = (m + \frac{1}{2})\lambda $$
$$ y'_m = (m + \frac{1}{2}) \frac{\lambda D}{d} $$

The **fringe width**, $\Delta y$, is defined as the distance between the centers of two consecutive bright fringes (or two consecutive dark fringes). Using the bright fringe positions:
$$ \Delta y = y_{m+1} - y_m $$
$$ \Delta y = (m+1) \frac{\lambda D}{d} - m \frac{\lambda D}{d} $$
$$ \Delta y = (m+1 - m) \frac{\lambda D}{d} $$
$$ \Delta y = \frac{\lambda D}{d} $$
This formula demonstrates that the fringe width is directly proportional to the wavelength of light and the screen distance, and inversely proportional to the slit separation.

*Reference: Serway, Raymond A., and John W. Jewett Jr. *Physics for Scientists and Engineers*. 9th ed. Cengage Learning, 2014. Chapter 37, Section 37.2.*

## 8. ASCII diagrams

```text
                                         Screen
                                            ^
                                            | Y
                                            |
                                            |
                                            |  P (y)
                                            |  .
                                            | /|
                                            |/ |
      S1 ...................................O--|---- Central Axis (y=0)
          \  |                           /  |  |
           \ |                          /   |  |
            \|                         /    |  |
             \                        /     |  |
              \                      /      |  |
               \                    /       |  |
                \                  /        |  |
                 \                /         |  |
                  \              /          |  |
                   \            /           |  |
                    \          /            |  |
                     \        /             |  |
                      \      /              |  |
                       \    /               |  |
                        \  /                |  |
                         \/                 |  |
      S2 .................K.................|  |
           <---- d ---->  |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  |
                          |                 |  