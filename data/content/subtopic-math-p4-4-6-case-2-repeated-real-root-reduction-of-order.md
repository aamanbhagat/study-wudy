## What it is
For a second-order linear homogeneous ordinary differential equation with constant coefficients ($ay'' + by' + cy = 0$), the "repeated real root" case occurs when the characteristic equation ($ar^2 + br + c = 0$) has exactly one real solution, $r$. The standard method gives one solution, $y_1(t) = e^{rt}$, but we need a second, linearly independent solution to form the general solution. Reduction of order is the formal method used to derive this second solution.

## Why it matters
This case models critically damped systems in physics and engineering. A critically damped system returns to its equilibrium position as quickly as possible without oscillating. Applications include shock absorbers in vehicles, landing gear on spacecraft, and control systems for robotic arms, where overshoot is undesirable or catastrophic.

## When to study it
Before tackling this, you must be proficient in:
1.  **First-Order Linear ODEs:** You should be able to solve $y' + p(t)y = g(t)$ using an integrating factor.
2.  **Second-Order Homogeneous ODEs (Distinct Real Roots):** You must understand how to form and solve the characteristic equation $ar^2 + br + c = 0$ for the case where $b^2 - 4ac > 0$, yielding two distinct solutions $y(t) = c_1 e^{r_1 t} + c_2 e^{r_2 t}$.
3.  **Linear Independence:** You need to understand why $y_1(t) = e^{rt}$ and $y_2(t) = 5e^{rt}$ are not sufficient to describe all possible solutions. The concept of the Wronskian is related and useful but not strictly required to follow the derivation.

If you are not comfortable with these, review them first.

## How to study it (step by step)
1.  **Set up the problem.** Start with the general form $ay'' + by' + cy = 0$. Write down the characteristic equation $ar^2 + br + c = 0$. The condition for a repeated real root is that the discriminant is zero: $b^2 - 4ac = 0$. This gives one root, $r = -b/(2a)$.
2.  **Identify the first solution.** From the characteristic equation, we immediately have one solution: $y_1(t) = e^{rt} = e^{-bt/(2a)}$.
3.  **Apply the Reduction of Order hypothesis.** To find a second, linearly independent solution $y_2(t)$, assume it has the form $y_2(t) = v(t)y_1(t)$ for some unknown function $v(t)$. Our goal is to find $v(t)$.
4.  **Derive the equation for $v(t)$.** Calculate the derivatives of $y_2(t)$ using the product rule:
    *   $y_2'(t) = v'(t)y_1(t) + v(t)y_1'(t)$
    *   $y_2''(t) = v''(t)y_1(t) + 2v'(t)y_1'(t) + v(t)y_1''(t)$
    Substitute these into the original ODE: $a(v''y_1 + 2v'y_1' + vy_1'') + b(v'y_1 + vy_1') + c(vy_1) = 0$.
5.  **Simplify the equation.** Group the terms by derivatives of $v(t)$:
    $$ (ay_1)v'' + (2ay_1' + by_1)v' + (ay_1'' + by_1' + cy_1)v = 0 $$
    Notice that the coefficient of $v$ is exactly the original ODE with $y_1$ plugged in. Since $y_1$ is a solution, this term is zero.
6.  **Solve for $v(t)$.** The equation simplifies to $(ay_1)v'' + (2ay_1' + by_1)v' = 0$. Since $y_1(t) = e^{rt}$ and $r = -b/(2a)$, we have $y_1' = ry_1 = (-b/(2a))y_1$. The term $2ay_1' + by_1$ becomes $2a(ry_1) + by_1 = (2ar+b)y_1 = (2a(-b/2a)+b)y_1 = (-b+b)y_1 = 0$. The equation becomes even simpler: $ay_1 v'' = 0$. Since $a \neq 0$ and $y_1 = e^{rt}$ is never zero, we must have $v''(t) = 0$.
7.  **Find the simplest non-trivial $v(t)$.** Integrating $v''(t) = 0$ twice gives $v'(t) = k_1$ and $v(t) = k_1 t + k_2$. We need the simplest function for $v(t)$ that makes $y_2$ linearly independent from $y_1$. Choosing $k_1=1$ and $k_2=0$ gives $v(t) = t$. This yields our second solution: $y_2(t) = t y_1(t) = t e^{rt}$. The general solution is then $y(t) = c_1 y_1(t) + c_2 y_2(t) = c_1 e^{rt} + c_2 t e^{rt}$.

## Key ideas, with intuition
1.  **The Need for Two "Directions".** A second-order ODE requires two initial conditions (e.g., position and velocity). To satisfy any arbitrary pair of conditions, our general solution must have two independent "knobs" to turn ($c_1$ and $c_2$). The functions these constants multiply, $y_1$ and $y_2$, must be fundamentally different (linearly independent). $e^{rt}$ and $5e^{rt}$ are not; they point in the same "functional direction".
2.  **Guessing Smartly.** The guess $y_2(t) = v(t)y_1(t)$ is a brilliant move. We are saying "the second solution is related to the first, but modified by some factor $v(t)$". By substituting this form, we leverage the fact that $y_1$ is already a solution, which causes a massive, predictable cancellation, simplifying the problem.
3.  **The Magic Cancellation.** The reason reduction of order works so cleanly here is that the terms involving $v(t)$ and $v'(t)$ vanish perfectly.
    *   The coefficient of $v(t)$ is $(ay_1'' + by_1' + cy_1)$, which is zero by definition of $y_1$ being a solution.
    *   The coefficient of $v'(t)$ is $(2ay_1' + by_1)$, which is zero specifically because we are in the repeated root case where $r = -b/(2a)$.
    This leaves only a term with $v''(t)$, making the equation trivial to solve.

## Worked example
Solve the initial value problem $y'' + 6y' + 9y = 0$, with $y(0) = 2$ and $y'(0) = -3$.

**Step 1: Find the characteristic equation and its roots.**
The characteristic equation is $r^2 + 6r + 9 = 0$.
Factoring this gives $(r+3)^2 = 0$.
We have a repeated real root: $r = -3$.

**Step 2: Write down the general solution.**
The first solution is $y_1(t) = e^{-3t}$.
Since the root is repeated, the second linearly independent solution is $y_2(t) = te^{-3t}$.
The general solution is a linear combination of these two:
$$ y(t) = c_1 e^{-3t} + c_2 t e^{-3t} $$

**Step 3: Apply the initial conditions.**
We need the derivative of $y(t)$ to use the second initial condition. Using the product rule on the second term:
$$ y'(t) = -3c_1 e^{-3t} + c_2(1 \cdot e^{-3t} + t \cdot (-3e^{-3t})) = (-3c_1 + c_2)e^{-3t} - 3c_2 t e^{-3t} $$
Now, substitute $t=0$:
*   $y(0) = 2 \implies c_1 e^0 + c_2 \cdot 0 \cdot e^0 = 2 \implies c_1 = 2$.
*   $y'(0) = -3 \implies (-3c_1 + c_2)e^0 - 3c_2 \cdot 0 \cdot e^0 = -3 \implies -3c_1 + c_2 = -3$.

**Step 4: Solve for the constants.**
We have a system of two linear equations:
1.  $c_1 = 2$
2.  $-3c_1 + c_2 = -3$

Substitute (1) into (2): $-3(2) + c_2 = -3 \implies -6 + c_2 = -3 \implies c_2 = 3$.

**Step 5: State the final solution.**
Substitute the constants back into the general solution:
$$ y(t) = 2e^{-3t} + 3te^{-3t} $$

**Reflection:** The characteristic equation immediately told us the *form* of the solution ($e^{-3t}$ and $te^{-3t}$). The initial conditions then allowed us to find the specific linear combination required to solve the problem. The core step was knowing that a repeated root $r$ generates the solution pair $\{e^{rt}, te^{rt}\}$.

## Diagrams
Here are two ASCII plots illustrating the components of the solution $y(t) = 2e^{-3t} + 3te^{-3t}$.

1.  The two basis solutions, $y_1(t) = e^{-3t}$ and $y_2(t) = te^{-3t}$. Notice how they are fundamentally different shapes, which is a visual sign of linear independence.

```text
       y(t) ^
            |
      1.0 + . y1(t) = exp(-3t)
          | |\
          | | \
          | |  \
      0.4 + |  .----. y2(t) = t*exp(-3t)
          | | /      \
          | |/        `-.
    ------+---------------------> t
          | 0.0              1.0
```

2.  The behavior of a critically damped system (our case) versus underdamped and overdamped systems. The critically damped system returns to zero fastest without crossing it.

```text
       y(t) ^
            |
      1.0 +---.  (Overdamped: slow decay)
          |    `-.
          |       `-.
          |..........`----. (Critically Damped: fastest decay)
          |  _   _   _   _ `-.
    ------+---`---`---`---`-----> t
          |  (Underdamped: oscillates)
     -1.0 +
```

## Memory technique — remember this forever
1.  **Mnemonic:** "When roots repeat, `t` comes to compete."
    When you solve the characteristic equation and get only one value, $r$, you get one solution for free: $e^{rt}$. To get the second, competitive, linearly independent solution, you multiply the first by $t$.

2.  **Formulas to overlearn:**
    For the ODE $ay'' + by' + cy = 0$ where $b^2 - 4ac = 0$:
    *   The repeated root is $r = -b/(2a)$.
    *   The general solution is $y(t) = c_1 e^{rt} + c_2 t e^{rt} = (c_1 + c_2 t)e^{rt}$.

3.  **Spaced Repetition Schedule:**
    *   Review this lesson in: **1 day**.
    *   Then again in: **3 days**.
    *   Then again in: **7 days**.
    *   Then again in: **16 days**.
    *   Final review in: **35 days**.
    At each review, try to re-derive the result from the "first principles" pathway below.

4.  **First Principles Pathway:** If you forget the $t e^{rt}$ formula, you can always rebuild it.
    *   Start with $ay'' + by' + cy = 0$ and the one solution you know, $y_1(t) = e^{rt}$.
    *   Assume the second solution is $y_2(t) = v(t)y_1(t)$.
    *   Substitute $y_2$ and its derivatives into the ODE.
    *   Simplify. The terms will cancel out, leaving you with $v''(t) = 0$.
    *   Integrate twice to get $v(t) = k_1 t + k_2$.
    *   Pick the simplest interesting case ($v(t)=t$) to get $y_2(t) = t y_1(t)$.

## Common mistakes
1.  **Forgetting the `t`.** The most common error is writing the solution as $y(t) = c_1e^{rt} + c_2e^{rt}$, which incorrectly simplifies to $y(t) = Ce^{rt}$. This is a first-order solution, not a second-order one.
2.  **Algebraic Errors in the Product Rule.** When applying initial conditions or verifying a solution, students often make mistakes differentiating the $c_2 t e^{rt}$ term. Remember the product rule: $(fg)' = f'g + fg'$.
3.  **Applying it to the wrong problems.** This specific solution form, $(c_1 + c_2 t)e^{rt}$, is *only* for homogeneous, linear, second-order ODEs with constant coefficients that have a repeated real root. It does not apply if the coefficients are variable or the equation is non-homogeneous.
4.  **Solving for $v(t)$ incorrectly.** In the general method of reduction of order (for variable coefficient ODEs), the equation for $v(t)$ might not be as simple as $v''=0$. Students sometimes assume it's always this simple and misapply the shortcut.

## Self-check
1.  Find the general solution to $y'' - 10y' + 25y = 0$.
2.  Solve the initial value problem $4y'' + 4y' + y = 0$ with $y(0) = 1$ and $y'(0) = 2$.
3.  The method of reduction of order is more general than just for constant coefficients. Given that $y_1(t) = t$ is one solution to the ODE $t^2y'' - t(t+2)y' + (t+2)y = 0$ for $t>0$, find a second, linearly independent solution.