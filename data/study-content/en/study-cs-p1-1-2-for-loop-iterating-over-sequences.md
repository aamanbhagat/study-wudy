## 1. The one-sentence answer

**A Python `for` loop assigns each successive element of a sequence to a loop variable and executes an indented block once per element.**

A sequence is an ordered collection that can be traversed from first item to last. The loop hides the mechanics of stepping through the collection; you simply name the variable that will hold the current item. Execution begins at the first element, runs the block, then automatically advances to the next element until none remain.

The mechanism works identically for every built-in sequence type—lists, tuples, strings, and ranges—because each implements the same iteration protocol. No index arithmetic is required unless you deliberately ask for it.

> [!NOTE]
> The loop variable receives a reference to the actual element, not a copy; changes to mutable elements inside the loop therefore affect the original objects.

## 2. Why this matters — concrete and current

SpaceX’s flight software post-processes telemetry streams by iterating over timestamped sensor packets with `for` loops to compute trajectory corrections in real time.  

In machine-learning pipelines at Google, TensorFlow’s `tf.data.Dataset` objects are consumed by `for` loops that feed mini-batches to GPU kernels during every training epoch of models such as PaLM.  

Semiconductor foundries use Python scripts containing `for` loops over lists of wafer coordinates to drive automated optical inspection tools that detect sub-micron defects before chips are diced.  

Astrophysics packages such as Astropy iterate over FITS image headers with `for` loops to calibrate thousands of nightly exposures from telescopes like JWST, producing the reduced data products released to the community.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Assignment statement | The loop performs repeated assignments to the loop variable |
| Indentation & blocks | Python uses whitespace to delimit the code executed per iteration |
| List & string literals | These are the most common sequences you will iterate over |
| Boolean expressions  | Loop termination and conditional logic inside the body rely on them |

## 4. Building the idea — from intuition to formalism

### Step 1 — A sequence is an ordered collection
A sequence stores zero or more values that can be visited in a fixed order.  
Example: `[3, 1, 4]` is a sequence whose first element is `3`, second is `1`, third is `4`.  
Formally, a sequence \( s \) satisfies \( s[i] \) defined for \( 0 \leq i < \operatorname{len}(s) \).  
> [!WARNING] Treating a non-sequence (e.g., an integer) as iterable produces a `TypeError` at runtime.

### Step 2 — The `for` keyword introduces iteration
The keyword `for` followed by a name, the keyword `in`, an iterable expression, and a colon declares that the following block will run once for every element.  
Example: `for x in [3, 1, 4]:`  
Formally: `for` target `in` iterable `:` suite.

### Step 3 — Assignment occurs before each iteration
Before the block executes, the loop variable is bound to the next element.  
Example: first pass binds `x = 3`; second pass rebinds `x = 1`.  
No explicit index is maintained by the programmer.

### Step 4 — The block executes with the current binding
Every statement indented under the `for` line runs with the current value of the loop variable.  
After the block finishes, control returns to the iterator to obtain the next element.

### Step 5 — Iteration ends when the sequence is exhausted
When no elements remain, the loop terminates and execution continues after the block.  
Formally, the iterator’s `__next__` method raises `StopIteration`, which the `for` statement catches silently.

### Step 6 — The textbook statement of the construct
The Python language reference defines the `for` statement as syntactic sugar over an iterator protocol: the iterable’s `__iter__` is called once, then `__next__` is called repeatedly until `StopIteration`.

## 5. Worked examples — every step shown

**Example 1 — Sum the elements of a short list**  
*Given:* `nums = [10, 20, 30]`  
*Find:* total sum using a `for` loop.  
```
total = 0
for n in nums:
    total = total + n   # Why: add current element to accumulator
```
**10**  
*Reflection:* The loop variable `n` successively holds 10, 20, then 30; the pattern generalises to any reduction.

**Example 2 — Count characters in a string**  
*Given:* `s = "data"`  
*Find:* length via iteration.  
```
count = 0
for ch in s:
    count += 1          # Why: increment once per character
```
**4**  
*Reflection:* Strings are sequences of Unicode code points; the same loop works for any iterable of known length.

**Example 3 — Square each value with `range`**  
*Given:* produce squares 0 through 9.  
```
squares = []
for i in range(10):
    squares.append(i * i)  # Why: range yields 0..9
```
**squares == [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]**  
*Reflection:* `range` is a lazy sequence; the loop never materialises the full list in memory.

**Example 4 — Nested loops to build a multiplication table**  
*Given:* 3-by-3 table.  
```
table = []
for i in range(1, 4):
    row = []
    for j in range(1, 4):
        row.append(i * j)   # Why: inner loop runs fully for each outer value
    table.append(row)
```
**[[1, 2, 3], [2, 4, 6], [3, 6, 9]]**  
*Reflection:* Each `for` maintains its own loop variable; inner loop completes before outer advances.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Modifying list while iterating    | List size changes during traversal          | Iterate over a copy: `for x in lst[:]`               |
| Using `range(len(seq))` unnecessarily | Old habit from C-style loops               | Prefer `for item in seq` unless index is required    |
| Forgetting the colon              | Syntax looks like English                   | Always type `:` immediately after the iterable       |
| Indentation error                 | Block not indented under `for`              | Use an editor that shows whitespace or run `python -m py_compile` |
| Rebinding loop variable inside body | Accidental reuse of same name               | Choose descriptive names or use a fresh variable     |
| Expecting `return` to exit only one iteration | Confusion with functions                    | Use `break` for early exit inside loops              |
| Iterating over a mutable default argument | Function-level state persists               | Avoid mutable defaults; create fresh lists inside the function |

## 7. The textbook-precise statement

From the Python Language Reference (v3.12, §8.2):  
“The `for` statement is used to iterate over the elements of a sequence (such as a string, tuple or list) or other iterable object.  
`for_stmt ::= "for" target_list "in" expression_list ":" suite ["else" ":" suite]`  
The expression list is evaluated once; it should yield an iterable object. An iterator is created for the result of the expression list. The suite is then executed once for each item provided by the iterator, in the order returned by the iterator.”

## 8. Visual — diagram or schematic

```text
for x in seq:
    suite
```
```
      ┌─────────────┐
      │  seq        │
      │  ┌───┬───┬───┐
      │  │a  │b  │c  │
      └──┴───┴───┴───┘
           │   │   │
           ▼   ▼   ▼
        ┌─────┐ ┌─────┐ ┌─────┐
        │x = a│ │x = b│ │x = c│  ← successive assignments
        └─────┘ └─────┘ └─────┘
           │     │     │
           ▼     ▼     ▼
         suite  suite  suite   ← block executes each time
           │     │     │
           └─────┴─────┘
                 │
                 ▼
           (StopIteration)
```

## 9. The memory technique

**The hook** — Picture a single-file parade: each person (element) walks past you (the loop variable) exactly once; you perform the same action on every marcher.  
**What to overlearn** — Exact syntax `for name in iterable:`, that `range(n)` yields `0..n-1`, and that `break` exits immediately.  
**Spaced-repetition schedule** — Review syntax at 1 day, 3 days, 7 days, 16 days, 35 days.  
**First-principles fallback** — Rewrite the loop as an explicit `while` loop using an iterator object and `try/except StopIteration`.

## 10. What this unlocks

Mastery of the `for` loop is the gateway to Python’s iterator protocol and all higher-order collection processing.  

- List, set, and dictionary comprehensions are syntactic sugar over the same iteration.  
- Generator functions (`yield`) extend the same protocol to infinite or lazy streams.  
- Libraries such as `itertools`, NumPy vectorisation, and pandas `apply` rest on the identical iteration model.  
- Asynchronous iteration (`async for`) and context-manager iteration follow the same contract.

## 11. Self-check — five questions, no answers

1. Write a `for` loop that prints every second character of the string `"abcdef"`.  
2. What is the value of `x` after `for x in []: pass` executes?  
3. Predict the output of `for i in range(3): print(i); break`.  
4. Explain why `for item in my_list: my_list.remove(item)` can skip elements.  
5. Rewrite the following using a single `for` loop and `enumerate`: produce the list of pairs `[(0,'a'),(1,'b'),(2,'c')]`.