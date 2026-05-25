## What it is
Power is the rate at which work is done or energy is transferred. It measures not just the total amount of energy used, but how quickly that energy is delivered. An engine's power tells you how fast it can convert fuel's chemical energy into the kinetic energy of motion.

## Why it matters
In aerospace, a rocket engine's power output ($P = \vec{F}_{thrust} \cdot \vec{v}$) determines how rapidly it can accelerate a spacecraft, directly impacting its ability to reach orbital velocity. In computing, the power consumption of a processor (in Watts) dictates its heat output, which is the primary constraint on performance and chip design. Understanding power is fundamental to analyzing the performance limits of any system that transforms energy.

## When to study it
Before tackling power, you must have a firm grasp of **Work** ($W$), **Energy** (specifically Kinetic Energy, $K$), and the **Work-Energy Theorem** ($W_{net} = \Delta K$). You also need a foundational understanding of differential calculus, specifically the concept of a derivative ($\frac{df}{dt}$) as an instantaneous rate of change. If you cannot explain the difference between average velocity and instantaneous velocity, review that first.

## How to study it (step by step)
1.  **Master the definition of Average Power.** Start with the algebraic definition: $P_{avg} = \frac{\Delta W}{\Delta t} = \frac{\text{Work done}}{\text{time interval}}$. Solve a simple problem: Calculate the average power required to lift a 20 kg crate a vertical distance of 10 m in 4 seconds.
2.  **Internalize the transition to Instantaneous Power.** Recognize that "instantaneous" in physics is a signal to use calculus. Just as instantaneous velocity $v = \frac{dx}{dt}$ is the limit of average velocity $\frac{\Delta x}{\Delta t}$ as $\Delta t \to 0$, instantaneous power is the limit of average power: $P = \lim_{\Delta t \to 0} \frac{\Delta W}{\Delta t} = \frac{dW}{dt}$.
3.  **Derive the Force-Velocity relationship.** This is critical. Start from $P = \frac{dW}{dt}$. Recall the definition of differential work done by a force $\vec{F}$ over a differential displacement $d\vec{r}$ is $dW = \vec{F} \cdot d\vec{r}$. Substitute this into the power equation: $P = \frac{\vec{F} \cdot d\vec{r}}{dt}$. Regroup the terms: $P = \vec{F} \cdot \left(\frac{d\vec{r}}{dt}\right)$. Since $\vec{v} = \frac{d\vec{r}}{dt}$, you arrive at $P = \vec{F} \cdot \vec{v}$.
4.  **Solve a problem using $P = \vec{F} \cdot \vec{v}$**. Consider a car with an engine delivering 30 kW of power to the wheels. If the total resistive force (air drag, friction) is 600 N, what is the car's maximum speed? This forces you to see the relationship between power, force, and velocity.
5.  **Analyze the units.** The SI unit of power is the Watt (W), named after James Watt. From the definition, prove to yourself that $1 \text{ Watt} = 1 \frac{\text{Joule}}{\text{second}}$. Then, break the Joule down into base SI units ($1 J = 1 N \cdot m = 1 (kg \cdot m/s^2) \cdot m$) to show that $1 W = 1 \frac{kg \cdot m^2}{s^3}$.

## Key ideas, with intuition
1.  **Power is the "flow rate" of energy.** Think of work/energy as a volume of water. Power is the rate at which water flows through a pipe (e.g., liters per second). A massive reservoir (high energy) with a tiny pipe (low power) can't do much quickly. A small tank (low energy) with a huge pipe (high power) can deliver a massive burst for a short time.
2.  **Average vs. Instantaneous is a question of timescale.** Average power tells you the overall performance across a duration. If you run a marathon, your average power output might be a few hundred watts. Instantaneous power is your output *at this very second*. When you sprint for the finish line, your instantaneous power might spike to over a thousand watts, while at other times it might be near zero. Calculus makes this distinction precise.
    $$ P_{avg} = \frac{W_{total}}{t_{total}} $$
    $$ P(t) = \frac{dW}{dt} $$
3.  **The Force-Velocity trade-off.** The relationship $P = \vec{F} \cdot \vec{v}$ is crucial. For a system with a constant power output (like a car engine at a certain RPM), force and velocity are inversely proportional. To get a large force (like when starting from a stoplight), you need a low velocity (low gear). To achieve a high velocity, you must accept a lower forward force (high gear). This equation governs the performance envelope of vehicles.

## Worked example
**Problem:** A 1500 kg satellite is in a circular orbit. A thruster is fired, providing a constant power of 3.0 kW. The thruster's force is always directed along the satellite's velocity vector. How long does it take for the satellite to accelerate from an initial speed of 7000 m/s to a final speed of 7500 m/s?

**Solution:**
1.  **Identify the governing principle.** The thruster is doing work on the satellite, which changes its kinetic energy. The power is given as the rate at which this work is done. The key connection is Power -> Work -> Kinetic Energy.
2.  **State the relationship.** We know that power $P$ is the rate of change of work, $P = \frac{dW}{dt}$. By the Work-Energy Theorem, the work done on the satellite equals the change in its kinetic energy, $W = \Delta K$. Therefore, power is the rate of change of kinetic energy: $P = \frac{dK}{dt}$.
3.  **Set up the integral.** Since power is constant, we can separate variables and integrate.
    $$ dK = P \, dt $$
    We integrate from the initial state (time $t_i=0$, kinetic energy $K_i$) to the final state (time $t_f=T$, kinetic energy $K_f$).
    $$ \int_{K_i}^{K_f} dK = \int_{0}^{T} P \, dt $$
4.  **Evaluate the integral.** Since $P$ is constant, the right side is simple.
    $$ K_f - K_i = P \int_{0}^{T} dt = P T $$
5.  **Substitute the expression for kinetic energy.** $K = \frac{1}{2}mv^2$.
    $$ \frac{1}{2}mv_f^2 - \frac{1}{2}mv_i^2 = P T $$
6.  **Solve for the unknown time, T.**
    $$ T = \frac{\frac{1}{2}m(v_f^2 - v_i^2)}{P} $$
7.  **Plug in the numbers.** Ensure all units are SI. $P = 3.0 \text{ kW} = 3000 \text{ W}$.
    $$ T = \frac{\frac{1}{2}(1500 \text{ kg})((7500 \text{ m/s})^2 - (7000 \text{ m/s})^2)}{3000 \text{ W}} $$
    $$ T = \frac{750 \cdot (5.625 \times 10^7 - 4.9 \times 10^7)}{3000} $$
    $$ T = \frac{750 \cdot (7.25 \times 10^6)}{3000} = \frac{5.4375 \times 10^9}{3 \times 10^3} $$
    $$ T = 1.8125 \times 10^6 \text{ seconds} $$
    This is approximately 21 days.

**Reflection:** This problem could not be solved using $P=Fv$ directly because as speed $v$ increases, the force $F$ from the constant-power thruster must decrease. Instead, the most direct path was relating power to the rate of change of energy. This is a common and powerful technique when dealing with problems involving constant power.

## Diagrams
A graph of Work done versus time. The slope of this graph is Power.

```text
      Work (J)
        ^
        |
        |      /
        |     /  <-- The slope of the tangent line at this point
        |    .       is the instantaneous power P(t).
        |   /
        |  /
        | /
        |/
        +----------------> Time (s)
```

The average power between two points in time is the slope of the straight line (the secant line) connecting them. The instantaneous power is the slope of the curve itself at a single point (the tangent line).

## Memory technique — remember this forever
1.  **Visual Hook:** Picture a powerful weightlifter (like The Rock) lifting a heavy weight. The *Work* is lifting the weight to a certain height. The *Power* is how *fast* he does it. An explosive, one-second lift is incredibly high power. A slow, grinding ten-second lift is the same work, but much lower power. **Power is about the speed of the energy transfer.**
2.  **Formulas to Overlearn:**
    $$ P = \frac{dW}{dt} \quad (\text{The Definition}) $$
    $$ P = \vec{F} \cdot \vec{v} \quad (\text{The Application}) $$
3.  **Spaced Repetition Schedule:** Review these formulas and the weightlifter visual. Do one practice problem at these intervals:
    *   24 hours from now.
    *   3 days from now.
    *   7 days from now.
    *   16 days from now.
    *   35 days from now.
4.  **First Principles Pathway:** If you forget everything, rebuild from the definition of work.
    *   Power is the rate of work: $P = \frac{dW}{dt}$.
    *   What is a small amount of work, $dW$? It's force dotted with a small displacement: $dW = \vec{F} \cdot d\vec{r}$.
    *   Substitute: $P = \frac{\vec{F} \cdot d\vec{r}}{dt}$.
    *   Recognize the definition of velocity: $\vec{v} = \frac{d\vec{r}}{dt}$.
    *   Substitute again: $P = \vec{F} \cdot \vec{v}$. You have re-derived the key application formula.

## Common mistakes
1.  **Confusing Energy and Power.** A battery stores energy (Joules). The rate at which it can discharge that energy is power (Watts). A car's fuel tank holds energy; its engine produces power. Do not use the terms interchangeably.
2.  **Ignoring the Dot Product.** In $P = \vec{F} \cdot \vec{v} = Fv\cos\theta$, if the force is perpendicular to the velocity ($\theta=90^\circ$), the power delivered by that force is zero. For example, the tension in the string of a pendulum swinging in a circle does no work and generates no power, because it's always perpendicular to the bob's motion.
3.  **Using $P=Fv$ when $F$ or $v$ are not constant.** If you are asked for average power over an interval where velocity changes, you cannot just pick the final velocity and use $P=Fv_f$. You must calculate the total work done and divide by the total time, $\frac{W_{total}}{\Delta t}$.

## Self-check
1.  An electric motor powers a pump that lifts 30 kg of water per minute from a well that is 20 m deep. What is the minimum average power, in Watts, that the motor must supply? (Assume the water is lifted at a constant speed).
2.  A force $\vec{F} = (3t)\hat{i} + (4)\hat{j}$ Newtons acts on a particle, causing its position to be $\vec{r} = (t^2)\hat{i} + (2t)\hat{j}$ meters. What is the instantaneous power delivered by the force at $t=2$ seconds?
3.  The engine of a 1200 kg car delivers a constant power of 40 kW. The car starts from rest. Neglecting all friction, derive an expression for the car's velocity $v$ as a function of time $t$. What is its acceleration $a$ as a function of time $t$?