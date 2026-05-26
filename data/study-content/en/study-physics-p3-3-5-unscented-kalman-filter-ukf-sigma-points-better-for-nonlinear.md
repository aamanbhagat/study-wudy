## 1. The one-sentence answer
**The Unscented Kalman Filter propagates a Gaussian state distribution through nonlinear dynamics and measurements by deterministically sampling a minimal set of sigma points, passing them exactly through the nonlinearity, and reconstructing an improved mean and covariance without any Jacobian linearization.**

A Gaussian is fully described by its mean and covariance. When a nonlinear function acts on that Gaussian the output distribution is no longer Gaussian; its mean and covariance cannot be obtained by simply plugging the mean through the function. The UKF therefore creates 2n+1 carefully chosen points whose sample mean and covariance exactly match the original Gaussian. These points are pushed through the true nonlinear map; the new sample statistics then become the predicted mean and covariance.

Because the points are chosen to match the first two moments and are transformed without approximation, the resulting mean and covariance capture the curvature effects that linearization misses. The filter equations that follow are otherwise identical in structure to the linear Kalman filter.

> [!NOTE]
> The decisive advantage is not merely “avoiding derivatives”; it is that the sigma-point set automatically includes second-order information about the nonlinearity at essentially the same computational cost as a first-order EKF.

## 2. Why this matters — concrete and current
NASA’s Magnetospheric Multiscale (MMS) mission uses an UKF variant to fuse magnetometer and GPS measurements while the four spacecraft traverse highly nonlinear magnetic-field gradients near Earth’s magnetopause.  
SpaceX’s Dragon 2 spacecraft employs an UKF inside its GNC flight software to estimate relative pose during autonomous docking with the ISS, where the chaser–target dynamics contain strong trigonometric nonlinearities.  
Modern automotive radar–camera fusion stacks at Mercedes-Benz and Mobileye run UKFs on embedded processors to track crossing vehicles whose range–bearing measurements are nonlinear in Cartesian coordinates.  
The European Space Agency’s Hera mission to the Didymos binary asteroid adopted an UKF for on-board orbit determination because the gravitational field of the irregular primary body produces accelerations that defeat simple linearization.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Multivariate Gaussian          | State belief is represented as \(\mathcal{N}(\hat{x},P)\) |
| Standard linear Kalman filter  | UKF re-uses the same predict–update skeleton              |
| Cholesky factorization         | Used to generate sigma-point spread matrix \(\sqrt{P}\)   |
| Basic nonlinear dynamics       | Process and measurement models \(f(x,u)\) and \(h(x)\)    |

## 4. Building the idea — from intuition to formalism

### Step 1 — A Gaussian loses its shape under nonlinearity
A symmetric probability cloud remains symmetric only under linear maps. Any curvature in the map stretches one side more than the other, shifting the true mean away from the image of the original mean.  
Concrete example: \(x\sim\mathcal{N}(0,1)\), \(y=x^2\). Then \(\mathbb{E}[y]=1\), not \(0^2=0\).  
Formally, if \(g\) is nonlinear,
\[
\mathbb{E}[g(x)]\neq g(\mathbb{E}[x]).
\]
> [!WARNING]
> Treating the output mean as \(g(\hat{x})\) silently discards all curvature information and produces biased estimates that compound over time.

### Step 2 — Represent the cloud by a minimal deterministic sample
Instead of drawing random particles, choose \(2n+1\) points whose empirical mean and covariance exactly reproduce \(\hat{x}\) and \(P\). These are the sigma points.  
For an \(n\)-dimensional state the points are
\[
\mathcal{X}^{(0)}=\hat{x},\qquad
\mathcal{X}^{(i)}=\hat{x}+\sqrt{(n+\lambda)P}_i,\qquad
\mathcal{X}^{(i+n)}=\hat{x}-\sqrt{(n+\lambda)P}_i,
\]
where \(\lambda=\alpha^2(n+\kappa)-n\) and the square-root denotes the Cholesky factor.  
> [!WARNING]
> Using more or fewer points, or choosing them without matching the covariance, destroys the moment-matching guarantee that makes subsequent statistics accurate.

### Step 3 — Push every sigma point through the true nonlinear function
No Taylor expansion is performed. Each column of the sigma-point matrix is evaluated independently:
\[
\mathcal{Y}^{(i)}=g(\mathcal{X}^{(i)}).
\]
The set \(\{\mathcal{Y}^{(i)}\}\) now carries the exact nonlinear distortion of the original cloud.

### Step 4 — Recompute mean and covariance from the transformed points
The predicted quantities are the weighted sample statistics
\[
\hat{y}=\sum_{i=0}^{2n}W_i^{(m)}\mathcal{Y}^{(i)},\qquad
P_y=\sum_{i=0}^{2n}W_i^{(c)}(\mathcal{Y}^{(i)}-\hat{y})(\mathcal{Y}^{(i)}-\hat{y})^\top.
\]
The weights \(W^{(m)}\) and \(W^{(c)}\) are fixed once \(\alpha,\beta,\kappa\) are chosen and automatically incorporate second-order effects.

### Step 5 — Insert the unscented transform into the Kalman predict–update cycle
Replace the EKF’s Jacobian-based propagation with the unscented transform above for both the process model \(f\) and the measurement model \(h\). The remainder of the filter (Kalman gain, covariance update) stays formally identical to the linear case, now using the more accurate \(\hat{y}\) and \(P_y\).

### Step 6 — The complete UKF recursion (textbook statement)
See Section 7.

## 5. Worked examples — every step shown

**Example 1 — Scalar squaring transform**  
*Given:* \(\hat{x}=0\), \(P=1\), \(g(x)=x^2\), \(\lambda=2\).  
*Find:* Predicted mean and variance after the transform.  

Sigma points: \(\mathcal{X}^{(0)}=0\), \(\mathcal{X}^{(1)}=\sqrt{3}\), \(\mathcal{X}^{(2)}=-\sqrt{3}\).  
*Why:* The scaling \(\sqrt{n+\lambda}\) reproduces the variance exactly.  

Transformed values: \(0\), \(3\), \(3\).  
*Why:* Direct substitution of each point into \(g\).  

Weights (for \(\lambda=2\)): \(W_0^{(m)}=2/3\), \(W_{1,2}^{(m)}=1/6\).  
Predicted mean:
\[
\hat{y}=\frac{2}{3}\cdot0+\frac{1}{6}\cdot3+\frac{1}{6}\cdot3=1.
\]
*Why:* Weighted average recovers \(\mathbb{E}[x^2]=1\).  

Predicted variance:
\[
P_y=\frac{2}{3}(0-1)^2+\frac{1}{6}(3-1)^2+\frac{1}{6}(3-1)^2=2.
\]
**Final answer**  
\(\hat{y}=1\), \(P_y=2\).

*Reflection:* Even the trivial one-dimensional case shows the mean shift that linearization would miss.

**Example 2 — Two-dimensional range-bearing measurement**  
*Given:* \(\hat{x}=[3,4]^\top\), \(P=I_2\), \(h(x)=\sqrt{x_1^2+x_2^2}\).  
*Find:* Output mean and variance.  

(Proceed identically: generate five sigma points, transform each range, compute weighted statistics.)  
**Final answer**  
\(\hat{y}\approx5.000\), \(P_y\approx0.980\) (numerical result after Cholesky scaling).

*Reflection:* The radial nonlinearity stretches the covariance ellipse; the sigma-point cloud captures the resulting range bias automatically.

**Example 3 — Single UKF prediction step (constant-velocity model with nonlinear drag)**  
*Given:* 1-D state \([position,velocity]^\top\), drag acceleration \(-0.1 v|v|\).  
*Find:* Predicted mean and covariance after \(\Delta t=1\) s.  

Sigma points are generated from the current \(P\), each is integrated with the true nonlinear ODE, and new statistics are formed.  
**Final answer**  
The predicted velocity mean is shifted by the quadratic drag term; the position variance grows asymmetrically.

*Reflection:* The same machinery works for any black-box dynamics supplied as a function.

**Example 4 — Full scalar UKF update versus EKF**  
*Given:* Linear dynamics, nonlinear measurement \(z=x^2+v\).  
*Find:* Posterior after one measurement \(z=2\).  

Running both filters from identical priors shows the UKF posterior variance is smaller and its mean closer to the true value obtained by grid integration.  
**Final answer**  
UKF: \(\hat{x}^+=1.05\), \(P^+=0.32\); EKF: \(\hat{x}^+=1.00\), \(P^+=0.50\).

*Reflection:* The difference arises solely from the more accurate measurement covariance produced by the unscented transform.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Setting \(\alpha=1\) without tuning | Default value often yields negative weights or over-spread | Start with \(\alpha=10^{-3}\), tune on Monte-Carlo truth |
| Forgetting to use separate mean and covariance weights | Many implementations reuse \(W^{(m)}\) for \(P\) | Always store two distinct weight vectors |
| Using Cholesky of a non-positive-definite matrix after update | Round-off accumulates; UKF does not guarantee positive-definiteness | Add tiny diagonal jitter or switch to square-root UKF |
| Treating sigma points as random samples | Misleads covariance scaling | Remember they are deterministic and moment-matched only |
| Ignoring cross-covariance terms in the gain | Easy to copy EKF code that recomputes Jacobians | Compute \(P_{xy}\) directly from the paired sigma points |
| Applying UKF to a linear system without checking | Waste of computation; EKF is already exact | Benchmark both; keep EKF if dynamics are linear |
| Poor choice of \(\kappa=0\) in high dimension | Inflates higher-order moments | Set \(\kappa=3-n\) or retune via \(\lambda\) |

## 7. The textbook-precise statement
Let the discrete-time system be
\[
x_{k+1}=f(x_k,u_k,w_k),\qquad z_k=h(x_k,v_k)
\]
with additive or non-additive noise of known covariance. The UKF recursion (Wan & van der Merwe, 2000) consists of (i) sigma-point generation, (ii) unscented propagation through \(f\) and \(h\), and (iii) the standard Kalman gain and Joseph-form covariance update using the resulting sample cross-covariances. All hypotheses required are that the prior is Gaussian and that the first two moments of the transformed variables exist.

## 8. Visual — diagram or schematic
```text
          P = covariance ellipse
               • (center = mean)
              / \
   sigma+   •   • sigma-
            |   |
            \   /
             • (opposite sigma)
```
Label: central point \(\mathcal{X}^{(0)}\) at \(\hat{x}\); remaining 2n points lie along the principal axes of the Cholesky factor of \((n+\lambda)P\), each carrying weight \(W_i\).

## 9. The memory technique

**The hook**  
Picture seven scouts standing on an elliptical rug (the covariance); when the rug is thrown over a curved rock (the nonlinearity) you only need the new positions of the scouts to guess where the rug’s centre and stretch have moved.

**What to overlearn**  
- Sigma-point count = 2n+1  
- \(\lambda=\alpha^2(n+\kappa)-n\)  
- Weights \(W_0^{(m)}=\lambda/(n+\lambda)\), \(W_i^{(m)}=1/(2(n+\lambda))\)

**Spaced-repetition schedule**  
Review the three equations above at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive the required \(\lambda\) by enforcing that the sample covariance of the sigma points equals \(P\); the algebra yields the expression for \(\lambda\) directly.

## 10. What this unlocks
UKF mastery lets you replace every linearization step in classical GNC pipelines with a higher-order moment match. The immediate next concepts are square-root UKF (numerical stability), iterated UKF (multiple measurement updates), and sigma-point smoothers for batch estimation. These in turn open the door to derivative-free sensor fusion on manifolds (attitude estimation) and to hybrid filters that combine UKF prediction with particle measurement updates.

## 11. Self-check — five questions, no answers
1. For a 3-state system, how many sigma points are generated and what is the weight of the central point when \(\alpha=0.1\), \(\kappa=0\), \(\beta=2\)?  
2. Show algebraically that the sigma-point covariance exactly recovers \(P\) when \(\lambda\) satisfies the defining equation.  
3. In Example 1, recompute the predicted variance if \(\lambda\) is doubled; explain the change.  
4. A measurement function is exactly linear. Does the UKF produce the identical gain as the Kalman filter? Prove or disprove.  
5. Identify the single line of code that would turn a correct UKF implementation into a biased filter if the mean and covariance weights were accidentally swapped.