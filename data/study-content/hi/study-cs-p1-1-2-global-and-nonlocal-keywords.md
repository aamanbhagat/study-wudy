## 1. The one-sentence answer
**Global and nonlocal keywords control how Python resolves and mutates names across different function scopes.**

Python uses lexical scoping, so every name lookup starts in the local namespace and walks outward. The `global` keyword forces a name to be resolved and rebound in the module-level namespace instead of creating a fresh local binding. The `nonlocal` keyword does the same but stops at the nearest enclosing function scope rather than jumping all the way to the global scope. Without these keywords, any assignment inside a nested function silently creates a new local variable, which is the source of most confusion.

When you write `x = 5` inside a function, Python treats `x` as local unless the statement `global x` or `nonlocal x` appears anywhere in that function body. This rule is decided at compile time, not runtime, so the presence of the keyword anywhere in the function changes the binding behaviour for the entire function.

> [!NOTE]
> The single most important insight is that `global` and `nonlocal` are not about “accessing” values—they are about changing which namespace receives the assignment. Reading a variable never requires these keywords; only writing does.

## 2. Why this matters — concrete and current
In Django’s request-handling middleware, a factory function often returns a closure that must mutate a shared configuration counter without polluting the module namespace; `nonlocal` keeps that counter inside the enclosing scope while still allowing mutation.

PyTorch’s `nn.Module` uses closures inside `forward` hooks; engineers rely on `nonlocal` to update running statistics that live in the outer training loop rather than creating accidental local copies that would break gradient accumulation.

In reinforcement-learning libraries such as Stable-Baselines3, the rollout buffer is built by nested functions that need to append to a list defined in the collector scope; `nonlocal` prevents the common error of shadowing the buffer reference.

CPython’s own `decimal` module uses `global` inside a few performance-critical formatting routines to switch the active thread-local context without passing the context object through every call.

Semiconductor EDA tools written in Python (for example, parts of OpenROAD) keep technology-file parameters in a module-level dict; worker functions declared inside a process-pool initializer use `global` to rebind those parameters once per process.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Function scope & namespaces | Determines where a name is stored and looked up           |
| Assignment vs reference   | Assignment creates or rebinds; reference only reads       |
| Nested functions / closures | The only place `nonlocal` is legal and meaningful         |
| LEGB rule                 | The default lookup order that `global`/`nonlocal` override |

If any of the above rows are unfamiliar, pause and review Python’s function-definition and name-resolution rules before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Names live in namespaces
A name is not a value; it is a mapping from an identifier to an object inside a concrete namespace dictionary.  
Example: after `x = 3` at module level, `globals()['x']` returns `3`.  
Formal statement: every module, function, and class maintains its own `dict` that maps identifiers to objects.  
> [!WARNING] Treating a name as universal instead of namespace-relative produces silent local variables.

### Step 2 — Assignment targets the current local namespace by default
Inside any function, the compiler marks every name that appears on the left of an assignment as local unless explicitly declared otherwise.  
Example:  
```python
x = 0
def f():
    x = 1   # creates local x, does not touch module x
```
Formal: if `name` is bound by any assignment statement in the function body and is not declared `global` or `nonlocal`, then `STORE_NAME` bytecode targets the function’s own `f_locals`.  
> [!WARNING] The mere existence of `x = …` anywhere in the function makes every reference to `x` inside that function resolve locally, even before the assignment executes.

### Step 3 — `global` forces the global namespace
Placing `global x` anywhere in the function tells the compiler to emit `STORE_GLOBAL` instead of `STORE_NAME`.  
Example:  
```python
x = 0
def f():
    global x
    x = 1
f()
assert x == 1   # module-level x changed
```
Formal: `global x` adds `x` to the function’s `global` set; all subsequent loads and stores use the module namespace.  
> [!WARNING] Using `global` on a name that does not yet exist in the module silently creates it.

### Step 4 — `nonlocal` targets the nearest enclosing function scope
`nonlocal x` searches outward through enclosing functions until it finds a binding in a function scope (never the module).  
Example:  
```python
def outer():
    x = 0
    def inner():
        nonlocal x
        x = 1
    inner()
    return x
assert outer() == 1
```
Formal: the compiler emits `STORE_DEREF` on the cell object that both scopes share.  
> [!WARNING] `nonlocal` raises `SyntaxError` if no enclosing function binding exists.

### Step 5 — Read access never requires the keywords
You may freely read a global or enclosing name without any keyword; only assignment triggers the need for `global`/`nonlocal`.  
Formal: `LOAD_GLOBAL` or `LOAD_DEREF` work without declaration; only store operations are affected.

### Step 6 — Textbook-grade rule (summary)
A name is resolved at compile time according to the nearest applicable declaration in the following order: `nonlocal`, `global`, or implicit local. The resulting bytecode instruction (`STORE_NAME`, `STORE_GLOBAL`, or `STORE_DEREF`) decides the namespace that receives any later assignment.

## 5. Worked examples — har step show karo

**Example 1 — Simple global counter**  
*Given:* module variable `count = 0` and a function that must increment it.  
*Find:* correct way to mutate it.  
```python
count = 0
def inc():
    global count
    count += 1   # expands to count = count + 1
inc()
```
*Why:* `global` tells the compiler the assignment must target the module dict.  
**Final answer:** `count == 1` after the call.  
*Reflection:* Without `global`, a new local `count` would be created and the module variable would remain zero.

**Example 2 — Nonlocal in a counter factory**  
*Given:* a function that returns an incrementing closure.  
*Find:* implementation that preserves state between calls.  
```python
def make_counter():
    x = 0
    def inc():
        nonlocal x
        x += 1
        return x
    return inc
c = make_counter()
```
*Why:* `nonlocal` binds `x` to the cell created by `outer`, allowing mutation across calls.  
**Final answer:** successive calls return 1, 2, 3, …  
*Reflection:* This pattern replaces class-based state for simple cases.

**Example 3 — Mixing global and local names**  
*Given:* both a global `x` and a local `x` inside the same function.  
*Find:* which value each reference sees.  
```python
x = "global"
def f():
    x = "local"
    print(x)          # local
    global x
    print(x)          # still local because declaration is late
```
*Why:* the compiler marks `x` local for the entire function as soon as any assignment exists, regardless of keyword placement.  
**Final answer:** prints `"local"` twice.  
*Reflection:* Keyword order does not override the compile-time local decision.

**Example 4 — Nested three levels with selective nonlocal**  
*Given:* three nested functions where the innermost must mutate the middle scope but not the global.  
*Find:* correct keyword usage.  
```python
def outer():
    a, b = 0, 0
    def middle():
        nonlocal a          # only a
        a = 1
        b = 2               # creates local b in middle
        def inner():
            nonlocal a
            a = 3
        inner()
    middle()
    return a, b
```
*Why:* `nonlocal a` in both middle and inner refers to the same cell in `outer`; `b` remains untouched.  
**Final answer:** returns `(3, 0)`.  
*Reflection:* Each `nonlocal` climbs only to its nearest enclosing function scope.

## 6. Common traps and how to avoid them

| Trap                                      | Why it happens                                      | How to avoid it                                      |
|-------------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting `global` and wondering why the outer variable never changes | Assignment creates a local by default               | Always ask “will I assign this name?” before writing the function |
| Using `nonlocal` at module level          | Keyword is valid only inside a nested function      | Reserve `nonlocal` for closures; use `global` at top level |
| Declaring `global` after the first assignment | Compiler already decided the name is local          | Place the keyword at the very top of the function body |
| Shadowing a global with an argument of the same name | Parameter itself is a local assignment              | Rename the parameter or the global                   |
| Expecting `nonlocal` to reach the module  | `nonlocal` deliberately stops at the first enclosing function | Use `global` when you truly need module scope        |
| Mutating a mutable default argument instead of using nonlocal | Lists/dicts are mutable so mutation looks like it works | Prefer explicit `nonlocal` for clarity               |
| Trying to `nonlocal` a comprehension variable | Comprehensions have their own scope since Python 3  | Move the logic into an explicit nested function      |

## 7. The textbook-precise statement
From the Python Language Reference (3.12), §4.2.2:

> If a name binding operation occurs anywhere within a function block, all uses of the name within the block are treated as references to the local variable unless the name is declared `global` or `nonlocal`. A `global` declaration causes the name to be treated as a global variable; a `nonlocal` declaration causes the name to be treated as a variable in the nearest enclosing function scope that contains a binding for that name.

All hypotheses are explicit: the rule applies only to function blocks, the declaration may appear anywhere inside the block, and `nonlocal` requires at least one enclosing function scope with a prior binding.

## 8. Visual — diagram or schematic
```text
Module namespace
┌────────────────────┐
│ count = 0          │◄── global count
└────────────────────┘
        ▲
        │ global
┌───────┴──────┐
│ def inc():   │
│   global count│
│   count += 1 │
└──────────────┘

Outer function
┌────────────────────┐
│ x = 0              │
│   ▲                │
│   │ nonlocal       │
│ ┌─┴────────────┐   │
│ │ def inner(): │   │
│ │   nonlocal x │   │
│ │   x = 1      │   │
│ └──────────────┘   │
└────────────────────┘
```

## 9. The memory technique

1. **The hook**  
   Picture two concentric rooms. `global` is a skylight straight to the roof (module). `nonlocal` is a door to the room immediately outside your current room.

2. **What to overlearn**  
   - Assignment inside a function creates a local unless `global`/`nonlocal` is present.  
   - `nonlocal` never reaches the module level.  
   - The keywords affect only the compile-time binding decision.

3. **Spaced-repetition schedule**  
   Review the three bullet facts above after 1 day, 3 days, 7 days, 16 days, and 35 days.

4. **First-principles fallback**  
   If you forget the keyword, ask: “Which namespace must receive the new binding?” Then insert the matching keyword at the top of the function.

## 10. What this unlocks
Once you control scope mutation you can implement closures, decorators that maintain state, and lightweight objects without classes.

- Next topics: closures as first-class objects, decorator factories, and the `cell` object internals.  
- Later: `contextvars` for async-safe “global-like” storage, and `unittest.mock` patch decorators that rely on the same scoping rules.

## 11. Self-check — five questions, no answers
1. What single line added to a function turns every assignment of `total` into a module-level mutation?  
2. Why does the following code raise `SyntaxError`?  
   ```python
   x = 1
   nonlocal x
   ```
3. In a three-level nesting, which scope does `nonlocal y` inside the innermost function affect if `y` exists in both outer levels?  
4. Predict the output:  
   ```python
   x = 0
   def f():
       x = 1
       def g():
           global x
           x = 2
       g()
       print(x)
   f(); print(x)
   ```  
5. A student writes `nonlocal x` yet still gets an `UnboundLocalError` on the first read of `x`. What is the most likely cause?