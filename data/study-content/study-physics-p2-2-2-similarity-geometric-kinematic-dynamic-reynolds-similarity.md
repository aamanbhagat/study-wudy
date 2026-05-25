## 1. What it is — in plain English

Imagine you want to design a new rocket, but building a full-sized prototype is incredibly expensive and risky. What do engineers do? They build a smaller, cheaper model and test it. But here's the catch: a small model doesn't always behave exactly like its full-sized counterpart. A toy car, for instance, doesn't handle wind resistance in the same way a real car does, even if it looks identical.

"Similarity" in fluid mechanics is all about figuring out how to make a small model behave *just like* the big, real thing (which we call the "prototype"). It's a set of rules and conditions that, if met, ensure that what you observe in your miniature experiment accurately predicts what will happen in the full-scale reality.

Think of it like cooking: if you want to scale a recipe for 4 people up to 40, you don't just multiply everything by 10. You need to understand how the ingredients interact, how heat spreads, and how flavors concentrate. Similarly, in fluid mechanics, we need to understand how forces like drag, lift, and gravity scale with size, speed, and fluid properties.

The goal is to ensure that the *physics* is the same, even if the size and speed are different. We want the flow patterns, the pressures, and the forces to be proportionally identical between our model and the real object. This allows us to gather reliable data from small, controlled experiments and apply it confidently to massive, complex systems.

## 2. Why it matters — real-world applications

Similarity principles are the bedrock of experimental fluid dynamics and have profound impacts across numerous engineering disciplines:

1.  **Aerospace Engineering (Wind Tunnels):** Before a new aircraft (like a Boeing 787 Dreamliner or an F-35 fighter jet) takes its first flight, scaled models are extensively tested in wind tunnels. By ensuring dynamic similarity (especially matching Reynolds and Mach numbers), engineers can accurately predict lift, drag, and stability characteristics of the full-sized aircraft, saving billions in development costs and preventing catastrophic failures. NASA and various defense contractors rely heavily on this for rocket and spacecraft design as well.
2.  **Naval Architecture (Towing Tanks):** Ship designers use scaled models in large towing tanks to predict the resistance (drag) and propulsion performance of new hull designs. Companies like General Dynamics Electric Boat, which designs submarines, or major cargo ship manufacturers utilize these tests to optimize fuel efficiency and speed. Here, matching Froude numbers is often critical, as wave-making resistance is a significant factor.
3.  **Civil Engineering (Hydraulic Models):** When designing dams, spillways, river modifications, or harbor layouts, physical models are built to understand complex water flow patterns, erosion, sediment transport, and wave dynamics. For example, the U.S. Army Corps of Engineers uses large-scale models to study flood control measures for major rivers or the impact of breakwaters on harbor tranquility, ensuring structural integrity and environmental safety.
4.  **Automotive Design (Aerodynamics):** Formula 1 teams, like Mercedes-AMG Petronas or Red Bull Racing, spend countless hours in wind tunnels with 50-60% scale models of their cars. They use similarity principles to optimize aerodynamic downforce and minimize drag, which are crucial for lap times and stability. This also applies to commercial car manufacturers like Tesla or Ford, aiming to improve fuel economy.
5.  **Biomedical Engineering (Blood Flow):** Researchers use scaled models of arteries and veins, sometimes with non-Newtonian fluids mimicking blood, to study cardiovascular diseases like aneurysms or plaque buildup. This helps in designing medical devices like stents or artificial heart valves, understanding how flow patterns contribute to disease progression without invasive human experimentation.

## 3. Prerequisites — what you must know first

Before diving deep into similarity, ensure you have a solid grasp of these foundational concepts:

*   **Dimensions and Units:** Understanding fundamental dimensions (Mass [M], Length [L], Time [T], Temperature [$\Theta$]) and how they combine to form derived units (e.g., velocity [L/T], force [ML/T$^2$], density [M/L$^3$]).
*   **Dimensional Analysis:** The powerful technique of reducing the number of variables in a problem by grouping them into dimensionless parameters, often using the Buckingham Pi Theorem. This is the mathematical backbone of similarity.
*   **Basic Fluid Properties:** Definitions and understanding of density ($\rho$), dynamic viscosity ($\mu$), kinematic viscosity ($\nu = \mu/\rho$), surface tension ($\sigma$), and compressibility (bulk modulus $K$).
*   **Newton's Laws of Motion:** Especially Newton's Second Law ($F=ma$), as similarity is fundamentally about scaling forces.
*   **Fluid Kinematics:** Concepts like velocity fields, acceleration of fluid particles, streamlines, pathlines, and streaklines.
*   **Fluid Dynamics (Conceptual):** An intuitive understanding of the forces acting on fluid elements (pressure, viscous, gravity, inertial) and how they relate to the Navier-Stokes equations, even if you haven't fully derived them.
*   **Basic Calculus:** Derivatives (for acceleration, velocity gradients) and integrals (for total forces, flux).

## 4. The core idea — step by step

The core idea of similarity is to establish conditions under which the flow around a scaled model is dynamically equivalent to the flow around the full-sized prototype. This isn't just about making things look the same; it's about making the *physics* the same.

### Step 1: The Problem: Why can't we just build a small model?

*   **Plain English:** You can't just shrink an object and expect its fluid behavior to scale linearly. If you build a tiny model of an airplane and fly it, it won't behave like a real airplane unless you carefully control its environment and properties. The forces that matter (like air resistance or gravity) don't simply shrink in the same way as the object's size.
*   **Small Concrete Example:** Imagine dropping a pebble and a large boulder into water. The pebble might sink quickly with little resistance, while the boulder displaces a lot of water and creates big waves. If you just scaled down the boulder to pebble size, its interaction with the water wouldn't necessarily be the same as a natural pebble's because the relative importance of forces like surface tension or viscosity changes with size.
*   **Formal/Mathematical Version:** The governing equations of fluid flow (like the Navier-Stokes equations) are non-linear and involve various terms representing different forces (inertial, viscous, pressure, gravity, etc.). When you scale dimensions, these terms scale differently. For example, inertial forces often scale with $L^2 V^2$, while viscous forces scale with $\mu L V$. If you just change $L$, the *ratio* of these forces changes.
*   **What Could Go Wrong:** Assuming that a 1:10 scale model will experience 1/10th the drag, or that a flow pattern observed in a small model will automatically be identical to the prototype. This is a common beginner mistake and leads to inaccurate predictions.

### Step 2: Geometric Similarity (Shape)

*   **Plain English:** This is the most basic requirement. For a model to accurately represent a prototype, it must be a perfect scaled-down version of it. Every angle, every curve, every proportion must be identical.
*   **Small Concrete Example:** If you have a prototype airplane wing that is 10 meters long and 2 meters wide at its root, a 1:10 scale model must be exactly 1 meter long and 0.2 meters wide at its root. All other dimensions (thickness, curvature) must also be scaled by the same factor.
*   **Formal/Mathematical Version:** Geometric similarity exists between the model (m) and the prototype (p) if and only if the ratio of all corresponding lengths is constant.
    $$ \frac{L_m}{L_p} = \frac{W_m}{W_p} = \frac{H_m}{H_p} = \lambda_L $$
    where $\lambda_L$ is the linear scale factor. This also implies that ratios of areas scale as $\lambda_L^2$ and ratios of volumes scale as $\lambda_L^3$.
*   **What Could Go Wrong:** Building a model that is geometrically distorted. For instance, making a river model shallower than it should be to save water, which changes the flow dynamics. Or, not scaling surface roughness appropriately, which significantly impacts viscous drag.

### Step 3: Kinematic Similarity (Motion)

*   **Plain English:** If the shapes are similar, the next step is to ensure that the *motion* of the fluid particles is also similar. This means that the flow patterns (like streamlines) around the model should be geometrically similar to the flow patterns around the prototype. The velocity vectors at corresponding points should point in the same direction, and their magnitudes should be in a constant ratio.
*   **Small Concrete Example:** If water flows smoothly around a small, scaled model of a car, then the air flowing around the real car should also flow smoothly, with no unexpected turbulence or eddies appearing in one but not the other. The streamlines around both objects, when scaled, should perfectly overlap.
*   **Formal/Mathematical Version:** Kinematic similarity requires that the ratio of velocities at corresponding points in the model and prototype flows is constant, and similarly for accelerations.
    $$ \frac{V_m}{V_p} = \lambda_V \quad \text{and} \quad \frac{a_m}{a_p} = \lambda_a $$
    Since $a = dV/dt$, we also have a time scale factor $\lambda_t = t_m/t_p = (L_m/V_m) / (L_p/V_p) = \lambda_L / \lambda_V$.
*   **What Could Go Wrong:** Achieving geometric similarity but having different flow regimes. For example, if the model flow is laminar (smooth) but the prototype flow is turbulent (chaotic), then kinematic similarity is not achieved. This is a common problem if the model is too small or the fluid properties are not chosen carefully.

### Step 4: Dynamic Similarity (Forces)

*   **Plain English:** This is the most crucial and often the most challenging aspect. Dynamic similarity means that the *ratios* of all corresponding forces acting on fluid particles (or on the object itself) must be the same in both the model and the prototype. If, for example, the ratio of inertial force to viscous force is 100 in the prototype, it must also be 100 in the model.
*   **Small Concrete Example:** Imagine a small boat model in a tank. If the real boat experiences significant wave resistance (due to gravity) and also viscous drag (due to water stickiness), then the model must also experience these forces in the *same relative proportions*. If viscous forces dominate in the model but wave forces dominate in the prototype, you won't get accurate predictions.
*   **Formal/Mathematical Version:** Dynamic similarity requires that the force ratios are constant. For example, consider the ratio of inertial force ($F_I \propto \rho L^2 V^2$) to viscous force ($F_V \propto \mu L V$):
    $$ \frac{(F_I/F_V)_m}{(F_I/F_V)_p} = 1 \quad \text{or, more generally,} \quad \frac{F_{i,m}}{F_{j,m}} = \frac{F_{i,p}}{F_{j,p}} $$
    for any pair of forces $i$ and $j$. This condition directly leads to the concept of matching dimensionless numbers.
*   **What Could Go Wrong:** Forgetting to consider all relevant forces for a given flow problem. If gravity is important (e.g., free surface flows, waves), you must account for it. If compressibility is important (e.g., high-speed airflows), you must account for it. If you only match one type of force ratio, you might miss others.

### Step 5: Dimensionless Numbers as Similarity Criteria

*   **Plain English:** Instead of directly comparing force ratios, which can be cumbersome, we use special numbers that are already ratios of forces and have no units. These "dimensionless numbers" are like fingerprints of a particular flow behavior. If these numbers are the same for the model and the prototype, then dynamic similarity is achieved (assuming geometric and kinematic similarity).
*   **Small Concrete Example:** The most famous dimensionless number is the Reynolds number ($Re$). It's essentially the ratio of inertial forces to viscous forces. If you match the Reynolds number between your model and prototype, you're ensuring that the relative importance of inertia and viscosity is the same in both.
*   **Formal/Mathematical Version:** By non-dimensionalizing the Navier-Stokes equations or by using dimensional analysis (Buckingham Pi Theorem), we can derive various dimensionless parameters. For example:
    *   **Reynolds Number ($Re$):** Ratio of inertial forces to viscous forces.
        $$ Re = \frac{\rho V L}{\mu} $$
        where $\rho$ is density, $V$ is characteristic velocity, $L$ is characteristic length, and $\mu$ is dynamic viscosity.
    *   **Froude Number ($Fr$):** Ratio of inertial forces to gravitational forces.
        $$ Fr = \frac{V}{\sqrt{gL}} $$
        where $g$ is acceleration due to gravity.
    *   **Mach Number ($Ma$):** Ratio of inertial forces to compressibility forces (or flow speed to speed of sound).
        $$ Ma = \frac{V}{c} $$
        where $c$ is the speed of sound in the fluid.
    *   **Euler Number ($Eu$):** Ratio of pressure forces to inertial forces.
        $$ Eu = \frac{\Delta P}{\frac{1}{2}\rho V^2} $$
*   **What Could Go Wrong:** Incorrectly identifying which dimensionless numbers are relevant for a specific problem. For example, if you're studying a ship (with waves), you *must* consider the Froude number, not just the Reynolds number.

### Step 6: Reynolds Similarity

*   **Plain English:** For many common fluid flow problems, especially those involving incompressible flow around submerged objects (like airfoils, submarines, or cars at low speeds), the dominant forces are inertial and viscous. In these cases, matching the Reynolds number between the model and the prototype is the primary condition for dynamic similarity.
*   **Small Concrete Example:** When testing a small model of an airplane wing in a wind tunnel, engineers adjust the air speed and density in the tunnel so that the Reynolds number for the model matches the Reynolds number for the full-sized wing flying at its actual speed and altitude. This ensures that the boundary layer behavior, separation points, and overall drag characteristics are correctly reproduced.
*   **Formal/Mathematical Version:** For Reynolds similarity, we require:
    $$ Re_m = Re_p $$
    $$ \left( \frac{\rho V L}{\mu} \right)_m = \left( \frac{\rho V L}{\mu} \right)_p $$
    This equation allows us to calculate the required model velocity ($V_m$) or fluid properties ($\rho_m, \mu_m$) given the prototype conditions and the model scale.
*   **What Could Go Wrong:** Applying Reynolds similarity to problems where other forces are equally or more important. For instance, in flows with a free surface (like ships or spillways), gravity is crucial, and Froude similarity must also be considered. If the flow is compressible (e.g., high-speed aircraft), Mach similarity is essential.

### Step 7: The Challenge of Full Similarity

*   **Plain English:** Often, it's impossible to perfectly match *all* relevant dimensionless numbers simultaneously when using a different fluid or scale. For example, if you need to match both Reynolds number (inertial vs. viscous) and Froude number (inertial vs. gravity), the required model velocities might be contradictory.
*   **Small Concrete Example:** Consider a ship model. For Froude similarity, $V_m = V_p \sqrt{\lambda_L}$. For Reynolds similarity, $V_m = V_p \frac{\nu_m}{\nu_p \lambda_L}$. These two expressions for $V_m$ will almost never agree unless $\nu_m / \nu_p = \lambda_L^{3/2}$, which means you'd need a very specific fluid for your model. Since we usually use water for both, and $\lambda_L$ is typically small, this is not achievable.
*   **Formal/Mathematical Version:** If we need to match $Re_m = Re_p$ and $Fr_m = Fr_p$:
    From $Fr_m = Fr_p \Rightarrow \frac{V_m}{\sqrt{gL_m}} = \frac{V_p}{\sqrt{gL_p}} \Rightarrow V_m = V_p \sqrt{\frac{L_m}{L_p}} = V_p \sqrt{\lambda_L}$.
    From $Re_m = Re_p \Rightarrow \frac{\rho_m V_m L_m}{\mu_m} = \frac{\rho_p V_p L_p}{\mu_p} \Rightarrow V_m = V_p \frac{\mu_m}{\mu_p} \frac{\rho_p}{\rho_m} \frac{L_p}{L_m} = V_p \frac{\nu_m}{\nu_p} \frac{1}{\lambda_L}$.
    For both to be true, we would need $\sqrt{\lambda_L} = \frac{\nu_m}{\nu_p \lambda_L}$, which implies $\frac{\nu_m}{\nu_p} = \lambda_L^{3/2}$. This is rarely possible with common fluids.
*   **What Could Go Wrong:** Assuming that because you've matched *one* important dimensionless number, you've achieved full dynamic similarity. Engineers must make compromises, prioritize the most dominant forces, or use advanced techniques (like combining experimental data with CFD) to account for the discrepancies.

## 5. Worked examples — multiple, with every step shown

### Example 1: Geometric Scaling

**Problem:** A 1:25 scale model of a rocket is being built for wind tunnel testing. The actual prototype rocket has a length of 50 meters, a maximum diameter of 5 meters, and a total surface area of $1200 \text{ m}^2$. What are the corresponding length, diameter, and surface area of the model?

**What's Given:**
*   Scale factor $\lambda_L = L_m/L_p = 1/25$
*   Prototype length $L_p = 50 \text{ m}$
*   Prototype diameter $D_p = 5 \text{ m}$
*   Prototype surface area $A_p = 1200 \text{ m}^2$

**What We Want:**
*   Model length $L_m$
*   Model diameter $D_m$
*   Model surface area $A_m$

**Solution:**

1.  **Calculate Model Length ($L_m$):**
    The scale factor relates the length of the model to the length of the prototype.
    $$ \frac{L_m}{L_p} = \lambda_L $$
    $$ L_m = L_p \times \lambda_L $$
    Substitute the given values:
    $$ L_m = 50 \text{ m} \times \frac{1}{25} $$
    $$ L_m = 2 \text{ m} $$
    *This step directly applies the definition of the linear scale factor to find the model's length.*

2.  **Calculate Model Diameter ($D_m$):**
    Similarly, the diameter is a linear dimension and scales by the same factor.
    $$ \frac{D_m}{D_p} = \lambda_L $$
    $$ D_m = D_p \times \lambda_L $$
    Substitute the given values:
    $$ D_m = 5 \text{ m} \times \frac{1}{25} $$
    $$ D_m = 0.2 \text{ m} $$
    *This step confirms that all linear dimensions scale proportionally.*

3.  **Calculate Model Surface Area ($A_m$):**
    Surface area is a two-dimensional quantity. If lengths scale by $\lambda_L$, then areas scale by $\lambda_L^2$.
    $$ \frac{A_m}{A_p} = \lambda_L^2 $$
    $$ A_m = A_p \times \lambda_L^2 $$
    Substitute the given values:
    $$ A_m = 1200 \text{ m}^2 \times \left( \frac{1}{25} \right)^2 $$
    $$ A_m = 1200 \text{ m}^2 \times \frac{1}{625} $$
    $$ A_m = 1.92 \text{ m}^2 $$
    *This step demonstrates how areas scale with the square of the linear scale factor, which is a common point of error if one assumes linear scaling for everything.*

**Final Answer:**
The model rocket will have a length of $\boxed{2 \text{ m}}$, a maximum diameter of $\boxed{0.2 \text{ m}}$, and a total surface area of $\boxed{1.92 \text{ m}^2}$.

**Reflection:** This example highlights the fundamental difference in how linear dimensions, areas, and volumes scale. A common mistake is to apply the linear scale factor ($\lambda_L$) to areas and volumes as well, leading to incorrect results. Understanding that area scales as $\lambda_L^2$ and volume as $\lambda_L^3$ is crucial for geometric similarity.

---

### Example 2: Reynolds Similarity for a Submarine

**Problem:** A 1:10 scale model of a submarine is to be tested in a water tunnel to determine its drag characteristics. The prototype submarine operates in seawater (density $\rho_p = 1025 \text{ kg/m}^3$, dynamic viscosity $\mu_p = 1.08 \times 10^{-3} \text{ Pa} \cdot \text{s}$) at a speed of $10 \text{ m/s}$. The water tunnel uses fresh water (density $\rho_m = 1000 \text{ kg/m}^3$, dynamic viscosity $\mu_m = 1.00 \times 10^{-3} \text{ Pa} \cdot \text{s}$). What speed should the model be tested at to achieve dynamic similarity based on the Reynolds number?

**What's Given:**
*   Scale factor $\lambda_L = L_m/L_p = 1/10$
*   Prototype speed $V_p = 10 \text{ m/s}$
*   Prototype fluid properties: $\rho_p = 1025 \text{ kg/m}^3$, $\mu_p = 1.08 \times 10^{-3} \text{ Pa} \cdot \text{s}$
*   Model fluid properties: $\rho_m = 1000 \text{ kg/m}^3$, $\mu_m = 1.00 \times 10^{-3} \text{ Pa} \cdot \text{s}$

**What We Want:**
*   Model speed $V_m$

**Solution:**

1.  **State the condition for Reynolds Similarity:**
    For dynamic similarity where viscous and inertial forces are dominant, the Reynolds number of the model must equal the Reynolds number of the prototype.
    $$ Re_m = Re_p $$
    *This is the core principle we are applying, ensuring that the ratio of inertial to viscous forces is the same for both systems.*

2.  **Write out the Reynolds number formula for both model and prototype:**
    The Reynolds number is defined as $Re = \frac{\rho V L}{\mu}$.
    So, for the model:
    $$ Re_m = \frac{\rho_m V_m L_m}{\mu_m} $$
    And for the prototype:
    $$ Re_p = \frac{\rho_p V_p L_p}{\mu_p} $$
    *This expands the similarity condition into its constituent variables.*

3.  **Equate the Reynolds numbers and solve for $V_m$:**
    $$ \frac{\rho_m V_m L_m}{\mu_m} = \frac{\rho_p V_p L_p}{\mu_p} $$
    We want to find $V_m$, so rearrange the equation:
    $$ V_m = V_p \left( \frac{\rho_p}{\rho_m} \right) \left( \frac{\mu_m}{\mu_p} \right) \left( \frac{L_p}{L_m} \right) $$
    *This algebraic rearrangement isolates the desired variable, $V_m$. Note the careful grouping of terms for density, viscosity, and length ratios.*

4.  **Substitute the given values into the equation:**
    We know $L_p/L_m = 1/\lambda_L = 1/(1/10) = 10$.
    $$ V_m = (10 \text{ m/s}) \left( \frac{1025 \text{ kg/m}^3}{1000 \text{ kg/m}^3} \right) \left( \frac{1.00 \times 10^{-3} \text{ Pa} \cdot \text{s}}{1.08 \times 10^{-3} \text{ Pa} \cdot \text{s}} \right) \left( 10 \right) $$
    *This is the direct substitution of all known values. Keeping units consistent is important, but since we are using ratios, they often cancel out.*

5.  **Calculate the numerical result:**
    $$ V_m = (10) (1.025) (0.9259) (10) $$
    $$ V_m \approx 94.91 \text{ m/s} $$
    *Performing the final arithmetic. The result shows a significantly higher speed for the model, which is common when scaling down in water.*

**Final Answer:**
The model submarine should be tested at a speed of approximately $\boxed{94.91 \text{ m/s}}$ to achieve Reynolds similarity.

**Reflection:** This example demonstrates how to use the Reynolds number for dynamic similarity. The required model speed is significantly higher than the prototype speed. This is a common challenge in model testing: small models often require very high velocities, which can lead to other issues like cavitation (if in water) or compressibility effects (if in air), potentially violating other similarity conditions. This also highlights the importance of carefully selecting the test fluid to make the experiment feasible.

---

### Example 3: Reynolds and Froude Conflict

**Problem:** A 1:50 scale model of a ship is to be tested in a towing tank. The prototype ship sails at $15 \text{ m/s}$ in seawater ($\rho_p = 1025 \text{ kg/m}^3$, $\nu_p = 1.05 \times 10^{-6} \text{ m}^2/\text{s}$). The towing tank uses fresh water ($\rho_m = 998 \text{ kg/m}^3$, $\nu_m = 1.00 \times 10^{-6} \text{ m}^2/\text{s}$).
a) Calculate the model speed required for Froude similarity.
b) Calculate the model speed required for Reynolds similarity.
c) Discuss the implications of these two speeds.

**What's Given:**
*   Scale factor $\lambda_L = L_m/L_p = 1/50$
*   Prototype speed $V_p = 15 \text{ m/s}$
*   Prototype fluid properties: $\rho_p = 1025 \text{ kg/m}^3$, $\nu_p = 1.05 \times 10^{-6} \text{ m}^2/\text{s}$
*   Model fluid properties: $\rho_m = 998 \text{ kg/m}^3$, $\nu_m = 1.00 \times 10^{-6} \text{ m}^2/\text{s}$
*   Acceleration due to gravity $g = 9.81 \text{ m/s}^2$ (assumed constant)

**What We Want:**
*   $V_m$ for Froude similarity
*   $V_m$ for Reynolds similarity
*   Discussion of implications

**Solution:**

**Part a) Model speed for Froude similarity:**

1.  **State the condition for Froude Similarity:**
    For flows where gravitational forces (e.g., wave making) are dominant, the Froude number of the model must equal the Froude number of the prototype.
    $$ Fr_m = Fr_p $$
    *This is the appropriate similarity criterion for free-surface flows like ships.*

2.  **Write out the Froude number formula for both model and prototype:**
    The Froude number is defined as $Fr = \frac{V}{\sqrt{gL}}$.
    So, for the model:
    $$ Fr_m = \frac{V_m}{\sqrt{gL_m}} $$
    And for the prototype:
    $$ Fr_p = \frac{V_p}{\sqrt{gL_p}} $$
    *Expanding the Froude similarity condition.*

3.  **Equate the Froude numbers and solve for $V_m$:**
    $$ \frac{V_m}{\sqrt{gL_m}} = \frac{V_p}{\sqrt{gL_p}} $$
    $$ V_m = V_p \sqrt{\frac{gL_m}{gL_p}} $$
    Since $g$ is the same for both, it cancels out:
    $$ V_m = V_p \sqrt{\frac{L_m}{L_p}} $$
    We know $L_m/L_p = \lambda_L = 1/50$.
    $$ V_m = V_p \sqrt{\lambda_L} $$
    *Algebraically solving for $V_m$. The simplification due to constant gravity is important.*

4.  **Substitute the given values and calculate:**
    $$ V_m = (15 \text{ m/s}) \sqrt{\frac{1}{50}} $$
    $$ V_m = 15 \text{ m/s} \times 0.14142 $$
    $$ V_m \approx 2.121 \text{ m/s} $$
    *Calculation for Froude similarity.*

**Final Answer (Part a):**
The model speed required for Froude similarity is $\boxed{2.121 \text{ m/s}}$.

**Part b) Model speed for Reynolds similarity:**

1.  **State the condition for Reynolds Similarity:**
    $$ Re_m = Re_p $$
    *This is the condition for viscous and inertial force dominance.*

2.  **Write out the Reynolds number formula for both model and prototype (using kinematic viscosity $\nu = \mu/\rho$):**
    $$ Re = \frac{V L}{\nu} $$
    So, for the model:
    $$ Re_m = \frac{V_m L_m}{\nu_m} $$
    And for the prototype:
    $$ Re_p = \frac{V_p L_p}{\nu_p} $$
    *Using kinematic viscosity simplifies the expression as it's directly given.*

3.  **Equate the Reynolds numbers and solve for $V_m$:**
    $$ \frac{V_m L_m}{\nu_m} = \frac{V_p L_p}{\nu_p} $$
    $$ V_m = V_p \left( \frac{\nu_m}{\nu_p} \right) \left( \frac{L_p}{L_m} \right) $$
    We know $L_p/L_m = 1/\lambda_L = 50$.
    $$ V_m = V_p \left( \frac{\nu_m}{\nu_p} \right) \left( \frac{1}{\lambda_L} \right) $$
    *Algebraically solving for $V_m$.*

4.  **Substitute the given values and calculate:**
    $$ V_m = (15 \text{ m/s}) \left( \frac{1.00 \times 10^{-6} \text{ m}^2/\text{s}}{1.05 \times 10^{-6} \text{ m}^2/\text{s}} \right) \left( 50 \right) $$
    $$ V_m = (15) (0.95238) (50) $$
    $$ V_m \approx 714.28 \text{ m/s} $$
    *Calculation for Reynolds similarity.*

**Final Answer (Part b):**
The model speed required for Reynolds similarity is approximately $\boxed{714.28 \text{ m/s}}$.

**Part c) Discussion of implications:**

The model speed required for Froude similarity ($2.121 \text{ m/s}$) is vastly different from the speed required for Reynolds similarity ($714.28 \text{ m/s}$). This illustrates the **conflict in similarity criteria** when multiple forces (gravity and viscosity in this case) are simultaneously significant.

*   **Froude similarity** is crucial for accurately modeling wave-making resistance, which is a major component of drag for surface vessels.
*   **Reynolds similarity** is crucial for accurately modeling viscous drag, boundary layer behavior, and flow separation.

It is practically impossible to achieve both simultaneously using water for both model and prototype. If we ran the model at $2.121 \text{ m/s}$ (Froude similarity), its Reynolds number would be too low, meaning viscous effects would be disproportionately high compared to the prototype. If we ran it at $714.28 \text{ m/s}$ (Reynolds similarity), the model would generate massive, unrealistic waves, and likely cavitate, making the results meaningless for wave resistance.

**Engineers typically prioritize the dominant force.** For ships, wave resistance is often the primary concern at typical operating speeds. Therefore, ship model tests are usually conducted under Froude similarity. The viscous drag component is then estimated separately (e.g., using flat plate formulas or empirical corrections) and added to the measured wave drag to get the total prototype drag. This is a common compromise in experimental fluid dynamics.

**Reflection:** This is a classic problem in fluid mechanics, demonstrating that achieving full dynamic similarity can be impossible. It forces engineers to understand which forces are most dominant for their specific application and to make informed compromises, often using a combination of experimental and analytical/numerical methods. The huge discrepancy in speeds highlights the practical limitations.

---

### Example 4: Wind Tunnel Testing with Compressibility

**Problem:** An aircraft flies at $250 \text{ m/s}$ at an altitude of $10,000 \text{ m}$ (where air density $\rho_p = 0.4135 \text{ kg/m}^3$, dynamic viscosity $\mu_p = 1.47 \times 10^{-5} \text{ Pa} \cdot \text{s}$, speed of sound $c_p = 299.5 \text{ m/s}$). A 1:20 scale model is to be tested in a wind tunnel at sea level (where air density $\rho_m = 1.225 \text{ kg/m}^3$, dynamic viscosity $\mu_m = 1.81 \times 10^{-5} \text{ Pa} \cdot \text{s}$, speed of sound $c_m = 340.3 \text{ m/s}$). What wind tunnel speed is required for dynamic similarity, considering both Reynolds and Mach numbers?

**What's Given:**
*   Scale factor $\lambda_L = L_m/L_p = 1/20$
*   Prototype conditions: $V_p = 250 \text{ m/s}$, $\rho_p = 0.4135 \text{ kg/m}^3$, $\mu_p = 1.47 \times 10^{-5} \text{ Pa} \cdot \text{s}$, $c_p = 299.5 \text{ m/s}$
*   Model (wind tunnel) conditions: $\rho_m = 1.225 \text{ kg/m}^3$, $\mu_m = 1.81 \times 10^{-5} \text{ Pa} \cdot \text{s}$, $c_m = 340.3 \text{ m/s}$

**What We Want:**
*   Model speed $V_m$ that satisfies both Reynolds and Mach similarity.

**Solution:**

1.  **State the conditions for Mach Similarity:**
    For flows where compressibility effects are significant (i.e., high speeds), the Mach number of the model must equal the Mach number of the prototype.
    $$ Ma_m = Ma_p $$
    *Mach number is crucial for high-speed aerodynamics to correctly capture shock waves and pressure distributions.*

2.  **Write out the Mach number formula for both model and prototype:**
    The Mach number is defined as $Ma = V/c$.
    $$ \frac{V_m}{c_m} = \frac{V_p}{c_p} $$
    *Expanding the Mach similarity condition.*

3.  **Solve for $V_m$ based on Mach similarity:**
    $$ V_m = V_p \left( \frac{c_m}{c_p} \right) $$
    Substitute prototype speed and speeds of sound:
    $$ V_m = (250 \text{ m/s}) \left( \frac{340.3 \text{ m/s}}{299.5 \text{ m/s}} \right) $$
    $$ V_m = 250 \text{ m/s} \times 1.1362 $$
    $$ V_m \approx 284.05 \text{ m/s} $$
    *This is the speed required to match compressibility effects.*

4.  **State the condition for Reynolds Similarity:**
    $$ Re_m = Re_p $$
    *This is the condition for viscous and inertial force dominance, also important for boundary layers and drag.*

5.  **Write out the Reynolds number formula for both model and prototype:**
    $$ \frac{\rho_m V_m L_m}{\mu_m} = \frac{\rho_p V_p L_p}{\mu_p} $$
    *Expanding the Reynolds similarity condition.*

6.  **Solve for $V_m$ based on Reynolds similarity:**
    $$ V_m = V_p \left( \frac{\rho_p}{\rho_m} \right) \left( \frac{\mu_m}{\mu_p} \right) \left( \frac{L_p}{L_m} \right) $$
    We know $L_p/L_m = 1/\lambda_L = 20$.
    $$ V_m = (250 \text{ m/s}) \left( \frac{0.4135 \text{ kg/m}^3}{1.225 \text{ kg/m}^3} \right) \left( \frac{1.81 \times 10^{-5} \text{ Pa} \cdot \text{s}}{1.47 \times 10^{-5} \text{ Pa} \cdot \text{s}} \right) \left( 20 \right) $$
    $$ V_m = (250) (0.33755) (1.2313) (20) $$
    $$ V_m \approx 2074.6 \text{ m/s} $$
    *This is the speed required to match viscous effects.*

7.  **Compare the required speeds and discuss implications:**
    For Mach similarity, $V_m \approx 284.05 \text{ m/s}$.
    For Reynolds similarity, $V_m \approx 2074.6 \text{ m/s}$.

    These two speeds are significantly different. It is impossible to simultaneously achieve both Mach and Reynolds similarity under the given conditions (using air at sea level for the model).

    *   The prototype aircraft flies at $Ma_p = V_p/c_p = 250/299.5 \approx 0.835$.
    *   If we choose Mach similarity, $V_m = 284.05 \text{ m/s}$, which means $Ma_m = 284.05/340.3 \approx 0.835$. This correctly models compressibility effects. However, the Reynolds number will be off.
    *   If we choose Reynolds similarity, $V_m = 2074.6 \text{ m/s}$, which means $Ma_m = 2074.6/340.3 \approx 6.09$. This would put the model in a hypersonic regime, completely different from the prototype's high-subsonic/transonic regime, making the results for compressibility effects meaningless.

    **Conclusion:** For high-speed aircraft, **Mach similarity is almost always prioritized** over Reynolds similarity. The formation of shock waves, pressure distribution, and overall flow topology are highly dependent on the Mach number. While Reynolds number is important for viscous effects (like skin friction drag and boundary layer separation), engineers often accept a mismatch in Reynolds number and apply corrections based on empirical data or computational fluid dynamics (CFD) to account for the difference in viscous effects. Sometimes, pressurized wind tunnels are used to increase $\rho_m$ and decrease $V_m$ for Reynolds similarity, but this adds significant cost and complexity.

**Final Answer:**
It is **impossible to achieve both Reynolds and Mach similarity simultaneously** under the given conditions. For high-speed aircraft, **Mach similarity is prioritized**, requiring a model speed of approximately $\boxed{284.05 \text{ m/s}}$.

**Reflection:** This example demonstrates a more complex similarity conflict, involving both compressibility and viscosity. It's a very common scenario in high-speed aerodynamics. The key takeaway is that engineers must understand which dimensionless parameters are most critical for the phenomena they are studying and make practical compromises when full similarity is unattainable. The choice of priority (Mach vs. Reynolds) depends on the specific flow regime and the dominant physics.

## 6. Common mistakes and traps

1.  **Assuming Linear Scaling for All Quantities:** Students often mistakenly apply the linear scale factor ($\lambda_L$) to areas, volumes, forces, or power directly. Remember, areas scale as $\lambda_L^2$, volumes as $\lambda_L^3$, and forces/power scale by more complex relationships involving dimensionless numbers.
2.  **Ignoring Relevant Dimensionless Numbers:** Forgetting to consider all dominant forces in a flow problem. For example, using only Reynolds similarity for a ship model where wave-making (gravity) is significant, or ignoring Mach number for high-speed flows.
3.  **Incorrectly Calculating Dimensionless Numbers:** Errors in the definition or calculation of Reynolds, Froude, Mach, etc., often due to inconsistent units or mixing up characteristic length/velocity. Always use a consistent set of units (e.g., SI).
4.  **Mixing Up Model and Prototype Values:** Accidentally using prototype values where model values are needed, or vice-versa, especially when rearranging equations. Clearly label all variables with 'm' for model and 'p' for prototype.
5.  **Assuming Full Similarity is Always Possible:** As shown in examples, it's often impossible to match all relevant dimensionless numbers simultaneously. Failing to recognize this and discuss the implications or necessary compromises is a significant conceptual error.
6.  **Not Understanding the "Dominance" of Forces:** Forgetting that similarity criteria are derived from *ratios* of forces. The importance of a particular dimensionless number depends on which forces are dominant in the specific flow regime being studied. For instance, at very low Reynolds numbers, viscous forces dominate, and inertial effects are negligible.

## 7. Textbook-precise explanation

**Similarity** in fluid mechanics refers to the conditions under which two flow phenomena, a prototype (p) and a model (m), exhibit identical behavior when scaled appropriately. This requires three levels of similarity: geometric, kinematic, and dynamic.

**Geometric Similarity**
Two systems are geometrically similar if and only if the ratio of all corresponding linear dimensions in the model and prototype is constant.
$$ \frac{L_m}{L_p} = \frac{D_m}{D_p} = \frac{H_m}{H_p} = \lambda_L $$
where $\lambda_L$ is the linear scale factor. This implies that all corresponding angles are equal, and ratios of areas scale as $\lambda_L^2$, while ratios of volumes scale as $\lambda_L^3$. Surface roughness must also be geometrically scaled, i.e., $k_{s,m}/k_{s,p} = \lambda_L$.

**Kinematic Similarity**
Kinematic similarity exists if, in addition to geometric similarity, the ratios of corresponding velocities and accelerations at corresponding points in the flow fields are constant. This means that streamlines in the model flow are geometrically similar to those in the prototype flow.
$$ \frac{V_m}{V_p} = \lambda_V \quad \text{and} \quad \frac{a_m}{a_p} = \lambda_a $$
where $\lambda_V$ and $\lambda_a$ are the velocity and acceleration scale factors, respectively. The time scale factor is $\lambda_t = \lambda_L / \lambda_V$.

**Dynamic Similarity**
Dynamic similarity is the most stringent condition. It requires that, in addition to geometric and kinematic similarity, the ratios of all corresponding forces (inertial, viscous, pressure, gravitational, surface tension, elastic, etc.) acting on corresponding fluid elements or boundary surfaces are constant between the model and the prototype.
$$ \frac{F_{i,m}}{F_{i,p}} = \lambda_F $$
for any specific force $F_i$. More practically, this condition is satisfied if and only if all relevant dimensionless parameters (derived from the ratios of these forces) are identical between the model and the prototype.

The Navier-Stokes equations, when non-dimensionalized, reveal these critical dimensionless groups. For an incompressible, viscous flow, the non-dimensionalized momentum equation in its general form is:
$$ \frac{\partial \mathbf{V}^*}{\partial t^*} + (\mathbf{V}^* \cdot \nabla^*) \mathbf{V}^* = - \nabla^* P^* + \frac{1}{Re} \nabla^{*2} \mathbf{V}^* + \frac{1}{Fr^2} \mathbf{g}^* + \dots $$
where '*' denotes a dimensionless quantity. For dynamic similarity, the coefficients of these dimensionless terms must be equal between the model and prototype. This implies:

*   **Reynolds Number ($Re$):** Represents the ratio of inertial forces to viscous forces.
    $$ Re = \frac{\rho V L}{\mu} = \frac{V L}{\nu} $$
    For flows dominated by inertial and viscous effects, $Re_m = Re_p$ is required.

*   **Froude Number ($Fr$):** Represents the ratio of inertial forces to gravitational forces.
    $$ Fr = \frac{V}{\sqrt{gL}} $$
    For flows with a free surface or where gravity is significant (e.g., waves), $Fr_m = Fr_p$ is required.

*   **Mach Number ($Ma$):** Represents the ratio of inertial forces to compressibility (elastic) forces, or the ratio of flow speed to the speed of sound.
    $$ Ma = \frac{V}{c} $$
    For high-speed compressible flows, $Ma_m = Ma_p$ is required.

*   **Euler Number ($Eu$):** Represents the ratio of pressure forces to inertial forces.
    $$ Eu = \frac{\Delta P}{\frac{1}{2}\rho V^2} $$
    Often used to relate pressure coefficients, $C_P = \Delta P / (\frac{1}{2}\rho V^2)$, which must also be equal.

*   **Weber Number ($We$):** Represents the ratio of inertial forces to surface tension forces.
    $$ We = \frac{\rho V^2 L}{\sigma} $$
    Relevant for flows with liquid-gas interfaces and small length scales (e.g., droplets, bubbles).

**Reynolds Similarity**
Specifically, Reynolds similarity refers to the condition where the Reynolds number of the model matches that of the prototype ($Re_m = Re_p$). This is the primary criterion for dynamic similarity in many incompressible, viscous flows, particularly around submerged bodies where free-surface effects and compressibility are negligible.
$$ \left( \frac{\rho V L}{\mu} \right)_m = \left( \frac{\rho V L}{\mu} \right)_p $$
This condition dictates the required model velocity or fluid properties for accurate scaling of viscous phenomena.

Achieving full dynamic similarity by matching all relevant dimensionless numbers simultaneously can be challenging or impossible in practice, especially when using different fluids or significant scaling factors. In such cases, engineers must prioritize the most dominant forces and their corresponding dimensionless numbers, and then use empirical corrections or computational methods to account for the un-matched parameters.

*References:*
*   White, F. M. (2021). *Fluid Mechanics* (9th ed.). McGraw-Hill Education. (Chapter 6: Dimensional Analysis and Similarity)
*   Cengel, Y. A., & Cimbala, J. M. (2018). *Fluid Mechanics: Fundamentals and Applications* (4th ed.). McGraw-Hill Education. (Chapter 7: Dimensional Analysis and Modeling)
*   Fox, R. W., McDonald, A. T., & Pritchard, P. J. (2016). *Introduction to Fluid Mechanics* (9th ed.). John Wiley & Sons. (Chapter 7: Dimensional Analysis and Similitude)

## 8. ASCII diagrams

```text
       Prototype (P)                                  Model (M)

       +-----------------------+                      +---------------------+
       |                       |                      |                     |
       |       Fluid Flow      |                      |     Fluid Flow      |
       |                       |                      |                     |
       |  -> -> -> -> -> -> -> |                      | -> -> -> -> -> -> ->|
       | /                     \                      |/                   \|
       |/                       \|  <-- L_p           |                     | <-- L_m
       +-------------------------+                    +---------------------+
           ^     ^   ^                                    ^     ^   ^
           |     |   |                                    |     |   |
           V_p   D_p H_p                                  V_m   D_m H_m

Geometric Similarity:
L_m / L_p = D_m / D_p = H_m / H_p = lambda_L (e.g., 1/10)

Kinematic Similarity:
Streamlines (flow patterns) are geometrically similar.
Velocity ratios are constant: V_m / V_p = lambda_V

Dynamic Similarity:
Ratios of forces are constant.
Dimensionless numbers are matched: Re_m = Re_p, Fr_m = Fr_p, Ma_m = Ma_p, etc.
```

*Description of the figure:*
The diagram above illustrates the concept of geometric similarity between a prototype (P) and a model (M) in a fluid flow. Both objects have a characteristic length (L), height (H), and depth/diameter (D). The fluid flow is indicated by arrows representing velocity (V).
*   **Prototype:** A larger object with dimensions $L_p$, $D_p$, $H_p$, and a characteristic flow velocity $V_p$.
*   **Model:** A smaller, geometrically scaled version of the prototype with dimensions $L_m$, $D_m$, $H_m$, and a characteristic flow velocity $V_m$.
The diagram shows that for geometric similarity, the model is simply a scaled-down version of the prototype in all linear dimensions. For kinematic similarity, the flow patterns (represented by the arrows and the general shape of the flow around the object) would also be scaled versions of each other. Dynamic similarity ensures that the underlying physics (force ratios) are also consistent.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Think of "GKD-ReFMa" as a checklist for similarity.
    *   **G**eometric: "The **G**uys look the same" (shape).
    *   **K**inematic: "Their **K**icks are the same" (motion/flow pattern).
    *   **D**ynamic: "Their **D**ominant forces are the same" (force ratios/dimensionless numbers).
    *   **ReFMa:** Which dominant forces? Remember the big three: **Re**ynolds (viscous), **F**roude (gravity), **Ma**ch (compressibility).
    Visualize a tiny, perfectly shaped (G) action figure moving exactly like its life-sized hero (K), and then imagine that the tiny figure feels the push and pull of the world (D) in the same *relative* way as the hero, thanks to some magic that adjusts its "ReFMa" properties.

2.  **1-3 Formulas/Facts They MUST Overlearn:**
    *   **The definition of Reynolds Number:** $Re = \frac{\rho V L}{\mu}$ (inertial/viscous forces). This is the most frequently used similarity parameter.
    *   **The core principle of dynamic similarity:** Matching dimensionless numbers, e.g., $Re_m = Re_p$.
    *   **Scaling of dimensions:** Lengths scale as $\lambda_L$, Areas as $\lambda_L^2$, Volumes as $\lambda_L^3$.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review the entire lesson, focusing on understanding the distinctions between G, K, D similarity and the meaning of Re, Fr, Ma. Work through Example 2.
    *   **Day 3:** Reread Sections 4 and 5. Try to re-derive the Reynolds similarity condition from first principles. Work through Example 3 without looking at the solution.
    *   **Day 7:** Review the "Common Mistakes" section. Explain to yourself (or a rubber duck) why full similarity is often impossible. Redo Example 4.
    *   **Day 16:** Summarize the entire topic of similarity in 3-5 bullet points. Write down the definitions of Re, Fr, Ma.
    *   **Day 35:** Attempt the self-check questions. Reflect on how similarity connects to other areas of fluid mechanics.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the Reynolds similarity condition, you can always rebuild it from Newton's Second Law:
    1.  **Start with Newton's Second Law:** $F = ma$.
    2.  **Identify dominant forces:** For many fluid flows, inertial forces ($F_I$) and viscous forces ($F_V$) are key.
    3.  **Express inertial force in terms of fluid properties, velocity, and length:**
        *   Mass $m \propto \rho L^3$ (density $\times$ volume)
        *   Acceleration $a \propto V/t \propto V/(L/V) = V^2/L$
        *   So, $F_I \propto (\rho L^3) (V^2/L) = \rho L^2 V^2$.
    4.  **Express viscous force in terms of fluid properties, velocity, and length:**
        *   Shear stress $\tau = \mu (dV/dy) \propto \mu (V/L)$
        *   Force $F_V = \tau \times \text{Area} \propto (\mu V/L) \times L^2 = \mu L V$.
    5.  **Form the ratio of inertial to viscous forces:**
        $$ \frac{F_I}{F_V} \propto \frac{\rho L^2 V^2}{\mu L V} = \frac{\rho L V}{\mu} $$
    6.  **Recognize this ratio as the Reynolds number:** $Re = \frac{\rho V L}{\mu}$.
    7.  **Condition for dynamic similarity:** For the ratio of these forces to be the same in model and prototype, their Reynolds numbers must be equal: $Re_m = Re_p$.
    This pathway can be adapted for other dimensionless numbers by considering different dominant forces (e.g., gravity for Froude, pressure for Euler, elastic for Mach).

## 10. Connections — what this leads to

The concept of similarity is fundamental and paves the way for understanding and applying many advanced topics in fluid mechanics and engineering:

1.  **Experimental Fluid Dynamics (EFD):** Similarity is the theoretical basis for all model testing in wind tunnels, water channels, towing tanks, and other experimental facilities. It dictates how experiments are designed and how results are scaled to the prototype.
2.  **Computational Fluid Dynamics (CFD) Validation:** While CFD allows for numerical simulation of full-scale problems, experimental data obtained through similarity principles is crucial for validating CFD models. Without reliable experimental data, CFD results cannot be fully trusted.
3.  **Boundary Layer Theory:** The Reynolds number is a critical parameter in boundary layer analysis, determining whether the boundary layer is laminar or turbulent, and influencing separation points. Similarity ensures that boundary layer behavior in the model reflects the prototype.
4.  **Turbulence Modeling:** Understanding how turbulence scales is complex. Similarity provides a framework for relating turbulent flows in models to prototypes, though direct scaling of turbulence itself is often challenging and requires advanced modeling techniques.
5.  **Aerodynamics and Hydrodynamics:** All aspects of lift, drag, stability, and control for aircraft, ships, and submarines are heavily dependent on similarity principles, especially Reynolds, Mach, and Froude numbers.
6.  **Heat Transfer and Mass Transfer:** Similarity principles extend beyond pure fluid mechanics. Dimensionless numbers like the Nusselt number (for heat transfer) and Sherwood number (for mass transfer) are derived in a similar fashion, allowing for scaling of thermal and mass transport phenomena.
7.  **Geophysical Fluid Dynamics:** Understanding large-scale atmospheric and oceanic flows (e.g., Coriolis force, Rossby number) also relies on dimensional analysis and similarity to relate laboratory experiments to planetary phenomena.
8.  **Scaling Laws in Physics:** The approach of non-dimensionalizing equations and identifying characteristic parameters is a general scientific method, applicable across various fields beyond fluid mechanics, for understanding how phenomena scale with size and other parameters.

## 11. Self-check questions

1.  Explain, in your own words, the fundamental difference between geometric, kinematic, and dynamic similarity. Why is dynamic similarity the most challenging to achieve?
2.  A small insect flying through air experiences very different dominant forces compared to a large aircraft flying at high speed. Which dimensionless number would be most crucial for understanding the insect's flight, and why? Contrast this with the aircraft.
3.  You are designing a spillway for a large dam. You decide to build a 1:30 scale model. If the prototype experiences a flow velocity of $10 \text{ m/s}$, what velocity should you use in the model to ensure accurate representation of wave formation and flow patterns over the spillway? Assume both model and prototype use water.
4.  A prototype rocket nozzle operates with hot exhaust gases at a Mach number of 3. A 1:5 scale model is being tested using cold air in a laboratory. If the speed of sound in the prototype exhaust is $1200 \text{ m/s}$ and in the model's cold air is $340 \text{ m/s}$, what is the required flow velocity in the model for Mach similarity? If the prototype's Reynolds number is $10^7$, and the model's fluid density is 5 times higher and viscosity is 2 times lower than the prototype's, what would be the required model velocity for Reynolds similarity? Discuss the feasibility of achieving both.
5.  Consider a fluid flow problem where surface tension forces are significant, such as the breakup of a liquid jet into droplets. Besides geometric, kinematic, and dynamic similarity, which specific dimensionless number would you need to match between a model and a prototype, and how would you define it in terms of relevant physical properties?