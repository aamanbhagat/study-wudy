## What it is
Floating-point "gotchas" are counter-intuitive and incorrect results that arise from the finite precision of computer arithmetic. **Catastrophic cancellation** is the drastic loss of significant figures when subtracting two nearly equal numbers. **Associativity failure** is the fact that for floating-point numbers $a, b, c$, the computed result of $(a+b)+c$ is not always equal to $a+(b+c)$.

## Why it matters
These are not theoretical curiosities; they cause real-world failures. In aerospace, accumulating small errors in an inertial navigation system can lead to significant positional drift over time. In machine learning, calculating gradients for deep neural networks involves many summations and subtractions where these errors can compound, leading to unstable training or incorrect weight updates.

## When to study it
Before tackling this, you must have a firm grasp of the **IEEE 754 standard for floating-point numbers**. This includes understanding the representation of a number as a sign, an exponent, and a mantissa (or significand). You should also understand the concept of **machine epsilon** ($\epsilon_{mach}$), which is the smallest number that, when added to 1, gives a result different from 1.

## How to study it (step by step)
1.  **Review IEEE 754.** In a Python interpreter, use `struct.pack('>d', 1.0)` to see the 64-bit representation of `1.0`. Manually decode the sign, exponent, and mantissa bits. Convince yourself you understand how a number is stored.
2.  **Demonstrate associativity failure.** Write a Python script to compute `(0.1 + 0.2) + 0.3` and `0.1 + (0.2 + 0.3)`. Print the results to 20 decimal places and observe the difference. Now try `(1e18 + 1) - 1e18` versus `1e18 + (1 - 1e18)`. Explain why the results differ.
3.  **Derive the error.** Consider two numbers $x$ and $y$ that are very close, $x \approx y$. Let their machine representations be $fl(x)$ and $fl(y)$. Show that the relative error of computing $x-y$ can be enormous, far exceeding machine epsilon.
4.  **Find the root of a quadratic.** Implement a function to find the roots of $ax^2+bx+c=0$ using the standard formula $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$. Test it on $x^2 + 10^8 x + 1 = 0$. One root will be highly inaccurate due to catastrophic cancellation.
5.  **Fix the quadratic root finder.** Modify your function from step 4. Calculate the more accurate root $x_1$ first (the one that avoids subtraction). Then, use the property that for a quadratic, the product of roots is $x_1 x_2 = c/a$. Calculate the second root as $x_2 = c/(ax_1)$. Verify that this gives a much more accurate result.

## Key ideas, with intuition
1.  **Numbers are stored with finite precision.** A 64-bit float (a `double`) has a 52-bit mantissa. This means it can only store about 15-17 significant decimal digits. Any digits beyond that are lost. Think of it as having to write down all your numbers on a fixed-size note card.
    $$ x_{float} = \pm (1.b_1 b_2 \dots b_{52})_2 \times 2^{e-1023} $$
    The mantissa $(1.b_1 \dots)_2$ is a fixed-length bucket for your significant digits.

2.  **Subtraction kills information.** Imagine you measure two lengths with a high-precision ruler: $L_1 = 9.87654321$ m and $L_2 = 9.87654311$ m. The difference is $L_1 - L_2 = 0.00000010$ m. You started with 9 significant digits of information in each measurement, but the result has only two. The leading digits, which were identical, cancelled out, and the result's precision is dominated by the least-significant, and therefore noisiest, digits of the original numbers.

3.  **Large numbers swamp small numbers.** Floating-point addition requires aligning the decimal points (or binary points). To add $10^{20}$ and $1$, you must write them as $1.000\dots0 \times 10^{20}$ and $0.000\dots1 \times 10^{20}$. Since the mantissa can only hold ~16 digits, the 1 from the second number falls off the end and is lost *before the addition even happens*. This is why $(10^{20} + 1) - 10^{20}$ evaluates to $0.0$, not $1.0$. The order of operations dictates which numbers get swamped.

## Worked example
We will find the roots of $x^2 + 1000x + 0.0001 = 0$.
Here, $a=1$, $b=1000$, $c=0.0001$.
The discriminant is $D = \sqrt{b^2 - 4ac} = \sqrt{1000^2 - 4(1)(0.0001)} = \sqrt{1000000 - 0.0004}$.

Let's compute this using standard double-precision floating-point arithmetic, which has about 16 decimal digits of precision.
$b^2 = 1.000000000000000 \times 10^6$
$4ac = 4.000000000000000 \times 10^{-4}$

To subtract these, we must align the exponents:
$b^2 - 4ac \approx 1000000.000000000 - 0.000400000000000 = 999999.9996000000$
So, $D = \sqrt{999999.9996} \approx 999.9999998$.

Now, let's find the roots using the standard quadratic formula: $x = \frac{-b \pm D}{2a}$.

**Root 1:**
$x_1 = \frac{-1000 + 999.9999998}{2} = \frac{-0.0000002}{2} = -0.0000001$ (or $-1 \times 10^{-7}$).
This calculation involves the subtraction of two very nearly equal numbers: `-1000` and `+999.999...`. This is a classic case of **catastrophic cancellation**. We started with numbers known to ~16 significant digits, but our result has only one or two.

**Root 2:**
$x_2 = \frac{-1000 - 999.9999998}{2} = \frac{-1999.9999998}{2} = -999.9999999$.
This calculation is fine. We are adding two numbers of the same sign, so no cancellation occurs.

**The numerically stable fix:**
We trust $x_2$ because it didn't involve cancellation. We use the property that $x_1 x_2 = c/a$.
$x_1 = \frac{c}{a x_2} = \frac{0.0001}{1 \times (-999.9999999)} \approx -1.000000001 \times 10^{-7}$.

**Reflection:**
1.  The standard formula forced a subtraction of two nearly equal numbers for one of the roots, destroying its precision.
2.  The second root's calculation was numerically stable as it involved addition (subtraction of a negative).
3.  By reformulating the problem using an identity ($x_1 x_2 = c/a$), we avoided the catastrophic cancellation and computed the small root accurately. This pattern of algebraic rearrangement to avoid subtraction of nearly-equal terms is a fundamental technique in numerical analysis.

## Diagrams
```text
Catastrophic Cancellation: Subtracting two nearby numbers.

Number x: 1.101101101011010... x 2^5
Number y: 1.101101101011001... x 2^5
          ^-----------------^
          These 14 bits are identical.

x - y:    0.000000000000001... x 2^5
          <-- Leading bits cancel, information is lost.

Result must be renormalized:
          1................... x 2^(5-15) = 1... x 2^-10
          ^
          This digit was once the 15th bit, prone to error.
          The digits that follow are effectively garbage.
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:**
    *   **Catastrophic Cancellation:** Think of two rich twins, each with a net worth of \$1,000,000,001. One has a debt of \$1,000,000,000. If you try to calculate their combined net worth by first adding the assets and then subtracting the debt, you get \$1,000,000,002. But if you first calculate the indebted twin's net worth (\$1) and add it to the other's (\$1,000,000,001), you also get \$1,000,000,002. Now imagine your calculator only has 4 digits of precision. \$1.000e9 - \$1.000e9 = \$0. The \$1 is lost. **Subtracting nearly identical giants makes the dwarf disappear.**
    *   **Associativity Failure:** A billionaire ($10^9$) walks into a bar with a regular person (\$100). The billionaire's wealth doesn't noticeably change. Then a second regular person (\$100) walks in. Same result. But if the two regular people combine their money first (\$200), and *then* meet the billionaire, their combined wealth is still swamped. The order doesn't save them. The key is adding the small numbers *to each other* first, to build them up into a sum that might be large enough to register against the big number.

2.  **Must-know patterns (not formulas):**
    *   **Cancellation Trigger:** Be suspicious of any formula involving $x - y$ where it's possible that $x \approx y$.
    *   **Associativity Trigger:** Be suspicious of summing values with vastly different magnitudes, e.g., $\sum_{i=1}^N x_i$ where $\max(|x_i|) \gg \min(|x_i|)$.

3.  **Spaced Repetition Schedule:**
    *   Review these ideas and your coded examples in **1 day**.
    *   Re-derive the quadratic formula example from scratch in **3 days**.
    *   Explain the concepts to a wall or a friend in **7 days**.
    *   Find a new example online (e.g., calculating standard deviation) in **16 days**.
    *   Re-read this mini-lesson in **35 days**.

4.  **First Principles Pathway:** If you forget, start from the IEEE 754 representation: $x = \pm M \times 2^E$, where $M$ is a mantissa of fixed bit-length. Write down two numbers, $x_1$ and $x_2$, with the same sign and exponent, and nearly identical mantissas. Perform binary subtraction on the mantissas. You will see the leading bits become zero. To re-normalize the result into the form $1.\dots \times 2^{E'}$, you must shift the result left, and the new bits you feed in on the right are zeros—they are not real information. The loss is visible.

## Common mistakes
1.  **Using `==` for floats.** Never test `if a == b:` if `a` and `b` are floats. Always test if they are close: `if abs(a - b) < tolerance:`.
2.  **Ignoring order of summation.** When summing a long list of numbers, if you add them in the given order, you might be adding small numbers to an already large running total, causing them to be swamped. Summing the list from smallest magnitude to largest is generally more accurate.
3.  **Trusting library functions blindly.** While most core library functions (e.g., `math.log1p` which computes $\ln(1+x)$) are designed to be numerically stable, your *use* of them might not be. For example, computing `log(x) - log(y)` is less stable than computing `log(x/y)`.
4.  **Thinking this only happens for strange numbers.** Catastrophic cancellation can happen in very common calculations, like finding the distance between two points that are close together in a large coordinate system (e.g., GPS coordinates for two people standing next to each other).

## Self-check
1.  Without running the code, what do you expect to be the result of `1.0 - (1.0 - 3e-17)` in standard Python? What about `(1.0 - 1.0) + 3e-17`? Explain the difference in terms of machine epsilon.
2.  The function $f(x) = \frac{1 - \cos(x)}{x^2}$ is numerically unstable for $x \approx 0$. Why? Rewrite the function using a trigonometric identity to make it stable for small $x$.
3.  Consider calculating the variance of a dataset $X = \{x_1, \dots, x_N\}$ with mean $\mu$. The two common formulas are $V_1 = \frac{1}{N} \sum_{i=1}^N (x_i - \mu)^2$ and $V_2 = (\frac{1}{N} \sum_{i=1}^N x_i^2) - \mu^2$. If the data points are all very close to each other but far from zero (e.g., measuring the diameter of a specific type of atom), which formula will suffer more from catastrophic cancellation, and why?