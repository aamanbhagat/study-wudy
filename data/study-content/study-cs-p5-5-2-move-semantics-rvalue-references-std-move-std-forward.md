## 1. What it is — in plain English

Imagine you have a huge, heavy couch in your living room, and you want to move it to a different room. You wouldn't make an exact copy of the couch, carry the copy to the new room, and then destroy the original, would you? That would be incredibly wasteful and take twice the effort! Instead, you'd simply pick up the original couch and move it directly.

In C++ programming, "move semantics" is exactly like moving that couch. When you have a complex object that holds valuable resources (like a large chunk of memory, an open file, or a network connection), and you want to transfer its contents to another object, move semantics allows you to *transfer ownership* of those resources directly, rather than making a costly copy.

This transfer is only possible when you know for sure that the original object won't be needed anymore – it's "about to die" or you explicitly tell the compiler it's okay to "steal" its contents. It's a way to be super efficient, especially with large data structures, by avoiding unnecessary deep copies.

## 2. Why it matters — real-world applications

Move semantics is a fundamental optimization technique in modern C++ that underpins the performance of many high-level systems.

1.  **High-Performance Computing (HPC) & Scientific Simulations:** In fields like aerospace engineering (e.g., simulating fluid dynamics around an aircraft wing) or physics (e.g., N-body simulations), programs often deal with massive matrices, tensors, or particle datasets. When these large data structures need to be passed between functions, stored in containers, or returned from functions, copying them can be prohibitively expensive. Move semantics allows these multi-gigabyte objects to be "moved" with just a few pointer reassignments, dramatically speeding up simulations and reducing memory bandwidth usage.

2.  **Game Engines & Real-time Graphics:** Modern game engines manipulate vast amounts of data per frame: 3D models, textures, animation data, particle systems. When objects are added to a scene, removed, or passed between different rendering stages, move semantics ensures that these operations are efficient. For instance, moving a large `std::vector<Vertex>` from one processing stage to another avoids reallocating and copying all vertex data, which is crucial for maintaining high frame rates.

3.  **Machine Learning & Data Processing:** Libraries like TensorFlow or PyTorch (which often have C++ backends) deal with large tensors (multi-dimensional arrays). Operations that reshape, split, or combine these tensors can be optimized with move semantics. When a tensor is temporarily created and then passed into a neural network layer, moving it rather than copying it saves significant time and memory, especially during training phases with huge datasets.

4.  **Standard Library Containers:** The C++ Standard Library itself heavily relies on move semantics for its efficiency. When you `push_back` an object into an `std::vector` and the vector needs to reallocate its internal buffer (because it ran out of space), it creates a new, larger buffer. Instead of *copying* all existing elements from the old buffer to the new one, it *moves* them, and then moves the new element in. This makes `std::vector` resizing much faster than it would be without move semantics. Similarly, `std::unique_ptr` (a smart pointer that enforces single ownership) is "move-only" – you can transfer ownership of the raw pointer it manages, but you cannot copy it, preventing accidental double-deletes.

## 3. Prerequisites — what you must know first

Before diving deep into move semantics, ensure you have a solid grasp of these foundational C++ concepts:

*   **Lvalues vs. Rvalues:** Understanding the distinction between expressions that represent objects with identity and memory locations (lvalues) and temporary, unnamed objects (rvalues).
*   **References (`&`):** How lvalue references bind to lvalues and allow functions to modify arguments without copying them.
*   **Pointers and Dynamic Memory Allocation (`new`, `delete`):** How to manually manage memory on the heap, as move semantics often involves transferring ownership of such allocated resources.
*   **Classes and Objects:** The basics of defining classes, creating objects, and understanding member variables and methods.
*   **Constructors and Destructors:** How objects are initialized and cleaned up.
*   **Copy Constructor:** A special constructor `T(const T&)` that defines how an object is copied from an existing object of the same type.
*   **Copy Assignment Operator:** A special operator `T& operator=(const T&)` that defines how an object is assigned the value of another existing object.
*   **`const` Correctness:** How `const` is used to declare immutable objects and references, and its implications for function overloading.
*   **Function Overloading:** How multiple functions with the same name but different parameter lists can exist, and how the compiler chooses which one to call.

## 4. The core idea — step by step

Let's unpack move semantics piece by piece, building intuition along the way.

### ### Step 1: Lvalues and Rvalues Revisited

**Plain-English statement:** In C++, every expression results in either an "lvalue" or an "rvalue." Think of an lvalue as something you can "point to" or "take the address of" – it has a lasting identity. An rvalue is a temporary value, often a result of an operation, that doesn't have a name you can refer to later. It's fleeting.

**Small concrete example:**
```cpp
int x = 10;           // 'x' is an lvalue (it has a name, you can take &x)
int y = x + 5;        // 'x' is an lvalue. '5' is a prvalue (a kind of rvalue).
                      // 'x + 5' results in a prvalue (a temporary value, 15, no name).
                      // 'y' is an lvalue.

MyClass obj1;         // 'obj1' is an lvalue.
MyClass obj2 = MyClass(); // 'MyClass()' creates a temporary object (a prvalue).
                          // 'obj2' is an lvalue.
```
You can assign to an lvalue (`x = 20;`), but not usually to an rvalue (`(x + 5) = 20;` is invalid).

**Formal/mathematical version:**
In C++11 and later, expressions are categorized into five types:
*   **glvalue** (generalized lvalue): An expression that determines the identity of an object.
    *   **lvalue:** A glvalue that is not an xvalue. (e.g., `x`, `*ptr`, `obj.member`)
    *   **xvalue** (eXpiring value): A glvalue that denotes an object whose resources can be reused (typically because it's near the end of its lifetime). (e.g., `std::move(obj)`, a function returning `T&&`)
*   **rvalue:** An expression that does not determine the identity of an object.
    *   **prvalue** (pure rvalue): An rvalue that is not an xvalue. (e.g., `10`, `x+5`, `MyClass()`)

The key distinction for move semantics is between lvalues (things you *can't* move from without explicit permission, because they might be used again) and rvalues (things you *can* move from, because they are temporary or explicitly marked as expiring).

**What could go wrong:** Confusing lvalues and rvalues can lead to incorrect overload resolution, where the compiler picks a copy operation instead of a move operation, or vice-versa, leading to unexpected performance or correctness issues.

### ### Step 2: The Problem with Deep Copies

**Plain-English statement:** For simple data types like `int`, copying is fast. But for complex objects that manage resources (like a `std::vector` managing a dynamically allocated array, or a `std::string` managing a `char` array), a "deep copy" means allocating new memory and copying *all* the data. If you're copying an object that's about to be destroyed anyway (like a temporary object returned from a function), this deep copy is a complete waste of time and memory.

**Small concrete example:**
Consider a simplified `String` class:
```cpp
class MyString {
public:
    char* _data;
    size_t _length;

    // Constructor
    MyString(const char* str = "") {
        _length = strlen(str);
        _data = new char[_length + 1];
        strcpy(_data, str);
        std::cout << "Constructor: " << _data << std::endl;
    }

    // Destructor
    ~MyString() {
        std::cout << "Destructor: " << (_data ? _data : "nullptr") << std::endl;
        delete[] _data;
        _data = nullptr; // Good practice
    }

    // Copy Constructor (Deep Copy)
    MyString(const MyString& other) {
        _length = other._length;
        _data = new char[_length + 1]; // Allocate NEW memory
        strcpy(_data, other._data);    // Copy ALL characters
        std::cout << "Copy Constructor: " << _data << " from " << other._data << std::endl;
    }

    // Copy Assignment Operator (Deep Copy)
    MyString& operator=(const MyString& other) {
        if (this == &other) return *this; // Self-assignment check

        delete[] _data; // Release current resources

        _length = other._length;
        _data = new char[_length + 1]; // Allocate NEW memory
        strcpy(_data, other._data);    // Copy ALL characters
        std::cout << "Copy Assignment: " << _data << " from " << other._data << std::endl;
        return *this;
    }
};

MyString createAndReturnString() {
    MyString temp("Hello World");
    return temp; // This will invoke the copy constructor (or NRVO)
}

int main() {
    MyString s1("Original");
    MyString s2 = s1; // Calls Copy Constructor
    MyString s3;
    s3 = s1;          // Calls Copy Assignment Operator

    MyString s4 = createAndReturnString(); // Potentially calls Copy Constructor (if NRVO fails)
    // The temporary "Hello World" from createAndReturnString() is copied to s4,
    // then the temporary is destroyed. This is a wasted copy.
    return 0;
}
```
In the `createAndReturnString` example, a temporary `MyString temp` is created. When `temp` is returned, a copy of its contents is made into `s4`. Then `temp` is immediately destroyed. This involves allocating new memory and copying `strlen("Hello World")` characters, only for the source to be discarded. This is the exact scenario move semantics aims to optimize.

**Formal/mathematical version:**
For an object $O_1$ of type $T$ managing a resource $R_1$ (e.g., a dynamically allocated array of size $N$), a deep copy to $O_2$ involves:
1.  Allocation: $O_2$ allocates a new resource $R_2$ of size $N$.
2.  Copying: The contents of $R_1$ are copied element-by-element to $R_2$. This typically has a time complexity of $O(N)$.
3.  Destruction (if $O_1$ is temporary): $R_1$ is deallocated.

If $O_1$ is an rvalue (temporary or expiring), steps 1 and 2 are redundant because $R_1$ will soon be deallocated anyway. The goal is to avoid this $O(N)$ operation.

**What could go wrong:** Without move semantics, returning large objects by value or storing them in containers can lead to severe performance degradation due to excessive deep copies, making certain programming patterns impractical.

### ### Step 3: Introducing Rvalue References (`&&`)

**Plain-English statement:** An rvalue reference (`&&`) is a special kind of reference that can *only* bind to rvalues (temporary objects or objects explicitly marked as expiring). It's like a special instruction to the compiler: "Hey, this object I'm referring to is a temporary one, or someone just told me it's okay to take its stuff. You can safely 'steal' its resources because it won't be used again."

**Small concrete example:**
```cpp
void process(int& lval_ref) {
    std::cout << "Processing Lvalue: " << lval_ref << std::endl;
}

void process(int&& rval_ref) {
    std::cout << "Processing Rvalue: " << rval_ref << std::endl;
}

int main() {
    int a = 10;
    process(a);       // 'a' is an lvalue, calls process(int&)
    process(20);      // '20' is a prvalue, calls process(int&&)
    process(a + 5);   // 'a + 5' is a prvalue, calls process(int&&)

    // int&& r = a; // ERROR: cannot bind lvalue to rvalue reference
    int&& r = 30;   // OK: binds to a prvalue (30)
    std::cout << "Rvalue ref 'r' holds: " << r << std::endl;
    r = 40;         // OK: you can modify the temporary object 'r' refers to.
                    // The lifetime of '30' is extended to the scope of 'r'.
    return 0;
}
```
Notice how `int&& r = 30;` works. The temporary `30` normally would vanish after the expression, but binding an rvalue reference to it extends its lifetime to the lifetime of the reference `r`. This is crucial for move operations, as it gives the move constructor/operator a chance to "steal" from the temporary object before it's truly destroyed.

**Formal/mathematical version:**
An rvalue reference is a type `T&&`. It has the following properties:
*   It can bind to an rvalue (a prvalue or an xvalue).
*   It cannot directly bind to an lvalue.
*   Binding an rvalue reference to a temporary object extends the temporary object's lifetime to that of the reference.

The primary purpose of `T&&` is to enable *overload resolution* to distinguish between functions that accept lvalues (and thus should copy) and functions that accept rvalues (and thus can move).

**What could go wrong:** Attempting to bind an rvalue reference directly to an lvalue will result in a compile-time error. Forgetting that an rvalue reference *is* an lvalue itself once named (e.g., `rval_ref` in the example above is an lvalue within `process(int&& rval_ref)`). This subtle point is critical for `std::forward`.

### ### Step 4: The Move Constructor and Move Assignment Operator

**Plain-English statement:** These are special versions of constructors and assignment operators that take an rvalue reference as input. Instead of making a deep copy, they "steal" the resources (like the dynamically allocated memory) from the source object. The source object is then left in a valid, but empty or "null" state, ready for its destructor to be called harmlessly.

**Small concrete example:**
Extending our `MyString` class:
```cpp
#include <iostream>
#include <cstring> // For strlen, strcpy
#include <utility> // For std::exchange (C++14), or manual swap

class MyString {
public:
    char* _data;
    size_t _length;

    // ... (Constructor, Destructor, Copy Constructor, Copy Assignment from Step 2) ...

    // Move Constructor
    MyString(MyString&& other) noexcept : _data(nullptr), _length(0) { // Initialize to null/empty
        _data = other._data;      // Steal the data pointer
        _length = other._length;  // Steal the length

        other._data = nullptr;    // Nullify the source's pointer
        other._length = 0;        // Reset source's length
        std::cout << "Move Constructor: " << (_data ? _data : "nullptr") << " from "
                  << (other._data ? other._data : "nullptr (after move)") << std::endl;
    }

    // Move Assignment Operator
    MyString& operator=(MyString&& other) noexcept {
        if (this == &other) return *this; // Self-assignment check

        delete[] _data; // Release current resources of *this

        _data = other._data;      // Steal the data pointer
        _length = other._length;  // Steal the length

        other._data = nullptr;    // Nullify the source's pointer
        other._length = 0;        // Reset source's length
        std::cout << "Move Assignment: " << (_data ? _data : "nullptr") << " from "
                  << (other._data ? other._data : "nullptr (after move)") << std::endl;
        return *this;
    }
};

MyString createAndReturnString() {
    MyString temp("Hello World");
    return temp; // Now, this will invoke the Move Constructor (or NRVO)
}

int main() {
    MyString s1("Original");
    MyString s2 = s1; // Calls Copy Constructor (s1 is an lvalue)

    MyString s3;
    s3 = MyString("Temporary"); // MyString("Temporary") is a prvalue, calls Move Assignment
                                // (s3 is an lvalue, but its RHS is an rvalue)

    MyString s4 = createAndReturnString(); // Calls Move Constructor (createAndReturnString returns an rvalue)

    std::cout << "s1: " << (s1._data ? s1._data : "nullptr") << std::endl;
    std::cout << "s2: " << (s2._data ? s2._data : "nullptr") << std::endl;
    std::cout << "s3: " << (s3._data ? s3._data : "nullptr") << std::endl;
    std::cout << "s4: " << (s4._data ? s4._data : "nullptr") << std::endl;

    // std::cout << "s1 after move: " << s1._data << std::endl; // DANGER! s1 might be moved-from if used with std::move later
    return 0;
}
```
The `noexcept` keyword is crucial. It tells the compiler that these operations will not throw exceptions. This allows containers like `std::vector` to use move operations more aggressively for performance, as they don't need to worry about rolling back if a move fails.

**Formal/mathematical version:**
A move constructor for type $T$ is defined as `T(T&& other) noexcept;`. Its implementation typically involves:
1.  Transferring ownership of resources from `other` to `*this`. E.g., `_data = other._data;`.
2.  Setting `other` to a valid, but empty/null state. E.g., `other._data = nullptr;`.
3.  The `noexcept` specifier is highly recommended because if a move constructor throws an exception, the object being moved from (`other`) might have been partially modified, leaving it in an invalid state. Standard library containers often require move constructors to be `noexcept` to provide strong exception guarantees.

A move assignment operator for type $T$ is defined as `T& operator=(T&& other) noexcept;`. Its implementation typically involves:
1.  Handling self-assignment: `if (this == &other) return *this;`.
2.  Releasing resources currently owned by `*this`. E.g., `delete[] _data;`.
3.  Transferring ownership of resources from `other` to `*this`.
4.  Setting `other` to a valid, but empty/null state.
5.  Returning `*this`.

**What could go wrong:**
*   **Forgetting `noexcept`:** Can lead to less efficient code, as `std::vector` might fall back to copying if a move operation isn't `noexcept`.
*   **Not nullifying the source:** If `other._data` is not set to `nullptr`, then when `other` is destroyed, its destructor will try to `delete[]` the memory that `*this` now owns, leading to a double-free error.
*   **Not releasing current resources in move assignment:** If `*this` already owns resources, they must be `delete[]`d before `other`'s resources are stolen, otherwise, it's a memory leak.
*   **Using a moved-from object:** After an object has been moved from, it's in a valid but unspecified state. You should only destroy it, assign a new value to it, or clear it. Using its members in any other way is undefined behavior.

### ### Step 5: `std::move` — Casting to an Rvalue

**Plain-English statement:** `std::move` is a bit of a misnomer. It *doesn't actually move anything*. What it does is cast its argument to an rvalue reference. It's a way of telling the compiler, "Hey, I know this object is an lvalue, but I promise I'm done with it. Treat it as if it were a temporary object so that a move constructor or move assignment operator can be called." It's an explicit signal for potential resource transfer.

**Small concrete example:**
```cpp
#include <iostream>
#include <string> // std::string has move semantics built-in
#include <vector> // std::vector has move semantics built-in
#include <utility> // For std::move

int main() {
    std::string s1 = "Hello";
    std::string s2 = s1; // Calls copy constructor for std::string

    std::string s3 = std::move(s1); // Calls move constructor for std::string
                                   // s1 is now in a valid but unspecified state (likely empty)
    std::cout << "s1 after move to s3: '" << s1 << "'" << std::endl; // s1 is empty or undefined
    std::cout << "s3: '" << s3 << "'" << std::endl; // s3 now owns "Hello"

    std::vector<int> v1 = {1, 2, 3};
    std::vector<int> v2;
    v2 = std::move(v1); // Calls move assignment operator for std::vector
                        // v1 is now in a valid but unspecified state (likely empty)
    std::cout << "v1 after move to v2 (size): " << v1.size() << std::endl; // v1.size() is 0
    std::cout << "v2 (size): " << v2.size() << std::endl; // v2.size() is 3
    std::cout << "v2 elements: ";
    for (int x : v2) {
        std::cout << x << " ";
    }
    std::cout << std::endl;

    // This is dangerous! s1 is in an unspecified state.
    // std::cout << "Accessing s1's character: " << s1[0] << std::endl; // Undefined Behavior!

    return 0;
}
```
The output for `s1` after `std::move(s1)` will likely be an empty string, but the C++ standard only guarantees it's in a *valid but unspecified* state. This means you can destroy it, assign to it, or clear it, but you shouldn't rely on its contents or properties (like its size or capacity) until it's been reassigned.

**Formal/mathematical version:**
`std::move` is a function template defined in `<utility>`:
```cpp
template <typename T>
typename std::remove_reference<T>::type&& move(T&& arg) noexcept;
```
It performs a `static_cast<std::remove_reference<T>::type&&>(arg)`.
*   If `arg` is an lvalue of type `A`, `T` is deduced as `A&`. `std::remove_reference<A&>::type` is `A`. So `std::move(arg)` returns an `A&&`.
*   If `arg` is an rvalue of type `A`, `T` is deduced as `A`. `std::remove_reference<A>::type` is `A`. So `std::move(arg)` returns an `A&&`.

In essence, `std::move` always produces an xvalue (a kind of rvalue reference), which then allows overload resolution to pick a move constructor or move assignment operator if available.

**What could go wrong:** The biggest trap is using the object *after* it has been `std::move`d from. It's valid but unspecified, leading to potential crashes or incorrect behavior if you try to read from it or rely on its previous state. Treat an object after `std::move` as "used up."

### ### Step 6: `std::forward` — Preserving Value Category (Perfect Forwarding)

**Plain-English statement:** `std::forward` is primarily used within template functions that take "universal references" (also known as "forwarding references," which are `T&&` where `T` is a deduced template parameter). Its job is to "pass through" the original value category (lvalue or rvalue) of the argument to another function. If the original argument was an lvalue, `std::forward` makes it an lvalue reference. If it was an rvalue, `std::forward` makes it an rvalue reference. This is called "perfect forwarding."

**Small concrete example:**
```cpp
#include <iostream>
#include <utility> // For std::forward

// Overloaded functions to observe value category
void func(int& x) { std::cout << "func(int&): Lvalue reference " << x << std::endl; }
void func(int&& x) { std::cout << "func(int&&): Rvalue reference " << x << std::endl; }

// A wrapper template function that "forwards" its argument
template<typename T>
void wrapper(T&& arg) { // T&& here is a universal/forwarding reference
    std::cout << "Inside wrapper, calling func with forwarded arg..." << std::endl;
    func(std::forward<T>(arg)); // Perfect forwarding
    // func(arg); // If we just used 'arg', it would always call func(int&) because 'arg' itself is an lvalue inside wrapper
}

int main() {
    int x = 10;
    wrapper(x);       // 'x' is an lvalue. T becomes int&. std::forward<int&>(arg) yields int&. Calls func(int&).
    std::cout << std::endl;
    wrapper(20);      // '20' is a prvalue. T becomes int. std::forward<int>(arg) yields int&&. Calls func(int&&).
    std::cout << std::endl;
    wrapper(std::move(x)); // std::move(x) is an xvalue. T becomes int. std::forward<int>(arg) yields int&&. Calls func(int&&).
    return 0;
}
```
**Output:**
```
Inside wrapper, calling func with forwarded arg...
func(int&): Lvalue reference 10

Inside wrapper, calling func with forwarded arg...
func(int&&): Rvalue reference 20

Inside wrapper, calling func with forwarded arg...
func(int&&): Rvalue reference 10
```
Without `std::forward<T>(arg)`, if you just wrote `func(arg);` inside `wrapper`, both `wrapper(x)` and `wrapper(20)` calls would result in `func(int&)` being called. This is because `arg` *itself* is always an lvalue within the `wrapper` function's scope, even if it was initialized by an rvalue. `std::forward` correctly preserves the original value category.

**Formal/mathematical version:**
`std::forward` is a function template defined in `<utility>`:
```cpp
template <typename T>
T&& forward(typename std::remove_reference<T>::type& arg) noexcept;

template <typename T>
T&& forward(typename std::remove_reference<T>::type&& arg) noexcept;
```
The magic of `std::forward` relies on a concept called "reference collapsing rules."
*   If `T` is an lvalue reference type (e.g., `int&`), then `std::forward<T>(arg)` effectively becomes `static_cast<int&>(arg)`, yielding an lvalue reference.
*   If `T` is a non-reference type (e.g., `int`), then `std::forward<T>(arg)` effectively becomes `static_cast<int&&>(arg)`, yielding an rvalue reference (an xvalue).

This ensures that if the original argument passed to the universal reference `T&& arg` was an lvalue, `std::forward` passes it on as an lvalue. If it was an rvalue, `std::forward` passes it on as an rvalue.

**What could go wrong:** Not using `std::forward` in the context of universal references (`T&&` in templates) will cause all arguments to be treated as lvalues inside the template function, leading to unnecessary copies (if a copy constructor is called instead of a move constructor) or incorrect behavior. This defeats the purpose of perfect forwarding.

## 5. Worked examples — multiple, with every step shown

### Example 1: Custom Vector-like Class with Move Semantics

**Problem:** Implement a simplified dynamic array class, `MyVector<T>`, that correctly handles copying and moving of its elements, demonstrating the performance benefits of move semantics.

**Given:**
*   A template class `MyVector<T>`.
*   It needs to manage a dynamically allocated array of `T`.
*   It should have a constructor, destructor, copy constructor, copy assignment operator, move constructor, and move assignment operator.
*   It should include a `push_back` method.

**What we want:** Observe the calls to move/copy operations when `MyVector` objects are created, assigned, and resized.

**Solution:**

First, let's create a simple `Logger` class to track construction, destruction, copying, and moving of `MyVector`'s elements.

```cpp
#include <iostream>
#include <cstring> // For strlen, strcpy
#include <utility> // For std::move, std::forward, std::exchange (C++14)
#include <algorithm> // For std::swap

// --- Element type with logging ---
class LoggedItem {
public:
    int id;
    static int next_id;

    LoggedItem() : id(++next_id) {
        std::cout << "  LoggedItem #" << id << " Default Constructor" << std::endl;
    }

    LoggedItem(const LoggedItem& other) : id(++next_id) {
        std::cout << "  LoggedItem #" << id << " Copy Constructor from #" << other.id << std::endl;
    }

    LoggedItem(LoggedItem&& other) noexcept : id(other.id) { // Steal ID for logging clarity
        other.id = 0; // Mark source as moved-from for logging
        std::cout << "  LoggedItem #" << id << " Move Constructor from #" << other.id << " (was " << id << ")" << std::endl;
    }

    LoggedItem& operator=(const LoggedItem& other) {
        if (this == &other) return *this;
        std::cout << "  LoggedItem #" << this->id << " Copy Assignment from #" << other.id << std::endl;
        // No resource to manage, just update ID for logging
        this->id = ++next_id; // Assign a new ID to indicate it's a "new" item conceptually
        return *this;
    }

    LoggedItem& operator=(LoggedItem&& other) noexcept {
        if (this == &other) return *this;
        std::cout << "  LoggedItem #" << this->id << " Move Assignment from #" << other.id << std::endl;
        this->id = other.id; // Steal ID
        other.id = 0; // Mark source as moved-from
        return *this;
    }

    ~LoggedItem() {
        std::cout << "  LoggedItem #" << id << " Destructor" << std::endl;
    }
};
int LoggedItem::next_id = 0; // Initialize static counter

// --- MyVector<T> class ---
template <typename T>
class MyVector {
private:
    T* _data;
    size_t _size;
    size_t _capacity;

    void reallocate(size_t new_capacity) {
        if (new_capacity <= _capacity) return; // Only grow

        std::cout << "MyVector: Reallocating from capacity " << _capacity << " to " << new_capacity << std::endl;
        T* new_data = new T[new_capacity]; // Allocate new memory

        // Move existing elements to new memory
        for (size_t i = 0; i < _size; ++i) {
            new (new_data + i) T(std::move(_data[i])); // Placement new + move constructor
            _data[i].~T(); // Explicitly call destructor on old element
        }

        delete[] _data; // Deallocate old memory
        _data = new_data;
        _capacity = new_capacity;
    }

public:
    // Constructor
    MyVector() : _data(nullptr), _size(0), _capacity(0) {
        std::cout << "MyVector Default Constructor" << std::endl;
    }

    // Destructor
    ~MyVector() {
        std::cout << "MyVector Destructor (size " << _size << ", capacity " << _capacity << ")" << std::endl;
        for (size_t i = 0; i < _size; ++i) {
            _data[i].~T(); // Call destructors for elements
        }
        delete[] _data;
    }

    // Copy Constructor
    MyVector(const MyVector& other) : _data(nullptr), _size(0), _capacity(0) {
        std::cout << "MyVector Copy Constructor from (size " << other._size << ")" << std::endl;
        if (other._size > 0) {
            _capacity = other._size;
            _data = new T[_capacity];
            for (size_t i = 0; i < other._size; ++i) {
                new (_data + i) T(other._data[i]); // Placement new + copy constructor
            }
            _size = other._size;
        }
    }

    // Copy Assignment Operator
    MyVector& operator=(const MyVector& other) {
        std::cout << "MyVector Copy Assignment from (size " << other._size << ")" << std::endl;
        if (this == &other) return *this;

        // Clean up current resources
        for (size_t i = 0; i < _size; ++i) {
            _data[i].~T();
        }
        delete[] _data;
        _data = nullptr;
        _size = 0;
        _capacity = 0;

        // Copy elements
        if (other._size > 0) {
            _capacity = other._size;
            _data = new T[_capacity];
            for (size_t i = 0; i < other._size; ++i) {
                new (_data + i) T(other._data[i]);
            }
            _size = other._size;
        }
        return *this;
    }

    // Move Constructor
    MyVector(MyVector&& other) noexcept
        : _data(std::exchange(other._data, nullptr)), // Steal pointer, nullify source
          _size(std::exchange(other._size, 0)),       // Steal size, nullify source
          _capacity(std::exchange(other._capacity, 0)) // Steal capacity, nullify source
    {
        std::cout << "MyVector Move Constructor from (was size " << _size << ")" << std::endl;
    }

    // Move Assignment Operator
    MyVector& operator=(MyVector&& other) noexcept {
        std::cout << "MyVector Move Assignment from (was size " << other._size << ")" << std::endl;
        if (this == &other) return *this;

        // Clean up current resources
        for (size_t i = 0; i < _size; ++i) {
            _data[i].~T();
        }
        delete[] _data;

        // Steal resources from other
        _data = std::exchange(other._data, nullptr);
        _size = std::exchange(other._size, 0);
        _capacity = std::exchange(other._capacity, 0);
        return *this;
    }

    // Push back method
    void push_back(const T& value) {
        std::cout << "MyVector: push_back(const T&)" << std::endl;
        if (_size == _capacity) {
            reallocate(_capacity == 0 ? 1 : _capacity * 2);
        }
        new (_data + _size) T(value); // Placement new + copy constructor
        _size++;
    }

    void push_back(T&& value) {
        std::cout << "MyVector: push_back(T&&)" << std::endl;
        if (_size == _capacity) {
            reallocate(_capacity == 0 ? 1 : _capacity * 2);
        }
        new (_data + _size) T(std::move(value)); // Placement new + move constructor
        _size++;
    }

    size_t size() const { return _size; }
    size_t capacity() const { return _capacity; }
    T& operator[](size_t index) { return _data[index]; }
    const T& operator[](size_t index) const { return _data[index]; }
};

// --- Main function to demonstrate ---
int main() {
    std::cout << "--- Initializing v1 ---" << std::endl;
    MyVector<LoggedItem> v1;
    v1.push_back(LoggedItem()); // Rvalue, uses move ctor for element
    v1.push_back(LoggedItem()); // Rvalue, reallocates, moves old + new element
    v1.push_back(LoggedItem()); // Rvalue, reallocates, moves old + new element

    std::cout << "\n--- Copying v1 to v2 ---" << std::endl;
    MyVector<LoggedItem> v2 = v1; // Calls MyVector Copy Constructor for v2, then LoggedItem Copy Ctors for elements

    std::cout << "\n--- Moving v1 to v3 ---" << std::endl;
    MyVector<LoggedItem> v3 = std::move(v1); // Calls MyVector Move Constructor for v3

    std::cout << "\n--- Assigning v3 to v4 ---" << std::endl;
    MyVector<LoggedItem> v4; // Default construct
    v4 = v3; // Calls MyVector Copy Assignment for v4, then LoggedItem Copy Ctors for elements

    std::cout << "\n--- Moving v3 to v5 (assignment) ---" << std::endl;
    MyVector<LoggedItem> v5; // Default construct
    v5 = std::move(v3); // Calls MyVector Move Assignment for v5

    std::cout << "\n--- End of main ---" << std::endl;
    return 0;
}
```

**Explanation of each step:**

1.  **`LoggedItem` class:** This helper class logs every constructor, destructor, copy, and move operation. This is crucial for observing what happens under the hood. The `id` tracking helps distinguish individual items. `std::exchange` (C++14) is used in move operations for conciseness: it assigns a new value to the first argument and returns its old value.
2.  **`MyVector` Constructor/Destructor:** Standard initialization and cleanup. The destructor explicitly calls destructors for elements before freeing the raw memory.
3.  **`MyVector` Copy Constructor:** When `v2 = v1;`, this is called. It allocates *new* memory and then *copies* each `LoggedItem` from `v1` to `v2` using `LoggedItem`'s copy constructor.
4.  **`MyVector` Copy Assignment:** When `v4 = v3;`, this is called. It first cleans up `v4`'s existing resources, then allocates new memory, and *copies* each `LoggedItem` from `v3` to `v4`.
5.  **`MyVector` Move Constructor:** When `v3 = std::move(v1);`, this is called. It *steals* the `_data`, `_size`, and `_capacity` pointers/values from `v1`. Crucially, it sets `v1`'s internal pointers/sizes to `nullptr`/`0` to prevent `v1` from double-freeing the memory or trying to access invalid data when `v1` is eventually destroyed. This is a very fast operation (just pointer/integer assignments).
6.  **`MyVector` Move Assignment:** When `v5 = std::move(v3);`, this is called. It first cleans up `v5`'s existing resources, then *steals* the resources from `v3`, and nullifies `v3`.
7.  **`reallocate` method:** This is where move semantics shine. When `MyVector` needs to grow, it allocates a new, larger buffer. Instead of copying elements (`new (new_data + i) T(_data[i]);`), it *moves* them (`new (new_data + i) T(std::move(_data[i]));`). This uses the `LoggedItem`'s move constructor, which is much faster than its copy constructor. The old elements' destructors are then explicitly called.
8.  **`push_back` overloads:** There are two `push_back` overloads: one taking `const T&` (for lvalues, uses copy) and one taking `T&&` (for rvalues, uses move). When `push_back(LoggedItem())` is called, `LoggedItem()` is a prvalue, so the `push_back(T&&)` overload is chosen, leading to an efficient move of the temporary `LoggedItem` into the vector.

**Final Answer:**
The output will clearly show the distinction:
*   `v1.push_back(LoggedItem())` and subsequent reallocations will involve `LoggedItem` **Move Constructors**.
*   `MyVector<LoggedItem> v2 = v1;` will trigger `MyVector` **Copy Constructor** and then `LoggedItem` **Copy Constructors**.
*   `MyVector<LoggedItem> v3 = std::move(v1);` will trigger `MyVector` **Move Constructor** but *no* `LoggedItem` copy/move constructors, because only the internal pointers of `MyVector` are moved.
*   `v4 = v3;` will trigger `MyVector` **Copy Assignment** and then `LoggedItem` **Copy Constructors**.
*   `v5 = std::move(v3);` will trigger `MyVector` **Move Assignment** but *no* `LoggedItem` copy/move constructors.

**Reflection:** This example demonstrates the "Rule of Five" (or "Rule of Three/Zero" depending on C++ version) in action. For a class that manages resources, you typically need to define a destructor, copy constructor, copy assignment, move constructor, and move assignment. Move semantics dramatically reduces the cost of operations that would otherwise involve deep copies, especially for containers like `MyVector` during reallocation. The `LoggedItem` class is invaluable for visualizing these operations. The use of placement new `new (ptr) T(...)` is necessary when constructing objects into raw, pre-allocated memory.

### Example 2: `std::vector` and `std::string` with `std::move`

**Problem:** Demonstrate how `std::move` interacts with `std::vector` and `std::string` to achieve efficient resource transfer.

**Given:**
*   `std::vector<std::string>`
*   `std::string` objects

**What we want:** Show that `std::move` avoids string copies when moving elements between vectors or assigning strings.

**Solution:**

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <utility> // For std::move

// Helper to print vector contents
void print_vector(const std::string& name, const std::vector<std::string>& vec) {
    std::cout << name << " (size " << vec.size() << ", capacity " << vec.capacity() << "): [";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << "'" << vec[i] << "'";
        if (i < vec.size() - 1) std::cout << ", ";
    }
    std::cout << "]" << std::endl;
}

int main() {
    std::cout << "--- String Copy vs. Move ---" << std::endl;
    std::string s1 = "Hello World";
    std::cout << "s1 initial: '" << s1 << "'" << std::endl;

    std::string s2 = s1; // Copy construction
    std::cout << "s2 (copy of s1): '" << s2 << "'" << std::endl;
    std::cout << "s1 after copy: '" << s1 << "'" << std::endl; // s1 is unchanged

    std::string s3 = std::move(s1); // Move construction
    std::cout << "s3 (move of s1): '" << s3 << "'" << std::endl;
    std::cout << "s1 after move: '" << s1 << "'" << std::endl; // s1 is now empty (or valid but unspecified)

    std::cout << "\n--- Vector Copy vs. Move ---" << std::endl;
    std::vector<std::string> vec1;
    vec1.push_back("Apple");
    vec1.push_back("Banana");
    print_vector("vec1 initial", vec1);

    std::vector<std::string> vec2 = vec1; // Copy construction of vector and its elements
    print_vector("vec2 (copy of vec1)", vec2);
    print_vector("vec1 after copy", vec1); // vec1 is unchanged

    std::vector<std::string> vec3 = std::move(vec1); // Move construction of vector
    print_vector("vec3 (move of vec1)", vec3);
    print_vector("vec1 after move", vec1); // vec1 is now empty (size 0, capacity 0)

    std::cout << "\n--- Moving elements into a vector ---" << std::endl;
    std::vector<std::string> words;
    std::string temp_word = "Cherry";
    words.push_back(temp_word); // Uses std::string copy constructor (temp_word is lvalue)
    print_vector("words after push_back(lvalue)", words);
    std::cout << "temp_word after push_back(lvalue): '" << temp_word << "'" << std::endl;

    words.push_back(std::move(temp_word)); // Uses std::string move constructor (temp_word is moved)
    print_vector("words after push_back(rvalue)", words);
    std::cout << "temp_word after push_back(rvalue): '" << temp_word << "'" << std::endl; // temp_word is empty

    words.push_back(std::string("Date")); // Uses std::string move constructor (temporary is an rvalue)
    print_vector("words after push_back(temporary)", words);

    return 0;
}
```

**Explanation of each step:**

1.  **`std::string s2 = s1;`**: `s1` is an lvalue. The `std::string` copy constructor is invoked. A new memory buffer is allocated for `s2`, and "Hello World" is copied into it. `s1` remains unchanged.
2.  **`std::string s3 = std::move(s1);`**: `std::move(s1)` casts `s1` to an rvalue reference (an xvalue). The `std::string` move constructor is invoked. `s3` now "steals" the internal character pointer and length from `s1`. `s1`'s internal pointer is set to `nullptr` (or equivalent), and its size/length to 0. This is a very fast operation. `s1` is left in a valid but unspecified state (typically empty).
3.  **`std::vector<std::string> vec2 = vec1;`**: `vec1` is an lvalue. The `std::vector` copy constructor is invoked. This means `vec2` allocates its own internal buffer, and then for each `std::string` element in `vec1`, the `std::string` copy constructor is called to copy the string into `vec2`.
4.  **`std::vector<std::string> vec3 = std::move(vec1);`**: `std::move(vec1)` casts `vec1` to an rvalue reference. The `std::vector` move constructor is invoked. `vec3` "steals" the internal buffer pointer, size, and capacity from `vec1`. `vec1`'s internal state is nullified. This is extremely fast, involving only pointer and integer assignments, no element-wise copying. `vec1` is left empty.
5.  **`words.push_back(temp_word);`**: `temp_word` is an lvalue. `std::vector::push_back(const T&)` is called, which internally uses the `std::string` copy constructor to add a copy of "Cherry" to `words`. `temp_word` remains "Cherry".
6.  **`words.push_back(std::move(temp_word));`**: `std::move(temp_word)` casts `temp_word` to an rvalue reference. `std::vector::push_back(T&&)` is called, which internally uses the `std::string` move constructor to add "Cherry" to `words`. `temp_word` is now empty.
7.  **`words.push_back(std::string("Date"));`**: `std::string("Date")` creates a temporary `std::string` object (a prvalue). `std::vector::push_back(T&&)` is called, which uses the `std::string` move constructor to add "Date" to `words`. The temporary `std::string("Date")` is then destroyed.

**Final Answer:**
The output clearly shows `s1` becoming empty after being moved from, and `vec1` becoming empty after being moved from. Also, `temp_word` becomes empty after its contents are moved into the vector. This demonstrates that `std::move` facilitates resource transfer, not duplication.

**Reflection:** This example highlights how `std::move` is used to explicitly opt-in to move semantics for lvalues. It also shows that temporary objects (prvalues) automatically trigger move semantics because they are inherently rvalues. For `std::vector` and `std::string`, move operations are significantly faster than copy operations for large data.

### Example 3: Generic `swap` function using `std::move`

**Problem:** Implement a generic `swap` function that efficiently exchanges the values of two objects of any type `T`, leveraging move semantics to avoid unnecessary copies.

**Given:**
*   Two objects of type `T`.
*   The type `T` is assumed to have a default constructor, copy constructor, copy assignment, move constructor, and move assignment.

**What we want:** A `swap` function that performs a move-based exchange.

**Solution:**

```cpp
#include <iostream>
#include <utility> // For std::move

// Assuming LoggedItem from Example 1 is defined or similar
// For simplicity, let's use std::string here, as it has built-in move semantics.

// Custom swap function
template <typename T>
void my_swap(T& a, T& b) {
    // T temp = a;         // Copy constructor (potentially expensive)
    // a = b;              // Copy assignment (potentially expensive)
    // b = temp;           // Copy assignment (potentially expensive)

    T temp = std::move(a); // 1. Move a's resources to temp. a is now empty/unspecified.
    a = std::move(b);      // 2. Move b's resources to a. b is now empty/unspecified.
    b = std::move(temp);   // 3. Move temp's resources to b. temp is now empty/unspecified.
}

int main() {
    std::cout << "--- Swapping std::string objects ---" << std::endl;
    std::string s1 = "Alpha";
    std::string s2 = "Beta";

    std::cout << "Before swap:" << std::endl;
    std::cout << "  s1: '" << s1 << "'" << std::endl;
    std::cout << "  s2: '" << s2 << "'" << std::endl;

    my_swap(s1, s2);

    std::cout << "After swap:" << std::endl;
    std::cout << "  s1: '" << s1 << "'" << std::endl;
    std::cout << "  s2: '" << s2 << "'" << std::endl;

    std::cout << "\n--- Swapping custom LoggedItem objects ---" << std::endl;
    // We need the LoggedItem class definition from Example 1 here
    // For this example, let's assume it's available.
    // If you run this code, ensure LoggedItem is defined.
    // LoggedItem::next_id = 0; // Reset counter for clean logging

    // LoggedItem item1; // ID 1
    // LoggedItem item2; // ID 2
    // item1 = LoggedItem(); // Default construct, then move assign
    // item2 = LoggedItem(); // Default construct, then move assign

    // std::cout << "Before swap (LoggedItem):" << std::endl;
    // std::cout << "  item1 ID: " << item1.id << std::endl;
    // std::cout << "  item2 ID: " << item2.id << std::endl;

    // my_swap(item1, item2);

    // std::cout << "After swap (LoggedItem):" << std::endl;
    // std::cout << "  item1 ID: " << item1.id << std::endl;
    // std::cout << "  item2 ID: " << item2.id << std::endl;

    return 0;
}
```

**Explanation of each step:**

1.  **`T temp = std::move(a);`**: This line moves the resources from `a` into a temporary object `temp`. `a` is now in a valid but unspecified state (e.g., an empty string). This calls `T`'s move constructor.
2.  **`a = std::move(b);`**: This line moves the resources from `b` into `a`. `b` is now in a valid but unspecified state. This calls `T`'s move assignment operator.
3.  **`b = std::move(temp);`**: This line moves the resources from `temp` into `b`. `temp` is now in a valid but unspecified state. This calls `T`'s move assignment operator.

By using `std::move`, we ensure that instead of three potentially expensive deep copies, we perform three cheap resource transfers (pointer reassignments, etc.). The `std::string` class has these move operations implemented internally, so `my_swap` works efficiently with it.

**Formal/mathematical version:**
Let $A$ and $B$ be objects of type $T$.
The traditional copy-based swap:
1.  $temp \leftarrow \text{copy}(A)$
2.  $A \leftarrow \text{copy}(B)$
3.  $B \leftarrow \text{copy}(temp)$
This involves three deep copies, each potentially $O(N)$ for resource-owning objects. Total $O(3N)$.

The move-based swap:
1.  $temp \leftarrow \text{move}(A)$ (Move constructor)
2.  $A \leftarrow \text{move}(B)$ (Move assignment)
3.  $B \leftarrow \text{move}(temp)$ (Move assignment)
This involves three resource transfers, each typically $O(1)$ (pointer/integer assignments). Total $O(3)$.

**Final Answer:**
The `my_swap` function correctly swaps the contents of `s1` and `s2` without performing expensive deep copies. The output for `std::string` will show the values exchanged. If `LoggedItem` were used, the log would confirm move constructors and move assignments were called, not copy operations.

**Reflection:** This example beautifully illustrates the power of `std::move` for optimizing common operations. The standard library's `std::swap` (in `<algorithm>`) is implemented exactly this way for types that support move semantics, making it highly efficient. It's a classic pattern for writing generic, performant code.

### Example 4: Perfect Forwarding with `std::forward`

**Problem:** Write a generic wrapper function that takes an argument of any type and value category (lvalue or rvalue) and passes it perfectly to another function, preserving its original value category.

**Given:**
*   Two overloaded functions, `process_value(int&)` and `process_value(int&&)`, to observe value categories.
*   A template wrapper function.

**What we want:** The wrapper should call the correct `process_value` overload whether it receives an lvalue or an rvalue.

**Solution:**

```cpp
#include <iostream>
#include <utility> // For std::forward

// --- Target functions to be called ---
void process_value(int& x) {
    std::cout << "  [Target] process_value(int&): Received Lvalue reference, value = " << x << std::endl;
    x += 1; // Can modify lvalue
}

void process_value(int&& x) {
    std::cout << "  [Target] process_value(int&&): Received Rvalue reference, value = " << x << std::endl;
    x += 10; // Can modify the temporary object it binds to
}

// --- Wrapper function with perfect forwarding ---
template<typename T>
void generic_wrapper(T&& arg) { // T&& here is a universal/forwarding reference
    std::cout << "Wrapper: Received argument. Type of T: " << typeid(T).name() << std::endl;
    std::cout << "Wrapper: Calling process_value with std::forward<T>(arg)..." << std::endl;
    process_value(std::forward<T>(arg)); // Perfect forwarding
    std::cout << "Wrapper: Call complete." << std::endl;

    // What if we didn't use std::forward?
    // std::cout << "Wrapper: Calling process_value with just arg (this is always an lvalue inside wrapper)..." << std::endl;
    // process_value(arg); // This would always call process_value(int&)
    // std::cout << "Wrapper: Call complete." << std::endl;
}

int main() {
    std::cout << "--- Test Case 1: Lvalue argument ---" << std::endl;
    int a = 100;
    std::cout << "Main: Initial 'a' = " << a << std::endl;
    generic_wrapper(a); // 'a' is an lvalue
    std::cout << "Main: 'a' after wrapper call = " << a << std::endl;
    std::cout << std::endl;

    std::cout << "--- Test Case 2: Rvalue argument (prvalue) ---" << std::endl;
    std::cout << "Main: Calling wrapper with 200 (prvalue)" << std::endl;
    generic_wrapper(200); // '200' is a prvalue
    std::cout << std::endl;

    std::cout << "--- Test Case 3: Rvalue argument (xvalue from std::move) ---" << std::endl;
    int b = 300;
    std::cout << "Main: Initial 'b' = " << b << std::endl;
    generic_wrapper(std::move(b)); // std::move(b) is an xvalue
    std::cout << "Main: 'b' after wrapper call = " << b << std::endl; // b is moved-from (valid but unspecified)
    std::cout << std::endl;

    return 0;
}
```

**Explanation of each step:**

1.  **`process_value(int& x)` and `process_value(int&& x)`:** These are our target functions. They are overloaded to distinguish between lvalue and rvalue