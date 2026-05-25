## What it is
Streamlines, pathlines, and streaklines are three distinct methods for visualizing a fluid flow. A streamline is a curve that is everywhere tangent to the instantaneous velocity vector of the flow. A pathline is the actual trajectory traced by an individual fluid particle over time. A streakline is the locus of all fluid particles that have previously passed through a specific fixed point in space.

## Why it matters
These concepts are fundamental to both experimental and computational fluid dynamics (CFD). In aerospace engineering, the smoke released in a wind tunnel to visualize flow over a wing forms streaklines; understanding when these approximate streamlines (which relate to forces) is critical. In environmental science, tracking a pollutant leaking from a pipe creates a streakline, while the path of a single pollutant molecule is a pathline, crucial for predicting contamination spread.

## When to study it
You must have a solid grasp of vector calculus and kinematics. Specifically, you need to be fluent with the concept of a vector field, particularly a time-dependent velocity field $\vec{v}(\vec{x}, t)$. You should also be comfortable with solving systems of ordinary differential equations (ODEs) and performing vector integration.

## How to study it (step by step)
1.  **Master the Velocity Field**: Start with the Eulerian description of a flow, where velocity is a function of position and time, $\vec{v}(\vec{x}, t) = u(x,y,z,t)\hat{\imath} + v(x,y,z,t)\hat{\jmath} + w(x,y,z,t)\hat{k}$. Internalize that this field is the source of all three visualization lines.
2.  **Derive the Streamline Equation**: From the definition—a curve tangent to the velocity vector. For a small displacement vector $d\vec{s} = dx\hat{\imath} + dy\hat{\jmath} + dz\hat{k}$ along a streamline, it must be parallel to the velocity vector $\vec{v}$. This parallelism condition means their cross product is zero: $\vec{v} \times d\vec{s} = 0$. Work out the components of this cross product to arrive at the differential form: $\frac{dx}{u} = \frac{dy}{v} = \frac{dz}{w}$. Solve this for a simple 2D steady flow.
3.  **Derive the Pathline Equation**: From the definition—the trajectory of a particle. The velocity of a particle at position $\vec{x}_p(t)$ is simply the fluid velocity at that point and time: $\frac{d\vec{x}_p}{dt} = \vec{v}(\vec{x}_p, t)$. Write this out in component form and recognize it as a system of ODEs. Solve it for a simple flow by integrating with respect to time.
4.  **Conceptualize the Streakline**: There is no simple differential equation for a streakline. Understand it as a "connect-the-dots" problem. Imagine a dye injector at $\vec{x}_0$. The streakline at time $t$ is the curve connecting the current positions of all particles that passed through $\vec{x}_0$ at some earlier time $\tau \le t$.
5.  **The Steady Flow Equivalence**: Prove to yourself why, for a steady flow ($\frac{\partial \vec{v}}{\partial t} = 0$), all three lines are identical. In steady flow, the velocity field doesn't change, so the "snapshot" (streamline) is the same at all times. Therefore, a particle's path (pathline) must follow this fixed direction field, and the locus of particles from a source (streakline) will also lie along it.
6.  **Work an Unsteady Flow Problem**: Find a simple 2D unsteady velocity field and calculate the streamline, pathline, and streakline passing through the same point at the same instant. This will solidify the differences.

## Key ideas, with intuition
1.  **Velocity Field is the Source**: The velocity field $\vec{v}(\vec{x}, t)$ contains all the information. The three lines are just different questions you can ask of this field.
    *   Streamline asks: "If I freeze time at $t_0$, what is the direction of flow everywhere?"
    *   Pathline asks: "If I tag a particle at $(\vec{x}_0, t_0)$, where does it go?"
    *   Streakline asks: "If I continuously inject dye at $\vec{x}_0$, what shape does the dye cloud form by time $t$?"

2.  **Snapshot vs. Time-Exposure**: This is the most crucial distinction.
    *   **Streamline = Instantaneous Snapshot**. It's a picture of the flow's *direction* at one specific moment. You compute it at a fixed time $t = t_0$.
    *   **Pathline & Streakline = Time-Exposures**. They depend on the history of the flow over a time interval.

3.  **Steady vs. Unsteady is the Litmus Test**:
    *   For **steady flow**, $\vec{v} = \vec{v}(\vec{x})$. The velocity field is static. The snapshot never changes. Therefore, a particle's path must trace a streamline, and a dye streak will also lie along that same line.
        $$ \text{Steady Flow} \implies \text{Streamline} \equiv \text{Pathline} \equiv \text{Streakline} $$
    *   For **unsteady flow**, $\vec{v} = \vec{v}(\vec{x}, t)$. The velocity field is dynamic. A particle starts moving along the streamline direction at its initial location, but then the field changes, so the particle is directed onto a new path. The three lines will be different.

## Worked example
Consider the 2D unsteady velocity field $\vec{v}(x, y, t) = (1)\hat{\imath} + (2t)\hat{\jmath}$. Let's find the streamline, pathline, and streakline that pass through the origin $(0,0)$ at time $t=2$.

**1. Streamline**
We need the line passing through $(0,0)$ at the frozen instant $t=2$. At this instant, the velocity field is $\vec{v}(x,y,2) = 1\hat{\imath} + 4\hat{\jmath}$. Note that the velocity is uniform in space at this instant.
The streamline equation is $\frac{dy}{dx} = \frac{v}{u}$.
$$ \frac{dy}{dx} = \frac{4}{1} = 4 $$
Integrating this gives the equation for the family of streamlines at $t=2$:
$$ \int dy = \int 4 dx \implies y = 4x + C $$
The specific streamline passing through $(0,0)$ has $0 = 4(0) + C \implies C=0$.
So, the streamline is the line $y=4x$.

*Reflection*: This was a "snapshot" calculation. We froze time at $t=2$ and found the curve tangent to the constant velocity vector field $\vec{v} = (1, 4)$.

**2. Pathline**
We need the path of a particle that starts at the origin at some time. Let's assume it passes through the origin at $t=0$ and find its position at $t=2$.
The pathline equations are $\frac{dx_p}{dt} = u = 1$ and $\frac{dy_p}{dt} = v = 2t$.
Integrate both with respect to time, starting from $(x_p, y_p) = (0,0)$ at $t=0$.
$$ \int_0^{x_p} dx' = \int_0^t 1 dt' \implies x_p(t) = t $$
$$ \int_0^{y_p} dy' = \int_0^t 2t' dt' \implies y_p(t) = t^2 $$
The pathline is the curve $(x_p(t), y_p(t)) = (t, t^2)$. We can eliminate the parameter $t$ to get the shape: $y_p = x_p^2$.
At $t=2$, the particle is at $(2, 2^2) = (2,8)$. The path it took to get there is the parabola $y=x^2$.

*Reflection*: This was a "history" calculation. We followed a single particle over time by integrating its velocity. The result is a trajectory, a parabola. Note how different it is from the streamline $y=4x$.

**3. Streakline**
We need the locus at $t=2$ of all particles that previously passed through the origin $(0,0)$. Let a particle pass through the origin at time $\tau$, where $0 \le \tau \le 2$.
We integrate the velocity equations for this particle from time $\tau$ to time $t=2$.
Initial conditions: $x(\tau)=0, y(\tau)=0$.
$$ \int_0^{x} dx' = \int_\tau^2 1 dt' \implies x(2; \tau) = 2 - \tau $$
$$ \int_0^{y} dy' = \int_\tau^2 2t' dt' \implies y(2; \tau) = [t'^2]_\tau^2 = 4 - \tau^2 $$
This gives the position $(x,y)$ at $t=2$ for a particle that was at the origin at time $\tau$. To get the streakline, we eliminate the parameter $\tau$.
From the $x$ equation, $\tau = 2 - x$. Substitute this into the $y$ equation:
$$ y = 4 - (2-x)^2 = 4 - (4 - 4x + x^2) = 4x - x^2 $$
So, the streakline at $t=2$ is the parabola $y = 4x - x^2$.

*Reflection*: This was a "connect-the-dots" calculation. We found the final positions of many particles, each starting from the origin at a different time $\tau$, and connected them. The result is a different parabola from the pathline.

## Diagrams
Here is a conceptual comparison for an unsteady flow around a cylinder, where the free-stream velocity oscillates.

```text
       y ^
         |
         |    ---> Pathline (particle released at t0)
         |   /
         |  /
         | /
         o .....--> Streamline (snapshot at t_final)
        / \
       /   \
(Cylinder)  x
       \   /
        \ /
         o .....--> Streakline (dye released from t0 to t_final)
         |
```
*Description*: The diagram shows a cylinder in a cross-flow.
*   The **Streamline** (computed at $t_{final}$) is a straight line far from the cylinder, bending around it, representing the instantaneous flow direction.
*   The **Pathline** shows the actual wiggly path a single particle took as the flow oscillated.
*   The **Streakline** shows the undulating shape of the dye filament at $t_{final}$, connecting all particles that previously passed through the dye injection point.

## Memory technique — remember this forever
1.  **Mnemonic**:
    *   **S**treamline = **S**napshot (instantaneous)
    *   **P**athline = **P**article (a single particle's history)
    *   **S**treakline = **S**ource (history of particles from one point)

2.  **Must-learn formulas**:
    *   **Streamline**: $\frac{dx}{u} = \frac{dy}{v} = \frac{dz}{w}$ (at a fixed time $t=t_0$)
    *   **Pathline**: $\frac{d\vec{x}_p}{dt} = \vec{v}(\vec{x}_p, t)$ (integrate over time for one particle)

3.  **Spaced repetition schedule**: Review this material and re-derive the worked example at **1 day, 3 days, 7 days, 16 days, and 35 days**. Do not skip this.

4.  **First principles pathway**: If you forget, rebuild from the definitions.
    *   **Streamline**: "Tangent to velocity". Tangent means parallel. Parallel vectors have a zero cross product, $\vec{v} \times d\vec{s} = 0$, or their components are proportional, $\frac{dx}{u} = \frac{dy}{v}$.
    *   **Pathline**: "Particle's path". The definition of velocity is $\vec{v} = \frac{d\vec{x}}{dt}$. This is the ODE you need to solve.

## Common mistakes
1.  **Assuming they are always the same**. This is the biggest error. It is only true for steady flow. Always check if the velocity field $\vec{v}$ has an explicit time dependence.
2.  **Forgetting to freeze time for streamlines**. When you calculate a streamline for an unsteady flow, you must plug in a specific value for time, $t=t_0$, *before* you integrate.
3.  **Confusing pathline and streakline integration limits**. For a pathline, you integrate from a starting time $t_0$ to a final time $t$. For a streakline, you find the position at a fixed final time $t$ for a particle that started at a variable release time $\tau$.
4.  **Misinterpreting experiments**. Believing that smoke in a wind tunnel *is* a streamline. It is a streakline. This is an excellent approximation for a streamline only if the flow is steady.

## Self-check
1.  Consider the steady velocity field $\vec{v} = (y)\hat{\imath} + (-x)\hat{\jmath}$. Find the equation for the streamlines of this flow. What shape are they?
2.  Consider the unsteady velocity field $\vec{v} = (x t)\hat{\imath} + (1)\hat{\jmath}$. Find the pathline for a particle that is at the point $(1, 0)$ at time $t=0$.
3.  Describe a real-world physical scenario (e.g., a boat on a river with a changing tide) and sketch, conceptually, how the streamline, pathline of the boat, and streakline from a fixed buoy leaking oil could look different from each other.