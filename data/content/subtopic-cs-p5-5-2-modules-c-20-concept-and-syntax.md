## What it is
C++20 Modules are a modern replacement for the preprocessor-based `#include` system. They package declarations and definitions into a single, independently compiled unit called a module, which other parts of the program can then `import`. This provides stronger encapsulation and dramatically faster compilation times by replacing textual inclusion with a more efficient, semantic mechanism.

## Why it matters
In large-scale scientific computing, such as simulating fluid dynamics for rocket nozzles or training massive neural networks, projects can have thousands of files. The old `#include` model forces the compiler to re-parse the same header files tens of thousands of times, leading to hours-long build times. Modules compile an interface once, and all consumers use that pre-compiled result, reducing build times from hours to minutes and enabling faster iteration on complex physics models and algorithms.

## When to study it
Before tackling modules, you must have a solid, practical understanding of the classic C++ build process. Specifically, you need to be comfortable with:
1.  **Translation Units:** The concept of a `.cpp` file as a unit of compilation.
2.  **The Preprocessor:** How `#include`, `#define`, and include guards (`#ifndef`/`#define`/`#endif` or `#pragma once`) work by textual manipulation before compilation.
3.  **Declarations vs. Definitions:** The difference between declaring a function `void f();` (in a `.h` file) and defining it `void f() { ... }` (in a `.cpp` file).
4.  **The Linker:** How the linker resolves function calls from one translation unit to definitions in another.

If you don't understand the problems modules solve (e.g., slow builds, macro pollution, header order dependencies), you won't appreciate their design.

## How to study it (step by step)
1.  **Contrast with Headers:** Take a simple program with `utils.h` and `utils.cpp`. Compile it with two different `main` files that both `#include "utils.h"`. Use your compiler's verbose flag (e.g., `g++ -E`) to see the preprocessor output and witness how the text of `utils.h` is copied into both translation units.
2.  **Write Your First Module:** Convert the `utils` files into a single module interface file (e.g., `utils.cppm`). Use `export module utils;` at the top. Use the `export` keyword on the functions and types you want to make public.
3.  **Compile and Import:** Write a `main.cpp` that uses `import utils;`. Now, crucially, learn the command-line flags for your compiler (GCC, Clang, or MSVC) to compile the module interface first, then the `main` file, and link them. This is different from the old model. For example, with Clang: `clang++ -std=c++20 --precompile utils.cppm -o utils.pcm` followed by `clang++ -std=c++20 main.cpp -fprebuilt-module-path=. utils.pcm -o main`.
4.  **Explore Module Partitions:** For a slightly larger conceptual module, split it into parts. Create a primary module interface `geometry.cppm` (`export module geometry;`). Then create a partition file `geometry-point.cppm` (`module geometry:point;`). Learn how to export from the partition and re-export it from the primary interface.
5.  **Interface vs. Implementation:** Separate your module into an interface unit (`.cppm`) containing only exported declarations and an implementation unit (`.cpp`) containing the definitions. This mirrors the old `.h`/`.cpp` separation but with stronger compiler guarantees.
6.  **Handle Legacy Code:** Learn about the *global module fragment* (`module; ... #include <iostream>`) to correctly use standard library headers (or other non-module libraries) within a module interface without polluting the global namespace.

## Key ideas, with intuition
1.  **Modules are Compiled, Not Copied:** An `#include` directive is a blunt instrument. It tells the preprocessor: "copy the entire text of this file and paste it right here." If 100 `.cpp` files include the same header, that header is parsed 100 times. A module interface is compiled *once* into an efficient, binary representation. When you `import` it, the compiler reads this cached representation, which is orders of magnitude faster.

2.  **Explicit is Better Than Implicit (`export`):** In the header system, everything in a header is public by default. To hide implementation details, you'd use a separate `.cpp` file. Modules make privacy the default. Nothing is visible outside the module unless you explicitly mark it with the `export` keyword. This improves encapsulation and makes APIs clearer.
    $$
    \text{Header model: `default public`} \implies \text{hides implementation via file separation} \\
    \text{Module model: `default private`} \implies \text{exposes API via `export` keyword}
    $$

3.  **No More Macro Pollution:** Preprocessor macros are purely textual. If a header file defines a macro like `#define min(a, b) ...`, that macro now exists in every file that includes it, potentially breaking code that uses `min` as a variable name. Since modules are processed by the compiler *after* the preprocessor, macros defined within a module do not leak out to the importing file. This isolation is a massive stability improvement.

## Worked example
Let's create a simple 2D vector module and use it.

**File 1: `vector.cppm` (The Module Interface Unit)**
```cpp
// This file defines the public interface for our module.
export module vector;

// We need iostream for the implementation, but we don't want to export it.
// We can use a private module fragment for implementation details.
module :private;
#include <cmath>

// Now, back to the public interface.
export struct Vec2D {
    double x = 0.0;
    double y = 0.0;
};

export [[nodiscard]] double magnitude(Vec2D const& v) {
    // The implementation is here, but it could also be in a separate
    // module implementation file. The `sqrt` function is available
    // because of the include in the private module fragment.
    return std::sqrt(v.x * v.x + v.y * v.y);
}
```

**File 2: `main.cpp` (The Consumer)**
```cpp
import vector; // Import the compiled interface of our module.
#include <iostream>

int main() {
    Vec2D p{3.0, 4.0}; // Vec2D type is available from the module.
    
    std::cout << "Point is (" << p.x << ", " << p.y << ")\n";
    
    // The magnitude function is also available.
    double mag = magnitude(p); 
    
    std::cout << "Magnitude is " << mag << "\n"; // Expected output: 5
    
    return 0;
}
```

**Compilation (using GCC 12+):**
```sh
# Step 1: Compile the module interface. This produces vector.gcm.
g++ -std=c++20 -fmodules-ts -c vector.cppm

# Step 2: Compile the main program, telling it where to find the module artifact.
g++ -std=c++20 -fmodules-ts main.cpp vector.o -o main_program

# Step 3: Run the program.
./main_program
```

**Reflection:**
1.  `export module vector;` declared the module's name. This name is used in the `import` statement.
2.  `export struct Vec2D` and `export ... double magnitude(...)` made these specific entities visible to importers. If `export` were omitted, they would be private to the module.
3.  The compilation was a two-stage process. We had to build the module *before* the code that depends on it. This is the fundamental shift from the old model.

## Diagrams
```text
Diagram 1: The Old #include Model (Repetitive Parsing)

              +-------------+
              | vector.h    |
              +-------------+
                   |
      +--------------+--------------+
      | (textual copy)              | (textual copy)
      v                             v
+-------------+               +-------------+
| physics.cpp |               | renderer.cpp|
+-------------+               +-------------+
      |                             |
      v (compile)                   v (compile)
+-------------+               +-------------+
| physics.obj |               | renderer.obj|
+-------------+               +-------------+

Note: The compiler parses the contents of vector.h TWICE. In a large project,
this happens thousands of times.
```

```text
Diagram 2: The C++20 Module Model (Compile Once, Use Many)

              +-------------+
              | vector.cppm |
              +-------------+
                   |
                   v (compile once)
              +-------------+
              | vector.bmi  |  (Binary Module Interface)
              +-------------+
                   |
      +--------------+--------------+
      | (semantic import)           | (semantic import)
      v                             v
+-------------+               +-------------+
| physics.cpp |               | renderer.cpp|
+-------------+               +-------------+
      |                             |
      v (compile)                   v (compile)
+-------------+               +-------------+
| physics.obj |               | renderer.obj|
+-------------+               +-------------+

Note: The compiler parses vector.cppm ONCE to create the .bmi.
Subsequent compilations just read the efficient binary format.
```

## Memory technique — remember this forever
1.  **The Story:** Think of modules as a modern embassy. In the old world (`#include`), to talk to another country, you had to fly in their entire legal code and library (`.h` files) and read it yourself, every single time. It was slow and you might misinterpret things (macro pollution). The new world (`import`) has an embassy. You go to one designated place (the module interface) and talk to a trained diplomat (the compiler) who gives you a clear, unambiguous, pre-approved contract (`.bmi` file) on how to interact. It's fast, safe, and well-defined.

2.  **Must Overlearn:**
    *   `export module ModuleName;` — Declares a module interface.
    *   `import ModuleName;` — Imports a module.
    *   `export ...` — The keyword that makes a declaration public.

3.  **Spaced Repetition Schedule:** Review your first module code and the compilation commands at **1 day, 3 days, 7 days, 16 days, 35 days**. Actively re-compile it from the command line each time. Do not just read it.

4.  **First Principles Pathway:** If you forget the syntax, remember the goal: to replace the textual preprocessor.
    *   How do I name my package of code? I need a `module` declaration.
    *   How do I control what's public? I need a keyword to `export` things.
    *   How do I use someone else's package? I need to `import` it.
    The keywords logically follow from the system's design goals.

## Common mistakes
1.  **Trying to `#include` a module file:** You never `#include "my_module.cppm"`. The relationship is established through `import` and compiler flags, not the preprocessor.
2.  **Incorrect Build Order:** Compiling `main.cpp` before the module it imports will fail. The module interface must be compiled first to produce the binary interface file (`.gcm`, `.pcm`, `.ifc`) that other files need.
3.  **Putting `export` on local variables or private members:** `export` can only be applied to declarations at namespace scope (functions, types, variables) or to members of an exported class/struct. It defines the *public API* of the module.
4.  **Module Name Mismatch:** The name in `export module MyModule;` must exactly match the name in `import MyModule;`. File names are irrelevant to the module name itself, which can be a source of confusion.

## Self-check
1.  Take a simple class you've written before, with its declaration in a `.h` file and its definition in a `.cpp` file. Convert this pair of files into a single module interface file (`.cppm`).
2.  Why does this code often fail or produce warnings if placed at the top level of a module interface file? What are the two correct ways to include `<vector>` inside a module interface?
    ```cpp
    export module my_module;
    #include <vector>
    export std::vector<int> get_data();
    ```
3.  You are designing a module for celestial mechanics called `astro`. You want to separate the code for 2-body problems from N-body simulation code. Sketch the file structure and the module declaration lines (`module ...;` or `export module ...;`) to implement this using a primary module interface for `astro` and two partitions: `twobody` and `nbody`.