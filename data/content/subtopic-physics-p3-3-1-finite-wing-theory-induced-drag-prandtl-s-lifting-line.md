## What it is
Prandtl's lifting-line theory is a mathematical model that simplifies a three-dimensional wing into a single line of bound vorticity (a "lifting line") spanning the wingspan. This model allows us to calculate the aerodynamic forces on a finite wing, most importantly a type of drag called induced drag, which does not exist in two-dimensional (infinite wing) analysis. It connects the 2D properties of an airfoil section to the 3D performance of the entire wing.

## Why it matters
This theory is the first major step in real-world aircraft design, explaining why long, thin wings (like on a U-2 spy plane or a glider) are more efficient than short, stubby ones (like on an F-16 fighter). It provides the foundational formula for induced drag, a major component of total drag in slow flight, directly impacting fuel efficiency, range, and climb performance. Understanding this is essential for designing efficient wings and for analyzing flight performance.

## When to study it
You must have a solid grasp of the following before proceeding:
1.  **Potential Flow:** The concept of irrotational, inviscid flow.
2.  **Vorticity and Circulation ($\Gamma$):** The definition of circulation and its relation to vorticity.
3.  **Kutta-Joukowski Theorem:** The relationship between lift per unit span and circulation, $L' = \rho_\infty V_\infty \Gamma$.
4.  **Airfoil Theory (2D):** The relationship between an airfoil's angle of attack ($\alpha$) and its sectional lift coefficient ($c_l$), specifically the concept of the lift-curve slope ($a_0 = dc_l/d\alpha \approx 2\pi$).

If these concepts are not clear, review them first. This topic builds directly upon them.

## How to study it (step by step)
1.  **Visualize the Physics:** Start by drawing a finite wing. Mark the high-pressure area below and low-pressure area above. Convince yourself that air *must* flow from high to low pressure around the wingtips, creating a trailing vortex. Watch a video of wingtip vortices from an aircraft to solidify this.
2.  **Connect Vortices to Downwash:** Understand that according to the Biot-Savart Law, these trailing vortices induce a velocity field. Specifically, they create a downward velocity component over the wing itself, known as "downwash" ($w$).
3.  **Derive the Effective Angle of Attack:** Draw the velocity triangle at a wing section. You have the freestream velocity $V_\infty$ coming in horizontally and the downwash $w$ pointing down. The vector sum is the *local* or *effective* velocity $V_{eff}$. The angle between $V_\infty$ and $V_{eff}$ is the "induced angle of attack," $\alpha_i$. The angle the airfoil section *actually* feels is $\alpha_{eff} = \alpha - \alpha_i$.
4.  **Tilt the Lift Vector:** Lift is, by definition, perpendicular to the incoming flow. In 3D, this is the *local* flow, $V_{eff}$. Since $V_{eff}$ is tilted downward by $\alpha_i$, the lift vector $L$ is tilted backward by the same angle.
5.  **Derive Induced Drag:** Decompose the tilted lift vector into a vertical component (true lift, opposing weight) and a horizontal component (acting in the drag direction). This horizontal component is the induced drag, $D_i$. Using small angle approximations ($\sin \alpha_i \approx \alpha_i$), show that $D_i = L \alpha_i$.
6.  **Solve Prandtl's Equation for the Ideal Case:** Study the fundamental equation of lifting-line theory, which relates the local circulation $\Gamma(y)$ to the effective angle of attack. Don't memorize the full integral equation yet. Focus on its most famous solution: the elliptical lift distribution, $\Gamma(y) = \Gamma_0 \sqrt{1 - (2y/b)^2}$, which results in a uniform downwash across the span.
7.  **Calculate $C_{D,i}$:** For the elliptical case, the induced angle of attack and induced drag coefficient are constant across the span. Derive the key result: $C_{D,i} = \frac{C_L^2}{\pi AR}$, where $AR$ is the aspect ratio ($b^2/S$).

## Key ideas, with intuition
1.  **Vortices are Inescapable:** A key theorem of fluid dynamics (Helmholtz) states a vortex filament cannot end in a fluid. The "bound vortex" that generates lift along the wing must turn and trail downstream, typically from the wingtips. This creates the trailing vortex system. Think of the wing's lift-generating circulation as a segment of a giant vortex loop that closes far behind the aircraft.

2.  **Downwash is the Consequence:** The trailing vortices induce a downward flow field on the wing itself. Imagine two long, parallel whirlpools trailing from the wingtips. The water (air) between them is pushed downwards. This downwash, $w$, is the mechanism that connects the 3D wingtip effect to the entire wing.

3.  **The Flow is Tilted, and So is Lift:** The airfoil sections don't experience the clean, horizontal freestream $V_\infty$. They experience a local flow $V_{eff}$ that is tilted downward by the downwash. Since lift is always perpendicular to the local flow, the entire lift vector is tilted backward.
    $$
    \alpha_{eff}(y) = \alpha(y) - \alpha_i(y)
    $$
    where $\alpha_i(y) = \tan^{-1}\left(\frac{w(y)}{V_\infty}\right) \approx \frac{w(y)}{V_\infty}$ is the induced angle of attack.

4.  **Induced Drag is the "Cost of Lift":** The backward tilt of the lift vector creates a component parallel to the freestream velocity. This is induced drag. It is not caused by friction or pressure separation (those form "profile drag"); it is an unavoidable consequence of generating lift with a finite wing in a fluid.
    $$
    D_i = L \sin(\alpha_i) \approx L \alpha_i
    $$

5.  **Elliptical Lift is the "Perfect" Distribution:** Prandtl's theory shows that for a given amount of total lift, the induced drag is minimized when the lift distribution along the span is elliptical. This distribution also happens to produce a uniform downwash across the span, simplifying the math. Real wings approximate this, but rarely achieve it perfectly. The famous Spitfire aircraft had nearly elliptical wings for this reason.

## Worked example
**Problem:** A glider has a wing with an aspect ratio $AR = 30$ and a wingspan $b=20$ m. It flies at a speed where its total lift coefficient is $C_L = 0.8$. Assume the wing has an elliptical lift distribution and the Oswald efficiency factor is $e=1$. Calculate the induced angle of attack $\alpha_i$ and the induced drag coefficient $C_{D,i}$.

**Solution:**

1.  **Identify the governing equations.** For an elliptical lift distribution, the key formulas are:
    *   Induced angle of attack (in radians): $\alpha_i = \frac{C_L}{\pi AR}$
    *   Induced drag coefficient: $C_{D,i} = \frac{C_L^2}{\pi e AR}$

2.  **List the knowns.**
    *   $C_L = 0.8$
    *   $AR = 30$
    *   $e = 1$ (for an elliptical wing)

3.  **Calculate the induced angle of attack, $\alpha_i$.**
    $$
    \alpha_i = \frac{C_L}{\pi AR} = \frac{0.8}{\pi (30)} \approx 0.00849 \text{ radians}
    $$
    To convert to degrees for intuition:
    $$
    \alpha_i \approx 0.00849 \text{ rad} \times \frac{180^\circ}{\pi \text{ rad}} \approx 0.486^\circ
    $$
    *Reflection:* This shows that the downwash tilts the local airflow by about half a degree. This seems small, but its effect on drag is significant.

4.  **Calculate the induced drag coefficient, $C_{D,i}$.**
    $$
    C_{D,i} = \frac{C_L^2}{\pi e AR} = \frac{(0.8)^2}{\pi (1) (30)} = \frac{0.64}{30\pi} \approx 0.00679
    $$
    *Reflection:* This is a pure number representing the induced drag. Often expressed in "drag counts," this would be about 68 counts. For a low-drag glider, this can be a very large fraction of its total drag. The formula directly shows that high aspect ratio ($AR$) is critical for minimizing this "drag due to lift."

## Diagrams
**Diagram 1: Lifting Line and Trailing Vortex Sheet**
This shows a top-down view of the wing, replaced by the bound vortex (lifting line) and the trailing sheet of vortices it sheds.

```text
       <-- y -->
-b/2     0     +b/2       (Spanwise coordinate)
  |------|------|
  v      v      v         Trailing vortices (form a sheet)
  v      v      v
  v      v      v
  =================         <-- Bound Vortex / Lifting Line, Circulation Gamma(y)
  ^      ^      ^
  ^      ^      ^         Freestream Velocity V_inf
  ^      ^      ^
```

**Diagram 2: Local Angle of Attack and Force Vectors**
This is a cross-sectional view at one station along the wing, showing how downwash tilts the forces.

```text
      ^ L_eff (Lift perpendicular to V_eff)
      |     /
      |    /
      |   /
      |  / alpha_i
      | /
  L   |/_________________> D_i
  .   .
  .  .
  . . alpha_i
  V_eff ----------------> V_inf (Freestream)
      .
      .
      . w (Downwash)
      V
```
In this diagram, $L$ is the total aerodynamic force perpendicular to $V_{eff}$. We decompose it into a component perpendicular to $V_\infty$ (what we call Lift) and a component parallel to $V_\infty$ (which is the Induced Drag, $D_i$).

## Memory technique — remember this forever
1.  **The Story:** "The Leaky Wing." High pressure under a wing is desperate to escape to the low pressure above. It can't go through the wing, so it "leaks" around the wingtips. This leakage creates swirling vortices. These vortices are like two giant rolling pins behind the wing, pushing the air between them downwards. This downward push is **downwash**, which tilts the oncoming air. To generate lift, the wing has to "climb" this downward-moving escalator of air, forcing its lift vector to tilt backward. That backward tilt is the **induced drag**—the price you pay for the pressure leak.

2.  **Overlearn these formulas:**
    *   Induced Drag Coefficient: $$C_{D,i} = \frac{C_L^2}{\pi e AR}$$
    *   Induced Angle of Attack (elliptical): $$\alpha_i = \frac{C_L}{\pi AR}$$

3.  **Spaced Repetition Schedule:** Review these formulas and the "Leaky Wing" story *right now*. Then again in **1 day**, **3 days**, **7 days**, **16 days**, and **35 days**. Derive them again on day 7.

4.  **First Principles Pathway:** If you forget everything, rebuild it:
    *   Finite wing -> pressure difference -> flow around tips -> wingtip vortices.
    *   Vortices induce a velocity field (Biot-Savart Law) -> downwash ($w$) on the wing.
    *   Downwash + Freestream ($V_\infty$) -> tilted local flow ($V_{eff}$).
    *   Angle between $V_\infty$ and $V_{eff}$ is $\alpha_i$.
    *   Lift is perpendicular to $V_{eff}$, so lift vector tilts back by $\alpha_i$.
    *   The component of the lift vector parallel to $V_\infty$ is $D_i = L \sin \alpha_i$.

## Common mistakes
1.  **Ignoring the Oswald Efficiency Factor ($e$):** Students often memorize the formula as $C_{D,i} = C_L^2 / (\pi AR)$ and apply it to all wings. This is only true for the ideal elliptical wing where $e=1$. For any other lift distribution, $e < 1$, which increases drag.
2.  **Confusing Profile Drag and Induced Drag:** Total drag is $D = D_{profile} + D_i$. Lifting-line theory calculates *only* $D_i$. You still have friction and pressure drag from the 2D airfoil shape itself.
3.  **Applying 2D Lift Slope to 3D Wings:** A finite wing has a lower lift-curve slope ($a = dC_L/d\alpha$) than its 2D airfoil section ($a_0 = dc_l/d\alpha$) precisely because of the induced angle of attack. As you increase $\alpha$, $\alpha_i$ also increases, reducing the effective angle of attack and thus reducing the lift gain.
4.  **Units for Angle of Attack:** In the formulas $\alpha_i = C_L/(\pi AR)$ and $D_i = L \alpha_i$, the angle $\alpha_i$ must be in **radians**. Using degrees will give an answer that is off by a factor of $180/\pi$.

## Self-check
1.  An aircraft with a wingspan of 15 m and a wing area of 30 m$^2$ is flying at a condition where its $C_L = 1.2$. Assuming it has a non-ideal wing with an Oswald efficiency factor of $e=0.85$, what is its induced drag coefficient?
2.  Two wings generate the same amount of lift ($L$). Wing A has an aspect ratio of 6. Wing B has an aspect ratio of 12. Assuming both have the same Oswald efficiency factor, which wing experiences greater induced drag, and by what factor?
3.  A rectangular wing is known to have a non-elliptical lift distribution that is more concentrated near the wing root and drops off sharply at the tips. Based on the fundamental physics of the trailing vortex sheet, explain intuitively why this wing would have a higher induced drag than an elliptical wing of the same span and lift. (Hint: Think about the strength of the trailing vortices and where they are shed from).