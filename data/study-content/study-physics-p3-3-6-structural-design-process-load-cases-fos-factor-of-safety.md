## 1. What it is — in plain English

Imagine you're building a sturdy wooden shelf to hold your heavy physics textbooks. You wouldn't just guess how much weight it can hold and then pile books on until it creaks. That would be a recipe for disaster! Instead, you'd think about the heaviest books you own and how many you want to put on it. This is like figuring out the "load cases" – all the different weights and forces your shelf will experience.

Now, even if you calculate that your shelf can theoretically hold 100 pounds, you probably wouldn't design it to *just barely* hold 100 pounds. What if someone leans on it? What if the wood has a tiny, hidden flaw? What if your books are heavier than you thought? To be safe, you'd build it to hold, say, 200 pounds, even if you only expect 100. This "extra safety margin" is what we call the "Factor of Safety" (FOS).

In rocket science, it's the same idea, but with much higher stakes. We need to design every part of a spacecraft – from the tiniest screw to the massive fuel tanks – to withstand all the incredible forces it will encounter: the violent shaking of launch, the vacuum of space, extreme temperatures, and the immense thrust of the engines. We meticulously list all these "load cases," and then we build in a "Factor of Safety" to ensure that even if our calculations are slightly off, or if an unexpected force appears, the rocket won't break apart. It's about making sure things are not just strong enough, but *much more* than strong enough, to prevent catastrophic failure.

## 2. Why it matters — real-world applications

The structural design process, particularly the rigorous definition of load cases and the application of Factors of Safety, is absolutely fundamental across all engineering disciplines, especially aerospace. Its importance is underscored by the catastrophic consequences of failure.

1.  **SpaceX Starship Development:** The iterative design and testing of prototypes like Starship illustrate the constant refinement of load cases. Early prototypes faced failures during pressure tests or landing attempts, revealing unexpected stress points or load combinations. Engineers continually analyze telemetry from flight tests to update their understanding of dynamic loads (e.g., aerodynamic forces during descent, engine thrust variations, cryogenic fuel sloshing) and refine the FOS for different components to achieve the delicate balance between structural integrity and minimizing weight for performance. A higher FOS means a heavier structure, reducing payload capacity.
2.  **Commercial Aircraft Design (e.g., Boeing 787 Dreamliner):** Modern passenger jets are designed to incredibly stringent safety standards. Load cases include not just the weight of passengers and cargo, but also extreme turbulence, hard landings, bird strikes, emergency maneuvers, and even the fatigue caused by millions of pressurization cycles over decades of service. The Factor of Safety ensures that even under the most improbable combinations of these loads, the aircraft structure remains intact. For instance, wings are often designed to withstand loads significantly higher than those expected in normal operation, sometimes by a factor of 1.5 or more, to account for unforeseen events or material variability. This is why you see wings flex significantly during flight without breaking.
3.  **Nuclear Reactor Containment Vessels:** While not aerospace, this highlights extreme FOS. These structures are designed to withstand incredible internal pressures, external seismic events, and even potential impacts, with extremely high Factors of Safety (often 3-5 or more) due to the catastrophic consequences of failure. The load cases here are incredibly complex, involving thermal stresses, radiation effects, and long-term material degradation, all requiring extensive analysis and redundancy.
4.  **Bridge and Building Construction (e.g., Golden Gate Bridge):** Civil engineering structures also rely heavily on this process. Bridges must account for static loads (their own weight, traffic), dynamic loads (wind gusts, seismic activity), and environmental loads (snow, ice). The FOS ensures that even during a rare "100-year storm" or a significant earthquake, the structure remains safe. The design process involves extensive modeling of various load combinations to predict structural response and ensure the FOS is met for all critical elements.

## 3. Prerequisites — what you must know first

To fully grasp the concepts of structural design, load cases, and Factor of Safety, you should have a solid foundation in the following areas:

*   **Statics:** The study of forces in equilibrium, including how to calculate reaction forces, internal forces (axial, shear, bending moment), and free-body diagrams. This is crucial for identifying and quantifying the loads acting on a structure.
*   **Mechanics of Materials (Strength of Materials):** Understanding how materials deform and fail under stress. This includes concepts like:
    *   **Stress ($\sigma$):** Internal force per unit area within a material.
    *   **Strain ($\epsilon$):** Deformation per unit length.
    *   **Elastic Modulus (Young's Modulus, $E$):** A material's stiffness, relating stress and strain in the elastic region.
    *   **Yield Strength ($\sigma_y$):** The stress at which a material begins to deform permanently.
    *   **Ultimate Tensile Strength ($\sigma_{UTS}$):** The maximum stress a material can withstand before fracturing.
    *   **Ductility/Brittleness:** How much a material can deform plastically before breaking.
    *   **Stress Concentrations:** How geometric features (holes, corners) can amplify local stresses.
*   **Material Properties:** Familiarity with common engineering materials (e.g., aluminum alloys, steel, composites) and their typical mechanical properties.
*   **Basic Calculus and Algebra:** For solving equations, understanding rates of change, and manipulating formulas.
*   **Physics Fundamentals:** Concepts of force, mass, acceleration, gravity, and energy.

## 4. The core idea — step by step

The core idea of structural design is to ensure that a structure can safely carry all the loads it will experience throughout its operational life, with a sufficient margin of safety. This involves a systematic approach to identifying potential failures and preventing them.

### Step 1: Identify All Possible Load Cases

**Plain English:** Before you even think about what material to use or how thick a part should be, you need to make a comprehensive list of *every single force* that could ever act on your rocket, satellite, or component, from the moment it's built until it's decommissioned. Think about it like making a list of all the different ways your shelf might be stressed – not just books, but someone bumping into it, an earthquake, or even just its own weight.

**Concrete Example:** For a rocket launch vehicle, load cases include:
*   **Gravity:** The weight of the rocket itself and its payload.
*   **Thrust:** The immense force from the engines pushing the rocket upwards.
*   **Aerodynamic Drag:** Air resistance pushing against the rocket as it ascends through the atmosphere.
*   **Aerodynamic Lift/Side Loads:** Forces from wind gusts or steering maneuvers that can bend or twist the rocket.
*   **Vibration/Acoustic Loads:** Intense shaking and noise generated by the engines during launch, which can rattle components.
*   **Pressure Loads:** Internal pressure from fuel tanks, external atmospheric pressure (changing dramatically with altitude).
*   **Thermal Loads:** Extreme temperature changes from engine exhaust, atmospheric friction, and the cold vacuum of space.
*   **Maneuver Loads:** Forces from changes in direction or attitude.
*   **Handling Loads:** Forces experienced during transportation, assembly, and integration on the launchpad.

**Formal/Mathematical Version:** Load cases are typically represented as vectors of forces and moments, $\mathbf{F}_i$ and $\mathbf{M}_i$, applied at specific points or distributed over surfaces. They can be static (constant over time) or dynamic (varying with time). For dynamic loads, we often consider their frequency and amplitude.

$$ \mathbf{L} = \{ \mathbf{F}_1, \mathbf{M}_1, \mathbf{F}_2, \mathbf{M}_2, \dots, \mathbf{L}_{dynamic}(t), \mathbf{L}_{thermal}(\Delta T), \dots \} $$

**What could go wrong:** Missing a critical load case. If you don't consider the forces of a hard landing, your landing gear might collapse. If you forget about the intense vibrations during engine ignition, sensitive electronics might shake apart.

### Step 2: Determine Critical Load Combinations

**Plain English:** It's rare for a structure to experience just one force at a time. Usually, several forces act together. We need to figure out which combination of forces will create the *worst-case scenario* for each part of the structure. For your shelf, this might be "all the heaviest books *plus* someone leaning on it *plus* a small earthquake."

**Concrete Example:** For a rocket's main structural frame, the critical load combination might be "maximum engine thrust + maximum aerodynamic drag + maximum side wind gust + maximum internal tank pressure" all acting simultaneously during the period of maximum dynamic pressure (Max-Q) in the atmosphere. For a satellite antenna, it might be "maximum acceleration during launch + maximum vibration from engine noise."

**Formal/Mathematical Version:** Critical load combinations involve superimposing different load cases, often with specific coefficients to account for their likelihood and interaction. For example, a common approach is to use load factors ($K_i$) for different loads:

$$ \mathbf{L}_{design} = K_1 \mathbf{L}_1 + K_2 \mathbf{L}_2 + \dots + K_n \mathbf{L}_n $$

Where $K_i$ are typically greater than or equal to 1, as defined by design standards (e.g., NASA, FAA). The goal is to find the combination that results in the highest stress or deformation in a particular component.

**What could go wrong:** Underestimating the simultaneous occurrence or interaction of loads. If the structure is designed for individual loads but not their combined effect, it can fail even if each load alone is within limits.

### Step 3: Determine Material Strength and Failure Modes

**Plain English:** Now that you know all the forces, you need to understand what your chosen material can actually handle. Different materials have different "breaking points." Some materials stretch a lot before breaking (ductile), others snap suddenly (brittle). You need to know how much stress (force per area) your material can take before it permanently deforms or completely breaks. This is like knowing that a steel beam can hold more weight than a wooden plank of the same size.

**Concrete Example:** If you're using an aluminum alloy for a rocket's skin, you need to know its **yield strength** (the stress at which it starts to permanently bend or stretch) and its **ultimate tensile strength** (the stress at which it will eventually break). You also need to consider other failure modes like buckling (for thin-walled structures), fatigue (from repeated loading), or fracture (from tiny cracks growing).

**Formal/Mathematical Version:** Key material properties are:
*   **Yield Strength ($\sigma_y$):** The stress value where plastic deformation begins. For ductile materials, this is often the primary design limit.
*   **Ultimate Tensile Strength ($\sigma_{UTS}$):** The maximum stress a material can withstand before necking and fracture. This is the absolute maximum.
*   **Compressive Strength:** Resistance to crushing.
*   **Shear Strength:** Resistance to forces parallel to the surface.
*   **Fatigue Limit:** The stress level below which a material can endure an infinite number of load cycles without failure.
*   **Fracture Toughness ($K_{Ic}$):** A material's resistance to crack propagation.

**What could go wrong:** Using incorrect material property data, not accounting for environmental effects (temperature, radiation) on material strength, or overlooking specific failure modes like buckling or fatigue. A material might be strong in tension but weak in compression or shear.

### Step 4: Apply the Factor of Safety (FOS)

**Plain English:** This is where we build in our "extra cushion." We know the material's strength, and we know the maximum expected forces. But because there are always uncertainties (material variations, manufacturing flaws, unexpected loads, calculation errors), we don't design to the absolute limit. Instead, we divide the material's strength by a "Factor of Safety" to get an *allowable* strength. This allowable strength is what we actually design to. So, if your material can handle 100 psi, and you apply an FOS of 2, you'll design as if it can only handle 50 psi. This ensures a healthy margin.

**Concrete Example:** If an aluminum alloy has a yield strength ($\sigma_y$) of 40,000 psi, and the design standard requires a Factor of Safety (FOS) of 1.5, then the *allowable stress* for design purposes would be:
$$ \sigma_{allowable} = \frac{\sigma_y}{\text{FOS}} = \frac{40,000 \text{ psi}}{1.5} \approx 26,667 \text{ psi} $$
The structure must be designed so that the maximum stress experienced under any critical load combination does not exceed 26,667 psi.

**Formal/Mathematical Version:** The Factor of Safety (FOS or FS) is defined as:

$$ \text{FOS} = \frac{\text{Material Strength}}{\text{Maximum Actual (or Expected) Stress}} $$

Alternatively, when designing, we use it to determine the allowable stress:

$$ \sigma_{allowable} = \frac{\sigma_{material\_property}}{\text{FOS}} $$

Where $\sigma_{material\_property}$ is typically the yield strength ($\sigma_y$) for ductile materials or the ultimate tensile strength ($\sigma_{UTS}$) for brittle materials, or for specific failure modes like buckling. The FOS values are set by industry standards (e.g., NASA requires FOS of 1.25 on yield and 1.4 on ultimate for manned spaceflight structures, and 1.1 and 1.25 for unmanned).

**What could go wrong:** Using an FOS that is too low (leading to failure) or too high (leading to unnecessary weight and cost). Incorrectly applying the FOS to the wrong material property (e.g., using yield FOS on ultimate strength).

### Step 5: Calculate Stresses and Deformations in the Structure

**Plain English:** With the critical load combinations identified and the allowable stresses determined, you now calculate the actual stresses and deformations that will occur in every part of your structure under those worst-case loads. This involves using principles of mechanics to figure out how forces are distributed throughout the material. For your shelf, this means calculating the bending stress in the middle of the plank and the shear stress in the screws holding it to the wall.

**Concrete Example:** Using finite element analysis (FEA) software, engineers model the rocket structure and apply the critical load combinations. The software then calculates the stress distribution (e.g., von Mises stress for combined loads) and deformation (e.g., displacement) throughout the entire structure. This allows them to identify areas of high stress or excessive deflection.

**Formal/Mathematical Version:** This step involves applying principles from mechanics of materials:
*   **Normal Stress:** $\sigma = \frac{P}{A}$ (for axial loads), $\sigma = \frac{My}{I}$ (for bending).
*   **Shear Stress:** $\tau = \frac{VQ}{It}$ (for beams), $\tau = \frac{Tr}{J}$ (for torsion).
*   **Combined Stresses:** Often analyzed using theories like von Mises yield criterion for ductile materials.
*   **Deformation:** $\delta = \frac{PL}{AE}$ (axial), $\theta = \frac{TL}{JG}$ (torsion), $\delta = \frac{WL^3}{48EI}$ (beam deflection).

Where $P$ is axial force, $A$ is area, $M$ is bending moment, $y$ is distance from neutral axis, $I$ is moment of inertia, $V$ is shear force, $Q$ is first moment of area, $t$ is thickness, $T$ is torque, $r$ is radius, $J$ is polar moment of inertia, $L$ is length, $E$ is Young's Modulus, $G$ is shear modulus, $W$ is load.

**What could go wrong:** Incorrectly modeling the structure, using simplified formulas for complex geometries, or misinterpreting the results from analysis software.

### Step 6: Verify Design (Strength Check)

**Plain English:** Finally, you compare the stresses you calculated in Step 5 with the *allowable stresses* you determined in Step 4. If the calculated stress in any part of your structure is *less than or equal to* the allowable stress, then that part of the design is considered safe. If it's higher, you need to go back and redesign – make the part thicker, use a stronger material, or change the shape. This is like checking if the actual weight on your shelf (calculated stress) is less than the maximum allowable weight (allowable stress).

**Concrete Example:** If the maximum calculated von Mises stress in a rocket frame member under critical launch loads is 25,000 psi, and the allowable stress (based on yield strength and FOS of 1.5) is 26,667 psi, then the design is acceptable for that member. If the calculated stress was 28,000 psi, the member would need to be redesigned (e.g., increase its cross-sectional area).

**Formal/Mathematical Version:** The fundamental design criterion is:

$$ \sigma_{calculated} \le \sigma_{allowable} $$

or equivalently, for a given load $L_{design}$ and a component with strength $S$:

$$ \text{FOS}_{actual} = \frac{S}{L_{design}} \ge \text{FOS}_{required} $$

This check is performed for all critical locations and all potential failure modes (yield, ultimate, buckling, fatigue, fracture).

**What could go wrong:** Rushing this step, making errors in comparison, or not checking all critical locations or failure modes. A design might be safe for yield but fail due to buckling.

## 5. Worked examples — multiple, with every step shown

### Example 1: Simple Tension Rod (Easy)

**Problem Statement:** A structural rod in a satellite frame is subjected to a maximum tensile load of 5,000 N. The rod is made of Aluminum 7075-T6, which has a yield strength ($\sigma_y$) of 505 MPa and an ultimate tensile strength ($\sigma_{UTS}$) of 570 MPa. The design requires a Factor of Safety (FOS) of 1.5 with respect to yield strength. Determine the minimum required cross-sectional area of the rod.

**Given:**
*   Maximum tensile load ($P$) = 5,000 N
*   Yield strength ($\sigma_y$) = 505 MPa = $505 \times 10^6 \text{ N/m}^2$
*   Ultimate tensile strength ($\sigma_{UTS}$) = 570 MPa
*   Factor of Safety (FOS) = 1.5 (with respect to yield)

**Wanted:**
*   Minimum required cross-sectional area ($A_{min}$)

**Solution:**

1.  **Calculate the allowable stress ($\sigma_{allowable}$):**
    $$ \sigma_{allowable} = \frac{\sigma_y}{\text{FOS}} $$
    *This step determines the maximum stress the material is allowed to experience in the design, after accounting for the safety margin.*
    $$ \sigma_{allowable} = \frac{505 \times 10^6 \text{ N/m}^2}{1.5} $$
    *Substitute the given yield strength and FOS into the formula.*
    $$ \sigma_{allowable} = 336.67 \times 10^6 \text{ N/m}^2 = 336.67 \text{ MPa} $$
    *Perform the division to find the allowable stress.*

2.  **Use the stress formula to find the minimum area:**
    The formula for normal stress is $\sigma = \frac{P}{A}$. We need to find $A$, so we rearrange it to $A = \frac{P}{\sigma}$.
    *This is the fundamental relationship between force, stress, and area. We're solving for the area that will result in a stress no greater than our allowable stress.*
    $$ A_{min} = \frac{P}{\sigma_{allowable}} $$
    *Substitute the maximum tensile load and the calculated allowable stress.*
    $$ A_{min} = \frac{5000 \text{ N}}{336.67 \times 10^6 \text{ N/m}^2} $$
    *Perform the division.*
    $$ A_{min} \approx 1.485 \times 10^{-5} \text{ m}^2 $$
    *Convert to a more practical unit, like square millimeters, for clarity.*
    $$ A_{min} = 1.485 \times 10^{-5} \text{ m}^2 \times \left( \frac{1000 \text{ mm}}{1 \text{ m}} \right)^2 $$
    *Since $1 \text{ m} = 1000 \text{ mm}$, then $1 \text{ m}^2 = (1000 \text{ mm})^2 = 1,000,000 \text{ mm}^2$.*
    $$ A_{min} = 1.485 \times 10^{-5} \times 10^6 \text{ mm}^2 = 14.85 \text{ mm}^2 $$

**Final Answer:**
The minimum required cross-sectional area of the rod is $\boxed{\text{14.85 mm}^2}$.

**Reflection:** This example was straightforward because it involved a single, simple load (tension) and a direct application of the FOS to yield strength. The trickiest part might be unit conversion if not careful.

### Example 2: Cantilever Beam (Medium)

**Problem Statement:** A small instrument platform in a spacecraft is supported by a cantilever beam made of Titanium alloy (Ti-6Al-4V). The beam has a rectangular cross-section of width $b = 20 \text{ mm}$ and height $h = 40 \text{ mm}$. It extends $L = 0.5 \text{ m}$ from its fixed support. The instrument applies a concentrated load $P$ at the free end. Ti-6Al-4V has a yield strength ($\sigma_y$) of 880 MPa. If the design requires a FOS of 2.0 with respect to yield, what is the maximum allowable load $P$ that can be placed on the beam?

**Given:**
*   Beam width ($b$) = 20 mm = 0.020 m
*   Beam height ($h$) = 40 mm = 0.040 m
*   Beam length ($L$) = 0.5 m
*   Yield strength ($\sigma_y$) = 880 MPa = $880 \times 10^6 \text{ N/m}^2$
*   Factor of Safety (FOS) = 2.0

**Wanted:**
*   Maximum allowable load ($P_{max}$)

**Solution:**

1.  **Calculate the allowable bending stress ($\sigma_{allowable}$):**
    $$ \sigma_{allowable} = \frac{\sigma_y}{\text{FOS}} $$
    *This sets the safe stress limit for the material under bending.*
    $$ \sigma_{allowable} = \frac{880 \times 10^6 \text{ N/m}^2}{2.0} $$
    *Substitute the given yield strength and FOS.*
    $$ \sigma_{allowable} = 440 \times 10^6 \text{ N/m}^2 = 440 \text{ MPa} $$
    *Perform the division.*

2.  **Calculate the moment of inertia ($I$) for the rectangular cross-section:**
    For a rectangle, $I = \frac{bh^3}{12}$.
    *The moment of inertia represents the beam's resistance to bending. A larger 'I' means more resistance.*
    $$ I = \frac{(0.020 \text{ m})(0.040 \text{ m})^3}{12} $$
    *Substitute the width and height in meters.*
    $$ I = \frac{(0.020 \text{ m})(0.000064 \text{ m}^3)}{12} $$
    *Calculate the cube of the height.*
    $$ I = \frac{0.00000128 \text{ m}^4}{12} $$
    *Multiply width by cubed height.*
    $$ I \approx 1.0667 \times 10^{-7} \text{ m}^4 $$
    *Perform the final division.*

3.  **Determine the maximum bending moment ($M_{max}$) in a cantilever beam:**
    For a cantilever beam with a concentrated load $P$ at the free end, the maximum bending moment occurs at the fixed support and is given by $M_{max} = P \times L$.
    *Bending moment is the rotational effect of the force, causing the beam to bend. It's highest where the beam is fixed and the lever arm is longest.*

4.  **Use the flexure formula to relate stress, moment, and geometry:**
    The maximum bending stress ($\sigma_{max}$) in a beam occurs at the extreme fibers (top and bottom surfaces) and is given by $\sigma_{max} = \frac{M_{max} c}{I}$, where $c$ is the distance from the neutral axis to the extreme fiber. For a rectangular beam, $c = \frac{h}{2}$.
    *This formula connects the internal stress in the beam to the external bending moment and the beam's geometry.*
    $$ \sigma_{max} = \frac{(P \times L) (h/2)}{I} $$
    *Substitute $M_{max} = PL$ and $c = h/2$.*
    We set $\sigma_{max}$ equal to $\sigma_{allowable}$ to find the maximum load $P_{max}$.
    $$ \sigma_{allowable} = \frac{P_{max} L (h/2)}{I} $$
    *Rearrange to solve for $P_{max}$:*
    $$ P_{max} = \frac{\sigma_{allowable} I}{L (h/2)} $$
    *Isolate $P_{max}$.*
    $$ P_{max} = \frac{(440 \times 10^6 \text{ N/m}^2) (1.0667 \times 10^{-7} \text{ m}^4)}{(0.5 \text{ m}) (0.040 \text{ m}/2)} $$
    *Substitute all known values.*
    $$ P_{max} = \frac{46.9348 \text{ N} \cdot \text{m}^3}{(0.5 \text{ m}) (0.020 \text{ m})} $$
    *Calculate the numerator and denominator separately.*
    $$ P_{max} = \frac{46.9348 \text{ N} \cdot \text{m}^3}{0.010 \text{ m}^2} $$
    *Perform the multiplication in the denominator.*
    $$ P_{max} \approx 4693.48 \text{ N} $$
    *Perform the final division.*

**Final Answer:**
The maximum allowable load $P$ that can be placed on the beam is $\boxed{\text{4693.5 N}}$.

**Reflection:** This example involved more steps, requiring knowledge of beam bending theory (moment of inertia, flexure formula) in addition to FOS. Unit consistency (meters, Newtons, Pascals) was crucial.

### Example 3: Pressure Vessel Wall Thickness (Hard)

**Problem Statement:** A spherical fuel tank for a satellite needs to withstand an internal pressure of 10 MPa. The tank has an inner diameter of 0.8 m. It is made from a high-strength steel alloy with a yield strength ($\sigma_y$) of 1200 MPa. The design standard for space pressure vessels requires a FOS of 2.0 with respect to yield for internal pressure. Calculate the minimum required wall thickness ($t$) of the spherical tank.

**Given:**
*   Internal pressure ($P$) = 10 MPa = $10 \times 10^6 \text{ N/m}^2$
*   Inner diameter ($D_i$) = 0.8 m, so inner radius ($r_i$) = 0.4 m
*   Yield strength ($\sigma_y$) = 1200 MPa = $1200 \times 10^6 \text{ N/m}^2$
*   Factor of Safety (FOS) = 2.0

**Wanted:**
*   Minimum required wall thickness ($t$)

**Solution:**

1.  **Calculate the allowable stress ($\sigma_{allowable}$):**
    $$ \sigma_{allowable} = \frac{\sigma_y}{\text{FOS}} $$
    *This sets the safe stress limit for the tank material under pressure.*
    $$ \sigma_{allowable} = \frac{1200 \times 10^6 \text{ N/m}^2}{2.0} $$
    *Substitute the given yield strength and FOS.*
    $$ \sigma_{allowable} = 600 \times 10^6 \text{ N/m}^2 = 600 \text{ MPa} $$
    *Perform the division.*

2.  **Apply the thin-walled pressure vessel formula for spherical tanks:**
    For a thin-walled spherical pressure vessel, the hoop stress (or circumferential stress) and longitudinal stress are equal, and the maximum stress ($\sigma_{max}$) is given by:
    $$ \sigma_{max} = \frac{Pr}{2t} $$
    Where $P$ is the internal pressure, $r$ is the inner radius, and $t$ is the wall thickness. We assume $r \approx r_i$ for thin walls.
    *This formula models the stress developed in the wall of a spherical vessel due to internal pressure. It's a standard formula in mechanics of materials.*

3.  **Set the maximum stress equal to the allowable stress and solve for $t$:**
    $$ \sigma_{allowable} = \frac{Pr_i}{2t_{min}} $$
    *We are designing such that the actual stress does not exceed the allowable stress.*
    Rearrange the formula to solve for $t_{min}$:
    $$ t_{min} = \frac{Pr_i}{2\sigma_{allowable}} $$
    *Isolate $t_{min}$.*
    $$ t_{min} = \frac{(10 \times 10^6 \text{ N/m}^2)(0.4 \text{ m})}{2(600 \times 10^6 \text{ N/m}^2)} $$
    *Substitute the values for pressure, inner radius, and allowable stress.*
    $$ t_{min} = \frac{4 \times 10^6 \text{ N/m}}{1200 \times 10^6 \text{ N/m}^2} $$
    *Perform the multiplication in the numerator and denominator.*
    $$ t_{min} = \frac{4}{1200} \text{ m} $$
    *Simplify the fraction.*
    $$ t_{min} = \frac{1}{300} \text{ m} \approx 0.003333 \text{ m} $$
    *Perform the division to get the thickness in meters.*
    *Convert to millimeters for practicality.*
    $$ t_{min} = 0.003333 \text{ m} \times \frac{1000 \text{ mm}}{1 \text{ m}} $$
    $$ t_{min} \approx 3.33 \text{ mm} $$

**Final Answer:**
The minimum required wall thickness of the spherical tank is $\boxed{\text{3.33 mm}}$.

**Reflection:** This example introduced the concept of pressure vessel stress, which requires a specific formula. The "thin-walled" assumption is critical here; for very thick walls, more complex formulas (e.g., Lame's equations) would be needed, making it even harder.

### Example 4: Combined Loading and FOS Check (Harder)

**Problem Statement:** A cylindrical strut in a rocket interstage structure is subjected to both an axial compressive load ($P_c$) of 150 kN and a bending moment ($M$) of 5 kN·m due to aerodynamic forces. The strut has an outer diameter ($D_o$) of 100 mm and an inner diameter ($D_i$) of 90 mm (hollow circular cross-section). It is made of a composite material with a compressive yield strength ($\sigma_{yc}$) of 300 MPa and an ultimate compressive strength ($\sigma_{uc}$) of 450 MPa. The design requires a FOS of 1.25 on yield and 1.5 on ultimate for compressive loads. Is the current design safe?

**Given:**
*   Axial compressive load ($P_c$) = 150 kN = $150 \times 10^3 \text{ N}$
*   Bending moment ($M$) = 5 kN·m = $5 \times 10^3 \text{ N} \cdot \text{m}$
*   Outer diameter ($D_o$) = 100 mm = 0.100 m, so outer radius ($R_o$) = 0.050 m
*   Inner diameter ($D_i$) = 90 mm = 0.090 m, so inner radius ($R_i$) = 0.045 m
*   Compressive yield strength ($\sigma_{yc}$) = 300 MPa = $300 \times 10^6 \text{ N/m}^2$
*   Ultimate compressive strength ($\sigma_{uc}$) = 450 MPa = $450 \times 10^6 \text{ N/m}^2$
*   Required FOS (yield) = 1.25
*   Required FOS (ultimate) = 1.5

**Wanted:**
*   Is the design safe (i.e., are both FOS criteria met)?

**Solution:**

1.  **Calculate the allowable stresses:**
    *   **Allowable Yield Stress ($\sigma_{allowable, y}$):**
        $$ \sigma_{allowable, y} = \frac{\sigma_{yc}}{\text{FOS}_y} = \frac{300 \times 10^6 \text{ N/m}^2}{1.25} = 240 \times 10^6 \text{ N/m}^2 = 240 \text{ MPa} $$
        *This is the maximum stress allowed based on the yield criterion.*
    *   **Allowable Ultimate Stress ($\sigma_{allowable, u}$):**
        $$ \sigma_{allowable, u} = \frac{\sigma_{uc}}{\text{FOS}_u} = \frac{450 \times 10^6 \text{ N/m}^2}{1.5} = 300 \times 10^6 \text{ N/m}^2 = 300 \text{ MPa} $$
        *This is the maximum stress allowed based on the ultimate criterion.*

2.  **Calculate the cross-sectional area ($A$) and moment of inertia ($I$) for the hollow circular section:**
    *   **Area ($A$):**
        $$ A = \pi (R_o^2 - R_i^2) $$
        *This is the formula for the area of a hollow circle.*
        $$ A = \pi ((0.050 \text{ m})^2 - (0.045 \text{ m})^2) $$
        *Substitute the outer and inner radii.*
        $$ A = \pi (0.0025 \text{ m}^2 - 0.002025 \text{ m}^2) $$
        *Calculate the squares.*
        $$ A = \pi (0.000475 \text{ m}^2) \approx 1.492 \times 10^{-3} \text{ m}^2 $$
        *Perform subtraction and multiplication.*
    *   **Moment of Inertia ($I$):**
        $$ I = \frac{\pi}{4} (R_o^4 - R_i^4) $$
        *This is the formula for the moment of inertia of a hollow circle.*
        $$ I = \frac{\pi}{4} ((0.050 \text{ m})^4 - (0.045 \text{ m})^4) $$
        *Substitute the outer and inner radii.*
        $$ I = \frac{\pi}{4} (0.00000625 \text{ m}^4 - 0.000004100625 \text{ m}^4) $$
        *Calculate the fourth powers.*
        $$ I = \frac{\pi}{4} (0.000002149375 \text{ m}^4) \approx 1.691 \times 10^{-6} \text{ m}^4 $$
        *Perform subtraction and multiplication.*

3.  **Calculate the stresses due to axial load and bending moment:**
    *   **Axial Stress ($\sigma_{axial}$):**
        $$ \sigma_{axial} = \frac{P_c}{A} $$
        *This is the uniform stress across the cross-section due to the compressive force.*
        $$ \sigma_{axial} = \frac{150 \times 10^3 \text{ N}}{1.492 \times 10^{-3} \text{ m}^2} \approx 100.54 \times 10^6 \text{ N/m}^2 = 100.54 \text{ MPa (compressive)} $$
        *Perform the division.*
    *   **Bending Stress ($\sigma_{bending}$):**
        $$ \sigma_{bending} = \frac{M c}{I} $$
        Where $c$ is the distance from the neutral axis to the extreme fiber, which is $R_o$.
        *This stress varies across the cross-section, being maximum at the outer surface.*
        $$ \sigma_{bending} = \frac{(5 \times 10^3 \text{ N} \cdot \text{m})(0.050 \text{ m})}{1.691 \times 10^{-6} \text{ m}^4} $$
        *Substitute the bending moment, outer radius, and moment of inertia.*
        $$ \sigma_{bending} \approx 147.84 \times 10^6 \text{ N/m}^2 = 147.84 \text{ MPa (compressive on one side, tensile on other)} $$
        *Perform the calculation.*

4.  **Calculate the maximum combined compressive stress ($\sigma_{max, c}$):**
    The axial compressive stress is uniform. The bending stress causes compression on one side of the strut and tension on the other. The maximum *compressive* stress will occur on the side where both stresses add up:
    $$ \sigma_{max, c} = \sigma_{axial} + \sigma_{bending} $$
    *This represents the worst-case compressive stress experienced by any part of the strut.*
    $$ \sigma_{max, c} = 100.54 \text{ MPa} + 147.84 \text{ MPa} $$
    $$ \sigma_{max, c} = 248.38 \text{ MPa} $$

5.  **Check against allowable stresses:**
    *   **Yield Check:** Is $\sigma_{max, c} \le \sigma_{allowable, y}$?
        $$ 248.38 \text{ MPa} \le 240 \text{ MPa} $$
        *This statement is FALSE. The calculated stress (248.38 MPa) is greater than the allowable yield stress (240 MPa).*
    *   **Ultimate Check:** Is $\sigma_{max, c} \le \sigma_{allowable, u}$?
        $$ 248.38 \text{ MPa} \le 300 \text{ MPa} $$
        *This statement is TRUE. The calculated stress (248.38 MPa) is less than the allowable ultimate stress (300 MPa).*

**Final Answer:**
The design is **NOT SAFE** because the maximum combined compressive stress (248.38 MPa) exceeds the allowable yield stress (240 MPa) required by the FOS of 1.25. While it passes the ultimate strength check, failure at yield would still constitute a structural failure for most aerospace applications.

**Reflection:** This example was challenging due to the combined loading (axial and bending), requiring calculation of both area and moment of inertia for a hollow section, and then performing two separate FOS checks (yield and ultimate). It highlights that a design must satisfy *all* applicable FOS criteria. The material being a composite also implies that buckling might be a critical failure mode not explicitly checked here, which would make the problem even harder in a real-world scenario.

## 6. Common mistakes and traps

1.  **Confusing Yield Strength and Ultimate Tensile Strength:** Using the wrong material strength value for FOS calculation. For ductile materials, design is almost always based on yield strength to prevent permanent deformation, even if the material could theoretically withstand more load before fracturing. Ultimate strength is typically used for brittle materials or for specific ultimate load conditions.
2.  **Incorrectly Applying FOS:** Applying FOS to the *load* instead of the *strength*, or vice-versa, without understanding the convention. While conceptually similar, the mathematical application matters. Often, FOS is applied to the strength to derive an allowable stress, or load factors are applied to loads to derive design loads.
3.  **Ignoring Load Combinations:** Designing for individual loads in isolation rather than considering the worst-case simultaneous occurrence of multiple loads (e.g., maximum thrust + maximum drag + maximum side wind).
4.  **Overlooking Failure Modes:** Focusing only on tensile/compressive yield and ignoring other critical failure modes like buckling (for slender columns/shells), fatigue (for cyclic loads), creep (for high temperatures over long durations), or fracture mechanics (for pre-existing flaws).
5.  **Unit Inconsistency:** Mixing units (e.g., mm and m, kN and N, MPa and GPa) without proper conversion, leading to wildly incorrect results.
6.  **Assuming Uniform Stress Distribution:** For complex geometries or combined loading, stress is rarely uniform. Using simple $\sigma = P/A$ for situations where bending or stress concentrations are present will lead to underestimation of actual stresses.
7.  **Ignoring Environmental Factors:** Not accounting for temperature effects (material strength changes with temperature), radiation effects (material degradation in space), or corrosive environments.

## 7. Textbook-precise explanation

The structural design process for aerospace vehicles is a systematic methodology to ensure the integrity and functionality of a structure under all anticipated operational and environmental conditions, while adhering to specified safety margins. This process fundamentally revolves around the concepts of **load cases** and the **Factor of Safety (FOS)**.

**Load Cases:**
Load cases represent the complete set of external and internal forces, moments, pressures, temperatures, and accelerations that a spacecraft structure or component may experience throughout its entire lifecycle, from manufacturing and ground handling through launch, orbital operations, re-entry, and potentially landing. These are categorized into:

*   **Static Loads:** Constant or slowly varying loads, such as gravity, steady-state thrust, and internal pressures.
*   **Dynamic Loads:** Time-varying loads, including:
    *   **Vibration and Acoustic Loads:** Induced by engine noise, aerodynamic buffet, or mechanical excitation.
    *   **Shock Loads:** Sudden, high-magnitude, short-duration loads from pyrotechnic events (e.g., stage separation), impacts, or hard landings.
    *   **Transient Loads:** Time-dependent loads from maneuvers, gust encounters, or deployment events.
*   **Thermal Loads:** Stresses induced by temperature gradients or differential thermal expansion/contraction across materials.
*   **Environmental Loads:** Effects of vacuum, radiation, micrometeoroid and orbital debris (MMOD) impacts.
*   **Manufacturing and Assembly Loads:** Pre-stressing, clamping forces, and residual stresses.

For design purposes, these individual load cases are combined into **critical load combinations** (or design load conditions) that represent the most severe aggregate stress states for specific structural elements. These combinations are often defined by design standards (e.g., NASA-STD-5001, MIL-STD-1540) and may involve multiplying individual loads by **load factors** ($K_L \ge 1.0$) to account for uncertainties in load prediction.

**Factor of Safety (FOS):**
The Factor of Safety (FOS), also known as the Safety Factor (SF), is a dimensionless quantity that quantifies the margin between the actual strength of a component and the maximum expected (or calculated) stress it will experience. It is a critical design parameter used to account for uncertainties in:
1.  **Material Properties:** Variability in strength, stiffness, and fatigue life.
2.  **Manufacturing Tolerances:** Deviations from nominal dimensions, introduction of flaws.
3.  **Load Prediction:** Inaccuracies in estimating operational loads, or the possibility of unexpected loads.
4.  **Analysis Methods:** Simplifications in models, computational errors.
5.  **Environmental Degradation:** Effects of temperature, radiation, fatigue, and corrosion over time.

The FOS is formally defined as the ratio of a material's capacity (strength) to the actual or required demand (stress or load).

For **yield failure** (onset of permanent deformation in ductile materials), the FOS is typically applied to the yield strength ($\sigma_y$):
$$ \text{FOS}_y = \frac{\sigma_y}{\sigma_{actual}} \quad \text{or} \quad \sigma_{allowable, y} = \frac{\sigma_y}{\text{FOS}_y} $$
For **ultimate failure** (fracture or complete collapse), the FOS is applied to the ultimate tensile strength ($\sigma_{UTS}$) or ultimate compressive strength ($\sigma_{UC}$):
$$ \text{FOS}_u = \frac{\sigma_{UTS}}{\sigma_{actual}} \quad \text{or} \quad \sigma_{allowable, u} = \frac{\sigma_{UTS}}{\text{FOS}_u} $$
Aerospace standards typically specify minimum FOS values for both yield and ultimate strength, often with higher values for ultimate strength and for manned missions. For example, NASA generally requires an FOS of 1.25 on yield and 1.40 on ultimate for manned spaceflight structures, and 1.10 on yield and 1.25 on ultimate for unmanned structures. These factors are applied to the *maximum expected operating loads* (MEOL) or *design limit loads*. The resulting "design ultimate load" is the limit load multiplied by the ultimate FOS.

The structural design process then involves:
1.  **Definition of Design Requirements:** Performance, mass, cost, and reliability.
2.  **Identification of Load Cases:** Comprehensive enumeration of all applied forces and environmental conditions.
3.  **Establishment of Critical Load Combinations:** Determination of worst-case scenarios, often involving load factors.
4.  **Selection of Materials:** Based on strength, stiffness, density, environmental resistance, and cost.
5.  **Preliminary Sizing:** Initial estimation of component dimensions.
6.  **Detailed Stress Analysis:** Using analytical methods (e.g., beam theory, pressure vessel formulas) or numerical methods (e.g., Finite Element Analysis, FEA) to calculate stresses and deformations under critical load combinations.
7.  **Margin of Safety Calculation:** Comparing calculated stresses ($\sigma_{calc}$) with allowable stresses ($\sigma_{allowable}$) derived from material strength and FOS. A positive Margin of Safety (MS) indicates a safe design:
    $$ \text{MS} = \frac{\text{Allowable Stress}}{\text{Calculated Stress}} - 1 $$
    A design is considered safe if MS $\ge 0$.
8.  **Optimization and Iteration:** Adjusting geometry, material, or topology to meet requirements while minimizing mass or cost.
9.  **Verification and Testing:** Physical testing of components and full-scale structures to validate analytical models and ensure compliance with FOS requirements.

This rigorous process ensures that structures are not only "strong enough" but possess a quantifiable and acceptable level of robustness against unforeseen circumstances and inherent uncertainties.

References:
*   Bruhn, E. F. (1973). *Analysis and Design of Flight Vehicle Structures*. Jacobs Publishing. (A classic text for aerospace structural analysis)
*   Shigley, J. E., Budynas, R. G., & Nisbett, J. K. (2014). *Shigley's Mechanical Engineering Design* (10th ed.). McGraw-Hill Education. (Excellent for FOS and general machine design principles)
*   Megson, T. H. G. (2017). *Aircraft Structures for Engineering Students* (6th ed.). Butterworth-Heinemann. (Specific to aerospace structures and load definitions)

## 8. ASCII diagrams

Here's a simplified ASCII diagram of a rocket during ascent, illustrating some key load cases.

```text
       ^ Thrust (F_T)
       |
       |  /|\
       | / | \
       |/  |  \
      /|   |   |\
     / |   |   | \
    /  |   |   |  \
   |   |   |   |   |
   |   |   |   |   |  <-- Aerodynamic Drag (F_D)
   |   |   |   |   |      (opposes motion)
   |   |   |   |   |
   |   |   |   |   |  <-- Aerodynamic Side Load (F_S)
   |   |   |   |   |      (e.g., from wind gust, causes bending)
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
   |   |   |   |   |
