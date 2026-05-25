## What it is
A generator is a special kind of function that produces a sequence of values over time, rather than computing them all at once and returning them in a list. It uses the `yield` keyword to pause its execution and hand a value back to the caller, remembering its state for the next time it's called.

## Why it matters
Generators are fundamental for memory efficiency when dealing with large data streams. In machine learning, you'll use generators to feed massive datasets to a model for training without loading the entire dataset into RAM. In physics and rocketry, they are essential for processing continuous streams of sensor data or handling the output of large-scale simulations that would otherwise exhaust system memory.

## When to study it
You must be comfortable with Python functions (`def`, `return`), `for` loops, and the basic concept of iteration (what allows a `for` loop to work on a list). Understanding how to write a class with `__iter__` and `__next__` methods is helpful for context but not a strict prerequisite; generators are a simpler way to create iterators.

## How to study it (step by step)
1.  **Contrast with a normal function.** Write a function that generates the first 1,000,000 square numbers, appends them to a list, and returns the list. Notice the delay and memory usage.
2.  **Build your first generator.** Convert the previous function into a generator function by replacing `list.append(n)` with `yield n` and removing the `return` statement. Iterate over the generator object with a `for` loop and observe how it produces values instantly with minimal memory overhead.
3.  **Use `next()` manually.** Instead of a `for` loop, create the generator object and call `next()` on it repeatedly. Print the result each time. Call it one more time than there are values to see the `StopIteration` exception. This reveals the underlying mechanism of the `for` loop.
4.  **Introduce `send()` for two-way communication.** Create a simple generator that yields a number and can receive a new number to start from. Use `my_generator.send(value)` to inject data into the generator at the point where it is paused. You must call `next()` once to "prime" the generator before you can `send()` a value to it.
5.  **Implement a practical data pipeline.** Write a generator that reads a large log file line by line (`yield line`). Write a second generator that takes the first generator as input and yields only lines containing the word "ERROR". Chain them together to see how generators can form efficient processing pipelines.

## Key ideas, with intuition
1.  **Lazy Evaluation (The Pez Dispenser):** A normal function returning a list is like dumping a whole bowl of candy on the table at once. It's all there, but it takes up a lot of space. A generator is like a Pez dispenser: it holds all the candy, but only gives you one piece at a time when you ask for it (`next()`). This is "lazy" because it defers computation until the value is actually needed.

2.  **Stateful Paused Execution (The Bookmark):** The `yield` keyword is a bookmark. When a generator yields a value, it doesn't forget where it was. It freezes its entire state—all local variables, the exact line of code it's on—and waits. The next time you call `next()`, it opens the book back to the bookmark and continues executing from that exact spot.

3.  **`yield` is an Expression (The Two-Way Radio):** `yield` is not just a command to give a value back; it can also *receive* a value. When you write `received = yield value_to_send_out`, it works in two stages:
    *   It sends `value_to_send_out` to the caller and pauses.
    *   When the caller uses `.send(data)`, the generator wakes up, and the value `data` is assigned to the `received` variable. This turns the generator into a simple coroutine, capable of a dialogue with the caller.

## Worked example
Let's build a generator that yields numbers from a sequence, but allows the caller to "reset" the sequence to a new starting number mid-stream.

```python
def resettable_counter(start=0):
    """A generator that counts up from `start`.
    It can be reset by sending a new starting number.
    """
    print(f"(Generator created, starting at {start})")
    current_val = start
    while True:
        # yield the current value and wait for a potential reset value
        reset_val = yield current_val
        
        # This is the point where the generator resumes after a call
        # to next() or send()
        
        if reset_val is not None:
            print(f"(Generator received reset value: {reset_val})")
            current_val = reset_val
        else:
            current_val += 1

# --- Step 1: Create and prime the generator ---
counter = resettable_counter(10)
# The code inside the function has NOT run yet.

# Priming: run until the first yield statement
val = next(counter) 
# Output: (Generator created, starting at 10)
print(f"Yielded: {val}") 
# Output: Yielded: 10

# --- Step 2: Get the next few values ---
print(f"Yielded: {next(counter)}") # Output: Yielded: 11
print(f"Yielded: {next(counter)}") # Output: Yielded: 12

# --- Step 3: Send a reset value ---
# The generator is currently paused at `reset_val = yield current_val`
# where current_val is 12.
# We will send 50. This value will be assigned to `reset_val`.
val = counter.send(50) 
# Output: (Generator received reset value: 50)
print(f"Yielded after send: {val}")
# Output: Yielded after send: 50

# --- Step 4: Continue counting from the new value ---
print(f"Yielded: {next(counter)}") # Output: Yielded: 51
```

**Reflection:**
-   **Step 1:** Creating the generator object `counter` doesn't execute any code. The first `next(counter)` call runs the function from the beginning until it hits the first `yield`, which returns `10`. The generator then pauses.
-   **Step 2:** Each subsequent `next(counter)` resumes execution. `reset_val` becomes `None` (because `next()` sends `None`), so the `else` block runs, incrementing `current_val`. It then loops and yields the new value.
-   **Step 3:** `counter.send(50)` resumes the generator, but this time `reset_val` is assigned the value `50`. The `if` block executes, changing `current_val`. The loop continues and yields the new `current_val`, which is `50`.
-   **Step 4:** Now that the internal state (`current_val`) has been changed, subsequent `next()` calls continue from this new state.

## Diagrams
Here is the control flow for a simple `next()` call:

```text
  CALLER                        GENERATOR FUNCTION
    |                                |
1. gen = my_gen()  --------------> (Generator object created, code is not run)
    |
2. val = next(gen) --------------> (Execution starts)
    |                                |
    |                              (Code runs...)
    |                                |
    |                              (Reaches `yield data`)
    |                                |
3.  (Receives `data`) <------------- (Pauses, returns `data`)
    |
4. (Continues execution)
    |
5. val2 = next(gen)--------------> (Execution resumes right after `yield`)
    |                                |
    |                              (Code runs until next `yield`)
    |                                |
6. (Receives `data2`)<------------- (Pauses again)
    |
   ...
```

And here is the flow for a `send()` call:

```text
  CALLER                        GENERATOR FUNCTION
    |                                |
    |                              (Paused at `received = yield data`)
    |                                |
1. new_val = gen.send(5) -------> (Resumes execution)
    |                                |
    |                              (`received` is assigned the value 5)
    |                                |
    |                              (Code continues running...)
    |                                |
    |                              (Reaches the next `yield new_data`)
    |                                |
2. (Receives `new_data`) <-------- (Pauses, returns `new_data`)
    |
3. (Continues execution)
```

## Memory technique — remember this forever
1.  **The Story:** Think of a generator as a "lazy factory worker".
    *   Calling the function (`my_worker = factory()`) is like hiring the worker. They show up but haven't started working yet.
    *   `next(my_worker)` is you telling them, "Okay, make one item." The worker does just enough work to produce one item, `yield`s it to you, and then leans back on their chair, waiting. They remember exactly what tool they were using.
    *   `my_worker.send(new_tool)` is you walking up to the paused worker and handing them a new tool. They take it and use it for the next item they make.

2.  **Must Overlearn:**
    *   Syntax: `def my_gen(): ... yield item ...`
    *   Instantiation: `gen = my_gen()` (creates the generator, doesn't run it)
    *   Execution: `value = next(gen)` or `for value in gen:`
    *   Two-way: `received = yield sent_out` coupled with `gen.send(data)`

3.  **Spaced Repetition Schedule:**
    *   Review this lesson in: 1 day, 3 days, 7 days, 16 days, 35 days. Each time, rewrite the `resettable_counter` example from memory.

4.  **First Principles Pathway:** If you forget the details, rebuild from this core idea: "How can I produce a sequence of values without creating a giant list in memory?" The answer is to produce them one at a time. This requires a function that can *pause* and *resume*. In Python, the keyword for this is `yield`. Everything else (`next`, `send`, `for` loop integration) is a mechanism for controlling this paused execution.

## Common mistakes
1.  **Confusing `yield` with `return`:** `return` exits a function permanently. `yield` pauses it. A function can have many `yield` statements and will be resumed after each one.
2.  **Forgetting to Prime a Generator:** Calling `gen.send(value)` on a brand-new generator will raise a `TypeError`. The generator must first be advanced to its first `yield` statement before it's in a state to "receive" a value. Always call `next(gen)` once before you start using `send()`.
3.  **Expecting the Function to Run on Call:** Writing `my_gen()` does not run any code in the generator. It only creates and returns the generator object. Execution begins only with the first call to `next()`.
4.  **Ignoring `StopIteration`:** Manually calling `next()` on an exhausted generator raises a `StopIteration` exception. `for` loops handle this automatically, but if you're using a `while True` loop with `next()`, you must wrap it in a `try...except StopIteration` block to handle the end of the sequence gracefully.

## Self-check
1.  Write a generator function `powers_of(base, limit)` that yields successive powers of `base` (i.e., $base^0, base^1, base^2, ...$) until the value exceeds `limit`.
2.  Write a generator that takes a filename as input and yields each line of the file, but only if the line contains a digit.
3.  Create a generator that simulates a traffic light. It should `yield` the strings "Green", "Yellow", and "Red" in a cycle. It should do this forever, but if a value `True` is `send()`-ed to it, it should immediately skip to "Red" on its next yield.