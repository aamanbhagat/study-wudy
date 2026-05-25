## What it is
These are Python's built-in functions for common operations on sequences or collections of data (known as *iterables*). They provide concise, efficient, and readable ways to transform, filter, aggregate, or combine data without writing explicit `for` loops for every task.

## Why it matters
In scientific computing and machine learning, you constantly process large datasets. Imagine analyzing telemetry from a rocket launch: you might `map` a calibration function over thousands of sensor readings, `filter` out anomalous data points, and `zip` pressure readings with temperature readings from the same timestamps. These functions are the fundamental building blocks for data manipulation pipelines in libraries like NumPy and Pandas, forming the vocabulary of efficient data processing.

## When to study it
Before tackling these, you must have a solid grasp of the following. If not, master them first.
1.  **Data Structures:** `list`, `tuple`, `str`.
2.  **Control Flow:** `for` loops. Understanding how to iterate over a list is essential.
3.  **Functions:** How to define your own functions using `def` and, ideally, simple anonymous functions using `lambda`.

## How to study it (step by step)
1.  **Aggregators (15 min):** Open a Python interpreter. Create a list of numbers, `data = [1, 5, -2, 8, 3]`. Use `min(data)`, `max(data)`, and `sum(data)` on it. See how they reduce the entire list to a single value.
2.  **Sorters/Reversers (15 min):** On the same `data` list, apply `sorted(data)` and `list(reversed(data))`. Crucially, print `data` again afterward. Notice that the original list is unchanged. Contrast this with `data.sort()`, which modifies the list in-place.
3.  **Combiners (20 min):** Create two lists, `keys = ['a', 'b', 'c']` and `vals = [1, 2, 3]`. Use `zip(keys, vals)` and wrap it in `list()` to see the result. Now, add a fourth item to `keys` and see how `zip` stops at the length of the shorter list. Use `enumerate(keys)` to see how it pairs each item with an index.
4.  **Transformers (30 min):** Write a simple function `def square(x): return x*x`. On your `data` list, apply `map(square, data)`. Again, wrap it in `list()` to inspect the output. See how it applies the `square` function to every single element.
5.  **Filters (30 min):** Write a predicate function `def is_even(x): return x % 2 == 0`. Use `filter(is_even, data)`. Wrap it in `list()` to see that it only keeps the elements for which `is_even` returned `True`.
6.  **Boolean Aggregators (15 min):** Create a list of booleans `checks = [True, False, True]`. Test `any(checks)` and `all(checks)`. Now, use `filter` and `all` together: check if all numbers in `data` are positive.
7.  **Chain them (20 min):** Try to find the sum of the squares of only the positive numbers in `data`. Solve it by chaining these functions: `sum(map(square, filter(is_positive, data)))`. Read this chain from inside out to understand the flow.

## Key ideas, with intuition
1.  **Iterators are "lazy":** Functions like `map`, `filter`, `zip`, `reversed`, and `enumerate` don't compute everything at once. They create an *iterator* object, which is like a recipe for producing the next value when asked. This is extremely memory-efficient for large datasets, as you don't need to store the entire new list in memory. You must explicitly request all the values, for example by using `list()`, to see the full result.
2.  **Functions as arguments:** The core of `map` and `filter` is treating functions as data. You pass a function (like `square` or `is_even`) into another function (`map` or `filter`). This is a central concept in the *functional programming* paradigm, which emphasizes describing *what* to do, not *how* to do it with loops.
3.  **Three categories of operation:**
    *   **Transformation (1-to-1):** `map`, `sorted`, `reversed`. An input iterable of length $N$ produces an output iterable of length $N$.
        $$ \text{map}(f, [x_1, x_2, \dots, x_N]) \rightarrow [f(x_1), f(x_2), \dots, f(x_N)] $$
    *   **Filtering (N-to-M):** `filter`. An input iterable of length $N$ produces an output iterable of length $M$, where $M \le N$.
        $$ \text{filter}(p, [x_1, x_2, \dots, x_N]) \rightarrow [x_i \mid p(x_i) \text{ is True}] $$
    *   **Aggregation (N-to-1):** `min`, `max`, `sum`, `any`, `all`. An input iterable of length $N$ is reduced to a single output value.
        $$ \text{sum}([x_1, x_2, \dots, x_N]) \rightarrow x_1 + x_2 + \dots + x_N $$

## Worked example
**Problem:** We have a list of sensor readings as tuples of `(time_seconds, voltage)`. We need to find the maximum voltage recorded after `t=100s`, but the sensor has a known offset of -0.1V that must be corrected.

**Data:** `readings = [(0, 5.1), (50, 5.2), (101, 5.4), (152, 5.3), (200, 5.6)]`

**Step 1: Filter the data for the relevant time window.**
We only care about readings where `time > 100`. We need a function that checks this condition. A `lambda` function is perfect for this.
```python
# A lambda function is a small, anonymous function.
# This is equivalent to: def is_after_100(reading): return reading[0] > 100
late_readings_iterator = filter(lambda r: r[0] > 100, readings)

# If we check it now, it's an iterator.
# list(late_readings_iterator) would be [(101, 5.4), (152, 5.3), (200, 5.6)]
```
*Reflection:* `filter` acts as a gatekeeper. It iterates through `readings`, passing each `(time, voltage)` tuple to our `lambda` function. If the lambda returns `True`, the tuple passes through; otherwise, it's discarded.

**Step 2: Map a correction function to extract and adjust the voltage.**
From the filtered data, we only need the voltage, and we need to add the 0.1V correction.
```python
# This lambda takes a reading `r` and returns the corrected voltage `r[1] + 0.1`
corrected_voltages_iterator = map(lambda r: r[1] + 0.1, late_readings_iterator)

# list(corrected_voltages_iterator) would be [5.5, 5.4, 5.7]
```
*Reflection:* `map` acts as a transformation station. It takes each item that `filter` let through and applies the correction/extraction function to it, producing a new stream of values.

**Step 3: Aggregate the results to find the maximum.**
Now we have an iterator of the corrected voltages we care about. We just need the maximum value.
```python
max_voltage = max(corrected_voltages_iterator)

print(max_voltage) # Output: 5.7
```
*Reflection:* `max` is the final step. It consumes the iterator produced by `map`, keeping track of the largest value it has seen, and returns that single result.

**Putting it all together in one line:**
```python
max_voltage = max(map(lambda r: r[1] + 0.1, filter(lambda r: r[0] > 100, readings)))
```
This is dense but powerful. It reads from the inside out: filter the readings, then map a correction, then find the maximum.

## Diagrams
Here is an ASCII diagram illustrating the `map` and `filter` process from the worked example.

```text
`map(f, ...)` -> Applies a function to EACH element. A 1-to-1 transformation.

  INPUT LIST                 FUNCTION f(x) = x*x                OUTPUT ITERATOR
+---+---+---+---+                 y = f(x)                     +-----+-----+-----+-----+
| 1 | 2 | 3 | 4 | -- apply f -->    |                        --> |  1  |  4  |  9  | 16  |
+---+---+---+---+                   |                        +-----+-----+-----+-----+
                                    V

`filter(p, ...)` -> Keeps only elements where a predicate function is TRUE.

  INPUT LIST                 PREDICATE p(x) = is_even(x)        OUTPUT ITERATOR
+---+---+---+---+               p(1) -> False (drop)         +---+---+
| 1 | 2 | 3 | 4 | -- apply p -->  p(2) -> True  (keep)       --> | 2 | 4 |
+---+---+---+---+               p(3) -> False (drop)         +---+---+
                                p(4) -> True  (keep)

`zip(A, B)` -> Pairs elements from two iterables.

  LIST A          LIST B                              OUTPUT ITERATOR
+---+---+---+    +---+---+---+---+                   +-------+-------+-------+
|'a'|'b'|'c'|    | 1 | 2 | 3 | 4 | -- zip -->        |('a',1)|('b',2)|('c',3)|
+---+---+---+    +---+---+---+---+                   +-------+-------+-------+
                                                     (Stops when shortest, 'A', runs out)
```

## Memory technique — remember this forever
1.  **The Story:** Imagine a data factory assembly line.
    *   `list`: A crate of raw parts.
    *   `map`: A **painting station**. Every part that comes through gets painted (the function is applied).
    *   `filter`: A **quality control inspector**. They check each part against a rule (the predicate). If it fails, it's thrown out.
    *   `zip`: A **packaging station**. It takes one part from conveyor belt A and one from belt B and puts them in a box together.
    *   `sum`/`max`: A **final counter** at the end of the line that gives you one number: total parts, or the size of the biggest part.

2.  **Must Overlearn:**
    *   `map(function, iterable)`: Applies `function` to every item of `iterable`.
    *   `filter(predicate, iterable)`: Returns items from `iterable` for which `predicate(item)` is `True`.
    *   `zip(iter1, iter2, ...)`: Aggregates elements from each of the iterables.

3.  **Spaced Repetition Schedule:** Review these concepts and re-do the "How to study it" steps at: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:** If you forget how `map` or `filter` work, you can always rebuild them from a `for` loop. This is the fundamental logic they abstract away.
    *   `list(map(func, data))` is equivalent to:
        ```python
        result = []
        for item in data:
            result.append(func(item))
        ```
    *   `list(filter(predicate, data))` is equivalent to:
        ```python
        result = []
        for item in data:
            if predicate(item):
                result.append(item)
        ```

## Common mistakes
1.  **Forgetting `list()`:** Writing `result = map(square, my_list)` and then being confused when `print(result)` shows `<map object at 0x...>` instead of a list. The result is an iterator; you must consume it, e.g., with `list(result)`.
2.  **`sorted()` vs `.sort()`:** `new_list = sorted(old_list)` creates a new sorted list and leaves `old_list` untouched. `old_list.sort()` sorts the list *in-place* and returns `None`. Assigning the result of `.sort()` to a variable is a common bug: `my_list = my_list.sort()` will result in `my_list` being `None`.
3.  **`zip` with different lengths:** `zip` silently stops as soon as the *shortest* input iterable is exhausted. This is usually desired but can hide bugs if you expected the lengths to be equal.
4.  **Wrong function for `filter`:** Passing a function to `filter` that doesn't return a boolean. For example, `filter(lambda x: x*2, my_list)` will work based on the "truthiness" of the result (`0` is `False`, non-zero numbers are `True`), but this is confusing and not the intended use. `filter` needs a clear `True`/`False` predicate.

## Self-check
1.  Given `numbers = [10, 21, 4, 45, 66, 93]`, write a single line of code that computes the sum of all the odd numbers in the list.
2.  You are given two lists: `satellites = ['AQUA', 'TERRA', 'AURA']` and `altitudes_km = [705, 705, 705]`. Create a list of strings where each string is formatted as `"SATELLITE: ALTITUDEkm"`, e.g., `"AQUA: 705km"`.
3.  You have a list of velocity vectors from a simulation, `velocities = [(1, 2, 0), (0, -1, 3), (5, 0, 1)]`. Write a single expression to determine if *any* vector has a magnitude greater than 5. The magnitude of a vector $(x, y, z)$ is $\sqrt{x^2 + y^2 + z^2}$.