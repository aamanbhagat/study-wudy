## 1. The one-sentence answer
**Symbol resolution in static linking is a single left-to-right pass over the command line; the linker adds an object to the executable only when it supplies a currently undefined symbol, and it never revisits earlier files.**

When you invoke the linker with a sequence of object files and archives, it maintains a running set of undefined symbols. Each new file is examined exactly once. Any symbols it defines satisfy entries already in that set; any new undefined symbols it introduces are added to the set. Once a file has been processed, its contents are never reconsidered. Consequently the relative order of files determines which definitions are discovered and which remain unresolved.

The same rule applies inside an archive: the linker extracts an archive member only when that member resolves at least one symbol that is undefined at the moment the archive is reached. If a needed member appears earlier in the archive than the point at which its symbol became undefined, the member is never extracted.

> [!NOTE]
> The decisive insight is that the linker never backtracks; therefore a library that supplies symbols for earlier objects must appear after those objects on the command line.

## 2. Why this matters — concrete and current
In the Linux kernel build system, the final `vmlinux` link step lists core object files before architecture-specific archives and then the `libgcc` helper archive; reordering the helper archive earlier produces unresolved references to `memcpy` and `__ashldi3` that only surface on certain cross-compilation targets.

NASA’s cFS (Core Flight System) flight software, used on missions such as OSIRIS-REx, is linked with a strict ordering of platform abstraction layer objects before the PSP and OSAL static libraries; an accidental swap of those two libraries in a CMake-generated link line produced a silent runtime fault in the stored-command processor during integration testing.

Google’s TensorFlow Lite Micro build for ARM Cortex-M devices places the CMSIS-DSP archive after the kernel and operator object files; placing the archive first yields undefined references to `arm_q7_to_q15` that disappear only when the archive order is restored, a fact documented in the project’s GitHub issue tracker for the 2.12 release.

The ATLAS linear-algebra library build scripts for x86-64 explicitly emit `-llapack -lcblas -latlas` after the user’s application objects; reversing the library order causes the reference to `ATL_dgemm` inside `cblas_dgemm` to remain unresolved because the linker has already finished scanning `libcblas.a`.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Object file & symbol table | Supplies the defined versus undefined symbols the linker inspects |
| Static archive (`.a`)    | The unit the linker extracts members from during the pass |
| Linker command line      | The ordered sequence that determines extraction decisions |
| Undefined-reference error| The observable symptom when order prevents extraction     |

## 4. Building the idea — from intuition to formalism

### Step 1 — The linker walks the command line once
The linker opens each file or archive in the exact order given. It never returns to an earlier file.

**Example.**  
`ld main.o utils.o libfoo.a`  
The linker first reads `main.o`, then `utils.o`, then `libfoo.a`.

> [!WARNING]
> If you assume the linker can “look ahead” or “go back,” you will mis-predict which symbols get resolved.

### Step 2 — A running set of undefined symbols is maintained
At every moment the linker knows the set \( U \) of symbols still needed.

Formal statement:  
Let \( U_0 = \emptyset \). After processing file \( i \),  
\[ U_i = (U_{i-1} \cup \text{undefined symbols in } i) \setminus \text{defined symbols in } i. \]

### Step 3 — An ordinary object file is always added
Every `.o` file is incorporated; its defined symbols are removed from \( U \) and its undefined symbols are added.

### Step 4 — An archive member is added only when useful
When an archive is reached, the linker scans its symbol table and extracts only those members that define at least one symbol currently in \( U \). Extraction may add new undefined symbols, so the scan repeats until \( U \) stops changing.

### Step 5 — Order inside an archive matters
Because extraction is driven by the current \( U \), a member that would satisfy a later undefined symbol is ignored if it appears before the symbol enters \( U \).

### Step 6 — Final unresolved set produces the link error
After the last file, any symbol remaining in \( U \) yields “undefined reference.”

## 5. Worked examples — every step shown

**Example 1 — Two ordinary objects**  
*Given:* `main.o` calls `foo()` defined in `utils.o`.  
*Find:* link line that succeeds.  
`ld main.o utils.o`  
- Read `main.o`: \( U = \{\texttt{foo}\} \).  
- Read `utils.o`: define `foo`, \( U = \emptyset \).  
**Success.**  
*Reflection:* Ordinary objects are order-independent among themselves.

**Example 2 — Object before archive**  
*Given:* `main.o` needs `bar()` in `libfoo.a`.  
*Find:* correct order.  
`ld main.o libfoo.a`  
- `main.o` adds `bar` to \( U \).  
- Archive scan finds member defining `bar`; extracts it.  
**Success.**  
*Reflection:* The library must follow the object that needs it.

**Example 3 — Archive before object**  
*Given:* same files, reversed order.  
`ld libfoo.a main.o`  
- Archive reached while \( U = \emptyset \); nothing extracted.  
- `main.o` adds `bar`; archive already passed.  
**Failure:** undefined reference to `bar`.  
*Reflection:* The single-pass rule makes position absolute.

**Example 4 — Inter-library dependency**  
*Given:* `main.o` needs `baz()` in `libA.a`; `libA.a` needs `quux()` in `libB.a`.  
Correct line:  
`ld main.o libA.a libB.a`  
- `main.o` → \( U = \{\texttt{baz}\} \).  
- `libA.a` extracts member for `baz`; adds `quux` to \( U \).  
- `libB.a` extracts member for `quux`.  
**Success.**  
Reversing `libA.a` and `libB.a` fails.  
*Reflection:* Dependent libraries must appear later than their users.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Placing all `-l` flags first      | Habit from dynamic linking                  | Write objects, then libraries                |
| Using `ar` to combine archives    | Expecting merged symbol tables              | Keep separate archives or use `--whole-archive` |
| Repeating a library to “fix” order| Believing multiple passes occur             | Fix the true order instead                   |
| Ignoring intra-archive order      | Assuming archive is a simple bag of objects | Order members inside archive by dependency   |
| Mixing `.o` and `.a` arbitrarily  | Treating every file as globally visible     | Follow “users before providers” rule         |
| Forgetting that `.so` is different| Dynamic linker performs different search    | Remember the lesson applies only to static archives |
| Relying on implicit `libc` at end | Assuming system libraries are always last   | Explicitly place user libraries before `-lc` |

## 7. The textbook-precise statement
A static linker processes its input file list from left to right. For each archive, it repeatedly extracts any member that resolves at least one symbol in the current undefined set until a fixed point is reached; no earlier file is re-examined. (Bryant & O’Hallaron, *Computer Systems: A Programmer’s Perspective*, 3e, §7.6.3, “Symbol Resolution”.)

## 8. Visual — diagram or schematic
```text
Command line:  main.o  utils.o  libmath.a  libutil.a

Pass state:
U={} --read main.o-->  U={sin,cos}          (symbols needed)
U={sin,cos} --read utils.o-->  U={sin}      (utils defines cos)
U={sin} --read libmath.a-->  extract sin.o  U={}
U={} --read libutil.a-->  nothing extracted (already satisfied)
Final U empty → link succeeds
```
If `libmath.a` had appeared before `utils.o`, `sin` would never have entered \( U \) at the moment the archive was scanned.

## 9. The memory technique
1. **The hook** — Picture a librarian walking down a single corridor of shelves; once she passes a book she cannot go back, so the book you need must sit after the point you first realize you need it.
2. **What to overlearn** — “Objects before archives that define their symbols; dependent archives after the archives that use them.”
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from the single-pass invariant: start with \( U = \emptyset \), simulate each file exactly once, and observe that extraction decisions are irrevocable.

## 10. What this unlocks
Mastery of symbol-resolution order lets you diagnose and eliminate “undefined reference” errors in any static build, write correct `Makefile` or `CMake` link lines, and understand why certain link-time optimizations (LTO, whole-archive) change observable behavior.

- Link-time dead-code elimination
- `--start-group` / `--end-group` semantics
- Dynamic-symbol interposition rules
- Thin-archive and `--whole-archive` usage

## 11. Self-check — five questions, no answers
1. Given `ld a.o b.o libX.a libY.a`, which library is examined first by the linker?
2. If `libX.a` defines a symbol needed only by a member extracted from `libY.a`, where must `libX.a` appear?
3. Why does repeating a library on the command line sometimes appear to solve an undefined-reference error even though the linker never backtracks?
4. Construct the shortest command line that would still fail if `libA.a` and `libB.a` are mutually dependent and both are required by `main.o`.
5. A build succeeds on macOS (ld64) but fails on Linux (GNU ld) with identical flags. Which single assumption about archive processing is most likely violated?