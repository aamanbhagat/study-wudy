## What it is
The Highest Common Factor (HCF), also known as the Greatest Common Divisor (GCD), is the largest positive integer that divides two or more numbers without leaving a remainder. The prime factorization method finds this by breaking numbers down into their fundamental prime building blocks, while the Euclidean algorithm finds it through a highly efficient process of repeated division with remainders.

## Why it matters
In pure mathematics, the GCD is the cornerstone of number theory, forming the basis of modular arithmetic and Diophantine equations. In computer science and cryptography (like RSA encryption), the Euclidean algorithm is essential for finding modular inverses, keeping all modern digital communication secure. In mechanical engineering and aerospace, you use the HCF to calculate gear ratios, harmonic frequencies, and the alignment of orbital cycles.

## When to study it
You must already understand:
- Basic arithmetic operations (addition, subtraction, multiplication).
- Integer division and the concept of a remainder.
- Prime numbers vs. composite numbers.
- Exponents (e.g., knowing that $2 \times 2 \times 2 = 2^3$).
If you cannot confidently break a number like $60$ into its prime factors, review prime factorization before proceeding.

## How to study it (step by step)
1. **Master prime factorization:** Take numbers like $72$ and $120$. Break them down into prime factors using a factor tree until you can write them as products of prime powers.
2. **Apply the Min-Exponent Rule:** Compare the prime factorizations of two numbers. Identify the primes they share. For each shared prime, take the lowest exponent. Multiply these together to get the HCF.
3. **Understand the Division Algorithm:** Internalize the equation $a = bq + r$, where $a$ is the dividend, $b$ is the divisor, $q$ is the quotient, and $r$ is the remainder ($0 \le r < b$). 
4. **Trace the Euclidean Algorithm:** Pick two numbers. Divide the larger by the smaller. Take the divisor and divide it by the remainder. Repeat this until the remainder is $0$. The last non-zero remainder is your HCF.
5. **Prove the Euclidean Algorithm:** Write out $a = bq + r$. Prove to yourself that any number dividing both $a$ and $b$ must also divide $r$. This is the logical engine of the algorithm.

## Key ideas, with intuition

**1. Prime Factorization as DNA**
Every integer has a unique prime factorization—its mathematical DNA. Finding the HCF is like finding the longest shared sequence of DNA between two organisms. If $A = 2^3 \times 3^2 \times 5$ and $B = 2^2 \times 3^3 \times 7$, they only share the primes $2$ and $3$. 

**2. The Min-Exponent Rule**
To find the largest number that divides both $A$ and $B$, you are limited by the "weakest link" for each prime. $A$ can supply up to three $2$s, but $B$ can only supply two. Therefore, the common divisor can only have two $2$s. 
$$ \text{HCF}(A, B) = 2^{\min(3,2)} \times 3^{\min(2,3)} = 2^2 \times 3^2 = 36 $$

**3. The Euclidean Principle: Shrinking the Problem**
The Euclidean algorithm relies on a brilliant insight: $\text{GCD}(a, b) = \text{GCD}(b, a \bmod b)$. 
If you have a $a \times b$ rectangle, the largest square tile that perfectly fills it is the HCF. If you fill the rectangle with as many $b \times b$ squares as possible, you are left with a smaller rectangle of size $b \times r$ (where $r$ is the remainder). The tile that fills this new, smaller rectangle will also perfectly fill the original. You repeat this until the rectangle is perfectly filled by a square (remainder $0$).

## Worked example
Find the HCF of $252$ and $105$.

**Method 1: Prime Factorization**
1. Factor $252$: $252 = 2 \times 126 = 2^2 \times 63 = 2^2 \times 3^2 \times 7$.
2. Factor $105$: $105 = 3 \times 35 = 3 \times 5 \times 7$.
3. Identify shared primes: $3$ and $7$.
4. Take the lowest exponents: $3^1$ and $7^1$.
5. Multiply: $3 \times 7 = 21$.
$$ \text{HCF}(252, 105) = 21 $$

**Method 2: Euclidean Algorithm**
1. Divide $252$ by $105$: $252 = 105(2) + 42$. (Remainder is $42$).
2. Shift: Divide $105$ by $42$: $105 = 42(2) + 21$. (Remainder is $21$).
3. Shift: Divide $42$ by $21$: $42 = 21(2) + 0$. (Remainder is $0$).
4. The last non-zero remainder is $21$.
$$ \text{HCF}(252, 105) = 21 $$

*Reflection:* The prime method requires finding all factors, which becomes computationally impossible for massive numbers. The Euclidean algorithm only requires division, making it exponentially faster. Notice how $252$ and $105$ quickly collapsed to $42$ and $21$.

## Diagrams

Geometric intuition of the Euclidean Algorithm for $\text{GCD}(45, 10)$:
We want to tile a $45 \times 10$ rectangle with the largest possible squares.

```text
+-----------------------------------+----------+
|          |          |          |  |          |
|  10x10   |  10x10   |  10x10   |  |   10x5   | 10
|          |          |          |  |          |
+-----------------------------------+----------+
  10         10         10         10     5
```
1. We fit four $10 \times 10$ squares into the $45 \times 10$ area.
2. We are left with a $10 \times 5$ rectangle (the remainder).
3. Now, tile the $10 \times 5$ rectangle. It perfectly fits two $5 \times 5$ squares.
4. Since there is no remainder, the $5 \times 5$ square is the largest tile. $\text{GCD}(45, 10) = 5$.

## Memory technique — remember this forever
1. **The Visual Hook:** Think of the Euclidean algorithm as "The Greedy Tiler." You always greedily chop off the largest squares possible, then zoom in on the leftovers.
2. **The Facts to Overlearn:**
   - $\text{GCD}(a, b) = \text{GCD}(b, a \bmod b)$
   - In prime factorization, HCF = **Lowest** powers of **Shared** primes.
3. **Spaced Repetition Schedule:** Review this concept and do one Euclidean algorithm trace on days 1, 3, 7, 16, and 35.
4. **First Principles Pathway:** If you forget the Euclidean formula, write $a = bq + r$. Rearrange it to $r = a - bq$. If a number $d$ divides $a$ (so $a = kd$) and divides $b$ (so $b = md$), then $r = kd - mdq = d(k - mq)$. Therefore, $d$ must also divide $r$. The common divisors of $a$ and $b$ are identical to the common divisors of $b$ and $r$.

## Common mistakes
- **Confusing HCF with LCM:** Students often take the *highest* exponent of *all* primes. That gives the Least Common Multiple. HCF requires the *lowest* exponent of *shared* primes only.
- **Stopping at the quotient:** In the Euclidean algorithm, students sometimes mistakenly state the last *quotient* as the HCF. The HCF is always the last non-zero *remainder*.
- **Arithmetic errors in division:** A single subtraction error in the division algorithm cascades through the rest of the Euclidean steps, guaranteeing a wrong answer. Always double-check $a = bq + r$.

## Self-check
1. Find the HCF of $168$ and $360$ using the prime factorization method.
2. Find the HCF of $1241$ and $589$ using the Euclidean algorithm.
3. Prove that if $a$ and $b$ are consecutive integers (i.e., $b = a + 1$), their HCF must always be $1$. Use the logic of the Euclidean algorithm.