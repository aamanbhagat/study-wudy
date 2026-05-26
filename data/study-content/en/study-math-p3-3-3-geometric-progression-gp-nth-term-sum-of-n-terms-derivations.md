## 1. The one-sentence answer
**A geometric progression is a sequence in which every term after the first is obtained by multiplying the preceding term by a fixed constant called the common ratio.**

The structure follows directly from repeated multiplication. Start with any nonzero first term \(a\). Choose any fixed multiplier \(r\). The second term must then be \(a \times r\), the third term \(a \times r \times r\), and so on. After \(n-1\) multiplications the \(n\)th term stands at \(a r^{n-1}\).  

The sum of the first \(n\) terms is obtained by writing the sum explicitly, multiplying the entire sum by \(r\), and subtracting the two equations; all intermediate terms cancel, leaving a closed-form expression involving only \(a\), \(r\), and \(n\).

> [!NOTE]
> The single algebraic move of subtracting the shifted sum from the original sum is the same cancellation trick that produces every closed-form sum in the subject; once seen clearly it applies to arithmetic series, telescoping series, and many generating-function identities.

## 2. Why this matters — concrete and current
Compound-interest calculations at every major bank rely on the geometric-sum formula; a 30-year mortgage amortisation schedule at JPMorgan Chase is exactly a finite geometric series with ratio equal to the monthly interest factor.  

Radioactive-decay chains in nuclear engineering (e.g., the CANDU reactor fuel-cycle models published by Atomic Energy of Canada) produce successive quantities of daughter isotopes whose masses form a geometric progression whose ratio is \(e^{-\lambda \Delta t}\).  

In machine-learning hardware, the NVIDIA Hopper GPU’s tensor-core scheduling uses geometric back-off timers for retry logic on memory transactions; the expected number of retries is given by the partial sum of a geometric series with ratio equal to the observed retry probability.  

Binary-search and segment-tree algorithms in competitive programming (used daily at Google Code Jam and AtCoder) traverse a geometric hierarchy whose node counts are successive powers of two; the total work per query is therefore the sum of a geometric series.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Exponent rules           | The \(n\)th term is literally \(a\) multiplied by \(r\) a total of \(n-1\) times |
| Algebraic rearrangement  | Deriving the sum formula requires subtracting two equations and factoring |
| Definition of sequence   | A GP is a special case of a sequence; the index \(n\) must be a positive integer |

## 4. Building the idea — from intuition to formalism

### Step 1 — Constant multiplicative growth
Any sequence whose terms grow or shrink by the same factor at every step is geometric.  
Example: 3, 6, 12, 24, … multiplies by 2 each time.  
Formal statement: there exists a constant \(r\) such that \(a_{k+1}=r a_k\) for every \(k\).  
> [!WARNING]
> If the multiplier changes even once, the sequence is no longer geometric and the later formulas fail.

### Step 2 — Explicit formula for the nth term
Write the first term, then multiply by \(r\) repeatedly:  
\(a_1=a\),  
\(a_2=a r\),  
\(a_3=a r\cdot r=a r^2\),  
…  
\(a_n=a r^{n-1}\).  
> [!WARNING]
> Off-by-one errors appear when students write \(a r^n\) instead of \(a r^{n-1}\); always count the number of multiplications.

### Step 3 — Write the partial sum
Let \(S_n=a+ar+ar^2+\dots+ar^{n-1}\).  
This is the object whose closed form we seek.

### Step 4 — Shift the sum by one place
Multiply every term by \(r\):  
\(r S_n=ar+ar^2+\dots+ar^n\).

### Step 5 — Subtract the two equations
\(S_n-r S_n=a-ar^n\).  
All middle terms cancel.  
Factor: \(S_n(1-r)=a(1-r^n)\).

### Step 6 — Solve for the sum
Provided \(r\neq 1\),  
\(S_n=\frac{a(1-r^n)}{1-r}\).  
(The case \(r=1\) is handled separately: every term equals \(a\), so \(S_n=na\).)

### Step 7 — Textbook statement reached
The two formulas above, together with the explicit \(n\)th-term expression, constitute the complete elementary theory of finite geometric progressions.

## 5. Worked examples — every step shown

**Example 1 — Direct nth term**  
*Given:* First term 5, common ratio −3, find the 7th term.  
*Find:* \(a_7\).  
\(a_7=5\times(-3)^{7-1}=5\times(-3)^6\).  
*Why:* Apply the explicit formula derived in Step 2.  
\(5\times729=3645\).  
**3645**

*Reflection:* The sign is positive because the exponent 6 is even; always reduce the exponent first.

**Example 2 — Finite sum, ratio >1**  
*Given:* 2, 6, 18, … up to 6 terms.  
*Find:* \(S_6\).  
\(a=2\), \(r=3\), \(n=6\).  
\(S_6=2\frac{3^6-1}{3-1}=2\frac{729-1}{2}=2\times364=728\).  
*Why:* Substitute directly into the formula from Step 6.  
**728**

*Reflection:* The formula works for any \(r\neq1\); here the rapid growth is captured by the large power of 3.

**Example 3 — Ratio between 0 and 1**  
*Given:* 8, 4, 2, …, 8 terms.  
*Find:* \(S_8\).  
\(a=8\), \(r=\frac12\), \(n=8\).  
\(S_8=8\frac{1-(\frac12)^8}{1-\frac12}=8\frac{1-\frac1{256}}{\frac12}=8\times2\times\frac{255}{256}= \frac{255}{16}\).  
*Why:* Algebraic simplification after substitution.  
**\(\frac{255}{16}\)**

*Reflection:* The sum remains finite and less than twice the first term, illustrating convergence behaviour even for finite n.

**Example 4 — Degenerate case r=1**  
*Given:* 7, 7, 7, …, 10 terms.  
*Find:* \(S_{10}\).  
Every term equals 7, therefore \(S_{10}=10\times7=70\).  
*Why:* The general formula is undefined; fall back to the definition.  
**70**

*Reflection:* Always test whether r equals 1 before invoking the fractional formula.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                                      |
|-----------------------------|---------------------------------------------|------------------------------------------------------|
| Using \(ar^n\) for the nth term | Counting multiplications from zero instead of one | Write the first four terms explicitly each time     |
| Dividing by zero when r=1   | Forgetting to check the special case        | Test r=1 before substituting into the closed form   |
| Sign error with negative r  | Losing track of even/odd exponents          | Reduce the exponent modulo 2 before multiplying     |
| Confusing a_n with S_n      | Mixing the sequence term with its partial sum | Label every quantity with its symbol at every step  |
| Applying infinite-sum formula to finite n | Premature use of limit                      | Keep n explicit until the last line                 |
| Forgetting a may be negative| Assuming all geometric sequences increase   | Treat a as any nonzero real number from the outset  |
| Index off-by-one in sums    | Starting the sum at ar instead of a         | Write S_n = a + ar + … + ar^{n−1} before shifting   |

## 7. The textbook-precise statement
Let \(a\neq0\) and let \(r\) be any real number. The sequence defined by \(a_n=a r^{n-1}\) for positive integers \(n\) is called a geometric progression with first term \(a\) and common ratio \(r\). Its partial sum is  
\[
S_n=\sum_{k=0}^{n-1}a r^k=
\begin{cases}
na & \text{if }r=1,\\
a\frac{1-r^n}{1-r} & \text{if }r\neq1.
\end{cases}
\]
(Stewart, *Calculus*, 9e, §11.2, Theorem 3.)

## 8. Visual — diagram or schematic
```text
Index:   1      2      3      4      ...     n
Terms:   a  ──► ar ──► ar² ──► ar³ ──► ... ──► ar^{n-1}
          │      │      │      │               │
Multiply   │      │      │      │               │
by r each step
```
Each arrow represents multiplication by the fixed constant \(r\). The vertical positions are irrelevant; only the successive scaling matters.

## 9. The memory technique
1. **The hook** — Picture a single bacterium that doubles every hour: after n hours you have exactly \(a\cdot2^{n-1}\) bacteria; the same picture scales to any ratio r.  
2. **What to overlearn** — \(a_n=ar^{n-1}\) and \(S_n=a\frac{1-r^n}{1-r}\) (r≠1).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the sum by writing S_n, forming r S_n, subtracting, and solving; the algebra is four lines.

## 10. What this unlocks
Mastery of finite geometric sums is the direct gateway to infinite series, power-series expansions, and generating functions.  

- Convergence tests for infinite geometric series  
- Taylor series for exponential and trigonometric functions  
- Z-transforms in discrete signal processing  
- Expected-value calculations in geometric distributions (probability)  
- Amortisation schedules and net-present-value formulas in finance

## 11. Self-check — five questions, no answers
1. Write the 12th term of the GP whose first term is −2 and whose common ratio is 5.  
2. Find the sum of the first 9 terms of 1, ½, ¼, … .  
3. A GP has third term 12 and sixth term 96. Determine the first term and the common ratio.  
4. Explain why the formula \(S_n=a\frac{r^n-1}{r-1}\) yields the same numerical value as \(S_n=a\frac{1-r^n}{1-r}\) whenever r≠1.  
5. Construct a counter-example showing that a sequence whose consecutive ratios are not constant cannot be summed by the geometric formula.