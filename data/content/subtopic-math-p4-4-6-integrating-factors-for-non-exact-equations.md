## What it is
An integrating factor, $\mu(x,y)$, is a function that transforms a non-exact first-order ordinary differential equation of the form $M(x,y)dx + N(x,y)dy = 0$ into an exact one. Multiplying the entire non-exact equation by $\mu(x,y)$ creates a new equation, $(\mu M)dx + (\mu N)dy = 0$, which is exact and can therefore be solved directly.

## Why it matters
This concept mirrors the distinction between path-dependent and path-independent quantities in physics. In thermodynamics, work ($W$) and heat ($Q$) are inexact differentials, but internal energy ($U$) is an exact differential (a state function). The reciprocal of temperature, $1/T$, acts as an integrating factor for heat, as $dS = dQ_{rev}/T$ makes entropy ($S$) a state function. In fluid dynamics, an integrating factor can sometimes be used to find a scalar potential for a 2D velocity field, simplifying flow analysis.

## When to study it
You must be proficient with the following before proceeding:
1.  **Partial Derivatives:** Calculating $\frac{\partial f}{\partial x}$ and $\frac{\partial f}{\partial y}$.
2.  **Total Differentials:** Understanding that for a function $f(x,y)$, its total differential is $df = \frac{\partial f}{\partial x}dx + \frac{\partial f}{\partial y}dy$.
3.  **Exact Equations:** You must know how to identify an exact equation using the test $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$ and how to solve it by finding the potential function $f(x,y)$ such that $M = \frac{\partial f}{\partial x}$ and $N = \frac{\partial f}{\partial y}$.

If these concepts are not second nature, pause and review them.

## How to study it (step by step)
1.  **Start with a non-exact equation.** Given $M(x,y)dx + N(x,y)dy = 0$, compute $\frac{\partial M}{\partial y}$ and $\frac{\partial N}{\partial x}$. Confirm they are not equal.
2.  **Postulate an integrating factor $\mu$.** Assume a function $\mu(x,y)$ exists. The new equation is $(\mu M)dx + (\mu N)dy = 0$. For this to be exact, it must satisfy the condition $\frac{\partial (\mu M)}{\partial y} = \frac{\partial (\mu N)}{\partial x}$.
3.  **Derive the governing PDE for $\mu$.** Apply the product rule to the condition from step 2: $M\frac{\partial \mu}{\partial y} + \mu\frac{\partial M}{\partial y} = N\frac{\partial \mu}{\partial x} + \mu\frac{\partial N}{\partial x}$. This is a partial differential equation for $\mu$, which is generally difficult to solve.
4.  **Simplify by assuming $\mu = \mu(x)$.** Assume the integrating factor depends only on $x$. Then $\frac{\partial \mu}{\partial y} = 0$ and $\frac{\partial \mu}{\partial x} = \frac{d\mu}{dx}$. The PDE simplifies to $\mu\frac{\partial M}{\partial y} = N\frac{d\mu}{dx} + \mu\frac{\partial N}{\partial x}$.
5.  **Isolate and solve the ODE for $\mu(x)$.** Rearrange the equation from step 4 to separate variables for $\mu$: $\frac{1}{\mu}\frac{d\mu}{dx} = \frac{1}{N}\left(\frac{\partial M}{\partial y} - \frac{\partial N}{\partial x}\right)$. This is only solvable if the right-hand side is a function of $x$ only. If it is, say $g(x)$, then $\mu(x) = e^{\int g(x)dx}$.
6.  **Repeat for $\mu = \mu(y)$.** Go back to the PDE in step 3 and assume $\mu$ depends only on $y$. Show for yourself that this leads to the condition $\frac{1}{\mu}\frac{d\mu}{dy} = \frac{1}{M}\left(\frac{\partial N}{\partial x} - \frac{\partial M}{\partial y}\right)$. If the right-hand side is a function of $y$ only, say $h(y)$, then $\mu(y) = e^{\int h(y)dy}$.
7.  **Apply the method.** For a given non-exact equation, compute the expressions in steps 5 and 6. If one of them simplifies to a function of a single variable, compute the corresponding $\mu$, multiply the original ODE by it, and solve the resulting exact equation.

## Key ideas, with intuition
1.  **Exactness means a potential function exists.** An equation $Mdx + Ndy = 0$ is exact if it is the total differential of some function $f(x,y)$. That is, $df = Mdx + Ndy = 0$, which means the solution is simply $f(x,y) = C$. The condition $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$ is just Clairaut's theorem for mixed partials: $\frac{\partial^2 f}{\partial y \partial x} = \frac{\partial^2 f}{\partial x \partial y}$.
2.  **Non-exactness means the "mixed partials" don't match.** For a non-exact equation, $\frac{\partial M}{\partial y} \neq \frac{\partial N}{\partial x}$. There is no underlying potential function $f(x,y)$.
3.  **The integrating factor is a "re-scaling" function.** The factor $\mu$ is carefully chosen to warp the functions $M$ and $N$ into new functions $M' = \mu M$ and $N' = \mu N$ that *do* satisfy the condition for exactness:
    $$ \frac{\partial (\mu M)}{\partial y} = \frac{\partial (\mu N)}{\partial x} $$
    The whole game is finding a $\mu$ that enforces this equality.
4.  **The single-variable assumption is a simplifying trick.** Solving the general PDE for $\mu(x,y)$ is often harder than the original ODE. By *checking* if a factor $\mu(x)$ or $\mu(y)$ exists, we are looking for an "easy win" where the difficult PDE reduces to a simple, separable first-order ODE.

## Worked example
Solve the differential equation $(3xy + y^2)dx + (x^2 + xy)dy = 0$.

**Step 1: Check for exactness.**
Here, $M(x,y) = 3xy + y^2$ and $N(x,y) = x^2 + xy$.
$$ \frac{\partial M}{\partial y} = 3x + 2y $$
$$ \frac{\partial N}{\partial x} = 2x + y $$
Since $\frac{\partial M}{\partial y} \neq \frac{\partial N}{\partial x}$, the equation is not exact.

**Step 2: Test for an integrating factor $\mu(x)$.**
We compute the expression $\frac{1}{N}\left(\frac{\partial M}{\partial y} - \frac{\partial N}{\partial x}\right)$:
$$ \frac{1}{x^2 + xy} \left( (3x + 2y) - (2x + y) \right) = \frac{x+y}{x(x+y)} = \frac{1}{x} $$
This is a function of $x$ only. So an integrating factor $\mu(x)$ exists.

**Step 3: Calculate $\mu(x)$.**
$$ \mu(x) = e^{\int \frac{1}{x} dx} = e^{\ln|x|} = |x| $$
We can choose $\mu(x) = x$ (assuming $x>0$; the case $x<0$ yields the same final solution family).

**Step 4: Multiply the ODE by $\mu(x)$.**
$$ x(3xy + y^2)dx + x(x^2 + xy)dy = 0 $$
$$ (3x^2y + xy^2)dx + (x^3 + x^2y)dy = 0 $$
This is our new, exact equation. Let $M' = 3x^2y + xy^2$ and $N' = x^3 + x^2y$.

**Step 5: Verify exactness and solve.**
Check: $\frac{\partial M'}{\partial y} = 3x^2 + 2xy$ and $\frac{\partial N'}{\partial x} = 3x^2 + 2xy$. They match.
We need to find $f(x,y)$ such that $\frac{\partial f}{\partial x} = M'$ and $\frac{\partial f}{\partial y} = N'$.
Integrate $N'$ with respect to $y$ (it looks simpler):
$$ f(x,y) = \int (x^3 + x^2y) dy = x^3y + \frac{1}{2}x^2y^2 + g(x) $$
Now, differentiate with respect to $x$ and set equal to $M'$:
$$ \frac{\partial f}{\partial x} = 3x^2y + xy^2 + g'(x) = M' = 3x^2y + xy^2 $$
This implies $g'(x) = 0$, so $g(x) = C_0$.
The solution is $f(x,y) = C_1$, which gives:
$$ x^3y + \frac{1}{2}x^2y^2 = C $$

**Reflection:** The initial test for exactness failed. The test for a $\mu(x)$ factor succeeded because the expression simplified to a function of only $x$. This gave us the key, $\mu(x)=x$, to unlock the equation, transforming it into a standard exact ODE which we could then solve systematically.

## Diagrams
Imagine the functions $M(x,y)$ and $N(x,y)$ defining a vector field $\vec{F} = \langle M, N \rangle$. The equation $Mdx + Ndy = 0$ describes curves that are everywhere perpendicular to this field. The condition $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$ is the 2D equivalent of saying the field is irrotational (curl is zero).

A non-exact equation corresponds to a field with "swirls". An integrating factor re-scales the vectors in the field to eliminate the swirl, making it a conservative field (the gradient of some potential function $f$).

```text
       Non-Exact Field (has "swirl")             Exact Field (no "swirl")
       (Integral from A to B depends on path)     (Integral is path-independent)

       ^ y                                        ^ y
       |                                          |
       |  / / /                                   |  -----
       | / / /          B                         | | | | |        B
       |  / / /       .                          | | | | |      .
       |   .                                      |   .
       |  A                                        |  A
       |                                          |
       +----------------> x                       +----------------> x
```

## Memory technique — remember this forever
1.  **The Story:** Think of a chef trying to bake a "potential function cake," $f(x,y)$. The ingredients are $M$ and $N$. The recipe (Clairaut's theorem) says the ingredients must be balanced: $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$. If they aren't, the cake won't set. The integrating factor, $\mu$, is a secret spice. Adding it to the ingredients, creating $\mu M$ and $\mu N$, magically balances the recipe so the cake can be baked. There are two secret spice jars, one for 'x-only' recipes and one for 'y-only' recipes. You have to check which one works.

2.  **Formulas to Overlearn:**
    *   If $\frac{M_y - N_x}{N}$ is a function of $x$ only, then $\mu(x) = e^{\int \frac{M_y - N_x}{N} dx}$.
    *   If $\frac{N_x - M_y}{M}$ is a function of $y$ only, then $\mu(y) = e^{\int \frac{N_x - M_y}{M} dy}$.
    (Note: $M_y$ is shorthand for $\frac{\partial M}{\partial y}$, etc.)

3.  **Spaced Repetition Schedule:**
    *   Review this material and rework the example in **1 day**.
    *   Do 2 new problems in **3 days**.
    *   Re-derive the formula for $\mu(x)$ from first principles in **7 days**.
    *   Do 3 new problems in **16 days**.
    *   Quickly review the key ideas and formulas in **35 days**.

4.  **First Principles Pathway:** If you forget the formulas, re-derive them.
    *   Start with the goal: $\frac{\partial (\mu M)}{\partial y} = \frac{\partial (\mu N)}{\partial x}$.
    *   Apply the product rule: $\mu_y M + \mu M_y = \mu_x N + \mu N_x$.
    *   Assume $\mu = \mu(x)$. This kills the $\mu_y$ term. $\mu M_y = \mu_x N + \mu N_x$.
    *   Algebraically isolate $\frac{\mu_x}{\mu}$: $\mu_x N = \mu M_y - \mu N_x \implies \frac{\mu_x}{\mu} = \frac{M_y - N_x}{N}$.
    *   This is now a separable ODE for $\mu(x)$. Integrate it. The derivation for $\mu(y)$ is symmetric.

## Common mistakes
1.  **Mixing up the formulas.** The formula for $\mu(x)$ has $N$ in the denominator. The formula for $\mu(y)$ has $M$ in the denominator. Notice the pattern: to find a factor of $x$, you divide by the function ($N$) attached to $dy$.
2.  **Sign errors in the numerator.** The order of subtraction matters. For the $\mu(x)$ case, it's $M_y - N_x$. For the $\mu(y)$ case, it's $N_x - M_y$. A sign error here will lead to the wrong integrating factor.
3.  **Forgetting to multiply the whole equation.** After finding $\mu$, you must multiply it by *both* $M$ and $N$. It's a common mistake to only multiply one term.
4.  **Stopping after the test fails.** If neither $\frac{M_y - N_x}{N}$ nor $\frac{N_x - M_y}{M}$ simplifies to a single-variable function, it does not mean a solution is impossible. It only means a simple integrating factor of the form $\mu(x)$ or $\mu(y)$ does not exist.

## Self-check
1.  Find an integrating factor for and solve: $(2y^2 + 3x)dx + 2xydy = 0$.
2.  Find an integrating factor for and solve: $y(x+y+1)dx + (x+2y)dy = 0$.
3.  Consider the equation $(ay+bx)dx + (cy+dx)dy = 0$. Derive the conditions on the constants $a,b,c,d$ such that an integrating factor of the form $\mu(x,y) = x^p y^q$ exists.