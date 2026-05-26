## 1. The one-sentence answer
**Hypothesis testing** ek formal decision procedure hai jo data ke basis par decide karta hai ki population parameter ke baare mein ek specific claim (null hypothesis) ko reject karna chahiye ya nahi.

Aap ek assumed default statement (null) lete ho aur uske against evidence collect karte ho. Agar data null ke saath bahut zyada inconsistent dikhe, to aap usko reject kar dete ho aur alternative statement ko accept kar lete ho. Poori process mein aap ek single number — test statistic — calculate karte ho jo data ko ek probability value (p-value) mein convert karta hai, aur phir decide karte ho ki result statistically significant hai ya sirf sampling noise ki wajah se aaya hai.

Type I error tab hota hai jab aap galti se null ko reject kar dete ho jab woh asal mein sahi hota hai; Type II error tab hota hai jab aap null ko accept kar lete ho jab woh galat hota hai. Yeh dono errors ek dusre ke saath trade-off karte hain.

> [!NOTE]
> Sabse badi aha yeh hai ki aap kabhi bhi null hypothesis ko “prove” nahi kar sakte — aap sirf usko reject karne ke liye strong evidence dhundh sakte ho. Absence of evidence is not evidence of absence.

## 2. Why this matters — concrete and current
Google ke A/B testing infrastructure roz laakhon experiments run karta hai jismein null hypothesis hoti hai “new UI se click-through rate mein koi farak nahi padta”. Sirf tabhi naye design ko deploy kiya jaata hai jab p-value 0.05 se kam aaye.

NASA ke Mars 2020 mission mein entry-descent-landing telemetry ke analysis mein hypothesis testing use hui thi taaki confirm kiya ja sake ki parachute deployment sequence expected performance se statistically alag nahi tha.

Pfizer aur Moderna ke mRNA vaccine trials mein primary endpoint analysis mein Type I error rate ko 0.025 par control kiya gaya tha, jo regulatory approval ke liye FDA requirement hai.

Semiconductor companies jaise TSMC mein process-control monitoring mein hypothesis testing lagataar chalti rehti hai taaki machine drift ko turant pakda ja sake before yield loss ho.

CERN ke Large Hadron Collider data analysis pipelines mein Higgs boson discovery claim karne ke liye 5-sigma threshold (p-value ≈ 3×10^{-7}) use kiya gaya tha.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Random variables & distributions | Test statistic ki sampling distribution samajhni zaroori hai |
| Expectation and variance | Standard error aur z/t statistics derive karne ke liye     |
| Cumulative distribution function | p-value calculate karne ke liye                           |
| Law of large numbers     | Sample size bada hone par decisions stable kyun hote hain |

Agar upar ke concepts comfortable nahi hain to pehle unko revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — State the hypotheses clearly
Aap do mutually exclusive statements banate ho: null hypothesis \(H_0\) jo status-quo ya “no effect” ko represent karti hai, aur alternative hypothesis \(H_a\) jo aapke research claim ko represent karti hai.  
Example: ek coin fair hai ya nahi. \(H_0: p = 0.5\), \(H_a: p \neq 0.5\).  
Formal statement: \(H_0: \theta \in \Theta_0\) versus \(H_a: \theta \in \Theta_0^c\).

> [!WARNING]
> Agar \(H_0\) aur \(H_a\) properly disjoint na hue to decision rule collapse ho jaayega.

### Step 2 — Fix the significance level \(\alpha\)
Aap pehle decide karte ho ki Type I error kitna tolerate kar sakte ho. Yeh value \(\alpha\) (commonly 0.05 ya 0.01) test shuru hone se pehle fix karni padti hai.  
Formal: \(\alpha = P(\text{reject } H_0 \mid H_0 \text{ true})\).

### Step 3 — Choose and compute the test statistic
Data se ek single number \(T\) banate ho jo \(H_0\) ke under ek known distribution follow kare.  
Example: \(Z = \frac{\bar{X} - \mu_0}{\sigma/\sqrt{n}}\) under normality.  
Display math:  
$$T = \frac{\hat{\theta} - \theta_0}{\text{SE}(\hat{\theta})}.$$

### Step 4 — Obtain the p-value
p-value = \(P(T \geq t_{\text{obs}} \mid H_0 \text{ true})\). Yeh probability batata hai ki agar null sach hoti to aapko itna extreme ya usse zyada extreme data kitni baar milta.

### Step 5 — Apply the decision rule
Agar p-value \(\leq \alpha\) to reject \(H_0\); warna fail to reject. Equivalent critical-value approach bhi use ho sakti hai.

### Step 6 — Quantify Type II error
\(\beta = P(\text{fail to reject } H_0 \mid H_a \text{ true})\). Power = \(1 - \beta\). Yeh value alternative hypothesis ke specific parameter par depend karti hai.

### Step 7 — Textbook-grade statement
Let \(X_1,\dots,X_n\) be i.i.d. with density \(f(x;\theta)\). A level-\(\alpha\) test is a function \(\phi(\mathbf{X})\) such that \(E_{\theta_0}[\phi(\mathbf{X})] \leq \alpha\) for all \(\theta_0 \in \Theta_0\).

## 5. Worked examples — har step show karo

**Example 1 — Fair coin check**  
*Given:* 100 tosses mein 62 heads aaye.  
*Find:* kya coin biased hai (\(\alpha = 0.05\))?  
Under \(H_0: p=0.5\), \(Z = \frac{0.62-0.5}{\sqrt{0.5\cdot0.5/100}} = 2.4\).  
p-value = \(2(1-\Phi(2.4)) \approx 0.0164\).  
0.0164 < 0.05, isliye reject \(H_0\).  
*Why:* binomial ko normal se approximate kiya kyunki \(np,n(1-p)>5\).  
**Reject \(H_0\)**.  
*Reflection:* Yeh example simple hai lekin continuity correction ya exact binomial test se thoda alag ho sakta hai.

**Example 2 — Mean height test**  
*Given:* Sample mean height = 172 cm, \(\sigma=8\), \(n=36\), test \(H_0: \mu=170\).  
*Find:* p-value.  
\(Z = \frac{172-170}{8/\sqrt{36}} = 1.5\).  
p-value = \(1-\Phi(1.5) \approx 0.0668\).  
*Why:* one-sided test kyunki alternative \(\mu>170\) maana gaya.  
**Fail to reject at \(\alpha=0.05\)**.  
*Reflection:* Small sample size power ko kam kar deta hai.

**Example 3 — Two-sided t-test**  
*Given:* Sample data with \(\bar{x}=5.1\), \(s=1.2\), \(n=16\), test \(H_0: \mu=5\).  
\(t = \frac{5.1-5}{1.2/\sqrt{16}} = 0.333\), df=15.  
p-value \(\approx 0.74\).  
**Fail to reject**.  
*Reflection:* t-distribution heavy tails ki wajah se p-value z-test se badi aati hai.

**Example 4 — Power calculation**  
*Given:* \(\alpha=0.05\), true \(\mu=172\), same parameters as Example 2.  
Critical value 170 + 1.645·(8/6) = 172.19.  
\(\beta = \Phi\left(\frac{172.19-172}{8/6}\right) = \Phi(0.1425) \approx 0.557\).  
Power ≈ 0.443.  
*Reflection:* Power badhane ke liye sample size badhaana padega.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| p-value ko “P(H₀ true)” samajhna | Language misuse in textbooks                | Yaad rakho p-value = P(data|H₀)              |
| Multiple testing without correction | 20 tests mein ek galti se significant aayega | Bonferroni ya FDR correction lagao           |
| Post-hoc power calculation  | Result dekh kar power compute karna         | Power sirf design phase mein calculate karo  |
| “Fail to reject” ko “accept” bolna | Neyman-Pearson framework galat samajhna     | Hamesha “fail to reject” hi likho            |
| Small sample pe z-test      | Normality assumption violate hoti hai       | t-test ya non-parametric test use karo       |
| p-hacking                   | Data pe multiple cuts try karna             | Pre-register analysis plan                   |

## 7. The textbook-precise statement
Let \(X_1,\dots,X_n\) be i.i.d. with pdf \(f(x;\theta)\), \(\theta\in\Theta\). A test of \(H_0:\theta\in\Theta_0\) versus \(H_a:\theta\in\Theta_0^c\) at level \(\alpha\) is a measurable function \(\phi:\mathcal{X}^n\to\{0,1\}\) satisfying  
\[E_{\theta}[\phi(\mathbf{X})]\leq\alpha\quad\forall\theta\in\Theta_0.\]  
The p-value is \(p(\mathbf{x})=\inf\{\alpha:\phi_\alpha(\mathbf{x})=1\}\).  
Type I error probability = \(\alpha\), Type II error probability = \(\beta(\theta)=E_{\theta}[1-\phi(\mathbf{X})]\) for \(\theta\in\Theta_0^c\).  
Reference: Casella & Berger, *Statistical Inference*, 2e, §8.2–8.3.

## 8. Visual — diagram or schematic
```
          Sampling distribution under H0
               (bell curve centred at 0)
   α/2 region          Acceptance region          α/2 region
   [Reject]     <------ [Fail to reject] ------>   [Reject]
               critical value               critical value
                       -z_{α/2}                     +z_{α/2}
Type I error = shaded tails
Type II error = area under Ha curve that overlaps acceptance region
```

## 9. The memory technique
1. **The hook** — Null hypothesis ko “innocent until proven guilty” wale court case ki tarah socho; p-value uss “reasonable doubt” ki probability hai.
2. **What to overlearn** — \(\alpha = P(\text{Type I})\), power = \(1-\beta\), p-value definition, aur decision rule “p ≤ α ⇒ reject”.
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Agar formula bhool jaaye to Neyman-Pearson lemma se shuru karo: likelihood ratio test statistic banate ho aur uski distribution nikaalte ho.

## 10. What this unlocks
Yeh topic aapko statistical modelling, A/B testing frameworks, clinical trial design, aur machine-learning model evaluation ke liye ready karta hai.  
- Next: Confidence intervals aur duality with tests  
- Likelihood ratio tests aur Wald tests  
- Multiple comparison procedures (Bonferroni, Benjamini-Hochberg)  
- Bayesian hypothesis testing with Bayes factors

## 11. Self-check — five questions, no answers
1. Ek coin 100 tosses mein 70 heads deti hai. \(\alpha=0.01\) par two-sided test ka p-value kya hai?  
2. Type I error badhaane se Type II error par kya asar padta hai?  
3. Agar p-value exactly 0.05 aaye aur aapne \(\alpha=0.05\) fix kiya tha, to decision kya hoga?  
4. Sample size double karne se power kis tarah change hoti hai (approximate relation)?  
5. Ek researcher ne 50 tests kiye bina correction ke. Sabse chhote p-value = 0.001 mila. Kya yeh result valid hai?