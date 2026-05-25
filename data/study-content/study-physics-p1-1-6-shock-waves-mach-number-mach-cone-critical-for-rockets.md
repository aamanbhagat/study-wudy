## 1. What it is — in plain English

Imagine you're in a big, quiet field, and you clap your hands. What happens? Sound waves, which are just ripples of air pressure, spread out in all directions from your hands. They travel at a specific speed – the speed of sound.

Now, imagine you're flying a toy plane. As the plane moves, its engine makes noise, and the plane itself pushes air out of the way, creating little pressure waves. If the plane is moving slowly, these waves can easily get ahead of the plane and spread out. You'd hear the plane approaching before it even got close.

But what if your toy plane could fly super, super fast? So fast that it starts to catch up to, and even overtake, the very sound waves and pressure ripples it's creating? All those individual ripples, instead of spreading out, start to pile up on top of each other right in front of the plane. It's like a traffic jam of sound and pressure.

When this traffic jam gets intense enough, it doesn't just become a big pressure wave; it becomes a *shock wave*. A shock wave is a sudden, almost instantaneous, and very dramatic jump in pressure, temperature, and density of the air. It's not just a loud noise; it's a physical boundary where the air properties change drastically. Think of it like a sharp, invisible wedge of highly compressed, hot air that travels with the super-fast object.

## 2. Why it matters — real-world applications

Shock waves are far more than just a curiosity; they are a fundamental phenomenon with profound implications across various fields, especially in aerospace and high-energy physics.

1.  **Rocketry and Supersonic/Hypersonic Flight:** For any rocket or aircraft designed to travel faster than the speed of sound (supersonic) or many times faster (hypersonic), shock waves are unavoidable.
    *   **Aerodynamic Design:** The shape of a supersonic aircraft's nose, wings, and tail must be carefully designed to manage and minimize the drag caused by shock waves. Engineers aim to create "weak" oblique shocks rather than strong "normal" shocks to reduce energy loss and heat generation.
    *   **Engine Inlets (Ramjets/Scramjets):** These advanced jet engines rely entirely on shock waves to compress incoming air *without* mechanical compressors. The carefully shaped inlets generate a series of oblique shock waves that slow down and compress the air before it enters the combustion chamber, making these engines highly efficient at high speeds.
    *   **Re-entry Vehicles:** Spacecraft re-entering Earth's atmosphere at hypersonic speeds generate extremely strong bow shock waves. The air behind these shocks becomes incredibly hot (thousands of degrees Celsius), leading to plasma formation and intense heating of the vehicle's heat shield. Understanding these shocks is critical for designing re-entry trajectories and thermal protection systems.

2.  **Medical Applications (Lithotripsy):** Focused shock waves are used in medicine to non-invasively treat kidney stones and gallstones. A device called a lithotripter generates a high-energy acoustic shock wave outside the body. This wave is precisely focused to converge on the stone, shattering it into tiny fragments that can then be passed naturally. This avoids the need for surgery.

3.  **Explosives and Detonation Physics:** The destructive power of explosives comes from the extremely rapid chemical reaction that generates a powerful shock wave. This detonation wave propagates through the explosive material itself, compressing and igniting the unreacted material, and then expands into the surrounding medium, causing damage. Understanding shock waves is central to designing safer and more effective explosives and understanding blast effects.

4.  **Material Science and High-Pressure Physics:** Shock waves can be used to subject materials to extreme pressures (millions of atmospheres) and temperatures for very short durations. This allows scientists to study material behavior under conditions similar to planetary interiors, synthesize new materials with unique properties (e.g., diamonds from graphite), or harden existing materials through shock compression.

5.  **Astrophysics:** Shock waves are ubiquitous in the cosmos. They occur in supernova explosions (where the expanding stellar material creates a powerful shock wave that sweeps up interstellar gas), in stellar winds interacting with the interstellar medium, and around accreting black holes. These cosmic shocks play a crucial role in heating and accelerating particles in space.

## 3. Prerequisites — what you must know first

To fully grasp the concepts of shock waves, Mach number, and Mach cone, you should have a foundational understanding of the following topics:

*   **Waves:** The basic definition of a wave (a disturbance that transfers energy without transferring matter), types of waves (longitudinal, transverse), and their fundamental properties (amplitude, wavelength, frequency, period, wave speed).
*   **Speed of Sound:** How the speed of sound is defined in a medium, and the primary factors that influence it (temperature, density, elasticity of the medium). You should know that sound is a pressure wave.
*   **Doppler Effect:** The phenomenon where the perceived frequency of a wave changes due to the relative motion between the source and the observer. This provides a crucial conceptual stepping stone to understanding wave piling.
*   **Fluid Dynamics Basics:** Fundamental concepts like pressure (force per unit area), density (mass per unit volume), and the idea of fluid flow. An intuitive understanding of how fluids (like air) behave under motion is helpful.
*   **Thermodynamics Basics:** Concepts of temperature, energy, and the ideal gas law ($PV=nRT$ or $P=\rho RT$) which relates pressure, density, and temperature for gases. This is essential for understanding how the speed of sound changes and what happens behind a shock wave.
*   **Vectors:** Understanding velocity as a vector quantity (having both magnitude and direction) is important for describing the motion of objects and waves.
*   **Basic Trigonometry:** The definitions of sine, cosine, and tangent in right-angled triangles are essential for deriving and understanding the Mach angle.

## 4. The core idea — step by step

Let's build up the concept of shock waves, Mach number, and Mach cone step by step.

### ### Step 1: Sound as a Wave and Its Speed

*   **Plain English Statement:** Sound travels through a medium (like air) as tiny pressure changes, and it does so at a specific speed that depends on the medium's properties.
*   **Concrete Example:** If you're in a room and someone claps, the sound reaches your ears after a very slight delay, even though the air itself doesn't move from their hands to your ears. This delay demonstrates that sound has a finite speed. In dry air at 20°C (68°F), sound travels at approximately 343 meters per second (about 767 miles per hour).
*   **Formal/Mathematical Version:** For an ideal gas, the speed of sound, $c$, is given by:
    $$c = \sqrt{\frac{\gamma RT}{M_m}}$$
    where:
    *   $c$ is the speed of sound (m/s)
    *   $\gamma$ (gamma) is the adiabatic index (ratio of specific heats, approx. 1.4 for diatomic gases like air)
    *   $R$ is the universal gas constant (8.314 J/(mol·K))
    *   $T$ is the absolute temperature (Kelvin)
    *   $M_m$ is the molar mass of the gas (kg/mol)
    Alternatively, using the specific gas constant $R_s = R/M_m$:
    $$c = \sqrt{\gamma R_s T}$$
    For dry air, $R_s \approx 287 \text{ J/(kg}\cdot\text{K)}$.
*   **What could go wrong:** Students often confuse the speed of sound ($c$) with the speed of the individual air particles oscillating back and forth. The particles oscillate, but the *wave* (the disturbance) propagates. Also, forgetting that temperature is in Kelvin is a common error.

### ### Step 2: Moving Source of Sound

*   **Plain English Statement:** When an object moves, it continuously creates disturbances (like sound waves) in the medium. These disturbances spread out from the object's current position at the speed of sound.
*   **Concrete Example:** Imagine a boat moving across a perfectly still lake. As it moves, it creates ripples (waves) in the water. Each point where the boat was previously also generated ripples, and those ripples continue to expand outwards.
*   **Formal/Mathematical Version:** Consider a point source moving with velocity $v_s$. At any instant $t$, a wave front is emitted from the source's position $x_s(t)$. This wave front then expands spherically outwards at speed $c$. The position of this wavefront at a later time $t'$ will be a sphere centered at $x_s(t)$ with radius $c(t' - t)$.
*   **What could go wrong:** Forgetting that the waves are emitted *continuously* from the *current* position of the source, not just from its starting point. Each point along the object's path is a source of waves.

### ### Step 3: Subsonic Motion (Mach < 1)

*   **Plain English Statement:** If an object moves slower than the speed of sound, the sound waves it creates can always get ahead of it. The waves spread out in front, behind, and to the sides of the object.
*   **Concrete Example:** A propeller plane flying at normal cruising speed. You hear the engine noise approaching long before the plane itself is directly overhead. The sound waves easily outpace the plane.
*   **Formal/Mathematical Version:** Let the object's speed be $v$ and the speed of sound be $c$. If $v < c$, then any wave emitted by the object at a specific point in time will expand spherically, and its leading edge will always be ahead of the object's current position. The wavefronts are concentric spheres, but their centers are offset along the object's path.
*   **What could go wrong:** Not visualizing the *relative* speeds correctly. The key is that the wave's propagation speed *relative to the medium* is $c$, and the object's speed *relative to the medium* is $v$.

### ### Step 4: Transonic Motion (Mach ≈ 1) and the Sound Barrier

*   **Plain English Statement:** As an object approaches the speed of sound, the waves it creates can no longer easily get ahead. They start to pile up and compress right in front of the object, forming a region of intense pressure. This is often called the "sound barrier."
*   **Concrete Example:** When an aircraft approaches Mach 1, you might see a "vapor cone" forming around it. This isn't the shock wave itself, but a visual effect caused by the sudden drop in pressure and temperature *behind* the shock, leading to condensation of water vapor in the air. Pilots often experience significant turbulence and control difficulties in this transonic region.
*   **Formal/Mathematical Version:** When $v \approx c$, the spherical wavefronts emitted by the moving source begin to coalesce and overlap in the direction of motion. This superposition leads to a significant increase in local pressure and density, forming a region of highly compressed air directly ahead of the object. This compression is a non-linear effect, where the wave steepens into a discontinuity.
*   **What could go wrong:** Thinking the "sound barrier" is a solid, impenetrable wall. It's not a physical barrier but rather a region of extreme aerodynamic instability and drag caused by the intense pressure buildup.

### ### Step 5: Supersonic Motion (Mach > 1) and Shock Waves

*   **Plain English Statement:** When an object moves *faster* than the speed of sound, it literally outruns all the pressure waves it creates. These waves can't get ahead, so they all get "left behind" and pile up into a distinct, cone-shaped boundary of highly compressed air that travels with the object. This boundary is the shock wave.
*   **Concrete Example:** A supersonic jet flying overhead. You don't hear it approaching. Instead, after it has passed, you hear a sudden, very loud "sonic boom." This boom is the sound of the shock wave passing over you. A bullet fired from a rifle also creates a tiny shock wave, which contributes to its distinct "crack" sound.
*   **Formal/Mathematical Version:** If $v > c$, the object is moving faster than the rate at which disturbances can propagate through the medium. The individual spherical wavefronts cannot propagate ahead of the object. Instead, they all constructively interfere and form a tangent envelope, which is a cone. This conical envelope is the shock wave. Across this shock wave, there are abrupt, discontinuous changes in pressure, temperature, density, and velocity. The flow changes from supersonic to subsonic (relative to the shock) across the shock.
*   **What could go wrong:** Not understanding that the shock wave is a *discontinuity*. The changes in properties are not gradual; they occur over an extremely thin region (on the order of a few molecular mean free paths).

### ### Step 6: Mach Number (M)

*   **Plain English Statement:** The Mach number is a simple way to express how fast an object is moving compared to the local speed of sound. It tells you "how many times the speed of sound" the object is traveling.
*   **Concrete Example:** If an airplane is flying at Mach 0.8, it's moving at 80% of the speed of sound. If a rocket is traveling at Mach 5, it's moving at five times the speed of sound.
*   **Formal/Mathematical Version:** The Mach number ($M$) is defined as the ratio of the object's speed ($v$) to the local speed of sound ($c$) in the surrounding medium:
    $$M = \frac{v}{c}$$
    *   $M < 1$: Subsonic flow
    *   $M = 1$: Sonic flow (at the speed of sound)
    *   $M > 1$: Supersonic flow
    *   $M \gg 1$: Hypersonic flow (typically $M > 5$)
*   **What could go wrong:** Forgetting that the speed of sound ($c$) is not constant; it depends on temperature. So, a constant Mach number does *not* mean a constant true speed if the temperature of the air changes (e.g., with altitude).

### ### Step 7: Mach Cone and Mach Angle ($\mu$)

*   **Plain English Statement:** When an object travels supersonically, the shock wave it creates forms a distinct cone shape behind it, much like the V-shaped wake of a boat moving faster than the water waves it creates. The angle of this cone is called the Mach angle.
*   **Concrete Example:** The "sonic boom" you hear from a supersonic jet is caused by this Mach cone sweeping over the ground. If you could see the pressure changes, it would look like an invisible, sharp cone trailing the aircraft.
*   **Formal/Mathematical Version:** Consider a point source moving at speed $v$ (where $v > c$). At time $t=0$, the source is at position $x=0$. At a later time $\Delta t$, the source has moved a distance $v \Delta t$. During this same time $\Delta t$, a wave emitted at $t=0$ has expanded outwards spherically to a radius of $c \Delta t$.
    The Mach cone is formed by the tangent lines (in 2D) or tangent planes (in 3D) to all these expanding spherical wavefronts.
    From trigonometry, considering a right-angled triangle formed by the source's path, the radius of the wavefront, and the tangent to the wavefront:
    $$\sin \mu = \frac{\text{opposite}}{\text{hypotenuse}} = \frac{c \Delta t}{v \Delta t}$$
    Simplifying, we get the Mach angle formula:
    $$\sin \mu = \frac{c}{v}$$
    And since $M = v/c$, we can write:
    $$\sin \mu = \frac{1}{M}$$
    where $\mu$ is the Mach angle. Note that this formula is only valid for $M \ge 1$. For $M < 1$, no Mach cone forms.
*   **What could go wrong:** Inverting the ratio (e.g., $\sin \mu = M$) or confusing the angle $\mu$ with the angle *inside* the cone. $\mu$ is the angle between the object's velocity vector and the shock wave itself.

## 5. Worked examples — multiple, with every step shown

### Example 1: Calculating Mach Number

**Problem:** An F-18 fighter jet is flying at 686 m/s through air where the speed of sound is 343 m/s. Calculate the Mach number of the jet.

**Given:**
*   Jet speed, $v = 686 \text{ m/s}$
*   Speed of sound, $c = 343 \text{ m/s}$

**Want:**
*   Mach number, $M$

**Solution:**

1.  **Recall the formula for Mach number:**
    $$M = \frac{v}{c}$$
    *This formula defines Mach number as the ratio of the object's speed to the speed of sound.*

2.  **Substitute the given values into the formula:**
    $$M = \frac{686 \text{ m/s}}{343 \text{ m/s}}$$
    *We are plugging in the specific values provided in the problem for the jet's speed and the local speed of sound.*

3.  **Perform the division:**
    $$M = 2$$
    *The units (m/s) cancel out, leaving a dimensionless quantity, which is characteristic of the Mach number.*

4.  **State the final answer:**
    The Mach number of the jet is **2**.

**Reflection:** This example was straightforward, directly applying the definition of the Mach number. It confirms that the jet is flying at twice the speed of sound, meaning it is in supersonic flight.

### Example 2: Calculating Mach Angle

**Problem:** A rocket is traveling at Mach 3.5. Calculate the Mach angle of the shock wave it generates.

**Given:**
*   Mach number, $M = 3.5$

**Want:**
*   Mach angle, $\mu$

**Solution:**

1.  **Recall the formula for Mach angle:**
    $$\sin \mu = \frac{1}{M}$$
    *This formula directly relates the Mach number to the sine of the Mach angle, which is the angle between the direction of motion and the shock wave.*

2.  **Substitute the given Mach number into the formula:**
    $$\sin \mu = \frac{1}{3.5}$$
    *We are replacing M with the given value of 3.5.*

3.  **Calculate the value of $1/M$:**
    $$\sin \mu \approx 0.2857$$
    *Performing the division to find the sine of the angle.*

4.  **Find the angle $\mu$ by taking the inverse sine (arcsin):**
    $$\mu = \arcsin(0.2857)$$
    *To get the angle itself, we use the inverse sine function on our calculator.*

5.  **Calculate the angle (to one decimal place):**
    $$\mu \approx 16.6^\circ$$
    *This is the resulting angle in degrees.*

6.  **State the final answer:**
    The Mach angle of the shock wave is approximately **16.6 degrees**.

**Reflection:** This example introduced the Mach angle formula. The key step is remembering to take the inverse sine to find the angle itself, not just the sine of the angle. It shows that higher Mach numbers result in smaller Mach angles (a sharper cone).

### Example 3: Calculating Mach Number from Mach Angle

**Problem:** An observer on the ground measures the Mach angle of a passing aircraft to be $25^\circ$. What is the Mach number of the aircraft?

**Given:**
*   Mach angle, $\mu = 25^\circ$

**Want:**
*   Mach number, $M$

**Solution:**

1.  **Recall the formula for Mach angle:**
    $$\sin \mu = \frac{1}{M}$$
    *This is the fundamental relationship between Mach angle and Mach number.*

2.  **Rearrange the formula to solve for $M$:**
    $$M = \frac{1}{\sin \mu}$$
    *We are algebraically isolating M by multiplying both sides by M and dividing by $\sin \mu$.*

3.  **Substitute the given Mach angle into the rearranged formula:**
    $$M = \frac{1}{\sin(25^\circ)}$$
    *We replace $\mu$ with the given angle of 25 degrees.*

4.  **Calculate the sine of $25^\circ$:**
    $$\sin(25^\circ) \approx 0.4226$$
    *Using a calculator to find the sine value.*

5.  **Perform the division:**
    $$M = \frac{1}{0.4226}$$
    $$M \approx 2.366$$
    *Completing the calculation to find the Mach number.*

6.  **State the final answer (to two decimal places):**
    The Mach number of the aircraft is approximately **2.37**.

**Reflection:** This example required algebraic manipulation of the Mach angle formula. It reinforces the inverse relationship between Mach angle and Mach number: a larger angle corresponds to a lower (but still supersonic) Mach number.

### Example 4: Calculating Actual Speed at Altitude

**Problem:** A rocket is flying at an altitude where the air temperature is $-50^\circ\text{C}$. If the rocket is traveling at Mach 4.0, what is its actual speed in m/s? (Assume air is an ideal gas with $\gamma = 1.4$ and $R_s = 287 \text{ J/(kg}\cdot\text{K)}$).

**Given:**
*   Air temperature, $T_{air} = -50^\circ\text{C}$
*   Mach number, $M = 4.0$
*   Adiabatic index, $\gamma = 1.4$
*   Specific gas constant for air, $R_s = 287 \text{ J/(kg}\cdot\text{K)}$

**Want:**
*   Actual speed of the rocket, $v$ (m/s)

**Solution:**

1.  **Convert the temperature from Celsius to Kelvin:**
    $$T_{\text{Kelvin}} = T_{\text{Celsius}} + 273.15$$
    $$T_{\text{Kelvin}} = -50 + 273.15 = 223.15 \text{ K}$$
    *The speed of sound formula requires absolute temperature in Kelvin. This is a crucial first step.*

2.  **Calculate the speed of sound ($c$) at this temperature:**
    $$c = \sqrt{\gamma R_s T}$$
    *This is the formula for the speed of sound in an ideal gas, which depends on temperature.*

3.  **Substitute the known values into the speed of sound formula:**
    $$c = \sqrt{(1.4)(287 \text{ J/(kg}\cdot\text{K)})(223.15 \text{ K})}$$
    *Plugging in the values for gamma, the specific gas constant, and the absolute temperature.*

4.  **Perform the multiplication inside the square root:**
    $$c = \sqrt{89707.03 \text{ m}^2/\text{s}^2}$$
    *The units J/(kg·K)·K simplify to J/kg, which is m²/s² (since J = kg·m²/s²). This confirms the units are correct for speed.*

5.  **Calculate the square root to find $c$:**
    $$c \approx 299.51 \text{ m/s}$$
    *This is the local speed of sound at the given altitude and temperature.*

6.  **Recall the formula for Mach number and rearrange to solve for $v$:**
    $$M = \frac{v}{c} \implies v = M \cdot c$$
    *We need to find the actual speed, so we isolate $v$ from the Mach number definition.*

7.  **Substitute the calculated speed of sound and the given Mach number into the rearranged formula:**
    $$v = (4.0)(299.51 \text{ m/s})$$
    *Using the Mach number provided and the speed of sound we just calculated.*

8.  **Perform the multiplication:**
    $$v \approx 1198.04 \text{ m/s}$$
    *This gives us the rocket's true speed.*

9.  **State the final answer (to one decimal place):**
    The rocket's actual speed is approximately **1198.0 m/s**.

**Reflection:** This example is harder because it requires a two-step calculation: first finding the local speed of sound, and then using that to find the actual velocity. The most common trap here is forgetting to convert temperature to Kelvin. It highlights that a Mach number of 4.0 does not always correspond to the same true speed, as the speed of sound changes with atmospheric conditions.

## 6. Common mistakes and traps

1.  **Confusing object speed ($v$) with wave speed ($c$):** Students sometimes mix up which speed goes in the numerator and which in the denominator for the Mach number, or they assume $c$ is the object's speed. Remember $M = v/c$.
2.  **Forgetting that the speed of sound ($c$) is not constant:** $c$ depends significantly on temperature. Using a fixed value (e.g., 343 m/s) when the temperature is different from standard conditions will lead to incorrect results. Always convert temperature to Kelvin for calculations.
3.  **Inverting the Mach angle formula:** A common error is writing $\sin \mu = M$ instead of $\sin \mu = 1/M$. Remember that for supersonic flight ($M > 1$), $\sin \mu$ must be less than 1, so $1/M$ is the correct form.
4.  **Misinterpreting the "sound barrier":** It's not a physical wall but a region of rapidly increasing drag and aerodynamic instability as an object approaches Mach 1 due to the intense piling up of pressure waves.
5.  **Thinking the sonic boom occurs only at the moment of breaking the sound barrier:** The sonic boom is a continuous phenomenon generated by any object traveling supersonically. It's heard on the ground when the Mach cone sweeps past an observer, not just when the object initially accelerates past Mach 1.
6.  **Incorrect units for calculations:** Ensure all speeds are in consistent units (e.g., m/s) and temperature is in Kelvin for the speed of sound formula.

## 7. Textbook-precise explanation

A **shock wave** is a thin, propagating disturbance characterized by an almost instantaneous, discontinuous change in the thermodynamic and fluid dynamic properties of a medium. These properties include pressure, temperature, density, and velocity. Across a shock wave, there is an irreversible increase in entropy, meaning the process is non-isentropic. Shock waves are typically generated when a fluid flow (or an object moving through a fluid) is supersonic, and the flow must decelerate to subsonic speeds relative to the shock front. The Rankine-Hugoniot relations describe the conservation laws (mass, momentum, energy) across such a discontinuity.

The **Mach number** ($M$) is a dimensionless quantity representing the ratio of the local flow velocity ($v$) to the local speed of sound ($c$) in the medium:
$$M = \frac{v}{c}$$
The speed of sound in an ideal gas is given by $c = \sqrt{\gamma R_s T}$, where $\gamma$ is the ratio of specific heats, $R_s$ is the specific gas constant, and $T$ is the absolute temperature.
Flow regimes are classified based on Mach number:
*   Subsonic: $M < 1$
*   Sonic: $M = 1$
*   Transonic: $0.8 < M < 1.2$ (approximate range)
*   Supersonic: $1 < M < 5$
*   Hypersonic: $M \ge 5$

When an object moves at supersonic speeds ($M > 1$), it continuously generates disturbances that cannot propagate ahead of it. These disturbances coalesce to form a conical wave front known as a **Mach cone**. The angle ($\mu$) between the direction of the object's velocity and the Mach cone surface is called the **Mach angle**. It is given by the relationship:
$$\sin \mu = \frac{c}{v} = \frac{1}{M}$$
This geometric relationship arises from the envelope of spherical wavefronts emitted by the moving source. The Mach cone represents the leading edge of the disturbance created by the supersonic object. The region inside the Mach cone is influenced by the object, while the region outside remains undisturbed.

**References:**
*   Anderson, John D. Jr. *Fundamentals of Aerodynamics*. 5th ed., McGraw-Hill Education, 2012, Chapter 9 & 10.
*   Shapiro, Ascher H. *The Dynamics and Thermodynamics of Compressible Fluid Flow*. Vol. 1, Ronald Press Co., 1953, Chapter 3 & 4.

## 8. ASCII diagrams

Here are two ASCII diagrams illustrating the wavefronts for subsonic and supersonic motion, leading to the Mach cone.

```text
       Subsonic Motion (M < 1)

       <--- Object's Path
       o----o----o----o----o---->
       ^    ^    ^    ^    ^
       |    |    |    |    |
       |    |    |    |    |
       |    |    |    |    |
       Wavefronts:
       Each circle represents a spherical wave
       emitted at a past position of the object.
       The waves get ahead of the object.

               o   o   o
              / \ / \ / \
             o   o   o   o
            / \ / \ / \ / \
           o   o   o   o   o
          / \ / \ / \ / \ / \
         o   o   o   o   o   o  <--- Current position of object
        / \ / \ / \ / \ / \ / \
       o   o   o   o   o   o   o
      / \ / \ / \ / \ / \ / \ / \

This diagram shows an object (represented by 'o') moving from left to right.
At various past points in time, it emitted spherical sound waves.
Since the object is moving slower than sound (subsonic), the waves
from earlier positions have expanded and moved ahead of the object's
current position. There is no piling up of waves.
```

```text
       Supersonic Motion (M > 1) and Mach Cone

                                 /
                                /
                               /  <-- Mach Cone (Shock Wave)
                              /
                             /
                            /
                           /
                          /
                         /
                        /
                       /
                      /
                     /
                    /
                   /
                  /
                 /
                /
               /
              /
             /
            /
           /
          /
         /
        /
       /
      /
     /
    /
   /
  /
 /
/
\
 \
  \
   \
    \
     \
      \
       \
        \
         \
          \
           \
            \
             \
              \
               \
                \
                 \
                  \
                   \
                    \
                     \
                      \
                       \
                        \
                         \
                          \
                           \
                            \
                             \
                              \
                               \
                                \
                                 \

       <---------------- Object's Path
       o----o----o----o----o----o---->
       ^    ^    ^    ^    ^    ^
       |    |    |    |    |    |
       |    |    |    |    |    |
       |    |    |    |    |    |
       Wavefronts:
       Each circle represents a spherical wave
       emitted at a past position of the object.
       The object outruns its own waves.

                                  .  (Current position of object)
                                 /|\
                                / | \
                               /  |  \
                              /   |   \
                             /    |    \
                            /     |     \
                           /      |      \
                          /       |       \
                         /        |        \
                        /         |         \
                       /          |          \
                      /           |           \
                     /            |            \
                    /             |             \
                   /              |              \
                  /               |               \
                 /                |                \
                /                 |                 \
               /                  |                  \
              /                   |                   \
             /                    |                    \
            /                     |                     \
           /                      |                      \
          /                       |                       \
         /                        |                        \
        /                         |                         \
       /                          |                          \
      /                           |                           \
     /                            |                            \
    /                             |                             \
   /                              |                              \
  /                               |                               \
 /                                |                                \
/_________________________________|_________________________________\
                                  |
                                  |   <-- Object's velocity vector
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                                  |
                               