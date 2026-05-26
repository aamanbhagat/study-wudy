## 1. The one-sentence answer
**A Makefile is a declarative dependency graph whose nodes are targets, whose edges are prerequisites, and whose actions are recipes executed only when timestamps indicate that a target is out of date.**

Make reads the file, constructs an implicit directed acyclic graph from the declared rules, and walks that graph from the goal target backward, invoking each recipe exactly when a prerequisite is newer than its target. The mechanism therefore encodes both the logical order of work and the minimal amount of work actually required. Variables and automatic variables exist solely to parameterise those rules without repeating literal strings.

> [!NOTE]
> The single most important insight is that Make never executes a recipe unless the filesystem itself tells it the work is necessary; everything else—variables, patterns, functions—is merely convenient syntax layered on top of that timestamp test.

## 2. Why this matters — concrete and current
The Linux kernel build system, still driven by Kbuild Makefiles, compiles roughly 30 million lines of C across thousands of architecture-specific targets; a change to a single header file triggers recompilation of only the dependent object files because Make’s prerequisite tracking respects the actual include graph recorded by the compiler.

NASA’s flight software for the Perseverance rover and the Europa Clipper mission is built with Makefiles that guarantee bit-for-bit reproducibility across multiple decades of hardware; any change to a prerequisite library forces regeneration of the final executable image that is later burned into radiation-hardened PROM.

Google’s internal Bazel system began as a Make-compatible front end; the original Make rules for the Android Open Source Project and for TensorFlow’s early CPU kernels still define the exact order in which generated protobuf and flatbuffer code must be produced before the C++ compiler is invoked.

Modern semiconductor toolchains at TSMC and Intel rely on Make-driven flows to orchestrate synthesis, place-and-route, and static-timing analysis steps; a single modified RTL file must correctly propagate through hundreds of intermediate netlist and layout targets without rebuilding the entire chip database.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Unix file timestamps     | Make’s only built-in test for “work needed”               |
| Shell command execution  | Every recipe is handed verbatim to /bin/sh                |
| Simple directed graphs   | Targets and prerequisites form the nodes and edges        |
| Environment variables    | Make imports and exports them; variable syntax re-uses the same idea |

## 4. Building the idea — from intuition to formalism

### Step 1 — A target names the file you ultimately want
A target is simply a string that Make treats as a filename.  
Example:  
```
program: main.o
```
states that the file `program` depends on `main.o`.  
Formally, a target \( T \) appears to the left of a colon in a rule.  
> [!WARNING]
> If you write a target that is not a real file and forget to mark it `.PHONY`, Make will compare it against a possibly stale file of the same name on disk and may skip the recipe forever.

### Step 2 — Prerequisites are the files that must exist before the target can be built
Each prerequisite becomes a directed edge in the dependency graph.  
Example continuation:  
```
program: main.o utils.o
```
creates edges `program → main.o` and `program → utils.o`.  
Formally, the set \( P(T) \) of prerequisites of target \( T \) must all be up-to-date before \( T \)'s recipe runs.

### Step 3 — A recipe is the shell command list that produces the target
The recipe appears on lines immediately after the rule that begin with a tab.  
Example:  
```
program: main.o utils.o
	$(CC) -o program main.o utils.o
```
Make executes the recipe only when at least one prerequisite is newer than the target.

### Step 4 — Variables factor out repeated strings
A variable is a named string that Make expands before executing anything.  
Definition syntax:  
```
CC = gcc
CFLAGS = -Wall -O2
```
Use: `$(CC) $(CFLAGS)`.  
Formally, any `$(VAR)` or `${VAR}` is replaced by the value of `VAR` in a preprocessing pass.

### Step 5 — Automatic variables give the current rule’s own names
Inside a recipe, `$@` expands to the target, `$<` to the first prerequisite, `$^` to the complete prerequisite list.  
Example:  
```
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@
```
Here `$<` is the `.c` file and `$@` is the `.o` file being produced.

### Step 6 — The update algorithm walks the graph in reverse topological order
Make selects a goal (default: first target), recursively updates every prerequisite, then checks the timestamp rule: if any prerequisite’s mtime > target’s mtime, the recipe runs.  
This is exactly the statement found in the GNU Make manual, section 2.3.

## 5. Worked examples — every step shown

**Example 1 — Minimal explicit rule**  
*Given:* two source files `main.c` and `utils.c`.  
*Find:* a Makefile that produces the executable `prog`.  
```
prog: main.o utils.o
	$(CC) -o prog main.o utils.o

main.o: main.c
	$(CC) -c main.c

utils.o: utils.c
	$(CC) -c utils.c
```
*Why* the first line declares the goal and its direct prerequisites.  
*Why* each `.o` rule supplies the command that creates that object.  
**Final answer**  
```
prog
```
*Reflection* The example is simple because every target and prerequisite is written literally; scaling requires variables.

**Example 2 — Introducing variables**  
*Given:* the same files, but the compiler name may change.  
*Find:* a Makefile using variables.  
```
CC = gcc
CFLAGS = -Wall -O2

prog: main.o utils.o
	$(CC) $(CFLAGS) -o $@ $^
```
*Why* `CC` and `CFLAGS` are defined once.  
*Why* `$@` and `$^` replace the repeated filenames.  
**Final answer**  
The same executable is produced, yet the command line is now parameterised.  
*Reflection* Automatic variables already reduce repetition; the next example generalises further with patterns.

**Example 3 — Pattern rule with automatic variables**  
*Given:* any number of `.c` files.  
*Find:* a single rule that builds every `.o`.  
```
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@
```
*Why* the `%` wildcard matches any stem.  
*Why* `$<` is guaranteed to be the matching `.c` and `$@` the `.o`.  
**Final answer**  
All object files are built by the same two-line rule.  
*Reflection* The pattern rule plus automatic variables is the idiomatic way to avoid enumerating every compilation step.

**Example 4 — Combined variables, patterns, and phony target**  
*Given:* a project that must also clean intermediates.  
*Find:* a complete, idiomatic Makefile.  
```
CC      := gcc
CFLAGS  := -Wall -O2
LDFLAGS :=

SRCS    := $(wildcard *.c)
OBJS    := $(SRCS:.c=.o)

prog: $(OBJS)
	$(CC) $(LDFLAGS) -o $@ $^

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

.PHONY: clean
clean:
	rm -f $(OBJS) prog
```
*Why* `:=` avoids repeated expansion.  
*Why* `.PHONY` guarantees `clean` always runs.  
**Final answer**  
A single file that builds and cleans the project correctly.  
*Reflection* The combination of substitution references, pattern rules, and phony targets is what experienced users actually ship.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Recipe line lacks leading tab     | Editor converts tabs to spaces                      | Use `cat -A Makefile` or an editor that shows tabs   |
| Variable expanded too late        | `=` defers expansion until use                      | Prefer `:=` for most definitions                     |
| Forgetting `.PHONY`               | A file named `clean` exists on disk                 | Always declare utility targets `.PHONY`              |
| Using `$<` with multiple prerequisites | `$<` is only the first prerequisite              | Use `$^` when the whole list is required             |
| Circular dependency               | Two targets list each other as prerequisites        | Examine the graph with `make -d` or `make --debug`   |
| Order-only prerequisites misused  | Writer intends normal dependency but writes `\|`    | Use `\|` only when the prerequisite must exist but never trigger rebuild |
| Shell variable not exported       | Recipe runs in a fresh shell                        | Use `export VAR` or write `VAR=val cmd` inside recipe |

## 7. The textbook-precise statement
A Makefile rule has the form  
\[
T : P_1 \dots P_n \\
\quad R_1 \\
\quad \vdots \\
\quad R_k
\]  
where \( T \) is a target, each \( P_i \) a prerequisite, and each \( R_j \) a recipe line. GNU Make (version 4.4) updates \( T \) if and only if there exists an \( i \) such that the modification time of \( P_i \) is strictly greater than that of \( T \), or if \( T \) does not exist. See GNU Make Manual, §2.3 “How make Processes a Makefile” and §10.5 “Defining and Redefining Pattern Rules”.

## 8. Visual — diagram or schematic
```text
          prog
           |
     +-----+-----+
     |           |
   main.o     utils.o
     |           |
   main.c     utils.c
```
The diagram shows a three-level DAG. The top node `prog` depends on two object files; each object file depends on its corresponding source. Make walks from `prog` downward, then executes recipes upward only for out-of-date nodes.

## 9. The memory technique
1. **The hook** — Picture a construction site where each beam (target) cannot be lifted until all supporting girders (prerequisites) are delivered; the crane operator (Make) only issues the lift command (recipe) when a girder arrives later than the beam’s current state.
2. **What to overlearn** — The five automatic variables `$@`, `$<`, `$^`, `$?`, `$*`; the difference between `=` and `:=`; that every recipe line must begin with a literal tab.
3. **Spaced-repetition schedule** — Review the five automatic variables at 1 day, 3 days, 7 days, 16 days, 35 days; re-derive the timestamp rule at each interval.
4. **First-principles fallback** — If you forget the syntax, write the explicit three-line rule for one `.c` → `.o` → executable chain, then replace the literal names with `$@` and `$<`; the rest follows mechanically.

## 10. What this unlocks
Mastery of these five Makefile primitives lets you read and extend the build systems of virtually every C, C++, and Fortran project written before 2015, and supplies the mental model required for modern incremental-build tools.  
- Pattern rules and automatic variables → understanding CMake’s generator expressions  
- The DAG update algorithm → learning Ninja’s `.ninja` format and Bazel’s action graph  
- Variable flavours and export semantics → writing portable cross-compilation toolchains  
- `.PHONY` and order-only prerequisites → constructing reliable CI pipelines that never silently skip steps

## 11. Self-check — five questions, no answers
1. Write a pattern rule that compiles any `.c` file into a position-independent `.o` file using `$(CC)` and `$(CFLAGS)`.  
2. A Makefile contains `all: foo bar` followed by a file literally named `all` on disk. What happens on the next `make all` if neither `foo` nor `bar` changed?  
3. Explain why `OBJECTS = foo.o bar.o` followed by `$(OBJECTS): %.o: %.c` does not produce the rule you probably intended.  
4. Inside a recipe, what is the difference between `$?` and `$^`? Give a one-sentence scenario where using the wrong one changes observable behaviour.  
5. Construct a minimal Makefile that builds `app` from `main.c` and a static library `lib.a` located in a sibling directory `../lib`, ensuring that `lib.a` is rebuilt only when its own sources change, yet `app` is relinked whenever `lib.a` is newer.