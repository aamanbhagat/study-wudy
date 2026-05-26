## 1. The one-sentence answer
**The greatest common divisor of two integers is the largest positive integer that divides both without remainder, and it can be found either by comparing the lowest powers of all shared prime factors or by repeated division that replaces the larger number with the remainder of their division.**

Any two integers share a finite set of common divisors. The greatest among them is unique. Prime factorization isolates this greatest divisor by retaining only the primes that appear in both numbers and selecting the smallest exponent that occurs for each such prime. The Euclidean algorithm reaches the same value without listing primes: it replaces the pair (a, b) with (b, a mod b) until the remainder is zero; the last non-zero remainder is the gcd.

Both procedures rest on the same arithmetic fact: every common divisor of a and b is also a common divisor of b and a − kb for any integer k. Consequently the set of common divisors is unchanged by the Euclidean step, yet the numbers become strictly smaller until termination.

> [!NOTE]
> The Euclidean algorithm terminates because the non-negative remainders form a strictly decreasing sequence of integers; this guarantees both correctness and an efficient computation even for numbers with hundreds of digits.

## 2. Why this matters — concrete and current
In RSA public-key cryptography the modulus is the product of two large primes p and q; the private exponent is computed via the modular inverse of the public exponent modulo (p−1)(q−1), an operation that first requires gcd(e,(p−1)(q−1))=1. Libraries such as OpenSSL therefore invoke the Euclidean algorithm millions of times per second during key generation.

Modern compilers and GPU drivers simplify fractions that arise in texture-coordinate calculations by dividing numerator and denominator by their gcd; NVIDIA’s CUDA math library uses a hardware-accelerated Euclidean routine to keep shader arithmetic in reduced form and avoid overflow in 32-bit integer pipelines.

In semiconductor layout, standard-cell heights and track pitches must share a greatest common divisor so that place-and-route tools can align power rails without fractional microns; TSMC’s 5 nm process design kits explicitly publish the required gcd of metal pitches to ensure mask manufacturability.

The period of a linear congruential random-number generator is maximised only when the increment and modulus are coprime; Intel’s MKL and NVIDIA’s cuRAND therefore test gcd(c,m)=1 before accepting generator parameters, preventing short cycles that would bias Monte-Carlo simulations in physics and finance.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Integer division and remainder | The Euclidean step replaces a with a mod b; without a precise definition of remainder the algorithm cannot be stated. |
| Prime numbers and unique factorization | The prime-factorization method relies on the fact that every integer greater than 1 has a unique multiset of prime factors. |
| Exponent notation        | Comparing min(α,β) for each prime power p^α and p^β requires comfort with exponential notation. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Common divisors are preserved under subtraction
Any integer that divides both a and b also divides any integer linear combination ka + mb.  
Example: 3 divides 12 and 18, hence 3 divides 18 − 12 = 6.  
Formally: if d | a and d | b then d | (a − kb) for every integer k.  
> [!WARNING] Treating “divides” as ordinary subtraction rather than as an exact multiple will produce remainders that are not multiples of d and will break later steps.

### Step 2 — The set of common divisors is finite and non-empty
Every pair of integers possesses at least the divisor 1; the positive ones are bounded above by min(|a|,|b|).  
Example: divisors of 12 are {±1,±2,±3,±4,±6,±12}; those of 18 are {±1,±2,±3,±6,±9,±18}; intersection yields {±1,±2,±3,±6}.  
Formally: the set D(a,b) = {d ∈ ℕ : d | a ∧ d | b} is finite and non-empty.

### Step 3 — A greatest element exists
Because D(a,b) is a non-empty finite set of positive integers it possesses a maximum element, denoted gcd(a,b).  
Example: max{1,2,3,6} = 6, so gcd(12,18) = 6.

### Step 4 — Prime factorization isolates the maximum
Write a = ∏ p_i^{α_i} and b = ∏ p_i^{β_i}. Then gcd(a,b) = ∏ p_i^{min(α_i,β_i)}.  
Example: 12 = 2^2·3^1, 18 = 2^1·3^2 ⇒ gcd = 2^1·3^1 = 6.

### Step 5 — The Euclidean recurrence
gcd(a,b) = gcd(b, a mod b) whenever b ≠ 0; the process ends when the remainder is zero.  
Formally: gcd(a,0) = |a| and gcd(a,b) = gcd(b,a mod b) for b > 0.  
> [!WARNING] Forgetting to take the absolute value when a or b is negative yields a negative “gcd”, violating the convention that gcd returns a positive integer.

### Step 6 — Termination and correctness
Each remainder is strictly smaller than the previous divisor and non-negative, so the algorithm halts after finitely many steps; the last non-zero remainder divides both original numbers and is the greatest such divisor.

## 5. Worked examples — every step shown

**Example 1 — Two small composite numbers**  
*Given:* a = 48, b = 18  
*Find:* gcd(48,18) by both methods.  

Prime factorization:  
48 = 2^4 · 3^1, 18 = 2^1 · 3^2.  
min exponents give 2^1 · 3^1 = 6.  
*Why* each prime power is kept only to the lower exponent.  

Euclidean algorithm:  
48 = 2·18 + 12  *Why* replace 48 by remainder 12.  
18 = 1·12 + 6   *Why* replace 18 by remainder 6.  
12 = 2·6 + 0    *Why* remainder 0 stops the process.  
Last non-zero remainder is 6.  

**6**

*Reflection:* The two methods agree; the Euclidean path required only three divisions.

**Example 2 — Coprime pair**  
*Given:* 17 and 23.  
Both are prime, hence share no common prime factors other than 1.  
Euclidean: 23 = 1·17 + 6, 17 = 2·6 + 5, 6 = 1·5 + 1, 5 = 5·1 + 0 → gcd = 1.  

**1**

*Reflection:* When the algorithm reaches remainder 1, all larger numbers are immediately known to be coprime.

**Example 3 — Larger numbers requiring many steps**  
*Given:* 1071 and 462.  
1071 = 2·462 + 147  
462 = 3·147 + 21  
147 = 7·21 + 0  
→ gcd = 21.

**21**

*Reflection:* Notice the rapid drop in size; seven steps would have been needed by listing divisors.

**Example 4 — Negative input**  
*Given:* −48 and 18.  
gcd(−48,18) = gcd(48,18) by definition.  
Euclidean proceeds identically on absolute values and returns +6.

**6**

*Reflection:* The sign of the inputs never affects the positive gcd.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Reporting 0 as gcd(0,0)           | The definition is vacuously true for every integer | Adopt the convention gcd(0,0) is undefined or 0 by separate fiat. |
| Using max instead of min exponents | Confusing LCM with GCD                      | Write “min” explicitly on every prime power. |
| Stopping Euclidean at first remainder | Misreading the termination condition        | Continue until remainder is exactly zero.    |
| Forgetting that 1 divides everything | Treating 1 as “trivial” and discarding it   | Always include exponent 0 for missing primes. |
| Applying the algorithm to floats  | Assuming real-number division works the same | Restrict inputs to integers; reduce fractions first. |
| Confusing gcd(a,b) with gcd(a,−b) | Sign errors in remainder                    | Replace both arguments by their absolutes at the start. |
| Listing all divisors instead of primes | Exponential growth in number of divisors    | Switch to Euclidean once numbers exceed 10^6. |

## 7. The textbook-precise statement
Let a,b ∈ ℤ, not both zero. The greatest common divisor of a and b, written gcd(a,b), is the unique positive integer d satisfying:  
(1) d | a and d | b,  
(2) if e | a and e | b then e | d.  

Equivalently, d = ∏ p^{min(v_p(a),v_p(b))} where the product runs over primes p and v_p denotes the p-adic valuation.  

The Euclidean algorithm computes d by the recurrence  
gcd(a,b) = gcd(b, a − b⌊a/b⌋) with gcd(a,0) = |a|.  

Reference: Rosen, *Elementary Number Theory and Its Applications*, 6e, §3.3.

## 8. Visual — diagram or schematic
```text
Euclidean algorithm tree (a=1071, b=462)

1071 = 2·462 + 147     ← remainder 147 < 462
         │
       462 = 3·147 + 21   ← remainder 21 < 147
                 │
               147 = 7·21 + 0     ← remainder 0 stops
                         │
                       gcd = 21
```
Each arrow replaces the dividend by the previous remainder; the depth equals the number of division steps.

## 9. The memory technique

1. **The hook** — Picture two rulers laid end-to-end; the Euclidean algorithm repeatedly “snaps off” the shorter ruler from the longer one until nothing remains; the final snapped length is the gcd.
2. **What to overlearn** — gcd(a,0) = |a|; gcd(a,b) = gcd(b,a mod b); the prime-factor formula uses min exponents.
3. **Spaced-repetition schedule** — Drill 20 random pairs at day 1, day 3, day 7, day 16, day 35.
4. **First-principles fallback** — Re-derive the invariance “any common divisor of a and b divides a − kb” and the strictly decreasing remainder argument.

## 10. What this unlocks
Mastery of gcd supplies the foundation for fractions in lowest terms, modular inverses, and the ring-theoretic notion of principal ideals.  

- Least common multiple via the identity lcm(a,b)·gcd(a,b) = |ab|.  
- Extended Euclidean algorithm yielding Bézout coefficients ax + by = gcd.  
- RSA key generation and Pollard's rho factorization.  
- Lattice basis reduction (LLL algorithm) in cryptography and integer programming.

## 11. Self-check — five questions, no answers
1. Compute gcd(391, 299) by the Euclidean algorithm and list every remainder.  
2. Factor 2520 and 660 into primes, then obtain their gcd using the min-exponent rule.  
3. Prove that if d = gcd(a,b) then gcd(a/d,b/d) = 1.  
4. A student claims gcd(0,5) = 0. Identify the error and give the correct value.  
5. Show that the number of division steps in the Euclidean algorithm on Fibonacci numbers F_{n+1} and F_n is exactly n−1; explain why this is the worst case.