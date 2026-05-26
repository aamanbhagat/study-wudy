## 1. The one-sentence answer
**std::promise and std::future form a one-time, thread-safe channel that lets one thread produce a value or exception while another thread consumes it later.**

A promise holds the writable end. It stores a result once, then signals completion. A future holds the readable end. It blocks until the result arrives or throws the stored exception. Together they decouple the producer from the consumer without shared mutable state or manual locks.

The mechanism lives in the <future> header. A promise<T> creates an associated future<T> through its get_future() member. After that point the two objects share an internal state that is reference-counted and destroyed only when both ends disappear. The producer calls set_value, set_exception, or their atomic counterparts exactly once; any later attempt throws std::future_error.

> [!NOTE]
> The single-assignment rule is the entire point: once the value is set, the channel becomes immutable, eliminating data races by construction.

## 2. Why this matters — concrete and current
In high-energy physics at CERN, the reconstruction of particle tracks from detector data is split across hundreds of threads. Each thread uses a promise to return a fitted track segment; the main reconstruction thread waits on the corresponding futures so that downstream vertex finding can begin the moment any segment is ready.

NVIDIA’s CUDA runtime and several machine-learning frameworks expose asynchronous kernel launches that return futures. The host thread continues scheduling other work while the GPU kernel executes; the future becomes ready when the kernel signals completion through CUDA events, allowing clean overlap of compute and data movement without busy-waiting.

Modern web servers written in C++ (for example, Facebook’s Folly and certain high-frequency trading gateways) use promise/future pairs to represent pending HTTP or FIX-protocol replies. Worker threads that handle network I/O set the promise when a response arrives, letting request-handling coroutines or threads continue without holding OS threads during the round-trip.

Semiconductor design tools from Synopsys and Cadence simulate billions of transistor cycles. Timing-analysis passes launch independent Monte-Carlo runs on separate threads; each run deposits its slack report into a promise so the aggregator can merge results as soon as they appear, cutting total wall-clock time by the degree of parallelism.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| std::thread              | The producer that sets the promise usually runs on its own thread. |
| RAII and move semantics  | promise and future objects must be moved across thread boundaries; understanding move-only types prevents accidental copies. |
| Exception propagation    | A promise can transport an exception to the waiting future; you must know how exceptions interact with stack unwinding. |
| <future> header          | All declarations reside here; without it the types simply do not exist. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A one-shot mailbox
A promise and a future together act as a mailbox that can be posted exactly once. The producer writes; the consumer reads. No reader can see a half-written value because the write is atomic with respect to the state transition.

```cpp
std::promise<int> p;
std::future<int> f = p.get_future();
```
The call get_future() transfers ownership of the shared state from the promise to the returned future.

> [!WARNING]
> Calling get_future() twice on the same promise throws std::future_error with future_errc::future_already_retrieved.

### Step 2 — Setting the value
The producer calls set_value. This stores the value inside the shared state and marks the state ready.

```cpp
p.set_value(42);
```
Formally, set_value(v) performs: store v, set ready flag, wake any waiting threads.

> [!WARNING]
> Calling set_value a second time throws std::future_error with future_errc::promise_already_satisfied.

### Step 3 — Consuming the value
The consumer calls get on the future. If the state is not ready, get blocks until it becomes ready.

```cpp
int x = f.get();
```
After get returns, the future’s shared state is released; subsequent calls to get throw future_errc::no_state.

### Step 4 — Transporting exceptions
Instead of a value the producer may store an exception.

```cpp
p.set_exception(std::make_exception_ptr(std::runtime_error("boom")));
```
When the consumer calls get, the stored exception is rethrown inside the calling thread.

### Step 5 — The shared state lifetime
The internal state is destroyed only when both the promise and all futures that refer to it are destroyed. This guarantees the value or exception outlives both ends.

### Step 6 — The textbook statement
A std::promise<T> and its associated std::future<T> provide a single-assignment, exception-transporting communication channel whose readiness is observable and whose result is retrieved exactly once. The operations set_value, set_exception, and get are linearizable; any violation of the single-assignment rule is reported by throwing std::future_error.

## 5. Worked examples — every step shown

**Example 1 — Basic value transfer**
- *Given:* A promise created on the main thread, moved into a worker thread that computes 2+3.
- *Find:* The result retrieved on the main thread.

```cpp
std::promise<int> prom;
std::future<int> fut = prom.get_future();
std::thread t([&prom] { prom.set_value(2 + 3); });
int res = fut.get();   // blocks until set_value runs
t.join();
```
*Why* — The lambda captures prom by reference; set_value stores 5 and marks ready.  
*Why* — fut.get() observes the ready state and returns the stored value.  
**5**

*Reflection* — The move of the promise into the thread is essential; copying would be ill-formed.

**Example 2 — Exception transport**
- *Given:* Worker detects division by zero.
- *Find:* Exception rethrown on consumer.

```cpp
std::promise<double> prom;
auto fut = prom.get_future();
std::thread t([&] {
    try { throw std::runtime_error("div0"); }
    catch (...) { prom.set_exception(std::current_exception()); }
});
try { fut.get(); } catch (const std::runtime_error& e) { /* handle */ }
t.join();
```
*Why* — set_exception stores the exception pointer.  
*Why* — get rethrows inside the calling thread’s context.  
**exception rethrown**

*Reflection* — The exception object itself need not be copyable; only the exception_ptr travels.

**Example 3 — Using std::async with future**
- *Given:* Launch policy deferred.
- *Find:* Result obtained lazily.

```cpp
auto fut = std::async(std::launch::deferred, [] { return 7 * 6; });
int v = fut.get();
```
*Why* — async returns a future whose promise is fulfilled when the callable runs.  
*Why* — get triggers execution and returns 42.  
**42**

*Reflection* — deferred policy shows that the producer need not be a separate OS thread.

**Example 4 — Multiple futures collected**
- *Given:* Three independent computations.
- *Find:* Sum of results after all complete.

```cpp
std::array<std::future<int>, 3> futs;
for (auto& f : futs) {
    std::promise<int> p; f = p.get_future();
    std::thread([p = std::move(p)]() mutable { p.set_value(1); }).detach();
}
int sum = 0;
for (auto& f : futs) sum += f.get();
```
*Why* — Each promise/future pair is independent.  
*Why* — Collecting via get waits for the slowest producer.  
**3**

*Reflection* — Futures can be stored in containers because they are movable.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Calling get_future twice          | Promise keeps only one associated future    | Call get_future exactly once, store the result |
| Forgetting to move promise into thread | promise is move-only                       | Use std::move when passing to another thread |
| Blocking forever on get           | Producer never calls set_value              | Use wait_for with timeout or set a sentinel  |
| Storing a reference in promise    | Reference may dangle after producer exits   | Store values or smart pointers instead       |
| Ignoring future’s destructor      | Destructor blocks if async was launched     | Always retrieve or explicitly detach futures |
| Using shared_future incorrectly   | shared_future allows multiple consumers     | Convert with share() only when needed        |
| set_value after set_exception     | State already satisfied                     | Use try_set_value when uncertain             |

## 7. The textbook-precise statement
From the C++ standard [futures.promise] and [futures.future]:

A std::promise<R> provides a single-assignment channel. Its member functions set_value, set_value_at_thread_exit, set_exception, and set_exception_at_thread_exit atomically store a result or exception and make the shared state ready. The associated std::future<R> or std::shared_future<R> obtained via get_future observes readiness via wait, wait_for, wait_until and retrieves the result via get, which rethrows any stored exception. Exactly one successful call to a setter is permitted; further calls throw future_error with code future_already_satisfied. After a successful get the future releases its reference to the shared state. (See also Anthony Williams, *C++ Concurrency in Action*, 2e, §4.2.)

## 8. Visual — diagram or schematic
```text
Thread A (producer)          Shared State          Thread B (consumer)
+------------------+        +-------------+        +------------------+
| std::promise<T>  |------->| value/ex    |<-------| std::future<T>   |
|                  |  set   | ready flag  |  get   |                  |
| move into thread |        | wait queue  |        | blocks until ready
+------------------+        +-------------+        +------------------+
        |                           |                       |
        v                           v                       v
   set_value(42)               wake waiters           int x = fut.get();
```

## 9. The memory technique
1. **The hook** — Picture a sealed envelope (promise) that can be posted only once; the recipient holds a claim ticket (future) that is valid the moment the envelope is dropped in the box.
2. **What to overlearn** — promise is the only writer, future is the only reader; get_future may be called only once; get rethrows stored exceptions.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from the single-assignment mailbox: one writer, one reader, atomic transition to ready, exception transport, RAII lifetime.

## 10. What this unlocks
Mastery of promise/future lets you reason about higher-level concurrency primitives that are built on the same shared-state model.

- std::packaged_task and std::async
- std::shared_future for fan-out patterns
- Coroutine return types (std::future in C++20/23)
- Thread pools that return futures to callers
- Continuation libraries such as .then() extensions

## 11. Self-check — five questions, no answers
1. What exception is thrown when set_value is called twice on the same promise?
2. After a successful call to future::get, what happens on a second call to get?
3. Can a promise<T&> be used to transmit a reference? If so, what are the lifetime implications?
4. How does std::async(std::launch::deferred, …) differ from an eager thread with respect to when the promise is fulfilled?
5. Construct a minimal example in which a future is never satisfied and the program nevertheless terminates cleanly; explain why it terminates.