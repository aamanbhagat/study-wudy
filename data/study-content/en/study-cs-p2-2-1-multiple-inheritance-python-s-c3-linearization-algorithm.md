## 1. The one-sentence answer
**Python's C3 linearization algorithm computes a single, monotonic linear order of all ancestor classes that respects both the declared inheritance order and the structure of the inheritance graph.**

In single inheritance the chain is obvious: each class simply follows its unique parent. Multiple inheritance immediately creates ambiguity because two parents may themselves share a common ancestor, producing several possible traversal orders. The C3 algorithm resolves this by merging the local precedence lists of every class while enforcing three invariants: the resulting order must be a total order, it must preserve the relative order declared inside each class, and removing any class from the graph must leave the order of the remaining classes unchanged.

The algorithm works by repeatedly selecting the first head of the remaining lists that does not appear in the tail of any other list. When no such head exists, Python raises an error declaring the hierarchy inconsistent. This mechanical rule produces the same deterministic Method Resolution Order (MRO) that the language uses at runtime for method lookup.

> [!NOTE]
> The decisive insight is that C3 never backtracks; once a class is placed in the linear order it stays there, guaranteeing both predictability and the absence of the classic diamond-problem surprises.

## 2. Why this matters — concrete and current
Django’s class-based views combine `TemplateResponseMixin`, `ContextMixin`, and `View` through multiple inheritance; the C3-computed MRO determines whether `get_context_data` from the template mixin or the base view is invoked first when a request arrives.

In the scientific Python stack, `numpy.ndarray` subclasses such as `MaskedArray` inherit from both `ndarray` and a mixin that supplies masked arithmetic; the linearization order controls which `__array_finalize__` implementation runs after ufunc operations, directly affecting numerical reproducibility in large-scale simulations at laboratories such as CERN.

Modern game engines written in Python (e.g., the Panda3D scene-graph system) let developers mix rendering, physics, and AI behaviours through multiple base classes; an incorrect MRO would cause an AI update to run before physics, producing frame-rate-dependent artefacts that are difficult to debug.

The `abc` module and `typing.Protocol` rely on C3 to linearize abstract base classes and structural subtyping checks; any inconsistency surfaces immediately when a library author attempts to combine two independently developed protocol hierarchies.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Single-inheritance chain | Supplies the base case that C3 must reproduce when only one parent exists.           |
| Class attribute lookup   | Defines what “method resolution order” actually means at runtime.                    |
| Directed acyclic graph   | The inheritance relation is a DAG; C3 produces one of its linear extensions.         |
| List merge operation     | The algorithm is a specialised, constraint-preserving merge of the parent MRO lists. |

## 4. Building the idea — from intuition to formalism

### Step 1 — The diamond problem appears
When two parent classes share a common grandparent, depth-first search can visit the grandparent twice or in an order that violates one parent’s declared sequence.

Consider classes `A`, `B(A)`, `C(A)`, `D(B,C)`. A naïve left-to-right depth-first walk yields `D B A C A`, repeating `A`.

Formally the inheritance graph is a DAG \(G = (V,E)\) where an edge \(B \to A\) means “`B` inherits from `A`”.

> [!WARNING]
> Treating the graph as a tree and simply concatenating parent lists produces duplicate classes and breaks `super()` delegation.

### Step 2 — Local precedence must be preserved
Inside the definition of `D(B,C)` the token `B` appears before `C`; therefore `B` must precede `C` in every valid linear order.

This constraint is expressed by the local precedence list \(L(D) = [D,B,C]\).

### Step 3 — Monotonicity
If \(C_1\) precedes \(C_2\) in the MRO of any class, then the same relative order must hold in the MRO of every subclass.

Mathematically, the linearization \(\mathcal{L}(D)\) must satisfy:
\[
\forall X,Y \in \mathcal{L}(D),\; X \prec_{\mathcal{L}(D)} Y \implies X \prec_{\mathcal{L}(E)} Y
\]
for every subclass \(E\) of \(D\).

### Step 4 — The merge operation
C3 merges the lists \(L(D)\) together with \(\mathcal{L}(B)\) and \(\mathcal{L}(C)\) by repeatedly taking the first head that does not appear in any tail.

The candidate set at each step is
\[
C = \{ h \mid h = \text{head}(L_i),\; h \notin \bigcup_j \text{tail}(L_j) \}.
\]
The leftmost head in the original declaration order is chosen.

### Step 5 — Inconsistency detection
When the candidate set is empty while lists remain, the hierarchy is rejected. This is the only situation in which Python raises `TypeError: Cannot create a consistent method resolution order`.

### Step 6 — The textbook statement
The C3 linearization of a class \(D\) with parents \(P_1,\dots,P_n\) is the unique sequence
\[
\mathcal{L}(D) = [D] + \text{merge}(\mathcal{L}(P_1),\dots,\mathcal{L}(P_n),L(D))
\]
that satisfies local precedence, monotonicity, and the merge rule above.

## 5. Worked examples — every step shown

**Example 1 — Trivial single inheritance**
- *Given:* `class A: pass`; `class B(A): pass`
- *Find:* `B.__mro__`
- Start with \(\mathcal{L}(A) = [A]\).
- \(L(B) = [B,A]\).
- Merge yields \([B] + [A]\).
- **Result:** `(B, A, object)`

*Reflection:* The algorithm collapses to ordinary inheritance; any deviation would violate monotonicity.

**Example 2 — Classic diamond**
- *Given:* `A`, `B(A)`, `C(A)`, `D(B,C)`
- *Find:* `D.__mro__`
- \(\mathcal{L}(A)=[A]\), \(\mathcal{L}(B)=[B,A]\), \(\mathcal{L}(C)=[C,A]\), \(L(D)=[D,B,C]\).
- Candidate heads: `B`, `C`, `D`. `D` is chosen first.
- Remaining merge selects `B` (its tail `[A]` does not block `B`).
- Then `C`, then `A`.
- **Result:** `(D, B, C, A, object)`

*Reflection:* `C` appears before `A` even though `B` was declared first; monotonicity forces the order that respects both parents.

**Example 3 — Inconsistent hierarchy**
- *Given:* `A`, `B(A)`, `C(A)`, `D(B,C)`, `E(C,B)`
- *Find:* whether `E` can be created
- Local lists demand both `B` before `C` and `C` before `B`.
- Merge candidate set becomes empty.
- **Result:** `TypeError`

*Reflection:* The error is raised at class creation time, not at call time, because C3 evaluates the constraint once.

**Example 4 — Deeper merge with three parents**
- *Given:* classes `X`, `Y(X)`, `Z(X)`, `W(Y,Z)`, `V(W,Y)`
- *Find:* `V.__mro__`
- Compute bottom-up: \(\mathcal{L}(W)=[W,Y,Z,X]\).
- \(L(V)=[V,W,Y]\).
- Merge selects `V`, `W`, `Y`, `Z`, `X`.
- **Result:** `(V, W, Y, Z, X, object)`

*Reflection:* Even though `Y` appears twice in the input lists, monotonicity removes the duplicate automatically.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming left-to-right DFS works  | DFS ignores the monotonicity constraint             | Always call `Class.__mro__` or `help(Class)`         |
| Forgetting `object` is the root   | Implicit inheritance of `object` is invisible       | Include `object` when drawing any hierarchy          |
| Mixing old-style and new-style    | Python 2 legacy code can produce different orders   | Use Python 3 exclusively for multiple inheritance    |
| Relying on `super()` without MRO  | `super()` follows the linear order, not the source  | Print the MRO before writing cooperative `super()`   |
| Declaring parents in the wrong order | Local precedence is taken literally from the code | Write the most specific parent first in the list     |
| Creating cycles                   | Accidental mutual inheritance                       | Use a static checker or `inspect.getmro` early       |
| Expecting runtime re-linearization| MRO is computed once at class creation              | Never mutate `__bases__` after the class exists      |

## 7. The textbook-precise statement
Let \(D\) be a class whose direct superclasses are \(P_1,\dots,P_n\) in that textual order. The C3 linearization \(\mathcal{L}(D)\) is defined recursively by
\[
\mathcal{L}(D) = [D] + \operatorname{merge}(\mathcal{L}(P_1),\dots,\mathcal{L}(P_n),[D,P_1,\dots,P_n])
\]
where the merge operation returns the unique sequence that preserves the relative order of every input list and raises an error if no such sequence exists. (See Python Language Reference, §3.3.4, and Barrett et al., “A Monotonic Superclass Linearization for Dylan”, OOPSLA 1996.)

## 8. Visual — diagram or schematic
```text
          object
             |
             A
            / \
           B   C
            \ /
             D
MRO(D): D → B → C → A → object
Local precedence lists:
  D : [D, B, C]
  B : [B, A]
  C : [C, A]
Merge order at each step: D, B, C, A, object
```

## 9. The memory technique
1. **The hook** — Picture three rivers (the parent MROs) flowing into a single canal; the C3 algorithm is the lock-keeper who only opens a gate when the next boat does not block any other river.
2. **What to overlearn** — The three invariants: total order, local precedence, monotonicity; the merge rule that selects a head absent from every tail.
3. **Spaced-repetition schedule** — Review the diamond example at 1 day, 3 days, 7 days, 16 days, 35 days; recompute the MRO from scratch each time.
4. **First-principles fallback** — Redraw the inheritance DAG, write every local list, then mechanically apply the candidate-head rule until the sequence or the inconsistency is forced.

## 10. What this unlocks
Mastery of C3 lets you design cooperative multiple-inheritance hierarchies that remain safe under further subclassing, which is a prerequisite for writing robust mixin libraries, abstract base classes, and generic programming patterns.

- Mixin composition and the `super()` protocol
- Abstract base classes (`abc.ABC`) and virtual subclass registration
- `typing.Protocol` structural subtyping
- Metaclass `__mro_entries__` hooks
- Advanced descriptor and context-manager patterns that rely on deterministic lookup

## 11. Self-check — five questions, no answers
1. Draw the inheritance graph for `class X(A,B,C)` where `A`, `B`, and `C` all inherit from `Z`; compute the MRO by hand.
2. Which of the following hierarchies is rejected by C3 and why: `E(C,B)` after the diamond `D(B,C)`?
3. Explain in one sentence why `super()` can invoke a method defined in a class that is not the static parent.
4. Given the MRO `(V, W, Y, Z, X, object)`, reconstruct a minimal set of local precedence lists that could have produced it.
5. A colleague writes `class F(E,D)` where `E` and `D` have overlapping but non-monotonic MROs; at what exact moment does Python raise an exception?