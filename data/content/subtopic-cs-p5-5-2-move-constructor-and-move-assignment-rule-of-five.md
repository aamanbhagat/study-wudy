## What it is
The Rule of Five is a guideline in C++ for classes that manage resources (like memory, file handles, or network sockets). It states that if you need to explicitly define any one of the following five special member functions, you likely need to define all five: the destructor, copy constructor, copy assignment operator, move constructor, and move assignment operator. This ensures your class handles resource ownership correctly and efficiently, preventing leaks, double-frees, and unnecessary copies.

## Why it matters
In high-performance computing, such as physics simulations or real-time control systems for rocketry, needless copying of large data structures (e.g., matrices for a finite element analysis, or sensor data buffers) is a performance killer. Move semantics allow you to transfer ownership of expensive resources from temporary objects to permanent ones with minimal overhead—essentially the cost of a few pointer assignments. This is fundamental for writing efficient C++ that underpins performant scientific libraries and applications.

## When to study it
You must be comfortable with the following C++ concepts first. If not, study them and return.
1.  **Classes and Objects:** The fundamentals of object-oriented programming.
2.  **Pointers and Dynamic Memory:** `new`, `delete`, and managing memory on the heap.
3.  **The Rule of Three:** You must understand why a class managing a resource needs a destructor, copy constructor, and copy assignment operator. The Rule of Five is a direct extension of this.
4.  **Operator Overloading:** Specifically, how to overload the assignment operator (`operator=`).

## How to study it (step by step)
1.  **Implement the Rule of Three:** Create a simple `Vector` class that holds a dynamically allocated array of doubles. Implement its destructor, copy constructor, and copy assignment operator correctly. Add print statements to each to see when they are called.
2.  **Identify the Performance Problem:** Write a function that creates and returns one of your `Vector` objects by value. In your `main` function, call this and assign the result to a new `Vector`. Observe from your print statements that a deep, expensive copy is made from the temporary return value.
3.  **Understand Rvalue References:** Read about the distinction between lvalues (things you can take the address of, like `int x;`) and rvalues (temporaries, like the `42` in `x = 42;`). Learn the syntax for an rvalue reference: `T&&`. This is the key mechanism the language uses to identify temporary objects that are safe to "steal" from.
4.  **Implement the Move Constructor:** Add a move constructor to your `Vector` class. Its signature will be `Vector(Vector&& other)`. Inside, instead of allocating new memory and copying elements, "steal" the pointer and size from `other`, then set `other`'s pointer to `nullptr`. This prevents `other`'s destructor from freeing the memory you just took.
5.  **Implement the Move Assignment Operator:** Add a move assignment operator, `Vector& operator=(Vector&& other)`. Its logic is similar to the move constructor but must also handle freeing its own existing resources and checking for self-assignment.
6.  **Use `std::move`:** Re-run your test from step 2. Notice the compiler now automatically calls your move constructor for the temporary return value. Now, create two named `Vector` objects, `v1` and `v2`. Try to assign `v2 = v1;` (this will copy). Then, write `v2 = std::move(v1);`. Observe that this calls your move assignment operator. `std::move` is a cast that tells the compiler "treat this lvalue as if it were an rvalue," signaling that you are done with it and its resources can be moved.

## Key ideas, with intuition
1.  **Lvalues vs. Rvalues (Location vs. Value):** An lvalue is an expression that refers to a memory *location* and can appear on the left-hand side of an assignment (e.g., `my_variable`). An rvalue is a temporary expression that refers to a *value* and typically appears on the right-hand side (e.g., `2+2`, or the return value of a function). The key intuition is: **rvalues are about to die.**
2.  **Ownership Transfer, Not Duplication:** Copying is like photocopying a book. You get a new, independent book, but it takes time and paper. Moving is like being given the original book. The transfer is instantaneous, but the original owner no longer has it. The move constructor and move assignment operator are for transferring ownership of resources.
3.  **Rvalue Reference (`&&`) as a "Temporary Catcher":** The type `T&&` is a reference that can only bind to rvalues. This allows you to write function overloads that are chosen *only* when the argument is a temporary. This is how the compiler knows to call `MyClass(MyClass&&)` instead of `MyClass(const MyClass&)` for a temporary object.
4.  **The "Zombie" State:** After an object has been moved from, it must be left in a valid but unspecified state. The most common practice is to set its pointers to `nullptr` and its size/capacity to zero. This ensures its destructor can be called safely without causing a double-free, but using it for anything else is generally a bug. It's a "zombie"—technically alive, but empty inside.

## Worked example
Let's implement the Rule of Five for a simple `Buffer` class that manages a dynamic array.

```cpp
#include <iostream>
#include <utility> // For std::move
#include <algorithm> // For std::copy

class Buffer {
public:
    // 1. Default constructor
    Buffer(size_t size) : m_size(size), m_data(new int[size]) {
        std::cout << "Constructor called for size " << m_size << "\n";
    }

    // 2. Destructor
    ~Buffer() {
        std::cout << "Destructor called for size " << m_size << "\n";
        delete[] m_data;
    }

    // 3. Copy Constructor
    Buffer(const Buffer& other) : m_size(other.m_size), m_data(new int[other.m_size]) {
        std::cout << "Copy Constructor called.\n";
        std::copy(other.m_data, other.m_data + m_size, m_data);
    }

    // 4. Copy Assignment Operator
    Buffer& operator=(const Buffer& other) {
        std::cout << "Copy Assignment called.\n";
        if (this == &other) { // Self-assignment check
            return *this;
        }
        delete[] m_data; // Free existing resource
        m_size = other.m_size;
        m_data = new int[m_size];
        std::copy(other.m_data, other.m_data + m_size, m_data);
        return *this;
    }

    // 5. Move Constructor
    Buffer(Buffer&& other) noexcept : m_size(0), m_data(nullptr) {
        std::cout << "Move Constructor called.\n";
        // Steal the data
        m_size = other.m_size;
        m_data = other.m_data;
        // Leave `other` in a valid but empty state
        other.m_size = 0;
        other.m_data = nullptr;
    }

    // 6. Move Assignment Operator
    Buffer& operator=(Buffer&& other) noexcept {
        std::cout << "Move Assignment called.\n";
        if (this == &other) { // Self-assignment check
            return *this;
        }
        delete[] m_data; // Free existing resource
        // Steal the data
        m_size = other.m_size;
        m_data = other.m_data;
        // Leave `other` in a valid but empty state
        other.m_size = 0;
        other.m_data = nullptr;
        return *this;
    }

private:
    size_t m_size;
    int* m_data;
};

Buffer create_buffer(size_t size) {
    return Buffer(size); // Creates a Buffer, returns it by value (an rvalue)
}

int main() {
    Buffer b1(100); // Constructor
    Buffer b2 = b1; // Copy Constructor

    std::cout << "\n--- Move Example ---\n";
    Buffer b3 = create_buffer(200); // Move constructor is called on the temporary return value

    std::cout << "\n--- std::move Example ---\n";
    Buffer b4(50);
    b4 = std::move(b1); // Move assignment. b1 is now a zombie.

    std::cout << "\n--- End of main ---\n";
    return 0;
}
```

**Reflection:**
- The copy constructor and copy assignment performed a "deep copy," allocating new memory and copying every element. This is expensive.
- The move constructor and move assignment were cheap. They simply swapped pointer values and sizes.
- We set the moved-from object's pointer to `nullptr`. This was critical. Without it, when `other`'s destructor ran, it would `delete[]` the memory that we had just "stolen," leading to a double-free and a crash when the new owner's destructor ran.
- The compiler automatically chose the move constructor for the return value of `create_buffer` because it's an rvalue. We had to use `std::move` to explicitly trigger the move assignment from `b1`, which is an lvalue.

## Diagrams

**Copy Operation**

```text
Before:
b1 (stack)           b2 (stack)
+--------+           +--------+
| m_size | --------> | m_size | (uninitialized)
| m_data | ----+     | m_data | (uninitialized)
+--------+     |     +--------+
               |
               v
             Heap Memory
             +---------+
             | int int | ...
             +---------+

After `Buffer b2 = b1;` (Copy Constructor):
b1 (stack)           b2 (stack)
+--------+           +--------+
| m_size |           | m_size |
| m_data | ----+     | m_data | ----+
+--------+     |     +--------+     |
               |                    |
               v                    v
             Heap Memory          Heap Memory (New Allocation)
             +---------+          +---------+
             | int int | ...      | int int | ... (data copied)
             +---------+          +---------+
```

**Move Operation**

```text
Before `b4 = std::move(b1);`:
b1 (stack)           b4 (stack)
+--------+           +--------+
| m_size |           | m_size |
| m_data | ----+     | m_data | ----+
+--------+     |     +--------+     |
               |                    |
               v                    v
             Heap Memory          Heap Memory
             +---------+          +---------+
             | int int | ...      | int int | ...
             +---------+          +---------+

After `b4 = std::move(b1);` (Move Assignment):
b1 (stack)           b4 (stack)
+--------+           +--------+
| m_size=0 |         | m_size |
| m_data=nullptr |   | m_data | ----+
+--------+           +--------+     |
                                    |
                                    v
                                  Heap Memory (b1's original memory)
                                  +---------+
                                  | int int | ...
                                  +---------+
(b4's original memory was deleted)
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Imagine you are moving apartments.
    - **Copying (Rule of Three):** You go to IKEA, buy all new furniture identical to your old furniture, and assemble it in the new apartment. You leave the old apartment full of furniture. This is slow and expensive.
    - **Moving (Rule of Five):** You hire movers. They take your *existing* furniture from the old apartment and put it in the new one. The old apartment is now empty. This is fast and efficient. The "zombie state" is your empty old apartment. `std::move` is you pointing at your old furniture and telling the movers, "Take this."
2.  **Formulas to Overlearn (The Signatures):**
    ```cpp
    // Destructor
    ~MyClass();
    // Copy Constructor
    MyClass(const MyClass& other);
    // Copy Assignment Operator
    MyClass& operator=(const MyClass& other);
    // Move Constructor
    MyClass(MyClass&& other) noexcept;
    // Move Assignment Operator
    MyClass& operator=(MyClass&& other) noexcept;
    ```
    Note the `const &` for copy (you can't change the source) and `&&` for move (you can only bind to a temporary/movable source). The `noexcept` is a critical optimization hint to the compiler.
3.  **Spaced Repetition Schedule:** Review this material and your `Vector` implementation at **1 day, 3 days, 7 days, 16 days, 35 days**. At each review, re-implement the class from scratch.
4.  **First Principles Pathway:** If you forget the details, start from the question: "Copying a temporary object that's about to be destroyed is wasteful. How can I detect a temporary object and just steal its internal data instead of copying it?" This leads you to:
    - "I need a way to distinguish temporaries." -> rvalues.
    - "I need a special syntax for that." -> rvalue references (`&&`).
    - "I need special functions that take rvalue references." -> move constructor and move assignment.
    - "What do I do to the source after stealing its data?" -> Put it in a state where its destructor won't break anything. -> Set its pointer to `nullptr`.

## Common mistakes
1.  **Forgetting to Null Out the Source:** In a move operation, failing to set `other.m_data = nullptr;`. This will cause both the source and destination objects' destructors to call `delete[]` on the same address, causing a double-free and a crash.
2.  **Accidentally Copying in a Move:** Writing a move constructor that allocates new memory and copies data. This defeats the entire purpose of move semantics but will compile and run correctly, just slowly. It's a performance bug, not a correctness bug.
3.  **Incorrect Move Assignment:** Forgetting to `delete[]` the existing resource in the move assignment operator before taking ownership of the new one. This causes a memory leak.
4.  **Overusing `std::move`:** Using `std::move` on an object you intend to use again later. After being moved from, the object is in a valid but unspecified state. Accessing it is dangerous. Only `std::move` from an object you are truly finished with.

## Self-check
1.  Consider a class `Widget` with logging in all five special member functions. What is the exact output of the following code?
    ```cpp
    Widget make_widget() {
        Widget w;
        return w;
    }
    int main() {
        Widget w1;
        Widget w2 = w1;
        Widget w3 = make_widget();
    }
    ```
2.  You are given the following class that manages a single dynamically allocated integer. Implement the Rule of Five for this class correctly.
    ```cpp
    class IntWrapper {
    public:
        IntWrapper(int value);
        // ... your 5 special member functions here ...
    private:
        int* m_ptr;
    };
    ```
3.  In the `create_buffer` function from our worked example, we wrote `return Buffer(size);`. Would it be better to write `return std::move(Buffer(size));`? Why or why not? Research "copy elision" and "named return value optimization (NRVO)" to formulate your answer.