## 1. The one-sentence answer
**In Python a variable is a named reference that binds an identifier to a value in memory through the assignment operator.**

A variable therefore acts as a stable label rather than a fixed container. The label can be attached to any object, detached, and attached again without altering the object itself. This binding mechanism lets programs store intermediate results, track state, and reuse values under readable names.

Reassignment simply creates a new binding for the same name; the previous object may remain in memory or be reclaimed depending on reference counts. Naming rules exist to guarantee that identifiers remain unambiguous to both the interpreter and human readers.

> [!NOTE]
> The single most important insight is that assignment never copies data; it only creates or updates a reference.

## 2. Why this matters — concrete and current
SpaceX flight software maintains thousands of sensor variables that are reassigned each control cycle; a single naming collision would invalidate telemetry used for booster landing calculations.

In the AlphaFold protein-structure pipeline at DeepMind, residue coordinates are stored in variables whose names follow strict conventions so that downstream tensor operations remain traceable across millions of lines of Python.

Semiconductor simulators at TSMC update voltage and current variables millions of times per second inside SPICE-like kernels; violating Python’s naming rules would immediately break the interface between the solver and the visualization layer.

Machine-learning training loops at OpenAI reassign loss and gradient variables inside every optimizer step; consistent naming enables automatic differentiation frameworks to build correct computation graphs without manual bookkeeping.

## 3. Mental prerequisites

| Concept              | Why you need it here                              |
|----------------------|---------------------------------------------------|
| Literal values       | Provide the objects that variables will reference |
| The Python interpreter’s read-eval-print loop | Immediate feedback on whether an assignment succeeded |
| Distinction between name and value | Prevents the misconception that assignment copies data |

## 4. Building the idea — from intuition to formalism

### Step 1 — A name is only a label
A variable name points to an object; it does not contain the object’s bits.  
```python
temperature = 21
```
The identifier `temperature` now refers to the integer object whose value is 21.  
No storage allocation or copying occurs beyond the reference itself.  
> [!WARNING]
> Treating the name as a box that physically holds the value leads to confusion when the same object is referenced by multiple names.

### Step 2 — The assignment operator creates the binding
Python’s `=` is not mathematical equality; it is an instruction to bind the name on the left to the object on the right.  
Formally:  
$$ \text{name} \leftarrow \text{object} $$
The arrow denotes reference creation, not numeric assignment.

### Step 3 — Reassignment replaces the binding
Executing the same name with a new right-hand side detaches the old reference and attaches a new one.  
```python
temperature = 21
temperature = 22
```
After the second statement the name `temperature` refers to a different integer object.  
> [!WARNING]
> The original integer 21 may still exist if other references to it remain; reassignment alone does not destroy data.

### Step 4 — Naming rules enforce unambiguous tokens
An identifier must start with a letter or underscore, may contain letters, digits or underscores thereafter, and must not match any reserved keyword.  
These constraints guarantee that the tokenizer can always separate names from literals and operators.

### Step 5 — Case sensitivity and keyword reservation
Python treats `count` and `Count` as distinct names.  
Attempting to use a reserved word such as `class` or `if` as a variable name raises a `SyntaxError` at parse time.

### Step 6 — Multiple names can reference one object
After  
```python
a = [1, 2, 3]
b = a
```
both `a` and `b` refer to the identical list object; mutating the list through either name is visible through the other.

### Step 7 — The textbook statement of assignment semantics
Assignment is defined as name binding in the current scope (Python Language Reference, §6.2). Reassignment is simply a subsequent binding of the same name. No implicit copying occurs.

## 5. Worked examples — every step shown

**Example 1 — Simple binding**  
*Given:* an integer literal.  
*Find:* bind it to a legal name and verify the binding.  
```
x = 5          # create reference
print(x)       # evaluate name → yields 5
```
*Why:* The literal 5 is evaluated first; the resulting object is then bound to `x`.  
**5**  
*Reflection:* The example isolates pure binding without side effects; the same pattern scales to any object.

**Example 2 — Reassignment**  
*Given:* an existing binding.  
*Find:* change the value referenced by the same name.  
```
count = 0
count = count + 1
```
Step 1: evaluate right-hand side → 1.  
*Why:* Addition produces a new integer before any binding occurs.  
Step 2: bind name `count` to that new integer.  
**1**  
*Reflection:* The original 0 is no longer referenced by `count`; understanding this prevents “variable as accumulator” errors.

**Example 3 — Invalid name rejected**  
*Given:* attempt to start an identifier with a digit.  
*Find:* outcome at parse time.  
```
2nd = 2
```
Raises `SyntaxError: invalid syntax`.  
*Why:* The tokenizer cannot classify `2nd` as a valid identifier.  
**SyntaxError**  
*Reflection:* Syntax errors are caught before any execution; they are therefore cheaper to fix than runtime reference errors.

**Example 4 — Keyword collision**  
*Given:* attempt to use reserved word `lambda`.  
*Find:* parser response.  
```
lambda = 3
```
Raises `SyntaxError: invalid syntax`.  
*Why:* `lambda` is tokenized as a keyword, not an identifier.  
**SyntaxError**  
*Reflection:* IDEs highlight keywords; learning the short list of reserved words eliminates an entire class of early errors.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using `=` for equality test | Habit from mathematics                      | Use `==` for comparison; reserve `=` for binding |
| Starting a name with a digit| Thinking any sequence of characters is fine | Internalize the rule “letter or underscore first” |
| Reusing a keyword           | Forgetting the reserved list                | Let the IDE color keywords; rename immediately |
| Case-sensitivity mistakes   | Assuming case-insensitive languages         | Adopt a single casing style (e.g., snake_case) |
| Expecting assignment to copy| Mental model of variables as boxes          | Draw reference arrows; test with mutable objects |
| Overly terse names          | Desire for speed while typing               | Require names to be pronounceable in code review |
| Shadowing built-ins         | Accidentally naming a variable `list` or `str` | Prefix or choose descriptive alternatives    |

## 7. The textbook-precise statement
Assignment in Python is a binding operation: if `name` is an identifier and `expr` is an expression, the statement `name = expr` evaluates `expr` and binds the resulting object to `name` in the current scope (Python Language Reference, version 3.12, §6.2). Reassignment is the same operation applied to an already-bound name. No type declaration is required; names are resolved at runtime via dictionaries that map identifiers to objects. The operation is defined only when `name` conforms to the lexical rule `identifier ::= (letter|"_") (letter|digit|"_")*` and is not a keyword.

## 8. Visual — diagram or schematic
```text
Memory heap          Names (symbol table)
+-------------+      +-------------+
| int 21      | <--- | temperature |
+-------------+      +-------------+
                     | count       | ----> int 1
                     +-------------+
```
The diagram shows two independent names; `temperature` points to one object while `count` points to another. Reassignment would redraw only the arrow leaving the name.

## 9. The memory technique
1. **The hook** — Picture a luggage tag (the name) clipped to a suitcase (the object); clipping the tag to a different suitcase never alters the first suitcase’s contents.
2. **What to overlearn** — Valid identifier starts with letter or `_`; `=` creates a reference, never copies; Python is case-sensitive.
3. **Spaced-repetition schedule** — Review naming rules at 1 day, 3 days, 7 days, 16 days, 35 days after first encounter.
4. **First-principles fallback** — Re-derive from the tokenizer: any token that matches the identifier production and is not a keyword may be bound.

## 10. What this unlocks
Mastery of naming and binding removes the last syntactic obstacle to writing executable statements and opens the door to control flow, functions, and data structures.  
- Conditionals (`if temperature > 30`) rely on readable, correctly bound variables.  
- Function parameters are simply additional name bindings.  
- Lists and dictionaries store references created by the same assignment syntax.  
- Scope rules (local versus global) are defined in terms of where bindings occur.

## 11. Self-check — five questions, no answers
1. Which of the following are legal variable names: `_count`, `2count`, `count2`, `class`, `Class`?
2. After `a = [1,2]; b = a; b.append(3)`, what does `a` contain?
3. Write the shortest assignment statement that changes the object referenced by `x` from 10 to 20 without using the literal 20 on the right-hand side.
4. Predict the exact error message Python produces for the line `if = 5`.
5. A colleague writes `total = total + item`. Explain, using reference semantics, why this statement does not require a temporary variable even though it reads and writes the same name.