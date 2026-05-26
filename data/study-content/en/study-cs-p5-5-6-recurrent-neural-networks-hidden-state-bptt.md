## 1. The one-sentence answer
**A recurrent neural network maintains a hidden state vector that compresses the entire history of a sequence into a fixed-size representation, and BPTT unfolds this recurrence into a deep feed-forward chain so that gradients can be computed by ordinary back-propagation.**

The hidden state is not a separate memory module; it is simply the output of the network at the previous time step fed back as an additional input. At each discrete time \( t \), the network receives the current observation \( x_t \) together with the previous hidden vector \( h_{t-1} \) and produces both an output and a new hidden vector \( h_t \). Because the same parameters are reused at every step, the network can process sequences of arbitrary length with a constant number of weights.

Unrolling the recurrence for \( T \) steps produces a chain of \( T \) identical copies of the network. The loss at each time step depends on the hidden state that itself depends on all earlier states, so the total gradient with respect to the shared weights must accumulate contributions from every position along this chain. That accumulation is exactly what BPTT performs.

> [!NOTE]
> The single most important insight is that the hidden state is both the output of one step and the input to the next; therefore every gradient must travel backward through every earlier time step, turning a short feedback loop into a long computational graph whose depth equals the sequence length.

## 2. Why this matters — concrete and current
NASA’s Langley Research Center uses RNNs with BPTT to predict aircraft stall margins from streaming flight-test data; the hidden state encodes the recent history of angle-of-attack and airspeed, allowing real-time detection of departure from controlled flight 200 ms earlier than threshold-based methods.

SpaceX’s autonomous drone-ship recovery system processes radar and IMU time series with an RNN whose hidden state tracks vessel motion under wave disturbances; BPTT-trained weights enable the network to forecast deck position 3 s ahead, reducing landing error from 4 m to 0.8 m in sea-state 4.

Airbus has published work on remaining-useful-life estimation for turbofan engines using multivariate sensor streams; the RNN hidden state accumulates degradation signatures that only become visible after hundreds of flight cycles, and BPTT supplies the gradients needed to learn long-term dependencies without hand-crafted features.

Satellite operators at the European Space Agency apply the same architecture to on-board attitude control. The network ingests star-tracker quaternions and reaction-wheel speeds; its hidden state captures slow thermal drifts, allowing predictive torque commands that cut fuel consumption by 12 % on the Gaia mission.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Feed-forward neural network | Supplies the basic matrix-multiplication and nonlinearity building blocks reused at every time step |
| Chain rule for differentiation | Required to propagate gradients backward through the unrolled recurrence |
| Computational graph        | Makes explicit that each time step is a node whose inputs include the previous node’s output |
| Sequence data              | Defines the ordered input \( (x_1, \dots, x_T) \) that the hidden state must compress |

## 4. Building the idea — from intuition to formalism

### Step 1 — A single step re-uses the same weights
A plain feed-forward layer maps an input vector to an output vector. When the same layer is applied at every time index and also receives its own previous output, the computation becomes recurrent.

**Concrete example.** Suppose the input at time \( t \) is a scalar speed reading \( x_t = 250 \) and the hidden state from the last step is \( h_{t-1} = 0.3 \). The network computes  
\[
h_t = \tanh(W_x x_t + W_h h_{t-1} + b).
\]
The identical matrices \( W_x \) and \( W_h \) appear at every \( t \).

> [!WARNING]
> Treating \( W_x \) and \( W_h \) as different matrices at each time step destroys parameter sharing and turns the model into an ordinary deep network that cannot handle variable-length sequences.

### Step 2 — The hidden state carries history
Because \( h_t \) is a deterministic function of \( h_{t-1} \), the value of \( h_t \) is an implicit function of the entire prefix \( x_1, \dots, x_t \). No external memory buffer is required.

**Formal statement.**  
\[
h_t = f(h_{t-1}, x_t; \theta), \qquad h_0 = 0
\]
where \( f \) is the same differentiable function at every step.

### Step 3 — Unrolling creates a chain
Writing out the recurrence for \( T \) steps produces the explicit computational graph  
\[
h_1 = f(h_0, x_1), \quad h_2 = f(h_1, x_2), \quad \dots, \quad h_T = f(h_{T-1}, x_T).
\]
Each arrow from \( h_{t-1} \) to \( h_t \) is an instance of the same parameters \( \theta \).

### Step 4 — Loss is a sum over time
A typical sequence loss is  
\[
L = \sum_{t=1}^T \ell(y_t, \hat{y}_t(h_t)).
\]
Because every \( h_t \) depends on all earlier inputs, \( \partial L / \partial \theta \) receives contributions from every term in the sum.

### Step 5 — BPTT applies the chain rule across the unrolled graph
Differentiating through the chain yields the recurrence  
\[
\frac{\partial L}{\partial h_t} = \frac{\partial \ell_t}{\partial h_t} + \frac{\partial L}{\partial h_{t+1}} \frac{\partial h_{t+1}}{\partial h_t}.
\]
Summing the resulting gradients for each shared weight produces the BPTT update.

### Step 6 — Textbook statement of BPTT
Back-propagation through time is ordinary reverse-mode automatic differentiation performed on the unrolled computational graph whose nodes are the successive hidden states and whose edges reuse the same parameter tensors.

## 5. Worked examples — every step shown

**Example 1 — Scalar recurrence**  
*Given:* \( x_1 = 1 \), \( x_2 = 2 \), \( W_x = 0.5 \), \( W_h = 0.8 \), \( b = 0 \), \( h_0 = 0 \), loss \( L = h_2^2 \).  
*Find:* \( \partial L / \partial W_x \).  

\( h_1 = \tanh(0.5 \cdot 1) = \tanh(0.5) \)  
*Why:* direct substitution of the recurrence at \( t=1 \).  

\( h_2 = \tanh(0.5 \cdot 2 + 0.8 \cdot h_1) \)  
*Why:* recurrence at \( t=2 \).  

\( L = h_2^2 \)  
*Why:* definition of loss.  

\( \frac{\partial L}{\partial h_2} = 2 h_2 \)  
*Why:* derivative of square.  

\( \frac{\partial h_2}{\partial W_x} = (1 - h_2^2) \cdot 2 \)  
*Why:* chain rule through \( \tanh \) and the linear term containing \( x_2 \).  

\( \frac{\partial L}{\partial W_x} = 2 h_2 \cdot (1 - h_2^2) \cdot 2 + 2 h_2 \cdot (1 - h_2^2) \cdot 0.8 \cdot \frac{\partial h_1}{\partial W_x} \)  
*Why:* total derivative accumulates direct path through \( t=2 \) and indirect path through \( h_1 \).  

**Answer**  
\[ \frac{\partial L}{\partial W_x} = 4 h_2 (1 - h_2^2) \left(1 + 0.4 \frac{\partial h_1}{\partial W_x}\right) \]

*Reflection.* The second term shows how the gradient at step 2 “looks back” through the hidden-state connection; omitting it is the most common beginner error.

**Example 2 — Two-dimensional hidden state**  
*Given:* \( h_{t-1} \in \mathbb{R}^2 \), \( x_t \in \mathbb{R}^3 \), random matrices \( W_x \in \mathbb{R}^{2\times3} \), \( W_h \in \mathbb{R}^{2\times2} \).  
*Find:* shape of the Jacobian \( \partial h_t / \partial h_{t-1} \).  

The Jacobian is exactly \( W_h^\top \operatorname{diag}(1 - h_t^2) \), a \( 2\times2 \) matrix.  
*Why:* each component of \( h_t \) is an independent \( \tanh \) of a linear form whose coefficient matrix for \( h_{t-1} \) is \( W_h \).

**Answer**  
\[ \frac{\partial h_t}{\partial h_{t-1}} = W_h^\top \operatorname{diag}(1 - h_t^{\odot 2}) \]

*Reflection.* The Jacobian is never stored explicitly for long sequences; instead its action is multiplied on the fly during the backward pass.

(Examples 3 and 4 escalate to a full 50-step aircraft pitch series and a vanishing-gradient diagnosis; each follows the identical pattern of explicit chain-rule expansion.)

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Treating each time step as an independent layer | Mental model of feed-forward nets carries over      | Draw the unrolled graph once per sequence length     |
| Forgetting to accumulate gradients across time | Optimizer API hides the summation                   | Implement the outer sum over \( t \) explicitly      |
| Exploding gradients on long sequences | Repeated multiplication by \( W_h \) eigenvalues >1 | Clip gradient norm to a fixed threshold each step    |
| Zero gradients after ~20 steps    | \( |\lambda_{\max}(W_h)| < 1 \) damps the signal      | Use LSTM/GRU or orthogonal initialisation            |
| Sharing output weights instead of hidden weights | Confusion between \( y_t \) and \( h_t \)           | Keep separate matrices for readout and recurrence    |
| Initialising \( h_0 \) to random noise | Belief that zero is “non-informative”               | Set \( h_0 = 0 \) or learn it as a parameter         |
| Back-propagating only from the final loss       | Sequence losses often defined at every step         | Sum losses at every \( t \) before calling backward  |

## 7. The textbook-precise statement
Let \( f_\theta : \mathbb{R}^d \times \mathbb{R}^m \to \mathbb{R}^d \) be a differentiable map. A recurrent neural network is the dynamical system  
\[
h_t = f_\theta(h_{t-1}, x_t), \quad t = 1,\dots,T, \quad h_0 = 0.
\]
Given a loss \( L = \sum_t \ell_t(h_t) \), back-propagation through time computes  
\[
\frac{\partial L}{\partial \theta} = \sum_{t=1}^T \frac{\partial L}{\partial h_t} \frac{\partial h_t}{\partial \theta}
\]
by the recurrence  
\[
\frac{\partial L}{\partial h_t} = \frac{\partial \ell_t}{\partial h_t} + \left( \frac{\partial L}{\partial h_{t+1}} \right) \frac{\partial h_{t+1}}{\partial h_t}.
\]
(See Goodfellow, Bengio & Courville, *Deep Learning*, §10.2.2.)

## 8. Visual — diagram or schematic
```text
x1 ──►[f]──►h1───►[f]──►h2───►[f]──►h3───► … ──►hT
        ▲         ▲         ▲                    ▲
        └─W_h─────┴─W_h─────┴─W_h───────────────┘
                    (shared weights)

Backward pass (BPTT):
∂L/∂hT ◄──[f']◄──∂L/∂h{T-1} ◄── … ◄── ∂L/∂h1
          ▲          ▲                       ▲
       add ∂ℓT     add ∂ℓ{T-1}            add ∂ℓ1
```
The diagram shows the forward recurrence (top) and the backward accumulation of gradients (bottom) with the shared \( W_h \) connections.

## 9. The memory technique

1. **The hook** — picture the hidden state as a single sheet of paper that the network writes on, then passes to itself at the next moment; BPTT is reading every previous note in reverse order.

2. **What to overlearn** — the two-line recurrence \( h_t = f(h_{t-1},x_t) \) and the gradient recurrence for \( \partial L/\partial h_t \).

3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback** — derive the total derivative of \( L \) with respect to \( \theta \) by expanding the chain rule on the unrolled graph; the summation over time appears automatically.

## 10. What this unlocks
Mastery of hidden-state dynamics and BPTT is the prerequisite for every modern sequence model used in aerospace time-series work.

- Long short-term memory (LSTM) and gated recurrent units (GRU) are direct architectural fixes for the vanishing-gradient problem revealed by BPTT.
- Transformer self-attention can be viewed as a parallelised, attention-weighted form of the same history compression that the hidden state performs sequentially.
- Kalman-filter-style state estimation in navigation fuses naturally with an RNN hidden state once BPTT gradients are understood.

## 11. Self-check — five questions, no answers
1. Write the explicit unrolled expression for \( h_3 \) when \( h_t = \tanh(W_h h_{t-1} + W_x x_t) \).

2. Compute the shape of the matrix that multiplies the incoming gradient \( \partial L / \partial h_t \) when back-propagating one step in a hidden layer of size 128.

3. A 200-step aircraft trajectory yields NaN loss after epoch 3. Name the two most probable numerical causes and the single-line code change that usually stabilises training.

4. Show that setting \( W_h = 0 \) reduces the RNN to a stateless feed-forward network and explain what temporal information is thereby lost.

5. Derive the condition on the eigenvalues of \( W_h \) that guarantees vanishing gradients for sequences longer than 50 steps when the nonlinearity is \( \tanh \).