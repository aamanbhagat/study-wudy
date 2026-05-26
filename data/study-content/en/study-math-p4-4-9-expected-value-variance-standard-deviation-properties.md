## 1. The one-sentence answer
**Expected value is a linear operator on random variables, variance is quadratic under scaling and additive only under independence, and standard deviation is the positive square root of variance.**

These three quantities therefore decompose linear combinations of random variables in a controlled way. Expectation passes through any finite sum or scalar multiple without further conditions. Variance, by contrast, squares every scalar coefficient and requires uncorrelatedness before it passes through a sum. Standard deviation inherits the same quadratic scaling but returns to the original units of the random variable.

The decisive insight is that linearity of expectation holds regardless of dependence, while variance does not; this single asymmetry governs almost every later result in probability.

> [!NOTE]
> The single most powerful move in the subject is to replace a complicated random variable by a sum of indicator variables; linearity of expectation then gives the mean instantly, even when dependence prevents any simple variance formula.

## 2. Why this matters — concrete and current
In quantitative finance, Black–Scholes–Merton option pricing reduces the value of a European call to an expectation under the risk-neutral measure; the variance of the underlying log-price process directly determines the hedge ratios that investment banks recalibrate thousands of times per second.

In semiconductor yield analysis, Intel models the total number of defective dies on a wafer as a sum of indicator random variables for each die; linearity of expectation supplies the expected yield even though spatial correlation among defects makes the variance calculation far harder.

In reinforcement learning, the policy-gradient theorem expresses the gradient of expected return as an expectation of a score function times a return random variable; variance-reduction techniques such as baselines are derived precisely from the scaling rules for variance under addition of constants.

In high-energy physics, the ATLAS experiment at CERN estimates the mass of the Higgs boson from a linear combination of calorimeter energy deposits; the variance of that estimator scales with the square of the calibration constants, dictating the luminosity required to reach a five-sigma discovery threshold.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Random variable          | The objects on which expectation and variance act         |
| Probability mass/density function | Supplies the weights inside every definition of E and Var |
| Finite additivity of probability | Guarantees that linearity survives countable sums         |
| Basic summation and integration | The explicit formulas that must be manipulated            |

## 4. Building the idea — from intuition to formalism

### Step 1 — Expectation as a weighted average
Expectation replaces every possible value of a random variable by its probability-weighted centre of mass. For a discrete random variable taking values \(x_i\) with probabilities \(p_i\), the centre of mass is exactly the ordinary arithmetic mean with those weights.  
\[
\mathbb{E}[X] = \sum_i x_i p_i
\]
If the weights are altered or the values are shifted by a constant, the centre of mass moves exactly as the same linear combination of the original centres would predict.  
> [!WARNING]
> Treating \(\mathbb{E}[X]\) as “the most likely value” fails as soon as the distribution is skewed; the definition never refers to mode or median.

### Step 2 — Linearity without independence
Because the defining sum (or integral) is itself linear, any linear combination of random variables may be passed inside the expectation operator term by term.  
\[
\mathbb{E}[aX + bY] = a\mathbb{E}[X] + b\mathbb{E}[Y]
\]
The identity holds whether \(X\) and \(Y\) are dependent or not; dependence affects only higher moments.  
> [!WARNING]
> Students who insert an independence assumption here will later be unable to compute expectations of indicator sums on graphs or grids.

### Step 3 — Variance as expected squared deviation
Variance records average squared distance from the mean and is therefore always non-negative.  
\[
\operatorname{Var}(X) = \mathbb{E}[(X - \mathbb{E}[X])^2]
\]
Algebraic expansion immediately yields the computational form  
\[
\operatorname{Var}(X) = \mathbb{E}[X^2] - (\mathbb{E}[X])^2.
\]
> [!WARNING]
> Omitting the square produces a quantity that can be negative and is therefore not a variance.

### Step 4 — Quadratic scaling under multiplication by a constant
Replace \(X\) by \(aX\) inside the definition: every deviation is multiplied by \(a\), hence every squared deviation by \(a^2\).  
\[
\operatorname{Var}(aX) = a^2\operatorname{Var}(X)
\]
Adding a constant leaves deviations unchanged, so  
\[
\operatorname{Var}(X + c) = \operatorname{Var}(X).
\]
> [!WARNING]
> Using a linear factor \(|a|\) instead of \(a^2\) confuses variance with standard deviation.

### Step 5 — Additivity of variance only under uncorrelatedness
Expand \(\operatorname{Var}(X+Y)\). The cross term is twice the covariance. Covariance vanishes precisely when \(X\) and \(Y\) are uncorrelated.  
\[
\operatorname{Var}(X+Y) = \operatorname{Var}(X) + \operatorname{Var}(Y) + 2\operatorname{Cov}(X,Y)
\]
Independence implies uncorrelatedness, but the converse is false.  
> [!WARNING]
> Asserting additivity of variance for any pair of random variables is the single most common source of error in later calculations involving dependent indicators.

### Step 6 — Standard deviation as the natural scale
Standard deviation is defined to be the positive square root of variance, restoring the original units of \(X\). All scaling rules for standard deviation therefore contain a single absolute value rather than a square.  
\[
\sigma_{aX} = |a|\sigma_X
\]
This completes the passage from the intuitive notion of “average size of fluctuation” to the precise algebraic properties required for proofs.

## 5. Worked examples — every step shown

**Example 1 — Single Bernoulli random variable**  
*Given:* \(X\sim\operatorname{Bernoulli}(p)\).  
*Find:* \(\mathbb{E}[X]\) and \(\operatorname{Var}(X)\).  

\[
\mathbb{E}[X] = 0\cdot(1-p) + 1\cdot p = p
\]  
*Why:* direct application of the definition.  

\[
\mathbb{E}[X^2] = 0^2\cdot(1-p) + 1^2\cdot p = p
\]  
*Why:* \(X^2 = X\) for any Bernoulli.  

\[
\operatorname{Var}(X) = p - p^2 = p(1-p)
\]  
*Why:* computational formula.  

**\(p(1-p)\)**

*Reflection:* The identity \(X^2 = X\) is special to 0-1 variables and simplifies many indicator calculations.

**Example 2 — Linear transformation**  
*Given:* \(X\) with \(\mathbb{E}[X]=3\), \(\operatorname{Var}(X)=4\).  
*Find:* \(\mathbb{E}[2X-5]\) and \(\operatorname{Var}(2X-5)\).  

\[
\mathbb{E}[2X-5] = 2\cdot3 + (-5) = 1
\]  
*Why:* linearity, Step 2.  

\[
\operatorname{Var}(2X-5) = 2^2\cdot4 = 16
\]  
*Why:* quadratic scaling and translation invariance, Steps 4.  

**1 and 16**

*Reflection:* Constants disappear from variance but survive in the mean; forgetting either produces inconsistent units.

**Example 3 — Sum of two independent variables**  
*Given:* \(X,Y\) independent, \(\mathbb{E}[X]=5\), \(\mathbb{E}[Y]=7\), \(\operatorname{Var}(X)=1\), \(\operatorname{Var}(Y)=4\).  
*Find:* \(\mathbb{E}[X+Y]\) and \(\operatorname{Var}(X+Y)\).  

\[
\mathbb{E}[X+Y] = 5+7 = 12
\]  
*Why:* linearity regardless of independence.  

\[
\operatorname{Var}(X+Y) = 1+4 = 5
\]  
*Why:* uncorrelatedness follows from independence, Step 5.  

**12 and 5**

*Reflection:* Independence was used only for the variance step; the mean step would have been identical without it.

**Example 4 — Correlated indicators**  
*Given:* Two indicators \(I_A,I_B\) with \(P(A)=P(B)=1/2\), \(P(A\cap B)=1/3\).  
*Find:* \(\operatorname{Var}(I_A+I_B)\).  

\[
\mathbb{E}[I_A+I_B] = 1/2 + 1/2 = 1
\]  
*Why:* linearity.  

\[
\operatorname{Var}(I_A) = (1/2)(1/2)=1/4
\]  
*Why:* Bernoulli formula.  

\[
\operatorname{Cov}(I_A,I_B) = \mathbb{E}[I_AI_B] - (1/2)(1/2) = 1/3 - 1/4 = 1/12
\]  
*Why:* definition of covariance.  

\[
\operatorname{Var}(I_A+I_B) = 1/4 + 1/4 + 2\cdot(1/12) = 2/3
\]  
*Why:* full expansion, Step 5.  

**2/3**

*Reflection:* Positive correlation inflates the variance of the sum above the independent benchmark; the calculation never assumed independence.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using \(\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)\) without checking correlation | Over-generalisation from the independent case       | Always expand the covariance term first              |
| Confusing \(\sigma_{aX}\) with \(a\sigma_X\) when \(a<0\) | Forgetting that scale must remain positive          | Insert absolute value explicitly                     |
| Treating \(\mathbb{E}[X^2]\) as \((\mathbb{E}[X])^2\) | Notation collision                                  | Compute the two quantities on separate lines         |
| Applying linearity to conditional expectation without the tower property | Over-extension of unconditional rules               | Verify the conditioning sigma-algebra                |
| Reporting variance in the original units of \(X\) | Habit from descriptive statistics                   | Always square the units when stating variance        |
| Assuming every pair of uncorrelated variables is independent | Converse of “independence implies uncorrelated”     | Construct counter-examples (e.g., \(X\) and \(X^2\) on symmetric distributions) |
| Forgetting that \(\operatorname{Var}(c)=0\) for constant \(c\) | Implicitly treating constants as random             | Replace every constant by a degenerate random variable |

## 7. The textbook-precise statement
Let \(X,Y\) be random variables on a common probability space with finite second moments. Then  
\[
\mathbb{E}[aX+bY]=a\mathbb{E}[X]+b\mathbb{E}[Y]
\]  
for all real constants \(a,b\), and  
\[
\operatorname{Var}(aX+b)=\,a^2\operatorname{Var}(X).
\]  
If in addition \(\operatorname{Cov}(X,Y)=0\), then  
\[
\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y).
\]  
Standard deviation is the non-negative square root of variance. (Grimmett & Stirzaker, *Probability and Random Processes*, 4e, §3.3, Theorems 3.3.1–3.3.3.)

## 8. Visual — diagram or schematic
```text
                E[aX+bY] = a E[X] + b E[Y]          (always)
                           │
                           ▼
                Var(aX+b) = a² Var(X)               (always)
                           │
                           ▼
          Cov(X,Y)=0 ?  ──yes──► Var(X+Y)=Var(X)+Var(Y)
                           │
                          no
                           ▼
          Var(X+Y)=Var(X)+Var(Y)+2 Cov(X,Y)
```
The diagram is a decision tree: linearity of expectation is unconditional; variance scaling is unconditional; additivity of variance branches on the covariance test.

## 9. The memory technique

1. **The hook** — Picture expectation as a perfectly balanced see-saw that never cares who is sitting next to whom; variance is the same see-saw after every distance has been squared, so neighbours now affect the total torque quadratically.
2. **What to overlearn** — \(\mathbb{E}[aX+bY]=a\mathbb{E}X+b\mathbb{E}Y\), \(\operatorname{Var}(aX)=a^2\operatorname{Var}(X)\), \(\operatorname{Var}(X+Y)=\operatorname{Var}X+\operatorname{Var}Y+2\operatorname{Cov}(X,Y)\).
3. **Spaced-repetition schedule** — Review the three displayed identities at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.
4. **First-principles fallback** — Return to the integral definition of expectation, expand \(\mathbb{E}[(aX+bY-c)^2]\) algebraically, and collect terms; every property reappears automatically.

## 10. What this unlocks
These algebraic rules are the sole justification for treating sample means and sample variances as random variables in their own right, thereby opening the door to the weak and strong laws of large numbers, the central limit theorem, and all subsequent asymptotic statistics. They also supply the moment calculations required for characteristic functions, moment-generating functions, and the multivariate normal distribution.

- Laws of large numbers
- Central limit theorem and delta method
- Chebyshev, Markov, and Chernoff bounds
- Multivariate normal covariance matrices
- Analysis of variance (ANOVA) decompositions

## 11. Self-check — five questions, no answers
1. Let \(X\) be uniform on \(\{1,2,3\}\). Compute \(\operatorname{Var}(3X+7)\) without first finding the distribution of \(3X+7\).
2. Two indicators \(I\) and \(J\) satisfy \(\mathbb{E}[I+J]=1.4\) and \(\operatorname{Var}(I+J)=0.9\). Is it possible that \(\operatorname{Cov}(I,J)<0\)? Prove or disprove.
3. If \(\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)\), must \(X\) and \(Y\) be independent? Construct a counter-example or prove the claim.
4. Show that \(\operatorname{Var}(X)=\mathbb{E}[X(X-1)]+\mathbb{E}[X]-(\mathbb{E}[X])^2\) and explain why the first term is useful for non-negative integer-valued random variables.
5. A random variable satisfies \(\mathbb{E}[X]=0\) and \(\mathbb{E}[X^2]=1\). What is the largest possible value of \(\mathbb{E}[|X|]\)?