## What it is
Gravitational potential energy, $U_g$, is the energy a mass possesses due to its position within a gravitational field. The formula $U_g = -GMm/r$ defines this energy for two masses, $M$ and $m$, separated by a distance $r$, setting the zero point of energy at an infinite separation. This is the general form, valid at any distance, unlike the near-surface approximation $U_g = mgh$.

## Why it matters
This formula is non-negotiable for orbital mechanics, rocket science, and astrophysics. Calculating satellite orbits, determining the energy required to send a probe to Mars (the "escape velocity"), or understanding how stars form and galaxies hold together all rely on this exact expression. It's the foundation for understanding energy conservation in celestial systems.

## When to study it
Before tackling this, you must have a firm grasp of these prerequisites:
1.  **Newton's Law of Universal Gravitation**: You must know the force law $F_g = GMm/r^2$ and what each term represents.
2.  **Work and Energy**: You must understand that work is the integral of force over displacement, $W = \int \vec{F} \cdot d\vec{s}$, and that the change in potential energy is the negative of the work done by a conservative force, $\Delta U = -W$.
3.  **Basic Integral Calculus**: You must be able to compute the integral of $x^n$, specifically for $n=-2$.

If you are not confident with these, master them first. This topic builds directly upon them.

## How to study it (step by step)
1.  **Derive it from first principles.** Start with the definition of work done by the gravitational force as you move a mass $m$ from infinity to a distance $r$ from a mass $M$. Use $W = \int_{\infty}^{r} \vec{F}_g \cdot d\vec{r}$ and $\vec{F}_g = -\frac{GMm}{r^2}\hat{r}$. Then use $\Delta U = U(r) - U(\infty) = -W$. Set $U(\infty) = 0$ by convention. Do not proceed until you can reproduce this derivation yourself.
2.  **Explain the negative sign.** Write a paragraph in your own words explaining why the potential energy is negative. Connect it to the idea of a "bound system" or a "gravity well". An object with negative total energy is trapped; you must *add* energy to get it to zero (at infinity).
3.  **Connect to $mgh$.** Use the formula for $\Delta U = U_f - U_i$ with the general form. Let $r_i = R$ (Earth's radius) and $r_f = R+h$. Show that for $h \ll R$, $\Delta U \approx mgh$. Use the binomial approximation $(1+x)^n \approx 1+nx$ for small $x$. This proves that the familiar formula is just a special case.
4.  **Solve for escape velocity.** Calculate the minimum speed an object on the surface of a planet of mass $M$ and radius $R$ needs to escape its gravitational pull completely (i.e., to reach $r=\infty$ with zero final velocity). This is a classic problem that forces you to use the formula correctly in an energy conservation context.
5.  **Plot the function.** Sketch a graph of $U(r)$ vs. $r$. Label the axes. Note the shape of the curve (a hyperbola in the fourth quadrant). Mark where $r=R_{planet}$ would be. See how the slope gets shallower as $r$ increases, corresponding to a weaker force.

## Key ideas, with intuition
1.  **Energy is stored by separation.** Potential energy arises from the configuration of a system. For gravity, it's the energy "stored" in the gravitational field by separating two masses. The work you do to pull them apart against their mutual attraction increases their potential energy.
2.  **Zero is at infinity.** We need a reference point for potential energy. For celestial mechanics, the most convenient choice is to define potential energy as zero when the masses are infinitely far apart ($r \to \infty$). At this point, they exert no force on each other.
3.  **Potential energy must be negative.** Since gravity is an attractive force, it does positive work as two masses come together from infinity. Because $\Delta U = -W$, the potential energy must *decrease* as they get closer. Since the energy is zero at infinity, it must be negative for any finite distance $r$. This negative value represents a "binding energy"—you must supply this much energy to the system to separate the masses to infinity.
    $$U(r) = -\int_{\infty}^{r} F_g dr = -\int_{\infty}^{r} \frac{GMm}{r^2} dr = -GMm \left[ -\frac{1}{r} \right]_{\infty}^{r} = -\frac{GMm}{r}$$
4.  **It's a "gravity well".** Imagine a stretched rubber sheet with a heavy ball (mass $M$) in the center, creating a dip. A smaller marble (mass $m$) placed nearby will roll "down" into this dip. The depth of the dip at any point is analogous to the negative potential energy. To get the marble out of the well, you have to give it energy to climb up to the flat, zero-energy level of the sheet far away.

## Worked example
**Problem:** Calculate the escape velocity from the surface of Earth, ignoring air resistance. Use the following values: Earth's mass $M \approx 5.97 \times 10^{24}$ kg, Earth's radius $R \approx 6.37 \times 10^6$ m, and the gravitational constant $G \approx 6.67 \times 10^{-11} \text{ N m}^2/\text{kg}^2$.

**Solution:**
1.  **Define the states.**
    *   Initial state (at the surface): The rocket has mass $m$, speed $v_e$ (the escape velocity we want to find), and is at a distance $R$ from Earth's center.
    *   Final state (escaped): The rocket is infinitely far away ($r \to \infty$) and has just barely made it, so its speed is zero ($v_f = 0$).

2.  **Write the energy conservation equation.**
    The total mechanical energy of the rocket is conserved.
    $$E_i = E_f$$
    $$K_i + U_i = K_f + U_f$$

3.  **Substitute the expressions for kinetic and potential energy.**
    *   $K_i = \frac{1}{2}mv_e^2$
    *   $U_i = -\frac{GMm}{R}$
    *   $K_f = \frac{1}{2}m(0)^2 = 0$
    *   $U_f = -\frac{GMm}{\infty} = 0$

    Plugging these into the conservation equation:
    $$\frac{1}{2}mv_e^2 - \frac{GMm}{R} = 0 + 0$$

4.  **Solve for the escape velocity, $v_e$.**
    Notice the mass of the rocket, $m$, cancels out. This is a critical insight: escape velocity is independent of the object's mass.
    $$\frac{1}{2}mv_e^2 = \frac{GMm}{R}$$
    $$\frac{1}{2}v_e^2 = \frac{GM}{R}$$
    $$v_e = \sqrt{\frac{2GM}{R}}$$

5.  **Calculate the numerical value.**
    $$v_e = \sqrt{\frac{2(6.67 \times 10^{-11})(5.97 \times 10^{24})}{6.37 \times 10^6}}$$
    $$v_e = \sqrt{\frac{7.96 \times 10^{14}}{6.37 \times 10^6}} \approx \sqrt{1.25 \times 10^8}$$
    $$v_e \approx 11180 \text{ m/s} \approx 11.2 \text{ km/s}$$

**Reflection:** Each step builds logically. We defined the physical scenario (initial/final states), applied the fundamental conservation law (energy), substituted the correct potential energy formula (the core of this lesson), and solved algebraically. The cancellation of the rocket's mass $m$ is a direct consequence of the equivalence of inertial and gravitational mass, a deep principle in physics.

## Diagrams
A diagram showing the two masses and the separation distance $r$.

```text
      <------------------ r ------------------>
     (M)                                     (m)
      ^                                       ^
      |                                       |
  Center of mass 1                     Center of mass 2
```

A plot of the gravitational potential energy $U(r)$ versus separation $r$.

```text
      U(r)
        ^
        |
      0 +------------------------------------------------> r
        | \
        |  \
        |   \
        |    \
        |     \                                U(r) = -GMm/r
        |      \
        |_______\_________
        |        (R_planet)
        |
        V
      (Negative Energy / "Bound States")
```

## Memory technique — remember this forever
1.  **The Story:** Gravity is a "cosmic debt". You are born at the bottom of a deep energy well. The value on your account is negative (e.g., $-GMm/R_{earth}$). To be free (escape to infinity), you must pay off this debt by adding kinetic energy until your total energy account reaches zero. You are "bound" by this debt.
2.  **Must-Know Formulas:**
    *   Gravitational Force: $F_g = \frac{GMm}{r^2}$ (an inverse-square law)
    *   Gravitational Potential Energy: $U_g = -\frac{GMm}{r}$ (an inverse law)
    Notice the only difference is the power of $r$ and the negative sign. Force is the (negative) derivative of potential energy with respect to position, and $\frac{d}{dr}(r^{-1}) = -r^{-2}$. This relationship is fundamental.
3.  **Spaced Repetition Schedule:** Review this material and re-derive the main formula at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget the formula, rebuild it.
    *   Start with the definition: "Change in potential energy is the negative of the work done by the conservative force." $\Delta U = -W$.
    *   Write the expression for work: $W = \int \vec{F} \cdot d\vec{r}$.
    *   Insert Newton's Law of Gravitation: $\vec{F}_g = -\frac{GMm}{r^2}\hat{r}$.
    *   Define your reference point: $U=0$ at $r=\infty$.
    *   Integrate from $\infty$ to $r$: $U(r) - U(\infty) = -\int_{\infty}^{r} (-\frac{GMm}{r^2}\hat{r}) \cdot d\vec{r}$. The integral will yield the formula.

## Common mistakes
1.  **Forgetting the negative sign.** This is the most common error. Remember the "gravity well" intuition: you are in a bound state with negative energy.
2.  **Using radius instead of distance.** $r$ is the distance between the *centers of mass* of the two objects, not the altitude above the surface. For an object at height $h$ above a planet of radius $R$, the correct distance is $r = R+h$.
3.  **Confusing Force and Energy.** The formulas look similar, but force scales as $1/r^2$ while potential energy scales as $1/r$. Do not mix them up. Force is a vector; potential energy is a scalar.
4.  **Incorrectly applying $mgh$.** The formula $\Delta U = mgh$ is only valid for small changes in height near the surface of a large body. For orbital transfers or interplanetary travel, it is completely wrong and you must use $\Delta U = -GMm/r_f - (-GMm/r_i)$.

## Self-check
1.  An asteroid is at rest infinitely far from the sun. If it falls directly toward the sun, what is its speed when it is at the same distance as Earth's orbit ($r = 1$ AU)? Express your answer symbolically in terms of $G$, $M_{sun}$, and $r$.
2.  A satellite is in a circular orbit of radius $R$ around a planet of mass $M$. What is the satellite's total mechanical energy ($K+U$)? Express your answer in terms of $G, M, m,$ and $R$. (Hint: First find the required speed for a circular orbit by setting the gravitational force equal to the centripetal force.)
3.  Two probes are launched from Earth. Probe A is launched with exactly the escape velocity. Probe B is launched with 90% of the escape velocity. Describe the final trajectory and fate of each probe, justifying your answer using total energy calculations.