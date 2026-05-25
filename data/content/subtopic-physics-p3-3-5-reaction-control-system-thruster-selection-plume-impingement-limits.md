## What it is
A Reaction Control System (RCS) is a network of small thrusters used to control a spacecraft's attitude (orientation) and execute minor translational maneuvers. Thruster selection involves determining the required thrust magnitude, propellant type, and physical placement to achieve necessary torques. Plume impingement limits define the geometric "keep-out" zones where a thruster's expanding exhaust gas would strike the spacecraft itself, causing unwanted counter-torques, localized heating, or sensor contamination.

## Why it matters
In aerospace engineering, the most elegant control algorithm will fail if the actuators cannot physically execute the commands or if they destroy the vehicle in the process. You will encounter this when designing 6-DOF (Degrees of Freedom) simulations, docking sequences (like SpaceX Dragon approaching the ISS), and when dealing with unmodeled disturbance torques. If you ignore plume impingement, your RCS will fight itself, wasting propellant and inducing unstable limit cycles.

## When to study it
Do not attempt this until you have mastered:
1. **Rigid Body Dynamics:** Specifically the inertia tensor, Euler's equations, and the cross product ($\vec{\tau} = \vec{r} \times \vec{F}$).
2. **Basic Compressible Flow:** Isentropic nozzle flow and vacuum expansion (Prandtl-Meyer expansion fans).
3. **Control Theory Basics:** Bang-bang control and phase plane analysis.
If you cannot calculate the torque vector from a force applied at an arbitrary 3D coordinate, go back to classical mechanics.

## How to study it (step by step)
1. **Map the 6-DOF requirements:** Define the maximum required angular acceleration ($\alpha$) for pitch, yaw, and roll, and translational acceleration ($a$) for X, Y, Z.
2. **Size the thrust:** Use $\tau = I \alpha$ and $\tau = F \cdot d$ to find the raw thrust required, assuming an ideal moment arm $d$. 
3. **Select the thruster type:** Match the required thrust and specific impulse ($I_{sp}$) to a technology: cold gas (low thrust, clean plume), monopropellant (medium thrust, reliable), or bipropellant (high thrust, complex).
4. **Determine the Minimum Impulse Bit (MIB):** Calculate the smallest angular velocity change ($\Delta \omega$) the thruster can impart. This dictates your GNC deadband limit cycle.
5. **Map the vacuum plume:** Sketch the exhaust expansion. In a vacuum, plumes expand far beyond the nozzle exit angle—often exceeding a 45-degree half-angle.
6. **Calculate impingement penalties:** Identify surfaces intersecting the plume. Calculate the momentum transferred to these surfaces and subtract it from your primary thrust/torque vectors.

## Key ideas, with intuition

**1. The Thruster Configuration Matrix**
A spacecraft has $N$ thrusters. The net force $\vec{F}_{net}$ and net torque $\vec{\tau}_{net}$ are linear combinations of the individual thruster magnitudes $T_i$. 
$$ \begin{bmatrix} \vec{F}_{net} \\ \vec{\tau}_{net} \end{bmatrix} = A \vec{T} $$
where $A$ is a $6 \times N$ matrix. The top 3 rows are the direction cosines of each thruster. The bottom 3 rows are the cross products $\vec{r}_i \times \hat{u}_i$, where $\vec{r}_i$ is the position vector from the center of mass (CoM) to the thruster, and $\hat{u}_i$ is the thrust direction. 

**2. Vacuum Plume Expansion**
In the atmosphere, ambient pressure contains rocket exhaust into a neat cylinder. In a vacuum, ambient pressure is zero. The gas expands instantly upon leaving the nozzle lip. If a thruster is mounted flush with the spacecraft hull and points parallel to a solar panel, the expanding cone of gas *will* hit the panel.

**3. The Impingement Counter-Torque**
If a thruster fires to create a positive pitch torque, but its plume hits a solar panel located behind the CoM, the gas pushes the panel in the opposite direction. 
$$ \vec{\tau}_{actual} = (\vec{r}_{thruster} \times \vec{F}_{thrust}) + \sum (\vec{r}_{surface} \times \vec{F}_{impingement}) $$
Because $\vec{F}_{impingement}$ opposes $\vec{F}_{thrust}$, your net torque is reduced. In severe cases, it can reverse the intended torque.

## Worked example
**Problem:** A satellite has a pitch moment of inertia $I_{yy} = 500 \text{ kg m}^2$. A thruster is mounted at $\vec{r} = \begin{bmatrix} -2 \\ 0 \\ 0 \end{bmatrix}$ meters (aft of the CoM) pointing in the $+\hat{z}$ direction. It produces $10 \text{ N}$ of thrust. However, $15\%$ of the plume mass flow impinges on a deployed radiator located at $\vec{r}_{rad} = \begin{bmatrix} -2 \\ 0 \\ 1 \end{bmatrix}$, striking it in the $+\hat{z}$ direction. Calculate the net pitch torque.

**Step 1: Calculate the ideal torque.**
The thrust vector is $\vec{F} = \begin{bmatrix} 0 \\ 0 \\ 10 \end{bmatrix}$.
$$ \vec{\tau}_{ideal} = \vec{r} \times \vec{F} = \begin{bmatrix} -2 \\ 0 \\ 0 \end{bmatrix} \times \begin{bmatrix} 0 \\ 0 \\ 10 \end{bmatrix} = \begin{bmatrix} 0 \\ 20 \\ 0 \end{bmatrix} \text{ Nm} $$
Ideal pitch torque is $+20 \text{ Nm}$.

**Step 2: Calculate the impingement force.**
$15\%$ of the thrust is deflected by the radiator. By conservation of momentum, the force exerted *on* the radiator is $0.15 \times 10 \text{ N} = 1.5 \text{ N}$ in the $+\hat{z}$ direction.
$$ \vec{F}_{imp} = \begin{bmatrix} 0 \\ 0 \\ 1.5 \end{bmatrix} $$

**Step 3: Calculate the impingement torque.**
$$ \vec{\tau}_{imp} = \vec{r}_{rad} \times \vec{F}_{imp} = \begin{bmatrix} -2 \\ 0 \\ 1 \end{bmatrix} \times \begin{bmatrix} 0 \\ 0 \\ 1.5 \end{bmatrix} = \begin{bmatrix} 0 \\ 3.0 \\ 0 \end{bmatrix} \text{ Nm} $$

**Step 4: Calculate net torque.**
The impingement force pushes the radiator, causing a torque on the spacecraft. Wait—look at the signs. The thruster pushes the *spacecraft* in $-\hat{z}$ (action/reaction). So the actual thrust force on the body is $\vec{F}_{body} = \begin{bmatrix} 0 \\ 0 \\ -10 \end{bmatrix}$. Let's re-evaluate rigorously.
* Force on body at nozzle: $\vec{F}_{nozzle} = \begin{bmatrix} 0 \\ 0 \\ -10 \end{bmatrix}$. Torque: $\begin{bmatrix} -2 \\ 0 \\ 0 \end{bmatrix} \times \begin{bmatrix} 0 \\ 0 \\ -10 \end{bmatrix} = \begin{bmatrix} 0 \\ 20 \\ 0 \end{bmatrix}$.
* Force on radiator from plume: $\vec{F}_{rad} = \begin{bmatrix} 0 \\ 0 \\ 1.5 \end{bmatrix}$. Torque: $\begin{bmatrix} -2 \\ 0 \\ 1 \end{bmatrix} \times \begin{bmatrix} 0 \\ 0 \\ 1.5 \end{bmatrix} = \begin{bmatrix} 0 \\ -3.0 \\ 0 \end{bmatrix}$.
Net pitch torque = $20 - 3.0 = 17 \text{ Nm}$.

*Reflection:* The impingement robbed the system of $15\%$ of its control authority because the plume pushed back against the vehicle structure. 

## Diagrams

```text
       +Z
        ^
        |                        [Solar Panel]
        |                        /
        |                      /   <-- Impingement Zone
      [CoM]------------------+   /     (Gas strikes panel, pushes +Z)
        |                    | /
        |                    * <-- Thruster (Fires -Z, pushes vehicle +Z)
        |                   / \
        |                 /     \
        |               /         \ <-- Vacuum Plume Expansion Cone
                       /            \   (Much wider than atmospheric!)
```

## Memory technique — remember this forever
**1. The Hook:** "The Spacecraft is a Porcupine." 
If you put a thruster anywhere, its "quills" (the vacuum plume cone) fan out wildly. If the porcupine stabs its own tail, it cancels its own movement. 

**2. The Must-Know Formula:**
$$ \vec{\tau}_{net} = \sum (\vec{r}_i \times \vec{F}_i) - \vec{\tau}_{impingement} $$
Never assume $\vec{\tau}_{impingement} = 0$ in a vacuum without checking the geometry.

**3. Spaced-Repetition Schedule:** Review this concept at 1 day, 3 days, 7 days, 16 days, and 35 days.

**4. First Principles Pathway:** 
Forget the formulas? Start at Newton's Second Law. Force is the time derivative of momentum ($\vec{F} = \dot{m}\vec{v}_e$). Torque is $\vec{r} \times \vec{F}$. If a surface intercepts a fraction of $\dot{m}$, it absorbs that momentum. Subtract that intercepted momentum vector from your net vehicle momentum. 

## Common mistakes
1. **Ignoring Center of Mass shift:** Propellant is heavy. As it depletes, the CoM moves. A thruster that provided pure roll at the start of the mission will induce a cross-coupled pitch/yaw torque by the end of the mission because $\vec{r}_i$ changed.
2. **Assuming a cylindrical plume:** Students often draw exhaust as a straight cylinder. In a vacuum, the Prandtl-Meyer expansion fan means gas can easily expand at a $45^\circ$ to $60^\circ$ half-angle from the nozzle. 
3. **Forgetting Minimum Impulse Bit (MIB):** Sizing a thruster too large means the shortest possible firing time (e.g., 10 milliseconds) still overshoots the target attitude, causing the spacecraft to rapidly fire back and forth (chattering), draining fuel.

## Self-check
1. A thruster is located at $[1, 1, 0]$ relative to the CoM and fires in the $[0, 1, 0]$ direction with $5\text{ N}$ of force. What is the ideal torque vector?
2. If the CoM shifts by $[-0.1, 0, 0]$ due to fuel depletion, what is the new torque vector for the thruster in Question 1? What uncommanded rotation does this introduce?
3. A thruster's plume expands in a vacuum with a $45^\circ$ half-angle. A sensor mast is located radially outward from the nozzle exit. Derive a geometric inequality to determine if the mast is inside the impingement zone based on its coordinates $(x_m, y_m, z_m)$ relative to the nozzle.