## What it is
An **anonymous namespace** is a namespace defined without a name, which gives all its contents internal linkage, meaning they are only visible within the single file (translation unit) where they are defined. An **inline namespace** is a named namespace whose members are treated as if they were also members of the parent namespace, providing a mechanism for versioning libraries without breaking user code.

## Why it matters
Anonymous namespaces are the modern C++ replacement for `static` on non-member functions and variables, preventing name collisions in large-scale projects like physics simulators or distributed computing frameworks. Inline namespaces are critical for API evolution; a library like a high-performance linear algebra toolkit can introduce a new, faster `v2` implementation of its functions, mark it `inline`, and existing user code will automatically use the new version upon recompilation without any source code changes.

## When to study it
You should be comfortable with basic C++ namespaces (`namespace MyLib { ... }`), the One Definition Rule (ODR), and the concept of linkage (internal vs. external). Specifically, you must understand what a translation unit is (roughly, a single `.cpp` file after preprocessing) and why defining a global variable in a header file included by multiple `.cpp` files causes a linker error.

## How to study it (step by step)
1.  **Recreate the problem:** Create two files, `a.cpp` and `b.cpp`. In both, define a global helper function `void log_message() { ... }`. Try to compile and link them together. Observe the linker error about multiple definitions. This is the problem anonymous namespaces solve.
2.  **Apply the solution:** Fix the error from step 1 by wrapping the function definition in each file within `namespace { ... }`. Verify that it now compiles and links. This demonstrates internal linkage.
3.  **Inspect the symbols:** Use a tool like `nm` on Linux/macOS (`nm a.o b.o`) or `dumpbin` on Windows to inspect the object files from step 2. Notice how the compiler has given the `log_message` functions unique, mangled names, preventing a collision.
4.  **Set up a versioning scenario:** Create a header `my_math.h` with a namespace `MyMath` containing two nested namespaces, `v1` and `v2`. Each nested namespace should contain a function `double sqrt(double)`.
5.  **Write client code:** In `main.cpp`, include `my_math.h` and call `MyMath::v1::sqrt(16.0)`. Compile and run.
6.  **Introduce `inline`:** In `my_math.h`, change `namespace v1` to `inline namespace v1`. In `main.cpp`, change the call to just `MyMath::sqrt(16.0)`. Observe that it compiles and calls the `v1` version.
7.  **Simulate an update:** Change the header to make `v2` the inline namespace (`inline namespace v2`). Recompile *only* `main.cpp`. Observe that your program now calls the `v2` version without any changes to the source code of `main.cpp`.

## Key ideas, with intuition
1.  **Anonymous Namespace -> Private to the File:** Think of a translation unit (`.cpp` file) as a workshop. An anonymous namespace is like building a tool for your personal use inside that workshop. No other workshop can see or use it, so there's no risk of someone confusing your custom wrench with theirs. The compiler enforces this by giving the tool a unique, secret name like `(anonymous namespace)::my_wrench`. This is the modern way to achieve internal linkage, replacing the older `static` keyword for this purpose.
    $$ \texttt{namespace \{ void my_helper() \{...\} \}} \Leftrightarrow \texttt{static void my_helper() \{...\}} $$

2.  **Inline Namespace -> Promoting a Version:** Imagine a library is a company, `MyLib`. It releases a product `v1`. Later, it releases a better product, `v2`. An inline namespace is like putting `v2` on the main display floor. When customers walk in and ask for "the product" (`MyLib::product()`), they get `v2` by default. However, `v1` is still available in the back room; a savvy customer can specifically ask for it (`MyLib::v1::product()`). It makes the "latest and greatest" the default, simplifying access while maintaining backward compatibility.

3.  **Name Lookup Unification:** The core mechanism of `inline namespace` is that it adds the names from the inline namespace into the name lookup process of the parent namespace. When the compiler sees `Parent::func()`, it searches for `func` in `Parent` and also in all of `Parent`'s inline namespaces simultaneously. If it finds `func` in both, the code is ambiguous and will not compile.

## Worked example
Let's build a simple library for calculating orbital periods, which we will update with a more precise formula.

**File: `orbital_math.h`**
```cpp
#include <cmath>

namespace OrbitalMath {
    // Version 1: Simple Keplerian period for circular orbits
    namespace v1 {
        constexpr double G = 6.67430e-11; // Gravitational constant
        double period(double semi_major_axis, double central_mass) {
            return 2.0 * M_PI * std::sqrt(std::pow(semi_major_axis, 3) / (G * central_mass));
        }
    }

    // Version 2: More precise, but we'll make it the default later
    namespace v2 {
        constexpr double G_PRECISE = 6.6743015e-11; // More precise G
        double period(double semi_major_axis, double central_mass) {
            // A slightly more robust calculation, for demonstration
            double a3 = semi_major_axis * semi_major_axis * semi_major_axis;
            return 2.0 * M_PI * std::sqrt(a3 / (G_PRECISE * central_mass));
        }
    }

    // Make v1 the default for now
    inline namespace v1 {}
}
```

**File: `main.cpp`**
```cpp
#include <iostream>
#include "orbital_math.h"

int main() {
    double earth_orbit_a = 1.496e11; // meters
    double sun_mass = 1.989e30;      // kg

    // Because v1 is inline, we can call period() directly from OrbitalMath
    double p = OrbitalMath::period(earth_orbit_a, sun_mass);

    std::cout << "Orbital period (v1 default): " << p / (60*60*24) << " days" << std::endl;

    // We can still access v2 explicitly if needed
    double p_v2 = OrbitalMath::v2::period(earth_orbit_a, sun_mass);
    std::cout << "Orbital period (v2 explicit): " << p_v2 / (60*60*24) << " days" << std::endl;

    return 0;
}
```

**Reflection:**
1.  **`orbital_math.h` setup:** We defined two distinct versions of our API inside `v1` and `v2`. The line `inline namespace v1 {}` does not need to contain the definitions; it simply marks the *entire preceding namespace `v1`* as inline.
2.  **`main.cpp` call:** The call `OrbitalMath::period(...)` works because the compiler looks inside `OrbitalMath` and also inside its inline namespace, `v1`, finding `v1::period`.
3.  **Explicit access:** The call `OrbitalMath::v2::period(...)` demonstrates that the non-inline namespace is still perfectly accessible via its fully qualified name.
4.  **The Upgrade:** To upgrade the entire userbase, we would simply change the last line of `orbital_math.h` to `inline namespace v2 {}`. Any client code like `main.cpp` would, upon recompilation, automatically link to the `v2` functions without a single character change in its own source.

## Diagrams
**Anonymous Namespace (Internal Linkage)**
```text
      Translation Unit 1 (file1.cpp)         Translation Unit 2 (file2.cpp)
+------------------------------------------+ +------------------------------------------+
|                                          | |                                          |
|  void global_func() { ... } // External  | | extern void global_func();             |
|                                          | |                                          |
|  namespace {                             | |  namespace {                             |
|    int helper_var;     // Internal      | |    int helper_var;     // Internal      |
|  }                                       | |  }                                       |
|                                          | |                                          |
|  helper_var is visible here.             | |  helper_var is visible here.             |
|  global_func() is visible here.          | |  global_func() is visible here.          |
+------------------------------------------+ +------------------------------------------+
             |                                          ^
             | Linker sees one `global_func`            |
             +------------------------------------------+
             Linker does NOT see `helper_var` from file1,
             so there is no name collision.
```

**Inline Namespace (Name Lookup)**
```text
          namespace MyLib {
+-------------------------------------------------+
|                                                 |
|          inline namespace v2 {                  |
|         +---------------------------+           |
|         | void func();              |           |
|         | class Widget;             |           |
|         +---------------------------+           |
|          } // end v2                ^           |
|                                     |           |
|          namespace v1 {             |           |
|         +---------------------------+           |
|         | void func(int);           |           |
|         +---------------------------+           |
|          } // end v1                |           |
|                                     |           |
+-------------------------------------------------+
             |
             | Name lookup for MyLib::...
             v
Compiler searches inside `MyLib` AND inside `MyLib::v2` as if they are one scope.

MyLib::func() ----> resolves to MyLib::v2::func()
MyLib::Widget w; -> resolves to MyLib::v2::Widget
MyLib::func(5) ---> resolves to MyLib::v1::func(int) // still accessible!
```

## Memory technique — remember this forever
1.  **The Story:**
    *   **Anonymous Namespace:** A **secret agent** operating in one country (`.cpp` file). Their tools and identity are known only within that country's intelligence agency (`namespace { ... }`). The agency gives them a code name only they know, so they never conflict with agents from other countries. **Mnemonic: Anonymous == Agent (Internal).**
    *   **Inline Namespace:** A smartphone company releases the **iPhone v14**. Later, they release the **iPhone v15**. They put the v15 on the main display (`inline namespace v15`). When you walk in and say "I want an iPhone," you get the v15. The v14 is still in the stockroom (`namespace v14`) if you ask for it by its full name. **Mnemonic: Inline == In Style (the latest version).**

2.  **Facts to Overlearn:**
    *   `namespace { /* ... */ }` -> Gives contents internal linkage.
    *   `inline namespace V { /* ... */ }` -> Members of `V` are visible in the parent namespace.
    *   Anonymous namespaces belong in `.cpp` files, never in `.h` files.

3.  **Spaced Repetition Schedule:** Review these concepts and redo the "How to study it" steps at:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget, rebuild from the problems they solve.
    *   **Anonymous:** "How do I create a helper function or variable in a `.cpp` file that is guaranteed not to conflict with anything in any other file?" The answer must be to hide its name from the linker. `static` did this. `namespace { ... }` is the modern, more powerful way.
    *   **Inline:** "How do I publish a new version of my library's API without forcing all my users to change their code from `MyLib::v1::foo()` to `MyLib::v2::foo()`?" The answer must be to make the new names appear directly within `MyLib` by default. This is exactly what `inline namespace` does.

## Common mistakes
1.  **Anonymous Namespace in a Header:** Putting an anonymous namespace in a header file (`.h`). When this header is included in multiple `.cpp` files, each file gets its *own private copy* of the variables/functions. This bloats the binary and is almost never the intended behavior; you usually want one shared object, which this prevents.
2.  **Confusing `inline namespace` with `inline` functions:** These are completely unrelated. The `inline` keyword for a function is a hint to the compiler to avoid a function call overhead. The `inline` keyword for a namespace is a directive about name lookup and visibility for versioning.
3.  **Forgetting Explicit Access:** Believing that making a namespace inline makes the older versions inaccessible. You can always access any version by its fully qualified name (e.g., `MyLib::v1::func()`), which is essential for testing or maintaining specific legacy behaviors.

## Self-check
1.  You have a constant used for a physics calculation that is only relevant inside `simulation_core.cpp`. Should you declare it as `static const double a = 9.8;`, or place it inside an anonymous namespace? Justify your choice.
2.  A library `linalg` provides matrix operations. Version 1 is in `namespace v1`, and a new, faster version using AVX instructions is in `namespace v2`. The `v2` code requires a CPU with AVX support. How could you use preprocessor directives (`#ifdef __AVX__`) in conjunction with inline namespaces to make `linalg::v2` the default *only* when the code is compiled with AVX support enabled, falling back to `linalg::v1` otherwise?
3.  Consider the following code. Will it compile? If so, what does it print? If not, why not?
    ```cpp
    #include <iostream>
    namespace A {
        inline namespace B {
            void print() { std::cout << "B" << std::endl; }
        }
        namespace C {
            void print() { std::cout << "C" << std::endl; }
        }
    }

    int main() {
        A::print();
        return 0;
    }
    ```