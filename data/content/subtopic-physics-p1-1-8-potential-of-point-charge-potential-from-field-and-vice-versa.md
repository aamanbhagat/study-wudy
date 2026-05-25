## What it is
Electric potential, $V$, is the potential energy per unit charge at a point in an electric field. It's a scalar quantity that tells you how much work is required to move a unit positive charge from a reference point (usually infinity) to that specific location. The electric field, $\vec{E}$, is the negative gradient of the potential, meaning the field points in the direction of the steepest decrease in potential.

## Why it matters
This concept is the foundation of circuit theory; voltage is simply a potential difference. In aerospace, ion propulsion systems accelerate charged particles (like xenon ions) across a large potential difference to generate thrust. Understanding how to derive fields from potentials is also critical for designing high-voltage systems in spacecraft, ensuring components are shielded from electrical breakdown (arcing).

## When to study it
You must be comfortable with these prerequisites:
1.  **Mechanics:** The definition of work as a line integral: $W = \int_A^B \vec{F} \cdot d\vec{l}$.
2.  **Electrostatics:** Coulomb's Law and the definition of the electric field of a point charge, $\vec{E} = \frac{kQ}{r^2}\hat{r}$.
3.  **Vector Calculus:** The gradient operator, $\nabla$, and how to compute a line integral.

If you are not solid on these, pause and review them. Attempting this topic without them will lead to memorization without understanding.

## How to study it (step by step)
1.  **Derive Potential from Field:** Start with the definition of potential difference, $\Delta V = - \int_A^B \vec{E} \cdot d\vec{l}$. Use the electric field of a point charge, $\vec{E} = \frac{kQ}{r^2}\hat{r}$, and integrate from $r=\infty$ (where we define $V=0$) to a finite distance $r$ to derive the potential of a point charge, $V(r) = \frac{kQ}{r}$.
2.  **Practice Superposition:** Solve 2-3 problems involving finding the total potential at a point due to several discrete point charges. Since potential is a scalar, this is simple addition—a significant simplification over vector addition for fields.
3.  **Derive Field from Potential:** Understand the gradient operator $\nabla = \hat{i}\frac{\partial}{\partial x} + \hat{j}\frac{\partial}{\partial y} + \hat{k}\frac{\partial}{\partial z}$. Apply the relation $\vec{E} = -\nabla V$ to the point charge potential $V(r) = \frac{kQ}{r}$ and verify that you recover the familiar electric field expression.
4.  **Connect to Topography:** Draw equipotential lines (lines of constant $V$) for a point charge (circles) and a dipole. Then draw the corresponding electric field lines. Internalize that $\vec{E}$ lines are always perpendicular to equipotential lines and point from high $V$ to low $V$, just like water flows downhill on a topographical map.
5.  **Solve a Forward Problem:** Find a problem where you are given a simple, non-uniform electric field (e.g., $\vec{E} = C x \hat{i}$) and asked to calculate the potential difference between two points, $(x_1, y_1)$ and $(x_2, y_2)$. This forces you to use the line integral definition directly.
6.  **Solve a Reverse Problem:** Find a problem where you are given a potential function (e.g., $V(x,y) = A(x^2 - y^2)$) and asked to find the magnitude and direction of the electric field at a specific point. This solidifies your use of the gradient.

## Key ideas, with intuition
1.  **Potential is "Electric Height":** Think of an electric field as a landscape. The electric potential $V$ at a point is analogous to the gravitational potential energy (or simply the height) at that point. A positive charge will "roll downhill" from a region of high potential to low potential.
2.  **The Field is the "Steepness of the Slope":** The electric field $\vec{E}$ is a vector that points in the direction of the steepest descent of the potential. Its magnitude is how steep that descent is. This is precisely what the negative gradient means.
    $$ \vec{E} = -\nabla V $$
    The minus sign is crucial: the field points *down* the potential hill.
3.  **Path Independence:** The work done moving a charge between two points in an electrostatic field is independent of the path taken. This is why a scalar potential function $V$ can exist. The potential difference only depends on the start and end points.
    $$ \Delta V = V_B - V_A = -\int_A^B \vec{E} \cdot d\vec{l} $$
4.  **Scalars are Simpler than Vectors:** The potential of a point charge is a scalar field that falls off as $1/r$. The electric field is a vector field that falls off as $1/r^2$. For systems of many charges, it is almost always easier to sum the scalar potentials and then take one gradient, rather than performing vector addition on all the individual fields.
    $$ V_{total} = \sum_i V_i = \sum_i \frac{k Q_i}{r_i} \implies \vec{E}_{total} = -\nabla V_{total} $$

## Worked example
**Problem:** A point charge $Q = +2 \text{ nC}$ is located at the origin.
(a) Find the electric potential $V$ at point $P$, located at coordinates $(x,y,z) = (3, 4, 0)$ meters.
(b) From this potential function, calculate the electric field vector $\vec{E}$ at point $P$.

**Solution:**

**(a) Find the potential $V$ at $P$.**
1.  **Identify the principle:** The potential from a single point charge is given by $V = \frac{kQ}{r}$, assuming $V(\infty)=0$.
2.  **Calculate the distance:** The distance $r$ from the origin $(0,0,0)$ to the point $P(3,4,0)$ is the magnitude of the position vector $\vec{r}$.
    $$ r = |\vec{r}| = \sqrt{x^2 + y^2 + z^2} = \sqrt{3^2 + 4^2 + 0^2} = \sqrt{9 + 16} = \sqrt{25} = 5 \text{ m} $$
3.  **Substitute values:** We use the constant $k \approx 8.99 \times 10^9 \text{ N}\cdot\text{m}^2/\text{C}^2$ and the given charge $Q = 2 \times 10^{-9} \text{ C}$.
    $$ V = \frac{(8.99 \times 10^9 \text{ N}\cdot\text{m}^2/\text{C}^2)(2 \times 10^{-9} \text{ C})}{5 \text{ m}} = \frac{17.98}{5} \text{ V} \approx 3.6 \text{ V} $$
    The potential at point $P$ is approximately $3.6$ Volts.

**(b) Find the electric field $\vec{E}$ from the potential.**
1.  **Write the general potential function:** Before finding the field at a specific point, we need the potential function $V(x,y,z)$.
    $$ V(x,y,z) = \frac{kQ}{r} = \frac{kQ}{\sqrt{x^2+y^2+z^2}} $$
2.  **Apply the gradient formula:** The electric field is the negative gradient of the potential: $\vec{E} = -\nabla V = -(\frac{\partial V}{\partial x}\hat{i} + \frac{\partial V}{\partial y}\hat{j} + \frac{\partial V}{\partial z}\hat{k})$.
3.  **Calculate the partial derivatives:** Let's find the x-component. Using the chain rule:
    $$ \frac{\partial V}{\partial x} = \frac{\partial}{\partial x} \left( kQ(x^2+y^2+z^2)^{-1/2} \right) = kQ \left(-\frac{1}{2}(x^2+y^2+z^2)^{-3/2} \cdot 2x \right) $$
    $$ \frac{\partial V}{\partial x} = -kQ \frac{x}{(x^2+y^2+z^2)^{3/2}} = -kQ \frac{x}{r^3} $$
    By symmetry, the y and z derivatives are similar:
    $$ \frac{\partial V}{\partial y} = -kQ \frac{y}{r^3} \quad \text{and} \quad \frac{\partial V}{\partial z} = -kQ \frac{z}{r^3} $$
4.  **Assemble the field vector:**
    $$ \vec{E} = - \left( (-kQ \frac{x}{r^3})\hat{i} + (-kQ \frac{y}{r^3})\hat{j} + (-kQ \frac{z}{r^3})\hat{k} \right) $$
    $$ \vec{E} = \frac{kQ}{r^3} (x\hat{i} + y\hat{j} + z\hat{k}) = \frac{kQ}{r^3}\vec{r} $$
    This is equivalent to the familiar form $\vec{E} = \frac{kQ}{r^2}\hat{r}$, since $\hat{r} = \vec{r}/r$.
5.  **Evaluate at point P:** Now, substitute the values for $P(3,4,0)$. We already know $r=5$ m.
    $$ \vec{E} = \frac{(8.99 \times 10^9)(2 \times 10^{-9})}{5^3} (3\hat{i} + 4\hat{j} + 0\hat{k}) $$
    $$ \vec{E} = \frac{17.98}{125} (3\hat{i} + 4\hat{j}) \approx 0.144 (3\hat{i} + 4\hat{j}) $$
    $$ \vec{E} \approx (0.43 \hat{i} + 0.58 \hat{j}) \text{ N/C} $$

**Reflection:** Part (a) was a direct application of a formula. Part (b) showed the fundamental connection: by describing the potential "landscape" as a function of coordinates, we could calculate its slope at any point to find the vector field. This process of taking the gradient is the mathematical tool for "finding the slope of the hill."

## Diagrams
A 2D slice of the field and potential for a positive point charge $Q$ at the origin.

```text
        ^ y
        |
    . . | . .
  .     |     .
. | | | | | | | .   <-- Equipotential lines (circles, constant V)
. | | | ^ | | | .
. | | / | \ | | .
--+---/---+---\---+--> x
. | /   Q   \ | .   <-- Electric field lines (arrows, vector E)
. |/    |    \| .       (point radially outward)
. /     |     \ .
  .     |     .
    . . | . .

```
Note that the electric field lines (`->`) are always perpendicular to the equipotential lines (`...`). The field points away from the positive charge, from higher potential (closer to $Q$) to lower potential (further from $Q$).

## Memory technique — remember this forever
1.  **The Mnemonic:** "The **V**oltage is the **h**eight of the **e**lectric **h**ill. The **E**lectric field is the **s**teepness of the **s**lope." The field vector $\vec{E}$ points straight downhill. The minus sign in $\vec{E} = -\nabla V$ is the mathematical way of saying "downhill".
2.  **Must-Know Formulas:** Overlearn these until they are reflexes.
    *   Potential of a point charge (relative to $\infty$):
        $$ V = \frac{kQ}{r} $$
    *   The fundamental relationships:
        $$ \vec{E} = -\nabla V \quad \iff \quad \Delta V = -\int \vec{E} \cdot d\vec{l} $$
3.  **Spaced Repetition Schedule:** Review your derivations and solve one new problem on this topic at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway:** If you forget everything, rebuild it from the definition of work.
    *   Work to move charge $q$ against force $\vec{F}$ is $W_{ext} = \int \vec{F}_{ext} \cdot d\vec{l}$.
    *   To move it without acceleration, $\vec{F}_{ext} = -\vec{F}_{elec} = -q\vec{E}$.
    *   Potential Energy change is this work: $\Delta U_E = W_{ext} = -\int q\vec{E} \cdot d\vec{l}$.
    *   Potential difference is potential energy change per unit charge: $\Delta V = \frac{\Delta U_E}{q} = -\int \vec{E} \cdot d\vec{l}$. This is the rock-solid integral form. The differential form $\vec{E} = -\nabla V$ is its direct consequence.

## Common mistakes
1.  **Sign Errors:** Forgetting the minus sign in $\vec{E} = -\nabla V$. This is the most common error and will cause your field to point uphill, from low to high potential, which is non-physical for positive charges.
2.  **Confusing V and U:** Mixing up potential $V$ (in Volts) and potential energy $U_E$ (in Joules). Remember, $U_E = qV$. Potential is a property of the field itself; potential energy is a property of a charge placed *in* that field.
3.  **Scalar vs. Vector Math:** Adding potentials for multiple charges is simple scalar addition. Adding fields requires vector addition. Do not add the magnitudes of the fields directly unless they are collinear.
4.  **Incorrect Dependencies:** Remembering that Potential $V \propto 1/r$ while the Electric Field magnitude $E \propto 1/r^2$ for a point charge. It's easy to mix these up under pressure.

## Self-check
1.  Two point charges, $q_1 = +4 \text{ nC}$ at $x = -1 \text{ m}$ and $q_2 = -2 \text{ nC}$ at $x = +1 \text{ m}$, are on the x-axis. What is the total electric potential at the point $y = +2 \text{ m}$ on the y-axis?
2.  The electric potential in a region of space is given by the function $V(x,y) = 3x^2y - yz^3$. What is the electric field vector $\vec{E}$ at the point $(1, 2, 1)$?
3.  An electric field is described by $\vec{E} = (2xy)\hat{i} + (x^2)\hat{j}$. Calculate the potential difference $V_B - V_A$ between point $A=(0,0)$ and point $B=(2,1)$. Does the result depend on the path taken? Why?