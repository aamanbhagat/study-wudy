## 1. What it is — in plain English

Imagine you're writing a letter, and parts of that letter change depending on who you're sending it to. Instead of rewriting the whole letter every time, you'd probably use a template with blank spaces like "[Recipient's Name]" or "[Current Date]". When you're ready to send it, you just fill in those blanks with the specific information.

In programming, a "string" is just a fancy word for text, like "Hello World" or "My name is John". Often, we want to create text that includes information stored in our program, like a user's name, a calculated score, or today's date. This is called "string formatting" or "string interpolation."

An "f-string" in Python is like that smart template. It's a special way to build strings where you can easily drop in values from your variables or even do small calculations directly inside the text. You just put an `f` right before the opening quote of your string, and then any time you want to insert something dynamic, you wrap it in curly braces `{}`. Python then automatically fills in those "blanks" with the correct, up-to-date information.

It makes creating dynamic messages much clearer and more straightforward than older methods, allowing you to see the final text structure almost exactly as it will appear, with the dynamic parts clearly marked.

## 2. Why it matters — real-world applications

F-strings are not just a convenient feature; they are a fundamental tool for creating dynamic, readable, and user-friendly applications across various domains.

1.  **Aerospace and Scientific Data Reporting**: Imagine a flight control system or a scientific simulation. Engineers need to constantly monitor and display real-time sensor data, simulation outputs, or critical parameters. F-strings are perfect for generating clear, human-readable status messages like:
    *   `f"Altitude: {current_altitude:.2f} meters, Speed: {airspeed:.1f} m/s, Fuel Remaining: {fuel_level:.0%}"`
    *   `f"Turbulence detected: {turbulence_level} (Severity: {'High' if turbulence_level > 0.7 else 'Low'})."`
    This allows for immediate understanding of complex data, crucial for decision-making in high-stakes environments.

2.  **Machine Learning Model Performance & Logging**: In machine learning, training models involves many iterations, and developers need to track metrics like accuracy, loss, and epoch numbers. F-strings are extensively used to print progress updates and final results:
    *   `f"Epoch {epoch_num}: Training Loss = {train_loss:.4f}, Validation Accuracy = {val_accuracy:.2%}"`
    *   `f"Model {model_name} achieved an F1-score of {f1_score:.3f} on the test set."`
    They are also vital for logging, where detailed information about program execution, variable states, and potential errors needs to be recorded for debugging and analysis.

3.  **User Interface (UI) and Web Development**: Any application that interacts with a user needs to provide personalized feedback. Whether it's a desktop app, a mobile app, or a website, f-strings help construct dynamic messages:
    *   `f"Welcome back, {user_name}! You have {new_messages} unread messages."`
    *   `f"Your order #{order_id} has been placed successfully. Estimated delivery: {delivery_date.strftime('%A, %B %d')}."`
    In web frameworks like Flask or Django, while dedicated templating engines are often used for complex UI, f-strings are still invaluable for generating dynamic content within Python code before it's passed to the template.

4.  **Physics Simulations and Data Analysis**: When running simulations, physicists might need to display the results of complex calculations or the state of a system at a particular time step. F-strings allow for precise presentation of numerical results, often with specific formatting requirements (e.g., scientific notation, significant figures):
    *   `f"Particle energy: {energy_joules:.3e} J, Position: ({pos_x:.2f}, {pos_y:.2f}, {pos_z:.2f}) m."`
    *   `f"The gravitational force between masses {m1} kg and {m2} kg at distance {r} m is {G * m1 * m2 / r**2:.4f} N."`
    This ensures that the output is not only correct but also presented in a standard, easily interpretable scientific format.

## 3. Prerequisites — what you must know first

Before diving deep into f-strings, ensure you have a solid grasp of these foundational Python concepts:

*   **Variables**: How to declare a name (identifier) and assign a value to it, storing data in the computer's memory.
*   **Strings**: Understanding that strings are sequences of characters (text) and how to define them using single (`'...'`), double (`"..."`), or triple quotes (`"""..."""`).
*   **Basic Arithmetic Operations**: How to perform addition (`+`), subtraction (`-`), multiplication (`*`), division (`/`), exponentiation (`**`), etc., on numbers.
*   **Functions (basic concept)**: How to call a function (e.g., `print()`, `len()`) and understand that it performs an action and often returns a result.
*   **Literals**: Recognizing fixed values in code, such as the number `10`, the string `'hello'`, or the boolean `True`.
*   **Python Expressions**: Any piece of Python code that evaluates to a value (e.g., `x + 5`, `len(my_list)`, `is_valid == True`).

## 4. The core idea — step by step

Let's break down how f-strings work, building from the simplest concept to more advanced usage.

### ### Step 1: The 'f' Prefix

**Plain English:** To tell Python you want to use this special "smart template" string, you simply put the letter `f` (or `F`) directly in front of the opening quote of your string. Think of `f` as standing for "formatted" or "fill-in-the-blanks."

**Concrete Example:**

```python
# This is a regular string
regular_string = "Hello World"

# This is an f-string
f_string_example = f"Hello World"
```

Notice that for a string with no dynamic parts, an f-string behaves just like a regular string. The magic happens when we start putting things inside.

**Formal/Mathematical Version:**
A formatted string literal is denoted by the syntax:
$$ \text{f-string} ::= (\text{'f' | 'F'}) (\text{string_literal}) $$
where `string_literal` can be enclosed in single, double, or triple quotes.

**What could go wrong:**
Forgetting the `f` prefix. If you write `"Hello {name}"` instead of `f"Hello {name}"`, Python will treat `{name}` as literal text, not as a placeholder to be filled.

### ### Step 2: Curly Braces `{}`

**Plain English:** The special "blanks" or "holes" in your template string are marked by curly braces `{}`. Anything you put *inside* these curly braces is what Python will evaluate and then insert into your string.

**Concrete Example:**

```python
name = "Alice"
greeting_template = f"Hello, {}!" # This won't work yet, but shows the idea
```

In the example above, `greeting_template` has a placeholder `{}`. We haven't told Python *what* to put there yet.

**Formal/Mathematical Version:**
Within an f-string, an *expression placeholder* is defined by the syntax:
$$ \text{placeholder} ::= \text{'{'} \text{expression} \text{'}'} $$
The content within the curly braces, `expression`, is evaluated at runtime.

**What could go wrong:**
Using the wrong type of brackets, like parentheses `()` or square brackets `[]`, instead of curly braces `{}`. Python will not recognize these as special placeholders within an f-string.

### ### Step 3: Embedding Variables

**Plain English:** The simplest thing to put inside the curly braces is the name of a variable. Python will look up the current value of that variable and insert it into the string.

**Concrete Example:**

```python
user_name = "Bob"
user_age = 42

message = f"Hello, {user_name}! You are {user_age} years old."
print(message)
# Output: Hello, Bob! You are 42 years old.
```

Here, `user_name` and `user_age` are variables holding specific values. When the f-string is created, Python replaces `{user_name}` with `"Bob"` and `{user_age}` with `42`.

**Formal/Mathematical Version:**
If the `expression` within a placeholder is a simple identifier (variable name), its current value from the execution scope is retrieved and converted to its string representation.
$$ \text{placeholder} ::= \text{'{'} \text{identifier} \text{'}'} $$
where `identifier` refers to a variable previously defined in the program's scope.

**What could go wrong:**
Trying to embed a variable that hasn't been defined yet. This will result in a `NameError`. For example, `f"Hello, {undefined_variable}!"` will crash if `undefined_variable` hasn't been assigned a value.

### ### Step 4: Embedding Expressions

**Plain English:** You're not limited to just variable names. You can put *any valid Python expression* inside the curly braces. This means you can do calculations, call functions, access elements of lists or dictionaries, or even use conditional logic directly within your string. Python will first evaluate that expression to get a result, and *then* insert that result into the string.

**Concrete Example:**

```python
import datetime

price = 19.99
quantity = 3
tax_rate = 0.08
total_cost = price * quantity * (1 + tax_rate)

# Embedding arithmetic expressions and function calls
report = f"Item price: ${price:.2f}\nQuantity: {quantity}\nSubtotal: ${price * quantity:.2f}\nTax ({(tax_rate * 100):.0f}%): ${price * quantity * tax_rate:.2f}\nTotal: ${total_cost:.2f}\nReport generated on: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
print(report)
# Output (approx):
# Item price: $19.99
# Quantity: 3
# Subtotal: $59.97
# Tax (8%): $4.80
# Total: $64.77
# Report generated on: 2023-10-27 10:30:00
```

Notice how `price * quantity`, `tax_rate * 100`, and `datetime.datetime.now().strftime(...)` are all evaluated *before* their results are placed into the string.

**Formal/Mathematical Version:**
The `expression` within a placeholder can be any valid Python expression. This expression is evaluated in the context where the f-string is defined. The result of this evaluation, say $R$, is then converted to its string representation, typically by calling `str(R)`, unless a specific format specifier is provided.

**What could go wrong:**
Placing overly complex expressions inside the curly braces can make your code harder to read and debug. While powerful, it's generally good practice to keep expressions simple or pre-calculate complex values into variables before embedding them. Also, syntax errors *within* the embedded expression will cause a `SyntaxError` or other runtime errors.

### ### Step 5: Formatting Options (Basic)

**Plain English:** Sometimes, you don't just want the raw value; you want it presented in a specific way. For example, a number might need to be rounded to two decimal places (like currency), or aligned to the left/right, or displayed as a percentage. You can add a colon `:` after your expression inside the curly braces, followed by a "format specifier" that tells Python exactly how to present the result.

**Concrete Example:**

```python
pi = 3.1415926535
percentage = 0.75
large_number = 123456789

formatted_output = f"Pi to 2 decimal places: {pi:.2f}\n" \
                   f"Pi to 4 decimal places: {pi:.4f}\n" \
                   f"Seventy-five percent: {percentage:.0%}\n" \
                   f"Large number with commas: {large_number:,}\n" \
                   f"Left-aligned in 10 spaces: {'hello':<10}\n" \
                   f"Right-aligned in 10 spaces: {'world':>10}"
print(formatted_output)
# Output:
# Pi to 2 decimal places: 3.14
# Pi to 4 decimal places: 3.1416
# Seventy-five percent: 75%
# Large number with commas: 123,456,789
# Left-aligned in 10 spaces: hello
# Right-aligned in 10 spaces:      world
```

The `.2f` means "format as a floating-point number with 2 decimal places." The `.0%` means "format as a percentage with 0 decimal places." The `,` means "use a comma as a thousands separator." The `<10` means "left-align within a field of 10 characters."

**Formal/Mathematical Version:**
An expression placeholder can include a *format specifier* using the syntax:
$$ \text{placeholder} ::= \text{'{'} \text{expression} \text{':'} \text{format_spec} \text{'}'} $$
The `format_spec` follows the rules of Python's Format Specification Mini-Language, which is also used by the `str.format()` method. The `expression` is evaluated, and its `__format__(format_spec)` method is called to produce the final string representation.

**What could go wrong:**
Using incorrect or incompatible format specifiers. For example, trying to use a floating-point specifier (`f`) on an integer or a string might lead to a `ValueError`. The format specifier syntax is quite precise.

### ### Step 6: Multi-line F-strings

**Plain English:** Just like regular strings, f-strings can span multiple lines. This is incredibly useful for creating long messages, reports, or formatted text blocks without having to manually add newline characters (`\n`) or concatenate many shorter strings. You achieve this by enclosing your f-string in triple quotes (`"""..."""` or `'''...'''`).

**Concrete Example:**

```python
product_name = "Quantum Entanglement Device"
version = 2.1
release_date = "2023-10-27"
features = ["Instantaneous Communication", "Temporal Displacement (Beta)"]

product_info = f"""
Product: {product_name}
Version: {version:.1f}
Release Date: {release_date}
Key Features:
    - {features[0]}
    - {features[1]}

Thank you for choosing our cutting-edge technology!
"""
print(product_info)
# Output:
#
# Product: Quantum Entanglement Device
# Version: 2.1
# Release Date: 2023-10-27
# Key Features:
#     - Instantaneous Communication
#     - Temporal Displacement (Beta)
#
# Thank you for choosing our cutting-edge technology!
```

Notice how the indentation and newlines within the triple-quoted string are preserved in the output, making it easy to structure complex text.

**Formal/Mathematical Version:**
A formatted string literal can be a multi-line string literal. The content between the triple quotes, including newline characters, is parsed. Expression placeholders are evaluated as usual within this multi-line context.

**What could go wrong:**
Forgetting to use triple quotes for multi-line f-strings, leading to `SyntaxError` if you try to break a single-quoted string across lines without explicit line continuation characters (`\`).

## 5. Worked examples — multiple, with every step shown

Here are several worked examples, demonstrating f-string capabilities from simple to more complex scenarios.

### Example 1: Basic Variable Embedding

**Problem:** Construct a greeting message that includes a user's name and their favorite programming language.

**What's Given:**
*   A variable `user_name` storing the user's name.
*   A variable `fav_language` storing their favorite programming language.

**What We Want:**
A string in the format: "Hello, \[user\_name]! Your favorite language is \[fav\_language]."

**Steps:**

1.  **Define the variables:**
    ```python
    user_name = "Grace Hopper" # Assign the name "Grace Hopper" to the variable user_name.
    fav_language = "COBOL"     # Assign the string "COBOL" to the variable fav_language.
    ```
    *Why this step works:* We need to have the data stored in variables before we can embed them into a string.

2.  **Construct the f-string:**
    ```python
    greeting_message = f"Hello, {user_name}! Your favorite language is {fav_language}."
    ```
    *Why this step works:*
    *   The `f` prefix indicates that this is a formatted string literal.
    *   `{user_name}` is an expression placeholder. Python evaluates `user_name` to `"Grace Hopper"` and inserts it.
    *   `{fav_language}` is another expression placeholder. Python evaluates `fav_language` to `"COBOL"` and inserts it.
    *   The surrounding text "Hello, " and "! Your favorite language is " are static parts of the string.

3.  **Print the result:**
    ```python
    print(greeting_message)
    ```
    *Why this step works:* This displays the final constructed string to the console.

**Final Answer:**
```
Hello, Grace Hopper! Your favorite language is COBOL.
```

**Reflection:** This example highlights the most basic use of f-strings: directly embedding variable values. It's straightforward and significantly more readable than older string formatting methods like concatenation (`+`) or the `.format()` method for simple cases.

---

### Example 2: Embedding Arithmetic Expressions and Basic Formatting

**Problem:** Calculate the area of a circle given its radius and display the result, rounded to two decimal places.

**What's Given:**
*   A variable `radius` representing the circle's radius.
*   The mathematical constant $\pi$ (Pi).

**What We Want:**
A string in the format: "The area of a circle with radius \[radius] is approximately \[area] square units."
The area should be rounded to two decimal places.

**Steps:**

1.  **Import the `math` module and define the radius:**
    ```python
    import math         # Import the math module to access mathematical constants like pi.
    radius = 7.5        # Assign the value 7.5 to the variable radius.
    ```
    *Why this step works:* We need `math.pi` for the area calculation and a specific `radius` value to work with.

2.  **Construct the f-string with an embedded expression and formatting:**
    The formula for the area of a circle is $A = \pi r^2$.
    ```python
    circle_area_message = f"The area of a circle with radius {radius} is approximately {math.pi * radius**2:.2f} square units."
    ```
    *Why this step works:*
    *   `f` prefix for an f-string.
    *   `{radius}` embeds the value of the `radius` variable directly.
    *   `{math.pi * radius**2:.2f}` is the core of this example:
        *   `math.pi * radius**2` is an arithmetic expression. Python evaluates this expression first: $3.14159... \times (7.5)^2 \approx 176.71458$.
        *   `:.2f` is a format specifier. It tells Python to take the result of the expression, treat it as a floating-point number (`f`), and display it with exactly two digits after the decimal point (`.2`). This rounds the value to approximately `176.71`.

3.  **Print the result:**
    ```python
    print(circle_area_message)
    ```
    *Why this step works:* Displays the final formatted string.

**Final Answer:**
```
The area of a circle with radius 7.5 is approximately 176.71 square units.
```

**Reflection:** This example demonstrates the power of embedding expressions directly. We performed a calculation (`math.pi * radius**2`) and applied formatting (`:.2f`) within a single placeholder, making the code concise and readable. It also shows how to incorporate external module functions/constants.

---

### Example 3: Embedding a Conditional Expression (Ternary Operator)

**Problem:** Display a user's account status, indicating whether they are "Active" or "Inactive" based on a boolean variable.

**What's Given:**
*   A variable `username` storing the user's name.
*   A boolean variable `is_active` indicating the account status.

**What We Want:**
A string in the format: "User \[username] is currently \[status]."
Where `[status]` is "Active" if `is_active` is `True`, and "Inactive" if `is_active` is `False`.

**Steps:**

1.  **Define the variables:**
    ```python
    username = "Ada Lovelace" # Assign the name "Ada Lovelace" to the variable username.
    is_active = False         # Assign the boolean value False to the variable is_active.
    ```
    *Why this step works:* We need the user's name and their current active status to formulate the message.

2.  **Construct the f-string with an embedded conditional expression:**
    Python's ternary operator `value_if_true if condition else value_if_false` can be used directly inside an f-string.
    ```python
    status_message = f"User {username} is currently {'Active' if is_active else 'Inactive'}."
    ```
    *Why this step works:*
    *   `f` prefix for an f-string.
    *   `{username}` embeds the user's name.
    *   `{'Active' if is_active else 'Inactive'}` is the embedded conditional expression:
        *   Python first evaluates the condition `is_active`. Since `is_active` is `False`, the `else` branch is taken.
        *   The expression evaluates to the string `"Inactive"`.
        *   This string `"Inactive"` is then inserted into the f-string.

3.  **Print the result:**
    ```python
    print(status_message)
    ```
    *Why this step works:* Displays the dynamically generated status message.

**Final Answer:**
```
User Ada Lovelace is currently Inactive.
```

**Reflection:** This example shows how powerful f-strings are by allowing complex logic (like a conditional check) to be embedded directly. This makes the code very compact and readable for simple conditional outputs, avoiding the need for `if/else` blocks just to determine a small part of a string.

---

### Example 4: Combining Multiple Complex Elements and Debugging Information

**Problem:** Generate a detailed report for a financial transaction, including the transaction ID, a calculated total, a status (approved/rejected) based on a threshold, and the current timestamp, all formatted appropriately. Also, include a debugging note showing the raw transaction data.

**What's Given:**
*   A dictionary `transaction_data` containing `id`, `amount`, and `fee`.
*   A variable `approval_limit` for the transaction amount.

**What We Want:**
A multi-line string report with:
*   Transaction ID.
*   Calculated total amount (amount + fee), formatted to two decimal places.
*   Approval status: "Approved" if total amount is less than or equal to `approval_limit`, otherwise "Rejected".
*   Current date and time, formatted as `YYYY-MM-DD HH:MM:SS`.
*   A debug line showing the raw `transaction_data` dictionary.

**Steps:**

1.  **Import necessary modules and define data:**
    ```python
    import datetime # Import datetime module for current timestamp.

    transaction_data = { # Define a dictionary to hold transaction details.
        "id": "TXN7890123",
        "amount": 1250.75,
        "fee": 25.50
    }
    approval_limit = 1500.00 # Define the approval limit.
    ```
    *Why this step works:* We need the `datetime` module for time, and the transaction data and limit for the report content.

2.  **Calculate derived values (optional but good practice for readability):**
    ```python
    total_amount = transaction_data["amount"] + transaction_data["fee"] # Calculate the total amount.
    is_approved = total_amount <= approval_limit                       # Determine approval status.
    current_timestamp = datetime.datetime.now()                        # Get the current time.
    ```
    *Why this step works:* While these could be embedded directly, pre-calculating them improves readability within the f-string, especially for `total_amount` which is used multiple times.

3.  **Construct the multi-line f-string:**
    ```python
    transaction_report = f"""
    --- Transaction Report ---
    ID: {transaction_data["id"]}
    Amount: ${transaction_data["amount"]:.2f}
    Fee:    ${transaction_data["fee"]:.2f}
    --------------------------
    Total:  ${total_amount:.2f}
    Status: {'Approved' if is_approved else 'Rejected'}
    Timestamp: {current_timestamp.strftime('%Y-%m-%d %H:%M:%S')}

    --- Debug Info ---
    Raw Data: {transaction_data}
    """
    ```
    *Why this step works:*
    *   Triple quotes `"""..."""` allow the string to span multiple lines, preserving the layout.
    *   `{transaction_data["id"]}`: Accesses a dictionary value directly.
    *   `{transaction_data["amount"]:.2f}` and `{transaction_data["fee"]:.2f}`: Access dictionary values and format them as currency (2 decimal places).
    *   `${total_amount:.2f}`: Embeds the pre-calculated `total_amount` and formats it.
    *   `{'Approved' if is_approved else 'Rejected'}`: Embeds a conditional expression for the status.
    *   `{current_timestamp.strftime('%Y-%m-%d %H:%M:%S')}`: Calls the `strftime` method on the `datetime` object to format the timestamp into a specific string representation.
    *   `{transaction_data}`: Embeds the entire dictionary object directly. Python calls `str()` on the dictionary, showing its full representation, which is useful for debugging.

4.  **Print the result:**
    ```python
    print(transaction_report)
    ```
    *Why this step works:* Displays the complete, formatted report.

**Final Answer:**
```
--- Transaction Report ---
ID: TXN7890123
Amount: $1250.75
Fee:    $25.50
--------------------------
Total:  $1276.25
Status: Approved
Timestamp: 2023-10-27 10:30:00  (Note: Actual timestamp will vary)

--- Debug Info ---
Raw Data: {'id': 'TXN7890123', 'amount': 1250.75, 'fee': 25.50}
```

**Reflection:** This example demonstrates the versatility of f-strings. It combines multi-line structure, direct embedding of dictionary values, arithmetic expressions, conditional logic, method calls on objects, and varied formatting (currency, custom date format). The inclusion of raw data for debugging is a common practical use case, showing how f-strings can simplify introspection of complex objects. The trickiest part here is managing the various formatting specifiers and ensuring the embedded expressions (like `strftime`) are correctly structured.

## 6. Common mistakes and traps

1.  **Forgetting the `f` prefix**: The most common mistake. If you write `"Hello {name}"` instead of `f"Hello {name}"`, the curly braces and their contents will be treated as literal text, not as placeholders.
    *   *Why it happens:* Muscle memory from regular strings, or simply overlooking the small `f`.
2.  **Using wrong delimiters for expressions**: Trying to use parentheses `()` or square brackets `[]` instead of curly braces `{}` for embedding expressions.
    *   *Why it happens:* Confusion with other Python syntax or other programming languages' string interpolation methods.
3.  **Syntax errors within embedded expressions**: The code inside `{}` must be valid Python. If there's a typo, unmatched parentheses, or an invalid operation, it will cause a `SyntaxError` or a runtime exception.
    *   *Why it happens:* Forgetting that the content inside `{}` is actual code that Python tries to execute.
4.  **Undefined variables**: Attempting to embed a variable that has not been assigned a value in the current scope.
    *   *Why it happens:* Typo in the variable name, or the variable was genuinely not defined before the f-string was created. This results in a `NameError`.
5.  **Over-complex expressions**: While powerful, putting very long, nested, or hard-to-read expressions directly inside `{}` can make the f-string itself difficult to understand and debug.
    *   *Why it happens:* Temptation to be overly concise. It's often better to calculate complex values into temporary variables *before* embedding them.
6.  **Incorrectly escaping literal curly braces**: If you actually want literal curly braces to appear in your output (e.g., `"{json_data}"`), you need to double them: `f"{{json_data}}"` (producing `{json_data}`), not `f"{json_data}"` (which would try to evaluate `json_data`).
    *   *Why it happens:* Forgetting the specific rule for escaping `{}` when they are not meant to be placeholders.

## 7. Textbook-precise explanation

A **formatted string literal** (colloquially known as an "f-string") is a string literal prefixed with `f` or `F`. Introduced in Python 3.6 (PEP 498), f-strings provide a concise and readable way to embed Python expressions inside string literals.

**Syntax:**
A formatted string literal takes the general form:
$$ \text{f-string} ::= (\text{'f' | 'F'}) (\text{string_literal_content}) $$
The `string_literal_content` can contain arbitrary Python expressions enclosed in curly braces `{}`.

**Evaluation Process:**
When an f-string is encountered, the Python interpreter performs the following steps:
1.  **Parsing:** The string is parsed to identify literal text segments and *expression placeholders*.
2.  **Expression Evaluation:** For each expression placeholder `'{' expression [':' format_spec] '}'`:
    *   The `expression` is evaluated in the context (scope) where the f-string itself is defined. This means variables and functions accessible at that point are used.
    *   The result of the expression's evaluation, let's call it $R$, is obtained.
3.  **String Conversion and Formatting:**
    *   If no `format_spec` is provided (i.e., `'{' expression '}'`), the `__format__` method of $R$ is called with an empty