## What it is
Operator precedence in C defines the order in which the compiler groups and evaluates operators in a complex expression. When an expression has multiple operators, precedence rules dictate which operations are performed first, similar to how multiplication is done before addition in mathematics. Associativity is a secondary rule that specifies the evaluation order for operators of the *same* precedence level.

## Why it matters
In scientific computing, physics simulations, and control systems for aerospace, you translate complex mathematical formulas into code. A mistake in operator precedence can lead to a completely wrong result, causing a simulation to diverge, a rocket to veer off course, or a machine learning model to fail to converge. For example, coding the gravitational force $F = G \frac{m_1 m_2}{r^2}$ as `G * m1 * m2 / r * r` is incorrect because it evaluates as $(G \cdot m_1 \cdot m_2 / r) \cdot r$; the correct code, `G * m1 * m2 / (r * r)`, requires explicit grouping with parentheses to override the default left-to-right associativity of `*` and `/`.

## When to study it
Before tackling this, you must be comfortable with all C operators. This includes not just arithmetic (`+`, `-`, `*`, `/`, `%`), but also relational (`>`, `<`, `==`), logical (`&&`, `||`, `!`), bitwise (`&`, `|`, `^`, `~`, `<<`, `>>`), assignment (`=`, `+=`), and pointer/member access operators (`*`, `&`, `->`, `.`). If you are unfamiliar with any of these, pause and review them first.

## How to study it (step by step)
1.  **Scan the Groups:** Don't try to memorize the entire table at once. Instead, look at a full C operator precedence table online or in a reference book and identify the logical *groups* of operators (e.g., postfix, unary, arithmetic, bitwise, logical, assignment). Notice their relative ordering.
2.  **Focus on the Core:** Isolate the most common operators: parentheses `()`, array subscript `[]`, unary `!`, arithmetic `* / % + -`, relational `< > <= >= == !=`, logical `&& ||`, and assignment `=`. Write down just these operators in precedence order. This covers 80% of cases.
3.  **Test Surprising Cases:** Write small `main` functions to test pairs of operators where the precedence isn't obvious. For example, compare bitwise AND `&` with equality `==`. Does `x & MASK == 0` parse as `(x & MASK) == 0` or `x & (MASK == 0)`? Compile and run to see the (often surprising) result.
4.  **Force Precedence with Parentheses:** Take a moderately complex expression like `a * b + c / d - e`. Rewrite it multiple times, using parentheses to force every possible evaluation order (e.g., `a * (b + c) / (d - e)`). Predict the result for each, then write code to verify.
5.  **Analyze Real Code:** Find a line of C code from an open-source physics engine or numerical library (e.g., `Quake III`, `GNU Scientific Library`). Pick a line with 4+ operators. Manually trace the evaluation order according to the precedence table. This builds the skill of reading and verifying complex expressions.

## Key ideas, with intuition
1.  **Precedence Determines Grouping, Not Evaluation Order:** Precedence tells the compiler how to build the expression's "parse tree." It dictates which operands belong to which operators. The actual order of evaluation of sub-expressions (e.g., whether `f()` or `g()` is called first in `f() + g()`) is a separate, more complex topic (sequence points). Think of precedence as putting implicit parentheses around sub-expressions.
    $$ a + b * c \quad \rightarrow \quad a + (b * c) $$
2.  **Associativity Breaks Ties:** When you have a chain of operators with the same precedence, associativity tells you how to group them. Most are left-to-right.
    $$ a - b + c \quad \rightarrow \quad (a - b) + c \quad \text{(Left-to-right)} $$
    The main exception is assignment operators, which are right-to-left. This allows for chaining.
    $$ a = b = c \quad \rightarrow \quad a = (b = c) \quad \text{(Right-to-left)} $$
3.  **Highest and Lowest Precedence Anchors:** Memorize the extremes. The highest precedence operators are the "postfix" operators that bind tightest to their operand: parentheses for function calls `()`, brackets for array access `[]`, and member access `.` and `->`. The lowest precedence operator is the comma `,`, used to sequence expressions. Assignment operators are second-to-last, which makes sense: you want to compute the entire right-hand side *before* assigning it.
4.  **Postfix vs. Unary Prefix:** This is a critical distinction, especially for pointers. Postfix operators like `p++` have higher precedence than unary prefix operators like `*p`. This is why `*p++` is parsed as `*(p++)` (dereference the original address, *then* increment the pointer), not `(*p)++` (increment the value at the address).

## Worked example
Let's fully parse the following expression, assuming `a=3, b=4, c=5, d=1`.

`int result = a > b || c < a * 2 && d;`

1.  **Identify Operators:** We have `>`, `||`, `<`, `*`, `&&`.
2.  **Consult Precedence Table:**
    -   Level 3: `*` (Multiplicative)
    -   Level 6: `<` and `>` (Relational)
    -   Level 11: `&&` (Logical AND)
    -   Level 12: `||` (Logical OR)
    -   (Assignment `=` is level 14, evaluated last).
3.  **Apply Grouping (Implicit Parentheses):** Based on precedence, the expression is grouped as follows, from highest precedence to lowest:
    -   First, `*` has the highest precedence: `a * 2` is grouped.
        `a > b || c < (a * 2) && d`
    -   Next, `<` and `>` are at the same level. They have left-to-right associativity.
        `(a > b) || (c < (a * 2)) && d`
    -   Next, `&&` has higher precedence than `||`.
        `(a > b) || ((c < (a * 2)) && d)`
    -   Finally, `||` is the main operator connecting the two halves. The whole expression is now fully grouped.
4.  **Evaluate Sub-expressions:** Now we substitute values and evaluate from the inside out.
    -   `(a * 2)` becomes `(3 * 2)` which is `6`.
    -   `(a > b)` becomes `(3 > 4)` which is `0` (false).
    -   `(c < 6)` becomes `(5 < 6)` which is `1` (true).
    -   `((c < (a * 2)) && d)` becomes `(1 && 1)` which is `1` (true).
    -   `(a > b) || ...` becomes `0 || 1` which is `1` (true).
5.  **Final Assignment:** `result = 1;`

**Reflection:** The key was identifying that `*` was evaluated first, followed by the relational operators, then `&&`, and finally `||`. A common mistake would be to evaluate left-to-right, which would incorrectly calculate `(3 > 4) || 5 ...` leading to `0 || 5 ...`, which is true, but for the wrong reason due to C's short-circuiting rules. The structure of the logic is fundamentally different and incorrect without precedence.

## Diagrams
This ASCII diagram shows the parse tree for the worked example. Operations with higher precedence are lower in the tree, meaning they and their children form sub-trees that are evaluated first.

```text
        ||
       /  \
      >    &&
     / \   / \
    a   b <   d
         / \
        c   *
           / \
          a   2
```

The structure shows that `a*2` must be resolved to provide a value for `<`, which in turn must be resolved along with `d` to provide a value for `&&`. The `&&` and `>` sub-trees must be resolved before the final `||` can be evaluated.

## Memory technique — remember this forever
1.  **Mnemonic:** The full table is too much. Memorize the major groups in order. A ridiculous sentence is more memorable than a dry list. **"P**ost-**U**niversity **M**aths **A**nd **S**cience **R**equire **E**xtremely **L**ogical **C**onditional **A**ssignments **C**onstantly."
    -   **P**ostfix (`() [] -> . ++ --`)
    -   **U**nary (`! ~ ++ -- * & sizeof`)
    -   **M**ultiplicative (`* / %`)
    -   **A**dditive (`+ -`)
    -   **S**hift (`<< >>`)
    -   **R**elational (`< <= > >=`)
    -   **E**quality (`== !=`)
    -   bitwise **L**ogical (`& ^ |`)
    -   logical **C**onditional (`&& ||`)
    -   **A**ssignment (`= += ...`)
    -   **C**omma (`,`)

2.  **Must Overlearn:**
    -   `* / %` are higher than `+ -`. (Standard math)
    -   `&&` is higher than `||`. (AND is like multiplication, OR is like addition).
    -   **When in doubt, use parentheses.** This is the professional C programmer's primary rule. Code clarity is more important than showing off that you memorized the table.

3.  **Spaced Repetition Schedule:**
    -   Day 1: Write the mnemonic and the top 5 operator groups from memory.
    -   Day 3: Re-do the worked example from this lesson without looking.
    -   Day 7: Write a small program that demonstrates the difference between `*p++` and `(*p)++`.
    -   Day 16: Write down the full mnemonic and list all operator groups.
    -   Day 35: Find a complex `if` statement in a real project and draw its parse tree.

4.  **First Principles Pathway:** If you forget, your fallback is not derivation but **empirical testing**. Write a minimal program.
    `printf("%d\n", 3 + 4 * 5);`
    Is the output 35 or 23? The compiler is the ultimate source of truth. This is how you can always reconstruct the precedence between any two operators.

## Common mistakes
1.  **Bitwise vs. Logical in `if` statements:** Writing `if (x & MASK == 0)` is a classic bug. `==` has higher precedence than `&`, so this is parsed as `if (x & (MASK == 0))`. This checks if `MASK` is zero, then bitwise-ANDs that `0` or `1` result with `x`. The correct form is `if ((x & MASK) == 0)`.
2.  **Assignment in Comparisons:** Writing `if (x = 5)` instead of `if (x == 5)`. The assignment operator `=` has very low precedence. The expression `x = 5` evaluates to the value assigned, which is `5`. Since `5` is non-zero, the `if` statement is always true.
3.  **Pointer Dereference vs. Postfix Increment:** As mentioned, `*p++` is one of the most common points of confusion. It means "get the value at `p`, then increment `p`". To increment the value *pointed to* by `p`, you must use parentheses to force the correct precedence: `(*p)++`.

## Self-check
1.  What is the value of `x` after this line? `int x = 7 + 8 / 4 * 2 - 1;`
2.  An `int flags` variable stores multiple boolean settings as bits. To check if both `FLAG_A` (value `0b0010`) and `FLAG_B` (value `0b1000`) are set, a junior programmer writes `if (flags & FLAG_A && flags & FLAG_B)`. Will this work as intended? Why or why not? What is the correct way to write it?
3.  Given `int a = 1, b = 2, c = 0;`, what is the final value of `a` after this statement? `a = b > c ? a : b && c;` Trace the evaluation step-by-step.