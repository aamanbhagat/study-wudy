## 1. The one-sentence answer
**C++20 modules replace the traditional header-file model with a new encapsulation mechanism that exports only what is intended, eliminates macro pollution, and enables faster, more reliable compilation.**

Modules let you divide code into self-contained units instead of scattering declarations across .h files that get textually included everywhere. When you import a module the compiler reads a pre-processed binary interface rather than re-parsing thousands of lines of source, which removes most of the ODR and macro-leakage problems that have plagued large C++ codebases for decades. The syntax is deliberately small: you write `export module name;` at the top of a file, mark the symbols you want visible with `export`, and then consume them with `import name;`.

> [!NOTE]
> The single biggest mental shift is realising that modules are not “better includes”; they are a new kind of translation-unit boundary that the compiler understands natively.

## 2. Why this matters — concrete and current
LLVM/Clang 16+ and MSVC 19.30+ both ship production-grade module support; Google’s internal monolithic build now uses modules for its core libraries, cutting clean-build time by roughly 30 %.  
CUDA 12.4 adopted modules to isolate device code from host macros, eliminating a long-standing source of nvcc crashes reported in NVIDIA bug 3921702.  
The ISO C++ committee’s own “C++ Ecosystem” paper (P2409R0) cites modules as the prerequisite for a viable C++ package manager; vcpkg and Conan are already shipping experimental module maps.  
High-energy physics experiments at CERN (ROOT 6.30) switched their reflection layer to modules so that dictionary generation no longer depends on fragile #include order.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Translation unit     | Modules redefine what constitutes one                    |
| ODR (One Definition Rule) | Modules enforce it at the compiler level instead of by convention |
| Visibility / linkage | `export` gives a new, explicit visibility model           |
| Build system basics  | You must tell the compiler which .cpp files are module interfaces |

If any row is unfamiliar, pause and read the corresponding section on translation units and linkage first.

## 4. Building the idea — from intuition to formalism

### Step 1 — A file is no longer just text
A module interface unit begins with an explicit declaration that tells the compiler “this file is a named, importable unit”.

```cpp
export module math;
```
The compiler records the module name and will later emit a .pcm/.ifc file instead of treating the file as ordinary source.

> [!WARNING]
> Forgetting the `export` keyword turns the file into a module implementation unit; nothing will be visible to importers even if you write `export` on symbols.

### Step 2 — Selective export replaces header declarations
Only entities marked `export` cross the module boundary.

```cpp
export int add(int a, int b);
int hidden_helper(int x);   // not exported
```
The second declaration is reachable inside the module but invisible after `import math;`.

### Step 3 — Import replaces textual inclusion
Clients write:

```cpp
import math;
int x = add(2, 3);
```
No preprocessor expansion occurs; the compiler loads the module’s compiled interface.

### Step 4 — Macros do not leak
Because modules are not preprocessed text, a macro defined inside a module never affects the importer. This is the formal guarantee that finally removes the “macro hygiene” problem.

### Step 5 — Module partitions allow large interfaces
A primary module interface may delegate parts to partitions:

```cpp
export module math:vector;
export import :vector;   // re-export
```
Partitions still belong to the same module name, preserving the single import surface.

### Step 6 — The compiled interface is the new contract
After the first successful compilation the build system records a dependency on the binary module interface. Changing an exported signature forces recompilation of all importers; changing a non-exported entity does not.

### Step 7 — Textbook-grade statement
A module unit is a translation unit whose first declaration is a *module-declaration*. An *export-declaration* grants external linkage and module linkage to its declared entities. An *import-declaration* makes the exported entities of another module visible by name lookup inside the current translation unit. (Working Draft N4950, §10.3–10.5)

## 5. Worked examples — har step show karo

**Example 1 — Minimal module**  
*Given:* a single function that should be reusable.  
*Find:* correct module syntax.  
Step 1: create `math.cppm`  
```cpp
export module math;
export int add(int a, int b) { return a + b; }
```  
*Why:* the first line registers the module name; `export` makes `add` visible.  
Final answer:  
```cpp
import math;
int main() { return add(1, 2); }
```
*Reflection:* the example is trivial yet already demonstrates zero macro leakage.

**Example 2 — Non-exported helper**  
*Given:* an internal function used only inside the module.  
*Find:* whether it pollutes importers.  
Step 1: add  
```cpp
int detail(int x) { return x * 2; }
export int twice(int x) { return detail(x); }
```  
*Why:* `detail` has module linkage only.  
Final answer: importers see only `twice`.

**Example 3 — Partition**  
*Given:* a large module split across files.  
*Find:* how to keep one import name.  
Step 1: `math.cppm` contains  
```cpp
export module math;
export import :add;
```  
Step 2: `math-add.cppm` contains  
```cpp
export module math:add;
export int add(int a, int b);
```  
*Why:* both files share the module name `math`.  
Final answer: client still writes `import math;`.

**Example 4 — Header migration**  
*Given:* legacy header `vec.h`.  
*Find:* minimal module wrapper.  
Step 1: wrap  
```cpp
export module vec;
export {
#include "vec.h"
}
```  
*Why:* the export block re-exports every declaration from the header while still preventing macro leakage from inside `vec.h`.  
Final answer: existing code using the header symbols now imports the module.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Writing `module math;` instead of `export module math;` | Confusing interface with implementation     | Always start an interface unit with `export module` |
| Expecting macros to be exported | Old mental model of headers                 | Never rely on macros crossing module boundaries |
| Forgetting to list .cppm files to the compiler | Build systems still default to classic mode | Add explicit module-interface rules in CMake / build2 |
| Circular module imports     | Modules are not preprocessed text           | Design acyclic dependency graphs             |
| Using `export using namespace` | Brings every name into the module interface | Prefer explicit `export` declarations        |
| Mixing `import` and `#include` of the same header | Creates two copies of the same declarations | Choose one inclusion style per library       |

## 7. The textbook-precise statement
A module unit is a translation unit that begins with a *module-declaration* of the form `export_opt module module-name module-partition_opt ;`. An entity declared at namespace scope with the *export-specifier* `export` obtains module linkage and is reachable after an *import-declaration* naming its module. No macro defined inside a module is visible to any importer. (ISO/IEC 14882:2020, §10.3–10.5; Working Draft N4950 §10.2)

## 8. Visual — diagram or schematic
```
[math.cppm]          -->  compiler  -->  math.pcm
   export module math;
   export int add();

[client.cpp]         -->  compiler (reads math.pcm)  -->  client.o
   import math;
   add(1,2);
```
No textual inclusion arrow exists between the two source files.

## 9. The memory technique
1. **The hook** — picture a vault door labelled “math”; only symbols stamped `export` are allowed to leave the vault.
2. **What to overlearn** — the exact two-line skeleton `export module M;` followed by `export entity;` and the import line `import M;`.
3. **Spaced-repetition schedule** — review the skeleton after 1 day, 3 days, 7 days, 16 days, 35 days while writing one new module each time.
4. **First-principles fallback** — if syntax is forgotten, ask “what must the compiler know without seeing source text?” → the answer is the module declaration plus explicit exports.

## 10. What this unlocks
Modules are the foundation for a sane package ecosystem and for future reflection and metaprogramming facilities.  
- Next: module partitions for large libraries  
- Next: `import std;` (C++23) replaces `#include <iostream>`  
- Next: build-system module scanners in CMake 3.28+ and Ninja

## 11. Self-check — five questions, no answers
1. What single keyword distinguishes a module interface unit from an implementation unit?  
2. Can a macro defined inside a module affect code that imports it?  
3. Write the shortest legal module that exports a constant `pi`.  
4. Explain why changing a non-exported function inside a module does not force recompilation of its importers.  
5. Identify the bug: a module `A` imports `B` while `B` imports `A`.