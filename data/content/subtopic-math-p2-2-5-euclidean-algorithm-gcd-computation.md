## What it is
The Euclidean algorithm is an extremely efficient, step-by-step method for finding the Greatest Common Divisor (GCD) of two integers. Instead of breaking numbers down into their prime factors—which is computationally slow—it repeatedly replaces the larger number with the remainder of dividing the larger by the smaller until the remainder is zero.

## Why it matters
In computer science, prime factorization is so slow that modern cryptography (like RSA encryption) relies on our inability to factor large numbers quickly. The Euclidean algorithm bypasses factoring entirely, allowing computers to find the GCD of two 1000-digit numbers in fractions of a second. In aerospace and physics, you will use this logic to determine commensurate periods of orbiting bodies, calculate gear ratios in mechanical linkages, and process discrete digital signals. It is also the foundation of the Extended Euclidean Algorithm, which is strictly required for computing modular inverses.

## When to study it
You must already be comfortable with:
1. Long division and the concept of remainders.
2. The Division Algorithm: Expressing an integer $a$ as $a = bq + r$, where $0 \le r < b$.
3. Basic prime factorization (so you understand the baseline method we are replacing).

If you cannot confidently write $47$ as a multiple of $5$ plus a remainder ($47 = 5 \times 9 + 2$), review basic division before proceeding.

## How to study it (step by step)
1. **Master the Division Algorithm:** Write out $a = bq + r$ for five random pairs of integers. Identify the quotient $q$ and remainder $r$ for each.
2. **Prove the Core Lemma:** Write down the proof that any divisor of both $a$ and $b$ must also divide $r$. This is the engine of the algorithm.
3. **Trace a Small Example:** Compute $\gcd(48, 18)$ by hand. Write every equation clearly. 
4. **Trace a Large Example:** Compute $\gcd(1071, 462)$ by hand. Notice how much faster this is than trying to find the prime factors of 1071.
5. **Analyze the Worst Case:** Run the algorithm on two consecutive Fibonacci numbers (e.g., $55$ and $34$). Observe the pattern in the quotients.

## Key ideas, with intuition

**1. The Division Algorithm**
For any two positive integers $a$ and $b$ (where $a > b$), you can uniquely divide $a$ by $b$ to get a quotient $q$ and a remainder $r$:
$$a = bq + r \quad \text{where} \quad 0 \le r < b$$

**2. The GCD Lemma (The Engine)**
If a number $d$ divides both $a$ and $b$, it must also divide $a - bq$. Since $r = a - bq$, $d$ must divide $r$. 
Conversely, if $d$ divides $b$ and $r$, it must divide $bq + r$, which is $a$. 
Therefore, the set of common divisors of $a$ and $b$ is *exactly the same* as the set of common divisors of $b$ and $r$. This gives us our golden rule:
$$\gcd(a, b) = \gcd(b, r)$$

**3. Shrinking the Problem**
Because the remainder $r$ is strictly less than $b$, the numbers shrink at every step. Since you cannot have an infinite sequence of strictly decreasing positive integers, the remainder must eventually hit $0$. When the remainder is $0$, the smaller number perfectly divides the larger number. 
$$\gcd(x, 0) = x$$
The last non-zero remainder you computed is your GCD.

## Worked example
Compute $\gcd(252, 105)$.

**Step 1:** Divide $252$ by $105$.
$$252 = 105 \times 2 + 42$$
*Reflection:* By the GCD Lemma, $\gcd(252, 105) = \gcd(105, 42)$. The problem is now smaller.

**Step 2:** Divide $105$ by $42$.
$$105 = 42 \times 2 + 21$$
*Reflection:* $\gcd(105, 42) = \gcd(42, 21)$. The problem is smaller still.

**Step 3:** Divide $42$ by $21$.
$$42 = 21 \times 2 + 0$$
*Reflection:* The remainder is $0$. This means $21$ divides $42$ perfectly. Therefore, $\gcd(42, 21) = 21$. 

Because the GCD was preserved at every step, $\gcd(252, 105) = 21$.

## Diagrams
You can visualize the Euclidean algorithm geometrically as trying to tile an $a \times b$ rectangle with the largest possible square tiles. 

Consider finding $\gcd(10, 4)$. We start with a $10 \times 4$ rectangle.
1. We fit as many $4 \times 4$ squares as possible (two of them).
2. We are left with a $4 \times 2$ rectangle (the remainder).
3. We tile the $4 \times 2$ rectangle with $2 \times 2$ squares. It fits perfectly (remainder 0). 
The side length of the final square is the GCD.

```text
10 x 4 Rectangle:
+--------+--------+----+
|        |        | 2x2|
|  4x4   |  4x4   +----+
|        |        | 2x2|
+--------+--------+----+
  q=2       r=2
```
Equation form: $10 = 4(2) + 2$, then $4 = 2(2) + 0$. The GCD is $2$.

## Memory technique — remember this forever
1. **The Mnemonic:** "Shift and Mod." 
   Think of the algorithm as a conveyor belt moving left. 
   $a \leftarrow b$
   $b \leftarrow a \pmod b$
   The old $b$ shifts left to become the new $a$. The remainder takes $b$'s place.
2. **Formulas to overlearn:**
   $$ \gcd(a, b) = \gcd(b, a \pmod b) $$
   $$ \gcd(a, 0) = a $$
3. **Spaced-repetition schedule:** Review this algorithm and execute one practice problem at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the algorithm, remember that you are looking for a number $d$ that divides $a$ and $b$. Write $a = bq + r$. Rearrange to $r = a - bq$. If $d$ is a factor of both $a$ and $b$, it is mathematically forced to be a factor of $r$. Thus, you can swap $a$ out for $r$.

## Common mistakes
1. **Stopping at zero and claiming the GCD is 0:** The GCD is the *last non-zero remainder*. If you write $42 = 21 \times 2 + 0$, the GCD is $21$, not $0$.
2. **Panicking when $a < b$:** If you are asked to find $\gcd(18, 48)$ and apply the algorithm blindly, you get $18 = 48 \times 0 + 18$. The next step shifts to $\gcd(48, 18)$. The algorithm naturally swaps them for you in one step. Do not panic; just follow the math.
3. **Omitting the quotients:** Students often just scribble down the remainders. Write the full $a = bq + r$ equation every time. You will absolutely need the $q$ values later when you learn the Extended Euclidean Algorithm. Build the correct habit now.

## Self-check
1. Compute $\gcd(119, 51)$ using the Euclidean algorithm. Write out the full equations.
2. Apply the algorithm to $\gcd(89, 55)$. (These are consecutive Fibonacci numbers). How many steps does it take? What is the quotient at every step?
3. Prove formally: If $d$ divides $a$ and $d$ divides $b$, then $d$ must divide $ax + by$ for any integers $x$ and $y$. (This is called Bézout's Identity and is the theoretical foundation of the algorithm).