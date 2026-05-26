## 1. The one-sentence answer
**GDB debugging lets you pause a running program at chosen points, inspect or change its state, and walk through execution line by line or function by function.**

Aap jab code likhte ho, kabhi-kabhi woh crash karta hai ya galat result deta hai. GDB aapko us running binary ke andar jaakar breakpoints lagaane deta hai jahaan aap rukna chahte ho. Breakpoint par rukne ke baad aap variables ki values dekh sakte ho, watchpoints se memory changes track kar sakte ho, aur step/next commands se ek-ek instruction execute kar sakte ho bina pura program restart kiye.

Backtrace command aapko dikhaata hai ki call stack mein kaunse functions abhi active hain. Iska matlab yeh hai ki aap runtime behaviour ko directly observe kar sakte ho instead of guessing from print statements.

> [!NOTE]
> The single most important insight is that breakpoints and watchpoints turn invisible execution into a controllable, observable process; once you can stop and inspect at will, most bugs become mechanical to locate rather than mysterious.

## 2. Why this matters — concrete and current
Linux kernel developers at Red Hat and Google routinely attach GDB to live or core-dump instances of the kernel to diagnose race conditions in device drivers that only appear under heavy I/O load on production servers.

In the TensorFlow and PyTorch teams, engineers use GDB on custom C++ ops and CUDA kernels when a model produces NaNs only after several thousand training steps; watchpoints on gradient tensors let them catch the exact iteration where the value first becomes invalid.

Semiconductor companies such as Intel and AMD employ GDB on their simulation farms when verifying new microcode; breakpoints inside the architectural simulator allow single-stepping through pipeline stages to reproduce errata that appear only after millions of cycles.

Spacecraft flight software teams at NASA’s Jet Propulsion Laboratory keep GDB sessions open against the Perseverance rover’s testbed binaries to trace stack corruption that occurs only when certain interrupt handlers interleave with the main control loop.

High-frequency trading firms such as Jane Street compile their OCaml and C++ matching engines with debug symbols and use GDB’s reverse debugging to replay the exact sequence of memory writes that led to an order-book mismatch detected minutes after the event.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Compiled binary + debug symbols (-g flag) | GDB reads DWARF information to map addresses back to source lines and variable names. |
| Call stack and activation records | backtrace walks the stack frames; you must understand return addresses and frame pointers. |
| Memory addresses and watchable locations | watchpoints are hardware or software breakpoints on memory writes; you need to know what address to watch. |
| Process vs. thread execution | step and next behave differently across threads; you must know which thread is currently scheduled. |

If any row above is unfamiliar, pause and review the corresponding concept before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Inserting a breakpoint
Aap source line ya function naam par breakpoint lagate ho taaki execution wahan ruk jaaye.  
Example: `break main.c:42` ya `break foo`.  
Formal: A breakpoint is an intentional trap inserted at address \(a\) so that when the program counter reaches \(a\), control transfers to the debugger.  
> [!WARNING]  
> Using a line number that has no executable code (a comment or declaration) silently moves the breakpoint to the next valid instruction; always verify with `info breakpoints`.

### Step 2 — Setting a watchpoint
Watchpoint memory address ko monitor karta hai. Jab us address par write hoti hai, GDB ruk jaata hai.  
Example: `watch *0x7fffffffe4bc`.  
Formal: A watchpoint at address \(w\) raises a debug event on any store to \(w\) (or a range containing \(w\)).  
> [!WARNING]  
> Hardware watchpoints are limited (typically 4 on x86); exceeding the limit silently falls back to slow software watchpoints that single-step the entire program.

### Step 3 — Single-step versus next
`step` (s) current line ke andar function call ko enter karta hai; `next` (n) function ko ek atomic step maanta hai aur uske baad wali line par rukta hai.  
Formal: \(\text{step}(L)\) executes the instruction at line \(L\) and stops at the next source line in the same or callee frame; \(\text{next}(L)\) stops at the next source line in the current frame only.  
> [!WARNING]  
> Using `next` on a function that never returns (infinite loop inside callee) will make the debugger appear hung; always have a breakpoint inside the callee ready.

### Step 4 — Examining the call stack
`backtrace` (bt) current thread ke stack frames print karta hai. Har frame mein function, arguments aur return address dikhaata hai.  
Formal: The call stack is the sequence of activation records \(F_0, F_1, \dots, F_k\) where \(F_i\) called \(F_{i+1}\); backtrace reconstructs this chain from the frame pointer and return-address slots.  
> [!WARNING]  
> Corrupted stack frames (buffer overflow) produce garbage backtraces; do not trust line numbers until you have verified frame pointers with `info frame`.

### Step 5 — Continuing and reverse execution
`continue` (c) execution resume karta hai jab tak agla breakpoint na mile. GDB 7.0+ mein `reverse-next` aur `reverse-continue` bhi available hain.  
Formal: Execution resumes from the current program counter until the next enabled breakpoint or watchpoint is hit.

### Step 6 — Thread-aware debugging
`info threads` aur `thread N` commands se aap multiple threads ke beech switch kar sakte ho aur har thread ke liye alag breakpoints set kar sakte ho.

## 5. Worked examples — har step show karo

**Example 1 — Simple breakpoint**  
*Given:* Program compiled with `gcc -g crash.c -o crash`.  
*Find:* Stop at line 17 inside main.  
```
(gdb) break crash.c:17
Breakpoint 1 at 0x4011c6: file crash.c, line 17.
(gdb) run
Starting program: ./crash
Breakpoint 1, main () at crash.c:17
```
*Why:* The address 0x4011c6 maps back to source line 17 via DWARF data.  
**Final answer**  
Program stopped at line 17.

*Reflection:* The example shows the minimal cycle of set-run-inspect; it generalises to any line that contains executable code.

**Example 2 — Watchpoint on variable**  
*Given:* Integer `sum` at address 0x7fffffffe4bc.  
*Find:* Detect first write to sum.  
```
(gdb) watch *0x7fffffffe4bc
Hardware watchpoint 2: *0x7fffffffe4bc
(gdb) continue
Hardware watchpoint 2: *0x7fffffffe4bc
Old value = 0
New value = 5
```
*Why:* Hardware debug register DR0 was programmed with the address; the CPU raises a debug exception on the store.  
**Final answer**  
Watchpoint fired on first write, value changed from 0 to 5.

*Reflection:* Watchpoints catch “when” a value changes, which print statements cannot do reliably.

**Example 3 — step versus next**  
*Given:* Line 23 calls `compute()` which itself calls `helper()`.  
*Find:* Execute only inside main.  
```
(gdb) next
24        printf("%d\n", result);
```
*Why:* next treats the entire `compute()` call as one step. Using step instead would have entered `compute`.  
**Final answer**  
Stopped at line 24 inside main.

*Reflection:* Choosing next versus step controls the granularity of traversal.

**Example 4 — backtrace after segfault**  
*Given:* Crash inside recursive function.  
*Find:* Full call chain.  
```
(gdb) bt
#0  0x00000000004011f3 in helper (x=0) at crash.c:9
#1  0x0000000000401205 in compute (n=5) at crash.c:14
#2  0x0000000000401221 in main () at crash.c:23
```
*Why:* Each frame pointer chain leads to the previous return address stored on the stack.  
**Final answer**  
Stack trace shows helper → compute → main.

*Reflection:* The deepest frame is usually the faulting instruction; walking upward reveals the caller that supplied bad arguments.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Breakpoint on a header line       | Compiler emits no code for declarations             | Use `info breakpoints` immediately after setting     |
| Watchpoint silently becomes slow  | Too many hardware watchpoints requested             | Limit to 4; delete unused watchpoints first          |
| next skips over a long-running call | Function contains an infinite loop                  | Set an additional breakpoint inside the callee first |
| backtrace shows “???”             | Binary stripped or frame pointer omitted            | Recompile with `-g -fno-omit-frame-pointer`          |
| Thread switch surprises           | Default GDB follows only the thread that hit the breakpoint | Use `set scheduler-locking on` when needed           |
| Reverse debugging not available   | Target does not support recording                   | Start with `record full` before the suspect region   |
| Variable value shown as <optimized out> | Compiler eliminated the variable                    | Recompile with `-Og` or declare the variable volatile |

## 7. The textbook-precise statement
In Bryant and O’Hallaron, *Computer Systems: A Programmer’s Perspective*, 3e, §8.5, a debugger is defined as a tool that “uses the operating system’s process-control primitives together with symbol-table information to allow a programmer to control and inspect the execution of a program at the source-code level.” GDB implements this model by inserting INT3 or hardware debug-register traps for breakpoints, employing the `ptrace` system call to read and write memory and registers, and walking the DWARF `.debug_frame` sections to reconstruct the call stack on demand.

## 8. Visual — diagram or schematic
```text
main()
  |
  v  (breakpoint at line 23)
compute()
  |
  v  (watchpoint on sum)
helper()  <-- segfault here
  |
  bt shows: helper -> compute -> main
```

## 9. The memory technique
1. **The hook** — Imagine GDB as a traffic controller standing at every intersection (breakpoint) and also watching the speed cameras (watchpoints) on memory roads; when anything interesting happens he halts traffic so you can inspect the cars (variables).
2. **What to overlearn** — Commands: `b`, `watch`, `s`, `n`, `bt`, `info breakpoints`, `continue`.
3. **Spaced-repetition schedule** — Review commands after 1 day, 3 days, 7 days, 16 days, 35 days by attaching GDB to a small program each time.
4. **First-principles fallback** — If you forget a command, remember the underlying OS primitive: breakpoints use `ptrace(PTRACE_POKE, …)` to insert a trap instruction; watchpoints program the CPU debug registers; backtrace walks the saved frame-pointer chain.

## 10. What this unlocks
Mastery of these GDB primitives directly enables systematic debugging of multi-threaded servers, kernel modules, and performance-critical libraries. It also prepares you for higher-level tools such as rr (record-replay), AddressSanitizer integration, and core-dump analysis in production.

- Next topics: conditional breakpoints, Python scripting inside GDB, reverse debugging with `rr`, and post-mortem analysis of core files.
- Related areas: dynamic instrumentation with `ptrace`, DWARF format, and hardware breakpoint registers (DR0–DR3 on x86).

## 11. Self-check — five questions, no answers
1. What single GDB command would you use to stop execution exactly when the integer variable `errno` changes from 0 to any non-zero value?
2. After hitting a breakpoint inside a signal handler, why might `backtrace` show an incomplete or corrupted stack, and which GDB setting mitigates this?
3. Explain the observable difference between `step` and `next` when the current line contains a tail-recursive call that the compiler has turned into a jump.
4. You set four hardware watchpoints; adding a fifth causes GDB to slow down dramatically. Why?
5. Construct a minimal C program and GDB script that demonstrates a watchpoint firing on a write performed by a different thread than the one that set the watchpoint.