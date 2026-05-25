## What it is
This is the solution method for a second-order linear homogeneous ordinary differential equation (ODE) with constant coefficients, specifically for the case where its characteristic equation yields two different, real-valued roots. The resulting solution is a linear combination of two distinct exponential functions, each corresponding to one of the roots. This describes systems that decay or grow exponentially without oscillation.

## Why it matters
This case models non-oscillatory systems common in physics and engineering. For example, an overdamped shock absorber in a car returns to equilibrium slowly without bouncing, which is described by this type of solution. In electronics, it models an RLC circuit with high resistance, where the current dies out without oscillating. In rocket science, it can model the slow, non-oscillatory return of a control surface to its neutral position under heavy damping.

## When to study it
Before tackling this, you must be completely fluent with three prerequisites. If you are not, stop and review them.
1.  **Second-Order Linear Homogeneous ODEs with Constant Coefficients:** You must know the form $ay'' + by' + cy = 0$ and why we seek solutions to it.
2.  **The Exponential Ansatz:** You must understand the logic behind guessing a solution of the form $y(t) = e^{rt}$ to transform the ODE into an algebraic equation.
3.  **Solving Quadratic Equations:** You must be able to find the roots of $ar^2 + br + c = 0$ using the quadratic formula and know that the discriminant, $\Delta = b^2 - 4ac$, determines the nature of the roots. For this case, we require $\Delta > 0$.

## How to study it (step by step)
1.  **Start with the general form.** Write down the equation $ay'' + by' + cy = 0$, where $a, b, c$ are real constants and $a \neq 0$. Verbally state what each term represents (e.g., in a mass-spring-damper system, acceleration, velocity, position).
2.  **Derive the characteristic equation.** Substitute the ansatz $y(t) = e^{rt}$ into the ODE. Calculate $y'(t) = re^{rt}$ and $y''(t) = r^2e^{rt}$. Substitute these into the ODE to get $a(r^2e^{rt}) + b(re^{rt}) + c(e^{rt}) = 0$. Factor out the non-zero term $e^{rt}$ to arrive at the characteristic equation: $ar^2 + br + c = 0$.
3.  **Solve for the roots.** Use the quadratic formula, $r = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$, to find the roots $r_1$ and $r_2$. For this specific case, confirm that the discriminant $b^2 - 4ac > 0$, which guarantees that $r_1$ and $r_2$ are real and $r_1 \neq r_2$.
4.  **Identify the basis solutions.** Since we found two values of $r$ that satisfy the characteristic equation, we have found two distinct solutions to the original ODE: $y_1(t) = e^{r_1 t}$ and $y_2(t) = e^{r_2 t}$. These are called the basis solutions.
5.  **Construct the general solution.** The principle of superposition states that for a linear homogeneous ODE, any linear combination of solutions is also a solution. The general solution is therefore $y(t) = c_1 y_1(t) + c_2 y_2(t) = c_1 e^{r_1 t} + c_2 e^{r_2 t}$. The constants $c_1$ and $c_2$ are determined by initial conditions (e.g., initial position and velocity).
6.  **Solve a simple problem.** Take $y'' + 3y' + 2y = 0$. Work through steps 2-5 to find its general solution.
7.  **Interpret the solution.** For the problem in step 6, the roots are $r_1 = -1$ and $r_2 = -2$. The solution is $y(t) = c_1 e^{-t} + c_2 e^{-2t}$. Notice that both terms decay to zero as $t \to \infty$. The $e^{-2t}$ term decays faster. This represents a system returning to equilibrium without oscillation.

## Key ideas, with intuition
1.  **The Magic Guess (Ansatz): $y(t) = e^{rt}$**. Why does this work? The derivatives of an exponential function are always proportional to the function itself. Since the ODE $ay'' + by' + cy = 0$ is a linear combination of a function and its derivatives, guessing an exponential function means all terms will have a common factor of $e^{rt}$ that can be cancelled out, turning a calculus problem (ODE) into an algebra problem (polynomial).
2.  **The Characteristic Equation is the Soul of the ODE.** The equation $ar^2 + br + c = 0$ contains all the information about the system's intrinsic behavior. Its roots, $r_1$ and $r_2$, are the characteristic rates of exponential change (growth or decay) that the system naturally supports.
3.  **Two Roots, Two Solutions.** The fact that a second-order equation requires two initial conditions (e.g., $y(0)$ and $y'(0)$) to specify a unique solution implies that its general solution must have two free parameters ($c_1, c_2$). This requires two linearly independent basis solutions. When $r_1 \neq r_2$, the functions $e^{r_1 t}$ and $e^{r_2 t}$ are guaranteed to be linearly independent, meaning one cannot be written as a constant multiple of the other. They form a complete basis for the solution space.
    $$
    y(t) = \underbrace{c_1 e^{r_1 t}}_{\text{Mode 1}} + \underbrace{c_2 e^{r_2 t}}_{\text{Mode 2}}
    $$
    The final behavior is a weighted sum of these two fundamental modes of behavior.

## Worked example
**Problem:** Solve the initial value problem $y'' + 5y' + 4y = 0$, with initial conditions $y(0) = 1$ and $y'(0) = 1$.

**Step 1: Form the characteristic equation.**
The ODE is $ay'' + by' + cy = 0$ with $a=1, b=5, c=4$.
The characteristic equation is $ar^2 + br + c = 0$.
$$ r^2 + 5r + 4 = 0 $$
*Reflection: This step transforms the differential equation into a simple algebraic problem.*

**Step 2: Find the roots.**
We can factor the quadratic:
$$ (r+1)(r+4) = 0 $$
The roots are $r_1 = -1$ and $r_2 = -4$.
Since the discriminant $b^2 - 4ac = 5^2 - 4(1)(4) = 25 - 16 = 9 > 0$, we have two distinct real roots, as expected.
*Reflection: The roots dictate the exponential behavior. Both are negative, so we expect the solution to decay to zero.*

**Step 3: Write the general solution.**
The general solution is of the form $y(t) = c_1 e^{r_1 t} + c_2 e^{r_2 t}$.
$$ y(t) = c_1 e^{-t} + c_2 e^{-4t} $$
*Reflection: This equation represents an infinite family of solutions. We need the initial conditions to select the one specific solution that fits our problem.*

**Step 4: Use initial conditions to find $c_1$ and $c_2$.**
We need the derivative of the general solution to use the second initial condition:
$$ y'(t) = -c_1 e^{-t} - 4c_2 e^{-4t} $$
Now, apply the conditions at $t=0$:
1.  $y(0) = 1 \implies c_1 e^{0} + c_2 e^{0} = 1 \implies c_1 + c_2 = 1$
2.  $y'(0) = 1 \implies -c_1 e^{0} - 4c_2 e^{0} = 1 \implies -c_1 - 4c_2 = 1$

We have a system of two linear equations:
(I) $c_1 + c_2 = 1$
(II) $-c_1 - 4c_2 = 1$

Add (I) and (II): $(c_1 - c_1) + (c_2 - 4c_2) = 1 + 1 \implies -3c_2 = 2 \implies c_2 = -2/3$.
Substitute $c_2$ back into (I): $c_1 + (-2/3) = 1 \implies c_1 = 1 + 2/3 = 5/3$.

*Reflection: This is standard algebra. The key is to correctly differentiate the general solution before applying the velocity condition.*

**Step 5: Write the final particular solution.**
Substitute the values of $c_1$ and $c_2$ back into the general solution.
$$ y(t) = \frac{5}{3} e^{-t} - \frac{2}{3} e^{-4t} $$
This is the unique solution to the initial value problem.

## Diagrams
Here is an ASCII plot showing the two basis functions $y_1(t) = e^{-t}$ and $y_2(t) = e^{-4t}$ for the worked example. The $e^{-4t}$ term decays much more rapidly. The final solution is a weighted sum of these two curves.

```text
 y(t)
  ^
1.0 +---\-------------------------------------------------> t
  |     `\ y1(t) = exp(-t)
  |       \
  |        \
0.5 +---------\------------------------------------------
  |          `\
  |            \
  |             \
  |`\ y2(t) = exp(-4t)
  |  `\
0.0 +----`----`----`----`----`----`----`----`----`----`---
      0.0  0.5  1.0  1.5  2.0  2.5  3.0  3.5  4.0  4.5
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Distinct Real Roots, Distinct Exponential Parts." The form of the roots directly tells you the form of the solution. Distinct and Real means separate $e^{rt}$ terms.
2.  **Must-know formulas:**
    *   The ODE: $ay'' + by' + cy = 0$
    *   The Characteristic Equation: $ar^2 + br + c = 0$
    *   The Solution Form (for $r_1 \neq r_2$, real): $y(t) = c_1 e^{r_1 t} + c_2 e^{r_2 t}$
3.  **Spaced Repetition Schedule:** Review this material and solve one problem at these intervals: 1 day from now, then 3 days, 7 days, 16 days, and 35 days. This will lock it into long-term memory.
4.  **First Principles Pathway:** If you forget everything, remember the one key idea: **guess $y(t) = e^{rt}$**. Substitute this into $ay'' + by' + cy = 0$. The derivatives will produce $r^2 e^{rt}$ and $re^{rt}$. The $e^{rt}$ term will factor out, leaving you with the characteristic equation $ar^2 + br + c = 0$. Solving this quadratic gives you the roots $r_1, r_2$, which are the exponents in your two basis solutions. The principle of superposition tells you to add them together with constants. You can rebuild the entire method from this one guess.

## Common mistakes
1.  **Forgetting the constants.** Writing the solution as $y(t) = e^{r_1 t} + e^{r_2 t}$ is wrong. This is only one possible solution; the general solution $y(t) = c_1 e^{r_1 t} + c_2 e^{r_2 t}$ represents the entire family of solutions.
2.  **Mistakes in the derivative for initial conditions.** When solving for $c_1, c_2$ using an initial condition for $y'(t_0)$, students often forget to differentiate the *entire* expression $c_1 e^{r_1 t} + c_2 e^{r_2 t}$, making errors with the chain rule. Always write out $y'(t)$ explicitly before plugging in values.
3.  **Solving $ar^2+br+c=0$ but putting $t$ in the solution.** The characteristic equation is for the variable $r$. The solution to the ODE is a function of $t$ (or whatever the independent variable is). Do not write $y(t) = c_1 e^{t_1 t} + c_2 e^{t_2 t}$ where $t_1, t_2$ are the roots. The roots are the *coefficients* of the independent variable in the exponent.

## Self-check
1.  Find the general solution for the ODE $y'' - 9y = 0$.
2.  Solve the initial value problem: $2y'' - 5y' - 3y = 0$, with $y(0) = 2$ and $y'(0) = 1$.
3.  Consider the solution $y(t) = c_1 e^{r_1 t} + c_2 e^{r_2 t}$. If both $r_1$ and $r_2$ are negative, what must be the long-term behavior of the system as $t \to \infty$? If one root is positive and one is negative, what happens as $t \to \infty$? Explain why in terms of the solution components.