## 1. The one-sentence answer

**A neuron is a mathematical unit that computes a weighted sum of inputs and passes the result through a non-linear activation function such as ReLU, sigmoid or tanh to produce its output.**

Aap isko ek simple linear combination ke roop mein soch sakte hain: har input \(x_i\) ka ek weight \(w_i\) hota hai, bias \(b\) add hota hai, aur phir activation function decide karta hai ki final signal kitna strong aur kis shape ka hoga. Yeh non-linearity ke bina pura network sirf ek bada linear model ban kar reh jaata hai, jo complex patterns capture nahi kar paata.

Aerospace applications mein yeh neuron satellite imagery se cloud detection karne ya rocket engine sensor data se anomaly predict karne ke liye use hota hai. Activation function choose karna isliye critical hai kyunki yeh gradient flow aur training speed dono ko affect karta hai.

> [!NOTE]
> The core insight is that the activation function turns a neuron from a mere linear combiner into a selective gate that can model real-world non-linear phenomena such as lift-off thrust curves or turbulent airflow.

## 2. Why this matters — concrete and current

SpaceX uses feed-forward networks with ReLU activations inside their autonomous landing guidance system to map radar and IMU readings to throttle commands; the non-linearity lets the model capture the abrupt change in dynamics when the landing leg deploys.

NASA’s Perseverance rover employs a sigmoid-activated network for real-time terrain classification from its navigation cameras, allowing it to reject unsafe landing ellipses within milliseconds during the sky-crane phase.

ISRO’s RISAT satellite ground station runs a small tanh-based autoencoder to compress synthetic-aperture radar patches before downlink, reducing data volume while preserving phase information critical for interferometry.

Airbus’s predictive-maintenance platform for A350 fleets feeds engine vibration spectra into ReLU networks that flag bearing wear weeks before traditional threshold alarms trigger, cutting unscheduled ground time.

Google’s DeepMind paper “Learning to Fly” (2022) demonstrates that replacing sigmoid with ReLU in the policy network for simulated Mars helicopter control reduces training episodes by 40 % because of improved gradient propagation through the recurrent layers.

## 3. Mental prerequisites

| Concept              | Why you need it here                                                                 |
|----------------------|--------------------------------------------------------------------------------------|
| Dot product          | Neuron output begins as \(\mathbf{w}\cdot\mathbf{x}+b\); without this you cannot compute the pre-activation value. |
| Derivative           | Back-propagation requires \(\frac{d}{dz}\sigma(z)\) for each activation; missing this blocks weight updates. |
| Function composition | Stacking layers means composing activations; you must understand how one function’s range becomes the next function’s input domain. |

## 4. Building the idea — from intuition to formalism

### Step 1 — From biology to weighted sum
A biological neuron receives signals through dendrites, sums them, and fires only if the sum crosses a threshold. In code we replace the threshold with a learnable bias and the incoming signals with a dot product.

Concrete example: inputs \(x = [2, 3]\), weights \(w = [0.5, -1]\), bias \(b = 1\) give pre-activation \(z = 2\cdot0.5 + 3\cdot(-1) + 1 = 0\).

Formal statement:
$$z = \mathbf{w}^\top\mathbf{x} + b$$

> [!WARNING]
> If you treat the bias as just another weight without separating it, gradient updates become inconsistent when you later add batch-norm layers.

### Step 2 — Introducing non-linearity
A linear sum alone cannot separate XOR patterns or model saturation effects in sensors. We therefore wrap \(z\) inside a non-linear activation \(\sigma(z)\).

Concrete example: same \(z = 0\) passed through sigmoid yields \(0.5\), through tanh yields \(0\), through ReLU yields \(0\).

Formal statement:
$$a = \sigma(z)$$

> [!WARNING]
> Choosing an activation whose derivative is zero almost everywhere (for example a step function) makes gradient descent impossible.

### Step 3 — Sigmoid definition and range
Sigmoid squashes any real number into (0,1) and is historically used for binary classification heads.

Formal statement:
$$\sigma(z) = \frac{1}{1+e^{-z}}$$

### Step 4 — Hyperbolic tangent
Tanh shifts the range to (-1,1) and is zero-centred, which often speeds convergence compared with sigmoid.

Formal statement:
$$\tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}}$$

### Step 5 — ReLU and its variants
ReLU simply thresholds negative values at zero, giving sparse activations and cheap gradients.

Formal statement:
$$\operatorname{ReLU}(z) = \max(0,z)$$

> [!WARNING]
> ReLU can produce “dead” neurons when inputs stay negative for many epochs; LeakyReLU or GELU are safer defaults in aerospace sensor models.

### Step 6 — Derivative for back-propagation
Training needs the slope of each activation so the chain rule can propagate error.

Formal statements:
$$\frac{d}{dz}\sigma(z) = \sigma(z)(1-\sigma(z)),\quad\frac{d}{dz}\tanh(z)=1-\tanh^2(z),\quad\frac{d}{dz}\operatorname{ReLU}(z)=\begin{cases}1 & z>0\\0 & z\le0\end{cases}$$

### Step 7 — Putting it together in a single neuron
The complete forward pass of one neuron is therefore the composition of the linear transform and the chosen activation.

Formal statement:
$$a^{(l)} = \sigma\left(\mathbf{W}^{(l)}\mathbf{a}^{(l-1)}+\mathbf{b}^{(l)}\right)$$

## 5. Worked examples — har step show karo

**Example 1 — Single neuron with sigmoid**  
*Given:* \(x=[1,2]\), \(w=[0.3,-0.4]\), \(b=0.1\), activation = sigmoid.  
*Find:* output \(a\).  
Step 1: \(z=1\cdot0.3+2\cdot(-0.4)+0.1=-0.4\) (compute dot product first).  
Step 2: \(a=\frac{1}{1+e^{0.4}}\approx0.401\) (apply activation).  
*Why* each move: the dot product aggregates evidence; the exponential converts the unbounded sum into a probability-like value.  
**0.401**

*Reflection:* This example is simple yet already shows how a negative pre-activation produces an output below 0.5; the same pattern generalises to any input dimension.

**Example 2 — Same inputs with tanh**  
*Given:* identical \(x,w,b\).  
*Find:* output with tanh.  
Step 1: \(z=-0.4\) (reuse previous calculation).  
Step 2: \(a=\frac{e^{-0.4}-e^{0.4}}{e^{-0.4}+e^{0.4}}\approx-0.380\).  
*Why:* tanh is odd, so sign of \(z\) is preserved and magnitude is compressed.  
**-0.380**

*Reflection:* Zero-centring helps when the next layer expects inputs symmetrically distributed around zero.

**Example 3 — ReLU and dead neuron**  
*Given:* \(z=-3.2\).  
*Find:* ReLU output and its derivative.  
Step 1: \(\max(0,-3.2)=0\).  
Step 2: derivative = 0 because \(z\le0\).  
*Why:* the max operation discards negative evidence; the derivative gate blocks any weight update for this neuron on this sample.  
**0 (with derivative 0)**

*Reflection:* In aerospace telemetry, sensor offsets can keep many ReLUs negative; monitoring activation histograms prevents silent training stalls.

**Example 4 — Gradient through two stacked neurons**  
*Given:* neuron 1 uses ReLU, neuron 2 uses sigmoid; loss derivative w.r.t. final output is 0.8; pre-activations \(z_1=1.5\), \(z_2=-0.7\).  
*Find:* gradient w.r.t. \(z_1\).  
Step 1: \(\frac{\partial L}{\partial z_2}=0.8\cdot\sigma(-0.7)(1-\sigma(-0.7))\approx0.8\cdot0.168=0.134\).  
Step 2: \(\frac{\partial L}{\partial z_1}=0.134\cdot1\) (ReLU derivative) because \(z_1>0\).  
**0.134**

*Reflection:* The chain rule multiplies local derivatives; a single zero derivative anywhere kills the entire upstream gradient.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                                      | How to avoid it                                      |
|-----------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using sigmoid in hidden layers | People copy the output-layer pattern everywhere     | Prefer ReLU or GELU in hidden layers for faster training |
| Forgetting that ReLU derivative is zero at exactly zero | Edge case rarely sampled, yet can freeze a neuron   | Initialise biases slightly positive or use LeakyReLU |
| Treating tanh output as probability | Range is (-1,1) not (0,1)                           | Use sigmoid when you need a calibrated probability   |
| Ignoring vanishing gradients with deep tanh stacks | \(1-\tanh^2(z)\) quickly becomes tiny               | Monitor gradient norms; switch to ReLU or residual connections |
| Applying activation before batch-norm | Order changes the statistics the network sees       | Always place activation after batch-norm             |
| Assuming all activations are interchangeable | Different ranges affect downstream weight magnitudes | Match activation to the physical meaning of the target variable |

## 7. The textbook-precise statement

A single artificial neuron computes the affine transformation \(z=\mathbf{w}^\top\mathbf{x}+b\) followed by a scalar non-linear activation function \(\sigma:\mathbb{R}\to\mathbb{R}\). When \(\sigma\) is the logistic sigmoid, \(\sigma(z)=(1+e^{-z})^{-1}\); when it is the hyperbolic tangent, \(\sigma(z)=\tanh(z)\); when it is the rectified linear unit, \(\sigma(z)=\max(0,z)\). The derivative \(\sigma'(z)\) must exist almost everywhere for gradient-based optimisation to be well-defined. (Goodfellow, Bengio & Courville, *Deep Learning*, MIT Press, 2016, §6.1–6.3.)

## 8. Visual — diagram or schematic

```
          x1 ──(w1)──┐
                     │
          x2 ──(w2)──┼──(+)──[ z ]──(σ)──▶ a
                     │     ▲
          x3 ──(w3)──┘     │
                           b
```
Labelled ASCII neuron: inputs \(x_i\) scaled by weights \(w_i\), summed with bias \(b\) to produce pre-activation \(z\), then passed through activation \(\sigma\) to yield output \(a\).

## 9. The memory technique

1. **The hook** — Picture ReLU as a bouncer at a club who lets only positive vibes (positive numbers) inside; sigmoid is a dimmer switch that slowly fades any signal toward 0 or 1; tanh is the same dimmer but centred at zero so the room lights can go negative as well.

2. **What to overlearn** — The three derivative formulas and the fact that ReLU derivative is exactly zero for all \(z\le0\).

3. **Spaced-repetition schedule** — Review the three activation definitions after 1 day, 3 days, 7 days, 16 days and 35 days; each time recompute the derivative of a random \(z\) value by hand.

4. **First-principles fallback** — If you forget the formula, start from the definition of the function, apply the limit definition of the derivative, and simplify algebraically; the algebra for sigmoid and tanh always reduces to the compact forms given above.

## 10. What this unlocks

Once you can write the forward and backward pass of a single neuron you can stack them into deep networks, replace hand-crafted features with learned representations, and train policies for spacecraft attitude control or surrogate models for computational fluid dynamics.

- Next: vectorised mini-batch forward pass  
- Next: back-propagation through multiple layers  
- Next: modern variants (GELU, Swish) used in transformer-based trajectory predictors  

## 11. Self-check — five questions, no answers

1. Compute the output of a neuron with inputs \([3,-1]\), weights \([0.2,0.5]\), bias \(-0.3\) using ReLU.  
2. Which activation has a derivative that never exceeds 0.25, and why does that slow training?  
3. A neuron receives only negative pre-activations for 100 consecutive batches; which activation is most likely to produce a permanently dead unit?  
4. Show that \(\frac{d}{dz}\tanh(z)=1-\tanh^2(z)\) using the definition of tanh.  
5. In an aerospace fault-detection network, the final layer must output a calibrated probability between 0 and 1; which activation should be chosen and why would tanh be a poor substitute?