## 1. What it is — in plain English

Imagine you're waiting for a friend to finish getting ready before you both leave for a trip. You don't want to just stand there checking your watch every few seconds (that's inefficient!). Instead, you might sit down, read a book, and tell your friend, "Hey, let me know when you're ready." When your friend is finally done, they tap you on the shoulder and say, "I'm ready!" You then put down your book and both of you leave.

In the world of C++ programming, `std::condition_variable` is exactly like that "tap on the shoulder" mechanism for different parts of your program, called "threads," that need to coordinate. When one thread needs to wait for something specific to happen (like data becoming available, or a task finishing), it can "go to sleep" using a condition variable. It stops actively doing work and conserves computer resources.

When another thread makes that "something specific" happen, it can "tap on the shoulder" (notify) the waiting thread(s) through the same condition variable. The sleeping thread(s) then wake up, check if what they were waiting for is truly ready, and if so, they continue their work. This is far more efficient than constantly checking a shared variable in a loop, which is called "polling" and wastes CPU cycles.

## 2. Why it matters — real-world applications

`std::condition_variable` is fundamental for building efficient and robust concurrent applications. Without it, many common multi-threaded patterns would be impossible or incredibly inefficient.

1.  **Producer-Consumer Systems (e.g., Message Queues, Web Servers):** In a web server, one set of threads (producers) might receive incoming requests, parse them, and place them into a queue. Another set of threads (consumers) would then take requests from this queue, process them, and send back responses. Condition variables allow consumer threads to efficiently wait when the queue is empty, and producer threads to notify them when new requests arrive. This is critical for systems like Apache Kafka or RabbitMQ, which handle massive message throughput, ensuring workers are only active when there's work to do.

2.  **Thread Pools (e.g., Game Engines, Scientific Simulations):** Many applications, especially those requiring high performance like game engines (e.g., Unreal Engine, Unity) or scientific computing frameworks (e.g., for Monte Carlo simulations in physics), use thread pools. A thread pool consists of a fixed number of worker threads that sit idle, waiting for tasks. When a new task needs to be executed, it's added to a shared queue, and one or more worker threads are notified via a condition variable to pick up and process the task. This avoids the overhead of creating and destroying threads for every single task.

3.  **Barrier Synchronization (e.g., Parallel Data Processing, Machine Learning Training):** In parallel algorithms, especially common in machine learning (e.g., distributed training of neural networks) or physics simulations (e.g., finite element analysis), you often have multiple threads or processes working on different parts of a problem. Sometimes, all threads must complete a certain phase of computation before any of them can proceed to the next phase. A condition variable can be used to implement a "barrier" where threads wait until all participants have reached the barrier, and then all are simultaneously released to continue.

4.  **Event-driven Systems and GUI Frameworks:** Modern graphical user interface (GUI) frameworks (e.g., Qt, GTK, or even browser rendering engines) are highly event-driven. A main thread might wait for user input events (mouse clicks, key presses) or system events. When an event occurs, an event-dispatching thread might notify the main thread (or specific handler threads) via a condition variable that there's new work to process, ensuring responsiveness without constant polling.

## 3. Prerequisites — what you must know first

Before diving deep into `std::condition_variable`, ensure you have a solid understanding of these foundational concepts:

*   **Threads/Concurrency:** The ability of a program to execute multiple parts of its code simultaneously or seemingly simultaneously, often by dividing work among multiple independent execution paths called threads.
*   **`std::mutex`:** A mutual exclusion primitive that allows only one thread at a time to access a shared resource or critical section of code, preventing data corruption.
*   **`std::lock_guard` / `std::unique_lock`:** RAII (Resource Acquisition Is Initialization) wrappers for mutexes. `std::lock_guard` locks a mutex upon construction and unlocks it upon destruction. `std::unique_lock` is more flexible, allowing explicit unlocking, deferred locking, and moving ownership.
*   **Shared data/variables:** Any data (variables, objects, memory regions) that can be accessed and modified by multiple threads in a concurrent program.
*   **Race conditions:** A situation where the outcome of a program depends on the non-deterministic relative timing of multiple threads accessing and modifying shared data, often leading to unpredictable and incorrect results.
*   **Deadlock:** A specific type of concurrency bug where two or more threads are blocked indefinitely, each waiting for the other to release a resource that it needs.
*   **Spurious wakeups:** A phenomenon where a thread waiting on a condition variable wakes up even though no other thread explicitly notified it, and the condition it was waiting for might not yet be true.

## 4. The core idea — step by step

The core idea behind `std::condition_variable` is to provide a mechanism for threads to *wait* for a condition to become true, and for other threads to *notify* them when that condition *might* have become true, all while correctly managing access to shared data.

### Step 1: The Problem — Inefficient Waiting

**Plain English:** Imagine you're waiting for a specific store to open. You could stand outside and repeatedly try to open the door every few seconds. This is inefficient; you're using energy (CPU cycles) without doing anything productive.

**Concrete Example:** A consumer thread needs an item from a shared queue. If the queue is empty, a naive approach might be:

```cpp
while (queue.empty()) {
    // Spin-wait or sleep for a short duration
    std::this_thread::sleep_for(std::chrono::milliseconds(10));
}
// Now queue is not empty, process item
```

This "spin-wait" (or even `sleep_for`) wastes CPU cycles checking a condition that might not change for a long time.

**Formal/Mathematical Version:**
Let $C$ be a shared boolean condition.
A waiting thread $T_W$ repeatedly executes:
$$ \text{while}(C \text{ is false}) \{ \text{check } C; \text{delay}; \} $$
This is inefficient due to the constant CPU usage during `check C` and `delay`.

**What could go wrong:** High CPU usage, poor responsiveness, and energy waste, especially in battery-powered devices or high-performance servers.

### Step 2: The Solution — Condition Variables for Coordinated Waiting

**Plain English:** Instead of constantly checking the door, you sit down, read a book, and ask the store owner to tap you on the shoulder when they open. You're "waiting" on a "condition variable."

**Concrete Example:** A consumer thread uses a condition variable to wait for items.

```cpp
std::condition_variable cv;
std::mutex m;
std::queue<int> q; // Shared queue
bool data_ready = false; // Shared condition

// Consumer thread:
std::unique_lock<std::mutex> lock(m); // Acquire lock
cv.wait(lock, [&]{ return data_ready; }); // Wait for data_ready to be true
// ... now data_ready is true, process data ...
```

**Formal/Mathematical Version:**
A waiting thread $T_W$ uses a condition variable $CV$ and a mutex $M$:
$$ \text{acquire}(M) \\ \text{wait}(CV, M, \text{predicate}) \\ \text{release}(M) $$
where `predicate` is a function that returns true when the condition is met.

**What could go wrong:** If the `predicate` is not used, or if the waiting thread doesn't re-check the condition after waking up, it might proceed prematurely due to a spurious wakeup.

### Step 3: The `wait()` Operation — Atomically Releasing and Acquiring

**Plain English:** When you tell your friend "let me know when you're ready," you also implicitly agree to *stop holding them up* while they get ready. You release them to do their task, and only when they tap you, you re-engage. `cv.wait()` does this atomically: it unlocks the mutex, puts the thread to sleep, and when woken up, it re-locks the mutex *before* the thread continues. This is crucial to prevent race conditions.

**Concrete Example:**
The line `cv.wait(lock, [&]{ return data_ready; });` performs three critical actions:
1.  It atomically **unlocks** the `std::unique_lock` `lock` (and thus the underlying mutex `m`).
2.  It puts the current thread to **sleep** (blocks) until it's notified or spuriously wakes up.
3.  When woken up, it **re-locks** `lock` (and `m`) *before* returning control to the thread.
4.  It then *checks the predicate*. If the predicate is false, it repeats steps 1-3. If true, it returns.

**Formal/Mathematical Version:**
The `wait` operation on a condition variable $CV$ with a `unique_lock` $L$ and a predicate $P$:
1.  If $P()$ is true, return immediately.
2.  Atomically unlock $L$ and suspend the current thread.
3.  Upon notification or spurious wakeup, atomically re-lock $L$.
4.  Go to step 1.

**What could go wrong:** Using `std::lock_guard` instead of `std::unique_lock` with `wait()` will cause a compilation error or runtime issue, as `std::lock_guard` cannot be unlocked or relocked. Not using a predicate (or not checking the condition in a loop) can lead to spurious wakeups causing the thread to proceed when the condition is not met.

### Step 4: The `notify_one()` and `notify_all()` Operations — Tapping on Shoulders

**Plain English:** When the store owner finishes setting up, they can either tap *one* person on the shoulder (if only one person is waiting, or if only one is needed) or shout "We're open!" to everyone waiting (if multiple people need to know). `notify_one()` wakes up one arbitrary waiting thread, while `notify_all()` wakes up all waiting threads.

**Concrete Example:**
A producer thread adds an item to the queue and sets the `data_ready` flag:

```cpp
// Producer thread:
{
    std::lock_guard<std::mutex> lock(m); // Acquire lock to modify shared data
    q.push(item);
    data_ready = true; // Condition is now true
} // Mutex 'm' is released here by lock_guard's destructor
cv.notify_one(); // Notify one waiting consumer
// OR
// cv.notify_all(); // Notify all waiting consumers (if multiple could use the item)
```

**Formal/Mathematical Version:**
A notifying thread $T_N$ uses a condition variable $CV$ and a mutex $M$:
$$ \text{acquire}(M) \\ \text{modify shared condition} \\ \text{release}(M) \\ \text{notify\_one}(CV) \quad \text{or} \quad \text{notify\_all}(CV) $$
Note: The notification *can* happen while holding the lock, but it's often better to release the lock *before* notifying to allow the woken thread to acquire the lock immediately without waiting for the notifying thread to release it.

**What could go wrong:**
*   **Not holding the mutex:** Modifying `data_ready` without holding `m` would be a race condition.
*   **Not notifying:** If `data_ready` becomes true but `notify_one()` or `notify_all()` is never called, the waiting thread(s) will remain asleep indefinitely (deadlock).
*   **Notifying too early:** Notifying before the condition is truly met (e.g., before `data_ready = true;`) can lead to waiting threads waking up, checking the predicate, finding it false, and going back to sleep, which is inefficient.
*   **`notify_one()` vs. `notify_all()`:** Using `notify_one()` when multiple threads need to be woken (e.g., a barrier) will lead to deadlock for the remaining threads. Using `notify_all()` when `notify_one()` would suffice can cause unnecessary wakeups and contention.

### Step 5: The Mutex and Shared Condition — The Guardians of Truth

**Plain English:** The mutex is the "key" that protects the shared condition (like `data_ready` or the queue itself). You *must* hold the key when you look at or change the condition. The condition variable itself is simply the mechanism to wait and notify, but it doesn't protect the data; the mutex does.

**Concrete Example:**
The shared condition (`data_ready`) and the shared resource (`q`) are always accessed under the protection of `m`.

```cpp
std::condition_variable cv;
std::mutex m;
std::queue<int> q;
bool data_ready = false; // The shared condition

// Producer:
{
    std::lock_guard<std::mutex> lock(m); // Lock to modify q and data_ready
    q.push(10);
    data_ready = true;
} // Lock released
cv.notify_one();

// Consumer:
std::unique_lock<std::mutex> lock(m); // Lock to check data_ready and access q
cv.wait(lock, [&]{ return data_ready && !q.empty(); });
int item = q.front();
q.pop();
if (q.empty()) { // If queue becomes empty, reset data_ready (optional, but good practice)
    data_ready = false;
}
// Lock released when 'lock' goes out of scope or is explicitly unlocked
```

**Formal/Mathematical Version:**
Let $S$ be the set of shared variables that define the condition $P$.
Any access or modification to $S$ must be protected by a mutex $M$.
The `wait` operation on $CV$ inherently handles $M$ for suspension and resumption.
The `notify` operation on $CV$ does *not* require $M$ to be held *at the moment of notification*, but the *modification* of $S$ that leads to the notification *must* be under $M$'s protection.

**What could go wrong:**
*   **Accessing `q` or `data_ready` without holding `m`:** This is a classic race condition and leads to undefined behavior.
*   **Not updating the shared condition:** If `q` is pushed, but `data_ready` is not set, the consumer will never wake up.
*   **Updating the shared condition but not notifying:** The consumer will also never wake up.

## 5. Worked examples — multiple, with every step shown

### Example 1: Simple Producer-Consumer with a single item

**Problem:** Design a system where one thread (producer) generates a single data item and another thread (consumer) waits for this item, processes it, and then the program terminates.

**Given:**
*   One producer thread.
*   One consumer thread.
*   A single integer data item to be transferred.
*   The producer generates the item, the consumer consumes it.

**What we want:**
*   The consumer thread should efficiently wait for the data.
*   No race conditions.
*   Program terminates correctly.

**Solution:**

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <string>

// Shared resources
std::mutex mtx;
std::condition_variable cv;
bool data_ready = false; // The shared condition
int shared_data = 0;     // The shared data item

// Producer function
void producer_func() {
    std::cout << "[Producer] Working..." << std::endl;
    std::this_thread::sleep_for(std::chrono::seconds(1)); // Simulate work

    // Step 1: Acquire lock to modify shared data
    std::unique_lock<std::mutex> lock(mtx);
    std::cout << "[Producer] Acquired lock." << std::endl;

    // Step 2: Modify shared data and condition
    shared_data = 42;
    data_ready = true;
    std::cout << "[Producer] Data produced: " << shared_data << std::endl;

    // Step 3: Release lock (optional, but good practice to do before notify)
    // The lock will be released automatically by unique_lock's destructor if not explicitly called.
    // However, explicit unlock here allows the consumer to acquire the lock sooner.
    lock.unlock();
    std::cout << "[Producer] Released lock." << std::endl;

    // Step 4: Notify one waiting consumer
    cv.notify_one();
    std::cout << "[Producer] Notified consumer." << std::endl;
}

// Consumer function
void consumer_func() {
    std::cout << "[Consumer] Waiting for data..." << std::endl;

    // Step 1: Acquire lock for waiting
    std::unique_lock<std::mutex> lock(mtx);
    std::cout << "[Consumer] Acquired lock for waiting." << std::endl;

    // Step 2: Wait for the condition 'data_ready' to be true
    // This atomically unlocks 'mtx', waits, and re-locks 'mtx' upon wakeup.
    // It also handles spurious wakeups by re-checking the predicate.
    cv.wait(lock, [] {
        std::cout << "[Consumer] Checking condition (data_ready: " << data_ready << ")." << std::endl;
        return data_ready;
    });
    std::cout << "[Consumer] Woke up and condition is met." << std::endl;

    // Step 3: Access shared data (lock is held at this point)
    std::cout << "[Consumer] Data consumed: " << shared_data << std::endl;

    // Step 4: Release lock (automatic when 'lock' goes out of scope)
    // No need to explicitly unlock here, as consumer is done with shared data.
}

int main() {
    std::thread producer_thread(producer_func); // Create producer thread
    std::thread consumer_thread(consumer_func); // Create consumer thread

    producer_thread.join(); // Wait for producer to finish
    consumer_thread.join(); // Wait for consumer to finish

    std::cout << "[Main] Program finished." << std::endl;
    return 0;
}
```

**Explanation of steps:**
1.  **Shared Resources:** `mtx` (mutex) protects `data_ready` and `shared_data`. `cv` (condition variable) is used for waiting/notifying. `data_ready` is a boolean flag indicating if data is available.
2.  **Producer (P):**
    *   Simulates work.
    *   Acquires `mtx` using `std::unique_lock`. This ensures exclusive access to `shared_data` and `data_ready`.
    *   Sets `shared_data` to `42` and `data_ready` to `true`.
    *   `lock.unlock()`: The mutex is explicitly unlocked *before* `notify_one()`. This is a common optimization: the consumer, when woken, can immediately acquire the mutex without having to wait for the producer to release it at the end of its scope.
    *   `cv.notify_one()`: Signals *one* waiting thread that the condition *might* have changed.
3.  **Consumer (C):**
    *   Acquires `mtx` using `std::unique_lock`. This is necessary for `cv.wait()`.
    *   `cv.wait(lock, [] { return data_ready; })`: This is the core waiting mechanism.
        *   It atomically releases `mtx`.
        *   It puts the consumer thread to sleep.
        *   When woken (by `notify_one()` or spuriously), it re-acquires `mtx`.
        *   It then evaluates the lambda predicate `[] { return data_ready; }`. If `data_ready` is `false`, it goes back to sleep. If `true`, it proceeds. This loop handles spurious wakeups.
    *   Once `cv.wait()` returns, `mtx` is held, and `data_ready` is guaranteed to be `true`. The consumer can safely access `shared_data`.
    *   The `lock` object goes out of scope, releasing `mtx`.
4.  **`main`:** Creates and joins both threads, ensuring the program waits for them to complete.

**Final Answer:**
The output will show the producer working, producing data, notifying, and the consumer waiting, waking up, and consuming the data.

```text
[Producer] Working...
[Consumer] Waiting for data...
[Consumer] Acquired lock for waiting.
[Consumer] Checking condition (data_ready: 0).
[Producer] Acquired lock.
[Producer] Data produced: 42
[Producer] Released lock.
[Producer] Notified consumer.
[Consumer] Woke up and condition is met.
[Consumer] Data consumed: 42
[Main] Program finished.
```

**Reflection:** This example highlights the fundamental interaction: a mutex protects the shared condition, and the condition variable orchestrates efficient waiting and notification. The predicate in `wait()` is crucial for correctness, especially against spurious wakeups.

---

### Example 2: Bounded Buffer Producer-Consumer with multiple items and two condition variables

**Problem:** Implement a bounded buffer (a queue with a maximum capacity) where multiple producer threads add items and multiple consumer threads remove items. Producers should wait if the buffer is full, and consumers should wait if the buffer is empty.

**Given:**
*   `N` producer threads.
*   `M` consumer threads.
*   A shared `std::queue<int>` with a `MAX_SIZE`.
*   Producers add items (0 to 99), consumers print them.

**What we want:**
*   Producers wait if the queue is full.
*   Consumers wait if the queue is empty.
*   Correct synchronization for multiple producers/consumers.
*   No race conditions.
*   Program terminates after a certain number of items are processed.

**Solution:**

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <queue>
#include <vector>
#include <random> // For random sleep

// Shared resources
std::mutex mtx;
std::condition_variable cv_producer; // For producers to wait when buffer is full
std::condition_variable cv_consumer; // For consumers to wait when buffer is empty
std::queue<int> buffer;
const int MAX_SIZE = 5; // Bounded buffer size
const int TOTAL_ITEMS = 20; // Total items to produce
int items_produced = 0;
int items_consumed = 0;

// Producer function
void producer_func(int id) {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(50, 200); // Sleep for 50-200 ms

    while (true) {
        std::this_thread::sleep_for(std::chrono::milliseconds(distrib(gen))); // Simulate work

        std::unique_lock<std::mutex> lock(mtx); // Acquire lock

        // Wait if buffer is full AND we still need to produce items
        cv_producer.wait(lock, [&] {
            return buffer.size() < MAX_SIZE || items_produced >= TOTAL_ITEMS;
        });

        // Check if we should stop producing (all items produced)
        if (items_produced >= TOTAL_ITEMS) {
            std::cout << "[Producer " << id << "] All items produced. Exiting." << std::endl;
            // It's crucial to notify consumers one last time if they are waiting,
            // so they can check the total_items_produced condition and exit.
            cv_consumer.notify_all();
            return;
        }

        // Produce item
        int item = items_produced++;
        buffer.push(item);
        std::cout << "[Producer " << id << "] Produced: " << item << " (Buffer size: " << buffer.size() << ")" << std::endl;

        // Notify consumers that buffer is no longer empty
        cv_consumer.notify_one(); // Only one consumer needs to wake up for one item
    }
}

// Consumer function
void consumer_func(int id) {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> distrib(100, 300); // Sleep for 100-300 ms

    while (true) {
        std::this_thread::sleep_for(std::chrono::milliseconds(distrib(gen))); // Simulate work

        std::unique_lock<std::mutex> lock(mtx); // Acquire lock

        // Wait if buffer is empty AND not all items have been produced yet
        cv_consumer.wait(lock, [&] {
            return !buffer.empty() || items_produced >= TOTAL_ITEMS;
        });

        // Check if we should stop consuming (all items produced AND buffer is empty)
        if (buffer.empty() && items_produced >= TOTAL_ITEMS) {
            std::cout << "[Consumer " << id << "] All items consumed and produced. Exiting." << std::endl;
            // Notify other consumers, in case they are still waiting
            cv_consumer.notify_all();
            return;
        }

        // Consume item
        int item = buffer.front();
        buffer.pop();
        items_consumed++;
        std::cout << "[Consumer " << id << "] Consumed: " << item << " (Buffer size: " << buffer.size() << ")" << std::endl;

        // Notify producers that buffer is no longer full
        cv_producer.notify_one(); // Only one producer needs to wake up
    }
}

int main() {
    const int num_producers = 2;
    const int num_consumers = 3;

    std::vector<std::thread> producers;
    for (int i = 0; i < num_producers; ++i) {
        producers.emplace_back(producer_func, i + 1);
    }

    std::vector<std::thread> consumers;
    for (int i = 0; i < num_consumers; ++i) {
        consumers.emplace_back(consumer_func, i + 1);
    }

    for (auto& t : producers) {
        t.join();
    }
    for (auto& t : consumers) {
        t.join();
    }

    std::cout << "[Main] All producers and consumers finished. Total items produced: " << items_produced << ", consumed: " << items_consumed << std::endl;
    return 0;
}
```

**Explanation of steps:**
1.  **Shared Resources:**
    *   `mtx`: Protects `buffer`, `items_produced`, `items_consumed`.
    *   `cv_producer`: Condition variable for producers to wait when the buffer is full.
    *   `cv_consumer`: Condition variable for consumers to wait when the buffer is empty.
    *   `buffer`: The `std::queue` acting as the bounded buffer.
    *   `MAX_SIZE`: The capacity limit of the buffer.
    *   `TOTAL_ITEMS`: The total number of items to be produced before termination.
    *   `items_produced`, `items_consumed`: Counters to track progress and signal termination.
2.  **Producer (`producer_func`):**
    *   Enters an infinite loop, simulating continuous production.
    *   Acquires `mtx` using `std::unique_lock`.
    *   `cv_producer.wait(lock, [&] { return buffer.size() < MAX_SIZE || items_produced >= TOTAL_ITEMS; });`: The producer waits if the buffer is full (`buffer.size() == MAX_SIZE`). The `|| items_produced >= TOTAL_ITEMS` part is crucial for termination: if all items are produced, the producer should *not* wait indefinitely, but rather check if it's time to exit.
    *   **Termination check:** After waking up, if `items_produced >= TOTAL_ITEMS`, it means all items have been produced (potentially by another producer thread). This producer exits. It also calls `cv_consumer.notify_all()` one last time to wake up any lingering consumers so they can also check the termination condition.
    *   If not exiting, it produces an item, increments `items_produced`, and pushes it to `buffer`.
    *   `cv_consumer.notify_one()`: Notifies *one* waiting consumer that an item is now available.
3.  **Consumer (`consumer_func`):**
    *   Enters an infinite loop, simulating continuous consumption.
    *   Acquires `mtx` using `std::unique_lock`.
    *   `cv_consumer.wait(lock, [&] { return !buffer.empty() || items_produced >= TOTAL_ITEMS; });`: The consumer waits if the buffer is empty (`buffer.empty()`). Similar to the producer, `|| items_produced >= TOTAL_ITEMS` is important for termination: if all items have been produced, the consumer shouldn't wait indefinitely if the buffer is empty.
    *   **Termination check:** After waking up, if `buffer.empty()` AND `items_produced >= TOTAL_ITEMS`, it means all items that were ever going to be produced have been produced *and* consumed. This consumer exits. It calls `cv_consumer.notify_all()` to ensure other consumers also wake up and check their termination condition.
    *   If not exiting, it consumes an item, increments `items_consumed`, and pops it from `buffer`.
    *   `cv_producer.notify_one()`: Notifies *one* waiting producer that space is now available in the buffer.
4.  **`main`:** Creates multiple producer and consumer threads, then `join()`s them to wait for their completion.

**Final Answer:**
The output will show producers adding items to the buffer and consumers removing them, respecting the `MAX_SIZE` limit, and eventually terminating once `TOTAL_ITEMS` are processed. The exact interleaving will vary due to thread scheduling.

```text
// Example partial output (actual output will vary)
[Producer 1] Produced: 0 (Buffer size: 1)
[Producer 2] Produced: 1 (Buffer size: 2)
[Consumer 1] Consumed: 0 (Buffer size: 1)
[Producer 1] Produced: 2 (Buffer size: 2)
[Consumer 2] Consumed: 1 (Buffer size: 1)
[Producer 2] Produced: 3 (Buffer size: 2)
[Consumer 3] Consumed: 2 (Buffer size: 1)
...
[Producer 1] Produced: 19 (Buffer size: 2)
[Producer 2] All items produced. Exiting.
[Consumer 1] Consumed: 18 (Buffer size: 1)
[Consumer 2] Consumed: 19 (Buffer size: 0)
[Consumer 3] All items consumed and produced. Exiting.
[Consumer 1] All items consumed and produced. Exiting.
[Consumer 2] All items consumed and produced. Exiting.
[Main] All producers and consumers finished. Total items produced: 20, consumed: 20
```

**Reflection:** This example demonstrates the power of using *two* condition variables for different waiting conditions in a bounded buffer. It also shows a robust termination strategy where threads check a global condition (`items_produced >= TOTAL_ITEMS`) to know when to stop, and use `notify_all()` during exit to ensure other threads don't get stuck.

---

### Example 3: Barrier Synchronization

**Problem:** Implement a barrier where `N` threads must all reach a specific point in their execution before any of them are allowed to proceed. After all threads have reached the barrier, they should all be released simultaneously. This should be reusable for multiple barrier points.

**Given:**
*   `N` worker threads.
*   A barrier point that all threads must cross together.

**What we want:**
*   All `N` threads wait at the barrier.
*   Once the `N`-th thread arrives, all threads are released.
*   The barrier can be used multiple times.

**Solution:**

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <vector>
#include <chrono>

class ReusableBarrier {
public:
    explicit ReusableBarrier(int count) : initial_count_(count), current_count_(count), generation_(0) {}

    void wait() {
        std::unique_lock<std::mutex> lock(mtx_);
        long my_generation = generation_; // Capture current generation

        current_count_--; // One less thread remaining to reach the barrier

        if (current_count_ == 0) { // Last thread to reach the barrier
            std::cout << "[Barrier] All " << initial_count_ << " threads reached the barrier. Releasing..." << std::endl;
            generation_++; // Increment generation for next barrier use
            current_count_ = initial_count_; // Reset count for next use
            cv_.notify_all(); // Wake up all waiting threads
        } else {
            // Not the last thread, so wait
            std::cout << "[Thread " << std::this_thread::get_id() << "] Waiting at barrier. "
                      << current_count_ << " threads remaining." << std::endl;
            cv_.wait(lock, [&] { return my_generation != generation_; }); // Wait until generation changes
        }
        std::cout << "[Thread " << std::this_thread::get_id() << "] Passed barrier (Generation: " << my_generation << " -> " << generation_ << ")." << std::endl;
    }

private:
    std::mutex mtx_;
    std::condition_variable cv_;
    int initial_count_; // Total number of threads expected
    int current_count_; // Number of threads yet to reach the barrier in current generation
    long generation_;   // Used to protect against spurious wakeups and multiple barrier uses
};

void worker_func(int id, ReusableBarrier& barrier) {
    std::cout << "[Worker " << id << "] Started." << std::endl;
    std::this_thread::sleep_for(std::chrono::milliseconds(100 * id)); // Simulate varied work before barrier 1

    std::cout << "[Worker " << id << "] Reaching barrier 1." << std::endl;
    barrier.wait(); // First barrier

    std::this_thread::sleep_for(std::chrono::milliseconds(50)); // Simulate work after barrier 1

    std::cout << "[Worker " << id << "] Reaching barrier 2." << std::endl;
    barrier.wait(); // Second barrier

    std::cout << "[Worker " << id << "] Finished." << std::endl;
}

int main() {
    const int num_threads = 4;
    ReusableBarrier barrier(num_threads);

    std::vector<std::thread> workers;
    for (int i = 0; i < num_threads; ++i) {
        workers.emplace_back(worker_func, i + 1, std::ref(barrier));
    }

    for (auto& t : workers) {
        t.join();
    }

    std::cout << "[Main] All workers finished." << std::endl;
    return 0;
}
```

**Explanation of steps:**
1.  **`ReusableBarrier` Class:**
    *   `initial_count_`: Stores the total number of threads that need to reach the barrier.
    *   `current_count_`: Tracks how many threads are *still* expected to reach the barrier in the current cycle.
    *   `generation_`: A crucial counter. It increments each time the barrier is reset and released. This is used in the `wait` predicate to ensure threads only wake up when the *current* barrier cycle is complete, not from a spurious wakeup or an old `notify_all()` from a previous barrier use.
    *   `mtx_`, `cv_`: Standard mutex and condition variable.
2.  **`wait()` Method:**
    *   `std::unique_lock<std::mutex> lock(mtx_);`: Each thread acquires the lock before manipulating barrier state.
    *   `long my_generation = generation_;`: The thread captures the current `generation_` it belongs to. This is vital.
    *   `current_count_--;`: Decrements the count of threads yet to arrive.
    *   **Last Thread Logic (`if (current_count_ == 0)`):**
        *   If this is the last thread to reach the barrier (`current_count_ == 0`), it's responsible for releasing everyone.
        *   It prints a message indicating all threads have arrived.
        *   `generation_++`: Increments the generation. This is the condition that all waiting threads will be looking for.
        *   `current_count_ = initial_count_;`: Resets the count for the next barrier use.
        *   `cv_.notify_all();`: Wakes up *all* threads waiting on `cv_`.
    *   **Waiting Threads Logic (`else` block):**
        *   If it's not the last thread, it prints a waiting message.
        *   `cv_.wait(lock, [&] { return my_generation != generation_; });`: This thread waits. The predicate is `my_generation != generation_`. This means the thread will only proceed if the `generation_` counter has changed *since it started waiting*. This correctly handles spurious wakeups (if `generation_` hasn't changed, it means the barrier hasn't been crossed yet, so go back to sleep) and ensures threads only pass the *current* barrier, not a previous one.
    *   After `wait()` returns (meaning `my_generation != generation_` is true), the thread has successfully passed the barrier.
3.  **`worker_func`:**
    *   Simulates some work.
    *   Calls `barrier.wait()` twice, demonstrating the reusability of the barrier.
4.  **`main`:** Creates `num_threads` worker threads, passing them the same `ReusableBarrier` object by reference. Joins all threads.

**Final Answer:**
The output will show threads arriving at the barrier at different times, but all will be released simultaneously once the last thread arrives. This will happen for both barrier points.

```text
[Worker 1] Started.
[Worker 2] Started.
[Worker 3] Started.
[Worker 4] Started.
[Worker 1] Reaching barrier 1.
[Thread 140736040854272] Waiting at barrier. 3 threads remaining.
[Worker 2] Reaching barrier 1.
[Thread 140736032461568] Waiting at barrier. 2 threads remaining.
[Worker 3] Reaching barrier 1.
[Thread 140736024068864] Waiting at barrier. 1 threads remaining.
[Worker 4] Reaching barrier 1.
[Barrier] All 4 threads reached the barrier. Releasing...
[Thread 140736040854272] Passed barrier (Generation: 0 -> 1).
[Thread 140736032461568] Passed barrier (Generation: 0 -> 1).
[Thread 140736024068864] Passed barrier (Generation: 0 -> 1).
[Thread 140736015676160] Passed barrier (Generation: 0 -> 1).
[Worker 1] Reaching barrier 2.
[Thread 140736040854272] Waiting at barrier. 3 threads remaining.
[Worker 2] Reaching barrier 2.
[Thread 140736032461568] Waiting at barrier. 2 threads remaining.
[Worker 3] Reaching barrier 2.
[Thread 140736024068864] Waiting at barrier. 1 threads remaining.
[Worker 4] Reaching barrier 2.
[Barrier] All 4 threads reached the barrier. Releasing...
[Thread 140736040854272] Passed barrier (Generation: 1 -> 2).
[Thread 140736032461568] Passed barrier (Generation: 1 -> 2).
[Thread 140736024068864] Passed barrier (Generation: 1 -> 2).
[Thread 140736015676160] Passed barrier (Generation: 1 -> 2).
[Worker 1] Finished.
[Worker 2] Finished.
[Worker 3] Finished.
[Worker 4] Finished.
[Main] All workers finished.
```

**Reflection:** This example demonstrates a more complex use case of `std::condition_variable` to build a reusable synchronization primitive. The `generation_` counter is a critical pattern for correctly implementing reusable barriers and avoiding "lost wakeups" or threads waking up for an old barrier event. The use of `notify_all()` is essential here because all threads need to be released simultaneously.

---

### Example 4: Thread Pool Task Queue

**Problem:** Create a simple thread pool where a fixed number of worker threads pull tasks from a shared queue and execute them. The pool should be able to accept new tasks, and shut down gracefully.

**Given:**
*   A fixed number of worker threads.
*   A queue of tasks (represented by `std::function<void()>` objects).
*   Ability to add tasks.
*   Ability to shut down the pool gracefully.

**What we want:**
*   Worker threads wait when the queue is empty.
*   Worker threads are notified when new tasks arrive.
*   Tasks are executed concurrently.
*   All tasks are processed before shutdown.

**Solution:**

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <queue>
#include <vector>
#include <functional> // For std::function
#include <future>     // For std::packaged_task and std::future

class ThreadPool {
public:
    ThreadPool(size_t num_threads) : stop_(false) {
        for (size_t i = 0; i < num_threads; ++i) {
            workers_.emplace_back([this] { // Lambda for worker thread function
                while (true) {
                    std::function<void()> task; // Task to execute

                    { // Scope for lock
                        std::unique_lock<std::mutex> lock(queue_mutex_);

                        // Wait until there's a task or the pool is stopping
                        condition_.wait(lock, [this] {
                            return !tasks_.empty() || stop_;
                        });

                        // If stopping and no more tasks, exit worker thread
                        if (stop_ && tasks_.empty()) {
                            return;
                        }

                        task = std::move(tasks_.front()); // Get task
                        tasks_.pop();                       // Remove from queue
                    } // Lock released here

                    task(); // Execute task outside the lock
                }
            });
        }
    }

    // Add a task to the queue
    template<class F, class... Args>
    auto enqueue(F&& f, Args&&... args)
        -> std::future<typename std::result_of<F(Args...)>::type>
    {
        using return_type = typename std::result_of<F(Args...)>::type;

        // Create a packaged_task to wrap the function and its arguments
        auto task = std::make_shared<std::packaged_task<return_type()>>(
            std::bind(std::forward<F>(f), std::forward<Args>(args)...)
        );

        std::future<return_type> res = task->get_future(); // Get future for result

        { // Scope for lock
            std::unique_lock<std::mutex> lock(queue_mutex_);
            if (stop_) {
                throw std::runtime_error("enqueue on stopped ThreadPool");
            }
            tasks_.emplace([task]() { (*task)(); }); // Add task to queue
        } // Lock released here

        condition_.notify_one(); // Notify one worker that a new task is available
        return res;
    }

    // Destructor: ensures all threads are joined
    ~ThreadPool() {
        { // Scope for lock
            std::unique_lock<std::mutex> lock(queue_mutex_);
            stop_ = true; // Signal threads to stop
        } // Lock released here

        condition_.notify_all(); // Wake up all waiting threads so they can check 'stop_'

        for (std::thread& worker : workers_) {
            worker.join(); // Wait for each worker thread to finish
        }
    }

private:
    std::vector<std::thread> workers_;        // Worker threads
    std::queue<std::function<void()>> tasks_; // Task queue

    std::mutex queue_mutex_;          // Mutex to protect the task queue
    std::condition_variable condition_; // Condition variable for waiting/notifying
    bool stop_;                       // Flag to signal threads to stop
};

// Example task function
void print_message(int id, const std::string& msg) {
    std::this_thread::sleep_for(std::chrono::milliseconds(100)); // Simulate work
    std::cout << "Task " << id << ": " << msg << " (Thread ID: " << std::this_thread::get_id() << ")" << std::endl;
}

int main() {
    ThreadPool pool(4); // Create a thread pool with 4 worker threads

    std::vector<std::future<void>> results; // Store futures to wait for tasks

    for (int i = 0; i < 10; ++i) {
        results.emplace_back(pool.enqueue(print_message, i, "Hello from task!"));
    }

    // Add a task that returns a value
    auto future_int = pool.enqueue([](int a, int b){
        std::this_thread::sleep_for(std::chrono::milliseconds(200));
        std::cout << "Calculating sum: " << a << " + " << b << std::endl;
        return a + b;
    }, 10, 20);

    for (auto& res : results) {
        res.get(); // Wait for all void tasks to complete
    }

    int sum_result = future_int.get(); // Get the result from the integer task
    std::cout << "Sum task result: " << sum_result << std::endl;

    std::cout << "All tasks enqueued and results retrieved. Shutting down pool." << std::endl;
    // Pool destructor will be called here, gracefully shutting down threads.

    return 0;
}
```

**Explanation of steps:**
1.  **`ThreadPool` Class:**
    *   `workers_`: A `std::vector` to hold the `std::thread` objects for the workers.
    *   `tasks_`: A `std::queue` storing `std::function<void()>` objects, which represent the tasks.
    *   `queue_mutex_`: Protects `tasks_` and `stop_`.
    *   `condition_`: Used to signal workers about new tasks or shutdown.
    *   `stop_`: A boolean flag indicating if the pool is in the process of shutting down.
2.  **Constructor (`ThreadPool(size_t num_threads)`):**
    *   Initializes `stop_` to `false`.
    *   Creates `num_threads` worker threads. Each worker thread runs a lambda function.
    *   **Worker Thread Logic:**
        *   Enters an infinite `while(true)` loop.
        *   Acquires `queue_mutex_` using `std::unique_lock`.
        *   `condition_.wait(lock, [this] { return !tasks_.empty() || stop_; });`: The worker waits here. It will wake up if `tasks_` is not empty (new task arrived) OR if `stop_` is true (pool is shutting down).
        *   **Termination Check:** If `stop_` is true AND `tasks_` is empty, it means the pool is shutting down and there are no more tasks to process. The worker `return;`s, exiting its loop and terminating the thread.
        *   If a task is available, it `std::move`s the task from the front of `tasks_` and `pop()`s it.
        *   The lock is released (by `unique_lock` going out of scope). This is important: tasks should be executed *outside* the lock to avoid holding the mutex for potentially long-running operations, which would block other threads from adding tasks or accessing the queue.
        *   `task();`: The retrieved task is executed.
3.  **`enqueue()` Method:**
    *   This templated method allows adding any callable object (function, lambda, functor) with any arguments.
    *   It uses `std::packaged_task` and `std::future` to allow the caller to retrieve the result of the asynchronous task.
    *   Acquires `queue_mutex_`.
    *   Checks `stop_` to prevent enqueuing tasks after shutdown has begun.
    *   `tasks_.emplace([task]() { (*task)(); });`: Wraps the `packaged_task` in a `std::function<void()>` and adds it to the queue.
    *   `condition_.notify_one();`: Notifies *one* waiting worker that a new task is available. `notify_one()` is usually sufficient here because only one worker is needed per task.
    *   Returns the `std::future` associated with the task.
4.  **Destructor (`~ThreadPool()`):**
    *   This is crucial for graceful shutdown.
    *   Acquires `queue_mutex_`.
    *   `stop_ = true;`: Sets the flag to signal workers to stop.
    *   `condition_.notify_all();`: Wakes up *all* waiting worker threads. This is necessary because some workers might be waiting with an empty queue, and they need to be woken to check the `stop_` flag and exit.
    *   Releases the lock.
    *   Iterates through `workers_` and calls `worker.join()`. This ensures that `main` waits for all worker threads to complete their current task and gracefully exit their loops before the program terminates.

**Final Answer:**
The output will show tasks being processed by different worker threads, demonstrating concurrent execution. The `main` function will enqueue tasks, wait for their completion, and then the thread pool will shut down cleanly.

```text
Task 0: Hello from task! (Thread ID: 140736032461568)
Task 1: Hello from task! (Thread ID: 140736024068864)
Task 2: Hello from task! (Thread ID: 140736015676160)
Task 3: Hello from task! (Thread ID: 140736007283456)
Task 4: Hello from task! (Thread ID: 140736032461568)
Task 5: Hello from task! (Thread ID: 140736024068864)
Task 6: Hello from task! (Thread ID: 140736015676160)
Task 7: Hello from task! (Thread ID: 140736007283456)
Task 8: Hello from task! (Thread ID: 140736032461568)
Task 9: Hello from task! (Thread ID: 140736024068864)
Calculating sum: 10 + 20
Sum task result: 30
All tasks enqueued and results retrieved. Shutting down pool.
```

**Reflection:** This example demonstrates a robust and practical application of `std::condition_variable` in a thread pool. Key takeaways include:
*   Using a condition variable to efficiently manage worker thread idle time.
*   The `stop_` flag and `notify_all()` in the destructor for graceful shutdown.
*   Executing tasks *outside* the mutex lock to maximize concurrency and minimize contention.
*   Integrating `std::packaged_task` and `std::future` for retrieving task results.

## 6. Common mistakes and traps

1.  **Using `std::lock_guard` with `cv.wait()`:** `cv.wait()` requires an `std::unique_lock` because it needs to be able to explicitly unlock and re-lock the mutex. `std::lock_guard` does not provide these capabilities (it's designed for simple scope-based locking). Using `std::lock_guard` will result in a compilation error.
    *   *Why it happens:* Students might default to `std::lock_guard` for mutex protection due to its simplicity, unaware of `wait()`'s specific requirements.
2.  **Not holding the mutex when modifying the shared condition:** Any shared data (including the boolean flag or state that the condition variable depends on) *must* be accessed and modified while holding the associated mutex. Failing to do so leads to race conditions and undefined behavior.
    *   *Why it happens:* Forgetting that the mutex protects the *data*, not just the condition variable.
3.  **Not re-checking the condition after waking up (ignoring spurious wakeups):** A thread can wake up from `cv.wait()` even if `notify_one()` or `notify_all()` wasn't called, or if the condition it's waiting for is not yet true. This is called a spurious wakeup. Always use the predicate overload `cv.wait(lock, predicate)` or check the condition in a `while` loop: `while (!condition) { cv.wait(lock); }`.
    *   *Why it happens:* Misunderstanding the guarantee of `cv.wait()`. It guarantees the mutex is re-acquired, but *not* that the condition is true.
4.  **Not notifying when the condition changes:** If a thread changes the shared condition that other threads are waiting for, but fails to call `notify_one()` or `notify_all()`, the waiting threads will remain blocked indefinitely, leading to a deadlock.
    *   *Why it happens:* Forgetting the "tap on the shoulder" step after making the condition true.
5.  **Incorrect choice between `notify_one()` and `notify_all()`:**
    *   Use `notify_one()` when only one waiting thread needs to proceed (e.g., a single item producer-consumer, or when multiple workers can pick up *any* task).
    *   Use `notify_all()` when multiple waiting threads *must* all proceed (e.g., barrier synchronization), or when multiple threads might be waiting on different conditions that are all affected by a single change (e.g., a bounded buffer where producers wait for space and consumers wait for items, and one event affects both). Using `notify_one()` when `notify_all()` is needed can lead to deadlocks or starvation. Using `notify_all()` when `notify_one()` suffices can cause unnecessary context switching and contention.
    *   *Why it happens:* Not fully considering the multi-threaded interaction and specific requirements of the synchronization pattern.
6.  **`notify()`ing outside the mutex lock (but after condition change):** While it's generally safe and often an optimization to release the mutex *before* calling `notify_one()` or `notify_all()`, the *modification* of the shared condition *must* happen while holding the mutex. Notifying after the lock is released allows the woken thread to acquire the mutex immediately. Notifying *before* releasing the lock might cause the woken thread to immediately block again trying to acquire the same mutex.
    *   *Why it happens:* Confusion about when the lock can be released relative to the notification. The rule is: modify shared state *under lock*, then release lock, then notify.

## 7. Textbook-precise explanation

The `std::condition_variable` class in C++ provides a synchronization primitive that allows threads to wait for a specific condition to become true. It is typically used in conjunction with a `std::mutex` to protect the shared data that represents this condition.

**Definition:**
A `std::condition_variable` object acts as a signaling mechanism. Threads can atomically release a `std::unique_lock` on a `std::mutex`, enter a waiting state, and be unblocked (woken up) either by another thread calling `notify_one()` or `notify_all()` on the same `std::condition_variable`, or spuriously. Upon being unblocked, the thread re-acquires the `std::unique_lock` before resuming execution.

**Key Member Functions:**

1.  **`std::condition_variable::wait(std::unique_lock<std::mutex>& lock)`:**
    *   Atomically unlocks `lock` (releasing the underlying `std::mutex`).
    *   Blocks the current thread until it is notified by another thread or experiences a spurious wakeup.
    *   Upon wakeup, it re-acquires `lock` before returning.
    *   **Caveat:** This overload *must* be used in a loop that re-checks the condition, e.g., `while (!condition) { cv.wait(lock); }`, to guard against spurious wakeups.

2.  **`std::condition_variable::wait(std::unique_lock<std::mutex>& lock, Predicate pred)`:**
    *   This is the preferred and safer overload.
    *   It performs the same actions as the first `wait` overload, but additionally checks the `pred` predicate (a callable object that returns `bool`).
    *   If `pred()` returns `true`, the function returns immediately (without waiting).
    *   If `pred()` returns `false`, it atomically unlocks `lock`, blocks, re-acquires `lock` upon wakeup, and then re-evaluates `pred()`. This loop continues until `pred()` returns `true`.
    *   This overload inherently handles spurious wakeups and ensures the condition is met before the thread proceeds.

3.  **`std::condition_variable::notify_one()`:**
    *   Unblocks one of the threads currently waiting on the `std::condition_variable`. If multiple threads are waiting, the choice of which thread is unblocked is unspecified.
    *   If no threads are waiting, the call has no effect.

4.  **`std::condition_variable::notify_all()`:**
    *   Unblocks all threads currently waiting on the `std::condition_variable`.
    *   If no threads are waiting, the call has no effect.

**Usage Pattern:**
A typical usage pattern for `std::condition_variable` involves:

**Waiting Thread:**
1.  Acquire a `std::unique_lock` on the `std::mutex` associated with the shared condition.
2.  Call `cv.wait(lock, [&]{ return condition_is_true; });`. The predicate ensures that the thread waits only if the condition is false and automatically re-checks it upon wakeup.
3.  Once `wait` returns, the `lock` is held, and `condition_is_true` is guaranteed to be true. The thread can safely access the shared data.
4.  Release the `lock` (either explicitly or by scope exit).

**Notifying Thread:**
1.  Acquire a `std::unique_lock` (or `std::lock_guard`) on the same `std::mutex` to protect the shared condition.
2.  Modify the shared data such that the condition becomes true.
3.  Release the `lock` (often explicitly before notifying, or by scope exit).
4.  Call `cv.notify_one()` or `cv.notify_all()`.

**Relationship with `std::mutex`:**
The `std::condition_variable` does *not* protect the shared data itself. Its sole purpose is to manage thread waiting and notification. The `std::mutex` is indispensable for ensuring exclusive access to the shared condition variable(s) and any other shared data that determines the condition, thereby preventing race conditions.

**Reference:**
*   **ISO/IEC 14882:2020 (C++20 Standard)**, Section [thread.condition.condvar]
*   **Anthony Williams, *C++ Concurrency in Action*, 2nd Edition**, Manning Publications, Chapter 4.
*   **Bjarne Stroustrup, *The C++ Programming Language, 4th Edition***, Addison-Wesley, Chapter 42.

## 8. ASCII diagrams

Here's an ASCII diagram illustrating the interaction between a Producer, a Consumer, a shared queue, a Mutex, and a Condition Variable.

```text
+---------------------+                      +---------------------+
|   Producer Thread   |                      |   Consumer Thread   |
+---------------------+                      +---------------------+
          |                                            |
          | (1) Acquire Mutex                          | (1) Acquire Mutex
          |      (std::unique_lock)                    |      (std::unique_lock)
          V                                            V
+---------------------+                      +---------------------+
|     Shared Data     |                      |     Shared Data     |
|     (e.g., Queue)   |                      |     (e.g., Queue)   |
|     +-----------+   |                      |     +-----------+   |
|     |           |   |                      |     |           |   |
|     |   Mutex   |<--+--------------------->|   Mutex   |   |
|     |           |   |       Protects       |           |   |
|     +-----------+   |                      +-----------+   |
|           ^         |                            ^         |
|           |         |                            |         |
|           |         |                            |         |
| (2) Modify Shared   |                      | (2) Check Condition |
|     Condition       |                      |     (e.g., Queue not empty)
|     (e.g., add item)|                      |