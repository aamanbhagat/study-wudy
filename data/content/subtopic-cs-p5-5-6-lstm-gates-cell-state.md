## What it is
A Long Short-Term Memory (LSTM) unit is a specialized type of Recurrent Neural Network (RNN) cell designed to overcome the standard RNN's difficulty in learning long-range dependencies. It achieves this by introducing a dedicated "cell state" that acts as a memory conveyor belt, along with three "gates"—input, forget, and output—that are small neural networks regulating the flow of information into and out of this cell state.

## Why it matters
LSTMs are critical for analyzing time-series data where context from the distant past influences the present, a common scenario in aerospace. For example, they are used to predict aircraft engine failures by analyzing streams of sensor data over hundreds of hours, where a subtle anomaly long ago might signal an impending fault. They are also used in trajectory prediction for satellites and spacecraft, where the entire past flight path informs the future position.

## When to study it
Before tackling LSTMs, you must have a solid grasp of the following:
*   **Standard Recurrent Neural Networks (RNNs):** Understand the structure of a simple RNN cell, the concept of a hidden state, and how it's updated over time.
*   **The Vanishing/Exploding Gradient Problem:** You must understand *why* simple RNNs fail on long sequences—how gradients diminish or grow exponentially during backpropagation through time.
*   **Activation Functions:** Be fluent in the behavior and derivatives of the sigmoid ($\sigma$) and hyperbolic tangent ($\tanh$) functions, as they are the core components of the LSTM's gates and state updates.

If you are not confident in these, pause and review them. The LSTM is a direct solution to the problems inherent in the simple RNN.

## How to study it (step by step)
1.  **Review the Simple RNN:** Draw a simple RNN cell. Write down its state update equation: $h_t = \tanh(W_{hh}h_{t-1} + W_{xh}x_t + b_h)$. Identify the single "hidden state" pathway and reason about why multiplying by $W_{hh}$ repeatedly leads to vanishing/exploding gradients.
2.  **Draw the LSTM Cell:** Draw the LSTM cell diagram from memory. Focus on the two horizontal lines passing through the cell: the cell state ($C_t$) and the hidden state ($h_t$). Label the three gates (Forget, Input, Output).
3.  **Derive the Forget Gate:** Start with the purpose: "Decide what information to throw away from the old cell state, $C_{t-1}$." The inputs are the previous hidden state $h_{t-1}$ and the current input $x_t$. The output must be a number between 0 (forget completely) and 1 (keep completely) for each element. This naturally leads to the sigmoid function: $f_t = \sigma(W_f [h_{t-1}, x_t] + b_f)$.
4.  **Derive the Input Gate & Candidate State:** The purpose is twofold: "Decide which new values to update" (the input gate $i_t$) and "Create a vector of new candidate values" (the candidate state $\tilde{C}_t$). The input gate is identical in form to the forget gate: $i_t = \sigma(W_i [h_{t-1}, x_t] + b_i)$. The candidate state uses $\tanh$ to create new values between -1 and 1: $\tilde{C}_t = \tanh(W_C [h_{t-1}, x_t] + b_C)$.
5.  **Derive the Cell State Update:** Combine the previous steps. The new cell state $C_t$ is what you get from the old state after forgetting some things, plus the new information you've decided to add. This is a direct translation to math: $C_t = f_t \odot C_{t-1} + i_t \odot \tilde{C}_t$. The symbol $\odot$ denotes element-wise multiplication.
6.  **Derive the Output Gate & Final Hidden State:** The purpose is: "Decide what part of the cell state to output." First, pass the cell state through $\tanh$ to squash values between -1 and 1. Then, use the output gate $o_t$ to filter it. The gate is again a sigmoid: $o_t = \sigma(W_o [h_{t-1}, x_t] + b_o)$. The final hidden state (and the output of the cell for this time step) is $h_t = o_t \odot \tanh(C_t)$.

## Key ideas, with intuition
1.  **The Cell State ($C_t$) is a Memory Conveyor Belt.** Imagine a straight conveyor belt running through your entire sequence. The cell state allows information to travel along this belt with very minor, controlled modifications. This is the primary mechanism that avoids the vanishing gradient problem; the path for gradients is more direct and involves mostly element-wise operations, not repeated matrix multiplications.
2.  **Gates are Learned, Dynamic Valves.** Each gate ($f_t, i_t, o_t$) is a small, single-layer neural network with a sigmoid activation. The sigmoid function squashes its output to the range $[0, 1]$. This output vector is then multiplied element-wise with another vector. An output of 0 from a gate "closes the valve," blocking information flow for that element. An output of 1 "opens the valve," letting all information through. The network *learns* the weights ($W, b$) of these gates to open and close them based on the context ($h_{t-1}, x_t$).
3.  **Separation of Concerns: Cell State vs. Hidden State.** The cell state $C_t$ is the internal, long-term memory. The hidden state $h_t$ is a filtered version of the cell state, used as the output for the current time step and as a short-term memory input for the next time step. Think of $C_t$ as the raw contents of your memory and $h_t$ as the specific thought you're focusing on *right now* based on that memory.

The core update equations are:
$$
\begin{align*}
f_t &= \sigma(W_f[h_{t-1}, x_t] + b_f) & \text{(Forget Gate)} \\
i_t &= \sigma(W_i[h_{t-1}, x_t] + b_i) & \text{(Input Gate)} \\
\tilde{C}_t &= \tanh(W_C[h_{t-1}, x_t] + b_C) & \text{(New Candidate Values)} \\
C_t &= f_t \odot C_{t-1} + i_t \odot \tilde{C}_t & \text{(Cell State Update)} \\
o_t &= \sigma(W_o[h_{t-1}, x_t] + b_o) & \text{(Output Gate)} \\
h_t &= o_t \odot \tanh(C_t) & \text{(Hidden State Update)}
\end{align*}
$$

## Worked example
Let's trace one forward pass with simple scalars instead of vectors to build intuition. Assume all weights are $1$ and all biases are $0$. Let $\sigma(x) = 1/(1+e^{-x})$ and $\tanh(x)$ be the standard functions.

**Given:**
*   Previous hidden state: $h_{t-1} = 0.5$
*   Previous cell state: $C_{t-1} = 0.2$
*   Current input: $x_t = 1.0$

**Step 1: Calculate gate values and candidate state.**
The concatenated input $[h_{t-1}, x_t]$ is effectively the sum in this scalar case since the weights are 1: $h_{t-1} + x_t = 0.5 + 1.0 = 1.5$.
*   **Forget Gate ($f_t$):** $f_t = \sigma(1 \cdot (0.5 + 1.0) + 0) = \sigma(1.5) \approx 0.818$.
    *   *Reflection:* The gate is mostly open. We will keep about 82% of the old cell state.
*   **Input Gate ($i_t$):** $i_t = \sigma(1 \cdot (0.5 + 1.0) + 0) = \sigma(1.5) \approx 0.818$.
    *   *Reflection:* The input gate is also mostly open. We will add about 82% of the new candidate information.
*   **Candidate State ($\tilde{C}_t$):** $\tilde{C}_t = \tanh(1 \cdot (0.5 + 1.0) + 0) = \tanh(1.5) \approx 0.905$.
    *   *Reflection:* This is the new information we are considering adding to memory.
*   **Output Gate ($o_t$):** $o_t = \sigma(1 \cdot (0.5 + 1.0) + 0) = \sigma(1.5) \approx 0.818$.
    *   *Reflection:* The output gate is mostly open. We will output about 82% of the (squashed) new cell state.

**Step 2: Update the cell state.**
Use the formula $C_t = f_t \cdot C_{t-1} + i_t \cdot \tilde{C}_t$.
*   $C_t = (0.818 \cdot 0.2) + (0.818 \cdot 0.905)$
*   $C_t = 0.1636 + 0.7403 = 0.9039$.
    *   *Reflection:* The old memory (0.2) was mostly kept and combined with the strong new candidate information (0.905), resulting in a new memory state close to the candidate.

**Step 3: Calculate the new hidden state.**
Use the formula $h_t = o_t \cdot \tanh(C_t)$.
*   $h_t = 0.818 \cdot \tanh(0.9039)$
*   $h_t = 0.818 \cdot 0.718 = 0.587$.
    *   *Reflection:* The new hidden state $h_t=0.587$ is the output for this time step. It's a filtered version of our new memory $C_t=0.9039$. It will be passed to the next time step along with $C_t$.

## Diagrams
```text
           +---------------------------------+
           |                                 |
C_{t-1} ---|-----(X)----(+)------------------|---> C_t
           |     ^      ^                    |
           |     | f_t  | i_t                |
           |     |      |                    |
           |   [sigm] [sigm] [tanh]          |
           |     ^      ^      ^             |
           +-----|------|------|-------------+
                 |      |      |
                 +------+------+-----> [tanh] --(X)--> h_t
                        |                   ^     ^
                        |                   |     | o_t
                        |                   +-- [sigm]
                        |                         ^
                        +-------------------------+
                        |
                 [h_{t-1}, x_t]

Legend:
(X) -> Element-wise multiplication
(+) -> Element-wise addition
[sigm], [tanh] -> Activation functions
f_t, i_t, o_t -> Forget, Input, Output gates
C_t -> Cell State ("conveyor belt")
h_t -> Hidden State ("output")
```

## Memory technique — remember this forever
1.  **The Story: The Office Worker.**
    *   **Cell State ($C_t$):** A long-term project document on your desk.
    *   **Forget Gate ($f_t$):** You read yesterday's document ($C_{t-1}$) and a new email ($x_t$). You decide which paragraphs are now irrelevant and cross them out. This is $f_t \odot C_{t-1}$.
    *   **Input Gate ($i_t$) & Candidate ($\tilde{C}_t$):** Based on the same email ($x_t$) and your current working summary ($h_{t-1}$), you write new notes on a scratchpad ($\tilde{C}_t$). You then decide which of these notes are important enough to add to the main document ($i_t \odot \tilde{C}_t$).
    *   **Output Gate ($o_t$):** Your boss asks for a quick summary. You look at your updated project document ($C_t$), decide which parts are relevant for the immediate question ($o_t$), and formulate your response ($h_t$).

2.  **Must-Overlearn Formulas:**
    $$ C_t = f_t \odot C_{t-1} + i_t \odot \tilde{C}_t $$
    $$ h_t = o_t \odot \tanh(C_t) $$
    These two equations define the entire state update. The gates ($f_t, i_t, o_t$) and the candidate ($\tilde{C}_t$) are all variations of the same form: `activation(W[h_{t-1}, x_t] + b)`.

3.  **Spaced Repetition Schedule:**
    Review these concepts and re-derive the equations from the "Office Worker" story at:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:**
    If you forget the formulas, rebuild them from their *purpose*.
    *   "I need to control information flow." -> Gates.
    *   "Gates must act like valves." -> Sigmoid activation, range $[0,1]$.
    *   "I need a separate memory line." -> Cell State $C_t$.
    *   "How do I update memory?" -> Forget old stuff, add new stuff. This immediately gives you the structure of the $C_t$ update: `(old * forget_factor) + (new * add_factor)`.
    *   "How do I produce an output?" -> Filter the current memory. This gives you the $h_t$ update: `(filter_factor * processed_memory)`.

## Common mistakes
1.  **Confusing Cell State ($C_t$) and Hidden State ($h_t$).** $C_t$ is the internal long-term memory; it is passed only to the next LSTM cell. $h_t$ is the output of the cell for the current time step *and* an input to the next cell; it is what the rest of the network (e.g., a downstream Dense layer) sees.
2.  **Forgetting the Activations.** The choice of $\sigma$ and $\tanh$ is not arbitrary. Gates *must* use sigmoid to produce a $[0,1]$ mask for modulation. Cell state candidates and outputs use $\tanh$ to keep values normalized in a $[-1,1]$ range. Mixing these up breaks the entire mechanism.
3.  **Misinterpreting the Concatenation $[h_{t-1}, x_t]$.** This is not addition. It means stacking the two vectors together to form a single, longer vector which is then fed into the gate's linear layer.

## Self-check
1.  What is the dimensionality of the weight matrix $W_f$ for the forget gate if the input $x_t$ has dimension 50 and the hidden state $h_t$ has dimension 100?
2.  Imagine an LSTM is processing text. When it sees a period "." at the end of a sentence, how would you intuitively expect the forget gate's activation values to behave at the next time step (when processing the first word of the new sentence)? Why?
3.  If you set the biases of the forget gates ($b_f$) to a large positive value (e.g., +5) during initialization, what effect would this have on the network's ability to learn? How would it impact the flow of gradients during training?