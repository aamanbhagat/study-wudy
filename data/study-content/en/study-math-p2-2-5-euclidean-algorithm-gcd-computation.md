## 1. The one-sentence answer
**The Euclidean algorithm computes the greatest common divisor of two nonnegative integers by repeated replacement of the pair (a, b) with (b, a mod b) until the remainder is zero.**

This process rests on a single invariance: the set of common divisors of a and b is identical to the set of common divisors of b and a mod b. Consequently the greatest element of that set—the GCD—remains unchanged at every step. The algorithm terminates because the nonnegative remainders form a strictly decreasing sequence of integers and must therefore reach zero after finitely many steps.

When the remainder finally becomes zero, the last nonzero remainder is the GCD. No prime factorizations or exhaustive search are required; only ordinary division is used.

> [!NOTE]
> The single decisive insight is that GCD(a, b) = GCD(b, a mod b) for any a ≥ b ≥ 0; everything else is bookkeeping that follows from this equality.

## 2. Why this matters — concrete and current
Modern RSA hardware accelerators inside smart cards and TPM chips invoke the Euclidean algorithm billions of times per day to test candidate primes for coprimality during key generation; a single faulty GCD computation can leak an entire private key via the Fermat factoring attack.

In semiconductor mask design, layout tools from Synopsys and Cadence repeatedly apply the algorithm to reduce fractions that describe polygon coordinates, guaranteeing that all vertices lie on the manufacturing grid while preserving exact 45-degree angles.

Satellite navigation receivers (GPS, Galileo) simplify the ratios of carrier frequencies and code rates on the fly; the Euclidean algorithm guarantees that the reduced fractions remain exact even when the receiver’s internal clock drifts by several parts per million.

In algebraic number theory packages such as PARI/GP and SageMath, the Euclidean algorithm is the inner loop of the subresultant PRS used to compute polynomial GCDs; every Gröbner-basis calculation ultimately rests on it.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Division algorithm       | Guarantees that for any integers a ≥ b > 0 there exist unique q, r with a = qb + r and 0 ≤ r < b |
| Nonnegative integers     | The sequence of remainders is strictly decreasing inside ℕ₀ and must terminate |
| Basic function notation  | The algorithm is expressed as a recurrence on pairs       |

## 4. Building the idea — from intuition to formalism

### Step 1 — The invariance of common divisors
Any common divisor of a and b also divides any integer linear combination of a and b, in particular a − qb.  
Example: 48 and 18 share the common divisors 1, 2, 3, 6; the same numbers divide 48 − 2·18 = 12.  
Formal statement:  
$$
d \mid a \;\text{and}\; d \mid b \quad\implies\quad d \mid (a - qb).
$$
> [!WARNING]
> Omitting the direction “any common divisor of a and b divides the remainder” produces an incomplete proof that the GCD is unchanged.

### Step 2 — Reduction of size
Because the new second argument r satisfies r < b, the problem instance shrinks.  
Example: replacing (48, 18) by (18, 12) reduces the larger number from 48 to 18.  
Formal statement:  
$$
0 \le r < b \quad\implies\quad \max(b, r) < \max(a, b).
$$

### Step 3 — The base case
When the remainder is zero the second argument is already a divisor of the first, so it is the GCD.  
Example: GCD(12, 0) = 12.  
Formal statement:  
$$
\text{GCD}(a, 0) = a \quad (a \ge 0).
$$

### Step 4 — Recursive formulation
Combining the previous steps yields the recurrence  
$$
\text{GCD}(a, b) = 
\begin{cases}
a & \text{if } b = 0, \\
\text{GCD}(b, a \bmod b) & \text{otherwise}.
\end{cases}
$$

### Step 5 — Termination
Each recursive call receives a strictly smaller nonnegative second argument; an infinite descent inside ℕ₀ is impossible, so the process halts after at most b steps.

### Step 6 — Textbook statement
The Euclidean algorithm, applied to any pair of nonnegative integers a ≥ b, returns their greatest common divisor in a finite number of division steps.

## 5. Worked examples — every step shown

**Example 1 — Two-digit numbers**  
*Given:* a = 48, b = 18  
*Find:* GCD(48, 18)  

48 = 2·18 + 12  *Why:* integer division with remainder < divisor  
18 = 1·12 + 6  *Why:* repeat with new pair (18, 12)  
12 = 2·6 + 0  *Why:* remainder zero terminates the process  
**GCD = 6**

*Reflection:* The remainders 12, 6, 0 form a descending chain whose length is already small; the pattern scales unchanged to larger inputs.

**Example 2 — Coprime pair**  
*Given:* a = 35, b = 24  
*Find:* GCD(35, 24)  

35 = 1·24 + 11  
24 = 2·11 + 2  
11 = 5·2 + 1  
2 = 2·1 + 0  
**GCD = 1**

*Reflection:* The algorithm correctly reports coprimality without ever listing factors.

**Example 3 — One argument is a multiple**  
*Given:* a = 100, b = 25  
*Find:* GCD(100, 25)  

100 = 4·25 + 0  
**GCD = 25**

*Reflection:* A single step suffices; the test b | a is automatically handled.

**Example 4 — Large Fibonacci numbers**  
*Given:* a = 987, b = 610  
*Find:* GCD(987, 610)  

987 = 1·610 + 377  
610 = 1·377 + 233  
377 = 1·233 + 144  
233 = 1·144 + 89  
144 = 1·89 + 55  
89 = 1·55 + 34  
55 = 1·34 + 21  
34 = 1·21 + 13  
21 = 1·13 + 8  
13 = 1·8 + 5  
8 = 1·5 + 3  
5 = 1·3 + 2  
3 = 1·2 + 1  
2 = 2·1 + 0  
**GCD = 1**

*Reflection:* The worst-case number of steps occurs precisely on consecutive Fibonacci numbers; the length is linear in the smaller input.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------|------------------------------------------------------|
| Swapping a and b without updating | Habit from subtraction-based version          | Always replace the pair simultaneously               |
| Using negative remainders         | Language implementations allow r < 0          | Enforce 0 ≤ r < b by adding the modulus when needed  |
| Forgetting GCD(a,0) = a           | Edge case feels artificial                    | Treat b = 0 as immediate return of a                 |
| Assuming inputs are positive      | Algorithm works for zero but not negatives    | Reduce signs first: GCD(|a|,|b|)                     |
| Counting steps instead of remainders | Confuses complexity analysis with correctness | Track only that remainders strictly decrease         |
| Applying to non-integers          | Real-number division never yields zero remainder | Restrict domain to ℤ explicitly                      |
| Overwriting variables in code     | In-place update destroys original values      | Use three variables or recursion                     |

## 7. The textbook-precise statement
Let a, b be nonnegative integers with a ≥ b. The Euclidean algorithm is the finite sequence of divisions  
$$
a = q_1 b + r_1, \quad b = q_2 r_1 + r_2, \quad \dots, \quad r_{k-2} = q_k r_{k-1} + 0
$$  
where each remainder satisfies 0 ≤ r_{i+1} < r_i. The last nonzero remainder r_{k-1} equals gcd(a, b).  
(Cormen et al., *Introduction to Algorithms*, 4e, §31.2, Theorem 31.2.)

## 8. Visual — diagram or schematic
```text
Initial pair: (a, b)          a ≥ b ≥ 0
          │
          ▼
   while b ≠ 0
          │
          ▼
   replace (a, b) ← (b, a mod b)     // remainder strictly smaller
          │
          ▼
   return a                          // now b = 0
```
The diagram is a linear chain; each iteration shortens the second coordinate until it hits the terminal condition b = 0.

## 9. The memory technique
1. **The hook** — Picture two lengths of rope; you repeatedly cut the longer rope using the shorter one as a measure until nothing is left; the final uncut length is the GCD.  
2. **What to overlearn** — The single identity GCD(a, b) = GCD(b, a mod b) and the base case GCD(a, 0) = a.  
3. **Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the invariance from the definition of divisibility: any common divisor of a and b divides a − qb, hence divides the remainder.

## 10. What this unlocks
The Euclidean algorithm is the gateway to the extended Euclidean algorithm, Bézout coefficients, modular inverses, and the entire theory of linear Diophantine equations. It also supplies the inner loop for the Chinese Remainder Theorem constructions and for fast primality testing via Miller–Rabin witnesses.

- Extended Euclidean algorithm  
- Bézout’s identity  
- Modular multiplicative inverses  
- RSA encryption primitives  
- Polynomial GCD over fields  

## 11. Self-check — five questions, no answers
1. Compute GCD(2024, 748) by exhibiting every remainder.  
2. Prove that the Euclidean algorithm applied to consecutive Fibonacci numbers F_{n+1} and F_n requires exactly n − 1 division steps.  
3. Show that if d = GCD(a, b) then the algorithm never produces a remainder smaller than d before termination.  
4. Identify the flaw in the claim “the algorithm always terminates in at most log₂(max(a, b)) steps.”  
5. Given only the sequence of quotients produced by the algorithm on a pair (a, b), reconstruct the original pair up to order.