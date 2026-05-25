## 1. What it is — in plain English

Imagine you're watching a movie, frame by frame. Each frame is a still picture, and they come one after another in a specific order. A sequence in mathematics is a lot like that: it's an ordered list of numbers. Instead of frames, we call them "terms," and they appear one after another, usually following some kind of rule.

Think of counting: $1, 2, 3, 4, 5, ...$ That's a sequence. Or dividing a pizza: $1/2, 1/4, 1/8, 1/16, ...$ That's another sequence. The key idea is that there's a first number, a second number, a third, and so on, extending infinitely.

We're interested in how these lists of numbers behave. Do they eventually settle down and get closer and closer to a particular value? Or do they just keep growing, or bounce around without ever making up their mind? This "behavior" is what we mean by convergence, divergence, boundedness, and monotonicity.

It's like asking: "Does this movie eventually show a clear ending, or does it just keep going forever, or does it loop back and forth?" Understanding these behaviors is fundamental to many advanced mathematical concepts.

## 2. Why it matters — real-world applications

Sequences are not just abstract mathematical constructs; they are fundamental tools for modeling and understanding dynamic processes in the real world.

1.  **Iterative Algorithms (Machine Learning & Computer Science):** Many computational problems, especially in machine learning, are solved by iterative algorithms. For example, **Gradient Descent**, a core algorithm for training neural networks, involves a sequence of parameter updates. Each update ($a_n$) in the sequence brings the model's parameters closer to an optimal solution. The convergence of this sequence ensures that the algorithm eventually finds a good solution, while divergence means the training fails. Companies like **Google** and **Meta** rely on the convergence of such sequences for their AI products.
2.  **Numerical Methods & Simulations (Aerospace & Physics):** When engineers at **NASA** simulate the trajectory of a rocket or physicists model the behavior of a complex system, they often discretize continuous processes into a sequence of steps. For instance, numerically integrating a differential equation involves calculating a sequence of approximate solutions ($y_0, y_1, y_2, ...$) at discrete time points. The convergence of this sequence to the true solution is critical for the accuracy and reliability of the simulation.
3.  **Finance and Economics:** Calculating compound interest, loan payments, or the present value of future cash flows often involves sequences. For example, the value of an investment growing with compound interest forms a sequence. Understanding whether these sequences converge (e.g., the present value of an infinite stream of payments) or diverge (e.g., unbounded growth of an investment over time) is crucial for financial modeling and risk assessment by institutions like **Goldman Sachs** or **the Federal Reserve**.
4.  **Signal Processing (Telecommunications):** Digital signals (like audio or video) are essentially sequences of sampled values. When you listen to music on **Spotify** or watch a video on **Netflix**, the continuous analog signal has been converted into a discrete sequence. Analyzing the properties of these sequences (e.g., their frequency response, stability) is vital for noise reduction, data compression, and ensuring clear transmission.
5.  **Population Dynamics & Epidemiology (Biology):** Models for population growth or the spread of diseases often use sequences to represent the population size or number of infected individuals at discrete time intervals. For instance, a sequence might model the number of bacteria in a colony day by day. Biologists and epidemiologists use the convergence or divergence of these sequences to predict long-term outcomes, such as whether a population will stabilize, die out, or grow uncontrollably, which informs public health policy.

## 3. Prerequisites — what you must know first

Before diving deep into sequences, ensure you have a solid grasp of these foundational concepts:

*   **Functions:** Understanding what a function is, its domain, range, and how to evaluate $f(x)$ for a given $x$. Sequences are essentially functions whose domain is the natural numbers.
*   **Limits of Functions:** Specifically, how to evaluate $\lim_{x \to \infty} f(x)$. This is directly analogous to finding the limit of a sequence.
*   **Algebraic Manipulation:** Proficiency in simplifying expressions, solving inequalities, and working with fractions, exponents, and logarithms.
*   **Inequalities:** The ability to work with $<, >, \le, \ge$ symbols, including properties like adding/subtracting from both sides, multiplying/dividing by positive/negative numbers.
*   **Absolute Value:** Understanding $|x|$ as the distance of $x$ from zero, and properties like $|a-b| < \epsilon$ meaning the distance between $a$ and $b$ is less than $\epsilon$.
*   **Natural Numbers ($\mathbb{N}$):** The set $\{1, 2, 3, ...\}$ (sometimes including 0), which forms the domain for sequence indices.
*   **Real Numbers ($\mathbb{R}$):** The set of all rational and irrational numbers, which forms the range for sequence terms.

## 4. The core idea — step by step

Let's break down the fundamental concepts related to sequences: what they are and how we characterize their behavior.

### Step 1: What is a Sequence?

**Plain English Statement:** A sequence is simply an ordered list of numbers. Each number in the list is called a "term," and we can point to any term by its position (first, second, third, and so on). The list goes on forever.

**Small Concrete Example:**
Consider the sequence where each term is the reciprocal of its position number.
The first term is $1/1 = 1$.
The second term is $1/2$.
The third term is $1/3$.
And so on.
The list looks like: $1, \frac{1}{2}, \frac{1}{3}, \frac{1}{4}, \frac{1}{5}, ...$

**The Formal/Mathematical Version:**
A sequence is a function $f$ whose domain is the set of natural numbers $\mathbb{N} = \{1, 2, 3, ...\}$ (or sometimes $\{0, 1, 2, ...\}$) and whose range is a subset of the real numbers $\mathbb{R}$.
Instead of $f(n)$, we usually denote the $n$-th term as $a_n$. So, a sequence is written as $\{a_n\}_{n=1}^\infty$ or sometimes just $\{a_n\}$.
The general term or formula for the example above is $a_n = \frac{1}{n}$.

**What Could Go Wrong:**
A common mistake is confusing a sequence with a set. A set is a collection of elements where order doesn't matter and duplicates are ignored (e.g., $\{1, 2, 3\}$ is the same as $\{3, 1, 2\}$). A sequence is an *ordered list* where order matters, and terms can be repeated (e.g., $1, 1, 2, 2, ...$ is a valid sequence).

### Step 2: Convergence

**Plain English Statement:** A sequence *converges* if, as you go further and further down the list, the terms get arbitrarily close to a single, specific number. That number is called the *limit* of the sequence. If the terms don't settle down to a single number, the sequence *diverges*.

**Small Concrete Example:**
Let's use our example sequence: $1, \frac{1}{2}, \frac{1}{3}, \frac{1}{4}, \frac{1}{5}, ...$
As $n$ gets larger and larger, the fraction $1/n$ gets smaller and smaller.
$a_{100} = 1/100 = 0.01$
$a_{1000} = 1/1000 = 0.001$
$a_{1,000,000} = 1/1,000,000 = 0.000001$
The terms are clearly getting closer and closer to $0$. So, this sequence converges to $0$.

**The Formal/Mathematical Version:**
A sequence $\{a_n\}$ *converges* to a limit $L$, written as $\lim_{n \to \infty} a_n = L$, if for every number $\epsilon > 0$ (no matter how small), there exists a corresponding integer $N$ such that if $n > N$, then $|a_n - L| < \epsilon$.
This definition means that past a certain point $N$ in the sequence, all subsequent terms $a_n$ are within a distance of $\epsilon$ from $L$.

For our example $a_n = \frac{1}{n}$, we would say $\lim_{n \to \infty} \frac{1}{n} = 0$.

**What Could Go Wrong:**
Students often think "getting closer" means the terms must always be increasing or always decreasing. This is not true. A sequence can oscillate around its limit while still converging (e.g., $\frac{(-1)^n}{n}$ converges to 0). Also, "getting closer" doesn't mean it has to *reach* the limit; it just has to approach it arbitrarily closely.

### Step 3: Divergence

**Plain English Statement:** A sequence *diverges* if it does *not* converge to a finite limit. This can happen in a few ways: the terms might grow infinitely large, shrink infinitely small, or bounce around without settling on any single value.

**Small Concrete Example:**
1.  **Diverges to infinity:** Consider the sequence $a_n = n$. This is $1, 2, 3, 4, ...$. The terms just keep growing without bound.
2.  **Diverges to negative infinity:** Consider $a_n = -n$. This is $-1, -2, -3, -4, ...$. The terms keep shrinking without bound.
3.  **Diverges by oscillation:** Consider $a_n = (-1)^n$. This is $-1, 1, -1, 1, -1, 1, ...$. The terms jump back and forth between $-1$ and $1$ and never settle on a single value.

**The Formal/Mathematical Version:**
A sequence $\{a_n\}$ *diverges* if $\lim_{n \to \infty} a_n$ does not exist.
Specifically:
*   It *diverges to $\infty$* if for every positive number $M$, there exists an integer $N$ such that if $n > N$, then $a_n > M$. (The terms eventually exceed any chosen large number).
*   It *diverges to $-\infty$* if for every negative number $M$, there exists an integer $N$ such that if $n > N$, then $a_n < M$. (The terms eventually fall below any chosen small number).
*   It *diverges by oscillation* if it does not approach a single value, nor does it tend to $\pm \infty$.

**What Could Go Wrong:**
A common trap is assuming that if a sequence doesn't go to $\pm \infty$, it must converge. The oscillating sequence $a_n = (-1)^n$ is a clear counterexample; it stays bounded but never settles.

### Step 4: Boundedness

**Plain English Statement:** A sequence is *bounded* if all its terms stay within a certain range. There's a "ceiling" that no term goes above, and a "floor" that no term goes below. If there's only a ceiling, it's *bounded above*. If there's only a floor, it's *bounded below*.

**Small Concrete Example:**
1.  **Bounded:** The sequence $1, \frac{1}{2}, \frac{1}{3}, \frac{1}{4}, ...$ is bounded. All terms are greater than $0$ (so $0$ is a lower bound) and less than or equal to $1$ (so $1$ is an upper bound).
2.  **Bounded above, not below:** The sequence $-1, -2, -3, -4, ...$ is bounded above by $-1$ (or any number greater than or equal to $-1$), but it has no lower bound (it goes to $-\infty$).
3.  **Bounded below, not above:** The sequence $1, 2, 3, 4, ...$ is bounded below by $1$ (or any number less than or equal to $1$), but it has no upper bound (it goes to $\infty$).
4.  **Not bounded (neither above nor below):** The sequence $1, -2, 3, -4, 5, -6, ...$ (i.e., $a_n = (-1)^{n+1}n$) goes to $\infty$ and $-\infty$, so it's not bounded above or below.

**The Formal/Mathematical Version:**
*   A sequence $\{a_n\}$ is **bounded above** if there exists a number $M$ such that $a_n \le M$ for all $n \ge 1$. ($M$ is an upper bound).
*   A sequence $\{a_n\}$ is **bounded below** if there exists a number $m$ such that $a_n \ge m$ for all $n \ge 1$. ($m$ is a lower bound).
*   A sequence $\{a_n\}$ is **bounded** if it is both bounded above and bounded below. This is equivalent to saying there exists a positive number $K$ such that $|a_n| \le K$ for all $n \ge 1$.

**What Could Go Wrong:**
A common misconception is that boundedness implies convergence. This is false. The sequence $a_n = (-1)^n$ (which is $-1, 1, -1, 1, ...$) is bounded (e.g., by $m=-1$ and $M=1$), but it diverges by oscillation. However, the converse *is* true: if a sequence converges, then it must be bounded.

### Step 5: Monotonicity

**Plain English Statement:** A sequence is *monotonic* if its terms consistently move in one direction. They either always go up (or stay the same) or always go down (or stay the same). They don't switch directions.

**Small Concrete Example:**
1.  **Non-decreasing (Monotonically increasing):** The sequence $1, 2, 3, 4, ...$ is non-decreasing. Each term is greater than or equal to the previous one.
2.  **Non-increasing (Monotonically decreasing):** The sequence $1, \frac{1}{2}, \frac{1}{3}, \frac{1}{4}, ...$ is non-increasing. Each term is less than or equal to the previous one.
3.  **Not monotonic:** The sequence $-1, 1, -1, 1, ...$ is not monotonic because it goes up, then down, then up, then down.
4.  **Not monotonic:** The sequence $1, 2, 1, 3, 1, 4, ...$ is not monotonic.

**The Formal/Mathematical Version:**
*   A sequence $\{a_n\}$ is **non-decreasing** (or monotonically increasing) if $a_n \le a_{n+1}$ for all $n \ge 1$.
*   A sequence $\{a_n\}$ is **non-increasing** (or monotonically decreasing) if $a_n \ge a_{n+1}$ for all $n \ge 1$.
*   A sequence is **monotonic** if it is either non-decreasing or non-increasing.
*   If the inequalities are strict ($a_n < a_{n+1}$ or $a_n > a_{n+1}$), we call them **strictly increasing** or **strictly decreasing**.

**What Could Go Wrong:**
Students sometimes forget that "non-decreasing" allows for terms to be equal ($a_n = a_{n+1}$). For example, $1, 2, 2, 3, 3, 3, 4, ...$ is a non-decreasing sequence. Also, a sequence might be monotonic only *after* a certain number of terms. For example, $5, 2, 1, 1/2, 1/3, ...$ is not monotonic overall, but it is monotonically decreasing for $n \ge 2$. In such cases, we usually say it is eventually monotonic.

**Important Theorem:** The **Monotonic Sequence Theorem** states that *every bounded, monotonic sequence converges*. This is a powerful result because it gives us a way to prove convergence without explicitly finding the limit. If a sequence is both bounded and always moves in one direction, it *must* settle down.

## 5. Worked examples — multiple, with every step shown

Let's work through several examples to solidify these concepts.

### Example 1: Analyze the sequence $a_n = \frac{3n-1}{n+2}$

**Problem:** Determine if the sequence $a_n = \frac{3n-1}{n+2}$ converges or diverges. If it converges, find its limit. Also, determine if it is bounded and if it is monotonic.

**Given:** The sequence $a_n = \frac{3n-1}{n+2}$.
**Want:** Convergence/Divergence, Limit (if convergent), Boundedness, Monotonicity.

**Step 1: Check for Convergence/Divergence**
We need to evaluate the limit of $a_n$ as $n \to \infty$.
$$ \lim_{n \to \infty} a_n = \lim_{n \to \infty} \frac{3n-1}{n+2} $$
This is a limit of a rational function as $n \to \infty$. We can divide both the numerator and the denominator by the highest power of $n$ in the denominator, which is $n$.
$$ = \lim_{n \to \infty} \frac{\frac{3n}{n} - \frac{1}{n}}{\frac{n}{n} + \frac{2}{n}} $$
*We divide every term in the numerator and denominator by $n$ to simplify the expression for large $n$.*
$$ = \lim_{n \to \infty} \frac{3 - \frac{1}{n}}{1 + \frac{2}{n}} $$
*We simplify the fractions.*
As $n \to \infty$, $\frac{1}{n} \to 0$ and $\frac{2}{n} \to 0$.
$$ = \frac{3 - 0}{1 + 0} $$
*We substitute the limits of the individual terms.*
$$ = 3 $$
Since the limit exists and is a finite number (3), the sequence **converges** to 3.

**Step 2: Check for Boundedness**
Since the sequence converges to 3, it must be bounded. (A converging sequence is always bounded.)
To explicitly find bounds:
Let's look at the first few terms:
$a_1 = \frac{3(1)-1}{1+2} = \frac{2}{3}$
$a_2 = \frac{3(2)-1}{2+2} = \frac{5}{4}$
$a_3 = \frac{3(3)-1}{3+2} = \frac{8}{5}$
The terms seem to be increasing towards 3.
Since $a_n \to 3$, for very large $n$, $a_n$ will be close to 3.
We can also show $a_n < 3$ for all $n$.
$a_n = \frac{3n-1}{n+2} = \frac{3(n+2) - 6 - 1}{n+2} = \frac{3(n+2) - 7}{n+2} = 3 - \frac{7}{n+2}$.
Since $n \ge 1$, $n+2$ is always positive, so $\frac{7}{n+2}$ is always positive.
Therefore, $3 - \frac{7}{n+2}$ is always less than 3. So, $a_n < 3$ for all $n$.
This means the sequence is **bounded above** by 3.
The smallest term is $a_1 = 2/3$. Since all terms are positive, $a_n > 0$.
So, $0 < a_n < 3$ for all $n$.
Thus, the sequence is **bounded**.

**Step 3: Check for Monotonicity**
To check monotonicity, we can compare $a_n$ with $a_{n+1}$ or examine the sign of $a_{n+1} - a_n$.
Alternatively, we can treat $a_n$ as a function $f(x) = \frac{3x-1}{x+2}$ and check its derivative for $x \ge 1$.
$f'(x) = \frac{3(x+2) - (3x-1)(1)}{(x+2)^2}$
*We use the quotient rule for differentiation: $\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$. Here $u=3x-1, v=x+2$.*
$$ f'(x) = \frac{3x+6 - 3x+1}{(x+2)^2} $$
*We expand the numerator and simplify.*
$$ f'(x) = \frac{7}{(x+2)^2} $$
Since $(x+2)^2$ is always positive for $x \ge 1$, and $7$ is positive, $f'(x) > 0$ for all $x \ge 1$.
*A positive derivative means the function is increasing.*
Therefore, the sequence $a_n$ is **strictly increasing** (and thus monotonic).

**Final Answer:**
The sequence $a_n = \frac{3n-1}{n+2}$ **converges to 3**. It is **bounded** (specifically, $2/3 \le a_n < 3$) and **strictly increasing** (thus monotonic).

This example was relatively straightforward because it's a rational function, which behaves predictably at infinity. The derivative test is a powerful tool for monotonicity when the sequence can be easily extended to a continuous function.

---

### Example 2: Analyze the sequence $a_n = \frac{(-1)^n n}{n+1}$

**Problem:** Determine if the sequence $a_n = \frac{(-1)^n n}{n+1}$ converges or diverges. If it converges, find its limit. Also, determine if it is bounded and if it is monotonic.

**Given:** The sequence $a_n = \frac{(-1)^n n}{n+1}$.
**Want:** Convergence/Divergence, Limit (if convergent), Boundedness, Monotonicity.

**Step 1: Check for Convergence/Divergence**
Let's write out the first few terms:
$a_1 = \frac{(-1)^1 (1)}{1+1} = \frac{-1}{2}$
$a_2 = \frac{(-1)^2 (2)}{2+1} = \frac{2}{3}$
$a_3 = \frac{(-1)^3 (3)}{3+1} = \frac{-3}{4}$
$a_4 = \frac{(-1)^4 (4)}{4+1} = \frac{4}{5}$
The sequence is: $-\frac{1}{2}, \frac{2}{3}, -\frac{3}{4}, \frac{4}{5}, -\frac{5}{6}, ...$

Notice the $(-1)^n$ term, which causes the signs to alternate.
Let's consider the limit of the absolute value of the terms:
$$ \lim_{n \to \infty} \left| \frac{(-1)^n n}{n+1} \right| = \lim_{n \to \infty} \frac{n}{n+1} $$
*We take the absolute value, which removes the $(-1)^n$ term.*
$$ = \lim_{n \to \infty} \frac{1}{1 + \frac{1}{n}} $$
*Divide numerator and denominator by $n$.*
$$ = \frac{1}{1+0} = 1 $$
This tells us that the *magnitude* of the terms is approaching 1.
However, because of the $(-1)^n$ term, the sequence alternates between values close to $-1$ and values close to $1$.
The terms approach $1$ for even $n$ (e.g., $a_2 = 2/3$, $a_4 = 4/5$, $a_{100} = 100/101 \approx 0.99$) and approach $-1$ for odd $n$ (e.g., $a_1 = -1/2$, $a_3 = -3/4$, $a_{101} = -101/102 \approx -0.99$).
Since the terms do not approach a single unique limit, the sequence **diverges** (by oscillation).

**Step 2: Check for Boundedness**
From our analysis in Step 1, we saw that the magnitude of the terms approaches 1.
Specifically, we know that $\frac{n}{n+1} = 1 - \frac{1}{n+1}$.
Since $n \ge 1$, $n+1 \ge 2$, so $0 < \frac{1}{n+1} \le \frac{1}{2}$.
This means $1 - \frac{1}{2} \le 1 - \frac{1}{n+1} < 1$.
So, $\frac{1}{2} \le \frac{n}{n+1} < 1$.
Therefore, $|a_n| = \frac{n}{n+1}$ is always between $1/2$ and $1$.
This implies that $a_n$ is always between $-1$ and $1$.
Specifically, $-1 < a_n \le 2/3$ (for $n=2$) and $-1/2 \le a_n < 1$ (for $n=4$).
The smallest term is $a_1 = -1/2$.
The largest term is $a_2 = 2/3$.
More precisely, for all $n$, we have $-1 < a_n < 1$.
Thus, the sequence is **bounded**. (e.g., by $m=-1$ and $M=1$).

**Step 3: Check for Monotonicity**
Let's look at the terms:
$a_1 = -0.5$
$a_2 = 0.666...$
$a_3 = -0.75$
$a_4 = 0.8$
$a_1 < a_2$ ($-0.5 < 0.666...$)
$a_2 > a_3$ ($0.666... > -0.75$)
$a_3 < a_4$ ($-0.75 < 0.8$)
Since the terms are increasing, then decreasing, then increasing, the sequence is **not monotonic**.

**Final Answer:**
The sequence $a_n = \frac{(-1)^n n}{n+1}$ **diverges** (by oscillation). It is **bounded** (e.g., between -1 and 1), but it is **not monotonic**.

This example highlights that boundedness does not imply convergence, and that oscillating sequences are not monotonic.

---

### Example 3: Analyze the sequence $a_n = \sqrt{n+1} - \sqrt{n}$

**Problem:** Determine if the sequence $a_n = \sqrt{n+1} - \sqrt{n}$ converges or diverges. If it converges, find its limit. Also, determine if it is bounded and if it is monotonic.

**Given:** The sequence $a_n = \sqrt{n+1} - \sqrt{n}$.
**Want:** Convergence/Divergence, Limit (if convergent), Boundedness, Monotonicity.

**Step 1: Check for Convergence/Divergence**
We need to evaluate $\lim_{n \to \infty} (\sqrt{n+1} - \sqrt{n})$. This is an indeterminate form of type $\infty - \infty$.
To evaluate this limit, we use the technique of multiplying by the conjugate.
$$ \lim_{n \to \infty} (\sqrt{n+1} - \sqrt{n}) = \lim_{n \to \infty} (\sqrt{n+1} - \sqrt{n}) \cdot \frac{\sqrt{n+1} + \sqrt{n}}{\sqrt{n+1} + \sqrt{n}} $$
*Multiply by the conjugate $\frac{\sqrt{n+1} + \sqrt{n}}{\sqrt{n+1} + \sqrt{n}}$ to rationalize the expression.*
$$ = \lim_{n \to \infty} \frac{(\sqrt{n+1})^2 - (\sqrt{n})^2}{\sqrt{n+1} + \sqrt{n}} $$
*Apply the difference of squares formula $(A-B)(A+B) = A^2 - B^2$.*
$$ = \lim_{n \to \infty} \frac{(n+1) - n}{\sqrt{n+1} + \sqrt{n}} $$
*Simplify the numerator.*
$$ = \lim_{n \to \infty} \frac{1}{\sqrt{n+1} + \sqrt{n}} $$
As $n \to \infty$, $\sqrt{n+1} \to \infty$ and $\sqrt{n} \to \infty$.
So the denominator $\sqrt{n+1} + \sqrt{n} \to \infty$.
Therefore, $\frac{1}{\infty} \to 0$.
$$ = 0 $$
Since the limit exists and is a finite number (0), the sequence **converges** to 0.

**Step 2: Check for Boundedness**
Since the sequence converges to 0, it must be **bounded**.
Let's find the explicit bounds.
$a_n = \frac{1}{\sqrt{n+1} + \sqrt{n}}$.
Since $n \ge 1$, $\sqrt{n+1} + \sqrt{n}$ is always positive. So $a_n > 0$.
The largest term will occur for the smallest $n$.
$a_1 = \sqrt{1+1} - \sqrt{1} = \sqrt{2} - 1 \approx 1.414 - 1 = 0.414$.
As $n$ increases, the denominator $\sqrt{n+1} + \sqrt{n}$ increases, so $a_n$ decreases.
Therefore, $0 < a_n \le \sqrt{2}-1$.
Thus, the sequence is **bounded**.

**Step 3: Check for Monotonicity**
We can compare $a_{n+1}$ and $a_n$.
$a_n = \frac{1}{\sqrt{n+1} + \sqrt{n}}$.
$a_{n+1} = \frac{1}{\sqrt{(n+1)+1} + \sqrt{n+1}} = \frac{1}{\sqrt{n+2} + \sqrt{n+1}}$.
Since $n \ge 1$, we know that $\sqrt{n+2} > \sqrt{n+1} > \sqrt{n}$.
Therefore, $\sqrt{n+2} + \sqrt{n+1} > \sqrt{n+1} + \sqrt{n}$.
If the denominator of a fraction with a positive numerator increases, the value of the fraction decreases.
So, $\frac{1}{\sqrt{n+2} + \sqrt{n+1}} < \frac{1}{\sqrt{n+1} + \sqrt{n}}$.
This means $a_{n+1} < a_n$.
Therefore, the sequence is **strictly decreasing** (and thus monotonic).

**Final Answer:**
The sequence $a_n = \sqrt{n+1} - \sqrt{n}$ **converges to 0**. It is **bounded** (specifically, $0 < a_n \le \sqrt{2}-1$) and **strictly decreasing** (thus monotonic).

This example shows how algebraic manipulation (multiplying by the conjugate) is crucial for evaluating some limits. Also, comparing terms directly can be a good way to check monotonicity.

---

### Example 4: Analyze the sequence $a_n = \frac{n!}{2^n}$

**Problem:** Determine if the sequence $a_n = \frac{n!}{2^n}$ converges or diverges. If it converges, find its limit. Also, determine if it is bounded and if it is monotonic.

**Given:** The sequence $a_n = \frac{n!}{2^n}$.
**Want:** Convergence/Divergence, Limit (if convergent), Boundedness, Monotonicity.

**Step 1: Check for Convergence/Divergence**
Let's write out the first few terms:
$a_1 = \frac{1!}{2^1} = \frac{1}{2}$
$a_2 = \frac{2!}{2^2} = \frac{2}{4} = \frac{1}{2}$
$a_3 = \frac{3!}{2^3} = \frac{6}{8} = \frac{3}{4}$
$a_4 = \frac{4!}{2^4} = \frac{24}{16} = \frac{3}{2}$
$a_5 = \frac{5!}{2^5} = \frac{120}{32} = \frac{15}{4}$
$a_6 = \frac{6!}{2^6} = \frac{720}{64} = \frac{45}{4}$
The terms are: $1/2, 1/2, 3/4, 3/2, 15/4, 45/4, ...$
The terms seem to be growing. Let's look at the ratio of consecutive terms, $a_{n+1}/a_n$, which is often useful for sequences involving factorials.
$$ \frac{a_{n+1}}{a_n} = \frac{(n+1)!/2^{n+1}}{n!/2^n} $$
*Set up the ratio of the $(n+1)$-th term to the $n$-th term.*
$$ = \frac{(n+1)!}{2^{n+1}} \cdot \frac{2^n}{n!} $$
*Rewrite division as multiplication by the reciprocal.*
$$ = \frac{(n+1) \cdot n!}{2 \cdot 2^n} \cdot \frac{2^n}{n!} $$
*Expand $(n+1)! = (n+1) \cdot n!$ and $2^{n+1} = 2 \cdot 2^n$.*
$$ = \frac{n+1}{2} $$
*Cancel out $n!$ and $2^n$.*
For $n \ge 1$, $\frac{n+1}{2}$ is:
$n=1: (1+1)/2 = 1$
$n=2: (2+1)/2 = 3/2$
$n=3: (3+1)/2 = 2$
For $n \ge 2$, $\frac{n+1}{2} > 1$. This means $a_{n+1} > a_n$ for $n \ge 2$.
Since the ratio of consecutive terms is greater than 1 (for $n \ge 2$), the terms are growing larger.
As $n \to \infty$, $\frac{n+1}{2} \to \infty$. This implies that the terms $a_n$ are growing without bound.
Therefore, the sequence **diverges to $\infty$**.

**Step 2: Check for Boundedness**
Since the sequence diverges to $\infty$, it is **not bounded above**.
However, all terms are positive ($n! > 0$ and $2^n > 0$).
So $a_n > 0$ for all $n$.
Thus, the sequence is **bounded below** by $0$.
Since it is not bounded above, the sequence is **not bounded** overall.

**Step 3: Check for Monotonicity**
From Step 1, we found that $\frac{a_{n+1}}{a_n} = \frac{n+1}{2}$.
For $n=1$, $\frac{a_2}{a_1} = \frac{2}{2} = 1$, so $a_2 = a_1$. (From $1/2$ to $1/2$).
For $n \ge 2$, $\frac{n+1}{2} > 1$, which means $a_{n+1} > a_n$. (e.g., $a_3 > a_2$, $a_4 > a_3$, etc.)
Since $a_1 \le a_2 \le a_3 \le ...$, the sequence is **non-decreasing** (and thus monotonic).

**Final Answer:**
The sequence $a_n = \frac{n!}{2^n}$ **diverges to $\infty$**. It is **bounded below** by $0$ but **not bounded above**, so it is **not bounded** overall. It is **non-decreasing** (thus monotonic).

This example shows how the ratio of consecutive terms can be very useful for analyzing sequences involving factorials and for determining monotonicity. It also reinforces that a monotonic sequence can diverge if it's not bounded.

---

### Example 5: Analyze the sequence $a_n = \frac{\cos(n\pi/2)}{n}$

**Problem:** Determine if the sequence $a_n = \frac{\cos(n\pi/2)}{n}$ converges or diverges. If it converges, find its limit. Also, determine if it is bounded and if it is monotonic.

**Given:** The sequence $a_n = \frac{\cos(n\pi/2)}{n}$.
**Want:** Convergence/Divergence, Limit (if convergent), Boundedness, Monotonicity.

**Step 1: Check for Convergence/Divergence**
Let's write out the first few terms by evaluating $\cos(n\pi/2)$:
For $n=1$: $\cos(\pi/2) = 0$
For $n=2$: $\cos(\pi) = -1$
For $n=3$: $\cos(3\pi/2) = 0$
For $n=4$: $\cos(2\pi) = 1$
For $n=5$: $\cos(5\pi/2) = 0$ (pattern repeats $0, -1, 0, 1, 0, -1, 0, 1, ...$)

Now for the terms $a_n$:
$a_1 = \frac{0}{1} = 0$
$a_2 = \frac{-1}{2} = -0.5$
$a_3 = \frac{0}{3} = 0$
$a_4 = \frac{1}{4} = 0.25$
$a_5 = \frac{0}{5} = 0$
$a_6 = \frac{-1}{6} \approx -0.167$
$a_7 = \frac{0}{7} = 0$
$a_8 = \frac{1}{8} = 0.125$

The sequence is $0, -1/2, 0, 1/4, 0, -1/6, 0, 1/8, ...$
We know that for any $n$, $-1 \le \cos(n\pi/2) \le 1$.
So, we can use the Squeeze Theorem.
$$ -\frac{1}{n} \le \frac{\cos(n\pi/2)}{n} \le \frac{1}{n} $$
*Since $-1 \le \cos(\theta) \le 1$, we can divide by $n$ (which is positive for $n \ge 1$) to get an inequality for $a_n$.*
We know that $\lim_{n \to \infty} -\frac{1}{n} = 0$ and $\lim_{n \to \infty} \frac{1}{n} = 0$.
By the Squeeze Theorem, since $a_n$ is "squeezed" between two sequences that both converge to 0, $a_n$ must also converge to 0.
Therefore, the sequence **converges to 0**.

**Step 2: Check for Boundedness**
Since the sequence converges to 0, it must be **bounded**.
From the Squeeze Theorem, we have $-\frac{1}{n} \le a_n \le \frac{1}{n}$.
For $n \ge 1$, the maximum value of $1/n$ is $1/1 = 1$. The minimum value of $-1/n$ is $-1/1 = -1$.
So, for all $n \ge 1$, $-1 \le a_n \le 1$.
More precisely, the terms are $0, -1/2, 0, 1/4, 0, -1/6, ...$.
The smallest term is $-1/2$ (for $n=2$). The largest term is $1/4$ (for $n=4$). All other terms are 0 or smaller in magnitude.
Thus, the sequence is **bounded** (e.g., by $m=-1/2$ and $M=1/4$, or more loosely by $-1$ and $1$).

**Step 3: Check for Monotonicity**
Let's look at the terms:
$a_1 = 0$
$a_2 = -0.5$
$a_3 = 0$
$a_4 = 0.25$
$a_1 > a_2$ ($0 > -0.5$)
$a_2 < a_3$ ($-0.5 < 0$)
$a_3 < a_4$ ($0 < 0.25$)
Since the terms decrease, then increase, then increase, then decrease (e.g., $a_4 > a_5 = 0$), the sequence is **not monotonic**. It oscillates around 0.

**Final Answer:**
The sequence $a_n = \frac{\cos(n\pi/2)}{n}$ **converges to 0**. It is **bounded** (e.g., between -1 and 1), but it is **not monotonic**.

This example demonstrates the power of the Squeeze Theorem for limits involving oscillating functions. It also shows that a sequence can converge without being monotonic, as long as the oscillations get smaller and smaller.

## 6. Common mistakes and traps

1.  **Confusing a sequence with a series:** A sequence is a list of numbers ($a_1, a_2, a_3, ...$), while a series is the *sum* of the terms of a sequence ($a_1 + a_2 + a_3 + ...$). They are distinct concepts, though related.
2.  **Assuming boundedness implies convergence:** Just because a sequence stays within a certain range doesn't mean it settles down. The sequence $a_n = (-1)^n$ is bounded (between -1 and 1), but it diverges by oscillation.
3.  **Assuming monotonicity implies convergence (without boundedness):** A sequence like $a_n = n$ is strictly increasing (monotonic), but it diverges to infinity because it's not bounded above. The Monotonic Sequence Theorem requires *both* boundedness and monotonicity for convergence.
4.  **Incorrectly applying limit laws to oscillating sequences:** When a limit of a product or sum is taken, it's tempting to apply the limit to each part. However, if one part oscillates (like $(-1)^n$), the limit of the overall expression may not exist, even if other parts go to zero (e.g., $\lim_{n \to \infty} (-1)^n$ does not exist, so $\lim_{n \to \infty} (-1)^n \cdot \frac{n}{n+1}$ also does not exist, even though $\lim_{n \to \infty} \frac{n}{n+1} = 1$).
5.  **Forgetting the domain of $n$ (natural numbers):** When using calculus tools like derivatives to check monotonicity, remember that the sequence is only defined for integer values of $n \ge 1$. A function $f(x)$ might be monotonic for $x \ge 1$, but the sequence $a_n = f(n)$ might not be if its initial terms behave differently (e.g., $a_n = 100/n^2$ for $n=1,2,3$ and then $a_n = 1/n$ for $n \ge 4$).
6.  **Misinterpreting "eventually" in definitions:** The $\epsilon-N$ definition of convergence states that *eventually* (for $n > N$), the terms are close to $L$. The behavior of the first few (or even first million) terms does not determine convergence; it's the long-term behavior that matters.

## 7. Textbook-precise explanation

This section provides the formal definitions as you would encounter them in a rigorous university calculus or real analysis textbook.

**Definition 1: Sequence**
A **sequence** is a function $f: \mathbb{N} \to \mathbb{R}$, where $\mathbb{N} = \{1, 2, 3, ...\}$ (the set of natural numbers) and $\mathbb{R}$ is the set of real numbers. We typically denote $f(n)$ as $a_n$, and the sequence itself as $\{a_n\}_{n=1}^\infty$ or simply $\{a_n\}$. The value $a_n$ is called the $n$-th term of the sequence.

**Definition 2: Convergence of a Sequence**
A sequence $\{a_n\}$ **converges** to a real number $L$ if for every $\epsilon > 0$, there exists a positive integer $N$ such that for all $n > N$, we have $|a_n - L| < \epsilon$.
If a sequence converges to $L$, we write $\lim_{n \to \infty} a_n = L$.
If a sequence does not converge to any real number $L$, it is said to **diverge**.

**Definition 3: Divergence to Infinity**
A sequence $\{a_n\}$ **diverges to infinity** if for every positive number $M$, there exists a positive integer $N$ such that for all $n > N$, we have $a_n > M$. We write $\lim_{n \to \infty} a_n = \infty$.
Similarly, a sequence $\{a_n\}$ **diverges to negative infinity** if for every negative number $M$, there exists a positive integer $N$ such that for all $n > N$, we have $a_n < M$. We write $\lim_{n \to \infty} a_n = -\infty$.
A sequence can also diverge by oscillation (e.g., $a_n = (-1)^n$).

**Definition 4: Boundedness of a Sequence**
*   A sequence $\{a_n\}$ is **bounded above** if there exists a real number $M$ such that $a_n \le M$ for all $n \in \mathbb{N}$.
*   A sequence $\{a_n\}$ is **bounded below** if there exists a real number $m$ such that $a_n \ge m$ for all $n \in \mathbb{N}$.
*   A sequence $\{a_n\}$ is **bounded** if it is both bounded above and bounded below. This is equivalent to saying there exists a positive real number $K$ such that $|a_n| \le K$ for all $n \in \mathbb{N}$.

**Theorem (Relationship between Convergence and Boundedness):**
If a sequence converges, then it is bounded. (The converse is false; a bounded sequence may diverge).

**Definition 5: Monotonicity of a Sequence**
*   A sequence $\{a_n\}$ is **non-decreasing** (or monotonically increasing) if $a_n \le a_{n+1}$ for all $n \in \mathbb{N}$.
*   A sequence $\{a_n\}$ is **non-increasing** (or monotonically decreasing) if $a_n \ge a_{n+1}$ for all $n \in \mathbb{N}$.
*   A sequence is **monotonic** if it is either non-decreasing or non-increasing.
*   If the inequalities are strict ($a_n < a_{n+1}$ or $a_n > a_{n+1}$), the sequence is called **strictly increasing** or **strictly decreasing**, respectively.

**Theorem (Monotonic Sequence Theorem - MST):**
Every bounded, monotonic sequence converges.
Specifically:
1.  If a sequence $\{a_n\}$ is non-decreasing and bounded above, then it converges.
2.  If a sequence $\{a_n\}$ is non-increasing and bounded below, then it converges.

*(See: Stewart, Calculus: Early Transcendentals, 9th ed., Chapter 11.1-11.2 for these definitions and theorems. For a more rigorous treatment, see: Spivak, Calculus, 4th ed., Chapter 21, or Rudin, Principles of Mathematical Analysis, 3rd ed., Chapter 3.)*

## 8. ASCII diagrams

Here are some ASCII diagrams to visualize the concepts. Imagine the horizontal axis as the index $n$ and the vertical axis as the term value $a_n$. Each `x` represents a term in the sequence.

```text
1. Convergent Sequence (e.g., a_n = 1/n -> 0)

   ^ a_n
   |
 1 +x
   |  x
   |    x
   |      x
   |        x
   |          x
   |            x
   |              x
   +----------------------> n
   0

   Description: Terms start at 1 and get progressively closer to 0, never quite reaching it but approaching it arbitrarily closely.

2. Divergent Sequence (e.g., a_n = (-1)^n)

   ^ a_n
   |
 1 +  x   x   x   x
   |
   |
   +----------------------> n
   |    x   x   x   x
-1 +

   Description: Terms jump back and forth between 1 and -1. They do not approach a single value.

3. Divergent Sequence (e.g., a_n = n)

   ^ a_n
   |
   |           x
   |         x
   |       x
   |     x
   |   x
   + x--------------------> n
   0

   Description: Terms continuously increase without any upper limit, extending infinitely upwards.

4. Bounded Sequence (e.g., a_n = (-1)^n, same as #2)

   ^ a_n
   |
 M +--------------------- Upper Bound (e.g., M=1)
   |  x   x   x   x
   |
   |
   |    x   x   x   x
 m +--------------------- Lower Bound (e.g., m=-1)
   +----------------------> n
   0

   Description: All terms of the sequence lie between a maximum value (M) and a minimum value (m).

5. Monotonically Decreasing Sequence (e.g., a_n = 1/n, same as #1)

   ^ a_n
   |
 1 +x
   |  x
   |    x
   |      x
   |        x
   |          x
   |            x
   |              x
   +----------------------> n
   0

   Description: Each term is less than or equal to the previous term. The sequence moves consistently downwards.

6. Monotonically Increasing Sequence (e.g., a_n = n)

   ^ a_n
   |
   |           x
   |         x
   |       x
   |     x
   |   x
   + x--------------------> n
   0

   Description: Each term is greater than or equal to the previous term. The sequence moves consistently upwards.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Imagine a **S**nake **C**oiling **D**own a **B**ranch **M**onotonically.
    *   **S**equence: The snake itself, a line of points.
    *   **C**onvergence: The snake's head eventually settles on a specific leaf (the limit $L$).
    *   **D**ivergence: The snake either keeps growing infinitely long (to $\infty$), shrinks into the ground (to $-\infty$), or keeps wiggling back and forth between two leaves without ever picking one (oscillation).
    *   **B**oundedness: The branch itself has a top and bottom railing, keeping the snake from falling off or flying away. If the snake stays on the branch, it's bounded.
    *   **M**onotonicity: The snake is only allowed to move in one direction along the branch – always upwards or always downwards, never turning back.

    The key takeaway is the **Monotonic Sequence Theorem (MST)**: If the snake is on a branch (bounded) and only moves in one direction (monotonic), it *must* eventually settle on a leaf (converge).

2.  **Formulas/Facts to Overlearn:**
    *   **Convergence:** $\lim_{n \to \infty} a_n = L$ (a finite number). The $\epsilon-N$ definition is the rigorous foundation, but for practical calculations, the limit evaluation is key.
    *   **Boundedness:** There exist $m, M$ such that $m \le a_n \le M$ for all $n$. (Or equivalently, $|a_n| \le K$ for some $K>0$).
    *   **Monotonicity:** $a_n \le a_{n+1}$ (non-decreasing) OR $a_n \ge a_{n+1}$ (non-increasing) for all $n$.
    *   **MST:** Bounded + Monotonic $\implies$ Convergent. This is your most powerful theorem for proving convergence without finding the limit.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review all definitions and worked examples. Try to explain them in your own words.
    *   **Day 3:** Rework 2-3 examples without looking at the solutions. Focus on the definitions.
    *   **Day 7:** Rework the remaining examples. Write down the formal definitions from memory.
    *   **Day 16:** Review the Monotonic Sequence Theorem and its implications. Create a new sequence and analyze it.
    *   **Day 35:** Summarize all concepts (convergence, divergence, boundedness, monotonicity) in a single paragraph for each. Explain the $\epsilon-N$ definition to an imaginary friend.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the $\epsilon-N$ definition of convergence, recall the *idea* of "getting arbitrarily close."
    1.  **Start with the goal:** The terms $a_n$ should get close to $L$. How close? As close as we want.
    2.  **Define "as close as we want":** This is where $\epsilon$ comes in. For *any* tiny positive distance $\epsilon$, we want $a_n$ to be within $\epsilon$ of $L$. Mathematically, $|a_n - L| < \epsilon$.
    3.  **Define "eventually":** This closeness doesn't have to happen from the very first term, but it must happen *eventually* and then persist. This is where $N$ comes in. There must be some point in the sequence, $N$, after which *all* subsequent terms ($n > N$) satisfy the closeness condition.
    4.  **Combine:** For every $\epsilon > 0$, there exists an $N$ such that if $n > N$, then $|a_n - L| < \epsilon$. This is the full definition. This pathway helps you reconstruct the definition logically.

## 10. Connections — what this leads to

Understanding sequences is not an end in itself; it's a foundational stepping stone for much of advanced calculus and analysis. Here's what this subtopic unlocks:

1.  **Series:** The most direct continuation. A series is the sum of the terms of a sequence. The convergence of a sequence is a necessary (but not sufficient) condition for the convergence of a series (the Divergence Test for series). All convergence tests for series (Integral Test, Comparison Test, Ratio Test, Root Test, Alternating Series Test) rely heavily on the understanding of sequence convergence.
2.  **Power Series and Taylor Series:** These are infinite series where each term is a function of $x$. They are used to represent functions as infinite polynomials. Understanding sequences is critical for determining the radius and interval of convergence of these power series.
3.  **Real Analysis:** This is where the rigorous definitions (especially the $\epsilon-N$ definition) are explored in depth. Concepts like Cauchy sequences, subsequences, and limits superior/inferior build directly on the foundation of sequences. The completeness of the real numbers is often defined in terms of the convergence of Cauchy sequences.
4.  **Differential Equations (Numerical Solutions):** Many differential equations cannot be solved analytically. Numerical methods (like Euler's method or Runge-Kutta methods) generate sequences of approximate solutions. The convergence of these sequences to the true solution is paramount for the accuracy and reliability of the numerical scheme.
5.  **Iterative Methods in Numerical Analysis:** Algorithms for finding roots of equations (e.g., Newton's Method, Bisection Method), solving systems of linear equations, or optimizing functions (e.g., Gradient Descent) all produce sequences of approximations. The study of their convergence rate and conditions is a central theme.
6.  **Fourier Series:** Representing periodic functions as sums of sines and cosines. The coefficients of these series form sequences, and their properties (e.g., convergence to zero) are important.
7.  **Probability and Statistics:** Concepts like the Law of Large Numbers (a sequence of sample means converges to the true mean) and the Central Limit Theorem involve the convergence of sequences of random variables or their distributions.

## 11. Self-check questions

1.  Determine if the sequence $a_n = \frac{n^2 - 1}{2n^2 + n}$ converges or diverges. If it converges, find its limit. Is it bounded? Is it monotonic?
2.  Consider the sequence $a_n = \frac{e^n}{n!}$. Does it converge or diverge? Is it bounded? Is it monotonic? (Hint: Consider the ratio $a_{n+1}/a_n$ for monotonicity and the limit).
3.  For the sequence $a_n = \sqrt{n^2+n} - n$:
    a.  Does it converge or diverge? If it converges, find its limit.
    b.  Is it bounded?
    c.  Is it monotonic?
4.  Give an example of a sequence that is:
    a.  Bounded but divergent.
    b.  Monotonic but divergent.
    c.  Convergent but not monotonic.
    For each example, briefly explain why it satisfies the conditions.
5.  Prove, using the $\epsilon-N$ definition, that the sequence $a_n = \frac{2n+1}{n+3}$ converges to 2.