## What it is
The magnetic force is a force exerted on a moving electric charge, $q$, when it passes through a magnetic field, $\vec{B}$. This force is always perpendicular to both the charge's velocity, $\vec{v}$, and the magnetic field itself. Its magnitude depends on the charge, its speed, the field strength, and the angle between the velocity and the field.

## Why it matters
This principle is fundamental to countless technologies. In aerospace, it's the basis for ion thrusters and magnetoplasmadynamic thrusters for spacecraft propulsion. In physics, it governs the operation of particle accelerators like the LHC and mass spectrometers for identifying materials. In computer science and engineering, the Hall effect—a direct consequence of this force—is used in sensors to measure magnetic fields, current, and position in everything from your phone to a car's anti-lock braking system.

## When to study it
Before tackling this, you must have a solid grasp of the following prerequisites. If you are not confident with these, pause and review them first.
1.  **Vectors**: You must be comfortable with vector notation ($\vec{v}$), components ($v_x, v_y, v_z$), and magnitude ($|\vec{v}|$).
2.  **The Cross Product**: You must know how to compute the cross product of two vectors, $\vec{a} \times \vec{b}$, both using the determinant method with components and the geometric definition $|\vec{a}||\vec{b}|\sin\theta$.
3.  **The Right-Hand Rule**: You must be able to apply the right-hand rule to find the direction of a vector resulting from a cross product.
4.  **Basic Field Concept**: You should understand that a field (like a magnetic field $\vec{B}$) is a quantity that has a value at every point in space.

## How to study it (step by step)
1.  **Master the formula's structure**: Write down $\vec{F} = q(\vec{v} \times \vec{B})$. Verbally break it down: "The force $\vec{F}$ is the charge $q$ times the cross product of the velocity vector $\vec{v}$ and the magnetic field vector $\vec{B}$."
2.  **Focus on direction**: Practice the right-hand rule exclusively for 15 minutes. Point your index finger in the direction of $\vec{v}$, curl your middle finger into the direction of $\vec{B}$. Your thumb points in the direction of $\vec{v} \times \vec{B}$. Now, consider the charge $q$: if $q$ is positive, the force $\vec{F}$ is in your thumb's direction. If $q$ is negative, the force $\vec{F}$ is in the *opposite* direction of your thumb.
3.  **Focus on magnitude**: Write the magnitude formula $F = |q|vB\sin\theta$. Solve 3-5 simple plug-and-chug problems where you are given scalars for charge, speed, field strength, and the angle $\theta$. Pay attention to the units: Force in Newtons (N), charge in Coulombs (C), speed in m/s, and magnetic field in Teslas (T).
4.  **Analyze the edge cases**: What happens if $\vec{v}$ is parallel to $\vec{B}$? Then $\theta=0$ or $\theta=180^\circ$, so $\sin\theta=0$ and the force is zero. What happens if $\vec{v}$ is perpendicular to $\vec{B}$? Then $\theta=90^\circ$, $\sin\theta=1$, and the force is at its maximum magnitude, $F_{max} = |q|vB$.
5.  **Connect magnitude and direction**: Solve a problem where $\vec{v}$ and $\vec{B}$ are given in component form (e.g., $\vec{v} = 2\hat{i} + 3\hat{j}$, $\vec{B} = 5\hat{k}$). First, calculate the cross product $\vec{v} \times \vec{B}$ to find the direction of the force vector. Then, calculate the magnitude of that resulting vector.
6.  **Work and Energy**: Prove to yourself that the magnetic force does no work. The work done by a force is $W = \int \vec{F} \cdot d\vec{l}$. Since $d\vec{l}$ is always in the direction of $\vec{v}$, and $\vec{F}$ is always perpendicular to $\vec{v}$, the dot product $\vec{F} \cdot \vec{v}$ is always zero. Therefore, the magnetic force can change a particle's direction, but never its speed or kinetic energy.

## Key ideas, with intuition
1.  **No motion, no force**: A magnetic field only affects *moving* charges. If $v=0$, then $\vec{F}=0$. This is a primary distinction from the electric force ($\vec{F}=q\vec{E}$), which acts on charges whether they are moving or not.
2.  **The force is a deflecting force, not an accelerating force (in the colloquial sense)**: The force is always perpendicular to the direction of motion ($\vec{F} \perp \vec{v}$). Think of it like the tension in a string when you swing a ball in a circle. The tension pulls the ball inward, perpendicular to its velocity, causing it to change direction but not speed. The magnetic force acts similarly, bending the path of a charged particle without changing its kinetic energy.
3.  **The force direction is defined by a geometric rule**: The cross product $\vec{v} \times \vec{B}$ establishes a unique direction perpendicular to the plane formed by $\vec{v}$ and $\vec{B}$. Nature's "choice" of direction is captured by the right-hand rule. The sign of the charge $q$ is the final piece: it either follows the rule (positive $q$) or opposes it (negative $q$).

    $$
    \vec{F} = q(\vec{v} \times \vec{B})
    $$

    This vector equation contains everything:
    -   Magnitude: $F = |q| |\vec{v}| |\vec{B}| \sin\theta$
    -   Direction: Perpendicular to the $\vec{v}$-$\vec{B}$ plane, determined by the right-hand rule and sign of $q$.

## Worked example
**Problem**: A proton ($q = +1.602 \times 10^{-19}$ C) moves with a velocity $\vec{v} = (2.0 \times 10^5 \hat{i} + 3.0 \times 10^5 \hat{j})$ m/s through a uniform magnetic field $\vec{B} = (0.5 \hat{k})$ T. Find the magnetic force $\vec{F}$ on the proton.

**Solution**:
1.  **Identify the governing equation**: The force is given by the Lorentz force law component for magnetic fields: $\vec{F} = q(\vec{v} \times \vec{B})$.
2.  **Calculate the cross product $\vec{v} \times \vec{B}$**: We use the determinant method for the cross product of the vectors $\vec{v} = \langle 2, 3, 0 \rangle \times 10^5$ and $\vec{B} = \langle 0, 0, 0.5 \rangle$.
    $$
    \vec{v} \times \vec{B} = 
    \begin{vmatrix}
    \hat{i} & \hat{j} & \hat{k} \\
    2.0 \times 10^5 & 3.0 \times 10^5 & 0 \\
    0 & 0 & 0.5
    \end{vmatrix}
    $$
3.  **Compute the determinant**:
    $$
    \vec{v} \times \vec{B} = \hat{i}((3.0 \times 10^5)(0.5) - (0)(0)) - \hat{j}((2.0 \times 10^5)(0.5) - (0)(0)) + \hat{k}((2.0 \times 10^5)(0) - (3.0 \times 10^5)(0))
    $$
    $$
    \vec{v} \times \vec{B} = \hat{i}(1.5 \times 10^5) - \hat{j}(1.0 \times 10^5) + \hat{k}(0)
    $$
    So, $\vec{v} \times \vec{B} = (1.5 \times 10^5 \hat{i} - 1.0 \times 10^5 \hat{j})$ T·m/s.
4.  **Multiply by the charge $q$**: Now, we multiply this resulting vector by the proton's charge.
    $$
    \vec{F} = q(\vec{v} \times \vec{B}) = (1.602 \times 10^{-19} \text{ C}) \times (1.5 \times 10^5 \hat{i} - 1.0 \times 10^5 \hat{j}) \text{ T m/s}
    $$
    $$
    \vec{F} = (2.403 \times 10^{-14} \hat{i} - 1.602 \times 10^{-14} \hat{j}) \text{ N}
    $$

**Reflection**: Each step was a direct application of the formula. Step 1 identified the tool. Step 2 set up the core mathematical operation, the cross product. Step 3 executed that operation carefully. Step 4 incorporated the scalar charge $q$ to get the final force vector. The result is a force vector, as expected, with components in both the $\hat{i}$ and $\hat{j}$ directions, and perpendicular to both $\vec{v}$ (which is in the xy-plane) and $\vec{B}$ (which is on the z-axis).

## Diagrams
Here is an ASCII diagram illustrating the right-hand rule for a positive charge $q$. The vectors $\vec{v}$ and $\vec{B}$ lie in the x-y plane, and the resulting force $\vec{F}$ is along the z-axis.

```text
       +z
        ^
        |
        |------> +y
       /
      /
     /
   +x


       +z ^
          |
          |  F = q(v x B)
          |   /
          |  /
          | /
          |/
          +------------> v (velocity)
         /|
        / |
       /  | B (magnetic field)
      /   |
     /    v
    x
```
For the right-hand rule itself:
1.  Point your **index finger** in the direction of velocity ($\vec{v}$).
2.  Point your **middle finger** in the direction of the magnetic field ($\vec{B}$).
3.  Your **thumb** will point in the direction of the force ($\vec{F}$) for a positive charge.

## Memory technique — remember this forever
1.  **Mnemonic Story**: Imagine you are a "Force" for good. You see a charge with some **v**elocity (your **pointer finger**, pointing the way). It enters a magnetic **B**-field (your bent **middle finger**). You must apply a **F**orce (your **thumb**) to push it perpendicularly away from its path and the field lines. For a *negative* charge (like an electron, an "evil" particle in this story), the force is in the opposite direction—it does the opposite of what you command.
2.  **Must-know formulas**: Overlearn these two forms. Do not paraphrase.
    -   Vector form: $\vec{F} = q(\vec{v} \times \vec{B})$
    -   Magnitude form: $F = |q|vB\sin\theta$
3.  **Spaced Repetition Schedule**: Review this topic and solve one problem at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway**: If you forget the formula, rebuild it from experimental facts.
    -   The force must depend on charge $q$, velocity $\vec{v}$, and field $\vec{B}$.
    -   Experiment shows the force is zero if $\vec{v}$ is parallel to $\vec{B}$. This suggests a sine dependency, not a cosine (like the dot product).
    -   Experiment shows the force is perpendicular to both $\vec{v}$ and $\vec{B}$.
    -   The only standard vector operation that takes two vectors and produces a third vector perpendicular to both, with a magnitude proportional to the sine of the angle between them, is the **cross product**. This logic leads you directly back to $\vec{F} \propto \vec{v} \times \vec{B}$. The charge $q$ is the constant of proportionality.

## Common mistakes
1.  **Sign Errors**: Forgetting to flip the direction of the force for a negative charge (like an electron). The right-hand rule gives the direction for a *positive* charge; you must manually reverse it for a negative one.
2.  **Angle Confusion**: Using the wrong angle for $\theta$ in the magnitude formula. $\theta$ is *always* the angle between the tail of the $\vec{v}$ vector and the tail of the $\vec{B}$ vector.
3.  **Component Mix-up**: Messing up the order of the cross product. $\vec{v} \times \vec{B}$ is not the same as $\vec{B} \times \vec{v}$. In fact, $\vec{B} \times \vec{v} = -(\vec{v} \times \vec{B})$, which will give you a force in the exact opposite direction.
4.  **Energy Conservation Error**: Assuming the magnetic force changes the particle's speed. It does not. The force is always perpendicular to velocity, so it does no work ($W = \vec{F} \cdot \vec{d} = 0$) and cannot change the kinetic energy ($K = \frac{1}{2}mv^2$).

## Self-check
1.  An electron ($q = -1.602 \times 10^{-19}$ C) moves at $3.0 \times 10^6$ m/s. It enters a uniform magnetic field of $1.5$ T. If its velocity vector makes an angle of $30^\circ$ with the magnetic field vector, what is the magnitude of the magnetic force on the electron?
2.  A particle with charge $+q$ has a velocity $\vec{v} = v_0 \hat{j}$. It enters a region with a magnetic field $\vec{B} = B_0 \hat{i}$. In which direction is the initial magnetic force on the particle?
3.  A proton enters a uniform magnetic field that is directed into the page. The proton's initial velocity is from left to right, perpendicular to the field. Describe the subsequent path of the proton. Will its speed increase, decrease, or remain constant?