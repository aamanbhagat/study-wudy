## 1. What it is — in plain English

Imagine you're trying to push a big, invisible sheet of sticky syrup across a perfectly smooth table. When you first start pushing, the syrup right next to your hand moves quickly. But the syrup touching the table surface doesn't move at all – it sticks! The syrup just above the table moves very slowly, and as you get further away from the table, the syrup moves faster and faster, until eventually, far from the table, it's moving at the speed you're pushing.

This "sticky" layer of fluid near the surface is called the **boundary layer**. It's where the fluid's speed changes significantly from zero at the surface to its full speed away from the surface.

Now, because this sticky layer slows down the fluid, it's like the solid surface is taking up more space than it actually does. If you were to ask, "How much has this sticky layer effectively 'pushed out' the main flow of syrup?", that's what **displacement thickness** tells you. It's a measure of how much the flow is "displaced" outwards due to the slowdown near the wall.

Finally, because the fluid near the surface is moving slower, it also carries less "push" or momentum. If you were to ask, "How much 'push' (momentum) has been lost from the syrup because of this sticky layer?", that's what **momentum thickness** tells you. It's a measure of the total momentum deficit in the boundary layer compared to if the entire flow was moving at full speed.

## 2. Why it matters — real-world applications

These three concepts are fundamental to understanding how fluids interact with solid surfaces, which is critical in countless engineering applications:

1.  **Aircraft Design (Aerodynamics):** The boundary layer on an aircraft wing is crucial for determining drag and lift. A thicker boundary layer, or one that separates from the wing surface, can drastically increase drag and reduce lift, making the aircraft less efficient or even unstable. Engineers at companies like **Boeing** and **Airbus** use these concepts to design wing shapes, deploy high-lift devices (flaps, slats), and manage airflow to optimize fuel efficiency and performance. Understanding displacement thickness helps predict the effective shape of the wing from the perspective of the external flow, while momentum thickness directly relates to the skin friction drag experienced by the aircraft.

2.  **Turbine and Compressor Blade Design (Propulsion/Energy):** In jet engines, gas turbines, and wind turbines, fluid (air or combustion gases) flows over intricately shaped blades. The boundary layers on these blades affect their efficiency. If the boundary layer becomes too thick or separates, it can lead to significant energy losses and reduced performance. Engineers at **General Electric Aviation** or **Siemens Energy** meticulously analyze boundary layer characteristics to design blades that maintain attached flow, minimize losses, and maximize power output or thrust. The shape factor (ratio of displacement to momentum thickness) is particularly useful here for predicting flow separation.

3.  **Heat Transfer Applications (Cooling Systems):** In many cooling systems, like those for computer chips or power electronics, heat is transferred from a hot surface to a moving fluid. The rate of heat transfer is strongly dependent on the velocity gradient within the boundary layer right at the surface. A thinner, more energetic boundary layer (often turbulent) generally leads to better heat transfer. Companies like **Intel** or **AMD** design cooling fins and fan systems where understanding boundary layer behavior helps optimize convective heat removal, preventing overheating and ensuring device longevity.

4.  **Microfluidics and Biomedical Devices:** In micro-scale devices, like those used for lab-on-a-chip applications or drug delivery, fluids move through tiny channels. The boundary layer effects dominate at these scales, often extending across the entire channel. Understanding displacement and momentum thickness helps engineers predict flow rates, mixing efficiency, and particle transport. For example, in designing a microfluidic pump or a diagnostic device, precise control over the fluid's effective channel size and momentum distribution is vital.

## 3. Prerequisites — what you must know first

Before diving deep into boundary layer thicknesses, ensure you have a solid grasp of these foundational concepts:

*   **Fluid Properties:** Understand density ($\rho$), viscosity ($\mu$), and kinematic viscosity ($\nu = \mu/\rho$).
*   **Newton's Laws of Motion:** Especially the second law, $F=ma$, and its application to fluids (momentum conservation).
*   **Continuity Equation:** The principle of conservation of mass, stating that mass flow rate into a control volume equals mass flow rate out.
*   **Velocity Profiles:** The concept that fluid velocity can vary across a flow cross-section, often being zero at a wall and increasing away from it.
*   **Shear Stress:** The tangential force per unit area exerted by a fluid on a surface or by one layer of fluid on an adjacent layer, directly related to the velocity gradient.
*   **No-Slip Condition:** The fundamental assumption that fluid immediately adjacent to a solid surface has zero relative velocity with respect to that surface.
*   **Free-Stream Velocity ($U_\infty$):** The velocity of the fluid far away from any solid boundaries, where the flow is undisturbed.
*   **Integration:** The ability to perform definite integrals, as all these thickness definitions are based on integrals of velocity profiles.

## 4. The core idea — step by step

Let's break down these concepts step by step, building from the basic idea of a boundary layer to its more nuanced characterizations.

### Step 1: The Boundary Layer Concept

*   **Plain English:** When a fluid flows over a solid surface, it "sticks" to the surface due to viscosity. This means the fluid right at the surface has zero velocity relative to the surface (the "no-slip" condition). As you move away from the surface, the fluid's speed gradually increases until it reaches the full, undisturbed speed of the fluid far away. This region where the speed changes is called the boundary layer.
*   **Small concrete example:** Imagine a flat plate placed in a steady stream of water. The water molecules touching the plate are stationary relative to the plate. Layers of water slightly above the plate move slowly, and layers further away move faster, eventually reaching the speed of the main water stream.
*   **Formal/Mathematical version:**
    Consider a two-dimensional, steady, incompressible flow over a flat plate. Let $x$ be the direction along the plate and $y$ be the direction perpendicular to the plate. The velocity component in the $x$-direction, $u$, is a function of $y$ within the boundary layer: $u = u(y)$.
    At the surface ($y=0$), $u(0) = 0$ (no-slip condition).
    Far from the surface ($y \to \infty$), $u(y) \to U_\infty$ (free-stream velocity).
    $$ u(y) \quad \text{where} \quad u(0)=0 \quad \text{and} \quad u(y) \to U_\infty \text{ as } y \to \infty $$
*   **What could go wrong:** Forgetting the no-slip condition, which is fundamental. Assuming the velocity changes abruptly from zero to $U_\infty$ instead of gradually.

### Step 2: Boundary Layer Thickness ($\delta$)

*   **Plain English:** This is the most straightforward "thickness" and represents the physical extent of the boundary layer. It's defined as the distance from the surface where the fluid's speed has almost reached the free-stream speed. We say "almost" because it never perfectly reaches $U_\infty$ due to the asymptotic nature of the velocity profile. By convention, we usually pick 99%.
*   **Small concrete example:** If the free-stream water speed is 1 meter per second, the boundary layer thickness $\delta$ is the distance from the plate where the water speed reaches 0.99 meters per second.
*   **Formal/Mathematical version:**
    The boundary layer thickness, $\delta$, is defined as the distance $y$ from the solid surface where the local velocity $u(y)$ reaches 99% of the free-stream velocity $U_\infty$.
    $$ u(y=\delta) = 0.99 U_\infty $$
*   **What could go wrong:** Thinking $\delta$ is a perfectly sharp boundary where the velocity *exactly* equals $U_\infty$. Using 100% instead of 99% (or sometimes 95% or 99.5% depending on convention, but 99% is most common).

### Step 3: Displacement Thickness ($\delta^*$)

*   **Plain English:** Because the fluid inside the boundary layer is moving slower than the free-stream velocity, it effectively reduces the amount of fluid flowing through a given cross-section. The displacement thickness is a hypothetical distance by which the solid surface would have to be shifted *outward* into the flow to account for this reduction in mass flow rate. It's like the boundary layer "pushes out" the main flow.
*   **Small concrete example:** Imagine a pipe. If a boundary layer forms on the inner walls, the effective cross-sectional area for the "main" flow is reduced. The displacement thickness tells you how much smaller this effective area is, as if the pipe walls were physically thicker.
*   **Formal/Mathematical version:**
    The displacement thickness, $\delta^*$, represents the distance by which the external potential flow streamlines are displaced from the wall due to the presence of the boundary layer. It quantifies the deficit in mass flow rate within the boundary layer compared to an ideal flow (no boundary layer, uniform $U_\infty$).
    The deficit in mass flow rate through an element $dy$ is $\rho (U_\infty - u(y)) dy$.
    If this deficit were to occur in a region of uniform velocity $U_\infty$, it would be equivalent to a "missing" area $\delta^*$ such that $\rho U_\infty \delta^*$ equals the total mass flow deficit.
    $$ \rho U_\infty \delta^* = \int_0^\delta \rho (U_\infty - u(y)) dy $$
    Dividing by $\rho U_\infty$ (assuming incompressible flow and constant density):
    $$ \delta^* = \int_0^\delta \left(1 - \frac{u(y)}{U_\infty}\right) dy $$
*   **What could go wrong:** Confusing $\delta^*$ with the actual physical thickness $\delta$. Forgetting that it represents a *deficit* in mass flow, not a physical displacement of the wall. Misinterpreting the integral term $(1 - u(y)/U_\infty)$ as the "fractional velocity deficit."

### Step 4: Momentum Thickness ($\theta$)

*   **Plain English:** Similar to displacement thickness, but focusing on momentum instead of mass. Because the fluid in the boundary layer moves slower, it carries less momentum than if it were moving at the free-stream speed. The momentum thickness is a hypothetical distance by which the solid surface would have to be shifted outward to account for this reduction in *momentum flow rate*. It's a direct measure of the drag force experienced by the surface due to friction.
*   **Small concrete example:** If you're designing a rocket nozzle, the boundary layer reduces the total momentum of the exhaust gases. The momentum thickness tells you how much "push" is effectively lost due to friction with the nozzle walls. This loss directly relates to the thrust reduction.
*   **Formal/Mathematical version:**
    The momentum thickness, $\theta$, represents the distance by which the solid surface would have to be displaced to account for the deficit in momentum flux within the boundary layer, compared to an ideal flow. It quantifies the deficit in momentum flow rate within the boundary layer compared to an ideal flow.
    The deficit in momentum flux through an element $dy$ is $\rho u(y) (U_\infty - u(y)) dy$.
    If this deficit were to occur in a region of uniform velocity $U_\infty$, it would be equivalent to a "missing" area $\theta$ such that $\rho U_\infty^2 \theta$ equals the total momentum flow deficit.
    $$ \rho U_\infty^2 \theta = \int_0^\delta \rho u(y) (U_\infty - u(y)) dy $$
    Dividing by $\rho U_\infty^2$ (assuming incompressible flow and constant density):
    $$ \theta = \int_0^\delta \frac{u(y)}{U_\infty}\left(1 - \frac{u(y)}{U_\infty}\right) dy $$
*   **What could go wrong:** Confusing momentum thickness with displacement thickness. Forgetting the $u(y)/U_\infty$ term in the integrand, which accounts for the actual momentum carried by the slower fluid. Not recognizing its direct connection to drag.

### Step 5: Shape Factor ($H$)

*   **Plain English:** The shape factor is simply the ratio of displacement thickness to momentum thickness. It's a dimensionless number that gives us a quick idea about the "shape" or "fullness" of the velocity profile within the boundary layer. A "fuller" profile (meaning the velocity quickly rises to $U_\infty$ and stays high) indicates a more energetic boundary layer, often turbulent. A "thinner" or less full profile (meaning the velocity rises slowly) suggests a less energetic, often laminar, boundary layer.
*   **Small concrete example:** For a laminar boundary layer, the velocity profile tends to be more "stretched out" near the wall, resulting in a higher shape factor (e.g., $H \approx 2.5-2.6$). For a turbulent boundary layer, the velocity profile is "fuller" (more uniform across the layer except very close to the wall), leading to a lower shape factor (e.g., $H \approx 1.3-1.4$). This difference is crucial for predicting flow separation.
*   **Formal/Mathematical version:**
    The shape factor, $H$, is a dimensionless parameter that characterizes the shape of the boundary layer velocity profile. It is defined as the ratio of the displacement thickness to the momentum thickness:
    $$ H = \frac{\delta^*}{\theta} $$
*   **What could go wrong:** Misinterpreting a higher $H$ value for a "fuller" profile; it's the opposite. A higher $H$ means a less full profile, more prone to separation.

## 5. Worked examples — multiple, with every step shown

We will work with different assumed velocity profiles within the boundary layer, from $y=0$ to $y=\delta$. For all examples, assume a steady, incompressible flow over a flat plate.

### Example 1: Linear Velocity Profile

**Problem:**
A fluid flows over a flat plate, and the velocity profile within the boundary layer is approximated by a linear relationship:
$u(y) = U_\infty \frac{y}{\delta}$ for $0 \le y \le \delta$.
Calculate the displacement thickness ($\delta^*$) and the momentum thickness ($\theta$) for this profile.

**Given:**
Velocity profile: $u(y) = U_\infty \frac{y}{\delta}$
Boundary layer thickness: $\delta$

**We want:**
$\delta^*$ and $\theta$

**Solution:**

**Part A: Calculate Displacement Thickness ($\delta^*$)**

1.  **Recall the formula for displacement thickness:**
    $$ \delta^* = \int_0^\delta \left(1 - \frac{u(y)}{U_\infty}\right) dy $$
    This formula quantifies the effective reduction in mass flow due to the slower fluid in the boundary layer.

2.  **Substitute the given velocity profile into the formula:**
    We have $\frac{u(y)}{U_\infty} = \frac{y}{\delta}$.
    $$ \delta^* = \int_0^\delta \left(1 - \frac{y}{\delta}\right) dy $$
    We are replacing the general velocity ratio with the specific linear profile given.

3.  **Perform the integration:**
    $$ \delta^* = \left[y - \frac{y^2}{2\delta}\right]_0^\delta $$
    We integrate term by term. The integral of $1$ with respect to $y$ is $y$. The integral of $\frac{y}{\delta}$ with respect to $y$ is $\frac{1}{\delta} \int y \, dy = \frac{1}{\delta} \frac{y^2}{2}$.

4.  **Evaluate the definite integral at the limits:**
    $$ \delta^* = \left(\delta - \frac{\delta^2}{2\delta}\right) - (0 - 0) $$
    $$ \delta^* = \delta - \frac{\delta}{2} $$
    We substitute the upper limit $\delta$ and subtract the result of substituting the lower limit $0$.

5.  **Simplify to get the final answer for $\delta^*$:**
    $$ \boxed{\delta^* = \frac{\delta}{2}} $$
    This means the displacement thickness for a linear profile is half of the actual boundary layer thickness.

**Part B: Calculate Momentum Thickness ($\theta$)**

1.  **Recall the formula for momentum thickness:**
    $$ \theta = \int_0^\delta \frac{u(y)}{U_\infty}\left(1 - \frac{u(y)}{U_\infty}\right) dy $$
    This formula quantifies the effective reduction in momentum flow due to the slower fluid in the boundary layer.

2.  **Substitute the given velocity profile into the formula:**
    Again, $\frac{u(y)}{U_\infty} = \frac{y}{\delta}$.
    $$ \theta = \int_0^\delta \frac{y}{\delta}\left(1 - \frac{y}{\delta}\right) dy $$
    We replace the general velocity ratio with the specific linear profile.

3.  **Expand the integrand:**
    $$ \theta = \int_0^\delta \left(\frac{y}{\delta} - \frac{y^2}{\delta^2}\right) dy $$
    This makes the integration easier by separating the terms.

4.  **Perform the integration:**
    $$ \theta = \left[\frac{y^2}{2\delta} - \frac{y^3}{3\delta^2}\right]_0^\delta $$
    We integrate term by term. The integral of $\frac{y}{\delta}$ is $\frac{1}{\delta} \frac{y^2}{2}$. The integral of $\frac{y^2}{\delta^2}$ is $\frac{1}{\delta^2} \frac{y^3}{3}$.

5.  **Evaluate the definite integral at the limits:**
    $$ \theta = \left(\frac{\delta^2}{2\delta} - \frac{\delta^3}{3\delta^2}\right) - (0 - 0) $$
    $$ \theta = \frac{\delta}{2} - \frac{\delta}{3} $$
    We substitute the upper limit $\delta$ and subtract the result of substituting the lower limit $0$.

6.  **Simplify to get the final answer for $\theta$:**
    $$ \theta = \frac{3\delta - 2\delta}{6} $$
    $$ \boxed{\theta = \frac{\delta}{6}} $$
    This means the momentum thickness for a linear profile is one-sixth of the actual boundary layer thickness.

**Reflection:** This example was straightforward because the linear profile simplified the integrals significantly. It clearly shows how both $\delta^*$ and $\theta$ are fractions of the physical boundary layer thickness $\delta$, with $\delta^*$ being larger than $\theta$ because mass deficit is generally larger than momentum deficit for the same velocity profile.

---

### Example 2: Parabolic Velocity Profile

**Problem:**
Consider a boundary layer with a parabolic velocity profile given by:
$u(y) = U_\infty \left[2\frac{y}{\delta} - \left(\frac{y}{\delta}\right)^2\right]$ for $0 \le y \le \delta$.
Calculate the displacement thickness ($\delta^*$) and the momentum thickness ($\theta$) for this profile.

**Given:**
Velocity profile: $u(y) = U_\infty \left[2\frac{y}{\delta} - \left(\frac{y}{\delta}\right)^2\right]$
Boundary layer thickness: $\delta$

**We want:**
$\delta^*$ and $\theta$

**Solution:**

**Part A: Calculate Displacement Thickness ($\delta^*$)**

1.  **Recall the formula for displacement thickness:**
    $$ \delta^* = \int_0^\delta \left(1 - \frac{u(y)}{U_\infty}\right) dy $$
    This formula quantifies the effective reduction in mass flow.

2.  **Substitute the given velocity profile into the formula:**
    First, find the ratio $\frac{u(y)}{U_\infty}$:
    $\frac{u(y)}{U_\infty} = 2\frac{y}{\delta} - \left(\frac{y}{\delta}\right)^2$.
    Now substitute this into the integral:
    $$ \delta^* = \int_0^\delta \left(1 - \left[2\frac{y}{\delta} - \left(\frac{y}{\delta}\right)^2\right]\right) dy $$
    $$ \delta^* = \int_0^\delta \left(1 - 2\frac{y}{\delta} + \frac{y^2}{\delta^2}\right) dy $$
    We are setting up the integrand by substituting the velocity profile.

3.  **Perform the integration:**
    $$ \delta^* = \left[y - 2\frac{y^2}{2\delta} + \frac{y^3}{3\delta^2}\right]_0^\delta $$
    $$ \delta^* = \left[y - \frac{y^2}{\delta} + \frac{y^3}{3\delta^2}\right]_0^\delta $$
    We integrate each term: $\int 1 dy = y$, $\int -2\frac{y}{\delta} dy = -2\frac{1}{\delta}\frac{y^2}{2} = -\frac{y^2}{\delta}$, $\int \frac{y^2}{\delta^2} dy = \frac{1}{\delta^2}\frac{y^3}{3}$.

4.  **Evaluate the definite integral at the limits:**
    $$ \delta^* = \left(\delta - \frac{\delta^2}{\delta} + \frac{\delta^3}{3\delta^2}\right) - (0 - 0 + 0) $$
    $$ \delta^* = \delta - \delta + \frac{\delta}{3} $$
    Substitute the upper limit $\delta$ and subtract the result of substituting the lower limit $0$.

5.  **Simplify to get the final answer for $\delta^*$:**
    $$ \boxed{\delta^* = \frac{\delta}{3}} $$
    For a parabolic profile, the displacement thickness is one-third of the actual boundary layer thickness.

**Part B: Calculate Momentum Thickness ($\theta$)**

1.  **Recall the formula for momentum thickness:**
    $$ \theta = \int_0^\delta \frac{u(y)}{U_\infty}\left(1 - \frac{u(y)}{U_\infty}\right) dy $$
    This formula quantifies the effective reduction in momentum flow.

2.  **Substitute the given velocity profile into the formula:**
    We already have $\frac{u(y)}{U_\infty} = 2\frac{y}{\delta} - \left(\frac{y}{\delta}\right)^2$.
    And from Part A, we know $1 - \frac{u(y)}{U_\infty} = 1 - \left[2\frac{y}{\delta} - \left(\frac{y}{\delta}\right)^2\right] = 1 - 2\frac{y}{\delta} + \frac{y^2}{\delta^2}$.
    $$ \theta = \int_0^\delta \left[2\frac{y}{\delta} - \left(\frac{y}{\delta}\right)^2\right] \left[1 - 2\frac{y}{\delta} + \frac{y^2}{\delta^2}\right] dy $$
    We substitute the expressions for the velocity ratio and the velocity deficit.

3.  **Expand the integrand (this is the trickiest part):**
    Let $Y = \frac{y}{\delta}$. Then the integrand is $(2Y - Y^2)(1 - 2Y + Y^2)$.
    $$ (2Y - Y^2)(1 - 2Y + Y^2) = 2Y(1 - 2Y + Y^2) - Y^2(1 - 2Y + Y^2) $$
    $$ = (2Y - 4Y^2 + 2Y^3) - (Y^2 - 2Y^3 + Y^4) $$
    $$ = 2Y - 5Y^2 + 4Y^3 - Y^4 $$
    Now substitute $Y = \frac{y}{\delta}$ back:
    $$ \theta = \int_0^\delta \left(2\frac{y}{\delta} - 5\frac{y^2}{\delta^2} + 4\frac{y^3}{\delta^3} - \frac{y^4}{\delta^4}\right) dy $$
    Careful expansion of the polynomial terms is crucial here to avoid errors.

4.  **Perform the integration:**
    $$ \theta = \left[2\frac{y^2}{2\delta} - 5\frac{y^3}{3\delta^2} + 4\frac{y^4}{4\delta^3} - \frac{y^5}{5\delta^4}\right]_0^\delta $$
    $$ \theta = \left[\frac{y^2}{\delta} - \frac{5y^3}{3\delta^2} + \frac{y^4}{\delta^3} - \frac{y^5}{5\delta^4}\right]_0^\delta $$
    Integrate each term using the power rule.

5.  **Evaluate the definite integral at the limits:**
    $$ \theta = \left(\frac{\delta^2}{\delta} - \frac{5\delta^3}{3\delta^2} + \frac{\delta^4}{\delta^3} - \frac{\delta^5}{5\delta^4}\right) - (0) $$
    $$ \theta = \delta - \frac{5\delta}{3} + \delta - \frac{\delta}{5} $$
    Substitute the upper limit $\delta$ and subtract the result of substituting the lower limit $0$.

6.  **Simplify to get the final answer for $\theta$:**
    Find a common denominator, which is 15:
    $$ \theta = \frac{15\delta}{15} - \frac{25\delta}{15} + \frac{15\delta}{15} - \frac{3\delta}{15} $$
    $$ \theta = \frac{(15 - 25 + 15 - 3)\delta}{15} $$
    $$ \theta = \frac{(30 - 25 - 3)\delta}{15} $$
    $$ \boxed{\theta = \frac{2\delta}{15}} $$
    For a parabolic profile, the momentum thickness is two-fifteenths of the actual boundary layer thickness.

**Reflection:** This example was harder due to the polynomial multiplication required before integration. Errors often occur in expanding the integrand or in the final fractional arithmetic. This profile is more realistic than the linear one, showing that the momentum deficit is a smaller fraction of $\delta$ compared to the displacement deficit.

---

### Example 3: Cubic Velocity Profile

**Problem:**
A common approximation for a laminar boundary layer is a cubic velocity profile:
$u(y) = U_\infty \left[\frac{3}{2}\frac{y}{\delta} - \frac{1}{2}\left(\frac{y}{\delta}\right)^3\right]$ for $0 \le y \le \delta$.
Calculate the displacement thickness ($\delta^*$) and the momentum thickness ($\theta$) for this profile.

**Given:**
Velocity profile: $u(y) = U_\infty \left[\frac{3}{2}\frac{y}{\delta} - \frac{1}{2}\left(\frac{y}{\delta}\right)^3\right]$
Boundary layer thickness: $\delta$

**We want:**
$\delta^*$ and $\theta$

**Solution:**

**Part A: Calculate Displacement Thickness ($\delta^*$)**

1.  **Recall the formula for displacement thickness:**
    $$ \delta^* = \int_0^\delta \left(1 - \frac{u(y)}{U_\infty}\right) dy $$

2.  **Substitute the given velocity profile into the formula:**
    First, find the ratio $\frac{u(y)}{U_\infty}$:
    $\frac{u(y)}{U_\infty} = \frac{3}{2}\frac{y}{\delta} - \frac{1}{2}\left(\frac{y}{\delta}\right)^3$.
    Now substitute this into the integral:
    $$ \delta^* = \int_0^\delta \left(1 - \left[\frac{3}{2}\frac{y}{\delta} - \frac{1}{2}\left(\frac{y}{\delta}\right)^3\right]\right) dy $$
    $$ \delta^* = \int_0^\delta \left(1 - \frac{3}{2}\frac{y}{\delta} + \frac{1}{2}\frac{y^3}{\delta^3}\right) dy $$
    Setting up the integrand.

3.  **Perform the integration:**
    $$ \delta^* = \left[y - \frac{3}{2}\frac{y^2}{2\delta} + \frac{1}{2}\frac{y^4}{4\delta^3}\right]_0^\delta $$
    $$ \delta^* = \left[y - \frac{3y^2}{4\delta} + \frac{y^4}{8\delta^3}\right]_0^\delta $$
    Integrate each term.

4.  **Evaluate the definite integral at the limits:**
    $$ \delta^* = \left(\delta - \frac{3\delta^2}{4\delta} + \frac{\delta^4}{8\delta^3}\right) - (0) $$
    $$ \delta^* = \delta - \frac{3\delta}{4} + \frac{\delta}{8} $$
    Substitute the limits.

5.  **Simplify to get the final answer for $\delta^*$:**
    Find a common denominator, which is 8:
    $$ \delta^* = \frac{8\delta}{8} - \frac{6\delta}{8} + \frac{\delta}{8} $$
    $$ \delta^* = \frac{(8 - 6 + 1)\delta}{8} $$
    $$ \boxed{\delta^* = \frac{3\delta}{8}} $$
    For a cubic profile, the displacement thickness is three-eighths of the actual boundary layer thickness.

**Part B: Calculate Momentum Thickness ($\theta$)**

1.  **Recall the formula for momentum thickness:**
    $$ \theta = \int_0^\delta \frac{u(y)}{U_\infty}\left(1 - \frac{u(y)}{U_\infty}\right) dy $$

2.  **Substitute the given velocity profile into the formula:**
    We have $\frac{u(y)}{U_\infty} = \frac{3}{2}\frac{y}{\delta} - \frac{1}{2}\left(\frac{y}{\delta}\right)^3$.
    And from Part A, $1 - \frac{u(y)}{U_\infty} = 1 - \frac{3}{2}\frac{y}{\delta} + \frac{1}{2}\frac{y^3}{\delta^3}$.
    Let $Y = \frac{y}{\delta}$. The integrand is $\left(\frac{3}{2}Y - \frac{1}{2}Y^3\right)\left(1 - \frac{3}{2}Y + \frac{1}{2}Y^3\right)$.
    This will be a complex polynomial expansion.

3.  **Expand the integrand:**
    Let's multiply term by term:
    $$ \left(\frac{3}{2}Y - \frac{1}{2}Y^3\right)\left(1 - \frac{3}{2}Y + \frac{1}{2}Y^3\right) $$
    $$ = \frac{3}{2}Y(1 - \frac{3}{2}Y + \frac{1}{2}Y^3) - \frac{1}{2}Y^3(1 - \frac{3}{2}Y + \frac{1}{2}Y^3) $$
    $$ = \left(\frac{3}{2}Y - \frac{9}{4}Y^2 + \frac{3}{4}Y^4\right) - \left(\frac{1}{2}Y^3 - \frac{3}{4}Y^4 + \frac{1}{4}Y^6\right) $$
    $$ = \frac{3}{2}Y - \frac{9}{4}Y^2 - \frac{1}{2}Y^3 + \left(\frac{3}{4} + \frac{3}{4}\right)Y^4 - \frac{1}{4}Y^6 $$
    $$ = \frac{3}{2}Y - \frac{9}{4}Y^2 - \frac{1}{2}Y^3 + \frac{3}{2}Y^4 - \frac{1}{4}Y^6 $$
    Substitute $Y = \frac{y}{\delta}$ back:
    $$ \theta = \int_0^\delta \left(\frac{3}{2}\frac{y}{\delta} - \frac{9}{4}\frac{y^2}{\delta^2} - \frac{1}{2}\frac{y^3}{\delta^3} + \frac{3}{2}\frac{y^4}{\delta^4} - \frac{1}{4}\frac{y^6}{\delta^6}\right) dy $$
    This expansion needs careful attention.

4.  **Perform the integration:**
    $$ \theta = \left[\frac{3}{2}\frac{y^2}{2\delta} - \frac{9}{4}\frac{y^3}{3\delta^2} - \frac{1}{2}\frac{y^4}{4\delta^3} + \frac{3}{2}\frac{y^5}{5\delta^4} - \frac{1}{4}\frac{y^7}{7\delta^6}\right]_0^\delta $$
    $$ \theta = \left[\frac{3y^2}{4\delta} - \frac{3y^3}{4\delta^2} - \frac{y^4}{8\delta^3} + \frac{3y^5}{10\delta^4} - \frac{y^7}{28\delta^6}\right]_0^\delta $$
    Integrate each term.

5.  **Evaluate the definite integral at the limits:**
    $$ \theta = \left(\frac{3\delta^2}{4\delta} - \frac{3\delta^3}{4\delta^2} - \frac{\delta^4}{8\delta^3} + \frac{3\delta^5}{10\delta^4} - \frac{\delta^7}{28\delta^6}\right) - (0) $$
    $$ \theta = \frac{3\delta}{4} - \frac{3\delta}{4} - \frac{\delta}{8} + \frac{3\delta}{10} - \frac{\delta}{28} $$
    Substitute the limits. Notice the first two terms cancel out.

6.  **Simplify to get the final answer for $\theta$:**
    $$ \theta = -\frac{\delta}{8} + \frac{3\delta}{10} - \frac{\delta}{28} $$
    Find a common denominator for 8, 10, and 28.
    $8 = 2^3$
    $10 = 2 \times 5$
    $28 = 2^2 \times 7$
    LCM = $2^3 \times 5 \times 7 = 8 \times 5 \times 7 = 280$.
    $$ \theta = \frac{-35\delta}{280} + \frac{3 \times 28\delta}{280} - \frac{10\delta}{280} $$
    $$ \theta = \frac{-35\delta + 84\delta - 10\delta}{280} $$
    $$ \theta = \frac{(84 - 45)\delta}{280} $$
    $$ \boxed{\theta = \frac{39\delta}{280}} $$
    For a cubic profile, the momentum thickness is 39/280 of the actual boundary layer thickness.

**Reflection:** This example was significantly more challenging due to the higher-order polynomial and the resulting complex fraction arithmetic. The cancellation of the first two terms in the final summation was a nice simplification, but it's easy to make a mistake in the expansion or finding the common denominator. This type of profile is often used in theoretical analyses because it satisfies more boundary conditions (like zero shear stress at the edge of the boundary layer).

---

### Example 4: Calculating the Shape Factor

**Problem:**
Using the results from Example 3 (cubic velocity profile), calculate the shape factor ($H$) for this boundary layer.

**Given:**
From Example 3:
Displacement thickness: $\delta^* = \frac{3\delta}{8}$
Momentum thickness: $\theta = \frac{39\delta}{280}$

**We want:**
Shape factor $H$.

**Solution:**

1.  **Recall the formula for the shape factor:**
    $$ H = \frac{\delta^*}{\theta} $$
    The shape factor is a dimensionless ratio that characterizes the velocity profile.

2.  **Substitute the calculated values of $\delta^*$ and $\theta$ into the formula:**
    $$ H = \frac{\frac{3\delta}{8}}{\frac{39\delta}{280}} $$
    We are directly using the results from the previous calculation.

3.  **Simplify the expression:**
    $$ H = \frac{3\delta}{8} \times \frac{280}{39\delta} $$
    To divide by a fraction, we multiply by its reciprocal.

4.  **Cancel common terms and numbers:**
    The $\delta$ terms cancel out.
    $$ H = \frac{3}{8} \times \frac{280}{39} $$
    We can simplify $280/8$: $280 \div 8 = 35$.
    We can simplify $3/39$: $3 \div 3 = 1$, $39 \div 3 = 13$.
    $$ H = \frac{1}{1} \times \frac{35}{13} $$
    $$ \boxed{H = \frac{35}{13} \approx 2.692} $$
    The shape factor for the cubic velocity profile is approximately 2.692.

**Reflection:** This example was relatively easy once $\delta^*$ and $\theta$ were correctly calculated. It highlights the utility of the shape factor as a dimensionless quantity, independent of $\delta$, that provides insight into the boundary layer's character. A value around 2.7 is typical for laminar boundary layers, which this cubic profile approximates well. This value is significantly higher than what would be observed for a turbulent boundary layer (typically 1.3-1.4), indicating a less "full" profile more susceptible to separation.

## 6. Common mistakes and traps

1.  **Confusing $\delta$, $\delta^*$, and $\theta$:** Students often mix up the definitions or physical meanings. Remember $\delta$ is the physical thickness, $\delta^*$ is the mass flow deficit equivalent thickness, and $\theta$ is the momentum flow deficit equivalent thickness.
2.  **Incorrect Integration Limits:** Always ensure the integral limits are from $0$ to $\delta$, as the boundary layer region extends from the wall to $\delta$.
3.  **Algebraic Errors in Integration or Expansion:** Especially with polynomial velocity profiles, mistakes in expanding the integrand (e.g., for $\theta$) or in integrating powers of $y$ are common. Double-check all multiplications and power rule applications.
4.  **Forgetting the No-Slip Condition:** While not directly used in the integral definitions themselves, it's the fundamental reason the boundary layer exists. Incorrectly assuming $u(0)$ is non-zero would lead to a fundamentally flawed understanding.
5.  **Misinterpreting the Integrand Terms:** For $\delta^*$, the term $(1 - u(y)/U_\infty)$ represents the *fractional velocity deficit*. For $\theta$, the term $(u(y)/U_\infty)(1 - u(y)/U_\infty)$ represents the *fractional momentum deficit* at a given $y$. Understanding these terms helps avoid errors in setting up the integrals.
6.  **Assuming $\delta$ is a fixed, absolute value:** $\delta$ is defined based on a convention (e.g., 99% of $U_\infty$) and is not a perfectly sharp physical boundary. It also grows along the length of the plate.

## 7. Textbook-precise explanation

The interaction of a viscous fluid with a solid surface gives rise to a boundary layer, a thin region adjacent to the surface where viscous effects are significant and the fluid velocity changes from zero at the wall (due to the no-slip condition) to the free-stream velocity $U_\infty$ away from the wall. To quantitatively characterize this region, several integral thicknesses are defined.

Let $u(y)$ be the local velocity component parallel to the surface at a distance $y$ from the surface, and $U_\infty$ be the free-stream velocity. The boundary layer is assumed to extend up to a distance $\delta$ from the wall.

1.  **Boundary Layer Thickness ($\delta$)**:
    The boundary layer thickness, $\delta$, is conventionally defined as the distance $y$ from the solid surface where the local velocity $u(y)$ reaches 99% of the free-stream velocity $U_\infty$.
    $$ u(y=\delta) = 0.99 U_\infty $$
    This is an empirical definition, chosen for practical utility due to the asymptotic nature of velocity profiles.

2.  **Displacement Thickness ($\delta^*$)**:
    The displacement thickness, $\delta^*$, quantifies the reduction in mass flow rate within the boundary layer compared to an ideal inviscid flow where the velocity is uniformly $U_\infty$. It represents the hypothetical distance by which the solid boundary would have to be displaced outward into the free stream to compensate for this mass flow deficit, such that the mass flow rate in the ideal flow over the displaced boundary equals the actual mass flow rate in the viscous flow.
    For an incompressible flow with constant density $\rho$:
    $$ \rho U_\infty \delta^* = \int_0^\infty \rho (U_\infty - u(y)) dy $$
    Assuming the velocity profile $u(y)$ approaches $U_\infty$ asymptotically, the upper limit of integration is often taken as $\delta$ for practical calculations, where $\delta$ is the boundary layer thickness.
    $$ \delta^* = \int_0^\delta \left(1 - \frac{u(y)}{U_\infty}\right) dy $$
    (Cf. White, *Fluid Mechanics*, 8e, §7.2; Schlichting & Gersten, *Boundary-Layer Theory*, 9e, §7.1)

3.  **Momentum Thickness ($\theta$)**:
    The momentum thickness, $\theta$, quantifies the reduction in momentum flow rate within the boundary layer compared to an ideal inviscid flow where the velocity is uniformly $U_\infty$. It represents the hypothetical distance by which the solid boundary would have to be displaced outward into the free stream to compensate for this momentum flow deficit. Crucially, the momentum thickness is directly related to the skin friction drag on the surface.
    For an incompressible flow with constant density $\rho$:
    $$ \rho U_\infty^2 \theta = \int_0^\infty \rho u(y) (U_\infty - u(y)) dy $$
    Again, for practical calculations, the upper limit of integration is taken as $\delta$:
    $$ \theta = \int_0^\delta \frac{u(y)}{U_\infty}\left(1 - \frac{u(y)}{U_\infty}\right) dy $$
    (Cf. White, *Fluid Mechanics*, 8e, §7.2; Schlichting & Gersten, *Boundary-Layer Theory*, 9e, §7.1)

4.  **Shape Factor ($H$)**:
    The shape factor, $H$, is a dimensionless parameter that characterizes the shape of the boundary layer velocity profile. It is defined as the ratio of the displacement thickness to the momentum thickness. It provides insight into the fullness of the velocity profile and is an indicator of the boundary layer's tendency towards separation.
    $$ H = \frac{\delta^*}{\theta} $$
    For laminar boundary layers, $H$ typically ranges from 2.5 to 3.5. For turbulent boundary layers, $H$ is generally lower, ranging from 1.2 to 1.8, indicating a fuller profile that is more resistant to separation.
    (Cf. Kundu & Cohen, *Fluid Mechanics*, 6e, §13.2)

## 8. ASCII diagrams

Here's an ASCII diagram illustrating a boundary layer velocity profile over a flat plate and how the various thicknesses relate to it conceptually.

```text
                                       U_infinity (Free-stream velocity)
                                         ^
                                         |
                                         |  . . . . . . . . . . . . . . . . . . . . . . . . . .
                                         |  .                                                 .
                                         |  .                                                 .
                                         |  .                                                 .
                                         |  .                                                 .
                                         |  .         u(y) (Actual velocity profile)          .
                                         |  .       /                                         .
                                         |  .     /                                           .
                                         |  .   /                                             .
                                         |  . /                                               .
                                         | /                                                  .
                                       y |/                                                   .
                                         +----------------------------------------------------> u
                                         |
                                         |
                                         |
                                         |
                                         |
                                         |
                                         |
                                         |
                                         |-----------------------------------------------------> x (Along plate)
                                         |
                                         Wall (y=0)

        ^ y
        |
        |             U_infinity
        |             |
        |             |
        |             |  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .
        |             |  .                                                                                             .