## 1. The one-sentence answer
**Python resolves every unqualified name by searching four nested namespaces in the fixed order Local, Enclosing, Global, Built-in.**

A name is simply an identifier bound to an object. When the interpreter encounters a name it does not yet know, it begins the search inside the function that is currently executing; if the name is absent there, it continues outward through any enclosing functions, then through the module level, and finally through the interpreter’s own built-ins. The first match wins and supplies the object the name refers to.

Because the search order is deterministic and stops at the first hit, the same identifier can safely denote different objects in different scopes without collision. The rule therefore eliminates the need for explicit qualification in the common case while still guaranteeing predictable behaviour when scopes nest.

> [!NOTE]
> The decisive insight is that scope is determined by *where* a name is assigned, not by where it is read; an assignment inside a function creates a local binding unless the name is explicitly declared global or nonlocal.

## 2. Why this matters — concrete and current
In the PyTorch autograd engine, tensor operations are recorded inside nested Python functions that define custom autograd Functions; the LEGB lookup guarantees that the tape object created at module scope remains visible to every inner backward hook without polluting the local namespace of each operation.

NASA’s Jet Propulsion Laboratory uses Python to orchestrate Monte-Carlo simulations of spacecraft trajectories. Mission scripts define global constants for gravitational parameters; nested functions that model individual sensor models read those constants through the global scope while keeping their own intermediate vectors strictly local, preventing accidental mutation during parallel Monte-Carlo trials.

Google’s TensorFlow Probability library implements probabilistic graphical models whose log-probability methods are written as closures inside model classes. The enclosing-scope lookup lets each closure read hyperparameters stored on the model instance without requiring explicit argument passing, keeping the sampling code concise yet free of name clashes when dozens of models are composed.

Semiconductor design teams at TSMC employ Python-based verification harnesses that wrap C++ simulators. Built-in names such as `int` and `len` must remain untouched inside deeply nested test-generation functions; the final stage of the LEGB rule ensures that user-defined variables never accidentally shadow these primitives, preserving correctness of bit-width calculations across millions of test vectors.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Function definition  | Creates the Local and Enclosing namespaces                |
| Assignment statement | Determines whether a name becomes local or refers outward |
| Module import        | Establishes the Global namespace                          |
| Name lookup          | The runtime mechanism that actually walks the four scopes |

## 4. Building the idea — from intuition to formalism

### Step 1 — Assignment creates a local binding
An assignment statement executed inside a function binds the name in that function’s local namespace.  
```python
def f():
    x = 1      # assignment occurs here
```
The formal rule is: if a name is bound by an assignment, augmented assignment, or `for`, `with`, or `except` target anywhere in a function body, the compiler marks it local for the entire function.  
> [!WARNING]
> Reading the name before the assignment statement executes raises `UnboundLocalError`, not `NameError`.

### Step 2 — Reading follows the outward search
When a name is referenced but not assigned inside the current function, Python searches outward: first any enclosing function, then the global module scope, then the built-in namespace.  
```python
x = 42
def outer():
    def inner():
        return x   # resolved in global scope
```
No mathematical notation is required; the search is simply a chain of four dictionaries examined in order L→E→G→B.

### Step 3 — The `global` statement overrides locality
The statement `global x` inside a function tells the compiler that every occurrence of `x` refers to the module-level binding, so assignment mutates the global rather than creating a local.  
```python
x = 0
def inc():
    global x
    x = x + 1
```
> [!WARNING]
> Using `global` on a name that does not yet exist in the module creates it on first assignment, which can silently pollute the global namespace.

### Step 4 — The `nonlocal` statement targets the nearest enclosing scope
`nonlocal x` binds the name to the nearest enclosing function’s scope, allowing nested functions to mutate variables defined in outer functions without touching the global scope.  
```python
def counter():
    x = 0
    def inc():
        nonlocal x
        x += 1
        return x
    return inc
```

### Step 5 — Built-in names are the final fallback
Names such as `len`, `int`, `print` reside in the built-in namespace and are examined only after Local, Enclosing, and Global lookups have failed. No user assignment can permanently replace a built-in unless the module explicitly shadows it.

## 5. Worked examples — every step shown

**Example 1 — Simple local assignment**  
*Given:*  
```python
def f():
    x = 5
    return x
```
*Find:* value returned by `f()`.  
Step 1: The assignment `x = 5` occurs inside `f`, therefore `x` is local.  
*Why*: Python’s compiler marks any assigned name local for the whole function.  
Step 2: The return statement reads the local `x`.  
*Why*: Local lookup succeeds first under LEGB.  
**5**  
*Reflection*: The example isolates the Local stage; nothing outside the function can affect the result.

**Example 2 — Enclosing scope read**  
*Given:*  
```python
def outer():
    x = 10
    def inner():
        return x
    return inner()
```
*Find:* value returned by `outer()`.  
Step 1: `inner` contains no assignment to `x`.  
*Why*: Compiler therefore treats `x` as non-local.  
Step 2: Lookup proceeds to the immediately enclosing function `outer`.  
*Why*: Second stage of LEGB.  
**10**  
*Reflection*: Demonstrates that read access crosses function boundaries outward without extra syntax.

**Example 3 — Global mutation via explicit declaration**  
*Given:*  
```python
x = 0
def inc():
    global x
    x += 1
inc()
```
*Find:* value of `x` after the call.  
Step 1: `global x` forces all references to the module binding.  
*Why*: Overrides the default local-creation rule.  
Step 2: Augmented assignment reads and writes the same global cell.  
*Why*: Single lookup occurs in the Global stage.  
**1**  
*Reflection*: Without the `global` keyword the assignment would have created a new local, leaving the outer `x` unchanged.

**Example 4 — Nonlocal in a closure factory**  
*Given:*  
```python
def make_counter():
    count = 0
    def inc():
        nonlocal count
        count += 1
        return count
    return inc
c = make_counter()
print(c(), c())
```
*Find:* printed output.  
Step 1: `nonlocal count` binds `count` to the scope of `make_counter`.  
*Why*: Directs lookup to the Enclosing stage for mutation.  
Step 2: Each call to `c` increments the same cell.  
*Why*: The closure retains the enclosing frame.  
**1 2**  
*Reflection*: Shows how LEGB plus `nonlocal` enables stateful closures without classes or global variables.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| UnboundLocalError on conditional assignment | Compiler marks name local because an assignment exists somewhere in the function | Initialise the variable before any conditional branch or use an explicit `global`/`nonlocal` |
| Accidental shadowing of built-ins   | Assignment creates a local that hides `len` or `list` | Never assign to built-in names; run static checkers such as `flake8` |
| Forgetting `global` in a counter    | Assignment silently creates a local instead of mutating the intended global | Add the `global` declaration at the top of the function |
| Using `nonlocal` across module boundaries | No enclosing function exists at module level       | Use `global` for module-level names                  |
| Nested list mutation without nonlocal | Mutating a mutable object does not rebind the name | Understand that `nonlocal` is needed only for name rebinding, not object mutation |
| Lambda capturing loop variables     | All lambdas close over the same loop variable cell | Use default-argument binding: `lambda x=i: …`        |
| Importing a module inside a function and expecting global visibility | The import binds locally unless declared global    | Perform imports at module scope                      |

## 7. The textbook-precise statement
A Python scope is a textual region of a program where a namespace is directly accessible. The LEGB rule states that an unqualified reference to a name is resolved by examining, in order, the local namespace of the innermost function, the local namespaces of any enclosing functions, the global namespace of the current module, and finally the built-in namespace; the first match supplies the binding. Assignments bind names in the local namespace unless the name appears in a `global` or `nonlocal` statement. (Van Rossum et al., *Python Language Reference*, release 3.12, §4.2 “Naming and binding”.)

## 8. Visual — diagram or schematic
```text
Call stack frame          Namespace chain (LEGB lookup)
+------------------+      +----------------+
|   Built-in       | <--- |  builtins dict |
+------------------+      +----------------+
          ^               ^                
          |               |                
+------------------+      +----------------+
|   Global         | <--- |  module dict   |
+------------------+      +----------------+
          ^               ^                
          |               |                
+------------------+      +----------------+
|   Enclosing      | <--- |  outer func    |
+------------------+      +----------------+
          ^               ^                
          |               |                
+------------------+      +----------------+
|   Local          | <--- |  current func  |
+------------------+      +----------------+
```
Arrows indicate the direction of name search; lookup stops at the first dictionary containing the requested key.

## 9. The memory technique
1. **The hook** — picture four concentric onion layers labelled L-E-G-B; slicing the onion from the inside outward is exactly how Python finds a name.  
2. **What to overlearn** — the four letters in order, the fact that assignment decides locality, and the two keywords `global`/`nonlocal`.  
3. **Spaced-repetition schedule** — review the onion image after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — rebuild the rule by asking, for any name: “Is it assigned here? If not, is it assigned in the nearest enclosing function? If not, is it at module level? If not, is it built-in?”

## 10. What this unlocks
Mastery of LEGB lets you write correct closures, avoid surprising mutations, and design clean module APIs.  

- Nested function factories and decorators  
- Class attributes versus instance variables (next phase)  
- `importlib` and dynamic module reloading  
- Static analysis tools that detect `UnboundLocalError`  

## 11. Self-check — five questions, no answers
1. What single line added to a function turns every assignment to `x` into a module-level write?  
2. A function contains the statement `print(len)` followed later by `len = []`. Which `len` is printed?  
3. Inside a nested function, you need to increment a counter defined in the enclosing function. Which keyword is required?  
4. Predict the output:  
   ```python
   x = 1
   def a():
       x = 2
       def b():
           nonlocal x
           x = 3
       b()
       print(x)
   a()
   print(x)
   ```  
5. A module defines `def f(): print(open)`. Later the same module executes `open = 42`. What does `f()` print?