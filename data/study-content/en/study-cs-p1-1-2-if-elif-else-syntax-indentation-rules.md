## 1. The one-sentence answer
**Conditional execution in Python is achieved by the keywords `if`, `elif`, and `else` together with colon-terminated headers and mandatory indentation that defines code blocks.**

A condition evaluates to a Boolean value. When that value is true, the indented block immediately beneath the header runs; otherwise execution continues to the next header or exits the entire construct. The language enforces this structure through syntax rather than braces, so the visual layout of the source file is the control-flow definition.

Python evaluates the conditions in textual order. The first true condition triggers its block and skips all remaining branches. An optional `else` block executes only when every preceding condition is false. No other mechanism alters this linear decision order.

> [!NOTE]
> Indentation is not cosmetic; it is the sole mechanism that associates statements with a particular `if`, `elif`, or `else`. Changing the number of leading spaces moves a statement into or out of a branch.

## 2. Why this matters — concrete and current
SpaceX flight software uses nested `if/elif/else` chains to decide between engine-gimbal corrections, abort sequences, and nominal trajectory updates every 10 ms; a single mis-indented line would route a command to the wrong actuator during ascent.

In semiconductor place-and-route tools at TSMC, conditional blocks select between timing models according to process corner flags; the same source file therefore produces masks for both 5 nm and 3 nm nodes without duplication.

Modern reinforcement-learning agents for robotic manipulation at DeepMind encode policy decisions as `if sensor_reading > threshold: action = … elif … else …`; the resulting decision tree is compiled to efficient C for real-time inference on embedded hardware.

Medical-device firmware at Medtronic evaluates patient vital-sign thresholds with `if/elif/else` ladders to trigger alarms; regulatory audits examine indentation precisely because it determines which alarm logic is active.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Boolean expressions      | Every header must produce `True` or `False`               |
| Variable assignment      | Conditions and branch bodies read and write variables     |
| Python statement syntax  | Each line inside a block must be a valid statement        |

## 4. Building the idea — from intuition to formalism

### Step 1 — A condition is simply a Boolean test
Any expression that yields `True` or `False` can appear after `if`.  
Example: `temperature > 37`.  
Formal syntax: `if` *expression* `:`  
> [!WARNING]
> Using an assignment (`=`) instead of a comparison (`==`) silently turns the condition into an assignment expression whose truth value is almost never what you intended.

### Step 2 — The colon marks the start of a block header
The colon is mandatory. It tells the parser that an indented suite follows.  
Example: `if temperature > 37:`  
Formal syntax: header `:` suite  
> [!WARNING]
> Omitting the colon produces `SyntaxError: invalid syntax` before any indentation rule is even considered.

### Step 3 — Indentation defines block membership
All statements belonging to the same branch must share the same leading whitespace. Four spaces is the community convention.  
Example:  
```python
if temperature > 37:
    print("Fever")
```
Formal rule: a suite is a non-empty sequence of statements each preceded by the current indentation level + one increment.  
> [!WARNING]
> Mixing tabs and spaces inside the same file produces `TabError` or, worse, silently mis-associates statements with branches.

### Step 4 — `elif` adds an ordered alternative
`elif` is short for “else if”. It is evaluated only when all preceding conditions were false.  
Formal syntax: `elif` *expression* `:`  
> [!WARNING]
> Writing a second `if` instead of `elif` creates an independent decision that may execute even after the first branch has already run.

### Step 5 — `else` supplies the default case
`else` requires no condition. Its block runs exactly when every earlier test failed.  
Formal syntax: `else:`  
> [!WARNING]
> Placing code after `else` without indentation attaches it to the enclosing scope, not the `else` branch.

### Step 6 — The complete construct
The textbook form is therefore:
```python
if cond1:
    suite1
elif cond2:
    suite2
else:
    suite3
```
Execution transfers to the first true suite and then continues after the entire construct.

## 5. Worked examples — every step shown

**Example 1 — Simple fever check**  
*Given:* `temp = 38.5`  
*Find:* output of the conditional.  
```python
if temp > 37:
    print("Fever")
```
- Evaluate `38.5 > 37` → `True` (*Why*: comparison yields Boolean).  
- Because the condition is true, enter the indented block (*Why*: indentation defines the suite).  
**Fever**  
*Reflection:* The single-branch case already demonstrates that indentation, not braces, delimits scope.

**Example 2 — Adding an alternative**  
*Given:* `score = 72`  
*Find:* grade message.  
```python
if score >= 90:
    print("A")
elif score >= 70:
    print("B")
```
- `72 >= 90` → `False`.  
- Next header `72 >= 70` → `True` → execute its block.  
**B**  
*Reflection:* `elif` prevents the second test from being reached when the first succeeds.

**Example 3 — Full ladder with default**  
*Given:* `x = -3`  
*Find:* sign description.  
```python
if x > 0:
    sign = "positive"
elif x < 0:
    sign = "negative"
else:
    sign = "zero"
```
- Both comparisons false → `else` suite executes.  
**sign = "negative"** (final value)  
*Reflection:* `else` guarantees exactly one branch always runs.

**Example 4 — Nested condition**  
*Given:* `age = 25`, `has_license = True`  
*Find:* eligibility string.  
```python
if age >= 18:
    if has_license:
        status = "eligible"
    else:
        status = "needs license"
else:
    status = "too young"
```
- Outer test true → enter inner `if`.  
- Inner test true → assign `"eligible"`.  
**status = "eligible"**  
*Reflection:* Each level of indentation creates a new lexical block; the inner `else` binds only to the inner `if`.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Missing colon               | Muscle memory from other languages          | Type the colon before pressing Enter         |
| Inconsistent indentation    | Mixing tabs and spaces                      | Configure editor to insert spaces only       |
| Using `=` instead of `==`   | Confusing assignment with equality          | Read the operator aloud while typing         |
| Second `if` instead of `elif` | Forgetting that `if` always evaluates      | Ask “does this test depend on the previous?” |
| Code after `else` not indented | Visual alignment without semantic indent   | Use editor block-indent commands             |
| Empty suite without `pass`  | Python requires at least one statement      | Insert `pass` as placeholder                 |
| Over-long condition line    | Attempting to fit logic on header line      | Factor into a Boolean variable first         |

## 7. The textbook-precise statement
A Python `if` statement has the form  
```
if_stmt ::=  "if" expression ":" suite
             ("elif" expression ":" suite)*
             ["else" ":" suite]
```
where each *suite* is a non-empty sequence of statements sharing a common indentation level strictly greater than that of the header. Execution evaluates the expressions in order; the suite of the first true expression is executed and control passes to the statement following the entire `if_stmt`. If no expression is true and an `else` clause is present, its suite executes. (Van Rossum, *Python Language Reference*, release 3.12, §8.1.)

## 8. Visual — diagram or schematic
```text
if cond1:          ← header, colon required
    suite1         ← 4-space indent defines block 1
elif cond2:
    suite2         ← same indent level as suite1
else:
    suite3         ← final default block
next_statement     ← dedent returns to outer scope
```

## 9. The memory technique
1. **The hook** — Picture a staircase: each `if/elif/else` header is a step; you descend only the first step whose light is green, then jump to the floor below.
2. **What to overlearn** — Colon after every header; four-space indent; `elif` is the only way to chain mutually exclusive tests.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by writing the same logic with explicit `goto` labels; the indentation that replaces the labels is exactly the Python rule.

## 10. What this unlocks
Mastery of `if/elif/else` is the prerequisite for every higher control-flow construct.  
- `while` and `for` loops embed the same indentation and colon discipline.  
- Guard clauses inside functions rely on early `if/return` patterns.  
- Exception handling (`try/except`) follows identical block rules.  
- List comprehensions and ternary expressions are compact spellings of the same decision logic.

## 11. Self-check — five questions, no answers
1. What is printed when `x = 0` in `if x: print("truthy") else: print("falsy")`?  
2. Rewrite the following using `elif`: `if a: … else: if b: …`  
3. Identify the error: `if x > 0: print(x) print("done")`  
4. Why does `if condition = True:` raise a `SyntaxError`?  
5. A block contains only a comment. How must the syntax be completed?