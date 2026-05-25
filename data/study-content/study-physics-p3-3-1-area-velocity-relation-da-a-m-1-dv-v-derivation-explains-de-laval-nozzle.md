## 1. What it is — in plain English

Imagine you're trying to push water through a garden hose. If you squeeze the hose to make the opening smaller, the water squirts out faster, right? That's because water is pretty much incompressible – its density doesn't change much. To get the same amount of water through a smaller hole, it *has* to speed up.

Now, imagine doing the same thing with air, or any gas. Gases are different because they *can* be compressed. If you squeeze a hose carrying air, the air might speed up, but its density might also change. This "area-velocity relation" tells us exactly how the speed of a gas changes when it flows through a tube whose cross-sectional area changes, taking into account that the gas can be compressed.

The really mind-bending part is that gases behave completely opposite depending on how fast they're already going compared to the speed of sound. If the gas is moving slower than sound (subsonic), making the tube narrower *speeds it up*. But if the gas is moving faster than sound (supersonic), making the tube narrower actually *slows it down*!

This simple equation, $\frac{dA}{A} = (M^2-1)\frac{dV}{V}$, is the mathematical way of saying all that. It connects the percentage change in the tube's area ($dA/A$) to the percentage change in the gas's speed ($dV/V$), with the Mach number ($M$, which is flow speed divided by sound speed) being the crucial factor that dictates this strange behavior.

## 2. Why it matters — real-world applications

This relationship is not just a theoretical curiosity; it's absolutely fundamental to the design and operation of many high-speed fluid systems, especially in aerospace.

1.  **De Laval Nozzles (Rocket Engines & Jet Engines):** This is the most direct and iconic application. Rocket engines, like the **SpaceX Raptor engine** or the main engines on the **Space Shuttle**, use de Laval nozzles to accelerate exhaust gases to incredibly high supersonic speeds, generating thrust. The nozzle first *converges* (narrows) to accelerate the subsonic combustion gases to exactly the speed of sound at the narrowest point (the "throat"), and then *diverges* (widens) to further accelerate the now-supersonic gases to extreme velocities. Without this precise area-velocity relationship, we couldn't design efficient rocket engines.
2.  **Supersonic Wind Tunnels:** To test aircraft and spacecraft designs at supersonic speeds, engineers use supersonic wind tunnels. These tunnels also employ de Laval nozzles to accelerate air from a slow, high-pressure reservoir to a uniform supersonic speed in the test section. For example, **NASA's Ames Research Center** operates various supersonic wind tunnels that rely on this principle to create the necessary flow conditions for aerodynamic testing.
3.  **Jet Engine Afterburners & Exhaust Nozzles:** Modern fighter jets, such as the **F-35 Lightning II**, use afterburners for bursts of extra thrust. The exhaust nozzle of a jet engine, especially with an afterburner, is often a variable-geometry de Laval nozzle. It can change its throat area and exit area to optimize performance across different flight regimes, from subsonic cruise to supersonic dash, always using the area-velocity relation to control the exhaust gas speed.
4.  **Compressor and Turbine Blading (Subsonic Sections):** While not as dramatic as rocket nozzles, the principles apply to turbomachinery. In the converging passages between compressor blades, the flow accelerates subsonically, increasing pressure. In the diverging passages of turbine stators, the flow accelerates subsonically to convert pressure energy into kinetic energy before hitting the rotor blades. The area-velocity relation guides the shaping of these passages for efficient energy transfer.

## 3. Prerequisites — what you must know first

Before diving into the derivation, ensure you have a solid grasp of these foundational concepts:

*   **Conservation of Mass (Continuity Equation):** The principle that mass cannot be created or destroyed; for steady flow, the mass flow rate through a control volume is constant.
*   **Conservation of Momentum (Euler's Equation):** Newton's second law applied to fluid flow; relates pressure gradients to fluid acceleration (for inviscid flow).
*   **Conservation of Energy (First Law of Thermodynamics):** Energy is conserved; for fluid flow, this often manifests as the sum of kinetic, potential, and internal energy remaining constant in a closed system.
*   **Ideal Gas Law:** $P = \rho R T$, defining the relationship between pressure, density, and temperature for an ideal gas.
*   **Speed of Sound ($a$):** The speed at which a small pressure disturbance propagates through a medium; for an ideal gas, $a = \sqrt{\gamma RT}$ or $a = \sqrt{\gamma P/\rho}$.
*   **Mach Number ($M$):** The ratio of the flow speed ($V$) to the speed of sound ($a$) in the local fluid, $M = V/a$. Crucial for classifying flow as subsonic ($M<1$), sonic ($M=1$), or supersonic ($M>1$).
*   **Isentropic Flow:** A flow process that is both adiabatic (no heat transfer) and reversible (no friction or other dissipative effects). This implies constant entropy, $s$. For an ideal gas, this leads to relations like $P/\rho^\gamma = \text{constant}$.
*   **Calculus (Derivatives and Differentials):** The ability to differentiate functions and understand the meaning of differential quantities ($dP$, $dV$, $dA$, etc.) representing infinitesimal changes.

## 4. The core idea — step by step

Let's derive the area-velocity relation, $\frac{dA}{A} = (M^2-1)\frac{dV}{V}$, step by rigorous step. We will assume **steady, one-dimensional, inviscid, and adiabatic flow of an ideal gas**. These assumptions collectively define **isentropic flow**.

### ### Step 1: Start with the Conservation of Mass (Continuity Equation)

*   **Plain-English Statement:** For a steady flow, the amount of mass passing through any cross-section of a tube per unit time must be constant. This means if the tube changes size, the fluid's density or speed (or both) must adjust to keep the mass flow rate the same.
*   **Small Concrete Example:** Imagine a river flowing. If the river narrows, the water must flow faster to carry the same amount of water downstream per second. If the water also compresses (like gas), its density could increase, allowing it to flow slower for the same mass flow.
*   **Formal/Mathematical Version:** The mass flow rate, $\dot{m}$, is given by the product of density ($\rho$), cross-sectional area ($A$), and flow velocity ($V$).
    $$ \dot{m} = \rho A V $$
    Since the mass flow rate is constant for steady flow:
    $$ \dot{m} = \text{constant} $$
*   **What Could Go Wrong:** Forgetting that this applies to *steady* flow. If the flow is unsteady (e.g., a pulse of gas), $\dot{m}$ isn't constant in time.

### ### Step 2: Differentiate the Continuity Equation

*   **Plain-English Statement:** We want to see how small, infinitesimal changes in area, density, and velocity relate to each other while keeping the mass flow rate constant. This involves taking the differential of our continuity equation.
*   **Small Concrete Example:** If you have a product like $X Y Z = C$, and you want to know how small changes $dX, dY, dZ$ relate, you'd use the product rule for differentiation: $d(XYZ) = YZ dX + XZ dY + XY dZ = 0$.
*   **Formal/Mathematical Version:** Differentiate $\rho A V = \text{constant}$:
    $$ d(\rho A V) = 0 $$
    Using the product rule for differentiation:
    $$ (d\rho) A V + \rho (dA) V + \rho A (dV) = 0 $$
    To make this more useful, divide the entire equation by $\rho A V$:
    $$ \frac{d\rho}{\rho} + \frac{dA}{A} + \frac{dV}{V} = 0 $$
    This equation tells us that the sum of the fractional (or percentage) changes in density, area, and velocity must be zero.
*   **What Could Go Wrong:** Algebraic errors in applying the product rule or dividing through by $\rho A V$. It's easy to miss a term or misplace a variable.

### ### Step 3: Introduce Conservation of Momentum (Euler's Equation)

*   **Plain-English Statement:** For an inviscid (frictionless) flow, changes in pressure are what cause the fluid to accelerate or decelerate. A higher pressure on one side of a fluid element compared to the other will push it, changing its velocity.
*   **Small Concrete Example:** Imagine a balloon. If you release the opening, the higher pressure inside pushes the air out, accelerating it. The pressure gradient (change in pressure over distance) drives the flow.
*   **Formal/Mathematical Version:** For steady, one-dimensional, inviscid flow (Euler's equation in differential form):
    $$ dP = -\rho V dV $$
    This equation states that a decrease in pressure ($dP < 0$) leads to an increase in velocity ($dV > 0$), and vice-versa. The negative sign is important: flow accelerates down a pressure gradient.
    We can rearrange this slightly:
    $$ V dV + \frac{1}{\rho} dP = 0 $$
*   **What Could Go Wrong:** Forgetting the negative sign or the assumptions (inviscid, steady, 1D). Applying this to viscous flow would require the full Navier-Stokes equations.

### ### Step 4: Introduce Conservation of Energy (Isentropic Relation)

*   **Plain-English Statement:** For an ideal gas flowing without friction or heat transfer (isentropic flow), there's a specific relationship between how its pressure and density change. As the gas expands (density decreases), its pressure also drops in a predictable way. This relationship also involves the speed of sound.
*   **Small Concrete Example:** If you rapidly compress air in a bicycle pump, it gets hot (non-adiabatic). If you let it expand quickly, it gets cold. For ideal isentropic flow, temperature, pressure, and density are all linked. The speed of sound is the key to linking pressure and density changes.
*   **Formal/Mathematical Version:** For an isentropic process of an ideal gas, the speed of sound squared, $a^2$, links infinitesimal changes in pressure and density:
    $$ dP = a^2 d\rho $$
    This comes from the isentropic relation $P/\rho^\gamma = \text{constant}$. Differentiating this and using $a^2 = \gamma P/\rho$ leads to the above.
*   **What Could Go Wrong:** Applying this relation to non-isentropic flow (e.g., flow with significant friction, heat transfer, or shock waves). In such cases, $dP \neq a^2 d\rho$.

### ### Step 5: Combine Momentum and Energy

*   **Plain-English Statement:** Now we'll substitute the relationship between pressure and density (from energy/isentropic) into the equation that links pressure and velocity (from momentum). This will give us a direct link between changes in density and changes in velocity.
*   **Small Concrete Example:** If you know how $P$ changes with $\rho$, and how $P$ changes with $V$, you can figure out how $\rho$ changes with $V$.
*   **Formal/Mathematical Version:** Substitute $dP = a^2 d\rho$ (from Step 4) into Euler's equation $dP = -\rho V dV$ (from Step 3):
    $$ a^2 d\rho = -\rho V dV $$
    Now, rearrange this to express the fractional change in density, $\frac{d\rho}{\rho}$, in terms of velocity changes and the speed of sound:
    $$ \frac{d\rho}{\rho} = -\frac{V dV}{a^2} $$
*   **What Could Go Wrong:** Incorrectly substituting or rearranging. Pay close attention to the negative sign.

### ### Step 6: Substitute into the Differentiated Continuity Equation

*   **Plain-English Statement:** We now have an expression for how density changes relate to velocity changes (from Step 5). We can plug this into our differentiated continuity equation (from Step 2), which originally had terms for density, area, and velocity changes. This will leave us with an equation linking *only* area and velocity changes, along with the speed of sound.
*   **Small Concrete Example:** If you have an equation $X+Y+Z=0$ and you know $X=-W$, you can substitute to get $-W+Y+Z=0$.
*   **Formal/Mathematical Version:** Recall the differentiated continuity equation from Step 2:
    $$ \frac{d\rho}{\rho} + \frac{dA}{A} + \frac{dV}{V} = 0 $$
    Substitute the expression for $\frac{d\rho}{\rho}$ from Step 5:
    $$ \left(-\frac{V dV}{a^2}\right) + \frac{dA}{A} + \frac{dV}{V} = 0 $$
*   **What Could Go Wrong:** Simple algebraic errors during substitution. Double-check that all terms are correctly carried over.

### ### Step 7: Rearrange and Introduce Mach Number

*   **Plain-English Statement:** The final step is to rearrange the equation to isolate the term for area change, and then recognize that $V^2/a^2$ is simply the Mach number squared ($M^2$). This will give us the famous area-velocity relation.
*   **Small Concrete Example:** If you have $X + Y + Z = 0$, you can rearrange to $Y = -X - Z$. Then, if you see patterns like $W = (U/T)^2$, you can substitute.
*   **Formal/Mathematical Version:** Move the velocity terms to the right side of the equation:
    $$ \frac{dA}{A} = \frac{V dV}{a^2} - \frac{dV}{V} $$
    Factor out $\frac{dV}{V}$ from the right side:
    $$ \frac{dA}{A} = \frac{dV}{V} \left(\frac{V^2}{a^2} - 1\right) $$
    Recall the definition of the Mach number, $M = V/a$, so $M^2 = V^2/a^2$. Substitute this into the equation:
    $$ \boxed{\frac{dA}{A} = (M^2-1)\frac{dV}{V}} $$
    This is the area-velocity relation. It elegantly connects the fractional change in area to the fractional change in velocity, with the Mach number as the critical parameter.

*   **What Could Go Wrong:** Algebraic mistakes in factoring or incorrectly defining the Mach number. The order of terms in $(M^2-1)$ is crucial; $(1-M^2)$ would flip the signs and lead to incorrect conclusions.

**Interpretation of the result:**

*   **Subsonic Flow ($M < 1$):**
    *   If $M < 1$, then $(M^2-1)$ is negative.
    *   So, $\frac{dA}{A} = (\text{negative number})\frac{dV}{V}$.
    *   This means if $\frac{dV}{V}$ is positive (velocity increases), then $\frac{dA}{A}$ must be negative (area decreases). A **converging nozzle speeds up subsonic flow.**
    *   Conversely, if $\frac{dV}{V}$ is negative (velocity decreases), then $\frac{dA}{A}$ must be positive (area increases). A **diverging diffuser slows down subsonic flow.**

*   **Supersonic Flow ($M > 1$):**
    *   If $M > 1$, then $(M^2-1)$ is positive.
    *   So, $\frac{dA}{A} = (\text{positive number})\frac{dV}{V}$.
    *   This means if $\frac{dV}{V}$ is positive (velocity increases), then $\frac{dA}{A}$ must also be positive (area increases). A **diverging nozzle speeds up supersonic flow.**
    *   Conversely, if $\frac{dV}{V}$ is negative (velocity decreases), then $\frac{dA}{A}$ must be negative (area decreases). A **converging diffuser slows down supersonic flow.**

*   **Sonic Flow ($M = 1$):**
    *   If $M = 1$, then $(M^2-1)$ is zero.
    *   So, $\frac{dA}{A} = 0 \cdot \frac{dV}{V} = 0$.
    *   This implies that for the velocity to change (i.e., $dV \neq 0$), the area change must be zero. This means that **sonic flow ($M=1$) can only occur at a throat**, where the area is at a minimum (or maximum, but physically, it's a minimum in nozzles/diffusers).

This explains the design of the de Laval nozzle: converging for subsonic acceleration, a throat for sonic conditions, and diverging for supersonic acceleration.

## 5. Worked examples — multiple, with every step shown

### Example 1: Subsonic Nozzle Design

**Problem:** A gas flows subsonically through a nozzle. At a certain point, the Mach number is $M=0.6$. If the engineers want to increase the velocity by $1\%$ ($dV/V = 0.01$), what percentage change in area ($dA/A$) is required? Is the nozzle converging or diverging at this point?

**Given:**
*   $M = 0.6$
*   $\frac{dV}{V} = 0.01$ (a 1% increase in velocity)

**Want:**
*   $\frac{dA}{A}$
*   Whether the nozzle is converging or diverging.

**Solution:**

1.  **Recall the area-velocity relation:**
    $$ \frac{dA}{A} = (M^2-1)\frac{dV}{V} $$
    *This is the fundamental equation we derived and will use to solve the problem.*

2.  **Substitute the given values into the equation:**
    $$ \frac{dA}{A} = ((0.6)^2 - 1)(0.01) $$
    *We plug in the Mach number and the fractional change in velocity directly.*

3.  **Calculate the term $(M^2-1)$:**
    $$ (0.6)^2 - 1 = 0.36 - 1 = -0.64 $$
    *This step evaluates the Mach number dependent term. Since $M < 1$, $(M^2-1)$ is negative, as expected for subsonic flow.*

4.  **Perform the final multiplication:**
    $$ \frac{dA}{A} = (-0.64)(0.01) $$
    $$ \frac{dA}{A} = -0.0064 $$
    *This gives us the fractional change in area.*

5.  **Convert to percentage and interpret:**
    A fractional change of $-0.0064$ means a percentage change of $-0.64\%$.
    Since $\frac{dA}{A}$ is negative, the area must be decreasing.
    Therefore, the nozzle is **converging** at this point.

    **Final Answer:**
    The required percentage change in area is $\boxed{-0.64\%}$. The nozzle is **converging**.

**Reflection:** This example demonstrates the expected behavior for subsonic flow: to increase velocity, the area must decrease (converge). The negative sign in the result for $dA/A$ directly indicates a converging passage.

---

### Example 2: Supersonic Diffuser Design

**Problem:** A gas flows supersonically through a diffuser. At a section where the Mach number is $M=2.5$, the area is increasing by $2\%$ ($dA/A = 0.02$). What is the resulting percentage change in velocity ($dV/V$)? Is the flow speeding up or slowing down?

**Given:**
*   $M = 2.5$
*   $\frac{dA}{A} = 0.02$ (a 2% increase in area)

**Want:**
*   $\frac{dV}{V}$
*   Whether the flow is speeding up or slowing down.

**Solution:**

1.  **Recall the area-velocity relation:**
    $$ \frac{dA}{A} = (M^2-1)\frac{dV}{V} $$
    *This is our starting point.*

2.  **Substitute the given values into the equation:**
    $$ 0.02 = ((2.5)^2 - 1)\frac{dV}{V} $$
    *We plug in the known area change and Mach number.*

3.  **Calculate the term $(M^2-1)$:**
    $$ (2.5)^2 - 1 = 6.25 - 1 = 5.25 $$
    *This term is positive, as expected for supersonic flow ($M > 1$).*

4.  **Rewrite the equation with the calculated term:**
    $$ 0.02 = (5.25)\frac{dV}{V} $$
    *Now we need to isolate $dV/V$.*

5.  **Solve for $\frac{dV}{V}$:**
    $$ \frac{dV}{V} = \frac{0.02}{5.25} $$
    $$ \frac{dV}{V} \approx 0.0038095 $$
    *This is the fractional change in velocity.*

6.  **Convert to percentage and interpret:**
    A fractional change of approximately $0.00381$ means a percentage change of approximately $0.381\%$.
    Since $\frac{dV}{V}$ is positive, the velocity is increasing.
    This means the flow is **speeding up**.

    **Final Answer:**
    The percentage change in velocity is approximately $\boxed{+0.381\%}$. The flow is **speeding up**.

**Reflection:** This example highlights a crucial aspect of supersonic flow: a diverging passage (area increase) actually causes the flow to accelerate further. This is counter-intuitive if one only thinks in terms of incompressible flow, but perfectly explained by the $(M^2-1)$ term being positive. The problem statement mentioned a "diffuser," which typically slows flow down. The result here shows that if a supersonic diffuser *diverges*, it will actually accelerate the flow. A supersonic diffuser *must converge* to slow the flow down. This example shows that if a supersonic flow is put through a diverging section, it will accelerate.

---

### Example 3: Conceptual Design of a Nozzle for Supersonic Exit Velocity

**Problem:** You are designing a nozzle to accelerate a gas from a large reservoir (where $M \approx 0$) to a supersonic exit velocity ($M > 1$). Describe the required shape of the nozzle, explaining why each section is shaped the way it is, based on the area-velocity relation.

**Given:**
*   Initial state: $M \approx 0$ (subsonic)
*   Final state: $M > 1$ (supersonic)

**Want:**
*   Description of the nozzle shape.
*   Explanation of the shape based on $\frac{dA}{A} = (M^2-1)\frac{dV}{V}$.

**Solution:**

1.  **Identify the goal:** We want to accelerate the flow from subsonic to supersonic speeds. This means we need $dV/V > 0$ throughout the nozzle.

2.  **Analyze the initial (subsonic) section:**
    *   In the initial part of the nozzle, the flow is subsonic ($M < 1$).
    *   For $M < 1$, the term $(M^2-1)$ is negative.
    *   To achieve acceleration ($dV/V > 0$), we need $\frac{dA}{A} = (\text{negative}) \times (\text{positive})$.
    *   This means $\frac{dA}{A}$ must be negative.
    *   A negative $\frac{dA}{A}$ implies the area must be **decreasing**.
    *   Therefore, the initial section of the nozzle must be **converging**.
    *   *Explanation:* This converging section accelerates the gas from near-zero velocity up to the speed of sound.

3.  **Analyze the transition (sonic) section:**
    *   As the flow accelerates in the converging section, its Mach number increases.
    *   At some point, if sufficient pressure ratio is applied, the flow will reach $M=1$.
    *   When $M=1$, the term $(M^2-1)$ is zero.
    *   From the area-velocity relation, $\frac{dA}{A} = (0)\frac{dV}{V} = 0$.
    *   This means that at $M=1$, the area change must be zero. This occurs at a point of minimum area.
    *   Therefore, the nozzle must have a **throat** (a minimum area section) where the flow reaches sonic velocity ($M=1$).
    *   *Explanation:* The throat is the critical point where the flow transitions from subsonic to supersonic.

4.  **Analyze the final (supersonic) section:**
    *   After passing through the throat, the flow is now supersonic ($M > 1$).
    *   For $M > 1$, the term $(M^2-1)$ is positive.
    *   To continue accelerating the flow ($dV/V > 0$), we need $\frac{dA}{A} = (\text{positive}) \times (\text{positive})$.
    *   This means $\frac{dA}{A}$ must be positive.
    *   A positive $\frac{dA}{A}$ implies the area must be **increasing**.
    *   Therefore, the final section of the nozzle must be **diverging**.
    *   *Explanation:* This diverging section further accelerates the gas to the desired supersonic exit velocity.

**Final Answer:**
The nozzle must have a **converging-diverging shape**, commonly known as a **de Laval nozzle**. It starts with a **converging section** to accelerate the subsonic flow, transitions through a **throat** where the flow reaches sonic speed ($M=1$), and then expands through a **diverging section** to further accelerate the flow to supersonic speeds.

**Reflection:** This example demonstrates the power of the area-velocity relation in explaining the design of fundamental aerospace components. It shows that the behavior of compressible flow is counter-intuitive for supersonic speeds, requiring a diverging section to accelerate.

---

### Example 4: Quantitative Analysis of Area Change in a De Laval Nozzle

**Problem:** A de Laval nozzle is designed for an ideal gas with $\gamma = 1.4$. At a point in the converging section, $M_1 = 0.4$, and the area is $A_1 = 0.2 \text{ m}^2$. If the velocity increases by $5\%$ from this point, what is the new area, $A_2$? Later, in the diverging section, at $M_3 = 2.0$, the area is $A_3 = 0.1 \text{ m}^2$. If the velocity further increases by $5\%$ from this point, what is the new area, $A_4$? Assume small enough changes that the differential relation can be approximated by finite differences.

**Given:**
*   $\gamma = 1.4$ (though not directly used in the area-velocity relation itself, it's a typical gas property)
*   Point 1 (converging section): $M_1 = 0.4$, $A_1 = 0.2 \text{ m}^2$, $\frac{\Delta V}{V_1} = 0.05$
*   Point 3 (diverging section): $M_3 = 2.0$, $A_3 = 0.1 \text{ m}^2$, $\frac{\Delta V}{V_3} = 0.05$

**Want:**
*   $A_2$ (area after 5% velocity increase from $M_1$)
*   $A_4$ (area after 5% velocity increase from $M_3$)

**Solution Part A: Converging Section ($M_1 = 0.4$)**

1.  **Recall the area-velocity relation (using finite differences for small changes):**
    $$ \frac{\Delta A}{A} \approx (M^2-1)\frac{\Delta V}{V} $$
    *We approximate the differential changes with small finite changes for practical calculation.*

2.  **Substitute values for Point 1:**
    $$ \frac{\Delta A}{A_1} = ((0.4)^2 - 1)(0.05) $$
    *Plug in the Mach number at Point 1 and the given fractional velocity increase.*

3.  **Calculate $(M_1^2-1)$:**
    $$ (0.4)^2 - 1 = 0.16 - 1 = -0.84 $$
    *As expected for subsonic flow, this term is negative.*

4.  **Calculate $\frac{\Delta A}{A_1}$:**
    $$ \frac{\Delta A}{A_1} = (-0.84)(0.05) $$
    $$ \frac{\Delta A}{A_1} = -0.042 $$
    *This is the fractional change in area relative to $A_1$.*

5.  **Calculate $\Delta A$:**
    $$ \Delta A = -0.042 \times A_1 $$
    $$ \Delta A = -0.042 \times (0.2 \text{ m}^2) $$
    $$ \Delta A = -0.0084 \text{ m}^2 $$
    *This is the absolute change in area.*

6.  **Calculate the new area $A_2$:**
    $$ A_2 = A_1 + \Delta A $$
    $$ A_2 = 0.2 \text{ m}^2 - 0.0084 \text{ m}^2 $$
    $$ A_2 = 0.1916 \text{ m}^2 $$
    *The area has decreased, which is consistent with accelerating subsonic flow in a converging nozzle.*

    **Result for Part A:** The new area $A_2$ is $\boxed{0.1916 \text{ m}^2}$.

**Solution Part B: Diverging Section ($M_3 = 2.0$)**

1.  **Recall the area-velocity relation:**
    $$ \frac{\Delta A}{A} \approx (M^2-1)\frac{\Delta V}{V} $$
    *Using the same approximation for finite differences.*

2.  **Substitute values for Point 3:**
    $$ \frac{\Delta A}{A_3} = ((2.0)^2 - 1)(0.05) $$
    *Plug in the Mach number at Point 3 and the given fractional velocity increase.*

3.  **Calculate $(M_3^2-1)$:**
    $$ (2.0)^2 - 1 = 4.0 - 1 = 3.0 $$
    *As expected for supersonic flow, this term is positive.*

4.  **Calculate $\frac{\Delta A}{A_3}$:**
    $$ \frac{\Delta A}{A_3} = (3.0)(0.05) $$
    $$ \frac{\Delta A}{A_3} = 0.15 $$
    *This is the fractional change in area relative to $A_3$.*

5.  **Calculate $\Delta A$:**
    $$ \Delta A = 0.15 \times A_3 $$
    $$ \Delta A = 0.15 \times (0.1 \text{ m}^2) $$
    $$ \Delta A = 0.015 \text{ m}^2 $$
    *This is the absolute change in area.*

6.  **Calculate the new area $A_4$:**
    $$ A_4 = A_3 + \Delta A $$
    $$ A_4 = 0.1 \text{ m}^2 + 0.015 \text{ m}^2 $$
    $$ A_4 = 0.115 \text{ m}^2 $$
    *The area has increased, which is consistent with accelerating supersonic flow in a diverging nozzle.*

    **Result for Part B:** The new area $A_4$ is $\boxed{0.115 \text{ m}^2}$.

**Reflection:** This example quantitatively confirms the fundamental behavior of a de Laval nozzle. For the same percentage increase in velocity, the required area change is negative (converging) in the subsonic section and positive (diverging) in the supersonic section. The magnitude of the area change also depends on $M^2-1$, showing that a 5% velocity increase at $M=2.0$ requires a much larger area change (15%) compared to $M=0.4$ (4.2%). This is because the gas is much less compressible at higher Mach numbers, making velocity changes more sensitive to area changes.

## 6. Common mistakes and traps

1.  **Confusing Subsonic and Supersonic Behavior:** The most common trap is forgetting that the role of converging/diverging passages flips for supersonic flow. Students often instinctively apply incompressible flow logic (narrowing speeds up, widening slows down) to all compressible flows.
    *   *Why it happens:* Intuition from everyday experience with water or low-speed air is misleading for high-speed compressible flow.
2.  **Forgetting the Isentropic Assumption:** The derivation relies heavily on $dP = a^2 d\rho$, which is valid only for isentropic (adiabatic and reversible) flow. If there are shocks, friction, or heat transfer, this relation is no longer strictly true, and the area-velocity relation needs modification or cannot be directly applied.
    *   *Why it happens:* It's easy to overlook the underlying assumptions once the final formula is memorized.
3.  **Incorrect Sign Convention:** Mistakes with the negative sign in Euler's equation ($dP = -\rho V dV$) or the final $(M^2-1)$ term can lead to completely wrong conclusions about whether flow accelerates or decelerates, or whether a passage converges or diverges.
    *   *Why it happens:* Carelessness with algebraic signs during derivation or application.
4.  **Applying to Incompressible Flow:** While the equation can be formally evaluated for $M \to 0$, it's derived specifically for compressible flow. For truly incompressible flow, density is constant ($d\rho = 0$), and the continuity equation simply becomes $d(AV) = 0 \implies \frac{dA}{A} + \frac{dV}{V} = 0$.
    *   *Why it happens:* Not appreciating the fundamental difference compressibility makes.
5.  **Algebraic Errors in Derivation:** Skipping steps or making small errors in differentiation, substitution, or factoring can lead to an incorrect final formula.
    *   *Why it happens:* Rushing the derivation or not checking each step carefully.

## 7. Textbook-precise explanation

The area-velocity relation for one-dimensional, steady, isentropic flow of an ideal gas is a fundamental result in compressible fluid dynamics.

Consider a stream tube of varying cross-sectional area $A$, through which an ideal gas flows at a velocity $V$ and density $\rho$. The mass flow rate, $\dot{m}$, for steady flow, is given by:
$$ \dot{m} = \rho A V = \text{constant} $$
Taking the differential of this expression, we obtain:
$$ d(\rho A V) = 0 $$
Applying the product rule for differentiation and dividing by $\rho A V$:
$$ \frac{d\rho}{\rho} + \frac{dA}{A} + \frac{dV}{V} = 0 \quad (1) $$
This is the differential form of the continuity equation.

For one-dimensional, steady, inviscid flow (Euler's equation), the momentum equation in differential form is:
$$ dP = -\rho V dV \quad (2) $$
where $P$ is the static pressure. This equation states that a pressure gradient is responsible for changes in momentum.

For an isentropic flow of an ideal gas, the relationship between pressure and density changes is given by the speed of sound squared, $a^2$:
$$ dP = a^2 d\rho \quad (3) $$
where $a = \sqrt{\gamma P/\rho}$ for an ideal gas.

Substitute equation (3) into equation (2):
$$ a^2 d\rho = -\rho V dV $$
Rearranging to express the fractional change in density:
$$ \frac{d\rho}{\rho} = -\frac{V dV}{a^2} \quad (4) $$
Now, substitute equation (4) into equation (1):
$$ \left(-\frac{V dV}{a^2}\right) + \frac{dA}{A} + \frac{dV}{V} = 0 $$
Rearranging to isolate the area change term:
$$ \frac{dA}{A} = \frac{V dV}{a^2} - \frac{dV}{V} $$
Factor out $\frac{dV}{V}$ from the right-hand side:
$$ \frac{dA}{A} = \frac{dV}{V} \left(\frac{V^2}{a^2} - 1\right) $$
Recognizing the definition of the Mach number, $M = V/a$, so $M^2 = V^2/a^2$:
$$ \frac{dA}{A} = (M^2-1)\frac{dV}{V} $$
This is the area-velocity relation. It rigorously demonstrates that for subsonic flow ($M<1$), a converging passage ($dA<0$) causes acceleration ($dV>0$), and a diverging passage ($dA>0$) causes deceleration ($dV<0$). Conversely, for supersonic flow ($M>1$), a diverging passage ($dA>0$) causes acceleration ($dV>0$), and a converging passage ($dA<0$) causes deceleration ($dV<0$). At sonic conditions ($M=1$), $dA/A=0$, implying that sonic flow can only occur at a geometric throat (minimum area).

This derivation is standard in compressible flow textbooks. For a detailed treatment, refer to:
*   Anderson, John D. Jr. *Fundamentals of Aerodynamics*, 5th ed. McGraw-Hill Education, 2012, §3.8.
*   Shapiro, Ascher H. *The Dynamics and Thermodynamics of Compressible Fluid Flow*, Vol. 1. Ronald Press Co., 1953, Chapter 4.

## 8. ASCII diagrams

Here's an ASCII diagram illustrating a de Laval nozzle, which is the primary application of the area-velocity relation. It shows the change in area and the corresponding Mach number regimes.

```text
                                       De Laval Nozzle
                                 (Converging-Diverging Nozzle)

  Inlet (Reservoir)                                                  Exit
  Low Speed, High Pressure                                           High Speed, Low Pressure

  <------------------------------------------------------------------------------------> Flow Direction (V)

  +------------------------------------------------------------------------------------+  Wall
 /                                                                                    \
|                                                                                      |
|                                                                                      |
|                                                                                      |
 \                                                                                    /
  +------------------------------------------------------------------------------------+  Wall

      |          |            |           |             |           |          |
      A_in       A_c          A_t         A_d           A_e        Area (A)
      ^          ^            ^           ^             ^
      |          |            |           |             |
  Subsonic Flow  M < 1      Sonic Flow  Supersonic Flow   Supersonic Exit
  (Converging)              M = 1       M > 1             M >> 1
                            (Throat)    (Diverging)

  - In the **converging section** (left of throat):
    - Area (A) decreases (dA < 0)
    - Velocity (V) increases (dV > 0)
    - Mach number (M) increases (M < 1)
    - Consistent with dA/A = (M^2 - 1)dV/V where (M^2 - 1) is negative.

  - At the **throat** (minimum area):
    - Area (A) is minimum (dA = 0)
    - Mach number (M) is exactly 1 (sonic)
    - Consistent with dA/A = 0 when M = 1.

  - In the **diverging section** (right of throat):
    - Area (A) increases (dA > 0)
    - Velocity (V) increases (dV > 0)
    - Mach number (M) increases (M > 1)
    - Consistent with dA/A = (M^2 - 1)dV/V where (M^2 - 1) is positive.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    *   Think of "MAD VAD": **M**ach **A**rea **D**elta, **V**elocity **A**rea **D**elta.
    *   Or, visualize the equation: $\frac{dA}{A} = (M^2-1)\frac{dV}{V}$. The key is the $(M^2-1)$ term.
        *   **M**ach **M**agnifies **M**ystery: The Mach number is the "mystery" factor that flips the behavior.
        *   **S**ubsonic **S**hrinks **S**peed (to accelerate): For M < 1, (M²-1) is negative, so dA/A and dV/V have opposite signs. To accelerate (dV>0), area must shrink (dA<0).
        *   **S**upersonic **S**preads **S**peed (to accelerate): For M > 1, (M²-1) is positive, so dA/A and dV/V have the same sign. To accelerate (dV>0), area must spread (dA>0).
        *   **T**hroat **T**ransitions **T**o **T**hrottle (M=1): At M=1, (M²-1)=0, so dA/A must be 0, meaning a throat.

2.  **Formulas/Facts to Overlearn:**
    *   The core area-velocity relation: $\boxed{\frac{dA}{A} = (M^2-1)\frac{dV}{V}}$
    *   The interpretation of $(M^2-1)$:
        *   If $M < 1$, $(M^2-1) < 0$.
        *   If $M = 1$, $(M^2-1) = 0$.
        *   If $M > 1$, $(M^2-1) > 0$.
    *   The three governing principles: Conservation of Mass, Momentum, and Energy (Isentropic relation).

3.  **Spaced-Repetition Schedule:**
    *   **1 Day:** Review the derivation steps and the interpretation. Try to derive it from scratch.
    *   **3 Days:** Rederive it again. Work through one easy example and one hard example without looking at the solution.
    *   **7 Days:** Explain the concept and derivation to an imaginary peer. Focus on the physical intuition behind the $(M^2-1)$ term.
    *   **16 Days:** Attempt to derive it using slightly different notation or starting points (e.g., from the energy equation directly instead of $dP=a^2d\rho$).
    *   **35 Days:** Solve a complex problem involving de Laval nozzle design or a conceptual question about supersonic diffusers.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the exact formula, you can always rebuild it by following these steps:
    1.  **Start with Continuity:** $\dot{m} = \rho A V = \text{constant}$.
    2.  **Differentiate Continuity:** $\frac{d\rho}{\rho} + \frac{dA}{A} + \frac{dV}{V} = 0$. (This is the most critical starting point.)
    3.  **Introduce Momentum (Euler):** $dP = -\rho V dV$.
    4.  **Introduce Energy (Isentropic):** $dP = a^2 d\rho$.
    5.  **Combine Momentum and Energy:** Substitute $dP$ from (4) into (3) to get $a^2 d\rho = -\rho V dV$, which leads to $\frac{d\rho}{\rho} = -\frac{V dV}{a^2}$.
    6.  **Substitute into Differentiated Continuity:** Replace $\frac{d\rho}{\rho}$ in step (2) with the expression from step (5).
    7.  **Rearrange and Recognize Mach Number:** Algebraically manipulate to get $\frac{dA}{A}$ on one side and factor out $\frac{dV}{V}$, then substitute $M = V/a$.

## 10. Connections — what this leads to

The area-velocity relation is a cornerstone of compressible flow, unlocking understanding of several advanced topics:

*   **De Laval Nozzle Design:** This relation directly dictates the shape and performance of rocket and jet engine nozzles, as well as supersonic wind tunnel nozzles. It's essential for calculating throat areas, exit areas, and overall thrust.
*   **Choked Flow:** The condition $M=1$ at the throat is critical. Once choked, the mass flow rate through the nozzle reaches its maximum possible value, regardless of further reductions in downstream pressure. This concept is directly derived from the area-velocity relation and mass flow rate equation.
*   **Nozzle Efficiency and Performance:** Understanding how area changes affect velocity allows engineers to design nozzles for optimal thrust and specific impulse, crucial metrics in rocket science.
*   **Supersonic Diffusers and Inlets:** The reverse behavior for supersonic flow (converging to slow down) is vital for designing inlets for supersonic aircraft (like ramjets and scramjets) to efficiently slow down incoming air before it enters the combustion chamber.
*   **Shock Waves and Expansion Waves:** While the area-velocity relation assumes isentropic flow, it provides the ideal baseline. Deviations from this ideal, such as the formation of shock waves (which are non-isentropic), are often analyzed in contrast to the ideal behavior predicted by this relation.
*   **Aerodynamic Heating:** The high velocities achieved in nozzles and diffusers, as governed by this relation, directly lead to considerations of aerodynamic heating and material selection for high-temperature environments.
*   **Turbomachinery Aerodynamics:** While more complex, the principles of accelerating/decelerating flow through varying area passages apply to the design of compressor and turbine blades, especially in the context of high-speed turbofan engines.

## 11. Self-check questions

1.  Explain in your own words why a diverging passage *accelerates* supersonic flow, despite the intuitive expectation that it would slow it down. What physical property of the gas, not present in incompressible flow, is responsible for this?
2.  An engineer is designing a supersonic wind tunnel. The test section needs to operate at $M=3.0$. If the throat area of the nozzle is $0.1 \text{ m}^2$, would the area of the test section be greater than, equal to, or less than $0.1 \text{ m}^2$? Justify your answer using the area-velocity relation.
3.  Derive the area-velocity relation, $\frac{dA}{A} = (M^2-1)\frac{dV}{V}$, starting from the continuity equation, $\dot{m} = \rho A V$, and clearly stating all assumptions made at each step.
4.  Consider a gas flowing in a duct. At a point where $M=0.8$, the area is $0.5 \text{ m}^2$. If the velocity increases by $10\%$, what is the new area? If the same gas, now at $M=1.5$, flows through a section where the area decreases by $5\%$, what is the percentage change in velocity?
5.  A de Laval nozzle has a throat area $A_t$. If the nozzle is operating such that the flow is choked at the throat, describe the behavior of $dV/V$ at the throat according to the area-velocity relation. What would happen if the nozzle was designed such that $dA/A \neq 0$ at the point where $M=1$?