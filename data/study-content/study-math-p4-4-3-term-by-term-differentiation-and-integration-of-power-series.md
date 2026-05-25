## 1. What it is — in plain English

Imagine you have a really long polynomial, one that goes on forever! We call this a "power series." It looks something like $c_0 + c_1x + c_2x^2 + c_3x^3 + \dots$, where the $c$ values are just numbers. Now, what if you wanted to find the derivative of this endless polynomial, or its integral?

Normally, you'd apply the power rule to each term: the derivative of $x^2$ is $2x$, the integral of $x^3$ is $x^4/4$, and so on. "Term-by-term differentiation and integration" simply means we can do *exactly that* for these infinite polynomials. We just go through the list of terms, one by one, and apply the usual calculus rules to each individual piece.

It's like having a very long conveyor belt of mathematical expressions. If you need to transform each item on the belt (say, differentiate it), you just pick up one item, apply the rule, put it back, and move to the next. You don't need a special, complicated rule for the *entire infinite sum* at once; the simple rules for polynomials work perfectly well for each term individually. The amazing part is that this process works, and the resulting series behaves just as nicely as the original one, at least within its "zone of usefulness."

## 2. Why it matters — real-world applications

The ability to differentiate and integrate power series term by term is not just a mathematical curiosity; it's a foundational tool across science and engineering.

1.  **Solving Differential Equations (Physics & Engineering):** Many real-world phenomena are described by differential equations that cannot be solved using standard techniques. For instance, the behavior of a vibrating drumhead, the quantum mechanical description of an electron in a hydrogen atom, or the flow of heat in a complex material often lead to equations like Bessel's equation or Legendre's equation. Power series methods allow us to find series solutions to these differential equations, providing accurate approximations of the behavior of these systems. Engineers use these solutions to design everything from audio speakers to nuclear reactors.

2.  **Approximating Complex Functions (Computer Science & Machine Learning):** Computers can't directly calculate values for functions like $\sin(x)$, $e^x$, or $\ln(x)$ with infinite precision. Instead, they use polynomial approximations, which are essentially truncated Taylor series (a specific type of power series). Term-by-term differentiation and integration allow us to derive these series for new functions from existing ones. For example, if you know the series for $\frac{1}{1-x}$, you can integrate it term by term to get the series for $\ln(1-x)$. In machine learning, activation functions (like sigmoid or tanh) are often approximated by polynomials for faster computation, especially in embedded systems or specialized hardware.

3.  **Numerical Analysis and High-Precision Computation (Aerospace & Finance):** When extremely precise calculations are needed, such as for satellite trajectory calculations in aerospace or complex financial models, series representations are invaluable. Integrals that are impossible to evaluate in closed form (like $\int e^{-x^2} dx$, which is crucial for probability distributions) can be represented as power series and then integrated term by term. This allows for arbitrary precision calculations by simply taking more terms in the series.

4.  **Signal Processing and Control Systems (Electrical Engineering):** Control systems, which are ubiquitous in modern technology (e.g., controlling aircraft, robots, or industrial processes), often rely on understanding how systems respond to inputs over time. This involves differential equations and their solutions. Power series provide a way to analyze and synthesize filters and controllers, especially when dealing with non-linear systems, by allowing engineers to manipulate and transform complex functions representing system dynamics.

## 3. Prerequisites — what you must know first

Before diving into term-by-term differentiation and integration of power series, ensure you have a solid grasp of these fundamental concepts:

*   **Derivatives of basic functions:** How to find derivatives of $x^n$, $\sin x$, $\cos x$, $e^x$, $\ln x$, etc.
*   **Integrals of basic functions:** How to find antiderivatives of $x^n$, $\sin x$, $\cos x$, $e^x$, $1/x$, etc.
*   **Power Rule for differentiation:** The rule $\frac{d}{dx}(x^n) = nx^{n-1}$.
*   **Power Rule for integration:** The rule $\int x^n dx = \frac{x^{n+1}}{n+1} + C$ (for $n \neq -1$).
*   **Geometric Series:** Understanding the form $\sum_{n=0}^\infty ar^n$ and its sum $\frac{a}{1-r}$ for $|r|<1$.
*   **Taylor and Maclaurin Series:** How to construct them, and that they represent functions as infinite polynomials.
*   **Convergence of Series (Ratio Test, Root Test):** How to determine the radius and interval of convergence for a given series.
*   **Properties of Series:** Linearity of summation, i.e., $\sum (a_n \pm b_n) = \sum a_n \pm \sum b_n$ and $\sum c \cdot a_n = c \sum a_n$.
*   **Index Shifting for Series:** How to re-index a summation without changing its value.

If any of these feel unfamiliar, pause here and review them. They are the building blocks for this topic.

## 4. The core idea — step by step

Let's break down the core idea of term-by-term differentiation and integration of power series. The key is that power series behave very much like regular polynomials within their "zone of convergence," allowing us to apply familiar calculus rules.

### Step 1: What is a Power Series?

*   **Plain English:** A power series is essentially an infinitely long polynomial. Instead of stopping at $x^2$ or $x^3$, it keeps going forever, with terms like $x^n$ for every $n$. Each $x^n$ term has a constant coefficient in front of it. It's usually "centered" around a specific value, $a$, meaning the terms are $(x-a)^n$.

*   **Small concrete example:**
    The series $1 + x + x^2 + x^3 + \dots$ is a power series centered at $a=0$.
    The series $1 + 2(x-1) + 3(x-1)^2 + 4(x-1)^3 + \dots$ is a power series centered at $a=1$.

*   **Formal/mathematical version:**
    A power series centered at $a$ is an expression of the form:
    $$ \sum_{n=0}^\infty c_n (x-a)^n = c_0 + c_1(x-a) + c_2(x-a)^2 + c_3(x-a)^3 + \dots $$
    where $c_n$ are constants (the coefficients) and $x$ is a variable. When $a=0$, it's called a Maclaurin series:
    $$ \sum_{n=0}^\infty c_n x^n = c_0 + c_1 x + c_2 x^2 + c_3 x^3 + \dots $$

*   **What could go wrong:** Confusing a power series with other types of infinite series, like Fourier series (which use sines and cosines) or general series $\sum a_n$. The special polynomial structure of power series is what makes term-by-term operations possible in this straightforward way.

### Step 2: The Big Idea - Treat it like a finite polynomial (within its convergence).

*   **Plain English:** The remarkable truth is that as long as a power series converges to a function $f(x)$ in some interval, we can differentiate or integrate $f(x)$ by simply differentiating or integrating each term of its series representation individually. It's as if the "infinite sum" behaves just like a finite sum when it comes to these operations.

*   **Small concrete example:**
    If $f(x) = c_0 + c_1 x + c_2 x^2 + c_3 x^3 + \dots$, then:
    To differentiate $f(x)$, we differentiate each term:
    $f'(x) = \frac{d}{dx}(c_0) + \frac{d}{dx}(c_1 x) + \frac{d}{dx}(c_2 x^2) + \frac{d}{dx}(c_3 x^3) + \dots$
    $f'(x) = 0 + c_1 + 2c_2 x + 3c_3 x^2 + \dots$
    To integrate $f(x)$, we integrate each term:
    $\int f(x) dx = \int c_0 dx + \int c_1 x dx + \int c_2 x^2 dx + \int c_3 x^3 dx + \dots$
    $\int f(x) dx = C + c_0 x + \frac{c_1}{2} x^2 + \frac{c_2}{3} x^3 + \frac{c_3}{4} x^4 + \dots$

*   **Formal/mathematical version:**
    If the power series $f(x) = \sum_{n=0}^\infty c_n (x-a)^n$ has a radius of convergence $R > 0$, then $f(x)$ is differentiable and integrable on the interval $(a-R, a+R)$, and its derivative and integral can be found by differentiating and integrating term by term.

*   **What could go wrong:** This property does *not* hold for all infinite series. It's a special and powerful property of power series. Applying this idea blindly to other types of series (e.g., Fourier series without proper justification, or series that don't converge uniformly) can lead to incorrect results.

### Step 3: Differentiation - The Power Rule applies to each term.

*   **Plain English:** When you differentiate a power series, you simply take the derivative of each individual $(x-a)^n$ term using the standard power rule. The constant coefficient $c_n$ just stays along for the ride. The constant term $c_0$ disappears, so the sum typically starts from $n=1$ in the new series.

*   **Small concrete example:**
    Consider the series for $\frac{1}{1-x} = \sum_{n=0}^\infty x^n = 1 + x + x^2 + x^3 + \dots$
    Differentiating term by term:
    $\frac{d}{dx}(1) = 0$
    $\frac{d}{dx}(x) = 1$
    $\frac{d}{dx}(x^2) = 2x$
    $\frac{d}{dx}(x^3) = 3x^2$
    ...
    So, the derivative series is $0 + 1 + 2x + 3x^2 + \dots = \sum_{n=1}^\infty n x^{n-1}$.
    Notice the index shift: the $n=0$ term ($c_0$) vanishes, so the sum effectively starts from $n=1$.

*   **Formal/mathematical version:**
    If $f(x) = \sum_{n=0}^\infty c_n (x-a)^n$, then
    $$ f'(x) = \frac{d}{dx} \left( c_0 + c_1(x-a) + c_2(x-a)^2 + c_3(x-a)^3 + \dots \right) $$
    $$ f'(x) = 0 + c_1 + 2c_2(x-a) + 3c_3(x-a)^2 + \dots $$
    This can be written in summation notation as:
    $$ f'(x) = \sum_{n=1}^\infty n c_n (x-a)^{n-1} $$
    (Note: The term for $n=0$ in the original sum, $c_0$, is a constant and its derivative is $0$. So the new sum starts from $n=1$.)

*   **What could go wrong:** Forgetting to adjust the starting index of the summation. While mathematically $n \cdot c_n (x-a)^{n-1}$ for $n=0$ would be $0 \cdot c_0 (x-a)^{-1}$, which is $0$, it's cleaner and more standard to start the sum from $n=1$. Also, forgetting to apply the chain rule if the argument is something other than $x$, e.g., $c_n(g(x))^n$. However, for power series, it's typically $(x-a)^n$, so the chain rule just gives a factor of 1.

### Step 4: Integration - The Reverse Power Rule applies to each term.

*   **Plain English:** When you integrate a power series, you integrate each individual $(x-a)^n$ term using the standard reverse power rule. Just like with finite integrals, you'll also need to add a constant of integration, $C$, to the entire result.

*   **Small concrete example:**
    Consider the series for $\frac{1}{1-x} = \sum_{n=0}^\infty x^n = 1 + x + x^2 + x^3 + \dots$
    Integrating term by term:
    $\int 1 dx = x$
    $\int x dx = \frac{x^2}{2}$
    $\int x^2 dx = \frac{x^3}{3}$
    $\int x^3 dx = \frac{x^4}{4}$
    ...
    So, the integral series is $C + x + \frac{x^2}{2} + \frac{x^3}{3} + \frac{x^4}{4} + \dots = C + \sum_{n=0}^\infty \frac{x^{n+1}}{n+1}$.
    Notice here the index is still $n=0$ for the first term of the sum, but the power and denominator change.

*   **Formal/mathematical version:**
    If $f(x) = \sum_{n=0}^\infty c_n (x-a)^n$, then
    $$ \int f(x) dx = \int \left( c_0 + c_1(x-a) + c_2(x-a)^2 + c_3(x-a)^3 + \dots \right) dx $$
    $$ \int f(x) dx = C + c_0(x-a) + \frac{c_1}{2}(x-a)^2 + \frac{c_2}{3}(x-a)^3 + \frac{c_3}{4}(x-a)^4 + \dots $$
    This can be written in summation notation as:
    $$ \int f(x) dx = C + \sum_{n=0}^\infty \frac{c_n}{n+1} (x-a)^{n+1} $$
    (Alternatively, one might re-index to $k=n+1$, so $n=k-1$, giving $C + \sum_{k=1}^\infty \frac{c_{k-1}}{k} (x-a)^k$.)

*   **What could go wrong:** Forgetting the constant of integration, $C$. This is a crucial part of indefinite integration. Also, incorrectly adjusting the starting index or the power of $x$. The denominator is $n+1$, not $n$.

### Step 5: Radius of Convergence - It Stays the Same!

*   **Plain English:** The "zone" around the center $a$ where the power series converges (called the radius of convergence, $R$) does *not* change when you differentiate or integrate the series term by term. If the original series worked for, say, $|x|<3$, then its derivative and its integral will also work for $|x|<3$. This is a very convenient and powerful property.

*   **Small concrete example:**
    The geometric series $\sum_{n=0}^\infty x^n = \frac{1}{1-x}$ has a radius of convergence $R=1$. This means it converges for $|x|<1$.
    Its derivative, $\sum_{n=1}^\infty n x^{n-1} = \frac{1}{(1-x)^2}$, also has $R=1$, converging for $|x|<1$.
    Its integral, $C + \sum_{n=0}^\infty \frac{x^{n+1}}{n+1} = C - \ln(1-x)$, also has $R=1$, converging for $|x|<1$.

*   **Formal/mathematical version:**
    If the power series $\sum_{n=0}^\infty c_n (x-a)^n$ has radius of convergence $R > 0$, then the series obtained by differentiating it, $\sum_{n=1}^\infty n c_n (x-a)^{n-1}$, and the series obtained by integrating it, $\sum_{n=0}^\infty \frac{c_n}{n+1} (x-a)^{n+1}$, both have the same radius of convergence $R$.

*   **What could go wrong:** Confusing the radius of convergence with the *interval* of convergence. While the radius $R$ is identical, the behavior at the endpoints of the interval of convergence (i.e., $a-R$ and $a+R$) can change. This leads to the next step.

### Step 6: Interval of Convergence - Endpoints Might Change.

*   **Plain English:** The interval of convergence is the full range of $x$ values for which the series converges, including any endpoints. Even though the *radius* of convergence doesn't change, whether the series converges *at the exact endpoints* ($x = a-R$ or $x = a+R$) can sometimes change after differentiation or integration. You must always re-check the endpoints for the new series.

*   **Small concrete example:**
    Consider the series for $\frac{1}{1+x} = \sum_{n=0}^\infty (-1)^n x^n$. Its radius of convergence is $R=1$. Its interval of convergence is $(-1, 1)$. It diverges at both $x=-1$ and $x=1$.
    Now, integrate it to get $\ln(1+x) = \sum_{n=0}^\infty (-1)^n \frac{x^{n+1}}{n+1}$.
    The radius of convergence is still $R=1$.
    Let's check the endpoints for the integrated series:
    At $x=1$: $\sum_{n=0}^\infty (-1)^n \frac{1^{n+1}}{n+1} = \sum_{n=0}^\infty \frac{(-1)^n}{n+1}$. This is an alternating series that converges by the Alternating Series Test.
    At $x=-1$: $\sum_{n=0}^\infty (-1)^n \frac{(-1)^{n+1}}{n+1} = \sum_{n=0}^\infty \frac{(-1)^{2n+1}}{n+1} = \sum_{n=0}^\infty \frac{-1}{n+1} = -\sum_{n=0}^\infty \frac{1}{n+1}$. This is a divergent p-series (harmonic series).
    So, the interval of convergence for $\ln(1+x)$ is $(-1, 1]$. Notice how it gained an endpoint at $x=1$.

*   **Formal/mathematical version:**
    If the original power series $\sum_{n=0}^\infty c_n (x-a)^n$ converges on $(a-R, a+R)$, $[a-R, a+R)$, $(a-R, a+R]$, or $[a-R, a+R]$, the differentiated and integrated series will still converge on $(a-R, a+R)$. However, the convergence at the endpoints $x = a \pm R$ must be re-evaluated using appropriate convergence tests (e.g., Ratio Test, Root Test, Alternating Series Test, p-series test) for the new series.

*   **What could go wrong:** Forgetting to check the endpoints. This is a very common mistake and can lead to an incorrect interval of convergence. Always remember that the radius is fixed, but endpoint behavior is not.

## 5. Worked examples — multiple, with every step shown

Let's walk through several examples to solidify these concepts.

### Example 1: Differentiation of a known series

**Problem:**
Given the geometric series representation for $\frac{1}{1-x}$:
$$ \frac{1}{1-x} = \sum_{n=0}^\infty x^n = 1 + x + x^2 + x^3 + \dots $$
Find a power series representation for $f(x) = \frac{1}{(1-x)^2}$ and determine its radius of convergence.

**Given:** $f(x) = \frac{1}{1-x} = \sum_{n=0}^\infty x^n$.
**Want:** Power series for $\frac{1}{(1-x)^2}$ and its radius of convergence.

**Solution:**

1.  **Recognize the relationship between the functions:**
    We notice that $\frac{1}{(1-x)^2}$ is the derivative of $\frac{1}{1-x}$.
    $$ \frac{d}{dx} \left( \frac{1}{1-x} \right) = \frac{d}{dx} (1-x)^{-1} = -1(1-x)^{-2}(-1) = (1-x)^{-2} = \frac{1}{(1-x)^2} $$
    *Explanation:* This step shows that if we differentiate the function $\frac{1}{1-x}$, we get the function we are looking for. This means we can differentiate its power series representation term by term.

2.  **State the original power series:**
    $$ f(x) = \sum_{n=0}^\infty x^n = 1 + x + x^2 + x^3 + x^4 + \dots $$
    *Explanation:* This is the given power series for $\frac{1}{1-x}$.

3.  **Differentiate the series term by term:**
    We apply the power rule $\frac{d}{dx}(x^n) = nx^{n-1}$ to each term.
    $$ f'(x) = \frac{d}{dx}(1) + \frac{d}{dx}(x) + \frac{d}{dx}(x^2) + \frac{d}{dx}(x^3) + \frac{d}{dx}(x^4) + \dots $$
    $$ f'(x) = 0 + 1 + 2x + 3x^2 + 4x^3 + \dots $$
    *Explanation:* Each term is differentiated individually. The constant term $1$ (for $n=0$) differentiates to $0$.

4.  **Write the resulting series in summation notation:**
    The series starts with $1$ (which is $1 \cdot x^0$), then $2x$ (which is $2 \cdot x^1$), then $3x^2$, and so on. This pattern suggests the $n$-th term (starting from $n=1$) is $n x^{n-1}$.
    $$ f'(x) = \sum_{n=1}^\infty n x^{n-1} $$
    *Explanation:* The sum now starts from $n=1$ because the $n=0$ term of the original series became zero after differentiation.

5.  **Determine the radius of convergence (ROC):**
    The original series $\sum_{n=0}^\infty x^n$ is a geometric series with $r=x$. It converges for $|x|<1$, so its radius of convergence is $R=1$.
    According to the theorem, term-by-term differentiation does not change the radius of convergence.
    Therefore, the radius of convergence for $f'(x) = \sum_{n=1}^\infty n x^{n-1}$ is also $R=1$.
    *Explanation:* This is a direct application of the rule that the ROC remains unchanged. We do not need to re-apply the Ratio Test here for the differentiated series. (However, we would need to re-check endpoints if we were asked for the interval of convergence.)

**Final Answer:**
The power series representation for $\frac{1}{(1-x)^2}$ is $\boxed{\sum_{n=1}^\infty n x^{n-1}}$.
Its radius of convergence is $\boxed{R=1}$.

**Reflection:** This example was relatively straightforward because the function we wanted was a direct derivative of a well-known series. The main points were correctly applying the power rule to each term and remembering that the radius of convergence doesn't change.

---

### Example 2: Integration of a known series

**Problem:**
Given the geometric series representation for $\frac{1}{1+x}$:
$$ \frac{1}{1+x} = \sum_{n=0}^\infty (-1)^n x^n = 1 - x + x^2 - x^3 + \dots $$
Find a power series representation for $f(x) = \ln(1+x)$ and determine its radius of convergence.

**Given:** $g(x) = \frac{1}{1+x} = \sum_{n=0}^\infty (-1)^n x^n$.
**Want:** Power series for $\ln(1+x)$ and its radius of convergence.

**Solution:**

1.  **Recognize the relationship between the functions:**
    We know that $\ln(1+x)$ is the integral of $\frac{1}{1+x}$.
    $$ \int \frac{1}{1+x} dx = \ln|1+x| + C $$
    Since we are looking for $\ln(1+x)$, we can assume $1+x>0$, so $|1+x|=1+x$.
    Also, we know that $\ln(1+0) = \ln(1) = 0$. This will help us find the constant of integration.
    *Explanation:* This step connects the target function to the given power series through integration.

2.  **State the original power series:**
    $$ g(x) = \sum_{n=0}^\infty (-1)^n x^n = 1 - x + x^2 - x^3 + x^4 - \dots $$
    *Explanation:* This is the starting point for our term-by-term integration.

3.  **Integrate the series term by term:**
    We apply the reverse power rule $\int x^n dx = \frac{x^{n+1}}{n+1} + C$ to each term.
    $$ \int g(x) dx = \int (1 - x + x^2 - x^3 + x^4 - \dots) dx $$
    $$ \int g(x) dx = C + x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \frac{x^5}{5} - \dots $$
    *Explanation:* Each term is integrated individually. We keep the alternating sign $(-1)^n$ for each term.

4.  **Write the resulting series in summation notation:**
    The general term for the integral is $(-1)^n \frac{x^{n+1}}{n+1}$.
    $$ \ln(1+x) = C + \sum_{n=0}^\infty (-1)^n \frac{x^{n+1}}{n+1} $$
    *Explanation:* This represents the integrated series. Notice the power of $x$ and the denominator have increased by one.

5.  **Determine the constant of integration $C$:**
    We know that $\ln(1+x) = 0$ when $x=0$. Substitute $x=0$ into the series:
    $$ \ln(1+0) = C + \sum_{n=0}^\infty (-1)^n \frac{0^{n+1}}{n+1} $$
    For $n=0$, the term is $(-1)^0 \frac{0^1}{1} = 0$. For $n>0$, $0^{n+1}=0$. So the entire sum is $0$.
    $$ 0 = C + 0 \implies C = 0 $$
    *Explanation:* This step uses a known value of the function (at $x=0$) to solve for the constant of integration.

6.  **Substitute $C=0$ into the series:**
    $$ \ln(1+x) = \sum_{n=0}^\infty (-1)^n \frac{x^{n+1}}{n+1} $$
    This series can also be re-indexed. Let $k = n+1$, so $n = k-1$. When $n=0$, $k=1$.
    $$ \ln(1+x) = \sum_{k=1}^\infty (-1)^{k-1} \frac{x^k}{k} $$
    *Explanation:* Re-indexing can sometimes make the series look cleaner or match a standard form. Both forms are correct.

7.  **Determine the radius of convergence (ROC):**
    The original series $\sum_{n=0}^\infty (-1)^n x^n$ is a geometric series with $r=-x$. It converges for $|-x|<1$, which simplifies to $|x|<1$. So, its radius of convergence is $R=1$.
    According to the theorem, term-by-term integration does not change the radius of convergence.
    Therefore, the radius of convergence for $\ln(1+x) = \sum_{k=1}^\infty (-1)^{k-1} \frac{x^k}{k}$ is also $R=1$.
    *Explanation:* Again, a direct application of the rule that ROC is preserved.

**Final Answer:**
The power series representation for $\ln(1+x)$ is $\boxed{\sum_{n=0}^\infty (-1)^n \frac{x^{n+1}}{n+1}}$ (or $\boxed{\sum_{k=1}^\infty (-1)^{k-1} \frac{x^k}{k}}$).
Its radius of convergence is $\boxed{R=1}$.

**Reflection:** This example highlights the importance of the constant of integration and how to determine its value. Re-indexing the sum is also a common practice to present the series in a more conventional form.

---

### Example 3: Differentiation and showing equivalence (Harder)

**Problem:**
You know that the power series for $e^x$ is $\sum_{n=0}^\infty \frac{x^n}{n!}$.
Differentiate this power series term by term and show that the resulting series is still the power series for $e^x$. Also, determine the radius and interval of convergence for both.

**Given:** $f(x) = e^x = \sum_{n=0}^\infty \frac{x^n}{n!}$.
**Want:** $f'(x)$ as a power series, show it's $e^x$, and find ROC/IOC for both.

**Solution:**

1.  **State the original power series for $e^x$:**
    $$ e^x = \sum_{n=0}^\infty \frac{x^n}{n!} = \frac{x^0}{0!} + \frac{x^1}{1!} + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots = 1 + x + \frac{x^2}{2} + \frac{x^3}{6} + \dots $$
    *Explanation:* This is the given series, expanded for clarity. Remember $0!=1$.

2.  **Differentiate the series term by term:**
    $$ \frac{d}{dx}(e^x) = \frac{d}{dx} \left( 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \dots \right) $$
    $$ \frac{d}{dx}(e^x) = 0 + 1 + \frac{2x}{2!} + \frac{3x^2}{3!} + \frac{4x^3}{4!} + \dots $$
    *Explanation:* Each term is differentiated using the power rule. The constant term $1$ goes to $0$.

3.  **Simplify the terms in the differentiated series:**
    $$ \frac{d}{dx}(e^x) = 1 + \frac{2x}{2 \cdot 1} + \frac{3x^2}{3 \cdot 2 \cdot 1} + \frac{4x^3}{4 \cdot 3 \cdot 2 \cdot 1} + \dots $$
    $$ \frac{d}{dx}(e^x) = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots $$
    *Explanation:* We use the property $n! = n \cdot (n-1)!$ to simplify $\frac{nx^{n-1}}{n!} = \frac{nx^{n-1}}{n(n-1)!} = \frac{x^{n-1}}{(n-1)!}$.

4.  **Write the resulting series in summation notation:**
    The simplified series is $1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots$.
    This can be written as $\sum_{n=0}^\infty \frac{x^n}{n!}$.
    Alternatively, using the result from step 2 and the simplification from step 3:
    $$ \frac{d}{dx}(e^x) = \sum_{n=1}^\infty \frac{nx^{n-1}}{n!} = \sum_{n=1}^\infty \frac{x^{n-1}}{(n-1)!} $$
    Now, let $k=n-1$. When $n=1$, $k=0$.
    $$ \sum_{k=0}^\infty \frac{x^k}{k!} $$
    *Explanation:* This re-indexing shows that the differentiated series is identical to the original series for $e^x$. This is consistent with the fact that $\frac{d}{dx}(e^x) = e^x$.

5.  **Determine the Radius of Convergence (ROC) for $e^x$:**
    We use the Ratio Test for the original series $\sum_{n=0}^\infty \frac{x^n}{n!}$.
    Let $a_n = \frac{x^n}{n!}$.
    $$ L = \lim_{n \to \infty} \left| \frac{a_{n+1}}{a_n} \right| = \lim_{n \to \infty} \left| \frac{x^{n+1}}{(n+1)!} \cdot \frac{n!}{x^n} \right| $$
    $$ L = \lim_{n \to \infty} \left| \frac{x^{n+1}}{x^n} \cdot \frac{n!}{(n+1)!} \right| = \lim_{n \to \infty} \left| x \cdot \frac{1}{n+1} \right| $$
    $$ L = |x| \lim_{n \to \infty} \frac{1}{n+1} = |x| \cdot 0 = 0 $$
    Since $L=0 < 1$ for all values of $x$, the series converges for all $x$.
    Therefore, the radius of convergence is $R=\infty$.
    *Explanation:* The Ratio Test is the standard method for finding the ROC of a power series.

6.  **Determine the Interval of Convergence (IOC) for $e^x$:**
    Since $R=\infty$, the series converges for all $x$.
    The interval of convergence is $(-\infty, \infty)$.
    *Explanation:* When $R=\infty$, there are no finite endpoints to check.

7.  **Determine the ROC and IOC for the differentiated series:**
    According to the theorem, term-by-term differentiation does not change the radius of convergence.
    Since the original series for $e^x$ has $R=\infty$ and IOC $(-\infty, \infty)$, the differentiated series (which is also $e^x$) also has $R=\infty$ and IOC $(-\infty, \infty)$.
    *Explanation:* This confirms the consistency of the theorem with a practical example.

**Final Answer:**
The differentiated power series is $\boxed{\sum_{n=0}^\infty \frac{x^n}{n!}}$, which is indeed the power series for $e^x$.
The radius of convergence for both series is $\boxed{R=\infty}$.
The interval of convergence for both series is $\boxed{(-\infty, \infty)}$.

**Reflection:** This example demonstrates the robustness of the term-by-term differentiation rule. It's satisfying to see that differentiating the series for $e^x$ yields the series for $e^x$ itself. It also reinforces how to use the Ratio Test to find the ROC and IOC.

---

### Example 4: Integration to find a new series and its IOC (Hardest)

**Problem:**
Find a power series representation for $\arctan x$ starting from the geometric series for $\frac{1}{1+x^2}$. Determine its radius of convergence and interval of convergence.

**Given:** We know $\frac{1}{1-u} = \sum_{n=0}^\infty u^n$ for $|u|<1$.
**Want:** Power series for $\arctan x$, its ROC, and IOC.

**Solution:**

1.  **Relate $\arctan x$ to a known series:**
    We know that $\frac{d}{dx}(\arctan x) = \frac{1}{1+x^2}$.
    So, $\arctan x = \int \frac{1}{1+x^2} dx$.
    *Explanation:* This establishes the link between the target function and a function whose series we can derive from the geometric series.

2.  **Find the power series for $\frac{1}{1+x^2}$:**
    Start with the geometric series formula: $\frac{1}{1-u} = \sum_{n=0}^\infty u^n$.
    Substitute $u = -x^2$ into this formula:
    $$ \frac{1}{1-(-x^2)} = \sum_{n=0}^\infty (-x^2)^n $$
    $$ \frac{1}{1+x^2} = \sum_{n=0}^\infty (-1)^n (x^2)^n = \sum_{n=0}^\infty (-1)^n x^{2n} $$
    Expand the series:
    $$ \frac{1}{1+x^2} = 1 - x^2 + x^4 - x^6 + x^8 - \dots $$
    *Explanation:* This is a crucial first step: obtaining the power series for the integrand. The substitution must be done carefully.

3.  **Determine the radius of convergence for $\frac{1}{1+x^2}$:**
    The geometric series $\sum u^n$ converges for $|u|<1$.
    Substituting $u=-x^2$, we have $|-x^2|<1$, which means $|x^2|<1$.
    This simplifies to $|x|<1$.
    So, the radius of convergence for $\frac{1}{1+x^2}$ is $R=1$.
    *Explanation:* The ROC of the substituted geometric series is found directly from the convergence condition.

4.  **Integrate the series for $\frac{1}{1+x^2}$ term by term:**
    $$ \arctan x = \int \left( \sum_{n=0}^\infty (-1)^n x^{2n} \right) dx $$
    $$ \arctan x = \int (1 - x^2 + x^4 - x^6 + x^8 - \dots) dx $$
    $$ \arctan x = C + x - \frac{x^3}{3} + \frac{x^5}{5} - \frac{x^7}{7} + \frac{x^9}{9} - \dots $$
    *Explanation:* Each term is integrated using the reverse power rule.

5.  **Write the resulting series in summation notation:**
    The general term is $(-1)^n \frac{x^{2n+1}}{2n+1}$.
    $$ \arctan x = C + \sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{2n+1} $$
    *Explanation:* This is the series representation for $\arctan x$, including the constant of integration.

6.  **Determine the constant of integration $C$:**
    We know $\arctan(0) = 0$. Substitute $x=0$ into the series:
    $$ \arctan(0) = C + \sum_{n=0}^\infty (-1)^n \frac{0^{2n+1}}{2n+1} $$
    For $n=0$, the term is $(-1)^0 \frac{0^1}{1} = 0$. For $n>0$, $0^{2n+1}=0$. So the entire sum is $0$.
    $$ 0 = C + 0 \implies C = 0 $$
    *Explanation:* As in Example 2, we use a known function value to find $C$.

7.  **Substitute $C=0$ into the series:**
    $$ \arctan x = \sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{2n+1} $$
    *Explanation:* This is the final power series for $\arctan x$.

8.  **Determine the radius of convergence (ROC) for $\arctan x$:**
    The original series for $\frac{1}{1+x^2}$ had $R=1$.
    Term-by-term integration does not change the radius of convergence.
    Therefore, the radius of convergence for $\arctan x$ is also $\boxed{R=1}$.
    *Explanation:* The ROC property is applied directly.

9.  **Determine the interval of convergence (IOC) for $\arctan x$:**
    The radius is $R=1$, so the interval is initially $(-1, 1)$. We must check the endpoints $x=1$ and $x=-1$.
    For $x=1$:
    $$ \sum_{n=0}^\infty (-1)^n \frac{1^{2n+1}}{2n+1} = \sum_{n=0}^\infty \frac{(-1)^n}{2n+1} = 1 - \frac{1}{3} + \frac{1}{5} - \frac{1}{7} + \dots $$
    This is an alternating series where $b_n = \frac{1}{2n+1}$.
    - $b_n > 0$ for all $n$.
    - $b_n$ is decreasing: $\frac{1}{2(n+1)+1} < \frac{1}{2n+1}$.
    - $\lim_{n \to \infty} b_n = \lim_{n \to \infty} \frac{1}{2n+1} = 0$.
    By the Alternating Series Test, the series converges at $x=1$.

    For $x=-1$:
    $$ \sum_{n=0}^\infty (-1)^n \frac{(-1)^{2n+1}}{2n+1} = \sum_{n=0}^\infty (-1)^n \frac{-1}{2n+1} = \sum_{n=0}^\infty \frac{(-1)^{n+1}}{2n+1} = -1 + \frac{1}{3} - \frac{1}{5} + \frac{1}{7} - \dots $$
    This is also an alternating series, which converges by the Alternating Series Test (it's simply the negative of the series at $x=1$).

    Since the series converges at both endpoints, the interval of convergence is $[-1, 1]$.
    *Explanation:* This is the "hardest" part of the problem. We must apply the Alternating Series Test at both endpoints to determine convergence.

**Final Answer:**
The power series representation for $\arctan x$ is $\boxed{\sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{2n+1}}$.
Its radius of convergence is $\boxed{R=1}$.
Its interval of convergence is $\boxed{[-1, 1]}$.

**Reflection:** This example combines several steps: substitution into a known series, integration, finding the constant of integration, and most importantly, re-checking the endpoints of the interval of convergence. It's a classic problem that demonstrates the full power of term-by-term operations. The fact that the original series for $\frac{1}{1+x^2}$ diverged at $x=\pm 1$ but its integral, $\arctan x$, converges at both endpoints is a key takeaway about endpoint behavior.

## 6. Common mistakes and traps

Students often stumble on specific points when working with term-by-term differentiation and integration of power series. Be mindful of these common traps:

1.  **Forgetting the constant of integration ($C$):** This is the most common mistake in integration. When integrating a power series, always include the $+C$. If the function's value at the center (or another known point) is given, use it to solve for $C$.
2.  **Incorrectly shifting the index of summation:**
    *   **Differentiation:** When differentiating $\sum_{n=0}^\infty c_n (x-a)^n$, the $n=0$ term ($c_0$) becomes $0$. The sum for the derivative should formally start from $n=1$: $\sum_{n=1}^\infty n c_n (x-a)^{n-1}$.
    *   **Integration:** When integrating $\sum_{n=0}^\infty c_n (x-a)^n$, the sum typically still starts from $n=0$, but the terms become $\frac{c_n}{n+1} (x-a)^{n+1}$. Some prefer to re-index the result to make the power of $x$ match the index, e.g., $\sum_{k=1}^\infty \frac{c_{k-1}}{k} (x-a)^k$. Be careful with the coefficients if you re-index.
3.  **Assuming the interval of convergence (including endpoints) is always identical:** The *radius* of convergence ($R$) is always the same for the original series, its derivative, and its integral. However, the behavior at the endpoints $a \pm R$ can change. You *must* re-check the endpoints for the derived or integrated series.
4.  **Applying term-by-term differentiation/integration to series that are not power series:** This powerful theorem applies specifically to power series within their radius of convergence. It does not automatically extend to other types of infinite series (e.g., Fourier series, or general series $\sum a_n$).
5.  **Algebraic errors in simplifying terms after differentiation/integration:** Especially when dealing with factorials (e.g., $\frac{n}{n!} = \frac{1}{(n-1)!}$) or complex coefficients, ensure careful algebraic manipulation.
6.  **Confusing the radius of convergence with the interval of convergence:** The radius is a single positive number (or $\infty$). The interval is a range of $x$-values, which may or may not include its endpoints.

## 7. Textbook-precise explanation

The ability to differentiate and integrate power series term by term is a cornerstone theorem in the study of infinite series and their applications. It formally states the conditions under which these operations are valid.

**Theorem (Term-by-Term Differentiation and Integration of Power Series):**

Let the power series $f(x) = \sum_{n=0}^\infty c_n (x-a)^n = c_0 + c_1(x-a) + c_2(x-a)^2 + c_3(x-a)^3 + \dots$ have a radius of convergence $R > 0$.

Then $f(x)$ is differentiable on the open interval $(a-R, a+R)$ and its derivative is given by:
$$ f'(x) = \sum_{n=1}^\infty n c_n (x-a)^{n-1} = c_1 + 2c_2(x-a) + 3c_3(x-a)^2 + \dots $$
The radius of convergence for $f'(x)$ is also $R$.

Furthermore, $f(x)$ is integrable on the open interval $(a-R, a+R)$ and its integral is given by:
$$ \int f(x) dx = C + \sum_{n=0}^\infty \frac{c_n}{n+1} (x-a)^{n+1} = C + c_0(x-a) + \frac{c_1}{2}(x-a)^2 + \frac{c_2}{3}(x-a)^3 + \dots $$
The radius of convergence for $\int f(x) dx$ is also $R$.

**Important Note on Interval of Convergence:** While the radius of convergence $R$ remains the same for the original series, its derivative, and its integral, the convergence behavior at the endpoints ($x = a-R$ and $x = a+R$) may change. Therefore, the interval of convergence for the differentiated or integrated series must be re-evaluated by testing these endpoints separately using appropriate convergence tests (e.g., Alternating Series Test, p-series test).

**Reference:**
This theorem can be found in most standard calculus textbooks covering sequences and series. For example:
*   **Stewart, Calculus, 9e, §11.9: Applications of Taylor and Maclaurin Series.** (Often presented as a theorem about differentiating and integrating power series).
*   **Thomas' Calculus, 14e, §10.8: Taylor and Maclaurin Series.** (Similar coverage, usually within the context of using known series to derive new ones).

## 8. ASCII diagrams

Here are a couple of ASCII diagrams to help visualize the concepts.

```text
Diagram 1: Visualizing Term-by-Term Operation

Original Function f(x) and its Power Series:
f(x) = c0 + c1(x-a) + c2(x-a)^2 + c3(x-a)^3 + ...
       |      |             |             |
       V      V             V             V
       Apply Calculus Rule (e.g., d/dx or Integral) to each term
       |      |             |             |
       V      V             V             V
Resulting Function F(x) or g(x) and its Power Series:
g(x) = 0 + c1 + 2c2(x-a) + 3c3(x-a)^2 + ...  (if differentiated)
F(x) = C + c0(x-a) + (c1/2)(x-a)^2 + (c2/3)(x-a)^3 + ... (if integrated)

This illustrates that the operation (differentiation or integration)
"passes through" the summation sign and applies to each individual term.
```

```text
Diagram 2: Radius vs. Interval of Convergence

Let's say a power series is centered at 'a'.
The radius of convergence 'R' defines a symmetric open interval (a-R, a+R).

           <------------------ R ------------------>
           <------------------ R ------------------>
           |                                       |
           a-R                  a                 a+R
           <--------------------->--------------------->  x-axis

Original Series:
   Converges:     (         )
                  a-R       a+R
   Example IOC:   (a-R, a+R)

Differentiated Series:
   Converges:     (         )
                  a-R       a+R
   Example IOC:   (a-R, a+R]  (endpoint at a+R might now converge)

Integrated Series:
   Converges:     (         )
                  a-R       a+R
   Example IOC:   [a-R, a+R)  (endpoint at a-R might now converge)

Key Takeaway:
- The distance 'R' from 'a' to the boundary points (a-R, a+R)
  is the same for all three series.
- Whether the series converges *at* the boundary points (the square brackets
  or parentheses in the IOC) can change and must be re-checked.
```

## 9. Memory technique — never forget this

To truly internalize term-by-term differentiation and integration of power series, focus on these key ideas and practice.

1.  **Specific Mnemonic / Visual Hook:**
    *   **"P.S. D.I. R.I.C. E.C."**
        *   **P.S.** - Power Series (This rule is specifically for Power Series!)
        *   **D.I.** - Differentiate or Integrate (Do it term by term)
        *   **R.I.C.** - Radius Is Constant (The Radius of Convergence *does not change*)
        *   **E.C.** - Endpoints Change (Always re-Check Endpoints for the Interval of Convergence)
    *   **Visual:** Imagine a train (the power series) on a track (the interval of convergence). When you differentiate or integrate, the train itself changes (the terms change), but the length of the track (the radius) stays the same. However, the very ends of the track (the endpoints) might become accessible or inaccessible for the *new* train.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    1.  **Differentiation:** If $f(x) = \sum_{n=0}^\infty c_n (x-a)^n$, then $f'(x) = \sum_{n=1}^\infty n c_n (x-a)^{n-1}$. (Remember $c_0$ vanishes, so sum starts at $n=1$).
    2.  **Integration:** If $f(x) = \sum_{n=0}^\infty c_n (x-a)^n$, then $\int f(x) dx = C + \sum_{n=0}^\infty \frac{c_n}{n+1} (x-a)^{n+1}$. (Remember the $+C$).
    3.  **Convergence:** The Radius of Convergence ($R$) remains the same. The Interval of Convergence (endpoints) *must be re-checked*.

3.  **Spaced-Repetition Schedule:**
    *   **1 Day:** Review the core theorem and the "P.S. D.I. R.I.C. E.C." mnemonic. Re-do Example 1.
    *   **3 Days:** Review again. Re-do Example 2. Try to explain the concept to an imaginary friend.
    *   **7 Days:** Review. Re-do Example 3. Focus on the index shifting and factorial simplification.
    *   **16 Days:** Review. Re-do Example 4. Pay close attention to the endpoint checks.
    *   **35 Days:** Review. Attempt one of the self-check questions, or find a new problem from a textbook. Focus on recalling the rules without looking them up.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the exact formulas, how can you rebuild them?
    1.  **Start with the definition of a power series:** $f(x) = c_0 + c_1(x-a) + c_2(x-a)^2 + c_3(x-a)^3 + \dots$
    2.  **Recall the linearity of differentiation/integration:** $\frac{d}{dx}(\sum a_n) = \sum \frac{d}{dx}(a_n)$ and $\int (\sum a_n) dx = \sum \int a_n dx$. This is the fundamental justification for "term-by-term."
    3.  **Apply the power rule/reverse power rule to each term:**
        *   For differentiation: $\frac{d}{dx}(c_n (x-a)^n) = n c_n (x-a)^{n-1}$.
        *   For integration: $\int c_n (x-a)^n dx = \frac{c_n}{n+1} (x-a)^{n+1}$.
    4.  **Re-assemble the sum:**
        *   Differentiation: $0 + c_1 + 2c_2(x-a) + \dots = \sum_{n=1}^\infty n c_n (x-a)^{n-1}$.
        *   Integration: $C + c_0(x-a) + \frac{c_1}{2}(x-a)^2 + \dots = C + \sum_{n=0}^\infty \frac{c_n}{n+1} (x-a)^{n+1}$.
    5.  **Recall the convergence properties:** The reason this works is that power series are "nice" functions (analytic) within their radius of convergence. This property ensures the radius stays the same, but the specific convergence at the boundaries (endpoints) can be delicate.

## 10. Connections — what this leads to

Understanding term-by-term differentiation and integration of power series is a powerful gateway to several advanced mathematical topics and applications:

*   **Deriving New Taylor/Maclaurin Series:** This is the most direct application. If you know the series for a basic function (like $\frac{1}{1-x}$), you can use differentiation and integration to find series for related, more complex functions (like $\frac{1}{(1-x)^2}$, $\ln(1-x)$, or $\arctan x$). This avoids the often tedious process of calculating Taylor coefficients using derivatives.
*   **Solving Differential Equations (Series Solutions):** Many differential equations, especially those arising in physics and engineering (e.g., Bessel's equation, Legendre's equation, Airy's equation), do not have solutions expressible in terms of elementary functions. Power series methods allow us to find solutions in the form of infinite series, which can then be used for approximation and analysis. This is a major topic in advanced differential equations courses.
*   **Approximating Definite Integrals:** Some definite integrals, like $\int e^{-x^2} dx$ (related to the normal distribution) or $\int \frac{\sin x}{x} dx$ (the Sine integral), cannot be expressed in terms of elementary antiderivatives. By representing the integrand as a power series, integrating term by term, and then evaluating the resulting series at the limits, we can approximate these definite integrals to any desired precision.
*   **Analytic Functions in Complex Analysis:** In complex analysis, functions that can be represented by a convergent power series in a neighborhood of each point in their domain are called analytic functions. This concept is fundamental to the entire field of complex analysis, where properties like differentiability and integrability are even more robust than in real calculus.
*   **Generating Functions in Combinatorics and Probability:** Power series are used as generating functions to encode sequences of numbers. Differentiating or integrating these generating functions can reveal properties of the sequences they represent, such as recurrence relations or probabilities.
*   **Numerical Methods:** The ability to manipulate power series allows for the development of highly accurate numerical algorithms for function evaluation, integration, and solving differential equations, which are crucial in scientific