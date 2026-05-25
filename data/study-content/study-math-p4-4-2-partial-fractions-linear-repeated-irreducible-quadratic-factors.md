## 1. What it is — in plain English

Imagine you have a big, complicated fraction, like a mixed-up LEGO model, and you want to take it apart into simpler, individual LEGO bricks. Partial fractions is a mathematical technique that does exactly this for fractions involving polynomials. It's about breaking down a complex fraction into a sum of simpler fractions.

Think about how you add fractions: $\frac{1}{2} + \frac{1}{3} = \frac{3}{6} + \frac{2}{6} = \frac{5}{6}$. Partial fractions works in reverse. If you were given $\frac{5}{6}$, and asked to break it into two simpler fractions with denominators 2 and 3, you'd be doing something analogous to partial fractions.

In calculus, we often encounter fractions where both the top and bottom are polynomials (these are called "rational functions"). Some of these look really messy, like $\frac{x+5}{x^2+x-2}$. Integrating such a fraction directly can be very hard. Partial fractions helps us rewrite this messy fraction as a sum of simpler fractions, like $\frac{A}{x-1} + \frac{B}{x+2}$, where A and B are just numbers.

Once broken down, each of these simpler fractions is much easier to integrate using basic rules you already know. So, it's a powerful algebraic tool that simplifies complex expressions, primarily to make them integrable.

## 2. Why it matters — real-world applications

Partial fractions isn't just a theoretical exercise; it's a fundamental tool that underpins many advanced engineering and scientific applications, especially when dealing with systems described by differential equations or transfer functions.

1.  **Control Systems Engineering:** In aerospace and robotics, engineers design control systems to make machines behave predictably (e.g., keeping an airplane stable, controlling a robot arm). These systems are often modeled using "transfer functions," which are rational functions in the Laplace domain. To analyze system stability, response to inputs, or to design controllers, these complex transfer functions are decomposed into partial fractions. This decomposition reveals the system's "poles" and "zeros," which dictate its behavior—how quickly it responds, if it oscillates, or if it's stable. Companies like Boeing or NASA heavily rely on this for aircraft and spacecraft design.

2.  **Signal Processing:** When processing signals (like audio, video, or radio waves), engineers often use filters described by rational functions. For example, designing a digital filter to remove noise from an audio recording involves analyzing its frequency response. Decomposing the filter's transfer function using partial fractions helps in understanding its individual components and how they contribute to the overall filtering action. This is crucial in telecommunications, medical imaging, and consumer electronics.

3.  **Chemical Reaction Engineering:** In chemical processes, the rate at which reactants are consumed and products are formed can often be described by complex rational functions of concentrations. To predict how a chemical reactor will behave over time, or to optimize its design, engineers need to integrate these rate laws. Partial fraction decomposition simplifies these complex rate expressions, making them integrable and allowing for the calculation of concentration profiles over time. This is vital for pharmaceutical companies and chemical manufacturers.

4.  **Physics — Orbital Mechanics & Circuit Analysis:** In physics, analyzing the motion of objects under complex forces (like in orbital mechanics with perturbations) or solving for currents and voltages in intricate electrical circuits (especially with AC components) can lead to rational functions. Partial fractions helps simplify these expressions, allowing for easier integration to find trajectories or time-dependent responses. For example, in RLC circuits, the impedance or admittance functions can be rational, and their partial fraction decomposition helps understand the circuit's resonant frequencies and damping characteristics.

## 3. Prerequisites — what you must know first

Before diving deep into partial fractions, ensure you have a solid grasp of these foundational concepts:

*   **Algebraic Manipulation:** The ability to rearrange equations, combine like terms, and perform basic arithmetic operations accurately.
*   **Factoring Polynomials:** Proficiency in factoring quadratic expressions (e.g., $x^2+5x+6 = (x+2)(x+3)$) and higher-degree polynomials (e.g., by grouping, rational root theorem, or synthetic division).
*   **Polynomial Long Division:** How to divide one polynomial by another, especially when the degree of the numerator is greater than or equal to the degree of the denominator.
*   **Solving Systems of Linear Equations:** Methods like substitution, elimination, or matrix techniques to find the values of multiple unknown variables in a set of linear equations.
*   **Basic Integration Rules:** Knowledge of common integral forms, particularly $\int \frac{1}{x} dx = \ln|x| + C$ and $\int \frac{1}{x^2+a^2} dx = \frac{1}{a} \arctan(\frac{x}{a}) + C$.

## 4. The core idea — step by step

The core idea of partial fractions is to reverse the process of adding fractions. When you add fractions, you find a common denominator. Partial fractions starts with a fraction already having a complex denominator and breaks it back down into simpler fractions whose denominators are the factors of the original denominator.

We're interested in integrating rational functions, which are functions of the form $f(x) = \frac{P(x)}{Q(x)}$, where $P(x)$ and $Q(x)$ are polynomials.

### Step 1: Check if the fraction is "proper" and perform polynomial division if needed.

**Plain-English Statement:** Before we can break a fraction down, we need to make sure the "top" polynomial isn't "bigger" or "equal in size" to the "bottom" polynomial. If it is, we first have to divide them. Think of it like trying to simplify $\frac{7}{3}$ into $2 + \frac{1}{3}$ before trying to break down the $\frac{1}{3}$.

**Small Concrete Example:**
Consider the fraction $\frac{x^3 + x^2 - 1}{x^2 - 1}$.
Here, the degree of the numerator ($x^3$) is 3, and the degree of the denominator ($x^2$) is 2. Since $3 \ge 2$, this is an "improper" rational function. We must perform polynomial long division first.

**Formal/Mathematical Version:**
A rational function $\frac{P(x)}{Q(x)}$ is called **proper** if the degree of $P(x)$ is strictly less than the degree of $Q(x)$ (i.e., $\text{deg}(P) < \text{deg}(Q)$).
If $\text{deg}(P) \ge \text{deg}(Q)$, the function is **improper**. In this case, we perform polynomial long division:
$$ \frac{P(x)}{Q(x)} = S(x) + \frac{R(x)}{Q(x)} $$
where $S(x)$ is the quotient polynomial, and $R(x)$ is the remainder polynomial, with $\text{deg}(R) < \text{deg}(Q)$. We then apply partial fraction decomposition only to the proper fraction $\frac{R(x)}{Q(x)}$.

**What could go wrong:** Forgetting to do polynomial long division when the fraction is improper. This is a common mistake that will lead to an incorrect decomposition and incorrect integration. You cannot apply partial fraction decomposition directly to an improper fraction.

### Step 2: Factor the denominator $Q(x)$ completely.

**Plain-English Statement:** The key to breaking down our complex fraction is to know what simpler pieces it's made of. This means we need to break down the denominator polynomial into its simplest building blocks: linear factors (like $x-a$) and irreducible quadratic factors (like $x^2+ax+b$ that can't be factored further with real numbers).

**Small Concrete Example:**
If our denominator is $Q(x) = x^3 - x^2 - 2x$:
First, factor out common terms: $x(x^2 - x - 2)$.
Then, factor the quadratic: $x(x-2)(x+1)$.
These are all distinct linear factors.

If our denominator is $Q(x) = x^4 + 4x^2$:
Factor out common terms: $x^2(x^2+4)$.
Here, $x^2$ is a repeated linear factor ($x \cdot x$), and $x^2+4$ is an irreducible quadratic factor (since $x^2+4=0$ has solutions $x=\pm 2i$, which are not real).

**Formal/Mathematical Version:**
Factor the denominator $Q(x)$ into a product of linear factors $(ax+b)^k$ and irreducible quadratic factors $(cx^2+dx+e)^m$.
Every polynomial with real coefficients can be uniquely factored into such terms over the real numbers.

**What could go wrong:** Incorrectly factoring the denominator, or failing to factor it completely. A common error is trying to factor an irreducible quadratic (e.g., trying to factor $x^2+4$ into real linear factors). Remember, a quadratic $ax^2+bx+c$ is irreducible if its discriminant $b^2-4ac < 0$.

### Step 3: Set up the partial fraction decomposition based on the factors.

This is where the different types of factors dictate the form of the simpler fractions.

#### Case 1: Distinct Linear Factors

**Plain-English Statement:** If the denominator has factors that are all different and simple (like $x-1$, $x+2$), then each of these factors gets its own simple fraction with a constant number on top.

**Small Concrete Example:**
If $Q(x) = (x-1)(x+2)$, the decomposition form is:
$$ \frac{P(x)}{(x-1)(x+2)} = \frac{A}{x-1} + \frac{B}{x+2} $$
where $A$ and $B$ are constants we need to find.

**Formal/Mathematical Version:**
For each distinct linear factor $(ax+b)$ in the denominator $Q(x)$, include a term of the form $\frac{A}{ax+b}$ in the partial fraction decomposition, where $A$ is a constant.

**What could go wrong:** Forgetting to include a term for every distinct linear factor, or using a more complex numerator than just a constant $A$.

#### Case 2: Repeated Linear Factors

**Plain-English Statement:** If a linear factor appears multiple times (like $(x-1)^3$), then we need to include a separate fraction for each power of that factor, from 1 up to the highest power. Each of these fractions will also have a constant number on top.

**Small Concrete Example:**
If $Q(x) = (x-1)^3(x+2)$, the decomposition form is:
$$ \frac{P(x)}{(x-1)^3(x+2)} = \frac{A}{x-1} + \frac{B}{(x-1)^2} + \frac{C}{(x-1)^3} + \frac{D}{x+2} $$
Here, $A, B, C, D$ are constants. Notice how $(x-1)$ gets terms for power 1, 2, and 3.

**Formal/Mathematical Version:**
For each repeated linear factor $(ax+b)^k$ in the denominator $Q(x)$, include $k$ terms in the partial fraction decomposition:
$$ \frac{A_1}{ax+b} + \frac{A_2}{(ax+b)^2} + \dots + \frac{A_k}{(ax+b)^k} $$
where $A_1, A_2, \dots, A_k$ are constants.

**What could go wrong:** Forgetting to include terms for *all* powers of the repeated factor. Forgetting the intermediate powers (e.g., for $(x-1)^3$, only including $\frac{A}{x-1}$ and $\frac{C}{(x-1)^3}$ and missing $\frac{B}{(x-1)^2}$).

#### Case 3: Irreducible Quadratic Factors

**Plain-English Statement:** If the denominator has a quadratic factor that can't be broken down into simpler linear factors with real numbers (like $x^2+4$), then this factor gets its own fraction. But because it's a quadratic, the numerator isn't just a constant; it's a linear expression (something like $Bx+C$).

**Small Concrete Example:**
If $Q(x) = (x^2+4)(x-1)$, the decomposition form is:
$$ \frac{P(x)}{(x^2+4)(x-1)} = \frac{Ax+B}{x^2+4} + \frac{C}{x-1} $$
Here, $A, B, C$ are constants. Notice the $Ax+B$ in the numerator for the irreducible quadratic.

**Formal/Mathematical Version:**
For each distinct irreducible quadratic factor $(ax^2+bx+c)$ in the denominator $Q(x)$, include a term of the form $\frac{Ax+B}{ax^2+bx+c}$ in the partial fraction decomposition, where $A$ and $B$ are constants.
If an irreducible quadratic factor is repeated, $(ax^2+bx+c)^k$, then include $k$ terms:
$$ \frac{A_1x+B_1}{ax^2+bx+c} + \frac{A_2x+B_2}{(ax^2+bx+c)^2} + \dots + \frac{A_kx+B_k}{(ax^2+bx+c)^k} $$

**What could go wrong:** Using a constant numerator (e.g., just $A$) for an irreducible quadratic factor. Also, incorrectly identifying a quadratic as irreducible when it actually can be factored (e.g., $x^2-4 = (x-2)(x+2)$ is *not* irreducible).

### Step 4: Combine all types of factors.

**Plain-English Statement:** If your denominator has a mix of these factor types (distinct linear, repeated linear, irreducible quadratic), you simply combine the appropriate setup for each factor.

**Small Concrete Example:**
If $Q(x) = x(x-1)^2(x^2+x+1)$, the decomposition form is:
$$ \frac{P(x)}{x(x-1)^2(x^2+x+1)} = \frac{A}{x} + \frac{B}{x-1} + \frac{C}{(x-1)^2} + \frac{Dx+E}{x^2+x+1} $$

**Formal/Mathematical Version:**
The full partial fraction decomposition is the sum of the terms corresponding to each factor in the denominator, as described in Cases 1, 2, and 3.

**What could go wrong:** Missing a term for any factor or any power of a repeated factor.

### Step 5: Solve for the unknown coefficients.

**Plain-English Statement:** Once you've set up the decomposition, you have a bunch of unknown numbers (like $A, B, C$). You need to find what these numbers are. There are two main ways to do this: by strategically picking values for $x$ that simplify the equation, or by expanding everything and matching the coefficients of the powers of $x$.

**Small Concrete Example (using strategic substitution):**
Let's say we have $\frac{x+5}{(x-1)(x+2)} = \frac{A}{x-1} + \frac{B}{x+2}$.
Multiply both sides by $(x-1)(x+2)$:
$x+5 = A(x+2) + B(x-1)$.

To find $A$: Let $x=1$ (this makes the $B$ term zero).
$1+5 = A(1+2) + B(1-1)$
$6 = 3A + 0 \implies A=2$.

To find $B$: Let $x=-2$ (this makes the $A$ term zero).
$-2+5 = A(-2+2) + B(-2-1)$
$3 = 0 - 3B \implies B=-1$.
So, $\frac{x+5}{(x-1)(x+2)} = \frac{2}{x-1} - \frac{1}{x+2}$.

**Small Concrete Example (using equating coefficients):**
Using the same equation: $x+5 = A(x+2) + B(x-1)$.
Expand the right side: $x+5 = Ax + 2A + Bx - B$.
Group terms by powers of $x$: $x+5 = (A+B)x + (2A-B)$.

Now, compare the coefficients of the powers of $x$ on both sides:
For $x^1$: $1 = A+B$
For $x^0$ (constant term): $5 = 2A-B$

We now have a system of two linear equations with two unknowns:
1) $A+B = 1$
2) $2A-B = 5$

Add the two equations: $(A+B) + (2A-B) = 1+5 \implies 3A = 6 \implies A=2$.
Substitute $A=2$ into equation (1): $2+B=1 \implies B=-1$.
This gives the same results: $A=2, B=-1$.

**Formal/Mathematical Version:**
After setting up the decomposition:
1.  Multiply both sides of the equation by the original denominator $Q(x)$ to clear all denominators. This will result in an equation involving polynomials.
2.  **Method of Strategic Substitution (Heaviside Cover-Up Method):** If there are distinct linear factors $(x-c)$, substitute $x=c$ into the polynomial equation. This will make many terms zero, allowing you to directly solve for one coefficient. Repeat for all distinct linear factors.
3.  **Method of Equating Coefficients:** Expand the polynomial equation from step 1. Group terms by powers of $x$. Equate the coefficients of corresponding powers of $x$ on both sides of the equation. This will generate a system of linear equations that can be solved for the unknown coefficients.
4.  Often, a combination of both methods is most efficient. Use strategic substitution for distinct linear factors, then use equating coefficients (or substitute other convenient values for $x$) to find the remaining coefficients.

**What could go wrong:** Algebraic errors when expanding or solving the system of equations. Not having enough independent equations to solve for all unknowns (this usually indicates an error in the setup of the partial fraction decomposition). Forgetting that the equation must hold for *all* $x$, so comparing coefficients is valid.

### Step 6: Integrate the resulting simpler fractions.

**Plain-English Statement:** Once you've broken down the complex fraction into a sum of simpler ones and found all the numbers, the final step for calculus is to integrate each of those simpler pieces. These simpler pieces are usually easy to integrate using basic rules.

**Small Concrete Example:**
Continuing from the previous example:
$$ \int \frac{x+5}{(x-1)(x+2)} dx = \int \left( \frac{2}{x-1} - \frac{1}{x+2} \right) dx $$
$$ = \int \frac{2}{x-1} dx - \int \frac{1}{x+2} dx $$
$$ = 2 \ln|x-1| - \ln|x+2| + C $$

**Formal/Mathematical Version:**
After finding all coefficients $A, B, C, \dots$, substitute them back into the decomposition. Then integrate each term:
*   $\int \frac{A}{ax+b} dx = \frac{A}{a} \ln|ax+b| + C$
*   $\int \frac{A}{(ax+b)^k} dx = \frac{A}{a(1-k)(ax+b)^{k-1}} + C$ for $k \ne 1$. (This is a simple power rule integral after a u-substitution $u=ax+b$).
*   $\int \frac{Ax+B}{ax^2+bx+c} dx$: This usually requires completing the square in the denominator if $b \ne 0$, then using a combination of a logarithm and an arctangent integral.
    *   The $\frac{Ax}{ax^2+bx+c}$ part often uses a u-substitution ($u = ax^2+bx+c$).
    *   The $\frac{B}{ax^2+bx+c}$ part often results in an arctangent integral.

**What could go wrong:** Forgetting to integrate after decomposition, making errors in the integration step (especially with the irreducible quadratic terms, which often require careful handling with completing the square and u-substitution/arctangent forms).

## 5. Worked examples — multiple, with every step shown

### Example 1: Distinct Linear Factors

**Problem:** Integrate $\int \frac{x+17}{x^2+3x-10} dx$.

**Given:** An integral of a rational function.
**Wanted:** The antiderivative of the given function.

**Step 1: Check if the fraction is proper.**
The degree of the numerator ($x+17$) is 1.
The degree of the denominator ($x^2+3x-10$) is 2.
Since $1 < 2$, the fraction is proper. No polynomial long division is needed.

**Step 2: Factor the denominator.**
$$ x^2+3x-10 = (x+5)(x-2) $$
These are distinct linear factors.

**Step 3: Set up the partial fraction decomposition.**
Since we have two distinct linear factors, $(x+5)$ and $(x-2)$, the decomposition will be:
$$ \frac{x+17}{(x+5)(x-2)} = \frac{A}{x+5} + \frac{B}{x-2} $$
Here, $A$ and $B$ are constants we need to find.

**Step 4: Solve for the unknown coefficients $A$ and $B$.**
Multiply both sides by the common denominator $(x+5)(x-2)$:
$$ x+17 = A(x-2) + B(x+5) $$
This equation must hold for all values of $x$. We can use strategic substitution.

*   **To find A, let $x=-5$:**
    $$ (-5)+17 = A((-5)-2) + B((-5)+5) $$
    $$ 12 = A(-7) + B(0) $$
    $$ 12 = -7A $$
    $$ A = -\frac{12}{7} $$
    We chose $x=-5$ because it makes the term with $B$ zero, isolating $A$.

*   **To find B, let $x=2$:**
    $$ (2)+17 = A((2)-2) + B((2)+5) $$
    $$ 19 = A(0) + B(7) $$
    $$ 19 = 7B $$
    $$ B = \frac{19}{7} $$
    We chose $x=2$ because it makes the term with $A$ zero, isolating $B$.

**Step 5: Rewrite the integral with the decomposition and integrate.**
Substitute the values of $A$ and $B$ back into the decomposition:
$$ \frac{x+17}{(x+5)(x-2)} = \frac{-\frac{12}{7}}{x+5} + \frac{\frac{19}{7}}{x-2} $$
Now, integrate each term:
$$ \int \frac{x+17}{x^2+3x-10} dx = \int \left( \frac{-12/7}{x+5} + \frac{19/7}{x-2} \right) dx $$
$$ = -\frac{12}{7} \int \frac{1}{x+5} dx + \frac{19}{7} \int \frac{1}{x-2} dx $$
$$ = -\frac{12}{7} \ln|x+5| + \frac{19}{7} \ln|x-2| + C $$
Each integral is of the form $\int \frac{1}{u} du = \ln|u|+C$, using simple u-substitutions ($u=x+5$ and $u=x-2$).

The final answer is:
$$ \boxed{-\frac{12}{7} \ln|x+5| + \frac{19}{7} \ln|x-2| + C} $$

**Reflection:** This example was straightforward because the denominator factored easily into distinct linear factors. The coefficients were found quickly using strategic substitution. The integration step was also simple, resulting in logarithm terms.

---

### Example 2: Repeated Linear Factors

**Problem:** Integrate $\int \frac{x^2+x+1}{x(x-1)^2} dx$.

**Given:** An integral of a rational function.
**Wanted:** The antiderivative of the given function.

**Step 1: Check if the fraction is proper.**
The degree of the numerator ($x^2+x+1$) is 2.
The degree of the denominator ($x(x-1)^2 = x(x^2-2x+1) = x^3-2x^2+x$) is 3.
Since $2 < 3$, the fraction is proper. No polynomial long division is needed.

**Step 2: Factor the denominator.**
The denominator is already factored: $x(x-1)^2$.
We have a distinct linear factor $x$ and a repeated linear factor $(x-1)^2$.

**Step 3: Set up the partial fraction decomposition.**
For the distinct factor $x$, we have $\frac{A}{x}$.
For the repeated factor $(x-1)^2$, we need terms for $(x-1)^1$ and $(x-1)^2$: $\frac{B}{x-1} + \frac{C}{(x-1)^2}$.
So the decomposition is:
$$ \frac{x^2+x+1}{x(x-1)^2} = \frac{A}{x} + \frac{B}{x-1} + \frac{C}{(x-1)^2} $$

**Step 4: Solve for the unknown coefficients $A, B, C$.**
Multiply both sides by the common denominator $x(x-1)^2$:
$$ x^2+x+1 = A(x-1)^2 + Bx(x-1) + Cx $$
$$ x^2+x+1 = A(x^2-2x+1) + B(x^2-x) + Cx $$
$$ x^2+x+1 = Ax^2 - 2Ax + A + Bx^2 - Bx + Cx $$

We'll use a combination of strategic substitution and equating coefficients.

*   **To find A, let $x=0$:**
    $$ (0)^2+(0)+1 = A(0-1)^2 + B(0)(0-1) + C(0) $$
    $$ 1 = A(1) + 0 + 0 $$
    $$ A = 1 $$
    We chose $x=0$ to eliminate terms with $B$ and $C$.

*   **To find C, let $x=1$:**
    $$ (1)^2+(1)+1 = A(1-1)^2 + B(1)(1-1) + C(1) $$
    $$ 3 = A(0) + B(0) + C $$
    $$ C = 3 $$
    We chose $x=1$ to eliminate terms with $A$ and $B$.

*   **To find B, we can use equating coefficients for $x^2$ (or any other convenient $x$ value, like $x=2$).**
    Equating coefficients of $x^2$ from the expanded equation:
    $$ 1x^2 = Ax^2 + Bx^2 $$
    $$ 1 = A+B $$
    We know $A=1$, so:
    $$ 1 = 1+B $$
    $$ B = 0 $$
    Alternatively, using $x=2$:
    $$(2)^2+(2)+1 = A(2-1)^2 + B(2)(2-1) + C(2)$$
    $$ 4+2+1 = A(1)^2 + B(2)(1) + 2C $$
    $$ 7 = A + 2B + 2C $$
    Substitute $A=1$ and $C=3$:
    $$ 7 = 1 + 2B + 2(3) $$
    $$ 7 = 1 + 2B + 6 $$
    $$ 7 = 7 + 2B $$
    $$ 0 = 2B \implies B=0 $$
    Both methods confirm $B=0$.

**Step 5: Rewrite the integral with the decomposition and integrate.**
Substitute the values of $A, B, C$ back into the decomposition:
$$ \frac{x^2+x+1}{x(x-1)^2} = \frac{1}{x} + \frac{0}{x-1} + \frac{3}{(x-1)^2} $$
$$ = \frac{1}{x} + \frac{3}{(x-1)^2} $$
Now, integrate each term:
$$ \int \frac{x^2+x+1}{x(x-1)^2} dx = \int \left( \frac{1}{x} + \frac{3}{(x-1)^2} \right) dx $$
$$ = \int \frac{1}{x} dx + 3 \int (x-1)^{-2} dx $$
For the first term, $\int \frac{1}{x} dx = \ln|x|$.
For the second term, use $u$-substitution $u=x-1$, $du=dx$:
$3 \int u^{-2} du = 3 \frac{u^{-1}}{-1} + C = -3u^{-1} + C = -\frac{3}{x-1} + C$.

So, the integral is:
$$ = \ln|x| - \frac{3}{x-1} + C $$

The final answer is:
$$ \boxed{\ln|x| - \frac{3}{x-1} + C} $$

**Reflection:** The key here was correctly setting up the decomposition for the repeated linear factor $(x-1)^2$, requiring both $\frac{B}{x-1}$ and $\frac{C}{(x-1)^2}$ terms. Finding the coefficients was efficient using a mix of strategic substitution and equating coefficients. The integration of $(x-1)^{-2}$ was a simple power rule.

---

### Example 3: Irreducible Quadratic Factor

**Problem:** Integrate $\int \frac{2x^2-x+4}{x^3+4x} dx$.

**Given:** An integral of a rational function.
**Wanted:** The antiderivative of the given function.

**Step 1: Check if the fraction is proper.**
The degree of the numerator ($2x^2-x+4$) is 2.
The degree of the denominator ($x^3+4x$) is 3.
Since $2 < 3$, the fraction is proper. No polynomial long division is needed.

**Step 2: Factor the denominator.**
$$ x^3+4x = x(x^2+4) $$
Here, $x$ is a distinct linear factor.
The quadratic $x^2+4$ is irreducible because its discriminant is $b^2-4ac = (0)^2 - 4(1)(4) = -16 < 0$. It cannot be factored into real linear factors.

**Step 3: Set up the partial fraction decomposition.**
For the distinct linear factor $x$, we have $\frac{A}{x}$.
For the irreducible quadratic factor $x^2+4$, we have $\frac{Bx+C}{x^2+4}$.
So the decomposition is:
$$ \frac{2x^2-x+4}{x(x^2+4)} = \frac{A}{x} + \frac{Bx+C}{x^2+4} $$

**Step 4: Solve for the unknown coefficients $A, B, C$.**
Multiply both sides by the common denominator $x(x^2+4)$:
$$ 2x^2-x+4 = A(x^2+4) + (Bx+C)x $$
$$ 2x^2-x+4 = Ax^2 + 4A + Bx^2 + Cx $$

We'll use a combination of strategic substitution and equating coefficients.

*   **To find A, let $x=0$:**
    $$ 2(0)^2-(0)+4 = A((0)^2+4) + (B(0)+C)(0) $$
    $$ 4 = A(4) + 0 $$
    $$ 4 = 4A $$
    $$ A = 1 $$
    We chose $x=0$ to eliminate the term with $B$ and $C$.

*   **To find B and C, we can equate coefficients.**
    Expand the right side and group by powers of $x$:
    $$ 2x^2-x+4 = (A+B)x^2 + Cx + 4A $$
    Now, equate coefficients:
    *   For $x^2$: $2 = A+B$
    *   For $x^1$: $-1 = C$
    *   For $x^0$ (constant): $4 = 4A$

    From the constant term, $4=4A \implies A=1$, which matches our substitution result.
    From the $x^1$ term, $C=-1$.
    From the $x^2$ term, $2=A+B$. Substitute $A=1$:
    $2 = 1+B \implies B=1$.

    So, we have $A=1, B=1, C=-1$.

**Step 5: Rewrite the integral with the decomposition and integrate.**
Substitute the values of $A, B, C$ back into the decomposition:
$$ \frac{2x^2-x+4}{x(x^2+4)} = \frac{1}{x} + \frac{1x-1}{x^2+4} = \frac{1}{x} + \frac{x-1}{x^2+4} $$
Now, integrate each term. The second term needs to be split further for integration:
$$ \int \frac{2x^2-x+4}{x(x^2+4)} dx = \int \left( \frac{1}{x} + \frac{x}{x^2+4} - \frac{1}{x^2+4} \right) dx $$
$$ = \int \frac{1}{x} dx + \int \frac{x}{x^2+4} dx - \int \frac{1}{x^2+4} dx $$

*   First integral: $\int \frac{1}{x} dx = \ln|x|$.

*   Second integral: $\int \frac{x}{x^2+4} dx$. Let $u = x^2+4$, then $du = 2x dx \implies x dx = \frac{1}{2} du$.
    $$ \int \frac{1}{u} \frac{1}{2} du = \frac{1}{2} \ln|u| + C = \frac{1}{2} \ln(x^2+4) + C $$
    (Note: $x^2+4$ is always positive, so absolute value is not strictly needed).

*   Third integral: $\int \frac{1}{x^2+4} dx$. This is of the form $\int \frac{1}{x^2+a^2} dx = \frac{1}{a} \arctan(\frac{x}{a}) + C$. Here $a^2=4 \implies a=2$.
    $$ \int \frac{1}{x^2+2^2} dx = \frac{1}{2} \arctan\left(\frac{x}{2}\right) + C $$

Combine these results:
$$ = \ln|x| + \frac{1}{2} \ln(x^2+4) - \frac{1}{2} \arctan\left(\frac{x}{2}\right) + C $$

The final answer is:
$$ \boxed{\ln|x| + \frac{1}{2} \ln(x^2+4) - \frac{1}{2} \arctan\left(\frac{x}{2}\right) + C} $$

**Reflection:** The main challenge here was correctly identifying the irreducible quadratic factor and setting up its numerator as $Bx+C$. The integration step for the quadratic term required splitting it into two parts, one leading to a logarithm (via u-substitution) and the other to an arctangent. This is typical for irreducible quadratic factors.

---

### Example 4: Improper Fraction with Mixed Factors

**Problem:** Integrate $\int \frac{x^3+x^2+x+2}{x^2(x+1)} dx$.

**Given:** An integral of a rational function.
**Wanted:** The antiderivative of the given function.

**Step 1: Check if the fraction is proper.**
The degree of the numerator ($x^3+x^2+x+2$) is 3.
The denominator is $x^2(x+1) = x^3+x^2$, which has a degree of 3.
Since $3 \ge 3$, the fraction is improper. We must perform polynomial long division first.

**Polynomial Long Division:**
Divide $x^3+x^2+x+2$ by $x^3+x^2$:
$$ \begin{array}{r} 1 \\ x^3+x^2 \overline{) x^3+x^2+x+2} \\ -(x^3+x^2) \\ \hline x+2 \end{array} $$
So, $\frac{x^3+x^2+x+2}{x^3+x^2} = 1 + \frac{x+2}{x^3+x^2}$.
Now we need to decompose the proper fraction $\frac{x+2}{x^3+x^2}$.

**Step 2: Factor the denominator of the proper fraction.**
The denominator is $x^3+x^2 = x^2(x+1)$.
We have a repeated linear factor $x^2$ and a distinct linear factor $(x+1)$.

**Step 3: Set up the partial fraction decomposition for the remainder term.**
For $x^2$, we need $\frac{A}{x} + \frac{B}{x^2}$.
For $(x+1)$, we need $\frac{C}{x+1}$.
So the decomposition for $\frac{x+2}{x^2(x+1)}$ is:
$$ \frac{x+2}{x^2(x+1)} = \frac{A}{x} + \frac{B}{x^2} + \frac{C}{x+1} $$

**Step 4: Solve for the unknown coefficients $A, B, C$.**
Multiply both sides by the common denominator $x^2(x+1)$:
$$ x+2 = A x(x+1) + B(x+1) + C x^2 $$
$$ x+2 = A(x^2+x) + B(x+1) + C x^2 $$
$$ x+2 = Ax^2 + Ax + Bx + B + Cx^2 $$

*   **To find B, let $x=0$:**
    $$ (0)+2 = A(0)(0+1) + B(0+1) + C(0)^2 $$
    $$ 2 = 0 + B(1) + 0 $$
    $$ B = 2 $$

*   **To find C, let $x=-1$:**
    $$ (-1)+2 = A(-1)(-1+1) + B(-1+1) + C(-1)^2 $$
    $$ 1 = A(0) + B(0) + C(1) $$
    $$ C = 1 $$

*   **To find A, we can equate coefficients for $x^2$.**
    Group terms by powers of $x$:
    $$ x+2 = (A+C)x^2 + (A+B)x + B $$
    Equate coefficients of $x^2$:
    $$ 0 = A+C $$
    (Since there is no $x^2$ term on the left side, its coefficient is 0).
    Substitute $C=1$:
    $$ 0 = A+1 \implies A=-1 $$
    (We can also verify with the $x^1$ term: $1 = A+B$. Substitute $A=-1, B=2$: $1 = -1+2$, which is true).

    So, we have $A=-1, B=2, C=1$.

**Step 5: Rewrite the integral with the decomposition and integrate.**
Substitute the values of $A, B, C$ back into the decomposition for the remainder term:
$$ \frac{x+2}{x^2(x+1)} = \frac{-1}{x} + \frac{2}{x^2} + \frac{1}{x+1} $$
Now, recall the original integral was $1 + \frac{x+2}{x^2(x+1)}$.
So, the integral becomes:
$$ \int \left( 1 + \frac{-1}{x} + \frac{2}{x^2} + \frac{1}{x+1} \right) dx $$
$$ = \int 1 dx - \int \frac{1}{x} dx + \int 2x^{-2} dx + \int \frac{1}{x+1} dx $$

*   $\int 1 dx = x$
*   $\int \frac{1}{x} dx = \ln|x|$
*   $\int 2x^{-2} dx = 2 \frac{x^{-1}}{-1} = -\frac{2}{x}$
*   $\int \frac{1}{x+1} dx = \ln|x+1|$

Combine these results:
$$ = x - \ln|x| - \frac{2}{x} + \ln|x+1| + C $$

The final answer is:
$$ \boxed{x - \ln|x| - \frac{2}{x} + \ln|x+1| + C} $$

**Reflection:** This example was harder due to the initial requirement for polynomial long division, which is often overlooked. The denominator then involved both distinct and repeated linear factors, requiring careful setup of the partial fraction terms. The integration involved a mix of standard forms: a polynomial, logarithms, and a simple power rule.

## 6. Common mistakes and traps

1.  **Forgetting Polynomial Long Division:** The most frequent trap. If $\text{deg}(P) \ge \text{deg}(Q)$, you *must* perform polynomial long division first. Failing to do so will lead to an incorrect partial fraction setup and wrong coefficients.
2.  **Incorrect Decomposition Setup for Repeated Factors:** Students often forget to include terms for *all* powers of a repeated linear or irreducible quadratic factor. For example, for $(x-a)^3$, they might only write $\frac{A}{x-a} + \frac{B}{(x-a)^3}$, missing the $\frac{C}{(x-a)^2}$ term.
3.  **Incorrect Numerator for Irreducible Quadratic Factors:** A common mistake is to use a constant ($A$) as the numerator for an irreducible quadratic factor ($ax^2+bx+c$), instead of a linear expression ($Ax+B$).
4.  **Factoring Irreducible Quadratics:** Attempting to factor a quadratic expression that has no real roots (i.e., $b^2-4ac < 0$) into linear factors. This leads to an incorrect denominator structure.
5.  **Algebraic Errors in Solving for Coefficients:** This method often involves solving systems of linear equations. Small arithmetic or algebraic mistakes when expanding, grouping terms, or solving the system can propagate and lead to completely incorrect coefficients.
6.  **Errors in the Final Integration Step:** After correctly decomposing the function, students sometimes make mistakes in integrating the simpler terms. This is especially true for terms like $\frac{1}{(ax+b)^k}$ (power rule, not logarithm) or $\frac{Ax+B}{ax^2+bx+c}$ (which often requires splitting and using both $\ln$ and $\arctan$).

## 7. Textbook-precise explanation

Let $f(x) = \frac{P(x)}{Q(x)}$ be a rational function, where $P(x)$ and $Q(x)$ are polynomials with real coefficients, and $Q(x)$ is not the zero polynomial.

**Step 1: Proper Fraction Condition**
If $\text{deg}(P(x)) \ge \text{deg}(Q(x))$, perform polynomial long division to write $f(x)$ as:
$$ \frac{P(x)}{Q(x)} = S(x) + \frac{R(x)}{Q(x)} $$
where $S(x)$ is a polynomial (the quotient) and $\frac{R(x)}{Q(x)}$ is a proper rational function (i.e., $\text{deg}(R(x)) < \text{deg}(Q(x))$). The partial fraction decomposition is then applied only to the proper fraction $\frac{R(x)}{Q(x)}$.

**Step 2: Factorization of the Denominator**
Factor the denominator $Q(x)$ completely into a product of linear factors $(ax+b)$ and irreducible quadratic factors $(cx^2+dx+e)$ over the real numbers. According to the Fundamental Theorem of Algebra (for real polynomials), any polynomial $Q(x)$ with real coefficients can be uniquely factored (up to order and constant multiples) into factors of the form $(ax+b)^k$ (where $ax+b$ is a linear factor) and $(cx^2+dx+e)^m$ (where $cx^2+dx+e$ is an irreducible quadratic factor, meaning its discriminant $d^2-4ce < 0$).

**Step 3: Partial Fraction Decomposition Theorem**
For a proper rational function $\frac{R(x)}{Q(x)}$, the partial fraction decomposition is constructed as follows:

*   **Case 1: Distinct Linear Factors**
    For each distinct linear factor $(ax+b)$ in $Q(x)$, the decomposition includes a term of the form:
    $$ \frac{A}{ax+b} $$
    where $A$ is a constant.

*   **Case 2: Repeated Linear Factors**
    For each repeated linear factor $(ax+b)^k$ (where $k \ge 2$) in $Q(x)$, the decomposition includes $k$ terms of the form:
    $$ \frac{A_1}{ax+b} + \frac{A_2}{(ax+b)^2} + \dots + \frac{A_k}{(ax+b)^k} $$
    where $A_1, A_2, \dots, A_k$ are constants.

*   **Case 3: Distinct Irreducible Quadratic Factors**
    For each distinct irreducible quadratic factor $(ax^2+bx+c)$ in $Q(x)$, the decomposition includes a term of the form:
    $$ \frac{Ax+B}{ax^2+bx+c} $$
    where $A$ and $B$ are constants.

*   **Case 4: Repeated Irreducible Quadratic Factors**
    For each repeated irreducible quadratic factor $(ax^2+bx+c)^m$ (where $m \ge 2$) in $Q(x)$, the decomposition includes $m$ terms of the form:
    $$ \frac{A_1x+B_1}{ax^2+bx+c} + \frac{A_2x+B_2}{(ax^2+bx+c)^2} + \dots + \frac{A_mx+B_m}{(ax^2+bx+c)^m} $$
    where $A_1, B_1, \dots, A_m, B_m$ are constants.

The sum of all these terms constitutes the unique partial fraction decomposition of $\frac{R(x)}{Q(x)}$.

**Step 4: Determination of Coefficients**
The unknown constants (e.g., $A, B, C, \dots$) are found by multiplying both sides of the decomposition equation by the common denominator $Q(x)$, which results in a polynomial identity. These constants can then be determined by:
1.  **Strategic Substitution:** Substituting specific values of $x$ (especially the roots of the linear factors) to simplify the equation and solve for individual coefficients.
2.  **Equating Coefficients:** Expanding the polynomial identity and equating the coefficients of like powers of $x$ on both sides, which yields a system of linear equations that can be solved for the constants.

**Step 5: Integration**
Once the coefficients are determined, substitute them back into the decomposition. Each resulting term can then be integrated using standard integration formulas:
*   $\int \frac{A}{ax+b} dx = \frac{A}{a} \ln|ax+b| + C$
*   $\int \frac{A}{(ax+b)^k} dx = \frac{A}{a(1-k)(ax+b)^{k-1}} + C$ for $k \ne 1$.
*   $\int \frac{Ax+B}{ax^2+bx+c} dx$ typically involves splitting the numerator to create a $\ln$ term (from the derivative of the denominator) and an $\arctan$ term (after completing the square in the denominator).

This rigorous process ensures that any rational function can be integrated, provided its denominator can be factored.

(Ref: Stewart, Calculus, 9e, §7.4 Partial Fractions)

## 8. ASCII diagrams

Here's a flowchart representing the decision process for partial fraction decomposition:

```text
                               START
                                 |
                                 v
                 Is deg(P(x)) >= deg(Q(x))?
                      /       \
                     /         \
                   YES          NO
                    |            |
                    v            v
        Perform Polynomial    (Fraction is Proper)
            Long Division        |
            P(x)/Q(x) = S(x) + R(x)/Q(x)
                    |            |
                    +------------+
                                 v
                       Factor Denominator Q(x)
                       into linear & irreducible quadratic factors
                                 |
           .---------------------|---------------------.
           |                     |                     |
           v                     v                     v
  Distinct Linear Factors      Repeated Linear Factors   Irreducible Quadratic Factors
  e.g., (x-a)(x-b)             e.g., (x-a)^k             e.g., (x^2+ax+b) or (x^2+ax+b)^m
           |                     |                     |
           v                     v                     v
  A/(x-a) + B/(x-b)    A1/(x-a) + A2/(x-a)^2 + ...     (Ax+B)/(x^2+ax+b)
                                 |                     |
                                 v                     v
                             ... + Ak/(x-a)^k    ... + (Amx+Bm)/(x^2+ax+b)^m
           |                     |                     |
           '---------------------|---------------------'
                                 |
                                 v
                   Combine all decomposition forms
                   e.g., R(x)/Q(x) = A/(x-a) + B/(x-a)^2 + (Cx+D)/(x^2+bx+c)
                                 |
                                 v
               Solve for A, B, C, D... using:
               1. Strategic Substitution (for linear factors)
               2. Equating Coefficients (always works, or for remaining)
                                 |
                                 v
                          Integrate S(x) (if any) +
                          Integrate each partial fraction term
                                 |
                                 v
                                END
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Think of "P-F-D-I" as your mantra for integrating rational functions:
    *   **P**roper? (Do polynomial division if not)
    *   **F**actor (the denominator)
    *   **D**ecompose (set up partial fractions based on factor types: Linear, Repeated, Irreducible Quadratic)
    *   **I**ntegrate (each simple term)

    For the decomposition step, remember "L-R-I-Q" (Linear, Repeated, Irreducible Quadratic) and their corresponding numerators:
    *   **L**inear ($x-a$) $\rightarrow$ **C**onstant ($A$)
    *   **R**epeated ($ (x-a)^k $) $\rightarrow$ **C**onstants for each power ($A_1, A_2, \dots, A_k$)
    *   **I**rreducible **Q**uadratic ($x^2+ax+b$) $\rightarrow$ **L**inear ($Ax+B$)

    Visually, imagine a complex fraction as a tangled knot. "P-F-D-I" is the step-by-step untangling process. "L-R-I-Q" are the different types of knots you might encounter, each requiring a specific untangling tool (numerator form).

2.  **Formulas/Facts to Overlearn:**
    *   **The four forms of partial fraction decomposition:**
        1.  $\frac{A}{ax+b}$ (for distinct linear factor $ax+b$)
        2.  $\frac{A_1}{ax+b} + \frac{A_2}{(ax+b)^2} + \dots + \frac{A_k}{(ax+b)^k}$ (for repeated linear factor $(ax+b)^k$)
        3.  $\frac{Ax+B}{ax^2+bx+c}$ (for distinct irreducible quadratic factor $ax^2+bx+c$)
        4.  $\frac{A_1x+B_1}{ax^2+bx+c} + \dots + \frac{A_mx+B_m}{(ax^2+bx+c)^m}$ (for repeated irreducible quadratic factor $(ax^2+bx+c)^m$)
    *   **The two key integral forms:**
        *   $\int \frac{1}{u} du = \ln|u| + C$
        *   $\int \frac{1}{u^2+a^2} du = \frac{1}{a} \arctan(\frac{u}{a}) + C$
    *   **When to use polynomial long division:** $\text{deg}(P) \ge \text{deg}(Q)$.

3.  **Spaced Repetition Schedule:**
    *   **Day 1:** Immediately after learning, review the entire process and work through 2-3 examples.
    *   **Day 3:** Review the decomposition rules (L-R-I-Q) and the two methods for finding coefficients. Work 1-2 new examples.
    *   **Day 7:** Focus on the trickier integration parts (irreducible quadratics) and common mistakes. Work 1-2 challenging examples.
    *   **Day 16:** Do a full problem from start to finish (including polynomial division if needed). Identify which steps you found most challenging.
    *   **Day 35:** Attempt a complex problem that combines all factor types. Try to explain the steps aloud as you go.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the specific forms of the partial fraction decomposition, remember the fundamental goal: to reverse the process of finding a common denominator.
    1.  **Start with the desired outcome:** A sum of simpler fractions.
    2.  **Consider how you'd add them:** You'd find a common denominator, which would be the product of the individual denominators.
    3.  **Work backward:** If your original denominator is $Q(x)$, its factors must be the denominators of your simpler fractions.
    4.  **Why the numerators are what they are:**
        *   For a linear factor $(x-a)$, if the numerator was anything more complex than a constant $A$, when you combine fractions, the degree of the resulting numerator would be too high. For example, $\frac{Ax+B}{x-a}$ is an improper fraction, which partial fractions aims to *avoid* in its basic terms. A constant $A$ is the simplest proper numerator.
        *   For a repeated factor $(x-a)^k$, you need terms for *all* powers because when you add fractions like $\frac{A}{x-a} + \frac{B}{(x-a)^2}$, the common denominator is $(x-a)^2$. If you only included $\frac{B}{(x-a)^2}$, you'd miss the possibility of a simpler $\frac{A}{x-a}$ component.
        *   For an irreducible quadratic factor $(x^2+ax+b)$, its derivative is $2x+a$. To allow for the possibility of a $\ln$ term after integration, and to make the numerator a proper form over a quadratic denominator, it must be a linear term $Ax+B$. A constant $A$ alone wouldn't allow for the $x$ term needed for the $\ln$ integral, nor would it cover all possible proper numerators.

This "why" helps you reconstruct the rules rather than just memorizing them.

## 10. Connections — what this leads to

Partial fractions is a cornerstone technique in several advanced mathematical and engineering fields:

1.  **Integration of Rational Functions (Primary Use):** This is the direct application. Without partial fractions, many rational functions would be impossible or exceedingly difficult to integrate using elementary functions. It effectively expands the class of functions we can integrate.

2.  **Laplace Transforms:** In differential equations, the Laplace transform converts differential equations into algebraic equations in the "s-domain." The solutions in the s-domain are often complex rational functions. To convert these solutions back to the time domain (using inverse Laplace transform), partial fraction decomposition is almost always required. This is critical for solving ordinary and partial differential equations in engineering, physics, and applied mathematics.

3.  **Z-Transforms:** Similar to Laplace transforms but for discrete-time systems. Z-transforms are used extensively in digital signal processing and discrete control systems. Partial fractions are used to decompose rational functions in the z-domain for inverse Z-transforms, allowing engineers to understand the time-domain behavior of digital filters and systems.

4.  **Control Systems Engineering:** As mentioned in applications, transfer functions (which are rational functions) are central to analyzing and designing control systems. Partial fraction decomposition allows engineers to identify the "modes" or "components" of a system's response (e.g., exponential decay, oscillations), which correspond to the poles of the transfer function. This is vital for stability analysis and controller design.

5.  **Differential Equations (Separation of Variables):** Sometimes, when solving first-order differential equations using separation of variables, the integral on one side might involve a rational function that requires partial fraction decomposition.

6.  **Numerical Analysis:** While partial fractions are an analytical technique, understanding the structure of rational functions through decomposition can inform numerical methods for approximating integrals or solving equations involving these functions.

## 11. Self-check questions

1.  Decompose $\frac{5x-1}{x^2-x-20}$ into partial fractions. (Do not integrate, just set up and solve for coefficients).
2.  Set up the partial fraction decomposition for $\frac{x^2+3x+1}{(x+1)^3(x-2)}$. (Do not solve for coefficients).
3.  Find the partial fraction decomposition of $\frac{3x^2+2x+1}{x(x^2+1)}$. (Solve for coefficients).
4.  Integrate $\int \frac{x^3-x^2+2x-1}{x^2+1} dx$.
5.  Set up the partial fraction decomposition for $\frac{x^4+x^3+x^2+1}{x(x^2+2)^2}$. (Do not solve for coefficients).