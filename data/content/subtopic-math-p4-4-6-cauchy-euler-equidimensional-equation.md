## What it is
A Cauchy-Euler equation is a linear ordinary differential equation (ODE) where the power of the independent variable, $x$, in the coefficient of each term matches the order of the derivative in that term. The second-order homogeneous form is $ax^2y'' + bxy' + cy = 0$, where $a, b, c$ are constants. This structure is also called an "equidimensional" equation.

## Why it matters
These equations appear frequently when solving partial differential equations (like Laplace's equation or the wave equation) in coordinate systems with radial symmetry, such as polar or spherical coordinates. In aerospace, this is critical for analyzing heat flow in a cylindrical engine nozzle, fluid flow around a spherical body, or electrostatic potential around a coaxial cable. The solutions often describe physical phenomena that depend on the distance from a central point or axis.

## When to study it
You must have mastered second-order linear homogeneous ODEs with constant coefficients. Specifically, you need to be fluent in finding and using the characteristic equation to solve for the three cases of roots: distinct real, repeated real, and complex conjugate. Familiarity with the principle of superposition and linear independence of solutions is assumed.

## How to study it (step by step)
1.  **Recognize the Form:** Train your eye to spot the pattern: $ax^n \frac{d^n y}{dx^n} + \dots + a_1 x \frac{dy}{dx} + a_0 y = 0$. For our purposes, we focus on the second-order case: $ax^2y'' + bxy' + cy = 0$. Note the powers of $x$ (2, 1, 0) match the derivative orders (2, 1, 0).
2.  **Make the Key Ansatz:** Propose a solution of the form $y = x^r$. This is the central move. Intuitively, differentiating $x^r$ lowers its power, and the $x^k$ coefficients in the ODE are perfectly positioned to raise it back up, allowing a common $x^r$ factor to be cancelled.
3.  **Derive the Characteristic Equation:** Substitute $y=x^r$ into the ODE. You'll need its derivatives: $y' = rx^{r-1}$ and $y'' = r(r-1)x^{r-2}$. Plug these in:
    $$ a x^2 [r(r-1)x^{r-2}] + b x [rx^{r-1}] + c [x^r] = 0 $$
    Simplify by combining the powers of $x$:
    $$ a r(r-1)x^r + b r x^r + c x^r = 0 $$
    Factor out $x^r$ (assuming $x \neq 0$):
    $$ x^r [a r(r-1) + br + c] = 0 $$
    This yields the algebraic characteristic equation (sometimes called the indicial equation): $ar(r-1) + br + c = 0$.
4.  **Solve for the Roots (r):** This is a simple quadratic equation. Find its roots, $r_1$ and $r_2$.
5.  **Construct the General Solution (3 Cases):** Based on the roots, write the general solution for $x>0$.
    *   **Case 1: Distinct Real Roots ($r_1 \neq r_2$).** The two solutions are $y_1 = x^{r_1}$ and $y_2 = x^{r_2}$. The general solution is $y(x) = c_1 x^{r_1} + c_2 x^{r_2}$.
    *   **Case 2: Repeated Real Roots ($r_1 = r_2 = r$).** One solution is $y_1 = x^r$. The second, linearly independent solution is found via reduction of order to be $y_2 = x^r \ln(x)$. The general solution is $y(x) = c_1 x^r + c_2 x^r \ln(x)$.
    *   **Case 3: Complex Conjugate Roots ($r = \alpha \pm i\beta$).** The solutions are $x^{\alpha+i\beta}$ and $x^{\alpha-i\beta}$. Using the identity $x^{i\beta} = e^{\ln(x^{i\beta})} = e^{i\beta\ln x}$ and Euler's formula, we can extract two real-valued, linearly independent solutions: $y_1 = x^\alpha \cos(\beta \ln x)$ and $y_2 = x^\alpha \sin(\beta \ln x)$. The general solution is $y(x) = x^\alpha [c_1 \cos(\beta \ln x) + c_2 \sin(\beta \ln x)]$.
6.  **Solve an Initial Value Problem:** Use given initial conditions (e.g., $y(1)=y_0, y'(1)=y'_0$) to solve for the constants $c_1$ and $c_2$. Note that initial conditions are often given at $x=1$ to simplify the logarithms.

## Key ideas, with intuition
1.  **Scale Invariance:** The equation's structure is unchanged if you replace $x$ with $kx$ for some constant $k$. This property is called scale invariance or equidimensionality. This hints that a power law solution ($y=x^r$) is natural, because power laws themselves behave predictably under scaling: $(kx)^r = k^r x^r$. This is analogous to how constant-coefficient ODEs have exponential solutions ($y=e^{rx}$) because they are invariant under *translation* ($x \to x+a$).
2.  **The Magic Substitution: $y=x^r$:** This guess works because it converts a differential equation into an algebraic one. Each term $x^k y^{(k)}$ becomes a polynomial in $r$ multiplied by $x^r$.
    $$ x^2 y'' \quad \rightarrow \quad x^2 [r(r-1)x^{r-2}] = r(r-1)x^r $$
    $$ x y' \quad \rightarrow \quad x [rx^{r-1}] = r x^r $$
    Every term contains $x^r$, which can be factored out and cancelled, leaving only the algebraic equation for $r$.
3.  **The Logarithm Connection ($x=e^t$):** An alternative, more formal approach reveals the deep structure. Let $x=e^t$, which means $t = \ln x$. Using the chain rule, you can transform the derivatives with respect to $x$ into derivatives with respect to $t$.
    *   $\frac{dy}{dx} = \frac{dy}{dt}\frac{dt}{dx} = \frac{dy}{dt} \frac{1}{x} \implies x \frac{dy}{dx} = \frac{dy}{dt}$
    *   $x^2 \frac{d^2y}{dx^2} = \frac{d^2y}{dt^2} - \frac{dy}{dt}$
    Substituting these into $ax^2y'' + bxy' + cy = 0$ transforms it into:
    $$ a\left(\frac{d^2y}{dt^2} - \frac{dy}{dt}\right) + b\left(\frac{dy}{dt}\right) + cy = 0 $$
    $$ a\frac{d^2y}{dt^2} + (b-a)\frac{dy}{dt} + cy = 0 $$
    This is a linear ODE with *constant coefficients* in the new variable $t$. Its characteristic equation is $am^2 + (b-a)m + c = 0$, which is identical to the one we found earlier: $ar(r-1) + br + c = 0$. This proves that the guess $y=x^r = (e^t)^r = e^{rt}$ was exactly the right one. The $\ln(x)$ terms in the repeated and complex root cases are simply the $t$ variable showing up in the solution.

## Worked example
Solve the initial value problem: $2x^2y'' + 3xy' - y = 0$, with $y(1)=2$ and $y'(1)=1$.

**Step 1: Identify and Substitute**
This is a Cauchy-Euler equation. We assume a solution of the form $y=x^r$.
The derivatives are $y' = rx^{r-1}$ and $y'' = r(r-1)x^{r-2}$.
Substitute into the ODE:
$$ 2x^2[r(r-1)x^{r-2}] + 3x[rx^{r-1}] - x^r = 0 $$

**Step 2: Form the Characteristic Equation**
Simplify and factor out $x^r$:
$$ 2r(r-1)x^r + 3rx^r - x^r = 0 $$
$$ x^r[2r(r-1) + 3r - 1] = 0 $$
The characteristic equation is:
$$ 2r^2 - 2r + 3r - 1 = 0 $$
$$ 2r^2 + r - 1 = 0 $$

**Step 3: Solve for the Roots**
Factor the quadratic:
$$ (2r-1)(r+1) = 0 $$
The roots are distinct and real: $r_1 = 1/2$ and $r_2 = -1$.

**Step 4: Write the General Solution**
Using the distinct real roots case, the general solution is:
$$ y(x) = c_1 x^{1/2} + c_2 x^{-1} $$

**Step 5: Apply Initial Conditions**
First, find the derivative of the general solution:
$$ y'(x) = \frac{1}{2} c_1 x^{-1/2} - c_2 x^{-2} $$
Now, apply the conditions at $x=1$:
1.  $y(1) = c_1(1)^{1/2} + c_2(1)^{-1} = c_1 + c_2 = 2$
2.  $y'(1) = \frac{1}{2}c_1(1)^{-1/2} - c_2(1)^{-2} = \frac{1}{2}c_1 - c_2 = 1$

We have a system of two linear equations:
(I) $c_1 + c_2 = 2$
(II) $\frac{1}{2}c_1 - c_2 = 1$

Add (I) and (II) to eliminate $c_2$:
$$ \frac{3}{2}c_1 = 3 \implies c_1 = 2 $$
Substitute $c_1=2$ back into (I):
$$ 2 + c_2 = 2 \implies c_2 = 0 $$

**Step 6: Final Solution**
The particular solution is:
$$ y(x) = 2x^{1/2} $$

**Reflection:** Each step followed a clear logic. The ansatz $y=x^r$ successfully transformed the ODE into an algebra problem. Solving the resulting quadratic gave us the exponents for our basis solutions. The initial conditions provided a straightforward path to finding the specific constants for our final answer.

## Diagrams
The two basis functions from our worked example, $y_1=x^{1/2}$ and $y_2=x^{-1}$, have distinct behaviors for $x>0$.

```text
        y
        ^
        |
      3 +               . . . . . . . . . . y = x^(1/2) (grows slowly)
        |             .
      2 *...........* y(1)=2
        |         . .
      1 +-------+ .
        |     . :   .
        |   .   :     .
        | .     :       .
      0 +-------+---------+---------+---------+--> x
        0       1         2         3         4

        y
        ^
        |
      3 +
        |
      2 +
        | .
      1 +---* . . . . . . . . y = x^(-1) (decays)
        |   .
        |     .
        |       .
      0 +-------+---------+---------+---------+--> x
        0       1         2         3         4
```
The final solution $y(x)=2\sqrt{x}$ only uses the first basis function because the initial conditions determined that $c_2=0$. The diagram shows how the solution passes through the point $(1,2)$ and grows from there.

## Memory technique — remember this forever
1.  **Mnemonic:** Think **"Cauchy's Power Play"**. The name is "Cauchy-Euler", but the key is the **power** function guess, $y=x^r$. It's a direct "power play" against the equation.
2.  **Must Overlearn:**
    *   The Form: $ax^2y'' + bxy' + cy = 0$
    *   The Guess: $y = x^r$
    *   The Characteristic Equation: $a[r(r-1)] + br + c = 0$
3.  **Spaced Repetition Schedule:**
    *   Review this material and solve one problem tomorrow.
    *   Review in 3 days. Solve one problem of the "repeated root" case.
    *   Review in 7 days. Solve one problem of the "complex root" case.
    *   Quick review in 16 days.
    *   Final review in 35 days.
4.  **First Principles Pathway:** If you forget the characteristic equation formula, don't panic. **Re-derive it.** It takes 30 seconds.
    *   Start with $ax^2y'' + bxy' + cy = 0$.
    *   Assume $y=x^r$.
    *   Calculate $y' = rx^{r-1}$ and $y'' = r(r-1)x^{r-2}$.
    *   Substitute and factor out $x^r$. The polynomial in $r$ that remains *is* the characteristic equation. You can never get it wrong if you derive it.

## Common mistakes
1.  **Incorrect Characteristic Equation:** Writing $ar^2 + br + c = 0$ instead of the correct $a[r(r-1)] + br + c = 0$. The $y''$ term generates an $r(r-1)$, not just $r^2$.
2.  **Forgetting $\ln(x)$:** In the repeated root case, the second solution is $x^r \ln(x)$. A common error is to write the solution as just $c_1 x^r + c_2 x^r$, which is redundant.
3.  **Wrong Argument in Trig Functions:** For complex roots $r = \alpha \pm i\beta$, the solution is $y(x) = x^\alpha [c_1 \cos(\beta \ln x) + c_2 \sin(\beta \ln x)]$. Students often forget the logarithm and incorrectly write $\cos(\beta x)$. The change of variables $x=e^t$ makes it clear why the argument must be $t = \ln x$.
4.  **Domain Issues:** The standard solutions involving $x^r$ and $\ln(x)$ are defined for $x>0$. If the problem domain is $x<0$, the solution should be written in terms of $|x|$, e.g., $y(x) = c_1|x|^{r_1} + c_2|x|^{r_2}$.

## Self-check
1.  Find the general solution for $x^2y'' - 5xy' + 8y = 0$.
2.  Find the general solution for $4x^2y'' + y = 0$.
3.  Solve the initial value problem: $x^2y'' - 3xy' + 4y = 0$, with $y(1)=1$ and $y'(1)=0$.