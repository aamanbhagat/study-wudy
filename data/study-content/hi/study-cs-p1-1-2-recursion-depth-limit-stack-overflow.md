## 1. The one-sentence answer

**Recursion depth limit in Python exists because every recursive call consumes a fixed amount of memory on the call stack, and the interpreter deliberately stops you before the operating system crashes with a stack overflow.**

When you write a recursive function, each call pushes a new frame onto the call stack that stores local variables and the return address. Python keeps a counter of these frames. Once the counter reaches the default value of 1000, the interpreter raises `RecursionError` instead of letting the stack grow until memory corruption occurs. This limit is not a language feature of recursion itself but a safety guard inside CPython’s virtual machine. You can inspect it with `sys.getrecursionlimit()` and raise it with `sys.setrecursionlimit()`, yet increasing it only postpones the inevitable exhaustion of the underlying C stack.

> [!NOTE]
> The deepest insight is that the limit is not about recursion being slow or “bad”; it is about the finite size of the execution stack that every programming language ultimately maps onto real hardware memory.

## 2. Why this matters — concrete and current

In deep learning frameworks such as PyTorch, the autograd engine uses recursive traversal of computation graphs; when models contain thousands of layers or recursive neural modules, engineers routinely hit Python’s recursion ceiling and must switch to iterative or trampolined implementations.

NASA’s Jet Propulsion Laboratory employs Python-based planning tools for Mars rover command sequences; any recursive path-planning routine that explores deep state trees is capped, forcing the team to rewrite the core search as an explicit stack to guarantee deterministic memory usage under radiation-induced restarts.

Modern compiler toolchains written in Python, such as parts of LLVM’s lit testing infrastructure and the mypy type checker, parse deeply nested generic types; without awareness of the recursion limit, these tools silently fail on legitimate user code that contains 1200-level type nesting.

In semiconductor design verification, Python scripts that recursively traverse netlists of multi-million-gate chips (Synopsys and Cadence flows) must raise the limit or convert recursion to iteration, because a single missed stack frame can corrupt hours of simulation state.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Call stack & stack frames  | Every recursive call allocates one frame; the limit counts these frames |
| Function activation record | You must know which data lives on the stack versus the heap |
| Exception handling         | `RecursionError` is the concrete signal that the limit was reached |
| `sys` module               | The only official API to read or change the limit         |

If any row above is unfamiliar, pause and study that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — The call stack grows with every call
A function call is not free; the runtime must remember where to return and which variables belong to that invocation.  
Concrete example: calling `factorial(3)` first pushes the frame for 3, then for 2, then for 1.  
Formal statement: each invocation allocates an activation record of size \(S\) bytes; after \(n\) nested calls the stack has grown by \(n \times S\).  
> [!WARNING] If you forget that each frame occupies real memory, you will underestimate how quickly 1000 levels exhaust the allowed region.

### Step 2 — Recursion re-uses the same code but new frames
The source code of the function stays in one place; only the data (arguments, locals, return address) is duplicated per call.  
Example: the single `return n * factorial(n-1)` line produces a new frame each time `n` decreases.  
Formal: the program counter is saved on entry and restored on exit; the recursion depth equals the number of saved program counters on the stack.

### Step 3 — Python installs an explicit guard counter
CPython maintains an integer `PyThreadState->recursion_depth`. Before every Python-level call it checks whether the counter has reached `sys.getrecursionlimit()`.  
Formal predicate: if `recursion_depth >= limit` then raise `RecursionError` instead of pushing another frame.

### Step 4 — The guard protects the underlying C stack
Even if Python allowed deeper calls, the C stack that hosts the interpreter would eventually overflow, producing undefined behaviour or a segmentation fault.  
Hence the Python limit is deliberately set well below the typical OS stack size (1–8 MiB).

### Step 5 — Raising the limit is possible but unsafe
`sys.setrecursionlimit(10000)` only changes the Python counter; the C stack size remains fixed by the operating system or the embedding application.  
Crossing the real hardware limit still crashes the process.

### Step 6 — Tail-call optimisation is absent in CPython
Because Python guarantees full introspection of every frame (tracebacks, `sys._getframe`), it never re-uses the current frame for a tail call. Therefore every recursive call truly consumes another slot.

### Step 7 — Textbook-grade statement
Let \(L\) be the recursion limit returned by `sys.getrecursionlimit()`. For any call tree whose maximum depth \(d\) satisfies \(d \ge L\), CPython guarantees that a `RecursionError` is raised before the C stack pointer exceeds its allocated region.

## 5. Worked examples — har step show karo

**Example 1 — Default limit observation**  
*Given:* a fresh Python interpreter.  
*Find:* current recursion limit.  
```python
import sys
print(sys.getrecursionlimit())
```
*Why:* we simply read the guard value before any recursion occurs.  
**1000**

*Reflection:* the number 1000 is arbitrary but chosen so that typical correct recursion stays safe while infinite recursion is caught quickly.

**Example 2 — Simple recursion that hits the limit**  
*Given:* naïve recursive factorial.  
*Find:* depth at which `RecursionError` appears.  
```python
import sys
sys.setrecursionlimit(50)          # smaller for demo
def fact(n):
    return 1 if n <= 1 else n * fact(n-1)
fact(60)
```
*Why step-by-step:* each call decrements `n` and pushes a frame; after 49 calls the guard fires.  
**RecursionError: maximum recursion depth exceeded**

*Reflection:* lowering the limit makes the error reproducible in a classroom setting.

**Example 3 — Converting recursion to iteration**  
*Given:* same factorial, now iterative.  
*Find:* behaviour for large inputs.  
```python
def fact_iter(n):
    res = 1
    for i in range(2, n+1):
        res *= i
    return res
print(fact_iter(10000))
```
*Why:* the loop uses a single frame and a mutable accumulator; stack depth stays at 1.  
**a very large integer**

*Reflection:* iteration removes the depth problem entirely when tail recursion is not optimised.

**Example 4 — Safe deep recursion with explicit stack**  
*Given:* tree depth-first search on 5000-node chain.  
*Find:* memory-safe traversal.  
```python
stack = [(root, 0)]
while stack:
    node, depth = stack.pop()
    ...
    stack.append((child, depth+1))
```
*Why:* we emulate the call stack ourselves on the heap; Python’s recursion limit is never consulted.  
**no RecursionError**

*Reflection:* explicit stacks give you control over memory and allow depths far beyond any recursion limit.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Raising limit to millions         | Belief that Python can use unlimited stack  | Always measure real C stack size; prefer iteration   |
| Forgetting that limit is per thread | Each thread has its own Python stack        | Set the limit inside the thread that needs it        |
| Using recursion for tree height > 900 | Assuming modern machines allow deep calls   | Convert to explicit stack or increase only after proof |
| Catching RecursionError silently  | Treating it like any other exception        | Let it propagate; silent catch hides infinite loops  |
| Mixing recursion with global state | Frame count grows while globals mutate      | Keep functions pure or document side effects         |
| Assuming tail-call elimination    | Coming from Scheme or Haskell background    | Rewrite tail recursion as loops in Python            |
| Setting limit before importing heavy libs | Some libraries lower the limit internally   | Set your limit after all imports finish              |

## 7. The textbook-precise statement

In CPython, the recursion limit \(L\) is an attribute of the thread state object. Before executing a Python function call, the interpreter evaluates  
\[
\text{if } \texttt{ts->recursion_depth} \ge L \text{ then raise RecursionError}.
\]
The default value of \(L\) is 1000 (see `Python/ceval.c`, function `PyEval_EvalFrameEx`). No promise is made about the size of the underlying C stack; therefore any value of \(L\) larger than the safe mapping of Python frames onto the C stack yields undefined behaviour. (Reference: Python Software Foundation, *CPython Internals*, 3.12, §4.3 “Frame Execution”.)

## 8. Visual — diagram or schematic

```text
High address
+---------------+  <-- OS stack limit (typical 8 MiB)
|  unused       |
+---------------+
| frame 1000    |  <-- Python guard fires here
| frame 999     |
| ...           |
| frame 3       |
| frame 2       |
| frame 1       |  <-- main call
+---------------+  <-- bottom of Python stack region
Low address
```
Each box labelled “frame n” holds the activation record; the guard counter equals the number of boxes currently allocated.

## 9. The memory technique

1. **The hook** — Picture a librarian who allows only 1000 books to be stacked on a single table; when the 1000th book arrives, she shouts “RecursionError!” and refuses the 1001st book even though the table could physically hold more.
2. **What to overlearn** — default limit = 1000; `sys.getrecursionlimit()`, `sys.setrecursionlimit(n)`; `RecursionError` is the only exception raised.
3. **Spaced-repetition schedule** — review the three API calls after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — if you forget the API, remember: “count frames, stop before C stack overflow”.

## 10. What this unlocks

Understanding the recursion depth limit lets you safely implement depth-first search, recursive descent parsers, tree traversals, and dynamic-programming recurrences without crashing production systems.

- Next topic: converting recursive algorithms to explicit-stack iterative versions  
- Later: trampolines and continuation-passing style for languages without tail-call optimisation  
- Related: `threading.stack_size()` for raising the real C stack when truly deep recursion is required

## 11. Self-check — five questions, no answers

1. What single integer does `sys.getrecursionlimit()` return by default, and what does that integer represent?  
2. Write a two-line snippet that demonstrates a `RecursionError` with a recursion depth of exactly 20.  
3. Why can you still crash the interpreter even after calling `sys.setrecursionlimit(10**6)`?  
4. Convert the following recursive function into an iterative equivalent that never touches Python’s recursion limit:  
   ```python
   def sum_to(n):
       return 0 if n == 0 else n + sum_to(n-1)
   ```  
5. A colleague claims “our tree is only 800 levels deep, so recursion is safe.” Identify the hidden assumption and the concrete counter-measure you would demand before shipping the code.