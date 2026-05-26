## 1. The one-sentence answer
**Default parameters supply values that a function uses when a caller omits an argument, while keyword arguments let a caller identify arguments by name rather than by position.**

A function definition lists parameters in a fixed order. When the definition also supplies an equals-sign expression after a parameter, that expression becomes the default value used whenever the corresponding argument is absent at the call site. Because defaults are evaluated once at definition time, they behave like compile-time constants attached to the function object itself.

Keyword arguments decouple the order of values supplied at the call site from the order declared in the definition. The caller writes `parameter_name=value`, and Python matches the name against the formal parameter list. This mechanism works only after all positional arguments have been consumed.

> [!NOTE]
> The decisive insight is that defaults live inside the function object, not inside each call; therefore a mutable default (a list or dictionary) is shared across every invocation that omits the argument.

## 2. Why this matters — concrete and current
In scikit-learn every estimator constructor (for example `RandomForestClassifier`) declares more than twenty hyperparameters with sensible defaults; a practitioner can therefore write `RandomForestClassifier()` and obtain a working baseline, then override only `n_estimators=500` by keyword when tuning.

SpaceX’s flight-software test harness defines telemetry-logging routines whose many optional fields (bit-rate, packet-size, encryption flag) carry defaults that match the most common vehicle configuration; test engineers invoke the logger with only the handful of values that differ for a given test article.

The CPython interpreter itself uses default parameters inside the `compile` built-in and the `ast` module so that tools such as mypy or pylint can request a specific optimisation level without enumerating every preceding flag.

Flask route decorators (`@app.route('/user/<int:id>', methods=['GET'])`) rely on keyword arguments for the `methods` list; omitting the keyword would force every developer to remember the exact positional order of every decorator option.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Positional argument passing| Defaults only become visible once you understand what happens when fewer arguments than parameters are supplied. |
| Function object lifetime   | Defaults are stored on the function object at definition time, not recreated on each call. |
| Name lookup rules          | Keyword arguments are resolved by name lookup in the parameter list. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A function without defaults
A bare function requires every declared parameter to receive a value at each call.  
```python
def add(a, b):
    return a + b
```
Calling `add(3)` raises `TypeError`.  
Formally, the arity of the call must equal the arity of the definition.

> [!WARNING]
> Forgetting that Python enforces arity at runtime (unlike some languages with implicit defaults) produces opaque “missing argument” errors later in a call stack.

### Step 2 — Attaching a default expression
Appending `=value` after a parameter tells the compiler to store that value inside the function’s `__defaults__` tuple.  
```python
def add(a, b=0):
    return a + b
```
`add(3)` now returns 3 because the missing second argument is taken from the stored default.

### Step 3 — Restriction on ordering
Python’s grammar requires that every parameter with a default appears after every parameter without one.  
Violation produces `SyntaxError: non-default argument follows default argument`.

### Step 4 — Keyword argument syntax at the call site
An argument written as `name=value` bypasses positional matching.  
`add(b=5, a=2)` is legal and equivalent to `add(2, 5)`.

### Step 5 — Mixing positional and keyword arguments
All positional arguments must precede any keyword argument in the same call.  
`add(2, b=5)` is valid; `add(b=5, 2)` is not.

### Step 6 — The formal parameter-binding algorithm
Python binds arguments in three ordered phases: (1) positional arguments fill parameters left-to-right, (2) keyword arguments fill remaining unfilled parameters by name, (3) any still-unfilled parameters receive their defaults. If any parameter remains unfilled after phase 3, `TypeError` is raised.

## 5. Worked examples — every step shown

**Example 1 — Single default**  
*Given:* `def greet(name, greeting="Hello"):`  
*Find:* value of `greet("Ada")`.  
Step 1: positional argument `"Ada"` binds to `name`.  
*Why:* first phase of binding consumes the sole positional argument.  
Step 2: `greeting` has no positional value, so its default `"Hello"` is used.  
*Why:* phase 3 of the binding algorithm.  
**"Hello Ada"**

*Reflection:* the example isolates the default mechanism without keyword syntax.

**Example 2 — Overriding a default with a keyword**  
*Given:* the same `greet`.  
*Find:* `greet("Ada", greeting="Hi")`.  
Step 1: `"Ada"` binds positionally to `name`.  
*Why:* positional phase.  
Step 2: keyword `greeting="Hi"` binds by name.  
*Why:* phase 2 overrides the default.  
**"Hi Ada"**

*Reflection:* demonstrates that a keyword can target any parameter, default or not.

**Example 3 — Multiple defaults and selective override**  
*Given:* `def power(base, exp=2, mod=None):`  
*Find:* `power(3, mod=5)`.  
Step 1: `3` binds to `base`.  
Step 2: `mod=5` binds by name; `exp` therefore receives its default.  
*Why:* keyword arguments may appear in any order after positionals.  
**8** (i.e., 3² % 5).

*Reflection:* shows that keywords let the caller skip an intermediate default.

**Example 4 — Mutable default trap**  
*Given:* `def append_to(item, seq=[]): seq.append(item); return seq`  
*Find:* result of two successive calls `append_to(1)` then `append_to(2)`.  
Step 1: first call creates no new list; the single list object stored at definition time receives `1`.  
Step 2: second call receives the identical list object, now containing `[1]`.  
**`[1, 2]`** returned on the second call.

*Reflection:* the trap arises because the default expression is evaluated only once; the remedy is to use `None` and create the mutable inside the function body.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Mutable default value             | Default expression evaluated once at `def` time     | Use `None` sentinel and allocate inside the body     |
| Keyword after positional in call  | Grammar requires all positionals first              | Write every keyword argument after the last positional |
| Non-default after default in def  | Python’s grammar forbids it                         | Move all defaults to the right of non-defaults       |
| Shadowing a parameter name        | Keyword argument name collides with a local         | Choose distinct names or use `*` to force keywords   |
| Forgetting that defaults are static | Confusion with call-time evaluation in other languages | Remember `__defaults__` tuple on the function object |
| Over-reliance on many defaults    | Readability collapses when >4 defaults exist        | Use a configuration dataclass or explicit keywords   |
| Rebinding a default inside function | Alters the shared default object for future calls   | Never mutate a default; rebind only local names      |

## 7. The textbook-precise statement
A function definition of the form  
```python
def f(p1, p2, …, pk, pk+1=v_{k+1}, …, pn=v_n):
```
is well-formed only when every parameter after the first default also carries a default. At each call `f(a1, …, am, qj=wj, …)`, arguments are bound by the algorithm given in the Python Language Reference, §8.3.4 (parameter binding). The resulting local namespace contains a binding for every parameter; any parameter that received neither a positional nor a keyword argument receives the value stored in the function’s `__defaults__` tuple. (Van Rossum, *Python Language Reference*, release 3.12, §8.3.4.)

## 8. Visual — diagram or schematic
```text
Definition site                     Call site
-------------                       ---------
def f(a, b=10, c=20):               f(3, c=99)
       │   │    │                       │   │
       │   │    └── default c stored    │   └── keyword binds c
       │   └──────── default b stored   └──── positional binds a
       └───────────────────────────────▶ remaining b receives default
```

## 9. The memory technique
1. **The hook** — picture a safety net under a trapeze artist: the net (default) is already hanging there; the artist (caller) only needs to grab it when they miss a catch (omit the argument).  
2. **What to overlearn** — (i) defaults must follow non-defaults, (ii) keyword arguments follow all positional arguments, (iii) mutable defaults are evaluated once.  
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — re-derive the three-phase binding algorithm from the grammar rules for parameter lists.

## 10. What this unlocks
Mastery of defaults and keywords lets you read and write the call signatures of virtually every Python library without memorising dozens of positional slots.  

- Next: `*args` and `**kwargs` for variadic functions  
- Next: function decorators that inspect or inject defaults  
- Next: type-hint syntax `def f(x: int = 0) -> int` and static checkers  
- Next: dataclasses and their field(default=…) machinery  

## 11. Self-check — five questions, no answers
1. Write the shortest legal definition of a function `scale` that multiplies its first argument by an optional second argument whose default is 2.  
2. Predict the output of `def f(a=[]): a.append(1); return a` after three separate calls with no arguments.  
3. Which of the following calls is illegal and why: `f(1, b=2)`, `f(b=2, 1)`, `f(1, 2, c=3)`?  
4. Explain why `def g(a, b=[]) ` is accepted by the parser while `def g(a=1, b)` is rejected.  
5. Refactor a call `connect("db", 5432, 30, True)` into an equivalent call that uses only keyword arguments, assuming the parameter names are `host, port, timeout, ssl`.