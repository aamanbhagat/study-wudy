## 1. The one-sentence answer
**Iterators in Python are objects that implement the iterator protocol through the methods `__iter__` and `__next__`, raising `StopIteration` to signal exhaustion.**

An iterator lets you traverse a sequence one element at a time without exposing the underlying storage. When Python encounters a `for` loop or calls `next()` on an object, it first invokes `__iter__` to obtain an iterator, then repeatedly calls `__next__` until `StopIteration` appears. This mechanism decouples the producer of data from the consumer, enabling lazy evaluation and memory-efficient processing of large or infinite streams.

The protocol is deliberately minimal: any class that supplies both methods can behave like a built-in iterator. Once you internalise the handshake between `__iter__`, `__next__`, and `StopIteration`, you can design your own generators, custom data pipelines, or even emulate `range` and `enumerate`.

> [!NOTE]
> The decisive insight is that iteration is not a language feature bolted onto containers; it is a contract any object can fulfil, turning ordinary classes into first-class participants in Python’s looping machinery.

## 2. Why this matters — concrete and current
TensorFlow’s `tf.data.Dataset` objects are iterators that stream training batches from disk or network without loading entire datasets into RAM; Google’s training clusters rely on this exact protocol to keep GPUs fed while keeping memory usage constant.

Pandas uses iterator semantics inside `read_csv(chunksize=...)` so analysts at hedge funds can process multi-gigabyte tick data without swapping; the same `__next__` contract powers the chunked reader.

NumPy’s `nditer` and the newer `numpy.lib.stride_tricks` both expose the iterator protocol, letting scientists write vectorised code that still respects cache locality on semiconductor simulators at Intel and TSMC.

Async web frameworks such as FastAPI and Starlette treat incoming HTTP request streams as asynchronous iterators; each `async for` ultimately calls `__anext__` and catches `StopAsyncIteration`, enabling back-pressure handling at the scale of millions of concurrent connections at companies like Netflix.

Spacecraft telemetry pipelines at NASA’s Jet Propulsion Laboratory wrap raw packet streams in custom iterators so that real-time analysis scripts can consume packets indefinitely without ever materialising the full mission log.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Classes and `__dunder__` methods | Iterators are defined by implementing special methods on user classes.               |
| Exception handling (`try`/`except`) | `StopIteration` is an exception that must be caught or propagated correctly.         |
| `for` loop desugaring    | Knowing that `for x in obj:` expands to an explicit `__iter__`/`__next__` loop clarifies the protocol. |

If any row above feels shaky, pause and revisit that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — An object becomes iterable by returning an iterator from `__iter__`
Any object that possesses an `__iter__` method can participate in a `for` loop. The method must return another object (frequently `self`) that supports `__next__`.

Consider a simple countdown class. Calling `iter(countdown)` invokes `__iter__` and hands back the iterator.

```python
class Countdown:
    def __init__(self, n): self.n = n
    def __iter__(self): return self
```

Formally:  
$$ \text{iter}(o) \triangleq o.\_\_iter\_\_() $$

> [!WARNING]
> Returning `None` or a non-iterator from `__iter__` will raise `TypeError` at runtime; the contract is not optional.

### Step 2 — `__next__` delivers the next value or signals termination
Each call to `next(it)` executes `__next__`. While values remain, the method returns them; when the sequence ends, it must raise `StopIteration`.

Extending the countdown:

```python
    def __next__(self):
        if self.n <= 0: raise StopIteration
        self.n -= 1
        return self.n + 1
```

Formal contract:  
$$ \text{next}(it) = 
\begin{cases}
v & \text{if more items exist} \\
\text{raise StopIteration} & \text{otherwise}
\end{cases}
$$

> [!WARNING]
> Forgetting to raise `StopIteration` produces an infinite loop in any consuming `for` statement.

### Step 3 — The iterator protocol is stateful
`__next__` must remember how far iteration has progressed. Instance variables (`self.n` above) store that state between calls.

### Step 4 — Separate iterable from iterator when needed
Some containers return a fresh iterator each time `__iter__` is called so that multiple independent traversals are possible. The iterable and iterator roles can be split into two classes.

### Step 5 — `StopIteration` carries an optional value
`StopIteration` may hold a `.value` attribute; generator expressions use this to communicate a final return value, but ordinary loops ignore it.

### Step 6 — The protocol is closed under composition
Because every iterator is itself an object, you can wrap one iterator inside another (e.g., `enumerate`, `zip`) and still obey the same contract.

### Step 7 — Textbook-grade statement
An object `it` is an iterator if and only if `type(it).__mro__` contains a class that defines both `__iter__` (returning `self`) and `__next__` (raising `StopIteration` on exhaustion). This definition appears verbatim in the Python Language Reference, §4.5.3 “Iterator Types”.

## 5. Worked examples — har step show karo

**Example 1 — Minimal iterator**
*Given:* a class that yields 0 then stops.  
*Find:* output of `list(MyIter())`.

```python
class MyIter:
    def __init__(self): self.done = False
    def __iter__(self): return self
    def __next__(self):
        if self.done: raise StopIteration
        self.done = True
        return 0
print(list(MyIter()))
```
Step 1: `list()` calls `iter(MyIter())` → returns the instance.  
Step 2: first `next()` returns 0, sets flag.  
Step 3: second `next()` raises `StopIteration`, terminating the list constructor.  
**Final answer:** `[0]`  
*Reflection:* The flag prevents further yields; forgetting it would loop forever.

**Example 2 — Stateful counter**
*Given:* `Countdown(3)`.  
*Find:* successive values from manual `next` calls.

```python
c = Countdown(3)
print(next(c), next(c), next(c))
```
Each `next` decrements internal state until the guard triggers `StopIteration`.  
**Final answer:** `3 2 1` (third call raises)  
*Reflection:* State lives in `self.n`; the same object cannot be restarted without resetting that attribute.

**Example 3 — Separate iterable and iterator**
*Given:* a container that must support two simultaneous loops.  
*Find:* correct class split.

```python
class CountIterable:
    def __init__(self, n): self.n = n
    def __iter__(self): return CountIterator(self.n)

class CountIterator:
    def __init__(self, n): self.n = n
    def __next__(self):
        if self.n == 0: raise StopIteration
        self.n -= 1
        return self.n
```
Two independent iterator instances allow nested iteration.  
**Final answer:** works for `for i in c: for j in c: …`  
*Reflection:* Returning `self` from `__iter__` would have reused the same iterator, breaking nested loops.

**Example 4 — Raising with value**
*Given:* a generator-like iterator that returns a final result.  
*Find:* how to retrieve the value.

```python
class FinalValueIter:
    def __iter__(self): return self
    def __next__(self):
        raise StopIteration(42)
try:
    next(FinalValueIter())
except StopIteration as e:
    print(e.value)
```
**Final answer:** `42`  
*Reflection:* The `.value` attribute is the only sanctioned way to smuggle data out of a terminating iterator.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Returning `self` from `__iter__` in a container that needs multiple traversals | Single iterator instance is reused          | Always return a fresh iterator object                |
| Forgetting to raise `StopIteration` | Infinite loop appears correct during testing | Write an explicit guard before every return          |
| Modifying the sequence while iterating | State becomes inconsistent                  | Document mutation policy or copy data at start       |
| Calling `__next__` directly on a non-iterator | Confuses iterable with iterator             | Always call `iter()` first or use `for`              |
| Storing iteration state in a class variable | All instances share the same counter        | Keep counters inside instance (`self`)               |
| Catching `StopIteration` too broadly | Masks real termination bugs                 | Catch it only in the exact consumption site          |
| Implementing `__next__` but not `__iter__` | `for` loop fails with `TypeError`           | Always implement both methods                        |

## 7. The textbook-precise statement
An iterator is an object `i` such that `i.__iter__()` returns `i` and repeated calls to `i.__next__()` either return successive items or raise `StopIteration`. The built-in function `iter(o)` returns an iterator if `o` defines `__iter__`; otherwise it falls back to `__getitem__`. This definition is taken from the Python Language Reference, version 3.12, §4.5.3 “Iterator Types”.

## 8. Visual — diagram or schematic
```text
for-loop desugaring
-------------------
obj ──iter()──► it
               │
               ▼
          next(it) ──► value ──► body
               │
               └──► StopIteration ──► exit loop
```

## 9. The memory technique
1. **The hook** — Picture a ticket machine (`__next__`) that either dispenses the next ticket or lights a red “sold out” sign (`StopIteration`); the machine itself is the iterator.
2. **What to overlearn** — `__iter__` must return an iterator; `__next__` must raise `StopIteration` exactly when no more items exist.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If you forget the names, rebuild from the `for` loop expansion: `it = iter(obj); while True: try: x = next(it) except StopIteration: break`.

## 10. What this unlocks
Mastery of the iterator protocol lets you write memory-safe data pipelines, custom generators, and asynchronous streams.

- Generator functions (`yield`) are syntactic sugar over the same protocol.
- `itertools` module functions (`chain`, `cycle`, `tee`) compose iterators.
- Async iteration (`__aiter__`, `__anext__`) extends the idea to coroutines.
- Database cursors, file objects, and network sockets all obey the identical contract.

## 11. Self-check — five questions, no answers
1. Write the shortest class that makes `for x in MyClass(): print(x)` output exactly the numbers 5, 4, 3, 2, 1.
2. What happens if `__iter__` returns a brand-new iterator each time versus returning `self`? Demonstrate both behaviours with a nested loop example.
3. A colleague’s iterator sometimes yields the same value twice in a row. Which single line is most likely missing?
4. Convert the following generator expression into an explicit class that implements `__next__` and `StopIteration`: `g = (x*x for x in range(3))`.
5. Explain why catching `StopIteration` inside `__next__` itself is almost always a design error.