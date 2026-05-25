## What it is
C++ is a superset of the C programming language, meaning that nearly all valid C code is also valid C++ code. C++ extends C by adding high-level features for managing complexity, most notably object-oriented programming (classes), generic programming (templates), and more robust resource management (RAII). It's best thought of as "C with powerful abstractions."

## Why it matters
These abstractions are critical in large-scale scientific and engineering software where performance is non-negotiable. In aerospace, flight control software for a rocket uses object-oriented principles to model components like engines and sensors, managing immense complexity while retaining C's low-level control. In physics, simulation frameworks like Geant4 use C++ templates and classes to model particle interactions with different materials generically and efficiently, avoiding code duplication and errors.

## When to study it
You must have a solid command of C first. Do not proceed unless you can confidently explain and use the following C concepts from first principles:
- **Pointers and memory addresses:** What they are, how to use them, pointer arithmetic.
- **Dynamic memory management:** `malloc`, `calloc`, `realloc`, and `free`. You should feel the pain of forgetting `free`.
- **Structs:** How to define and use them to group related data.
- **Function pointers:** How to declare them and use them for callbacks.
- **The compilation model:** The roles of the preprocessor, compiler, and linker.

If any of these are weak, C++'s additions will seem like arbitrary syntax rather than solutions to real problems.

## How to study it (step by step)
1.  **Verify the superset property.** Take a non-trivial C program you've written (e.g., one that uses `struct`s and `malloc`). Rename the file from `.c` to `.cpp` and compile it with a C++ compiler like `g++`. Observe that it compiles and runs identically. This grounds the "superset" idea in reality.
2.  **Convert a `struct` to a `class`.** Take a C `struct Point { double x; double y; };` and convert it to a C++ `class`. Add a member function, e.g., `double magnitude()`, directly inside the class definition. This is your first step into encapsulation—bundling data and the functions that operate on it.
3.  **Replace `malloc`/`free` with `new`/`delete`.** Modify your C program from step 1. Replace `(struct MyType*)malloc(sizeof(struct MyType))` with `new MyType`. Replace `free(ptr)` with `delete ptr`. This introduces the C++ way of handling dynamic memory.
4.  **Implement RAII with constructors and destructors.** Create a class that manages a dynamic resource (like an array allocated with `new`). In the *constructor*, allocate the memory. In the *destructor*, deallocate it. Instantiate this object on the stack and see how the memory is automatically freed when the object goes out of scope. This is the most important C++ concept for preventing resource leaks.
5.  **Explore function overloading.** Write two functions with the exact same name but different parameter types (e.g., `void print(int x)` and `void print(double y)`). Call both and observe that the compiler correctly chooses which one to execute based on the argument type. This is impossible in C, where function names must be unique.

## Key ideas, with intuition
1.  **Encapsulation: Bundling Data and Behavior.**
    In C, data and the functions that operate on it are separate. You might have a `struct Vector3D` and a separate function `double calculate_magnitude(Vector3D v)`. C++ lets you bundle these together into a `class`.
    $$
    \text{C: } \underbrace{\text{struct Vector3D}}_{\text{data}} + \underbrace{\text{functions(v)}}_{\text{behavior}} \quad \rightarrow \quad \text{C++: } \underbrace{\text{class Vector3D \{ data; functions(); \}}}_{\text{object}}
    $$
    The intuition is that a vector "knows" how to calculate its own magnitude. The data and its intrinsic operations are a single, cohesive unit. This prevents you from accidentally passing a `Quaternion` to a function meant for a `Vector3D`.

2.  **RAII: Resource Acquisition Is Initialization.**
    This is C++'s primary mechanism for preventing resource leaks (memory, files, network sockets). The core idea is to tie a resource's lifetime to an object's lifetime. When an object is created, its constructor acquires the resource. When the object is destroyed (e.g., goes out of scope), its destructor automatically releases the resource.
    
    *Intuition:* Imagine a keycard for a secure lab. You get the card (acquire resource) when you start your work (object construction). You are required to return it when you leave (object destruction). RAII enforces this return policy automatically.

3.  **Generic Programming with Templates.**
    In C, if you want a function that finds the maximum of two numbers, you need to write `int max_int(int a, int b)` and `double max_double(double a, double b)`, or use unsafe `void*` pointers. C++ templates let you write a single generic function.
    ```cpp
    template <typename T>
    T max(T a, T b) {
        return (a > b) ? a : b;
    }
    ```
    The compiler uses this *template* to generate the type-specific versions (`max_int`, `max_double`, etc.) for you at compile time, giving you both convenience and type safety.

## Worked example
Let's convert a C program for a dynamic array of 2D points to C++.

**C Version (The "Before")**
```c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    double x, y;
} Point;

// Function to create and initialize the array
Point* create_point_array(int size) {
    Point* arr = (Point*)malloc(size * sizeof(Point));
    if (!arr) return NULL;
    for (int i = 0; i < size; ++i) {
        arr[i].x = 0.0;
        arr[i].y = 0.0;
    }
    return arr;
}

// Function to clean up
void destroy_point_array(Point* arr) {
    free(arr);
}

int main() {
    Point* my_points = create_point_array(10);
    if (my_points) {
        my_points[0].x = 5.0;
        printf("Point 0, x: %f\n", my_points[0].x);
    }
    destroy_point_array(my_points); // Easy to forget!
    return 0;
}
```

**C++ Version (The "After")**
This version uses a class to encapsulate the data and RAII to manage the memory.
```cpp
#include <iostream>
#include <vector> // We'll build our own, but std::vector is the goal.

class Point {
public:
    double x, y;
};

class PointArray {
private:
    Point* m_data;
    int m_size;

public:
    // Constructor: Acquires the resource (memory)
    PointArray(int size) : m_size(size) {
        m_data = new Point[m_size]; // Use new
        for (int i = 0; i < m_size; ++i) {
            m_data[i].x = 0.0;
            m_data[i].y = 0.0;
        }
        std::cout << "PointArray of size " << m_size << " constructed.\n";
    }

    // Destructor: Releases the resource
    ~PointArray() {
        delete[] m_data; // Use delete[] for arrays
        std::cout << "PointArray of size " << m_size << " destroyed.\n";
    }

    // A member function to access data safely
    Point& at(int index) {
        return m_data[index];
    }
};

int main() {
    {
        PointArray my_points(10); // Constructor called here
        my_points.at(0).x = 5.0;
        std::cout << "Point 0, x: " << my_points.at(0).x << std::endl;
    } // my_points goes out of scope here. Destructor is automatically called.
    
    std::cout << "Program finished.\n";
    return 0;
}
```

**Reflection:**
1.  **Encapsulation:** The `PointArray` class now bundles the pointer `m_data` and the `m_size` together. The user of the class doesn't need to manage them separately.
2.  **RAII:** The `main` function is cleaner and safer. We don't call a `destroy` function. The C++ runtime guarantees that `~PointArray()` is called when `my_points` goes out of scope at the closing brace `}`. This eliminates the common C error of forgetting to `free` memory.
3.  **`new`/`delete`:** We used `new[]` to allocate the array and `delete[]` to free it. This is the C++ equivalent of `malloc` and `free` for arrays.

## Diagrams
Here is a conceptual diagram of memory management in C vs C++ (with RAII).

**C: Manual Memory Management**
```text
main() scope
+-------------------------------------------------+
|                                                 |
|  Point* p_arr = create_point_array(10);         |
|  (p_arr points to heap memory)                  |
|                                                 |
|      +-------+                                  +--------------------+
| p_arr| addr1 | ----> HEAP MEMORY: [Point0][Point1]...[Point9] |
|      +-------+                                  +--------------------+
|                                                 |
|  ... use p_arr ...                              |
|                                                 |
|  destroy_point_array(p_arr); // MUST BE CALLED  |
|                                                 |
+-------------------------------------------------+
Scope ends. If destroy was forgotten, heap memory is leaked.
```

**C++: RAII-based Memory Management**
```text
main() scope
+-------------------------------------------------+
|                                                 |
|  { // Inner scope                               |
|    PointArray arr(10); // Constructor runs      |
|                                                 |
|      +-----------------+                        +--------------------+
| arr: | m_data | addr1 | ----> HEAP MEMORY: [Point0][Point1]...[Point9] |
|      | m_size | 10    |                        +--------------------+
|      +-----------------+                        |
|  } // arr goes out of scope. Destructor runs automatically, freeing heap.
|                                                 |
+-------------------------------------------------+
No leak possible. The cleanup is tied to the object's lifetime.
```

## Memory technique — remember this forever
1.  **Mnemonic:** "C++ adds **C.L.A.S.S.**"
    - **C**onstructors/Destructors (for RAII)
    - **L**ibraries (STL: Standard Template Library)
    - **A**bstraction (Classes & Objects)
    - **S**afety (Type-safety via Templates)
    - **S**ignatures (Function Overloading)

2.  **Facts to overlearn:**
    - `class` is a `struct` where members are `private` by default.
    - `new` calls a constructor; `delete` calls a destructor. They must be paired.
    - **RAII:** Bind resource lifetime to object lifetime using constructors and destructors.

3.  **Spaced Repetition Schedule:**
    - Review these ideas tomorrow (1 day).
    - Then in 3 days.
    - Then in 1 week (7 days).
    - Then in ~2 weeks (16 days).
    - Then in ~1 month (35 days).

4.  **First Principles Pathway:**
    If you forget what a C++ `class` is, start with a C `struct`. A `struct` bundles data. What if you wanted to guarantee that data was always in a valid state? You'd create `init()` and `destroy()` functions. What if you could attach those functions directly to the `struct` and have them called automatically? That's a `class` with a constructor and destructor. The entire concept of object-orientation can be rebuilt from the limitations of C `struct`s.

## Common mistakes
1.  **Mixing `malloc`/`free` with `new`/`delete`.** Calling `free` on memory allocated with `new`, or `delete` on memory from `malloc`, leads to undefined behavior. They are not interchangeable because `new`/`delete` also handle constructor/destructor calls.
2.  **Writing "C with `cout`".** Simply replacing `printf` with `std::cout` is not writing C++. The real power comes from using classes, RAII, and templates to manage complexity. If your `.cpp` file looks identical to your `.c` file except for I/O, you are missing the point.
3.  **Forgetting `delete[]` for arrays.** If you allocate with `new T[size]`, you *must* deallocate with `delete[] ptr`. Using a plain `delete ptr` will only call the destructor for the first element and lead to resource leaks.

## Self-check
1.  What are the two key differences in capabilities and one difference in default behavior between a C `struct` and a C++ `class`?
2.  You are managing a file resource in C using `FILE* f = fopen(...)` and `fclose(f)`. Sketch a C++ class `FileHandler` that wraps this C-style resource and uses RAII to guarantee `fclose` is always called, even if an error occurs.
3.  You have a C library that gives you a function `void process_data(void* data, int type_id)` where `type_id` is `1` for `int`, `2` for `float`, etc. This is not type-safe. How could you use C++ templates and function overloading to create a safer, compile-time alternative that achieves the same goal without needing a `type_id`? Provide a code sketch.