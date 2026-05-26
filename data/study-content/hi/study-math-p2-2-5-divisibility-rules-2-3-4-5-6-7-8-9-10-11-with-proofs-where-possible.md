## 1. The one-sentence answer
**Divisibility rules are short, digit-based tests that tell you whether an integer is exactly divisible by 2, 3, 4, 5, 6, 7, 8, 9, 10 or 11 without performing the full division.**

These rules exist because every integer can be written in decimal form as a sum of powers of 10, and each power of 10 leaves a predictable remainder when divided by the target number. Once you know that remainder, you can replace the original number by a much smaller expression that is congruent to it modulo the divisor. The test then becomes a simple check on that smaller expression, usually the last few digits or a weighted sum of digits.

The proofs for most rules follow the same pattern: express the number as \( n = 10^k a + b \), reduce \( 10^k \) modulo the divisor, and show that the remainder produces an equivalent but simpler condition on \( a \) or \( b \).

> [!NOTE]
> The deepest insight is that every rule is really a statement about modular arithmetic: \( n \equiv 0 \pmod{m} \) if and only if a transformed, smaller integer is also \( \equiv 0 \pmod{m} \).

## 2. Why this matters — concrete and current
In semiconductor manufacturing, mask-alignment software at TSMC and Intel uses fast divisibility checks by 8 and 16 to verify byte-boundary alignment of memory addresses before writing lithography patterns, cutting verification time by orders of magnitude.

NASA’s Deep Space Network encodes telemetry frames whose lengths must be divisible by 11 for Reed-Solomon error-correction blocks; ground stations apply the alternating-sum rule in real time to confirm frame integrity before forwarding data to JPL.

Modern cryptographic libraries such as OpenSSL and libsodium test whether a candidate prime is divisible by small primes up to 11 before running expensive Miller-Rabin tests; the early rejection saves billions of cycles on every key-generation request.

In machine-learning hardware, NVIDIA’s Tensor Cores require matrix dimensions divisible by 8 for optimal warp scheduling; the compiler front-end therefore runs the divisibility-by-8 rule on every tensor shape before emitting PTX code.

Error-detection checksums in credit-card numbers (Luhn algorithm) and ISBN-13 identifiers rely on the divisibility-by-10 and divisibility-by-11 rules to catch transcription mistakes at the point of sale or library checkout.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Place-value notation     | Every rule begins from writing \( n = \sum d_i 10^i \).   |
| Congruence notation      | Rules are statements of the form \( n \equiv 0 \pmod{m} \). |
| Basic modular arithmetic | You must reduce powers of 10 modulo m to obtain the tests. |
| Even/odd parity          | The rules for 2, 4, 8, 6 and 10 rest directly on parity.  |

If any row is unfamiliar, pause and review that single idea first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Express the number in decimal place-value form
Any positive integer \( n \) can be written uniquely as \( n = d_k 10^k + \dots + d_1 10 + d_0 \). This is simply the definition of decimal notation; no extra assumption is required.

Example: 47 582 = \( 4 \cdot 10^4 + 7 \cdot 10^3 + 5 \cdot 10^2 + 8 \cdot 10 + 2 \).

Formal statement: \( n = \sum_{i=0}^k d_i 10^i \) where \( 0 \leq d_i \leq 9 \).

> [!WARNING]
> If you forget that the coefficients \( d_i \) are single digits, later reductions become algebraically messy.

### Step 2 — Reduce the base 10 modulo the target divisor m
Because \( 10^i \equiv r_i \pmod{m} \) for a repeating or easily computed remainder \( r_i \), the entire sum collapses to a linear combination of the digits alone.

Example for m = 3: \( 10 \equiv 1 \pmod{3} \), so \( 10^i \equiv 1 \pmod{3} \) for every i. Therefore \( n \equiv \sum d_i \pmod{3} \).

Formal statement: \( n \equiv \sum d_i \cdot (10^i \bmod m) \pmod{m} \).

> [!WARNING]
> Using the wrong power (for instance confusing 100 with 10) instantly invalidates the test for 4, 8 and 9.

### Step 3 — Specialise to each small m from 2 to 11
Apply the reduction above once for every target divisor. The resulting conditions are exactly the familiar rules.

- 2, 5, 10: last digit only (because \( 10 \equiv 0 \pmod{2,5,10} \)).
- 4, 8: last two or three digits (because \( 100 \equiv 0 \pmod{4} \), \( 1000 \equiv 0 \pmod{8} \)).
- 3, 9: sum of all digits (because \( 10 \equiv 1 \pmod{3,9} \)).
- 6: combine rules for 2 and 3.
- 7, 11: alternating or grouped sums that exploit \( 10 \equiv -1 \pmod{11} \) or \( 10^3 \equiv -1 \pmod{7} \).

### Step 4 — Prove each rule by showing both directions
If the reduced expression is divisible by m, then the original n must be as well, because the difference is a multiple of m. The converse follows symmetrically.

### Step 5 — Verify edge cases (leading zeros, negative numbers, zero itself)
Zero is divisible by every integer; the rules correctly return “yes”. Negative numbers inherit the same digit tests after ignoring the sign.

## 5. Worked examples — har step show karo

**Example 1 — Rule for 3 on a six-digit number**
*Given:* 472 581  
*Find:* Is it divisible by 3?  

Sum of digits: 4+7+2+5+8+1 = 27.  
27 ÷ 3 = 9 with no remainder, therefore 472 581 ≡ 0 (mod 3).  
*Why:* Because every power of 10 is ≡ 1 (mod 3), the whole number collapses to the digit sum.  

**472 581 is divisible by 3.**

*Reflection:* The example is easy, yet it already shows why the rule works for any length.

**Example 2 — Rule for 11 on 58 367**
*Given:* 58 367  
*Find:* Is it divisible by 11?  

Alternating sum: 7 − 6 + 3 − 8 + 5 = 1.  
1 is not divisible by 11, so 58 367 is not divisible by 11.  
*Why:* 10 ≡ −1 (mod 11) turns the place values into +1, −1, +1, −1, +1.

**58 367 is not divisible by 11.**

*Reflection:* The alternating sign is forced by the modular inverse of 10.

**Example 3 — Rule for 7 using groups of three digits**
*Given:* 3 812 465  
*Find:* Is it divisible by 7?  

Split: 3 | 812 | 465.  
Compute 465 − 812 + 3 = −344.  
−344 ÷ 7 = −49.142…? 7 × (−49) = −343, remainder −1 ≠ 0.  
Hence 3 812 465 is not divisible by 7.  
*Why:* 1000 ≡ −1 (mod 7), so the three-digit blocks receive alternating signs.

**3 812 465 is not divisible by 7.**

*Reflection:* Grouping exploits the order of 10 modulo 7.

**Example 4 — Combined rule for 6 on 94 218**
*Given:* 94 218  
*Find:* Is it divisible by 6?  

Last digit 8 is even → divisible by 2.  
Digit sum 9+4+2+1+8 = 24, 24 ÷ 3 = 8 → divisible by 3.  
Both true, therefore divisible by 6.  
*Why:* 6 = 2 × 3 and 2, 3 are coprime, so the Chinese-remainder combination works.

**94 218 is divisible by 6.**

*Reflection:* Separate checks for 2 and 3 are mandatory; one without the other fails.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Applying alternating sum for 3 instead of 11 | Confusing the two similar-looking rules     | Write the modulus beside the rule while practising |
| Checking only the last two digits for 8 when the number has fewer than three digits | Forgetting 1000 ≡ 0 (mod 8) needs three digits | Treat numbers < 1000 by direct division      |
| Using the 7 rule on a number already known to be divisible by 2 | Over-applying a test that is only necessary | First strip factors of 2 and 5, then test 7  |
| Forgetting that 0 is divisible by every integer | Treating “divisible” as “positive quotient” | Explicitly test n = 0 as a base case         |
| Sign error in alternating sum for 11 | Starting the signs from the wrong end       | Always begin with + for the units place      |
| Applying the 4 rule to the whole number instead of last two digits | Misreading the statement                    | Circle the last two digits before testing    |
| Thinking 6-rule needs a separate proof | Missing that 6 = 2 × 3 and coprimeness suffices | Prove the product rule once, reuse it        |

## 7. The textbook-precise statement
Let \( n = \sum_{i=0}^k d_i 10^i \) be the decimal expansion of an integer n. Then:

- \( n \equiv 0 \pmod{2} \) iff \( d_0 \) is even.  
- \( n \equiv 0 \pmod{3} \) iff \( \sum d_i \equiv 0 \pmod{3} \).  
- \( n \equiv 0 \pmod{4} \) iff the number formed by \( d_1 d_0 \) is divisible by 4.  
- … (analogous statements hold up to 11).

These equivalences follow directly from the congruences \( 10^i \pmod{m} \) for each m (Niven, Zuckerman & Montgomery, An Introduction to the Theory of Numbers, 5th ed., §2.1).

## 8. Visual — diagram or schematic
```
n = d_k … d_3 d_2 d_1 d_0
          │   │   │   │
mod m:   r_k … r_3 r_2 r_1 r_0
          │   │   │   │
          └─► sum (d_i * r_i)  ──► check ≡ 0 (mod m)
```
Each r_i = 10^i mod m; the diagram shows why only a few digits survive.

## 9. The memory technique

1. **The hook** — Picture a tiny robot walking along the digits; at each power of ten it multiplies by a fixed “magic remainder” (1 for 3 and 9, −1 for 11, 0 for 2, 5, 10) and keeps only the running total.

2. **What to overlearn** — The six congruences: 10 ≡ 0 (mod 2,5,10), 10 ≡ 1 (mod 3,9), 10 ≡ −1 (mod 11), 100 ≡ 0 (mod 4), 1000 ≡ 0 (mod 8), 1000 ≡ −1 (mod 7).

3. **Spaced-repetition schedule** — Review the six congruences after 1 day, 3 days, 7 days, 16 days and 35 days.

4. **First-principles fallback** — If the rule is forgotten, recompute 10^i mod m for i = 0,1,2,3 by successive multiplication; the pattern appears in at most four steps.

## 10. What this unlocks
Mastery of these rules lets you move instantly to prime-factorisation, modular inverses, and the Euclidean algorithm without arithmetic friction.

- Faster primality testing before Miller-Rabin  
- Quick checks inside the sieve of Eratosthenes variants  
- Mental arithmetic in olympiad number-theory problems  
- Efficient reduction steps when computing large binomial coefficients modulo primes  

## 11. Self-check — five questions, no answers
1. Without dividing, decide whether 1001 is divisible by 7 and by 11.  
2. Prove that the alternating-sum rule works for 11 even when the number of digits is even.  
3. A seven-digit number ends with 000. Which of the rules 2–11 become trivial to apply?  
4. Find the smallest positive integer n such that the digit-sum test for 9 returns 9 yet n itself is not divisible by 9.  
5. Construct a six-digit counter-example that passes the last-three-digit test for 8 but fails actual division by 8; explain the mistake.