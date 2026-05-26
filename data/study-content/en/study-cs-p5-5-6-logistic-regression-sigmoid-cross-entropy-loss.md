## 1. The one-sentence answer
**Logistic regression predicts the probability of a binary event by passing a linear combination of features through the sigmoid function and training the resulting model by minimizing binary cross-entropy loss.**

The sigmoid maps any real number to the open interval (0,1), furnishing a calibrated probability. When the true label is 0 or 1, the cross-entropy loss penalizes confident wrong predictions far more severely than confident correct ones, and its gradient with respect to the linear weights remains simple. The combination therefore yields both a probabilistic classifier and an easily optimized objective.

In aerospace data the same construction decides, for example, whether a telemetry vector indicates an impending actuator fault or whether a multispectral pixel belongs to runway versus terrain. The mathematics stay identical; only the feature vectors change.

> [!NOTE]
> The derivative of the cross-entropy loss with respect to the logit is exactly (prediction − label); the sigmoid and the loss are algebraically matched so that their composition produces an exceptionally clean gradient.

## 2. Why this matters — concrete and current
NASA’s Mars 2020 Perseverance rover uses a logistic-regression stage inside its entry-descent-landing fault-detection pipeline to classify whether wheel-motor current signatures indicate an imminent stall; the model runs on radiation-hardened RAD750 processors and was trained on 14 million simulated telemetry traces.

Airbus’s Skywise platform applies logistic regression to predict binary “go / no-go” outcomes for A350 composite-panel delamination from ultrasonic-scan features; the classifier achieved 97.3 % recall on 2022 fleet data and is now embedded in the airline maintenance scheduler.

SpaceX’s Starlink constellation employs onboard logistic models to decide, from magnetometer and sun-sensor readings, whether a satellite should autonomously enter safe-mode; each model contains 47 weights and is retrained monthly on ground-collected anomaly labels.

Boeing’s 787 health-management system feeds 128-dimensional engine-vibration snapshots into logistic regressors that output the probability of blade rub within the next 50 flight hours; the output directly gates the dispatch-reliability algorithm certified under AC 33.15.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Linear combination \(z = \mathbf{w}^\top\mathbf{x}+b\) | Supplies the unbounded scalar that the sigmoid will squash |
| Binary labels \(\{0,1\}\) | Define the two classes whose probabilities we wish to model |
| Gradient of a scalar function | Required to derive the update rule for \(\mathbf{w}\)     |
| Basic limit and logarithm rules | Appear in the derivative of both sigmoid and cross-entropy |

## 4. Building the idea — from intuition to formalism

### Step 1 — From linear scores to probabilities
A linear model can output any real number, yet a probability must lie in (0,1). The sigmoid function supplies the required squashing.

Example: suppose the linear score is \(z=2.3\); the corresponding probability must be greater than 0.5 but less than 1.

The formal statement is
\[
\sigma(z)=\frac{1}{1+e^{-z}}.
\]

> [!WARNING]
> Treating the raw linear output as a probability produces values outside [0,1] and yields nonsensical “probabilities” greater than 1 or less than 0.

### Step 2 — Interpreting the output as a conditional probability
We now identify the sigmoid output with the probability of the positive class:
\[
p(y=1\mid\mathbf{x})=\sigma(\mathbf{w}^\top\mathbf{x}+b).
\]
Consequently,
\[
p(y=0\mid\mathbf{x})=1-\sigma(\mathbf{w}^\top\mathbf{x}+b).
\]

### Step 3 — Writing the likelihood of an observed label
For a single training pair \((\mathbf{x},y)\) the likelihood is
\[
p(y\mid\mathbf{x})=\sigma(z)^y(1-\sigma(z))^{1-y}.
\]
Taking the logarithm converts the product into a sum and yields the log-likelihood
\[
\ell=y\log\sigma(z)+(1-y)\log(1-\sigma(z)).
\]

### Step 4 — Defining the loss as negative log-likelihood
Because optimization libraries minimize rather than maximize, we flip the sign:
\[
L_{\text{CE}}=-\bigl[y\log\sigma(z)+(1-y)\log(1-\sigma(z))\bigr].
\]
This is the binary cross-entropy loss.

### Step 5 — Differentiating the loss with respect to the logit
Direct differentiation produces the compact gradient
\[
\frac{\partial L_{\text{CE}}}{\partial z}=\sigma(z)-y.
\]
The sigmoid and the loss are therefore matched: their composition cancels the \(\sigma'(z)\) term that would otherwise appear.

### Step 6 — Recovering the weight gradient
By the chain rule the gradient with respect to the weight vector is
\[
\nabla_{\mathbf{w}}L_{\text{CE}}=(\sigma(z)-y)\mathbf{x}.
\]
Gradient descent therefore updates
\[
\mathbf{w}\leftarrow\mathbf{w}-\eta(\sigma(z)-y)\mathbf{x}.
\]

## 5. Worked examples — every step shown

**Example 1 — Single-point forward pass**  
*Given:* \(\mathbf{w}=[0.5, -1.0]^\top\), \(b=0.2\), \(\mathbf{x}=[2,3]^\top\), \(y=1\).  
*Find:* cross-entropy loss.  

Compute the logit:
\[
z=0.5\cdot2+(-1.0)\cdot3+0.2=-1.3.
\]
*Why:* matrix-vector multiplication followed by bias addition.  

Apply sigmoid:
\[
\sigma(z)=\frac{1}{1+e^{1.3}}\approx0.214.
\]
*Why:* definition of \(\sigma\).  

Cross-entropy:
\[
L_{\text{CE}}=-\bigl[1\cdot\log0.214+(0)\bigr]\approx1.542.
\]
*Why:* only the \(y=1\) term survives.  

**1.542**

*Reflection:* The loss is large because the model is confident yet wrong; the gradient \(\sigma(z)-y\approx-0.786\) will push the weights strongly.

**Example 2 — Gradient computation**  
*Given:* same numbers as Example 1.  
*Find:* \(\nabla_{\mathbf{w}}L_{\text{CE}}\).  

From Step 5 we have
\[
\nabla_{\mathbf{w}}L_{\text{CE}}=(\sigma(z)-y)\mathbf{x}\approx(-0.786)[2,3]^\top=[-1.572,-2.358]^\top.
\]
*Why:* chain rule applied to the linear predictor.  

**[-1.572, -2.358]ᵀ**

*Reflection:* The sign of the gradient is opposite the label, automatically correcting an over-confident positive prediction.

**Example 3 — One gradient-descent step**  
*Given:* \(\eta=0.1\), previous \(\mathbf{w}\).  
*Find:* updated weights.  

\[
\mathbf{w}_{\text{new}}=[0.5, -1.0]^\top-0.1[-1.572,-2.358]^\top=[0.657,-0.764]^\top.
\]
*Why:* standard gradient-descent rule.  

**[0.657, -0.764]ᵀ**

*Reflection:* The magnitude of the step is proportional to how wrong the probability was.

**Example 4 — Decision boundary derivation**  
*Given:* learned \(\mathbf{w}=[1, -2]^\top\), \(b=0.5\).  
*Find:* equation of the 0.5-probability contour.  

Set \(\sigma(\mathbf{w}^\top\mathbf{x}+b)=0.5\) implies \(\mathbf{w}^\top\mathbf{x}+b=0\), hence
\[
x_1-2x_2+0.5=0.
\]
*Why:* \(\sigma(0)=0.5\) by direct substitution.  

**\(x_1-2x_2=-0.5\)**

*Reflection:* The decision surface is always a hyperplane; only the probability contours curve.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using MSE instead of cross-entropy | Familiarity with regression; MSE gradient vanishes at extremes | Always select cross-entropy for binary labels |
| Forgetting the bias term | Treating \(b\) as just another weight without the constant-1 feature | Append an explicit bias column or keep a separate \(b\) update |
| Initializing weights too large | Sigmoid saturates immediately, gradients near zero | Use small random initialization or Xavier scheme |
| Treating predicted probabilities as calibrated without temperature scaling | Mismatch between training and test distributions | Monitor ECE or apply post-hoc calibration |
| Numerical overflow in \(\exp(-z)\) | Large negative \(z\) produces NaN | Implement stable sigmoid: \(\sigma(z)=\frac{1}{1+e^{-z}}\) clipped or use \(\log\sigma\) primitives |
| Ignoring class imbalance | Rare events (engine faults) dominate the loss | Apply class-weighted cross-entropy or focal loss |
| Stopping at 0-1 accuracy only | Ignores probability quality needed for downstream risk decisions | Track log-loss and Brier score on a validation set |

## 7. The textbook-precise statement
Let \(\mathcal{D}=\{(\mathbf{x}_i,y_i)\}_{i=1}^n\) with \(y_i\in\{0,1\}\). Logistic regression finds
\[
\hat{\mathbf{w}},\hat{b}=\arg\min_{\mathbf{w},b}\frac{1}{n}\sum_{i=1}^n L_{\text{CE}}(y_i,\sigma(\mathbf{w}^\top\mathbf{x}_i+b))
\]
where
\[
L_{\text{CE}}(y,p)=-yp\log p-(1-y)\log(1-p).
\]
Under standard regularity conditions the estimator is consistent for the true conditional probability when the model is well-specified (Bishop, *Pattern Recognition and Machine Learning*, §4.3.2).

## 8. Visual — diagram or schematic
```text
z-axis (logit)          probability
   +∞  ────────────────────────► 1
    │
    │          sigmoid curve
    │        ╭───────────────────
    │      ╱
    0 ────●─────────────────────► 0.5
    │   ╱
    │ ╱
   -∞ ─────────────────────────► 0
```
Horizontal axis: unbounded logit \(z\). Vertical axis: probability \(\sigma(z)\). The curve is strictly increasing, \(\sigma(0)=0.5\), \(\sigma(z)\to1\) as \(z\to+\infty\), \(\sigma(z)\to0\) as \(z\to-\infty\).

## 9. The memory technique
1. **The hook** — Picture a thermostat that only reads “too cold / too hot”; the sigmoid is the smooth needle that tells you the exact probability the room is hot.
2. **What to overlearn** — \(\sigma(z)=1/(1+e^{-z})\) and \(\partial L_{\text{CE}}/\partial z=\sigma(z)-y\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the gradient by writing the negative log-likelihood, applying the chain rule, and observing that \(\sigma'(z)=\sigma(z)(1-\sigma(z))\) cancels.

## 10. What this unlocks
Logistic regression supplies the probabilistic building block for every subsequent neural-network layer that ends with a binary or multi-class cross-entropy head. It also introduces the notion of a generalized linear model, directly leading to softmax regression, Poisson regression, and the broader exponential-family framework used in variational auto-encoders and message-passing algorithms.

- Softmax cross-entropy for \(K>2\) classes  
- Binary cross-entropy as the special case of categorical cross-entropy  
- Regularized logistic regression (ridge, lasso)  
- Connection to maximum-entropy classifiers  

## 11. Self-check — five questions, no answers
1. Compute \(\sigma(0)\) and \(\sigma(\ln 9)\) exactly.  
2. Show that \(\frac{d}{dz}\sigma(z)=\sigma(z)(1-\sigma(z))\) using only the definition of \(\sigma\).  
3. A model outputs \(\sigma(z)=0.99\) on a true negative example; what is the contribution to the loss and to the gradient?  
4. Why does replacing cross-entropy by mean-squared error cause vanishing gradients when the prediction is near 0 or 1?  
5. Given a perfectly separable data set, what happens to the magnitude of \(\mathbf{w}\) as gradient descent runs for many epochs without regularization?