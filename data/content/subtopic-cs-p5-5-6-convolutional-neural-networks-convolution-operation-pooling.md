## What it is
A convolution is an operation where a small matrix, called a kernel or filter, slides over an input data matrix (like an image). At each position, it computes the element-wise product and sum, creating a new "feature map" that highlights specific patterns like edges or textures. Pooling is a subsequent downsampling step that reduces the size of the feature map, typically by taking the maximum or average value in a small window, making the detected features more robust to their exact location.

## Why it matters
These operations are the foundation of Convolutional Neural Networks (CNNs), which excel at processing grid-like data. In aerospace, this is critical for analyzing satellite or drone imagery to identify objects (e.g., runways, vehicles, environmental changes) and for autonomous navigation systems (e.g., terrain recognition for landing site selection). They are also used in non-destructive testing, analyzing sensor data from composite materials to detect subsurface defects.

## When to study it
Before tackling this, you must have a solid grasp of:
1.  **Linear Algebra:** Specifically, matrix operations and the dot product. The convolution operation is fundamentally a series of dot products.
2.  **Neural Network Fundamentals:** You should understand the concept of a neuron, weights, biases, activation functions (like ReLU), and the structure of a basic fully-connected (dense) neural network.
3.  **Calculus:** A conceptual understanding of gradients is needed to appreciate how these networks learn, though we will not cover backpropagation here.

If you are not comfortable with these, review them first. The mechanics of convolution will be opaque otherwise.

## How to study it (step by step)
1.  **Hand-calculate a 2D convolution:** Take a small 4x4 matrix and a 2x2 filter. Manually slide the filter across the matrix, calculating each element of the output feature map. Use a stride of 1 and no padding.
2.  **Introduce stride:** Repeat the calculation from step 1, but this time with a stride of 2. Observe how the output dimensions change. Intuit what "stride" means: the step size of the sliding filter.
3.  **Introduce padding:** Take the same 4x4 matrix and 2x2 filter. Add a "zero-padding" of 1 pixel around the border of the input matrix. Recalculate the convolution with a stride of 1 and observe how padding helps preserve the spatial dimensions of the output.
4.  **Hand-calculate pooling:** Take the output feature map from step 1. Apply 2x2 max pooling with a stride of 2. This involves sliding a 2x2 window over the map and, for each position, taking only the maximum value.
5.  **Connect filters to features:** Sketch a 3x3 filter that would detect vertical edges (e.g., `[[1, 0, -1], [1, 0, -1], [1, 0, -1]]`). Apply it to a simple matrix with a vertical line of high values. See how the filter produces a strong response (a high value in the output map) along the edge.
6.  **Derive the output size formula:** Using variables for input width ($W$), filter size ($F$), padding ($P$), and stride ($S$), derive the formula for the output width. Start by considering the total effective width after padding ($W + 2P$) and how many steps of size $S$ the filter of size $F$ can take across it.

## Key ideas, with intuition
1.  **Local Receptive Fields:** Unlike a fully-connected layer where every neuron sees every input, a neuron in a convolutional layer only sees a small patch of the input image (the size of the filter). This enforces a locality constraint, assuming that nearby pixels are more related than distant ones. This is computationally efficient and mirrors how biological visual systems process information.

2.  **Parameter Sharing:** This is the core efficiency of CNNs. The *same* filter (the same set of weights) is used across the entire input image. If a filter is good at detecting a horizontal edge at the top-left of an image, it will be equally good at detecting one at the bottom-right. This drastically reduces the number of parameters to learn and makes the network inherently **translation invariant**.

3.  **The Convolution Operation (in ML):** For a 2D input $I$ and a filter (kernel) $K$, the output feature map $O$ at position $(i, j)$ is the sum of the element-wise product of the kernel and the input patch it covers. This is technically cross-correlation, but called convolution in the ML community.
    $$
    O(i, j) = (I * K)(i, j) = \sum_{m}\sum_{n} I(i+m, j+n) K(m, n)
    $$
    Think of it as a weighted sum, where the weights (the filter) are designed to "light up" when they see a pattern they recognize.

4.  **Pooling for Invariance and Dimensionality Reduction:** After finding features with a convolution, we often don't care about their *exact* location, just their approximate location relative to other features. Max pooling takes a small window (e.g., 2x2) and replaces it with the single maximum value. This makes the representation smaller and more robust to small shifts or distortions in the input. It has no learnable parameters.

## Worked example
Let's perform a 2D convolution followed by max pooling.

**Input Matrix ($I$), 4x4:**
$$
I = \begin{pmatrix}
1 & 1 & 2 & 4 \\
5 & 6 & 7 & 8 \\
3 & 2 & 1 & 0 \\
1 & 2 & 3 & 4
\end{pmatrix}
$$

**Kernel ($K$), 2x2:**
$$
K = \begin{pmatrix}
1 & 0 \\
2 & 1
\end{pmatrix}
$$

**Step 1: Convolution (Stride=1, No Padding)**
We slide the 2x2 kernel over the 4x4 input. The output will be a 3x3 matrix.

*   **Top-left output element $O(0,0)$:**
    $$
    \begin{pmatrix} \mathbf{1} & \mathbf{1} \\ \mathbf{5} & \mathbf{6} \end{pmatrix} \cdot \begin{pmatrix} 1 & 0 \\ 2 & 1 \end{pmatrix} = (1 \times 1) + (1 \times 0) + (5 \times 2) + (6 \times 1) = 1 + 0 + 10 + 6 = 17
    $$
*   **Next element to the right $O(0,1)$:**
    $$
    \begin{pmatrix} \mathbf{1} & \mathbf{2} \\ \mathbf{6} & \mathbf{7} \end{pmatrix} \cdot \begin{pmatrix} 1 & 0 \\ 2 & 1 \end{pmatrix} = (1 \times 1) + (2 \times 0) + (6 \times 2) + (7 \times 1) = 1 + 0 + 12 + 7 = 20
    $$
Continuing this process for all 9 positions, we get the **Feature Map ($O$)**:
$$
O = \begin{pmatrix}
17 & 20 & 26 \\
21 & 20 & 17 \\
11 & 10 & 9
\end{pmatrix}
$$
*Reflection:* Each step was a dot product between the flattened kernel and the corresponding input patch. The sliding motion allows the same feature detector (the kernel) to scan the entire input.

**Step 2: Max Pooling (2x2 Window, Stride=2)**
Now we apply pooling to the feature map $O$. We slide a 2x2 window with a stride of 2.

*   **Top-left output:**
    $$
    \max \begin{pmatrix} \mathbf{17} & \mathbf{20} \\ \mathbf{21} & \mathbf{20} \end{pmatrix} = 21
    $$
*   **Top-right output:**
    $$
    \max \begin{pmatrix} \mathbf{20} & \mathbf{26} \\ \mathbf{20} & \mathbf{17} \end{pmatrix} = 26
    $$
*   **Bottom-left output:**
    $$
    \max \begin{pmatrix} \mathbf{21} & \mathbf{20} \\ \mathbf{11} & \mathbf{10} \end{pmatrix} = 21
    $$
*   **Bottom-right output:**
    $$
    \max \begin{pmatrix} \mathbf{20} & \mathbf{17} \\ \mathbf{10} & \mathbf{9} \end{pmatrix} = 20
    $$
**Final Pooled Output ($P$)**:
$$
P = \begin{pmatrix}
21 & 26 \\
21 & 20
\end{pmatrix}
$$
*Reflection:* The pooling step aggressively downsampled the feature map from 3x3 to 2x2. It preserved the strongest activations from each quadrant, making the final representation more compact and robust.

## Diagrams
Convolution with a 3x3 kernel on a 5x5 input (stride 1, no padding):
```text
      Input (I)                     Kernel (K)     Output (O)
  j=0 1 2 3 4
i=0[x x x|x x]                     [k k k]        [o o o]
i=1[x x x|x x] --(element-wise *)-> [k k k] --(sum)-> [o o o]
i=2[x x x|x x]                     [k k k]        [o o o]
   |-----|
i=3[x x x x x]
i=4[x x x x x]

The 3x3 kernel slides across I. The first position (shaded with 'x')
produces the output element O(0,0). The kernel then slides one
step to the right (stride=1) to produce O(0,1), and so on.
```

Max pooling with a 2x2 window and stride 2:
```text
  Feature Map (O)                     Pooled Output (P)
  j=0   1    2   3
i=0[17  20 | 26  18]
i=1[21  20 | 17  15] ----> [max(17,20,21,20)  max(26,18,17,15)] ----> [21  26]
   --------+--------        [max(11,10, 8, 7)  max( 9, 6, 5, 4)]     [11   9]
i=2[11  10 |  9   6]
i=3[ 8   7 |  5   4]

The 2x2 pooling window takes the max from each quadrant,
reducing the 4x4 map to a 2x2 map.
```

## Memory technique — remember this forever
1.  **Mnemonic:** Think of a **C**onvolutional **L**ens. The kernel is a special lens (`L`) that you slide (`C` for "convolves" or "crawls") across the image to find one specific feature, like "vertical edge" or "corner". Pooling is just "summarizing" the findings in each region.

2.  **Must-learn formulas:**
    *   Output size calculation: For an input of size $W \times H$, filter $F \times F$, padding $P$, stride $S$:
        $$ W_{out} = \frac{W - F + 2P}{S} + 1 $$
        $$ H_{out} = \frac{H - F + 2P}{S} + 1 $$
    *   Conceptual formula for convolution:
        $$ O(i, j) = \sum \text{(Input Patch at (i,j))} \odot \text{(Kernel)} $$
        where $\odot$ is the element-wise product.

3.  **Spaced Repetition Schedule:** Review these formulas and the worked example at: 1 day, 3 days, 7 days, 16 days, 35 days. Do not just read them. Rederive them from scratch each time.

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    *   **Convolution:** It's just a dot product. Draw a small matrix and a smaller filter. Place the filter at the top-left. Multiply corresponding numbers. Add them up. That's your first output value. Slide the filter one step over. Repeat. That's all it is.
    *   **Output Size Formula:** Draw an input of width $W$. Add padding $P$ to each side, making the total width $W+2P$. The filter has width $F$. The first placement covers pixels $0$ to $F-1$. The last possible placement must end at pixel $W+2P-1$. How many steps of size $S$ can you take? The total distance to cover is $(W+2P) - F$. The number of steps is that distance divided by the step size $S$. Add 1 for the initial position. This rebuilds the formula.

## Common mistakes
1.  **Convolution vs. Cross-Correlation:** In signal processing, the convolution kernel is flipped horizontally and vertically before the sliding product-sum. In deep learning, we do not flip the kernel. This operation is technically cross-correlation, but we universally call it convolution. Do not get confused if you see the formal definition elsewhere; in ML, the kernel is not flipped.
2.  **Forgetting Channels:** Real images have 3 channels (RGB). A convolutional filter must have the same depth as its input. So, to process an RGB image, your filter might be $3 \times 3 \times 3$. The convolution sums across the spatial dimensions *and* the channel dimension to produce a single number for each output pixel in the feature map.
3.  **Pooling has no parameters:** The weights are in the convolutional layers. Pooling is a fixed, deterministic operation (e.g., "take the max"). It does not learn.
4.  **Incorrect Output Dimension Math:** The most common error is miscalculating the output size. Always use the formula. Be especially careful when the dimensions don't divide evenly; the result is typically floored.

## Self-check
1.  An input image has dimensions $256 \times 256$. You apply a convolutional layer with 64 filters, each of size $5 \times 5$. You use a stride of 1 and padding of 2. What are the dimensions of the output volume?
2.  Your input feature map has dimensions $28 \times 28 \times 128$. You apply max pooling with a $2 \times 2$ window and a stride of 2. What are the dimensions of the output? What if the stride was 1?
3.  Explain why parameter sharing is particularly effective for image recognition tasks but would be a poor choice for processing tabular data where each column represents a completely different type of feature (e.g., age, salary, zip code).