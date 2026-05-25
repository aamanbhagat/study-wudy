## What it is
The Kalman gain, denoted $K_k$, is the optimal weighting factor that blends a model-based prediction of a system's state with a noisy sensor measurement. Its specific value is calculated to minimize the uncertainty of the final, corrected state estimate. This uncertainty is represented by the trace of the state error covariance matrix, which is the sum of the variances of each state variable.

## Why it matters
This is the heart of the Kalman filter, the workhorse algorithm for state estimation in nearly all modern navigation systems. It's used in spacecraft for orbit and attitude determination, in aircraft for navigation (GPS/INS integration), in drones for stabilization, and in missile guidance for target tracking. Understanding this derivation is fundamental to building, tuning, and debugging GNC systems.

## When to study it
Before tackling this, you must be comfortable with the following. If not, master them first.
*   **Linear Algebra:** Matrix multiplication, transpose, inverse, and the trace operator.
*   **Probability & Statistics:** Gaussian distributions, the concepts of mean, variance, and covariance. Crucially, you must understand that a covariance matrix $P$ represents the uncertainty of a state vector $\mathbf{x}$, and the expected value operator $E[\cdot]$.
*   **State-Space Models:** The discrete-time state transition and measurement equations:
    $$ \mathbf{x}_k = F_k \mathbf{x}_{k-1} + \mathbf{w}_k $$
    $$ \mathbf{z}_k = H_k \mathbf{x}_k + \mathbf{v}_k $$
    where $\mathbf{w}_k$ and $\mathbf{v}_k$ are zero-mean Gaussian noise with covariances $Q_k$ and $R_k$.
*   **Kalman Filter Basics:** The predict/update cycle, and the distinction between the *a priori* (predicted) state $\hat{\mathbf{x}}_k^-$ and covariance $P_k^-$, and the *a posteriori* (updated) state $\hat{\mathbf{x}}_k^+$ and covariance $P_k^+$.

## How to study it (step by step)
1.  **Write the Update Equation.** Start with the fundamental update step. The new state estimate $\hat{\mathbf{x}}_k^+$ is a linear combination of the old one $\hat{\mathbf{x}}_k^-$ and the measurement residual $(\mathbf{z}_k - H_k \hat{\mathbf{x}}_k^-)$. The Kalman gain $K_k$ is the unknown weighting matrix we need to find.
    $$ \hat{\mathbf{x}}_k^+ = \hat{\mathbf{x}}_k^- + K_k (\mathbf{z}_k - H_k \hat{\mathbf{x}}_k^-) $$
2.  **Define the Error.** Define the *a posteriori* error as $\mathbf{e}_k^+ = \mathbf{x}_k - \hat{\mathbf{x}}_k^+$. Substitute the update equation and the measurement model $\mathbf{z}_k = H_k \mathbf{x}_k + \mathbf{v}_k$ into this definition.
    $$ \mathbf{e}_k^+ = (\mathbf{x}_k - \hat{\mathbf{x}}_k^-) - K_k (H_k \mathbf{x}_k + \mathbf{v}_k - H_k \hat{\mathbf{x}}_k^-) $$
    $$ \mathbf{e}_k^+ = \mathbf{e}_k^- - K_k (H_k \mathbf{e}_k^- + \mathbf{v}_k) = (I - K_k H_k)\mathbf{e}_k^- - K_k \mathbf{v}_k $$
3.  **Find the Covariance of the Error.** The *a posteriori* error covariance is $P_k^+ = E[\mathbf{e}_k^+ (\mathbf{e}_k^+)^T]$. Substitute the expression for $\mathbf{e}_k^+$ from the previous step and expand, using the properties of the expected value operator. Remember that the prediction error $\mathbf{e}_k^-$ and measurement noise $\mathbf{v}_k$ are uncorrelated, so $E[\mathbf{e}_k^- \mathbf{v}_k^T] = 0$.
    $$ P_k^+ = E[((I - K_k H_k)\mathbf{e}_k^- - K_k \mathbf{v}_k)((I - K_k H_k)\mathbf{e}_k^- - K_k \mathbf{v}_k)^T] $$
    $$ P_k^+ = (I - K_k H_k) E[\mathbf{e}_k^- (\mathbf{e}_k^-)^T] (I - K_k H_k)^T + K_k E[\mathbf{v}_k \mathbf{v}_k^T] K_k^T $$
    $$ P_k^+ = (I - K_k H_k) P_k^- (I - K_k H_k)^T + K_k R_k K_k^T $$
4.  **Minimize the Trace.** Our goal is to find the $K_k$ that minimizes the sum of the variances of the state estimates, which is $\text{tr}(P_k^+)$. Expand the expression for $P_k^+$ and take its trace.
    $$ \text{tr}(P_k^+) = \text{tr}(P_k^-) - 2\text{tr}(K_k H_k P_k^-) + \text{tr}(K_k H_k P_k^- H_k^T K_k^T) + \text{tr}(K_k R_k K_k^T) $$
5.  **Differentiate and Set to Zero.** Use the matrix calculus identities $\frac{\partial \text{tr}(AB)}{\partial A} = B^T$ and $\frac{\partial \text{tr}(ACA^T)}{\partial A} = 2AC$. Differentiate $\text{tr}(P_k^+)$ with respect to $K_k$ and set the result to the zero matrix.
    $$ \frac{\partial \text{tr}(P_k^+)}{\partial K_k} = -2(H_k P_k^-)^T + 2K_k(H_k P_k^- H_k^T + R_k) = 0 $$
6.  **Solve for the Gain.** Rearrange the equation from the previous step to solve for $K_k$. This yields the optimal Kalman gain equation.
    $$ K_k(H_k P_k^- H_k^T + R_k) = P_k^- H_k^T $$
    $$ K_k = P_k^- H_k^T (H_k P_k^- H_k^T + R_k)^{-1} $$

## Key ideas, with intuition
1.  **The Gain is a Ratio of Uncertainties.** Look at the formula: $K_k \approx \frac{P_k^-}{H P_k^- H^T + R}$. The numerator, $P_k^-$, is the predicted uncertainty. The denominator contains the predicted uncertainty mapped into measurement space ($H P_k^- H^T$) plus the measurement uncertainty ($R_k$). The gain is essentially (Prediction Uncertainty) / (Total Uncertainty).
2.  **Trusting the Better Information Source.**
    *   If measurement noise $R_k$ is very small (high-quality sensor), the denominator is dominated by $H P_k^- H^T$, and $K_k$ approaches $H^{-1}$. The update step becomes $\hat{\mathbf{x}}_k^+ \approx H_k^{-1}\mathbf{z}_k$. We discard our prediction and trust the measurement completely.
    *   If prediction error $P_k^-$ is very small (high-quality model), the numerator is small, and $K_k$ approaches zero. The update step becomes $\hat{\mathbf{x}}_k^+ \approx \hat{\mathbf{x}}_k^-$. We discard the measurement and trust our model completely.
3.  **Minimizing Trace Shrinks the Uncertainty Ellipsoid.** The diagonal elements of the covariance matrix $P_k^+$ are the variances $(\sigma_1^2, \sigma_2^2, \dots, \sigma_n^2)$ for each state variable. The trace is their sum. By minimizing the trace, we are finding the linear combination of prediction and measurement that makes the resulting uncertainty ellipsoid (defined by $P_k^+$) as "small" as possible, in the sense of minimizing the sum of the squared lengths of its principal axes.

## Worked example
A rocket is ascending. Our model predicts its altitude is $\hat{x}_k^- = 1000$ m, with a predicted error variance of $P_k^- = 100 \text{ m}^2$. A barometric altimeter measures the altitude as $z_k = 950$ m, with a measurement variance of $R_k = 25 \text{ m}^2$. Since we are directly measuring altitude, the measurement matrix is just $H_k = [1]$.

1.  **Calculate Innovation Covariance, $S_k$.** This is the denominator of the gain equation.
    $$ S_k = H_k P_k^- H_k^T + R_k = (1)(100)(1) + 25 = 125 \text{ m}^2 $$
2.  **Calculate Kalman Gain, $K_k$.**
    $$ K_k = P_k^- H_k^T S_k^{-1} = (100)(1)(125)^{-1} = 0.8 $$
3.  **Update the State Estimate, $\hat{x}_k^+$.**
    $$ \hat{x}_k^+ = \hat{x}_k^- + K_k (z_k - H_k \hat{x}_k^-) $$
    $$ \hat{x}_k^+ = 1000 + 0.8 (950 - (1)(1000)) = 1000 + 0.8(-50) = 960 \text{ m} $$
4.  **Update the Covariance, $P_k^+$.**
    $$ P_k^+ = (I - K_k H_k) P_k^- = (1 - (0.8)(1)) \times 100 = 0.2 \times 100 = 20 \text{ m}^2 $$

**Reflection:** The measurement was more certain ($R_k=25$) than the prediction ($P_k^-=100$), so the gain was high (0.8), pulling the final estimate of 960 m much closer to the measurement of 950 m than to the prediction of 1000 m. Critically, the new uncertainty $P_k^+ = 20 \text{ m}^2$ is smaller than *both* the prediction and measurement uncertainties. We fused two noisy sources to get a better result than either could provide alone.

## Diagrams
Here is a 1D visualization of the worked example. The prediction and measurement are Gaussian probability density functions (PDFs). The updated estimate (posterior) is a new Gaussian that is taller and narrower, indicating higher certainty.

```text
Prob. Density
   ^
   |
   |                             Measurement (z=950, R=25)
   |                                   *
   |                                  /|\
   |                                 / | \
   |                                /  |  \
   |                   Updated (x=960, P=20)
   |                         *
   |                        /|\
   |                       / | \        Prediction (x=1000, P=100)
   |                      /  |  \            *
   |                     /   |   \          /|\
   |                    /    |    \        / | \
   |                   /     |     \      /  |  \
   +------------------|------|------|-----|---|--|------> Altitude (m)
                    950    960          1000
```

## Memory technique — remember this forever
1.  **Story:** You're standing in a room, blindfolded ($P_k^-$ is your uncertainty about your position). A friend shouts a clue about where you are ($z_k$), but they might be lying or mistaken ($R_k$). The Kalman Gain ($K_k$) is how much you should step ($K_k \times \text{residual}$) toward their clue. The formula $K_k = P_k^- H^T S^{-1}$ is you deciding how much to trust them: you weigh your own uncertainty ($P_k^-$) against the total uncertainty of the situation ($S_k = H P_k^- H^T + R_k$).
2.  **Must-know formulas:**
    *   Innovation Covariance: $S_k = H_k P_k^- H_k^T + R_k$
    *   Kalman Gain: $K_k = P_k^- H_k^T S_k^{-1}$
    *   State Update: $\hat{\mathbf{x}}_k^+ = \hat{\mathbf{x}}_k^- + K_k (\mathbf{z}_k - H_k \hat{\mathbf{x}}_k^-)$
3.  **Spaced Repetition:** Review this derivation and these formulas at 1 day, 3 days, 7 days, 16 days, and 35 days. Do not just read; re-derive from a blank sheet of paper.
4.  **First Principles Pathway:** If you forget the formula for $K_k$, rebuild it.
    *   Write the state update: $\hat{\mathbf{x}}_k^+ = \hat{\mathbf{x}}_k^- + K_k(\text{residual})$.
    *   Define the posterior error: $\mathbf{e}_k^+ = \mathbf{x}_k - \hat{\mathbf{x}}_k^+$.
    *   Define the posterior covariance: $P_k^+ = E[\mathbf{e}_k^+ (\mathbf{e}_k^+)^T]$.
    *   Substitute, expand, take the trace, differentiate $\text{tr}(P_k^+)$ w.r.t. $K_k$, set to zero, and solve for $K_k$.

## Common mistakes
1.  **Inverting the wrong matrix.** Students often try to write $K_k = (H_k P_k^- H_k^T + R_k)^{-1} P_k^- H_k^T$. Matrix multiplication is not commutative. The inverse is on the innovation covariance $S_k$, which is a square matrix of size (number of measurements $\times$ number of measurements).
2.  **Forgetting the transpose on $H_k$.** The term $P_k^- H_k^T$ ensures the matrix dimensions are conformable for multiplication. $P_k^-$ is $n \times n$, $H_k^T$ is $n \times m$, resulting in an $n \times m$ matrix for the gain, which is correct.
3.  **Using $P_k^+$ in the gain equation.** The gain $K_k$ is calculated to *produce* the updated covariance $P_k^+$. It cannot depend on it. The gain calculation must use the *a priori* (predicted) covariance $P_k^-$.

## Self-check
1.  What happens to the Kalman gain $K_k$ and the updated state $\hat{\mathbf{x}}_k^+$ if the measurement noise covariance $R_k \to \infty$? Explain the physical intuition.
2.  A satellite's position is one-dimensional, $x$. The state vector is $\mathbf{x} = [x, \dot{x}]^T$. We only measure position, so $H = [1 \quad 0]$. Given a predicted covariance $P_k^- = \begin{pmatrix} 4 & 1 \\ 1 & 2 \end{pmatrix}$ and a measurement noise variance $R_k = 1$, calculate the Kalman gain matrix $K_k$.
3.  Prove that the posterior covariance update rule $P_k^+ = (I - K_k H_k) P_k^-$ is correct by starting with the "Joseph form" $P_k^+ = (I - K_k H_k) P_k^- (I - K_k H_k)^T + K_k R_k K_k^T$ and substituting in the formula for the optimal $K_k$.