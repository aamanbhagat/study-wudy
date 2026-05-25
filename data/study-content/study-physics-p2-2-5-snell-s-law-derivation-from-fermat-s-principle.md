## 1. What it is — in plain English

Imagine you're walking on a perfectly flat beach and suddenly decide to run into the ocean. You can run much faster on sand than you can wade through water. If you want to get from one point on the beach to another point in the water as quickly as possible, you wouldn't just run in a straight line. You'd probably run a bit longer on the sand (where you're fast) and then take a shorter, more direct path through the water (where you're slow). This causes you to change direction at the waterline.

Light does something very similar! When light travels from one transparent material (like air) into another (like water or glass), it changes its speed. Because its speed changes, light doesn't just go straight; it "bends" or changes direction at the boundary between the two materials. This bending is called refraction.

Snell's Law is simply the mathematical rule that tells us *exactly how much* light will bend when it crosses from one material into another. It connects the angle at which light hits the surface, the angle at which it bends, and a property of each material called its "refractive index" (which tells us how much the material slows light down). It's a fundamental principle that explains why things look distorted when viewed through water or glass.

## 2. Why it matters — real-world applications

Snell's Law is absolutely foundational to understanding and manipulating light, which has profound implications across science, engineering, and technology.

1.  **Lenses for Vision Correction and Imaging:** Every pair of eyeglasses, contact lenses, camera lenses, microscope objectives, and telescope mirrors works because of Snell's Law. By precisely shaping transparent materials (like glass or plastic) with specific refractive indices, engineers can control how light rays bend to focus images, correct vision (e.g., Google's Verily developing smart contact lenses for glucose monitoring, or NASA's Hubble Space Telescope using precisely ground mirrors and lenses to focus light from distant galaxies), or magnify tiny objects.
2.  **Fiber Optics for Communication:** The internet, medical endoscopes, and many sensor systems rely on fiber optic cables. These cables guide light over long distances using a phenomenon called "Total Internal Reflection," which is a direct consequence of Snell's Law. When light tries to exit a high refractive index material (like glass) into a lower refractive index material (like the cladding around the fiber) at a sufficiently steep angle, Snell's Law predicts it will actually reflect *back* into the higher index material, trapping it inside the fiber. This allows for high-speed data transmission with minimal loss.
3.  **Atmospheric Optics and Aerospace:** When you look at the stars, their apparent position is slightly different from their true position due to the bending of light as it passes through Earth's atmosphere, which has varying refractive indices. This atmospheric refraction is governed by Snell's Law. Similarly, for space-based telescopes or satellites communicating with Earth, understanding atmospheric effects (and how to compensate for them) is crucial for accurate observations and reliable data links. Phenomena like mirages are also explained by varying refractive indices in the atmosphere.
4.  **Anti-Reflective Coatings and Displays:** Many modern displays (smartphones, TVs, computer monitors) and optical components (camera lenses, solar panels) feature anti-reflective coatings. These coatings consist of thin layers of material with specific refractive indices, designed using principles related to Snell's Law (and wave interference) to minimize unwanted reflections and maximize light transmission, improving image clarity and energy efficiency.

## 3. Prerequisites — what you must know first

Before diving into the derivation of Snell's Law from Fermat's Principle, ensure you have a solid grasp of the following concepts:

*   **Basic Trigonometry:** Understanding of sine, cosine, and tangent functions, and how they relate to the sides and angles of a right-angled triangle. You should be comfortable with trigonometric identities and inverse trigonometric functions.
*   **Calculus (Differentiation):** The ability to find the derivative of a function. Specifically, you'll need to know how to differentiate composite functions (chain rule) and how to find the minimum or maximum of a function by setting its derivative to zero.
*   **Basic Physics (Waves & Light):** The concept of light as a wave, its speed in a vacuum ($c$), and the idea that light travels at different speeds in different materials.
*   **Refractive Index ($n$):** What it is, how it's defined ($n = c/v$), and that it's a measure of how much a material slows down light.
*   **Coordinate Geometry:** How to define points and distances in a 2D Cartesian coordinate system. The distance formula between two points.
*   **Fermat's Principle:** The fundamental idea that light, when traveling between two points, takes the path that requires the *least time*. We will elaborate on this, but a prior conceptual introduction is helpful.

## 4. The core idea — step by step

The derivation of Snell's Law from Fermat's Principle is a beautiful demonstration of how a simple, overarching principle (light taking the path of least time) can lead to a precise, quantitative law describing light's behavior. Let's break it down step by step.

### Step 1: Understand Fermat's Principle

*   **Plain English Statement:** Light, being "efficient," always chooses the quickest path to get from one point to another. It doesn't necessarily take the shortest *distance*, but the shortest *time*.
*   **Small Concrete Example:** Imagine you're on one side of a river and need to get to a point on the other side. You can row a boat (slow) or run on land (fast). If you want to get there as fast as possible, you might row diagonally across the river (shorter distance in water) and then run along the bank (longer distance on land), rather than rowing straight across and then running a long way, or rowing the entire way along the bank. The actual path light takes is analogous to the path you'd choose for minimum travel time.
*   **Formal/Mathematical Version:** If $T$ is the total time taken for light to travel between two points, then the actual path taken is the one for which the variation in time $\delta T$ is zero. In calculus terms, this means that the derivative of the total time with respect to any variable describing the path must be zero (indicating a minimum, maximum, or saddle point – in this case, it's a minimum).
    $$ \frac{dT}{dx} = 0 $$
    where $x$ is a variable that describes the path geometry.
*   **What Could Go Wrong:** A common mistake is to confuse "least time" with "shortest distance." These are only the same if light is traveling in a uniform medium. When the speed of light changes, the shortest distance path is usually *not* the path of least time.

### Step 2: Relate Speed of Light to Refractive Index

*   **Plain English Statement:** Different materials slow light down by different amounts. The refractive index tells us exactly how much slower light travels in a material compared to its speed in a vacuum.
*   **Small Concrete Example:** Light travels fastest in a vacuum (approximately $3 \times 10^8$ m/s). In water, it slows down to about $2.25 \times 10^8$ m/s. The refractive index of water is therefore $n_{water} = (3 \times 10^8) / (2.25 \times 10^8) \approx 1.33$.
*   **Formal/Mathematical Version:** The speed of light $v$ in a medium with refractive index $n$ is related to the speed of light in a vacuum $c$ by the equation:
    $$ v = \frac{c}{n} $$
    This means that $n = c/v$.
*   **What Could Go Wrong:** Forgetting that $c$ is the speed of light in a vacuum (or air, approximately), and $v$ is the speed of light in the *specific medium* you're considering. Don't mix them up!

### Step 3: Set up the Geometry

*   **Plain English Statement:** We need to draw a picture of light traveling from a starting point in one material, crossing a flat boundary, and ending at a point in a second material. We'll use coordinates to describe this path.
*   **Small Concrete Example:** Imagine a light source at point A in the air, shining down onto a pool of water. The light hits the water surface at some point P, then travels through the water to point B. We need to define A, B, and P using x-y coordinates.
*   **Formal/Mathematical Version:**
    Let light travel from point $A = (0, y_1)$ in medium 1 (with refractive index $n_1$) to point $B = (L, -y_2)$ in medium 2 (with refractive index $n_2$). The interface between the two media is the x-axis ($y=0$).
    Let the light ray intersect the interface at point $P = (x, 0)$.
    The distance traveled in medium 1 is $d_1$, and the distance traveled in medium 2 is $d_2$.
    Using the distance formula:
    $$ d_1 = \sqrt{(x-0)^2 + (0-y_1)^2} = \sqrt{x^2 + y_1^2} $$
    $$ d_2 = \sqrt{(L-x)^2 + (0-(-y_2))^2} = \sqrt{(L-x)^2 + y_2^2} $$
    We also define the angles of incidence ($\theta_1$) and refraction ($\theta_2$) with respect to the *normal* (a line perpendicular to the interface at point P).
    From the geometry (see ASCII diagram later):
    $$ \sin \theta_1 = \frac{x}{d_1} \quad \text{and} \quad \cos \theta_1 = \frac{y_1}{d_1} $$
    $$ \sin \theta_2 = \frac{L-x}{d_2} \quad \text{and} \quad \cos \theta_2 = \frac{y_2}{d_2} $$
*   **What Could Go Wrong:** Incorrectly placing the origin, mislabeling coordinates, or, most critically, defining the angles with respect to the *surface* instead of the *normal*. Always use the normal!

### Step 4: Express Total Time Taken

*   **Plain English Statement:** The total time light takes is simply the sum of the time it spends in the first material and the time it spends in the second material. Time in each material is its distance traveled divided by its speed in that material.
*   **Small Concrete Example:** If light travels 10 meters in air at speed $v_1$ and then 5 meters in water at speed $v_2$, the total time is $(10/v_1) + (5/v_2)$.
*   **Formal/Mathematical Version:**
    The time taken in medium 1 is $t_1 = \frac{d_1}{v_1}$.
    The time taken in medium 2 is $t_2 = \frac{d_2}{v_2}$.
    Using $v = c/n$, we can write $v_1 = c/n_1$ and $v_2 = c/n_2$.
    So, the total time $T$ is:
    $$ T = t_1 + t_2 = \frac{d_1}{v_1} + \frac{d_2}{v_2} = \frac{d_1}{(c/n_1)} + \frac{d_2}{(c/n_2)} $$
    $$ T = \frac{n_1 d_1}{c} + \frac{n_2 d_2}{c} $$
    Substituting the expressions for $d_1$ and $d_2$ from Step 3:
    $$ T(x) = \frac{n_1 \sqrt{x^2 + y_1^2}}{c} + \frac{n_2 \sqrt{(L-x)^2 + y_2^2}}{c} $$
    Notice that $T$ is a function of $x$, the point where the ray crosses the interface.
*   **What Could Go Wrong:** Forgetting to divide by $c$ or mistakenly multiplying by $c$. Also, ensuring that you're using the correct refractive index and distance for each segment of the path.

### Step 5: Apply Calculus (Minimization)

*   **Plain English Statement:** According to Fermat's Principle, the actual path light takes is the one that minimizes this total travel time $T(x)$. In calculus, we find a minimum (or maximum) of a function by taking its derivative with respect to the variable we're optimizing (in this case, $x$) and setting it to zero.
*   **Small Concrete Example:** If you have a function like $f(x) = x^2 - 4x + 5$, its derivative is $f'(x) = 2x - 4$. Setting $2x - 4 = 0$ gives $x=2$, which is where the function has its minimum value. We're doing the same for our more complex $T(x)$ function.
*   **Formal/Mathematical Version:**
    We need to find $\frac{dT}{dx}$ and set it to zero.
    $$ \frac{dT}{dx} = \frac{1}{c} \left[ \frac{d}{dx} (n_1 \sqrt{x^2 + y_1^2}) + \frac{d}{dx} (n_2 \sqrt{(L-x)^2 + y_2^2}) \right] = 0 $$
    Let's differentiate each term using the chain rule: $\frac{d}{dx} \sqrt{u} = \frac{1}{2\sqrt{u}} \frac{du}{dx}$.
    For the first term:
    $$ \frac{d}{dx} (n_1 \sqrt{x^2 + y_1^2}) = n_1 \cdot \frac{1}{2\sqrt{x^2 + y_1^2}} \cdot (2x) = \frac{n_1 x}{\sqrt{x^2 + y_1^2}} = \frac{n_1 x}{d_1} $$
    For the second term:
    $$ \frac{d}{dx} (n_2 \sqrt{(L-x)^2 + y_2^2}) = n_2 \cdot \frac{1}{2\sqrt{(L-x)^2 + y_2^2}} \cdot (2(L-x)(-1)) = \frac{-n_2 (L-x)}{\sqrt{(L-x)^2 + y_2^2}} = \frac{-n_2 (L-x)}{d_2} $$
    Now, set the sum of these derivatives to zero:
    $$ \frac{1}{c} \left[ \frac{n_1 x}{d_1} - \frac{n_2 (L-x)}{d_2} \right] = 0 $$
    $$ \frac{n_1 x}{d_1} = \frac{n_2 (L-x)}{d_2} $$
*   **What Could Go Wrong:** Algebraic errors in differentiation, especially with the chain rule and the negative sign from differentiating $(L-x)$. Forgetting to set the entire derivative to zero.

### Step 6: Simplify and Derive Snell's Law

*   **Plain English Statement:** Now we're almost there! We just need to replace the $x/d_1$ and $(L-x)/d_2$ terms with their trigonometric equivalents (sines of the angles) that we defined in Step 3.
*   **Small Concrete Example:** If you have an equation like $A \cdot (side_1/hypotenuse_1) = B \cdot (side_2/hypotenuse_2)$, and you know that $(side_1/hypotenuse_1)$ is $\sin \theta_1$ and $(side_2/hypotenuse_2)$ is $\sin \theta_2$, then you can directly substitute to get $A \sin \theta_1 = B \sin \theta_2$.
*   **Formal/Mathematical Version:**
    Recall from Step 3:
    $$ \sin \theta_1 = \frac{x}{d_1} $$
    $$ \sin \theta_2 = \frac{L-x}{d_2} $$
    Substitute these into the equation from Step 5:
    $$ n_1 \left( \frac{x}{d_1} \right) = n_2 \left( \frac{L-x}{d_2} \right) $$
    $$ n_1 \sin \theta_1 = n_2 \sin \theta_2 $$
    This is Snell's Law! It beautifully shows how the principle of least time directly leads to the observed bending of light.
*   **What Could Go Wrong:** Incorrectly substituting the trigonometric definitions, or making algebraic errors during the final simplification. Double-check your definition of angles relative to the normal.

## 5. Worked examples — multiple, with every step shown

Let's apply Snell's Law to some practical scenarios.

### Example 1: Light Entering Water

**Problem:** A light ray travels from air ($n_{air} \approx 1.00$) into water ($n_{water} = 1.33$). If the angle of incidence is $30^\circ$, what is the angle of refraction?

**Given:**
*   Refractive index of medium 1 (air), $n_1 = 1.00$
*   Refractive index of medium 2 (water), $n_2 = 1.33$
*   Angle of incidence, $\theta_1 = 30^\circ$

**Want:** Angle of refraction, $\theta_2$

**Solution:**

1.  **State Snell's Law:**
    $$ n_1 \sin \theta_1 = n_2 \sin \theta_2 $$
    This is the fundamental equation that relates the angles and refractive indices.

2.  **Substitute the known values into the equation:**
    $$ (1.00) \sin(30^\circ) = (1.33) \sin \theta_2 $$
    We're plugging in the given numbers for $n_1$, $\theta_1$, and $n_2$.

3.  **Calculate $\sin(30^\circ)$:**
    $$ \sin(30^\circ) = 0.5 $$
    This is a standard trigonometric value.

4.  **Substitute the sine value back into the equation:**
    $$ (1.00)(0.5) = (1.33) \sin \theta_2 $$
    $$ 0.5 = 1.33 \sin \theta_2 $$
    Now we have a simpler equation to solve for $\sin \theta_2$.

5.  **Isolate $\sin \theta_2$:**
    $$ \sin \theta_2 = \frac{0.5}{1.33} $$
    $$ \sin \theta_2 \approx 0.3759 $$
    We're dividing both sides by $1.33$ to get $\sin \theta_2$ by itself.

6.  **Find $\theta_2$ using the inverse sine function:**
    $$ \theta_2 = \arcsin(0.3759) $$
    $$ \theta_2 \approx 22.09^\circ $$
    We use the arcsin (or $\sin^{-1}$) function on a calculator to find the angle whose sine is $0.3759$.

**Final Answer:**
The angle of refraction is $\boxed{22.09^\circ}$.

**Reflection:** This example demonstrates the basic application of Snell's Law. Notice that because light is entering a denser medium ($n_2 > n_1$), the light bends *towards* the normal ($\theta_2 < \theta_1$). This is a general rule: light bends towards the normal when entering a medium with a higher refractive index.

### Example 2: Critical Angle and Total Internal Reflection

**Problem:** A light ray is traveling from glass ($n_{glass} = 1.50$) into air ($n_{air} = 1.00$). What is the critical angle for this interface? If the light hits the interface at an angle of $45^\circ$, will it refract into the air or undergo total internal reflection?

**Given:**
*   Refractive index of medium 1 (glass), $n_1 = 1.50$
*   Refractive index of medium 2 (air), $n_2 = 1.00$
*   Angle of incidence for the second part of the problem, $\theta_{1, incident} = 45^\circ$

**Want:**
*   Critical angle, $\theta_c$
*   Whether light refracts or reflects at $45^\circ$ incidence.

**Solution (Part 1: Critical Angle):**

1.  **Understand the condition for critical angle:** The critical angle ($\theta_c$) is the angle of incidence for which the angle of refraction ($\theta_2$) is exactly $90^\circ$. At this point, the refracted ray travels along the interface. For angles of incidence greater than $\theta_c$, total internal reflection occurs.
    This phenomenon only happens when light travels from a *denser* medium to a *less dense* medium ($n_1 > n_2$).

2.  **State Snell's Law and apply the critical angle condition:**
    $$ n_1 \sin \theta_c = n_2 \sin(90^\circ) $$
    We replace $\theta_1$ with $\theta_c$ and $\theta_2$ with $90^\circ$.

3.  **Calculate $\sin(90^\circ)$:**
    $$ \sin(90^\circ) = 1 $$
    This is a standard trigonometric value.

4.  **Substitute and solve for $\sin \theta_c$:**
    $$ (1.50) \sin \theta_c = (1.00)(1) $$
    $$ \sin \theta_c = \frac{1.00}{1.50} $$
    $$ \sin \theta_c \approx 0.6667 $$
    We're isolating $\sin \theta_c$.

5.  **Find $\theta_c$ using the inverse sine function:**
    $$ \theta_c = \arcsin(0.6667) $$
    $$ \theta_c \approx 41.81^\circ $$
    Using the arcsin function.

**Solution (Part 2: Light at $45^\circ$ incidence):**

1.  **Compare the incident angle with the critical angle:**
    Given incident angle $\theta_{1, incident} = 45^\circ$.
    Calculated critical angle $\theta_c \approx 41.81^\circ$.

2.  **Determine the outcome:**
    Since $\theta_{1, incident} (45^\circ) > \theta_c (41.81^\circ)$, the light ray will undergo total internal reflection. It will not refract into the air; instead, it will reflect back into the glass.

**Final Answer:**
The critical angle for the glass-air interface is $\boxed{41.81^\circ}$.
At an angle of incidence of $45^\circ$, the light will undergo $\boxed{\text{total internal reflection}}$.

**Reflection:** This example highlights a critical application of Snell's Law: total internal reflection. This is the principle behind fiber optics, binoculars, and many other optical devices. It occurs when light tries to go from a denser to a less dense medium at an angle greater than the critical angle.

### Example 3: Light Passing Through a Parallel-Sided Slab

**Problem:** A light ray enters a rectangular glass slab ($n_{glass} = 1.50$) from air ($n_{air} = 1.00$) at an angle of incidence of $60^\circ$. The light then exits the slab back into the air on the opposite side, which is parallel to the first side. Show that the final angle of emergence from the slab is equal to the initial angle of incidence.

**Given:**
*   $n_1 = n_{air} = 1.00$
*   $n_2 = n_{glass} = 1.50$
*   Angle of incidence at the first surface, $\theta_{1a} = 60^\circ$

**Want:** To show that the angle of emergence $\theta_{2b}$ (angle of refraction at the second surface) equals $\theta_{1a}$.

**Solution:**

We need to apply Snell's Law twice: once at the first interface (air to glass) and once at the second interface (glass to air).

**Part 1: At the first interface (Air to Glass)**

1.  **Define variables for the first interface:**
    Let $\theta_{1a}$ be the angle of incidence in air.
    Let $\theta_{1b}$ be the angle of refraction in glass.
    The refractive indices are $n_{air}$ and $n_{glass}$.

2.  **Apply Snell's Law:**
    $$ n_{air} \sin \theta_{1a} = n_{glass} \sin \theta_{1b} $$
    This relates the angles and indices at the first boundary.

3.  **Substitute known values and solve for $\sin \theta_{1b}$:**
    $$ (1.00) \sin(60^\circ) = (1.50) \sin \theta_{1b} $$
    $$ \sin(60^\circ) = \frac{\sqrt{3}}{2} \approx 0.8660 $$
    $$ (1.00)(0.8660) = (1.50) \sin \theta_{1b} $$
    $$ \sin \theta_{1b} = \frac{0.8660}{1.50} \approx 0.5773 $$
    We're calculating the sine of the angle of refraction inside the glass.

4.  **Find $\theta_{1b}$ (optional, but good for understanding):**
    $$ \theta_{1b} = \arcsin(0.5773) \approx 35.26^\circ $$
    This is the angle the light ray makes with the normal *inside* the glass.

**Part 2: At the second interface (Glass to Air)**

1.  **Define variables for the second interface:**
    The angle of incidence *inside the glass* at the second interface is crucial. Since the two faces of the slab are parallel, the normal lines at the two points of incidence are also parallel. This means that the angle of refraction from the first interface ($\theta_{1b}$) is equal to the angle of incidence at the second interface (let's call it $\theta_{2a}$). This is due to basic geometry (alternate interior angles for parallel lines).
    So, $\theta_{2a} = \theta_{1b}$.
    Let $\theta_{2b}$ be the angle of refraction (emergence) back into the air.
    The refractive indices are now $n_{glass}$ (medium 1 for this step) and $n_{air}$ (medium 2 for this step).

2.  **Apply Snell's Law:**
    $$ n_{glass} \sin \theta_{2a} = n_{air} \sin \theta_{2b} $$
    This is Snell's Law for the second boundary.

3.  **Substitute $\theta_{2a} = \theta_{1b}$:**
    $$ n_{glass} \sin \theta_{1b} = n_{air} \sin \theta_{2b} $$
    We're using the relationship derived from the parallel faces.

4.  **Compare with the first Snell's Law equation:**
    From Part 1, Step 2: $n_{air} \sin \theta_{1a} = n_{glass} \sin \theta_{1b}$
    From Part 2, Step 3: $n_{glass} \sin \theta_{1b} = n_{air} \sin \theta_{2b}$

    Notice that the term $n_{glass} \sin \theta_{1b}$ is common to both equations.
    Therefore, we can equate the other sides:
    $$ n_{air} \sin \theta_{1a} = n_{air} \sin \theta_{2b} $$

5.  **Simplify to show the final result:**
    Since $n_{air}$ is not zero, we can divide both sides by $n_{air}$:
    $$ \sin \theta_{1a} = \sin \theta_{2b} $$
    Since both angles are acute (between $0^\circ$ and $90^\circ$), this implies:
    $$ \theta_{1a} = \theta_{2b} $$
    Thus, the angle of emergence is equal to the angle of incidence.

**Final Answer:**
By applying Snell's Law at both surfaces and using the geometric property of parallel normals, we have shown that the final angle of emergence from the slab is equal to the initial angle of incidence: $\boxed{\theta_{1a} = \theta_{2b}}$.

**Reflection:** This example demonstrates a crucial property of parallel-sided optical components: they displace the light ray laterally but do not change its direction. This principle is vital in designing windows, display screens, and other transparent enclosures where light direction needs to be preserved. The trickiest part is correctly identifying the angle of incidence for the second surface using geometry.

### Example 4: Apparent Depth in Water

**Problem:** A coin is at the bottom of a swimming pool filled with water ($n_{water} = 1.33$) to a depth of 2.0 meters. If you look straight down at the coin (i.e., the light rays from the coin enter your eye nearly perpendicularly to the water surface), what is the apparent depth of the coin?

**Given:**
*   Actual depth of the coin, $d_{actual} = 2.0 \text{ m}$
*   Refractive index of water, $n_1 = 1.33$ (light travels from water to air)
*   Refractive index of air, $n_2 = 1.00$

**Want:** Apparent depth, $d_{apparent}$.

**Solution:**

This problem requires a slightly different approach, using Snell's Law for small angles (paraxial rays) to derive the apparent depth formula.

1.  **Set up the geometry (conceptual):**
    Imagine light rays originating from the coin at the bottom of the pool. These rays travel through the water, hit the water-air interface, refract, and then travel into your eye. Your brain perceives the coin to be along the *straight-line extension* of the refracted rays.

2.  **Apply Snell's Law:**
    Let $\theta_1$ be the angle of incidence in water (from the normal) and $\theta_2$ be the angle of refraction in air.
    $$ n_1 \sin \theta_1 = n_2 \sin \theta_2 $$

3.  **Consider paraxial rays (looking straight down):**
    When looking straight down, the light rays from the coin that reach your eye are very close to the normal. For small angles, we can use the small angle approximation: $\sin \theta \approx \tan \theta \approx \theta$ (in radians).
    Also, from the geometry (imagine a point source at the coin, and the refracted ray's extension), if $x$ is the horizontal distance from the normal to where the ray hits the interface:
    $$ \tan \theta_1 = \frac{x}{d_{actual}} $$
    $$ \tan \theta_2 = \frac{x}{d_{apparent}} $$
    For small angles, $\sin \theta_1 \approx \frac{x}{d_{actual}}$ and $\sin \theta_2 \approx \frac{x}{d_{apparent}}$.

4.  **Substitute small angle approximations into Snell's Law:**
    $$ n_1 \left( \frac{x}{d_{actual}} \right) = n_2 \left( \frac{x}{d_{apparent}} \right) $$

5.  **Simplify the equation:**
    The $x$ term cancels out from both sides:
    $$ \frac{n_1}{d_{actual}} = \frac{n_2}{d_{apparent}} $$

6.  **Solve for $d_{apparent}$:**
    $$ d_{apparent} = d_{actual} \frac{n_2}{n_1} $$
    This is the general formula for apparent depth when looking perpendicularly.

7.  **Substitute the given values:**
    $$ d_{apparent} = (2.0 \text{ m}) \frac{1.00}{1.33} $$
    $$ d_{apparent} = 2.0 \text{ m} \times 0.7518 $$
    $$ d_{apparent} \approx 1.50 \text{ m} $$

**Final Answer:**
The apparent depth of the coin is $\boxed{1.50 \text{ m}}$.

**Reflection:** This example shows how Snell's Law, combined with a small-angle approximation, can explain everyday phenomena like why objects in water appear shallower than they actually are. The key is to correctly identify the medium the light is coming *from* ($n_1$) and the medium it's going *into* ($n_2$) relative to the observer. If you were a fish looking up at an object in the air, the formula would still hold, but $n_1$ would be air and $n_2$ would be water, making the object appear further away.

## 6. Common mistakes and traps

Students often encounter specific pitfalls when working with Snell's Law and its derivation. Watch out for these:

1.  **Angles Measured from the Surface:** A very common error is to measure the angles ($\theta_1, \theta_2$) from the *interface surface* instead of from the *normal* (the line perpendicular to the surface). Snell's Law *always* uses angles relative to the normal.
2.  **Mixing Up Refractive Indices and Angles:** Ensure that $n_1$ is paired with $\sin \theta_1$ (the angle in medium 1) and $n_2$ with $\sin \theta_2$ (the angle in medium 2). It's easy to swap them, leading to incorrect results.
3.  **Forgetting Total Internal Reflection Conditions:** Remember that total internal reflection (TIR) only occurs when light travels from a *denser* medium to a *less dense* medium ($n_1 > n_2$) and the angle of incidence exceeds the critical angle. If $n_1 < n_2$, TIR is impossible.
4.  **Algebraic Errors During Derivation:** The calculus step involves chain rule and careful handling of signs. Mistakes in differentiation or algebraic manipulation (e.g., cancelling terms incorrectly) can derail the entire derivation.
5.  **Incorrectly Applying Fermat's Principle:** While light takes the path of *least time*, it's not always the path of *shortest distance*. This distinction is critical for understanding *why* light bends.
6.  **Units for Angles:** While $\sin \theta$ is dimensionless, if you use $\theta$ directly in calculations (e.g., small angle approximation $\sin \theta \approx \theta$), ensure your calculator is in radians, not degrees. For Snell's Law itself, the angles can be in degrees for the $\sin$ function, but consistency is key.

## 7. Textbook-precise explanation

Snell's Law, which quantitatively describes the change in direction of a light ray as it passes from one medium to another, can be rigorously derived from Fermat's Principle.

**Fermat's Principle of Least Time** states that the path taken by a ray of light between two points is the path that can be traversed in the least time. More precisely, it is a path for which the optical path length (OPL) is stationary, meaning its first variation is zero ($\delta(\text{OPL}) = 0$). For homogeneous media, this reduces to minimizing the travel time.

Consider a light ray originating from point $A=(0, y_A)$ in a medium with refractive index $n_1$ and traveling to point $B=(L, y_B)$ in a second medium with refractive index $n_2$. The interface between the two media is a flat plane, which we align with the x-axis ($y=0$). The ray intersects this interface at an arbitrary point $P=(x, 0)$.

The speed of light in a medium with refractive index $n$ is given by $v = c/n$, where $c$ is the speed of light in a vacuum.
The time $t_1$ taken to travel from A to P is $t_1 = d_1/v_1 = n_1 d_1 / c$, where $d_1 = \sqrt{x^2 + y_A^2}$ is the distance AP.
The time $t_2$ taken to travel from P to B is $t_2 = d_2/v_2 = n_2 d_2 / c$, where $d_2 = \sqrt{(L-x)^2 + y_B^2}$ is the distance PB.

The total time $T(x)$ for the light to travel from A to B via point P on the interface is:
$$ T(x) = \frac{n_1 \sqrt{x^2 + y_A^2}}{c} + \frac{n_2 \sqrt{(L-x)^2 + y_B^2}}{c} $$
According to Fermat's Principle, the actual path taken by the light ray corresponds to the value of $x$ for which $T(x)$ is a minimum. This condition is found by setting the first derivative of $T(x)$ with respect to $x$ to zero:
$$ \frac{dT}{dx} = \frac{1}{c} \left[ \frac{n_1 (2x)}{2\sqrt{x^2 + y_A^2}} + \frac{n_2 (2(L-x)(-1))}{2\sqrt{(L-x)^2 + y_B^2}} \right] = 0 $$
$$ \frac{n_1 x}{\sqrt{x^2 + y_A^2}} - \frac{n_2 (L-x)}{\sqrt{(L-x)^2 + y_B^2}} = 0 $$
$$ \frac{n_1 x}{d_1} = \frac{n_2 (L-x)}{d_2} $$
From the geometry, let $\theta_1$ be the angle of incidence (between the incident ray and the normal to the interface) and $\theta_2$ be the angle of refraction (between the refracted ray and the normal). The normal is perpendicular to the x-axis.
Referring to the diagram:
$$ \sin \theta_1 = \frac{x}{d_1} $$
$$ \sin \theta_2 = \frac{L-x}{d_2} $$
Substituting these trigonometric relations into the differentiated equation yields:
$$ n_1 \sin \theta_1 = n_2 \sin \theta_2 $$
This is Snell's Law (also known as Descartes' Law of Refraction), which precisely describes the relationship between the angles of incidence and refraction and the refractive indices of the two media.

**References:**
*   Hecht, Eugene. *Optics*. 5th ed., Pearson, 2017, pp. 102-105.
*   Halliday, David, Robert Resnick, and Jearl Walker. *Fundamentals of Physics*. 11th ed., Wiley, 2018, pp. 993-994.

## 8. ASCII diagrams

Here is an ASCII diagram illustrating the geometry used in the derivation of Snell's Law from Fermat's Principle.

```text
       Normal (y-axis)
         ^
         |
         |
  Medium 1 | \  Incident ray (from A)
    (n1)   |  \
   A(0,y1) |   \ theta_1
           |    \
           |     \
-----------P(x,0)--X----------- Interface (x-axis)
           |     /
           |    / theta_2
           |   /
  Medium 2 |  /  Refracted ray (to B)
    (n2)   | /
           |/
          B(L,-y2)
```

**Description of the Figure:**

*   The horizontal line represents the **interface** between Medium 1 (top) and Medium 2 (bottom). This is the x-axis.
*   The vertical dashed line is the **normal** to the interface, passing through point P. This is the y-axis (or parallel to it).
*   **Point A($0, y_1$)** is the starting point of the light ray in Medium 1.
*   **Point B($L, -y_2$)** is the ending point of the light ray in Medium 2. Note that $y_1$ and $y_2$ are positive lengths, so point B is at a negative y-coordinate.
*   **Point P($x, 0$)** is an arbitrary point on the interface where the light ray crosses from Medium 1 to Medium 2. The variable $x$ is what we optimize.
*   The line segment from A to P is the **incident ray**. Its length is $d_1 = \sqrt{x^2 + y_1^2}$.
*   The line segment from P to B is the **refracted ray**. Its length is $d_2 = \sqrt{(L-x)^2 + y_2^2}$.
*   **$\theta_1$** is the **angle of incidence**, measured between the incident ray (AP) and the normal at P.
*   **$\theta_2$** is the **angle of refraction**, measured between the refracted ray (PB) and the normal at P.
*   From the geometry, $\sin \theta_1 = x/d_1$ and $\sin \theta_2 = (L-x)/d_2$.

This setup allows us to express the total travel time as a function of $x$ and then minimize it using calculus.

## 9. Memory technique — never forget this

To engrain Snell's Law and its derivation, use these techniques:

1.  **Specific Mnemonic / Visual Hook:**
    *   **"N-S-T-T" for Snell's Law:** Think of "N" for refractive Index, "S" for Sine, "T" for Theta. So, $n_1 \sin \theta_1 = n_2 \sin \theta_2$ becomes "N-S-T-T equals N-S-T-T".
    *   **The "Lazy Light Ray" Analogy:** Always remember the beach and water analogy. Light is "lazy" and wants to get to its destination in the least amount of *time*, not necessarily the shortest *distance*. Visualize the path bending towards the normal in water because it's "slower" to travel there.

2.  **Formulas/Facts to Overlearn:**
    1.  **Snell's Law:** $\boxed{n_1 \sin \theta_1 = n_2 \sin \theta_2}$ (This is the end goal).
    2.  **Refractive Index Definition:** $\boxed{n = c/v}$ (This explains *why* light bends).
    3.  **Fermat's Principle:** Light takes the path of $\boxed{\text{least time}}$. (This is the fundamental principle behind the derivation).

3.  **Spaced-Repetition Schedule:**
    *   **Review 1:** Immediately after this lesson (today). Reread, try to re-derive without looking.
    *   **Review 2:** In 3 days. Re-derive, work through an example.
    *   **Review 3:** In 7 days. Re-derive, explain to an imaginary peer.
    *   **Review 4:** In 16 days. Re-derive, focus on "what could go wrong" points.
    *   **Review 5:** In 35 days. Re-derive, connect to other topics (lenses, TIR).

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget Snell's Law, you can always rebuild it from first principles:
    *   **Start with Fermat's Principle:** Light seeks the path of least time.
    *   **Define Speed:** Remember $v = c/n$. This lets you express time in terms of refractive index and distance.
    *   **Set up Geometry:** Draw the interface, two points (A, B) in different media, and a variable point (P) on the interface. Use coordinates to define distances $d_1$ and $d_2$.
    *   **Formulate Total Time:** Write $T = (n_1 d_1 / c) + (n_2 d_2 / c)$.
    *   **Apply Calculus:** Differentiate $T(x)$ with respect to the variable $x$ (the position of P on the interface) and set $\frac{dT}{dx} = 0$.
    *   **Use Trigonometry:** Relate the terms $x/d_1$ and $(L-x)/d_2$ to $\sin \theta_1$ and $\sin \theta_2$ from your geometric setup.
    *   **Simplify:** The result will be $n_1 \sin \theta_1 = n_2 \sin \theta_2$.

This pathway ensures that even if you forget the final formula, you can always derive it logically.

## 10. Connections — what this leads to

Snell's Law is a cornerstone of optics. Mastering it unlocks understanding of a vast array of phenomena and technologies:

*   **Total Internal Reflection (TIR):** As seen in Example 2, Snell's Law directly predicts the critical angle beyond which light is entirely reflected back into a denser medium. This principle is fundamental to **fiber optics** (for internet, medical endoscopes, sensors), **prisms in binoculars and periscopes**, and **diamond sparkle**.
*   **Lensmaker's Equation and Lens Design:** The bending of light by lenses (converging and diverging) to form images is entirely governed by Snell's Law applied at curved surfaces. This is crucial for designing **cameras, telescopes, microscopes, eyeglasses, and contact lenses**.
*   **Dispersion:** The phenomenon where different wavelengths (colors) of light refract at slightly different angles (because refractive index varies slightly with wavelength) is explained by Snell's Law. This leads to **prisms separating white light into a spectrum**, and the formation of **rainbows**.
*   **Apparent Depth/Position:** As demonstrated in Example 4, Snell's Law explains why objects submerged in water appear shallower, or why a stick partially submerged in water appears bent. This affects **fishing, photography, and underwater observation**.
*   **Atmospheric Optics:** Mirages, the apparent flattening of the sun at the horizon, and the twinkling of stars are all due to the continuous refraction of light as it passes through layers of air with varying refractive indices, a complex application of Snell's Law.
*   **Wave Optics (Huygens' Principle):** While we derived Snell's Law from Fermat's Principle (a variational principle), it can also be derived from Huygens' Principle, which treats light as a wave propagating through wavefronts. The consistency between these two derivations strengthens our understanding of light's nature.
*   **Optical Instruments:** Understanding Snell's Law is prerequisite for analyzing and designing virtually all optical instruments, from simple magnifying glasses to complex multi-element camera lenses and advanced laser systems.
*   **Computer Vision and Graphics:** In computer graphics, realistic rendering of light interacting with surfaces (refraction, reflection) relies heavily on Snell's Law. In computer vision, understanding lens distortions and how light bends through optical systems is crucial for accurate image analysis.

## 11. Self-check questions

Here are some questions to test your understanding of Snell's Law and its derivation. Do not look up the answers until you have attempted them thoroughly.

1.  A light ray passes from a medium with refractive index $n_1 = 1.60$ into a medium with refractive index $n_2 = 1.20$. If the angle of incidence is $40^\circ$, what is the angle of refraction?
2.  What is the critical angle for a light ray traveling from diamond ($n_{diamond} = 2.42$) into air ($n_{air} = 1.00$)? Explain what happens if the angle of incidence exceeds this critical angle.
3.  A light ray enters a rectangular block of unknown transparent material from air at an angle of incidence of $55^\circ$. The angle of refraction inside the material is measured to be $32^\circ$. What is the refractive index of the unknown material?
4.  Derive the formula for apparent depth ($d_{apparent} = d_{actual} \frac{n_{observer}}{n_{object}}$) when viewing an object from above a flat interface. Clearly state any approximations made and justify them.
5.  Consider a situation where light travels from point A to point B, passing through three different media with parallel interfaces ($n_1 \to n_2 \to n_3$). Using Fermat's Principle or Snell's Law, how would you determine the final angle of refraction in medium 3 relative to the initial angle of incidence in medium 1? If $n_1 = n_3$, what can you say about the relationship between the initial and final angles?