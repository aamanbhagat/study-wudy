## What it is
Newton's rings are a pattern of concentric bright and dark circles formed by the interference of light waves. This pattern arises when light reflects between a spherical surface (like a plano-convex lens) and an adjacent flat surface, creating a thin film of air whose thickness increases with distance from the point of contact.

## Why it matters
This phenomenon is not just a classroom curiosity; it is a foundational principle of interferometry, a technique for making extremely precise measurements. In aerospace, interferometers test the surface quality of mirrors for telescopes and guidance systems to nanometer precision. In manufacturing, it's used for quality control of optical components and measuring the thickness of thin-film coatings on semiconductors and solar cells.

## When to study it
Before tackling this derivation, you must have a solid grasp of the following:
*   **Wave Superposition and Interference:** The conditions for constructive ($2nt = m\lambda$) and destructive ($2nt = (m+1/2)\lambda$) interference in thin films.
*   **Phase Change on Reflection:** Understanding that a light wave undergoes a $\pi$ radian ($180^\circ$) phase shift when reflecting from a medium with a higher refractive index.
*   **Geometry of a Circle:** Specifically, the relationship between the radius of a circle, a chord, and the sagitta (the height of the arc). The Pythagorean theorem is sufficient.

If any of these are weak, review them first. The derivation hinges entirely on combining these three concepts.

## How to study it (step by step)
1.  **Draw the System.** Sketch a side-view of a plano-convex lens resting on a flat glass plate. Label the radius of curvature of the lens, $R$. Identify the thin film of air trapped between the two surfaces.
2.  **Trace the Rays.** Draw two rays of monochromatic light incident from above. Ray 1 reflects from the bottom curved surface of the lens (a glass-to-air interface). Ray 2 passes through the air film, reflects from the top surface of the flat plate (an air-to-glass interface), and travels back up. These two reflected rays interfere.
3.  **Apply Interference Conditions.** Determine the phase shifts. Ray 1 (glass-to-air) has no phase shift. Ray 2 (air-to-glass) has a $\pi$ phase shift. This "flips" the standard conditions. Therefore, for a film of thickness $t$ and refractive index $n$:
    *   Destructive Interference (dark ring): $2nt = m\lambda$
    *   Constructive Interference (bright ring): $2nt = (m+1/2)\lambda$
4.  **Derive the Geometric Relation.** Focus on the geometry. Form a right-angled triangle with sides $r$ (the horizontal distance from the center), $R-t$ (the vertical side), and hypotenuse $R$. Use the Pythagorean theorem: $R^2 = r^2 + (R-t)^2$.
5.  **Simplify and Approximate.** Expand the geometric relation: $R^2 = r^2 + R^2 - 2Rt + t^2$. Since the lens curvature is large, the thickness $t$ is very small compared to $R$ and $r$. Thus, the $t^2$ term is negligible ($t^2 \approx 0$). This simplifies to $r^2 \approx 2Rt$. This is the crucial link between the observable ring radius $r$ and the film thickness $t$.
6.  **Combine and Solve.** Substitute $t = r^2/(2R)$ into the interference conditions from Step 3. This yields the final formulas for the radii of the dark and bright rings as a function of $m$, $\lambda$, $R$, and $n$.

## Key ideas, with intuition
1.  **The Air Gap is a Circular Wedge.** The "thin film" is the layer of air between the lens and the plate. Its thickness is zero at the central point of contact and grows quadratically as you move outwards. A path of constant thickness is a circle, which is why the interference fringes are rings.

2.  **The Phase Flip Creates the Central Dark Spot.** The two interfering rays come from reflections at (1) the bottom of the lens (glass-to-air, $n_{glass} > n_{air}$) and (2) the top of the plate (air-to-glass, $n_{air} < n_{glass}$). Only the second reflection involves going from a lower to a higher refractive index, so only it gets a $\pi$ phase shift. At the exact center, the path difference $2t$ is zero, but this built-in phase shift causes perfect destructive interference. This is why the center of Newton's rings is always dark in reflection.

3.  **Geometry Governs Ring Spacing.** The relationship $r^2 \approx 2Rt$ connects the macroscopic geometry ($R$) to the microscopic thickness ($t$) that governs interference.
    $$ r^2 \approx 2Rt \implies r = \sqrt{2Rt} $$
    Since the condition for dark rings is $t \propto m$, we get $r \propto \sqrt{m}$. This means the rings get closer together as you move further from the center, because the radius grows as the square root of the ring number.

## Worked example
**Problem:** A plano-convex lens with a radius of curvature $R = 1.0$ m is placed on a flat glass plate. The apparatus is illuminated from above with monochromatic light of wavelength $\lambda = 589$ nm. The film between the lens and plate is air ($n=1.00$). Find the radius of the 10th dark ring.

**Solution:**

1.  **Identify the correct interference condition.** We are looking for a dark ring in a reflected pattern with one phase flip. The condition for destructive interference is therefore:
    $$ 2nt = m\lambda $$
    For the 10th dark ring, we use $m=10$. (The central dark spot is $m=0$).

2.  **State the geometric relationship.** For a spherical lens with large $R$, the thickness $t$ at a radius $r$ is given by the approximation:
    $$ r^2 \approx 2Rt $$

3.  **Combine the physics and geometry.** We need to find the radius $r_{10}$ for the $m=10$ case. First, solve the geometric equation for $t$:
    $$ t = \frac{r^2}{2R} $$
    Now substitute this expression for $t$ into the interference condition:
    $$ 2n \left( \frac{r_m^2}{2R} \right) = m\lambda $$

4.  **Solve for the desired variable, $r_m$.**
    $$ \frac{nr_m^2}{R} = m\lambda $$
    $$ r_m^2 = \frac{m\lambda R}{n} $$
    $$ r_m = \sqrt{\frac{m\lambda R}{n}} $$

5.  **Substitute numerical values.**
    *   $m = 10$
    *   $\lambda = 589 \times 10^{-9}$ m
    *   $R = 1.0$ m
    *   $n = 1.00$
    $$ r_{10} = \sqrt{\frac{10 \cdot (589 \times 10^{-9} \text{ m}) \cdot (1.0 \text{ m})}{1.00}} $$
    $$ r_{10} = \sqrt{5.89 \times 10^{-6} \text{ m}^2} $$
    $$ r_{10} \approx 2.427 \times 10^{-3} \text{ m} \quad \text{or} \quad 2.427 \text{ mm} $$

**Reflection:** The logic flowed directly from physics to geometry and then to algebra. Step 1 set the physical condition (destructive interference). Step 2 provided the geometric constraint. Step 3 combined them into a single powerful equation, which was solved in Step 4. Step 5 was the final calculation.

## Diagrams

A cross-section of the Newton's rings setup.

```text
      <-- r -->
    +-----------+
    |           |
    |           |
    |           v t
  ( \.........../...........( R
   \           /           /
    \         /           /
     \       /           /
      \     /           /
       \---/ <-- Point of Contact (m=0)
--------------------------- <--- Flat glass plate
        ^
        | Ray 2 reflects here (air-to-glass, pi shift)
   ^
   | Ray 1 reflects here (glass-to-air, no shift)
   |
 Incident Light
```

Geometric derivation for $r^2 \approx 2Rt$.

```text
             . C (Center of Curvature)
            /|
           / |
          /  |
       R /   |
        /    | R-t
       /     |
      /      |
     /a______|
    ( Lens surface
     <-- r -->
```
In the right triangle with vertices `C`, `a`, and the point on the lens surface, the Pythagorean theorem states: $R^2 = r^2 + (R-t)^2$.

## Memory technique — remember this forever
1.  **Visual Hook:** Picture Newton sitting under an apple tree, but instead of an apple, a giant, curved lens falls on a flat plate at his feet. It makes a "dark spot" where it hits. This reminds you that the center ($m=0$) is dark. The formula for dark rings is "rooted" in the ring number, $m$: $r_m \propto \sqrt{m}$.

2.  **Must Overlearn Formulas:**
    *   Geometric Approximation: $r^2 \approx 2Rt$
    *   Dark Rings (reflection): $r_m = \sqrt{\frac{m\lambda R}{n}}$ for $m=0, 1, 2, ...$
    *   Bright Rings (reflection): $r_m = \sqrt{\frac{(m+1/2)\lambda R}{n}}$ for $m=0, 1, 2, ...$

3.  **Spaced Repetition Schedule:** Review this derivation and these formulas now. Then again in **1 day**, **3 days**, **7 days**, **16 days**, and **35 days**.

4.  **First Principles Pathway:** If you forget the formulas, rebuild them.
    *   **Physics:** Draw the two rays. One reflects from air-to-glass, so it gets a $\pi$ phase shift. The path difference is $2t$. The condition for a dark fringe is therefore $2nt = m\lambda$.
    *   **Geometry:** Draw the right triangle with sides $R$, $R-t$, and $r$. Use Pythagoras: $R^2 = r^2 + (R-t)^2$.
    *   **Approximation:** Expand and cancel: $R^2 = r^2 + R^2 - 2Rt + t^2$. Since $t \ll R$, $t^2 \approx 0$. This leaves $r^2 \approx 2Rt$.
    *   **Combine:** Substitute $t = r^2/(2R)$ into $2nt = m\lambda$ and solve for $r$.

## Common mistakes
*   **Forgetting the Phase Shift:** The most common error. Students use the standard thin-film conditions and get the bright/dark formulas reversed, incorrectly predicting a bright center. Always check which interfaces cause a phase shift.
*   **Confusing $r$ and $R$:** Mixing up the radius of a ring ($r$) with the radius of curvature of the lens ($R$) in the final formula. $R$ is a fixed property of the lens; $r$ is the variable you are solving for.
*   **Off-by-One Errors with $m$:** Remember that the central dark spot corresponds to $m=0$. The "first" dark ring after the center is $m=1$. The "first" bright ring is $m=0$ in the bright ring formula.
*   **Using Diameter instead of Radius:** Problems sometimes ask for the diameter of a ring. Remember to calculate the radius $r$ first and then multiply by 2.

## Self-check
1.  If the air gap ($n \approx 1$) in a Newton's rings apparatus is filled with water ($n \approx 1.33$), do the rings shrink or expand? Justify your answer using the derived formula.
2.  Light can also pass *through* the apparatus. Derive the formula for the radius of the $m$-th *bright* ring as seen in transmitted light. (Hint: How many reflections and phase shifts are involved for the two interfering transmitted rays?)
3.  A Newton's rings setup ($R=2.0$ m, air gap) is illuminated by light with two wavelengths, $\lambda_1 = 640$ nm (red) and $\lambda_2 = 480$ nm (blue). Find the radius of the smallest non-zero bright red ring that coincides exactly with a bright blue ring.