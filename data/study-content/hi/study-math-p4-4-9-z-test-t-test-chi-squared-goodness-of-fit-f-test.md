## 1. The one-sentence answer
**These four procedures are the core frequentist tools for hypothesis testing that let you decide whether sample data provide enough evidence to reject a stated null claim about a population parameter or distribution.**

Pehle aap z-test aur t-test ko samajh lijiye. Dono mean compare karte hain, lekin z-test tab chalta hai jab population variance known ho aur sample bada ho, jabki t-test unknown variance aur chhote samples ke liye hota hai. Chi-squared goodness of fit test check karta hai ki observed frequencies kisi expected distribution se kitni alag hain, aur F-test variance ratios ya multiple means ke beech differences detect karta hai ANOVA settings mein.

In sabka common thread yeh hai ki har test ek test statistic banata hai, usko known distribution se compare karta hai, aur p-value ya critical value ke basis par decide karta hai reject karna hai ya nahi. Yeh methods aapko population ke baare mein inference nikalne dete hain bina poori population ko observe kiye.

> [!NOTE]
> Sabse badi aha yeh hai ki har test apni assumptions ke saath tightly coupled hai — variance known hai ya nahi, data normal hai ya nahi — aur assumption violate hone par test ka p-value meaningless ho jaata hai.

## 2. Why this matters — concrete and current
Google ka A/B testing infrastructure roz laakhon experiments mein t-test aur z-test variants use karta hai taaki small UI changes ka conversion rate par asar detect ho sake. Jab sample size badi hoti hai aur variance known hoti hai, z-test unke latency-sensitive pipelines mein fast decisions deta hai.

NASA Mars 2020 rover ke sensor calibration data mein chi-squared goodness of fit test lagaya gaya tha taaki telemetry distributions expected Gaussian models se match karti hain ya nahi, yeh verify kiya ja sake. Mismatch hone par recalibration triggers hote the.

TSMC aur Intel ke semiconductor yield analysis mein F-test regularly chalaya jaata hai different fabrication lines ke variance compare karne ke liye; agar variances significantly alag niklein to process engineers root-cause analysis shuru karte hain.

Modern clinical trials, jaise Pfizer ke mRNA vaccine studies, controlled mean comparisons ke liye t-test aur F-test dono use karte hain jab multiple dose groups ke beech variance homogeneity check karni hoti hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Normal distribution      | z, t, aur F statistics ki exact distributions normal populations se derive hoti hain |
| Central limit theorem    | Bade samples mein sample mean approximately normal ban jaata hai, z-test justify karta hai |
| Degrees of freedom       | t, chi-squared, aur F distributions ke shape ko control karta hai                    |
| p-value & significance level | Decision rule reject/accept ke liye formal threshold deta hai                     |
| Variance vs standard deviation | Test statistics mein directly appear karte hain                               |

Agar aap inme se koi bhi weak feel kar rahe hain, to pehle univariate probability aur sampling distributions revise kar lijiye.

## 4. Building the idea — from intuition to formalism

### Step 1 — State a clear null and alternative
Aap ek specific claim banate hain jo aap disprove karna chahte hain (null hypothesis \(H_0\)) aur uska opposite (alternative \(H_a\)).  
Example: “Population mean 50 hai” banam “Population mean 50 nahi hai”.  
Formal statement: \(H_0: \mu = \mu_0\) versus \(H_a: \mu \neq \mu_0\).

> [!WARNING]
> Agar null galat tareeke se likha gaya (jaise equality ki jagah inequality), to pura test statistic aur p-value interpretation collapse ho jaayega.

### Step 2 — Choose the right test statistic family
Data type aur kya estimate karna hai uske hisaab se decide karo. Mean ke liye z ya t, categorical frequencies ke liye chi-squared, variance ratio ke liye F.  
Concrete: Agar \(\sigma\) known hai aur \(n > 30\), z-statistic use karo.

### Step 3 — Compute the test statistic from sample
Formula plug-in karo. z-statistic:  
\[
z = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}}
\]
t-statistic similar hota hai lekin \(s\) use karta hai.

### Step 4 — Identify the reference distribution
z ~ N(0,1), t ~ t_{n-1}, chi-squared ~ \(\chi^2_{k-1}\), F ~ F_{d_1,d_2}. Degrees of freedom count karna zaroori hai.

### Step 5 — Calculate p-value or compare with critical value
p-value = P( Test statistic \(\geq\) observed | \(H_0\) true ). Agar p-value < \(\alpha\) (usually 0.05) to reject.

### Step 6 — Check assumptions and report effect size
Normality, independence, aur homogeneity of variance verify karo. Cohen’s d ya Cramér’s V jaise measures add karo taaki statistical significance ke saath practical importance bhi dikhe.

### Step 7 — Textbook-grade decision rule
Reject \(H_0\) at level \(\alpha\) if and only if the observed test statistic lies in the critical region whose probability under the null distribution is exactly \(\alpha\).

## 5. Worked examples — har step show karo

**Example 1 — Large-sample mean test with known variance**  
*Given:* Sample of 100 students, \(\bar{x}=72\), \(\sigma=15\), test \(H_0: \mu=70\).  
*Find:* p-value at \(\alpha=0.05\).  
Step 1: \(H_0: \mu=70\), \(H_a: \mu\neq70\).  
Step 2: z-test because \(\sigma\) known, \(n>30\).  
\[
z = \frac{72-70}{15/\sqrt{100}} = 1.333
\]  
*Why:* Standard error formula directly normalise karta hai deviation ko.  
p-value = \(2(1-\Phi(1.333))\approx0.182\).  
**Final answer: Do not reject \(H_0\).**  
*Reflection:* Tricky part sirf formula yaad rakhna nahi, balki yeh samajhna tha ki two-tailed test hai.

**Example 2 — Small-sample t-test**  
*Given:* n=10, \(\bar{x}=48.2\), s=4.1, test \(H_0: \mu=50\).  
\[
t = \frac{48.2-50}{4.1/\sqrt{10}} = -1.385, \quad df=9
\]  
p-value \(\approx0.20\).  
**Final answer: Do not reject.**  
*Reflection:* s use karne se extra uncertainty aati hai, isliye t-distribution z se fatter hoti hai.

**Example 3 — Chi-squared goodness of fit**  
*Given:* 100 rolls of die, observed counts [18,15,17,20,14,16]. Expected each 1/6.  
\[
\chi^2 = \sum\frac{(O_i-16.67)^2}{16.67} \approx 1.52, \quad df=5
\]  
p-value \(\approx0.91\).  
**Final answer: Data consistent with fair die.**  
*Reflection:* df = categories − 1, yeh count yaad rakhna padta hai.

**Example 4 — F-test for equality of variances**  
*Given:* Two samples, s1²=25 (n1=15), s2²=10 (n2=12).  
\[
F = 25/10 = 2.5, \quad df_1=14, df_2=11
\]  
Critical value at 0.05 ≈3.0.  
**Final answer: Variances not significantly different.**  
*Reflection:* F-test sensitive hota hai non-normality ke liye, isliye normality check pehle karna zaroori.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using z-test with unknown \(\sigma\) | Students assume large n fixes everything    | Always check whether \(\sigma\) truly known  |
| Forgetting df for t or F          | Formula mein df count karna bhool jaate hain| Explicitly write df = n−1 or n−k             |
| Applying chi-squared to continuous data without binning | Binning rule yaad nahi rehta                | Equal-probability bins use karo, expected ≥5 |
| One-tailed vs two-tailed confusion | p-value calculation galat ho jaati hai      | Question wording carefully padho             |
| Ignoring normality assumption     | Real data skewed hota hai                   | QQ-plot ya Shapiro-Wilk pehle run karo       |
| Multiple testing without correction | Family-wise error rate badh jaati hai       | Bonferroni ya FDR adjustment apply karo      |

## 7. The textbook-precise statement
Let \(X_1,\dots,X_n\) be i.i.d. \(N(\mu,\sigma^2)\). The z-test rejects \(H_0:\mu=\mu_0\) at level \(\alpha\) when
\[
\left| \frac{\sqrt{n}(\bar{X}-\mu_0)}{\sigma} \right| > z_{\alpha/2}.
\]
When \(\sigma\) unknown, replace \(\sigma\) by \(S\) and use the t-distribution with \(n-1\) degrees of freedom (Casella & Berger, Statistical Inference, 2e, §8.3). The chi-squared goodness-of-fit statistic for k categories is \(\sum (O_i-E_i)^2/E_i \sim \chi^2_{k-1}\) under the null that the multinomial probabilities equal the hypothesized values, provided all \(E_i\geq5\) (ibid., §10.3). The F-test for equality of two normal variances uses the ratio of sample variances and follows an F distribution with \((n_1-1,n_2-1)\) degrees of freedom (ibid., §9.3).

## 8. Visual — diagram or schematic
```
                 Data type & assumptions
                         |
          +--------------+--------------+
          |                             |
      Mean?                       Frequencies?
          |                             |
   Variance known?               Categories ≥5?
      /     \                         |
    Yes     No                     Chi-squared
     |       |                           GOF
   z-test   t-test
                     |
                 Variances?
                     |
                 F-test
```
Yeh flowchart aapko turant test choose karne deta hai.

## 9. The memory technique
**The hook:** Imagine four guards at a castle gate: Z (tall, known height), T (short, unknown height), Chi (counting coloured stones), F (comparing two towers’ sway). Har guard ka apna measuring tape hai.

**What to overlearn:**  
- z = \((\bar x - \mu_0)/(\sigma/\sqrt n)\)  
- t uses s instead of \(\sigma\), df = n−1  
- \(\chi^2\) df = categories − 1, expected ≥5  
- F = larger variance / smaller variance

**Spaced-repetition schedule:** Review formulas day 1, 3, 7, 16, 35.

**First-principles fallback:** Agar formula bhool jaaye to sampling distribution derive karo — sample mean ka variance \(\sigma^2/n\) hota hai, usko standardise karke N(0,1) ya t, \(\chi^2\), F mil jaata hai.

## 10. What this unlocks
Yeh tests aapko regression coefficients ke significance, ANOVA tables, aur likelihood-ratio tests samajhne ka foundation dete hain.  
- Linear regression t-tests  
- One-way ANOVA F-tests  
- Goodness-of-fit for GLM residuals  
- Sequential analysis aur sequential probability ratio tests

## 11. Self-check — five questions, no answers
1. Ek sample mean 105, n=25, s=10, \(\mu_0=100\) ke liye t-statistic aur df likho.  
2. Agar chi-squared test mein ek bin ka expected count 3 hai, aap kya karoge?  
3. z-test aur t-test mein se kaunsa zyada conservative hai chhote samples ke liye aur kyun?  
4. F-test ke liye dono samples normal hon zaroori kyun hai?  
5. Multiple pairwise t-tests karne par family-wise error rate kaise control karoge?