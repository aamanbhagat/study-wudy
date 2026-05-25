## What it is
A vector field $\vec{F}$ is **conservative** if it can be expressed as the gradient of some scalar function $f$, called the **potential function**. This means $\vec{F} = \nabla f$. A direct and powerful consequence is that the line integral of a conservative field depends only on the start and end points of the path, not the path itself.

## Why it matters
This concept is fundamental in physics and engineering. Gravitational and electrostatic fields are conservative; their potential functions are gravitational potential energy and electric potential, respectively. In aerospace, this simplifies calculating the work required to move a spacecraft between two points in a gravitational field. In machine learning, the process of gradient descent involves moving along the negative of a gradient field (of a loss function) to find a minimum—the loss function acts as a potential function.

## When to study it
You must be fluent with the following prerequisites. If you are not, master them first.
1.  **Partial Derivatives:** You must be able to compute $\frac{\partial f}{\partial x}$, $\frac{\partial f}{\partial y}$, etc. for multivariable functions.
2.  **The Gradient ($\nabla$):** You must understand that $\nabla f$ is a vector field pointing in the direction of the steepest ascent of the function $f$.
3.  **Line Integrals of Vector Fields:** You must be able to set up and compute $\int_C \vec{F} \cdot d\vec{r}$.

## How to study it (step by step)
1.  **Revisit the Gradient.** Write down the definition of the gradient for a function $f(x,y,z)$: $\nabla f = \langle \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}, \frac{\partial f}{\partial z} \rangle$. Internalize that this operator takes a scalar field and produces a vector field.
2.  **Define Conservativeness.** Write the core definition: "$\vec{F}$ is conservative if there exists a scalar function $f$ such that $\vec{F} = \nabla f$." Ponder the implication: every vector in the field $\vec{F}$ is just a "steepest ascent" vector from some underlying scalar landscape $f$.
3.  **Learn the Test.** For a 2D field $\vec{F} = \langle P(x,y), Q(x,y) \rangle$, the test for conservativeness is checking if $\frac{\partial P}{\partial y} = \frac{\partial Q}{\partial x}$. For a 3D field $\vec{F} = \langle P, Q, R \rangle$, the test is checking if the curl is zero: $\nabla \times \vec{F} = \vec{0}$. Work through the derivation of the 2D test from first principles (see Key Ideas).
4.  **Practice Finding the Potential Function.** Given a conservative field $\vec{F} = \langle P, Q \rangle$, find $f$ by partial integration.
    *   Start with $\frac{\partial f}{\partial x} = P(x,y)$. Integrate with respect to $x$: $f(x,y) = \int P(x,y) \, dx + g(y)$. Note the "constant" of integration is a function of $y$.
    *   Differentiate this result with respect to $y$: $\frac{\partial f}{\partial y} = \frac{\partial}{\partial y} \left( \int P(x,y) \, dx \right) + g'(y)$.
    *   Set this equal to $Q(x,y)$ and solve for $g'(y)$, then integrate to find $g(y)$.
5.  **Master the Fundamental Theorem.** The Fundamental Theorem of Line Integrals states that if $\vec{F} = \nabla f$, then $\int_C \vec{F} \cdot d\vec{r} = f(\vec{r}(b)) - f(\vec{r}(a))$, where the path $C$ starts at $\vec{r}(a)$ and ends at $\vec{r}(b)$. Solve two problems using this theorem to see how it bypasses path parameterization entirely.

## Key ideas, with intuition
1.  **A conservative field is a "slope map" of a landscape.** Imagine a mountain. The potential function $f(x,y)$ is the altitude at each point $(x,y)$. The gradient field, $\nabla f$, is a vector field where each vector points in the direction of the steepest uphill slope. A conservative vector field is nothing more than one of these "slope maps" derived from an underlying landscape (the potential function).
2.  **Path independence is the payoff.** The total work done against a conservative force (like gravity) to move an object from point A to point B is just the change in potential energy, $f(B) - f(A)$. It doesn't matter if you took a direct path or a long, winding one. This is why line integrals through conservative fields are so easy to compute once you have the potential function.
    $$ \int_C \vec{F} \cdot d\vec{r} = \int_C \nabla f \cdot d\vec{r} = f(\text{end}) - f(\text{start}) $$
3.  **The test for conservativeness comes from equality of mixed partials.** This is not magic. If a field $\vec{F} = \langle P, Q \rangle$ is truly the gradient of some $f$, then $P = \frac{\partial f}{\partial x}$ and $Q = \frac{\partial f}{\partial y}$. Taking another partial derivative:
    $$ \frac{\partial P}{\partial y} = \frac{\partial}{\partial y} \left( \frac{\partial f}{\partial x} \right) = \frac{\partial^2 f}{\partial y \partial x} $$
    $$ \frac{\partial Q}{\partial x} = \frac{\partial}{\partial x} \left( \frac{\partial f}{\partial y} \right) = \frac{\partial^2 f}{\partial x \partial y} $$
    By Clairaut's Theorem, if the second partial derivatives are continuous, these are equal. The test $\frac{\partial P}{\partial y} = \frac{\partial Q}{\partial x}$ is a necessary condition for a potential function to exist.

## Worked example
**Problem:** Determine if the vector field $\vec{F}(x,y) = \langle y^2 - 2x, 2xy + 3 \rangle$ is conservative. If it is, find a potential function $f(x,y)$.

**Step 1: Test for conservativeness.**
Identify the components of $\vec{F} = \langle P, Q \rangle$.
$P(x,y) = y^2 - 2x$
$Q(x,y) = 2xy + 3$

Compute the mixed partial derivatives.
$\frac{\partial P}{\partial y} = \frac{\partial}{\partial y}(y^2 - 2x) = 2y$
$\frac{\partial Q}{\partial x} = \frac{\partial}{\partial x}(2xy + 3) = 2y$

Since $\frac{\partial P}{\partial y} = \frac{\partial Q}{\partial x}$, the vector field is conservative.

**Step 2: Find the potential function $f(x,y)$.**
We know $\vec{F} = \nabla f$, so $\frac{\partial f}{\partial x} = P$ and $\frac{\partial f}{\partial y} = Q$.
Start by integrating $P$ with respect to $x$.
$$ f(x,y) = \int P(x,y) \, dx = \int (y^2 - 2x) \, dx = xy^2 - x^2 + g(y) $$
The constant of integration is a function of $y$, since $y$ is treated as a constant during partial integration with respect to $x$.

**Step 3: Use the second component to find $g(y)$.**
Differentiate our expression for $f(x,y)$ with respect to $y$.
$$ \frac{\partial f}{\partial y} = \frac{\partial}{\partial y}(xy^2 - x^2 + g(y)) = 2xy - 0 + g'(y) $$
We know this must equal $Q(x,y)$.
$$ 2xy + g'(y) = Q(x,y) = 2xy + 3 $$
Comparing the two sides, we see that $g'(y) = 3$.

**Step 4: Solve for $g(y)$ and write the final potential function.**
Integrate $g'(y)$ to find $g(y)$.
$$ g(y) = \int 3 \, dy = 3y + C $$
Substitute this back into our expression for $f(x,y)$.
$$ f(x,y) = xy^2 - x^2 + 3y + C $$
The family of potential functions is $f(x,y) = xy^2 - x^2 + 3y + C$.

**Reflection:** The test in Step 1 confirmed that a potential function must exist. The partial integration in Step 2 reconstructed $f$ up to a function of $y$. Step 3 used the remaining information from $\vec{F}$ (the $Q$ component) to determine this unknown function $g(y)$.

## Diagrams
This diagram illustrates path independence, a key property of conservative fields. The work done (line integral) moving from point A to point B is the same along path $C_1$ and path $C_2$.

```text
      y
      ^
      |
      |
      |     C2
      |   /-----\
      |  /       \
      *B          \
      | \          |
      |  \         |
      |   C1 ....../
      |  /
      *A
      |
      +-------------------> x
```
For a conservative field $\vec{F}$, $\int_{C_1} \vec{F} \cdot d\vec{r} = \int_{C_2} \vec{F} \cdot d\vec{r}$. This also implies that the integral over any closed loop (e.g., from A to B along $C_2$ and back to A along $-C_1$) is zero.

## Memory technique — remember this forever
1.  **The Mnemonic:** Think of a **"Conservative Hiker"**. This hiker wants to conserve energy. The mountain they are on is the potential function, $f$. The force of gravity they feel at any point is the vector field, $\vec{F}$. The total energy they expend climbing from base camp (A) to the summit (B) depends *only* on the change in altitude, $f(B) - f(A)$, not the specific zig-zag path they took. A conservative field means the "work" is path-independent.

2.  **Must-Know Formulas:** Overlearn these exactly.
    *   Definition: $\vec{F}$ is conservative $\iff \vec{F} = \nabla f$
    *   2D Test: For $\vec{F} = \langle P, Q \rangle$, test if $\frac{\partial P}{\partial y} = \frac{\partial Q}{\partial x}$.
    *   The Payoff: $\int_C \nabla f \cdot d\vec{r} = f(\text{end}) - f(\text{start})$

3.  **Spaced Repetition Schedule:**
    *   Review these ideas and solve one problem tomorrow (1 day).
    *   Review and solve another problem in 3 days.
    *   Review in 7 days.
    *   Review in 16 days.
    *   Final review in 35 days.

4.  **First Principles Pathway:** If you forget the 2D test, derive it. Assume $\vec{F} = \langle P, Q \rangle$ is conservative. By definition, there exists an $f$ such that $P = \frac{\partial f}{\partial x}$ and $Q = \frac{\partial f}{\partial y}$. Now, compute $\frac{\partial P}{\partial y}$ and $\frac{\partial Q}{\partial x}$. You will get $\frac{\partial^2 f}{\partial y \partial x}$ and $\frac{\partial^2 f}{\partial x \partial y}$. By Clairaut's Theorem, these are equal. The test is unavoidable.

## Common mistakes
1.  **Forgetting the function of integration.** When integrating $P(x,y)$ with respect to $x$, students write `+ C` instead of the correct `+ g(y)`. The "constant" of integration can depend on any variables held constant during the integration.
2.  **Assuming a field is conservative without testing.** Always perform the test ($\frac{\partial P}{\partial y} = \frac{\partial Q}{\partial x}$ or $\nabla \times \vec{F} = \vec{0}$) before you waste time trying to find a potential function that might not exist.
3.  **Mixing up the partial derivatives in the test.** Students often calculate $\frac{\partial P}{\partial x}$ and $\frac{\partial Q}{\partial y}$ by mistake. Remember: you differentiate each component with respect to the *other* variable.

## Self-check
1.  Is the vector field $\vec{F}(x,y) = \langle e^x \sin y, e^x \cos y \rangle$ conservative?
2.  Find the potential function $f(x,y,z)$ for the conservative field $\vec{F}(x,y,z) = \langle yz, xz, xy \rangle$.
3.  Let $\vec{F}(x,y) = \langle 2xe^{y}, x^2e^{y} \rangle$. Calculate the work done, $\int_C \vec{F} \cdot d\vec{r}$, along the curve $C$ parameterized by $\vec{r}(t) = \langle t \sin(\pi t), t^2-1 \rangle$ for $t \in [1, 2]$. Do not compute the line integral directly.