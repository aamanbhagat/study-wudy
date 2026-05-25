## What it is
Combinations dictate the number of ways to select a subset of items from a larger set where the order of selection does not matter. Pascal's triangle is a geometric arrangement of these combination counts, where each number is the sum of the two numbers directly above it, providing a visual map of all possible combinations.

## Why it matters
In statistical mechanics, combinations calculate the number of microstates (e.g., distributing energy quanta among identical particles) to determine the entropy of a system. In computer science, they are the backbone of the binomial distribution, randomized algorithms, and analyzing the time complexity of nested loops. In aerospace engineering, fault tree analysis uses combinations to determine the probability of catastrophic failure when redundant components fail simultaneously.

## When to study it
You must have a rock-solid understanding of:
1. Factorials ($n!$) and how to algebraically cancel them (e.g., $\frac{n!}{(n-1)!} = n$).
2. Permutations ($nPr$): counting selections where order *does* matter.
If you cannot explain why $P(5, 3) = 60$, stop and review permutations before proceeding.

## How to study it (step by step)
1. Write out all permutations of 3 letters chosen from A, B, C, D. You will have 24 arrangements.
2. Group those permutations into sets containing the exact same letters (e.g., ABC, ACB, BAC, BCA, CAB, CBA). Notice that each unique group contains exactly $3! = 6$ arrangements.
3. Derive the combinations formula ($nCr$) by taking the permutations formula ($nPr$) and dividing by this overcount factor ($r!$).
4. Draw the first 6 rows of Pascal's triangle using only addition (each node is the sum of the two above it).
5. Map the $nCr$ formula to the entries of Pascal's triangle. Calculate $\binom{4}{2}$ and verify it matches the 3rd entry in the 5th row (accounting for zero-indexing).
6. Expand $(x+y)^3$ algebraically. Observe how the coefficients match the corresponding row of Pascal's triangle. 

## Key ideas, with intuition

**1. Permutations overcount combinations**
If you select 3 astronauts from a pool of 10 to form a crew, picking Alice-Bob-Charlie is identical to picking Charlie-Bob-Alice. There are $r!$ ways to arrange $r$ items. Therefore, the number of combinations is the number of permutations divided by $r!$.
$$ \binom{n}{r} = \frac{P(n, r)}{r!} = \frac{n!}{r!(n-r)!} $$
*(Note: $\binom{n}{r}$ is read as "$n$ choose $r$" and is equivalent to $nCr$.)*

**2. The Symmetry of Choice**
Choosing $r$ items to keep is mathematically identical to choosing $n-r$ items to throw away. 
$$ \binom{n}{r} = \binom{n}{n-r} $$
If you look at Pascal's triangle, this is why every row is perfectly symmetrical.

**3. Pascal's Identity (The Addition Rule)**
To form a crew of $r$ astronauts from $n$ candidates, focus on one specific candidate—say, Alice. Every possible crew either includes Alice or it doesn't. 
- If you include Alice, you must choose $r-1$ more astronauts from the remaining $n-1$ candidates.
- If you exclude Alice, you must choose all $r$ astronauts from the remaining $n-1$ candidates.
Adding these two mutually exclusive cases yields the total combinations:
$$ \binom{n}{r} = \binom{n-1}{r-1} + \binom{n-1}{r} $$
This is the exact algebraic rule that generates Pascal's triangle.

## Worked example
**Problem:** A spacecraft has 8 identical sensor modules. You need to select 3 to undergo a destructive stress test. How many different groups of 3 can you choose?

**Step 1: Identify the parameters.**
Total items $n = 8$. Selected items $r = 3$. Order does not matter because the test destroys them all equally.

**Step 2: Apply the combinations formula.**
$$ \binom{8}{3} = \frac{8!}{3!(8-3)!} = \frac{8!}{3!5!} $$

**Step 3: Expand the numerator to match the largest factorial in the denominator, then cancel.**
$$ \frac{8 \times 7 \times 6 \times 5!}{3! \times 5!} = \frac{8 \times 7 \times 6}{3 \times 2 \times 1} $$

**Step 4: Simplify.**
$$ \frac{8 \times 7 \times 6}{6} = 8 \times 7 = 56 $$

*Reflection:* Expanding $8!$ only until $5!$ makes cancellation trivial and avoids calculating massive numbers. Dividing by $3!$ (which is $6$) elegantly strips away the redundant permutations, leaving only the unique groups.

## Diagrams

```text
Pascal's Triangle and nCr Mapping

Row (n)
  0                 1                   <-- 0C0
  1               1   1                 <-- 1C0, 1C1
  2             1   2   1               <-- 2C0, 2C1, 2C2
  3           1   3   3   1             <-- 3C0, 3C1, 3C2, 3C3
  4         1   4   6   4   1           <-- 4C0, 4C1, 4C2, 4C3, 4C4
  5       1   5  10   10  5   1         <-- 5C0, 5C1, 5C2, 5C3, 5C4, 5C5
             / \
Addition:   4 + 6  -> 10

Visualizing Pascal's Identity:
4C1 + 4C2 = 5C2
( 4 +  6  = 10 )
```
*Note: Rows ($n$) and columns ($r$) are strictly zero-indexed. The top 1 is row 0, column 0.*

## Memory technique — remember this forever
1. **The Mnemonic:** "Permutations are Picky (order matters), Combinations are Committees (order doesn't)." 
2. **Must overlearn:** 
   $$ \binom{n}{r} = \frac{n!}{r!(n-r)!} $$
   $$ \binom{n}{r} = \binom{n-1}{r-1} + \binom{n-1}{r} $$
3. **Spaced-repetition schedule:** Review this material at 1 day, 3 days, 7 days, 16 days, and 35 days. Write the formulas from memory and draw the first 5 rows of Pascal's triangle.
4. **First principles pathway:** If you forget the formula, rebuild it. Use the Fundamental Counting Principle to pick $r$ items: $n \times (n-1) \times \dots$ ($r$ terms). Realize this is $\frac{n!}{(n-r)!}$. Then ask, "How many ways can I arrange those $r$ items?" The answer is $r!$. Divide by $r!$ to remove the overcounting.

## Common mistakes
* **Confusing permutations and combinations:** Look for keywords. "Arrange", "line up", or "passwords" imply permutations. "Select", "group", or "committee" imply combinations.
* **Brute-forcing factorials:** Calculating $10!$ fully instead of stopping at $7!$ to cancel $\frac{10!}{3!7!}$. Always expand the numerator only until it hits the largest factorial in the denominator.
* **Off-by-one errors in Pascal's Triangle:** Forgetting that the top row is $n=0$ and the leftmost entry of any row is $r=0$. The second number in a row tells you the $n$ of that row.

## Self-check
1. Calculate $\binom{7}{2}$ and $\binom{7}{5}$. What principle does the result demonstrate?
2. You have 10 distinct rocket engine designs. How many unique ways can you choose a subset of 4 to prototype?
3. Prove algebraically that $\binom{n}{r} = \binom{n-1}{r-1} + \binom{n-1}{r}$ by substituting the factorial definition into the right side of the equation and finding a common denominator.