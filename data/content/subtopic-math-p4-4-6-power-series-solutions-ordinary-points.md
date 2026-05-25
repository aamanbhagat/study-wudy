## What it is
The power series method is a technique for finding an analytic solution to an ordinary differential equation (ODE) by assuming the solution can be expressed as an infinite polynomial, or power series. We then substitute this series into the ODE to determine the coefficients of the series. This lesson focuses on applying this method around an *ordinary point*, a point where the ODE's coefficients are well-behaved (analytic).

## Why it matters
Many fundamental equations in physics and engineering, such as Airy's equation ($y'' - xy = 0$) in quantum mechanics and optics, or Legendre's equation in electromagnetism, do not have solutions expressible in terms of elementary functions like sines, cosines, or exponentials. The power series method provides the primary tool for constructing and understanding the behavior of their solutions, which often define new special functions (e.g., Airy functions, Legendre polynomials).

## When to study it
You must be proficient with the following before proceeding:
1.  **Calculus II:** Power series, including Taylor series. You must be able to differentiate, integrate, and re-index power series without hesitation. You also need to understand the concept of a radius of convergence.
2.  **Linear ODEs:** The principle of superposition for linear homogeneous equations. Understand that a second-order linear homogeneous ODE has two linearly independent solutions, $y_1(x)$ and $y_2(x)$, and the general solution is $y(x) = C_1 y_1(x) + C_2 y_2(x)$.

If you are not comfortable shifting the index of a summation (e.g., rewriting $\sum_{n=2}^{\infty} n(n-1)c_n x^{n-2}$ so the power is $x^k$), stop and review that topic first. It is the single most common point of algebraic failure.

## How to study it (step by step)
1.  **Identify an Ordinary Point:** Put the linear ODE in standard form: $y'' + P(x)y' + Q(x)y = 0$. A point $x_0$ is an **ordinary point** if both $P(x)$ and $Q(x)$ are analytic at $x_0$. For now, think of "analytic" as meaning their Taylor series exist and converge to the function around $x_0$. For rational functions, this is true wherever the denominators are non-zero.
2.  **Assume the Solution Form:** Assume the solution $y(x)$ is a power series centered at $x_0$:
    $$y(x) = \sum_{n=0}^{\infty} c_n (x-x_0)^n$$
3.  **Differentiate and Substitute:** Differentiate the series term-by-term to find $y'$ and $y''$. Substitute these series for $y, y', y''$ into the ODE.
4.  **Combine into a Single Series:** Manipulate the resulting summations. This involves distributing any polynomial coefficients (like $x$ or $x^2$) into the sums and then **shifting indices** so that all sums are over the same power of $(x-x_0)$.
5.  **Find the Recurrence Relation:** Use the identity principle: if a power series equals zero over an interval, all its coefficients must be zero. Set the coefficient of the general term $(x-x_0)^k$ to zero. This gives you an algebraic equation, called the **recurrence relation**, that links higher-order coefficients ($c_{k+m}$) to lower-order ones ($c_k$).
6.  **Solve the Recurrence:** Use the recurrence relation to compute the coefficients $c_2, c_3, c_4, \dots$ in terms of the arbitrary initial coefficients, $c_0$ and $c_1$. These correspond to the initial conditions $y(x_0) = c_0$ and $y'(x_0) = c_1$.
7.  **Write the General Solution:** Group all terms with a $c_0$ and all terms with a $c_1$. This explicitly separates the solution into $y(x) = c_0 y_1(x) + c_1 y_2(x)$, revealing the two linearly independent solutions.

## Key ideas, with intuition
1.  **Functions are just infinite polynomials:** The core assumption is that even if we don't know what a solution "looks like" (e.g., $\sin(x)$), we can approximate it and ultimately represent it perfectly with an infinite polynomial (its Taylor series). We are not finding a pre-existing function; we are *constructing* the solution as a series from the ground up.
2.  **An ODE is a constraint on coefficients:** When you substitute the series into the ODE, you get a massive equation of power series. The only way for this equation to hold true for all $x$ is if the total coefficient for each power of $x$ ($x^0, x^1, x^2, \dots$) sums to zero. This turns a differential equation problem into an infinite set of algebraic equations for the coefficients. The recurrence relation is a compact way of writing this infinite set of equations.
    $$ \sum_{k=0}^{\infty} (\text{some formula involving } c_k\text{'s}) x^k = 0 \implies (\text{some formula involving } c_k\text{'s}) = 0 \text{ for all } k $$
3.  **Ordinary points guarantee convergence:** This is the central theorem. If you expand your series around an ordinary point $x_0$, the resulting power series solution is *guaranteed* to converge in an interval $(x_0-R, x_0+R)$, where $R$ is at least as large as the distance from $x_0$ to the nearest singular point (where $P(x)$ or $Q(x)$ blow up). This tells you the method is not just formal manipulation; it produces a legitimate, convergent function.

## Worked example
Find the general solution of Airy's equation, $y'' - xy = 0$, around the ordinary point $x_0 = 0$.

**Step 1 & 2: Assume solution form.**
The equation is in standard form $y'' - xy = 0$, so $P(x)=0$ and $Q(x)=-x$. Both are analytic everywhere, so $x_0=0$ is an ordinary point.
Assume $y(x) = \sum_{n=0}^{\infty} c_n x^n$.

**Step 3: Differentiate and substitute.**
$y'(x) = \sum_{n=1}^{\infty} n c_n x^{n-1}$
$y''(x) = \sum_{n=2}^{\infty} n(n-1) c_n x^{n-2}$

Substitute into the ODE:
$$ \sum_{n=2}^{\infty} n(n-1) c_n x^{n-2} - x \sum_{n=0}^{\infty} c_n x^n = 0 $$
$$ \sum_{n=2}^{\infty} n(n-1) c_n x^{n-2} - \sum_{n=0}^{\infty} c_n x^{n+1} = 0 $$

**Step 4: Combine into a single series.**
To combine these, we need the powers of $x$ to be the same. Let $k = n-2$ in the first sum, so $n=k+2$. When $n=2$, $k=0$.
Let $k = n+1$ in the second sum, so $n=k-1$. When $n=0$, $k=1$.

The ODE becomes:
$$ \sum_{k=0}^{\infty} (k+2)(k+1) c_{k+2} x^k - \sum_{k=1}^{\infty} c_{k-1} x^k = 0 $$

The first sum starts at $k=0$, the second at $k=1$. We must pull out the $k=0$ term from the first sum to make the summation ranges match.
For $k=0$: $(0+2)(0+1)c_{0+2}x^0 = 2c_2$.
$$ 2c_2 + \sum_{k=1}^{\infty} (k+2)(k+1) c_{k+2} x^k - \sum_{k=1}^{\infty} c_{k-1} x^k = 0 $$
$$ 2c_2 + \sum_{k=1}^{\infty} \left[ (k+2)(k+1) c_{k+2} - c_{k-1} \right] x^k = 0 $$

**Step 5: Find the recurrence relation.**
By the identity principle, all coefficients must be zero.
From the constant term: $2c_2 = 0 \implies c_2 = 0$.
From the coefficient of $x^k$ for $k \ge 1$:
$$ (k+2)(k+1) c_{k+2} - c_{k-1} = 0 $$
$$ c_{k+2} = \frac{c_{k-1}}{(k+2)(k+1)} \quad \text{for } k \ge 1 $$

**Step 6: Solve the recurrence.**
We express all coefficients in terms of $c_0$ and $c_1$.
$c_0, c_1$ are arbitrary.
$c_2 = 0$ (from the initial term).

For $k=1: c_3 = \frac{c_0}{(3)(2)} = \frac{c_0}{6}$
For $k=2: c_4 = \frac{c_1}{(4)(3)} = \frac{c_1}{12}$
For $k=3: c_5 = \frac{c_2}{(5)(4)} = 0$ (since $c_2=0$)
For $k=4: c_6 = \frac{c_3}{(6)(5)} = \frac{c_0/6}{30} = \frac{c_0}{180}$
For $k=5: c_7 = \frac{c_4}{(7)(6)} = \frac{c_1/12}{42} = \frac{c_1}{504}$
For $k=6: c_8 = \frac{c_5}{(8)(7)} = 0$

Notice the pattern: coefficients $c_{3n+2}$ are all zero. The others depend on $c_0$ or $c_1$.

**Step 7: Write the general solution.**
$y(x) = c_0 + c_1 x + c_2 x^2 + c_3 x^3 + c_4 x^4 + \dots$
Group by $c_0$ and $c_1$:
$$ y(x) = c_0 \left( 1 + \frac{1}{6}x^3 + \frac{1}{180}x^6 + \dots \right) + c_1 \left( x + \frac{1}{12}x^4 + \frac{1}{504}x^7 + \dots \right) $$
This is the general solution, with $y_1(x)$ being the series in the first parenthesis and $y_2(x)$ in the second. These are the Airy functions, Ai(x) and Bi(x), up to a normalization constant.

*Reflection:* Each step was mechanical. The crucial creative step is assuming the series form. The rest is careful algebraic bookkeeping, especially re-indexing the series. The recurrence relation is the engine that generates the solution from the initial seeds $c_0$ and $c_1$.

## Diagrams
This diagram shows how the first few partial sums of a power series solution begin to approximate the true (but unknown) solution curve near the expansion point $x_0$.

```text
       y
       ^
       |
       |           /
       |         -/---- S_2(x) (parabola)
       |        / /
       |      / /
       |-----/--/-----------> x
       |    /  / x_0
       |   /  /
       |  /  /
       | /  /----- S_1(x) (line)
       |/ /
      / /-- S_0(x) (constant)
     / /
    / /<-- True solution y(x)
   / /
```
The diagram illustrates that $S_N(x) = \sum_{n=0}^{N} c_n (x-x_0)^n$ gets closer to the real solution $y(x)$ as $N$ increases, especially near $x_0$.

## Memory technique — remember this forever
1.  **The Mnemonic: "Assume, Sub, Shift, Solve"**
    *   **Assume:** Assume the power series solution $y = \sum c_n x^n$.
    *   **Sub:** Differentiate and Substitute into the ODE.
    *   **Shift:** Shift indices to combine everything into one big $\sum [\dots]x^k = 0$.
    *   **Solve:** Solve the recurrence relation $[\dots]=0$ for the coefficients.

2.  **Must-Overlearn Formulas:**
    *   Standard Form: $y'' + P(x)y' + Q(x)y = 0$. (To identify ordinary points).
    *   Solution Ansatz: $y(x) = \sum_{n=0}^{\infty} c_n (x-x_0)^n$. (The starting assumption).
    *   Derivatives: $y'(x) = \sum_{n=1}^{\infty} n c_n (x-x_0)^{n-1}$, $y''(x) = \sum_{n=2}^{\infty} n(n-1) c_n (x-x_0)^{n-2}$.

3.  **Spaced Repetition Schedule:**
    *   Review this entire lesson and work one new problem in **1 day**.
    *   Work another problem in **3 days**.
    *   Review the "Key Ideas" and work a harder problem in **7 days**.
    *   Re-derive the Airy's equation solution from scratch in **16 days**.
    *   Explain the method to a friend (or a rubber duck) in **35 days**.

4.  **First Principles Pathway:**
    If you forget everything, remember this: A solution can be represented by its Taylor series around a point $x_0$. The coefficients of that series are $c_n = y^{(n)}(x_0)/n!$. The ODE gives you a way to find all higher derivatives $y''(x_0), y'''(x_0), \dots$ in terms of the initial values $y(x_0)$ and $y'(x_0)$. The power series method is just a more systematic, algebraic way of doing exactly this without computing derivative after derivative.

## Common mistakes
1.  **Index Shifting Errors:** The most common mistake. When changing index from $n$ to $k$, for example $k=n-2$, you must change the summation limits, the coefficient index ($c_n \to c_{k+2}$), and the terms in front ($n(n-1) \to (k+2)(k+1)$). Forgetting any one of these will corrupt the recurrence relation.
2.  **Mishandling Initial Terms:** When combining sums that start at different indices (like our worked example where one sum started at $k=0$ and the other at $k=1$), failing to peel off the extra terms before combining the summations.
3.  **Incorrect Recurrence Logic:** A recurrence like $c_{k+2} = f(c_{k-1})$ relates coefficients that are three steps apart. This means there will be three independent "ladders" of coefficients: one starting from $c_0$, one from $c_1$, and one from $c_2$. A common mistake is to assume all coefficients depend on just $c_0$ and $c_1$.

## Self-check
1.  Find the recurrence relation for the solution to the first-order ODE $y' - y = 0$ centered at $x_0=0$. Verify that it generates the coefficients for $y=ce^x$.
2.  Find the first four non-zero terms in the power series solution for the initial value problem $y'' - x^2 y' - y = 0$, with $y(0)=1, y'(0)=0$.
3.  Consider the equation $(x^2+1)y'' + xy' - y = 0$. Without solving the equation, what is the minimum guaranteed radius of convergence for a power series solution centered at (a) $x_0 = 0$? (b) $x_0 = 2$?