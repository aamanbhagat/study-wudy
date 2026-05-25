## 1. What it is — in plain English

Imagine a tiny, thin layer of air or water right next to a surface, like the wing of an airplane or the hull of a ship. This layer, called the "boundary layer," is special because the fluid particles in it are slowed down by friction with the surface.

Now, imagine this fluid is flowing "uphill" in terms of pressure. This means it's moving from a region of lower pressure to a region of higher pressure. It's like trying to push a car uphill – it naturally wants to slow down. We call this an "adverse pressure gradient."

The fluid in the boundary layer, already moving slowly due to friction, finds it very hard to push against this rising pressure. If the "hill" (the adverse pressure gradient) is too steep or too long, the slowest fluid particles right next to the surface can't make it. They stop, and then they might even reverse direction, flowing backward!

When this happens, the entire boundary layer "lifts off" or detaches from the surface. It can no longer follow the shape of the object. This lifting off is called "boundary layer separation." It creates a messy, swirling region of fluid behind it, often called a "wake."

## 2. Why it matters — real-world applications

Boundary layer separation due to an adverse pressure gradient is a critical phenomenon in countless engineering and natural systems, often leading to reduced performance or outright failure.

1.  **Aircraft Aerodynamics (Stall):** This is perhaps the most famous application. As an aircraft wing (airfoil) increases its angle of attack, the adverse pressure gradient on its upper surface becomes stronger. Eventually, the boundary layer separates, leading to a dramatic loss of lift and a sharp increase in drag. This condition is called "stall." Modern aircraft, like those from **Boeing** and **Airbus**, use sophisticated wing designs and sometimes active flow control (e.g., vortex generators, blown flaps) to delay separation and extend the useful angle of attack range, improving safety and efficiency.
2.  **Automotive Design (Drag Reduction):** The shape of a car significantly impacts its aerodynamic drag. Separation on the rear of a car creates a large, low-pressure wake, pulling the car backward. Car manufacturers like **Mercedes-Benz** and **Tesla** spend immense resources using computational fluid dynamics (CFD) and wind tunnels to design sleek shapes that minimize separation, especially at the rear, to improve fuel efficiency and stability at high speeds. Features like boat-tail designs or rear diffusers aim to reattach flow or manage separation gracefully.
3.  **Rocket Nozzles and Diffusers (Efficiency Loss):** In rocket engine nozzles, the flow accelerates rapidly, typically avoiding separation. However, if the nozzle is over-expanded (designed for a lower ambient pressure than it's operating in), the pressure inside the nozzle can drop below ambient, then rise again towards the exit, creating an adverse pressure gradient that causes separation and reduces thrust efficiency. Conversely, diffusers (devices designed to slow down fluid and increase pressure, e.g., in jet engines or wind tunnels) are highly susceptible to separation if their expansion angle is too steep. This leads to inefficient pressure recovery and increased energy losses.
4.  **Turbomachinery (Compressors and Turbines):** In the blades of compressors and turbines (found in jet engines, power plants, etc.), boundary layer separation can severely degrade performance. In compressors, separation on the blade surfaces can lead to "surge" or "stall," causing a catastrophic loss of compression. Companies like **General Electric (GE Aviation)** and **Rolls-Royce** invest heavily in advanced blade designs and coatings to maintain attached flow and prevent separation under various operating conditions.
5.  **Microfluidics and Biomedical Devices:** Even at very small scales, adverse pressure gradients can cause separation. In microfluidic channels, this can lead to inefficient mixing or particle trapping. In biomedical devices, such as artificial heart valves or blood pumps, separation can create regions of stagnant or recirculating blood flow, leading to thrombus (clot) formation, a critical failure mode. Understanding and controlling separation is vital for designing safe and effective medical implants.

## 3. Prerequisites — what you must know first

To fully grasp boundary layer separation due to an adverse pressure gradient, you should be familiar with the following core concepts:

*   **Fluid Properties:** Understanding density ($\rho$), viscosity ($\mu$), and their role in fluid behavior.
*   **Fluid Kinematics:** Concepts like velocity fields, streamlines, and pathlines.
*   **Pressure:** Definition of pressure, how it acts in a fluid, and the concept of a pressure gradient ($\nabla P$ or $dP/dx$).
*   **Bernoulli's Principle:** The relationship between pressure, velocity, and height in an inviscid, incompressible flow along a streamline. It helps explain how pressure changes influence freestream velocity.
*   **Navier-Stokes Equations:** The fundamental equations governing fluid motion. You should understand that they represent conservation of momentum and energy, and incorporate viscous effects. (A full derivation isn't needed, but awareness is key).
*   **Boundary Layer Concept:** The idea that viscous effects are confined to a thin layer near a solid surface, while outside this layer, the flow can often be approximated as inviscid.
*   **Wall Shear Stress ($\tau_w$):** The frictional force exerted by the fluid on the solid surface, directly related to the velocity gradient at the wall.
*   **Reynolds Number ($Re$):** A dimensionless quantity that indicates the relative importance of inertial forces to viscous forces. It helps predict flow regimes (laminar vs. turbulent) and boundary layer behavior.
*   **Conservation of Mass (Continuity Equation):** How fluid mass is conserved in a flow.
*   **Momentum Equation:** The application of Newton's second law to a fluid element.

## 4. The core idea — step by step

Let's break down the process of boundary layer separation due to an adverse pressure gradient, building intuition layer by layer.

### Step 1: The Boundary Layer - A Viscous 'Friction Zone'

*   **Plain English:** Imagine the air or water flowing over a surface. Right at the surface, the fluid sticks perfectly to it (the "no-slip condition"). As you move away from the surface, the fluid moves faster and faster until it reaches the speed of the main flow. This thin region where the speed changes from zero to the main flow speed is called the boundary layer. It's where friction (viscosity) is really important.
*   **Concrete Example:** Think of a river flowing over its bed. The water at the very bottom is still, but as you go up, the water moves faster. The layer from the bottom to where the speed becomes constant is the boundary layer.
*   **Formal/Mathematical Version:**
    The no-slip condition states that the fluid velocity $\vec{u}$ at the solid boundary is zero relative to the boundary: $\vec{u}(\text{surface}) = \vec{u}_{\text{surface}}$. If the surface is stationary, then $\vec{u}(\text{surface}) = 0$.
    The velocity profile within the boundary layer, $u(y)$, varies from $u(0)=0$ to $u(\delta) \approx U_e$, where $\delta$ is the boundary layer thickness and $U_e$ is the edge velocity.
    The wall shear stress, $\tau_w$, is given by:
    $$ \tau_w = \mu \left( \frac{\partial u}{\partial y} \right)_{y=0} $$
    where $\mu$ is dynamic viscosity and $(\partial u / \partial y)_{y=0}$ is the velocity gradient at the wall.
*   **What could go wrong:** Forgetting the no-slip condition, or thinking the fluid moves at the freestream velocity everywhere. This would ignore the very existence of the boundary layer and viscous effects.

### Step 2: Pressure Gradients - Driving and Resisting Flow

*   **Plain English:** Pressure isn't always the same everywhere. Sometimes it pushes the fluid forward, helping it speed up. Other times, it pushes against the fluid, trying to slow it down.
    *   **Favorable Pressure Gradient:** When pressure decreases in the direction of flow ($dP/dx < 0$), it's like going downhill. The fluid speeds up. This helps keep the boundary layer attached.
    *   **Adverse Pressure Gradient:** When pressure increases in the direction of flow ($dP/dx > 0$), it's like going uphill. The fluid slows down. This is the condition that *causes* separation.
*   **Concrete Example:** On the front of an airplane wing, the air speeds up, and its pressure drops (favorable pressure gradient). On the back part of the wing, the air slows down, and its pressure rises (adverse pressure gradient).
*   **Formal/Mathematical Version:**
    The pressure gradient in the x-direction is $dP/dx$.
    From Bernoulli's principle for inviscid flow along a streamline:
    $$ P + \frac{1}{2}\rho U_e^2 = \text{constant} $$
    Differentiating with respect to $x$:
    $$ \frac{dP}{dx} + \rho U_e \frac{dU_e}{dx} = 0 $$
    So, if $U_e$ increases ($dU_e/dx > 0$), then $dP/dx < 0$ (favorable).
    If $U_e$ decreases ($dU_e/dx < 0$), then $dP/dx > 0$ (adverse).
    This relationship explains how the freestream velocity and pressure gradient are linked.
*   **What could go wrong:** Confusing pressure with velocity. Higher velocity in the freestream usually means *lower* static pressure, and vice-versa (Bernoulli). An adverse pressure gradient means pressure is *increasing*, which means the freestream velocity is *decreasing*.

### Step 3: Viscosity's Toll - Momentum Loss Near the Wall

*   **Plain English:** Because of friction (viscosity), the fluid layers closest to the wall rub against each other and the wall itself. This friction continuously saps energy and momentum from these layers, making them move slower than the fluid further away from the wall. The closer you are to the wall, the more pronounced this slowing effect.
*   **Concrete Example:** Imagine a line of dominoes. Each domino falling affects the next. Similarly, each layer of fluid drags on the one next to it, transferring momentum. The wall acts like a giant brake on the innermost layer.
*   **Formal/Mathematical Version:**
    The momentum equation for the boundary layer (simplified, steady, 2D, incompressible) includes terms for pressure gradient and viscous forces:
    $$ u \frac{\partial u}{\partial x} + v \frac{\partial u}{\partial y} = -\frac{1}{\rho}\frac{dP}{dx} + \nu \frac{\partial^2 u}{\partial y^2} $$
    The term $\nu \frac{\partial^2 u}{\partial y^2}$ represents the viscous diffusion of momentum. Near the wall, this term is significant, causing the velocity profile to have a strong gradient and lose momentum.
*   **What could go wrong:** Ignoring viscosity. If there were no viscosity, there would be no boundary layer and no separation (in the classical sense). The fluid would slip perfectly over the surface.

### Step 4: The Adverse Pressure Gradient Attacks the Weakest Link

*   **Plain English:** Now, combine the previous ideas. We have an adverse pressure gradient ($dP/dx > 0$) trying to slow down *all* the fluid. But the fluid layers right next to the wall are already very slow and have very little momentum because of friction. They are the "weakest link."
*   **Concrete Example:** Imagine a group of people trying to push a heavy car uphill. Some people are strong, but others are weak. If the hill gets too steep, the weakest people will be the first to give up and start sliding backward.
*   **Formal/Mathematical Version:**
    The pressure gradient term $-\frac{1}{\rho}\frac{dP}{dx}$ in the momentum equation acts on all fluid particles. When $dP/dx > 0$ (adverse), this term becomes negative, meaning it contributes to deceleration. For the slow-moving fluid near the wall, this deceleration effect is proportionally much stronger relative to its existing kinetic energy.
*   **What could go wrong:** Thinking the adverse pressure gradient only affects the freestream. It affects *all* fluid, but its impact is most critical where the fluid's momentum is lowest.

### Step 5: Stagnation and Flow Reversal - The Point of No Return

*   **Plain English:** If the adverse pressure gradient becomes strong enough, the fluid particles right at the wall (which are already moving very slowly) will eventually be brought to a complete stop. If the pressure gradient persists or gets even stronger, these particles will then be forced to flow *backward*, against the main direction of the flow.
*   **Concrete Example:** The weakest people pushing the car uphill eventually stop, and then the car starts rolling backward over them.
*   **Formal/Mathematical Version:**
    The point of boundary layer separation is defined as the location where the wall shear stress becomes zero. This means the velocity gradient at the wall becomes zero:
    $$ \left( \frac{\partial u}{\partial y} \right)_{y=0} = 0 $$
    Beyond this point, if the adverse pressure gradient continues, the velocity near the wall ($u(y)$ for small $y$) will become negative, indicating flow reversal.
*   **What could go wrong:** Confusing separation with turbulence. While turbulence can affect separation, separation itself is a distinct phenomenon defined by the flow reversal near the wall. Also, thinking separation happens *instantly* across the whole boundary layer; it starts right at the wall.

### Step 6: Separation - The Boundary Layer Lifts Off

*   **Plain English:** Once the flow near the wall reverses, the boundary layer can no longer stay "attached" to the surface. It detaches, or "lifts off," creating a gap between the main flow and the surface. This gap is filled with swirling, recirculating fluid (a "wake").
*   **Concrete Example:** The car rolls back, and the people who were pushing it can no longer keep pace. They get left behind, and a chaotic mess forms where they were.
*   **Formal/Mathematical Version:**
    After separation, the flow streamlines diverge from the surface, and a region of recirculating flow (a separation bubble or wake) forms. This significantly alters the pressure distribution over the object, typically leading to:
    *   **Increased Form Drag:** The low-pressure region in the wake behind the object creates a large pressure difference between the front and back, pulling the object backward.
    *   **Reduced Lift (for airfoils):** For wings, separation on the upper surface destroys the low-pressure region that generates lift.
*   **What could go wrong:** Believing separation only causes drag. For lifting bodies like wings, it also critically reduces lift. Not understanding that separation is a *consequence* of the adverse pressure gradient and momentum loss, not a cause.

## 5. Worked examples — multiple, with every step shown

### Example 1: Qualitative Analysis of Flow over a Cylinder

**Problem:** Describe the pressure distribution and expected boundary layer separation points for steady, incompressible flow over a smooth, stationary circular cylinder. Assume a sufficiently high Reynolds number for a boundary layer to form but not so high as to be fully turbulent everywhere.

**Identify what's given and what we want:**
*   **Given:** Smooth, stationary circular cylinder, steady, incompressible flow, moderate Reynolds number.
*   **Want:** Description of pressure distribution, identification of favorable/adverse pressure gradients, and prediction of separation points.

**Solution:**

1.  **Stagnation Point (Front):**
    *   **Explanation:** At the very front of the cylinder (the leading edge, $\theta = 0^\circ$), the fluid comes to a complete stop relative to the cylinder. This is the stagnation point.
    *   **Pressure:** According to Bernoulli's principle, where velocity is zero, pressure is at its maximum (stagnation pressure).
    *   **Gradient:** There is no pressure gradient *at* the stagnation point itself.
    *   **Velocity:** $u = 0$.

2.  **Flow Acceleration (Front to Shoulder):**
    *   **Explanation:** As the fluid moves from the front stagnation point around the curved surface towards the "shoulder" (approximately $\theta = 0^\circ$ to $90^\circ$), the streamlines constrict, and the fluid accelerates.
    *   **Pressure:** Due to this acceleration, the pressure decreases from its maximum at the stagnation point.
    *   **Gradient:** This is a **favorable pressure gradient** ($dP/dx < 0$). This gradient helps to keep the boundary layer thin and attached, as it continuously pulls the fluid forward.
    *   **Velocity:** The freestream velocity $U_e$ increases, reaching a maximum around $\theta = 90^\circ$. The boundary layer remains attached.

3.  **Flow Deceleration (Shoulder to Rear):**
    *   **Explanation:** Beyond the shoulder (approximately $\theta = 90^\circ$ to $180^\circ$), the streamlines expand, and the fluid in the freestream begins to decelerate as it moves towards the rear of the cylinder.
    *   **Pressure:** As the freestream velocity decreases, the pressure starts to increase.
    *   **Gradient:** This is an **adverse pressure gradient** ($dP/dx > 0$). This gradient works against the flow, trying to slow it down.
    *   **Velocity:** The freestream velocity $U_e$ decreases.

4.  **Boundary Layer Separation:**
    *   **Explanation:** The adverse pressure gradient encountered from the shoulder onwards acts upon the boundary layer. The fluid particles closest to the wall have already lost significant momentum due to viscous friction. As they try to push against the rising pressure, they eventually lose all forward momentum, stop, and then reverse direction.
    *   **Separation Point:** This flow reversal marks the point of boundary layer separation. For a smooth cylinder in laminar flow, separation typically occurs around $\theta = 80^\circ$ to $82^\circ$ from the front stagnation point. In turbulent flow, the boundary layer has more momentum and can resist the adverse pressure gradient for longer, causing separation to occur further downstream, typically around $\theta = 100^\circ$ to $120^\circ$.
    *   **Consequence:** After separation, a large low-pressure wake forms behind the cylinder. This wake contributes significantly to form drag.

5.  **Wake Formation:**
    *   **Explanation:** The separated boundary layer forms a shear layer that encloses a region of recirculating, often turbulent, flow behind the cylinder. This region is characterized by low pressure.

**Final Answer:**
**For flow over a cylinder, the flow accelerates from the front stagnation point to the shoulder (approx. 90 degrees), experiencing a favorable pressure gradient. Beyond the shoulder, the flow decelerates, leading to an adverse pressure gradient. This adverse pressure gradient, combined with viscous effects, causes the boundary layer to separate from the cylinder surface, typically between 80-120 degrees from the front, forming a large, low-pressure wake behind the cylinder.**

**Reflection:** This example highlights the qualitative link between geometry, pressure distribution, and separation. It emphasizes that separation is a consequence of the adverse pressure gradient overwhelming the weakened boundary layer. The precise angle depends on the Reynolds number and whether the boundary layer is laminar or turbulent, illustrating the complexity even for simple shapes.

### Example 2: Condition for Separation from a Simplified Velocity Profile

**Problem:** A theoretical, simplified boundary layer velocity profile near a wall is given by $u(y) = Ay^2 - By^3$, where $y$ is the distance from the wall, and $A$ and $B$ are positive constants. If this profile represents the flow *exactly at the point of separation*, determine the relationship between $A$ and $B$. Assume $y$ is much smaller than the boundary layer thickness $\delta$.

**Identify what's given and what we want:**
*   **Given:** Velocity profile $u(y) = Ay^2 - By^3$. This profile is *at the point of separation*.
*   **Want:** Relationship between $A$ and $B$ that satisfies the separation condition.

**Solution:**

1.  **Recall the definition of separation:**
    *   **Explanation:** Boundary layer separation occurs when the wall shear stress $\tau_w$ becomes zero. Since $\tau_w = \mu (\partial u / \partial y)_{y=0}$, this means the velocity gradient at the wall must be zero.
    *   **Formal Step:** The condition for separation is:
        $$ \left( \frac{\partial u}{\partial y} \right)_{y=0} = 0 $$

2.  **Calculate the derivative of the given velocity profile with respect to $y$:**
    *   **Explanation:** We need to find how the velocity changes as we move away from the wall.
    *   **Formal Step:**
        Given $u(y) = Ay^2 - By^3$
        $$ \frac{\partial u}{\partial y} = \frac{\partial}{\partial y}(Ay^2 - By^3) $$
        $$ \frac{\partial u}{\partial y} = 2Ay - 3By^2 $$

3.  **Apply the separation condition at the wall ($y=0$):**
    *   **Explanation:** We substitute $y=0$ into the derivative to find the velocity gradient right at the surface.
    *   **Formal Step:**
        $$ \left( \frac{\partial u}{\partial y} \right)_{y=0} = 2A(0) - 3B(0)^2 $$
        $$ \left( \frac{\partial u}{\partial y} \right)_{y=0} = 0 $$

4.  **Interpret the result and determine the relationship:**
    *   **Explanation:** The calculation shows that for the given profile, the velocity gradient at the wall is *always* zero. This means that *any* profile of the form $u(y) = Ay^2 - By^3$ inherently satisfies the condition for separation at $y=0$. This type of profile is often used to *model* the flow *at* separation, where the wall shear stress is zero, and the velocity starts to increase away from the wall but with zero slope right at the wall.
    *   **Formal Step:** The relationship is simply that the profile itself *is* a separating profile. No specific relationship between A and B is *derived* from the separation condition itself, beyond the fact that they must be chosen such that $u(y)$ makes physical sense (e.g., positive $u$ for small $y>0$). For a physically realistic profile, A and B would be related to the freestream velocity and boundary layer thickness, and potentially the pressure gradient. However, for this specific problem, the profile *already* embodies the separation condition.

**Final Answer:**
**For the given velocity profile $u(y) = Ay^2 - By^3$ to represent the flow exactly at the point of separation, the condition $(\partial u / \partial y)_{y=0} = 0$ must be met. Calculating the derivative yields $\partial u / \partial y = 2Ay - 3By^2$. Evaluating this at $y=0$ gives $0$. Therefore, any profile of the form $u(y) = Ay^2 - By^3$ inherently satisfies the zero wall shear stress condition at $y=0$. No further specific relationship between $A$ and $B$ is *derived* from this condition alone; rather, the profile form itself is characteristic of separation at the wall.**

**Reflection:** This example demonstrates the mathematical definition of separation. It's crucial to understand that a profile like $u(y) = Ay^2 - By^3$ *starts* with a zero slope at the wall, which is the defining characteristic of separation. If the profile were, for example, $u(y) = Ay - By^2$, then $du/dy|_0 = A$, and for separation, we would need $A=0$. This example shows how the mathematical form directly encodes the physical condition.

### Example 3: Diffuser Performance and Separation

**Problem:** A diffuser is a duct designed to slow down fluid flow and increase its static pressure. Explain why a diffuser with too large an expansion angle (i.e., too rapidly expanding cross-sectional area) will experience boundary layer separation and reduced efficiency.

**Identify what's given and what we want:**
*   **Given:** Diffuser, large expansion angle.
*   **Want:** Explanation of separation and reduced efficiency.

**Solution:**

1.  **Diffuser's Purpose and Ideal Flow:**
    *   **Explanation:** A diffuser's primary goal is to convert kinetic energy (high velocity) into pressure energy (high static pressure). This is achieved by gradually increasing the cross-sectional area of the duct, which causes the fluid to slow down.
    *   **Formal Step:** According to the continuity equation for incompressible flow ($A_1V_1 = A_2V_2$), if $A_2 > A_1$, then $V_2 < V_1$. By Bernoulli's principle ($P + \frac{1}{2}\rho V^2 = \text{constant}$), a decrease in velocity implies an increase in pressure.

2.  **Pressure Gradient in a Diffuser:**
    *   **Explanation:** For the pressure to increase in the direction of flow, there must be a positive pressure gradient along the diffuser's length. This is inherently an adverse pressure gradient ($dP/dx > 0$).
    *   **Formal Step:** A diffuser creates an adverse pressure gradient to achieve its purpose of pressure recovery.

3.  **Effect of a Large Expansion Angle:**
    *   **Explanation:** If the diffuser's expansion angle is too large, the cross-sectional area increases very rapidly over a short distance. This forces a very rapid deceleration of the main flow.
    *   **Formal Step:** A rapid increase in area ($dA/dx$ is large) leads to a rapid decrease in velocity ($dV/dx$ is large and negative), which in turn, by Bernoulli's principle, implies a very strong (large positive) adverse pressure gradient ($dP/dx$ is large and positive).

4.  **Boundary Layer's Vulnerability:**
    *   **Explanation:** The fluid in the boundary layer near the diffuser walls is already moving slowly due to viscous friction. It has less kinetic energy and momentum compared to the freestream.
    *   **Formal Step:** The wall shear stress $\tau_w = \mu (\partial u / \partial y)_{y=0}$ is positive in attached flow, but the fluid near the wall has significantly less momentum to overcome an adverse pressure gradient.

5.  **Separation Due to Strong Adverse Pressure Gradient:**
    *   **Explanation:** When the adverse pressure gradient becomes excessively strong due to a large expansion angle, the slow-moving fluid in the boundary layer cannot overcome this "uphill climb" in pressure. It quickly loses all its forward momentum, stops, and reverses direction. This causes the boundary layer to separate from the diffuser walls.
    *   **Formal Step:** The strong $dP/dx > 0$ term in the boundary layer momentum equation quickly drives $(\partial u / \partial y)_{y=0}$ to zero, leading to separation.

6.  **Reduced Efficiency:**
    *   **Explanation:** Once separation occurs, the effective flow area of the diffuser is reduced, as the separated region (wake) no longer contributes to efficient flow. Instead, it becomes a region of turbulent, recirculating flow with significant energy dissipation. This leads to:
        *   **Poor Pressure Recovery:** The actual pressure rise achieved is much less than intended because the flow isn't smoothly decelerating throughout the entire duct.
        *   **Increased Energy Losses:** The turbulent mixing and recirculation in the separated region consume energy, reducing the overall efficiency of the diffuser.
    *   **Formal Step:** The separated flow creates a large form drag and reduces the pressure recovery coefficient $C_p = (P_2 - P_1) / (0.5 \rho V_1^2)$, making it much lower than the ideal value.

**Final Answer:**
**A diffuser with too large an expansion angle creates a very strong adverse pressure gradient. This rapid pressure increase overwhelms the low-momentum fluid in the boundary layer near the walls. Consequently, the boundary layer separates from the diffuser walls. This separation leads to the formation of a turbulent, recirculating wake, which effectively reduces the functional area of the diffuser, causes significant energy losses, and results in much lower pressure recovery and overall reduced efficiency than intended.**

**Reflection:** This example illustrates a common engineering trade-off. Diffusers are designed to increase pressure, which inherently requires an adverse pressure gradient. The challenge is to manage this gradient to prevent separation, often by using gradual expansion angles or flow control techniques.

### Example 4: Airfoil Stall at High Angle of Attack

**Problem:** Explain how increasing the angle of attack of an aircraft wing (airfoil) leads to boundary layer separation on the upper surface and ultimately causes aerodynamic stall.

**Identify what's given and what we want:**
*   **Given:** Airfoil, increasing angle of attack.
*   **Want:** Explanation of separation on the upper surface and stall.

**Solution:**

1.  **Lift Generation at Low Angle of Attack:**
    *   **Explanation:** At a low angle of attack, the airfoil deflects air downwards, creating an upward reaction force (lift). On the upper surface, the air accelerates significantly, creating a region of low pressure. On the lower surface, the air slows down slightly, creating higher pressure.
    *   **Pressure Gradient:** The strong acceleration on the upper surface creates a favorable pressure gradient ($dP/dx < 0$) over the front portion, followed by an adverse pressure gradient ($dP/dx > 0$) over the rear portion as the flow decelerates to meet the trailing edge. The boundary layer remains attached.

2.  **Increasing Angle of Attack:**
    *   **Explanation:** As the angle of attack ($\alpha$) increases, the airfoil presents a steeper face to the oncoming air. This intensifies the curvature of the streamlines over the upper surface.
    *   **Pressure Distribution Change:** The peak suction (lowest pressure) on the upper surface moves forward and becomes more intense. The flow accelerates even more dramatically over the leading edge. However, the subsequent deceleration required for the flow to reach the trailing edge and match ambient pressure becomes much steeper.
    *   **Formal Step:** The magnitude of the favorable pressure gradient over the leading edge increases, but critically, the magnitude of the **adverse pressure gradient** over the rear portion of the upper surface also increases significantly.

3.  **Boundary Layer Weakening:**
    *   **Explanation:** The fluid in the boundary layer on the upper surface is constantly losing momentum due to viscous friction with the wing surface. This effect is more pronounced closer to the surface.

4.  **Separation Due to Strong Adverse Pressure Gradient:**
    *   **Explanation:** As the angle of attack continues to increase, the adverse pressure gradient on the upper surface becomes so strong that the slow-moving fluid within the boundary layer can no longer overcome it. The flow near the surface stops, reverses, and the boundary layer detaches from the upper surface of the wing. This separation typically starts near the trailing edge and moves forward as the angle of attack increases further.
    *   **Formal Step:** The condition $(\partial u / \partial y)_{y=0} = 0$ is met at some point on the upper surface, and the boundary layer lifts off.

5.  **Aerodynamic Stall:**
    *   **Explanation:** Once separation occurs over a significant portion of the upper surface, the smooth, low-pressure region that generates most of the lift is destroyed. Instead, a large, turbulent wake forms above the wing.
    *   **Consequences:**
        *   **Loss of Lift:** The ability of the wing to generate lift is drastically reduced, often quite suddenly.
        *   **Increase in Drag:** The large wake creates significant form drag, pulling the aircraft backward.
        *   **Loss of Control:** The turbulent flow can also cause loss of control authority for control surfaces.
    *   **Formal Step:** The lift coefficient ($C_L$) reaches a maximum (the "stall angle") and then rapidly decreases, while the drag coefficient ($C_D$) increases sharply.

**Final Answer:**
**As an airfoil's angle of attack increases, the curvature of the flow over its upper surface becomes more pronounced. This leads to a stronger acceleration over the leading edge (favorable pressure gradient) but, more critically, a much stronger and more extensive adverse pressure gradient over the rear portion of the upper surface. This strong adverse pressure gradient overwhelms the low-momentum fluid in the boundary layer, causing it to separate from the wing surface. This separation destroys the low-pressure region responsible for lift, resulting in a sudden and dramatic loss of lift, a sharp increase in drag, and a loss of control, a phenomenon known as aerodynamic stall.**

**Reflection:** This example demonstrates the critical link between angle of attack, pressure gradients, and the practical consequence of stall in aerospace engineering. It highlights how a seemingly small change (angle of attack) can lead to a fundamental change in flow behavior.

## 6. Common mistakes and traps

1.  **Confusing Separation with Turbulence:** While turbulent boundary layers are generally more resistant to separation than laminar ones (due to better mixing and momentum transfer), separation itself is a distinct phenomenon (flow reversal at the wall), not simply turbulence. A flow can be turbulent and attached, or laminar and separated.
2.  **Ignoring Viscosity:** Some students might try to explain separation solely based on pressure gradients and Bernoulli's principle. However, Bernoulli's principle applies to inviscid flow. Separation is fundamentally a viscous phenomenon; without viscosity, there is no boundary layer, no no-slip condition, and no mechanism for the flow near the wall to lose momentum and reverse.
3.  **Misinterpreting Pressure Gradients:** Assuming that if velocity decreases, pressure *must* decrease. This is incorrect. If freestream velocity decreases, pressure *increases* (adverse pressure gradient). This is often a misapplication of Bernoulli's principle or a misunderstanding of how pressure and velocity relate.
4.  **Thinking Separation is Always "Bad":** While often undesirable (e.g., stall, increased drag), separation can sometimes be intentionally induced or managed. For example, in some diffusers, a small amount of controlled separation might be acceptable, or vortex generators are used to *induce* small, controlled separations to energize the boundary layer and delay larger, catastrophic separation.
5.  **Assuming Separation is Instantaneous:** Separation doesn't happen across the entire boundary layer simultaneously. It begins right at the wall, where the velocity gradient becomes zero, and then propagates outwards and upstream as the adverse pressure gradient intensifies.
6.  **Focusing only on the Freestream:** While the freestream pressure gradient dictates the overall conditions, the actual separation event occurs within the boundary layer, where the viscous effects are dominant and the fluid's momentum is lowest. It's the interaction between the external pressure gradient and the internal viscous retardation that causes separation.

## 7. Textbook-precise explanation

Boundary layer separation occurs when a fluid flow, moving along a solid surface, detaches from that surface due to the inability of the fluid within the boundary layer to overcome an adverse pressure gradient.

Consider a steady, incompressible, two-dimensional flow over a curved surface. The flow is characterized by a thin boundary layer adjacent to the surface, where viscous effects are significant, and an outer inviscid flow region. The pressure distribution in the boundary layer is largely dictated by the pressure in the outer inviscid flow, which can be related to the outer edge velocity $U_e(x)$ via Bernoulli's principle: $P(x) + \frac{1}{2}\rho U_e(x)^2 = \text{constant}$.

An **adverse pressure gradient** exists when the static pressure increases in the direction of flow, i.e., $dP/dx > 0$. According to Bernoulli's principle, this corresponds to a deceleration of the freestream velocity, $dU_e/dx < 0$.

The governing equation for the boundary layer momentum in the x-direction (parallel to the surface) for steady, incompressible flow is:

$$ u \frac{\partial u}{\partial x} + v \frac{\partial u}{\partial y} = -\frac{1}{\rho}\frac{dP}{dx} + \nu \frac{\partial^2 u}{\partial y^2} $$

where $u$ and $v$ are velocity components in $x$ and $y$ directions, $\rho$ is density, $\nu$ is kinematic viscosity, and $P$ is pressure.

Near the wall ($y \approx 0$), the velocity $u$ is very small, approaching zero at $y=0$ due to the no-slip condition. In this region, the inertial terms ($u \frac{\partial u}{\partial x} + v \frac{\partial u}{\partial y}$) become negligible compared to the pressure gradient and viscous terms. Thus, near the wall, the momentum equation simplifies to:

$$ 0 \approx -\frac{1}{\rho}\frac{dP}{dx} + \nu \frac{\partial^2 u}{\partial y^2} $$

This implies that:

$$ \nu \frac{\partial^2 u}{\partial y^2} \approx \frac{1}{\rho}\frac{dP}{dx} $$

If an adverse pressure gradient ($dP/dx > 0$) is present, then $\frac{\partial^2 u}{\partial y^2}$ must also be positive near the wall. This means the curvature of the velocity profile, $\frac{\partial u}{\partial y}$, increases with $y$ near the wall.

The defining condition for boundary layer separation is that the wall shear stress, $\tau_w$, becomes zero. Since $\tau_w = \mu \left( \frac{\partial u}{\partial y} \right)_{y=0}$, separation occurs when:

$$ \left( \frac{\partial u}{\partial y} \right)_{y=0} = 0 $$

Physically, this means that at the point of separation, the fluid particles immediately adjacent to the wall have lost all their forward momentum due to the combined effects of viscous friction and the adverse pressure gradient, and are on the verge of reversing direction. Beyond the separation point, the velocity profile near the wall will exhibit negative values of $u$, indicating reversed flow, and the boundary layer detaches from the surface, forming a region of recirculating flow (a wake or separation bubble).

This phenomenon is critical in aerodynamics, turbomachinery, and hydraulic engineering, significantly impacting drag, lift, and overall system efficiency.

**References:**
*   White, F. M. (2016). *Fluid Mechanics* (8th ed.). McGraw-Hill Education. (Chapter 7: Boundary Layers)
*   Kundu, P. K., Cohen, I. M., & Dowling, D. R. (2012). *Fluid Mechanics* (5th ed.). Academic Press. (Chapter 10: Boundary Layers)
*   Schlichting, H., & Gersten, K. (2017). *Boundary-Layer Theory* (9th ed.). Springer. (Chapter 12: Separation)

## 8. ASCII diagrams

Here's an ASCII diagram illustrating boundary layer separation on an airfoil:

```text
       -----------------------------------------------------
      /                                                     \
     /                                                       \
    /                                                         \
   /        <-- Attached Flow (Favorable P.G.)                 \
  /                                                             \
 |                                                               |
 |        ----------------------------------------------------   | <-- Airfoil (Upper Surface)
 |       /                                                  \    |
 |      /                                                    \   |
 |     /                                                      \  |
 |    /                                                        \ |
 |   /                                                          \|
 |  |                                                            |
 |  |                                                            |
 |  |                                                            |
 |  |                                                            |
 |  |                                                            |
 |  |                                                            |
 |  |                                                            |
 |  |                                                            |
 |  |                                                            |
 |  |                                                            |
 |  |                                                            |
 |  |                                                            |
 |  |                                                            |
 |  |                                                            |
 |  |                                                            |
 |  |                                                            |
 |  |                                                            |
 |  |                                                            |
 |  |                                                            |
 |  |       ---------------------------------------------------  |
 |  |      /                                                  \ |
 |  |     /                                                    \|
 |  |    /                                                      \
 |  |   /                                                        \
 |  |  |                                                          \
 |  |  |                                                           \
 |  |  |                                                            \
 |  |  |                                                             \
 |  |  |                                                              \
 |  |  |                                                               \
 |  |  |                                                                \
 |  |  |                                                                 \
 |  |  |                                                                  \
 |  |  |                                                                   \
 |  |  |                                                                    \
 |  |  |                                                                     \
 |  |  |                                                                      \
 |  |  |                                                                       \
 |  |  |                                                                        \
 |  |  |                                                                         \
 |  |  |                                                                          \
 |  |  |                                                                           \
 |  |  |                                                                            \
 |  |  |                                                                             \
 |  |  |                                                                              \
 |  |  |                                                                               \
 |  |  |                                                                                \
 |  |  |                                                                                 \
 |  |  |                                                                                  \
 |  |  |                                                                                   \
 |  |  |                                                                                    \
 |  |  |                                                                                     \
 |  |  |                                                                                      \
 |  |  |                                                                                       \
 |  |  |                                                                                        \
 |  |  |                                                                                         \
 |  |  |                                                                                          \
 |  |  |                                                                                           \
 |  |  |                                                                                            \
 |  |  |                                                                                             \
 |  |  |                                                                                              \
 |  |  |                                                                                               \
 |  |  |                                                                                                \
 |  |  |                                                                                                 \
 |  |  |                                                                                                  \
 |  |  |                                                                                                   \
 |  |  |                                                                                                    \
 |  |  |                                                                                                     \
 |  |  |                                                                                                      \
 |  |  |                                                                                                       \
 |  |  |                                                                                                        \
 |  |  |                                                                                                         \
 |  |  |                                                                                                          \
 |  |  |                                                                                                           \
 |  |  |                                                                                                            \
 |  |  |                                                                                                             \
 |  |  |                                                                                                              \
 |  |  |                                                                                                               \
 |  |  |                                                                                                                \
 |  |  |                                                                                                                 \
 |  |  |                                                                                                                  \
 |  |  |                                                                                                                   \
 |  |  |                                                                                                                    \
 |  |  |                                                                                                                     \
 |  |  |                                                                                                                      \
 |  |  |                                                                                                                       \
 |  |  |                                                                                                                        \
 |  |  |                                                                                                                         \
 |  |  |                                                                                                                          \
 |  |  |                                                                                                                           \
 |  |  |                                                                                                                            \
 |  |  |                                                                                                                             \
 |  |  |                                                                                                                              \
 |  |  |                                                                                                                               \
 |  |  |                                                                                                                                \
 |  |  |                                                                                                                                 \
 |  |  |                                                                                                                                  \
 |  |  |                                                                                                                                   \
 |  |  |                                                                                                                                    \
 |  |  |                                                                                                                                     \
 |  |  |                                                                                                                                      \
 |  |  |                                                                                                                                       \
 |  |  |                                                                                                                                        \
 |  |  |                                                                                                                                         \
 |  |  |                                                                                                                                          \
 |  |  |                                                                                                                                           \
 |  |  |                                                                                                                                            \
 |  |  |                                                                                                                                             \
 |  |  |                                                                                                                                              \
 |  |  |                                                                                                                                               \
 |  |  |                                                                                                                                                \
 |  |  |                                                                                                                                                 \
 |  |  |                                                                                                                                                  \
 |  |  |                                                                                                                                                   \
 |  |  |                                                                                                                                                    \
 |  |  |                                                                                                                                                     \
 |  |  |                                                                                                                                                      \
 |  |  |                                                                                                                                                       \
 |  |  |                                                                                                                                                        \
 |  |  |                                                                                                                                                         \
 |  |  |                                                                                                                                                          \
 |  |  |                                                                                                                                                           \
 |  |  |                                                                                                                                                            \
 |  |  |                                                                                                                                                             \
 |  |  |                                                                                                                                                              \
 |  |  |                                                                                                                                                               \
 |  |  |                                                                                                                                                                \
 |  |  |                                                                                                                                                                 \
 |  |  |                                                                                                                                                                  \
 |  |  |                                                                                                                                                                   \
 |  |  |                                                                                                                                                                    \
 |  |  |                                                                                                                                                                     \
 |  |  |                                                                                                                                                                      \
 |  |  |                                                                                                                                                                       \
 |  |  |                                                                                                                                                                        \
 |  |  |                                                                                                                                                                         \
 |  |  |                                                                                                                                                                          \
 |  |  |                                                                                                                                                                           \
 |  |  |                                                                                                                                                                            \
 |  |  |                                                                                                                                                                             \
 |  |  |                                                                                                                                                                              \
 |  |  |                                                                                                                                                                               \
 |  |  |                                                                                                                                                                                \
 |  |  |                                                                                                                                                                                 \
 |  |  |                                                                                                                                                                                  \
 |  |  |                                                                                                                                                                                   \
 |  |  |                                                                                                                                                                                    \
 |  |  |                                                                                                                                                                                     \
 |  |  |                                                                                                                                                                                      \
 |  |  |                                                                                                                                                                                       \
 |  |  |                                                                                                                                                                                        \
 |  |  |                                                                                                                                                                                         \
 |  |  |                                                                                                                                                                                          \
 |  |  |                                                                                                                                                                                           \
 |  |  |                                                                                                                                                                                            \
 |  |  |                                                                                                                                                                                             \
 |  |  |                                                                                                                                                                                              \
 |  |  |                                                                                                                                                                                               \
 |  |  |                                                                                                                                                                                                \
 |  |  |                                                                                                                                                                                                 \
 |  |  |                                                                                                                                                                                                  \
 |  |  |                                                                                                                                                                                                   \
 |  |  |                                                                                                                                                                                                    \
 |  |  |                                                                                                                                                                                                     \
 |  |  |                                                                                                                                                                                                      \
 |  |  |                                                                                                                                                                                                       \
 |  |  |                                                                                                                                                                                                        \
 |  |  |                                                                                                                                                                                                         \
 |  |  |                                                                                                                                                                                                          \
 |  |  |                                                                                                                                                                                                           \
 |  |  |                                                                                                                                                                                                            \
 |  |  |                                                                                                                                                                                                             \
 |  |  |                                                                                                                                                                                                              \
 |  |  |                                                                                                                                                                                                               \
 |  |  |                                                                                                                                                                                                                \
 |  |  |                                                                                                                                                                                                                 \
 |  |  |                                                                                                                                                                                                                  \
 |  |  |                                                                                                                                                                                                                   \
 |  |  |                                                                                                                                                                                                                    \
 |  |  |                                                                                                                                                                                                                     \
 |  |  |                                                                                                                                                                                                                      \
 |  |  |                                                                                                                                                                                                                       \
 |  |  |                                                                                                                                                                                                                        \
 |  |  |                                                                                                                                                                                                                         \
 |  |  |                                                                                                                                                                                                                          \
 |  |  |                                                                                                                                                                                                                           \
 |  |  |                                                                                                                                                                                                                            \
 |  |  |                                                                                                                                                                                                                             \
 |  |  |                                                                                                                                                                                                                              \
 |  |  |                                                                                                                                                                                                                               \
 |  |  |                                                                                                                                                                                                                                \
 |  |  |                                                                                                                                                                                                                                 \
 |  |  |                                                                                                                                                                                                                                  \
 |  |  |                                                                                                                                                                                                                                   \
 |  |  |                                                                                                                                                                                                                                    \
 |  |  |                                                                                                                                                                                                                                     \
 |  |  |                                                                                                                                                                                                                                      \
 |  |  |                                                                                                                                                                                                                                       \
 |  |  |                                                                                                                                                                                                                                        \
 |  |  |                                                                                                                                                                                                                                         \
 |  |  |                                                                                                                                                                                                                                          \
 |  |  |                                                                                                                                                                                                                                           \
 |  |  |                                                                                                                                                                                                                                            \
 |  |  |                                                                                                                                                                                                                                             \
 |  |  |                                                                                                                                                                                                                                              \
 |  |  |                                                                                                                                                                                                                                               \
 |  |  |                                                                                                                                                                                                                                                \
 |  |  |                                                                                                                                                                                                                                                 \
 |  |  |                                                                                                                                                                                                                                                  \
 |  |  |                                                                                                                                                                                                                                                   \
 |  |  |                                                                                                                                                                                                                                                    \
 |  |  |                                                                                                                                                                                                                                                     \
 |  |  |                                                                                                                                                                                                                                                      \
 |  |  |                                                                                                                                                                                                                                                       \
 |  |  |                                                                                                                                                                                                                                                        \
 |  |  |                                                                                                                                                                                                                                                         \
 |  |  |                                                                                                                                                                                                                                                          \
 |  |  |                                                                                                                                                                                                                                                           \
 |  |  |                                                                                                                                                                                                                                                            \
 |  |  |                                                                                                                                                                                                                                                             \
 |  |  |                                                                                                                                                                                                                                                              \
 |  |  |                                                                                                                                                                                                                                                               \
 |  |  |                                                                                                                                                                                                                                                                \
 |  |  |                                                                                                                                                                                                                                                                 \
 |  |  |                                                                                                                                                                                                                                                                  \
 |  |  |                                                                                                                                                                                                                                                                   \
 |  |  |                                                                                                                                                                                                                                                                    \
 |  |  |                                                                                                                                                                                                                                                                     \
 |  |  |                                                                                                                                                                                                                                                                      \
 |  |  |                                                                                                                                                                                                                                                                       \
 |  |  |                                                                                                                                                                                                                                                                        \
 |  |  |                                                                                                                                                                                                                                                                         \
 |  |  |                                                                                                                                                                                                                                                                          \
 |  |  |                                                                                                                                                                                                                                                                           \
 |  |  |                                                                                                                                                                                                                                                                            \
 |  |  |                                                                                                                                                                                                                                                                             \
 |  |  |                                                                                                                                                                                                                                                                              \
 |  |  |                                                                                                                                                                                                                                                                               \
 |  |  |                                                                                                                                                                                                                                                                                \
 |  |  |                                                                                                                                                                                                                                                                                 \
 |  |  |                                                                                                                                                                                                                                                                                  \
 |  |  |                                                                                                                                                                                                                                                                                   \
 |  |  |                                                                                                                                                                                                                                                                                    \
 |  |  |                                                                                                                                                                                                                                                                                     \
 |  |  |                                                                                                                                                                                                                                                                                      \
 |  |  |                                                                                                                                                                                                                                                                                       \
 |  |  |                                                                                                                                                                                                                                                                                        \
 |  |  |                                                                                                                                                                                                                                                                                         \
 |  |  |                                                                                                                                                                                                                                                                                          \
 |  |  |                                                                                                                                                                                                                                                                                           \
 |  |  |                                                                                                                                                                                                                                                                                            \
 |  |  |                                                                                                                                                                                                                                                                                             \
 |  |  |                                                                                                                                                                                                                                                                                              \
 |  |  |                                                                                                                                                                                                                                                                                               \
 |  |  |                                                                                                                                                                                                                                                                                                \
 |  |  |                                                                                                                                                                                                                                                                                                 \
 |  |  |                                                                                                                                                                                                                                                                                                  \
 |  |  |                                                                                                                                                                                                                                                                                                   \
 |  |  |                                                                                                                                                                                                                                                                                                    \
 |  |  |                                                                                                                                                                                                                                                                                                     \
 |  |  |                                                                                                                                                                                                                                                                                                      \
 |  |  |                                                                                                                                                                                                                                                                                                       \
 |  |  |                                                                                                                                                                                                                                                                                                        \
 |  |  |                                                                                                                                                                                                                                                                                                         \
 |  |  |                                                                                                                                                                                                                                                                                                          \
 |  |  |                                                                                                                                                                                                                                                                                                           \
 |  |  |                                                                                                                                                                                                                                                                                                            \
 |  |  |                                                                                                                                                                                                                                                                                                             \
 |  |  |                                                                                                                                                                                                                                                                                                              \
 |  |  |                                                                                                                                                                                                                                                                                                               \
 |  |  |                                                                                                                                                                                                                                                                                                                \
 |  |  |                                                                                                                                                                                                                                                                                                                 \
 |  |  |                                                                                                                                                                                                                                                                                                                  \
 |  |  |                                                                                                                                                                                                                                                                                                                   \
 |  |  |                                                                                                                                                                                                                                                                                                                    \
 |  |  |                                                                                                                                                                                                                                                                                                                     \
 |  |  |                                                                                                                                                                                                                                                                                                                      \
 |  |  |                                                                                                                                                                                                                                                                                                                       \
 |  |  |                                                                                                                                                                                                                                                                                                                        \
 |  |  |                                                                                                                                                                                                                                                                                                                         \
 |  |  |                                                                                                                                                                                                                                                                                                                          \
 |  |  |                                                                                                                                                                                                                                                                                                                           \
 |  |  |                                                                                                                                                                                                                                                                                                                            \
 |  |  |                                                                                                                                                                                                                                                                                                                             \
 |  |  |                                                                                                                                                                                                                                                                                                                              \
 |  |  |                                                                                                                                                                                                                                                                                                                               \
 |  |  |                                                                                                                                                                                                                                                                                                                                \
 |  |  |                                                                                                                                                                                                                                                                                                                                 \
 |  |  |                                                                                                                                                                                                                                                                                                                                  \
 |  |  |                                                                                                                                                                                                                                                                                                                                   \
 |  |  |                                                                                                                                                                                                                                                                                                                                    \
 |  |  |                                                                                                                                                                                                                                                                                                                                     \
 |  |  |                                                                                                                                                                                                                                                                                                                                      \
 |  |  |                                                                                                                                                                                                                                                                                                                                       \
 |  |  |                                                                                                                                                                                                                                                                                                                                        \
 |  |  |                                                                                                                                                                                                                                                                                                                                         \
 |  |  |                                                                                                                                                                                                                                                                                                                                          \
 |  |  |                                                                                                                                                                                                                                                                                                                                           \
 |  |  |                                                                                                                                                                                                                                                                                                                                            \
 |  |  |                                                                                                                                                                                                                                                                                                                                             \
 |  |  |                                                                                                                                                                                                                                                                                                                                              \
 |  |  |                                                                                                                                                                                                                                                                                                                                               \
 |  |  |                                                                                                                                                                                                                                                                                                                                                \
 |  |  |                                                                                                                                                                                                                                                                                                                                                 \
 |  |  |                                                                                                                                                                                                                                                                                                                                                  \
 |  |  |                                                                                                                                                                                                                                                                                                                                                   \
 |  |  |                                                                                                                                                                                                                                                                                                                                                    \
 |  |  |                                                                                                                                                                                                                                                                                                                                                     \
 |  |  |                                                                                                                                                                                                                                                                                                                                                      \
 |  |  |                                                                                                                                                                                                                                                                                                                                                       \
 |  |  |                                                                                                                                                                                                                                                                                                                                                        \
 |  |  |                                                                                                                                                                                                                                                                                                                                                         \
 |  |  |                                                                                                                                                                                                                                                                                                                                                          \
 |  |  |                                                                                                                                                                                                                                                                                                                                                           \
 |  |  |                                                                                                                                                                                                                                                                                                                                                            \
 |  |  |                                                                                                                                                                                                                                                                                                                                                             \
 |  |  |                                                                                                                                                                                                                                                                                                                                                              \
 |  |  |                                                                                                                                                                                                                                                                                                                                                               \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                 \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                  \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                   \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                    \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                     \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                      \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                       \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                        \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                         \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                          \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                           \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                            \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                             \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                              \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                               \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                 \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                  \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                   \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                    \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                     \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                      \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                       \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                        \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                         \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                          \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                           \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                            \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                             \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                              \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                               \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                 \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                  \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                   \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                    \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                     \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                      \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                       \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                        \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                         \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                          \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                           \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                            \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                             \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                              \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                               \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                                \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                                 \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                                  \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                                   \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                                    \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                                     \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                                      \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                                       \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                                        \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                                         \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                                          \
 |  |  |                                                                                                                                                                                                                                                                                                                                                                                                                           \
 |  |  |                                                                                                                                                                                                                                                                                                                      