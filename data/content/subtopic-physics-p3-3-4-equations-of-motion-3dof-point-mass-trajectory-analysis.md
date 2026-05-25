## What it is
The three-degree-of-freedom (3DOF) equations of motion describe the trajectory of a rocket, treating it as a single point in space (a point mass). These equations track the rocket's position ($x, y, z$) over time by applying Newton's Second Law, summing up all external forces: thrust, drag, and gravity. This model intentionally ignores the rocket's rotational motion (pitch, yaw, roll) to focus purely on its path.

## Why it matters
This 3DOF model is the workhorse of preliminary trajectory design and performance analysis in aerospace engineering. It's used to calculate key parameters like maximum altitude (apogee), downrange distance, and velocity profiles for everything from sounding rockets to orbital launch vehicles. In machine learning, these equations form the basis of the "world model" for reinforcement learning agents that learn to control rocket trajectories for optimal fuel usage or payload delivery.

## When to study it
You should have a firm grasp of Newtonian mechanics, particularly vector calculus and Newton's Second Law ($\vec{F}=m\vec{a}$). You must be comfortable with resolving vectors into components in different coordinate systems (e.g., Cartesian). A basic understanding of ordinary differential equations (ODEs) is also necessary, as these equations of motion form a system of coupled, non-linear second-order ODEs.

## How to study it (step by step)
1.  **First Principles:** Start with a blank page. Write down Newton's Second Law in vector form: $\sum \vec{F} = m\vec{a}$. State in words that your goal is to find expressions for each force vector ($\vec{F}$), the mass ($m$), and the acceleration vector ($\vec{a}$), then solve for the rocket's position vector $\vec{r}(t)$.
2.  **Define Forces and Coordinates:** Draw a free-body diagram of a rocket in flight. Identify the four fundamental forces: Thrust ($\vec{T}$), Drag ($\vec{D}$), Lift ($\vec{L}$), and Gravity ($\vec{W}$). For a 3DOF analysis of a symmetric rocket, we often assume $\vec{L}=0$. Establish a local tangent plane coordinate system (e.g., East-North-Up or ENU) that will serve as our quasi-inertial frame.
3.  **Vector Decomposition:** Write out the mathematical expression for each force vector in your chosen coordinate system. This is the most critical step. Pay close attention to the direction of each vector. For example, gravity is always downwards, while drag is always opposite the velocity vector.
4.  **Assemble the System:** Substitute your vector expressions into $\sum \vec{F} = m(t)\ddot{\vec{r}}(t)$. Separate this single vector equation into three scalar component equations for the $\ddot{x}$, $\ddot{y}$, and $\ddot{z}$ accelerations.
5.  **Solve a Simplified Case:** Manually solve the equations for a vertical launch with no drag. This will build intuition. Then, write down the full equations for the vertical launch *with* drag, and recognize that it requires numerical integration (e.g., Euler's method or Runge-Kutta) to solve.
6.  **Code It:** Implement a simple numerical solver (like Euler's method) in a language of your choice (Python with NumPy is ideal) for the vertical launch case. Plot the altitude and velocity vs. time. This transitions the theory from abstract equations to a concrete simulation.

## Key ideas, with intuition
1.  **Newton's Second Law is the Single Source of Truth.** All trajectory analysis boils down to $\sum \vec{F} = m\vec{a}$. The entire challenge is correctly defining the terms.
    $$ \sum \vec{F} = \vec{T}(t) + \vec{D}(\vec{v}, \rho) + \vec{W}(h) = m(t)\ddot{\vec{r}}(t) $$
    This equation tells a story: the sum of thrust, drag, and weight dictates the rocket's acceleration at any instant, while its mass changes over time.

2.  **Coordinate Systems are a Choice, Not a Fact.** We choose a coordinate system to make the math easier. A ground-based "East-North-Up" (ENU) frame is great for defining the rocket's position $\vec{r}$ and the gravity vector $\vec{W}$. However, forces like Thrust ($\vec{T}$) are most natural in a body-fixed frame, and Drag ($\vec{D}$) is simplest in a velocity frame. The core task is transforming all forces into one common inertial frame (the ENU frame) to be summed up.

3.  **The State Vector Contains Everything.** The rocket's state at any time $t$ can be described by its position and velocity: $(\vec{r}, \vec{v})$. The equations of motion tell you how to get from the state at time $t$ to the state at time $t+dt$. This is the heart of numerical simulation: given the current state, calculate the forces, find the acceleration, and take a small step forward in time.

4.  **It's a System of Coupled, Non-Linear ODEs.** This sounds intimidating, but it just means the variables depend on each other in complex ways. The drag force depends on velocity squared ($D \propto v^2$), the acceleration in the x-direction depends on the velocity components in all three directions ($\ddot{x}$ depends on $\dot{x}, \dot{y}, \dot{z}$ via the drag term), and gravity depends on altitude ($g(z)$). This is why we can't find a simple, elegant closed-form solution and must turn to computers.

## Worked example
**Problem:** A sounding rocket with an initial mass $m_0 = 1000$ kg is launched vertically. Its engine produces a constant thrust $T = 30,000$ N and has a constant mass flow rate $\dot{m} = 10$ kg/s. Assume a constant gravitational acceleration $g=9.81 \text{ m/s}^2$ and neglect air resistance. Find the rocket's velocity and altitude at engine burnout.

**Solution:**
1.  **Identify the governing equation.** Since the launch is vertical and we neglect drag, we only need the z-component of the equation of motion.
    $$ \sum F_z = T - W = m(t)\ddot{z} $$

2.  **Define the time-varying mass.** The mass decreases linearly with time.
    $$ m(t) = m_0 - \dot{m}t $$

3.  **Set up the differential equation.** Substitute the mass and weight ($W=m(t)g$) into the equation of motion.
    $$ T - (m_0 - \dot{m}t)g = (m_0 - \dot{m}t)\ddot{z} $$
    The acceleration is $\ddot{z} = a_z$.
    $$ a_z(t) = \frac{T}{m_0 - \dot{m}t} - g $$

4.  **Integrate for velocity.** To find velocity $v_z(t)$, we integrate acceleration from $t=0$ to $t$. The initial velocity is $v_z(0)=0$.
    $$ v_z(t) = \int_0^t a_z(\tau) d\tau = \int_0^t \left( \frac{T}{m_0 - \dot{m}\tau} - g \right) d\tau $$
    $$ v_z(t) = \left[ -\frac{T}{\dot{m}}\ln(m_0 - \dot{m}\tau) - g\tau \right]_0^t $$
    $$ v_z(t) = -\frac{T}{\dot{m}}\left( \ln(m_0 - \dot{m}t) - \ln(m_0) \right) - gt $$
    $$ v_z(t) = \frac{T}{\dot{m}}\ln\left(\frac{m_0}{m_0 - \dot{m}t}\right) - gt $$
    This is a variant of the Tsiolkovsky rocket equation, but including the gravity loss term.

5.  **Calculate burnout time and velocity.** The engine burns until all propellant is exhausted. Let's assume the propellant mass is $m_p = 800$ kg. Burnout time $t_b = m_p / \dot{m} = 800 \text{ kg} / 10 \text{ kg/s} = 80$ s.
    Now, substitute the values into the velocity equation at $t=t_b=80$ s.
    $$ v_z(80) = \frac{30000}{10}\ln\left(\frac{1000}{1000 - 10 \cdot 80}\right) - 9.81 \cdot 80 $$
    $$ v_z(80) = 3000\ln\left(\frac{1000}{200}\right) - 784.8 $$
    $$ v_z(80) = 3000\ln(5) - 784.8 \approx 3000(1.6094) - 784.8 $$
    $$ v_z(80) \approx 4828.2 - 784.8 = 4043.4 \text{ m/s} $$

6.  **Integrate for altitude.** This requires integrating the velocity equation, which is more involved. For this example, finding the velocity is sufficient to demonstrate the method.

**Reflection:** Each step builds on the last. We started with the fundamental principle ($\vec{F}=m\vec{a}$), tailored it to the specific problem (vertical, no drag), expressed all terms, and solved the resulting differential equation through integration. This systematic process is the key to solving any trajectory problem.

## Diagrams
Here is a diagram showing the forces on the rocket and the ENU coordinate system.

```text
      ^ U (Up)
      |
      |      T (Thrust)
      |      ^
      |     /|\
      |    | o |
      |    | o | ----> N (North)
      |    | o |
      |     \|/
      |      v
      |      D (Drag, opposite velocity)
      |      v
      |      W (Weight/Gravity)
     /
    /
   E (East)
```

A second diagram clarifying the relationship between the thrust vector, velocity vector, and the flight path angle $\gamma$.

```text
        ^ Thrust Vector (along body axis)
       /
      /
     /
    /  <-- Angle of Attack (alpha)
   /
  ----------------> Velocity Vector (v)
  .  .
  .     .
  .        .
  . . . . . . . . .> Local Horizontal
     ^
     | Flight Path Angle (gamma)
```
For a simple 3DOF model, we often assume the angle of attack is zero, so the thrust vector aligns with the velocity vector. This is called a "gravity turn" trajectory.

## Memory technique — remember this forever
1.  **Mnemonic:** Think **"TAG, you're it!"** to remember the forces. But the "it" is acceleration. **T**hrust, **A**erodynamics (Drag), **G**ravity = **m**ass * **a**cceleration.
2.  **Must-Know Formulas:**
    $$ \sum \vec{F} = m(t)\ddot{\vec{r}} $$
    $$ \vec{D} = -\frac{1}{2} \rho |\vec{v}|^2 C_D A \frac{\vec{v}}{|\vec{v}|} $$
    $$ m(t) = m_0 - \int_0^t \dot{m}(\tau)d\tau $$
3.  **Spaced Repetition Schedule:** Review this material from scratch on paper in **1 day, 3 days, 7 days, 16 days, and 35 days**. Do not just read it; re-derive it.
4.  **First Principles Pathway:** If you forget everything, start with a dot on a page representing the rocket. Ask: "What is pushing or pulling on this dot?" Draw arrows for Thrust, Drag, and Gravity. Write down Newton's Second Law, $\sum \vec{F} = m\vec{a}$. The rest is just expressing those arrows and the acceleration in a consistent coordinate system. You can always rebuild it from that.

## Common mistakes
1.  **Mass Confusion:** Forgetting that mass $m(t)$ is a function of time. Students often use the initial mass $m_0$ for the entire flight, which dramatically under-predicts performance.
2.  **Vector Direction Errors:** Defining the drag vector incorrectly. Drag, $\vec{D}$, always opposes the **velocity vector** $\vec{v}$, not necessarily the rocket's nose or the thrust vector. If the rocket is flying with a non-zero angle of attack, these directions are different.
3.  **Coordinate System Mixing:** Adding vectors defined in different coordinate systems without transforming them first. For example, adding a thrust vector defined in a body-fixed frame directly to a gravity vector defined in an Earth-fixed frame. All vectors must be resolved into a single, common inertial frame before being summed.
4.  **Ignoring the Atmosphere:** Assuming air density $\rho$ is constant. Density changes exponentially with altitude, which has a massive effect on drag. For any realistic simulation, $\rho$ must be a function of altitude, $\rho(z)$.

## Self-check
1.  Write the 3DOF equations of motion (the three scalar equations for $\ddot{x}, \ddot{y}, \ddot{z}$) for a rocket in a vacuum ($D=0$) over a flat, non-rotating Earth. Assume thrust $T$ is pointed at a constant elevation angle $El$ and azimuth angle $Az$.
2.  How would you modify your drag model $\vec{D} = f(\vec{v}, ...)$ to account for a constant wind blowing from west to east with velocity $\vec{v}_{wind}$? (Hint: What velocity does the air "see"?)
3.  If you were to upgrade your 3DOF model to account for the Earth's rotation, what new "fictitious" force(s) would you need to add to the right-hand side of $\sum \vec{F} = m\vec{a}$? In which direction would the primary component of this force act on a rocket launched eastward from the equator?