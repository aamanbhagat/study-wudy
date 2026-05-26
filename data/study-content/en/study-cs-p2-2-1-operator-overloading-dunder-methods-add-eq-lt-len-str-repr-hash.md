## 1. The one-sentence answer
**Operator overloading via dunder methods lets user-defined classes intercept and redefine the behavior of built-in operators and functions by implementing specially named methods such as `__add__`, `__eq__`, `__lt__`, `__len__`, `__str__`, `__repr__`, and `__hash__`.**

Python already knows how to add two integers or compare two strings because those types implement the corresponding dunder methods internally. When you define a class of your own, the language does not magically know what “+” or “==” should mean for instances of that class; it simply looks for an attribute named `__add__` or `__eq__` on the object and calls it if present. Supplying these methods therefore extends the familiar syntax of operators to new types without changing the syntax itself.

The mechanism is entirely explicit: every operator has a fixed name, the interpreter performs a deterministic attribute lookup, and the method you write receives the operands in a predictable order. No hidden rewriting of source code occurs; the only magic is the name lookup.

> [!NOTE]
> The single most important realization is that the operators you already use are merely syntactic sugar for method calls; once you see `a + b` as `type(a).__add__(a, b)`, every subsequent dunder method becomes a predictable extension of the same rule.

## 2. Why this matters — concrete and current
In the CPython implementation of the `decimal` module, the `Decimal` class implements `__add__`, `__mul__`, `__eq__`, and `__lt__` so that financial calculations at banks and exchanges can use ordinary arithmetic syntax while guaranteeing exact decimal rounding instead of IEEE-754 floating-point error.

The `numpy.ndarray` class overloads `__add__`, `__mul__`, `__len__`, and `__getitem__` (closely related) so that every linear-algebra routine written for the SciPy stack can treat arrays exactly like mathematical vectors and matrices; the same code runs unchanged on CPUs, GPUs via CuPy, or TPUs via JAX.

The `pandas` `DataFrame` and `Series` objects rely on `__eq__`, `__lt__`, `__hash__` (when hashable), `__repr__`, and `__str__` to make boolean indexing, sorting, and console display both concise and consistent; thousands of data pipelines at Netflix and Airbnb depend on these definitions remaining stable across releases.

In the Rust Python bindings (PyO3) and the PyTorch C++ extension API, custom tensor types must implement the identical dunder protocol so that a single Python expression such as `model(x) + y` can dispatch to highly optimized kernels without any change to user code.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Python attribute lookup | Dunder methods are discovered by normal `obj.__add__` lookup; you must understand that the interpreter never rewrites source text. |
| Distinction between `==` and `is` | `__eq__` controls value equality; identity remains separate unless you also override `__hash__`. |
| Special method invocation rules | The interpreter bypasses instance `__dict__` for most dunders; you must place them on the class. |
| Hash/equality contract | If two objects compare equal, their hashes must be equal; violating this breaks dicts and sets. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Names the interpreter already knows
Python defines a fixed set of method names that it will look for when an operator appears in source code.  
Example: writing `x + y` causes the interpreter to evaluate `type(x).__add__(x, y)`.  
Formal rule: for every operator token there exists a corresponding dunder name listed in the language reference.  
> [!WARNING] Placing the method only in the instance `__dict__` will not work; the interpreter bypasses instance dictionaries for these names.

### Step 2 — Implementing binary arithmetic
Define `__add__(self, other)` to return a new object representing the sum.  
Example: a `Vector` class stores coordinates; `__add__` returns a fresh `Vector` whose components are pairwise sums.  
Formal signature: `__add__(self, other) -> object`.  
> [!WARNING] Returning `NotImplemented` instead of raising allows the reflected operand (`__radd__`) to be tried.

### Step 3 — Rich comparisons
`__eq__` and `__lt__` (and the other four) let you control `==`, `<`, etc.  
Example: two `Point` objects are equal when both coordinates match.  
Formal contract: `__eq__` must be reflexive, symmetric, and transitive when defined.  
> [!WARNING] Implementing only `__eq__` leaves ordering operators using the default identity-based behavior.

### Step 4 — Length and string representation
`__len__` powers `len(obj)`; `__str__` and `__repr__` control `print` and the REPL.  
Example: a `Matrix` returns its row count from `__len__` and a compact bracketed form from `__repr__`.  
Formal rule: `__repr__` must be unambiguous; `__str__` may be friendlier.  
> [!WARNING] Forgetting `__repr__` yields the useless `<__main__.Matrix object at 0x…>` string.

### Step 5 — Hashability
`__hash__` must return an integer and must be consistent with `__eq__`.  
Example: an immutable `Point` hashes on the tuple of its coordinates.  
Formal invariant: `a == b` implies `hash(a) == hash(b)`.  
> [!WARNING] Defining `__eq__` without `__hash__ = None` makes the object unhashable and breaks use in sets.

### Step 6 — The full protocol in one place
All seven methods together give a class the same operator surface as the built-in numeric and container types. The interpreter never invents behavior; it only calls the methods you supply.

## 5. Worked examples — every step shown

**Example 1 — Minimal additive type**  
*Given:* class `Money` holding an integer number of cents.  
*Find:* definition of `Money(300) + Money(200)`.  
`class Money:`  
`    def __init__(self, cents): self.cents = cents`  
`    def __add__(self, other):`  
`        return Money(self.cents + other.cents)`  
*Why* — the body of `__add__` receives two `Money` instances.  
`m = Money(300) + Money(200)`  
*Why* — the `+` token triggers `Money.__add__`.  
**`Money(500)`**  

*Reflection:* The example is simple yet already demonstrates that the return value need not be the same type as the operands.

**Example 2 — Equality and ordering**  
*Given:* class `Version` with major and minor integers.  
*Find:* whether `Version(1, 2) < Version(1, 3)`.  
Implement `__eq__` and `__lt__`.  
`def __eq__(self, other): return (self.major, self.minor) == (other.major, other.minor)`  
*Why* — tuple comparison gives the required semantics.  
`def __lt__(self, other): return (self.major, self.minor) < (other.major, other.minor)`  
*Why* — lexicographic ordering on the tuple yields the correct total order.  
**`True`**  

*Reflection:* Once both methods exist, `<=` and the rest are synthesized automatically in Python 3.

**Example 3 — Container protocol**  
*Given:* class `Stack` wrapping a list.  
*Find:* `len(s)` and `repr(s)`.  
`def __len__(self): return len(self._items)`  
*Why* — delegates to the underlying list.  
`def __repr__(self): return f"Stack({self._items!r})"`  
*Why* — `!r` forces the inner list’s `__repr__`.  
**`Stack([3, 1])`** (when the stack contains 3 then 1)  

*Reflection:* `__len__` and `__repr__` together make the object feel native in both code and the interactive shell.

**Example 4 — Hashable value object**  
*Given:* immutable `Point` with `__eq__` already defined.  
*Find:* correct `__hash__`.  
`def __hash__(self): return hash((self.x, self.y))`  
*Why* — the tuple’s hash satisfies the contract because tuple equality matches point equality.  
**`{Point(1, 2): "origin"}` succeeds**  

*Reflection:* Changing any coordinate after insertion would violate the invariant; therefore the class must be immutable.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Implementing dunders on the instance instead of the class | Attribute lookup for operators starts at the class | Always place the methods inside the `class` body     |
| Returning `self` from `__add__`   | Mutation feels convenient                           | Always return a new object; follow value semantics   |
| Defining `__eq__` but not `__hash__` | Forgetting the hash/equality contract               | Explicitly set `__hash__ = None` when objects are mutable |
| Using `is` inside `__eq__`        | Identity is cheaper than value comparison           | Compare actual fields; reserve `is` for singletons   |
| Forgetting `__radd__`             | Left operand does not know the right-hand type      | Implement `__radd__` when mixed-type addition is required |
| Making `__hash__` depend on mutable state | Hash value changes after insertion into a set       | Guarantee immutability or omit `__hash__`            |
| Writing `__str__` but omitting `__repr__` | REPL uses `__repr__` by default                     | Always implement `__repr__`; optionally delegate `__str__` to it |

## 7. The textbook-precise statement
A class may define any of the special methods listed in the Python language reference (van Rossum, *Python Language Reference*, §3.3). When the corresponding operator or built-in function is applied, the interpreter performs the equivalent of `type(self).__xxx__(self, …)` (with coercion and reflection rules for binary operators). If the method is absent or returns `NotImplemented`, the operation falls back to the reflected method on the other operand or raises `TypeError`. The hash/equality invariant must hold: for any objects `a` and `b`, `a == b` implies `hash(a) == hash(b)` whenever both hashes are defined (Cormen et al., *Introduction to Algorithms*, 4e, Ch. 11, hash-table correctness argument).

## 8. Visual — diagram or schematic
```text
Expression:          a + b
                     │   │
Interpreter looks    │   │
for method on        ▼   ▼
                  type(a).__add__(a, b)
                     │
                 returns result
                     │
                 or NotImplemented
                     │
                 then tries type(b).__radd__(b, a)
```

## 9. The memory technique

1. **The hook** — Picture each operator as a tiny trapdoor labeled with double underscores; the interpreter knocks on the door named `__add__` when it sees “+”.
2. **What to overlearn** — The seven method names, the fact that they live on the class, and the single invariant `a == b ⇒ hash(a) == hash(b)`.
3. **Spaced-repetition schedule** — Review the name-to-operator table after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — If you forget a name, write the operator in an interactive shell on a built-in type and inspect `dir(int)` or `dir(list)`; the corresponding dunder is always present.

## 10. What this unlocks
Mastery of dunder methods lets you create domain-specific types that feel indistinguishable from built-in types, which is the foundation for numeric libraries, data-frame engines, and symbolic mathematics packages.

- Next: descriptor protocol and `__get__`/`__set__`
- Next: context-manager protocol (`__enter__`, `__exit__`)
- Next: iterator protocol (`__iter__`, `__next__`)
- Next: metaclass `__new__` and `__init__` customization

## 11. Self-check — five questions, no answers
1. Write the body of `__add__` for a `Complex` class that stores rectangular components; what must the method return when the other operand is also `Complex`?
2. A mutable `Counter` class defines `__eq__` based on its current count. Can instances of `Counter` ever be dictionary keys? Why or why not?
3. Explain the observable difference between implementing only `__repr__` versus implementing both `__repr__` and `__str__` when an instance appears inside a list that is printed.
4. Two `Point` objects compare equal yet produce different hash values. Which data structure will first exhibit incorrect behavior—list, dict, or set—and why?
5. Demonstrate, with a minimal code fragment, how returning `NotImplemented` from `__add__` enables a user-defined class to be added to an `int` on the right-hand side.