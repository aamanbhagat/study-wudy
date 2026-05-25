## What it is
The integrating factor method is a technique for solving first-order linear ordinary differential equations (ODEs). It works by multiplying the entire equation by a specific function, the "integrating factor," which transforms one side of the equation into a perfect derivative. This allows for a direct integration to find the solution.

## Why it matters
This method is fundamental for modeling systems where the rate of change of a quantity depends linearly on the quantity itself and some external forcing function. In physics, this appears in RC circuits (voltage decay), radioactive decay with a source, and motion with viscous drag. In aerospace, it models simple rocket trajectories where mass is constant and drag is proportional to velocity.

## When to study it
You must have mastered single-variable calculus, specifically the product rule for differentiation and techniques of integration (u-substitution, integration by parts). You should also be comfortable with solving basic separable ODEs, as the derivation of the integrating factor itself relies on this. If you cannot solve $\frac{dy}{dx} = ky$ from first principles, review that first.

## How to study it (step by step)
1.  **Standard Form:** Take any first-order linear ODE and practice rearranging it into the standard form: $y' + P(x)y = Q(x)$. This is a non-negotiable first step. Drill this until it's automatic.
2.  **Derive the Factor:** Work through the derivation of the integrating factor $I(x)$ from first principles. Start with the standard form, multiply by an unknown $I(x)$, and force the left-hand side to be the result of the product rule, $(I(x)y)'$. Solve the resulting separable ODE for $I(x)$. Do not just memorize the formula; derive it.
3.  **Solve a Simple Case:** Solve $y' + ay = b$ where $a, b$ are constants, using the full integrating factor method. This builds confidence and verifies the mechanics.
4.  **Solve a Variable Coefficient Case:** Solve an ODE where $P(x)$ is not a constant, such as $y' + \frac{1}{x}y = x^2$. Pay close attention to how the variable coefficient changes the integrating factor.
5.  **Initial Value Problems:** Practice solving problems with a given initial condition, like $y(x_0) = y_0$. This reinforces how to solve for the constant of integration, yielding a particular solution instead of a general one.

## Key ideas, with intuition
1.  **The Goal: Reverse the Product Rule.**
    The standard form is $y' + P(x)y = Q(x)$. The left side, $y' + P(x)y$, looks a bit like the result of the product rule, but it's not quite there. The product rule for a hypothetical product $I(x)y$ would be $(I(x)y)' = I'(x)y + I(x)y'$. Our goal is to find a function $I(x)$ that we can multiply our equation by, so the left side becomes *exactly* this product rule form.

2.  **Forcing the Match.**
    Let's multiply the standard form by our unknown integrating factor $I(x)$:
    $$ I(x)y' + I(x)P(x)y = I(x)Q(x) $$
    We want this left side to equal $(I(x)y)' = I(x)y' + I'(x)y$.
    Comparing the two expressions, we have:
    $$ \begin{align*} \text{Desired form: } & I(x)y' + I'(x)y \\ \text{Our equation: } & I(x)y' + I(x)P(x)y \end{align*} $$
    For these to be identical, we must enforce the condition on the terms multiplying $y$:
    $$ I'(x) = I(x)P(x) $$

3.  **Finding the Factor is a Separable ODE.**
    The condition we derived, $I'(x) = I(x)P(x)$, is a simple separable ODE for our unknown function $I(x)$. We can solve it:
    $$ \frac{dI}{dx} = I \cdot P(x) \implies \frac{1}{I} dI = P(x) dx $$
    Integrating both sides:
    $$ \int \frac{1}{I} dI = \int P(x) dx \implies \ln|I| = \int P(x) dx $$
    Exponentiating to solve for $I$:
    $$ I(x) = e^{\int P(x) dx} $$
    We can drop the absolute value and the constant of integration because any non-zero constant multiple of $I(x)$ will also work as an integrating factor. We choose the simplest one. This is the formula for the integrating factor.

## Worked example
Solve the initial value problem $y' - 3y = e^{5x}$ with $y(0) = 4$.

**Step 1: Identify Standard Form**
The equation is already in the standard form $y' + P(x)y = Q(x)$.
Here, $P(x) = -3$ and $Q(x) = e^{5x}$.

**Step 2: Calculate the Integrating Factor**
The integrating factor $I(x)$ is given by $I(x) = e^{\int P(x) dx}$.
$$ \int P(x) dx = \int -3 dx = -3x $$
So, the integrating factor is:
$$ I(x) = e^{-3x} $$

**Step 3: Multiply the ODE by the Integrating Factor**
Multiply every term in the original ODE by $I(x) = e^{-3x}$:
$$ e^{-3x}(y' - 3y) = e^{-3x}e^{5x} $$
$$ e^{-3x}y' - 3e^{-3x}y = e^{2x} $$

**Step 4: Recognize the Product Rule**
The left side is now, by construction, the derivative of $(I(x)y)$:
$$ \frac{d}{dx}(e^{-3x}y) = e^{2x} $$

**Step 5: Integrate Both Sides**
Integrate with respect to $x$:
$$ \int \frac{d}{dx}(e^{-3x}y) dx = \int e^{2x} dx $$
$$ e^{-3x}y = \frac{1}{2}e^{2x} + C $$

**Step 6: Solve for y(x)**
Isolate $y(x)$ to get the general solution:
$$ y(x) = e^{3x} \left( \frac{1}{2}e^{2x} + C \right) = \frac{1}{2}e^{5x} + Ce^{3x} $$

**Step 7: Apply the Initial Condition**
Use $y(0) = 4$ to find the constant $C$:
$$ 4 = \frac{1}{2}e^{5(0)} + Ce^{3(0)} $$
$$ 4 = \frac{1}{2}(1) + C(1) $$
$$ C = 4 - \frac{1}{2} = \frac{7}{2} $$

**Step 8: Write the Particular Solution**
Substitute $C$ back into the general solution:
$$ y(x) = \frac{1}{2}e^{5x} + \frac{7}{2}e^{3x} $$

*Reflection:* Each step has a purpose. Identifying $P(x)$ is crucial for finding the correct $I(x)$. Multiplying by $I(x)$ is the key transformation that makes the left side integrable. Integrating finds the family of solutions, and the initial condition selects the single, unique solution from that family.

## Diagrams
A slope field for a first-order linear ODE like $y' + y = x$ shows the direction of the solution curve at any point $(x, y)$. The integrating factor method gives us the explicit formula for the one curve that passes through a specific initial point, threading its way through the field.

```text
       y ^
         |
    3 +--/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-+
      | / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /|
    2 +////////////////////////////////////////////////////////////////+ -> Solution y(x)
      |////////////////////////////////////////////////////////////////|    for y(0)=2
    1 +----------------------------------------------------------------+
      | ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` `|
    0 +-------------------.--------------------------------------------+------> x
      | ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` `|
   -1 +` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` `+
         |
         -2
```
*Caption:* A slope field for a first-order ODE. Each small line segment indicates the slope $y'$ at that point. A solution curve is a function $y(x)$ that is tangent to these segments at every point.

## Memory technique — remember this forever
1.  **Mnemonic/Story:**
    Your ODE, $y' + P(x)y = Q(x)$, is a "broken" machine. The left side isn't a clean derivative. You need a special tool, the **I**ntegrating **F**actor, to fix it. The tool's blueprint is found by exponentiating the integral of the problematic part, $P(x)$. Once you multiply by the tool, the left side becomes a "perfect" product, $(Iy)'$, ready to be integrated.

2.  **Must-Memorize Formulas:**
    *   Standard Form: $y' + P(x)y = Q(x)$
    *   Integrating Factor: $I(x) = e^{\int P(x) dx}$
    *   Result after multiplying: $\frac{d}{dx}(I(x)y) = I(x)Q(x)$

3.  **Spaced Repetition Schedule:**
    Review this derivation and solve one problem on:
    *   Day 1
    *   Day 3
    *   Day 7
    *   Day 16
    *   Day 35

4.  **First Principles Pathway:**
    If you forget the formula for $I(x)$, re-derive it.
    *   Start with $y' + P(x)y = Q(x)$.
    *   Assume a multiplier $I(x)$: $I y' + I P y = I Q$.
    *   State your goal: you want the left side to be $(I y)' = I y' + I' y$.
    *   Compare terms: $I P y$ must equal $I' y$.
    *   This gives the condition $I' = IP$. This is a separable ODE. Solve it for $I$.

## Common mistakes
1.  **Incorrect P(x):** Failing to put the ODE in standard form first. If you have $2y' + 4y = 6x$, you must divide by 2 to get $y' + 2y = 3x$. Here, $P(x)=2$, not $4$.
2.  **Forgetting to Multiply Q(x):** The integrating factor must multiply the *entire* equation. A common mistake is to transform the left side to $(I(x)y)'$ but leave the right side as $Q(x)$ instead of the correct $I(x)Q(x)$.
3.  **Constant of Integration Errors:** Forgetting the $+ C$ after integrating $(I(x)y)' = I(x)Q(x)$. This constant is essential for the general solution. Forgetting it means you can only find one specific solution, which is incorrect.
4.  **Sign Errors:** Being careless with signs, especially in $P(x)$. If the equation is $y' - xy = \dots$, then $P(x) = -x$, not $x$. This sign error propagates through the entire calculation.

## Self-check
1.  Find the general solution to $xy' + y = \cos(x)$. (Hint: standard form first.)
2.  Solve the initial value problem $\frac{dy}{dt} + 2ty = t$ with $y(0) = 1$.
3.  A tank initially contains 100 L of pure water. Brine containing 0.1 kg of salt per liter enters the tank at a rate of 10 L/min. The solution is kept thoroughly mixed and drains from the tank at the same rate. Let $S(t)$ be the amount of salt in the tank at time $t$. Write a first-order linear ODE for $S(t)$ and solve it.