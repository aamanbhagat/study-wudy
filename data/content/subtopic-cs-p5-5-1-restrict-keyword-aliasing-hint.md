## What it is
The `restrict` keyword is a type qualifier for pointers, introduced in the C99 standard. It is a promise you, the programmer, make to the compiler that for the lifetime of the `restrict`-qualified pointer, the memory it points to will not be accessed through any other pointer. This is a hint that the pointers do not *alias*, meaning they do not point to overlapping memory regions.

## Why it matters
In scientific computing, aerospace simulations, and machine learning, you often perform operations on large arrays of data (e.g., matrix multiplication, solving differential equations, finite element analysis). These operations are computationally expensive and memory-bound. By promising the compiler that pointers do not alias, you unlock a class of powerful optimizations, most notably vectorization (using SIMD instructions) and better instruction scheduling, which can result in performance gains of 2x, 4x, or even more on critical numerical kernels.

## When to study it
Before tackling `restrict`, you must have a solid, non-negotiable understanding of the following:
*   **Pointers:** What they are, how to declare them, dereferencing (`*`), and taking an address (`&`).
*   **Pointer Arithmetic:** How `ptr + 1` works for different data types.
*   **Arrays and Pointers:** The relationship between array names and pointers in C.
*   **Function Arguments:** How pointers are passed to functions.
*   **Compiler Optimization:** A conceptual understanding of what `-O2` or `-O3` does (reordering instructions, using registers, etc.).

If any of these are weak, master them first. Using `restrict` without this foundation is dangerous.

## How to study it (step by step)
1.  **Observe the Problem:** Write a simple vector addition function without `restrict`.
    ```c
    void add_arrays(int *c, const int *a, const int *b, size_t n) {
        for (size_t i = 0; i < n; ++i) {
            c[i] = a[i] + b[i];
        }
    }
    ```
2.  **Inspect the Unoptimized Case:** Compile this code with `gcc -O3 -S add.c`. Look at the generated assembly file `add.s`. The compiler must be conservative. In each loop iteration, it might have to reload values from `a` and `b` because a write to `c[i]` could potentially change `a[i+1]` if, for example, `c` and `a` overlap.
3.  **Apply the Promise:** Modify the function signature to use `restrict`.
    ```c
    void add_arrays_restricted(int *restrict c, const int *restrict a, const int *restrict b, size_t n) {
        // ... same loop body ...
    }
    ```
4.  **Inspect the Optimized Case:** Recompile with `gcc -O3 -S add_restricted.c`. Examine the new assembly. You will likely see SIMD instructions (`paddd`, `movdqa`, etc.) that perform addition on multiple integers at once. The compiler can do this because you promised that writing to `c` will never affect the data read from `a` or `b`.
5.  **Break the Promise:** Write a `main` function that calls your restricted function with overlapping pointers.
    ```c
    int main() {
        int data[10] = {0};
        // Call with c aliasing a. This is undefined behavior.
        add_arrays_restricted(data, data, data + 1, 5); 
    }
    ```
    Compile and run. The program might crash, produce garbage results, or seem to work. The key is to understand that the behavior is now *undefined* because you violated the contract with the compiler.

## Key ideas, with intuition
1.  **Aliasing is the enemy of optimization.** Imagine a compiler looking at this code:
    ```c
    *p = 10;
    *q = 20;
    x = *p; 
    ```
    Without `restrict`, the compiler has to consider the possibility that `p` and `q` point to the same memory location. If they do, then after the second line, `*p` is `20`. The compiler *must* reload the value of `*p` from memory for the third line. It cannot assume `*p` is still `10`. This is a "memory stall" and it's slow.

2.  **`restrict` is a promise of no overlap.** By writing `int *restrict p` and `int *restrict q`, you tell the compiler: "I guarantee that `p` and `q` point to separate, non-overlapping memory regions." Now the compiler can reason:
    ```c
    *p = 10; // Store 10 in p's location. Keep 10 in a register.
    *q = 20; // Store 20 in q's location. This cannot affect p.
    x = *p;  // Optimization: No need to reload from memory. Use the value 10 from the register.
    ```
    This allows for keeping values in fast registers and reordering instructions for maximum throughput.

3.  **The penalty for lying is Undefined Behavior (UB).** `restrict` is not a check. It is not a runtime assertion. It is a compile-time hint that you give under penalty of UB if you are wrong. The compiler blindly trusts you and generates code based on that trust. If you lie, that optimized code will operate on false assumptions, leading to unpredictable results.

## Worked example
Let's implement a SAXPY (Single-precision A*X Plus Y) operation, a common kernel in linear algebra.

**The Task:** Implement `y = a*x + y` for vectors `x` and `y`, and scalar `a`.

**The C Code:**
```c
// saxpy.c
#include <stddef.h>

void saxpy(size_t n, float a, float *restrict y, const float *restrict x) {
    for (size_t i = 0; i < n; ++i) {
        y[i] = a * x[i] + y[i];
    }
}
```

**Step-by-step breakdown of the optimization `restrict` enables:**

1.  **The Ambiguity (Without `restrict`):** Could the `y` vector and the `x` vector overlap? Yes. For example, a user might call `saxpy(10, 2.0, my_array, my_array + 1)`. In this case, calculating `y[i]` (which is `my_array[i]`) would use `x[i]` (which is `my_array[i+1]`). The subsequent calculation for `y[i+1]` would then use a value of `y[i+1]` that was just modified in the previous step. The loop has a dependency on itself (`loop-carried dependency`). The compiler must generate slow, careful code that reads `x[i]` and `y[i]`, calculates the result, and writes it to `y[i]` before moving to the next iteration.

2.  **The Promise (With `restrict`):** The signature `float *restrict y, const float *restrict x` promises the compiler that any modification to `y[i]` will *not* affect the value of `x[j]` for any `i` or `j`. They are guaranteed to be separate blocks of memory.

3.  **The Optimization:** Because of this promise, the compiler can now perform several optimizations:
    *   **Vectorization:** It can load 4 or 8 floating-point numbers from `x` and `y` into wide SIMD registers. It can then perform 4 or 8 multiplications and 4 or 8 additions in a single CPU cycle, and write the 4 or 8 results back to `y`. This is a massive speedup.
    *   **Loop Unrolling & Pipelining:** The compiler can unroll the loop and start calculations for `i+1`, `i+2`, etc., before the calculation for `i` is finished, because it knows there are no data dependencies between iterations.

**Reflection:** The `restrict` keyword didn't change what the code *does*, it changed what the compiler *knows*. This extra knowledge is the key that unlocks aggressive, domain-specific optimizations essential for high-performance computing.

## Diagrams
Here is how to visualize the memory layout for aliased vs. restricted pointers.

**Case 1: Aliased Pointers (Potential Problem)**
The pointers `x` and `y` from the SAXPY example might overlap. The compiler must assume this worst-case scenario.

```text
Memory Address ->
+-------------------------------------------------------------+
| ... | x[0] | x[1] | x[2] | x[3] | x[4] | ...                 |
+-------------------------------------------------------------+
        ^             ^
        |             |
y ------+             |
                      x --------------------------------------+
```
Here, `y` points to `x[0]` and `x` points to `x[3]`. A write to `y[3]` is also a write to `x[3]`.

**Case 2: `restrict`-qualified Pointers (The Promise)**
You promise the compiler the memory blocks are distinct and non-overlapping.

```text
Memory Address ->
+------------------+     +------------------+
| y[0] | y[1] | ...|     | x[0] | x[1] | ...|
+------------------+     +------------------+
  ^                        ^
  |                        |
  y -----------------------+                        x -----------------------+
```
The compiler can now safely assume that writing to any part of the `y` block will never alter any value inside the `x` block.

## Memory technique — remember this forever
1.  **The Story:** Think of `restrict` as an "Exclusive Work Zone" permit for a pointer. You are telling the compiler, "This pointer `p` and its crew are the only ones allowed to work on this block of memory. No other pointer has a permit for this zone." If you secretly give another pointer `q` a permit to the same zone, the crews will interfere, the project will fail, and the result is chaos (Undefined Behavior).

2.  **Facts to Overlearn:**
    *   `void func(int *restrict p1, int *restrict p2);`
    *   `restrict` is a promise to the compiler that one pointer is the sole means of access to a memory object within its scope.
    *   Breaking the promise results in Undefined Behavior.

3.  **Spaced Repetition Schedule:** Review this concept and your notes at:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget the details, rebuild it from the problem: "Compilers can't optimize loops well if two pointers might point to the same memory (aliasing). How do I *tell* the compiler they don't?" The language feature designed for this exact purpose is the `restrict` keyword. It's a hint, a promise, to disable the compiler's conservative aliasing assumptions.

## Common mistakes
1.  **Assuming `restrict` is a runtime check.** It is not. The compiler does not generate code to verify that your pointers don't overlap. It trusts you.
2.  **Confusing `restrict` with `const`.** They are orthogonal.
    *   `const int * p`: You cannot change the `int` value *through pointer `p`*.
    *   `int * restrict p`: No *other pointer* can be used to access the `int` pointed to by `p`.
    *   `const int * restrict p`: Both promises apply. You can't modify the data via `p`, and no other pointer can access it either.
3.  **Using `restrict` carelessly.** Only use it when you are absolutely certain the pointers will not alias. It is most safely used on function parameters where the caller is responsible for providing non-overlapping arguments.

## Self-check
1.  Which of these function signatures uses `restrict` in a way that is both syntactically correct and semantically clear for optimization?
    a) `int restrict * func(void);`
    b) `void func(char * restrict s1, const char * restrict s2);`
    c) `static int * restrict global_pointer;`

2.  Consider the standard C library function `memcpy`. Its signature is `void *memcpy(void *restrict dest, const void *restrict src, size_t n);`. Why is the `restrict` keyword absolutely critical for an efficient implementation of `memcpy`? What would a non-`restrict` version have to do differently?

3.  Write a function `void scale_and_shift(double *data, double scale, double shift, size_t n)` that computes `data[i] = data[i] * scale + shift;` for each element. Then, write a `main` function that calls it in a way that would violate the `restrict` promise if `data` were declared `double *restrict data`. Explain exactly why your call constitutes a violation.