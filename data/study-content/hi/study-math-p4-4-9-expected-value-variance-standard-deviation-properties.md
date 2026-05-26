## 1. The one-sentence answer
**Expected value, variance and standard deviation obey a small set of algebraic properties that let you compute them for linear combinations without rebuilding the whole distribution each time.**

Expected value is linear: if you scale a random variable by a constant or add two random variables, the expectation scales or adds accordingly, regardless of dependence. Variance is quadratic: it scales by the square of the constant and adds only when the variables are uncorrelated. Standard deviation is simply the positive square root of variance and therefore inherits the same scaling behaviour but loses the additivity property.

These rules turn long summation tables into short algebraic manipulations. Once you internalise them you can move from a single coin toss to the sum of a thousand biased coins in a few lines instead of a thousand.

> [!NOTE]
> The deepest “aha” is that linearity of expectation survives dependence; most students assume independence is required and therefore miss the power of the property in problems like the hat-check or matching problems.

## 2. Why this matters — concrete and current
In quantitative finance, portfolio variance is computed daily at firms such as Jane Street and Two Sigma using exactly the rule \(\mathrm{Var}(aX+bY)=a^2\mathrm{Var}(X)+b^2\mathrm{Var}(Y)+2ab\mathrm{Cov}(X,Y)\); a single misapplied covariance term can shift risk forecasts by millions of dollars.

In semiconductor yield analysis, Intel models total defect count on a wafer as the sum of several spatially correlated Poisson processes; linearity of expectation gives the mean defect count instantly even though the indicators are dependent, allowing real-time process control without Monte-Carlo each lot.

In reinforcement learning, the value function of a policy is the expected sum of discounted rewards; the linearity property lets the Bellman operator be written as a simple matrix equation, which is why libraries such as Stable-Baselines3 can solve 100 000-state MDPs in seconds.

In particle-physics experiments at CERN, the total energy deposited in the calorimeter is the sum of energies from many tracks; variance-additivity under independence lets analysts propagate resolution uncertainties from individual silicon sensors to the final four-momentum measurement without resimulating every collision.

In A/B testing platforms at Meta and Google, the variance of the difference of two sample means is obtained by scaling the individual variances; this single line determines whether an experiment is powered to detect a 0.1 % lift, directly affecting product decisions worth tens of millions in annual revenue.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Random variable          | The objects whose expectation and variance we manipulate  |
| Probability mass/density function | Needed to write the formal definitions we will later simplify |
| Summation and integral rules | Expectation and variance are defined via sums/integrals; algebraic properties follow from rearranging those sums |
| Independence vs. uncorrelated | Distinguishes when variance adds cleanly                |

If any row above is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Linearity of expectation for a constant multiple
Aap expect karte ho ki agar har outcome ko \(c\) se multiply kar do to uska average bhi \(c\) guna ho jaayega. Yeh bilkul sahi hai aur kisi bhi dependence par depend nahi karta.

Example: let \(X\) be the outcome of a fair die. Then \(2X\) doubles every face, so its expectation must be twice that of \(X\).

Formally,
\[
\mathbb{E}[cX]=c\mathbb{E}[X].
\]

> [!WARNING]
> Agar aap yeh step galat samajh lein aur sirf positive \(c\) ke liye soch lein, to negative scaling (loss calculations) mein sign error ho jaayega.

### Step 2 — Additivity of expectation
Do alag random variables \(X\) aur \(Y\) ke expectations ko add kar sakte hain chahe woh dependent hon.

Example: number of heads in first coin plus number of heads in second coin; total expected heads is sum of individuals even if coins are glued together.

Formally,
\[
\mathbb{E}[X+Y]=\mathbb{E}[X]+\mathbb{E}[Y].
\]

> [!WARNING]
> Students often insert an independence assumption here unnecessarily and then cannot solve matching problems.

### Step 3 — Scaling variance by a constant
Variance mein square aata hai kyunki deviation ko square kiya jaata hai; isliye \(c\) factor \(c^2\) ban jaata hai.

Formally,
\[
\mathrm{Var}(cX)=c^2\mathrm{Var}(X).
\]

> [!WARNING]
> Agar aap \(c^2\) ki jagah \(c\) likh dein to standard deviation galat scale hogi aur confidence intervals collapse ho jaayenge.

### Step 4 — Additivity of variance under uncorrelatedness
Agar \(\mathrm{Cov}(X,Y)=0\) to variances add hote hain.

Formally,
\[
\mathrm{Var}(X+Y)=\mathrm{Var}(X)+\mathrm{Var}(Y).
\]

> [!WARNING]
> Covariance zero ko independence ke barabar mat samajhna; dependence ho sakti hai phir bhi variance add ho sakti hai.

### Step 5 — Standard deviation as derived quantity
Standard deviation \(\sigma=\sqrt{\mathrm{Var}(X)}\) hai; isliye scaling rule \(\sigma_{cX}=|c|\sigma_X\) ban jaata hai.

### Step 6 — General linear combination
Combining all prior steps gives the textbook formula for \(\mathbb{E}[aX+bY]\) and \(\mathrm{Var}(aX+bY)\).

## 5. Worked examples — har step show karo

**Example 1 — Simple scaling**
*Given:* \(X\) takes values 1 and 3 with probability 1/2 each; \(\mathbb{E}[X]=2\), \(\mathrm{Var}(X)=1\).
*Find:* \(\mathbb{E}[3X]\) and \(\mathrm{Var}(3X)\).

Step 1: \(\mathbb{E}[3X]=3\mathbb{E}[X]\) by linearity.  
*Why:* scaling property derived from definition of expectation.  
Step 2: \(\mathrm{Var}(3X)=9\mathrm{Var}(X)\) by quadratic scaling.  
*Why:* constant comes out squared from the squared deviation.

**Final answer**  
\(\mathbb{E}[3X]=6\), \(\mathrm{Var}(3X)=9\).

*Reflection:* The example is easy yet forces you to remember the square on variance; generalises immediately to any constant.

**Example 2 — Sum of two independent variables**
*Given:* Two independent fair dice \(X,Y\).
*Find:* \(\mathbb{E}[X+Y]\) and \(\mathrm{Var}(X+Y)\).

Step 1: \(\mathbb{E}[X+Y]=\mathbb{E}[X]+\mathbb{E}[Y]=7\).  
*Why:* additivity holds regardless of independence.  
Step 2: \(\mathrm{Var}(X+Y)=\mathrm{Var}(X)+\mathrm{Var}(Y)=2\times\frac{35}{12}\).  
*Why:* independence implies zero covariance, so variance adds.

**Final answer**  
\(\mathbb{E}[X+Y]=7\), \(\mathrm{Var}(X+Y)=\frac{35}{6}\).

*Reflection:* Independence was used only for variance; expectation works even if dice are dependent.

**Example 3 — Linear combination with covariance**
*Given:* \(\mathrm{Cov}(X,Y)=2\), \(\mathrm{Var}(X)=3\), \(\mathrm{Var}(Y)=4\).
*Find:* \(\mathrm{Var}(2X-3Y)\).

Step 1: expand using bilinearity of variance.  
Step 2: \(\mathrm{Var}(2X-3Y)=4\cdot3+9\cdot4-2\cdot2\cdot3\cdot(-3)\).  
*Why:* cross term carries the sign of the coefficients.

**Final answer**  
\(\mathrm{Var}(2X-3Y)=126\).

*Reflection:* Sign error in the covariance term is the most common algebraic slip.

**Example 4 — Indicator variables (advanced)**
*Given:* 10 people throw hats randomly; let \(X_i=1\) if person \(i\) gets own hat.
*Find:* \(\mathbb{E}[\sum X_i]\) and \(\mathrm{Var}(\sum X_i)\).

Step 1: linearity gives \(\mathbb{E}[\sum X_i]=\sum\mathbb{E}[X_i]=1\).  
Step 2: variance requires pairwise covariances because indicators are dependent.  
Step 3: compute \(\mathrm{Cov}(X_i,X_j)=\frac{1}{10\cdot9}-\frac{1}{100}\) for \(i\neq j\).

**Final answer**  
\(\mathbb{E}[X]=1\), \(\mathrm{Var}(X)\approx0.1\).

*Reflection:* Dependence appears but expectation still collapses to 1 instantly.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                              |
|-------------------------------------|---------------------------------------------|----------------------------------------------|
| Using \(\mathrm{Var}(X+Y)=\mathrm{Var}(X)+\mathrm{Var}(Y)\) without checking covariance | Students forget covariance term             | Always write the full expansion first        |
| Forgetting the square on scaling factor for variance | Confusion between expectation and variance scaling | Write \(c^2\) explicitly every time          |
| Treating \(\sigma_{X+Y}=\sigma_X+\sigma_Y\) | Believing standard deviation is linear      | Remember it is a square root; additivity fails |
| Sign error in \(\mathrm{Cov}(aX,bY)=ab\mathrm{Cov}(X,Y)\) | Missing product of coefficients             | Factor coefficients before applying covariance |
| Assuming zero covariance implies independence | Over-generalising uncorrelatedness          | Keep the logical direction one-way           |
| Computing \(\mathbb{E}[X^2]\) instead of \(\mathrm{Var}(X)\) when asked for variance | Notation overload                           | Write definition \(\mathrm{Var}(X)=\mathbb{E}[X^2]-(\mathbb{E}[X])^2\) each time |

## 7. The textbook-precise statement
Let \(X\) and \(Y\) be random variables with finite second moments and let \(a,b\in\mathbb{R}\). Then
\[
\mathbb{E}[aX+bY]=a\mathbb{E}[X]+b\mathbb{E}[Y]
\]
and
\[
\mathrm{Var}(aX+bY)=a^2\mathrm{Var}(X)+b^2\mathrm{Var}(Y)+2ab\mathrm{Cov}(X,Y).
\]
If \(\mathrm{Cov}(X,Y)=0\) the covariance term vanishes. (Ross, *A First Course in Probability*, 10e, §3.3 and §7.2.)

## 8. Visual

```text
X ----(scale a)----> aX
Y ----(scale b)----> bY
       |               |
       +-----(add)-----> aX + bY
                     E: aE[X]+bE[Y]
                     Var: a²VarX + b²VarY + 2abCov
```

## 9. The memory technique
**The hook** — picture two balloons tied together: expectation stretches linearly like rubber, variance stretches quadratically like area.

**What to overlearn** — \(\mathbb{E}[aX+bY]=a\mu_X+b\mu_Y\) and \(\mathrm{Var}(aX+bY)=a^2\sigma_X^2+b^2\sigma_Y^2+2ab\mathrm{Cov}\).

**Spaced-repetition schedule** — review after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — return to the definition \(\mathbb{E}[X]=\sum x p(x)\) and expand the sums algebraically; the constants factor out directly.

## 10. What this unlocks
These properties are the foundation for moment-generating functions, the central limit theorem, linear regression, Kalman filtering and modern portfolio theory.

- Moment-generating functions differentiate to give higher moments via the same scaling rules.
- Central-limit-theorem proofs repeatedly apply variance additivity to normalised sums.
- Linear regression coefficients are derived by minimising a variance expression that expands with the covariance term shown above.

## 11. Self-check — five questions, no answers
1. If \(\mathbb{E}[X]=3\) and \(\mathbb{E}[Y]=-1\), compute \(\mathbb{E}[4X-2Y]\).
2. A random variable \(Z=2X\) where \(\mathrm{Var}(X)=5\); what is \(\mathrm{Var}(Z)\)?
3. Two uncorrelated random variables have variances 4 and 9; what is the variance of their sum?
4. Why does \(\mathrm{SD}(X+Y)\) generally not equal \(\mathrm{SD}(X)+\mathrm{SD}(Y)\)?
5. In the hat-check problem with \(n=100\), give the exact variance of the number of fixed points without enumerating all permutations.