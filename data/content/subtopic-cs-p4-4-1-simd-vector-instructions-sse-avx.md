## What it is
SIMD, or Single Instruction, Multiple Data, is a class of parallel computing where a single processor instruction performs the same operation on multiple data points simultaneously. Modern CPUs achieve this using wide registers (e.g., 128, 256, or 512 bits) that can hold multiple numbers (e.g., four 32-bit floats) and execute one operation, like addition, across all of them in a single clock cycle. SSE (Streaming SIMD Extensions) and AVX (Advanced Vector Extensions) are specific SIMD instruction set architectures implemented in x86 processors.

## Why it matters
SIMD is the workhorse behind high-performance scientific computing, machine learning, and graphics. In physics simulations, calculating the forces between N-bodies involves identical calculations for each body, a perfect fit for SIMD. In machine learning, matrix multiplications, which are fundamental to neural networks, are massively accelerated by performing dot products on vectors in parallel. For aerospace, trajectory calculations, fluid dynamics (CFD), and signal processing from sensors all rely heavily on vectorizable math that SIMD makes orders of magnitude faster.

## When to study it
Before diving into SIMD, you must have a solid grasp of these prerequisites:
1.  **CPU Architecture:** Understand the fetch-decode-execute cycle, the role of the ALU, and the concept of registers (both general-purpose and floating-point).
2.  **Data Representation:** Be fluent in how integers and floating-point numbers (specifically IEEE 754 single-precision) are represented in binary.
3.  **C/C++ Programming:** You need to be comfortable with pointers, arrays, and memory layout.
4.  **Assembly Language (Basics):** You don't need to be an expert, but you should understand what instructions, operands, and addressing modes are.

If you are not comfortable with these, pause and review them. SIMD builds directly on this foundation.

## How to study it (step by step)
1.  **Scalar Mindset:** Write a simple C++ function that adds two arrays of floats element by element: `for (int i=0; i<N; ++i) C[i] = A[i] + B[i];`. This is your baseline "scalar" implementation.
2.  **Visualize the Parallelism:** Draw the arrays `A` and `B`. Circle the first four elements of `A`, the first four of `B`, and the first four of `C`. Realize that the calculation for `C[0]` is independent of `C[1]`, etc. This is the data parallelism SIMD exploits.
3.  **Introduce Vector Registers:** Read about the 128-bit XMM registers used by SSE. Internalize that one XMM register can hold four 32-bit single-precision floats.
4.  **Meet the Intrinsics:** Go to the Intel Intrinsics Guide (a searchable web database). Look up these three SSE intrinsics: `_mm_load_ps`, `_mm_add_ps`, and `_mm_store_ps`. Read their descriptions. `ps` stands for "Packed Single-precision".
5.  **Write the SIMD Code:** Convert your scalar loop from step 1 into a SIMD loop using the intrinsics from step 4. Your loop will now increment by 4 instead of 1. You will load 4 floats from A, 4 from B, add them in one instruction, and store the 4 results into C.
6.  **Compile and Inspect:** Use a tool like Compiler Explorer (godbolt.org). Paste your C++ code with intrinsics and look at the generated assembly. You will see instructions like `movaps` (move aligned packed single), `addps` (add packed single), and `movaps` again. This proves that your C++ "function calls" are mapping to single, powerful CPU instructions.

## Key ideas, with intuition
1.  **Data Parallelism:** The core idea is separating the *what* from the *on what*. The instruction (`add`) is the *what*. The multiple data elements are the *on what*. Instead of one worker doing four additions one by one, you have four workers doing one addition each, all at the command of a single foreman.
2.  **Vector "Lanes":** Think of a 256-bit AVX register as an 8-lane highway. Each lane holds one 32-bit float. An instruction like `vaddps` (Vector Add Packed Singles) is like a traffic signal that turns green for all 8 lanes at once, letting all 8 cars (the data) move forward (get added) simultaneously.
    $$
    \text{Vector Register A} = [a_3, a_2, a_1, a_0] \\
    \text{Vector Register B} = [b_3, b_2, b_1, b_0] \\
    \text{Instruction: } \texttt{ADDPS A, B} \\
    \text{Result in A} = [a_3+b_3, a_2+b_2, a_1+b_1, a_0+b_0]
    $$
3.  **Memory is the Bottleneck:** SIMD is so fast that the main challenge is often feeding the beast. Loading data from RAM into the wide vector registers is the slowest part. This is why data layout is critical. Data that will be processed together should be stored together in memory (contiguous arrays), a concept known as "Structure of Arrays" (SoA) over "Array of Structures" (AoS).
4.  **Intrinsics: The Bridge:** Writing raw assembly is tedious and non-portable. Intrinsics are special functions provided by compilers (like `_mm_add_ps`) that look like C functions but are guaranteed to compile down to a single, specific assembly instruction. They give you the power of assembly with the convenience of a C/C++-like syntax.

## Worked example
Let's implement a simple `SAXPY` operation, which is central to linear algebra: $Y = aX + Y$. We'll compute this for 4 elements using SSE.

**Problem:** Given a scalar `a`, an array `X`, and an array `Y`, update `Y` such that `Y[i] = a*X[i] + Y[i]` for `i` from 0 to 3.

**C++ with SSE Intrinsics:**

```cpp
#include <iostream>
#include <immintrin.h> // Header for intrinsics

// Helper function to print a 128-bit vector of floats
void print_vec(__m128 v) {
    float data[4];
    _mm_storeu_ps(data, v);
    std::cout << "[" << data[3] << ", " << data[2] << ", " 
              << data[1] << ", " << data[0] << "]" << std::endl;
}

int main() {
    // Ensure memory is 16-byte aligned for performance
    alignas(16) float X[] = {1.0f, 2.0f, 3.0f, 4.0f};
    alignas(16) float Y[] = {10.0f, 20.0f, 30.0f, 40.0f};
    float a = 5.0f;

    // 1. Load data into vector registers
    __m128 vec_X = _mm_load_ps(X); // Loads 4 floats from X
    __m128 vec_Y = _mm_load_ps(Y); // Loads 4 floats from Y
    __m128 vec_a = _mm_set1_ps(a); // Broadcasts scalar 'a' to all 4 lanes

    std::cout << "Initial X: "; print_vec(vec_X);
    std::cout << "Initial Y: "; print_vec(vec_Y);
    std::cout << "Scalar a:  "; print_vec(vec_a);

    // 2. Perform the computation (a * X)
    __m128 vec_aX = _mm_mul_ps(vec_a, vec_X); // Packed multiplication

    std::cout << "a * X:     "; print_vec(vec_aX);

    // 3. Perform the computation (... + Y)
    __m128 result = _mm_add_ps(vec_aX, vec_Y); // Packed addition

    std::cout << "a*X + Y:   "; print_vec(result);

    // 4. Store the result back to memory
    _mm_store_ps(Y, result);

    std::cout << "Final Y in memory: [" << Y[0] << ", " << Y[1] << ", "
              << Y[2] << ", " << Y[3] << "]" << std::endl;

    return 0;
}
```

**Step-by-step reflection:**
1.  **Loading (`_mm_load_ps`, `_mm_set1_ps`):** We couldn't operate directly on memory. We first had to bring the data into the CPU's vector registers. For the scalar `a`, we needed a special instruction (`_mm_set1_ps`) to broadcast its value into all four "lanes" of the vector register `vec_a`.
2.  **Computation (`_mm_mul_ps`, `_mm_add_ps`):** The core logic. Notice how the complex expression `a*X+Y` was broken down into two fundamental SIMD operations: one multiplication and one addition. Each operated on four floats at once.
3.  **Storing (`_mm_store_ps`):** After the computation was finished in the registers, the final step was to write the result from the register `result` back into the main memory array `Y`.

This sequence—load, compute, store—is the fundamental pattern of nearly all SIMD programming.

## Diagrams
**Scalar vs. SIMD Addition**

```text
      SCALAR (One at a time)                 SIMD (Four at a time)
      +-------+   +-------+                  +-------------------+   +-------------------+
A[0]: |   5   |   |   10  | :B[0]            | 4 | 3 | 2 | 1 |   | 40| 30| 20| 10| : vec_B
      +-------+   +-------+                  +-------------------+   +-------------------+
          |           |                                |                       |
          V           V                                V                       V
      +-------------------+                        +-----------------------------------+
      |        ALU        |                        |           Vector ALU              |
      |      5 + 10       |                        | [4,3,2,1] + [40,30,20,10]         |
      +-------------------+                        +-----------------------------------+
                 |                                                 |
                 V                                                 V
      +-------+                                    +-------------------+
C[0]: |  15   |                                    | 44| 33| 22| 11| : vec_C
      +-------+                                    +-------------------+
(Repeats 3 more times)                        (Done in one cycle)
```

**128-bit SSE Register Layout**

A single `__m128` variable, which maps to an XMM register.

```text
    <-------------------- 128 bits -------------------->
    +--------------------+--------------------+--------------------+--------------------+
    | Element 3 (float)  | Element 2 (float)  | Element 1 (float)  | Element 0 (float)  |
    | (bits 127-96)      | (bits 95-64)       | (bits 63-32)       | (bits 31-0)        |
    +--------------------+--------------------+--------------------+--------------------+
```

## Memory technique — remember this forever
1.  **The Mnemonic Story:** Imagine an **"Assembly Line"** for data.
    *   **S**ingle **I**nstruction: The foreman shouts one command, like "TIGHTEN BOLT!"
    *   **M**ultiple **D**ata: The entire line of workers (say, 8 of them) all tighten their bolt at the exact same time.
    *   This is vastly more efficient than the foreman walking to each worker individually and telling them what to do. The workers are the ALU lanes, the foreman's shout is the instruction, and the car parts are the data in the vector register.

2.  **Must Overlearn:**
    *   **SIMD**: Single Instruction, Multiple Data.
    *   **Pattern**: Load -> Compute -> Store.
    *   **Register Widths**: SSE = 128-bit (XMM), AVX = 256-bit (YMM). (AVX-512 = 512-bit ZMM).

3.  **Spaced Repetition Schedule:** Review this material at these intervals:
    *   1 day (tomorrow)
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget everything, rebuild from this: "How can I make a simple `for` loop faster?"
    *   `for (i=0..N) C[i]=A[i]+B[i];`
    *   The operations are independent. The CPU must be able to do more than one at a time.
    *   So, it needs registers that hold more than one number. Let's call them "vector registers".
    *   It needs instructions that operate on the whole register at once. Let's call them "vector instructions".
    *   Therefore, the process must be: get a chunk of A and a chunk of B into these registers, do one big add, and put the resulting chunk into C. This re-derives the Load -> Compute -> Store pattern.

## Common mistakes
1.  **Ignoring Memory Alignment:** `_mm_load_ps` requires its memory address to be a multiple of 16. If it's not, your program will crash with a segmentation fault. Use `_mm_loadu_ps` (`u` for unaligned) if you can't guarantee alignment, but be aware it might be slower. Modern CPUs have reduced this penalty, but it's a crucial distinction.
2.  **Forgetting the "Tail":** If your array has 1001 elements and you process them 4 at a time with SSE, your main loop will run 250 times, processing elements 0-999. You will forget to process the last element, `[1000]`. Always have a small, scalar "cleanup" loop after your main SIMD loop to handle the remaining `N % vector_width` elements.
3.  **Mixing Packed Types:** The `_ps` suffix is for single-precision floats. If you're working with doubles, you need `_pd` (packed double). For integers, it's different still (`_epi32` for 32-bit signed integers). Using a float instruction on integer data will produce garbage; the bits are interpreted completely differently.

## Self-check
1.  How many 64-bit double-precision floating-point numbers can you fit in a single 512-bit AVX-512 (ZMM) register?
2.  Using the Intel Intrinsics Guide, find the SSE2 intrinsic to subtract two vectors of packed 32-bit integers. Write the single line of C++ code for it, assuming `__m128i vec_A` and `__m128i vec_B` are already loaded.
3.  You are given two large arrays of 3D vectors, `positions` and `velocities`. You need to compute the new position for each particle: `positions[i] = positions[i] + velocities[i] * dt`. Why might it be more performant to lay out your data as three separate arrays (`posX`, `posY`, `posZ`, `velX`, etc.) instead of an array of `struct Vector3D { float x, y, z; }` when writing a SIMD-optimized version of this update?