## 1. The one-sentence answer
**CMakeLists.txt declares build targets and their relationships so that CMake can emit platform-specific build files.**

A project begins as a collection of source files. Without a description of which files become executables, which become libraries, and how those pieces depend on one another, no compiler or linker can be invoked correctly across operating systems. CMakeLists.txt supplies that description using three core commands: `add_executable` creates a runnable binary target, `add_library` creates a reusable archive or shared object target, and `target_link_libraries` records that one target must be linked against another.

The file is read once, top to bottom, by the CMake configuration stage. Each command registers an object in an internal directed graph; later stages traverse the graph to emit Makefiles, Visual Studio projects, or Ninja files. The resulting build system then performs the actual compilation and linking.

> [!NOTE]
> The decisive insight is that CMake never compiles anything itself; it only records a dependency graph that later tools traverse, so every `add_*` and `target_link_libraries` call is merely an edge or node registration.

## 2. Why this matters — concrete and current
LLVM’s build system uses a top-level CMakeLists.txt together with hundreds of `add_library` calls to produce the modular `libLLVM*.a` archives that Clang,lld, and MLIR all consume; changing a single library’s dependencies immediately propagates through `target_link_libraries` to every downstream tool.

TensorFlow’s CMake configuration defines the `tensorflow_cc` shared library via `add_library` and then wires it to GPU kernels and Python bindings through repeated `target_link_libraries` invocations; this single graph allows the same source tree to produce both CPU-only and CUDA-enabled wheels on Linux, macOS, and Windows.

NASA’s Core Flight System (cFS) employs CMake to build the flight software that runs on the International Space Station; each subsystem is an `add_library` target, and `target_link_libraries` ensures that the time-service library is linked before the command-ingest executable, satisfying strict real-time linking order requirements.

The Android NDK’s build tooling generates CMake files on the fly that call `add_executable` for each native binary inside an APK; the resulting dependency edges are what allow Gradle to invoke the correct cross-compiler and strip symbols without manual makefile maintenance.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| C/C++ translation units and object files | `add_executable` and `add_library` ultimately emit compiler invocations over these units. |
| Static versus shared library semantics | `add_library` must know whether to produce `.a`/`.lib` or `.so`/`.dll` artifacts. |
| Linker symbol resolution order | `target_link_libraries` records directed edges that the linker will traverse; incorrect order produces unresolved-symbol errors. |
| Directory scope and variable visibility | CMake variables and targets are visible only after the `add_subdirectory` or `include` that defines them. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A target is a named collection of sources
A build system must know which source files belong together. The command `add_executable(myapp main.cpp utils.cpp)` registers a target named `myapp` whose sources are exactly those two files.

```
add_executable(myapp main.cpp utils.cpp)
```
The formal effect is the insertion of a node into CMake’s internal target graph:
$$
T_{\text{myapp}} \leftarrow \{\text{main.cpp},\text{utils.cpp}\}
$$

> [!WARNING]
> Omitting a required source file here silently produces an incomplete object list; the linker later fails with missing symbols that are hard to trace back to this registration step.

### Step 2 — Libraries are targets too
Reusable code is packaged by `add_library(mylib STATIC utils.cpp)`. The keyword `STATIC` or `SHARED` decides the artifact type, but the target name `mylib` remains the handle used everywhere else.

$$
T_{\text{mylib}} \leftarrow \{\text{STATIC},\text{utils.cpp}\}
$$

> [!WARNING]
> Using the same target name for both an executable and a library in the same directory produces a CMake configuration error; names must be globally unique within a build.

### Step 3 — Linking records a directed dependency
`target_link_libraries(myapp PRIVATE mylib)` adds a directed edge stating that the executable must be linked against the library. The `PRIVATE` keyword controls whether that edge is re-exported to further dependents.

$$
E(T_{\text{myapp}},T_{\text{mylib}},\text{PRIVATE})
$$

> [!WARNING]
> Placing `target_link_libraries` before the corresponding `add_library` call is accepted by CMake yet leaves the edge pointing to a non-existent target; generation succeeds but linking fails at build time.

### Step 4 — Propagation of include directories and compile options
Each `target_link_libraries` edge also carries usage requirements. When `mylib` declares `target_include_directories(mylib PUBLIC include/)`, every target that links to it inherits that path automatically.

$$
\text{UsageReq}(T_{\text{mylib}}) = \{\text{include/}\}
$$

> [!WARNING]
> Declaring an include directory as `PRIVATE` when it should be `PUBLIC` produces “file not found” errors in downstream targets that are difficult to debug because the error appears far from the original declaration.

### Step 5 — The generated build graph is acyclic
CMake rejects cycles in the target dependency graph. The final formal object is therefore a directed acyclic graph whose nodes are targets and whose edges are the recorded `target_link_libraries` relations.

$$
G = (V_T,E_{\text{link}}) \quad\text{with}\quad \nexists\text{ cycle in }G
$$

## 5. Worked examples — every step shown

**Example 1 — Minimal executable**
*Given:* A directory containing only `main.cpp`.
*Find:* The CMakeLists.txt that produces an executable named `hello`.
```
cmake_minimum_required(VERSION 3.20)
project(Hello)
add_executable(hello main.cpp)
```
*Why* the first line sets policy version.  
*Why* the second line creates a project name used for default variables.  
*Why* the third line registers the sole target.  
**hello**  
*Reflection:* The example isolates the single-node case; any later linking step builds directly on this registration.

**Example 2 — Static library consumed by executable**
*Given:* `math.cpp` and `app.cpp`.
*Find:* Two targets with a link edge.
```
add_library(math STATIC math.cpp)
add_executable(app app.cpp)
target_link_libraries(app PRIVATE math)
```
*Why* the library is declared first so the subsequent link command can reference it.  
*Why* `PRIVATE` prevents the math symbols from being re-exported if `app` itself becomes a library.  
**app linked against math**  
*Reflection:* The order of declaration plus the explicit edge shows how CMake’s graph is assembled incrementally.

**Example 3 — Shared library with public headers**
*Given:* A library that exports an include directory.
*Find:* Propagation to the consumer.
```
add_library(utils SHARED utils.cpp)
target_include_directories(utils PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/include)
add_executable(tool tool.cpp)
target_link_libraries(tool PRIVATE utils)
```
*Why* `PUBLIC` causes `tool` to receive the include path automatically.  
*Why* the generator expression is unnecessary here because the path is absolute at configuration time.  
**tool receives -I…/include at compile time**  
*Reflection:* Usage requirements travel across the link edge; this is the mechanism behind modern CMake’s “modern” target-based design.

**Example 4 — Multiple libraries with transitive linking**
*Given:* `core`, `net`, and an executable that needs both.
*Find:* A chain of two `target_link_libraries` calls.
```
add_library(core STATIC core.cpp)
add_library(net STATIC net.cpp)
target_link_libraries(net PRIVATE core)
add_executable(server server.cpp)
target_link_libraries(server PRIVATE net)
```
*Why* `net` privately links `core` so that `server` does not need an explicit edge to `core`.  
*Why* the final executable still receives `core`’s symbols because the static archive is merged.  
**server binary contains symbols from both net and core**  
*Reflection:* Transitivity of static linking versus visibility keywords demonstrates why careful choice of `PRIVATE`/`PUBLIC` matters at scale.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Calling `target_link_libraries` before the target exists | CMake performs only syntactic checks at that point | Always place `add_executable`/`add_library` before any `target_*` command that names the target |
| Using `include_directories` instead of `target_include_directories` | Old-style commands pollute the entire directory scope | Prefer per-target commands so usage requirements stay encapsulated |
| Forgetting `PUBLIC`/`PRIVATE`/`INTERFACE` keywords | CMake defaults to `PRIVATE` in newer policies, silently dropping propagation | Always write the keyword explicitly; treat omission as a compile-time error |
| Hard-coding output paths instead of using generator expressions | Paths differ between Visual Studio and Ninja generators | Use `$<TARGET_FILE:foo>` and similar expressions |
| Adding the same source file to multiple targets without `OBJECT` libraries | Duplicate compilation wastes time and can violate ODR | Extract common sources into an `OBJECT` library when appropriate |
| Placing `cmake_minimum_required` after `project` | Policy settings are applied too late | Keep `cmake_minimum_required` as the absolute first command |
| Linking system libraries with full paths instead of `find_package` | Breaks when the library moves or changes names | Always locate external dependencies via `find_package` and imported targets |

## 7. The textbook-precise statement
A CMakeLists.txt file is a sequence of commands that populate a directed acyclic graph \(G=(V,E)\) whose vertices \(V\) are targets created by `add_executable` or `add_library` and whose edges \(E\) are dependency relations installed by `target_link_libraries`. Each target \(t\in V\) carries a set of sources \(S(t)\), usage requirements \(U(t)\), and a visibility map for each edge. The configuration stage evaluates the script once, after which the generation stage emits build-system files whose rules correspond exactly to a topological traversal of \(G\). (CMake Documentation, “cmake-buildsystem(7)”, version 3.27.)

## 8. Visual — diagram or schematic
```text
          sources
             │
             ▼
   ┌─────────────────┐
   │ add_library     │◄──┐
   │   (core)        │   │ target_link_libraries
   └────────┬────────┘   │ (PRIVATE)
            │            │
            ▼            │
   ┌─────────────────┐   │
   │ add_executable  │◄──┘
   │   (app)         │
   └─────────────────┘
```
Nodes are targets; arrows are `target_link_libraries` edges. The build system later emits compiler and linker rules that follow the arrow directions.

## 9. The memory technique
**The hook** — Picture each target as a railway station; `target_link_libraries` draws the tracks that trains (the linker) must follow.

**What to overlearn** — The three command signatures exactly as written: `add_executable(name sources…)`, `add_library(name [STATIC|SHARED] sources…)`, `target_link_libraries(target PRIVATE|PUBLIC|INTERFACE other…)`.
**Spaced-repetition schedule** — Review the signatures at 1 day, 3 days, 7 days, 16 days, 35 days after first use.
**First-principles fallback** — Re-derive by asking: “Which files must the compiler see?” → `add_*`; “Which symbols must the linker resolve?” → `target_link_libraries`.

## 10. What this unlocks
Mastery of these three commands lets you express any single-machine C/C++ build as an explicit dependency graph that CMake can translate for every toolchain.

- Consuming `find_package` results as imported targets
- Creating object libraries and interface libraries
- Using generator expressions for per-config behaviour
- Writing install rules that respect the same graph (`install(TARGETS …)`)
- Transitioning to modern CMake’s target-centric paradigm used by all major open-source projects

## 11. Self-check — five questions, no answers
1. Write the shortest CMakeLists.txt that builds an executable from two source files residing in the same directory.
2. A library `A` must expose its headers to any target that links it, yet must keep an internal helper library `B` private. Show the two `target_*` commands required.
3. What single change turns the static library in Example 2 into a shared library, and what additional platform consideration appears?
4. Identify the latent defect: an executable links a library that itself links another library, yet the final link step reports unresolved symbols from the innermost library.
5. Explain why placing `target_include_directories` after `target_link_libraries` can still produce a correct build, yet is considered poor style.