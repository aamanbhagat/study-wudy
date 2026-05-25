## What it is
Logistic regression is a statistical model used for binary classification, which means predicting an outcome that can only be one of two things (e.g., success/fail, go/no-go). Despite its name, it is a classification algorithm, not a regression one. It works by taking a linear combination of input features and passing it through a "sigmoid" function to produce a probability value between 0 and 1.

## Why it matters
This is a foundational algorithm for classification. In aerospace, you will use it to predict binary outcomes like rocket launch success or failure based on weather and sensor data, classify satellite component health as "nominal" or "faulty," or even as a building block in neural networks that identify cosmic phenomena in telescope imagery. Understanding it is non-negotiable for building more complex classifiers.

## When to study it
Before tackling this, you must have a solid grasp of:
1.  **Linear Regression:** You must understand the model $f_{\mathbf{w},b}(\mathbf{x}) = \mathbf{w} \cdot \mathbf{x} + b$. Logistic regression builds directly on this linear core.
2.  **Calculus:** Specifically, partial derivatives and the chain rule. This is essential for understanding how the model learns (gradient descent).
3.  **Probability Theory:** You should be comfortable with the Bernoulli distribution and the principle of Maximum Likelihood Estimation (MLE). We will derive the loss function from MLE.

If you are not confident in these, pause and review them. Hand-waving here will cause confusion later.

## How to study it (step by step)
1.  **The Problem with Linear Regression for Classification:** Take a simple binary dataset (e.g., hours studied vs. pass/fail). Fit a linear regression line. Notice that the output can be greater than 1 or less than 0, which is nonsensical for a probability. This motivates the need for a function that "squashes" the output.
2.  **The Sigmoid Function:** Plot the sigmoid function $\sigma(z) = \frac{1}{1 + e^{-z}}$. Note its domain ($-\infty, \infty$) and range ($(0, 1)$). Calculate its value at $z=0$, $z \to \infty$, and $z \to -\infty$ to build intuition for its squashing behavior.
3.  **Derive the Sigmoid's Derivative:** Using the quotient or chain rule, prove that $\frac{d\sigma}{dz} = \sigma(z)(1-\sigma(z))$. This elegant property is crucial for efficient gradient calculations later.
4.  **From Probability to Loss:** Model the binary outcome $y \in \{0, 1\}$ as a Bernoulli trial. The probability of observing the correct label $y$ given our predicted probability $\hat{y} = \sigma(\mathbf{w} \cdot \mathbf{x} + b)$ is $P(y|\mathbf{x}, \mathbf{w}, b) = \hat{y}^y (1-\hat{y})^{1-y}$.
5.  **Derive Cross-Entropy Loss:** Apply the principle of Maximum Likelihood Estimation. To maximize the likelihood over all data points, we maximize its logarithm (the log-likelihood). Maximizing a function is equivalent to minimizing its negative. Write down the negative log-likelihood for a single data point—this is precisely the cross-entropy loss function.
6.  **Hand-calculate Loss:** Take a single data point $(\mathbf{x}, y)$, some arbitrary weights $\mathbf{w}$, and a bias $b$. Compute $z = \mathbf{w} \cdot \mathbf{x} + b$, then $\hat{y} = \sigma(z)$, and finally the cross-entropy loss $L(\hat{y}, y)$. This makes the formula concrete.

## Key ideas, with intuition
1.  **From Score to Probability:** Linear regression gives you a score, $z = \mathbf{w} \cdot \mathbf{x} + b$. This score can be any real number. A large positive score should mean a high probability of the positive class (1), and a large negative score should mean a low probability. The sigmoid function is the mechanism that formalizes this mapping from score to probability.
    $$
    z = \mathbf{w} \cdot \mathbf{x} + b \quad \xrightarrow{\text{squash}} \quad \hat{y} = \sigma(z) = \frac{1}{1 + e^{-z}}
    $$
2.  **The Loss Function Measures Surprise:** The cross-entropy loss function measures the "surprise" of seeing the true outcome, given your prediction. If the true label is $y=1$ (e.g., "launch success") and you predict a high probability like $\hat{y}=0.99$, your loss, $-\log(0.99)$, is very small. You are not surprised. If you predict a low probability like $\hat{y}=0.01$, your loss, $-\log(0.01)$, is huge. You are very surprised, and the model is penalized heavily.
    $$
    L(\hat{y}, y) = - \big( y \log(\hat{y}) + (1-y) \log(1-\hat{y}) \big)
    $$
    Notice how if $y=1$, the second term vanishes, leaving $-\log(\hat{y})$. If $y=0$, the first term vanishes, leaving $-\log(1-\hat{y})$. It's a clever way to write two separate conditions in one equation.
3.  **Why Not Mean Squared Error?** Using MSE, $(y - \hat{y})^2$, as the loss function seems intuitive, but it creates a non-convex optimization problem when combined with the sigmoid function. This means there could be many local minima, and gradient descent might get stuck. The cross-entropy loss function, derived from MLE, guarantees a convex loss surface for logistic regression, meaning there is only one global minimum to find.

## Worked example
**Problem:** A sensor provides two readings, $x_1=2.0$ and $x_2=-1.0$. We want to predict if a component is faulty ($y=1$) or nominal ($y=0$). Our initial model has weights $\mathbf{w} = [0.5, -0.5]$ and bias $b=0.1$. The true state of the component is faulty ($y=1$). Calculate the model's prediction and its loss for this single data point.

**Step 1: Calculate the linear combination (the score), $z$.**
The model is $z = w_1 x_1 + w_2 x_2 + b$.
$$
z = (0.5)(2.0) + (-0.5)(-1.0) + 0.1
$$
$$
z = 1.0 + 0.5 + 0.1 = 1.6
$$

**Step 2: Apply the sigmoid function to get the predicted probability, $\hat{y}$.**
The prediction is $\hat{y} = \sigma(z) = \frac{1}{1 + e^{-z}}$.
$$
\hat{y} = \frac{1}{1 + e^{-1.6}} \approx \frac{1}{1 + 0.2019} \approx \frac{1}{1.2019} \approx 0.832
$$
The model predicts an 83.2% probability that the component is faulty.

**Step 3: Calculate the cross-entropy loss.**
The loss is $L(\hat{y}, y) = -(y \log(\hat{y}) + (1-y) \log(1-\hat{y}))$. Here, the true label is $y=1$.
$$
L(0.832, 1) = -(1 \cdot \log(0.832) + (1-1) \cdot \log(1-0.832))
$$
$$
L = -(\log(0.832) + 0) = -\log(0.832) \approx -(-0.1839) = 0.1839
$$

**Reflection:**
-   Step 1 combined the input features and model parameters into a single score.
-   Step 2 transformed this unbounded score into a valid probability between 0 and 1.
-   Step 3 quantified how "wrong" this prediction was. Since the prediction (0.832) was close to the true label (1), the loss is a small positive number. If the prediction had been low (e.g., 0.1), the loss would have been much larger ($-\log(0.1) \approx 2.3$).

## Diagrams
The Sigmoid "Squashing" Function:
```text
      ^ P(y=1|z) = σ(z)
      |
  1.0 +------------------------------------------+
      |                                        .
      |                                     .
      |                                  .
  0.5 +---------------- . ----------------+
      |               .
      |            .
      |         .
  0.0 +--------.---------------------------------+--> z (linear score)
           -5        -2.5         0         2.5        5
```
This diagram shows how the sigmoid function takes any real-valued score $z$ and maps it to a probability between 0 and 1. The function is steepest around $z=0$, meaning small changes in the score near the decision boundary have a large impact on the predicted probability.

Cross-Entropy Loss for a Single Example:
```text
      ^ Loss
      |
      |   Loss for y=0: -log(1-p)
 4.0 -+ .
      |   .
      |    .
 2.0 -+     .
      |      .
      |       .
      |        .
 0.0 -+---------+---------+---------+---------+--> p (predicted probability)
      0.0      0.25      0.5       0.75      1.0

      ^ Loss
      |
 4.0 -+                         .
      |                       .
      |                     .
 2.0 -+                   .
      |                 .
      |               .
      |             .
 0.0 -+---------+---------+---------+---------+--> p (predicted probability)
      0.0      0.25      0.5       0.75      1.0
      Loss for y=1: -log(p)
```
These two plots show the penalty. If the true label is 1 (bottom graph), the loss approaches infinity as your prediction $p$ approaches 0. Conversely, if the true label is 0 (top graph), the loss explodes as your prediction approaches 1. The penalty for being confidently wrong is severe.

## Memory technique — remember this forever
1.  **Mnemonic:** "Sigmoid **SQUASHES** a score. Cross-Entropy **SCOLDS** a probability."
2.  **Must-know formulas:** Overlearn these until they are automatic.
    -   Sigmoid function: $$ \sigma(z) = \frac{1}{1 + e^{-z}} $$
    -   Binary Cross-Entropy Loss: $$ L(\hat{y}, y) = -(y \log(\hat{y}) + (1-y) \log(1-\hat{y})) $$
3.  **Spaced Repetition:** Review these formulas and their derivations at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Do not just read them; write them out from memory.
4.  **First Principles Pathway:** If you forget the cross-entropy formula, re-derive it.
    -   The outcome $y \in \{0, 1\}$ is a coin flip (a Bernoulli trial).
    -   The probability of a single outcome is $P(y) = \hat{y}^y (1-\hat{y})^{1-y}$.
    -   The likelihood over the whole dataset is the product of these probabilities. The log-likelihood is the sum of their logs.
    -   Log-likelihood for one point: $\log(P(y)) = y \log(\hat{y}) + (1-y) \log(1-\hat{y})$.
    -   Loss is the *negative* log-likelihood. Add a minus sign. You have rebuilt the formula.

## Common mistakes
1.  **Name Confusion:** Calling logistic regression a "regression" algorithm in conversation. It is a classification algorithm. The name is a historical artifact because its formulation resembles linear regression.
2.  **Using MSE Loss:** Attempting to use Mean Squared Error for the loss function. This leads to a non-convex optimization problem with many local minima, which will prevent gradient descent from finding the optimal weights. Always use cross-entropy for logistic regression.
3.  **Misinterpreting Outputs as Certainties:** The output $\hat{y}$ is a *model-estimated probability*, not a ground-truth certainty. A high-confidence prediction (e.g., 0.99) can still be wrong, and a well-calibrated model is one whose confidence matches its accuracy.
4.  **Forgetting the Negative Sign:** Forgetting the minus sign in the cross-entropy formula. Loss must always be a positive value. If you get a negative loss, you missed the sign.

## Self-check
1.  If the linear score is $z=0$, what is the output of the sigmoid function? What does this imply about the model's certainty at the decision boundary?
2.  A model predicts $\hat{y} = 0.1$ for a satellite component that is actually faulty ($y=1$). Another model predicts $\hat{y} = 0.4$ for the same component. Calculate the cross-entropy loss for both predictions. By what factor is the first model's loss larger than the second?
3.  Using the chain rule and the fact that $\hat{y} = \sigma(z)$ and $z = \mathbf{w} \cdot \mathbf{x} + b$, derive the partial derivative of the cross-entropy loss $L$ with respect to a single weight $w_j$. The result is surprisingly simple: $\frac{\partial L}{\partial w_j} = (\hat{y} - y)x_j$. Prove this.