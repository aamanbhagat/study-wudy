## 1. The one-sentence answer
**Python uses the C3 linearization algorithm to compute a consistent Method Resolution Order (MRO) for any class that inherits from multiple parents.**

C3 takes the inheritance lists of all base classes and merges them while preserving two rules: each class appears only once, and the relative order declared in every parent class is never violated. The result is a single linear sequence that Python follows when it looks up methods or attributes. This sequence starts with the current class and ends at `object`, guaranteeing that every ancestor appears exactly once and that local precedence (the order you wrote in the class definition) is respected.

The algorithm works by repeatedly picking the first head of the remaining lists that does not appear in any tail; when no such head exists, Python raises `TypeError`. The process is deterministic, so the same inheritance graph always produces the same MRO.

> [!NOTE]
> The single most important insight is that C3 never reorders classes arbitrarily; it only merges existing orders. If your inheritance declarations already contain a contradiction, C3 will refuse to create an MRO rather than invent one.

## 2. Why this matters — concrete and current
Django’s ORM uses multiple inheritance when a model mixes `TimeStampedModel`, `SoftDeleteModel` and a custom `UserOwnedModel`; C3 guarantees that `save` is called in the exact order the developer listed the mixins.

PyTorch’s `nn.Module` is combined with custom mixin classes such as `GradientClippingMixin` and `LoggingMixin` inside large research codebases at FAIR and DeepMind; the resulting MRO decides whether logging occurs before or after the gradient step.

The `abc.ABC` machinery in the standard library combines with user-defined abstract mixins; C3 ensures that `__subclasshook__` is found exactly once even when several abstract bases are listed.

Qt for Python (PySide6) lets a single widget inherit from both `QWidget` and a custom `ThemeMixin`; C3 keeps the Qt event loop methods from being shadowed by mixin code written later in the inheritance list.

CUDA Python bindings in RAPIDS cuDF combine host-side Python classes with device-side buffer protocols; the linearization order determines which `__cuda_array_interface__` implementation is used when both parents define it.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Single-inheritance MRO     | C3 reduces to the familiar depth-first left-to-right order when only one parent exists |
| Class definition syntax    | You must be able to write `class D(B, C):` and read the tuple of bases |
| `super()` and `mro()`      | These are the runtime tools that expose the linearization result |
| Directed acyclic graph     | Inheritance forms a DAG; C3 is a deterministic topological merge of that DAG |

If any row above is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Represent each inheritance declaration as an ordered list
Write every class and its direct parents as a list that begins with the class itself.  
Example: `class D(B, C)` becomes the list `[D, B, C]`.  
Formal statement: for a class \(X\) with direct bases \(B_1, \dots, B_k\), define \(L(X) = [X] + L(B_1) + \dots + L(B_k)\) only after the merge is complete; initially we store the declared sequence.  
> [!WARNING]
> If you forget that the list starts with the class itself, every later merge step will produce an off-by-one error.

### Step 2 — Collect all linearizations that must be merged
C3 merges the linearizations of every direct base plus the declared list of bases.  
For `D(B, C)` the inputs are \(L(B)\), \(L(C)\) and \([D, B, C]\).  
Formal statement: inputs = \(\{L(B_i) \mid B_i \in \text{bases}(D)\} \cup \{[D] + \text{bases}(D)\}\).

### Step 3 — Select the first valid head
Scan the first element of each remaining list; choose the leftmost candidate that does not appear in any tail of the other lists.  
This candidate is appended to the result and removed from every list where it appears as head.  
Formal statement: head \(h\) is valid iff \(\forall L_i, h \notin \text{tail}(L_i)\).

### Step 4 — Repeat until all lists are empty
Continue selecting heads until every input list is exhausted. The final sequence is the MRO.  
If at any point no valid head exists, raise `TypeError: Cannot create a consistent method resolution order`.

### Step 5 — Base case for `object`
`object` has an empty linearization: \(L(\text{object}) = [\text{object}]\). Every chain ends here.

### Step 6 — The monotonicity guarantee
C3 guarantees that if \(A\) precedes \(B\) in any input list, then \(A\) precedes \(B\) in the final MRO. This property is called monotonicity.

### Step 7 — Textbook-grade statement
The C3 merge of lists \(L_1, \dots, L_k\) is the unique sequence \(R\) that is a linear extension of each \(L_i\) and contains each element exactly once, or no such sequence exists.

## 5. Worked examples — har step show karo

**Example 1 — Classic diamond**
*Given:*  
```python
class A: pass
class B(A): pass
class C(A): pass
class D(B, C): pass
```
*Find:* `D.__mro__`

Step 1 lists: \(L(B)=[B,A]\), \(L(C)=[C,A]\), declared=[D,B,C]  
Step 2 inputs: those three lists plus [object] for A.  
Step 3 first head = D (only possible).  
Step 4 next candidates B and C; B does not appear in any tail, so pick B.  
Next: C does not appear in remaining tails, pick C.  
Next: A, then object.  
**Final MRO: (D, B, C, A, object)**

*Reflection:* The diamond forces C3 to place B before C because that order was declared; swapping the bases would swap B and C in the result.

**Example 2 — Three-way merge**
*Given:*  
```python
class X: pass
class Y: pass
class Z: pass
class D(X, Y, Z): pass
```
Lists: [D,X,Y,Z], [X], [Y], [Z]  
Heads: D first, then X (appears first in declared list and nowhere else), then Y, then Z, then object.  
**Final MRO: (D, X, Y, Z, object)**

*Reflection:* When parents are unrelated, C3 simply follows the textual order you wrote.

**Example 3 — Conflict that C3 rejects**
*Given:*  
```python
class A: pass
class B(A): pass
class C(A): pass
class D(B, C): pass   # ok
class E(C, B): pass   # now create F
class F(D, E): pass
```
The two paths impose contradictory orderings B before C and C before B.  
C3 finds no valid head after D and E are placed and raises `TypeError`.

*Reflection:* The error occurs at class creation time, not at method lookup, so you discover the problem immediately.

**Example 4 — Deep mixin chain**
*Given:*  
```python
class Base: pass
class Mixin1(Base): pass
class Mixin2(Base): pass
class Impl(Mixin1, Mixin2): pass
```
Lists produce MRO (Impl, Mixin1, Mixin2, Base, object).  
Calling `super()` inside `Mixin1` will correctly reach `Mixin2` because C3 placed Mixin2 after Mixin1.

*Reflection:* The ordering of mixins is exactly the order you list them; C3 never reorders them.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming left-to-right depth-first | Old Python 2 behaviour still in many tutorials      | Always run `ClassName.__mro__` after defining the class |
| Forgetting that mixins must appear before the class they extend | C3 respects declaration order strictly              | List mixin classes before the “main” parent          |
| Creating diamond with crossed ordering | Two different modules declare opposite base orders  | Centralize mixin ordering in one base class          |
| Using `super()` without understanding MRO | Developer expects parent listed first to be called first | Print `self.__class__.__mro__` inside the method     |
| Ignoring `object` at the end      | Forgetting every chain ends at `object`             | Treat `object` as the sentinel in every mental model |
| Changing bases after class creation | Python does not recompute MRO on `cls.__bases__ = …` | Never mutate `__bases__` after class definition      |
| Confusing `mro()` with `__mro__`  | One is a method, one is a tuple                     | Use `.__mro__` for inspection, `mro()` only when you need a fresh list |

## 7. The textbook-precise statement
Python’s C3 linearization, as implemented in `typeobject.c`, computes the Method Resolution Order of a class \(C\) with direct bases \(B_1, \dots, B_n\) by merging the sequences \(L(B_1), \dots, L(B_n)\) together with the sequence \([C, B_1, \dots, B_n]\) according to the C3 merge rule: repeatedly select the first head that does not appear in any tail; if no such head exists, raise `TypeError`. The resulting sequence \(R\) satisfies monotonicity (\(A\) precedes \(B\) in any input list implies \(A\) precedes \(B\) in \(R\)) and contains each class exactly once. Reference: Python source `Objects/typeobject.c`, function `mro_implementation`, and the paper “The Python 2.3 Method Resolution Order” by Michele Simionato.

## 8. Visual — diagram or schematic
```
D
├── B
│   └── A
└── C
    └── A
MRO produced by C3: D → B → C → A → object
```

The diagram shows two paths from D to A. C3 linearizes them so that B appears before C exactly once, and A appears after both.

## 9. The memory technique
1. **The hook** — Picture three rivers (the three inheritance lists) flowing into one canal; C3 is the lock keeper who only opens the gate for the first boat that nobody downstream is still waiting for.
2. **What to overlearn** — The two rules: “each class once” and “declared order never reversed”.
3. **Spaced-repetition schedule** — Review the diamond example after 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — If you forget the algorithm, rebuild by writing every parent list on paper, crossing out heads that violate the tail rule, and writing the surviving sequence.

## 10. What this unlocks
Once you understand C3 you can design large mixin-based architectures without runtime surprises and you can reason about cooperative multiple inheritance using `super()`.

- Designing plugin systems where order of initialization must be deterministic
- Implementing abstract base classes that combine with concrete mixins
- Debugging `super()` chains in GUI or ORM frameworks
- Writing metaclasses that customize `__mro_entries__`

## 11. Self-check — five questions, no answers
1. Write the MRO of `class D(B, C)` when both B and C inherit from A; verify with code.
2. What error occurs if two mixins impose opposite orderings on the same base class?
3. In the MRO (D, B, C, A, object), which class’s method is reached by `super()` called from B?
4. Why does C3 reject the hierarchy `F(D, E)` when D and E already contain contradictory orderings of B and C?
5. Given four unrelated base classes W, X, Y, Z, what is the MRO of `class Mega(W, X, Y, Z)` and why is it not a depth-first traversal?