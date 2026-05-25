## What it is
The one-dimensional heat equation is a partial differential equation (PDE) that describes how temperature, $u(x,t)$, is distributed and evolves over time in a one-dimensional object, like a thin rod. It states that the rate of change of temperature at a point is proportional to the curvature of the temperature distribution at that same point. This type of PDE, where the highest time derivative is of first order and the highest spatial derivative is of second order, is classified as parabolic.

## Why it matters
The heat equation is the canonical example of a parabolic PDE and models diffusion processes, which are ubiquitous. In aerospace, it's fundamental for modeling thermal shielding on re-entry vehicles and heat dissipation in rocket nozzles and electronics. In computer science and machine learning, analogous diffusion models are used in image processing (e.g., noise reduction) and in the mathematical underpinnings of stochastic processes like Brownian motion, which inform financial modeling and random walks.

## When to study it
You must be comfortable with multivariable calculus, specifically partial derivatives. You should also have a solid grasp of vector calculus concepts like the divergence theorem, even though we will use its 1D analogue here. A first course in ordinary differential equations (ODEs) is essential for context, and a basic understanding of conservation laws from introductory physics (e.g., conservation of energy) is required for the derivation.

## How to study it (step by step)
1.  **State the Physical Principles:** Write down the two laws we will use: (1) Conservation of Energy and (2) Fourier's Law of Heat Conduction. State them in words first, then with symbols.
2.  **Isolate a Control Volume:** Consider an arbitrary, small segment of a one-dimensional rod from position $x$ to $x + \Delta x$. We will analyze the heat flowing in and out of this segment.
3.  **Formulate the Energy Balance:** Write the conservation of energy for this segment. The rate of change of heat energy inside the segment must equal the rate of heat flowing in at $x$ minus the rate of heat flowing out at $x+\Delta x$.
4.  **Connect Heat Energy to Temperature:** Use the definition of specific heat capacity and density to relate the total heat energy in the segment to the temperature function $u(x,t)$. This will introduce the time derivative $\frac{\partial u}{\partial t}$.
5.  **Apply Fourier's Law:** Substitute Fourier's Law into the energy balance equation. This will replace the heat flux terms with expressions involving the spatial derivative of temperature, $\frac{\partial u}{\partial x}$.
6.  **Take the Limit:** Divide the entire equation by the volume of the segment ($\Delta x \cdot A$, where A is cross-sectional area) and take the limit as $\Delta x \to 0$. This will convert the difference in fluxes into a second spatial derivative, $\frac{\partial^2 u}{\partial x^2}$, yielding the final PDE.

## Key ideas, with intuition
1.  **Conservation of Energy is the Engine:** The entire derivation is an accounting exercise. The core statement is:
    $$
    \frac{dE}{dt} = \text{Flux In} - \text{Flux Out} + \text{Sources}
    $$
    For a small segment of a rod, this means the change in internal heat energy over time depends only on what flows across its boundaries (and any internal heat generation, which we'll ignore for the basic derivation).

2.  **Fourier's Law Provides the Physics:** This is the crucial *constitutive law* that connects the abstract concept of heat flux to the measurable quantity of temperature. It says heat flows from hot to cold, and the rate of flow is proportional to how steep the temperature gradient is. The negative sign is critical.
    $$
    q(x,t) = -k \frac{\partial u}{\partial x}(x,t)
    $$
    Here, $q$ is the heat flux (energy per unit area per unit time) and $k$ is the thermal conductivity of the material. A large negative gradient (temperature dropping sharply) means a large positive flux (heat flows strongly to the right).

3.  **The Second Derivative Measures "Net Inflow":** Why does $\frac{\partial^2 u}{\partial x^2}$ appear? Think about its meaning. If the temperature profile $u(x)$ is concave up ($\frac{\partial^2 u}{\partial x^2} > 0$), it looks like a "cup". The point at the bottom of the cup is colder than its neighbors. Therefore, heat will flow *into* this point from both sides, causing its temperature to rise ($\frac{\partial u}{\partial t} > 0$). Conversely, if it's concave down ($\frac{\partial^2 u}{\partial x^2} < 0$), the point is hotter than its neighbors and heat flows *out*, causing its temperature to fall. The second derivative is a local measure of how a point's temperature compares to its neighbors, which dictates net heat flow.

## Worked example
Let's derive the 1D heat equation for a uniform rod with cross-sectional area $A$, density $\rho$, specific heat capacity $c$, and thermal conductivity $k$. Assume no internal heat sources.

**Step 1: Set up the control volume and physical laws.**
Consider a segment of the rod from $x$ to $x + \Delta x$.
-   **Conservation of Energy:** The rate of change of heat energy $E$ in this segment is the heat flow rate in at face $x$ minus the heat flow rate out at face $x + \Delta x$.
    $$
    \frac{dE}{dt} = A \cdot q(x,t) - A \cdot q(x+\Delta x, t)
    $$
-   **Fourier's Law:** Heat flux $q$ is given by $q = -k \frac{\partial u}{\partial x}$.

**Step 2: Relate heat energy $E$ to temperature $u(x,t)$.**
The mass of the segment is $m = \rho \cdot (A \Delta x)$. The heat energy in the segment is $E \approx m \cdot c \cdot u(x,t) = (\rho A \Delta x) c u(x,t)$.
The rate of change of heat energy is therefore:
$$
\frac{dE}{dt} \approx \frac{\partial}{\partial t} [(\rho A c \Delta x) u(x,t)] = \rho A c \Delta x \frac{\partial u}{\partial t}
$$
We use an approximation because $u$ varies slightly over $\Delta x$, but this becomes exact as $\Delta x \to 0$.

**Step 3: Combine the equations.**
Substitute the expressions for $\frac{dE}{dt}$ and $q$ into the energy balance equation:
$$
\rho A c \Delta x \frac{\partial u}{\partial t} = A \left( -k \frac{\partial u}{\partial x}\bigg|_{x} \right) - A \left( -k \frac{\partial u}{\partial x}\bigg|_{x+\Delta x} \right)
$$

**Step 4: Simplify and take the limit.**
The cross-sectional area $A$ cancels out. Assuming $\rho, c, k$ are constants:
$$
\rho c \Delta x \frac{\partial u}{\partial t} = k \left( \frac{\partial u}{\partial x}\bigg|_{x+\Delta x} - \frac{\partial u}{\partial x}\bigg|_{x} \right)
$$
Divide by $\Delta x$:
$$
\rho c \frac{\partial u}{\partial t} = k \frac{ \frac{\partial u}{\partial x}\bigg|_{x+\Delta x} - \frac{\partial u}{\partial x}\bigg|_{x} }{\Delta x}
$$
Now, take the limit as $\Delta x \to 0$. The right-hand side is the definition of the partial derivative of $\frac{\partial u}{\partial x}$ with respect to $x$:
$$
\lim_{\Delta x \to 0} \frac{ \frac{\partial u}{\partial x}\bigg|_{x+\Delta x} - \frac{\partial u}{\partial x}\bigg|_{x} }{\Delta x} = \frac{\partial}{\partial x}\left(\frac{\partial u}{\partial x}\right) = \frac{\partial^2 u}{\partial x^2}
$$
This gives us:
$$
\rho c \frac{\partial u}{\partial t} = k \frac{\partial^2 u}{\partial x^2}
$$

**Step 5: Final Form.**
Rearrange to get the standard form of the heat equation:
$$
\frac{\partial u}{\partial t} = \alpha \frac{\partial^2 u}{\partial x^2}
$$
where $\alpha = \frac{k}{\rho c}$ is the thermal diffusivity.

**Reflection:** Each step translated a physical concept into a mathematical expression. Step 1 was the high-level physical law. Step 2 related the abstract quantity (energy) to our variable of interest (temperature). Step 3 substituted the specific physical model (Fourier's Law). Step 4 used the definition of the derivative from calculus to turn a balance equation over a finite volume into a differential equation at a point.

## Diagrams
A 1D rod segment showing heat flux.

```text
      Heat Energy E(t)
      Temperature u(x,t)
      <---------------------->
      |                      |
      |      Segment of      |
----->|         rod          |----->
q(x,t)|                      |q(x+Δx,t)
      |    (volume A*Δx)     |
      |                      |
      <---------------------->
      x                   x+Δx
      <----------L----------> (Total rod length)
```

## Memory technique — remember this forever
1.  **The Story:** "The *change in heat over time* at a spot is caused by the *imbalance of flow* at that spot." The imbalance, or "curviness" of the temperature graph, tells you if more heat is entering than leaving. A "cupped" shape ($\frac{\partial^2 u}{\partial x^2} > 0$) holds heat, so temperature rises. A "domed" shape ($\frac{\partial^2 u}{\partial x^2} < 0$) sheds heat, so temperature falls.

2.  **Must-Know Formulas:**
    -   **The 1D Heat Equation:** $\displaystyle \frac{\partial u}{\partial t} = \alpha \frac{\partial^2 u}{\partial x^2}$
    -   **Fourier's Law:** $\displaystyle q = -k \frac{\partial u}{\partial x}$
    -   **Thermal Diffusivity:** $\displaystyle \alpha = \frac{k}{\rho c}$

3.  **Spaced Repetition Schedule:**
    -   Review this derivation in 24 hours.
    -   Then in 3 days.
    -   Then in 7 days.
    -   Then in 16 days.
    -   Then in 35 days.
    Each time, try to re-derive it from a blank sheet of paper.

4.  **First Principles Pathway:** If you forget the final equation, remember the core idea: **Rate of Change of Energy = Net Flux**.
    -   Write this for a segment $[x, x+\Delta x]$: $\frac{dE}{dt} = \text{Flux}(x) - \text{Flux}(x+\Delta x)$.
    -   Substitute the two physical definitions: $E \propto u$ and $\text{Flux} \propto -\frac{\partial u}{\partial x}$.
    -   The rest is just taking the limit $\Delta x \to 0$. You can always rebuild it from there.

## Common mistakes
1.  **Sign Error in Fourier's Law:** Forgetting the negative sign in $q = -k \frac{\partial u}{\partial x}$. This is physically incorrect, implying heat flows "uphill" from cold to hot regions. Always check that your flux direction makes physical sense.
2.  **Confusing Temperature and Heat:** Treating temperature $u$ and heat energy $E$ as interchangeable. They are related by $E \approx (\rho A c \Delta x) u$, but not identical. The time derivative applies to $E$, which then translates to a time derivative of $u$ via the constants.
3.  **Errors in the Limit:** When dividing by $\Delta x$, students sometimes mishandle the term $\frac{q(x+\Delta x,t) - q(x,t)}{\Delta x}$. Remember this is the definition of the derivative of $q$ with respect to $x$. When you substitute Fourier's law, this naturally becomes the second derivative of $u$.
4.  **Assuming Constants:** Implicitly assuming that density $\rho$, specific heat $c$, or conductivity $k$ are constant. If they depend on $x$, they cannot be pulled out of the derivative. The equation becomes $\rho(x) c(x) \frac{\partial u}{\partial t} = \frac{\partial}{\partial x}\left(k(x) \frac{\partial u}{\partial x}\right)$.

## Self-check
1.  Redo the derivation, but now assume the rod is not uniform. The thermal conductivity $k$ is a function of position, $k(x)$. How does the final equation change?
2.  Now, assume there is an internal heat source that generates heat at a rate of $S(x,t)$ units of energy per unit volume per unit time. Modify the initial energy balance equation to include this term and derive the resulting "inhomogeneous" heat equation.
3.  Explain in one sentence the physical meaning of a situation where $\frac{\partial u}{\partial t} = 0$ but $\frac{\partial^2 u}{\partial x^2} \neq 0$. Why is this impossible for the heat equation as we've derived it? What does this imply about the steady-state temperature distribution?