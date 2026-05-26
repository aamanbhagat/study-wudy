## 1. The one-sentence answer
**Common discrete distributions describe the probability mass functions of countable random outcomes that arise from sequences of independent trials or from counting rare events.**

Aap in distributions ko samajh rahe hain kyunki har ek ek alag physical setting capture karti hai: ek single yes/no trial, uske multiple repetitions, events jo bahut kam hote hain, ya trials jo tab tak continue karte hain jab tak kuch successes na ho jaayein. In sabko ek saath dekhne se aap dekh paate hain ki kaise parameters change karne se shape, mean aur variance kaise badalte hain aur kaise ek distribution doosri ki limiting case ban jaati hai.

In models ka core yeh hai ki har distribution ka probability mass function (PMF) sirf ek ya do parameters par depend karta hai, phir bhi real counting processes ko accurately represent karta hai.

> [!NOTE]
> Sabse badi aha yeh hai ki Binomial, Poisson, Geometric aur Negative Binomial sab Bernoulli trial ke different aggregations hain; ek hi experiment ko alag-alag tareeke se count karne se nayi distributions paida hoti hain.

## 2. Why this matters — concrete and current
Google ke search-ranking systems mein Poisson distribution page-view counts model karti hai jab rare clicks ko daily aggregates mein convert kiya jaata hai, jisse ranking algorithms ko expected traffic ka unbiased estimate milta hai.

NASA ke Mars rover mission planning teams Binomial distribution use karti hai har sensor reading ke pass/fail probability ko model karne ke liye, taaki overall mission success probability ko Monte-Carlo simulations mein calculate kiya ja sake.

Semiconductor fabs mein TSMC yield-analysis teams Negative Binomial distribution defective die counts ko fit karti hai kyunki over-dispersion real defects mein hoti hai; yeh fit unhe process-improvement decisions ke liye accurate confidence intervals deta hai.

Single-photon detectors in quantum-communication experiments Geometric distribution waiting times ko record karte hain jab tak pehla photon detect na ho jaaye, jisse bit-error-rate calculations seedha PMF se derive hote hain.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Probability mass function | Har distribution ka exact P(X=k) expression isi se define hota hai |
| Expectation and variance | Parameters ke through mean aur variance nikalna padta hai |
| Independence of trials   | Binomial aur uske derivatives isi assumption par khade hain |
| Limit arguments          | Poisson ko Binomial ki limit ke roop mein samajhna zaroori hai |

Agar aapko expectation ya independence clear nahi hai to pehle unhe revise kar lein.

## 4. Building the idea — from intuition to formalism

### Step 1 — Single binary trial
Ek experiment sirf do outcomes deta hai, success probability p ke saath. Iska matlab yeh hai ki random variable X sirf 0 ya 1 ho sakta hai.

Concrete example: fair coin toss, p = 1/2.  
Formal statement:  
$$P(X=1)=p,\qquad P(X=0)=1-p.$$  
> [!WARNING] Agar aap yahan p ko 0 ya 1 maan lete hain to distribution degenerate ho jaati hai aur baaki sab models toot jaate hain.

### Step 2 — Fixed number of independent trials
n independent Bernoulli trials ke successes ki total count ko count karna. Iska matlab yeh hai ki ab X = 0,1,…,n tak values le sakta hai.

Concrete example: 10 coin tosses mein heads ki sankhya.  
Formal statement:  
$$X\sim\text{Binomial}(n,p),\qquad P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}.$$  
> [!WARNING] Independence na maanne se variance galat calculate hoti hai.

### Step 3 — Rare events, large n, small p
Jab n bada ho aur np = λ fixed rahe, Binomial Poisson ban jaati hai. Iska matlab yeh hai ki ab sirf ek parameter λ events ki average rate control karta hai.

Concrete example: ek minute mein call-center ko aane wali calls jab rate 3 calls/minute ho.  
Formal statement:  
$$P(X=k)=\frac{e^{-\lambda}\lambda^k}{k!},\qquad k=0,1,2,\dots$$  
> [!WARNING] Agar np bada ho jaaye to Poisson approximation kharab ho jaati hai.

### Step 4 — Trials until first success
Ab hum fixed n nahi lete; hum tab tak trials continue karte hain jab tak pehla success na ho jaaye. Iska matlab yeh hai ki support ab 1,2,3,… hai.

Concrete example: pehla six aane tak dice rolls.  
Formal statement:  
$$X\sim\text{Geometric}(p),\qquad P(X=k)=(1-p)^{k-1}p.$$  
> [!WARNING] Kuch textbooks Geometric ko 0 se shuru karte hain; support check karna zaroori hai.

### Step 5 — Trials until r successes
Pehle wale idea ko generalise karte hain: r successes hone tak trials. Iska matlab yeh hai ki Negative Binomial ek sum of r independent Geometric random variables hai.

Formal statement:  
$$X\sim\text{NB}(r,p),\qquad P(X=k)=\binom{k-1}{r-1}p^r(1-p)^{k-r},\quad k=r,r+1,\dots$$  
> [!WARNING] Parameterisation alag-alag books mein alag hoti hai; r aur p ka order confirm karo.

### Step 6 — Relationships and limits
Geometric Negative Binomial ki special case hai jab r=1; Poisson Binomial ki limit hai. In relationships ko samajhna aapko ek distribution se doosri mein jaane deta hai bina naye formulas yaad kiye.

## 5. Worked examples — har step show karo

**Example 1 — Basic Bernoulli probability**  
*Given:* Ek biased coin p=0.7.  
*Find:* P(X=1).  
Step: Definition se sidha likho P(X=1)=p.  
*Why:* Bernoulli PMF sirf do values allow karti hai, isliye calculation trivial hai.  
**0.7**

*Reflection:* Yeh example sirf definition check karti hai; aage ke examples isko aggregate karenge.

**Example 2 — Binomial PMF calculation**  
*Given:* n=5, p=0.4, k=2.  
*Find:* P(X=2).  
Step 1: Binomial coefficient nikalna: \(\binom{5}{2}=10\).  
*Why:* Combination count karti hai kis tarah 2 successes ho sakte hain.  
Step 2: \(10\times(0.4)^2(0.6)^3=10\times0.16\times0.216=0.3456\).  
*Why:* Har term probability ko multiply karta hai.  
**0.3456**

*Reflection:* Coefficient bhoolna common mistake hai; yahan explicitly calculate kiya.

**Example 3 — Poisson approximation check**  
*Given:* Binomial n=100, p=0.03, compare with Poisson λ=3 at k=2.  
*Find:* Dono PMFs.  
Step 1: Binomial: \(\binom{100}{2}(0.03)^2(0.97)^{98}\approx0.2237\).  
*Why:* Direct formula apply kiya.  
Step 2: Poisson: \(e^{-3}3^2/2!\approx0.2240\).  
*Why:* Limit formula use kiya.  
**Difference <0.001**

*Reflection:* Approximation kitni achhi hai yeh dikhata hai jab np chhota ho.

**Example 4 — Negative Binomial expectation**  
*Given:* r=3, p=0.5.  
*Find:* E[X].  
Step 1: Formula yaad karo E[X]=r/p.  
*Why:* Negative Binomial r independent Geometrics ka sum hota hai.  
Step 2: 3/0.5=6.  
**6**

*Reflection:* Formula derivation r=1 case se shuru hoti hai aur linearity se generalise hoti hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Geometric support 0 ya 1 se shuru | Different textbooks different conventions   | Hamesha support likh ke check karo           |
| Binomial variance np(1-p) bhoolna | Sirf mean yaad rakhte hain                  | Dono formulas saath likho                    |
| Poisson ko Binomial samajhna jab np bada ho | Limit condition bhool jaate hain         | np<10 rule of thumb yaad rakho               |
| Negative Binomial r aur k confuse karna | Notation overlap hoti hai                | r successes fix, k total trials maano        |
| p=0 ya p=1 ke cases handle na karna | Edge cases ko ignore karte hain           | Pehle hi check kar lo distribution valid hai |

## 7. The textbook-precise statement
Let X be a random variable taking values in the non-negative integers. The probability mass function of the binomial distribution with parameters n ∈ ℕ and p ∈ [0,1] is given by  
$$P(X=k)=\binom{n}{k}p^k(1-p)^{n-k},\qquad k=0,1,\dots,n,$$  
provided the binomial coefficient is defined via factorials for integer arguments (Feller, *An Introduction to Probability Theory and Its Applications*, Vol. 1, 3rd ed., §VI.1). The Poisson, geometric and negative-binomial distributions are introduced analogously with their respective supports and parameter restrictions stated explicitly in the same reference, Chapter VI.

## 8. Visual — diagram or schematic
```text
Bernoulli (p)
      |
      v
Binomial(n,p)  ──(n→∞, np=λ)──► Poisson(λ)
      |
      v
Geometric(p)  ──(r copies summed)──► NegativeBinomial(r,p)
```
Horizontal arrow shows limiting regime; vertical arrows show aggregation of independent copies.

## 9. The memory technique

**The hook**  
Imagine ek coin machine jo tab tak coins eject karti rahe jab tak r heads na aa jaayein; har coin ek Geometric trial hai aur poori machine Negative Binomial.

**What to overlearn**  
- Binomial PMF formula  
- Poisson limit relation np=λ  
- E[Geometric]=1/p

**Spaced-repetition schedule**  
Review after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Agar formula bhool jaayein to pehle Bernoulli PMF likho, phir independence use karke product likho, aur finally desired counting scheme (fixed n, until r, etc.) apply karo.

## 10. What this unlocks
Yeh distributions aapko count data ke liye likelihood functions likhna sikhate hain jo GLM aur Bayesian models ki buniyad hain.

- Poisson regression directly is knowledge par based hai  
- Negative Binomial over-dispersion handle karne ke liye GLM extension ban jaata hai  
- Queueing theory mein Geometric inter-arrival times seedha use hote hain

## 11. Self-check — five questions, no answers
1. Ek Binomial(n=20,p=0.1) variable ka variance kya hai?  
2. Poisson(λ=5) aur Binomial(n=100,p=0.05) mein P(X=3) compare karo numerically.  
3. Geometric(p=1/3) ke liye P(X>3) kis tarah calculate karoge?  
4. Kyun Negative Binomial ka variance uske mean se bada hota hai jab r fixed ho?  
5. Agar aapko ek experiment mein successes ki sankhya fixed r maang rahi hai lekin n unknown hai, kaunsi distribution use karoge aur kyun?