## What it is
A dynamic or shared library is a collection of pre-compiled code, like functions and variables, stored in a file separate from the main executable. This library is loaded into memory by the operating system when a program starts or even while it's running, a process called dynamic linking. On Linux, these are `.so` (Shared Object) files; on Windows, they are `.dll` (Dynamic-Link Library) files.

## Why it matters
This concept is fundamental to modern operating systems and large-scale software. In high-performance computing for physics simulations, different numerical solvers or material models are often packaged as dynamic libraries, allowing the core simulation engine to remain unchanged while plugins are updated. In machine learning, Python libraries like TensorFlow and PyTorch are thin wrappers that dynamically load massive, highly-optimized C++/CUDA libraries (`.so` files) to perform the actual tensor computations, which is how a high-level language can achieve near-native performance.

## When to study it
You should be comfortable with the entire static compilation toolchain first. Specifically, you must understand:
1.  The C/C++ compilation process: Preprocessing -> Compilation -> Assembly -> Linking.
2.  The difference between a source file (`.c`, `.cpp`), an object file (`.o`), and an executable.
3.  Basic command-line usage of a compiler like `gcc` or `clang`, including flags like `-c`, `-o`, `-l`, and `-L`.
4.  The concept of a process's virtual address space.

If you cannot explain the purpose of each file type and compiler flag above, review that material first.

## How to study it (step by step)
1.  **Build a static library:** Write a simple C function in `utils.c`. Compile it to an object file (`gcc -c utils.c -o utils.o`). Use the `ar` archiver to create a static library: `ar rcs libutils.a utils.o`. Write a `main.c` and link it against this library: `gcc main.c -L. -lutils -o static_prog`. Note the file size of `static_prog`.
2.  **Build a shared library:** Re-compile `utils.c` with the `-fPIC` flag: `gcc -fPIC -c utils.c -o utils.o`. Now, create the shared library: `gcc -shared -o libutils.so utils.o`.
3.  **Link dynamically:** Link your `main.c` against the new shared library: `gcc main.c -L. -lutils -o dynamic_prog`. Compare the file size of `dynamic_prog` to `static_prog`; the dynamic one will be significantly smaller.
4.  **Resolve runtime dependencies:** Try to run `./dynamic_prog`. It will likely fail with a "cannot open shared object file" error. The OS loader doesn't know where to find `libutils.so`. Fix this by telling the loader where to look: `export LD_LIBRARY_PATH=.` and then run `./dynamic_prog` again.
5.  **Inspect dependencies:** Use the `ldd` tool to see the runtime dependencies of your program: `ldd dynamic_prog`. This will explicitly show that your executable is linked to `libutils.so`.

## Key ideas, with intuition
1.  **Static vs. Dynamic Linking:** Static linking is like photocopying a recipe from a cookbook and pasting it into your personal notes. Your notes are now self-contained but bulky. Dynamic linking is like writing a reference in your notes: "See page 52 of *The Joy of Cooking*." Your notes are small, but you need access to the cookbook to make the dish. If the cookbook is updated with a better recipe, your notes automatically benefit.
2.  **Position-Independent Code (PIC):** A shared library has no idea where it will be loaded into a process's virtual address space. One process might load it at address `0x7f...`, another at `0x7c...`. Therefore, the library's machine code cannot use absolute memory addresses. PIC solves this by using relative addressing. Instead of "jump to address `0x123456`", the code says "jump `500` bytes forward from my current location." This makes the code "relocatable"—it can run correctly regardless of its absolute position in memory.
3.  **Global Offset Table (GOT) and Procedure Linkage Table (PLT):** These are the mechanisms that make PIC work. When code in a shared library needs to access a global variable or call a function, it doesn't do so directly. Instead, it looks up the address in the GOT. The PLT is a similar mechanism specifically for functions. The dynamic loader populates these tables with the correct absolute addresses when the library is first loaded, acting as a middleman between the relocatable library code and the absolute memory layout of the running process.
    - **Intuition:** The GOT/PLT is like a "Table of Contents" at the beginning of the library. The library code always knows how to find the Table of Contents (e.g., "it's 16 bytes from my start"). To find a function, it first goes to the Table of Contents, which then provides the final, absolute address.

## Worked example
Let's create and use a simple shared library that calculates the area of a circle.

**Step 1: Create the library source code.**
File `geometry.c`:
```c
#define PI 3.14159
double circle_area(double radius) {
    return PI * radius * radius;
}
```

**Step 2: Compile the library source into a Position-Independent object file.**
The `-fPIC` flag is crucial. It tells the compiler to generate code that can be loaded at any memory address.
```bash
gcc -fPIC -c geometry.c -o geometry.o
```
*Why this works:* The `-c` flag stops after the compilation phase, producing an object file (`geometry.o`) instead of a full executable. `-fPIC` ensures the resulting machine code uses relative addressing.

**Step 3: Create the shared library from the object file.**
The `-shared` flag tells the compiler to produce a `.so` file.
```bash
gcc -shared -o libgeometry.so geometry.o
```
*Why this works:* This step packages the object code into the special ELF format for a shared library, including metadata the dynamic loader will need.

**Step 4: Create the main program source code.**
File `main.c`:
```c
#include <stdio.h>
// Declare the function from our library
double circle_area(double radius);

int main() {
    double r = 10.0;
    double area = circle_area(r);
    printf("Area of a circle with radius %.2f is %.2f\n", r, area);
    return 0;
}
```

**Step 5: Compile and link the main program against the shared library.**
```bash
gcc main.c -L. -lgeometry -o main_app
```
*Why this works:*
- `main.c` is compiled.
- The linker is invoked to build `main_app`.
- `-L.` tells the linker to look for libraries in the current directory (`.`).
- `-lgeometry` tells the linker to find a library named `libgeometry.so` or `libgeometry.a`. It finds our `.so` file and records it as a dependency in the `main_app` executable instead of copying the code in.

**Step 6: Run the program.**
First, we must tell the dynamic loader where to find our library at runtime.
```bash
export LD_LIBRARY_PATH=.
./main_app
```
Output:
```
Area of a circle with radius 10.00 is 314.16
```
*Why this works:* When `./main_app` starts, the OS loader sees it needs `libgeometry.so`. It checks standard system paths and then checks any paths in the `LD_LIBRARY_PATH` environment variable. It finds our library in the current directory (`.`), loads it into memory, resolves the `circle_area` symbol, and then starts the program's `main` function.

## Diagrams
Here are two diagrams illustrating the difference in memory layout.

**Diagram 1: Static Linking**
Multiple processes using the same static library have redundant copies of the library code in their private memory space.

```text
Process A Virtual Memory         Process B Virtual Memory
+-----------------------+        +-----------------------+
|       Stack           |        |       Stack           |
|-----------------------|        |-----------------------|
|        ...            |        |        ...            |
|-----------------------|        |-----------------------|
|        Heap           |        |        Heap           |
|-----------------------|        |-----------------------|
|                       |        |                       |
|   +-----------------+ |        |   +-----------------+ |
|   |  Library Code   | |        |   |  Library Code   | |
|   |   (copy A)      | |        |   |   (copy B)      | |
|   +-----------------+ |        |   +-----------------+ |
|                       |        |                       |
|   Executable Code     |        |   Executable Code     |
+-----------------------+        +-----------------------+
```

**Diagram 2: Dynamic Linking**
The OS maps the *same* physical copy of the shared library code into the virtual address space of multiple processes. This saves physical RAM.

```text
Process A Virtual Memory         Process B Virtual Memory
+-----------------------+        +-----------------------+
|       Stack           |        |       Stack           |
|-----------------------|        |-----------------------|
|        ...            |        |        ...            |
|-----------------------|        |-----------------------+
|        Heap           |        |        Heap           |
|-----------------------|        |-----------------------|
| libgeometry.so (map)  | -------> | libgeometry.so (map)  |
+-----------------------+        +-----------------------+
|   Executable Code     |        |   Executable Code     |
+-----------------------+        +-----------------------+
            |                              |
            |   +----------------------+   |
            +-->|  libgeometry.so Code |<--+
                |  (single copy in     |
                |   physical RAM)      |
                +----------------------+
```

## Memory technique — remember this forever
1.  **Story/Mnemonic:** Think of dynamic linking as a **"Shared Central Ordinance"** (`.so`). Every soldier (program) is given a small map (the executable) that references the Central Ordinance building for their heavy equipment (library functions). They don't carry the equipment themselves, making them lightweight. **PIC** means the instructions in the ordinance manual are relative ("get the cannon 3 bays to the right of the entrance"), so the building can be located anywhere in the city and the instructions still work.
2.  **Facts to overlearn:**
    - `gcc -fPIC -c libcode.c` (Compile a relocatable object)
    - `gcc -shared -o libname.so libcode.o` (Create the shared library)
    - `export LD_LIBRARY_PATH=/path/to/libs` (Tell the loader where to look at runtime)
3.  **Spaced Repetition Schedule:** Review the three commands and the Central Ordinance story on Day 1, Day 3, Day 7, Day 16, and Day 35. Actively re-type the commands from memory each time.
4.  **First Principles Pathway:** If you forget, start with the goal: "Avoid duplicating code across many executables." This implies sharing. For code to be shared by processes, it must be loaded into memory once. Since each process has its own virtual address space, the library will be at a different virtual address in each one. Therefore, the library's code cannot rely on absolute addresses, which directly leads to the necessity of Position-Independent Code (PIC).

## Common mistakes
1.  **Forgetting `-fPIC`:** Compiling library code without `-fPIC` may work on some architectures but will fail on others (like x86-64) with cryptic linker errors about "relocations". Always use `-fPIC` for shared library code.
2.  **Confusing Link Time vs. Run Time Paths:** Setting `-L.` helps the *linker* find the library when you *build* the program. It does nothing for the *loader* when you *run* the program. Forgetting to set `LD_LIBRARY_PATH` (or using `rpath`, or installing the library) is the most common reason a correctly compiled program fails to start.
3.  **Name Mangling in C++:** If you write a library in C++ and try to link it from C (or vice-versa), you will get "undefined symbol" errors. This is because the C++ compiler changes function names to support overloading (e.g., `foo(int)` becomes `_Z3fooi`). To prevent this, declare C++ functions with `extern "C" { ... }`.
4.  **Shipping without Dependencies:** Distributing your executable `main_app` without also distributing the `libgeometry.so` it depends on. The program will be useless on another machine.

## Self-check
1.  You have compiled `main_app` which depends on `libfoo.so`, and both files are in `/home/user/project/`. You `cd` into your home directory (`/home/user/`) and try to run `./project/main_app`. It fails. Why? What is the most direct command to fix this for your current terminal session?
2.  What is the conceptual difference between the Global Offset Table (GOT) and the Procedure Linkage Table (PLT)? Which one is involved in the "lazy binding" optimization, and what does that mean?
3.  Imagine you are building a large physics simulation. You have a core `simulator` executable. You want to support two different models for gravity, a simple `newtonian.so` and a more complex `relativistic.so`. How would you design your `simulator`'s code to dynamically load and switch between these two models at runtime, without ever linking to them at compile time? (Hint: research the `dlopen`, `dlsym`, and `dlclose` functions).