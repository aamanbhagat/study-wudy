## 1. The one-sentence answer
**A discrete random variable maps outcomes to countable numbers, and its PMF gives the exact probability at each point while its CDF accumulates those probabilities up to any chosen value.**

Aap ek experiment ke possible results ko numbers mein badal rahe ho. Jab woh numbers sirf alag-alag, countable values le sakte hain (jaise 0, 1, 2, …), tab hum us random variable ko discrete kehte hain. PMF har possible number par probability mass rakh deta hai, aur CDF us mass ko left se right tak jodta jaata hai taaki aap “x se chhoti ya barabar value” ki probability turant dekh sako.

Iska matlab yeh hai ki PMF ek function hai jo sirf discrete points par non-zero hota hai aur in points ki probabilities ka sum exactly 1 hota hai. CDF ek non-decreasing, right-continuous function ban jaata hai jo 0 se shuru hokar 1 par khatam hota hai. Dono functions saath mein random variable ke behaviour ko poori tarah describe kar dete hain.

> [!NOTE]
> Sabse badi “aha” yeh hai ki PMF se CDF nikaalna sirf summation hai, lekin CDF se wapas PMF nikaalna difference lene par hi aata hai — dono ek dusre ke liye inverse operations hain jab values discrete hon.

## 2. Why this matters — concrete and current
In telecommunications, call-arrival modelling at companies such as Ericsson uses the Poisson PMF to decide how many circuits must be kept ready; the CDF directly gives the probability that more than k calls arrive in the next minute, which drives real-time capacity allocation.

In modern recommender systems at Netflix, each user-item interaction is treated as a Bernoulli trial; the PMF of the number of clicks in a session lets the ranking algorithm compute expected engagement, while the CDF supplies tail probabilities used in A/B-test stopping rules.

Semiconductor yield analysis at TSMC models the number of defective dies on a wafer as a binomial random variable; the CDF of this count determines whether a production lot meets the Six-Sigma quality threshold before packaging.

In high-energy physics experiments at CERN, the number of particle detections in a fixed time window follows a discrete distribution whose PMF is used to set trigger thresholds; the CDF is consulted in real time to decide whether an event is statistically rare enough to store.

In quantitative finance, the number of trades executed in a one-second bucket on an exchange is modelled by a discrete distribution; market-making algorithms at firms such as Jane Street use the CDF to compute the probability of adverse selection before posting quotes.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Sample space and events  | Random variable is defined on this space                  |
| Axiomatic probability    | Guarantees that PMF values are non-negative and sum to 1  |
| Function notation        | PMF and CDF are functions; you must read their domains correctly |
| Summation notation       | PMF requires summing probabilities over countable sets    |

Agar upar ki koi bhi line aapko unfamiliar lage, to pehle basic probability axioms padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — From outcomes to numbers
Aap experiment ke har outcome ko ek number assign kar dete ho. Yeh number sirf countable set mein lie karte hain.

Example: Do coin tosses ke outcomes {HH, HT, TH, TT} ko number of heads X = 0,1,2 assign karo.

Formally, a **random variable** X is a function X: Ω → ℝ such that the pre-image of every singleton {k} is an event.

> [!WARNING]
> Agar aap X ko sirf “number” samajh kar countable check karna bhool jaoge, to continuous aur discrete distributions ko kabhi alag nahi kar paoge.

### Step 2 — Probability mass at each point
Har possible value k ke liye P(X = k) likho. Yeh value hi PMF hai.

Example: Fair coin ke liye p_X(0) = 1/4, p_X(1) = 1/2, p_X(2) = 1/4.

Formally, the **probability mass function** of a discrete random variable X is  
$$p_X(k) = P(X = k),\qquad k\in\mathcal{X},$$  
where \(\mathcal{X}\) is the countable range of X.

> [!WARNING]
> p_X(k) ko 0 se chhoti value mat do; axiom violate ho jaayega aur baaki calculations collapse ho jaayengi.

### Step 3 — Summation constraint
Saari possible k ki probabilities ka sum 1 ke barabar hona chahiye.

Example: 1/4 + 1/2 + 1/4 = 1.

Formally,  
$$\sum_{k\in\mathcal{X}} p_X(k) = 1.$$

### Step 4 — Building the CDF by accumulation
CDF F_X(x) = P(X ≤ x) hai. Discrete case mein yeh left se right tak p_X values jodta jaata hai.

Example: Coin toss ke liye F_X(0) = 1/4, F_X(1) = 3/4, F_X(2) = 1.

Formally,  
$$F_X(x) = \sum_{k\leq x} p_X(k).$$

> [!WARNING]
> CDF ko left-continuous mat samajhna; discrete case mein woh right-continuous hota hai.

### Step 5 — Recovering PMF from CDF
Agar aapko CDF diya ho, to p_X(k) = F_X(k) − F_X(k−) le lo.

Formally,  
$$p_X(k) = F_X(k) - \lim_{y\to k^-} F_X(y).$$

### Step 6 — Textbook-grade statement
A discrete random variable X is completely characterised by either its PMF or its CDF; both must satisfy non-negativity, summation-to-one (or limit-to-one), and monotonicity.

## 5. Worked examples — har step show karo

**Example 1 — Single fair die**  
*Given:* X = face value of one roll of a fair six-sided die.  
*Find:* p_X(k) and F_X(3).  

p_X(k) = 1/6 for k = 1,…,6 (by symmetry of die).  
F_X(3) = p_X(1)+p_X(2)+p_X(3) = 3/6 = 1/2.  
*Why:* Sirf values ≤ 3 count kiye.  

**Final answer**  
$$p_X(k)=\frac16,\quad F_X(3)=\frac12$$

*Reflection:* Basic counting se shuru kiya; yeh example trivial lagta hai lekin summation rule ko pehli baar apply karne ka mauka deta hai.

**Example 2 — Sum of two dice**  
*Given:* X = sum when two fair dice are rolled.  
*Find:* p_X(7) and F_X(5).  

Possible pairs: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) → 6 out of 36.  
p_X(7) = 6/36 = 1/6.  
F_X(5) = (1+2+3+4)/36 = 10/36.  
*Why:* Har sum ke liye enumerate kiya, phir cumulative sum liya.  

**Final answer**  
$$p_X(7)=\frac16,\quad F_X(5)=\frac{5}{18}$$

*Reflection:* Enumeration quickly becomes tedious; later we will use generating functions.

**Example 3 — Geometric distribution (number of trials until first success)**  
*Given:* Success probability p = 0.3, X ~ Geometric(p).  
*Find:* p_X(4) and F_X(4).  

p_X(k) = (1-p)^{k-1}p → p_X(4) = (0.7)^3 * 0.3 = 0.1029.  
F_X(4) = 1 − (0.7)^4 = 0.7591.  
*Why:* CDF ka closed form 1 − (1-p)^k use kiya.  

**Final answer**  
$$p_X(4)=0.1029,\quad F_X(4)\approx0.7591$$

*Reflection:* Infinite support wale case mein summation series ban jaati hai; closed form yaad rakhna zaroori hai.

**Example 4 — Poisson approximation to binomial**  
*Given:* n = 100, p = 0.02, X ~ Binomial(100,0.02). Approximate with Poisson(λ=2).  
*Find:* P(X=3) using both and compare.  

Exact: \(\binom{100}{3}(0.02)^3(0.98)^{97} \approx 0.1827\).  
Poisson: e^{-2} * 2^3 / 3! ≈ 0.1804.  
*Why:* λ = np = 2 liya aur formula apply kiya.  

**Final answer**  
Poisson approximation error < 2 %.

*Reflection:* Large n, small p wale practical cases mein Poisson PMF kaafi accurate hota hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating PMF like a PDF (integrate instead of sum) | Continuous habit carry-over                 | Always check whether support is countable    |
| Forgetting that ∑p_X(k) must equal 1 | Rushing through definition                  | After writing PMF, explicitly add the sum    |
| Using F_X(k) = P(X < k)           | Confusing strict inequality                 | Remember CDF uses ≤; difference gives PMF    |
| Writing p_X(k) for non-integer k  | Not visualising the support                 | State the range \(\mathcal{X}\) first        |
| Assuming CDF is continuous        | Drawing smooth curves from continuous memory| Draw jumps at integers for discrete CDF      |
| Normalising PMF twice             | Thinking probabilities must be rescaled     | Once the sum is 1, stop                      |
| Using k−1 instead of k in geometric CDF | Off-by-one indexing                         | Write the support starting at 0 or 1 clearly |

## 7. The textbook-precise statement
Let X be a random variable whose range \(\mathcal{X}\) is a countable subset of the reals. The probability mass function of X is the function p_X : \(\mathcal{X}\) → [0,1] defined by p_X(k) := P(X = k). It satisfies p_X(k) ≥ 0 for all k and \(\sum_{k\in\mathcal{X}} p_X(k) = 1\). The cumulative distribution function is F_X(x) := P(X ≤ x) = \(\sum_{k\leq x} p_X(k)\). F_X is non-decreasing, right-continuous, lim_{x→−∞} F_X(x) = 0 and lim_{x→∞} F_X(x) = 1. (Ross, *A First Course in Probability*, 10e, §2.2)

## 8. Visual — diagram or schematic
```
PMF (bars)          CDF (step)
  0.5 |█          1.0 |________
  0.4 |█             |        ████
  0.3 |█             |    ████
  0.2 |█             | ███
  0.1 |█             |█
      +---+---+      +---+---+---→ x
      0   1   2          0   1   2
```
Bars sirf integer x par khade hain; CDF har integer ke baad jump karti hai aur uske baad flat rehti hai.

## 9. The memory technique

1. **The hook** — Imagine dropping marbles onto a staircase; each marble lands only on integer steps (PMF height) and the water level rising after each step is the CDF.
2. **What to overlearn** — p_X(k) ≥ 0, ∑ p_X(k) = 1, F_X(x) = ∑_{k≤x} p_X(k), p_X(k) = F_X(k) − F_X(k−).
3. **Spaced-repetition schedule** — Review definitions after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Bhool jaayein to “probability is additive over disjoint events” se shuru karo: P(X ≤ x) = ∑_{k≤x} P(X = k).

## 10. What this unlocks
PMF aur CDF aapko expectation, variance, moment-generating functions aur limit theorems tak le jaate hain.  
- Next: Expectation E[X] = ∑ k p_X(k)  
- Next: Laws of large numbers via CDF convergence  
- Next: Transition to continuous random variables by replacing sums with integrals  
- Next: Joint distributions and convolution of PMFs

## 11. Self-check — five questions, no answers
1. Ek fair coin ke liye X = number of heads in 3 tosses ka PMF likho aur verify karo ki sum = 1 hai.  
2. Geometric(p = 1/2) distribution ke liye F_X(3) calculate karo.  
3. Kya ek function jo negative values bhi leta hai PMF ho sakta hai? Kyun ya kyun nahi?  
4. CDF F_X(x) = 0.3x (x = 0,1,2,3) diya gaya hai; yeh valid CDF hai ya nahi? Proof do.  
5. Binomial(n = 20, p = 0.05) aur Poisson(λ = 1) ke beech P(X = 2) ki values compare karo aur percentage error batao.