## What it is
The absolute value (or modulus) of a number is its geometric distance from zero on the number line, regardless of direction. Because distance cannot be negative, the absolute value of a real number is always zero or positive. It effectively strips away the "sign" (positive or negative) of a number and leaves only its "magnitude" or size.

## Why it matters
Absolute value is the mathematical foundation for measuring *error* and *distance*. In machine learning, it is used to calculate Loss (like Mean Absolute Error) to tell an algorithm exactly how far its predictions deviate from reality. In physics and aerospace, you frequently need the magnitude of a vector (such as speed, which is the absolute value of velocity) or the absolute distance between two coordinates, irrespective of how your coordinate system is oriented. 

## When to study it
You must understand basic arithmetic (addition, subtraction) and the concept of negative numbers. You should be comfortable visualizing integers and decimals on a 1D number line. If you cannot reliably compute $3 - 8$ or visualize where $-5$ lives relative to $0$, review the number line and negative arithmetic first.

## How to study it (step by step)
1. Draw a number line from $-10$ to $10$. Plot pairs of numbers like $4$ and $-4$, and physically count the steps back to $0$ for each to prove to yourself they share the same distance.
2. Write down the formal piecewise definition of absolute value (provided below). Substitute negative numbers into it to convince yourself why the negative of a negative is positive.
3. Evaluate basic expressions like $|-7|$, $|0|$, and $|5|$.
4. Solve expressions with internal arithmetic, such as $|3 - 8|$ versus $|8 - 3|$. Notice the symmetry; the distance from A to B is the same as B to A.
5. Translate English distance statements into math. For example, "The distance between $x$ and $5$ is $2$" translates algebraically to $|x - 5| = 2$.

## Key ideas, with intuition

**1. Distance from Zero**
The notation $|x|$ simply asks: "How many units is $x$ away from $0$?" Direction (left or right) does not matter. 

**2. The Piecewise Definition**
This is the rigorous algebraic definition of absolute value. You must understand this to solve equations later:
$$ |x| = \begin{cases} x, & \text{if } x \ge 0 \\ -x, & \text{if } x < 0 \end{cases} $$
*Intuition:* If the number is already positive or zero, do nothing to it. If the number is negative, multiply it by $-1$ to force it to be positive. The $-x$ here does *not* mean the result is negative; it means "take the opposite of the negative number", making it positive.

**3. Distance Between Two Points**
To find the distance between *any* two numbers $a$ and $b$ on the number line, you take the absolute value of their difference:
$$ \text{Distance} = |a - b| = |b - a| $$
*Intuition:* $5 - 2 = 3$, and $2 - 5 = -3$. The physical distance between them is $3$ either way. The absolute value acts as a mathematical measuring tape.

## Worked example
Find the distance between the two points $x = -4$ and $y = 3$ by evaluating the absolute value of their difference.

**Step 1:** Write the formula for distance using absolute value.
$$ \text{Distance} = |x - y| $$

**Step 2:** Substitute the given values.
$$ \text{Distance} = |-4 - 3| $$

**Step 3:** Perform the arithmetic *inside* the absolute value bars first. Treat the bars like parentheses.
$$ \text{Distance} = |-7| $$

**Step 4:** Apply the definition of absolute value. Since $-7 < 0$, we take its opposite.
$$ |-7| = -(-7) = 7 $$

*Reflection:* We performed the inner arithmetic first to find the directed difference ($-7$, meaning $x$ is 7 units to the left of $y$). Applying the absolute value stripped the direction, leaving only the pure magnitude of the distance ($7$).

## Diagrams

```text
1. Absolute value as distance from zero:

      |-4| = 4 steps              |4| = 4 steps
<----------------------->   <----------------------->
  |   |   |   |   |   |   |   |   |   |   |   |   |
 -5  -4  -3  -2  -1   0   1   2   3   4   5   6   7


2. Absolute value as distance between two points (a and b):

         |a - b| = |(-2) - 4| = |-6| = 6 steps
<--------------------------------------------------->
  |   |   |   |   |   |   |   |   |   |   |   |   |
 -3  -2  -1   0   1   2   3   4   5   6   7   8   9
      ^                       ^
      a                       b
```

## Memory technique — remember this forever
1. **Visual hook:** Think of the absolute value bars $|...|$ as the rigid, vertical walls of a trash compactor. They crush the "minus" sign into oblivion, but leave the number's size completely intact.
2. **Must overlearn:**
   * $|x| \ge 0$ for all real numbers $x$.
   * $|a - b|$ is the geometric distance between $a$ and $b$.
   * $|x| = \sqrt{x^2}$. (Squaring a number destroys its sign, and the principal square root returns the positive magnitude. This is how computers often calculate absolute value).
3. **Spaced-repetition schedule:** Review this concept at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget how to handle algebraic absolute values, return to the number line. Ask: "How many steps to zero?" From there, the piecewise definition ($x$ if positive, $-x$ if negative) naturally emerges.

## Common mistakes
* **Applying it too early:** Stripping signs before doing the math inside. $|2 - 5|$ evaluates to $|-3| = 3$. It is NOT $|2| - |-5| = 2 - 5 = -3$. Always evaluate the inside first.
* **Thinking $-x$ is always negative:** In the piecewise definition, students see $-x$ and assume the output is negative. If $x$ is already negative (e.g., $x = -5$), then $-x = -(-5) = 5$. 
* **Distributing absolute value over addition:** Assuming $|a + b| = |a| + |b|$. This is false. For example, $|(-3) + 3| = 0$, but $|-3| + |3| = 6$. (This trap leads to the Triangle Inequality, a crucial concept in higher math).

## Self-check
1. Evaluate the expression: $|-12| - |4 - 6|$.
2. Write an absolute value expression for "the distance between $-8$ and $14$", and then evaluate it.
3. If $|x - 3| = 5$, what are the two possible values for $x$ on the number line? (Hint: Think about distance).