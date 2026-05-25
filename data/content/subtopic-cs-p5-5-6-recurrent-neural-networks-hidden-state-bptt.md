## What it is
A Recurrent Neural Network (RNN) is a type of neural network designed to handle sequential data by incorporating a "memory" loop. The core of this memory is the **hidden state**, a vector that captures information from all previous steps in the sequence. **Backpropagation Through Time (BPTT)** is the algorithm used to train RNNs by "unrolling" this loop into a deep network, allowing standard backpropagation to calculate gradients across the entire sequence.

## Why it matters
RNNs are fundamental for processing any time-series data, which is ubiquitous in aerospace engineering. They are used for predictive maintenance (analyzing sensor data from a jet engine over time to predict failure), flight trajectory prediction and optimization (given the last $N$ positions, predict the next), and decoding telemetry signals from spacecraft. Understanding how an RNN "remembers" and learns from the past is critical to building these systems.

## When to study it
You must have a solid grasp of these prerequisites before tackling this topic. If you are not confident, review them first.
1.  **Calculus:** The chain rule for multivariate functions is non-negotiable. BPTT is a direct application of it.
2.  **Linear Algebra:** Matrix-vector and matrix-matrix multiplication.
3.  **Feedforward Neural Networks:** You must understand layers, activation functions (like $\tanh$), weights, biases, and the standard backpropagation algorithm.

## How to study it (step by step)
1.  **Draw the "folded" RNN cell.** Represent the input $x_t$, hidden state $h_t$, and output $y_t$. Draw the crucial arrow that loops from $h_t$ back as an input to the cell for the next timestep, representing $h_{t-1}$. Label the weight matrices connecting them.
2.  **Write the forward pass equations.** Given an input $x_t$ and the previous hidden state $h_{t-1}$, write the mathematical expressions for the new hidden state $h_t$ and the output $y_t$. Use $\tanh$ as the activation for the hidden state.
3.  **Unroll the network.** Take your drawing from step 1 and draw it out for three consecutive timesteps ($t=1, 2, 3$). This transforms the loop into a linear sequence of connected layers. Trace the path of information from $x_1$ to $y_3$.
4.  **Derive a simple gradient.** Assume a loss $L_3$ that only depends on the final output $y_3$. Use the unrolled graph and the chain rule to write out the full expression for the gradient of the loss with respect to the recurrent weight matrix, $\frac{\partial L_3}{\partial W_{hh}}$. Notice how it sums contributions from each timestep.
5.  **Identify the problem.** Look at the expression you just derived. Notice the repeated multiplication of the matrix $W_{hh}$. Reason about what happens to the gradient if the eigenvalues of this matrix are consistently greater than 1 or less than 1. This is the intuition behind the exploding/vanishing gradient problem.

## Key ideas, with intuition
1.  **The Hidden State is the Network's Memory.** Think of the hidden state vector $h_t$ as the network's summary of everything it has seen up to timestep $t$. At each step, it updates this summary based on two things: its old summary ($h_{t-1}$) and the new piece of information ($x_t$). The core recurrence relation is:
    $$
    h_t = f(h_{t-1}, x_t)
    $$
    Typically, this is implemented as:
    $$
    h_t = \tanh(W_{hh}h_{t-1} + W_{xh}x_t + b_h)
    $$
    Here, $W_{hh}$ governs how the old memory influences the new memory, and $W_{xh}$ governs how the new input influences the new memory.

2.  **Weights are Shared Across Time.** This is a critical concept. The matrices $W_{hh}$, $W_{xh}$, and the output matrix $W_{hy}$ are the *same* at every single timestep. The network doesn't learn a new set of rules for $t=1$, $t=2$, etc. It learns one single rule for how to update its state, and applies it repeatedly. This makes the model efficient and allows it to generalize to sequences of varying lengths.

3.  **Unrolling Turns Recurrence into Depth.** A loop is hard to reason about with calculus. BPTT's key insight is to "unroll" the network for a finite number of timesteps. A loop for $T$ steps becomes a $T$-layer deep feedforward network where each layer shares the same weights. This reframing makes the problem tractable; we can now use our familiar backpropagation algorithm on this unrolled graph.

4.  **Gradients Flow Backwards *Through Time*.** When we calculate the gradient of the loss at the end of the sequence (say, at time $T$), that error signal must be propagated backward. Because $h_T$ depends on $h_{T-1}$, which depends on $h_{T-2}$, and so on, the gradient must flow all the way back to the beginning of the sequence. The gradient for a shared weight like $W_{hh}$ is the *sum* of its contributions at every single timestep.
    $$
    \frac{\partial L}{\partial W_{hh}} = \sum_{t=1}^{T} \frac{\partial L}{\partial h_t} \frac{\partial h_t}{\partial W_{hh}}
    $$
    This summation is why an event at the beginning of a long sequence can (in theory) influence the final training update.

## Worked example
Let's trace a simple RNN forward and compute one gradient term for BPTT.
- **Network:** One input neuron, one hidden neuron, one output neuron.
- **Sequence length:** $T=2$.
- **Input sequence:** $x_1 = 2$, $x_2 = 3$.
- **Initial hidden state:** $h_0 = 0$.
- **Weights (scalar here):** $W_{xh} = 0.5$, $W_{hh} = 0.1$, $W_{hy} = 0.2$. Biases are zero for simplicity.
- **Activation:** $\tanh$.

**Step 1: Forward Pass at $t=1$**
The hidden state $h_1$ is calculated based on $x_1$ and $h_0$.
$$
h_1 = \tanh(W_{hh}h_0 + W_{xh}x_1) = \tanh(0.1 \cdot 0 + 0.5 \cdot 2) = \tanh(1) \approx 0.76
$$
The output $y_1$ is calculated from $h_1$.
$$
y_1 = W_{hy}h_1 = 0.2 \cdot 0.76 = 0.152
$$

**Step 2: Forward Pass at $t=2$**
The hidden state $h_2$ is calculated based on $x_2$ and $h_1$.
$$
h_2 = \tanh(W_{hh}h_1 + W_{xh}x_2) = \tanh(0.1 \cdot 0.76 + 0.5 \cdot 3) = \tanh(0.076 + 1.5) = \tanh(1.576) \approx 0.918
$$
The output $y_2$ is calculated from $h_2$.
$$
y_2 = W_{hy}h_2 = 0.2 \cdot 0.918 = 0.1836
$$

**Step 3: Backpropagation Through Time (for $W_{hh}$)**
Let's say the target at $t=2$ was $y_{\text{true}, 2} = 1$, and our loss is Mean Squared Error: $L_2 = (y_2 - y_{\text{true}, 2})^2 = (0.1836 - 1)^2 \approx 0.666$. We want to find $\frac{\partial L_2}{\partial W_{hh}}$.

Using the chain rule on the unrolled graph:
$$
\frac{\partial L_2}{\partial W_{hh}} = \frac{\partial L_2}{\partial y_2} \frac{\partial y_2}{\partial h_2} \left( \frac{\partial h_2}{\partial h_1}\frac{\partial h_1}{\partial W_{hh}} + \frac{\partial h_2}{\partial W_{hh}} \right)
$$
Let's compute each piece. Note that $\frac{d}{dx}\tanh(x) = 1 - \tanh^2(x)$.
- $\frac{\partial L_2}{\partial y_2} = 2(y_2 - y_{\text{true}, 2}) = 2(0.1836 - 1) = -1.6328$
- $\frac{\partial y_2}{\partial h_2} = W_{hy} = 0.2$
- $\frac{\partial h_2}{\partial W_{hh}}$: This is the gradient contribution from timestep $t=2$. $h_2 = \tanh(W_{hh}h_1 + ...)$, so the derivative w.r.t $W_{hh}$ is $(1-\tanh^2(\text{input})) \cdot h_1 = (1-h_2^2)h_1 = (1-0.918^2) \cdot 0.76 \approx 0.12$
- $\frac{\partial h_2}{\partial h_1}$: This term propagates the gradient from $t=2$ back to $t=1$. $h_2 = \tanh(W_{hh}h_1 + ...)$, so the derivative w.r.t $h_1$ is $(1-h_2^2)W_{hh} = (1-0.918^2) \cdot 0.1 \approx 0.0158$
- $\frac{\partial h_1}{\partial W_{hh}}$: This is the gradient contribution from timestep $t=1$. $h_1 = \tanh(W_{hh}h_0 + ...)$, so the derivative is $(1-h_1^2)h_0 = (1-0.76^2) \cdot 0 = 0$.

Plugging it all in:
$$
\frac{\partial L_2}{\partial W_{hh}} = (-1.6328)(0.2) \left( (0.0158) \cdot 0 + 0.12 \right) = -0.32656 \cdot 0.12 \approx -0.039
$$

**Reflection:** The calculation for $\frac{\partial L_2}{\partial W_{hh}}$ involved terms from $t=2$ (like $h_1$) and required propagating the error back from $h_2$ to $h_1$. If the loss depended on $y_1$ as well, we would add another full gradient path originating from $L_1$. The total gradient is the sum of these influences from all timesteps.

## Diagrams
The "folded" or compact representation of an RNN cell:
```text
      +-------+
      |       |
h_t-1 ---->|   A   |----> h_t
      |       |   |
x_t ---->|       |---
      +-------+  |
                 |
                 v
                 y_t
```
The "unrolled" representation for three timesteps, which makes BPTT intuitive:
```text
      h_0
       |
       v
+-------+      +-------+      +-------+
|       | h_1  |       | h_2  |       | h_3
|   A   |----->|   A   |----->|   A   |-----> ...
|       |      |       |      |       |
+-------+      +-------+      +-------+
    ^              ^              ^
    |              |              |
   x_1            x_2            x_3
    |              |              |
    v              v              v
   y_1            y_2            y_3
```

## Memory technique — remember this forever
1.  **The Story:** An RNN is a storyteller trying to write a novel one word at a time. The **hidden state ($h_t$)** is the storyteller's "mental summary" of the plot so far. To write the next word ($y_t$), they read the new prompt ($x_t$) and consult their entire mental summary ($h_{t-1}$). **BPTT** is like an editor reading the finished, terrible novel (high loss), and figuring out that the core problem started with a weak character introduction in Chapter 1 (a large gradient contribution from an early timestep). The editor's red pen marks flow backward through the manuscript, from end to beginning.

2.  **Must-Know Formulas:**
    -   Hidden State Update: $h_t = \tanh(W_{hh}h_{t-1} + W_{xh}x_t + b_h)$
    -   Output: $y_t = W_{hy}h_t + b_y$

3.  **Spaced Repetition Schedule:** Review this material and re-derive the BPTT gradient for $W_{hh}$ at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget BPTT, you can always rebuild it.
    -   Draw the unrolled network graph for 3-4 timesteps.
    -   Write the forward pass equations for each node ($h_1, y_1, h_2, y_2, ...$).
    -   Define a loss function at the final step, $L_T$.
    -   Apply the multivariate chain rule, step by step, backwards from the loss. For any weight $W$, the gradient $\frac{\partial L_T}{\partial W}$ is the sum of all paths from $L_T$ to every occurrence of $W$ in the graph.

## Common mistakes
1.  **Thinking weights are different at each step.** Students often mistakenly think there's a $W_{hh}^{(1)}$, $W_{hh}^{(2)}$, etc. The core principle of an RNN is that the weights are *shared* across all timesteps.
2.  **Confusing hidden state and output.** $h_t$ is the internal memory of the network. $y_t$ is the prediction or output *at that step*. They are not the same. In many applications, we only care about the final output $y_T$ after processing the whole sequence.
3.  **Ignoring the vanishing/exploding gradient problem.** The BPTT derivation involves repeatedly multiplying by $W_{hh}$ (in the $\frac{\partial h_t}{\partial h_{t-1}}$ term). If the values in this matrix are small, the gradient shrinks exponentially as it propagates back, making it impossible to learn long-range dependencies ("vanishing"). If they are large, it explodes. This is a fundamental limitation of simple RNNs.

## Self-check
1.  An RNN uses a sigmoid activation function $\sigma(z) = 1/(1+e^{-z})$ for its hidden state. Write down the full equation for $h_t$ in terms of $h_{t-1}$, $x_t$, the relevant weight matrices, and the bias vector.
2.  You are given an RNN with $W_{xh}=1, W_{hh}=2, b_h=0$ and $\tanh$ activation. If $h_0=0.5$ and the input sequence is $x_1=1, x_2=-2$, what is the value of the hidden state $h_2$?
3.  Explain in 1-2 sentences why the gradient $\frac{\partial L_T}{\partial W_{xh}}$ sums up contributions from every timestep, not just the final one. Use the chain rule in your explanation.