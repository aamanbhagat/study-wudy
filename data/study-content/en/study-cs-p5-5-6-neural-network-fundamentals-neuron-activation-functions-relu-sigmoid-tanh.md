## 1. The one-sentence answer
**A neuron is a weighted sum followed by a nonlinear activation function, and the three canonical activations—sigmoid, tanh, and ReLU—supply the nonlinearity that lets stacked neurons represent arbitrary decision surfaces.**

A single neuron receives a vector of inputs, multiplies each by a learned weight, adds a bias, and passes the result through a fixed nonlinear function. Without that nonlinearity the entire network collapses to one linear transformation no matter how many layers are stacked. The choice of nonlinearity therefore determines which functions the network can represent and how easily gradients flow during training.

Sigmoid maps any real number into (0,1) and was historically used for probability-like outputs. Tanh maps into (−1,1) and centers its outputs around zero. ReLU simply returns the positive part of its argument and has become the default hidden-unit activation because its gradient is either 0 or 1, avoiding the vanishing-gradient problem that plagues the two saturating functions.

> [!NOTE]
> The activation is not an afterthought; it is the only source of expressive power beyond linear regression.

## 2. Why this matters — concrete and current
NASA’s Langley Research Center trains small feed-forward networks with ReLU hidden units to predict aerodynamic coefficients for reusable launch vehicles during entry; the networks run inside the onboard flight computer at 100 Hz because a single matrix-vector multiply plus ReLU evaluations is cheaper than a full CFD solve.

SpaceX’s Falcon 9 first-stage landing software contains a neural guidance module whose final layer uses a sigmoid to output a probability of successful landing given current state; the same architecture was later reused for Starship’s flip-maneuver controller.

Airbus has published results on a tanh-activated recurrent network that fuses IMU and GPS data to produce attitude estimates during GPS-denied flight; the bounded range of tanh prevents the network from producing physically impossible quaternion magnitudes.

Boeing’s 777X flight-test program employed a ReLU network to detect buffet onset from pressure-sensor time series; the network was certified as a non-deterministic monitor after exhaustive Monte-Carlo validation showed that ReLU’s piecewise-linear nature permitted formal reachability analysis.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Dot product              | The neuron’s weighted sum is exactly \(\mathbf{w}^\top\mathbf{x}+b\). |
| Composition of functions | Stacking neurons creates nested nonlinear maps.           |
| Derivative               | Training requires the gradient of the loss through each activation. |
| Basic inequalities       | Saturation and vanishing gradients are proved with elementary bounds. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Linear threshold unit
A neuron first computes a linear score. If the score exceeds a threshold the neuron “fires.”  
Concrete example: inputs (2, −1), weights (0.5, 0.5), bias −0.6 yields score 0.4; if threshold is 0 the neuron fires.  
Formally  
\[
z = \mathbf{w}^\top\mathbf{x} + b.
\]
> [!WARNING]
> Treating the bias as optional produces a hyperplane forced through the origin and therefore cannot represent simple translations.

### Step 2 — Why a nonlinearity is required
Any composition of linear functions remains linear. Therefore a network of purely linear neurons is equivalent to a single matrix multiplication.  
A single nonlinear neuron already carves a curved decision surface.

### Step 3 — Sigmoid definition and range
The logistic sigmoid is  
\[
\sigma(z) = \frac{1}{1+e^{-z}}.
\]
It is strictly increasing, differentiable, and maps \(\mathbb{R}\) onto (0,1).

### Step 4 — Hyperbolic tangent
Tanh is a shifted and scaled sigmoid:  
\[
\tanh(z) = 2\sigma(2z)-1.
\]
Its range (−1,1) and zero-mean output often accelerate convergence compared with sigmoid.

### Step 5 — Rectified linear unit
ReLU is defined piecewise:  
\[
\text{ReLU}(z) = \max(0,z).
\]
Its derivative is the Heaviside step (almost everywhere), which is either 0 or 1 and therefore never vanishes for positive pre-activations.

### Step 6 — Formal neuron with activation
The complete computational unit is  
\[
a = f(\mathbf{w}^\top\mathbf{x} + b),
\]
where \(f\) is any of the three functions above. A layer of \(m\) such neurons is the vector-valued map \(\mathbf{a} = f(W\mathbf{x}+\mathbf{b})\) with element-wise application of \(f\).

## 5. Worked examples — every step shown

**Example 1 — Scalar sigmoid**  
*Given:* \(z=1.2\).  
*Find:* \(\sigma(1.2)\).  
Compute the exponent: \(e^{-1.2}\approx0.3012\).  
Invert and add one: \(1+0.3012=1.3012\).  
Divide: \(1/1.3012\approx0.7685\).  
**0.7685**  
*Reflection:* The calculation shows that moderate positive inputs already produce outputs near the upper asymptote.

**Example 2 — Vector neuron with tanh**  
*Given:* \(\mathbf{x}=[1,0]^\top\), \(\mathbf{w}=[0.5,-0.3]^\top\), \(b=0.1\).  
*Find:* \(\tanh(\mathbf{w}^\top\mathbf{x}+b)\).  
Dot product: \(0.5\cdot1+(-0.3)\cdot0=0.5\).  
Add bias: \(0.6\).  
Apply tanh: \(\tanh(0.6)\approx0.5370\).  
**0.5370**  
*Reflection:* Centering around zero keeps the output inside (−1,1) even when inputs are one-sided.

**Example 3 — ReLU layer**  
*Given:* \(W=\begin{bmatrix}1&-1\\-2&3\end{bmatrix}\), \(\mathbf{x}=[2,1]^\top\), \(\mathbf{b}=[-1,0]^\top\).  
*Find:* ReLU outputs.  
First pre-activation: \(1\cdot2+(-1)\cdot1-1=0\). ReLU(0)=0.  
Second: \(-2\cdot2+3\cdot1+0=-1\). ReLU(−1)=0.  
** [0,0] **  
*Reflection:* Both units are silent; this is the classic “dying ReLU” regime when weights become too negative.

**Example 4 — Gradient through sigmoid**  
*Given:* loss \(L=\frac12(a-0.9)^2\), \(a=\sigma(0.4)\).  
*Find:* \(\partial L/\partial z\).  
\(\sigma(0.4)\approx0.5987\), so \(a-0.9=-0.3013\).  
Derivative of sigmoid: \(\sigma'(0.4)=0.5987\cdot(1-0.5987)\approx0.240\).  
Chain rule: \((-0.3013)\cdot0.240\approx-0.0723\).  
**-0.0723**  
*Reflection:* The factor \(\sigma'(z)\) is at most 0.25, illustrating the source of vanishing gradients.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                                      | How to avoid it                                      |
|-----------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using sigmoid in hidden layers | Historical precedent and easy probability interpretation | Default to ReLU; reserve sigmoid for final binary output |
| Forgetting the bias term    | Treating the neuron as a pure dot product           | Always allocate a separate bias vector per layer     |
| Plotting ReLU without kink  | Mental image of smooth functions                    | Explicitly mark the non-differentiable point at 0    |
| Assuming tanh range is [0,1]| Confusing with sigmoid                              | Remember the identity \(\tanh(z)=2\sigma(2z)-1\)     |
| Ignoring saturation in back-prop | Derivative near zero for large |z|                 | Monitor activation histograms during training        |
| Initializing all weights positive | ReLU units stay silent from the start             | Use He or Kaiming initialization that accounts for ReLU variance |
| Treating activations as learned | Confusing with parameters                           | Keep activations fixed; only weights and biases are optimized |

## 7. The textbook-precise statement
A neuron computes the scalar  
\[
a^{(l)}_j = f\left(\sum_{i=1}^{n_{l-1}}w^{(l)}_{ji}a^{(l-1)}_i+b^{(l)}_j\right),
\]
where \(f\) is applied element-wise and belongs to the set \(\{\sigma,\tanh,\operatorname{ReLU}\}\). When \(f=\operatorname{ReLU}\), the map is piecewise linear and convex; when \(f=\sigma\) or \(\tanh\), the map is smooth and sigmoidal. Stacking \(L\) such layers yields a function whose gradient with respect to the parameters is obtained by the chain rule. (Goodfellow, Bengio & Courville, *Deep Learning*, §6.1–6.3, MIT Press 2016.)

## 8. Visual — diagram or schematic
```text
          x1 ──w1──┐
                   │
          x2 ──w2──┼──(+)──z──f(z)──▶ a
                   │     ▲
          x3 ──w3──┘     │
                       bias b
```
The diagram shows three scalar inputs, their respective weights, summation with bias, and the nonlinear activation \(f\) producing the neuron output \(a\).

## 9. The memory technique
1. **The hook** — Picture a bouncer at a club (ReLU) who only lets positive people in, a thermometer that glows red above 37 °C (sigmoid), and a see-saw perfectly balanced at zero (tanh).  
2. **What to overlearn** — \(\sigma'(z)=\sigma(z)(1-\sigma(z))\) (max ¼), \(\tanh'(z)=1-\tanh^2(z)\), ReLU'(z) = 1_{z>0}.  
3. **Spaced-repetition schedule** — Review definitions at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive each activation from its differential equation or geometric definition (half-line for ReLU, logistic growth for sigmoid).

## 10. What this unlocks
Mastery of the single neuron and its three standard activations is the prerequisite for understanding back-propagation, convolutional layers, residual blocks, and modern optimizers used in aerospace trajectory optimization and fault-detection networks.  
- Back-propagation through computational graphs  
- Universal-approximation proofs that rely on non-constant bounded activations  
- Modern variants (Leaky ReLU, GELU, Swish) used in attention-based aerodynamic surrogates  

## 11. Self-check — five questions, no answers
1. Compute the output of a neuron with weights \([2,-1]\), bias −3, input \([1,1]^\top\) and ReLU activation.  
2. Show that \(\sigma'(z)\le1/4\) for all real \(z\) and state the consequence for gradient magnitude.  
3. A two-layer network uses only linear activations. Prove it is equivalent to a single linear map.  
4. Which activation function guarantees that every hidden unit is either completely silent or passes its input unchanged?  
5. A colleague claims that replacing every ReLU with tanh will never hurt performance. Identify the most likely failure mode on a deep aerospace surrogate model.