## What it is
The annihilator method is a formal procedure for finding the particular solution $y_p$ to a linear, non-homogeneous ordinary differential equation with constant coefficients. It works by finding a differential operator that, when applied to the non-homogeneous term, yields zero. This transforms the original non-homogeneous ODE into a new, higher-order homogeneous ODE, which we already know how to solve.

## Why it matters
This method provides the mathematical foundation for analyzing forced oscillations in physical systems. In aerospace, this models the response of an aircraft structure to engine vibrations. In physics and electrical engineering, it's used to find the steady-state response of an RLC circuit to a sinusoidal voltage source, which is critical for designing filters and understanding resonance.

## When to study it
You must have mastered the following prerequisites. If not, master them first.
1.  **Linear Differential Operators:** You must be fluent in writing an ODE like $ay'' + by' + cy = g(x)$ in operator notation as $(aD^2 + bD + c)y = g(x)$, where $D = \frac{d}{dx}$.
2.  **Solving Homogeneous Linear ODEs with Constant Coefficients:** You must be able to find the general solution $y_c$ by solving the characteristic equation $ar^2 + br + c = 0$ for all three cases: distinct real roots, repeated real roots, and complex conjugate roots.
3.  **Principle of Superposition:** You must understand that the general solution to a non-homogeneous linear ODE is $y(x) = y_c(x) + y_p(x)$, where $y_c$ is the complementary solution (from the homogeneous part) and $y_p$ is any particular solution.

## How to study it (step by step)
1.  **Master the Operators:** Write down the five most common types of functions in the non-homogeneous term $g(x)$: constants, polynomials, exponentials, sinusoids, and their products. For each one, write the ODE it is a solution to. For example, $g(x) = e^{ax}$ is a solution to $y' - ay = 0$, so its operator is $(D-a)$.
2.  **Derive the Annihilators:** From the previous step, formalize the annihilator for each function type. The annihilator for $g(x)$ is precisely the operator from the homogeneous ODE that $g(x)$ solves. Create a reference table.
    *   $g(x) = x^k \implies A(D) = D^{k+1}$
    *   $g(x) = e^{ax} \implies A(D) = D-a$
    *   $g(x) = \sin(bx)$ or $\cos(bx) \implies A(D) = D^2+b^2$
3.  **Solve a Non-Resonant Case:** Take an equation like $y'' - 4y = e^{3x}$. Write it as $(D^2-4)y = e^{3x}$. Find the annihilator for $e^{3x}$, which is $(D-3)$. Apply it to the whole equation: $(D-3)(D^2-4)y = (D-3)e^{3x} = 0$. Solve this new 3rd-order homogeneous equation.
4.  **Solve a Resonant Case:** Take $y'' - 4y = e^{2x}$. The operator is $(D^2-4) = (D-2)(D+2)$. The annihilator for $e^{2x}$ is $(D-2)$. Notice the overlap. Applying it gives $(D-2)(D-2)(D+2)y = (D-2)^2(D+2)y = 0$. The repeated root $r=2$ in the new characteristic equation is the source of the $xe^{2x}$ term in the particular solution. This is the core insight.
5.  **Practice Combination Rules:** If $g(x) = g_1(x) + g_2(x)$, and $A_1(D)$ annihilates $g_1$ while $A_2(D)$ annihilates $g_2$, then the product $A_1(D)A_2(D)$ annihilates the sum $g(x)$. Work through an example like $y''+y = x + \cos(2x)$.

## Key ideas, with intuition
1.  **Functions as Solutions:** The method works on a specific class of functions for $g(x)$ (polynomials, exponentials, sinusoids, and their products). This is no coincidence. These are precisely the functions that arise as solutions to homogeneous linear ODEs with constant coefficients. The annihilator is just the characteristic operator of the ODE that the function $g(x)$ solves.
    $$
    \text{If } g(x) = e^{ax}\cos(bx), \text{ it solves an ODE with roots } r=a\pm bi. \\
    \text{The characteristic polynomial is } (r-(a+bi))(r-(a-bi)) = (r-a)^2 + b^2. \\
    \text{So, the annihilator is } A(D) = (D-a)^2 + b^2.
    $$
2.  **The Annihilation Step:** We start with $L(D)y = g(x)$. We find an operator $A(D)$ such that $A(D)g(x) = 0$. Applying it to both sides gives a new, bigger, but homogeneous equation:
    $$
    A(D) \left[ L(D)y \right] = A(D)g(x) \implies \left[ A(D)L(D) \right] y = 0
    $$
    We have turned a problem we don't know how to solve directly (non-homogeneous) into one we do (homogeneous).

3.  **Solution Spaces:** The general solution to the new equation $[A(D)L(D)]y=0$ contains all the solutions to the original homogeneous equation $L(D)y=0$, plus some new terms. These new terms form the structure of our particular solution $y_p$. We just have to find their coefficients.

4.  **Resonance is Root Collision:** The "special case" where you must multiply by $x$ occurs when the operator $L(D)$ and the annihilator $A(D)$ share a common factor, say $(D-r)$. When you multiply them, you get a repeated factor $(D-r)^2$ (or higher power). We know from solving homogeneous equations that a repeated root $r$ of multiplicity $k$ in the characteristic equation leads to solutions of the form $(C_1 + C_2x + \dots + C_kx^{k-1})e^{rx}$. The annihilator method formalizes this intuition.

## Worked example
Solve the ODE $y'' - 3y' + 2y = 4e^{2x}$.

**Step 1: Write in operator form and find the complementary solution, $y_c$.**
The operator is $L(D) = D^2 - 3D + 2 = (D-1)(D-2)$.
The homogeneous equation is $(D-1)(D-2)y=0$.
The characteristic equation is $(r-1)(r-2)=0$, with roots $r_1=1, r_2=2$.
So, the complementary solution is $y_c = C_1e^x + C_2e^{2x}$.

**Step 2: Find the annihilator for the non-homogeneous term.**
The term is $g(x) = 4e^{2x}$. The function part is $e^{2x}$.
This is a solution to the ODE $y' - 2y = 0$, or $(D-2)y=0$.
The annihilator is $A(D) = D-2$.

**Step 3: Apply the annihilator to the entire ODE.**
We have $L(D)y = g(x)$, which is $(D-1)(D-2)y = 4e^{2x}$.
Apply $A(D) = (D-2)$:
$$
(D-2)[(D-1)(D-2)y] = (D-2)[4e^{2x}]
$$
$$
(D-1)(D-2)^2 y = 4(D-2)e^{2x} = 4(2e^{2x} - 2e^{2x}) = 0
$$
Our new homogeneous equation is $(D-1)(D-2)^2 y = 0$.

**Step 4: Solve the new homogeneous ODE.**
The characteristic equation is $(r-1)(r-2)^2=0$.
The roots are $r=1$ (multiplicity 1) and $r=2$ (multiplicity 2).
The general solution to this new equation is $y(x) = C_1e^x + (C_2 + C_3x)e^{2x} = C_1e^x + C_2e^{2x} + C_3xe^{2x}$.

**Step 5: Identify the form of the particular solution $y_p$.**
The general solution is $y = y_c + y_p$.
We found $y(x) = \underbrace{C_1e^x + C_2e^{2x}}_{y_c} + \underbrace{C_3xe^{2x}}_{\text{form of } y_p}$.
The terms that are not in the original $y_c$ must form $y_p$.
So, $y_p = Axe^{2x}$ for some constant $A$. Note the $x$ factor, which arose because $A(D)$ shared a root with $L(D)$. This is resonance.

**Step 6: Substitute $y_p$ into the original ODE to find the coefficients.**
$y_p = Axe^{2x}$
$y_p' = Ae^{2x} + 2Axe^{2x}$
$y_p'' = 2Ae^{2x} + 2Ae^{2x} + 4Axe^{2x} = 4Ae^{2x} + 4Axe^{2x}$

Substitute into $y'' - 3y' + 2y = 4e^{2x}$:
$$
(4Ae^{2x} + 4Axe^{2x}) - 3(Ae^{2x} + 2Axe^{2x}) + 2(Axe^{2x}) = 4e^{2x}
$$
Group terms by function type:
$$
(4A - 3A)e^{2x} + (4A - 6A + 2A)xe^{2x} = 4e^{2x}
$$
$$
Ae^{2x} + 0 \cdot xe^{2x} = 4e^{2x}
$$
Equating coefficients, we find $A=4$.
So, the particular solution is $y_p = 4xe^{2x}$.

**Step 7: State the final general solution.**
$y(x) = y_c + y_p = C_1e^x + C_2e^{2x} + 4xe^{2x}$.

**Reflection:** Each step had a clear purpose. Step 1 defined the baseline solution space. Step 2-3 transformed the problem into a solvable form. Step 4-5 used the structure of the new solution to deduce the form of $y_p$, correctly identifying the resonance case automatically. Step 6 was mechanical computation to find the constants.

## Diagrams
This diagram illustrates how the solution space of the new, annihilated equation contains the solution space of the original homogeneous equation. The part left over is the form of $y_p$.

```text
       +-------------------------------------------------------+
       |                                                       |
       |      Solution Space of [A(D)L(D)]y = 0                |
       |                                                       |
       |      y = y_c + y_p                                    |
       |                                                       |
       |   +---------------------------------------------+     |
       |   |                                             |     |
       |   |   Solution Space of L(D)y = 0               |     |
       |   |                                             |     |
       |   |   (The complementary solution y_c)          |     |
       |   |                                             |     |
       |   +---------------------------------------------+     |
       |                                                       |
       |      ^------------------------------------------^     |
       |      | This "annulus" contains the form of y_p  |     |
       |                                                       |
       +-------------------------------------------------------+
```

## Memory technique — remember this forever
1.  **The Story: The Hitman.**
    Your ODE is $L(y) = g$. The operator $L$ is a cop who can't handle the criminal $g$. You hire a specialist hitman, the Annihilator $A$, who knows $g$'s weakness ($A(g)=0$). The hitman "cleans up" the whole scene: $A(L(y)) = A(g) = 0$. This leaves a bigger, but homogeneous ("clean"), crime scene $A(L)y=0$. Your job is to find the new person who appeared ($y_p$) after the hit. **Resonance** is when the hitman is related to the cop (e.g., $L=(D-2)(D-1)$, $A=(D-2)$). This makes the cleanup messy, requiring an extra tool ($x$) to sort out the identities.

2.  **Must-Know Formulas:**
    *   For $g(x) = (\text{poly of degree } k) \times e^{ax} \cos(bx)$: Annihilator is $A(D) = ((D-a)^2+b^2)^{k+1}$.
    *   For $g(x) = (\text{poly of degree } k) \times e^{ax} \sin(bx)$: Annihilator is $A(D) = ((D-a)^2+b^2)^{k+1}$.
    *   This single rule covers almost all cases. If there's no trig term, $b=0$. If no exponential, $a=0$. If no polynomial, $k=0$.

3.  **Spaced Repetition Schedule:**
    *   Review this entire lesson and work one new problem in **1 day**.
    *   Work two new problems (one resonant, one not) in **3 days**.
    *   Quickly re-derive the annihilator for $xe^{ax}\sin(bx)$ in **7 days**.
    *   Work a problem with a sum of two different function types in **16 days**.
    *   Teach the concept to a friend or a rubber duck in **35 days**.

4.  **First Principles Pathway:**
    If you forget the annihilator for a function $g(x)$, ask: "What is the simplest constant-coefficient homogeneous linear ODE that has $g(x)$ as a solution?"
    *   Example: Forget annihilator for $g(x) = x\cos(x)$.
    *   Roots must be complex conjugates to get cosine: $r = \pm i$.
    *   The $x$ factor means the roots must be repeated. So we need $r = \pm i$ with multiplicity 2.
    *   The characteristic polynomial is $(r-i)^2(r+i)^2 = ((r-i)(r+i))^2 = (r^2+1)^2 = r^4+2r^2+1$.
    *   The ODE is $y^{(4)} + 2y'' + y = 0$.
    *   The annihilator is $A(D) = (D^2+1)^2$.

## Common mistakes
1.  **Incorrect Annihilator:** Forgetting that $D^{k+1}$ annihilates a polynomial of degree $k$. Forgetting to square the operator for products like $e^{ax}\cos(bx)$. Use the first principles pathway to check yourself.
2.  **Solving for Coefficients in the Wrong Equation:** After finding the form of $y_p$, you MUST substitute it back into the **original non-homogeneous ODE** ($L(D)y = g(x)$), not the new homogeneous one ($A(D)L(D)y = 0$). Substituting into the latter will always give you $0=0$.
3.  **Ignoring Resonance:** Failing to notice that the annihilator $A(D)$ and the original operator $L(D)$ share a root. The annihilator method makes this obvious by creating repeated roots in the new characteristic equation, but you still have to correctly interpret that as needing an $x^k$ term in your $y_p$.

## Self-check
Do not solve for the final coefficients, but find the correct form of the particular solution $y_p$.

1.  $y'' - 9y = x^2e^{4x}$
2.  $y'' - 6y' + 9y = 5e^{3x}$
3.  $y^{(4)} - y'' = 4x + 2xe^{-x}$