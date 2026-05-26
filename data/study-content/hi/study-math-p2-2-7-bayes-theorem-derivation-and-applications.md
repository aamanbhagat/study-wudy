## 1. The one-sentence answer
**Bayes' theorem** ek formula hai jo aapko reverse conditional probability nikalne deta hai — matlab agar aap jaante ho P(B|A) to P(A|B) nikal sakte ho.

Yeh sirf ek rearrangement nahi hai. Yeh aapko prior belief ko new evidence ke saath update karne ka rigorous tareeka deta hai. Conditional probability ki definition se shuru karo, dono taraf multiply karo, aur P(B) ko law of total probability se expand karo — bas, theorem ban jaata hai.

Agar aap isko sirf numbers ke hisaab se yaad rakhte ho to aap iske asli matlab ko miss kar rahe ho: yeh probability ko ek living quantity banaata hai jo naye data aane par badalti rehti hai.

> [!NOTE]
> Sabse badi aha yeh hai ki Bayes' theorem aapko batata hai ki aapka pehle se maana hua belief (prior) evidence ke aane ke baad kaise badalna chahiye — yeh sirf ek formula nahi, ek updating rule hai.

## 2. Why this matters — concrete and current
Google ke spam filter har roz millions of emails par Bayes' theorem ka discrete version chalaata hai taaki P(spam|words) ko update kiya ja sake.

COVID-19 ke time par PCR test results ko interpret karne ke liye public-health agencies ne Bayes' theorem use kiya taaki false-positive rate aur prevalence ko combine karke real infection probability nikali ja sake.

Autonomous-vehicle companies jaise Waymo apne sensor-fusion pipelines mein Bayesian filtering chalaate hain taaki LiDAR aur camera readings se object location ki posterior probability continuously update hoti rahe.

Modern neural-network training mein variational inference ke andar Bayes' theorem ka continuous version chalta hai; yeh hi technique companies jaise DeepMind ko uncertainty estimates nikalne deti hai jo safety-critical systems mein zaroori hoti hai.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Conditional probability    | Theorem ki definition isi par based hai                   |
| Law of total probability   | Denominator P(B) ko expand karne ke liye zaroori hai      |
| Joint probability          | P(A,B) = P(B|A)P(A) ko samajhna padega                    |
| Independence vs dependence | Intuition build karne mein madad karta hai                |

Agar conditional probability clear nahi hai to pehle usko revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the definition of conditional probability
Conditional probability ka matlab hota hai “given B, A ki probability”. Iska formal definition P(A|B) = P(A,B)/P(B) hai. Ek concrete example: ek fair die mein P(even|multiple of 3) nikalna. Yahan joint event sirf 6 hai, isliye P = 1/6 divided by 1/3 = 1/2.

$$P(A|B)=\frac{P(A\cap B)}{P(B)}$$

> [!WARNING]
> Agar aap yahan P(A,B) aur P(A|B) ko alag-alag treat nahi karte to pura derivation gir jaayega.

### Step 2 — Write the symmetric form for the reverse conditional
Upar wali definition ko A aur B ke liye swap karke likho: P(B|A) = P(A,B)/P(A). Ab dono equations mein P(A,B) common hai.

### Step 3 — Eliminate the joint probability
Dono equations ko equate karne ke liye P(A,B) ko ek taraf se hatao. P(A|B)P(B) = P(B|A)P(A) likho. Ab sirf divide karna baki hai.

### Step 4 — Solve for the desired reverse probability
P(A|B) ko isolate karo: P(A|B) = [P(B|A)P(A)] / P(B). Yeh abhi tak incomplete hai kyunki P(B) abhi bhi joint form mein hai.

### Step 5 — Expand the denominator using the law of total probability
Agar A aur A^c mutually exclusive aur exhaustive hain to P(B) = P(B|A)P(A) + P(B|A^c)P(A^c). Isse poora theorem ban jaata hai.

$$P(A|B)=\frac{P(B|A)P(A)}{P(B|A)P(A)+P(B|A^c)P(A^c)}$$

### Step 6 — Generalise to multiple hypotheses
Agar k mutually exclusive events H1 … Hk hain jo exhaustive hain, to denominator sum_{i=1}^k P(B|Hi)P(Hi) ban jaata hai. Yeh version hi real applications mein use hota hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple medical test**
*Given:* Ek test 99 % sensitive aur 95 % specific hai. Disease prevalence 1/1000 hai.
*Find:* P(disease|positive).
P(D) = 0.001, P(¬D) = 0.999, P(+|D) = 0.99, P(+|¬D) = 0.05.
P(+) = 0.99·0.001 + 0.05·0.999 = 0.05094.
P(D|+) = (0.99·0.001)/0.05094 ≈ 0.0194.
**0.0194**
*Reflection:* Bahut log 99 % bol dete hain; yeh example dikhata hai ki prior kitna strong hota hai.

**Example 2 — Two hypotheses with equal priors**
*Given:* Ek coin 60 % biased towards heads ya fair ho sakti hai, dono priors 0.5.
*Find:* P(biased|two heads).
P(HH|biased) = 0.36, P(HH|fair) = 0.25.
P(biased|HH) = (0.36·0.5)/(0.36·0.5 + 0.25·0.5) = 0.59.
**0.59**
*Reflection:* Ek extra head aane par probability kaise badhegi, yeh pattern dikhata hai.

**Example 3 — Three hypotheses**
*Given:* Box mein 3 coins: 2-headed, fair, 2-tailed. Ek coin choose karke do heads aaye.
*Find:* P(2-headed|HH).
Priors 1/3 each. Likelihoods 1, 0.25, 0.
Denominator = 1/3 + 0.25/3 = 5/12.
Posterior = (1·1/3)/(5/12) = 0.8.
**0.8**
*Reflection:* Zero-likelihood wali hypothesis automatically eliminate ho jaati hai.

**Example 4 — Continuous case sketch**
*Given:* Prior θ ~ Beta(1,1), likelihood binomial n=10, k=7.
*Find:* Posterior mean.
Posterior Beta(8,4), mean 8/12 = 2/3.
**2/3**
*Reflection:* Conjugate prior se update sirf parameters add karne jaisa hota hai.

## 6. Common traps and how to avoid them

| Trap                          | Why it happens                              | How to avoid it                              |
|-------------------------------|---------------------------------------------|----------------------------------------------|
| P(A|B) aur P(B|A) ko swap kar dena | Language mein “probability of A given B” confuse hoti hai | Hamesha formula mein numerator aur denominator check karo |
| P(B) ko sirf P(B|A) maan lena | Denominator bhool jaate hain                | Law of total probability likhna compulsory karo |
| Prior ko zero kar dena        | Intuition mein “impossible” lagta hai       | Prior > 0 rakhna ya pseudo-count add karna   |
| Evidence ko double-count karna | Multiple tests ko independent maan lena     | Joint likelihood likh ke check karo          |
| Normalisation bhool jaana     | Posterior probabilities ka sum 1 na ho      | Hamesha denominator calculate karo           |
| Base rate ignore karna        | Test accuracy ko hi final answer maan lena  | Prevalence ko hamesha multiply karo          |

## 7. The textbook-precise statement
Let A be an event and let {B_i} be a countable partition of the sample space. Assume P(B_i) > 0 for every i and P(A) > 0. Then
$$P(B_j|A)=\frac{P(A|B_j)P(B_j)}{\sum_i P(A|B_i)P(B_i)}.$$
All probabilities are defined on a common probability space (Ω, F, P). (Blitzstein & Hwang, *Introduction to Probability*, 2e, §3.4.)

## 8. Visual — diagram or schematic
```
Prior P(H) ──▶ Likelihood P(E|H)
                 │
                 ▼
           Posterior P(H|E) = [P(E|H) P(H)] / P(E)
P(E) = Σ P(E|H_i) P(H_i)   <─── total probability
```

## 9. The memory technique
1. **The hook** — Ek doctor ko yaad rakho jo har nayi report padh kar apni “belief ko update” karta hai; wohi Bayes’ rule hai.
2. **What to overlearn** — Formula P(A|B) = P(B|A)P(A)/P(B) aur denominator expansion.
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Conditional probability ki definition se shuru karo, joint ko cancel karo, total probability se denominator bharo.

## 10. What this unlocks
Bayes' theorem Bayesian inference, Kalman filtering, Bayesian networks aur variational autoencoders ki buniyad hai.

- Next: Bayesian parameter estimation
- Next: Naive Bayes classifier
- Next: Markov Chain Monte Carlo sampling

## 11. Self-check — five questions, no answers
1. Ek test 90 % accurate hai aur disease 0.1 % logon mein hai. Positive aane par asli probability kitni hai?
2. Formula mein P(B) zero ho jaaye to kya hota hai aur kyun?
3. Teen hypotheses hain; likelihood ek ki zero hai. Posterior kya hoga?
4. Prior aur likelihood dono uniform hain to posterior kaisa dikhega?
5. Ek medical test mein false-positive rate double kar do; posterior mein kitna farak padta hai?