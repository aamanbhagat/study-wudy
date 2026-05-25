## What it is
The Rule of Zero is a C++ guideline stating that a class should either handle resource management exclusively (and thus follow the Rule of Five/Three) or not at all. If a class does not directly manage any resources (like memory, files, or sockets), it should not declare any of the five special member functions, instead allowing the compiler to generate them.

## Why it matters
In complex systems like physics simulations or aerospace flight software, incorrect resource management leads to memory leaks, data corruption, and crashes. By adhering to the Rule of Zero, you compose complex objects from simpler, robust components (like `std::vector` or `std::unique_ptr`) that already manage resources correctly. This drastically reduces bugs, simplifies code, and makes it easier to prove the correctness of your system—a non-negotiable requirement for high-reliability applications.

## When to study it
You must have a solid grasp of the following prerequisites. If not, master them first.
1.  **The Rule of Three/Five:** You must understand what the five special member functions are (destructor, copy constructor, copy assignment operator, move constructor, move assignment operator) and why you need to write them when your class directly manages a resource (e.g., a raw pointer allocated with `new`).
2.  **RAII (Resource Acquisition Is Initialization):** This is the fundamental C++ idiom for resource management. The Rule of Zero is a design pattern for applying RAII effectively.
3.  **Smart Pointers:** You must be comfortable with `std::unique_ptr` and `std::shared_ptr` as tools for expressing ownership of heap-allocated memory.
4.  **Standard Library Containers:** You need to know that containers like `std::vector` and `std::string` correctly manage their own memory and obey the Rule of Five.

## How to study it (step by step)
1.  **Solidify the "Why":** Write a simple class `RawArray` that holds a `int* data_` and a `size_t size_`. In the constructor, use `new int[size]`. In the destructor, use `delete[] data_`. Now, create an object, copy it to another, and let them go out of scope. Observe the double-free crash. This is the problem you are solving.
2.  **Implement the Rule of Five:** Fix the `RawArray` class from step 1 by correctly implementing all five special member functions. This is tedious. Appreciate the complexity and potential for error. This is the "old way" of doing things.
3.  **Apply the Rule of Zero:** Create a new class, `SmartArray`. This time, hold the data in a `std::unique_ptr<int[]>`. Do not write *any* special member functions. Repeat the copy/destruction test from step 1. Note that it fails to compile on copy because `std::unique_ptr` is not copyable. This is good; it forces you to be explicit about ownership.
4.  **Enable Correct Copying:** Change the member in `SmartArray` from `std::unique_ptr<int[]>` to `std::vector<int>`. Again, write zero special member functions. Now, repeat the copy/destruction test. It works perfectly. The compiler-generated copy constructor calls `std::vector`'s copy constructor, which performs a correct deep copy.
5.  **Compose Complex Objects:** Create a `Particle` class that contains a `std::string name_` and a `std::vector<double> position_`. Add some logic methods. Do not add any special member functions. Verify that you can copy, move, and destroy `Particle` objects safely, because its members (`std::string`, `std::vector`) are well-behaved resource owners. This is the essence of the Rule of Zero.

## Key ideas, with intuition
1.  **Separation of Concerns:** A class should have a single responsibility. Resource management is one responsibility. Your application's logic (e.g., calculating a trajectory) is another. The Rule of Zero encourages you to create classes that focus only on logic, delegating resource management to member objects designed for that purpose.
2.  **Ownership by Composition:** Instead of managing a raw resource (`T*`), a class should contain a member object that owns the resource.
    $$
    \text{class Bad} \{ T* \text{ptr}; \}; \quad // \text{Manages resource directly. Must follow Rule of 5.}
    $$
    $$
    \text{class Good} \{ \text{std::vector<T>} \text{vec}; \}; \quad // \text{Delegates resource management. Follows Rule of 0.}
    $$
    The `Good` class owns a `std::vector`, and the `std::vector` owns the underlying array. Ownership is clear and encapsulated.
3.  **Recursive Correctness:** The compiler-generated special members work by simply invoking the corresponding special member on each class member in the order of declaration. If all your members correctly manage their resources (i.e., they follow the Rule of Five or Zero), then the generated functions for your class will also be correct. The correctness is built recursively.

## Worked example
Let's model a rocket stage. An older, C-style approach might manage the list of engines with a raw array.

**Problematic Approach (Rule of Five required):**
```cpp
class RocketStage_Bad {
public:
    RocketStage_Bad(const std::string& name, int num_engines) 
        : name_(name), num_engines_(num_engines), engines_(new Engine[num_engines]) {
        // ... initialize engines
    }

    // 1. Destructor
    ~RocketStage_Bad() {
        delete[] engines_;
    }

    // 2. Copy Constructor (Deep Copy)
    RocketStage_Bad(const RocketStage_Bad& other)
        : name_(other.name_), num_engines_(other.num_engines_), engines_(new Engine[other.num_engines_]) {
        std::copy(other.engines_, other.engines_ + num_engines_, engines_);
    }

    // 3. Copy Assignment (Copy-and-Swap Idiom)
    RocketStage_Bad& operator=(RocketStage_Bad other) {
        std::swap(name_, other.name_);
        std::swap(num_engines_, other.num_engines_);
        std::swap(engines_, other.engines_);
        return *this;
    }

    // 4. & 5. Move Constructor and Move Assignment would also be needed for efficiency...
    // ... but are omitted for brevity. This is already complex.

private:
    std::string name_;
    int num_engines_;
    Engine* engines_; // Raw owning pointer!
};
```
*Reflection:* This is a lot of boilerplate code. A bug in any of the special functions (e.g., forgetting to handle self-assignment in `operator=`) could lead to memory leaks or crashes.

**Rule of Zero Approach:**
```cpp
#include <string>
#include <vector>
#include <utility> // For std::move

// Assume Engine is a class that also follows the Rule of Zero
class Engine { /* ... */ };

class RocketStage_Good {
public:
    // The constructor now uses the vector's constructor.
    RocketStage_Good(std::string name, int num_engines) 
        : name_(std::move(name)), engines_(num_engines) {
        // ... initialize engines in the vector
    }

    // No user-declared special members are needed.
    // ~RocketStage_Good() = default;
    // RocketStage_Good(const RocketStage_Good&) = default;
    // RocketStage_Good& operator=(const RocketStage_Good&) = default;
    // RocketStage_Good(RocketStage_Good&&) = default;
    // RocketStage_Good& operator=(RocketStage_Good&&) = default;

private:
    std::string name_;
    std::vector<Engine> engines_; // Resource-owning member
};
```
*Reflection:* We replaced the raw pointer `Engine*` with `std::vector<Engine>`. Because `std::string` and `std::vector` are well-behaved types that manage their own resources, our `RocketStage_Good` class no longer needs to. The compiler-generated destructor will correctly call the destructors for `name_` and `engines_`. The compiler-generated copy constructor will correctly copy them. The code is simpler, safer, and more expressive.

## Diagrams
Here is the memory layout for the two approaches.

**Diagram 1: Rule of Five (`RocketStage_Bad`)**
The object itself holds a raw pointer, directly linking it to a separate, manually-managed block of memory on the heap. This coupling is the source of the complexity.
```text
         Stack                                    Heap
+----------------------+                 +----------------------+
| RocketStage_Bad obj  |                 | Engine Array         |
|----------------------|                 |----------------------|
| name_: (std::string) |                 | [Engine 0]           |
| num_engines_: 3      |                 | [Engine 1]           |
| engines_: 0xABC123 --+---------------> | [Engine 2]           |
+----------------------+                 +----------------------+
```

**Diagram 2: Rule of Zero (`RocketStage_Good`)**
The object owns a `std::vector`. The `std::vector` object, in turn, manages the heap memory. Our class is insulated from the raw details of memory management.
```text
         Stack                                                        Heap
+-----------------------+                 +-----------------------+                 +----------------------+
| RocketStage_Good obj  |                 | std::vector obj       |                 | Engine Array         |
|-----------------------|                 |-----------------------|                 |----------------------|
| name_: (std::string)  |                 | _M_impl._M_start: ----+---------------> | [Engine 0]           |
| engines_: (vector) ---+---------------> | _M_impl._M_finish:    |                 | [Engine 1]           |
|                       |                 | _M_impl._M_end...:    |                 | [Engine 2]           |
+-----------------------+                 +-----------------------+                 +----------------------+
                                          (Internal vector data)
```

## Memory technique — remember this forever
1.  **Mnemonic Story:** Think of your class as a **Project Manager**. A bad manager tries to do all the low-level work themselves (managing raw memory) and quickly gets overwhelmed, making mistakes. An elite manager (a Rule of Zero class) **delegates**. They hire experts (`std::vector` for arrays, `std::unique_ptr` for single objects) to handle specific resources. The manager's job is to focus on the high-level logic, trusting the experts to do their job correctly. **"Don't micromanage memory; delegate to experts."**
2.  **Facts to Overlearn:**
    *   If you write any of the following for your class, you must consider all of them (Rule of Five): destructor, copy constructor, copy assignment, move constructor, move assignment.
    *   The Rule of Zero: If a class does not manage resources directly, it should declare none of the five special member functions.
3.  **Spaced Repetition Schedule:** Review this concept and the worked example at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days**.
4.  **First Principles Pathway:** If you forget, reason from scratch.
    *   Start with a class holding a raw pointer: `class C { int* p = new int(5); };`
    *   What happens when you copy it? `C c1; C c2 = c1;`. Both `c1.p` and `c2.p` hold the same address. This is a shallow copy.
    *   What happens when they are destroyed? The destructor for `c2` runs, `delete c2.p`. Then the destructor for `c1` runs, `delete c1.p`. This is a **double free**, a critical error.
    *   This forces you to write a custom copy constructor to perform a deep copy. The need for one special function implies the need for others.
    *   The solution is to not have a raw pointer in the first place. Use a class that already solved this problem, like `std::unique_ptr` or `std::vector`. That is the Rule of Zero.

## Common mistakes
1.  **Defining a "Trivial" Destructor:** Writing `MyClass::~MyClass() {}` just to log a message or because you think it's good practice. This user-declared destructor prevents the compiler from automatically generating the move constructor and move assignment operator. This silently turns all moves into expensive copies, hurting performance.
2.  **Confusing Owning vs. Observing Pointers:** A class can hold a raw pointer `T*` if it does *not* own the memory (it doesn't `new` or `delete` it). This is an "observing" or "non-owning" pointer. A class with only non-owning pointers and other well-behaved members can, and often should, follow the Rule of Zero.
3.  **Partial Manual Management:** A class contains a `std::vector` but also a single raw pointer `int* cache_` that it `new`s and `delete`s. This class is now a resource manager and must follow the Rule of Five. The presence of the `std::vector` doesn't absolve it of this duty for the raw pointer. The best fix is to replace `int* cache_` with `std::unique_ptr<int>`.

## Self-check
1.  A class `Student` has two members: `std::string name_` and `int student_id_`. Should this class follow the Rule of Zero or the Rule of Five? Why?
2.  You are given a legacy C-style library that has functions `handle* create_thing()` and `void destroy_thing(handle* h)`. You need to write a C++ wrapper class `ThingManager` that safely manages the `handle*`. Which Rule should your `ThingManager` class follow? Implement its destructor and copy constructor.
3.  Consider a class `SceneNode` used in a 3D simulation. It contains a `std::vector<SceneNode> children_` and a raw pointer `SceneNode* parent_`. The node *owns* its children, but merely *observes* its parent. Can this class follow the Rule of Zero? Justify your answer by considering what the compiler-generated copy constructor and destructor would do.