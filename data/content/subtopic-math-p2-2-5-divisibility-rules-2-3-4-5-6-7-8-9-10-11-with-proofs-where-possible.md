## What it is
Divisibility rules are algebraic shortcuts used to determine if one integer is perfectly divisible by another without performing long division. They work by exploiting the properties of our base-10 numeral system, allowing you to reduce large numbers into simple digit-level operations.

## Why it matters
In computer science, divisibility checks are foundational for hash functions, cryptography (like RSA), and optimizing algorithms (e.g., executing a routine every $n$-th loop iteration). In physics and engineering, you frequently need to simplify large fractions, factorize parameters on the fly, or verify the integrity of numerical data without reaching for a calculator. Fluency here builds the intuition required for modular arithmetic.

## When to study it
You must thoroughly understand the base-10 place value system (e.g., $432 = 4 \times 100 + 3 \times 10 + 2$) and basic algebraic factoring. A preliminary grasp of the concept of remainders (informal modular arithmetic) is highly recommended. If you cannot comfortably expand a number into its polynomial base-10 form, review place value first.

## How to study it (step by step)
1. Write out an arbitrary 4-digit number as an algebraic expansion: $N = 1000a + 100b + 10c + d$.
2. Derive the rules for 2, 5, and 10 by looking at which terms in the expansion are naturally divisible by them.
3. Derive the rules for 4 and 8 by extending the logic from step 2 to the tens and hundreds places.
4. Derive the rules for 3 and 9 by rewriting powers of 10 as $(99\dots9 + 1)$ and factoring.
5. Master the rule for 11 by rewriting powers of 10 as multiples of 11 plus or minus 1 (e.g., $10 = 11 - 1$, $100 = 99 + 1$).
6. Learn the rule for composites (like 6) by combining rules of coprime factors (2 and 3).
7. Memorize the algorithmic rule for 7 (truncate the last digit, double it, subtract from the rest of the number) and practice it on 3-digit numbers.

## Key ideas, with intuition
**The Base-10 Polynomial**
Any integer $N$ with digits $d_k d_{k-1} \dots d_1 d_0$ is mathematically defined as:
$$N = d_0 + 10d_1 + 100d_2 + \dots + 10^k d_k$$
Every divisibility rule is just a trick to simplify this polynomial.

**The "Tail End" Rules (2, 4, 5, 8, 10)**
Because $10$ is divisible by 2 and 5, any power of 10 is divisible by them. Thus, $10d_1 + 100d_2 \dots$ is always divisible by 2 and 5. The divisibility of $N$ depends entirely on the last digit $d_0$. 
* For 4 (which is $2^2$), 100 is divisible by 4, so you only check the last two digits. 
* For 8 ($2^3$), 1000 is divisible by 8, so you check the last three digits.

**The "Digit Sum" Rules (3, 9)**
We can rewrite $10 = 9+1$, $100 = 99+1$, etc. Every power of 10 is exactly one more than a multiple of 3 and 9. If we strip away the $9, 99, 999$ parts, we are left with just the sum of the digits.

**The "Alternating Sum" Rule (11)**
Notice how powers of 10 interact with 11:
* $10 = 11 - 1$
* $100 = 99 + 1 = 11(9) + 1$
* $1000 = 1001 - 1 = 11(91) - 1$
Odd powers of 10 leave a remainder of $-1$, even powers leave $+1$. Thus, to check divisibility by 11, you alternate adding and subtracting the digits, starting with a positive units digit.

## Worked example
**Goal:** Prove the divisibility rule for 9 for a 3-digit number $N$ with digits $a, b, c$.

1. **Expand $N$ in base 10:**
   $$N = 100a + 10b + c$$
2. **Rewrite powers of 10 to isolate multiples of 9:**
   $$N = (99 + 1)a + (9 + 1)b + c$$
3. **Distribute the variables:**
   $$N = 99a + a + 9b + b + c$$
4. **Regroup into a multiple of 9 and a remainder:**
   $$N = (99a + 9b) + (a + b + c)$$
5. **Factor out 9:**
   $$N = 9(11a + b) + (a + b + c)$$

*Reflection:* The term $9(11a + b)$ is strictly divisible by 9. Therefore, the entire number $N$ is divisible by 9 if and only if the remaining piece, $(a + b + c)$, is divisible by 9. This proves why summing the digits works.

## Diagrams

```text
Divisibility by 9: Filtering the Base-10 Expansion
Number: 342  ->  N = 3(100)  +  4(10)  +  2(1)

                  3(99 + 1)      4(9 + 1)     2
                     / \            / \       |
                   /     \        /     \     |
Multiples of 9:  3(99)    \     4(9)     \    |
                           \              \   |
                            \              \  |
Remainders:                 3(1)     +     4(1)   +   2  =  9

Because the remainders sum to 9 (a multiple of 9), 342 is divisible by 9.
```

## Memory technique — remember this forever
1. **The Hook:** Categorize the numbers to remember their behavior. 
   * *Tail-enders:* 2, 4, 5, 8, 10 (Look at the end of the number).
   * *Sum-ers:* 3, 9 (Add them all up).
   * *Alternator:* 11 (Add, subtract, add, subtract).
   * *Composites:* 6 (Check 2 AND 3).
   * *The Weird One:* 7 (Chop the tail, double it, subtract it).
2. **Must-know facts:** 
   * Rule for 6: Must pass rules for 2 *and* 3. 
   * Rule for 11: $d_0 - d_1 + d_2 - d_3 \dots$ must be 0 or a multiple of 11.
3. **Spaced-repetition schedule:** Review these categorizations and the proof for 9 at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget a rule, write $N = a + 10b + 100c$. Ask yourself: "What is the remainder of 10, 100, and 1000 when divided by my target number?" The pattern of remainders *is* the rule.

## Common mistakes
* **Applying the digit sum to everything:** Students often try to add the digits to check for divisibility by 4, 7, or 8. Digit sums *only* work for 3 and 9 because $10^k - 1$ is a multiple of 3 and 9.
* **Failing the composite rule:** To check if a number is divisible by a composite like 8, you cannot just check if it is divisible by 2 and 4. The factors must be *coprime* (sharing no common factors). 2 and 4 share a factor of 2. 6 works because 2 and 3 are coprime.
* **Reversing the alternating sum for 11:** Starting from the left (highest digit) instead of the right (units digit) will flip the sign. While this often still works to find if the result is 0, it breaks the formal mathematical remainder. Always start with a *positive* units digit: $+d_0 - d_1 + d_2 \dots$

## Self-check
1. Is 4,128 divisible by 8? By 9? By 11? Show your work using the specific rule for each.
2. Prove the divisibility rule for 4 using the base-10 expansion of a general 4-digit number $N = 1000a + 100b + 10c + d$.
3. Derive the divisibility rule for 7. *Hint: Write $N = 10A + B$, where $B$ is the units digit and $A$ is the rest of the number. We want to know if $10A + B$ is a multiple of 7. Multiply the expression by -2 (since multiplying by a constant doesn't change if it's a multiple of 7, provided the constant isn't 7), and simplify modulo 7.*