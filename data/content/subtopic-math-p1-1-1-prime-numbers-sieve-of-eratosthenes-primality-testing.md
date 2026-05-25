## What it is
A prime number is a natural number strictly greater than $1$ that cannot be formed by multiplying two smaller natural numbers. The Sieve of Eratosthenes is an ancient, highly efficient algorithm for finding all prime numbers up to a specified integer limit by iteratively marking the multiples of each prime as composite. Primality testing refers to algorithms used to determine whether a single, specific number is prime without necessarily finding its factors.

## Why it matters
Primes are the indivisible "atoms" of the integers; the Fundamental Theorem of Arithmetic dictates that every integer is built from a unique combination of them. In computer science, the asymmetry of primes—multiplying two large primes is computationally trivial, but factoring their product is practically impossible—forms the bedrock of modern public-key cryptography (like RSA). In physics and aerospace, prime numbers are used in signal processing and structural engineering to avoid resonant frequencies and destructive harmonic interference.

## When to study it
You must already understand:
1. Basic arithmetic operations (addition, multiplication, division).
2. The definitions of integers ($\mathbb{Z}$) and natural numbers ($\mathbb{N}$).
3. The concept of remainders and the modulo operator ($a \pmod n$).
If you are fuzzy on integer division or remainders, review them before proceeding.

## How to study it (step by step)
1. **Define the boundaries:** Write down the formal definition of a prime. Explicitly write down why $1$ is excluded (it breaks the uniqueness of prime factorization).
2. **Manual execution:** Write the numbers $2$ through $50$ on a piece of paper. Execute the Sieve of Eratosthenes manually. 
3. **Derive the upper bound:** Prove to yourself why, when testing if $N$ is prime, you only need to check divisors up to $\sqrt{N}$. 
4. **Algorithmic transition:** Recognize why the Sieve is faster than testing each number individually. The Sieve uses *addition* (jumping by $p$) rather than *division* (checking $N \pmod p$).
5. **Code it:** Write a simple script (in Python, C++, or even a spreadsheet) to generate primes up to $10,000$ using the Sieve. 
6. **Study Trial Division:** Learn the brute-force method for primality testing of a single number $N$, optimizing it by skipping even numbers and stopping at $\sqrt{N}$.

## Key ideas, with intuition

**1. The Multiplicative Building Blocks**
Every integer $N > 1$ is either a prime itself or can be written uniquely as a product of primes. Primes are the base vectors of the integer number space.

**2. The Sieve's Core Trick: Addition over Division**
To find all primes up to $N$, you *could* take every number $k$ and divide it by all smaller numbers. That requires computationally expensive division. The Sieve flips this: it starts with known primes and uses *addition* to step forward by multiples ($p, 2p, 3p \dots$), crossing them out. 

**3. The Square Root Bound**
If a number $N$ is composite, it must have at least two factors, say $a$ and $b$, such that $N = a \times b$. 
If both $a$ and $b$ were strictly greater than $\sqrt{N}$, then:
$$a \times b > \sqrt{N} \times \sqrt{N} = N$$
This is a contradiction. Therefore, at least one factor must be less than or equal to $\sqrt{N}$. If you check all possible divisors up to $\lfloor\sqrt{N}\rfloor$ and find none, the number is guaranteed to be prime.

## Worked example
**Problem:** Find all prime numbers up to $N = 30$ using the Sieve of Eratosthenes.

**Step 1:** List all integers from $2$ to $30$.
**Step 2:** The first unmarked number is $2$. It is prime. Cross out all higher multiples of $2$ ($4, 6, 8, \dots, 30$).
**Step 3:** The next unmarked number is $3$. It is prime. Cross out all higher multiples of $3$. 
*Optimization:* Start crossing out at $3^2 = 9$. The smaller multiples ($6$) were already crossed out by $2$. Cross out $9, 15, 21, 27$.
**Step 4:** The next unmarked number is $5$. It is prime. Cross out multiples starting at $5^2 = 25$. Cross out $25$.
**Step 5:** The next unmarked number is $7$. Wait. We evaluate the square root bound: $\sqrt{30} \approx 5.47$. Since $7 > 5.47$, we can stop. All remaining unmarked numbers are prime.

**Result:** $2, 3, 5, 7, 11, 13, 17, 19, 23, 29$.

*Reflection:* This worked because every composite number $\le 30$ must have a prime factor $\le \sqrt{30}$. By eliminating multiples of $2, 3,$ and $5$, we systematically destroyed all composite numbers in the set.

## Diagrams

```text
Sieve of Eratosthenes up to N=30
[ ] = Prime    (X) = Crossed out composite

 1: (X)   2: [2]   3: [3]   4: (X)   5: [5]
 6: (X)   7: [7]   8: (X)   9: (X)  10: (X)
11: [11] 12: (X)  13: [13] 14: (X)  15: (X)
16: (X)  17: [17] 18: (X)  19: [19] 20: (X)
21: (X)  22: (X)  23: [23] 24: (X)  25: (X)
26: (X)  27: (X)  28: (X)  29: [29] 30: (X)

Execution trace:
p=2 eliminates: 4,6,8,10,12,14,16,18,20,22,24,26,28,30
p=3 eliminates: 9,15,21,27 (6,12,18,24,30 already gone)
p=5 eliminates: 25 (10,15,20,30 already gone)
Stop at p=5 because 5^2 <= 30, but 7^2 > 30.
```

## Memory technique — remember this forever
1. **The Visual Hook:** Imagine a gold-miner's sieve. You pour dirt (all integers up to $N$) into it. The holes in the mesh are multiples of primes. The dirt falls through. The solid gold nuggets that remain stuck in the mesh are the primes.
2. **Facts to Overlearn:**
   * $1$ is NOT prime.
   * To test if $N$ is prime, test divisors strictly up to $\lfloor\sqrt{N}\rfloor$.
   * In the Sieve, for a prime $p$, start crossing out multiples at $p^2$.
3. **Spaced Repetition:** Review this concept, specifically the square root bound proof, at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget the $\sqrt{N}$ limit, assume $N = a \cdot b$. If $a > \sqrt{N}$ and $b > \sqrt{N}$, then $a \cdot b > N$. Contradiction. Therefore, one factor is always $\le \sqrt{N}$.

## Common mistakes
1. **Treating $1$ as a prime:** This breaks the Fundamental Theorem of Arithmetic. If $1$ were prime, $6$ could be factored as $2 \times 3$, or $1 \times 2 \times 3$, or $1^7 \times 2 \times 3$. Factorization would no longer be unique.
2. **Testing divisors up to $N/2$:** When checking if $97$ is prime, students often check numbers all the way to $48$. You only need to check up to $\lfloor\sqrt{97}\rfloor = 9$. 
3. **Starting the Sieve at $2p$:** When crossing out multiples of $5$, students check $10, 15, 20$. These were already eliminated by $2$ and $3$. Always start crossing out at $p^2$.

## Self-check
1. Is $91$ prime? (Do not use a calculator. Use the square root bound).
2. If you are using the Sieve of Eratosthenes to find all primes up to $200$, what is the largest prime whose multiples you must explicitly cross out?
3. Prove that every prime number strictly greater than $3$ can be written in the form $6k + 1$ or $6k - 1$ for some integer $k$. *(Hint: Consider the remainders of numbers when divided by 6).*