## 1. The one-sentence answer
**C++20 modules replace the textual-inclusion model of headers with a compiled, encapsulated unit that exports a precisely controlled interface.**

The traditional `#include` directive pastes the contents of a header into every translation unit that requests it. This creates repeated parsing, macro leakage, and fragile ordering constraints. Modules instead treat a source file as a distinct, precompiled artifact whose exported names are made visible only through an explicit `import` declaration.

Because the compiler sees the module once and records its interface in a binary module interface file, subsequent imports become lookups rather than re-parsing. The resulting program therefore compiles faster, carries fewer accidental dependencies, and obeys ordinary identifier lookup rules instead of preprocessor substitution.

> [!NOTE]
> The decisive mental shift is from “text that gets copied” to “a compiled contract that is looked up,” which eliminates the need for include guards and makes macro hygiene the default rather than an extra discipline.

## 2. Why this matters — concrete and current
Microsoft’s Visual Studio compiler and build system adopted modules for the STL and for large internal codebases; the change removed thousands of lines of include guards and reduced clean-build times by roughly 30 % on the MSVC team’s own measurements.

Game-engine vendors such as Epic (Unreal Engine 5) and Unity have begun converting core math and rendering headers into modules so that incremental builds of shader pipelines and physics subsystems finish in seconds rather than minutes on developer workstations.

High-energy-physics simulation frameworks at CERN (ROOT 7 and Geant4 prototypes) use modules to isolate template-heavy geometry libraries; the resulting reduction in symbol bloat improves link times on clusters that routinely produce binaries exceeding 500 MB.

Semiconductor EDA tools from Synopsys and Cadence incorporate C++20 modules inside their custom analysis engines; the explicit export lists make it feasible to ship pre-built module interfaces to customers without exposing internal macro or namespace details.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Translation unit         | Modules are compiled once per unit and then imported      |
| Declaration vs. definition | Exports must distinguish what is visible from what is implemented |
| Namespaces               | Modules interact with, but are not identical to, namespaces |
| Linkage                  | Module linkage rules replace the old ODR concerns         |

## 4. Building the idea — from intuition to formalism

### Step 1 — Textual inclusion is fragile
A header file is literally inserted by the preprocessor before any semantic analysis occurs.  
Example: two headers that both define a macro `MAX` produce different results depending on order.  
Formal statement: the program text after preprocessing is the concatenation of every included file, so macro definitions are global to the translation unit.  
> [!WARNING]  
> Subtle order-dependent macro expansions are invisible until a third header is added that changes the sequence.

### Step 2 — Modules are compiled units
A module is parsed and semantically analysed once; the compiler writes a binary module interface (BMI) that subsequent imports read directly.  
Example: `export module math;` produces `math.pcm` (or equivalent).  
Formal statement: the module declaration introduces a new program entity whose interface is represented by an implementation-defined binary format rather than source text.

### Step 3 — Export controls visibility
Only names declared with `export` are part of the module’s public interface.  
Example: `export int add(int,int);` makes `add` visible; an unexported helper remains hidden.  
Formal statement: the exported set of a module is exactly the set of declarations bearing the `export` specifier or appearing inside an `export { … }` block.

### Step 4 — Import is a declaration, not inclusion
`import math;` adds the exported names of module `math` to the current scope without textual substitution.  
Example: two modules may both export a name `pi`; the compiler reports ambiguity instead of silently taking the last macro definition.  
Formal statement: an import declaration injects a set of names into the current declarative region with module linkage.

### Step 5 — Global module fragment isolates legacy headers
Code before `module;` may contain `#include` directives that are not re-exported unless explicitly requested.  
Example:  
```cpp
module;
#include <vector>
export module m;
```
Formal statement: the global module fragment is the portion of a module unit prior to the module declaration; names from that fragment have no module linkage unless re-exported.

### Step 6 — Textbook statement of the result
A C++20 module is a named, compiled entity that exports a set of declarations; importing the module makes those declarations visible with module linkage, replacing textual inclusion for all new code.

## 5. Worked examples — every step shown

**Example 1 — Minimal module**  
*Given:* a single-file module that exports one function.  
*Find:* correct syntax and import.  
Step 1: write the module unit.  
```cpp
export module utils;
export int square(int x) { return x*x; }
```  
*Why:* the module declaration must appear first; `export` makes the function part of the interface.  
Step 2: import it.  
```cpp
import utils;
int main() { return square(3); }
```  
*Why:* `import` brings `square` into scope without any header.  
**square(3) == 9**

*Reflection:* The example shows that no include guard or `#pragma once` is required once modules are used.

**Example 2 — Partitioned module**  
*Given:* a module split into an interface and an internal partition.  
*Find:* syntax for `export import`.  
Step 1: primary interface.  
```cpp
export module graph;
export import :detail;
```
*Why:* re-exports everything that `:detail` exports.  
Step 2: partition implementation.  
```cpp
export module graph:detail;
export struct Node { int id; };
```
**Node becomes visible to importers of graph**

*Reflection:* Partitions allow internal factoring without exposing extra files to clients.

**Example 3 — Selective export block**  
*Given:* several names to export together.  
*Find:* compact syntax.  
```cpp
export module vec;
export {
    struct Vec2 { float x,y; };
    Vec2 operator+(Vec2,Vec2);
}
```
*Why:* the block exports every declaration inside it without repeating the keyword.  
**Vec2 and its operator+ are visible**

*Reflection:* The block form reduces visual noise when many related names must be exported.

**Example 4 — Mixing with legacy headers**  
*Given:* a module that must use an old header internally.  
*Find:* safe placement.  
```cpp
module;
#include <cmath>
export module trig;
export double sin_deg(double d) { return std::sin(d*3.14159/180); }
```
*Why:* everything before `module;` is the global fragment and is not automatically re-exported.  
**std::sin is available only inside the module**

*Reflection:* The global fragment is the only place legacy headers may appear without leaking macros.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                | How to avoid it                              |
|-----------------------------------|-----------------------------------------------|----------------------------------------------|
| Placing code before `module;`     | Habit from header files                       | Always start with `module;` or the global fragment |
| Forgetting `export` on a function | Expectation that everything in the file is exported | Use `export` on every public declaration or use an export block |
| Circular module imports           | Mutual dependence not detected by preprocessor | Design module graph as a DAG; use partitions for internal sharing |
| Re-exporting everything via `import` | Writing `import` instead of `export import` | Explicitly write `export import` when clients need the names |
| Using macros across module boundaries | Macros are still textual and do not respect module scope | Move macro definitions inside the global fragment only when unavoidable |
| Multiple definitions of the same module name | Two files both declare `export module m;` | Enforce a one-to-one mapping between module name and primary interface file |
| Importing the same module twice with different partitions | Belief that partitions are independent units | Import the primary module; partitions are reached only through it |

## 7. The textbook-precise statement
A *module unit* is a translation unit that begins with a *module declaration* of the form  
```cpp
[module-keyword] module-name [module-partition] ;
```  
An *exported declaration* is any declaration preceded by the *export* specifier or contained within an *export-declaration*. The set of all such declarations constitutes the *module interface*.  
An *import declaration* `import module-name;` makes the exported names of that module visible in the importing translation unit with module linkage (ISO C++20 [module.unit]/1 and [module.import]/2).  
Reference: ISO/IEC 14882:2020, clauses 10.1–10.3; Nicolai M. Josuttis, *C++20: The Complete Guide*, §17.

## 8. Visual — diagram or schematic
```text
File: math.cppm          BMI: math.pcm
+------------------+     +------------------+
| export module    | --> | exported: sin,   |
|   math;          |     |   cos, PI        |
| export double    |     | internal: impl() |
|   sin(double);   |     +------------------+
| ...              |
+------------------+

Consumer.cpp
import math;   // lookup in math.pcm, no reparse
double x = sin(0.5);
```

## 9. The memory technique
1. **The hook** — picture a shipping container whose manifest is printed on the outside; only the listed items may be taken out, and the container is opened only once by the port authority.  
2. **What to overlearn** — the three keywords `export module`, `import`, and `export import`; the fact that `module;` must be the first token unless a global fragment is required.  
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — if you forget the syntax, start from the problem “I need a compiled unit instead of copied text,” then place the module declaration first and mark every public name with `export`.

## 10. What this unlocks
Modules are the foundation for faster builds, cleaner library interfaces, and future language features such as module-based reflection and improved tooling.  

- Immediate next topics: module partitions and internal partitions, module implementation units, header units (`import <vector>;`).  
- Later topics: build-system integration (CMake, Ninja), module maps for large codebases, and migration of existing header-only libraries.

## 11. Self-check — five questions, no answers
1. Write the shortest legal module that exports a constant `PI`.  
2. Explain why placing `#include <iostream>` after `export module m;` is ill-formed.  
3. A module `A` imports `B`; `B` imports `A`. What diagnostic must the compiler produce?  
4. Convert the following header into a module, preserving exactly the same public interface:  
   ```cpp
   #ifndef VEC_H
   #define VEC_H
   struct Vec { int x,y; };
   #endif
   ```  
5. In a single translation unit, both `import math;` and `import math:detail;` appear. Is this valid? If not, why?