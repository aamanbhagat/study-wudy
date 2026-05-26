## 1. The one-sentence answer
**std::promise and std::future form a one-time channel that lets one thread produce a value (or exception) while another thread waits for it without busy-polling.**

std::promise acts as the producer side: you create it, move it into a worker thread, and later call set_value or set_exception. std::future is the consumer side you obtain from the promise with get_future; calling get on it blocks until the value arrives. Once the value is delivered the channel is consumed and cannot be reused.

The pair solves the classic problem of “how do I return a result from a detached asynchronous task” without shared mutable state or condition variables for every single result.

> [!NOTE]
> The key aha is that the future does not just carry data — it also carries the synchronisation guarantee that the value will be visible exactly once, turning a raw thread hand-off into a clean, exception-safe contract.

## 2. Why this matters — concrete and current
In high-frequency trading engines at Jane Street and Hudson River Trading, worker threads that decode market data feeds use std::promise to hand parsed order-book snapshots back to the matching engine thread; the future get call is the only synchronisation point, keeping latency under 2 µs.

NASA’s Perseverance rover flight software uses a similar pattern (ported to their custom RTOS) where sensor tasks promise telemetry frames to the command dispatcher; the future lets the dispatcher wait without holding a mutex across variable-duration I/O.

Google’s TensorFlow C++ runtime employs std::promise/future pairs inside its thread-pool executor so that OpKernel completion can unblock dependent kernels without a central completion queue.

In semiconductor EDA tools from Synopsys, timing-analysis jobs are dispatched to a pool of CPU cores; each job returns a vector of slack values through a future so the main thread can merge results while other jobs continue.

Modern game engines such as Unreal Engine 5’s Niagara particle system use promise objects to deliver baked simulation data from background threads to the render thread, guaranteeing frame-rate stability.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| std::thread              | You must launch the worker that will eventually call set_value |
| RAII and move semantics  | promise and future are move-only; understanding ownership prevents dangling references |
| Exception propagation    | set_exception lets you transport exceptions across threads safely |
| Thread synchronisation   | future::get provides the acquire semantics you need instead of manual condition variables |

If any row is unfamiliar, pause and read the corresponding section on concurrency before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Producer and consumer roles
A promise is the only object allowed to publish a result; a future is the only object allowed to read it.  
Create a promise<int> p; then std::future<int> f = p.get_future(); move p into a thread that later executes p.set_value(42). The main thread can later call f.get() to retrieve 42.  
Formally, the lifetime of the shared state begins at promise construction and ends when both the promise and all futures referring to it are destroyed.

> [!WARNING]
> If the promise object is destroyed before set_value is called, every waiting future::get throws std::future_error with broken_promise; forgetting to move the promise into the worker is the most common source of this error.

### Step 2 — One-time state transition
The shared state can be in three phases: empty, value-set, or exception-set. After the first successful transition out of empty the state is immutable.  
Calling set_value twice on the same promise throws std::future_error.

### Step 3 — Blocking versus non-blocking retrieval
future::get blocks until the state is no longer empty. future::wait_for and wait_until allow timed waits returning future_status::ready, timeout, or deferred.  
$$ \text{status} = f.wait_for(std::chrono::milliseconds(10)) $$

### Step 4 — Exception transport
promise::set_exception stores an std::exception_ptr. When get is called the stored exception is rethrown in the calling thread, preserving the original type and what() message.

### Step 5 — Shared future for multiple consumers
std::shared_future<T> can be copied; multiple threads may call get on copies and all receive the same value. Conversion from future to shared_future is performed with share().

### Step 6 — Deferred launch with std::async
std::async with launch::deferred does not create a thread until get is called; the returned future still obeys the same contract, showing that promise/future semantics are orthogonal to thread creation.

### Step 7 — Textbook-grade contract
A call to future::get() has the following post-conditions: if the shared state contains a value, that value is returned; if it contains an exception, that exception is thrown; the call synchronises-with the successful set_value or set_exception that stored the result.

## 5. Worked examples — har step show karo

**Example 1 — Minimal producer-consumer**  
*Given:* A promise that will deliver an int from a worker thread.  
*Find:* The value received in the main thread.  
```cpp
std::promise<int> p;
std::future<int> f = p.get_future();
std::thread t([&p]{ p.set_value(42); });
std::cout << f.get();   // blocks until set_value
t.join();
```
*Why* the lambda captures p by reference: the promise must be the same object the worker writes to.  
*Why* we call join: the thread object must not be destroyed while still joinable.  
**42**

*Reflection:* The example is simple yet already demonstrates ownership transfer and blocking semantics; the same skeleton scales to any type.

**Example 2 — Exception propagation**  
*Given:* Worker may throw.  
*Find:* How the exception reaches the caller.  
```cpp
std::promise<double> p;
auto f = p.get_future();
std::thread t([&p]{
    try { throw std::runtime_error("sensor failed"); }
    catch (...) { p.set_exception(std::current_exception()); }
});
try { f.get(); } catch (const std::runtime_error& e) { /* handle */ }
t.join();
```
*Why* current_exception is used: it captures the exact exception object without slicing.  
**The runtime_error is rethrown inside f.get()**

*Reflection:* Without promise we would need a mutex-protected flag plus an exception_ptr member; the future hides all that.

**Example 3 — Timed wait**  
*Given:* A computation that may take longer than 100 ms.  
*Find:* Whether to continue or abort.  
```cpp
if (f.wait_for(std::chrono::milliseconds(100)) == std::future_status::ready)
    use(f.get());
else
    log_timeout();
```
*Why* we still call get only after ready: calling get on a timed-out future would block again.  
**No blocking after timeout decision**

*Reflection:* wait_for returns a status enum, teaching that readiness is distinct from retrieval.

**Example 4 — shared_future broadcast**  
*Given:* Three threads need the same computed matrix.  
*Find:* How to give each thread its own future handle.  
```cpp
std::promise<Matrix> p;
std::shared_future<Matrix> sf = p.get_future().share();
std::thread t1([sf]{ use(sf.get()); });
std::thread t2([sf]{ use(sf.get()); });
p.set_value(compute_matrix());
t1.join(); t2.join();
```
*Why* share() is called once: it converts the unique future into a reference-counted shared_future.  
**All three threads observe identical matrix without extra copies**

*Reflection:* shared_future demonstrates that the one-time contract still holds while allowing fan-out.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                                      |
|-------------------------------------|---------------------------------------------|------------------------------------------------------|
| promise moved into thread but still used in parent | Move leaves promise empty                   | Move only after get_future has been called           |
| Calling get twice on the same future | Future is consumed on first get             | Store result in a local variable or use shared_future |
| Forgetting to join the worker thread | Thread object destroyed while joinable      | Always join (or detach explicitly) before scope exit |
| set_value on a promise whose future was never retrieved | Shared state still exists but nobody waits  | Design so that every promise has a corresponding future |
| Using promise inside a loop without recreating it | State already fulfilled after first iteration | Create a fresh promise each iteration                |

## 7. The textbook-precise statement
From cppreference.com (2023) and ISO/IEC 14882:2020 §33.6.5–33.6.6:  
A std::promise<T> provides a facility to store a value or an exception that can later be retrieved via a std::future<T> or std::shared_future<T>. The set_value, set_exception, and their atomic counterparts are the only functions that may make the shared state ready. Once the shared state is made ready it cannot be made ready again; any subsequent call to a setter function throws std::future_error with error condition future_already_satisfied. A call to future::get() that returns a value synchronises with the successful completion of the setter that stored that value.

## 8. Visual — diagram or schematic
```text
Thread A (producer)          Shared State          Thread B (consumer)
+------------------+        +-------------+       +------------------+
| promise<int> p;  |------->| empty       |<------| future<int> f;   |
| auto f = p.get_future();  |             |       |                  |
| std::thread t([&p]{       | set_value(42)       | f.get() blocks   |
|   p.set_value(42);        |------------>| ready(42) |------> returns 42
| });                       +-------------+       +------------------+
```

## 9. The memory technique

1. **The hook** — Imagine a single-use courier envelope: the promise writes the letter and seals it; the future is the ticket that lets you open the envelope exactly once.
2. **What to overlearn** — promise moves, future is the only way to read, get() either returns the value or rethrows the stored exception.
3. **Spaced-repetition schedule** — Review the courier image after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If you forget the API, remember that you need one object that can publish and another that can wait; the publisher must be move-only and the waiter must synchronise.

## 10. What this unlocks
Once you master promise/future you can safely compose asynchronous pipelines, replace ad-hoc condition variables, and build higher-level abstractions such as std::packaged_task and std::async.

- std::async and std::packaged_task both return futures that obey the same contract.
- When you later study coroutines (C++20), you will recognise that promise_type is a generalised promise.
- Thread pools and work-stealing schedulers use the same pattern internally to return results without exposing raw threads.

## 11. Self-check — five questions, no answers
1. What happens if you call set_value twice on the same promise?
2. How does a future become ready when the worker thread throws an exception?
3. Write the shortest correct code that moves a promise into a thread and retrieves an int result.
4. Why must you call get_future before moving the promise into another thread?
5. In what scenario would you choose shared_future over future?