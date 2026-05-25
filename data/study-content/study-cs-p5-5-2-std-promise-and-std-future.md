## 1. What it is — in plain English

Imagine you've ordered a custom-made cake from a baker. You don't want to stand in the bakery watching them mix ingredients and bake. You just want to know when it's ready so you can pick it up.

In this scenario, `std::promise` is like the baker making a promise: "I promise to give you a cake later." The baker is the one doing the work and will eventually produce the result (the cake).

`std::future` is like the receipt or ticket you get when you place your order. This ticket doesn't *contain* the cake, but it's your guarantee that you *will* get it. You can check the ticket later to see if the cake is ready, and then use it to claim your cake.

So, `std::promise` and `std::future` in C++ are a way for different parts of your program, especially those running at the same time (like in different threads), to communicate a single result. One part "promises" to provide a value (or an error) later, and another part can "wait for" and "retrieve" that value using a "future" ticket. It allows tasks to run independently without constantly checking on each other.

## 2. Why it matters — real-world applications

`std::promise` and `std::future` are fundamental building blocks for efficient, concurrent programming. They are crucial whenever you need to perform a task in the background and retrieve its result later without blocking the main flow of your program.

1.  **High-Performance Computing & Scientific Simulations**: In fields like aerospace engineering (e.g., simulating airflow over a wing) or computational physics (e.g., N-body simulations), complex calculations are often broken down into smaller, independent tasks. Each task can be run on a separate CPU core or thread. A `std::promise` can be used by these worker threads to signal the completion of their calculation and provide their partial result. The main thread, holding `std::future` objects for each task, can then collect these results as they become available and combine them for the final solution, significantly speeding up the overall simulation time.

2.  **Game Development**: Modern games require smooth frame rates while simultaneously loading assets (textures, 3D models, audio), performing AI calculations, and managing physics. When a player enters a new area, the game might initiate background loading of assets using a separate thread. A `std::promise` in the loading thread would signal when an asset is fully loaded, and a `std::future` in the rendering thread would allow it to safely access and display the asset once it's ready, preventing stuttering or freezing during gameplay.

3.  **Machine Learning & Data Processing**: Training large machine learning models often involves processing vast datasets. Data preprocessing steps (e.g., feature extraction, normalization) or even parts of the model training (e.g., gradient computation for different batches) can be parallelized. A `std::promise` can be used by worker threads to return processed data chunks or computed gradients. The main thread, through `std::future`s, can collect these results to update model weights or aggregate final statistics, enabling faster model training and inference.

4.  **Web Servers and API Backends**: A web server might receive a request that requires a long-running database query or an external API call. Instead of making the client wait synchronously, the server can offload this task to a separate thread using `std::promise` (often implicitly via `std::async`). The main request handling thread can then return an immediate response to the client (e.g., "processing your request") and use the `std::future` to retrieve the actual result later, perhaps to update another service or send a notification.

## 3. Prerequisites — what you must know first

Before diving deep into `std::promise` and `std::future`, a solid understanding of the following C++ concepts is essential:

*   **Multithreading Basics**: What a thread is, how to create and manage them (`std::thread`), and the concept of concurrent execution.
*   **Concurrency vs. Parallelism**: The distinction between managing multiple tasks (concurrency) and executing them simultaneously (parallelism).
*   **Lambda Expressions**: Anonymous functions, frequently used to define the tasks that run in separate threads or with `std::async`.
*   **Move Semantics**: `std::promise` and `std::future` are *move-only* types. Understanding `std::move` and how ownership is transferred is critical to using them correctly.
*   **Exception Handling**: `std::promise` can store and propagate exceptions across thread boundaries, so familiarity with `try-catch` blocks and `std::exception_ptr` is important.
*   **Templates**: `std::promise` and `std::future` are templated classes (e.g., `std::promise<int>`, `std::future<std::string>`), parameterized by the type of the value they will handle.
*   **`std::mutex` and `std::condition_variable` (Conceptual)**: While `std::promise`/`std::future` abstract away direct usage of these, knowing their purpose helps understand the underlying synchronization mechanisms that enable waiting and notification.

## 4. The core idea — step by step

Let's break down the fundamental concepts of `std::promise` and `std::future` piece by piece, building intuition along the way.

### Step 1: The "Promise"

*   **Plain-English Statement**: A `std::promise` is like making a vow to deliver a specific type of result sometime in the future. It's the "sender" side of a one-time communication channel.
*   **Small Concrete Example**:
    ```cpp
    #include <future> // Include for std::promise

    // I promise to give you an integer later.
    std::promise<int> my_int_promise;

    // I promise to give you a string later.
    std::promise<std::string> my_string_promise;
    ```
*   **Formal/Mathematical Version**: A `std::promise<T>` object is an object that can store a value of type `T` (or an exception) that will be made available to one or more `std::future` objects. It provides methods like `set_value(T val)` and `set_exception(std::exception_ptr ex)` to fulfill its promise.
*   **What Could Go Wrong**: If you create a `std::promise` but then destroy it without ever calling `set_value()` or `set_exception()`, the associated `std::future` will later report a "broken promise" error. This is because the promised result was never delivered.

### Step 2: The "Future"

*   **Plain-English Statement**: A `std::future` is your ticket or receipt to claim the promised result when it becomes available. It's the "receiver" side of the communication channel.
*   **Small Concrete Example**:
    ```cpp
    #include <future>

    std::promise<int> p;
    // Get the ticket (future) associated with this promise.
    std::future<int> f = p.get_future();
    // 'f' now represents the future result that 'p' promised.
    ```
*   **Formal/Mathematical Version**: A `std::future<T>` object is an object that can retrieve a value of type `T` (or an exception) that has been stored by a `std::promise<T>` object. It provides a `get()` method to retrieve the result, potentially blocking until the result is ready.
*   **What Could Go Wrong**: A `std::promise` can only be associated with *one* `std::future`. Calling `get_future()` more than once on the same `std::promise` object will throw a `std::future_error`.

### Step 3: Connecting Promise and Future (The Shared State)

*   **Plain-English Statement**: The `std::promise` and `std::future` aren't directly connected; they both refer to an invisible "shared state" in the background. Think of it as a special mailbox: the promise puts mail in, and the future picks mail out.
*   **Small Concrete Example**:
    ```cpp
    #include <future>
    // These two lines implicitly create and link to a shared state.
    std::promise<double> p_val;
    std::future<double> f_val = p_val.get_future();
    // The shared state now exists and is managed by 'p_val' and 'f_val'.
    ```
*   **Formal/Mathematical Version**: `std::promise` and `std::future` objects are associated through an internal *shared state*. This shared state is an object managed by the C++ runtime. The `std::promise` writes to this shared state, and the `std::future` reads from it. The shared state also contains a "ready" flag, indicating whether the promised value (or exception) has been stored.
*   **What Could Go Wrong**: If either the `std::promise` or `std::future` is destroyed prematurely, the shared state might become invalid, leading to `std::future_error` on the remaining object.

### Step 4: Fulfilling the Promise

*   **Plain-English Statement**: This is when the "baker" finishes the cake and puts it on the counter, marking your ticket as "ready." The promise delivers its vowed result.
*   **Small Concrete Example**:
    ```cpp
    #include <future>
    #include <stdexcept> // For std::runtime_error
    #include <iostream>

    std::promise<int> p;
    std::future<int> f = p.get_future();

    // Option 1: Fulfill with a value
    p.set_value(42); // The promise is fulfilled with the integer 42.

    // Option 2: Fulfill with an exception (if something went wrong)
    // std::promise<std::string> p_err;
    // std::future<std::string> f_err = p_err.get_future();
    // p_err.set_exception(std::make_exception_ptr(std::runtime_error("Oops!")));
    ```
*   **Formal/Mathematical Version**: The `std::promise` object fulfills its promise by either calling `p.set_value(T val)` to store a value `val` of type `T` into the shared state, or by calling `p.set_exception(std::exception_ptr ex)` to store an exception pointer `ex` into the shared state. This action atomically sets the "ready" flag in the shared state, notifying any waiting `std::future` objects.
*   **What Could Go Wrong**: Calling `set_value()` or `set_exception()` more than once on the same `std::promise` object results in undefined behavior (which often means a program crash). A promise can only be fulfilled once.

### Step 5: Retrieving the Future's Value

*   **Plain-English Statement**: This is when you, with your ticket, go to the counter and pick up your cake. If the cake isn't ready yet, you wait there until it is.
*   **Small Concrete Example**:
    ```cpp
    #include <future>
    #include <iostream>

    std::promise<int> p;
    std::future<int> f = p.get_future();

    // In a separate thread (or later in the same thread):
    // p.set_value(100);

    // This line will block if the promise hasn't been fulfilled yet.
    // Once fulfilled, it retrieves the value (100 in this case).
    int result = f.get();
    std::cout << "Retrieved: " << result << std::endl; // Output: Retrieved: 100
    ```
*   **Formal/Mathematical Version**: The `std::future` object retrieves the value (or rethrows the exception) from the shared state by calling its `f.get()` method. If the shared state is not yet ready, `f.get()` blocks the calling thread until it becomes ready. Once `get()` is called, the value is *moved* out of the shared state, and subsequent calls to `get()` on the same `std::future` will result in undefined behavior. If an exception was stored, `get()` rethrows that exception.
*   **What Could Go Wrong**: Calling `get()` more than once on the same `std::future` is undefined behavior. If the `std::promise` was destroyed without fulfilling its promise (a "broken promise"), `f.get()` will throw a `std::future_error` with `broken_promise`.

### Step 6: Asynchronous Operations with `std::async`

*   **Plain-English Statement**: While `std::promise` and `std::future` give you fine-grained control, `std::async` is a convenient shortcut. It automatically sets up a promise, runs a function (potentially in a new thread), and gives you back a future, all in one go. You don't have to manually manage `std::promise` and `std::thread`.
*   **Small Concrete Example**:
    ```cpp
    #include <future> // Includes std::async and std::future
    #include <iostream>

    int calculate_sum(int a, int b) {
        return a + b;
    }

    int main() {
        // Launch calculate_sum asynchronously.
        // std::async implicitly handles the promise/future setup.
        std::future<int> sum_future = std::async(calculate_sum, 10, 20);

        // Main thread can do other things...
        std::cout << "Main thread doing other work." << std::endl;

        // Get the result when ready.
        int result = sum_future.get();
        std::cout << "Sum is: " << result << std::endl; // Output: Sum is: 30
        return 0;
    }
    ```
*   **Formal/Mathematical Version**: `std::async` is a function template that executes a callable object `f` with arguments `args...` asynchronously. It returns a `std::future` object that will eventually hold the result of `f(args...)`. The execution policy (e.g., `std::launch::async` for guaranteed new thread, `std::launch::deferred` for lazy execution on `get()`) determines how and when the callable is run. `std::async` internally uses mechanisms similar to `std::promise` and `std::future` to manage the result and synchronization.
*   **What Could Go Wrong**: The default launch policy for `std::async` (`std::launch::deferred | std::launch::async`) can sometimes lead to the task being executed on the calling thread when `get()` is invoked, rather than on a new thread. If you absolutely need parallel execution, always specify `std::launch::async`.

## 5. Worked examples — multiple, with every step shown

### Example 1: Basic Value Transfer between Threads

**Problem**: Create a worker thread that computes the square of an integer and communicates this result back to the main thread using `std::promise` and `std::future`.

**Given**: An integer `x = 7`.

**Wanted**: The square of `x` (which is 49) to be printed by the main thread.

```cpp
#include <iostream>  // For std::cout, std::endl
#include <thread>    // For std::thread
#include <future>    // For std::promise and std::future

// Function to be executed in the worker thread
void calculate_square(std::promise<int>&& p, int value) {
    // Step 1: Perform the computation inside the worker thread.
    // We calculate the square of the input 'value'.
    int result = value * value;
    // result = 7 * 7 = 49

    // Step 2: Fulfill the promise with the computed value.
    // The 'set_value' method stores 'result' into the shared state
    // that is linked to the std::future object in the main thread.
    // This also marks the shared state as "ready".
    p.set_value(result);
}

int main() {
    // 1. Create a std::promise object.
    //    This object is responsible for "promising" a result of type 'int'.
    std::promise<int> promise_obj;

    // 2. Get the std::future object associated with the promise.
    //    This 'future_obj' is what the main thread will use to retrieve the result.
    //    It is now linked to the 'promise_obj' via an internal shared state.
    std::future<int> future_obj = promise_obj.get_future();

    // 3. Create a new worker thread.
    //    We pass the 'calculate_square' function, and then its arguments.
    //    'std::promise' is a move-only type, so we use 'std::move' to transfer
    //    ownership of 'promise_obj' to the worker thread.
    //    'value' (7) is passed by copy.
    std::thread worker_thread(calculate_square, std::move(promise_obj), 7);

    // 4. In the main thread, wait for and retrieve the result from the future.
    //    The 'get()' method blocks the main thread's execution here until
    //    the 'promise_obj' (now owned by 'worker_thread') has been fulfilled
    //    (i.e., 'set_value' or 'set_exception' has been called).
    //    Once ready, 'get()' retrieves the stored value (49) and moves it out.
    int square_result = future_obj.get();

    // 5. Print the retrieved result.
    std::cout << "The square is: " << square_result << std::endl;
    // Output: The square is: 49

    // 6. Join the worker thread.
    //    It's good practice to join threads to ensure they complete their execution
    //    before the main thread exits, preventing resource leaks or crashes.
    worker_thread.join();

    // Final Answer:
    // The square is: 49
    //
    // Reflection: This example clearly shows the producer-consumer pattern.
    // The worker thread is the producer, calculating and setting the value.
    // The main thread is the consumer, waiting for and getting the value.
    // The trickiest part for beginners is often remembering that `std::promise`
    // is move-only and must be explicitly moved into the thread function.
    return 0;
}
```

### Example 2: Handling Exceptions Across Threads

**Problem**: Implement a division function in a worker thread. If a division-by-zero error occurs, propagate this exception to the main thread using `std::promise` and `std::future`.

**Given**: `numerator = 20.0`, `denominator = 0.0`.

**Wanted**: The main thread to catch a `std::runtime_error` with a specific message.

```cpp
#include <iostream>    // For std::cout, std::endl
#include <thread>      // For std::thread
#include <future>      // For std::promise and std::future
#include <stdexcept>   // For std::runtime_error

// Function to perform division in a worker thread
void divide_and_set(std::promise<double>&& p, double num, double den) {
    try {
        // Step 1: Check for the error condition (division by zero).
        if (den == 0) {
            // Step 2: If an error, store an exception in the promise.
            //         'std::make_exception_ptr' creates an 'exception_ptr'
            //         from an exception object. This 'exception_ptr' is then
            //         stored in the shared state.
            p.set_exception(std::make_exception_ptr(std::runtime_error("Division by zero is not allowed!")));
        } else {
            // Step 3: If no error, perform the calculation and set the value.
            double result = num / den;
            p.set_value(result);
        }
    } catch (...) {
        // Step 4: Catch any other unexpected exceptions that might occur
        //         during calculation and store them in the promise as well.
        //         'std::current_exception()' captures the currently active exception.
        p.set_exception(std::current_exception());
    }
}

int main() {
    // 1. Create a std::promise for a double result.
    std::promise<double> promise_obj;
    // 2. Get the associated std::future.
    std::future<double> future_obj = promise_obj.get_future();

    // 3. Create a worker thread to perform the division.
    //    We pass the promise (moved) and the numerator/denominator.
    std::thread worker_thread(divide_and_set, std::move(promise_obj), 20.0, 0.0);

    try {
        // Step 5: Attempt to retrieve the result from the future.
        //         If an exception was stored in the promise, 'get()' will
        //         rethrow that exception here in the main thread.
        double result = future_obj.get();
        std::cout << "Division result: " << result << std::endl;
    } catch (const std::runtime_error& e) {
        // Step 6: Catch the specific 'std::runtime_error' that was propagated.
        std::cout << "Caught exception in main thread: " << e.what() << std::endl;
    } catch (const std::exception& e) {
        // Step 7: Catch any other standard exceptions.
        std::cout << "Caught generic exception in main thread: " << e.what() << std::endl;
    }

    // 8. Join the worker thread.
    worker_thread.join();

    // Final Answer:
    // Caught exception in main thread: Division by zero is not allowed!
    //
    // Reflection: This example demonstrates a powerful feature: propagating
    // exceptions across thread boundaries. Instead of crashing the worker thread
    // or silently failing, the error condition is explicitly communicated
    // back to the consumer thread, where it can be handled gracefully using
    // standard C++ exception mechanisms. This is crucial for robust concurrent systems.
    return 0;
}
```

### Example 3: Using `std::async` for Simplicity

**Problem**: Calculate the $N$-th Fibonacci number asynchronously without manually managing `std::promise` and `std::thread`.

**Given**: $N = 10$.

**Wanted**: The 10th Fibonacci number (55) to be printed by the main thread.

```cpp
#include <iostream> // For std::cout, std::endl
#include <future>   // For std::async and std::future
#include <vector>   // Not directly used, but useful for iterative Fibonacci

// Function to calculate the N-th Fibonacci number (iterative for simplicity)
long long fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    long long a = 0, b = 1;
    for (int i = 2; i <= n; ++i) {
        long long next = a + b;
        a = b;
        b = next;
    }
    return b;
}

int main() {
    // 1. Launch the 'fibonacci' function asynchronously.
    //    'std::async' takes the function to run, and its arguments.
    //    'std::launch::async' explicitly tells the system to run this task
    //    on a new thread, ensuring true parallelism (if resources allow).
    //    'std::async' automatically creates an internal std::promise,
    //    executes 'fibonacci', sets the promise's value, and returns
    //    the associated std::future.
    std::future<long long> fib_future = std::async(std::launch::async, fibonacci, 10);

    // 2. The main thread can perform other tasks while 'fibonacci' runs.
    std::cout << "Main thread is busy doing other work..." << std::endl;
    // Simulate some work
    for (int i = 0; i < 100000000; ++i) {}
    std::cout << "Main thread finished its other work." << std::endl;

    // 3. Retrieve the result from the future.
    //    'get()' will block if the asynchronous 'fibonacci' computation
    //    has not yet completed. Once it completes, the value (55) is retrieved.
    long long fib_val = fib_future.get();

    // 4. Print the result.
    std::cout << "The 10th Fibonacci number is: " << fib_val << std::endl;
    // Output: The 10th Fibonacci number is: 55

    // Final Answer:
    // The 10th Fibonacci number is: 55
    //
    // Reflection: This example demonstrates the elegance of `std::async`.
    // It abstracts away the manual creation of `std::promise` and `std::thread`,
    // providing a cleaner, more concise way to launch asynchronous tasks and
    // retrieve their results via `std::future`. The explicit `std::launch::async`
    // is important to guarantee actual parallel execution.
    return 0;
}
```

### Example 4: Parallel Summation of Vector Parts

**Problem**: Calculate the sum of elements in a large `std::vector<int>` by dividing it into two halves and summing each half concurrently in separate threads.

**Given**: A `std::vector<int>` containing integers from 1 to 1000.

**Wanted**: The total sum of all elements (500500) calculated by summing two partial results.

```cpp
#include <iostream>  // For std::cout, std::endl
#include <vector>    // For std::vector
#include <numeric>   // For std::iota (to fill vector)
#include <thread>    // For std::thread
#include <future>    // For std::promise and std::future
#include <functional> // For std::ref

// Function to sum a specific range of elements in a vector
void sum_range(std::promise<long long>&& p,
               const std::vector<int>& data, // Pass by const reference to avoid copy
               size_t start_idx,
               size_t end_idx) {
    long long local_sum = 0;
    // Step 1: Iterate through the specified range and accumulate the sum.
    for (size_t i = start_idx; i < end_idx; ++i) {
        local_sum += data[i];
    }
    // Step 2: Fulfill the promise with the computed local sum.
    p.set_value(local_sum);
}

int main() {
    // 1. Create a large vector and fill it with values from 1 to 1000.
    std::vector<int> data(1000);
    std::iota(data.begin(), data.end(), 1); // Fills data: {1, 2, ..., 1000}

    // 2. Determine the midpoint to split the vector into two halves.
    size_t midpoint = data.size() / 2; // midpoint = 1000 / 2 = 500

    // 3. Create two std::promise objects and their associated std::future objects.
    //    One pair for the first half, another for the second half.
    std::promise<long long> p1;
    std::future<long long> f1 = p1.get_future();

    std::promise<long long> p2;
    std::future<long long> f2 = p2.get_future();

    // 4. Launch two worker threads.
    //    - Thread t1 will sum the first half (indices 0 to 499).
    //    - Thread t2 will sum the second half (indices 500 to 999).
    //    We use 'std::move(p1)' and 'std::move(p2)' to transfer promise ownership.
    //    'std::ref(data)' is used to pass the vector by reference to avoid copying
    //    the entire vector, which would be inefficient for large vectors.
    std::thread t1(sum_range, std::move(p1), std::ref(data), 0, midpoint);
    std::thread t2(sum_range, std::move(p2), std::ref(data), midpoint, data.size());

    // 5. Retrieve the partial sums from the futures.
    //    'f1.get()' will block until t1 completes and fulfills p1.
    //    'f2.get()' will block until t2 completes and fulfills p2.
    //    These calls can happen in any order, and if one sum is ready before
    //    the other, its 'get()' will return immediately.
    long long sum_first_half = f1.get();  // sum_first_half = sum(1..500) = 125250
    long long sum_second_half = f2.get(); // sum_second_half = sum(501..1000) = 375250

    // 6. Calculate the total sum by combining the partial results.
    long long total_sum = sum_first_half + sum_second_half;
    // total_sum = 125250 + 375250 = 500500

    // 7. Print the results.
    std::cout << "Sum of first half: " << sum_first_half << std::endl;
    std::cout << "Sum of second half: " << sum_second_half << std::endl;
    std::cout << "Total sum: " << total_sum << std::endl;
    // Output:
    // Sum of first half: 125250
    // Sum of second half: 375250
    // Total sum: 500500

    // 8. Join the worker threads.
    t1.join();
    t2.join();

    // Final Answer:
    // Total sum: 500500
    //
    // Reflection: This example showcases how `std::promise` and `std::future`
    // facilitate task-based parallelism. A larger problem is decomposed into
    // smaller, independent sub-problems, each handled by a separate thread.
    // The main thread then efficiently collects and aggregates the results.
    // Key considerations here are passing large data structures by `std::ref`
    // to avoid expensive copies and correctly managing the range indices for
    // each parallel task.
    return 0;
}
```

## 6. Common mistakes and traps

1.  **Calling `get()` multiple times on the same `std::future`**: `std::future::get()` is a destructive operation. It moves the value out of the shared state. Calling it again on the same `std::future` object results in undefined behavior (often a crash or `std::future_error`). If you need to access the result multiple times, store it in a local variable after the first `get()`.
2.  **Calling `get_future()` multiple times on the same `std::promise`**: A `std::promise` can only be associated with one `std::future`. Attempting to call `get_future()` more than once on the same `std::promise` object will throw a `std::future_error`.
3.  **Forgetting to fulfill the `std::promise`**: If a `std::promise` object is destroyed (e.g., goes out of scope) without `set_value()` or `set_exception()` ever being called, the associated `std::future` will throw a `std::future_error` with `broken_promise` status when its `get()` method is invoked. The promise must always deliver, one way or another.
4.  **Not joining or detaching `std::thread`s**: While `std::promise`/`std::future` handle the communication of results, they do *not* manage the lifetime of the `std::thread` objects themselves. You still need to explicitly `join()` or `detach()` any `std::thread` you create to avoid program termination when the `std::thread` object is destructed. `std::async` handles this cleanup automatically.
5.  **Passing `std::promise` by copy**: `std::promise` is a *move-only* type. It cannot be copied. If you pass it to a thread function, you must use `std::move` to transfer ownership (e.g., `std::thread(func, std::move(my_promise), args...)`). Passing by reference is also possible if the caller retains ownership and manages its lifetime carefully.
6.  **Misunderstanding `std::async`'s default launch policy**: The default `std::launch::deferred | std::launch::async` policy means the task *might* run on a new thread, or it *might* be deferred and run synchronously on the thread that calls `get()`. If you need guaranteed parallelism and a new thread, always explicitly specify `std::launch::async` (e.g., `std::async(std::launch::async, func, args...)`).

## 7. Textbook-precise explanation

The C++ Standard Library provides `std::promise` and `std::future` as a robust mechanism for asynchronous communication and synchronization between execution agents (typically threads). This facility allows one agent to produce a result (either a value or an exception) and make it available to another agent, which can then retrieve it, potentially blocking until the result is ready.

A `std::promise<T>` object serves as the "producer" or "sender" side of a single-producer, single-consumer communication channel. It is a templated class, where `T` specifies the type of the value that will be stored. A `std::promise<T>` instance is created by the producing agent. It can then obtain an associated `std::future<T>` object by calling its `get_future()` member function. This `std::future<T>` object represents the "consumer" or "receiver" side of the channel.

Both `std::promise<T>` and `std::future<T>` are connected via an internal *shared state*. This shared state is an opaque, thread-safe object managed by the C++ runtime. It holds the value of type `T` (or an `std::exception_ptr` if an exception occurred) and a "ready" flag, indicating whether the promised result has been made available.

The producing agent fulfills the promise by invoking one of two member functions on its `std::promise<T>` object:
1.  `void set_value(T val)`: Stores `val` into the shared state and sets the "ready" flag.
2.  `void set_exception(std::exception_ptr ex)`: Stores the exception pointer `ex` into the shared state and sets the "ready" flag.
It is critical that exactly one of these methods is called on a `std::promise` object before it is destroyed; calling either more than once, or neither, leads to undefined behavior or a `std::future_error` on the consumer side (with `broken_promise` status).

The consuming agent retrieves the result using the `std::future<T>::get()` member function. If the shared state is not yet ready (i.e., the `std::promise` has not yet called `set_value()` or `set_exception()`), `std::future::get()` blocks the calling thread until the shared state becomes ready. Once ready, `get()` retrieves the stored value (moving it out of the shared state) or rethrows the stored exception. A crucial property is that `std::future::get()` is a destructive operation: after `get()` is called once, the value is no longer available in the shared state, and subsequent calls to `get()` on the same `std::future` object result in undefined behavior.

Both `std::promise` and `std::future` are *move-only* types. This means their ownership can be transferred (e.g., passed by `std::move` into a thread function) but not duplicated, ensuring unique control over the shared state.

For higher-level asynchronous task execution, the `std::async` function template provides a convenient abstraction that often leverages `std::promise` and `std::future` internally. `std::async` takes a callable object and its arguments, launches it according to a specified `std::launch` policy (e.g., `std::launch::async` for guaranteed new thread, `std::launch::deferred` for lazy execution), and returns a `std::future` object that will eventually yield the callable's result. This simplifies asynchronous programming by abstracting away the explicit management of `std::promise` and `std::thread` objects.

*Citations*:
- Bjarne Stroustrup, *The C++ Programming Language, 4th Edition*, Addison-Wesley, 2013, Chapter 42 (Concurrency).
- Anthony Williams, *C++ Concurrency in Action, 2nd Edition*, Manning Publications, 2019, Chapter 4 (Asynchronous operations).
- ISO/IEC 14882:2020 (C++ Standard), [thread.req.async] and [futures.overview].

## 8. ASCII diagrams

Here's an ASCII diagram illustrating the interaction between `std::promise`, `std::future`, and the internal shared state across two threads.

```text
+------------------------------------------------------------------+
|                           THREAD 1 (Producer)                    |
|                                                                  |
|  1. Create std::promise<T>                                       |
|     std::promise<T> my_promise;                                  |
|                                                                  |
|  2. Get associated std::future<T>                                |
|     std::future<T> my_future = my_promise.get_future();          |
|     (my_future is usually passed to Thread 2, e.g., via std::async |
|      or by moving it to Thread 2's creation function)            |
|                                                                  |
|  3. Perform computation... (e.g., calculate 'result_value')      |
|                                                                  |
|  4. Fulfill the promise:                                         |
|     my_promise.set_value(result_value);                          |
|     OR                                                           |
|     my_promise.set_exception(std::make_exception_ptr(exc));      |
|                                                                  |
+------------------------------------------------------------------+
                                  |
                                  |   (Implicit link, often via move-semantics)
                                  |
                                  V
+------------------------------------------------------------------+
|                     SHARED STATE (Internal to C++ Runtime)       |
|                                                                  |
|  - Holds value of type T (or std::exception_ptr)                 |
