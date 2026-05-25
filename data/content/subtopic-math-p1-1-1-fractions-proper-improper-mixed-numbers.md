## What it is
A fraction $\frac{a}{b}$ represents a division of two integers, where $a$ is the numerator and $b$ is the denominator. A *proper* fraction represents a value strictly between $-1$ and $1$ (the absolute value of the numerator is less than the denominator), an *improper* fraction has a magnitude greater than or equal to $1$, and a *mixed number* expresses an improper fraction as an integer combined with a proper fraction.

## Why it matters
In physics, computer science, and engineering, exact values are non-negotiable. Converting $\frac{1}{3}$ to $0.333$ introduces floating-point errors that compound over thousands of iterations in a simulation or machine learning weight update, eventually causing catastrophic failure. Furthermore, improper fractions are the mandatory standard for algebraic manipulation (like integrating rational functions); mixed numbers are mostly relegated to final, human-readable measurements (e.g., machining a part to "$2 \frac{1}{2}$ inches").

## When to study it
You must have a rock-solid grasp of integer arithmetic: addition, subtraction, multiplication, and division. Crucially, you must understand division with remainders (the foundation of modulo arithmetic). If you cannot confidently state that $23$ divided by $5$ is $4$ with a remainder of $3$, review integer division before proceeding.

## How to study it (step by step)
1. **Define the anatomy:** Write down $\frac{a}{b}$. Understand that $b$ sets the "denomination" (the size of the pieces) and $a$ is the "enumeration" (how many pieces you have).
2. **Visualize the boundary:** Draw circles cut into 4 slices. Shade 3 slices (proper: $\frac{3}{4}$). Shade 5 slices (improper: $\frac{5}{4}$). Notice that 5 slices require more than one whole circle. 
3. **Expose the hidden operation:** Write a mixed number like $3 \frac{1}{4}$. Explicitly rewrite it as an addition problem: $3 + \frac{1}{4}$. 
4. **Derive the conversion:** Convert $3$ into fourths ($\frac{12}{4}$) and add it to $\frac{1}{4}$ to get $\frac{13}{4}$. You have just derived the mixed-to-improper conversion formula.
5. **Reverse the process:** Take an improper fraction like $\frac{17}{5}$. Perform long division: $17 \div 5$. The quotient is the integer part; the remainder is the new numerator.

## Key ideas, with intuition

**1. The Fraction as a Scaling Machine**
Do not just think of fractions as "pizza slices." Think of $\frac{a}{b}$ as an operator that scales a value. It divides the universe by $b$, and then multiplies that result by $a$. If $a < b$ (proper), the system shrinks. If $a > b$ (improper), the system grows.

**2. Mixed Numbers Hide a Plus Sign**
The notation for mixed numbers is mathematically terrible because it looks exactly like implicit multiplication. 
$$ A \frac{b}{c} \neq A \cdot \frac{b}{c} $$
Instead, it is an implicit addition:
$$ A \frac{b}{c} = A + \frac{b}{c} $$

**3. The Common Denominator Bridge**
To convert a mixed number to an improper fraction, you are simply finding a common denominator to execute the hidden addition. 
$$ A + \frac{b}{c} = \left(A \cdot \frac{c}{c}\right) + \frac{b}{c} = \frac{A \cdot c}{c} + \frac{b}{c} = \frac{A \cdot c + b}{c} $$
Intuition: If you have $A$ whole pizzas, and each is cut into $c$ slices, you have $A \cdot c$ slices. Add the $b$ leftover slices, and you have your total slice count.

## Worked example
**Problem:** Convert $4 \frac{2}{7}$ to an improper fraction, multiply it by $2$, and convert the result back to a mixed number.

**Step 1: Convert to improper fraction**
$$ 4 \frac{2}{7} = 4 + \frac{2}{7} $$
Multiply the integer $4$ by $\frac{7}{7}$ to get common units:
$$ \frac{4 \cdot 7}{7} + \frac{2}{7} = \frac{28}{7} + \frac{2}{7} = \frac{30}{7} $$

**Step 2: Multiply by 2**
$$ 2 \cdot \frac{30}{7} = \frac{60}{7} $$

**Step 3: Convert back to a mixed number**
Perform integer division: $60 \div 7$. 
$7 \cdot 8 = 56$, so the quotient is $8$. 
The remainder is $60 - 56 = 4$.
Therefore, the result is:
$$ 8 \frac{4}{7} $$

*Reflection:* Notice how impossible it would be to multiply $4 \frac{2}{7}$ by $2$ cleanly without either converting to an improper fraction or distributing the $2$ across both the integer and the proper fraction. Improper fractions are the engine of computation; mixed numbers are just the paint job.

## Diagrams

```text
The Number Line: Proper vs Improper vs Mixed

      Proper Fractions             Improper Fractions
      (Magnitude < 1)              (Magnitude >= 1)
|-------------------------|-----------------------------------|
0        1/4       3/4    1       5/4       7/4       2      9/4
|---------|---------|-----|--------|---------|--------|-------|
          |         |              |         |                |
        Proper    Proper        Improper  Improper         Improper

Equivalencies:
                            1 = 4/4
                                       1 1/4 = 5/4
                                                 1 3/4 = 7/4
                                                               2 1/4 = 9/4
```

## Memory technique — remember this forever
1. **The Hook:** "Improper for computation, mixed for communication." Never do algebra with a mixed number.
2. **The Fact to Overlearn:** The mixed-number conversion formula: 
$$ A \frac{b}{c} = \frac{Ac + b}{c} $$
3. **Spaced-Repetition Schedule:** Review this conversion and its reverse (using modulo arithmetic) at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget the formula $\frac{Ac + b}{c}$, remember that $A \frac{b}{c}$ is literally $A + \frac{b}{c}$. From there, just execute basic fraction addition by multiplying $A$ by $\frac{c}{c}$.

## Common mistakes
* **Treating mixed numbers as multiplication:** Writing $3 \frac{1}{2}$ and treating it as $3 \cdot \frac{1}{2} = \frac{3}{2}$. It is $3 + \frac{1}{2} = \frac{7}{2}$. This is the single most common error in early algebra.
* **Operating on mixed numbers directly:** Attempting to square $2 \frac{1}{2}$ by squaring the $2$ and squaring the $\frac{1}{2}$ to get $4 \frac{1}{4}$. This is entirely wrong. You must convert to $\frac{5}{2}$ first, square it to get $\frac{25}{4}$, and then convert back to $6 \frac{1}{4}$.
* **Losing the denominator:** When doing long division to convert back to a mixed number, students often forget what the remainder represents. A remainder of $3$ when dividing by $5$ means you have $\frac{3}{5}$ left over, not just a floating "$3$".

## Self-check
1. Convert the mixed number $9 \frac{5}{8}$ into an improper fraction.
2. Convert the improper fraction $\frac{117}{9}$ into a mixed number or integer. 
3. Prove algebraically that squaring a mixed number $A \frac{b}{c}$ does **not** equal $A^2 \frac{b^2}{c^2}$. (Hint: Convert to an improper fraction first, square it, and expand the numerator).