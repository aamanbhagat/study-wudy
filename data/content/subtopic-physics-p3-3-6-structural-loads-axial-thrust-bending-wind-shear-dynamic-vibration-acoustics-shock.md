## What it is
Structural loads are the mechanical forces and moments a spacecraft or launch vehicle must endure without failing. They are divided into static/quasi-static loads—axial (forces compressing or stretching the vehicle along its spine) and bending (lateral forces trying to snap it like a twig)—and dynamic loads, which are high-frequency, time-varying forces caused by engine vibration, acoustic energy at liftoff, and pyrotechnic shocks during stage separation.

## Why it matters
Rockets are extreme exercises in mass optimization; the structural mass fraction is often less than 10% of the total vehicle mass. You cannot afford to overbuild. If you fail to accurately predict axial and bending loads, the rocket will buckle or snap at Max-Q (maximum dynamic pressure). If you ignore dynamic loads, high-frequency vibrations will shatter delicate payload electronics or shake propellant lines apart, even if the primary structure holds.

## When to study it
Do not attempt this until you have mastered:
1.  **Newtonian Mechanics:** Statics, dynamics, and free body diagrams.
2.  **Mechanics of Materials:** Stress ($\sigma$), strain ($\epsilon$), Young's modulus ($E$), and Euler-Bernoulli beam theory (shear and bending moment diagrams).
3.  **Differential Equations:** Specifically, the physics of the simple harmonic oscillator (damping, resonance, and natural frequency).

## How to study it (step by step)
1.  **Master the quasi-static free body diagram:** Draw a rocket in flight. Apply thrust at the bottom, drag at the top/sides, and weight acting through the center of mass. Calculate the internal axial force at various cross-sections.
2.  **Analyze wind shear:** Treat the rocket as a continuous beam in free space. Apply a lateral distributed load representing an aerodynamic gust. Draw the resulting shear and bending moment diagrams.
3.  **Combine the stresses:** Pick a cross-section. Calculate the uniform compressive stress from axial loads and the gradient stress from bending loads. Superimpose them to find the maximum localized compressive stress.
4.  **Model vibration:** Treat a payload attached to the rocket as a simple mass-spring-damper system. Plot the transmissibility curve to see how engine vibrations amplify at the payload's natural frequency.
5.  **Differentiate shock from vibration:** Read about the Shock Response Spectrum (SRS). Understand that shock is a high-amplitude, transient event (milliseconds) that excites all frequencies, whereas vibration is a steady-state, continuous input.

## Key ideas, with intuition

**1. Axial Loads (Squash and Stretch)**
During ascent, the engines push up (Thrust, $T$) while gravity ($mg$) and aerodynamic drag ($D$) push down. The vehicle accelerates at $a$. The internal axial force $F_x$ at any cross-section depends on the mass *above* that section. The resulting axial stress is uniform across the thin-walled skin:
$$ \sigma_{axial} = \frac{F_x}{A} $$
*Intuition:* The bottom of the rocket feels the weight and inertia of everything above it being pushed upward. It is under severe compression.

**2. Bending Loads (The Snapping Twig)**
When a rocket encounters wind shear (a lateral gust), aerodynamic forces act perpendicular to the rocket's body. Because the center of aerodynamic pressure is rarely at the center of mass, this creates a bending moment $M$. The stress varies linearly across the diameter of the rocket:
$$ \sigma_{bending} = \frac{M y}{I} $$
where $y$ is the distance from the neutral axis and $I$ is the area moment of inertia.
*Intuition:* Bending stretches one side of the rocket (tension) and squashes the other (compression). 

**3. Superposition (The Worst-Case Scenario)**
Because the rocket skin is thin, the critical failure mode is usually buckling on the side where axial compression and bending compression add together:
$$ \sigma_{max} = -\frac{F_x}{A} - \frac{M r}{I} $$

**4. Dynamic Loads (The Shaker)**
Static loads dictate the thickness of the rocket walls; dynamic loads dictate the survival of the components inside. If the frequency of the engine's acoustic rumble matches the natural frequency $\omega_n = \sqrt{k/m}$ of a satellite's solar panel, resonance occurs. The displacement amplifies drastically, causing fatigue failure.

## Worked example
**Problem:** A cylindrical rocket stage has a radius $r = 1.5$ m and a skin thickness $t = 0.004$ m. At Max-Q, a cross-section experiences an internal compressive axial force $F_x = 2,000 \text{ kN}$ and a bending moment $M = 800 \text{ kN}\cdot\text{m}$ due to wind shear. Calculate the maximum compressive stress on the rocket skin.

**Step 1: Calculate the cross-sectional properties.**
For a thin-walled cylinder, the cross-sectional area $A$ and area moment of inertia $I$ are approximated by:
$$ A \approx 2\pi r t = 2\pi (1.5)(0.004) = 0.0377 \text{ m}^2 $$
$$ I \approx \pi r^3 t = \pi (1.5)^3 (0.004) = 0.0424 \text{ m}^4 $$
*Why it works:* Thin-wall approximations vastly simplify the geometry without losing significant accuracy, which is standard engineering practice for aerospace structures.

**Step 2: Calculate the uniform axial stress.**
$$ \sigma_{axial} = \frac{F_x}{A} = \frac{2,000,000 \text{ N}}{0.0377 \text{ m}^2} = 53.05 \text{ MPa} \text{ (Compression)} $$
*Why it works:* Force divided by area gives the baseline stress distributed evenly around the circumference.

**Step 3: Calculate the maximum bending stress.**
The maximum distance from the neutral axis is the radius, $y = r = 1.5 \text{ m}$.
$$ \sigma_{bending} = \frac{M r}{I} = \frac{800,000 \text{ N}\cdot\text{m} \cdot 1.5 \text{ m}}{0.0424 \text{ m}^4} = 28.30 \text{ MPa} $$
*Why it works:* This is the peak stress caused by the bending moment. One side of the cylinder feels this as compression, the opposite side as tension.

**Step 4: Superimpose the stresses.**
The worst-case compressive stress occurs on the side where the bending stress is compressive.
$$ \sigma_{max\_comp} = \sigma_{axial} + \sigma_{bending} = 53.05 + 28.30 = 81.35 \text{ MPa} $$
*Why it works:* Linear elasticity allows us to sum the stresses directly. The skin must be designed to withstand 81.35 MPa of compression without buckling.

## Diagrams
```text
COMBINED AXIAL AND BENDING LOADS ON A LAUNCH VEHICLE

      Wind Shear (Aerodynamic Lateral Force)
      ----->
             |      _.-="=-._ 
             |    .'         '.  <-- Payload
             |   /             \
             |  |               |
             |  |               |
             |  |               |  <-- Bending causes TENSION here (+)
Bending      |  |               |
causes       |  |               |
COMPRESSION  |  |               |  <-- Axial Thrust causes COMPRESSION everywhere (-)
here (-)     |  |               |
             |  |               |
             |  |               |
             |   \             /
             v    '.         .'
                    `======='
                       | |  <-- Thrust (T)
                       | |
```

## Memory technique — remember this forever
1.  **The Mnemonic:** **ABS** — **A**xial squashes, **B**ending snaps, **S**hock shatters.
2.  **The Formula to Overlearn:** The combined stress equation for a thin-walled cylinder:
    $$ \sigma = \frac{F}{A} \pm \frac{M r}{I} $$
3.  **Spaced-Repetition Schedule:** Review this concept and re-derive the worked example at 1 day, 3 days, 7 days, 16 days, and 35 days.
4.  **First Principles Pathway:** If you forget the combined stress formula, remember that stress is just a measure of "force spread over an area." Axial is uniform ($F/A$). Bending is a gradient that resists a moment, proportional to distance from the center ($My/I$). Add them together.

## Common mistakes
*   **Confusing yield strength with buckling strength:** Students often check if $\sigma_{max}$ exceeds the material's yield strength and assume the rocket is safe. Thin-walled cylinders will almost always fail by *buckling* (crumpling like an empty soda can) at stresses far below the yield strength.
*   **Treating dynamic loads as static:** You cannot just add a "vibration force" to a static free body diagram. Dynamic loads require analyzing frequency, resonance, and fatigue over time.
*   **Ignoring inertia in axial loads:** The axial load at the base of the payload isn't the engine thrust; it is $m_{payload} \times (a_{vehicle} + g)$. You must account for the vehicle's acceleration.

## Self-check
1.  A rocket accelerates at $3g$ straight up. The payload has a mass of $1,000$ kg. What is the axial force exerted by the payload on the payload adapter? 
2.  A lateral gust hits a rocket, creating a bending moment. On the windward side (the side the wind is hitting), is the bending stress tensile or compressive?
3.  A pyrotechnic bolt fires, creating a massive force spike that lasts 2 milliseconds. Why is this analyzed using a Shock Response Spectrum (SRS) rather than a simple harmonic oscillator transmissibility curve?