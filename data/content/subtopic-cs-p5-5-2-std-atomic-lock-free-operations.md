## What it is
`std::atomic` is a C++ template class that provides types and operations ensuring that reads and writes to a variable are *atomic*. An atomic operation is indivisible: it completes in its entirety without any other thread observing it in a partially-complete state, thus preventing data races without requiring traditional locks like mutexes.

## Why it matters
In high-performance computing, locks create contention and can serialize execution, becoming bottlenecks. Lock-free operations using `std::atomic` are critical for performance in parallel systems. In aerospace flight software, you might use atomics for high-frequency sensor data fusion or for managing state flags in real-time control loops where the overhead of a lock is unacceptable. In physics simulations, millions of particles or grid cells might be updated concurrently; atomic counters or accumulators are vastly more efficient than locks for aggregating results.

## When to study it
You must have a solid grasp of the following before tackling `std::atomic`:
1.  **C++ Fundamentals:** Templates, classes, and basic syntax.
2.  **Concurrency Primitives:** You must understand `std::thread`, `std::mutex`, and `std::lock_guard`. You need to have personally written code that exhibits a race condition and then fixed it with a mutex to appreciate the problem `std::atomic` solves.
3.  **Computer Architecture Basics:** A mental model of how CPUs, caches (L1/L2/L3), and main memory interact. Understanding that each core has its own cache is fundamental to seeing why memory visibility is an issue.

If you are not comfortable with these, pause and review them. Using `std::atomic` without understanding the underlying problem of memory consistency is dangerous.

## How to study it (step by step)
1.  **Write a broken program.** Create a simple program that spawns 10 threads, each incrementing a global `long long counter` 1,000,000 times. Print the final result. Observe that it is incorrect and inconsistent across runs due to race conditions.
2.  **Fix it with a lock.** Add a `std::mutex` to protect the counter. Verify that the program now produces the correct result (10,000,000). Use a timer to measure its execution time.
3.  **Fix it with `std::atomic`.** Replace the `long long` and `std::mutex` with a single `std::atomic<long long>`. Use the `fetch_add()` member function for the increment. Verify correctness and compare the execution time to the mutex version. It should be significantly faster.
4.  **Explore memory ordering.** Read about `std::memory_order`. Modify your atomic counter to use `std::memory_order_relaxed` for its `fetch_add()` operation: `counter.fetch_add(1, std::memory_order_relaxed)`. Observe the performance difference (it may be small on x86 but is conceptually important).
5.  **Implement a spinlock.** Use `std::atomic_flag`, the simplest atomic type, to build your own spinlock. This is a lock that busy-waits. The `test_and_set()` operation is the key here. This will solidify your understanding of how atomics can be used to build other synchronization primitives.

## Key ideas, with intuition
1.  **Atomicity as Uninterruptibility:** The core idea is that a sequence of machine instructions (e.g., read-modify-write) is executed as a single, indivisible unit. Imagine two people, A and B, trying to update a number on a whiteboard from 5 to 6.
    *   **Non-atomic:** A reads 5. B reads 5. A erases 5 and writes 6. B erases 6 and writes 6. The result is 6, but it should be 7.
    *   **Atomic:** A is given an exclusive "token" for the whiteboard. A reads 5, erases it, and writes 6. Only then is B allowed to approach. B reads 6, erases it, and writes 7. The result is correct. `std::atomic` asks the hardware to provide this "token" mechanism.

2.  **Memory Ordering as Rules for Reordering:** Compilers and CPUs reorder instructions to improve performance. Memory ordering constraints tell them which reorderings are forbidden.
    *   `std::memory_order_seq_cst` (Sequential Consistency): The default and strictest. No reordering of atomic operations is allowed across threads. All threads see all atomic operations in the same global order. This is easy to reason about but can be slow.
    *   `std::memory_order_acquire` / `std::memory_order_release`: A pair used for synchronization. An `acquire` operation ensures that no memory reads/writes are moved *before* it. A `release` operation ensures no memory reads/writes are moved *after* it. This creates a one-way barrier, synchronizing memory *between* the thread doing the release and the thread doing the acquire.
    *   `std::memory_order_relaxed`: The loosest. No ordering guarantees. The only guarantee is atomicity of the operation itself. Good for simple counters where you only care about the final value, not the state at any intermediate point.

3.  **Compare-And-Swap (CAS) as the Universal Primitive:** Most complex lock-free algorithms are built on a CAS loop. The operation `compare_exchange_strong(expected, desired)` does this:
    $$
    \text{atomic\_CAS}(\text{address}, \text{expected}, \text{desired}) \rightarrow \text{bool}
    $$
    It checks if the value at `address` is equal to `expected`. If it is, it atomically swaps it with `desired` and returns `true`. If not, it does nothing but update `expected` with the current value and returns `false`. You use it in a loop: optimistically compute a new state, then try to commit it with CAS. If CAS fails, it means another thread changed the state, so you loop and try again with the new value.

## Worked example
Let's implement a thread-safe "maximum" tracker. Multiple threads will report values, and we want to track the maximum value seen so far.

**The Problem:**
A naive implementation would be:
```cpp
// THIS IS BROKEN
#include <iostream>
#include <vector>
#include <thread>
#include <algorithm>

int max_val = 0;

void update_max(int x) {
    if (x > max_val) {
        max_val = x; // RACE CONDITION HERE
    }
}
```
The read (`if (x > max_val)`) and the write (`max_val = x`) are two separate operations. Two threads could both read `max_val`, both find their `x` is larger, and then one's write will be overwritten by the other.

**The `std::atomic` Solution:**
```cpp
#include <iostream>
#include <vector>
#include <thread>
#include <atomic>
#include <algorithm>

std::atomic<int> atomic_max_val{0};

void update_max_atomic(int x) {
    int current_max = atomic_max_val.load(std::memory_order_relaxed);
    while (x > current_max) {
        // Try to swap current_max with x.
        // If another thread updated atomic_max_val in the meantime,
        // compare_exchange_weak will fail, update our local current_max,
        // and we'll loop to try again.
        if (atomic_max_val.compare_exchange_weak(current_max, x, 
                                                std::memory_order_release,
                                                std::memory_order_relaxed)) {
            break; // Success, we updated the max value
        }
        // If we're here, the CAS failed. current_max was updated with the
        // new value from atomic_max_val, so the loop condition x > current_max
        // will be re-evaluated.
    }
}

int main() {
    std::vector<std::thread> threads;
    for (int i = 0; i < 10; ++i) {
        threads.emplace_back([i]() {
            for (int j = 0; j < 1000; ++j) {
                update_max_atomic(i * 1000 + j);
            }
        });
    }

    for (auto& t : threads) {
        t.join();
    }

    // The max value passed was 9*1000 + 999 = 9999
    std::cout << "Final max value: " << atomic_max_val << std::endl;
    return 0;
}
```
**Reflection:**
1.  **Initialization:** `std::atomic<int> atomic_max_val{0};` creates the atomic variable.
2.  **The Loop:** The `while` loop implements the CAS pattern. We first load the current max value (`current_max`).
3.  **Optimistic Update:** We then try to atomically replace `current_max` with our new value `x` *only if* the shared value hasn't changed since we read it.
4.  **Failure and Retry:** `compare_exchange_weak` is the key. If it fails, it means another thread "won the race" and updated the maximum. The function helpfully loads the *new* true maximum into our `current_max` variable, so our loop can immediately retry with up-to-date information. This is far more efficient than locking.

## Diagrams
A race condition on a simple increment operation (`counter++`).

```text
       Thread A                       Thread B
          |                              |
(1) Read counter (value=5)               |
          |                              |
          |                  (2) Read counter (value=5)
          |                              |
(3) Calculate new value (5+1=6)          |
          |                              |
          |                  (4) Calculate new value (5+1=6)
          |                              |
(5) Write 6 to counter                   |
          |                              |
          |                  (6) Write 6 to counter
          |                              |
          V                              V
     Time          Final value is 6. WRONG.
```

An atomic increment operation (`counter.fetch_add(1)`).

```text
       Thread A                       Thread B
          |                              |
(1) Atomically execute                 |
    Read-Modify-Write cycle.           |
    Hardware locks memory bus.         |
    Reads 5, writes 6.                 |
    Unlocks bus.                       |
          |                              |
          |                  (2) Atomically execute
          |                      Read-Modify-Write cycle.
          |                      Waits for bus lock.
          |                      Acquires lock.
          |                      Reads 6, writes 7.
          |                      Unlocks bus.
          |                              |
          V                              V
     Time          Final value is 7. CORRECT.
```

## Memory technique — remember this forever
1.  **The Story:** Think of `std::atomic` as a librarian at a single, sacred podium (the memory location). Only one person (thread) can be at the podium at a time. A normal variable is a free-for-all table where everyone grabs and writes at once. The `compare_exchange_strong` operation is like saying to the librarian: "I believe the book on the podium is version 5. If it is, please replace it with my version 6. If it's not version 5, just tell me what version it is so I can go back to my desk and revise my work."

2.  **Must Overlearn:**
    *   Declaration: `std::atomic<T> var;`
    *   Simple modification: `var.fetch_add(1);` or `var.store(value);`
    *   The CAS loop is the fundamental pattern for complex updates:
        ```cpp
        T expected = var.load();
        T desired;
        do {
            desired = compute_new_value_from(expected);
        } while (!var.compare_exchange_weak(expected, desired));
        ```

3.  **Spaced Repetition Schedule:** Review this lesson and your own code examples at **1 day, 3 days, 7 days, 16 days, 35 days**. Actively rewrite the CAS loop from memory each time.

4.  **First Principles Pathway:** If you forget everything, start from the problem: a race condition. A race happens because a Read-Modify-Write sequence is not indivisible. How can the CPU make it indivisible? It needs a special instruction that tells the memory subsystem, "Do not let anyone else touch this memory location until I am done with this entire sequence." That instruction is what `std::atomic` compiles down to (e.g., `LOCK XADD` or `LOCK CMPXCHG` on x86). The entire concept of lock-free programming flows from having access to such hardware primitives.

## Common mistakes
1.  **Mixing Atomic and Non-Atomic Access:** Reading from `std::atomic<int> x` with `x.load()` and then writing to it with a plain C++ assignment (`x = 5;`) is a recipe for disaster. All access to a variable intended to be atomic must go through the `std::atomic` API.
2.  **Assuming `a++; b++;` is Atomic:** If `a` and `b` are both `std::atomic`, this line performs two separate atomic operations. The sequence of the two operations is not atomic. Another thread could observe the state where `a` is incremented but `b` is not.
3.  **Using `memory_order_relaxed` Carelessly:** Using `relaxed` breaks the intuitive sequential ordering of events between threads. It's only safe when you are sure you don't need to synchronize other memory access. A common bug is using it to synchronize a flag that protects data, but the data itself is not synchronized because the memory order is too weak.
4.  **Forgetting `is_lock_free()`:** On some obscure platforms or for very large types, `std::atomic<T>` might be implemented using an internal mutex. Always call `var.is_lock_free()` if you absolutely require a lock-free implementation for performance.

## Self-check
1.  A global `bool shutdown_flag = false;` is used by multiple threads to know when to exit their main loop. Currently, it is protected by a `std::mutex`. Rewrite this logic to use a `std::atomic<bool>` without any mutexes.
2.  Consider a singly-linked list used as a stack. The `head` pointer points to the top of the stack. Write a thread-safe `push` function that adds a new node to the top of the stack using `std::atomic<Node*>` for the `head` and a CAS loop. Do not use a mutex.
3.  Explain why `compare_exchange_weak` is permitted to fail "spuriously" (i.e., return `false` even if the value was not changed by another thread). Why would you ever use it over `compare_exchange_strong`, which does not have this behavior?