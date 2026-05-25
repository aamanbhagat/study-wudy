## 1. What it is — in plain English

Imagine you're driving a car, and ahead of you is a giant, invisible wall. No matter how fast you drive, or how close you get, you can never quite touch it; you just keep getting closer and closer, or perhaps you swerve sharply upwards or downwards as you approach it. That invisible wall is like a **vertical asymptote**. It's a specific input value ($x$) where a function's output ($y$) goes completely wild, either shooting up to positive infinity or plunging down to negative infinity.

Now, imagine you're on a very long, straight road, driving endlessly into the distance. As you drive further and further, does the road always stay flat, or does it eventually start to level out at a certain altitude? If it levels out, approaching a specific height, that height is like a **horizontal asymptote**. It's a specific output value ($y$) that a function approaches as its input ($x$) gets incredibly large, either positively or negatively.

In simpler terms:
*   **Infinite limit** means the *output* of the function ($y$-value) becomes unimaginably large (positive or negative infinity) as the *input* ($x$-value) gets closer and closer to a particular number. This tells us about **vertical asymptotes**.
*   **Limit at infinity** means we're looking at what the *output* of the function ($y$-value) approaches as the *input* ($x$-value) itself becomes unimaginably large (positive or negative infinity). This tells us about **horizontal asymptotes**.

These concepts help us understand the "boundaries" or long-term behavior of a function's graph, even if we can't draw the entire thing.

## 2. Why it matters — real-world applications

Understanding infinite limits and limits at infinity is crucial across many scientific and engineering disciplines because many real-world phenomena exhibit this kind of asymptotic behavior.

1.  **Aerospace Engineering (Terminal Velocity):** When an object falls through the air, its speed increases due to gravity. However, air resistance also increases with speed. Eventually, the force of air resistance balances the force of gravity, and the object stops accelerating, reaching a constant speed called **terminal velocity**. If you plot speed versus time, the terminal velocity represents a **horizontal asymptote** for the speed function. For example, a skydiver's speed approaches their terminal velocity as time approaches infinity. Engineers use this to design parachutes or predict impact speeds.

2.  **Physics (Gravitational and Electric Fields):** The strength of a gravitational field or an electric field due to a point source (like a star or an electron) is inversely proportional to the square of the distance from the source ($F \propto 1/r^2$). As you get extremely close to the source (i.e., $r \to 0$), the force or field strength theoretically approaches infinity. This indicates a **vertical asymptote** at $r=0$. While classical physics breaks down at infinitesimally small distances, the concept of an infinite limit helps us understand the extreme behavior near the source.

3.  **Machine Learning and Optimization (Learning Curves):** In machine learning, a "learning curve" plots the performance of a model (e.g., accuracy or error rate) against the amount of training data or the number of training iterations. Typically, as the model trains on more data or for more iterations, its performance improves, but the rate of improvement slows down. Eventually, the model's performance often plateaus, reaching a maximum possible accuracy or minimum error rate. This plateau represents a **horizontal asymptote**, indicating the best performance the model can achieve given its architecture and the problem.

4.  **Pharmacology and Environmental Science (Concentration Decay/Growth):** When a drug is administered, its concentration in the bloodstream rises and then decays over time. Similarly, pollutants in a lake might decay or accumulate. Often, the concentration approaches zero (or a baseline level) as time goes to infinity. This decay behavior is modeled using functions that have a **horizontal asymptote** at $y=0$ (or some other baseline). For example, the concentration $C(t)$ of a drug might be $C(t) = C_0 e^{-kt}$, where $\lim_{t \to \infty} C(t) = 0$.

## 3. Prerequisites — what you must know first

Before diving deep into infinite limits and limits at infinity, ensure you have a solid grasp of these foundational concepts:

*   **Functions:** Understand what a function is, how to evaluate it, its domain (all possible input values), and its range (all possible output values).
*   **Algebraic Manipulation:** Be proficient in factoring polynomials, simplifying rational expressions (fractions with polynomials), working with exponents, and solving basic equations and inequalities.
*   **Basic Limits:** You should understand the intuitive idea of a limit, $\lim_{x \to a} f(x) = L$, meaning the function's output approaches $L$ as $x$ approaches $a$. This includes one-sided limits ($\lim_{x \to a^+} f(x)$ and $\lim_{x \to a^-} f(x)$).
*   **Graphing Functions:** Be familiar with the graphs of basic functions like linear, quadratic, cubic, rational functions ($1/x$, $1/x^2$), exponential functions ($e^x$), logarithmic functions ($\ln x$), and trigonometric functions ($\tan x$, $\arctan x$).
*   **Real Number System and Infinity:** Understand that infinity ($\infty$) and negative infinity ($-\infty$) are not numbers, but concepts representing unbounded growth or decrease. You should know how arithmetic operations behave when involving "very large" or "very small" numbers (e.g., $1/\text{large number} \approx 0$, $\text{large number} \times \text{large number} = \text{even larger number}$).

## 4. The core idea — step by step

Let's break down the concepts of infinite limits and limits at infinity, building intuition step-by-step.

### Step 1: Understanding "Infinite Limits" and Vertical Asymptotes

**Plain English:** An infinite limit describes what happens to the *output* of a function ($y$-value) when its *input* ($x$-value) gets extremely close to a particular number. If the output rockets up to positive infinity or plunges down to negative infinity, we say the function has an infinite limit at that point. Geometrically, this means the graph of the function has an invisible vertical line, called a **vertical asymptote (VA)**, that it approaches but never touches.

**Small Concrete Example:** Consider the function $f(x) = \frac{1}{x}$.
What happens as $x$ gets very close to $0$?
*   If $x$ approaches $0$ from the positive side (e.g., $0.1, 0.01, 0.001, \dots$), then $f(x)$ becomes $\frac{1}{0.1}=10$, $\frac{1}{0.01}=100$, $\frac{1}{0.001}=1000$, and so on. The values are getting larger and larger, without any upper bound. We say it approaches positive infinity.
*   If $x$ approaches $0$ from the negative side (e.g., $-0.1, -0.01, -0.001, \dots$), then $f(x)$ becomes $\frac{1}{-0.1}=-10$, $\frac{1}{-0.01}=-100$, $\frac{1}{-0.001}=-1000$, and so on. The values are getting smaller and smaller (more negative), without any lower bound. We say it approaches negative infinity.

**Formal/Mathematical Version:**
We write this behavior using limit notation:
$$ \lim_{x \to a} f(x) = \infty $$
This means that for every number $M > 0$, there exists a number $\delta > 0$ such that if $0 < |x-a| < \delta$, then $f(x) > M$. In simpler terms, we can make $f(x)$ as large as we want by taking $x$ sufficiently close to $a$.

Similarly,
$$ \lim_{x \to a} f(x) = -\infty $$
This means that for every number $N < 0$, there exists a number $\delta > 0$ such that if $0 < |x-a| < \delta$, then $f(x) < N$. We can make $f(x)$ as negatively large as we want by taking $x$ sufficiently close to $a$.

If any of these conditions hold (or their one-sided versions, like $\lim_{x \to a^+} f(x) = \infty$), then the vertical line $x=a$ is called a **vertical asymptote** of the function $f(x)$.

**What could go wrong:** A common mistake is to assume that any time the denominator of a rational function is zero, there's a vertical asymptote. This isn't always true! If the numerator is *also* zero at that point, you might have a "hole" in the graph instead of an asymptote. You must simplify the rational function first.

### Step 2: Identifying Vertical Asymptotes for Rational Functions

**Plain English:** For functions that are ratios of two polynomials (called rational functions, like $f(x) = \frac{\text{Numerator}}{\text{Denominator}}$), vertical asymptotes usually occur where the denominator becomes zero, *but the numerator does not*. This creates a "division by zero" scenario where the output explodes.

**Small Concrete Example:** Let's find the vertical asymptotes for $f(x) = \frac{x+1}{x-2}$.
1.  Set the denominator to zero: $x-2 = 0 \implies x=2$.
2.  Check if the numerator is zero at $x=2$: $2+1 = 3 \neq 0$.
3.  Since the denominator is zero and the numerator is not, $x=2$ is a vertical asymptote.
    To confirm, let's look at the limits:
    *   As $x \to 2^+$ (e.g., $2.001$): $\frac{2.001+1}{2.001-2} = \frac{3.001}{0.001} \approx \text{large positive number} \implies \infty$.
    *   As $x \to 2^-$ (e.g., $1.999$): $\frac{1.999+1}{1.999-2} = \frac{2.999}{-0.001} \approx \text{large negative number} \implies -\infty$.
    Since the limit from either side is $\pm \infty$, $x=2$ is indeed a vertical asymptote.

**Formal/Mathematical Version:**
For a rational function $f(x) = \frac{P(x)}{Q(x)}$, where $P(x)$ and $Q(x)$ are polynomials with no common factors, a vertical asymptote exists at $x=a$ if $Q(a) = 0$.
If $P(x)$ and $Q(x)$ *do* have common factors, you must first simplify the function by canceling them out. If, after simplification, a factor $(x-a)$ still remains in the denominator, then $x=a$ is a vertical asymptote. If $(x-a)$ is canceled out, then there is a "hole" at $x=a$, not a vertical asymptote.

**What could go wrong:** Forgetting to simplify the rational function first. For example, for $g(x) = \frac{x^2-1}{x-1}$, if you just set the denominator to zero, you get $x=1$. But $x^2-1 = (x-1)(x+1)$, so $g(x) = \frac{(x-1)(x+1)}{x-1} = x+1$ for $x \neq 1$. There's a hole at $x=1$, not a vertical asymptote.

### Step 3: Understanding "Limits at Infinity" and Horizontal Asymptotes

**Plain English:** A limit at infinity describes what happens to the *output* of a function ($y$-value) as its *input* ($x$-value) gets incredibly large, either positively (towards $\infty$) or negatively (towards $-\infty$). If the output settles down and approaches a specific finite number $L$, then we say the function has a limit of $L$ at infinity. Geometrically, this means the graph of the function has an invisible horizontal line, called a **horizontal asymptote (HA)**, that it approaches as $x$ stretches infinitely far to the right or left.

**Small Concrete Example:** Consider again $f(x) = \frac{1}{x}$.
What happens as $x$ gets very large?
*   If $x$ approaches $\infty$ (e.g., $10, 100, 1000, \dots$), then $f(x)$ becomes $\frac{1}{10}=0.1$, $\frac{1}{100}=0.01$, $\frac{1}{1000}=0.001$, and so on. The values are getting closer and closer to $0$.
*   If $x$ approaches $-\infty$ (e.g., $-10, -100, -1000, \dots$), then $f(x)$ becomes $\frac{1}{-10}=-0.1$, $\frac{1}{-100}=-0.01$, $\frac{1}{-1000}=-0.001$, and so on. The values are also getting closer and closer to $0$.
In both cases, the function approaches $0$.

**Formal/Mathematical Version:**
We write this behavior as:
$$ \lim_{x \to \infty} f(x) = L $$
This means that for every number $\epsilon > 0$, there exists a number $N > 0$ such that if $x > N$, then $|f(x) - L| < \epsilon$. In simpler terms, we can make $f(x)$ as close to $L$ as we want by taking $x$ sufficiently large.

Similarly,
$$ \lim_{x \to -\infty} f(x) = L $$
This means that for every number $\epsilon > 0$, there exists a number $N < 0$ such that if $x < N$, then $|f(x) - L| < \epsilon$. We can make $f(x)$ as close to $L$ as we want by taking $x$ sufficiently negatively large.

If either of these conditions holds, then the horizontal line $y=L$ is called a **horizontal asymptote** of the function $f(x)$. A function can have at most two horizontal asymptotes (one for $x \to \infty$ and one for $x \to -\infty$), but usually, for rational functions, they are the same.

**What could go wrong:** Not all functions have horizontal asymptotes. For example, $f(x) = x^2$ or $f(x) = \sin(x)$ do not have horizontal asymptotes. The former goes to $\infty$, the latter oscillates.

### Step 4: Identifying Horizontal Asymptotes for Rational Functions

**Plain English:** For rational functions $f(x) = \frac{P(x)}{Q(x)}$, where $P(x)$ and $Q(x)$ are polynomials, we can quickly find horizontal asymptotes by comparing the highest power (degree) of $x$ in the numerator to the highest power of $x$ in the denominator. This comparison tells us which polynomial "dominates" as $x$ gets very large.

**Small Concrete Example:** Let's find the horizontal asymptotes for $f(x) = \frac{3x^2+1}{x^2-4}$.
The highest power in the numerator is $x^2$. The coefficient is $3$.
The highest power in the denominator is $x^2$. The coefficient is $1$.
Since the degrees are the same (both $2$), the horizontal asymptote is the ratio of the leading coefficients: $y = \frac{3}{1} = 3$.

**Formal/Mathematical Version:**
Let $f(x) = \frac{a_n x^n + a_{n-1} x^{n-1} + \dots + a_0}{b_m x^m + b_{m-1} x^{m-1} + \dots + b_0}$, where $a_n \neq 0$ and $b_m \neq 0$.
To find $\lim_{x \to \pm \infty} f(x)$, we divide both the numerator and the denominator by the highest power of $x$ in the denominator, which is $x^m$.
However, there's a shortcut based on comparing degrees:
1.  **If $n < m$ (degree of numerator is less than degree of denominator):**
    The denominator grows much faster than the numerator. The limit is $0$.
    $$ \lim_{x \to \pm \infty} f(x) = 0 $$
    The horizontal asymptote is $y=0$.
    *Example: $f(x) = \frac{x+1}{x^2-4}$. Here $n=1, m=2$. So $y=0$.*
2.  **If $n = m$ (degree of numerator equals degree of denominator):**
    The terms with the highest power of $x$ dominate. The limit is the ratio of the leading coefficients.
    $$ \lim_{x \to \pm \infty} f(x) = \frac{a_n}{b_m} $$
    The horizontal asymptote is $y = \frac{a_n}{b_m}$.
    *Example: $f(x) = \frac{3x^2+1}{x^2-4}$. Here $n=2, m=2$. So $y=\frac{3}{1}=3$.*
3.  **If $n > m$ (degree of numerator is greater than degree of denominator):**
    The numerator grows much faster than the denominator. The limit is $\pm \infty$ (it does not settle to a finite number).
    $$ \lim_{x \to \pm \infty} f(x) = \pm \infty $$
    There is no horizontal asymptote. (There might be a slant/oblique asymptote, which is a different topic).
    *Example: $f(x) = \frac{x^2+1}{x-4}$. Here $n=2, m=1$. No horizontal asymptote.*

**What could go wrong:** Incorrectly identifying the degrees or leading coefficients. Also, this shortcut only applies to rational functions. For other types of functions (like those with square roots or exponentials), you need to evaluate the limit more directly.

### Step 5: Dealing with "Limits at Infinity" for Other Functions

**Plain English:** For functions that aren't simple rational expressions, like those involving square roots, exponentials, or arctangent, we still ask what happens as $x$ gets extremely large. We rely on our knowledge of how these basic functions behave at infinity.

**Small Concrete Example:**
*   Consider $\lim_{x \to \infty} e^{-x}$. As $x$ gets very large, $-x$ gets very negatively large. $e^{\text{large negative number}}$ becomes very close to $0$. So, $\lim_{x \to \infty} e^{-x} = 0$. This means $y=0$ is a horizontal asymptote.
*   Consider $\lim_{x \to \infty} \arctan(x)$. The arctangent function "squishes" all real numbers into an angle between $-\pi/2$ and $\pi/2$. As $x$ goes to $\infty$, the angle approaches $\pi/2$. So, $\lim_{x \to \infty} \arctan(x) = \pi/2$. This means $y=\pi/2$ is a horizontal asymptote.

**Formal/Mathematical Version:**
Key limits to remember:
*   For any $k > 0$, $\lim_{x \to \pm \infty} \frac{1}{x^k} = 0$. This is the fundamental building block for rational function rules.
*   $\lim_{x \to \infty} e^x = \infty$ and $\lim_{x \to -\infty} e^x = 0$.
*   $\lim_{x \to \infty} \ln(x) = \infty$ (note: $\ln x$ is only defined for $x>0$, so no limit as $x \to -\infty$).
*   $\lim_{x \to \infty} \arctan(x) = \frac{\pi}{2}$ and $\lim_{x \to -\infty} \arctan(x) = -\frac{\pi}{2}$.
*   Limits of trigonometric functions like $\sin(x)$ and $\cos(x)$ do not exist as $x \to \pm \infty$ because they oscillate.

When dealing with expressions involving square roots, remember that $\sqrt{x^2} = |x|$. This is crucial when $x \to -\infty$. For $x \to -\infty$, $x$ is negative, so $|x| = -x$.

**What could go wrong:** Forgetting the basic behavior of transcendental functions. Misapplying $\sqrt{x^2}=x$ instead of $\sqrt{x^2}=|x|$ when $x \to -\infty$, which can lead to sign errors.

## 5. Worked examples — multiple, with every step shown

Here are several worked examples to solidify your understanding.

### Example 1: Infinite Limit (Vertical Asymptote)

**Problem:** Evaluate the limit $\lim_{x \to 2^+} \frac{x+1}{x-2}$ and identify any vertical asymptotes.

**Given:** The function $f(x) = \frac{x+1}{x-2}$ and we want to find the limit as $x$ approaches $2$ from the right side ($2^+$).
**Want:** The value of the limit and the equation of any vertical asymptote.

**Step-by-step solution:**

1.  **Identify potential vertical asymptotes:**
    The function $f(x)$ is a rational function. Vertical asymptotes occur where the denominator is zero and the numerator is non-zero.
    Set the denominator to zero: $x-2 = 0 \implies x=2$.
    Check the numerator at $x=2$: $2+1 = 3$. Since $3 \neq 0$, $x=2$ is indeed a vertical asymptote.

2.  **Evaluate the one-sided limit:**
    We need to determine if $f(x)$ goes to $\infty$ or $-\infty$ as $x \to 2^+$.
    As $x \to 2^+$, $x$ is slightly greater than $2$.
    Consider the numerator: $x+1$. As $x \to 2^+$, $x+1 \to 2+1 = 3$. This is a positive number.
    Consider the denominator: $x-2$. As $x \to 2^+$, $x$ is slightly greater than $2$, so $x-2$ will be a very small positive number (e.g., $0.0001$).
    So, we have a positive number divided by a very small positive number.
    $$ \lim_{x \to 2^+} \frac{x+1}{x-2} = \frac{\text{positive number}}{\text{small positive number}} = \infty $$
    Therefore, the limit is $\infty$.

**Final Answer:**
The limit is $\boxed{\infty}$.
The function has a vertical asymptote at $\boxed{x=2}$.

**Reflection:** This example demonstrates how to find a vertical asymptote and evaluate a one-sided infinite limit. The key is to analyze the sign of the numerator and denominator as $x$ approaches the critical value.

---

### Example 2: Infinite Limit (Vertical Asymptote) with a square

**Problem:** Evaluate the limit $\lim_{x \to -3} \frac{x-1}{(x+3)^2}$ and identify any vertical asymptotes.

**Given:** The function $f(x) = \frac{x-1}{(x+3)^2}$ and we want to find the limit as $x$ approaches $-3$.
**Want:** The value of the limit and the equation of any vertical asymptote.

**Step-by-step solution:**

1.  **Identify potential vertical asymptotes:**
    Set the denominator to zero: $(x+3)^2 = 0 \implies x+3 = 0 \implies x=-3$.
    Check the numerator at $x=-3$: $-3-1 = -4$. Since $-4 \neq 0$, $x=-3$ is a vertical asymptote.

2.  **Evaluate the limit (consider both sides if necessary):**
    We need to determine if $f(x)$ goes to $\infty$ or $-\infty$ as $x \to -3$.
    Consider the numerator: $x-1$. As $x \to -3$, $x-1 \to -3-1 = -4$. This is a negative number.
    Consider the denominator: $(x+3)^2$. As $x \to -3$, $x+3$ approaches $0$. However, because it's squared, $(x+3)^2$ will always be a very small *positive* number, whether $x$ approaches $-3$ from the left or the right. (e.g., if $x=-3.001$, $(x+3)^2 = (-0.001)^2 = 0.000001$; if $x=-2.999$, $(x+3)^2 = (0.001)^2 = 0.000001$).
    So, we have a negative number divided by a very small positive number.
    $$ \lim_{x \to -3} \frac{x-1}{(x+3)^2} = \frac{\text{negative number}}{\text{small positive number}} = -\infty $$
    Therefore, the limit is $-\infty$.

**Final Answer:**
The limit is $\boxed{-\infty}$.
The function has a vertical asymptote at $\boxed{x=-3}$.

**Reflection:** The square in the denominator is critical here. It ensures the denominator is always positive near the asymptote, which dictates the overall sign of the infinite limit. If the denominator were $(x+3)^3$, the sign would depend on whether $x$ approaches from the left or right, leading to different one-sided limits.

---

### Example 3: Limit at Infinity (Horizontal Asymptote) for Rational Function

**Problem:** Evaluate the limit $\lim_{x \to \infty} \frac{4x^2 - 3x + 5}{2x^2 + 7x - 1}$ and identify any horizontal asymptotes.

**Given:** The function $f(x) = \frac{4x^2 - 3x + 5}{2x^2 + 7x - 1}$ and we want to find the limit as $x$ approaches $\infty$.
**Want:** The value of the limit and the equation of any horizontal asymptote.

**Step-by-step solution:**

1.  **Identify the highest power of $x$ in the denominator:**
    The highest power of $x$ in the denominator $(2x^2 + 7x - 1)$ is $x^2$.

2.  **Divide every term in the numerator and denominator by this highest power:**
    $$ \lim_{x \to \infty} \frac{\frac{4x^2}{x^2} - \frac{3x}{x^2} + \frac{5}{x^2}}{\frac{2x^2}{x^2} + \frac{7x}{x^2} - \frac{1}{x^2}} $$
    Simplify each term:
    $$ \lim_{x \to \infty} \frac{4 - \frac{3}{x} + \frac{5}{x^2}}{2 + \frac{7}{x} - \frac{1}{x^2}} $$

3.  **Apply the limit properties:**
    Recall that $\lim_{x \to \infty} \frac{c}{x^n} = 0$ for any constant $c$ and $n > 0$.
    $$ \frac{\lim_{x \to \infty} 4 - \lim_{x \to \infty} \frac{3}{x} + \lim_{x \to \infty} \frac{5}{x^2}}{\lim_{x \to \infty} 2 + \lim_{x \to \infty} \frac{7}{x} - \lim_{x \to \infty} \frac{1}{x^2}} = \frac{4 - 0 + 0}{2 + 0 - 0} $$
    $$ = \frac{4}{2} = 2 $$
    Therefore, the limit is $2$.

**Final Answer:**
The limit is $\boxed{2}$.
The function has a horizontal asymptote at $\boxed{y=2}$.

**Reflection:** This example illustrates the formal method for evaluating limits of rational functions at infinity by dividing by the highest power of $x$ in the denominator. Notice that the degrees of the numerator and denominator are equal ($n=2, m=2$), so the horizontal asymptote is the ratio of the leading coefficients ($4/2=2$), which matches our result. This confirms the shortcut rule.

---

### Example 4: Limit at Infinity with a Square Root

**Problem:** Evaluate the limit $\lim_{x \to -\infty} \frac{\sqrt{9x^2+2}}{3x-5}$ and identify any horizontal asymptotes.

**Given:** The function $f(x) = \frac{\sqrt{9x^2+2}}{3x-5}$ and we want to find the limit as $x$ approaches $-\infty$.
**Want:** The value of the limit and the equation of any horizontal asymptote.

**Step-by-step solution:**

1.  **Identify the "effective" highest power of $x$ in the denominator:**
    The highest power of $x$ in the denominator $(3x-5)$ is $x$.

2.  **Divide every term in the numerator and denominator by this highest power, being careful with the square root:**
    When dividing inside a square root by $x$, we need to remember that $\sqrt{x^2} = |x|$.
    Since $x \to -\infty$, $x$ is negative, so $|x| = -x$. Therefore, $x = -|x|$.
    $$ \lim_{x \to -\infty} \frac{\sqrt{9x^2+2}}{3x-5} = \lim_{x \to -\infty} \frac{\frac{\sqrt{9x^2+2}}{x}}{\frac{3x-5}{x}} $$
    For the numerator, we write $x$ as $-\sqrt{x^2}$ because $x$ is negative:
    $$ = \lim_{x \to -\infty} \frac{-\frac{\sqrt{9x^2+2}}{\sqrt{x^2}}}{\frac{3x}{x}-\frac{5}{x}} $$
    Combine the terms under the square root in the numerator:
    $$ = \lim_{x \to -\infty} \frac{-\sqrt{\frac{9x^2}{x^2}+\frac{2}{x^2}}}{3-\frac{5}{x}} $$
    Simplify each term:
    $$ = \lim_{x \to -\infty} \frac{-\sqrt{9+\frac{2}{x^2}}}{3-\frac{5}{x}} $$

3.  **Apply the limit properties:**
    Recall that $\lim_{x \to -\infty} \frac{c}{x^n} = 0$ for any constant $c$ and $n > 0$.
    $$ \frac{-\sqrt{\lim_{x \to -\infty} 9 + \lim_{x \to -\infty} \frac{2}{x^2}}}{\lim_{x \to -\infty} 3 - \lim_{x \to -\infty} \frac{5}{x}} = \frac{-\sqrt{9+0}}{3-0} $$
    $$ = \frac{-\sqrt{9}}{3} = \frac{-3}{3} = -1 $$
    Therefore, the limit is $-1$.

**Final Answer:**
The limit is $\boxed{-1}$.
The function has a horizontal asymptote at $\boxed{y=-1}$.

**Reflection:** This example highlights the crucial detail of $\sqrt{x^2}=|x|$. When $x \to -\infty$, $x$ is negative, so $|x|=-x$. This leads to a negative sign in the numerator's simplification, which significantly affects the final limit. If we had taken the limit as $x \to \infty$, the result would be $1$. This function has two horizontal asymptotes!

---

### Example 5: Finding all Asymptotes (VA and HA)

**Problem:** Find all vertical and horizontal asymptotes for the function $f(x) = \frac{x^2-4}{x^2-x-2}$.

**Given:** The function $f(x) = \frac{x^2-4}{x^2-x-2}$.
**Want:** The equations of all vertical and horizontal asymptotes.

**Step-by-step solution:**

1.  **Simplify the function (factor numerator and denominator):**
    Numerator: $x^2-4 = (x-2)(x+2)$
    Denominator: $x^2-x-2 = (x-2)(x+1)$
    So, $f(x) = \frac{(x-2)(x+2)}{(x-2)(x+1)}$.
    For $x \neq 2$, we can simplify: $f(x) = \frac{x+2}{x+1}$.
    Note: There is a hole at $x=2$, not a vertical asymptote, because the factor $(x-2)$ canceled out.

2.  **Find Vertical Asymptotes (VA):**
    Use the simplified function $f(x) = \frac{x+2}{x+1}$.
    Set the denominator to zero: $x+1 = 0 \implies x=-1$.
    Check the numerator at $x=-1$: $-1+2 = 1$. Since $1 \neq 0$, $x=-1$ is a vertical asymptote.
    Let's check the one-sided limits to confirm the infinite behavior:
    *   $\lim_{x \to -1^+} \frac{x+2}{x+1}$: Numerator $\to 1$ (positive). Denominator $\to 0^+$ (small positive). So, $\lim_{x \to -1^+} f(x) = \infty$.
    *   $\lim_{x \to -1^-} \frac{x+2}{x+1}$: Numerator $\to 1$ (positive). Denominator $\to 0^-$ (small negative). So, $\lim_{x \to -1^-} f(x) = -\infty$.
    Since the limits are infinite, $x=-1$ is indeed a vertical asymptote.

3.  **Find Horizontal Asymptotes (HA):**
    Use the original function or the simplified one (they have the same behavior at infinity). Let's use the original for demonstration, but the simplified one would give the same result.
    $f(x) = \frac{x^2-4}{x^2-x-2}$.
    Compare the degrees of the numerator and denominator:
    Degree of numerator ($x^2-4$) is $2$.
    Degree of denominator ($x^2-x-2$) is $2$.
    Since the degrees are equal, the horizontal asymptote is the ratio of the leading coefficients.
    Leading coefficient of numerator is $1$.
    Leading coefficient of denominator is $1$.
    So, $y = \frac{1}{1} = 1$.
    To confirm with the formal method:
    $$ \lim_{x \to \pm \infty} \frac{x^2-4}{x^2-x-2} = \lim_{x \to \pm \infty} \frac{\frac{x^2}{x^2}-\frac{4}{x^2}}{\frac{x^2}{x^2}-\frac{x}{x^2}-\frac{2}{x^2}} = \lim_{x \to \pm \infty} \frac{1-\frac{4}{x^2}}{1-\frac{1}{x}-\frac{2}{x^2}} = \frac{1-0}{1-0-0} = 1 $$
    The horizontal asymptote is $y=1$.

**Final Answer:**
Vertical asymptote: $\boxed{x=-1}$.
Horizontal asymptote: $\boxed{y=1}$.

**Reflection:** This example emphasizes the importance of factoring and simplifying rational functions *before* identifying vertical asymptotes. A common factor indicates a hole, not an asymptote. For horizontal asymptotes, simplification is not strictly necessary, but it can make the limit evaluation clearer.

## 6. Common mistakes and traps

Students often encounter specific pitfalls when working with infinite limits and limits at infinity. Being aware of these can help you avoid them.

1.  **Confusing a hole with a vertical asymptote:** This is the most common mistake for rational functions. If a factor $(x-a)$ cancels out from both the numerator and denominator of $f(x) = P(x)/Q(x)$, then there is a hole (removable discontinuity) at $x=a$, not a vertical asymptote. A vertical asymptote exists only if $Q(a)=0$ and $P(a) \neq 0$ *after* simplification.
    *   *Why it happens:* Students often just set the original denominator to zero without simplifying.

2.  **Incorrectly determining the sign of an infinite limit:** When evaluating $\lim_{x \to a} f(x) = \pm \infty$, it's crucial to correctly determine if the denominator is approaching $0$ from the positive side ($0^+$) or the negative side ($0^-$). A positive numerator divided by $0^+$ is $\infty$, but a positive numerator divided by $0^-$ is $-\infty$.
    *   *Why it happens:* Not paying close attention to one-sided limits or the behavior of squared terms in the denominator.

3.  **Misapplying horizontal asymptote rules to non-rational functions:** The "degree comparison" rules for horizontal asymptotes (e.g., $y=0$ if $\text{deg}(P) < \text{deg}(Q)$) apply *only* to rational functions (polynomials divided by polynomials). They do not apply to functions involving square roots, exponentials, logarithms, or trigonometric functions directly.
    *   *Why it happens:* Overgeneralizing a useful shortcut.

4.  **Forgetting $\sqrt{x^2} = |x|$ when $x \to -\infty$:** When dealing with expressions like $\sqrt{Ax^2+B}$ as $x \to -\infty$, it's tempting to pull $x$ out as $\sqrt{x^2}=x$. However, since $x$ is negative in this context, $\sqrt{x^2}$ must be treated as $-x$ (because $|x|=-x$ for $x<0$). This sign error can lead to an incorrect horizontal asymptote.
    *   *Why it happens:* Forgetting the definition of absolute value or only considering positive $x$ values.

5.  **Assuming a function can only have one horizontal asymptote:** While most rational functions have at most one horizontal asymptote (the same for $x \to \infty$ and $x \to -\infty$), some functions, especially those involving square roots, can have different horizontal asymptotes as $x \to \infty$ and $x \to -\infty$.
    *   *Why it happens:* Not explicitly checking both $\lim_{x \to \infty}$ and $\lim_{x \to -\infty}$.

6.  **Confusing the definitions:** Mixing up "infinite limit" (function output goes to $\pm \infty$ as $x \to a$) with "limit at infinity" (function output goes to $L$ as $x \to \pm \infty$). The former relates to vertical asymptotes, the latter to horizontal asymptotes.
    *   *Why it happens:* The terminology is similar, requiring careful attention to what is approaching infinity (the input $x$ or the output $f(x)$).

## 7. Textbook-precise explanation

This section provides the formal definitions of infinite limits and limits at infinity, as they would appear in a rigorous university calculus textbook.

**Definition of an Infinite Limit:**
Let $f$ be a function defined on some open interval that contains $a$, except possibly at $a$ itself.

1.  We say that the **limit of $f(x)$ as $x$ approaches $a$ is infinity**, written as
    $$ \lim_{x \to a} f(x) = \infty $$
    if for every positive number $M$, there exists a positive number $\delta$ such that if $0 < |x-a| < \delta$, then $f(x) > M$.
    (This means that $f(x)$ can be made arbitrarily large by taking $x$ sufficiently close to $a$, but not equal to $a$.)

2.  We say that the **limit of $f(x)$ as $x$ approaches $a$ is negative infinity**, written as
    $$ \lim_{x \to a} f(x) = -\infty $$
    if for every negative number $N$, there exists a positive number $\delta$ such that if $0 < |x-a| < \delta$, then $f(x) < N$.
    (This means that $f(x)$ can be made arbitrarily large negatively by taking $x$ sufficiently close to $a$, but not equal to $a$.)

Similar definitions exist for one-sided infinite limits: $\lim_{x \to a^+} f(x) = \infty$, $\lim_{x \to a^-} f(x) = \infty$, etc.

**Definition of a Vertical Asymptote:**
The line $x=a$ is called a **vertical asymptote** of the curve $y=f(x)$ if at least one of the following statements is true:
$$ \lim_{x \to a} f(x) = \infty \quad \lim_{x \to a} f(x) = -\infty $$
$$ \lim_{x \to a^+} f(x) = \infty \quad \lim_{x \to a^+} f(x) = -\infty $$
$$ \lim_{x \to a^-} f(x) = \infty \quad \lim_{x \to a^-} f(x) = -\infty $$

**Definition of a Limit at Infinity:**
Let $f$ be a function defined on some interval $(N, \infty)$.

1.  We say that the **limit of $f(x)$ as $x$ approaches infinity is $L$**, written as
    $$ \lim_{x \to \infty} f(x) = L $$
    if for every number $\epsilon > 0$, there exists a corresponding positive number $N$ such that if $x > N$, then $|f(x) - L| < \epsilon$.
    (This means that the values of $f(x)$ can be made arbitrarily close to $L$ by taking $x$ sufficiently large.)

2.  We say that the **limit of $f(x)$ as $x$ approaches negative infinity is $L$**, written as
    $$ \lim_{x \to -\infty} f(x) = L $$
    if for every number $\epsilon > 0$, there exists a corresponding negative number $N$ such that if $x < N$, then $|f(x) - L| < \epsilon$.
    (This means that the values of $f(x)$ can be made arbitrarily close to $L$ by taking $x$ sufficiently negatively large.)

**Definition of a Horizontal Asymptote:**
The line $y=L$ is called a **horizontal asymptote** of the curve $y=f(x)$ if either
$$ \lim_{x \to \infty} f(x) = L \quad \text{or} \quad \lim_{x \to -\infty} f(x) = L $$

These definitions are standard and can be found in textbooks such as *Stewart, Calculus: Early Transcendentals, 9th Edition, §2.6*.

## 8. ASCII diagrams

Here are a couple of ASCII diagrams to visualize vertical and horizontal asymptotes.

```text
       |
       |  /
       | /
       |/
-------+-------------------> x
       | \
       |  \
       |   \
       |    \
       |
       x=a (Vertical Asymptote)

Description: A vertical line x=a. The function's graph approaches this line from the left, shooting up towards positive infinity, and approaches it from the right, plunging down towards negative infinity. The graph never touches the line x=a.
```

```text
y=L  --------------------------------------
       /                                  /
      /                                  /
     /                                  /
    /                                  /
---+-----------------------------------> x
   \                                  \
    \                                  \
     \                                  \

Description: A horizontal line y=L. The function's graph approaches this line as x extends far to the left (negative infinity) and far to the right (positive infinity). The graph gets arbitrarily close to y=L but may or may not cross it, it just approaches it in the long run.
```

```text
       |
       |  /
       | /
y=L ---+-----------------------------------> x
       | \
       |  \
       |   \
       |
       x=a

Description: A combined graph showing both a vertical asymptote at x=a and a horizontal asymptote at y=L. The function approaches x=a vertically (e.g., from the left going to -infinity, from the right going to +infinity). Simultaneously, as x goes to positive or negative infinity, the function's y-values approach y=L.
```

## 9. Memory technique — never forget this

1.  **Mnemonic or Visual Hook:**
    *   **Vertical Asymptotes (VA):** Think of a **V**ertical wall or cliff. As you approach it (as $x \to a$), you either fall off into the abyss ($-\infty$) or launch into the sky ($\infty$). The graph can never cross this wall. *Keywords: "wall," "cliff," "explosion."*
    *   **Horizontal Asymptotes (HA):** Think of the **H**orizon. As you travel endlessly forward or backward (as $x \to \pm \infty$), the landscape flattens out and approaches a constant height (a specific $y$-value, $L$). You're always heading towards that horizon, but never quite reaching it. *Keywords: "horizon," "leveling off," "settling down."*

2.  **The 1-3 formulas/facts they MUST overlearn:**
    *   **Vertical Asymptotes for Rational Functions:** For $f(x) = P(x)/Q(x)$ (simplified, no common factors), VAs occur at $x=a$ where $Q(a)=0$.
    *   **Horizontal Asymptotes for Rational Functions:** For $f(x) = \frac{a_n x^n + \dots}{b_m x^m + \dots}$:
        *   If $n < m$, then $y=0$.
        *   If $n = m$, then $y = a_n/b_m$.
        *   If $n > m$, then no HA.
    *   **Fundamental Limit for Limits at Infinity:** $\lim_{x \to \pm \infty} \frac{c}{x^k} = 0$ for any constant $c$ and $k > 0$. This is the basis for all HA calculations.

3.  **Spaced-repetition schedule:**
    *   **Day 1:** Review this lesson immediately after reading. Work through a few practice problems.
    *   **Day 3:** Re-read the "Core Idea" and "Common Mistakes" sections. Try 2-3 new problems.
    *   **Day 7:** Quickly review the definitions and the 3 key facts. Attempt 1-2 challenging problems.
    *   **Day 16:** Dedicate 15-20 minutes to a full review, including a mix of problem types.
    *   **Day 35:** Integrate this topic into a broader calculus review. Ensure you can still explain the concepts and solve problems efficiently.

4.  **The first-principles re-derivation pathway:**
    If you forget the rules for horizontal asymptotes of rational functions, you can always rebuild them:
    *   **For $f(x) = \frac{P(x)}{Q(x)}$ as $x \to \pm \infty$:**
        1.  Identify the highest power of $x$ in the *denominator*, let's say $x^m$.
        2.  Divide every single term in both the numerator and the denominator by $x^m$.
        3.  Apply the fundamental limit: $\lim_{x \to \pm \infty} \frac{c}{x^k} = 0$. All terms with $x$ in the denominator will go to zero.
        4.  The remaining terms will reveal the limit:
            *   If $n < m$, the numerator will go to $0$, and the denominator to a non-zero constant ($b_m$), so the limit is $0$.
            *   If $n = m$, both numerator and denominator will go to their leading coefficients ($a_n$ and $b_m$), so the limit is $a_n/b_m$.
            *   If $n > m$, the numerator will still contain powers of $x$, while the denominator goes to a constant, making the limit $\pm \infty$.
    This method is robust and works even for functions with square roots, as long as you correctly handle $\sqrt{x^2}=|x|$.

## 10. Connections — what this leads to

The concepts of infinite limits and limits at infinity are foundational in calculus and beyond. Mastering them unlocks a deeper understanding of many subsequent topics:

1.  **Curve Sketching:** Asymptotes are critical features when sketching the graph of a function. Knowing where a function has vertical or horizontal asymptotes helps you accurately depict its overall shape and behavior, especially at the edges of its domain or as $x$ becomes very large.

2.  **Optimization Problems:** While not directly about asymptotes, the idea of analyzing function behavior as variables approach extremes (like infinity or points of discontinuity) is central to finding maximum and minimum values in complex systems.

3.  **L'Hôpital's Rule:** This powerful rule, taught later in Calculus I or II, is used to evaluate limits of indeterminate forms (like $0/0$ or $\infty/\infty$). Many limits at infinity or infinite limits can result in these indeterminate forms, making a solid understanding of these concepts a prerequisite for applying L'Hôpital's Rule effectively.

4.  **Improper Integrals:** In Calculus II, you'll encounter improper integrals, which involve integrating functions over infinite intervals or integrating functions that have infinite discontinuities (vertical asymptotes) within the integration interval. Evaluating these integrals relies heavily on the concept of limits at infinity and infinite limits.

5.  **Sequences and Series:** The convergence or divergence of infinite sequences and series (Calculus II) is fundamentally based on the concept of a limit at infinity. A sequence converges if its limit as $n \to \infty$ exists and is finite.

6.  **Differential Equations:** Solutions to differential equations often exhibit asymptotic behavior. For instance, in population growth models, the population might approach a carrying capacity (a horizontal asymptote) over time. In physical systems, quantities might decay to zero or stabilize at a certain value.

7.  **Numerical Analysis:** Understanding asymptotic behavior helps in analyzing the stability and error propagation of numerical algorithms. For example, some iterative methods might converge to a solution asymptotically.

8.  **Complex Analysis:** The concept of poles (which are related to vertical asymptotes) is a central idea in complex analysis, where functions can behave wildly at specific points in the complex plane.

## 11. Self-check questions

Test your understanding with these questions. Do not look up the answers until you've given them your best effort!

1.  Evaluate $\lim_{x \to 4^-} \frac{x^2}{x-4}$. What does this tell you about the graph of the function at $x=4$?

2.  Find all horizontal asymptotes for the function $f(x) = \frac{3x^3 - 2x + 1}{5x^3 + 4x^2 - 7}$.

3.  Determine all vertical and horizontal asymptotes for the function $g(x) = \frac{x^2-9}{x^2-2x-3}$. Be sure to simplify the function first.

4.  Evaluate $\lim_{x \to \infty} \frac{e^x - e^{-x}}{e^x + e^{-x}}$.

5.  Find all horizontal asymptotes for the function $h(x) = \frac{2x}{\sqrt{x^2+5}}$. (Hint: Remember to check both $x \to \infty$ and $x \to -\infty$.)