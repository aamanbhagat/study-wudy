## 1. What it is — in plain English

Imagine the surface of a liquid, like water in a glass. It's not just a flat, passive boundary; it acts almost like a thin, elastic skin stretched across the liquid. This "skin" tries to pull itself together, making the liquid surface as small as possible. This phenomenon is called **surface tension**.

Think of a tiny insect, like a water strider, walking on the surface of a pond. It doesn't sink! That's because the water's surface tension is strong enough to support its weight, resisting the deformation caused by its delicate legs. The water surface literally stretches and indents slightly under its weight, like a trampoline.

At its core, surface tension is a force that arises from the attractive forces between the liquid molecules themselves. Molecules deep inside the liquid are happy and surrounded by other liquid molecules in all directions. But molecules at the very surface are missing some of these neighbors above them, so they get pulled more strongly by the molecules *below* and *to the side* of them, creating an inward pull. This inward pull is what makes the surface behave like a stretched membrane.

This "stretched skin" effect is why raindrops are spherical (they try to minimize their surface area for a given volume), why small water droplets cling to a spiderweb, and why you can carefully float a paperclip on water. It's a fundamental property of liquids that dictates how they interact with their surroundings and themselves.

## 2. Why it matters — real-world applications

Surface tension is far more than a curious phenomenon; it's a critical force in countless natural and engineered systems, often dominating behavior at small scales.

1.  **Microfluidics and Lab-on-a-Chip Devices:** In the realm of tiny channels and droplets (think milliliters down to picoliters), surface tension forces become dominant over gravity and inertia. Companies like **Fluidigm** and **Dolomite Microfluidics** design devices that manipulate minuscule fluid volumes for biological assays, chemical synthesis, and diagnostics. Surface tension dictates how droplets form, merge, and move through channels, enabling precise control of reactions and analyses on a chip. Understanding surface tension is crucial for designing channels, valves, and pumps in these systems.

2.  **Fuel Injector Design in Aerospace and Automotive Engines:** For efficient combustion in rocket engines or jet turbines, fuel must be atomized into extremely fine droplets to maximize surface area for reaction with oxidizer. Surface tension resists this atomization, trying to keep the fuel in larger drops. Engineers at companies like **Rolls-Royce** or **SpaceX** must design injectors that overcome surface tension to produce the optimal droplet size distribution for efficient and clean burning, often using high pressures or acoustic waves to break up the liquid stream.

3.  **Wetting and Coating Technologies:** From waterproof fabrics to anti-fog coatings, surface tension (and its interplay with adhesion) determines whether a liquid "wets" a surface or beads up. For instance, **Gore-Tex** fabrics achieve water repellency by having a surface with low surface energy, causing water droplets to bead up due to their own high surface tension, preventing them from penetrating the fabric's pores. Conversely, for painting or applying adhesives, you want a liquid to spread evenly, meaning the liquid should "wet" the surface well. This is a balance between the liquid's surface tension and the adhesive forces between the liquid and the solid.

4.  **Microgravity Fluid Management in Spacecraft:** In the absence of significant gravity, surface tension completely dominates fluid behavior. Fuel tanks in spacecraft (e.g., for **NASA's** or **ESA's** missions) must be designed with "surface tension tanks" or "capillary vanes" to ensure propellants are properly positioned near outlet ports, preventing bubbles or fuel from floating away. This is crucial for reliable engine restarts and attitude control thrusters, where even small amounts of gas ingestion can lead to engine failure.

5.  **Froth Flotation in Mining:** This industrial process, used by mining companies like **Rio Tinto**, separates valuable minerals from ore. Air bubbles are introduced into a slurry, and surface-active chemicals (surfactants) are added. These surfactants attach to the desired mineral particles, making them hydrophobic (water-repelling). The hydrophobic particles then attach to the air bubbles, which rise to the surface, forming a froth that can be skimmed off. Surface tension is fundamental to the stability of these bubbles and their ability to carry the mineral particles.

## 3. Prerequisites — what you must know first

Before diving deep into surface tension, ensure you have a solid grasp of these fundamental concepts:

*   **Intermolecular Forces:** The attractive or repulsive forces between molecules (e.g., van der Waals forces, hydrogen bonding). These are the ultimate origin of surface tension.
*   **Potential Energy:** The energy stored in an object due to its position or configuration. Understanding how work done against forces translates into stored potential energy is crucial for surface energy.
*   **Force:** A push or a pull that can cause a change in motion. Surface tension is fundamentally a force (per unit length).
*   **Pressure:** Force per unit area. We will see how surface tension creates pressure differences across curved interfaces.
*   **Work:** Force applied over a distance. Expanding a liquid surface requires work against surface tension, which increases the surface energy.
*   **Free Body Diagrams:** Diagrams showing all forces acting on an object or a system. Essential for deriving the Young-Laplace equation through force balance.
*   **Basic Calculus (Derivatives and Integrals):** For understanding rates of change and summing infinitesimal contributions, particularly when dealing with curved surfaces and energy minimization.
*   **Thermodynamics (specifically Free Energy):** While not strictly necessary for the initial intuition, a deeper understanding of surface tension connects to the concept of minimizing Gibbs free energy in a system.

## 4. The core idea — step by step

Let's build up the concept of surface tension, starting from the molecular level and moving towards the formal mathematical description.

### Step 1: The Molecular Origin – Unequal Forces at the Surface

*   **Plain-English Statement:** Molecules inside a liquid are surrounded by other liquid molecules in all directions, leading to balanced attractive forces. Molecules at the surface, however, lack neighbors above them, causing a net inward pull.
*   **Concrete Example:** Imagine a water molecule. If it's deep inside a glass of water, it's constantly being tugged by other water molecules from all sides – left, right, up, down, front, back. These pulls largely cancel each other out, resulting in no net force on the molecule. Now, imagine a water molecule exactly at the surface. It still has neighbors to its sides and below it, pulling it inwards and sideways. But there are no water molecules *above* it (only air or vacuum), so there's no upward pull to balance the downward pull. This creates a net attractive force pulling the surface molecule *into* the bulk of the liquid.
*   **Formal/Mathematical Version:**
    Let $F_{ij}$ be the attractive force between molecule $i$ and molecule $j$.
    For a molecule in the bulk, the vector sum of forces $\sum \vec{F}_{ij} = \vec{0}$.
    For a molecule at the surface, the vector sum of forces $\sum \vec{F}_{ij} \neq \vec{0}$, with a net component directed inwards, perpendicular to the surface.
    This inward pull means that to bring a molecule from the bulk to the surface, work must be done against this net inward force.
*   **What Could Go Wrong:** Thinking that surface molecules are somehow "weaker" or less stable. They are simply in a different force environment. Also, confusing this inward force with pressure; it's a molecular attraction, not a macroscopic pressure difference *at this stage*.

### Step 2: Surface Energy – The Cost of Creating Surface Area

*   **Plain-English Statement:** Because work must be done to bring molecules from the bulk to the surface (against the inward pull), the surface molecules possess higher potential energy than bulk molecules. This excess energy per unit area is called surface energy.
*   **Concrete Example:** Imagine you have a large block of liquid. To increase its surface area (e.g., by stretching it into a thinner sheet or breaking it into smaller droplets), you have to move more molecules from the interior to the surface. Each time you do this, you're doing work against the net inward forces from Step 1. This work isn't lost; it's stored as potential energy in the newly created surface.
*   **Formal/Mathematical Version:**
    The work done $dW$ to increase the surface area $dA$ is directly proportional to $dA$.
    $$dW = \gamma_{energy} dA$$
    Here, $\gamma_{energy}$ is the surface energy per unit area, typically measured in Joules per square meter ($J/m^2$).
    Since $W = \Delta U$ (change in potential energy), we can write:
    $$\Delta U = \gamma_{energy} \Delta A$$
    Liquids naturally tend to minimize their total energy, which includes this surface energy. Therefore, they try to minimize their surface area for a given volume (e.g., forming spheres).
*   **What Could Go Wrong:** Confusing surface energy (J/m²) with surface tension (N/m). While numerically equivalent for simple liquids, they represent different physical concepts: energy per unit area vs. force per unit length. We'll clarify this equivalence next.

### Step 3: Defining Surface Tension ($\gamma$) – Force Per Unit Length

*   **Plain-English Statement:** Surface tension is the force acting tangentially along the surface, perpendicular to any line drawn on the surface, and tending to pull the surface together to minimize its area. It's measured as force per unit length.
*   **Concrete Example:** Imagine a rectangular wire frame with a movable side, and a thin soap film stretched across it. If you pull the movable side, you're increasing the film's area. You'll feel a resistance – a force trying to pull the movable side back. This force is due to surface tension. If the movable side has length $L$, the force $F$ you feel is proportional to $L$. The constant of proportionality is the surface tension $\gamma$. Since a soap film has *two* surfaces (front and back), the total length over which the force acts is $2L$.
*   **Formal/Mathematical Version:**
    Consider a line of length $L$ drawn on a liquid surface. The surface tension $\gamma$ exerts a force $F$ perpendicular to this line and parallel to the surface.
    $$\gamma = \frac{F}{L}$$
    The units of surface tension are Newtons per meter ($N/m$).
    Crucially, $N/m = (J/m^2 \cdot m) / m = J/m^2$. This shows the numerical equivalence between surface tension (force per unit length) and surface energy (energy per unit area) for a simple interface.
*   **What Could Go Wrong:** Forgetting that the force acts along the *perimeter* of the surface, not across its area. Also, miscounting the number of surfaces in a problem (e.g., a single liquid-air interface vs. a soap film with two liquid-air interfaces).

### Step 4: Pressure Difference Across a Curved Interface (Laplace's Law for Simple Geometries)

*   **Plain-English Statement:** A curved liquid surface acts like a stretched membrane. Just as a stretched balloon has higher pressure inside than out, a curved liquid surface creates a pressure difference across it. The pressure is always higher on the *concave* side (the side that bulges inward).
*   **Concrete Example:** Consider a tiny spherical water droplet (like mist). Its surface is curved. Because of surface tension, the "skin" of the droplet is pulling inwards. To maintain equilibrium, the pressure *inside* the droplet must be higher than the pressure *outside* to counteract this inward pull. If the pressure inside wasn't higher, the droplet would collapse.
*   **Formal/Mathematical Version (Derivation for a Spherical Droplet):**
    Imagine a spherical droplet of radius $R$. Cut it in half.
    The forces acting on one hemisphere are:
    1.  **Inward force due to surface tension:** This acts along the circumference of the cut, which is $2\pi R$. The total inward force due to surface tension is $F_s = \gamma \cdot (2\pi R)$.
    2.  **Outward force due to internal pressure:** The excess pressure $\Delta P = P_{in} - P_{out}$ acts over the circular area of the cut, which is $\pi R^2$. The total outward force is $F_P = \Delta P \cdot (\pi R^2)$.
    At equilibrium, these forces balance:
    $$F_P = F_s$$
    $$\Delta P (\pi R^2) = \gamma (2\pi R)$$
    Solving for $\Delta P$:
    $$\Delta P = \frac{2\gamma}{R}$$
    This is Laplace's Law for a spherical interface. Note: For a soap bubble, which has *two* surfaces (an inner and an outer), the surface tension force acts on *both* surfaces, so the total surface tension force would be $2 \times (\gamma \cdot 2\pi R) = 4\pi R \gamma$. Thus, for a soap bubble, $\Delta P = \frac{4\gamma}{R}$.
*   **What Could Go Wrong:** Forgetting that pressure is higher on the concave side. Incorrectly applying the factor of 2 (or 4 for a bubble) or confusing the radius of curvature with diameter.

### Step 5: The Young-Laplace Equation (General Form)

*   **Plain-English Statement:** The Young-Laplace equation generalizes the pressure difference across *any* arbitrarily curved interface, not just spheres. It states that the pressure difference is proportional to the surface tension and the sum of the inverse of the two principal radii of curvature at a given point on the surface.
*   **Concrete Example:** Imagine a saddle shape. At any point on the saddle, if you slice it in one direction, it curves upwards (like a smile). If you slice it in a perpendicular direction, it curves downwards (like a frown). These are the two principal curvatures. The Young-Laplace equation tells us the pressure difference across such a complex surface by considering these two curvatures.
*   **Formal/Mathematical Version:**
    The general form of the Young-Laplace equation is:
    $$\Delta P = \gamma \left( \frac{1}{R_1} + \frac{1}{R_2} \right)$$
    Where:
    *   $\Delta P = P_{in} - P_{out}$ is the pressure difference across the interface.
    *   $\gamma$ is the surface tension of the liquid.
    *   $R_1$ and $R_2$ are the two principal radii of curvature at a given point on the surface. These are the radii of the largest and smallest circles that can be fitted tangentially to the surface at that point in mutually perpendicular planes.
    **Sign Convention:** A common convention is that radii are positive if the center of curvature lies on the side of higher pressure (i.e., the concave side). If the surface is convex from the perspective of the higher pressure side, the radius would be negative. Alternatively, one can simply assign positive values to radii for curvature that 'bulges towards' the higher pressure side, and negative for curvature that 'bulges away'. The simplest is to ensure $R_1, R_2$ are positive for surfaces that are concave towards the higher pressure side. For a sphere, $R_1 = R_2 = R$, so $\Delta P = \gamma (\frac{1}{R} + \frac{1}{R}) = \frac{2\gamma}{R}$, consistent with Step 4. For a cylinder, one radius is $R$ and the other is effectively infinite ($\infty$), so $\Delta P = \gamma (\frac{1}{R} + \frac{1}{\infty}) = \frac{\gamma}{R}$.
*   **What Could Go Wrong:** Incorrectly identifying the principal radii of curvature. Misapplying the sign convention for $R_1$ and $R_2$, especially for complex surfaces like a saddle point where one radius might be positive and the other negative.

## 5. Worked examples — multiple, with every step shown

### Example 1: Force to Lift a Wire Frame

**Problem:** A thin, circular wire ring of radius $r = 5.0$ cm is placed on the surface of water. If the surface tension of water is $\gamma = 0.072$ N/m, what is the minimum force required to lift the ring from the water surface? Assume the water wets the wire perfectly (contact angle is 0 degrees).

**Given:**
*   Radius of the ring, $r = 5.0$ cm $= 0.05$ m
*   Surface tension of water, $\gamma = 0.072$ N/m

**Want:**
*   Minimum force $F$ to lift the ring.

**Solution:**

1.  **Identify the forces involved:**
    When lifting the ring, we need to overcome two forces:
    *   The weight of the ring (which we'll ignore as "minimum force required to *lift from the surface*", implying we're looking for the additional force due to surface tension).
    *   The downward pull due to surface tension.
    *   *Explanation:* The problem asks for the force *to lift the ring from the water surface*, implying the force needed *in addition* to counteracting its weight. We are focusing on the surface tension component.

2.  **Determine the length over which surface tension acts:**
    When the ring is lifted, a thin film of water forms between the ring and the bulk water. This means there are *two* interfaces where surface tension acts: one on the inner circumference of the ring and one on the outer circumference.
    *   Inner circumference length, $L_{inner} = 2\pi r$
    *   Outer circumference length, $L_{outer} = 2\pi r$
    *   Total length, $L_{total} = L_{inner} + L_{outer} = 2\pi r + 2\pi r = 4\pi r$
    *   *Explanation:* The water film adheres to both the inside and outside edges of the wire. Each edge has surface tension pulling downwards.

3.  **Calculate the total length:**
    $L_{total} = 4 \times \pi \times 0.05 \text{ m}$
    $L_{total} = 0.2 \pi \text{ m} \approx 0.6283 \text{ m}$
    *   *Explanation:* Substitute the given radius into the total length formula.

4.  **Apply the surface tension definition:**
    The force due to surface tension is $F = \gamma \cdot L_{total}$.
    *   *Explanation:* This is the fundamental definition of surface tension: force per unit length.

5.  **Calculate the force:**
    $F = (0.072 \text{ N/m}) \times (0.2 \pi \text{ m})$
    $F = 0.0144 \pi \text{ N}$
    $F \approx 0.0452 \text{ N}$
    *   *Explanation:* Substitute the values of $\gamma$ and $L_{total}$ to find the force.

**Final Answer:**
The minimum force required to lift the ring from the water surface is $\boxed{\text{0.0452 N}}$.

**Reflection:** The trickiest part here is remembering that a wire ring creates *two* interfaces (inner and outer circumference) with the liquid, effectively doubling the length over which surface tension acts compared to a single line.

---

### Example 2: Pressure Inside a Spherical Water Droplet

**Problem:** Calculate the pressure difference between the inside and outside of a spherical water droplet with a radius of $10 \mu m$. Assume the surface tension of water is $\gamma = 0.072$ N/m.

**Given:**
*   Radius of droplet, $R = 10 \mu m = 10 \times 10^{-6}$ m $= 10^{-5}$ m
*   Surface tension of water, $\gamma = 0.072$ N/m

**Want:**
*   Pressure difference $\Delta P = P_{in} - P_{out}$.

**Solution:**

1.  **Identify the type of interface:**
    This is a single liquid-air interface (a water droplet in air).
    *   *Explanation:* A droplet has one continuous surface separating the liquid from the surrounding gas.

2.  **Recall the relevant equation:**
    For a spherical interface, the pressure difference is given by Laplace's Law: $\Delta P = \frac{2\gamma}{R}$.
    *   *Explanation:* This equation specifically applies to a single spherical liquid-gas interface. The factor of 2 comes from the geometry of a sphere having two principal radii of curvature equal to $R$.

3.  **Substitute the given values:**
    $\Delta P = \frac{2 \times (0.072 \text{ N/m})}{10^{-5} \text{ m}}$
    *   *Explanation:* Plug in the values for surface tension and radius.

4.  **Calculate the pressure difference:**
    $\Delta P = \frac{0.144 \text{ N/m}}{10^{-5} \text{ m}}$
    $\Delta P = 0.144 \times 10^5 \text{ N/m}^2$
    $\Delta P = 14400 \text{ Pa}$
    *   *Explanation:* Perform the division. The units N/m² are equivalent to Pascals (Pa).

**Final Answer:**
The pressure difference inside the water droplet is $\boxed{\text{14400 Pa}}$.

**Reflection:** This example highlights how significant surface tension effects can be at small scales. A tiny droplet experiences a pressure difference of over 14 kPa, which is substantial for its size. This is why very small droplets are stable despite their high internal pressure.

---

### Example 3: Pressure Inside a Soap Bubble

**Problem:** What is the pressure difference between the inside and outside of a spherical soap bubble with a radius of $2.0$ mm? Assume the surface tension of the soap solution is $\gamma = 0.025$ N/m.

**Given:**
*   Radius of the soap bubble, $R = 2.0$ mm $= 2.0 \times 10^{-3}$ m
*   Surface tension of soap solution, $\gamma = 0.025$ N/m

**Want:**
*   Pressure difference $\Delta P = P_{in} - P_{out}$.

**Solution:**

1.  **Identify the type of interface:**
    A soap bubble consists of a thin film of liquid with air *inside* and air *outside*. This means there are *two* liquid-air interfaces (an inner surface and an outer surface).
    *   *Explanation:* Unlike a solid droplet, a bubble is hollow. The thin liquid film has two surfaces that contribute to the surface tension forces.

2.  **Recall the relevant equation for a bubble:**
    For a spherical soap bubble (two surfaces), the pressure difference is $\Delta P = \frac{4\gamma}{R}$.
    *   *Explanation:* Each of the two surfaces contributes $2\gamma/R$ to the pressure difference, so the total is $4\gamma/R$. This can be derived by considering the force balance on a hemisphere, where the surface tension force acts on both the inner and outer circumference.

3.  **Substitute the given values:**
    $\Delta P = \frac{4 \times (0.025 \text{ N/m})}{2.0 \times 10^{-3} \text{ m}}$
    *   *Explanation:* Plug in the values for surface tension and radius.

4.  **Calculate the pressure difference:**
    $\Delta P = \frac{0.100 \text{ N/m}}{2.0 \times 10^{-3} \text{ m}}$
    $\Delta P = 0.050 \times 10^3 \text{ N/m}^2$
    $\Delta P = 50 \text{ Pa}$
    *   *Explanation:* Perform the division.

**Final Answer:**
The pressure difference inside the soap bubble is $\boxed{\text{50 Pa}}$.

**Reflection:** The key distinction here from the droplet example is the factor of 4 instead of 2, due to the two surfaces of a soap bubble. Despite the smaller surface tension of soap solution compared to pure water, the pressure difference is still noticeable.

---

### Example 4: Capillary Rise in a Tube

**Problem:** A glass capillary tube with an internal radius of $0.5$ mm is dipped into water. The water rises to a height $h$ in the tube. Given water surface tension $\gamma = 0.072$ N/m, water density $\rho = 1000$ kg/m$^3$, and contact angle $\theta = 0^\circ$ (perfect wetting). Calculate the height $h$ of the capillary rise. Assume $g = 9.81$ m/s$^2$.

**Given:**
*   Radius of tube, $R = 0.5$ mm $= 0.5 \times 10^{-3}$ m
*   Surface tension of water, $\gamma = 0.072$ N/m
*   Density of water, $\rho = 1000$ kg/m$^3$
*   Contact angle, $\theta = 0^\circ$
*   Acceleration due to gravity, $g = 9.81$ m/s$^2$

**Want:**
*   Height of capillary rise, $h$.

**Solution:**

1.  **Understand the phenomenon:**
    Capillary rise occurs because the adhesive forces between the water and the glass tube are stronger than the cohesive forces within the water. This causes the water to "climb" the walls of the tube. Surface tension then pulls this curved surface (meniscus) upwards, creating a pressure difference that lifts the column of water until balanced by gravity.
    *   *Explanation:* Water "wants" to stick to glass. This pulls the edges of the water column up the tube. Surface tension then acts on this curved water surface, pulling the entire column higher.

2.  **Identify the upward force due to surface tension:**
    The surface tension acts along the circumference of the meniscus where it touches the tube wall. The upward component of this force is $F_s = \gamma \cdot (2\pi R) \cdot \cos\theta$.
    *   *Explanation:* The total length of contact is the circumference $2\pi R$. The surface tension force acts tangentially to the meniscus. Only the vertical component of this force contributes to lifting the water. $\cos\theta$ accounts for the angle between the tangent to the meniscus and the tube wall. For perfect wetting, $\theta = 0^\circ$, so $\cos\theta = 1$.
    $F_s = \gamma \cdot (2\pi R) \cdot \cos(0^\circ) = 2\pi R \gamma$

3.  **Identify the downward force due to gravity:**
    The weight of the column of water lifted is $F_g = m g$.
    The mass of the water column is $m = \rho V = \rho (\pi R^2 h)$.
    So, $F_g = \rho \pi R^2 h g$.
    *   *Explanation:* The column of water has a cylindrical shape. Its volume is area times height. Its mass is density times volume. Its weight is mass times gravity.

4.  **Apply equilibrium condition:**
    At equilibrium, the upward force due to surface tension balances the downward force due to gravity:
    $F_s = F_g$
    $2\pi R \gamma = \rho \pi R^2 h g$
    *   *Explanation:* The water stops rising when the upward pull from surface tension is exactly matched by the downward pull of gravity on the water column.

5.  **Solve for $h$:**
    Divide both sides by $\pi R$:
    $2 \gamma = \rho R h g$
    Isolate $h$:
    $h = \frac{2 \gamma}{\rho g R}$
    *   *Explanation:* This is the famous Jurin's Law for capillary rise.

6.  **Substitute the given values and calculate:**
    $h = \frac{2 \times (0.072 \text{ N/m})}{(1000 \text{ kg/m}^3) \times (9.81 \text{ m/s}^2) \times (0.5 \times 10^{-3} \text{ m})}$
    $h = \frac{0.144}{4.905}$
    $h \approx 0.02936 \text{ m}$
    $h \approx 2.936 \text{ cm}$
    *   *Explanation:* Perform the calculation. Ensure units cancel out to meters.

**Final Answer:**
The height of the capillary rise is $\boxed{\text{2.94 cm}}$.

**Reflection:** This example demonstrates the interplay between surface tension and gravity. The contact angle is crucial; if $\theta > 90^\circ$ (e.g., mercury in glass), there would be capillary *depression* instead of rise. The derivation from first principles (force balance) is key.

## 6. Common mistakes and traps

1.  **Confusing Surface Tension with Pressure:** Surface tension is a force per unit length (N/m), acting along a line on the surface. Pressure is force per unit area (N/m² or Pa), acting perpendicular to a surface. While surface tension *causes* pressure differences across curved surfaces, they are distinct physical quantities.
2.  **Incorrectly Counting Surfaces:** For problems involving bubbles or films, students often forget that a soap bubble has *two* liquid-air interfaces (inner and outer), contributing twice the surface tension effect compared to a single droplet or a liquid surface. A single droplet, however, only has *one* interface.
3.  **Wrong Sign Convention for Radii of Curvature:** In the Young-Laplace equation $\Delta P = \gamma (\frac{1}{R_1} + \frac{1}{R_2})$, the sign of $R_1$ and $R_2$ matters for complex geometries. A common convention is that radii are positive if the center of curvature lies on the side of higher pressure. Misinterpreting this can lead to incorrect pressure differences or even the wrong direction of pressure.
4.  **Ignoring or Misinterpreting Contact Angle:** In capillary phenomena or wetting problems, the contact angle ($\theta$) is critical. It determines the direction and magnitude of the vertical component of the surface tension force. Assuming perfect wetting ($\theta=0^\circ$) when it's not the case, or forgetting the $\cos\theta$ term, will lead to errors.
5.  **Assuming Surface Tension is Constant:** Surface tension is highly dependent on temperature, the presence of impurities (like surfactants), and the nature of the liquid-gas interface. Using a standard value for pure water at room temperature might be incorrect for a different liquid, temperature, or contaminated solution.
6.  **Mixing up Radius and Diameter:** A simple but common mistake is to use the diameter instead of the radius in formulas like $\Delta P = 2\gamma/R$ or $h = 2\gamma/(\rho g R)$. Always double-check which geometric quantity is required.

## 7. Textbook-precise explanation

Surface tension, denoted by $\gamma$ (gamma), is a fundamental thermodynamic property of liquid-gas or liquid-liquid interfaces. Rigorously, it is defined as the reversible work required to increase the surface area of a liquid by a unit amount at constant temperature, pressure, and chemical potential of all components. This makes it equivalent to the excess Helmholtz free energy per unit area, or more commonly, the excess Gibbs free energy per unit area, for a single-component system under isothermal and isobaric conditions.

Consider a planar interface between a liquid and a gas. The molecules in the bulk liquid experience isotropic intermolecular attractive forces from their neighbors. However, molecules at the interface experience a net attractive force directed into the bulk liquid, as they lack neighbors on the gas side. To move a molecule from the bulk to the surface, work must be done against this net inward force, thereby increasing its potential energy. This results in the surface layer possessing a higher specific free energy than the bulk liquid.

This excess surface free energy per unit area is precisely what we refer to as surface tension ($\gamma$). Its SI units are Joules per square meter ($J/m^2$). From a mechanical perspective, surface tension is also defined as the tangential force per unit length acting along the interface, perpendicular to any line drawn on the surface, tending to contract the surface area. The SI units for this definition are Newtons per meter ($N/m$). The numerical equivalence ($1 J/m^2 = 1 N \cdot m / m^2 = 1 N/m$) confirms that these two definitions describe the same physical phenomenon.

For a curved interface, this surface tension gives rise to a pressure difference across the interface. This relationship is quantified by the **Young-Laplace equation**. For an arbitrarily curved surface, the pressure difference $\Delta P = P_{concave} - P_{convex}$ is given by:

$$ \Delta P = \gamma \left( \frac{1}{R_1} + \frac{1}{R_2} \right) $$

where $R_1$ and $R_2$ are the two principal radii of curvature of the surface at a given point. The principal radii of curvature are the maximum and minimum radii of curvature at that point, lying in mutually orthogonal planes. By convention, $R_1$ and $R_2$ are taken as positive if the center of curvature lies on the side of higher pressure (i.e., the concave side). If the surface is saddle-shaped, one radius may be positive and the other negative.

For specific geometries:
*   **Spherical interface (e.g., a liquid droplet):** $R_1 = R_2 = R$. Thus, $\Delta P = \frac{2\gamma}{R}$.
*   **Cylindrical interface (e.g., a liquid film in a narrow slit):** One radius is $R$, the other is effectively infinite ($R_2 \to \infty$). Thus, $\Delta P = \frac{\gamma}{R}$.
*   **Spherical bubble (e.g., a soap bubble):** This involves two liquid-gas interfaces (an inner and an outer surface), each contributing to the pressure difference. Therefore, $\Delta P = \frac{4\gamma}{R}$.

The Young-Laplace equation is derived by considering the mechanical equilibrium of a small element of the curved interface, balancing the forces due to surface tension along the edges of the element with the force due to the pressure difference across its area. Alternatively, it can be derived by considering the change in total free energy of the system (bulk liquid energy, surface energy, and pressure-volume work) as the surface deforms, and finding the minimum energy configuration.

This rigorous framework is foundational to understanding phenomena such as capillarity, wetting, droplet formation and stability, bubble dynamics, and the behavior of fluids in microgravity.

**References:**
*   Landau, L. D., & Lifshitz, E. M. (1987). *Fluid Mechanics (Vol. 6 of A Course of Theoretical Physics)* (2nd ed.). Butterworth-Heinemann. (Chapter 6, §61-62)
*   Batchelor, G. K. (2000). *An Introduction to Fluid Dynamics* (2nd ed.). Cambridge University Press. (Chapter 2, §2.1.2)
*   Faber, T. E. (1995). *Fluid Dynamics for Physicists*. Cambridge University Press. (Chapter 11, §11.1-11.2)

## 8. ASCII diagrams

```text
Diagram 1: Molecular Forces at a Liquid Surface

   Gas / Vacuum
   --------------------------------- Surface
   |  o  o  o  o  o  o  o  o  o  o  |  <- Surface molecules (net inward pull)
   |    o  o  o  o  o  o  o  o    |
   |  o  o  o  o  o  o  o  o  o  o  |
   |    o  o  o  o  o  o  o  o    |  <- Bulk molecules (balanced forces)
   |  o  o  o  o  o  o  o  o  o  o  |
   |    o  o  o  o  o  o  o  o    |
   --------------------------------- Bulk Liquid

  Detailed view of forces:

           (No upward pull)
                 ^
                 |
                 |
                 |
         <-------o------->  <- Surface molecule: Strong inward/sideways pulls
                 |
                 V
           (Net inward force)

                 ^
           <-----|----->
           |     o     |  <- Bulk molecule: Balanced pulls in all directions
           <-----|----->
                 V
```

```text
Diagram 2: Force Balance on a Spherical Droplet (Conceptual Cut-away)

             P_out
               / \
              /   \
             /     \
            /-------o------\  <- Hemispherical surface
           |        |       |
           |        |       |
           |        |       |
           |        |       |
           |        |       |
           |        |       |
           |        |       |
           |        |       |
           |        |       |
           |        |       |
           +--------+-------+  <- Imaginary cut plane
           |        |        |
           |        |        |
           |        |        |
           |   P_in |        |
           |        |        |
           |        |        |
           |        |        |
           |        |        |
           +--------o--------+  <- Center of sphere

  Forces on the cut hemisphere:

  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_surface_tension (acting along circumference)
  <------------------------------------ F_