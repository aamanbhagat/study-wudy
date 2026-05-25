## What it is
Pascal’s triangle is a triangular array of numbers where each number is the sum of the two directly above it. Combinatorially, it is a geometric map of the binomial coefficients, where the entry in the $n$-th row and $k$-th position represents $\binom{n}{k}$—the number of ways to choose a subset of $k$ elements from a fixed set of $n$ elements. 

## Why it matters
This triangle is the bridge between discrete counting and polynomial algebra. In physics and statistical mechanics, it models the microstates of binary systems (like spin-up/spin-down particles). In computer science, it is the foundational example of dynamic programming. In aerospace, the binomial expansion (which relies on these coefficients) is heavily used in perturbation theory and linearizing complex equations of motion.

## When to study it
You must already understand:
1. Factorials ($n!$).
2. The definition of a combination: $\binom{n}{k} = \frac{n!}{k!(n-k)!}$.
3. Basic polynomial multiplication.
If you do not know what $\binom{n}{k}$ (read "$n$ choose $k$") means fundamentally, stop and review basic combinatorics first.

## How to study it (step by step)
1. **Draw the numbers:** Write out the first 6 rows of Pascal's triangle (rows $n=0$ to $n=5$) using only the addition rule.
2. **Translate to combinations:** Draw a second, identical triangle, but replace every number with its corresponding $\binom{n}{k}$ notation. Verify they match.
3. **Prove the additive rule algebraically:** Write out $\binom{n-1}{k-1} + \binom{n-1}{k}$ using factorials, find a common denominator, and show it equals $\binom{n}{k}$.
4. **Prove the additive rule combinatorially:** Construct a logical argument for why choosing $k$ items from $n$ items is equivalent to the sum of two smaller choice problems. (See "Key ideas").
5. **Sum the rows:** Add the numbers in each row. Observe the pattern ($2^n$). Prove combinatorially why the sum of all combinations for a given $n$ must equal $2^n$.

## Key ideas, with intuition

**1. The Combinatorial Identity (Pascal's Rule)**
The geometric rule of the triangle (add the two numbers above) is formally written as:
$$ \binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k} $$
*Intuition:* Imagine you are choosing a committee of $k$ people from a group of $n$ people. Focus on one specific person: Alice. Every possible committee either *includes* Alice or *excludes* Alice. 
- If Alice is on the committee, you must choose the remaining $k-1$ members from the remaining $n-1$ people: $\binom{n-1}{k-1}$.
- If Alice is excluded, you must choose all $k$ members from the remaining $n-1$ people: $\binom{n-1}{k}$.
Since these two cases are mutually exclusive and cover all possibilities, their sum is the total number of possible committees.

**2. Symmetry**
The triangle is perfectly symmetrical. 
$$ \binom{n}{k} = \binom{n}{n-k} $$
*Intuition:* Choosing $k$ people to *keep* is exactly the same as choosing $n-k$ people to *reject*. 

**3. Row Sums**
The sum of the $n$-th row is $2^n$.
$$ \sum_{k=0}^{n} \binom{n}{k} = 2^n $$
*Intuition:* If you have $n$ items, $2^n$ is the total number of possible subsets you can form (each item is either "in" or "out"). Summing $\binom{n}{k}$ for all possible sizes $k$ counts exactly the same thing.

## Worked example
**Problem:** Find the number of distinct paths a robot can take on a grid to move from the origin $(0,0)$ to the point $(4,3)$, assuming it can only move one unit Right (R) or one unit Up (U) at a time. Relate this to Pascal's triangle.

**Step 1: Determine the total number of moves.**
To get to $(4,3)$, the robot must move Right exactly 4 times and Up exactly 3 times. 
Total moves = $4 + 3 = 7$.

**Step 2: Frame as a combinatorial choice.**
Any valid path is a sequence of 7 moves, containing exactly 4 'R's and 3 'U's. (e.g., R-R-U-R-U-R-U). 
The problem reduces to: out of 7 available slots in the sequence, choose 3 slots to be 'U' (the rest will automatically be 'R'). 
Number of paths = $\binom{7}{3}$.

**Step 3: Calculate using the factorial definition.**
$$ \binom{7}{3} = \frac{7!}{3!(7-3)!} = \frac{7!}{3!4!} $$
$$ \binom{7}{3} = \frac{7 \times 6 \times 5 \times 4!}{3 \times 2 \times 1 \times 4!} = \frac{7 \times 6 \times 5}{6} = 35 $$

**Step 4: Relate to Pascal's triangle.**
If you look at the 7th row of Pascal's triangle (remembering the top row is $n=0$), the entries are:
1, 7, 21, 35, 35, 21, 7, 1
The entry at $k=3$ (counting from $k=0$ on the left) is indeed 35. 

*Reflection:* The grid path problem is identical to Pascal's triangle because reaching any grid intersection requires coming from either the intersection directly to the left or directly below it. This is the exact same additive property as $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$.

## Diagrams

```text
The Numerical Triangle          The Combinatorial Triangle
(n is row, k is column)         (0-indexed)

n=0:          1                               (0,0)
n=1:        1   1                           (1,0) (1,1)
n=2:      1   2   1                       (2,0) (2,1) (2,2)
n=3:    1   3   3   1                   (3,0) (3,1) (3,2) (3,3)
n=4:  1   4   6   4   1               (4,0) (4,1) (4,2) (4,3) (4,4)

Mapping Pascal's Rule:
      3       +       3       =       6
   (n-1, k-1) +    (n-1, k)   =    (n, k)
     (3,1)    +      (3,2)    =    (4,2)
```

## Memory technique — remember this forever
1. **The Hook:** "Alice is In or Out." Whenever you forget Pascal's identity, think of forming a committee. You either include Alice $\binom{n-1}{k-1}$ or you exclude her $\binom{n-1}{k}$.
2. **Must overlearn:**
   - $\binom{n}{k} = \frac{n!}{k!(n-k)!}$
   - $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$
3. **Spaced-repetition schedule:** Review this concept and re-derive the combinatorial proof at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget everything, expand $(x+y)^n$. 
   $$ (x+y)^n = (x+y)(x+y)^{n-1} $$
   The coefficient of $x^k y^{n-k}$ on the left is $\binom{n}{k}$. By distributing the right side, you will see it perfectly generates the sum $\binom{n-1}{k-1} + \binom{n-1}{k}$.

## Common mistakes
1. **Off-by-one errors:** Students frequently forget that the top row is $n=0$ and the leftmost entry is $k=0$. The 5th row actually corresponds to $n=4$.
2. **Confusing $n$ and $k$:** In the visual triangle, $n$ dictates the horizontal row you are on, and $k$ dictates the diagonal column. 
3. **Brute-forcing factorials:** When calculating $\binom{100}{98}$, students try to calculate $100!$. Always simplify algebraically first: $\frac{100!}{98!2!} = \frac{100 \times 99}{2} = 4950$. Or use symmetry: $\binom{100}{98} = \binom{100}{2}$.

## Self-check
1. Use Pascal's triangle to find the coefficient of $x^3 y^2$ in the expansion of $(x+y)^5$.
2. Prove algebraically that $k \binom{n}{k} = n \binom{n-1}{k-1}$. (Hint: expand into factorials).
3. A coin is flipped 10 times. Using the combinatorial interpretation of Pascal's triangle, explain why the probability of getting exactly 5 heads is $\frac{\binom{10}{5}}{2^{10}}$.