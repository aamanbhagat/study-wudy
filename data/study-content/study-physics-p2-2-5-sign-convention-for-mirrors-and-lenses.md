## 1. What it is — in plain English

Imagine you're trying to give directions to someone, but you don't have a map. You might say, "Go forward two blocks, then turn left." But what if "forward" means different things to different people, or "left" depends on which way you're facing? It would be chaos!

In optics, when we're dealing with mirrors and lenses, we're essentially giving directions to light rays and objects. We need to measure distances, heights, and describe whether an image is real or virtual, upright or inverted. To do this consistently and avoid confusion, physicists came up with a set of rules called a "sign convention."

Think of it like the legend on a map or the compass directions (North, South, East, West). It's a standardized agreement on what counts as "positive" and what counts as "negative" for various quantities in our equations. For example, if a distance is measured in one direction, it might be positive, but if it's measured in the opposite direction, it's negative. This simple system allows us to use mathematical equations to accurately predict where images will form and what they'll look like, regardless of the specific mirror or lens we're using.

Without a sign convention, our calculations would be inconsistent, and we wouldn't be able to compare results or design complex optical systems reliably. It's the language that lets us translate the physical behavior of light into numbers that computers (and rocket scientists!) can understand and use.

## 2. Why it matters — real-world applications

The sign convention is not just an academic exercise; it's fundamental to designing and analyzing any optical system, from the simplest magnifying glass to the most sophisticated space telescope.

1.  **Corrective Eyewear (Spectacles & Contact Lenses):** Optometrists and optical engineers use sign conventions daily to prescribe and design lenses that correct vision problems like myopia (nearsightedness) or hyperopia (farsightedness). By precisely knowing the focal length of a lens (which has a specific sign based on whether it's converging or diverging) and the object distance (the eye's focal point), they can calculate the required image distance to form a clear image on the retina. An incorrect sign would lead to a completely wrong prescription, rendering the eyewear useless or even harmful.

2.  **Telescopes and Microscopes:** Building powerful optical instruments for scientific research (e.g., the Hubble Space Telescope, ground-based astronomical observatories, high-resolution electron microscopes) requires combining multiple lenses and mirrors. Each element's contribution to the final image's position, size, and orientation is governed by the sign convention. Engineers meticulously apply these rules to ensure that the light from a distant galaxy or a tiny cell is focused correctly, magnified appropriately, and free from distortions, allowing for groundbreaking discoveries in physics and biology.

3.  **Satellite Imaging and Remote Sensing (Aerospace):** Satellites like Landsat or Earth-observing systems on rockets carry sophisticated cameras and sensors to capture images of Earth's surface. These systems often use complex arrangements of mirrors and lenses (catadioptric systems) to collect light across various spectra. Accurate application of sign conventions is critical for designing the optical path, ensuring the image sensor is placed at the correct focal plane, and interpreting the captured data for applications ranging from weather forecasting to environmental monitoring and even military reconnaissance.

4.  **LiDAR Systems (Autonomous Vehicles & Rocket Landing):** Light Detection and Ranging (LiDAR) systems use lasers and optical detectors to create 3D maps of environments. In autonomous vehicles, LiDAR helps navigate by detecting obstacles. For rocket landing (e.g., SpaceX's Starship), LiDAR can provide precise altitude and velocity measurements relative to the ground. The optical components (lenses, mirrors, beam splitters) within a LiDAR unit must be precisely aligned and their properties (focal lengths, object/image distances) correctly signed to ensure the laser beam is accurately transmitted and the reflected light is correctly focused onto the detector, providing reliable distance data.

5.  **Optical Diagnostics in Rocket Engines:** Studying the combustion process inside rocket engines is crucial for optimizing performance and safety. Researchers use optical techniques, like spectroscopy and high-speed imaging, to analyze flame temperatures, fuel consumption, and exhaust composition. This involves using optical windows, lenses, and mirrors to direct and focus light from the engine's plume onto detectors. The sign convention ensures that the optical setup correctly captures and delivers the light, allowing scientists to gain insights into the extreme physics of rocket propulsion.

## 3. Prerequisites — what you must know first

Before diving deep into sign conventions, ensure you have a solid grasp of these fundamental optics concepts:

*   **Light as a Ray:** Understanding that for geometrical optics, light can be modeled as straight lines (rays) that travel in a specific direction.
*   **Reflection:** The phenomenon where light bounces off a surface, including the Law of Reflection (angle of incidence equals angle of reflection).
*   **Types of Mirrors:** Familiarity with plane mirrors, concave (converging) mirrors, and convex (diverging) mirrors, and their basic properties.
*   **Refraction:** The bending of light as it passes from one medium to another, governed by Snell's Law ($n_1 \sin\theta_1 = n_2 \sin\theta_2$).
*   **Types of Lenses:** Understanding converging (convex) lenses and diverging (concave) lenses, and their basic properties.
*   **Image Formation:** The ability to distinguish between real images (where light rays actually converge and can be projected onto a screen) and virtual images (where light rays only *appear* to diverge from a point, and cannot be projected).
*   **Focal Length:** The definition of focal length ($f$) for both mirrors and lenses – the distance from the pole/optical center where parallel rays converge (or appear to diverge from) after reflection/refraction.
*   **Principal Axis:** The main imaginary line passing through the center of curvature and the pole/optical center of a mirror or lens.
*   **Basic Algebra:** Proficiency in manipulating algebraic equations to solve for unknown variables.

## 4. The core idea — step by step

The most widely accepted sign convention in modern optics is the **New Cartesian Sign Convention**. It's based on a coordinate system, making it intuitive and consistent. Let's break it down step by step.

### Step 1: The Origin of All Measurements

**Plain-English Statement:** Every single distance you measure, whether it's how far away an object is or where an image forms, starts from a specific point on the mirror or lens. This point is like the "zero" on a ruler.

**Concrete Example:** Imagine you're standing in front of a curved mirror. Your distance from the mirror is measured from the very center point of that mirror's surface. If you're using a lens, you measure from the exact center of the lens.

**Formal/Mathematical Version:**
All distances are measured from the **pole (P)** of a mirror or the **optical center (O)** of a lens. This point is considered the origin (0,0) of the coordinate system.

**What could go wrong:** Measuring from the edge of the mirror/lens, or from the focal point instead of the pole/optical center. This will throw off all your distance calculations.

### Step 2: The Direction of Incident Light

**Plain-English Statement:** The direction that light travels *towards* the mirror or lens is considered the "positive" direction for our coordinate system. Everything measured *against* this direction will be negative.

**Concrete Example:** If light is coming from the left and hitting the mirror/lens, then distances measured to the right of the pole/optical center are positive. If light is coming from the right, then distances measured to the left are positive. This is crucial because it sets the "forward" direction for your problem.

**Formal/Mathematical Version:**
The direction of the incident (incoming) light is taken as the **positive x-axis**. Any distance measured in the direction of incident light is positive, and any distance measured opposite to the direction of incident light is negative.

**What could go wrong:** Arbitrarily choosing positive to the right, regardless of incident light. While often light comes from the left, this rule handles scenarios where light might come from the right (e.g., in multi-element systems where an image acts as a new object).

### Step 3: Heights Above and Below the Principal Axis

**Plain-English Statement:** Just like in a graph, anything above the main horizontal line (the principal axis) is positive, and anything below it is negative. This applies to the height of objects and images.

**Concrete Example:** If you place an arrow upright in front of a mirror, its height is positive. If the mirror forms an inverted (upside-down) image, the height of that image will be negative.

**Formal/Mathematical Version:**
Heights measured **upward** and perpendicular to the principal axis are taken as **positive**.
Heights measured **downward** and perpendicular to the principal axis are taken as **negative**.

**What could go wrong:** Forgetting to assign a negative sign to the height of an inverted image, which will lead to incorrect magnification calculations.

### Step 4: Object Distance ($u$) — Where the Object Is

**Plain-English Statement:** The distance from the object to the mirror/lens. For real objects (which is almost always the case in basic problems, where light originates from the object), this distance is always considered negative because the object is placed *against* the direction of incident light.

**Concrete Example:** If light comes from the left, the object is typically placed to the left of the mirror/lens. Since we defined the direction of incident light (left to right) as positive, measuring to the left (where the object is) makes the object distance negative.

**Formal/Mathematical Version:**
The **object distance ($u$)** is the distance of the object from the pole/optical center. For a real object, $u$ is always taken as **negative** because the object is placed in front of the mirror/lens, meaning the incident light travels from the object *towards* the mirror/lens. Distances measured against the direction of incident light are negative. (A virtual object, where converging rays *would* meet behind the mirror/lens, would have a positive $u$, but this is rare in introductory problems).

**What could go wrong:** Forgetting that $u$ is almost always negative for real objects. This is a very common mistake.

### Step 5: Image Distance ($v$) — Where the Image Forms

**Plain-English Statement:** The distance from the mirror/lens to where the image forms. This sign tells us if the image is real or virtual. If the image forms on the "same side" as the outgoing light (after reflection/refraction), it's real and positive. If it forms on the "opposite side" (where light only *appears* to come from), it's virtual and negative.

**Concrete Example:** For a concave mirror, if an image forms in front of the mirror (where light actually converges), it's a real image, and its distance ($v$) will be negative (because it's measured against incident light, but on the side where reflected light actually goes). For a convex lens, if an image forms on the opposite side of the lens from the object (where light actually converges), it's a real image, and its distance ($v$) will be positive (because it's measured in the direction of incident light).

**Formal/Mathematical Version:**
The **image distance ($v$)** is the distance of the image from the pole/optical center.
*   If the image is **real** (formed by actual intersection of light rays), $v$ is **positive** if it's on the side of *refracted/reflected* light (e.g., behind a lens, in front of a mirror).
*   If the image is **virtual** (formed by apparent intersection of light rays), $v$ is **negative** if it's on the side *opposite* to the refracted/reflected light (e.g., in front of a lens, behind a mirror).

Let's refine this for clarity:
*   For **mirrors**: Real images form in front of the mirror, so $v$ is **negative** (measured opposite to incident light). Virtual images form behind the mirror, so $v$ is **positive** (measured in the direction of incident light, if incident light is considered to pass through).
*   For **lenses**: Real images form on the opposite side of the lens from the object, so $v$ is **positive** (measured in the direction of incident light). Virtual images form on the same side as the object, so $v$ is **negative** (measured opposite to incident light).

This can be simplified:
*   **Real image**: Light rays actually converge. $v$ has the same sign as the direction of *outgoing* light.
*   **Virtual image**: Light rays only *appear* to converge/diverge. $v$ has the opposite sign to the direction of *outgoing* light.

**What could go wrong:** Confusing the sign of $v$ with whether the image is real or virtual. It's easy to mix up which sign corresponds to which type of image, especially when switching between mirrors and lenses. Always refer back to the "direction of incident light" rule.

### Step 6: Focal Length ($f$) — The Lens/Mirror's Power

**Plain-English Statement:** The focal length describes how strongly a mirror or lens converges or diverges light. Its sign depends on whether it's a converging or diverging element.

**Concrete Example:** A magnifying glass (convex lens) converges light, so its focal length is positive. A security mirror in a shop (convex mirror) diverges light, so its focal length is positive. A satellite dish (concave mirror) converges light, so its focal length is negative. A diverging spectacle lens (concave lens) has a negative focal length.

**Formal/Mathematical Version:**
The **focal length ($f$)** is the distance from the pole/optical center to the principal focus.
*   For **converging** optical elements (concave mirrors, convex lenses), $f$ is taken as **positive**.
*   For **diverging** optical elements (convex mirrors, concave lenses), $f$ is taken as **negative**.

This is a common convention, but some textbooks use the opposite for mirrors. The most consistent approach is to define focal length based on the *type* of element:
*   **Converging Lens (convex):** $f$ is **positive**.
*   **Diverging Lens (concave):** $f$ is **negative**.
*   **Converging Mirror (concave):** $f$ is **negative** (since its focal point is in front of the mirror, measured against incident light).
*   **Diverging Mirror (convex):** $f$ is **positive** (since its focal point is behind the mirror, measured in the direction of incident light).

This last definition for mirrors is consistent with the general rule: if the focal point is on the side of real light convergence, it's negative for mirrors. If it's on the side of virtual divergence, it's positive for mirrors.

**What could go wrong:** Incorrectly assigning the sign of $f$ based on the mirror/lens type. This is a critical input to the mirror/lens equation.

### Summary Table (New Cartesian Convention, Incident Light from Left)

| Quantity          | Symbol | Rule                                                                                                                                                                                                                                                                                                                                                                                                                              | Example Sign |
| :---------------- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| Object Distance   | $u$    | Distance from pole/optical center to object. Always negative for a real object (object on the "incident light" side, measured against incident light).                                                                                                                                                                                                                                                                               | **-**        |
| Image Distance    | $v$    | Distance from pole/optical center to image.                                                                                                                                                                                                                                                                                                                                                                                       |              |
|                   |        |   *   For **mirrors**: Real images form in front ($v$ is negative). Virtual images form behind ($v$ is positive).                                                                                                                                                                                                                                                                                                                 | **-** or **+** |
|                   |        |   *   For **lenses**: Real images form on the opposite side from object ($v$ is positive). Virtual images form on the same side as object ($v$ is negative).                                                                                                                                                                                                                                                                      | **-** or **+** |
| Focal Length      | $f$    | Distance from pole/optical center to focal point.                                                                                                                                                                                                                                                                                                                                                                                 |              |
|                   |        |   *   **Concave Mirror (converging):** $f$ is negative (focal point in front, measured against incident light).                                                                                                                                                                                                                                                                                                                   | **-**        |
|                   |        |   *   **Convex Mirror (diverging):** $f$ is positive (focal point behind, measured with incident light).                                                                                                                                                                                                                                                                                                                          | **+**        |
|                   |        |   *   **Convex Lens (converging):** $f$ is positive (focal point on opposite side, measured with incident light).                                                                                                                                                                                                                                                                                                                   | **+**        |
|                   |        |   *   **Concave Lens (diverging):** $f$ is negative (focal point on same side, measured against incident light).                                                                                                                                                                                                                                                                                                                    | **-**        |
| Object Height     | $h_o$  | Height of the object. Always positive for an upright object (above principal axis).                                                                                                                                                                                                                                                                                                                                               | **+**        |
| Image Height      | $h_i$  | Height of the image. Positive for upright images (above principal axis). Negative for inverted images (below principal axis).                                                                                                                                                                                                                                                                                                     | **+** or **-** |
| Radius of Curvature | $R$  | For mirrors, $R = 2f$. Its sign follows the sign of $f$.                                                                                                                                                                                                                                                                                                                                                                          | **-** or **+** |

## 5. Worked examples — multiple, with every step shown

We'll use the mirror equation and the thin lens equation, which are identical in form:

**Mirror/Thin Lens Equation:**
$$ \frac{1}{f} = \frac{1}{u} + \frac{1}{v} $$

**Magnification Equation:**
$$ M = \frac{h_i}{h_o} = -\frac{v}{u} $$
Where:
*   $f$ = focal length
*   $u$ = object distance
*   $v$ = image distance
*   $h_i$ = image height
*   $h_o$ = object height
*   $M$ = magnification

### Example 1: Concave Mirror, Real Image

**Problem Statement:** A 3 cm tall object is placed 20 cm in front of a concave mirror with a focal length of 15 cm. Determine the position, nature, and size of the image.

**Identify what's given and what we want:**
*   Given:
    *   Object height, $h_o = +3 \text{ cm}$ (positive because it's upright)
    *   Object distance, $u = -20 \text{ cm}$ (negative because it's a real object placed in front of the mirror, against incident light direction)
    *   Focal length, $f = -15 \text{ cm}$ (negative because it's a concave mirror, which is a converging mirror, and its focal point is in front of the mirror, against incident light direction)
*   Want:
    *   Image distance, $v$
    *   Image height, $h_i$
    *   Nature of the image (real/virtual, inverted/upright)

**Show every algebraic / logical step:**

1.  **Use the mirror equation to find the image distance ($v$):**
    $$ \frac{1}{f} = \frac{1}{u} + \frac{1}{v} $$
    We want to solve for $v$, so rearrange the equation:
    $$ \frac{1}{v} = \frac{1}{f} - \frac{1}{u} $$
    Now, substitute the given values with their correct signs:
    $$ \frac{1}{v} = \frac{1}{(-15 \text{ cm})} - \frac{1}{(-20 \text{ cm})} $$
    *Explanation:* We've plugged in $f = -15 \text{ cm}$ and $u = -20 \text{ cm}$ according to our sign convention. The double negative for $u$ will become a positive.

    $$ \frac{1}{v} = -\frac{1}{15 \text{ cm}} + \frac{1}{20 \text{ cm}} $$
    *Explanation:* Simplifying the signs.

    Find a common denominator for 15 and 20, which is 60:
    $$ \frac{1}{v} = -\frac{4}{60 \text{ cm}} + \frac{3}{60 \text{ cm}} $$
    *Explanation:* We converted the fractions to have a common denominator to allow for addition/subtraction.

    $$ \frac{1}{v} = -\frac{1}{60 \text{ cm}} $$
    *Explanation:* Perform the subtraction.

    Now, invert both sides to find $v$:
    $$ v = -60 \text{ cm} $$
    *Explanation:* The image distance is found by taking the reciprocal.

2.  **Interpret the image distance ($v$):**
    Since $v = -60 \text{ cm}$ is negative, the image forms **in front of the mirror**. For a mirror, an image formed in front is a **real image**.

3.  **Use the magnification equation to find the image height ($h_i$):**
    $$ M = \frac{h_i}{h_o} = -\frac{v}{u} $$
    We want to solve for $h_i$, so rearrange:
    $$ h_i = -h_o \left(\frac{v}{u}\right) $$
    Substitute the known values:
    $$ h_i = -(+3 \text{ cm}) \left(\frac{-60 \text{ cm}}{-20 \text{ cm}}\right) $$
    *Explanation:* We've plugged in $h_o = +3 \text{ cm}$, $v = -60 \text{ cm}$, and $u = -20 \text{ cm}$ with their correct signs.

    $$ h_i = -(3 \text{ cm}) (3) $$
    *Explanation:* Simplify the fraction $(-60)/(-20) = 3$.

    $$ h_i = -9 \text{ cm} $$
    *Explanation:* Perform the multiplication.

4.  **Interpret the image height ($h_i$):**
    Since $h_i = -9 \text{ cm}$ is negative, the image is **inverted** (upside down).
    Since $|h_i| = 9 \text{ cm}$ is larger than $|h_o| = 3 \text{ cm}$, the image is **magnified**.

**Final Answer:**
The image is formed at $\boxed{\text{-60 cm}}$ (60 cm in front of the mirror). It is a $\boxed{\text{real, inverted, and magnified}}$ image, with a height of $\boxed{\text{-9 cm}}$.

**Reflection on what made the example tricky:** The main trickiness here lies in consistently applying the negative signs for $u$ and $f$ for a concave mirror, and then correctly interpreting the negative $v$ and $h_i$ to describe the image's nature. A common mistake is forgetting the negative sign in $M = -v/u$.

### Example 2: Convex Lens, Virtual Image

**Problem Statement:** An object 5 cm tall is placed 10 cm in front of a convex lens with a focal length of 15 cm. Determine the position, nature, and size of the image.

**Identify what's given and what we want:**
*   Given:
    *   Object height, $h_o = +5 \text{ cm}$
    *   Object distance, $u = -10 \text{ cm}$ (real object, placed against incident light)
    *   Focal length, $f = +15 \text{ cm}$ (positive because it's a convex lens, which is a converging lens, and its focal point is on the opposite side, in the direction of incident light)
*   Want:
    *   Image distance, $v$
    *   Image height, $h_i$
    *   Nature of the image

**Show every algebraic / logical step:**

1.  **Use the thin lens equation to find the image distance ($v$):**
    $$ \frac{1}{f} = \frac{1}{u} + \frac{1}{v} $$
    Rearrange to solve for $v$:
    $$ \frac{1}{v} = \frac{1}{f} - \frac{1}{u} $$
    Substitute the given values with their correct signs:
    $$ \frac{1}{v} = \frac{1}{(+15 \text{ cm})} - \frac{1}{(-10 \text{ cm})} $$
    *Explanation:* $f = +15 \text{ cm}$ for a convex lens, and $u = -10 \text{ cm}$ for a real object.

    $$ \frac{1}{v} = \frac{1}{15 \text{ cm}} + \frac{1}{10 \text{ cm}} $$
    *Explanation:* Simplify the signs.

    Find a common denominator for 15 and 10, which is 30:
    $$ \frac{1}{v} = \frac{2}{30 \text{ cm}} + \frac{3}{30 \text{ cm}} $$
    *Explanation:* Converted fractions to common denominator.

    $$ \frac{1}{v} = \frac{5}{30 \text{ cm}} $$
    *Explanation:* Perform the addition.

    $$ \frac{1}{v} = \frac{1}{6 \text{ cm}} $$
    *Explanation:* Simplify the fraction.

    Now, invert both sides to find $v$:
    $$ v = +6 \text{ cm} $$
    *Explanation:* The image distance is found by taking the reciprocal.

2.  **Interpret the image distance ($v$):**
    Since $v = +6 \text{ cm}$ is positive, the image forms on the **opposite side of the lens from the object**. For a lens, an image formed on the opposite side is a **real image**.
    *Wait!* Let's re-check the problem statement. Object at 10cm, focal length 15cm. For a convex lens, if $u < f$, the image should be virtual.
    My $v$ calculation is correct, so let's re-evaluate the interpretation of $v$ for lenses.
    For lenses: Real images form on the opposite side of the lens from the object, so $v$ is **positive**. Virtual images form on the same side as the object, so $v$ is **negative**.
    My calculation gives $v = +6 \text{ cm}$. This means the image is on the opposite side of the lens. This would be a real image.
    However, for a convex lens, if the object is placed *within* the focal length ($u < f$), the image should be virtual, upright, and magnified. Here, $u = 10 \text{ cm}$ and $f = 15 \text{ cm}$, so $u < f$.
    Let's re-evaluate the calculation:
    $$ \frac{1}{v} = \frac{1}{15} - \frac{1}{-10} = \frac{1}{15} + \frac{1}{10} = \frac{2+3}{30} = \frac{5}{30} = \frac{1}{6} $$
    So $v = +6 \text{ cm}$.
    This result (positive $v$) indicates a real image for a convex lens. This contradicts the expected virtual image when $u < f$.
    Let's check the sign convention for $u$ again.
    "Object distance ($u$) is always taken as negative for a real object (object on the "incident light" side, measured against incident light)." This is correct.
    Let's check the sign convention for $f$ for a convex lens.
    "Convex Lens (converging): $f$ is positive (focal point on opposite side, measured with incident light)." This is correct.
    So, $1/v = 1/f - 1/u = 1/(+15) - 1/(-10) = 1/15 + 1/10 = (2+3)/30 = 5/30 = 1/6$.
    Therefore, $v = +6 \text{ cm}$.

    This means my initial expectation was wrong, or my interpretation of $u < f$ for a convex lens was flawed.
    Let's re-check the standard behavior of a convex lens:
    - If $u > 2f$: Real, inverted, diminished, between $f$ and $2f$.
    - If $u = 2f$: Real, inverted, same size, at $2f$.
    - If $f < u < 2f$: Real, inverted, magnified, beyond $2f$.
    - If $u = f$: Image at infinity.
    - If $u < f$: **Virtual, upright, magnified, on the same side as the object.**

    My calculation $v = +6 \text{ cm}$ means the image is on the opposite side of the lens (positive $v$). For a lens, an image on the opposite side is a *real* image. This is a contradiction.
    What went wrong? The calculation itself is correct based on the formula.
    Ah, the issue is that $u=10 \text{ cm}$ and $f=15 \text{ cm}$. When the object is placed *within* the focal length of a convex lens, the image is virtual.
    Let's re-do the calculation, carefully checking the signs.
    $f = +15 \text{ cm}$
    $u = -10 \text{ cm}$
    $$ \frac{1}{v} = \frac{1}{f} - \frac{1}{u} = \frac{1}{+15} - \frac{1}{-10} = \frac{1}{15} + \frac{1}{10} $$
    $$ \frac{1}{v} = \frac{2}{30} + \frac{3}{30} = \frac{5}{30} = \frac{1}{6} $$
    $$ v = +6 \text{ cm} $$
    The calculation is robust.
    The problem is with my interpretation of the sign convention for lenses.
    Let's check a standard textbook (e.g., Serway & Jewett, Physics for Scientists and Engineers).
    For a thin lens:
    - $f$ is positive for a converging lens (convex), negative for a diverging lens (concave). (My definition is correct).
    - $u$ is positive if the object is on the side from which light approaches the lens (real object). (My definition uses negative $u$ for real objects, which is the New Cartesian. This is where the difference might be. Let's stick to New Cartesian: $u$ is negative for real objects).
    - $v$ is positive if the image is on the side to which light *travels after passing through* the lens (real image). $v$ is negative if the image is on the side from which light approaches the lens (virtual image).

    Okay, so if I use my New Cartesian Convention:
    $u$ (object distance) is negative for real objects.
    $v$ (image distance) is positive for real images (on the side of transmitted light for lenses). $v$ is negative for virtual images (on the side of incident light for lenses).

    Let's re-do the calculation with $u = -10 \text{ cm}$ and $f = +15 \text{ cm}$.
    $$ \frac{1}{v} = \frac{1}{f} - \frac{1}{u} = \frac{1}{+15 \text{ cm}} - \frac{1}{-10 \text{ cm}} = \frac{1}{15 \text{ cm}} + \frac{1}{10 \text{ cm}} = \frac{2+3}{30 \text{ cm}} = \frac{5}{30 \text{ cm}} = \frac{1}{6 \text{ cm}} $$
    $$ v = +6 \text{ cm} $$
    This means the image is formed at $+6 \text{ cm}$ from the lens.
    According to my New Cartesian rule for lenses: "Real images form on the opposite side of the lens from the object, so $v$ is positive."
    This is consistent. A positive $v$ means a real image.
    But this is still contradicting the ray tracing for a convex lens with $u < f$.
    Let's use the most common convention in textbooks like Halliday, Resnick, Walker:
    1. Object distance $u$: Positive if object is real (light rays diverge from it). Negative if virtual.
    2. Image distance $v$: Positive if image is real (light rays converge to it). Negative if virtual.
    3. Focal length $f$: Positive for converging lens/mirror. Negative for diverging lens/mirror.

    This is the "real is positive, virtual is negative" convention. Let's try this one.
    **Common Convention (Real is Positive):**
    *   $u$: Positive for real objects.
    *   $v$: Positive for real images.
    *   $f$: Positive for converging (convex lens, concave mirror). Negative for diverging (concave lens, convex mirror).

    Let's re-do Example 1 with this convention: Concave mirror ($f$ is positive for converging, so $f = +15 \text{ cm}$), object at $u = +20 \text{ cm}$.
    $$ \frac{1}{v} = \frac{1}{f} - \frac{1}{u} = \frac{1}{+15} - \frac{1}{+20} = \frac{4-3}{60} = \frac{1}{60} $$
    $$ v = +60 \text{ cm} $$
    This means $v$ is positive, so it's a real image. This is consistent with a real image forming in front of a concave mirror. So far so good.

    Now, Example 2 with **Common Convention (Real is Positive):**
    *   Convex lens ($f$ is positive for converging, so $f = +15 \text{ cm}$).
    *   Object at $u = +10 \text{ cm}$ (real object).
    $$ \frac{1}{v} = \frac{1}{f} - \frac{1}{u} = \frac{1}{+15} - \frac{1}{+10} = \frac{2-3}{30} = -\frac{1}{30} $$
    $$ v = -30 \text{ cm} $$
    *Explanation:* With this convention, $v = -30 \text{ cm}$ means the image is **virtual**. This is consistent with the ray tracing for a convex lens with $u < f$. The image is formed on the same side as the object.

    Okay, this highlights a critical point: **There are different sign conventions.** The "New Cartesian" convention (incident light direction defines positive) is one, and "Real is Positive" is another. I must choose one and stick to it rigorously.

    For the rest of this lesson, I will use the **"Real is Positive" convention** as it seems less prone to confusion for beginners when interpreting $v$ and $f$. It's also often more intuitive for the $v$ sign (real image = positive $v$). I will explicitly state this convention.

    **Let's re-state the convention for the examples:**
    **Convention Used: "Real is Positive"**
    *   **Object Distance ($u$):** Positive for real objects (light diverges from it). Negative for virtual objects.
    *   **Image Distance ($v$):** Positive for real images (light converges to it, can be projected). Negative for virtual images (light appears to diverge from it, cannot be projected).
    *   **Focal Length ($f$):** Positive for converging lenses (convex) and converging mirrors (concave). Negative for diverging lenses (concave) and diverging mirrors (convex).
    *   **Object Height ($h_o$):** Positive if upright.
    *   **Image Height ($h_i$):** Positive if upright. Negative if inverted.
    *   **Magnification ($M$):** Positive if upright. Negative if inverted.

    Now, let's re-do the examples. My previous "New Cartesian" description was slightly inconsistent with how $f$ and $v$ were defined in some cases, which led to the confusion. The "Real is Positive" convention is simpler to apply consistently.

---
**Re-doing Example 1 with "Real is Positive" Convention:**

**Problem Statement:** A 3 cm tall object is placed 20 cm in front of a concave mirror with a focal length of 15 cm. Determine the position, nature, and size of the image.

**Identify what's given and what we want:**
*   Given:
    *   Object height, $h_o = +3 \text{ cm}$
    *   Object distance, $u = +20 \text{ cm}$ (positive because it's a real object)
    *   Focal length, $f = +15 \text{ cm}$ (positive because it's a concave mirror, which is a converging mirror)
*   Want: $v$, $h_i$, nature of the image.

**Show every algebraic / logical step:**

1.  **Use the mirror equation to find the image distance ($v$):**
    $$ \frac{1}{f} = \frac{1}{u} + \frac{1}{v} $$
    $$ \frac{1}{v} = \frac{1}{f} - \frac{1}{u} $$
    Substitute the given values:
    $$ \frac{1}{v} = \frac{1}{(+15 \text{ cm})} - \frac{1}{(+20 \text{ cm})} $$
    *Explanation:* $f = +15 \text{ cm}$ for a converging concave mirror, $u = +20 \text{ cm}$ for a real object.

    $$ \frac{1}{v} = \frac{4}{60 \text{ cm}} - \frac{3}{60 \text{ cm}} $$
    *Explanation:* Find common denominator (60).

    $$ \frac{1}{v} = \frac{1}{60 \text{ cm}} $$
    *Explanation:* Perform subtraction.

    $$ v = +60 \text{ cm} $$
    *Explanation:* Invert both sides.

2.  **Interpret the image distance ($v$):**
    Since $v = +60 \text{ cm}$ is positive, the image is **real**. For a mirror, real images form in front of the mirror.

3.  **Use the magnification equation to find the image height ($h_i$):**
    $$ M = \frac{h_i}{h_o} = -\frac{v}{u} $$
    $$ h_i = -h_o \left(\frac{v}{u}\right) $$
    Substitute the known values:
    $$ h_i = -(+3 \text{ cm}) \left(\frac{+60 \text{ cm}}{+20 \text{ cm}}\right) $$
    *Explanation:* $h_o = +3 \text{ cm}$, $v = +60 \text{ cm}$, $u = +20 \text{ cm}$. Note the negative sign in the formula.

    $$ h_i = -(3 \text{ cm}) (3) $$
    *Explanation:* Simplify the fraction $60/20 = 3$.

    $$ h_i = -9 \text{ cm} $$
    *Explanation:* Perform multiplication.

4.  **Interpret the image height ($h_i$):**
    Since $h_i = -9 \text{ cm}$ is negative, the image is **inverted**.
    Since $|h_i| = 9 \text{ cm}$ is larger than $|h_o| = 3 \text{ cm}$, the image is **magnified**.

**Final Answer:**
The image is formed at $\boxed{\text{+60 cm}}$ (60 cm in front of the mirror, real). It is a $\boxed{\text{real, inverted, and magnified}}$ image, with a height of $\boxed{\text{-9 cm}}$.

---
**Re-doing Example 2 with "Real is Positive" Convention:**

**Problem Statement:** An object 5 cm tall is placed 10 cm in front of a convex lens with a focal length of 15 cm. Determine the position, nature, and size of the image.

**Identify what's given and what we want:**
*   Given:
    *   Object height, $h_o = +5 \text{ cm}$
    *   Object distance, $u = +10 \text{ cm}$ (positive for a real object)
    *   Focal length, $f = +15 \text{ cm}$ (positive for a converging convex lens)
*   Want: $v$, $h_i$, nature of the image.

**Show every algebraic / logical step:**

1.  **Use the thin lens equation to find the image distance ($v$):**
    $$ \frac{1}{f} = \frac{1}{u} + \frac{1}{v} $$
    $$ \frac{1}{v} = \frac{1}{f} - \frac{1}{u} $$
    Substitute the given values:
    $$ \frac{1}{v} = \frac{1}{(+15 \text{ cm})} - \frac{1}{(+10 \text{ cm})} $$
    *Explanation:* $f = +15 \text{ cm}$ for a convex lens, $u = +10 \text{ cm}$ for a real object.

    $$ \frac{1}{v} = \frac{2}{30 \text{ cm}} - \frac{3}{30 \text{ cm}} $$
    *Explanation:* Find common denominator (30).

    $$ \frac{1}{v} = -\frac{1}{30 \text{ cm}} $$
    *Explanation:* Perform subtraction.

    $$ v = -30 \text{ cm} $$
    *Explanation:* Invert both sides.

2.  **Interpret the image distance ($v$):**
    Since $v = -30 \text{ cm}$ is negative, the image is **virtual**. For a lens, virtual images form on the same side as the object. This is consistent with $u < f$ for a convex lens.

3.  **Use the magnification equation to find the image height ($h_i$):**
    $$ M = \frac{h_i}{h_o} = -\frac{v}{u} $$
    $$ h_i = -h_o \left(\frac{v}{u}\right) $$
    Substitute the known values:
    $$ h_i = -(+5 \text{ cm}) \left(\frac{-30 \text{ cm}}{+10 \text{ cm}}\right) $$
    *Explanation:* $h_o = +5 \text{ cm}$, $v = -30 \text{ cm}$, $u = +10 \text{ cm}$. Note the negative sign in the formula.

    $$ h_i = -(5 \text{ cm}) (-3) $$
    *Explanation:* Simplify the fraction $(-30)/(+10) = -3$.

    $$ h_i = +15 \text{ cm} $$
    *Explanation:* Perform multiplication.

4.  **Interpret the image height ($h_i$):**
    Since $h_i = +15 \text{ cm}$ is positive, the image is **upright**.
    Since $|h_i| = 15 \text{ cm}$ is larger than $|h_o| = 5 \text{ cm}$, the image is **magnified**.

**Final Answer:**
The image is formed at $\boxed{\text{-30 cm}}$ (30 cm in front of the lens, virtual). It is a $\boxed{\text{virtual, upright, and magnified}}$ image, with a height of $\boxed{\text{+15 cm}}$.

**Reflection on what made the example tricky:** The primary challenge here was the initial confusion with sign conventions. Once a consistent convention ("Real is Positive") was chosen, the calculations flowed correctly. It's easy to get lost if you mix conventions or misinterpret the meaning of a positive/negative $v$ for different optical elements. For convex lenses, remembering that $u < f$ always yields a virtual image is a good check.

### Example 3: Concave Lens, Virtual Image

**Problem Statement:** A 4 cm tall object is placed 12 cm in front of a concave lens. The image formed is virtual and located 6 cm from the lens. Determine the focal length of the lens and the height of the image.

**Identify what's given and what we want:**
*   Given:
    *   Object height, $h_o = +4 \text{ cm}$
    *   Object distance, $u = +12 \text{ cm}$ (positive for a real object)
    *   Image distance, $v = -6 \text{ cm}$ (negative because it's a virtual image, as stated, and for a lens, virtual images are on the same side as the object)
*   Want:
    *   Focal length, $f$
    *   Image height, $h_i$

**Show every algebraic / logical step:**

1.  **Use the thin lens equation to find the focal length ($f$):**
    $$ \frac{1}{f} = \frac{1}{u} + \frac{1}{v} $$
    Substitute the given values with their correct signs:
    $$ \frac{1}{f} = \frac{1}{(+12 \text{ cm})} + \frac{1}{(-6 \text{ cm})} $$
    *Explanation:* $u = +12 \text{ cm}$ for a real object, $v = -6 \text{ cm}$ for a virtual image.

    $$ \frac{1}{f} = \frac{1}{12 \text{ cm}} - \frac{1}{6 \text{ cm}} $$
    *Explanation:* Simplify the signs.

    Find a common denominator for 12 and 6, which is 12:
    $$ \frac{1}{f} = \frac{1}{12 \text{ cm}} - \frac{2}{12 \text{ cm}} $$
    *Explanation:* Converted fractions to common denominator.

    $$ \frac{1}{f} = -\frac{1}{12 \text{ cm}} $$
    *Explanation:* Perform the subtraction.

    Now, invert both sides to find $f$:
    $$ f = -12 \text{ cm} $$
    *Explanation:* The focal length is found by taking the reciprocal.

2.  **Interpret the focal length ($f$):**
    Since $f = -12 \text{ cm}$ is negative, this confirms that the lens is a **concave (diverging) lens**, which is consistent with the problem statement.

3.  **Use the magnification equation to find the image height ($h_i$):**
    $$ M = \frac{h_i}{h_o} = -\frac{v}{u} $$
    $$ h_i = -h_o \left(\frac{v}{u}\right) $$
    Substitute the known values:
    $$ h_i = -(+4 \text{ cm}) \left(\frac{-6 \text{ cm}}{+12 \text{ cm}}\right) $$
    *Explanation:* $h_o = +4 \text{ cm}$, $v = -6 \text{ cm}$, $u = +12 \text{ cm}$.

    $$ h_i = -(4 \text{ cm}) \left(-\frac{1}{2}\right) $$
    *Explanation:* Simplify the fraction $(-6)/(+12) = -1/2$.

    $$ h_i = +2 \text{ cm} $$
    *Explanation:* Perform multiplication.

4.  **Interpret the image height ($h_i$):**
    Since $h_i = +2 \text{ cm}$ is positive, the image is **upright**.
    Since $|h_i| = 2 \text{ cm}$ is smaller than $|h_o| = 4 \text{ cm}$, the image is **diminished**.

**Final Answer:**
The focal length of the lens is $\boxed{\text{-12 cm}}$. The image height is $\boxed{\text{+2 cm}}$, meaning it is an $\boxed{\text{upright, diminished}}$ image.

**Reflection on what made the example tricky:** This example required working backward to find the focal length. The key was correctly assigning the negative sign to the image distance ($v$) because the problem explicitly stated it was a virtual image. If one forgot that a concave lens *always* forms a virtual image for a real object, and thus $v$ must be negative, the calculation would be incorrect.

### Example 4: Two-Lens System (Harder)

**Problem Statement:** An object 2 cm tall is placed 30 cm in front of a convex lens (Lens 1) with a focal length of 10 cm. A second concave lens (Lens 2) with a focal length of 12 cm is placed 20 cm behind the first lens. Find the position, nature, and size of the final image formed by the two-lens system.

**Identify what's given and what we want:**
*   **Lens 1 (Convex):**
    *   $h_o = +2 \text{ cm}$
    *   $u_1 = +30 \text{ cm}$ (real object)
    *   $f_1 = +10 \text{ cm}$ (convex lens is converging)
*   **Lens 2 (Concave):**
    *   $f_2 = -12 \text{ cm}$ (concave lens is diverging)
*   **Separation:** Distance between lenses, $d = 20 \text{ cm}$
*   Want: Final $v_2$, final $h_{i2}$, nature of final image.

**Show every algebraic / logical step:**

**Part 1: Image formation by Lens 1**

1.  **Use the thin lens equation for Lens 1 to find $v_1$:**
    $$ \frac{1}{f_1} = \frac{1}{u_1} + \frac{1}{v_1} $$
    $$ \frac{1}{v_1} = \frac{1}{f_1} - \frac{1}{u_1} $$
    Substitute values:
    $$ \frac{1}{v_1} = \frac{1}{(+10 \text{ cm})} - \frac{1}{(+30 \text{ cm})} $$
    *Explanation:* $f_1 = +10 \text{ cm}$ (convex), $u_1 = +30 \text{ cm}$ (real object).

    $$ \frac{1}{v_1} = \frac{3}{30 \text{ cm}} - \frac{1}{30 \text{ cm}} $$
    *Explanation:* Common denominator is 30.

    $$ \frac{1}{v_1} = \frac{2}{30 \text{ cm}} = \frac{1}{15 \text{ cm}} $$
    *Explanation:* Perform subtraction and simplify.

    $$ v_1 = +15 \text{ cm} $$
    *Explanation:* Invert both sides.

2.  **Interpret $v_1$ and calculate $h_{i1}$:**
    Since $v_1 = +15 \text{ cm}$ is positive, the image formed by Lens 1 ($I_1$) is **real**. It forms 15 cm *behind* Lens 1 (on the opposite side from the object).

    Now calculate the magnification and height of this intermediate image:
    $$ M_1 = -\frac{v_1}{u_1} = -\frac{+15 \text{ cm}}{+30 \text{ cm}} = -\frac{1}{2} $$
    *Explanation:* Use the magnification formula with the calculated $v_1$ and given $u_1$.

    $$ h_{i1} = M_1 \cdot h_o = \left(-\frac{1}{2}\right) (+2 \text{ cm}) = -1 \text{ cm} $$
    *Explanation:* The height of the intermediate image is found. The negative sign means it's inverted.

**Part 2: Image formation by Lens 2**

1.  **Determine the object distance for Lens 2 ($u_2$):**
    The image $I_1$ formed by Lens 1 acts as the object for Lens 2.
    The distance from Lens 1 to $I_1$ is $v_1 = +15 \text{ cm}$.
    The distance between the lenses is $d = 20 \text{ cm}$.
    Lens 2 is placed 20 cm *behind* Lens 1.
    The intermediate image $I_1$ is formed 15 cm *behind* Lens 1. This means $I_1$ is located $20 \text{ cm} - 15 \text{ cm} = 5 \text{ cm}$ *in front of* Lens 2.

    Since $I_1$ is a real image and is in front of Lens 2, it acts as a **real object** for Lens 2.
    Therefore, $u_2 = +5 \text{ cm}$.
    *Explanation:* The position of $I_1$ relative to Lens 2 determines $u_2$. Since $I_1$ is between Lens 1 and Lens 2, and Lens 2 is further away, $I_1$ is to the left of Lens 2. For a real object, $u_2$ is positive.

2.  **Use the thin lens equation for Lens 2 to find $v_2$:**
    $$ \frac{1}{f_2} = \frac{1}{u_2} + \frac{1}{v_2} $$
    $$ \frac{1}{v_2} = \frac{1}{f_2} - \frac{1}{u_2} $$
    Substitute values:
    $$ \frac{1}{v_2} = \frac{1}{(-12 \text{ cm})} - \frac{1}{(+5 \text{ cm})} $$
    *Explanation:* $f_2 = -12 \text{ cm}$ (concave lens is diverging), $u_2 = +5 \text{ cm}$ (real object for Lens 2).

    $$ \frac{1}{v_2} = -\frac{1}{12 \text{ cm}} - \frac{1}{5 \text{ cm}} $$
    *Explanation:* Simplify signs.

    Find a common denominator for 12 and 5, which is 60:
    $$ \frac{1}{v_2} = -\frac{5}{60 \text{ cm}} - \frac{12}{60 \text{ cm}} $$
    *Explanation:* Converted fractions to common denominator.

    $$ \frac{1}{v_2} = -\frac{17}{60 \text{ cm}} $$
    *Explanation:* Perform subtraction.

    $$ v_2 = -\frac{60}{17} \text{ cm} \approx -3.53 \text{ cm} $$
    *Explanation:* Invert both sides.

3.  **Interpret $v_2$ and calculate $h_{i2}$:**
    Since $v_2 \approx -3.53 \text{ cm}$ is negative, the final image ($I_2$) is **virtual**. It forms approximately 3.53 cm *in front of* Lens 2 (on the same side as the object $I_1$).

    Now calculate the magnification by Lens 2 and the final image height:
    $$ M_2 = -\frac{v_2}{u_2} = -\frac{(-60/17 \text{ cm})}{(+5 \text{ cm})} = -\left(-\frac{60}{17 \cdot 5}\right) = -\left(-\frac{12}{17}\right) = +\frac{12}{17} $$
    *Explanation:* Use the magnification formula for Lens 2.

    The final image height $h_{i2}$ is $M_2$ times the height of the object for Lens 2, which was $h_{i1}$:
    $$ h_{i2} = M_2 \cdot h_{i1} = \left(+\frac{12}{17}\right) (-1 \text{ cm}) = -\frac{12}{17} \text{ cm} \approx -0.71 \text{ cm} $$
    *Explanation:* The final image height is the product of the second magnification and the intermediate image height.

4.  **Interpret the final image height ($h_{i2}$):**
    Since $h_{i2} \approx -0.71 \text{ cm}$ is negative, the final image is **inverted** relative to the original object.
    Since $|h_{i2}| \approx 0.71 \text{ cm}$ is smaller than $|h_o| = 2 \text{ cm}$, the final image is **diminished**.

**Final Answer:**
The final image is formed at $\boxed{\text{-3.53 cm}}$ (3.53 cm in front of Lens 2). It is a $\boxed{\text{virtual, inverted, and diminished}}$ image, with a height of $\boxed{\text{-0.71 cm}}$.

**Reflection on what made the example tricky:** This example is tricky because it involves sequential application of the lens equations and sign conventions. The most common traps are:
1.  **Calculating $u_2$ incorrectly:** Forgetting to account for the distance between the lenses, or misinterpreting whether $I_1$ acts as a real or virtual object for Lens 2. Here, $I_1$ was a real image that formed *before* Lens 2, so it was a real object for Lens 2. If $I_1$ had formed *after* Lens 2 (i.e., $v_1 > d$), it would have been a virtual object for Lens 2, and $u_2$ would have been negative.
2.  **Cascading errors:** A mistake in calculating $v_1$ or $h_{i1}$ will propagate to the final answer.
3.  **Keeping track of signs for each element:** Ensuring $f_1$ is positive, $f_2$ is negative, and $u_1, u_2$ are positive (for real objects) is crucial.
4.  **Magnification:** Correctly multiplying the magnifications (or applying $M_2$ to $h_{i1}$) and interpreting the final sign of $h_{i2}$ relative to the *original* object.

## 6. Common mistakes and traps

1.  **Inconsistent Sign Convention:** The most common and devastating error. Students often learn one convention for mirrors and another for lenses, or mix elements from the "New Cartesian" and "Real is Positive" conventions within the same problem. *Always declare your convention and stick to it.*
2.  **Forgetting to Assign Signs to Given Values:** The problem might state "object at 20 cm" or "focal length is 10 cm." It's crucial to immediately translate these into $u = +20 \text{ cm}$ (or $-20 \text{ cm}$ depending on convention) or $f = +10 \text{ cm}$ (or $-10 \text{ cm}$) based on the type of element and the chosen convention.
3.  **Confusing Real/Virtual with Positive/Negative for Image Distance ($v$):** This is where conventions differ. In "Real is Positive," $v>0$ means real, $v<0$ means virtual. In "New Cartesian" (incident light from left), $v<0$ for real image in front of mirror, $v>0$ for real image behind lens. This is why choosing and sticking to one convention is paramount.
4.  **Incorrect Focal Length Sign for Diverging/Converging Elements:** Mistaking a convex mirror for a converging element (it's diverging) or a concave lens for a converging element (it's diverging). Remember: convex lens = converging, concave lens = diverging; concave mirror = converging, convex mirror = diverging. Then apply your chosen convention for $f$.
5.  **Magnification Sign Interpretation:** Forgetting that a negative magnification means an inverted image, and a positive magnification means an upright image. Also, forgetting the negative sign in the magnification formula $M = -v/u$.
6.  **Multi-Element Systems - Incorrect Object Distance for Subsequent Elements:** When dealing with multiple mirrors or lenses, the image from the first element becomes the object for the second. The object distance ($u_2$) for the second element must be carefully calculated, considering the distance between the elements and whether the intermediate image is real or virtual relative to the second element. A virtual object (where light *would* converge to a point *behind* the second element) will have a negative $u$ in the "Real is Positive" convention.

## 7. Textbook-precise explanation

The sign convention used in geometrical optics is a set of rules that governs the signs of various quantities (object distance, image distance, focal length, heights) to ensure consistency in calculations involving the mirror formula and the lens formula. While several conventions exist, the **"Real is Positive" convention** (also known as the American convention, or often implicitly used in many introductory physics texts) is widely adopted for its intuitive interpretation of image characteristics.

**Formal Definition: "Real is Positive" Sign Convention**

1.  **Origin:** All distances are measured from the **pole (P)** of a mirror or the **optical center (O)** of a lens.
2.  **Object Distance ($u$):**
    *   For a **real object** (from which light rays actually diverge), $u$ is taken as **positive**.
    *   For a **virtual object** (towards which light rays are converging before hitting the optical element), $u$ is taken as **negative**. (Virtual objects typically arise in multi-element systems where an image formed by a preceding element acts as an object for the subsequent element, and this image would have formed *behind* the subsequent element if it weren't there).
3.  **Image Distance ($v$):**
    *   For a **real image** (formed by the actual convergence of light rays, capable of being projected onto a screen), $v$ is taken as **positive**.
    *   For a **virtual image** (formed by the apparent divergence of light rays, not capable of being projected), $v$ is taken as **negative**.
4.  **Focal Length ($f$):**
    *   For a **converging optical element** (concave mirror, convex lens), $f$ is taken as **positive**.
    *   For a **diverging optical element** (convex mirror, concave lens), $f$ is taken as **negative**.
5.  **Heights:**
    *   The height of an object ($h_o$) or image ($h_i$) measured **upward** from the principal axis is taken as **positive**.
    *   The height of an object ($h_o$) or image ($h_i$) measured **downward** from the principal axis is taken as **negative**.

**Equations:**
*   **Mirror/Thin Lens Equation:**
    $$ \frac{1