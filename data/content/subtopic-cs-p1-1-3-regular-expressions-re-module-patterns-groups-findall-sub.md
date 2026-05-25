## What it is
A regular expression (or "regex") is a sequence of characters that defines a search pattern. It's a formal language for specifying text strings you want to find, validate, or manipulate. The Python `re` module is the engine that interprets these patterns to perform matching operations on strings.

## Why it matters
Regular expressions are the swiss army knife for unstructured text data. In machine learning, you will use them constantly for data cleaning and feature extraction (e.g., pulling phone numbers or dates from raw text). In aerospace, you'll parse complex log files from flight computers or telemetry streams, where data like `SENSOR_ID=T48-A_TEMP VAL=294.3K` must be reliably extracted from a torrent of information.

## When to study it
Before tackling regular expressions, you must be comfortable with Python's basic string type and its built-in methods. Specifically, you should understand:
- String literals, indexing, and slicing.
- String methods like `.find()`, `.split()`, and `.replace()`.
Understanding the limitations of these simple methods will clarify why regex is necessary.

## How to study it (step by step)
1.  **Literals and the `.` Metacharacter:** Open a Python interpreter. Import `re`. Start by matching simple literal patterns: `re.search('cat', 'the cat sat on the mat')`. Now, introduce the wildcard `.` (dot) which matches any single character except a newline. Try `re.search('c.t', 'the cat sat on the mat')` and see it match `cat`. Try it on `cot`.
2.  **Quantifiers `*`, `+`, `?`:** These characters modify the preceding element. Learn their meaning: `*` is "zero or more", `+` is "one or more", and `?` is "zero or one". Experiment with `re.search('ca*t', ...)` on strings like `'ct'`, `'cat'`, `'caaat'`.
3.  **Character Sets `[...]`:** Understand that `[abc]` matches 'a', 'b', OR 'c'. Learn ranges like `[0-9]` for any digit or `[a-zA-Z]` for any letter. Write a pattern to match a US zip code format: 5 digits, optionally followed by a dash and 4 more digits.
4.  **`findall` vs `search`:** Use `re.search()` to find the *first* occurrence of a pattern, which returns a "match object". Use `re.findall()` to find *all* non-overlapping occurrences, which returns a list of strings. Run both functions with the pattern `\d+` (one or more digits) on the string `'test 123, train 456, validate 789'`. Observe the different return types.
5.  **Capturing Groups `(...)`:** Parentheses are crucial. They group parts of a pattern and "capture" the text that matched inside them. Use `re.search(r'(\d+)-(\w+)', 'Item 42-Box')`. Access the captured parts using `.group(0)`, `.group(1)`, `.group(2)`. Notice that group 0 is the entire match.
6.  **Substitution with `sub`:** Learn `re.sub(pattern, replacement, string)`. Use a pattern with capturing groups to reformat a date. For example, turn `'2023-10-27'` into `'10/27/2023'` using the pattern `r'(\d{4})-(\d{2})-(\d{2})'` and the replacement `r'\2/\3/\1'`.

## Key ideas, with intuition
1.  **A Language within a Language:** A regular expression is a string that represents a pattern. It's a tiny, powerful language embedded inside Python. The `re` module is the interpreter. You write the pattern as a string, and `re` executes it against another string. Always use raw strings `r"..."` for your patterns to prevent Python from interpreting backslashes before the regex engine does.
2.  **Atoms and Operators:** Think of a pattern as being built from "atoms" and "operators".
    - **Atoms** are the things that match single characters:
        - `c`: a literal character.
        - `.`: any character.
        - `\d`: a digit (`[0-9]`).
        - `\w`: a "word" character (`[a-zA-Z0-9_]`).
        - `[...]`: a set of allowed characters.
    - **Operators** (Quantifiers) modify the preceding atom:
        - `*`: 0 or more times.
        - `+`: 1 or more times.
        - `?`: 0 or 1 time.
        - `{n,m}`: between $n$ and $m$ times.
3.  **Groups are for Extraction:** While a pattern can tell you *if* a string matches, its real power comes from extracting pieces of that string. Parentheses `()` define capture groups. When a match is found, the substrings corresponding to each group are stored and can be retrieved. This is the primary mechanism for parsing data.
4.  **`search` vs `findall`:** Your choice of function depends on your goal.
    - Do I need to know *if* the pattern exists and where, and pull out complex structured data from that single match? Use `re.search()`. It gives you one rich "match object".
    - Do I need to find *all* the simple things that match a pattern? Use `re.findall()`. It gives you a simple list of all matching strings.

## Worked example
**Problem:** A rocket's telemetry log contains messages like `TS:1666885805.321 STATUS:NOMINAL PAYLOAD:TEMP=35.2C`. We need to extract the Unix timestamp and the status code from this string.

**Solution:**

1.  **Identify the target string:** `log_line = "TS:1666885805.321 STATUS:NOMINAL PAYLOAD:TEMP=35.2C"`

2.  **Deconstruct the pattern:**
    - We need the timestamp. It starts with `TS:`. The number is composed of digits, a literal dot, and more digits. A good pattern for this is `\d+\.\d+`.
    - We need the status. It starts with `STATUS:`. The value is composed of word characters. A good pattern for this is `\w+`.
    - We want to capture these two values. So we'll put parentheses around the parts we want to keep.
    - The full pattern needs to account for the text in between. The `.*` pattern (any character, zero or more times) is a good way to bridge gaps.

3.  **Construct the regex pattern string:**
    - `TS:` matches the literal start.
    - `(\d+\.\d+)` captures the timestamp. We escape the dot `\.` so it matches a literal dot, not "any character".
    - `.*` matches everything between the timestamp and the status.
    - `STATUS:` matches the literal start of the status field.
    - `(\w+)` captures the status value.
    - The final raw string pattern is `r"TS:(\d+\.\d+).*STATUS:(\w+)"`

4.  **Execute with `re.search`:**
    ```python
    import re
    
    log_line = "TS:1666885805.321 STATUS:NOMINAL PAYLOAD:TEMP=35.2C"
    pattern = r"TS:(\d+\.\d+).*STATUS:(\w+)"
    
    match = re.search(pattern, log_line)
    
    if match:
        timestamp = match.group(1)
        status = match.group(2)
        print(f"Timestamp: {timestamp}")
        print(f"Status: {status}")
    else:
        print("No match found.")
    ```

5.  **Output and Reflection:**
    ```
    Timestamp: 1666885805.321
    Status: NOMINAL
    ```
    This worked because we precisely described the structure of the text we cared about. The literal parts (`TS:`, `STATUS:`) acted as anchors. The pattern parts (`\d+\.\d+`, `\w+`) described the *type* of data. The parentheses `()` told the engine which pieces to store and return to us via `.group()`.

## Diagrams
Here is a diagram showing how the worked example's pattern matches the string.

```text
String:  TS:1666885805.321 STATUS:NOMINAL PAYLOAD...
Pattern: TS:(\d+\.\d+)   .*   STATUS:(\w+)
         |   |             |        |      |
         |   +-------------+        |      +-----------> Group 2: 'NOMINAL'
         |     (Capture)            |        (Capture)
         |                          |
         +-------------------------> Group 1: '1666885805.321'
           (Capture)

Match Breakdown:
- `TS:` matches literal 'TS:'
- `(\d+\.\d+)` matches '1666885805.321' and captures it as group 1.
- `.*` greedily matches ' STATUS:'
- `STATUS:` matches literal 'STATUS:'
- `(\w+)` matches 'NOMINAL' and captures it as group 2.
```

## Memory technique — remember this forever
1.  **Mnemonic Story:** Imagine a detective, **Reg**gie the **Ex**pressive Searcher. He doesn't look for people, he looks for text. His tools are:
    - A **Pattern** (`r"..."`): His search warrant, describing the suspect.
    - **Groups** (`()`): His handcuffs, for capturing specific parts of the evidence.
    - His methods:
        - `search()`: Finds the first suspect.
        - `findall()`: Rounds up all the suspects.
        - `sub()`: Performs a "witness protection program" replacement on the text.

2.  **Must-Overlearn Facts:**
    - `match = re.search(r'pattern', string)`: Finds first match, returns match object.
    - `results = re.findall(r'pattern', string)`: Finds all matches, returns list of strings.
    - `new_str = re.sub(r'pattern', r'repl', string)`: Replaces matches, returns new string.
    - `(...)` -> Capture Group. `[...]` -> Character Set. `*` -> 0+, `+` -> 1+, `?` -> 0 or 1.

3.  **Spaced Repetition Schedule:** Review these facts and your practice code at:
    - 1 day
    - 3 days
    - 7 days
    - 16 days
    - 35 days

4.  **First Principles Pathway:** If you forget a complex regex pattern, rebuild it from the ground up. Ask:
    - What are the literal, unchanging "anchor" characters? (e.g., `TS:`)
    - What is the *type* of character I'm looking for between the anchors? (e.g., a digit `\d`, a word character `\w`).
    - How many of them are there? (e.g., one or more `+`).
    - Which parts do I need to extract? Put `()` around them.

## Common mistakes
1.  **Forgetting Raw Strings:** Writing `pattern = "\d+\.\d+"` instead of `pattern = r"\d+\.\d+"`. In a normal string, `\` is an escape character for Python itself. `r""` tells Python to pass the string directly to the `re` module without interpreting the backslashes.
2.  **`match()` vs. `search()`:** Using `re.match()` when you mean `re.search()`. `re.match()` ONLY succeeds if the pattern is found at the *absolute beginning* of the string. `re.search()` finds it anywhere. You will almost always want `re.search()`.
3.  **Greedy `*` and `+`:** The `*` and `+` quantifiers are "greedy" – they match as much text as possible. If you have the string `<h1>Title</h1>` and use the pattern `<.*>`, it will match the entire string, not just `<h1>`. To make it non-greedy, use `*?`: `<.*?>`.

## Self-check
1.  Write a Python script using `re.findall` to extract all the numbers (integer or floating point) from the string: `"The rocket reached a height of 350.5 km at a velocity of 7.8 km/s. There were 2 main engines and 4 boosters."`
2.  An email address has the format `username@domain.tld`. Write a pattern that uses capturing groups to extract the `username` and the full `domain` (e.g., 'domain.tld') separately. Test it on `"elon.musk@spacex.com"`.
3.  Given a list of filenames like `['img_001.jpg', 'data_042.csv', 'img_002.png', 'report.txt']`, use `re.search` and groups inside a loop to print only the base name and number of the image files (e.g., "img, 001" and "img, 002").