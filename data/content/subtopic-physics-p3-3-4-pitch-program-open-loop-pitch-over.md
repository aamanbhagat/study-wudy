## What it is
The open-loop pitch-over is a pre-programmed rocket guidance maneuver executed shortly after vertical ascent. It involves actively tilting the engine's thrust vector away from the vertical axis for a short duration. This "kick" intentionally introduces a horizontal velocity component, setting the stage for the main gravity turn phase of the launch.

## Why it matters
This maneuver is the critical first step in shaping a rocket's trajectory towards orbit. An incorrect pitch-over—too early, too late, too aggressive, or too gentle—forces the rocket to expend significant fuel on corrective burns later, or could even result in mission failure. Understanding this phase is fundamental to trajectory optimization, guidance system design, and performance analysis for any launch vehicle.

## When to study it
Before tackling this, you must have a solid grasp of Newtonian mechanics in two dimensions. Specifically, ensure you are fluent with:
- Newton's Second Law ($\vec{F}=m\vec{a}$) in vector component form.
- Kinematics: The relationship between position, velocity, and acceleration vectors ($\vec{r}, \vec{v}, \vec{a}$).
- Free Body Diagrams: Decomposing forces like thrust, drag, and gravity.
- Basic Calculus: Using integration to find velocity and position from acceleration.

If you cannot confidently write and solve the equations of motion for a simple projectile with thrust, review those fundamentals first.

## How to study it (step by step)
1.  **Draw the Forces:** Start by drawing a free-body diagram of a rocket just after leaving the launchpad. Identify the four main forces: Thrust ($\vec{T}$), Drag ($\vec{D}$), Gravity ($\vec{g}$), and Lift ($\vec{L}$). For this initial analysis, we often neglect lift and assume drag acts opposite the velocity vector.
2.  **Define the Geometry:** Establish a 2D coordinate system (e.g., $x$ for horizontal distance/downrange, $y$ for altitude). Define the key angles: the pitch angle $\theta$ (the angle of the rocket's thrust axis from the vertical) and the flight path angle $\gamma$ (the angle of the velocity vector from the horizontal). Note that during the pitch-over, $\theta \neq 90^\circ - \gamma$.
3.  **Write the Equations of Motion (EOMs):** Apply Newton's Second Law ($\sum \vec{F} = m\vec{a}$) and decompose it into your chosen coordinate system. This will give you two coupled second-order differential equations for $\ddot{x}$ and $\ddot{y}$.
4.  **Model the "Open-Loop" Program:** The core of this subtopic is understanding that $\theta$ is not a variable to be solved for; it's a pre-defined function of time, $\theta(t)$. For example, a simple program might be $\theta(t) = k \cdot t$ for $0 \le t \le t_{kick}$. This means the rocket's control system executes this command without feedback.
5.  **Integrate for a Simple Case:** Assume a very short maneuver where thrust $T$ and mass $m$ are constant. Set up and solve the integrals for $v_x(t)$ and $v_y(t)$ given the EOMs and the prescribed $\theta(t)$. This will show you how the horizontal velocity is "injected" into the system.
6.  **Analyze the Outcome:** Examine the state of the rocket (position and velocity) at the end of the maneuver. The goal is to have a small but non-zero flight path angle and horizontal velocity, which are the initial conditions for the subsequent, more efficient gravity turn phase.

## Key ideas, with intuition
1.  **The Active Kick vs. The Passive Fall:** A gravity turn is a passive process where gravity "pulls" the trajectory horizontal. But gravity can't start the turn from a perfectly vertical flight path. The pitch-over is the *active kick* needed to give gravity something to work with—a horizontal component of velocity. It's like nudging a ball off the top of a hill so it can start rolling down.
2.  **Thrust is Not Aligned with Velocity:** During the pitch-over, the rocket's nose (and thus its thrust vector) is deliberately pointed slightly away from the direction of travel. The angle between the thrust vector and the velocity vector is the angle of attack, $\alpha$. This intentional misalignment is what generates the turning force.
    $$ \vec{T} \text{ is not parallel to } \vec{v} \implies \text{A turning force exists} $$
3.  **Open-Loop means "Flying Blind":** The term "open-loop" signifies that the maneuver is executed based on a pre-loaded timeline, e.g., "at T+15 seconds, gimbal engine to 2 degrees for 3 seconds." The rocket does not check its actual velocity or altitude to adjust the maneuver. This is simple and reliable for the initial phase of flight where atmospheric disturbances are predictable, but it lacks the robustness of a closed-loop (feedback-controlled) system used later in flight.
    $$ \theta_{command}(t) = f(t) \quad (\text{Not } f(\text{state})) $$

## Worked example
A 10,000 kg rocket is ascending vertically at 100 m/s. It begins a 2-second open-loop pitch-over maneuver. Its engine produces a constant thrust of 300,000 N. The pitch program is $\theta(t) = 0.5t$ degrees, where $t=0$ at the start of the maneuver and $\theta$ is the angle from the vertical. Ignoring drag and changes in gravity for this short duration, what is the rocket's velocity vector at the end of the maneuver ($t=2$ s)?

**Step 1: Define the coordinate system and initial conditions.**
Let $y$ be the vertical axis and $x$ be the horizontal.
Initial conditions at $t=0$:
$v_x(0) = 0$ m/s
$v_y(0) = 100$ m/s
$m = 10,000$ kg
$T = 300,000$ N
$g \approx 9.81$ m/s$^2$

**Step 2: Write the equations of motion.**
The pitch angle $\theta$ is from the vertical. The thrust vector components are:
$T_x = T \sin(\theta(t))$
$T_y = T \cos(\theta(t))$

Newton's Second Law in component form:
$m \ddot{x} = \sum F_x = T \sin(\theta(t))$
$m \ddot{y} = \sum F_y = T \cos(\theta(t)) - mg$

So, the accelerations are:
$a_x(t) = \ddot{x} = \frac{T}{m} \sin(\theta(t))$
$a_y(t) = \ddot{y} = \frac{T}{m} \cos(\theta(t)) - g$

**Step 3: Substitute the pitch program and constants.**
The pitch program is $\theta(t) = 0.5t$ degrees. We must convert this to radians for trigonometric functions: $\theta_{rad}(t) = (0.5t) \frac{\pi}{180}$.
$\frac{T}{m} = \frac{300,000}{10,000} = 30$ m/s$^2$.

$a_x(t) = 30 \sin(0.5t \frac{\pi}{180})$
$a_y(t) = 30 \cos(0.5t \frac{\pi}{180}) - 9.81$

**Step 4: Integrate acceleration to find velocity.**
We need to find $v_x(2)$ and $v_y(2)$.
$v_x(t) = v_x(0) + \int_0^t a_x(\tau) d\tau = 0 + \int_0^t 30 \sin(0.5\tau \frac{\pi}{180}) d\tau$
$v_y(t) = v_y(0) + \int_0^t a_y(\tau) d\tau = 100 + \int_0^t (30 \cos(0.5\tau \frac{\pi}{180}) - 9.81) d\tau$

For small angles, $\sin(x) \approx x$ and $\cos(x) \approx 1$. At $t=2$s, $\theta = 1^\circ$, which is small. Let's use this approximation to simplify the integration.
$\theta_{rad}(t) \approx 0.5t \frac{\pi}{180} \approx 0.00873 t$
$a_x(t) \approx 30 (0.00873 t) = 0.2619 t$
$a_y(t) \approx 30(1) - 9.81 = 20.19$

Now integrate:
$v_x(2) = \int_0^2 0.2619 t \,dt = [0.2619 \frac{t^2}{2}]_0^2 = 0.2619 \frac{4}{2} = 0.5238$ m/s.
$v_y(2) = 100 + \int_0^2 20.19 \,dt = 100 + [20.19t]_0^2 = 100 + 40.38 = 140.38$ m/s.

**Step 5: State the final result.**
At the end of the 2-second maneuver, the velocity vector is approximately:
$\vec{v}(2) \approx (0.524 \hat{i} + 140.38 \hat{j})$ m/s.

**Reflection:**
- Step 1 established a clear frame of reference.
- Step 2 translated the physics (forces) into mathematics (EOMs).
- Step 3 incorporated the specific "open-loop" program into the EOMs.
- Step 4 used calculus (integration) with a simplifying small-angle approximation to solve for the change in velocity. This is valid because pitch-over maneuvers are typically brief and involve small angles.
- Step 5 presented the final state vector, which now has the desired horizontal component to begin the gravity turn.

## Diagrams
```text
        ^ y (Altitude)
        |
        |
        |        /
        |       /
        |      /| T (Thrust)
        |     / |
        |    /  |
        |   /   |
        |  / θ) | T_y = T cos(θ)
        | /     |
        |/      *-----> T_x = T sin(θ)
        * Rocket CG
       / \
      /   \
     |     |
     v D (Drag, opposite v)
     | g (Gravity)
     |
     |
     +-------------------------------------> x (Downrange)

     Note: The velocity vector v is not shown but would typically
     be almost vertical, slightly inside the thrust vector.
     The angle between T and v is the angle of attack.
     θ is the pitch angle, measured from the vertical.
```

## Memory technique — remember this forever
1.  **Visual Hook:** Picture a lumberjack yelling "TIMBER!". Before the massive tree can fall (the gravity turn), the lumberjack has to make a small, precise, forceful cut with a chainsaw at the base (the pitch-over). The pitch-over is that initial, active "cut" that enables the massive, passive fall.
2.  **Must-Know Formulas:**
    $$ \sum F_x = m \ddot{x} = T \sin\theta - D_x $$
    $$ \sum F_y = m \ddot{y} = T \cos\theta - D_y - mg $$
    $$ \theta = \theta_{program}(t) $$
3.  **Spaced Repetition Schedule:** Review these formulas and the "Lumberjack" analogy at: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget everything, start from $\vec{F}_{net} = m\vec{a}$.
    - Draw a rocket.
    - Draw all forces acting on it: Thrust ($\vec{T}$), Gravity ($m\vec{g}$), Drag ($\vec{D}$).
    - Choose a coordinate system (x-horizontal, y-vertical).
    - Define an angle $\theta$ for the thrust vector relative to the vertical.
    - Decompose all force vectors into their x and y components.
    - Set the sum of force components equal to $m a_x$ and $m a_y$.
    - The "open-loop" part simply means you are *given* $\theta$ as a function of time. It's an input, not an unknown.

## Common mistakes
1.  **Confusing Pitch Angle ($\theta$) and Flight Path Angle ($\gamma$):** The pitch angle is where the rocket's nose is pointing (thrust direction). The flight path angle is where the rocket's center of mass is *going* (velocity direction). During this maneuver, you are deliberately creating an angle of attack, so these are not the same.
2.  **Treating $\theta$ as an Unknown:** In an open-loop problem, $\theta(t)$ is a given input function. Do not try to solve for it based on other parameters. You are analyzing the *result* of a pre-determined control action.
3.  **Assuming the Maneuver is Long:** The pitch-over is very short. This justifies approximations like constant mass, constant thrust, and a flat Earth with constant gravity. Applying these assumptions to the entire launch is a major error.
4.  **Incorrectly Resolving Components:** A classic error is mixing up sine and cosine. Always draw the diagram and use SOH-CAH-TOA. If $\theta$ is defined from the vertical, the horizontal component uses $\sin(\theta)$ and the vertical uses $\cos(\theta)$.

## Self-check
1.  A rocket is executing a pitch-over. Its thrust vector is pointed 3 degrees from the vertical. Its velocity vector is pointed 1 degree from the vertical. What is the rocket's angle of attack? Is this a physically plausible scenario for a pitch-over? Why or why not?
2.  Modify the worked example's EOMs to include a simple drag model, where Drag Force $D = \frac{1}{2} \rho v^2 C_D A$. Assume drag acts directly opposite the velocity vector $\vec{v}$. Write out the new expressions for $a_x(t)$ and $a_y(t)$.
3.  Consider two different open-loop pitch programs for a 2-second maneuver:
    a) "Impulse": $\theta(t) = 5^\circ$ for $0 \le t \le 0.1$s, and $\theta(t)=0$ otherwise.
    b) "Ramp": $\theta(t) = t$ degrees for $0 \le t \le 2$s.
    Without doing the full calculation, which program would you expect to be "gentler" on the rocket's structure and why? How might the final state vectors differ?