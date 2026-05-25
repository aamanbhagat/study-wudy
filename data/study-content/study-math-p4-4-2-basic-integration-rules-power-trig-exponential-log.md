## 1. What it is — in plain English

Imagine you have a finished cake, and you're trying to figure out the original ingredients and the steps taken to bake it. That's a bit like what integration is. In mathematics, if differentiation tells you how something is changing (its speed, its slope, its growth rate), then integration is the reverse process: it tells you what the original "something" was, given its rate of change.

Think of it like this: if you know the speedometer reading of a car at every moment, integration helps you figure out the total distance the car has traveled. You're essentially "un-doing" the process of finding the speed from the distance.

These "basic integration rules" are like the fundamental recipes for common mathematical ingredients. Just as you learn how to bake a simple loaf of bread or fry an egg before tackling a multi-layered wedding cake, these rules teach you how to reverse the differentiation process for the most common types of functions: powers of $x$, trigonometric functions (like sine and cosine), and exponential or logarithmic functions. They are the foundational tools you'll use constantly.

## 2. Why it matters — real-world applications

The ability to reverse the process of differentiation is incredibly powerful and finds applications across virtually all STEM fields. Here are a few concrete examples:

1.  **Physics and Engineering (Motion & Work):** If you know the acceleration of a rocket (the rate of change of its velocity), integrating it once gives you its velocity. Integrating the velocity then gives you its position over time. This is fundamental for trajectory calculations in aerospace engineering, enabling companies like SpaceX to land rockets or NASA to plan missions to Mars. Similarly, calculating the total work done by a variable force (like a spring) requires integration.
2.  **Machine Learning and Data Science (Probability & Optimization):** In machine learning, probability density functions (PDFs) describe the likelihood of a random variable taking on a certain value. To find the probability that a variable falls within a certain range, you integrate its PDF over that range. This is crucial for understanding data distributions, risk assessment, and building predictive models. For example, in financial modeling, integrating a PDF can help assess the probability of a stock price falling within a certain bracket.
3.  **Economics and Business (Total Cost/Revenue):** If a company knows its marginal cost (the cost to produce one additional unit, which is the derivative of total cost), integrating the marginal cost function will give them the total cost function. Similarly, integrating marginal revenue gives total revenue. This allows businesses to make informed decisions about production levels, pricing strategies, and profit maximization.
4.  **Biology and Medicine (Drug Concentration & Population Growth):** When a drug is administered, its concentration in the bloodstream changes over time. If the rate of change of drug concentration is known, integration can determine the total amount of drug absorbed or the concentration at any given time. This is vital for determining dosage and understanding drug efficacy. Similarly, models of population growth often involve differential equations, and solving them requires integration to predict future population sizes.

## 3. Prerequisites — what you must know first

Before diving into basic integration rules, ensure you have a solid grasp of these foundational concepts. If any of these feel shaky, pause and review them.

*   **Differential Calculus (Derivatives):** You must be proficient in finding derivatives of power functions, trigonometric functions, exponential functions, and logarithmic functions. Integration is the reverse, so knowing the forward process is essential.
*   **Algebra:** Strong algebraic manipulation skills are critical, including exponent rules (e.g., $x^a \cdot x^b = x^{a+b}$, $1/x^n = x^{-n}$, $\sqrt{x} = x^{1/2}$), logarithm rules, and simplifying expressions.
*   **Functions:** A clear understanding of what a function is, its domain, range, and the concept of an inverse function.
*   **Limits:** While not directly applied in basic integration rules, limits are the fundamental building blocks of both differentiation and integration, providing the rigorous foundation for calculus.
*   **Antiderivative Concept:** You should understand that an antiderivative $F(x)$ of a function $f(x)$ is a function such that $F'(x) = f(x)$. This is the core idea behind indefinite integration.

## 4. The core idea — step by step

The core idea of basic integration rules is to reverse the differentiation process for common function types. Every rule we learn here is simply the inverse of a derivative rule you already know.

### Step 1: The Antiderivative and the Constant of Integration

*   **Plain English:** When you differentiate a function, any constant term in that function disappears. For example, the derivative of $x^2$ is $2x$, and the derivative of $x^2 + 5$ is also $2x$. So, if we're given $2x$ and asked "what function did this come from?", we know it must be $x^2$, but it could also be $x^2 + 1$, or $x^2 - 100$, or $x^2 + \pi$. Since we don't know the exact constant, we represent it with a general constant, $C$.
*   **Small concrete example:**
    If $f'(x) = 3x^2$, then a possible $f(x)$ is $x^3$.
    But $f(x) = x^3 + 7$ also has $f'(x) = 3x^2$.
    And $f(x) = x^3 - \sqrt{2}$ also has $f'(x) = 3x^2$.
    So, the general antiderivative is $x^3 + C$.
*   **Formal/mathematical version:**
    The indefinite integral of a function $f(x)$ is denoted by $\int f(x) \, dx$ and represents the family of all antiderivatives of $f(x)$.
    If $F'(x) = f(x)$, then
    $$\int f(x) \, dx = F(x) + C$$
    where $C$ is an arbitrary constant, called the **constant of integration**.
*   **What could go wrong:** Forgetting to add the $+C$ to your answer. This is a common and crucial error, as it implies a specific function rather than the general family of functions.

### Step 2: The Power Rule for Integration

*   **Plain English:** You know that to differentiate $x^n$, you multiply by the power and subtract 1 from the power (e.g., $x^3 \to 3x^2$). To reverse this, you do the opposite operations in reverse order: first, *add* 1 to the power, and then *divide* by this new power.
*   **Small concrete example:**
    To integrate $x^2$:
    1.  Add 1 to the power: $2+1=3$. So we have $x^3$.
    2.  Divide by the new power: $\frac{x^3}{3}$.
    3.  Don't forget the constant: $\frac{x^3}{3} + C$.
    Check: $\frac{d}{dx}\left(\frac{x^3}{3} + C\right) = \frac{1}{3} \cdot 3x^2 + 0 = x^2$. It works!
*   **Formal/mathematical version:**
    For any real number $n \neq -1$:
    $$\int x^n \, dx = \frac{x^{n+1}}{n+1} + C$$
*   **What could go wrong:** Applying this rule when $n = -1$. This would lead to division by zero (since $n+1=0$), which is undefined. The case $n=-1$ is special and covered next.

### Step 3: The Special Case: Integral of $x^{-1}$ (or $1/x$)

*   **Plain English:** We just said the power rule doesn't work for $x^{-1}$. So what *does* differentiate to $x^{-1}$ or $1/x$? Recall that the derivative of $\ln x$ is $1/x$. However, $\ln x$ is only defined for $x > 0$. To cover both positive and negative values of $x$ (since $1/x$ is defined for $x \neq 0$), we use $\ln|x|$.
*   **Small concrete example:**
    To integrate $\frac{1}{x}$:
    1.  Recall: $\frac{d}{dx}(\ln|x|) = \frac{1}{x}$.
    2.  Therefore, the integral is $\ln|x| + C$.
*   **Formal/mathematical version:**
    $$\int \frac{1}{x} \, dx = \ln|x| + C$$
*   **What could go wrong:** Forgetting the absolute value bars, $|x|$. This is crucial for the domain of the antiderivative to match the domain of the original function $1/x$.

### Step 4: Integration of Exponential Functions

*   **Plain English:** The easiest function to differentiate is $e^x$, because its derivative is just $e^x$. So, naturally, its integral is also $e^x$. For other exponential functions like $a^x$, recall that $\frac{d}{dx}(a^x) = a^x \ln a$. To reverse this, we need to divide by $\ln a$.
*   **Small concrete example:**
    To integrate $e^x$:
    1.  Recall: $\frac{d}{dx}(e^x) = e^x$.
    2.  Therefore, the integral is $e^x + C$.
    To integrate $2^x$:
    1.  Recall: $\frac{d}{dx}(2^x) = 2^x \ln 2$.
    2.  To "undo" the multiplication by $\ln 2$, we divide by it: $\frac{2^x}{\ln 2}$.
    3.  So, $\int 2^x \, dx = \frac{2^x}{\ln 2} + C$.
*   **Formal/mathematical version:**
    $$\int e^x \, dx = e^x + C$$
    For any positive constant $a \neq 1$:
    $$\int a^x \, dx = \frac{a^x}{\ln a} + C$$
*   **What could go wrong:** Forgetting the $\ln a$ in the denominator for $\int a^x \, dx$. Remember, differentiation *multiplies* by $\ln a$, so integration must *divide* by it.

### Step 5: Integration of Trigonometric Functions

*   **Plain English:** For trigonometric functions, you simply need to remember which function's derivative yields the one you're trying to integrate. For example, what function differentiates to $\cos x$? It's $\sin x$. What differentiates to $\sin x$? It's $-\cos x$ (because $\frac{d}{dx}(\cos x) = -\sin x$).
*   **Small concrete example:**
    To integrate $\cos x$:
    1.  Recall: $\frac{d}{dx}(\sin x) = \cos x$.
    2.  Therefore, the integral is $\sin x + C$.
    To integrate $\sin x$:
    1.  Recall: $\frac{d}{dx}(\cos x) = -\sin x$.
    2.  So, to get positive $\sin x$, we need to integrate to $-\cos x$.
    3.  Therefore, the integral is $-\cos x + C$.
*   **Formal/mathematical version:**
    $$\int \cos x \, dx = \sin x + C$$
    $$\int \sin x \, dx = -\cos x + C$$
    $$\int \sec^2 x \, dx = \tan x + C$$
    $$\int \csc^2 x \, dx = -\cot x + C$$
    $$\int \sec x \tan x \, dx = \sec x + C$$
    $$\int \csc x \cot x \, dx = -\csc x + C$$
*   **What could go wrong:** Sign errors are very common here. Always double-check by differentiating your result to see if you get the original function.

### Step 6: Linearity of Integration

*   **Plain English:** Just like with derivatives, integration plays nicely with sums, differences, and constant multiples. This means if you have a sum of functions, you can integrate each part separately and then add or subtract the results. Also, if a function is multiplied by a constant, you can pull that constant outside the integral sign, integrate the function, and then multiply by the constant at the end.
*   **Small concrete example:**
    To integrate $\int (5x^3 + 2\cos x) \, dx$:
    1.  Break it into two integrals and pull out constants: $5 \int x^3 \, dx + 2 \int \cos x \, dx$.
    2.  Integrate each part: $5 \left(\frac{x^{3+1}}{3+1}\right) + 2 (\sin x) + C$.
    3.  Simplify: $5 \frac{x^4}{4} + 2\sin x + C = \frac{5}{4}x^4 + 2\sin x + C$.
*   **Formal/mathematical version:**
    If $f(x)$ and $g(x)$ are integrable functions and $c$ is a constant:
    $$\int [f(x) \pm g(x)] \, dx = \int f(x) \, dx \pm \int g(x) \, dx$$
    $$\int c f(x) \, dx = c \int f(x) \, dx$$
*   **What could go wrong:** Trying to apply linearity to products or quotients. **Crucially, there is NO product rule or quotient rule for integration that works by simply integrating each part.** For example, $\int f(x)g(x) \, dx \neq \int f(x) \, dx \cdot \int g(x) \, dx$. These require more advanced techniques like integration by parts or substitution.

## 5. Worked examples — multiple, with every step shown

### Example 1: Basic Power Rule and Constant

**Problem:** Evaluate $\int (6x^2 - 4x + 7) \, dx$.

**Given:** The integrand $f(x) = 6x^2 - 4x + 7$.
**Wanted:** The indefinite integral of $f(x)$.

**Solution:**
$$ \int (6x^2 - 4x + 7) \, dx $$
$$ = \int 6x^2 \, dx - \int 4x \, dx + \int 7 \, dx $$
This step uses the linearity property of integrals: we can integrate each term separately and maintain the sum/difference.
$$ = 6 \int x^2 \, dx - 4 \int x \, dx + 7 \int 1 \, dx $$
Here, we apply another linearity property: constants can be pulled out of the integral sign. Also, $\int 7 \, dx$ is equivalent to $7 \int x^0 \, dx$ or $7 \int 1 \, dx$.
$$ = 6 \left( \frac{x^{2+1}}{2+1} \right) - 4 \left( \frac{x^{1+1}}{1+1} \right) + 7 \left( \frac{x^{0+1}}{0+1} \right) + C $$
Now we apply the power rule for integration $\int x^n \, dx = \frac{x^{n+1}}{n+1}$ to each term. For the constant term, $7$, we can think of it as $7x^0$, so $n=0$. We add a single constant of integration, $C$, at the end, representing the sum of all individual constants.
$$ = 6 \left( \frac{x^3}{3} \right) - 4 \left( \frac{x^2}{2} \right) + 7 \left( \frac{x^1}{1} \right) + C $$
We simplify the powers and denominators.
$$ = 2x^3 - 2x^2 + 7x + C $$
Finally, we perform the multiplications and present the simplified antiderivative.

**Final Answer:** $\boxed{2x^3 - 2x^2 + 7x + C}$

**Reflection:** This example was straightforward, demonstrating the basic power rule and the linearity property. The main point of caution is ensuring all constants are handled correctly and the final $+C$ is included.

### Example 2: Power Rule with Fractional and Negative Exponents, and Logarithm

**Problem:** Evaluate $\int \left( \frac{1}{\sqrt{x}} + \frac{5}{x^3} - \frac{2}{x} \right) \, dx$.

**Given:** The integrand $f(x) = \frac{1}{\sqrt{x}} + \frac{5}{x^3} - \frac{2}{x}$.
**Wanted:** The indefinite integral of $f(x)$.

**Solution:**
$$ \int \left( \frac{1}{\sqrt{x}} + \frac{5}{x^3} - \frac{2}{x} \right) \, dx $$
$$ = \int \left( x^{-1/2} + 5x^{-3} - 2x^{-1} \right) \, dx $$
First, rewrite the terms using exponent rules to prepare them for the power rule. $\frac{1}{\sqrt{x}} = x^{-1/2}$, $\frac{5}{x^3} = 5x^{-3}$, and $\frac{2}{x} = 2x^{-1}$. This makes it clear which integration rule to apply to each term.
$$ = \int x^{-1/2} \, dx + \int 5x^{-3} \, dx - \int 2x^{-1} \, dx $$
Apply the linearity property to separate the integral into three simpler integrals.
$$ = \int x^{-1/2} \, dx + 5 \int x^{-3} \, dx - 2 \int x^{-1} \, dx $$
Pull out the constant multipliers from the second and third terms.
$$ = \left( \frac{x^{-1/2+1}}{-1/2+1} \right) + 5 \left( \frac{x^{-3+1}}{-3+1} \right) - 2 \left( \ln|x| \right) + C $$
Now, apply the appropriate integration rules:
*   For $x^{-1/2}$: Use the power rule $\int x^n \, dx = \frac{x^{n+1}}{n+1}$, where $n = -1/2$.
*   For $x^{-3}$: Use the power rule, where $n = -3$.
*   For $x^{-1}$: This is the special case $\int \frac{1}{x} \, dx = \ln|x|$.
Remember to add the constant of integration, $C$, at the end.
$$ = \left( \frac{x^{1/2}}{1/2} \right) + 5 \left( \frac{x^{-2}}{-2} \right) - 2 \ln|x| + C $$
Simplify the exponents and denominators.
$$ = 2x^{1/2} - \frac{5}{2}x^{-2} - 2 \ln|x| + C $$
Further simplify by rewriting fractional and negative exponents back into radical and fraction forms for clarity.
$$ = 2\sqrt{x} - \frac{5}{2x^2} - 2 \ln|x| + C $$

**Final Answer:** $\boxed{2\sqrt{x} - \frac{5}{2x^2} - 2 \ln|x| + C}$

**Reflection:** This example highlights the importance of algebraic manipulation *before* integrating. Correctly converting radical and fractional forms into $x^n$ form, and recognizing the special case of $x^{-1}$, are key to success.

### Example 3: Trigonometric and Exponential Functions

**Problem:** Evaluate $\int (3\sin x - 2e^x + \sec^2 x) \, dx$.

**Given:** The integrand $f(x) = 3\sin x - 2e^x + \sec^2 x$.
**Wanted:** The indefinite integral of $f(x)$.

**Solution:**
$$ \int (3\sin x - 2e^x + \sec^2 x) \, dx $$
$$ = \int 3\sin x \, dx - \int 2e^x \, dx + \int \sec^2 x \, dx $$
Apply the linearity property to separate the integral into three simpler integrals.
$$ = 3 \int \sin x \, dx - 2 \int e^x \, dx + \int \sec^2 x \, dx $$
Pull out the constant multipliers from the first and second terms.
$$ = 3(-\cos x) - 2(e^x) + (\tan x) + C $$
Apply the specific integration rules for each function:
*   $\int \sin x \, dx = -\cos x$.
*   $\int e^x \, dx = e^x$.
*   $\int \sec^2 x \, dx = \tan x$.
Add the constant of integration, $C$, at the end.
$$ = -3\cos x - 2e^x + \tan x + C $$
Perform the multiplications and present the simplified antiderivative.

**Final Answer:** $\boxed{-3\cos x - 2e^x + \tan x + C}$

**Reflection:** This example tests knowledge of basic trigonometric and exponential integration rules. Careful attention to signs (especially for $\sin x$) is crucial.

### Example 4: Algebraic Simplification Required

**Problem:** Evaluate $\int \frac{x^3 - \sqrt[3]{x} + 2x}{x} \, dx$.

**Given:** The integrand $f(x) = \frac{x^3 - \sqrt[3]{x} + 2x}{x}$.
**Wanted:** The indefinite integral of $f(x)$.

**Solution:**
$$ \int \frac{x^3 - \sqrt[3]{x} + 2x}{x} \, dx $$
$$ = \int \left( \frac{x^3}{x} - \frac{\sqrt[3]{x}}{x} + \frac{2x}{x} \right) \, dx $$
The first step is to simplify the integrand by dividing each term in the numerator by the denominator, $x$. This is a common algebraic technique to transform a complex fraction into a sum/difference of simpler terms.
$$ = \int \left( x^{3-1} - x^{1/3-1} + 2x^{1-1} \right) \, dx $$
Apply exponent rules: $\frac{x^a}{x^b} = x^{a-b}$. Also, rewrite $\sqrt[3]{x}$ as $x^{1/3}$.
$$ = \int \left( x^2 - x^{-2/3} + 2x^0 \right) \, dx $$
Simplify the exponents. Note that $x^0 = 1$.
$$ = \int x^2 \, dx - \int x^{-2/3} \, dx + \int 2 \, dx $$
Apply the linearity property to separate the integral into three simpler integrals.
$$ = \int x^2 \, dx - \int x^{-2/3} \, dx + 2 \int 1 \, dx $$
Pull out the constant multiplier from the third term.
$$ = \left( \frac{x^{2+1}}{2+1} \right) - \left( \frac{x^{-2/3+1}}{-2/3+1} \right) + 2 \left( \frac{x^{0+1}}{0+1} \right) + C $$
Apply the power rule for integration $\int x^n \, dx = \frac{x^{n+1}}{n+1}$ to each term. For the constant term, $2$, we can think of it as $2x^0$. Add the constant of integration, $C$.
$$ = \frac{x^3}{3} - \frac{x^{1/3}}{1/3} + 2x + C $$
Simplify the denominators and exponents. Dividing by a fraction is equivalent to multiplying by its reciprocal.
$$ = \frac{1}{3}x^3 - 3x^{1/3} + 2x + C $$
Rewrite the fractional exponent back into radical form for a cleaner final answer.

**Final Answer:** $\boxed{\frac{1}{3}x^3 - 3\sqrt[3]{x} + 2x + C}$

**Reflection:** This example demonstrates that often, the hardest part of integration isn't the calculus itself, but the algebraic manipulation required to get the integrand into a form where the basic rules can be applied. Don't skip these algebraic simplification steps!

## 6. Common mistakes and traps

1.  **Forgetting the Constant of Integration ($+C$):** This is the most common error. An indefinite integral represents a *family* of functions, not a single one. Omitting $+C$ implies a specific function when many exist.
2.  **Applying the Power Rule to $x^{-1}$:** Trying to use $\int x^{-1} \, dx = \frac{x^{-1+1}}{-1+1} + C = \frac{x^0}{0} + C$, which leads to division by zero. Remember $\int \frac{1}{x} \, dx = \ln|x| + C$.
3.  **Sign Errors in Trigonometric Integrals:** Confusing $\int \sin x \, dx = -\cos x + C$ with $\int \sin x \, dx = \cos x + C$. Always differentiate your result mentally (or on paper) to verify the sign.
4.  **Incorrectly Handling Products/Quotients:** Assuming $\int f(x)g(x) \, dx = \int f(x) \, dx \cdot \int g(x) \, dx$ or similar for quotients. There is no simple product or quotient rule for integration; these require advanced techniques like substitution or integration by parts.
5.  **Algebraic Errors Before Integration:** Failing to simplify the integrand into a sum/difference of power, exponential, or trig functions before attempting integration (e.g., trying to integrate $\frac{x^2+1}{x}$ without first writing it as $x + \frac{1}{x}$).
6.  **Misinterpreting the Integral of a Constant:** Confusing $\int c \, dx = cx + C$ with something like just $c+C$. Remember that $c$ is $cx^0$, so the power rule applies.

## 7. Textbook-precise explanation

An **antiderivative** of a function $f$ on an interval $I$ is a function $F$ such that $F'(x) = f(x)$ for all $x$ in $I$. If $F$ is an antiderivative of $f$, then the most general antiderivative of $f$ is $F(x) + C$, where $C$ is an arbitrary constant.

The process of finding antiderivatives is called **indefinite integration**, and the symbol $\int$ is called the **integral sign**. The expression $\int f(x) \, dx$ is called the **indefinite integral** of $f(x)$ with respect to $x$. The function $f(x)$ is the **integrand**, and $dx$ indicates that $x$ is the **variable of integration**.

**Basic Integration Rules:**

Let $C$ denote the constant of integration.

1.  **Constant Rule:**
    $$\int k \, dx = kx + C$$
    (where $k$ is a constant)
2.  **Power Rule:**
    $$\int x^n \, dx = \frac{x^{n+1}}{n+1} + C \quad (\text{for } n \neq -1)$$
3.  **Logarithmic Rule (for $n=-1$):**
    $$\int \frac{1}{x} \, dx = \ln|x| + C$$
4.  **Exponential Rules:**
    $$\int e^x \, dx = e^x + C$$
    $$\int a^x \, dx = \frac{a^x}{\ln a} + C \quad (\text{for } a > 0, a \neq 1)$$
5.  **Trigonometric Rules:**
    $$\int \sin x \, dx = -\cos x + C$$
    $$\int \cos x \, dx = \sin x + C$$
    $$\int \sec^2 x \, dx = \tan x + C$$
    $$\int \csc^2 x \, dx = -\cot x + C$$
    $$\int \sec x \tan x \, dx = \sec x + C$$
    $$\int \csc x \cot x \, dx = -\csc x + C$$
6.  **Linearity Properties:**
    *   **Constant Multiple Rule:**
        $$\int c f(x) \, dx = c \int f(x) \, dx$$
    *   **Sum/Difference Rule:**
        $$\int [f(x) \pm g(x)] \, dx = \int f(x) \, dx \pm \int g(x) \, dx$$

These rules are direct consequences of the corresponding differentiation rules. For instance, the power rule for integration is derived by considering the inverse of the power rule for differentiation: if $\frac{d}{dx}\left(\frac{x^{n+1}}{n+1}\right) = \frac{1}{n+1} \cdot (n+1)x^n = x^n$, then the integral of $x^n$ must be $\frac{x^{n+1}}{n+1} + C$.

(Refer to: Stewart, Calculus, 9e, Chapter 4.9, "Antiderivatives"; Thomas' Calculus, 14e, Chapter 4.2, "Antiderivatives")

## 8. ASCII diagrams

The most crucial concept to visualize with basic integration is the "family of curves" due to the constant of integration, $+C$.

Imagine you have a function $f(x)$ (which is the derivative of $F(x)$). The graph of $f(x)$ tells you the slope of $F(x)$ at every point. If $F(x)$ is an antiderivative, then $F(x)+C$ is also an antiderivative for any constant $C$. This means that all antiderivatives of $f(x)$ have the exact same shape, but they are shifted vertically.

```text
       ^ y
       |
       |     / F(x) + C_3  (e.g., F(x) + 2)
       |    /
       |   /   / F(x) + C_2  (e.g., F(x) + 1)
       |  /   /
       | /   / F(x) + C_1  (e.g., F(x) + 0)
       |/   /
       +-----------------> x
             / F(x) + C_0  (e.g., F(x) - 1)
            /
           /
          / F(x) + C_-1 (e.g., F(x) - 2)

      All these curves have the same slope (derivative) f(x) at any given x-value.
      They are vertical translations of each other.
      The "+C" accounts for this unknown vertical shift.
```

In this diagram, each curve represents a different antiderivative $F(x) + C$. At any specific $x$-value (e.g., $x=a$), if you draw a tangent line to each curve, those tangent lines will all be parallel, meaning they have the same slope. This common slope is the value of $f(a)$. The constant $C$ simply determines the vertical position of the curve.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic / Visual Hook:**
    *   **Power Rule:** "Power UP, then DIVIDE." Visualize climbing a step (adding 1 to the power), then sliding down a ramp (dividing by the new power).
    *   **$1/x$:** "One over $x$, it's $\ln|x|$ for sure, no power rule will endure."
    *   **Trig Signs:** Create a small "derivative cycle" in your head: $\sin \to \cos \to -\sin \to -\cos \to \sin$. To integrate, you go *backwards* around the cycle.
        *   $\int \cos x \, dx$: Go back from $\cos x$ to $\sin x$.
        *   $\int \sin x \, dx$: Go back from $\sin x$ to $-\cos x$.
        *   This helps avoid sign errors.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    1.  **Power Rule (general):** $\int x^n \, dx = \frac{x^{n+1}}{n+1} + C$ (for $n \neq -1$)
    2.  **Power Rule (special case):** $\int \frac{1}{x} \, dx = \ln|x| + C$
    3.  **Exponential:** $\int e^x \, dx = e^x + C$
    4.  **Trig (sine):** $\int \sin x \, dx = -\cos x + C$
    5.  **Trig (cosine):** $\int \cos x \, dx = \sin x + C$
    (And always remember the $+C$!)

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Immediately after learning, do practice problems.
    *   **Day 3:** Review the rules and do a few more problems.
    *   **Day 7:** Revisit the rules, focusing on any you found tricky.
    *   **Day 16:** Practice mixed problems involving these rules.
    *   **Day 35:** Integrate these rules into more complex problems (e.g., u-substitution).

4.  **First-Principles Re-derivation Pathway:**
    If you forget an integration rule, always ask yourself: **"What function did I differentiate to get this integrand?"**
    *   **For $\int x^n \, dx$:** You know $\frac{d}{dx}(x^{n+1}) = (n+1)x^n$. To get just $x^n$, you need to divide by $(n+1)$. So, $\frac{d}{dx}\left(\frac{x^{n+1}}{n+1}\right) = x^n$. Therefore, $\int x^n \, dx = \frac{x^{n+1}}{n+1} + C$.
    *   **For $\int \frac{1}{x} \, dx$:** You know $\frac{d}{dx}(\ln|x|) = \frac{1}{x}$. Therefore, $\int \frac{1}{x} \, dx = \ln|x| + C$.
    *   **For $\int e^x \, dx$:** You know $\frac{d}{dx}(e^x) = e^x$. Therefore, $\int e^x \, dx = e^x + C$.
    *   **For $\int \sin x \, dx$:** You know $\frac{d}{dx}(\cos x) = -\sin x$. To get positive $\sin x$, you need a negative sign: $\frac{d}{dx}(-\cos x) = \sin x$. Therefore, $\int \sin x \, dx = -\cos x + C$.
    This "reverse differentiation" thought process is the most robust way to reconstruct the basic rules if your memory fails.

## 10. Connections — what this leads to

Mastering these basic integration rules is absolutely fundamental. They are the building blocks for nearly all subsequent topics in integral calculus and beyond.

*   **U-Substitution (Integration by Substitution):** This is the next major integration technique, which essentially reverses the chain rule for differentiation. You'll apply basic integration rules *after* performing the substitution.
*   **Integration by Parts:** This technique reverses the product rule for differentiation and is essential for integrating products of functions (e.g., $x e^x$, $x \sin x$, $\ln x$).
*   **Trigonometric Integrals:** These involve integrating powers and products of trigonometric functions, often requiring trigonometric identities and repeated application of basic rules.
*   **Partial Fractions:** A technique used to integrate rational functions (polynomials divided by polynomials) by breaking them into simpler fractions that can then be integrated using the basic $\ln|x|$ rule or power rule.
*   **Definite Integrals and the Fundamental Theorem of Calculus:** Basic integration rules allow you to find the antiderivative, which is a crucial step in evaluating definite integrals. The Fundamental Theorem of Calculus connects differentiation and integration, allowing us to calculate the net change or accumulated quantity of a function over an interval.
*   **Improper Integrals:** These involve integrals over infinite intervals or with infinite discontinuities, where the evaluation still relies on finding the antiderivative.
*   **Applications of Integration:** Calculating areas, volumes, arc lengths, surface areas, work, fluid pressure, centers of mass, and probabilities all depend on your ability to perform indefinite integration using these basic rules.
*   **Differential Equations:** Solving many types of differential equations (equations involving a function and its derivatives) requires integrating one or more times, often using these basic rules as the final step.

## 11. Self-check questions

1.  Evaluate $\int (3x^4 - 2x^{1/2} + 1) \, dx$.
2.  Find the indefinite integral of $f(x) = \frac{4}{x} - 7\cos x + e^x$.
3.  Calculate $\int \left( \frac{x^5 - 3x^2 + \sqrt{x}}{x^2} \right) \, dx$.
4.  Determine $\int (5\sec^2 x + 2^x - \csc x \cot x) \, dx$.
5.  If $f''(x) = 6x - 2$ and $f'(1) = 4$ and $f(0) = 3$, find the function $f(x)$. (Hint: You'll need to integrate twice and use the given conditions to find the constants of integration.)