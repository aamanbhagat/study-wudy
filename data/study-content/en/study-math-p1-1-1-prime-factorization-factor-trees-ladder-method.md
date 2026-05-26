## 1. The one-sentence answer
**Prime factorization expresses every integer greater than 1 as a product of prime numbers, and factor trees together with the ladder method are two systematic procedures that generate that product.**

Every composite number can be broken into smaller factors until only primes remain. The resulting list of primes, written with multiplicity, is unique for each integer. Factor trees display the breaking process as branches that meet at the original number. The ladder method performs the same decomposition by repeated division, recording the primes that divide evenly at each step.

Both procedures rest on the same fact: if a number is composite, at least one prime divides it. Continuing until nothing remains except primes yields the complete factorization. The methods differ only in presentation; the underlying sequence of divisions is identical.

> [!NOTE]
> The uniqueness of the prime list (apart from order) is the single deepest fact; once grasped, every later property of integers—divisibility, GCD, LCM—follows directly from it.

## 2. Why this matters — concrete and current
RSA encryption, used by every major TLS certificate on the internet, derives its security from the computational difficulty of recovering the two large prime factors of a semiprime whose product is published.  

In semiconductor mask design, the greatest common divisor of two layout dimensions is computed via prime factorizations to minimize redundant etching steps and reduce mask count.  

Error-correcting codes in NASA’s deep-space probes, such as the Voyager and Perseverance missions, rely on the factorization of the code length to construct cyclic codes that detect and correct bit flips over distances of billions of kilometers.  

Modern integer factorization records, such as the 2020 factorization of RSA-250 by the CADO-NFS team, directly benchmark progress in both cryptography and algorithmic number theory.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definition of prime      | Only primes survive as the final factors                  |
| Definition of composite  | Identifies numbers that must be broken further            |
| Multiplication tables    | Verifies that candidate factors actually multiply back to the original number |
| Division algorithm       | Supplies the exact quotient at each ladder step           |

## 4. Building the idea — from intuition to formalism

### Step 1 — Every integer greater than 1 is either prime or composite
A prime has no divisors other than 1 and itself. Any other integer greater than 1 must possess a divisor strictly between 1 and itself.  
Example: 7 is prime; 9 admits the divisor 3.  
Formally, an integer \(n > 1\) is prime if its only positive divisors are 1 and \(n\); otherwise it is composite.  
> [!WARNING] Treating 1 as prime collapses the entire theory, because 1 has no prime factors yet would appear in every factorization.

### Step 2 — A composite number always possesses a prime divisor
If \(n\) is composite, it has a divisor \(d\) with \(1 < d < n\). Repeating the search inside \(d\) or \(n/d\) must terminate at a prime, since the numbers are strictly decreasing.  
Example: 15 is divisible by 3; 3 is prime.  
Formally, every composite integer has at least one prime divisor.

### Step 3 — Repeated extraction of prime divisors exhausts the number
Divide out each discovered prime until the quotient equals 1. The collected primes multiply back to the original integer.  
Example: Start with 60. Remove 2 to obtain 30; remove 2 to obtain 15; remove 3 to obtain 5; remove 5 to obtain 1.  
Formally, \(n = p_1 p_2 \cdots p_k\) where each \(p_i\) is prime.

### Step 4 — Factor trees record the extraction visually
Each composite factor is written once and split into two factors whose product is itself. Leaves of the finished tree are primes.  
Example: 36 splits as 4 × 9; 4 splits as 2 × 2; 9 splits as 3 × 3. Leaves: 2, 2, 3, 3.

### Step 5 — The ladder method records the same extraction by successive division
Write the number; divide by the smallest prime that divides it; repeat with the quotient. The sequence of divisors is the prime factorization.  
Example: 84 ÷ 2 = 42; 42 ÷ 2 = 21; 21 ÷ 3 = 7; 7 ÷ 7 = 1. Primes: 2, 2, 3, 7.

### Step 6 — The Fundamental Theorem of Arithmetic
The collected primes are independent of the order of extraction and of the intermediate composites chosen.  
Formally: Every integer \(n > 1\) admits a factorization \(n = p_1^{a_1} p_2^{a_2} \cdots p_k^{a_k}\) into primes that is unique up to ordering of the factors.

## 5. Worked examples — every step shown

**Example 1 — Small factor tree**  
*Given:* 24  
*Find:* prime factorization via factor tree  

24  
├── 4  
│   ├── 2  
│   └── 2  
└── 6  
    ├── 2  
    └── 3  

*Why* 24 is split into 4 and 6: both multiply to 24 and are smaller.  
*Why* 4 is split into 2 and 2: 2 × 2 = 4 and both are prime.  
*Why* 6 is split into 2 and 3: 2 × 3 = 6 and both are prime.  

**2² × 3**

*Reflection* The tree makes every intermediate factor explicit; the same primes appear regardless of which pair is chosen first.

**Example 2 — Ladder method on the same number**  
*Given:* 24  
*Find:* prime factorization via ladder  

```
2 | 24
2 | 12
2 |  6
3 |  3
  |  1
```

*Why* first division by 2: 24 is even.  
*Why* next division by 2: 12 is even.  
*Why* next division by 2: 6 is even.  
*Why* division by 3: 3 is prime.  

**2³ × 3**

*Reflection* The ladder records only the prime quotients; no composite intermediates appear.

**Example 3 — Larger number with repeated primes**  
*Given:* 360  
*Find:* prime factorization  

Ladder:  
```
2 | 360
2 | 180
2 |  90
3 |  45
3 |  15
5 |   5
  |   1
```  
**2³ × 3² × 5**

*Reflection* Counting the identical primes directly from the ladder avoids recounting later.

**Example 4 — Semiprime**  
*Given:* 91  
*Find:* prime factorization  

Factor tree:  
91  
├── 7  
└── 13  

Both 7 and 13 are prime.  
**7 × 13**

*Reflection* When the number is a product of two large primes, the tree collapses quickly; exhaustive trial division up to \(\sqrt{91}\) is still required to confirm primality.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Including 1 among the prime factors | Habit of writing “1 × n” as a first split   | Never accept 1 as a factor; stop when the quotient is prime |
| Forgetting multiplicity           | Writing each prime only once                | Count every identical division in the ladder or every identical leaf in the tree |
| Stopping at a composite factor    | Overlooking that the last factor may still be composite | Continue until every leaf or quotient is proven prime |
| Choosing an unnecessarily large prime first | Desire to finish quickly                    | Always test the smallest prime that divides; the order does not change the final list |
| Confusing “divides evenly” with “is a factor” | Loose language                              | Verify by explicit multiplication that the product of claimed factors equals the original number |
| Treating squares incorrectly      | Writing p² as a single p                    | Record the exponent or repeat the prime visibly in the tree |
| Assuming uniqueness without order | Believing different trees give different primes | Reassemble the product each time; identical primes must appear |

## 7. The textbook-precise statement
Every integer \(n > 1\) can be written uniquely as  
\[n = p_1^{a_1} p_2^{a_2} \cdots p_k^{a_k},\]  
where the \(p_i\) are distinct primes and the exponents \(a_i\) are positive integers. The representation is independent of the algorithm used to obtain it (factor tree or ladder).  
Reference: Niven, Zuckerman, Montgomery, *An Introduction to the Theory of Numbers*, 5th ed., §1.2, Theorem 1.2.

## 8. Visual — diagram or schematic

```text
Factor tree for 60                  Ladder for 60
        60                              2 | 60
       /  \                             2 | 30
      2    30                           3 | 15
          /  \                          5 |  5
         2    15                          |  1
             /  \
            3    5
Leaves (left to right): 2, 2, 3, 5     Quotients: 2, 2, 3, 5
```

## 9. The memory technique

1. **The hook** — Picture each prime as an indivisible atom; every composite number is a molecule assembled from those atoms. Factorization is simply reading the molecular formula.  
2. **What to overlearn** — The first ten primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29; and the rule that the factorization is finished only when the remaining quotient equals 1.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by testing successive integers starting from 2; any divisor that survives the test must be prime because all smaller candidates have already been removed.

## 10. What this unlocks
Prime factorization supplies the raw material for every subsequent arithmetic algorithm that depends on divisibility.  

- Computing GCD and LCM via min/max exponents  
- Reducing fractions to lowest terms  
- Solving linear Diophantine equations  
- Constructing the Euler totient function \(\phi(n)\)  
- Entering elementary number theory and the study of modular arithmetic

## 11. Self-check — five questions, no answers
1. Draw a factor tree for 48 and write the prime factorization.  
2. Use the ladder method on 210 and count the exponent of 3 in the result.  
3. Without computing the full factorization, explain why 91 cannot be a prime power.  
4. A student claims that 36 = 4 × 9 = 2 × 2 × 3 × 3; another writes 36 = 6 × 6 = 2 × 3 × 2 × 3. Are both lists correct? Why?  
5. Prove that any integer greater than 1 that is not divisible by any prime less than or equal to its square root must itself be prime.