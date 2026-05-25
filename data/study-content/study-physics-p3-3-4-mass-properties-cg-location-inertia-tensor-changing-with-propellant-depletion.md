## 1. What it is — in plain English

Imagine you're trying to balance a broomstick on your finger. There's one special spot where it balances perfectly, right? That spot is called the **Center of Gravity (CG)**. It's like the average location of all the mass in an object. If you could hang the entire rocket from a single string at its CG, it would hang perfectly level.

Now, imagine you try to spin that broomstick. It's much easier to spin it around its middle (like a baton) than to spin it end-over-end. This "resistance to spinning" is called **inertia**. But here's the trick: this resistance isn't just one number; it depends on *which way* you're trying to spin it. The **inertia tensor** is a fancy mathematical way to describe this spinning resistance in all possible directions.

A rocket, of course, isn't just a broomstick. It's full of propellant (fuel and oxidizer). As the rocket flies, it burns this propellant, which means the propellant is used up and ejected. This process is called **propellant depletion**.

When the propellant depletes, two big things happen: First, the rocket gets lighter, and its balance point (the **CG**) shifts because the heavy fuel is no longer there. Second, its resistance to spinning (its **inertia tensor**) also changes because the mass distribution has fundamentally altered. These changes are crucial for controlling the rocket during flight.

## 2. Why it matters — real-world applications

Understanding and precisely tracking the CG location and inertia tensor changes during propellant depletion is absolutely critical for safe and effective rocket flight. Here are a few real-world applications:

1.  **Rocket Stability and Control (SpaceX Falcon 9, ULA Atlas V):** For a rocket to fly straight and not tumble out of control, its CG must stay within certain bounds relative to its thrust vector and aerodynamic forces. As propellant depletes, the CG shifts. Rocket engineers at companies like SpaceX and ULA use sophisticated models to predict this shift and design their **Thrust Vector Control (TVC)** systems (the gimbaling nozzles) to precisely counteract any instability. If the CG moves too far forward or aft, the rocket can become unstable or uncontrollable, leading to mission failure.

2.  **Attitude Control Systems (ACS) for Satellites and Spacecraft:** Once a satellite is in orbit, it needs to maintain a specific orientation (attitude) for communication, imaging, or scientific experiments. Its ACS (using reaction wheels, thrusters, or magnetic torquers) needs precise knowledge of the satellite's inertia tensor. If a satellite uses propellant for maneuvers, its mass properties change, and the ACS must update its control algorithms in real-time to maintain accurate pointing. For example, the **James Webb Space Telescope** relies on incredibly precise attitude control, which is heavily influenced by its mass properties.

3.  **Aircraft Design and Fuel Management (Boeing 787, Airbus A350):** While not rockets, large commercial aircraft also consume significant amounts of fuel. As fuel tanks empty, the aircraft's overall CG shifts. This change affects the aircraft's trim (the elevator setting needed for level flight) and stability. Modern airliners have sophisticated **Fuel Management Systems** that can actively pump fuel between tanks to keep the CG within optimal limits, reducing drag and improving handling qualities throughout a flight. An uncontrolled CG shift could lead to dangerous pitch instabilities.

4.  **Re-entry Vehicles and Tumble Dynamics (Apollo Command Module, Space Shuttle Orbiter):** When a spacecraft re-enters Earth's atmosphere, it experiences extreme aerodynamic forces. Its stability during re-entry, and whether it tumbles or maintains a controlled orientation, is heavily dependent on its mass properties. Engineers must ensure the CG is positioned correctly to provide aerodynamic stability throughout the re-entry trajectory, often using ballast or carefully designed geometry. For example, the Apollo Command Module was designed to re-enter blunt-end first, and its mass properties were critical for maintaining this stable orientation.

## 3. Prerequisites — what you must know first

Before diving deep into this topic, ensure you have a solid grasp of the following fundamental concepts:

*   **Vectors:** Quantities with both magnitude and direction (e.g., position, force, velocity).
*   **Newton's Laws of Motion:** Especially the second law ($F=ma$) and its rotational equivalent ($\tau = I\alpha$).
*   **Calculus (Integration):** For summing up infinitesimal quantities over continuous distributions (e.g., finding the total mass or moment of a continuous body).
*   **Linear Algebra (Matrices):** For representing and manipulating multi-dimensional quantities like the inertia tensor.
*   **Moments and Torques:** The rotational equivalent of force; a force applied at a distance from a pivot point.
*   **Center of Mass (CM) / Center of Gravity (CG):** The average position of all the mass in an object; the point where an object balances.
*   **Moment of Inertia (Scalar):** A measure of an object's resistance to angular acceleration about a *specific* axis of rotation.

## 4. The core idea — step by step

Let's break down the concepts of CG location and the inertia tensor, and how they change with propellant depletion.

### Step 1: Center of Mass (CM) vs. Center of Gravity (CG)

*   **Plain English:** The Center of Mass (CM) is the average location of all the mass in an object, purely based on its geometry and mass distribution. The Center of Gravity (CG) is the point where the *total gravitational force* appears to act. For most rocket science applications near a planet's surface or in orbit, where the gravitational field is uniform across the rocket, CM and CG are practically the same point. We'll use "CG" as it's more common in aerospace, but remember the underlying concept is CM.

*   **Small Concrete Example:** Imagine a perfectly uniform wooden stick. Its CM/CG is exactly at its geometric center. Now, glue a heavy metal ball to one end. The CM/CG will shift towards the end with the metal ball, making it harder to balance in the middle.

*   **Formal/Mathematical Version:**
    For a system of $N$ discrete point masses, $m_i$, located at positions $\vec{r}_i$:
    $$ \vec{R}_{CG} = \frac{\sum_{i=1}^N m_i \vec{r}_i}{\sum_{i=1}^N m_i} $$
    For a continuous mass distribution, with mass density $\rho(\vec{r})$ and infinitesimal mass $dm = \rho(\vec{r}) dV$:
    $$ \vec{R}_{CG} = \frac{\int \vec{r} \, dm}{\int dm} = \frac{\int \vec{r} \rho(\vec{r}) \, dV}{\int \rho(\vec{r}) \, dV} $$
    Here, $\vec{R}_{CG}$ is the position vector of the center of gravity, and the denominator is the total mass $M_{total}$.

*   **What could go wrong:** Confusing CM and CG. While often interchangeable in uniform gravity, CM is a fundamental property of the object itself, independent of gravity, whereas CG depends on the gravitational field. For a very large object in a non-uniform gravitational field (like a space station orbiting a planet), the CG might not perfectly coincide with the CM. For rockets, this distinction is usually negligible.

### Step 2: Calculating CG for a Multi-Component System (Like a Rocket)

*   **Plain English:** A rocket is made of many parts: a nose cone, payload, fuel tanks, engines, etc. To find the rocket's overall CG, we treat each part as a separate mass with its own CG. Then, we find the weighted average of all these individual CGs.

*   **Small Concrete Example:** Consider a simple two-stage rocket. Stage 1 has mass $m_1$ and its CG is at $x_1$. Stage 2 (payload) has mass $m_2$ and its CG is at $x_2$. The overall rocket's CG will be closer to the heavier stage. If $m_1 = 1000 \text{ kg}$ at $x_1 = 5 \text{ m}$ and $m_2 = 200 \text{ kg}$ at $x_2 = 12 \text{ m}$ (from the bottom), then:
    $X_{CG} = \frac{(1000 \text{ kg})(5 \text{ m}) + (200 \text{ kg})(12 \text{ m})}{1000 \text{ kg} + 200 \text{ kg}} = \frac{5000 + 2400}{1200} = \frac{7400}{1200} \approx 6.17 \text{ m}$.

*   **Formal/Mathematical Version:**
    For a system composed of $N$ rigid bodies, where each body $i$ has mass $m_i$ and its own center of gravity located at $\vec{r}_{CG,i}$:
    $$ \vec{R}_{CG,system} = \frac{\sum_{i=1}^N m_i \vec{r}_{CG,i}}{\sum_{i=1}^N m_i} $$
    This formula is a direct application of the discrete mass summation from Step 1, where each $m_i$ is now the mass of a component, and $\vec{r}_{CG,i}$ is the position of that component's CG.

*   **What could go wrong:** Incorrectly defining the reference frame (origin and axes) for all component CGs. All $\vec{r}_{CG,i}$ must be measured from the *same* origin. Also, forgetting to include *all* components, even small ones, in the summation.

### Step 3: Introduction to the Inertia Tensor

*   **Plain English:** The inertia tensor is a 3x3 matrix that describes an object's resistance to rotational motion around *any* axis passing through a chosen reference point. Unlike the scalar moment of inertia, which is only valid for a specific axis, the inertia tensor captures how this resistance changes depending on the orientation of the rotation axis. It also accounts for "cross-coupling" effects, where rotation about one axis can induce torques about another.

*   **Small Concrete Example:** Imagine a perfectly symmetrical sphere. Its resistance to spinning is the same no matter which axis you choose through its center. Its inertia tensor (relative to its center) would have only diagonal terms, and they would all be equal. Now, imagine a thin, flat book. It's easy to spin it around an axis perpendicular to its covers (like a frisbee). It's harder to spin it around an axis along its spine. And it's even harder to spin it end-over-end. The inertia tensor captures these different resistances. If you try to spin it along a diagonal axis, you might feel it "wobble" or try to rotate about other axes – this is due to off-diagonal terms.

*   **Formal/Mathematical Version:**
    The inertia tensor $\mathbf{I}$ (often denoted by $\mathbb{I}$ or $I$) is a symmetric 3x3 matrix, defined relative to a chosen origin and coordinate system $(x, y, z)$. Its elements are:
    $$ \mathbf{I} = \begin{pmatrix} I_{xx} & I_{xy} & I_{xz} \\ I_{yx} & I_{yy} & I_{yz} \\ I_{zx} & I_{zy} & I_{zz} \end{pmatrix} $$
    The diagonal elements are the **moments of inertia**:
    $$ I_{xx} = \int (y^2 + z^2) \, dm $$
    $$ I_{yy} = \int (x^2 + z^2) \, dm $$
    $$ I_{zz} = \int (x^2 + y^2) \, dm $$
    These represent the resistance to rotation about the x, y, and z axes, respectively.
    The off-diagonal elements are the **products of inertia**:
    $$ I_{xy} = I_{yx} = - \int xy \, dm $$
    $$ I_{xz} = I_{zx} = - \int xz \, dm $$
    $$ I_{yz} = I_{zy} = - \int yz \, dm $$
    (Note: Some texts define products of inertia with a positive sign, $I_{xy} = \int xy \, dm$. Be consistent with your chosen convention. The negative sign is standard in dynamics texts for the inertia tensor elements). These terms describe the "cross-coupling" of inertia; if they are non-zero, it means that if you try to rotate the object about one axis, it will naturally want to rotate about another.

*   **What could go wrong:** Thinking of moment of inertia as a scalar quantity for a 3D object. While a scalar moment of inertia is useful for rotation about a *fixed, principal axis*, for arbitrary rotation, the full tensor is required. Also, forgetting the negative sign in the products of inertia (or being inconsistent with the chosen sign convention).

### Step 4: Parallel Axis Theorem (for Inertia Tensor)

*   **Plain English:** Often, we know the inertia tensor of an object about its own CG (which is usually the simplest reference point due to symmetry). The parallel axis theorem allows us to easily calculate the inertia tensor about *any other parallel axis* (or point) if we know the object's total mass and the distance between the two reference points.

*   **Small Concrete Example:** You know the moment of inertia of a uniform rod about its center (which is $ML^2/12$). If you want to find its moment of inertia about one end (an axis parallel to the one through its center), you can use the parallel axis theorem: $I_{end} = I_{center} + Md^2 = ML^2/12 + M(L/2)^2 = ML^2/12 + ML^2/4 = ML^2/12 + 3ML^2/12 = 4ML^2/12 = ML^2/3$.

*   **Formal/Mathematical Version:**
    If $\mathbf{I}_{CG}$ is the inertia tensor of a body about its center of gravity, and $M$ is its total mass, then the inertia tensor $\mathbf{I}_O$ about a parallel reference frame whose origin $O$ is displaced by a vector $\vec{d} = (d_x, d_y, d_z)$ from the CG is given by:
    $$ \mathbf{I}_O = \mathbf{I}_{CG} + M \left( (\vec{d} \cdot \vec{d}) \mathbf{U} - \vec{d} \otimes \vec{d} \right) $$
    where $\mathbf{U}$ is the identity matrix, and $\vec{d} \otimes \vec{d}$ is the outer product of $\vec{d}$ with itself, which is a matrix:
    $$ \vec{d} \otimes \vec{d} = \begin{pmatrix} d_x d_x & d_x d_y & d_x d_z \\ d_y d_x & d_y d_y & d_y d_z \\ d_z d_x & d_z d_y & d_z d_z \end{pmatrix} $$
    Expanding this, the elements are:
    $$ (I_O)_{ij} = (I_{CG})_{ij} + M (|\vec{d}|^2 \delta_{ij} - d_i d_j) $$
    where $\delta_{ij}$ is the Kronecker delta ($\delta_{ij}=1$ if $i=j$, and $0$ if $i \neq j$).
    For example, for the diagonal terms:
    $$ I_{xx,O} = I_{xx,CG} + M (d_y^2 + d_z^2) $$
    $$ I_{yy,O} = I_{yy,CG} + M (d_x^2 + d_z^2) $$
    $$ I_{zz,O} = I_{zz,CG} + M (d_x^2 + d_y^2) $$
    And for the off-diagonal terms:
    $$ I_{xy,O} = I_{xy,CG} - M d_x d_y $$
    $$ I_{xz,O} = I_{xz,CG} - M d_x d_z $$
    $$ I_{yz,O} = I_{yz,CG} - M d_y d_z $$

*   **What could go wrong:** Forgetting the cross terms ($d_i d_j$) in the tensor form of the parallel axis theorem, or miscalculating $|\vec{d}|^2$. It's not just $Md^2$ for each term; the full matrix form is crucial.

### Step 5: How Propellant Depletion Affects CG

*   **Plain English:** As a rocket burns fuel, the mass of the propellant decreases. Since the propellant usually makes up a large portion of the rocket's total mass and is often located in specific tanks, its removal significantly shifts the overall balance point (CG) of the rocket. The CG generally moves towards the *unspent* mass.

*   **Small Concrete Example:** Imagine a tall bottle full of water. Its CG is roughly in the middle. As you drink the water, the bottle gets lighter, and its CG moves *down* towards the remaining water and the bottom of the bottle. Once empty, the CG is just the CG of the empty bottle. For a rocket, if the fuel is mostly in the lower tanks, as it burns, the CG will shift *upward* relative to the rocket's structure, towards the payload. If fuel is in the upper tanks, the CG shifts *downward*.

*   **Formal/Mathematical Version:**
    We treat the rocket as a system of components, where one component is the propellant.
    Let $M_{inert}$ be the mass of the rocket structure (payload, tanks, engines, etc., which is constant). Let $\vec{R}_{CG,inert}$ be the CG of this inert structure.
    Let $m_{propellant}(t)$ be the mass of the remaining propellant at time $t$, and $\vec{R}_{CG,propellant}(t)$ be the CG of *that remaining propellant*.
    The total mass of the rocket at time $t$ is $M_{total}(t) = M_{inert} + m_{propellant}(t)$.
    The overall CG of the rocket at time $t$ is:
    $$ \vec{R}_{CG,rocket}(t) = \frac{M_{inert} \vec{R}_{CG,inert} + m_{propellant}(t) \vec{R}_{CG,propellant}(t)}{M_{inert} + m_{propellant}(t)} $$
    As $m_{propellant}(t)$ decreases, and $\vec{R}_{CG,propellant}(t)$ potentially changes (e.g., if fuel is consumed from the top or bottom of a tank, the CG of the *remaining* fuel shifts), $\vec{R}_{CG,rocket}(t)$ will continuously change.

*   **What could go wrong:** Forgetting that the CG of the *remaining* propellant might also shift during consumption. For example, if a cylindrical tank empties from the bottom, the CG of the remaining fuel moves upwards within the tank. A common simplification is to assume the fuel's CG remains fixed at the tank's center, which is only accurate if the tank depletes uniformly or if the fuel is treated as a single point mass.

### Step 6: How Propellant Depletion Affects Inertia Tensor

*   **Plain English:** Similar to the CG, the inertia tensor also changes dramatically as propellant is consumed. Since the propellant is often a significant portion of the rocket's total mass and is distributed away from the center, its removal reduces the overall "spinning resistance." A lighter rocket with less mass far from its center will be easier to rotate.

*   **Small Concrete Example:** Imagine a figure skater spinning. When they pull their arms in, their moment of inertia decreases, and they spin faster. Similarly, as a rocket burns fuel, it's like pulling mass closer to the center (or removing it entirely), making it easier to rotate. A full rocket is "sluggish" to turn, while an almost empty rocket is much more agile.

*   **Formal/Mathematical Version:**
    We can use the principle of superposition. The inertia tensor of the full rocket is the sum of the inertia tensor of the inert structure and the inertia tensor of the propellant.
    $$ \mathbf{I}_{rocket}(t) = \mathbf{I}_{inert} + \mathbf{I}_{propellant}(t) $$
    where $\mathbf{I}_{inert}$ is the inertia tensor of the inert rocket structure (constant), and $\mathbf{I}_{propellant}(t)$ is the inertia tensor of the *remaining* propellant at time $t$. Both tensors must be calculated relative to the *same* reference point (e.g., the rocket's current overall CG, or a fixed point on the rocket structure).
    Since the overall CG of the rocket is continuously shifting (from Step 5), it's often easiest to calculate the inertia tensor of each component (inert structure and propellant) about its *own* CG, and then use the parallel axis theorem (Step 4) to shift them to a common reference point (e.g., the current overall rocket CG) before summing.

    Let $\mathbf{I}_{inert,CG\_inert}$ be the inertia tensor of the inert structure about its own CG.
    Let $\mathbf{I}_{propellant,CG\_propellant}(t)$ be the inertia tensor of the remaining propellant about its own CG.

    To find $\mathbf{I}_{rocket}(t)$ about the *current overall rocket CG*, we'd do:
    1.  Calculate $\vec{R}_{CG,rocket}(t)$ (from Step 5).
    2.  Calculate $\mathbf{I}_{inert}$ about $\vec{R}_{CG,rocket}(t)$ using the parallel axis theorem:
        $\mathbf{I}_{inert, @CG\_rocket}(t) = \mathbf{I}_{inert,CG\_inert} + M_{inert} (|\vec{d}_{inert}|^2 \mathbf{U} - \vec{d}_{inert} \otimes \vec{d}_{inert})$, where $\vec{d}_{inert} = \vec{R}_{CG,rocket}(t) - \vec{R}_{CG,inert}$.
    3.  Calculate $\mathbf{I}_{propellant}(t)$ about $\vec{R}_{CG,rocket}(t)$ using the parallel axis theorem:
        $\mathbf{I}_{propellant, @CG\_rocket}(t) = \mathbf{I}_{propellant,CG\_propellant}(t) + m_{propellant}(t) (|\vec{d}_{propellant}|^2 \mathbf{U} - \vec{d}_{propellant} \otimes \vec{d}_{propellant})$, where $\vec{d}_{propellant} = \vec{R}_{CG,rocket}(t) - \vec{R}_{CG,propellant}(t)$.
    4.  Sum these: $\mathbf{I}_{rocket, @CG\_rocket}(t) = \mathbf{I}_{inert, @CG\_rocket}(t) + \mathbf{I}_{propellant, @CG\_rocket}(t)$.

*   **What could go wrong:** Forgetting to apply the parallel axis theorem when summing inertia tensors calculated about different reference points. The inertia tensor is origin-dependent, so all components must be referred to a common origin before summation. Also, incorrectly modeling the inertia tensor of the *remaining* propellant as it depletes (e.g., assuming a full tank's inertia for a half-full tank).

## 5. Worked examples — multiple, with every step shown

Let's work through some examples to solidify these concepts. We'll assume a 1D (along the rocket's longitudinal axis, usually Z) calculation for CG for simplicity in the first examples, and then introduce 3D and inertia tensor calculations.

### Example 1: CG of a 2-segment rocket (payload + engine)

**Problem Statement:**
A simplified rocket consists of two main components: a payload section and an engine section. The payload section has a mass $m_P = 1500 \text{ kg}$ and its center of gravity is located at $Z_P = 10 \text{ m}$ from the bottom reference point of the rocket. The engine section has a mass $m_E = 3000 \text{ kg}$ and its center of gravity is located at $Z_E = 2 \text{ m}$ from the same bottom reference point. Calculate the overall center of gravity ($Z_{CG}$) of the rocket.

**Given:**
*   Payload mass, $m_P = 1500 \text{ kg}$
*   Payload CG position, $Z_P = 10 \text{ m}$
*   Engine mass, $m_E = 3000 \text{ kg}$
*   Engine CG position, $Z_E = 2 \text{ m}$

**Want:** Overall rocket CG position, $Z_{CG}$.

**Solution:**

1.  **Identify the formula for CG of a multi-component system:**
    For a 1D system along the Z-axis, the formula is:
    $$ Z_{CG} = \frac{\sum m_i Z_i}{\sum m_i} $$
    This formula calculates the weighted average of the individual component CGs, where the weights are their masses.

2.  **Substitute the given values into the formula:**
    We have two components: payload (P) and engine (E).
    $$ Z_{CG} = \frac{m_P Z_P + m_E Z_E}{m_P + m_E} $$
    Here, we are explicitly listing each component's mass and its corresponding Z-coordinate for its CG.

3.  **Perform the multiplication for the numerator:**
    $$ m_P Z_P = (1500 \text{ kg})(10 \text{ m}) = 15000 \text{ kg} \cdot \text{m} $$
    $$ m_E Z_E = (3000 \text{ kg})(2 \text{ m}) = 6000 \text{ kg} \cdot \text{m} $$
    These are the "moments" of each mass about the reference point.

4.  **Sum the terms in the numerator:**
    $$ \sum m_i Z_i = 15000 \text{ kg} \cdot \text{m} + 6000 \text{ kg} \cdot \text{m} = 21000 \text{ kg} \cdot \text{m} $$
    This is the total moment of the rocket's mass about the reference point.

5.  **Calculate the total mass (denominator):**
    $$ \sum m_i = m_P + m_E = 1500 \text{ kg} + 3000 \text{ kg} = 4500 \text{ kg} $$
    This is simply the sum of all individual component masses.

6.  **Divide the total moment by the total mass to find $Z_{CG}$:**
    $$ Z_{CG} = \frac{21000 \text{ kg} \cdot \text{m}}{4500 \text{ kg}} $$
    $$ Z_{CG} = 4.666... \text{ m} $$
    The units cancel out to meters, which is appropriate for a position.

7.  **Round to a reasonable number of significant figures and state the final answer:**
    $$ \boxed{Z_{CG} \approx 4.67 \text{ m}} $$
    The CG is closer to the heavier engine section, as expected.

**Reflection:** This example was straightforward because it involved discrete, known masses and CGs along a single axis. The trickiest part is ensuring consistent units and a clear understanding of the reference point.

---

### Example 2: CG of a rocket with a cylindrical fuel tank, half-full

**Problem Statement:**
A rocket has an inert mass $M_{inert} = 5000 \text{ kg}$ with its CG at $Z_{inert} = 8 \text{ m}$ from the nozzle (bottom reference). It contains a cylindrical fuel tank with a total capacity of $M_{fuel,total} = 10000 \text{ kg}$. The tank itself is $10 \text{ m}$ long, extending from $Z=1 \text{ m}$ to $Z=11 \text{ m}$. Assume the fuel has uniform density and fills the tank from the bottom upwards. Calculate the rocket's overall CG when the tank is exactly half-full by mass.

**Given:**
*   Inert mass, $M_{inert} = 5000 \text{ kg}$
*   Inert CG position, $Z_{inert} = 8 \text{ m}$
*   Total fuel capacity, $M_{fuel,total} = 10000 \text{ kg}$
*   Fuel tank length, $L_{tank} = 10 \text{ m}$
*   Fuel tank bottom position, $Z_{tank,bottom} = 1 \text{ m}$
*   Fuel tank top position, $Z_{tank,top} = 11 \text{ m}$
*   Fuel tank is half-full by mass.

**Want:** Overall rocket CG position, $Z_{CG,rocket}$.

**Solution:**

1.  **Determine the mass of the remaining propellant:**
    Since the tank is half-full by mass:
    $$ m_{propellant} = \frac{1}{2} M_{fuel,total} = \frac{1}{2} (10000 \text{ kg}) = 5000 \text{ kg} $$
    This is the mass of the fuel that is still in the tank.

2.  **Determine the height of the remaining propellant:**
    Assuming uniform density, half the mass means half the volume, which for a cylinder means half the height.
    $$ h_{propellant} = \frac{1}{2} L_{tank} = \frac{1}{2} (10 \text{ m}) = 5 \text{ m} $$
    This is the height of the fuel column.

3.  **Determine the CG of the remaining propellant:**
    Since the fuel fills from the bottom, the remaining $5 \text{ m}$ of fuel extends from $Z_{tank,bottom} = 1 \text{ m}$ to $Z_{tank,bottom} + h_{propellant} = 1 \text{ m} + 5 \text{ m} = 6 \text{ m}$.
    The CG of this uniform column of fuel is at its geometric center:
    $$ Z_{propellant} = Z_{tank,bottom} + \frac{h_{propellant}}{2} = 1 \text{ m} + \frac{5 \text{ m}}{2} = 1 \text{ m} + 2.5 \text{ m} = 3.5 \text{ m} $$
    This is the Z-coordinate of the CG of the remaining fuel.

4.  **Identify the formula for the overall rocket CG:**
    The rocket now consists of two effective components: the inert structure and the remaining propellant.
    $$ Z_{CG,rocket} = \frac{M_{inert} Z_{inert} + m_{propellant} Z_{propellant}}{M_{inert} + m_{propellant}} $$
    This is the same weighted average formula as before, but now applied to the current state of the rocket.

5.  **Substitute the calculated and given values into the formula:**
    $$ Z_{CG,rocket} = \frac{(5000 \text{ kg})(8 \text{ m}) + (5000 \text{ kg})(3.5 \text{ m})}{5000 \text{ kg} + 5000 \text{ kg}} $$

6.  **Perform the multiplications for the numerator:**
    $$ M_{inert} Z_{inert} = (5000 \text{ kg})(8 \text{ m}) = 40000 \text{ kg} \cdot \text{m} $$
    $$ m_{propellant} Z_{propellant} = (5000 \text{ kg})(3.5 \text{ m}) = 17500 \text{ kg} \cdot \text{m} $$

7.  **Sum the terms in the numerator:**
    $$ \sum m_i Z_i = 40000 \text{ kg} \cdot \text{m} + 17500 \text{ kg} \cdot \text{m} = 57500 \text{ kg} \cdot \text{m} $$

8.  **Calculate the total mass (denominator):**
    $$ M_{total} = M_{inert} + m_{propellant} = 5000 \text{ kg} + 5000 \text{ kg} = 10000 \text{ kg} $$

9.  **Divide to find $Z_{CG,rocket}$:**
    $$ Z_{CG,rocket} = \frac{57500 \text{ kg} \cdot \text{m}}{10000 \text{ kg}} $$
    $$ Z_{CG,rocket} = 5.75 \text{ m} $$

10. **State the final answer:**
    $$ \boxed{Z_{CG,rocket} = 5.75 \text{ m}} $$

**Reflection:** This example introduced the concept of propellant depletion affecting the *mass* and *CG location* of the propellant component itself. The key was correctly determining the height and CG of the *remaining* fuel. A common mistake would be to assume the fuel's CG remains at the tank's center, which is only true if the tank is full or empty, or if depletion is modeled differently.

---

### Example 3: Inertia tensor for a simple 3-point mass system

**Problem Statement:**
Consider a simple system of three point masses in the XY-plane:
*   $m_1 = 2 \text{ kg}$ at $(x_1, y_1, z_1) = (1, 0, 0) \text{ m}$
*   $m_2 = 3 \text{ kg}$ at $(x_2, y_2, z_2) = (0, 2, 0) \text{ m}$
*   $m_3 = 1 \text{ kg}$ at $(x_3, y_3, z_3) = (1, 1, 0) \text{ m}$
Calculate the inertia tensor $\mathbf{I}$ about the origin $(0,0,0)$.

**Given:**
*   $m_1 = 2 \text{ kg}$, $\vec{r}_1 = (1, 0, 0) \text{ m}$
*   $m_2 = 3 \text{ kg}$, $\vec{r}_2 = (0, 2, 0) \text{ m}$
*   $m_3 = 1 \text{ kg}$, $\vec{r}_3 = (1, 1, 0) \text{ m}$

**Want:** Inertia tensor $\mathbf{I}$ about the origin.

**Solution:**

1.  **Recall the definition of the inertia tensor for discrete masses:**
    The elements of the inertia tensor are sums over all point masses:
    $$ I_{xx} = \sum m_i (y_i^2 + z_i^2) $$
    $$ I_{yy} = \sum m_i (x_i^2 + z_i^2) $$
    $$ I_{zz} = \sum m_i (x_i^2 + y_i^2) $$
    $$ I_{xy} = I_{yx} = - \sum m_i x_i y_i $$
    $$ I_{xz} = I_{zx} = - \sum m_i x_i z_i $$
    $$ I_{yz} = I_{zy} = - \sum m_i y_i z_i $$
    These formulas sum the contributions of each mass to the respective moment or product of inertia.

2.  **Calculate the diagonal terms ($I_{xx}, I_{yy}, I_{zz}$):**

    *   **$I_{xx}$:**
        $$ I_{xx} = m_1(y_1^2 + z_1^2) + m_2(y_2^2 + z_2^2) + m_3(y_3^2 + z_3^2) $$
        $$ I_{xx} = 2 \text{ kg}(0^2 + 0^2) + 3 \text{ kg}(2^2 + 0^2) + 1 \text{ kg}(1^2 + 0^2) $$
        $$ I_{xx} = 2(0) + 3(4) + 1(1) = 0 + 12 + 1 = 13 \text{ kg} \cdot \text{m}^2 $$
        This represents the resistance to rotation about the x-axis.

    *   **$I_{yy}$:**
        $$ I_{yy} = m_1(x_1^2 + z_1^2) + m_2(x_2^2 + z_2^2) + m_3(x_3^2 + z_3^2) $$
        $$ I_{yy} = 2 \text{ kg}(1^2 + 0^2) + 3 \text{ kg}(0^2 + 0^2) + 1 \text{ kg}(1^2 + 0^2) $$
        $$ I_{yy} = 2(1) + 3(0) + 1(1) = 2 + 0 + 1 = 3 \text{ kg} \cdot \text{m}^2 $$
        This represents the resistance to rotation about the y-axis.

    *   **$I_{zz}$:**
        $$ I_{zz} = m_1(x_1^2 + y_1^2) + m_2(x_2^2 + y_2^2) + m_3(x_3^2 + y_3^2) $$
        $$ I_{zz} = 2 \text{ kg}(1^2 + 0^2) + 3 \text{ kg}(0^2 + 2^2) + 1 \text{ kg}(1^2 + 1^2) $$
        $$ I_{zz} = 2(1) + 3(4) + 1(2) = 2 + 12 + 2 = 16 \text{ kg} \cdot \text{m}^2 $$
        This represents the resistance to rotation about the z-axis.

3.  **Calculate the off-diagonal terms ($I_{xy}, I_{xz}, I_{yz}$):**

    *   **$I_{xy}$:**
        $$ I_{xy} = - (m_1 x_1 y_1 + m_2 x_2 y_2 + m_3 x_3 y_3) $$
        $$ I_{xy} = - (2 \text{ kg}(1)(0) + 3 \text{ kg}(0)(2) + 1 \text{ kg}(1)(1)) $$
        $$ I_{xy} = - (0 + 0 + 1) = -1 \text{ kg} \cdot \text{m}^2 $$
        Also, $I_{yx} = I_{xy} = -1 \text{ kg} \cdot \text{m}^2$.

    *   **$I_{xz}$:**
        $$ I_{xz} = - (m_1 x_1 z_1 + m_2 x_2 z_2 + m_3 x_3 z_3) $$
        $$ I_{xz} = - (2 \text{ kg}(1)(0) + 3 \text{ kg}(0)(0) + 1 \text{ kg}(1)(0)) $$
        $$ I_{xz} = - (0 + 0 + 0) = 0 \text{ kg} \cdot \text{m}^2 $$
        Also, $I_{zx} = I_{xz} = 0 \text{ kg} \cdot \text{m}^2$. (This makes sense as all masses are in the XY-plane, so $z_i=0$ for all).

    *   **$I_{yz}$:**
        $$ I_{yz} = - (m_1 y_1 z_1 + m_2 y_2 z_2 + m_3 y_3 z_3) $$
        $$ I_{yz} = - (2 \text{ kg}(0)(0) + 3 \text{ kg}(2)(0) + 1 \text{ kg}(1)(0)) $$
        $$ I_{yz} = - (0 + 0 + 0) = 0 \text{ kg} \cdot \text{m}^2 $$
        Also, $I_{zy} = I_{yz} = 0 \text{ kg} \cdot \text{m}^2$.

4.  **Assemble the inertia tensor matrix:**
    $$ \mathbf{I} = \begin{pmatrix} I_{xx} & I_{xy} & I_{xz} \\ I_{yx} & I_{yy} & I_{yz} \\ I_{zx} & I_{zy} & I_{zz} \end{pmatrix} $$
    $$ \mathbf{I} = \begin{pmatrix} 13 & -1 & 0 \\ -1 & 3 & 0 \\ 0 & 0 & 16 \end{pmatrix} \text{ kg} \cdot \text{m}^2 $$

**Reflection:** This example demonstrates the direct calculation of the inertia tensor from its definition for discrete masses. The most crucial part is carefully performing the summations and ensuring the correct signs for the products of inertia. The zero values for $I_{xz}$ and $I_{yz}$ are a good sanity check, as all masses lie in the XY-plane ($z_i=0$). A non-zero $I_{xy}$ indicates that the object is not symmetric with respect to the x-z and y-z planes, meaning rotation about the x-axis might induce a torque about the y-axis, and vice versa.

---

### Example 4: Inertia tensor of a rocket with a cylindrical fuel tank, considering depletion

**Problem Statement:**
A simplified rocket consists of two parts:
1.  An inert structure with mass $M_{inert} = 5000 \text{ kg}$. Its CG is at $(0, 0, 8) \text{ m}$ (from the nozzle). Its inertia tensor about its own CG is given as:
    $$ \mathbf{I}_{inert,CG\_inert} = \begin{pmatrix} 10000 & 0 & 0 \\ 0 & 10000 & 0 \\ 0 & 0 & 2000 \end{pmatrix} \text{ kg} \cdot \text{m}^2 $$
    (Assume the rocket is axially symmetric, hence diagonal tensor at its CG).
2.  A cylindrical fuel tank, $10 \text{ m}$ long, $1 \text{ m}$ radius, extending from $Z=1 \text{ m}$ to $Z=11 \text{ m}$. It is full of propellant with total mass $M_{propellant,full} = 10000 \text{ kg}$.
Calculate the overall inertia tensor of the *full* rocket about its overall CG.

**Given:**
*   $M_{inert} = 5000 \text{ kg}$
*   $\vec{R}_{CG,inert} = (0, 0, 8) \text{ m}$
*   $\mathbf{I}_{inert,CG\_inert} = \begin{pmatrix} 10000 & 0 & 0 \\ 0 & 10000 & 0 \\ 0 & 0 & 2000 \end{pmatrix} \text{ kg} \cdot \text{m}^2$
*   Cylindrical fuel tank: $L=10 \text{ m}$, $R=1 \text{ m}$. Extends from $Z=1 \text{ m}$ to $Z=11 \text{ m}$.
*   $M_{propellant,full} = 10000 \text{ kg}$

**Want:** Overall inertia tensor $\mathbf{I}_{rocket,CG\_rocket}$ when the tank is full.

**Solution:**

1.  **Calculate the CG of the full propellant tank:**
    The tank extends from $Z=1 \text{ m}$ to $Z=11 \text{ m}$. Since it's a uniform cylinder, its CG is at its geometric center.
    $$ Z_{propellant} = \frac{1 \text{ m} + 11 \text{ m}}{2} = 6 \text{ m} $$
    So, $\vec{R}_{CG,propellant} = (0, 0, 6) \text{ m}$.

2.  **Calculate the overall CG of the full rocket:**
    Using the formula from Example 2:
    $$ \vec{R}_{CG,rocket} = \frac{M_{inert} \vec{R}_{CG,inert} + M_{propellant,full} \vec{R}_{CG,propellant}}{M_{inert} + M_{propellant,full}} $$
    $$ Z_{CG,rocket} = \frac{(5000 \text{ kg})(8 \text{ m}) + (10000 \text{ kg})(6 \text{ m})}{5000 \text{ kg} + 10000 \text{ kg}} $$
    $$ Z_{CG,rocket} = \frac{40000 + 60000}{15000} = \frac{100000}{15000} = \frac{20}{3} \approx 6.67 \text{ m} $$
    So, $\vec{R}_{CG,rocket} = (0, 0, 20/3) \text{ m}$. This is our common reference point for the final inertia tensor.

3.  **Calculate the inertia tensor of the full propellant cylinder about its own CG:**
    For a solid cylinder of mass $M$, radius $R$, and length $L$, about its center of mass:
    *   About the longitudinal axis (Z-axis in our case):
        $$ I_{zz,CG} = \frac{1}{2} M R^2 $$
    *   About a transverse axis (X or Y) through its center:
        $$ I_{xx,CG} = I_{yy,CG} = \frac{1}{4} M R^2 + \frac{1}{12} M L^2 $$
    These are standard formulas for a solid cylinder.
    Substitute values for propellant: $M = 10000 \text{ kg}$, $R = 1 \text{ m}$, $L = 10 \text{ m}$.
    $$ I_{zz,propellant,CG} = \frac{1}{2} (10000 \text{ kg}) (1 \text{ m})^2 = 5000 \text{ kg} \cdot \text{m}^2 $$
    $$ I_{xx,propellant,CG} = I_{yy,propellant,CG} = \frac{1}{4} (10000 \text{ kg}) (1 \text{ m})^2 + \frac{1}{12} (10000 \text{ kg}) (10 \text{ m})^2 $$
    $$ I_{xx,propellant,CG} = 2500 + \frac{1000000}{12} = 2500 + 83333.33 = 85833.33 \text{ kg} \cdot \text{m}^2 $$
    So, the inertia tensor of the propellant about its own CG is:
    $$ \mathbf{I}_{propellant,CG\_propellant} = \begin{pmatrix} 85833.33 & 0 & 0 \\ 0 & 85833.33 & 0 \\ 0 & 0 & 5000 \end{pmatrix} \text{ kg} \cdot \text{m}^2 $$
    The off-diagonal terms are zero due to the cylinder's symmetry about its principal axes.

4.  **Shift the inert structure's inertia tensor to the overall rocket CG using the Parallel Axis Theorem:**
    The displacement vector from $\vec{R}_{CG,inert}$ to $\vec{R}_{CG,rocket}$ is:
    $$ \vec{d}_{inert} = \vec{R}_{CG,rocket} - \vec{R}_{CG,inert} = (0, 0, 20/3) - (0, 0, 8) = (0, 0, 20/3 - 24/3) = (0, 0, -4/3) \text{ m} $$
    So, $d_x=0, d_y=0, d_z=-4/3 \text{ m}$.
    $|\vec{d}_{inert}|^2 = (0)^2 + (0)^2 + (-4/3)^2 = 16/9 \text{ m}^2$.
    The parallel axis theorem for tensor elements is $(I_O)_{ij} = (I_{CG})_{ij} + M (|\vec{d}|^2 \delta_{ij} - d_i d_j)$.
    Since $d_x=0$ and $d_y=0$, all $d_x d_y$, $d_x d_z$, $d_y d_z$ terms are zero. This means the off-diagonal terms of the added matrix are zero.
    The added matrix part is $M_{inert} (|\vec{d}_{inert}|^2 \mathbf{U} - \vec{d}_{inert} \otimes \vec{d}_{inert})$:
    $$ M_{inert} \begin{pmatrix} 16/9 & 0 & 0 \\ 0 & 16/9 & 0 \\ 0 & 0 & 16/9 \end{pmatrix} - M_{inert} \begin{pmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & (-4/3)(-4/3) \end{pmatrix} $$
    $$ = 5000 \begin{pmatrix} 16/9 & 0 & 0 \\ 0 & 16/9 & 0 \\ 0 & 0 & 16/9 \end{pmatrix} - 5000 \begin{pmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 16/9 \end{pmatrix} $$
    $$ = \begin{pmatrix} 80000/9 & 0 & 0 \\ 0 & 80000/9 & 0 \\ 0 & 0 & 80000/9 \end{pmatrix} - \begin{pmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 80000/9 \end{pmatrix} $$
    $$ = \begin{pmatrix} 80000/9 & 0 & 0 \\ 0 & 80000/9 & 0 \\ 0 & 0 & 0 \end{pmatrix} \approx \begin{pmatrix} 8888.89 & 0 & 0 \\ 0 & 8888.89 & 0 \\ 0 & 0 & 0 \end{pmatrix} \text{ kg} \cdot \text{m}^2 $$
    Now add this to $\mathbf{I}_{inert,CG\_inert}$:
    $$ \mathbf{I}_{inert, @CG\_rocket} = \begin{pmatrix} 10000 & 0 & 0 \\ 0 & 10000 & 0 \\ 0 & 0 & 2000 \end{pmatrix} + \begin{pmatrix} 8888.89 & 0 & 0 \\ 0 & 8888.89 & 0 \\ 0 & 0 & 0 \end{pmatrix} = \begin{pmatrix} 18888.89 & 0 & 0 \\ 0 & 18888.89 & 0 \\ 0 & 0 & 2000 \end{pmatrix} \text{ kg} \cdot \text{m}^2 $$

5.  **Shift the propellant's inertia tensor to the overall rocket CG using the Parallel Axis Theorem:**
    The displacement vector from $\vec{R}_{CG,propellant}$ to $\vec{R}_{CG,rocket}$ is:
    $$ \vec{d}_{propellant} = \vec{R}_{CG,rocket} - \vec{R}_{CG,propellant} = (0, 0, 20/3) - (0, 0, 6) = (0, 0, 20/3 - 18/3) = (0, 0, 2/3) \text{ m} $$
    So, $d_x=0, d_y=0, d_z=2/3 \text{ m}$.
    $|\vec{d}_{propellant}|^2 = (0)^2 + (0)^2 + (2/3)^2 = 4/9 \text{ m}^2$.
    The added matrix part is $M_{propellant,full} (|\vec{d}_{propellant}|^2 \mathbf{U} - \vec{d}_{propellant} \otimes \vec{d}_{propellant})$:
    $$ M_{propellant,full} \begin{pmatrix} 4/9 & 0 & 0 \\ 0 & 4/9 & 0 \\ 0 & 0 & 4/9 \end{pmatrix} - M_{propellant,full} \begin{pmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & (2/3)(2/3) \end{pmatrix} $$
    $$ = 10000 \begin{pmatrix} 4/9 & 0 & 0 \\ 0 & 4/9 & 0 \\ 0 & 0 & 4/9 \end{pmatrix} - 10000 \begin{pmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 4/9 \end{pmatrix} $$
    $$ = \begin{pmatrix} 40000/9 & 0 & 0 \\ 0 & 40000/9 & 0 \\ 0 & 0 & 40000/9 \end{pmatrix} - \begin{pmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 40000/9 \end{pmatrix} $$
    $$ = \begin{pmatrix} 40000/9 & 0 & 0 \\ 0 & 40000/9 & 0 \\ 0 & 0 & 0 \end{pmatrix} \approx \begin{pmatrix} 4444.44 & 0 & 0 \\ 0 & 4444.44 & 0 \\ 0 & 0 & 0 \end{pmatrix} \text{ kg} \cdot \text{m}^2 $$
    Now add this to $\mathbf{I}_{propellant,CG\_propellant}$:
    $$ \mathbf{I}_{propellant, @CG\_rocket} = \begin{pmatrix} 85833.33 & 0 & 0 \\ 0 & 85833.33 & 0 \\ 0 & 0 & 5000 \end{pmatrix} + \begin{pmatrix} 4444.44 & 0 & 0 \\ 0 & 4444.44 & 0 \\ 0 & 0 & 0 \end{pmatrix} = \begin{pmatrix} 90277.77 & 0 & 0 \\ 0 & 90277.77 & 0 \\ 0 & 0 & 5000 \end{pmatrix} \text{ kg} \cdot \text{m}^2 $$

6.  **Sum the shifted inertia tensors to get the total rocket inertia tensor about its overall CG:**
    $$ \mathbf{I}_{rocket,CG\_rocket} = \mathbf{I}_{inert, @CG\_rocket} + \mathbf{I}_{propellant, @CG\_rocket} $$
    $$ \mathbf{I}_{rocket,CG\_rocket} = \begin{pmatrix} 18888.89 & 0 & 0 \\ 0 & 18888.89 & 0 \\ 0 & 0 & 2000 \end{pmatrix} + \begin{pmatrix} 90277.77 & 0 & 0 \\ 0 & 90277.77 & 0 \\ 0 & 0 & 5000 \end{pmatrix} $$
    $$ \mathbf{I}_{rocket,CG\_rocket} = \begin{pmatrix} 109166.66 & 0 & 0 \\ 0 & 109166.66 & 0 \\ 0 & 0 & 7000 \end{pmatrix} \text{ kg} \cdot \text{m}^2 $$

7.  **State the final answer (rounded):**
    $$ \boxed{\mathbf{I}_{rocket,CG\_rocket} \approx \begin{pmatrix} 109167 & 0 & 0 \\ 0 & 109167 & 0 \\ 0 & 0 & 7000 \end{pmatrix} \text{ kg} \cdot \text{m}^2} $$

**Reflection:** This example was significantly more complex, requiring multiple steps: calculating component CGs, then overall CG, then component inertia tensors about their own CGs, then shifting these to the overall rocket CG using the parallel axis theorem (tensor form), and finally summing them. The most common pitfalls are algebraic errors in the parallel axis theorem (especially with the $d_i d_j$ terms) and ensuring all tensors are referenced to the *same* point before summation. The axial symmetry kept the off-diagonal terms zero throughout, simplifying calculations, but in a real rocket, these would likely be non-zero due to asymmetries.

## 6. Common mistakes and traps

1.  **Confusing Center of Mass (CM) and Center of Gravity (CG):** While often used interchangeably, especially in uniform gravitational fields, remember that CM is an intrinsic property of an object's mass distribution, whereas CG is the point where gravity appears to act. In non-uniform fields, they can diverge.
2.  **Incorrect Reference Frame for CG Calculation:** All component CG positions ($\vec{r}_i$) must be measured from the *same* fixed origin for the $\sum m_i \vec{r}_i$ formula to be valid. Inconsistent reference frames lead to incorrect overall CG.
3.  **Forgetting the Negative Sign in Products of Inertia:** The standard definition for products of inertia in the inertia tensor is $I_{xy} = -\int xy \, dm$. Forgetting this negative sign will result in an incorrect tensor. Always be consistent with your chosen convention.
4.  **Misapplying the Parallel Axis Theorem for Inertia Tensor:** It's not simply $I_{new} = I_{old} + Md^2$ for each component. The full tensor form $I_{ij,O} = I_{ij,CG} + M (|\vec{d}|^2 \delta_{ij} - d_i d_j)$ must be used, especially for the off-diagonal terms, which involve $d_i d_j$ products.
5.  **Assuming Propellant CG Stays Fixed in Tank:** As propellant depletes, its actual mass *and* its own CG location within the tank change. Assuming the fuel's CG remains at the tank's geometric center throughout depletion is a simplification that can lead to significant errors, especially for long tanks.
6.  **Summing Inertia Tensors about Different Origins:** You cannot directly add inertia tensors if they are calculated about different reference points. Each component's inertia tensor must first be shifted to a *common* reference point (usually the overall rocket's current CG) using the parallel axis theorem before summation.

## 7. Textbook-precise explanation

The mass properties of a rigid body, specifically its center of mass and inertia tensor, are fundamental for analyzing its translational and rotational dynamics. For a rocket vehicle, these properties are not constant but evolve significantly due to the expulsion of propellant.

**Center of Mass (CM):**
For a continuous mass distribution $\rho(\vec{r})$ within a volume $V$, the center of mass $\vec{R}_{CM}$ is defined as:
$$ \vec{R}_{CM} = \frac{1}{M} \int_V \vec{r} \, dm = \frac{1}{M} \int_V \vec{r} \rho(\vec{r}) \, dV $$
where $M = \int_V dm = \int_V \rho(\vec{r}) \, dV$ is the total mass of the body. In a uniform gravitational field, the center of gravity (CG) coincides with the CM. For a system of discrete particles or rigid bodies, the CM is given by:
$$ \vec{R}_{CM} = \frac{\sum_{i=1}^N m_i \vec{r}_i}{\sum_{i=1}^N m_i} $$
where $m_i$ is the mass of the $i$-th component and $\vec{r}_i$ is the position vector of its center of mass.
As propellant is consumed, the mass $m_{propellant}(t)$ and potentially its effective center of mass $\vec{r}_{propellant}(t)$ change, leading to a time-varying overall rocket CM:
$$ \vec{R}_{CM,rocket}(t) = \frac{M_{inert} \vec{R}_{CM,inert} + m_{propellant}(t) \vec{R}_{CM,propellant}(t)}{M_{inert} + m_{propellant}(t)} $$

**Inertia Tensor:**
The inertia tensor $\mathbf{I}$ (also denoted by