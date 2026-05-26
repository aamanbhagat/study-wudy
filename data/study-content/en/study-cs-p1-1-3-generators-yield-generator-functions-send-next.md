## 1. The one-sentence answer
**A generator is a function that uses `yield` to produce a lazy iterator, pausing execution after each value and resuming on demand via `next()` or `send()`.**

Ordinary functions compute an entire result and return it once. A generator function instead returns control to the caller after every `yield`, preserving its local state so the next call continues exactly where it left off. This produces values one at a time without building an intermediate collection, which is why generators consume constant memory regardless of sequence length.

The protocol is simple: calling the generator function yields a generator object; repeated calls to `next(g)` advance it until the next `yield` expression; `g.send(value)` both resumes the generator and injects a value that becomes the result of the `yield` expression inside the function.

> [!NOTE]
> The decisive insight is that `yield` is not “return plus continue”; it is a two-way suspension point that turns the call stack into a controllable coroutine.

## 2. Why this matters — concrete and current
SpaceX telemetry pipelines stream millions of sensor readings per second from Falcon 9 boosters; generators let ground software consume each packet, filter it, and forward aggregates without ever materialising the full buffer in RAM.

PyTorch’s `DataLoader` uses generator functions to feed GPU batches during training of large language models; each worker yields a tensor batch on demand, enabling overlap of data loading with back-propagation and keeping GPU utilisation above 95 %.

The Large Hadron Collider’s event-filter farm at CERN processes 40 million collisions per second; generator-based stream processors discard uninteresting events in constant memory, reducing the data volume that must be written to tape by five orders of magnitude.

Spotify’s recommendation feature pipeline builds personalised playlists from billions of listening events; a chain of generators applies successive transformations—normalisation, feature extraction, ranking—while the working set never exceeds a few megabytes per user shard.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Functions & scope    | Generators are functions whose local variables survive suspension |
| `for` loop & iteration protocol | Generators implement `__next__` and `__iter__`, so they plug directly into any iteration construct |
| Exceptions           | `StopIteration` signals exhaustion; `GeneratorExit` is used for clean shutdown |

## 4. Building the idea — from intuition to formalism

### Step 1 — From eager lists to lazy production
A normal function that returns a list materialises every element before the caller sees any of them. Replacing the final `return` with `yield` turns the function into a generator that produces one element, pauses, and waits for the next request.

Example:
```python
def squares(n):
    for i in range(n):
        yield i * i
```
Formal statement: execution of a generator function creates a generator object `g` whose `__next__` method resumes the suspended frame until the next `yield` expression is reached.

> [!WARNING]
> If you still write `return values` inside the loop you will return on the first iteration and discard the rest of the sequence.

### Step 2 — The generator object and the iterator protocol
Calling `squares(3)` does not run any loop body; it returns a generator object that satisfies the iterator protocol. Each call to `next(g)` executes until the next `yield`, returns that value, and freezes the frame again.

Formal statement:  
$$
\text{next}(g) \;\mapsto\; \text{value at next yield or raises StopIteration}
$$

### Step 3 — Suspension and resumption mechanics
When `yield` is reached, the entire activation record (local variables, program counter, exception state) is saved on the generator object. The next `next(g)` restores that record and continues immediately after the `yield`.

> [!WARNING]
> Any `try/finally` blocks that were active at suspension remain active; an unhandled `GeneratorExit` will propagate through them on close.

### Step 4 — Two-way communication with `send()`
`g.send(v)` resumes the generator and causes the `yield` expression to evaluate to `v` inside the function body. This turns the generator into a simple coroutine.

Formal statement:  
$$
\text{send}(g, v) \;\equiv\; \text{resume with yield-expression} \leftarrow v
$$

### Step 5 — Signalling exhaustion
When the generator function returns (explicitly or by falling off the end), a `StopIteration` exception is raised to the caller. Any value returned by the function is placed in the `value` attribute of that exception (PEP 380).

### Step 6 — Textbook definition
A generator function is any function containing at least one `yield` expression. Its invocation produces a generator object that implements the iterator protocol and supports bidirectional data flow via `send()`.

## 5. Worked examples — every step shown

**Example 1 — Infinite counter**  
*Given:* need an unbounded sequence of integers.  
*Find:* generator that never materialises more than one value.  
```python
def counter(start=0):
    n = start          # initialise once
    while True:
        yield n        # suspend, return current n
        n += 1         # resume here on next next()
```
*Why* the assignment `n = start` executes only on the first call.  
*Why* the `while True` never terminates inside the generator.  
**Final answer:** `next(counter())` yields 0, 1, 2, … indefinitely.  
*Reflection:* the loop variable lives in the suspended frame, giving constant memory.

**Example 2 — Consuming with `next`**  
*Given:* the squares generator above.  
*Find:* first three squares.  
```python
g = squares(5)
a = next(g)   # yields 0, frame paused after first yield
b = next(g)   # yields 1
c = next(g)   # yields 4
```
*Why* each `next` resumes exactly after the previous `yield`.  
**Final answer:** `a, b, c == 0, 1, 4`.  
*Reflection:* manual `next` calls reveal the same mechanics the `for` loop hides.

**Example 3 — Coroutine accumulator with `send`**  
*Given:* need a running sum that accepts new values.  
*Find:* generator that both yields and receives.  
```python
def accumulator():
    total = 0
    while True:
        value = yield total   # send() supplies value
        if value is None:
            continue
        total += value
```
Step-by-step:  
`g = accumulator()` → generator created.  
`next(g)` → runs to `yield total`, returns 0.  
`g.send(3)` → `value` becomes 3, `total` becomes 3, yields 3.  
**Final answer:** successive `send` calls produce the cumulative sums 0, 3, 10, …  
*Reflection:* `yield` now acts as both output and input expression.

**Example 4 — Closing and resource cleanup**  
*Given:* a generator that opens a file.  
*Find:* guaranteed close even on early termination.  
```python
def reader(path):
    f = open(path)
    try:
        for line in f:
            yield line
    finally:
        f.close()
```
Calling `g.close()` injects `GeneratorExit` at the suspension point, executing the `finally` block.  
**Final answer:** file descriptor is released regardless of how many lines were consumed.  
*Reflection:* `finally` survives suspension; `close()` is the only safe way to force cleanup.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using `return` inside generator   | Expectation that `return` behaves like `yield` | Replace with `yield` or raise `StopIteration` explicitly |
| Reusing an exhausted generator    | Generator object is single-use              | Create a fresh generator object each time    |
| Forgetting that `next(g)` raises `StopIteration` | Implicit in the protocol                    | Use `next(g, default)` or wrap in `for` loop |
| Calling `send()` before first `next()` | `yield` expression has not been reached yet | Always prime with `next(g)` or `g.send(None)` |
| Storing large state in the generator frame | Local variables live until exhaustion       | Keep only the minimal state required         |
| Mixing `yield` and `return value` without understanding PEP 380 | Returned value is hidden inside `StopIteration.value` | Use explicit `return` only when you need to propagate a final result |
| Closing a generator that holds locks | `GeneratorExit` may be raised inside critical section | Use context managers around the generator    |

## 7. The textbook-precise statement
A generator function is a function whose body contains at least one `yield` expression (Python Language Reference, §6.2.9). Its invocation returns a generator object `g` satisfying:  
- `g.__iter__() is g`  
- `next(g)` resumes execution until the next `yield` expression `y`, evaluates `y` and returns its value, or raises `StopIteration` (with optional `.value`) when the frame returns.  
- `g.send(v)` resumes and binds `v` to the `yield` expression.  
Reference: Luciano Ramalho, *Fluent Python*, 2e, Chapter 17.

## 8. Visual — diagram or schematic
```text
Generator State Machine
          call()
   [new] ----------> [created]
                        |
                        | next() / send(None)
                        v
                   [running] ---- yield ----> [suspended]
                        ^                       |
                        |     next() / send(v)  |
                        +-----------------------+
                        |
                   return / end
                        v
                   [closed]  --> StopIteration
```
Each arrow is labelled with the operation that triggers the transition; the suspended state preserves the exact program counter and locals.

## 9. The memory technique

**The hook**  
Picture a factory worker who stops at a conveyor belt, hands you one widget (`yield`), and waits with arms folded until you tap him (`next`) or hand him a note (`send`) before continuing.

**What to overlearn**  
- `yield` suspends and returns a value; `return` ends the generator.  
- Every generator is its own iterator (`__iter__` returns self).  
- `send(None)` is identical to `next()`.

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive from the iterator protocol: implement `__next__` that saves and restores a stack frame; the syntactic sugar is simply the `yield` keyword.

## 10. What this unlocks
Generators are the foundation of Python’s asynchronous coroutines, the `asyncio` event loop, and the entire `itertools` module. They also enable zero-copy streaming in data-processing libraries such as Pandas’ `read_csv` chunksize mode and Apache Beam pipelines.

- Coroutines and `async def` / `await`  
- `yield from` delegation (PEP 380)  
- Context-manager protocol for generators (`@contextlib.contextmanager`)  
- Lazy evaluation in functional pipelines (`map`, `filter` on generators)

## 11. Self-check — five questions, no answers
1. Write a generator that yields the first `n` Fibonacci numbers without storing the whole sequence.  
2. What exception is raised when you call `next()` on an exhausted generator, and where does any returned value appear?  
3. Show the exact state of local variables after the second `send(5)` in an accumulator generator that started with `next(g)`.  
4. Why does the following code leak file descriptors?  
   ```python
   for line in open('huge.log'):
       if 'ERROR' in line: break
   ```  
5. Construct a generator that can be closed safely while it holds a threading lock; demonstrate the correct usage pattern.