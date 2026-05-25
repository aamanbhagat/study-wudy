## 1. What it is — in plain English

Imagine you have a magic number. You start with a first number, let's call it the "starting point." Then, to get the next number in your list, you *multiply* your current number by that magic number. You keep doing this, multiplying by the *same magic number* over and over again.

This special kind of list of numbers is called a **Geometric Progression (GP)**. Think of it like a chain letter where each person sends it to a fixed number of friends, and those friends send it to the same fixed number of friends, and so on. The number of letters multiplies at each step.

So, if your starting point is 2 and your magic multiplier is 3, your list would look like this: 2, then $2 \times 3 = 6$, then $6 \times 3 = 18$, then $18 \times 3 = 54$, and so on. The key is that we're always multiplying by the *same* number.

This "magic multiplier" has a fancy name: the **common ratio**. It's the ratio you get if you divide any term by the term right before it. If you have a list where you always *add* the same number, that's a different kind of list called an Arithmetic Progression (AP). But with a GP, it's all about consistent multiplication.

## 2. Why it matters — real-world applications

Geometric progressions might seem like a simple mathematical curiosity, but they are fundamental to understanding many phenomena in the real world. Their power lies in modeling situations where growth or decay occurs proportionally to the current amount.

1.  **Finance and Economics (Compound Interest & Investments):** This is perhaps the most direct application. When you earn interest on your interest, that's a geometric progression. If you invest \$100 at 5% annual interest, after one year you have \$100 * 1.05. After two years, you have (\$100 * 1.05) * 1.05 = \$100 * (1.05)^2, and so on. This is how savings accounts grow, how mortgages are calculated, and how the value of investments (like stocks or real estate) can increase over time. Companies like Vanguard or Fidelity rely on these principles to project investment growth.

2.  **Population Dynamics and Epidemiology:** The spread of a virus or the growth of a bacterial colony often follows a geometric progression, at least initially. If each infected person infects, on average, two more people, the number of infected individuals can grow geometrically (1, 2, 4, 8, 16...). Similarly, unchecked population growth for species can be modeled this way. Understanding GPs helps epidemiologists predict outbreak sizes and plan interventions.

3.  **Physics (Radioactive Decay & Bouncing Balls):**
    *   **Radioactive Decay:** Radioactive substances decay by a fixed percentage over a certain period (e.g., half-life). If a substance has a half-life of 10 years, then after 10 years, half remains; after 20 years, half of that half (i.e., a quarter) remains, and so on. This is a geometric progression with a common ratio of 0.5.
    *   **Bouncing Ball:** When a ball bounces, it typically loses a fixed proportion of its height with each bounce due to energy loss. If a ball dropped from 10 meters bounces back to 80% of its previous height, its heights would be 10m, 8m, 6.4m, 5.12m, etc. This forms a GP.

4.  **Computer Science (Algorithm Analysis & Fractals):**
    *   **Algorithm Analysis:** Geometric series appear when analyzing the efficiency of certain algorithms, especially those that divide problems into smaller, similar subproblems (like some recursive algorithms). For instance, the time complexity of some tree traversal algorithms can involve sums of geometric series.
    *   **Fractals:** Many fractals (like the Koch snowflake or the Sierpinski triangle) exhibit self-similarity based on geometric ratios. The length of the perimeter or the area of these complex shapes often involves geometric progressions as they are constructed through iterative scaling.

## 3. Prerequisites — what you must know first

Before diving deep into Geometric Progressions, ensure you have a solid grasp of these foundational mathematical concepts:

*   **Basic Algebra:** Understanding variables, solving simple equations, and manipulating algebraic expressions.
*   **Exponents/Indices:** Familiarity with the laws of exponents (e.g., $x^a \cdot x^b = x^{a+b}$, $(x^a)^b = x^{ab}$, $x^0 = 1$). This is crucial for the nth term formula.
*   **Arithmetic Progressions (AP):** While different, understanding APs (where you *add* a common difference) provides a valuable comparative context and reinforces the idea of sequences.
*   **Summation Notation ($\Sigma$):** Knowing how to interpret and use the sigma symbol for sums (e.g., $\sum_{i=1}^n a_i$) will help understand the sum formulas.
*   **Factorization:** The ability to factor out common terms from an expression (e.g., $ax + ay = a(x+y)$) is vital for deriving the sum formula.

## 4. The core idea — step by step

Let's build up the concept of Geometric Progression from the ground up, understanding each component and how they fit together.

### Step 1: Understanding Sequences

*   **Plain English:** A sequence is simply an ordered list of numbers. Each number in the list is called a "term," and they follow some rule or pattern.
*   **Small concrete example:**
    *   The sequence of even numbers: 2, 4, 6, 8, 10, ...
    *   The sequence of squares: 1, 4, 9, 16, 25, ...
    *   The sequence of digits of Pi: 3, 1, 4, 1, 5, 9, ...
*   **Formal/Mathematical version:** A sequence is typically denoted by $a_1, a_2, a_3, \dots, a_n, \dots$, where $a_1$ is the first term, $a_2$ is the second term, and $a_n$ is the $n$-th term.
*   **What could go wrong:** Confusing a sequence with a set. A set is a collection of elements where order doesn't matter and duplicates are usually ignored. In a sequence, order is critical, and terms can be repeated. For example, $\{1, 2, 3\}$ is the same set as $\{3, 2, 1\}$, but $1, 2, 3$ is a different sequence from $3, 2, 1$.

### Step 2: Defining a Geometric Progression (GP)

*   **Plain English:** A Geometric Progression is a special type of sequence where each term, after the first, is found by multiplying the previous one by a fixed, non-zero number.
*   **Small concrete example:**
    *   Starting with 5, and multiplying by 2: 5, 10, 20, 40, 80, ...
    *   Starting with 81, and multiplying by 1/3: 81, 27, 9, 3, 1, ...
    *   Starting with 1, and multiplying by -2: 1, -2, 4, -8, 16, ...
*   **Formal/Mathematical version:** A sequence $a_1, a_2, a_3, \dots, a_n, \dots$ is a Geometric Progression if for all $n \ge 2$, the ratio $\frac{a_n}{a_{n-1}}$ is a constant. This constant is called the common ratio.
*   **What could go wrong:** Confusing a GP with an Arithmetic Progression (AP). In an AP, you *add* a constant difference; in a GP, you *multiply* by a constant ratio. For instance, 2, 4, 6, 8... is an AP (add 2), not a GP.

### Step 3: The Common Ratio ($r$) and the First Term ($a$)

*   **Plain English:**
    *   The **first term**, usually denoted by $a$, is simply the starting number of your sequence.
    *   The **common ratio**, usually denoted by $r$, is that "magic multiplier" that takes you from one term to the next. You can find it by dividing any term by the term immediately preceding it.
*   **Small concrete example:**
    *   For the GP: 5, 10, 20, 40, ...
        *   The first term $a = 5$.
        *   The common ratio $r = \frac{10}{5} = 2$. (Also, $\frac{20}{10} = 2$, $\frac{40}{20} = 2$).
    *   For the GP: 81, 27, 9, 3, ...
        *   The first term $a = 81$.
        *   The common ratio $r = \frac{27}{81} = \frac{1}{3}$.
*   **Formal/Mathematical version:**
    *   The first term is $a_1 = a$.
    *   The common ratio is $r = \frac{a_n}{a_{n-1}}$ for $n \ge 2$.
    *   Note: $r$ cannot be zero, because if $r=0$, the sequence would be $a, 0, 0, 0, \dots$ (assuming $a \neq 0$), which is trivial.
*   **What could go wrong:** Calculating the common ratio as a difference (e.g., $a_2 - a_1$) instead of a ratio ($a_2 / a_1$). This is a common mistake for students who are used to APs.

### Step 4: The $n$-th Term of a GP ($a_n$) — Derivation

*   **Plain English:** We want a formula that lets us jump directly to any term in the sequence (say, the 100th term) without having to list all the terms before it.
*   **Small concrete example:** For the GP: 2, 6, 18, 54, ... ($a=2, r=3$). What is the 5th term?
    *   $a_1 = 2$
    *   $a_2 = 6$
    *   $a_3 = 18$
    *   $a_4 = 54$
    *   $a_5 = 54 \times 3 = 162$.
    *   We want a formula that gives us 162 for $n=5$.
*   **Formal/Mathematical Derivation:**
    Let the first term be $a$ and the common ratio be $r$.
    The terms of the GP are:
    *   The first term ($n=1$): $a_1 = a$
    *   The second term ($n=2$): $a_2 = a \times r = ar$
    *   The third term ($n=3$): $a_3 = a_2 \times r = (ar) \times r = ar^2$
    *   The fourth term ($n=4$): $a_4 = a_3 \times r = (ar^2) \times r = ar^3$

    Do you see the pattern emerging?
    For the $n$-th term, the power of $r$ is always one less than the term number $n$.
    So, for the $n$-th term:
    $$a_n = ar^{n-1}$$
    This formula allows us to find any term in a geometric progression given its first term $a$, common ratio $r$, and its position $n$.

*   **What could go wrong:** The most common mistake is an "off-by-one" error in the exponent, writing $ar^n$ instead of $ar^{n-1}$. Remember that the first term $a_1$ has $r^0$ (since $r^0=1$), the second term $a_2$ has $r^1$, and so on. So, the $n$-th term has $r^{n-1}$.

### Step 5: Sum of $n$ Terms of a GP ($S_n$) — Derivation

*   **Plain English:** If we want to add up the first few terms of a GP, say the first 10 terms, it would be tedious to list them all and add them manually. We need a shortcut formula.
*   **Small concrete example:** For the GP: 2, 6, 18, 54, ... ($a=2, r=3$). What is the sum of the first 4 terms ($S_4$)?
    *   $S_4 = 2 + 6 + 18 + 54 = 80$.
    *   We want a formula that gives us 80 for $n=4$.
*   **Formal/Mathematical Derivation:**
    Let $S_n$ be the sum of the first $n$ terms of a GP with first term $a$ and common ratio $r$.
    $$S_n = a + ar + ar^2 + \dots + ar^{n-2} + ar^{n-1} \quad \text{(Equation 1)}$$

    Now, multiply every term in Equation 1 by the common ratio $r$:
    $$rS_n = ar + ar^2 + ar^3 + \dots + ar^{n-1} + ar^n \quad \text{(Equation 2)}$$

    Notice that many terms in Equation 1 and Equation 2 are identical. This is the key insight!
    Let's subtract Equation 1 from Equation 2 (or vice-versa, depending on whether $r>1$ or $r<1$ for convenience, but the result is algebraically equivalent). Let's do (Equation 2 - Equation 1):
    $$rS_n - S_n = (ar + ar^2 + \dots + ar^{n-1} + ar^n) - (a + ar + ar^2 + \dots + ar^{n-1})$$

    On the right-hand side, almost all terms cancel out!
    $$rS_n - S_n = ar^n - a$$

    Now, factor out $S_n$ from the left side and $a$ from the right side:
    $$S_n(r - 1) = a(r^n - 1)$$

    Finally, divide by $(r-1)$ to solve for $S_n$:
    $$S_n = \frac{a(r^n - 1)}{r - 1} \quad \text{(for } r \neq 1 \text{)}$$

    Alternatively, if we had done (Equation 1 - Equation 2), we would get:
    $$S_n - rS_n = a - ar^n$$
    $$S_n(1 - r) = a(1 - r^n)$$
    $$S_n = \frac{a(1 - r^n)}{1 - r} \quad \text{(for } r \neq 1 \text{)}$$
    Both formulas are equivalent. The second one is often preferred when $r$ is between -1 and 1 (i.e., $|r|<1$) because it keeps the terms in the numerator and denominator positive.

    **Special Case: When $r=1$**
    What if the common ratio $r$ is 1? Our formula above would have a zero in the denominator, which is undefined.
    If $r=1$, the GP is simply:
    $a, a \times 1, a \times 1^2, a \times 1^3, \dots$
    which means:
    $a, a, a, a, \dots$
    The sum of the first $n$ terms would just be $a$ added to itself $n$ times:
    $$S_n = na \quad \text{(for } r = 1 \text{)}$$

*   **What could go wrong:**
    1.  **Forgetting the $r=1$ case:** Always check if $r=1$ before applying the main sum formula.
    2.  **Mixing up the numerator/denominator:** Ensure you use $(r^n-1)/(r-1)$ or $(1-r^n)/(1-r)$, not a mix like $(r^n-1)/(1-r)$.
    3.  **Order of operations with $r^n$:** Make sure to calculate $r^n$ *before* subtracting 1 (or from 1).
    4.  **Algebraic errors:** Be careful with signs, especially if $r$ is negative.

## 5. Worked examples — multiple, with every step shown

### Example 1: Finding a specific term and the sum of initial terms

**Problem:** For the geometric progression 3, 6, 12, ... find:
a) The 5th term.
b) The sum of the first 5 terms.

**Solution:**

**Step 1: Identify what's given and what we want.**
Given: The sequence 3, 6, 12, ...
We want:
a) $a_5$ (the 5th term)
b) $S_5$ (the sum of the first 5 terms)

**Step 2: Determine the first term ($a$) and the common ratio ($r$).**
The first term is the first number in the sequence.
$$a = 3$$
The common ratio is found by dividing any term by its preceding term.
$$r = \frac{6}{3} = 2$$
(We can double-check with the next pair: $\frac{12}{6} = 2$. The ratio is consistent.)

**Step 3: Calculate the 5th term ($a_5$) using the $n$-th term formula.**
The formula for the $n$-th term is $a_n = ar^{n-1}$.
For the 5th term, $n=5$.
$$a_5 = ar^{5-1}$$
$$a_5 = ar^4$$
Now, substitute the values of $a$ and $r$:
$$a_5 = 3 \times (2)^4$$
First, calculate the exponent:
$$a_5 = 3 \times 16$$
Then, multiply:
$$a_5 = 48$$
The 5th term is 48.

**Step 4: Calculate the sum of the first 5 terms ($S_5$) using the sum formula.**
The formula for the sum of $n$ terms is $S_n = \frac{a(r^n - 1)}{r - 1}$ (since $r=2 \neq 1$).
For the sum of the first 5 terms, $n=5$.
$$S_5 = \frac{a(r^5 - 1)}{r - 1}$$
Substitute the values of $a$, $r$, and $n$:
$$S_5 = \frac{3(2^5 - 1)}{2 - 1}$$
First, calculate $2^5$:
$$2^5 = 32$$
Now, substitute this back into the formula:
$$S_5 = \frac{3(32 - 1)}{1}$$
Simplify the expression inside the parenthesis:
$$S_5 = \frac{3(31)}{1}$$
Multiply:
$$S_5 = 93$$
The sum of the first 5 terms is 93.

**Final Answer:**
a) The 5th term is $\boxed{48}$.
b) The sum of the first 5 terms is $\boxed{93}$.

**Reflection:** This example was straightforward, primarily testing the direct application of the formulas. The key was correctly identifying 'a' and 'r' and then carefully performing the calculations, especially with exponents.

---

### Example 2: Finding $a$ and $r$ from given terms and then a sum

**Problem:** A geometric progression has its 3rd term $a_3 = 12$ and its 6th term $a_6 = 96$. Find the first term ($a$) and the common ratio ($r$). Then, find the sum of the first 7 terms ($S_7$).

**Solution:**

**Step 1: Identify what's given and what we want.**
Given: $a_3 = 12$ and $a_6 = 96$.
We want: $a$, $r$, and $S_7$.

**Step 2: Use the $n$-th term formula to set up equations for $a$ and $r$.**
The $n$-th term formula is $a_n = ar^{n-1}$.
For the 3rd term:
$$a_3 = ar^{3-1} \implies 12 = ar^2 \quad \text{(Equation 1)}$$
For the 6th term:
$$a_6 = ar^{6-1} \implies 96 = ar^5 \quad \text{(Equation 2)}$$

**Step 3: Solve the system of equations to find $r$.**
A common strategy for GPs when given two terms is to divide the equation for the higher term by the equation for the lower term. This cancels out $a$.
Divide Equation 2 by Equation 1:
$$\frac{ar^5}{ar^2} = \frac{96}{12}$$
Cancel $a$ and simplify the powers of $r$:
$$r^{5-2} = 8$$
$$r^3 = 8$$
To find $r$, take the cube root of both sides:
$$r = \sqrt[3]{8}$$
$$r = 2$$
The common ratio is 2.

**Step 4: Substitute $r$ back into one of the equations to find $a$.**
Using Equation 1 ($12 = ar^2$):
$$12 = a(2)^2$$
$$12 = a(4)$$
Divide by 4 to find $a$:
$$a = \frac{12}{4}$$
$$a = 3$$
The first term is 3.

**Step 5: Calculate the sum of the first 7 terms ($S_7$).**
We have $a=3$, $r=2$, and we want $S_7$ (so $n=7$).
Use the sum formula $S_n = \frac{a(r^n - 1)}{r - 1}$ (since $r=2 \neq 1$).
$$S_7 = \frac{3(2^7 - 1)}{2 - 1}$$
First, calculate $2^7$:
$$2^7 = 128$$
Substitute this back into the formula:
$$S_7 = \frac{3(128 - 1)}{1}$$
Simplify the expression:
$$S_7 = 3(127)$$
Multiply:
$$S_7 = 381$$
The sum of the first 7 terms is 381.

**Final Answer:**
The first term $a = \boxed{3}$.
The common ratio $r = \boxed{2}$.
The sum of the first 7 terms $S_7 = \boxed{381}$.

**Reflection:** This example required setting up and solving a system of equations, which is a common technique for finding $a$ and $r$ when only two terms are given. Dividing the equations was key to efficiently finding $r$. Careful algebraic manipulation, especially with exponents, was crucial.

---

### Example 3: Working backwards from a sum formula

**Problem:** The sum of the first $n$ terms of a geometric progression is given by the formula $S_n = 3(2^n - 1)$. Find the first term ($a$) and the common ratio ($r$) of this GP.

**Solution:**

**Step 1: Identify what's given and what we want.**
Given: $S_n = 3(2^n - 1)$.
We want: $a$ (first term) and $r$ (common ratio).

**Step 2: Use the definition of $S_n$ for $n=1$ to find the first term ($a$).**
The sum of the first 1 term ($S_1$) is simply the first term itself, $a_1$.
Substitute $n=1$ into the given $S_n$ formula:
$$S_1 = 3(2^1 - 1)$$
$$S_1 = 3(2 - 1)$$
$$S_1 = 3(1)$$
$$S_1 = 3$$
Since $S_1 = a_1$, we have $a = 3$.
The first term is 3.

**Step 3: Use the definition of $S_n$ for $n=2$ to find the second term and subsequently $r$.**
The sum of the first 2 terms ($S_2$) is $a_1 + a_2$.
We know $a_1 = a = 3$.
Substitute $n=2$ into the given $S_n$ formula:
$$S_2 = 3(2^2 - 1)$$
$$S_2 = 3(4 - 1)$$
$$S_2 = 3(3)$$
$$S_2 = 9$$
Now, we know $S_2 = a_1 + a_2$.
$$9 = 3 + a_2$$
Subtract 3 from both sides to find $a_2$:
$$a_2 = 9 - 3$$
$$a_2 = 6$$
The second term is 6.

**Step 4: Calculate the common ratio ($r$) using $a_1$ and $a_2$.**
The common ratio $r = \frac{a_2}{a_1}$.
$$r = \frac{6}{3}$$
$$r = 2$$
The common ratio is 2.

**Step 5: (Optional but good for verification) Compare the given $S_n$ formula with the standard formula.**
The standard formula for $S_n$ is $S_n = \frac{a(r^n - 1)}{r - 1}$.
We found $a=3$ and $r=2$. Let's substitute these into the standard formula:
$$S_n = \frac{3(2^n - 1)}{2 - 1}$$
$$S_n = \frac{3(2^n - 1)}{1}$$
$$S_n = 3(2^n - 1)$$
This matches the given formula perfectly. This confirms our values for $a$ and $r$.

**Final Answer:**
The first term $a = \boxed{3}$.
The common ratio $r = \boxed{2}$.

**Reflection:** This example demonstrates how to extract information about a GP when its sum formula is provided. The key insight is that $S_1$ is simply the first term, and $S_2$ allows us to find the second term, from which the common ratio can be determined. Verification by plugging $a$ and $r$ back into the standard sum formula is a good practice.

---

### Example 4: Real-world application - Depreciation

**Problem:** A new car costs \$25,000. It depreciates in value by 15% each year.
a) What will be the value of the car after 4 years?
b) What is the total depreciation of the car over these 4 years?

**Solution:**

**Step 1: Identify what's given and what we want, and set up the GP.**
Given: Initial value = \$25,000. Depreciation rate = 15% per year.
We want:
a) Value after 4 years ($a_5$, if initial value is $a_1$).
b) Total depreciation over 4 years.

Let the initial value be the first term of our GP.
$$a = 25000$$
If the car depreciates by 15% each year, it retains $100\% - 15\% = 85\%$ of its value.
So, the common ratio $r = 0.85$.

The sequence of values will be:
$a_1$ = initial value
$a_2$ = value after 1 year
$a_3$ = value after 2 years
$a_4$ = value after 3 years
$a_5$ = value after 4 years

**Step 2: Calculate the value of the car after 4 years ($a_5$).**
The value after 4 years corresponds to the 5th term in the sequence (since $a_1$ is the initial value, $a_2$ is after 1 year, etc.). So we need to find $a_5$.
Using the $n$-th term formula $a_n = ar^{n-1}$:
$$a_5 = ar^{5-1}$$
$$a_5 = ar^4$$
Substitute $a = 25000$ and $r = 0.85$:
$$a_5 = 25000 \times (0.85)^4$$
Calculate $(0.85)^4$:
$$(0.85)^4 \approx 0.52200625$$
Now, multiply:
$$a_5 = 25000 \times 0.52200625$$
$$a_5 = 13050.15625$$
Rounding to two decimal places for currency:
$$a_5 \approx 13050.16$$
The value of the car after 4 years is approximately \$13,050.16.

**Step 3: Calculate the total depreciation over 4 years.**
Total depreciation is the initial value minus the value after 4 years.
Total Depreciation = $a_1 - a_5$
Total Depreciation = $25000 - 13050.15625$
Total Depreciation = $11949.84375$
Rounding to two decimal places for currency:
Total Depreciation $\approx 11949.84$

**Final Answer:**
a) The value of the car after 4 years will be approximately $\boxed{\$13,050.16}$.
b) The total depreciation over these 4 years is approximately $\boxed{\$11,949.84}$.

**Reflection:** This example highlights how GPs model real-world scenarios like depreciation. The key is to correctly identify the common ratio (1 - depreciation rate) and to be careful with the term number 'n'. Since $a_1$ is the initial value (year 0), the value after 4 years is $a_5$, not $a_4$.

## 6. Common mistakes and traps

1.  **Confusing Arithmetic and Geometric Progressions:** A very frequent error. Remember, APs involve *adding* a constant difference, while GPs involve *multiplying* by a constant ratio. Always check the pattern.
2.  **Off-by-one Error in $a_n$ Formula:** Using $a_n = ar^n$ instead of $a_n = ar^{n-1}$. The exponent for $r$ is always one less than the term number $n$. Think of $a_1 = ar^0 = a$.
3.  **Incorrect Calculation of Common Ratio ($r$):** Calculating $r$ as $a_2 - a_1$ (difference) instead of $a_2 / a_1$ (ratio).
4.  **Forgetting the Special Case for $S_n$ when $r=1$:** The formula $S_n = \frac{a(1-r^n)}{1-r}$ is undefined when $r=1$. In this case, $S_n = na$.
5.  **Algebraic Errors in Sum Formula:** Mistakes in calculating $r^n$, or in the subtraction/division of the terms in the numerator and denominator, especially with negative $r$ values.
6.  **Misinterpreting "after $X$ years/steps":** If $a_1$ represents the initial state (time 0), then the state after 1 year is $a_2$, after 2 years is $a_3$, and so on. So, "after $X$ years" often corresponds to the $(X+1)$-th term ($a_{X+1}$).

## 7. Textbook-precise explanation

A **sequence** is an ordered list of numbers, denoted as $a_1, a_2, a_3, \dots, a_n, \dots$, where $a_n$ represents the $n$-th term.

A **Geometric Progression (GP)**, also known as a geometric sequence, is a sequence of non-zero numbers where each term after the first is found by multiplying the previous one by a fixed, non-zero constant. This constant is called the **common ratio**, denoted by $r$.

Formally, a sequence $a_1, a_2, \dots, a_n, \dots$ is a geometric progression if for all integers $n \ge 2$,
$$ \frac{a_n}{a_{n-1}} = r $$
where $r$ is a constant, $r \neq 0$.

Let the first term be $a_1 = a$.
The terms of a geometric progression can be expressed as:
$$ a_1 = a $$
$$ a_2 = ar $$
$$ a_3 = ar^2 $$
$$ a_4 = ar^3 $$
And generally, the **$n$-th term** of a geometric progression is given by:
$$ a_n = ar^{n-1} $$
for $n \ge 1$.

The **sum of the first $n$ terms** of a geometric progression, denoted by $S_n$, is given by:
$$ S_n = a + ar + ar^2 + \dots + ar^{n-1} $$
For $r \neq 1$, the formula for $S_n$ is derived as follows:
$$ S_n = \frac{a(1 - r^n)}{1 - r} $$
or equivalently,
$$ S_n = \frac{a(r^n - 1)}{r - 1} $$
For the special case where $r = 1$, the terms are $a, a, a, \dots, a$. In this instance, the sum of the first $n$ terms is simply:
$$ S_n = na $$

These definitions and formulas are standard in pre-calculus and calculus textbooks. For instance, you can find them in:
*   Stewart, J. (2021). *Calculus* (9th ed.). Cengage Learning. (Chapter 11, Section 11.2: Geometric Series)
*   Larson, R., & Edwards, B. (2018). *Calculus* (11th ed.). Cengage Learning. (Chapter 9, Section 9.2: Geometric Sequences and Series)

## 8. ASCII diagrams

Here's a simple ASCII diagram illustrating the structure of a Geometric Progression:

```text
A Geometric Progression (GP)

First Term: 'a'
Common Ratio: 'r' (the multiplier)

Sequence of terms:

Term 1 (a_1):   a
                |
                v  (multiply by r)
Term 2 (a_2):   a * r
                |
                v  (multiply by r)
Term 3 (a_3):   a * r^2
                |
                v  (multiply by r)
Term 4 (a_4):   a * r^3
                |
                v  (multiply by r)
Term 5 (a_5):   a * r^4
                ...
                |
                v  (multiply by r)
Term n (a_n):   a * r^(n-1)
```

This diagram visually represents how each subsequent term is generated by multiplying the previous term by the common ratio $r$. It also clearly shows the pattern for the exponent of $r$ in the general $n$-th term formula.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic / Visual Hook:**
    *   For the **$n$-th term ($a_n = ar^{n-1}$):** Think of "AR-my's N-minus-ONE general." Imagine an army (AR) with a general whose rank is one less than the number of soldiers (N-minus-ONE). This helps remember $ar$ and the $n-1$ exponent.
    *   For the **Sum of $n$ terms ($S_n = \frac{a(1-r^n)}{1-r}$):** Visualize a "SNAKE" (S_n) eating an "APPLE" (a) with "ONE RAT" ($1-r$) in its belly, but the "RAT" ($r$) has "N" teeth ($r^n$) and is "ONE" less than a full rat. This is a bit convoluted, but the key is the "1-r" in the denominator and the "1-r^n" in the numerator. Alternatively, just remember "A times (one minus R to the N) all over (one minus R)". The symmetry of $(1-r^n)$ and $(1-r)$ is a good visual cue.

2.  **Formulas/Facts to Overlearn:**
    *   The definition of a GP: each term is previous term * r.
    *   The $n$-th term formula: $$a_n = ar^{n-1}$$
    *   The sum of $n$ terms formula (for $r \neq 1$): $$S_n = \frac{a(1-r^n)}{1-r}$$
    *   The sum of $n$ terms formula (for $r = 1$): $$S_n = na$$

3.  **Spaced-Repetition Schedule:**
    *   **1 Day:** Review the formulas and derivations. Do one easy example.
    *   **3 Days:** Review the formulas. Do one medium example, focusing on problem setup.
    *   **7 Days:** Review the derivations from scratch. Do one hard example, including an application.
    *   **16 Days:** Attempt to re-derive both formulas without looking. Do a mix of easy and medium problems.
    *   **35 Days:** Explain the concept and derivations aloud to an imaginary student. Tackle a challenging problem that involves working backward.

4.  **First-Principles Re-derivation Pathway:** If you ever forget the formulas, you can always rebuild them from the definition of a GP:
    *   **For $a_n$:**
        1.  Write out the first few terms: $a_1=a$, $a_2=ar$, $a_3=ar^2$, $a_4=ar^3$.
        2.  Observe the pattern: the exponent of $r$ is always one less than the term number.
        3.  Conclude: $a_n = ar^{n-1}$.
    *   **For $S_n$:**
        1.  Write out the sum: $S_n = a + ar + ar^2 + \dots + ar^{n-1}$. (Equation 1)
        2.  Multiply Equation 1 by $r$: $rS_n = ar + ar^2 + ar^3 + \dots + ar^n$. (Equation 2)
        3.  Subtract Equation 1 from Equation 2 (or vice versa): $rS_n - S_n = (ar + \dots + ar^n) - (a + ar + \dots + ar^{n-1})$.
        4.  Observe the cancellations: $S_n(r-1) = ar^n - a$.
        5.  Factor and solve for $S_n$: $S_n = \frac{a(r^n-1)}{r-1}$.
        6.  Remember the special case for $r=1$: $S_n = na$.

## 10. Connections — what this leads to

Understanding Geometric Progressions is a stepping stone to many advanced mathematical concepts and applications:

1.  **Infinite Geometric Series:** This is the immediate next topic. What happens if a GP continues forever? Under what conditions does the sum of an infinite number of terms converge to a finite value? This concept is crucial in calculus.
2.  **Calculus and Power Series:** Infinite geometric series are foundational to understanding power series (like Taylor and Maclaurin series). These series represent functions as infinite sums of terms, and the convergence of these series often relies on tests derived from the geometric series convergence criteria.
3.  **Financial Mathematics (Annuities, Perpetuities, Loan Amortization):** GPs are the backbone of financial models. Annuities (a series of equal payments over time) and perpetuities (annuities that continue indefinitely) are essentially sums of geometric progressions. Calculating present and future values of investments and loans heavily relies on these principles.
4.  **Recurrence Relations in Computer Science:** Analyzing the running time of recursive algorithms often involves setting up recurrence relations. Solving these relations (e.g., using the master theorem) frequently leads to sums of geometric series.
5.  **Fractals:** Many fractal patterns, such as the Koch snowflake or the Sierpinski gasket, are constructed through iterative processes involving geometric scaling. Analyzing their perimeter, area, or dimension often uses concepts from geometric progressions and series.
6.  **Probability Theory:** In certain probability distributions (e.g., the geometric distribution), the probabilities of events form a geometric progression.

## 11. Self-check questions

1.  The first term of a GP is 5 and the common ratio is 2. What is the 7th term of this progression?
2.  A geometric progression has its 2nd term equal to 10 and its 5th term equal to 80. Find the first term and the common ratio.
3.  Find the sum of the first 6 terms of the GP: 4, 12, 36, ...
4.  The sum of the first $n$ terms of a GP is given by $S_n = 5(1 - (0.5)^n)$. Determine the first term and the common ratio of this GP.
5.  A ball is dropped from a height of 100 meters. After each bounce, it rises to 60% of its previous height.
    a) What height does the ball reach after its 3rd bounce?
    b) What is the total vertical distance traveled by the ball when it hits the ground for the 5th time? (Consider both downward and upward travel).