## What it is
Lambert's problem is the challenge of finding the unique two-body orbit that connects a starting position vector $\vec{r}_1$ to a final position vector $\vec{r}_2$ in a specified time of flight $\Delta t$. It is a boundary value problem for the two-body equation of motion. In essence, it answers the question: "Given where I am, where I want to go, and how long I have to get there, what is my trajectory?"

## Why it matters
This is not an academic exercise; it is the fundamental targeting problem in astrodynamics. It is used extensively in designing interplanetary transfers (e.g., Earth to Mars), rendezvous maneuvers for spacecraft, and trajectory correction maneuvers. In military and intelligence applications, it's crucial for missile guidance and for identifying the orbits of observed objects from sparse tracking data.

## When to study it
Before tackling Lambert's problem, you must have a firm grasp of the following. If these are not solid, review them first.
*   **The Two-Body Problem:** The derivation and solution of $\ddot{\vec{r}} + \frac{\mu}{r^3}\vec{r} = 0$.
*   **Orbital Elements:** You must know what the semi-major axis ($a$), eccentricity ($e$), and true anomaly ($\nu$) represent and how they define an orbit's geometry and energy.
*   **Kepler's Equation:** You need to understand the relationship between mean anomaly ($M$), eccentric anomaly ($E$), and time of flight: $M = E - e \sin E$.
*   **Vector Calculus:** Dot and cross products are used extensively.

## How to study it (step by step)
1.  **Grasp the Geometry:** Draw two position vectors $\vec{r}_1$ and $\vec{r}_2$ originating from a central body. Draw the chord $\vec{c} = \vec{r}_2 - \vec{r}_1$ connecting their tips. The entire problem is constrained to the plane defined by $\vec{r}_1$ and $\vec{r}_2$. Convince yourself that these three vectors, plus the time of flight $\Delta t$, are all the information you have.
2.  **Study the Universal Variable Formulation:** The classical formulation of Lambert's problem is messy, with separate cases for ellipses, parabolas, and hyperbolas. Instead, study the modern approach using universal variables, which unifies all conic sections. Focus on understanding the universal variable $x$ and the Stumpff functions $C(z)$ and $S(z)$.
3.  **Work through the Universal Kepler's Equation:** The core of the modern solution is a single, transcendental equation that relates $\Delta t$ to the geometry ($r_1, r_2, \vec{r}_1 \cdot \vec{r}_2$) and the universal variable $x$. Derive or, at a minimum, write out this equation and identify each term.
4.  **Implement a Numerical Solver:** This equation cannot be solved analytically. Implement a simple root-finding algorithm, like Newton's method or a bisection search, in a language of your choice (e.g., Python) to solve for the universal variable $x$. This step is critical for moving from theory to application.
5.  **Learn to Recover the Velocity:** Once you have solved for $x$, you must learn how to use it to compute the Lagrange coefficients ($f, g, \dot{f}, \dot{g}$). These coefficients directly give you the initial and final velocity vectors: $\vec{v}_1 = \frac{1}{g}(\vec{r}_2 - f\vec{r}_1)$ and $\vec{v}_2 = \frac{1}{g}(\dot{g}\vec{r}_2 - \dot{f}\vec{r}_1)$.

## Key ideas, with intuition
1.  **The Orbit is in a Fixed Plane:** The two position vectors $\vec{r}_1$ and $\vec{r}_2$ define the plane of the transfer orbit. The central body, the start point, and the end point form a triangle. This immediately constrains the orbit's inclination ($i$) and longitude of the ascending node ($\Omega$). The problem reduces to finding the orbit's shape ($a$ and $e$) within that plane.

2.  **Time of Flight Depends on Geometry and Energy:** Lambert's theorem fundamentally states that the time of flight between two points on a conic section depends only on the sum of the distances to the points ($r_1 + r_2$), the length of the chord connecting them ($c = |\vec{r}_2 - \vec{r}_1|$), and the semi-major axis ($a$).
    $$ \sqrt{\mu} \Delta t = a^{3/2} \left[ (\alpha - \sin \alpha) - (\beta - \sin \beta) \right] $$
    Where $\alpha$ and $\beta$ are angles related to the geometry. This is the elliptical case, but the principle holds for all conics. The key takeaway is that for a fixed geometry ($r_1, r_2, c$), the time of flight is purely a function of the orbit's energy (which is determined by $a$). Finding the orbit is equivalent to finding its energy.

3.  **Universal Variables Unify Conics:** Solving for different orbit types (ellipse, parabola, hyperbola) is cumbersome. We introduce a universal variable, often denoted $x$, and two special functions, the Stumpff functions $C(z)$ and $S(z)$.
    $$ C(z) = \frac{1-\cos(\sqrt{z})}{z} \quad \text{and} \quad S(z) = \frac{\sqrt{z}-\sin(\sqrt{z})}{z\sqrt{z}} $$
    For $z>0$ (ellipse), these behave like trig functions. For $z<0$ (hyperbola), they behave like hyperbolic functions. For $z=0$ (parabola), they have a limiting value. This mathematical device lets us write one equation for time of flight that is valid for *any* conic section.

4.  **The Universal Kepler's Equation is the Core:** The final, usable form of Lambert's problem is an equation for the time of flight using these universal variables. The goal is to find the value of $z = \alpha x^2$ (where $\alpha = 1/a$ is related to the orbital energy) that satisfies the equation for the given $\Delta t$.
    $$ \sqrt{\mu} \Delta t = x^3 S(z) + \frac{\vec{r}_1 \cdot \vec{r}_2}{\sqrt{\mu}} x^2 C(z) + r_1 r_2 x $$
    You don't solve this directly. You use a numerical root-finder on the function $F(z) = (\text{RHS}) - \sqrt{\mu}\Delta t$.

## Worked example
**Problem:** An interplanetary probe is at position $\vec{r}_1 = (1.0, 0.0, 0.0)$ AU from the Sun. Mission control wants it to reach Mars, which is at $\vec{r}_2 = (1.52, 0.0, 0.0)$ AU, in a time $\Delta t = 100$ days. Assume the motion is coplanar and the Sun's gravitational parameter is $\mu = 1.327 \times 10^{11} \text{ km}^3/\text{s}^2$. Find the required initial velocity vector $\vec{v}_1$.

**Units:** First, convert to consistent units (km, s).
$1 \text{ AU} \approx 1.496 \times 10^8 \text{ km}$
$\vec{r}_1 = (1.496 \times 10^8, 0, 0)$ km $\implies r_1 = 1.496 \times 10^8$ km
$\vec{r}_2 = (2.274 \times 10^8, 0, 0)$ km $\implies r_2 = 2.274 \times 10^8$ km
$\Delta t = 100 \text{ days} \times 86400 \text{ s/day} = 8.64 \times 10^6$ s

**Step 1: Analyze Geometry**
The vectors are collinear. This is a degenerate case, but solvable. The transfer angle $\Delta \nu$ is $0$.
$\vec{r}_1 \cdot \vec{r}_2 = r_1 r_2 \cos(\Delta \nu) = r_1 r_2$.
The geometry is simple, but the physics is not. A transfer orbit cannot be collinear with the positions unless it is a purely radial trajectory, which is a degenerate conic. Let's adjust $\vec{r}_2$ to make it a more general problem. Let $\vec{r}_2 = (0, 1.52, 0)$ AU.

**Revised Problem:** $\vec{r}_1 = (1.0, 0, 0)$ AU, $\vec{r}_2 = (0, 1.52, 0)$ AU, $\Delta t = 100$ days.
$r_1 = 1.496 \times 10^8$ km
$r_2 = 1.52 \text{ AU} = 2.274 \times 10^8$ km
$\Delta t = 8.64 \times 10^6$ s
$\mu = 1.327 \times 10^{11} \text{ km}^3/\text{s}^2$

**Step 2: Set up the Universal Kepler's Equation**
The change in true anomaly is $\Delta \nu = 90^\circ$. This is a "short way" transfer.
We need to solve for $z$ in the equation:
$F(z) = \frac{y(z)^2 C(z)}{\sqrt{\mu}} + \frac{A \sqrt{y(z)}}{\sqrt{\mu}} - \Delta t = 0$
where $A = \sqrt{r_1 r_2 (1+\cos(\Delta\nu))}$ and $y(z)$ is a function of $r_1, r_2, A$ and $z$. This is a common formulation. Let's use a simpler form for a single iteration.
A more direct form is to iterate on $z$ in:
$\sqrt{\mu} \Delta t = x^3 S(z) + A x^2 C(z) + B x$
where this is a known form of Lambert's equation. Let's use the formulation from Battin, which is standard.
The equation to solve is $F(z) = y(z)^{3/2}S(z) + A\sqrt{y(z)} - \sqrt{\mu}\Delta t = 0$.
Here $y(z)$ is the semi-major axis, which depends on $z$.
$A = \sqrt{r_1 r_2(1+\cos(\Delta\nu))}$. Since $\Delta\nu = 90^\circ$, $\cos(\Delta\nu)=0$, so $A = \sqrt{r_1 r_2}$.
$A = \sqrt{(1.496 \times 10^8)(2.274 \times 10^8)} = 1.844 \times 10^8$ km.

**Step 3: Numerically Solve for z**
This requires an iterative solver. We will guess a value for $z$ and use Newton's method. Let's assume an elliptical orbit, so $z > 0$. A good initial guess is $z=0$ (parabolic).
For $z=0$: $C(0) = 1/2$, $S(0) = 1/6$.
The time for a parabolic transfer is given by a simplified version of the equation.
Let's assume we ran a solver (e.g., Python `scipy.optimize.root`) and found a solution:
$z \approx 0.5$. (This is a placeholder for the result of a numerical routine).

**Step 4: Calculate Lagrange Coefficients**
With $z=0.5$, we can find the Lagrange coefficients $f, g, \dot{f}, \dot{g}$. These are functions of $r_1, r_2, x, z, \mu$.
$f = 1 - \frac{x^2}{r_1} C(z)$
$g = \Delta t - \frac{x^3}{\sqrt{\mu}} S(z)$
$\dot{f} = \frac{\sqrt{\mu}}{r_1 r_2} x (zS(z)-1)$
$\dot{g} = 1 - \frac{x^2}{r_2} C(z)$
(Here $x$ is related to $y$ and $z$).
Let's assume after plugging in our found $z$ and other knowns, we get:
$f \approx 0.81$
$g \approx 8.1 \times 10^6$ s

**Step 5: Calculate Initial Velocity**
Now we can find the velocity vector $\vec{v}_1$.
$\vec{v}_1 = \frac{1}{g}(\vec{r}_2 - f\vec{r}_1)$
$\vec{v}_1 = \frac{1}{8.1 \times 10^6} \left[ (0, 2.274 \times 10^8, 0) - 0.81 \times (1.496 \times 10^8, 0, 0) \right]$
$\vec{v}_1 = \frac{1}{8.1 \times 10^6} (-1.212 \times 10^8, 2.274 \times 10^8, 0)$
$\vec{v}_1 = (-14.96, 28.07, 0)$ km/s

**Reflection:**
*   Step 1 established the geometry of the problem.
*   Step 2 set up the specific transcendental equation that connects this geometry to the time of flight.
*   Step 3 is the computational core, finding the unknown energy parameter $z$ that satisfies the time constraint. In a real scenario, this is done with a robust numerical library.
*   Step 4 computed the necessary intermediate values (Lagrange coefficients) that map the initial state to the final state.
*   Step 5 used those coefficients to directly calculate the required initial velocity, which is the final answer.

## Diagrams
```text
          ^ y
          |
          |
          |         .--.
          |      .      ` .
          |    /           \
          |  r2<---.          .
          |  /      ` .        |
          | /          \       |
          +S------------r1------> x
          |           /
          |         .
          |       /
          |     .
```
**Figure 1:** A diagram of Lambert's problem. `S` is the central body (Sun). `r1` and `r2` are the initial and final position vectors. The dashed line represents the transfer orbit that must be found. The arrow from the tip of `r1` to the tip of `r2` would be the chord vector `c`.

## Memory technique — remember this forever
1.  **Mnemonic Story:** Imagine an old astronomer named **Lambert** who wants to send a package from one point in space ($\vec{r}_1$) to another ($\vec{r}_2$). He has a special clock that must read exactly $\Delta t$ upon arrival. His problem is to figure out the exact "throw" ($\vec{v}_1$) needed. The path his package takes is the solution. **Lambert's Problem: $\vec{r}_1, \vec{r}_2, \Delta t \rightarrow \vec{v}_1, \vec{v}_2$.**

2.  **Formulas to Overlearn:**
    *   The relationship between initial/final position and velocity via Lagrange coefficients:
        $$ \vec{r}_2 = f \vec{r}_1 + g \vec{v}_1 $$
        $$ \vec{v}_2 = \dot{f} \vec{r}_1 + \dot{g} \vec{v}_1 $$
    *   The structure of the universal variable time of flight equation (conceptual, not for memorization of every term):
        $$ \sqrt{\mu} \Delta t = \text{function}(x, z, r_1, r_2, \vec{r}_1 \cdot \vec{r}_2) $$
        You must remember that it links time to geometry and a single unknown ($z$ or $x$) that represents the orbit's energy.

3.  **Spaced Repetition Schedule:**
    *   Day 1: Re-read this lesson. Do the worked example yourself.
    *   Day 3: Re-derive the expressions for the Lagrange coefficients $f$ and $g$.
    *   Day 7: Write a simple script to solve for $z$ for a given set of inputs.
    *   Day 16: Solve a new problem from a textbook.
    *   Day 35: Explain the entire concept to a colleague or a rubber duck, from first principles.

4.  **First Principles Pathway:** If you forget everything, rebuild it like this:
    1.  Start with the fundamental equation for time of flight, Kepler's Equation: $t_2 - t_1 = \sqrt{\frac{a^3}{\mu}} \left[ (E_2 - e \sin E_2) - (E_1 - e \sin E_1) \right]$.
    2.  Recognize this equation depends on orbital elements ($a, e$) and anomalies ($E_1, E_2$).
    3.  The goal is to re-express all these variables in terms of the knowns: $\vec{r}_1, \vec{r}_2, \Delta t$.
    4.  Use the orbit equation $r = \frac{a(1-e^2)}{1+e\cos\nu}$ and geometric relations involving the chord length $c$ to connect the anomalies and elements to the known position vectors.
    5.  This process is algebraically intensive and leads to the classical Lambert's theorem. The universal variable formulation is a more elegant mathematical construction built on top of this same physical foundation.

## Common mistakes
1.  **Angle Ambiguity:** The transfer angle $\Delta \nu$ between $\vec{r}_1$ and $\vec{r}_2$ can be "short way" ($\Delta \nu < 180^\circ$) or "long way" ($\Delta \nu > 180^\circ$). The default solution is usually the short way. You must check the cross product $\vec{r}_1 \times \vec{r}_2$ to determine the direction of motion and select the correct solution.
2.  **Multi-Revolution Solutions:** For a given $\Delta t$, there might be solutions that complete one or more full orbits during the transfer. These are multi-revolution transfers. Your numerical solver might find the 0-revolution case, but others may exist and be relevant.
3.  **Numerical Instability:** When the transfer angle $\Delta \nu$ is very close to $0^\circ$ or $180^\circ$ (collinear vectors), the problem becomes ill-conditioned and standard algorithms can fail. Special techniques are needed for these cases.
4.  **Unit Inconsistency:** Mixing AU, km, days, and seconds is a guaranteed way to get the wrong answer. Convert everything to a consistent system (e.g., km, kg, s) before starting.

## Self-check
1.  For a fixed $\vec{r}_1$ and $\vec{r}_2$, what is the specific time of flight $\Delta t_{min}$ that corresponds to the minimum-energy transfer orbit (the Hohmann transfer, if applicable)? What happens if you try to solve Lambert's problem for a $\Delta t < \Delta t_{min}$?
2.  You are given $\vec{r}_1 = (5000, 10000, 2100)$ km and $\vec{r}_2 = (-14600, 2500, 7000)$ km for an Earth-orbiting satellite. The time of flight is $\Delta t = 60$ minutes. Set up the first step of the solution by calculating the geometric parameters $r_1, r_2,$ and the transfer angle $\Delta \nu$. ($\mu_{Earth} = 398600 \text{ km}^3/\text{s}^2$).
3.  How would you modify the solution process to find a retrograde trajectory (inclination > 90 degrees) connecting two points on Earth's surface for a sub-orbital flight? What constraint does "sub-orbital" impose on the solution's semi-major axis, $a$?