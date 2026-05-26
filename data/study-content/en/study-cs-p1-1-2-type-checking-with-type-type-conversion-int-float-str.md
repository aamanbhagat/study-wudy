## 1. The one-sentence answer
**Type checking with `type()` and conversion with `int()`, `float()`, and `str()` are the mechanisms Python uses to inspect an object's data type at runtime and to create a new object of a requested type from an existing value.**

Python stores every value together with a tag that records what kind of data it is. The built-in function `type()` simply reads that tag. The conversion functions `int()`, `float()`, and `str()` construct a fresh object whose tag matches the requested type, copying or transforming the original value according to well-defined rules.

These operations matter because Python variables never carry compile-time type declarations; the only way to know or change what a name refers to is to ask the interpreter at the moment the code runs. The distinction between inspection and construction is therefore fundamental: `type(x)` never alters `x`, while `int(x)` always produces a new integer object.

> [!NOTE]
> The single most important realization is that conversion never mutates the original object; it always allocates a new one whose type is guaranteed by the language definition.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover flight software, written in a mixture of C and Python-based test harnesses, repeatedly converts sensor readings expressed as strings from the telemetry stream into floating-point values before feeding them to navigation filters; an incorrect conversion would produce an invalid quaternion and trigger an immediate fault-protection response.

In the training pipelines of large language models at OpenAI and Google DeepMind, token IDs arrive from the data loader as Python integers; these must be cast to 32-bit floats inside the embedding lookup before matrix multiplication on TPUs, and the cast is performed explicitly with `float()` so that automatic mixed-precision logic can later down-cast without silent overflow.

Semiconductor foundries such as TSMC run Python scripts that parse wafer-test CSV files; each resistance measurement is read as a string and must be converted with `float()` before statistical process-control calculations decide whether a lot passes or fails.

High-energy physics experiments at CERN store detector hits in ROOT files; when analysts use Python (via PyROOT or Uproot) to filter events, they routinely apply `int()` to bit-packed status words so that bitwise masks operate on true integers rather than on objects that only look numeric.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Object identity vs. value| Conversion returns a new object; identity tests (`is`) therefore fail after conversion |
| String literal syntax    | `int("10")` and `int('10')` succeed only when the characters form a valid integer token |
| Boolean subclassing      | `bool` is a subclass of `int`, so `int(True)` yields `1` without error |

## 4. Building the idea — from intuition to formalism

### Step 1 — Every value carries a type tag
Python objects are allocated on the heap; each allocation stores both the data bits and a pointer to a type object.  
`x = 3` therefore creates an integer object whose type pointer refers to `int`.  
Formally:  
$$
\text{type}(x) = T \quad\text{where }T\text{ is the type object recorded at allocation.}
$$
> [!WARNING]
> Forgetting that the type tag lives with the object, not the variable name, leads to the false belief that assignment can change an object’s type in place.

### Step 2 — `type()` only reads the tag
`type(x)` returns a reference to the type object; it performs no computation on the data bits and never creates a new object.  
Example: after `x = 3; y = type(x)`, `y is int` evaluates to `True`.  
$$
\text{type}(x) \equiv \text{pointer to type object of }x
$$
> [!WARNING]
> Using `type(x) == int` instead of `isinstance(x, int)` breaks when subclasses appear, because equality on type objects is identity, not inheritance.

### Step 3 — Conversion constructs a new object
`int(x)` allocates a fresh integer object whose value is derived from `x` according to the language’s conversion protocol.  
Example: `int("7")` allocates a new `int` whose value is 7; the original string object remains unchanged.  
$$
\text{int}(x) = \text{new object }o \text{ such that } \text{type}(o)=\texttt{int}\text{ and } \text{value}(o)=\text{integer interpretation of }x
$$
> [!WARNING]
> Assuming the original object is modified leads to surprises when the same object is referenced elsewhere.

### Step 4 — Conversion rules are defined per source type
The mapping is total only for a documented subset of source types; otherwise `ValueError` or `TypeError` is raised.  
Example: `float("3.2")` succeeds, `float("three")` raises `ValueError`.  
$$
\text{convert}_T(s) \text{ is defined}\iff s\text{ belongs to the domain of }T\text{'s constructor.}
$$
> [!WARNING]
> Over-generalizing “everything can be converted” produces runtime exceptions that surface only on certain inputs.

### Step 5 — The result of conversion is always a proper instance of the target type
After `y = float(3)`, `isinstance(y, float)` is guaranteed to be true.  
$$
\text{type}(\texttt{int}(x)) = \texttt{int},\quad
\text{type}(\texttt{float}(x)) = \texttt{float},\quad
\text{type}(\texttt{str}(x)) = \texttt{str}.
$$
This final guarantee is the textbook statement of the conversion contract.

## 5. Worked examples — every step shown

**Example 1 — Inspecting a literal**  
*Given:* `x = 42`  
*Find:* the type of `x`.  
`print(type(x))`  
*Why:* The literal `42` allocates an `int`; `type()` returns a reference to that type object.  
**`<class 'int'>`**

*Reflection:* The example shows that even literals possess runtime type tags; the same mechanism applies to every subsequent object.

**Example 2 — String-to-integer conversion**  
*Given:* `s = "100"`  
*Find:* an integer whose value equals the decimal interpretation of `s`.  
`n = int(s)`  
*Why:* The constructor `int` parses the character sequence according to base-10 rules and allocates a new integer.  
`type(n) is int` evaluates to `True`.  
**`100`**

*Reflection:* The original string `s` remains unchanged; only a new integer exists afterward.

**Example 3 — Lossy float-to-int truncation**  
*Given:* `f = 3.9`  
*Find:* the integer obtained by truncation toward zero.  
`i = int(f)`  
*Why:* Python’s `int()` applied to a float discards the fractional part; no rounding occurs.  
**`3`**

*Reflection:* The truncation rule is a common source of off-by-one errors when programmers expect rounding.

**Example 4 — Round-trip through string**  
*Given:* `x = 7`  
*Find:* a string that, when converted back, yields an equal integer.  
`s = str(x); y = int(s)`  
*Why:* `str(7)` produces the two-character string `"7"`; `int("7")` reconstructs an integer whose value equals the original.  
`x == y` is `True`, yet `x is y` is `False`.  
**`True` (equality), `False` (identity)**

*Reflection:* Equality holds because the numeric values match; identity fails because two distinct objects were allocated.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Expecting `type(3.0) == int`      | `3.0` is parsed as a float literal                  | Always write the decimal point when a float is intended |
| Using `int("3.7")`                | The string contains a non-integer token             | Use `float()` first, then `int()` if truncation is desired |
| Believing `str(True)` yields `"1"`| `bool` is printed via its own `__str__`             | Remember that only numeric conversion follows integer rules |
| Re-using the same variable name after conversion | Name binding is independent of object identity     | Use distinct names or explicit comments when both values must coexist |
| Forgetting that `float("inf")` succeeds | IEEE-754 infinities are legal float literals       | Validate inputs when infinity is semantically invalid |
| Comparing `type(x)` with a string | `type()` returns a type object, not a string        | Use `.__name__` only for diagnostic output, never for logic |
| Assuming `int(3.999999999)` rounds correctly | IEEE-754 representation may already be inexact     | Use `round()` explicitly before integer conversion when rounding semantics matter |

## 7. The textbook-precise statement
Let \( v \) be any Python object. The expression `type(v)` evaluates to the unique type object \( T \) such that \( v \) is an instance of \( T \). For each target type \( T \in \{\texttt{int}, \texttt{float}, \texttt{str}\} \), the call \( T(v) \) either raises an exception or returns a freshly allocated object \( o \) satisfying \( \texttt{isinstance}(o, T) \) and whose value is the canonical interpretation of \( v \) under \( T \)'s constructor protocol (Python Language Reference, Version 3.12, §5.6 “Calls” and §4.7 “Numeric conversions”).

## 8. Visual — diagram or schematic
```text
          name
           │
           ▼
   +---------------+          conversion
   │ variable 'x'  │ ───────────────────────►  +---------------+
   |  (reference)  │                            │ new object    │
   +---------------+                            │ type = int    │
           │                                    │ value = 42    │
           │                                    +---------------+
           │
           ▼
   +---------------+
   │ object        │
   │ type = str    │
   │ value = "42"  │
   +---------------+
```
The diagram shows that `int(x)` follows the reference stored under the name, reads the string object, and produces an entirely separate integer object.

## 9. The memory technique
1. **The hook** — Picture a passport control officer (`type()`) who only stamps your document without changing it, versus a visa office (`int()`) that issues an entirely new passport of the requested nationality.  
2. **What to overlearn** — `type(obj)` never mutates; every conversion call returns a new object; `bool` is a subclass of `int`.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the object model: every value is a tagged heap allocation; inspection reads the tag, conversion allocates a new tagged allocation.

## 10. What this unlocks
Mastery of explicit type inspection and conversion removes the largest source of silent data-corruption bugs in early Python programs and prepares the ground for writing robust generic functions.

- Dynamic dispatch and `isinstance` checks  
- Writing `__int__`, `__float__`, `__str__` special methods  
- Safe parsing of untrusted input in network protocols  
- Construction of numeric arrays in NumPy from mixed-type Python lists  

## 11. Self-check — five questions, no answers
1. What does `type(3) is type(3.0)` evaluate to, and why?  
2. Write the shortest expression that converts the string `"0xff"` into the integer 255.  
3. Predict the result of `int(float("1e100"))` and justify the outcome.  
4. A programmer writes `if type(x) == int: …`. Name the concrete failure mode when `x` is a `bool`.  
5. Demonstrate, with two distinct objects, that `str(int("7")) == "7"` does not imply object identity.