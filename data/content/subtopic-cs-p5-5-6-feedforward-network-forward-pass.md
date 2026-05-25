## What it is
A feedforward pass is the process of computing a neural network's output from a given input. Information flows in one direction—from the input layer, through any hidden layers, to the output layer—without forming any cycles. This process is how a trained network makes a prediction, also known as inference.

## Why it matters
The forward pass is the "use" phase of a trained model. In aerospace, this means predicting satellite orbital decay from solar wind data, classifying radar signatures for autonomous drones, or running a flight control system that adapts to structural damage in real-time. Without a fast and correct forward pass, a trained model is useless for these time-critical applications.

## When to study it
You must be fluent with the following prerequisites. If you are not, stop and review them.
1.  **Linear Algebra:** Matrix-vector and matrix-matrix multiplication, vector addition, and understanding matrix dimensions.
2.  **Calculus:** The concept of a function, $f(x)$, and function composition, $g(f(x))$.
3.  **Basic ML Concepts:** The structure of a single neuron (weighted sum of inputs plus a bias) and the purpose of an activation function (e.g., Sigmoid, ReLU).

## How to study it (step by step)
1.  **Single Neuron Calculation:** Write down the equation for a single neuron's output: $a = \sigma(\sum_{i=1}^{n} w_i x_i + b)$. Given a vector of inputs `x`, weights `w`, and a bias `b`, calculate `a` by hand.
2.  **Vectorize a Single Layer:** Generalize the neuron calculation to a full layer of neurons. Express the computation for all neurons in the layer as a single matrix-vector equation: $\vec{a} = \sigma(W\vec{x} + \vec{b})$. Identify the dimensions of $W$, $\vec{x}$, and $\vec{b}$.
3.  **Stack the Layers:** Understand that the output of one layer, $\vec{a}^{[l-1]}$, becomes the input for the next layer, $\vec{a}^{[l]}$. Write the full chain of computations for a two-layer network: $\vec{a}^{[1]} = \sigma_1(W^{[1]}\vec{x} + \vec{b}^{[1]})$ and $\vec{a}^{[2]} = \sigma_2(W^{[2]}\vec{a}^{[1]} + \vec{b}^{[2]})$.
4.  **Implement in Code:** Using a library like NumPy, implement a function `forward_pass(X, W1, b1, W2, b2)` that performs the calculations from step 3. Pay close attention to the matrix dimensions (`.shape` attribute).
5.  **Trace the Dimensions:** For a network with an input layer of size $n_x$, a hidden layer of size $n_h$, and an output layer of size $n_y$, write down the dimensions of $W^{[1]}$, $b^{[1]}$, $W^{[2]}$, and $b^{[2]}$. This prevents the most common implementation errors.

## Key ideas, with intuition
1.  **Affine Transformation, then Non-linearity:** Each layer performs two sequential operations. First, an *affine transformation* (a linear map plus a translation), which rotates, scales, and shifts the input data. Second, a *non-linear activation*, which warps the space.
    $$ Z^{[l]} = W^{[l]}A^{[l-1]} + b^{[l]} \quad \text{(Affine Transformation)} $$
    $$ A^{[l]} = g^{[l]}(Z^{[l]}) \quad \text{(Element-wise Non-linearity)} $$
    Intuition: Imagine stretching and moving a rubber sheet (affine part), then wrinkling it (non-linear part). Stacking layers allows for complex, hierarchical wrinkling, enabling the network to approximate extremely complex functions.

2.  **Function Composition:** A deep neural network is nothing more than a deeply nested composite function. If each layer $l$ is a function $f_l$, then a 3-layer network computes $y = f_3(f_2(f_1(x)))$. The forward pass is simply the evaluation of this function.

3.  **Information Bottleneck:** The size (number of neurons) of each layer determines how much information can flow through it. A hidden layer with fewer neurons than the input layer forces the network to learn a compressed, salient representation of the data. This is a core concept in representation learning.

## Worked example
Consider a simple 2-layer network for predicting if a rocket engine component will fail ($1$) or not ($0$) based on two sensor readings: temperature ($x_1$) and pressure ($x_2$).

*   **Architecture:** 2 input neurons, 1 hidden layer with 3 neurons, 1 output neuron.
*   **Activations:** ReLU for the hidden layer, Sigmoid for the output layer.
*   **Input:** $X = \begin{pmatrix} 1.5 \\ 0.8 \end{pmatrix}$ (temp=1.5, pressure=0.8, normalized)
*   **Parameters (already trained):**
    *   $W^{[1]} = \begin{pmatrix} 0.2 & 0.7 \\ -0.5 & 0.1 \\ 1.0 & -1.2 \end{pmatrix}$, $b^{[1]} = \begin{pmatrix} 0.1 \\ 0.2 \\ -0.3 \end{pmatrix}$
    *   $W^{[2]} = \begin{pmatrix} 0.9 & -0.4 & 0.6 \end{pmatrix}$, $b^{[2]} = \begin{pmatrix} -0.1 \end{pmatrix}$

**Step 1: Compute hidden layer pre-activation $Z^{[1]}$}
This is the affine transformation for the first layer.
$$ Z^{[1]} = W^{[1]}X + b^{[1]} = \begin{pmatrix} 0.2 & 0.7 \\ -0.5 & 0.1 \\ 1.0 & -1.2 \end{pmatrix} \begin{pmatrix} 1.5 \\ 0.8 \end{pmatrix} + \begin{pmatrix} 0.1 \\ 0.2 \\ -0.3 \end{pmatrix} $$
$$ Z^{[1]} = \begin{pmatrix} (0.2)(1.5) + (0.7)(0.8) \\ (-0.5)(1.5) + (0.1)(0.8) \\ (1.0)(1.5) + (-1.2)(0.8) \end{pmatrix} + \begin{pmatrix} 0.1 \\ 0.2 \\ -0.3 \end{pmatrix} = \begin{pmatrix} 0.3 + 0.56 \\ -0.75 + 0.08 \\ 1.5 - 0.96 \end{pmatrix} + \begin{pmatrix} 0.1 \\ 0.2 \\ -0.3 \end{pmatrix} = \begin{pmatrix} 0.86 \\ -0.67 \\ 0.54 \end{pmatrix} + \begin{pmatrix} 0.1 \\ 0.2 \\ -0.3 \end{pmatrix} = \begin{pmatrix} 0.96 \\ -0.47 \\ 0.24 \end{pmatrix} $$
*Reflection: This step combines the inputs using the weights and biases of the first layer.*

**Step 2: Compute hidden layer activation $A^{[1]}$}
Apply the ReLU activation function, $g(z) = \max(0, z)$, element-wise.
$$ A^{[1]} = \text{ReLU}(Z^{[1]}) = \begin{pmatrix} \max(0, 0.96) \\ \max(0, -0.47) \\ \max(0, 0.24) \end{pmatrix} = \begin{pmatrix} 0.96 \\ 0 \\ 0.24 \end{pmatrix} $$
*Reflection: This introduces non-linearity. Note how the negative value was "turned off". This is the output of the hidden layer.*

**Step 3: Compute output layer pre-activation $Z^{[2]}$}
Use the output of the hidden layer, $A^{[1]}$, as the input to the second layer.
$$ Z^{[2]} = W^{[2]}A^{[1]} + b^{[2]} = \begin{pmatrix} 0.9 & -0.4 & 0.6 \end{pmatrix} \begin{pmatrix} 0.96 \\ 0 \\ 0.24 \end{pmatrix} + (-0.1) $$
$$ Z^{[2]} = ((0.9)(0.96) + (-0.4)(0) + (0.6)(0.24)) - 0.1 = (0.864 + 0 + 0.144) - 0.1 = 1.008 - 0.1 = 0.908 $$
*Reflection: This combines the hidden features to produce a single logit (pre-sigmoid value).*

**Step 4: Compute final output $A^{[2]}$}
Apply the Sigmoid activation function, $\sigma(z) = 1 / (1 + e^{-z})$, to get a probability.
$$ A^{[2]} = \sigma(Z^{[2]}) = \frac{1}{1 + e^{-0.908}} \approx \frac{1}{1 + 0.403} \approx 0.712 $$
*Reflection: This squashes the output into the range $[0, 1]$, interpreted as the probability of failure. The model predicts a ~71.2% chance of component failure.*

## Diagrams
A simple feedforward network structure.

```text
  Input Layer          Hidden Layer          Output Layer
   (Size n_x=2)         (Size n_h=3)          (Size n_y=1)

      x_1 O --------------O a_1^[1] ------------O a_1^[2] (Prediction)
          |\             /| \                 /
          | \           / |  \               /
          |  \         /  |   \             /
          |   \       /   |    \           /
          |    \     /    |     \         /
          |-----\---/-----|------\-------/
          |      \ /      |       \     /
          |     / \ \     |        \   /
          |    /   \ \    |         \ /
          |   /     \ \   |          /
          |  /       \ \  |         /
          | /         \ \ |        /
          |/           \ \|       /
      x_2 O --------------O a_2^[1] /
           \            /| \     /
            \          / |  \   /
             \        /  |   \ /
              \------/---O a_3^[1]
                       /
                      /
                     /

      A^[0] = X       Z^[1] = W^[1]A^[0] + b^[1]   Z^[2] = W^[2]A^[1] + b^[2]
                      A^[1] = g(Z^[1])            A^[2] = g(Z^[2])
```

## Memory technique — remember this forever
1.  **Mnemonic Story:** Imagine a signal (your input vector $X$) arriving at a series of relay stations (layers). At each station, a team of operators (the neurons) performs two actions:
    *   **"Weigh & Sum":** Each operator listens to all signals from the previous station, multiplies them by their assigned importance (weights $W$), sums them up, and adds their personal bias $b$. This is the $Z = WA+b$ step.
    *   **"Fire or Not":** Based on this summed signal, the operator decides how strongly to fire their own signal forward, using a simple rule (the activation function $g$). This is the $A = g(Z)$ step.
    The signal propagates from station to station until it leaves the final one as the prediction. The process is always **Weigh & Sum, then Fire**.

2.  **Formulas to Overlearn:**
    $$ Z^{[l]} = W^{[l]}A^{[l-1]} + b^{[l]} $$
    $$ A^{[l]} = g^{[l]}(Z^{[l]}) $$
    (Note: For the first layer, $A^{[0]} = X$, the input features.)

3.  **Spaced Repetition Schedule:**
    *   Review these formulas and the "Weigh & Sum, then Fire" story tomorrow.
    *   Review again in 3 days.
    *   Review again in 7 days.
    *   Review again in 16 days.
    *   Review again in 35 days.
    During each review, re-derive the worked example by hand from memory.

4.  **First Principles Pathway:** If you forget everything, rebuild it from a single neuron. A neuron computes $a = g(\vec{w} \cdot \vec{x} + b)$. A layer is just a stack of these neurons, each with its own weight vector $\vec{w}_j$. Stacking these row vectors $\vec{w}_j^T$ gives the weight matrix $W$. The dot products for all neurons can then be computed at once with matrix multiplication: $W\vec{x}$. Add the vector of biases $\vec{b}$, and you've recovered $Z = Wx+b$. The activation $g$ is applied element-wise. The whole network is just chaining these layer computations.

## Common mistakes
1.  **Dimension Mismatch:** For the multiplication $W^{[l]}A^{[l-1]}$, the inner dimensions must match. If layer $l-1$ has $n^{[l-1]}$ neurons and layer $l$ has $n^{[l]}$ neurons, then $A^{[l-1]}$ is $(n^{[l-1]}, 1)$ and $W^{[l]}$ must be $(n^{[l]}, n^{[l-1]})$. A common error is transposing $W$ incorrectly.
2.  **Incorrect Order of Operations:** Always perform the full affine transformation $W \cdot A + b$ *before* applying the activation function $g$. Applying it to $W \cdot A$ and then adding $b$ is incorrect and breaks the model's mathematical structure.
3.  **Forgetting the Bias:** The bias term is critical. Forgetting to add $b^{[l]}$ is a frequent bug in from-scratch implementations. It provides an extra degree of freedom, allowing the activation function's curve to be shifted left or right, which is essential for learning.

## Self-check
1.  A network layer has 10 neurons, and it receives input from a previous layer that has 32 neurons. What are the dimensions of the weight matrix $W$ and the bias vector $b$ for this layer?
2.  Given $W = \begin{pmatrix} 1 & -2 \\ 0 & 3 \end{pmatrix}$, $b = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$, and input $A_{in} = \begin{pmatrix} 0.5 \\ 0.5 \end{pmatrix}$. Calculate the output $A_{out}$ if the activation function is ReLU.
3.  Why would a deep neural network composed entirely of layers with *linear* activation functions (i.e., $g(z)=z$) be a waste of computational resources? What simpler model would it be equivalent to?