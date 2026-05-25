## What it is
Potential energy, $U$, is the energy stored in a system due to its position or configuration. It represents the "potential" for a conservative force (like gravity or an elastic spring force) to perform work. It is not an absolute quantity; only the *change* in potential energy, $\Delta U$, is physically meaningful.

## Why it matters
Understanding potential energy is fundamental to orbital mechanics and rocket science. Calculating the energy required to place a satellite in a stable orbit or to achieve escape velocity from a planet relies directly on the gravitational potential energy formula, $U_g = -GMm/r$. In machine learning, optimization algorithms are often conceptualized as finding the minimum of a "potential energy" or loss function landscape.

## When to study it
Before tackling this, you must have a firm grasp of the following:
*   **Work:** The definition of work as an integral, $W = \int \vec{F} \cdot d\vec{s}$.
*   **Work-Energy Theorem:** The net work done on an object equals its change in kinetic energy, $W_{net} = \Delta K$.
*   **Conservative Forces:** The concept of a force whose work done is independent of the path taken (e.g., gravity, spring force).
*   **Calculus:** Basic definite integrals and derivatives.
*   **Relevant Force Laws:** Newton's Law of Universal Gravitation ($F_g = G \frac{m_1 m_2}{r^2}$) and Hooke's Law ($F_s = -kx$).

If any of these are weak, review them first. Proceeding without them will lead to memorization without understanding.

## How to study it (step by step)
1.  **Derive the definition.** Start with the work-energy theorem, $W_{net} = \Delta K$. Split the net work into work done by conservative forces ($W_c$) and non-conservative forces ($W_{nc}$): $W_c + W_{nc} = \Delta K$. Define the change in potential energy as the negative of the work done by the conservative force: $\Delta U \equiv -W_c$. Substitute this in to get the full form of conservation of energy: $W_{nc} = \Delta K + \Delta U$. For an isolated system where $W_{nc}=0$, we have $\Delta K + \Delta U = 0$, or $K_i + U_i = K_f + U_f$.
2.  **Derive $U_g = mgh$.** Use the definition $\Delta U = -\int \vec{F}_c \cdot d\vec{s}$. Near Earth's surface, the gravitational force is $\vec{F}_g = -mg\hat{j}$ (assuming up is positive $\hat{j}$). Calculate the change in potential energy moving an object from height $y=0$ to $y=h$:
    $$ \Delta U = U(h) - U(0) = -\int_{0}^{h} (-mg\hat{j}) \cdot (dy\hat{j}) = \int_{0}^{h} mg \, dy = mg[y]_0^h = mgh $$
    If we define $U(0)=0$, then $U(h) = mgh$.
3.  **Derive $U_g = -GMm/r$.** Use the same definition for the general case. The force is $\vec{F}_g = -G\frac{Mm}{r^2}\hat{r}$. We define our zero point at $r=\infty$ because the force goes to zero there. Calculate the work done by gravity moving a mass $m$ from $r=\infty$ to a distance $r$:
    $$ U(r) - U(\infty) = -\int_{\infty}^{r} \left(-G\frac{Mm}{r'^2}\hat{r}'\right) \cdot (dr'\hat{r}') = \int_{\infty}^{r} G\frac{Mm}{r'^2} dr' $$
    $$ U(r) - 0 = GMm \left[-\frac{1}{r'}\right]_{\infty}^{r} = GMm \left(-\frac{1}{r} - \left(-\frac{1}{\infty}\right)\right) = -\frac{GMm}{r} $$
4.  **Derive $U_s = \frac{1}{2}kx^2$.** The spring force is $\vec{F}_s = -kx\hat{i}$. Define the zero point at the equilibrium position, $x=0$. Calculate the potential energy stored when stretching the spring from $x=0$ to a displacement $x$:
    $$ \Delta U = U(x) - U(0) = -\int_{0}^{x} (-kx'\hat{i}) \cdot (dx'\hat{i}) = \int_{0}^{x} kx' dx' = k\left[\frac{x'^2}{2}\right]_0^x = \frac{1}{2}kx^2 $$
    If $U(0)=0$, then $U(x) = \frac{1}{2}kx^2$.
5.  **Solve problems.** Find 2-3 textbook problems for each formula. First, a simple "plug-and-chug." Then, a conservation of energy problem. For example: a block dropped from height $h$ (converts $mgh$ to $\frac{1}{2}mv^2$), or a block sliding into a spring (converts $\frac{1}{2}mv^2$ to $\frac{1}{2}kx^2$).

## Key ideas, with intuition
*   **Potential Energy is Stored Work.** Imagine lifting a heavy book. You do work against gravity. That work isn't lost; it's stored in the book-Earth system as potential energy. If you let go, gravity does that exact amount of work back on the book, converting the stored potential energy into kinetic energy.
*   **The Zero Point is a Choice.** We only ever care about $\Delta U$. Where you define $U=0$ is purely for convenience. For a problem about a ball falling off a table, it's convenient to set $U=0$ at the floor. For orbital mechanics, the force weakens to zero at infinity, so it's convenient to set $U=0$ at $r=\infty$.
    $$ U_g = -\frac{GMm}{r} $$
    This formula's negative sign is a direct consequence of setting $U(\infty)=0$. It means you are in a gravitational "well". You are bound to the planet and need to *add* energy to the system to climb out of the well and reach the zero-energy state at infinity.
*   **Force is the Downhill Slope of Potential.** The relationship $F_x = -\frac{dU}{dx}$ is profound. It means that objects will naturally be pushed by conservative forces from regions of high potential energy to regions of low potential energy. A ball rolls downhill. A stretched spring pulls a mass back to its equilibrium position (the point of minimum potential energy). The steeper the "hill" (the potential energy graph), the stronger the force.

## Worked example
**Problem:** A 1,000 kg rocket is launched straight up from the surface of the Earth (Radius $R_E = 6.37 \times 10^6$ m, Mass $M_E = 5.97 \times 10^{24}$ kg). What is the minimum initial speed (escape velocity, $v_e$) it needs to escape Earth's gravity completely?

**Solution:**
1.  **Identify the principle.** We want the rocket to "escape completely," which means it can reach an infinite distance ($r \to \infty$) and have no kinetic energy left over ($v_f = 0$). This is a conservation of energy problem. The system is the rocket and the Earth. The only force doing work is gravity, which is conservative.
    $$ K_i + U_i = K_f + U_f $$
2.  **Define initial and final states.**
    *   Initial state (i): At the Earth's surface. $r_i = R_E$. The speed is the escape velocity we want to find, $v_i = v_e$.
    *   Final state (f): Infinitely far away, at rest. $r_f = \infty$. The speed is $v_f = 0$.
3.  **Write out the energy terms.**
    *   $K_i = \frac{1}{2}mv_e^2$
    *   $U_i = -\frac{GM_Em}{R_E}$ (We must use the general form, not $mgh$)
    *   $K_f = \frac{1}{2}m(0)^2 = 0$
    *   $U_f = -\frac{GM_Em}{\infty} = 0$ (This is our chosen zero point)
4.  **Set up the conservation equation and solve for $v_e$.**
    $$ \frac{1}{2}mv_e^2 - \frac{GM_Em}{R_E} = 0 + 0 $$
    $$ \frac{1}{2}mv_e^2 = \frac{GM_Em}{R_E} $$
    The mass of the rocket, $m$, cancels out.
    $$ v_e^2 = \frac{2GM_E}{R_E} $$
    $$ v_e = \sqrt{\frac{2GM_E}{R_E}} $$
5.  **Substitute values.** (Use $G = 6.67 \times 10^{-11} \text{ N m}^2/\text{kg}^2$)
    $$ v_e = \sqrt{\frac{2(6.67 \times 10^{-11})(5.97 \times 10^{24})}{6.37 \times 10^6}} $$
    $$ v_e \approx \sqrt{1.25 \times 10^8} \approx 11,180 \text{ m/s} $$
    $v_e \approx 11.2 \text{ km/s}$.

**Reflection:**
*   Step 1 worked because gravity is a conservative force, so mechanical energy is conserved.
*   Step 2 correctly defined "escape" as reaching $r=\infty$ with $v=0$.
*   Step 3 correctly used the universal potential energy formula, recognizing that $mgh$ is invalid for large altitude changes.
*   Step 4 showed that escape velocity is independent of the object's mass, a crucial insight.

## Diagrams
Gravitational Potential Energy near surface ($U_g=mgh$):
```text
      ^ y-axis
      |
      |
(h) --|-------o (mass m, U=mgh)
      |       |
      |       |  Gravity, F = -mg
      |       V
      |
(0) --+-------------------- (U=0 datum)
```

Elastic Potential Energy ($U_s = \frac{1}{2}kx^2$):
```text
Equilibrium (x=0, U=0):
<--|----------[ mass ]
   |
   x=0

Stretched (x > 0, U > 0):
<--|----------[ mass ]------>
   |                     |
   x=0                   x
   <---- Spring force

Compressed (x < 0, U > 0):
<--|----[ mass ]----------
   |   |
   x   x=0
   ----> Spring force
```

## Memory technique — remember this forever
1.  **The Story:** Potential Energy is a **bank account for work**.
    *   Lifting a rock is like **depositing** money: you do work, the potential energy account ($mgh$) goes up.
    *   A stretched spring is like a **loaded account**: it has stored energy ($\frac{1}{2}kx^2$) ready to be spent.
    *   Gravity's $-GMm/r$ is a **debt account**. You're born in debt in a gravity well. To get your balance to zero (escape to infinity), you must add energy (work, or kinetic energy). The closer you are ($r$ is small), the deeper in debt you are (more negative $U$).
2.  **Formulas to Overlearn:**
    $$ U_g = mgh \quad (\text{local, flat Earth approx.}) $$
    $$ U_g = -\frac{GMm}{r} \quad (\text{universal}) $$
    $$ U_s = \frac{1}{2}kx^2 \quad (\text{ideal spring}) $$
3.  **Spaced Repetition:** Review these derivations and formulas at **1 day, 3 days, 7 days, 16 days, 35 days**. Do not just read them. Re-derive them from scratch on a blank sheet of paper.
4.  **First Principles Pathway:** If you forget everything, remember this one definition: **The change in potential energy is the negative of the work done by the conservative force.**
    $$ \Delta U = -W_c = -\int_{A}^{B} \vec{F}_c \cdot d\vec{s} $$
    From this definition and the relevant force law ($\vec{F}_g=-mg\hat{j}$, $\vec{F}_g = -G\frac{Mm}{r^2}\hat{r}$, or $\vec{F}_s=-kx\hat{i}$), you can rebuild all three potential energy formulas.

## Common mistakes
*   **Using $mgh$ for orbital problems.** The formula $U_g=mgh$ assumes a constant gravitational force $F_g=mg$. This is only valid for heights $h$ that are very small compared to the radius of the Earth. For satellites or rockets, you must use $U_g = -GMm/r$.
*   **Sign errors with $-GMm/r$.** Forgetting the negative sign is a fatal error. It implies gravity is a repulsive force. Remember the debt analogy: you are *bound* by gravity, so your energy is negative relative to the free state at infinity.
*   **Inconsistent Zero Points.** In a single problem, you must use the same zero-level for potential energy for your initial and final states. If you set $U=0$ at the ground for the start of the problem, you can't set it at the top of a cliff for the end of the problem.
*   **Confusing $r$ and $h$.** In $mgh$, $h$ is the *vertical distance from a chosen zero point*. In $-GMm/r$, $r$ is the *radial distance from the center of the mass* (e.g., center of the Earth).

## Self-check
1.  A 2 kg block is pushed against a spring with spring constant $k=800$ N/m, compressing it by 20 cm. When released, the block slides across a frictionless horizontal surface. What is the block's speed after it leaves the spring?
2.  A 0.5 kg bungee cord has a spring constant of 50 N/m and an unstretched length of 10 m. A 70 kg person ties it to a bridge and jumps off. How far below the bridge is the person when they reach their lowest point?
3.  An asteroid is detected at a distance of $5.0 \times 10^9$ m from Earth, traveling directly towards it at a speed of 2 km/s. Ignoring the Sun's gravity, will the asteroid collide with Earth, or does it have enough energy to "miss" (i.e., reach a point of closest approach and fly away)? You will need to calculate its total mechanical energy.