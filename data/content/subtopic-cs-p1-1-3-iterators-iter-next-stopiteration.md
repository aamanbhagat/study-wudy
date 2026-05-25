## What it is
An iterator is an object that represents a stream of data, allowing you to traverse through all the items in a collection. It implements the iterator protocol, which consists of two special methods: `__iter__()` and `__next__()`. The key is that an iterator remembers its position in the sequence, producing one item at a time when you ask for the next one.

## Why it matters
Iterators are fundamental to memory-efficient computing. When processing massive datasets in machine learning, you can't load a terabyte-sized file into RAM; instead, you create an iterator that reads the data one chunk at a time. In physics simulations or rocket telemetry analysis, you process data as a stream—one timestamp, one sensor reading at a time—which is a natural fit for the iterator pattern.

## When to study it
You are ready for this topic if you have a solid grasp of Python's fundamental concepts. Specifically, you must understand:
1.  **Functions:** How to define and call them.
2.  **Classes:** How to define a class with an `__init__` method and instance attributes (e.g., `self.x`).
3.  **Loops:** How a standard `for item in collection:` loop works from a user's perspective.
4.  **Exceptions:** Basic familiarity with `try...except` blocks and the concept of `raise`.

If you are not comfortable with Python classes, review that material first. This topic builds directly on it.

## How to study it (step by step)
1.  **Deconstruct the `for` loop:** Take a simple list `my_list = [1, 2, 3]`. Use the built-in `iter()` function to get its iterator: `my_iterator = iter(my_list)`. Then, call the `next()` function on it repeatedly in your shell: `next(my_iterator)`. Keep calling it until you see the `StopIteration` exception. This reveals the machinery under the hood.
2.  **Build a basic iterator:** Create a class named `Counter` that takes a `max` value in its `__init__`. Implement `__iter__` and `__next__`. The goal is to make `for i in Counter(3): print(i)` print `0`, `1`, `2`.
3.  **Implement the state:** Inside your `Counter` class, add an instance attribute like `self.current = 0`. In `__next__`, check if `self.current < self.max`. If so, return `self.current` and increment it. If not, `raise StopIteration`.
4.  **Combine iterable and iterator:** A common pattern is for an object to be its own iterator. Modify your `Counter` class so that the `__iter__` method simply returns `self`. This is efficient and standard practice for many custom iterators.
5.  **Re-implement a `for` loop:** Write a function `custom_for(iterable)` that uses a `while True` loop and a `try...except StopIteration` block to manually replicate the behavior of a `for` loop. This will solidify your understanding of the protocol.

## Key ideas, with intuition
1.  **Iterable vs. Iterator:** This is the most crucial distinction.
    *   An **iterable** is any object you can loop over (a list, a string, a file). It's like a book. It contains the data, but it doesn't keep track of your reading progress. It knows how to produce an iterator via its `__iter__` method.
    *   An **iterator** is the object that does the actual iterating. It's like a bookmark. It knows where you are in the book (`state`) and how to get you the next page (`__next__`).

2.  **The Iterator Protocol:** This is the contract that makes iteration work in Python. A `for` loop doesn't know about lists or strings specifically; it only knows this protocol.
    *   `for item in iterable:`
    *   **Step 1 (hidden):** Python calls `iter(iterable)`, which internally calls `iterable.__iter__()`. This returns an iterator object.
    *   **Step 2 (hidden):** Python enters a loop and repeatedly calls `next(iterator)`, which internally calls `iterator.__next__()`. The return value is assigned to `item`.
    *   **Step 3 (hidden):** When the iterator runs out of items, its `__next__()` method raises the `StopIteration` exception. The `for` loop catches this specific exception and gracefully exits.

3.  **Statefulness and Exhaustion:** An iterator is stateful; it must remember where it is. A list `[1, 2, 3]` always contains those three numbers. But an iterator for that list, after yielding `1` and `2`, "knows" that the next item is `3`. Once an iterator has been fully consumed (it has raised `StopIteration`), it is exhausted. It's a one-way trip; you can't reset it. You must create a new iterator from the original iterable to start over.

## Worked example
Let's build an iterator that generates the Fibonacci sequence up to a maximum value.

```python
class FibonacciIterator:
    """
    An iterator for the Fibonacci sequence up to a max value.
    """
    def __init__(self, max_val):
        self.max_val = max_val
        self.a = 0
        self.b = 1

    def __iter__(self):
        # This object is its own iterator, so we return self.
        return self

    def __next__(self):
        # Calculate the next Fibonacci number
        fib = self.a
        
        # Check if we have exceeded the max value
        if fib > self.max_val:
            raise StopIteration
        
        # Update the state for the next call
        self.a, self.b = self.b, self.a + self.b
        
        # Return the current Fibonacci number
        return fib

# How to use it:
fib_sequence = FibonacciIterator(100)

# The for loop automatically handles the __iter__, __next__, and StopIteration
print("Using a for loop:")
for number in fib_sequence:
    print(number, end=' ') # prints: 0 1 1 2 3 5 8 13 21 34 55 89 

# Let's try to use it again.
print("\n\nTrying to loop again:")
# This will print nothing, because the iterator is exhausted.
for number in fib_sequence:
    print(number, end=' ')

# To start over, we must create a new instance.
print("\n\nCreating a new instance:")
fib_sequence_2 = FibonacciIterator(100)
for number in fib_sequence_2:
    print(number, end=' ') # prints: 0 1 1 2 3 5 8 13 21 34 55 89
```

**Reflection on the steps:**
1.  `__init__`: We set up the initial state. `max_val` is the boundary condition, and `a` and `b` are the first two numbers that will produce the sequence.
2.  `__iter__`: We make the class its own iterator by simply returning `self`. This is a common and efficient convention.
3.  `__next__`: This is the core logic. First, we check our termination condition (`fib > self.max_val`). If it's met, we *must* `raise StopIteration`. If not, we update our state for the *next* call (`self.a, self.b = ...`) and return the *current* value. This separation of "calculate current value" and "prepare for next value" is key.
4.  **Exhaustion:** The example explicitly shows that after the `for` loop finishes, the `fib_sequence` object's state (`self.a`) is now a large number. Any further calls to `__next__` will immediately raise `StopIteration`, so the second loop does nothing.

## Diagrams

This diagram shows the flow of control for a `for` loop.

```text
+-----------------+         +-----------------+         +------------------+
|   Your Code     |         | Python's `for`  |         | Iterator Object  |
| `for x in data` |         | loop mechanism  |         | (from data)      |
+-----------------+         +-----------------+         +------------------+
        |                           |                           |
        |-------------------------->| 1. Start Loop             |
        |                           |                           |
        |                           | calls iter(data)          |
        |                           |-------------------------->| 2. __iter__()
        |                           |                           |    returns self
        |                           |         <------------------|
        |                           |                           |
        |                           | Loop A:                   |
        |                           | calls next(iterator)      |
        |                           |-------------------------->| 3. __next__()
        |                           |                           |    computes value
        |                           |                           |    updates state
        |                           |    returns value          |
        |                           | <-------------------------|
        |                           |                           |
        |      assigns value to x   |                           |
        |<--------------------------|                           |
        |                           |                           |
        |  executes loop body       |                           |
        |-------------------------->|                           |
        |                           |                           |
        |                           | Loop B:                   |
        |                           | calls next(iterator)      |
        |                           |-------------------------->| 4. __next__()
        |                           |                           |    ... (repeats)
        |                           |                           |
        |                           | Loop N:                   |
        |                           | calls next(iterator)      |
        |                           |-------------------------->| 5. __next__()
        |                           |                           |    raises
        |                           |  catches StopIteration    |    StopIteration
        |                           | <-------------------------|
        |                           |                           |
        |                           | 6. Exits Loop             |
        |                           |                           |
        V                           V                           V
      (continues after loop)
```

## Memory technique — remember this forever
1.  **The Story: The Ticket Taker**
    *   An **iterable** is the entire *roll of tickets* (e.g., `list`, `tuple`).
    *   Calling `iter()` on the roll of tickets is you *hiring a ticket taker*.
    *   The **iterator** is the *ticket taker*. They hold the roll and have a finger on the next ticket. They are **stateful**.
    *   Calling `next()` is you asking the ticket taker, "Next ticket, please!" They tear one off and give it to you.
    *   When the roll is empty, you ask for the next ticket, and they shout, "**Stop!** No more tickets!" (`StopIteration`). The ticket taker is now **exhausted**.

2.  **Must-Overlearn Facts:**
    *   An **iterable** has `__iter__()`. It returns an iterator.
    *   An **iterator** has `__next__()` and `__iter__()`. `__next__()` returns the next item or raises `StopIteration`. `__iter__()` returns `self`.
    *   `for item in iterable:` is syntactic sugar for:
        ```python
        _iterator = iter(iterable)
        while True:
            try:
                item = next(_iterator)
            except StopIteration:
                break
            # ... loop body ...
        ```

3.  **Spaced Repetition Schedule:**
    *   Review this concept and re-implement the `FibonacciIterator` from scratch in: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:**
    *   If you forget everything, remember this: the `for` loop is just a convenient wrapper around a `while` loop that handles a `StopIteration` signal. Start with a list. Call `iter()` on it. Call `next()` on the result. When it breaks, you've rediscovered the protocol. You can always rebuild the `while True / try / except` block from that first principle.

## Common mistakes
1.  **Forgetting `raise StopIteration`:** If your `__next__` method doesn't have a condition that raises `StopIteration`, any `for` loop using it will be an infinite loop.
2.  **Confusing Iterable and Iterator:** Trying to call `next()` on an iterable (like a list) directly will fail. You must call `iter()` on it first to get the iterator. `next([1, 2, 3])` -> `TypeError`. `next(iter([1, 2, 3]))` -> `1`.
3.  **Modifying State Incorrectly:** The `__next__` method must both return the *current* value and update the state for the *next* call. A common bug is to update the state *before* calculating the value to be returned, skipping the first item.
4.  **Assuming an Iterator Can Be Reused:** Treating an exhausted iterator as if it's still full of items. Once `StopIteration` is raised, it will continue to be raised on all subsequent `next()` calls. You must create a new iterator instance to start over.

## Self-check
1.  Implement a class `RangeIterator` that mimics the behavior of the built-in `range()` function. It should take `start`, `stop`, and optional `step` arguments. `for i in RangeIterator(0, 5, 2): print(i)` should print `0 2 4`.
2.  Write an iterator class `ReversedListIterator` that takes a list and iterates over it from the last element to the first.
3.  Consider a file object opened with `f = open('my_file.txt')`. Is `f` an iterable, an iterator, or both? Justify your answer by explaining what `iter(f)` would do and what `next(f)` would do.