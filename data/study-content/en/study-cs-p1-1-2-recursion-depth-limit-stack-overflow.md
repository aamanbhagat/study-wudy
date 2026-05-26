## 1. The one-sentence answer
**Python imposes a fixed recursion depth limit to prevent the call stack from exhausting available memory.**

Every function call allocates a new frame on the call stack. When a recursive function calls itself, each invocation pushes another frame. After a preset number of such pushes the interpreter raises `RecursionError` rather than letting the process crash. The default limit is 1000 frames; it can be inspected with `sys.getrecursionlimit()` and changed with `sys.setrecursionlimit()`, but the underlying operating-system stack still has a hard ceiling.

A recursive call therefore behaves like an ordinary function call that happens to target the same function; the only difference is that the chain of pending returns grows linearly with depth. When that chain exceeds the interpreter’s guard value, Python aborts before the C-level stack overflows.

> [!NOTE]
> The limit is not a property of recursion itself; it is an explicit safeguard that turns an otherwise fatal memory-corruption error into a catchable Python exception.

## 2. Why this matters — concrete and current
Google’s recursive descent parser inside the V8 JavaScript engine uses a controlled recursion depth when parsing deeply nested expressions; exceeding the limit triggers a stack-guard check that prevents browser crashes on malicious input.  
NASA’s flight-software verification tools employ recursive abstract-syntax-tree walkers on million-line codebases; the recursion limit is deliberately lowered to 200 so that any stack overflow is detected during static analysis rather than at runtime on the spacecraft.  
PyTorch’s autograd engine walks computation graphs with a recursive `backward` traversal; the framework caps recursion at 1000 and falls back to an iterative path when the graph is deeper, guaranteeing that training jobs on large models never terminate with an unhandled stack overflow.  
Modern CPU cache-hierarchy simulators used by Intel’s compiler team model recursive function-call sequences to measure stack-frame pressure; the same depth limit that Python enforces appears in their micro-benchmarks, allowing direct comparison between language runtimes and hardware stack bounds.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Function call mechanics  | Recursion re-uses the ordinary call/return protocol.      |
| Call stack               | Each recursive invocation occupies one more stack frame.  |
| Base case                | Without a terminating condition recursion is unbounded.   |
| Python’s `sys` module    | Provides the only official API to read or raise the limit.|

## 4. Building the idea — from intuition to formalism

### Step 1 — A function call occupies space
A call to any function allocates a fresh activation record containing local variables, parameters, and the return address.  
Example: `def f(x): return x+1` called with `f(3)` creates one frame holding `x=3`.  
Formal statement:  
$$
\text{frame}(f, \text{args}) \in \text{CallStack}
$$  
> [!WARNING] Treating a recursive call as “free” in memory will later produce silent crashes instead of clean exceptions.

### Step 2 — Recursion chains frames
When the body of a function issues a call to itself, the new frame is pushed on top of the still-resident caller frame.  
Example: `def fact(n): return 1 if n==0 else n*fact(n-1)` with `fact(3)` produces frames for `fact(3)`, `fact(2)`, `fact(1)`, `fact(0)`.  
Formal statement:  
$$
\text{depth} = |\{f_i \mid f_i \text{ is a recursive invocation still on stack}\}|
$$

### Step 3 — The interpreter records a maximum depth
Python’s virtual machine maintains an integer counter incremented on each recursive entry and decremented on return.  
Formal statement:  
$$
\text{if depth} > \text{sys.getrecursionlimit()} \implies \text{raise RecursionError}
$$

### Step 4 — The limit is an implementation constant, not a hardware limit
The default value 1000 is chosen by CPython maintainers; it is unrelated to the operating-system stack size (which is usually measured in megabytes).  
Formal statement:  
$$
\text{limit} \in \mathbb{N},\quad \text{limit} \text{ is mutable via } \texttt{sys.setrecursionlimit}
$$

### Step 5 — Exceeding the limit aborts before hardware overflow
Because the check occurs inside the interpreter loop, the process never executes the instruction that would write past the OS guard page.  
Formal statement:  
$$
\text{safe recursion depth} \le \min(\text{Python limit}, \lfloor \text{OS stack size}/\text{frame size}\rfloor)
$$

## 5. Worked examples — every step shown

**Example 1 — Trivial base case**  
*Given:* `def sum_to(n): return 0 if n==0 else n+sum_to(n-1)` called with `n=5`.  
*Find:* maximum depth reached.  
Call 1: `sum_to(5)` depth=1  
Call 2: `sum_to(4)` depth=2  
Call 3: `sum_to(3)` depth=3  
Call 4: `sum_to(2)` depth=4  
Call 5: `sum_to(1)` depth=5  
Call 6: `sum_to(0)` depth=6, base case returns.  
**6**  
*Reflection:* Depth equals number of pending returns; the base case is reached before any limit check.

**Example 2 — Hitting the default limit**  
*Given:* `def inf(): return inf()` executed under default limit 1000.  
*Find:* exception raised.  
Depth increases from 1 to 1000. At depth 1001 the interpreter test fails.  
**RecursionError: maximum recursion depth exceeded**  
*Reflection:* The error occurs on entry to the 1001st frame, not on return.

**Example 3 — Raising the limit**  
*Given:* `import sys; sys.setrecursionlimit(2000); def f(n): return f(n-1) if n else 0` called with 1500.  
Depth reaches 1500 < 2000, returns normally.  
**0**  
*Reflection:* The new limit is accepted, yet the OS stack may still be smaller.

**Example 4 — Tail recursion does not help in CPython**  
*Given:* `def tail(n, acc=0): return acc if n==0 else tail(n-1, acc+n)` with `n=2000`.  
Each call still allocates a frame because CPython does not implement tail-call elimination.  
**RecursionError at depth 1001**  
*Reflection:* Algorithmic tail position is irrelevant; the language implementation decides frame reuse.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming “Python will just use more stack” | The limit is an explicit guard, not dynamic allocation | Always test with `getrecursionlimit` before deep recursion |
| Confusing recursion depth with time complexity | Depth measures pending calls, not total work | Count frames on paper for small inputs first |
| Setting the limit above the OS stack size | Python’s check is independent of hardware limits | Measure frame size (`sys.getsizeof`) and stay well below OS limit |
| Expecting tail-call optimisation | CPython never eliminates tail calls | Convert to iteration when depth is data-dependent |
| Using recursion for every tree walk | Deep trees (JSON, AST) exceed 1000 levels | Provide an explicit stack or iterative walker |
| Ignoring the exception in libraries | Third-party code may raise `RecursionError` silently | Wrap recursive entry points in `try/except RecursionError` |
| Treating the limit as constant across Python implementations | PyPy and Jython use different defaults | Read the implementation’s documentation, never hard-code 1000 |

## 7. The textbook-precise statement
In CPython the recursion limit \(L\) is an attribute of the interpreter state. Before executing a `CALL_FUNCTION` opcode the VM performs  
$$
\text{if } \texttt{recursion_depth} + 1 > L \text{ then raise } \texttt{RecursionError}.
$$  
\(L\) defaults to 1000 and may be altered only via the C-API or `sys.setrecursionlimit`. The guarantee is that no Python-level recursive call will ever write beyond the interpreter’s own safety margin; hardware stack overflow remains possible if \(L\) is set larger than the OS allocation. (Reference: CPython source `Python/ceval.c`, function `PyEval_EvalFrameEx`, and `Objects/frameobject.c`.)

## 8. Visual — diagram or schematic
```text
Call Stack (grows downward)
+-------------------+  address 0x7fff...
| frame: main       |
+-------------------+
| frame: f(1000)    |
+-------------------+
| frame: f(999)     |
+-------------------+
      ...
+-------------------+
| frame: f(2)       |
+-------------------+
| frame: f(1)       |  <-- depth = 1000
+-------------------+
| frame: f(0)       |  <-- next push triggers RecursionError
+-------------------+  <-- guard page (OS)
```

## 9. The memory technique
1. **The hook** — picture a librarian who allows only 1000 books to be stacked on a desk; the 1001th book makes the whole tower crash, so the librarian shouts “RecursionError” first.  
2. **What to overlearn** — default limit = 1000; `sys.getrecursionlimit()`, `sys.setrecursionlimit(k)`, `RecursionError`.  
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — rebuild from the fact that each call pushes a frame and the interpreter counts frames.

## 10. What this unlocks
Understanding the recursion depth limit lets you decide when recursion is safe and when an explicit stack or iteration is required.  

- Tree and graph traversals beyond depth 1000  
- Converting recursive algorithms to iterative form using an explicit stack  
- Designing language runtimes that must coexist with OS stack guards  
- Writing robust parsers and expression evaluators  

## 11. Self-check — five questions, no answers
1. What single integer does `sys.getrecursionlimit()` return by default in CPython 3.12?  
2. Write a one-line recursive function that will always raise `RecursionError` on any positive integer input under the default limit.  
3. If you call `sys.setrecursionlimit(10**6)`, is it possible for the program to segfault? Explain the conditions.  
4. A JSON document contains 1200 nested arrays. Will `json.loads` succeed or raise `RecursionError`? Why?  
5. Convert the following recursive definition into an equivalent loop that never touches Python’s recursion limit:  
   `def depth(node): return 0 if node is None else 1 + max(depth(node.left), depth(node.right))`.