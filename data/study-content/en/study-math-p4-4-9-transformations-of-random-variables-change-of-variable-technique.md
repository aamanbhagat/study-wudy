## 1. The one-sentence answer
**The change-of-variable technique obtains the density of a transformed random variable \(Y = g(X)\) by rescaling the original density with the absolute value of the derivative of the inverse map.**

A random variable \(X\) spreads probability mass according to its density \(f_X\). When a strictly monotonic, differentiable function \(g\) maps each outcome \(x\) to a new value \(y\), the same total probability must be preserved, yet the spacing between nearby points changes. The density at \(y\) therefore equals the density at the corresponding \(x\) multiplied by how much the map stretches or compresses intervals.

The factor that encodes this local stretching is precisely \(\left|\frac{dx}{dy}\right|\). Because the transformation may be increasing or decreasing, the absolute value ensures the density remains non-negative. The resulting expression \(f_Y(y) = f_X(g^{-1}(y))\left|\frac{d}{dy}g^{-1}(y)\right|\) therefore gives the exact density of \(Y\).

> [!NOTE]
> The absolute-value derivative is not an extra correction; it is the direct consequence of conserving probability mass under a local linear approximation of \(g\).

## 2. Why this matters — concrete and current
In gravitational-wave astronomy, LIGO converts raw strain time series into frequency-domain amplitudes; the change-of-variable formula yields the exact distribution of signal-to-noise ratios after the nonlinear whitening filter is applied.

In quantitative finance, the transition from arithmetic returns to log-returns is a monotonic transformation; banks and hedge funds use the technique daily to obtain closed-form densities for portfolio losses under geometric Brownian motion.

In semiconductor process control, threshold-voltage measurements are transformed through the subthreshold swing equation; Intel and TSMC employ the resulting densities to set statistical guard-bands that keep chip failure rates below 1 ppb.

In variational autoencoders, the reparameterization trick rewrites a sample from \(\mathcal{N}(\mu,\sigma^2)\) as a deterministic function of a standard normal; the change-of-variable Jacobian supplies the exact density needed for the evidence lower bound.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Cumulative distribution function | Supplies the starting point \(F_X\) before differentiation |
| Probability density function     | The object whose transformation we seek                   |
| Strictly monotonic differentiable functions | Guarantees an inverse exists and the derivative is defined |
| Chain rule and inverse-function derivative | Produces the factor \(\left|\frac{dx}{dy}\right|\)        |

## 4. Building the idea — from intuition to formalism

### Step 1 — Probability is preserved under any re-labeling of outcomes
The total probability assigned to an interval must remain unchanged after the labels of the outcomes are altered by \(g\).  
Example: Suppose \(X\) is uniform on \([0,1]\) and \(Y = 2X\). The interval \([0,0.1]\) for \(X\) maps to \([0,0.2]\) for \(Y\); both must carry probability 0.1.  
Formally, \(P(Y \in g(A)) = P(X \in A)\) for every measurable \(A\).  
> [!WARNING]  
> Omitting the preservation requirement leads to densities that integrate to a value other than 1.

### Step 2 — Local linear approximation converts length distortion into a multiplicative factor
Near any point the map \(g\) behaves like multiplication by its derivative. An infinitesimal interval \(dx\) therefore becomes \(dy = g'(x)\,dx\).  
Example: \(g(x) = x^2\) near \(x=2\) stretches by roughly \(4\,dx\).  
Formally, \(dy = \left|\frac{dg}{dx}\right|dx\).

### Step 3 — Density must compensate for the length change
Because probability = density \(\times\) length, the new density satisfies \(f_Y(y)\,dy = f_X(x)\,dx\). Solving for \(f_Y\) inserts the factor \(\left|\frac{dx}{dy}\right|\).  
Example: continuing the square-root map, \(f_Y(y) = f_X(\sqrt{y})\cdot\frac{1}{2\sqrt{y}}\).

### Step 4 — Express everything in terms of the new variable
Solve \(y = g(x)\) for \(x = g^{-1}(y)\) and substitute; the absolute value of the derivative of the inverse appears automatically.  
Formally, \(f_Y(y) = f_X(g^{-1}(y))\left|\frac{d}{dy}g^{-1}(y)\right|\).

### Step 5 — The textbook statement
If \(g\) is strictly monotonic and continuously differentiable with non-vanishing derivative on the support of \(X\), then the displayed formula of Step 4 is the unique density of \(Y\).

## 5. Worked examples — every step shown

**Example 1 — Linear shift and scale**  
*Given:* \(X\sim\mathrm{Exp}(1)\), \(Y = 3X + 2\).  
*Find:* \(f_Y\).  
Step: \(x = (y-2)/3\), \(\frac{dx}{dy} = 1/3\).  
*Why:* Solve the linear equation for the inverse.  
Step: \(f_Y(y) = e^{-(y-2)/3}\cdot\frac13\) for \(y>2\).  
*Why:* Multiply original density by absolute derivative.  
**\(\boldsymbol{f_Y(y) = \frac13\exp(-(y-2)/3)}\) for \(y>2\)**  
*Reflection:* The constant factor \(1/3\) simply stretches the axis; the exponential tail is translated but keeps the same decay rate.

**Example 2 — Square transformation**  
*Given:* \(X\sim\mathrm{Unif}[0,1]\), \(Y = X^2\).  
*Find:* \(f_Y\).  
Step: \(x = \sqrt{y}\), \(\frac{dx}{dy} = 1/(2\sqrt{y})\).  
*Why:* Inverse is positive branch because support is \([0,1]\).  
Step: \(f_Y(y) = 1\cdot\frac1{2\sqrt{y}}\) for \(0<y<1\).  
**\(\boldsymbol{f_Y(y) = \frac1{2\sqrt{y}}}\) on \((0,1)\)**  
*Reflection:* The density blows up at zero because the map flattens there, squeezing probability mass.

**Example 3 — Reciprocal**  
*Given:* \(X\sim\mathrm{Exp}(1)\), \(Y = 1/X\).  
*Find:* \(f_Y\).  
Step: \(x = 1/y\), \(\frac{dx}{dy} = -1/y^2\). Absolute value \(1/y^2\).  
*Why:* Derivative of inverse carries the sign; absolute value removes it.  
Step: \(f_Y(y) = e^{-1/y}\cdot\frac1{y^2}\) for \(y>0\).  
**\(\boldsymbol{f_Y(y) = y^{-2}\exp(-1/y)}\) for \(y>0\)**  
*Reflection:* The heavy tail at infinity arises because large \(y\) correspond to tiny \(x\) where the exponential is near 1.

**Example 4 — Logistic to uniform**  
*Given:* \(X\) has logistic density \(f_X(x) = e^{-x}/(1+e^{-x})^2\), \(Y = (1+e^{-X})^{-1}\).  
*Find:* \(f_Y\).  
Step: Inverse \(x = \ln(y/(1-y))\), derivative \(1/(y(1-y))\).  
*Why:* Standard inverse of the logistic cdf.  
Step: \(f_Y(y) = 1\) on \((0,1)\).  
**\(\boldsymbol{f_Y(y) = 1}\) on \((0,1)\)**  
*Reflection:* The logistic cdf itself is the transformation that uniformizes any continuous random variable.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                | How to avoid it                              |
|-----------------------------------|-----------------------------------------------|----------------------------------------------|
| Forgetting the absolute value     | Sign of derivative feels “natural”            | Always insert \(\lvert\cdot\rvert\) before substituting |
| Using \(dx/dy\) instead of derivative of inverse | Confuses chain-rule direction                 | Compute \(\frac{d}{dy}g^{-1}(y)\) explicitly |
| Ignoring support boundaries       | New interval is not written down              | State the image of the original support first |
| Applying formula to non-monotonic \(g\) | Multiple pre-images exist                     | Split domain into monotonic pieces           |
| Differentiating cdf instead of using inverse | Extra unnecessary integration                 | Use the direct inverse-derivative route      |
| Dropping the Jacobian in later multivariate work | Habit from univariate case                    | Treat the absolute derivative as the 1-D Jacobian |
| Normalizing after transformation  | Belief that any density needs re-normalization| Verify \(\int f_Y = 1\) once; it holds automatically |

## 7. The textbook-precise statement
Let \(X\) be a continuous random variable with density \(f_X\) that is continuous on an open interval \(I\). Let \(g:I\to\mathbb{R}\) be continuously differentiable and strictly monotonic with \(g'(x)\ne0\) for all \(x\in I\). Then \(Y=g(X)\) admits density
\[
f_Y(y)=f_X(g^{-1}(y))\left|\frac{d}{dy}g^{-1}(y)\right|
\]
on the interval \(g(I)\). (See Billingsley, *Probability and Measure*, 3e, §17.2, Theorem 17.2.)

## 8. Visual — diagram or schematic
```text
x-axis (original)          y-axis (transformed)
   0     1     2     3        0     1     4     9
   |-----|-----|-----|        |-----|-----|-----|
   [===]                 ->   [=========]
     f_X dx                    f_Y dy
     length dx                 length dy = 2x dx
     mass f_X dx               mass f_Y dy = same
```
The vertical arrows show how an interval of length \(dx\) at \(x=2\) maps to an interval of length \(4\,dx\) at \(y=4\); the height of the density must therefore drop by the factor \(1/4\).

## 9. The memory technique
1. **The hook** — Picture a rubber band printed with the density curve; stretching it thins the ink exactly by the local stretch factor \(|dx/dy|\).
2. **What to overlearn** — The formula \(f_Y(y)=f_X(x(y))|dx/dy|\) together with the rule “absolute value of the derivative of the inverse.”
3. **Spaced-repetition schedule** — Review the one-line formula at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from \(F_Y(y)=F_X(g^{-1}(y))\) and differentiate both sides with the chain rule.

## 10. What this unlocks
The technique is the gateway to derived distributions, moment-generating-function manipulations, order-statistic densities, and the multivariate Jacobian change-of-variable formula used in copula modeling and MCMC.

- Transformation of gamma to chi-squared
- Derivation of the F-distribution
- Reparameterization gradients in deep learning
- Derivation of the density of the sample correlation coefficient

## 11. Self-check — five questions, no answers
1. Let \(X\sim\mathrm{Unif}(0,1)\) and \(Y=-\ln X\). Derive \(f_Y\) in one line.
2. A monotonic transformation \(g\) maps an interval of length 0.01 near \(x=3\) onto an interval of length 0.04. By what numerical factor does the density value change?
3. Why does the formula fail when \(g(x)=x^2\) is applied to a random variable supported on \((-1,1)\)?
4. Show that if \(Y=aX+b\) with \(a>0\), then \(f_Y(y)=f_X((y-b)/a)/a\).
5. A student computes the density of \(Y=1/X\) for standard normal \(X\) and obtains a function that integrates to 2. Identify the mistake.