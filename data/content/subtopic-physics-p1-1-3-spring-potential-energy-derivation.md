## What it is
Spring potential energy, $U_s$, is the energy stored within an elastic object, like a spring, when it is deformed by stretching or compressing. This stored energy is equal to the work done to deform the spring from its equilibrium position. It represents the spring's "potential" to do work as it returns to its natural length.

## Why it matters
This concept is fundamental to understanding oscillations and vibrations, which are ubiquitous in physics and engineering. In aerospace, it's critical for designing landing gear and shock absorption systems. In physics, modeling atoms in a solid as masses connected by springs is a powerful technique for understanding thermal properties.

## When to study it
You must have a solid grasp of these prerequisites before proceeding. If not, review them first.
1.  **Work as an Integral:** The definition of work done by a variable force: $W = \int \vec{F} \cdot d\vec{x}$.
2.  **Conservative Forces & Potential Energy:** The relationship $W_c = -\Delta U$, where $W_c$ is the work done by a conservative force and $\Delta U$ is the change in potential energy.
3.  **Hooke's Law:** The formula for the restoring force exerted *by* a spring: $F_s = -kx$, where $k$ is the spring constant and $x$ is the displacement from equilibrium.
4.  **Basic Integral Calculus:** Specifically, how to compute the integral of a polynomial, $\int x^n dx$.

## How to study it (step by step)
1.  **Review Hooke's Law:** Draw a free-body diagram for a mass attached to a spring that is stretched by a distance $x$. The spring pulls back with a restoring force $F_s = -kx$. The negative sign indicates the force is always directed opposite to the displacement.
2.  **Graph the Force:** Plot the *applied force* required to hold the spring at a displacement $x$. This force is equal and opposite to the spring's restoring force, so $F_{app} = -F_s = -(-kx) = kx$. This is a straight line through the origin with slope $k$.
3.  **Recall Work:** Remember that the work done by a variable force is the area under the force-displacement curve. Look at your graph from step 2. The area under the line from $x=0$ to a final displacement $x$ is a triangle.
4.  **Derive Graphically:** Calculate the area of that triangle. The base is $x$ and the height is the force at that point, $F_{app} = kx$. The area is $W_{app} = \frac{1}{2} \times \text{base} \times \text{height} = \frac{1}{2}(x)(kx) = \frac{1}{2}kx^2$. This work done *on* the spring is stored as potential energy.
5.  **Derive with Calculus:** Now, do it formally. The potential energy stored is the negative of the work done *by the conservative spring force* as it moves from its equilibrium position ($x_i=0$) to a final position ($x_f=x$).
    $$ \Delta U_s = U_s(x) - U_s(0) = -W_s $$
    Set the potential energy at equilibrium to zero, $U_s(0) = 0$.
    $$ U_s(x) = - \int_{0}^{x} F_s \,dx' $$
    Substitute Hooke's Law, $F_s = -kx'$. (We use $x'$ as the integration variable to avoid confusion with the limit of integration $x$).
    $$ U_s(x) = - \int_{0}^{x} (-kx') \,dx' = k \int_{0}^{x} x' \,dx' $$
    $$ U_s(x) = k \left[ \frac{1}{2}x'^2 \right]_{0}^{x} = k \left( \frac{1}{2}x^2 - \frac{1}{2}(0)^2 \right) $$
    $$ U_s = \frac{1}{2}kx^2 $$
6.  **Solve a problem:** A car's suspension spring has a spring constant $k=5.0 \times 10^4 \text{ N/m}$. If the spring is compressed by $10 \text{ cm}$ by the car's weight, how much potential energy is stored? (Answer this for yourself before looking at the worked example).

## Key ideas, with intuition
1.  **Force Varies Linearly:** The crucial starting point is that the force is not constant. The more you stretch a spring, the harder it pulls back. This linear relationship, $F \propto x$, is what makes the derivation straightforward and leads to the $x^2$ term in the energy formula.
2.  **Work is Area:** The integral for work, $\int F dx$, is simply a tool for finding the area under the Force-Displacement graph. For a spring, the applied force is $F_{app}=kx$, which is a straight line. The work done to stretch it to a distance $x$ is the area of a triangle with base $x$ and height $kx$. This gives $W = \text{Area} = \frac{1}{2} \times x \times (kx) = \frac{1}{2}kx^2$. This graphical intuition is a powerful check on the calculus.
    $$ \text{Work} = \text{Area} = \frac{1}{2} \times (\text{base}) \times (\text{height}) $$
3.  **Energy is Stored Work:** Potential energy is a bookkeeping device for work done by conservative forces. The work you do to stretch the spring doesn't disappear; it's stored in the configuration of the spring's molecules. That stored work is the potential energy, ready to be converted back into kinetic energy or other forms of work.
4.  **Zero Point is Arbitrary (but chosen wisely):** We define the potential energy to be zero when the spring is at its natural, equilibrium length ($x=0$). This is a convention. We could choose any other point, but this is the most logical choice and simplifies the formula.

## Worked example
A crossbow bolt is pushed against a spring with spring constant $k=4500 \text{ N/m}$, compressing it by $20.0 \text{ cm}$ from its equilibrium position. How much potential energy is stored in the spring, ready to be transferred to the bolt?

**1. Identify knowns and convert units.**
The spring constant is $k = 4500 \text{ N/m}$.
The displacement is a compression, so we can write $x = -20.0 \text{ cm}$.
Physics formulas require SI units. We must convert centimeters to meters.
$x = -20.0 \text{ cm} \times \frac{1 \text{ m}}{100 \text{ cm}} = -0.200 \text{ m}$.

**2. State the relevant formula.**
The potential energy stored in a spring is given by:
$$ U_s = \frac{1}{2}kx^2 $$

**3. Substitute the values into the formula.**
$$ U_s = \frac{1}{2} (4500 \text{ N/m}) (-0.200 \text{ m})^2 $$

**4. Calculate the result.**
First, square the displacement: $(-0.200 \text{ m})^2 = 0.0400 \text{ m}^2$.
Note that the negative sign disappears, so the energy is positive for both stretching and compression.
$$ U_s = \frac{1}{2} (4500 \text{ N/m}) (0.0400 \text{ m}^2) $$
$$ U_s = (2250 \text{ N/m}) (0.0400 \text{ m}^2) $$
$$ U_s = 90.0 \text{ N} \cdot \text{m} $$
Since 1 Joule = 1 Newton-meter, the stored energy is:
$$ U_s = 90.0 \text{ J} $$

**Reflection:**
- Step 1 (unit conversion) is critical. Failure here would have resulted in an answer off by a factor of $100^2=10,000$.
- Step 2 requires recalling the correct formula. The graphical intuition (area of a triangle) helps confirm the $\frac{1}{2}$ and the $x^2$.
- Step 3 shows that compression ($x<0$) and stretching ($x>0$) store the same amount of energy for the same magnitude of displacement, because the displacement is squared.

## Diagrams
A diagram showing the spring in three states:

```text
(A) Equilibrium
   |
---UUUUU--- (mass)
   |
  x=0

(B) Stretched
   |         |-----> x
---UUUUUUUUU--- (mass)
   |
  x=0

(C) Compressed
 |<-- x
---UUU--- (mass)
   |
  x=0
```

A graph of Applied Force vs. Displacement, showing the work done as the area of a triangle:

```text
      F_app (Applied Force)
        ^
        |
 F=kx   +-------------. (x, kx)
        |            /|
        |           / |
        |          /  |
        |         /   |  Area = Work = (1/2)kx^2
        |        /    |
        |       /     |
        |      /      |
        |     /       |
        +---------------------> x (Displacement)
        0
```

## Memory technique — remember this forever
1.  **Visual Hook:** Think of the formula for kinetic energy, $K = \frac{1}{2}mv^2$. Now look at spring potential energy, $U_s = \frac{1}{2}kx^2$. They have the exact same mathematical form! One stores energy in *motion* ($v$), the other stores energy in *position* ($x$).
    - $m$ is inertia of motion.
    - $k$ is stiffness, or "inertia of position".
2.  **Must-Know Formulas:** Overlearn these exactly.
    - Restoring Force: $F_s = -kx$
    - Potential Energy: $U_s = \frac{1}{2}kx^2$
3.  **Spaced Repetition Schedule:** Review this material and re-derive the formula from scratch at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget the energy formula, rebuild it.
    - Start with the definition: "Change in potential energy is the negative of the work done by the conservative force." $\Delta U = -W_c$.
    - The conservative force is the spring force: $F_s = -kx$.
    - Work is the integral of force: $W_s = \int F_s dx = \int (-kx) dx$.
    - Put it together: $U_s(x) - U_s(0) = - \int_0^x (-kx') dx' = \int_0^x kx' dx'$.
    - Integrate: $U_s = k[\frac{1}{2}x'^2]_0^x = \frac{1}{2}kx^2$. You can always reconstruct it in 30 seconds.

## Common mistakes
1.  **Unit Errors:** Using displacement in centimeters ($cm$) instead of meters ($m$). The spring constant $k$ is in N/m, so $x$ must be in meters to yield Joules.
2.  **Forgetting the Square:** Writing $U_s = \frac{1}{2}kx$. This is dimensionally incorrect (Force $\times$ distance $\neq$ Force/distance $\times$ distance). Remembering the "area of a triangle" intuition prevents this.
3.  **Sign Confusion:** The restoring force $F_s = -kx$ has a minus sign because it opposes displacement. The potential energy $U_s = \frac{1}{2}kx^2$ is always positive (or zero) because work must be done on the spring to either stretch or compress it, and energy is stored in both cases.
4.  **Calculating Work to Stretch Further:** Calculating the work to stretch a spring from $x_1$ to $x_2$ as $\frac{1}{2}k(x_2 - x_1)^2$. This is wrong. The correct way is to find the *change* in potential energy: $W = \Delta U_s = U_{s2} - U_{s1} = \frac{1}{2}kx_2^2 - \frac{1}{2}kx_1^2$.

## Self-check
1.  A spring stores $50 \text{ J}$ of potential energy when it is stretched by $25 \text{ cm}$. What is its spring constant, $k$?
2.  How much *additional* work is required to stretch the spring from the $25 \text{ cm}$ mark to a new displacement of $40 \text{ cm}$?
3.  A block of mass $m$ is placed on top of a vertical spring with constant $k$, compressing it. The block is then pushed down an additional distance $A$ and released. In terms of $m, g, k, A$, what is the total potential energy of the system (spring + gravitational) at the point of release, relative to the block's final equilibrium position?