## What it is
Integration is the inverse operation of differentiation. The basic integration rules provide the antiderivatives for the most common functions—power functions, simple trigonometric functions, exponentials, and the reciprocal function—forming the fundamental toolkit for calculating integrals. An indefinite integral, denoted $\int f(x) dx$, asks for the family of functions whose derivative is $f(x)$.

## Why it matters
These rules are the alphabet of calculus. In aerospace, calculating the total fuel consumed by a rocket with varying thrust requires integrating the mass flow rate over time. In physics, finding the electric potential from an electric field involves integrating the field over distance. In machine learning, calculating the cumulative distribution function from a probability density function is a direct application of integration, essential for statistical modeling.

## When to study it
You must have mastered differential calculus first. Specifically, be fluent with the derivatives of polynomials (power rule), trigonometric functions ($\sin x, \cos x, \tan x, \sec x$), the natural exponential function ($e^x$), and the natural logarithm ($\ln x$). You should also understand the concept of an antiderivative and the statement of the Fundamental Theorem of Calculus.

## How to study it (step by step)
1.  **Reverse Differentiation:** On a sheet of paper, write down the differentiation rules for $x^n$, $\sin(x)$, $\cos(x)$, $e^x$, and $\ln|x|$. For each rule, write next to it the corresponding "inverse" statement, which is the integration rule. This directly connects what you know to what you are learning.
2.  **Derive the Power Rule:** Start with the differentiation rule $\frac{d}{dx} x^{n+1} = (n+1)x^n$. Algebraically solve for an expression whose derivative is $x^n$. This will force you to divide by $(n+1)$, revealing why the integration power rule is $\int x^n dx = \frac{x^{n+1}}{n+1} + C$ and why it fails for $n=-1$.
3.  **Tackle the $n=-1$ Case:** Investigate $\int x^{-1} dx = \int \frac{1}{x} dx$. Recall that $\frac{d}{dx} \ln(x) = \frac{1}{x}$ for $x>0$. Now consider $\frac{d}{dx} \ln(-x)$ for $x<0$. Use the chain rule to show it is also $\frac{1}{x}$. This justifies the general form $\int \frac{1}{x} dx = \ln|x| + C$.
4.  **Memorize Trig Pairs:** The derivatives of $\sin(x)$ and $\cos(x)$ are a cycle. Write out the derivatives and integrals side-by-side to see the sign changes. $\frac{d}{dx}\sin(x) = \cos(x)$ implies $\int \cos(x) dx = \sin(x) + C$. But $\frac{d}{dx}\cos(x) = -\sin(x)$ implies $\int \sin(x) dx = -\cos(x) + C$. Drill this sign difference.
5.  **Solve Atomic Problems:** Work through 15-20 single-term problems, such as $\int x^5 dx$, $\int 3e^x dx$, $\int \frac{dx}{2x}$, $\int -4\sin(x) dx$. Focus on flawless application of one rule at a time.
6.  **Combine with Linearity:** Practice on 5-10 multi-term problems like $\int (x^2 + \cos(x) - \frac{1}{x}) dx$. Use the fact that the integral of a sum is the sum of the integrals to break the problem down into the atomic pieces you mastered in the previous step.

## Key ideas, with intuition
1.  **The Antiderivative is a Family of Functions:** The derivative of $x^2$ is $2x$. But the derivative of $x^2+5$ is also $2x$, as is the derivative of $x^2 - 100$. Since the derivative of any constant is zero, the antiderivative is not a single function, but an infinite family of functions that are vertical shifts of one another. We capture this entire family with the constant of integration, "$+C$".
    $$ \frac{d}{dx} \left( F(x) + C \right) = f(x) $$
2.  **The Power Rule is Reverse Engineering:** For differentiation, you multiply by the power and then decrease the power by one ($x^n \to nx^{n-1}$). To reverse this, you must do the opposite operations in the opposite order: first, increase the power by one, then divide by the new power.
    $$ \int x^n dx = \frac{x^{n+1}}{n+1} + C \quad (\text{for } n \neq -1) $$
3.  **The Logarithm Fills the Power Rule's Gap:** The power rule for integration fails when $n=-1$, as it would lead to division by zero. This is a special case. The function whose derivative "fills this gap" is the natural logarithm. The derivative of $\ln|x|$ is $\frac{1}{x}$, so the integral of $\frac{1}{x}$ is $\ln|x|+C$.
    $$ \int x^{-1} dx = \int \frac{1}{x} dx = \ln|x| + C $$
4.  **$e^x$ is its Own Antiderivative:** The function $e^x$ is unique in that its derivative is itself. It follows directly that its antiderivative is also itself (plus the constant of integration). It is the fixed point of both differentiation and integration.
    $$ \int e^x dx = e^x + C $$

## Worked example
Calculate the indefinite integral $\int (6x^2 - \frac{5}{x} + 2\cos(x)) dx$.

**Step 1: Apply the Linearity Property**
The integral of a sum/difference is the sum/difference of the integrals. We can break the problem into simpler parts. We can also pull out constant multiples.
$$ \int (6x^2 - \frac{5}{x} + 2\cos(x)) dx = \int 6x^2 dx - \int \frac{5}{x} dx + \int 2\cos(x) dx $$
$$ = 6\int x^2 dx - 5\int \frac{1}{x} dx + 2\int \cos(x) dx $$
*Reflection:* This step simplifies a complex problem into three basic integrals that we know how to solve individually.

**Step 2: Solve each integral using the basic rules**
*   For the first term, use the power rule $\int x^n dx = \frac{x^{n+1}}{n+1} + C$ with $n=2$.
    $$ 6\int x^2 dx = 6 \left( \frac{x^{2+1}}{2+1} \right) = 6 \left( \frac{x^3}{3} \right) = 2x^3 $$
*   For the second term, use the logarithm rule $\int \frac{1}{x} dx = \ln|x| + C$.
    $$ -5\int \frac{1}{x} dx = -5 \ln|x| $$
*   For the third term, use the cosine rule $\int \cos(x) dx = \sin(x) + C$.
    $$ 2\int \cos(x) dx = 2\sin(x) $$
*Reflection:* Each step is a direct application of a memorized rule. The key is to correctly identify which rule applies to each term.

**Step 3: Combine the results and add the constant of integration**
Combine the antiderivatives of each term. Since each integral technically produces its own constant ($C_1, C_2, C_3$), we can combine them into a single arbitrary constant $C = C_1 - C_2 + C_3$.
$$ 2x^3 - 5\ln|x| + 2\sin(x) + C $$
*Reflection:* We only need one $+C$ at the end to represent the entire family of antiderivative functions. Forgetting it is a critical error for indefinite integrals.

## Diagrams
Here is a diagram illustrating the constant of integration, $+C$. The functions $F(x)=x^2+2$, $F(x)=x^2$, and $F(x)=x^2-1$ are all antiderivatives of $f(x)=2x$. They are the same parabola, just shifted vertically. At any given $x$-value (like $x=1$), the slope of the tangent line is the same for all three curves.

```text
      y
      ^
      |
    4 +       /
      |      / F(x)=x^2+2
    3 +     #
      |    /
    2 +---#-------  <-- slope at x=1 is 2
      |  / F(x)=x^2
    1 + #
      |/
--#---#---#---#--> x
 -1   0   1   2
    -1+  # F(x)=x^2-1
      |
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of differentiation as "breaking down" a function (making it simpler, e.g., $x^3 \to 3x^2$). Integration is "building up" or "accumulating". To build up $x^n$, you first make it bigger (raise the power to $n+1$) and then adjust for the new structure (divide by $n+1$). For trig functions, remember the derivative cycle: $\sin \to \cos \to -\sin \to -\cos \to \sin$. Differentiation moves you forward (clockwise) in this cycle; integration moves you backward (counter-clockwise). So $\int \cos(x) dx = \sin(x)$ and $\int \sin(x) dx = -\cos(x)$.

2.  **Must Overlearn:**
    *   $\int x^n dx = \frac{x^{n+1}}{n+1} + C$, for $n \neq -1$
    *   $\int \frac{1}{x} dx = \ln|x| + C$
    *   $\int e^x dx = e^x + C$
    *   $\int \sin(x) dx = -\cos(x) + C$
    *   $\int \cos(x) dx = \sin(x) + C$

3.  **Spaced Repetition Schedule:** Review these rules and solve one problem of each type on this schedule: **1 day, 3 days, 7 days, 16 days, 35 days**.

4.  **First Principles Pathway:** If you forget an integration rule, use the definition. To find $\int f(x) dx$, ask yourself: "What function, $F(x)$, when I take its derivative, gives me $f(x)$?" Guess an answer, then differentiate it to check. For $\int \sec^2(x) dx$, you might guess $\tan(x)$. Check: $\frac{d}{dx}\tan(x) = \sec^2(x)$. Correct. So $\int \sec^2(x) dx = \tan(x) + C$.

## Common mistakes
1.  **Forgetting $+C$:** This is the most common error. An indefinite integral represents a *family* of functions, not a single one. Omitting the $+C$ is conceptually incorrect.
2.  **Power Rule Errors:** Adding 1 to the exponent but forgetting to divide by the *new* exponent. For example, writing $\int x^3 dx = x^4 + C$. The correct answer is $\frac{x^4}{4} + C$.
3.  **Trigonometric Sign Errors:** Mixing up the signs for sine and cosine. Remember, since $\frac{d}{dx}\cos(x) = -\sin(x)$, the integral of $\sin(x)$ must have a negative sign to cancel it out: $\int \sin(x) dx = -\cos(x) + C$.
4.  **Incorrect Log Rule Domain:** Writing $\int \frac{1}{x} dx = \ln(x) + C$. This is only valid for $x>0$. The function $\frac{1}{x}$ is defined for all $x \neq 0$. The correct antiderivative that covers both positive and negative domains is $\ln|x| + C$.

## Self-check
1.  Find the indefinite integral: $\int (8t^3 - \frac{1}{2\sqrt{t}} + 1) dt$.
2.  Evaluate: $\int (3e^x - 5\sec^2(x) + \frac{7}{x}) dx$.
3.  A particle's acceleration is given by $a(t) = 12t - \sin(t)$. If its initial velocity is $v(0)=3$ and its initial position is $s(0)=-5$, find its position function $s(t)$.