## 1. The one-sentence answer
**An iterator is any object that implements the iterator protocol: `__iter__` returns the iterator itself and `__next__` yields successive values until it raises `StopIteration`.**

In everyday terms, iteration is the act of pulling one item after another from a container without knowing or caring how the container stores its data. Python turns this everyday idea into two explicit methods so that every loop and every consumer can work the same way regardless of whether the source is a list, a file, a network stream, or an infinite mathematical sequence.

The protocol therefore separates two concerns cleanly: an object that knows how to produce an iterator declares itself iterable by providing `__iter__`; the iterator itself is responsible only for delivering the next value or announcing that nothing remains. Once these two responsibilities are isolated, any Python construct that consumes sequences—`for` loops, `map`, `zip`, list comprehensions—can treat every data source uniformly.

> [!NOTE]
> The decisive insight is that `StopIteration` is not an error; it is the normal, expected signal that the sequence has ended. Treating it as an exception to be avoided leads to the most common iterator bugs.

## 2. Why this matters — concrete and current
Pandas uses iterators internally when you call `DataFrame.iterrows()` or stream a CSV with `read_csv(chunksize=...)`; every chunk is delivered by a custom iterator that yields NumPy arrays without loading the entire file into RAM.

PyTorch’s `DataLoader` wraps dataset objects in iterators so that training loops can pull mini-batches from disk, from RAM, or from remote storage with identical `for batch in dataloader:` syntax; the same training script works unchanged across CPU, GPU, and TPU clusters.

The CPython interpreter itself reads source files through an iterator over lines; this design lets the tokenizer consume arbitrarily large files while keeping only a few kilobytes in memory at any moment.

PostgreSQL’s `psycopg` driver returns query results as an iterator over rows; NASA’s data pipelines that process terabytes of telemetry therefore never materialize an entire result set.

## 3. Mental prerequisites

| Concept          | Why you need it here |
|------------------|----------------------|
| Python classes and instance methods | `__iter__` and `__next__` are methods you define on your own classes |
| The `raise` statement and exception objects | `StopIteration` is an exception that must be raised explicitly to terminate iteration |
| The `for` loop desugaring | Knowing that `for x in obj:` calls `iter(obj)` then repeatedly calls `next()` makes the protocol’s purpose obvious |

## 4. Building the idea — from intuition to formalism

### Step 1 — An iterable only promises to produce an iterator
A container is iterable when it answers the question “how do I walk through you?” by returning a fresh iterator object.  
Example: a list answers by returning a list iterator.  
Formally:  
$$
\text{iterable} \triangleq \exists\, m : \text{obj}.\_\_iter\_\_() \mapsto \text{iterator}
$$  
> [!WARNING]  
> Implementing `__iter__` alone does not make an object an iterator; the returned object must still support `__next__`.

### Step 2 — An iterator must also be iterable
Every iterator returns itself from `__iter__`. This single rule lets an iterator be passed directly to any code that expects an iterable.  
Example: `list_iterator.__iter__()` returns the same list iterator.  
Formally:  
$$
\text{iterator}.\_\_iter\_\_() = \text{self}
$$  
> [!WARNING]  
> Returning a new iterator from `__iter__` on an iterator object breaks `itertools` functions that rely on identity.

### Step 3 — `__next__` delivers the next value or ends the sequence
Calling `__next__` (or the built-in `next()`) either returns the subsequent element or raises `StopIteration` to declare exhaustion.  
Example: successive calls on a range iterator yield 0, 1, 2, … until `StopIteration`.  
Formally:  
$$
\text{next}(it) = 
\begin{cases}
v_i & \text{if } i < n \\
\text{raise StopIteration} & \text{otherwise}
\end{cases}
$$  
> [!WARNING]  
> Returning `None` or any sentinel instead of raising `StopIteration` produces an infinite loop in every consumer.

### Step 4 — The protocol is exhausted exactly once
After `StopIteration` has been raised, further calls to `__next__` must continue to raise `StopIteration`; the iterator is now exhausted.  
> [!WARNING]  
> Re-raising the same `StopIteration` instance or resetting internal state silently violates the protocol and breaks `zip`, `map`, and generator delegation.

### Step 5 — The textbook statement of the iterator protocol
An object `it` is an iterator if and only if both of the following hold:  
1. `it.__iter__()` returns `it`;  
2. repeated calls to `it.__next__()` return successive items until `StopIteration` is raised.  
Reference: Python Language Reference, §3.3.7 “Iterator Types”.

## 5. Worked examples — every step shown

**Example 1 — Minimal manual iterator**  
*Given:* A class that yields the integers 0 and 1 then stops.  
*Find:* A correct implementation.  

```python
class TwoStep:
    def __iter__(self):
        self.i = 0          # Why: initialise state on each new iteration
        return self
    def __next__(self):
        if self.i >= 2:
            raise StopIteration
        val = self.i
        self.i += 1
        return val
```

**Example 2 — Using the iterator**  
*Given:* `t = TwoStep()`.  
*Find:* The sequence produced by `list(t)`.  
Step 1: `iter(t)` calls `TwoStep.__iter__` → returns `t` with `i=0`.  
Step 2: `next(t)` returns 0, `i` becomes 1.  
Step 3: `next(t)` returns 1, `i` becomes 2.  
Step 4: `next(t)` raises `StopIteration`.  
**Final answer:** `[0, 1]`

*Reflection:* The explicit state machine inside `__next__` makes termination obvious; forgetting the `raise` produces an infinite loop.

**Example 3 — Iterator that is also its own iterable**  
*Given:* The same `TwoStep` instance used twice in succession.  
*Find:* Whether the second `for` loop produces values.  
The first loop exhausts the iterator; the second loop receives the already-exhausted object and immediately receives `StopIteration`.  
**Final answer:** second loop yields nothing.

*Reflection:* Reusability requires a fresh iterator each time; containers therefore implement `__iter__` to manufacture new iterators.

**Example 4 — Custom file-line iterator**  
*Given:* A class `FileLines(path)` that opens a file and yields lines without loading the whole file.  
*Find:* The three required methods.  
Implementation sketch: `__init__` stores the path, `__iter__` opens the file and returns self, `__next__` reads one line and raises `StopIteration` at EOF, `__del__` or a context manager closes the handle.  
**Final answer:** the class satisfies the iterator protocol and can be used in any `for` loop or `itertools` function.

*Reflection:* Resource management must be paired with the iteration protocol; otherwise file descriptors leak.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Returning a value from `__next__` after `StopIteration` has already been raised | Internal index not permanently past the end | Keep a boolean `exhausted` flag or let the index run to infinity |
| Implementing only `__next__` | Author assumes `__iter__` is optional | Always define both methods; `__iter__` returning self is two lines |
| Using `return` instead of `raise StopIteration` | Confusion with generator syntax | Remember that ordinary methods must raise the exception |
| Storing mutable state on the container instead of the iterator | Desire to avoid writing a separate class | Always create a fresh iterator object that owns its own cursor |
| Catching `StopIteration` inside `__next__` and returning a sentinel | Attempt to “make it nicer” | Let the exception propagate; consumers are written to expect it |
| Reusing the same iterator object across multiple `for` loops | Belief that iteration is idempotent | Document that iterators are single-use; provide a separate iterable factory |
| Forgetting that `iter(obj)` calls `__iter__` | Treating the protocol as magic | Trace `for` loop expansion manually once |

## 7. The textbook-precise statement
An object `i` is an iterator over a sequence if it satisfies the following two method contracts (Python Language Reference, version 3.12, §3.3.7):

1. `i.__iter__()` returns `i`.  
2. Successive calls to `i.__next__()` return the subsequent items of the sequence; when no further items exist, `i.__next__()` raises the built-in exception `StopIteration`. After this exception is raised, every subsequent call must also raise `StopIteration`.

No other methods are required by the language; any additional state or behaviour is an implementation detail of the concrete iterator.

## 8. Visual — diagram or schematic

```text
          +-------------+
          |  Iterable   |
          |  (list,     |
          |   FileLines)|
          +------+------+
                 | __iter__()
                 v
          +------+------+
          |  Iterator   |<---+
          |  (self)     |    | __iter__()
          +------+------+    |
                 |           |
                 | __next__()|
                 v           |
           +-----+-----+     |
           |  value /  |     |
           | StopIter  |-----+
           +-----------+
```

The diagram shows that an iterable produces an iterator; the iterator points back to itself via `__iter__` and either yields a value or terminates via `StopIteration`.

## 9. The memory technique

**The hook**  
Picture a vending machine: `__iter__` opens the slot, each press of `__next__` drops one can, and `StopIteration` is the “empty” light that stays on forever.

**What to overlearn**  
- `it.__iter__() is it` (identity, not equality)  
- `next(it)` either returns an item or raises exactly `StopIteration`  
- Iterators are single-pass by definition

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
If you forget the names, rebuild from the `for` loop expansion: `it = iter(obj); while True: x = next(it)` and realise the loop must terminate, therefore `next` must be able to signal termination.

## 10. What this unlocks
Mastery of the iterator protocol lets you write lazy, memory-efficient pipelines and understand every higher-level abstraction built on top of it.

- Generator functions and `yield`
- Generator expressions and `itertools`
- Context-manager-based resource iterators (`with` + iteration)
- Asynchronous iteration (`__aiter__`, `__anext__`)
- Custom sequence types that participate in the ABC `collections.abc.Iterator`

## 11. Self-check — five questions, no answers
1. Write the shortest class that satisfies the iterator protocol and yields exactly the integers 3, 4, 5.  
2. What happens if `__iter__` on an iterator returns a new object instead of `self`? Demonstrate with a two-line counter-example.  
3. A programmer catches `StopIteration` inside `__next__` and returns `None`. Which standard library functions will now behave incorrectly? Name at least three.  
4. Explain why `list(it)` and `list(it)` produce different results when `it` is an iterator but identical results when `it` is a list.  
5. Design an iterator over the infinite sequence of Fibonacci numbers; prove that it never raises `StopIteration`.