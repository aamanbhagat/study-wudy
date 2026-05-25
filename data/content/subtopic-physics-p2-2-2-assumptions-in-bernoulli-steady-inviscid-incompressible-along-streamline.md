## What it is
Bernoulli's equation is a statement of energy conservation for a moving fluid, but it only holds true under a strict set of four idealizing assumptions. These assumptions are that the fluid flow is **steady** (unchanging in time), **inviscid** (has no internal friction), **incompressible** (has constant density), and the equation is applied **along a single streamline**. Violating any of these conditions invalidates the simple form of the equation.

## Why it matters
These assumptions form the bedrock of classical aerodynamics and hydrodynamics, providing the first-order approximation for calculating lift on an airfoil, flow through a nozzle in a rocket engine, and the speed of an aircraft using a Pitot tube. Understanding these limitations is critical; it teaches you when a simple model is sufficient and when you must turn to more complex computational fluid dynamics (CFD) that account for viscosity, compressibility, and turbulence.

## When to study it
Before tackling this, you must have a firm grasp of the following prerequisites:
*   **Newton's Second Law ($F=ma$):** Bernoulli's equation is fundamentally a restatement of Newton's law for a fluid element.
*   **Work-Energy Theorem:** The derivation relies on relating work done by forces (pressure, gravity) to a change in kinetic energy.
*   **Calculus:** You need to understand derivatives for velocity and acceleration, and path integrals for the derivation.
*   **Basic Fluid Properties:** You must be comfortable with the concepts of pressure ($P$), density ($\rho$), and velocity fields ($\vec{v}$).

If you are not confident with the work-energy theorem or applying Newton's laws to a continuous medium, review those first.

## How to study it (step by step)
1.  **Isolate and Define:** For each of the four assumptions (steady, inviscid, incompressible, along a streamline), write a one-sentence definition and a one-sentence consequence. For example: "Inviscid flow means the fluid has zero viscosity. The consequence is that there are no shear forces between fluid layers and no energy is lost to friction."
2.  **Follow the Derivation:** Find a derivation of Bernoulli's equation from Newton's Second Law applied to a fluid parcel moving along a streamline. As you go through the steps, pause and identify exactly where each assumption is used to simplify the governing equation. For instance, "steady flow" lets you discard time-derivative terms.
3.  **Connect to Energy Forms:** Re-interpret the final equation, $P + \frac{1}{2}\rho v^2 + \rho g h = \text{constant}$, term by term. Identify $P$ as pressure energy per unit volume, $\frac{1}{2}\rho v^2$ as kinetic energy per unit volume, and $\rho g h$ as potential energy per unit volume. See that the equation is simply a statement that the total energy per unit volume is constant.
4.  **Solve Ideal Problems:** Work through 3-5 textbook problems involving Venturi meters or Pitot tubes. In each problem, explicitly state the four assumptions you are making before you begin writing equations.
5.  **Break the Assumptions:** For each assumption, find a real-world example where it fails. (e.g., Viscosity: flow of honey. Compressibility: supersonic jet. Unsteady: water hammer in a pipe. Across streamlines: flow behind a cylinder). Explain *why* Bernoulli's equation would give an incorrect answer in each case.

## Key ideas, with intuition
1.  **Steady Flow ($\frac{\partial}{\partial t} = 0$):** Imagine a smoothly flowing river. If you stand on the bank and look at a specific point in the water, the velocity of the water passing that point is always the same. The flow pattern is frozen in time. This is "steady." The opposite is "unsteady," like a turbulent, churning rapid, where the velocity at any given point changes chaotically from moment to moment. Assuming steady flow simplifies the math by letting us ignore time.

2.  **Incompressible Flow ($\rho = \text{constant}$):** This means the fluid's density does not change as the pressure changes. All liquids are nearly incompressible. Gases are compressible, but if the flow speed is low (below about 30% of the speed of sound, Mach < 0.3), the density changes are negligible. This assumption allows us to treat $\rho$ as a constant that can be moved outside of integrals in the derivation.

3.  **Inviscid Flow ($\mu = 0$):** This assumes the fluid has no internal friction. Think of it as the difference between pouring water (low viscosity) and pouring honey (high viscosity). In an inviscid fluid, there's no "drag" between adjacent layers of fluid and no energy is dissipated as heat due to friction. This is the most significant idealization, as all real fluids have viscosity. It's a reasonable approximation for flows far from a solid boundary (a "free stream").

4.  **Along a Streamline:** A streamline is the path a single, massless particle would take in the fluid. Bernoulli's equation states that the total energy is constant *along this specific path*.
    $$ P_1 + \frac{1}{2}\rho v_1^2 + \rho g h_1 = P_2 + \frac{1}{2}\rho v_2^2 + \rho g h_2 $$
    This equation holds for points 1 and 2 *if they are on the same streamline*. The value of the constant may be different for a particle on an adjacent streamline. In some special cases (like irrotational flow), the constant is the same for all streamlines, but you cannot assume this in general.

## Worked example
**Problem:** A horizontal Venturi meter narrows from a cross-sectional area of $A_1 = 10 \text{ cm}^2$ to $A_2 = 5 \text{ cm}^2$. Water ($\rho = 1000 \text{ kg/m}^3$) flows through the pipe. If the pressure at the wider section is $P_1 = 150 \text{ kPa}$, and the velocity is $v_1 = 2 \text{ m/s}$, what is the pressure $P_2$ in the narrow section?

**Assumptions:**
1.  **Steady:** The flow rate is constant.
2.  **Incompressible:** Water density is constant.
3.  **Inviscid:** We neglect frictional losses in the pipe.
4.  **Along a streamline:** We are comparing two points along the centerline of the pipe, which is a streamline.

**Step 1: Find the velocity in the narrow section ($v_2$).**
The flow is incompressible, so we use the continuity equation, which expresses conservation of mass.
$$ A_1 v_1 = A_2 v_2 $$
$$ v_2 = v_1 \frac{A_1}{A_2} = (2 \text{ m/s}) \frac{10 \text{ cm}^2}{5 \text{ cm}^2} = 4 \text{ m/s} $$
*Reflection: This step relies on the incompressible assumption. Mass flow rate ($\rho A v$) is constant, and since $\rho$ is constant, volume flow rate ($A v$) must also be constant.*

**Step 2: Apply Bernoulli's equation.**
The pipe is horizontal, so the gravitational potential energy term is constant ($h_1 = h_2$). We can therefore drop the $\rho g h$ term from both sides.
$$ P_1 + \frac{1}{2}\rho v_1^2 = P_2 + \frac{1}{2}\rho v_2^2 $$
*Reflection: This step uses the steady, inviscid, and streamline assumptions. It's a statement of energy conservation between points 1 and 2.*

**Step 3: Solve for $P_2$.**
Rearrange the equation and substitute the known values. Be careful with units (use Pascals for pressure). $150 \text{ kPa} = 150,000 \text{ Pa}$.
$$ P_2 = P_1 + \frac{1}{2}\rho (v_1^2 - v_2^2) $$
$$ P_2 = 150,000 \text{ Pa} + \frac{1}{2}(1000 \text{ kg/m}^3) ((2 \text{ m/s})^2 - (4 \text{ m/s})^2) $$
$$ P_2 = 150,000 \text{ Pa} + 500 (4 - 16) \text{ Pa} $$
$$ P_2 = 150,000 \text{ Pa} - 6000 \text{ Pa} = 144,000 \text{ Pa} = 144 \text{ kPa} $$
*Reflection: The pressure drops where the velocity increases. This is the core principle of the Venturi effect and is a direct consequence of conserving energy along the streamline.*

## Diagrams
A Venturi meter showing streamlines.

```text
        P1, v1, A1                         P2, v2, A2
           ------>                            ------>
      ================\                    /================
                       \\                  //
-------------------------\\----------------//------------------------> Streamline 1
                         \\--------------//
--------------------------\\------------//---------------------------> Streamline 2
                           \            /
      =====================/            \=====================
      ^                                  ^
      | Wide section                     | Narrow section (throat)
```

## Memory technique — remember this forever
1.  **Mnemonic:** Think of an ideal fluid as being **"SIIS"**.
    *   **S**teady
    *   **I**ncompressible
    *   **I**nviscid
    *   along a **S**treamline

2.  **Formulas to Overlearn:**
    *   Bernoulli's Equation: $P + \frac{1}{2}\rho v^2 + \rho g h = \text{constant}$
    *   Continuity Equation (Incompressible): $A_1 v_1 = A_2 v_2$

3.  **Spaced Repetition Schedule:** Review these concepts and re-derive the equation from first principles at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget Bernoulli's equation, rebuild it.
    *   Start with Newton's Second Law for a cylindrical fluid parcel of length $ds$ and area $dA$: $\sum F_s = m a_s$.
    *   The forces in the direction of the streamline ($s$) are due to pressure and the component of gravity: $F_s = (P)dA - (P+dP)dA - (\rho g dA ds) \sin\theta$.
    *   The mass is $m = \rho \, dA \, ds$.
    *   The acceleration for steady flow is the convective acceleration: $a_s = v \frac{dv}{ds}$.
    *   Substitute, simplify, and integrate with respect to $ds$. The assumptions will be required to make the math tractable.

## Common mistakes
1.  **Applying Bernoulli across streamlines.** A common error is to compare a point on the surface of an airfoil with a point in the free stream far away. These are on different streamlines, and this is only valid if the flow is also irrotational.
2.  **Ignoring viscosity in high-loss situations.** Using Bernoulli to calculate pressure drop in a long, narrow, or rough pipe will give a wildly incorrect answer because frictional (viscous) losses dominate.
3.  **Using it for high-speed gas flow.** For air flow over Mach 0.3, density changes become significant, violating the incompressible assumption. You need the compressible form of Bernoulli's equation.
4.  **Applying it to a fluid with significant energy addition or removal.** If there is a pump or turbine between points 1 and 2, the simple Bernoulli equation is invalid because external work is being done on the fluid.

## Self-check
1.  An engineer uses Bernoulli's equation to model the flow of air from a slowly leaking tire. Which of the four assumptions is most clearly being violated? Why?
2.  Water flows from a large open tank through a hose. The tank is at a height $h$ above the hose outlet. Assuming ideal flow, derive an expression for the exit velocity of the water from the hose in terms of $h$ and $g$.
3.  Consider a helicopter's main rotor. You want to use Bernoulli's equation to compare the pressure on a point on the top surface of a rotor blade with a point on the bottom surface. What are the challenges and potential violations of the assumptions in this real-world scenario?