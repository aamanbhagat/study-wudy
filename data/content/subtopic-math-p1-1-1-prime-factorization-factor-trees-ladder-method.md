## What it is
Prime factorization is the process of breaking down a composite number into a product of purely prime numbers. The "factor tree" is a visual branching method where you split a number into any two factors until only primes remain. The "ladder method" (or upside-down division) is a systematic approach where you repeatedly divide the number by the smallest possible prime until the quotient itself is a prime number.

## Why it matters
In computer science, prime factorization is the bedrock of RSA encryption, which secures modern digital communications; the difficulty of factoring massive numbers is what keeps data safe. In mathematics, it is the most efficient way to find Greatest Common Divisors (GCD) and Least Common Multiples (LCM), which are essential for adding fractions or aligning orbital periods in physics. It also introduces the concept of unique representation, a theme that echoes through linear algebra (eigen-decomposition) and signal processing (Fourier transforms).

## When to study it
You must already understand basic multiplication, division, and the strict definitions of prime and composite numbers. You must also have memorized the basic divisibility rules for $2, 3, 5,$ and $10$. If you cannot instantly identify that $144$ is divisible by $2$ and $3$, stop and review divisibility rules first.

## How to study it (step by step)
1. **Master Divisibility:** Spend 15 minutes proving to yourself why the divisibility rules for $2, 3,$ and $5$ work. You cannot factor efficiently if you are guessing divisors.
2. **Build Trees:** Pick five numbers between $50$ and $200$. Draw factor trees for each, intentionally picking *different* starting pairs of factors to verify you always end up with the same prime leaves.
3. **Climb Ladders:** Take the same five numbers and factor them using the ladder method. Always start dividing by the smallest prime ($2$, then $3$, then $5$).
4. **Group with Exponents:** Rewrite your final prime lists using exponential notation (e.g., $2 \times 2 \times 3 \times 3 \times 3 \to 2^2 \cdot 3^3$). Do not leave them as expanded strings.
5. **Compare and Contrast:** Spend 10 minutes writing down the pros and cons of trees vs. ladders. (Hint: Trees are flexible; ladders are organized and prevent dropped factors).

## Key ideas, with intuition
*   **The Fundamental Theorem of Arithmetic:** Every integer greater than $1$ is either a prime itself or can be uniquely written as a product of primes (ignoring the order of the factors). Primes are the "atoms" of mathematics; factorization is chemical analysis.
    $$ N = p_1^{a_1} \cdot p_2^{a_2} \cdots p_k^{a_k} $$
*   **Path Independence:** In a factor tree, it does not matter which two factors you pull out first. $36 = 6 \times 6$ and $36 = 4 \times 9$ will both eventually reduce to $2^2 \cdot 3^2$. The "chemical composition" of the number is fixed by the universe.
*   **The Ladder's Monotonicity:** The ladder method forces order. By strictly testing $2$, then $3$, then $5$, you extract primes systematically from smallest to largest, preventing you from missing a hidden prime factor later.

## Worked example
Find the prime factorization of $180$.

*Step 1: Ladder Method setup.* Start with the smallest prime, $2$. $180$ is even.
$$ 180 \div 2 = 90 $$

*Step 2: Continue with 2.* $90$ is even.
$$ 90 \div 2 = 45 $$

*Step 3: Move to the next prime, 3.* $45$ is not even. Sum of digits $4+5=9$, so it is divisible by $3$.
$$ 45 \div 3 = 15 $$

*Step 4: Continue with 3.* 
$$ 15 \div 3 = 5 $$

*Step 5: The quotient is 5, which is prime.* We stop.

*Step 6: Collect the divisors and the final prime.*
$$ 180 = 2 \times 2 \times 3 \times 3 \times 5 = 2^2 \cdot 3^2 \cdot 5^1 $$

*Reflection:* The ladder systematically extracted primes from smallest to largest. If we used a tree (e.g., pulling out $18 \times 10$), we would get the exact same primes ($18 \to 2 \cdot 3^2$; $10 \to 2 \cdot 5$), but the ladder guarantees we don't accidentally leave a composite number unfactored because of its rigid, algorithmic structure.

## Diagrams

```text
FACTOR TREE METHOD                 LADDER METHOD (Upside-down division)
      180
     /   \                           2 |  180
   18     10                           +-----
  /  \   /  \                        2 |   90
 2    9 2    5                         +-----
     / \                             3 |   45
    3   3                              +-----
                                     3 |   15
                                       +-----
Primes: 2, 3, 3, 2, 5                      5   <-- Prime, so stop.

Result: 2^2 * 3^2 * 5              Result: Read down the left, and the bottom.
                                           2 * 2 * 3 * 3 * 5 = 2^2 * 3^2 * 5
```

## Memory technique — remember this forever
1. **The Hook:** Think of prime factorization as "Mathematical Chemistry." Primes are the periodic table of elements. Composite numbers are molecules. You are breaking a molecule down into its constituent atoms.
2. **Must Overlearn:** 
   * The number $1$ is **neither prime nor composite**. Never include $1$ in a prime factorization.
   * $N = p_1^{a_1} \cdot p_2^{a_2} \cdots p_k^{a_k}$ is unique for every integer $N > 1$.
3. **Spaced Repetition Schedule:** Review this concept, factoring one random 3-digit number, at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget how to factor, remember the definition of division. Keep dividing a number by anything that goes into it evenly until you can't divide anymore. The pieces you divided by are your prime factors.

## Common mistakes
*   **Including 1 as a prime factor:** Writing $12 = 1 \cdot 2^2 \cdot 3$. The number $1$ is not prime. Including it destroys the uniqueness guaranteed by the Fundamental Theorem of Arithmetic (because you could write $1^2$, $1^3$, etc.).
*   **Stopping at a composite number:** In a factor tree, stopping at $9$ instead of breaking it down to $3 \times 3$. Always verify every "leaf" of your tree is prime.
*   **Confusing addition and multiplication:** Writing the final answer as $2+2+3$ instead of $2 \times 2 \times 3$. Factorization is strictly multiplicative.

## Self-check
1. Find the prime factorization of $126$ using the ladder method.
2. Find the prime factorization of $1024$. What do you notice about its "chemical composition"?
3. Find the prime factorization of $2310$. (Hint: Use divisibility rules to pull out large primes early if using a tree).