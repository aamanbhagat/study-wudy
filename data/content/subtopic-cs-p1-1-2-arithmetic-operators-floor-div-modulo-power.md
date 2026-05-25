## What it is
Arithmetic operators are symbols that perform mathematical calculations on numerical values. In Python, these operators take one or two numbers (operands) and return a new number, forming the basis of all numerical computation in your code. They are the programming equivalent of the buttons on a calculator.

## Why it matters
These operators are the fundamental building blocks for nearly every quantitative task. In physics and rocket science, you will use them to implement equations of motion, calculate gravitational forces, and model orbital trajectories. In machine learning, they are essential for everything from calculating the error of a model's prediction (e.g., $(y_{actual} - y_{predicted})^2$) to updating model parameters during training.

## When to study it
Before tackling this, you must have a firm grasp of two concepts:
1.  **Variables:** You should know how to create a variable and assign a value to it (e.g., `x = 10`).
2.  **Data Types:** You must understand the difference between an integer (`int`, like `7`) and a floating-point number (`float`, like `7.0`).

If you are not comfortable with these, pause and review them now. The behavior of operators like `/` and `//` depends entirely on data types.

## How to study it (step by step)
1.  **Master the Basics:** Open a Python interpreter. Spend 10 minutes using the four operators you already know from grade school: `+` (addition), `-` (subtraction), `*` (multiplication), and `/` (true division). Notice that `10 / 3` gives `3.333...`, a `float`, even with integer inputs.
2.  **Contrast `/` and `//`:** Now, focus on floor division `//`. Execute `10 / 3` and `10 // 3`. Then try `9 / 3` and `9 // 3`. Articulate the difference in your own words. Floor division truncates (chops off) the decimal part, always resulting in the integer part of the quotient.
3.  **Understand Modulo (`%`):** The modulo operator gives you the *remainder* of a division. Run `10 % 3`. The result is `1`. Why? Because 3 goes into 10 three times (making 9), with 1 left over. Practice with `10 % 2`, `5 % 3`, and `7 % 4` until the pattern is obvious.
4.  **Connect `//` and `%`:** Realize that floor division and modulo are two sides of the same coin. For any two integers `a` and `b`, `a // b` gives the quotient and `a % b` gives the remainder. They reconstruct the original number: `a == (a // b) * b + (a % b)`. Verify this identity with several examples.
5.  **Practice Exponentiation (`**`):** The power operator `**` is straightforward. Calculate `2 ** 3` (result: 8), `3 ** 2` (result: 9), and `5 ** 0.5` (result: square root of 5).
6.  **Test Operator Precedence:** Write a single line of code that uses at least four different operators, like `x = 5 + 2 * 3 - 8 / 4 ** 2`. Predict the result using the PEMDAS/BODMAS order of operations (Parentheses, Exponents, Multiplication/Division, Addition/Subtraction). Then run the code to check your prediction. Python follows this standard hierarchy.

## Key ideas, with intuition
1.  **Operators are just functions in disguise.**
    Writing `a + b` is just a more convenient way of writing a function call like `add(a, b)`. This "infix" notation is purely for human readability. The computer treats them as fundamental operations on data.

2.  **Division has two flavors: True vs. Floor.**
    Think of sharing a pizza. If you have 10 slices to share among 3 people (`10 / 3`), each person gets $3.33...$ slices. This is true division (`/`), and it always produces a `float`. If you can only hand out *whole* slices, each person gets 3 slices (`10 // 3`). This is floor division (`//`).

3.  **Modulo (`%`) is the "leftover".**
    After giving 3 people 3 whole slices each from your 10-slice pizza, you used $3 \times 3 = 9$ slices. You have `1` slice leftover. That leftover is the result of the modulo operator: `10 % 3`. It is fundamentally linked to floor division.
    $$ a = qb + r $$
    In this classic division algorithm equation, $q$ is the quotient (`a // b`) and $r$ is the remainder (`a % b`).

4.  **Exponentiation (`**`) is repeated multiplication.**
    The expression `x ** n` is simply $x$ multiplied by itself $n$ times. `2 ** 4` is $2 \times 2 \times 2 \times 2$. This intuition extends to fractional exponents, where `x ** 0.5` is the square root of $x$.

## Worked example
**Problem:** Convert 7500 seconds into a format of hours, minutes, and seconds.

**Solution:**
We are given a total number of seconds. We need to find how many whole hours fit into it, then how many whole minutes fit into the remainder, and finally the leftover seconds. This is a perfect use case for floor division and modulo.

1.  **Define the total seconds and constants.**
    There are 60 seconds in a minute, and 3600 seconds in an hour.
    ```python
    total_seconds = 7500
    SECONDS_PER_HOUR = 3600
    SECONDS_PER_MINUTE = 60
    ```
    *Reflection: Using named constants makes the code readable and less error-prone.*

2.  **Calculate the number of hours.**
    We need to find how many full 3600-second chunks are in 7500. This is a job for floor division.
    ```python
    hours = total_seconds // SECONDS_PER_HOUR
    # hours = 7500 // 3600 --> 2
    ```
    *Reflection: Floor division (`//`) correctly gives us the count of *whole* hours.*

3.  **Calculate the remaining seconds.**
    After accounting for the hours, how many seconds are left over? This is what the modulo operator is for.
    ```python
    remaining_seconds = total_seconds % SECONDS_PER_HOUR
    # remaining_seconds = 7500 % 3600 --> 300
    ```
    *Reflection: Modulo (`%`) isolates the part of the original number that couldn't be divided evenly.*

4.  **Calculate minutes from the remainder.**
    Now, from the 300 remaining seconds, we find how many full 60-second chunks (minutes) there are.
    ```python
    minutes = remaining_seconds // SECONDS_PER_MINUTE
    # minutes = 300 // 60 --> 5
    ```
    *Reflection: We re-apply the same floor division logic to the smaller remaining amount.*

5.  **Calculate the final seconds.**
    The final seconds are what's left over after finding the minutes from the `remaining_seconds`.
    ```python
    seconds = remaining_seconds % SECONDS_PER_MINUTE
    # seconds = 300 % 60 --> 0
    ```
    *Reflection: The final modulo operation gives us the last piece of the puzzle.*

**Final Result:** 7500 seconds is 2 hours, 5 minutes, and 0 seconds.

## Diagrams
Here is a diagram illustrating `14 // 3` and `14 % 3` on a number line. The floor division (`//`) finds the last multiple of 3 before or at 14, and the modulo (`%`) finds the distance from that multiple to 14.

```text
Let a = 14, b = 3.

We are calculating q = a // b and r = a % b.

The multiples of b=3 are: 0, 3, 6, 9, 12, 15, ...

<--|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|-->
   0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15

                        The largest multiple of 3 that is <= 14 is 12.
                        <------------------------------------------+
                                                                   |
                        12 is the 4th multiple (0-indexed) or 3*4.
                        So, the quotient q = 14 // 3 is 4.
                                                                   |
                                                                   +------>
                                                                   The remainder r is the "distance"
                                                                   from 12 to 14.
                                                                   r = 14 - 12 = 2.
                                                                   So, r = 14 % 3 is 2.
```

## Memory technique — remember this forever
1.  **Mnemonic Story: The Division Machine**
    Imagine a machine that sorts items into boxes. You feed `a` items into it, and you tell it the box size is `b`.
    -   The `a // b` operator tells you how many **full boxes** you get. The `//` symbol looks like the track of a conveyor belt carrying the full boxes away.
    -   The `a % b` operator tells you how many **loose items** are leftover. The `%` symbol looks like a small, swirling pile of leftover items.

2.  **Must-Overlearn Formula:**
    This single identity connects division, floor division, and modulo. It is the definition of integer division. For any integers `a` and `b` (where `b != 0`):
    $$ a = (a \text{ // } b) \times b + (a \text{ %} b) $$
    Burn this into your memory. It is the key.

3.  **Spaced Repetition Schedule:**
    Review this topic and re-derive the formula above at these intervals:
    -   Tomorrow (1 day)
    -   In 3 days
    -   In 1 week (7 days)
    -   In 16 days
    -   In 35 days

4.  **First Principles Pathway:**
    If you forget everything, rebuild from the definition of long division you learned in elementary school. The question "What is 14 divided by 3?" asks "How many times does 3 go into 14, and what is the remainder?" The answer is "It goes in 4 times, with a remainder of 2." That's it.
    -   "How many times does it go in?" $\rightarrow$ Floor Division `//`
    -   "What is the remainder?" $\rightarrow$ Modulo `%`

## Common mistakes
1.  **Expecting `/` to produce an integer.** In Python 3, `/` *always* produces a `float`. `10 / 2` is `5.0`, not `5`. If you need an integer result from division, you must use floor division: `10 // 2` gives `5`.
2.  **Confusing `%` for percentage.** The `%` symbol is the modulo operator, not percentage. To calculate 25 percent of 200, you would write `200 * 0.25`, not `200 % 25`.
3.  **Incorrectly applying modulo with negative numbers.** The result of `a % b` always has the same sign as the divisor `b`. So, `-10 % 3` is `2`, not `-1`. Why? Because we must find `r` such that `-10 = 3 \times q + r`. The next multiple of 3 to the left of -10 is -12 (which is $3 \times -4$). The distance from -12 to -10 is 2.
4.  **Forgetting operator precedence.** Writing `3 + 4 * 5` will result in `23`, not `35`. The multiplication `*` happens before the addition `+`. If you mean to do the addition first, you must use parentheses: `(3 + 4) * 5`.

## Self-check
1.  What is the value and data type of the expression `(50 - 5 * 2) / 8`?
2.  An experiment begins at time $t=0$ and runs for 1,000,000 seconds. A sensor takes a reading every 137 seconds. How many seconds into the experiment will the last reading be taken?
3.  Predict the output of `(-17 // 4)` and `(-17 % 4)`. Then, verify that the identity $a = (a \text{ // } b) \times b + (a \text{ %} b)$ holds for these values.