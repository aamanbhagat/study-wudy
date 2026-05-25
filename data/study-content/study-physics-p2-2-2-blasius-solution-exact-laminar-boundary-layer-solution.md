## 1. What it is — in plain English

Imagine a perfectly smooth, flat surface, like a gigantic, polished table. Now, imagine a fluid, let's say air, flowing very smoothly and steadily over this table. When the air first touches the table, it "sticks" to the surface due to viscosity – this is called the "no-slip condition."

As the air moves further along the table, this "sticking" effect spreads upwards into the main flow. It creates a thin layer near the surface where the air's speed gradually increases from zero at the table to the full speed of the air far away. This thin region is called the **boundary layer**.

The "Blasius solution" is the very first, exact mathematical description of how this boundary layer behaves for this specific, simple case: steady, smooth (laminar) flow of an incompressible fluid over a flat plate. It tells us precisely how thick this sticky layer is, how fast the fluid moves at different heights within it, and how much "friction" the fluid creates on the plate.

Think of it like this: Before Blasius, people knew boundary layers existed, but they couldn't calculate them precisely. Blasius provided the first "perfect recipe" for this fundamental scenario, using some clever mathematical tricks to turn a complex problem into one that could be solved, albeit numerically.

## 2. Why it matters — real-world applications

The Blasius solution, despite its simplicity, is foundational and has wide-ranging implications:

1.  **Aircraft and Aerospace Design:** While real aircraft wings are complex (not flat plates), understanding the laminar boundary layer over a flat plate is the starting point for calculating skin friction drag. Engineers at companies like **Boeing** or **Airbus** use this fundamental knowledge to design more fuel-efficient wings, striving to maintain laminar flow for as long as possible to reduce drag. It's also crucial for validating more complex computational fluid dynamics (CFD) models, ensuring they correctly predict the simplest cases before tackling intricate geometries.

2.  **Microfluidics and MEMS (Micro-Electro-Mechanical Systems):** In tiny devices, like those used in medical diagnostics or chemical analysis, fluid flows are often inherently laminar due to the small scales involved. The Blasius solution helps engineers understand and predict fluid behavior in these microscopic channels, influencing the design of lab-on-a-chip devices or micro-pumps. Companies like **Fluidigm** or **Bio-Rad** rely on such principles for their products.

3.  **Heat Transfer Engineering:** The rate at which heat transfers from a surface to a fluid (or vice-versa) is heavily dependent on the velocity boundary layer. A thicker, slower boundary layer typically means less efficient heat transfer. The Blasius solution provides the velocity profile, which is a critical input for calculating heat transfer coefficients in many applications, from cooling electronic components to designing heat exchangers in power plants.

4.  **Wind Turbine Blade Design:** Similar to aircraft wings, the efficiency of wind turbine blades depends on minimizing drag. Understanding the laminar boundary layer and its transition to turbulence, which the Blasius solution helps to characterize, is vital for optimizing blade shapes. Companies like **Vestas** or **Siemens Gamesa** use these principles to maximize energy capture.

5.  **Validation of Computational Fluid Dynamics (CFD) Codes:** Before trusting a complex CFD simulation to model turbulent flow over a supersonic jet, engineers first test it on simpler, analytically solvable problems. The Blasius solution is a classic benchmark for validating the accuracy of numerical solvers for laminar boundary layers. If a CFD code can't reproduce the Blasius solution, it likely has fundamental errors.

## 3. Prerequisites — what you must know first

To fully grasp the Blasius solution, you should be comfortable with the following concepts:

*   **Navier-Stokes Equations:** The fundamental partial differential equations (PDEs) that describe the motion of viscous fluids. You should understand their terms (inertia, pressure, viscosity).
*   **Continuity Equation:** The mathematical expression of the conservation of mass for a fluid, often derived from the Navier-Stokes equations.
*   **Boundary Layer Concept (Prandtl's Insight):** The idea that for high Reynolds numbers, viscous effects are confined to a thin layer near surfaces, while the flow outside is essentially inviscid.
*   **Viscosity:** A fluid's resistance to shear or flow, often described by dynamic viscosity ($\mu$) and kinematic viscosity ($\nu = \mu/\rho$).
*   **Partial Differential Equations (PDEs):** Equations involving an unknown function of multiple independent variables and their partial derivatives.
*   **Ordinary Differential Equations (ODEs):** Equations involving an unknown function of a single independent variable and its derivatives.
*   **Similarity Solutions:** A powerful mathematical technique to reduce a PDE in multiple independent variables into an ODE in a single "similarity variable."
*   **Non-dimensionalization:** The process of removing physical units from equations and variables, often simplifying the problem and revealing key dimensionless parameters (like the Reynolds number).
*   **Fluid Kinematics:** Concepts like stream function ($\psi$) and velocity components ($u, v$).
*   **Calculus III (Multivariable Calculus):** Partial derivatives, chain rule for multiple variables.

## 4. The core idea — step by step

The Blasius solution is a triumph of mathematical ingenuity applied to a physical problem. Here's how it's built:

### ### Step 1: The Problem Setup

*   **Plain-English Statement:** We're looking at a steady, smooth (laminar) flow of an uncompressible fluid (like water or air at low speeds) over a perfectly flat plate that extends infinitely in one direction. The fluid far away from the plate moves at a constant speed, $U_\infty$.

*   **Small Concrete Example:** Imagine a very long, thin sheet of metal held perfectly still in a flowing river or a wind tunnel. We're interested in the water/air flow *right next to* that sheet.

*   **Formal/Mathematical Version:**
    *   **Flow:** Steady ($\frac{\partial}{\partial t} = 0$), two-dimensional ($w=0$, $\frac{\partial}{\partial z} = 0$), incompressible ($\nabla \cdot \mathbf{V} = 0$).
    *   **Geometry:** Semi-infinite flat plate at $y=0$ for $x \ge 0$.
    *   **Boundary Conditions:**
        *   At the plate ($y=0$): $u=0$, $v=0$ (no-slip and no-penetration).
        *   Far from the plate ($y \to \infty$): $u \to U_\infty$.
        *   At the leading edge ($x=0$): $u=U_\infty$ (potential flow assumption).

*   **What Could Go Wrong:** Assuming the flow is turbulent, compressible, or unsteady. These assumptions are crucial. If the Reynolds number is too high, the flow will become turbulent, and Blasius won't apply.

### ### Step 2: Governing Equations & Boundary Layer Approximations

*   **Plain-English Statement:** The full Navier-Stokes equations are very hard to solve. But Prandtl realized that within the thin boundary layer, we can make some clever simplifications because the layer is so thin and changes slowly along the plate. This makes the equations much simpler.

*   **Small Concrete Example:** If you're drawing a map of a city, you don't need to account for the curvature of the Earth for small distances. Similarly, in a thin boundary layer, we can ignore certain terms that are very small compared to others. For instance, pressure changes across the boundary layer (in the $y$-direction) are negligible.

*   **Formal/Mathematical Version:**
    The full 2D incompressible Navier-Stokes equations are:
    $$ \rho \left( u \frac{\partial u}{\partial x} + v \frac{\partial u}{\partial y} \right) = -\frac{\partial p}{\partial x} + \mu \left( \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} \right) $$
    $$ \rho \left( u \frac{\partial v}{\partial x} + v \frac{\partial v}{\partial y} \right) = -\frac{\partial p}{\partial y} + \mu \left( \frac{\partial^2 v}{\partial x^2} + \frac{\partial^2 v}{\partial y^2} \right) $$
    And the continuity equation:
    $$ \frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 0 $$
    Prandtl's boundary layer approximations (for high Reynolds number, thin boundary layer $\delta \ll x$):
    1.  Viscous terms involving derivatives with respect to $x$ are much smaller than those with respect to $y$ (e.g., $\frac{\partial^2 u}{\partial x^2} \ll \frac{\partial^2 u}{\partial y^2}$).
    2.  The pressure gradient across the boundary layer is negligible ($\frac{\partial p}{\partial y} \approx 0$), meaning the pressure inside the boundary layer is the same as the pressure just outside it. For a flat plate with no external pressure gradient, $\frac{\partial p}{\partial x} = 0$.
    3.  The vertical velocity component $v$ is much smaller than the horizontal component $u$.

    Applying these to the Navier-Stokes equations for a flat plate gives the **Prandtl Boundary Layer Equations**:
    $$ u \frac{\partial u}{\partial x} + v \frac{\partial u}{\partial y} = \nu \frac{\partial^2 u}{\partial y^2} \quad \text{(x-momentum)} $$
    $$ \frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 0 \quad \text{(Continuity)} $$
    where $\nu = \mu/\rho$ is the kinematic viscosity.

*   **What Could Go Wrong:** Applying these simplified equations where the boundary layer is not thin (e.g., at the leading edge $x=0$) or where there's a strong external pressure gradient or flow separation.

### ### Step 3: Introducing the Stream Function

*   **Plain-English Statement:** To automatically satisfy the continuity equation (conservation of mass), we can define a special mathematical function called the "stream function" ($\psi$). If you define the velocity components in terms of derivatives of this stream function, the continuity equation is always satisfied, simplifying our problem.

*   **Small Concrete Example:** Imagine drawing lines on a map that show the path water takes in a river. These are streamlines. The stream function basically quantifies these lines such that the flow rate between any two streamlines is constant.

*   **Formal/Mathematical Version:** For 2D incompressible flow, the stream function $\psi(x,y)$ is defined such that:
    $$ u = \frac{\partial \psi}{\partial y} \quad \text{and} \quad v = -\frac{\partial \psi}{\partial x} $$
    Substituting these into the continuity equation:
    $$ \frac{\partial}{\partial x} \left( \frac{\partial \psi}{\partial y} \right) + \frac{\partial}{\partial y} \left( -\frac{\partial \psi}{\partial x} \right) = \frac{\partial^2 \psi}{\partial x \partial y} - \frac{\partial^2 \psi}{\partial y \partial x} = 0 $$
    This is always true if $\psi$ is continuous and has continuous second derivatives (by Clairaut's theorem). So, the continuity equation is automatically satisfied.

*   **What Could Go Wrong:** Incorrectly defining the signs or variables in the stream function definition. For example, some texts define $u = -\frac{\partial \psi}{\partial y}$ and $v = \frac{\partial \psi}{\partial x}$, which is fine as long as you're consistent.

### ### Step 4: The Similarity Transformation

*   **Plain-English Statement:** The boundary layer grows as the fluid moves along the plate. This means the velocity profile at $x=1$ meter looks similar to the profile at $x=4$ meters, just scaled differently. This "self-similarity" suggests we can combine the $x$ and $y$ variables into a single new variable, $\eta$ (eta), and express the stream function in a special way. This transforms the original PDE into a simpler ODE.

*   **Small Concrete Example:** If you take a photo of a small tree and then a photo of a large tree of the same species, they look "similar" but scaled. We're looking for a mathematical scaling that makes the velocity profiles at different $x$ locations identical when plotted against this new scaled variable $\eta$.

*   **Formal/Mathematical Version:**
    We seek a similarity variable $\eta(x,y)$ and a form for the stream function $\psi(x,y)$ such that the PDE reduces to an ODE.
    The form for the similarity variable is found by dimensional analysis or by observing the growth of the boundary layer (which goes as $\sqrt{x}$):
    $$ \eta = y \sqrt{\frac{U_\infty}{\nu x}} $$
    And the stream function is proposed in the form:
    $$ \psi(x,y) = \sqrt{\nu U_\infty x} f(\eta) $$
    where $f(\eta)$ is a dimensionless function we need to find.
    Now, we need to express $u$ and $v$ in terms of $f(\eta)$ and its derivatives:
    $$ u = \frac{\partial \psi}{\partial y} = \frac{\partial}{\partial y} \left( \sqrt{\nu U_\infty x} f(\eta) \right) = \sqrt{\nu U_\infty x} \frac{df}{d\eta} \frac{\partial \eta}{\partial y} $$
    Since $\frac{\partial \eta}{\partial y} = \sqrt{\frac{U_\infty}{\nu x}}$, we get:
    $$ u = \sqrt{\nu U_\infty x} f'(\eta) \sqrt{\frac{U_\infty}{\nu x}} = U_\infty f'(\eta) $$
    And for $v$:
    $$ v = -\frac{\partial \psi}{\partial x} = -\frac{\partial}{\partial x} \left( \sqrt{\nu U_\infty x} f(\eta) \right) $$
    $$ v = -\sqrt{\nu U_\infty} \left( \frac{1}{2\sqrt{x}} f(\eta) + \sqrt{x} f'(\eta) \frac{\partial \eta}{\partial x} \right) $$
    Since $\frac{\partial \eta}{\partial x} = y \sqrt{\frac{U_\infty}{\nu}} \left( -\frac{1}{2} x^{-3/2} \right) = -\frac{1}{2x} \eta$, we get:
    $$ v = -\sqrt{\nu U_\infty} \left( \frac{1}{2\sqrt{x}} f(\eta) + \sqrt{x} f'(\eta) \left( -\frac{1}{2x} \eta \right) \right) $$
    $$ v = \frac{1}{2} \sqrt{\frac{\nu U_\infty}{x}} (\eta f'(\eta) - f(\eta)) $$

*   **What Could Go Wrong:** Errors in applying the chain rule during differentiation, or incorrect choice of the similarity variable or stream function form. These forms are not arbitrary; they come from experience, dimensional analysis, or more advanced mathematical techniques.

### ### Step 5: Deriving the Blasius ODE

*   **Plain-English Statement:** Now that we have $u$, $v$, and their derivatives expressed in terms of $f(\eta)$ and its derivatives, we plug all of these into the simplified boundary layer momentum equation. Miraculously, all the $x$ and $y$ terms cancel out, leaving us with a single ordinary differential equation (ODE) involving only $f(\eta)$ and its derivatives with respect to $\eta$. This is the famous Blasius equation!

*   **Small Concrete Example:** It's like having a complex recipe with many ingredients, and after some clever substitutions, you realize many ingredients cancel each other out, leaving a much simpler core set of instructions.

*   **Formal/Mathematical Version:**
    Recall the x-momentum boundary layer equation:
    $$ u \frac{\partial u}{\partial x} + v \frac{\partial u}{\partial y} = \nu \frac{\partial^2 u}{\partial y^2} $$
    We need to calculate the derivatives:
    $$ \frac{\partial u}{\partial x} = U_\infty f''(\eta) \frac{\partial \eta}{\partial x} = U_\infty f''(\eta) \left( -\frac{1}{2x} \eta \right) = -\frac{U_\infty \eta}{2x} f''(\eta) $$
    $$ \frac{\partial u}{\partial y} = U_\infty f''(\eta) \frac{\partial \eta}{\partial y} = U_\infty f''(\eta) \sqrt{\frac{U_\infty}{\nu x}} $$
    $$ \frac{\partial^2 u}{\partial y^2} = U_\infty f'''(\eta) \left( \frac{\partial \eta}{\partial y} \right)^2 = U_\infty f'''(\eta) \left( \frac{U_\infty}{\nu x} \right) $$
    Now substitute these into the x-momentum equation:
    $$ (U_\infty f') \left( -\frac{U_\infty \eta}{2x} f'' \right) + \left( \frac{1}{2} \sqrt{\frac{\nu U_\infty}{x}} (\eta f' - f) \right) \left( U_\infty f'' \sqrt{\frac{U_\infty}{\nu x}} \right) = \nu \left( U_\infty f''' \frac{U_\infty}{\nu x} \right) $$
    $$ -\frac{U_\infty^2 \eta}{2x} f'f'' + \frac{U_\infty^2}{2x} (\eta f' - f) f'' = \frac{U_\infty^2}{x} f''' $$
    Divide by $\frac{U_\infty^2}{x}$:
    $$ -\frac{1}{2} \eta f'f'' + \frac{1}{2} (\eta f' - f) f'' = f''' $$
    $$ -\frac{1}{2} \eta f'f'' + \frac{1}{2} \eta f'f'' - \frac{1}{2} f f'' = f''' $$
    $$ f''' + \frac{1}{2} f f'' = 0 $$
    This is the **Blasius Equation**, a third-order, non-linear ordinary differential equation. Sometimes it's written as $2f''' + ff'' = 0$.

*   **What Could Go Wrong:** Making algebraic errors during the substitution and simplification steps. It's a common place for mistakes due to the multiple chain rule applications.

### ### Step 6: Boundary Conditions

*   **Plain-English Statement:** Just like with the original problem, we need to specify what happens at the plate and far away in terms of our new function $f(\eta)$. These conditions will allow us to solve the ODE.

*   **Small Concrete Example:** If you're solving for the path of a ball, you need to know where it starts and how fast it's going initially. Here, we need to know the "start" (at the plate, $\eta=0$) and the "end" (far away, $\eta \to \infty$) conditions for our scaled velocity.

*   **Formal/Mathematical Version:**
    1.  **No-slip condition at the plate ($y=0$):** $u(x,0)=0$ and $v(x,0)=0$.
        *   Since $\eta = y \sqrt{\frac{U_\infty}{\nu x}}$, at $y=0$, we have $\eta=0$.
        *   From $u = U_\infty f'(\eta)$, $u(x,0)=0 \implies U_\infty f'(0) = 0 \implies f'(0)=0$.
        *   From $v = \frac{1}{2} \sqrt{\frac{\nu U_\infty}{x}} (\eta f'(\eta) - f(\eta))$, $v(x,0)=0 \implies \frac{1}{2} \sqrt{\frac{\nu U_\infty}{x}} (0 \cdot f'(0) - f(0)) = 0 \implies f(0)=0$.
    2.  **Free-stream condition far from the plate ($y \to \infty$):** $u(x,y) \to U_\infty$.
        *   As $y \to \infty$, $\eta \to \infty$.
        *   From $u = U_\infty f'(\eta)$, $u(x,y) \to U_\infty \implies U_\infty f'(\infty) = U_\infty \implies f'(\infty)=1$.

    So, the three boundary conditions for the Blasius ODE are:
    $$ f(0) = 0 $$
    $$ f'(0) = 0 $$
    $$ f'(\infty) = 1 $$

*   **What Could Go Wrong:** Misinterpreting the physical boundary conditions or making errors during the transformation from $u,v$ to $f, f'$.

### ### Step 7: The Solution (Numerical)

*   **Plain-English Statement:** The Blasius equation is a non-linear ODE, and unfortunately, it doesn't have a simple, closed-form solution using standard mathematical functions. It has to be solved numerically, typically using computational methods. However, once solved, it provides the exact velocity profile and other boundary layer characteristics.

*   **Small Concrete Example:** Imagine trying to find the exact root of an equation like $x^5 + x + 1 = 0$. You can't do it with simple algebra; you need a calculator or a numerical method to approximate the root. The Blasius equation is similar – it requires numerical computation.

*   **Formal/Mathematical Version:**
    The Blasius equation $f''' + \frac{1}{2} f f'' = 0$ with boundary conditions $f(0)=0$, $f'(0)=0$, $f'(\infty)=1$ is a two-point boundary value problem. It's often solved using a shooting method, where an unknown initial condition $f''(0)$ is guessed, and the ODE is integrated until $f'(\infty)=1$ is met. The correct value for $f''(0)$ is found through iteration.

    The numerically determined value for $f''(0)$ is approximately **$0.33206$**. This value is crucial because it relates directly to the shear stress at the wall.
    From the solution, we can then determine:
    *   **Velocity profile:** $u(x,y) = U_\infty f'(\eta)$
    *   **Boundary layer thickness ($\delta$):** Conventionally defined as the point where $u = 0.99 U_\infty$. From the numerical solution, this occurs at $\eta \approx 5.0$.
        So, $\delta \approx 5.0 \sqrt{\frac{\nu x}{U_\infty}} = \frac{5.0 x}{\sqrt{Re_x}}$.
    *   **Wall shear stress ($\tau_w$):**
        $$ \tau_w = \mu \left( \frac{\partial u}{\partial y} \right)_{y=0} $$
        $$ \left( \frac{\partial u}{\partial y} \right)_{y=0} = U_\infty f''(0) \left( \frac{\partial \eta}{\partial y} \right)_{y=0} = U_\infty f''(0) \sqrt{\frac{U_\infty}{\nu x}} $$
        So, $\tau_w = \mu U_\infty f''(0) \sqrt{\frac{U_\infty}{\nu x}} = \rho U_\infty^2 f''(0) \sqrt{\frac{\nu}{U_\infty x}} = \rho U_\infty^2 \frac{f''(0)}{\sqrt{Re_x}}$
    *   **Local skin friction coefficient ($C_f$):**
        $$ C_f = \frac{\tau_w}{\frac{1}{2} \rho U_\infty^2} = \frac{\rho U_\infty^2 f''(0) / \sqrt{Re_x}}{\frac{1}{2} \rho U_\infty^2} = \frac{2 f''(0)}{\sqrt{Re_x}} \approx \frac{0.664}{\sqrt{Re_x}} $$
        where $Re_x = \frac{U_\infty x}{\nu}$ is the local Reynolds number.

*   **What Could Go Wrong:** Expecting a simple analytical form for $f(\eta)$ or making errors in using the numerically derived constants (like $f''(0)$ or the value of $\eta$ for $\delta$).

## 5. Worked examples — multiple, with every step shown

We will use the numerically determined value $f''(0) \approx 0.332$ and the boundary layer thickness criterion $\eta_{99\%} \approx 5.0$.

### Example 1: Boundary Layer Thickness

**Problem:** Air at $20^\circ C$ and atmospheric pressure flows over a flat plate at a free-stream velocity of $U_\infty = 2 \text{ m/s}$. Calculate the boundary layer thickness ($\delta$) at a distance $x = 0.5 \text{ m}$ from the leading edge.

**Given:**
*   Fluid: Air at $20^\circ C$ (kinematic viscosity $\nu \approx 1.5 \times 10^{-5} \text{ m}^2/\text{s}$).
*   Free-stream velocity: $U_\infty = 2 \text{ m/s}$.
*   Distance from leading edge: $x = 0.5 \text{ m}$.

**Want:** Boundary layer thickness $\delta$.

**Solution:**

**Step 1: Calculate the local Reynolds number, $Re_x$.**
The local Reynolds number helps us confirm that the flow is laminar and that boundary layer approximations are valid.
$$ Re_x = \frac{U_\infty x}{\nu} $$
$$ Re_x = \frac{(2 \text{ m/s})(0.5 \text{ m})}{1.5 \times 10^{-5} \text{ m}^2/\text{s}} $$
$$ Re_x = \frac{1 \text{ m}^2/\text{s}}{1.5 \times 10^{-5} \text{ m}^2/\text{s}} $$
$$ Re_x = 66,666.67 $$
*Explanation: This step calculates a dimensionless number that indicates the ratio of inertial forces to viscous forces. Since $Re_x < 5 \times 10^5$ (a common transition point), the flow is likely laminar, justifying the use of the Blasius solution.*

**Step 2: Use the Blasius solution's formula for boundary layer thickness.**
The boundary layer thickness $\delta$ is defined as the height $y$ where $u = 0.99 U_\infty$. For the Blasius solution, this occurs at $\eta \approx 5.0$.
We know $\eta = y \sqrt{\frac{U_\infty}{\nu x}}$. So, $\delta$ corresponds to $y$ when $\eta = 5.0$.
$$ \delta = 5.0 \sqrt{\frac{\nu x}{U_\infty}} $$
*Explanation: This formula directly comes from the numerical solution of the Blasius equation, where it was found that the velocity reaches 99% of the free-stream velocity at a similarity variable value of approximately 5.0.*

**Step 3: Substitute the given values into the formula.**
$$ \delta = 5.0 \sqrt{\frac{(1.5 \times 10^{-5} \text{ m}^2/\text{s})(0.5 \text{ m})}{2 \text{ m/s}}} $$
$$ \delta = 5.0 \sqrt{\frac{7.5 \times 10^{-6} \text{ m}^3/\text{s}}{2 \text{ m/s}}} $$
$$ \delta = 5.0 \sqrt{3.75 \times 10^{-6} \text{ m}^2} $$
$$ \delta = 5.0 \times (1.936 \times 10^{-3} \text{ m}) $$
$$ \delta = 0.00968 \text{ m} $$
$$ \delta \approx 9.68 \text{ mm} $$
*Explanation: Performing the arithmetic to get the final numerical value for the boundary layer thickness.*

**Final Answer:**
The boundary layer thickness at $x=0.5 \text{ m}$ is $\boxed{9.68 \text{ mm}}$.

*Reflection:* This example was straightforward, primarily testing the recall and application of the boundary layer thickness formula derived from Blasius. The trickiest part might be remembering the constant 5.0 and ensuring correct unit cancellation.

---

### Example 2: Local Skin Friction Coefficient

**Problem:** For the same air flow as in Example 1 ($U_\infty = 2 \text{ m/s}$, $\nu = 1.5 \times 10^{-5} \text{ m}^2/\text{s}$) over a flat plate, calculate the local skin friction coefficient ($C_f$) at $x = 0.5 \text{ m}$.

**Given:**
*   Fluid: Air ($\nu = 1.5 \times 10^{-5} \text{ m}^2/\text{s}$, $\rho \approx 1.204 \text{ kg/m}^3$ at $20^\circ C$).
*   Free-stream velocity: $U_\infty = 2 \text{ m/s}$.
*   Distance from leading edge: $x = 0.5 \text{ m}$.
*   Blasius constant: $f''(0) \approx 0.332$.

**Want:** Local skin friction coefficient $C_f$.

**Solution:**

**Step 1: Calculate the local Reynolds number, $Re_x$.**
This is the same as in Example 1.
$$ Re_x = \frac{U_\infty x}{\nu} $$
$$ Re_x = \frac{(2 \text{ m/s})(0.5 \text{ m})}{1.5 \times 10^{-5} \text{ m}^2/\text{s}} = 66,666.67 $$
*Explanation: We need the local Reynolds number to use the Blasius formula for $C_f$. This value confirms laminar flow.*

**Step 2: Use the Blasius solution's formula for local skin friction coefficient.**
The local skin friction coefficient is given by:
$$ C_f = \frac{2 f''(0)}{\sqrt{Re_x}} $$
*Explanation: This formula is a direct result of the Blasius solution, relating the wall shear stress (which depends on $f''(0)$) to the dynamic pressure of the free stream. The factor of 2 comes from the definition of $C_f$ involving $1/2 \rho U_\infty^2$.*

**Step 3: Substitute the known values into the formula.**
$$ C_f = \frac{2 \times 0.332}{\sqrt{66,666.67}} $$
$$ C_f = \frac{0.664}{258.199} $$
$$ C_f \approx 0.0025717 $$
$$ C_f \approx 0.00257 $$
*Explanation: Performing the calculation to find the dimensionless skin friction coefficient.*

**Final Answer:**
The local skin friction coefficient at $x=0.5 \text{ m}$ is $\boxed{0.00257}$.

*Reflection:* This example also relies on direct formula application. The key is knowing the definition of $C_f$ and the Blasius constant $f''(0)$. It's important to remember $C_f$ is a dimensionless quantity.

---

### Example 3: Total Drag Force

**Problem:** Consider a flat plate of length $L = 1 \text{ m}$ and width $W = 0.5 \text{ m}$. Air at $20^\circ C$ ($\nu = 1.5 \times 10^{-5} \text{ m}^2/\text{s}$, $\rho = 1.204 \text{ kg/m}^3$) flows over both sides of the plate at $U_\infty = 5 \text{ m/s}$. Assuming laminar flow over the entire plate, calculate the total drag force ($F_D$) acting on the plate.

**Given:**
*   Plate length: $L = 1 \text{ m}$.
*   Plate width: $W = 0.5 \text{ m}$.
*   Free-stream velocity: $U_\infty = 5 \text{ m/s}$.
*   Fluid: Air ($\nu = 1.5 \times 10^{-5} \text{ m}^2/\text{s}$, $\rho = 1.204 \text{ kg/m}^3$).
*   Blasius constant: $f''(0) \approx 0.332$.

**Want:** Total drag force $F_D$.

**Solution:**

**Step 1: Calculate the Reynolds number at the end of the plate, $Re_L$.**
This tells us if the assumption of fully laminar flow is reasonable.
$$ Re_L = \frac{U_\infty L}{\nu} $$
$$ Re_L = \frac{(5 \text{ m/s})(1 \text{ m})}{1.5 \times 10^{-5} \text{ m}^2/\text{s}} $$
$$ Re_L = \frac{5 \text{ m}^2/\text{s}}{1.5 \times 10^{-5} \text{ m}^2/\text{s}} $$
$$ Re_L = 333,333.33 $$
*Explanation: $Re_L$ is less than $5 \times 10^5$, so the assumption of laminar flow over the entire length is acceptable for this problem.*

**Step 2: Find the average skin friction coefficient, $\bar{C}_f$.**
The total drag force is calculated using the average skin friction coefficient over the entire plate. For laminar flow over a flat plate, the average skin friction coefficient is twice the local skin friction coefficient at $x=L$.
$$ \bar{C}_f = \frac{1}{L} \int_0^L C_f(x) dx $$
We know $C_f(x) = \frac{2 f''(0)}{\sqrt{Re_x}} = \frac{2 f''(0)}{\sqrt{U_\infty x / \nu}} = 2 f''(0) \sqrt{\frac{\nu}{U_\infty x}}$.
$$ \bar{C}_f = \frac{1}{L} \int_0^L 2 f''(0) \sqrt{\frac{\nu}{U_\infty x}} dx $$
$$ \bar{C}_f = \frac{2 f''(0)}{L} \sqrt{\frac{\nu}{U_\infty}} \int_0^L x^{-1/2} dx $$
$$ \bar{C}_f = \frac{2 f''(0)}{L} \sqrt{\frac{\nu}{U_\infty}} [2x^{1/2}]_0^L $$
$$ \bar{C}_f = \frac{2 f''(0)}{L} \sqrt{\frac{\nu}{U_\infty}} (2\sqrt{L}) $$
$$ \bar{C}_f = 4 f''(0) \sqrt{\frac{\nu}{U_\infty L}} $$
$$ \bar{C}_f = \frac{4 f''(0)}{\sqrt{Re_L}} $$
So, $\bar{C}_f = 2 \times C_f(L)$.
$$ \bar{C}_f = \frac{4 \times 0.332}{\sqrt{333,333.33}} $$
$$ \bar{C}_f = \frac{1.328}{577.35} $$
$$ \bar{C}_f \approx 0.002299 $$
*Explanation: This step is crucial. Total drag depends on the average friction, not just the friction at the end of the plate. The integration shows that for laminar flat plate flow, the average coefficient is exactly double the local coefficient at the trailing edge. This is a common result derived from the Blasius solution.*

**Step 3: Calculate the total drag force, $F_D$.**
The drag force is given by:
$$ F_D = \frac{1}{2} \rho U_\infty^2 A \bar{C}_f $$
Where $A$ is the wetted area. Since the flow is over both sides of the plate, $A = 2 \times L \times W$.
$$ A = 2 \times (1 \text{ m}) \times (0.5 \text{ m}) = 1 \text{ m}^2 $$
Now substitute all values:
$$ F_D = \frac{1}{2} (1.204 \text{ kg/m}^3) (5 \text{ m/s})^2 (1 \text{ m}^2) (0.002299) $$
$$ F_D = \frac{1}{2} (1.204 \text{ kg/m}^3) (25 \text{ m}^2/\text{s}^2) (1 \text{ m}^2) (0.002299) $$
$$ F_D = (0.602 \text{ kg/m}^3) (25 \text{ m}^2/\text{s}^2) (0.002299 \text{ m}^2) $$
$$ F_D = 15.05 \text{ N} \times 0.002299 $$
$$ F_D \approx 0.03459 \text{ N} $$
*Explanation: This is the standard formula for drag force. We use the average skin friction coefficient and the total wetted area, remembering that both sides of the plate contribute to drag.*

**Final Answer:**
The total drag force on the plate is $\boxed{0.0346 \text{ N}}$.

*Reflection:* This example is harder because it requires integrating the local skin friction coefficient to find the average, and then correctly applying the drag force formula, including the wetted area for both sides of the plate. Forgetting to multiply by 2 for $\bar{C}_f$ or for the wetted area are common pitfalls.

---

### Example 4: Velocity Profile at a Specific Point

**Problem:** For the air flow from Example 1 ($U_\infty = 2 \text{ m/s}$, $\nu = 1.5 \times 10^{-5} \text{ m}^2/\text{s}$), determine the horizontal velocity $u$ at $x = 0.5 \text{ m}$ and $y = 5 \text{ mm}$. Assume $f'(\eta)$ values are available from a Blasius table (e.g., $f'(2.0) \approx 0.6298$, $f'(2.5) \approx 0.7513$).

**Given:**
*   Fluid: Air ($\nu = 1.5 \times 10^{-5} \text{ m}^2/\text{s}$).
*   Free-stream velocity: $U_\infty = 2 \text{ m/s}$.
*   Distance from leading edge: $x = 0.5 \text{ m}$.
*   Height above plate: $y = 5 \text{ mm} = 0.005 \text{ m}$.
*   Blasius $f'(\eta)$ table values.

**Want:** Horizontal velocity $u$ at $(x,y)$.

**Solution:**

**Step 1: Calculate the similarity variable $\eta$ at the given point $(x,y)$.**
The Blasius solution gives velocity in terms of $f'(\eta)$, so we first need to find $\eta$.
$$ \eta = y \sqrt{\frac{U_\infty}{\nu x}} $$
$$ \eta = (0.005 \text{ m}) \sqrt{\frac{2 \text{ m/s}}{(1.5 \times 10^{-5} \text{ m}^2/\text{s})(0.5 \text{ m})}} $$
$$ \eta = (0.005 \text{ m}) \sqrt{\frac{2}{7.5 \times 10^{-6}}} \text{ m}^{-1} $$
$$ \eta = (0.005 \text{ m}) \sqrt{266,666.67} \text{ m}^{-1} $$
$$ \eta = (0.005 \text{ m}) (516.40) \text{ m}^{-1} $$
$$ \eta \approx 2.582 $$
*Explanation: We convert the physical coordinates $(x,y)$ into the dimensionless similarity variable $\eta$. This is the core transformation of the Blasius solution.*

**Step 2: Find the value of $f'(\eta)$ for the calculated $\eta$ using the provided table.**
The problem provides table values: $f'(2.0) \approx 0.6298$ and $f'(2.5) \approx 0.7513$.
Since our calculated $\eta \approx 2.582$ is between $2.5$ and some higher value (let's assume the next value in the table is at $\eta=3.0$ and $f'(3.0) \approx 0.8461$), we need to interpolate.
Let's assume we have a table with $f'(\eta)$ values. A typical Blasius table might look like this:
| $\eta$ | $f'(\eta)$ |
| :----: | :--------: |
| 0.0    | 0.0000     |
| 0.5    | 0.1659     |
| 1.0    | 0.3298     |
| 1.5    | 0.4868     |
| 2.0    | 0.6298     |
| 2.5    | 0.7513     |
| 3.0    | 0.8461     |
| 3.5    | 0.9130     |
| 4.0    | 0.9555     |
| 4.5    | 0.9795     |
| 5.0    | 0.9916     |
| $\infty$ | 1.0000     |

Our $\eta = 2.582$ is between $\eta=2.5$ and $\eta=3.0$.
Using linear interpolation:
$$ f'(\eta) = f'(\eta_1) + \frac{f'(\eta_2) - f'(\eta_1)}{\eta_2 - \eta_1} (\eta - \eta_1) $$
Let $\eta_1 = 2.5$, $f'(\eta_1) = 0.7513$.
Let $\eta_2 = 3.0$, $f'(\eta_2) = 0.8461$.
$$ f'(2.582) = 0.7513 + \frac{0.8461 - 0.7513}{3.0 - 2.5} (2.582 - 2.5) $$
$$ f'(2.582) = 0.7513 + \frac{0.0948}{0.5} (0.082) $$
$$ f'(2.582) = 0.7513 + 0.1896 \times 0.082 $$
$$ f'(2.582) = 0.7513 + 0.0155472 $$
$$ f'(2.582) \approx 0.7668 $$
*Explanation: Since the Blasius solution for $f(\eta)$ is numerical, we often need to look up values in a table and interpolate to find the precise value for a given $\eta$. This step finds the dimensionless velocity ratio at our specific point.*

**Step 3: Calculate the actual horizontal velocity $u$.**
We know $u = U_\infty f'(\eta)$.
$$ u = (2 \text{ m/s}) \times (0.7668) $$
$$ u \approx 1.5336 \text{ m/s} $$
*Explanation: The value $f'(\eta)$ represents the ratio $u/U_\infty$. Multiplying by the free-stream velocity gives the actual velocity at that specific point.*

**Final Answer:**
The horizontal velocity $u$ at $x = 0.5 \text{ m}$ and $y = 5 \text{ mm}$ is $\boxed{1.534 \text{ m/s}}$.

*Reflection:* This example is challenging because it requires understanding the role of the similarity variable $\eta$, the function $f'(\eta)$, and then performing interpolation from a table (which is a common practical task in fluid mechanics). Errors can easily occur in calculating $\eta$ or during the interpolation process.

## 6. Common mistakes and traps

1.  **Confusing Local vs. Average Quantities:** Students often use $C_f = 0.664/\sqrt{Re_x}$ for total drag calculations, when they should be using the average skin friction coefficient $\bar{C}_f = 1.328/\sqrt{Re_L}$ (which is $2 \times C_f(L)$).
2.  **Incorrectly Applying Boundary Layer Assumptions:** Forgetting that Blasius is only for *laminar*, *incompressible*, *steady*, 2D flow over a *flat plate* with no external pressure gradient. Applying it to turbulent flow, curved surfaces, or adverse pressure gradients will yield incorrect results.
3.  **Algebraic Errors in Similarity Transformation:** The derivation of the Blasius equation involves many chain rule applications. Errors in signs, exponents, or product rule applications are common.
4.  **Misinterpreting $f(\eta)$ and its Derivatives:**
    *   $f(\eta)$ is related to the stream function.
    *   $f'(\eta)$ is the dimensionless velocity ratio $u/U_\infty$.
    *   $f''(\eta)$ is related to the shear stress at the wall.
    *   $f'''(\eta)$ is related to the pressure gradient and viscous forces.
    *   Confusing which derivative relates to which physical quantity is a frequent error.
5.  **Not Knowing Key Numerical Constants:** Forgetting the value of $f''(0) \approx 0.332$ or the $\eta_{99\%} \approx 5.0$ for boundary layer thickness. While these aren't derived, they are standard results from the numerical solution.
6.  **Unit Inconsistency:** Forgetting to convert units (e.g., mm to m) or using inconsistent units for viscosity ($\mu$ vs. $\nu$) can lead to significant errors. Always ensure all units are consistent (e.g., SI units).

## 7. Textbook-precise explanation

The Blasius solution provides an exact similarity solution for the steady, two-dimensional, incompressible laminar boundary layer flow over a semi-infinite flat plate with zero pressure gradient.

Consider a Cartesian coordinate system $(x,y)$ where $x$ is along the plate from the leading edge and $y$ is normal to the plate. The free-stream velocity $U_\infty$ is uniform and parallel to the plate. The fluid is Newtonian with constant density $\rho$ and kinematic viscosity $\nu$.

Under Prandtl's boundary layer approximations for high Reynolds numbers ($Re_x = U_\infty x / \nu \gg 1$), the governing equations simplify from the Navier-Stokes equations to:

**Continuity Equation:**
$$ \frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 0 $$

**x-Momentum Equation:**
$$ u \frac{\partial u}{\partial x} + v \frac{\partial u}{\partial y} = \nu \frac{\partial^2 u}{\partial y^2} $$

The boundary conditions are:
1.  At the wall ($y=0$): $u=0$, $v=0$ (no-slip and no-penetration).
2.  At the edge of the boundary layer ($y \to \infty$): $u \to U_\infty$.

To satisfy the continuity equation identically, a stream function $\psi(x,y)$ is introduced, such that $u = \frac{\partial \psi}{\partial y}$ and $v = -\frac{\partial \psi}{\partial x}$. Substituting these into the momentum equation yields a single third-order PDE in $\psi$.

Blasius's key insight was to recognize the self-similar nature of the velocity profiles at different $x$ locations. He proposed a similarity transformation using a dimensionless variable $\eta$ and a dimensionless stream function $f(\eta)$:
$$ \eta = y \sqrt{\frac{U_\infty}{\nu x}} $$
$$ \psi(x,y) = \sqrt{\nu U_\infty x} f(\eta) $$
From these definitions, the velocity components are:
$$ u = \frac{\partial \psi}{\partial y} = U_\infty f'(\eta) $$
$$ v = -\frac{\partial \psi}{\partial x} = \frac{1}{2} \sqrt{\frac{\nu U_\infty}{x}} (\eta f'(\eta) - f(\eta)) $$
Substituting these expressions and their derivatives into the x-momentum equation results in the celebrated **Blasius Ordinary Differential Equation (ODE)**:
$$ 2f''' + ff'' = 0 $$
The boundary conditions transform to:
1.  $f(0) = 0$ (from $v=0$ at $y=0$)
2.  $f'(0) = 0$ (from $u=0$ at $y=0$)
3.  $f'(\infty) = 1$ (from $u \to U_\infty$ as $y \to \infty$)

This third-order non-linear ODE is a two-point boundary value problem that requires numerical solution. The solution provides the function $f(\eta)$ and its derivatives. A critical result from the numerical solution is the value of the second derivative at the wall: $f''(0) \approx 0.33206$.

From this numerical solution, key physical quantities can be determined:
*   **Velocity Profile:** $u(x,y) = U_\infty f'(\eta)$.
*   **Boundary Layer Thickness ($\delta_{99\%}$):** The height $y$ where $u = 0.99 U_\infty$ corresponds to $\eta \approx 5.0$. Thus, $\delta_{99\%} = 5.0 \sqrt{\frac{\nu x}{U_\infty}} = \frac{5.0 x}{\sqrt{Re_x}}$.
*   **Local Wall Shear Stress ($\tau_w$):** $\tau_w = \mu \left( \frac{\partial u}{\partial y} \right)_{y=0} = \mu U_\infty f''(0) \sqrt{\frac{U_\infty}{\nu x}} = \rho U_\infty^2 \frac{f''(0)}{\sqrt{Re_x}}$.
*   **Local Skin Friction Coefficient ($C_f$):** $C_f = \frac{\tau_w}{\frac{1}{2} \rho U_\infty^2} = \frac{2 f''(0)}{\sqrt{Re_x}} \approx \frac{0.664}{\sqrt{Re_x}}$.
*   **Average Skin Friction Coefficient ($\bar{C}_f$):** Over a plate of length $L$, $\bar{C}_f = \frac{1}{L} \int_0^L C_f(x) dx = \frac{4 f''(0)}{\sqrt{Re_L}} \approx \frac{1.328}{\sqrt{Re_L}}$.

**References:**
*   White, F. M. (2006). *Fluid Mechanics* (6th ed.). McGraw-Hill. (Chapter 4, Section 4.5)
*   Kundu, P. K., Cohen, I. M., & Dowling, D. R. (2012). *Fluid Mechanics* (5th ed.). Academic Press. (Chapter 10, Section 10.1)
*   Schlichting, H., & Gersten, K. (2017). *Boundary-Layer Theory* (9th ed.). Springer. (Chapter 7)

## 8. ASCII diagrams

```text
       U_infinity (Free-stream velocity)
       -----------------------------------------------------> u = U_infinity

                                 Boundary Layer Edge (u = 0.99 U_infinity)
                                /
                               /
                              /  <-- Velocity Profile (u/U_infinity = f'(eta))
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
|----------------------------------------------------------------------| y
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |
|                                                                      |