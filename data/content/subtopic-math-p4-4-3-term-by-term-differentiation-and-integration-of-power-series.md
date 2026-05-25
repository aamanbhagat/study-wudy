## What it is
Term-by-term differentiation and integration is the process of applying calculus operations to a power series as if it were a giant polynomial. You simply differentiate or integrate each term of the series individually to get a new power series that represents the derivative or integral of the original function. This powerful technique is valid within the series's open interval of convergence.

## Why it matters
This is not just a theoretical curiosity; it's a fundamental tool for solving problems that are otherwise intractable. In physics and aerospace engineering, many differential equations describing phenomena like heat flow, wave propagation, or orbital mechanics (e.g., Bessel's equation, Legendre's equation) do not have simple "closed-form" solutions. Representing the solution as a power series and using term-by-term operations allows us to find an accurate, computable approximation. In computer science, this is the basis for how libraries compute functions like $\sin(x)$ or $e^x$—by using their rapidly converging power series representations.

## When to study it
Before tackling this, you must be completely fluent with the following. If you are not, stop and review them.
1.  **Power Series Definition:** You must know what a power series is, in the form $\sum_{n=0}^{\infty} c_n (x-a)^n$.
2.  **Radius and Interval of Convergence:** You must be able to find the radius $R$ and the full interval of convergence for a power series, typically using the Ratio Test, and you must know how to test the endpoints separately.
3.  **Polynomial Calculus:** Basic differentiation and integration rules (e.g., the Power Rule) must be second nature.
4.  **Geometric Series:** You should instantly recognize $\sum_{n=0}^{\infty} ar^n = \frac{a}{1-r}$ and its conditions for convergence.

## How to study it (step by step)
1.  **Reinforce the Analogy:** Write down a simple 5th-degree polynomial, $P(x) = c_0 + c_1x + c_2x^2 + c_3x^3 + c_4x^4 + c_5x^5$. Differentiate it. Integrate it. Notice you just operated on each term. Now, write down a power series and see it as an "infinite polynomial." The core idea is that this simple process still works.
2.  **State and Absorb the Theorem:** Read the formal theorem for term-by-term differentiation and integration. The key takeaway is: If a power series $f(x) = \sum c_n(x-a)^n$ has a radius of convergence $R > 0$, then its derivative and integral also have the *exact same radius of convergence* $R$. The behavior at the endpoints $x = a \pm R$ might change and must be re-checked.
3.  **Derive a New Series from an Old One:** Start with the well-known geometric series $f(x) = \frac{1}{1-x} = \sum_{n=0}^{\infty} x^n$, which converges for $|x|<1$.
    *   Differentiate both sides. The derivative of $\frac{1}{1-x}$ is $\frac{1}{(1-x)^2}$. Differentiate the series term-by-term: $\frac{d}{dx} \sum_{n=0}^{\infty} x^n = \sum_{n=1}^{\infty} nx^{n-1}$. You have just derived the power series for $\frac{1}{(1-x)^2}$.
    *   Integrate both sides. The integral of $\frac{1}{1-x}$ is $-\ln(1-x)$. Integrate the series term-by-term: $\int \sum_{n=0}^{\infty} x^n dx = C + \sum_{n=0}^{\infty} \frac{x^{n+1}}{n+1}$. You have just derived the power series for $\ln(1-x)$.
4.  **Practice with Endpoint Analysis:** Take the series you just found for $\ln(1-x)$. Its radius of convergence is $R=1$. Now, check the endpoints. What happens at $x=1$? At $x=-1$? Compare this to the endpoint behavior of the original geometric series. This will solidify the "same radius, but check endpoints" rule.
5.  **Solve a Simple ODE:** Try to find a series solution for $y' = 2xy$ with $y(0)=1$. Assume the solution is a power series $y = \sum_{n=0}^{\infty} c_n x^n$. Differentiate it term-by-term to get $y'$, plug both series into the ODE, and solve for the coefficients $c_n$. This is a preview of a major application.

## Key ideas, with intuition
1.  **Power Series are "Infinitely Long Polynomials":** This is the central intuition. Almost everything you can do with a regular polynomial (differentiate, integrate, add, multiply) you can do with a power series, as long as you stay within its interval of convergence. The machinery of calculus that works for finite sums extends remarkably well to these specific infinite sums.
2.  **Convergence Defines the Domain:** A power series isn't just a symbolic expression; it represents a function on a specific domain—its interval of convergence. Performing calculus on the series gives you a new series that represents the derivative/integral of the function, but only on that same core interval. Outside this interval, the series are divergent nonsense.
3.  **The Radius of Convergence is Robust:**
    $$
    \text{If } f(x) = \sum_{n=0}^{\infty} c_n (x-a)^n \text{ has radius } R,
    $$
    $$
    \text{then } f'(x) = \sum_{n=1}^{\infty} n c_n (x-a)^{n-1} \text{ also has radius } R,
    $$
    $$
    \text{and } \int f(x) dx = C + \sum_{n=0}^{\infty} \frac{c_n}{n+1} (x-a)^{n+1} \text{ also has radius } R.
    $$
    Intuitively, differentiation and integration are "local" operations. They depend on the behavior of the function in a tiny neighborhood. The radius of convergence is determined by the "global" behavior of the coefficients $c_n$ as $n \to \infty$. The factors of $n$ or $\frac{1}{n+1}$ introduced by calculus are not strong enough to change the exponential-level rate of convergence determined by the Ratio Test, so the radius remains fixed. The endpoints, where convergence is delicate, are another story.

## Worked example
**Problem:** Find a power series representation for $f(x) = \arctan(x)$.

**Solution:**
1.  **Recall a related function.** We don't know the series for $\arctan(x)$ directly, but we know its derivative: $f'(x) = \frac{1}{1+x^2}$. This function looks much more familiar.

2.  **Find the series for the derivative.** We can express $\frac{1}{1+x^2}$ using the geometric series formula $\frac{1}{1-u} = \sum_{n=0}^{\infty} u^n$. We let $u = -x^2$.
    $$
    f'(x) = \frac{1}{1-(-x^2)} = \sum_{n=0}^{\infty} (-x^2)^n = \sum_{n=0}^{\infty} (-1)^n x^{2n}
    $$
    This is valid when $|u| < 1$, which means $|-x^2| < 1$, or $|x| < 1$. The radius of convergence is $R=1$.

3.  **Integrate the series term-by-term.** Since $f(x) = \int f'(x) dx$, we can integrate the power series we just found.
    $$
    \arctan(x) = \int \left( \sum_{n=0}^{\infty} (-1)^n x^{2n} \right) dx
    $$
    We bring the integral inside the sum:
    $$
    \arctan(x) = C + \sum_{n=0}^{\infty} (-1)^n \int x^{2n} dx
    $$
    $$
    \arctan(x) = C + \sum_{n=0}^{\infty} (-1)^n \frac{x^{2n+1}}{2n+1}
    $$

4.  **Solve for the constant of integration, $C$.** We use an initial value. We know that $\arctan(0) = 0$. Let's plug $x=0$ into our series representation:
    $$
    \arctan(0) = C + \sum_{n=0}^{\infty} (-1)^n \frac{0^{2n+1}}{2n+1} = C + 0 = C
    $$
    So, $C=0$.

5.  **State the final result and interval of convergence.** The final power series is:
    $$
    \arctan(x) = \sum_{n=0}^{\infty} (-1)^n \frac{x^{2n+1}}{2n+1} = x - \frac{x^3}{3} + \frac{x^5}{5} - \frac{x^7}{7} + \cdots
    $$
    The theorem guarantees the radius of convergence is the same as the series for the derivative, so $R=1$. The interval is at least $(-1, 1)$. (A check of the endpoints shows it actually converges for $x=\pm 1$, but the core technique focuses on the radius).

**Reflection:** This worked because we transformed a harder problem (finding the series for $\arctan(x)$) into an easier one (recognizing the series for its derivative) and then used the rules of term-by-term calculus to reverse the process.

## Diagrams
This diagram shows how the interval of convergence is affected by differentiation or integration. The radius $R$ is preserved, but the behavior at the endpoints $a-R$ and $a+R$ must be re-evaluated.

```text
Original Series f(x):
Interval of Convergence: [-----)
<-----+-----------+-----------+----->
    a-R           a           a+R
   (Converges) (Open Interval) (Diverges)
   (Endpoint must be tested)

Differentiated Series f'(x) or Integrated Series F(x):
Radius is THE SAME.
Interval of Convergence: (-----)  <-- Example: Endpoint might become divergent
<-----+-----------+-----------+----->
    a-R           a           a+R
   (Diverges)  (Open Interval) (Diverges)
   (Endpoint must be re-tested)
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Calculus on a series is a series of calculus." This means to find the derivative of a series, you just take the series of the derivatives of each term. It's as simple as it sounds.

2.  **Formulas to Overlearn:**
    Let $f(x) = \sum_{n=0}^{\infty} c_n (x-a)^n$ with radius of convergence $R>0$.
    *   **Differentiation:** $f'(x) = \sum_{n=1}^{\infty} n c_n (x-a)^{n-1}$ (Radius is $R$)
    *   **Integration:** $\int f(x) dx = C + \sum_{n=0}^{\infty} c_n \frac{(x-a)^{n+1}}{n+1}$ (Radius is $R$)

3.  **Spaced Repetition Schedule:**
    *   Review these formulas and the "Calculus on a series..." mnemonic tomorrow (1 day).
    *   Solve one integration and one differentiation problem in 3 days.
    *   Re-derive the series for $\arctan(x)$ from scratch in 7 days.
    *   Review again at 16 days and 35 days.

4.  **First Principles Pathway:** If you forget the rules, fall back to the **polynomial analogy**. Write down $P(x) = c_0 + c_1x + c_2x^2 + c_3x^3$. How do you find $P'(x)$? You apply the power rule to each term. The formal rule for power series is just a direct extension of that. The only thing you can't re-derive easily is the proof that the radius of convergence is preserved, but for applying the technique, the analogy is all you need.

## Common mistakes
1.  **Forgetting to Check Endpoints:** Students correctly remember that the radius $R$ is unchanged but incorrectly assume the interval of convergence is identical. An interval that was closed `[` might become open `(`, or vice-versa. Always re-test the endpoints for the new series.
2.  **Index Errors:** When differentiating $\sum_{n=0}^{\infty} c_n x^n$, the $n=0$ term is a constant ($c_0$) and its derivative is zero. The new sum must start at $n=1$: $\sum_{n=1}^{\infty} n c_n x^{n-1}$. A common mistake is to leave the index starting at $n=0$, which is incorrect.
3.  **Forgetting the Constant of Integration:** When performing term-by-term integration, do not forget to add the constant $C$. You must solve for it using a known value of the function, often at the center of the series (e.g., at $x=a$).

## Self-check
1.  The power series for $\sin(x)$ is $\sum_{n=0}^{\infty} (-1)^n \frac{x^{2n+1}}{(2n+1)!}$. Differentiate this series term-by-term and show that you obtain the series for $\cos(x)$.
2.  Find a power series for the function $g(x) = \ln(1+x)$ by first finding the series for its derivative, $g'(x)$, and then integrating term-by-term. State the radius of convergence.
3.  The Bessel function of order 0, $J_0(x)$, is defined by the power series $J_0(x) = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n}}{2^{2n}(n!)^2}$. Show that it satisfies the differential equation $x^2 y'' + xy' + x^2 y = 0$.