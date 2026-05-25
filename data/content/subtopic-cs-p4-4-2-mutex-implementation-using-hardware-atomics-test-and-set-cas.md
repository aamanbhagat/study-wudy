## What it is
A mutex (mutual exclusion object) is a synchronization primitive that ensures only one thread can execute a critical section of code at a time. Implementing a mutex with hardware atomics means using special CPU instructions, like `test-and-set` or `compare-and-swap` (CAS), that perform a multi-step memory operation (e.g., read-modify-write) as a single, indivisible step, preventing race conditions at the lowest level.

## Why it matters
Correct concurrency control is non-negotiable in high-reliability systems. In aerospace, flight control software runs on multi-core processors where multiple tasks (e.g., navigation, sensor fusion, actuator control) must share state without corruption. In machine learning, parallel training of large models requires multiple GPUs or CPUs to update shared model weights atomically, a process often guarded by locks built on these principles.

## When to study it
Before tackling this, you must have a solid grasp of concurrency fundamentals, specifically race conditions and the concept of a critical section. You should also understand the basic CPU instruction cycle (fetch-decode-execute) and why a simple software instruction like `x = x + 1` is not atomic, compiling down to separate `load`, `increment`, and `store` machine instructions. Familiarity with a software-only (but impractical) solution like Peterson's Algorithm provides useful context for why hardware support is necessary.

## How to study it (step by step)
1.  **Code a Race Condition:** Write a simple multi-threaded program where two threads increment a shared global counter without any locks. Run it and observe that the final value is incorrect and non-deterministic. This reinforces the problem you are about to solve.
2.  **Understand Atomicity:** Read your CPU's architecture manual (e.g., Intel SDM or ARM ARM) section on atomic instructions. You don't need to understand everything, just find the `LOCK` prefix (for x86) or instructions like `LDREX`/`STREX` (for ARM) and grasp that the hardware *guarantees* these operations are indivisible.
3.  **Implement a Spinlock with `test-and-set`:** Write pseudocode for a `lock` and `unlock` function using a `test-and-set` instruction. The key is that `lock` will loop (or "spin") until `test-and-set` returns the value indicating the lock was previously free.
4.  **Implement a Spinlock with `compare-and-swap`:** Repeat the previous step, but this time using `compare-and-swap`. The logic is slightly different: you loop, trying to swap the lock's state from `unlocked` to `locked`.
5.  **Analyze Busy-Waiting:** Analyze the CPU usage of your spinlock-protected program. You'll see it consumes 100% CPU while waiting. This builds the intuition for why spinlocks are for short-duration waits and motivates more advanced locks (which we will cover later) that yield the CPU.
6.  **Read a Real Implementation:** Look at the source code for a simple spinlock in an open-source kernel (e.g., a minimal educational kernel like xv6, or an early version of the Linux kernel). Compare the production code to your pseudocode.

## Key ideas, with intuition
1.  **The Read-Modify-Write Problem:** The fundamental issue in concurrency is that a logical operation often spans multiple hardware instructions.
    $$ \text{counter++} \implies \begin{cases} \text{mov eax, [counter]} & \text{(read)} \\ \text{inc eax} & \text{(modify)} \\ \text{mov [counter], eax} & \text{(write)} \end{cases} $$
    If a context switch occurs between these steps, another thread can read the stale value of `counter`, leading to a lost update. Hardware atomics fuse these three steps into one uninterruptible operation.

2.  **Test-and-Set (`TAS`):** Imagine a flag on a mailbox. `test-and-set` is like an atomic action where you check if the flag is down (value 0), and if it is, you raise it (set to 1) and report back "it was down". If it was already up (value 1), you just report back "it was up". You can't be interrupted halfway through.
    $$
    \text{boolean test\_and\_set(boolean *target)} \{ \\
    \quad \text{boolean old\_value = *target;} \\
    \quad \text{*target = TRUE;} \\
    \quad \text{return old\_value;} \\
    \}
    $$
    The entire body of this function is executed atomically by the hardware. A thread acquires the lock by calling `test_and_set` until it returns `FALSE`.

3.  **Compare-and-Swap (`CAS`):** This is a more powerful and general atomic. It's a conditional write. You tell the CPU: "Look at this memory address. If it contains value `A` (the expected value), then and only then, write value `B` (the new value) into it. Tell me if you succeeded."
    $$
    \text{boolean compare\_and\_swap(int *ptr, int expected, int new)} \{ \\
    \quad \text{if (*ptr == expected)} \{ \\
    \quad \quad \text{*ptr = new;} \\
    \quad \quad \text{return TRUE;} \\
    \quad \} \text{else} \{ \\
    \quad \quad \text{return FALSE;} \\
    \quad \} \\
    \}
    $$
    Again, the hardware guarantees this entire `if-then-else` block is atomic. This is the building block for most modern lock-free data structures, not just simple mutexes.

## Worked example
Let's implement a spinlock using `compare-and-swap`. The lock state will be an integer: `0` for unlocked, `1` for locked.

**State Declaration:**
`volatile int lock_state = 0;`
The `volatile` keyword prevents the compiler from making optimizations that would break the logic (e.g., caching the lock's value in a register).

**`lock()` Implementation:**
```c
void lock(volatile int *lock_state) {
    while (1) {
        // Attempt to swap the state from 0 (unlocked) to 1 (locked).
        // The compare_and_swap function is provided by the compiler/hardware.
        // In C11/C++, this is `atomic_compare_exchange_strong`.
        if (compare_and_swap(lock_state, 0, 1) == TRUE) {
            // We successfully acquired the lock.
            return;
        }
        // The lock was held by someone else (its value was not 0).
        // Loop and try again. This is the "spin" part of a spinlock.
    }
}
```

**`unlock()` Implementation:**
```c
void unlock(volatile int *lock_state) {
    // Unlocking is simple: just set the state back to 0.
    // This operation must be atomic itself, but a simple write
    // on most architectures is atomic for aligned integers.
    *lock_state = 0;
}
```

**Reflection:**
- The `lock()` function works because the `while` loop continues until the `CAS` operation succeeds. `CAS` will only succeed if it finds the `lock_state` is `0` (unlocked). The atomicity of `CAS` guarantees that only one thread can perform this `0 -> 1` transition at a time. If two threads call `lock()` simultaneously, the hardware's memory bus controller will serialize their `CAS` attempts; one will see `0` and succeed, and the second will see `1` and fail, forcing it to spin.
- The `unlock()` function is a simple write. It unconditionally sets the state back to `0`, allowing one of the spinning threads to finally succeed in its `CAS` operation and acquire the lock.

## Diagrams
Here is a timeline showing two threads, T1 and T2, contending for a lock using `test-and-set` (TAS). The lock state is initially `0` (unlocked).

```text
Time | T1 Action             | T2 Action             | Lock State
-----+-----------------------+-----------------------+------------
  1  |                       |                       |      0
  2  | TAS(&lock) -> ret 0   |                       |      1
  3  | Enters Crit. Section  |                       |      1
  4  | ...                   | TAS(&lock) -> ret 1   |      1
  5  | ...                   | (spins) TAS(&lock) -> ret 1 |      1
  6  | Exits Crit. Section   | (spins) TAS(&lock) -> ret 1 |      1
  7  | unlock() -> lock=0    | (spins) TAS(&lock) -> ret 1 |      0
  8  |                       | TAS(&lock) -> ret 0   |      1
  9  |                       | Enters Crit. Section  |      1
```

**Explanation:**
- At T2, T1 calls `test_and_set`. It reads the old value `0` and atomically writes `1`. It gets `0` back, so it breaks the loop and enters the critical section.
- At T4, T2 tries to acquire the lock. It calls `test_and_set`, which reads the old value `1` and writes `1`. T2 gets `1` back, so it continues spinning.
- At T7, T1 finishes and sets the lock back to `0`.
- At T8, T2's next `test_and_set` call finally reads the old value `0`, writes `1`, and gets `0` back, successfully acquiring the lock.

## Memory technique — remember this forever
1.  **The Story:** Think of a single, highly-coveted microphone on a stage.
    *   **`test-and-set`:** You walk up and grab the mic. The rule is you must *always* leave a "taken" sign in its place, an action that is part of the grab itself. You look at what you grabbed: if it was the mic, you're on. If it was a "taken" sign left by someone else, you step back and try to grab again later.
    *   **`compare-and-swap`:** You walk up and say to the stagehand, "If the mic is on the stand (expected state), please hand it to me and put this 'taken' sign in its place (new state)." If someone else already has it, the stagehand just shakes his head "no", and you have to ask again later.

2.  **Must Overlearn:** The pseudocode defines the behavior.
    *   `boolean test_and_set(boolean *target)`: Atomically sets `*target` to `TRUE` and returns its *original* value.
    *   `boolean compare_and_swap(T *ptr, T expected, T new)`: Atomically, if `*ptr == expected`, sets `*ptr = new` and returns `TRUE`, else returns `FALSE`.

3.  **Spaced Repetition Schedule:** Review these concepts and re-implement the spinlock from scratch at: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, start here:
    *   Problem: `read-modify-write` sequences on shared memory are not atomic.
    *   Why? The CPU can be interrupted between the `read` and the `write`.
    *   Solution: We need an instruction that the CPU guarantees is *not* interruptible.
    *   How? The CPU locks the memory bus for the duration of the operation, preventing any other core from accessing that memory location. This is what `test-and-set` and `CAS` are. From this, you can re-derive the logic for a spinlock.

## Common mistakes
1.  **Spinning on a Write:** A naive spinlock implementation calls `test_and_set` or `CAS` in a tight loop. Both are *write* operations. This causes the cache line containing the lock to be constantly invalidated across all CPU cores ("cache-line bouncing"), creating massive memory bus traffic and slowing everything down. A better approach is to spin reading the memory location until it appears free, and *then* attempt the expensive atomic `CAS` or `test_and_set`. This is called a "test-and-test-and-set" lock.
2.  **Misunderstanding Return Values:** A common bug is to misinterpret the return value of `test_and_set`. Remember, it returns the *old* value. You acquire the lock when it returns `FALSE` (or `0`), not `TRUE`.
3.  **Forgetting `volatile`:** The compiler is smart and will cache variables in registers. If you have `while (lock == 1) {}`, the compiler might read `lock` into a register once and then loop forever without re-reading from memory. `volatile` tells the compiler that this variable can be changed by another thread at any time, forcing a re-read from memory on every check.

## Self-check
1.  What is the fundamental difference between the sequence of machine instructions for `x++` and a single `test_and_set` instruction in terms of how the CPU and memory system handle them?
2.  Using only `test_and_set`, implement the `lock()` and `unlock()` functions for a spinlock. Explain why your `unlock()` implementation is correct and safe.
3.  `compare_and_swap` is known to be a "universal" atomic operation, meaning it can be used to implement any other atomic operation. Sketch out an implementation of `test_and_set` using only `compare_and_swap`. Could you do the reverse (implement `CAS` using only `test_and_set`)? Justify your answer.