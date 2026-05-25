## What it is
Addition combines multiple quantities into a single total, while subtraction determines the difference between quantities. Carrying and borrowing are the fundamental algorithms used to perform these operations on multi-digit numbers by trading values between place-value columns (ones, tens, hundreds). Word problems are the translation of physical, logical, or geometric scenarios into these arithmetic operations.

## Why it matters
Every digital computer, from the Apollo Guidance Computer to the GPUs training modern neural networks, reduces complex calculus and linear algebra down to millions of basic additions and subtractions. Understanding place value and carry operations is the absolute foundation of computer architecture (hardware adders) and numerical stability in physics simulations. Furthermore, if you cannot translate a physical reality into an equation (word problems), you cannot engineer a rocket; math is only useful when bound to reality.

## When to study it
You must already understand basic counting (integers $0$ through $9$) and the base-10 place value system. You must know that the number $342$ means $3 \times 100 + 4 \times 10 + 2 \times 1$. If you do not grasp that a "$1$" in the tens column is worth exactly ten times a "$1$" in the ones column, stop and review place value immediately.

## How to study it (step by step)
1. **Deconstruct numbers:** Take any two-digit number and write it in expanded form (e.g., $45 = 40 + 5$). Do this until it is automatic.
2. **Add without carrying:** Add two numbers where no column sums to more than $9$. Treat each column as an independent addition problem.
3. **Introduce carrying:** Add two numbers where the ones column exceeds $9$. Physically write the expanded form to see why the "ten" must shift to the next column. 
4. **Subtract without borrowing:** Subtract numbers where every top digit is larger than the corresponding bottom digit.
5. **Introduce borrowing:** Subtract numbers where a top digit is smaller than the bottom. Practice "breaking" a ten into ten ones.
6. **Translate words to math:** Isolate keywords in word problems. Map "combined", "yields", or "net" to $+$. Map "delta", "change", "remaining", or "difference" to $-$.

## Key ideas, with intuition

**1. The Base-10 Constraint (Overflow)**
A single place-value column can only hold a single digit: $0$ through $9$. If an operation causes a column to reach $10$ or more, it overflows. Because our number system is base-10, exactly $10$ units in one column equal exactly $1$ unit in the column to its left. 

**2. Carrying is just regrouping**
When you add $47 + 25$, you are adding $(40 + 7) + (20 + 5)$. Group the tens and the ones:
$$ 60 + 12 $$
You cannot write "$12$" in the ones column. But $12 = 10 + 2$. You shift the $10$ to the tens column:
$$ (60 + 10) + 2 = 70 + 2 = 72 $$

**3. Borrowing is un-grouping**
To compute $52 - 18$, you cannot easily subtract $8$ ones from $2$ ones. You must un-group a ten from the $50$. Rewrite $52$ as $40 + 12$. Now subtract the expanded forms:
$$ (40 - 10) + (12 - 8) = 30 + 4 = 34 $$

## Worked example
**Problem:** A rocket's oxidizer tank contains $432$ liters of liquid oxygen. A static fire test consumes $157$ liters. How much oxidizer remains?

**Step 1: Setup the operation.** 
"Consumes" and "remains" indicate subtraction. We need $432 - 157$.

**Step 2: The Ones Column ($2 - 7$).**
We cannot subtract $7$ from $2$. We borrow from the tens column. 
The $3$ (which means $30$) becomes a $2$ (meaning $20$). 
The $2$ ones receive the borrowed $10$, becoming $12$. 
$$ 12 - 7 = 5 $$

**Step 3: The Tens Column ($2 - 5$).**
We cannot subtract $5$ from $2$. We borrow from the hundreds column.
The $4$ (which means $400$) becomes a $3$ (meaning $300$).
The $2$ tens receive the borrowed $10$ tens ($100$), becoming $12$ tens.
$$ 12 - 5 = 7 $$

**Step 4: The Hundreds Column ($3 - 1$).**
$$ 3 - 1 = 2 $$

**Result:** $275$ liters.

*Reflection:* The borrowing algorithm works because we never changed the total starting value. We simply rewrote $432$ as $300 + 120 + 12$. Subtracting $100 + 50 + 7$ from that expanded form yields $200 + 70 + 5 = 275$. 

## Diagrams

```text
Subtraction with Borrowing: 432 - 157

      Hundreds |   Tens   |   Ones
     --------------------------------
         3     |    12    |    12      <-- The regrouped values
       (was 4) |  (was 3) |  (was 2)
               |          |
 -       1     |     5    |     7      <-- The amount consumed
     --------------------------------
         2     |     7    |     5      <-- The remainder (275)
```

## Memory technique — remember this forever
1. **The Visual Hook:** Think of a bank teller. Carrying is exchanging ten $\$1$ bills for a single $\$10$ bill because your wallet is too thick. Borrowing is handing the teller a $\$10$ bill and asking for ten $\$1$ bills so you can use a vending machine.
2. **The Fact to Overlearn:** The base-10 expansion formula. For a three digit number $ABC$:
   $$ ABC = A \times 10^2 + B \times 10^1 + C \times 10^0 $$
3. **Spaced-repetition schedule:** Review this concept and do 3 practice problems at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **The First Principles Pathway:** If you ever forget the standard carrying/borrowing algorithm, expand the numbers into their full $100s + 10s + 1s$ form, group like terms, and do the math algebraically. The algorithm is just a shortcut for algebra.

## Common mistakes
* **The "Bottom-Up" Subtraction Trap:** When faced with $2 - 7$ in a column, lazy students will just subtract the smaller number from the larger one and write $5$ instead of borrowing. Order matters in subtraction.
* **Ghost Carries:** Forgetting to add the "$1$" you carried over to the next column, resulting in an answer exactly $10$ or $100$ too small.
* **Phantom Borrowing:** Borrowing $10$ for the current column but forgetting to cross out and decrement the column to the left. You have magically created value out of nowhere, violating the conservation of numbers.

## Self-check
1. Compute $804 - 367$. (Pay attention to borrowing across a zero).
2. A satellite has a dry mass of $1,245$ kg. Engineers add a sensor suite weighing $88$ kg, then remove an obsolete counterweight of $150$ kg. What is the final mass of the satellite?
3. Prove logically that when adding two single digits $A$ and $B$, the "carry" to the next column can never be larger than $1$.