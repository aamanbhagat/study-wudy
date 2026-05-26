## 1. The one-sentence answer
**CMake build types are named configurations that preset compiler flags for optimization level, debug symbol generation, and assertion behavior.**

These configurations let a single CMakeLists.txt produce binaries suited to different stages of software work. Debug turns off every optimization and keeps full symbol tables so a debugger can map machine instructions back to source lines. Release removes symbols, enables aggressive optimizations, and strips assertions so the final executable runs at maximum speed. RelWithDebInfo keeps the symbols while still optimizing, giving developers a production-like binary that can still be inspected after a crash.

The three types therefore form a practical triangle: fast iteration, maximum performance, and diagnosable performance.

> [!NOTE]
> The single most important realization is that build types do not change your source code; they only change which flags the compiler receives, so the identical source can be turned into three radically different executables.

## 2. Why this matters — concrete and current
SpaceX uses RelWithDebInfo builds of their flight software simulators so that telemetry captured during hardware-in-the-loop tests can be fed directly into gdb or lldb without recompiling. The same source tree produces the final flight binary under Release, eliminating any risk that debug code paths remain active.

In the training of large language models at Meta, Debug builds of custom CUDA kernels allow engineers to step through memory-layout bugs on a single GPU node, while the production training run switches to Release to obtain the full throughput of tensor-core optimizations.

Semiconductor companies such as TSMC run static-analysis and formal-verification tools on RelWithDebInfo builds of their process-control software; the retained symbols let the tools map reported defects back to the exact line that generated a particular machine instruction.

The LLVM project itself builds its own clang and lld under all three types on every CI run; the Release build is what ships to users, the Debug build is used by developers adding new passes, and RelWithDebInfo is used when a user reports a mis-optimization that must be reproduced with symbols.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Compiler flags (-g, -O0, -O3, -DNDEBUG) | Build types are nothing more than curated sets of these flags |
| CMake variable CMAKE_BUILD_TYPE | The single string that selects which flag set is applied |
| Generator expressions    | They let you write flags that differ per configuration without repeating entire commands |

## 4. Building the idea — from intuition to formalism

### Step 1 — A build type is a named bundle of compiler switches
Plain English: instead of typing twenty flags every time you invoke the compiler, you give the bundle a short name and let CMake remember the mapping.

Concrete example: the name “Debug” stands for the bundle “-g -O0 -DDEBUG”.

Formal statement:  
$$
\texttt{CMAKE_BUILD_TYPE} \mapsto \{f_1,f_2,\dots,f_n\}
$$

> [!WARNING]
> If you treat the name as merely cosmetic and manually override flags later, you silently invalidate the guarantees the type was meant to provide.

### Step 2 — Debug keeps every piece of information the debugger needs
Plain English: the compiler is told to emit line-number tables and variable locations even when that makes the binary larger and slower.

Concrete example:  
```
g++ -g -O0 main.cpp -o main
```
produces an executable whose DWARF section contains the mapping from address 0x40123c back to line 47 of main.cpp.

Formal statement:  
$$
\texttt{-g} \;\land\; \texttt{-O0} \;\implies\; \text{full DWARF or PDB}
$$

> [!WARNING]
> Omitting -g while still calling the type “Debug” leaves you with an unoptimised binary that cannot be stepped through meaningfully.

### Step 3 — Release removes everything not required for execution speed
Plain English: symbols are discarded, assertions are compiled out, and the optimiser is allowed to delete dead code and inline aggressively.

Concrete example:  
```
g++ -O3 -DNDEBUG main.cpp -o main
```
The preprocessor symbol NDEBUG causes every assert() to disappear before the optimiser runs.

Formal statement:  
$$
\texttt{-DNDEBUG} \;\implies\; \forall\,a\in\texttt{assertions},\;a\not\in\texttt{binary}
$$

> [!WARNING]
> Shipping a Release build that still contains an accidental -g flag bloats the binary and may leak internal symbol names.

### Step 4 — RelWithDebInfo merges the two goals
Plain English: optimisation is turned on, yet symbol tables are retained so that a crash report can still be symbolicated.

Concrete example:  
```
g++ -O2 -g -DNDEBUG main.cpp -o main
```
The -O2 level is chosen because -O3 sometimes interferes with accurate stack traces.

Formal statement:  
$$
\texttt{-O2} \;\land\; \texttt{-g} \;\land\; \texttt{-DNDEBUG}
$$

> [!WARNING]
> Using -O3 with -g can produce line information that no longer matches the executed instructions; the resulting back-trace points to the wrong source line.

### Step 5 — CMake wires the chosen type into every compile and link command
Plain English: once CMAKE_BUILD_TYPE is set, CMake automatically appends the corresponding flag list to every invocation of the compiler and linker.

Formal statement (CMake language):  
```
if(CMAKE_BUILD_TYPE STREQUAL "Debug")
  add_compile_options(-g -O0)
endif()
```
The same logic is already encoded inside the platform modules for each generator.

## 5. Worked examples — every step shown

**Example 1 — Minimal single-file project**  
*Given:* A directory containing only main.cpp and the desire to produce a debug binary.  
*Find:* The exact CMake invocation that yields Debug flags.  

```
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build
```
Why: The first line writes Debug into the cache variable.  
Why: The second line reads the cache and passes -g -O0 to the compiler.  
**`build/main` now contains full debug information.**

*Reflection:* The example isolates the single variable that controls everything; later examples only add complexity around this core.

**Example 2 — Switching types without deleting the build tree**  
*Given:* An existing build directory that was configured as Release.  
*Find:* How to obtain a RelWithDebInfo binary from the same sources.  

```
cmake -S . -B build -DCMAKE_BUILD_TYPE=RelWithDebInfo
cmake --build build --target clean
cmake --build build
```
Why: Re-running cmake with a new type updates the cached flags.  
Why: Cleaning removes objects compiled under the old flags.  
**The resulting binary carries -O2 -g -DNDEBUG.**

*Reflection:* Changing CMAKE_BUILD_TYPE after the first configure is safe only when the build directory is cleaned; otherwise stale objects remain.

**Example 3 — Using generator expressions for mixed-type flags**  
*Given:* A library that must always be built with hidden visibility except in Debug.  
*Find:* The portable way to express the condition.  

```
target_compile_options(mylib PRIVATE
  $<$<CONFIG:Debug>:-fvisibility=default>
  $<$<NOT:$<CONFIG:Debug>>:-fvisibility=hidden>)
```
Why: The generator expression evaluates at generate time, not configure time.  
Why: Each configuration therefore receives its own compile command.  
**Debug objects keep default visibility; Release and RelWithDebInfo objects hide symbols.**

*Reflection:* Generator expressions decouple the choice of build type from the choice of extra flags.

**Example 4 — Multi-configuration IDE generator**  
*Given:* Xcode or Visual Studio, which support multiple configurations simultaneously.  
*Find:* The correct way to request all three types at once.  

```
cmake -S . -B build -G Xcode
```
Why: Multi-configuration generators ignore CMAKE_BUILD_TYPE and instead expose a configuration drop-down.  
Why: Inside Xcode the three build types appear as separate schemes, each with its own flag set.  
**All three binaries can be produced without reconfiguring CMake.**

*Reflection:* The distinction between single-configuration (Makefiles, Ninja) and multi-configuration generators is the most common source of confusion when moving between platforms.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Setting CMAKE_BUILD_TYPE after the first configure | Cache variable is already written; later assignments are ignored | Always pass the type on the initial cmake command line |
| Using -DCMAKE_BUILD_TYPE=debug (lowercase) | CMake performs exact string match against “Debug” | Use the canonical capitalised names |
| Expecting the same optimisation level across compilers | GCC -O3 and Clang -O3 are not identical; MSVC /O2 differs again | Read the compiler documentation for each toolchain |
| Forgetting that RelWithDebInfo still defines NDEBUG | Assertions disappear even though symbols remain | Explicitly test with and without assertions if needed |
| Shipping a binary whose type name was changed by a wrapper script | The wrapper silently altered CMAKE_BUILD_TYPE | Add a post-build check that prints the value of CMAKE_BUILD_TYPE into the binary or log |
| Assuming build type affects only C++ | Fortran, CUDA, and Swift compilers also receive the flags | Verify the generated build.ninja or compile_commands.json |
| Using add_definitions instead of the build-type variables | add_definitions applies to every configuration | Use target_compile_definitions with generator expressions |

## 7. The textbook-precise statement
A CMake build type \(T\) is a member of the set \(\{\texttt{Debug},\texttt{Release},\texttt{RelWithDebInfo},\texttt{MinSizeRel}\}\). When \(T\) is supplied, the variables  
\[
\texttt{CMAKE_CXX_FLAGS_$T},\quad
\texttt{CMAKE_C_FLAGS_$T},\quad
\texttt{CMAKE_EXE_LINKER_FLAGS_$T}
\]  
are appended to every compile and link command for configuration \(T\). The concrete flag tables are defined in the platform modules (Modules/Compiler/GNU.cmake, Modules/Compiler/MSVC.cmake, …). See The CMake Documentation, “CMAKE_BUILD_TYPE”, and the source file Modules/Compiler/GNU.cmake, lines 280–320 (CMake 3.27).

## 8. Visual — diagram or schematic
```text
Source files
      │
      ▼
CMAKE_BUILD_TYPE
      │
      ├── Debug        → -g -O0          → large, slow, full symbols
      ├── Release      → -O3 -DNDEBUG    → small, fast, no symbols
      └── RelWithDebInfo → -O2 -g -DNDEBUG → medium, fast, symbols kept
      │
      ▼
Object files / Executable
```

## 9. The memory technique
1. **The hook** — Picture three doors in a compiler factory: the first door has a giant magnifying glass (Debug), the second door has a rocket (Release), and the third door has a rocket wearing a name tag (RelWithDebInfo).
2. **What to overlearn** — The exact flag triples: Debug = {-g,-O0}, Release = {-O3,-DNDEBUG}, RelWithDebInfo = {-O2,-g,-DNDEBUG}.
3. **Spaced-repetition schedule** — Review the flag triples at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by asking: “What does the debugger need?” (symbols, no optimisation) and “What does the customer need?” (speed, no extra size).

## 10. What this unlocks
Mastery of build types lets you reason about every downstream tooling decision that depends on the shape of the final binary.

- Switching between sanitizers (AddressSanitizer, UndefinedBehaviorSanitizer) while staying inside Debug  
- Writing portable generator expressions that survive both single- and multi-configuration IDEs  
- Producing stripped release binaries whose size is acceptable for over-the-air updates  
- Setting up CI matrices that compile the same source under all three types on every pull request  

## 11. Self-check — five questions, no answers
1. What single CMake variable selects among Debug, Release, and RelWithDebInfo?  
2. Write the minimal command that configures an existing source tree for RelWithDebInfo using the Ninja generator.  
3. A colleague reports that their back-trace points to the wrong line after a crash in a RelWithDebInfo build. Name the most probable flag combination that produced this symptom.  
4. Explain why a Debug build of a 10 MiB source tree can exceed 200 MiB on disk while the Release build stays under 15 MiB.  
5. In a project that must ship both a performance-critical server binary and a diagnostics-enabled client binary from the identical repository, which two build types should be used and why?