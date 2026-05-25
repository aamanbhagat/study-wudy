## 1. What it is — in plain English

Imagine you have two things that are changing over time, and you're interested in how their *product* is changing. For instance, think about a rectangular garden whose length and width are both growing. You know how fast the length is growing, and you know how fast the width is growing. The product rule tells you how fast the *area* of the garden is growing.

It's not as simple as just multiplying the growth rates of the length and width. That would be like saying if the length grows by 1 foot/day and the width grows by 1 foot/day, the area grows by 1 square foot/day – which isn't generally true because the existing dimensions also play a role.

The product rule gives you a precise formula for this combined rate of change. It says that the rate of change of the product of two functions is found by taking the rate of change of the first function and multiplying it by the *original* second function, then adding that to the *original* first function multiplied by the rate of change of the second function.

So, for our garden, the rate of change of the area is: (rate of change of length) times (current width) PLUS (current length) times (rate of change of width). It accounts for how each dimension's growth impacts the total area, considering the other dimension's current size.

## 2. Why it matters — real-world applications

The product rule is a fundamental tool in calculus, essential for understanding how complex systems change when they involve multiplicative relationships.

1.  **Electrical Engineering (Physics):** The instantaneous power $P$ dissipated by a resistor is given by $P(t) = I(t)V(t)$, where $I(t)$ is the current and $V(t)$ is the voltage, both of which can change over time. If you need to know the rate at which power is changing (e.g., to design circuits that can handle rapid power fluctuations or to understand energy dissipation), you'd use the product rule to find $\frac{dP}{dt} = I'(t)V(t) + I(t)V'(t)$. This is crucial for designing robust electronic devices and power grids.

2.  **Economics and Business:** A company's revenue $R$ is often calculated as the product of the price $P$ of a product and the quantity $Q$ sold: $R(t) = P(t)Q(t)$. Both price and quantity can fluctuate with market conditions or time. To understand how quickly revenue is changing with respect to time (e.g., to predict future earnings or react to market shifts), you'd apply the product rule: $\frac{dR}{dt} = P'(t)Q(t) + P(t)Q'(t)$. This helps businesses make strategic decisions about pricing and production.

3.  **Aerospace Engineering (Physics):** The thrust $T$ produced by a rocket engine can be simplified as $T = \dot{m} v_e$, where $\dot{m}$ is the mass flow rate of propellant and $v_e$ is the exhaust velocity. Both $\dot{m}$ and $v_e$ can change during a flight (e.g., due to fuel consumption or engine throttling). If engineers need to calculate the rate of change of thrust $\frac{dT}{dt}$ (perhaps for precise trajectory control or to analyze engine performance under varying conditions), they would use the product rule: $\frac{dT}{dt} = \dot{m}' v_e + \dot{m} v_e'$. This is vital for designing propulsion systems and mission planning.

4.  **Machine Learning:** While the Chain Rule is more famously associated with backpropagation in neural networks, the Product Rule is implicitly used when computing gradients of loss functions that involve products of terms. For example, if a component of a loss function is $L = f(w)g(w)$ where $w$ is a weight parameter, then $\frac{\partial L}{\partial w} = f'(w)g(w) + f(w)g'(w)$. Understanding how parameters affect the loss function's rate of change is fundamental to optimizing machine learning models during training.

## 3. Prerequisites — what you must know first

Before diving into the proof of the product rule, you must have a solid grasp of the following foundational concepts. If any of these feel shaky, pause and review them thoroughly.

*   **Functions:** A clear understanding of what a function is, its notation ($f(x)$, $g(x)$), domain, and range. You should be comfortable with basic function operations like addition, subtraction, multiplication, and composition.
*   **Limits:** The formal definition of a limit ($\lim_{x \to a} f(x) = L$) and its intuitive meaning (what value a function approaches). You need to be proficient with limit properties, especially:
    *   **Limit of a sum:** $\lim_{x \to a} [f(x) + g(x)] = \lim_{x \to a} f(x) + \lim_{x \to a} g(x)$
    *   **Limit of a product:** $\lim_{x \to a} [f(x)g(x)] = \lim_{x \to a} f(x) \cdot \lim_{x \to a} g(x)$
    *   **Limit of a constant multiple:** $\lim_{x \to a} [c \cdot f(x)] = c \cdot \lim_{x \to a} f(x)$
*   **Continuity:** An informal understanding that a function is continuous if its graph can be drawn without lifting the pen. Crucially, you should know that **if a function is differentiable at a point, it must also be continuous at that point.** This fact will be used when evaluating certain limits in the proof.
*   **Derivative Definition (First Principles):** This is the bedrock of the proof. You must know and understand the limit definition of the derivative:
    $$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$
    You should also be comfortable using this definition to find derivatives of simple functions (e.g., $x^2$, $1/x$).
*   **Algebraic Manipulation:** Strong skills in factoring expressions, expanding terms, simplifying fractions, and general algebraic rearrangement are essential. The proof involves several steps of algebraic manipulation.

## 4. The core idea — step by step

The proof of the product rule relies entirely on the fundamental definition of the derivative. The core idea is to cleverly manipulate the expression within the limit definition to isolate terms that resemble the derivatives of the individual functions.

Let $y = P(x) = f(x)g(x)$ be the product of two differentiable functions $f$ and $g$. We want to find $P'(x)$.

### Step 1: Start with the definition of the derivative

*   **Plain-English Statement:** To find the derivative of any function, we always go back to its definition: the limit of the difference quotient. We're applying this definition to our product function $P(x) = f(x)g(x)$.
*   **Small Concrete Example:** If $P(x) = x^2 \sin(x)$, then $f(x) = x^2$ and $g(x) = \sin(x)$. The first step is to write out the definition for $P(x)$.
*   **Formal/Mathematical Version:**
    $$P'(x) = \frac{d}{dx}[f(x)g(x)] = \lim_{h \to 0} \frac{f(x+h)g(x+h) - f(x)g(x)}{h}$$
*   **What Could Go Wrong:** A common mistake is to confuse $f(x+h)$ with $f(x) + h$, or to incorrectly substitute the product into the numerator. Remember, it's the *entire function* evaluated at $x+h$, minus the *entire function* evaluated at $x$.

### Step 2: The "add and subtract" trick

*   **Plain-English Statement:** The numerator, $f(x+h)g(x+h) - f(x)g(x)$, doesn't easily factor into terms that look like $f(x+h)-f(x)$ or $g(x+h)-g(x)$. To create these desired terms, we use a standard algebraic trick in calculus proofs: we add and subtract the same term in the numerator. This doesn't change the value of the expression, but it allows us to rearrange it in a helpful way. The specific term we choose is $f(x)g(x+h)$. (Alternatively, you could choose $f(x+h)g(x)$).
*   **Small Concrete Example:** Imagine you have $AB - CD$. You want to make it look like $(A-C)B + C(B-D)$. You'd add and subtract $CB$: $AB - CB + CB - CD = B(A-C) + C(B-D)$. Here, $A=f(x+h)$, $B=g(x+h)$, $C=f(x)$, $D=g(x)$. We add and subtract $f(x)g(x+h)$.
*   **Formal/Mathematical Version:**
    $$P'(x) = \lim_{h \to 0} \frac{f(x+h)g(x+h) - f(x)g(x+h) + f(x)g(x+h) - f(x)g(x)}{h}$$
*   **What Could Go Wrong:** Choosing the wrong term to add and subtract, or making a sign error. The key is to pick a term that shares a factor with *both* $f(x+h)g(x+h)$ and $f(x)g(x)$ after rearrangement. $f(x)g(x+h)$ works because it has $g(x+h)$ in common with the first term and $f(x)$ in common with the last term.

### Step 3: Rearrange and factor

*   **Plain-English Statement:** Now that we've added and subtracted the clever term, we can group the four terms in the numerator into two pairs. Each pair will have a common factor that we can pull out, leaving behind a difference that looks like part of a derivative definition.
*   **Small Concrete Example:** From the previous step, we have:
    $[f(x+h)g(x+h) - f(x)g(x+h)] + [f(x)g(x+h) - f(x)g(x)]$
    Factor $g(x+h)$ from the first pair and $f(x)$ from the second pair.
*   **Formal/Mathematical Version:**
    $$P'(x) = \lim_{h \to 0} \frac{g(x+h)[f(x+h) - f(x)] + f(x)[g(x+h) - g(x)]}{h}$$
    Now, we can split this single fraction into two separate fractions:
    $$P'(x) = \lim_{h \to 0} \left[ \frac{g(x+h)[f(x+h) - f(x)]}{h} + \frac{f(x)[g(x+h) - g(x)]}{h} \right]$$
*   **What Could Go Wrong:** Algebraic errors during factoring or splitting the fraction. Ensure each term in the numerator is divided by $h$.

### Step 4: Apply limit properties

*   **Plain-English Statement:** We now have a limit of a sum of two terms. We can use the limit property that states the limit of a sum is the sum of the limits. Furthermore, each of these new limits involves a product, so we can use the limit of a product property as well. This allows us to break down the complex limit into simpler, recognizable pieces.
*   **Small Concrete Example:** If you have $\lim_{h \to 0} (A_h B_h + C_h D_h)$, you can write it as $(\lim_{h \to 0} A_h)(\lim_{h \to 0} B_h) + (\lim_{h \to 0} C_h)(\lim_{h \to 0} D_h)$.
*   **Formal/Mathematical Version:**
    $$P'(x) = \lim_{h \to 0} \left( g(x+h) \cdot \frac{f(x+h) - f(x)}{h} \right) + \lim_{h \to 0} \left( f(x) \cdot \frac{g(x+h) - g(x)}{h} \right)$$
    Applying the limit of a product property:
    $$P'(x) = \left( \lim_{h \to 0} g(x+h) \right) \cdot \left( \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} \right) + \left( \lim_{h \to 0} f(x) \right) \cdot \left( \lim_{h \to 0} \frac{g(x+h) - g(x)}{h} \right)$$
*   **What Could Go Wrong:** Incorrectly applying limit properties, especially forgetting that $f(x)$ is treated as a constant with respect to the limit as $h \to 0$.

### Step 5: Evaluate the limits

*   **Plain-English Statement:** At this point, each individual limit should be recognizable. We have terms that are exactly the definition of $f'(x)$ and $g'(x)$. We also have limits of $g(x+h)$ and $f(x)$.
*   **Small Concrete Example:** You know $\lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$ is $f'(x)$. You also know that since $g(x)$ is differentiable, it must be continuous, meaning $\lim_{h \to 0} g(x+h) = g(x)$.
*   **Formal/Mathematical Version:**
    Let's evaluate each limit:
    1.  $\lim_{h \to 0} \frac{f(x+h) - f(x)}{h} = f'(x)$ (by definition of the derivative)
    2.  $\lim_{h \to 0} \frac{g(x+h) - g(x)}{h} = g'(x)$ (by definition of the derivative)
    3.  $\lim_{h \to 0} f(x) = f(x)$ (since $f(x)$ does not depend on $h$, it's a constant with respect to this limit)
    4.  $\lim_{h \to 0} g(x+h) = g(x)$ (since $g$ is differentiable, it is continuous, and for a continuous function, $\lim_{h \to 0} g(x+h) = g(x+0) = g(x)$)

    Substituting these back into the expression from Step 4:
    $$P'(x) = g(x) \cdot f'(x) + f(x) \cdot g'(x)$$
    This is the product rule, often written as:
    $$\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)$$
*   **What Could Go Wrong:** Forgetting the continuity argument for $\lim_{h \to 0} g(x+h) = g(x)$. It's a subtle but important point that differentiability implies continuity.

## 5. Worked examples — multiple, with every step shown

Here are several examples demonstrating the application of the product rule.

### Example 1: Basic Polynomial and Trigonometric Function

**Problem:** Find the derivative of $y = x^2 \sin(x)$.

**Given:** $y = f(x)g(x)$ where $f(x) = x^2$ and $g(x) = \sin(x)$.
**Want:** $\frac{dy}{dx}$

**Solution:**
1.  **Identify $f(x)$ and $g(x)$:**
    $$f(x) = x^2$$
    $$g(x) = \sin(x)$$
    *We clearly identify the two functions being multiplied.*

2.  **Find the derivatives of $f(x)$ and $g(x)$:**
    $$f'(x) = \frac{d}{dx}(x^2) = 2x$$
    $$g'(x) = \frac{d}{dx}(\sin(x)) = \cos(x)$$
    *We apply the power rule and the derivative of $\sin(x)$.*

3.  **Apply the Product Rule formula:**
    The product rule states: $\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)$
    *This is the core formula we're using.*

4.  **Substitute the functions and their derivatives into the formula:**
    $$\frac{dy}{dx} = (2x)(\sin(x)) + (x^2)(\cos(x))$$
    *Carefully substitute each part into its correct place in the formula.*

5.  **Simplify the expression (if possible):**
    $$\frac{dy}{dx} = 2x \sin(x) + x^2 \cos(x)$$
    *In this case, no further algebraic simplification is obvious or necessary.*

**Final Answer:**
$$ \boxed{\frac{dy}{dx} = 2x \sin(x) + x^2 \cos(x)} $$

**Reflection:** This example was straightforward, demonstrating the direct application of the product rule with common functions. The main "trick" is simply to correctly identify $f, g, f', g'$ and substitute them.

---

### Example 2: Polynomial and Exponential Function

**Problem:** Differentiate $y = (3x^2 - 5x)e^x$.

**Given:** $y = f(x)g(x)$ where $f(x) = 3x^2 - 5x$ and $g(x) = e^x$.
**Want:** $\frac{dy}{dx}$

**Solution:**
1.  **Identify $f(x)$ and $g(x)$:**
    $$f(x) = 3x^2 - 5x$$
    $$g(x) = e^x$$
    *Breaking down the original function into its two multiplicative components.*

2.  **Find the derivatives of $f(x)$ and $g(x)$:**
    $$f'(x) = \frac{d}{dx}(3x^2 - 5x) = 6x - 5$$
    $$g'(x) = \frac{d}{dx}(e^x) = e^x$$
    *Using the power rule and the derivative of $e^x$.*

3.  **Apply the Product Rule formula:**
    $$\frac{dy}{dx} = f'(x)g(x) + f(x)g'(x)$$
    *Stating the rule explicitly before substitution.*

4.  **Substitute the functions and their derivatives:**
    $$\frac{dy}{dx} = (6x - 5)(e^x) + (3x^2 - 5x)(e^x)$$
    *Substituting each part correctly.*

5.  **Simplify the expression:**
    Notice that $e^x$ is a common factor in both terms.
    $$\frac{dy}{dx} = e^x (6x - 5 + 3x^2 - 5x)$$
    Combine like terms inside the parentheses:
    $$\frac{dy}{dx} = e^x (3x^2 + x - 5)$$
    *Factoring out common terms often leads to a cleaner and sometimes more useful form.*

**Final Answer:**
$$ \boxed{\frac{dy}{dx} = e^x (3x^2 + x - 5)} $$

**Reflection:** This example highlights the importance of algebraic simplification after applying the rule. Factoring out common terms (like $e^x$) is a good practice, especially for subsequent steps like finding critical points or second derivatives.

---

### Example 3: Radical and Logarithmic Function

**Problem:** Find the derivative of $h(x) = \sqrt{x} \ln(x)$.

**Given:** $h(x) = f(x)g(x)$ where $f(x) = \sqrt{x}$ and $g(x) = \ln(x)$.
**Want:** $h'(x)$

**Solution:**
1.  **Identify $f(x)$ and $g(x)$ (and rewrite $f(x)$ for easier differentiation):**
    $$f(x) = \sqrt{x} = x^{1/2}$$
    $$g(x) = \ln(x)$$
    *Rewriting $\sqrt{x}$ as $x^{1/2}$ is crucial for applying the power rule.*

2.  **Find the derivatives of $f(x)$ and $g(x)$:**
    $$f'(x) = \frac{d}{dx}(x^{1/2}) = \frac{1}{2}x^{(1/2)-1} = \frac{1}{2}x^{-1/2} = \frac{1}{2\sqrt{x}}$$
    $$g'(x) = \frac{d}{dx}(\ln(x)) = \frac{1}{x}$$
    *Applying the power rule and the derivative of $\ln(x)$.*

3.  **Apply the Product Rule formula:**
    $$h'(x) = f'(x)g(x) + f(x)g'(x)$$
    *The standard formula.*

4.  **Substitute the functions and their derivatives:**
    $$h'(x) = \left(\frac{1}{2\sqrt{x}}\right)(\ln(x)) + (\sqrt{x})\left(\frac{1}{x}\right)$$
    *Careful substitution is key.*

5.  **Simplify the expression:**
    $$h'(x) = \frac{\ln(x)}{2\sqrt{x}} + \frac{\sqrt{x}}{x}$$
    Recall that $\frac{\sqrt{x}}{x} = \frac{x^{1/2}}{x^1} = x^{1/2 - 1} = x^{-1/2} = \frac{1}{\sqrt{x}}$.
    $$h'(x) = \frac{\ln(x)}{2\sqrt{x}} + \frac{1}{\sqrt{x}}$$
    To combine these terms, find a common denominator, which is $2\sqrt{x}$:
    $$h'(x) = \frac{\ln(x)}{2\sqrt{x}} + \frac{1 \cdot 2}{\sqrt{x} \cdot 2}$$
    $$h'(x) = \frac{\ln(x) + 2}{2\sqrt{x}}$$
    *Simplification here involves fractional exponents and finding a common denominator, which can be a point of error.*

**Final Answer:**
$$ \boxed{h'(x) = \frac{\ln(x) + 2}{2\sqrt{x}}} $$

**Reflection:** This example was trickier due to the need to rewrite $\sqrt{x}$ as $x^{1/2}$ and the subsequent algebraic simplification involving fractions and radicals. Mastery of exponent rules and fraction arithmetic is crucial for presenting a fully simplified answer.

---

### Example 4: Product of Three Functions (using the rule twice)

**Problem:** Find the derivative of $y = x^2 e^x \cos(x)$.

**Given:** $y = x^2 e^x \cos(x)$. This is a product of three functions.
**Want:** $\frac{dy}{dx}$

**Solution:**
The product rule, as formally proven, applies to two functions. To differentiate a product of three functions, we can group two of them together and treat that group as a single function. Let $f(x) = x^2 e^x$ and $g(x) = \cos(x)$.

1.  **Identify $f(x)$ and $g(x)$:**
    $$f(x) = x^2 e^x$$
    $$g(x) = \cos(x)$$
    *We've grouped $x^2$ and $e^x$ as one function to apply the product rule for two terms initially.*

2.  **Find the derivative of $f(x)$ (this requires the product rule itself!):**
    Let $u(x) = x^2$ and $v(x) = e^x$.
    Then $u'(x) = 2x$ and $v'(x) = e^x$.
    Applying the product rule to find $f'(x)$:
    $$f'(x) = u'(x)v(x) + u(x)v'(x) = (2x)(e^x) + (x^2)(e^x)$$
    $$f'(x) = 2xe^x + x^2e^x = e^x(2x + x^2)$$
    *This is the first nested application of the product rule. This step is often where students make mistakes.*

3.  **Find the derivative of $g(x)$:**
    $$g'(x) = \frac{d}{dx}(\cos(x)) = -\sin(x)$$
    *Standard derivative of $\cos(x)$.*

4.  **Apply the Product Rule for $y = f(x)g(x)$:**
    $$\frac{dy}{dx} = f'(x)g(x) + f(x)g'(x)$$
    *The main product rule application.*

5.  **Substitute the functions and their derivatives:**
    $$\frac{dy}{dx} = [e^x(2x + x^2)](\cos(x)) + (x^2 e^x)(-\sin(x))$$
    *Carefully substituting the calculated $f'(x)$ and other terms.*

6.  **Simplify the expression:**
    $$\frac{dy}{dx} = x e^x (2 + x) \cos(x) - x^2 e^x \sin(x)$$
    We can factor out $x e^x$ from both terms:
    $$\frac{dy}{dx} = x e^x [(2 + x) \cos(x) - x \sin(x)]$$
    $$\frac{dy}{dx} = x e^x [2 \cos(x) + x \cos(x) - x \sin(x)]$$
    *Factoring simplifies the expression significantly.*

**Final Answer:**
$$ \boxed{\frac{dy}{dx} = x e^x (2 \cos(x) + x \cos(x) - x \sin(x))} $$

**Reflection:** This example demonstrates that the product rule can be applied iteratively for products of more than two functions. It also shows how algebraic simplification (especially factoring common terms like $e^x$ and $x$) is crucial for arriving at a clean and manageable final answer. This problem is harder because it requires a "nested" application of the product rule.

## 6. Common mistakes and traps

Students often stumble when applying the product rule. Here are some of the most frequent errors:

1.  **"Derivative of a product is the product of the derivatives":** This is the most common and fundamental mistake. Students incorrectly assume that if $y = f(x)g(x)$, then $y' = f'(x)g'(x)$. This is almost never true. For example, if $f(x)=x$ and $g(x)=x$, then $y=x^2$, so $y'=2x$. But $f'(x)=1$ and $g'(x)=1$, so $f'(x)g'(x)=1 \cdot 1 = 1$, which is incorrect.
2.  **Forgetting to differentiate one of the terms:** In the formula $f'(x)g(x) + f(x)g'(x)$, students might correctly differentiate $f(x)$ and multiply by $g(x)$, but then forget to differentiate $g(x)$ in the second term, or vice-versa. E.g., $(x^2 \sin x)' = (2x)(\sin x) + (x^2)(\sin x)$ (missing the derivative of $\sin x$).
3.  **Algebraic errors during simplification:** After correctly applying the product rule, students often make mistakes when expanding, factoring, or combining terms. This is particularly true with negative signs, fractional exponents, or complex expressions.
4.  **Misidentifying $f(x)$ and $g(x)$:** Especially when functions are complex or when there are multiple terms. Clearly defining $f(x)$ and $g(x)$ at the start of the problem can prevent this.
5.  **Confusing with the Chain Rule:** While the product rule and chain rule are often used together (e.g., if $f(x) = (x^2+1)^3 \sin x$), they are distinct rules for different situations. The product rule applies when you have one function *multiplied* by another, while the chain rule applies when you have a function *composed* with another (a function inside another function).
6.  **Applying to constant multiples:** If you have $y = c \cdot f(x)$ where $c$ is a constant, the constant multiple rule is simpler: $y' = c \cdot f'(x)$. While the product rule *would* work (let $g(x)=c$, then $g'(x)=0$, so $(cf)' = c'f + cf' = 0 \cdot f + c \cdot f' = c f'$), it's an unnecessary complication and can lead to errors if $c$ is mistakenly differentiated as a variable.

## 7. Textbook-precise explanation

**Theorem (The Product Rule):**
If $f$ and $g$ are differentiable functions, then their product $P(x) = f(x)g(x)$ is also differentiable, and its derivative is given by:
$$\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)$$
Alternatively, in Leibniz notation:
$$\frac{d}{dx}[f(x)g(x)] = \frac{df}{dx}g(x) + f(x)\frac{dg}{dx}$$

**Proof:**
Let $P(x) = f(x)g(x)$. By the definition of the derivative, we have:
$$P'(x) = \lim_{h \to 0} \frac{P(x+h) - P(x)}{h}$$
Substituting $P(x) = f(x)g(x)$:
$$P'(x) = \lim_{h \to 0} \frac{f(x+h)g(x+h) - f(x)g(x)}{h}$$
To manipulate the numerator into a form that allows us to identify the derivatives of $f$ and $g$, we employ an algebraic trick: we add and subtract the term $f(x)g(x+h)$. This does not change the value of the expression:
$$P'(x) = \lim_{h \to 0} \frac{f(x+h)g(x+h) - f(x)g(x+h) + f(x)g(x+h) - f(x)g(x)}{h}$$
Now, we can group the terms in the numerator and factor out common factors:
$$P'(x) = \lim_{h \to 0} \frac{g(x+h)[f(x+h) - f(x)] + f(x)[g(x+h) - g(x)]}{h}$$
Using the limit property that the limit of a sum is the sum of the limits, we can split this into two separate limits:
$$P'(x) = \lim_{h \to 0} \frac{g(x+h)[f(x+h) - f(x)]}{h} + \lim_{h \to 0} \frac{f(x)[g(x+h) - g(x)]}{h}$$
Next, we apply the limit property that the limit of a product is the product of the limits:
$$P'(x) = \left( \lim_{h \to 0} g(x+h) \right) \cdot \left( \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} \right) + \left( \lim_{h \to 0} f(x) \right) \cdot \left( \lim_{h \to 0} \frac{g(x+h) - g(x)}{h} \right)$$
Now we evaluate each of these individual limits:
1.  $\lim_{h \to 0} \frac{f(x+h) - f(x)}{h} = f'(x)$ by the definition of the derivative.
2.  $\lim_{h \to 0} \frac{g(x+h) - g(x)}{h} = g'(x)$ by the definition of the derivative.
3.  $\lim_{h \to 0} f(x) = f(x)$ because $f(x)$ does not depend on $h$.
4.  Since $g$ is differentiable at $x$, it must be continuous at $x$. Therefore, $\lim_{h \to 0} g(x+h) = g(x)$.

Substituting these results back into the expression for $P'(x)$:
$$P'(x) = g(x) \cdot f'(x) + f(x) \cdot g'(x)$$
Rearranging the terms for the standard form:
$$P'(x) = f'(x)g(x) + f(x)g'(x)$$
This completes the proof.

**Reference:** This proof can be found in most standard calculus textbooks, for example:
*   Stewart, James. *Calculus: Early Transcendentals*. 9th ed., Cengage Learning, 2021. (§3.2, "The Product and Quotient Rules")
*   Thomas, George B., et al. *Thomas' Calculus: Early Transcendentals*. 14th ed., Pearson, 2017. (§3.3, "Rules for Differentiation")

## 8. ASCII diagrams

The product rule can be intuitively understood by considering the area of a rectangle whose sides are changing.

Let a rectangle have length $L$ and width $W$. Its area is $A = L \cdot W$.
Now, suppose the length changes by a small amount $\Delta L$ and the width changes by a small amount $\Delta W$.
The new length is $L + \Delta L$ and the new width is $W + \Delta W$.
The new area is $(L + \Delta L)(W + \Delta W)$.

The change in area, $\Delta A$, is the new area minus the old area:
$\Delta A = (L + \Delta L)(W + \Delta W) - LW$

Let's visualize this change:

```text
       W
  +-----------------+
  |                 |
L |       LW        |
  |                 |
  +-----------------+
  |       dL*W      |
  +-----------------+
        dL

The original rectangle has area LW.
When L increases by dL and W increases by dW, we add three new rectangular pieces:

      W
  +-----------------+  <-- Original width
  |                 |
L |       LW        |  <-- Original area
  |                 |
  +-----------------+
  |       dL*W      |  <-- A strip added to the bottom (change in L * original W)
  +-----------------+
        dL

Now, let's add the strip for the width change:

      W         dW
  +---------+---------+
  |         |         |
L |   LW    |   L*dW  |  <-- Strip added to the right (original L * change in W)
  |         |         |
  +---------+---------+
  |  dL*W   | dL*dW   |  <-- Small corner piece (change in L * change in W)
  +---------+---------+
        dL

The total change in area (the sum of the three added pieces) is:
ΔA = (L * ΔW) + (W * ΔL) + (ΔL * ΔW)

If we divide by a small change in time (Δt) to get rates of change:
ΔA/Δt = L * (ΔW/Δt) + W * (ΔL/Δt) + (ΔL * ΔW)/Δt

As Δt approaches 0 (and thus ΔL and ΔW also approach 0):
- ΔA/Δt becomes dA/dt
- ΔW/Δt becomes dW/dt
- ΔL/Δt becomes dL/dt
- (ΔL * ΔW)/Δt approaches 0, because ΔL * ΔW is a "second-order" small term (e.g., if ΔL and ΔW are 0.001, their product is 0.000001, which is much smaller than 0.001). So, (ΔL * ΔW)/Δt = (ΔL/Δt) * ΔW, and since ΔW goes to 0, this whole term goes to 0.

Thus, in the limit:
dA/dt = L * dW/dt + W * dL/dt

This directly maps to the product rule:
If A(x) = f(x)g(x), then A'(x) = f(x)g'(x) + g(x)f'(x).
Here, L corresponds to f(x), W corresponds to g(x), and the derivative is with respect to 'x' (or 't' in the physical analogy).
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    The most common and effective mnemonic is:
    "**First D-Second + Second D-First**"
    (where "D-" means "derivative of").
    So, if $y = f \cdot g$, then $y' = f'g + fg'$.
    Visualize two dancers, $f$ and $g$, performing a routine. First, $f$ takes the lead (differentiates) while $g$ supports (stays original). Then, $g$ takes the lead (differentiates) while $f$ supports (stays original). And you *add* their contributions.

2.  **Formulas/Facts to Overlearn:**
    *   **The Product Rule:** $(fg)' = f'g + fg'$ (Memorize this forwards, backwards, and inside out).
    *   **Definition of the Derivative:** $f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$ (This is the source of all derivative rules).
    *   **Limit Properties:** Especially the limit of a sum and the limit of a product.

3.  **Spaced-Repetition Schedule:**
    To truly embed this proof and its application into your long-term memory, follow this schedule:
    *   **Day 1:** Immediately after learning, review the proof steps and do 2-3 application problems.
    *   **Day 3:** Review the proof (try to write it out from memory), and do 2-3 more application problems.
    *   **Day 7:** Review the proof again, and do 2-3 application problems, including one that requires nested product rule or simplification.
    *   **Day 16:** Review the proof, and do 1-2 challenging application problems.
    *   **Day 35:** Review the proof and its connection to the geometric interpretation. Do a very challenging problem or try to derive a related rule (like the quotient rule using the product rule).

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the product rule formula, you can always rebuild it from first principles. Here's the pathway:
    1.  **Start with the definition:** Write down the limit definition for the derivative of $P(x) = f(x)g(x)$.
        $$P'(x) = \lim_{h \to 0} \frac{f(x+h)g(x+h) - f(x)g(x)}{h}$$
    2.  **The "add and subtract" trick:** Remember to add and subtract $f(x)g(x+h)$ in the numerator. This is the crucial creative step.
        $$ = \lim_{h \to 0} \frac{f(x+h)g(x+h) - f(x)g(x+h) + f(x)g(x+h) - f(x)g(x)}{h}$$
    3.  **Factor and split:** Group terms, factor out $g(x+h)$ and $f(x)$, and then split the fraction.
        $$ = \lim_{h \to 0} \left[ g(x+h) \frac{f(x+h) - f(x)}{h} + f(x) \frac{g(x+h) - g(x)}{h} \right]$$
    4.  **Apply limit properties:** Break the limit of the sum into the sum of limits, and the limit of products into products of limits.
        $$ = \left( \lim_{h \to 0} g(x+h) \right) \left( \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} \right) + \left( \lim_{h \to 0} f(x) \right) \left( \lim_{h \to 0} \frac{g(x+h) - g(x)}{h} \right)$$
    5.  **Evaluate limits:** Recognize the derivative definitions and use the continuity of differentiable functions.
        $$ = g(x)f'(x) + f(x)g'(x)$$
    This pathway provides a robust way to reconstruct the rule if direct recall fails.

## 10. Connections — what this leads to

The product rule is a foundational derivative rule that unlocks many other concepts and techniques in calculus and beyond.

*   **Quotient Rule:** The quotient rule can be derived directly from the product rule combined with the chain rule. If $y = \frac{f(x)}{g(x)} = f(x)[g(x)]^{-1}$, applying the product rule and chain rule to this form yields the quotient rule. This demonstrates the interconnectedness of derivative rules.
*   **Chain Rule:** While distinct, the product rule and chain rule are frequently used in tandem. For example, differentiating $y = (x^2+1)^3 \sin(x)$ requires the product rule for the main structure, and the chain rule for differentiating $(x^2+1)^3$.
*   **Higher-Order Derivatives:** To find the second derivative of a product, $(fg)''$, you'll apply the product rule to $(fg)' = f'g + fg'$. This will involve differentiating $f'g$ and $fg'$ separately, each requiring another application of the product rule. This leads to the generalized Leibniz Rule for the $n$-th derivative of a product.
*   **Derivatives of Inverse Functions:** The derivation of the formula for the derivative of an inverse function ($[f^{-1}(x)]' = \frac{1}{f'(f^{-1}(x))}$) often implicitly uses the product rule or chain rule in its steps.
*   **Integration by Parts:** This is essentially the product rule in reverse. If $\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)$, then integrating both sides with respect to $x$ gives $\int \frac{d}{dx}[f(x)g(x)]dx = \int f'(x)g(x)dx + \int f(x)g'(x)dx$. This simplifies to $f(x)g(x) = \int g(x)f'(x)dx + \int f(x)g'(x)dx$, which can be rearranged to the integration by parts formula: $\int f(x)g'(x)dx = f(x)g(x) - \int g(x)f'(x)dx$. This is a crucial technique for integrating products of functions.
*   **Multivariable Calculus:** The concept extends to partial derivatives. If you have a function $F(x,y) = G(x,y)H(x,y)$, then $\frac{\partial F}{\partial x} = \frac{\partial G}{\partial x}H(x,y) + G(x,y)\frac{\partial H}{\partial x}$. The fundamental structure remains the same.
*   **Differential Equations:** Many differential equations involve products of functions, and solving them or analyzing their behavior often requires understanding how to differentiate such products.

## 11. Self-check questions

1.  Differentiate the function $y = (x^3 + 2x)(\cos x)$.
2.  Find the derivative of $f(t) = t^2 e^t \sin t$. (Hint: You'll need to apply the product rule more than once or group terms strategically).
3.  If $u(x)$ and $v(x)$ are differentiable functions, and $w(x) = u(x)v(x)$, express $w''(x)$ (the second derivative of $w$) in terms of $u, v$ and their first and second derivatives.
4.  A particle's position is given by $s(t) = t \cdot v(t)$, where $v(t)$ is its velocity (which is also a function of time). Find the acceleration $a(t)$ of the particle.
5.  Prove the product rule for three functions: If $P(x) = f(x)g(x)h(x)$ and $f, g, h$ are differentiable, show that $P'(x) = f'(x)g(x)h(x) + f(x)g'(x)h(x) + f(x)g(x)h'(x)$. (Hint: Group two functions together first, e.g., let $F(x) = f(x)g(x)$).