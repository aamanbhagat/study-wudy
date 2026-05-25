## What it is
Concurrency is the execution of multiple instruction sequences at the same time. In C++, `std::thread` is the object that represents a single thread of execution. To prevent these threads from corrupting shared data, we use synchronization primitives like `std::mutex`, which ensures only one thread can access a resource at a time, and wrappers like `std::lock_guard` and `std::unique_lock` to manage the mutex safely and automatically.

## Why it matters
Modern CPUs have multiple cores; concurrency is how you exploit them for performance. In physics simulations, you can parallelize calculations for N-body interactions or finite element analysis across many threads. In machine learning, training a neural network involves parallelizing gradient calculations across batches of data. Aerospace systems rely on concurrency for real-time control, where separate threads might handle sensor input, navigation calculations, and actuator control simultaneously.

## When to study it
Before tackling this, you must have a firm grasp of C++ fundamentals. Specifically:
1.  **Functions and Callables:** `std::thread` takes a function or other callable object (like a lambda) to execute.
2.  **Object Lifetime and Scope:** The behavior of `std::lock_guard` and `std::unique_lock` depends entirely on their scope, as they perform their function in their constructor and destructor.
3.  **RAII (Resource Acquisition Is Initialization):** This is the single most important prerequisite. If you do not understand why objects tying resource management to their lifetime is the cornerstone of modern C++, the safety benefits of `lock_guard` will be lost on you.

If you are not confident with RAII, pause and review it. It is not optional.

## How to study it (step by step)
1.  **Launch your first thread:** Write a program that creates a single `std::thread` which executes a simple function that prints a message. In your `main` function, call the `.join()` method on the thread object. Observe that `main` waits for your new thread to finish before exiting.
2.  **Create a race condition:** Declare a global integer `counter = 0`. Create two threads. Have each thread execute a loop that increments the counter 1,000,000 times. After joining both threads, print the final value of `counter`. Run the program several times. Note that the result is not 2,000,000 and varies between runs. This is a race condition.
3.  **Fix it with a mutex:** Declare a global `std::mutex mtx`. In each thread's loop, call `mtx.lock()` before incrementing the counter and `mtx.unlock()` after. Rerun the program. The result will now be consistently 2,000,000, but you have introduced the risk of forgetting to call `unlock()`.
4.  **Fix it safely with `std::lock_guard`:** Replace the manual `mtx.lock()` and `mtx.unlock()` calls. Inside the loop, before the increment, create a `std::lock_guard<std::mutex> lock(mtx);`. The lock is acquired when `lock` is constructed and automatically released when it goes out of scope at the end of the loop iteration. This is the RAII pattern in action.
5.  **Explore `std::unique_lock`:** Repeat the exercise with `std::unique_lock<std::mutex> lock(mtx);`. For this simple case, it behaves identically to `lock_guard`. Then, read about its extra capabilities (e.g., deferred locking, movable ownership) and modify your code to use one, such as by constructing it with `std::defer_lock` and calling `.lock()` later.

## Key ideas, with intuition
1.  **Threads are separate paths of execution.** Imagine a program's code is a recipe. A single-threaded program has one chef following the recipe from start to finish. A multi-threaded program has multiple chefs working in the same kitchen on the same recipe. They can work on different steps simultaneously.

2.  **A race condition is chefs colliding.** Imagine two chefs need to read the amount of salt in a bowl, add a spoonful, and write down the new total.
    *   Chef A reads "10g".
    *   Chef B reads "10g".
    *   Chef A adds 5g and writes "15g".
    *   Chef B adds 5g and writes "15g".
    The final amount should be 20g, but because they read the value before the other was finished updating it, the result is wrong. The non-atomic sequence of `read-modify-write` is the core of the problem.

3.  **A `std::mutex` is a "talking stick" for data.** A mutex (MUTual EXclusion) is an object that acts like a key or a talking stick. To access the shared resource (the salt bowl), a chef (thread) must first acquire the mutex. While one chef holds it, all other chefs who want it must wait. When the first chef is done, they release the mutex, and one of the waiting chefs can acquire it.

4.  **`std::lock_guard` is a foolproof rule for the talking stick.** Manually calling `lock()` and `unlock()` is like remembering to pick up and put down the talking stick. But what if you get distracted and walk away with it? A `std::lock_guard` is a C++ construct that enforces a rule: "You automatically grab the stick when you enter this block of code, and you automatically put it back the instant you leave, no matter what." This is implemented via its constructor (which locks) and destructor (which unlocks). This RAII pattern makes it impossible to forget to unlock the mutex. `std::unique_lock` is a more flexible version of this rule, allowing you to temporarily give the stick back or pass it to someone else.

## Worked example
Let's implement a thread-safe function to deposit money into a shared bank account balance.

```cpp
#include <iostream>
#include <thread>
#include <vector>
#include <mutex>

// Shared resource
int balance = 0;

// Mutex to protect the shared resource
std::mutex mtx;

// Function executed by each thread
void deposit(int amount) {
    for (int i = 0; i < amount; ++i) {
        // The lock_guard acquires the mutex upon construction.
        // It guarantees the mutex is released when the guard goes
        // out of scope at the end of this block.
        std::lock_guard<std::mutex> lock(mtx);
        
        // Critical Section: Only one thread can execute this at a time.
        balance++;
    }
}

int main() {
    std::vector<std::thread> threads;
    const int num_threads = 10;
    const int deposits_per_thread = 100000;

    // Step 1: Create and launch 10 threads.
    // Each thread will try to deposit 100,000 (by incrementing balance).
    for (int i = 0; i < num_threads; ++i) {
        threads.emplace_back(deposit, deposits_per_thread);
    }

    // Step 2: Wait for all threads to complete their work.
    // This is crucial. main() must not exit before its children finish.
    for (auto& t : threads) {
        t.join();
    }

    // Step 3: Print the final result.
    // Expected: 10 threads * 100,000 deposits = 1,000,000
    std::cout << "Final balance: " << balance << std::endl;

    return 0;
}
```

### Reflection
1.  **`std::mutex mtx;`**: We defined a single mutex to protect our single shared resource, `balance`.
2.  **`std::lock_guard<std::mutex> lock(mtx);`**: This is the key line. When a thread's execution reaches this line, it attempts to lock `mtx`. If another thread already holds the lock, this thread will block (wait) until it's released. Once acquired, the `lock` object manages the mutex.
3.  **Scope `{...}`**: The critical section is just `balance++`. The `lock_guard` is created right before it and is destroyed right after, at the closing brace `}` of the `for` loop's body. This means we hold the lock for the shortest possible time, which is critical for performance.
4.  **`t.join()`**: By joining each thread, we ensure that the `main` thread pauses and waits for each worker thread to finish its execution before we proceed to print the final balance. Without this, `main` could finish and print a partial result while the other threads are still running.

## Diagrams
### Race Condition and Mutex Fix
This diagram shows two threads racing to update a shared variable, and how a mutex serializes their access.

```text
Thread 1:  ... run ... | read X | inc | write X | ... run ...
Time ->
Thread 2:  ... run ... |           | read X | inc | write X | ... run ...
                      ^           ^
                      Problem: T2 reads X before T1's write is complete.

With Mutex:
           [ Critical Section ]
Thread 1:  ... run ... | LOCK | r/w X | UNLOCK | ... run ...
Time ->
Thread 2:  ... run ... | wait... | wait... | LOCK | r/w X | UNLOCK | ...
                      ^                      ^
                      T2 must wait for       T2 proceeds after
                      T1 to release lock.    T1 unlocks.
```

### RAII with `std::lock_guard`
This diagram illustrates how the lifetime of the `lock_guard` object manages the mutex lock.

```text
void function() {
    // ... code ...
    { // <--- Scope of lock_guard begins
        std::lock_guard<std::mutex> guard(mtx); // Constructor called -> mtx.lock()
        
        // Critical section:
        // Access shared data here.
        // Mutex is held for the entire duration of this scope.
        
    } // <--- Scope ends, guard is destroyed. Destructor called -> mtx.unlock()
      // The unlock is AUTOMATIC, even if an exception is thrown inside the scope.
    // ... more code ...
}
```

## Memory technique — remember this forever
1.  **The Story:** Think of a shared resource as a high-security laboratory room with only one keycard (`std::mutex`). To enter, you need the keycard. A `std::lock_guard` is a robot assistant. You tell the robot "I need to go into the lab." The robot takes the keycard, swipes you in (`lock`), and waits. The moment you leave that section of the hallway (the scope `{}`), the robot takes the keycard back (`unlock`) and returns it to the rack. It *never* forgets. A `std::unique_lock` is a more advanced robot that you can also tell, "Hold this keycard, but don't use it yet," or "Give this keycard to that other robot."

2.  **Must Overlearn:**
    *   To create and wait for a thread: `std::thread t(func, args...); t.join();`
    *   To protect data with a mutex using RAII: `std::mutex mtx; std::lock_guard<std::mutex> lock(mtx);`
    *   The problem: A race condition occurs on non-atomic `read-modify-write` sequences.

3.  **Spaced Repetition Schedule:** Review this material and re-implement the worked example from scratch at **1 day, 3 days, 7 days, 16 days, and 35 days**.

4.  **First Principles Pathway:** If you forget `std::lock_guard`, how do you re-derive it?
    *   Start with the problem: I need to protect shared data.
    *   The basic tool is a mutex: `mtx.lock()` and `mtx.unlock()`.
    *   What's the danger? I might forget `mtx.unlock()`, especially if my function returns early or throws an exception. This would cause the lock to be held forever, freezing the program.
    *   How does C++ guarantee something is *always* executed when leaving a scope? A destructor.
    *   Therefore, I need a class whose constructor calls `mtx.lock()` and whose destructor calls `mtx.unlock()`. This is exactly what `std::lock_guard` is.

## Common mistakes
1.  **Forgetting to `join()` (or `detach()`).** If a `std::thread` object is destroyed before you have called either `.join()` (wait for it to finish) or `.detach()` (let it run independently), your program will terminate by calling `std::terminate`. This is the most common beginner error.
2.  **Passing arguments by reference incorrectly.** If you want a thread to operate on a variable by reference, you must wrap it in `std::ref()`. For example, `std::thread t(my_func, std::ref(my_variable));`. Otherwise, the argument is copied, and the thread modifies a local copy, not the original variable.
3.  **Locking too much.** A mutex serializes execution, negating the benefit of concurrency. Only lock the mutex for the absolute minimum critical section. Locking around an entire function that does I/O and other non-critical work will destroy your performance.
4.  **Deadlock.** Thread A locks mutex 1 and tries to lock mutex 2. Thread B locks mutex 2 and tries to lock mutex 1. Both threads will wait forever. The solution is to always lock mutexes in the same global order.

## Self-check
1.  Take a single-threaded program that sums the elements of a large `std::vector<int>`. Modify it to use two threads: one that sums the first half of the vector and another that sums the second half. The `main` thread should combine their results.
2.  Create a `ThreadSafeCounter` class. It should have a private integer member and a private `std::mutex`. Expose public methods `increment()`, `decrement()`, and `value()`, all of which use a `std::lock_guard` to protect access to the integer.
3.  What is the difference in flexibility between `std::lock_guard` and `std::unique_lock`? Write a short code example that is possible with `std::unique_lock` but not with `std::lock_guard`.