## What it is
An ordinary differential equation of the form $M(x, y) dx + N(x, y) dy = 0$ is called **exact** if the expression on the left-hand side is the total differential of some function $\psi(x, y)$, called the potential function. This means the ODE can be rewritten as $d\psi = 0$, whose solution is simply the set of level curves $\psi(x, y) = C$.

## Why it matters
This concept is the ODE equivalent of **conservative vector fields** in physics. The potential function $\psi$ is analogous to potential energy; the condition for exactness is identical to the condition for a 2D force field to be conservative. This ensures that work done is path-independent, a cornerstone of mechanics, electromagnetism, and thermodynamics where state functions (like internal energy) depend only on the state, not the path taken.

## When to study it
You must be proficient in multivariable calculus. Specifically, you need to have mastered:
1.  **Partial Derivatives**: Calculating $\frac{\partial f}{\partial x}$ and $\frac{\partial f}{\partial y}$.
2.  **The Total Differential**: Understanding that for a function $\psi(x, y)$, its total differential is $d\psi = \frac{\partial \psi}{\partial x} dx + \frac{\partial \psi}{\partial y} dy$.
3.  **Clairaut's Theorem**: Knowing that for well-behaved functions, the order of mixed partial differentiation does not matter, i.e., $\frac{\partial^2 \psi}{\partial y \partial x} = \frac{\partial^2 \psi}{\partial x \partial y}$.

If these are not second nature, review them before proceeding.

## How to study it (step by step)
1.  **Derive the Condition for Exactness.** Start with the assumption that an equation $M dx + N dy = 0$ is exact. By definition, there exists a $\psi(x, y)$ such that $d\psi = M dx + N dy$. From the formula for the total differential, this implies $\frac{\partial \psi}{\partial x} = M(x, y)$ and $\frac{\partial \psi}{\partial y} = N(x, y)$. Now, apply Clairaut's Theorem. Differentiate the first equality with respect to $y$ and the second with respect to $x$.
2.  **Memorize the Test.** The result from step 1 is the test for exactness: $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$. Take five simple ODEs in the correct form and apply only this test. Do not solve them yet. The goal is to make the check automatic.
3.  **Master the "Integrate-Differentiate-Compare" Algorithm.** To find $\psi(x, y)$ once you've confirmed an equation is exact:
    a. Start with $\frac{\partial \psi}{\partial x} = M(x, y)$.
    b. Integrate both sides with respect to $x$ to get $\psi(x, y) = \int M(x, y) dx + g(y)$. The "constant" of integration is a function of $y$ because we treated $y$ as a constant.
    c. Differentiate this expression for $\psi$ with respect to $y$: $\frac{\partial \psi}{\partial y} = \frac{\partial}{\partial y} \left( \int M(x, y) dx \right) + g'(y)$.
    d. Set this equal to $N(x, y)$ (since we know $\frac{\partial \psi}{\partial y} = N$). This will allow you to solve for $g'(y)$.
    e. Integrate $g'(y)$ to find $g(y)$.
4.  **Solve Three Problems.** Take three confirmed exact equations and solve them completely using the algorithm from step 3. The final solution is always written implicitly as $\psi(x, y) = C$.
5.  **Reverse the Algorithm.** Try finding $\psi$ by first integrating $N$ with respect to $y$: $\psi(x, y) = \int N(x, y) dy + h(x)$. Differentiate this with respect to $x$ and set it equal to $M$ to find $h(x)$. Do this for one of the problems from step 4 to prove to yourself that the result is identical.

## Key ideas, with intuition
1.  **Solutions are Level Curves.** The equation $d\psi = 0$ means that as we move along a solution curve $(x(t), y(t))$, the value of $\psi$ does not change. Therefore, the solution curves are precisely the level curves (or contour lines) of the surface $z = \psi(x, y)$. The ODE $M dx + N dy = 0$ is a statement that the vector $\langle M, N \rangle$, which is the gradient $\nabla \psi$, is always perpendicular to the direction of the solution curve $\langle dx, dy \rangle$.

2.  **The Exactness Condition is a No-Curl Condition.** The test $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$ can be rewritten as $\frac{\partial N}{\partial x} - \frac{\partial M}{\partial y} = 0$. This is the scalar component of the curl of the 2D vector field $\vec{F} = \langle M, N \rangle$. A vector field having zero curl is called **irrotational**. In physics, this means the field is conservative, which guarantees the existence of a scalar potential function—exactly what we need.

3.  **Reconstruction is Path-Independent Integration.** The algorithm for finding $\psi$ is a procedural way of performing a path-independent line integral. When you compute $\psi(x, y) = \int M(x, y) dx + g(y)$, you are integrating along a horizontal path to get to the point $(x, y)$, and the $g(y)$ term accounts for the vertical part of the path. The exactness condition guarantees that any path you choose to integrate along will yield the same potential function (up to a constant).

## Worked example
Solve the differential equation $(y \cos x + 2xe^y) + (\sin x + x^2 e^y - 1)y' = 0$.

**Step 1: Put into standard form.**
The standard form is $M(x, y) dx + N(x, y) dy = 0$.
Here, $y' = \frac{dy}{dx}$, so we have:
$(y \cos x + 2xe^y) dx + (\sin x + x^2 e^y - 1) dy = 0$.
We identify:
$M(x, y) = y \cos x + 2xe^y$
$N(x, y) = \sin x + x^2 e^y - 1$

**Step 2: Test for exactness.**
We must check if $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$.
$\frac{\partial M}{\partial y} = \frac{\partial}{\partial y} (y \cos x + 2xe^y) = \cos x + 2xe^y$
$\frac{\partial N}{\partial x} = \frac{\partial}{\partial x} (\sin x + x^2 e^y - 1) = \cos x + 2xe^y$
The condition holds. The equation is exact.

**Step 3: Find the potential function $\psi(x, y)$.**
We start from the condition $\frac{\partial \psi}{\partial x} = M(x, y)$.
$\frac{\partial \psi}{\partial x} = y \cos x + 2xe^y$
Integrate with respect to $x$, treating $y$ as a constant:
$$ \psi(x, y) = \int (y \cos x + 2xe^y) dx = y \sin x + x^2 e^y + g(y) $$
The "constant" of integration is a function of $y$.

**Step 4: Use the second condition to find $g(y)$.**
We know $\frac{\partial \psi}{\partial y} = N(x, y)$. Let's differentiate our expression for $\psi$:
$$ \frac{\partial \psi}{\partial y} = \frac{\partial}{\partial y} (y \sin x + x^2 e^y + g(y)) = \sin x + x^2 e^y + g'(y) $$
Now, set this equal to $N(x, y)$:
$$ \sin x + x^2 e^y + g'(y) = \sin x + x^2 e^y - 1 $$
Comparing the two sides, we see that:
$$ g'(y) = -1 $$
Integrate to find $g(y)$:
$$ g(y) = \int -1 dy = -y $$
We can omit the constant of integration here, as it will be absorbed into the final constant $C$.

**Step 5: Write the final solution.**
Substitute $g(y)$ back into the expression for $\psi(x, y)$:
$$ \psi(x, y) = y \sin x + x^2 e^y - y $$
The general solution to the ODE is given by $\psi(x, y) = C$:
$$ y \sin x + x^2 e^y - y = C $$

*Reflection*: Each step had a clear purpose. Step 1 standardized the problem. Step 2 was a crucial gate; without exactness, this method fails. Step 3 began the reconstruction of $\psi$ from one of its partial derivatives. Step 4 used the other partial derivative to constrain the unknown function $g(y)$ that arose from the partial integration. Step 5 stated the final answer as a family of level curves of the potential function.

## Diagrams
This diagram shows the relationship between the potential function $\psi(x,y)$, its level curves (the solutions), and its gradient field $\nabla\psi = \langle M, N \rangle$.

```text
       y
       ^
       |
       |  C3 /
       |    /
       |   /
       |  /  C2
       | /
       |/_________> x
      /|
     / |
    /  | C1
   /   |
  /    |

```
*Figure 1: Conceptual sketch of level curves.* The curves labeled C1, C2, C3 represent solutions $\psi(x,y)=C_1$, $\psi(x,y)=C_2$, etc.

```text
       y
       |
       |      ---> (vector v)
       |     /
       |    /
       |   * (x,y)
       |  / \
       | /   \ (vector grad(psi))
       |/     \
       ----------------> x
        (level curve)

```
*Figure 2: The Geometry at a Point.* At any point $(x,y)$ on a solution curve, the tangent vector to the curve, $v = \langle dx, dy \rangle$, is perpendicular to the gradient vector $\nabla\psi = \langle M, N \rangle$. Their dot product is zero: $\langle M, N \rangle \cdot \langle dx, dy \rangle = Mdx + Ndy = 0$.

## Memory technique — remember this forever
1.  **Mnemonic:** "My Nasty Xylophone" -> $M_y = N_x$. This is the test for exactness.
2.  **Must-know formulas:**
    *   Standard form: $M(x, y) dx + N(x, y) dy = 0$
    *   Exactness test: $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$
    *   Solution form: $\psi(x, y) = C$
3.  **Spaced Repetition Schedule:**
    *   Now: Solve one new problem from your textbook.
    *   1 day: Re-solve the worked example from this lesson without looking.
    *   3 days: Derive the exactness condition from first principles.
    *   7 days: Solve two new problems.
    *   16 days: Explain the "no-curl" intuition to a friend (or a rubber duck).
    *   35 days: Re-derive the condition and solve one hard problem.
4.  **First Principles Pathway:** If you forget everything, remember this: the entire method is based on reversing the total differential. The goal is to find a function $\psi(x, y)$ whose total differential $d\psi = \frac{\partial \psi}{\partial x} dx + \frac{\partial \psi}{\partial y} dy$ is exactly the left side of the ODE, $M dx + N dy$. This immediately gives you the two starting conditions $\frac{\partial \psi}{\partial x} = M$ and $\frac{\partial \psi}{\partial y} = N$. From these two equations, you can re-derive the exactness test (using Clairaut's theorem) and the entire integration procedure to find $\psi$.

## Common mistakes
1.  **The "Constant" is a Function:** When integrating $M(x,y)$ with respect to $x$, the "constant" of integration is not a constant $C$, but a function $g(y)$. Forgetting this is the most common error.
2.  **Forgetting the Final Form:** Finding the potential function $\psi(x, y)$ is not the final answer. The solution to the ODE is the implicit equation $\psi(x, y) = C$.
3.  **Not Checking for Exactness:** Applying the solution method to a non-exact equation will lead to a contradiction when you try to solve for $g'(y)$ (it will still depend on $x$). Always check for exactness first.
4.  **Mixing up Derivatives:** Confusing $\frac{\partial M}{\partial y}$ with $\frac{\partial M}{\partial x}$ in the test. Remember the mnemonic: $M_y = N_x$.

## Self-check
1.  Is the equation $(3x^2 - 2xy + 2)dx + (6y^2 - x^2 + 3)dy = 0$ exact?
2.  Find the general solution to $(2x \sin y + y^3 e^x) dx + (x^2 \cos y + 3y^2 e^x) dy = 0$.
3.  Find the value of the constant $b$ that makes the following equation exact: $(xy^2 + bx^2y)dx + (x+y)x^2 dy = 0$. Then, solve it.