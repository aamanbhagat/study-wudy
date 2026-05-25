## 1. What it is — in plain English

Imagine you're walking down a narrow hallway. On your left is a very tall friend, and on your right is another very tall friend. Both of your friends are walking towards the same door at the end of the hallway. You're stuck right in the middle, between them.

As your two friends get closer and closer to that single door, what happens to you? You have no choice but to be pushed along with them, right into the same door. You can't go anywhere else because they're "squeezing" you towards that one spot.

In mathematics, the "Squeeze Theorem" (sometimes called the "Sandwich Theorem" or "Pinching Theorem") works just like this for sequences of numbers. A sequence is just an ordered list of numbers, like $1, 2, 3, \dots$ or $1, 1/2, 1/3, \dots$.

If we have three sequences, say Sequence A, Sequence B, and Sequence C, and Sequence B is always "sandwiched" between Sequence A and Sequence C (meaning $A \le B \le C$), then if both Sequence A and Sequence C head towards the *exact same* number, Sequence B has absolutely no choice but to head towards that same number too. It gets "squeezed" to that limit.

## 2. Why it matters — real-world applications

The Squeeze Theorem is a fundamental tool in mathematics, particularly in analysis, because it allows us to determine the limit of a sequence that might be difficult to analyze directly by comparing it to two other sequences whose limits are easier to find.

1.  **Engineering and Physics — Bounding Errors in Simulations:** When engineers or physicists run complex simulations (e.g., modeling fluid flow around an airplane wing, predicting planetary orbits, or simulating quantum particles), they often can't find exact analytical solutions. Instead, they use numerical methods that generate sequences of approximations. The Squeeze Theorem can be used to prove that these sequences of approximations actually converge to the true value, by showing that the error terms (or the approximations themselves) are bounded between two simpler sequences that converge to zero (or the true value). For example, proving the stability of a numerical scheme for solving differential equations.

2.  **Computer Science and Machine Learning — Analyzing Algorithm Efficiency:** In computer science, especially in algorithm analysis, we often want to understand how quickly an algorithm runs as the input size grows (its "time complexity"). Sometimes, the exact number of operations for an algorithm is very complex to calculate. However, we can often find a lower bound and an upper bound for the number of operations. If both these bounds converge to the same complexity class (e.g., $O(n \log n)$), the Squeeze Theorem can formally prove the algorithm's complexity. For instance, analyzing the average-case performance of quicksort or the convergence rate of an iterative machine learning optimization algorithm.

3.  **Signal Processing — Noise Reduction and Convergence:** In signal processing, a noisy signal might be represented by a sequence of data points. If we can model the noise such that the true signal is always bounded by two "cleaner" signals (or the noisy signal is bounded between the true signal plus/minus a diminishing error), and these cleaner signals converge to a specific value or function, the Squeeze Theorem helps prove that the original noisy signal also converges to that value or function, effectively showing that the noise diminishes over time or iterations.

4.  **Numerical Analysis — Approximating Constants and Integrals:** Many fundamental mathematical constants (like $\pi$ or $e$) or definite integrals are defined as limits of sequences. For example, the value of $\pi$ can be approximated by sequences of perimeters of inscribed and circumscribed polygons to a circle. As the number of sides increases, the perimeters of both sequences "squeeze" towards the circumference of the circle (which is $2\pi r$). The Squeeze Theorem provides the rigorous proof that these approximations indeed converge to the true value.

## 3. Prerequisites — what you must know first

Before diving deep into the Squeeze Theorem for sequences, ensure you have a solid grasp of the following foundational concepts:

*   **Sequences:** An understanding of what a sequence is (an ordered list of numbers, often denoted $a_n$), how to write its terms, and common notations like $\{a_n\}_{n=1}^\infty$.
*   **Limits of Sequences:**
    *   **Intuitive Understanding:** What it means for a sequence to "approach" or "converge to" a specific number $L$ as $n$ goes to infinity.
    *   **Formal Definition ($\epsilon-N$ Definition):** The rigorous definition that for every $\epsilon > 0$, there exists an integer $N$ such that if $n > N$, then $|a_n - L| < \epsilon$. This is crucial for understanding the proof of the Squeeze Theorem.
*   **Properties of Limits:** How limits behave with algebraic operations (sum, difference, product, quotient, constant multiple rules). For example, $\lim_{n \to \infty} (a_n + b_n) = \lim_{n \to \infty} a_n + \lim_{n \to \infty} b_n$.
*   **Inequalities:**
    *   Basic rules for manipulating inequalities (adding/subtracting values, multiplying/dividing by positive/negative values).
    *   Transitivity: If $a \le b$ and $b \le c$, then $a \le c$.
    *   Understanding statements like "$a_n \le b_n \le c_n$ for all $n > N$."
*   **Absolute Value:** Definition ($|x| = x$ if $x \ge 0$, $|x| = -x$ if $x < 0$) and properties (e.g., $|x| < k \iff -k < x < k$).
*   **Basic Functions:** Familiarity with the behavior of common functions (polynomials, exponentials, logarithms, trigonometric functions) as their input approaches infinity. Specifically, knowing the bounds of sine and cosine functions (e.g., $-1 \le \sin(x) \le 1$).

## 4. The core idea — step by step

The Squeeze Theorem for sequences is built upon a simple, intuitive idea that we can formalize. Let's break it down into steps.

### Step 1: The Setup (The Three Sequences)

**Plain English:** To use the Squeeze Theorem, you always need three sequences. Think of them as three separate lists of numbers. We'll call them the "lower bound sequence," the "middle sequence," and the "upper bound sequence."

**Small Concrete Example:**
Let's consider these three sequences:
$a_n = 1 - \frac{1}{n}$
$b_n = 1 + \frac{(-1)^n}{n^2}$
$c_n = 1 + \frac{1}{n}$

Let's write out the first few terms for $n=1, 2, 3, \dots$:
$a_n: 0, 0.5, 0.66\dots, 0.75, 0.8, \dots$
$b_n: 0, 1.25, 0.88\dots, 1.0625, 0.96, \dots$
$c_n: 2, 1.5, 1.33\dots, 1.25, 1.2, \dots$

**Formal/Mathematical Version:**
Let $\{a_n\}$, $\{b_n\}$, and $\{c_n\}$ be three sequences of real numbers.

**What could go wrong:** You might try to apply the theorem with only two sequences, or you might not be able to construct suitable bounding sequences. The theorem explicitly requires three.

### Step 2: The Bounding Condition

**Plain English:** The crucial part is that the "middle sequence" must always be "sandwiched" between the "lower bound sequence" and the "upper bound sequence" for all terms *after some point*. It doesn't have to hold for the very first terms, but it must hold eventually.

**Small Concrete Example:**
Let's use the sequences from Step 1:
$a_n = 1 - \frac{1}{n}$
$b_n = 1 + \frac{(-1)^n}{n^2}$
$c_n = 1 + \frac{1}{n}$

We need to check if $a_n \le b_n \le c_n$ for $n$ large enough.
Is $1 - \frac{1}{n} \le 1 + \frac{(-1)^n}{n^2}$?
And is $1 + \frac{(-1)^n}{n^2} \le 1 + \frac{1}{n}$?

Let's simplify the inequalities:
1.  $-\frac{1}{n} \le \frac{(-1)^n}{n^2}$
    If $n$ is even, $\frac{(-1)^n}{n^2} = \frac{1}{n^2}$. So $-\frac{1}{n} \le \frac{1}{n^2}$. This is true for $n \ge 1$ since $-1/n$ is negative and $1/n^2$ is positive.
    If $n$ is odd, $\frac{(-1)^n}{n^2} = -\frac{1}{n^2}$. So $-\frac{1}{n} \le -\frac{1}{n^2}$. This is true for $n \ge 1$ because $1/n \ge 1/n^2$ (e.g., $1/2 \ge 1/4$). Multiplying by $-1$ reverses the inequality: $-1/n \le -1/n^2$.
    So the left inequality $a_n \le b_n$ holds for all $n \ge 1$.

2.  $\frac{(-1)^n}{n^2} \le \frac{1}{n}$
    If $n$ is even, $\frac{1}{n^2} \le \frac{1}{n}$. This is true for $n \ge 1$.
    If $n$ is odd, $-\frac{1}{n^2} \le \frac{1}{n}$. This is true for all $n \ge 1$ since the left side is negative and the right side is positive.
    So the right inequality $b_n \le c_n$ holds for all $n \ge 1$.

In this example, the condition $a_n \le b_n \le c_n$ holds for all $n \ge 1$.

**Formal/Mathematical Version:**
There exists some integer $N$ (it could be $N=1$, or $N=100$, or any other integer) such that for all $n > N$, the inequality $a_n \le b_n \le c_n$ holds.

**What could go wrong:** The inequality might not hold for sufficiently large $n$. For example, if $a_n$ and $c_n$ cross each other infinitely often, or if $b_n$ occasionally jumps outside the bounds.

### Step 3: The Convergence of the Outer Sequences

**Plain English:** The two "outer" sequences (the lower bound and the upper bound) must both converge to the *exact same* limit. If they go to different places, or if one doesn't go anywhere, the theorem won't work.

**Small Concrete Example:**
Using our sequences:
$a_n = 1 - \frac{1}{n}$
$c_n = 1 + \frac{1}{n}$

Let's find their limits as $n \to \infty$:
$\lim_{n \to \infty} a_n = \lim_{n \to \infty} \left(1 - \frac{1}{n}\right) = \lim_{n \to \infty} 1 - \lim_{n \to \infty} \frac{1}{n} = 1 - 0 = 1$.
$\lim_{n \to \infty} c_n = \lim_{n \to \infty} \left(1 + \frac{1}{n}\right) = \lim_{n \to \infty} 1 + \lim_{n \to \infty} \frac{1}{n} = 1 + 0 = 1$.

Both outer sequences converge to $L=1$.

**Formal/Mathematical Version:**
We must have $\lim_{n \to \infty} a_n = L$ and $\lim_{n \to \infty} c_n = L$ for some real number $L$.

**What could go wrong:** If $\lim a_n = L_1$ and $\lim c_n = L_2$ where $L_1 \ne L_2$, the theorem does not apply. If either $a_n$ or $c_n$ diverges (e.g., goes to $\infty$ or oscillates), the theorem also does not apply.

### Step 4: The Conclusion

**Plain English:** If all the previous conditions are met – you have three sequences, the middle one is always between the outer two (eventually), and the outer two both head towards the same number – then the "middle sequence" has no choice but to also head towards that same number. It's trapped!

**Small Concrete Example:**
Since we established that for $n \ge 1$:
$1 - \frac{1}{n} \le 1 + \frac{(-1)^n}{n^2} \le 1 + \frac{1}{n}$
And we found that:
$\lim_{n \to \infty} \left(1 - \frac{1}{n}\right) = 1$
$\lim_{n \to \infty} \left(1 + \frac{1}{n}\right) = 1$

Therefore, by the Squeeze Theorem, the middle sequence must also converge to 1:
$\lim_{n \to \infty} \left(1 + \frac{(-1)^n}{n^2}\right) = 1$.

**Formal/Mathematical Version:**
Then it must be true that $\lim_{n \to \infty} b_n = L$.

**What could go wrong:** Applying the conclusion without rigorously checking all the premises (Steps 1, 2, and 3). This is the most common mistake!

## 5. Worked examples — multiple, with every step shown

### Example 1: Easy — A classic trigonometric limit

**Problem:** Find the limit of the sequence $b_n = \left\{ \frac{\sin(n)}{n} \right\}_{n=1}^\infty$.

**What's given:** The sequence $b_n = \frac{\sin(n)}{n}$.
**What we want:** $\lim_{n \to \infty} \frac{\sin(n)}{n}$.

**Step-by-step solution:**

1.  **Identify the problematic part:** The term $\sin(n)$ is tricky because it oscillates between -1 and 1. As $n \to \infty$, $\sin(n)$ does not approach a single value. However, the denominator $n$ goes to infinity. This suggests the Squeeze Theorem might be useful.

2.  **Establish bounds for the problematic part:** We know a fundamental property of the sine function:
    $$-1 \le \sin(n) \le 1 \quad \text{for all integers } n.$$
    *Explanation:* The sine function's output always lies between -1 and 1, inclusive.

3.  **Construct the bounding sequences:** We want to build an inequality that "squeezes" our sequence $b_n = \frac{\sin(n)}{n}$. Since $n$ is always a positive integer for our sequence ($n \ge 1$), we can divide all parts of the inequality by $n$ without changing the direction of the inequalities.
    $$\frac{-1}{n} \le \frac{\sin(n)}{n} \le \frac{1}{n}$$
    *Explanation:* Dividing by a positive number preserves the direction of the inequality signs. Here, $n$ is always positive.

4.  **Identify the three sequences:**
    Let $a_n = \frac{-1}{n}$.
    Let $b_n = \frac{\sin(n)}{n}$.
    Let $c_n = \frac{1}{n}$.
    We have successfully established that $a_n \le b_n \le c_n$ for all $n \ge 1$.

5.  **Find the limits of the outer sequences:** Now, we evaluate the limits of $a_n$ and $c_n$ as $n \to \infty$.
    $$\lim_{n \to \infty} a_n = \lim_{n \to \infty} \frac{-1}{n}$$
    $$ = -1 \cdot \lim_{n \to \infty} \frac{1}{n}$$
    $$ = -1 \cdot 0 = 0$$
    *Explanation:* As $n$ gets infinitely large, $1/n$ gets infinitely close to zero. A constant times zero is zero.

    $$\lim_{n \to \infty} c_n = \lim_{n \to \infty} \frac{1}{n}$$
    $$ = 0$$
    *Explanation:* Similarly, as $n$ gets infinitely large, $1/n$ approaches zero.

6.  **Apply the Squeeze Theorem:** Since $a_n \le b_n \le c_n$ for all $n \ge 1$, and $\lim_{n \to \infty} a_n = 0$ and $\lim_{n \to \infty} c_n = 0$, by the Squeeze Theorem, the limit of the middle sequence $b_n$ must also be 0.
    $$\lim_{n \to \infty} \frac{\sin(n)}{n} = 0$$

**Final Answer:** $\boxed{0}$

**Reflection:** This example is straightforward because the bounds for $\sin(n)$ are well-known, and dividing by $n$ creates simple sequences whose limits are obvious. The key is recognizing that even though $\sin(n)$ oscillates, its effect is diminished by the growing denominator.

### Example 2: Medium — Using squared trigonometric functions

**Problem:** Find the limit of the sequence $b_n = \left\{ \frac{\cos^2(n)}{n+1} \right\}_{n=1}^\infty$.

**What's given:** The sequence $b_n = \frac{\cos^2(n)}{n+1}$.
**What we want:** $\lim_{n \to \infty} \frac{\cos^2(n)}{n+1}$.

**Step-by-step solution:**

1.  **Identify the problematic part:** Similar to $\sin(n)$, $\cos(n)$ oscillates. Squaring it, $\cos^2(n)$, still oscillates, but its range changes. The denominator $n+1$ goes to infinity.

2.  **Establish bounds for the problematic part:** We know that for any real number $x$:
    $$-1 \le \cos(x) \le 1$$
    If we square all parts of this inequality, we need to be careful. Since squaring a number makes it non-negative, the lower bound becomes 0. The maximum value remains $1^2 = 1$.
    $$0 \le \cos^2(n) \le 1 \quad \text{for all integers } n.$$
    *Explanation:* The square of any real number is non-negative. The minimum value of $\cos^2(n)$ is $0$ (when $\cos(n)=0$), and the maximum value is $1$ (when $\cos(n)=\pm 1$).

3.  **Construct the bounding sequences:** We want to create an inequality for $\frac{\cos^2(n)}{n+1}$. Since $n \ge 1$, $n+1$ is always positive. We can divide our inequality by $n+1$.
    $$\frac{0}{n+1} \le \frac{\cos^2(n)}{n+1} \le \frac{1}{n+1}$$
    $$0 \le \frac{\cos^2(n)}{n+1} \le \frac{1}{n+1}$$
    *Explanation:* Dividing by a positive number ($n+1$) preserves the inequality directions. $\frac{0}{n+1}$ simplifies to $0$.

4.  **Identify the three sequences:**
    Let $a_n = 0$.
    Let $b_n = \frac{\cos^2(n)}{n+1}$.
    Let $c_n = \frac{1}{n+1}$.
    We have $a_n \le b_n \le c_n$ for all $n \ge 1$.

5.  **Find the limits of the outer sequences:**
    $$\lim_{n \to \infty} a_n = \lim_{n \to \infty} 0 = 0$$
    *Explanation:* The limit of a constant sequence is the constant itself.

    $$\lim_{n \to \infty} c_n = \lim_{n \to \infty} \frac{1}{n+1}$$
    $$ = 0$$
    *Explanation:* As $n$ approaches infinity, $n+1$ also approaches infinity, so $1/(n+1)$ approaches zero.

6.  **Apply the Squeeze Theorem:** Since $0 \le \frac{\cos^2(n)}{n+1} \le \frac{1}{n+1}$ for all $n \ge 1$, and both $\lim_{n \to \infty} 0 = 0$ and $\lim_{n \to \infty} \frac{1}{n+1} = 0$, by the Squeeze Theorem, the limit of the middle sequence must also be 0.
    $$\lim_{n \to \infty} \frac{\cos^2(n)}{n+1} = 0$$

**Final Answer:** $\boxed{0}$

**Reflection:** This example demonstrates handling squared trigonometric functions and a slightly more complex denominator. The principle remains the same: find the bounds for the oscillating part, then construct the full bounding sequences.

### Example 3: Medium-Hard — Factorials and Exponentials

**Problem:** Find the limit of the sequence $b_n = \left\{ \frac{2^n}{n!} \right\}_{n=1}^\infty$.

**What's given:** The sequence $b_n = \frac{2^n}{n!}$.
**What we want:** $\lim_{n \to \infty} \frac{2^n}{n!}$.

**Step-by-step solution:**

1.  **Identify the problematic part:** This involves factorials, which grow very rapidly, and exponentials. Direct calculation is difficult. We need to find a way to bound this expression.

2.  **Establish a lower bound:** Since $2^n$ is always positive and $n!$ is always positive for $n \ge 1$, their ratio must be positive.
    $$0 < \frac{2^n}{n!} \quad \text{for all } n \ge 1.$$
    *Explanation:* Both the numerator and denominator are positive for $n \ge 1$.

3.  **Construct an upper bound:** This is the tricky part. Let's write out the terms of $\frac{2^n}{n!}$ to look for a pattern:
    For $n=1: \frac{2}{1} = 2$
    For $n=2: \frac{2 \cdot 2}{1 \cdot 2} = 2$
    For $n=3: \frac{2 \cdot 2 \cdot 2}{1 \cdot 2 \cdot 3} = \frac{8}{6} = \frac{4}{3}$
    For $n=4: \frac{2 \cdot 2 \cdot 2 \cdot 2}{1 \cdot 2 \cdot 3 \cdot 4} = \frac{16}{24} = \frac{2}{3}$

    Let's rewrite the general term:
    $$\frac{2^n}{n!} = \frac{2 \cdot 2 \cdot 2 \cdots 2}{1 \cdot 2 \cdot 3 \cdots n}$$
    We can split this product into parts.
    $$\frac{2^n}{n!} = \left(\frac{2}{1}\right) \cdot \left(\frac{2}{2}\right) \cdot \left(\frac{2}{3}\right) \cdot \left(\frac{2}{4}\right) \cdots \left(\frac{2}{n}\right)$$
    Notice that for $n \ge 3$, the terms $\frac{2}{k}$ where $k \ge 3$ are less than 1.
    Specifically, for $k \ge 3$, we have $\frac{2}{k} \le \frac{2}{3}$.
    Let's fix the first few terms and bound the rest:
    $$\frac{2^n}{n!} = \frac{2}{1} \cdot \frac{2}{2} \cdot \frac{2}{3} \cdot \frac{2}{4} \cdots \frac{2}{n}$$
    For $n \ge 3$:
    $$\frac{2^n}{n!} = 2 \cdot 1 \cdot \left(\frac{2}{3}\right) \cdot \left(\frac{2}{4}\right) \cdots \left(\frac{2}{n}\right)$$
    Each term $\frac{2}{k}$ for $k \ge 3$ is less than or equal to $\frac{2}{3}$.
    So, for $n \ge 3$:
    $$\frac{2^n}{n!} \le 2 \cdot 1 \cdot \underbrace{\left(\frac{2}{3}\right) \cdot \left(\frac{2}{3}\right) \cdots \left(\frac{2}{3}\right)}_{n-2 \text{ terms}}$$
    $$\frac{2^n}{n!} \le 2 \cdot \left(\frac{2}{3}\right)^{n-2}$$
    *Explanation:* We split the product. The first two terms are $2/1=2$ and $2/2=1$. For $k \ge 3$, the terms $2/k$ are all less than or equal to $2/3$. By replacing these terms with the larger value $2/3$, we create an upper bound. There are $n-2$ such terms.

4.  **Identify the three sequences:**
    Let $a_n = 0$.
    Let $b_n = \frac{2^n}{n!}$.
    Let $c_n = 2 \left(\frac{2}{3}\right)^{n-2}$.
    We have $a_n \le b_n \le c_n$ for all $n \ge 3$. (The inequality holds for $n=1,2$ too, but it's guaranteed for $n \ge 3$ by our construction of $c_n$).

5.  **Find the limits of the outer sequences:**
    $$\lim_{n \to \infty} a_n = \lim_{n \to \infty} 0 = 0$$
    *Explanation:* The limit of a constant sequence is the constant.

    $$\lim_{n \to \infty} c_n = \lim_{n \to \infty} 2 \left(\frac{2}{3}\right)^{n-2}$$
    $$ = \lim_{n \to \infty} 2 \cdot \left(\frac{2}{3}\right)^n \cdot \left(\frac{2}{3}\right)^{-2}$$
    $$ = 2 \cdot \left(\frac{3}{2}\right)^2 \cdot \lim_{n \to \infty} \left(\frac{2}{3}\right)^n$$
    $$ = 2 \cdot \frac{9}{4} \cdot 0$$
    $$ = 0$$
    *Explanation:* This is a geometric sequence of the form $r^n$. Since the base $r = 2/3$ has $|r| < 1$, the limit of $(2/3)^n$ as $n \to \infty$ is 0. The constant factors do not change this.

6.  **Apply the Squeeze Theorem:** Since $0 \le \frac{2^n}{n!} \le 2 \left(\frac{2}{3}\right)^{n-2}$ for $n \ge 3$, and both $\lim_{n \to \infty} 0 = 0$ and $\lim_{n \to \infty} 2 \left(\frac{2}{3}\right)^{n-2} = 0$, by the Squeeze Theorem, the limit of the middle sequence must also be 0.
    $$\lim_{n \to \infty} \frac{2^n}{n!} = 0$$

**Final Answer:** $\boxed{0}$

**Reflection:** This example is harder because constructing the upper bound for the factorial term requires careful algebraic manipulation and understanding of how ratios behave. The key insight is to break down the product and bound terms strategically, leading to a geometric sequence whose limit is known. This technique is common when dealing with factorials.

### Example 4: Hard — Sum of fractions

**Problem:** Find the limit of the sequence $b_n = \left\{ \frac{1}{\sqrt{n^2+1}} + \frac{1}{\sqrt{n^2+2}} + \dots + \frac{1}{\sqrt{n^2+n}} \right\}_{n=1}^\infty$.

**What's given:** The sequence $b_n = \sum_{k=1}^n \frac{1}{\sqrt{n^2+k}}$.
**What we want:** $\lim_{n \to \infty} \sum_{k=1}^n \frac{1}{\sqrt{n^2+k}}$.

**Step-by-step solution:**

1.  **Identify the problematic part:** This is a sum of $n$ terms, where $n$ itself is going to infinity. Each term is a fraction involving $n$ and $k$. Direct summation is not feasible. This is a classic scenario for the Squeeze Theorem.

2.  **Understand the terms in the sum:** The terms in the sum are of the form $\frac{1}{\sqrt{n^2+k}}$.
    The smallest denominator occurs when $k$ is smallest, i.e., $k=1$. So $\sqrt{n^2+1}$ is the smallest denominator.
    The largest denominator occurs when $k$ is largest, i.e., $k=n$. So $\sqrt{n^2+n}$ is the largest denominator.

3.  **Construct the lower bound for the sum:** To get a lower bound for the sum, we replace each term with the *smallest possible* term in the sum. The smallest term in the sum is when the denominator is largest.
    The largest denominator is $\sqrt{n^2+n}$. So, $\frac{1}{\sqrt{n^2+n}}$ is the smallest value any single term $\frac{1}{\sqrt{n^2+k}}$ can take.
    Thus, for each $k \in \{1, \dots, n\}$:
    $$\frac{1}{\sqrt{n^2+k}} \ge \frac{1}{\sqrt{n^2+n}}$$
    Since there are $n$ terms in the sum, the lower bound for the sum is $n$ times this smallest term:
    $$b_n = \sum_{k=1}^n \frac{1}{\sqrt{n^2+k}} \ge \sum_{k=1}^n \frac{1}{\sqrt{n^2+n}}$$
    $$b_n \ge n \cdot \frac{1}{\sqrt{n^2+n}}$$
    $$b_n \ge \frac{n}{\sqrt{n^2+n}}$$
    *Explanation:* We are replacing each of the $n$ terms in the sum with the minimum possible value that any term could take. This ensures the new sum is less than or equal to the original sum.

4.  **Construct the upper bound for the sum:** To get an upper bound for the sum, we replace each term with the *largest possible* term in the sum. The largest term in the sum is when the denominator is smallest.
    The smallest denominator is $\sqrt{n^2+1}$. So, $\frac{1}{\sqrt{n^2+1}}$ is the largest value any single term $\frac{1}{\sqrt{n^2+k}}$ can take.
    Thus, for each $k \in \{1, \dots, n\}$:
    $$\frac{1}{\sqrt{n^2+k}} \le \frac{1}{\sqrt{n^2+1}}$$
    Since there are $n$ terms in the sum, the upper bound for the sum is $n$ times this largest term:
    $$b_n = \sum_{k=1}^n \frac{1}{\sqrt{n^2+k}} \le \sum_{k=1}^n \frac{1}{\sqrt{n^2+1}}$$
    $$b_n \le n \cdot \frac{1}{\sqrt{n^2+1}}$$
    $$b_n \le \frac{n}{\sqrt{n^2+1}}$$
    *Explanation:* Similarly, we replace each of the $n$ terms in the sum with the maximum possible value that any term could take. This ensures the new sum is greater than or equal to the original sum.

5.  **Identify the three sequences:**
    Let $a_n = \frac{n}{\sqrt{n^2+n}}$.
    Let $b_n = \sum_{k=1}^n \frac{1}{\sqrt{n^2+k}}$.
    Let $c_n = \frac{n}{\sqrt{n^2+1}}$.
    We have $a_n \le b_n \le c_n$ for all $n \ge 1$.

6.  **Find the limits of the outer sequences:**
    For $a_n = \frac{n}{\sqrt{n^2+n}}$:
    $$\lim_{n \to \infty} \frac{n}{\sqrt{n^2+n}} = \lim_{n \to \infty} \frac{n}{\sqrt{n^2(1+1/n)}}$$
    $$ = \lim_{n \to \infty} \frac{n}{|n|\sqrt{1+1/n}}$$
    Since $n \to \infty$, $n$ is positive, so $|n|=n$.
    $$ = \lim_{n \to \infty} \frac{n}{n\sqrt{1+1/n}}$$
    $$ = \lim_{n \to \infty} \frac{1}{\sqrt{1+1/n}}$$
    $$ = \frac{1}{\sqrt{1+0}} = \frac{1}{1} = 1$$
    *Explanation:* We divide both numerator and denominator by the highest power of $n$ in the denominator, which is $n$ (since $\sqrt{n^2}=n$). This allows us to evaluate the limit easily.

    For $c_n = \frac{n}{\sqrt{n^2+1}}$:
    $$\lim_{n \to \infty} \frac{n}{\sqrt{n^2+1}} = \lim_{n \to \infty} \frac{n}{\sqrt{n^2(1+1/n^2)}}$$
    $$ = \lim_{n \to \infty} \frac{n}{|n|\sqrt{1+1/n^2}}$$
    Since $n \to \infty$, $n$ is positive, so $|n|=n$.
    $$ = \lim_{n \to \infty} \frac{n}{n\sqrt{1+1/n^2}}$$
    $$ = \lim_{n \to \infty} \frac{1}{\sqrt{1+1/n^2}}$$
    $$ = \frac{1}{\sqrt{1+0}} = \frac{1}{1} = 1$$
    *Explanation:* Similar to $a_n$, we divide by $n$ and evaluate the limit.

7.  **Apply the Squeeze Theorem:** Since $\frac{n}{\sqrt{n^2+n}} \le \sum_{k=1}^n \frac{1}{\sqrt{n^2+k}} \le \frac{n}{\sqrt{n^2+1}}$ for all $n \ge 1$, and both $\lim_{n \to \infty} a_n = 1$ and $\lim_{n \to \infty} c_n = 1$, by the Squeeze Theorem, the limit of the middle sequence must also be 1.
    $$\lim_{n \to \infty} \left( \frac{1}{\sqrt{n^2+1}} + \frac{1}{\sqrt{n^2+2}} + \dots + \frac{1}{\sqrt{n^2+n}} \right) = 1$$

**Final Answer:** $\boxed{1}$

**Reflection:** This example is challenging because it involves a sum whose number of terms depends on $n$. The key technique is to bound the entire sum by replacing each term with its minimum possible value (for the lower bound) and its maximum possible value (for the upper bound). This transforms the sum into a product of $n$ times a single term, which then allows for straightforward limit evaluation. This method is often called "bounding by the extreme terms."

## 6. Common mistakes and traps

Students often stumble when applying the Squeeze Theorem. Here are some common pitfalls:

1.  **Incorrectly establishing the inequality $a_n \le b_n \le c_n$:**
    *   **Reason:** Not verifying that the inequality holds for *all* $n$ beyond some $N$. It's not enough for it to hold for a few terms; it must be true for the "tail" of the sequence.
    *   **Example:** Assuming $1/n < \sin(n)/n$ for all $n$, which is false (e.g., $\sin(n)$ can be negative).

2.  **Outer sequences converging to different limits:**
    *   **Reason:** Forgetting that the core premise is that the *two outer sequences must converge to the same limit*. If $\lim a_n = L_1$ and $\lim c_n = L_2$ where $L_1 \ne L_2$, the Squeeze Theorem cannot be used to determine $\lim b_n$.
    *   **Example:** If $a_n = 1 - 1/n \to 1$ and $c_n = 2 + 1/n \to 2$, and $a_n \le b_n \le c_n$, this only tells us $1 \le \lim b_n \le 2$, but not the exact limit.

3.  **Not finding suitable bounding sequences:**
    *   **Reason:** Sometimes students know the theorem but struggle to invent the $a_n$ and $c_n$ sequences. This often involves creatively using known bounds (like for $\sin(n)$ or $\cos(n)$) or inequalities (like $n! > 2^n$ for large $n$).
    *   **Example:** Trying to bound $\frac{n!}{n^n}$ without carefully analyzing the product form.

4.  **Assuming boundedness implies convergence:**
    *   **Reason:** While a convergent sequence must be bounded, a bounded sequence does not necessarily converge (e.g., $b_n = (-1)^n$ is bounded between -1 and 1 but diverges). The Squeeze Theorem requires the outer bounds to *converge to the same point*, not just exist.
    *   **Example:** If $a_n = -1 - 1/n$ and $c_n = 1 + 1/n$, and $b_n = (-1)^n$, then $a_n \le b_n \le c_n$. But $\lim a_n = -1$ and $\lim c_n = 1$. The theorem doesn't apply, and $b_n$ diverges.

5.  **Improperly manipulating inequalities (e.g., dividing by zero or negative numbers):**
    *   **Reason:** Forgetting that multiplying or dividing an inequality by a negative number reverses the inequality signs. Dividing by zero is undefined.
    *   **Example:** If you have an inequality like $X \le Y$ and you want to divide by some expression $f(n)$, you must ensure $f(n)$ is positive for all $n > N$ to maintain the inequality direction.

6.  **Applying the Squeeze Theorem to series directly:**
    *   **Reason:** Confusing sequences with series. The Squeeze Theorem, in its primary form, applies to the limits of *sequences*. While related concepts exist for series (like comparison tests), this theorem is specifically for sequences.
    *   **Example:** Incorrectly trying to apply it to $\sum_{n=1}^\infty \frac{\sin(n)}{n^2}$ instead of the sequence of partial sums.

## 7. Textbook-precise explanation

The Squeeze Theorem (also known as the Sandwich Theorem or Pinching Theorem) for sequences is formally stated as follows:

**Theorem (The Squeeze Theorem for Sequences):**

Let $\{a_n\}$, $\{b_n\}$, and $\{c_n\}$ be sequences of real numbers.
Suppose there exists some integer $N$ such that for all $n > N$, the following inequality holds:
$$a_n \le b_n \le c_n$$
If, in addition, the limits of the outer sequences exist and are equal:
$$\lim_{n \to \infty} a_n = L \quad \text{and} \quad \lim_{n \to \infty} c_n = L$$
for some real number $L$, then the limit of the middle sequence also exists and is equal to $L$:
$$\lim_{n \to \infty} b_n = L$$

**Proof (using the $\epsilon-N$ definition of a limit):**

Given that $\lim_{n \to \infty} a_n = L$ and $\lim_{n \to \infty} c_n = L$.
By the definition of a limit, for any $\epsilon > 0$:
1.  There exists an integer $N_1$ such that for all $n > N_1$, $|a_n - L| < \epsilon$. This implies $L - \epsilon < a_n < L + \epsilon$.
2.  There exists an integer $N_2$ such that for all $n > N_2$, $|c_n - L| < \epsilon$. This implies $L - \epsilon < c_n < L + \epsilon$.

We are also given that there exists an integer $N_0$ such that for all $n > N_0$, $a_n \le b_n \le c_n$.

Let $N = \max(N_0, N_1, N_2)$. Then, for all $n > N$, all three conditions hold simultaneously:
*   $L - \epsilon < a_n$ (from condition 1)
*   $a_n \le b_n \le c_n$ (from the theorem's premise)
*   $c_n < L + \epsilon$ (from condition 2)

Combining these inequalities, for all $n > N$, we have:
$$L - \epsilon < a_n \le b_n \le c_n < L + \epsilon$$
This simplifies to:
$$L - \epsilon < b_n < L + \epsilon$$
Which, by the definition of absolute value, means:
$$|b_n - L| < \epsilon$$

Since for every $\epsilon > 0$, we have found an $N$ such that for all $n > N$, $|b_n - L| < \epsilon$, this proves that $\lim_{n \to \infty} b_n = L$.

This formal statement and proof are standard in university-level calculus and real analysis textbooks.
(e.g., See Stewart, *Calculus*, 9e, §11.1; or Larson, Edwards, *Calculus*, 11e, §9.1)

## 8. ASCII diagrams

The Squeeze Theorem is highly visual. Imagine the sequence $b_n$ being trapped between $a_n$ and $c_n$ as they both converge to the same point $L$.

Here's a conceptual ASCII diagram:

```text
       ^ Value of sequence terms
       |
       |
       |     . . . . . . . . . . . . . . . . . . . . . . . . . . . . . L
       |    / \   / \   / \   / \   / \   / \   / \   / \   / \   / \  (Limit)
  c_n  |   /   \ /   \ /   \ /   \ /   \ /   \ /   \ /   \ /   \ /   \
       |  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
  b_n  | /     .     .     .     .     .     .     .     .     .     . \
       | \     .     .     .     .     .     .     .     .     .     . /
       |  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
  a_n  |   \   / \   / \   \ /   \ /   \ /   \ /   \ /   \ /   \ /   \
       |    \ /   \ /   \   / \   / \   / \   / \   / \   / \   / \   /
       +--------------------------------------------------------------------> n (Term number)
           N (Point after which the inequality holds)

Description:
- The horizontal axis represents the term number 'n' (e.g., 1, 2, 3, ...).
- The vertical axis represents the value of the sequence terms.
- The dashed horizontal line represents the limit 'L'.
- The sequence 'c_n' (upper bound) is shown as a wavy line approaching 'L' from above.
- The sequence 'a_n' (lower bound) is shown as a wavy line approaching 'L' from below.
- The sequence 'b_n' (the middle sequence) is shown as an even wavier line, always staying between 'a_n' and 'c_n'.
- As 'n' increases beyond some point 'N', 'a_n' and 'c_n' get closer and closer to 'L', effectively "squeezing" 'b_n' into converging to 'L' as well.
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic / Visual Hook:**
    *   **The Sandwich Theorem:** This is a very common alternative name. Visualize a delicious sandwich: the bread slices are $a_n$ and $c_n$, and the filling is $b_n$. If both slices of bread get really thin and converge to a single point (the limit $L$), the filling has nowhere else to go but that same point.
    *   **The Pinching Theorem:** Imagine a flexible tube (representing $b_n$) being pinched by two rigid walls ($a_n$ and $c_n$) that are closing in on a single point. The tube is forced to converge to that point.

2.  **The 1-3 Formulas/Facts You MUST Overlearn:**
    *   **The Squeeze Theorem Statement:** $a_n \le b_n \le c_n$ for $n > N$, and $\lim a_n = L, \lim c_n = L \implies \lim b_n = L$. Internalize this structure.
    *   **Trigonometric Bounds:** $-1 \le \sin(x) \le 1$ and $-1 \le \cos(x) \le 1$. These are incredibly useful for constructing bounding sequences. Also, $0 \le \sin^2(x) \le 1$ and $0 \le \cos^2(x) \le 1$.
    *   **Basic Limits:** $\lim_{n \to \infty} \frac{C}{n^p} = 0$ for any constant $C$ and $p > 0$. Also, $\lim_{n \to \infty} r^n = 0$ if $|r| < 1$. These are the common limits you'll find for your bounding sequences.

3.  **Spaced-Repetition Schedule:**
    To truly master this concept and embed it in your long-term memory, review it actively:
    *   **Day 1:** Immediately after learning. Try 2-3 new problems.
    *   **Day 3:** Review the definition, proof sketch, and 1-2 worked examples.
    *   **Day 7:** Attempt a harder problem or explain the theorem to an imaginary student.
    *   **Day 16:** Revisit the common mistakes and traps. Try to construct an example for each.
    *   **Day 35:** Work through a challenging problem from scratch, focusing on the logical steps and justification.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the precise statement or proof, you can always rebuild it from the fundamental definition of a limit ($\epsilon-N$ definition):
    *   **Start with the goal:** We want to show $\lim b_n = L$, which means for any $\epsilon > 0$, we need to find an $N$ such that $|b_n - L| < \epsilon$ for $n > N$.
    *   **Recall the premises:**
        1.  $a_n \le b_n \le c_n$ for $n > N_0$.
        2.  $\lim a_n = L \implies$ for $\epsilon > 0$, there's $N_1$ s.t. $L - \epsilon < a_n < L + \epsilon$ for $n > N_1$.
        3.  $\lim c_n = L \implies$ for $\epsilon > 0$, there's $N_2$ s.t. $L - \epsilon < c_n < L + \epsilon$ for $n > N_2$.
    *   **Combine the premises:** Choose $N = \max(N_0, N_1, N_2)$. For any $n > N$:
        *   From (2), $L - \epsilon < a_n$.
        *   From (1), $a_n \le b_n \le c_n$.
        *   From (3), $c_n < L + \epsilon$.
    *   **Form the conclusion:** Stringing these together: $L - \epsilon < a_n \le b_n \le c_n < L + \epsilon$.
    *   **Isolate $b_n$:** This implies $L - \epsilon < b_n < L + \epsilon$, which is exactly $|b_n - L| < \epsilon$.
    *   **Q.E.D.:** You've re-derived the theorem!

## 10. Connections — what this leads to

The Squeeze Theorem for sequences is more than just a tool for finding specific limits; it's a foundational concept that underpins many other important ideas in calculus and analysis.

*   **Squeeze Theorem for Functions:** This is the most direct extension. The exact same principle applies to functions as $x \to a$ or $x \to \pm \infty$. If $f(x) \le g(x) \le h(x)$ and $\lim_{x \to a} f(x) = L$ and $\lim_{x \to a} h(x) = L$, then $\lim_{x \to a} g(x) = L$. This is crucial for proving fundamental limits like $\lim_{x \to 0} \frac{\sin x}{x} = 1$.

*   **Continuity and Derivatives:** The Squeeze Theorem for functions is often used in the $\epsilon-\delta$ proofs of continuity of functions and the derivation of basic derivative rules (e.g., the derivative of $\sin x$).

*   **Series Convergence Tests:** While the Squeeze Theorem itself is for sequences, the concept of bounding is vital for understanding various series convergence tests. For instance, the Comparison Test for series relies on comparing a series to another whose convergence is known. The Squeeze Theorem for sequences can be used to show that the terms of a series go to zero (a necessary condition for convergence).

*   **Riemann Integrals:** The formal definition of a definite integral often involves sequences of Riemann sums (lower sums and upper sums). The integral is "squeezed" between these sequences. If the limit of the lower sums equals the limit of the upper sums, then the function is integrable, and the integral is that common limit. This is a direct application of the Squeeze Theorem.

*   **Properties of Limits:** The Squeeze Theorem provides a powerful method to prove other properties of limits that are difficult to prove using only algebraic limit laws, especially when oscillatory or complex terms are involved.

*   **Advanced Calculus and Real Analysis:** In higher mathematics, the Squeeze Theorem generalizes to more abstract spaces (e.g., metric spaces) and is used to prove convergence of various types of sequences and functions, particularly in the study of uniform convergence and pointwise convergence. It's a cornerstone for proving theorems about limits, continuity, and differentiability.

## 11. Self-check questions

Here are five questions of escalating difficulty to test your understanding. Do not look for answers; try to solve them yourself.

1.  **Easy:** Find the limit of the sequence $a_n = \left\{ \frac{\cos(n^2)}{n} \right\}_{n=1}^\infty$.

2.  **Easy-Medium:** Find the limit of the sequence $b_n = \left\{ \frac{5 + (-1)^n}{2n} \right\}_{n=1}^\infty$.

3.  **Medium:** Find the limit of the sequence $c_n = \left\{ \frac{n \sin(n!)}{n^2+1} \right\}_{n=1}^\infty$.

4.  **Medium-Hard:** Find the limit of the sequence $d_n = \left\{ \frac{1}{n^2+1} + \frac{1}{n^2+2} + \dots + \frac{1}{n^2+n} \right\}_{n=1}^\infty$.

5.  **Hard:** Find the limit of the sequence $e_n = \left\{ \frac{1}{n} \left( \sqrt{1+\frac{1}{n^2}} + \sqrt{1+\frac{2}{n^2}} + \dots + \sqrt{1+\frac{n}{n^2}} \right) \right\}_{n=1}^\infty$.