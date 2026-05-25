## What it is
An elastic collision is an interaction between two or more objects in which both the total momentum and the total kinetic energy of the system are conserved. In one dimension (1D), this means objects collide along a straight line, and solving for their final velocities involves using these two conservation principles to find the two unknown final speeds.

## Why it matters
This concept is fundamental to understanding interactions at all scales. In aerospace, it models the "slingshot" or gravity assist maneuver, where a spacecraft gains speed by "bouncing" off a moving planet. In particle physics, collisions in accelerators are analyzed assuming elastic (or near-elastic) conditions to deduce properties of subatomic particles.

## When to study it
Before tackling this, you must have a solid grasp of:
1.  **Conservation of Linear Momentum:** The total momentum of an isolated system remains constant ($p=mv$, $\sum p_i = \sum p_f$).
2.  **Kinetic Energy:** The energy of motion ($K = \frac{1}{2}mv^2$).
3.  **Solving Systems of Linear Equations:** Specifically, two equations with two unknowns.

If you are not confident with these, master them first. There is no shortcut.

## How to study it (step by step)
1.  **Derive the governing equations.** Start with two masses, $m_1$ and $m_2$, with initial velocities $v_{1i}$ and $v_{2i}$. Write down the equation for conservation of momentum and the equation for conservation of kinetic energy. Do not proceed until you can write these from memory.
2.  **Algebraic manipulation.** You now have a system of two equations and two unknowns ($v_{1f}$, $v_{2f}$). Isolate the terms for each mass in both equations. The kinetic energy equation contains squared terms; notice that you can use the difference of squares factorization ($a^2 - b^2 = (a-b)(a+b)$).
3.  **Derive the relative velocity relationship.** Divide the rearranged kinetic energy equation by the rearranged momentum equation. This will cancel terms and yield a surprisingly simple result: $v_{1i} - v_{2i} = -(v_{1f} - v_{2f})$. This means the relative speed of approach equals the relative speed of separation.
4.  **Solve the system.** You now have two *linear* equations: the conservation of momentum and this new relative velocity equation. Use substitution or elimination to solve for $v_{1f}$ and $v_{2f}$ in terms of the initial conditions ($m_1, m_2, v_{1i}, v_{2i}$).
5.  **Analyze special cases.** Plug in values for two important scenarios to build intuition:
    *   Equal masses: $m_1 = m_2$. What happens to the final velocities?
    *   A massive target: $m_2 \gg m_1$ and $v_{2i} = 0$. What happens to the small projectile?
6.  **Solve problems.** Work through 3-5 practice problems, starting with one object initially at rest, then moving to cases where both objects are in motion. For each problem, state the conserved quantities first, write the equations, then solve.

## Key ideas, with intuition
1.  **Two Laws, Two Unknowns.** The entire problem is solvable because we have two independent, conserved quantities (momentum and kinetic energy) and two unknowns (the two final velocities). This provides a complete system of equations.
    $$ \text{Conservation of Momentum:} \quad m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f} $$
    $$ \text{Conservation of Kinetic Energy:} \quad \frac{1}{2}m_1 v_{1i}^2 + \frac{1}{2}m_2 v_{2i}^2 = \frac{1}{2}m_1 v_{1f}^2 + \frac{1}{2}m_2 v_{2f}^2 $$

2.  **Relative Speed is Constant.** The most elegant consequence of the math is that for any 1D elastic collision, the speed at which the two objects approach each other before the collision is the same as the speed at which they separate after. The direction of this relative velocity is simply reversed.
    $$ v_{1i} - v_{2i} = -(v_{1f} - v_{2f}) $$
    Think of it this way: from the perspective of one particle, the other particle appears to "bounce" off it with the same speed it came in with.

3.  **The Formulas are Symmetric.** The final velocity equations look complex, but they have a logical structure. Notice the symmetry: to get the formula for $v_{2f}$, you can take the formula for $v_{1f}$ and simply swap all the '1' and '2' subscripts.
    $$ v_{1f} = \left(\frac{m_1 - m_2}{m_1 + m_2}\right)v_{1i} + \left(\frac{2m_2}{m_1 + m_2}\right)v_{2i} $$
    $$ v_{2f} = \left(\frac{2m_1}{m_1 + m_2}\right)v_{1i} + \left(\frac{m_2 - m_1}{m_1 + m_2}\right)v_{2i} $$
    Each final velocity is a weighted average of the initial velocities, where the weights depend on the masses.

## Worked example
**Problem:** A billiard ball of mass $m_1 = 0.17 \text{ kg}$ moving at $v_{1i} = 4.0 \text{ m/s}$ strikes a stationary cue ball of mass $m_2 = 0.17 \text{ kg}$ ($v_{2i} = 0 \text{ m/s}$). Assuming the collision is perfectly elastic, find the final velocities of both balls.

**Solution:**

1.  **Identify Principles:** The collision is elastic, so both momentum and kinetic energy are conserved. The motion is in 1D.

2.  **Write Conservation Equations:**
    *   Momentum: $m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$
    *   Kinetic Energy: $\frac{1}{2}m_1 v_{1i}^2 + \frac{1}{2}m_2 v_{2i}^2 = \frac{1}{2}m_1 v_{1f}^2 + \frac{1}{2}m_2 v_{2f}^2$

3.  **Simplify with Initial Conditions:** Since $m_1 = m_2 = m$ and $v_{2i}=0$, the equations simplify.
    *   Momentum: $m v_{1i} = m v_{1f} + m v_{2f} \implies v_{1i} = v_{1f} + v_{2f}$
    *   Kinetic Energy: $\frac{1}{2}m v_{1i}^2 = \frac{1}{2}m v_{1f}^2 + \frac{1}{2}m v_{2f}^2 \implies v_{1i}^2 = v_{1f}^2 + v_{2f}^2$

4.  **Solve the System:** We have two equations:
    (A) $v_{1i} = v_{1f} + v_{2f}$
    (B) $v_{1i}^2 = v_{1f}^2 + v_{2f}^2$

    Substitute $v_{1i}$ from (A) into (B):
    $$ (v_{1f} + v_{2f})^2 = v_{1f}^2 + v_{2f}^2 $$
    $$ v_{1f}^2 + 2v_{1f}v_{2f} + v_{2f}^2 = v_{1f}^2 + v_{2f}^2 $$
    $$ 2v_{1f}v_{2f} = 0 $$
    This implies either $v_{1f}=0$ or $v_{2f}=0$. If $v_{2f}=0$, the second ball never moved, meaning no collision occurred. This is a trivial solution. Therefore, the physically meaningful solution is:
    $$ v_{1f} = 0 \text{ m/s} $$

5.  **Find the Second Velocity:** Substitute $v_{1f}=0$ back into equation (A):
    $$ v_{1i} = 0 + v_{2f} \implies v_{2f} = v_{1i} $$
    $$ v_{2f} = 4.0 \text{ m/s} $$

**Reflection:**
The first ball stops dead ($v_{1f}=0$), and the second ball moves off with the first ball's initial velocity ($v_{2f}=4.0 \text{ m/s}$). This "velocity swap" is a hallmark of 1D elastic collisions between objects of equal mass. Each step was necessary: stating the principles, writing the full equations, simplifying with the given numbers, and solving the resulting system algebraically.

## Diagrams
**Before Collision:**
Two masses on a 1D axis (x). $m_1$ moves right, $m_2$ is stationary.

```text
         v_1i > 0         v_2i = 0
   ----->
  ( m_1 )                ( m_2 )
--|--------------------------|----------------------> x
  x_1                      x_2
```

**After Collision:**
$m_1$ is now stationary, and $m_2$ moves right with the velocity $m_1$ used to have.

```text
         v_1f = 0                v_2f > 0
                                  ----->
  ( m_1 )                ( m_2 )
--|--------------------------|----------------------> x
  x_1'                     x_2'
```

## Memory technique — remember this forever
1.  **Story/Hook:** Think of two identical, perfectly bouncy super-balls named "Momentum" and "Energy". When they collide head-on, they don't just conserve their shared momentum; they are so "perfectly elastic" that they also conserve every bit of their kinetic energy. For equal masses, they literally just *trade* velocities, as if they passed right through each other.

2.  **Must-Memorize Formulas:**
    $$ v_{1f} = \left(\frac{m_1 - m_2}{m_1 + m_2}\right)v_{1i} + \left(\frac{2m_2}{m_1 + m_2}\right)v_{2i} $$
    $$ v_{2f} = \left(\frac{2m_1}{m_1 + m_2}\right)v_{1i} + \left(\frac{m_2 - m_1}{m_1 + m_2}\right)v_{2i} $$
    Overlearn these. Write them out from memory until it is automatic. Notice the pattern: the denominators are always the total mass.

3.  **Spaced Repetition Schedule:**
    *   Review Today: Re-derive the formulas from the two conservation laws.
    *   Review in 1 day: Solve the "Self-check" problems.
    *   Review in 3 days: Write the final velocity formulas from memory. Check them.
    *   Review in 7 days: Re-derive the relative velocity relationship: $v_{1i} - v_{2i} = -(v_{1f} - v_{2f})$.
    *   Review in 16 days: Solve a problem with non-zero initial velocities for both masses.
    *   Review in 35 days: Explain the derivation to an imaginary student, starting from first principles.

4.  **First Principles Pathway:** If you forget the formulas, do not panic. Rebuild them.
    *   Step 1: Write Conservation of Momentum.
    *   Step 2: Write Conservation of Kinetic Energy.
    *   Step 3: You have a system of two equations, two unknowns. Solve it. The fastest way is to derive the relative velocity equation and use that with the momentum equation.

## Common mistakes
1.  **Applying to Inelastic Collisions:** These formulas *only* work if kinetic energy is conserved. If the problem involves objects sticking together, deforming, or generating heat/sound, it is inelastic and you can only use conservation of momentum.
2.  **Sign Errors:** Velocity is a vector. In 1D, its direction is given by its sign. Define a positive direction (e.g., to the right) and stick to it. A particle moving left must have a negative velocity.
3.  **Algebraic Errors in the Derivation:** A common mistake is to cancel the $\frac{1}{2}m$ terms from the kinetic energy equation. You can only cancel the $\frac{1}{2}$, not the masses, unless they are equal. The difference of squares factorization is the key to a clean derivation.

## Self-check
1.  A proton ($m_p$) moving at velocity $v$ collides head-on with a stationary proton. What are their final velocities?
2.  A bowling ball ($m_1=7$ kg) moving at $v_{1i} = 5$ m/s collides elastically with a pin ($m_2=1.5$ kg) moving towards it at $v_{2i} = -2$ m/s. What are the final velocities of the ball and the pin?
3.  An alpha particle ($m_\alpha \approx 4 m_p$) collides elastically with a stationary electron ($m_e \approx m_p/1836$). What is the approximate final velocity of the alpha particle in terms of its initial velocity $v_{\alpha,i}$? What does this tell you about heavy objects hitting very light ones?