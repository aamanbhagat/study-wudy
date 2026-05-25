## What it is
Electric potential, $V$, is the potential energy per unit charge at a point in an electric field. The potential difference between two points, $\Delta V$, is the work required per unit charge to move a test charge from the first point to the second against the electric field. It is a scalar quantity, measured in Volts (Joules/Coulomb).

## Why it matters
Electric potential is the concept behind "voltage" in all electric circuits. In aerospace, spacecraft can build up large potential differences relative to the surrounding plasma, leading to electrostatic discharge that can damage electronics. In particle physics, enormous potential differences are used in accelerators like the LHC to accelerate particles to near the speed of light.

## When to study it
Before tackling this, you must have a solid grasp of the following prerequisites. If not, master them first.
1.  **Physics:** The concepts of work ($W = \int \vec{F} \cdot d\vec{l}$), conservative forces, potential energy ($\Delta U = -W_{\text{field}}$), and the definition of the electric field ($\vec{E} = \vec{F}/q$).
2.  **Vector Calculus:** The dot product and the line integral.

## How to study it (step by step)
1.  **Revisit Work and Potential Energy:** Write down the definition of work done by a force $\vec{F}$ along a path from point A to B: $W_{A \to B} = \int_A^B \vec{F} \cdot d\vec{l}$. Recall that for a conservative force (like the electrostatic force), the change in potential energy is the negative of the work done by the field: $\Delta U = U_B - U_A = -W_{A \to B}$.
2.  **Apply to the Electric Field:** Consider a positive test charge $q$ in an electric field $\vec{E}$. The field exerts a force $\vec{F}_E = q\vec{E}$. The work done *by the field* as the charge moves from A to B is $W_{E} = \int_A^B (q\vec{E}) \cdot d\vec{l}$.
3.  **Define Electric Potential Difference:** The change in electric potential energy is $\Delta U = -W_E = -\int_A^B q\vec{E} \cdot d\vec{l}$. Electric potential difference, $\Delta V$, is defined as the change in potential energy *per unit charge*: $\Delta V = \Delta U / q$.
4.  **Derive the Master Equation:** Substitute the expressions from steps 2 and 3:
    $$ \Delta V = V_B - V_A = \frac{\Delta U}{q} = \frac{-\int_A^B q\vec{E} \cdot d\vec{l}}{q} $$
    The charge $q$ cancels, yielding the fundamental definition:
    $$ V_B - V_A = -\int_A^B \vec{E} \cdot d\vec{l} $$
5.  **Set a Reference Point:** To define the potential $V$ at a single point (not just a difference), we must choose a reference point where the potential is zero. By convention, for isolated charges, we set $V(\infty) = 0$. The potential at a point P is then the work per unit charge to bring a charge from infinity to P: $V_P = -\int_\infty^P \vec{E} \cdot d\vec{l}$.
6.  **Solve a Problem:** Use the definition to calculate the potential of a point charge $Q$. Place $Q$ at the origin. Find the potential at a distance $r$ from $Q$. Solve $V(r) = -\int_\infty^r \vec{E} \cdot d\vec{l}$ where $\vec{E} = \frac{1}{4\pi\epsilon_0} \frac{Q}{r'^2} \hat{r'}$. Confirm you get $V(r) = \frac{1}{4\pi\epsilon_0}\frac{Q}{r}$.

## Key ideas, with intuition
1.  **Potential is "Electric Height":** Think of an electric field like a gravitational field. A massive object has gravitational potential energy based on its height. Similarly, a charged particle has electric potential energy based on its "electric height" or electric potential. A positive charge will naturally "fall" from high potential to low potential, just as a ball rolls downhill.
2.  **The Minus Sign Means You Do the Work:** The formula is $V_B - V_A = -\int_A^B \vec{E} \cdot d\vec{l}$. Why the minus sign? The integral calculates the work done *by the field*. To increase the potential energy of a positive charge (move it "uphill"), you must apply an external force that *opposes* the field's force. The work you do is positive, so the change in potential is positive, which requires the minus sign to cancel the work done by the field (which is negative in this case).
    $$ \Delta V = \frac{W_{\text{external}}}{q} = \frac{\int_A^B \vec{F}_{\text{ext}} \cdot d\vec{l}}{q} = \frac{\int_A^B (-q\vec{E}) \cdot d\vec{l}}{q} = -\int_A^B \vec{E} \cdot d\vec{l} $$
3.  **Path Independence:** For any static electric field, the value of the integral depends only on the start point A and end point B, not the path taken between them. This is because the electrostatic force is conservative. This is a powerful property: you can always choose the easiest path (e.g., a straight line, or an arc) to calculate a potential difference.
4.  **Scalars are Simpler than Vectors:** The electric field $\vec{E}$ is a vector field. Calculating the net field from multiple charges requires vector addition. The electric potential $V$ is a scalar field. To find the total potential from multiple charges, you simply add the individual potentials as numbers. This is a massive computational simplification.

## Worked example
**Problem:** Find the potential difference $V_B - V_A$ for a uniform electric field $\vec{E} = E_0 \hat{i}$ between point A at the origin $(0,0)$ and point B at $(x_B, y_B)$.

**Solution:**
1.  **State the definition:** The potential difference is given by the line integral:
    $$ V_B - V_A = -\int_A^B \vec{E} \cdot d\vec{l} $$
2.  **Define the vectors:**
    *   The electric field is constant: $\vec{E} = E_0 \hat{i} = (E_0, 0)$.
    *   The differential path element in Cartesian coordinates is $d\vec{l} = dx \hat{i} + dy \hat{j}$.
    *   The start point is A = (0,0). The end point is B = ($x_B, y_B$).
3.  **Compute the dot product:**
    $$ \vec{E} \cdot d\vec{l} = (E_0 \hat{i}) \cdot (dx \hat{i} + dy \hat{j}) = E_0 dx (\hat{i} \cdot \hat{i}) + E_0 dy (\hat{i} \cdot \hat{j}) $$
    Since $\hat{i} \cdot \hat{i} = 1$ and $\hat{i} \cdot \hat{j} = 0$, this simplifies to:
    $$ \vec{E} \cdot d\vec{l} = E_0 dx $$
4.  **Evaluate the integral:**
    $$ V_B - V_A = -\int_A^B E_0 dx $$
    The integral is over a path from A to B. Since the integrand only depends on $dx$, the change in the y-direction is irrelevant to the result. The integration limits for $x$ are from $x_A=0$ to $x_B$.
    $$ V_B - V_A = -E_0 \int_0^{x_B} dx = -E_0 [x]_0^{x_B} $$
5.  **State the final answer:**
    $$ V_B - V_A = -E_0 x_B $$

**Reflection:**
*   Step 1 was applying the fundamental definition.
*   Step 2 was translating the problem into the mathematical objects required by the definition.
*   Step 3, the dot product, isolated the component of the path that is parallel to the electric field. This is the only part that contributes to the change in potential.
*   Step 4 showed that the potential only changes as we move along the x-axis, parallel to $\vec{E}$. Moving in the y-direction (perpendicular to $\vec{E}$) does not change the potential. This is why the final answer only depends on $x_B$, not $y_B$.

## Diagrams
A path from point A to B in a uniform electric field pointing to the right.

```text
      y
      ^
      |
      | E = E_0 î
      | ----> ----> ----> ---->
      |
      |              Path C
      |            . . . . . B (x_B, y_B)
      |          .        .  /
      |        .         . / dl
      |      .          .
      |    .           .
      |  .            .
      | A . . . . . .
      | (0,0)
      +----------------------------> x
```
This diagram shows that the work done only depends on the displacement in the x-direction. The component of $d\vec{l}$ parallel to $\vec{E}$ is what matters. The potential at all points with the same x-coordinate is the same (these are equipotential lines, which are vertical in this diagram).

## Memory technique — remember this forever
1.  **Visual Hook:** Imagine an "electric landscape" where high potential is a high mountain and low potential is a valley. The electric field vector $\vec{E}$ always points in the steepest *downhill* direction. The formula $V = -\int \vec{E} \cdot d\vec{l}$ tells you how much your "altitude" (potential) changes as you walk along a path $d\vec{l}$. The minus sign is there because if you walk in the direction the field is pointing (downhill), your potential *decreases*.
2.  **Must Overlearn:**
    *   The Definition: $$ V_B - V_A = -\int_A^B \vec{E} \cdot d\vec{l} $$
    *   Point Charge Potential (relative to $V(\infty)=0$): $$ V(r) = \frac{1}{4\pi\epsilon_0} \frac{Q}{r} $$
3.  **Spaced Repetition Schedule:** Review this topic from scratch (re-derive, re-solve the example) at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Do not just read it. Rebuild it.
4.  **First Principles Pathway:** If you forget the formula, rebuild it from the definition of Work and Potential Energy.
    *   Work done by field on charge $q$: $W_E = \int \vec{F}_E \cdot d\vec{l} = \int (q\vec{E}) \cdot d\vec{l}$.
    *   Change in Potential Energy is negative work done by conservative field: $\Delta U = -W_E$.
    *   Change in Potential is change in PE per unit charge: $\Delta V = \Delta U / q$.
    *   Combine them: $\Delta V = \frac{-W_E}{q} = \frac{-\int (q\vec{E}) \cdot d\vec{l}}{q} = -\int \vec{E} \cdot d\vec{l}$.

## Common mistakes
1.  **Forgetting the minus sign.** This is the most common error. Remember the "electric height" analogy: moving *with* the field is like going downhill, so potential *decreases*. $\Delta V$ should be negative. The minus sign ensures this.
2.  **Confusing Potential with Potential Energy.** Potential $V$ is a property of the field (Joules/Coulomb). Potential Energy $U=qV$ is a property of a charge *in* the field (Joules). They are not interchangeable.
3.  **Incorrectly setting up the integral limits.** The integral is from the starting point A to the ending point B. A common mistake is to swap them, which flips the sign of the answer. $V_B - V_A = -\int_A^B ...$
4.  **Assuming $V=0$ at the origin.** Unless explicitly stated, the only universal reference point is $V(\infty)=0$ for localized charge distributions. The choice of where $V=0$ is arbitrary, but it must be consistent.

## Self-check
1.  A charge is moved in a perfect circle around a single point charge $Q$ located at the center. What is the potential difference between the start and end point of this path? Why?
2.  The electric field inside a parallel plate capacitor is uniform, $\vec{E} = (500 \text{ V/m}) \hat{k}$. If the plate at $z=0$ is held at a potential of $V=10$ V, what is the potential of the plate at $z=2$ cm?
3.  The electric field on the axis of a charged ring of radius $R$ and charge $Q$ is given by $\vec{E}(z) = \frac{1}{4\pi\epsilon_0} \frac{Qz}{(z^2+R^2)^{3/2}}\hat{k}$. Using the definition $V = -\int \vec{E} \cdot d\vec{l}$, find the potential at a point $z$ on the axis, assuming $V(\infty)=0$.