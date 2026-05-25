## 1. What it is — in plain English

Imagine you have a magic rubber ball. You drop it from a height, and it bounces back up, but only to half the height it fell from. Then it falls again and bounces to half *that* height, and so on. The heights it reaches are 10 feet, then 5 feet, then 2.5 feet, then 1.25 feet, and so on. This list of numbers, where each number is found by multiplying the previous one by a fixed fraction (in this case, 1/2), is called a **geometric sequence**.

Now, what if you wanted to know the *total distance* the ball travels? You'd add up all those heights: 10 + 5 + 2.5 + 1.25 + ... This act of adding up all the numbers in a geometric sequence, even if there are infinitely many of them, is called a **geometric series**.

The amazing thing about some of these infinite sums is that even though you're adding more and more numbers forever, the total sum doesn't grow infinitely large. Instead, it settles down to a specific, finite value. It's like adding tiny and tinier amounts, so small that they eventually don't make a difference to the grand total.

This lesson is about figuring out exactly *when* an infinite geometric series will settle down to a finite number (we say it "converges") and, if it does, what that total sum will be. It also covers the proof that explains why this condition holds true.

## 2. Why it matters — real-world applications

Geometric series are not just abstract mathematical constructs; they appear in countless real-world scenarios across various disciplines. Understanding their convergence is crucial for modeling and predicting outcomes in many fields.

1.  **Finance and Economics (Compound Interest & Annuities):** When you invest money that earns compound interest, the value of your investment grows geometrically. Similarly, calculating the present value of an annuity (a series of equal payments made at regular intervals) often involves summing a geometric series. For example, determining the total amount accumulated in a savings plan where regular deposits are made, and each deposit earns interest, relies on this concept. Financial institutions, actuaries, and individual investors use this to plan for retirement, calculate loan payments, and evaluate investments.

2.  **Physics (Bouncing Objects & Optical Resonators):** The classic example of a bouncing ball, where each bounce reaches a fraction of the previous height, is a direct application. If you want to calculate the total vertical distance the ball travels before it comes to rest, you sum an infinite geometric series. In advanced physics, the behavior of light in an optical resonator (like those used in lasers) involves light waves reflecting back and forth, losing a fraction of their intensity with each reflection. The total intensity of light inside the resonator can be modeled by a convergent geometric series.

3.  **Medicine and Pharmacology (Drug Dosage & Decay):** When a patient takes a regular dose of medication, the drug accumulates in their system. If the body eliminates a certain fraction of the drug between doses, the total amount of drug in the bloodstream at any given time can be modeled using geometric series. Understanding the convergence condition helps determine if the drug level will stabilize at a safe and effective concentration or if it will accumulate to toxic levels. Similarly, radioactive decay, where a fixed fraction of a substance decays over a period, can be analyzed using geometric series concepts over discrete time steps.

4.  **Computer Science and Engineering (Algorithm Analysis & Signal Processing):** In algorithm analysis, the runtime complexity of certain recursive algorithms can sometimes be expressed as a geometric series. For instance, analyzing the efficiency of algorithms like merge sort or quicksort might involve sums that resemble geometric series. In digital signal processing, the response of filters to certain inputs can also involve geometric series. The concept of infinite impulse response (IIR) filters, for example, often relies on the stability condition of geometric series (i.e., $|r|<1$) to ensure the output remains bounded.

5.  **Fractal Geometry:** Many fractals, such as the Koch snowflake or the Sierpinski gasket, are constructed iteratively. Calculating properties like their perimeter or area often involves summing infinite geometric series. For example, the perimeter of the Koch snowflake, as it is constructed through infinite iterations, turns out to be an infinite geometric series that diverges, while its area converges. This demonstrates how the convergence condition is critical in understanding the properties of these complex geometric shapes.

## 3. Prerequisites — what you must know first

Before diving into geometric series, ensure you have a solid grasp of these foundational concepts:

*   **Sequences:** An ordered list of numbers, often defined by a rule or formula for its $n$-th term.
*   **Series:** The sum of the terms of a sequence, typically denoted using summation notation ($\sum$).
*   **Partial Sums:** The sum of the first $n$ terms of a series, denoted as $S_n$. This is a crucial intermediate step before considering infinite sums.
*   **Limits of Sequences:** The behavior of a sequence as $n$ approaches infinity, specifically how to evaluate $\lim_{n \to \infty} r^n$. This is fundamental to determining convergence.
*   **Algebraic Manipulation:** Proficiency in factoring, distributing, solving equations, and working with fractions is essential for deriving formulas and simplifying expressions.
*   **Summation Notation ($\sum$):** Understanding how to read and write sums using sigma notation, including different starting and ending indices.

## 4. The core idea — step by step

Let's break down the concept of geometric series, its sum, and its convergence conditions systematically.

### Step 1: What is a geometric sequence?

**Plain-English Statement:** A geometric sequence is a list of numbers where each term after the first is found by multiplying the previous one by a fixed, non-zero number. This fixed multiplier is called the "common ratio."

**Small Concrete Example:** Consider the sequence $3, 6, 12, 24, 48, \dots$.
Here, to get from 3 to 6, we multiply by 2. To get from 6 to 12, we multiply by 2, and so on. The common ratio is 2. The first term is 3.

**Formal/Mathematical Version:** A geometric sequence can be written as:
$$a, ar, ar^2, ar^3, \dots, ar^{n-1}, \dots$$
where $a$ is the first term and $r$ is the common ratio.
The $n$-th term (starting with $n=1$) is given by $a_n = ar^{n-1}$.
Alternatively, if we start indexing from $n=0$, the terms are $a_0=a, a_1=ar, a_2=ar^2, \dots$, and the $n$-th term is $a_n = ar^n$. We will generally use this $n=0$ indexing for series.

**What Could Go Wrong:** You might confuse a geometric sequence with an arithmetic sequence. In an arithmetic sequence, you *add* a fixed number (the common difference) to get the next term, whereas in a geometric sequence, you *multiply* by a fixed number (the common ratio). Forgetting that the common ratio $r$ must be non-zero is also a potential oversight, as $r=0$ would make all terms after the first zero.

### Step 2: What is a geometric series?

**Plain-English Statement:** A geometric series is simply the sum of the terms of a geometric sequence. We are interested in *infinite* geometric series, where we try to sum an endless list of numbers.

**Small Concrete Example:** For the sequence $3, 6, 12, 24, \dots$, the corresponding geometric series would be $3 + 6 + 12 + 24 + \dots$.
For the sequence $1, \frac{1}{2}, \frac{1}{4}, \frac{1}{8}, \dots$, the geometric series is $1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \dots$.

**Formal/Mathematical Version:** An infinite geometric series can be written using summation notation:
$$ \sum_{n=0}^{\infty} ar^n = a + ar + ar^2 + ar^3 + \dots $$
Here, $a$ is the first term (when $n=0$), and $r$ is the common ratio.
(Note: Sometimes you'll see it starting at $n=1$, like $\sum_{n=1}^{\infty} ar^{n-1}$. This is the same series, just with a shifted index.)

**What Could Go Wrong:** Incorrectly identifying the first term $a$ or the common ratio $r$ from a given series, especially if the series doesn't start at $n=0$ or $n=1$, or if it's written in a non-standard form. Forgetting that $a$ is specifically the *first term* of the series (corresponding to the starting index).

### Step 3: The partial sum $S_n$

**Plain-English Statement:** Since we can't directly add up an infinite number of terms, we first consider adding up only a *finite* number of terms. This finite sum is called a "partial sum." If these partial sums approach a specific finite number as we add more and more terms, then the infinite series "converges."

**Small Concrete Example:** For the series $1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \dots$:
The first partial sum is $S_1 = 1$.
The second partial sum is $S_2 = 1 + \frac{1}{2} = 1.5$.
The third partial sum is $S_3 = 1 + \frac{1}{2} + \frac{1}{4} = 1.75$.
The fourth partial sum is $S_4 = 1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} = 1.875$.
Notice how these sums are getting closer and closer to 2.

**Formal/Mathematical Version:** The $n$-th partial sum of a geometric series is the sum of its first $n$ terms. For a series $\sum_{k=0}^{\infty} ar^k$, the $n$-th partial sum is:
$$ S_n = a + ar + ar^2 + \dots + ar^{n-1} = \sum_{k=0}^{n-1} ar^k $$
The convergence of the infinite series is then defined as the limit of these partial sums:
$$ \sum_{k=0}^{\infty} ar^k = \lim_{n \to \infty} S_n $$
If this limit exists and is a finite number, the series converges. Otherwise, it diverges.

**What Could Go Wrong:** An "off-by-one" error in the upper limit of the summation for $S_n$. If the series starts at $n=0$, the sum of the first $n$ terms goes up to $ar^{n-1}$, not $ar^n$. This is a common source of confusion.

### Step 4: Deriving the formula for $S_n$

**Plain-English Statement:** There's a clever trick to find a simple formula for the sum of the first $n$ terms of a geometric series. By writing the sum, then multiplying it by the common ratio and subtracting the two expressions, most of the terms cancel out, leaving a concise formula.

**Small Concrete Example:** Let's find $S_n$ for $a=1, r=2$: $S_n = 1 + 2 + 4 + \dots + 2^{n-1}$.
$S_n = 1 + 2 + 4 + \dots + 2^{n-1}$ (Equation 1)
Multiply by $r=2$: $2S_n = 2 + 4 + 8 + \dots + 2^{n-1} + 2^n$ (Equation 2)
Subtract (Equation 1) from (Equation 2):
$2S_n - S_n = (2 + 4 + \dots + 2^{n-1} + 2^n) - (1 + 2 + 4 + \dots + 2^{n-1})$
$S_n = 2^n - 1$.
This is the formula for this specific series. The general derivation follows the same logic.

**Formal/Mathematical Version:**
Let $S_n = a + ar + ar^2 + \dots + ar^{n-1}$ (Equation 1)

Multiply both sides by the common ratio $r$:
$rS_n = ar + ar^2 + ar^3 + \dots + ar^{n-1} + ar^n$ (Equation 2)

Now, subtract Equation 2 from Equation 1:
$S_n - rS_n = (a + ar + ar^2 + \dots + ar^{n-1}) - (ar + ar^2 + ar^3 + \dots + ar^{n-1} + ar^n)$

Notice that almost all terms cancel out!
$S_n - rS_n = a - ar^n$

Factor out $S_n$ on the left and $a$ on the right:
$S_n(1-r) = a(1-r^n)$

Finally, solve for $S_n$ (assuming $r \neq 1$):
$$ S_n = \frac{a(1-r^n)}{1-r} \quad \text{for } r \neq 1 $$

**What Could Go Wrong:**
1.  **Algebraic Errors:** Mistakes in distributing $r$, subtracting terms, or factoring can lead to an incorrect formula.
2.  **Forgetting the $r=1$ case:** If $r=1$, the denominator $1-r$ would be zero, making the formula undefined. In this special case, the series is $a + a + a + \dots + a$. The $n$-th partial sum is simply $S_n = na$. This series clearly diverges if $a \neq 0$ (it grows infinitely large) and converges to 0 if $a=0$.

### Step 5: Convergence condition and sum formula (The Main Event)

**Plain-English Statement:** An infinite geometric series will only add up to a finite number if the terms are getting smaller and smaller, and they're shrinking fast enough. This happens when the common ratio $r$ is a number between -1 and 1 (but not including -1 or 1). If $r$ is outside this range, the terms either stay the same size or get bigger, so their sum will just grow infinitely large. If it converges, the total sum is simply the first term divided by one minus the common ratio.

**Formal/Mathematical Version (and Proof):**
We want to find $\lim_{n \to \infty} S_n$. Using the formula derived in Step 4:
$$ \sum_{n=0}^{\infty} ar^n = \lim_{n \to \infty} \frac{a(1-r^n)}{1-r} $$
We need to evaluate $\lim_{n \to \infty} r^n$.

**Case 1: If $|r| < 1$ (i.e., $-1 < r < 1$)**
In this case, as $n$ gets very large, $r^n$ gets closer and closer to 0. For example, if $r=1/2$, then $r^n$ is $1/2, 1/4, 1/8, \dots$, which clearly approaches 0.
So, $\lim_{n \to \infty} r^n = 0$.
Substituting this into the limit for $S_n$:
$$ \lim_{n \to \infty} S_n = \frac{a(1-0)}{1-r} = \frac{a}{1-r} $$
Since this limit is a finite number, the series **converges** to $\frac{a}{1-r}$ when $|r|<1$.

**Case 2: If $|r| > 1$ (i.e., $r > 1$ or $r < -1$)**
In this case, as $n$ gets very large, $r^n$ either grows infinitely large (if $r>1$) or oscillates and grows infinitely large in magnitude (if $r<-1$). For example, if $r=2$, $r^n$ is $2, 4, 8, 16, \dots$. If $r=-2$, $r^n$ is $-2, 4, -8, 16, \dots$. In both scenarios, $\lim_{n \to \infty} r^n$ does not exist (or is $\pm \infty$).
Therefore, $\lim_{n \to \infty} S_n$ does not exist, and the series **diverges**.

**Case 3: If $r = 1$**
As discussed in Step 4, the formula for $S_n$ is not applicable. The series is $a + a + a + \dots$.
The $n$-th partial sum is $S_n = na$.
If $a \neq 0$, then $\lim_{n \to \infty} na = \pm \infty$. So the series **diverges**.
If $a = 0$, the series is $0 + 0 + 0 + \dots$, which converges to 0. (This is a trivial case).

**Case 4: If $r = -1$**
The series is $a - a + a - a + \dots$.
The partial sums are $S_1 = a$, $S_2 = a-a = 0$, $S_3 = a-a+a = a$, $S_4 = 0$, and so on.
The sequence of partial sums ($a, 0, a, 0, \dots$) oscillates and does not approach a single finite limit (unless $a=0$).
Therefore, the series **diverges** (unless $a=0$, which is trivial).

**Conclusion:**
An infinite geometric series $\sum_{n=0}^{\infty} ar^n$ (where $a \neq 0$)
*   **Converges** if and only if $|r| < 1$.
*   If it converges, its sum is $S = \frac{a}{1-r}$.
*   It **diverges** if $|r| \ge 1$.

**What Could Go Wrong:**
1.  **Not understanding why $\lim_{n \to \infty} r^n = 0$ for $|r|<1$:** This is a fundamental limit property that must be understood. If $r$ is a fraction between -1 and 1, raising it to higher and higher powers makes it smaller and smaller, approaching zero.
2.  **Applying the sum formula to a divergent series:** This is the most common mistake. Always check the convergence condition $|r|<1$ *before* attempting to calculate the sum.
3.  **Forgetting the $r=1$ and $r=-1$ cases:** These are edge cases where $r^n$ does not tend to zero, and the series diverges. The condition is *strictly* $|r|<1$.

## 5. Worked examples — multiple, with every step shown

Here are several worked examples illustrating the concepts of geometric series, their convergence, and how to find their sum.

### Example 1: Basic Convergent Series

**Problem:** Determine if the geometric series $\sum_{n=0}^{\infty} 3 \left(\frac{1}{2}\right)^n$ converges or diverges. If it converges, find its sum.

**Identify what's given and what we want:**
Given: The series $\sum_{n=0}^{\infty} 3 \left(\frac{1}{2}\right)^n$.
We want to:
1.  Determine if it converges or diverges.
2.  If it converges, find its sum.

**Show every algebraic / logical step:**

1.  **Identify the first term ($a$) and the common ratio ($r$):**
    The general form of a geometric series is $\sum_{n=0}^{\infty} ar^n$.
    Comparing this to the given series $\sum_{n=0}^{\infty} 3 \left(\frac{1}{2}\right)^n$:
    The first term $a$ is the coefficient of $r^n$, which is $3$.
    The common ratio $r$ is the base of the exponent $n$, which is $\frac{1}{2}$.
    *Explanation:* We match the given series to the standard form $\sum ar^n$ to identify $a$ and $r$.

2.  **Check the convergence condition:**
    The condition for convergence of a geometric series is $|r| < 1$.
    In this case, $|r| = \left|\frac{1}{2}\right| = \frac{1}{2}$.
    Since $\frac{1}{2} < 1$, the series **converges**.
    *Explanation:* We apply the convergence test. Since the absolute value of the common ratio is less than 1, the terms of the series will get progressively smaller, ensuring a finite sum.

3.  **Calculate the sum (if it converges):**
    For a convergent geometric series, the sum $S$ is given by the formula $S = \frac{a}{1-r}$.
    Substitute $a=3$ and $r=\frac{1}{2}$ into the formula:
    $$ S = \frac{3}{1 - \frac{1}{2}} $$
    $$ S = \frac{3}{\frac{2}{2} - \frac{1}{2}} $$
    $$ S = \frac{3}{\frac{1}{2}} $$
    To divide by a fraction, multiply by its reciprocal:
    $$ S = 3 \times 2 $$
    $$ S = 6 $$
    *Explanation:* Since the series converges, we use the specific formula for the sum of a convergent geometric series and perform the algebraic simplification.

**Final Answer:**
The series $\sum_{n=0}^{\infty} 3 \left(\frac{1}{2}\right)^n$ **converges** to a sum of $\boxed{6}$.

**Reflection:** This was a straightforward application of the definitions. The key was correctly identifying $a$ and $r$ and then applying the convergence condition and sum formula.

### Example 2: Convergent Series with a Negative Ratio and Shifted Index

**Problem:** Determine if the series $\sum_{n=1}^{\infty} 4 \left(-\frac{1}{3}\right)^{n-1}$ converges or diverges. If it converges, find its sum.

**Identify what's given and what we want:**
Given: The series $\sum_{n=1}^{\infty} 4 \left(-\frac{1}{3}\right)^{n-1}$.
We want to:
1.  Determine if it converges or diverges.
2.  If it converges, find its sum.

**Show every algebraic / logical step:**

1.  **Identify the first term ($a$) and the common ratio ($r$):**
    The series starts at $n=1$. To find the first term $a$, we substitute $n=1$ into the term expression $4 \left(-\frac{1}{3}\right)^{n-1}$:
    First term $a = 4 \left(-\frac{1}{3}\right)^{1-1} = 4 \left(-\frac{1}{3}\right)^0 = 4 \times 1 = 4$.
    The common ratio $r$ is the base of the exponent involving $n$, which is $-\frac{1}{3}$.
    *Explanation:* The standard formula for a geometric series sum assumes the first term is $a$. Here, the index starts at $n=1$, so we must evaluate the expression for $n=1$ to find the actual first term $a$. The common ratio is directly visible from the power term.

2.  **Check the convergence condition:**
    The condition for convergence is $|r| < 1$.
    In this case, $|r| = \left|-\frac{1}{3}\right| = \frac{1}{3}$.
    Since $\frac{1}{3} < 1$, the series **converges**.
    *Explanation:* The absolute value of the common ratio is less than 1, so the series converges. The negative ratio means the terms will alternate in sign, but their magnitudes still decrease.

3.  **Calculate the sum (if it converges):**
    For a convergent geometric series, the sum $S$ is given by $S = \frac{a}{1-r}$.
    Substitute $a=4$ and $r=-\frac{1}{3}$ into the formula:
    $$ S = \frac{4}{1 - \left(-\frac{1}{3}\right)} $$
    $$ S = \frac{4}{1 + \frac{1}{3}} $$
    $$ S = \frac{4}{\frac{3}{3} + \frac{1}{3}} $$
    $$ S = \frac{4}{\frac{4}{3}} $$
    To divide by a fraction, multiply by its reciprocal:
    $$ S = 4 \times \frac{3}{4} $$
    $$ S = 3 $$
    *Explanation:* We apply the sum formula, being careful with the negative sign in the denominator.

**Final Answer:**
The series $\sum_{n=1}^{\infty} 4 \left(-\frac{1}{3}\right)^{n-1}$ **converges** to a sum of $\boxed{3}$.

**Reflection:** This example highlighted the importance of carefully determining the *actual* first term $a$ when the summation index does not start at $n=0$. It also showed how a negative common ratio still allows for convergence as long as its absolute value is less than 1.

### Example 3: Divergent Series

**Problem:** Determine if the series $\sum_{n=0}^{\infty} 5 (2)^n$ converges or diverges. If it converges, find its sum.

**Identify what's given and what we want:**
Given: The series $\sum_{n=0}^{\infty} 5 (2)^n$.
We want to:
1.  Determine if it converges or diverges.
2.  If it converges, find its sum.

**Show every algebraic / logical step:**

1.  **Identify the first term ($a$) and the common ratio ($r$):**
    Comparing $\sum_{n=0}^{\infty} 5 (2)^n$ to $\sum_{n=0}^{\infty} ar^n$:
    The first term $a=5$.
    The common ratio $r=2$.
    *Explanation:* Directly identify $a$ and $r$ from the standard form.

2.  **Check the convergence condition:**
    The condition for convergence is $|r| < 1$.
    In this case, $|r| = |2| = 2$.
    Since $2 \not< 1$ (specifically, $2 > 1$), the series **diverges**.
    *Explanation:* The absolute value of the common ratio is greater than 1, meaning the terms of the series will grow larger and larger in magnitude, so their sum will not approach a finite value.

3.  **Calculate the sum (if it converges):**
    Since the series diverges, it does not have a finite sum.
    *Explanation:* The sum formula $S = \frac{a}{1-r}$ is only valid for convergent series. Applying it to a divergent series would yield a meaningless result.

**Final Answer:**
The series $\sum_{n=0}^{\infty} 5 (2)^n$ **diverges**.

**Reflection:** This example emphasizes the critical importance of checking the convergence condition *before* attempting to calculate a sum. If $|r| \ge 1$, the series diverges.

### Example 4: Non-Standard Form and Algebraic Manipulation

**Problem:** Determine if the series $\sum_{n=2}^{\infty} \frac{2^{n+1}}{3^n}$ converges or diverges. If it converges, find its sum.

**Identify what's given and what we want:**
Given: The series $\sum_{n=2}^{\infty} \frac{2^{n+1}}{3^n}$.
We want to:
1.  Determine if it converges or diverges.
2.  If it converges, find its sum.

**Show every algebraic / logical step:**

1.  **Rewrite the series in standard geometric form:**
    The current form $\frac{2^{n+1}}{3^n}$ is not clearly $ar^n$ or $ar^{n-1}$. We need to manipulate it.
    Using exponent rules: $2^{n+1} = 2^n \times 2^1 = 2 \times 2^n$.
    So, the term is $\frac{2 \times 2^n}{3^n} = 2 \times \left(\frac{2}{3}\right)^n$.
    The series is $\sum_{n=2}^{\infty} 2 \left(\frac{2}{3}\right)^n$.
    *Explanation:* We use exponent properties $(x^{a+b} = x^a x^b)$ to separate the terms and group them into the form (constant) $\times$ (ratio)$^n$.

2.  **Identify the first term ($a$) and the common ratio ($r$):**
    The common ratio $r$ is clearly $\frac{2}{3}$.
    The series starts at $n=2$. To find the first term $a$, we substitute $n=2$ into the rewritten term $2 \left(\frac{2}{3}\right)^n$:
    First term $a = 2 \left(\frac{2}{3}\right)^2 = 2 \times \frac{4}{9} = \frac{8}{9}$.
    *Explanation:* The common ratio is the base of the power $n$. The first term $a$ is the value of the term when $n$ is at its starting index (here, $n=2$).

3.  **Check the convergence condition:**
    The condition for convergence is $|r| < 1$.
    In this case, $|r| = \left|\frac{2}{3}\right| = \frac{2}{3}$.
    Since $\frac{2}{3} < 1$, the series **converges**.
    *Explanation:* The absolute value of the common ratio is less than 1, so the series converges.

4.  **Calculate the sum (if it converges):**
    For a convergent geometric series, the sum $S$ is given by $S = \frac{a}{1-r}$.
    Substitute $a=\frac{8}{9}$ and $r=\frac{2}{3}$ into the formula:
    $$ S = \frac{\frac{8}{9}}{1 - \frac{2}{3}} $$
    $$ S = \frac{\frac{8}{9}}{\frac{3}{3} - \frac{2}{3}} $$
    $$ S = \frac{\frac{8}{9}}{\frac{1}{3}} $$
    To divide by a fraction, multiply by its reciprocal:
    $$ S = \frac{8}{9} \times \frac{3}{1} $$
    $$ S = \frac{24}{9} $$
    $$ S = \frac{8}{3} $$
    *Explanation:* We apply the sum formula, performing careful fraction arithmetic.

**Final Answer:**
The series $\sum_{n=2}^{\infty} \frac{2^{n+1}}{3^n}$ **converges** to a sum of $\boxed{\frac{8}{3}}$.

**Reflection:** This example was trickier because the series was not immediately in the standard $ar^n$ form, and the starting index was not 0 or 1. Careful algebraic manipulation and correct identification of the *actual* first term were crucial.

### Example 5: Application - Repeating Decimal

**Problem:** Express the repeating decimal $0.777\dots$ as a fraction.

**Identify what's given and what we want:**
Given: The repeating decimal $0.777\dots$.
We want to: Express it as a fraction using geometric series.

**Show every algebraic / logical step:**

1.  **Write the repeating decimal as an infinite sum:**
    $0.777\dots = 0.7 + 0.07 + 0.007 + 0.0007 + \dots$
    This can be written using fractions:
    $0.777\dots = \frac{7}{10} + \frac{7}{100} + \frac{7}{1000} + \frac{7}{10000} + \dots$
    *Explanation:* We decompose the repeating decimal into a sum of decimal fractions, which naturally forms a geometric series.

2.  **Identify the first term ($a$) and the common ratio ($r$):**
    From the sum $\frac{7}{10} + \frac{7}{100} + \frac{7}{1000} + \dots$:
    The first term $a = \frac{7}{10}$.
    To find the common ratio $r$, divide the second term by the first term:
    $r = \frac{7/100}{7/10} = \frac{7}{100} \times \frac{10}{7} = \frac{10}{100} = \frac{1}{10}$.
    Alternatively, observe that each term is multiplied by $\frac{1}{10}$ to get the next term.
    *Explanation:* Identify the first term and the factor by which each term is multiplied to get the next.

3.  **Check the convergence condition:**
    The condition for convergence is $|r| < 1$.
    In this case, $|r| = \left|\frac{1}{10}\right| = \frac{1}{10}$.
    Since $\frac{1}{10} < 1$, the series **converges**.
    *Explanation:* The series converges, confirming that the repeating decimal has a finite fractional representation.

4.  **Calculate the sum:**
    For a convergent geometric series, the sum $S$ is given by $S = \frac{a}{1-r}$.
    Substitute $a=\frac{7}{10}$ and $r=\frac{1}{10}$ into the formula:
    $$ S = \frac{\frac{7}{10}}{1 - \frac{1}{10}} $$
    $$ S = \frac{\frac{7}{10}}{\frac{10}{10} - \frac{1}{10}} $$
    $$ S = \frac{\frac{7}{10}}{\frac{9}{10}} $$
    To divide by a fraction, multiply by its reciprocal:
    $$ S = \frac{7}{10} \times \frac{10}{9} $$
    $$ S = \frac{7}{9} $$
    *Explanation:* Apply the sum formula and simplify the resulting fraction.

**Final Answer:**
The repeating decimal $0.777\dots$ is equal to the fraction $\boxed{\frac{7}{9}}$.

**Reflection:** This example demonstrates a powerful practical application of geometric series to convert repeating decimals into fractions, a task often done by algebraic manipulation but elegantly solved with series.

## 6. Common mistakes and traps

Students often stumble on specific points when working with geometric series. Being aware of these common pitfalls can help you avoid them.

1.  **Misidentifying the first term ($a$) or the common ratio ($r$):** This is perhaps the most frequent error.
    *   **Trap:** The series is given as $\sum_{n=1}^{\infty} 5 \left(\frac{1}{3}\right)^n$. A student might incorrectly identify $a=5$ (the coefficient) and $r=1/3$.
    *   **Correction:** The first term $a$ is the *value of the term when the index is at its starting point*. Here, for $n=1$, the first term is $5(1/3)^1 = 5/3$. The common ratio $r$ is indeed $1/3$.
    *   **Trap:** The series is $\sum_{n=0}^{\infty} \frac{2^{n+1}}{5^n}$. A student might identify $r=2/5$ but $a=2$ or $a=1$.
    *   **Correction:** Rewrite the term as $2 \cdot \frac{2^n}{5^n} = 2 \left(\frac{2}{5}\right)^n$. Then $a=2$ (for $n=0$) and $r=2/5$. Or, if $n=0$ is the start, $a = \frac{2^{0+1}}{5^0} = \frac{2^1}{1} = 2$.
    *   **Trap:** Forgetting that $a$ is the *first term*, not just the constant in front of the ratio.

2.  **Forgetting the convergence condition $|r|<1$:**
    *   **Trap:** Attempting to calculate the sum of a divergent series, e.g., $\sum_{n=0}^{\infty} 2 \cdot 3^n$. A student might calculate $\frac{2}{1-3} = \frac{2}{-2} = -1$.
    *   **Correction:** Always check $|r|<1$ *first*. For $r=3$, $|r|=3 \not< 1$, so the series diverges. There is no finite sum. The formula $S=\frac{a}{1-r}$ is only valid for convergent series.

3.  **Algebraic errors in simplifying fractions or negative signs:**
    *   **Trap:** When $r$ is negative, like $r = -1/2$, a student might write $1-r$ as $1-1/2 = 1/2$ instead of $1-(-1/2) = 1+1/2 = 3/2$.
    *   **Correction:** Be meticulous with signs and fraction arithmetic, especially in the denominator $1-r$.

4.  **Off-by-one errors in summation limits:**
    *   **Trap:** Confusing $\sum_{n=0}^{N-1} ar^n$ (which has $N$ terms) with $\sum_{n=0}^{N} ar^n$ (which has $N+1$ terms) when deriving $S_n$.
    *   **Correction:** Pay close attention to the starting and ending indices. For the sum of the first $N$ terms, if starting at $n=0$, the last term is $ar^{N-1}$.

5.  **Assuming $r \neq 1$ is implicitly handled:**
    *   **Trap:** Forgetting that the formula $S_n = \frac{a(1-r^n)}{1-r}$ is derived with the assumption $r \neq 1$.
    *   **Correction:** The cases $r=1$ and $r=-1$ must be explicitly checked. Both lead to divergent series (unless $a=0$). The convergence condition $|r|<1$ specifically excludes these values.

6.  **Incorrectly converting repeating decimals to geometric series:**
    *   **Trap:** For $0.121212\dots$, a student might try $a=0.1$ and $r=0.2$.
    *   **Correction:** The terms are $0.12, 0.0012, 0.000012, \dots$. So $a=0.12 = 12/100$, and $r=0.01 = 1/100$. Each block of repeating digits forms the basis of the terms.

## 7. Textbook-precise explanation

### Definition of a Geometric Sequence and Series

A **geometric sequence** is a sequence of numbers where each term after the first is found by multiplying the previous one by a fixed, non-zero number called the common ratio. If the first term is $a$ and the common ratio is $r$, the sequence can be written as:
$$ \{a, ar, ar^2, ar^3, \dots, ar^{n-1}, \dots\} $$
An **infinite geometric series** is the sum of the terms of an infinite geometric sequence. It is expressed using summation notation as:
$$ \sum_{n=0}^{\infty} ar^n = a + ar + ar^2 + ar^3 + \dots $$
where $a$ is the first term (corresponding to $n=0$) and $r$ is the common ratio. We assume $a \neq 0$.

### Theorem: Convergence of a Geometric Series

A geometric series $\sum_{n=0}^{\infty} ar^n$ (with $a \neq 0$)
1.  **Converges** if and only if the absolute value of the common ratio is less than 1, i.e., $|r| < 1$.
2.  If it converges, its sum $S$ is given by the formula:
    $$ S = \frac{a}{1-r} $$
3.  **Diverges** if the absolute value of the common ratio is greater than or equal to 1, i.e., $|r| \ge 1$.

### Proof of the Convergence Condition and Sum Formula

Let $S_n$ denote the $n$-th partial sum of the geometric series $\sum_{k=0}^{\infty} ar^k$. The sum of the first $n$ terms (from $k=0$ to $k=n-1$) is:
$$ S_n = a + ar + ar^2 + \dots + ar^{n-1} \quad (*)$$

Multiply both sides of equation $(*)$ by the common ratio $r$:
$$ rS_n = ar + ar^2 + ar^3 + \dots + ar^{n-1} + ar^n \quad (**)$$

Subtract equation $(**)$ from equation $(*)$:
$$ S_n - rS_n = (a + ar + ar^2 + \dots + ar^{n-1}) - (ar + ar^2 + ar^3 + \dots + ar^{n-1} + ar^n) $$
All intermediate terms cancel out, leaving:
$$ S_n(1-r) = a - ar^n $$
$$ S_n(1-r) = a(1-r^n) $$

**Case 1: $r \neq 1$**
If $r \neq 1$, we can divide by $(1-r)$ to obtain the formula for the $n$-th partial sum:
$$ S_n = \frac{a(1-r^n)}{1-r} $$
To find the sum of the infinite series, we take the limit of $S_n$ as $n \to \infty$:
$$ S = \lim_{n \to \infty} S_n = \lim_{n \to \infty} \frac{a(1-r^n)}{1-r} $$
The behavior of this limit depends on the value of $r^n$ as $n \to \infty$:
*   **If $|r| < 1$:** Then $\lim_{n \to \infty} r^n = 0$.
    Therefore, the limit becomes:
    $$ S = \frac{a(1-0)}{1-r} = \frac{a}{1-r} $$
    Since this limit is a finite value, the series **converges** to $\frac{a}{1-r}$.
*   **If $|r| > 1$:** Then $\lim_{n \to \infty} r^n$ does not exist (it approaches $\pm \infty$).
    Therefore, $\lim_{n \to \infty} S_n$ does not exist, and the series **diverges**.
*   **If $r = -1$:** Then $r^n = (-1)^n$, which oscillates between $-1$ and $1$.
    So $\lim_{n \to \infty} r^n$ does not exist.
    The partial sums $S_n$ oscillate between $a$ and $0$ (if $a \neq 0$), so the series **diverges**.

**Case 2: $r = 1$**
If $r=1$, the original series is $\sum_{n=0}^{\infty} a(1)^n = a + a + a + \dots$.
The $n$-th partial sum is $S_n = a + a + \dots + a$ ($n$ times) $= na$.
Since $a \neq 0$, $\lim_{n \to \infty} S_n = \lim_{n \to \infty} na = \pm \infty$.
Therefore, the series **diverges**.

Combining all cases, the geometric series $\sum_{n=0}^{\infty} ar^n$ (with $a \neq 0$) converges if and only if $|r| < 1$, and its sum is $\frac{a}{1-r}$. Otherwise, it diverges.

**Reference:** This content aligns with topics typically found in the "Infinite Sequences and Series" chapter of standard calculus textbooks. For instance, see **Stewart, Calculus: Early Transcendentals, 9e, Chapter 11.2: Geometric Series**.

## 8. ASCII diagrams

### Diagram 1: Convergence condition on the number line

This diagram illustrates the range of common ratios $r$ for which a geometric series converges.

```text
<----------------------------------------------------------------------------------->
...      -3      -2      -1       0       1       2       3      ...
         |       |       (       [-------]       )       |       |
                 ^       ^               ^       ^       ^       ^
                 |       |               |       |       |       |
                 |       |               |       |       |       Diverges (r >= 1)
                 |       |               |       |       Diverges (r <= -1)
                 |       |               |       Converges (-1 < r < 1)
                 |       |               r = 0 (Converges)
                 |       r = -1 (Diverges)
                 r = -2 (Diverges)

Key:
( ) : Exclusive interval (endpoints not included)
[ ] : Inclusive interval (endpoints included) - not used here for convergence
--- : Range of r values
```
**Explanation:** The series converges when $r$ is strictly between -1 and 1, meaning $-1 < r < 1$. This is represented by the open interval $(-1, 1)$. Outside this interval, including the endpoints $r=1$ and $r=-1$, the series diverges.

### Diagram 2: Bouncing Ball (Conceptual Visual for Convergence)

Imagine a ball dropped from a height $H$. With each bounce, it reaches a fraction $r$ of the previous height. The total distance traveled is a geometric series.

```text
Initial Drop: H
              |
              |
              V
              O (Ball hits ground)
             / \
            /   \
           /     \
          h1 = r*H
         /       \
        /         \
       O           O (Ball hits ground again)
      / \         / \
     /   \       /   \
    h2=r*h1     h2=r*h1
   /     \     /     \
  O       O   O       O (Ball hits ground a third time)
 / \     / \ / \     / \
h3=r*h2 ... h3=r*h2 ...
. . . . . . . . . . . . .
```
**Explanation:**
*   The initial drop is $H$.
*   The first bounce up and down covers $2h_1 = 2rH$.
*   The second bounce up and down covers $2h_2 = 2r^2H$.
*   The third bounce up and down covers $2h_3 = 2r^3H$.
The total distance traveled (after the initial drop) is $H + 2rH + 2r^2H + 2r^3H + \dots = H + 2H(r + r^2 + r^3 + \dots)$.
The part in the parenthesis $r + r^2 + r^3 + \dots$ is a geometric series with first term $a=r$ and common ratio $r$. If $|r|<1$, it converges to $\frac{r}{1-r}$.
So the total distance is $H + 2H \left(\frac{r}{1-r}\right)$. This illustrates how an infinite sum can yield a finite total distance.

## 9. Memory technique — never forget this

To master geometric series, focus on these core elements and use effective memory aids.

1.  **Specific Mnemonic/Visual Hook:**
    *   **"A-R-T-I-S-T" for the Sum Formula:** Think of an ARTIST painting a masterpiece.
        *   **A** (first term)
        *   **R** (common ratio)
        *   **T** (Total sum)
        *   **I** (one)
        *   **S** (minus sign)
        *   **T** (Total sum)
        This isn't perfect, but it can help recall $S = \frac{A}{1-R}$.
    *   **"Ratio in the Middle, Sum is a Riddle"**: This helps remember the convergence condition. If the ratio $r$ is *in the middle* of -1 and 1 (i.e., $|r|<1$), then the series *converges* and its sum is $a/(1-r)$ (the "riddle" is solved). If $r$ is outside this range, the sum is infinite (no riddle solution).
    *   **Visual: Shrinking Square:** Imagine a square of area 1. You cut it in half, then cut one of the halves in half, then one of those in half, and so on. The areas are $1/2, 1/4, 1/8, \dots$. The sum of these areas $1/2 + 1/4 + 1/8 + \dots$ clearly approaches 1. This is a geometric series with $a=1/2$ and $r=1/2$, summing to $\frac{1/2}{1-1/2} = \frac{1/2}{1/2} = 1$. It visually confirms convergence for $|r|<1$.

2.  **Formulas/Facts to Overlearn:**
    1.  **Geometric Series Definition:** $\sum_{n=0}^{\infty} ar^n = a + ar + ar^2 + \dots$ (Know how to identify $a$ and $r$ from *any* starting index or form).
    2.  **Convergence Condition:** The series converges if and only if $\mathbf{|r| < 1}$. (This is non-negotiable; always check it first).
    3.  **Sum Formula (for convergent series):** $\mathbf{S = \frac{a}{1-r}}$. (Memorize this perfectly).

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Immediately after learning, review the definitions, conditions, and sum formula. Work through 1-2 examples.
    *   **Day 3:** Review again. Try to re-derive the $S_n$ formula. Work through 2-3 new examples, including one tricky one.
    *   **Day 7:** Review the core concepts and formulas. Attempt to prove the convergence condition from scratch. Work through 1-2 application-based examples.
    *   **Day 16:** Quick review of formulas and conditions. Do one comprehensive problem that involves identifying $a$ and $r$ from a non-standard series.
    *   **Day 35:** Final review. Explain the concept of geometric series and its convergence to someone else (or yourself, out loud) without looking at notes.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the sum formula $S = \frac{a}{1-r}$, you can always rebuild it from first principles:
    1.  **Write out the partial sum $S_n$:** $S_n = a + ar + ar^2 + \dots + ar^{n-1}$.
    2.  **Multiply by $r$:** $rS_n = ar + ar^2 + \dots + ar^{n-1} + ar^n$.
    3.  **Subtract the two equations:** $S_n - rS_n = a - ar^n$.
    4.  **Factor:** $S_n(1-r) = a(1-r^n)$.
    5.  **Solve for $S_n$:** $S_n = \frac{a(1-r^n)}{1-r}$ (for $r \neq 1$).
    6.  **Take the limit as $n \to \infty$:** Recognize that for $|r|<1$, $\lim_{n \to \infty} r^n = 0$.
    7.  **Result:** $S = \lim_{n \to \infty} S_n = \frac{a(1-0)}{1-r} = \frac{a}{1-r}$.
    This derivation is elegant, short, and reinforces the underlying logic of why the formula works.

## 10. Connections — what this leads to

The geometric series is a foundational concept in calculus and beyond. Understanding it thoroughly unlocks many advanced topics:

1.  **Power Series:** A geometric series is the simplest and most fundamental example of a power series. A power series is a series of the form $\sum_{n=0}^{\infty} c_n (x-a)^n$. When $c_n$ is constant ($c_n=c$) and $(x-a)$ is replaced by $r$, it becomes a geometric series. The understanding of its convergence (radius and interval of convergence) directly generalizes to power series.

2.  **Taylor and Maclaurin Series:** These series represent functions as infinite sums of powers of $(x-a)$. Many common functions (like $e^x$, $\sin x$, $\cos x$, $\ln(1+x)$, $1/(1-x)$) can be expressed this way. The geometric series formula for $1/(1-x)$ is often the starting point for deriving other Taylor series or for understanding the concept of series representation of functions. For example, by substitution or differentiation/integration of the geometric series, one can find series for related functions.

3.  **Fourier Series:** While different in form (using sines and cosines), Fourier series also represent functions as infinite sums. The general idea of representing complex functions as sums of simpler components is a powerful theme initiated by understanding series like the geometric series.

4.  **Differential Equations:** Series solutions are a common method for solving certain types of differential equations, especially those with variable coefficients. The behavior and convergence of these series solutions often rely on the principles established for simpler series like the geometric series.

5.  **Complex Analysis:** The concepts of geometric series and power series extend naturally to the complex plane. Understanding convergence in real numbers is a prerequisite for studying convergence of complex series, which is crucial for functions of a complex variable.

6.  **Probability and Statistics:** In probability, geometric distributions model the number of trials needed to achieve the first success in a sequence of Bernoulli trials. Calculating expected values or probabilities often involves summing finite or infinite geometric series.

7.  **Numerical Methods:** Many numerical algorithms for approximation, integration, or solving equations rely on iterative processes that can sometimes be analyzed using series, including geometric series, to understand their convergence properties and error bounds.

## 11. Self-check questions

Here are some questions to test your understanding. Do not look for answers until you have genuinely attempted each one.

1.  Identify the first term $a$ and the common ratio $r$ for the series $\sum_{k=1}^{\infty} 7 \cdot \frac{5^{k-1}}{11^k}$. Determine if the series converges or diverges. If it converges, find its sum.

2.  Consider the series $6 - 2 + \frac{2}{3} - \frac{2}{9} + \dots$.
    a) Show that this is a geometric series by finding its common ratio.
    b) Determine if the series converges or diverges.
    c) If it converges, find its sum.

3.  A super ball is dropped from a height of 10 meters. After each bounce, it rebounds to 80% of its previous height. What is the total vertical distance the ball travels before it comes to rest? (Consider both upward and downward travel after the initial drop).

4.  For what values of $x$ does the series $\sum_{n=0}^{\infty} \left(\frac{x-1}{2}\right)^n$ converge? What is the sum of the series for those values of $x$?

5.  A patient is given a 100 mg dose of a drug daily. Each day, the body eliminates 40% of the drug present in the bloodstream.
    a) How much of the drug is in the bloodstream immediately after the 1st dose? Immediately after the 2nd dose?
    b) Assuming the patient continues to take the drug indefinitely, what is the total amount of drug that will accumulate in the patient's bloodstream in the long run (i.e., the steady-state level)?