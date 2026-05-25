## 1. What it is — in plain English

Imagine you have a quantity that grows (or shrinks) at a rate that is always proportional to its current size. For instance, if you have a small amount, it grows slowly; if you have a large amount, it grows quickly. This is the essence of exponential growth.

The functions $e^x$ and $a^x$ are the mathematical ways to describe this kind of growth. Here, $x$ is usually time, and $e$ (Euler's number, approximately 2.718) or $a$ (any positive number) is the base determining how fast the growth happens.

When we talk about the "derivative" of these functions, we're asking: "How fast is this quantity changing *right now*?" Or, if you think of a graph, "What is the steepness (slope) of the curve at any given point?"

What's incredibly special about $e^x$ is that its rate of change is *itself*. If you have 10 units of $e^x$, it's growing at a rate of 10 units per "unit of $x$." It's like a self-replicating entity where its growth rate perfectly matches its current size. For $a^x$, it's almost the same, but with a small adjustment factor related to the base $a$.

## 2. Why it matters — real-world applications

Understanding the derivatives of $e^x$ and $a^x$ is fundamental because these functions model countless natural and artificial phenomena involving proportional change.

1.  **Population Dynamics & Biology:** The growth of bacteria in a petri dish, the spread of a virus, or even the initial stages of human population growth can be modeled by $P(t) = P_0 e^{kt}$. The derivative $P'(t) = k P_0 e^{kt} = k P(t)$ tells us that the rate of population change is directly proportional to the current population size. This is crucial for epidemiologists and ecologists.

2.  **Finance & Economics:** Compound interest, especially continuous compounding, uses $e^x$. If you invest $P_0$ dollars at an annual interest rate $r$ compounded continuously, your investment grows according to $A(t) = P_0 e^{rt}$. The derivative $A'(t) = r P_0 e^{rt} = r A(t)$ shows that your money grows at a rate proportional to the amount currently in the account. This is essential for financial modeling, risk assessment, and understanding investment returns.

3.  **Physics & Engineering:**
    *   **Radioactive Decay:** The decay of radioactive isotopes follows $N(t) = N_0 e^{-\lambda t}$, where $\lambda$ is the decay constant. The derivative $N'(t) = -\lambda N_0 e^{-\lambda t} = -\lambda N(t)$ indicates that the rate of decay is proportional to the number of radioactive nuclei present. This is used in carbon dating, medical imaging, and nuclear power.
    *   **RC Circuits:** In electrical engineering, the charging or discharging of a capacitor in an RC (Resistor-Capacitor) circuit follows an exponential curve. Understanding its derivative helps engineers predict current flow and voltage changes over time, critical for designing stable electronic systems.
    *   **Newton's Law of Cooling/Heating:** The temperature of an object cooling or heating in a constant ambient temperature also changes exponentially, $T(t) = T_a + (T_0 - T_a)e^{-kt}$. Its derivative helps determine how quickly an object reaches thermal equilibrium.

4.  **Machine Learning & Artificial Intelligence:** While not always directly $e^x$ or $a^x$, many activation functions in neural networks (like the sigmoid function $\sigma(x) = \frac{1}{1+e^{-x}}$ or the softmax function) are built upon the exponential function. Calculating their derivatives is a core part of the backpropagation algorithm, which allows neural networks to learn and optimize their parameters. For example, the derivative of the sigmoid function is $\sigma'(x) = \sigma(x)(1-\sigma(x))$, which is elegantly expressed in terms of itself.

## 3. Prerequisites — what you must know first

Before diving into the proofs, ensure you have a solid grasp of these fundamental concepts:

*   **Limits:** The concept of approaching a value without necessarily reaching it. You need to understand how to evaluate limits, including limits at infinity and indeterminate forms.
*   **Definition of the Derivative:** The formal definition of a derivative as a limit: $f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$. This is the starting point for all proofs.
*   **Properties of Exponents:** Rules like $a^{x+y} = a^x a^y$, $a^{xy} = (a^x)^y$, $a^0 = 1$, and $a^{-x} = 1/a^x$.
*   **Logarithms:** The definition of a logarithm ($\log_b y = x \iff b^x = y$), properties like $\ln(MN) = \ln M + \ln N$, $\ln(M/N) = \ln M - \ln N$, and especially $\ln(M^p) = p \ln M$. Also, the relationship between $e$ and the natural logarithm: $\ln e^x = x$ and $e^{\ln x} = x$.
*   **Special Limit for $e$:** The crucial limit $\lim_{h \to 0} \frac{e^h - 1}{h} = 1$. This limit is often used as a definition of $e$ or is derived from other definitions of $e$. It's fundamental to proving the derivative of $e^x$.
*   **Chain Rule:** For differentiating composite functions: $\frac{d}{dx}f(g(x)) = f'(g(x)) \cdot g'(x)$. This will be essential for the derivative of $a^x$.

## 4. The core idea — step by step

Let's derive the derivatives of $e^x$ and $a^x$ from first principles.

### Step 1: Recall the definition of the derivative.

**Plain English:** The derivative is the instantaneous rate of change of a function, which we calculate by finding the slope of the tangent line to the function's graph at a specific point. We do this by taking the limit of the slope of secant lines as the distance between the two points on the secant line shrinks to zero.

**Small concrete example:** If $f(x) = x^2$, the derivative $f'(x)$ tells us how fast $x^2$ is changing at any $x$. For example, at $x=1$, $f(1)=1$. At $x=2$, $f(2)=4$. The average rate of change is $(4-1)/(2-1)=3$. The derivative will give us the exact rate at $x=1$ (which is $2(1)=2$) or $x=2$ (which is $2(2)=4$).

**Formal/Mathematical Version:**
The derivative of a function $f(x)$ with respect to $x$ is given by:
$$ f'(x) = \frac{d}{dx}f(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} $$

**What could go wrong:** Forgetting that $h$ approaches zero, not $x$. Misinterpreting $f(x+h)$ as $f(x)+h$. Making algebraic errors when expanding $f(x+h)$.

### Step 2: Apply the definition to $f(x) = e^x$.

**Plain English:** We're going to plug $e^x$ into our derivative formula. This means we need to figure out what $e^{x+h}$ looks like and how to subtract $e^x$ from it, then divide by $h$.

**Concrete steps:**
1.  Identify $f(x) = e^x$.
2.  Identify $f(x+h) = e^{x+h}$.
3.  Substitute these into the derivative definition:
    $$ \frac{d}{dx}(e^x) = \lim_{h \to 0} \frac{e^{x+h} - e^x}{h} $$
4.  Use the exponent rule $a^{m+n} = a^m a^n$ to rewrite $e^{x+h}$ as $e^x e^h$:
    $$ \frac{d}{dx}(e^x) = \lim_{h \to 0} \frac{e^x e^h - e^x}{h} $$
5.  Factor out the common term $e^x$ from the numerator:
    $$ \frac{d}{dx}(e^x) = \lim_{h \to 0} \frac{e^x(e^h - 1)}{h} $$

**Formal/Mathematical Version:**
$$ \frac{d}{dx}(e^x) = \lim_{h \to 0} \frac{e^{x+h} - e^x}{h} = \lim_{h \to 0} \frac{e^x e^h - e^x}{h} = \lim_{h \to 0} \frac{e^x(e^h - 1)}{h} $$

**What could go wrong:** Forgetting exponent rules. Treating $e^x$ as a constant that can be pulled out of the limit too early (though it is a constant with respect to $h$, so it can be pulled out).

### Step 3: Introduce the special limit for $e$.

**Plain English:** At this point in the derivation, we have a term $\frac{e^h - 1}{h}$ inside the limit. This specific limit as $h$ approaches zero is a fundamental property of the number $e$. It's one of the defining characteristics of $e$ that makes it so special in calculus.

**Formal/Mathematical Version:**
A key property of Euler's number $e$ is that:
$$ \lim_{h \to 0} \frac{e^h - 1}{h} = 1 $$
This limit can be derived from the definition of $e$ as $\lim_{n \to \infty} (1 + \frac{1}{n})^n$ or from its Taylor series expansion $e^x = 1 + x + \frac{x^2}{2!} + \dots$. If we substitute this into $\frac{e^h - 1}{h}$:
$\frac{(1 + h + \frac{h^2}{2!} + \dots) - 1}{h} = \frac{h + \frac{h^2}{2!} + \dots}{h} = 1 + \frac{h}{2!} + \dots$.
As $h \to 0$, this expression approaches $1$.

**What could go wrong:** Not knowing this specific limit or confusing it with other limits. Trying to evaluate it by direct substitution, which yields $\frac{e^0 - 1}{0} = \frac{1-1}{0} = \frac{0}{0}$, an indeterminate form.

### Step 4: Complete the proof for $e^x$.

**Plain English:** Now we use the special limit we just discussed. Since $e^x$ does not depend on $h$, we can pull it out of the limit. Then, the remaining limit simplifies to 1, leaving us with $e^x$ itself.

**Formal/Mathematical Version:**
Continuing from Step 2:
$$ \frac{d}{dx}(e^x) = \lim_{h \to 0} \frac{e^x(e^h - 1)}{h} $$
Since $e^x$ is a constant with respect to $h$ (it doesn't change as $h$ changes), we can move it outside the limit:
$$ \frac{d}{dx}(e^x) = e^x \lim_{h \to 0} \frac{e^h - 1}{h} $$
Now, using the special limit from Step 3:
$$ \frac{d}{dx}(e^x) = e^x \cdot 1 $$
$$ \frac{d}{dx}(e^x) = e^x $$
**Result:** The derivative of $e^x$ is $e^x$.

**What could go wrong:** Forgetting that $e^x$ is a constant *with respect to $h$*, but not with respect to $x$. This is a common point of confusion.

### Step 5: Apply to $f(x) = a^x$ by rewriting it using base $e$.

**Plain English:** For a general base $a$ (where $a$ is a positive constant, $a \neq 1$), we don't have a direct "special limit" like we did for $e$. However, we can use the power of logarithms to rewrite *any* exponential function with base $a$ as an exponential function with base $e$. This allows us to use the derivative rule we just proved for $e^x$.

**Concrete steps:**
1.  Recall the property that $a = e^{\ln a}$. This is true because the natural logarithm ($\ln$) is the inverse function of $e^x$.
2.  Substitute this into $a^x$:
    $$ a^x = (e^{\ln a})^x $$
3.  Use the exponent rule $(b^m)^n = b^{mn}$:
    $$ a^x = e^{x \ln a} $$
Now, our problem is to find the derivative of $e^{x \ln a}$. This is a composite function, so we'll need the Chain Rule.

**Formal/Mathematical Version:**
Let $f(x) = a^x$. We can rewrite $a^x$ using the exponential function with base $e$:
$$ a^x = e^{\ln(a^x)} $$
Using the logarithm property $\ln(M^p) = p \ln M$:
$$ a^x = e^{x \ln a} $$
Now we need to differentiate $e^{x \ln a}$.

**What could go wrong:** Forgetting the fundamental relationship $a = e^{\ln a}$ or the logarithm property $\ln(a^x) = x \ln a$.

### Step 6: Use the Chain Rule for $a^x$.

**Plain English:** We have a function of the form $e^{\text{something}}$. The "something" is $x \ln a$. The Chain Rule says we take the derivative of the "outer" function ($e^{\text{something}}$) with respect to its "something", and then multiply by the derivative of the "inner" function ("something") with respect to $x$.

**Concrete steps:**
1.  Identify the outer function: $f(u) = e^u$, where $u = x \ln a$.
2.  Find the derivative of the outer function: $f'(u) = e^u$.
3.  Identify the inner function: $g(x) = x \ln a$.
4.  Find the derivative of the inner function: Since $\ln a$ is a constant (because $a$ is a constant), the derivative of $x \cdot (\text{constant})$ is just the constant. So, $g'(x) = \ln a$.
5.  Apply the Chain Rule: $\frac{d}{dx}(f(g(x))) = f'(g(x)) \cdot g'(x)$.
    $$ \frac{d}{dx}(e^{x \ln a}) = e^{x \ln a} \cdot (\ln a) $$

**Formal/Mathematical Version:**
Let $y = e^{x \ln a}$. Let $u = x \ln a$. Then $y = e^u$.
By the Chain Rule, $\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$.
First, find $\frac{dy}{du}$:
$$ \frac{dy}{du} = \frac{d}{du}(e^u) = e^u $$
Next, find $\frac{du}{dx}$:
$$ \frac{du}{dx} = \frac{d}{dx}(x \ln a) $$
Since $a$ is a constant, $\ln a$ is also a constant. Let $k = \ln a$. Then $\frac{du}{dx} = \frac{d}{dx}(kx) = k$.
So, $\frac{du}{dx} = \ln a$.
Now, combine them:
$$ \frac{dy}{dx} = e^u \cdot \ln a $$
Substitute $u = x \ln a$ back into the expression:
$$ \frac{dy}{dx} = e^{x \ln a} \cdot \ln a $$

**What could go wrong:** Forgetting the Chain Rule. Misidentifying $\ln a$ as a variable and trying to differentiate it with respect to $x$ (it's a constant!).

### Step 7: Simplify the result for $a^x$.

**Plain English:** We're almost there! We just need to convert $e^{x \ln a}$ back into its original form, $a^x$, to get the final, clean formula.

**Formal/Mathematical Version:**
From Step 6, we have:
$$ \frac{d}{dx}(a^x) = e^{x \ln a} \cdot \ln a $$
Recall from Step 5 that $e^{x \ln a} = a^x$. Substitute this back:
$$ \frac{d}{dx}(a^x) = a^x \ln a $$
**Result:** The derivative of $a^x$ is $a^x \ln a$.

**What could go wrong:** Forgetting the $\ln a$ factor. This is a very common mistake. Remember, $e^x$ is special because $\ln e = 1$, so the $\ln a$ factor becomes 1 for $e^x$.

## 5. Worked examples — multiple, with every step shown

Let's apply these new rules to some problems.

### Example 1: Differentiate $y = e^{2x}$

**Problem:** Find the derivative of $y = e^{2x}$.

**Given:** The function $y = e^{2x}$.
**Want:** $\frac{dy}{dx}$.

**Solution:**
We use the Chain Rule here. The outer function is $e^u$ and the inner function is $u = 2x$.

1.  **Identify the outer function:** Let $f(u) = e^u$.
    *   *Explanation:* This is the exponential part, treating the exponent as a single variable.

2.  **Find the derivative of the outer function:** $f'(u) = e^u$.
    *   *Explanation:* The derivative of $e^u$ with respect to $u$ is simply $e^u$.

3.  **Identify the inner function:** Let $g(x) = 2x$.
    *   *Explanation:* This is the expression in the exponent.

4.  **Find the derivative of the inner function:** $g'(x) = \frac{d}{dx}(2x) = 2$.
    *   *Explanation:* The derivative of $2x$ with respect to $x$ is 2.

5.  **Apply the Chain Rule:** $\frac{dy}{dx} = f'(g(x)) \cdot g'(x)$.
    *   *Explanation:* The Chain Rule states that the derivative of a composite function is the derivative of the outer function evaluated at the inner function, multiplied by the derivative of the inner function.
    $$ \frac{dy}{dx} = e^{2x} \cdot 2 $$
6.  **Simplify the result:**
    $$ \frac{dy}{dx} = 2e^{2x} $$
    *   *Explanation:* Conventionally, we write the constant factor first.

**Final Answer:** $\boxed{\frac{dy}{dx} = 2e^{2x}}$

**Reflection:** This example demonstrates the Chain Rule with $e^x$. The key is to correctly identify the inner function and its derivative.

---

### Example 2: Differentiate $y = 5^x$

**Problem:** Find the derivative of $y = 5^x$.

**Given:** The function $y = 5^x$.
**Want:** $\frac{dy}{dx}$.

**Solution:**
This is a direct application of the formula for $\frac{d}{dx}(a^x)$, where $a=5$.

1.  **Recall the formula for $a^x$:**
    $$ \frac{d}{dx}(a^x) = a^x \ln a $$
    *   *Explanation:* This is the general rule we derived for exponential functions with an arbitrary base $a$.

2.  **Identify $a$:** In this case, $a = 5$.
    *   *Explanation:* The base of the exponential function is 5.

3.  **Substitute $a$ into the formula:**
    $$ \frac{dy}{dx} = 5^x \ln 5 $$
    *   *Explanation:* Replace $a$ with 5 in the derivative formula.

**Final Answer:** $\boxed{\frac{dy}{dx} = 5^x \ln 5}$

**Reflection:** This example highlights the importance of the $\ln a$ factor. It's a straightforward application of the formula, but students often forget the $\ln a$.

---

### Example 3: Differentiate $y = x^3 e^x$

**Problem:** Find the derivative of $y = x^3 e^x$.

**Given:** The function $y = x^3 e^x$.
**Want:** $\frac{dy}{dx}$.

**Solution:**
This function is a product of two simpler functions: $f(x) = x^3$ and $g(x) = e^x$. We must use the Product Rule.

1.  **Recall the Product Rule:** If $y = f(x)g(x)$, then $\frac{dy}{dx} = f'(x)g(x) + f(x)g'(x)$.
    *   *Explanation:* The Product Rule allows us to differentiate a product of two functions.

2.  **Identify $f(x)$ and $g(x)$:**
    Let $f(x) = x^3$.
    Let $g(x) = e^x$.
    *   *Explanation:* We break down the given function into two parts that are multiplied together.

3.  **Find the derivative of $f(x)$:**
    $f'(x) = \frac{d}{dx}(x^3) = 3x^2$.
    *   *Explanation:* This is a standard power rule derivative.

4.  **Find the derivative of $g(x)$:**
    $g'(x) = \frac{d}{dx}(e^x) = e^x$.
    *   *Explanation:* This is the special derivative of $e^x$ we just proved.

5.  **Apply the Product Rule:**
    $$ \frac{dy}{dx} = (3x^2)(e^x) + (x^3)(e^x) $$
    *   *Explanation:* Substitute the functions and their derivatives into the Product Rule formula.

6.  **Factor and simplify (optional but good practice):**
    $$ \frac{dy}{dx} = e^x(3x^2 + x^3) $$
    $$ \frac{dy}{dx} = x^2 e^x(3 + x) $$
    *   *Explanation:* Factoring out common terms like $e^x$ and $x^2$ often makes the expression cleaner and easier to work with later.

**Final Answer:** $\boxed{\frac{dy}{dx} = x^2 e^x(x+3)}$

**Reflection:** This example combines the derivative of $e^x$ with another fundamental differentiation rule (the Product Rule). It's important to recognize when multiple rules are needed.

---

### Example 4: Differentiate $y = e^{x^2 + \sin x}$

**Problem:** Find the derivative of $y = e^{x^2 + \sin x}$.

**Given:** The function $y = e^{x^2 + \sin x}$.
**Want:** $\frac{dy}{dx}$.

**Solution:**
This is a composite function, requiring the Chain Rule. The exponent is a more complex function of $x$.

1.  **Identify the outer function:** Let $f(u) = e^u$.
    *   *Explanation:* The overall structure is $e$ raised to some power.

2.  **Find the derivative of the outer function:** $f'(u) = e^u$.
    *   *Explanation:* The derivative of $e^u$ with respect to $u$ is $e^u$.

3.  **Identify the inner function:** Let $g(x) = x^2 + \sin x$.
    *   *Explanation:* This is the entire expression in the exponent.

4.  **Find the derivative of the inner function:**
    $g'(x) = \frac{d}{dx}(x^2 + \sin x) = \frac{d}{dx}(x^2) + \frac{d}{dx}(\sin x) = 2x + \cos x$.
    *   *Explanation:* We use the sum rule for derivatives and recall the derivatives of $x^2$ and $\sin x$.

5.  **Apply the Chain Rule:** $\frac{dy}{dx} = f'(g(x)) \cdot g'(x)$.
    *   *Explanation:* Substitute the outer derivative (evaluated at the inner function) and the inner derivative.
    $$ \frac{dy}{dx} = e^{(x^2 + \sin x)} \cdot (2x + \cos x) $$

**Final Answer:** $\boxed{\frac{dy}{dx} = (2x + \cos x)e^{x^2 + \sin x}}$

**Reflection:** This example demonstrates the Chain Rule with a more complex inner function. It reinforces the idea that the "something" in $e^{\text{something}}$ can be any differentiable function, and its derivative must be multiplied by $e^{\text{something}}$.

---

### Example 5: Differentiate $y = x^x$

**Problem:** Find the derivative of $y = x^x$.

**Given:** The function $y = x^x$.
**Want:** $\frac{dy}{dx}$.

**Solution:**
This function is neither of the form $x^n$ (power rule) nor $a^x$ (exponential rule) because both the base and the exponent are variables. We must use a technique called logarithmic differentiation.

1.  **Take the natural logarithm of both sides:**
    $$ \ln y = \ln(x^x) $$
    *   *Explanation:* Taking the natural log allows us to bring the exponent down using log properties.

2.  **Use logarithm properties to simplify the right side:**
    $$ \ln y = x \ln x $$
    *   *Explanation:* The property $\ln(M^p) = p \ln M$ is applied here.

3.  **Differentiate both sides with respect to $x$:**
    On the left side, use the Chain Rule: $\frac{d}{dx}(\ln y) = \frac{1}{y} \frac{dy}{dx}$.
    On the right side, use the Product Rule for $x \ln x$:
    Let $f(x) = x$ and $g(x) = \ln x$.
    $f'(x) = 1$.
    $g'(x) = \frac{1}{x}$.
    So, $\frac{d}{dx}(x \ln x) = f'(x)g(x) + f(x)g'(x) = (1)(\ln x) + (x)(\frac{1}{x}) = \ln x + 1$.
    *   *Explanation:* This is the crucial step. We differentiate implicitly on the left and use the Product Rule on the right.

4.  **Equate the derivatives:**
    $$ \frac{1}{y} \frac{dy}{dx} = \ln x + 1 $$
    *   *Explanation:* This combines the results from differentiating both sides.

5.  **Solve for $\frac{dy}{dx}$:** Multiply both sides by $y$.
    $$ \frac{dy}{dx} = y(\ln x + 1) $$
    *   *Explanation:* We want to isolate $\frac{dy}{dx}$.

6.  **Substitute back $y = x^x$:**
    $$ \frac{dy}{dx} = x^x(\ln x + 1) $$
    *   *Explanation:* The final answer should be in terms of $x$ only, so we replace $y$ with its original expression.

**Final Answer:** $\boxed{\frac{dy}{dx} = x^x(\ln x + 1)}$

**Reflection:** This example demonstrates that $x^x$ is a different class of function than $a^x$ or $x^n$. It requires logarithmic differentiation, a powerful technique that relies on the properties of $e^x$ and $\ln x$. It shows the versatility of these concepts.

## 6. Common mistakes and traps

1.  **Forgetting the $\ln a$ factor for $a^x$:** Many students correctly remember $\frac{d}{dx}(e^x) = e^x$ but forget the $\ln a$ when the base is not $e$. They might incorrectly write $\frac{d}{dx}(2^x) = 2^x$.
    *   *Why it happens:* The special case of $e^x$ (where $\ln e = 1$) makes it seem like the $\ln a$ factor is always 1 or non-existent.

2.  **Confusing $\frac{d}{dx}(a^x)$ with $\frac{d}{dx}(x^a)$:** These are fundamentally different.
    *   $\frac{d}{dx}(a^x) = a^x \ln a$ (base is constant, exponent is variable)
    *   $\frac{d}{dx}(x^a) = ax^{a-1}$ (power rule, base is variable, exponent is constant)
    *   *Why it happens:* Both involve exponents, leading to mix-ups. Always identify what is the variable and what is the constant.

3.  **Treating $e$ as a variable:** Differentiating $e^x$ as if it were $x^e$ (using the power rule) would yield $e x^{e-1}$, which is incorrect.
    *   *Why it happens:* Students sometimes forget $e$ is a specific constant number (approx. 2.718), not a variable.

4.  **Errors with the Chain Rule:** When the exponent is a function of $x$ (e.g., $e^{g(x)}$), forgetting to multiply by the derivative of the exponent $g'(x)$.
    *   *Why it happens:* Over-simplification, or not fully understanding the structure of composite functions. The derivative of $e^{g(x)}$ is $e^{g(x)} \cdot g'(x)$.

5.  **Algebraic errors with exponent or logarithm rules:** Incorrectly simplifying expressions like $e^{x+h}$ or $\ln(a^x)$.
    *   *Why it happens:* Lack of practice with basic algebra and logarithm properties, which are foundational for these proofs.

6.  **Misunderstanding the special limit:** Forgetting or incorrectly applying $\lim_{h \to 0} \frac{e^h - 1}{h} = 1$.
    *   *Why it happens:* This limit is often presented as a given fact rather than derived, making its significance and application less intuitive for some students.

## 7. Textbook-precise explanation

The derivation of the derivatives of $e^x$ and $a^x$ relies on the formal definition of the derivative and a crucial limit involving $e$.

**Definition of $e$:** The number $e$ is uniquely defined by the property that $\lim_{h \to 0} \frac{e^h - 1}{h} = 1$. This property is often taken as the definition of $e$ in calculus contexts, or it can be derived from other definitions (e.g., $e = \lim_{n \to \infty} (1 + \frac{1}{n})^n$).

**1. Derivative of $f(x) = e^x$**
Let $f(x) = e^x$. By the definition of the derivative:
$$ \frac{d}{dx}(e^x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} $$
Substitute $f(x) = e^x$:
$$ \frac{d}{dx}(e^x) = \lim_{h \to 0} \frac{e^{x+h} - e^x}{h} $$
Using the exponent rule $e^{x+h} = e^x e^h$:
$$ \frac{d}{dx}(e^x) = \lim_{h \to 0} \frac{e^x e^h - e^x}{h} $$
Factor out $e^x$ from the numerator:
$$ \frac{d}{dx}(e^x) = \lim_{h \to 0} \frac{e^x(e^h - 1)}{h} $$
Since $e^x$ does not depend on $h$, it can be pulled out of the limit:
$$ \frac{d}{dx}(e^x) = e^x \lim_{h \to 0} \frac{e^h - 1}{h} $$
By the defining property of $e$, $\lim_{h \to 0} \frac{e^h - 1}{h} = 1$:
$$ \frac{d}{dx}(e^x) = e^x \cdot 1 $$
$$ \frac{d}{dx}(e^x) = e^x $$
This derivation is standard in calculus textbooks. (Cf. Stewart, Calculus, 9e, §3.4, Theorem 3.4.1)

**2. Derivative of $f(x) = a^x$**
Let $f(x) = a^x$, where $a > 0$ and $a \neq 1$.
We utilize the property that any positive number $a$ can be expressed as $a = e^{\ln a}$. Therefore, we can rewrite $a^x$ as:
$$ a^x = (e^{\ln a})^x $$
Using the exponent rule $(b^m)^n = b^{mn}$:
$$ a^x = e^{x \ln a} $$
Now we need to differentiate $e^{x \ln a}$ with respect to $x$. This requires the Chain Rule.
Let $y = e^{x \ln a}$. Let $u = x \ln a$. Then $y = e^u$.
The Chain Rule states $\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$.
First, differentiate $y$ with respect to $u$:
$$ \frac{dy}{du} = \frac{d}{du}(e^u) = e^u $$
Next, differentiate $u$ with respect to $x$:
Since $a$ is a constant, $\ln a$ is also a constant.
$$ \frac{du}{dx} = \frac{d}{dx}(x \ln a) = \ln a $$
Now, multiply these results:
$$ \frac{dy}{dx} = e^u \cdot \ln a $$
Substitute $u = x \ln a$ back into the expression:
$$ \frac{dy}{dx} = e^{x \ln a} \cdot \ln a $$
Finally, replace $e^{x \ln a}$ with its original form, $a^x$:
$$ \frac{d}{dx}(a^x) = a^x \ln a $$
This proof also relies on the Chain Rule, which is introduced earlier in Calculus I. (Cf. Stewart, Calculus, 9e, §3.4, Theorem 3.4.2)

## 8. ASCII diagrams

Let's visualize the function $y=e^x$ and its derivative.

The function $y=e^x$ has the unique property that its slope at any point $(x, e^x)$ is exactly $e^x$. This means the value of the function itself tells you how steeply it's rising at that moment.

```text
       ^ y
       |
 7.0 --+--------------------------------------
       |                     .
 6.0 --+                   .
       |                 .
 5.0 --+               .
       |             .
 4.0 --+           .
       |         .
 3.0 --+       .
       |     .
 2.0 --+   .  <-- At x=0.69, y=2.0. Slope is 2.0.
       | .
 1.0 --+*-------------------------------------
       | \
 0.0 --+---\---------------------------------> x
       -1.0  0.0  1.0  2.0  3.0
             ^
             |
             At x=0, y=1.0. Slope is 1.0.

Description:
The graph shows the exponential curve y = e^x.
- It passes through (0, 1) because e^0 = 1.
- At x = 0, the function value is 1. The tangent line at (0,1) has a slope of 1.
- As x increases, the function value e^x increases, and so does the slope of the tangent line.
- For example, if e^x = 2, the slope of the curve at that point is also 2.
- If e^x = 4, the slope of the curve at that point is also 4.
This visual representation emphasizes that the function and its derivative are identical, meaning the steepness of the curve always matches its height.
```

## 9. Memory technique — never forget this

1.  **Specific mnemonic or visual hook:**
    *   **For $e^x$**: Think of $e^x$ as a "self-replicating" function. It's so special, so perfect for growth, that when you ask "how fast is it growing?" (its derivative), it just points to itself and says "I am my own growth rate!"
        *   **Visual:** Imagine a small green plant $e^x$. When you differentiate it, it just clones itself perfectly, still $e^x$.
    *   **For $a^x$**: Think of $a^x$ as $e^x$'s less-perfect cousin. It tries to be like $e^x$ (so it starts with $a^x$), but because its base $a$ isn't the perfect $e$, it needs a "correction factor." That correction factor is the natural logarithm of its base, $\ln a$.
        *   **Visual:** The plant $a^x$ also tries to clone itself, but it needs a little "booster shot" of $\ln a$ to complete the replication.

2.  **The 1-3 formulas/facts they MUST overlearn:**
    1.  $$ \frac{d}{dx}(e^x) = e^x $$
    2.  $$ \frac{d}{dx}(a^x) = a^x \ln a $$
    3.  $$ \lim_{h \to 0} \frac{e^h - 1}{h} = 1 $$ (This is the fundamental limit that makes $e^x$ so special and allows the proof.)

3.  **Spaced-repetition schedule:**
    *   **Review 1:** After 1 day. Attempt to re-derive the formulas from scratch.
    *   **Review 2:** After 3 days. Work through 2-3 new problems involving these derivatives.
    *   **Review 3:** After 7 days. Explain the proofs and formulas to an imaginary student (or a real one!).
    *   **Review 4:** After 16 days. Solve a complex problem that integrates these derivatives with other calculus concepts (e.g., related rates, optimization).
    *   **Review 5:** After 35 days. Re-derive the proofs and write down the formulas without looking at any notes.

4.  **The first-principles re-derivation pathway:**
    *   **For $\frac{d}{dx}(e^x)$:**
        1.  Start with the limit definition of the derivative: $\lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$.
        2.  Substitute $f(x) = e^x$.
        3.  Use exponent rule $e^{x+h} = e^x e^h$.
        4.  Factor out $e^x$.
        5.  Pull $e^x$ out of the limit (since it's constant with respect to $h$).
        6.  Apply the special limit $\lim_{h \to 0} \frac{e^h - 1}{h} = 1$.
        7.  Result: $e^x$.
    *   **For $\frac{d}{dx}(a^x)$:**
        1.  Rewrite $a^x$ using base $e$: $a^x = e^{\ln(a^x)} = e^{x \ln a}$.
        2.  Identify this as a composite function $e^{g(x)}$ where $g(x) = x \ln a$.
        3.  Apply the Chain Rule: $\frac{d}{dx}(e^{g(x)}) = e^{g(x)} \cdot g'(x)$.
        4.  Differentiate $g(x) = x \ln a$ to get $g'(x) = \ln a$ (since $\ln a$ is a constant).
        5.  Substitute back: $e^{x \ln a} \cdot \ln a$.
        6.  Replace $e^{x \ln a}$ with $a^x$.
        7.  Result: $a^x \ln a$.

## 10. Connections — what this leads to

The derivatives of $e^x$ and $a^x$ are foundational and appear throughout higher mathematics and science:

*   **Differential Equations:** The fact that $\frac{d}{dx}(e^x) = e^x$ means that $y=e^x$ is a solution to the simplest first-order linear differential equation $y' = y$. More generally, $y=Ce^{kx}$ is the solution to $y' = ky$, which models exponential growth and decay. This is a cornerstone for modeling in biology, physics, engineering, and finance.
*   **Taylor and Maclaurin Series:** The simplicity of $e^x$'s derivatives makes it an ideal candidate for Taylor series expansion. The Maclaurin series for $e^x$ is $e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots$, which is derived directly from its derivatives at $x=0$.
*   **Hyperbolic Functions:** Functions like $\sinh x = \frac{e^x - e^{-x}}{2}$ and $\cosh x = \frac{e^x + e^{-x}}{2}$ are defined in terms of $e^x$ and $e^{-x}$. Their derivatives are derived using the rules for $e^x$.
*   **Complex Numbers (Euler's Formula):** The Taylor series for $e^x$ can be extended to complex numbers, leading to Euler's formula: $e^{ix} = \cos x + i \sin x$. This profoundly connects exponential functions with trigonometry and has vast applications in electrical engineering, signal processing, and quantum mechanics.
*   **Logarithmic Differentiation:** As seen in Example 5, the ability to rewrite $a^x = e^{x \ln a}$ is a specific instance of a more general technique called logarithmic differentiation, used for functions where both base and exponent are variables (e.g., $x^x$, $(\sin x)^x$).
*   **Optimization in Machine Learning:** Many optimization algorithms (like gradient descent) involve calculating derivatives of cost functions. These cost functions often incorporate exponential terms (e.g., in logistic regression, softmax functions), so the derivatives of $e^x$ are constantly used in backpropagation.
*   **Probability and Statistics:** Exponential distributions, Poisson distributions, and the normal distribution all involve the exponential function. Understanding its derivative is crucial for working with probability density functions and cumulative distribution functions.

## 11. Self-check questions

1.  Differentiate $f(x) = 7e^x - 3 \cdot 4^x$.
2.  Find the derivative of $g(t) = t^2 e^{-t}$.
3.  Calculate $\frac{d}{dx}(e^{\sqrt{x}})$.
4.  If $y = (e^x + e^{-x})^2$, find $\frac{dy}{dx}$.
5.  Prove that $\frac{d}{dx}(\log_a x) = \frac{1}{x \ln a}$ using the Chain Rule and the derivative of $a^x$. (Hint: Start by writing $y = \log_a x$ in exponential form $a^y = x$, then differentiate implicitly).