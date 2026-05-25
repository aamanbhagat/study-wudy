## What it is
A `CMakeLists.txt` file is a plain text script that contains a set of commands for the CMake build system. The commands `add_executable`, `add_library`, and `target_link_libraries` are the fundamental verbs used in this script to define what to build: they declare a program to be created, a reusable code library to be compiled, and the dependency connections between them.

## Why it matters
Large-scale scientific and engineering software, from computational fluid dynamics solvers for rocket engine design to the control software for robotic systems, are built from millions of lines of code organized into hundreds of components. CMake is the de facto standard for managing these complex C++ projects. Understanding these core commands is non-negotiable for building, modifying, or contributing to high-performance simulation codes, machine learning frameworks like PyTorch, or embedded systems in aerospace.

## When to study it
Before tackling this, you must understand the manual C++ compilation process from the command line. Specifically, you should be comfortable with:
1.  Using a compiler like `g++` or `clang++`.
2.  The difference between compiling a source file (`.cpp`) into an object file (`.o`) with the `-c` flag.
3.  The difference between linking object files into an executable versus a static library (`.a`) or a shared library (`.so`, `.dll`).
If you haven't manually compiled and linked a multi-file C++ project using the command line, stop and do that first. CMake automates that process, and you cannot understand the automation without first understanding the manual steps.

## How to study it (step by step)
1.  **Create the simplest executable.** Write a `main.cpp` file with a `main` function. In the same directory, create `CMakeLists.txt` containing only three commands: `cmake_minimum_required(VERSION 3.10)`, `project(HelloWorld)`, and `add_executable(app main.cpp)`. Create a `build` directory, `cd` into it, and run `cmake ..` then `make`. Execute `./app`.
2.  **Introduce a helper function.** Create `helper.cpp` and `helper.h`. Move a piece of logic from `main.cpp` into a function in `helper.cpp`. Modify your `add_executable` command to be `add_executable(app main.cpp helper.cpp)`. Re-run `make` from the `build` directory. Observe how CMake automatically detects the change and recompiles the necessary files.
3.  **Refactor into a static library.** The previous step is not scalable. Change your `CMakeLists.txt`. Remove `helper.cpp` from the `add_executable` line. Add a new line before it: `add_library(helpers STATIC helper.cpp)`. Now you have defined two "targets": an executable `app` and a library `helpers`.
4.  **Link the targets.** Your executable `app` depends on the library `helpers`. You must declare this dependency. Add the line `target_link_libraries(app PRIVATE helpers)`. The `build` directory is now stale. Clear it (`rm -rf *`), then re-run `cmake ..` and `make`. The program should build and run as before.
5.  **Understand the dependency.** In `main.cpp`, try to call a function that exists in `helper.cpp` but is not declared in `helper.h`. The build will fail at the compilation stage for `main.cpp`, before linking is even attempted. This demonstrates that linking (`target_link_libraries`) is a concept for the linker, while `#include` is for the compiler.
6.  **Switch to a shared library.** Change `add_library(helpers STATIC helper.cpp)` to `add_library(helpers SHARED helper.cpp)`. Clear the build directory, re-run the build process. Observe the different file created (e.g., `libhelpers.so` instead of `libhelpers.a` on Linux). Run the executable. Contemplate the difference in file size and runtime behavior.

## Key ideas, with intuition
1.  **CMake Thinks in "Targets".** A target is a build artifact, a "noun" in your project. `add_executable(app ...)` creates a target named `app`. `add_library(helpers ...)` creates a target named `helpers`. Almost every other command in modern CMake modifies a property of an existing target, like `target_link_libraries`. This object-oriented approach is cleaner than old methods of manipulating global variable lists.
2.  **Dependencies Form a Directed Acyclic Graph (DAG).** The command `target_link_libraries(A B)` creates a directed edge from target `A` to target `B` ($A \rightarrow B$), meaning "$A$ depends on $B$". CMake constructs a full dependency graph of your project. It then performs a topological sort on this graph to determine the correct build order. It will always build `B` before it attempts to build `A`.
3.  **Configuration vs. Generation.** The CMake process is two-phased.
    *   **Phase 1 (Configure):** You run `cmake ..`. It reads your `CMakeLists.txt` and generates *native* build files (e.g., a `Makefile` on Linux, a Visual Studio `.sln` on Windows). This is the "meta" part of the meta-build system.
    *   **Phase 2 (Generate/Build):** You run `make` (or build in Visual Studio). This second tool reads the generated files and executes the actual compile and link commands. This separation is why CMake is cross-platform.
4.  **Properties and Propagation (`PRIVATE` vs `PUBLIC`).** When you link a library, you create two kinds of dependencies: the need for the compiled code at link time, and the need for the header files at compile time.
    *   `target_link_libraries(A PRIVATE B)`: `A` uses `B` in its `.cpp` files. The dependency is private to `A`'s implementation. Anyone who uses `A` doesn't need to know about `B`.
    *   `target_link_libraries(A PUBLIC B)`: `A` uses `B` in its public header files (`.h`). This means anyone who links to `A` will *also* need to know about `B`. This keyword makes the dependency transitive.
    *   `target_link_libraries(A INTERFACE B)`: `A` doesn't use `B` itself, but it's a wrapper that exposes `B`'s functionality in its public API.

## Worked example
Let's build a small application that uses a custom math library.

**Directory Structure:**
```
vector_project/
├── CMakeLists.txt
├── main.cpp
└── math/
    ├── CMakeLists.txt
    ├── vec3.cpp
    └── vec3.h
```

**`math/vec3.h`:**
```cpp
#pragma once
struct Vec3 { double x, y, z; };
double magnitude(const Vec3& v);
```

**`math/vec3.cpp`:**
```cpp
#include "vec3.h"
#include <cmath>
double magnitude(const Vec3& v) {
    return std::sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
}
```

**`main.cpp`:**
```cpp
#include <iostream>
#include "math/vec3.h" // Note the path
int main() {
    Vec3 v = {3.0, 4.0, 0.0};
    std::cout << "Magnitude: " << magnitude(v) << std::endl;
    return 0;
}
```

**`math/CMakeLists.txt`:**
```cmake
# Define the library target
add_library(vector_math STATIC
    vec3.cpp
)

# Specify that this library's headers are in the current directory
target_include_directories(vector_math PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
```
*Step 1: Define the library.* We use `add_library` to create a target named `vector_math` from its source files.
*Step 2: Expose headers.* `target_include_directories` tells CMake that any target linking against `vector_math` should also have its include path pointed to this directory, allowing `#include "vec3.h"`. The `PUBLIC` keyword is crucial for this propagation.

**`vector_project/CMakeLists.txt` (the top-level one):**
```cmake
cmake_minimum_required(VERSION 3.10)
project(VectorApp)

# Tell CMake to process the CMakeLists.txt in the 'math' subdirectory
add_subdirectory(math)

# Define the executable target
add_executable(app main.cpp)

# Link the executable against the library defined in the subdirectory
target_link_libraries(app PRIVATE vector_math)
```
*Step 3: Process subdirectory.* `add_subdirectory(math)` tells CMake to descend into the `math` directory and execute its `CMakeLists.txt`. This is how the `vector_math` target becomes known to this top-level script.
*Step 4: Define executable.* `add_executable` creates our main program target.
*Step 5: Link.* `target_link_libraries` connects our `app` to the `vector_math` library. We use `PRIVATE` because `main.cpp` uses `vector_math`, but `app` itself doesn't expose `vector_math`'s features in any public API (since it's an executable).

**To Build:**
```bash
mkdir build
cd build
cmake ..
make
./app
```
This multi-file, multi-directory structure is a microcosm of all large C++ projects. Each step explicitly declares a target and its dependencies, which CMake then resolves.

## Diagrams
**Build Process Flow:**
```text
                  (Phase 1: Configure)          (Phase 2: Build)
+----------------+      cmake ..      +----------+       make       +------------+
| CMakeLists.txt |  --------------->  | Makefile |  ------------->  | Executable |
+----------------+                    +----------+                  | Library    |
                                                                    +------------+
```

**Dependency Graph (from worked example):**
```text
+----------+       links against       +---------------+
|   app    |  ---------------------->  |  vector_math  |
+----------+                           +---------------+
 (Target)                              (Target)
```

## Memory technique — remember this forever
1.  **The Story: The Chef's Kitchen.**
    *   `add_library(...)`: This is prepping an ingredient. You're taking raw materials (`.cpp` files) and creating a refined, reusable component (a sauce, a stock). Let's call it `sauce_lib`.
    *   `add_executable(...)`: This is creating the final dish (`the_meal`). It has its own unique recipe file (`main.cpp`).
    *   `target_link_libraries(the_meal PRIVATE sauce_lib)`: This is the final assembly step in the recipe: "Now, add the sauce to the meal." You are explicitly stating that the final dish requires the prepped ingredient.

2.  **Must-Overlearn Commands:**
    *   `add_executable(target_name source1.cpp ...)`
    *   `add_library(target_name [STATIC|SHARED] source1.cpp ...)`
    *   `target_link_libraries(target_to_modify [PUBLIC|PRIVATE|INTERFACE] dependency_name ...)`

3.  **Spaced Repetition Schedule:**
    Review these commands and the Chef's Kitchen story at **1 day, 3 days, 7 days, 16 days, and 35 days**. Each time, rewrite the worked example from scratch without looking.

4.  **First Principles Pathway:**
    If you forget CMake, remember the `g++` commands it replaces.
    *   `add_library(my_lib STATIC a.cpp b.cpp)` is an abstraction for:
        `g++ -c a.cpp -o a.o`
        `g++ -c b.cpp -o b.o`
        `ar rcs libmy_lib.a a.o b.o`
    *   `add_executable(my_app main.cpp)` and `target_link_libraries(my_app PRIVATE my_lib)` is an abstraction for:
        `g++ -c main.cpp -o main.o`
        `g++ main.o -L. -lmy_lib -o my_app` (or `g++ main.o libmy_lib.a -o my_app`)
    CMake's job is to generate the correct versions of these commands for any platform.

## Common mistakes
1.  **Adding headers to `add_executable`/`add_library`:** You only list `.cpp` (or other source) files. Header files are consumed by the `#include` preprocessor directive, not the compiler/linker in the same way. CMake is smart enough to track header dependencies for recompilation, but you don't list them here.
2.  **"Undefined reference to..." error:** This is a linker error. It almost always means you wrote the C++ code correctly, but forgot to add a `.cpp` file to a library, or forgot to `target_link_libraries` an executable against the library that contains the missing symbol.
3.  **Confusing Target Names and Filenames:** `target_link_libraries` uses the *target name* you created with `add_library` (e.g., `vector_math`), not the filename it generates (e.g., `libvector_math.a`).
4.  **In-source builds:** Running `cmake .` in your source directory. This clutters your project with generated files. Always create a separate `build` directory to keep source and build artifacts isolated.

## Self-check
1.  Write a `CMakeLists.txt` for a project with one file, `main.cpp`, that prints your name. The executable should be named `my_name`.
2.  Your project now has a `logger.cpp` and `logger.h` that provide a `log_message(const char* msg)` function. Create a *shared* library named `logging` from these files. Your `my_name` executable should use this library to print your name. What do the `CMakeLists.txt` and `main.cpp` look like?
3.  Imagine your `logging` library now depends on an external library, `libsystemd`, for system-level logging. You link it via `target_link_libraries(logging PRIVATE systemd)`. Now, another executable, `another_app`, links to your `logging` library. Does `another_app` also need to be linked to `libsystemd`? What if you had used `PUBLIC` instead of `PRIVATE`? Explain the reasoning based on dependency propagation.