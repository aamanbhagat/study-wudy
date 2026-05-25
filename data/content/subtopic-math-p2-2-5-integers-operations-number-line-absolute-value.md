## What it is
Integers are the set of whole numbers, their negative counterparts, and zero, denoted mathematically by $\mathbb{Z}$. They extend the natural numbers to allow subtraction without restriction, meaning you can subtract a larger number from a smaller one and still land on a valid number. The number line provides a 1D geometric map of this set, while absolute value mathematically isolates a number's pure magnitude (its distance from zero), stripping away its directional sign.

## Why it matters
In physics and rocket science, integers form the backbone of 1D kinematics and vector mechanics, where positive and negative signs distinguish forward thrust from retrograde braking. In computer science, signed integers are fundamental data types used for memory addressing and discrete algorithmic steps. Absolute value is the mathematical foundation for calculating magnitudes, tolerances, and error margins—critical concepts when a trajectory deviation of $-5$ meters is just as fatal as a deviation of $+5$ meters.

## When to study it
You must already have absolute mastery over the natural numbers ($\mathbb{N} = \{1, 2, 3, \dots\}$), the concept of zero, and basic arithmetic operations (addition, subtraction, multiplication, and division of positive whole numbers). If you cannot fluently perform basic operations on natural numbers, stop and review foundational arithmetic first. 

## How to study it (step by step)
1. **Draw the geometry:** Draw a physical number line. Practice adding by translating right and subtracting by translating left. Treat numbers as physical locations.
2. **Isolate magnitude:** Define absolute value $|x|$ as a physical distance from zero. Calculate $|x|$ for 10 random positive and negative integers.
3. **Prove the multiplication rules:** Derive for yourself why a negative times a negative is positive using the distributive property: $a(b + (-b)) = 0$. 
4. **Master mixed operations:** Solve 15 mixed-sign addition and subtraction problems. Visualize them strictly as net translations on your number line.
5. **Separate parity from magnitude:** Solve 15 multiplication and division problems. Calculate the numerical magnitude first, then determine the final sign by tracking the parity (even/odd count) of the negative signs.

## Key ideas, with intuition

**The Set $\mathbb{Z}$**
The integers are defined as $\mathbb{Z} = \{\dots, -3, -2, -1, 0, 1, 2, 3, \dots\}$. They are closed under addition, subtraction, and multiplication. This means performing these operations on any two integers will always yield another integer. 

**Operations as Geometric Transformations**
Think of addition and subtraction as sliding along the number line. Adding a negative number is identical to subtracting a positive number: both are translations to the left. 
Multiplication by a negative number is a *scaling and a reflection*. Multiplying by $-1$ flips your position exactly 180 degrees across zero. 

**The Logic of Multiplying Negatives**
Why does $(-1) \times (-1) = 1$? We do not accept this on faith; we derive it. Consider the equation:
$$ (-1) \times (1 + (-1)) $$
Inside the parentheses, $1 + (-1) = 0$, so the total expression must equal $0$. Distributing the $-1$ gives:
$$ (-1)(1) + (-1)(-1) = 0 $$
Since $(-1)(1) = -1$, we have:
$$ -1 + (-1)(-1) = 0 $$
For this equation to hold true, $(-1)(-1)$ *must* equal $1$.

**Absolute Value**
Denoted as $|x|$, absolute value is geometric distance. Because distance cannot be negative, $|x|$ is always non-negative. Formally, it is a piecewise function:
$$ |x| = \begin{cases} x & \text{if } x \ge 0 \\ -x & \text{if } x < 0 \end{cases} $$
Read the second condition carefully: if $x$ is *already* negative, applying another negative sign ($-x$) makes the result positive. 

## Worked example
Evaluate the expression: 
$$ -3 \times |-5 + 2| - (-4) $$

**Step 1:** Evaluate inside the absolute value first (treat it as a grouping symbol).
$$ -5 + 2 = -3 $$
Expression becomes: $$ -3 \times |-3| - (-4) $$
*Why:* Order of operations dictates we resolve inner grouping symbols before outer operations.

**Step 2:** Apply the absolute value.
$$ |-3| = 3 $$
Expression becomes: $$ -3 \times 3 - (-4) $$
*Why:* Absolute value measures distance from zero. The distance of $-3$ from $0$ is $3$.

**Step 3:** Perform multiplication.
$$ -3 \times 3 = -9 $$
Expression becomes: $$ -9 - (-4) $$
*Why:* A negative times a positive is a negative (a 180-degree reflection of a positive magnitude).

**Step 4:** Resolve the double negative.
$$ -9 + 4 $$
*Why:* Subtracting a negative is equivalent to adding a positive. You are removing a deficit, which increases your total.

**Step 5:** Final addition.
$$ -9 + 4 = -5 $$
*Why:* Starting at $-9$ on the number line and translating $4$ units to the right lands on $-5$.

## Diagrams

```text
Number Line Transformations: Addition

Adding a negative: 3 + (-5) = -2
     (-5) translation left
<-------------------------+
                          |
<---|----|----|----|----|----|----|----|--->
   -3   -2   -1    0    1    2    3    4

------------------------------------------------

Absolute Value: |-3| = 3 and |3| = 3

     Distance = 3         Distance = 3
+-----------------> 0 <-----------------+
|                   |                   |
<---|----|----|----|----|----|----|----|--->
   -3   -2   -1    0    1    2    3    4
```

## Memory technique — remember this forever

1. **Visual Hook:** Treat the negative sign ($-$) as a strict command to "flip 180 degrees around zero." One negative flips you backward. Two negatives flip you 360 degrees, pointing you forward exactly where you started.
2. **Facts to overlearn:**
   * The piecewise definition of absolute value: $|x| = x$ if $x \ge 0$, and $|x| = -x$ if $x < 0$.
   * Subtracting a negative is adding a positive: $a - (-b) = a + b$.
3. **Spaced-repetition schedule:** Review these concepts and do 3 practice problems at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you ever forget the rules for multiplying negatives, rebuild them using the distributive property on zero: $a \times (b - b) = 0$. Substitute $-1$ for $a$ and $1$ for $b$, and the algebra will force the correct sign.

## Common mistakes
* **Thinking $-x$ is always a negative number:** If $x = -5$, then $-x = 5$. The negative sign means "opposite of", not "less than zero."
* **Confusing addition rules with multiplication rules:** Students learn "two negatives make a positive" for multiplication ($(-2)(-3) = 6$) and fatally apply it to addition, incorrectly claiming $-2 + (-3) = 5$. A step left plus another step left is a bigger step left ($-5$).
* **Misplacing exponents with negatives:** $-3^2 = -9$, but $(-3)^2 = 9$. Without parentheses, the exponent applies *only* to the integer magnitude, not the negative sign.

## Self-check
1. Evaluate: $|-8| - |-12| + (-3)(-4)$.
2. If $x = -2$ and $y = -5$, evaluate $x^2 - xy + |y|$.
3. For what set of integer values of $x$ is the mathematical statement $|x| = -x$ true?