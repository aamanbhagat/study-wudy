## What it is
Profiling is the dynamic analysis of a program's performance characteristics, such as its execution time or memory usage. It involves measuring which parts of your code—specifically which functions or lines—are consuming the most resources. This process creates a "profile" that acts as a performance roadmap, pointing directly to bottlenecks.

## Why it matters
In scientific computing, simulations for physics or rocket trajectory calculations can run for weeks; a 5% speedup from profiling can save days of compute time. In machine learning, training models involves massive matrix operations, and profiling helps optimize the underlying numerical libraries. For real-time aerospace systems, profiling isn't about speed but predictability—it guarantees that critical control loops execute within their strict time budgets, preventing catastrophic failure.

## When to study it
Before tackling profiling, you must be proficient with the command-line compilation toolchain for C/C++. Specifically, you should understand:
1.  **Compilation & Linking:** How `g++` (or `gcc`) transforms source code into an executable, and the purpose of compiler flags like `-g` (debugging symbols), `-O` (optimization levels), and `-l` (linking libraries).
2.  **Function Call Stack:** The concept of a call stack, how functions are pushed onto it when called and popped off when they return.
3.  **Basic System Architecture:** The difference between user space and kernel space, and the general idea of CPU instructions and cycles.

If these concepts are not solid, pause and review them. Profiling results will be meaningless without this context.

## How to study it (step by step)
1.  **Write a target program.** Create a simple C++ program with an obvious bottleneck. For example, a function that calculates Fibonacci numbers recursively, and another that does a simple loop. Call both from `main`.
2.  **Profile with `gprof` (Instrumentation).** Compile your code with `g++ -pg -g -o my_app my_app.cpp`. The `-pg` flag adds instrumentation code. Run `./my_app`. This will produce a `gmon.out` file. Analyze it with `gprof my_app gmon.out > analysis.txt`. Study the "flat profile" and the "call graph" in the output file.
3.  **Profile with `perf` (Sampling).** Recompile without the `-pg` flag: `g++ -g -o my_app my_app.cpp`. Run the profiler: `perf record ./my_app`. This samples the program's state at a high frequency. Then, run `perf report` to launch an interactive viewer showing which functions were on the CPU most often. Compare its findings to `gprof`.
4.  **Profile with `Callgrind` (Dynamic Instrumentation).** Using the same executable from step 3, run `valgrind --tool=callgrind ./my_app`. This will produce a file like `callgrind.out.<pid>`. Analyze it using `callgrind_annotate callgrind.out.<pid>`. Notice that Callgrind counts *instructions executed* ($I_r$), not just time, giving a more deterministic view of computational work.
5.  **Optimize and verify.** Based on the profiles, identify the slowest function. Replace the recursive Fibonacci with an iterative version. Re-run one of the profilers and observe the dramatic change in the results. This closes the loop and confirms your understanding.

## Key ideas, with intuition
1.  **Instrumentation vs. Sampling:** This is the core philosophical divide in profiling.
    *   **Instrumentation** is like inserting a stopwatch into your code. The compiler (`gprof`) or a runtime tool (`Callgrind`) adds extra instructions at the entry and exit of every function to record calls and time spent. It's highly accurate but intrusive; the act of measuring changes the program's performance (the "Observer Effect").
    *   **Sampling** is like being a diligent observer with a notebook. A tool like `perf` asks the operating system to interrupt the program thousands of times per second and record what instruction was executing. It has very low overhead but is probabilistic; a function that runs very quickly but is called billions of times might be missed.

2.  **The Call Graph:** This is the most valuable artifact from a profiler. It's not just a list of slow functions; it's a map of *how* time is spent. If `main()` calls `A()` and `A()` calls `B()`, and `B()` is slow, the time spent in `B()` is also considered time spent in `A()` and `main()`. The call graph untangles these relationships, distinguishing between "self time" (time spent in the function's own code) and "total time" (self time + time spent in functions it called).

3.  **Events are more than just time.** Profiling isn't limited to measuring seconds. Modern tools like `perf` and `Callgrind` can count other hardware events.
    *   `perf` can count CPU cycles, cache misses, branch mispredictions, and more. A function might be "fast" in terms of raw instructions but cause thousands of cache misses, making it the true bottleneck.
    *   `Callgrind` focuses on instruction reads ($I_r$), data writes ($D_w$), and data reads ($D_r$), which directly map to computational work. This is invaluable for comparing algorithm efficiency independent of the hardware it runs on. The total instruction count is a key metric: $$I_{total} = I_r + D_r + D_w$$

## Worked example
Let's profile a simple program with `gprof`.

**Code (`profile_test.cpp`):**
```cpp
#include <iostream>
#include <vector>

// A deliberately slow function
void heavy_computation() {
    volatile double sink = 0; // volatile prevents optimization
    for (long i = 0; i < 200000000; ++i) {
        sink += i * 0.1;
    }
}

// A fast function
void light_computation() {
    volatile int sink = 0;
    for (int i = 0; i < 100000; ++i) {
        sink += i;
    }
}

int main() {
    heavy_computation();
    light_computation();
    return 0;
}
```

**Step 1: Compile with instrumentation.**
The `-pg` flag tells `g++` to add the necessary hooks for `gprof`.
```bash
g++ -pg -g -o profile_test profile_test.cpp
```

**Step 2: Run the program.**
This execution generates the profiling data.
```bash
./profile_test 
```
After it finishes, a file named `gmon.out` appears in the directory.

**Step 3: Analyze the data with `gprof`.**
We run `gprof`, telling it the executable name and the data file.
```bash
gprof profile_test gmon.out
```

**Step 4: Interpret the output (Flat Profile).**
The most important part is the flat profile, which looks something like this (values will vary):

```text
Flat profile:

Each sample counts as 0.01 seconds.
  %   cumulative   self              self     total           
 time   seconds   seconds    calls  ms/call  ms/call  name    
 99.50      1.99     1.99        1  1990.00  1990.00  heavy_computation()
  0.50      2.00     0.01        1    10.00    10.00  light_computation()
```

*   **`% time`**: The percentage of total execution time spent in this function's code (its "self" time). `heavy_computation` clearly dominates, taking 99.5% of the time.
*   **`self seconds`**: The absolute time in seconds spent in this function. `heavy_computation` took 1.99 seconds.
*   **`calls`**: How many times the function was called. Both were called once.
*   **`name`**: The function name. This is why compiling with `-g` (debug symbols) is crucial.

**Reflection:**
This process worked because we followed the three-stage workflow: **instrument** (compile with `-pg`), **execute** (run the program to generate data), and **analyze** (use the tool to interpret the data). The output immediately and unambiguously identified `heavy_computation` as the bottleneck we must optimize.

## Diagrams
A call graph shows the flow of execution and time. For our worked example, the graph is simple but illustrates the concept of parent/child relationships.

```text
        [main] (total time: 2.00s)
           |
           | calls (1)
           v
+--------------------------+      +---------------------------+
| heavy_computation()      |      | light_computation()       |
| (self time: 1.99s)       |----->| (self time: 0.01s)        |
| (children time: 0.00s)   |      | (children time: 0.00s)    |
+--------------------------+      +---------------------------+
           ^                            ^
           |                            |
           +---------- calls (1) -------+
```
This diagram shows that `main` is the parent. Its total time includes the self time of its children, `heavy_computation` and `light_computation`. `gprof`'s textual call graph provides this same information numerically.

## Memory technique — remember this forever
1.  **Mnemonic Story:** Imagine you are a doctor for programs.
    *   `gprof` is the **G**eneral **P**ractitioner. It requires an **instrument** (the `-pg` flag, like a stethoscope) to be attached beforehand, and gives you a basic chart (flat profile & call graph).
    *   `perf` is the **Perf**ormance Specialist. It uses an external scanner (kernel sampling) to observe the patient without surgery. It's fast, low-risk, and can see everything from CPU to memory.
    *   `Valgrind/Callgrind` is the **V**ery thorough **C**linical pathologist. It puts the code under a microscope (dynamic binary instrumentation), counting every single cell (instruction). It's slow but incredibly detailed.

2.  **Must Overlearn Facts:**
    *   `gprof`: Instrumentation. Compile with `g++ -pg`. Analyze `gmon.out`.
    *   `perf`: Sampling. No special compilation. Use `perf record` and `perf report`.
    *   `Valgrind/Callgrind`: Dynamic Instrumentation. No special compilation. Use `valgrind --tool=callgrind`.

3.  **Spaced Repetition Schedule:**
    *   Review these facts and the mnemonic in **1 day**.
    *   Re-run the worked example from memory in **3 days**.
    *   Explain the difference between sampling and instrumentation to an imaginary colleague in **7 days**.
    *   Profile a small personal project in **16 days**.
    *   Read the `perf` man page for 10 minutes in **35 days**.

4.  **First Principles Pathway:**
    If you forget everything, how can you profile? Remember the two fundamental approaches.
    *   **Manual Instrumentation:** You can always import a time library (`<chrono>`) and write code to record the timestamp before and after a function call, then print the duration. This is the essence of instrumentation.
    *   **Manual Sampling:** You can run your program in a debugger (`gdb`), and repeatedly press `Ctrl+C` to pause it, then use the `backtrace` command to see where it is. If you do this 20 times and it's in the same function 18 times, you've found your bottleneck. This is the essence of sampling.

## Common mistakes
1.  **Profiling Optimized Code First:** Compiling with `-O2` or `-O3` allows the compiler to inline functions, reorder instructions, and eliminate code. This makes the profiler's output map poorly to your source code. Always start profiling with optimizations off (`-O0` or `-Og`) to get a clear picture, then turn them on to see how they affect performance.
2.  **Misinterpreting "Self" vs. "Total" Time:** A function `A` might have a low self time but a high total time. This means `A` itself is fast, but it calls other functions (`B`, `C`) that are slow. The optimization target is not `A`, but the functions it calls.
3.  **The "I/O Wait" Trap:** Your program might be slow because it's waiting for the network or disk. A simple CPU profiler like `gprof` won't show this, as no CPU time is being consumed. Tools like `perf` are better as they can be configured to watch for system calls and context switches, revealing time spent sleeping (waiting for I/O).
4.  **Ignoring Call Count:** A function might take only 1 millisecond per call, which seems fast. But if it's called 2 million times, it accounts for 2000 seconds of runtime. Always look at the product of `time/call` and `calls` to find the true impact.

## Self-check
1.  You are profiling a physics simulation. `gprof` adds 50% overhead, changing the program's behavior. `perf` shows a noisy profile that varies between runs. `Callgrind` is too slow to run the simulation to completion. Which tool's weakness is being demonstrated in each case, and how might you mitigate one of them?
2.  A `perf report` shows that 60% of CPU cycles are spent on an instruction called `movaps %xmm0, (%rax)`. This instruction is not in your C++ source code. What does this signify, and what does it tell you about where the performance bottleneck likely lies (e.g., in calculation, memory access, or logic)?
3.  You have two functions, `A` and `B`. `gprof` provides the following flat profile. The call graph shows that `main` calls `A` once, and `A` calls `B` 1,000,000 times. Where should you focus your optimization efforts and why?

    ```text
      %   cumulative   self              self     total           
     time   seconds   seconds    calls  ms/call  ms/call  name    
    60.00      0.60     0.60  1000000     0.00     0.00  B()
    40.00      1.00     0.40        1   400.00  1000.00  A()
    ```