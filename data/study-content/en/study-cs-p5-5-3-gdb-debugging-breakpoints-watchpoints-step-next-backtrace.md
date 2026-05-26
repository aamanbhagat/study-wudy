## 1. The one-sentence answer
**GDB debugging with breakpoints, watchpoints, step, next, and backtrace is the controlled suspension and inspection of a running process at instruction, source-line, or data-change granularity together with reconstruction of its call stack.**

A program compiled with debug symbols contains extra metadata that maps machine addresses back to source lines and variable names. When GDB attaches to such a process it can insert special CPU traps (breakpoints) or hardware watch registers (watchpoints). Execution then proceeds under GDB’s supervision; each trap returns control to the debugger so the programmer can read registers, memory, and the chain of activation records that produced the current state.

The commands `step` and `next` advance execution by one source line while either descending into or stepping over function calls; `backtrace` walks the saved frame pointers to list every active function together with its arguments and locals. Together these primitives turn opaque crashes into reproducible, queryable states.

> [!NOTE]
> The decisive insight is that breakpoints and watchpoints are not “pauses” inserted by the programmer; they are hardware or kernel-mediated traps that hand control to an external observer without altering the program’s own logic.

## 2. Why this matters — concrete and current
SpaceX uses GDB on the Falcon 9 flight computer simulators to single-step through the exact sequence of engine-gimbal corrections that occur between telemetry packets; a single mis-ordered memory write discovered this way prevented a 2018 test-stand anomaly from propagating to flight software.

In the Linux kernel, maintainers routinely set watchpoints on `task_struct->state` while reproducing scheduler bugs reported in the stable tree; the watchpoint fires exactly when a task transitions from `TASK_RUNNING` to `TASK_UNINTERRUPTIBLE`, revealing the offending driver within minutes rather than hours of log inspection.

TensorFlow’s XLA CPU backend team attaches GDB to JIT-generated code containing AVX-512 intrinsics; `backtrace` through the custom stack frames produced by the code generator lets engineers map an illegal instruction fault back to the precise HLO operation that emitted the bad vector shuffle.

Semiconductor simulators such as gem5 rely on GDB’s `next` and `stepi` to advance one guest instruction at a time while verifying cache-coherence protocols; the same session also records watchpoints on the coherence directory so that protocol violations become deterministic rather than statistical.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Compiled executable with `-g` | GDB needs line-number and symbol tables to map addresses to source |
| Notion of stack frames   | `backtrace` walks the chain of saved return addresses     |
| Distinction between source line and machine instruction | `step` vs `stepi` and `next` vs `nexti` behave differently |
| Basic shell and `gcc`/`clang` invocation | You must produce the binary that GDB will attach to       |

## 4. Building the idea — from intuition to formalism

### Step 1 — Inserting a breakpoint
A breakpoint replaces an instruction with a trap (INT 3 on x86) or programs a debug register. When the CPU executes that address, control transfers to the debugger before the original instruction runs.

Example: `break main.c:42` plants a trap at the first instruction generated for line 42 of `main.c`.

Formal statement:  
Let \( pc \) be the program counter. A breakpoint at address \( a \) satisfies  
\[ \text{if } pc = a \text{ then trap to debugger}. \]

> [!WARNING]
> Placing the breakpoint on the wrong line (for example, a comment or declaration) produces no trap; the program runs to completion or to the next unrelated trap.

### Step 2 — Setting a watchpoint
A watchpoint monitors a memory location for read, write, or either. Hardware debug registers or page-protection tricks cause a trap on the chosen access.

Example: `watch *0x7fffffffe4bc` fires when the four-byte integer at that address is written.

Formal statement:  
For address \( a \) and access type \( t \in \{\text{read},\text{write},\text{access}\} \),  
\[ \text{if memory}[a] \text{ is accessed with type } t \text{ then trap}. \]

> [!WARNING]
> Watchpoints on stack variables become invalid once the frame is popped; continuing to watch the same address reads or writes unrelated data.

### Step 3 — Single-step source line with `step`
`step` executes until the program counter reaches a different source line, descending into called functions.

Formal statement:  
Advance while  
\[ \text{source_line}(pc) = \text{source_line}(pc_0). \]

> [!WARNING]
> `step` can enter library code whose source is unavailable, leaving the user inside an opaque function with no symbols.

### Step 4 — Source-line step-over with `next`
`next` behaves like `step` except that a function call counts as one line; control returns after the callee returns.

Formal statement:  
Advance while  
\[ \text{source_line}(pc) = \text{source_line}(pc_0) \lor \text{pc entered a call frame that later returns}. \]

> [!WARNING]
> Using `next` over a function that never returns (infinite loop, deadlock) leaves the debugger unresponsive until an external signal arrives.

### Step 5 — Reconstructing the call stack with `backtrace`
`backtrace` follows the frame pointer or `.eh_frame` unwind information to list every active activation record.

Formal statement:  
Starting from the current frame pointer \( fp_0 \), iteratively compute  
\[ fp_{i+1} = \text{mem}[fp_i + \text{offset}_{\text{saved-fp}}], \quad ra_i = \text{mem}[fp_i + \text{offset}_{\text{return-addr}}] \]  
until \( fp = 0 \).

> [!WARNING]
> Corrupted frame pointers (buffer overflow) produce truncated or garbage backtraces; always cross-check with `info registers` and `disassemble`.

### Step 6 — Combining the primitives
A typical session plants a breakpoint, continues to it, sets a watchpoint on a variable that should be invariant, then uses `step`/`next` while examining the backtrace after each watchpoint hit.

## 5. Worked examples — every step shown

**Example 1 — Simple breakpoint**
*Given:* `gcc -g crash.c -o crash` containing `int main(){int x=0;return 1/x;}`  
*Find:* Stop before the division.  
`gdb ./crash`  
`(gdb) break crash.c:2`  
*Why:* Plants trap at line 2.  
`(gdb) run`  
*Why:* Executes until trap.  
**Stopped at breakpoint 1.**  

**Example 2 — Watchpoint on global**
*Given:* Global `int counter;` incremented in two threads.  
*Find:* First write after initialization.  
`(gdb) watch counter`  
*Why:* Arms hardware watch register.  
`(gdb) continue`  
*Why:* Traps on first store.  
**Hardware watchpoint hit.**  

**Example 3 — `step` versus `next`**
*Given:* `foo()` calls `bar()`.  
`(gdb) step` enters `bar`; `(gdb) next` returns after `bar` finishes.  
*Why:* Different source-line advancement rules.  

**Example 4 — Backtrace after segfault**
*Given:* Null dereference inside `baz()` called from `quux()`.  
`(gdb) backtrace`  
```
#0  baz () at crash.c:17
#1  quux () at crash.c:22
#2  main () at crash.c:27
```
*Why:* Frame pointers yield the exact call chain.  
**Reflection:** The example is tricky because the faulting instruction is one line after the call site; `backtrace` plus `list` together locate the exact source statement.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                | How to avoid it                              |
|-----------------------------------|-----------------------------------------------|----------------------------------------------|
| Breakpoint never hit              | Wrong file or line after macro expansion      | Use `break file:line` and verify with `info break` |
| Watchpoint on stack variable      | Frame deallocated; address reused             | Use `watch` only on heap or globals, or re-set after each call |
| `next` hangs                      | Function never returns                        | Use `finish` or external timeout             |
| Backtrace truncated               | `-fomit-frame-pointer` or `-O2` tail calls    | Recompile with `-fno-omit-frame-pointer`     |
| `step` enters assembly            | No debug info for callee                      | Use `stepi` only when source is unavailable  |
| Conditional breakpoint ignored    | Expression evaluated with wrong scope         | Use `break … if expr` and quote variables    |
| GDB attached to wrong process     | Multiple binaries with same name              | Use `attach <pid>` after `ps` or `pgrep`     |

## 7. The textbook-precise statement
GDB implements a source-level debugger whose core operations are defined by the DWARF line-number program and the `.eh_frame` unwind tables. A breakpoint at source location \( (f,l) \) is realized by mapping \( (f,l) \) to the first instruction address \( a \) via the line-number matrix and planting a trap at \( a \). A watchpoint is realized either by a hardware debug register or by write-protecting the page containing the watched address. Execution-control primitives `step`, `next`, `stepi`, and `nexti` are implemented by repeated single-instruction traps until the source-line or call-frame predicate changes. The command `backtrace` performs a depth-first walk of the canonical frame address chain described in DWARF Call Frame Information (CFI). Reference: Free Software Foundation, *Debugging with GDB*, 15th edition, §5–§8.

## 8. Visual — diagram or schematic
```text
Stack grows downward
+------------------+  <- rsp (top of stack)
| return addr main |
+------------------+
| saved rbp        |  <- frame pointer of main
| local vars main  |
+------------------+  <- frame pointer of foo
| return addr foo  |
+------------------+
| saved rbp        |  <- current frame (bar)
| locals of bar    |
+------------------+
          ↑
       backtrace walks upward via saved rbp
```

## 9. The memory technique
1. **The hook** — Picture a traffic policeman who can stop a car at any intersection (breakpoint), watch a particular speedometer needle (watchpoint), let the car creep forward one block at a time (step/next), and radio the entire convoy route (backtrace).
2. **What to overlearn** — The four core commands: `break`, `watch`, `step`/`next`, `backtrace`; the difference between source-line and instruction stepping.
3. **Spaced-repetition schedule** — Review commands after 1 day, 3 days, 7 days, 16 days, 35 days by reproducing the four worked examples from memory.
4. **First-principles fallback** — Re-derive every command from the underlying hardware mechanisms: INT 3 / debug registers for traps, frame-pointer chasing for stack walks.

## 10. What this unlocks
Mastery of these GDB primitives is the prerequisite for dynamic analysis of optimized code, reverse engineering of stripped binaries, live patching, and integration with higher-level tools such as rr, gdb-dashboard, and IDE debug adapters.

- Conditional breakpoints and `catch` events
- Python scripting inside GDB (`gdb.execute`, `gdb.Breakpoint`)
- Core-file post-mortem analysis
- Hardware watchpoint limits and performance counters
- Remote debugging over serial/JTAG for embedded targets

## 11. Self-check — five questions, no answers
1. A breakpoint is planted at a line containing only a variable declaration; the program never stops. Explain why.
2. You set a watchpoint on a local `int` inside a function that is called recursively. After the first recursive call returns, the watchpoint fires at an unexpected address. What happened?
3. Compare the number of source lines advanced by `step` versus `next` when the current line contains a call to `printf`.
4. A backtrace shows only two frames even though you know the call depth is five. Which compiler flag most likely produced this result, and how do you confirm it?
5. Construct a minimal C program containing a data race on a global counter such that a watchpoint will fire exactly once per increment; give the exact GDB command sequence that demonstrates the race.