## 1. What it is — in plain English

Imagine you have a picket fence, but instead of wooden slats, each "picket" is a tiny, perfectly clear opening, and the spaces in between are completely opaque. Now imagine that fence is incredibly small, with thousands of these tiny openings packed into just one centimeter. This super-fine "fence" is called a **diffraction grating**.

When light hits this special fence, something amazing happens. Instead of just blocking most of the light and letting a little bit through in a straight line, the light bends and spreads out in a very specific, organized way. It creates multiple bright lines or "spots" of light, fanning out from the grating, instead of just one central spot.

The "condition for maxima" is simply the rule that tells us *exactly where* these bright lines of light will appear. It’s a mathematical recipe that predicts the angles at which the light waves from all those tiny openings will perfectly team up, reinforcing each other to create maximum brightness. Think of it like a marching band where every musician plays their part perfectly in sync, creating a powerful, clear sound at specific locations in the audience.

It's fundamentally about how waves interact. When light waves pass through the many tiny openings of the grating, they spread out. These spreading waves then overlap and combine. At certain angles, their crests and troughs align perfectly, making the light extra bright (a "maximum"). At other angles, they cancel each other out, leaving darkness. The "condition for maxima" pinpoints those angles of perfect alignment.

## 2. Why it matters — real-world applications

The ability to precisely separate light into its constituent wavelengths using a diffraction grating is incredibly powerful and has a vast array of applications:

1.  **Spectroscopy in Astronomy and Chemistry:** Diffraction gratings are the heart of spectrometers, instruments used to analyze the light emitted or absorbed by substances. In astronomy, they allow scientists to determine the chemical composition, temperature, velocity, and even magnetic fields of distant stars and galaxies by analyzing their unique spectral "fingerprints." For example, NASA's James Webb Space Telescope uses gratings to study the atmospheres of exoplanets. In chemistry, they identify unknown compounds or quantify concentrations by analyzing how they interact with specific wavelengths of light.
2.  **CDs, DVDs, and Blu-ray Discs:** The rainbow patterns you see on the surface of these discs are a direct result of diffraction. The tiny, closely spaced pits and lands (bumps and flat areas) on the disc surface act like a diffraction grating. When light hits them, it diffracts and separates into its colors, revealing the underlying structure that stores data. This phenomenon is a visual side-effect, but the principle of diffraction is critical to how the laser "reads" the data by detecting subtle changes in the diffracted light.
3.  **Optical Communications and Fiber Optics:** In high-speed optical networks, diffraction gratings are used in devices like Wavelength Division Multiplexing (WDM) and Demultiplexing (DWDM) systems. These systems allow multiple data streams, each carried by a different wavelength of light, to be sent simultaneously down a single optical fiber. Gratings separate these wavelengths at the receiving end, enabling massive data transmission capacity. This is crucial for the internet infrastructure that connects the world.
4.  **Remote Sensing and Hyperspectral Imaging:** Satellites and aircraft equipped with hyperspectral imagers use diffraction gratings to collect light across hundreds of narrow, contiguous spectral bands. This allows for incredibly detailed analysis of Earth's surface. For instance, in agriculture, it can identify crop health, nutrient deficiencies, or pest infestations even before visible signs appear. In environmental monitoring, it can detect pollution plumes or map mineral deposits.
5.  **Laser Technology and Pulse Compression:** In advanced laser systems, especially those producing ultra-short pulses (femtoseconds or attoseconds), diffraction gratings are used for pulse compression. Different wavelengths within a laser pulse travel at slightly different speeds through optical materials. Gratings can be arranged to precisely re-align these wavelengths, compressing a chirped (stretched) pulse back into an incredibly short, high-intensity burst, which is vital for applications in material processing, medical surgery, and fundamental physics research.

## 3. Prerequisites — what you must know first

Before diving into the diffraction grating, ensure you have a solid grasp of these foundational concepts:

*   **Waves:** The basic properties of waves, including amplitude, wavelength ($\lambda$), frequency ($f$), and speed ($v$), and the relationship $v = f\lambda$.
*   **Superposition Principle:** The idea that when two or more waves overlap, the resultant displacement at any point is the algebraic sum of the individual displacements of the waves.
*   **Interference (Constructive and Destructive):** How waves combine. Constructive interference occurs when waves are in phase (crest meets crest, trough meets trough), leading to increased amplitude. Destructive interference occurs when waves are out of phase (crest meets trough), leading to cancellation.
*   **Phase:** The position of a point on a wave cycle. Waves are "in phase" if their crests and troughs align, and "out of phase" if they don't.
*   **Huygens' Principle:** Every point on a wavefront can be considered a source of secondary spherical wavelets that spread out in all directions with the speed of the wave. The new wavefront is the envelope of these wavelets.
*   **Young's Double-Slit Experiment:** The foundational experiment demonstrating wave interference with light, where light passing through two narrow slits creates an interference pattern of bright and dark fringes. Understanding the path difference leading to constructive and destructive interference in this setup is crucial.
*   **Path Difference:** The difference in distance traveled by two waves from their sources to a common observation point. This difference determines whether they interfere constructively or destructively.
*   **Trigonometry:** Basic trigonometric functions (sine, cosine, tangent) and their application to right-angled triangles.

## 4. The core idea — step by step

The core idea of the diffraction grating condition for maxima is to extend the concept of Young's double-slit experiment to many, many slits. When light passes through numerous equally spaced slits, the interference pattern becomes much sharper and brighter, but the underlying principle for constructive interference remains the same: waves must arrive in phase.

### ### Step 1: What is a Diffraction Grating?

*   **Plain English:** A diffraction grating isn't just one or two tiny openings (slits); it's a device with a very large number of extremely narrow, parallel slits or lines, all spaced at a uniform distance from each other. Imagine hundreds or thousands of double-slits placed side-by-side.
*   **Example:** If you have a grating with "1000 lines per millimeter," it means there are 1000 tiny transparent lines (slits) and 1000 opaque spaces packed into every millimeter. The distance between the center of one slit and the center of the next is called the grating spacing, $d$.
*   **Formal/Mathematical:** A diffraction grating is characterized by its grating element (or grating spacing), $d$, which is the distance between the centers of adjacent slits. If $N$ is the number of lines per unit length (e.g., lines/mm), then $d = 1/N$.
*   **What could go wrong:** Confusing the total width of the grating with the individual slit width or the grating spacing $d$. $d$ is the center-to-center distance between *adjacent* slits.

### ### Step 2: Light Passing Through Each Slit (Diffraction)

*   **Plain English:** When a plane wave of light (like from a laser) hits a single tiny slit, it doesn't just go straight through. Instead, it spreads out in all directions behind the slit, like ripples expanding when a pebble hits water. This bending and spreading is called diffraction.
*   **Example:** If you shine a laser pointer through a very tiny pinhole, you'll see a diffuse spot of light, not a sharp point. This is diffraction.
*   **Formal/Mathematical:** According to Huygens' Principle, each point within a slit acts as a source of secondary wavelets. These wavelets interfere to produce a diffraction pattern from a single slit. While important for understanding the *intensity distribution* within the maxima, for the *angles of the maxima*, we primarily focus on interference *between* slits.
*   **What could go wrong:** Forgetting that each slit itself diffracts light. While the "condition for maxima" primarily deals with interference *between* slits, the single-slit diffraction pattern modulates the intensity of the multi-slit interference pattern.

### ### Step 3: Interference from Multiple Slits

*   **Plain English:** Now, imagine light diffracting from *all* the thousands of slits in the grating. All these spreading waves overlap and combine. At most angles, they'll be out of sync and cancel each other out, resulting in darkness. But at certain special angles, they'll all be perfectly in sync.
*   **Example:** Think of many people talking at once in a room (diffraction from each person). If they all start chanting the same phrase at the same time, their voices combine and become much louder and clearer in specific directions (constructive interference).
*   **Formal/Mathematical:** The principle of superposition applies. The resultant wave at any point is the vector sum of the waves from all individual slits. For a large number of slits, the constructive interference peaks become very sharp and intense, while destructive interference is nearly complete everywhere else.
*   **What could go wrong:** Thinking that only adjacent slits interfere. *All* slits contribute to the interference pattern at any given point.

### ### Step 4: Condition for Constructive Interference (Maximal Brightness)

*   **Plain English:** For the waves from *all* the slits to reinforce each other and create a bright spot (a maximum), they must arrive at the observation point perfectly in phase. This means the path difference between waves from any two *adjacent* slits must be an integer multiple of the wavelength of the light.
*   **Example:** If wave A travels 1 meter and wave B travels 2 meters, their path difference is 1 meter. If the wavelength is 1 meter, they arrive in phase. If wave B traveled 1.5 meters, they'd be out of phase.
*   **Formal/Mathematical:** For constructive interference, the path difference $\Delta L$ between waves from adjacent slits must be an integer multiple of the wavelength $\lambda$:
    $$ \Delta L = m \lambda $$
    where $m$ is an integer ($m = 0, \pm 1, \pm 2, \ldots$).
*   **What could go wrong:** Forgetting that $m$ must be an *integer*. Half-integer multiples ($m \pm 1/2$) lead to destructive interference (minima).

### ### Step 5: Deriving the Path Difference Geometrically

*   **Plain English:** Let's look at two adjacent slits. When light hits them, it spreads out. We're interested in the light traveling off at a particular angle, $\theta$, relative to the original direction of the light. We can draw a right-angled triangle to figure out the extra distance one wave travels compared to its neighbor.
*   **Example:** Imagine two parallel lines (slits) separated by distance $d$. Draw a line perpendicular to these two slits. Now draw another line at an angle $\theta$ to the first line, originating from the first slit. From the second slit, drop a perpendicular line to this angled line. The short segment this creates is the path difference.
*   **Formal/Mathematical:** Consider two adjacent slits, separated by a distance $d$. Let parallel rays of light emerge from these slits at an angle $\theta$ with respect to the normal (the line perpendicular to the grating surface).
    ```text
    Incident light -> |    |    |    |
                     |    |    |    |
                     |----|----|----|---- Grating
                     S1   S2   S3   S4
                     | \  | \  | \  | \
                     |  \ |  \ |  \ |  \
                     |   \|   \|   \|   \  Diffracted light
                     |    \    \    \    \
                     |     \    \    \    \
                     |      \    \    \    \
                     |       \    \    \    \
                     |        \    \    \    \
                     |         \    \    \    \
                     |          \    \    \    \
                     |           \    \    \    \
                     |            \    \    \    \
                     |             \    \    \    \
                     P             Q    R    T    U  (Observation point, effectively at infinity)

    Where:
    S1, S2 are centers of adjacent slits.
    d is the distance between S1 and S2.
    The dashed lines represent parallel rays traveling to a distant screen.
    The angle theta (θ) is the angle the diffracted rays make with the normal.
    From S2, drop a perpendicular to the ray from S1. Let this point be K.
    The segment S1K is the wavefront.
    The segment S2K is the path difference.

    From the geometry:
    S1S2 = d
    Angle S2S1K = 90 - θ (angle between normal and S1K)
    Angle S1KS2 = 90 degrees (by construction)
    Therefore, angle S1S2K = θ (angles in a right triangle sum to 180 degrees)

    The path difference, ΔL, is the length of the segment S2K.
    In the right-angled triangle S1S2K:
    $$ \sin \theta = \frac{\text{opposite}}{\text{hypotenuse}} = \frac{S2K}{S1S2} = \frac{\Delta L}{d} $$
    Rearranging this gives:
    $$ \Delta L = d \sin \theta $$
    ```
*   **What could go wrong:** Incorrectly identifying the angle $\theta$ or the sides of the right-angled triangle. $\theta$ is always measured from the normal (perpendicular) to the grating.

### ### Step 6: The Condition for Maxima

*   **Plain English:** Now we combine the two ideas: the path difference we just found geometrically must be equal to an integer multiple of the wavelength for constructive interference. This gives us the final formula for where the bright spots will appear.
*   **Example:** If you're given the grating spacing $d$ and the wavelength $\lambda$, you can plug in $m=1$ to find the angle of the first bright spot, or $m=2$ for the second, and so on.
*   **Formal/Mathematical:** By equating the path difference from Step 5 with the condition for constructive interference from Step 4:
    $$ d \sin \theta = m \lambda $$
    Where:
    *   $d$ is the grating spacing (distance between centers of adjacent slits).
    *   $\theta$ is the angle of the maximum (bright spot) relative to the normal.
    *   $m$ is the order of the maximum (an integer: $0, \pm 1, \pm 2, \ldots$).
    *   $\lambda$ is the wavelength of the light.
*   **What could go wrong:** Forgetting units! $d$ and $\lambda$ must be in the same units (e.g., meters, nanometers). $\theta$ is an angle and should be handled consistently (e.g., if using a calculator, ensure it's in degrees or radians as appropriate for the $\sin$ function).

### ### Step 7: The Order of Maxima ($m$)

*   **Plain English:** The integer $m$ tells you which bright spot you're looking at.
    *   $m=0$: This is the "central maximum." It's directly in front of the grating (angle $\theta=0^\circ$). All wavelengths arrive perfectly in phase here, so it's always white light (if the incident light is white) and usually the brightest.
    *   $m=1$: This is the "first-order maximum." There's one on each side of the central maximum.
    *   $m=2$: This is the "second-order maximum," further out from the central maximum, and so on.
*   **Example:** If you shine white light through a grating, you'll see a central white band ($m=0$), then a rainbow spectrum on either side ($m=1$), then another rainbow spectrum further out ($m=2$), and so forth, until the light becomes too dim or the angles become too large.
*   **Formal/Mathematical:** The integer $m$ is referred to as the "order" of the maximum.
    *   $m=0 \implies \sin \theta = 0 \implies \theta = 0^\circ$. This is the central, undeviated maximum.
    *   $m=1 \implies d \sin \theta = \lambda$. This is the first-order maximum.
    *   $m=2 \implies d \sin \theta = 2\lambda$. This is the second-order maximum.
    *   Negative values of $m$ correspond to maxima on the other side of the central maximum (e.g., $m=-1$ is the first-order maximum on the opposite side).
*   **What could go wrong:** Forgetting about the $m=0$ central maximum. Also, sometimes students forget that there are positive and negative orders, representing symmetrical patterns on either side of the central maximum.

## 5. Worked examples — multiple, with every step shown

### Example 1: Finding the Angle of a Maximum

**Problem:** A diffraction grating has 5000 lines per centimeter. Monochromatic light with a wavelength of 600 nm is incident normally on the grating. Calculate the angle at which the first-order maximum ($m=1$) is observed.

**Given:**
*   Number of lines per centimeter ($N$) = 5000 lines/cm
*   Wavelength ($\lambda$) = 600 nm
*   Order of maximum ($m$) = 1

**Want:**
*   Angle of the maximum ($\theta$)

**Step-by-step solution:**

1.  **Convert wavelength to a consistent unit (meters or cm):**
    $$ \lambda = 600 \text{ nm} = 600 \times 10^{-9} \text{ m} = 6.00 \times 10^{-7} \text{ m} $$
    *Explanation:* Nanometers (nm) are a common unit for wavelength, but we need to convert it to meters to be consistent with the grating spacing which we'll derive in meters. 1 nm = $10^{-9}$ m.

2.  **Calculate the grating spacing ($d$) from the number of lines per centimeter:**
    $$ d = \frac{1}{N} $$
    $$ d = \frac{1}{5000 \text{ lines/cm}} = 0.0002 \text{ cm/line} $$
    *Explanation:* The grating spacing $d$ is the distance between the centers of adjacent lines. If there are $N$ lines in a unit length, then the distance per line (which is $d$) is $1/N$.

3.  **Convert grating spacing ($d$) to meters:**
    $$ d = 0.0002 \text{ cm} = 0.0002 \times 10^{-2} \text{ m} = 2.00 \times 10^{-6} \text{ m} $$
    *Explanation:* To maintain consistency with the wavelength in meters, we convert centimeters to meters. 1 cm = $10^{-2}$ m.

4.  **Apply the diffraction grating formula for maxima:**
    $$ d \sin \theta = m \lambda $$
    *Explanation:* This is the fundamental condition for constructive interference (maxima) in a diffraction grating.

5.  **Substitute the known values into the formula:**
    $$ (2.00 \times 10^{-6} \text{ m}) \sin \theta = (1) (6.00 \times 10^{-7} \text{ m}) $$
    *Explanation:* We've plugged in $d$, $m$, and $\lambda$.

6.  **Solve for $\sin \theta$:**
    $$ \sin \theta = \frac{(1) (6.00 \times 10^{-7} \text{ m})}{2.00 \times 10^{-6} \text{ m}} $$
    $$ \sin \theta = \frac{6.00 \times 10^{-7}}{2.00 \times 10^{-6}} = 0.300 $$
    *Explanation:* Isolate $\sin \theta$ by dividing both sides by $d$. Notice the units cancel out, as $\sin \theta$ is a dimensionless ratio.

7.  **Calculate $\theta$ using the inverse sine function:**
    $$ \theta = \arcsin(0.300) $$
    $$ \theta \approx 17.46^\circ $$
    *Explanation:* To find the angle itself, we use the inverse sine (or $\sin^{-1}$) function. Ensure your calculator is in degree mode if you want the answer in degrees.

**Final Answer:** The first-order maximum is observed at an angle of $\boxed{17.46^\circ}$.

**Reflection:** This example was straightforward, primarily testing unit conversion and direct application of the formula. The trickiest part for students is often correctly calculating $d$ from lines/cm or lines/mm and ensuring consistent units.

---

### Example 2: Determining Grating Spacing

**Problem:** A diffraction grating produces a second-order maximum ($m=2$) for light with a wavelength of 550 nm at an angle of $33.0^\circ$ from the central maximum. Calculate the grating spacing ($d$) and the number of lines per millimeter ($N$) for this grating.

**Given:**
*   Order of maximum ($m$) = 2
*   Wavelength ($\lambda$) = 550 nm
*   Angle of maximum ($\theta$) = $33.0^\circ$

**Want:**
*   Grating spacing ($d$)
*   Number of lines per millimeter ($N$)

**Step-by-step solution:**

1.  **Convert wavelength to meters:**
    $$ \lambda = 550 \text{ nm} = 550 \times 10^{-9} \text{ m} = 5.50 \times 10^{-7} \text{ m} $$
    *Explanation:* Standardizing units to meters for consistency.

2.  **Apply the diffraction grating formula for maxima:**
    $$ d \sin \theta = m \lambda $$
    *Explanation:* This is the core equation relating all the quantities.

3.  **Substitute the known values into the formula:**
    $$ d \sin(33.0^\circ) = (2) (5.50 \times 10^{-7} \text{ m}) $$
    *Explanation:* Plug in $m$, $\lambda$, and $\theta$. Remember to use degrees for the $\sin$ function.

4.  **Calculate $\sin(33.0^\circ)$:**
    $$ \sin(33.0^\circ) \approx 0.5446 $$
    *Explanation:* Evaluate the sine function.

5.  **Solve for $d$:**
    $$ d (0.5446) = 1.10 \times 10^{-6} \text{ m} $$
    $$ d = \frac{1.10 \times 10^{-6} \text{ m}}{0.5446} $$
    $$ d \approx 2.0198 \times 10^{-6} \text{ m} $$
    *Explanation:* Isolate $d$ by dividing both sides by $\sin \theta$.

6.  **Calculate the number of lines per meter ($N_{meter}$):**
    $$ N_{meter} = \frac{1}{d} $$
    $$ N_{meter} = \frac{1}{2.0198 \times 10^{-6} \text{ m/line}} \approx 495100 \text{ lines/m} $$
    *Explanation:* Since $d$ is the distance per line, the number of lines per unit distance is $1/d$.

7.  **Convert lines per meter to lines per millimeter ($N_{mm}$):**
    $$ N_{mm} = N_{meter} \times \frac{1 \text{ m}}{1000 \text{ mm}} $$
    $$ N_{mm} = 495100 \text{ lines/m} \times \frac{1 \text{ m}}{1000 \text{ mm}} $$
    $$ N_{mm} \approx 495.1 \text{ lines/mm} $$
    *Explanation:* There are 1000 millimeters in 1 meter, so divide by 1000 to convert from lines/m to lines/mm.

**Final Answer:** The grating spacing is approximately $\boxed{2.02 \times 10^{-6} \text{ m}}$ (or 2020 nm), and the number of lines per millimeter is approximately $\boxed{495 \text{ lines/mm}}$.

**Reflection:** This example involved solving for $d$ and then converting it to a more practical unit (lines/mm). Students often make errors in the conversion of $d$ to $N$, either by multiplying instead of dividing, or by incorrect powers of 10.

---

### Example 3: Maximum Number of Orders Visible

**Problem:** A diffraction grating has a spacing of $1.5 \times 10^{-6}$ m. What is the maximum order ($m_{max}$) of visible light ($\lambda = 400 \text{ nm}$ to $700 \text{ nm}$) that can be observed using this grating?

**Given:**
*   Grating spacing ($d$) = $1.5 \times 10^{-6}$ m
*   Wavelength range ($\lambda$) = 400 nm to 700 nm

**Want:**
*   Maximum order ($m_{max}$)

**Step-by-step solution:**

1.  **Recall the condition for maxima:**
    $$ d \sin \theta = m \lambda $$
    *Explanation:* This is the fundamental equation.

2.  **Determine the maximum possible value for $\sin \theta$:**
    The maximum possible value for $\sin \theta$ is 1, which occurs when $\theta = 90^\circ$. At this angle, the diffracted light is parallel to the grating surface.
    *Explanation:* We are looking for the *maximum* order, which means we need the largest possible $m$. From the equation, $m = \frac{d \sin \theta}{\lambda}$. To maximize $m$, we need to maximize $\sin \theta$. The sine function's maximum value is 1.

3.  **Consider the wavelength that will yield the *largest* possible order:**
    From $m = \frac{d \sin \theta}{\lambda}$, to maximize $m$, we need to use the *smallest* possible wavelength, $\lambda_{min}$.
    $$ \lambda_{min} = 400 \text{ nm} = 400 \times 10^{-9} \text{ m} = 4.00 \times 10^{-7} \text{ m} $$
    *Explanation:* Since $\lambda$ is in the denominator, a smaller $\lambda$ results in a larger $m$. This means blue/violet light will have more orders visible than red light.

4.  **Substitute $d$, $\sin \theta_{max}$, and $\lambda_{min}$ into the formula to find $m_{max}$:**
    $$ (1.5 \times 10^{-6} \text{ m}) (1) = m_{max} (4.00 \times 10^{-7} \text{ m}) $$
    *Explanation:* We're setting $\sin \theta = 1$ to find the theoretical maximum $m$.

5.  **Solve for $m_{max}$:**
    $$ m_{max} = \frac{1.5 \times 10^{-6} \text{ m}}{4.00 \times 10^{-7} \text{ m}} $$
    $$ m_{max} = 3.75 $$
    *Explanation:* Divide by $\lambda_{min}$ to isolate $m_{max}$.

6.  **Interpret the result:**
    Since $m$ must be an integer (representing a distinct order of maximum), the maximum *observable* integer order is 3. An order of 4 would require $\sin \theta > 1$, which is impossible.
    *Explanation:* You can only observe whole orders. If the calculation gives a fractional order, you round down to the nearest integer, because the next order simply isn't physically possible.

**Final Answer:** The maximum order of visible light that can be observed is $\boxed{3}$.

**Reflection:** This problem introduces the concept of limiting angles and wavelengths. The key insight is that $\sin \theta$ cannot exceed 1, and to find the maximum order, you must use the smallest wavelength in the given range.

---

### Example 4: Angular Separation of Different Wavelengths

**Problem:** A diffraction grating with 600 lines/mm is illuminated by a mixture of two monochromatic light sources: one with $\lambda_1 = 480 \text{ nm}$ (blue) and another with $\lambda_2 = 640 \text{ nm}$ (red). Calculate the angular separation between their first-order maxima ($m=1$).

**Given:**
*   Grating density ($N$) = 600 lines/mm
*   Wavelength 1 ($\lambda_1$) = 480 nm
*   Wavelength 2 ($\lambda_2$) = 640 nm
*   Order of maximum ($m$) = 1

**Want:**
*   Angular separation ($\Delta \theta = \theta_2 - \theta_1$)

**Step-by-step solution:**

1.  **Calculate the grating spacing ($d$) in meters:**
    $$ d = \frac{1}{N} = \frac{1}{600 \text{ lines/mm}} = \frac{1}{600} \text{ mm/line} $$
    $$ d = \frac{1}{600} \times 10^{-3} \text{ m/line} \approx 1.6667 \times 10^{-6} \text{ m} $$
    *Explanation:* Convert lines/mm to mm/line, then to m/line (which is $d$).

2.  **Convert wavelengths to meters:**
    $$ \lambda_1 = 480 \text{ nm} = 480 \times 10^{-9} \text{ m} = 4.80 \times 10^{-7} \text{ m} $$
    $$ \lambda_2 = 640 \text{ nm} = 640 \times 10^{-9} \text{ m} = 6.40 \times 10^{-7} \text{ m} $$
    *Explanation:* Consistent units are crucial for calculations.

3.  **Apply the diffraction grating formula for the first wavelength ($\lambda_1$):**
    $$ d \sin \theta_1 = m \lambda_1 $$
    $$ (1.6667 \times 10^{-6} \text{ m}) \sin \theta_1 = (1) (4.80 \times 10^{-7} \text{ m}) $$
    *Explanation:* Set up the equation for the blue light.

4.  **Solve for $\sin \theta_1$ and then $\theta_1$:**
    $$ \sin \theta_1 = \frac{4.80 \times 10^{-7} \text{ m}}{1.6667 \times 10^{-6} \text{ m}} \approx 0.2880 $$
    $$ \theta_1 = \arcsin(0.2880) \approx 16.74^\circ $$
    *Explanation:* Calculate the sine value, then use arcsin to find the angle for the blue light.

5.  **Apply the diffraction grating formula for the second wavelength ($\lambda_2$):**
    $$ d \sin \theta_2 = m \lambda_2 $$
    $$ (1.6667 \times 10^{-6} \text{ m}) \sin \theta_2 = (1) (6.40 \times 10^{-7} \text{ m}) $$
    *Explanation:* Set up the equation for the red light.

6.  **Solve for $\sin \theta_2$ and then $\theta_2$:**
    $$ \sin \theta_2 = \frac{6.40 \times 10^{-7} \text{ m}}{1.6667 \times 10^{-6} \text{ m}} \approx 0.3840 $$
    $$ \theta_2 = \arcsin(0.3840) \approx 22.58^\circ $$
    *Explanation:* Calculate the sine value, then use arcsin to find the angle for the red light.

7.  **Calculate the angular separation:**
    $$ \Delta \theta = \theta_2 - \theta_1 $$
    $$ \Delta \theta = 22.58^\circ - 16.74^\circ $$
    $$ \Delta \theta = 5.84^\circ $$
    *Explanation:* The angular separation is simply the difference between the two angles.

**Final Answer:** The angular separation between the first-order maxima of the two wavelengths is $\boxed{5.84^\circ}$.

**Reflection:** This example demonstrates how gratings separate different wavelengths (dispersing light). It requires calculating two separate angles and then finding their difference. A common mistake is to try to combine the wavelengths too early or to forget to calculate both angles individually. Also, precision in intermediate steps is important to avoid rounding errors in the final difference.

## 6. Common mistakes and traps

1.  **Incorrect Calculation of Grating Spacing ($d$):** Students often confuse the number of lines per unit length ($N$) with $d$. If a grating has "X lines/mm", then $d = 1/X$ mm, not $X$ mm. Remember $d$ is a *distance*, and $N$ is a *density*.
2.  **Inconsistent Units:** Wavelength ($\lambda$) is often given in nanometers (nm), while grating spacing ($d$) might be calculated in millimeters (mm) or centimeters (cm). All lengths ($d$ and $\lambda$) *must* be converted to the same unit (e.g., meters) before plugging them into the formula.
3.  **Forgetting the Central Maximum ($m=0$):** The $m=0$ order always exists at $\theta=0^\circ$ and is usually the brightest. It's often forgotten when counting orders or considering the total number of maxima.
4.  **Mistaking $m$ for the Number of Maxima:** The integer $m$ represents the *order* of the maximum. So $m=1$ is the first order, $m=2$ is the second, etc. For a given $m$, there are usually *two* maxima (one on each side of the central maximum, corresponding to $+\theta$ and $-\theta$), except for $m=0$.
5.  **Incorrectly Using $\sin \theta > 1$:** When calculating the maximum possible order ($m_{max}$), students sometimes get a value like $m_{max} = 3.75$ and round up to 4. However, $\sin \theta$ cannot exceed 1, so if $m_{max}$ is calculated to be 3.75, the highest *integer* order that can actually be observed is 3.
6.  **Small Angle Approximation:** While $d \sin \theta \approx d \theta$ (for $\theta$ in radians) is valid for very small angles, it is generally *not* appropriate for diffraction grating problems unless explicitly stated or if $\theta$ is indeed very small (e.g., less than a few degrees). Always use $\sin \theta$ unless the problem context clearly allows for the approximation.

## 7. Textbook-precise explanation

A diffraction grating is an optical component with a periodic structure that diffracts light into several beams traveling in different directions, determined by the grating's periodicity and the wavelength of the incident light. The phenomenon is a result of the superposition of wavelets originating from each of the numerous coherently illuminated slits (or lines) of the grating.

Consider a transmission grating consisting of $N$ equally spaced parallel slits, each of width $a$, separated by a distance $d$ (the grating element or grating spacing). When a plane wave of monochromatic light with wavelength $\lambda$ is incident normally upon the grating, each slit acts as a source of secondary wavelets according to Huygens' Principle. These wavelets propagate and interfere in the far field (Fraunhofer diffraction).

For constructive interference to occur, leading to observed bright fringes or maxima, the path difference between light waves emanating from adjacent slits and traveling to a distant observation point (or focusing onto a screen at the focal plane of a lens) must be an integer multiple of the wavelength.

Let $\theta$ be the angle that the diffracted rays make with the normal to the grating surface. From the geometry, the path difference $\Delta L$ between rays from two adjacent slits separated by distance $d$ is given by $d \sin \theta$.

Therefore, the condition for constructive interference (maxima) is:

$$ d \sin \theta = m \lambda $$

where:
*   $d$ is the grating spacing (distance between the centers of adjacent slits).
*   $\theta$ is the angle of diffraction for the maximum, measured from the grating normal.
*   $m$ is an integer, representing the order of the maximum ($m = 0, \pm 1, \pm 2, \ldots$).
    *   $m=0$ corresponds to the central maximum, located at $\theta=0^\circ$.
    *   $m=\pm 1$ corresponds to the first-order maxima.
    *   $m=\pm 2$ corresponds to the second-order maxima, and so forth.
*   $\lambda$ is the wavelength of the monochromatic light.

The intensity distribution of the diffracted light also depends on the single-slit diffraction pattern (the envelope function) and the number of slits. For a large number of slits, the maxima become very sharp and narrow, and the intensity between the principal maxima is nearly zero. The angular dispersion, which is the change in diffraction angle with respect to wavelength, is given by $\frac{d\theta}{d\lambda} = \frac{m}{d \cos \theta}$, highlighting the grating's ability to separate different wavelengths.

(Refer to "Physics for Scientists and Engineers" by Serway & Jewett, Vol. 2, Chapter 38, or "Fundamentals of Physics" by Halliday, Resnick, & Walker, Chapter 36, for further rigorous treatment.)

## 8. ASCII diagrams

Here's an ASCII diagram illustrating the geometry for the diffraction grating condition for maxima:

```text
                                                Observation Screen (Far away)
                                                ----------------------------
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |  <-- Bright Spot (m-th order maximum)
                                                |                          |  <-- All diffracted rays arrive in phase
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
                                                |                          |
