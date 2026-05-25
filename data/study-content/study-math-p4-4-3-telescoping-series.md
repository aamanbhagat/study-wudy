## 1. What it is — in plain English

Imagine you have a long, complicated list of numbers that you need to add together. Most of these lists are really hard to sum up precisely. But every now and then, you encounter a special kind of list where, when you write out the numbers, most of them just cancel each other out! It's like a magic trick where a huge sum shrinks down to just a couple of terms.

This "telescoping series" gets its name from a classic spyglass or telescope. You know how an old-fashioned telescope has several segments that slide into each other, making the whole device much shorter when collapsed? That's exactly what happens with the terms in these series. When you "expand" the sum, you see a long chain of numbers, but then as you "collapse" it, nearly all the middle terms disappear, leaving only a few at the beginning and end.

So, a telescoping series is a sum where each term can be expressed as the difference of two consecutive terms in a sequence. This specific structure leads to a beautiful pattern of cancellation when you write out the sum, making it surprisingly easy to find the exact total, even if it's an infinite sum.

## 2. Why it matters — real-world applications

While telescoping series might seem like a mathematical curiosity, the underlying principle of simplifying complex sums through cancellation has profound implications and appears in various real-world scenarios:

1.  **Digital Signal Processing (DSP) and Filter Design:** In DSP, many operations involve summing discrete signals over time. For instance, designing certain types of digital filters (like Finite Impulse Response, or FIR filters) might involve sums where the output at a given time is a weighted sum of past input samples. While not always directly "telescoping" in the strict sense, the mathematical techniques for analyzing the stability and response of these filters often rely on identifying patterns in sums that allow for simplification, sometimes through differences or clever algebraic manipulation that mimics the telescoping effect. This can lead to more efficient algorithms for processing audio, video, or communication signals in devices made by companies like Qualcomm (for mobile chips) or NVIDIA (for AI/GPU processing).

2.  **Financial Mathematics — Annuities and Present Value:** Calculating the present value of an annuity (a series of equal payments made at regular intervals) or the future value of a series of investments often involves summing a geometric series. While geometric series are a distinct type, the derivation of their sum formula (which is crucial in finance for banks, insurance companies, and investment firms like BlackRock or Vanguard) fundamentally relies on a telescoping-like cancellation. If you write out $S_n = a + ar + ar^2 + \dots + ar^{n-1}$ and then $rS_n = ar + ar^2 + \dots + ar^n$, subtracting the two expressions leads to $S_n - rS_n = a - ar^n$, which simplifies to $S_n = \frac{a(1-r^n)}{1-r}$. This is a classic example of how a sum collapses, enabling precise financial calculations.

3.  **Computer Science — Algorithm Analysis:** When analyzing the runtime complexity of algorithms, especially those involving loops or recursive calls, one often needs to sum up the cost of operations. For example, if an operation's cost decreases in a specific way with each iteration, or if the problem size is reduced by a constant factor, the total cost might be expressed as a sum. Sometimes, these sums can be simplified using techniques akin to telescoping series, particularly when dealing with finite differences or recurrence relations. This helps engineers at companies like Google or Microsoft design more efficient search algorithms, data structures, or machine learning models by accurately predicting their performance.

4.  **Physics — Statistical Mechanics and Lattice Models:** In statistical mechanics, particularly when dealing with lattice models (like the Ising model for magnetism) or discrete quantum systems, calculations of partition functions or expectation values can involve sums over many configurations. While highly complex, certain simplified models or approximations might lead to sums that exhibit cancellation properties, allowing for exact solutions or significant simplification. This is crucial for theoretical physicists trying to understand phase transitions or the behavior of materials at atomic scales.

## 3. Prerequisites — what you must know first

Before diving deep into telescoping series, ensure you have a solid grasp of the following concepts:

*   **Sequences:** An ordered list of numbers, typically defined by a formula for the $n$-th term $a_n$.
*   **Series:** The sum of the terms of a sequence, often denoted using summation notation $\Sigma$.
*   **Summation Notation ($\Sigma$):** Understanding how to read and write sums like $\sum_{k=m}^n a_k$ and what the indices and bounds mean.
*   **Partial Sums:** The sum of the first $n$ terms of a series, denoted $S_n = \sum_{k=1}^n a_k$. This is the foundation for defining convergence of infinite series.
*   **Limits of Sequences:** How to evaluate $\lim_{n \to \infty} a_n$, especially for sequences involving fractions or powers. This is essential for determining if an infinite series converges.
*   **Convergence and Divergence of Series:** The basic idea that an infinite series converges if its partial sums approach a finite limit, and diverges otherwise.
*   **Basic Algebra and Fractions:** Proficiency in manipulating algebraic expressions, especially adding, subtracting, and simplifying fractions.
*   **Partial Fraction Decomposition:** A technique used to break down complex rational functions (fractions with polynomials in numerator and denominator) into simpler fractions. This is often a crucial first step in identifying the telescoping pattern.
*   **Logarithm Properties:** Rules for manipulating logarithms, such as $\ln(AB) = \ln A + \ln B$ and $\ln(A/B) = \ln A - \ln B$.

If any of these concepts feel unfamiliar, pause and review them. Building a strong foundation now will make understanding telescoping series much smoother.

## 4. The core idea — step by step

The core idea of a telescoping series is that most of its terms cancel out, leaving only a few. This happens when each term in the series can be expressed as a difference of two consecutive terms from another sequence. Let's break this down.

### Step 1: Understand Summation Notation and Partial Sums

*   **Plain English:** A series is just a sum of numbers from a sequence. An infinite series means we're adding infinitely many numbers. To figure out if an infinite sum has a finite total, we first look at the sum of the first $n$ terms, called the "partial sum."
*   **Small Concrete Example:** Consider the series $\sum_{k=1}^\infty a_k$. The 3rd partial sum is $S_3 = a_1 + a_2 + a_3$.
*   **Formal/Mathematical Version:** An infinite series is written as $\sum_{k=m}^\infty a_k$. Its $n$-th partial sum is $S_n = \sum_{k=m}^n a_k = a_m + a_{m+1} + \dots + a_n$. If $\lim_{n \to \infty} S_n$ exists and is finite, the series converges to that limit.
*   **What could go wrong:** Misinterpreting the starting index $m$ or the ending index $n$ when writing out the partial sum. Always be careful with the bounds.

### Step 2: Identify the "Difference" Structure

*   **Plain English:** The magic of a telescoping series happens when each term $a_k$ can be written as the difference between two *consecutive* terms of *another* sequence, let's call it $b_k$. Specifically, we look for $a_k = b_k - b_{k+1}$ (or sometimes $a_k = b_{k+1} - b_k$, or even $a_k = b_k - b_{k+c}$ for some constant $c > 1$). This is the crucial pattern.
*   **Small Concrete Example:** If $a_k = \frac{1}{k} - \frac{1}{k+1}$, then we can see $b_k = \frac{1}{k}$. So $a_k = b_k - b_{k+1}$.
*   **Formal/Mathematical Version:** A series $\sum a_k$ is a telescoping series if its terms can be written in the form $a_k = b_k - b_{k+c}$ for some sequence $\{b_k\}$ and some integer $c \ge 1$. The most common case is $c=1$, i.e., $a_k = b_k - b_{k+1}$.
*   **What could go wrong:** Not recognizing this difference pattern. Often, you'll need to use algebraic techniques like partial fraction decomposition or logarithm properties to transform $a_k$ into this desired form. If $a_k$ doesn't fit this pattern, it's not a telescoping series.

### Step 3: Write out the Partial Sum $S_n$ and Observe Cancellation

*   **Plain English:** Once you've identified the $b_k$ sequence, write out the first few terms and the last few terms of the partial sum $S_n$. You'll see a beautiful pattern where the second part of one term cancels out the first part of the next term (or a term a few steps away).
*   **Small Concrete Example:** Let $a_k = \frac{1}{k} - \frac{1}{k+1}$.
    $S_n = \sum_{k=1}^n \left(\frac{1}{k} - \frac{1}{k+1}\right)$
    $S_n = \left(\frac{1}{1} - \frac{1}{2}\right) + \left(\frac{1}{2} - \frac{1}{3}\right) + \left(\frac{1}{3} - \frac{1}{4}\right) + \dots + \left(\frac{1}{n} - \frac{1}{n+1}\right)$
    Notice how $-\frac{1}{2}$ cancels with $+\frac{1}{2}$, $-\frac{1}{3}$ with $+\frac{1}{3}$, and so on.
*   **Formal/Mathematical Version:** For $a_k = b_k - b_{k+1}$, the $n$-th partial sum is:
    $$S_n = (b_1 - b_2) + (b_2 - b_3) + (b_3 - b_4) + \dots + (b_{n-1} - b_n) + (b_n - b_{n+1})$$
*   **What could go wrong:** Making algebraic errors when expanding the sum, or incorrectly identifying which terms cancel. Be meticulous! Pay special attention to the signs.

### Step 4: Identify the Remaining Terms After Cancellation

*   **Plain English:** After all the cancellations, only a few terms will be left. These are usually the very first term(s) and the very last term(s) of the expanded partial sum.
*   **Small Concrete Example:** From Step 3:
    $S_n = \left(\frac{1}{1} - \cancel{\frac{1}{2}}\right) + \left(\cancel{\frac{1}{2}} - \cancel{\frac{1}{3}}\right) + \left(\cancel{\frac{1}{3}} - \cancel{\frac{1}{4}}\right) + \dots + \left(\cancel{\frac{1}{n}} - \frac{1}{n+1}\right)$
    The only terms left are $\frac{1}{1}$ and $-\frac{1}{n+1}$. So, $S_n = 1 - \frac{1}{n+1}$.
*   **Formal/Mathematical Version:** For $a_k = b_k - b_{k+1}$, the partial sum simplifies to:
    $$S_n = b_1 - b_{n+1}$$
    If the pattern is $a_k = b_k - b_{k+c}$ for $c > 1$, then more terms will remain at the beginning and end. For example, if $c=2$, $S_n = b_1 + b_2 - b_{n+1} - b_{n+2}$.
*   **What could go wrong:** Incorrectly identifying *all* the remaining terms, especially when the cancellation pattern is offset (e.g., $b_k - b_{k+2}$). Always write out enough terms to clearly see the pattern.

### Step 5: Take the Limit as $n \to \infty$ to Find the Series Sum

*   **Plain English:** Now that you have a simple expression for the partial sum $S_n$, you can find the sum of the infinite series by seeing what $S_n$ approaches as $n$ gets infinitely large.
*   **Small Concrete Example:** For $S_n = 1 - \frac{1}{n+1}$:
    $\lim_{n \to \infty} S_n = \lim_{n \to \infty} \left(1 - \frac{1}{n+1}\right) = 1 - 0 = 1$.
    So the sum of the series is 1.
*   **Formal/Mathematical Version:** The sum of the infinite series is $\sum_{k=m}^\infty a_k = \lim_{n \to \infty} S_n$. For the common case $a_k = b_k - b_{k+1}$, the sum is $\lim_{n \to \infty} (b_m - b_{n+1}) = b_m - \lim_{n \to \infty} b_{n+1}$. If this limit exists and is finite, the series converges. Otherwise, it diverges.
*   **What could go wrong:** Forgetting to take the limit, or incorrectly evaluating the limit of $b_{n+1}$ (or $b_n$, etc.). If $\lim_{n \to \infty} b_{n+1}$ diverges, then the entire series diverges.

## 5. Worked examples — multiple, with every step shown

Here are several worked examples, ranging in difficulty, to solidify your understanding.

### Example 1: Basic Partial Fraction Decomposition

**Problem:** Find the sum of the series $\sum_{n=1}^\infty \frac{1}{n(n+1)}$.

**Given:** An infinite series $\sum_{n=1}^\infty a_n$ where $a_n = \frac{1}{n(n+1)}$.
**Want:** The sum of the series, if it converges.

**Step 1: Decompose the term $a_n$ using partial fractions.**
The general form for $\frac{1}{n(n+1)}$ is $\frac{A}{n} + \frac{B}{n+1}$.
$$ \frac{1}{n(n+1)} = \frac{A}{n} + \frac{B}{n+1} $$
Multiply both sides by $n(n+1)$ to clear denominators:
$$ 1 = A(n+1) + Bn $$
To find $A$, set $n=0$:
$$ 1 = A(0+1) + B(0) \implies 1 = A $$
To find $B$, set $n=-1$:
$$ 1 = A(-1+1) + B(-1) \implies 1 = -B \implies B = -1 $$
So, the term $a_n$ can be rewritten as:
$$ a_n = \frac{1}{n} - \frac{1}{n+1} $$
*Explanation:* We use partial fraction decomposition to express the complex fraction as a difference of two simpler fractions. This is the key step to revealing the telescoping pattern.

**Step 2: Write out the $n$-th partial sum, $S_n$.**
The partial sum $S_n$ is the sum of the first $n$ terms:
$$ S_n = \sum_{k=1}^n a_k = \sum_{k=1}^n \left(\frac{1}{k} - \frac{1}{k+1}\right) $$
Now, let's write out the terms explicitly:
$$ S_n = \left(\frac{1}{1} - \frac{1}{2}\right) \quad \text{ (for } k=1 \text{)} $$
$$ \qquad + \left(\frac{1}{2} - \frac{1}{3}\right) \quad \text{ (for } k=2 \text{)} $$
$$ \qquad + \left(\frac{1}{3} - \frac{1}{4}\right) \quad \text{ (for } k=3 \text{)} $$
$$ \qquad + \dots $$
$$ \qquad + \left(\frac{1}{n-1} - \frac{1}{n}\right) \quad \text{ (for } k=n-1 \text{)} $$
$$ \qquad + \left(\frac{1}{n} - \frac{1}{n+1}\right) \quad \text{ (for } k=n \text{)} $$
*Explanation:* We are writing out each term $a_k$ in its new "difference" form and arranging them to clearly see the cancellation.

**Step 3: Identify the cancelling terms and simplify $S_n$.**
Observe the pattern of cancellation:
$$ S_n = \left(1 - \cancel{\frac{1}{2}}\right) + \left(\cancel{\frac{1}{2}} - \cancel{\frac{1}{3}}\right) + \left(\cancel{\frac{1}{3}} - \cancel{\frac{1}{4}}\right) + \dots + \left(\cancel{\frac{1}{n}} - \frac{1}{n+1}\right) $$
All intermediate terms cancel out. The only terms remaining are the first part of the first term and the second part of the last term.
$$ S_n = 1 - \frac{1}{n+1} $$
*Explanation:* This is the "telescoping" step. The structure $b_k - b_{k+1}$ ensures that the $-b_{k+1}$ from one term cancels the $+b_{k+1}$ from the next term.

**Step 4: Take the limit of $S_n$ as $n \to \infty$.**
To find the sum of the infinite series, we evaluate the limit of the partial sum:
$$ \sum_{n=1}^\infty \frac{1}{n(n+1)} = \lim_{n \to \infty} S_n = \lim_{n \to \infty} \left(1 - \frac{1}{n+1}\right) $$
As $n \to \infty$, the term $\frac{1}{n+1}$ approaches $0$.
$$ \lim_{n \to \infty} \left(1 - \frac{1}{n+1}\right) = 1 - 0 = 1 $$
*Explanation:* If the limit of the partial sums exists and is finite, the series converges to that value. Here, it converges to 1.

**Final Answer:**
The sum of the series is $\boxed{1}$.

*Reflection:* This example is a classic. The trickiest part is often the partial fraction decomposition. Once that's done, the cancellation pattern for $b_k - b_{k+1}$ is straightforward.

---

### Example 2: Slightly More Complex Partial Fraction Decomposition

**Problem:** Find the sum of the series $\sum_{n=1}^\infty \frac{2}{n^2+2n}$.

**Given:** An infinite series $\sum_{n=1}^\infty a_n$ where $a_n = \frac{2}{n^2+2n}$.
**Want:** The sum of the series, if it converges.

**Step 1: Decompose the term $a_n$ using partial fractions.**
First, factor the denominator: $n^2+2n = n(n+2)$.
The general form for $\frac{2}{n(n+2)}$ is $\frac{A}{n} + \frac{B}{n+2}$.
$$ \frac{2}{n(n+2)} = \frac{A}{n} + \frac{B}{n+2} $$
Multiply both sides by $n(n+2)$:
$$ 2 = A(n+2) + Bn $$
To find $A$, set $n=0$:
$$ 2 = A(0+2) + B(0) \implies 2 = 2A \implies A = 1 $$
To find $B$, set $n=-2$:
$$ 2 = A(-2+2) + B(-2) \implies 2 = -2B \implies B = -1 $$
So, the term $a_n$ can be rewritten as:
$$ a_n = \frac{1}{n} - \frac{1}{n+2} $$
*Explanation:* Again, partial fraction decomposition is used. Notice here the difference is between $b_n = \frac{1}{n}$ and $b_{n+2} = \frac{1}{n+2}$. This means the cancellation will be "offset" by two terms.

**Step 2: Write out the $n$-th partial sum, $S_n$.**
$$ S_n = \sum_{k=1}^n \left(\frac{1}{k} - \frac{1}{k+2}\right) $$
Let's write out the terms explicitly, paying attention to the offset:
$$ k=1: \quad \left(\frac{1}{1} - \frac{1}{3}\right) $$
$$ k=2: \quad \left(\frac{1}{2} - \frac{1}{4}\right) $$
$$ k=3: \quad \left(\frac{1}{3} - \frac{1}{5}\right) $$
$$ k=4: \quad \left(\frac{1}{4} - \frac{1}{6}\right) $$
$$ \dots $$
$$ k=n-1: \quad \left(\frac{1}{n-1} - \frac{1}{n+1}\right) $$
$$ k=n: \quad \left(\frac{1}{n} - \frac{1}{n+2}\right) $$
*Explanation:* We're expanding the sum. Because the difference is $b_k - b_{k+2}$, the cancellation won't be between adjacent terms. The $-\frac{1}{3}$ from $k=1$ will cancel with the $+\frac{1}{3}$ from $k=3$.

**Step 3: Identify the cancelling terms and simplify $S_n$.**
Let's re-arrange and show cancellation:
$$ S_n = \left(1 - \cancel{\frac{1}{3}}\right) $$
$$ \qquad + \left(\frac{1}{2} - \cancel{\frac{1}{4}}\right) $$
$$ \qquad + \left(\cancel{\frac{1}{3}} - \cancel{\frac{1}{5}}\right) $$
$$ \qquad + \left(\cancel{\frac{1}{4}} - \cancel{\frac{1}{6}}\right) $$
$$ \qquad + \dots $$
$$ \qquad + \left(\cancel{\frac{1}{n-1}} - \frac{1}{n+1}\right) $$
$$ \qquad + \left(\cancel{\frac{1}{n}} - \frac{1}{n+2}\right) $$
The terms that *don't* cancel are:
From the beginning: $1$ and $\frac{1}{2}$.
From the end: $-\frac{1}{n+1}$ and $-\frac{1}{n+2}$.
So, the simplified partial sum is:
$$ S_n = 1 + \frac{1}{2} - \frac{1}{n+1} - \frac{1}{n+2} $$
$$ S_n = \frac{3}{2} - \frac{1}{n+1} - \frac{1}{n+2} $$
*Explanation:* This is where the offset $c=2$ comes into play. The first two terms of the sequence $b_k$ (namely $b_1$ and $b_2$) remain, and the last two terms of the sequence $b_{k+2}$ (namely $b_{n+1}$ and $b_{n+2}$) remain, but with negative signs.

**Step 4: Take the limit of $S_n$ as $n \to \infty$.**
$$ \sum_{n=1}^\infty \frac{2}{n^2+2n} = \lim_{n \to \infty} S_n = \lim_{n \to \infty} \left(\frac{3}{2} - \frac{1}{n+1} - \frac{1}{n+2}\right) $$
As $n \to \infty$, both $\frac{1}{n+1}$ and $\frac{1}{n+2}$ approach $0$.
$$ \lim_{n \to \infty} \left(\frac{3}{2} - \frac{1}{n+1} - \frac{1}{n+2}\right) = \frac{3}{2} - 0 - 0 = \frac{3}{2} $$
*Explanation:* The series converges because its partial sums approach a finite value.

**Final Answer:**
The sum of the series is $\boxed{\frac{3}{2}}$.

*Reflection:* The key challenge here was the offset in the partial fraction decomposition, leading to more terms remaining at the beginning and end of the partial sum. Always write out enough terms to clearly see the cancellation pattern when $c > 1$.

---

### Example 3: Logarithmic Series

**Problem:** Find the sum of the series $\sum_{n=1}^\infty \ln\left(1 + \frac{1}{n}\right)$.

**Given:** An infinite series $\sum_{n=1}^\infty a_n$ where $a_n = \ln\left(1 + \frac{1}{n}\right)$.
**Want:** The sum of the series, if it converges.

**Step 1: Rewrite the term $a_n$ using logarithm properties.**
First, simplify the expression inside the logarithm:
$$ 1 + \frac{1}{n} = \frac{n}{n} + \frac{1}{n} = \frac{n+1}{n} $$
Now, apply the logarithm property $\ln(A/B) = \ln A - \ln B$:
$$ a_n = \ln\left(\frac{n+1}{n}\right) = \ln(n+1) - \ln(n) $$
This is in the form $b_{n+1} - b_n$, where $b_n = \ln(n)$.
*Explanation:* This problem tests your knowledge of logarithm properties. Rewriting the term in this way immediately reveals the telescoping structure.

**Step 2: Write out the $n$-th partial sum, $S_n$.**
$$ S_n = \sum_{k=1}^n (\ln(k+1) - \ln(k)) $$
Let's write out the terms explicitly:
$$ k=1: \quad (\ln(2) - \ln(1)) $$
$$ k=2: \quad (\ln(3) - \ln(2)) $$
$$ k=3: \quad (\ln(4) - \ln(3)) $$
$$ \dots $$
$$ k=n-1: \quad (\ln(n) - \ln(n-1)) $$
$$ k=n: \quad (\ln(n+1) - \ln(n)) $$
*Explanation:* We're expanding the sum. Since $\ln(1) = 0$, the first term simplifies.

**Step 3: Identify the cancelling terms and simplify $S_n$.**
Observe the pattern of cancellation:
$$ S_n = \left(\cancel{\ln(2)} - \ln(1)\right) $$
$$ \qquad + \left(\cancel{\ln(3)} - \cancel{\ln(2)}\right) $$
$$ \qquad + \left(\cancel{\ln(4)} - \cancel{\ln(3)}\right) $$
$$ \qquad + \dots $$
$$ \qquad + \left(\cancel{\ln(n)} - \cancel{\ln(n-1)}\right) $$
$$ \qquad + \left(\ln(n+1) - \cancel{\ln(n)}\right) $$
The terms that don't cancel are:
From the beginning: $-\ln(1)$.
From the end: $+\ln(n+1)$.
So, the simplified partial sum is:
$$ S_n = -\ln(1) + \ln(n+1) $$
Since $\ln(1) = 0$:
$$ S_n = \ln(n+1) $$
*Explanation:* The cancellation is very clean, leaving only the last positive term and the first negative term.

**Step 4: Take the limit of $S_n$ as $n \to \infty$.**
$$ \sum_{n=1}^\infty \ln\left(1 + \frac{1}{n}\right) = \lim_{n \to \infty} S_n = \lim_{n \to \infty} \ln(n+1) $$
As $n \to \infty$, $n+1$ approaches $\infty$, and $\ln(\infty)$ also approaches $\infty$.
$$ \lim_{n \to \infty} \ln(n+1) = \infty $$
*Explanation:* The limit of the partial sums does not exist (it goes to infinity), so the series diverges.

**Final Answer:**
The series $\sum_{n=1}^\infty \ln\left(1 + \frac{1}{n}\right)$ **diverges**.

*Reflection:* This example shows that not all telescoping series converge. The convergence depends entirely on the behavior of the remaining terms as $n \to \infty$. Here, $\ln(n+1)$ grows without bound.

---

### Example 4: Series with a different starting index and $c=2$ offset

**Problem:** Find the sum of the series $\sum_{n=2}^\infty \left(\frac{1}{\sqrt{n-1}} - \frac{1}{\sqrt{n+1}}\right)$.

**Given:** An infinite series $\sum_{n=2}^\infty a_n$ where $a_n = \frac{1}{\sqrt{n-1}} - \frac{1}{\sqrt{n+1}}$.
**Want:** The sum of the series, if it converges.

**Step 1: Identify the difference structure.**
The term $a_n$ is already in the form $b_n - b_{n+c}$.
Let $b_k = \frac{1}{\sqrt{k-1}}$. Then $b_{k+2} = \frac{1}{\sqrt{(k+2)-1}} = \frac{1}{\sqrt{k+1}}$.
So, $a_n = b_n - b_{n+2}$ (if we redefine $b_k = \frac{1}{\sqrt{k}}$ and shift indices, it's $\frac{1}{\sqrt{n-1}} - \frac{1}{\sqrt{(n-1)+2}}$).
More straightforwardly, let $f(k) = \frac{1}{\sqrt{k}}$. Then $a_n = f(n-1) - f(n+1)$.
*Explanation:* This problem is set up so the difference form is immediately obvious. The key is to notice the index difference of 2 ($n-1$ vs $n+1$).

**Step 2: Write out the $n$-th partial sum, $S_n$, starting from $n=2$.**
$$ S_n = \sum_{k=2}^n \left(\frac{1}{\sqrt{k-1}} - \frac{1}{\sqrt{k+1}}\right) $$
Let's write out the terms explicitly:
$$ k=2: \quad \left(\frac{1}{\sqrt{1}} - \frac{1}{\sqrt{3}}\right) $$
$$ k=3: \quad \left(\frac{1}{\sqrt{2}} - \frac{1}{\sqrt{4}}\right) $$
$$ k=4: \quad \left(\frac{1}{\sqrt{3}} - \frac{1}{\sqrt{5}}\right) $$
$$ k=5: \quad \left(\frac{1}{\sqrt{4}} - \frac{1}{\sqrt{6}}\right) $$
$$ \dots $$
$$ k=n-1: \quad \left(\frac{1}{\sqrt{n-2}} - \frac{1}{\sqrt{n}}\right) $$
$$ k=n: \quad \left(\frac{1}{\sqrt{n-1}} - \frac{1}{\sqrt{n+1}}\right) $$
*Explanation:* Be extra careful with the starting index $k=2$ and the $n-1$ in the denominator. This means the first term is $\frac{1}{\sqrt{2-1}} = \frac{1}{\sqrt{1}}$.

**Step 3: Identify the cancelling terms and simplify $S_n$.**
Let's re-arrange and show cancellation. The $-\frac{1}{\sqrt{3}}$ from $k=2$ cancels with the $+\frac{1}{\sqrt{3}}$ from $k=4$. The $-\frac{1}{\sqrt{4}}$ from $k=3$ cancels with the $+\frac{1}{\sqrt{4}}$ from $k=5$. This is a $c=2$ offset cancellation.
$$ S_n = \left(\frac{1}{\sqrt{1}} - \cancel{\frac{1}{\sqrt{3}}}\right) $$
$$ \qquad + \left(\frac{1}{\sqrt{2}} - \cancel{\frac{1}{\sqrt{4}}}\right) $$
$$ \qquad + \left(\cancel{\frac{1}{\sqrt{3}}} - \cancel{\frac{1}{\sqrt{5}}}\right) $$
$$ \qquad + \left(\cancel{\frac{1}{\sqrt{4}}} - \cancel{\frac{1}{\sqrt{6}}}\right) $$
$$ \qquad + \dots $$
$$ \qquad + \left(\cancel{\frac{1}{\sqrt{n-2}}} - \cancel{\frac{1}{\sqrt{n}}}\right) \quad \text{(This is the term for } k=n-1 \text{)} $$
$$ \qquad + \left(\cancel{\frac{1}{\sqrt{n-1}}} - \frac{1}{\sqrt{n+1}}\right) \quad \text{(This is the term for } k=n \text{)} $$
The terms that *don't* cancel are:
From the beginning: $\frac{1}{\sqrt{1}}$ and $\frac{1}{\sqrt{2}}$.
From the end: $-\frac{1}{\sqrt{n}}$ (from $k=n-1$) and $-\frac{1}{\sqrt{n+1}}$ (from $k=n$).
So, the simplified partial sum is:
$$ S_n = \frac{1}{\sqrt{1}} + \frac{1}{\sqrt{2}} - \frac{1}{\sqrt{n}} - \frac{1}{\sqrt{n+1}} $$
$$ S_n = 1 + \frac{1}{\sqrt{2}} - \frac{1}{\sqrt{n}} - \frac{1}{\sqrt{n+1}} $$
*Explanation:* Because of the $c=2$ offset, the first *two* terms of the $b_k$ sequence (corresponding to $k=2$ and $k=3$) remain, and the last *two* terms of the $b_{k+2}$ sequence (corresponding to $k=n$ and $k=n-1$) remain with negative signs.

**Step 4: Take the limit of $S_n$ as $n \to \infty$.**
$$ \sum_{n=2}^\infty \left(\frac{1}{\sqrt{n-1}} - \frac{1}{\sqrt{n+1}}\right) = \lim_{n \to \infty} S_n = \lim_{n \to \infty} \left(1 + \frac{1}{\sqrt{2}} - \frac{1}{\sqrt{n}} - \frac{1}{\sqrt{n+1}}\right) $$
As $n \to \infty$, both $\frac{1}{\sqrt{n}}$ and $\frac{1}{\sqrt{n+1}}$ approach $0$.
$$ \lim_{n \to \infty} \left(1 + \frac{1}{\sqrt{2}} - \frac{1}{\sqrt{n}} - \frac{1}{\sqrt{n+1}}\right) = 1 + \frac{1}{\sqrt{2}} - 0 - 0 = 1 + \frac{1}{\sqrt{2}} $$
*Explanation:* The series converges to a finite value.

**Final Answer:**
The sum of the series is $\boxed{1 + \frac{1}{\sqrt{2}}}$.

*Reflection:* This example highlights two key complexities: a starting index other than 1, and an offset ($c=2$) in the difference pattern. Both require careful expansion of the partial sum to correctly identify the remaining terms.

## 6. Common mistakes and traps

1.  **Incorrect Partial Fraction Decomposition:** This is the most frequent stumbling block. A single sign error or incorrect constant in the decomposition will lead to an entirely wrong cancellation pattern and sum. Always double-check your algebraic steps.
2.  **Errors in Expanding Partial Sums (Especially with Offset Indices):** When the difference is $b_k - b_{k+c}$ where $c > 1$, students often incorrectly assume only one term remains at each end. You must write out enough terms (at least $c+1$ terms at the beginning and end) to clearly see the cancellation.
3.  **Forgetting to Take the Limit:** The partial sum $S_n$ is just an intermediate step. For an infinite series, you *must* take the limit $\lim_{n \to \infty} S_n$ to find the actual sum. Without this step, your answer is incomplete or incorrect.
4.  **Incorrectly Identifying Remaining Terms:** After cancellation, make sure you've accounted for *all* terms that didn't cancel. This includes terms at the very beginning and very end of the expanded sum.
5.  **Assuming All Series with Fractions are Telescoping:** Not every series that involves fractions or looks like it *could* be simplified by partial fractions is a telescoping series. The crucial characteristic is the $b_k - b_{k+c}$ difference pattern. For instance, $\sum \frac{1}{n^2}$ is not telescoping and converges to $\frac{\pi^2}{6}$, which is not easily found by simple cancellation.
6.  **Misinterpreting the Starting Index:** If the series starts at $n=0$ or $n=2$ (or any value other than 1), make sure your partial sum reflects that starting point. The remaining terms will depend on the initial index.

## 7. Textbook-precise explanation

A **series** is an expression of the form $\sum_{k=m}^\infty a_k = a_m + a_{m+1} + a_{m+2} + \dots$.
The **$n$-th partial sum** of this series is denoted by $S_n = \sum_{k=m}^n a_k$.
A series $\sum_{k=m}^\infty a_k$ is said to **converge** if the sequence of its partial sums $\{S_n\}$ converges to a finite limit $L$, i.e., $\lim_{n \to \infty} S_n = L$. If the limit does not exist or is infinite, the series **diverges**.

A series $\sum_{k=m}^\infty a_k$ is called a **telescoping series** if each term $a_k$ can be expressed as the difference of two consecutive terms of some sequence $\{b_k\}$. Specifically, if $a_k = b_k - b_{k+1}$ (or more generally, $a_k = b_k - b_{k+c}$ for some integer $c \ge 1$), then its $n$-th partial sum can be simplified due to cancellation.

For the case $a_k = b_k - b_{k+1}$, the $n$-th partial sum is:
$$ S_n = \sum_{k=m}^n (b_k - b_{k+1}) $$
Expanding this sum, we get:
$$ S_n = (b_m - b_{m+1}) + (b_{m+1} - b_{m+2}) + (b_{m+2} - b_{m+3}) + \dots + (b_{n-1} - b_n) + (b_n - b_{n+1}) $$
Due to the cancellation of intermediate terms (where $-b_{k+1}$ cancels with $+b_{k+1}$), the partial sum simplifies to:
$$ S_n = b_m - b_{n+1} $$
The sum of the infinite telescoping series is then found by taking the limit of the partial sum:
$$ \sum_{k=m}^\infty a_k = \lim_{n \to \infty} S_n = \lim_{n \to \infty} (b_m - b_{n+1}) = b_m - \lim_{n \to \infty} b_{n+1} $$
The series converges if and only if $\lim_{n \to \infty} b_{n+1}$ (or $\lim_{n \to \infty} b_n$) exists and is finite. If this limit is finite, the sum of the series is $b_m - L_b$, where $L_b = \lim_{n \to \infty} b_{n+1}$.

For the more general case $a_k = b_k - b_{k+c}$ where $c \ge 1$:
$$ S_n = \sum_{k=m}^n (b_k - b_{k+c}) $$
Expanding this sum, the terms that remain are the first $c$ terms of the sequence $\{b_k\}$ and the last $c$ terms of the sequence $\{b_{k+c}\}$ (with negative signs):
$$ S_n = (b_m + b_{m+1} + \dots + b_{m+c-1}) - (b_{n+1} + b_{n+2} + \dots + b_{n+c}) $$
The sum of the infinite series is:
$$ \sum_{k=m}^\infty a_k = \lim_{n \to \infty} S_n = (b_m + b_{m+1} + \dots + b_{m+c-1}) - \lim_{n \to \infty} (b_{n+1} + b_{n+2} + \dots + b_{n+c}) $$
This series converges if and only if $\lim_{n \to \infty} b_n$ exists and is finite. If $\lim_{n \to \infty} b_n = L_b$, then the sum is $(b_m + b_{m+1} + \dots + b_{m+c-1}) - c \cdot L_b$.

*(Referenced concepts can be found in: Stewart, Calculus: Early Transcendentals, 9th ed., Chapter 11.2; Thomas' Calculus, 14th ed., Chapter 10.2)*

## 8. ASCII diagrams

Here's a visual representation of the cancellation in a telescoping series of the form $b_k - b_{k+1}$:

```text
  Terms in the series:
  (b_1 - b_2)
+ (b_2 - b_3)
+ (b_3 - b_4)
+ (b_4 - b_5)
+ ...
+ (b_n - b_{n+1})
---------------------
  Expanded sum:
  b_1 - b_2
      + b_2 - b_3
            + b_3 - b_4
                  + b_4 - b_5
                        + ...
                              + b_n - b_{n+1}
---------------------
  Cancellation:
  b_1 - b_2
      /     \
    + b_2 - b_3
          /     \
        + b_3 - b_4
              /     \
            + b_4 - b_5
                  /     \
                + ...
                      /     \
                    + b_n - b_{n+1}
---------------------
  Remaining terms:
  b_1           - b_{n+1}
```
*Description:* The diagram illustrates the terms of the partial sum $S_n$. Each line represents a term $a_k = b_k - b_{k+1}$. The diagonal lines show how the negative part of one term (e.g., $-b_2$) cancels out the positive part of the next term (e.g., $+b_2$). This "domino effect" continues until only the first term ($b_1$) and the last term ($-b_{n+1}$) remain.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Think of a **collapsing spyglass (telescope)**. When you extend it, you see many segments. But when you collapse it, almost all the inner segments disappear, leaving only the very first and very last parts visible. This directly mirrors how most intermediate terms in the sum cancel out, leaving only a few beginning and ending terms.
    Another image: **Domino Effect of Cancellation**. Each term is like a domino that, when it falls, knocks over the next one, which in turn cancels out a part of itself, until only the first and last dominoes are left standing (or parts of them).

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **The Signature Form:** A telescoping series term $a_k$ always simplifies to $b_k - b_{k+c}$ for some sequence $b_k$ and integer $c \ge 1$. (You often need partial fractions or log rules to get to this form.)
    *   **The Partial Sum $S_n$ (for $c=1$):** If $a_k = b_k - b_{k+1}$, then $S_n = b_{\text{first index}} - b_{n+1}$. (Be careful with the starting index $m$ of the series).
    *   **The Sum:** $\sum_{k=m}^\infty a_k = \lim_{n \to \infty} S_n$. This step is crucial for convergence.

3.  **Spaced-Repetition Schedule:**
    *   **1 Day:** Review the definition and the first basic example (Example 1). Try to re-derive it without looking.
    *   **3 Days:** Review all examples, paying special attention to the offset cancellation (Example 2, 4) and divergence (Example 3).
    *   **7 Days:** Attempt a few new problems from a textbook or online. Focus on setting up the partial sum correctly.
    *   **16 Days:** Revisit the "What could go wrong" section and common mistakes. Try to anticipate traps before solving problems.
    *   **35 Days:** Explain the concept of telescoping series, including its derivation and applications, to an imaginary friend or rubber duck. This active recall solidifies understanding.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the simplified partial sum formula, you can always rebuild it from first principles:
    1.  **Start with the definition of a series and its $n$-th partial sum:** $S_n = \sum_{k=m}^n a_k$.
    2.  **Assume the telescoping form:** Let $a_k = b_k - b_{k+c}$.
    3.  **Write out the terms explicitly:** Expand $S_n = (b_m - b_{m+c}) + (b_{m+1} - b_{m+1+c}) + \dots + (b_n - b_{n+c})$.
    4.  **Identify the cancellation pattern:** Systematically cross out terms that cancel. For $c=1$, it's adjacent terms. For $c=2$, it's terms separated by one.
    5.  **Collect the remaining terms:** Carefully list the terms that are left at the beginning and end of the sum. This will give you the simplified $S_n$.
    6.  **Take the limit:** Apply $\lim_{n \to \infty}$ to $S_n$ to find the series sum.
    This process ensures you understand *why* the formula works, rather than just memorizing it.

## 10. Connections — what this leads to

Understanding telescoping series is more than just learning a specific technique; it builds intuition for how infinite sums behave and connects to several broader mathematical concepts:

*   **Convergence Tests for Series:** Telescoping series are one of the very few types of series (along with geometric series) for which we can find the *exact* sum. For most other series, we can only determine if they *converge* or *diverge* using various convergence tests (e.g., Integral Test, Comparison Test, Ratio Test, Root Test, Alternating Series Test). The process of evaluating $\lim S_n$ in telescoping series reinforces the fundamental definition of series convergence, which underpins all these tests.
*   **Partial Fraction Decomposition:** The frequent use of partial fraction decomposition in telescoping series problems highlights its importance in calculus, not just for integration but also for algebraic manipulation of series terms.
*   **Discrete Calculus and Finite Differences:** The structure $b_k - b_{k+1}$ is a discrete analogue of a derivative. In discrete calculus, the "forward difference operator" $\Delta$ is defined as $\Delta b_k = b_{k+1} - b_k$. A telescoping series is essentially the sum of finite differences, and just as integration is the inverse of differentiation, summation is the inverse of differencing. This concept is fundamental in areas like numerical analysis and combinatorics.
*   **Z-Transforms (in Signal Processing):** In digital signal processing, Z-transforms are used to analyze discrete-time signals and systems. The inverse Z-transform often involves partial fraction decomposition and sums that can sometimes exhibit telescoping properties, especially when dealing with rational functions of $z$.
*   **Generating Functions:** In combinatorics, generating functions are power series whose coefficients encode information about a sequence. Manipulating and summing these series can sometimes involve techniques akin to telescoping, especially when dealing with identities involving sums.
*   **Analytic Number Theory (Riemann Zeta Function):** While not directly telescoping, the study of series like $\sum \frac{1}{n^s}$ (the Riemann Zeta function) relies on deep understanding of series convergence and properties, building on the foundational concepts introduced by simpler series like telescoping ones.

## 11. Self-check questions

1.  Calculate the sum of the series $\sum_{n=1}^\infty \frac{1}{(n+1)(n+2)}$.
2.  Determine if the series $\sum_{n=1}^\infty \left(\frac{1}{n^2} - \frac{1}{(n+1)^2}\right)$ converges, and if so, find its sum.
3.  Find the sum of the series $\sum_{n=0}^\infty \left(\arctan(n+1) - \arctan(n)\right)$. (Recall $\arctan(0)=0$).
4.  Evaluate the sum of the series $\sum_{n=1}^\infty \ln\left(\frac{n(n+2)}{(n+1)^2}\right)$.
5.  Consider the series $\sum_{n=1}^\infty \frac{1}{n(n+1)(n+2)}$. Can this be represented as a telescoping series? If so, find its sum. (Hint: You might need a slightly more complex partial fraction decomposition).