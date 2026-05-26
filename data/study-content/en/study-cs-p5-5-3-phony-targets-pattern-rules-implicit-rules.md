## 1. The one-sentence answer
**Phony targets, pattern rules, and implicit rules are the three mechanisms in Make that separate declared actions from filesystem artifacts, generalize transformation rules across filename patterns, and supply a library of built-in transformations.**

A target declared with `.PHONY` tells Make that the name represents an action, not a file that might exist on disk; Make therefore always executes its recipe even when a file of that name is present. Pattern rules extend this idea by letting a single recipe describe how any file matching a stem and suffix is produced from another file sharing the same stem, written with the `%` wildcard. Implicit rules are the set of pattern rules and suffix rules that Make already knows; they fire automatically when no explicit rule matches a target.

These three features together let a Makefile remain short while correctly rebuilding only what has changed. Without them every transformation would have to be written out explicitly for every concrete file, destroying both maintainability and incrementality.

> [!NOTE]
> The decisive insight is that Make’s dependency graph is fundamentally a graph of *files*, so any behaviour that is not a file (cleaning, testing, installing) or that applies uniformly to many files must be expressed by overriding or extending that file-centric model.

## 2. Why this matters — concrete and current
The Linux kernel build system uses hundreds of phony targets (`clean`, `modules`, `defconfig`) and thousands of pattern rules to compile architecture-specific object files from C sources while still allowing a developer to type `make bzImage` and obtain only the changed artifacts.

Google’s Bazel migration of internal C++ code still emits Makefiles for legacy toolchains; those generated files rely on implicit rules for `.c` → `.o` compilation so that the generated scripts remain compact and portable across different GCC versions.

NASA’s James Webb Space Telescope ground-system software is built with a Make-based harness that declares `test`, `lint`, and `deploy` as phony targets; this guarantees that radiation-hardened verification scripts always run regardless of stray files left by previous builds.

Modern semiconductor EDA flows at TSMC and Intel use pattern rules inside hierarchical Makefiles to transform RTL Verilog into gate-level netlists for every block; implicit rules for `.v` → `.vg` keep the top-level orchestration under a few hundred lines while supporting thousands of parallel synthesis jobs.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Make target / prerequisite / recipe | The entire discussion is an elaboration of how these three fields interact. |
| File timestamp comparison | Make’s decision to rebuild rests on mtime; phony targets deliberately subvert that test. |
| Stem and suffix in filenames | Pattern rules match and substitute stems; without this vocabulary the `%` syntax is meaningless. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Targets are names, not necessarily files
Make treats every target as a potential file whose existence and timestamp determine whether its recipe runs. When a target name is chosen only for its side-effects, the file-centric test becomes incorrect.

A developer writes `clean: rm -rf *.o` and later creates a directory named `clean`; Make now believes the target is up-to-date.

Formally, for a target \(T\) with recipe \(R\), Make executes \(R\) if and only if \(T\) does not exist or any prerequisite is newer than \(T\).

> [!WARNING]
> Forgetting that existence of a file named \(T\) short-circuits execution is the most common reason “clean” silently does nothing.

### Step 2 — Declaring a target phony removes the file test
The special target `.PHONY` lists names that must always be considered out-of-date. Make therefore bypasses the filesystem lookup for those names.

```make
.PHONY: clean
clean:
	rm -rf *.o
```

The declaration forces the recipe to run even when `clean` exists as a file or directory.

### Step 3 — Pattern rules generalise the transformation
A pattern rule uses `%` to capture a stem that appears in both target and prerequisite. The same recipe therefore applies to every concrete filename that matches the pattern.

```make
%.o: %.c
	$(CC) -c $< -o $@
```

The stem `%` matches any sequence of characters; Make substitutes the matched stem into every occurrence of `%` on both sides.

### Step 4 — Implicit rules are the built-in pattern library
Make contains a catalogue of pattern rules and old-style suffix rules that are present even when the Makefile contains no explicit rule for a given suffix pair. When no user rule matches, Make searches this catalogue.

The rule `%.o: %.c` shown above is actually an implicit rule; a completely empty Makefile will still compile `foo.c` into `foo.o` when `make foo.o` is invoked.

### Step 5 — Combining phony, pattern, and implicit rules
A Makefile may mark a target phony, use a pattern rule to define its prerequisites, and rely on implicit rules to build those prerequisites. The three mechanisms compose without conflict because phony status is a property of the target name while pattern matching operates on the prerequisite graph.

### Step 6 — Formal statement of the combined rule set
Let \(P\) be the set of phony targets, \(R\) the set of explicit and implicit pattern rules, and \(G\) the dependency graph. Make computes a topological order of \(G\) and, for every node \(n \notin P\), applies the mtime test; for every node \(n \in P\), it unconditionally executes the recipe selected from \(R\).

## 5. Worked examples — every step shown

**Example 1 — Minimal phony target**
- *Given:* A Makefile containing only `clean: rm -rf *.o`.
- *Find:* Behaviour when a directory named `clean` already exists.
- Create the directory: `mkdir clean`.
- Run `make clean`.
- Make sees that `clean` exists and has no prerequisites newer than itself, so it reports “Nothing to be done”.
- Add `.PHONY: clean` and repeat.
- Make now ignores the directory and executes `rm -rf *.o`.
**`make` reports the recipe is executed.**
*Reflection:* The single line `.PHONY` changes Make’s internal “is-file-up-to-date” predicate; the same predicate is used for every target, so the fix generalises to any action target.

**Example 2 — Pattern rule for object files**
- *Given:* `foo.c` and `bar.c` and the rule `%.o: %.c`.
- *Find:* Commands Make issues for `make foo.o bar.o`.
- Make matches stem `foo` for the first target and stem `bar` for the second.
- It therefore executes `$(CC) -c foo.c -o foo.o` followed by the identical command for `bar`.
**Two separate compilations occur, each derived from the same pattern.**
*Reflection:* The stem substitution is purely textual; no semantic analysis of the C language occurs.

**Example 3 — Implicit rule with automatic variables**
- *Given:* An empty Makefile and a file `hello.c`.
- *Find:* Output of `make hello.o`.
- Make searches its built-in catalogue, finds the implicit rule `%.o: %.c`, and substitutes.
- It expands `$<` to `hello.c` and `$@` to `hello.o`.
**The compiler is invoked exactly as if an explicit rule had been written.**
*Reflection:* Implicit rules are simply pattern rules that reside in Make’s internal database; they obey the same expansion rules.

**Example 4 — Phony target depending on pattern-built artifacts**
- *Given:* 
  ```make
  .PHONY: all
  all: foo.o bar.o
  %.o: %.c
  ```
- *Find:* Behaviour of `make all` when only `foo.c` has changed.
- Make marks `all` as always out-of-date because it is phony.
- It therefore considers `foo.o` and `bar.o`.
- Only `foo.o` is older than `foo.c`, so only that implicit rule fires.
**Exactly one compilation occurs; the phony target guarantees the dependency scan happens.**
*Reflection:* Phony status propagates the need to examine prerequisites without ever creating a file named `all`.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Accidentally creating a directory with the same name as a phony target | Shell commands or editor backups leave stray names | Always list every action target under `.PHONY` at the top of the file |
| Writing `%.c: %.o` instead of `%.o: %.c` | Reversed mental model of source versus derived file | Draw the arrow from prerequisite to target on paper before writing the rule |
| Expecting an implicit rule to fire when a conflicting explicit rule exists | Explicit rules have higher priority | Use `make -d` or `make --print-database` to inspect which rule actually matched |
| Using `$@` inside a recipe that also appears in a non-pattern rule | Automatic variables are defined only for pattern and suffix rules | Wrap the variable usage inside a pattern rule or use explicit filenames |
| Forgetting that `.PHONY` does not affect prerequisites | Phony status is per-target, not transitive | Explicitly list every intermediate target that should also be phony |
| Pattern rule matching too broadly because of multiple `%` occurrences | Make permits only one `%` per pattern | Keep patterns simple; use static pattern rules when multiple stems are required |
| Implicit rules disabled by `MAKEFLAGS += -r` in a parent Makefile | The parent build deliberately prunes the rule database | Re-enable with `-r` negation or restate the needed pattern explicitly |

## 7. The textbook-precise statement
In GNU Make, a target \(T\) is phony if it appears as a prerequisite of the special target `.PHONY`. A pattern rule has the form  
\[
\texttt{%.}suf_1\texttt{: %.}suf_2
\]
and is instantiated by substituting any stem \(X\) that satisfies both the target pattern and an existing prerequisite file \(X.suf_2\). Implicit rules constitute the initial contents of the rule database; they are identical in syntax and semantics to user-defined pattern rules but are consulted only after all explicit rules have been examined (GNU Make Manual, version 4.4, §10.5–10.7).

## 8. Visual — diagram or schematic
```text
Makefile view
+----------------+          +----------------+
| .PHONY: all    |          | Pattern rule   |
| all: foo.o     |--------->| %.o: %.c       |
+----------------+          +----------------+
          |                          |
          v                          v
   +-------------+            +-------------+
   | Implicit    |            | foo.c       |
   | rule fires  |<-----------| (source)    |
   +-------------+            +-------------+
```
The diagram shows the three layers: the phony declaration forces evaluation, the pattern rule supplies the generic transformation, and the implicit rule supplies the concrete compiler invocation when no explicit rule is present.

## 9. The memory technique
1. **The hook** — Picture a stage actor named “Phony” who wears a giant percent-sign costume; every time he steps on a file he shouts “I’m not real!” while an invisible orchestra (the implicit rules) plays the same tune for every matching instrument.
2. **What to overlearn** — The three-line idiom  
   ```make
   .PHONY: clean
   clean:
   	rm -rf *.o
   ```  
   and the single pattern `%.o: %.c` together with the automatic variables `$@` and `$<`.
3. **Spaced-repetition schedule** — Review the three-line idiom after 1 day, the pattern rule after 3 days, a full four-example walkthrough after 7 days, and the trap table after 16 and 35 days.
4. **First-principles fallback** — Re-derive from the single sentence “Make decides whether to run a recipe by comparing file timestamps; anything that is not a file must be declared outside that comparison.”

## 10. What this unlocks
Mastery of phony targets, pattern rules, and implicit rules lets a programmer write concise yet correct Makefiles that scale to entire operating-system kernels and EDA toolchains. The same mental model transfers directly to Ninja’s `build` edges, to CMake’s `add_custom_target` and `add_custom_command`, and to the rule engines inside Bazel and Buck.

- Static pattern rules and canned recipes
- Automatic dependency generation (`-MMD`)
- Recursive Make versus non-recursive Make
- Rule chaining and order-only prerequisites

## 11. Self-check — five questions, no answers
1. A Makefile contains `.PHONY: test` and a directory named `test`. After `touch test`, does `make test` execute its recipe?  
2. Write the single pattern rule that turns any `src/%.c` into `obj/%.o` while preserving the directory structure.  
3. Explain why `make -r` can cause an existing Makefile to stop compiling C files even though the compiler is present.  
4. A target `install` depends on a pattern-built binary. If `install` is not declared phony, under what exact condition will its recipe be skipped?  
5. Construct a minimal Makefile that builds every `.c` file in the current directory into an executable of the same stem, using only implicit rules plus one phony target.