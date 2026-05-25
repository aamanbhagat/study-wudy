## What it is
The Clohessy-Wiltshire (CW) equations are a set of linearized differential equations that describe the motion of one spacecraft (the "chaser") relative to another (the "target"), assuming the target is in a circular orbit and the chaser is very close to it. They provide an analytical solution for proximity operations, approximating complex orbital mechanics with a simpler, local model.

## Why it matters
These equations are the foundation of modern autonomous rendezvous, proximity operations, and docking (RPOD). They are used to design trajectories for spacecraft to approach the International Space Station, service satellites in orbit, and fly in tight formations. Understanding the CW equations is non-negotiable for guidance, navigation, and control (GNC) roles in aerospace.

## When to study it
Before tackling the CW equations, you must have a firm grasp of the following. If you are not confident in these, review them first.
- **Newtonian Gravity & the Two-Body Problem:** The derivation starts from the inverse-square law.
- **Orbital Elements:** You need to understand what defines an orbit, especially the mean motion, $n$.
- **Rotating Reference Frames:** The derivation requires expressing motion in a non-inertial frame, which introduces Coriolis and centrifugal accelerations. You must be comfortable with the transport theorem: $\frac{d\vec{A}}{dt}|_{I} = \frac{d\vec{A}}{dt}|_{R} + \vec{\omega} \times \vec{A}$.

## How to study it (step by step)
1.  **Set up the Geometry:** Draw the target and chaser spacecraft. Define the Local-Vertical, Local-Horizontal (LVLH) coordinate frame, which has its origin at the target's center of mass. This is the most critical step.
2.  **Write the Full Equations of Motion:** Write Newton's second law for both the target and the chaser in an inertial frame. Then, express the chaser's motion *relative* to the target.
3.  **Introduce the Rotating Frame:** Transform the relative equation of motion into the rotating LVLH frame. Identify the Coriolis and centrifugal terms that appear because the frame is accelerating.
4.  **Linearize:** This is the key mathematical leap. Assume the distance between the spacecraft is much smaller than the orbital radius ($|\vec{\rho}| \ll |\vec{r}_t|$). Use a Taylor series expansion for the gravitational term and keep only the first-order terms.
5.  **Solve the ODEs:** The linearization results in a system of three linear ordinary differential equations. Solve them to find the chaser's relative position $(x, y, z)$ as a function of time. Notice that the in-plane ($x,y$) and out-of-plane ($z$) motions are decoupled.

## Key ideas, with intuition
1.  **The LVLH Frame is Everything.** We don't care about inertial space; we care about "am I getting closer to the docking port?" The Local-Vertical, Local-Horizontal frame makes this question tractable.
    -   $\hat{x}$ (Radial or R-bar): Points from the center of the Earth through the target. "Up."
    -   $\hat{y}$ (In-track or V-bar): Points along the target's velocity vector, in the direction of motion. "Forward."
    -   $\hat{z}$ (Cross-track or H-bar): Perpendicular to the orbital plane, aligned with the angular momentum vector. "Out-of-plane."
    This frame rotates with the target at a constant angular velocity, $n = \sqrt{\mu/a^3}$, the mean motion.

2.  **Gravity isn't Constant, it's a Gradient.** The core physics is that the chaser experiences a slightly different gravitational pull than the target. If the chaser is slightly higher (positive $x$), gravity is weaker, pulling it back less. If it's slightly lower (negative $x$), gravity is stronger. This *difference* in gravity, the *gravity gradient*, is what drives the relative motion. The linearization approximates this gradient as being linear.

3.  **Motion is Coupled and Counter-intuitive.** In deep space, a forward thrust gives you a forward velocity. In orbit, it's not so simple. A forward burn (along $\hat{y}$) increases your orbital energy and altitude. You move to a higher, slower orbit. From the target's perspective, you start to rise up (positive $x$) and fall behind (negative $y$). This coupling is captured by the Coriolis terms in the equations.
    The final equations of motion are:
    $$ \ddot{x} - 2n\dot{y} - 3n^2x = 0 \quad \text{(Radial/Up-Down)} $$
    $$ \ddot{y} + 2n\dot{x} = 0 \quad \text{(In-track/Forward-Back)} $$
    $$ \ddot{z} + n^2z = 0 \quad \text{(Cross-track/Out-of-plane)} $$
    Notice the $\dot{y}$ term in the $x$ equation and the $\dot{x}$ term in the $y$ equation. This is the mathematical representation of the coupling. The $z$ motion, however, is a simple harmonic oscillator, completely independent of the others.

## Worked example
**Problem:** A chaser spacecraft is located 100 meters directly "behind" a target on the ISS's orbit (a circular orbit at 400 km altitude). What initial velocity must the chaser have in the LVLH frame to arrive at the target's location in 10 minutes?

**1. Define Constants:**
-   Gravitational parameter of Earth: $\mu = 3.986 \times 10^{14} \, \text{m}^3/\text{s}^2$.
-   Earth radius: $R_E = 6378 \, \text{km} = 6.378 \times 10^6 \, \text{m}$.
-   Target altitude: $h = 400 \, \text{km} = 4 \times 10^5 \, \text{m}$.
-   Target orbital radius: $a = R_E + h = 6.778 \times 10^6 \, \text{m}$.
-   Mean motion: $n = \sqrt{\mu/a^3} \approx 0.00113 \, \text{rad/s}$.
-   Time of flight: $T = 10 \, \text{min} = 600 \, \text{s}$.

**2. State Initial and Final Conditions:**
-   Initial position: $\vec{\rho}_0 = (x_0, y_0, z_0) = (0, -100, 0)$ meters. ("Behind" is negative y).
-   Initial velocity: $\vec{v}_0 = (\dot{x}_0, \dot{y}_0, \dot{z}_0)$ is what we need to find.
-   Final position: $\vec{\rho}_f = (x_f, y_f, z_f) = (0, 0, 0)$ meters.

**3. Use the Integrated Clohessy-Wiltshire Equations:**
The solution to the CW equations can be written in state-space form. For the in-plane motion:
$$
\begin{pmatrix} x(t) \\ y(t) \\ \dot{x}(t) \\ \dot{y}(t) \end{pmatrix}
=
\begin{pmatrix}
4-3\cos(nt) & 0 & \frac{\sin(nt)}{n} & \frac{2(1-\cos(nt))}{n} \\
6(\sin(nt)-nt) & 1 & -\frac{2(1-\cos(nt))}{n} & \frac{4\sin(nt)-3nt}{n} \\
3n\sin(nt) & 0 & \cos(nt) & 2\sin(nt) \\
-6n(1-\cos(nt)) & 0 & -2\sin(nt) & 4\cos(nt)-3
\end{pmatrix}
\begin{pmatrix} x_0 \\ y_0 \\ \dot{x}_0 \\ \dot{y}_0 \end{pmatrix}
$$
We only need the first two rows to solve for position.

**4. Solve for the Unknown Velocities:**
Plug in the initial and final conditions at $t=T=600$ s. Note that $x_0=0$ and $z_0=0$, so the motion is purely in-plane.
Let $c = \cos(nT)$ and $s = \sin(nT)$.
$nT = 0.00113 \times 600 \approx 0.678$ rad.
$c \approx 0.779$, $s \approx 0.627$.

From the first row (for $x_f=0$):
$x_f = 0 = (4-3c)x_0 + (0)y_0 + \frac{s}{n}\dot{x}_0 + \frac{2(1-c)}{n}\dot{y}_0$
Since $x_0=0$:
$0 = \frac{s}{n}\dot{x}_0 + \frac{2(1-c)}{n}\dot{y}_0 \implies s\dot{x}_0 + 2(1-c)\dot{y}_0 = 0$
$0.627\dot{x}_0 + 2(1-0.779)\dot{y}_0 = 0 \implies 0.627\dot{x}_0 + 0.442\dot{y}_0 = 0$

From the second row (for $y_f=0$):
$y_f = 0 = 6(s-nt)x_0 + (1)y_0 - \frac{2(1-c)}{n}\dot{x}_0 + \frac{4s-3nt}{n}\dot{y}_0$
Since $x_0=0$:
$0 = y_0 - \frac{2(1-c)}{n}\dot{x}_0 + \frac{4s-3nt}{n}\dot{y}_0$
$0 = -100 - \frac{0.442}{0.00113}\dot{x}_0 + \frac{4(0.627)-3(0.678)}{0.00113}\dot{y}_0$
$0 = -100 - 391.15\dot{x}_0 + 423.0\dot{y}_0$

We have a system of two linear equations for $\dot{x}_0$ and $\dot{y}_0$:
1) $0.627\dot{x}_0 + 0.442\dot{y}_0 = 0 \implies \dot{x}_0 = -0.705\dot{y}_0$
2) $391.15\dot{x}_0 - 423.0\dot{y}_0 = -100$

Substitute (1) into (2):
$391.15(-0.705\dot{y}_0) - 423.0\dot{y}_0 = -100$
$-275.76\dot{y}_0 - 423.0\dot{y}_0 = -100$
$-698.76\dot{y}_0 = -100 \implies \dot{y}_0 \approx 0.143 \, \text{m/s}$

Now find $\dot{x}_0$:
$\dot{x}_0 = -0.705(0.143) \approx -0.101 \, \text{m/s}$

Since $z_0=0$ and we want $z_f=0$, we need $\dot{z}_0=0$.

**Result:** The required initial velocity is $\vec{v}_0 = (-0.101, 0.143, 0) \, \text{m/s}$.

**Reflection:**
- Step 1 established the physical context.
- Step 2 translated the problem statement into precise initial/final state vectors.
- Step 3 used the known analytical solution to the CW equations. This is the core tool.
- Step 4 was algebraic manipulation to solve for the unknowns. The key was recognizing we had a 2x2 linear system for the initial velocities. The result is a small velocity "down and forward" to start drifting "up and forward" to meet the target.

## Diagrams
This ASCII diagram shows the Local-Vertical, Local-Horizontal (LVLH) frame centered on the Target spacecraft.

```text
                  ^ +x (R-bar, Radial, "Up")
                  |
                  |
                  |
       ISS/Target o----------------> +y (V-bar, In-track, "Forward")
                /
               /
              /
             v +z (H-bar, Cross-track, "Out of Plane")

<-- To Earth's Center
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you are on a circular playground merry-go-round (the orbit). Your friend (the target) is in the center. To get to them, you can't just walk straight. If you try to run "forward" (in the direction of spin), centrifugal force pushes you "out" (up). This is the orbital dance: **"Forward thrust sends you up and back. A braking thrust sends you down and forward."** This counter-intuitive behavior is the essence of the CW equations.

2.  **Must-Memorize Formulas:** The differential equations themselves. They encode the physics.
    $$ \ddot{x} - 2n\dot{y} - 3n^2x = 0 $$
    $$ \ddot{y} + 2n\dot{x} = 0 $$
    $$ \ddot{z} + n^2z = 0 $$
    -   The $2n\dot{v}$ terms are Coriolis forces.
    -   The $n^2r$ terms are combinations of gravity gradient and centrifugal forces.

3.  **Spaced Repetition Schedule:** Review this material and re-derive the equations from the rotating frame equation:
    -   In 24 hours.
    -   In 3 days.
    -   In 7 days.
    -   In 16 days.
    -   In 35 days.

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    -   Start with Newton's law for two bodies: $\ddot{\vec{r}} = -\frac{\mu}{r^3}\vec{r}$.
    -   Define relative position: $\vec{\rho} = \vec{r}_c - \vec{r}_t$.
    -   Write the relative acceleration: $\ddot{\vec{\rho}} = \ddot{\vec{r}}_c - \ddot{\vec{r}}_t = -\frac{\mu}{r_c^3}\vec{r}_c + \frac{\mu}{r_t^3}\vec{r}_t$.
    -   Use the transport theorem to express this in a frame rotating with the target at rate $\vec{\omega} = (0, 0, n)$. This will introduce Coriolis ($2\vec{\omega} \times \dot{\vec{\rho}}$) and centrifugal ($\vec{\omega} \times (\vec{\omega} \times \vec{\rho})$) terms.
    -   Linearize the gravity term using the binomial expansion: $(r_t+x)^{-2} \approx r_t^{-2}(1 - 2x/r_t)$.
    -   Collect terms for each component ($\hat{x}, \hat{y}, \hat{z}$) to get the three final equations.

## Common mistakes
1.  **Intuitive Control:** Applying a thrust in the +y direction and expecting to move only in the +y direction. The Coriolis term couples the motion, so a pure y-velocity change causes an x-acceleration.
2.  **Ignoring Assumptions:** Using the CW equations for highly elliptical orbits, large separations, or long time periods. The linearization breaks down, and the results will be inaccurate. They are only valid for `(distance/orbital radius) << 1`.
3.  **Frame Confusion:** Mixing up the LVLH frame axes. Remember: x is radial ("up"), y is in-track ("forward"). A common error is to have the chaser "above" the target and call that a positive y-offset instead of a positive x-offset.

## Self-check
1.  Why is the out-of-plane ($z$) motion described by a simple harmonic oscillator, while the in-plane ($x, y$) motion is much more complex? What physical coupling is absent in the $z$ direction?
2.  A chaser is at rest relative to the target, but displaced 10 meters "above" it (i.e., $x_0=10, y_0=0, z_0=0, \dot{\vec{\rho}}_0=\vec{0}$). Without performing a full calculation, describe the initial direction of its motion in the y-direction. Does it move forward or backward? Why?
3.  Design a "V-bar hop." A chaser starts at $y_0 = -200$ m. Calculate the two impulsive velocity changes ($\Delta V$) required to have it drift to $y_f = +200$ m over one full orbit, arriving with zero relative velocity. The first impulse is at $t=0$, the second is at $t=T_{orbit}$.