## What it is
Worst-Case Execution Time (WCET) is a calculated, provable upper bound on the execution time of a piece of software on a specific hardware platform. It is not an average time or a measured time from testing; it is a guarantee that the code will never, under any possible circumstance or input, take longer than this value to run.

## Why it matters
In hard real-time systems, correctness depends on both the logical result and the time at which it is delivered. For a rocket's flight control system, calculating a trajectory correction is useless if the result arrives after the rocket has already gone off course. WCET analysis is the fundamental tool used to prove that critical tasks will always meet their deadlines, preventing catastrophic failures in aerospace, automotive safety systems, and medical devices.

## When to study it
You are ready for this topic. The key prerequisites are:
1.  **Computer Architecture:** You must understand instruction pipelines, caches (hit/miss), and branch prediction. The unpredictability of these features is the primary challenge in WCET analysis.
2.  **Assembly Language:** You need to grasp how high-level constructs (loops, function calls) translate into machine instructions, as analysis happens at this level.
3.  **Basic Algorithm Analysis:** You should know Big-O notation, but be prepared to move beyond it. WCET requires exact cycle counts, not asymptotic bounds.
4.  **Operating Systems Concepts:** Familiarity with schedulers and interrupts is crucial, as they can preempt tasks and affect timing.

## How to study it (step by step)
1.  **Distinguish Analysis Types:** Take a simple C function. First, compile it and run it 1000 times with random inputs, measuring the execution time of each run. Note the maximum time you observe. Now, reflect on why this *dynamic testing* approach cannot *prove* the WCET. You might not have provided the one input that triggers the longest path. This motivates the need for *static analysis*—analyzing the code without running it.
2.  **Draw a Control Flow Graph (CFG):** Take the C function `int max(int a, int b) { if (a > b) return a; else return b; }`. Draw its CFG. A CFG consists of basic blocks (sequences of instructions with no branches in or out) as nodes and directed edges representing jumps or sequential flow. This graph represents all possible execution paths.
3.  **Assign Costs to Basic Blocks:** Assume a simple, hypothetical processor: integer arithmetic is 1 cycle, a memory load/store is 3 cycles, and a conditional branch is 2 cycles. Manually translate your `max` function's basic blocks into pseudo-assembly and calculate the cycle cost for each block.
4.  **Find the Longest Path:** Trace all paths from the entry to the exit of the CFG. Sum the costs of the basic blocks along each path. The path with the highest total cost determines the WCET of the function.
5.  **Analyze a Bounded Loop:** Now, analyze `int sum_array(int arr[], int n) { int sum = 0; for (int i=0; i<n; i++) { sum += arr[i]; } return sum; }`. Assume `n` is known to be at most 10. Calculate the WCET of the loop body. The total WCET will involve the setup, the exit, and $10 \times (\text{WCET of the loop body})$. This introduces the concept of "flow facts" or loop bounds, which are essential for analysis.
6.  **Introduce a Cache Effect:** Re-analyze the `sum_array` function. This time, assume a memory access is 1 cycle for a cache hit and 10 cycles for a cache miss. What is the WCET now? You must assume every memory access is a cache miss to get a safe upper bound. This demonstrates how hardware state complicates analysis.

## Key ideas, with intuition
1.  **It's a Proof, Not a Measurement.**
    Intuition: When certifying a bridge, engineers don't just drive a few trucks over it and say "it seems strong enough." They use physics to calculate the absolute maximum load it can bear. WCET analysis is the software equivalent: we are calculating the maximum "timing load" a piece of code can handle, proving it will never break its deadline.
    Formalism: We seek to find a value $C_{max}$ such that for any possible execution trace $T$, the execution time $t(T)$ satisfies $t(T) \le C_{max}$.

2.  **Hardware State is the Adversary.**
    Intuition: The time it takes to get a book from a library depends on whether it's on the "quick access" shelf right next to the desk (a cache hit) or in the deep archives (a cache miss). The execution time of an instruction depends on the state of the cache, pipeline, and branch predictor. Since this state is determined by the history of previously executed code, it's hard to predict. For a safe bound, WCET analysis must often assume the worst-case for all of these (e.g., every memory access is a cache miss, every branch is mispredicted).

3.  **The Halting Problem Requires Us to Simplify.**
    Intuition: You cannot write a program that can look at any other program and determine if it will ever stop. This is the Halting Problem. A direct consequence is that we cannot determine the WCET of an arbitrary program—an infinite loop has an infinite WCET.
    Formalism: To make WCET analysis tractable, we must restrict our programs. We must be able to provide "flow facts," such as upper bounds on loop iterations (`for i=0 to 10`) and finite recursion depths. Code with unbounded loops (e.g., `while(1)`) is un-analyzable.

## Worked example
Let's find the WCET for this C code on a simple CPU where:
*   Arithmetic (`+`, `-`, `<`): 1 cycle
*   Memory access (read/write `arr[i]`): 3 cycles
*   Branch (taken or not-taken): 2 cycles
*   Assignment (`=`): 1 cycle

The loop is guaranteed to run at most `N=20` times.

```c
int find_max_and_sum_pos(int arr[]) {
    int max_val = 0;
    int sum = 0;
    for (int i = 0; i < 20; i++) {
        if (arr[i] > max_val) {
            max_val = arr[i]; // Path A
        }
        sum += arr[i]; // Path B (always executes)
    }
    return sum + max_val;
}
```

**Step 1: Analyze the loop body's CFG.**
The loop starts with a comparison `i < 20`. Inside the loop, there's an `if` statement, creating two branches.

*   **Basic Block (Loop Head):** `if (arr[i] > max_val)`
    *   `t_read_arr_i`: 3 cycles (memory read)
    *   `t_read_max_val`: 1 cycle (assume `max_val` is in a register)
    *   `t_compare`: 1 cycle
    *   `t_branch`: 2 cycles
    *   Total: $3 + 1 + 1 + 2 = 7$ cycles.

*   **Path A (if-true):** `max_val = arr[i]`
    *   We already read `arr[i]` in the block above, but let's assume we need to read it again for this simple model.
    *   `t_read_arr_i`: 3 cycles
    *   `t_assign`: 1 cycle
    *   Total: $4$ cycles.

*   **Path B (always runs after if):** `sum += arr[i]`
    *   `t_read_arr_i`: 3 cycles
    *   `t_read_sum`: 1 cycle (register)
    *   `t_add`: 1 cycle
    *   `t_write_sum`: 1 cycle (register)
    *   Total: $6$ cycles.

**Step 2: Find the WCET of a single loop iteration.**
The worst case inside the loop occurs when the `if` condition is true, as this executes an extra block of code.
$$ WCET_{iteration} = (\text{Loop Head}) + (\text{Path A}) + (\text{Path B}) $$
$$ WCET_{iteration} = 7 + 4 + 6 = 17 \text{ cycles} $$

**Step 3: Calculate the total WCET for the loop.**
The loop runs `N=20` times. We must also account for the loop setup and final exit.
*   **Initialization:** `int max_val = 0; int sum = 0; int i = 0;`
    *   `t_init_max`: 1 cycle
    *   `t_init_sum`: 1 cycle
    *   `t_init_i`: 1 cycle
    *   Total: $3$ cycles.
*   **Loop Execution:** The loop body runs 20 times.
    *   $20 \times WCET_{iteration} = 20 \times 17 = 340$ cycles.
*   **Loop Control:** The comparison `i < 20` and increment `i++` also take time. Let's add this to the iteration cost. `i++` is 1 cycle. The comparison `i<20` is 1 cycle. A final branch to exit the loop is 2 cycles. Let's refine the iteration cost: $17 + 1 (\text{for } i++) + 1 (\text{for } i<20) = 19$. The final `i<20` check that fails costs $1+2=3$ cycles.
    *   Refined Loop Cost: $20 \times (17 + 1_{i++} + 1_{i<20}) = 20 \times 19 = 380$ cycles.
    *   Final comparison failure + branch out: $1+2 = 3$ cycles.
*   **Return:** `return sum + max_val;`
    *   `t_read_sum`: 1 cycle
    *   `t_read_max`: 1 cycle
    *   `t_add`: 1 cycle
    *   Total: $3$ cycles.

**Step 4: Sum all parts.**
$$ WCET_{total} = (\text{Init}) + (\text{Loop}) + (\text{Final Check}) + (\text{Return}) $$
$$ WCET_{total} = 3 + 380 + 3 + 3 = 389 \text{ cycles} $$

**Reflection:** This worked because we broke the code into a graph of basic blocks (Step 1), found the most expensive path through any conditional logic (Step 2), and used the provided loop bound to multiply that worst-case cost (Step 3). We accounted for all parts of the program: setup, loop, and teardown (Step 4).

## Diagrams
Here is the Control Flow Graph (CFG) for the loop body in the worked example.

```text
                 +------------------+
                 | Entry to Loop    |
                 | i < 20           |
                 +------------------+
                         |
                         V
           +---------------------------+
           | BB1:                      |
           | read arr[i], read max_val |
           | compare, branch           |
           +---------------------------+
                 |              \
           (true)|               \ (false)
                 V                \
    +------------------------+     \
    | BB2 (Path A):          |      |
    | max_val = arr[i]       |      |
    +------------------------+      |
                 |                  /
                 V                 /
           +------------------------+
           | BB3 (Path B):          |
           | sum += arr[i]          |
           | i++                    |
           +------------------------+
                 |
                 +-----> To Loop Entry
```

## Memory technique — remember this forever
1.  **The Mnemonic: The "Pessimistic Path Planner"**
    Imagine you're planning a rescue mission through a canyon with multiple paths. Some paths have rickety bridges (`if` statements) that take longer to cross. The canyon loops back on itself (`for` loop). To guarantee you get there in time, you don't average the path times. You find the single **longest, most difficult path** through the canyon and assume you'll have to take it **every single time** you go through a loop. That's WCET: find the worst path and multiply by the maximum loop count.

2.  **Formulas to Overlearn:**
    *   **Sequence:** $WCET(S_1; S_2) = WCET(S_1) + WCET(S_2)$
    *   **Conditional:** $WCET(\text{if } C \text{ then } S_1 \text{ else } S_2) = WCET(C) + \max(WCET(S_1), WCET(S_2))$
    *   **Bounded Loop:** $WCET(\text{for } i=0 \text{ to } N) = \sum_{i=0}^{N-1} (WCET(\text{body}) + WCET(\text{loop control})) + WCET(\text{init}) + WCET(\text{exit check})$
    *   Often simplified to: $N \times WCET(\text{worst iteration})$

3.  **Spaced Repetition Schedule:**
    Review this material (especially the worked example and the formulas) at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:**
    If you forget everything, start here:
    a. Code is just a sequence of instructions.
    b. Some instructions are conditional (branches). This creates different *paths*.
    c. To find the *worst* case, I must find the *longest* path.
    d. How do I represent all paths? A graph (the CFG).
    e. How do I handle loops? A loop just repeats a subgraph. If the loop runs N times, the time is N times the longest path through that subgraph.

## Common mistakes
1.  **Using Profiling for Proof:** Running the code with many inputs and taking the maximum observed time is testing, not analysis. This can provide a useful estimate, but it is not a guarantee and will be rejected for safety-critical certification. The one input you didn't test could trigger the true worst-case path.
2.  **Ignoring Hardware Effects:** Simply summing datasheet instruction latencies is wrong. A `load` instruction's time is not constant; it depends on whether the data is in the L1 cache, L2 cache, or main memory. A safe, simple analysis must assume the worst for all such effects (e.g., always a cache miss).
3.  **Analyzing Unbounded Code:** Attempting to find the WCET of a function with `while(true)` or unbounded recursion. The WCET is infinite. The first step of analysis is always to ensure all loops and recursions have a provable, finite bound.
4.  **Miscalculating Loop Iterations:** For a loop `for(i=0; i<N; i++)`, the body executes `N` times, but the comparison `i<N` is executed `N+1` times (the last time it fails). Forgetting the cost of the final exit check is a common off-by-one timing error.

## Self-check
1.  Given that a `load` is 5 cycles, a `store` is 5 cycles, an `add` is 1 cycle, and a `branch` is 2 cycles, calculate the WCET of a function that swaps two integer values in an array: `void swap(int* a, int* b)`.
2.  A program has a nested loop: `for(i=0; i<10; i++) { for(j=i; j<10; j++) { ... } }`. If the inner loop body has a WCET of 25 cycles, what is the total WCET of the nested loop structure? (Ignore setup/control costs for this problem).
3.  A task performs a calculation that takes 500 cycles. It can be preempted by a high-priority interrupt service routine (ISR) that takes 100 cycles to execute. If the interrupt can occur at most twice during the execution of the task, what is the task's WCET? Explain your reasoning.