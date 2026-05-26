## 1. The one-sentence answer
**Combinations count unordered selections of k items from n, given by the binomial coefficient C(n,k) = n! / (k!(n-k)!), and these coefficients appear exactly as the entries in Pascal's triangle.**

A selection is unordered when only the identity of the chosen items matters, not the sequence in which they were picked. The factorial expression arises because the n! permutations of n items overcount each unordered group by the k! internal arrangements of the chosen subset and the (n-k)! arrangements of the remainder.  

Pascal's triangle encodes the same numbers through a simple additive rule: each interior entry equals the sum of the two entries directly above it. This rule mirrors the fact that any selection of k items from n either includes a particular distinguished item or excludes it, producing the recurrence C(n,k) = C(n-1,k-1) + C(n-1,k).

> [!NOTE]
> The single deepest insight is that the additive recurrence of Pascal's triangle is not a coincidence; it is the direct combinatorial translation of the logical partition "chosen or not chosen," which simultaneously generates every binomial coefficient and every row of the triangle.

## 2. Why this matters — concrete and current
Lottery designers at state gaming commissions use C(49,6) to compute jackpot odds for games such as Powerball; the exact figure 13 983 816 determines both prize pools and regulatory payout tables published each year.  

In semiconductor yield analysis, Intel and TSMC apply binomial models C(n,k) p^k (1-p)^{n-k} to forecast how many dies on a wafer will contain exactly k defects; these forecasts set the statistical process-control limits visible in every quarterly earnings report.  

Genome-wide association studies at the Broad Institute enumerate C(10^6, 5) candidate SNP subsets when searching for epistatic interactions; the combinatorial count dictates the multiple-testing correction factor applied before any variant is declared significant.  

Cryptographic key-agreement protocols in TLS 1.3 rely on the hardness of finding a specific k-subset among C(2^256, k) possibilities when elliptic-curve points are treated as elements of a large combinatorial space; this count underpins the concrete security levels published in NIST SP 800-56C.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Factorial n!         | Supplies the total ordered arrangements before correction |
| Multiplication principle | Justifies why n! counts all permutations of n distinct objects |
| Basic set notation   | Distinguishes the collection of items from any ordering of them |

## 4. Building the idea — from intuition to formalism

### Step 1 — Distinguishing order from selection
When items are distinct but the order of picking does not matter, many different sequences represent the same group. For three people A, B, C, the sequences ABC, ACB, BAC, BCA, CAB, CBA all describe the identical trio; therefore six ordered lists collapse to one unordered selection.

### Step 2 — Counting ordered selections first
The number of ways to choose k items in sequence from n is the falling factorial n(n-1)…(n-k+1). This expression simply multiplies the shrinking pool of remaining choices at each position.

### Step 3 — Removing the internal ordering of each selection
Every unordered group of k items corresponds to exactly k! different sequences. Dividing the ordered count by k! therefore yields the number of distinct groups:
$$
C(n,k)=\frac{n(n-1)\cdots(n-k+1)}{k!}.
$$

> [!WARNING]
> Forgetting to divide by k! produces permutations instead of combinations and overcounts by a factor of k!.

### Step 4 — Writing the symmetric factorial form
Multiplying numerator and denominator by (n-k)! converts the falling-factorial expression into the familiar ratio of three factorials:
$$
C(n,k)=\frac{n!}{k!(n-k)!}.
$$

### Step 5 — Deriving the additive recurrence
Any k-subset of an n-set either contains a distinguished element x or it does not. The subsets containing x are formed by adjoining x to a (k-1)-subset of the remaining n-1 elements; the subsets excluding x are simply the k-subsets of those n-1 elements. Hence
$$
C(n,k)=C(n-1,k-1)+C(n-1,k).
$$

### Step 6 — Generating Pascal's triangle
The recurrence, together with the boundary conditions C(n,0)=1 and C(n,n)=1, produces every row of Pascal's triangle by adding adjacent entries from the row above. Row n therefore contains exactly the values C(n,0), C(n,1), …, C(n,n).

### Step 7 — Reaching the binomial theorem
The same coefficients appear as the multipliers in the expansion
$$
(x+y)^n=\sum_{k=0}^n C(n,k)x^{n-k}y^k,
$$
confirming that the combinatorial object and the algebraic object are identical.

## 5. Worked examples — every step shown

**Example 1 — Selecting a committee**  
*Given:* A club has 7 members; 3 will serve on a committee.  
*Find:* Number of possible committees.  

C(7,3) = 7! / (3!·4!).  
First compute 7! = 5040.  
Then 3! = 6 and 4! = 24, so 3!·4! = 144.  
5040 / 144 = 35.  
**35**  

*Reflection:* The only arithmetic hazard is misidentifying which factorials belong in the denominator; the formula itself supplies the correct placement.

**Example 2 — Lottery ticket**  
*Given:* Choose 5 numbers from 1 to 40.  
*Find:* Number of distinct tickets.  

C(40,5) = 40! / (5!·35!).  
40×39×38×37×36 / 120 = 658008.  
**658008**  

*Reflection:* Direct sequential multiplication avoids computing enormous intermediate factorials.

**Example 3 — Pascal recurrence verification**  
*Given:* Compute C(6,3) using only the recurrence and known smaller values.  
*Find:* The numerical result.  

C(5,2) = 10, C(5,3) = 10.  
10 + 10 = 20.  
**20**  

*Reflection:* The recurrence lets one build any entry without factorials once boundary rows are known.

**Example 4 — Symmetry identity**  
*Given:* Prove C(10,3) = C(10,7).  
*Find:* Both values.  

C(10,3) = 120.  
C(10,7) = C(10,3) by the identity C(n,k) = C(n,n-k).  
**120**  

*Reflection:* The identity follows at once from writing both factorials; it is not an extra rule to memorize.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using P(n,k) instead of C(n,k) | Confusing order with selection             | Always ask whether the problem statement cares about sequence |
| Forgetting k = 0 or k = n cases | Boundary values feel “trivial”              | Insert the conventions C(n,0) = C(n,n) = 1 before any calculation |
| Computing n! for large n directly | Overflow or wasted effort                   | Cancel factors before multiplying            |
| Treating identical objects as distinct | Overlooking that some items are indistinguishable | Reduce the problem to distinct labels first  |
| Misreading “at least k” as exactly k | Linguistic ambiguity                        | Translate the phrase into a sum of C(n,i) terms |
| Assuming C(n,k) = C(m,l) whenever n = m | Ignoring the second index                   | Always verify both parameters match          |
| Division by zero when k > n | Formula applied outside its domain          | Check k ≤ n before invoking the expression   |

## 7. The textbook-precise statement
A combination of k elements from an n-element set is any k-element subset; its cardinality is
$$
\binom{n}{k}=\frac{n!}{k!(n-k)!}
$$
for integers n ≥ k ≥ 0, and 0 otherwise. The numbers satisfy the recurrence
$$
\binom{n}{k}=\binom{n-1}{k-1}+\binom{n-1}{k}
$$
with boundary conditions \(\binom{n}{0}=\binom{n}{n}=1\). These are precisely the entries of Pascal’s triangle. (Rosen, *Discrete Mathematics and its Applications*, 8e, §6.3.)

## 8. Visual — diagram or schematic
```text
Row 0:           1
Row 1:         1   1
Row 2:       1   2   1
Row 3:     1   3   3   1
Row 4:   1   4   6   4   1
Row 5: 1   5  10  10   5   1
```
Each interior entry is the sum of the two entries touching it from the row above; the leftmost and rightmost entries are always 1. The entry in row n, position k (0-based) equals C(n,k).

## 9. The memory technique

1. **The hook** — Picture a mountain of numbered balls rolling downward; each ball splits left or right at every junction exactly as the recurrence splits a subset into “with” or “without” a given element. The final count of paths to each bin is C(n,k).

2. **What to overlearn** — The closed formula, the recurrence, and the two boundary identities C(n,0) = C(n,n) = 1.

3. **Spaced-repetition schedule** — Review the three identities at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

4. **First-principles fallback** — Re-derive the formula by counting ordered tuples and dividing by k!, or rebuild any row of Pascal’s triangle from the additive rule starting from the two 1’s.

## 10. What this unlocks
Mastery of combinations supplies the counting engine for the binomial distribution, the binomial theorem, and all later work on generating functions.  

- Binomial theorem and its generalizations  
- Binomial probability mass function  
- Inclusion-exclusion principle  
- Stars-and-bars theorem for non-negative integer solutions  
- Generating functions in enumerative combinatorics  

## 11. Self-check — five questions, no answers
1. Compute C(9,4) both by the factorial formula and by two successive applications of the recurrence; verify the results agree.  
2. A bag contains 12 distinct marbles. How many ways exist to choose 7 of them? How many ways exist to choose 5? What identity explains the equality?  
3. In Pascal’s triangle, locate the entry C(8,3). Which two entries in row 7 produce it?  
4. Explain why C(5,2) = 10 while P(5,2) = 20; state the precise overcount factor.  
5. A multiple-choice test has 10 questions, each with 4 options. If a student must select exactly 3 questions to answer “true” and the rest “false,” how many distinct answer sheets are possible? Which combinatorial object counts them?