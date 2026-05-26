## 1. The one-sentence answer
**The `global` and `nonlocal` keywords explicitly grant a function write access to a name that lives outside its own local scope.**

In Python every assignment creates or rebinds a name inside the current function’s local namespace unless the name has been declared with one of these two keywords. Without the declaration the interpreter treats the name as local, shadowing any outer binding and raising an `UnboundLocalError` on first read if the assignment has not yet occurred. The `global` keyword reaches the module-level namespace; the `nonlocal` keyword reaches the nearest enclosing function scope that actually contains the name.

The distinction matters only when mutation is required. Reading an outer name works without any keyword because Python performs a lookup up the scope chain. Writing, however, is a deliberate act that must be annotated so the compiler can allocate the correct storage cell at bytecode-generation time.

> [!NOTE]
> The single most important insight is that these keywords do not import or copy values; they change which namespace the assignment operator targets.

## 2. Why this matters — concrete and current
In reinforcement-learning training loops at DeepMind, a shared step counter must be incremented inside both the data-collection actor and the learner thread; `global` keeps the counter in the module namespace so both coroutines see the same integer object without passing it through every function signature.

Numerical weather-prediction codes at ECMWF wrap legacy Fortran kernels in Python. A configuration object holding grid dimensions is declared `global` inside a just-in-time compilation helper so that the same object can be mutated by both the Python driver and the generated C extension without repeated argument marshalling.

In the CPython interpreter itself, the `nonlocal` keyword appears in the implementation of generator and coroutine state machines; the frame object stores cells that the `nonlocal` declaration lets the `YIELD_VALUE` opcode mutate without exposing those cells on the public C-API.

Library authors of context managers such as `contextlib.contextmanager` rely on `nonlocal` to let user-supplied generator code update a hidden “entered” flag that the wrapper must inspect after `__exit__`.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Python name-binding rules | Assignment never mutates an existing object; it rebinds a name in a specific namespace |
| LEGB lookup order        | Explains why reads succeed without keywords while writes do not |
| Function scope vs module scope | Distinguishes `global` from `nonlocal` targets            |
| Cell objects             | The runtime mechanism that actually implements `nonlocal` |

## 4. Building the idea — from intuition to formalism

### Step 1 — Assignment always targets a scope
An unqualified assignment `x = …` creates or updates a local name unless the compiler has been told otherwise.  
Example:
```python
x = 0
def f():
    x = 1      # local x, unrelated to outer x
```
Formal statement: the compiler emits `STORE_FAST` for an unqualified assignment inside a function.  
> [!WARNING]  
> Assuming that `x = 1` will mutate the outer `x` produces a silent local shadow and later `UnboundLocalError` on read-before-write.

### Step 2 — The `global` declaration redirects the target namespace
Placing `global x` before any assignment tells the compiler to emit `STORE_GLOBAL` instead of `STORE_FAST`.  
Example:
```python
x = 0
def f():
    global x
    x = 1
```
The formal effect is that the name `x` is entered into the function’s `co_globals` table rather than its `co_varnames`.

### Step 3 — Nested functions introduce an additional enclosing scope
When a function is defined inside another function, three namespaces become reachable: local, enclosing, and global.  
Example:
```python
def outer():
    x = 0
    def inner():
        x = 1   # still creates a new local
```
Without annotation the inner assignment again targets a fresh local cell.

### Step 4 — `nonlocal` selects the nearest enclosing cell
The keyword `nonlocal x` forces the compiler to emit `STORE_DEREF` targeting the cell object that the enclosing scope allocated for `x`.  
Formal bytecode: the name appears in `co_freevars` of the inner function and `co_cellvars` of the outer function.

### Step 5 — The cell protocol at runtime
A cell is a small heap object that holds a pointer to the actual value. Both the outer and inner frames hold references to the same cell; therefore mutation is visible to all readers.  
This completes the textbook rule: an unqualified assignment is local; `global` forces module scope; `nonlocal` forces the nearest enclosing function scope that defines the name.

## 5. Worked examples — every step shown

**Example 1 — Simple global counter**  
*Given:* module-level `count = 0` and a function that must increment it.  
*Find:* correct increment without `UnboundLocalError`.  
```python
count = 0
def inc():
    global count          # Step 1: declare target scope
    count = count + 1     # Step 2: STORE_GLOBAL now used
inc()
```
*Why* the declaration precedes the assignment: the compiler must know the target scope before emitting bytecode.  
**`count == 1`**  
*Reflection:* the pattern generalises to any module-level mutable state that multiple functions must share.

**Example 2 — Nested counter with nonlocal**  
*Given:* an outer accumulator that an inner helper must update.  
*Find:* mutation visible after the inner call.  
```python
def make_counter():
    n = 0
    def inc():
        nonlocal n        # targets outer cell
        n = n + 1
        return n
    return inc
c = make_counter()
```
*Why* `nonlocal` is required: without it `n = n + 1` would create a local `n`.  
**`c() == 1`**  
*Reflection:* the returned closure retains the cell, illustrating why `nonlocal` is the mechanism behind many decorator and factory patterns.

**Example 3 — Mixed scopes**  
*Given:* both a global flag and an enclosing counter.  
*Find:* correct annotations for each.  
```python
debug = False
def make_logger():
    calls = 0
    def log(msg):
        nonlocal calls
        global debug
        calls += 1
        if debug:
            print(msg)
    return log
```
*Why* two different keywords appear: they address two distinct namespaces.  
**Final state:** `calls` lives in the closure cell; `debug` lives at module scope.  
*Reflection:* each keyword is independent; omitting either produces a separate local binding.

**Example 4 — Read-only outer access (no keyword needed)**  
*Given:* an outer constant that is only read.  
*Find:* whether any keyword is required.  
```python
pi = 3.14159
def area(r):
    return pi * r * r   # legal read, no keyword
```
*Why* no keyword appears: LOAD_GLOBAL or LOAD_DEREF works without declaration.  
**Result:** `area(1) == 3.14159`  
*Reflection:* the asymmetry between read and write is the root cause of most beginner errors with these keywords.

## 6. Common traps and how to avoid them

| Trap                                      | Why it happens                                      | How to avoid it                                      |
|-------------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting `global` before `+=`           | `+=` is an assignment, triggering local creation    | Always declare before first use of assignment operator |
| Using `nonlocal` on a name that exists only globally | Compiler searches only enclosing functions          | Check that the target name is defined in an enclosing `def` |
| Expecting `global` to work across modules | Each module has its own global namespace            | Use explicit module objects or package-level singletons |
| Declaring `nonlocal` in the outermost function | No enclosing scope exists to bind to                | Move the variable one level outward or use a class attribute |
| Mutating a mutable default argument instead of using `nonlocal` | Works by accident but hides intent                  | Prefer explicit `nonlocal` for clarity               |
| Shadowing a builtin name with `global`    | Accidental rebinding of `list`, `sum`, etc.         | Never reuse builtin names even with `global`         |
| Assuming `global` creates the name        | The name must already exist at module level         | Initialise the global before the function runs       |

## 7. The textbook-precise statement
A Python function’s namespace is determined at compile time. An assignment to a bare name `x` binds `x` in the local scope unless `x` appears in a `global` or `nonlocal` statement. The `global` statement causes the binding to occur in the global namespace of the module containing the function. The `nonlocal` statement causes the binding to occur in the nearest enclosing function scope that contains `x` as a local or cell variable (Python Language Reference, §4.2.2 and §7.2.1, CPython 3.12).

## 8. Visual — diagram or schematic
```text
Module
└── global x
    └── def outer()
        └── cell y
            ├── def inner()
            │   └── nonlocal y  → writes to outer’s cell
            └── after inner() returns, y is still visible to outer
```
The diagram shows three namespaces and the single cell object shared by `outer` and `inner`.

## 9. The memory technique

1. **The hook** — Picture a ladder: bottom rung = local, middle rung = enclosing (`nonlocal`), top rung = module (`global`). Assignment always climbs to the declared rung.
2. **What to overlearn** — (a) `global` → module, (b) `nonlocal` → nearest `def`, (c) read never needs a keyword.
3. **Spaced-repetition schedule** — Review the three-rung image after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from the compiler’s perspective: does the assignment need `STORE_FAST`, `STORE_GLOBAL`, or `STORE_DEREF`?

## 10. What this unlocks
Mastery of explicit scope control is the prerequisite for writing clean closures, decorators, and stateful generators—the building blocks of Python’s functional and asynchronous idioms.

- Next: closures and factory functions
- Next: `contextlib.contextmanager` and `asynccontextmanager`
- Next: mutable default-argument pitfalls and class-based alternatives
- Next: understanding `locals()`/`globals()` introspection APIs

## 11. Self-check — five questions, no answers
1. Predict the output of the following two-line program and explain the bytecode difference:
   ```python
   x = 1
   def f(): x = 2; print(x)
   ```
2. A nested function increments an outer counter only on even calls. Write the minimal correct code.
3. Identify the single line that must be added to eliminate `UnboundLocalError`:
   ```python
   total = 0
   def add(n):
       total = total + n
   ```
4. Why does `nonlocal` raise `SyntaxError` when placed at module level?
5. Construct a minimal example where using a mutable list as a container removes the need for `nonlocal`, then explain why the resulting code is considered inferior in style.