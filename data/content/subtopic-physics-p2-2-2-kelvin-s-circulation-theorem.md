## What it is
Kelvin's circulation theorem states that for an ideal fluid—one that is inviscid (zero viscosity), barotropic (density is a function of pressure only), and subject to conservative body forces—the circulation around a closed material loop remains constant over time. A material loop is a curve that moves with the fluid, always consisting of the same fluid particles.

## Why it matters
This theorem is the foundation for understanding lift in aerodynamics. It explains why a vortex must be shed when an airfoil starts moving to conserve circulation, leading to the Kutta-Joukowski theorem which relates lift directly to circulation. It also explains the persistence of large-scale rotational structures like hurricanes and smoke rings, as it's a conservation law for the "spin" of the fluid.

## When to study it
You must have a firm grasp of the following before proceeding. If not, review them first.
*   **Vector Calculus:** Line integrals, Stokes' theorem, and the gradient operator ($\nabla$).
*   **Fluid Kinematics:** The material derivative ($D/Dt$), the velocity field ($\vec{u}$), and the concept of a fluid parcel.
*   **Fluid Dynamics:** The Euler equations for inviscid fluid motion.
*   **Vorticity:** The definition of vorticity as the curl of velocity, $\vec{\omega} = \nabla \times \vec{u}$.

## How to study it (step by step)
1.  **Define Circulation.** Start with the mathematical definition of circulation, $\Gamma$, as the line integral of the velocity field $\vec{u}$ around a closed curve $C$: $\Gamma = \oint_C \vec{u} \cdot d\vec{l}$. Intuit what this integral measures: the net tendency of the fluid to rotate along the path $C$.
2.  **Introduce the Material Loop.** The key to Kelvin's theorem is that the curve $C$ is not fixed in space. It is a *material loop*, denoted $C(t)$, that is advected (carried along) with the fluid flow. This means we need to use the material derivative.
3.  **Derive the Theorem.** The goal is to calculate $\frac{D\Gamma}{Dt}$. This requires taking the material derivative of the integral. This is a non-trivial step that uses the Leibniz integral rule for a moving curve.
    $$ \frac{D\Gamma}{Dt} = \frac{D}{Dt} \oint_{C(t)} \vec{u} \cdot d\vec{l} $$
    The result of applying the derivative is:
    $$ \frac{D\Gamma}{Dt} = \oint_{C(t)} \left( \frac{D\vec{u}}{Dt} \cdot d\vec{l} + \vec{u} \cdot \frac{D(d\vec{l})}{Dt} \right) $$
    It can be shown that $\frac{D(d\vec{l})}{Dt} = (d\vec{l} \cdot \nabla)\vec{u}$. Substituting this and simplifying leads to the core result:
    $$ \frac{D\Gamma}{Dt} = \oint_{C(t)} \frac{D\vec{u}}{Dt} \cdot d\vec{l} $$
4.  **Substitute the Euler Equation.** The term $\frac{D\vec{u}}{Dt}$ is the acceleration of a fluid parcel. For an inviscid fluid, the Euler equation gives us this acceleration:
    $$ \frac{D\vec{u}}{Dt} = -\frac{1}{\rho}\nabla p + \vec{g} $$
    Substitute this into our expression for $\frac{D\Gamma}{Dt}$:
    $$ \frac{D\Gamma}{Dt} = \oint_{C(t)} \left( -\frac{1}{\rho}\nabla p + \vec{g} \right) \cdot d\vec{l} $$
5.  **Apply the Conditions.** Now, analyze the integral.
    *   If the body force $\vec{g}$ is conservative, it can be written as the gradient of a potential, $\vec{g} = -\nabla\Phi$.
    *   If the fluid is barotropic, density is only a function of pressure, $\rho = \rho(p)$. This allows us to define a pressure function $P = \int \frac{dp}{\rho(p)}$, such that $\nabla P = \frac{1}{\rho}\nabla p$.
    *   The integral becomes $\oint_{C(t)} (-\nabla P - \nabla\Phi) \cdot d\vec{l} = -\oint_{C(t)} \nabla(P+\Phi) \cdot d\vec{l}$.
6.  **Conclude the Proof.** The line integral of a gradient around any closed loop is zero. Therefore:
    $$ \frac{D\Gamma}{Dt} = 0 $$
    This proves that circulation is conserved for a material loop under these conditions.

## Key ideas, with intuition
1.  **Circulation is "Total Spin" around a Loop.** Imagine a tiny paddlewheel placed in the fluid. Vorticity, $\vec{\omega} = \nabla \times \vec{u}$, measures the spin rate of the paddlewheel at a single point. Circulation, $\Gamma = \oint_C \vec{u} \cdot d\vec{l}$, sums up all the velocity components tangent to a large loop $C$. By Stokes' theorem, $\Gamma = \iint_S (\nabla \times \vec{u}) \cdot d\vec{A} = \iint_S \vec{\omega} \cdot d\vec{A}$, so circulation is the total flux of vorticity through the surface bounded by the loop.

2.  **The Loop Moves with the Fluid.** This is the most crucial concept. We are not measuring circulation around a fixed hoop in a river. We are tracking a "hula hoop" made of the water molecules themselves as it flows downstream, stretching and deforming. Kelvin's theorem says the circulation around this deforming, moving loop of molecules is constant.

3.  **Forces Determine Changes in Circulation.** The derivation shows that the rate of change of circulation depends on non-conservative forces.
    $$ \frac{D\Gamma}{Dt} = \oint_{C(t)} (\text{non-conservative forces per unit mass}) \cdot d\vec{l} $$
    Viscosity is a non-conservative force. Pressure gradients in a non-barotropic fluid (where density surfaces and pressure surfaces are not parallel) create a "baroclinic torque" that is also non-conservative. If these forces are zero, circulation cannot change.

4.  **Vorticity is "Frozen" into the Fluid.** A direct consequence of the theorem is that vortex lines (lines everywhere tangent to the vorticity vector $\vec{\omega}$) are carried along with the fluid as if they were frozen into it. If a region of fluid starts with zero vorticity (irrotational), it can never gain any vorticity under the conditions of the theorem.

## Worked example
**Problem:** A large body of water is initially at rest. A submerged paddle begins to rotate, creating a vortex. Consider a large circular loop $C$ in the water, far from the paddle, which initially encloses the region where the paddle will operate. What is the circulation $\Gamma$ around $C$ before and after the paddle starts? Explain using Kelvin's theorem.

**Solution:**
1.  **Initial State:** Before the paddle moves, the water is at rest. This means the velocity field is $\vec{u} = \vec{0}$ everywhere. The circulation around any loop $C$ is:
    $$ \Gamma_{initial} = \oint_C \vec{u} \cdot d\vec{l} = \oint_C \vec{0} \cdot d\vec{l} = 0 $$

2.  **Applying Kelvin's Theorem:** Let's assume the water is ideal (inviscid, barotropic, and gravity is the only, conservative, body force). The loop $C$ is a material loop, composed of water particles. According to Kelvin's theorem, the circulation around this material loop must be conserved for all time.
    $$ \frac{D\Gamma}{Dt} = 0 \implies \Gamma(t) = \text{constant} $$

3.  **Final State:** Since $\Gamma_{initial} = 0$, the circulation around the material loop $C(t)$ must remain zero for all time, even after the paddle has created a vortex inside it.
    $$ \Gamma_{final} = 0 $$

4.  **Reflection:** How is this possible if the paddle clearly creates a vortex with non-zero circulation? The paddle exerts a force on the fluid. This force is transmitted through viscous effects (which we ignored) or by acting as a moving boundary that introduces vorticity. The Euler equation we used, $\frac{D\vec{u}}{Dt} = -\frac{1}{\rho}\nabla p + \vec{g}$, does not account for the force from the paddle. The theorem holds for the fluid *away* from the paddle, but the paddle itself is a source of vorticity that violates the theorem's assumptions. To maintain $\Gamma = 0$ around the large loop, the central vortex created by the paddle must be accompanied by an equal and opposite circulation, perhaps in a boundary layer or a starting vortex shed from the paddle. The net circulation remains zero. This is precisely what happens with an airplane wing: to generate lift (positive circulation), it must shed a "starting vortex" of equal and opposite circulation.

## Diagrams
A material loop $C$ deforming over time in a velocity field.

```text
       t = t_0                                 t = t_1 > t_0

      y ^                                     y ^
        |                                       |
        |     ------>                           |
        |    /       \                          |         .----.
        |   |   C(t_0) | u(x,y)                  |       ,'      `.
        |    \       /                          |      /  C(t_1)  \
        |     ------>                           |      `----------'
        |                                       |
        +----------------> x                    +----------------> x

Description: At time t_0, a circular loop C is defined in a fluid.
The arrows indicate a velocity field that is faster in the middle.
At a later time t_1, the same fluid particles that made up C(t_0)
now form a new, elongated loop C(t_1). Kelvin's theorem states
that the circulation around C(t_0) equals the circulation around C(t_1).
```

## Memory technique — remember this forever
1.  **Visual Hook:** "Kelvin's Smoke Ring." Imagine a perfect, stable smoke ring floating through the air. The theorem is the law that governs its existence. The "ringness" (the circulation) is a conserved quantity. The ring can stretch, wobble, or drift, but the total spin is locked in as it moves, because the smoke particles that form the ring stay as part of the ring (a material loop). It won't spontaneously appear or disappear in ideal air.

2.  **Formulas to Overlearn:**
    *   Definition of Circulation: $\Gamma = \oint_{C(t)} \vec{u} \cdot d\vec{l}$
    *   The Theorem: For an inviscid, barotropic fluid with conservative body forces, $\frac{D\Gamma}{Dt} = 0$.
    *   The Full Derivation Result: $\frac{D\Gamma}{Dt} = \oint_{C(t)} \left( -\frac{1}{\rho}\nabla p + \vec{g} \right) \cdot d\vec{l}$ (This is what simplifies to zero).

3.  **Spaced Repetition Schedule:** Review this mini-lesson and re-derive the theorem from scratch at:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget, rebuild it.
    *   Start with $\Gamma = \oint_{C(t)} \vec{u} \cdot d\vec{l}$.
    *   Take the material derivative, $\frac{D}{Dt}$. Remember this acts on both $\vec{u}$ and $d\vec{l}$.
    *   The result is $\oint \frac{D\vec{u}}{Dt} \cdot d\vec{l}$. (The other term cancels).
    *   Substitute the Euler equation for $\frac{D\vec{u}}{Dt}$.
    *   Analyze the resulting integral. It's an integral of forces.
    *   Show that if forces are conservative (body force from potential, pressure force from barotropic relation), the integral of the gradient around a closed loop is zero.

## Common mistakes
1.  **Applying it to a fixed loop.** The theorem is for a *material* loop that moves with the fluid, not a fixed geometric boundary in space. The circulation around a fixed loop can change easily.
2.  **Ignoring the conditions.** Applying the theorem to a viscous fluid (like honey) or a baroclinic flow (like the Earth's atmosphere with temperature gradients) is incorrect. Viscosity dissipates circulation, and baroclinic effects can create it.
3.  **Confusing Circulation and Vorticity.** Circulation $\Gamma$ is a scalar quantity integrated over a macroscopic loop. Vorticity $\vec{\omega}$ is a vector field defined at every point. They are related by Stokes' theorem, but are not the same thing.

## Self-check
1.  A fluid flow is described as inviscid, incompressible, and subject only to a uniform gravitational field. Is this sufficient for Kelvin's circulation theorem to hold? Why or why not?
2.  Consider a tornado. We can model the air as an ideal fluid away from the core and the ground. If you draw a material loop around the tornado's core, what does Kelvin's theorem tell you about the circulation as that loop of air gets pulled upwards and contracts radially inward? What physical conservation law does this relate to?
3.  Start with the full expression for the rate of change of circulation: $\frac{D\Gamma}{Dt} = \oint_{C(t)} (-\frac{1}{\rho}\nabla p + \vec{g}) \cdot d\vec{l}$. Use Stokes' theorem to convert this to a surface integral. The resulting integrand is related to the time evolution of vorticity. What is it, and what does it tell you about the sources of vorticity in a fluid?