## What it is
The order of operations is a universal set of grammatical rules for mathematics that dictates the sequence in which multiple operations within a single expression are evaluated. Nested brackets are simply grouping symbols placed inside other grouping symbols, which must be resolved from the innermost layer outward to ensure the expression has exactly one unambiguous interpretation.

## Why it matters
Without strict precedence rules, mathematical communication collapses. If $2 + 3 \times 4$ could mean either $20$ or $14$, equations lose their predictive power. In computer science, compilers use these exact rules to parse code into abstract syntax trees. In physics and aerospace, misinterpreting an equation like $F = G \frac{m_1 m_2}{r^2}$ by dividing before squaring the radius will yield catastrophically wrong orbital trajectories. 

## When to study it
You must already understand basic arithmetic (addition, subtraction, multiplication, division) and have a conceptual grasp of exponents (repeated multiplication). If you cannot confidently evaluate $3^2$ or $12 / 4$, review those foundational operations first. 

## How to study it (step by step)
1. **Memorize the hierarchy:** Brackets/Parentheses, Orders/Exponents, Division & Multiplication, Addition & Subtraction. 
2. **Master the left-to-right rule:** Write out expressions containing *only* division and multiplication (e.g., $16 / 4 \times 2$). Evaluate them strictly left-to-right to break the habit of prioritizing multiplication over division.
3. **Trace the layers:** Write down an expression with nested brackets: `[ { ( ) } ]`. Use a highlighter to identify the innermost bracket. Do not solve it; just practice identifying the starting point.
4. **Solve with strict rewriting:** Evaluate complex expressions by performing exactly one operation per line. Rewrite the *entire* remaining expression on the next line. Do not take shortcuts.
5. **Map to trees:** Draw abstract syntax trees (see Diagrams) for simple equations to visualize how precedence forces a bottom-up evaluation.

## Key ideas, with intuition
**1. Operations are ranked by "density."**
Addition is the base. Multiplication is just repeated, or "dense," addition: $3 \times 4 = 4+4+4$. Exponents are repeated multiplication: $4^3 = 4 \times 4 \times 4$. You must unpack the denser operations before you can combine them with the simpler ones. Therefore, Exponents > Multiplication > Addition.

**2. Multiplication and Division are the same thing.**
Division is merely multiplication by a fraction ($x / y = x \times \frac{1}{y}$). Because they are mathematically identical in weight, neither gets priority. When they appear together, you process them as you read: from left to right. The same logic applies to Addition and Subtraction.

**3. Brackets are manual overrides.**
Brackets allow you to violate the natural density hierarchy. They act as a quarantine zone. If you see $2 \times (3 + 4)$, the brackets force you to evaluate the addition *before* the multiplication. Nested brackets are a queue of overrides; you must resolve the deepest quarantine zone first before the outer layers can be evaluated.

## Worked example
Evaluate the following expression: 
$$3 + 2 \times [ 8 - 3 \times (4 - 2^2 / 2) ]$$

**Step 1:** Locate the innermost bracket: $(4 - 2^2 / 2)$. Inside it, evaluate the exponent first.
$$3 + 2 \times [ 8 - 3 \times (4 - 4 / 2) ]$$

**Step 2:** Inside the innermost bracket, evaluate the division.
$$3 + 2 \times [ 8 - 3 \times (4 - 2) ]$$

**Step 3:** Complete the innermost bracket by evaluating the subtraction.
$$3 + 2 \times [ 8 - 3 \times 2 ]$$

**Step 4:** The parentheses are gone. Now look at the square brackets: $[ 8 - 3 \times 2 ]$. Evaluate the multiplication first.
$$3 + 2 \times [ 8 - 6 ]$$

**Step 5:** Complete the square bracket by evaluating the subtraction.
$$3 + 2 \times 2$$

**Step 6:** We are left with basic operations. Evaluate the multiplication first.
$$3 + 4$$

**Step 7:** Evaluate the addition.
$$7$$

*Reflection:* By rewriting the entire line at every step, we maintained the structure of the equation. Trying to hold the "outside" of the equation in your head while solving the "inside" is the primary cause of arithmetic errors.

## Diagrams
In computer science, expressions are parsed into Abstract Syntax Trees (ASTs). The computer evaluates the tree from the bottom up. Brackets force nodes lower down the tree.

Consider the expression: $2 \times (3 + 4)$

```text
      AST for 2 * (3 + 4)
      
             [*]          <-- Evaluated LAST (Root)
            /   \
          (2)   [+]       <-- [+] is evaluated FIRST because brackets
                / \           pushed it down the tree.
              (3) (4)

      AST for 2 * 3 + 4   (No brackets)
      
             [+]          <-- Evaluated LAST (Root)
            /   \
          [*]   (4)       <-- [*] naturally sits lower than [+]
          / \                 due to order of operations.
        (2) (3)
```

## Memory technique — remember this forever
1. **The Hook:** Think of nested brackets like an **Onion**. You cannot touch the outer layers until you have dealt with the core. 
2. **Must Overlearn:** 
   * PEMDAS/BODMAS is a lie if read linearly. It is not 6 steps, it is 4 tiers:
     1. **P**arentheses / **B**rackets
     2. **E**xponents / **O**rders
     3. **M** & **D** (Left-to-Right)
     4. **A** & **S** (Left-to-Right)
3. **Spaced-repetition schedule:** Review this concept by solving one complex nested-bracket problem at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget the order, remember the "density" of operations. Exponents are built of multiplication; multiplication is built of addition. You must unpack the heavy, dense operations before you can add them to simple numbers.

## Common mistakes
* **The "M before D" Trap:** Students often calculate $16 / 2 \times 4$ as $16 / 8 = 2$. This is wrong. Multiplication and division have *equal* priority. Going left-to-right: $(16 / 2) \times 4 = 8 \times 4 = 32$.
* **Implicit Multiplication Confusion:** In an expression like $6 / 2(1+2)$, students get confused by the number adjacent to the bracket. Treat $2(1+2)$ as $2 \times (1+2)$. The expression is $6 / 2 \times 3$, which evaluates left-to-right to $9$.
* **Ghosting:** Solving a piece of the equation on scratch paper and forgetting to bring down the rest of the equation, leading to lost negative signs or dropped multipliers.

## Self-check
1. Evaluate: $10 - 2 \times 3 + 4$
2. Evaluate: $24 / 4 \times 2 - (3 + 1)^2$
3. Evaluate: $5 \times [ 12 - 2 \times ( 18 / (3 \times 2) ) ]$