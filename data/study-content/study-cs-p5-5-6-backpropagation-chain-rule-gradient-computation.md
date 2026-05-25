## 1. What it is — in plain English

Imagine you're baking a cake with a complex recipe, and it tastes terrible. Backpropagation is like figuring out *exactly* which ingredient or step went wrong, and by how much, so you can fix it next time. It's a method for a computer program to learn from its mistakes.

In the world of Artificial Intelligence, specifically with "neural networks" (which are like very complicated function machines), backpropagation is the secret sauce that allows these networks to learn. When a neural network makes a prediction (like identifying a cat in a picture, or predicting a rocket's trajectory), it often makes a mistake. Backpropagation is the algorithm that calculates how much each tiny internal "knob" or "setting" (called a weight or bias) contributed to that mistake.

Think of it as assigning blame. If the final output is wrong, backpropagation systematically traces that error backward through all the layers of the network, figuring out which connections and calculations were most responsible. Once it knows who's to blame and by how much, it can adjust those knobs slightly to make a better prediction next time. It's an efficient way to calculate the "gradient" of the error with respect to every single parameter in the network, telling us the direction and magnitude to change them for improvement.

## 2. Why it matters — real-world applications

Backpropagation is the foundational algorithm that powers nearly all modern deep learning. Without it, neural networks would be unable to learn from data, severely limiting their capabilities.

1.  **Aerospace Anomaly Detection and Predictive Maintenance:** Imagine a fleet of satellites or aircraft. Sensors on these machines generate vast amounts of data. Neural networks trained with backpropagation can learn to identify subtle patterns in this data that indicate impending mechanical failure or unusual operational conditions. For instance, by analyzing vibration data from a jet engine, a model can predict component wear and recommend maintenance *before* a critical failure occurs, significantly enhancing safety and reducing downtime.
2.  **Autonomous Flight and Navigation:** Self-flying drones and spacecraft rely on neural networks to process sensor inputs (cameras, lidar, radar) and make real-time decisions about navigation, obstacle avoidance, and trajectory correction. Backpropagation allows these networks to be trained on millions of simulated or real-world flight scenarios, learning to react appropriately to complex and dynamic environments, ensuring safe and efficient autonomous operations.
3.  **Satellite Image Analysis for Earth Observation:** Governments and private companies use satellite imagery for everything from monitoring climate change and crop yields to urban planning and disaster response. Deep learning models, trained via backpropagation, can automatically classify land cover, detect changes over time (e.g., deforestation, urban sprawl), identify specific objects (e.g., ships, vehicles), and even forecast weather patterns from atmospheric data.
4.  **Medical Diagnosis and Drug Discovery:** In healthcare, backpropagation enables neural networks to learn from vast datasets of patient records, medical images (X-rays, MRIs), and genomic data. This allows for more accurate disease diagnosis (e.g., detecting tumors in scans), personalized treatment recommendations, and accelerating the drug discovery process by predicting molecular interactions and efficacy.
5.  **Natural Language Processing (NLP) and Speech Recognition:** The voice assistants on your phone, machine translation services, and spam filters all heavily rely on neural networks trained with backpropagation. These systems learn to understand human language, translate between languages, and convert spoken words into text by adjusting their internal parameters based on the differences between their predictions and the correct outputs.

## 3. Prerequisites — what you must know first

Before diving deep into backpropagation, ensure you have a solid grasp of these fundamental concepts. If any feel unfamiliar, pause and review them.

*   **Functions:** A rule that assigns each input value exactly one output value. (e.g., $f(x) = x^2$).
*   **Derivatives (Calculus):** Measures the rate at which a function's output changes with respect to a change in its input. Geometrically, it's the slope of the tangent line to the function at a given point. (e.g., if $f(x) = x^2$, $\frac{df}{dx} = 2x$).
*   **Partial Derivatives:** The derivative of a multivariable function with respect to one variable, treating all other variables as constants. (e.g., if $f(x, y) = x^2 + y^3$, $\frac{\partial f}{\partial x} = 2x$ and $\frac{\partial f}{\partial y} = 3y^2$).
*   **Chain Rule (Single Variable):** A rule for differentiating composite functions. If $y = f(g(x))$, then $\frac{dy}{dx} = \frac{df}{dg} \cdot \frac{dg}{dx}$. It tells us how changes in the outermost function relate to changes in the innermost variable.
*   **Vectors and Matrices:** Ordered lists of numbers (vectors) and rectangular arrays of numbers (matrices) used to represent data and perform linear algebra operations efficiently.
*   **Gradient:** For a multivariable function, the gradient is a vector containing all its partial derivatives. It points in the direction of the steepest ascent of the function. (e.g., for $f(x, y)$, $\nabla f = \left\langle \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y} \right\rangle$).
*   **Cost/Loss Functions:** A mathematical function that quantifies the error between a model's predicted output and the true output. The goal in machine learning is to minimize this function.
*   **Neural Networks (Basic Structure):** An understanding of what a neuron is (input, weights, bias, activation function), how layers are connected (input, hidden, output), and the concept of a "forward pass" where data flows through the network to produce a prediction.

## 4. The core idea — step by step

Backpropagation is essentially an elegant and efficient application of the multivariate chain rule to compute gradients in a neural network. Let's break it down.

### Step 1: The Forward Pass (Prediction)

**Plain English:** First, the neural network takes an input (like an image or a set of numbers) and processes it layer by layer, making a guess or prediction. It's like feeding ingredients into a machine and getting a final product.

**Small Concrete Example:** Imagine a single "neuron" that takes an input $x$, multiplies it by a "weight" $w$, adds a "bias" $b$, and then applies a simple "activation function" (like doing nothing, just passing the result through).
Input $x=2$, weight $w=0.5$, bias $b=0.1$.
The neuron calculates $z = w \cdot x + b = 0.5 \cdot 2 + 0.1 = 1.1$.
The output $a = z = 1.1$. This is our prediction.

**Formal/Mathematical Version:**
For a neuron $j$ in a layer, its weighted sum of inputs $z_j$ is calculated from the activations $a_i$ of the previous layer and its own weights $w_{ij}$ and bias $b_j$:
$$ z_j = \left( \sum_i w_{ij} a_i \right) + b_j $$
Then, an activation function $\sigma$ is applied to $z_j$ to get the neuron's output $a_j$:
$$ a_j = \sigma(z_j) $$
This process is repeated for all neurons, layer by layer, until the final output layer produces the network's prediction.

**What could go wrong:** If the initial weights and biases are completely random, the prediction will likely be very far from the correct answer. This is expected, as the network hasn't learned yet.

### Step 2: The Loss Function (Measuring Error)

**Plain English:** After the network makes a prediction, we compare it to the *actual* correct answer. The "loss function" gives us a single number that tells us how bad the prediction was. A higher number means a worse prediction. It's like a critic giving a score to our cake.

**Small Concrete Example:**
Our neuron predicted $a=1.1$. Let's say the true answer (target) was $y_{true}=1.0$.
A common loss function is the squared error (or mean squared error for multiple examples).
Loss $L = \frac{1}{2}(a - y_{true})^2 = \frac{1}{2}(1.1 - 1.0)^2 = \frac{1}{2}(0.1)^2 = \frac{1}{2}(0.01) = 0.005$.
This small number indicates a relatively small error for this single example.

**Formal/Mathematical Version:**
Given the network's final output $a^{(L)}$ (where $L$ is the output layer) and the true target $y_{true}$, the loss function $C$ (often denoted $L$) quantifies the discrepancy:
$$ C = \frac{1}{2} \sum_k (a_k^{(L)} - y_{true,k})^2 \quad \text{ (for squared error)} $$
Other common loss functions include cross-entropy for classification tasks.

**What could go wrong:** Choosing an inappropriate loss function for the problem. For instance, using mean squared error for a classification problem (where outputs are probabilities) can lead to poor learning dynamics.

### Step 3: The Backward Pass (Blame Assignment) - Gradient of Loss w.r.t. Output

**Plain English:** Now we start assigning blame. We begin by asking: "How much did the *final output* of the network contribute to the overall error?" This is the first step in tracing the error backward. We calculate how sensitive the loss is to changes in the network's final output.

**Small Concrete Example:**
We have $L = \frac{1}{2}(a - y_{true})^2$. We want to find $\frac{\partial L}{\partial a}$.
Using the power rule for derivatives:
$\frac{\partial L}{\partial a} = \frac{\partial}{\partial a} \left( \frac{1}{2}(a - y_{true})^2 \right) = \frac{1}{2} \cdot 2 \cdot (a - y_{true})^{2-1} \cdot \frac{\partial}{\partial a}(a - y_{true})$
$\frac{\partial L}{\partial a} = (a - y_{true}) \cdot 1 = a - y_{true}$.
Plugging in our values: $1.1 - 1.0 = 0.1$.
This means if the output $a$ were to increase by a tiny amount, the loss would increase by $0.1$ times that amount.

**Formal/Mathematical Version:**
For the output layer $L$, we compute the error signal, often denoted $\delta^{(L)}$:
$$ \delta_j^{(L)} = \frac{\partial C}{\partial a_j^{(L)}} \sigma'(z_j^{(L)}) $$
For the squared error loss function where $C = \frac{1}{2} \sum_k (a_k^{(L)} - y_{true,k})^2$, and assuming the output activation is linear ($\sigma(z)=z$, so $\sigma'(z)=1$):
$$ \frac{\partial C}{\partial a_j^{(L)}} = (a_j^{(L)} - y_{true,j}) $$
So, $\delta_j^{(L)} = (a_j^{(L)} - y_{true,j}) \sigma'(z_j^{(L)})$. This term $\delta_j^{(L)}$ represents how much the error changes with respect to the pre-activation $z_j^{(L)}$ of the output neuron $j$.

**What could go wrong:** Incorrectly calculating the derivative of the loss function. This initial error will propagate and corrupt all subsequent gradient calculations.

### Step 4: Propagating the Error Backwards (Chain Rule in Action)

**Plain English:** Now that we know how much the final output contributed to the error, we need to figure out how much the *previous layer's outputs* (and their internal calculations) contributed. This is where the chain rule comes into play: we're linking the "blame" from one step to the blame for the step *before* it. We're essentially asking, "If neuron A in the previous layer changed its output, how would that affect the error we just calculated?"

**Small Concrete Example:**
Let's continue with our simple neuron. We have $\frac{\partial L}{\partial a} = 0.1$.
Recall $a = z$. So $\frac{\partial L}{\partial z} = \frac{\partial L}{\partial a} \frac{\partial a}{\partial z} = 0.1 \cdot 1 = 0.1$.
Now we need to go further back. We know $z = w \cdot x + b$.
We want to find how changes in $x$ (the input to the neuron) would affect the loss.
$\frac{\partial L}{\partial x} = \frac{\partial L}{\partial z} \frac{\partial z}{\partial x}$.
We already have $\frac{\partial L}{\partial z} = 0.1$.
And $\frac{\partial z}{\partial x} = \frac{\partial}{\partial x}(w \cdot x + b) = w$.
So, $\frac{\partial L}{\partial x} = 0.1 \cdot w = 0.1 \cdot 0.5 = 0.05$.
This tells us how sensitive the loss is to the input $x$.

**Formal/Mathematical Version:**
To calculate the error signal $\delta^{(l)}$ for a hidden layer $l$, we use the error signals from the next layer ($l+1$) and the weights connecting them. This is the core of the backpropagation algorithm.
$$ \delta_j^{(l)} = \left( \sum_k w_{jk}^{(l+1)} \delta_k^{(l+1)} \right) \sigma'(z_j^{(l)}) $$
Here, $w_{jk}^{(l+1)}$ is the weight connecting neuron $j$ in layer $l$ to neuron $k$ in layer $l+1$. The sum $\sum_k w_{jk}^{(l+1)} \delta_k^{(l+1)}$ represents the total "blame" that flows back from the next layer to neuron $j$. This sum is then scaled by the derivative of neuron $j$'s activation function, $\sigma'(z_j^{(l)})$, to account for its local sensitivity.

**What could go wrong:** Misapplying the chain rule, especially with the sum over neurons in the next layer. Forgetting to multiply by the derivative of the activation function, $\sigma'(z_j^{(l)})$, is a very common mistake.

### Step 5: Computing Gradients for Weights and Biases

**Plain English:** Once we have the "blame" (error signal, $\delta$) for each neuron's internal calculation ($z$), we can finally figure out how much each *weight* and *bias* contributed to that blame. This is the ultimate goal: to know how to adjust these parameters.

**Small Concrete Example:**
We have $\frac{\partial L}{\partial z} = 0.1$.
We want to find $\frac{\partial L}{\partial w}$ and $\frac{\partial L}{\partial b}$.
Using the chain rule:
$\frac{\partial L}{\partial w} = \frac{\partial L}{\partial z} \frac{\partial z}{\partial w}$.
We know $\frac{\partial L}{\partial z} = 0.1$.
And $\frac{\partial z}{\partial w} = \frac{\partial}{\partial w}(w \cdot x + b) = x$.
So, $\frac{\partial L}{\partial w} = 0.1 \cdot x = 0.1 \cdot 2 = 0.2$.
This means if we increase $w$ by a tiny amount, the loss would increase by $0.2$ times that amount.

Similarly for the bias:
$\frac{\partial L}{\partial b} = \frac{\partial L}{\partial z} \frac{\partial z}{\partial b}$.
We know $\frac{\partial L}{\partial z} = 0.1$.
And $\frac{\partial z}{\partial b} = \frac{\partial}{\partial b}(w \cdot x + b) = 1$.
So, $\frac{\partial L}{\partial b} = 0.1 \cdot 1 = 0.1$.
This means if we increase $b$ by a tiny amount, the loss would increase by $0.1$ times that amount.

**Formal/Mathematical Version:**
The partial derivative of the cost function $C$ with respect to a bias $b_j^{(l)}$ for neuron $j$ in layer $l$ is simply its error signal:
$$ \frac{\partial C}{\partial b_j^{(l)}} = \delta_j^{(l)} $$
The partial derivative of the cost function $C$ with respect to a weight $w_{jk}^{(l)}$ connecting neuron $k$ in layer $l-1$ to neuron $j$ in layer $l$ is:
$$ \frac{\partial C}{\partial w_{jk}^{(l)}} = a_k^{(l-1)} \delta_j^{(l)} $$
This is a crucial result: the gradient of a weight is the activation of the *input* neuron to that weight multiplied by the error signal of the *output* neuron of that weight.

**What could go wrong:** Forgetting the input activation term ($a_k^{(l-1)}$) when computing the weight gradient. This is a very common oversight.

### Step 6: Weight Update (Learning)

**Plain English:** Now that we know how much each weight and bias contributes to the error (its gradient), we can adjust them. We move them in the *opposite* direction of the gradient, because the gradient points uphill (towards increasing error), and we want to go downhill (towards decreasing error). We take small steps, controlled by a "learning rate," to avoid overshooting the optimal values.

**Small Concrete Example:**
We found $\frac{\partial L}{\partial w} = 0.2$ and $\frac{\partial L}{\partial b} = 0.1$.
Let's choose a learning rate $\eta = 0.1$.
New weight $w_{new} = w_{old} - \eta \cdot \frac{\partial L}{\partial w} = 0.5 - 0.1 \cdot 0.2 = 0.5 - 0.02 = 0.48$.
New bias $b_{new} = b_{old} - \eta \cdot \frac{\partial L}{\partial b} = 0.1 - 0.1 \cdot 0.1 = 0.1 - 0.01 = 0.09$.
The weights and biases have been slightly adjusted to reduce the error. The network has "learned" a tiny bit.

**Formal/Mathematical Version:**
For each weight $w$ and bias $b$ in the network:
$$ w \leftarrow w - \eta \frac{\partial C}{\partial w} $$
$$ b \leftarrow b - \eta \frac{\partial C}{\partial b} $$
where $\eta$ (eta) is the learning rate, a small positive number that controls the step size of the update. This process is called Gradient Descent. It's repeated for many training examples (or batches of examples) and many iterations (epochs) until the network's performance on the training data is satisfactory.

**What could go wrong:** A learning rate that is too large can cause the optimization to overshoot the minimum and diverge. A learning rate that is too small can make the learning process extremely slow.

## 5. Worked examples — multiple, with every step shown

We will use the sigmoid activation function $\sigma(z) = \frac{1}{1+e^{-z}}$, whose derivative is $\sigma'(z) = \sigma(z)(1-\sigma(z))$.
The loss function will be the squared error $C = \frac{1}{2}(a - y_{true})^2$.

### Example 1: Single Neuron, Linear Activation

**Problem:** A single neuron has one input $x=0.5$, one weight $w=0.3$, and one bias $b=0.1$. The activation function is linear (i.e., $\sigma(z)=z$, so $\sigma'(z)=1$). The true target output is $y_{true}=0.8$. Compute the gradients $\frac{\partial C}{\partial w}$ and $\frac{\partial C}{\partial b}$.

**Given:**
*   Input $x = 0.5$
*   Weight $w = 0.3$
*   Bias $b = 0.1$
*   True target $y_{true} = 0.8$
*   Activation function $\sigma(z) = z \implies \sigma'(z) = 1$
*   Loss function $C = \frac{1}{2}(a - y_{true})^2$

**What we want:** $\frac{\partial C}{\partial w}$ and $\frac{\partial C}{\partial b}$.

**Solution:**

**Step 1: Forward Pass**
Calculate the weighted sum $z$:
$$ z = w \cdot x + b $$
$$ z = 0.3 \cdot 0.5 + 0.1 $$
$$ z = 0.15 + 0.1 $$
$$ z = 0.25 $$
*Explanation: This is the raw input to the activation function, based on the current weights and bias.*

Calculate the output activation $a$:
$$ a = \sigma(z) $$
$$ a = z \quad (\text{since } \sigma(z)=z) $$
$$ a = 0.25 $$
*Explanation: With a linear activation, the output is simply the weighted sum.*

**Step 2: Calculate Loss**
$$ C = \frac{1}{2}(a - y_{true})^2 $$
$$ C = \frac{1}{2}(0.25 - 0.8)^2 $$
$$ C = \frac{1}{2}(-0.55)^2 $$
$$ C = \frac{1}{2}(0.3025) $$
$$ C = 0.15125 $$
*Explanation: This quantifies how "wrong" our prediction was. A positive number indicates error.*

**Step 3: Backward Pass - Calculate $\frac{\partial C}{\partial a}$**
$$ \frac{\partial C}{\partial a} = \frac{\partial}{\partial a} \left( \frac{1}{2}(a - y_{true})^2 \right) $$
$$ \frac{\partial C}{\partial a} = (a - y_{true}) $$
$$ \frac{\partial C}{\partial a} = 0.25 - 0.8 $$
$$ \frac{\partial C}{\partial a} = -0.55 $$
*Explanation: This tells us how much the loss changes if the neuron's output activation changes. A negative value means increasing 'a' would decrease the loss.*

**Step 4: Propagate error to $z$ - Calculate $\frac{\partial C}{\partial z}$**
Using the chain rule: $\frac{\partial C}{\partial z} = \frac{\partial C}{\partial a} \cdot \frac{\partial a}{\partial z}$
We know $\frac{\partial C}{\partial a} = -0.55$.
We need $\frac{\partial a}{\partial z} = \sigma'(z)$. Since $\sigma(z)=z$, $\sigma'(z)=1$.
$$ \frac{\partial C}{\partial z} = -0.55 \cdot 1 $$
$$ \frac{\partial C}{\partial z} = -0.55 $$
*Explanation: This is the "error signal" for the pre-activation $z$. Since the activation function is linear, the error signal is passed through unchanged.*

**Step 5: Compute gradients for weights and biases**
Calculate $\frac{\partial C}{\partial w}$:
Using the chain rule: $\frac{\partial C}{\partial w} = \frac{\partial C}{\partial z} \cdot \frac{\partial z}{\partial w}$
We know $\frac{\partial C}{\partial z} = -0.55$.
We need $\frac{\partial z}{\partial w} = \frac{\partial}{\partial w}(wx+b) = x$.
$$ \frac{\partial C}{\partial w} = -0.55 \cdot x $$
$$ \frac{\partial C}{\partial w} = -0.55 \cdot 0.5 $$
$$ \frac{\partial C}{\partial w} = -0.275 $$
*Explanation: This tells us how much to change 'w' to reduce the loss. A negative gradient means increasing 'w' would decrease the loss.*

Calculate $\frac{\partial C}{\partial b}$:
Using the chain rule: $\frac{\partial C}{\partial b} = \frac{\partial C}{\partial z} \cdot \frac{\partial z}{\partial b}$
We know $\frac{\partial C}{\partial z} = -0.55$.
We need $\frac{\partial z}{\partial b} = \frac{\partial}{\partial b}(wx+b) = 1$.
$$ \frac{\partial C}{\partial b} = -0.55 \cdot 1 $$
$$ \frac{\partial C}{\partial b} = -0.55 $$
*Explanation: This tells us how much to change 'b' to reduce the loss. A negative gradient means increasing 'b' would decrease the loss.*

**Final Answers:**
$$ \boxed{\frac{\partial C}{\partial w} = -0.275} $$
$$ \boxed{\frac{\partial C}{\partial b} = -0.55} $$

**Reflection:** This example was straightforward because the linear activation function has a derivative of 1, simplifying the chain rule propagation. The key steps are calculating the output, then working backward through the derivatives of the loss, activation, and finally the linear combination.

### Example 2: Single Neuron, Sigmoid Activation

**Problem:** A single neuron has one input $x=0.5$, one weight $w=0.3$, and one bias $b=0.1$. The activation function is sigmoid, $\sigma(z) = \frac{1}{1+e^{-z}}$. The true target output is $y_{true}=0.8$. Compute the gradients $\frac{\partial C}{\partial w}$ and $\frac{\partial C}{\partial b}$.

**Given:**
*   Input $x = 0.5$
*   Weight $w = 0.3$
*   Bias $b = 0.1$
*   True target $y_{true} = 0.8$
*   Activation function $\sigma(z) = \frac{1}{1+e^{-z}}$
*   Derivative of sigmoid: $\sigma'(z) = \sigma(z)(1-\sigma(z))$
*   Loss function $C = \frac{1}{2}(a - y_{true})^2$

**What we want:** $\frac{\partial C}{\partial w}$ and $\frac{\partial C}{\partial b}$.

**Solution:**

**Step 1: Forward Pass**
Calculate the weighted sum $z$:
$$ z = w \cdot x + b $$
$$ z = 0.3 \cdot 0.5 + 0.1 $$
$$ z = 0.15 + 0.1 $$
$$ z = 0.25 $$
*Explanation: Same as before, this is the pre-activation value.*

Calculate the output activation $a$:
$$ a = \sigma(z) $$
$$ a = \frac{1}{1+e^{-0.25}} $$
$$ a \approx \frac{1}{1+0.7788} $$
$$ a \approx \frac{1}{1.7788} $$
$$ a \approx 0.5622 $$
*Explanation: Now we apply the sigmoid function, which squashes the output between 0 and 1.*

**Step 2: Calculate Loss**
$$ C = \frac{1}{2}(a - y_{true})^2 $$
$$ C = \frac{1}{2}(0.5622 - 0.8)^2 $$
$$ C = \frac{1}{2}(-0.2378)^2 $$
$$ C = \frac{1}{2}(0.05655) $$
$$ C \approx 0.02827 $$
*Explanation: The error is calculated based on the sigmoid output.*

**Step 3: Backward Pass - Calculate $\frac{\partial C}{\partial a}$**
$$ \frac{\partial C}{\partial a} = (a - y_{true}) $$
$$ \frac{\partial C}{\partial a} = 0.5622 - 0.8 $$
$$ \frac{\partial C}{\partial a} = -0.2378 $$
*Explanation: This is the initial error signal from the loss function, same form as Example 1.*

**Step 4: Propagate error to $z$ - Calculate $\frac{\partial C}{\partial z}$**
Using the chain rule: $\frac{\partial C}{\partial z} = \frac{\partial C}{\partial a} \cdot \frac{\partial a}{\partial z}$
We know $\frac{\partial C}{\partial a} = -0.2378$.
We need $\frac{\partial a}{\partial z} = \sigma'(z) = \sigma(z)(1-\sigma(z))$.
Since $a = \sigma(z) \approx 0.5622$:
$$ \sigma'(z) = 0.5622 \cdot (1 - 0.5622) $$
$$ \sigma'(z) = 0.5622 \cdot 0.4378 $$
$$ \sigma'(z) \approx 0.2461 $$
Now, calculate $\frac{\partial C}{\partial z}$:
$$ \frac{\partial C}{\partial z} = -0.2378 \cdot 0.2461 $$
$$ \frac{\partial C}{\partial z} \approx -0.05852 $$
*Explanation: This is the error signal for $z$. Unlike the linear case, it's scaled by the derivative of the sigmoid function, which is maximal around $z=0$ and tapers off as $z$ moves away from zero.*

**Step 5: Compute gradients for weights and biases**
Calculate $\frac{\partial C}{\partial w}$:
Using the chain rule: $\frac{\partial C}{\partial w} = \frac{\partial C}{\partial z} \cdot \frac{\partial z}{\partial w}$
We know $\frac{\partial C}{\partial z} = -0.05852$.
We need $\frac{\partial z}{\partial w} = x = 0.5$.
$$ \frac{\partial C}{\partial w} = -0.05852 \cdot 0.5 $$
$$ \frac{\partial C}{\partial w} \approx -0.02926 $$
*Explanation: The gradient for the weight is the error signal at $z$ multiplied by the input that generated $z$.*

Calculate $\frac{\partial C}{\partial b}$:
Using the chain rule: $\frac{\partial C}{\partial b} = \frac{\partial C}{\partial z} \cdot \frac{\partial z}{\partial b}$
We know $\frac{\partial C}{\partial z} = -0.05852$.
We need $\frac{\partial z}{\partial b} = 1$.
$$ \frac{\partial C}{\partial b} = -0.05852 \cdot 1 $$
$$ \frac{\partial C}{\partial b} \approx -0.05852 $$
*Explanation: The gradient for the bias is simply the error signal at $z$.*

**Final Answers:**
$$ \boxed{\frac{\partial C}{\partial w} \approx -0.02926} $$
$$ \boxed{\frac{\partial C}{\partial b} \approx -0.05852} $$

**Reflection:** The main difference here is the inclusion of the sigmoid derivative $\sigma'(z)$ in the chain rule. This derivative scales the error signal, which is crucial for how the network learns. If $z$ is very large or very small (meaning $\sigma(z)$ is close to 0 or 1), $\sigma'(z)$ will be very small, leading to "vanishing gradients" where the error signal barely propagates.

### Example 3: Two-Layer Network, Sigmoid Activations

**Problem:** A small neural network has two input neurons ($x_1, x_2$), a hidden layer with two neurons ($h_1, h_2$), and an output layer with one neuron ($o_1$). All activation functions are sigmoid.
Given inputs $X = [0.1, 0.2]$, true target $y_{true} = 0.5$.
Initial weights and biases:
*   Input to Hidden: $W^{(1)} = \begin{pmatrix} 0.1 & 0.2 \\ 0.3 & 0.4 \end{pmatrix}$, $b^{(1)} = \begin{pmatrix} 0.1 \\ 0.2 \end{pmatrix}$
*   Hidden to Output: $W^{(2)} = \begin{pmatrix} 0.5 \\ 0.6 \end{pmatrix}$, $b^{(2)} = \begin{pmatrix} 0.3 \end{pmatrix}$
Compute the gradients for all weights and biases.

**Given:**
*   $x_1=0.1, x_2=0.2$
*   $y_{true}=0.5$
*   $W^{(1)} = \begin{pmatrix} w_{11}^{(1)} & w_{12}^{(1)} \\ w_{21}^{(1)} & w_{22}^{(1)} \end{pmatrix} = \begin{pmatrix} 0.1 & 0.2 \\ 0.3 & 0.4 \end{pmatrix}$
*   $b^{(1)} = \begin{pmatrix} b_1^{(1)} \\ b_2^{(1)} \end{pmatrix} = \begin{pmatrix} 0.1 \\ 0.2 \end{pmatrix}$
*   $W^{(2)} = \begin{pmatrix} w_{11}^{(2)} \\ w_{21}^{(2)} \end{pmatrix} = \begin{pmatrix} 0.5 \\ 0.6 \end{pmatrix}$
*   $b^{(2)} = \begin{pmatrix} b_1^{(2)} \end{pmatrix} = \begin{pmatrix} 0.3 \end{pmatrix}$
*   $\sigma(z) = \frac{1}{1+e^{-z}}$, $\sigma'(z) = \sigma(z)(1-\sigma(z))$
*   $C = \frac{1}{2}(a^{(2)} - y_{true})^2$

**What we want:** $\nabla C$ for all $W^{(1)}, b^{(1)}, W^{(2)}, b^{(2)}$.

**Solution:**

**Step 1: Forward Pass (Input Layer to Hidden Layer)**

Calculate $z^{(1)}$ for hidden neurons:
$$ z_1^{(1)} = w_{11}^{(1)}x_1 + w_{21}^{(1)}x_2 + b_1^{(1)} $$
$$ z_1^{(1)} = (0.1)(0.1) + (0.3)(0.2) + 0.1 $$
$$ z_1^{(1)} = 0.01 + 0.06 + 0.1 = 0.17 $$
$$ z_2^{(1)} = w_{12}^{(1)}x_1 + w_{22}^{(1)}x_2 + b_2^{(1)} $$
$$ z_2^{(1)} = (0.2)(0.1) + (0.4)(0.2) + 0.2 $$
$$ z_2^{(1)} = 0.02 + 0.08 + 0.2 = 0.30 $$
*Explanation: Compute the weighted sum of inputs for each hidden neuron.*

Calculate activations $a^{(1)}$ for hidden neurons:
$$ a_1^{(1)} = \sigma(z_1^{(1)}) = \sigma(0.17) = \frac{1}{1+e^{-0.17}} \approx \frac{1}{1+0.8436} \approx 0.5424 $$
$$ a_2^{(1)} = \sigma(z_2^{(1)}) = \sigma(0.30) = \frac{1}{1+e^{-0.30}} \approx \frac{1}{1+0.7408} \approx 0.5744 $$
*Explanation: Apply the sigmoid activation function to the pre-activations.*

**Step 1 (cont.): Forward Pass (Hidden Layer to Output Layer)**

Calculate $z^{(2)}$ for the output neuron:
$$ z_1^{(2)} = w_{11}^{(2)}a_1^{(1)} + w_{21}^{(2)}a_2^{(1)} + b_1^{(2)} $$
$$ z_1^{(2)} = (0.5)(0.5424) + (0.6)(0.5744) + 0.3 $$
$$ z_1^{(2)} = 0.2712 + 0.34464 + 0.3 $$
$$ z_1^{(2)} = 0.91584 $$
*Explanation: Compute the weighted sum of hidden activations for the output neuron.*

Calculate activation $a^{(2)}$ for the output neuron:
$$ a_1^{(2)} = \sigma(z_1^{(2)}) = \sigma(0.91584) = \frac{1}{1+e^{-0.91584}} \approx \frac{1}{1+0.3999} \approx 0.7143 $$
*Explanation: Apply the sigmoid activation to get the final prediction.*

**Step 2: Calculate Loss**
$$ C = \frac{1}{2}(a_1^{(2)} - y_{true})^2 $$
$$ C = \frac{1}{2}(0.7143 - 0.5)^2 $$
$$ C = \frac{1}{2}(0.2143)^2 $$
$$ C = \frac{1}{2}(0.04592) \approx 0.02296 $$
*Explanation: The total error of the network's prediction.*

**Step 3: Backward Pass - Calculate $\delta^{(2)}$ for the Output Layer**

We need $\frac{\partial C}{\partial a_1^{(2)}}$ and $\sigma'(z_1^{(2)})$.
$$ \frac{\partial C}{\partial a_1^{(2)}} = (a_1^{(2)} - y_{true}) = 0.7143 - 0.5 = 0.2143 $$
$$ \sigma'(z_1^{(2)}) = a_1^{(2)}(1 - a_1^{(2)}) = 0.7143(1 - 0.7143) = 0.7143(0.2857) \approx 0.20408 $$
Now, calculate $\delta_1^{(2)}$:
$$ \delta_1^{(2)} = \frac{\partial C}{\partial a_1^{(2)}} \sigma'(z_1^{(2)}) $$
$$ \delta_1^{(2)} = 0.2143 \cdot 0.20408 \approx 0.04373 $$
*Explanation: This is the error signal for the output neuron's pre-activation $z_1^{(2)}$.*

**Step 4: Compute gradients for $W^{(2)}$ and $b^{(2)}$ (Hidden to Output)**

For weights $W^{(2)}$: $\frac{\partial C}{\partial w_{jk}^{(l)}} = a_k^{(l-1)} \delta_j^{(l)}$
$$ \frac{\partial C}{\partial w_{11}^{(2)}} = a_1^{(1)} \delta_1^{(2)} = 0.5424 \cdot 0.04373 \approx 0.02371 $$
$$ \frac{\partial C}{\partial w_{21}^{(2)}} = a_2^{(1)} \delta_1^{(2)} = 0.5744 \cdot 0.04373 \approx 0.02512 $$
For bias $b^{(2)}$: $\frac{\partial C}{\partial b_j^{(l)}} = \delta_j^{(l)}$
$$ \frac{\partial C}{\partial b_1^{(2)}} = \delta_1^{(2)} \approx 0.04373 $$
*Explanation: These are the gradients for the parameters connecting the hidden layer to the output layer. They tell us how to adjust these parameters to reduce the loss.*

**Step 5: Backward Pass - Calculate $\delta^{(1)}$ for the Hidden Layer**

Using the formula $\delta_j^{(l)} = \left( \sum_k w_{jk}^{(l+1)} \delta_k^{(l+1)} \right) \sigma'(z_j^{(l)})$:
For $\delta_1^{(1)}$ (for hidden neuron 1):
The sum term is $w_{11}^{(2)} \delta_1^{(2)}$. (Since hidden neuron 1 only connects to output neuron 1 via $w_{11}^{(2)}$).
$$ \sum_k w_{1k}^{(2)} \delta_k^{(2)} = w_{11}^{(2)} \delta_1^{(2)} = 0.5 \cdot 0.04373 \approx 0.021865 $$
Now calculate $\sigma'(z_1^{(1)})$:
$$ \sigma'(z_1^{(1)}) = a_1^{(1)}(1 - a_1^{(1)}) = 0.5424(1 - 0.5424) = 0.5424(0.4576) \approx 0.2483 $$
So, $\delta_1^{(1)}$:
$$ \delta_1^{(1)} = (0.021865) \cdot 0.2483 \approx 0.00543 $$
*Explanation: This is the error signal for the first hidden neuron's pre-activation.*

For $\delta_2^{(1)}$ (for hidden neuron 2):
The sum term is $w_{21}^{(2)} \delta_1^{(2)}$.
$$ \sum_k w_{2k}^{(2)} \delta_k^{(2)} = w_{21}^{(2)} \delta_1^{(2)} = 0.6 \cdot 0.04373 \approx 0.026238 $$
Now calculate $\sigma'(z_2^{(1)})$:
$$ \sigma'(z_2^{(1)}) = a_2^{(1)}(1 - a_2^{(1)}) = 0.5744(1 - 0.5744) = 0.5744(0.4256) \approx 0.2444 $$
So, $\delta_2^{(1)}$:
$$ \delta_2^{(1)} = (0.026238) \cdot 0.2444 \approx 0.00641 $$
*Explanation: This is the error signal for the second hidden neuron's pre-activation. Notice how the error from the output layer is distributed back to each hidden neuron according to the weights connecting them.*

**Step 6: Compute gradients for $W^{(1)}$ and $b^{(1)}$ (Input to Hidden)**

For weights $W^{(1)}$: $\frac{\partial C}{\partial w_{jk}^{(l)}} = a_k^{(l-1)} \delta_j^{(l)}$ (here $a_k^{(0)}$ means $x_k$)
$$ \frac{\partial C}{\partial w_{11}^{(1)}} = x_1 \delta_1^{(1)} = 0.1 \cdot 0.00543 \approx 0.000543 $$
$$ \frac{\partial C}{\partial w_{21}^{(1)}} = x_2 \delta_1^{(1)} = 0.2 \cdot 0.00543 \approx 0.001086 $$
$$ \frac{\partial C}{\partial w_{12}^{(1)}} = x_1 \delta_2^{(1)} = 0.1 \cdot 0.00641 \approx 0.000641 $$
$$ \frac{\partial C}{\partial w_{22}^{(1)}} = x_2 \delta_2^{(1)} = 0.2 \cdot 0.00641 \approx 0.001282 $$
For biases $b^{(1)}$: $\frac{\partial C}{\partial b_j^{(l)}} = \delta_j^{(l)}$
$$ \frac{\partial C}{\partial b_1^{(1)}} = \delta_1^{(1)} \approx 0.00543 $$
$$ \frac{\partial C}{\partial b_2^{(1)}} = \delta_2^{(1)} \approx 0.00641 $$
*Explanation: These are the gradients for the parameters connecting the input layer to the hidden layer. These are the final gradients we need to update all parameters in the network.*

**Final Answers:**
$$ \boxed{\nabla_{W^{(1)}} C = \begin{pmatrix} 0.000543 & 0.000641 \\ 0.001086 & 0.001282 \end{pmatrix}} $$
$$ \boxed{\nabla_{b^{(1)}} C = \begin{pmatrix} 0.00543 \\ 0.00641 \end{pmatrix}} $$
$$ \boxed{\nabla_{W^{(2)}} C = \begin{pmatrix} 0.02371 \\ 0.02512 \end{pmatrix}} $$
$$ \boxed{\nabla_{b^{(2)}} C = \begin{pmatrix} 0.04373 \end{pmatrix}} $$

**Reflection:** This example highlights the iterative nature of backpropagation. The error signal is first calculated at the output layer, then propagated backward, layer by layer. At each layer, the error signal is used to calculate the gradients for the weights and biases of *that* layer, and then further propagated to the previous layer, scaled by the weights and the derivative of the activation function. The complexity scales with the number of layers and neurons, but the underlying chain rule application remains consistent. Precision is important, as rounding errors can accumulate.

### Example 4: General Layer (Matrix Notation)

**Problem:** For a generic layer $l$ in a neural network, given the error signal $\delta^{(l)}$ (a vector where each element $\delta_j^{(l)}$ is $\frac{\partial C}{\partial z_j^{(l)}}$) and the activations from the previous layer $a^{(l-1)}$ (a vector), derive the matrix formulas for the gradients $\nabla_{W^{(l)}} C$ and $\nabla_{b^{(l)}} C$.

**Given:**
*   $\delta^{(l)}$: vector of error signals for layer $l$, where $\delta_j^{(l)} = \frac{\partial C}{\partial z_j^{(l)}}$.
*   $a^{(l-1)}$: vector of activations from layer $l-1$.
*   $W^{(l)}$: matrix of weights connecting layer $l-1$ to layer $l$. $W^{(l)}_{jk}$ is the weight from neuron $k$ in layer $l-1$ to neuron $j$ in layer $l$.
*   $b^{(l)}$: vector of biases for layer $l$.

**What we want:** Matrix expressions for $\nabla_{W^{(l)}} C$ and $\nabla_{b^{(l)}} C$.

**Solution:**

**Derivation for $\nabla_{b^{(l)}} C$:**
For a single bias $b_j^{(l)}$ in layer $l$, we know from Step 5 of the core idea:
$$ \frac{\partial C}{\partial b_j^{(l)}} = \delta_j^{(l)} $$
Since this holds for every bias $j$ in layer $l$, the gradient vector for the biases of layer $l$ is simply the error signal vector $\delta^{(l)}$ itself.
$$ \nabla_{b^{(l)}} C = \begin{pmatrix} \frac{\partial C}{\partial b_1^{(l)}} \\ \frac{\partial C}{\partial b_2^{(l)}} \\ \vdots \end{pmatrix} = \begin{pmatrix} \delta_1^{(l)} \\ \delta_2^{(l)} \\ \vdots \end{pmatrix} $$
$$ \boxed{\nabla_{b^{(l)}} C = \delta^{(l)}} $$
*Explanation: Each bias directly influences its neuron's pre-activation $z_j^{(l)}$ with a factor of 1, so its sensitivity to the loss is directly proportional to the error signal $\delta_j^{(l)}$ for that neuron.*

**Derivation for $\nabla_{W^{(l)}} C$:**
For a single weight $w_{jk}^{(l)}$ connecting neuron $k$ in layer $l-1$ to neuron $j$ in layer $l$, we know from Step 5 of the core idea:
$$ \frac{\partial C}{\partial w_{jk}^{(l)}} = a_k^{(l-1)} \delta_j^{(l)} $$
Now, let's consider the entire weight matrix $W^{(l)}$. If $W^{(l)}$ has dimensions $N_l \times N_{l-1}$ (where $N_l$ is the number of neurons in layer $l$ and $N_{l-1}$ is the number of neurons in layer $l-1$), then the gradient matrix $\nabla_{W^{(l)}} C$ will also have these dimensions. The element at row $j$ and column $k$ of this gradient matrix is $\frac{\partial C}{\partial w_{jk}^{(l)}}$.

So, for the matrix $\nabla_{W^{(l)}} C$:
$$ (\nabla_{W^{(l)}} C)_{jk} = a_k^{(l-1)} \delta_j^{(l)} $$
This is the outer product of the error signal vector $\delta^{(l)}$ and the activation vector from the previous layer $a^{(l-1)}$.
Let $\delta^{(l)}$ be a column vector of size $N_l \times 1$.
Let $a^{(l-1)}$ be a column vector of size $N_{l-1} \times 1$.
To get the outer product $(\delta^{(l)})(a^{(l-1)})^T$:
$$ \begin{pmatrix} \delta_1^{(l)} \\ \delta_2^{(l)} \\ \vdots \\ \delta_{N_l}^{(l)} \end{pmatrix} \begin{pmatrix} a_1^{(l-1)} & a_2^{(l-1)} & \dots & a_{N_{l-1}}^{(l-1)} \end{pmatrix} = \begin{pmatrix} \delta_1^{(l)}a_1^{(l-1)} & \delta_1^{(l)}a_2^{(l-1)} & \dots & \delta_1^{(l)}a_{N_{l-1}}^{(l-1)} \\ \delta_2^{(l)}a_1^{(l-1)} & \delta_2^{(l)}a_2^{(l-1)} & \dots & \delta_2^{(l)}a_{N_{l-1}}^{(l-1)} \\ \vdots & \vdots & \ddots & \vdots \\ \delta_{N_l}^{(l)}a_1^{(l-1)} & \delta_{N_l}^{(l)}a_2^{(l-1)} & \dots & \delta_{N_l}^{(l)}a_{N_{l-1}}^{(l-1)} \end{pmatrix} $$
Notice that this matrix has element $(\delta_j^{(l)}a_k^{(l-1)})$ at row $j$, column $k$. This matches our element-wise definition.
$$ \boxed{\nabla_{W^{(l)}} C = \delta^{(l)} (a^{(l-1)})^T} $$
*Explanation: Each weight $w_{jk}^{(l)}$ connects input $a_k^{(l-1)}$ to neuron $j$'s pre-activation $z_j^{(l)}$. Therefore, its gradient is proportional to the input it received ($a_k^{(l-1)}$) and the error signal it's responsible for ($\delta_j^{(l)}$). The outer product naturally captures this relationship for all weights in the matrix.*

**Reflection:** This example moves from scalar derivatives to matrix/vector notation, which is how backpropagation is typically implemented in deep learning frameworks. Understanding these matrix operations is crucial for efficiency and for grasping the elegance of the algorithm for large networks. It shows how the same chain rule logic extends seamlessly to higher dimensions. The trickiest part is correctly identifying the dimensions and order of matrix multiplication (outer product vs. dot product).

## 6. Common mistakes and traps

1.  **Forgetting the derivative of the activation function ($\sigma'(z)$):** This is perhaps the most common error. The error signal $\delta$ for a neuron is not just the sum of errors from the next layer; it must be scaled by the local gradient of its own activation function. Without this term, the backpropagation would be incorrect and the network wouldn't learn effectively.
2.  **Incorrectly applying the chain rule for sums:** When propagating error backward from a neuron in layer $l+1$ to a neuron in layer $l$, you must sum up the contributions from *all* neurons in layer $l+1$ that neuron $j$ in layer $l$ connects to. Missing a term in this sum will lead to an incomplete gradient.
3.  **Confusing forward pass values with backward pass gradients:** During the forward pass, we compute $z$ and $a$. During the backward pass, we compute $\delta$ and gradients $\frac{\partial C}{\partial w}, \frac{\partial C}{\partial b}$. These are distinct values. Forgetting which values are needed at each step (e.g., using $\delta$ instead of $a^{(l-1)}$ for weight gradients) can lead to errors.
4.  **Off-by-one errors in indices or dimensions:** Neural network formulas often involve layers $l$, $l-1$, $l+1$, and indices $i, j, k$. It's easy to use the wrong index or transpose a matrix incorrectly, especially when moving between scalar and vector/matrix notation.
5.  **Not correctly handling the batch dimension:** When training with mini-batches (multiple examples at once), the gradients are typically averaged over the batch. Forgetting to average or incorrectly summing gradients across the batch can lead to unstable training.
6.  **Numerical instability (vanishing/exploding gradients):** While not strictly a mistake in applying backpropagation, it's a common trap. If $\sigma'(z)$ becomes very small (e.g., for sigmoid with very large/small $z$), gradients can "vanish" as they propagate backward, making early layers learn very slowly. Conversely, large gradients can "explode," leading to unstable updates. This often requires architectural changes (e.g., ReLU activations) or gradient clipping.

## 7. Textbook-precise explanation

Backpropagation is an algorithm for efficiently computing the gradient of a composite function with respect to its parameters, specifically tailored for artificial neural networks. It leverages the chain rule of calculus to compute these gradients in a reverse-mode automatic differentiation fashion. The goal is to find the partial derivatives of a scalar loss function $C$ with respect to every weight $w_{jk}^{(l)}$ and bias $b_j^{(l)}$ in the network.

Consider a feedforward neural network with $L$ layers. Let $a^{(l)}$ denote the vector of activations in layer $l$, where $a^{(0)}$ is the input vector. Let $W^{(l)}$ be the weight matrix connecting layer $l-1$ to layer $l$, and $b^{(l)}$ be the bias vector for layer $l$. The pre-activation $z^{(l)}$ and activation $a^{(l)}$ for layer $l$ are given by:
$$ z^{(l)} = W^{(l)} a^{(l-1)} + b^{(l)} $$
$$ a^{(l)} = \sigma(z^{(l)}) $$
where $\sigma$ is the element-wise activation function. The final output is $a^{(L)}$.

The backpropagation algorithm proceeds in two main phases:

**Phase 1: Forward Pass**
For a given input $x$, compute all pre-activations $z^{(l)}$ and activations $a^{(l)}$ for $l=1, \dots, L$. This involves applying the equations above sequentially from the input layer to the output layer. The final output $a^{(L)}$ is then used to compute the scalar loss $C$.

**Phase 2: Backward Pass (Gradient Computation)**
This phase computes the error signals $\delta^{(l)}$ for each layer, starting from the output layer and moving backward. The error signal $\delta^{(l)}$ is defined as $\delta^{(l)} = \nabla_{z^{(l)}} C$, a vector where its $j$-th component is $\frac{\partial C}{\partial z_j^{(l)}}$.

1.  **Output Layer Error Signal ($\delta^{(L)}$):**
    For the output layer $L$, the error signal is computed directly from the loss function and the derivative of the output activation function. For a squared error loss $C = \frac{1}{2} \|a^{(L)} - y_{true}\|^2$:
    $$ \delta^{(L)} = (a^{(L)} - y_{true}) \odot \sigma'(z^{(L)}) $$
    where $\odot$ denotes the Hadamard (element-wise) product. If the output activation is linear, $\sigma'(z^{(L)})$ becomes a vector of ones.

2.  **Propagating Error Backward ($\delta^{(l)}$ for $l < L$):**
    For any hidden layer $l$ (from $L-1$ down to $1$), the error signal $\delta^{(l)}$ is computed by propagating the error from the next layer ($l+1$) backward:
    $$ \delta^{(l)} = ((W^{(l+1)})^T \delta^{(l+1)}) \odot \sigma'(z^{(l)}) $$
    This equation represents the multivariate chain rule: the error from layer $l+1$ is weighted by the transpose of the weights connecting $l$ to $l+1$, and then scaled by the local gradient of layer $l$'s activation function.

3.  **Gradients for Weights and Biases:**
    Once all $\delta^{(l)}$ are computed, the gradients for the weights and biases for each layer $l$ can be calculated:
    $$ \nabla_{b^{(l)}} C = \delta^{(l)} $$
    $$ \nabla_{W^{(l)}} C = \delta^{(l)} (a^{(l-1)})^T $$
    Here, $\delta^{(l)}$ is a column vector of size $N_l \times 1$, and $a^{(l-1)}$ is a column vector of size $N_{l-1} \times 1$. The outer product $(\delta^{(l)} (a^{(l-1)})^T)$ results in an $N_l \times N_{l-1}$ matrix, matching the dimensions of $W^{(l)}$.

These gradients are then used by an optimization algorithm (like gradient descent) to update the parameters $W^{(l)}$ and $b^{(l)}$.

**References:**
*   Nielsen, M. A. (2015). *Neural Networks and Deep Learning*. Determination Press. Chapter 2.
*   Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning*. MIT Press. Chapter 6.

## 8. ASCII diagrams

```text
       Input Layer (Layer 0)             Hidden Layer (Layer 1)           Output Layer (Layer 2)
       (Activations: a^(0) = x)          (Pre-activations: z^(1))         (Pre-activations: z^(2))
                                         (Activations: a^(1))             (Activations: a^(2))
                                                                          (Loss: C)
       x1 ───────────┐                                 ┌───────────┐
                     w_11^(1)                          w_11^(2)    │
       x2 ───────────┼────> [z_1^(1)] ─σ─> [a_1^(1)] ──┼───────────> [z_1^(2)] ─σ─> [a_1^(2)] ────> C
                     b_1^(1)                           b_1^(2)     │
                     w_21^(1)                          w_21^(2)    │
       x3 ───────────┼────> [z_2^(1)] ─σ─> [a_2^(1)] ──┼───────────┘
                     b_2^(1)

       FORWARD PASS (data flow):
       x -> z^(1) -> a^(1) -> z^(2) -> a^(2) -> C
       (Left to Right)

       BACKWARD PASS (error signal flow):
       C <- δ^(2) <- δ^(1)
       (Right to Left)

       Gradients computed at each layer:
       For W^(2), b^(2) using δ^(2) and a^(1)
       For W^(1), b^(1) using δ^(1) and a^(0) (=x)
```

**Description of the Diagram:**

The diagram illustrates a simple feedforward neural network with an input layer (Layer 0), a hidden layer (Layer 1), and an output layer (Layer 2).

*   **Nodes:** Circles represent neurons.
    *   `x1, x2, x3`: Input values (activations of Layer 0, $a^{(0)}$).
    *   `[z_j^(l)]`: Pre-activation (weighted sum of inputs + bias) for neuron $j$ in layer $l$.
    *   `[a_j^(l)]`: Activation (output after applying $\sigma$ to $z_j^{(l)}$) for neuron $j$ in layer $l$.
    *   `C`: The final scalar loss value.

*   **Connections (Arrows):**
    *   Arrows from left to right represent the **forward pass**. Data flows from inputs, through weights, biases, and activation functions, to produce the final output and loss.
    *   `w_jk^(l)`: A weight connecting a neuron in layer $l-1$ to a neuron in layer $l$. For example, `w_11^(1)` connects $x_1$ to $z_1^{(1)}$.
    *   `b_j^(l)`: A bias term added to the pre-activation $z_j^{(l)}$.
    *   `─σ─`: Represents the application of an activation function.

*   **Backward Pass Indication:**
    *   The `C <- δ^(2) <- δ^(1)` line explicitly shows the flow of error signals (`δ`) from the output layer back through the hidden layer.
    *   The error signal $\delta^{(l)}$ for a layer $l$ is derived from the error signal of the next layer $\delta^{(l+1)}$ and is used to calculate the gradients for the weights and biases ($W^{(l)}$ and $b^{(l)}$) of that layer.

This diagram visually represents how the forward pass computes outputs and how the backward