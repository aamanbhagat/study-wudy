## 1. What it is — in plain English

Imagine you're walking along a path that represents a function's graph. You always walk from left to right, just like you read a book.

If, as you walk from left to right, the path goes *uphill*, then the function is **increasing** in that section. Your height is getting higher as you move forward.

If, as you walk from left to right, the path goes *downhill*, then the function is **decreasing** in that section. Your height is getting lower as you move forward.

If the path stays perfectly *flat*, neither going up nor down, then the function is **constant** in that section. Your height doesn't change as you move forward.

It's all about how the "output" (your height, or the $y$-value) changes as the "input" (your horizontal position, or the $x$-value) steadily gets larger.

## 2. Why it matters — real-world applications

Understanding increasing and decreasing functions is fundamental because many real-world phenomena involve quantities that change over time or with respect to other variables.

1.  **Aerospace Engineering & Physics (Rocket Launch):** When a rocket launches, its altitude over time is an **increasing function**. Engineers need to model this to predict trajectory, fuel consumption, and staging. Conversely, if we consider the amount of fuel remaining in the rocket's tank, that would be a **decreasing function** over time during flight. Analyzing these functions helps optimize launch profiles and ensure mission success.

2.  **Machine Learning & Data Science (Model Training):** In machine learning, algorithms learn by minimizing a "loss function." The value of this loss function typically **decreases** as the model trains and gets better at its task. Meanwhile, the model's accuracy on a validation dataset is generally an **increasing function** of training time (up to a point). Data scientists monitor these trends to determine when a model is sufficiently trained or if it's overfitting.

3.  **Economics & Finance (Stock Market):** The price of a stock or a commodity over time can be an increasing, decreasing, or constant function. Investors constantly analyze these trends to make buy or sell decisions. If a stock's price is consistently an **increasing function**, it might be a good investment; if it's a **decreasing function**, it might be time to sell. Economists also study increasing/decreasing functions in supply and demand curves to understand market equilibrium.

4.  **Environmental Science (Pollution Levels):** The concentration of a pollutant in a river might be an **increasing function** downstream from a factory discharge point, then become a **decreasing function** further downstream as natural processes dilute it. Environmental scientists use this to model pollution spread and assess ecological impact.

5.  **Medicine (Drug Concentration):** After a patient takes a medication, the concentration of the drug in their bloodstream typically **increases** rapidly to a peak, then **decreases** as the body metabolizes and eliminates it. Doctors and pharmacologists use these functional relationships to determine appropriate dosages and timing for medication.

## 3. Prerequisites — what you must know first

Before diving deep into increasing and decreasing functions, ensure you have a solid grasp of these foundational concepts:

*   **Variables:** Understanding what a variable (like $x$ or $y$) represents – a placeholder for a numerical value.
*   **Functions:** The core idea of a function as a rule that assigns exactly one output ($y$) for each input ($x$). You should be comfortable with notation like $f(x)$.
*   **Domain and Range:** Knowing what inputs are allowed (domain) and what outputs are possible (range) for a given function.
*   **Graphing Functions:** The ability to plot points on a Cartesian coordinate system and sketch the graph of simple functions. Understanding that the $x$-axis represents inputs and the $y$-axis represents outputs.
*   **Inequalities:** Familiarity with comparison symbols like $<$, $>$, $\le$, $\ge$ and how to work with them. For example, knowing that $x_1 < x_2$ means $x_1$ is to the left of $x_2$ on the number line.
*   **Interval Notation:** How to express sets of numbers using intervals, such as $(a, b)$ for numbers between $a$ and $b$, or $[a, b]$ for numbers including $a$ and $b$.
*   **Reading Graphs:** The skill to interpret information directly from the visual representation of a function.

If any of these concepts feel unfamiliar, please pause and review them first. They are crucial building blocks for this lesson.

## 4. The core idea — step by step

Let's break down the intuitive definition of increasing and decreasing functions into manageable steps, building our understanding from the ground up.

### Step 1: The "Input" and "Output" Relationship

**Plain-English Statement:** When we talk about a function being increasing or decreasing, we're always observing how its output ($y$-value, or $f(x)$) changes *in response to* a change in its input ($x$-value). Specifically, we're interested in what happens as the input *gets larger*.

**Small Concrete Example:** Consider the simple function $f(x) = x + 2$.
If we pick an input $x=1$, the output is $f(1) = 1+2 = 3$.
If we pick a slightly larger input $x=2$, the output is $f(2) = 2+2 = 4$.
Notice that as $x$ increased from $1$ to $2$, the output $f(x)$ also increased from $3$ to $4$.

**Formal/Mathematical Version:** We select two arbitrary input values, let's call them $x_1$ and $x_2$. We always assume that $x_1$ is smaller than $x_2$.
$$x_1 < x_2$$
Then we compare their corresponding output values, $f(x_1)$ and $f(x_2)$.

**What Could Go Wrong:** A common mistake is to confuse which variable is the input and which is the output. Always remember that $x$ is the independent variable (input) and $f(x)$ or $y$ is the dependent variable (output). We are always observing the change in $y$ *as $x$ increases*.

### Step 2: Defining a Strictly Increasing Function

**Plain-English Statement:** A function is "strictly increasing" over a certain section of its graph if, as you move from left to right (meaning your $x$-value is getting bigger), the graph *always* goes uphill. There are no flat parts, and it never goes downhill. The output *always* gets larger when the input gets larger.

**Small Concrete Example:** Look at the function $f(x) = x^3$.
Let's pick $x_1 = 1$ and $x_2 = 2$.
$f(x_1) = f(1) = 1^3 = 1$.
$f(x_2) = f(2) = 2^3 = 8$.
Since $x_1 < x_2$ (i.e., $1 < 2$) and $f(x_1) < f(x_2)$ (i.e., $1 < 8$), this suggests the function is increasing.
If you were to graph $f(x)=x^3$, you'd see it always goes uphill from left to right.

**Formal/Mathematical Version:** A function $f$ is said to be **strictly increasing** on an interval $I$ if for any two numbers $x_1$ and $x_2$ in $I$ with
$$x_1 < x_2$$
it follows that
$$f(x_1) < f(x_2)$$

**What Could Go Wrong:** Students might pick just one pair of points and generalize. It's crucial that this relationship holds for *any* pair of $x_1, x_2$ in the specified interval. Also, the term "strictly" means the outputs *must* be different; they cannot be equal.

### Step 3: Defining a Strictly Decreasing Function

**Plain-English Statement:** A function is "strictly decreasing" over a certain section of its graph if, as you move from left to right (meaning your $x$-value is getting bigger), the graph *always* goes downhill. It never goes flat or uphill. The output *always* gets smaller when the input gets larger.

**Small Concrete Example:** Consider the function $f(x) = -2x + 5$.
Let's pick $x_1 = 1$ and $x_2 = 3$.
$f(x_1) = f(1) = -2(1) + 5 = 3$.
$f(x_2) = f(3) = -2(3) + 5 = -6 + 5 = -1$.
Here, $x_1 < x_2$ (i.e., $1 < 3$), but $f(x_1) > f(x_2)$ (i.e., $3 > -1$). This indicates the function is decreasing.
If you graph $f(x)=-2x+5$, you'll see it's a straight line always going downhill.

**Formal/Mathematical Version:** A function $f$ is said to be **strictly decreasing** on an interval $I$ if for any two numbers $x_1$ and $x_2$ in $I$ with
$$x_1 < x_2$$
it follows that
$$f(x_1) > f(x_2)$$

**What Could Go Wrong:** A common error is mixing up the inequality signs for $f(x_1)$ and $f(x_2)$. Remember: for decreasing, $x$ goes *up* ($x_1 < x_2$), but $f(x)$ goes *down* ($f(x_1) > f(x_2)$). The directions are opposite.

### Step 4: Defining a Constant Function

**Plain-English Statement:** A function is "constant" over a certain section of its graph if, as you move from left to right, the graph stays perfectly flat. The output value never changes, no matter how much the input changes within that section.

**Small Concrete Example:** Consider the function $f(x) = 7$.
Let's pick $x_1 = -5$ and $x_2 = 10$.
$f(x_1) = f(-5) = 7$.
$f(x_2) = f(10) = 7$.
Here, $x_1 < x_2$ (i.e., $-5 < 10$), and $f(x_1) = f(x_2)$ (i.e., $7 = 7$). This means the function is constant.
If you graph $f(x)=7$, it's a horizontal line.

**Formal/Mathematical Version:** A function $f$ is said to be **constant** on an interval $I$ if for any two numbers $x_1$ and $x_2$ in $I$ with
$$x_1 < x_2$$
it follows that
$$f(x_1) = f(x_2)$$

**What Could Go Wrong:** Sometimes students might mistake a very slight slope for a constant function, especially when looking at hand-drawn graphs. A truly constant function has zero change in output for any change in input within the interval.

### Step 5: The Importance of Intervals

**Plain-English Statement:** Most functions don't just "do one thing" forever. A function can be increasing in one part of its graph, then switch to decreasing in another part, and maybe even be constant somewhere else. We always describe these behaviors over specific "intervals" of $x$-values.

**Small Concrete Example:** Consider the function $f(x) = x^2$.
If you look at the graph for $x < 0$ (the left side of the $y$-axis), it's going downhill. So, $f(x)$ is decreasing on $(-\infty, 0)$.
If you look at the graph for $x > 0$ (the right side of the $y$-axis), it's going uphill. So, $f(x)$ is increasing on $(0, \infty)$.
At $x=0$, the function changes direction. This point is called a turning point or vertex.

**Formal/Mathematical Version:** The definitions for strictly increasing, strictly decreasing, and constant functions are always applied **over an interval $I$** that is a subset of the function's domain. We use interval notation to specify these regions, typically using parentheses $(a, b)$ to indicate that the endpoints are not included, as the function isn't strictly increasing/decreasing *at* a single point or at a sharp turning point.

**What Could Go Wrong:** A common error is to say "the function is increasing" without specifying *where* it is increasing. This is almost always incorrect unless the function is always increasing over its entire domain. Always use interval notation (e.g., $(-\infty, 0)$ or $[2, 5]$) to describe where a function is increasing, decreasing, or constant.

### Step 6: Non-Decreasing and Non-Increasing (A Nuance)

**Plain-English Statement:** Sometimes, a function might go uphill, but then have a flat section, and then continue uphill. It never goes *downhill*, but it's not *strictly* going uphill because of the flat part. We call this "non-decreasing." Similarly, "non-increasing" means it never goes uphill, but might have flat parts while generally going downhill. For this intuitive lesson, we'll primarily stick to "strictly increasing," "strictly decreasing," and "constant" for clarity, but it's good to be aware of this distinction.

**Small Concrete Example:** Consider a function that is $f(x) = x$ for $x<0$, $f(x) = 0$ for $0 \le x \le 2$, and $f(x) = x-2$ for $x > 2$.
This function goes uphill, then is flat, then goes uphill again. It is **non-decreasing** over its entire domain. It is strictly increasing on $(-\infty, 0)$ and $(2, \infty)$, and constant on $[0, 2]$.

**Formal/Mathematical Version:**
A function $f$ is **increasing** (or non-decreasing) on an interval $I$ if for any two numbers $x_1, x_2$ in $I$ with $x_1 < x_2$, it follows that $f(x_1) \le f(x_2)$.
A function $f$ is **decreasing** (or non-increasing) on an interval $I$ if for any two numbers $x_1, x_2$ in $I$ with $x_1 < x_2$, it follows that $f(x_1) \ge f(x_2)$.
Notice the "or equal to" part in the inequalities. This allows for flat sections.

**What Could Go Wrong:** Confusing "strictly increasing" with "increasing" (non-decreasing). In many introductory contexts, "increasing" is used synonymously with "strictly increasing." However, in higher mathematics, the distinction is important. For now, assume "increasing" means "strictly increasing" unless specified otherwise, but be aware of the more precise definitions.

## 5. Worked examples — multiple, with every step shown

Let's apply these definitions to some functions. When determining intervals of increasing/decreasing, we typically use open intervals (parentheses) because at the exact turning point, the function is neither strictly increasing nor strictly decreasing.

### Example 1: Linear Function (Easy)

**Problem:** Determine the intervals where the function $f(x) = 3x - 1$ is increasing or decreasing.

**What's Given:** The function $f(x) = 3x - 1$.
**What We Want:** The intervals of $x$ where $f(x)$ is increasing or decreasing.

**Step-by-Step Solution:**

1.  **Understand the function:** This is a linear function, which means its graph is a straight line. The slope is $m=3$.

2.  **Choose two arbitrary points:** Let $x_1$ and $x_2$ be any two real numbers such that $x_1 < x_2$.
    *   *Explanation:* We pick two arbitrary input values, making sure the first is smaller than the second. This sets up our test for increasing/decreasing.

3.  **Evaluate the function at these points:**
    $f(x_1) = 3x_1 - 1$
    $f(x_2) = 3x_2 - 1$
    *   *Explanation:* We find the corresponding output values for our chosen inputs.

4.  **Compare the output values:** We want to see how $f(x_1)$ and $f(x_2)$ relate.
    Since we know $x_1 < x_2$, let's manipulate this inequality to match our function:
    Multiply both sides by $3$:
    $3x_1 < 3x_2$
    *   *Explanation:* Multiplying an inequality by a positive number preserves the direction of the inequality.

    Subtract $1$ from both sides:
    $3x_1 - 1 < 3x_2 - 1$
    *   *Explanation:* Subtracting a number from both sides of an inequality preserves the direction.

    Substitute $f(x_1)$ and $f(x_2)$ back in:
    $f(x_1) < f(x_2)$
    *   *Explanation:* We've shown that if $x_1 < x_2$, then $f(x_1)$ is also less than $f(x_2)$.

5.  **Conclude:** Based on the definition of a strictly increasing function (Step 2), since $x_1 < x_2$ implies $f(x_1) < f(x_2)$ for all $x_1, x_2$ in the domain, the function $f(x) = 3x - 1$ is strictly increasing over its entire domain.

**Final Answer:**
The function $f(x) = 3x - 1$ is **strictly increasing** on the interval $(-\infty, \infty)$.

**Reflection:** This was straightforward because linear functions with a positive slope always increase, and those with a negative slope always decrease. The algebraic manipulation directly reflected this.

---

### Example 2: Quadratic Function (Medium)

**Problem:** Determine the intervals where the function $f(x) = x^2 - 4x + 3$ is increasing or decreasing.

**What's Given:** The function $f(x) = x^2 - 4x + 3$.
**What We Want:** The intervals of $x$ where $f(x)$ is increasing or decreasing.

**Step-by-Step Solution:**

1.  **Understand the function:** This is a quadratic function, whose graph is a parabola. Since the coefficient of $x^2$ is positive ($1 > 0$), the parabola opens upwards. This means it will decrease to a minimum point (the vertex) and then increase.

2.  **Find the vertex (turning point):** The $x$-coordinate of the vertex of a parabola $ax^2 + bx + c$ is given by $x = -\frac{b}{2a}$.
    For $f(x) = x^2 - 4x + 3$, we have $a=1$ and $b=-4$.
    $x_{\text{vertex}} = -\frac{-4}{2(1)} = \frac{4}{2} = 2$.
    *   *Explanation:* The vertex is where the function changes from decreasing to increasing (or vice-versa). Finding it helps us define the intervals.

3.  **Identify potential intervals:** The vertex is at $x=2$. So, we should check the interval to the left of $x=2$ (i.e., $(-\infty, 2)$) and the interval to the right of $x=2$ (i.e., $(2, \infty)$).

4.  **Test the interval $(-\infty, 2)$ (algebraically):**
    Let $x_1, x_2$ be any two numbers such that $x_1 < x_2 < 2$.
    We want to compare $f(x_1)$ and $f(x_2)$.
    $f(x_2) - f(x_1) = (x_2^2 - 4x_2 + 3) - (x_1^2 - 4x_1 + 3)$
    $= x_2^2 - x_1^2 - 4x_2 + 4x_1$
    $= (x_2 - x_1)(x_2 + x_1) - 4(x_2 - x_1)$
    $= (x_2 - x_1)(x_2 + x_1 - 4)$
    *   *Explanation:* We're looking at the difference $f(x_2) - f(x_1)$. If this difference is positive, $f(x_2) > f(x_1)$, meaning increasing. If negative, $f(x_2) < f(x_1)$, meaning decreasing. Factoring helps us analyze the signs.

    Now, let's analyze the signs of the factors:
    *   Since $x_1 < x_2$, we know $(x_2 - x_1)$ is positive.
    *   Since $x_1 < x_2 < 2$, both $x_1$ and $x_2$ are less than $2$.
        So, $x_1 + x_2 < 2 + 2 = 4$.
        This means $x_1 + x_2 - 4$ is negative.
    *   Therefore, $(x_2 - x_1)(x_2 + x_1 - 4) = (\text{positive})(\text{negative}) = \text{negative}$.
    So, $f(x_2) - f(x_1) < 0$, which implies $f(x_2) < f(x_1)$.
    Since $x_1 < x_2$ implies $f(x_1) > f(x_2)$, the function is strictly decreasing on $(-\infty, 2)$.
    *   *Explanation:* By analyzing the signs of the factors, we determined the sign of the difference, which tells us whether $f(x_2)$ is greater or less than $f(x_1)$.

5.  **Test the interval $(2, \infty)$ (algebraically):**
    Let $x_1, x_2$ be any two numbers such that $2 < x_1 < x_2$.
    From step 4, we know $f(x_2) - f(x_1) = (x_2 - x_1)(x_2 + x_1 - 4)$.
    *   Since $x_1 < x_2$, we know $(x_2 - x_1)$ is positive.
    *   Since $2 < x_1 < x_2$, both $x_1$ and $x_2$ are greater than $2$.
        So, $x_1 + x_2 > 2 + 2 = 4$.
        This means $x_1 + x_2 - 4$ is positive.
    *   Therefore, $(x_2 - x_1)(x_2 + x_1 - 4) = (\text{positive})(\text{positive}) = \text{positive}$.
    So, $f(x_2) - f(x_1) > 0$, which implies $f(x_2) > f(x_1)$.
    Since $x_1 < x_2$ implies $f(x_1) < f(x_2)$, the function is strictly increasing on $(2, \infty)$.
    *   *Explanation:* Same logic as step 4, but with different $x$ values, leading to a different sign for the second factor.

**Final Answer:**
The function $f(x) = x^2 - 4x + 3$ is **strictly decreasing** on the interval $(-\infty, 2)$ and **strictly increasing** on the interval $(2, \infty)$.

**Reflection:** For quadratic functions, finding the vertex is key. The algebraic test, while detailed, rigorously proves the behavior in each interval. Graphing this parabola would visually confirm these results.

---

### Example 3: Absolute Value Function (Medium-Hard)

**Problem:** Determine the intervals where the function $f(x) = |x|$ is increasing or decreasing.

**What's Given:** The function $f(x) = |x|$.
**What We Want:** The intervals of $x$ where $f(x)$ is increasing or decreasing.

**Step-by-Step Solution:**

1.  **Understand the function:** The absolute value function is defined piecewise:
    $$f(x) = \begin{cases} x & \text{if } x \ge 0 \\ -x & \text{if } x < 0 \end{cases}$$
    Its graph forms a 'V' shape with its vertex at the origin $(0,0)$. This suggests a change in behavior at $x=0$.

2.  **Consider the interval $x < 0$ (left side of the vertex):**
    In this interval, $f(x) = -x$.
    Let $x_1, x_2$ be any two numbers such that $x_1 < x_2 < 0$.
    We want to compare $f(x_1)$ and $f(x_2)$.
    $f(x_1) = -x_1$
    $f(x_2) = -x_2$
    Since $x_1 < x_2$, if we multiply both sides by $-1$, we must reverse the inequality sign:
    $-x_1 > -x_2$
    So, $f(x_1) > f(x_2)$.
    *   *Explanation:* When multiplying an inequality by a negative number, the inequality sign flips. This is a crucial rule.

    Since $x_1 < x_2$ implies $f(x_1) > f(x_2)$, the function is strictly decreasing on $(-\infty, 0)$.

3.  **Consider the interval $x > 0$ (right side of the vertex):**
    In this interval, $f(x) = x$.
    Let $x_1, x_2$ be any two numbers such that $0 < x_1 < x_2$.
    We want to compare $f(x_1)$ and $f(x_2)$.
    $f(x_1) = x_1$
    $f(x_2) = x_2$
    Since $x_1 < x_2$, it directly follows that $f(x_1) < f(x_2)$.
    *   *Explanation:* The outputs are simply the inputs, so the comparison is straightforward.

    Since $x_1 < x_2$ implies $f(x_1) < f(x_2)$, the function is strictly increasing on $(0, \infty)$.

4.  **Consider the point $x=0$:** At $x=0$, the function reaches its minimum. It is neither increasing nor decreasing *at* a single point. So, we use open intervals.

**Final Answer:**
The function $f(x) = |x|$ is **strictly decreasing** on the interval $(-\infty, 0)$ and **strictly increasing** on the interval $(0, \infty)$.

**Reflection:** Piecewise definitions are common, and the key is to analyze each piece separately. The absolute value function is a classic example of a function that changes its monotonic behavior at a specific point.

---

### Example 4: Piecewise Function (Harder)

**Problem:** Determine the intervals where the function $f(x)$ is increasing, decreasing, or constant.
$$f(x) = \begin{cases} x+2 & \text{if } x < -1 \\ 1 & \text{if } -1 \le x \le 2 \\ -x+3 & \text{if } x > 2 \end{cases}$$

**What's Given:** A piecewise-defined function.
**What We Want:** The intervals of $x$ where $f(x)$ is increasing, decreasing, or constant.

**Step-by-Step Solution:**

1.  **Understand the function:** This function is defined by three different rules over three different intervals. We will analyze each piece separately.

2.  **Analyze the first piece: $f(x) = x+2$ for $x < -1$.**
    This is a linear function with a slope of $1$ (positive).
    Let $x_1, x_2$ be any two numbers such that $x_1 < x_2 < -1$.
    $f(x_1) = x_1 + 2$
    $f(x_2) = x_2 + 2$
    Since $x_1 < x_2$, adding $2$ to both sides preserves the inequality: $x_1 + 2 < x_2 + 2$.
    So, $f(x_1) < f(x_2)$.
    This piece is **strictly increasing** on the interval $(-\infty, -1)$.
    *   *Explanation:* Similar to Example 1, a positive slope indicates increasing behavior.

3.  **Analyze the second piece: $f(x) = 1$ for $-1 \le x \le 2$.**
    This is a constant function. For any $x_1, x_2$ in this interval, $f(x_1) = 1$ and $f(x_2) = 1$.
    So, $f(x_1) = f(x_2)$.
    This piece is **constant** on the interval $[-1, 2]$.
    *   *Explanation:* The definition of a constant function directly applies here. For constant intervals, we typically include endpoints if the function is truly constant at those points.

4.  **Analyze the third piece: $f(x) = -x+3$ for $x > 2$.**
    This is a linear function with a slope of $-1$ (negative).
    Let $x_1, x_2$ be any two numbers such that $2 < x_1 < x_2$.
    $f(x_1) = -x_1 + 3$
    $f(x_2) = -x_2 + 3$
    Since $x_1 < x_2$, multiplying by $-1$ reverses the inequality: $-x_1 > -x_2$.
    Adding $3$ to both sides preserves the inequality: $-x_1 + 3 > -x_2 + 3$.
    So, $f(x_1) > f(x_2)$.
    This piece is **strictly decreasing** on the interval $(2, \infty)$.
    *   *Explanation:* A negative slope indicates decreasing behavior.

5.  **Check behavior at the transition points ($x=-1$ and $x=2$):**
    *   At $x=-1$:
        From the left ($x<-1$), $f(x)$ is increasing, approaching $f(-1) = (-1)+2 = 1$.
        From the right ($-1 \le x \le 2$), $f(x)$ is constant at $1$.
        Since the function values connect smoothly and the function transitions from increasing to constant (or constant to increasing), we can say it is non-decreasing across $x=-1$. For strict definitions, we use open intervals around turning points.
    *   At $x=2$:
        From the left ($-1 \le x \le 2$), $f(x)$ is constant at $1$.
        From the right ($x>2$), $f(x)$ is decreasing, starting from $f(2) = -2+3 = 1$.
        Again, the function values connect smoothly and it transitions from constant to decreasing (or decreasing to constant).

**Final Answer:**
The function $f(x)$ is:
*   **Strictly increasing** on the interval $(-\infty, -1)$.
*   **Constant** on the interval $[-1, 2]$.
*   **Strictly decreasing** on the interval $(2, \infty)$.

**Reflection:** Piecewise functions require careful analysis of each segment and how they connect at the transition points. The use of open vs. closed intervals for the constant segment is a subtle point. For "strictly increasing/decreasing," endpoints are generally excluded. For "constant," endpoints are typically included if the function is indeed constant at those points.

## 6. Common mistakes and traps

1.  **Confusing $x$ and $y$ directions:** Students sometimes look at the graph and think "as $y$ goes up, $x$ goes up," which is backwards. Always remember: we observe $y$ (output) as $x$ (input) steadily increases (moves from left to right).
2.  **Looking from right to left:** Always imagine walking along the graph from left to right. This ensures you're observing $y$ as $x$ increases.
3.  **Assuming monotonicity for the entire domain:** Many functions are not always increasing or always decreasing. They can change behavior. Always identify specific intervals.
4.  **Incorrectly identifying turning points:** For non-linear functions, the points where the function changes from increasing to decreasing (or vice versa) are critical. Missing these or miscalculating them will lead to incorrect intervals.
5.  **Improper interval notation:** For strictly increasing or decreasing intervals, use open intervals (parentheses, e.g., $(a, b)$). At the exact turning point, the function is momentarily flat and thus neither strictly increasing nor strictly decreasing. For constant intervals, closed intervals (brackets, e.g., $[a, b]$) are often used if the function is constant at the endpoints.
6.  **Misinterpreting "constant" vs. "neither increasing nor decreasing":** A constant function *is* a specific type of behavior. It's not merely "neither increasing nor decreasing." It means the output value is fixed.

## 7. Textbook-precise explanation

Let $f$ be a function defined on an interval $I$.

1.  **Strictly Increasing Function:**
    The function $f$ is **strictly increasing** on $I$ if for any two numbers $x_1$ and $x_2$ in $I$,
    $$x_1 < x_2 \quad \implies \quad f(x_1) < f(x_2)$$
    This means that as the input values increase, their corresponding output values strictly increase. The graph of a strictly increasing function always rises as you move from left to right.

2.  **Strictly Decreasing Function:**
    The function $f$ is **strictly decreasing** on $I$ if for any two numbers $x_1$ and $x_2$ in $I$,
    $$x_1 < x_2 \quad \implies \quad f(x_1) > f(x_2)$$
    This means that as the input values increase, their corresponding output values strictly decrease. The graph of a strictly decreasing function always falls as you move from left to right.

3.  **Increasing (Non-decreasing) Function:**
    The function $f$ is **increasing** (or non-decreasing) on $I$ if for any two numbers $x_1$ and $x_2$ in $I$,
    $$x_1 < x_2 \quad \implies \quad f(x_1) \le f(x_2)$$
    This definition allows for intervals where the function might be constant (flat) without strictly decreasing. The graph never falls as you move from left to right.

4.  **Decreasing (Non-increasing) Function:**
    The function $f$ is **decreasing** (or non-increasing) on $I$ if for any two numbers $x_1$ and $x_2$ in $I$,
    $$x_1 < x_2 \quad \implies \quad f(x_1) \ge f(x_2)$$
    This definition allows for intervals where the function might be constant (flat) without strictly increasing. The graph never rises as you move from left to right.

5.  **Constant Function:**
    The function $f$ is **constant** on $I$ if for any two numbers $x_1$ and $x_2$ in $I$,
    $$f(x_1) = f(x_2)$$
    This implies that the output value remains the same for all inputs in the interval. The graph of a constant function is a horizontal line segment.

A function that is either increasing or decreasing on an interval is said to be **monotonic** on that interval. If it is strictly increasing or strictly decreasing, it is **strictly monotonic**.

*Reference: Stewart, Calculus, Early Transcendentals, 9th ed., §1.3, Definition 4.*

## 8. ASCII diagrams

Let's visualize a function that exhibits all three behaviors: increasing, constant, and decreasing.

Imagine a graph of a function $f(x)$ that starts at a low $y$-value, then rises, then flattens out, and finally falls to a lower $y$-value.

```text
       ^ y
       |
       |             . . . . . . . . . . . . .
       |            .                      \
       |           .                        \
       |          .                          \
       |         .                            \
       |        .                              D
       |       /C---------------------------------
       |      /                                  \
       |     B                                    \
       |    /                                      E
-------A---------------------------------------------> x
       |
       |
```

**Description of the Figure:**

*   **Segment A to B:** As $x$ increases from point A to point B, the $y$-value of the function is clearly rising. This segment represents an **increasing** interval.
*   **Segment B to C:** As $x$ increases from point B to point C, the $y$-value of the function continues to rise. This is also an **increasing** interval. The point B itself is a smooth transition.
*   **Segment C to D:** As $x$ increases from point C to point D, the $y$-value of the function stays exactly the same. The graph is flat. This segment represents a **constant** interval.
*   **Segment D to E:** As $x$ increases from point D to point E, the $y$-value of the function is falling. This segment represents a **decreasing** interval.

In this diagram:
*   The function is increasing on the interval $(x_A, x_C)$.
*   The function is constant on the interval $(x_C, x_D)$.
*   The function is decreasing on the interval $(x_D, x_E)$.

(Note: $x_A, x_B, x_C, x_D, x_E$ represent the respective $x$-coordinates of points A, B, C, D, E).

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    "**Read a graph like a book: Left to Right.**
    If you're going **Uphill** (like climbing a mountain), the function is **Increasing**.
    If you're going **Downhill** (like skiing), the function is **Decreasing**.
    If you're on **Flat Ground** (like walking on a sidewalk), the function is **Constant**."
    Always picture a little person walking along the graph from left to right. Their height is the $y$-value.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **Increasing:** For $x_1 < x_2$, we have $f(x_1) < f(x_2)$. (Inputs go up, outputs go up.)
    *   **Decreasing:** For $x_1 < x_2$, we have $f(x_1) > f(x_2)$. (Inputs go up, outputs go down.)
    *   **Intervals:** Always specify the intervals of $x$ where the behavior occurs, typically using open intervals for strictly increasing/decreasing.

3.  **Spaced-Repetition Schedule:**
    *   **Review 1:** In 1 day (tomorrow).
    *   **Review 2:** In 3 days.
    *   **Review 3:** In 7 days.
    *   **Review 4:** In 16 days.
    *   **Review 5:** In 35 days.
    Actively recall the definitions and try to apply them to a new, simple function each time.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the precise definitions, go back to the most fundamental idea:
    *   "What does it mean for something to 'increase'?" It means it gets bigger.
    *   "What are we observing getting bigger or smaller?" The *output* ($f(x)$ or $y$).
    *   "What causes the output to change?" The *input* ($x$).
    *   "How do we measure change in the input?" By picking two inputs, $x_1$ and $x_2$, where one is clearly larger than the other (conventionally, $x_1 < x_2$).
    *   Now, combine these: If $x_1 < x_2$ and $f(x_1)$ is *also* less than $f(x_2)$, then $f(x)$ is increasing. If $x_1 < x_2$ but $f(x_1)$ is *greater* than $f(x_2)$, then $f(x)$ is decreasing. This thought process will always lead you back to the core definitions.

## 10. Connections — what this leads to

Understanding increasing and decreasing functions is a cornerstone concept that unlocks many advanced topics in mathematics:

1.  **Calculus (Derivatives):** This is the most direct and profound connection. In calculus, the first derivative of a function ($f'(x)$) tells you about its slope. If $f'(x) > 0$, the function is increasing. If $f'(x) < 0$, it's decreasing. If $f'(x) = 0$, it's constant or at a turning point. This provides a powerful analytical tool to determine these intervals without relying solely on graphs or algebraic comparisons.
2.  **Optimization:** Finding maximum and minimum values of functions (local extrema) heavily relies on identifying where a function changes from increasing to decreasing (local maximum) or decreasing to increasing (local minimum). This has vast applications in engineering, economics, and science.
3.  **Curve Sketching:** Knowing where a function increases or decreases is crucial for accurately sketching its graph, along with other features like concavity and intercepts.
4.  **Monotonicity and Invertibility:** Functions that are strictly increasing or strictly decreasing over their entire domain are called **monotonic functions**. A key property of monotonic functions is that they are always one-to-one, which means they have an inverse function.
5.  **Differential Equations:** Analyzing the behavior of solutions to differential equations often involves determining whether quantities are increasing or decreasing over time, which relates to the stability of systems.
6.  **Real Analysis:** In higher mathematics, the rigorous definitions of increasing and decreasing functions (and the distinction between strictly increasing and non-decreasing) become critical for proving theorems about continuity, differentiability, and integrability.

## 11. Self-check questions

1.  For the function $f(x) = -4x + 7$, determine the intervals where it is increasing or decreasing.
2.  Consider the function $g(x) = x^2 + 6x - 5$. Identify the intervals where $g(x)$ is strictly increasing and strictly decreasing.
3.  Analyze the function $h(x) = \sqrt{x}$. On what interval(s) is $h(x)$ increasing, decreasing, or constant? (Remember its domain).
4.  Determine the intervals of increasing, decreasing, or constant behavior for the function $k(x) = \frac{1}{x}$. (Be careful around $x=0$).
5.  Given the piecewise function:
    $$m(x) = \begin{cases} x^2 & \text{if } x < 1 \\ x+1 & \text{if } x \ge 1 \end{cases}$$
    Find all intervals where $m(x)$ is strictly increasing, strictly decreasing, or constant.