## 1. What it is — in plain English

Imagine you're at a swimming pool, and you try to push a big, inflatable beach ball down into the water. What happens? The water pushes back! It tries to shove the ball right back up to the surface. That upward push from the water is what we call **buoyancy**.

Buoyancy is simply the upward force that a fluid (like water or air) exerts on an object that's submerged in it, either partially or completely. This force is what makes things float, or at least feel lighter when they're in water. It's why you can lift a heavy rock much more easily underwater than you can on land.

The amazing thing about this upward push, discovered by the ancient Greek mathematician Archimedes, is that its strength is directly related to how much fluid the object "moves out of the way." If an object displaces a lot of water, it gets a big upward push. If it displaces only a little, the push is small. This principle explains everything from why giant ships made of steel can float to why a hot air balloon rises.

## 2. Why it matters — real-world applications

Buoyancy is a fundamental principle with widespread applications across various fields, from aerospace to everyday life.

1.  **Naval Architecture and Shipping:** This is perhaps the most obvious application. Archimedes' principle is the cornerstone of designing ships, submarines, and other marine vessels. Engineers use it to calculate how much cargo a ship can carry (its load line), how stable it will be, and how deep it will sit in the water. For submarines, precisely controlling buoyancy by taking in or expelling water from ballast tanks allows them to dive, surface, and maintain specific depths, critical for military and scientific operations.

2.  **Aerospace (Aerostats and Lighter-than-Air Craft):** While often associated with water, buoyancy also applies to fluids like air. Hot air balloons and airships (like blimps) operate on this principle. The air inside the balloon is heated, making it less dense than the surrounding cooler air. This difference in density creates an upward buoyant force, lifting the balloon. This technology is used for tourism, advertising, surveillance, and even for scientific research at high altitudes.

3.  **Hydrometry and Density Measurement:** A hydrometer is a simple device used to measure the density of liquids. It's a sealed glass tube with a weighted bulb at the bottom and a calibrated stem. When placed in a liquid, it floats at a certain depth. The denser the liquid, the higher the hydrometer floats. This is used in brewing (to measure sugar content), in automotive repair (to check battery acid or antifreeze), and in medical diagnostics (e.g., urinalysis). It's a direct application of how buoyant force balances the weight of the floating object.

4.  **Fish and Marine Life:** Many aquatic creatures, especially fish, have evolved sophisticated ways to control their buoyancy. Fish use a "swim bladder" – an internal gas-filled organ – to adjust their depth in the water column without expending excessive energy. By adding or removing gas from the bladder, they change their overall density, allowing them to rise, sink, or remain suspended at a particular depth. This is a biological marvel rooted in fluid mechanics.

5.  **Oil and Gas Exploration/Production:** Buoyancy plays a crucial role in offshore drilling. Massive oil platforms, often floating structures, must be designed to withstand immense forces while maintaining stability. The buoyant forces acting on these platforms, as well as on submerged pipelines and equipment, are carefully calculated by engineers to ensure safe and efficient operation in deep waters.

## 3. Prerequisites — what you must know first

Before diving deep into Archimedes' principle, ensure you have a solid grasp of these fundamental concepts:

*   **Density ($\rho$)**: Mass per unit volume. It tells you how much "stuff" is packed into a given space. ($\rho = m/V$)
*   **Pressure ($P$)**: Force exerted perpendicularly on a surface per unit area. It's how concentrated a force is. ($P = F/A$)
*   **Fluid Pressure at Depth**: The pressure at a certain depth within a fluid due to the weight of the fluid above it. This pressure increases with depth. ($P = \rho g h$)
*   **Force ($F$)**: An interaction that, when unopposed, will change the motion of an object. Measured in Newtons. ($F = ma$)
*   **Weight ($W$)**: The force of gravity acting on an object's mass. ($W = mg$)
*   **Newton's Laws of Motion**: Especially the concept of net force and equilibrium (when net force is zero, an object is at rest or constant velocity).
*   **Vector Addition**: Forces are vectors, meaning they have both magnitude and direction. You'll need to sum forces considering their directions.
*   **Basic Algebra and Geometry**: For manipulating equations and understanding volumes and areas.

## 4. The core idea — step by step

Let's break down how buoyancy works, building from the most basic principles of fluid pressure. Our goal is to derive Archimedes' principle from the ground up.

### Step 1: Pressure in a Fluid Varies with Depth

*   **Plain English Statement:** When you're in a fluid, the deeper you go, the more the fluid pushes on you. This push (pressure) acts in all directions, but its magnitude increases with depth.
*   **Small Concrete Example:** If you dive to the bottom of a swimming pool, your ears might hurt more than when you're just a meter deep. This is because there's more water pushing down from above you, resulting in higher pressure.
*   **Formal/Mathematical Version:** The absolute pressure at a depth $h$ below the surface of a static fluid is given by:
    $$P = P_0 + \rho_{fluid} g h$$
    where $P_0$ is the pressure at the surface (often atmospheric pressure), $\rho_{fluid}$ is the density of the fluid, and $g$ is the acceleration due to gravity. For simplicity in deriving buoyant force, we often consider the *gauge pressure*, which is just the pressure *due to the fluid itself*:
    $$P_{gauge} = \rho_{fluid} g h$$
*   **What Could Go Wrong:** Forgetting that pressure acts in *all* directions (up, down, sideways) at a given depth. It's not just a downward force. Also, using the density of the object instead of the fluid's density here.

### Step 2: Forces Exerted by Fluid Pressure on a Submerged Object

*   **Plain English Statement:** When you place an object into a fluid, the fluid pushes on every single surface of that object. The total force on any small part of the object's surface is the pressure at that point multiplied by the area of that part.
*   **Small Concrete Example:** Imagine a perfectly cubic block submerged in water. The water pushes down on its top face, up on its bottom face, and sideways on all four side faces.
*   **Formal/Mathematical Version:** The force ($F$) exerted by a fluid on a small area ($A$) of an object's surface is given by:
    $$F = P A$$
    The direction of this force is always perpendicular to the surface it acts upon, pointing inwards towards the object.
*   **What Could Go Wrong:** Only considering the top and bottom surfaces. While horizontal forces often cancel out for symmetric objects, it's crucial to understand they exist.

### Step 3: The Crucial Vertical Pressure Difference

*   **Plain English Statement:** Because pressure increases with depth (from Step 1), the bottom of any submerged object will experience a greater upward pressure than its top surface experiences a downward pressure. This difference is key to buoyancy.
*   **Small Concrete Example:** Consider our cube again. If its top surface is at depth $h_1$ and its bottom surface is at depth $h_2$, then $h_2 > h_1$. Therefore, the pressure $P_2 = \rho_{fluid} g h_2$ pushing up on the bottom is greater than the pressure $P_1 = \rho_{fluid} g h_1$ pushing down on the top.
*   **Formal/Mathematical Version:** Let the top surface of an object be at depth $h_1$ and its bottom surface be at depth $h_2$. The pressure on the top surface is $P_1 = \rho_{fluid} g h_1$, and the pressure on the bottom surface is $P_2 = \rho_{fluid} g h_2$.
    Since $h_2 > h_1$, it follows that $P_2 > P_1$.
*   **What Could Go Wrong:** Assuming the pressure is the same across the entire object, or that it only acts downwards.

### Step 4: Calculating the Net Upward Force (Buoyant Force)

*   **Plain English Statement:** The greater upward pressure on the bottom surface, combined with the lesser downward pressure on the top surface, creates an overall net upward force on the object. The horizontal forces, for a symmetrically shaped object, will cancel each other out.
*   **Small Concrete Example:** For our cube with top area $A$ and bottom area $A$:
    - Downward force on top: $F_{down} = P_1 A = (\rho_{fluid} g h_1) A$
    - Upward force on bottom: $F_{up} = P_2 A = (\rho_{fluid} g h_2) A$
    The net vertical force is $F_{net} = F_{up} - F_{down}$.
*   **Formal/Mathematical Version:** Let's consider a simple cylindrical or cuboidal object with a uniform cross-sectional area $A$ and height $\Delta h = h_2 - h_1$.
    The net upward force (buoyant force, $F_B$) is:
    $$F_B = F_{up} - F_{down}$$
    $$F_B = P_2 A - P_1 A$$
    Substituting the pressure formulas from Step 3:
    $$F_B = (\rho_{fluid} g h_2) A - (\rho_{fluid} g h_1) A$$
*   **What Could Go Wrong:** Accidentally subtracting in the wrong order ($F_{down} - F_{up}$), which would give a negative buoyant force, implying a downward push.

### Step 5: Deriving Archimedes' Principle from the Net Force

*   **Plain English Statement:** When we simplify the expression from Step 4, we find that the net upward force (buoyancy) is exactly equal to the weight of the fluid that the object has pushed out of its way. This "displaced fluid" is the volume of the object that is submerged.
*   **Small Concrete Example:** Continuing with our cuboid:
    $$F_B = \rho_{fluid} g A (h_2 - h_1)$$
    Notice that $A (h_2 - h_1)$ is simply the volume of the submerged part of the object, which is also the volume of the fluid displaced, $V_{displaced}$.
    So, $F_B = \rho_{fluid} g V_{displaced}$.
    Since the mass of the displaced fluid is $m_{displaced} = \rho_{fluid} V_{displaced}$, we can write:
    $$F_B = m_{displaced} g$$
    And $m_{displaced} g$ is precisely the weight of the displaced fluid, $W_{displaced}$.
*   **Formal/Mathematical Version:**
    From Step 4:
    $$F_B = \rho_{fluid} g A (h_2 - h_1)$$
    Let the height of the submerged object be $\Delta h = h_2 - h_1$.
    The volume of the submerged part of the object is $V_{submerged} = A \Delta h$.
    This volume $V_{submerged}$ is equal to the volume of the fluid displaced, $V_{displaced}$.
    Therefore, we can substitute $V_{displaced}$ for $A \Delta h$:
    $$F_B = \rho_{fluid} g V_{displaced}$$
    Since the mass of the displaced fluid is $m_{displaced} = \rho_{fluid} V_{displaced}$, we can write:
    $$F_B = m_{displaced} g$$
    This states that the buoyant force is equal to the weight of the fluid displaced by the object. This is Archimedes' Principle.
*   **What Could Go Wrong:** Confusing the density of the *object* ($\rho_{object}$) with the density of the *fluid* ($\rho_{fluid}$). The buoyant force *always* depends on the fluid's density, not the object's. Also, confusing the total volume of the object with the volume of the *submerged* part (which is $V_{displaced}$). They are only the same if the object is fully submerged.

## 5. Worked examples — multiple, with every step shown

### Example 1: Fully Submerged Block

**Problem:** A solid block of steel has dimensions of $0.1 \text{ m} \times 0.1 \text{ m} \times 0.2 \text{ m}$. It is fully submerged in water. Calculate the buoyant force acting on the block.
(Density of water $\rho_{water} = 1000 \text{ kg/m}^3$, $g = 9.81 \text{ m/s}^2$)

**Given:**
*   Block dimensions: $L=0.1 \text{ m}$, $W=0.1 \text{ m}$, $H=0.2 \text{ m}$
*   Fluid density: $\rho_{fluid} = \rho_{water} = 1000 \text{ kg/m}^3$
*   Acceleration due to gravity: $g = 9.81 \text{ m/s}^2$

**Wanted:** Buoyant force ($F_B$)

**Solution:**

1.  **Calculate the volume of the block.**
    Since the block is fully submerged, the volume of the block is equal to the volume of the displaced fluid.
    $$V_{block} = L \times W \times H$$
    $$V_{block} = (0.1 \text{ m}) \times (0.1 \text{ m}) \times (0.2 \text{ m})$$
    $$V_{block} = 0.002 \text{ m}^3$$
    *Explanation: We need the volume of displaced fluid to calculate the buoyant force. Since the block is fully submerged, its entire volume displaces water.*

2.  **Identify the volume of displaced fluid.**
    $$V_{displaced} = V_{block} = 0.002 \text{ m}^3$$
    *Explanation: As stated, when fully submerged, the volume of the object is the volume of the displaced fluid.*

3.  **Apply Archimedes' Principle.**
    The buoyant force is given by the weight of the displaced fluid:
    $$F_B = \rho_{fluid} V_{displaced} g$$
    *Explanation: This is the fundamental formula for buoyant force, derived from pressure differences.*

4.  **Substitute the values and calculate.**
    $$F_B = (1000 \text{ kg/m}^3) \times (0.002 \text{ m}^3) \times (9.81 \text{ m/s}^2)$$
    $$F_B = 2 \text{ kg} \times 9.81 \text{ m/s}^2$$
    $$F_B = 19.62 \text{ N}$$
    *Explanation: Perform the multiplication to get the final force in Newtons.*

**Final Answer:**
$$ \boxed{F_B = 19.62 \text{ N}} $$

*Reflection:* This example was straightforward because the object was fully submerged, making $V_{displaced}$ simply the object's total volume. The key was to remember to use the *fluid's* density.

---

### Example 2: Floating Wooden Block

**Problem:** A block of wood with a density of $700 \text{ kg/m}^3$ has a total volume of $0.05 \text{ m}^3$. It is placed in water. What fraction of the block's volume is submerged?
(Density of water $\rho_{water} = 1000 \text{ kg/m}^3$, $g = 9.81 \text{ m/s}^2$)

**Given:**
*   Density of wood: $\rho_{object} = 700 \text{ kg/m}^3$
*   Total volume of wood: $V_{total} = 0.05 \text{ m}^3$
*   Density of water: $\rho_{fluid} = 1000 \text{ kg/m}^3$
*   Acceleration due to gravity: $g = 9.81 \text{ m/s}^2$

**Wanted:** Fraction of volume submerged ($V_{submerged} / V_{total}$)

**Solution:**

1.  **Understand the condition for floating.**
    When an object floats, it is in equilibrium. This means the upward buoyant force ($F_B$) exactly balances the downward force of gravity (the object's weight, $W_{object}$).
    $$F_B = W_{object}$$
    *Explanation: For the block to float and be stationary, the net force on it must be zero according to Newton's First Law. The two vertical forces are buoyancy (up) and weight (down).*

2.  **Express the object's weight.**
    The weight of the object is its mass times gravity. The mass can be found from its density and total volume.
    $$W_{object} = m_{object} g$$
    $$m_{object} = \rho_{object} V_{total}$$
    $$W_{object} = \rho_{object} V_{total} g$$
    *Explanation: We need the object's weight to balance the buoyant force. Its mass is derived from its given density and total volume.*

3.  **Express the buoyant force.**
    The buoyant force is the weight of the fluid displaced. The volume of displaced fluid is equal to the submerged volume of the object ($V_{submerged}$).
    $$F_B = \rho_{fluid} V_{submerged} g$$
    *Explanation: This is Archimedes' principle. Note that we use $V_{submerged}$ because only the submerged part displaces fluid.*

4.  **Set the forces equal and solve for $V_{submerged}$.**
    $$F_B = W_{object}$$
    $$\rho_{fluid} V_{submerged} g = \rho_{object} V_{total} g$$
    *Explanation: Equating the expressions for buoyant force and object's weight, as established in step 1.*

5.  **Cancel $g$ and rearrange.**
    Notice that $g$ appears on both sides, so it can be cancelled.
    $$\rho_{fluid} V_{submerged} = \rho_{object} V_{total}$$
    Now, solve for the fraction $V_{submerged} / V_{total}$:
    $$\frac{V_{submerged}}{V_{total}} = \frac{\rho_{object}}{\rho_{fluid}}$$
    *Explanation: Cancelling $g$ simplifies the equation. Rearranging allows us to directly calculate the desired fraction.*

6.  **Substitute the given values.**
    $$\frac{V_{submerged}}{V_{total}} = \frac{700 \text{ kg/m}^3}{1000 \text{ kg/m}^3}$$
    $$\frac{V_{submerged}}{V_{total}} = 0.7$$
    *Explanation: Plug in the given densities and perform the division.*

**Final Answer:**
$$ \boxed{\frac{V_{submerged}}{V_{total}} = 0.7 \text{ or } 70\%} $$

*Reflection:* This example highlights that for a floating object, the ratio of its density to the fluid's density directly tells you the fraction of its volume that is submerged. The key was setting buoyant force equal to the object's weight.

---

### Example 3: Suspended Object in an Unknown Fluid

**Problem:** An object with a mass of $1.5 \text{ kg}$ and a volume of $0.0012 \text{ m}^3$ is completely submerged in an unknown liquid. It is found to be perfectly suspended (neither sinking nor floating, remaining stationary) in the liquid. Determine the density of the unknown liquid.
($g = 9.81 \text{ m/s}^2$)

**Given:**
*   Mass of object: $m_{object} = 1.5 \text{ kg}$
*   Volume of object: $V_{object} = 0.0012 \text{ m}^3$
*   Condition: Object is suspended (equilibrium)
*   Acceleration due to gravity: $g = 9.81 \text{ m/s}^2$

**Wanted:** Density of the unknown liquid ($\rho_{fluid}$)

**Solution:**

1.  **Understand the condition for suspension.**
    If the object is perfectly suspended, it means it is in equilibrium. The upward buoyant force ($F_B$) must exactly balance the downward force of gravity (the object's weight, $W_{object}$).
    $$F_B = W_{object}$$
    *Explanation: Similar to floating, suspension implies zero net force. The object is not accelerating up or down.*

2.  **Calculate the object's weight.**
    $$W_{object} = m_{object} g$$
    $$W_{object} = (1.5 \text{ kg}) \times (9.81 \text{ m/s}^2)$$
    $$W_{object} = 14.715 \text{ N}$$
    *Explanation: The object's weight is a direct calculation from its given mass and gravity.*

3.  **Express the buoyant force.**
    Since the object is completely submerged, the volume of displaced fluid is equal to the total volume of the object.
    $$V_{displaced} = V_{object} = 0.0012 \text{ m}^3$$
    Now, apply Archimedes' Principle:
    $$F_B = \rho_{fluid} V_{displaced} g$$
    *Explanation: We need to express the buoyant force in terms of the unknown fluid density. Since the object is fully submerged, $V_{displaced}$ is its total volume.*

4.  **Set the forces equal and solve for $\rho_{fluid}$.**
    $$F_B = W_{object}$$
    $$\rho_{fluid} V_{displaced} g = W_{object}$$
    Rearrange the equation to solve for $\rho_{fluid}$:
    $$\rho_{fluid} = \frac{W_{object}}{V_{displaced} g}$$
    *Explanation: Equating the buoyant force to the object's weight and then isolating the unknown density of the fluid.*

5.  **Substitute the values and calculate.**
    $$\rho_{fluid} = \frac{14.715 \text{ N}}{(0.0012 \text{ m}^3) \times (9.81 \text{ m/s}^2)}$$
    $$\rho_{fluid} = \frac{14.715 \text{ N}}{0.011772 \text{ m}^3 \text{ s}^{-2}}$$
    $$\rho_{fluid} = 1250 \text{ kg/m}^3$$
    *Explanation: Perform the arithmetic to find the density. Note that Newtons are $\text{kg} \cdot \text{m/s}^2$, so the units correctly resolve to $\text{kg/m}^3$.*

**Final Answer:**
$$ \boxed{\rho_{fluid} = 1250 \text{ kg/m}^3} $$

*Reflection:* This example shows that if an object is suspended in a fluid, its density must be exactly equal to the fluid's density. We could have also calculated the object's density first ($\rho_{object} = m_{object}/V_{object} = 1.5 \text{ kg} / 0.0012 \text{ m}^3 = 1250 \text{ kg/m}^3$) and then concluded $\rho_{fluid} = \rho_{object}$. This is a good shortcut to remember for suspended objects.

---

### Example 4: Block in Two Immiscible Fluids

**Problem:** A cylindrical block of wood with a height of $0.3 \text{ m}$ and a cross-sectional area of $0.01 \text{ m}^2$ floats in a container containing two immiscible liquids: oil on top of water. The density of the wood is $600 \text{ kg/m}^3$. The oil has a density of $800 \text{ kg/m}^3$, and water has a density of $1000 \text{ kg/m}^3$. If the top surface of the wood is level with the oil surface, how much of the wood's height is submerged in the water?

**Given:**
*   Height of wood: $H_{wood} = 0.3 \text{ m}$
*   Area of wood: $A_{wood} = 0.01 \text{ m}^2$
*   Density of wood: $\rho_{wood} = 600 \text{ kg/m}^3$
*   Density of oil: $\rho_{oil} = 800 \text{ kg/m}^3$
*   Density of water: $\rho_{water} = 1000 \text{ kg/m}^3$
*   Condition: Top surface of wood is level with oil surface.
*   Acceleration due to gravity: $g = 9.81 \text{ m/s}^2$

**Wanted:** Height of wood submerged in water ($h_{water}$)

**Solution:**

1.  **Calculate the total volume and weight of the wood.**
    $$V_{total, wood} = A_{wood} \times H_{wood}$$
    $$V_{total, wood} = (0.01 \text{ m}^2) \times (0.3 \text{ m}) = 0.003 \text{ m}^3$$
    $$W_{wood} = \rho_{wood} V_{total, wood} g$$
    $$W_{wood} = (600 \text{ kg/m}^3) \times (0.003 \text{ m}^3) \times (9.81 \text{ m/s}^2)$$
    $$W_{wood} = 17.658 \text{ N}$$
    *Explanation: We need the total weight of the wood to balance the total buoyant force from both fluids.*

2.  **Understand the floating condition and identify submerged volumes.**
    The block is floating, so the total upward buoyant force ($F_{B,total}$) must equal the downward weight of the wood ($W_{wood}$).
    $$F_{B,total} = W_{wood}$$
    The buoyant force comes from two sources: the oil and the water.
    Let $h_{oil}$ be the height of the wood submerged in oil, and $h_{water}$ be the height of the wood submerged in water.
    The problem states the top surface of the wood is level with the oil surface. This means the entire part of the wood not in water is in oil.
    So, $h_{oil} + h_{water} = H_{wood}$.
    Therefore, $h_{oil} = H_{wood} - h_{water}$.
    *Explanation: The equilibrium condition is key. The total buoyant force is the sum of buoyant forces from each fluid. We define the heights submerged in each fluid.*

3.  **Express the buoyant force from the oil.**
    The volume of wood submerged in oil is $V_{oil} = A_{wood} \times h_{oil}$.
    $$F_{B,oil} = \rho_{oil} V_{oil} g$$
    $$F_{B,oil} = \rho_{oil} (A_{wood} h_{oil}) g$$
    Substitute $h_{oil} = H_{wood} - h_{water}$:
    $$F_{B,oil} = \rho_{oil} A_{wood} (H_{wood} - h_{water}) g$$
    *Explanation: Apply Archimedes' principle for the oil layer, using the volume of wood submerged in oil.*

4.  **Express the buoyant force from the water.**
    The volume of wood submerged in water is $V_{water} = A_{wood} \times h_{water}$.
    $$F_{B,water} = \rho_{water} V_{water} g$$
    $$F_{B,water} = \rho_{water} (A_{wood} h_{water}) g$$
    *Explanation: Apply Archimedes' principle for the water layer, using the volume of wood submerged in water.*

5.  **Set total buoyant force equal to wood's weight.**
    $$F_{B,oil} + F_{B,water} = W_{wood}$$
    $$\rho_{oil} A_{wood} (H_{wood} - h_{water}) g + \rho_{water} A_{wood} h_{water} g = \rho_{wood} V_{total, wood} g$$
    *Explanation: Sum the two buoyant forces and equate them to the total weight of the wood.*

6.  **Simplify and solve for $h_{water}$.**
    Notice that $A_{wood} g$ is common in the first two terms, and $V_{total, wood} = A_{wood} H_{wood}$.
    Divide the entire equation by $A_{wood} g$:
    $$\rho_{oil} (H_{wood} - h_{water}) + \rho_{water} h_{water} = \rho_{wood} H_{wood}$$
    *Explanation: Cancelling $A_{wood} g$ from all terms simplifies the equation significantly, making it easier to solve for $h_{water}$.*

    Now, expand and rearrange to isolate $h_{water}$:
    $$\rho_{oil} H_{wood} - \rho_{oil} h_{water} + \rho_{water} h_{water} = \rho_{wood} H_{wood}$$
    $$h_{water} (\rho_{water} - \rho_{oil}) = \rho_{wood} H_{wood} - \rho_{oil} H_{wood}$$
    $$h_{water} (\rho_{water} - \rho_{oil}) = H_{wood} (\rho_{wood} - \rho_{oil})$$
    $$h_{water} = H_{wood} \frac{(\rho_{wood} - \rho_{oil})}{(\rho_{water} - \rho_{oil})}$$
    *Explanation: Algebraic manipulation to solve for $h_{water}$. This is a general formula for this specific two-fluid floating scenario.*

7.  **Substitute the numerical values.**
    $$h_{water} = (0.3 \text{ m}) \frac{(600 \text{ kg/m}^3 - 800 \text{ kg/m}^3)}{(1000 \text{ kg/m}^3 - 800 \text{ kg/m}^3)}$$
    $$h_{water} = (0.3 \text{ m}) \frac{(-200 \text{ kg/m}^3)}{(200 \text{ kg/m}^3)}$$
    $$h_{water} = (0.3 \text{ m}) \times (-1)$$
    $$h_{water} = -0.3 \text{ m}$$
    *Explanation: Plugging in the numbers. Wait, a negative height? This indicates an issue with the initial assumption or problem statement.*

    **Re-evaluation of the problem:** The problem states "the top surface of the wood is level with the oil surface". This implies that the entire block is submerged *at least* to the oil surface, and possibly further into the water.
    My assumption $h_{oil} = H_{wood} - h_{water}$ is correct, but the result $h_{water} = -0.3 \text{ m}$ means that the wood should actually be entirely in the oil and floating *above* the water, which contradicts the problem implicitly suggesting it's in both.

    Let's re-read: "If the top surface of the wood is level with the oil surface". This means the entire height of the wood, $H_{wood}$, is *below* the oil surface (i.e., $H_{wood}$ is the total submerged depth into the oil *and* water).

    Let $h_{oil\_submerged}$ be the height of wood in oil, and $h_{water\_submerged}$ be the height of wood in water.
    The total height of the block is $H_{wood}$.
    The problem implies that the *entire block* is submerged in the oil/water system, so $h_{oil\_submerged} + h_{water\_submerged} = H_{wood}$.

    Let's assume the question meant that the *top* of the wood is at the oil-air interface. This means the total length of the wood, $H_{wood}$, is accounted for by $h_{oil}$ and $h_{water}$.

    $$F_{B,oil} = \rho_{oil} A_{wood} h_{oil} g$$
    $$F_{B,water} = \rho_{water} A_{wood} h_{water} g$$
    We know $h_{oil} + h_{water} = H_{wood}$.
    So, $h_{oil} = H_{wood} - h_{water}$.

    Substituting this into the force balance equation:
    $$\rho_{oil} A_{wood} (H_{wood} - h_{water}) g + \rho_{water} A_{wood} h_{water} g = \rho_{wood} A_{wood} H_{wood} g$$
    Divide by $A_{wood} g$:
    $$\rho_{oil} (H_{wood} - h_{water}) + \rho_{water} h_{water} = \rho_{wood} H_{wood}$$
    $$\rho_{oil} H_{wood} - \rho_{oil} h_{water} + \rho_{water} h_{water} = \rho_{wood} H_{wood}$$
    $$h_{water} (\rho_{water} - \rho_{oil}) = H_{wood} (\rho_{wood} - \rho_{oil})$$
    $$h_{water} = H_{wood} \frac{\rho_{wood} - \rho_{oil}}{\rho_{water} - \rho_{oil}}$$
    This is the same formula. Let's check the densities:
    $\rho_{wood} = 600 \text{ kg/m}^3$
    $\rho_{oil} = 800 \text{ kg/m}^3$
    $\rho_{water} = 1000 \text{ kg/m}^3$

    Since $\rho_{wood} < \rho_{oil}$, the term $(\rho_{wood} - \rho_{oil})$ will be negative.
    Since $\rho_{water} > \rho_{oil}$, the term $(\rho_{water} - \rho_{oil})$ will be positive.
    So, the fraction $\frac{\rho_{wood} - \rho_{oil}}{\rho_{water} - \rho_{oil}}$ will be negative. This means $h_{water}$ will be negative.

    A negative $h_{water}$ means that the wood is *not* submerged in water at all under the given conditions. It means the wood is floating entirely in the oil layer, with some portion of it perhaps even above the oil surface, or just at the oil surface.

    Let's re-evaluate the premise: "the top surface of the wood is level with the oil surface". This means the *entire* block of wood is *below* the oil surface. If the wood's density (600) is less than the oil's density (800), it should float *on* the oil, not be fully submerged in it.

    **Correction to Problem Interpretation:** The problem statement "the top surface of the wood is level with the oil surface" must mean the *total height of the wood* is submerged in the oil and water. This implies the entire $0.3 \text{ m}$ height of the wood is below the oil/air interface.
    However, this is only possible if the wood's density is greater than or equal to the oil's density. Since $\rho_{wood} < \rho_{oil}$, the wood would naturally float *higher* than the oil surface.

    Let's assume a more realistic scenario for the problem to make sense: the *bottom* of the wood is in water, and the rest is in oil, with the *top* of the wood *above* the oil surface, or at a certain level.

    **Alternative interpretation:** The problem intends for the block to be floating, with its top surface exactly at the interface between the air and the oil. This means the entire $0.3 \text{ m}$ height of the block is submerged in the oil-water system.
    This implies: $V_{total, wood} = V_{submerged\_in\_oil} + V_{submerged\_in\_water}$.
    Let $h_o$ be the height in oil, $h_w$ be the height in water.
    $h_o + h_w = H_{wood} = 0.3 \text{ m}$.

    Then the force balance is:
    $W_{wood} = F_{B,oil} + F_{B,water}$
    $\rho_{wood} V_{total, wood} g = \rho_{oil} (A_{wood} h_o) g + \rho_{water} (A_{wood} h_w) g$
    $\rho_{wood} A_{wood} H_{wood} g = \rho_{oil} A_{wood} h_o g + \rho_{water} A_{wood} h_w g$
    Divide by $A_{wood} g$:
    $\rho_{wood} H_{wood} = \rho_{oil} h_o + \rho_{water} h_w$
    Substitute $h_o = H_{wood} - h_w$:
    $\rho_{wood} H_{wood} = \rho_{oil} (H_{wood} - h_w) + \rho_{water} h_w$
    $\rho_{wood} H_{wood} = \rho_{oil} H_{wood} - \rho_{oil} h_w + \rho_{water} h_w$
    $\rho_{wood} H_{wood} - \rho_{oil} H_{wood} = h_w (\rho_{water} - \rho_{oil})$
    $H_{wood} (\rho_{wood} - \rho_{oil}) = h_w (\rho_{water} - \rho_{oil})$
    $$h_w = H_{wood} \frac{\rho_{wood} - \rho_{oil}}{\rho_{water} - \rho_{oil}}$$

    This is the exact same formula, and it still leads to a negative $h_w$. This means the assumption that the block is submerged in *both* oil and water, with its top at the oil surface, is physically impossible given the densities. The wood is less dense than the oil, so it would float *on* the oil.

    **Let's re-frame the problem slightly to make it physically plausible and solvable with the intended method:**
    *Revised Problem:* A cylindrical block of wood with a height of $0.3 \text{ m}$ and a cross-sectional area of $0.01 \text{ m}^2$ floats in a container containing two immiscible liquids: oil on top of water. The density of the wood is $900 \text{ kg/m}^3$. The oil has a density of $800 \text{ kg/m}^3$, and water has a density of $1000 \text{ kg/m}^3$. If the top surface of the wood is level with the oil surface, how much of the wood's height is submerged in the water? (This makes sense, as $\rho_{oil} < \rho_{wood} < \rho_{water}$).

    **Revised Given:**
    *   Height of wood: $H_{wood} = 0.3 \text{ m}$
    *   Area of wood: $A_{wood} = 0.01 \text{ m}^2$
    *   Density of wood: $\rho_{wood} = 900 \text{ kg/m}^3$ (CHANGED from 600)
    *   Density of oil: $\rho_{oil} = 800 \text{ kg/m}^3$
    *   Density of water: $\rho_{water} = 1000 \text{ kg/m}^3$
    *   Condition: Top surface of wood is level with the oil surface (meaning $H_{wood}$ is fully submerged in the oil/water system).
    *   Acceleration due to gravity: $g = 9.81 \text{ m/s}^2$

    **Revised Solution (Steps 1-6 remain the same, only values change):**

    1.  **Calculate the total volume and weight of the wood.**
        $$V_{total, wood} = 0.003 \text{ m}^3$$
        $$W_{wood} = (900 \text{ kg/m}^3) \times (0.003 \text{ m}^3) \times (9.81 \text{ m/s}^2) = 26.487 \text{ N}$$

    2.  **Understand the floating condition and identify submerged volumes.**
        $$F_{B,total} = W_{wood}$$
        Let $h_{oil}$ be the height of the wood submerged in oil, and $h_{water}$ be the height of the wood submerged in water.
        Given: $h_{oil} + h_{water} = H_{wood} = 0.3 \text{ m}$. So, $h_{oil} = 0.3 \text{ m} - h_{water}$.

    3.  **Express the buoyant force from the oil.**
        $$F_{B,oil} = \rho_{oil} A_{wood} (H_{wood} - h_{water}) g$$

    4.  **Express the buoyant force from the water.**
        $$F_{B,water} = \rho_{water} A_{wood} h_{water} g$$

    5.  **Set total buoyant force equal to wood's weight.**
        $$\rho_{oil} A_{wood} (H_{wood} - h_{water}) g + \rho_{water} A_{wood} h_{water} g = \rho_{wood} A_{wood} H_{wood} g$$

    6.  **Simplify and solve for $h_{water}$.**
        $$h_{water} = H_{wood} \frac{(\rho_{wood} - \rho_{oil})}{(\rho_{water} - \rho_{oil})}$$

    7.  **Substitute the numerical values.**
        $$h_{water} = (0.3 \text{ m}) \frac{(900 \text{ kg/m}^3 - 800 \text{ kg/m}^3)}{(1000 \text{ kg/m}^3 - 800 \text{ kg/m}^3)}$$
        $$h_{water} = (0.3 \text{ m}) \frac{(100 \text{ kg/m}^3)}{(200 \text{ kg/m}^3)}$$
        $$h_{water} = (0.3 \text{ m}) \times (0.5)$$
        $$h_{water} = 0.15 \text{ m}$$
        *Explanation: With the revised density for wood ($\rho_{wood} = 900 \text{ kg/m}^3$), the calculation now yields a positive and physically meaningful height.*

**Final Answer (for the revised problem):**
$$ \boxed{h_{water} = 0.15 \text{ m}} $$

*Reflection:* This example was tricky because it involved multiple fluids and required careful setup of the force balance equation. It also highlighted the importance of checking for physical plausibility (e.g., a negative height in water indicates an issue with the problem's premises or values). The key was to sum the buoyant forces from each fluid and equate them to the object's total weight.

## 6. Common mistakes and traps

1.  **Using the object's density instead of the fluid's density:** The buoyant force calculation $F_B = \rho_{fluid} V_{displaced} g$ *always* uses the density of the *fluid* that is displaced, not the density of the object itself. This is the most common error.
2.  **Confusing total volume with displaced volume:** For a floating object, $V_{displaced}$ is only the *submerged* volume, not the object's total volume. They are only equal if the object is fully submerged.
3.  **Forgetting the object's weight:** When analyzing floating or sinking, it's crucial to compare the buoyant force to the object's weight ($W_{object} = m_{object} g = \rho_{object} V_{total} g$). Buoyancy is an upward force; weight is a downward force.
4.  **Incorrectly applying the pressure formula:** Ensure $h$ in $P = \rho g h$ is the *depth below the surface* of the fluid, not just any height or the object's total height.
5.  **Assuming buoyant force always equals object's weight:** This is only true if the object is floating or suspended in equilibrium. If an object is sinking, its weight is greater than the buoyant force. If it's rising, the buoyant force is greater than its weight.
6.  **Neglecting the "net" aspect of pressure difference:** While horizontal pressure forces exist, for a uniformly shaped object in a static fluid, they cancel out. The net effect is purely vertical due to the pressure difference between the top and bottom surfaces. For complex shapes, this requires integration, but the principle holds.

## 7. Textbook-precise explanation

**Archimedes' Principle** states that any object, wholly or partially immersed in a fluid, is buoyed up by a force equal to the weight of the fluid displaced by the object.

**Formal Derivation from Pressure Difference:**

Consider an arbitrarily shaped object submerged in a static fluid of uniform density $\rho_{fluid}$. Let the $z$-axis point vertically upwards, with the fluid surface at $z=0$. The pressure at any depth $h$ (where $h = -z$) in the fluid is $P = P_0 + \rho_{fluid} g h = P_0 - \rho_{fluid} g z$.

The force exerted by the fluid on any infinitesimal surface element $dA$ of the object is given by $d\mathbf{F} = -P \hat{\mathbf{n}} dA$, where $\hat{\mathbf{n}}$ is the outward-pointing unit normal vector to the surface. The negative sign indicates that the force exerted by the fluid is directed *inward*, perpendicular to the surface.

The total buoyant force $\mathbf{F}_B$ is the integral of these pressure forces over the entire submerged surface $S$ of the object:
$$\mathbf{F}_B = \oint_S -P \hat{\mathbf{n}} dA$$
Using the pressure formula $P = P_0 - \rho_{fluid} g z$:
$$\mathbf{F}_B = \oint_S -(P_0 - \rho_{fluid} g z) \hat{\mathbf{n}} dA$$
$$\mathbf{F}_B = -P_0 \oint_S \hat{\mathbf{n}} dA + \rho_{fluid} g \oint_S z \hat{\mathbf{n}} dA$$
From the Divergence Theorem (Gauss's Theorem), for a constant vector $\mathbf{C}$:
$$\oint_S \mathbf{C} \cdot \hat{\mathbf{n}} dA = \int_V \nabla \cdot \mathbf{C} dV = 0$$
This implies $\oint_S \hat{\mathbf{n}} dA = 0$. (The integral of the outward normal over a closed surface is zero). Therefore, the first term $-P_0 \oint_S \hat{\mathbf{n}} dA$ vanishes. This means atmospheric pressure (or any constant pressure) does not contribute to the net buoyant force.

So, the buoyant force simplifies to:
$$\mathbf{F}_B = \rho_{fluid} g \oint_S z \hat{\mathbf{n}} dA$$
Now, let's consider the components of $\mathbf{F}_B$. The horizontal components will cancel out due to symmetry for a static fluid. We are interested in the vertical component, $F_{B,z}$.
The vertical component of the normal vector is $\hat{\mathbf{n}} \cdot \hat{\mathbf{k}}$, where $\hat{\mathbf{k}}$ is the unit vector in the positive $z$ direction.
$$F_{B,z} = \rho_{fluid} g \oint_S z (\hat{\mathbf{n}} \cdot \hat{\mathbf{k}}) dA$$
Again, applying the Divergence Theorem, for a scalar function $\phi$ and a vector field $\mathbf{A}$:
$$\oint_S \phi \hat{\mathbf{n}} dA = \int_V \nabla \phi dV$$
Let $\phi = z$. Then $\nabla \phi = \nabla z = \hat{\mathbf{k}}$.
So, $\oint_S z \hat{\mathbf{n}} dA = \int_V \nabla z dV = \int_V \hat{\mathbf{k}} dV = \hat{\mathbf{k}} \int_V dV = V_{displaced} \hat{\mathbf{k}}$.
Therefore, the total buoyant force vector is:
$$\mathbf{F}_B = \rho_{fluid} g (V_{displaced} \hat{\mathbf{k}})$$
The magnitude of the buoyant force is:
$$F_B = \rho_{fluid} g V_{displaced}$$
And its direction is vertically upwards (in the $\hat{\mathbf{k}}$ direction).
Since $\rho_{fluid} V_{displaced}$ is the mass of the displaced fluid ($m_{displaced}$), then $\rho_{fluid} V_{displaced} g$ is the weight of the displaced fluid ($W_{displaced}$).
Thus, $F_B = W_{displaced}$.

This rigorous derivation confirms Archimedes' Principle. The point of application of the buoyant force (center of buoyancy) is at the centroid of the displaced fluid volume.

**References:**
*   Serway, R. A., & Jewett, J. W. (2018). *Physics for Scientists and Engineers* (10th ed.). Cengage Learning. (Chapter 14: Fluid Mechanics)
*   Halliday, D., Resnick, R., & Walker, J. (2014). *Fundamentals of Physics* (10th ed.). John Wiley & Sons. (Chapter 14: Fluids)

## 8. ASCII diagrams

```text
        AIR
-----------------------------------  <-- Fluid Surface (e.g., Water)
        P₀ (Atmospheric Pressure)
                 ↓
                 +-----------------+  <-- Top of object (depth h₁)
                 |                 |
                 |      OBJECT     |  <-- Volume of object = V_obj
                 |                 |
                 +-----------------+  <-- Bottom of object (depth h₂)
                 ↑  F_up = P₂ * A
                 ↓  F_down = P₁ * A
                 |                 |
                 |<--- Area A ---->|
                 |                 |
                 -------------------

Diagram 1: Submerged Block and Pressure Forces

Description: A rectangular block is fully submerged in a fluid. The top surface of the block is at depth h₁ from the fluid surface, and the bottom surface is at depth h₂.
- P₀ represents the atmospheric pressure acting on the fluid surface.
- At depth h₁, the pressure P₁ acts downwards on the top surface of the block, creating a force F_down = P₁ * A (where A is the cross-sectional area).
- At depth h₂, the pressure P₂ acts upwards on the bottom surface of the block, creating a force F_up = P₂ * A.
- Since h₂ > h₁, it follows that P₂ > P₁, leading to a net upward force (buoyant force).
- Horizontal pressure forces on the sides are equal and opposite at corresponding depths, thus canceling out.


        AIR
-----------------------------------  <-- Fluid Surface (e.g., Water)
                 +-----------------+  <-- Top of object (above water)
                 |                 |
                 |      OBJECT     |
                 |                 |  <-- V_total (Total Volume of Object)
                 +-----------------+
                 |#################|  <-- V_submerged (Volume in water)
                 |#################|
                 +-----------------+  <-- Bottom of object (in water)
                 ↑  F_B (Buoyant Force)
                 ↓  W_object (Weight of Object)
                 -------------------

Diagram 2: Floating Object

Description: A rectangular object is partially submerged in a fluid, indicating it is floating.
- The object has a total volume, V_total.
- Only the part of the object below the fluid surface, V_submerged, displaces fluid.
- The buoyant force (F_B) acts upwards, originating from the center of buoyancy (centroid of V_submerged).
- The weight of the object (W_object) acts downwards, originating from the center of gravity of the object.
- For a floating object, F_B = W_object. The volume of displaced fluid, V_displaced, is equal to V_submerged.
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Think of **"Archie's Bath"**. The legend says Archimedes discovered his principle while taking a bath. When he got in, water spilled out. He realized the amount of water that spilled out (the *displaced fluid*) was equal to the volume of his body that went into the water, and the *weight* of that displaced water was the *upward push* he felt.
    **Visual:** Imagine Archimedes in a bathtub, water overflowing. The key insight is that the *overflowed water* (displaced fluid) is what causes the *upward push*.

2.  **Formulas/Facts to Overlearn:**
    *   **The Buoyant Force Formula:** $F_B = \rho_{fluid} V_{displaced} g$
        (Remember: $\rho_{fluid}$ is *fluid* density, $V_{displaced}$ is *submerged* volume).
    *   **Pressure at Depth:** $P = \rho_{fluid} g h$
    *   **Condition for Floating/Sinking:**
        *   If $F_B > W_{object}$ (or $\rho_{fluid} > \rho_{object}$), the object rises.
        *   If $F_B < W_{object}$ (or $\rho_{fluid} < \rho_{object}$), the object sinks.
        *   If $F_B = W_{object}$ (or $\rho_{fluid} = \rho_{object}$), the object floats/is suspended.

3.  **Spaced-Repetition Schedule:**
    *   **Review 1:** In 1 day (tomorrow)
    *   **Review 2:** In 3 days
    *   **Review 3:** In 7 days
    *   **Review 4:** In 16 days
    *   **Review 5:** In 35 days
    For each review, quickly re-derive the principle and work through one or two examples.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the formula $F_B = \rho_{fluid} V_{displaced} g$, you can always rebuild it from first principles:
    1.  **Start with Pressure at Depth:** Recall that pressure in a fluid increases with depth: $P = \rho_{fluid} g h$.
    2.  **Consider a Simple Object (e.g., a Cylinder/Cube):** Imagine this object submerged.
    3.  **Identify Forces on Top and Bottom:**
        *   Downward force on top: $F_{down} = P_{top} A = (\rho_{fluid} g h_{top}) A$
        *   Upward force on bottom: $F_{up} = P_{bottom} A = (\rho_{fluid} g h_{bottom}) A$
    4.  **Calculate Net Upward Force:** $F_B = F_{up} - F_{down} = (\rho_{fluid} g h_{bottom}) A - (\rho_{fluid} g h_{top}) A$.
    5.  **Factor and Relate to Volume:** $F_B = \rho_{fluid} g A (h_{bottom} - h_{top})$. Recognize that $A (h_{bottom} - h_{top})$ is the volume of the submerged part of the object, which is $V_{displaced}$.
    6.  **Final Formula:** $F_B = \rho_{fluid} g V_{displaced}$.
    This pathway ensures you understand *why* the formula works, not just *what* it is.

## 10. Connections — what this leads to

Archimedes' principle is a cornerstone of fluid mechanics, opening doors to understanding many more complex phenomena and engineering challenges:

1.  **Stability of Floating Objects (Metacentric Height):** Beyond just floating, how stable is a ship? This involves analyzing the center of gravity and the center of buoyancy, and how their relative positions change as an object tilts. The concept of metacentric height, crucial in naval architecture, directly builds on buoyant force.
2.  **Fluid Dynamics (Beyond Statics):** While Archimedes' principle deals with static fluids, understanding pressure differences is fundamental to fluid dynamics, where fluids are in motion. Concepts like Bernoulli's principle, which relates pressure, velocity, and height in moving fluids, are an extension of how pressure behaves in fluids.
3.  **Aerostatics and Aerodynamics:** The principles of buoyancy in air are directly applied to hot air balloons and airships. This extends into understanding atmospheric convection, lift on airfoils (though primarily dynamic lift, static buoyancy still contributes), and the behavior of gases in the atmosphere.
4.  **Isostasy in Geophysics:** On a grand scale, the Earth's crust "floats" on the denser mantle, much like an iceberg in water. This concept, called isostasy, explains why mountains have deep roots and why continents rise and fall over geological timescales due to erosion or glaciation.
5.  **Oceanography and Marine Biology:** Understanding buoyancy is vital for studying ocean currents, the vertical migration of marine organisms, and the design of underwater vehicles and instruments. It helps explain how different layers of water with varying temperatures and salinities stratify.
6.  **Materials Science and Engineering:** Designing lightweight, buoyant materials (e.g., for life vests, insulation, or aerospace components) requires a deep understanding of density and displacement.

## 11. Self-check questions

1.  A uniform cylindrical block with a height of $10 \text{ cm}$ and a density of $800 \text{ kg/m}^3$ floats in a liquid with a density of $1200 \text{ kg/m}^3$. What is the height of the block submerged in the liquid?
2.  A balloon filled with helium (density $0.179 \text{ kg/m}^3$) has a volume of $10 \text{ m}^3$. The mass of the balloon material itself is $1.5 \text{ kg}$. If the density of air is $1.29 \text{ kg/m}^3$, what is the net lifting force (buoyant force minus total weight) on the balloon?
3.  An irregularly shaped rock weighs $50 \text{ N}$ in air. When fully submerged in water (density $1000 \text{ kg/m}^3$), its apparent weight is $30 \text{ N}$. Calculate the volume of the rock.
4.  A hollow sphere has an outer radius of $0.15 \text{ m}$ and an inner radius of $0.14 \text{ m}$. It is made of a material with a density of $2500 \text{ kg/m}^3$. Will this sphere float or sink in water (density $1000 \text{ kg/m}^3$)? Justify your answer with calculations.
5.  A cube of side length $L$ and density $\rho_C$ is placed in a fluid with density $\rho_F$.
    a) Derive a general expression for the fraction of the cube's volume that is submerged when it floats.
    b) If the cube is then pushed down until it is fully submerged and released, describe its subsequent motion in terms of the buoyant force and its weight.