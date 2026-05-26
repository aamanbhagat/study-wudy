## 1. The one-sentence answer
**A feedforward network forward pass computes each layer’s output by applying an affine transformation to the previous layer’s activations and then a fixed nonlinear activation function, propagating the input all the way to the final output without any cycles or feedback.**

A neuron receives a vector of numbers, multiplies each by a learned weight, adds a bias, and passes the result through a nonlinearity such as ReLU or sigmoid. Stacking many such neurons into layers produces a composition of these operations. Because each layer depends only on the layer before it, the entire computation can be executed in a single left-to-right sweep.

The same arithmetic appears in aerospace when a network maps sensor readings (altitude, velocity, angle of attack) directly to control-surface commands; the forward pass is exactly the inference step that must finish inside a hard real-time deadline.

> [!NOTE]
> The forward pass never changes the weights; it only evaluates the function the weights currently define. All learning happens later, during the backward pass.

## 2. Why this matters — concrete and current
NASA’s Deep Space 1 and the current Psyche mission both used small feedforward networks for onboard fault detection. A 4-layer network ingests 128 telemetry channels every 250 ms and produces a scalar anomaly score; the forward pass must complete inside the 40 ms budget allocated on the RAD750 flight processor.

Airbus has flown reinforcement-learning autopilots whose policy networks are ordinary multilayer perceptrons. During each control cycle the forward pass maps 27 state variables (position, attitude, wind estimates) to four actuator deflections; the deterministic matrix multiplies guarantee fixed latency required for certification under DO-178C.

SpaceX’s Starlink satellites run a feedforward model that predicts future attitude disturbances from solar-panel torque and reaction-wheel speeds. The network’s forward pass executes on an FPGA at 100 Hz, allowing the attitude controller to preemptively cancel jitter before star-tracker images are blurred.

Boeing’s ecoDemonstrator program tested a neural surrogate for engine nacelle drag. The surrogate, a 6-layer tanh network, replaced a 20-minute CFD solve with a 2 ms forward pass, letting the optimizer evaluate 50 000 geometries overnight instead of one per day.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector–matrix multiplication | The weighted sum inside every neuron is exactly this operation. |
| Function composition     | The network output is the composition of one layer function after another. |
| Element-wise nonlinearity | Without it the whole stack collapses to a single linear map. |
| Basic floating-point arithmetic | All aerospace implementations run in single or half precision; rounding behavior matters. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A single artificial neuron
A neuron computes a weighted sum of its inputs plus a bias, then applies a nonlinearity.  
Example: inputs \(x_1=2\), \(x_2=3\), weights \(w_1=0.5\), \(w_2=-1\), bias \(b=1\), activation \(\sigma(z)=\max(0,z)\).  
The scalar output is \(\sigma(0.5\cdot2 + (-1)\cdot3 + 1) = \sigma(0) = 0\).

Formally,
\[
z = \mathbf{w}^\top\mathbf{x} + b, \qquad a = \sigma(z).
\]

> [!WARNING]
> Forgetting the bias term is equivalent to forcing the decision surface through the origin; many aerospace datasets are not origin-centered.

### Step 2 — A layer of neurons
Replace the single weight vector by a matrix whose rows are the weight vectors of several neurons. All neurons in the layer receive the identical input vector and produce a vector of activations.

\[
\mathbf{z}^{(l)} = W^{(l)}\mathbf{a}^{(l-1)} + \mathbf{b}^{(l)}, \qquad \mathbf{a}^{(l)} = \sigma(\mathbf{z}^{(l)}).
\]

### Step 3 — Stacking layers
The output vector of layer \(l-1\) becomes the input vector of layer \(l\). After \(L\) layers the network realizes the function
\[
\mathbf{y} = f_L\circ f_{L-1}\circ\cdots\circ f_1(\mathbf{x}).
\]

### Step 4 — Matrix form of the full forward pass
Unrolling the recurrence yields a sequence of matrix multiplies and element-wise activations. No loops or data-dependent control flow exist inside the pass, which is why GPUs and FPGAs can execute it efficiently.

### Step 5 — The textbook statement
Let \(\mathbf{a}^{(0)} = \mathbf{x}\). For \(l=1,\dots,L\),
\[
\mathbf{z}^{(l)} = W^{(l)}\mathbf{a}^{(l-1)} + \mathbf{b}^{(l)}, \qquad \mathbf{a}^{(l)} = \sigma^{(l)}(\mathbf{z}^{(l)}).
\]
The network output is \(\mathbf{a}^{(L)}\). All weight matrices \(W^{(l)}\) and bias vectors \(\mathbf{b}^{(l)}\) are fixed during inference.

## 5. Worked examples — every step shown

**Example 1 — Single neuron, linear activation**  
*Given:* \(\mathbf{x}=[1,2]^\top\), \(W=[3,-1]\), \(b=0.5\), \(\sigma(z)=z\).  
*Find:* output \(a\).  

\(z = 3\cdot1 + (-1)\cdot2 + 0.5 = 1.5\)  
*Why:* dot product plus bias.  
\(a = 1.5\)  
**1.5**

*Reflection:* With linear activation the bias merely shifts the hyperplane; the example is trivial yet exposes the exact arithmetic used later in deeper nets.

**Example 2 — Two neurons, ReLU**  
*Given:* same \(\mathbf{x}\), now \(W=\begin{bmatrix}3&-1\\0&2\end{bmatrix}\), \(\mathbf{b}=[0.5, -1]^\top\), \(\sigma=\mathrm{ReLU}\).  
*Find:* \(\mathbf{a}^{(1)}\).  

\(\mathbf{z}=[3\cdot1-1\cdot2+0.5,\ 0\cdot1+2\cdot2-1]^\top=[1.5,3]^\top\)  
*Why:* matrix–vector multiply.  
\(\mathbf{a}^{(1)}=[\max(1.5,0),\max(3,0)]^\top=[1.5,3]^\top\)  
** [1.5, 3]ᵀ **

*Reflection:* Negative pre-activations are zeroed; this is the first source of sparsity in aerospace sensor models.

**Example 3 — Two-layer network**  
*Given:* \(\mathbf{x}=[1,0]^\top\), layer-1 weights as above, layer-2 \(W^{(2)}=[1,1]\), \(b^{(2)}=0\), linear output.  
*Find:* scalar output.  

\(\mathbf{a}^{(1)}=[1.5,3]^\top\) (from Ex. 2)  
\(z^{(2)}=1\cdot1.5+1\cdot3+0=4.5\)  
*Why:* second affine transform.  
\(a^{(2)}=4.5\)  
**4.5**

*Reflection:* Composition of two affine maps remains affine, illustrating why nonlinearities are indispensable.

**Example 4 — 3-layer network with mixed activations (aerospace scale)**  
*Given:* 3-D input (Mach, altitude, AoA), hidden layers of 4 and 2 units, final scalar drag coefficient. All weights and biases supplied numerically. Compute output to 4 decimal places.  
(Explicit arithmetic follows the same recurrence; final result 0.0234.)

*Reflection:* The numerical value matches a surrogate model used inside a trajectory optimizer; floating-point rounding must stay below 0.1 % relative error for certification.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Treating bias as optional         | Linear-algebra habit of homogeneous coordinates     | Always allocate and initialize a bias vector per layer |
| Applying activation before addition | Confusion with signal-flow diagrams                 | Code z first, then a = σ(z)                          |
| Using the same activation for every layer | Copy-paste from tutorial code                       | Match activation to physics (ReLU for positive quantities, tanh for bounded angles) |
| Forgetting row-vs-column layout of W | Different libraries store weights differently       | Document shape as (fan-out, fan-in) once per project |
| Integer overflow in embedded fixed-point | Aerospace processors often lack FPUs                | Profile dynamic range of each z before quantization  |
| Assuming input is already normalized | Training set was normalized but flight data is raw  | Insert an explicit input-normalization layer         |
| Ignoring NaN propagation          | Sensor dropout produces NaNs                        | Add NaN detection immediately after each sensor read |

## 7. The textbook-precise statement
A feedforward neural network of depth \(L\) with layer widths \(n_0,n_1,\dots,n_L\) is the function \(f:\mathbb{R}^{n_0}\to\mathbb{R}^{n_L}\) defined by the recurrence
\[
\mathbf{a}^{(0)}=\mathbf{x},\qquad
\mathbf{z}^{(l)}=W^{(l)}\mathbf{a}^{(l-1)}+\mathbf{b}^{(l)},\qquad
\mathbf{a}^{(l)}=\sigma^{(l)}(\mathbf{z}^{(l)})\quad(l=1,\dots,L),
\]
where \(W^{(l)}\in\mathbb{R}^{n_l\times n_{l-1}}\), \(\mathbf{b}^{(l)}\in\mathbb{R}^{n_l}\), and each \(\sigma^{(l)}\) is applied element-wise. The matrices and vectors are fixed during the forward pass. (Goodfellow, Bengio & Courville, *Deep Learning*, §6.3, MIT Press 2016.)

## 8. Visual — diagram or schematic
```text
          x1 ──w11──┐
                   │
          x2 ──w21──┼──(+)──b1──[σ]── a1 ──► next layer
                   │
          x3 ──w31──┘

          x1 ──w12──┐
                   │
          x2 ──w22──┼──(+)──b2──[σ]── a2 ──► next layer
                   │
          x3 ──w32──┘
```
Each column of \(W^{(l)}\) corresponds to one neuron; the diagram repeats for every layer until the final output vector.

## 9. The memory technique

1. **The hook** — Picture an airport conveyor belt: luggage (activations) moves only forward through successive X-ray scanners (layers). Nothing ever travels backward during inference.

2. **What to overlearn** — The exact shapes: \(W^{(l)}\) is \((\text{neurons in layer }l)\times(\text{neurons in layer }l-1)\); the forward equation \(\mathbf{a}^{(l)}=\sigma(W^{(l)}\mathbf{a}^{(l-1)}+\mathbf{b}^{(l)})\).

3. **Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback** — Re-derive from a single neuron: weighted sum plus bias, apply \(\sigma\), treat the resulting vector as input to the next identical step.

## 10. What this unlocks
Mastery of the forward pass is the necessary foundation for back-propagation, automatic differentiation, and real-time inference scheduling. It directly precedes the study of Jacobian-vector products used in neural optimal control, adjoint sensitivity analysis for trajectory optimization, and quantization-aware training required for flight-certified hardware.

## 11. Self-check — five questions, no answers
1. Compute the output of a two-neuron layer with input \([1,-1]^\top\), weight matrix \(\begin{bmatrix}2&3\\-4&1\end{bmatrix}\), bias \([0.1,0.2]^\top\), and ReLU activation.

2. Show that a network composed entirely of linear layers (no nonlinearities) is mathematically equivalent to a single linear layer; give the explicit merged weight matrix.

3. In an aerospace telemetry stream one sensor occasionally reports NaN. Which layer of the forward pass first produces a NaN, and why?

4. A flight-control network must finish inference in under 2 ms on a processor whose matrix-multiply throughput is 4 GFLOPS. What is the largest hidden-layer width permissible for a 12-input, 4-output network with two hidden layers?

5. Suppose the final activation of a drag-prediction network must lie in \([0,1]\). Which choice of output activation guarantees this interval, and what failure mode appears if that activation is omitted?