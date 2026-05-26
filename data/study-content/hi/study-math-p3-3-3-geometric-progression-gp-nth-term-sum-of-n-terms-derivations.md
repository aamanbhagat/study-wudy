## 1. The one-sentence answer
**A geometric progression (GP) is a sequence where each term after the first is obtained by multiplying the previous term by a fixed constant called the common ratio.**

Aap is sequence ko a, ar, ar², ar³, … ke roop mein likh sakte hain, jahaan a pehla term hai aur r common ratio. Iska nth term seedha previous term se multiply karke nikal jaata hai, lekin derivation ke liye hum induction ya direct multiplication pattern use karte hain. Sum of first n terms ke liye ek clever trick lagti hai: S_n ko r se multiply karke subtract kar dete hain taaki telescoping ho jaaye.

Yeh structure isliye powerful hai kyunki har term ka ratio constant rehta hai, jo exponential growth ya decay model karta hai. Jab r > 1 hota hai toh terms jaldi badhte hain; jab |r| < 1 hota hai toh terms chhote hote jaate hain aur infinite sum bhi possible ho jaata hai.

> [!NOTE]
> The single deepest insight is that multiplying the entire sum by r and subtracting cancels all middle terms, leaving only the first and last term — this is the algebraic origin of the closed-form formula.

## 2. Why this matters — concrete and current
In compound interest calculations at banks and fintech firms such as Stripe and Razorpay, the balance after n periods follows a GP with r = 1 + interest rate; the closed-form sum gives exact future value without iterating each month.  
Satellite trajectory planning at ISRO and NASA uses GP models for velocity increments under constant thrust ratios; nth-term formulas predict position after n burns with minimal floating-point operations.  
In machine-learning hardware, NVIDIA’s tensor cores accumulate geometric-series decay factors when applying exponential moving averages to gradient statistics inside Adam and RMSProp optimisers.  
Population genetics models at the Broad Institute treat allele frequencies under constant selection pressure as GPs; the sum formula quickly estimates fixation probability after n generations.  
Semiconductor yield analysis at TSMC models defect clustering as a GP with r < 1; the partial-sum expression predicts how many wafers must be processed before cumulative good chips reach a target volume.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Sequence definition  | GP is a special sequence; you must know indexing starts at n = 1 |
| Exponent rules       | Powers of r appear in every term and in the sum formula   |
| Algebraic subtraction| The derivation of S_n relies on subtracting two shifted equations |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Recognise the constant-ratio pattern
Aap observe karte hain ki har term pehle term se ek fixed multiplier se banta hai.  
Example: 3, 6, 12, 24, … mein r = 2.  
Formal statement: a sequence {a_n} is a GP if a_{n+1}/a_n = r (constant) for all n ≥ 1.  
> [!WARNING]  
> Agar ratio sirf kuch terms ke beech constant dikhe lekin baad mein badle, toh pura derivation collapse ho jaayega.

### Step 2 — Write the general term by repeated multiplication
Pehla term a, dusra ar, teesra ar·r = ar², …  
Isliye nth term a_n = a r^{n-1}.  
> [!WARNING]  
> Miscounting the exponent (writing r^n instead of r^{n-1}) is the most common indexing error.

### Step 3 — Form the partial sum S_n
S_n = a + ar + ar² + … + ar^{n-1}.  
> [!WARNING]  
> Forgetting that the last term is ar^{n-1} (not ar^n) breaks the telescoping step.

### Step 4 — Multiply by r and subtract
r S_n = ar + ar² + … + ar^n.  
S_n − r S_n = a − ar^n.  
(1 − r) S_n = a(1 − r^n).  
Hence S_n = a(1 − r^n)/(1 − r) when r ≠ 1.

### Step 5 — Handle the r = 1 case separately
Jab r = 1, har term a ke barabar hota hai, isliye S_n = n a.  
Formal statement: S_n = a(1 − r^n)/(1 − r) for r ≠ 1, and S_n = n a when r = 1.

## 5. Worked examples — har step show karo

**Example 1 — Direct nth term**  
*Given:* a = 5, r = 3, n = 7.  
*Find:* a_7.  
a_7 = 5 · 3^{7-1} = 5 · 3^6 = 5 · 729 = 3645.  
*Why:* Exponent n−1 because first term already uses 3^0.  
**3645**

*Reflection:* Simple power evaluation; generalises to any integer n.

**Example 2 — Sum with r ≠ 1**  
*Given:* a = 2, r = −2, n = 5.  
*Find:* S_5.  
S_5 = 2(1 − (−2)^5)/(1 − (−2)) = 2(1 − (−32))/3 = 2(33)/3 = 22.  
*Why:* Formula directly applies; sign of r is handled by the power.  
**22**

*Reflection:* Negative ratio produces alternating signs; formula still holds.

**Example 3 — Infinite sum limit**  
*Given:* a = 8, r = 1/2.  
*Find:* lim n→∞ S_n.  
S_n = 8(1 − (1/2)^n)/(1 − 1/2) → 8/(0.5) = 16 as n → ∞.  
*Why:* |r| < 1 forces r^n → 0.  
**16**

*Reflection:* Convergence test |r| < 1 must be checked first.

**Example 4 — Mixed r = 1 case**  
*Given:* a = 7, r = 1, n = 10.  
*Find:* S_10.  
Because r = 1, S_10 = 10 · 7 = 70.  
*Why:* Formula with denominator zero is undefined, hence separate case.  
**70**

*Reflection:* Always test r = 1 before plugging into the general formula.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                           | How to avoid it                              |
|-----------------------------|------------------------------------------|----------------------------------------------|
| Writing a_n = a r^n         | Counting exponents from zero             | Always verify first term gives r^0 = 1       |
| Using S_n formula when r=1  | Denominator vanishes                     | Insert an explicit “if r ≠ 1” guard          |
| Sign error with negative r  | Odd/even powers flip sign                | Compute r^n separately before subtracting    |
| Off-by-one indexing         | Treating n=0 as first term               | Fix n=1 as first term in all derivations     |
| Forgetting parentheses      | Writing a(1−r^n)/1−r instead of a(1−r^n)/(1−r) | Keep denominator in parentheses            |
| Applying sum to infinite series without |r|<1 | Series diverges                              | Check |r|<1 before taking limit                 |

## 7. The textbook-precise statement
Let {a_n}_{n=1}^∞ be a sequence of real numbers. It is called a geometric progression with first term a and common ratio r if a_n = a r^{n−1} for every positive integer n. The sum of the first n terms is given by  
S_n = ∑_{k=0}^{n−1} a r^k = a (1 − r^n)/(1 − r) whenever r ≠ 1,  
and S_n = n a when r = 1.  
These identities appear in Stewart, *Calculus*, 9e, §11.2.

## 8. Visual — diagram or schematic
```
S_n   = a   +   a r   +   a r²   + … +   a r^{n-1}
r S_n =     a r   +   a r²   + … +   a r^{n-1}   +   a r^n
-------------------------------------------------------------
S_n − r S_n = a − a r^n
```

## 9. The memory technique
1. **The hook** — Picture a photocopier that enlarges every page by exactly factor r; each new page is the previous one scaled, so the stack of pages forms the GP.  
2. **What to overlearn** — a_n = a r^{n−1} and S_n = a(1−r^n)/(1−r) (r≠1).  
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from S_n = a + ar + … + ar^{n−1}, multiply by r, subtract; the derivation itself rebuilds the formula.

## 10. What this unlocks
Mastery of GP nth term and sum lets you move directly into infinite series convergence tests, compound-growth models, and discrete exponential functions.  
- Infinite geometric series sum a/(1−r) (|r|<1)  
- Ratio test for arbitrary series  
- Generating functions in combinatorics  
- Closed-form solutions for linear recurrence relations  

## 11. Self-check — five questions, no answers
1. Write the 12th term of 7, 14, 28, …  
2. Find S_9 for the GP with a = 1, r = −3.  
3. For which values of r does the infinite sum converge when a = 5?  
4. A GP has a_5 = 48 and a_3 = 12. Determine a and r.  
5. Why does the usual sum formula fail when r = 1, and what replaces it?