## 1. What it is — in plain English

Imagine you have a piece of material, like a metal sheet. If you pull on it hard enough, it will eventually break. But what if that sheet already has a tiny scratch or a small crack in it? You might notice that it breaks much more easily than a perfect, unblemished sheet.

This is where "fracture mechanics" comes in. It's a special way of understanding how materials break when they have flaws. We're not just looking at the overall strength of the material anymore; we're focusing on what happens *right at the tip* of that tiny scratch or crack.

The **Stress Intensity Factor (K)** is like a magnifying glass for stress. It tells us how much the stress is concentrated and amplified right at the very tip of a crack. Think of it as a number that quantifies "how bad is this crack right now?" A higher K means the crack tip is experiencing a much more intense pull, making it more likely to grow.

Then there's **Fracture Toughness ($K_{IC}$)**. This is a property of the material itself, like its melting point or its hardness. It tells us how much "stress intensity" (how high a K value) the material can *resist* before that crack starts to grow uncontrollably and cause a catastrophic failure. It's the material's inherent "resistance to cracking." A material with high $K_{IC}$ is tough; it can tolerate larger cracks or higher loads before failing.

So, in simple terms: K tells you the "danger level" at the crack tip under current conditions, and $K_{IC}$ tells you the "danger threshold" that the material can withstand. If the danger level (K) meets or exceeds the danger threshold ($K_{IC}$), the material fails.

## 2. Why it matters — real-world applications

Fracture mechanics is absolutely critical in any field where structural integrity under stress is paramount, especially in aerospace.

1.  **Aircraft Fuselage and Wing Structures:** Commercial aircraft experience millions of cycles of pressurization/depressurization and aerodynamic loads. Tiny manufacturing defects or fatigue cracks (which grow over time) can initiate in the aluminum alloy skin or structural members. Engineers use fracture mechanics to determine the critical crack size that could lead to rapid failure, establish inspection intervals (e.g., using non-destructive testing like eddy current or ultrasound), and design "fail-safe" or "damage tolerant" structures. A famous example is Aloha Airlines Flight 243, where an undetected fatigue crack led to a large section of the fuselage tearing off in flight.
2.  **Rocket Engine Turbopumps:** These components operate under extreme conditions: very high rotational speeds, cryogenic temperatures (for liquid oxygen/hydrogen), and immense pressure. Small flaws in turbine blades or pump housings can quickly become critical. Materials like Inconel or titanium alloys are chosen for their high fracture toughness at these specific operating temperatures, and fracture mechanics is used to predict the safe operating life and inspect for potential cracks during manufacturing and maintenance.
3.  **Spacecraft Pressure Vessels and Fuel Tanks:** The habitat modules of the International Space Station, propellant tanks for launch vehicles (like the Space Shuttle's external tank or SpaceX's Starship), and satellite propulsion tanks are all pressure vessels. A tiny crack in the tank wall could lead to a catastrophic rupture if the internal pressure creates a stress intensity factor (K) exceeding the material's fracture toughness ($K_{IC}$). Engineers use fracture mechanics to specify material thickness, design for redundancy, and ensure that any potential manufacturing defects are below a critical size.
4.  **Landing Gear Components:** Aircraft landing gear experiences immense impact loads during touchdown. These components are often made from high-strength steels. While strong, these materials can sometimes be susceptible to brittle fracture if a crack initiates. Fracture mechanics guides the material selection, heat treatment processes, and design tolerances to ensure these critical parts can withstand the stresses without sudden failure, even if a small defect is present.
5.  **Wind Turbine Blades:** While not directly aerospace, the principles are identical. Modern wind turbine blades are massive composite structures. Micro-cracks can initiate due to manufacturing defects, lightning strikes, or fatigue from constant wind loading. Fracture mechanics helps engineers design blades that are damage-tolerant, predict their lifespan, and develop inspection protocols to prevent catastrophic blade failures that can be very costly and dangerous.

## 3. Prerequisites — what you must know first

Before diving deep into fracture mechanics, ensure you have a solid grasp of these fundamental concepts:

*   **Stress ($\sigma$):** Force applied per unit cross-sectional area. It quantifies the internal forces within a material.
*   **Strain ($\epsilon$):** The deformation of a material in response to stress, typically expressed as a change in length divided by the original length.
*   **Hooke's Law:** The linear elastic relationship between stress and strain ($\sigma = E\epsilon$) for materials within their elastic limit.
*   **Young's Modulus (E):** A measure of the stiffness of an elastic material; the ratio of stress to strain.
*   **Yield Strength ($\sigma_y$):** The stress level at which a material begins to deform permanently (plastically).
*   **Tensile Strength ($\sigma_{UTS}$):** The maximum stress a material can withstand before starting to neck and fracture.
*   **Elasticity:** The ability of a material to return to its original shape after the removal of an applied load.
*   **Plasticity:** The ability of a material to undergo permanent deformation without fracturing.
*   **Stress Concentration:** The phenomenon where stress intensifies around geometric discontinuities (like holes, notches, or cracks) in a loaded body.
*   **Linear Elastic Fracture Mechanics (LEFM):** The theoretical framework that assumes material behavior is linear elastic and fracture occurs in a brittle or quasi-brittle manner.

## 4. The core idea — step by step

Let's break down the fundamental concepts of stress intensity factor and fracture toughness systematically.

### Step 1: The Problem with Traditional Strength

**Plain English:** We often learn that materials have a "strength" (like tensile strength) that tells us how much pull they can take before breaking. But in the real world, materials often break at much lower loads than their theoretical strength, especially if they have tiny scratches or imperfections. These imperfections act like weak points.

**Concrete Example:** Imagine you have two identical rubber bands. One is brand new. The other has a tiny nick from a pair of scissors. If you pull both, the one with the nick will break much more easily, even though they're made of the same material.

**Formal/Mathematical Version:** Traditional strength of materials (e.g., $\sigma_{UTS}$) assumes a uniform stress distribution across a perfect cross-section. However, the presence of a flaw (crack) invalidates this assumption. The actual stress at the crack tip can be orders of magnitude higher than the nominal applied stress.

**What could go wrong:** Relying solely on ultimate tensile strength ($\sigma_{UTS}$) or yield strength ($\sigma_y$) for design when flaws are present. This can lead to catastrophic failures at seemingly "safe" stress levels.

### Step 2: Stress Concentration at Crack Tips

**Plain English:** A crack isn't just a hole; it's a very sharp, pointed discontinuity. When you pull on a material with a crack, all the force tries to go around that crack. But because the tip is so sharp, all that force gets squeezed into a tiny area right at the very end of the crack. This squeezing makes the stress incredibly high right there, much higher than anywhere else in the material.

**Concrete Example:** If you pull on a piece of paper with a small, sharp V-cut in it, the paper tears easily from the tip of the V. The stress isn't spread out; it's all focused right at that point.

**Formal/Mathematical Version:** For an ideally sharp crack, the stress at the crack tip theoretically approaches infinity according to classical elasticity theory. This is physically impossible, as materials yield and blunt the crack tip. However, the concept of a highly localized stress field is crucial. The stress field near a crack tip can be described by an equation of the form:
$$ \sigma_{ij} = \frac{K}{\sqrt{2\pi r}} f_{ij}(\theta) + \text{non-singular terms} $$
Where:
*   $\sigma_{ij}$ represents the stress components near the crack tip.
*   $r$ is the distance from the crack tip.
*   $\theta$ is the angle from the crack plane.
*   $f_{ij}(\theta)$ are dimensionless functions that describe the angular distribution of stress.
*   $K$ is the **stress intensity factor**, which scales the magnitude of the crack-tip stress field.

**What could go wrong:** Underestimating the severity of a sharp crack versus a blunt notch. The sharper the crack, the higher the stress concentration.

### Step 3: Defining Stress Intensity Factor (K)

**Plain English:** Since the actual stress at the very, very tip of a crack is hard to measure and theoretically infinite, we use the Stress Intensity Factor (K) as a way to quantify how "intense" the stress field is around the crack tip. It's a single number that encapsulates the combined effect of the applied load, the size of the crack, and the geometry of the component.

**Concrete Example:** Imagine you have a metal plate with a 1 cm long crack. If you pull it with 1000 N, K will have a certain value. If you pull it with 2000 N, K will be higher. If you keep the 1000 N load but the crack is now 2 cm long, K will also be higher. K tells you the "severity" of the crack under the current loading.

**Formal/Mathematical Version:** For the most common mode of fracture (Mode I, or opening mode, where the crack opens perpendicular to the applied stress), the stress intensity factor $K_I$ for an infinite plate with a central crack of length $2a$ under a uniform tensile stress $\sigma$ is given by:
$$ K_I = \sigma \sqrt{\pi a} $$
For more general cases, a geometry correction factor $Y$ (or $f(a/W)$) is introduced:
$$ K_I = Y \sigma \sqrt{\pi a} $$
Where:
*   $K_I$ is the Mode I stress intensity factor (units typically $Pa \sqrt{m}$ or $psi \sqrt{in}$).
*   $\sigma$ is the nominal applied stress perpendicular to the crack plane.
*   $a$ is the half-length of a central crack, or the full length of an edge crack.
*   $Y$ is a dimensionless geometry factor that accounts for the specific crack geometry, component size, and loading conditions. $Y$ is typically found in handbooks or calculated using numerical methods.

**What could go wrong:** Using the wrong geometry factor $Y$ for the specific crack and component configuration. Forgetting the $\pi$ in the square root. Confusing $a$ (half-crack length for central cracks) with $2a$ (total crack length).

### Step 4: Modes of Fracture

**Plain English:** Cracks can open up in different ways. We categorize these into three basic "modes" to simplify analysis.
*   **Mode I (Opening Mode):** The crack opens up, like pulling apart two pieces of paper. This is the most common and usually the most dangerous mode for brittle fracture.
*   **Mode II (Sliding Mode):** The crack surfaces slide past each other, parallel to the crack plane but perpendicular to the crack front. Like tearing a piece of paper by pushing one side up and the other down.
*   **Mode III (Tearing Mode):** The crack surfaces slide past each other, parallel to the crack plane and parallel to the crack front. Like tearing a piece of paper by twisting it.

**Concrete Example:**
*   Mode I: A tension rod with a crack perpendicular to the pull.
*   Mode II: A bolt in shear with a crack parallel to the shear plane.
*   Mode III: A drive shaft with a crack under torsional load.

**Formal/Mathematical Version:** These modes are defined by the relative displacement of the crack surfaces:
*   Mode I: Crack surfaces displace normal to the crack plane.
*   Mode II: Crack surfaces displace in-plane and parallel to the crack plane, perpendicular to the crack front.
*   Mode III: Crack surfaces displace in-plane and parallel to the crack plane, parallel to the crack front.
Most fracture mechanics analysis, especially for brittle materials, focuses on Mode I because it typically leads to the lowest fracture resistance.

**What could go wrong:** Assuming all fractures are Mode I. While Mode I is often critical, complex loading can induce mixed-mode conditions requiring more advanced analysis.

### Step 5: Material Toughness ($K_{IC}$)

**Plain English:** Every material has a certain "tolerance" for that concentrated stress at a crack tip. Some materials, like glass, have very low tolerance – a tiny scratch can make them shatter easily. Other materials, like tough steel, can withstand a lot more stress concentration before a crack starts to grow. This "tolerance" or "resistance to cracking" is called **Fracture Toughness ($K_{IC}$)**. It's a fundamental material property, like its density or stiffness.

**Concrete Example:** If you take a piece of window glass and a piece of structural steel, both with identical cracks, and pull on them, the glass will break much, much sooner. This is because glass has a very low $K_{IC}$ compared to steel. The steel is "tougher."

**Formal/Mathematical Version:** The plane strain fracture toughness, $K_{IC}$, is the critical value of the Mode I stress intensity factor at which a crack will propagate in a brittle or quasi-brittle manner under plane strain conditions. It is measured experimentally using standardized tests (e.g., ASTM E399 or E1820) on thick specimens to ensure plane strain conditions, which represent the most conservative (lowest) toughness value for a given material.
Units are typically $Pa \sqrt{m}$ or $psi \sqrt{in}$, the same as K.

**What could go wrong:** Assuming $K_{IC}$ is constant for all conditions. It can be significantly affected by temperature (often decreasing at cryogenic temperatures), strain rate (faster loading can reduce it), and environmental factors (e.g., hydrogen embrittlement). Also, confusing $K_C$ (plane stress toughness) with $K_{IC}$ (plane strain toughness). $K_{IC}$ is generally lower and thus more conservative for design.

### Step 6: The Fracture Criterion

**Plain English:** This is the core principle of fracture mechanics. If the "danger level" at the crack tip (our calculated K) reaches or exceeds the material's "danger threshold" (its $K_{IC}$), then the crack will start to grow rapidly and uncontrollably, leading to failure. If K is less than $K_{IC}$, the crack is stable and won't grow under the current load.

**Concrete Example:** You calculate that a rocket component with a known crack will experience a stress intensity factor $K_I = 50 \text{ MPa}\sqrt{m}$ under launch conditions. The material's fracture toughness is $K_{IC} = 60 \text{ MPa}\sqrt{m}$. Since $K_I < K_{IC}$, the crack is stable, and the component is safe from immediate fracture. However, if the load increases or the crack grows due to fatigue, and $K_I$ reaches $60 \text{ MPa}\sqrt{m}$, it will fail.

**Formal/Mathematical Version:** The condition for unstable crack propagation (fracture) is:
$$ K_I \ge K_{IC} $$
Where:
*   $K_I$ is the calculated Mode I stress intensity factor for the component under load.
*   $K_{IC}$ is the plane strain fracture toughness of the material.

**What could go wrong:** Not including a safety factor in design. Even if $K_I < K_{IC}$, engineers typically design for $K_I \le K_{IC} / FS$, where FS is a safety factor (e.g., 1.5 to 3).

### Step 7: Plane Stress vs. Plane Strain

**Plain English:** Imagine a very thin sheet of material versus a very thick block. When you pull on the thin sheet with a crack, the material can deform and "neck down" in the thickness direction, which helps to relieve some of the stress concentration. This is called **plane stress**. It generally makes the material *appear* tougher (higher effective toughness, $K_C$).
Now, imagine the very thick block. The material in the middle of the thickness is constrained by the material on either side; it can't easily deform in the thickness direction. This constraint makes the stress concentration much more severe, and the crack is more likely to grow in a brittle manner. This is called **plane strain**. Under plane strain, the material exhibits its *minimum* toughness ($K_{IC}$).

**Concrete Example:** A thin aluminum beverage can (plane stress) can be torn fairly easily, but it deforms a lot first. A very thick steel pressure vessel (plane strain conditions near the crack tip) will fail much more suddenly and catastrophically once a critical crack size is reached, with less visible deformation.

**Formal/Mathematical Version:**
*   **Plane Stress:** Occurs in thin sections where stress normal to the surface is negligible, allowing for significant plastic deformation in the thickness direction. The critical stress intensity factor is often denoted $K_C$ and can be higher than $K_{IC}$.
*   **Plane Strain:** Occurs in thick sections where deformation in the thickness direction is constrained. The stress normal to the crack plane (in the thickness direction) is significant. This condition promotes brittle fracture and leads to the lowest, most conservative value of fracture toughness, $K_{IC}$.
The transition between plane stress and plane strain behavior depends on the material's yield strength and the component's thickness ($B$). For plane strain conditions to prevail, a common criterion is:
$$ B \ge 2.5 \left( \frac{K_{IC}}{\sigma_y} \right)^2 $$
Where $B$ is the specimen thickness, and $\sigma_y$ is the yield strength.

**What could go wrong:** Using plane stress toughness ($K_C$) values for thick sections, or vice-versa. For critical aerospace applications, $K_{IC}$ (plane strain) is almost always used for design because it represents the lower bound of toughness and provides a conservative safety margin.

## 5. Worked examples — multiple, with every step shown

Here are several worked examples to solidify your understanding.

### Example 1: Calculating Stress Intensity Factor for a Center-Cracked Plate

**Problem Statement:** A large aluminum alloy plate has a central crack of total length $2a = 4 \text{ mm}$. The plate is subjected to a uniform tensile stress of $\sigma = 150 \text{ MPa}$. Assume the plate is wide enough that the geometry correction factor $Y = 1$. Calculate the Mode I stress intensity factor ($K_I$).

**Given:**
*   Total crack length ($2a$) = $4 \text{ mm}$
*   Applied tensile stress ($\sigma$) = $150 \text{ MPa}$
*   Geometry factor ($Y$) = $1$

**Want:**
*   Mode I stress intensity factor ($K_I$)

**Solution:**

1.  **Identify the relevant formula:**
    $$ K_I = Y \sigma \sqrt{\pi a} $$
    This is the standard formula for Mode I stress intensity factor, including the geometry correction factor.

2.  **Determine the half-crack length ($a$):**
    The problem gives the total crack length $2a$. We need $a$ for the formula.
    $$ a = \frac{2a}{2} = \frac{4 \text{ mm}}{2} = 2 \text{ mm} $$
    We divide the total crack length by 2 to get the half-crack length, as required by the formula for a central crack.

3.  **Convert units to be consistent (SI units preferred):**
    *   Stress $\sigma = 150 \text{ MPa} = 150 \times 10^6 \text{ Pa}$
    *   Half-crack length $a = 2 \text{ mm} = 2 \times 10^{-3} \text{ m}$
    Converting to Pascals (N/m²) and meters ensures our final $K_I$ will be in $Pa \sqrt{m}$, which is a standard SI unit for stress intensity.

4.  **Substitute values into the formula:**
    $$ K_I = (1) \times (150 \times 10^6 \text{ Pa}) \times \sqrt{\pi \times (2 \times 10^{-3} \text{ m})} $$
    We plug in the values for $Y$, $\sigma$, and $a$ into the stress intensity factor equation.

5.  **Calculate the square root term:**
    $$ \sqrt{\pi \times 2 \times 10^{-3} \text{ m}} = \sqrt{0.006283 \text{ m}} \approx 0.07926 \text{ m}^{1/2} $$
    First, calculate the product inside the square root, then take the square root.

6.  **Perform the final multiplication:**
    $$ K_I = 150 \times 10^6 \text{ Pa} \times 0.07926 \text{ m}^{1/2} $$
    $$ K_I = 11.889 \times 10^6 \text{ Pa} \sqrt{m} $$
    $$ K_I \approx 11.89 \text{ MPa}\sqrt{m} $$
    Multiply the stress by the square root term. The units combine to give $Pa \sqrt{m}$, which is commonly expressed as $MPa \sqrt{m}$ for convenience.

**Final Answer:**
$$ \boxed{K_I = 11.89 \text{ MPa}\sqrt{m}} $$

**Reflection:** This was a straightforward application of the basic $K_I$ formula. The trickiest part is often ensuring correct unit conversions and remembering that $a$ is the half-crack length for a central crack.

---

### Example 2: Determining Critical Crack Size

**Problem Statement:** A structural component in a satellite is made from a titanium alloy with a plane strain fracture toughness ($K_{IC}$) of $55 \text{ MPa}\sqrt{m}$. The component is subjected to an anticipated maximum tensile stress of $\sigma = 300 \text{ MPa}$. Assuming an edge crack geometry where the geometry factor $Y = 1.12$, what is the critical crack length ($a_c$) at which unstable fracture will occur?

**Given:**
*   Fracture toughness ($K_{IC}$) = $55 \text{ MPa}\sqrt{m}$
*   Applied tensile stress ($\sigma$) = $300 \text{ MPa}$
*   Geometry factor ($Y$) = $1.12$

**Want:**
*   Critical crack length ($a_c$)

**Solution:**

1.  **Identify the fracture criterion:**
    Unstable fracture occurs when $K_I \ge K_{IC}$. To find the critical crack length, we set $K_I = K_{IC}$.
    $$ K_{IC} = Y \sigma \sqrt{\pi a_c} $$
    We use the fracture criterion to link the material property ($K_{IC}$) with the loading conditions and crack size.

2.  **Convert units to be consistent (SI units):**
    *   $K_{IC} = 55 \text{ MPa}\sqrt{m} = 55 \times 10^6 \text{ Pa}\sqrt{m}$
    *   $\sigma = 300 \text{ MPa} = 300 \times 10^6 \text{ Pa}$
    Consistency in units is crucial for accurate calculations.

3.  **Rearrange the formula to solve for $a_c$:**
    $$ \frac{K_{IC}}{Y \sigma} = \sqrt{\pi a_c} $$
    Divide both sides by $Y\sigma$.

    $$ \left( \frac{K_{IC}}{Y \sigma} \right)^2 = \pi a_c $$
    Square both sides to remove the square root.

    $$ a_c = \frac{1}{\pi} \left( \frac{K_{IC}}{Y \sigma} \right)^2 $$
    Divide by $\pi$ to isolate $a_c$. This is the rearranged formula we will use.

4.  **Substitute the given values into the rearranged formula:**
    $$ a_c = \frac{1}{\pi} \left( \frac{55 \times 10^6 \text{ Pa}\sqrt{m}}{1.12 \times 300 \times 10^6 \text{ Pa}} \right)^2 $$
    Plug in the numerical values for $K_{IC}$, $Y$, and $\sigma$.

5.  **Calculate the term inside the parenthesis:**
    $$ \frac{55 \times 10^6}{1.12 \times 300 \times 10^6} = \frac{55}{1.12 \times 300} = \frac{55}{336} \approx 0.16369 $$
    The $10^6$ terms cancel out, simplifying the calculation.

6.  **Square the result:**
    $$ (0.16369)^2 \approx 0.026795 $$

7.  **Divide by $\pi$:**
    $$ a_c = \frac{0.026795}{\pi} \approx 0.008529 \text{ m} $$
    The final answer will be in meters.

8.  **Convert to a more practical unit (e.g., millimeters):**
    $$ a_c \approx 0.008529 \text{ m} = 8.529 \text{ mm} $$
    Multiplying by 1000 converts meters to millimeters.

**Final Answer:**
$$ \boxed{a_c = 8.53 \text{ mm}} $$

**Reflection:** This example demonstrates how to use fracture mechanics to determine the maximum allowable defect size. It's crucial for inspection planning. The main challenge is correctly rearranging the formula and maintaining unit consistency. Note that for an edge crack, $a_c$ refers to the full crack length from the edge.

---

### Example 3: Maximum Allowable Stress with a Safety Factor

**Problem Statement:** A critical component in a spacecraft propulsion system has a known manufacturing defect, which can be approximated as an edge crack of length $a = 2.5 \text{ mm}$. The material's fracture toughness ($K_{IC}$) is $70 \text{ MPa}\sqrt{m}$. For this geometry, the factor $Y = 1.2$. The design requires a safety factor ($FS$) of $2.0$ against fracture. What is the maximum allowable tensile stress ($\sigma_{allow}$) that can be applied to the component?

**Given:**
*   Crack length ($a$) = $2.5 \text{ mm}$
*   Fracture toughness ($K_{IC}$) = $70 \text{ MPa}\sqrt{m}$
*   Geometry factor ($Y$) = $1.2$
*   Safety factor ($FS$) = $2.0$

**Want:**
*   Maximum allowable tensile stress ($\sigma_{allow}$)

**Solution:**

1.  **Define the design criterion with a safety factor:**
    Instead of $K_I = K_{IC}$, we design such that the applied stress intensity factor is less than or equal to $K_{IC}$ divided by the safety factor.
    $$ K_I \le \frac{K_{IC}}{FS} $$
    This ensures that even if there's some uncertainty or unexpected load, we are still operating below the material's fracture limit.

2.  **Set up the equation for the allowable stress intensity factor:**
    The allowable stress intensity factor ($K_{I,allow}$) is:
    $$ K_{I,allow} = \frac{K_{IC}}{FS} = \frac{70 \text{ MPa}\sqrt{m}}{2.0} = 35 \text{ MPa}\sqrt{m} $$
    This is the maximum stress intensity we permit at the crack tip under normal operating conditions.

3.  **Identify the general formula for $K_I$:**
    $$ K_I = Y \sigma \sqrt{\pi a} $$
    We will use this formula, replacing $K_I$ with $K_{I,allow}$ and $\sigma$ with $\sigma_{allow}$.

4.  **Convert units to be consistent (SI units):**
    *   $K_{I,allow} = 35 \text{ MPa}\sqrt{m} = 35 \times 10^6 \text{ Pa}\sqrt{m}$
    *   $a = 2.5 \text{ mm} = 2.5 \times 10^{-3} \text{ m}$
    Standard unit conversion for consistency.

5.  **Rearrange the formula to solve for $\sigma_{allow}$:**
    $$ K_{I,allow} = Y \sigma_{allow} \sqrt{\pi a} $$
    $$ \sigma_{allow} = \frac{K_{I,allow}}{Y \sqrt{\pi a}} $$
    Isolate $\sigma_{allow}$ by dividing both sides by $Y \sqrt{\pi a}$.

6.  **Substitute the values into the rearranged formula:**
    $$ \sigma_{allow} = \frac{35 \times 10^6 \text{ Pa}\sqrt{m}}{1.2 \times \sqrt{\pi \times (2.5 \times 10^{-3} \text{ m})}} $$
    Plug in $K_{I,allow}$, $Y$, and $a$.

7.  **Calculate the square root term:**
    $$ \sqrt{\pi \times 2.5 \times 10^{-3} \text{ m}} = \sqrt{0.007854 \text{ m}} \approx 0.08862 \text{ m}^{1/2} $$
    First, calculate the product inside the square root, then take the square root.

8.  **Perform the multiplication in the denominator:**
    $$ 1.2 \times 0.08862 \approx 0.10634 $$

9.  **Perform the final division:**
    $$ \sigma_{allow} = \frac{35 \times 10^6 \text{ Pa}\sqrt{m}}{0.10634 \text{ m}^{1/2}} $$
    $$ \sigma_{allow} \approx 329.14 \times 10^6 \text{ Pa} $$
    $$ \sigma_{allow} \approx 329.14 \text{ MPa} $$
    The units $\sqrt{m}$ in the numerator and denominator cancel, leaving Pascals.

**Final Answer:**
$$ \boxed{\sigma_{allow} = 329.1 \text{ MPa}} $$

**Reflection:** This example highlights the importance of safety factors in engineering design. It's a common practice to derate material properties or applied loads to ensure robust performance. The difficulty here lies in correctly incorporating the safety factor and rearranging the equation.

---

### Example 4: Comparing Two Materials for a Cracked Component

**Problem Statement:** A new design for a spacecraft's structural frame requires a material that can withstand a maximum tensile stress of $250 \text{ MPa}$ even if a crack of $a = 5 \text{ mm}$ is present. For this particular geometry, the geometry factor $Y = 1.05$. You have two candidate materials:
*   Material A: $K_{IC} = 60 \text{ MPa}\sqrt{m}$
*   Material B: $K_{IC} = 80 \text{ MPa}\sqrt{m}$

Which material is suitable for this application? Assume no additional safety factor is required for this comparison.

**Given:**
*   Applied tensile stress ($\sigma$) = $250 \text{ MPa}$
*   Crack length ($a$) = $5 \text{ mm}$
*   Geometry factor ($Y$) = $1.05$
*   Material A: $K_{IC,A} = 60 \text{ MPa}\sqrt{m}$
*   Material B: $K_{IC,B} = 80 \text{ MPa}\sqrt{m}$

**Want:**
*   Determine which material is suitable.

**Solution:**

1.  **First, calculate the stress intensity factor ($K_I$) for the given conditions:**
    We need to determine the "danger level" at the crack tip under the specified operating conditions.
    $$ K_I = Y \sigma \sqrt{\pi a} $$
    This is the fundamental equation for $K_I$.

2.  **Convert units to be consistent (SI units):**
    *   $\sigma = 250 \text{ MPa} = 250 \times 10^6 \text{ Pa}$
    *   $a = 5 \text{ mm} = 5 \times 10^{-3} \text{ m}$
    Ensuring consistent units is crucial for correct calculation.

3.  **Substitute values into the $K_I$ formula:**
    $$ K_I = (1.05) \times (250 \times 10^6 \text{ Pa}) \times \sqrt{\pi \times (5 \times 10^{-3} \text{ m})} $$
    Plug in $Y$, $\sigma$, and $a$.

4.  **Calculate the square root term:**
    $$ \sqrt{\pi \times 5 \times 10^{-3} \text{ m}} = \sqrt{0.015708 \text{ m}} \approx 0.12533 \text{ m}^{1/2} $$
    Calculate the product inside the square root, then take the square root.

5.  **Perform the final multiplication for $K_I$:**
    $$ K_I = 1.05 \times 250 \times 10^6 \text{ Pa} \times 0.12533 \text{ m}^{1/2} $$
    $$ K_I = 32.90 \times 10^6 \text{ Pa}\sqrt{m} $$
    $$ K_I \approx 32.90 \text{ MPa}\sqrt{m} $$
    This is the stress intensity factor that the component will experience.

6.  **Now, compare $K_I$ with the $K_{IC}$ of each material:**
    The fracture criterion is $K_I < K_{IC}$ for safe operation.

    *   **For Material A:**
        $K_I = 32.90 \text{ MPa}\sqrt{m}$
        $K_{IC,A} = 60 \text{ MPa}\sqrt{m}$
        Is $32.90 < 60$? Yes.
        Therefore, Material A is suitable.

    *   **For Material B:**
        $K_I = 32.90 \text{ MPa}\sqrt{m}$
        $K_{IC,B} = 80 \text{ MPa}\sqrt{m}$
        Is $32.90 < 80$? Yes.
        Therefore, Material B is also suitable.

7.  **Conclusion:**
    Both Material A and Material B are suitable for the application because their fracture toughness values are greater than the calculated stress intensity factor under the given conditions. Material B provides a larger margin of safety, being significantly tougher.

**Final Answer:**
$$ \boxed{\text{Both Material A and Material B are suitable. Material B provides a larger safety margin.}} $$

**Reflection:** This example demonstrates how fracture mechanics aids in material selection. When multiple materials are suitable, other factors like cost, weight, and manufacturing ease would then come into play. The main challenge is to correctly calculate the operating $K_I$ and then apply the fracture criterion for each candidate material.

## 6. Common mistakes and traps

1.  **Confusing Stress Intensity Factor (K) with Stress ($\sigma$):** K is not stress. It is a parameter that characterizes the stress *field* near a crack tip, incorporating crack size and geometry. Stress is force per unit area. This is a fundamental conceptual error.
2.  **Incorrectly Using Half-Crack Length ($a$):** For a central crack of total length $2a$, the formula uses $a$. For an edge crack of total length $a$, the formula uses $a$. Students often incorrectly use $2a$ for $a$ in the formula, or vice versa, leading to an error of $\sqrt{2}$ or $1/\sqrt{2}$.
3.  **Forgetting the Geometry Factor ($Y$):** The basic $K_I = \sigma \sqrt{\pi a}$ formula is for an infinite plate with a central crack. Real-world components have finite dimensions and specific crack locations (edge, corner, hole). Ignoring $Y$ or using $Y=1$ when it's not appropriate can lead to significant errors.
4.  **Inconsistent Units:** Mixing SI units (Pascals, meters) with imperial units (psi, inches) or not converting millimeters to meters (or inches to feet) before calculation. This will result in incorrect numerical values for K and KIC.
5.  **Ignoring Plane Strain vs. Plane Stress:** Using a $K_C$ (plane stress) value for a thick component where plane strain conditions ($K_{IC}$) are more appropriate and conservative, or vice versa. $K_{IC}$ is generally the lower bound and should be used for critical design.
6.  **Assuming KIC is Constant:** Fracture toughness is not always a fixed value. It can be significantly affected by temperature (especially cryogenic temperatures in aerospace), strain rate, and environmental conditions (e.g., hydrogen embrittlement, stress corrosion cracking). Ignoring these dependencies can lead to unsafe designs.
7.  **Neglecting the $\pi$ in the Square Root:** A common oversight is to forget the $\pi$ term inside the square root in the $K_I$ formula, leading to a calculation error of $\sqrt{\pi}$.

## 7. Textbook-precise explanation

Fracture mechanics, specifically Linear Elastic Fracture Mechanics (LEFM), provides a quantitative framework for predicting the brittle fracture of materials containing pre-existing flaws or cracks. The core concept revolves around characterizing the stress field in the vicinity of a crack tip using the **Stress Intensity Factor ($K$)** and comparing it to a material's inherent resistance to crack propagation, the **Fracture Toughness ($K_{IC}$)**.

The stress field near the tip of a sharp crack in a linear elastic material can be uniquely described by a single parameter, the Stress Intensity Factor $K$. For Mode I (opening mode) loading, which is typically the most critical for brittle fracture, the asymptotic stress components ($\sigma_{ij}$) in the crack-tip coordinate system ($r, \theta$) are given by:

$$ \sigma_x = \frac{K_I}{\sqrt{2\pi r}} \cos\left(\frac{\theta}{2}\right) \left[1 - \sin\left(\frac{\theta}{2}\right) \sin\left(\frac{3\theta}{2}\right)\right] $$
$$ \sigma_y = \frac{K_I}{\sqrt{2\pi r}} \cos\left(\frac{\theta}{2}\right) \left[1 + \sin\left(\frac{\theta}{2}\right) \sin\left(\frac{3\theta}{2}\right)\right] $$
$$ \tau_{xy} = \frac{K_I}{\sqrt{2\pi r}} \sin\left(\frac{\theta}{2}\right) \cos\left(\frac{\theta}{2}\right) \cos\left(\frac{3\theta}{2}\right) $$
And for plane strain conditions, a normal stress component in the thickness direction exists:
$$ \sigma_z = \nu (\sigma_x + \sigma_y) $$
where $\nu$ is Poisson's ratio. For plane stress, $\sigma_z = 0$.

The general form of the Mode I stress intensity factor for a crack of characteristic length $a$ under a remote applied stress $\sigma$ is:
$$ K_I = Y \sigma \sqrt{\pi a} $$
where $Y$ is a dimensionless geometry factor that accounts for the specific crack geometry (e.g., edge crack, central crack), component dimensions (e.g., finite width), and loading conditions. Values for $Y$ are typically tabulated in fracture mechanics handbooks (e.g., "Murakami, Y. Stress Intensity Factors Handbook" or "Tada, H., Paris, P.C., and Irwin, G.R. The Stress Analysis of Cracks Handbook").

**Fracture Toughness ($K_{IC}$)** is a critical material property representing the material's resistance to unstable crack propagation under Mode I plane strain conditions. It is experimentally determined using standardized tests (e.g., ASTM E399 or E1820) on sufficiently thick specimens to ensure a high degree of triaxial stress constraint at the crack tip, which promotes brittle behavior and yields the minimum, most conservative toughness value. $K_{IC}$ is highly sensitive to temperature, strain rate, and microstructure.

The **Fracture Criterion** in LEFM states that unstable, rapid crack propagation occurs when the calculated stress intensity factor ($K_I$) at the crack tip reaches or exceeds the material's plane strain fracture toughness ($K_{IC}$):
$$ K_I \ge K_{IC} $$
If $K_I < K_{IC}$, the crack is considered stable under the given loading conditions.

The distinction between **Plane Strain** and **Plane Stress** conditions is crucial.
*   **Plane Strain** conditions prevail in thick bodies where deformation in the thickness direction is severely constrained. This leads to a triaxial stress state at the crack tip and typically results in a lower fracture toughness ($K_{IC}$).
*   **Plane Stress** conditions exist in thin bodies where the stress normal to the surface is negligible, allowing for through-thickness deformation (necking). This can lead to significant plastic deformation and a higher apparent fracture toughness ($K_C$).

The applicability of LEFM is predicated on the assumption that the plastic zone size at the crack tip is small compared to the crack length and other relevant dimensions of the component. When significant plastic deformation occurs, more advanced elastic-plastic fracture mechanics (e.g., J-integral, CTOD) is required.

*Reference:* Anderson, T.L. *Fracture Mechanics: Fundamentals and Applications*. CRC Press, 2017. Broek, D. *Elementary Engineering Fracture Mechanics*. Springer, 1986.

## 8. ASCII diagrams

Here's a diagram illustrating a common crack geometry and the concept of stress concentration.

```text
       F <---------------------------------------------------> F
       |                                                     |
       V                                                     V
      +-------------------------------------------------------+
      |       Nominal Stress (σ)                            |
      |                                                     |
      |          Crack (length 2a)                          |
      |          <--------->                                |
      |          |         |                                |
      |          V         V                                |
      |          .---------^--------------------.           |
      |          |         |                    |           |
      |          |         |                    |           |
      |          |         |                    |           |
      |          |         |                    |           |
      |          |         |                    |           |
      |          |         |                    |           |
      |          |         |                    |           |
      |          |         |                    |           |
      |          |         |                    |           |
      |          '---------v--------------------'           |
      |                 ^   ^                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |   |                               |
      |                 |