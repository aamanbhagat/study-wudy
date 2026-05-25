## What it is
GPU architecture is designed for massive throughput by using a parallel execution model called **SIMT (Single Instruction, Multiple Threads)**. In this model, a single instruction is issued to a group of threads, called a **warp**, which execute it in lockstep on different data. The **CUDA model** is NVIDIA's software layer that allows programmers to write C/C++ code that maps onto this hardware architecture.

## Why it matters
This architecture is the engine behind modern machine learning, scientific computing, and computational physics. Training neural networks involves immense matrix multiplications, which are perfectly parallelizable with SIMT. In aerospace, simulating fluid dynamics (CFD) for aerodynamics or modeling N-body gravitational interactions for orbital mechanics relies on performing the same calculations on millions of data points, a task where GPUs outperform CPUs by orders of magnitude.

## When to study it
Before diving in, you must have a solid grasp of these prerequisites. If not, master them first.
1.  **CPU Architecture:** Understand the von Neumann architecture, instruction pipelines, cache hierarchies, and the distinction between latency and throughput optimization. You need to know what a "normal" processor does to appreciate why a GPU is different.
2.  **C/C++ Programming:** CUDA is an extension of C++. You must be comfortable with functions, pointers, arrays, and memory management (`malloc`/`free`).
3.  **Operating Systems Concepts:** A clear understanding of threads, processes, and the basics of scheduling.

## How to study it (step by step)
1.  **Contrast CPU vs. GPU:** Draw a simple block diagram of a CPU core (large cache, complex control unit, few powerful ALUs) next to a GPU Streaming Multiprocessor (SM) (small cache, simple control, many simple ALUs). Label the CPU "Latency Optimized" and the GPU "Throughput Optimized". Internalize this trade-off.
2.  **Map the CUDA Hierarchy:** On paper, draw the logical hierarchy: a Grid is a collection of Blocks, and a Block is a collection of Threads. Next to it, draw the physical hardware: a Device (the GPU) contains multiple Streaming Multiprocessors (SMs), and an SM contains many CUDA Cores (the ALUs). Draw arrows showing that the OS assigns Blocks to be executed on available SMs.
3.  **Define the Warp:** A warp is the fundamental unit of scheduling on an SM, typically comprising 32 threads. Write this down: "All 32 threads in a warp execute the same instruction at the same time." This is the "SI" in SIMT. The "MT" comes from the fact that each thread has its own registers and operates on its own data.
4.  **Induce Thread Divergence:** Write a simple CUDA kernel with an `if-else` statement based on the thread's ID, like `if (threadIdx.x % 2 == 0) { ... } else { ... }`. Trace what happens: the SM executes the `if` path for the even-numbered threads while the odd threads are masked (inactive). Then, it executes the `else` path for the odd threads while the even threads are masked. The total time is the sum of the time for both paths. This is a critical performance penalty.
5.  **Code Vector Addition:** Implement the canonical "hello world" of CUDA: adding two vectors `A` and `B` into a vector `C`. Focus on the single most important line: `int idx = blockIdx.x * blockDim.x + threadIdx.x;`. Manually calculate `idx` for a few threads (e.g., thread 0 of block 0; thread 5 of block 1) to prove to yourself that it generates a unique global index for each thread.

## Key ideas, with intuition
1.  **The Army of Ants vs. The Genius:** A CPU is like a single, brilliant genius who can solve complex, sequential problems very quickly (low latency). A GPU is like an army of millions of ants; each ant is simple, but together they can move a mountain of dirt very quickly (high throughput). You wouldn't ask an army of ants to write a novel, and you wouldn't ask a genius to move a mountain one pebble at a time. Pick the right tool for the job.

2.  **Logical vs. Physical Abstraction:** The CUDA model of Grids/Blocks/Threads is a *logical* abstraction that lets you express the parallelism in your problem. The hardware's SMs and Cores are the *physical* reality. The CUDA runtime and driver are responsible for the magic of mapping your logical grid onto the physical hardware, which makes your code portable across different GPUs. You organize the work; the hardware executes it.

3.  **The Warp is the Real "Thread":** From the programmer's perspective, you manage individual threads. From the SM's perspective, it only schedules and issues instructions to *warps*. A warp is a single entity. If one thread in a warp has to wait for a memory access, all 32 threads in that warp stall. If threads in a warp disagree on which path to take in an `if` statement (divergence), the warp must execute *all* paths sequentially. The performance of your code is determined by how uniformly your warps behave.

4.  **The Global Index Formula:** This is the key to mapping threads to data.
    $$
    \text{global\_id} = \text{blockId} \times \text{blockSize} + \text{threadId}
    $$
    *   `blockId`: Which block of threads am I in?
    *   `blockSize`: How many threads are in each block?
    *   `threadId`: What is my ID *within* my block?
    Intuition: Think of a book. `blockId` is the chapter number, `blockSize` is the number of pages per chapter, and `threadId` is the page number within that chapter. To find the absolute page number from the beginning of the book, you calculate `(chapter_num - 1) * pages_per_chapter + page_in_chapter`. The formula is identical.

## Worked example
**Problem:** Add two arrays, `A` and `B`, each with $N=1024$ elements, and store the result in `C`. We'll use blocks of 256 threads.

**1. Host Code (CPU side):**
This code sets up the problem.
```c++
#include <iostream>

// The kernel (GPU function) is defined below
__global__ void vectorAdd(float *A, float *B, float *C, int N);

int main() {
    int N = 1024;
    size_t size = N * sizeof(float);

    // 1. Allocate host (CPU) memory
    float *h_A = (float*)malloc(size);
    float *h_B = (float*)malloc(size);
    float *h_C = (float*)malloc(size);

    // Initialize host arrays (e.g., A[i] = i, B[i] = 2*i)
    for (int i = 0; i < N; ++i) {
        h_A[i] = (float)i;
        h_B[i] = (float)i * 2.0f;
    }

    // 2. Allocate device (GPU) memory
    float *d_A, *d_B, *d_C;
    cudaMalloc(&d_A, size);
    cudaMalloc(&d_B, size);
    cudaMalloc(&d_C, size);

    // 3. Copy data from host to device
    cudaMemcpy(d_A, h_A, size, cudaMemcpyHostToDevice);
    cudaMemcpy(d_B, h_B, size, cudaMemcpyHostToDevice);

    // 4. Configure and launch the kernel
    int threadsPerBlock = 256;
    int blocksPerGrid = (N + threadsPerBlock - 1) / threadsPerBlock; // ceil(N / 256) = 4
    vectorAdd<<<blocksPerGrid, threadsPerBlock>>>(d_A, d_B, d_C, N);

    // 5. Copy result from device to host
    cudaMemcpy(h_C, d_C, size, cudaMemcpyDeviceToHost);

    // 6. Verify result and free memory
    // ... verification code ...
    free(h_A); free(h_B); free(h_C);
    cudaFree(d_A); cudaFree(d_B); cudaFree(d_C);

    return 0;
}
```

**2. Kernel Code (GPU side):**
This is the function that runs on the GPU. Each thread executes this code.
```c++
__global__ void vectorAdd(float *A, float *B, float *C, int N) {
    // Calculate the global index for this thread
    int i = blockIdx.x * blockDim.x + threadIdx.x;

    // Boundary check: make sure we don't access out of bounds
    if (i < N) {
        C[i] = A[i] + B[i];
    }
}
```

**Reflection on Steps:**
*   **Step 1-3 (Memory Management):** This is crucial. The GPU has its own memory space, separate from the CPU's RAM. We must explicitly allocate memory on the device and copy data to it before the GPU can work.
*   **Step 4 (Kernel Launch):** The `<<<...>>>` syntax is CUDA's extension to C++. We are launching a grid of 4 blocks, where each block contains 256 threads. This gives a total of $4 \times 256 = 1024$ threads, one for each element of our arrays. The integer division trick `(N + threadsPerBlock - 1) / threadsPerBlock` is a standard way to compute the ceiling of $N / \text{threadsPerBlock}$.
*   **Kernel Logic (Index Calculation):** Inside the kernel, each of the 1024 threads calculates its own unique index `i`. For example, the 10th thread (`threadIdx.x = 9`) in the 2nd block (`blockIdx.x = 1`) calculates its index as $i = 1 \times 256 + 9 = 265$. It then performs the addition for `C[265] = A[265] + B[265]`. This ensures that every element is processed exactly once, in parallel.
*   **Step 5 (Copy Back):** After the kernel finishes, the result `C` exists only in GPU memory. We must copy it back to the host to use it.

## Diagrams
Here is the CUDA software/hardware hierarchy:

```text
      LOGICAL VIEW (Programmer's Model)          PHYSICAL VIEW (Hardware)
      +----------------------------------+        +--------------------------+
      |              Grid                |        |          Device          |
      | +---------+ +---------+ ...      |        | +-------+ +-------+ ...  |
      | | Block 0 | | Block 1 |          | =====> | | SM 0  | | SM 1  |      |
      | |         | |         |          |        | |       | |       |      |
      | | T0 T1...| | T0 T1...|          |        | | Core  | | Core  |      |
      | | T255    | | T255    |          |        | | Core  | | Core  |      |
      | +---------+ +---------+          |        | | ...   | | ...   |      |
      +----------------------------------+        +--------------------------+
          |                 ^
          |                 |
          v                 |
      A Block is a group of threads.
      Blocks are assigned to execute on SMs.
```

And here is the execution flow for warp divergence:

```text
          Warp of 32 threads arrives
                      |
                      v
            +--------------------+
            | if (threadId < 16) |
            +--------------------+
           /                      \
          / (True for 16 threads)  \ (False for 16 threads)
         v                          v
+------------------+         +------------------+
| Path A           |         | Path B           |
|                  |         |                  |
| Threads 0-15     |         | Threads 16-31    |
| execute.         |         | execute.         |
|                  |         |                  |
| Threads 16-31    |         | Threads 0-15     |
| are masked (idle)|         | are masked (idle)|
+------------------+         +------------------+
         \                          /
          \                        /
           v                      v
            +--------------------+
            |    Warp reconverges  |
            +--------------------+
                      |
                      v
          Total Time = Time(A) + Time(B)
```

## Memory technique — remember this forever
1.  **Mnemonic Story: The General and the Firing Squad.** Imagine a **General** (the SM's instruction scheduler) in charge of a **Firing Squad** (a warp of 32 soldiers/threads). The General shouts a single command: "Ready! Aim! Fire!". All 32 soldiers execute that *single instruction* at the same time, but each aims at their own *multiple targets* (data). This is **SIMT**. If the General says, "If your target is wearing blue, aim for the head; otherwise, aim for the chest," the squad becomes inefficient. First, the 'blue-target' soldiers fire while the others wait. Then, the 'other-target' soldiers fire while the first group waits. This is **divergence**, and it wastes time. An effective squad has everyone doing the same thing.

2.  **Must-learn facts:**
    *   Execution Model: **Grid > Block > Thread**.
    *   Core Formula: `int global_idx = blockIdx.x * blockDim.x + threadIdx.x;`
    *   Core Concept: **SIMT** — A **warp** (32 threads) is the unit of scheduling; they execute one instruction in lockstep.

3.  **Spaced Repetition Schedule:** Review these concepts from scratch (try to re-derive them) on this schedule:
    *   In 1 day.
    *   In 3 days.
    *   In 7 days.
    *   In 16 days.
    *   In 35 days.

4.  **First Principles Pathway:** If you forget everything, start here: "I need to do the same math on a million numbers. The fastest way is to have a million tiny, dumb calculators instead of one smart one. How do I control them all without complex logic? I'll just broadcast a single instruction to all of them at once. How does calculator #543,210 know it should work on number #543,210? I'll give it a unique ID and have it use that ID to find its data in a big array." This line of reasoning rebuilds the need for many cores, the SIMT model, and the global index calculation.

## Common mistakes
1.  **Forgetting the `if (i < N)` check.** In our example, $N=1024$ was a perfect multiple of the block size (256). If $N=1000$, we would still launch 4 blocks (1024 threads). The last 24 threads would have indices $i \ge 1000$ and must be prevented from reading/writing out of bounds of the arrays. Forgetting this check is a common source of crashes.
2.  **Confusing `blockDim` and `gridDim`.** `blockDim` is a built-in variable that tells a thread how many threads are in its block. `gridDim` tells it how many blocks are in the grid. Students often mix these up in the index calculation.
3.  **Assuming Global Sync.** Threads within a single block can be synchronized with `__syncthreads()`. There is *no* simple, efficient way to synchronize all threads across an entire grid. Thinking you can is a major architectural misunderstanding. Blocks must be independent.

## Self-check
1.  What is the difference between the variables `threadIdx.x`, `blockIdx.x`, `blockDim.x`, and `gridDim.x`? Which are determined by the programmer at launch, and which are built-in variables for the kernel?
2.  You launch a kernel on a grid of 10 blocks, with 128 threads per block. Inside the kernel is the code: `if (threadIdx.x < 64) { do_A(); } else { do_B(); }`. Assuming `do_A()` and `do_B()` take roughly the same amount of time, by approximately what factor is this code slower than a version with no `if` statement? What if the condition was `if (blockIdx.x < 5)`?
3.  You need to process an image of size $1920 \times 1080$ pixels. You decide to use 2D blocks of size $16 \times 16$ threads.
    *   What is the `dim3` launch configuration for the grid and blocks?
    *   Write the two lines of code inside the kernel to calculate the unique global `x` and `y` index for each thread.
    *   What boundary checks are necessary?