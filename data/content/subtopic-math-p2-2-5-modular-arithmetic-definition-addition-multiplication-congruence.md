## What it is
Modular arithmetic is a system of arithmetic for integers where numbers "wrap around" upon reaching a certain value, called the modulus. Instead of focusing on the quotient of division, it focuses entirely on the remainder, treating numbers that leave the same remainder as equivalent. 

## Why it matters
In computer science, modular arithmetic governs integer overflow, hash table indexing, and the fundamental algorithms of cryptography (like RSA and Diffie-Hellman). In physics and aerospace, it is the mathematical foundation for analyzing periodic phenomena, from orbital phase angles to signal processing in telemetry.

## When to study it
You must have a rock-solid grasp of basic integer division, the concept of remainders, and algebraic substitution. You should also understand what a prime number is and be comfortable factoring integers. If you do not know what the notation $a \mid b$ (meaning "$a$ divides $b$") means, review basic divisibility rules first.

## How to study it (step by step)
1. **Define Congruence:** Write down the formal definition of congruence. Prove to yourself that if $a$ and $b$ have the same remainder when divided by $n$, then $n$ evenly divides $(a-b)$.
2. **Prove the Addition Rule:** Let $a = q_1n + r_1$ and $b = q_2n + r_2$. Add them together and factor out $n$ to prove that $(a+b) \pmod n$ depends only on $(r_1 + r_2)$.
3. **Prove the Multiplication Rule:** Multiply the same expressions for $a$ and $b$. Expand the polynomial and show that all terms except $r_1 r_2$ are multiples of $n$.
4. **Practice Exponentiation:** Calculate large powers modulo $n$ (e.g., $2^{10} \pmod 7$) by breaking the exponent down and applying the modulo operation at each step to keep numbers small.
5. **Explore Negative Numbers:** Convince yourself that $-1 \equiv n-1 \pmod n$. Use this trick to simplify calculations (e.g., $6^5 \pmod 7 \equiv (-1)^5 \pmod 7 \equiv -1 \equiv 6$).

## Key ideas, with intuition

**1. The Definition of Congruence**
We say $a$ is congruent to $b$ modulo $n$, written as:
$$a \equiv b \pmod n$$
This means $a$ and $b$ leave the same remainder when divided by $n$. Equivalently, and more usefully for proofs, it means the difference between $a$ and $b$ is a multiple of $n$:
$$n \mid (a - b) \quad \text{or} \quad a = kn + b \text{ for some integer } k$$

**2. Addition and Multiplication are "Modulo-Safe"**
You can take the modulo of numbers *before* you add or multiply them, and you will get the same result as if you took the modulo *after*. This keeps numbers from exploding in size during computation.
If $a \equiv c \pmod n$ and $b \equiv d \pmod n$, then:
$$a + b \equiv c + d \pmod n$$
$$a \cdot b \equiv c \cdot d \pmod n$$

**3. Division is Broken (For Now)**
In normal math, if $2x = 6$, $x = 3$. In modular arithmetic, if $2x \equiv 2 \pmod 4$, you might be tempted to divide by 2 to get $x \equiv 1 \pmod 4$. But $x = 3$ also works, because $2(3) = 6 \equiv 2 \pmod 4$. You cannot blindly divide both sides of a congruence unless the number you are dividing by shares no common factors with the modulus $n$.

## Worked example
**Problem:** Find the remainder of $3^{50}$ when divided by $7$.

**Step 1:** We want to evaluate $3^{50} \pmod 7$. We start by finding small powers of $3 \pmod 7$.
$$3^1 \equiv 3 \pmod 7$$
$$3^2 \equiv 9 \equiv 2 \pmod 7$$
$$3^3 \equiv 3^2 \cdot 3 \equiv 2 \cdot 3 \equiv 6 \pmod 7$$

**Step 2:** Notice that $6 \equiv -1 \pmod 7$. This is a powerful shortcut.
$$3^3 \equiv -1 \pmod 7$$

**Step 3:** Express the exponent $50$ in terms of $3$.
$$50 = 3 \times 16 + 2$$

**Step 4:** Substitute and apply the rules of exponents and modular multiplication.
$$3^{50} = 3^{3 \times 16 + 2} = (3^3)^{16} \cdot 3^2$$
$$3^{50} \equiv (-1)^{16} \cdot 2 \pmod 7$$

**Step 5:** Simplify.
$$(-1)^{16} = 1$$
$$1 \cdot 2 = 2$$
Therefore, $3^{50} \equiv 2 \pmod 7$. The remainder is $2$.

*Reflection:* This worked because modular arithmetic allows us to replace any number with its congruent counterpart at any step of addition or multiplication. By finding a power of 3 that was congruent to $-1$, we reduced a massive exponentiation problem into trivial arithmetic.

## Diagrams

Think of modulo $n$ as a clock with $n$ hours, starting at 0. Here is a Modulo 5 clock.

```text
       0
     /   \
   4       1
    \     /
     3 - 2
```
If you start at `3` and add `4` (moving clockwise 4 steps):
1 step  -> `4`
2 steps -> `0`
3 steps -> `1`
4 steps -> `2`
Hence, $3 + 4 = 7 \equiv 2 \pmod 5$. 
Negative numbers mean moving counter-clockwise. $-1 \pmod 5$ is one step counter-clockwise from 0, landing on `4`.

## Memory technique — remember this forever
1. **The Hook:** "Modulo is a Bucket." Modulo $n$ creates $n$ buckets (0 through $n-1$). Every integer falls into exactly one bucket based on its remainder. When you add or multiply, you are just combining buckets.
2. **Must Overlearn:** 
   * $a \equiv b \pmod n \iff n \mid (a-b)$
   * $a \equiv b \pmod n \iff a = kn + b$
3. **Spaced Repetition Schedule:** Review these definitions and solve one exponentiation problem at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget whether you can apply modulo before multiplying, rebuild it. Let $a = q_1n + r_1$ and $b = q_2n + r_2$. Multiply them: $ab = (q_1n + r_1)(q_2n + r_2) = q_1q_2n^2 + q_1nr_2 + q_2nr_1 + r_1r_2$. Notice that every term has an $n$ in it except $r_1r_2$. Therefore, $ab \pmod n$ is exactly $r_1r_2 \pmod n$.

## Common mistakes
* **Applying modulo to the exponent:** Students often assume $2^5 \pmod 3$ is the same as $2^{(5 \pmod 3)} \pmod 3 = 2^2 \pmod 3$. This is completely false. Exponents do not obey the modulus of the base. (They obey a different modulus governed by Euler's Totient Theorem, which you will learn later).
* **Dividing without checking coprimality:** Canceling $c$ from $ac \equiv bc \pmod n$ is only valid if the greatest common divisor of $c$ and $n$ is 1. Otherwise, you must divide the modulus $n$ by that common divisor as well.
* **Ignoring negative remainders:** Getting stuck calculating $14^6 \pmod{15}$ because $14$ is "too big", failing to realize that $14 \equiv -1 \pmod{15}$, making the answer trivially $(-1)^6 = 1$.

## Self-check
1. Calculate $12 \times 17 \pmod 5$. Do it two ways: by multiplying first, and by taking the modulo of each factor first.
2. Find the remainder of $7^{100}$ when divided by $8$.
3. Find all integers $x$ between $0$ and $5$ inclusive that satisfy $3x \equiv 3 \pmod 6$. Why is the answer not just $x = 1$?