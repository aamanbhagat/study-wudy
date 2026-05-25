## What it is
In Python, every value has a "data type" that defines what kind of data it is—an integer, a floating-point number, a string of text, etc. Type checking is the act of inspecting a value's type using the `type()` function. Type conversion (or casting) is the act of explicitly changing a value from one type to another using functions like `int()`, `float()`, and `str()`.

## Why it matters
This is not an academic exercise; it is a fundamental operation in nearly all real-world software. In aerospace engineering, sensor data from an altimeter or gyroscope often arrives as a stream of text (strings). To use this data in trajectory calculations, it must be converted into numerical types (`float` or `int`). A failure to correctly convert a string representing a number into a usable numerical format was a direct cause of the Ariane 5 rocket's self-destruction in 1996, a $370 million failure.

## When to study it
You must understand the following concepts before this lesson:
1.  **Variables:** What a variable is and how to assign a value to it (e.g., `my_variable = 10`).
2.  **Basic Data Types:** You should have at least seen the three basic types: `int` (e.g., `42`), `float` (e.g., `9.81`), and `str` (e.g., `"hello"`).

If you are comfortable with variable assignment and the existence of these types, you are ready.

## How to study it (step by step)
1.  **Inspect Types:** Open a Python interpreter. Create three variables: `x = 100`, `y = 3.14`, `z = "100"`. Use the `print()` function combined with `type()` on each one: `print(type(x))`, `print(type(y))`, `print(type(z))`. Observe the output (`<class 'int'>`, `<class 'float'>`, `<class 'str'>`). Internalize that `100` and `"100"` are fundamentally different things to the computer.
2.  **Provoke a TypeError:** Still in the interpreter, try to perform an operation that mixes incompatible types. A classic is `x + z`. Execute `print(100 + "100")`. Observe the `TypeError`. Read the error message carefully: "unsupported operand type(s) for +: 'int' and 'str'". This error is your computer telling you it cannot logically combine these two different kinds of data.
3.  **Fix with Conversion:** Now, fix the error from the previous step. You want to perform numerical addition. Convert the string `z` to an integer before adding: `print(x + int(z))`. The result is `200`. Now, try to perform string concatenation. Convert the integer `x` to a string: `print(str(x) + z)`. The result is `"100100"`. Understand that the *operation's meaning changes based on the types involved*.
4.  **Investigate "Lossy" Conversion:** Convert a float to an int: `print(int(9.81))`. The result is `9`. Try `print(int(9.9999))`. The result is still `9`. This demonstrates a critical point: converting from `float` to `int` **truncates** (chops off the decimal), it does not round. This is a deliberate, predictable behavior. Information is lost.
5.  **Provoke a ValueError:** What happens if you try to convert a string that doesn't represent a number? Execute `int("rocket")`. Observe the `ValueError`. This error means the *value* is inappropriate for the requested conversion, even though the *type* was a string. `int()` can parse `"100"`, but not `"rocket"`.
6.  **Build a Mini-Program:** Write a small script. Use `age_str = input("Enter your age: ")`. Print `type(age_str)`. You will see it is a string. Now, calculate the user's age in 5 years. This will require you to convert the input string to an integer first: `age_int = int(age_str)`, then `future_age = age_int + 5`. Finally, print the result in a user-friendly sentence, which will require converting the number back to a string: `print("In 5 years, you will be " + str(future_age) + ".")`. This mini-program uses all three concepts in a practical sequence.

## Key ideas, with intuition
1.  **Types are like Units in Physics:** You cannot add meters and kilograms. $`5 \text{ m} + 10 \text{ kg}`$ is a nonsensical operation. Similarly, Python sees `5 + "hello"` as a `TypeError`. The type of a value dictates the valid operations you can perform on it.
2.  **Conversion is a Change in Representation:** The abstract idea of the number one hundred can be represented as an integer (`100`), a float (`100.0`), or a string (`"100"`). The conversion functions `int()`, `float()`, and `str()` are tools to switch between these representations.
    $$ \text{"100"} \xrightarrow{\text{int()}} 100 \xrightarrow{\text{float()}} 100.0 \xrightarrow{\text{str()}} \text{"100.0"} $$
3.  **Conversion Can Be "Lossy" or "Impossible":**
    *   **Lossy:** When converting from a more precise type to a less precise one (e.g., `float` to `int`), you can lose information. The conversion `int(3.14159)` results in `3`, permanently discarding the fractional part `.14159`. This is called truncation.
    *   **Impossible:** You cannot convert a value that has no logical equivalent in the target type. `int("hello")` is impossible and results in a `ValueError`. The string `"hello"` contains no information that can be represented as a base-10 integer.

## Worked example
Let's build a simple program to calculate the total thrust of two rocket engines. The thrust values are read from a configuration file, which always provides them as text.

**Problem:** Given two thrust values as strings, `"889644.3"` and `"912341.9"`, calculate their sum and print it.

**Solution:**

1.  **Store the initial data.** These are strings, as they would be when read from a file.
    ```python
    thrust_1_str = "889644.3"
    thrust_2_str = "912341.9"
    ```
    *Reflection:* We explicitly name them with `_str` to remind ourselves of their current type.

2.  **Check the types (optional but good practice).**
    ```python
    print(type(thrust_1_str)) # Output: <class 'str'>
    ```
    *Reflection:* This confirms our starting point. We cannot add these directly. `thrust_1_str + thrust_2_str` would give `"889644.3912341.9"`, which is incorrect.

3.  **Convert the strings to a numerical type.** Since the thrust values have decimal points, `float` is the correct target type.
    ```python
    thrust_1_float = float(thrust_1_str)
    thrust_2_float = float(thrust_2_str)
    ```
    *Reflection:* We use the `float()` constructor to parse the string and create a floating-point number representation in memory.

4.  **Perform the calculation.** Now that both values are numbers, we can use the `+` operator for mathematical addition.
    ```python
    total_thrust = thrust_1_float + thrust_2_float
    ```
    *Reflection:* This step is only possible because of the type conversion in the previous step. The `+` operator now behaves as we mathematically expect.

5.  **Print the result.**
    ```python
    print(total_thrust) # Output: 1801986.2
    ```
    *Reflection:* The final result is a `float`. If we needed to embed this in a sentence, we would convert it back to a string: `print("Total thrust: " + str(total_thrust) + " Newtons")`.

## Diagrams

This diagram shows the flow of data types through a typical input -> process -> output cycle.

```text
      (Input from user/file)
                |
                V
+--------------------------------+
|      Value: "45.5"             |
|      Type:  <class 'str'>      |
+--------------------------------+
                |
                | float() conversion
                V
+--------------------------------+
|      Value: 45.5               |
|      Type:  <class 'float'>     |
+--------------------------------+
                |
                | Mathematical operation (e.g., + 10.0)
                V
+--------------------------------+
|      Value: 55.5               |
|      Type:  <class 'float'>     |
+--------------------------------+
                |
                | str() conversion for display
                V
+--------------------------------+
|      Value: "55.5"             |
|      Type:  <class 'str'>      |
+--------------------------------+
                |
                V
      (Output to screen/log)
```

## Memory technique — remember this forever
1.  **The Alchemist's Workshop:**
    *   Think of your data as raw materials. `type()` is your magical monocle; you use it to inspect a material and see if it's "Lead," "Iron," or "Gold."
    *   The functions `int()`, `float()`, `str()` are your alchemical crucibles. You put a material in to try and transmute it.
    *   You can easily transmute "Iron" (`int`) into "Molten Iron" (`float`).
    *   You can transmute a "Note with a number written on it" (`str` like `"123"`) into "Iron" (`int`).
    *   But if you try to transmute a "Note with a poem on it" (`str` like `"hello"`) into "Iron," your crucible explodes (`ValueError`).
    *   If you try to mix "Iron" and a "Note" (`5 + "5"`), the workshop itself halts with a magical paradox (`TypeError`).

2.  **Must-Overlearn Formulas/Syntax:**
    *   `type(variable)` -> inspects the type.
    *   `int(variable)` -> converts to integer (truncates).
    *   `float(variable)` -> converts to float.
    *   `str(variable)` -> converts to string.

3.  **Spaced Repetition Schedule:**
    *   Review this material and rewrite the "Worked Example" from memory in **1 day**.
    *   Do the same in **3 days**.
    *   Do the same in **7 days**.
    *   Do the same in **16 days**.
    *   Do the same in **35 days**.

4.  **First Principles Pathway:** If you forget everything, how do you rebuild? Open the Python interpreter.
    *   **Goal:** I have `"10"`. I want to add `5` to it.
    *   **Experiment 1:** ` "10" + 5`. Result: `TypeError`. The computer tells me the types are wrong.
    *   **Question:** How do I find the type of `"10"`? I'll guess. `kind("10")`? No. `what("10")`? No. `type("10")`? Yes, it works! It says `<class 'str'>`.
    *   **Question:** How do I change the type? I want an integer. I'll guess. `integer("10")`? No. `to_int("10")`? No. `int("10")`? Yes, it works! It gives me `10`.
    *   **Solution:** `int("10") + 5`. Result: `15`. You can derive the syntax from first principles by experimenting in the interpreter.

## Common mistakes
1.  **`input()` returns a string.** A very common error is `age = input("Age: "); age + 1`. This will always cause a `TypeError` because you are adding a string and an integer. You must write `age = int(input("Age: "))`.
2.  **`int()` truncates, it does not round.** Writing `int(99.9)` will result in `99`, not `100`. If you need rounding, you must use the `round()` function first: `int(round(99.9))`.
3.  **Adding numbers vs. concatenating strings.** `5 + 5` equals `10`. `str(5) + str(5)` which is `"5" + "5"` equals `"55"`. Confusing these two is a frequent source of bugs.
4.  **Floating point inaccuracies.** Converting a string to a float can sometimes introduce tiny precision errors, like `float("0.1")` being stored as `0.10000000000000001`. For now, just be aware that floating-point math is not always perfectly precise.

## Self-check
1.  What is the final *value* and *type* of the variable `result` after this line is executed: `result = str(int(float("12.99")))`?
2.  Write a single line of Python code that takes the string `"2077.5"` as input, subtracts `1000` from it, and stores the final numerical result in a variable named `x`.
3.  A user inputs their weight using `input()`. The program must store this as a floating-point number. However, the user might accidentally type `"sixty-five"` instead of `"65.0"`. How would your program handle this situation to avoid crashing with a `ValueError`? You do not need to write the code, but describe the logical steps your program would need to take.