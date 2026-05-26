## 1. The one-sentence answer
**Python modules let you load reusable definitions from separate files into the current namespace via three syntactic forms: `import`, `from...import`, and `as` aliasing.**

A module is simply a `.py` file whose top-level names become available once the file is executed by the interpreter. The `import` statement binds the entire module object to a name; `from...import` extracts selected names directly; `as` rebinds any of those names to a fresh identifier. These three mechanisms together solve the twin problems of code reuse and name collision without requiring textual copy-and-paste.

The underlying mechanism is always the same: Python searches `sys.path`, locates the file, executes it once, caches the resulting module object in `sys.modules`, and finally performs the requested name binding. Subsequent imports of the same module return the cached object.

> [!NOTE]
> The single most important insight is that `import` never copies code; it only creates a reference to an already-executed module object stored in `sys.modules`.

## 2. Why this matters — concrete and current
SpaceX’s flight software team keeps each subsystem (telemetry, guidance, engine control) in its own module. At launch time a single `import` statement assembles the flight computer’s runtime from dozens of independently version-controlled files; any one of them can be hot-patched without restarting the vehicle.

In machine-learning research, the Hugging Face `transformers` library exposes every model through `from transformers import AutoModel`. Researchers alias the imported class (`as model`) so that swapping architectures requires changing only one line while the rest of the training script remains untouched.

Semiconductor design firms such as TSMC use Python-based EDA toolchains. Each process node ships a module containing hundreds of constants; engineers write `import tsmc_n5 as pdk` so that the identical analysis script can target a new node by changing a single alias.

Scientific Python stacks (NumPy, SciPy, Astropy) rely on `from numpy import ndarray` inside performance-critical inner loops; the explicit import removes repeated attribute lookup and yields measurable speed-ups in large-scale radio-astronomy pipelines.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Python identifier rules  | Determines what names are legal after `import` or `as`    |
| `sys.path` and file system | Explains how Python locates the `.py` file being imported |
| Function and variable scope | Shows why names imported into one module do not pollute another |
| `sys.modules` cache      | Prevents repeated execution and explains singleton semantics |

## 4. Building the idea — from intuition to formalism

### Step 1 — A module is an executed file object
A module is any `.py` file that has been located, read, and executed exactly once. Execution populates a fresh module dictionary that becomes the module’s `__dict__`.

```python
# math_utils.py
pi = 3.14159
def square(x): return x * x
```

After execution the interpreter records the resulting module object under `sys.modules['math_utils']`.

> [!WARNING]
> If you edit the source file after the first import, the cached object is not refreshed unless you explicitly delete the entry from `sys.modules`.

### Step 2 — `import` binds the module object
The statement `import M` evaluates to a name lookup in `sys.modules` and binds the module object to the identifier `M` in the current namespace.

```python
import math_utils
print(math_utils.pi)   # 3.14159
```

Formally:
$$
\texttt{import } M \quad\Rightarrow\quad \texttt{locals}[M] \leftarrow \texttt{sys.modules}[M]
$$

### Step 3 — `from...import` copies selected bindings
`from M import name` looks up `name` inside the module’s `__dict__` and binds it directly in the current namespace, bypassing the module object.

```python
from math_utils import square
print(square(4))       # 16
```

### Step 4 — `as` performs an additional name binding
Any imported name—module or attribute—may be rebound to a new identifier via `as`.

```python
import math_utils as mu
from math_utils import pi as PI
```

Formally the binding step is:
$$
\texttt{import } M \texttt{ as } A \quad\Rightarrow\quad \texttt{locals}[A] \leftarrow \texttt{sys.modules}[M]
$$

### Step 5 — Namespace isolation is automatic
Each module maintains its own global dictionary. Names defined in one module are invisible in another unless explicitly imported.

### Step 6 — The textbook statement
A Python program may contain any number of `import`, `from-import`, or aliased import statements. Each such statement causes the interpreter to ensure the named module has been executed exactly once, then performs a single name-binding operation in the current lexical scope according to the syntactic form used.

## 5. Worked examples — every step shown

**Example 1 — Simple whole-module import**  
*Given:* a file `vectors.py` containing `def norm(v): …`  
*Find:* how to call `norm` after import.  
1. Write `import vectors`.  
   *Why:* locates and executes `vectors.py`, binds the module object.  
2. Call `vectors.norm([3,4])`.  
   *Why:* attribute lookup on the bound module object.  
**Answer:**  
```python
import vectors
vectors.norm([3,4])
```

*Reflection:* The module name acts as a prefix; forgetting it produces `NameError`.

**Example 2 — Selective import**  
*Given:* same `vectors.py`.  
*Find:* import only `norm`.  
1. Write `from vectors import norm`.  
   *Why:* copies the binding of `norm` directly into the current namespace.  
2. Call `norm([3,4])`.  
**Answer:**  
```python
from vectors import norm
norm([3,4])
```

*Reflection:* Selective import shortens call sites but can hide origin.

**Example 3 — Aliasing to avoid collision**  
*Given:* both `math` and a local `math.py`.  
*Find:* import the local module without shadowing the standard library.  
1. Write `import math as local_math`.  
   *Why:* `as` rebinds the local module to a distinct name.  
**Answer:**  
```python
import math as local_math
local_math.sqrt(2)
```

*Reflection:* Aliasing resolves name clashes at import time.

**Example 4 — Multiple selective imports with alias**  
*Given:* `numpy` and a local constant also named `pi`.  
*Find:* import NumPy’s `pi` under a safe name.  
1. Write `from numpy import pi as np_pi`.  
   *Why:* both selects and renames in one step.  
**Answer:**  
```python
from numpy import pi as np_pi
print(np_pi)
```

*Reflection:* Combining `from` and `as` yields the shortest safe reference.

## 6. Common traps and how to avoid them

| Trap                          | Why it happens                              | How to avoid it                              |
|-------------------------------|---------------------------------------------|----------------------------------------------|
| Circular import               | Module A imports B, B imports A             | Move shared code to a third module           |
| Shadowing built-ins           | `from os import path` hides `os.path` later | Use explicit aliases or full qualification   |
| Forgetting `sys.path` update  | Local module not found                      | Run with `PYTHONPATH=.` or install as package|
| Star import (`from M import *`)| Pollutes namespace, hides origin            | Never use in production code                 |
| Re-binding after import       | `import math; math = 5` destroys module     | Treat module names as read-only              |
| Case-sensitive file systems   | `ImportError` on macOS/Linux                | Match filename case exactly                  |
| Mutable module-level state    | Two modules mutate same list                | Prefer functions over module globals         |

## 7. The textbook-precise statement
An import statement has one of three forms:

```
import module [as name]
from module import name [as name] {, …}
from module import *
```

Execution of any form first ensures that the module object exists in `sys.modules` (by searching `sys.path` and executing the module’s code if necessary). The subsequent binding step is performed exactly once per syntactic occurrence and obeys ordinary Python name-binding rules. See Python Language Reference, Version 3.12, §5.2.1 “Import statements”.

## 8. Visual — diagram or schematic
```text
sys.modules
+------------------+
| 'math'     -> <module math>   |
| 'numpy'    -> <module numpy>  |
| 'myutils'  -> <module myutils>|
+------------------+
          ^
          | import myutils as mu
          |
current namespace
+------------------+
| mu -> <module myutils>        |
| sqrt -> <function math.sqrt>  |  <-- from math import sqrt
+------------------+
```

## 9. The memory technique

**The hook**  
Picture a library card catalogue: `import` checks out the whole book, `from...import` photocopies one page, and `as` writes a nickname on the cover.

**What to overlearn**  
- `import M` always binds a module object.  
- `from M import x` binds `x` directly.  
- `as` is only a name-binding operator.

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive by asking: “Where does the name live after this line executes?” Trace through `sys.modules` then the current frame’s `locals`.

## 10. What this unlocks
Mastery of these import forms is required before packages, `__init__.py`, relative imports (`from . import sibling`), namespace packages, and distribution via `setuptools` or `pyproject.toml` can be understood.

- Next: Python packages and the import machinery (`__path__`, `finders`).  
- Next: Virtual environments and editable installs.  
- Next: Writing reusable libraries that expose a clean public API.

## 11. Self-check — five questions, no answers
1. Write the single import statement that lets you call `math.sqrt` as `root`.  
2. A file `a.py` contains `import b`; `b.py` contains `import a`. What occurs on `import a`?  
3. Explain why `from numpy import *` followed by `from scipy import *` can silently change the value of `pi`.  
4. Given `import os as operating_system`, what object does `operating_system.__name__` evaluate to?  
5. Construct an import that extracts only the class `Tensor` from `torch` and binds it under the name `T` while ensuring the standard-library module `os` remains accessible under its usual name.