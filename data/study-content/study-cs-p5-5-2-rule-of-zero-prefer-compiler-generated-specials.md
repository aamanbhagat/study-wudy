## 1. What it is — in plain English

Imagine you're building a LEGO spaceship. You have a big box of standard LEGO bricks, and the instructions tell you exactly how to snap them together. If all the parts you use are standard bricks, you don't need to custom-make any special pieces yourself. You just follow the instructions, and the spaceship comes out perfectly.

In C++ programming, a "class" is like a blueprint for creating objects, which are like your LEGO spaceship. These objects often need special care when they are created, copied, moved, or destroyed. For example, when you copy a spaceship, you want a complete, identical new one, not just a label pointing to the old one.

The "Rule of Zero" is a simple but powerful guideline: If your C++ class is made up entirely of "standard LEGO bricks" (meaning, other well-behaved C++ types like numbers, strings, or smart pointers that already know how to handle themselves), then you should *not* write any custom code for these special operations. Let the C++ compiler do it automatically.

The compiler is very good at generating the correct default behavior for creating, copying, moving, and destroying objects if all the parts inside your object are also well-behaved. By letting the compiler do its job, you make your code simpler, safer, and less prone to bugs. It's like trusting the LEGO instructions for standard bricks instead of trying to carve your own.

## 2. Why it matters — real-world applications

The Rule of Zero is not just an academic concept; it's a cornerstone of writing robust, maintainable, and high-performance C++ code in complex systems.

1.  **Operating Systems and System Utilities (e.g., Linux Kernel, Windows Components):** Operating systems are massive C++ (and C) codebases. Components like file system drivers, network stacks, or process managers often deal with intricate resource management (memory, file handles, network sockets, mutexes). If every class that *contained* a file handle or a mutex had to manually write its copy constructor, assignment operator, and destructor, the code would become an unmanageable mess, riddled with resource leaks, double-frees, or use-after-free bugs. By encapsulating raw resources into small, dedicated RAII (Resource Acquisition Is Initialization) classes (e.g., a `FileHandle` class that automatically closes the file on destruction), the *higher-level* classes that use these RAII wrappers can then adhere to the Rule of Zero. This drastically improves reliability and reduces the surface area for bugs in critical system components.

2.  **Financial Trading Platforms (e.g., High-Frequency Trading Systems):** In high-frequency trading, every microsecond matters, and correctness is paramount. A bug in resource management could lead to significant financial losses. Trading algorithms and data structures often involve complex objects managing market data, order books, and execution strategies. These systems rely heavily on performance and correctness. By using `std::vector`, `std::string`, and `std::unique_ptr`/`std::shared_ptr` (which are all RAII types) and letting the compiler generate the special member functions, developers can focus on the business logic rather than boilerplate resource management. This reduces development time, enhances code safety, and contributes to the stability required for such demanding applications.

3.  **Game Engines and High-Performance Graphics (e.g., Unreal Engine, Unity's C++ Core):** Modern game engines manage vast amounts of data: textures, meshes, animations, audio, and game state. Objects representing game entities, scene graphs, or rendering pipelines are frequently copied, moved, and destroyed. Manually managing dynamic memory for these objects in every class would be a nightmare. Game engines extensively use smart pointers (`std::unique_ptr`, `std::shared_ptr`) and containers (`std::vector`, `std::map`) to handle memory and other resources automatically. This allows game developers to define complex game objects (e.g., a `PlayerCharacter` class containing a `std::unique_ptr<Mesh>` and `std::vector<Animation>`) and rely on the Rule of Zero, making the engine more robust, easier to extend, and less prone to memory-related crashes that plague games.

4.  **Scientific Computing and Machine Learning Libraries (e.g., TensorFlow, PyTorch C++ backend):** Libraries for scientific computing and machine learning deal with large datasets, complex matrix operations, and device-specific resources (e.g., GPU memory, custom hardware accelerators). Performance and correct resource handling are vital. For instance, a class representing a neural network layer might contain matrices (`Eigen::MatrixXd` or custom tensor types) and pointers to GPU memory. By ensuring that these underlying matrix/tensor types are RAII-compliant (managing their own memory) or by wrapping raw GPU memory handles in smart RAII classes, the higher-level `NeuralNetworkLayer` class can then follow the Rule of Zero. This prevents memory leaks on GPUs or CPUs, ensures correct data copying during model serialization, and simplifies the development of complex algorithms.

## 3. Prerequisites — what you must know first

To fully grasp the Rule of Zero, you should be familiar with the following core C++ concepts:

*   **Classes and Objects:** The fundamental building blocks of object-oriented programming in C++, defining data and behavior.
*   **Constructors:** Special member functions that initialize an object when it's created.
*   **Destructors:** Special member functions that clean up resources when an object is destroyed.
*   **Member Variables:** Data fields within a class that hold the object's state.
*   **Pointers and Dynamic Memory Allocation:** Understanding `new`, `delete`, and how to manage memory on the heap.
*   **Value Semantics vs. Reference Semantics:** How objects behave when copied or assigned – whether they create independent copies or refer to the same underlying data.
*   **Resource Acquisition Is Initialization (RAII):** A C++ idiom where resource ownership (like memory, file handles, network connections) is tied to the lifetime of an object, ensuring automatic cleanup.
*   **Copy Constructor:** A special constructor that creates a new object as a copy of an existing object.
*   **Copy Assignment Operator:** A special operator that assigns the value of one existing object to another existing object.
*   **Move Constructor:** A special constructor that "steals" resources from a temporary object to create a new one, avoiding expensive copies.
*   **Move Assignment Operator:** A special operator that "steals" resources from a temporary object and assigns them to an existing object.
*   **`std::string`, `std::vector`, `std::unique_ptr`, `std::shared_ptr`:** Familiarity with these standard library components, especially their resource management properties (they are all RAII types).

## 4. The core idea — step by step

The Rule of Zero is about understanding when you *don't* need to manually define certain special functions in your C++ classes, and why letting the compiler do it is often the best choice.

### Step 1: The "Big Six" Special Member Functions

Every C++ class can have up to six special member functions that the compiler might generate automatically or that you might define yourself. These functions govern how objects are created, copied, moved, and destroyed. They are:

*   **Default Constructor:** Called when an object is created without specific arguments (e.g., `MyClass obj;`).
*   **Destructor:** Called when an object is destroyed (e.g., when it goes out of scope).
*   **Copy Constructor:** Called when an object is initialized as a copy of another object (e.g., `MyClass obj2 = obj1;`).
*   **Copy Assignment Operator:** Called when an object is assigned the value of another existing object (e.g., `obj2 = obj1;`).
*   **Move Constructor:** Called when an object is initialized by "stealing" resources from a temporary object (e.g., `MyClass obj2 = std::move(obj1);`).
*   **Move Assignment Operator:** Called when an object is assigned the resources from another temporary object (e.g., `obj2 = std::move(obj1);`).

**Plain-English Statement:** These are the six fundamental actions that can happen to an object in C++: being born, dying, being duplicated, or having its contents transferred efficiently.

**Example:**
```cpp
class Widget {
public:
    // Default Constructor
    // Destructor
    // Copy Constructor
    // Copy Assignment Operator
    // Move Constructor
    // Move Assignment Operator
    // (All potentially compiler-generated)
};

void func() {
    Widget w1;           // Default Constructor
    Widget w2 = w1;      // Copy Constructor
    Widget w3;
    w3 = w1;             // Copy Assignment Operator
    Widget w4 = std::move(w1); // Move Constructor
    w3 = std::move(w2);  // Move Assignment Operator
    // w1, w2, w3, w4 implicitly destroyed at end of scope (Destructor)
}
```

**Formal Version:** The C++ standard defines rules for implicit declaration and definition of these six special member functions. For example, a default constructor is implicitly declared if no user-declared constructor exists. A destructor is implicitly declared if no user-declared destructor exists. Similar rules apply to copy and move operations. These are detailed in sections like `[class.ctor]`, `[class.dtor]`, `[class.copy.ctor]`, `[class.copy.assign]`, `[class.mfct]` of the C++ standard.

**What could go wrong:** If you manually define some of these but not others, the compiler might implicitly delete certain ones, leading to compilation errors or unexpected behavior (e.g., if you define a destructor but not a copy constructor, copying might be implicitly disallowed). This is part of the "Rule of Three/Five/Six" which we'll touch upon.

### Step 2: The Compiler's Default Behavior

When you don't explicitly define any of the Big Six, the compiler tries to generate them for you.

**Plain-English Statement:** If you don't tell the compiler exactly how to create, copy, move, or destroy your object, it will try to figure it out itself by doing the simplest, most obvious thing for each individual piece inside your object.

**Example:**
```cpp
struct Point {
    int x;
    int y;
}; // No special members defined

Point p1 = {10, 20};
Point p2 = p1; // Compiler-generated copy constructor: p2.x = p1.x; p2.y = p1.y;
Point p3;
p3 = p1;       // Compiler-generated copy assignment: p3.x = p1.x; p3.y = p1.y;
```

**Formal Version:** The implicitly declared special member functions perform a *member-wise* operation.
*   **Default Constructor:** Default-constructs each non-static data member.
*   **Destructor:** Destroys each non-static data member.
*   **Copy Constructor:** Copy-constructs each non-static data member from the corresponding member of the source object.
*   **Copy Assignment Operator:** Copy-assigns each non-static data member from the corresponding member of the source object.
*   **Move Constructor:** Move-constructs each non-static data member from the corresponding member of the source object.
*   **Move Assignment Operator:** Move-assigns each non-static data member from the corresponding member of the source object.

**What could go wrong:** This member-wise behavior is perfectly fine for simple types like `int`, `double`, or even `std::string` and `std::vector` (because *they* handle their own internal resources correctly). However, it's a disaster if your class directly manages a *raw resource* like a `char*` to dynamically allocated memory or a `FILE*` for an open file. In such cases, a member-wise copy would lead to two objects pointing to the *same* memory/file, causing double-frees or corrupted data. This is where the Rule of Zero breaks down *if* your class directly owns raw resources.

### Step 3: The Rule of Zero — Prefer Compiler-Generated Specials

This is the core of the Rule of Zero: If the compiler's default, member-wise behavior for all six special member functions is correct for your class, then *do not write them yourself*.

**Plain-English Statement:** If your object is built only from standard, well-behaved parts that already know how to copy, move, and clean themselves up correctly (like numbers, strings, vectors, or smart pointers), then just let the compiler handle everything. Don't write any custom code for creating, copying, moving, or destroying your object.

**Example:**
```cpp
#include <string>
#include <vector>

class Person {
public:
    std::string name;
    int age;
    std::vector<std::string> hobbies;

    // No user-defined constructor, destructor, copy/move operations.
    // The compiler generates them, and they work correctly because
    // std::string and std::vector handle their own resources.
};

void test_person() {
    Person p1{"Alice", 30, {"reading", "hiking"}};
    Person p2 = p1; // Compiler-generated copy: p2.name copies p1.name, etc. (deep copy)
    Person p3;
    p3 = p1;        // Compiler-generated assignment (deep copy)
    Person p4 = std::move(p1); // Compiler-generated move (efficient transfer)
    // All clean up correctly due to std::string/std::vector destructors.
}
```
In this `Person` class, `std::string` and `std::vector` are themselves RAII types. They manage their own dynamic memory. When the compiler generates a copy constructor for `Person`, it calls the copy constructor for `name` (which performs a deep copy of the string data) and the copy constructor for `hobbies` (which performs a deep copy of the vector's elements). This is exactly what we want.

**Formal Version:** If a class `C` does not directly manage any resources (e.g., via raw pointers that `new` and `delete`), and all its non-static data members are themselves types that correctly implement value semantics (or move semantics if applicable) or are RAII wrappers, then `C` can safely rely on the compiler-generated default, copy, and move special member functions. This implies that for such a class, all six special member functions are either implicitly declared and defined as `default`, or implicitly deleted if a member type prevents their generation.

**What could go wrong:** If you *mistakenly* think the compiler's default is wrong and write your own, you might introduce bugs (e.g., forgetting to copy a member, forgetting `noexcept`, or making it less efficient than the compiler's optimized version). You also add maintenance burden.

### Step 4: When *Not* to Follow the Rule of Zero (and what to do instead)

The Rule of Zero applies when your class *doesn't own raw resources*. If your class *directly owns a raw resource* (e.g., a `char*` pointing to `new`'d memory, a `FILE*` from `fopen`, a `HANDLE` from a system API), then the compiler's default behavior is almost certainly incorrect.

**Plain-English Statement:** If your object directly holds onto something that needs manual cleanup (like memory you allocated with `new`, or a file you opened), then the compiler's simple, member-by-member copy/destroy won't work. You *must* take control.

**Example (Incorrect application of Rule of Zero):**
```cpp
class BadArray {
public:
    int* data;
    size_t size;

    BadArray(size_t s) : size(s) {
        data = new int[size]; // Manually allocated resource
    }
    // No destructor, copy constructor, or copy assignment defined.
    // Rule of Zero is *attempted* here, but will fail.
};

void test_bad_array() {
    BadArray arr1(10);
    // arr1.data points to 10 ints.
    BadArray arr2 = arr1; // Compiler-generated copy: arr2.data = arr1.data (shallow copy)
    // Now both arr1.data and arr2.data point to the *same* memory!
    // When arr2 is destroyed, it will try to delete[] arr2.data.
    // When arr1 is destroyed, it will try to delete[] arr1.data (which is the same memory!).
    // This leads to a double-free error, a severe memory corruption bug.
}
```

**What to do instead:** When your class owns a raw resource, you have two primary options, with the second being the preferred way to *re-enable* the Rule of Zero for your *containing* class:

1.  **Follow the "Rule of Three/Five/Six":** Define *all* the necessary special member functions (destructor, copy constructor, copy assignment, and potentially move constructor/assignment) to correctly handle the resource. This ensures deep copies, proper resource transfer on move, and correct cleanup. This is often complex and error-prone.
2.  **Encapsulate the raw resource in a dedicated RAII wrapper, then use that wrapper.** This is the *preferred* approach and allows your *original* class to still follow the Rule of Zero. For memory, use `std::unique_ptr` or `std::shared_ptr`. For other resources (file handles, mutexes), create a small, dedicated RAII class that manages that specific resource.

**Example (Corrected using RAII to re-enable Rule of Zero):**
```cpp
#include <memory> // For std::unique_ptr

class GoodArray {
public:
    std::unique_ptr<int[]> data; // std::unique_ptr manages the raw int[] memory
    size_t size;

    GoodArray(size_t s) : size(s), data(std::make_unique<int[]>(s)) {
        // std::make_unique allocates the memory and wraps it in a unique_ptr
    }
    // No user-defined destructor, copy constructor, or copy assignment.
    // The compiler-generated ones work correctly:
    // - unique_ptr's destructor frees memory.
    // - unique_ptr is non-copyable, so GoodArray becomes non-copyable (correct behavior for unique ownership).
    // - unique_ptr is movable, so GoodArray becomes movable (efficient transfer).
};

void test_good_array() {
    GoodArray arr1(10);
    // GoodArray arr2 = arr1; // This line would cause a compile-time error!
                             // std::unique_ptr is non-copyable, so compiler-generated
                             // copy constructor for GoodArray is implicitly deleted. This is good!
    GoodArray arr3(5);
    arr3 = std::move(arr1); // Compiler-generated move assignment: std::unique_ptr transfers ownership.
                            // arr1 is now empty, arr3 owns the original data.
}
```

**Formal Version:** If a class `C` directly owns a raw resource `R` (i.e., `C`'s constructor acquires `R` and `C`'s destructor releases `R`), then `C` *must* define its own destructor, copy constructor, and copy assignment operator (the "Rule of Three"). If move semantics are desired, it must also define its move constructor and move assignment operator (the "Rule of Five"). However, the *preferred* modern C++ approach is to refactor `C` such that `R` is encapsulated within a separate RAII wrapper class `W`, and `C` then contains an instance of `W` (or a smart pointer to `W`), thus allowing `C` to adhere to the Rule of Zero.

**What could go wrong:** Ignoring this advice leads to memory leaks, double-frees, use-after-free bugs, and general instability. It's the source of many hard-to-debug C++ problems.

### Step 5: The "Rule of Three/Five/Six" (The Counterpoint to Rule of Zero)

While the Rule of Zero is the ideal, sometimes you *must* define special member functions. This is where the "Rule of Three," "Rule of Five," or "Rule of Six" comes in.

**Plain-English Statement:** If your class *does* manage its own raw resources (like memory you `new`ed), then you can't rely on the compiler's defaults. You *must* manually write the code for:
1.  **Destructor:** To release the resource.
2.  **Copy Constructor:** To create a *new, independent* copy of the resource.
3.  **Copy Assignment Operator:** To correctly handle assignment, releasing the old resource and copying the new one.
(This is the "Rule of Three")

And for modern C++ efficiency, you should also write:
4.  **Move Constructor:** To efficiently transfer ownership of the resource.
5.  **Move Assignment Operator:** To efficiently transfer ownership during assignment.
(This makes it the "Rule of Five")

And if you also need a custom default constructor, you'd define that too (making it the "Rule of Six").

**Example:** (This is an example of *when* you'd apply the Rule of Three/Five, not an example of Rule of Zero. It's shown to illustrate the alternative that Rule of Zero tries to avoid).
```cpp
#include <iostream>
#include <algorithm> // For std::swap

class RawResourceOwner {
public:
    int* data;
    size_t size;

    // 1. Constructor
    RawResourceOwner(size_t s) : size(s), data(new int[s]) {
        std::cout << "RawResourceOwner(size_t) constructor, data=" << data << std::endl;
    }

    // 2. Destructor (Rule of Three)
    ~RawResourceOwner() {
        std::cout << "~RawResourceOwner() destructor, data=" << data << std::endl;
        delete[] data;
    }

    // 3. Copy Constructor (Rule of Three)
    RawResourceOwner(const RawResourceOwner& other) : size(other.size), data(new int[other.size]) {
        std::cout << "RawResourceOwner(const&) copy constructor, new data=" << data << " from " << other.data << std::endl;
        std::copy(other.data, other.data + other.size, data);
    }

    // 4. Copy Assignment Operator (Rule of Three)
    RawResourceOwner& operator=(const RawResourceOwner& other) {
        std::cout << "operator=(const&) copy assignment, this data=" << data << " from " << other.data << std::endl;
        if (this != &other) { // Handle self-assignment
            // 1. Release old resource
            delete[] data;
            // 2. Acquire new resource
            size = other.size;
            data = new int[size];
            // 3. Copy data
            std::copy(other.data, other.data + size, data);
        }
        return *this;
    }

    // 5. Move Constructor (Rule of Five)
    RawResourceOwner(RawResourceOwner&& other) noexcept
        : data(other.data), size(other.size) {
        std::cout << "RawResourceOwner(&&) move constructor, new data=" << data << " from " << other.data << std::endl;
        other.data = nullptr; // "Steal" resource, leave other in valid but empty state
        other.size = 0;
    }

    // 6. Move Assignment Operator (Rule of Five)
    RawResourceOwner& operator=(RawResourceOwner&& other) noexcept {
        std::cout << "operator=(&&) move assignment, this data=" << data << " from " << other.data << std::endl;
        if (this != &other) { // Handle self-assignment
            delete[] data; // Release old resource
            data = other.data; // "Steal" resource
            size = other.size;
            other.data = nullptr; // Leave other in valid but empty state
            other.size = 0;
        }
        return *this;
    }
};
```
This example shows the complexity involved. The Rule of Zero *prefers* to avoid this boilerplate by using RAII wrappers.

**Formal Version:** The "Rule of Three" states that if a class defines any of `~C()`, `C(const C&)`, or `C& operator=(const C&)`, it should define all three. The "Rule of Five" extends this to include `C(C&&)` and `C& operator=(C&&)` for move semantics. The C++ standard has rules for implicitly deleting these if others are defined, making it safer, but still requiring explicit definition when raw resources are managed. (See C++ Standard, e.g., `[class.copy.ctor]`, `[class.copy.assign]`, `[class.dtor]`).

**What could go wrong:** Forgetting one of these, or implementing them incorrectly (e.g., forgetting self-assignment check in `operator=`, forgetting `noexcept` for move operations, making shallow copies instead of deep copies) leads to severe bugs.

### Step 6: RAII and Smart Pointers — The Enablers of the Rule of Zero

The Rule of Zero is only possible because of the RAII idiom and the tools it provides, especially smart pointers.

**Plain-English Statement:** The reason we can often tell the compiler to handle everything is because we use special "smart" containers and pointers (like `std::string`, `std::vector`, `std::unique_ptr`, `std::shared_ptr`) that are *themselves* responsible for managing their own internal resources correctly. They are like self-cleaning parts. If your object only contains these self-cleaning parts, then your object itself doesn't need custom cleaning instructions.

**Example:**
```cpp
#include <memory> // For std::unique_ptr
#include <string>

class Document {
public:
    std::string title;
    std::unique_ptr<char[]> content; // Manages dynamically allocated char array
    int page_count;

    Document(const std::string& t, size_t content_size, int pages)
        : title(t), content(std::make_unique<char[]>(content_size)), page_count(pages) {
        // 'title' is managed by std::string
        // 'content' is managed by std::unique_ptr
        // 'page_count' is a simple int
    }
    // No explicit destructor, copy/move constructors/assignments needed.
    // - title's destructor/copy/move are called.
    // - content's destructor/copy/move are called (unique_ptr is movable but not copyable).
    // - page_count is copied/moved by value.
};

void test_document() {
    Document doc1("My Report", 1024, 25);
    // Document doc2 = doc1; // Compile error: unique_ptr is non-copyable. Good!
    Document doc3("Another Report", 512, 10);
    doc3 = std::move(doc1); // Compiler-generated move: doc3 takes doc1's content.
                            // doc1's title is moved, doc1's content is made null.
}
```

**Formal Version:** RAII (Resource Acquisition Is Initialization) is a C++ programming idiom where resource management is tied to object lifetime. Resources are acquired in the constructor and released in the destructor. Smart pointers (`std::unique_ptr`, `std::shared_ptr`, `std::weak_ptr`) are prime examples of RAII wrappers for dynamically allocated memory. By composing classes primarily from RAII types (including standard library containers and smart pointers), the containing class implicitly gains correct resource management behavior through the compiler-generated special member functions, thus adhering to the Rule of Zero.

**What could go wrong:** Not understanding RAII or misusing smart pointers can lead to incorrect resource management, even when attempting to follow the Rule of Zero. For instance, using `std::shared_ptr` when unique ownership is intended, or passing raw pointers out of `std::unique_ptr` without care.

## 5. Worked examples — multiple, with every step shown

### Example 1: Simple Value Class (Easy)

**Problem:** Create a class `Coordinate` that stores two integer values, `x` and `y`. Demonstrate how the Rule of Zero applies to this class.

**Given:**
*   A need to store `x` and `y` integer values.
*   No dynamic memory allocation or other raw resource management is required within `Coordinate` itself.

**What we want:** A `Coordinate` class that correctly handles construction, destruction, copying, and moving without explicit user-defined special member functions.

**Solution:**

```cpp
#include <iostream>

class Coordinate {
public:
    int x;
    int y;

    // No user-defined constructors, destructors, copy/move operations.
    // The compiler will generate all of them.

    // A simple member function to print for demonstration
    void print(const std::string& label) const {
        std::cout << label << ": (" << x << ", " << y << ")" << std::endl;
    }
};

int main() {
    // Step 1: Default Construction
    Coordinate c1;
    c1.x = 10;
    c1.y = 20;
    c1.print("c1 initialized");
    // Explanation: The compiler generates a default constructor that value-initializes x and y (to 0).
    // We then assign values.

    // Step 2: Copy Construction
    Coordinate c2 = c1;
    c2.print("c2 (copy of c1)");
    // Explanation: The compiler generates a copy constructor.
    // It performs a member-wise copy: c2.x gets c1.x, c2.y gets c1.y.
    // Since x and y are simple integers, this is a correct deep copy.

    // Step 3: Modify original, show copy is independent
    c1.x = 100;
    c1.print("c1 after modification");
    c2.print("c2 after c1 modification");
    // Explanation: c2 is an independent copy. Modifying c1 does not affect c2.

    // Step 4: Copy Assignment
    Coordinate c3;
    c3.print("c3 default constructed");
    c3 = c1;
    c3.print("c3 (assigned from c1)");
    // Explanation: The compiler generates a copy assignment operator.
    // It performs a member-wise assignment: c3.x gets c1.x, c3.y gets c1.y.
    // Again, correct for simple integers.

    // Step 5: Move Construction
    Coordinate c4 = std::move(c1);
    c4.print("c4 (moved from c1)");
    c1.print("c1 after move"); // c1 is now in a valid but unspecified state (likely 0,0)
    // Explanation: The compiler generates a move constructor.
    // For simple integers, move is equivalent to copy, but semantically, it indicates resource transfer.
    // Here, c4.x gets c1.x, c4.y gets c1.y. c1's state is left valid but unspecified.

    // Step 6: Move Assignment
    Coordinate c5;
    c5.x = 500; c5.y = 600;
    c5.print("c5 before move assignment");
    c5 = std::move(c2);
    c5.print("c5 (moved from c2)");
    c2.print("c2 after move"); // c2 is now in a valid but unspecified state (likely 0,0)
    // Explanation: The compiler generates a move assignment operator.
    // Similar to move constructor, it performs member-wise move.

    // Step 7: Destructors
    // All objects (c1, c2, c3, c4, c5) will have their compiler-generated destructors called
    // when they go out of scope at the end of main.
    // Explanation: The compiler-generated destructor for Coordinate does nothing explicitly,
    // as x and y are simple types that don't own resources requiring cleanup.
    return 0;
}
```

**Output:**
```
c1 initialized: (10, 20)
c2 (copy of c1): (10, 20)
c1 after modification: (100, 20)
c2 after c1 modification: (10, 20)
c3 default constructed: (0, 0)
c3 (assigned from c1): (100, 20)
c4 (moved from c1): (100, 20)
c1 after move: (0, 0)
c5 before move assignment: (500, 600)
c5 (moved from c2): (10, 20)
c2 after move: (0, 0)
```

**Reflection:** This example demonstrates the simplest case for the Rule of Zero. Since `Coordinate` only contains primitive `int` types, the compiler's default member-wise operations for construction, destruction, copying, and moving are perfectly correct. No custom code is needed, leading to cleaner and safer code. The trickiness here is realizing that "moving" an `int` is effectively a copy, but the *semantics* are different (the source object is considered "moved-from" and its state is unspecified).

---

### Example 2: Class with Standard Library Containers (Medium)

**Problem:** Create a class `Playlist` that stores a name and a list of song titles (strings). Demonstrate how the Rule of Zero still applies because standard library containers are RAII-compliant.

**Given:**
*   A need to store a playlist name (a string).
*   A need to store multiple song titles (a list of strings).
*   `std::string` and `std::vector` are known to be RAII types.

**What we want:** A `Playlist` class that correctly handles construction, destruction, copying, and moving without explicit user-defined special member functions.

**Solution:**

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm> // For std::for_each

class Playlist {
public:
    std::string name;
    std::vector<std::string> songTitles;

    // No user-defined special member functions.
    // The compiler will generate all of them, and they will work correctly.

    // Custom constructor for convenience
    Playlist(std::string n, std::vector<std::string> songs)
        : name(std::move(n)), songTitles(std::move(songs)) {
        std::cout << "Playlist created: " << name << std::endl;
    }

    // Default constructor for convenience (needed if no other constructors exist)
    Playlist() : name("Untitled"), songTitles({}) {
        std::cout << "Playlist default created: " << name << std::endl;
    }

    // A simple member function to print for demonstration
    void print(const std::string& label) const {
        std::cout << label << ": Name='" << name << "', Songs=[" ;
        bool first = true;
        for (const auto& song : songTitles) {
            if (!first) std::cout << ", ";
            std::cout << "'" << song << "'";
            first = false;
        }
        std::cout << "]" << std::endl;
    }
};

int main() {
    // Step 1: Initial Construction
    Playlist p1("My Favorites", {"Song A", "Song B", "Song C"});
    p1.print("p1 initial");
    // Explanation: Custom constructor is called. std::string and std::vector handle their own memory.

    // Step 2: Copy Construction
    Playlist p2 = p1;
    p2.print("p2 (copy of p1)");
    // Explanation: Compiler-generated copy constructor is called.
    // It calls std::string's copy constructor for 'name' (deep copy).
    // It calls std::vector's copy constructor for 'songTitles' (deep copy of vector contents).
    // This correctly creates an independent copy of all data.

    // Step 3: Modify original, show copy is independent
    p1.name = "Old Favorites";
    p1.songTitles.push_back("Song D");
    p1.print("p1 after modification");
    p2.print("p2 after p1 modification");
    // Explanation: Modifying p1 does not affect p2 because p2 has its own deep copies of name and songTitles.

    // Step 4: Copy Assignment
    Playlist p3("Temporary Playlist", {"Temp Song 1"});
    p3.print("p3 before assignment");
    p3 = p1;
    p3.print("p3 (assigned from p1)");
    // Explanation: Compiler-generated copy assignment operator is called.
    // It calls std::string's copy assignment for 'name'.
    // It calls std::vector's copy assignment for 'songTitles'.
    // Existing resources in p3 are correctly managed and replaced by deep copies from p1.

    // Step 5: Move Construction
    Playlist p4 = std::move(p1);
    p4.print("p4 (moved from p1)");
    p1.print("p1 after move"); // p1 is now in a valid but unspecified state (e.g., empty name, empty vector)
    // Explanation: Compiler-generated move constructor is called.
    // It calls std::string's move constructor for 'name' (efficient transfer of internal buffer ownership).
    // It calls std::vector's move constructor for 'songTitles' (efficient transfer of internal buffer ownership).
    // This avoids expensive deep copies and leaves p1 in a valid, empty state.

    // Step 6: Move Assignment
    Playlist p5("Another Temp", {"X", "Y"});
    p5.print("p5 before move assignment");
    p5 = std::move(p2);
    p5.print("p5 (moved from p2)");
    p2.print("p2 after move"); // p2 is now in a valid but unspecified state
    // Explanation: Compiler-generated move assignment operator is called.
    // It calls std::string's move assignment for 'name'.
    // It calls std::vector's move assignment for 'songTitles'.
    // p5's old resources are released, and it takes ownership of p2's resources efficiently.

    // Step 7: Destructors
    // All objects (p1, p2, p3, p4, p5) will have their compiler-generated destructors called.
    // Explanation: The compiler-generated destructor for Playlist calls the destructors for `name` and `songTitles`.
    // `std::string` and `std::vector` destructors correctly free their dynamically allocated memory.
    return 0;
}
```

**Output:**
```
Playlist created: My Favorites
p1 initial: Name='My Favorites', Songs=['Song A', 'Song B', 'Song C']
p2 (copy of p1): Name='My Favorites', Songs=['Song A', 'Song B', 'Song C']
p1 after modification: Name='Old Favorites', Songs=['Song A', 'Song B', 'Song C', 'Song D']
p2 after p1 modification: Name='My Favorites', Songs=['Song A', 'Song B', 'Song C']
Playlist created: Temporary Playlist
p3 before assignment: Name='Temporary Playlist', Songs=['Temp Song 1']
p3 (assigned from p1): Name='Old Favorites', Songs=['Song A', 'Song B', 'Song C', 'Song D']
p4 (moved from p1): Name='Old Favorites', Songs=['Song A', 'Song B', 'Song C', 'Song D']
p1 after move: Name='', Songs=[]
p5 before move assignment: Name='Another Temp', Songs=['X', 'Y']
p5 (moved from p2): Name='My Favorites', Songs=['Song A', 'Song B', 'Song C']
p2 after move: Name='', Songs=[]
```

**Reflection:** This example highlights that the Rule of Zero extends beyond primitive types. As long as your class is composed of other well-behaved RAII types (like `std::string` and `std::vector`), the compiler-generated special member functions will correctly delegate resource management to those member types, performing deep copies and efficient moves as appropriate. The trickiness is trusting that the standard library types are indeed "well-behaved" and understanding *how* they achieve deep copies/moves.

---

### Example 3: Class with Raw Pointer (Violating Rule of Zero, then fixing with `std::unique_ptr`) (Harder)

**Problem:** Create a class `Image` that stores image data as a raw `char*` array. First, show how attempting to apply the Rule of Zero directly leads to bugs. Then, refactor it to use `std::unique_ptr` to correctly manage the memory and re-enable the Rule of Zero for `Image`.

**Given:**
*   A need to store raw image pixel data (a `char` array).
*   The raw data is dynamically allocated.

**What we want:**
1.  A `BadImage` class that demonstrates the failure of Rule of Zero with raw pointers.
2.  A `GoodImage` class that uses `std::unique_ptr` to manage the raw data, allowing `GoodImage` to follow the Rule of Zero.

**Solution Part 1: BadImage (Violates Rule of Zero)**

```cpp
#include <iostream>
#include <cstring> // For std::memcpy

// Part 1: Demonstrating the problem with raw pointers and Rule of Zero
class BadImage {
public:
    char* data;
    size_t width;
    size_t height;

    BadImage(size_t w, size_t h) : width(w), height(h) {
        size_t size = w * h * 4; // Assuming 4 bytes per pixel (RGBA)
        data = new char[size];
        std::cout << "BadImage constructor: Allocated data at " << static_cast<void*>(data) << std::endl;
        // Initialize data to some value
        std::memset(data, 0xFF, size); // Fill with white
    }

    // NO user-defined destructor, copy constructor, or copy assignment operator.
    // Attempting to follow Rule of Zero directly.

    void print_info(const std::string& label) const {
        std::cout << label << ": " << width << "x" << height << ", data ptr: " << static_cast<void*>(data) << std::endl;
    }
};

void test_bad_image() {
    std::cout << "--- Testing BadImage (will lead to crash/leak) ---" << std::endl;
    BadImage img1(10, 10);
    img1.print_info("img1 initial");

    // Problem 1: Shallow Copy by compiler-generated copy constructor
    BadImage img2 = img1; // Compiler generates member-wise copy: img2.data = img1.data
    img2.print_info("img2 (copy of img1)");
    // Now img1.data and img2.data point to the *same* memory!

    // Problem 2: Double Free
    // When img2 goes out of scope, its destructor (compiler-generated, does nothing for 'data') is called.
    // The memory pointed to by img2.data is NOT freed by BadImage's destructor.
    // The *actual* problem happens when img1 goes out of scope:
    // Its destructor is called, and the memory at img1.data is freed.
    // If img2's destructor was implicitly freeing, then it would be a double free.
    // In this specific case, since no destructor is defined, the memory is leaked by both.
    // If we *had* defined a destructor, it would be a double free.
    // Let's add a destructor to show the double-free:
    /*
    ~BadImage() {
        std::cout << "BadImage destructor: Freeing data at " << static_cast<void*>(data) << std::endl;
        delete[] data;
    }
    */
    // If the above destructor were present, the program would crash due to double-free.
    // Without it, it's a memory leak. Both are bad.

    // Problem 3: Memory Leak (if no destructor defined)
    // The `new char[size]` allocation is never `delete[]`'d.
    std::cout << "--- BadImage test complete ---" << std::endl;
} // img1 and img2 destructors called here. If custom destructor, crash. If none, leak.

```
**Explanation for Part 1:** The `BadImage` class directly manages a raw `char*` pointer. When we attempt to copy `img1` to `img2` using the compiler-generated copy constructor, it performs a *shallow copy*. Both `img1.data` and `img2.data` end up pointing to the *same* block of dynamically allocated memory. If we had a destructor that called `delete[] data`, then when `img2` goes out of scope, it would `delete[]` that memory. Then, when `img1` goes out of scope, it would try to `delete[]` the *same memory again*, leading to a **double-free error** and a program crash. If no destructor is defined, the memory is simply **leaked**. This clearly shows that the Rule of Zero *cannot* be applied directly to classes that own raw resources.

**Solution Part 2: GoodImage (Using `std::unique_ptr` to enable Rule of Zero)**

```cpp
#include <iostream>
#include <memory>  // For std::unique_ptr
#include <cstring> // For std::memcpy
#include <utility> // For std::move

// Part 2: Fixing BadImage using std::unique_ptr
class GoodImage {
public:
    std::unique_ptr<char[]> data; // std::unique_ptr manages the raw char[] memory
    size_t width;
    size_t height;

    GoodImage(size_t w, size_t h) : width(w), height(h) {
        size_t size = w * h * 4; // Assuming 4 bytes per pixel (RGBA)
        data = std::make_unique<char[]>(size); // std::make_unique allocates and wraps
        std::cout << "GoodImage constructor: Allocated data at " << static_cast<void*>(data.get()) << std::endl;
        std::memset(data.get(), 0xFF, size); // Fill with white
    }

    // No user-defined destructor, copy constructor, copy assignment, move constructor, move assignment.
    // The compiler will generate them, and they will work correctly thanks to std::unique_ptr.

    void print_info(const std::string& label) const {
        std::cout << label << ": " << width << "x" << height << ", data ptr: " << static_cast<void*>(data.get()) << std::endl;
    }
};

void test_good_image() {
    std::cout << "\n--- Testing GoodImage (Rule of Zero with std::unique_ptr) ---" << std::endl;
    GoodImage img1(10, 10);
    img1.print_info("img1 initial");

    // Attempting to copy:
    // GoodImage img2 = img1; // COMPILE-TIME ERROR!
    // Explanation: std::unique_ptr is non-copyable. Therefore, the compiler-generated
    // copy constructor for GoodImage is implicitly deleted. This prevents shallow copies!
    // This is the desired behavior for unique ownership.

    // Move Construction:
    GoodImage img3(5, 5);
    img3.print_info("img3 initial (before move)");
    GoodImage img4 = std::move(img1); // Compiler-generated move constructor
    img4.print_info("img4 (moved from img1)");
    img1.print_info("img1 after move"); // img1.data is now nullptr, img1 is in a valid, empty state
    // Explanation: The compiler-generated move constructor for GoodImage calls std::unique_ptr's
    // move constructor. This transfers ownership of the raw pointer from img1.data to img4.data.
    // img1.data is set to nullptr, preventing double-free. This is efficient and correct.

    // Move Assignment:
    img3 = std::move(img4); // Compiler-generated move assignment operator
    img3.print_info("img3 (moved from img4)");
    img4.print_info("img4 after move"); // img4.data is now nullptr
    // Explanation: The compiler-generated move assignment for GoodImage calls std::unique_ptr's
    // move assignment. img3's old data (5x5) is automatically deleted by its unique_ptr.
    // Then, img3 takes ownership of img4's data (10x10). img4.data is set to nullptr.

    std::cout << "--- GoodImage test complete ---" << std::endl;
} // All GoodImage objects destructed here. std::unique_ptr destructors correctly free memory.

int main() {
    test_bad_image();
    test_good_image();
    return 0;
}
```

**Output:**
```
--- Testing BadImage (will lead to crash/leak) ---
BadImage constructor: Allocated data at 0x...
img1 initial: 10x10, data ptr: 0x...
img2 (copy of img1): 10x10, data ptr: 0x...
--- BadImage test complete ---

--- Testing GoodImage (Rule of Zero with std::unique_ptr) ---
GoodImage constructor: Allocated data at 0x...
img1 initial: 10x10, data ptr: 0x...
GoodImage constructor: Allocated data at 0x...
img3 initial (before move): 5x5, data ptr: 0x...
GoodImage constructor: Allocated data at 0x... // (Note: This line is from img1's initial construction)
GoodImage constructor: Allocated data at 0x... // (Note: This line is from img3's initial construction)
img4 (moved from img1): 10x10, data ptr: 0x...
img1 after move: 10x10, data ptr: 0x0
img3 (moved from img4): 10x10, data ptr: 0x...
img4 after move: 10x10, data ptr: 0x0
--- GoodImage test complete ---
```
*(Note: The `0x...` addresses will vary each run. The `GoodImage constructor` lines appear for `img1` and `img3` when they are constructed.)*

**Reflection:** This example is crucial. It demonstrates that the Rule of Zero is not about *never* managing resources, but about *delegating* resource management to dedicated RAII types. By replacing a raw `char*` with `std::unique_ptr<char[]>`, the `GoodImage` class no longer directly owns a raw resource. `std::unique_ptr` handles the `new`/`delete` logic, making the `GoodImage` class itself eligible for the Rule of Zero. The compiler correctly makes `GoodImage` non-copyable (because `std::unique_ptr` is non-copyable) and movable, which is exactly the behavior for unique ownership. This is the preferred way to apply the Rule of Zero when dealing with dynamically allocated memory.

---

### Example 4: Class with Non-Memory Raw Resource (Custom RAII Wrapper) (Hardest)

**Problem:** Create a class `FileLogger` that manages a C-style `FILE*` handle (obtained via `fopen`). Show how to wrap this raw resource in a custom RAII class to allow `FileLogger` to follow the Rule of Zero.

**Given:**
*   A need to open and write to a file using `FILE*` and `fopen`/`fclose`.
*   `FILE*` is a raw resource that needs manual `fclose`.

**What we want:** A `FileLogger` class that uses a custom RAII wrapper for `FILE*` to correctly handle construction, destruction, copying (or disallowing it), and moving, without `FileLogger` itself defining special member functions.

**Solution:**

```cpp
#include <iostream>
#include <string>
#include <cstdio> // For FILE, fopen, fclose, fprintf
#include <utility> // For std::move

// Step 1: Create a custom RAII wrapper for FILE*
class FileHandle {
private:
    FILE* file_ptr;

public:
    // Constructor: Acquires the resource
    FileHandle(const char* filename, const char* mode) : file_ptr(std::fopen(filename, mode)) {
        if (!file_ptr) {
            std::cerr << "Error: Could not open file " << filename << std::endl;
            // In a real application, you might throw an exception or handle this more robustly.
        }
        std::cout << "FileHandle created for " << filename << ", ptr=" << static_cast<void*>(file_ptr) << std::endl;
    }

    // Destructor: Releases the resource
    ~FileHandle() {
        if (file_ptr) {
            std::fclose(file_ptr);
            std::cout << "FileHandle destructor: Closed file, ptr=" << static_cast<void*>(file_ptr) << std::endl;
        }
    }

    // Rule of Five (or Three/Zero) for FileHandle itself:
    // FileHandle represents a unique ownership of a file. It should NOT be copyable.
    FileHandle(const FileHandle&) = delete; // Delete copy constructor
    FileHandle& operator=(const FileHandle&) = delete; // Delete copy assignment

    // Move Constructor: Transfers ownership
    FileHandle(FileHandle&& other) noexcept : file_ptr(other.file_ptr) {
        other.file_ptr = nullptr; // Leave other in a valid, empty state
        std::cout << "FileHandle move constructor: Transferred ownership from "
                  << static_cast<void*>(other.file_ptr) << " to " << static_cast<void*>(file_ptr) << std::endl;
    }

    // Move Assignment Operator: Transfers ownership
    FileHandle& operator=(FileHandle&& other) noexcept {
        if (this != &other) {
            if (file_ptr) { // Close existing file if any
                std::fclose(file_ptr);
                std::cout << "FileHandle move assignment: Closed old file, ptr=" << static_cast<void*>(file_ptr) << std::endl;
            }
            file_ptr = other.file_ptr;
            other.file_ptr = nullptr;
            std::cout << "FileHandle move assignment: Transferred ownership from "
                      << static_cast<void*>(other.file_ptr) << " to " << static_cast<void*>(file_ptr) << std::endl;
        }
        return *this;
    }

    // Accessor for the underlying FILE*
    FILE* get() const { return file_ptr; }
    operator bool() const { return file_ptr != nullptr; } // Check if handle is valid
};

// Step 2: Create FileLogger using the RAII wrapper (Rule of Zero applies here)
class FileLogger {
private:
    FileHandle file_handle; // Now FileLogger contains an RAII wrapper
    std::string logger_name;

public:
    // Constructor for FileLogger
    FileLogger(const std::string& name, const char* filename, const char* mode)
        : file_handle(filename, mode), logger_name(name) {
        std::cout << "FileLogger created: " << logger_name << std::endl;
    }

    // NO user-defined destructor, copy/move constructors/assignments for FileLogger itself.
    // The compiler-generated ones will work correctly because FileHandle is a well-behaved RAII type.
    // Since FileHandle is non-copyable, FileLogger will also be non-copyable.
    // Since FileHandle is movable, FileLogger will also be movable.

    void log(const std::string& message) {
        if (file_handle.get()) {
            std::fprintf(file_handle.get(), "[%s] %s\n", logger_name.c_str(), message.c_str());
            std::fflush(file_handle.get()); // Ensure message is written immediately
        } else {
            std::cerr << "Logger " << logger_name << ": File not open, cannot log: " << message << std::endl;
        }
    }

    void print_info(const std::string& label) const {
        std::cout << label << ": Logger Name='" << logger_name << "', FileHandle ptr="
                  << static_cast<void*>(file_handle.get()) << std::endl;
    }
};

void test_file_logger() {
    std::cout << "--- Testing FileLogger with custom RAII wrapper ---" << std::endl;

    // Initial Construction
    FileLogger log1("AppLog", "app.log", "w");
    log1.log("Application started.");
    log1.print_info("log1 initial");

    // Attempting to copy FileLogger (should fail at compile time)
    // FileLogger log2 = log1; // COMPILE-TIME ERROR!
    // Explanation: FileLogger contains a FileHandle, which is explicitly non-copyable.
    // Therefore, the compiler implicitly deletes FileLogger's copy constructor and copy assignment operator.
    // This is correct behavior: a file handle should typically not be copied; it represents unique access.

    // Move Construction
    FileLogger log3("ServiceLog", "service.log", "w");
    log3.log("Service initialized.");
    log3.print_info("log3 initial");

    FileLogger log4 = std::move(log1); // Compiler-generated move constructor for FileLogger
    log4.log("Log transferred from old AppLog.");
    log4.print_info("log4 (moved from log1)");
    log1.print_info("log1 after move"); // log1.file_handle.get() is now nullptr
    // Explanation: FileLogger's move constructor calls FileHandle's move constructor.
    // Ownership of the 'app.log' FILE* is transferred from log1.file_handle to log4.file_handle.
    // log1.file_handle is left in a valid, empty state (nullptr).

    // Move Assignment
    log3 = std::move(log4); // Compiler-generated move assignment for FileLogger
    log3.log("Log transferred from old ServiceLog to new AppLog data.");
    log3.print_info("log3 (moved from log4)");
    log4.print_info("log4 after move"); // log4.file_handle.get() is now nullptr
    // Explanation: FileLogger's move assignment calls FileHandle's move assignment.
    // log3's original 'service.log' file is closed by its FileHandle's move assignment.
    // Then, log3 takes ownership of log4's 'app.log' FILE*. log4.file_handle is left empty.

    std::cout << "--- FileLogger test complete ---" << std::endl;
} // All FileLogger objects destructed here. Their FileHandle members correctly close files.

int main() {
    test_file_logger();
    return 0;
}
```

**Output:**
```
--- Testing FileLogger with custom RAII wrapper ---
FileHandle created for app.log, ptr=0x...
FileLogger created: AppLog
log1 initial: Logger Name='AppLog', FileHandle ptr=0x...
FileHandle created for service.log, ptr=0x...
FileLogger created: ServiceLog
log3 initial: Logger Name='ServiceLog', FileHandle ptr=0x...
FileHandle move constructor: Transferred ownership from 0x0 to 0x...
log4 (moved from log1): Logger Name='AppLog', FileHandle ptr=0x...
log1 after move: Logger Name='AppLog', FileHandle ptr=0x0
FileHandle move assignment: Closed old file, ptr=0x...
FileHandle move assignment: Transferred ownership from 0x0 to 0x...
log3 (moved from log4): Logger Name='ServiceLog', FileHandle ptr=0x...
log4 after move: Logger Name='AppLog', FileHandle ptr=0x0
--- FileLogger test complete ---
FileHandle destructor: Closed file, ptr=0x...
FileHandle destructor: Closed file, ptr=0x...
```
*(Note: File pointers `0x...` will vary. The order of destruction output might also vary slightly depending on compiler/OS, but the key is that files are closed exactly once.)*

**Reflection:** This is the most advanced application of the Rule of Zero. When dealing with raw, non-memory resources (like `FILE*`), you create a dedicated, small RAII wrapper class (`FileHandle` in this case). This wrapper is responsible for *all* the complex resource management (opening, closing, disallowing copies, enabling moves). Once you have this robust RAII wrapper, any *other* class (`FileLogger`) that *contains* an instance of this wrapper can then follow the Rule of Zero. `FileLogger` doesn't need to know anything about `fopen` or `fclose`; it simply relies on `FileHandle` to do its job. This modularity makes `FileLogger` much simpler, safer, and easier to maintain. The trickiest part is correctly implementing the Rule of Five (or Three/Zero) for the *RAII wrapper itself*.

## 6. Common mistakes and traps

1.  **Forgetting `delete[]` for `new[]` (or `delete` for `new`):** The most common mistake when manually managing raw memory. If you `new` memory in a constructor and forget to `delete` it in the destructor, you have a memory leak. The Rule of Zero helps avoid this by encouraging the use of smart pointers which handle `delete` automatically.
2.  **Shallow Copy vs. Deep Copy:** When a class contains a raw pointer to dynamically allocated memory, the compiler-generated copy constructor/assignment operator performs a *shallow copy* (copies the pointer value itself). This leads to two objects pointing to the same memory, resulting in double-frees or corrupted data. This is the primary problem the Rule of Zero (and RAII) aims to solve.
3.  **Forgetting Self-Assignment Check in `operator=`:** When manually writing a copy assignment operator for a class with raw resources, failing to check `if (this != &other)` can lead to prematurely deleting the object's own resources before copying from itself, resulting in data corruption or crashes.
4.  **Incorrect Move Semantics (`noexcept`):** When defining move constructors/assignment operators, forgetting to mark them `noexcept` can prevent them from being used in contexts like `std::vector` resizing, leading to unnecessary and inefficient copies instead of moves.
5.  **Mixing Raw Pointers with Compiler-Generated Specials:** This is the core trap the Rule of Zero addresses. If your class has a raw pointer member *and*