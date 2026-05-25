## What it is
A `for` loop is a control flow statement that executes a block of code for each item in a sequence. Think of it as an automated way to say, "for each element in this collection, perform this specific action." The loop handles the process of moving from one item to the next until the sequence is exhausted.

## Why it matters
This is one of the most fundamental structures in programming. In physics simulations, you'll use `for` loops to update the state of every particle in a system for each time step. In machine learning, you iterate over millions of data points in a dataset to train a model. In aerospace engineering, you might loop through sensor readings from a flight test to find anomalies or calculate performance metrics.

## When to study it
Before tackling `for` loops, you must have a firm grasp of the following prerequisites. If you are not comfortable with these, review them first.
- **Variables:** How to assign values to names.
- **Data Types:** Specifically `int`, `float`, and `str`.
- **Sequence Data Structures:** You must understand what a `list` is and how a `string` can be treated as a sequence of characters.

## How to study it (step by step)
1.  **Iterate over a simple list.** Open a Python interpreter. Create a list `planets = ['Mercury', 'Venus', 'Earth']`. Write your first loop: `for p in planets: print(p)`. Observe how the variable `p` takes on each value from the list in order.
2.  **Iterate over a string.** A string is a sequence of characters. Write a loop to iterate over your own name, `for char in 'your_name': print(char)`. This reinforces the idea that a loop works on any sequence, not just lists.
3.  **Use the `range()` function.** Often, you need to loop a specific number of times. The `range(N)` function generates a sequence of integers from $0$ to $N-1$. Use it to simulate a 5-second countdown: `for i in range(5, 0, -1): print(i)`. Analyze the arguments: `range(start, stop, step)`.
4.  **Accumulate a result.** The most common use of a loop is to compute an aggregate value. Create a list of numbers, `data = [10, 20, 30]`. Write a loop that calculates their sum. You will need an "accumulator" variable initialized to zero *before* the loop starts.
5.  **Build a new list from an old one.** This is called transformation. Given a list of numbers `x = [1, 2, 3, 4]`, write a loop that creates a *new* list `y` where each element is the square of the corresponding element in `x`. Initialize an empty list `y = []` before the loop, and use the `.append()` method inside.

## Key ideas, with intuition
1.  **The Sequence (`iterable`)**: This is the collection of items the loop will march through. It can be a `list`, a `string`, a `tuple`, or an object returned by `range()`. It must be something that can be iterated over, hence the formal name "iterable."
    $$
    \text{sequence} = [ \text{item}_0, \text{item}_1, \text{item}_2, \dots, \text{item}_{N-1} ]
    $$
2.  **The Loop Variable**: This is a temporary variable that acts as a placeholder. In each pass (or "iteration") of the loop, Python assigns the next item from the sequence to this variable. The name is your choice; `for planet in planets:` is more readable than `for x in my_list:`.
3.  **The Loop Body**: This is the indented block of code directly under the `for` statement. This block is executed once for each item in the sequence. The loop variable is accessible within this body.
    ```python
    for loop_variable in sequence:
        # This is the loop body.
        # It is executed for each item.
        # The loop_variable holds the current item.
    ```
4.  **Exhaustion**: The loop automatically stops once it has processed the last item in the sequence. It doesn't run forever by accident, unlike a `while` loop where the condition might always be true. The `for` loop "knows" when the sequence ends.

## Worked example
**Problem**: A rocket has three stages. We have their masses in kilograms and their specific impulses ($I_{sp}$) in seconds. Calculate the total impulse, $I_{total}$, for the rocket, where the impulse for a single stage is given by $I = m \cdot g_0 \cdot I_{sp}$. Assume standard gravity $g_0 = 9.81 \, \text{m/s}^2$.

**Data**:
- Masses: `masses = [150000, 40000, 10000]` (kg)
- Specific Impulses: `isps = [311, 421, 462]` (s)

**Solution**:
1.  **Initialization.** We need a variable to accumulate the total impulse. We'll also define our constant $g_0$.
    ```python
    total_impulse = 0.0  # Use a float for precision
    g0 = 9.81
    ```
    *Reflection*: We start at zero because before we've considered any stages, the total impulse is zero.

2.  **Set up the loop.** We need to iterate through the stages. Since we need the mass and $I_{sp}$ for each stage, we need to access both lists by index. The `range(len(masses))` function is perfect for generating the indices $0, 1, 2$.
    ```python
    # len(masses) is 3, so range(3) gives us indices 0, 1, 2.
    for i in range(len(masses)):
        # Loop body will execute 3 times.
        # First time, i = 0. Second, i = 1. Third, i = 2.
    ```
    *Reflection*: Using an index `i` allows us to access the `i`-th element of *multiple* lists simultaneously, which is a powerful pattern.

3.  **Perform the calculation inside the loop.** For each index `i`, we extract the corresponding mass and $I_{sp}$, calculate the impulse for that stage, and add it to our accumulator.
    ```python
    for i in range(len(masses)):
        mass = masses[i]
        isp = isps[i]
        
        stage_impulse = mass * g0 * isp
        total_impulse = total_impulse + stage_impulse # or total_impulse += stage_impulse
    ```
    *Reflection*: The core logic is inside the loop. The `total_impulse` variable is updated in each iteration, carrying its value over to the next.

4.  **Final result.** After the loop finishes, the `total_impulse` variable holds the final sum.
    ```python
    print(f"Total Impulse: {total_impulse:.2f} Ns")
    ```
    *Reflection*: The `print` statement is *outside* (de-indented) the loop. If it were inside, it would print the running total at each step.

**Full Code**:
```python
masses = [150000, 40000, 10000]
isps = [311, 421, 462]

total_impulse = 0.0
g0 = 9.81

for i in range(len(masses)):
    mass = masses[i]
    isp = isps[i]
    
    stage_impulse = mass * g0 * isp
    total_impulse += stage_impulse

print(f"Total Impulse: {total_impulse:.2f} Ns")
# Output: Total Impulse: 108169650.00 Ns
```

## Diagrams

The `for` loop process: the loop variable `p` takes on the value of each item from the `planets` list, one by one.

```text
      +---------------------------------+
      | planets = ['Mercury', 'Venus', 'Earth'] |
      +---------------------------------+
          ^           ^           ^
          |           |           |
Iteration 1 | Iteration 2 | Iteration 3 |
+-----------+-----------+-----------+
|           |           |           |
v           v           v
p = 'Mercury'   p = 'Venus'   p = 'Earth'
|           |           |
v           v           v
+-----------+-----------+-----------+
| print(p)  | print(p)  | print(p)  |  <-- Loop Body
+-----------+-----------+-----------+
```

Flow of control for `for i in range(3)`:

```text
                 +-------------------+
                 | i = 0             |
                 +-------------------+
                       |
                       v
+--------------+     +-------------------+
| Is sequence  | Yes | Execute loop body |
| exhausted?   |---->| with i=0          |
+--------------+     +-------------------+
      ^                |
      |                v
      |              +-------------------+
      |              | i = 1             |
      |              +-------------------+
      |                    |
      |                    v
      |   +--------------+     +-------------------+
      |   | Is sequence  | Yes | Execute loop body |
      |   | exhausted?   |---->| with i=1          |
      |   +--------------+     +-------------------+
      |         ^                |
      |         |                v
      |         |              +-------------------+
      |---------+              | i = 2             |
                               +-------------------+
                                     |
                                     v
                +--------------+     +-------------------+
                | Is sequence  | Yes | Execute loop body |
                | exhausted?   |---->| with i=2          |
                +--------------+     +-------------------+
                      | No
                      v
                +--------------+
                | Exit loop    |
                +--------------+
```

## Memory technique — remember this forever
1.  **Mnemonic Story**: Imagine you are a quality control inspector named **`item`** at a factory. You stand at a conveyor belt called **`sequence`**. **`For`** each box that comes to you **`in`** the line, you open it, perform a check (the **`loop body`**), and then wait for the next box. The colon `:` is the command to start your work. The indentation is your workspace.
2.  **Must Overlearn**:
    - The core syntax: `for <variable> in <sequence>:` (The variable, the `in`, the sequence, the colon).
    - The role of indentation: Code at the same level of indentation below the `for` line is part of the loop.
    - The `range` function: `range(stop)` goes from $0$ to `stop-1`. `range(start, stop)` goes from `start` to `stop-1`.
3.  **Spaced Repetition Schedule**: Review this mini-lesson and rewrite the worked example from memory at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.
4.  **First Principles Pathway**: If you forget `for`, you can rebuild it from a `while` loop. A `for` loop is just a cleaner way to write this:
    ```python
    # for item in my_list:
    #     print(item)

    # Is equivalent to:
    index = 0
    while index < len(my_list):
        item = my_list[index]
        print(item)
        index += 1
    ```
    This shows the mechanics: you need a counter (`index`), a condition to stop (`index < len(my_list)`), a way to get the current item (`my_list[index]`), and a way to advance to the next (`index += 1`). The `for` loop manages all four of these things for you automatically.

## Common mistakes
1.  **Off-by-one errors with `range()`**: `range(10)` produces numbers $0, 1, \dots, 9$, *not* including 10. This means it runs 10 times, but the last index is 9. This is a frequent source of bugs.
2.  **Modifying a list while iterating over it**: If you write `for item in my_list: my_list.remove(item)`, the loop can get confused, skip elements, and produce unexpected results because the sequence it's working on is changing under its feet. The safe pattern is to create a *new* list.
3.  **Indentation errors**: The code to be executed by the loop *must* be indented. Code that should run after the loop finishes must be *de-indented* to the same level as the `for` statement itself.
    ```python
    # Wrong: prints "Loop finished" on every iteration
    for i in range(3):
        print(i)
        print("Loop finished") 

    # Right: prints "Loop finished" only once at the end
    for i in range(3):
        print(i)
    print("Loop finished")
    ```

## Self-check
1.  Write a Python `for` loop that prints all even numbers from 2 to 20, inclusive.
2.  Given a list of rocket launch countdown messages `log = ['T-minus 3', 'T-minus 2', 'T-minus 1', 'Ignition', 'Liftoff']`, write a `for` loop that creates a new list containing only the messages that start with the letter 'T'.
3.  The velocity of a rocket under constant acceleration $a$ is given by $v(t) = v_0 + at$. Given an initial velocity $v_0 = 0$, an acceleration $a = 20 \, \text{m/s}^2$, write a loop that calculates and stores the velocity at each second for the first 10 seconds of flight (i.e., for $t=0, 1, 2, \dots, 10$). The output should be a list of velocities.