## 1. The one-sentence answer
**CMake uses a single CMakeLists.txt file to declare source files, create executables or libraries, and explicitly link them so the generated build system produces correct binaries without manual compiler invocations.**

CMakeLists.txt acts as the declarative blueprint. You list your C++ or C sources once, then call `add_executable` or `add_library` to tell CMake what artifacts to produce. The command `target_link_libraries` then records the dependency graph so that when you run the generated Makefile or Ninja file, the linker receives the right objects and libraries in the correct order. This removes the fragility of handwritten build scripts while keeping the description close to the actual code structure.

The three commands together form the minimal core of any CMake project: declaration of targets, specification of their sources, and resolution of their interdependencies. Once these are correct, CMake handles platform differences, compiler flags, and incremental rebuilds automatically.

> [!NOTE]
> The key insight is that CMake never compiles anything itself; it only writes build-system files. Therefore every `add_executable` and `target_link_libraries` call must be written so that the generated build graph is acyclic and complete—otherwise the final binary will be missing symbols or will rebuild unnecessarily.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover flight software uses CMake to assemble dozens of libraries for the RCE and Vision Compute Element; each instrument driver is built as a static library and linked only into the subsystems that need it, guaranteeing deterministic binary sizes under tight memory constraints.

Google’s TensorFlow Lite Micro build system relies on a small set of `add_library` and `target_link_libraries` statements to produce both the core runtime and architecture-specific kernels; changing a single line switches between CMSIS-NN and handwritten assembly backends without touching any Makefile.

The LLVM project’s monorepo CMake configuration declares over 150 libraries with `add_library` and then uses `target_link_libraries` with `$<BUILD_INTERFACE>` and `$<INSTALL_INTERFACE>` generator expressions so that the same source tree can be consumed both from a build directory and after installation.

Modern semiconductor EDA tools such as those from Synopsys and Cadence embed CMake as the user-facing build layer for custom verification plugins; an engineer adds a new checker by writing one `add_library` line and one `target_link_libraries` line against the vendor-provided interface library, after which the entire regression suite picks up the new plugin automatically.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| C/C++ translation units  | You must know which .cpp files become one translation unit so you can list them correctly inside `add_executable`. |
| Static vs shared linking | The choice between `STATIC` and `SHARED` in `add_library` changes symbol visibility and affects later `target_link_libraries` usage. |
| Linker symbol resolution | Understanding undefined-reference errors tells you when a `target_link_libraries` call is missing or ordered incorrectly. |
| Build-directory hygiene  | CMake separates source and build trees; you must run CMake from an out-of-source directory to avoid polluting the repository. |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Declare the project and minimum CMake version
A CMakeLists.txt begins with `cmake_minimum_required` and `project`. This line tells CMake which language features and policies the rest of the file may rely on.

Example:
```
cmake_minimum_required(VERSION 3.20)
project(MyApp LANGUAGES CXX)
```
The formal statement is that the minimum version policy must be satisfied before any target commands are executed; otherwise CMake aborts with a policy error.

> [!WARNING]
> Using a version older than 3.20 silently disables modern target-based linking, causing `target_link_libraries` to fall back to directory-scope variables that produce fragile builds.

### Step 2 — Create an executable target
`add_executable` registers a new build target and associates one or more source files with it. The target name becomes the base name of the final binary.

Formal statement:
```
add_executable(<target> [EXCLUDE_FROM_ALL] source1 [source2 ...])
```
The generated build graph now contains a node whose output is the executable.

### Step 3 — Create a library target
`add_library` works identically but produces either a static archive or a shared object. The choice is made by the second argument.

```
add_library(math STATIC src/add.cpp src/mul.cpp)
```
The resulting target can be consumed by other targets without exposing its internal sources.

### Step 4 — Record a dependency edge
`target_link_libraries` adds a directed edge from the consuming target to the providing target. CMake then propagates include directories, compile definitions, and link libraries automatically.

```
target_link_libraries(MyApp PRIVATE math)
```
The edge guarantees that the linker will see the symbols exported by `math` when it links `MyApp`.

### Step 5 — Enforce visibility and usage requirements
Modern CMake distinguishes `PRIVATE`, `PUBLIC`, and `INTERFACE` visibility. `PRIVATE` means the dependency is needed only for building the target; `PUBLIC` also propagates it to anything that links this target.

This final step yields a complete, composable dependency graph that CMake can linearize for any generator (Make, Ninja, Visual Studio).

## 5. Worked examples — har step show karo

**Example 1 — Minimal executable**
*Given:* A single `main.cpp`.
*Find:* CMakeLists.txt that produces `hello`.
```
cmake_minimum_required(VERSION 3.20)
project(Hello LANGUAGES CXX)
add_executable(hello main.cpp)
```
*Why:* The single `add_executable` line registers the translation unit and the default executable name.

**Final answer**
```
hello
```
*Reflection:* The example is trivial yet already demonstrates that CMake never needs an explicit compiler command; the target declaration is sufficient.

**Example 2 — Static library plus executable**
*Given:* `math/add.cpp`, `math/mul.cpp`, and `app/main.cpp`.
*Find:* Two targets with correct linking.
```
add_library(math STATIC math/add.cpp math/mul.cpp)
add_executable(app app/main.cpp)
target_link_libraries(app PRIVATE math)
```
*Why:* The library target must be created before the executable can reference it; the `PRIVATE` keyword prevents `math`’s sources from leaking into `app`’s usage requirements.

**Final answer**
```
app (linked against libmath.a)
```
*Reflection:* Separating library and executable targets makes incremental rebuilds precise—only changed translation units are recompiled.

**Example 3 — Shared library with public headers**
*Given:* A library that exports an include directory.
```
add_library(utils SHARED src/utils.cpp)
target_include_directories(utils PUBLIC include)
add_executable(tool tool.cpp)
target_link_libraries(tool PRIVATE utils)
```
*Why:* `PUBLIC` propagates the include directory so `tool.cpp` can `#include <utils.h>` without extra `-I` flags.

**Final answer**
```
tool (linked against libutils.so, header path automatic)
```
*Reflection:* Usage requirements eliminate fragile global `include_directories` calls.

**Example 4 — Multiple libraries with transitive linking**
*Given:* `core`, `net`, and `app` where `app` needs `net` and `net` needs `core`.
```
add_library(core STATIC core.cpp)
add_library(net STATIC net.cpp)
target_link_libraries(net PRIVATE core)
add_executable(app app.cpp)
target_link_libraries(app PRIVATE net)
```
*Why:* CMake automatically expands the chain; the linker receives `net` then `core` without the user writing both edges.

**Final answer**
```
app (linked net → core)
```
*Reflection:* Transitive propagation scales to hundreds of libraries without manual ordering.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting `target_link_libraries` after `add_executable` | Students assume sources are enough; linker later reports undefined references. | Always add the link line immediately after creating the target. |
| Using directory-scope `include_directories` instead of `target_include_directories` | Old tutorials still show the global command; it pollutes every target. | Prefer per-target commands with `PUBLIC`/`PRIVATE`. |
| Placing `add_subdirectory` after target creation | Targets defined in a subdirectory are not yet visible. | Put `add_subdirectory` early, before any target that consumes those subdirectories. |
| Naming an executable the same as a library | On Windows the `.exe` and `.lib` collide in the same directory. | Use distinct logical names or set `OUTPUT_NAME`. |
| Linking a `SHARED` library with `PRIVATE` when its headers are needed by dependents | The include directories are not propagated. | Use `PUBLIC` for any library whose headers must be visible to consumers. |
| Running CMake inside the source tree | Generated files mix with committed sources and break version control. | Always create a separate build directory. |
| Circular `target_link_libraries` | Students model mutual dependencies without realizing the graph must be a DAG. | Refactor the design so that one library exposes only an interface the other consumes. |

## 7. The textbook-precise statement
From the official CMake 3.28 documentation (cmake-buildsystem(7), “Target Usage Requirements”):

> A target created by `add_executable` or `add_library` may be followed by calls to `target_link_libraries`, `target_include_directories`, and `target_compile_definitions`. Each such command augments the transitive closure of usage requirements that are applied to every target that links, directly or indirectly, to the original target. The signature `target_link_libraries(<target> <PRIVATE|PUBLIC|INTERFACE> <item>...)` records a directed dependency edge whose visibility controls whether the item’s usage requirements are exported.

All hypotheses are explicit: the target must already exist, the items may be target names or plain library names, and the build graph must remain acyclic.

## 8. Visual — diagram or schematic
```text
CMakeLists.txt
      │
      ├── add_executable(app main.cpp)
      │         │
      │         └── target_link_libraries(app → net)
      │
      ├── add_library(net net.cpp)
      │         │
      │         └── target_link_libraries(net → core)
      │
      └── add_library(core core.cpp)
```
Arrows show the directed `target_link_libraries` edges that CMake uses to order the final link line.

## 9. The memory technique

**The hook**  
Picture CMakeLists.txt as the blueprint of a small factory: `add_executable` is the final assembly line, `add_library` is each sub-assembly station, and `target_link_libraries` is the conveyor belt that moves parts between stations.

**What to overlearn**  
- Every target must be created before any other target can link to it.  
- Visibility keywords (`PRIVATE`/`PUBLIC`/`INTERFACE`) are part of the signature, not optional decoration.  
- The generated build system is only as good as the dependency graph you declared.

**Spaced-repetition schedule**  
Review the three core commands after 1 day, 3 days, 7 days, 16 days, and 35 days by writing a fresh two-library project from memory each time.

**First-principles fallback**  
If you forget the syntax, remember the intent: “I need an artifact (executable or library) that contains these sources and must be linked against these other artifacts.” Translate that sentence directly into the three commands.

## 10. What this unlocks
With these three commands mastered you can now consume external packages via `find_package`, create install rules, generate export sets, and scale to multi-megabyte codebases that still build in seconds with Ninja.

- Next topics: `target_include_directories`, generator expressions, `FetchContent`, and cross-compilation toolchains.
- Later: writing custom commands, integrating with CTest and CPack, and producing multi-config builds for Debug/Release.

## 11. Self-check — five questions, no answers
1. What happens if you call `target_link_libraries` before the corresponding `add_library`?
2. Why does using `PUBLIC` on a link to a large third-party library increase compile time for every downstream target?
3. Write the minimal CMakeLists.txt that builds a shared library `foo` from `foo.cpp` and links it into an executable `bar` that lives in a sibling directory.
4. A colleague’s build succeeds on Linux but fails on Windows with “unresolved external symbol”. Which visibility keyword is most likely missing?
5. Construct a three-target diamond dependency graph (A→B, A→C, B→D, C→D) and write the exact `target_link_libraries` calls that keep the final link line free of duplicate symbols.