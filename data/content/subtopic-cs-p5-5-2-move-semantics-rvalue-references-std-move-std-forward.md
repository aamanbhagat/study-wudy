## What it is
Move semantics is a C++ feature for transferring ownership of resources (like heap-allocated memory) from one object to another without performing a costly copy. It introduces a new type of reference, the *rvalue reference* (`&&`), which binds to temporary, expiring objects (rvalues). This allows us to write special "move" functions that efficiently "steal" the resources from the temporary object, leaving it in a valid but empty state.

## Why it matters
In high-performance domains, avoiding unnecessary data copies is critical. In physics simulations, you might pass large state vectors or matrices between functions; moving them is orders of magnitude faster than copying. In machine learning, training data or model parameters can be gigabytes in size; move semantics ensures that returning a newly trained model from a function doesn't trigger a multi-gigabyte copy, but rather a near-instantaneous pointer swap.

## When to study it
You must be comfortable with the following concepts before tackling move semantics. If not, master them first.
1.  **Value Categories:** You must have a rock-solid understanding of the difference between lvalues (objects with a name/address that persist) and rvalues (temporary, unnamed values like `42` or the return value of a function).
2.  **RAII (Resource Acquisition Is Initialization):** You should have written classes that manage a resource (e.g., a file handle or dynamic memory) where the constructor acquires the resource and the destructor releases it.
3.  **The Rule of Three:** You must understand and have implemented the copy constructor, copy assignment operator, and destructor for a resource-managing class. Move semantics extends this to the "Rule of Five".
4.  **Function Overloading:** You need to understand how the compiler chooses which version of a function to call based on the arguments' types.

## How to study it (step by step)
1.  **Feel the Pain:** Implement a simple `DynamicArray` class that manages a raw array on the heap. Implement the Rule of Three (destructor, copy constructor, copy assignment). In your `main`, create a `DynamicArray`, put it inside a `std::vector`, and observe the number of expensive deep copies being made.
2.  **Introduce Rvalue References:** Read about the `&&` syntax. Write simple functions like `void foo(int&)` and `void foo(int&&)` and experiment with calling them with lvalues (`int x = 5; foo(x);`) and rvalues (`foo(5);`) to see which overload gets called. This builds intuition for how the compiler distinguishes them.
3.  **Implement the Rule of Five:** Add a move constructor (`DynamicArray(DynamicArray&& other)`) and a move assignment operator (`operator=(DynamicArray&& other)`) to your class. The key is to *steal* the internal pointer from `other` and then set `other`'s pointer to `nullptr`. This is the "move".
4.  **Use `std::move`:** Now, in `main`, create a `DynamicArray` named `arr1`. Explicitly call the move constructor by writing `DynamicArray arr2 = std::move(arr1);`. Verify that `arr2` now owns the data and `arr1` is empty. Understand that `std::move` is just a cast that says "treat this lvalue as if it were an rvalue".
5.  **Explore Perfect Forwarding:** Write a simple template function `template<typename T> void relay(T&& arg)`. Inside, call another function with `std::move(arg)` and then with `std::forward<T>(arg)`. Observe the difference when `relay` is called with lvalues vs. rvalues. This will reveal the purpose of `std::forward`: to preserve the original value category of the argument.

## Key ideas, with intuition
1.  **Lvalues vs. Rvalues (Location vs. Value):** The core distinction. An **lvalue** has a stable memory location and a name; you can take its address. Think of it as a house. A **rvalue** is a temporary value, about to be destroyed. Think of it as a package in mid-air, being thrown from one person to another. You can't take its address because it has no permanent home.
    $$
    \begin{align*}
    \text{int x = 10;} \quad &// \text{x is an lvalue, 10 is an rvalue} \\
    \text{std::string s = "hello";} \quad &// \text{s is an lvalue, "hello" is an rvalue} \\
    \text{get_vector()} \quad &// \text{The returned object is an rvalue}
    \end{align*}
    $$

2.  **Rvalue References (`&&`) are Vultures:** An rvalue reference `T&&` can *only* bind to an rvalue. This is powerful. It lets us write function overloads that are specifically for temporary objects. Since we know the temporary object is about to die, we can safely scavenge or "steal" its internal resources without affecting any other part of the program.

3.  **Move is a Cheap Heist, Copy is an Expensive Forgery:** A copy operation reads the source data and makes a completely new, identical version. This is slow for large objects. A move operation just swaps internal pointers and size variables. The source object is left in a valid but empty state. It's a heist: you take the contents and leave the empty shell.

4.  **`std::move` is a Promise to Destroy:** `std::move(x)` does not move `x`. It is a static cast to an rvalue reference. It tells the compiler, "I give you permission to treat `x` as a temporary rvalue, even though it's an lvalue with a name. I promise I am done with its current state and you can cannibalize it." The actual move happens in the constructor or assignment operator that `std::move` allows the compiler to select.

5.  **`std::forward` is a Discerning Messenger:** In a template function `template<typename T> void f(T&& param)`, `param` itself is always an lvalue (it has a name). If you want to pass `param` to another function while preserving its original "rvalue-ness" or "lvalue-ness", you use `std::forward<T>(param)`. It's a conditional cast: it becomes an rvalue cast only if the original argument passed to `f` was an rvalue. This enables "perfect forwarding".

## Worked example
Let's implement a simplified `Buffer` class that manages a dynamic array of doubles.

```cpp
#include <iostream>
#include <utility> // For std::move
#include <algorithm> // For std::copy

class Buffer {
public:
    // Default constructor
    Buffer(size_t size = 0) : m_size(size), m_data(size ? new double[size] : nullptr) {
        std::cout << "Default constructing Buffer of size " << m_size << "\n";
    }

    // 1. Copy Constructor (expensive deep copy)
    Buffer(const Buffer& other) : m_size(other.m_size), m_data(new double[other.m_size]) {
        std::cout << "COPY constructing from another Buffer\n";
        std::copy(other.m_data, other.m_data + m_size, m_data);
    }

    // 2. Move Constructor (cheap pointer swap)
    Buffer(Buffer&& other) noexcept : m_size(0), m_data(nullptr) {
        std::cout << "MOVE constructing from another Buffer\n";
        // Steal the data
        m_size = other.m_size;
        m_data = other.m_data;
        // Leave the source empty
        other.m_size = 0;
        other.m_data = nullptr;
    }

    // Destructor
    ~Buffer() {
        std::cout << "Destructing Buffer\n";
        delete[] m_data;
    }

private:
    size_t m_size;
    double* m_data;
};

Buffer create_buffer(size_t size) {
    return Buffer(size); // Creates a Buffer and returns it
}

int main() {
    std::cout << "--- Scenario 1: Copying --- \n";
    Buffer b1(1000); // Default constructor
    Buffer b2 = b1;  // Triggers COPY constructor

    std::cout << "\n--- Scenario 2: Moving --- \n";
    // create_buffer(1000) returns a temporary object (an rvalue)
    // This rvalue is used to initialize b3, triggering the MOVE constructor
    Buffer b3 = create_buffer(1000); 

    std::cout << "\n--- Scenario 3: Explicit move with std::move --- \n";
    Buffer b4(1000);
    // We cast b4 to an rvalue reference, allowing the move constructor to be called
    Buffer b5 = std::move(b4); 
    // IMPORTANT: b4 is now in a valid but empty state. Do not use its data.

    return 0;
}
```

**Reflection:**
*   In `Scenario 1`, `b2 = b1` invoked the copy constructor. This allocated a new block of 1000 doubles and copied all 1000 values. This is slow.
*   In `Scenario 2`, `create_buffer` returned a temporary `Buffer` object. The compiler saw that this temporary was being used to initialize `b3` and would be destroyed immediately after. It chose the `Buffer(Buffer&&)` overload, the move constructor. This avoided any allocation or copying, simply transferring the pointer from the temporary to `b3`.
*   In `Scenario 3`, `b4` is an lvalue. We cannot normally move from it. `std::move(b4)` cast it to an rvalue reference, telling the compiler it was safe to cannibalize `b4` to create `b5`. This triggered the move constructor, making `b5` take ownership of `b4`'s data.

## Diagrams

**Copy Semantics: Expensive Forgery**
Two independent objects, each with its own resource.

```text
Before copy:
b1 (stack)           Heap
+----------+      +------------------+
| m_size=4 |      | [1.1, 2.2, 3.3, 4.4] |
| m_data   |----->+------------------+
+----------+

After `Buffer b2 = b1;`
b1 (stack)           Heap
+----------+      +------------------+
| m_size=4 |      | [1.1, 2.2, 3.3, 4.4] |
| m_data   |----->+------------------+
+----------+

b2 (stack)           Heap (New allocation!)
+----------+      +------------------+
| m_size=4 |      | [1.1, 2.2, 3.3, 4.4] |
| m_data   |----->+------------------+
+----------+
```

**Move Semantics: Cheap Heist**
Ownership of the resource is transferred.

```text
Before move:
source_obj (rvalue)    Heap
+----------+      +------------------+
| m_size=4 |      | [1.1, 2.2, 3.3, 4.4] |
| m_data   |----->+------------------+
+----------+

After `Buffer dest_obj = std::move(source_obj);`
dest_obj (stack)       Heap (Same block, no copy)
+----------+      +------------------+
| m_size=4 |      | [1.1, 2.2, 3.3, 4.4] |
| m_data   |----->+------------------+
+----------+

source_obj (emptied)
+-----------+
| m_size=0  |
| m_data=nullptr |
+-----------+
```

## Memory technique — remember this forever
1.  **The Mnemonic Story: "The Resource Raider"**
    Think of an object's resource (like heap memory) as a treasure chest.
    -   A **copy** is like meticulously building an identical chest and filling it with identical treasure. It's slow and expensive.
    -   An **rvalue** is a treasure chest about to be thrown into a volcano (it's a temporary).
    -   A **move constructor** is a Resource Raider who sees the chest about to be destroyed, swoops in, grabs the treasure map (the pointer), and runs. The empty chest (the source object) falls into the volcano.
    -   **`std::move(my_chest)`** is you, pointing to your own perfectly safe chest and telling the Raider, "You have my permission to raid this one. I'm done with it."

2.  **Formulas to Overlearn:**
    *   Move Constructor Signature: `ClassName(ClassName&& other) noexcept;`
    *   Move Assignment Signature: `ClassName& operator=(ClassName&& other) noexcept;`
    *   The Casts: `static_cast<T&&>(lvalue)` is what `std::move` does. `std::forward` is a conditional version for templates.

3.  **Spaced Repetition Schedule:**
    Review the "Resource Raider" story and the signatures above at these intervals:
    -   1 day
    -   3 days
    -   7 days
    -   16 days
    -   35 days
    Each time, re-implement the `Buffer` example from scratch without looking.

4.  **First Principles Pathway:**
    If you forget everything, rebuild from this question: "Copying big things is slow. How can I avoid it when I know the source object is just a temporary that's about to be destroyed?"
    -   This implies you need a way to *differentiate* between persistent objects (lvalues) and temporary ones (rvalues).
    -   This implies you need a special function that *only* gets called for rvalues.
    -   This leads to the invention of a new reference type that only binds to rvalues: `T&&`.
    -   The implementation of that special function would obviously not copy, but *steal* the guts of the temporary. This is the move constructor.
    -   Finally, what if you want to steal from a non-temporary? You need a way to tell the compiler to *treat* it like a temporary. This is `std::move`.

## Common mistakes
1.  **Thinking `std::move` moves anything.** It's a cast. It's a signal. The actual move logic is in a constructor or assignment operator that is *selected* because of the cast.
2.  **Using a moved-from object.** After `auto y = std::move(x);`, object `x` is in a "valid but unspecified" state. It can be safely destroyed or assigned a new value, but you must not read from it. Assuming `x` is null or empty is not guaranteed by the standard, though it's a common implementation.
3.  **Using `std::move` when returning a local variable.** In `Buffer create_buffer() { Buffer b; return b; }`, the compiler performs Named Return Value Optimization (NRVO) and constructs `b` directly in the caller's memory frame. Adding `return std::move(b);` can disable this optimization and force an actual move, making your code slower. Don't "help" the compiler here.
4.  **Forgetting `noexcept` on move operations.** Move operations should not throw exceptions. If they can, the standard library containers (like `std::vector`) may refuse to use them during operations like resizing, falling back to slower copy operations for safety.

## Self-check
1.  What is the output of the following code? Explain exactly which constructor is called on each line and why.
    ```cpp
    #include <iostream>
    struct Widget {
        Widget() { std::cout << "D "; }
        Widget(const Widget&) { std::cout << "C "; }
        Widget(Widget&&) { std::cout << "M "; }
    };
    Widget make_widget() { return Widget(); }
    int main() {
        Widget w1;
        Widget w2 = w1;
        Widget w3 = make_widget();
        Widget w4 = std::move(w1);
    }
    ```
2.  You have a class `Matrix` that manages a large 2D array on the heap. Implement the move constructor `Matrix(Matrix&& other) noexcept;` and the move assignment operator `Matrix& operator=(Matrix&& other) noexcept;`. Ensure your implementation correctly transfers ownership and leaves the source matrix in a valid, empty state.

3.  Consider the following template function designed to log a value and then pass it on to another function.
    ```cpp
    void process(const std::string& s);
    void process(std::string&& s);

    template<typename T>
    void log_and_process(T&& arg) {
        std::cout << "Logging: " << arg << std::endl;
        process(???); // What goes here?
    }
    ```
    What should replace `???` to ensure that if `log_and_process` is called with an lvalue, `process(const std::string&)` is called, and if it's called with an rvalue, `process(std::string&&)` is called? Explain why `process(arg)` and `process(std::move(arg))` are both incorrect.