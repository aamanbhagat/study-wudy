## 1. What it is — in plain English

Imagine you're at a library, and you've promised the librarian you'll be absolutely silent. You're making a strong guarantee: "I will not make any noise." If you accidentally drop a book, you might just quietly pick it up. But if you suddenly shout, you've broken your promise, and the librarian might immediately kick you out, no questions asked.

In C++ programming, the `noexcept` specifier is like making that "silent" promise about a function. When you declare a function as `noexcept`, you are telling the compiler (and other programmers) that this function will *never* throw an exception. An "exception" is C++'s way of signaling a serious problem that prevents the function from completing its normal job, like trying to divide by zero or running out of memory.

So, `noexcept` is a way for a function to say, "I guarantee I won't throw an error that needs to be caught." If, despite this promise, the function *does* try to throw an exception, the program doesn't try to "catch" it or recover gracefully. Instead, the program immediately stops running, calling a special function called `std::terminate()`. It's like being instantly kicked out of the library for breaking your silence promise.

This promise might seem strict, but it allows the compiler to make important optimizations and helps other parts of your program make smarter decisions, especially when dealing with performance-critical operations or managing resources.

## 2. Why it matters — real-world applications

The `noexcept` specifier isn't just a theoretical nicety; it has profound implications for performance, reliability, and the design of robust C++ systems, particularly in domains where every nanosecond and every resource counts.

1.  **High-Performance Computing (HPC) and Scientific Simulations**: In fields like computational fluid dynamics, molecular dynamics, or quantum mechanics, simulations often run for days or weeks, processing petabytes of data. Functions that handle core data structures, memory management, or numerical operations are frequently marked `noexcept`. This allows compilers to generate highly optimized code, knowing they don't need to generate "exception unwinding" mechanisms. For example, a custom `Vector` class used in a physics engine might have its move constructor declared `noexcept` to ensure `std::vector` can perform fast reallocations without falling back to slower copy operations.
2.  **Operating Systems and Embedded Systems**: Operating systems kernels (like parts of Linux or Windows) and firmware for embedded devices (e.g., in medical equipment, automotive control units, or aerospace systems) operate under extremely tight constraints. An unexpected exception could lead to system instability, security vulnerabilities, or even catastrophic failure. Core memory allocation routines, interrupt handlers, and low-level drivers are often designed to be exception-free, and `noexcept` provides a compile-time guarantee of this, allowing for simpler, faster, and more predictable execution paths. For instance, a critical flight control system's sensor data processing function would ideally be `noexcept` to ensure predictable behavior and avoid state corruption from an unhandled exception.
3.  **Game Engines and Real-time Graphics**: Modern game engines (e.g., Unreal Engine, Unity) demand peak performance to render complex scenes at high frame rates. Data structures holding game objects, physics entities, or graphical assets frequently need to be resized or moved efficiently. If a class's move constructor or move assignment operator is not `noexcept`, standard library containers like `std::vector` might defensively choose to *copy* elements instead of *moving* them when resizing, just in case a move operation throws an exception, leading to a partially moved, corrupted state. Marking these as `noexcept` enables the container to safely perform the much faster move operations, directly impacting frame rates and responsiveness.
4.  **Financial Trading Systems (High-Frequency Trading)**: In high-frequency trading, algorithms execute millions of trades per second, where latency is measured in microseconds. The overhead associated with exception handling (stack unwinding, searching for handlers) is unacceptable. Core components that manage order books, process market data, or execute trades are meticulously designed to be exception-free, and `noexcept` is used to enforce these guarantees at compile time, ensuring predictable, low-latency execution.
5.  **Machine Learning Frameworks**: While high-level ML code might use Python, the underlying performance-critical kernels (e.g., in TensorFlow, PyTorch) are written in C++. Operations that manipulate large tensors, perform matrix multiplications, or manage GPU memory might use `noexcept` to ensure their fundamental operations are as fast and predictable as possible. For example, a custom memory allocator for GPU buffers might guarantee `noexcept` to avoid performance penalties.

## 3. Prerequisites — what you must know first

To fully grasp the `noexcept` specifier, you should have a solid understanding of several fundamental C++ concepts. If any of these are unfamiliar, pause and review them first.

*   **Functions**: The basic building blocks of C++ programs, encapsulating a sequence of operations.
*   **Return Types and Parameters**: How functions receive input and provide output.
*   **Exceptions (Throwing and Catching)**: C++'s mechanism for handling runtime errors, involving `throw`, `try`, and `catch` keywords. Understanding how exceptions unwind the call stack is crucial.
*   **Stack Unwinding**: The process where a C++ runtime searches for an exception handler by successively destroying local objects and exiting function scopes up the call stack.
*   **Destructors**: Special member functions that clean up resources held by an object when it goes out of scope or is deleted. They are critical for resource management.
*   **Resource Acquisition Is Initialization (RAII)**: A C++ programming idiom where resource management (memory, file handles, network connections) is tied to object lifetime, typically handled in constructors and destructors.
*   **Move Semantics (Move Constructors and Move Assignment Operators)**: C++11 feature that allows resources to be "moved" from one object to another efficiently, rather than copied, especially important for large objects or containers.
*   **`std::terminate()`**: A function in the C++ standard library that is called when an exception is thrown but not caught, or when certain other unrecoverable errors occur. It typically aborts the program.
*   **Polymorphism (Virtual Functions)**: The ability to use a base class pointer or reference to call derived class methods, especially relevant when considering `noexcept` with inheritance.

## 4. The core idea — step by step

The `noexcept` specifier is a contract, a promise made by a function to its callers and the compiler. Let's break down its core ideas.

### Step 1: The Problem with Exceptions

**Plain English:** Imagine a long chain of people passing a delicate vase. If someone drops it, they shout "Oops!" and everyone up the chain stops what they're doing, looks around, and tries to figure out how to clean up or recover. This "shouting and stopping" takes time and effort. In C++, this is what happens when an exception is thrown: the program has to stop normal execution, unwind the call stack, destroy objects along the way, and search for a `catch` block. This process is called "exception unwinding" and it has a runtime cost, both in terms of performance overhead and increased code size.

**Example:**
Consider a function `process_data` that calls `read_file`, which in turn calls `parse_line`. If `parse_line` throws an exception, `read_file` must clean up any resources it holds (e.g., close the file), then `process_data` must clean up its resources, and so on, until a `try-catch` block is found.

```cpp
#include <iostream>
#include <string>
#include <vector>

void parse_line(const std::string& line) {
    if (line.empty()) {
        throw std::runtime_error("Empty line encountered!"); // Throws an exception
    }
    std::cout << "Parsed: " << line << std::endl;
}

void read_file(const std::string& filename) {
    std::cout << "Opening file: " << filename << std::endl;
    // Simulate file opening and reading
    std::vector<std::string> lines = {"Line 1", "", "Line 3"}; // One empty line to trigger exception
    for (const auto& line : lines) {
        parse_line(line); // This might throw
    }
    std::cout << "Closing file: " << filename << std::endl;
}

void process_data() {
    try {
        read_file("data.txt"); // This might throw
    } catch (const std::runtime_error& e) {
        std::cerr << "Error in process_data: " << e.what() << std::endl;
    }
}

int main() {
    process_data();
    return 0;
}
```
In this example, when `parse_line` throws, `read_file`'s "Closing file" message is skipped, and `process_data` catches the error. This unwinding mechanism ensures resource cleanup, but it's not free.

**Formal/Mathematical Version:**
The cost of exception handling $C_{exception}$ can be modeled as the sum of:
1.  Code size overhead $O_{code\_size}$ (for metadata tables).
2.  Runtime overhead $O_{runtime}$ (for stack unwinding and handler search).
3.  Potential performance degradation $D_{perf}$ (due to compiler inability to optimize code paths that might throw).
$$ C_{exception} = O_{code\_size} + O_{runtime} + D_{perf} $$
When no exception is thrown, $O_{runtime}$ is often negligible in modern compilers, but $O_{code\_size}$ and $D_{perf}$ can still exist. When an exception *is* thrown, $O_{runtime}$ becomes significant.

**What could go wrong:** If every function potentially throws, the compiler must generate extra code everywhere to handle the possibility of unwinding, making the program larger and potentially slower, even if exceptions are rare.

### Step 2: The Promise — `noexcept`

**Plain English:** The `noexcept` specifier is a way for you, the programmer, to explicitly tell the C++ compiler: "Hey, I promise that this function will *never* throw an exception." This isn't just a comment; it's a formal part of the function's signature. If you make this promise, the compiler knows it doesn't need to generate any exception-handling machinery for that function. It can generate simpler, faster code.

**Example:**
Let's declare a simple function that adds two integers. This operation should never throw an exception.

```cpp
#include <iostream>

// This function promises not to throw any exceptions.
int add_numbers(int a, int b) noexcept {
    return a + b;
}

int main() {
    std::cout << "Sum: " << add_numbers(5, 7) << std::endl;
    return 0;
}
```
Here, `add_numbers` is declared `noexcept`. The compiler can optimize its call knowing there's no need to prepare for an exception.

**Formal/Mathematical Version:**
A function $F$ declared with `noexcept` implies a property $P_{noexcept}(F) = \text{true}$.
If an expression $E$ within $F$ could potentially throw an exception, then $P_{noexcept}(E) = \text{false}$.
The compiler uses $P_{noexcept}(F)$ to optimize the call site of $F$. If $P_{noexcept}(F)$ is true, the compiler can assume that the control flow will not be interrupted by an exception originating from $F$.

**What could go wrong:** If you make this promise (`noexcept`) but then the function *does* try to throw an exception, the program will immediately terminate (call `std::terminate()`). It won't try to catch the exception. This is a severe consequence, indicating a broken contract.

### Step 3: `noexcept` vs. `throw()` (Deprecated)

**Plain English:** Before C++11, there was an older, now deprecated, way to declare that a function wouldn't throw: `throw()`. However, `throw()` was problematic because if a function declared `throw()` *did* throw, the compiler would still try to unwind the stack, which could lead to unexpected behavior and was often slower than just terminating. `noexcept` is a stronger, clearer, and more efficient guarantee. Think of `throw()` as a weak suggestion, and `noexcept` as a binding contract.

**Example:**
```cpp
// DEPRECATED in C++11, removed in C++17
void old_style_function() throw() {
    // This function claims not to throw, but if it does, it's problematic.
    // throw std::runtime_error("Oops!"); // This would still unwind the stack.
}

// Modern C++:
void modern_style_function() noexcept {
    // This function guarantees not to throw.
    // If it does, std::terminate() is called immediately.
}
```

**Formal/Mathematical Version:**
The `throw()` specifier (also known as a *dynamic exception specification*) was a compile-time assertion that an exception of a specified type (or any type if empty) would not be thrown. However, it was enforced at runtime by potentially calling `std::unexpected` if violated, which could then rethrow or call `std::terminate`.
The `noexcept` specifier is a compile-time assertion that the function will not emit an exception. If violated, `std::terminate` is called directly.
$$ \text{`throw()` (deprecated):} \quad \text{Violation} \Rightarrow \text{`std::unexpected`} \Rightarrow \text{unwind/terminate} $$
$$ \text{`noexcept` (modern):} \quad \text{Violation} \Rightarrow \text{`std::terminate`} $$
The key difference is the directness and strength of the guarantee. `noexcept` is part of the function's type, enabling better optimization.

**What could go wrong:** Using `throw()` in modern C++ code is a mistake. It's deprecated for good reasons and can lead to confusing behavior or performance issues compared to `noexcept`.

### Step 4: The `noexcept` Operator (`noexcept(expression)`)

**Plain English:** Sometimes, you don't want to *declare* a function as `noexcept` directly, but rather *ask* the compiler: "If I run this specific piece of code (this 'expression'), will it throw an exception?" The `noexcept` *operator* allows you to do exactly that. It's like asking a librarian, "If I drop this book, will it make a loud noise?" The answer is a `true` or `false` value at compile time. This is incredibly useful for writing generic code that needs to adapt based on whether an operation is exception-safe.

**Example:**
```cpp
#include <iostream>
#include <vector>
#include <string>

void func_that_throws() {
    throw std::runtime_error("I throw!");
}

void func_that_does_not_throw() noexcept {
    // Does nothing, won't throw
}

struct MyClass {
    MyClass() {}
    MyClass(const MyClass&) {} // Copy constructor
    MyClass(MyClass&&) noexcept {} // Move constructor is noexcept
    ~MyClass() noexcept {} // Destructor is noexcept by default
};

int main() {
    // Querying functions:
    std::cout << "noexcept(func_that_throws()): " << std::boolalpha << noexcept(func_that_throws()) << std::endl;
    std::cout << "noexcept(func_that_does_not_throw()): " << std::boolalpha << noexcept(func_that_does_not_throw()) << std::endl;

    // Querying operations:
    MyClass mc1;
    MyClass mc2 = mc1; // Copy construction
    MyClass mc3 = std::move(mc1); // Move construction

    std::cout << "noexcept(MyClass mc = mc1): " << std::boolalpha << noexcept(MyClass(mc1)) << std::endl; // Is copy constructor noexcept?
    std::cout << "noexcept(MyClass mc = std::move(mc1)): " << std::boolalpha << noexcept(MyClass(std::move(mc1))) << std::endl; // Is move constructor noexcept?
    std::cout << "noexcept(mc1.~MyClass()): " << std::boolalpha << noexcept(mc1.~MyClass()) << std::endl; // Is destructor noexcept?

    // Querying built-in operations:
    int a = 5;
    int b = 0;
    std::cout << "noexcept(a + b): " << std::boolalpha << noexcept(a + b) << std::endl; // Arithmetic operations don't throw
    // std::cout << "noexcept(a / b): " << std::boolalpha << noexcept(a / b) << std::endl; // Division by zero is undefined behavior, not an exception
    // The above line is commented out because division by zero is UB, not an exception.
    // The noexcept operator checks for *exceptions*, not UB.

    return 0;
}
```
Output:
```
noexcept(func_that_throws()): false
noexcept(func_that_does_not_throw()): true
noexcept(MyClass mc = mc1): false
noexcept(MyClass mc = std::move(mc1)): true
noexcept(mc1.~MyClass()): true
noexcept(a + b): true
```
This shows how you can query the exception-safety of different expressions at compile time.

**Formal/Mathematical Version:**
The `noexcept` operator is a unary compile-time operator that takes an expression $E$ as its operand. It yields a `bool` value:
$$ \text{`noexcept`}(E) = \begin{cases} \text{true} & \text{if evaluating } E \text{ is guaranteed not to throw an exception} \\ \text{false} & \text{otherwise} \end{cases} $$
This evaluation is done without actually evaluating $E$. It only considers the potential for exceptions. For function calls, it checks the `noexcept` specification of the called function. For other operations (like arithmetic, constructor calls, destructor calls), it checks their implicit or explicit `noexcept` status.

**What could go wrong:** Misunderstanding that `noexcept(expression)` checks for *exceptions*, not for *undefined behavior* (like division by zero or dereferencing a null pointer). These are different categories of errors.

### Step 5: `noexcept` and Move Semantics

**Plain English:** This is one of the most important practical applications of `noexcept`. When you have a `std::vector` (a dynamic array) and it needs to grow larger, it often has to allocate a new, bigger chunk of memory and move all its existing elements from the old location to the new one. If the elements can be *moved* without throwing an exception, `std::vector` will happily perform a very fast "move" operation. But if the move operation *could* throw, `std::vector` gets nervous. It doesn't want to leave itself in a half-moved, corrupted state if an exception occurs mid-way. In such cases, it will play it safe and perform a much slower *copy* operation, which guarantees that if an exception occurs, the original elements are still intact. By marking your move constructors and move assignment operators as `noexcept`, you tell `std::vector` (and other containers) that it's safe to use the faster move operation.

**Example:**
```cpp
#include <iostream>
#include <vector>
#include <string>

struct MyResource {
    std::string name;
    MyResource(std::string n) : name(std::move(n)) {
        // std::cout << "Constructed " << name << std::endl;
    }

    // Move constructor: promises not to throw.
    MyResource(MyResource&& other) noexcept : name(std::move(other.name)) {
        // std::cout << "Moved " << name << " from " << other.name << std::endl;
    }

    // Copy constructor: might throw if string copy fails (unlikely, but possible)
    MyResource(const MyResource& other) : name(other.name) {
        // std::cout << "Copied " << name << std::endl;
    }

    // Destructor (implicitly noexcept for basic types, but good practice to be explicit for complex objects if truly noexcept)
    ~MyResource() noexcept {
        // std::cout << "Destroyed " << name << std::endl;
    }
};

int main() {
    // Check if MyResource's move constructor is noexcept
    std::cout << "Is MyResource's move constructor noexcept? "
              << std::boolalpha << noexcept(MyResource(std::declval<MyResource&&>())) << std::endl;

    // A std::vector of MyResource objects
    std::vector<MyResource> resources;
    resources.reserve(3); // Pre-allocate to avoid reallocations initially

    resources.emplace_back("R1");
    resources.emplace_back("R2");
    resources.emplace_back("R3");

    std::cout << "\nVector current capacity: " << resources.capacity() << std::endl;

    // Now, force a reallocation. std::vector will try to move elements
    // because MyResource's move constructor is noexcept.
    std::cout << "Adding R4, forcing reallocation...\n";
    resources.emplace_back("R4"); // This will trigger a reallocation (capacity typically doubles)

    std::cout << "Vector new capacity: " << resources.capacity() << std::endl;

    // If MyResource's move constructor was NOT noexcept, std::vector might copy instead.
    // To demonstrate, try commenting out 'noexcept' on the move constructor and observe behavior
    // (though std::string itself has a noexcept move constructor, so the example might not
    // show a copy fallback unless MyResource itself does something that throws).
    // The key is that std::vector *queries* noexcept(T&&) to decide.

    return 0;
}
```
In this example, because `MyResource(MyResource&&)` is `noexcept`, `std::vector` can confidently use it for reallocations, leading to better performance. If `noexcept` was omitted, `std::vector` would check `std::is_nothrow_move_constructible<MyResource>::value` (which would be false without `noexcept`) and might fall back to copying, which is slower.

**Formal/Mathematical Version:**
For a standard library container like `std::vector<T>`, when it needs to reallocate its internal buffer and move elements from the old buffer to the new one, it typically performs a check:
$$ \text{if } \text{`std::is_nothrow_move_constructible<T>::value` is true} $$
$$ \text{then use move construction for elements} $$
$$ \text{else if } \text{`std::is_copy_constructible<T>::value` is true} $$
$$ \text{then use copy construction for elements} $$
$$ \text{else compile-time error} $$
The `std::is_nothrow_move_constructible<T>` trait evaluates to true if `T` has a move constructor that is `noexcept`. By declaring your move constructor `noexcept`, you enable the first, more efficient path.

**What could go wrong:** Forgetting to mark move constructors and move assignment operators as `noexcept` when they genuinely don't throw. This can silently degrade performance of standard library containers that rely on this guarantee for optimal behavior.

### Step 6: Violating the Promise

**Plain English:** What happens if you declare a function `noexcept` (you promise not to throw), but then inside that function, you *do* try to throw an exception? The C++ runtime doesn't try to find a `catch` block. It immediately calls `std::terminate()`, which usually means your program crashes. It's like breaking the silence promise in the library and being instantly escorted out. This is a deliberate design choice: if you promised no exceptions, the system assumes no recovery path is needed, and a violation means an unrecoverable error.

**Example:**
```cpp
#include <iostream>
#include <stdexcept> // For std::runtime_error

void dangerous_function() noexcept {
    std::cout << "Inside dangerous_function, about to throw..." << std::endl;
    throw std::runtime_error("I broke my noexcept promise!"); // This will call std::terminate()
    std::cout << "This line will never be reached." << std::endl;
}

int main() {
    std::cout << "Calling dangerous_function..." << std::endl;
    try {
        dangerous_function(); // This call will lead to std::terminate()
    } catch (const std::exception& e) {
        // This catch block will NOT be executed because std::terminate() is called first.
        std::cerr << "Caught exception: " << e.what() << std::endl;
    }
    std::cout << "Program finished normally." << std::endl; // This line will not be reached
    return 0;
}
```
When `dangerous_function()` attempts to throw, the program terminates immediately, without executing the `catch` block or printing "Program finished normally."

**Formal/Mathematical Version:**
Let $F$ be a function declared with `noexcept`. If an exception $E$ is thrown from within $F$:
$$ \text{`throw` } E \text{ inside } F \Rightarrow \text{`std::terminate()` is called immediately} $$
The stack unwinding process for $E$ is aborted, and no exception handlers are searched for $E$. This is a direct, non-recoverable error.

**What could go wrong:** Unintentionally calling a throwing function from within a `noexcept` function. The compiler usually *doesn't* check this for you at compile time (unless the throwing function is also marked `noexcept(false)` or similar). It's a runtime failure. This means you must be absolutely sure that all code paths within a `noexcept` function are truly exception-free.

### Step 7: `noexcept` and Polymorphism

**Plain English:** When you're dealing with inheritance and virtual functions, `noexcept` plays a role in how functions can override each other. A derived class's virtual function override can be *more* restrictive with `noexcept` (i.e., it can promise not to throw if the base class version also promises not to throw or makes no promise). However, a derived class *cannot* make a throwing function `noexcept` if the base class function was non-`noexcept`. This rule ensures that a caller using a base class pointer can always rely on the exception guarantee (or lack thereof) specified in the base class. It's like saying, "If the original promise was 'silent,' you can also promise 'silent.' If the original promise was 'might shout,' you can't suddenly promise 'silent' because someone using the original contract might not be prepared for silence."

**Example:**
```cpp
#include <iostream>
#include <stdexcept>

class Base {
public:
    virtual void do_something_safe() noexcept {
        std::cout << "Base::do_something_safe()" << std::endl;
    }
    virtual void do_something_risky() { // Not noexcept
        std::cout << "Base::do_something_risky()" << std::endl;
    }
    virtual void do_something_really_risky() { // Not noexcept
        std::cout << "Base::do_something_really_risky()" << std::endl;
        throw std::runtime_error("Base is risky!");
    }
};

class Derived : public Base {
public:
    // OK: Overriding noexcept with noexcept (or more restrictive, i.e., noexcept(true) if base was noexcept(false))
    // The noexcept specification of an override must be at least as restrictive as the base function.
    // If base is noexcept, derived must be noexcept.
    void do_something_safe() noexcept override {
        std::cout << "Derived::do_something_safe()" << std::endl;
    }

    // OK: Overriding non-noexcept with non-noexcept.
    // You cannot add noexcept to an override if the base function is not noexcept.
    void do_something_risky() override {
        std::cout << "Derived::do_something_risky()" << std::endl;
    }

    // ERROR: This would be a compilation error because Base::do_something_really_risky() is NOT noexcept.
    // void do_something_really_risky() noexcept override { // Compiler error!
    //     std::cout << "Derived::do_something_really_risky()" << std::endl;
    // }

    // This is how it should be if the base is not noexcept:
    void do_something_really_risky() override {
        std::cout << "Derived::do_something_really_risky()" << std::endl;
        // throw std::runtime_error("Derived is also risky!"); // Can throw if base can throw
    }
};

int main() {
    Derived d;
    Base* b_ptr = &d;

    b_ptr->do_something_safe();    // Calls Derived::do_something_safe()
    b_ptr->do_something_risky(); // Calls Derived::do_something_risky()

    try {
        b_ptr->do_something_really_risky(); // Calls Derived::do_something_really_risky()
    } catch (const std::exception& e) {
        std::cerr << "Caught exception: " << e.what() << std::endl;
    }

    return 0;
}
```
The rule is that a virtual function override cannot have a *weaker* exception specification than the base class function. If the base function is `noexcept`, the override *must* also be `noexcept`. If the base function is *not* `noexcept`, the override *may* be `noexcept` or not `noexcept`. This ensures that if a function is called through a base pointer, the `noexcept` guarantee (or lack thereof) remains consistent.

**Formal/Mathematical Version:**
Let $B::F$ be a virtual function in a base class $B$, and $D::F$ be an override in a derived class $D$.
The `noexcept` specification of $D::F$ must be *at least as restrictive* as the `noexcept` specification of $B::F$.
This means:
1.  If $B::F$ is `noexcept(true)`, then $D::F$ *must* be `noexcept(true)`.
2.  If $B::F$ is `noexcept(false)` (or implicitly `noexcept(false)`), then $D::F$ *may* be `noexcept(true)` or `noexcept(false)`.
This rule is formally stated as: "The exception specification of an overriding function shall not be weaker than the exception specification of the overridden function." (C++ Standard, [except.spec])

**What could go wrong:** Accidentally declaring a derived class virtual function `noexcept` when its base class version was not `noexcept`. This will result in a compilation error. Conversely, forgetting to mark a derived override as `noexcept` when the base was `noexcept` will also be a compiler error.

## 5. Worked examples — multiple, with every step shown

Let's walk through some examples to solidify understanding, from basic usage to more complex scenarios.

### Example 1: Basic `noexcept` function and its violation

**Problem:**
Write a simple C++ function `divide(int a, int b)` that performs integer division. Declare it `noexcept`. Then, demonstrate what happens when `b` is zero, causing a division by zero. Explain why the program terminates.

**Given:**
*   Two integers, `a` and `b`.
*   The requirement to declare `divide` as `noexcept`.
*   The scenario where `b` is zero.

**What we want:**
*   A function `divide` with the `noexcept` specifier.
*   An illustration of `std::terminate()` when the `noexcept` promise is broken.

**Solution:**

```cpp
#include <iostream>
#include <stdexcept> // Required for std::runtime_error

// Problem Statement: Declare divide as noexcept.
// Step 1: Define the function signature with noexcept.
int divide(int a, int b) noexcept {
    // Explanation: The function promises not to throw.
    // Step 2: Implement the division logic.
    if (b == 0) {
        // Problem Statement: Demonstrate division by zero.
        // Explanation: Division by zero is undefined behavior in C++.
        // If we want to *signal* it as an error that would normally be an exception,
        // but the function is noexcept, we must be careful.
        // Attempting to throw an exception here will violate the noexcept promise.
        std::cerr << "Error: Attempted division by zero inside noexcept function!" << std::endl;
        throw std::runtime_error("Division by zero!"); // This will trigger std::terminate()
        // Explanation: This line attempts to throw an exception. Since `divide` is
        // declared `noexcept`, this action immediately calls `std::terminate()`.
    }
    return a / b;
}

int main() {
    std::cout << "--- Example 1: Basic noexcept and violation ---" << std::endl;

    // Test case 1: Valid division
    int result1 = divide(10, 2);
    // Explanation: This call is valid, no exception is thrown, and the function returns normally.
    std::cout << "10 / 2 = " << result1 << std::endl; // Output: 10 / 2 = 5

    // Test case 2: Division by zero (will terminate)
    std::cout << "Attempting 10 / 0..." << std::endl;
    try {
        divide(10, 0);
        // Explanation: This line will never be reached because `divide` will call `std::terminate()`
        // before returning or allowing the `throw` to propagate out of its scope.
    } catch (const std::exception& e) {
        // Explanation: This catch block will NOT execute. `std::terminate()` aborts
        // the program immediately, preventing any stack unwinding or handler search.
        std::cerr << "Caught exception in main: " << e.what() << std::endl;
    }

    std::cout << "This line will not be printed if terminate() is called." << std::endl;
    // Explanation: This final print statement in main will not be reached because
    // the program will have exited due to `std::terminate()`.

    return 0; // This return will not be reached if terminate() is called.
}
```

**Output (will vary slightly based on compiler/OS, but will show termination):**
```
--- Example 1: Basic noexcept and violation ---
10 / 2 = 5
Attempting 10 / 0...
Error: Attempted division by zero inside noexcept function!
terminate called after throwing an instance of 'std::runtime_error'
  what():  Division by zero!
Aborted (core dumped)
```

**Reflection:**
This example clearly shows the strictness of `noexcept`. When `divide` attempts to throw, the program immediately aborts via `std::terminate()`, bypassing any `try-catch` blocks. The tricky part is remembering that `noexcept` is a *promise* to the compiler, not a runtime check that converts exceptions into something else. Breaking the promise leads to termination.

### Example 2: Using the `noexcept` operator for conditional logic

**Problem:**
Write a generic function template `safe_call` that takes a callable object (like a function or lambda) and its arguments. `safe_call` should execute the callable. If the callable is `noexcept`, `safe_call` should simply call it. If the callable is *not* `noexcept`, `safe_call` should wrap the call in a `try-catch` block to handle potential exceptions.

**Given:**
*   A function template `safe_call`.
*   The ability to query `noexcept` status at compile time using `noexcept(expression)`.

**What we want:**
*   A `safe_call` function template that uses `if constexpr` and the `noexcept` operator to conditionally handle exceptions.
*   Demonstration with a `noexcept` callable and a throwing callable.

**Solution:**

```cpp
#include <iostream>
#include <stdexcept>
#include <string>
#include <vector>
#include <utility> // For std::forward

// Step 1: Define a noexcept callable
void noexcept_func(int val) noexcept {
    std::cout << "noexcept_func called with " << val << std::endl;
}

// Step 2: Define a throwing callable
void throwing_func(const std::string& msg) {
    std::cout << "throwing_func called with '" << msg << "'" << std::endl;
    if (msg == "error") {
        throw std::runtime_error("Error from throwing_func!");
    }
}

// Problem Statement: Write a generic function template safe_call.
template<typename Callable, typename... Args>
void safe_call(Callable&& c, Args&&... args) {
    // Explanation: Use if constexpr to branch at compile time based on noexcept status.
    // Step 3: Use the noexcept operator to check the callable's exception guarantee.
    if constexpr (noexcept(std::forward<Callable>(c)(std::forward<Args>(args)...))) {
        // Explanation: If the callable is noexcept, just call it directly. No try-catch needed.
        std::cout << "  [noexcept path] Calling directly..." << std::endl;
        std::forward<Callable>(c)(std::forward<Args>(args)...);
    } else {
        // Explanation: If the callable is not noexcept, wrap it in a try-catch block.
        std::cout << "  [throwing path] Calling with try-catch..." << std::endl;
        try {
            std::forward<Callable>(c)(std::forward<Args>(args)...);
        } catch (const std::exception& e) {
            std::cerr << "  Caught exception in safe_call: " << e.what() << std::endl;
        }
    }
}

int main() {
    std::cout << "--- Example 2: Using noexcept operator ---" << std::endl;

    // Test case 1: Call a noexcept function
    std::cout << "\nCalling safe_call with noexcept_func(10):" << std::endl;
    safe_call(noexcept_func, 10);
    // Explanation: The compiler evaluates noexcept(noexcept_func(10)) as true,
    // so the `if constexpr` takes the first branch.

    // Test case 2: Call a throwing function (no exception thrown)
    std::cout << "\nCalling safe_call with throwing_func('hello'):" << std::endl;
    safe_call(throwing_func, "hello");
    // Explanation: The compiler evaluates noexcept(throwing_func("hello")) as false,
    // so the `if constexpr` takes the second branch (try-catch). No exception occurs here.

    // Test case 3: Call a throwing function (exception thrown)
    std::cout << "\nCalling safe_call with throwing_func('error'):" << std::endl;
    safe_call(throwing_func, "error");
    // Explanation: Similar to above, the `if constexpr` takes the second branch.
    // This time, `throwing_func` throws, and the `catch` block in `safe_call` handles it.

    return 0;
}
```

**Output:**
```
--- Example 2: Using noexcept operator ---

Calling safe_call with noexcept_func(10):
  [noexcept path] Calling directly...
noexcept_func called with 10

Calling safe_call with throwing_func('hello'):
  [throwing path] Calling with try-catch...
throwing_func called with 'hello'

Calling safe_call with throwing_func('error'):
  [throwing path] Calling with try-catch...
throwing_func called with 'error'
  Caught exception in safe_call: Error from throwing_func!
```

**Reflection:**
This example demonstrates a powerful use case for `noexcept` in generic programming. By using `if constexpr` with the `noexcept` operator, `safe_call` can adapt its exception handling strategy at compile time, leading to more efficient code for `noexcept` callables and safer code for throwing ones. The trickiest part is understanding that `noexcept(expression)` is a compile-time query, not a runtime check, and `if constexpr` is essential for making decisions based on this query.

### Example 3: `noexcept` and `std::vector` move optimization

**Problem:**
Create a custom class `HeavyObject` that simulates a resource-heavy object (e.g., holding a large buffer). Implement its copy constructor, move constructor, and destructor. Demonstrate how `std::vector` chooses between copying and moving elements during reallocation based on whether `HeavyObject`'s move constructor is declared `noexcept`.

**Given:**
*   A class `HeavyObject`.
*   `std::vector` behavior during reallocation.

**What we want:**
*   `HeavyObject` with constructors/destructor logging their calls.
*   Two scenarios: one where `HeavyObject`'s move constructor is `noexcept`, and one where it's not.
*   Observe `std::vector`'s behavior (copy vs. move) in each scenario.

**Solution:**

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <memory> // For std::unique_ptr

// Helper to track object IDs
static int next_id = 0;

struct HeavyObject {
    int id;
    std::string data;
    std::unique_ptr<int[]> large_buffer; // Simulates heavy resource

    // Constructor
    HeavyObject(std::string d = "default") : id(next_id++), data(std::move(d)), large_buffer(std::make_unique<int[]>(1000)) {
        std::cout << "[" << id << "] HeavyObject constructed (" << this->data << ")" << std::endl;
    }

    // Copy Constructor
    HeavyObject(const HeavyObject& other) : id(next_id++), data(other.data), large_buffer(std::make_unique<int[]>(1000)) {
        // Simulate potential throw if memory allocation fails (unlikely in simple cases)
        // For demonstration, let's assume string copy could theoretically throw.
        std::cout << "[" << id << "] HeavyObject copied from [" << other.id << "] (" << this->data << ")" << std::endl;
    }

    // Move Constructor - SCENARIO 1: WITH noexcept
    HeavyObject(HeavyObject&& other) noexcept
        : id(next_id++), data(std::move(other.data)), large_buffer(std::move(other.large_buffer)) {
        // Explanation: This move constructor is explicitly noexcept.
        // It transfers ownership of resources (data, large_buffer) without throwing.
        std::cout << "[" << id << "] HeavyObject moved from [" << other.id << "] (" << this->data << ")" << std::endl;
        other.id = -1; // Mark source as moved-from
    }

    // Move Constructor - SCENARIO 2: WITHOUT noexcept (comment out the above and uncomment this to test)
    /*
    HeavyObject(HeavyObject&& other)
        : id(next_id++), data(std::move(other.data)), large_buffer(std::move(other.large_buffer)) {
        std::cout << "[" << id << "] HeavyObject moved (NOT noexcept) from [" << other.id << "] (" << this->data << ")" << std::endl;
        other.id = -1;
    }
    */

    // Destructor
    ~HeavyObject() noexcept { // Destructors are implicitly noexcept by default in C++11+, but explicit is clear.
        if (id != -1) { // Don't print for moved-from objects
            std::cout << "[" << id << "] HeavyObject destructed (" << this->data << ")" << std::endl;
        }
    }
};

void run_vector_test() {
    std::cout << "\n--- Vector Reallocation Test ---" << std::endl;
    next_id = 0; // Reset ID counter for clean test

    std::vector<HeavyObject> vec;
    vec.reserve(2); // Initial capacity 2

    std::cout << "Adding H1..." << std::endl;
    vec.emplace_back("H1"); // Calls constructor
    std::cout << "Vector size: " << vec.size() << ", capacity: " << vec.capacity() << std::endl;

    std::cout << "\nAdding H2..." << std::endl;
    vec.emplace_back("H2"); // Calls constructor
    std::cout << "Vector size: " << vec.size() << ", capacity: " << vec.capacity() << std::endl;

    // This next addition will trigger a reallocation because current capacity is 2.
    // std::vector will need to move existing elements to a new, larger buffer.
    std::cout << "\nAdding H3 (forcing reallocation)..." << std::endl;
    vec.emplace_back("H3"); // Calls constructor, then moves H1 and H2 to new memory

    std::cout << "Vector size: " << vec.size() << ", capacity: " << vec.capacity() << std::endl;
    std::cout << "--- End Vector Reallocation Test ---\n" << std::endl;
}

int main() {
    std::cout << "--- Example 3: noexcept and std::vector move optimization ---" << std::endl;

    // SCENARIO 1: Move constructor IS noexcept
    std::cout << "\nScenario 1: HeavyObject's move constructor IS noexcept." << std::endl;
    std::cout << "Is HeavyObject's move constructor noexcept? "
              << std::boolalpha << noexcept(HeavyObject(std::declval<HeavyObject&&>())) << std::endl;
    run_vector_test();
    // Explanation: Observe that when vec.emplace_back("H3") is called,
    // it will print "HeavyObject moved..." for H1 and H2.
    // This is because std::vector detects the noexcept move constructor and uses it.

    // SCENARIO 2: To test, comment out the `noexcept` on the move constructor in HeavyObject
    // and uncomment the alternative `HeavyObject(HeavyObject&& other)` definition.
    // Then recompile and run.
    // You would then observe "HeavyObject copied..." for H1 and H2 instead of "moved".
    // This fallback happens because without `noexcept`, std::vector cannot guarantee
    // atomicity of the move and prefers the safe copy.

    return 0;
}
```

**Output (Scenario 1: `noexcept` move constructor):**
```
--- Example 3: noexcept and std::vector move optimization ---

Scenario 1: HeavyObject's move constructor IS noexcept.
Is HeavyObject's move constructor noexcept? true

--- Vector Reallocation Test ---
Adding H1...
[0] HeavyObject constructed (H1)
Vector size: 1, capacity: 2

Adding H2...
[1] HeavyObject constructed (H2)
Vector size: 2, capacity: 2

Adding H3 (forcing reallocation)...
[2] HeavyObject constructed (H3)
[3] HeavyObject moved from [0] (H1)
[4] HeavyObject moved from [1] (H2)
[0] HeavyObject destructed (H1)
[1] HeavyObject destructed (H2)
Vector size: 3, capacity: 4
--- End Vector Reallocation Test ---

[2] HeavyObject destructed (H3)
[3] HeavyObject destructed (H1)
[4] HeavyObject destructed (H2)
```

**Reflection:**
This example clearly illustrates the critical role of `noexcept` for move constructors. When `HeavyObject`'s move constructor is `noexcept`, `std::vector` confidently uses move operations during reallocation, which is much faster as it avoids deep copies of `data` and `large_buffer`. If you were to remove `noexcept` from the move constructor, `std::vector` would fall back to copy construction to maintain exception safety, resulting in "HeavyObject copied..." messages and potentially significant performance degradation for large objects. The tricky part is understanding the underlying exception safety guarantees that `std::vector` is trying to uphold.

### Example 4: `noexcept` with function pointers and lambdas

**Problem:**
Demonstrate how `noexcept` applies to function pointers and lambda expressions. Create a function that accepts a function pointer or a lambda. Use the `noexcept` operator to determine if the passed callable is `noexcept` and print the result.

**Given:**
*   Function pointers and lambda expressions.
*   The `noexcept` operator.

**What we want:**
*   A function `check_callable_noexcept` that takes a generic callable.
*   Demonstrate with a `noexcept` function pointer, a throwing function pointer, a `noexcept` lambda, and a throwing lambda.

**Solution:**

```cpp
#include <iostream>
#include <functional> // For std::function (optional, but good for type erasure)
#include <string>

// Step 1: Define a regular function that is noexcept
void regular_noexcept_func(int x) noexcept {
    std::cout << "  regular_noexcept_func called with " << x << std::endl;
}

// Step 2: Define a regular function that can throw
void regular_throwing_func(const std::string& s) {
    std::cout << "  regular_throwing_func called with '" << s << "'" << std::endl;
    if (s == "error") {
        throw std::runtime_error("Error from regular_throwing_func!");
    }
}

// Problem Statement: Create a function that accepts a function pointer or a lambda.
// Step 3: Create a template function to check and call any callable.
template<typename Callable, typename... Args>
void check_and_call(Callable&& c, Args&&... args) {
    // Explanation: Use noexcept operator to query the callable's exception status.
    constexpr bool is_callable_noexcept = noexcept(c(std::forward<Args>(args)...));
    std::cout << "Callable is noexcept: " << std::boolalpha << is_callable_noexcept << std::endl;

    if constexpr (is_callable_noexcept) {
        std::cout << "  Executing noexcept callable..." << std::endl;
        c(std::forward<Args>(args)...);
    } else {
        std::cout << "  Executing potentially throwing callable with try-catch..." << std::endl;
        try {
            c(std::forward<Args>(args)...);
        } catch (const std::exception& e) {
            std::cerr << "  Caught exception: " << e.what() << std::endl;
        }
    }
}

int main() {
    std::cout << "--- Example 4: noexcept with function pointers and lambdas ---" << std::endl;

    // Test case 1: noexcept function pointer
    std::cout << "\nTesting regular_noexcept_func via function pointer:" << std::endl;
    void (*ptr_noexcept)(int) noexcept = &regular_noexcept_func;
    // Explanation: The function pointer itself carries the noexcept specifier.
    check_and_call(ptr_noexcept, 100);

    // Test case 2: throwing function pointer
    std::cout << "\nTesting regular_throwing_func via function pointer (no throw):" << std::endl;
    void (*ptr_throwing)(const std::string&) = &regular_throwing_func;
    // Explanation: This function pointer does not have noexcept.
    check_and_call(ptr_throwing, "hello world");

    std::cout << "\nTesting regular_throwing_func via function pointer (with throw):" << std::endl;
    check_and_call(ptr_throwing, "error");

    // Test case 3: noexcept lambda
    std::cout << "\nTesting noexcept lambda:" << std::endl;
    auto noexcept_lambda = [](double d) noexcept {
        std::cout << "  noexcept_lambda called with " << d << std::endl;
    };
    // Explanation: The lambda explicitly specifies noexcept.
    check_and_call(noexcept_lambda, 3.14);

    // Test case 4: throwing lambda
    std::cout << "\nTesting throwing lambda (no throw):" << std::endl;
    auto throwing_lambda = [](int val) {
        std::cout << "  throwing_lambda called with " << val << std::endl;
        if (val < 0) {
            throw std::out_of_range("Value must be non-negative!");
        }
    };
    // Explanation: This lambda does not specify noexcept, so it's implicitly noexcept(false).
    check_and_call(throwing_lambda, 5);

    std::cout << "\nTesting throwing lambda (with throw):" << std::endl;
    check_and_call(throwing_lambda, -1);

    return 0;
}
```

**Output:**
```
--- Example 4: noexcept with function pointers and lambdas ---

Testing regular_noexcept_func via function pointer:
Callable is noexcept: true
  Executing noexcept callable...
  regular_noexcept_func called with 100

Testing regular_throwing_func via function pointer (no throw):
Callable is noexcept: false
  Executing potentially throwing callable with try-catch...
  regular_throwing_func called with 'hello world'

Testing regular_throwing_func via function pointer (with throw):
Callable is noexcept: false
  Executing potentially throwing callable with try-catch...
  regular_throwing_func called with 'error'
  Caught exception: Error from regular_throwing_func!

Testing noexcept lambda:
Callable is noexcept: true
  Executing noexcept callable...
  noexcept_lambda called with 3.14

Testing throwing lambda (no throw):
Callable is noexcept: false
  Executing potentially throwing callable with try-catch...
  throwing_lambda called with 5

Testing throwing lambda (with throw):
Callable is noexcept: false
  Executing potentially throwing callable with try-catch...
  throwing_lambda called with -1
  Caught exception: Value must be non-negative!
```

**Reflection:**
This example shows that `noexcept` is a property of the function's type, whether it's a regular function, a function pointer, or a lambda. The `noexcept` operator can query this property uniformly. Lambdas can be explicitly marked `noexcept`, and regular functions can have it in their declaration. Function pointers also carry this information. The tricky part is remembering that if a lambda *doesn't* explicitly specify `noexcept`, the compiler deduces it. For simple lambdas that don't call throwing functions, it might be implicitly `noexcept`. However, for safety and clarity, explicit `noexcept` is often preferred for functions that are truly exception-free.

## 6. Common mistakes and traps

1.  **Confusing `noexcept` with `throw()`**: The most common mistake. `throw()` is deprecated and had different semantics (runtime check, `std::unexpected`). `noexcept` is a compile-time promise leading to `std::terminate()` on violation and enabling optimizations. Always use `noexcept` in modern C++.
2.  **Overuse of `noexcept`**: Not every function should be `noexcept`. Only declare a function `noexcept` if you are absolutely certain it will never throw an exception, or if the consequences of throwing (i.e., `std::terminate()`) are acceptable for that specific error. Over-applying it can hide bugs, as a breaking promise leads to termination rather than a catchable exception.
3.  **Forgetting `noexcept` on move constructors/assignment operators**: This is a subtle performance trap. If your class's move operations are truly exception-safe but you don't mark them `noexcept`, standard library containers like `std::vector` might defensively fall back to slower copy operations during reallocation, leading to unexpected performance degradation.
4.  **Throwing from a `noexcept` function**: This violates the `noexcept` contract and immediately calls `std::terminate()`. This often indicates a design flaw or a misunderstanding of what `noexcept` implies. All code paths within a `noexcept` function must be exception-free.
5.  **Incorrect `noexcept` in virtual function overrides**: A derived class's virtual function override *must* have an exception specification that is at least as restrictive as the base class's. If the base function is `noexcept`, the derived override *must* also be `noexcept`. If the base is not `noexcept`, the derived *can* be `noexcept` or not `noexcept`. Violating this rule results in a compilation error.
6.  **Assuming `noexcept` prevents *all* errors**: `noexcept` only prevents *exceptions*. It does not prevent undefined behavior (like division by zero, null pointer dereference, out-of-bounds access) which can still crash your program or lead to incorrect results without throwing an exception.

## 7. Textbook-precise explanation

The `noexcept` specifier is a fundamental language feature introduced in C++11, refined in C++17, that provides a compile-time guarantee regarding a function's exception behavior. It serves as an integral part of a function's type, influencing overload resolution and enabling specific compiler optimizations.

**Definition:**
A function or lambda expression declared with the `noexcept` specifier guarantees that it will not emit an exception. The form `noexcept` is equivalent to `noexcept(true)`. The form `noexcept(expression)` specifies that the function will not emit an exception if and only if `expression` evaluates to `true`.

**Behavior on Violation:**
If a function or lambda declared `noexcept(true)` (or simply `noexcept`) attempts to propagate an exception out of its scope (either by `throw` or by calling a function that throws and does not catch it internally), the C++ runtime environment will immediately call `std::terminate()`. This behavior is non-recoverable; stack unwinding for the exception is aborted, and no exception handlers are searched. This is distinct from the behavior of the deprecated `throw()` dynamic exception specification, which would typically call `std::unexpected` and then potentially `std::terminate` after further processing.

**Implicit `noexcept`:**
Certain functions are implicitly `noexcept(true)`:
*   Destructors (since C++11, if all members/bases have `noexcept` destructors).
*   Deallocation functions (e.g., `operator delete`, `operator delete[]`).
*   Defaulted special member functions (default constructor, copy constructor, move constructor, copy assignment operator, move assignment operator) if their implicitly generated bodies would not throw any exceptions. This usually means that all member and base class operations within them are also `noexcept`.

**`noexcept` Operator:**
The `noexcept` operator is a unary compile-time operator that takes an expression $E$ as its operand. It yields a `bool` value:
$$ \text{`noexcept`}(E) = \begin{cases} \text{true} & \text{if evaluating } E \text{ is guaranteed not to throw an exception} \\ \text{false} & \text{otherwise} \end{cases} $$
This operator performs a compile-time check without evaluating $E$. It inspects the exception specifications of functions called within $E$, and the exception-safety properties of fundamental operations. This is crucial for generic programming, allowing compile-time conditional logic (e.g., with `if constexpr`) based on exception guarantees.

**Interaction with Move Semantics:**
For types `T` whose move constructor `T(T&&)` and move assignment operator `T& operator=(T&&)` are declared `noexcept`, standard library containers (e.g., `std::vector`, `std::string`) can provide stronger exception guarantees and often achieve significant performance improvements. Specifically, during reallocation, `std::vector` will prefer to move elements if `std::is_nothrow_move_constructible<T>::value` is true; otherwise, it may fall back to copying elements to preserve the strong exception guarantee (i.e., if an exception occurs during reallocation, the container remains in its original valid state).

**Polymorphism Rules:**
When overriding a virtual function, the `noexcept` specification of the derived class's override must be *at least as restrictive* as that of the base class's virtual function.
*   If `Base::func()` is `noexcept(true)`, then `Derived::func()` *must* be `noexcept(true)`.
*   If `Base::func()` is `noexcept(false)` (or implicitly `noexcept(false)`), then `Derived::func()` *may* be `noexcept(true)` or `noexcept(false)`.
This rule ensures that the exception guarantee provided by the base class interface remains consistent when accessed via a base class pointer or reference.

**References:**
*   **ISO/IEC 14882:2020 (C++ Standard)**: Section [except.spec] for exception specifications, [dcl.fct.dcl] for function declarations, and [special] for special member functions.
*   **Stroustrup, Bjarne. *The C++ Programming Language (4th Edition)*. Addison-Wesley, 2013.** Chapter 8.4.6, "noexcept".
*   **Meyers, Scott. *Effective Modern C++*. O'Reilly Media, 2014.** Item 14, "Declare functions `noexcept` if they won't emit exceptions."

## 8. ASCII diagrams

Here are two ASCII diagrams illustrating key aspects of `noexcept`:

### Diagram 1: Exception Propagation vs. `noexcept` Violation

This diagram shows the difference in control flow when an exception is thrown from a regular function versus a `noexcept` function.

```text
+---------------------+
|      main()         |
|  +----------------+ |
|  |   call_A()     | |
|  | +------------+ | |
|  | |   call_B() | | |
|  | | +--------+ | | |
|  | | | func_C | | | |
|  | | |        | | | |
|  | | +--------+ | | |
|  | +------------+ | |
|  +----------------+ |
+---------------------+
          |
          V
+-----------------------------------------------------+
| Scenario 1: func_C is NOT noexcept, throws exception |
+-----------------------------------------------------+
          |
          V
+-----------------------------------------------------+
| func_C throws Exception X                           |
| (Stack unwinds, destructors called)                 |
+-----------------------------------------------------+
          |
          V
+-----------------------------------------------------+
| call_B() (destructors called, searches for handler) |
+-----------------------------------------------------+
          |
          V
+-----------------------------------------------------+
| call_A() (destructors called, searches for handler) |
+-----------------------------------------------------+
          |
          V
+-----------------------------------------------------+
| main() (if try-catch, handler executes)             |
+-----------------------------------------------------+
          |
          V
        (Program continues)


+-----------------------------------------------------+
| Scenario 2: func_C IS noexcept, throws exception    |
+-----------------------------------------------------+
          |
          V
+-----------------------------------------------------+
| func_C throws Exception X                           |
| (VIOLATION of noexcept promise)                     |
+-----------------------------------------------------+
          |
          V
+-----------------------------------------------------+
|              std::terminate() is called             |
|              (Program immediately aborts)           |
+-----------------------------------------------------+
```

### Diagram 2: `std::vector` Reallocation with/without `noexcept` Move

This diagram illustrates