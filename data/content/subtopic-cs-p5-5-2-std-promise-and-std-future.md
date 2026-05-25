## What it is
`std::promise` and `std::future` are a pair of C++ template classes that create a one-time, one-way communication channel between threads. One thread can "promise" to provide a value at some point, and another thread can use a "future" object to retrieve that value once it is ready, blocking if necessary. This mechanism allows a thread to receive a result from an asynchronous operation.

## Why it matters
This pattern is the bedrock of modern asynchronous task-based parallelism, which is critical for performance in computationally intensive fields. In aerospace flight control, one thread can compute an optimal trajectory while the main control loop continues running; the main loop uses a future to get the new trajectory only when the computation is complete. In physics simulations, you can offload complex calculations like a Fast Fourier Transform to a worker pool, and the main simulation thread can retrieve the results via futures without stalling its other duties, such as logging or visualization updates.

## When to study it
You must have a solid understanding of C++ templates and basic multithreading with `std::thread`. Specifically, you should be comfortable with creating threads, passing arguments to them, and using `std::mutex` and `std::condition_variable` for basic synchronization. `std::promise` and `std::future` are a higher-level abstraction that handles the underlying mutex and condition variable logic for you in this specific producer-consumer pattern.

## How to study it (step by step)
1.  **Grasp the Analogy:** Think of ordering a coffee. You place the order and pay (creating the `std::promise`). The barista gives you a buzzer (the `std::future`). You are now free to do other things. When the coffee is ready, the barista presses a button (`promise::set_value`), your buzzer vibrates, and you go to the counter to pick up your coffee (`future::get`).
2.  **Write the Producer:** Create a simple C++ program. In `main`, instantiate `std::promise<int> p;`. Write a simple worker function `void compute(std::promise<int> p)` that takes the promise *by value*. Inside, make it sleep for 1 second, then call `p.set_value(42);`.
3.  **Write the Consumer:** In `main`, after creating the promise, get its associated future: `std::future<int> f = p.get_future();`. Then, create and launch a `std::thread`, passing your `compute` function and moving the promise into it: `std::thread t(compute, std::move(p));`.
4.  **Retrieve the Value:** After launching the thread, call `int result = f.get();`. Print the result. Observe that your main thread blocks on this line until the worker thread calls `set_value`. Finally, call `t.join();`.
5.  **Propagate an Exception:** Modify your `compute` function. Instead of `p.set_value(42);`, call `p.set_exception(std::make_exception_ptr(std::runtime_error("Calculation failed")));`. In `main`, wrap the `f.get();` call in a `try...catch` block to catch the `std::runtime_error`. This demonstrates how exceptions are safely transported between threads.

## Key ideas, with intuition
1.  **Asynchronous Return Value:** A `std::future<T>` is a placeholder for a value of type `T` that will be computed asynchronously. It decouples the function call from the result retrieval. You can launch a task and get a future immediately, do other work, and only when you absolutely need the result do you call `.get()`, which will then wait for the computation to finish.

2.  **The Shared State:** A `promise` and its `future` are linked by a hidden, shared state object on the heap.
    *   The `std::promise` is the "write" handle to this state. It's the only thing that can set the value or the exception.
    *   The `std::future` is the "read" handle. It can only wait for and retrieve the value/exception from the state.
    This shared state is what contains the synchronization primitives (mutexes and condition variables) that make the whole thing work.

3.  **Move-Only Semantics:** Both `std::promise` and `std::future` are move-only types. You cannot copy them. This enforces a clear ownership model: there is only one "promiser" and one "retriever" for any given asynchronous result. This prevents confusing scenarios where multiple threads might try to set the same value or get the same result. If you need multiple retrievers, you can use `std::shared_future`.

4.  **Exception Propagation:** This is a crucial feature. If an unhandled exception occurs in a thread, the program typically terminates. `promise`/`future` provides a structured way to capture an exception in the worker thread and re-throw it in the calling thread when `.get()` is called. This allows for centralized and predictable error handling in asynchronous code.

## Worked example
Let's calculate the dot product of two vectors in a separate thread.

```cpp
#include <iostream>
#include <vector>
#include <thread>
#include <future>
#include <numeric> // for std::inner_product

// Worker function: calculates dot product and fulfills the promise
void dot_product_worker(std::promise<long long> promise, 
                        std::vector<int> v1, 
                        std::vector<int> v2) 
{
    try {
        if (v1.size() != v2.size()) {
            throw std::runtime_error("Vectors must have the same size.");
        }
        long long result = std::inner_product(v1.begin(), v1.end(), v2.begin(), 0LL);
        promise.set_value(result); // Fulfill the promise with the result
    } catch (...) {
        promise.set_exception(std::current_exception()); // Fulfill with an exception
    }
}

int main() {
    // 1. Setup: Create vectors and the promise/future pair.
    std::vector<int> vec1 = {1, 2, 3, 4};
    std::vector<int> vec2 = {5, 6, 7, 8};
    std::promise<long long> dot_promise;
    std::future<long long> dot_future = dot_promise.get_future();

    // 2. Launch: Create a thread, moving the promise and vectors into it.
    //    Note: std::promise is move-only.
    std::thread worker(dot_product_worker, std::move(dot_promise), vec1, vec2);

    // 3. Do other work: The main thread is free to do other tasks.
    std::cout << "Main thread is doing other work while dot product is being calculated..." << std::endl;

    // 4. Retrieve: Call .get() to get the result. This blocks until the worker is done.
    try {
        long long result = dot_future.get();
        std::cout << "Dot product result is: " << result << std::endl;
    } catch (const std::exception& e) {
        std::cout << "An exception was caught: " << e.what() << std::endl;
    }

    // 5. Cleanup: Join the thread.
    worker.join();

    return 0;
}
```

### Reflection
1.  **Setup:** We create the `promise` first, then get the `future` from it. This establishes the two ends of our communication channel before the worker thread even exists.
2.  **Launch:** We must use `std::move` to transfer ownership of the `promise` to the new thread. The worker function now owns the "write" end of the channel.
3.  **Do other work:** This step is key. If we immediately called `.get()`, we would gain no concurrency. The point is to allow independent tasks to execute in parallel.
4.  **Retrieve:** The `try...catch` block around `.get()` is essential for robust code. It handles both the successful return of a value and the propagation of an exception from the worker thread.
5.  **Cleanup:** As with any `std::thread`, we must `join()` it to ensure it has completed before `main` exits.

## Diagrams
Here is a timeline of the execution flow:

```text
       Thread 1 (main)                        Thread 2 (worker)
           |
 std::promise<T> p;                             |
 std::future<T> f = p.get_future();             |
           |                                    |
 std::thread t(worker, std::move(p)); ---------> | starts
           |                                    |
   (does other work)                      (computes value)
           |                                    |
           |                                p.set_value(result);
           |                                    |
 f.get(); // BLOCKS ----------------------------/ UNBLOCKS
           |
 (uses result)
           |
 t.join(); <---------------------------------- (thread finishes)
           |
```

And the object relationship:

```text
+-------------------+      (owns write handle)      +---------------+
| std::promise<T>   | ----------------------------> |               |
| object in Thread 2|                               |  Shared State | <---------------------------- (owns read handle) +------------------+
+-------------------+                               | (on heap)     |                                                  | std::future<T>   |
                                                    |               |                                                  | object in Thread 1|
                                                    +---------------+                                                  +------------------+
                                                        ^
                                                        |
                                            (contains value/exception
                                             and sync primitives)
```

## Memory technique — remember this forever
1.  **The Mnemonic Story: "The Inter-Office Memo"**
    Imagine you're a manager (main thread) who needs a report. You write a request on a special form, tear off the perforated receipt, and put the main form in an outbox. This form is the **Promise**. The receipt you keep is the **Future**.
    A junior analyst (worker thread) picks up the form. They do the work. When finished, they fill in the report details on the form (`set_value`). If they fail, they write "FAILED" across it (`set_exception`).
    Later, you need the report. You look at your receipt (`future`). If the report is done, you can read it (`get`). If you check too early, you just have to wait. The receipt itself proves the request was made and guarantees you'll eventually get a result or a failure notice.

2.  **Must-Overlearn Formulas/Code Snippets:**
    ```cpp
    // 1. Create the channel
    std::promise<T> p;
    std::future<T> f = p.get_future();

    // 2. Fulfill the promise (in producer thread)
    p.set_value(value_of_type_T);

    // 3. Get the result (in consumer thread)
    T result = f.get(); // Blocks until value is set
    ```

3.  **Spaced Repetition Schedule:**
    *   Review this lesson in **1 day**. Re-implement the dot product example from memory.
    *   Review in **3 days**. Implement a function that finds the maximum element in a vector in a worker thread.
    *   Review in **7 days**. Explain the "Inter-Office Memo" analogy to a rubber duck.
    *   Review in **16 days**. Re-read the "Common Mistakes" section.
    *   Review in **35 days**. Write a program that launches two workers, each producing a result, and sum their results in the main thread.

4.  **First Principles Pathway:** If you forget the syntax, rebuild from the problem. The goal is to get a result from a thread `T2` back to a thread `T1`. Without `promise`/`future`, you would need a shared variable for the result, a `std::mutex` to protect it, and a `std::condition_variable` for `T1` to wait on. `T2` would lock the mutex, write the result, and call `notify_one`. `T1` would lock the mutex and `wait`. `std::promise` and `std::future` are simply the standard library's clean, RAII-compliant encapsulation of this exact pattern.

## Common mistakes
1.  **Calling `.get()` more than once:** `std::future::get()` invalidates the future. Calling it a second time will throw a `std::future_error`. If you need multiple threads to see the result, use `std::shared_future`, which you can get from a `std::future` via `fut.share()`.
2.  **Destroying the `std::promise` without fulfilling it:** If the `std::promise` object goes out of scope in the worker thread before `set_value` or `set_exception` is called, the waiting `future.get()` will unblock and throw a `std::future_error` with the error code `broken_promise`. Always ensure every code path in the worker fulfills the promise.
3.  **Forgetting `std::move`:** `std::promise` is not copyable. When passing it to a thread's constructor or another function, you must explicitly transfer ownership with `std::move(my_promise)`. The compiler will give you an error if you forget, but understanding *why* (unique ownership) is key.

## Self-check
1.  Write a program where a worker thread computes the 20th Fibonacci number and sends it back to the main thread using a `std::promise<int>`.
2.  Modify the program above. The worker function should take an integer `n` as an argument. If `n` is negative, the worker should set an exception on the promise instead of computing a value. The main thread must handle this case.
3.  Create a `std::vector<std::thread>` and a corresponding `std::vector<std::future<int>>`. Launch 10 threads. Each thread `i` should calculate `i * i` and return it via its own promise. The main thread should wait for all calculations to complete and then print the sum of all the results.