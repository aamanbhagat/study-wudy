## What it is
The SUVAT equations are a set of five formulas that describe the motion of an object under **constant acceleration**. They relate five key variables: displacement ($s$), initial velocity ($u$), final velocity ($v$), acceleration ($a$), and time ($t$). The name "SUVAT" is an acronym of these variables, though the order of letters can vary.

## Why it matters
These equations are the bedrock of classical mechanics. In rocket science, they provide the first approximation for launch and landing trajectories where thrust is constant or during freefall phases. In computer science, they appear in physics engines for games and simulations, and the underlying principle of accumulating change (integration) is fundamental to algorithms from numerical analysis to machine learning optimizers like gradient descent with momentum.

## When to study it
You must be comfortable with the following before proceeding:
1.  **Definitions of Kinematic Variables:** You must know what displacement, velocity, and acceleration are, and the distinction between speed and velocity.
2.  **Differential Calculus:** You must understand that velocity is the time derivative of displacement ($v = \frac{ds}{dt}$) and acceleration is the time derivative of velocity ($a = \frac{dv}{dt} = \frac{d^2s}{dt^2}$).
3.  **Integral Calculus:** You must understand integration as the inverse of differentiation and as a method for finding the total accumulation of a quantity. Specifically, you need to be able to integrate constant and linear functions, e.g., $\int k \, dt$ and $\int (mt+c) \, dt$.

If these prerequisites are not solid, pause and review them. The derivations will be meaningless otherwise.

## How to study it (step by step)
1.  **Start with the definition.** Write down the fundamental assumption: acceleration $a$ is constant. Express this as a differential equation: $a = \frac{dv}{dt}$.
2.  **Derive the first equation.** Integrate the equation from Step 1 with respect to time. Use a definite integral from time $t=0$ to a general time $t$. The corresponding limits for velocity will be the initial velocity $u$ and the final velocity $v$. This will yield the first SUVAT equation.
3.  **Derive the second equation.** Take your result from Step 2, which expresses $v$ as a function of $t$. Substitute this into the definition $v = \frac{ds}{dt}$. You now have a new differential equation for displacement $s$.
4.  **Integrate again.** Integrate the equation from Step 3 with respect to time. Use a definite integral from $t=0$ to $t$. Assume the initial displacement is $s_0 = 0$ and the final displacement is $s$. This will yield the second key SUVAT equation.
5.  **Derive the "timeless" equation.** Take the first two equations you derived. Algebraically eliminate the variable $t$ between them. This will produce the third key SUVAT equation, which is powerful because it relates displacement, velocity, and acceleration without reference to time.
6.  **Solve a problem.** Find a standard constant-acceleration problem (e.g., an object in freefall near Earth's surface) and solve it using only the equations you just derived. Do not use any you haven't proven.

## Key ideas, with intuition
1.  **Constant Acceleration is the Master Assumption.** The entire framework rests on $a$ being a constant. If acceleration changes with time (e.g., due to air resistance increasing with speed), these equations fail. Visually, this means the velocity-time graph is a straight line, and the acceleration-time graph is a flat, horizontal line.

2.  **Integration Finds the Total.** Calculus provides the tools to move "up" the chain from acceleration to velocity to displacement.
    *   To get from acceleration to velocity, you integrate. Why? Because you're summing up all the tiny additions of velocity ($\Delta v = a \cdot \Delta t$) over a time interval.
    $$ \Delta v = v - u = \int_{0}^{t} a \, dt' $$
    *   To get from velocity to displacement, you integrate again. Why? You're summing up all the tiny displacements ($\Delta s = v \cdot \Delta t$) over a time interval.
    $$ s = \int_{0}^{t} v(t') \, dt' $$

3.  **Initial Conditions are the "Starting Point".** When we integrate, we get a family of possible functions (e.g., $\int a \, dt = at + C$). The constant of integration, $C$, is determined by the state of the system at $t=0$. In our derivations, this constant is the initial velocity, $u$. Using definite integrals from $0$ to $t$ automatically handles these initial conditions for us.

## Worked example
**Problem:** A rocket sled accelerates from rest at a constant rate of $a = 40 \, \text{m/s}^2$. How fast is it going after it has traveled $s = 500 \, \text{m}$?

**Derivations (as if doing this from first principles):**

1.  **Step 1: Find v(t).**
    Start with constant acceleration:
    $$ \frac{dv}{dt} = a $$
    Integrate both sides. We use a definite integral from the initial state (time 0, velocity $u$) to the final state (time $t$, velocity $v$).
    $$ \int_{u}^{v} dv' = \int_{0}^{t} a \, dt' $$
    Since $a$ is constant, it comes out of the integral:
    $$ [v']_{u}^{v} = a [t']_{0}^{t} $$
    $$ v - u = a(t - 0) \implies v = u + at \quad \text{(Equation 1)} $$

2.  **Step 2: Find s(t).**
    Start with the definition of velocity, substituting Equation 1:
    $$ \frac{ds}{dt} = v = u + at $$
    Integrate from initial state (time 0, position 0) to final state (time $t$, position $s$):
    $$ \int_{0}^{s} ds' = \int_{0}^{t} (u + at') \, dt' $$
    $$ [s']_{0}^{s} = [ut' + \frac{1}{2}a(t')^2]_{0}^{t} $$
    $$ s - 0 = (ut + \frac{1}{2}at^2) - (0 + 0) \implies s = ut + \frac{1}{2}at^2 \quad \text{(Equation 2)} $$

3.  **Step 3: Eliminate time to get the required formula.**
    The problem gives $s$, $u$, and $a$, and asks for $v$. Neither Equation 1 nor 2 can solve this in one step. We need an equation without $t$.
    From Equation 1, isolate $t$: $t = \frac{v-u}{a}$.
    Substitute this into Equation 2:
    $$ s = u\left(\frac{v-u}{a}\right) + \frac{1}{2}a\left(\frac{v-u}{a}\right)^2 $$
    $$ s = \frac{uv - u^2}{a} + \frac{1}{2}a\left(\frac{v^2 - 2uv + u^2}{a^2}\right) $$
    $$ s = \frac{uv - u^2}{a} + \frac{v^2 - 2uv + u^2}{2a} $$
    Multiply the entire equation by $2a$ to clear the denominators:
    $$ 2as = 2(uv - u^2) + (v^2 - 2uv + u^2) $$
    $$ 2as = 2uv - 2u^2 + v^2 - 2uv + u^2 $$
    $$ 2as = v^2 - u^2 \implies v^2 = u^2 + 2as \quad \text{(Equation 3)} $$

4.  **Step 4: Solve the problem.**
    We have $u=0$ ("from rest"), $a = 40 \, \text{m/s}^2$, and $s = 500 \, \text{m}$. We need $v$. Equation 3 is perfect.
    $$ v^2 = (0)^2 + 2(40)(500) $$
    $$ v^2 = 40000 $$
    $$ v = \sqrt{40000} = 200 \, \text{m/s} $$

**Reflection:** We started from the two fundamental definitions, $a = dv/dt$ and $v = ds/dt$. By assuming $a$ is constant, we could integrate twice to get equations for $v(t)$ and $s(t)$. Because the specific problem didn't involve time, we performed an algebraic step to eliminate $t$ and derive a third equation perfectly suited to the given information. This demonstrates how the five SUVAT equations form a complete system for this type of motion.

## Diagrams

A velocity-time graph for constant acceleration is fundamental.

```text
      v (velocity)
      ^
      |
      |                     /
      |                    /
      |                   /
      |                  / |
      |                 /  |
      |                /   | v = u + at
      |               /    |
      |              /     |
      |             /      |
      |            /       |
      |           /        |
      |          /         |
     u +--------+----------+
      |         |          |
      |         |          |
      +---------|----------|-----> t (time)
                0          t
```
*   **Gradient:** The slope of the line is $\frac{\Delta v}{\Delta t} = \frac{(u+at)-u}{t} = \frac{at}{t} = a$. The gradient is the acceleration.
*   **Area:** The area under the graph is the displacement, $s$. The area is a trapezoid: $\text{Area} = \frac{1}{2}(\text{base}_1 + \text{base}_2) \times \text{height} = \frac{1}{2}(u+v)t$. This is another one of the five SUVAT equations. You can also see it as a rectangle (area $ut$) plus a triangle (area $\frac{1}{2} \times t \times (v-u) = \frac{1}{2}t(at) = \frac{1}{2}at^2$), giving $s = ut + \frac{1}{2}at^2$.

## Memory technique — remember this forever
1.  **Story:** Imagine a car at a stoplight.
    *   Its initial velocity is $u$. The light turns green.
    *   The driver presses the accelerator, causing a constant acceleration $a$.
    *   After time $t$, its final velocity is $v$, and it has traveled a displacement $s$.
    *   SUVAT are the five variables that tell this entire simple story.

2.  **Must Overlearn Formulas:** These three are the most important as the others can be derived from them.
    $$ v = u + at $$
    $$ s = ut + \frac{1}{2}at^2 $$
    $$ v^2 = u^2 + 2as $$

3.  **Spaced Repetition Schedule:** Review these derivations and formulas at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Actively re-derive them from scratch each time.

4.  **First Principles Pathway:** If you forget everything, remember two facts:
    1.  **Definition of acceleration:** $a = \frac{dv}{dt}$
    2.  **Definition of velocity:** $v = \frac{ds}{dt}$
    ...and one assumption: **$a$ is constant.**
    From there, you can integrate the first equation to get $v(t)$, then integrate that to get $s(t)$, then eliminate $t$ to get the third equation. You can rebuild the entire system from just these definitions.

## Common mistakes
1.  **Using SUVAT when acceleration is not constant.** This is the cardinal sin. If a problem involves air resistance, orbital mechanics (where gravity changes with distance), or springs, these equations do not apply without modification.
2.  **Sign Convention Errors.** If you define "up" as the positive direction, then acceleration due to gravity $g$ must be negative ($a = -9.81 \, \text{m/s}^2$). All vectors ($s, u, v, a$) in a given problem must use the same coordinate system.
3.  **Units Mismatch.** Mixing kilometers per hour for velocity with seconds for time. Convert all variables to a consistent set of units (usually SI units) before starting calculations.

## Self-check
1.  A car traveling at $20 \, \text{m/s}$ brakes with a constant deceleration of $5 \, \text{m/s}^2$. How far does it travel before coming to a stop?
2.  A stone is thrown vertically upwards with a velocity of $15 \, \text{m/s}$. What is the maximum height it reaches, and how long does it take to get there? (Use $g = 9.81 \, \text{m/s}^2$).
3.  Starting only from $v = u + at$ and $s = \frac{1}{2}(u+v)t$, derive the equation $v^2 = u^2 + 2as$ without using calculus. What does this tell you about the logical interdependence of the five equations?