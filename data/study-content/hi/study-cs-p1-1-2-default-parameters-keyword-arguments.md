## 1. The one-sentence answer

**Default parameters let a function supply its own values when an argument is omitted, while keyword arguments let you pass values by name instead of position.**

Iska matlab yeh hai ki jab aap ek function define karte ho aur kuch parameters ko already ek value de dete ho, to caller us value ko skip kar sakta hai. Keyword arguments ka use karke aap explicitly bata sakte ho ki kaunsa parameter kis value se set ho raha hai, bina order yaad rakhne ke. Dono features saath mil kar function calls ko readable aur flexible bana dete hain bina har baar extra code likhe.

Yeh dono Python ke function definition aur call mechanism ka hissa hain. Jab aap `def greet(name, msg="Hello"):` likhte ho, `msg` ek default parameter ban jaata hai. Jab aap `greet("Ali", msg="Hi")` call karte ho, to keyword argument use ho raha hai.

> [!NOTE]
> The single most important insight is that default values are evaluated only once—at the moment the `def` statement runs—not on every call. This single rule explains almost every surprising behaviour you will ever see with mutable defaults.

## 2. Why this matters — concrete and current

FastAPI uses default parameters and keyword arguments to declare query parameters and request bodies with sensible fallbacks; changing one default instantly updates the generated OpenAPI schema used by millions of production endpoints.

PyTorch’s `torch.nn.Linear(in_features, out_features, bias=True)` relies on the `bias=True` default so that researchers can omit the argument in 90 % of model definitions while still allowing explicit `bias=False` for custom layers in papers such as “Attention Is All You Need”.

The CPython interpreter itself (Objects/funcobject.c) uses keyword-argument handling to implement the C-API `PyObject_CallFunctionObjArgs` and the faster vectorcall protocol that powers every Python 3.8+ function call inside pandas and NumPy.

Django’s ORM methods such as `filter(status="active", created__year=2023)` are implemented with keyword arguments; this design lets the query planner receive named conditions without caring about column order in the model definition.

SpaceX’s ground-support Python tooling passes hundreds of telemetry parameters to analysis routines using keyword arguments so that engineers can reorder or omit non-critical fields without touching call sites across the launch-control codebase.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Function definition syntax (`def`, parameters, colon, indented body) | You must be able to write the header where defaults appear |
| Positional argument passing | Defaults only make sense once you understand what “missing” means |
| Variable assignment and evaluation order | Explains why defaults are evaluated at `def` time, not call time |

If any row above is unclear, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Missing arguments must be handled
Aap ek function likhte ho jo do values maangta hai lekin caller sirf ek deta hai. Python error dega jab tak aap explicitly nahi batate ki dusri value kya honi chahiye.

Example: `def add(a, b): return a + b` called as `add(3)` raises `TypeError`.

Formal statement: A function with arity \(n\) requires exactly \(n\) positional arguments unless defaults are declared.

> [!WARNING]
> If you assume the missing argument will be `None` or zero, later code will silently produce wrong results instead of failing fast.

### Step 2 — Default values are written in the signature
`def add(a, b=0):` likhne se `b` ka default `0` ho jaata hai. Jab caller `add(3)` karta hai, Python automatically `b = 0` set kar deta hai.

Formal: In the parameter list, any parameter after the first default must also have a default (syntax rule).

### Step 3 — Defaults are bound once at definition time
Jab Python `def` statement execute karta hai, har default expression evaluate hota hai aur result function object ke `__defaults__` tuple mein store ho jaata hai. Har call par naya evaluation nahi hota.

Formal: \(\text{default}_i = \text{eval}(expr_i)\) at `def` time; subsequent calls read the stored value.

> [!WARNING]
> Using a mutable default such as `def f(items=[])` means every call shares the same list; mutations persist across calls.

### Step 4 — Keyword arguments override position
Caller `add(b=5, a=2)` likh sakta hai. Python parameter names match karta hai aur position ki zaroorat nahi padti.

Formal: In a call, any argument of the form `name=value` binds directly to the parameter named `name`.

### Step 5 — Mixing positional and keyword arguments follows strict ordering
Positional arguments pehle aane chahiye; keyword arguments baad mein. Ek hi parameter ko dono tarah se dena `TypeError` deta hai.

Formal: Call syntax is `func(pos₁, …, posₖ, kw₁=val₁, …)` where the names in `kw` must not already be bound by positional arguments.

### Step 6 — Final binding rule (textbook form)
After all positional and keyword bindings, any still-unbound parameters receive their default values if they exist; otherwise `TypeError` is raised.

## 5. Worked examples — har step show karo

**Example 1 — Simple default**
- *Given:* `def greet(name, msg="Hello"): return f"{msg}, {name}"`
- *Find:* `greet("Ali")`
- Python looks up `msg` in the stored defaults → `"Hello"`.
- Result string is built.
**"Hello, Ali"**

*Reflection:* The example shows the most common happy path; no surprises yet.

**Example 2 — Keyword call overrides default**
- *Given:* Same `greet` function.
- *Find:* `greet("Ali", msg="Hi")`
- Keyword `msg` matches the parameter name and replaces the default.
- String uses the supplied value.
**"Hi, Ali"**

*Reflection:* Demonstrates that keyword arguments take precedence over defaults.

**Example 3 — Mutable default trap**
- *Given:* `def append_item(item, lst=[]): lst.append(item); return lst`
- *Find:* `append_item(1); append_item(2)`
- Both calls receive the identical list object created at `def` time.
- First call mutates it to `[1]`, second sees `[1, 2]`.
** [1, 2] **

*Reflection:* The single evaluation rule is now visible as a bug; the fix is `lst=None` plus an `if` guard.

**Example 4 — Mixed call with multiple defaults**
- *Given:* `def power(base, exp=2, mod=None): return pow(base, exp, mod) if mod else base**exp`
- *Find:* `power(3, mod=5)`
- Positional binds `base=3`; `exp` keeps default 2; keyword binds `mod=5`.
- `pow(3, 2, 5)` evaluates to 4.
**4**

*Reflection:* Shows that keyword arguments can skip earlier parameters that have defaults.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Mutable default list/dict         | Default evaluated once at `def`             | Use `None` sentinel and create inside function       |
| Forgetting that keyword must match exact parameter name | Python does not do fuzzy matching           | Always copy the exact spelling from the `def` line   |
| Placing a positional-only parameter after a default | Syntax error                                | Follow the rule: all parameters after first default need defaults |
| Re-binding the same argument both positionally and by keyword | Python raises `TypeError`                   | Decide call style before writing; prefer keywords for clarity |
| Assuming defaults are re-evaluated each call | Surprising shared state with mutables       | Mentally replace default with a constant at definition time |
| Using `def f(a, b=foo())` where `foo` has side effects | Side effect runs at import time, not call time | Move expensive or side-effect code inside the function body |

## 7. The textbook-precise statement

From the Python Language Reference (3.12), §8.3.4 “Function definitions”:

A parameter of the form `identifier = expression` defines a default value. The expression is evaluated once, when the function definition is executed, and the resulting value is stored in the function object’s `__defaults__` attribute. During a call, unbound parameters are bound to their corresponding default values. Keyword arguments are matched by name against the parameter list; it is a `TypeError` to supply a value for a parameter more than once or to supply a keyword that does not correspond to any parameter.

## 8. Visual — diagram or schematic

```text
def f(a, b=10, c=20):
          │     │
          │     └── default stored at def time
          └──────── default stored at def time

Call: f(3, c=99)
      │  │   └── keyword binds c, skips b
      │  └── positional binds a
      └── no value for b → uses stored default
```

## 9. The memory technique

**The hook** — Picture a vending machine whose default drink is already taped to the button; you only press the button once when the machine is built, not every time someone buys.

**What to overlearn** — (1) Defaults are evaluated exactly once at `def`. (2) Keyword arguments always follow the form `name=value`. (3) Mutable defaults are almost never what you want.

**Spaced-repetition schedule** — Review the mutable-default trap after 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback** — If you forget the rule, mentally delete the default expression, imagine the function object is created with a constant, and ask “when was that constant created?”

## 10. What this unlocks

You can now read and write clean function signatures that scale to real libraries. This directly prepares you for:

- `*args` and `**kwargs` for truly variadic functions
- Decorators that must preserve default signatures (`functools.wraps`)
- Type-hint defaults in static checkers (`def f(x: int = 0) -> int`)
- Class `__init__` methods that accept many optional configuration values

## 11. Self-check — five questions, no answers

1. What is printed by `def f(x, items=[]): items.append(x); print(items); f(1); f(2)`?
2. Why does `def g(a=1, b): pass` raise `SyntaxError`?
3. Write a call to `pow(base=2, exp=10, mod=1000)` using only keyword arguments.
4. A colleague writes `def connect(host, timeout=30, port): …`. Identify the bug and fix it.
5. Predict the output of `def h(a, b=print("default")): pass` followed by two calls `h(1)` and `h(2)`.