## 1. What it is — in plain English

Imagine you're tracking how fast things change. In calculus, this "how fast things change" is called a derivative. Now, what if you have a complex situation made up of simpler parts? For instance, what if you're tracking the total distance covered by two cars moving at the same time, or the total amount of water flowing into a tank from two different pipes?

These rules are like shortcuts for finding the "total rate of change" when you're adding, subtracting, or scaling up/down the things you're tracking. Instead of having to figure out the change for the whole complex system from scratch every time, these rules let you break it down.

Essentially, if you know how each individual piece changes, you can easily figure out how their sum changes, how their difference changes, or how one piece changes if it's just a scaled-up version of another. It's like saying if you know how fast each person in a relay race is running, you can figure out the team's combined speed just by adding their individual speeds.

These rules are fundamental because they allow us to tackle very complicated functions by breaking them down into simpler, manageable parts. They are the first tools in our calculus toolbox for differentiating functions without always resorting to the tedious limit definition.

## 2. Why it matters — real-world applications

These rules are not just theoretical; they are foundational to almost every quantitative field. They simplify complex calculations, making it possible to model and predict behavior in the real world.

1.  **Physics and Engineering (e.g., Aerospace):** When designing a rocket, engineers need to calculate its acceleration. The total force on a rocket might be the sum of the thrust from its engines, minus the drag from air resistance, and minus the force of gravity. Each of these forces can be represented as a function, and their derivatives (rates of change) are crucial for understanding how the rocket's velocity and position change over time. The sum and difference rules allow engineers to find the derivative of the *net* force function by simply adding and subtracting the derivatives of the individual force components. Similarly, a satellite's trajectory might be affected by multiple gravitational pulls (Earth, Moon, Sun); the derivative of its total position function would be the sum of the derivatives of its position relative to each body.

2.  **Economics and Finance:** Businesses often want to optimize profits, which involves understanding marginal cost and marginal revenue. If a company produces multiple products, say Product A and Product B, its total cost function might be $C(x) = C_A(x_A) + C_B(x_B)$ (where $x_A, x_B$ are quantities). The marginal cost (the derivative of the total cost) tells them the cost of producing one more unit. Using the sum rule, they can find the total marginal cost by summing the marginal costs of Product A and Product B. This helps in making decisions about production levels and pricing strategies.

3.  **Machine Learning and Artificial Intelligence:** In training neural networks, algorithms like gradient descent are used to minimize a "loss function" which measures how well the model is performing. This loss function is often a sum of errors from many individual data points, or a sum of different types of penalties (e.g., mean squared error plus a regularization term). To find the minimum, we need to compute the gradient (a multi-variable derivative) of the loss function. The sum and constant multiple rules are applied extensively here, allowing the algorithm to efficiently calculate the gradient of the complex loss function by summing the gradients of its simpler components. Companies like Google, Meta, and OpenAI rely heavily on these principles for training their large language models and image recognition systems.

4.  **Environmental Science:** Scientists might model the concentration of a pollutant in a river. The total concentration could be a function of the pollutant being discharged from a factory (a source, $f(t)$) and the natural degradation rate of the pollutant (a sink, $g(t)$). The rate of change of the total pollutant concentration, $\frac{d}{dt}[f(t) - g(t)]$, is crucial for environmental impact assessments and policy decisions. The difference rule makes this calculation straightforward.

## 3. Prerequisites — what you must know first

Before diving into the sum, difference, and constant multiple rules for derivatives, ensure you have a solid grasp of these foundational concepts:

*   **Functions:** An understanding of what a function is, its domain and range, and how to evaluate it.
*   **Limits:** The concept of a limit, especially $\lim_{h \to 0}$, and how to evaluate basic limits. This is crucial because the derivative itself is defined as a limit.
*   **Continuity:** An intuitive understanding that a function is continuous if you can draw its graph without lifting your pen.
*   **Definition of the Derivative:** The formal definition of the derivative of a function $f(x)$ as $f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$. You should be comfortable applying this definition to find the derivative of simple functions like $f(x) = x^2$ or $f(x) = x$.
*   **Algebraic Manipulation:** Proficiency in expanding expressions, factoring, simplifying fractions, and working with exponents (positive, negative, and fractional).
*   **Basic Derivative Rules (Optional but helpful):** While these rules are the *first* shortcuts, knowing the Power Rule ($\frac{d}{dx}[x^n] = nx^{n-1}$) for simple polynomials will make the examples more tangible.

If any of these prerequisites feel shaky, pause here and review them. Building on a weak foundation will lead to confusion later on.

## 4. The core idea — step by step

Let's break down these fundamental rules for differentiation. Each rule provides a powerful shortcut, allowing us to avoid the lengthy limit definition for composite functions.

Throughout this section, we will assume that $f(x)$ and $g(x)$ are differentiable functions, meaning their derivatives $f'(x)$ and $g'(x)$ exist.

### Step 1: The Derivative of a Sum

**Plain-English Statement:** If you have two functions that are added together, and you want to find the rate at which their sum changes, you can simply find the rate of change of each function individually and then add those rates together. It's like measuring the total speed of two cars moving side-by-side: if one is going 60 mph and the other 40 mph, their "combined speed" (in terms of how fast their total position changes) is 100 mph.

**Small Concrete Example:**
Let $f(x) = x^2$ and $g(x) = x^3$.
We know from the power rule that $f'(x) = 2x$ and $g'(x) = 3x^2$.
Now consider the sum function $S(x) = f(x) + g(x) = x^2 + x^3$.
If we take the derivative of $S(x)$ using the sum rule, we get $S'(x) = f'(x) + g'(x) = 2x + 3x^2$.
This is much simpler than using the limit definition on $x^2+x^3$.

**Formal/Mathematical Version:**
If $f(x)$ and $g(x)$ are differentiable functions, then their sum $f(x) + g(x)$ is also differentiable, and
$$ \frac{d}{dx}[f(x) + g(x)] = f'(x) + g'(x) $$
This can also be written using the prime notation:
$$ (f+g)'(x) = f'(x) + g'(x) $$

**What Could Go Wrong:**
A common mistake is to think that the derivative of a sum is something more complicated, like the product of the derivatives (which is incorrect and doesn't make sense for a sum). The key is that differentiation "distributes" over addition.

### Step 2: The Derivative of a Difference

**Plain-English Statement:** Similar to addition, if you have one function subtracted from another, and you want to find the rate at which their difference changes, you can find the rate of change of each function individually and then subtract those rates. Think about the *difference* in speed between two cars. If Car A is going 60 mph and Car B is going 40 mph, the rate at which their separation changes is $60 - 40 = 20$ mph.

**Small Concrete Example:**
Let $f(x) = x^3$ and $g(x) = x^2$.
We know $f'(x) = 3x^2$ and $g'(x) = 2x$.
Now consider the difference function $D(x) = f(x) - g(x) = x^3 - x^2$.
Using the difference rule, we get $D'(x) = f'(x) - g'(x) = 3x^2 - 2x$.

**Formal/Mathematical Version:**
If $f(x)$ and $g(x)$ are differentiable functions, then their difference $f(x) - g(x)$ is also differentiable, and
$$ \frac{d}{dx}[f(x) - g(x)] = f'(x) - g'(x) $$
Or, using prime notation:
$$ (f-g)'(x) = f'(x) - g'(x) $$

**What Could Go Wrong:**
The most frequent error here is a sign mistake, especially if $g'(x)$ itself involves a negative sign. Always be careful to distribute the negative sign properly. Forgetting that differentiation distributes over subtraction is also a trap.

### Step 3: The Derivative of a Constant Multiple

**Plain-English Statement:** If you have a function multiplied by a constant number (like $2 \cdot x^2$ or $5 \cdot \sin(x)$), and you want to find its rate of change, you can simply find the rate of change of the original function and then multiply that result by the same constant. Imagine you're tracking the growth of a plant, $P(t)$. If you have three identical plants, $3P(t)$, the rate at which their *total* height changes is simply three times the rate at which a single plant's height changes. The constant "tags along" for the ride.

**Small Concrete Example:**
Let $f(x) = x^2$. We know $f'(x) = 2x$.
Now consider the function $M(x) = 3 \cdot f(x) = 3x^2$.
Using the constant multiple rule, we get $M'(x) = 3 \cdot f'(x) = 3 \cdot (2x) = 6x$.

**Formal/Mathematical Version:**
If $f(x)$ is a differentiable function and $c$ is any real number (a constant), then the function $c \cdot f(x)$ is also differentiable, and
$$ \frac{d}{dx}[c \cdot f(x)] = c \cdot f'(x) $$
Or, using prime notation:
$$ (c f)'(x) = c \cdot f'(x) $$

**What Could Go Wrong:**
Students sometimes forget the constant entirely or, worse, try to take the derivative of the constant itself and multiply by that (which would be $0 \cdot f'(x) = 0$, incorrect unless $c=0$). Remember, the derivative of a constant *alone* is 0, but when a constant *multiplies* a function, it stays.

### Step 4: Combining the Rules

**Plain-English Statement:** The beauty of these rules is that they can be used together in sequence to differentiate more complex expressions. If you have a function that is a sum or difference of several terms, each of which might be a constant multiple of a simpler function, you can apply these rules term by term. Differentiation is a "linear operator," which means it plays nicely with addition, subtraction, and constant multiplication.

**Small Concrete Example:**
Let's find the derivative of $F(x) = 5x^3 - 2x^2 + 7x - 10$.
We can break this down:
1.  $\frac{d}{dx}[5x^3]$: Constant multiple rule with $c=5$ and $f(x)=x^3$. Derivative is $5 \cdot (3x^2) = 15x^2$.
2.  $\frac{d}{dx}[-2x^2]$: Constant multiple rule with $c=-2$ and $f(x)=x^2$. Derivative is $-2 \cdot (2x) = -4x$.
3.  $\frac{d}{dx}[7x]$: Constant multiple rule with $c=7$ and $f(x)=x$. Derivative is $7 \cdot (1) = 7$.
4.  $\frac{d}{dx}[-10]$: This is a constant term. The derivative of any constant is $0$.

Combining these using the sum/difference rules:
$F'(x) = 15x^2 - 4x + 7 - 0 = 15x^2 - 4x + 7$.

**Formal/Mathematical Version:**
The general form for a linear combination of functions:
If $f_1(x), f_2(x), \dots, f_n(x)$ are differentiable functions and $c_1, c_2, \dots, c_n$ are constants, then
$$ \frac{d}{dx}[c_1 f_1(x) \pm c_2 f_2(x) \pm \dots \pm c_n f_n(x)] = c_1 f_1'(x) \pm c_2 f_2'(x) \pm \dots \pm c_n f_n'(x) $$

**What Could Go Wrong:**
The main challenge here is simply keeping track of all the terms and applying the individual rules correctly. It's easy to make a small arithmetic error or a sign error when dealing with many terms. Take your time and go step-by-step.

## 5. Worked examples — multiple, with every step shown

Here are several examples demonstrating the application of the sum, difference, and constant multiple rules, ranging in complexity. We will assume knowledge of the power rule ($\frac{d}{dx}[x^n] = nx^{n-1}$) and that the derivative of a constant is zero ($\frac{d}{dx}[c] = 0$).

### Example 1: Basic Polynomial

**Problem:** Find the derivative of $f(x) = 4x^3 + 2x^2 - 5x + 1$.

**Given:** The function $f(x) = 4x^3 + 2x^2 - 5x + 1$.
**Wanted:** The derivative $f'(x)$.

**Solution:**
$$ f(x) = 4x^3 + 2x^2 - 5x + 1 $$
$$ f'(x) = \frac{d}{dx}[4x^3 + 2x^2 - 5x + 1] $$
This is the original function. We want to find its derivative.

$$ f'(x) = \frac{d}{dx}[4x^3] + \frac{d}{dx}[2x^2] - \frac{d}{dx}[5x] + \frac{d}{dx}[1] $$
Here, we apply the **Sum and Difference Rules**. We can differentiate each term separately and then combine the results with the appropriate signs.

$$ f'(x) = 4 \cdot \frac{d}{dx}[x^3] + 2 \cdot \frac{d}{dx}[x^2] - 5 \cdot \frac{d}{dx}[x] + \frac{d}{dx}[1] $$
Now, we apply the **Constant Multiple Rule** to each term that has a constant coefficient. The constant is "pulled out" of the derivative operation.

$$ f'(x) = 4 \cdot (3x^{3-1}) + 2 \cdot (2x^{2-1}) - 5 \cdot (1x^{1-1}) + 0 $$
We apply the **Power Rule** ($\frac{d}{dx}[x^n] = nx^{n-1}$) to $x^3, x^2, x^1$. For the constant term $1$, its derivative is $0$. Remember that $x^0 = 1$.

$$ f'(x) = 4 \cdot (3x^2) + 2 \cdot (2x) - 5 \cdot (1) + 0 $$
Perform the multiplications within each term.

$$ f'(x) = 12x^2 + 4x - 5 + 0 $$
Simplify the expression.

$$ \boxed{f'(x) = 12x^2 + 4x - 5} $$
This is our final derivative.

**Reflection:** This example was straightforward because it involved only positive integer powers of $x$ and simple arithmetic. The key was to systematically apply the rules term by term.

### Example 2: Functions with Fractional and Negative Exponents

**Problem:** Find the derivative of $g(x) = \frac{3}{x^2} - 6\sqrt{x} + \frac{1}{3}$.

**Given:** The function $g(x) = \frac{3}{x^2} - 6\sqrt{x} + \frac{1}{3}$.
**Wanted:** The derivative $g'(x)$.

**Solution:**
First, rewrite the function using exponent notation to make the power rule applicable.
$$ g(x) = 3x^{-2} - 6x^{1/2} + \frac{1}{3} $$
This step is crucial for applying the power rule. $\frac{1}{x^2} = x^{-2}$ and $\sqrt{x} = x^{1/2}$.

$$ g'(x) = \frac{d}{dx}[3x^{-2} - 6x^{1/2} + \frac{1}{3}] $$
We want to find the derivative of the rewritten function.

$$ g'(x) = \frac{d}{dx}[3x^{-2}] - \frac{d}{dx}[6x^{1/2}] + \frac{d}{dx}[\frac{1}{3}] $$
Apply the **Sum and Difference Rules**, differentiating each term separately.

$$ g'(x) = 3 \cdot \frac{d}{dx}[x^{-2}] - 6 \cdot \frac{d}{dx}[x^{1/2}] + \frac{d}{dx}[\frac{1}{3}] $$
Apply the **Constant Multiple Rule** to the first two terms. The constant $\frac{1}{3}$ in the last term is a standalone constant.

$$ g'(x) = 3 \cdot (-2x^{-2-1}) - 6 \cdot (\frac{1}{2}x^{\frac{1}{2}-1}) + 0 $$
Apply the **Power Rule** to $x^{-2}$ and $x^{1/2}$. For the constant term $\frac{1}{3}$, its derivative is $0$.

$$ g'(x) = 3 \cdot (-2x^{-3}) - 6 \cdot (\frac{1}{2}x^{-\frac{1}{2}}) + 0 $$
Perform the exponent subtractions. $-2-1 = -3$ and $\frac{1}{2}-1 = -\frac{1}{2}$.

$$ g'(x) = -6x^{-3} - 3x^{-\frac{1}{2}} $$
Perform the multiplications. $3 \cdot (-2) = -6$ and $6 \cdot \frac{1}{2} = 3$.

$$ g'(x) = -\frac{6}{x^3} - \frac{3}{\sqrt{x}} $$
Rewrite the terms with positive exponents and radical notation for clarity and standard form. $x^{-3} = \frac{1}{x^3}$ and $x^{-1/2} = \frac{1}{\sqrt{x}}$.

$$ \boxed{g'(x) = -\frac{6}{x^3} - \frac{3}{\sqrt{x}}} $$
This is our final derivative.

**Reflection:** This example highlights the importance of rewriting terms with negative and fractional exponents before applying the power rule. Careful arithmetic with fractions and negative numbers is also crucial.

### Example 3: A More Complex Expression (Requires Expansion)

**Problem:** Find the derivative of $h(t) = (2t+1)(t^2-3t+4)$.

**Given:** The function $h(t) = (2t+1)(t^2-3t+4)$.
**Wanted:** The derivative $h'(t)$.

**Solution:**
The sum, difference, and constant multiple rules apply to sums and differences of terms. This function is a product, so we must first expand it into a polynomial sum/difference of terms. (Later, you will learn the Product Rule, which is another way to handle this, but for now, expansion is the only method using the rules we've covered).

$$ h(t) = (2t+1)(t^2-3t+4) $$
Original function, which is a product.

$$ h(t) = 2t(t^2-3t+4) + 1(t^2-3t+4) $$
Distribute each term from the first parenthesis into the second.

$$ h(t) = (2t^3 - 6t^2 + 8t) + (t^2 - 3t + 4) $$
Perform the multiplications.

$$ h(t) = 2t^3 - 6t^2 + t^2 + 8t - 3t + 4 $$
Group like terms.

$$ h(t) = 2t^3 - 5t^2 + 5t + 4 $$
Combine like terms to simplify the polynomial. Now the function is in a form where we can apply the sum/difference/constant multiple rules.

$$ h'(t) = \frac{d}{dt}[2t^3 - 5t^2 + 5t + 4] $$
We want to find the derivative of this simplified polynomial.

$$ h'(t) = \frac{d}{dt}[2t^3] - \frac{d}{dt}[5t^2] + \frac{d}{dt}[5t] + \frac{d}{dt}[4] $$
Apply the **Sum and Difference Rules**, differentiating each term.

$$ h'(t) = 2 \cdot \frac{d}{dt}[t^3] - 5 \cdot \frac{d}{dt}[t^2] + 5 \cdot \frac{d}{dt}[t] + \frac{d}{dt}[4] $$
Apply the **Constant Multiple Rule** to the first three terms. The last term is a constant.

$$ h'(t) = 2 \cdot (3t^{3-1}) - 5 \cdot (2t^{2-1}) + 5 \cdot (1t^{1-1}) + 0 $$
Apply the **Power Rule** to $t^3, t^2, t^1$. The derivative of the constant $4$ is $0$.

$$ h'(t) = 2 \cdot (3t^2) - 5 \cdot (2t) + 5 \cdot (1) + 0 $$
Perform the exponent subtractions and simplify $t^0=1$.

$$ h'(t) = 6t^2 - 10t + 5 $$
Perform the multiplications and simplify.

$$ \boxed{h'(t) = 6t^2 - 10t + 5} $$
This is our final derivative.

**Reflection:** The trickiness here was recognizing that the function first needed to be expanded before the differentiation rules could be applied. This emphasizes that the rules apply to sums and differences of terms, not directly to products or quotients (for which other rules exist).

### Example 4: Mixed Function Types and Constants

**Problem:** Find the derivative of $k(x) = 5\sin(x) - \frac{e^x}{2} + \pi x - \sqrt{2}$. (Assume you know $\frac{d}{dx}[\sin(x)] = \cos(x)$ and $\frac{d}{dx}[e^x] = e^x$).

**Given:** The function $k(x) = 5\sin(x) - \frac{e^x}{2} + \pi x - \sqrt{2}$.
**Wanted:** The derivative $k'(x)$.

**Solution:**
$$ k(x) = 5\sin(x) - \frac{1}{2}e^x + \pi x - \sqrt{2} $$
Rewrite the second term to clearly show the constant multiple. Note that $\pi$ and $\sqrt{2}$ are constants.

$$ k'(x) = \frac{d}{dx}[5\sin(x) - \frac{1}{2}e^x + \pi x - \sqrt{2}] $$
We want to find the derivative.

$$ k'(x) = \frac{d}{dx}[5\sin(x)] - \frac{d}{dx}[\frac{1}{2}e^x] + \frac{d}{dx}[\pi x] - \frac{d}{dx}[\sqrt{2}] $$
Apply the **Sum and Difference Rules**, differentiating each term separately.

$$ k'(x) = 5 \cdot \frac{d}{dx}[\sin(x)] - \frac{1}{2} \cdot \frac{d}{dx}[e^x] + \pi \cdot \frac{d}{dx}[x] - \frac{d}{dx}[\sqrt{2}] $$
Apply the **Constant Multiple Rule** to the first three terms. The constant $\sqrt{2}$ is a standalone constant.

$$ k'(x) = 5 \cdot (\cos(x)) - \frac{1}{2} \cdot (e^x) + \pi \cdot (1) - 0 $$
Apply the known derivatives: $\frac{d}{dx}[\sin(x)] = \cos(x)$, $\frac{d}{dx}[e^x] = e^x$, $\frac{d}{dx}[x] = 1$ (from power rule $x^1 \to 1x^0=1$), and $\frac{d}{dx}[\sqrt{2}] = 0$ (derivative of a constant).

$$ k'(x) = 5\cos(x) - \frac{1}{2}e^x + \pi $$
Perform the multiplications and simplify.

$$ \boxed{k'(x) = 5\cos(x) - \frac{1}{2}e^x + \pi} $$
This is our final derivative.

**Reflection:** This example demonstrates how these rules work seamlessly with different types of elementary functions (trigonometric, exponential, polynomial) and how to correctly identify and handle constants, whether they are coefficients or standalone terms. The key is to treat each term independently according to its structure.

## 6. Common mistakes and traps

Students often stumble when first learning these rules. Being aware of these common pitfalls can help you avoid them:

1.  **Derivative of a Product is NOT the Product of Derivatives:** A very common and critical error. $\frac{d}{dx}[f(x) \cdot g(x)] \neq f'(x) \cdot g'(x)$. This requires the Product Rule, which you will learn soon. For now, if you see a product, you must expand it first (as in Example 3) if you only have sum/difference/constant multiple rules.
2.  **Derivative of a Quotient is NOT the Quotient of Derivatives:** Similar to the product rule, $\frac{d}{dx}\left[\frac{f(x)}{g(x)}\right] \neq \frac{f'(x)}{g'(x)}$. This requires the Quotient Rule. If you see a quotient, try to rewrite it as a product with a negative exponent (e.g., $\frac{1}{x^2} = x^{-2}$) if possible, otherwise, you'll need the Quotient Rule.
3.  **Forgetting the Constant in the Constant Multiple Rule:** When differentiating $c \cdot f(x)$, students sometimes forget to multiply $f'(x)$ by $c$, or they confuse it with the derivative of a standalone constant. Remember, $c$ stays as a multiplier: $\frac{d}{dx}[c \cdot f(x)] = c \cdot f'(x)$.
4.  **Treating a Constant Term as a Constant Multiple:** If you have a term like $+5$ in an expression, its derivative is $0$. It's not $5 \cdot \frac{d}{dx}[1]$ (which would still be $0$, but the reasoning is slightly off) or $5$ itself. The derivative of a constant *alone* is zero because it doesn't change.
5.  **Sign Errors in the Difference Rule:** When subtracting terms, it's easy to make a mistake with negative signs, especially if the derivative of the subtracted function itself is negative. Always be meticulous with parentheses and sign distribution.
6.  **Incorrectly Applying Power Rule with Negative or Fractional Exponents:** As seen in Example 2, converting terms like $\frac{1}{x^n}$ to $x^{-n}$ and $\sqrt[m]{x^n}$ to $x^{n/m}$ is crucial. Errors often occur when subtracting 1 from these exponents (e.g., $1/2 - 1 = -1/2$, not $1/2$).

## 7. Textbook-precise explanation

The sum, difference, and constant multiple rules for differentiation are collectively known as the **linearity properties of the derivative**. They formally state that the derivative operator is a linear operator.

Let $f(x)$ and $g(x)$ be differentiable functions, and let $c$ be any real number (a constant).

**1. The Sum Rule:**
If $F(x) = f(x) + g(x)$, then $F'(x) = f'(x) + g'(x)$.
Formally:
$$ \frac{d}{dx}[f(x) + g(x)] = \frac{d}{dx}[f(x)] + \frac{d}{dx}[g(x)] $$

*Proof using the limit definition:*
Let $F(x) = f(x) + g(x)$.
By the definition of the derivative:
$$ F'(x) = \lim_{h \to 0} \frac{F(x+h) - F(x)}{h} $$
Substitute $F(x+h) = f(x+h) + g(x+h)$ and $F(x) = f(x) + g(x)$:
$$ F'(x) = \lim_{h \to 0} \frac{[f(x+h) + g(x+h)] - [f(x) + g(x)]}{h} $$
Rearrange the terms in the numerator:
$$ F'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x) + g(x+h) - g(x)}{h} $$
Split the fraction into two parts:
$$ F'(x) = \lim_{h \to 0} \left( \frac{f(x+h) - f(x)}{h} + \frac{g(x+h) - g(x)}{h} \right) $$
Using the limit property that the limit of a sum is the sum of the limits (provided individual limits exist):
$$ F'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} + \lim_{h \to 0} \frac{g(x+h) - g(x)}{h} $$
By the definition of the derivative, these are $f'(x)$ and $g'(x)$:
$$ F'(x) = f'(x) + g'(x) $$
This completes the proof for the Sum Rule.

**2. The Difference Rule:**
If $F(x) = f(x) - g(x)$, then $F'(x) = f'(x) - g'(x)$.
Formally:
$$ \frac{d}{dx}[f(x) - g(x)] = \frac{d}{dx}[f(x)] - \frac{d}{dx}[g(x)] $$

*Proof using the limit definition:*
This proof is almost identical to the sum rule, simply replacing addition with subtraction.
Let $F(x) = f(x) - g(x)$.
$$ F'(x) = \lim_{h \to 0} \frac{[f(x+h) - g(x+h)] - [f(x) - g(x)]}{h} $$
$$ F'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x) - (g(x+h) - g(x))}{h} $$
$$ F'(x) = \lim_{h \to 0} \left( \frac{f(x+h) - f(x)}{h} - \frac{g(x+h) - g(x)}{h} \right) $$
$$ F'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} - \lim_{h \to 0} \frac{g(x+h) - g(x)}{h} $$
$$ F'(x) = f'(x) - g'(x) $$
This completes the proof for the Difference Rule.

**3. The Constant Multiple Rule:**
If $F(x) = c \cdot f(x)$, where $c$ is a constant, then $F'(x) = c \cdot f'(x)$.
Formally:
$$ \frac{d}{dx}[c \cdot f(x)] = c \cdot \frac{d}{dx}[f(x)] $$

*Proof using the limit definition:*
Let $F(x) = c \cdot f(x)$.
$$ F'(x) = \lim_{h \to 0} \frac{c \cdot f(x+h) - c \cdot f(x)}{h} $$
Factor out the constant $c$ from the numerator:
$$ F'(x) = \lim_{h \to 0} \frac{c[f(x+h) - f(x)]}{h} $$
Using the limit property that a constant multiple can be pulled out of a limit:
$$ F'(x) = c \cdot \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} $$
By the definition of the derivative:
$$ F'(x) = c \cdot f'(x) $$
This completes the proof for the Constant Multiple Rule.

These proofs demonstrate the rigor behind these seemingly simple rules, showing they are direct consequences of the fundamental definition of the derivative and properties of limits. (Refer to **Stewart, Calculus, 9e, §3.1** for more details and context on these differentiation rules).

## 8. ASCII diagrams

Visualizing these rules can help solidify understanding.

### Diagram 1: Constant Multiple Rule

Imagine a function $f(x)$ and its scaled version $2f(x)$. The derivative represents the slope of the tangent line. If you double the height of a curve at every point, you also double the steepness (slope) of the curve at every point.

```text
       ^ y
       |
       |  / 2f(x) (steeper slope)
       | /
       |/
-------+-----------------> x
      /|
     / | f(x) (original slope)
    /  |
   /   |
  /    |

At any point x:
Slope of f(x) is f'(x)
Slope of 2f(x) is 2f'(x)

The tangent line to 2f(x) is twice as steep as the tangent line to f(x)
at the same x-coordinate.
```

### Diagram 2: Sum Rule (Conceptual)

This is harder to draw accurately in ASCII, but imagine two functions, $f(x)$ and $g(x)$, and their sum $(f+g)(x)$. At any given $x$, the value of $(f+g)(x)$ is simply the sum of the individual $y$-values, $f(x)$ and $g(x)$. The derivative at that point, $(f+g)'(x)$, represents the slope of the tangent line to the sum function. The sum rule says this slope is equal to the sum of the individual slopes, $f'(x) + g'(x)$.

Think of it geometrically: if $f(x)$ is increasing at a certain rate (positive slope) and $g(x)$ is also increasing at a certain rate (positive slope), then their sum $f(x)+g(x)$ will be increasing at a rate that is the sum of their individual rates. If one is increasing and the other decreasing, the net effect on the sum's rate of change is the difference of their magnitudes.

```text
       ^ y
       |
       |      / (f+g)(x)  <-- Slope here is f'(x) + g'(x)
       |     /
       |    /
       |   /
       |  /
-------+-----------------> x
       | /  f(x)         <-- Slope here is f'(x)
       |/
       |       g(x)      <-- Slope here is g'(x)
       |

Imagine stacking the "change" from f(x) and g(x) at a point x.
The total change (slope) for (f+g)(x) is the sum of the individual changes (slopes).
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Think of the derivative operator, $\frac{d}{dx}$, as a **"Linear Machine"** or an **"Auditor"**.
    *   **Auditor Analogy:** An auditor (derivative) comes to inspect your financial records ($f(x) + g(x)$). They don't audit the *sum* of everything at once; they audit each department ($f(x)$ and $g(x)$) separately and then add up the individual audit reports ($f'(x)$ and $g'(x)$). If a department has a constant multiplier (e.g., "3 times the usual budget"), the auditor just notes that multiplier and audits the base budget. Constants standing alone (like a fixed asset value) don't change, so their audit report is zero.
    *   **"Derivative is Linear"** (DIL): This phrase encapsulates all three rules. It means the derivative operator behaves well with addition, subtraction, and scalar multiplication. It's a linear transformation.

2.  **Formulas/Facts to Overlearn:**
    These are the absolute core rules you must internalize:
    *   **Sum Rule:** $\frac{d}{dx}[f(x) + g(x)] = f'(x) + g'(x)$
    *   **Difference Rule:** $\frac{d}{dx}[f(x) - g(x)] = f'(x) - g'(x)$
    *   **Constant Multiple Rule:** $\frac{d}{dx}[c \cdot f(x)] = c \cdot f'(x)$
    *   **Derivative of a Constant:** $\frac{d}{dx}[c] = 0$ (This is often used in conjunction with the above rules).

3.  **Spaced-Repetition Schedule:**
    To truly embed these rules in your long-term memory, practice them consistently:
    *   **Day 1:** After learning the lesson, do several practice problems.
    *   **Day 3:** Review the rules and do a few more problems.
    *   **Day 7:** Review the rules, perhaps explain them aloud to yourself or a peer, and solve a couple of harder problems.
    *   **Day 16:** Quick review of the rules and one or two mixed problems.
    *   **Day 35:** Final review of the rules and a challenging problem, focusing on common traps.
    This schedule ensures the information moves from short-term to long-term memory.

4.  **First-Principles Re-derivation Pathway:**
    If you ever completely forget one of these rules, you can always rebuild it from the **definition of the derivative**. This is your ultimate safety net and deepens your understanding.
    *   **For the Sum Rule:**
        1.  Start with $F(x) = f(x) + g(x)$.
        2.  Write down the definition: $F'(x) = \lim_{h \to 0} \frac{F(x+h) - F(x)}{h}$.
        3.  Substitute $F(x+h)$ and $F(x)$: $\lim_{h \to 0} \frac{[f(x+h) + g(x+h)] - [f(x) + g(x)]}{h}$.
        4.  Rearrange and split the fraction: $\lim_{h \to 0} \left( \frac{f(x+h) - f(x)}{h} + \frac{g(x+h) - g(x)}{h} \right)$.
        5.  Use limit properties to separate: $\lim_{h \to 0} \frac{f(x+h) - f(x)}{h} + \lim_{h \to 0} \frac{g(x+h) - g(x)}{h}$.
        6.  Recognize the definitions of $f'(x)$ and $g'(x)$: $f'(x) + g'(x)$.
    *   The Difference and Constant Multiple Rules follow very similar, simple algebraic steps from the definition. Practicing these derivations once or twice will show you how robust the rules are.

## 10. Connections — what this leads to

The sum, difference, and constant multiple rules are the very first steps into the world of derivative shortcuts. They form the bedrock upon which almost all subsequent differentiation techniques are built. Mastering them is non-negotiable for progressing in calculus.

These rules immediately unlock:

1.  **Differentiation of Polynomials:** Any polynomial, like $ax^n + bx^{n-1} + \dots + cx + d$, can be differentiated term by term using these rules combined with the Power Rule. This is one of the most common types of functions you'll encounter.
2.  **Differentiation of Linear Combinations of Functions:** You can now differentiate any expression that is a sum or difference of constant multiples of elementary functions (e.g., $3\sin(x) - 2e^x + 7x^2$).
3.  **Foundation for Advanced Derivative Rules:**
    *   **Product Rule:** When functions are multiplied, you'll need the Product Rule. However, the Product Rule itself often yields terms that then need to be differentiated using the constant multiple and sum/difference rules.
    *   **Quotient Rule:** Similarly, for functions divided by each other, the Quotient Rule is needed, and its resulting terms are simplified using these basic linearity rules.
    *   **Chain Rule:** This rule for composite functions (functions within functions) is perhaps the most powerful and widely used. After applying the Chain Rule, you often end up with an expression that needs to be simplified using the sum, difference, and constant multiple rules.
4.  **Higher-Order Derivatives:** Finding the second derivative ($f''(x)$), third derivative ($f'''(x)$), and so on, simply involves repeatedly applying these rules to the preceding derivative.
5.  **Applications of Derivatives:** All applications of derivatives, such as optimization (finding maximums/minimums), related rates, curve sketching, and Taylor series, rely fundamentally on being able to accurately compute derivatives using these basic rules in conjunction with more advanced ones.
6.  **Differential Equations:** Many differential equations involve sums and constant multiples of derivatives, and understanding these rules is crucial for both formulating and solving such equations.

In essence, these rules transform differentiation from a tedious limit calculation into a systematic, algebraic process. They are the gateway to efficiently analyzing rates of change in virtually any mathematical model.

## 11. Self-check questions

Answer these questions to test your understanding. Do not look up the answers until you've given them your best shot!

1.  Find the derivative of $f(x) = 10x^4 - 3x^2 + 8x - 12$.
2.  Differentiate $g(t) = 5\sqrt{t} + \frac{2}{t^3} - \frac{1}{4}t^2$.
3.  Given $y = 7\cos(x) - 4e^x + \pi^2$, find $\frac{dy}{dx}$. (Assume $\frac{d}{dx}[\cos(x)] = -\sin(x)$ and $\frac{d}{dx}[e^x] = e^x$).
4.  If $h(z) = (z^2 + 3)(z - 5) + 6z$, find $h'(z)$. (Remember to simplify the expression first before differentiating).
5.  Consider a function $P(x) = A f(x) + B g(x) - C h(x)$, where $A, B, C$ are constants. Express $P'(x)$ in terms of $f'(x), g'(x), h'(x)$.