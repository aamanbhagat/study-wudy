## What it is
In a two-dimensional elastic collision, the "angle relationship" describes the geometric connection between the final velocity vectors of the colliding objects. For the special—but common—case where a moving object strikes an identical, stationary object, their final paths will be at a $90^\circ$ angle to each other. This is not a fundamental law, but a direct consequence of conserving both momentum and kinetic energy simultaneously.

## Why it matters
This principle is fundamental to interpreting particle scattering experiments at places like CERN; the angles at which new particles fly out reveal information about their mass and the nature of the collision. In aerospace, understanding scattering angles is crucial for modeling gravity assists, where a spacecraft slingshots around a planet, and for calculating the effects of micrometeoroid impacts. The same physics governs everything from a break shot in billiards to the interaction of gas molecules.

## When to study it
You must be comfortable with the following before proceeding. If not, review them first.
1.  **Conservation of Momentum**: You must understand that momentum ($\vec{p} = m\vec{v}$) is a vector quantity and that the total vector momentum of an isolated system is conserved ($\sum \vec{p}_i = \sum \vec{p}_f$).
2.  **Conservation of Kinetic Energy**: For an elastic collision, you must know that the total kinetic energy ($KE = \frac{1}{2}mv^2$) is also conserved ($\sum KE_i = \sum KE_f$).
3.  **Vector Algebra**: You must be able to resolve vectors into components and be proficient with the vector dot product ($\vec{A} \cdot \vec{B} = AB\cos\phi$).

## How to study it (step by step)
1.  **Set up the problem.** Draw the standard "before" and "after" diagrams for a 2D collision where mass $m_1$ with initial velocity $\vec{v}_{1i}$ hits a stationary mass $m_2$. Label the final velocities $\vec{v}_{1f}$ and $\vec{v}_{2f}$, and their respective angles $\theta_1$ and $\theta_2$ relative to the initial path.
2.  **Write the conservation laws.** Write the vector equation for momentum conservation and the scalar equation for kinetic energy conservation for the system you just drew.
3.  **Focus on the special case.** Assume $m_1 = m_2 = m$ and $\vec{v}_{2i} = 0$. Simplify your two conservation equations using these assumptions.
4.  **Connect energy and vectors.** Rewrite the kinetic energy equation using the dot product definition of magnitude: $v^2 = \vec{v} \cdot \vec{v}$. This is the key step that links the scalar energy equation to the vector momentum equation.
5.  **Derive the result.** Use the simplified momentum equation to substitute into the dot-product version of the energy equation. Algebraically manipulate the result to show that $\vec{v}_{1f} \cdot \vec{v}_{2f} = 0$.
6.  **Interpret the result.** What does a zero dot product between two non-zero vectors mean? It means they are perpendicular. Conclude that $\theta_1 + \theta_2 = 90^\circ$.
7.  **Solve a problem.** Find a textbook problem with unequal masses or a non-stationary target to see for yourself why the $90^\circ$ relationship fails, forcing you to solve the system of equations for the x- and y-components of momentum.

## Key ideas, with intuition
1.  **Momentum Conservation is a Vector Equation.** This is the most critical point. In 2D, this single vector equation, $\vec{p}_{1i} + \vec{p}_{2i} = \vec{p}_{1f} + \vec{p}_{2f}$, is actually *two* independent scalar equations: one for the x-components and one for the y-components. This constrains the motion heavily.
    $$ m_1 v_{1ix} + m_2 v_{2ix} = m_1 v_{1fx} + m_2 v_{2fx} $$
    $$ m_1 v_{1iy} + m_2 v_{2iy} = m_1 v_{1fy} + m_2 v_{2fy} $$
2.  **Kinetic Energy Conservation is a Scalar Equation.** This provides a third constraint on the system, but it doesn't have a direction. It relates the magnitudes of the velocities, not their components directly.
    $$ \frac{1}{2}m_1 v_{1i}^2 + \frac{1}{2}m_2 v_{2i}^2 = \frac{1}{2}m_1 v_{1f}^2 + \frac{1}{2}m_2 v_{2f}^2 $$
3.  **The Dot Product Links Energy and Momentum.** The magic happens when you realize that kinetic energy can be written in vector terms. Since for any vector $\vec{v}$, its squared magnitude is $v^2 = \vec{v} \cdot \vec{v}$, we can write the energy equation as:
    $$ m_1(\vec{v}_{1i} \cdot \vec{v}_{1i}) = m_1(\vec{v}_{1f} \cdot \vec{v}_{1f}) + m_2(\vec{v}_{2f} \cdot \vec{v}_{2f}) $$
    This allows us to substitute the vector momentum equation into the energy equation, which is how the geometric relationship is proven. For the special case ($m_1=m_2$, $v_{2i}=0$), momentum conservation gives $\vec{v}_{1i} = \vec{v}_{1f} + \vec{v}_{2f}$. Squaring this (taking the dot product with itself) gives $v_{1i}^2 = v_{1f}^2 + v_{2f}^2 + 2(\vec{v}_{1f} \cdot \vec{v}_{2f})$. The energy equation gives $v_{1i}^2 = v_{1f}^2 + v_{2f}^2$. Comparing these two forces the conclusion that $\vec{v}_{1f} \cdot \vec{v}_{2f} = 0$.

## Worked example
**Problem:** A proton with speed $v_0$ collides elastically with another proton that is initially at rest. After the collision, one proton moves off at an angle of $30^\circ$ to the original direction of motion. What is the angle of the second proton's velocity, and what are the final speeds of both protons?

**Solution:**
1.  **Identify the conditions.** We have an elastic collision between two equal-mass particles ($m_p = m_p$), and the target is at rest. This is the special case.
2.  **Apply the angle relationship.** Since the conditions for the special case are met, the final velocity vectors must be perpendicular. Let $\theta_1 = 30^\circ$. The angle of the second proton, $\theta_2$, must satisfy $\theta_1 + \theta_2 = 90^\circ$.
    $$ \theta_2 = 90^\circ - 30^\circ = 60^\circ $$
    The second proton moves off at an angle of $60^\circ$ on the opposite side of the initial path.
3.  **Apply conservation of momentum.** Let the initial direction be the x-axis. $\vec{v}_{1i} = v_0 \hat{i}$. The momentum conservation equation is $m\vec{v}_{1i} = m\vec{v}_{1f} + m\vec{v}_{2f}$, which simplifies to $\vec{v}_{1i} = \vec{v}_{1f} + \vec{v}_{2f}$.
    Let's write this in components:
    *   x-component: $v_0 = v_{1f} \cos(30^\circ) + v_{2f} \cos(-60^\circ)$
    *   y-component: $0 = v_{1f} \sin(30^\circ) + v_{2f} \sin(-60^\circ)$
    Note: We use $-60^\circ$ because it's on the other side of the axis.
4.  **Solve the system of equations.** From the y-component equation:
    $$ v_{1f} \sin(30^\circ) = v_{2f} \sin(60^\circ) $$
    $$ v_{1f} \left(\frac{1}{2}\right) = v_{2f} \left(\frac{\sqrt{3}}{2}\right) \implies v_{1f} = \sqrt{3} v_{2f} $$
    Substitute this into the x-component equation:
    $$ v_0 = (\sqrt{3} v_{2f}) \cos(30^\circ) + v_{2f} \cos(60^\circ) $$
    $$ v_0 = (\sqrt{3} v_{2f}) \left(\frac{\sqrt{3}}{2}\right) + v_{2f} \left(\frac{1}{2}\right) $$
    $$ v_0 = \frac{3}{2} v_{2f} + \frac{1}{2} v_{2f} = 2 v_{2f} \implies v_{2f} = \frac{v_0}{2} $$
    Now find $v_{1f}$:
    $$ v_{1f} = \sqrt{3} v_{2f} = \frac{\sqrt{3}}{2} v_0 $$
5.  **Final Answer.** The first proton moves at speed $v_{1f} = \frac{\sqrt{3}}{2} v_0$ at $30^\circ$. The second proton moves at speed $v_{2f} = \frac{1}{2} v_0$ at $60^\circ$ (or $-60^\circ$ depending on convention).

**Reflection:** Step 2, using the $90^\circ$ rule, gave us an angle immediately. This simplified the geometry for the momentum conservation equations in Step 3, making the algebra in Step 4 straightforward. Without knowing the angle relationship, we would have had two equations with three unknowns ($v_{1f}, v_{2f}, \theta_2$) and would have needed to bring in the kinetic energy equation as a third, more complex equation.

## Diagrams
```text
      Before Collision
      -----------------

            v_1i
      m_1 ------->         m_2 (at rest)
       o                    o

      --------------------------------> x-axis


      After Collision
      ----------------

                            /
                           / v_1f
                          /
                         / theta_1
      ------------------o----------------> x-axis
                         \
                          \ theta_2
                           \
                            \ v_2f
                             \

```

## Memory technique — remember this forever
1.  **Mnemonic/Visual Hook:** "Equal mass, stationary target, elastic smash? Right-angle dash." Visualize a billiard cue ball hitting a stationary ball of the same mass. Unless it's a perfect head-on hit, they always scatter at roughly $90^\circ$ to each other. The velocity vectors form the legs of a right-angled triangle, with the initial velocity vector as the hypotenuse.

2.  **Must-Know Formulas:**
    *   Vector momentum conservation: $\sum \vec{p}_i = \sum \vec{p}_f$
    *   Scalar kinetic energy conservation (elastic): $\sum KE_i = \sum KE_f$
    *   The special case result: For $m_1=m_2$ and $\vec{v}_{2i}=0$ in an elastic collision, $\vec{v}_{1f} \perp \vec{v}_{2f}$ (which implies $\theta_1 + \theta_2 = 90^\circ$).

3.  **Spaced Repetition Schedule:** Review this topic and re-derive the special case result from the two conservation laws at these intervals:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget the $90^\circ$ rule, you can always rebuild it.
    *   Start with the two fundamental laws: conservation of momentum (vector) and conservation of kinetic energy (scalar).
    *   Apply the conditions: $m_1 = m_2 = m$ and $\vec{v}_{2i} = 0$.
    *   The laws become: (1) $m\vec{v}_{1i} = m\vec{v}_{1f} + m\vec{v}_{2f} \implies \vec{v}_{1i} = \vec{v}_{1f} + \vec{v}_{2f}$ and (2) $\frac{1}{2}m v_{1i}^2 = \frac{1}{2}m v_{1f}^2 + \frac{1}{2}m v_{2f}^2 \implies v_{1i}^2 = v_{1f}^2 + v_{2f}^2$.
    *   Take the dot product of equation (1) with itself: $\vec{v}_{1i} \cdot \vec{v}_{1i} = (\vec{v}_{1f} + \vec{v}_{2f}) \cdot (\vec{v}_{1f} + \vec{v}_{2f})$.
    *   This expands to: $v_{1i}^2 = v_{1f}^2 + v_{2f}^2 + 2(\vec{v}_{1f} \cdot \vec{v}_{2f})$.
    *   Compare this with equation (2). The only way both can be true is if $2(\vec{v}_{1f} \cdot \vec{v}_{2f}) = 0$, which means the final velocities are perpendicular.

## Common mistakes
1.  **Applying the 90° rule universally.** Students often forget the strict conditions and apply the right-angle result to collisions with unequal masses, or where the target is moving, or when the collision is inelastic. It *only* works for elastic collisions of equal masses where the target is initially at rest.
2.  **Treating momentum as a scalar.** In 2D, writing $m_1 v_{1i} = m_1 v_{1f} + m_2 v_{2f}$ is incorrect. You must break the momentum conservation into x- and y-components.
3.  **Angle convention errors.** Forgetting a negative sign on an angle if it's below the axis (e.g., using $\sin(60^\circ)$ instead of $\sin(-60^\circ)$), which will lead to incorrect signs in the system of equations.

## Self-check
1.  You observe two air hockey pucks of equal mass collide elastically. Puck A was moving and Puck B was stationary. If Puck A is deflected $20^\circ$ to the left of its original path, what is the exact angle of Puck B's final velocity vector?
2.  An alpha particle ($m=4u$) moving at speed $v_i$ strikes a stationary proton ($m=1u$) in an elastic collision. The alpha particle is deflected by an angle $\theta_1$. Will the angle of the proton's recoil, $\theta_2$, combine with $\theta_1$ to be greater than, less than, or equal to $90^\circ$? Justify your answer without a full calculation.
3.  Prove that the $90^\circ$ separation rule does *not* hold for two equal-mass particles if both are moving before the elastic collision. (Hint: Start from the first principles pathway and see where the derivation breaks down).