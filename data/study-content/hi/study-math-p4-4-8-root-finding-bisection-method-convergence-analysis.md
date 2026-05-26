## 1. The one-sentence answer
**Bisection method ki convergence linearly hoti hai with rate exactly 1/2, kyunki har step par interval length half ho jaati hai regardless of function shape.**

Iska matlab yeh hai ki error bound (b-a)/2^n ke hisaab se guaranteed kam hota hai, lekin speed function ke derivative par depend nahi karti. Aap interval ko repeatedly halve karte ho aur sign-change wala half choose karte ho, isliye convergence guaranteed rehti hai jab tak f continuous ho aur initial bracket sahi ho. Yeh slow hai lekin robust hai.

> [!NOTE]
> Sabse badi aha yeh hai ki bisection ka convergence proof sirf intermediate-value theorem par khada hai — koi derivative ya Lipschitz condition nahi chahiye, isliye yeh almost har continuous function ke liye kaam karta hai.

## 2. Why this matters — concrete and current
NASA’s trajectory-correction software still uses safeguarded bisection inside Brent’s method jab high-thrust burns ke liye root solve karna hota hai, kyunki sign-change guarantee zero-miss probability deta hai.

Semiconductor fabs mein TCAD tools (Synopsys Sentaurus) bisection-based root finders use karte hain doping-profile equations solve karne ke liye, jahaan function bahut flat ho sakti hai aur Newton diverge kar sakta hai.

Google’s internal solver for PageRank damping-factor calibration mein bisection ka convergence analysis use hota hai taaki iteration budget fixed rahe aur worst-case error bound mil sake.

Climate-model calibration (CESM code base) mein bisection parameter tuning ke liye use hoti hai jab energy-balance equation ka root dhundna hota hai aur derivative analytically available nahi hoti.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Intermediate Value Theorem | Guarantees at least one root exists inside bracket        |
| Absolute error bound | Gives the explicit (b-a)/2^n formula                      |
| Sequence limit       | Defines what “convergence” formally means                 |
| Continuity of f      | Prevents roots from disappearing between iterations       |

Agar inme se koi bhi weak hai to pehle uss concept ko revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Initial bracket and sign change
Aapke paas ek closed interval [a_0, b_0] hai jahaan f(a_0) aur f(b_0) opposite signs ke hain. Iska matlab continuous function ke liye root zaroor hai.

Example: f(x) = x^2 - 2 on [1, 2]. f(1) = -1, f(2) = 2, sign change clear.

Formal statement: Let f be continuous on [a,b] with f(a)f(b) < 0. Then ∃ c ∈ (a,b) such that f(c) = 0.

> [!WARNING]
> Agar sign change galat detect ho (floating-point error se) to pura algorithm galat interval mein phas sakta hai.

### Step 2 — Midpoint and interval halving
Har iteration mein midpoint c_n = (a_n + b_n)/2 calculate karo aur dekho kaunsa sub-interval sign change preserve karta hai.

Example: c = 1.5, f(1.5) = 0.25 > 0, toh new interval [1, 1.5].

Formal: a_{n+1} = a_n, b_{n+1} = c_n ya a_{n+1} = c_n, b_{n+1} = b_n depending on sign(f(a_n)f(c_n)).

> [!WARNING]
> Agar f(c_n) exactly zero ho to algorithm ruk jaana chahiye, warna unnecessary iterations waste hote hain.

### Step 3 — Error bound derivation
Interval length L_n = b_n - a_n = L_0 / 2^n hoti hai. Root r har interval ke andar rehta hai, isliye |x_n - r| ≤ L_n / 2.

Display math:
$$|x_n - r| \le \frac{b_0 - a_0}{2^{n+1}}$$

### Step 4 — Linear convergence rate
Error e_{n+1} ≤ (1/2) e_n, isliye asymptotic rate linear with constant 1/2 hai.

Formal: lim sup |e_{n+1}| / |e_n| = 1/2.

### Step 5 — Stopping criterion from bound
Jab (b_n - a_n)/2 < tolerance, algorithm stop kar sakte ho with guaranteed accuracy.

## 5. Worked examples — har step show karo

**Example 1 — Simple quadratic**
*Given:* f(x) = x^2 - 2, [a_0,b_0] = [1,2], tolerance 0.01.
*Find:* n such that error < 0.01.
Step 1: L_0 = 1. Compute n where 1/2^{n+1} < 0.01 → n ≥ 6.
*Why:* Direct use of bound formula.
**Final answer:** After 6 iterations error ≤ 0.0078.

*Reflection:* Trivial case shows bound independent of f'.

**Example 2 — Flat function near root**
*Given:* f(x) = x^3 - x + 0.1 on [0,1].
*Find:* Number of iterations for 10^{-6} accuracy.
Step-by-step bound calculation gives n = 20.
*Why:* Halving works even when f' almost zero.
**Final answer:** 20 iterations.

*Reflection:* Shows robustness when Newton would struggle.

**Example 3 — Multiple roots bracket**
*Given:* f(x) = sin(x) on [3,4].
*Find:* First two iterates.
c_1 = 3.5, f(3.5) < 0 → [3.5,4]; c_2 = 3.75.
*Why:* Sign test decides correct half.
**Final answer:** Interval shrinks to [3.5,3.75].

*Reflection:* Multiple roots exist but one bracket isolates one.

**Example 4 — Floating-point edge**
*Given:* f(x) = (x-1)^2 * exp(x) near x=1, bracket [0.9,1.1].
*Find:* Behaviour at machine epsilon.
Halving continues safely until underflow.
*Why:* No derivative division, hence stable.
**Final answer:** Converges to 1 within 53 bits.

*Reflection:* Illustrates safety in ill-conditioned cases.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Forgetting to check f(c)==0 | Code skips exact-root test              | Explicit if abs(f(c))<eps return c           |
| Using open interval         | Root may lie at endpoint                | Always keep closed bracket                   |
| Ignoring floating-point sign| f(a)*f(b) underflows to zero            | Use signbit or f(a)*f(b)<0 with care         |
| Wrong tolerance on n        | Using |b-a| instead of |b-a|/2          | Always divide by 2 in stopping test          |
| Assuming faster convergence | Seeing fast drop in first steps         | Remember worst-case is strictly 1/2          |
| Not handling a>b swap       | After update a_n > b_n                  | Swap if needed after each assignment         |

## 7. The textbook-precise statement
Let f be continuous on the closed interval [a,b] with f(a)f(b)<0. Define sequences {a_n}, {b_n} by a_0=a, b_0=b and
$$c_n=\frac{a_n+b_n}{2},\quad
\begin{cases}
a_{n+1}=a_n,\ b_{n+1}=c_n & \text{if }f(a_n)f(c_n)<0,\\
a_{n+1}=c_n,\ b_{n+1}=b_n & \text{otherwise}.
\end{cases}$$
Then a_n ≤ r ≤ b_n for every n, where r is a root, and
$$b_n-a_n=\frac{b-a}{2^n}.$$
Hence the mid-point sequence x_n=c_n satisfies |x_n-r|≤(b-a)/2^n →0 as n→∞. (Burden, Faires & Burden, *Numerical Analysis*, 10e, §2.1.)

## 8. Visual — diagram or schematic
```text
a0 ---------------- c0 ---------------- b0
          |<--L0/2-->|          sign test chooses left or right
a1 -------- c1 ---- b1
     |<--L0/4-->|
```
Each level halves the length; root stays inside every nested interval.

## 9. The memory technique
1. **The hook** — Picture a rope being cut exactly in half each time; the root is a knot somewhere on the rope and you always keep the piece that still has the knot.
2. **What to overlearn** — Bound formula (b-a)/2^{n+1} and rate exactly 1/2.
3. **Spaced-repetition schedule** — Review bound derivation after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from “interval length halves” → write L_n = L_0/2^n → |error| ≤ L_n/2.

## 10. What this unlocks
Bisection convergence analysis aapko safeguarded hybrid solvers (Brent, Ridders) samajhne ke liye ready karti hai aur aapko error-control strategies sikhaati hai jo almost har numerical library mein dikhte hain.

- Brent’s method (uses bisection as fallback)
- Regula falsi variants
- Guaranteed termination proofs in verified computing
- Hybrid Newton-bisection schemes in optimization libraries

## 11. Self-check — five questions, no answers
1. Derive the exact number of iterations needed to guarantee 10^{-12} accuracy starting from interval length 4.
2. Show that bisection still converges when f'(root)=0 (flat root).
3. What happens to the observed convergence rate if you always pick the wrong sub-interval by mistake?
4. Compare the worst-case iteration count of bisection versus Newton for a function with |f'|≈10^{-8} near the root.
5. Construct a continuous function and bracket where bisection takes more than 50 iterations yet the root lies exactly at the first midpoint.