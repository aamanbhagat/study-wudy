## 1. The one-sentence answer
**Control flow in C consists of the statements that let a program execute different blocks of code depending on conditions or repeat blocks until conditions change.**

These statements replace the default top-to-bottom execution order. An `if` tests a condition and runs its block only when the condition is true; `else` supplies the alternative block. The `switch` statement selects among many constant cases. Loops (`while`, `do-while`, `for`) repeat a block while a condition holds, with `for` packaging initialization, test, and update in one line. `break` exits the innermost loop or switch, `continue` skips to the next iteration, and `goto` jumps to a labeled statement.

In practice the compiler translates each of these into conditional and unconditional jumps in assembly. The programmer therefore controls both the logical structure and the generated machine instructions.

> [!NOTE]
> The single deepest insight is that every control-flow construct ultimately reduces to a test that either takes a branch or falls through; mastering the test is therefore mastering the entire mechanism.

## 2. Why this matters — concrete and current
NASA’s flight software for the Perseverance rover uses nested `if` chains and `switch` statements on sensor status words to decide between entry-descent-landing modes; a single missed condition would have triggered an abort.

In the Linux kernel scheduler, `for` loops walk the run-queue while `continue` statements skip tasks whose `vruntime` exceeds the current threshold, enabling sub-millisecond context switches on millions of cores worldwide.

Intel’s compiler for Xeon processors rewrites `while` loops containing `break` into hardware loop instructions; the resulting binary runs the inner kernels of TensorFlow matrix multiplications 12 % faster on AVX-512 hardware.

Semiconductor verification suites at TSMC employ `do-while` loops to drive stimulus until coverage metrics reach 99.999 %; the same loops contain `goto` error handlers that dump waveform traces on assertion failure.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Boolean expressions  | Every `if`, `while`, and `for` test evaluates to 0 or non-zero |
| Block scoping `{ }`  | Defines the region controlled by `if`, loops, and `switch` |
| Integer promotion    | Determines whether a `switch` case label matches its controlling expression |
| Sequence points      | Guarantee that side effects inside conditions finish before the branch is taken |

## 4. Building the idea — from intuition to formalism

### Step 1 — A condition decides direction
A program can test a value and choose one of two paths.  
Example: `if (x > 0) y = 1; else y = -1;`  
Formally the semantics are  
$$
\text{if } (e) \ S_1 \text{ else } S_2 \quad\equiv\quad
\begin{cases}
S_1 & \text{if } e \neq 0 \\
S_2 & \text{otherwise}
\end{cases}
$$  
> [!WARNING]
> Forgetting that any non-zero value is true leads to surprises when a pointer or bit-mask is used as the condition.

### Step 2 — Multi-way selection collapses to a jump table
When the controlling expression is an integer constant, `switch` replaces a long `if-else` chain.  
The compiler builds a table of addresses indexed by the case values; control transfers directly to the matching label.

### Step 3 — Repetition requires a back-edge
A `while` loop inserts an unconditional jump back to the test after the body. The test itself remains a conditional branch.

### Step 4 — `do-while` guarantees one execution
The test is placed after the body, so the back-edge is always taken at least once.

### Step 5 — `for` packages three expressions
The syntax `for (init; test; update) body` is exactly equivalent to  
```
init;
while (test) {
    body
    update;
}
```
except that `continue` jumps to `update` rather than to the test.

### Step 6 — `break` and `continue` alter the normal loop exit
`break` transfers control to the statement after the loop; `continue` transfers control to the update (or test) of the innermost loop.

### Step 7 — `goto` is an arbitrary jump
Any labeled statement may be the target; the only restriction is that the jump must stay inside the current function.

### Step 8 — The complete set
C therefore supplies exactly eight control-flow primitives whose semantics are defined by the C17 standard (ISO/IEC 9899:2018, §6.8).

## 5. Worked examples — every step shown

**Example 1 — Simple parity test**  
*Given:* integer `n`.  
*Find:* set `p = 0` if even, `p = 1` if odd.  
```
if (n % 2 == 0) p = 0; else p = 1;
```
*Why* the test uses `== 0` rather than implicit truth: the remainder operator can return negative values on some implementations.  
**Final answer**  
```c
p = n % 2 ? 1 : 0;
```
*Reflection* The ternary operator is merely syntactic sugar for the same conditional branch.

**Example 2 — Menu dispatch**  
*Given:* `int cmd`.  
*Find:* call the matching handler.  
```
switch (cmd) {
case 1: open_file(); break;
case 2: save_file(); break;
default: puts("unknown");
}
```
*Why* each `case` must end with `break`: without it execution falls through to the next case.  
**Final answer**  
The jump table generated by the compiler contains addresses for labels 1, 2, and default.

**Example 3 — Sum until sentinel**  
*Given:* stream of integers terminated by 0.  
*Find:* their sum.  
```
int sum = 0, x;
while ((x = getchar()) != '0') sum += x - '0';
```
*Why* the assignment is inside the condition: the comma operator is unnecessary here because the assignment expression yields the assigned value.  
**Final answer**  
`sum` holds the accumulated total after the loop exits.

**Example 4 — Searching with early exit**  
*Given:* array `a[10]`.  
*Find:* index of first negative value or –1.  
```
int i;
for (i = 0; i < 10; i++) {
    if (a[i] < 0) break;
}
int idx = (i < 10) ? i : -1;
```
*Why* `break` is required: `continue` would only skip the remainder of the current iteration.  
**Final answer**  
`idx` contains the desired index or –1.

*Reflection* The combination of `for` + `break` is the idiomatic bounded search pattern in C.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Missing `break` in `switch` | Fall-through is the default semantics       | Always write `break` or document intentional fall-through with a comment |
| `=` instead of `==`         | Assignment expression yields a value        | Enable compiler warnings (`-Wall`)           |
| `for` loop variable scope   | C99+ declares the counter inside the `for`  | Declare the counter before the loop when it must be visible after the loop |
| `do-while` semicolon        | The semicolon after `while` is mandatory    | Place the semicolon on its own line          |
| `goto` across variable declarations | Jump skips initialization                   | Never jump over declarations with initializers |
| `continue` in `while` vs `for` | `continue` skips the update in `for`        | Mentally rewrite `for` as `while` before using `continue` |
| Side effects in conditions  | Sequence point rules are subtle             | Extract complex expressions into separate statements |

## 7. The textbook-precise statement
C17 §6.8.4–6.8.6 define selection and iteration statements. The controlling expression of `if`, `switch`, `while`, and `for` is evaluated; if it compares unequal to zero, the sub-statement is executed. A `switch` statement causes control to jump to the statement prefixed by the matching `case` label or to the `default` label; if no label matches, control passes to the statement after the `switch`. K&R, *The C Programming Language*, 2e, §3.2–3.8 supplies the canonical exposition.

## 8. Visual — diagram or schematic
```text
          ┌──────────────┐
          │   test expr  │
          └──────┬───────┘
                 │
         true    │ false
           ┌─────▼─────┐   ┌────────────┐
           │   body    │──▶│  update    │
           └─────┬─────┘   └────┬───────┘
                 │              │
                 └──────◀───────┘
```
The diagram shows the control-flow graph of a `for` loop. The back-edge returns to the test after the update; `break` exits to the right of the loop, `continue` jumps directly to the update node.

## 9. The memory technique
**The hook** — Picture a railway switch: the `if` lever decides which track the train takes; loops are the circular track that keeps the train moving until the lever is thrown to the exit siding (`break`).

**What to overlearn**  
- `if (e) S` evaluates `e` once.  
- `for (a; b; c) S` ≡ `a; while (b) { S; c; }` except for `continue`.  
- `break` leaves the loop; `continue` restarts the test/update.

**Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Re-derive every construct from the single rule “evaluate a scalar expression, then take or not take a conditional jump.”

## 10. What this unlocks
Mastery of these eight primitives lets you implement any algorithm whose control structure is expressible by finite state machines or structured flowcharts. The immediate next topics are functions (which encapsulate control flow), pointers to functions (indirect jumps), and preprocessor conditionals that operate at compile time.

- Recursion and the call stack  
- `setjmp`/`longjmp` non-local exits  
- State-machine implementation in embedded drivers  
- Loop-invariant code motion performed by optimizers  

## 11. Self-check — five questions, no answers
1. Rewrite the following `for` loop using only `while`, `if`, `break`, and `continue`: `for (int i=0; i<n && a[i]!=0; i++) sum+=a[i];`

2. What value does the `switch` expression `switch (x) { case 1: case 2: y=3; }` assign to `y` when `x==0`?

3. A programmer writes `while (i++ < n) { … }`. On which iteration does the increment of `i` first become visible inside the body?

4. Identify the undefined behavior in `goto L; int x=0; L: printf("%d",x);`

5. Convert the nested `if` chain that implements a 16-way dispatch into an equivalent `switch` and state the minimum number of comparisons the compiler may generate.