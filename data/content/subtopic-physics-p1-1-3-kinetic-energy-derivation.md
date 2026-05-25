## What it is
Kinetic energy, denoted $KE$ or $T$, is the energy an object possesses due to its motion. It is quantitatively defined as the work required to accelerate a body of a given mass from rest to its stated velocity. In short, it is the energy of motion.

## Why it matters
This concept is fundamental to all of physics and engineering. In rocket science, the entire goal of a launch vehicle is to convert the chemical potential energy of fuel into the kinetic (and gravitational potential) energy of a payload to achieve orbit. In orbital mechanics, the constant trade-off between kinetic and potential energy defines an object's trajectory.

## When to study it
You must have a solid grasp of these prerequisites. If any are weak, review them first.
1.  **Newton's Second Law:** The relationship between net force, mass, and acceleration ($ \vec{F}_{net} = m\vec{a} $).
2.  **Definition of Work:** Specifically, work done by a net force along a path ($ W_{net} = \int \vec{F}_{net} \cdot d\vec{x} $). For a constant force in one dimension, this simplifies to $W_{net} = F_{net} \cdot d$.
3.  **Calculus:** The definition of the derivative ($ \frac{df}{dx} $) and the integral ($ \int f(x) \, dx $), and the chain rule.

## How to study it (step by step)
1.  **Start with the definition of Work.** Write down the integral form for work done by a net force to move an object from an initial position $x_i$ to a final position $x_f$: $W_{net} = \int_{x_i}^{x_f} F_{net} \, dx$.
2.  **Substitute Newton's Second Law.** Replace $F_{net}$ with $ma$: $W_{net} = \int_{x_i}^{x_f} (ma) \, dx$.
3.  **Use the "calculus trick".** Acceleration is $a = \frac{dv}{dt}$. Using the chain rule, we can write $a = \frac{dv}{dx} \frac{dx}{dt}$. Since $\frac{dx}{dt}$ is velocity $v$, we have $a = v \frac{dv}{dx}$. This is a powerful substitution that changes the variable of integration from position to velocity.
4.  **Perform the substitution.** Substitute $a = v \frac{dv}{dx}$ into the integral: $W_{net} = \int_{x_i}^{x_f} m \left(v \frac{dv}{dx}\right) dx$.
5.  **Simplify and change integration limits.** The $dx$ terms cancel, leaving an integral with respect to velocity, $v$. We must also change the limits of integration from positions ($x_i, x_f$) to the corresponding velocities ($v_i, v_f$): $W_{net} = \int_{v_i}^{v_f} mv \, dv$.
6.  **Evaluate the integral.** This is a simple power rule integration: $W_{net} = m \left[ \frac{1}{2}v^2 \right]_{v_i}^{v_f} = m \left( \frac{1}{2}v_f^2 - \frac{1}{2}v_i^2 \right)$.
7.  **Define Kinetic Energy.** This result shows that the net work done on an object equals the change in the quantity $\frac{1}{2}mv^2$. We define this quantity as Kinetic Energy, $KE$. Thus, we arrive at the Work-Energy Theorem: $W_{net} = \frac{1}{2}mv_f^2 - \frac{1}{2}mv_i^2 = \Delta KE$.

## Key ideas, with intuition
1.  **Energy is the capacity to do work.** Kinetic energy is the work an object can do *because* it is moving. A moving bullet can do work on a target; a stationary one cannot. The derivation shows this explicitly: the work done *on* an object becomes its energy of motion.
2.  **The $v^2$ dependence is critical.**
    $$ KE = \frac{1}{2}mv^2 $$
    This is not intuitive. If you double an object's speed, you don't double its energy; you quadruple it ($2^2=4$). This is why high-speed collisions are exponentially more destructive and why it takes significantly more fuel to increase a rocket's speed from 7,000 m/s to 8,000 m/s than from 1,000 m/s to 2,000 m/s.
3.  **The Work-Energy Theorem is a bridge.**
    $$ W_{net} = \Delta KE $$
    This theorem connects the world of forces and kinematics (the left side, work) to the world of energy (the right side). Sometimes it is far easier to calculate the change in energy than to integrate forces over a path. This is a fundamental shortcut in physics problem-solving.

## Worked example
**Problem:** A 2,000 kg rocket sled is accelerated from rest by a net force of 40,000 N over a distance of 500 m. What is its final kinetic energy and final speed?

**Solution:**
1.  **Identify the goal.** We need to find the final kinetic energy ($KE_f$) and final speed ($v_f$).
2.  **Choose the right tool.** The Work-Energy Theorem, $W_{net} = \Delta KE$, connects force, distance, and energy. This is the most direct path.
3.  **Calculate the net work done.** The force is constant and in the direction of displacement.
    $$ W_{net} = F_{net} \cdot d $$
    $$ W_{net} = (40,000 \, \text{N}) \cdot (500 \, \text{m}) = 20,000,000 \, \text{J} = 20 \, \text{MJ} $$
    *This step calculated the total energy transferred to the sled.*
4.  **Apply the Work-Energy Theorem.**
    $$ W_{net} = KE_f - KE_i $$
    The sled starts from rest, so its initial kinetic energy $KE_i = \frac{1}{2}m v_i^2 = \frac{1}{2}m(0)^2 = 0$.
    Therefore, $W_{net} = KE_f$.
    $$ KE_f = 20,000,000 \, \text{J} $$
    *This step equated the work done on the sled to its final energy of motion.*
5.  **Calculate the final speed.** Now use the definition of kinetic energy.
    $$ KE_f = \frac{1}{2}mv_f^2 $$
    Rearrange to solve for $v_f$:
    $$ v_f = \sqrt{\frac{2 \cdot KE_f}{m}} $$
    $$ v_f = \sqrt{\frac{2 \cdot (20,000,000 \, \text{J})}{2000 \, \text{kg}}} = \sqrt{\frac{40,000,000}{2000}} = \sqrt{20,000} \, \text{m/s} $$
    $$ v_f \approx 141.4 \, \text{m/s} $$
    *This final step extracted the speed from the definition of kinetic energy.*

## Diagrams
A simple diagram showing the physical situation for the derivation. A force $F$ acts on a mass $m$, causing it to accelerate from an initial velocity $v_i$ to a final velocity $v_f$ over a distance $d$.

```text
Initial State (at x_i)        During motion          Final State (at x_f)
--------------------          -------------          --------------------

     v_i -->                                               v_f -->
   +-----+                                               +-----+
   |  m  | ------ F ---->                                |  m  |
   +-----+                                               +-----+

   |<---------------------- d ------------------------>|
```

## Memory technique — remember this forever
1.  **Visual Hook:** Picture a baseball player swinging a bat. The **Work** they do with their arms ($F \cdot d$) is transferred into the **Kinetic Energy** of the bat ($\frac{1}{2}mv^2$). The formula itself, $\frac{1}{2}mv^2$, can be remembered as "**half** of **m**e, **v**elocity squared!"
2.  **Must Overlearn:**
    *   $KE = \frac{1}{2}mv^2$ (The definition)
    *   $W_{net} = \Delta KE$ (The Work-Energy Theorem)
3.  **Spaced Repetition Schedule:** Review this derivation and solve one problem on Day 1, Day 3, Day 7, Day 16, and Day 35.
4.  **First Principles Pathway:** If you forget everything, rebuild it from here:
    *   Start with the definition of work: $W = \int F \, dx$.
    *   Substitute Newton's Second Law: $F=ma \implies W = \int ma \, dx$.
    *   Use the chain rule trick to change variables: $a = \frac{dv}{dt} = \frac{dv}{dx}\frac{dx}{dt} = v\frac{dv}{dx}$.
    *   Substitute and solve the integral: $W = \int m(v\frac{dv}{dx})dx = \int mv \, dv = \frac{1}{2}mv^2$. This path is foolproof.

## Common mistakes
1.  **Confusing Momentum and Kinetic Energy.** Momentum is $p=mv$ (linear in $v$), while kinetic energy is $KE = \frac{1}{2}mv^2$ (quadratic in $v$). They are different physical quantities with different units and conservation laws. Do not mix them up.
2.  **Incorrectly calculating $\Delta KE$.** The change in kinetic energy is $KE_f - KE_i = \frac{1}{2}m(v_f^2 - v_i^2)$. It is **NOT** $\frac{1}{2}m(v_f - v_i)^2$. Square the speeds first, then subtract.
3.  **Forgetting Net Work.** The Work-Energy Theorem applies to the *net* work done by *all* forces. If you only calculate the work done by one force among many (e.g., ignoring friction), your result will be incorrect.

## Self-check
1.  What is the kinetic energy of a 70 kg astronaut moving at 7,800 m/s relative to Earth in low Earth orbit?
2.  A 10 gram bullet has 2,000 J of kinetic energy as it leaves the muzzle of a rifle. If the rifle barrel is 0.5 m long, what was the average net force exerted on the bullet? (Assume it started from rest).
3.  Car A has mass $m$ and speed $v$. Car B has mass $2m$ and speed $v/2$. Which car has more kinetic energy? By what factor? Which car has more momentum?