## What it is
A linear equation in one variable is a mathematical statement asserting equality between two expressions containing a single unknown quantity, where that unknown is raised only to the first power. The transposition method is a systematic algebraic technique for isolating this variable by shifting terms across the equals sign, which inherently inverts their mathematical operations.

## Why it matters
This is the absolute bedrock of algebraic manipulation. You cannot progress in mathematics, physics, or computer science without mastering it. In orbital mechanics, you will isolate variables to find the time $t$ required to reach a specific velocity $v$ using $v = v_0 + at$. In computer science, you will solve linear constraints to optimize algorithms. If you cannot transpose terms fluidly, higher-level math will be an impenetrable wall.

## When to study it
You must already possess a rock-solid understanding of:
1. Basic arithmetic operations (addition, subtraction, multiplication, division).
2. Operations with negative numbers and fractions.
3. The order of operations (PEMDAS/BODMAS).
4. The concept of mathematical equality.

If you struggle with adding negative fractions or get confused by $-(-5)$, stop and fix your arithmetic foundation before proceeding.

## How to study it (step by step)
1. **Master the Axiom of Equality (30 mins):** Write down simple true statements (e.g., $5 = 5$). Add, subtract, multiply, and divide the same number on both sides to prove to yourself that equality is maintained.
2. **Isolate via Addition/Subtraction (20 mins):** Practice equations of the form $x + a = b$. Apply the additive inverse to both sides to solve for $x$. 
3. **Isolate via Multiplication/Division (20 mins):** Practice equations of the form $ax = b$. Apply the multiplicative inverse (divide by $a$) to both sides.
4. **Learn the Transposition Shortcut (30 mins):** Re-solve the problems from steps 2 and 3, but this time, skip writing the operation on both sides. Instead, physically "move" the term across the equals sign and invert its operation.
5. **Combine Operations (30 mins):** Solve equations of the form $ax + b = c$. Work from the outside in: transpose the loose constants first, then transpose the coefficient.
6. **Variables on Both Sides (30 mins):** Solve equations like $ax + b = cx + d$. Group all variable terms on the left and all constant terms on the right using transposition.

## Key ideas, with intuition

**The Equals Sign as a Rigid Fulcrum**
An equation is a perfectly balanced scale. The fundamental rule of algebra is: *Whatever you do to one side, you must do to the exact same extent to the other side.* 

**Inverse Operations**
To "undo" an operation, you apply its opposite. Addition undoes subtraction. Multiplication undoes division. To isolate a variable, you systematically strip away the numbers attached to it by applying inverse operations.

**Transposition is a Shortcut, Not Magic**
Consider the equation:
$$x - 5 = 10$$
Strictly speaking, we add $5$ to both sides to maintain balance:
$$x - 5 + 5 = 10 + 5$$
$$x = 15$$
Transposition skips the middle step. We simply move the $-5$ across the equals sign and flip its operation to $+5$:
$$x = 10 + 5$$
This is mathematically identical. You are not "teleporting" numbers; you are efficiently applying the Axiom of Equality.

**Order of Unpacking (SADMEP)**
When isolating a variable, you generally reverse the standard order of operations. Deal with loose Subtraction and Addition first, then Multiplication and Division. Strip the equation from the outside in.

## Worked example
Solve for $x$: 
$$4x - 7 = 2x + 9$$

**Step 1: Group variable terms on one side.**
Transpose $2x$ from the right side to the left. Its implied sign is positive, so it becomes negative.
$$4x - 2x - 7 = 9$$
$$2x - 7 = 9$$
*Why it worked:* Subtracting $2x$ from both sides consolidates the unknown into a single term.

**Step 2: Group constant terms on the other side.**
Transpose $-7$ from the left side to the right. It becomes $+7$.
$$2x = 9 + 7$$
$$2x = 16$$
*Why it worked:* Adding $7$ to both sides isolates the variable term.

**Step 3: Isolate the variable.**
Transpose the coefficient $2$. Since it is multiplying $x$, it moves to the other side as division.
$$x = \frac{16}{2}$$
$$x = 8$$
*Why it worked:* Dividing both sides by $2$ strips the final coefficient, leaving $x$ completely alone.

**Step 4: Verify.**
$$4(8) - 7 = 32 - 7 = 25$$
$$2(8) + 9 = 16 + 9 = 25$$
$$25 = 25$$ (True).

## Diagrams

```text
THE BALANCE SCALE OF EQUALITY
If you add a weight to one side, you must add it to the other.

       4x - 7         =         2x + 9
         \                         /
          \                       /
           \                     /
            \_______     _______/
                    |   |
                    |   |
                   /     \
                  ---------

THE TRANSPOSITION BRIDGE
Crossing the equals sign flips the mathematical operation.

      [ + ]  ====== becomes =====> [ - ]
      [ - ]  ====== becomes =====> [ + ]
      [ * ]  ====== becomes =====> [ / ]
      [ / ]  ====== becomes =====> [ * ]

Example:
      x - 5 = 10
          |
          +-----> moves right, becomes + 5
      x     = 10 + 5
```

## Memory technique — remember this forever

1. **The Mnemonic:** *"Change sides, change signs."* (For addition/subtraction). *"Cross the line, flip the sign (operation)."*
2. **Overlearn these facts:**
   * If $x + a = b$, then $x = b - a$.
   * If $ax = b$, then $x = \frac{b}{a}$.
3. **Spaced-repetition schedule:** Review these steps and solve 3 new equations at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **The First Principles Pathway:** If you ever get confused about whether a transposed term should be positive or negative, abandon the transposition shortcut. Go back to the Axiom of Equality. Ask yourself: *"What exact operation must I perform on BOTH sides to turn this specific term into zero (for addition) or one (for multiplication)?"*

## Common mistakes
1. **Sign errors during transposition:** Moving a $+3$ to the other side and writing it as $+3$ instead of $-3$. Always flip the operation.
2. **Partial division:** Given $2x + 4 = 10$, a student might divide by $2$ to isolate $x$, but forget to divide the $4$. They incorrectly write $x + 4 = 5$. If you divide by a coefficient, you must divide the *entire* side: $\frac{2x + 4}{2} = \frac{10}{2} \implies x + 2 = 5$.
3. **Losing negative coefficients:** Given $-3x = 12$, a student transposes the $-3$ but changes it to $+3$ in division, writing $x = \frac{12}{3}$. Wrong. The operation is multiplication by $-3$. The inverse is division by $-3$. The sign of the coefficient itself does not change, only the operation: $x = \frac{12}{-3} = -4$.

## Self-check
1. Solve for $x$: $5x - 12 = 18$
2. Solve for $y$: $7 - 3y = 4y + 28$
3. Solve for $z$: $\frac{4z - 3}{5} = 2z + 1$