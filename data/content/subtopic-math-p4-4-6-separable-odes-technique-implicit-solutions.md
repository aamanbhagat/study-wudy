## What it is
A separable ordinary differential equation (ODE) is a first-order ODE that can be algebraically manipulated into a form where all terms involving the dependent variable $y$ and its differential $dy$ are on one side of the equation, and all terms involving the independent variable $x$ and its differential $dx$ are on the other. This algebraic "separation" allows for direct integration of both sides to find a solution.

## Why it matters
This is the simplest non-trivial ODE technique, but it is foundational. It appears in models for population growth (the logistic equation), radioactive decay, Newton's law of cooling, and chemical reaction kinetics. In aerospace, the derivation of the Tsiolkovsky rocket equation, which governs the change in velocity of a rocket, begins with a separable ODE relating mass, exhaust velocity, and rocket velocity.

## When to study it
You must have mastered single-variable calculus. Specifically, you need fluency in differentiation (especially the chain rule) and integration, including techniques like u-substitution and integration by parts. You should also understand the basic definition of a differential equation as an equation involving a function and its derivatives.

## How to study it (step by step)
1.  **Recognize the Form:** Drill yourself on identifying if an equation of the form $\frac{dy}{dx} = F(x, y)$ can be factored into the separable form $\frac{dy}{dx} = g(x)h(y)$. Practice with a dozen examples until recognition is instant.
2.  **Master the Separation:** Take the form $\frac{dy}{dx} = g(x)h(y)$ and perform the core step: separating the variables. This yields $\frac{1}{h(y)}dy = g(x)dx$. Understand that this is a formal manipulation that is justified by the chain rule.
3.  **Integrate Both Sides:** Apply the integral operator to both sides: $\int \frac{1}{h(y)}dy = \int g(x)dx$. This is the step where your calculus skills are tested. Execute the integrations.
4.  **Handle the Constant:** Each indefinite integral produces a constant of integration ($C_1$, $C_2$). Combine them into a single constant, $C = C_2 - C_1$, on one side of the equation. This is a crucial simplification.
5.  **Solve for an Explicit vs. Implicit Solution:** If possible, algebraically solve the resulting equation for $y$ to get an explicit solution, $y = f(x, C)$. Often, this is difficult or impossible. In such cases, leave the solution as an implicit relation, $F(x, y, C) = 0$. Understand that an implicit solution defines the function $y(x)$ without giving an explicit formula for it.
6.  **Check for Lost Solutions:** When you divided by $h(y)$, you assumed $h(y) \neq 0$. Check if any constant value $y_0$ for which $h(y_0)=0$ is also a solution to the original ODE. These are called singular or equilibrium solutions and are missed by the separation process.

## Key ideas, with intuition
1.  **Separation is Undoing the Chain Rule:** The trick of treating $\frac{dy}{dx}$ like a fraction and multiplying by $dx$ feels like a convenient abuse of notation. Here is why it works. Start with the separated form:
    $$ \frac{1}{h(y)} \frac{dy}{dx} = g(x) $$
    Now, integrate both sides with respect to $x$:
    $$ \int \frac{1}{h(y(x))} \frac{dy}{dx} dx = \int g(x) dx $$
    Look at the left side. By the chain rule, if we make the substitution $u = y(x)$, then $du = \frac{dy}{dx}dx$. The integral becomes $\int \frac{1}{h(u)}du$. So, the procedure is rigorously justified by u-substitution. You are simply integrating one function with respect to $y$ and the other with respect to $x$.

2.  **An Implicit Solution Defines a Curve:** An explicit solution $y=f(x)$ passes the vertical line test; for each $x$, there is one $y$. An implicit solution $F(x, y) = C$ defines a curve in the $xy$-plane. For example, $x^2 + y^2 = 25$ is an implicit solution. It defines a circle, which is not a single function. However, pieces of the circle, like $y = \sqrt{25-x^2}$, are explicit functions that satisfy the underlying ODE. Leaving a solution in implicit form is not a failure; it is often the most natural and complete representation.

3.  **The Constant of Integration Defines a Family of Solutions:** The general solution to a first-order ODE contains one arbitrary constant, $C$. This constant isn't just a number; it represents an entire family of solution curves. Each value of $C$ picks out one specific curve from this family. An initial condition (e.g., $y(x_0) = y_0$) is what you use to solve for a specific value of $C$ and find the unique solution curve that passes through the point $(x_0, y_0)$.

## Worked example
Solve the initial value problem: $\frac{dy}{dx} = -\frac{x}{y}$, with $y(4) = -3$.

**Step 1: Separate the variables.**
The equation is already in a form that is easy to separate. We identify $g(x) = -x$ and $h(y) = 1/y$. Multiply by $y$ and $dx$ to separate the variables.
$$ y \, dy = -x \, dx $$
*Reflection: This is the key algebraic manipulation that defines the method. We have isolated all $y$ terms on the left and all $x$ terms on the right.*

**Step 2: Integrate both sides.**
Apply the integral operator to both sides of the separated equation.
$$ \int y \, dy = \int -x \, dx $$
Performing the integration gives:
$$ \frac{1}{2}y^2 + C_1 = -\frac{1}{2}x^2 + C_2 $$
*Reflection: This step transforms the differential equation into an algebraic equation. The core calculus skill is applied here.*

**Step 3: Combine constants and form the general implicit solution.**
Group the constants on one side. Let $C = C_2 - C_1$. It is also convenient to multiply the entire equation by 2 to clear the fractions.
$$ y^2 = -x^2 + 2C $$
Let's define a new constant $K = 2C$ for simplicity. This is still just an arbitrary constant.
$$ x^2 + y^2 = K $$
This is the general solution in implicit form. It represents a family of circles centered at the origin with radius $\sqrt{K}$.
*Reflection: We now have a relationship between $x$ and $y$ that satisfies the ODE for any valid constant $K$. This is the "family of solutions."*

**Step 4: Apply the initial condition to find the particular solution.**
We are given $y(4) = -3$. Substitute $x=4$ and $y=-3$ into the general solution to find $K$.
$$ (4)^2 + (-3)^2 = K $$
$$ 16 + 9 = K $$
$$ K = 25 $$
The particular solution is the implicit equation for a circle of radius 5:
$$ x^2 + y^2 = 25 $$
*Reflection: The initial condition pins down a single curve from the infinite family of possible solutions. Note that an explicit solution $y = -\sqrt{25-x^2}$ would also be correct, with the negative sign chosen to satisfy $y(4)=-3$. However, the implicit form is often preferred for its simplicity and geometric clarity.*

## Diagrams
Here is a slope field for the ODE $\frac{dy}{dx} = -\frac{x}{y}$. At any point $(x, y)$, the slope of the solution curve is given by $-\frac{x}{y}$. The solution curves (circles) must be tangent to these slope lines at every point.

```text
       y
       ^
       |
     3 + . . . . | | | | . . . .
       |        / / \ \
     2 + . .-- / /   \ \ --. .
       |    / /       \ \
     1 + --- / /         \ \ ---
       |  | |             | |
- - - -|-|-----------------|-| - - > x
      -4 -3 -2 -1  | |  1  2  3  4
       |  | |         \ \ | |
    -1 + --- \ \         / / ---
       |      \ \       / /
    -2 + . .-- \ \   / / --. .
       |        \ \ / /
    -3 + . . . . | | | | . . . .
       |
```
*Description:* The diagram shows the xy-plane. At various points, short line segments indicate the slope of the solution. For example, at $(1, 2)$, the slope is $-1/2$. At $(2, 1)$, the slope is $-2$. Along the y-axis ($x=0$), the slopes are horizontal. Along the x-axis ($y=0$), the slopes are vertical. Following these slope lines, you can trace out circles centered at the origin, which are the solution curves $x^2 + y^2 = K$.

## Memory technique — remember this forever
1.  **Mnemonic:** "**S.I.C.**"
    *   **S**eparate: Get all $y$'s and $dy$ on one side, all $x$'s and $dx$ on the other.
    *   **I**ntegrate: Integrate both sides. This is the calculus core.
    *   **C**onstant: Don't forget the constant of integration, $+C$. Combine them into one. If given an initial value, use it to find $C$.

2.  **Must-Memorize Formulas:**
    The problem form:
    $$ \frac{dy}{dx} = g(x)h(y) $$
    The solved form (before integration):
    $$ \int \frac{dy}{h(y)} = \int g(x)dx $$

3.  **Spaced Repetition Schedule:**
    Review this entire mini-lesson and solve one new problem at these intervals:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:**
    If you forget the trick, remember the justification.
    Start with $\frac{dy}{dx} = g(x)h(y)$.
    Rewrite it as $\frac{1}{h(y)}\frac{dy}{dx} = g(x)$.
    Recognize this is a statement about functions of $x$, since $y$ is a function of $x$.
    Integrate both sides *with respect to $x$*: $\int \frac{1}{h(y(x))}\frac{dy}{dx}dx = \int g(x)dx$.
    The left side is perfectly set up for a u-substitution with $u=y(x)$, which transforms it into $\int \frac{1}{h(y)}dy$. You have just re-derived the method.

## Common mistakes
1.  **Forgetting the Constant of Integration:** This is the most common error. Omitting $+C$ means you find only one solution (the one passing through the origin, where $C=0$), not the entire family of solutions.
2.  **Incorrectly Handling Constants:** Writing $\ln|y| = x^2 + C$ and then exponentiating to get $y = e^{x^2} + e^C$ is wrong. The correct step is $y = e^{x^2+C} = e^{x^2}e^C$. Since $e^C$ is just another arbitrary positive constant, we rename it: $y = Ae^{x^2}$, where $A = e^C$.
3.  **Dividing by Zero / Missing Solutions:** When you separate $\frac{dy}{dx} = y^2$ to $\frac{dy}{y^2}=dx$, you assume $y \neq 0$. You must separately check if $y=0$ is a solution. Plug it in: $\frac{d(0)}{dx} = 0$ and $(0)^2=0$. Since $0=0$, $y(x)=0$ is a valid, constant solution that was lost during separation.
4.  **Algebraic Errors in Isolation:** Students often make simple mistakes when trying to solve for $y$ explicitly at the end. If the implicit solution is clean and the explicit solution is messy (e.g., requires a quadratic formula), it is often better to leave the solution in implicit form.

## Self-check
1.  Find the general solution to $\frac{dy}{dt} = k(1-y)$.
2.  Solve the initial value problem $y' = y \cos(x)$ with $y(0) = 1$. Does your solution make sense at $x=\pi/2$?
3.  A spherical raindrop evaporates at a rate proportional to its surface area. Find an expression for the radius of the raindrop as a function of time. (Hint: The volume is $V = \frac{4}{3}\pi r^3$ and the surface area is $A=4\pi r^2$. The rate of change of volume with respect to time is $\frac{dV}{dt}$.)