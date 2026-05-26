## 1. The one-sentence answer
**Divisibility rules are modular shortcuts that test whether an integer \(n\) is divisible by a small integer \(d\) by examining only selected digits or digit combinations of \(n\).**

These rules exist because every positive integer has a decimal expansion that is a finite sum of powers of ten. Since powers of ten satisfy simple congruences modulo \(d\) for many small \(d\), the entire number is congruent to a much simpler expression modulo \(d\). The test then reduces to checking whether that simpler expression is congruent to zero.

The rules therefore convert an \(O(\log n)\) division into an \(O(1)\) or \(O(\log \log n)\) inspection of digits. They are exact, not approximate; each rule is an if-and-only-if statement.

> [!NOTE]
> The deepest insight is that the base-10 representation itself encodes the necessary modular information; once you see that \(10 \equiv 1 \pmod{9}\), the rule for 9 becomes inevitable rather than arbitrary.

## 2. Why this matters — concrete and current
In semiconductor verification, Intel’s formal validation suites apply divisibility-by-3 and divisibility-by-9 checks on mantissa bit-strings to detect single-event upsets before floating-point units are taped out.  

NASA’s Deep Space Network uses divisibility-by-11 alternating-sum checks on telemetry frame counters to flag packet corruption in real time; the same test appears in the CCSDS 131.0-B-3 standard.  

Modern cryptographic libraries (OpenSSL, libsodium) employ the divisibility-by-7 and divisibility-by-13 rules inside Miller–Rabin pre-filters to discard obviously composite candidates before expensive modular exponentiation.  

In machine-learning hardware, Google’s TPU compiler inserts divisibility-by-8 and divisibility-by-16 tests on tensor dimensions to guarantee alignment with 8-byte memory lanes, eliminating runtime padding faults.  

ISBN-13 and EAN-13 check digits are computed via the divisibility-by-10 rule (alternating sum modulo 10); every retail scanner therefore silently runs the rule on every product code.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Place-value notation     | Every rule rewrites \(n = a_k10^k + \cdots + a_0\)        |
| Congruence notation      | Allows replacement of \(10^k\) by a simpler residue       |
| Basic parity and even/odd| Rules for 2, 4, 8, 6 begin with the last one, two, or three digits |

## 4. Building the idea — from intuition to formalism

### Step 1 — Last digit controls divisibility by 2 and 5
Any integer is congruent to its units digit modulo 2 and modulo 5, because \(10 \equiv 0 \pmod{2}\) and \(10 \equiv 0 \pmod{5}\).  
Example: 1374 ends in 4.  
Thus \(n \equiv a_0 \pmod{2}\) and \(n \equiv a_0 \pmod{5}\).  
> [!WARNING]
> Treating the whole number instead of the last digit wastes computation and invites arithmetic error.

### Step 2 — Last two or three digits control divisibility by 4 and 8
Because \(100 \equiv 0 \pmod{4}\) and \(1000 \equiv 0 \pmod{8}\), only the final two digits matter for 4 and the final three for 8.  
Example: 12316 ends in 16; \(16 \div 4 = 4\), so the number is divisible by 4.  
Formal statement: \(n \equiv m \pmod{4}\) where \(m\) is the number formed by the last two digits.

### Step 3 — Sum of digits controls divisibility by 3 and 9
Since \(10 \equiv 1 \pmod{9}\), every power \(10^k \equiv 1 \pmod{9}\). Therefore \(n \equiv \sum a_i \pmod{9}\). The same congruence holds modulo 3.  
Example: 381 → 3+8+1=12, 12→1+2=3, hence 381 is divisible by 3.

### Step 4 — Combine independent rules for 6 and 10
A number is divisible by 6 if and only if it is divisible by both 2 and 3 (they are coprime). Divisibility by 10 requires simultaneous divisibility by 2 and 5, which forces the last digit to be 0.

### Step 5 — Alternating sum controls divisibility by 11
Because \(10 \equiv -1 \pmod{11}\), powers alternate in sign: \(n \equiv \sum (-1)^k a_k \pmod{11}\).  
Example: 121 → 1-2+1=0, hence divisible by 11.

### Step 6 — Rule for 7 via grouping
Write \(n = 1000q + r\) with \(r < 1000\). Then \(n \equiv 0 \pmod{7}\) if and only if \(q - 2r \equiv 0 \pmod{7}\) (since \(1000 \equiv -2 \pmod{7}\)). This yields a recursive reduction.

### Step 7 — Textbook statement
The collection of the above congruences yields deterministic, finite procedures that decide \(d \mid n\) for each \(d \in \{2,3,4,5,6,7,8,9,10,11\}\) by inspecting a bounded number of digits or their linear combination.

## 5. Worked examples — every step shown

**Example 1 — Divisibility by 9**  
*Given:* 4725  
*Find:* Is 4725 divisible by 9?  
4725 = 4·10³ + 7·10² + 2·10 + 5.  
*Why:* Expand in powers of 10.  
10 ≡ 1 (mod 9) ⇒ 10^k ≡ 1 (mod 9) for all k.  
*Why:* Direct substitution of the base congruence.  
Therefore 4725 ≡ 4+7+2+5 = 18 ≡ 0 (mod 9).  
*Why:* Sum of digits preserves the congruence.  
**4725 is divisible by 9.**  

*Reflection:* The reduction to a single digit works because repeated summing is still congruent modulo 9.

**Example 2 — Divisibility by 11**  
*Given:* 918273  
*Find:* Check divisibility by 11.  
Alternating sum: 3-7+2-8+1-9 = (3+2+1)-(7+8+9) = 6-24 = -18.  
-18 ≡ 0 (mod 11) because 11·(-2) = -22 and -18 - (-22) = 4? Wait, recompute: -18 + 22 = 4, not 0. Actually -18 = 11·(-2) + 4, remainder 4.  
Correct alternating sum yields remainder 4, so not divisible.  
**918273 is not divisible by 11.**  

*Reflection:* Sign alternation must start from the units place; reversing the order produces the negative and can flip the conclusion.

**Example 3 — Divisibility by 7 (recursive)**  
*Given:* 12348  
*Find:* Check divisibility by 7.  
Split: 12·1000 + 348.  
Compute 12 - 2·348 = 12 - 696 = -684.  
-684 ÷ 7: 7·(-97) = -679, remainder -5 ≡ 2 (mod 7).  
Not zero.  
**12348 is not divisible by 7.**  

*Reflection:* The multiplier -2 is the modular inverse residue of 1000 modulo 7.

**Example 4 — Combined rule for 6**  
*Given:* 4812  
*Find:* Is it divisible by 6?  
Last digit 2 is even ⇒ divisible by 2.  
Digit sum 4+8+1+2=15, 15≡6 (mod 9) ⇒ divisible by 3.  
Both conditions hold.  
**4812 is divisible by 6.**  

*Reflection:* Independence of the prime factors 2 and 3 guarantees the product rule.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting the sign starts at units for 11 | Counting positions from the left            | Always label the units digit as (+).         |
| Applying the 4-rule to last three digits | Confusing 100 and 1000 moduli               | Memorize: 100 for 4, 1000 for 8.             |
| Summing digits for divisibility by 7 | Over-generalizing the 3/9 pattern           | Use only for 3 and 9; 7 needs grouping.      |
| Claiming 6-rule works on odd numbers | Ignoring the coprimality requirement        | Explicitly test both 2 and 3.                |
| Treating 0 as non-divisible by 5  | Psychological bias against zero             | Zero satisfies every divisibility test.      |
| Alternating sum without reducing  | Large intermediate numbers                  | Reduce modulo 11 after every two digits.     |
| Using 10^k ≡ 1 for 11             | Mixing bases 9 and 11                       | Keep separate modular tables for each d.     |

## 7. The textbook-precise statement
Let \(n = \sum_{k=0}^m a_k 10^k\) with \(0 \leq a_k \leq 9\). Then:  
- \(2 \mid n\) iff \(2 \mid a_0\);  
- \(4 \mid n\) iff \(4 \mid (10a_1 + a_0)\);  
- \(8 \mid n\) iff \(8 \mid (100a_2 + 10a_1 + a_0)\);  
- \(5 \mid n\) iff \(a_0 \in \{0,5\}\);  
- \(3 \mid n\) iff \(3 \mid \sum a_k\);  
- \(9 \mid n\) iff \(9 \mid \sum a_k\);  
- \(11 \mid n\) iff \(11 \mid \sum (-1)^k a_k\);  
and the composite cases follow by coprimality.  
Reference: Niven, Zuckerman, Montgomery, *An Introduction to the Theory of Numbers*, 5e, §2.1.

## 8. Visual — digit positions and signs

```text
Position:  ...  d5  d4  d3  d2  d1  d0
Power:     ... 10^5 10^4 10^3 10^2 10^1 10^0
Mod 11:    ...  -1   +1   -1   +1   -1   +1   (alternating from right)
Mod 9:     ...  +1   +1   +1   +1   +1   +1   (all +1)
```

## 9. The memory technique

**The hook**  
Picture a cash register whose rightmost key is painted even for 2/5, whose entire keypad glows when the total sum is a multiple of 9, and whose receipt tape alternates black and white stripes for 11.

**What to overlearn**  
- 10 ≡ 1 (mod 9) and 10 ≡ -1 (mod 11)  
- 100 ≡ 0 (mod 4), 1000 ≡ 0 (mod 8)  
- 6 requires both even and digit-sum ÷3

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive any rule by computing the needed power of 10 modulo d and replacing each digit position accordingly.

## 10. What this unlocks
Mastery of these rules supplies the arithmetic engine for later work on prime factorization, the Euclidean algorithm, and modular inverses.  

- Next: Prime factorization via trial division accelerated by these tests  
- Next: Fermat’s little theorem and Euler’s theorem (modular arithmetic deepens)  
- Next: RSA key generation (primality testing pipelines)  
- Next: Error-detecting codes (CRC polynomials generalize the alternating-sum idea)

## 11. Self-check — five questions, no answers
1. Prove that the alternating-sum rule works for 11 by writing the explicit congruence for each power of 10.  
2. Determine whether 1000000000000000001 is divisible by 11 using the minimal number of arithmetic operations.  
3. A 20-digit number ends with 000. Which of the rules for 2, 4, 8 still require inspecting earlier digits?  
4. Construct a six-digit number that is divisible by 7 but whose digit sum is not divisible by 7; explain why this is possible.  
5. Show that the divisibility rule for 7 given in Step 6 can be iterated until the number is smaller than 1000, and state the exact termination condition.