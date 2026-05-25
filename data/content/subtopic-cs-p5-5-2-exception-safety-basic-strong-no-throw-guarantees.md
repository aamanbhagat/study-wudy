## What it is
Exception safety describes the guarantees a piece of code provides about the program's state if that code throws an exception. These guarantees are categorized into three main levels: the basic guarantee ensures no resources are leaked and the program is in a valid state; the strong guarantee ensures that if an operation fails, the state is rolled back as if the operation was never called; the no-throw guarantee promises that an operation will never throw an exception.

## Why it matters
In high-reliability systems like flight control software or physics simulation engines, a failure in one component cannot be allowed to corrupt the entire system state. For example, if a function processing telemetry data from a sensor fails due to memory allocation, it must not leave the primary data buffer in a corrupted, unusable state (strong guarantee). Similarly, fundamental operations in a numerical solver must be robust; a failure during a matrix update shouldn't leave the matrix in a mathematically inconsistent form (basic guarantee).

## When to study it
Before tackling this, you must have a solid grasp of:
1.  **C++ Exceptions:** The mechanics of `try`, `catch`, and `throw`.
2.  **RAII (Resource Acquisition Is Initialization):** The fundamental C++ pattern for resource management using constructors and destructors (e.g., `std::unique_ptr`, `std::vector`).
3.  **Class Design:** Constructors (especially copy/move), destructors, and assignment operators.
4.  **The `noexcept` specifier:** What it means and how it interacts with the type system.

If you are not confident in these, pause and review them first.

## How to study it (step by step)
1.  **Write an unsafe class.** Create a simple class that manages a dynamic array of integers with a raw pointer (`int* data_`), a size (`size_t size_`), and a capacity (`size_t capacity_`).
2.  **Implement a naive `push_back`.** Write a `push_back` method that, if capacity is reached, allocates a new larger array, copies the old elements, adds the new one, and then `delete[]`s the old array. Intentionally write it in an order where state (`size_`) is modified *before* an operation that can throw (e.g., copying elements which might have a throwing copy constructor, although for `int` it won't).
3.  **Achieve the Basic Guarantee.** Refactor the `push_back` to ensure that if `new` throws `std::bad_alloc`, no memory is leaked and the object's invariants (e.g., `data_` points to a valid block of memory of `capacity_` integers) still hold. The object should be destructible, even if its contents are not what you expect.
4.  **Achieve the Strong Guarantee.** Refactor `push_back` again using the **copy-and-swap idiom**. Perform all work that can possibly throw on a temporary copy. Only when all dangerous work has succeeded, swap the state of the temporary with your object's current state using a `noexcept` swap function.
5.  **Implement a `noexcept` swap.** Write a `swap` member function that takes another object by reference and swaps all the raw members (`data_`, `size_`, `capacity_`). Mark this function `noexcept` and understand why it can be marked as such (swapping pointers and integers does not throw).
6.  **Analyze standard library containers.** Read the documentation for `std::vector::push_back`. Note the exception safety guarantees it provides and reason about why it can (or cannot) provide the strong guarantee. (Hint: it depends on the move constructor of the element type).

## Key ideas, with intuition
1.  **Guarantees are Contracts.** Exception safety is not about preventing exceptions. It's a contract your function makes with its callers: "If I fail, I promise to leave your program in one of these predictable states." This allows for the composition of robust systems.

2.  **Basic Guarantee: "Cleanup"**.
    *   **Intuition:** The operation failed, and the object's value might have changed, but nothing is broken. No memory is leaked, no invariants are violated, and the object can be safely destroyed.
    *   **Example:** A function to apply a filter to an image in-place. If it runs out of memory halfway through, it might stop, leaving the image half-filtered. The image data structure is still valid (no dangling pointers), but its content is neither the original nor the fully filtered result.

3.  **Strong Guarantee: "Commit or Rollback"**.
    *   **Intuition:** This is transactional. Either the operation succeeds completely, or it fails in a way that the program state is precisely as it was before the operation was called.
    *   **Implementation:** The key is to separate operations that can throw from operations that modify state. Do all the potentially-throwing work "on the side" (e.g., in a temporary object). If all that succeeds, commit the changes with operations that cannot throw (like a `noexcept` swap).
    $$
    \text{State}_{\text{final}} =
    \begin{cases}
    \text{State}_{\text{success}} & \text{if operation succeeds} \\
    \text{State}_{\text{initial}} & \text{if operation throws}
    \end{cases}
    $$

4.  **No-Throw Guarantee: "Bedrock"**.
    *   **Intuition:** This operation is guaranteed not to throw an exception.
    *   **Significance:** These are the essential building blocks for the strong guarantee. Destructors, `swap` functions, and move operations are primary candidates for `noexcept`. A throwing destructor is a critical error, as it can cause `std::terminate` if an exception is already being handled.

## Worked example
Let's implement a `push_back` for a simple `Vector` class, aiming for the strong guarantee.

```cpp
#include <algorithm> // For std::copy
#include <utility>   // For std::swap

class Vector {
public:
    Vector() : data_(nullptr), size_(0), capacity_(0) {}
    ~Vector() { delete[] data_; }

    // ... other functions ...

    void push_back(int value) {
        if (size_ == capacity_) {
            // 1. Decide new capacity. Can't throw.
            size_t new_cap = (capacity_ == 0) ? 1 : capacity_ * 2;

            // 2. Perform throwing operations on a temporary.
            //    This `new` can throw std::bad_alloc.
            int* new_data = new int[new_cap];

            // 3. Copy existing data. For `int`, this won't throw.
            //    If this were a vector of objects, their copy constructor could throw.
            std::copy(data_, data_ + size_, new_data);

            // --- The "commit" point. No exceptions can be thrown beyond this line. ---

            // 4. Update state using non-throwing operations.
            std::swap(data_, new_data); // noexcept swap
            size_++;
            capacity_ = new_cap;
            data_[size_ - 1] = value;   // Place the new value

            // 5. Clean up the old resource.
            delete[] new_data; // `new_data` now holds the old pointer
        } else {
            data_[size_] = value;
            size_++;
        }
    }

    void swap(Vector& other) noexcept {
        using std::swap;
        swap(data_, other.data_);
        swap(size_, other.size_);
        swap(capacity_, other.capacity_);
    }

private:
    int* data_;
    size_t size_;
    size_t capacity_;
};
```

**Reflection:**
*   **Step 1 & 2:** We allocate new memory and store it in a temporary pointer `new_data`. If `new` throws, our object's state (`this->data_`, `this->size_`, etc.) has not been touched. The state is exactly as it was before the call. This is the rollback.
*   **Step 3:** We copy the data. If an exception occurred here (e.g., if we were copying objects with throwing copy constructors), we would leak the memory allocated in `new_data`. A `std::unique_ptr` would fix this, but for this example, we keep it simple.
*   **Step 4:** This is the critical part. Only after all potentially throwing operations succeed do we modify the object's state. `std::swap` on raw pointers is `noexcept`. Incrementing integers is `noexcept`.
*   **Step 5:** The `delete[]` cleans up the old data, which is now held by the `new_data` pointer after the swap.

This structure ensures that if any part of the reallocation fails, the original `Vector` object remains unchanged, thus providing the strong exception guarantee.

## Diagrams
Here is the state of our `Vector` object during a `push_back` that requires reallocation.

**Initial State:** `v.push_back(30)` is called.
```text
v:
  data_ -------> [ 10 | 20 ]
  size_ = 2
  capacity_ = 2
```

**During Operation (After `new`, before `swap`):** A temporary buffer is created.
```text
v:
  data_ -------> [ 10 | 20 ]
  size_ = 2
  capacity_ = 2

new_data ------> [ 10 | 20 | ?? | ?? ]  (memory for new element is uninitialized)

// If an exception happens NOW, `new_data` is leaked. The original `v` is untouched.
// A smart pointer (`std::unique_ptr`) would solve the leak.
```

**Final State (After `swap` and commit):** The internal pointer is swapped, state is updated.
```text
v:
  data_ -------> [ 10 | 20 | 30 | ?? ]
  size_ = 3
  capacity_ = 4

// The old buffer [10, 20] is now held by the local pointer `new_data`
// and will be deleted before the function returns.
```

## Memory technique — remember this forever
1.  **Analogy:** A space mission maneuver.
    *   **Basic Guarantee:** A thruster firing goes wrong. The burn is aborted. The spacecraft is not destroyed (no resource leak) and is in a stable, controllable orbit (valid state), but it's not the *target* orbit.
    *   **Strong Guarantee:** Calculating a trajectory correction. The flight computer calculates the *entire* burn plan. If it succeeds, it uploads the plan to the engine controller (commit). If it fails (e.g., runs out of memory), it discards the plan, and the original trajectory remains active (rollback).
    *   **No-Throw Guarantee:** Switching between primary and backup flight computers. This must be an atomic, infallible operation.

2.  **Overlearn these facts:**
    *   **Basic:** Invariants hold. No resource leaks.
    *   **Strong:** Commit or rollback. State is unchanged on failure.
    *   **No-throw:** `noexcept`. Cannot fail.

3.  **Spaced Repetition Schedule:** Review this topic in your notes at **1 day, 3 days, 7 days, 16 days, and 35 days**. Each time, try to re-derive the strong `push_back` from scratch.

4.  **First Principles Pathway:** If you forget, start here: "How do I modify an object's state when the modification might fail?"
    *   If I modify state directly, a failure halfway through leaves a corrupt state. That's bad.
    *   So, I must do all the failing work *first*, without touching my real state.
    *   This means working on a temporary copy or new data structure.
    *   Once all that work succeeds, I need to apply the changes to my object.
    *   This "apply" step must not fail. A fast, `noexcept` `swap` is the perfect tool. This logic rebuilds the copy-and-swap idiom and the strong guarantee.

## Common mistakes
1.  **Modifying state before throwing operations.** The most common error. For example, incrementing `size_` *before* allocating memory. If `new` throws, your `size_` is now incorrect, violating the object's invariant.
2.  **Writing throwing destructors.** A destructor must never allow an exception to escape. If an exception is thrown during the handling of another exception (stack unwinding), the program calls `std::terminate`. Always wrap throwing calls inside a destructor with a `try`/`catch(...)` block if you absolutely must call them.
3.  **Assuming copy/move operations are `noexcept`.** A copy constructor for a complex type might need to allocate memory and can throw `std::bad_alloc`. A move constructor *should* be `noexcept`, but isn't guaranteed to be unless you mark it. The exception safety of generic code (like `std::vector`) often depends on the guarantees of the types it contains.

## Self-check
1.  What is the difference between the state of an object after a failed operation that provides the basic guarantee versus one that provides the strong guarantee?
2.  Take the `Vector` class from the worked example. Implement a `resize` method that provides the strong exception safety guarantee. Consider the cases where the new size is smaller, the same, and larger than the current size.
3.  The copy-and-swap idiom is a general pattern for implementing the assignment operator (`operator=`). Write a correct copy assignment operator for the `Vector` class that provides the strong guarantee and correctly handles self-assignment. Explain why your implementation is strong-safe.