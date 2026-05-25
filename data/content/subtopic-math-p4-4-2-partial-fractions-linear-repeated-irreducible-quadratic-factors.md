## What it is
Partial fraction decomposition is an algebraic technique for rewriting a complex rational function—a fraction of two polynomials—as a sum of simpler, more manageable fractions. The goal is to break down one difficult integration problem into several easy ones. This is the inverse operation of finding a common denominator.

## Why it matters
This technique is critical for solving differential equations that model physical systems. In control theory for aerospace, the inverse Laplace transform is often computed using partial fractions to analyze the stability and response of a rocket's guidance system. In physics, it appears when calculating electric fields of complex charge distributions or solving problems in quantum mechanics involving scattering theory.

## When to study it
Before tackling this, you must have complete mastery of the following:
1.  **Polynomial long division:** To handle rational functions where the degree of the numerator is greater than or equal to the degree of the denominator (improper fractions).
2.  **Factoring polynomials:** You must be able to find the roots of the denominator and factor it completely into linear and irreducible quadratic terms.
3.  **Basic integration rules:** Specifically, you must know $\int \frac{1}{u} du = \ln|u| + C$ and $\int \frac{1}{u^2+a^2} du = \frac{1}{a}\arctan(\frac{u}{a}) + C$.

If you are weak on any of these, stop and review. Proceeding without them is inefficient.

## How to study it (step by step)
1.  **Verify Pre-computation:** For any given rational function $\frac{P(x)}{Q(x)}$, first check if $\text{deg}(P) \ge \text{deg}(Q)$. If so, perform polynomial long division to get a polynomial plus a proper rational function. The rest of the technique applies only to the proper remainder.
2.  **Master Distinct Linear Factors:** Start with problems where the denominator $Q(x)$ factors into distinct linear terms, like $(x-a)(x-b)$. Practice setting up the form $\frac{A}{x-a} + \frac{B}{x-b}$ and solving for the constants $A$ and $B$. Use both the method of equating coefficients and the Heaviside "cover-up" method.
3.  **Master Repeated Linear Factors:** Move to denominators with terms like $(x-a)^k$. Understand why the decomposition must include a term for each power: $\frac{A_1}{x-a} + \frac{A_2}{(x-a)^2} + \dots + \frac{A_k}{(x-a)^k}$. Practice solving for these coefficients.
4.  **Master Irreducible Quadratic Factors:** Tackle denominators with terms like $(ax^2+bx+c)$ which have no real roots ($b^2-4ac < 0$). Learn why the corresponding numerator must be a linear term, $\frac{Ax+B}{ax^2+bx+c}$.
5.  **Synthesize and Integrate:** Solve problems that combine all three factor types in the denominator. For each problem, first write the decomposition, then solve for the constants, and finally integrate each resulting simple fraction.

## Key ideas, with intuition
1.  **Decomposition is "Un-Adding" Fractions:** When we add $\frac{2}{x-1} + \frac{3}{x+5}$, we find a common denominator to get $\frac{2(x+5) + 3(x-1)}{(x-1)(x+5)} = \frac{5x+7}{x^2+4x-5}$. Partial fraction decomposition is the reverse process: it starts with $\frac{5x+7}{x^2+4x-5}$ and recovers the simpler pieces. The "form" of the decomposition is dictated by the factors of the denominator because those factors were the denominators of the original pieces.

2.  **Each Factor Type Demands a Specific Numerator:**
    *   **Linear Factor $(x-c)$:** The corresponding term is $\frac{A}{x-c}$. A constant numerator is sufficient.
    *   **Repeated Linear Factor $(x-c)^n$:** You need to account for all possible simpler fractions that could have contributed to this term when finding a common denominator. This requires a sum of terms for each power:
        $$ \frac{A_1}{x-c} + \frac{A_2}{(x-c)^2} + \dots + \frac{A_n}{(x-c)^n} $$
        Forgetting the lower-power terms is a fatal error.
    *   **Irreducible Quadratic Factor $(ax^2+bx+c)$:** Since the denominator is degree-2, the numerator must be the most general polynomial of one lower degree, which is a linear term:
        $$ \frac{Ax+B}{ax^2+bx+c} $$
        A constant $A$ is not general enough; you would miss entire classes of functions.

3.  **Solving for Coefficients is Just Algebra:** Once you have the correct form, you find the unknown constants ($A, B, C, \dots$) by clearing the denominators and insisting that the resulting polynomial equation is true for *all* $x$. This gives you two reliable methods:
    *   Substitute strategic values of $x$ (especially the roots of the denominator) to make terms zero and isolate coefficients.
    *   Expand everything and equate the coefficients of like powers of $x$ on both sides. This yields a system of linear equations.

## Worked example
Evaluate the integral $\int \frac{3x^2+x+4}{(x-1)(x^2+2)} dx$.

**Step 1: Setup the decomposition.**
The denominator is already factored. We have one distinct linear factor $(x-1)$ and one irreducible quadratic factor $(x^2+2)$. The degree of the numerator (2) is less than the degree of the denominator (3), so no long division is needed.
The form is:
$$ \frac{3x^2+x+4}{(x-1)(x^2+2)} = \frac{A}{x-1} + \frac{Bx+C}{x^2+2} $$

**Step 2: Solve for the coefficients A, B, and C.**
Multiply both sides by the common denominator $(x-1)(x^2+2)$ to clear the fractions:
$$ 3x^2+x+4 = A(x^2+2) + (Bx+C)(x-1) $$
This equation must hold for all $x$. Let's use a combination of strategic substitution and equating coefficients.

*   **Substitute a strategic value:** Let $x=1$. This will eliminate the $(Bx+C)$ term.
    $$ 3(1)^2+(1)+4 = A(1^2+2) + (B(1)+C)(1-1) $$
    $$ 3+1+4 = A(3) + 0 $$
    $$ 8 = 3A \implies A = \frac{8}{3} $$

*   **Expand and equate coefficients:** Substitute $A=8/3$ back into the equation and expand the right side.
    $$ 3x^2+x+4 = \frac{8}{3}(x^2+2) + (Bx^2 - Bx + Cx - C) $$
    $$ 3x^2+x+4 = \left(\frac{8}{3} + B\right)x^2 + (-B+C)x + \left(\frac{16}{3} - C\right) $$
    Now, equate the coefficients of the powers of $x$:
    *   $x^2$ term: $3 = \frac{8}{3} + B \implies B = 3 - \frac{8}{3} = \frac{1}{3}$
    *   $x$ term: $1 = -B+C \implies 1 = -\frac{1}{3} + C \implies C = \frac{4}{3}$
    *   Constant term (for verification): $4 = \frac{16}{3} - C \implies 4 = \frac{16}{3} - \frac{4}{3} = \frac{12}{3} = 4$. This matches, so our coefficients are correct.

**Step 3: Integrate the decomposed parts.**
Substitute the coefficients back into the integral:
$$ \int \left( \frac{8/3}{x-1} + \frac{(1/3)x + 4/3}{x^2+2} \right) dx $$
Split the integral into simpler parts:
$$ \frac{8}{3} \int \frac{1}{x-1} dx + \frac{1}{3} \int \frac{x}{x^2+2} dx + \frac{4}{3} \int \frac{1}{x^2+2} dx $$
*   First integral: $\frac{8}{3} \ln|x-1|$
*   Second integral (use u-sub, $u=x^2+2, du=2x dx$): $\frac{1}{3} \cdot \frac{1}{2} \int \frac{1}{u} du = \frac{1}{6} \ln|u| = \frac{1}{6} \ln(x^2+2)$
*   Third integral (form is $\int \frac{1}{u^2+a^2}du$ with $a=\sqrt{2}$): $\frac{4}{3} \cdot \frac{1}{\sqrt{2}} \arctan\left(\frac{x}{\sqrt{2}}\right) = \frac{4}{3\sqrt{2}} \arctan\left(\frac{x}{\sqrt{2}}\right)$

**Step 4: Combine and finalize.**
The final answer is:
$$ \frac{8}{3} \ln|x-1| + \frac{1}{6} \ln(x^2+2) + \frac{2\sqrt{2}}{3} \arctan\left(\frac{x}{\sqrt{2}}\right) + C $$

**Reflection:** Each step had a clear purpose. Step 1 set up the problem's structure based on the denominator's factors. Step 2 was pure algebra to find the unknown parameters of that structure. Step 3 broke the complex integral into three standard forms we already knew how to solve. Step 4 was assembly.

## Diagrams
Here is an ASCII diagram illustrating how two simple functions sum to a more complex one. Consider the decomposition $\frac{2x}{x^2-1} = \frac{1}{x-1} + \frac{1}{x+1}$.

```text
       y ^
         |
         |         /
         |        /|
         |       / |
         |      /  |
         |     /   |
---------+----/----+-----------> x
   -1    |   / 0   |    1
         |  /     |
         | /      |
         |/       | /
         /        |/
                  /

   Original function y = 2x/(x^2-1)
   (has asymptotes at x=-1, x=1)

         +

       y ^
         |     |
         |     |
         |     |
---------+-----+-----------> x
         | -1  | 0   1
         |     |
      ---|-----
     /   |
    /    |
   /     |

   Component y = 1/(x+1)

         +

       y ^
         |           /
         |          /
         |         /
---------+--------/-----------> x
         | 0   1  /
         |    |  /
         |    | /
         |    |/
         ----|---
             |

   Component y = 1/(x-1)
```
The diagram shows that the complex rational function (top) is literally the sum of the y-values of the two simpler hyperbolic functions (bottom). Partial fractions finds the components that create the final shape.

## Memory technique — remember this forever
1.  **The Story:** Imagine you are a materials scientist breaking down a complex, useless alloy (the rational function) into its pure, valuable elemental components (the simple fractions). Each factor in the denominator is a clue to one of the elements present.
    *   **Linear Factor $(x-c)$:** A simple, pure element. It just needs a quantity, $A$.
    *   **Repeated Linear Factor $(x-c)^n$:** An unstable isotope. You have to account for its primary form $(x-c)^n$ and all its decay products $(x-c)^{n-1}, \dots, (x-c)$.
    *   **Irreducible Quadratic $(ax^2+bx+c)$:** A stable, but complex molecule, not a pure element. It needs a more complex descriptor, a "linear" amount $Ax+B$, to specify its quantity.

2.  **Must-Know Formulas:** Overlearn these decomposition forms. Do not paraphrase.
    *   **Distinct Linear:** $\frac{P(x)}{(x-a)(x-b)} = \frac{A}{x-a} + \frac{B}{x-b}$
    *   **Repeated Linear:** $\frac{P(x)}{(x-a)^3} = \frac{A}{x-a} + \frac{B}{(x-a)^2} + \frac{C}{(x-a)^3}$
    *   **Irreducible Quadratic:** $\frac{P(x)}{(x-a)(x^2+b)} = \frac{A}{x-a} + \frac{Bx+C}{x^2+b}$

3.  **Spaced Repetition Schedule:**
    *   **1 Day:** Redo the worked example from scratch.
    *   **3 Days:** Do the first two self-check problems.
    *   **7 Days:** Do the third self-check problem.
    *   **16 Days:** Find and solve a problem with a repeated irreducible quadratic factor (e.g., denominator has $(x^2+1)^2$).
    *   **35 Days:** Teach the concept to a friend or write out a complete explanation without looking at your notes.

4.  **First Principles Pathway:** If you forget the forms, you can rebuild them. A rational function's behavior is dominated by its poles (the roots of its denominator). Near a simple pole $x=c$, the function behaves like $\frac{A}{x-c}$. Near a double pole, it could behave like $\frac{B}{(x-c)^2}$ or $\frac{A}{x-c}$. The decomposition is simply the most general sum of behaviors that could create the final function. For solving, if you forget the Heaviside method, the method of setting up the general form and equating coefficients of the powers of $x$ *always* works. It is your fallback algorithm.

## Common mistakes
1.  **Forgetting Long Division:** If $\text{deg}(P) \ge \text{deg}(Q)$, you *must* perform polynomial long division first. Integrating the polynomial part is easy. Failing to do this makes the rest of the problem impossible.
2.  **Wrong Numerator for Quadratics:** Using a constant numerator $A$ over an irreducible quadratic factor instead of the required linear term $Ax+B$. This is an extremely common and fatal error.
3.  **Incomplete Series for Repeated Factors:** For a factor like $(x-c)^3$, writing only $\frac{A}{(x-c)^3}$. You must include terms for all powers: $\frac{A}{x-c} + \frac{B}{(x-c)^2} + \frac{C}{(x-c)^3}$.
4.  **Algebraic Errors:** The process is mechanically simple but algebraically intensive. A single sign error when solving for coefficients will cascade and invalidate the entire result. Work methodically and check your work, for instance by plugging a simple value like $x=0$ into your final decomposition to see if it matches the original function.

## Self-check
1.  Find the partial fraction decomposition for $\frac{5x-10}{x^2-x-6}$. Then, evaluate the integral.
2.  Set up the correct form of the partial fraction decomposition for $\frac{x^4+1}{x(x-2)^3(x^2+x+5)}$. Do not solve for the coefficients.
3.  Evaluate $\int \frac{2x^3+3x^2+3x+2}{(x^2+1)^2} dx$.