## 1. The one-sentence answer
**The general term isolates any chosen power in the expansion of (a + b)^n without writing the entire sum.**

The binomial theorem expands (a + b)^n into a sum of n + 1 terms whose powers of b run from 0 to n. Each term is built from three factors: a combinatorial coefficient that counts ways to choose the power of b, the remaining power of a, and the chosen power of b. Once these three pieces are assembled into a single expression indexed by an integer r, any desired term can be read off by substituting the correct r.

This expression is called the general term because it works for every admissible r. It converts an apparently global summation into a local lookup, exactly as the formula for the nth term of an arithmetic sequence replaces the need to list every preceding entry.

> [!NOTE]
> The index on the general term is conventionally shifted by one (T_{r+1}) so that the first term corresponds to r = 0; forgetting the shift is the single most common source of off-by-one errors.

## 2. Why this matters — concrete and current
In semiconductor yield modelling, Intel and TSMC use the binomial expansion to compute the probability of exactly k defective dies on a wafer; the general term supplies the coefficient of x^k directly, avoiding summation over thousands of terms when only one defect count is required.

NASA’s orbital perturbation software expands (1 + ε)^n where ε encodes small eccentricity; the term containing ε^3 gives the leading correction to Keplerian period and is extracted via the general term rather than recomputing the full series at every time step.

In machine-learning regularisation, the binomial theorem appears inside the moment-generating function of the L2 penalty; gradient-descent implementations isolate the linear term in the weight vector by setting r = 1 in the general term, which accelerates convergence checks without expanding the entire regulariser.

Particle physicists at CERN extract the coefficient of s^2 in the expansion of the scattering amplitude (1 – t/M^2)^–1; the general term yields that coefficient in closed form, feeding directly into Monte-Carlo event generators.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Binomial theorem for positive integer n | Supplies the overall sum that the general term dissects   |
| Factorial and binomial coefficient C(n,r) | Forms the numerical prefactor of every term               |
| Laws of exponents        | Determines how powers of a and b combine when r changes   |
| Sigma notation           | Lets us write the full expansion before isolating one summand |

## 4. Building the idea — from intuition to formalism

### Step 1 — Every term arises from choosing b exactly r times
When multiplying n factors of (a + b), each term is produced by selecting either a or b from each factor. Selecting b exactly r times yields the power b^r multiplied by a^{n-r}.  
Example: in (a + b)^3 the selection b·b·a produces a b^2.  
The number of distinct selections is C(n,r).  
$$T_{r+1} = \binom{n}{r} a^{n-r} b^r$$  
> [!WARNING]
> Treating the combinatorial factor as optional produces coefficients that are too small by a factor of n! / (r!(n-r)!).

### Step 2 — The index r runs from 0 to n
r counts the power of b, so the lowest power is b^0 (r = 0) and the highest is b^n (r = n).  
Example: (x + 1)^4 contains terms up to x^0 and down to x^4.  
No term exists for r > n or r < 0 inside a finite expansion.  
> [!WARNING]
> Substituting r = n + 1 yields a binomial coefficient that is formally zero, yet the algebraic expression still “exists” and can mislead if not checked against the domain.

### Step 3 — The general term is obtained by replacing the summation index
The full expansion is  
$$\sum_{r=0}^{n} \binom{n}{r} a^{n-r} b^r.$$  
Removing the summation sign and retaining the summand gives the general term.  
> [!WARNING]
> Confusing the summation variable with the fixed exponent requested (for instance, asking for “the x^5 term” while leaving r free) leaves the answer as an expression instead of a number or monomial.

### Step 4 — Shift the subscript to label the term position
Because r starts at 0, the (r + 1)th term in the written sequence is the one containing b^r.  
Hence the notation T_{r+1}.  
> [!WARNING]
> Using T_r instead of T_{r+1} shifts every answer by one position; many examination mark schemes penalise this single indexing error even when the algebra is correct.

### Step 5 — Special cases follow by solving for r
To locate the term independent of a variable x, set the total exponent of x to zero and solve for r; the same equation yields the coefficient of any requested power.  
This is the textbook statement of the method.

## 5. Worked examples — every step shown

**Example 1 — Constant term in (2x – 1/x^2)^6**  
*Given:* (2x – 1/x^2)^6.  
*Find:* the term independent of x.  
Write the general term:  
T_{r+1} = C(6,r) (2x)^{6-r} (–1/x^2)^r.  
*Why:* direct substitution of a = 2x, b = –1/x^2, n = 6.  
Simplify the powers of x:  
(2x)^{6-r} · (–1)^r · x^{-2r} = 2^{6-r} (–1)^r x^{6-r-2r}.  
*Why:* product rule for exponents.  
Set the exponent of x to zero: 6 – 3r = 0 ⇒ r = 2.  
*Why:* isolates the constant term.  
Substitute r = 2:  
T_3 = C(6,2) 2^{4} (–1)^2 = 15 · 16 · 1 = 240.  
**240**  
*Reflection:* the exponent equation 6 – 3r = 0 is the only non-routine step; once solved, substitution is mechanical.

**Example 2 — Coefficient of x^7 in (3 + 2x)^12**  
*Given:* (3 + 2x)^12.  
*Find:* coefficient of x^7.  
General term: T_{r+1} = C(12,r) 3^{12-r} (2x)^r.  
*Why:* a = 3, b = 2x.  
Power of x is r; set r = 7.  
Coefficient = C(12,7) 3^5 2^7.  
*Why:* 3^{12-7} supplies the constant factor.  
Compute: C(12,7) = 792, 3^5 = 243, 2^7 = 128.  
792 · 243 · 128 = 24 661 248.  
**24661248**  
*Reflection:* when the variable appears only in b, the required power directly equals r.

**Example 3 — Fourth term in (x^2 – 3y)^9**  
*Given:* (x^2 – 3y)^9.  
*Find:* the fourth term.  
T_{r+1} with r = 3 (fourth term).  
T_4 = C(9,3) (x^2)^{6} (–3y)^3.  
*Why:* r = 3 gives the fourth position.  
= 84 · x^{12} · (–27 y^3) = –2268 x^{12} y^3.  
**-2268 x^{12} y^3**  
*Reflection:* the sign is carried by (–3)^3; forgetting the negative base is a frequent slip.

**Example 4 — Term containing x^4 y^5 in (x + y)^n with n unknown**  
*Given:* (x + y)^n, term x^4 y^5.  
*Find:* the term and the implied value of n.  
General term: C(n,r) x^{n-r} y^r.  
Set n – r = 4 and r = 5 ⇒ n = 9.  
Term = C(9,5) x^4 y^5.  
**126 x^4 y^5**  
*Reflection:* two equations in two unknowns (n and r) must be solved simultaneously; the binomial coefficient is then evaluated at the discovered n.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Off-by-one indexing (T_r vs T_{r+1}) | Counting starts at r = 0 but position starts at 1 | Always verify: first term ⇒ r = 0            |
| Treating r as the term number     | Linguistic confusion between “rth term” and “term number r” | Use subscript r + 1 explicitly               |
| Forgetting the sign when b is negative | Binomial coefficient is positive; sign lives in b^r | Factor (–1)^r separately before substituting |
| Solving exponent equation for wrong variable | Misidentifying which factor carries the variable | Label a and b clearly before writing T_{r+1} |
| Using C(n,r) when r > n           | Formula defined for all integers yet equals zero outside domain | Check 0 ≤ r ≤ n immediately after solving for r |
| Confusing coefficient with the whole term | Request asks only for numerical factor | State whether the answer should include the variables |
| Arithmetic slip in C(n,r) for large n | Factorials grow quickly                     | Compute via successive multiplication: C(n,r) = C(n,r–1) · (n–r+1)/r |

## 7. The textbook-precise statement
Let n be a positive integer and let a, b be real (or complex) numbers. The binomial expansion of (a + b)^n is  
$$\sum_{r=0}^{n} \binom{n}{r} a^{n-r} b^r.$$  
The general term containing b^r is  
$$T_{r+1} = \binom{n}{r} a^{n-r} b^r, \quad r = 0,1,\dots,n.$$  
Any specific term is obtained by solving the appropriate linear Diophantine equation for r and substituting. (See Stewart, *Calculus*, 9e, §3.4, Theorem 3.)

## 8. Visual — diagram or schematic
```text
(a + b)^n
   ├── r = 0 :  a^n               (T1)
   ├── r = 1 :  n a^{n-1} b       (T2)
   ├── r = 2 :  C(n,2) a^{n-2} b^2 (T3)
   ⋮
   └── r = k :  C(n,k) a^{n-k} b^k (T_{k+1})  ← requested term
```
The diagram shows the single summand selected by fixing r = k; all other summands are discarded.

## 9. The memory technique
**The hook** — picture a bookshelf with n books; each term is the height of the stack after you have pulled exactly r red books (b) and left the rest blue (a). The label on the (r + 1)th shelf is T_{r+1}.

**What to overlearn**  
- T_{r+1} = C(n,r) a^{n-r} b^r  
- r runs from 0 to n inclusive  
- Exponent of the variable inside b equals r

**Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — start from the definition (a + b) multiplied by itself n times, count the ways to obtain b^r, then attach the powers.

## 10. What this unlocks
Mastery of the general term converts the binomial theorem from a global identity into a precision instrument for coefficient extraction, which is required for Taylor series truncation, probability mass functions, and generating-function manipulations.

- Binomial series for |x| < 1  
- Multinomial theorem  
- Negative and fractional exponents  
- Generating functions in combinatorics  
- Discrete probability distributions

## 11. Self-check — five questions, no answers
1. Write the general term for (3x – 2)^7 and state which value of r gives the term in x^4.  
2. Find the constant term in (x – 2/x)^8.  
3. Determine the coefficient of y^3 in the expansion of (2 + y^2)^9.  
4. In (a + b)^n the term containing a^5 b^3 appears; what is n and which term number is it?  
5. A student claims the fifth term of (1 + x)^10 is C(10,5) x^5. Identify the indexing error and give the correct expression.