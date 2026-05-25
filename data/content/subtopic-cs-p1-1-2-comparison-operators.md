## What it is
Comparison operators are symbols used to compare two values. They form a question that the computer answers with a Boolean value: either `True` or `False`. These operators are the fundamental building blocks for decision-making in any program.

## Why it matters
This is the basis of all logic and control flow. In rocket science, a guidance system continuously compares the rocket's actual trajectory to its planned trajectory (`current_angle < target_angle`). In machine learning, a model might classify an image by checking if a calculated probability is greater than a threshold (`confidence_score >= 0.9`). Without comparison, a program could only execute one fixed sequence of commands.

## When to study it
You should be comfortable with the following before proceeding:
1.  **Variables**: What a variable is and how to assign a value to it using the single equals sign (`=`).
2.  **Data Types**: Specifically `int` (integers), `float` (floating-point numbers), and `bool` (Boolean `True`/`False`).

If you are not solid on the distinction between the assignment operator (`=`) and the concept of equality, pause and review that first.

## How to study it (step by step)
1.  **Open a Python Interpreter**: The fastest way to learn is by doing. Open a Python shell (or an interactive notebook).
2.  **Test Each Operator on Literals**: Type these expressions in one by one and observe the `True`/`False` output. This builds muscle memory.
    -   `10 == 10`
    -   `10 == 11`
    -   `10 != 11`
    -   `10 < 20`
    -   `10 > 20`
    -   `10 <= 10`
    -   `10 >= 11`
3.  **Use Variables**: Now, abstract away from literal numbers.
    ```python
    x = 100
    y = 100.0
    z = 101
    print(x == y) # What do you expect? What do you see?
    print(x < z)
    print(x >= z)
    ```
4.  **Compare Different Types**: See how Python handles comparisons between an `int` and a `float`. Notice that `100 == 100.0` is `True`. The interpreter is smart enough to see their numerical values are identical.
5.  **Compare Strings**: Try comparing strings. This reveals a new behavior.
    ```python
    print('alpha' < 'beta')
    print('gamma' > 'beta')
    print('A' == 'a')
    ```
    This comparison is lexicographical (like in a dictionary).
6.  **Write a Tiny Program**: Combine this with an `if` statement. Write a script that defines a variable `age = 25` and then prints "Access Granted" if `age >= 18` and "Access Denied" otherwise. This connects comparison to control flow.

## Key ideas, with intuition
1.  **The Output is Always Boolean**: A comparison operation doesn't result in a number or a string. Its sole purpose is to answer a yes/no question, which in Python is represented by `True` or `False`.
    $$
    \text{expression}_1 \quad \text{op} \quad \text{expression}_2 \quad \rightarrow \quad \{\text{True}, \text{False}\}
    $$
2.  **`=` Assigns, `==` Asks**: This is the most critical distinction.
    -   `x = 5` is a command: "Put the value 5 into the variable `x`." It is an action.
    -   `x == 5` is a question: "Is the value in `x` currently equal to 5?" It is an evaluation.
3.  **"Or Equal To" is Inclusive**: The operators `<=` (less than or equal to) and `>=` (greater than or equal to) include the boundary point. If `x = 5`, then both `x <= 5` and `x >= 5` are `True`. This is crucial for defining ranges and handling edge cases.

## Worked example
Let's determine if a spacecraft is in Low Earth Orbit (LEO). LEO is generally defined as an altitude between 160 km and 2,000 km, inclusive.

```python
# Define the spacecraft's current altitude in kilometers
altitude_km = 850

# Define the boundaries for LEO
leo_min_altitude_km = 160
leo_max_altitude_km = 2000

# Step 1: Check if the altitude is high enough for LEO.
# We need to know if altitude_km is greater than or equal to the minimum.
is_above_min = (altitude_km >= leo_min_altitude_km)
print(f"Is altitude >= {leo_min_altitude_km}? {is_above_min}") # Output: Is altitude >= 160? True

# Step 2: Check if the altitude is low enough for LEO.
# We need to know if altitude_km is less than or equal to the maximum.
is_below_max = (altitude_km <= leo_max_altitude_km)
print(f"Is altitude <= {leo_max_altitude_km}? {is_below_max}") # Output: Is altitude <= 2000? True

# Step 3: Combine the checks to determine if it's in LEO.
# For the spacecraft to be in LEO, BOTH conditions must be True.
# (We will cover the 'and' operator later, but the logic holds).
is_in_leo = is_above_min and is_below_max
print(f"Is the spacecraft in LEO? {is_in_leo}") # Output: Is the spacecraft in LEO? True
```

**Reflection:**
-   **Step 1** worked because the `>=` operator correctly evaluated `850 >= 160` to `True`. It includes the 160 km boundary.
-   **Step 2** worked because the `<=` operator correctly evaluated `850 <= 2000` to `True`. It includes the 2000 km boundary.
-   **Step 3** combined these Boolean results to make a final determination. The raw comparisons are the atomic units of this logical decision.

## Diagrams
A number line is the best way to visualize these operators.

For a variable `x` and a value `5`:

**`x < 5` (exclusive of 5)**
```text
<----------------)----------->
...  3     4     5     6     7 ...
             (not included)
```

**`x >= 5` (inclusive of 5)**
```text
             [---------------->
...  3     4     5     6     7 ...
             (included)
```
The `)` or `(` denotes an exclusive boundary, while `[` or `]` denotes an inclusive boundary.

## Memory technique — remember this forever
1.  **Mnemonic**:
    -   For `<` and `>`: Think of the symbol as a hungry alligator's mouth. It always wants to eat the **bigger** value. `10 > 5` (mouth eats the 10).
    -   For `==`: Think of the two lines as the two pans of a **balanced scale**. They are equal.
    -   For `!=`: Think of the `!` as a bolt of lightning striking the equals sign, **breaking the equality**. It means "not equal".

2.  **Must Overlearn**:
    -   `=` is assignment.
    -   `==` is comparison.
    -   The result of any comparison is `True` or `False`.

3.  **Spaced Repetition Schedule**:
    -   Review this lesson and re-do the "How to study it" steps in **1 day**.
    -   Review again in **3 days**.
    -   Review again in **7 days**.
    -   Review again in **16 days**.
    -   Review again in **35 days**.

4.  **First Principles Pathway**: If you forget everything, remember this: programming is about giving the computer instructions and asking it questions. The assignment `=` is an instruction. The comparison operators are questions. The only answers a computer can give to a simple comparison question are "yes" (`True`) or "no" (`False`). The symbols themselves are borrowed directly from standard mathematics, so your existing math knowledge is the ultimate foundation.

## Common mistakes
1.  **Assignment in a Comparison**: Writing `if x = 5:` instead of `if x == 5:`. This will raise a `SyntaxError` in modern Python in `if` statements, but it's a fatal logic error in other languages. Burn the `==` for comparison into your mind.
2.  **Floating Point Inaccuracy**: Trying to check for exact equality with floats can be dangerous due to how computers store them. `0.1 + 0.2 == 0.3` is famously `False`. For floats, it is often better to check if they are "close enough" rather than perfectly equal.
3.  **String Casing**: Forgetting that string comparison is case-sensitive. `'Python' == 'python'` is `False`. The uppercase 'P' and lowercase 'p' are different characters with different values.
4.  **Lexicographical vs. Numerical Order**: Being surprised that `"10" < "2"` evaluates to `True`. Python is comparing the strings character by character, and the character `'1'` comes before the character `'2'`. It is not comparing the numerical values 10 and 2.

## Self-check
1.  What is the final Boolean value of the expression: `(100 / 2) == (25 * 2)`?
2.  A variable `thrust_newtons` holds the current thrust of a rocket engine. Write a single comparison expression that evaluates to `True` if the thrust is outside the safe operating range of 750,000 N to 900,000 N (inclusive).
3.  Predict the Boolean result of `("a" + "b") == "ab"`. Then, predict the result of `"Z" < "a"`. Explain the logic for the second one.