## What it is
Polarization is the orientation of the electric field oscillations for a transverse wave like light. Malus's law quantifies how the intensity of already-polarized light changes when it passes through a polarizing filter. Brewster's angle is the specific angle of incidence at which reflected light from a surface becomes perfectly polarized.

## Why it matters
Polarization is fundamental to modern technology. Polarizing filters in photography and sunglasses reduce glare, which is horizontally polarized reflected light. LCD screens in everything from watches to cockpit displays rely on controlling light's polarization. In aerospace, radar systems use polarization to characterize targets, and remote sensing satellites analyze polarized light to determine atmospheric or surface properties.

## When to study it
Before tackling this, you must have a firm grasp of these prerequisites:
1.  **Electromagnetic Waves:** Understand that light is a transverse wave with oscillating electric and magnetic fields perpendicular to the direction of propagation.
2.  **Vector Projections:** Be able to resolve a vector into its components using trigonometry ($V_x = V \cos\theta$).
3.  **Snell's Law of Refraction:** Know the formula $n_1 \sin\theta_1 = n_2 \sin\theta_2$ and what each term represents.
4.  **Basic Trigonometric Identities:** Specifically $\sin(90^\circ - x) = \cos(x)$ and $\tan(x) = \sin(x)/\cos(x)$.

If any of these are weak, review them first. There is no shortcut.

## How to study it (step by step)
1.  **Visualize Unpolarized Light:** Draw a wave propagating along the z-axis. The electric field vector $\vec{E}$ oscillates in the x-y plane. For unpolarized light, the direction of $\vec{E}$ is random over time. A linear polarizer is a filter with a "transmission axis"; it only allows the component of $\vec{E}$ parallel to this axis to pass through.
2.  **Derive Malus's Law:** Start with linearly polarized light of amplitude $E_0$ and intensity $I_0$. Let this light be incident on a polarizer whose transmission axis is at an angle $\theta$ relative to the light's polarization direction. The transmitted electric field amplitude $E$ is the projection of $\vec{E_0}$ onto the axis: $E = E_0 \cos\theta$. Since intensity is proportional to the square of the amplitude ($I \propto E^2$), the transmitted intensity is $I = I_0 \cos^2\theta$.
3.  **Solve "Two Polarizers" Problem:** Work through the canonical problem: Unpolarized light of intensity $I_{in}$ hits a polarizer. What is the intensity $I_1$ after it? Then, it hits a second polarizer at an angle $\theta$ to the first. What is the final intensity $I_2$? (Answer: $I_1 = I_{in}/2$. $I_2 = I_1 \cos^2\theta = (I_{in}/2)\cos^2\theta$). Understand *why* the first step is a factor of $1/2$.
4.  **Draw the Brewster's Angle Geometry:** Draw a horizontal line representing the interface between two media with refractive indices $n_1$ and $n_2$. Draw an incident ray, a reflected ray, and a refracted ray. Label the angles with respect to the normal: $\theta_1$ (incident), $\theta_1'$ (reflected), and $\theta_2$ (refracted). By the law of reflection, $\theta_1 = \theta_1'$.
5.  **State the Physical Condition:** The key insight for Brewster's angle is that polarization by reflection is maximized when the reflected ray and the refracted ray are perpendicular to each other. This means $\theta_1' + \theta_2 = 90^\circ$.
6.  **Derive the Formula:** Combine the physical condition from step 5 with Snell's Law from the prerequisites.
    $$ n_1 \sin\theta_1 = n_2 \sin\theta_2 $$
    Since $\theta_1' = \theta_1$, our condition is $\theta_1 + \theta_2 = 90^\circ$, which implies $\theta_2 = 90^\circ - \theta_1$.
    Substitute this into Snell's Law:
    $$ n_1 \sin\theta_1 = n_2 \sin(90^\circ - \theta_1) $$
    Using the identity $\sin(90^\circ - x) = \cos(x)$:
    $$ n_1 \sin\theta_1 = n_2 \cos\theta_1 $$
    Rearrange to solve for $\theta_1$, which we now call Brewster's angle, $\theta_B$:
    $$ \frac{\sin\theta_B}{\cos\theta_B} = \frac{n_2}{n_1} \implies \tan\theta_B = \frac{n_2}{n_1} $$

## Key ideas, with intuition
1.  **A Polarizer is a Vector Projector:** Think of a polarizer as a gate with vertical slots. If a rope (representing the E-field) is wiggled vertically, the wave passes. If wiggled horizontally, it's blocked. If wiggled at an angle, only the vertical component of the wiggle gets through. Malus's law simply formalizes this projection.

2.  **Intensity is Proportional to Amplitude Squared:** This is a universal principle for waves. Why $\cos^2\theta$ and not just $\cos\theta$? Because intensity relates to energy, and energy is proportional to amplitude squared. A small amplitude has very little energy; a large amplitude has much more. The squaring captures this non-linear relationship.
    $$ I \propto E^2 $$
    $$ E_{transmitted} = E_{incident} \cos\theta $$
    $$ I_{transmitted} \propto (E_{incident} \cos\theta)^2 = E_{incident}^2 \cos^2\theta \propto I_{incident} \cos^2\theta $$

3.  **Unpolarized Light is an Average:** Unpolarized light has E-fields in all directions. The first polarizer sets the polarization. The transmitted intensity is half the incident intensity because the average value of $\cos^2\theta$ over all angles from $0$ to $2\pi$ is $1/2$.
    $$ \langle \cos^2\theta \rangle = \frac{1}{2\pi} \int_0^{2\pi} \cos^2\theta \,d\theta = \frac{1}{2} $$

4.  **Brewster's Angle: No Radiation Along Oscillation Axis:** At the interface, the incoming light causes electrons in the second medium ($n_2$) to oscillate. These oscillating electrons re-radiate to create the reflected and refracted rays. An oscillating dipole cannot radiate energy along its axis of oscillation. At Brewster's angle, the direction the reflected ray *would* go is exactly along the axis of oscillation for one polarization component. Therefore, that component isn't reflected at all, and the reflected light is perfectly polarized.

## Worked example
Unpolarized light with an intensity of $20 \, \text{W/m}^2$ is incident on a series of two polarizing filters. The transmission axis of the first filter is vertical. The transmission axis of the second filter is $30^\circ$ from the vertical. What is the final intensity of the light?

**Step 1: Incident light on the first polarizer.**
The incoming light is unpolarized. A polarizer transmits half the intensity of unpolarized light, regardless of its orientation.
Let $I_0 = 20 \, \text{W/m}^2$ be the initial intensity.
The intensity after the first polarizer, $I_1$, is:
$$ I_1 = \frac{1}{2} I_0 = \frac{1}{2} (20 \, \text{W/m}^2) = 10 \, \text{W/m}^2 $$
The light is now vertically polarized.

**Step 2: Polarized light on the second polarizer.**
The light incident on the second polarizer has intensity $I_1 = 10 \, \text{W/m}^2$ and is vertically polarized. The second polarizer's axis is at an angle $\theta = 30^\circ$ relative to the first (vertical) one. We apply Malus's Law:
$$ I_2 = I_1 \cos^2\theta $$
$$ I_2 = (10 \, \text{W/m}^2) \cos^2(30^\circ) $$

**Step 3: Calculation.**
We know that $\cos(30^\circ) = \frac{\sqrt{3}}{2}$.
$$ \cos^2(30^\circ) = \left(\frac{\sqrt{3}}{2}\right)^2 = \frac{3}{4} $$
Substitute this value back into the equation for $I_2$:
$$ I_2 = (10 \, \text{W/m}^2) \left(\frac{3}{4}\right) = 7.5 \, \text{W/m}^2 $$

**Reflection:** The first step correctly handled the transition from unpolarized to polarized light by halving the intensity. The second step correctly applied Malus's Law, using the intensity *after* the first filter as the new input intensity, and the angle *between* the two filters.

## Diagrams
Malus's Law Geometry:
```text
      ^ E_0 (Incoming E-field vector)
      |  /
      | /
      |/  θ
      *-----------> (Polarizer Axis)
      | \
      |  E = E_0 cos(θ) (Transmitted component)
      v
```

Brewster's Angle Geometry:
```text
        Incident   |   Reflected
           \       |       /
            \      |      /
             \ θ₁  |  θ₁' /
              \    |    /
   n₁  <-------*-------->  (Interface)
   n₂          | \
               |  \ θ₂
       Normal  |   \
               v    \
                 Refracted

Condition for Brewster's Angle: θ₁' + θ₂ = 90°
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:**
    *   **Malus:** Think of intensity as "light squared." When you pass through a filter at an angle, you get the **co-sine** of that angle. So the law is "Intensity-in times the CO-SINE SQUARED."
    *   **Brewster:** Imagine you're at the beach. To avoid glare (polarized reflected light), you need the perfect "tan." The formula for Brewster's angle is literally a **tan**gent: $\tan\theta_B = n_2/n_1$.

2.  **Formulas to overlearn (do not paraphrase):**
    *   Malus's Law: $I = I_0 \cos^2\theta$ (for incident light already polarized)
    *   Brewster's Angle: $\tan\theta_B = \frac{n_2}{n_1}$

3.  **Spaced-repetition schedule:** Review these derivations and formulas now. Then again in **1 day**, **3 days**, **7 days**, **16 days**, and **35 days**. Do not skip a session.

4.  **First principles pathway:**
    *   **Malus:** If you forget the formula, remember light's E-field is a vector. A polarizer takes the component of this vector along its axis. That's a cosine projection: $E_{out} = E_{in}\cos\theta$. Intensity is proportional to $E^2$. Square the projection: $I_{out} = I_{in}\cos^2\theta$.
    *   **Brewster:** If you forget the formula, draw the interface, the normal, and the rays. State the physical condition: *reflected ray is perpendicular to refracted ray*. Write this as an equation of angles: $\theta_{reflect} + \theta_{refract} = 90^\circ$. Combine this with Snell's law ($n_1\sin\theta_1 = n_2\sin\theta_2$) and the identity $\sin(90-x)=\cos(x)$ to re-derive it in under a minute.

## Common mistakes
1.  **Forgetting the 1/2 factor:** Malus's law $I = I_0 \cos^2\theta$ applies ONLY when the incident light ($I_0$) is already polarized. If the initial light is unpolarized, the first polarizer it hits cuts the intensity in half: $I_1 = I_{initial}/2$.
2.  **Angle Confusion in Malus's Law:** $\theta$ is the angle between the polarization direction of the incoming light and the transmission axis of the filter it is about to enter. It is not always the angle from the vertical.
3.  **Mixing up indices in Brewster's Law:** The formula is $\tan\theta_B = n_2/n_1$, where $n_1$ is the index of the medium the light is *coming from*, and $n_2$ is the index of the medium the light is *entering*. Remember it as $n_{transmitted}/n_{incident}$.
4.  **Using $\sin$ instead of $\tan$ for Brewster's Angle:** This is a common slip-up. The mnemonic "get a tan at the beach to reduce glare" helps prevent this.

## Self-check
1.  Unpolarized light of intensity $I_0$ passes through two polarizers. The axis of the second is oriented at $90^\circ$ to the axis of the first. What is the final transmitted intensity?
2.  A third polarizer is now inserted *between* the original two from question 1. Its axis is oriented at $45^\circ$ to the axis of the first polarizer. What is the final intensity now, in terms of $I_0$?
3.  You are a fish ($n_{water} \approx 1.33$) looking up at the sky ($n_{air} \approx 1.00$). At what angle *from the vertical* must you look so that the reflected light from the water's surface is completely polarized?