## 1. The one-sentence answer
**An infinite geometric series converges to the finite value \(a/(1-r)\) precisely when the common ratio satisfies \(|r|<1\).**

Aap already finite GP ka sum formula jaante honge: \(S_n = a\frac{1-r^n}{1-r}\). Jab aap isko infinite terms tak le jaate ho, toh sirf tabhi ek fixed number milta hai jab har next term pehle se chhota hota jaaye, matlab \(|r|<1\). Is condition mein \(r^n\) zero ki taraf jaata hai, isliye limit exist karta hai. Agar \(|r|\geq 1\) toh terms ya toh badhte jaate hain ya oscillate karte hain, aur sum kabhi settle nahi hota.

Yeh convergence ka idea sirf ek formula nahi hai; yeh batata hai ki kab ek endless process ka net result finite ho sakta hai. Proof mein aap limit ka use karte ho aur dikhaate ho ki remainder term zero ho jaata hai.

> [!NOTE]
> The single “aha” moment is this: convergence is not about how many terms you add, but whether the tail of the series becomes arbitrarily small. Once \(|r|<1\), every additional block of terms contributes less than any pre-chosen \(\epsilon>0\).

## 2. Why this matters — concrete and current
In compound-interest models used by fintech firms such as Stripe and Razorpay, perpetual payment streams (annuities) are valued by summing infinite GPs whose ratio is the discount factor \(1/(1+i)\); the closed form \(a/(1-r)\) directly gives present value without simulating millions of periods.

NASA’s orbital perturbation calculations for long-term satellite drag model exponential decay of velocity increments as an infinite GP with \(|r|<1\); the total velocity change is therefore finite and is used in fuel-budget planning for missions such as Artemis.

In digital-signal-processing chips from Qualcomm and MediaTek, the impulse response of a simple IIR filter is exactly an infinite GP; the condition \(|r|<1\) guarantees BIBO stability, which is verified at design time using the same limit argument.

In quantum optics, the coherent-state expansion of a laser field is an infinite GP in the photon-number basis; convergence of the norm is assured only when the amplitude parameter satisfies \(|\alpha|<1\) in the normalised units chosen by experimental groups at NIST.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Finite GP sum formula    | Starting point for taking the limit                       |
| Limit of a sequence      | To decide whether \(r^n\to 0\) as \(n\to\infty\)           |
| Absolute value inequalities | To translate “terms shrink” into the precise condition \(|r|<1\) |

Agar upar ke teen concepts mein se koi bhi weak hai, toh pehle unko revise kar lo; warna proof ke steps slippery lagenge.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the finite-sum formula
Aap jaante ho ki \(n\) terms wali GP ka sum \(S_n=a\frac{1-r^n}{1-r}\) hota hai (agar \(r\neq 1\)). Yeh closed form already proved hota hai finite case mein.

Example: \(a=2\), \(r=1/2\), \(n=3\) → \(S_3=2(1-(1/2)^3)/(1-1/2)=2(7/8)/(1/2)=3.5\).

Formal statement:  
$$S_n=a\frac{1-r^n}{1-r},\quad r\neq 1.$$

> [!WARNING]
> Agar aap yahan \(r=1\) ko alag case treat nahi karte, toh pura limit argument zero-denominator par atak jaayega.

### Step 2 — Take the limit as \(n\to\infty\)
Infinite sum define karte hain \(S=\lim_{n\to\infty}S_n\). Agar yeh limit exist karta hai toh series converge karti hai.

Formal statement:  
$$S=\lim_{n\to\infty}a\frac{1-r^n}{1-r}.$$

### Step 3 — Analyse the behaviour of \(r^n\)
Agar \(|r|<1\), toh \(r^n\to 0\) (proof: let \(|r|=1-\delta\), \(\delta>0\), binomial ya squeeze theorem se \(|r|^n\leq(1-\delta)^n\to 0\)).

Example: \(r=0.9\), \(0.9^{100}\approx 2.656\times10^{-5}\), practically zero.

Formal statement:  
$$\lim_{n\to\infty}r^n=0\quad\text{whenever }|r|<1.$$

> [!WARNING]
> Students aksar \(r>0\) assume kar lete hain; negative \(r\) ke liye bhi \(|r|<1\) kaafi hai, lekin oscillation hoti hai.

### Step 4 — Substitute the limit
Jab \(r^n\to 0\), \(S_n\) ka expression simplify ho jaata hai:  
$$S=a\frac{1-0}{1-r}=\frac{a}{1-r},\quad |r|<1.$$

### Step 5 — State the divergence cases
Agar \(|r|>1\), \(r^n\) unbounded, limit nahi exist. Agar \(r=1\), series \(a+a+a+\dots\) hai, partial sums \(\to\infty\). Agar \(r=-1\), partial sums oscillate between 0 and \(a\).

Formal theorem: The infinite GP \(\sum_{k=0}^\infty ar^k\) converges if and only if \(|r|<1\), in which case its sum equals \(a/(1-r)\).

## 5. Worked examples — har step show karo

**Example 1 — Simple positive ratio**  
*Given:* \(a=3\), \(r=1/4\).  
*Find:* Sum of infinite series.  
Step 1: Check \(|1/4|<1\) — true.  
Step 2: Apply formula \(S=3/(1-1/4)=3/(3/4)=4\).  
*Why:* Direct substitution after verifying convergence condition.  
**4**

*Reflection:* Trivial case; teaches only the arithmetic.

**Example 2 — Negative ratio**  
*Given:* \(a=1\), \(r=-1/2\).  
*Find:* Sum.  
Step 1: \(|-1/2|<1\) — true.  
Step 2: \(S=1/(1-(-1/2))=1/(3/2)=2/3\).  
*Why:* Absolute-value test ignores sign; oscillation still damps.  
**2/3**

*Reflection:* Shows formula works for negative \(r\).

**Example 3 — Compute partial sum and watch remainder**  
*Given:* \(a=5\), \(r=0.8\), \(n=10\).  
*Find:* \(S_{10}\) and remainder estimate.  
\(S_{10}=5(1-0.8^{10})/(1-0.8)\approx 5\times0.8926/0.2=22.315\).  
Remainder bound: \(|R|<5\times0.8^{10}/(1-0.8)\approx 2.23\).  
*Why:* Demonstrates how fast tail shrinks.  
**22.315 (approx)**

*Reflection:* Numerical verification of convergence speed.

**Example 4 — Divergence case**  
*Given:* \(a=2\), \(r=1.1\).  
*Find:* Does series converge?  
Step 1: \(|1.1|>1\) — false.  
Step 2: Partial sums grow without bound.  
*Why:* \(r^n\) explodes, so limit does not exist.  
**Diverges**

*Reflection:* Contrapositive of convergence theorem.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to check \(|r|<1\) before writing \(a/(1-r)\) | Students treat formula as always valid     | Write the condition as the first line of every solution |
| Using \(r=1\) in the formula | Division by zero                            | Handle \(r=1\) separately as divergent       |
| Confusing \(r^n\to0\) with \(n\to\infty\) only for positive r | Sign oversight                              | Always test absolute value                   |
| Taking limit inside without justification | Missing \(\epsilon\)-N argument             | Cite the theorem that \(|r|<1\Rightarrow r^n\to0\) |
| Writing sum = \(a/(1+r)\) for negative r | Sign slip                                   | Keep the denominator exactly \(1-r\)         |
| Assuming partial sums are monotonic | Negative r produces alternation             | Plot or compute first five terms             |
| Mixing finite and infinite notation | \(S_n\) vs \(S\) confusion                  | Use distinct symbols and state the limit explicitly |

## 7. The textbook-precise statement
Theorem (Infinite Geometric Series). Let \(a\in\mathbb{R}\) and \(r\in\mathbb{R}\). The series \(\sum_{k=0}^\infty ar^k\) converges if and only if \(|r|<1\). When the series converges, its sum is exactly \(a/(1-r)\). (Proof: see the limit argument above; cf. Stewart, *Calculus*, 9e, §11.2, Theorem 4.)

## 8. Visual — diagram or schematic
```text
Number line of partial sums (r = 0.6, a = 1)
S0 = 1.0
S1 = 1.6
S2 = 1.84
S3 = 1.936
S4 = 1.9744
...
          → 2.5  (limit line)
          |<-- tail < 0.01 after n=10
```
Horizontal axis: term index n; vertical: cumulative sum. The points approach the asymptote \(a/(1-r)=2.5\) exponentially.

## 9. The memory technique
1. **The hook** — Imagine dropping a ball that bounces to 60 % height each time; total distance = first drop + infinite smaller bounces that add up to a finite length, visualised as a shrinking staircase.
2. **What to overlearn** — The exact statement “converges ⇔ \(|r|<1\), sum = \(a/(1-r)\)”.
3. **Spaced-repetition schedule** — Review the theorem statement after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from \(S_n=a(1-r^n)/(1-r)\), write \(\lim r^n=0\) when \(|r|<1\), replace and simplify.

## 10. What this unlocks
Once you master infinite GP convergence you can immediately handle Taylor series remainders, Z-transforms in discrete control theory, and expected-value calculations in infinite-state Markov chains.

- Convergence tests for general series (ratio test is basically the GP test)
- Power-series radius of convergence
- Generating functions in combinatorics
- Closed-form solutions for linear recurrence relations

## 11. Self-check — five questions, no answers
1. For which values of \(r\) does \(\sum 3r^k\) converge? Compute the sum when it does.
2. A ball dropped from 10 m rebounds to 70 % height each time. Find the total distance travelled before it stops bouncing (theoretically).
3. Prove that if \(|r|>1\) then the partial sums are unbounded.
4. Why is the formula \(S=a/(1-r)\) invalid when \(r=1\)? Give a numerical counter-example.
5. A student claims the series with \(r=-0.9\) diverges because terms alternate. Detect the mistake and correct it.