## 1. What it is — in plain English

Imagine you're driving a car. Your speedometer tells you how fast you're going at any instant – that's like a *derivative*, measuring the instantaneous rate of change. If you want to know how far you've traveled over an hour, you could try to keep track of your speed at every tiny moment and add up all those tiny distances. That "adding up" process is what we call *integration*.

The Fundamental Theorem of Calculus (FTC) is like a secret shortcut that connects these two ideas. It says that if you know how fast something is changing (its derivative), you can figure out the total amount of change (its integral) by simply looking at the "start" and "end" states of its original quantity. No need to sum up infinitely many tiny pieces!

Think of it this way: if you want to know the total distance you've traveled, you don't need to stare at your speedometer for an hour and do complex calculations. You just look at your odometer reading at the start of the trip and then again at the end, and subtract the two. The odometer is the "original quantity," and the speedometer is its "rate of change." The FTC tells us this simple subtraction works because the speedometer (derivative) and odometer (original function) are fundamentally linked.

More formally, there are two parts. Part 1 says that if you build a function by accumulating area under another function, then the rate at which that accumulated area changes is just the original function itself. Part 2 says that to find the exact total accumulated area under a curve between two points, you just need to find a function whose rate of change is the curve you're interested in, and then subtract its value at the start point from its value at the end point. These two parts essentially prove that differentiation and integration are inverse operations, like addition and subtraction, or multiplication and division.

## 2. Why it matters — real-world applications

The Fundamental Theorem of Calculus is one of the most profound discoveries in mathematics, underpinning countless applications across science, engineering, and technology. It provides a powerful computational tool and a deep conceptual link.

1.  **Physics and Engineering (Aerospace, Mechanical):** In physics, if you know the velocity of an object as a function of time, the FTC allows you to calculate its exact displacement (change in position) over any time interval. Similarly, if you know the force applied to an object as a function of its position, you can use FTC to calculate the total work done on the object. For example, designing rocket trajectories (SpaceX, NASA) involves integrating acceleration to find velocity and then integrating velocity to find position. Calculating the total fuel consumed, or the total thrust delivered over a burn, often relies on FTC.

2.  **Machine Learning and Data Science (Probability Distributions):** While not always directly applied in the sense of finding antiderivatives for every problem, the conceptual framework of FTC is crucial for understanding probability. The probability that a continuous random variable falls within a certain range is given by the integral of its probability density function (PDF) over that range. The cumulative distribution function (CDF) is the integral of the PDF, and by FTC Part 1, the derivative of the CDF is the PDF. This relationship is fundamental for tasks like anomaly detection, risk assessment, and constructing predictive models.

3.  **Economics and Finance (Accumulation of Change):** In economics, if you have a function describing the rate of change of a quantity over time – for instance, the rate of profit, the rate of investment, or the rate of inflation – the FTC allows you to calculate the total profit, total investment, or total inflation over a given period. For example, a financial analyst might model the rate of cash flow for a project. To find the total cash generated over the project's lifespan, they would integrate the cash flow rate function using FTC Part 2.

4.  **Biology and Medicine (Drug Concentration, Population Growth):** In pharmacology, if you know the rate at which a drug is absorbed into the bloodstream or eliminated from the body, the FTC can be used to determine the total amount of the drug present in the system over time. Similarly, in population dynamics, if you have a model for the rate of change of a population, integrating that rate function allows you to predict the total population size at future points in time.

## 3. Prerequisites — what you must know first

Before diving into the Fundamental Theorem of Calculus, ensure you have a solid grasp of these foundational concepts. If any of these feel unfamiliar, pause and review them first.

*   **Limits:** The concept of approaching a value without necessarily reaching it, crucial for defining derivatives and integrals.
*   **Continuity:** A function is continuous if its graph can be drawn without lifting the pen; formally, $\lim_{x \to c} f(x) = f(c)$. This is a critical condition for both parts of the FTC.
*   **Derivatives:** The instantaneous rate of change of a function, defined as a limit. You should be familiar with derivative rules (power rule, product rule, chain rule, etc.).
*   **Definite Integrals (Riemann Sums):** The formal definition of the definite integral as the limit of Riemann sums, representing the signed area under a curve.
*   **Indefinite Integrals (Antiderivatives):** The process of finding a function whose derivative is a given function. You should know basic antiderivative rules.
*   **Mean Value Theorem for Derivatives (MVT):** If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then there exists $c \in (a,b)$ such that $f'(c) = \frac{f(b)-f(a)}{b-a}$.
*   **Extreme Value Theorem (EVT):** If $f$ is continuous on a closed interval $[a,b]$, then $f$ attains both an absolute maximum and an absolute minimum on that interval.
*   **Mean Value Theorem for Integrals:** If $f$ is continuous on $[a,b]$, then there exists a number $c$ in $[a,b]$ such that $\int_a^b f(x) dx = f(c)(b-a)$. This is particularly useful for proving FTC Part 1.

## 4. The core idea — step by step

The Fundamental Theorem of Calculus consists of two parts, often called FTC Part 1 and FTC Part 2. While they appear distinct, they are two sides of the same coin, demonstrating the inverse relationship between differentiation and integration.

### FTC Part 1: The Derivative of an Integral

This part tells us how to differentiate a function defined as an integral with a variable upper limit.

### Step 1: The Area Accumulation Function

*   **Plain English Statement:** Imagine a function $f(t)$ that draws a curve. If we define a new function, let's call it $A(x)$, which represents the *accumulated area* under $f(t)$ from a fixed starting point $a$ up to a variable point $x$, then $A(x)$ is essentially a "totalizer" for $f(t)$.
*   **Small Concrete Example:** Let $f(t) = t$. The area under $f(t)$ from $a=0$ up to $x$ is a triangle. The base is $x$, height is $x$. So the area $A(x) = \frac{1}{2} x \cdot x = \frac{1}{2} x^2$.
*   **Formal/Mathematical Version:**
    Let $f$ be a continuous function on an interval $[a,b]$.
    Define the **area accumulation function** $A(x)$ as:
    $$A(x) = \int_a^x f(t) dt$$
    where $x$ is in $[a,b]$.
*   **What could go wrong:** The lower limit $a$ must be a constant. The variable $t$ inside the integral is a "dummy variable" and must be different from the upper limit variable $x$. The function $f(t)$ must be continuous on the interval of integration.

### Step 2: Differentiating the Area Accumulation Function

*   **Plain English Statement:** If we take the derivative of this area accumulation function $A(x)$, what do we get? It turns out we simply get back the original function $f(x)$! This means the rate at which the accumulated area changes as $x$ increases is exactly the height of the function $f(x)$ at that point $x$.
*   **Small Concrete Example:** Continuing our example where $A(x) = \frac{1}{2} x^2$ for $f(t)=t$. If we differentiate $A(x)$:
    $$\frac{d}{dx} \left( \frac{1}{2} x^2 \right) = 2 \cdot \frac{1}{2} x^{2-1} = x$$
    This is exactly $f(x)$ (since $f(t)=t$, then $f(x)=x$). This simple example demonstrates the theorem.
*   **Formal/Mathematical Version (FTC Part 1):**
    If $f$ is continuous on $[a,b]$, then the function $A(x)$ defined by
    $$A(x) = \int_a^x f(t) dt \quad \text{for } a \le x \le b$$
    is differentiable on $(a,b)$, and its derivative is
    $$A'(x) = \frac{d}{dx} \left( \int_a^x f(t) dt \right) = f(x)$$
*   **What could go wrong:** If the upper limit is not simply $x$ but a function of $x$, say $g(x)$, then the chain rule must be applied. For example, $\frac{d}{dx} \int_a^{g(x)} f(t) dt = f(g(x)) \cdot g'(x)$. If the variable is in the lower limit, you must first flip the limits and introduce a negative sign: $\int_x^a f(t) dt = - \int_a^x f(t) dt$.

### FTC Part 2: The Evaluation Theorem

This part provides a practical method for evaluating definite integrals without resorting to Riemann sums.

### Step 3: Connecting Antiderivatives to Area

*   **Plain English Statement:** This is the "shortcut" part. It says that to find the *exact* accumulated area under a curve $f(x)$ between two points $a$ and $b$, you just need to find *any* function $F(x)$ whose derivative is $f(x)$ (an antiderivative), and then subtract the value of $F$ at the lower limit $a$ from its value at the upper limit $b$.
*   **Small Concrete Example:** Let $f(x) = x^2$. We want to find the area under $f(x)$ from $x=0$ to $x=2$.
    First, find an antiderivative of $f(x)=x^2$. One such antiderivative is $F(x) = \frac{1}{3}x^3$ (since $\frac{d}{dx}(\frac{1}{3}x^3) = x^2$).
    According to FTC Part 2, the area is $F(2) - F(0)$.
    $F(2) = \frac{1}{3}(2)^3 = \frac{8}{3}$.
    $F(0) = \frac{1}{3}(0)^3 = 0$.
    So the area is $\frac{8}{3} - 0 = \frac{8}{3}$. This is much faster than Riemann sums!
*   **Formal/Mathematical Version (FTC Part 2):**
    If $f$ is continuous on $[a,b]$, and $F$ is any antiderivative of $f$ (i.e., $F'(x) = f(x)$ for all $x$ in $[a,b]$), then
    $$\int_a^b f(x) dx = F(b) - F(a)$$
    This is often written as $F(x) \Big|_a^b = F(b) - F(a)$.
*   **What could go wrong:** The function $f(x)$ must be continuous on the interval $[a,b]$. If $f(x)$ has a discontinuity (e.g., a vertical asymptote) within the interval, FTC Part 2 cannot be applied directly. Also, remember to find *an* antiderivative; the constant of integration cancels out when evaluating $F(b)-F(a)$.

### Step 4: The Proof of FTC Part 1 (Rigorous)

Let $A(x) = \int_a^x f(t) dt$. We want to show that $A'(x) = f(x)$.
By the definition of the derivative:
$$A'(x) = \lim_{h \to 0} \frac{A(x+h) - A(x)}{h}$$
Substitute the definition of $A(x)$:
$$A'(x) = \lim_{h \to 0} \frac{\int_a^{x+h} f(t) dt - \int_a^x f(t) dt}{h}$$
Using the property of definite integrals $\int_a^b f(t) dt + \int_b^c f(t) dt = \int_a^c f(t) dt$, we can write $\int_a^{x+h} f(t) dt = \int_a^x f(t) dt + \int_x^{x+h} f(t) dt$.
So, the numerator becomes $\left( \int_a^x f(t) dt + \int_x^{x+h} f(t) dt \right) - \int_a^x f(t) dt = \int_x^{x+h} f(t) dt$.
Thus,
$$A'(x) = \lim_{h \to 0} \frac{1}{h} \int_x^{x+h} f(t) dt$$
Since $f$ is continuous on $[x, x+h]$ (assuming $h$ is small enough), by the **Mean Value Theorem for Integrals**, there exists a number $c$ in the interval $[x, x+h]$ such that:
$$\int_x^{x+h} f(t) dt = f(c) \cdot ( (x+h) - x ) = f(c) \cdot h$$
Substitute this back into the expression for $A'(x)$:
$$A'(x) = \lim_{h \to 0} \frac{1}{h} [f(c) \cdot h]$$
$$A'(x) = \lim_{h \to 0} f(c)$$
As $h \to 0$, the interval $[x, x+h]$ shrinks to the point $x$. Since $c$ is in this interval, $c$ must approach $x$ as $h \to 0$.
Because $f$ is continuous, we know that $\lim_{c \to x} f(c) = f(x)$.
Therefore,
$$A'(x) = f(x)$$
This completes the proof of FTC Part 1.

### Step 5: The Proof of FTC Part 2 (Rigorous)

Let $f$ be continuous on $[a,b]$, and let $F$ be any antiderivative of $f$ (so $F'(x) = f(x)$). We want to show that $\int_a^b f(x) dx = F(b) - F(a)$.

1.  **Define a partition:** Divide the interval $[a,b]$ into $n$ subintervals of equal width $\Delta x = \frac{b-a}{n}$. Let $x_0=a, x_1, x_2, \dots, x_n=b$ be the endpoints of these subintervals.

2.  **Apply the Mean Value Theorem for Derivatives:** Consider the function $F$ on each subinterval $[x_{i-1}, x_i]$. Since $F$ is an antiderivative of $f$, and $f$ is continuous, $F$ must be differentiable (and thus continuous) on $[a,b]$. Therefore, $F$ satisfies the conditions of the **Mean Value Theorem for Derivatives** on each subinterval $[x_{i-1}, x_i]$.
    According to the MVT, for each $i \in \{1, 2, \dots, n\}$, there exists a number $c_i \in (x_{i-1}, x_i)$ such that:
    $$F(x_i) - F(x_{i-1}) = F'(c_i)(x_i - x_{i-1})$$
    Since $F'(c_i) = f(c_i)$ and $x_i - x_{i-1} = \Delta x$, we can write:
    $$F(x_i) - F(x_{i-1}) = f(c_i) \Delta x$$

3.  **Form a telescoping sum:** Sum these differences over all subintervals:
    $$\sum_{i=1}^n (F(x_i) - F(x_{i-1})) = \sum_{i=1}^n f(c_i) \Delta x$$
    The sum on the left side is a **telescoping sum**:
    $$(F(x_1) - F(x_0)) + (F(x_2) - F(x_1)) + (F(x_3) - F(x_2)) + \dots + (F(x_n) - F(x_{n-1}))$$
    All intermediate terms cancel out, leaving only the last and first terms:
    $$F(x_n) - F(x_0)$$
    Since $x_n = b$ and $x_0 = a$, the left side simplifies to $F(b) - F(a)$.
    So we have:
    $$F(b) - F(a) = \sum_{i=1}^n f(c_i) \Delta x$$

4.  **Take the limit as $n \to \infty$:** The right side of this equation is a Riemann sum for $f$ over $[a,b]$. As $n \to \infty$ (which implies $\Delta x \to 0$), this Riemann sum converges to the definite integral of $f$ from $a$ to $b$.
    $$\lim_{n \to \infty} (F(b) - F(a)) = \lim_{n \to \infty} \sum_{i=1}^n f(c_i) \Delta x$$
    The left side, $F(b) - F(a)$, is a constant with respect to $n$, so its limit is itself.
    The right side, by the definition of the definite integral, is $\int_a^b f(x) dx$.
    Therefore,
    $$F(b) - F(a) = \int_a^b f(x) dx$$
    This completes the proof of FTC Part 2.

## 5. Worked examples — multiple, with every step shown

We will work through examples applying both parts of the Fundamental Theorem of Calculus.

### Example 1: FTC Part 1 (Basic)

**Problem:** Find the derivative of the function $G(x) = \int_1^x \sqrt{t^2 + 5} \, dt$.

**Given:** An integral with a constant lower limit and a variable upper limit $x$.
**Want:** The derivative of $G(x)$ with respect to $x$, i.e., $G'(x)$.

**Solution:**
1.  **Identify the form:** The function $G(x)$ is in the form $\int_a^x f(t) dt$.
    In this case, $a=1$ and $f(t) = \sqrt{t^2 + 5}$.
    $$G(x) = \int_1^x \sqrt{t^2 + 5} \, dt$$
2.  **Apply FTC Part 1:** According to FTC Part 1, if $f$ is continuous, then $\frac{d}{dx} \int_a^x f(t) dt = f(x)$.
    Here, $f(t) = \sqrt{t^2 + 5}$ is continuous for all real $t$ (since $t^2+5 \ge 5 > 0$).
    Therefore, we can directly substitute $x$ for $t$ in $f(t)$.
    $$G'(x) = \frac{d}{dx} \left( \int_1^x \sqrt{t^2 + 5} \, dt \right) = \sqrt{x^2 + 5}$$
    This step directly applies the theorem by replacing the dummy variable $t$ with the upper limit $x$.

**Final Answer:**
$$ \boxed{G'(x) = \sqrt{x^2 + 5}} $$

**Reflection:** This example was straightforward, directly applying the simplest form of FTC Part 1. The key was recognizing the structure and confirming the continuity of the integrand.

### Example 2: FTC Part 1 (with Chain Rule)

**Problem:** Find the derivative of the function $H(x) = \int_0^{x^3} \sin(t^2) \, dt$.

**Given:** An integral with a constant lower limit and a variable upper limit that is a function of $x$, specifically $g(x) = x^3$.
**Want:** The derivative of $H(x)$ with respect to $x$, i.e., $H'(x)$.

**Solution:**
1.  **Identify the form:** The function $H(x)$ is in the form $\int_a^{g(x)} f(t) dt$.
    Here, $a=0$, $f(t) = \sin(t^2)$, and $g(x) = x^3$.
    $$H(x) = \int_0^{x^3} \sin(t^2) \, dt$$
2.  **Apply FTC Part 1 with Chain Rule:** When the upper limit is a function of $x$, say $g(x)$, we use the chain rule.
    The rule is: $\frac{d}{dx} \int_a^{g(x)} f(t) dt = f(g(x)) \cdot g'(x)$.
    First, evaluate $f(g(x))$. Substitute $g(x)=x^3$ into $f(t) = \sin(t^2)$:
    $$f(g(x)) = \sin((x^3)^2) = \sin(x^6)$$
    Next, find the derivative of the upper limit, $g'(x)$:
    $$g(x) = x^3 \implies g'(x) = 3x^2$$
    Now, combine these using the chain rule:
    $$H'(x) = f(g(x)) \cdot g'(x) = \sin(x^6) \cdot (3x^2)$$
    This step applies FTC Part 1, but because the upper limit is a composite function, we multiply by the derivative of that upper limit, following the chain rule.

**Final Answer:**
$$ \boxed{H'(x) = 3x^2 \sin(x^6)} $$

**Reflection:** This example highlights the importance of the chain rule when the upper limit of integration is not simply $x$. Forgetting to multiply by $g'(x)$ is a common error.

### Example 3: FTC Part 1 (with Variable Limits and Chain Rule)

**Problem:** Find the derivative of $K(x) = \int_{x^2}^{\tan x} \frac{1}{1+t^4} \, dt$.

**Given:** An integral with both upper and lower limits being functions of $x$.
**Want:** The derivative of $K(x)$ with respect to $x$, i.e., $K'(x)$.

**Solution:**
1.  **Identify the form:** The function $K(x)$ is in the form $\int_{h(x)}^{g(x)} f(t) dt$.
    Here, $f(t) = \frac{1}{1+t^4}$, $h(x) = x^2$, and $g(x) = \tan x$.
    $$K(x) = \int_{x^2}^{\tan x} \frac{1}{1+t^4} \, dt$$
2.  **Split the integral:** We can split the integral into two parts using a constant $c$ within the domain of $f(t)$:
    $$\int_{h(x)}^{g(x)} f(t) dt = \int_{h(x)}^c f(t) dt + \int_c^{g(x)} f(t) dt$$
    Then, reverse the first integral to have a constant lower limit:
    $$\int_{h(x)}^c f(t) dt = - \int_c^{h(x)} f(t) dt$$
    So, $K(x) = \int_c^{\tan x} \frac{1}{1+t^4} \, dt - \int_c^{x^2} \frac{1}{1+t^4} \, dt$.
    (We can choose any convenient constant $c$, e.g., $c=0$).
    $$K(x) = \int_0^{\tan x} \frac{1}{1+t^4} \, dt - \int_0^{x^2} \frac{1}{1+t^4} \, dt$$
3.  **Apply FTC Part 1 with Chain Rule to each part:**
    For the first part, let $g_1(x) = \tan x$.
    $$\frac{d}{dx} \left( \int_0^{\tan x} \frac{1}{1+t^4} \, dt \right) = \frac{1}{1+(\tan x)^4} \cdot \frac{d}{dx}(\tan x)$$
    $$= \frac{1}{1+\tan^4 x} \cdot \sec^2 x$$
    For the second part, let $g_2(x) = x^2$.
    $$\frac{d}{dx} \left( \int_0^{x^2} \frac{1}{1+t^4} \, dt \right) = \frac{1}{1+(x^2)^4} \cdot \frac{d}{dx}(x^2)$$
    $$= \frac{1}{1+x^8} \cdot (2x)$$
4.  **Combine the results:** Subtract the derivative of the second part from the first.
    $$K'(x) = \frac{\sec^2 x}{1+\tan^4 x} - \frac{2x}{1+x^8}$$
    This step involves applying the chain rule twice, once for each variable limit, and then combining the results using the integral property.

**Final Answer:**
$$ \boxed{K'(x) = \frac{\sec^2 x}{1+\tan^4 x} - \frac{2x}{1+x^8}} $$

**Reflection:** This example shows how to handle variable limits at both the top and bottom. The trick is to split the integral into two, each with a constant lower limit, and remember to negate the term corresponding to the original lower limit.

### Example 4: FTC Part 2 (Basic Polynomial)

**Problem:** Evaluate the definite integral $\int_1^3 (3x^2 - 2x + 1) \, dx$.

**Given:** A definite integral of a polynomial function from $x=1$ to $x=3$.
**Want:** The numerical value of the integral.

**Solution:**
1.  **Identify the integrand and limits:** $f(x) = 3x^2 - 2x + 1$, $a=1$, $b=3$.
    $$ \int_1^3 (3x^2 - 2x + 1) \, dx $$
2.  **Find an antiderivative $F(x)$ of $f(x)$:** We need to find a function $F(x)$ such that $F'(x) = f(x)$. We use the power rule for integration: $\int x^n dx = \frac{x^{n+1}}{n+1} + C$.
    For $3x^2$: $\int 3x^2 dx = 3 \frac{x^{2+1}}{2+1} = 3 \frac{x^3}{3} = x^3$.
    For $-2x$: $\int -2x dx = -2 \frac{x^{1+1}}{1+1} = -2 \frac{x^2}{2} = -x^2$.
    For $1$: $\int 1 dx = x$.
    Combining these, an antiderivative is $F(x) = x^3 - x^2 + x$. (We can ignore the constant of integration $C$ for definite integrals as it cancels out).
    $$ F(x) = x^3 - x^2 + x $$
3.  **Apply FTC Part 2:** Evaluate $F(b) - F(a)$.
    First, evaluate $F(b) = F(3)$:
    $$ F(3) = (3)^3 - (3)^2 + (3) = 27 - 9 + 3 = 21 $$
    Next, evaluate $F(a) = F(1)$:
    $$ F(1) = (1)^3 - (1)^2 + (1) = 1 - 1 + 1 = 1 $$
    Now, subtract $F(a)$ from $F(b)$:
    $$ \int_1^3 (3x^2 - 2x + 1) \, dx = F(3) - F(1) = 21 - 1 = 20 $$
    This step is the direct application of FTC Part 2, substituting the limits into the antiderivative and subtracting.

**Final Answer:**
$$ \boxed{20} $$

**Reflection:** This example demonstrates the most common application of FTC Part 2: evaluating definite integrals. The key is correctly finding the antiderivative and then carefully evaluating it at the upper and lower limits before subtracting.

### Example 5: FTC Part 2 (Trigonometric Function)

**Problem:** Evaluate the definite integral $\int_0^{\pi/2} \cos(x) \, dx$.

**Given:** A definite integral of a trigonometric function from $x=0$ to $x=\pi/2$.
**Want:** The numerical value of the integral.

**Solution:**
1.  **Identify the integrand and limits:** $f(x) = \cos(x)$, $a=0$, $b=\pi/2$.
    $$ \int_0^{\pi/2} \cos(x) \, dx $$
2.  **Find an antiderivative $F(x)$ of $f(x)$:** We need a function $F(x)$ such that $F'(x) = \cos(x)$. We know that $\frac{d}{dx}(\sin x) = \cos x$.
    So, an antiderivative is $F(x) = \sin(x)$.
    $$ F(x) = \sin(x) $$
3.  **Apply FTC Part 2:** Evaluate $F(b) - F(a)$.
    First, evaluate $F(b) = F(\pi/2)$:
    $$ F(\pi/2) = \sin(\pi/2) = 1 $$
    Next, evaluate $F(a) = F(0)$:
    $$ F(0) = \sin(0) = 0 $$
    Now, subtract $F(a)$ from $F(b)$:
    $$ \int_0^{\pi/2} \cos(x) \, dx = F(\pi/2) - F(0) = 1 - 0 = 1 $$
    This step confirms that the area under one "hump" of the cosine curve from $0$ to $\pi/2$ is exactly 1.

**Final Answer:**
$$ \boxed{1} $$

**Reflection:** This example reinforces the application of FTC Part 2 with a common trigonometric function. It's crucial to recall the basic antiderivatives of trigonometric functions and to correctly evaluate them at the given radian limits.

## 6. Common mistakes and traps

Students often stumble on specific points when applying the Fundamental Theorem of Calculus. Be mindful of these common pitfalls:

1.  **Forgetting the Chain Rule in FTC Part 1:** If the upper limit of integration is a function $g(x)$ (e.g., $x^2$, $\sin x$), students often forget to multiply by $g'(x)$ after substituting $g(x)$ into the integrand.
    *   **Incorrect:** $\frac{d}{dx} \int_a^{x^2} f(t) dt = f(x^2)$
    *   **Correct:** $\frac{d}{dx} \int_a^{x^2} f(t) dt = f(x^2) \cdot (2x)$

2.  **Incorrectly Handling Variable Lower Limits in FTC Part 1:** If the variable is in the lower limit, you must first use the property $\int_b^a f(t) dt = -\int_a^b f(t) dt$.
    *   **Incorrect:** $\frac{d}{dx} \int_x^a f(t) dt = f(x)$
    *   **Correct:** $\frac{d}{dx} \int_x^a f(t) dt = \frac{d}{dx} \left( -\int_a^x f(t) dt \right) = -f(x)$

3.  **Applying FTC Part 2 to Discontinuous Functions:** The FTC Part 2 requires the integrand $f(x)$ to be continuous on the closed interval $[a,b]$. If there's a discontinuity (e.g., a vertical asymptote) within or at the endpoints of the interval, the theorem does not apply directly, and the integral might be improper.
    *   **Example:** $\int_{-1}^1 \frac{1}{x^2} dx$. The function $1/x^2$ is discontinuous at $x=0$, which is within the interval $[-1,1]$. Applying FTC2 directly (e.g., using $-1/x$ as antiderivative) would yield $-1/1 - (-1/(-1)) = -1 - 1 = -2$, which is incorrect (and physically impossible for a positive function). This is an improper integral that diverges.

4.  **Algebraic Errors in Antidifferentiation or Evaluation (FTC Part 2):** Simple arithmetic or algebraic mistakes when finding the antiderivative or when plugging in the limits of integration are very common. This often includes sign errors or incorrect exponent manipulation.
    *   **Example:** Forgetting that $\int \frac{1}{x} dx = \ln|x|$ and not $x^0/0$ or similar. Or miscalculating $F(b)-F(a)$.

5.  **Confusing Indefinite and Definite Integrals:** Remember that indefinite integrals ($\int f(x) dx$) result in a family of functions (with a $+C$), while definite integrals ($\int_a^b f(x) dx$) result in a single numerical value (area). The constant $C$ is irrelevant for definite integrals because it cancels out.

6.  **Incorrectly Applying the Chain Rule for Antidifferentiation:** While not strictly an FTC error, it's a prerequisite error that impacts FTC Part 2. For instance, $\int \cos(2x) dx \ne \sin(2x)$. The correct antiderivative is $\frac{1}{2}\sin(2x)$, requiring a mental u-substitution or reverse chain rule.

## 7. Textbook-precise explanation

The Fundamental Theorem of Calculus is a cornerstone of calculus, rigorously establishing the relationship between differentiation and integration.

**Theorem (The Fundamental Theorem of Calculus, Part 1)**
Let $f$ be a continuous function on a closed interval $[a,b]$. Let $A(x)$ be a function defined for $x \in [a,b]$ by:
$$A(x) = \int_a^x f(t) dt$$
Then $A(x)$ is continuous on $[a,b]$ and differentiable on $(a,b)$, and its derivative is given by:
$$A'(x) = f(x)$$
for all $x \in (a,b)$.

**Proof of FTC Part 1:**
Let $x \in (a,b)$. Consider $A'(x)$ by its definition:
$$A'(x) = \lim_{h \to 0} \frac{A(x+h) - A(x)}{h}$$
Substituting the definition of $A(x)$:
$$A'(x) = \lim_{h \to 0} \frac{\int_a^{x+h} f(t) dt - \int_a^x f(t) dt}{h}$$
Using the property of definite integrals, $\int_a^{x+h} f(t) dt = \int_a^x f(t) dt + \int_x^{x+h} f(t) dt$, the numerator simplifies to $\int_x^{x+h} f(t) dt$.
$$A'(x) = \lim_{h \to 0} \frac{1}{h} \int_x^{x+h} f(t) dt$$
Since $f$ is continuous on $[a,b]$, it is continuous on any subinterval $[x, x+h]$ (or $[x+h, x]$ if $h<0$). By the **Mean Value Theorem for Integrals**, there exists a number $c$ between $x$ and $x+h$ such that:
$$\int_x^{x+h} f(t) dt = f(c) \cdot ((x+h) - x) = f(c) \cdot h$$
Substituting this into the expression for $A'(x)$:
$$A'(x) = \lim_{h \to 0} \frac{1}{h} [f(c) \cdot h] = \lim_{h \to 0} f(c)$$
As $h \to 0$, $c$ must approach $x$ because $c$ is between $x$ and $x+h$. Since $f$ is continuous at $x$, we have $\lim_{c \to x} f(c) = f(x)$.
Therefore, $A'(x) = f(x)$.
(Reference: Stewart, Calculus, 9e, §5.3)

---

**Theorem (The Fundamental Theorem of Calculus, Part 2)**
Let $f$ be a continuous function on a closed interval $[a,b]$. If $F$ is any antiderivative of $f$ on $[a,b]$ (i.e., $F'(x) = f(x)$ for all $x \in [a,b]$), then:
$$\int_a^b f(x) dx = F(b) - F(a)$$

**Proof of FTC Part 2:**
Let $A(x) = \int_a^x f(t) dt$. By FTC Part 1, we know that $A'(x) = f(x)$. This means $A(x)$ is an antiderivative of $f(x)$.
Let $F(x)$ be *any* other antiderivative of $f(x)$. We know from the Mean Value Theorem (specifically, its corollary that functions with the same derivative differ by a constant) that if $A'(x) = F'(x) = f(x)$, then $A(x)$ and $F(x)$ must differ by a constant, say $C$.
So, for all $x \in [a,b]$:
$$F(x) = A(x) + C$$
Now, let's evaluate this equation at the limits $a$ and $b$:
At $x=a$:
$$F(a) = A(a) + C$$
We know $A(a) = \int_a^a f(t) dt = 0$ (the area from $a$ to $a$ is zero).
So, $F(a) = 0 + C \implies C = F(a)$.
Now substitute $C$ back into the equation $F(x) = A(x) + C$:
$$F(x) = A(x) + F(a)$$
At $x=b$:
$$F(b) = A(b) + F(a)$$
Rearranging this equation to solve for $A(b)$:
$$A(b) = F(b) - F(a)$$
Since $A(b) = \int_a^b f(t) dt$ by its definition, we have:
$$\int_a^b f(t) dt = F(b) - F(a)$$
This completes the proof of FTC Part 2.
(Reference: Thomas' Calculus, 14e, §5.4)

## 8. ASCII diagrams

### Diagram for FTC Part 1: The Area Accumulation Function's Derivative

Imagine a function $f(t)$ whose graph is shown below. We are interested in the function $A(x) = \int_a^x f(t) dt$, which is the shaded area from $a$ to $x$.

```text
       ^ f(t)
       |
       |     f(x)
       |     *
       |    / \
       |   /   \
       |  /     \
       | /       \
       +-------------------> t
       a      x  x+h
       |------|--|
       <------ Area A(x) ---->
       <------ Area A(x+h) ---->
```

The change in area, $A(x+h) - A(x)$, is the area under $f(t)$ from $x$ to $x+h$.
For a small $h$, this area can be approximated by a rectangle with width $h$ and height $f(x)$.

```text
       ^ f(t)
       |
       |     f(x)  . . . . .
       |     *     .       .
       |    / \    .       .  <-- Area A(x+h) - A(x) approx f(x)*h
       |   /   \   .       .
       |  /     \  .       .
       | /       \ .       .
       +-------------------> t
       a      x  x+h
              |--|
              <-- h -->
```

So, $A(x+h) - A(x) \approx f(x) \cdot h$.
Dividing by $h$: $\frac{A(x+h) - A(x)}{h} \approx f(x)$.
As $h \to 0$, this approximation becomes exact, and the left side is the definition of $A'(x)$.
Thus, $A'(x) = f(x)$.

### Diagram for FTC Part 2: Relating Antiderivatives to Area

FTC Part 2 states that $\int_a^b f(x) dx = F(b) - F(a)$, where $F'(x) = f(x)$. This means the total area under $f(x)$ from $a$ to $b$ can be found by evaluating an antiderivative at the endpoints.

Imagine the Riemann sum definition of the integral: we approximate the area by summing up rectangles.

```text
       ^ f(x)
       |
       |  +---+---+---+---+---+---+---+---+
       |  |   |   |   |   |   |   |   |   |
       |  |   |   |   |   |   |   |   |   |
       |  |   |   |   |   |   |   |   |   |
       +--+---+---+---+---+---+---+---+---+--> x
       a  x1  x2  x3  x4  x5  x6  x7  b
       <----------------------------------->
                      Integral = Area
```

The proof of FTC Part 2 connects this sum of $f(c_i) \Delta x$ to the telescoping sum $F(b) - F(a)$ using the Mean Value Theorem for Derivatives. For each small interval $[x_{i-1}, x_i]$, we have $f(c_i) \Delta x = F(x_i) - F(x_{i-1})$. Summing these up, the intermediate terms cancel out, leaving only $F(b) - F(a)$. This shows that the sum of these "small changes" in $F$ precisely equals the total change in $F$ from $a$ to $b$, which in the limit, is the definite integral.

## 9. Memory technique — never forget this

The Fundamental Theorem of Calculus is arguably *the* most important theorem in introductory calculus. You absolutely must internalize it.

1.  **Specific Mnemonic/Visual Hook:**
    Think of integration and differentiation as **"Undo" buttons** for each other.
    *   **FTC Part 1:** If you *integrate* a function $f(t)$ to get an area function $A(x)$, and then you *differentiate* $A(x)$, you "undo" the integration and get back the original function $f(x)$.
        *   Visual: $\frac{d}{dx} \left( \text{Area under } f(t) \text{ up to } x \right) = f(x)$. The rate of change of accumulated area is the height of the function itself.
    *   **FTC Part 2:** To find the *total change* (integral) of $f(x)$ from $a$ to $b$, you "undo" $f(x)$ by finding its antiderivative $F(x)$, and then just look at the value of $F(x)$ at the start and end points ($F(b) - F(a)$).
        *   Visual: $\text{Total Area} = \text{Final Odometer Reading} - \text{Initial Odometer Reading}$.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **FTC Part 1 (Basic Form):** $\frac{d}{dx} \int_a^x f(t) dt = f(x)$
    *   **FTC Part 1 (Chain Rule Form):** $\frac{d}{dx} \int_a^{g(x)} f(t) dt = f(g(x)) \cdot g'(x)$
    *   **FTC Part 2:** $\int_a^b f(x) dx = F(b) - F(a)$, where $F'(x) = f(x)$.

3.  **Spaced-Repetition Schedule:**
    To truly embed this knowledge, review the concepts and practice problems:
    *   **1 day** after initially learning.
    *   **3 days** after the first review.
    *   **7 days** after the second review.
    *   **16 days** after the third review.
    *   **35 days** after the fourth review.
    Focus on understanding the proofs and applying the theorems to various problems, especially those involving the chain rule.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the precise statement or application, you can rebuild the understanding:
    *   **For FTC Part 1:**
        1.  Start with the definition of the derivative: $A'(x) = \lim_{h \to 0} \frac{A(x+h) - A(x)}{h}$.
        2.  Recall that $A(x) = \int_a^x f(t) dt$. So $A(x+h) - A(x) = \int_x^{x+h} f(t) dt$.
        3.  Think about the geometric interpretation: for small $h$, $\int_x^{x+h} f(t) dt$ is approximately the area of a rectangle with height $f(x)$ and width $h$. So $\approx f(x) \cdot h$.
        4.  Substitute back: $A'(x) \approx \lim_{h \to 0} \frac{f(x) \cdot h}{h} = f(x)$. (The rigorous proof uses the MVT for Integrals to make this approximation exact in the limit).
    *   **For FTC Part 2:**
        1.  Start with the definition of the definite integral as a Riemann sum: $\int_a^b f(x) dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \Delta x$.
        2.  Recall the Mean Value Theorem for Derivatives: $F(x_i) - F(x_{i-1}) = F'(c_i) \Delta x = f(c_i) \Delta x$.
        3.  Consider a telescoping sum: $\sum_{i=1}^n (F(x_i) - F(x_{i-1})) = F(x_n) - F(x_0) = F(b) - F(a)$.
        4.  Connect these: The sum of $f(c_i) \Delta x$ is equal to $F(b) - F(a)$. As $n \to \infty$, the sum becomes the integral. Thus, $\int_a^b f(x) dx = F(b) - F(a)$.

## 10. Connections — what this leads to

The Fundamental Theorem of Calculus is not just an end in itself; it's a gateway to almost all advanced topics in calculus and its applications.

*   **Integration Techniques:** FTC Part 2 provides the "how-to" for evaluating definite integrals. This immediately leads to the development of various techniques for finding antiderivatives ($F(x)$), such as:
    *   **U-Substitution:** The reverse of the chain rule for differentiation.
    *   **Integration by Parts:** The reverse of the product rule for differentiation.
    *   **Trigonometric Integrals and Substitutions:** Techniques for integrating powers of trigonometric functions or functions involving square roots of quadratic expressions.
    *   **Partial Fractions:** A method for integrating rational functions.
    *   **Improper Integrals:** Extending the concept of definite integrals to intervals of infinite length or functions with infinite discontinuities, building on the requirement of continuity for FTC.

*   **Applications of Integration:** With the ability to evaluate definite integrals, a vast array of real-world problems become solvable:
    *   **Area between Curves:** Calculating the area enclosed by two or more functions.
    *   **Volumes of Solids of Revolution:** Using methods like disk/washer or cylindrical shells.
    *   **Arc Length and Surface Area:** Finding the length of a curve or the surface area of a solid formed by revolving a curve.
    *   **Work Done by a Force:** Calculating the energy expended by a variable force.
    *   **Center of Mass and Moments:** Determining the balance point of objects.
    *   **Probability and Statistics:** Calculating probabilities for continuous random variables using probability density functions.

*   **Differential Equations:** The FTC fundamentally links derivatives and integrals. This connection is the basis for solving many differential equations, where the goal is to find a function given a relationship between the function and its derivatives.

*   **Multivariable Calculus:** The concepts of FTC extend into higher dimensions. Theorems like Green's Theorem, Stokes' Theorem, and the Divergence Theorem (Gauss's Theorem) are generalizations of the FTC to vector fields and higher-dimensional integrals. They relate integrals over regions to integrals over their boundaries, much like FTC Part 2 relates an integral over an interval to the values of an antiderivative at its boundary points.

*   **Numerical Methods:** While FTC provides exact solutions, many functions don't have elementary antiderivatives. The conceptual understanding of the integral as an accumulated sum (from Riemann sums, which FTC bridges) is crucial for developing and understanding numerical integration methods (e.g., Trapezoidal Rule, Simpson's Rule) used in computational mathematics and engineering.

## 11. Self-check questions

Test your understanding with these questions. Do not look for answers until you have thoroughly attempted them.

1.  Let $F(x) = \int_2^x (t^3 - 4t) dt$.
    a) Find $F'(x)$.
    b) Find $F''(x)$.
    c) At what value(s) of $x$ does $F(x)$ have a local maximum or minimum?

2.  Evaluate the definite integral $\int_0^4 \left( \sqrt{x} - \frac{1}{x+1} \right) dx$.

3.  Find $\frac{d}{dx} \int_{x^2}^{e^x} \ln(t^2+1) dt$.

4.  Consider a function $f(x)$ that is continuous on $[0, 5]$. If $F(x)$ is an antiderivative of $f(x)$ such that $F(0)=3$ and $F(5)=10$, what is the value of $\int_0^5 f(x) dx$? Explain your reasoning.

5.  A particle's velocity is given by $v(t) = 6t^2 - 2t$ meters per second.
    a) Find the net displacement of the particle between $t=1$ and $t=3$ seconds.
    b) If the particle's initial position at $t=0$ is $s(0)=5$ meters, find its position function $s(t)$.